'use strict';

const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');
const crypto = require('node:crypto');
const { readArtifact } = require('../../live/project.cjs');
const { readControlDocument, writeModuleControls, validRedDotControls, moduleSchema } = require('../../live/desktop-controls.cjs');
const dashboardModuleSchema = require('../../live/dashboard-module-schema.json');

const root = path.resolve(__dirname, '../..');
const host = '127.0.0.1';
const port = Number(process.env.KVPV_DASHBOARD_PORT || 4177);
const maxDiagnosticBytes = 128 * 1024;
const maxControlRequestBytes = 32 * 1024;
const actorRefSecret = crypto.randomBytes(32);
const moduleLabels = {
  '09-combat-engine.js': 'Bộ điều khiển chiến đấu',
  '14-eight-floor.js': 'Tám tầng',
  '15-honor-targets.js': 'Mục tiêu danh dự',
  '16-strongest-team.js': 'Đội mạnh nhất',
  '17-linh-lung-th.js': 'Linh Lung TH',
  '20-daily-trial.js': 'Thí luyện hằng ngày',
  '56-free-treasure.js': 'Báu miễn phí',
  '57-free-daily-bag.js': 'Túi quà hằng ngày',
  '59-road-cadence.js': 'Nhịp chiến đấu đường',
  '62-resume-stage.js': 'Tự Vượt',
  '60-quiz-auto.js': 'Trả lời câu hỏi',
  '61-peak-chest.js': 'Rương đỉnh cao',
  '63-peak-completion.js': 'Hoàn tất Đỉnh Cao',
  '64-eight-chest.js': 'Rương tám tầng',
  '65-marry-arena.js': 'Đấu trường kết duyên',
  '66-pet-travel.js': 'Linh thú du ngoạn',
  '67-login-streak.js': 'Đăng nhập liên tục',
  '68-festival-free.js': 'Quà sự kiện',
  '69-marry-rewards.js': 'Quà kết duyên',
  '70-four-worship.js': 'Bốn lần bái',
  '71-kiem-khieu.js': 'Kiếm Khiêu',
  '74-tien-ton-native-auto.js': 'Tiên Tôn',
  '75-pvp-luofeng.js': 'Lạc Phong PvP',
  '76-trutien-pvp.js': 'Tru Tiên PvP',
  '77-strongest-team-pvp.js': 'Đội mạnh nhất PvP',
  '78-tula-pvp.js': 'Tu La PvP',
  '80-tienma-quyetchien-pvp.js': 'Thiên Ma Quyết Chiến',
  '81-tranh-ba-tu-phuong-pvp.js': 'Tranh Bá Tứ Phương',
  '24-summon-boss.js': 'Triệu hồi Boss',
  '25-rune-boss.js': 'Boss Phù Văn'
};
const moduleGroups = {
  '08-range-evidence.js': 'Giao tranh (tự chọn theo map)',
  '09-combat-engine.js': 'Giao tranh (tự chọn theo map)',
  '12-basic-outside.js': 'Giao tranh (tự chọn theo map)',
  '14-eight-floor.js': 'Hằng ngày',
  '15-honor-targets.js': 'PvP',
  '16-strongest-team.js': 'PvP',
  '17-linh-lung-th.js': 'Hằng ngày',
  '20-daily-trial.js': 'Hằng ngày',
  '23-beast-island.js': 'Khác',
  '24-summon-boss.js': 'Hằng ngày',
  '25-rune-boss.js': 'Hằng ngày',
  '50-companion-combat.js': 'Giao tranh (tự chọn theo map)',
  '56-free-treasure.js': 'Hằng ngày',
  '57-free-daily-bag.js': 'Hằng ngày',
  '59-road-cadence.js': 'Giao tranh (tự chọn theo map)',
  '62-resume-stage.js': 'Hằng ngày',
  '60-quiz-auto.js': 'Hằng ngày',
  '61-peak-chest.js': 'Hằng ngày',
  '63-peak-completion.js': 'Hằng ngày',
  '64-eight-chest.js': 'Hằng ngày',
  '65-marry-arena.js': 'PvP',
  '66-pet-travel.js': 'Hằng ngày',
  '67-login-streak.js': 'Hằng ngày',
  '68-festival-free.js': 'Hằng ngày',
  '69-marry-rewards.js': 'Hằng ngày',
  '70-four-worship.js': 'Hằng ngày',
  '71-kiem-khieu-basic.js': 'Giao tranh (tự chọn theo map)',
  '71-kiem-khieu.js': 'PvP',
  '74-tien-ton-native-auto.js': 'Hằng ngày',
  '75-pvp-luofeng.js': 'Giao tranh (tự chọn theo map)',
  '76-trutien-pvp.js': 'Giao tranh (tự chọn theo map)',
  '77-strongest-team-pvp.js': 'Giao tranh (tự chọn theo map)',
  '78-tula-pvp.js': 'Giao tranh (tự chọn theo map)',
  '80-tienma-quyetchien-pvp.js': 'Giao tranh (tự chọn theo map)',
  '81-tranh-ba-tu-phuong-pvp.js': 'Giao tranh (tự chọn theo map)',
  '84-basic310-universal.js': 'Giao tranh (tự chọn theo map)',
  '85-le-hoi-khu-thu-boss.js': 'Giao tranh (tự chọn theo map)',
  '86-dinh-cao-basic-combo.js': 'Giao tranh (tự chọn theo map)'
};
const publicFiles = new Map([
  ['/', ['index.html', 'text/html; charset=utf-8']],
  ['/app.js', ['app.js', 'text/javascript; charset=utf-8']],
  ['/styles.css', ['styles.css', 'text/css; charset=utf-8']]
]);

