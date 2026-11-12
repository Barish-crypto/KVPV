'use strict';

const $ = id => document.getElementById(id);
let currentData = null;
let selectedActorRef = '';
let draftActorRef = '';
let draftModules = null;
let draftRedDots = null;
let lastConnectionSummary = null;
let applyTimer = null;
let applyingModules = false;
let refreshing = false;
let applyAgain = false;
let changeVersion = 0;
const redDotDispatcherFile = '01-red-dot-module.js';

function setStatus(message, isError = false) {
  $('footer-status').textContent = String(message ?? '');
  $('footer-status').classList.toggle('is-error', isError);
}

function setAppHealth(state, message) {
  const badge = $('app-health');
  badge.classList.remove('is-online', 'is-offline', 'is-pending');
  badge.classList.add(`is-${state}`);
  badge.lastElementChild.textContent = message;
}

function sameModules(left, right) {
  const normalize = value => (currentData?.moduleCatalog || [])
    .map(module => [module.file, value?.[module.file] === true]);
  return JSON.stringify(normalize(left)) === JSON.stringify(normalize(right));
}

function normalizeRedDots(value) {
  const sortObject = object => Object.fromEntries(Object.entries(object || {}).sort(([left], [right]) => left.localeCompare(right)));
  return JSON.stringify({
    groups: sortObject(value?.groups),
    ids: sortObject(value?.ids)
  });
}

function sameRedDots(left, right) {
  return normalizeRedDots(left) === normalizeRedDots(right);
}

function selectedReport() {
  return currentData?.reports?.find(report => report.actorRef === selectedActorRef) || null;
}

function collectModules() {
  const modules = Object.fromEntries([...$('module-list').querySelectorAll('[data-module]')]
    .map(input => [input.dataset.module, input.checked]));
  const report = selectedReport();
  const redDots = draftActorRef === report?.actorRef && draftRedDots
    ? draftRedDots
    : report?.controlProfile?.redDots || { groups: {}, ids: {} };
  const redDotCatalog = report?.redDotCatalog || [];
  const enabledAction = redDotCatalog.some(action => {
    const id = String(action.id);
    if (Object.hasOwn(redDots.ids || {}, id)) return redDots.ids[id] === true;
    return redDots.groups?.[action.group] === true;
  });
  modules[redDotDispatcherFile] = redDotCatalog.length > 0
    ? enabledAction
    : (draftActorRef === report?.actorRef && draftModules
      ? draftModules[redDotDispatcherFile] === true
      : report?.controlProfile?.modules?.[redDotDispatcherFile] === true);
  return modules;
}

function updateApplyButton() {
  const report = selectedReport();
  const saved = report?.controlProfile || {};
  const modulesChanged = report && !sameModules(collectModules(), saved.modules || {});
  const redDotsChanged = report && draftActorRef === report.actorRef && draftRedDots &&
    !sameRedDots(draftRedDots, saved.redDots || {});
  $('save-modules').disabled = applyingModules || !report || !report.online || (!modulesChanged && !redDotsChanged);
}

function scheduleApplyModules() {
  changeVersion++;
  clearTimeout(applyTimer);
  setStatus('Đang áp dụng thay đổi…');
  applyTimer = window.setTimeout(() => {
    applyTimer = null;
    void applyModules();
  }, 120);
}

function updateModuleGroupCheckbox(group) {
  const inputs = [...group.querySelectorAll('[data-module]')];
  const enabled = inputs.filter(input => input.checked).length;
  const toggle = group.querySelector('[data-module-group-toggle]');
  toggle.checked = inputs.length > 0 && enabled === inputs.length;
  toggle.indeterminate = enabled > 0 && enabled < inputs.length;
  group.querySelector('[data-group-count]').textContent = `${enabled}/${inputs.length} bật`;
}

