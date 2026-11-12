'use strict';

const fs = require('node:fs/promises');
const http = require('node:http');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { execFile } = require('node:child_process');
const { promisify } = require('node:util');

const execFileAsync = promisify(execFile);
const projectRoot = path.resolve(__dirname, '../..');
const publicRoot = path.join(__dirname, 'public');
const host = '127.0.0.1';
const defaultPort = 4180;
const maxRequestBytes = 2 * 1024 * 1024;
const maxFileBytes = 2 * 1024 * 1024;
const maxSearchBytes = 80 * 1024 * 1024;
const maxSearchResults = 500;
const publicFiles = new Map([
  ['/', ['index.html', 'text/html; charset=utf-8']],
  ['/app.js', ['app.js', 'text/javascript; charset=utf-8']],
  ['/styles.css', ['styles.css', 'text/css; charset=utf-8']]
]);

function isWithinRoot(root, candidate) {
  const relative = path.relative(root, candidate);
  return relative !== '' && relative !== '..' &&
    !relative.startsWith(`..${path.sep}`) && !path.isAbsolute(relative);
}

function normalizeRelativePath(value) {
  if (typeof value !== 'string' || value.length === 0 || value.length > 1000 || value.includes('\0')) {
    const error = new Error('Đường dẫn file không hợp lệ.');
    error.statusCode = 400;
    throw error;
  }
  const segments = value.replace(/\\/g, '/').split('/');
  if (segments.some(segment => !segment || segment === '.' || segment === '..') ||
      path.posix.isAbsolute(value) || path.win32.isAbsolute(value) ||
      segments[0].toLowerCase() === '.git') {
    const error = new Error('Đường dẫn file không hợp lệ.');
    error.statusCode = 400;
    throw error;
  }
  return segments.join('/');
}

async function safeFilePath(root, relativePath) {
  const normalized = normalizeRelativePath(relativePath);
  const absolute = path.resolve(root, ...normalized.split('/'));
  if (!isWithinRoot(root, absolute)) throw new Error('Đường dẫn nằm ngoài project.');

  const stat = await fs.lstat(absolute);
  if (!stat.isFile() || stat.isSymbolicLink()) throw new Error('Chỉ hỗ trợ file thường trong project.');
  const realPath = await fs.realpath(absolute);
  if (!isWithinRoot(root, realPath)) throw new Error('Đường dẫn nằm ngoài project.');
  return { absolute, normalized, stat };
}

async function runGit(root, args, options = {}) {
  return execFileAsync('git', args, {
    cwd: root,
    encoding: 'utf8',
    windowsHide: true,
    timeout: options.timeout || 30000,
    maxBuffer: options.maxBuffer || 2 * 1024 * 1024
  });
}

async function listSourceFiles(root) {
  const { stdout } = await runGit(root, ['ls-files', '-z', '--cached', '--others', '--exclude-standard']);
  const files = [];
  for (const relativePath of stdout.split('\0')) {
    if (!relativePath) continue;
    try {
      const { stat, normalized } = await safeFilePath(root, relativePath);
      files.push({ path: normalized, size: stat.size, mtime: stat.mtimeMs });
    } catch (error) {
      if (error.code !== 'ENOENT' && !String(error.message).startsWith('Chỉ hỗ trợ')) throw error;
    }
  }
  files.sort((left, right) => left.path.localeCompare(right.path));
  return files;
}

async function readGitStatus(root) {
  const { stdout } = await runGit(root, ['status', '--porcelain=v1', '-z', '--branch', '--untracked-files=all']);
  const entries = stdout.split('\0');
  const branchLine = entries.shift() || '';
  const branch = branchLine.startsWith('## ') ? branchLine.slice(3).split('...')[0] : 'Không rõ';
  const files = [];

  for (let index = 0; index < entries.length; index += 1) {
    const entry = entries[index];
    if (entry.length < 4) continue;
    const status = entry.slice(0, 2);
    let filePath = entry.slice(3);
    if (status.includes('R') || status.includes('C')) {
      index += 1;
    }
    files.push({
      path: filePath,
      status,
      staged: status[0] !== ' ' && status[0] !== '?',
      unstaged: status[1] !== ' ',
      untracked: status === '??',
      conflicted: status.includes('U') || status === 'AA' || status === 'DD'
    });
  }
  return { branch, files };
}