if (!Number.isInteger(port) || port < 1024 || port > 65535) {
  throw new Error('KVPV_DASHBOARD_PORT must be an integer between 1024 and 65535.');
}

let buildCache = { key: '', value: null };

function readBuildStatus() {
  const manifestPath = path.join(root, 'MANIFEST.json');
  const fullPath = path.join(root, 'KVPV_V1_FULL.js');
  try {
    const manifestStat = fs.statSync(manifestPath);
    const fullStat = fs.statSync(fullPath);
    const key = [manifestStat.size, manifestStat.mtimeMs, fullStat.size, fullStat.mtimeMs].join(':');
    if (buildCache.key === key && buildCache.value) return buildCache.value;

    const artifact = readArtifact(root);
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    const fullBundle = fs.readFileSync(fullPath, 'utf8');
    buildCache = {
      key,
      value: {
        ok: true,
        build: artifact.build,
        sha256: artifact.sha256,
        embeddedModules: Array.isArray(manifest.embeddedModules) ? manifest.embeddedModules.length : null,
        controlSchemaReady: fullBundle.includes(`window.__KVPV_CONTROL_SCHEMA=Object.freeze(${JSON.stringify(moduleSchema)});`),
        controlProfileVersionReady: fullBundle.includes('window.__KVPV_CONTROL_PROFILE_VERSION=6;'),
        checkedAt: Date.now()
      }
    };
  } catch (error) {
    buildCache = {
      key: '',
      value: { ok: false, error: String(error.message || error).slice(0, 180), checkedAt: Date.now() }
    };
  }
  return buildCache.value;
}

function isProcessRunning(pid) {
  try {
    process.kill(pid, 0);
    return true;
  } catch (error) {
    return error.code === 'EPERM';
  }
}

function readWatcherStatus() {
  const pidPath = path.join(root, '.kvpv-live', 'watcher.pid');
  try {
    const stat = fs.lstatSync(pidPath);
    if (!stat.isFile() || stat.isSymbolicLink() || stat.size > 32) return { state: 'unknown' };
    const text = fs.readFileSync(pidPath, 'utf8').trim();
    if (!/^[1-9]\d{0,9}$/.test(text)) return { state: 'unknown' };
    const pid = Number(text);
    return { state: isProcessRunning(pid) ? 'running' : 'stale' };
  } catch (error) {
    if (error.code === 'ENOENT') return { state: 'not-running' };
    return { state: 'unknown' };
  }
}

function maskedActor(actor) {
  return actor.length > 6 ? `${actor.slice(0, 3)}…${actor.slice(-3)}` : '***';
}

function actorReference(actor) {
  return crypto.createHmac('sha256', actorRefSecret).update(actor).digest('hex').slice(0, 32);
}