function moduleApplyStatus(report) {
  const control = report.desktopControl || {};
  const revision = report.controlProfile?.revision;
  if (!report.online) {
    return {
      text: 'Tab game ngoại tuyến · đang hiển thị dữ liệu cuối cùng',
      detail: `Báo cáo cuối cùng đã cũ ${Math.round(report.ageMs / 1000)} giây. Danh sách chỉ đọc cho đến khi tab kết nối lại.`
    };
  }
  if (report.ageMs > 30000) {
    return {
      text: 'Tab game đang kết nối · dữ liệu chẩn đoán chưa làm mới',
      detail: `Heartbeat còn hoạt động, nhưng dữ liệu hiển thị đã cũ ${Math.round(report.ageMs / 1000)} giây.`
    };
  }
  if (control.reason === 'waiting_module_api') {
    return {
      text: 'Đang chờ module sẵn sàng',
      detail: 'Installer chưa công bố đủ API; runtime sẽ tự thử lại.'
    };
  }
  if (!revision) return { text: 'Đang kết nối', detail: '' };
  if (control.reloadRequired) {
    return {
      text: 'Runtime cũ: tải lại tab game một lần để bật/tắt nóng.',
      detail: 'Runtime trên tab game chưa có installer cho các module được chọn.',
      isError: true
    };
  }
  if (control.lastError) {
    return { text: `Lỗi: ${control.lastError}`, detail: control.lastError, isError: true };
  }
  if (control.applied === revision) return { text: 'Đã áp dụng', detail: '' };
  if (report.ageMs >= 15000) {
    return {
      text: 'Đang chờ phản hồi từ tab game…',
      detail: `Báo cáo cuối cùng đã cũ ${Math.round(report.ageMs / 1000)} giây.`
    };
  }
  if (control.requested !== revision) {
    return {
      text: 'Đang chờ extension gửi cấu hình…',
      detail: 'Cấu hình đã lưu trên dashboard nhưng tab game chưa xác nhận đã nhận revision này.'
    };
  }
  if (control.reason === 'waiting_user_or_revive') {
    return {
      text: 'Đang chờ thao tác UI kết thúc hoặc nhân vật hồi sinh…',
      detail: 'Tab game tạm hoãn áp dụng module khi đang thao tác giao diện hoặc nhân vật chưa sống.'
    };
  }
  if (control.reason === 'waiting_local_profile') {
    return {
      text: 'Đang chờ extension đồng bộ cấu hình…',
      detail: 'Tab game chưa nhận được profile cục bộ từ extension.'
    };
  }
  return {
    text: 'Đang áp dụng…',
    detail: `Tab game đã nhận cấu hình; trạng thái hiện tại: ${control.reason || 'đang chờ xác nhận'}.`
  };
}

function applyListFilter(listId, filterId, enabledOnlyId, rowSelector) {
  const query = normalizeSearchText($(filterId).value.trim());
  const enabledOnly = $(enabledOnlyId).checked;
  const list = $(listId);
  const groups = [...list.querySelectorAll('[data-filter-group]')];
  let totalVisible = 0;
  for (const group of groups) {
    let visible = 0;
    const groupMatches = query && normalizeSearchText(group.querySelector('summary')?.textContent).includes(query);
    for (const row of group.querySelectorAll(rowSelector)) {
      const checkbox = row.querySelector('input[type="checkbox"]');
      const matches = !query || groupMatches || normalizeSearchText(row.textContent).includes(query);
      row.hidden = !matches || (enabledOnly && !checkbox.checked);
      if (!row.hidden) visible++;
    }
    group.hidden = visible === 0;
    totalVisible += visible;
    if (query) {
      const details = group.querySelector('details');
      if (details) details.open = visible > 0;
    }
  }
  let empty = list.querySelector('[data-filter-empty]');
  if (groups.length > 0 && totalVisible === 0 && (query || enabledOnly)) {
    if (!empty) {
      empty = document.createElement('p');
      empty.className = 'empty-state';
      empty.dataset.filterEmpty = '';
      list.append(empty);
    }
    empty.textContent = query
      ? 'Không tìm thấy mục phù hợp. Hãy thử tên không dấu, ID hoặc tên nhóm.'
      : 'Không có mục nào đang bật.';
  } else {
    empty?.remove();
  }
}

function normalizeSearchText(value) {
  return String(value ?? '').toLocaleLowerCase('vi')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd');
}

function applyFilters() {
  applyListFilter('module-list', 'module-filter', 'module-enabled-only', '[data-filter-row="module"]');
  applyListFilter('red-dot-list', 'red-dot-filter', 'red-dot-enabled-only', '[data-filter-row="red-dot"]');
}