async function readJsonBody(request) {
  const chunks = [];
  let length = 0;
  for await (const chunk of request) {
    length += chunk.length;
    if (length > maxRequestBytes) {
      const error = new Error('Dữ liệu gửi lên vượt quá giới hạn 2 MB.');
      error.statusCode = 413;
      throw error;
    }
    chunks.push(chunk);
  }
  let body;
  try {
    body = JSON.parse(Buffer.concat(chunks).toString('utf8'));
  } catch {
    const error = new Error('Nội dung JSON không hợp lệ.');
    error.statusCode = 400;
    throw error;
  }
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    const error = new Error('Dữ liệu gửi lên phải là một object JSON.');
    error.statusCode = 400;
    throw error;
  }
  return body;
}

function sendJson(response, statusCode, data) {
  response.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff'
  });
  response.end(JSON.stringify(data));
}

function sendError(response, error) {
  const statusCode = Number.isInteger(error.statusCode) ? error.statusCode : 500;
  const details = [error.message || String(error), error.stderr, error.stdout]
    .filter(Boolean)
    .map(String)
    .join('\n')
    .slice(-3000);
  sendJson(response, statusCode, { ok: false, error: details });
}

async function getOverview(root) {
  const [files, git, packageText] = await Promise.all([
    listSourceFiles(root),
    readGitStatus(root),
    fs.readFile(path.join(root, 'package.json'), 'utf8').catch(error => {
      if (error.code === 'ENOENT') return '{}';
      throw error;
    })
  ]);
  const extensions = {};
  const directories = new Set();
  for (const file of files) {
    const extension = path.posix.extname(file.path).toLowerCase() || '(không đuôi)';
    extensions[extension] = (extensions[extension] || 0) + 1;
    const parts = file.path.split('/');
    for (let index = 1; index < parts.length; index += 1) directories.add(parts.slice(0, index).join('/'));
  }

  let scripts = {};
  try {
    scripts = JSON.parse(packageText).scripts || {};
  } catch {
    throw new Error('package.json không phải JSON hợp lệ.');
  }
  return {
    ok: true,
    project: path.basename(root),
    files: files.length,
    directories: directories.size,
    extensions: Object.entries(extensions).sort((left, right) => right[1] - left[1]).slice(0, 10),
    scripts: Object.entries(scripts).map(([name, command]) => ({ name, command: String(command) })),
    git
  };
}

async function searchFiles(root, query) {
  if (typeof query !== 'string' || query.trim().length < 2 || query.length > 120) {
    const error = new Error('Từ khóa cần dài từ 2 đến 120 ký tự.');
    error.statusCode = 400;
    throw error;
  }
  const needle = query.toLocaleLowerCase();
  const files = await listSourceFiles(root);
  const results = [];
  let scannedFiles = 0;
  let scannedBytes = 0;
  let skippedFiles = 0;
  let truncated = false;

  for (const file of files) {
    if (file.size > maxFileBytes || scannedBytes + file.size > maxSearchBytes) {
      skippedFiles += 1;
      continue;
    }
    const { absolute } = await safeFilePath(root, file.path);
    const content = await fs.readFile(absolute);
    scannedBytes += content.length;
    if (content.includes(0)) {
      skippedFiles += 1;
      continue;
    }
    scannedFiles += 1;
    const lines = content.toString('utf8').split(/\r?\n/);
    for (let index = 0; index < lines.length; index += 1) {
      if (!lines[index].toLocaleLowerCase().includes(needle)) continue;
      results.push({ path: file.path, line: index + 1, text: lines[index].slice(0, 500) });
      if (results.length >= maxSearchResults) {
        truncated = true;
        break;
      }
    }
    if (truncated) break;
  }
  return { ok: true, query, results, scannedFiles, skippedFiles, truncated };
}

