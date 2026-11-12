
/* Independent verified actions. Red-dot catalog and handlers: src/01-red-dot-module.js. Capture native plugin callbacks at registration;
 * one pending per function, no shared ACK queue. Existing resources keep their
 * own batch ACK/UID protections. No premium/unverified plugin is executed here. */

(() => {
  
  'use strict';
  
  const W = window, old = W.KVPV_PARALLEL_ACTIONS, carry = old?._handoff?.(); old?.stop?.('reload');
  
  const actor = String(W.__KVPV_OWN_ACTOR_ID || ''), same = carry?.actor === actor;
  
  const S = {
    enabled: false, timer: null, taken: same ? carry.taken : false, busy: false,
    
    definitions: new Map(same ? carry.definitions : []), pending: new Map(same ? carry.pending : []),
    
    hooks: [], v8: null, upgrades: null, legacyBlocked: false, reason: 'waiting_core', sent: same ? carry.sent : 0, confirmed: same ? carry.confirmed : 0, lastError: ''
  };
  
  const owned = () => actor && actor === String(W._Ba?._rJ?._O$?.ins?.actorId ?? '') && !W.__KVPV_UNIVERSAL_HALTED;
  
  const rewardSources = new Set(['dailyExpedition', 'limitedExpedition', 'expeditionMilestone']);
  const reserve = () => W.KVPV_MATERIAL_RESERVE?.active === true;
  
  function rewardPolicy(d) {
    if (rewardSources.has(d.id) && d.kind === 'claim' && d.spend === 'none' && d.verified === true) {
      
      d.background = true; d.directDuringPve = true; if (d.id !== 'expeditionMilestone') d.claimGroup = 'expedition_task';
      
    } return d;
  }
  
  for (const d of S.definitions.values()) rewardPolicy(d);
  
  // Trusted user input temporarily owns UI; pending ACK observation continues.
  
  const userInput = e => { if (e?.isTrusted) W.__KVPV_USER_UI_UNTIL = Date.now() + 5000; };
  
  for (const type of ['pointerdown', 'keydown']) {
    
    W.document?.addEventListener?.(type, userInput, true);
    
    S.hooks.push(() => W.document?.removeEventListener?.(type, userInput, true));
    
  }
  
  function hook(object, key, fn) { const original = object[key]; object[key] = fn; S.hooks.push(() => { if (object[key] === fn) object[key] = original; }); return original; }
  
  function canCapture(d) {
    return d && d.verified === true && ['none', 'materials', undefined].includes(d.spend) &&
      
      ['claim', 'work'].includes(d.kind) && !(d.kind === 'claim' && d.spend === 'materials') && typeof d.probe === 'function' && typeof d.run === 'function';
  }
  
  function wrapV8(v) {
    if (!v?.register || S.v8?.object === v) return; S.v8 = { object: v, provide: v.provide, toggle: v.toggle, report: v.report };
    
    const register = v.register, toggle = v.toggle, provide = v.provide, report = v.report;
    
    hook(v, 'register', function (d) {
      let result, error; try { result = register.call(v, d); } catch (e) { error = e; }
      
      if ((!error || /Trung module ID|already exists/i.test(String(error))) && canCapture(d)) {
        
        S.definitions.set(d.id, rewardPolicy({ ...d, enabled: d.enabled === true })); toggle.call(v, d.id, false);
        
      } if (error) throw error; return result;
      
    });
    
    hook(v, 'toggle', function (id, on) {
      const d = S.definitions.get(id);
      
      if (d) { toggle.call(v, id, false); d.enabled = !!on; return d.enabled; } return toggle.call(v, id, on);
      
    });
    
    hook(v, 'provide', function (mode) { return S.enabled && S.taken ? null : provide.call(v, mode); });
    
    if (typeof report === 'function') hook(v, 'report', function () { const r = report.call(v); return { ...r, plugins: r.plugins?.map(p => S.definitions.has(p.id) ? { ...p, enabled: S.definitions.get(p.id).enabled, redIds: S.definitions.get(p.id).redIds ?? [] } : p) }; });
    
    // Definitions carried across reload remain disabled in the original queue.
    
    for (const d of S.definitions.values()) try { toggle.call(v, d.id, false); } catch (_) { }
    
  }
  
  function wrapUpgrades(u) {
    if (!u?.busy || S.upgrades?.object === u) return;
    
    const busy = u.busy; S.upgrades = { object: u, busy };
    
    hook(u, 'busy', () => S.enabled && S.taken ? false : busy.call(u));
    
  }
  
  function watchGlobal(key, wrap) {
    const descriptor = Object.getOwnPropertyDescriptor(W, key);
    
    if (descriptor && !descriptor.configurable) { wrap(W[key]); return; }
    
    let value = W[key]; wrap(value);
    
    const get = () => value, set = next => { value = next; wrap(next); };
    
    Object.defineProperty(W, key, { configurable: true, enumerable: descriptor?.enumerable ?? true, get, set });
    
    S.hooks.push(() => { if (Object.getOwnPropertyDescriptor(W, key)?.get === get) Object.defineProperty(W, key, { configurable: true, enumerable: true, writable: true, value }); });
    
  }
  
  let directFrame;
  
  function canDirectDuringPve(q = W.KVPV_DAILY?.quickState?.()) {
    
    if (q?.running !== true || ['entering', 'exiting', 'matching', 'result'].includes(q.step)) return false;
    
    if (W._Ba?._rJ?._O$?.ins?.isDead === true) return false;
    
    if (W.KVPV_CONTEXT_BRAIN?.activity?.().direct === true) return true;
    
    if (q.step === 'fighting') return true;
    
    if (!['rảnh', 'ranh'].includes(q.job) || W._Ba?._$a?._yo?.ins?.isInMission !== true) return false;
    
    const lease = W.KVPV?.core?.scene?.status?.();
    
    if (lease?.owner !== 'combat' || lease.tag !== 'hitrun') return false;
    
    if (S.busy && directFrame !== undefined) return directFrame;
    
    const hr = W.KVPV_HITRUN1?.status?.(false), ready = hr?.running === true && hr.phase === 'FIGHT'; if (S.busy) directFrame = ready; return ready;
    
  }
  
  function context(d) {
    const q = W.KVPV_DAILY?.quickState?.(); if (q?.running !== true) return false;
    
    if (['entering', 'exiting', 'matching', 'result'].includes(q.step)) return false;
    
    if (d.background === true && d.directDuringPve === true && canDirectDuringPve(q)) return true;
    
    if (['rảnh', 'ranh'].includes(q.job)) return W._Ba?._$a?.SceneUtil?.isCommonScene === true && W._Ba?._$a?._yo?.ins?.isInMission !== true;
    
    return d.background === true && q.step === 'fighting' && W.KVPV_UPGRADES?.config?.backgroundJobs?.includes(q.job) === true;
    
  }
  
  function evidence(id) {
    
    if (id === 'reborn_cobao_step') return W.KVPV_REBORN_EXECUTORS?.status?.()?.cobao?.confirmed;
    
    if (id === 'reborn_arena_fight') return W.KVPV_REBORN_EXECUTORS?.status?.()?.arena?.confirmed;
    
    if (id === 'season_completed_tasks') return W.KVPV_SEASON_REWARDS?.status?.()?.confirmed;
    
    if (id === 'skill_handbook_rewards') return W.KVPV_SKILL_REWARDS?.status?.()?.confirmed;
    
    if (id === 'fabao_treasure_keys') return W.KVPV_FABAO_TREASURE?.status?.()?.confirmed;
    
    if (String(id).startsWith('appearance_auto_')) return W.KVPV_APPEARANCE_AUTO?.status?.()?.confirmed;
    
    return undefined;
    
  }
  
  function observe() {
    for (const [id, p] of S.pending) {
      try {
        
        const after = p.probe(), confirmed = evidence(id), nativeAck = Number.isFinite(p.evidence) && Number.isFinite(confirmed) && confirmed > p.evidence;
        
        if (nativeAck || after !== null && after !== undefined && String(after) !== p.before) {
          
          S.pending.delete(id); S.confirmed++; p.done?.();
          
          if (p.legacy && p.restoreEnabled && !S.definitions.has(id)) S.v8?.toggle.call(S.v8.object, id, true);
          
        } else if (Date.now() - p.at > 30000) p.reason = 'waiting_ack_no_retry';
        
      } catch (e) { p.reason = 'probe_error_no_retry'; p.error = String(e); }
    }
  }
  
  function dispatch(d) {
    if (reserve() && d.spend === 'materials') return;
    if (!d.enabled || S.pending.has(d.id) || !context(d)) return;
    
    if (d.claimGroup && [...S.pending].some(([id, p]) => (p.claimGroup ?? S.definitions.get(id)?.claimGroup) === d.claimGroup)) return;
    
    const state = d.probe(); if (state?.ready !== true || state.signature == null) return;
    
    const p = {
      claimGroup: d.claimGroup, before: String(state.signature), evidence: evidence(d.id), at: Date.now(), reason: 'waiting_server',
      
      probe: () => d.probe()?.signature
    }; S.pending.set(d.id, p); S.sent++;
    
    try { const result = d.run(state); if (result && typeof result.catch === 'function') result.catch(e => { p.reason = 'send_error_no_retry'; p.error = String(e); }); }
    
    catch (e) { p.reason = 'send_error_no_retry'; p.error = String(e); S.lastError = String(e); }
    
  }
  
  function legacy() {
    const v = S.v8; if (S.legacyBlocked || !v?.provide || !v.report) return;
    
    for (const mode of (reserve() ? ['claim'] : ['claim', 'work'])) for (let i = 0; i < 64; i++) {
      
      const action = v.provide.call(v.object, mode); if (!action) break;
      
      const matches = (v.report.call(v.object).plugins ?? []).filter(p => 'V8 ' + p.name === action.what);
      
      if (matches.length !== 1) break; const d = matches[0]; if (d.verified !== true || d.spend === 'premium' || reserve() && d.spend === 'materials') break; if (S.definitions.has(d.id) || S.pending.has(d.id)) break;
      
      const p = { legacy: true, restoreEnabled: d.enabled, before: String(action.before), at: Date.now(), reason: 'waiting_server', probe: action.probe, done: action.done };
      
      S.pending.set(d.id, p); v.toggle.call(v.object, d.id, false); S.sent++;
      
      try { action.run(); } catch (e) { p.reason = 'send_error_no_retry'; p.error = String(e); }
      
    }
    
  }
  
  function tick() {
    if (!S.enabled || S.busy) return; S.busy = true; directFrame = undefined; try {
      
      if (!owned()) { stop(); return; }
      const activeRedIds = new Set(W.KVPV_RED_DOT?.activeIds?.() ?? []);
      wrapV8(W.KVPV_V8); wrapUpgrades(W.KVPV_UPGRADES);
      
      if (!S.v8 || !S.upgrades) { S.reason = 'waiting_core'; return; }
      
      if (!S.taken) { if (S.upgrades.busy.call(S.upgrades.object)) { S.reason = 'finishing_previous_shared_request'; return; } S.taken = true; }
      
      const u = W.KVPV_UPGRADES?.config;
      
      if (u && !reserve()) {
        u.checkMs = 50; u.backgroundGapMs = 50; u.noActivityNearEvents = false;
        
        if (u.maxRequestsPerHour) for (const k of Object.keys(u.maxRequestsPerHour)) u.maxRequestsPerHour[k] = 3600;
      }
      
      const resources = W.KVPV_BG_RESOURCES?.config; if (resources && !reserve()) resources.minBetweenMs = 0;
      
      observe();
      

      
      if (Date.now() < Number(W.__KVPV_USER_UI_UNTIL || 0)) { S.reason = 'user_using_ui'; return; }
      
      if (W.KVPV_CONFIRM_POPUPS?.beforeTask?.() === true) { S.reason = 'priority_popup'; return; }
      
      if (S.v8.object.config?.enabled !== false && S.v8.object.config?.autoExecuteVerified !== false) {
        
        const priority = d => (d.redIds?.some(id => activeRedIds.has(id)) ? 2 : 0) + (d.kind === 'claim' ? 1 : 0);
        
        for (const d of [...S.definitions.values()].sort((a, b) => priority(b) - priority(a))) try { dispatch(d); } catch (e) { S.lastError = String(e); }
        
        try { legacy(); } catch (e) { if (e instanceof RangeError || /Maximum call stack/.test(String(e))) { S.legacyBlocked = true; S.lastError = 'Legacy provider recursion isolated'; } else throw e; }
        
      }
      
      // The legacy core retains native providers and per-request ACK. Poll promptly
      
      // instead of its old 2s/4s timers. Per-function busy flags still prevent spam.
      
      if (S.legacyBlocked && S.v8.object.provide !== S.v8.isolatedProvide) { S.v8.isolatedProvide ??= () => null; S.v8.object.provide = S.v8.isolatedProvide; }
      
      if (!reserve()) { W.KVPV_UPGRADES?.run?.(); W.KVPV_BG_RESOURCES?.tick?.(); }
      S.reason = reserve() ? 'materials_reserved_for_so_tai' : 'independent_functions';
      
    } catch (e) { S.lastError = String(e?.stack ?? e); S.reason = 'error'; } finally { S.busy = false; }
  }
  
  function stop() {
    S.enabled = false; if (S.timer !== null) (W.KVPV_V1?.timers?.clearInterval ?? W.clearInterval)(S.timer); S.timer = null;
    
    for (const undo of S.hooks.reverse()) undo(); S.hooks = [];
    
  }
  
  function start() { S.enabled = false; S.reason = 'red_dot_only'; return false; }
  
  watchGlobal('KVPV_V8', wrapV8); watchGlobal('KVPV_UPGRADES', wrapUpgrades);
  
  W.KVPV_PARALLEL_ACTIONS = Object.freeze({
    start, stop, sync: tick, canDirectDuringPve, legacyBusy: () => S.upgrades?.busy.call(S.upgrades.object) ?? true, get independent() { return S.enabled && S.taken; },
    
    status: () => ({
      enabled: S.enabled, actor, sharedQueue: false, pollMs: 50, reason: S.reason, sent: S.sent, confirmed: S.confirmed,
      
      redDots: W.KVPV_RED_DOT_MODULE?.status?.().redDots ?? [],
      
      pending: [...S.pending].map(([id, p]) => ({ id, at: p.at, reason: p.reason, error: p.error ?? '' })), lastError: S.lastError, allowKNB: false
    }),
    
    _handoff: () => ({ actor, taken: S.taken, definitions: [...S.definitions], pending: [...S.pending], sent: S.sent, confirmed: S.confirmed })
  });
  
})();