function summarizeReport(report, filename) {
  const actor = String(report?.actor ?? '');
  if (report?.schema !== 1 || !/^[1-9]\d{4,24}$/.test(actor) || `${actor}.json` !== filename ||
      report.at > Date.now() + 5000 ||
      !Number.isFinite(report.at) || !/^[a-f0-9]{12}$/.test(String(report.build ?? ''))) return null;

  const redDots = Array.isArray(report.redDots) ? report.redDots.slice(0, 256) : [];
  const activeDots = redDots.filter(dot => dot && dot.active === true);
  const stage = report.stage && typeof report.stage === 'object' ? report.stage : {};
  const entry = report.manualEntry && typeof report.manualEntry === 'object' ? report.manualEntry : {};
  const dailyTrial = report.dailyTrial && typeof report.dailyTrial === 'object' ? report.dailyTrial : {};
  const control = report.desktopControl && typeof report.desktopControl === 'object' ? report.desktopControl : {};
  const modulePresence = Array.isArray(report.modulePresence) ? report.modulePresence.slice(0, 300) : [];
  const redDotCatalog = Array.isArray(report.redDotCatalog) ? report.redDotCatalog.slice(0, 256)
    .filter(item => Number.isSafeInteger(item?.id) && item.id >= 0 &&
      typeof item.name === 'string' && item.name.length <= 100 &&
      typeof item.controlGroup === 'string' && item.controlGroup.length > 0 && item.controlGroup.length <= 80)
    .map(item => ({ id: item.id, name: item.name, group: item.controlGroup, enabled: item.enabled !== false })) : [];
  const now = Date.now();
  const ageMs = Math.max(0, now - report.at);
  const heartbeatAt = Number.isFinite(report.heartbeatAt) && report.heartbeatAt <= now + 5000
    ? report.heartbeatAt
    : report.at;
  const heartbeatAgeMs = Math.max(0, now - heartbeatAt);

  return {
    actor: maskedActor(actor),
    actorRef: actorReference(actor),
    at: report.at,
    ageMs,
    heartbeatAgeMs,
    online: heartbeatAgeMs <= 30000,
    build: report.build,
    sourceBuild: /^[a-f0-9]{12}$/.test(String(report.sourceBuild ?? '')) ? String(report.sourceBuild) : null,
    entry: {
      started: entry.started === true,
      mode: String(entry.mode ?? '').slice(0, 40),
      reason: String(entry.reason ?? '').slice(0, 100)
    },
    stage: {
      auto: stage.auto === true,
      running: stage.running === true,
      job: String(stage.job ?? '').slice(0, 60),
      step: String(stage.step ?? '').slice(0, 60)
    },
    dailyTrial: {
      phase: String(dailyTrial.phase ?? '').slice(0, 40),
      reason: String(dailyTrial.reason ?? '').slice(0, 100)
    },
    redDots: {
      active: activeDots.length,
      automatic: activeDots.filter(dot => dot.automatic === true).length,
      names: activeDots.slice(0, 6).map(dot => String(dot.name ?? 'Red-dot').slice(0, 60))
    },
    redDotCatalog,
    missingExecutors: Array.isArray(report.missing) ? Math.min(report.missing.length, 80) : 0,
    modules: modulePresence.filter(module => module?.present === true).length,
    desktopControl: {
      reason: String(control.reason ?? '').slice(0, 80),
      lastError: String(control.lastError ?? '').slice(0, 1200),
      reloadRequired: control.reloadRequired === true,
      runtimeModules: Array.isArray(control.runtimeModules)
        ? control.runtimeModules.filter(file => Object.hasOwn(moduleSchema, file)).slice(0, 128)
        : [],
      requested: /^[a-f0-9]{32}$/.test(String(control.requested ?? '')) ? control.requested : null,
      applied: /^[a-f0-9]{32}$/.test(String(control.applied ?? '')) ? control.applied : null,
      modules: Object.fromEntries(Object.entries(control.modules && typeof control.modules === 'object' ? control.modules : {})
        .filter(([file, enabled]) => Object.hasOwn(moduleSchema, file) && typeof enabled === 'boolean'))
    }
  };
}

function readDiagnosticEntries() {
  const dir = path.join(root, '.kvpv-live', 'diagnostics');
  let names;
  try {
    names = fs.readdirSync(dir).filter(name => /^[1-9]\d{4,24}\.json$/.test(name)).slice(0, 64);
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }

  const reports = [];
  for (const name of names) {
    try {
      const file = path.join(dir, name);
      const stat = fs.lstatSync(file);
      if (!stat.isFile() || stat.isSymbolicLink() || stat.size > maxDiagnosticBytes) continue;
      const report = JSON.parse(fs.readFileSync(file, 'utf8'));
      const summary = summarizeReport(report, name);
      if (summary) reports.push({ actorId: String(report.actor), summary });
    } catch (error) {
      if (error.code !== 'ENOENT') console.warn(`Skipping unreadable diagnostic ${name}: ${error.message}`);
    }
  }
  return reports.sort((a, b) => b.summary.at - a.summary.at).slice(0, 32);
}

