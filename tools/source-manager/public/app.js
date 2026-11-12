'use strict';

const $ = id => document.getElementById(id);
let sourceFiles = [];
let currentPath = '';
let savedContent = '';
let gitState = { files: [], branch: '—' };

function escapeText(value) {
  return String(value ?? '');
}

async function api(url, options = {}) {
  const response = await fetch(url, { cache: 'no-store', ...options });
  const data = await response.json();
  if (!response.ok || data.ok !== true) {
    const error = new Error(data.error || `HTTP ${response.status}`);
    Object.assign(error, data);
    throw error;
  }
  return data;
}

function setStatus(message, isError = false) {
  $('footer-status').textContent = escapeText(message);
  $('footer-status').classList.toggle('is-error', isError);
}

function makeFileButton(filePath) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = `file-entry${filePath === currentPath ? ' is-active' : ''}`;
  button.setAttribute('role', 'treeitem');
  button.title = filePath;
  const icon = document.createElement('span');
  icon.className = 'file-icon';
  icon.textContent = filePath.split('/').pop().split('.').pop().slice(0, 2).toUpperCase() || '•';
  const name = document.createElement('span');
  name.className = 'file-name';
  name.textContent = filePath.split('/').pop();
  const modified = gitState.files.some(entry => entry.path === filePath);
  if (modified) {
    const marker = document.createElement('span');
    marker.className = 'change-marker';
    marker.textContent = '●';
    button.append(icon, name, marker);
  } else {
    button.append(icon, name);
  }
  button.addEventListener('click', () => openFile(filePath));
  return button;
}

function renderTree(files = sourceFiles) {
  const tree = $('file-tree');
  tree.replaceChildren();
  const groups = new Map();
  for (const file of files) {
    const parts = file.path.split('/');
    const directory = parts.length > 1 ? parts.slice(0, -1).join('/') : 'ROOT';
    if (!groups.has(directory)) groups.set(directory, []);
    groups.get(directory).push(file.path);
  }

  for (const [directory, paths] of groups) {
    const section = document.createElement('section');
    section.className = 'tree-group';
    const heading = document.createElement('div');
    heading.className = 'tree-folder';
    heading.textContent = `▾  ${directory}`;
    section.append(heading);
    for (const filePath of paths) section.append(makeFileButton(filePath));
    tree.append(section);
  }
  $('visible-count').textContent = `${files.length} file`;
  if (!files.length) {
    const empty = document.createElement('p');
    empty.className = 'empty-note';
    empty.textContent = 'Không tìm thấy file phù hợp.';
    tree.append(empty);
  }
}

async function openFile(filePath) {
  if (hasUnsavedChanges() && !window.confirm('File hiện tại có thay đổi chưa lưu. Bỏ thay đổi để mở file khác?')) return;
  try {
    const data = await api(`/api/file?path=${encodeURIComponent(filePath)}`);
    currentPath = data.path;
    savedContent = data.content;
    $('active-file').textContent = currentPath;
    $('editor').value = data.content;
    $('editor').hidden = false;
    $('editor-empty').hidden = true;
    $('save-file').disabled = true;
    $('editor-status').textContent = 'Đã lưu';
    renderTree();
    setStatus(`Đã mở ${currentPath}`);
    return true;
  } catch (error) {
    setStatus(error.message, true);
    return false;
  }
}

async function openFileAtLocation(location) {
  const opened = await openFile(location.path);
  if (!opened) return;
  const editor = $('editor');
  const lines = editor.value.split('\n');
  const line = Math.max(1, Math.min(Number(location.line) || 1, lines.length));
  const start = lines.slice(0, line - 1).reduce((total, value) => total + value.length + 1, 0);
  const end = start + (lines[line - 1] || '').length;
  editor.focus();
  editor.setSelectionRange(start, end);
  editor.scrollTop = Math.max(0, (line - 1) * parseFloat(getComputedStyle(editor).lineHeight) - editor.clientHeight / 3);
  $('editor-status').textContent = `Dòng ${line}${location.column ? `, cột ${location.column}` : ''}`;
  setStatus(`Đang xem ${location.path}:${line}`);
}

function hasUnsavedChanges() {
  return Boolean(currentPath) && $('editor').value !== savedContent;
}