function renderModules() {
  const report = selectedReport();
  const list = $('module-list');
  const redDotList = $('red-dot-list');
  const openModuleGroups = new Set([...list.querySelectorAll('[data-module-group-details][open]')]
    .map(details => details.dataset.moduleGroupDetails));
  const openRedDotGroups = new Set([...redDotList.querySelectorAll('[data-red-dot-group-details][open]')]
    .map(details => details.dataset.redDotGroupDetails));
  list.replaceChildren();
  redDotList.replaceChildren();

  if (!report) {
    draftActorRef = '';
    draftModules = null;
    draftRedDots = null;
    $('enable-daily-modules').disabled = true;
    $('enable-all-modules').disabled = true;
    $('enable-all-red-dots').disabled = true;
    $('character-status').textContent = 'Chưa có nhân vật kết nối.';
    $('character-status').title = '';
    $('character-status').classList.remove('is-error');
    $('save-modules').disabled = true;
    const empty = document.createElement('p');
    empty.className = 'empty-state';
    empty.textContent = 'Mở tab game và bật đồng bộ để hiện nhân vật.';
    list.append(empty);
    return;
  }

  $('enable-daily-modules').disabled = !report.online ||
    !(currentData.moduleCatalog || []).some(module => module.group === 'Hằng ngày' && module.file !== redDotDispatcherFile);
  $('enable-all-modules').disabled = !report.online ||
    !(currentData.moduleCatalog || []).some(module => module.file !== redDotDispatcherFile);
  const saved = report.controlProfile?.modules || {};
  const savedRedDots = report.controlProfile?.redDots || { groups: {}, ids: {} };
  if (!report.online) {
    const stale = document.createElement('p');
    stale.className = 'empty-state';
    stale.textContent = report.online
      ? `Tab game vẫn kết nối, nhưng danh sách đang giữ dữ liệu nhận ${Math.round(report.ageMs / 1000)} giây trước.`
      : `Đang giữ danh sách đã nhận ${Math.round(report.ageMs / 1000)} giây trước. Tab game ngoại tuyến nên danh sách chỉ đọc.`;
    redDotList.append(stale);
  }
  const values = draftActorRef === report.actorRef && draftModules
    ? draftModules
    : Object.fromEntries((currentData.moduleCatalog || []).map(module => [module.file, saved[module.file] === true]));

  const groups = new Map();
  const moduleGroupSections = new Map();
  for (const module of currentData.moduleCatalog || []) {
    if (module.file === redDotDispatcherFile) continue;
    const groupName = module.group || 'Khác';
    let group = groups.get(groupName);
    if (!group) {
      const section = document.createElement('section');
      section.className = 'module-group';
      section.dataset.filterGroup = 'module';
      const heading = document.createElement('div');
      heading.className = 'module-group-heading';
      const details = document.createElement('details');
      details.className = 'module-group-details';
      details.dataset.moduleGroupDetails = groupName;
      details.open = openModuleGroups.has(groupName);
      const summary = document.createElement('summary');
      const title = document.createElement('span');
      title.textContent = groupName;
      const count = document.createElement('span');
      count.className = 'group-count';
      count.dataset.groupCount = '';
      summary.append(title, count);
      const rows = document.createElement('div');
      rows.className = 'module-group-list';
      details.append(summary, rows);
      const toggleLabel = document.createElement('label');
      toggleLabel.className = 'module-group-toggle';
      toggleLabel.append(document.createTextNode('Toàn nhóm'));
      const toggle = document.createElement('input');
      toggle.type = 'checkbox';
      toggle.dataset.moduleGroupToggle = '';
      toggle.setAttribute('aria-label', `Bật toàn bộ module nhóm ${groupName}`);
      toggleLabel.append(toggle);
      heading.append(details, toggleLabel);
      section.append(heading);
      list.append(section);
      group = rows;
      groups.set(groupName, group);
      moduleGroupSections.set(groupName, section);
      toggle.addEventListener('change', () => {
        for (const input of rows.querySelectorAll('[data-module]')) input.checked = toggle.checked;
        draftActorRef = report.actorRef;
        draftModules = collectModules();
        updateModuleGroupCheckbox(section);
        updateApplyButton();
        applyFilters();
        scheduleApplyModules();
      });
    }

    const label = document.createElement('label');
    label.className = 'module-row';
    label.dataset.filterRow = 'module';
    const name = document.createElement('span');
    name.textContent = module.label;
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'module-checkbox';
    checkbox.dataset.module = module.file;
    checkbox.checked = values[module.file] === true;
    checkbox.disabled = !report.online;
    checkbox.setAttribute('aria-label', `Bật ${module.label}`);
    checkbox.addEventListener('change', () => {
      draftActorRef = report.actorRef;
      draftModules = collectModules();
      updateModuleGroupCheckbox(moduleGroupSections.get(groupName));
      updateApplyButton();
      scheduleApplyModules();
    });
    label.append(name, checkbox);
    group.append(label);
  }
  for (const section of moduleGroupSections.values()) updateModuleGroupCheckbox(section);

  const actions = (report.redDotCatalog || []).filter(item =>
    Number.isSafeInteger(item.id) && typeof item.name === 'string' && typeof item.group === 'string');
  $('enable-all-red-dots').disabled = !report.online || actions.length === 0;
  if (actions.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'empty-state';
    const dashboardBuild = currentData.build?.build;
    if (dashboardBuild && report.sourceBuild && dashboardBuild !== report.sourceBuild) {
      empty.textContent = `Tab game đang dùng source build ${report.sourceBuild}; dashboard hiện có build ${dashboardBuild}. Hãy nạp lại runtime và tab game để đồng bộ danh sách red-dot.`;
    } else if (report.ageMs >= 15000) {
      empty.textContent = `Báo cáo red-dot đã cũ ${Math.round(report.ageMs / 1000)} giây. Hãy làm mới kết nối tab game rồi thử lại.`;
    } else {
      empty.textContent = 'Runtime game chưa gửi danh sách red-dot. Hãy cập nhật hoặc tải lại tab game rồi thử lại.';
    }
    redDotList.append(empty);
  } else {
    const redDotValues = draftActorRef === report.actorRef && draftRedDots
      ? draftRedDots
      : savedRedDots;
    const groups = new Map();
    for (const action of actions) {
      if (!groups.has(action.group)) groups.set(action.group, []);
      groups.get(action.group).push(action);
    }

    for (const [groupName, groupActions] of [...groups].sort(([left], [right]) => left.localeCompare(right, 'vi'))) {
      const section = document.createElement('section');
      section.className = 'red-dot-group';
      section.dataset.filterGroup = 'red-dot';
      section.dataset.group = groupName;
      const heading = document.createElement('div');
      heading.className = 'red-dot-group-heading';
      const details = document.createElement('details');
      details.className = 'red-dot-group-details';
      details.dataset.redDotGroupDetails = groupName;
      details.open = openRedDotGroups.has(groupName);
      const summary = document.createElement('summary');
      const title = document.createElement('span');
      title.textContent = groupName;
      const count = document.createElement('span');
      count.className = 'group-count';
      count.dataset.groupCount = '';
      summary.append(title, count);
      const groupCheckbox = document.createElement('input');
      groupCheckbox.type = 'checkbox';
      groupCheckbox.dataset.redDotGroupToggle = '';
      groupCheckbox.disabled = !report.online;
      groupCheckbox.setAttribute('aria-label', `Bật toàn bộ red-dot nhóm ${groupName}`);
      const toggleLabel = document.createElement('label');
      toggleLabel.append(document.createTextNode('Toàn nhóm'), groupCheckbox);
      const rows = document.createElement('div');
      rows.className = 'red-dot-group-items';
      details.append(summary, rows);
      heading.append(details, toggleLabel);

      for (const action of groupActions) {
        const id = String(action.id);
        const label = document.createElement('label');
        label.className = 'module-row red-dot-row';
        label.dataset.filterRow = 'red-dot';
        const name = document.createElement('span');
        name.textContent = `${action.name} · ${id}`;
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'module-checkbox';
        checkbox.dataset.redDot = id;
        checkbox.dataset.redDotGroup = groupName;
        checkbox.disabled = !report.online;
        checkbox.checked = Object.hasOwn(redDotValues.ids || {}, id)
          ? redDotValues.ids[id] === true
          : Object.hasOwn(redDotValues.groups || {}, groupName)
            ? redDotValues.groups[groupName] === true
            : false;
        checkbox.setAttribute('aria-label', `Bật ${action.name}`);
        checkbox.addEventListener('change', () => {
          const next = {
            groups: { ...(draftRedDots?.groups || savedRedDots.groups || {}) },
            ids: { ...(draftRedDots?.ids || savedRedDots.ids || {}) }
          };
          const defaultValue = Object.hasOwn(next.groups, groupName) ? next.groups[groupName] : false;
          if (checkbox.checked === defaultValue) delete next.ids[id];
          else next.ids[id] = checkbox.checked;
          draftActorRef = report.actorRef;
          draftRedDots = next;
          draftModules = collectModules();
          updateRedDotGroupCheckbox(groupName);
          updateApplyButton();
          applyFilters();
          scheduleApplyModules();
        });
        label.append(name, checkbox);
        rows.append(label);
      }

      groupCheckbox.addEventListener('change', () => {
        const next = {
          groups: { ...(draftRedDots?.groups || savedRedDots.groups || {}) },
          ids: { ...(draftRedDots?.ids || savedRedDots.ids || {}) }
        };
        next.groups[groupName] = groupCheckbox.checked;
        for (const action of groupActions) {
          delete next.ids[String(action.id)];
          const checkbox = rows.querySelector(`[data-red-dot="${action.id}"]`);
          if (checkbox) checkbox.checked = groupCheckbox.checked;
        }
        groupCheckbox.indeterminate = false;
        draftActorRef = report.actorRef;
        draftRedDots = next;
        draftModules = collectModules();
        updateApplyButton();
        applyFilters();
        scheduleApplyModules();
      });

      section.append(heading);
      redDotList.append(section);
    }
    for (const groupName of groups.keys()) updateRedDotGroupCheckbox(groupName);
  }

  const status = moduleApplyStatus(report);
  $('character-status').classList.toggle('is-error', status.isError === true);
  $('character-status').textContent = status.text;
  $('character-status').title = status.detail;
  applyFilters();
  updateApplyButton();
}

