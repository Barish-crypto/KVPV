(() => {
  'use strict';
  const W = window;
  if (W.KVPV_MELEE_TRIAL?.status?.().running) { W.KVPV_MELEE_TRIAL.restore('Thay bản thử áp sát'); if (W.KVPV_MELEE_TRIAL.status().running) { W.console.info('[KVPV] Đang chờ hồi đầy; chưa bắt đầu thử mới.'); return; } }
  const actor = String(W.__KVPV_OWN_ACTOR_ID || ''), user = () => W._Ba?._rJ?._O$?.ins;
  const mode = W.KVPV_MODE, basic = W.KVPV_BASIC10, hitrun = W.KVPV_HITRUN1;
  if (!actor || actor !== String(user()?.actorId || '') || !mode?.stop || !basic?.stop || !hitrun?.start) throw Error('Nạp FULL mới trong đúng game-frame trước.');
  const role = W._C?._Ba?.instance?.getRole?.(Number(actor)), combat = role?.getComponent?.(W._d?._Yct?._Het), mover = role?.getComponent?.(W._d?._Yct?._zet);
  const target = combat?.target, prop = (o, k) => o?.property?.get?.(k), id = o => String(prop(o, 'id') ?? o?.id ?? '');
  if (W.KVPV_TQ_SCOPE?.inside?.() !== true || W.KVPV_FAR_SCOPE?.status?.()?.kind !== 'THIEN_QUAN' || W.KVPV_FAR_SCOPE?.eligible?.(target) !== true) throw Error('Bản áp sát này chỉ dành cho đúng Boss Thiên Quan.');
  const hp = () => { const h = prop(role, 'hp'); return Array.isArray(h) && Number(h[1]) > 0 ? Number(h[0]) / Number(h[1]) * 100 : null; };
  const nativeBoss = W._ft?._tY?.ins?.isBoss?.(Number(prop(target, 'occ')));
  if (!target || Number(prop(target, 'type')) !== 1 || ![true, 1].includes(nativeBoss) || !id(target)) throw Error('Bật auto game và chọn một Boss được native xác nhận trước.');
  if (typeof mover?.moveTo !== 'function' || typeof mover?.running !== 'function' || typeof combat?.isCooldown !== 'function') throw Error('Chưa có đủ bộ điều khiển native để thử áp sát.');
  if (user()?.isDead === true || !Number.isFinite(hp()) || hp() <= 35 || ['RETREAT', 'DODGE', 'KITE_OUT', 'KITE_IN'].includes(hitrun.status(false)?.phase)) throw Error('Chờ kết thúc né/hồi máu rồi thử; không ngắt pha bảo vệ.');
  if (W.KVPV?.core?.scene?.can?.('combat', 'hitrun') === false) throw Error('Tác vụ khác đang giữ cảnh; chờ hoàn tất rồi thử.');



  if (typeof role.on !== 'function' || typeof role.off !== 'function') throw Error('Không theo dõi được lần tung chiêu native; giữ đánh xa.');
  const initialMode = mode.status(false), initialHitrun = hitrun.status(false)?.running === true, basicEnabled = basic.status().enabled === true, autoArm = W.KVPV?.combat?.config?.autoArm;
  if (!initialMode.pendingTianQuanMode) throw Error('Bật lại chế độ đánh xa trước để có thể tự quay về sau phép thử.');
  const dodgeNames = ['KVPV_TQ112', 'KVPV_TQ113', 'KVPV_TQ114', 'KVPV_TQ117'];
  const dodgeState = dodgeNames.map(name => [W[name], W[name]?.config?.enabled]);
  if (dodgeState.some(([api]) => typeof api?.enable !== 'function')) throw Error('Thiếu bộ né Boss; nạp FULL mới trước.');
  const kite = W.KVPV_TQ115, kiteEnabled = kite?.config?.enabled;
  const scene = () => String(W._C?._Mn?._Cn?.currentID ?? W._Ba?._$a?._yo?.ins?.intoSce?.[0] ?? '');
  const initialScene = scene(), bossId = id(target), start = Date.now(), endsAt = start + 5000;
  let running = true, timer = null, lastMove = -Infinity, moves = 0, reason = 'starting', pendingRestore = false, lastError = '', fired = false, tookHit = false, castRequested = false, hook = null;
  const observer = {};
  const selector = role.getComponent?.(W._d?._Yct?._Eet); let selectorHook = null;
  if (typeof selector?._f7t !== 'function') throw Error('Chưa có bộ chọn skill native; chưa thử áp sát.');
  const near = () => { const a = prop(role, 'position'), b = prop(target, 'position'); return !!a && !!b && [a.x, a.y, b.x, b.y].every(Number.isFinite) && Math.hypot(a.x - b.x, a.y - b.y) <= 90; };
  const onCast = (targetId) => { if (String(targetId) === bossId) { fired = true; reason = 'one_cast_return_to_range'; } };
  const onHit = (source, marker, damage) => { if (String(source) === bossId && Number(damage) > 0) { tookHit = true; reason = 'boss_hit_abort'; } };
  const same = () => String(user()?.actorId || '') === actor && W.KVPV_MODE === mode && W.KVPV_HITRUN1 === hitrun;
  function status() { return { version: 3, running, reason, lastError, bossId, scene: initialScene, approachDistance: 80, moveGapMs: 1000, maxCasts: 1, maxExposureMs: 5000, requiresForecast: false, remainingMs: Math.max(0, endsAt - Date.now()), moves, fired, tookHit, pendingRestore, phase: hitrun.status(false)?.phase }; }
  function restore(why = 'manual restore') {
    if (!running) return status();
    if (same() && scene() === initialScene && id(combat.target) === bossId && Number(prop(target, 'hp')?.[0]) > 0 && hitrun.status(false)?.phase === 'RETREAT') {
      pendingRestore = true; reason = 'waiting_full_health_before_restore'; return status();
    }
    running = false; if (timer !== null) W.clearInterval(timer); timer = null; reason = why;
    role.off(1039, observer, onCast); role.off(1012, observer, onHit);
    if (!same()) return status();
    try {
      hitrun.stop('Kết thúc thử áp sát');
      if (selectorHook && selector._f7t === selectorHook.fn) { if (selectorHook.descriptor) Object.defineProperty(selector, '_f7t', selectorHook.descriptor); else delete selector._f7t; }
      if (hook && combat.combat === hook.fn) { if (hook.descriptor) Object.defineProperty(combat, 'combat', hook.descriptor); else delete combat.combat; }
      for (const [api, enabled] of dodgeState) if (typeof enabled === 'boolean') api.enable(enabled);
      if (typeof kiteEnabled === 'boolean') kite?.enable?.(kiteEnabled);
      if (W.KVPV?.combat?.config && autoArm !== undefined) W.KVPV.combat.config.autoArm = autoArm;
      if (basicEnabled) basic.start();
      if (initialMode.pendingTianQuanMode) mode.armTianQuan();
      else if (initialMode.mode && initialMode.mode !== 'OFF' && user()?.isDead !== true) mode.start(initialMode.mode);
      else if (initialHitrun && combat.target === target && Number(prop(target, 'hp')?.[0]) > 0 && user()?.isDead !== true) hitrun.start();
    } catch (e) { lastError = String(e.message || e); W.console.warn('[KVPV áp sát] Khôi phục:', lastError); }
    return status();
  }
  function tick() {
    try {
      if (!running) return;
      if (!same() || W.__KVPV_UNIVERSAL_HALTED) { restore('actor/controllers changed'); return; }
      if (W.KVPV_TQ_SCOPE?.inside?.() !== true) { restore('outside Tian Quan'); return; }
      if (scene() !== initialScene || combat.target !== target || target.isValid === false || Number(prop(target, 'hp')?.[0]) <= 0 || user()?.isDead === true) { restore('Boss/map/life changed'); return; }
      if (pendingRestore || castRequested || fired || tookHit || Date.now() >= endsAt) { restore(tookHit ? 'boss_hit_abort' : castRequested || fired ? 'one_cast_return_to_range' : 'exposure_timeout'); return; }
      const state = hitrun.status(false); if (!state?.running) { restore('HitRun stopped'); return; }
      if (state.phase !== 'FIGHT' || hp() <= 35) { reason = 'yield_' + state.phase; return; }
      if (Date.now() < Number(W.__KVPV_USER_UI_UNTIL || 0) || [3, 4].includes(mover._fut) || combat.isCooldown() !== false || combat._jh?.isPlaying === true || mover.running() === true) { reason = 'yield_native'; return; }
      const a = prop(role, 'position'), b = prop(target, 'position'); if (!a || !b || ![a.x, a.y, b.x, b.y].every(Number.isFinite)) { reason = 'waiting_position'; return; }
      const d = Math.hypot(a.x - b.x, a.y - b.y); if (d <= 90) { reason = 'native_melee_attack'; return; }
      if (Date.now() - lastMove < 1000) { reason = 'approach_throttled'; return; }
      lastMove = Date.now(); mover.moveTo(b.x + (a.x - b.x) / d * 80, b.y + (a.y - b.y) / d * 80); moves++; reason = 'approaching_80';
    } catch (e) { lastError = String(e.message || e); restore('trial error'); }
  }
  const api = Object.freeze({ status, restore }); W.KVPV_MELEE_TRIAL = api;
  try {
    mode.stop('Thử áp sát Boss 3 phút'); basic.stop(); kite?.stop?.();
    for (const [api] of dodgeState) api.enable(true);
    hitrun.start();
    role.on(1039, observer, onCast); role.on(1012, observer, onHit);
    const sd = Object.getOwnPropertyDescriptor(selector, '_f7t'), sn = selector._f7t; if (sd?.configurable === false) throw Error('Không tạm giữ được chọn skill; hủy thử.');
    const sf = function (...args) { if (!near() || castRequested || fired || tookHit || pendingRestore || Date.now() >= endsAt) return -1; return sn.apply(this, args); };
    Object.defineProperty(selector, '_f7t', { value: sf, configurable: true, writable: true }); selectorHook = { fn: sf, descriptor: sd };
    const descriptor = Object.getOwnPropertyDescriptor(combat, 'combat'), native = combat.combat;
    if (typeof native !== 'function' || descriptor?.configurable === false) throw Error('Không thể chặn đòn nối tiếp; hủy thử.');
    const fn = function (...args) { if (castRequested || fired || tookHit || pendingRestore || Date.now() >= endsAt) return undefined; const a = prop(role, 'position'), b = prop(target, 'position'); if (!a || !b || ![a.x, a.y, b.x, b.y].every(Number.isFinite) || Math.hypot(a.x - b.x, a.y - b.y) > 90) return undefined; castRequested = true; return native.apply(this, args); };
    Object.defineProperty(combat, 'combat', { value: fn, configurable: true, writable: true }); hook = { fn, descriptor };
    timer = W.setInterval(tick, 50); tick();
    W.console.info('[KVPV] Thử áp sát 80 đơn vị: tối đa một lần tung chiêu khi vào gần hoặc 5 giây rồi khôi phục đánh xa. Chạy trực tiếp, không yêu cầu dự báo; vẫn có thể trúng đòn Boss. Khôi phục: KVPV_MELEE_TRIAL.restore()');
  } catch (e) { restore('startup failed'); throw e; }
})();