function readDiagnostics() {
  return readDiagnosticEntries().map(entry => entry.summary);
}

function readManagedProfiles() {
  const doc = readControlDocument(root);
  return Object.entries(doc.actors).map(([actor, profile]) => ({
    actorRef: actorReference(actor),
    revision: profile.revision,
    modules: profile.modules || {},
    redDots: profile.redDots || null
  }));
}

function getModuleCatalog() {
  const groupOrder = ['Giao tranh (tự chọn theo map)', 'Hằng ngày', 'PvP', 'Khác'];
  return Object.entries(moduleSchema).map(([file, api]) => ({
    file,
    api: Array.isArray(api) ? api.join(', ') : api,
    group: moduleGroups[file] || 'Khác',
    label: moduleLabels[file] || file.replace(/^\d+-/, '').replace(/\.js$/, '').replace(/[-_]+/g, ' ')
  })).sort((left, right) => groupOrder.indexOf(left.group) - groupOrder.indexOf(right.group));
}

function readControlBody(request) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let length = 0;
    let tooLarge = false;
    request.on('data', chunk => {
      length += chunk.length;
      if (length > maxControlRequestBytes) tooLarge = true;
      else if (!tooLarge) chunks.push(chunk);
    });
    request.on('end', () => {
      if (tooLarge) {
        const error = new Error('Dữ liệu điều khiển vượt quá giới hạn.');
        error.statusCode = 413;
        reject(error);
        return;
      }
      let body;
      try {
        body = JSON.parse(Buffer.concat(chunks).toString('utf8'));
      } catch {
        const error = new Error('Nội dung điều khiển không phải JSON hợp lệ.');
        error.statusCode = 400;
        reject(error);
        return;
      }
      if (!body || typeof body !== 'object' || Array.isArray(body)) {
        const error = new Error('Nội dung điều khiển phải là một object JSON.');
        error.statusCode = 400;
        reject(error);
        return;
      }
      resolve(body);
    });
    request.on('error', reject);
  });
}

function validRedDotControlsForCatalog(value, catalog) {
  if (!validRedDotControls(value) || !Array.isArray(catalog)) return false;
  const ids = new Set(catalog.map(item => String(item.id)));
  const groups = new Set(catalog.map(item => item.group));
  return Object.entries(value.ids).every(([id]) => ids.has(id)) &&
    Object.entries(value.groups).every(([group]) => groups.has(group));
}

function sendJson(response, status, value) {
  response.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff'
  });
  response.end(JSON.stringify(value));
}

function handleModuleUpdate(request, response) {
  if (request.headers.origin !== `http://${host}:${port}` && request.headers.origin !== `http://localhost:${port}`) {
    sendJson(response, 403, { ok: false, error: 'Yêu cầu điều khiển phải đến từ dashboard localhost.' });
    return;
  }
  readControlBody(request).then(body => {
    if (typeof body.actorRef !== 'string' || !/^[a-f0-9]{32}$/.test(body.actorRef)) {
      const error = new Error('Chưa chọn nhân vật hợp lệ.');
      error.statusCode = 400;
      throw error;
    }
    const target = readDiagnosticEntries().find(entry => actorReference(entry.actorId) === body.actorRef);
    if (!target) {
      const error = new Error('Không tìm thấy nhân vật trong báo cáo cục bộ. Hãy làm mới trạng thái.');
      error.statusCode = 404;
      throw error;
    }
    if (!target.summary.online) {
      const error = new Error('Nhân vật đã ngắt kết nối. Chỉ có thể áp dụng cho nhân vật đang kết nối.');
      error.statusCode = 409;
      throw error;
    }
    const moduleKeys = body.modules && typeof body.modules === 'object' && !Array.isArray(body.modules)
      ? Object.keys(body.modules)
      : [];
    if (moduleKeys.length > 0 &&
        readBuildStatus().controlSchemaReady !== true) {
      const error = new Error('Cần chạy npm.cmd run build trước khi áp dụng cấu hình module mới.');
      error.statusCode = 409;
      throw error;
    }
    if (body.redDots !== undefined && !validRedDotControlsForCatalog(body.redDots, target.summary.redDotCatalog)) {
      const error = new Error('Cấu hình red-dot có nhóm hoặc mục không được nhân vật hỗ trợ.');
      error.statusCode = 400;
      throw error;
    }
    if (body.redDots !== undefined && readBuildStatus().controlProfileVersionReady !== true) {
      const error = new Error('Cần chạy npm.cmd run build trước khi áp dụng cấu hình module/red-dot.');
      error.statusCode = 409;
      throw error;
    }
    const saved = writeModuleControls(root, target.actorId, body.modules || {}, body.redDots);
    sendJson(response, 200, {
      ok: true,
      actorRef: body.actorRef,
      revision: saved.revision,
      modules: saved.modules,
      redDots: saved.redDots
    });
  }).catch(error => {
    sendJson(response, Number.isInteger(error.statusCode) ? error.statusCode : 400, {
      ok: false,
      error: String(error.message || error).slice(0, 300)
    });
  });
}