function updateRedDotGroupCheckbox(groupName) {
  const section = [...$('red-dot-list').querySelectorAll('.red-dot-group')]
    .find(group => group.dataset.group === groupName);
  if (!section) return;
  const groupCheckbox = section.querySelector('[data-red-dot-group-toggle]');
  const inputs = [...section.querySelectorAll('[data-red-dot]')];
  const checked = inputs.filter(input => input.checked).length;
  groupCheckbox.checked = checked === inputs.length;
  groupCheckbox.indeterminate = checked > 0 && checked < inputs.length;
  section.querySelector('[data-group-count]').textContent = `${checked}/${inputs.length} bật`;
}

function enableAllModules() {
  const report = selectedReport();
  if (!report?.online) return;
  const inputs = [...$('module-list').querySelectorAll('[data-module]')];
  if (inputs.length === 0) return;
  for (const input of inputs) input.checked = true;
  draftActorRef = report.actorRef;
  draftModules = collectModules();
  for (const section of document.querySelectorAll('[data-module-group-details]')) {
    updateModuleGroupCheckbox(section.closest('.module-group'));
  }
  updateApplyButton();
  applyFilters();
  scheduleApplyModules();
}

function enableDailyModules() {
  const report = selectedReport();
  if (!report?.online) return;
  const dailyFiles = new Set((currentData?.moduleCatalog || [])
    .filter(module => module.group === 'Hằng ngày' && module.file !== redDotDispatcherFile)
    .map(module => module.file));
  if (dailyFiles.size === 0) {
    setStatus('Danh mục không có module thuộc nhóm Hằng ngày.', true);
    return;
  }
  const inputs = [...$('module-list').querySelectorAll('[data-module]')];
  if (inputs.length === 0) {
    setStatus('Danh sách module chưa sẵn sàng.', true);
    return;
  }
  for (const input of inputs) input.checked = dailyFiles.has(input.dataset.module);
  draftActorRef = report.actorRef;
  draftModules = collectModules();
  for (const section of document.querySelectorAll('[data-module-group-details]')) {
    updateModuleGroupCheckbox(section.closest('.module-group'));
  }
  updateApplyButton();
  applyFilters();
  scheduleApplyModules();
}