function extractSourceLocations(output, root, files, limit = 50) {
  const locations = new Map();
  const lines = String(output).split(/\r?\n/);
  for (let lineIndex = 0; lineIndex < lines.length && locations.size < limit; lineIndex += 1) {
    const outputLine = lines[lineIndex];
    for (const file of files) {
      const absolute = path.resolve(root, ...file.path.split('/'));
      const variants = [
        file.path,
        file.path.replace(/\//g, '\\'),
        absolute,
        absolute.replace(/\\/g, '/'),
        pathToFileURL(absolute).href
      ];
      let found = null;
      for (const variant of variants) {
        const index = outputLine.indexOf(variant);
        if (index < 0) continue;
        if (index > 0 && /[A-Za-z0-9_./\\-]/.test(outputLine[index - 1])) continue;
        const suffix = outputLine.slice(index + variant.length);
        const match = suffix.match(/^:(\d+)(?::(\d+))?/);
        if (match) {
          found = { path: file.path, line: Number(match[1]), column: match[2] ? Number(match[2]) : null };
          break;
        }
      }
      if (!found) continue;
      const key = `${found.path}:${found.line}:${found.column ?? ''}`;
      if (locations.has(key)) continue;
      let context = '';
      for (let previous = lineIndex; previous >= Math.max(0, lineIndex - 5); previous -= 1) {
        const candidate = lines[previous].trim();
        if (/^(?:✖|×|not ok\b)|(?:AssertionError|SyntaxError|TypeError|ReferenceError|Error):/.test(candidate)) {
          context = candidate.slice(0, 240);
          break;
        }
      }
      locations.set(key, { ...found, context: context || 'Có lỗi tại vị trí này.' });
      if (locations.size >= limit) break;
    }
  }
  return [...locations.values()];
}

function createServer(options = {}) {
  const root = path.resolve(options.root || projectRoot);
  const port = options.port ?? Number(process.env.KVPV_SOURCE_MANAGER_PORT || defaultPort);
  if (!Number.isInteger(port) || port < 0 || port > 65535) {
    throw new Error('Cổng phải là số nguyên từ 0 đến 65535.');
  }

  const server = http.createServer(async (request, response) => {
    response.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self'; style-src 'self'; connect-src 'self'; img-src 'self' data:; object-src 'none'; base-uri 'none'; frame-ancestors 'none'");
    response.setHeader('Referrer-Policy', 'no-referrer');

    try {
      const activePort = server.address()?.port || port;
      const allowedHosts = new Set([`127.0.0.1:${activePort}`, `localhost:${activePort}`]);
      if (!allowedHosts.has(request.headers.host)) {
        const error = new Error('Host không được phép.');
        error.statusCode = 403;
        throw error;
      }
      const url = new URL(request.url, `http://${host}:${activePort}`);
      const method = request.method || 'GET';

      if (method === 'GET' && url.pathname === '/api/overview') {
        sendJson(response, 200, await getOverview(root));
        return;
      }
      if (method === 'GET' && url.pathname === '/api/files') {
        sendJson(response, 200, { ok: true, files: await listSourceFiles(root) });
        return;
      }
      if (method === 'GET' && url.pathname === '/api/file') {
        const { normalized, absolute, stat } = await safeFilePath(root, url.searchParams.get('path'));
        const files = await listSourceFiles(root);
        if (!files.some(file => file.path === normalized)) {
          const error = new Error('File không nằm trong danh sách source của project.');
          error.statusCode = 404;
          throw error;
        }
        if (stat.size > maxFileBytes) {
          const error = new Error('File lớn hơn giới hạn mở 2 MB.');
          error.statusCode = 413;
          throw error;
        }
        const content = await fs.readFile(absolute);
        if (content.includes(0)) {
          const error = new Error('Không hỗ trợ xem file nhị phân.');
          error.statusCode = 415;
          throw error;
        }
        sendJson(response, 200, { ok: true, path: normalized, content: content.toString('utf8') });
        return;
      }
      if (method === 'POST' && url.pathname === '/api/search') {
        assertSameOrigin(request, activePort);
        const body = await readJsonBody(request);
        sendJson(response, 200, await searchFiles(root, body.query));
        return;
      }
      if (method === 'PUT' && url.pathname === '/api/file') {
        assertSameOrigin(request, activePort);
        const body = await readJsonBody(request);
        const { normalized, absolute, stat } = await safeFilePath(root, body.path);
        const files = await listSourceFiles(root);
        if (!files.some(file => file.path === normalized)) {
          const error = new Error('File không nằm trong danh sách source của project.');
          error.statusCode = 404;
          throw error;
        }
        if (typeof body.content !== 'string' || Buffer.byteLength(body.content, 'utf8') > maxFileBytes) {
          const error = new Error('Nội dung file không hợp lệ hoặc vượt quá 2 MB.');
          error.statusCode = 413;
          throw error;
        }
        if (body.content.includes('\0')) {
          const error = new Error('Không hỗ trợ lưu nội dung nhị phân.');
          error.statusCode = 415;
          throw error;
        }
        if (stat.size > maxFileBytes) {
          const error = new Error('File lớn hơn giới hạn chỉnh sửa 2 MB.');
          error.statusCode = 413;
          throw error;
        }
        if ((await fs.readFile(absolute)).includes(0)) {
          const error = new Error('Không hỗ trợ chỉnh sửa file nhị phân.');
          error.statusCode = 415;
          throw error;
        }
        await fs.writeFile(absolute, body.content, { encoding: 'utf8', mode: stat.mode });
        sendJson(response, 200, { ok: true, path: normalized, savedAt: Date.now() });
        return;
      }
      if (method === 'GET' && url.pathname === '/api/git/diff') {
        const args = ['-c', 'core.pager=cat', 'diff', '--no-ext-diff', '--no-textconv', '--unified=3', 'HEAD', '--'];
        const filePath = url.searchParams.get('path');
        if (filePath) {
          const { normalized } = await safeFilePath(root, filePath);
          args.push(normalized);
        }
        const { stdout } = await runGit(root, args, { maxBuffer: 4 * 1024 * 1024 });
        sendJson(response, 200, { ok: true, diff: stdout.slice(0, 2 * 1024 * 1024), truncated: stdout.length > 2 * 1024 * 1024 });
        return;
      }
      if (method === 'POST' && url.pathname.startsWith('/api/git/')) {
        assertSameOrigin(request, activePort);
        const body = await readJsonBody(request);
        if (url.pathname === '/api/git/commit') {
          await commitSelected(root, body);
          sendJson(response, 200, { ok: true, message: 'Đã commit các file đã chọn.' });
          return;
        }
        if (url.pathname === '/api/git/pull') {
          const { stdout, stderr } = await runGit(root, ['pull', '--ff-only'], { timeout: 120000 });
          sendJson(response, 200, { ok: true, output: `${stdout}${stderr}`.slice(-12000) });
          return;
        }
        if (url.pathname === '/api/git/push') {
          const { stdout, stderr } = await runGit(root, ['push'], { timeout: 120000 });
          sendJson(response, 200, { ok: true, output: `${stdout}${stderr}`.slice(-12000) });
          return;
        }
      }
      if (method === 'POST' && url.pathname === '/api/scripts/run') {
        assertSameOrigin(request, activePort);
        const body = await readJsonBody(request);
        if (!['build', 'test'].includes(body.script)) {
          const error = new Error('Chỉ hỗ trợ chạy scripts build và test.');
          error.statusCode = 400;
          throw error;
        }
        const packageJson = JSON.parse(await fs.readFile(path.join(root, 'package.json'), 'utf8'));
        if (!packageJson.scripts?.[body.script]) {
          const error = new Error(`Không tìm thấy script ${body.script}.`);
          error.statusCode = 404;
          throw error;
        }
        try {
          const windows = process.platform === 'win32';
          const executable = windows ? (process.env.ComSpec || 'cmd.exe') : 'npm';
          const args = windows ? ['/d', '/s', '/c', `npm.cmd run ${body.script}`] : ['run', body.script];
          const { stdout, stderr } = await execFileAsync(executable, args, {
            cwd: root,
            encoding: 'utf8',
            windowsHide: true,
            timeout: 5 * 60 * 1000,
            maxBuffer: 2 * 1024 * 1024
          });
          sendJson(response, 200, { ok: true, script: body.script, output: `${stdout}${stderr}`.slice(-12000) });
        } catch (error) {
          const output = `${error.stdout || ''}${error.stderr || ''}`.slice(-12000);
          const files = await listSourceFiles(root);
          sendJson(response, 500, {
            ok: false,
            script: body.script,
            error: `Script ${body.script} thất bại${Number.isInteger(error.code) ? ` (exit code ${error.code})` : ''}.`,
            output,
            exitCode: Number.isInteger(error.code) ? error.code : null,
            locations: extractSourceLocations(output, root, files)
          });
        }
        return;
      }

      if (method === 'GET' && publicFiles.has(url.pathname)) {
        const [filename, contentType] = publicFiles.get(url.pathname);
        const content = await fs.readFile(path.join(publicRoot, filename));
        response.writeHead(200, {
          'Content-Type': contentType,
          'Cache-Control': 'no-store',
          'X-Content-Type-Options': 'nosniff'
        });
        response.end(content);
        return;
      }

      const error = new Error('Không tìm thấy đường dẫn.');
      error.statusCode = 404;
      throw error;
    } catch (error) {
      sendError(response, error);
    }
  });
  return server;
}

function assertSameOrigin(request, port) {
  const origin = request.headers.origin;
  const allowedOrigins = new Set([`http://127.0.0.1:${port}`, `http://localhost:${port}`]);
  if (!origin || !allowedOrigins.has(origin)) {
    const error = new Error('Origin không được phép.');
    error.statusCode = 403;
    throw error;
  }
}

async function commitSelected(root, body) {
  if (typeof body.message !== 'string' || !body.message.trim() || body.message.length > 200 ||
      body.message.includes('\0')) {
    const error = new Error('Nhập nội dung commit từ 1 đến 200 ký tự.');
    error.statusCode = 400;
    throw error;
  }
  if (!Array.isArray(body.paths) || body.paths.length < 1 || body.paths.length > 30) {
    const error = new Error('Chọn từ 1 đến 30 file cần commit.');
    error.statusCode = 400;
    throw error;
  }

  const files = await listSourceFiles(root);
  const paths = [];
  for (const rawPath of body.paths) {
    let normalized;
    try {
      ({ normalized } = await safeFilePath(root, rawPath));
    } catch (error) {
      error.statusCode = 400;
      throw error;
    }
    if (!files.some(file => file.path === normalized) || paths.includes(normalized)) {
      const error = new Error('Danh sách commit chứa file không hợp lệ hoặc bị lặp.');
      error.statusCode = 400;
      throw error;
    }
    paths.push(normalized);
  }
  const status = await readGitStatus(root);
  const statusByPath = new Map(status.files.map(file => [file.path, file]));
  const changedPaths = new Set(statusByPath.keys());
  if (paths.some(filePath => !changedPaths.has(filePath))) {
    const error = new Error('Chỉ có thể commit các file đang thay đổi.');
    error.statusCode = 400;
    throw error;
  }
  if (paths.some(filePath => statusByPath.get(filePath).conflicted)) {
    const error = new Error('Không thể commit file đang có xung đột Git.');
    error.statusCode = 400;
    throw error;
  }

  await runGit(root, ['add', '--', ...paths]);
  await runGit(root, ['commit', '--only', '-m', body.message.trim(), '--', ...paths], { timeout: 120000 });
}

function start() {
  const port = Number(process.env.KVPV_SOURCE_MANAGER_PORT || defaultPort);
  const server = createServer({ port });
  server.listen(port, host, () => {
    console.log(`KVPV Source Manager: http://${host}:${port}`);
    console.log('Chỉ lắng nghe trên máy này. Nhấn Ctrl+C để dừng.');
  });
  return server;
}

if (require.main === module) start();

module.exports = {
  createServer,
  listSourceFiles,
  normalizeRelativePath,
  readGitStatus,
  searchFiles,
  extractSourceLocations
};