async function saveFile() {
  if (!currentPath || !hasUnsavedChanges()) return;
  $('save-file').disabled = true;
  try {
    await api('/api/file', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: currentPath, content: $('editor').value })
    });
    savedContent = $('editor').value;
    $('editor-status').textContent = 'Đã lưu';
    setStatus(`Đã lưu ${currentPath}`);
    await refreshOverview();
  } catch (error) {
    $('editor-status').textContent = 'Lưu thất bại';
    setStatus(error.message, true);
  } finally {
    $('save-file').disabled = !currentPath || !hasUnsavedChanges();
  }
}

function renderGitFiles() {
  const container = $('git-files');
  container.replaceChildren();
  if (!gitState.files.length) {
    const empty = document.createElement('p');
    empty.className = 'empty-note';
    empty.textContent = 'Working tree sạch.';
    container.append(empty);
  }
  for (const item of gitState.files) {
    const label = document.createElement('label');
    label.className = 'git-file';
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.value = item.path;
    checkbox.disabled = item.conflicted;
    const filename = document.createElement('span');
    filename.className = 'git-file-name';
    filename.textContent = item.path;
    const status = document.createElement('span');
    status.className = 'git-status';
    status.textContent = item.status;
    label.append(checkbox, filename, status);
    container.append(label);
  }
  $('commit').disabled = gitState.files.length === 0;
  $('change-count').textContent = String(gitState.files.length);
  $('branch-name').textContent = gitState.branch || '—';
  renderTree();
}

function renderScripts(scripts) {
  const container = $('scripts');
  container.replaceChildren();
  for (const script of scripts) {
    const row = document.createElement('div');
    row.className = 'script-row';
    const info = document.createElement('div');
    const name = document.createElement('strong');
    name.textContent = script.name;
    const command = document.createElement('code');
    command.textContent = script.command;
    info.append(name, command);
    row.append(info);
    if (['build', 'test'].includes(script.name)) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'button button-small button-quiet';
      button.textContent = 'Chạy';
      button.addEventListener('click', () => runScript(script.name));
      row.append(button);
    }
    container.append(row);
  }
}

async function refreshOverview() {
  const [overview, list] = await Promise.all([api('/api/overview'), api('/api/files')]);
  sourceFiles = list.files;
  gitState = overview.git;
  $('project-name').textContent = overview.project;
  $('file-count').textContent = String(overview.files);
  $('directory-count').textContent = String(overview.directories);
  $('branch-name').textContent = gitState.branch || '—';
  const stats = $('extension-stats');
  stats.replaceChildren();
  for (const [extension, count] of overview.extensions) {
    const chip = document.createElement('span');
    chip.className = 'extension-chip';
    chip.textContent = `${extension} · ${count}`;
    stats.append(chip);
  }
  renderScripts(overview.scripts);
  renderGitFiles();
  setStatus(`Cập nhật lúc ${new Intl.DateTimeFormat('vi-VN', { hour: '2-digit', minute: '2-digit' }).format(new Date())}`);
}