function enableAllRedDots() {
  const report = selectedReport();
  if (!report?.online) return;
  const actions = (report.redDotCatalog || []).filter(item =>
    Number.isSafeInteger(item.id) && typeof item.name === 'string' && typeof item.group === 'string');
  if (actions.length === 0) return;
  const groups = Object.fromEntries([...new Set(actions.map(action => action.group))].map(group => [group, true]));
  draftActorRef = report.actorRef;
  draftRedDots = { groups, ids: {} };
  draftModules = collectModules();
  for (const input of $('red-dot-list').querySelectorAll('[data-red-dot]')) input.checked = true;
  for (const group of Object.keys(groups)) updateRedDotGroupCheckbox(group);
  updateApplyButton();
  applyFilters();
  scheduleApplyModules();
}

function render(data) {
  currentData = data;
  const reports = Array.isArray(data.reports) ? data.reports : [];
  const onlineReports = reports.filter(report => report.online);
  const select = $('character-select');
  const previous = selectedActorRef;
  select.replaceChildren();

  for (const report of reports) {
    const option = document.createElement('option');
    option.value = report.actorRef;
    option.textContent = `Nhân vật ${report.actor}${report.online
      ? (report.ageMs > 30000 ? ' · đang kết nối, dữ liệu cũ' : '')
      : ' · ngoại tuyến (dữ liệu cũ)'}`;
    select.append(option);
  }

  if (!reports.some(report => report.actorRef === selectedActorRef)) {
    selectedActorRef = onlineReports[0]?.actorRef || reports[0]?.actorRef || '';
    if (draftActorRef !== selectedActorRef) {
      draftActorRef = '';
      draftModules = null;
      draftRedDots = null;
    }
  }
  select.disabled = reports.length === 0;
  select.value = selectedActorRef;

  const date = new Date(data.at);
  $('last-updated').textContent = Number.isNaN(date.getTime())
    ? 'Chưa cập nhật'
    : `Cập nhật ${new Intl.DateTimeFormat('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(date)}`;
  const offlineCount = reports.length - onlineReports.length;
  const staleOnlineCount = onlineReports.filter(report => report.ageMs > 30000).length;
  const connectionSummary = `${onlineReports.length}:${offlineCount}:${staleOnlineCount}`;
  if (previous !== selectedActorRef || reports.length === 0 || lastConnectionSummary !== connectionSummary) {
    setStatus(`${onlineReports.length} nhân vật đang kết nối${staleOnlineCount ? ` · ${staleOnlineCount} chờ dữ liệu mới` : ''}${offlineCount ? ` · ${offlineCount} ngoại tuyến, giữ dữ liệu cuối` : ''}`);
  }
  lastConnectionSummary = connectionSummary;
  renderModules();
}