function readStatus() {
  const profiles = new Map(readManagedProfiles().map(profile => [profile.actorRef, profile]));
  const reports = readDiagnostics().map(report => ({
    ...report,
    controlProfile: profiles.get(report.actorRef) || null
  }));
  const connected = reports.filter(report => report.online).length;
  return {
    ok: true,
    at: Date.now(),
    build: readBuildStatus(),
    watcher: readWatcherStatus(),
    sync: connected > 0 ? 'connected' : 'disconnected',
    connectedAccounts: connected,
    reports,
    moduleCatalog: getModuleCatalog()
  };
}

const server = http.createServer((request, response) => {
  const allowedHosts = new Set([`${host}:${port}`, `localhost:${port}`]);
  if (!allowedHosts.has(String(request.headers.host ?? '').toLowerCase())) {
    sendJson(response, 403, { ok: false, error: 'Localhost requests only.' });
    return;
  }

  const origin = request.headers.origin;
  if (origin && origin !== `http://${host}:${port}` && origin !== `http://localhost:${port}`) {
    sendJson(response, 403, { ok: false, error: 'Cross-origin requests are not allowed.' });
    return;
  }

  let pathname;
  try {
    pathname = new URL(request.url, `http://${host}:${port}`).pathname;
  } catch {
    sendJson(response, 400, { ok: false, error: 'Invalid request URL.' });
    return;
  }

  if (pathname === '/api/modules' && request.method === 'POST') {
    handleModuleUpdate(request, response);
    return;
  }

  if (pathname === '/api/health' && request.method === 'GET') {
    sendJson(response, 200, {
      ok: true,
      project: path.basename(root),
      host,
      port,
      mode: 'dashboard',
      checkedAt: Date.now()
    });
    return;
  }

  if (request.method !== 'GET') {
    response.writeHead(405, { Allow: 'GET, POST', 'Cache-Control': 'no-store' });
    response.end();
    return;
  }

  if (pathname === '/api/status') {
    try {
      sendJson(response, 200, readStatus());
    } catch (error) {
      sendJson(response, 500, { ok: false, error: String(error.message || error).slice(0, 180) });
    }
    return;
  }

  const file = publicFiles.get(pathname);
  if (!file) {
    sendJson(response, 404, { ok: false, error: 'Not found.' });
    return;
  }

  try {
    const body = fs.readFileSync(path.join(__dirname, 'public', file[0]));
    response.writeHead(200, {
      'Content-Type': file[1],
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
      'Content-Security-Policy': "default-src 'self'; script-src 'self'; style-src 'self'; connect-src 'self'; img-src 'self' data:; object-src 'none'; base-uri 'none'; frame-ancestors 'none'"
    });
    response.end(body);
  } catch (error) {
    sendJson(response, 500, { ok: false, error: `Cannot read dashboard UI: ${String(error.message || error).slice(0, 120)}` });
  }
});

server.on('error', error => {
  console.error(`Dashboard could not listen on http://${host}:${port}: ${error.message}`);
  process.exitCode = 1;
});

server.listen(port, host, () => {
  console.log(`KVPV dashboard: http://${host}:${port}`);
  console.log('Read-only local status; stop with Ctrl+C.');
});