async function searchSource(event) {
  event.preventDefault();
  const query = $('search-input').value.trim();
  if (query.length < 2) {
    setStatus('Nhập ít nhất 2 ký tự để tìm.', true);
    return;
  }
  try {
    const data = await api('/api/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    });
    const paths = [...new Set(data.results.map(result => result.path))];
    const matches = data.results.map(result => ({ path: result.path, line: result.line, text: result.text }));
    renderTree(paths.map(filePath => ({ path: filePath })));
    $('search-summary').hidden = false;
    $('search-summary').textContent = `${data.results.length} kết quả · quét ${data.scannedFiles} file${data.skippedFiles ? ` · bỏ qua ${data.skippedFiles} file quá lớn/nhị phân` : ''}${data.truncated ? ' · đã giới hạn kết quả' : ''}`;

    const tree = $('file-tree');
    for (const result of matches) {
      const button = [...tree.querySelectorAll('.file-entry')].find(item => item.title === result.path);
      if (!button) continue;
      const preview = document.createElement('span');
      preview.className = 'match-preview';
      preview.textContent = `:${result.line} ${result.text}`;
      const group = button.parentElement;
      group.append(preview);
    }
  } catch (error) {
    setStatus(error.message, true);
  }
}

async function showDiff(filePath) {
  try {
    const suffix = filePath ? `?path=${encodeURIComponent(filePath)}` : '';
    const data = await api(`/api/git/diff${suffix}`);
    showOutput('Git diff', data.diff || 'Không có diff cho file đã chọn.', data.truncated);
  } catch (error) {
    setStatus(error.message, true);
  }
}

function showOutput(title, text, truncated = false, locations = []) {
  $('output-title').textContent = title;
  $('output-content').textContent = `${text}${truncated ? '\n\n[Đã cắt bớt output]' : ''}`;
  const locationList = $('error-locations');
  locationList.replaceChildren();
  locationList.hidden = locations.length === 0;
  if (locations.length) {
    const heading = document.createElement('p');
    heading.className = 'error-heading';
    heading.textContent = `Tìm thấy ${locations.length} vị trí liên quan — bấm để mở file và nhảy tới dòng`;
    locationList.append(heading);
    for (const location of locations) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'error-location';
      const reference = document.createElement('strong');
      reference.textContent = `${location.path}:${location.line}${location.column ? `:${location.column}` : ''}`;
      const context = document.createElement('span');
      context.textContent = location.context;
      button.append(reference, context);
      button.addEventListener('click', () => openFileAtLocation(location));
      locationList.append(button);
    }
  }
  $('output-panel').hidden = false;
  $('output-panel').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function selectedPaths() {
  return [...$('git-files').querySelectorAll('input[type="checkbox"]:checked')].map(input => input.value);
}

async function commitChanges() {
  const paths = selectedPaths();
  const message = $('commit-message').value.trim();
  if (!paths.length || !message) {
    setStatus('Chọn file và nhập nội dung commit.', true);
    return;
  }
  if (!window.confirm(`Commit ${paths.length} file đã chọn với nội dung:\n\n${message}\n\nTiếp tục?`)) return;
  try {
    const result = await api('/api/git/commit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paths, message })
    });
    $('commit-message').value = '';
    showOutput('Commit', result.message);
    await refreshOverview();
  } catch (error) {
    setStatus(error.message, true);
  }
}

async function gitAction(action, confirmation) {
  if (!window.confirm(confirmation)) return;
  try {
    const result = await api(`/api/git/${action}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: '{}'
    });
    showOutput(action === 'pull' ? 'Pull' : 'Push', result.output || 'Hoàn tất.');
    await refreshOverview();
  } catch (error) {
    setStatus(error.message, true);
  }
}

async function runScript(script) {
  const message = script === 'build'
    ? 'Chạy build? Quá trình có thể ghi đè các bundle đã sinh. Kiểm tra trước khi tiếp tục.'
    : 'Chạy bộ test của project?';
  if (!window.confirm(message)) return;
  setStatus(`Đang chạy ${script}…`);
  try {
    const result = await api('/api/scripts/run', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ script })
    });
    showOutput(`npm run ${script}`, result.output || 'Hoàn tất.');
    await refreshOverview();
  } catch (error) {
    showOutput(`npm run ${script} · lỗi`, error.output || error.message, false, error.locations || []);
    setStatus(error.message, true);
  }
}

$('refresh').addEventListener('click', () => refreshOverview().catch(error => setStatus(error.message, true)));
$('save-file').addEventListener('click', saveFile);
$('editor').addEventListener('input', () => {
  const changed = hasUnsavedChanges();
  $('editor-status').textContent = changed ? 'Có thay đổi chưa lưu' : 'Đã lưu';
  $('save-file').disabled = !changed;
});
$('search-form').addEventListener('submit', searchSource);
$('search-input').addEventListener('input', () => {
  if (!$('search-input').value) {
    $('search-summary').hidden = true;
    renderTree();
  }
});
$('show-diff').addEventListener('click', () => showDiff(currentPath));
$('commit').addEventListener('click', commitChanges);
$('git-files').addEventListener('change', () => {
  $('commit').disabled = selectedPaths().length === 0;
});
$('pull').addEventListener('click', () => gitAction('pull', 'Pull chỉ cho phép fast-forward. Tải thay đổi từ remote ngay bây giờ?'));
$('push').addEventListener('click', () => gitAction('push', 'Push commit local lên remote của nhánh hiện tại?'));
$('close-output').addEventListener('click', () => { $('output-panel').hidden = true; });
window.addEventListener('beforeunload', event => {
  if (!hasUnsavedChanges()) return;
  event.preventDefault();
  event.returnValue = '';
});

refreshOverview().catch(error => setStatus(error.message, true));