async function refresh() {
  if (refreshing) return;
  refreshing = true;
  let healthResponded = false;
  $('refresh').disabled = true;
  try {
    const [healthResponse, statusResponse] = await Promise.all([
      fetch('/api/health', { cache: 'no-store' }),
      fetch('/api/status', { cache: 'no-store' })
    ]);
    const health = await healthResponse.json();
    if (!healthResponse.ok || health.ok !== true) throw new Error(health.error || `HTTP ${healthResponse.status}`);
    healthResponded = true;
    setAppHealth('online', 'App đang chạy');
    const data = await statusResponse.json();
    if (!statusResponse.ok || data.ok !== true) throw new Error(data.error || `HTTP ${statusResponse.status}`);
    render(data);
    const reports = Array.isArray(data.reports) ? data.reports : [];
    const connected = reports.filter(report => report.online);
    const stale = connected.filter(report => report.ageMs > 30000).length;
    const offline = reports.length - connected.length;
    setStatus(`${health.project} · ${connected.length} kết nối${stale ? `, ${stale} dữ liệu cũ` : ''}${offline ? `, ${offline} ngoại tuyến` : ''}`);
  } catch (error) {
    setAppHealth(healthResponded ? 'online' : 'offline', healthResponded ? 'App hoạt động · lỗi dữ liệu' : 'App không phản hồi');
    setStatus(error.message || error, true);
    $('character-status').textContent = 'Không kết nối được dashboard.';
    $('character-status').classList.add('is-error');
  } finally {
    refreshing = false;
    $('refresh').disabled = false;
  }
}

async function applyModules() {
  if (applyingModules) {
    applyAgain = true;
    return;
  }
  clearTimeout(applyTimer);
  applyTimer = null;
  const report = selectedReport();
  if (!report || !report.online) {
    setStatus('Nhân vật đã ngắt kết nối; danh sách chỉ đọc, chưa thể áp dụng.', true);
    return;
  }
  const currentModules = collectModules();
  const savedProfile = report.controlProfile || {};
  const savedModules = savedProfile.modules || {};
  const changes = Object.fromEntries(Object.entries(currentModules)
    .filter(([file, enabled]) => enabled !== (savedModules[file] === true)));
  const redDotsChanged = draftActorRef === report.actorRef && draftRedDots &&
    !sameRedDots(draftRedDots, savedProfile.redDots || {});
  if (Object.keys(changes).length === 0 && !redDotsChanged) {
    setStatus('Không có thay đổi cần áp dụng.');
    return;
  }
  const submittedVersion = changeVersion;
  const submittedActorRef = report.actorRef;
  const submittedRedDots = redDotsChanged ? draftRedDots : savedProfile.redDots;
  applyingModules = true;
  updateApplyButton();

  try {
    const response = await fetch('/api/modules', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
      body: JSON.stringify({
        actorRef: report.actorRef,
        modules: changes,
        ...(redDotsChanged ? { redDots: draftRedDots } : {})
      })
    });
    const result = await response.json();
    if (!response.ok || result.ok !== true) throw new Error(result.error || `HTTP ${response.status}`);
    const updatedReport = currentData?.reports?.find(item => item.actorRef === submittedActorRef);
    if (updatedReport) {
      updatedReport.controlProfile = {
        ...savedProfile,
        revision: result.revision,
        modules: result.modules,
        redDots: result.redDots ?? submittedRedDots
      };
    }
    if (submittedVersion === changeVersion) {
      draftActorRef = '';
      draftModules = null;
      draftRedDots = null;
    } else {
      applyAgain = true;
    }
    setStatus('Đã gửi thay đổi tới nhân vật.');
    await refresh();
  } catch (error) {
    $('character-status').textContent = error.message || String(error);
    $('character-status').classList.add('is-error');
    setStatus(error.message || error, true);
  } finally {
    applyingModules = false;
    updateApplyButton();
    if (applyAgain) {
      applyAgain = false;
      void applyModules();
    }
  }
}

$('refresh').addEventListener('click', refresh);
$('enable-daily-modules').addEventListener('click', enableDailyModules);
$('enable-all-modules').addEventListener('click', enableAllModules);
$('enable-all-red-dots').addEventListener('click', enableAllRedDots);
$('module-filter').addEventListener('input', applyFilters);
$('module-enabled-only').addEventListener('change', applyFilters);
$('red-dot-filter').addEventListener('input', applyFilters);
$('red-dot-enabled-only').addEventListener('change', applyFilters);
$('character-select').addEventListener('change', event => {
  const previousReport = selectedReport();
  if (previousReport && draftActorRef === previousReport.actorRef &&
      (!sameModules(draftModules, previousReport.controlProfile?.modules || {}) ||
        draftRedDots && !sameRedDots(draftRedDots, previousReport.controlProfile?.redDots || {})) &&
      !window.confirm('Bỏ thay đổi chưa áp dụng và đổi nhân vật?')) {
    event.target.value = selectedActorRef;
    return;
  }
  selectedActorRef = event.target.value;
  draftActorRef = '';
  draftModules = null;
  draftRedDots = null;
  renderModules();
});
$('save-modules').addEventListener('click', applyModules);
void refresh();
window.setInterval(refresh, 5000);
