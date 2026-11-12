import {getKVPV_CO_BAO_NATIVE as __getKVPV0,getKVPV_DAILY as __getKVPV1,getKVPV_EVENT_PRIORITY as __getKVPV2,getKVPV_UPGRADES as __getKVPV3,getKVPV_V1 as __getKVPV4} from '../api.mjs';
export function call_KVPV_CO_BAO_NATIVE_tick(...args){const target=globalThis["KVPV_CO_BAO_NATIVE"];const fn=globalThis["KVPV_CO_BAO_NATIVE"]?.["tick"];if(typeof fn!=='function')throw Error("KVPV_CO_BAO_NATIVE.tick is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_CO_BAO_NATIVE_status(...args){const target=globalThis["KVPV_CO_BAO_NATIVE"];const fn=globalThis["KVPV_CO_BAO_NATIVE"]?.["status"];if(typeof fn!=='function')throw Error("KVPV_CO_BAO_NATIVE.status is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_CO_BAO_NATIVE_stop(...args){const target=globalThis["KVPV_CO_BAO_NATIVE"];const fn=globalThis["KVPV_CO_BAO_NATIVE"]?.["stop"];if(typeof fn!=='function')throw Error("KVPV_CO_BAO_NATIVE.stop is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_CO_BAO_NATIVE__handoff(...args){const target=globalThis["KVPV_CO_BAO_NATIVE"];const fn=globalThis["KVPV_CO_BAO_NATIVE"]?.["_handoff"];if(typeof fn!=='function')throw Error("KVPV_CO_BAO_NATIVE._handoff is not available");return Reflect.apply(fn,target,args);}
function __captureESMFunction(fn,name){
  if(fn.name!==name)Object.defineProperty(fn,"name",{value:name,configurable:true});
  return fn;
}
let __esmLocal0;
let __esmLocal1;
let __esmLocal2;
let __esmLocal3;
let __esmLocal4;
let __esmLocal5;
let __esmLocal6;
let __esmLocal7;
let __esmLocal8;
let __esmLocal9;
let __esmLocal10;
let __esmLocal11;
let __esmLocal12;
let __esmLocal13;
let __esmLocal14;
let __esmLocal15;
let __esmLocal16;
let __esmLocal17;
export {__esmLocal0 as local_anonymous_2_1_0};
export {__esmLocal1 as local_own_1};
export {__esmLocal2 as local_model_2};
export {__esmLocal3 as local_rpc_3};
export {__esmLocal4 as local_quest_4};
export {__esmLocal5 as local_active_5};
export {__esmLocal6 as local_idle_6};
export {__esmLocal7 as local_manager_7};
export {__esmLocal8 as local_panel_8};
export {__esmLocal9 as local_snapshot_9};
export {__esmLocal10 as local_anonymous_31_123_10};
export {__esmLocal11 as local_anonymous_32_86_11};
export {__esmLocal12 as local_anonymous_33_48_12};
export {__esmLocal13 as local_anonymous_33_107_13};
export {__esmLocal14 as local_stop_14};
export {__esmLocal15 as local_tick_15};
export {__esmLocal16 as local_status_16};
export {__esmLocal17 as local__handoff_17};
export function initialize(){
/* Native Co Bao auto-restoration is intentionally disabled. Reborn/quest executors own the ordered flow. */
(__captureESMFunction((__esmLocal0=(() => {
  'use strict';
  const W = window, old = __getKVPV0(), carry = old?._handoff?.();
  old?.stop?.('reload');
  const actor = String(W.__KVPV_OWN_ACTOR_ID ?? '');
  const S = {
    enabled: true, timer: null, pending: carry?.actor === actor ? carry.pending : null,
    lastOpen: 0, lastError: '', reason: 'armed', steps: carry?.steps ?? 0, ackTimeouts: 0
  };
  const own = __captureESMFunction((__esmLocal1=(() => !!actor && actor === String(W._Ba?._rJ?._O$?.ins?.actorId ?? '') && !W.__KVPV_UNIVERSAL_HALTED)),"own");
  const model = __captureESMFunction((__esmLocal2=(() => W._Ba?._kAt?._LAt?.inst)),"model");
  const rpc = __captureESMFunction((__esmLocal3=(() => W._Ba?._kAt?._IMi?.inst)),"rpc");
  function quest() { const t = W._Ba?._zIt?._FIt?.ins?.taskInfo; return Array.isArray(t) ? { id: String(t[0]), state: Number(t[1]) } : null; }
__esmLocal4=quest;

  function active() { return false; }
__esmLocal5=active;

  function idle() {
    const s = __getKVPV1()?.quickState?.(), j = String(s?.job ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    return own() && active() && (!j || j === 'ranh' || j === 'idle') &&
      !['entering', 'exiting', 'fighting'].includes(String(s.step)) &&
      W._Ba?._$a?.SceneUtil?.isCommonScene === true && !__getKVPV3()?.busy?.() &&
      !__getKVPV2()?.hold?.();
  }
__esmLocal6=idle;

  function manager() { return W._j?.ins ?? W.window_WinMgr ?? null; }
__esmLocal7=manager;

  function panel() {
    const mgr = manager(), id = Number(W._Sa?.getWindowCfgByFcId?.(189)?.[0]);
    const opened = Number.isSafeInteger(id) && id > 0 && mgr?.isOpened?.(id) === true;
    return { opened, ui: opened ? (mgr.getPanelById?.(id) ?? mgr.getDialogById?.(id)) : null };
  }
__esmLocal8=panel;

  function snapshot() {
    const m = model(), count = Array.isArray(m?.shenqi) ? m.shenqi.length : null;
    const cfg = count === null ? null : W._ft?._WNn?.ins?.getCfgById?.(count), rows = Array.isArray(cfg?.[2]) ? cfg[2].map(__captureESMFunction((__esmLocal10=((n, i) => ({ id: Number(n), index: i, owned: !!m?.frgmtsDic?.get?.(n), placed: !!m?.epFrgmtsDic?.get?.(n) }))),"")) : [];
    const ready = m?.__gn === true && count !== null && rows.length > 0 && rows.every(__captureESMFunction((__esmLocal11=(x => Number.isSafeInteger(x.id) && x.id > 0)),""));
    return { count, ready, rows, own: rows.find(__captureESMFunction((__esmLocal12=(x => x.owned && !x.placed)),"")), allPlaced: ready && rows.every(__captureESMFunction((__esmLocal13=(x => x.placed)),"")), uiOpen: panel().opened };
  }
__esmLocal9=snapshot;

  function stop(reason = 'manual') { S.enabled = false; if (S.timer !== null) (__getKVPV4()?.timers?.clearInterval ?? W.clearInterval)?.(S.timer); S.timer = null; S.reason = reason; }
__esmLocal14=stop;

  function tick() {
    if (!S.enabled || !own()) return;
    try {
      if (!active()) { S.reason = 'no_cobao_quest'; return; }
      if (!idle()) { S.reason = 'waiting_idle'; return; }
      const p = snapshot(), now = Date.now(), signature = JSON.stringify([p.count, p.rows]);
      if (S.pending) {
        if (S.pending.signature === signature) {
          S.reason = now - Number(S.pending.at || 0) > 30000 ? 'server_ack_timeout_manual_review' : 'waiting_server_ack';
          if (S.reason === 'server_ack_timeout_manual_review' && !S.pending.timeoutLogged) { S.ackTimeouts++; S.pending.timeoutLogged = true; }
          return;
        } S.pending = null;
      }
      if (!p.ready) { if (now - S.lastOpen > 60000 && typeof manager()?.openByActionId === 'function') { manager().openByActionId(189); S.lastOpen = now; } S.reason = 'waiting_fragment_data'; return; }
      if (p.own && typeof rpc()?.epFragment === 'function') {
        rpc().epFragment([p.own.id]); S.pending = { signature, at: now, action: 'put' }; S.steps++; S.reason = 'placed_wait_ack'; return;
      }
      if (p.allPlaced) {
        const ui = panel().ui, btn = ui?.activateBtn;
        if (ui && Number(ui.idx) === p.count && btn?.visible === true && btn.gray !== true && btn.disabled !== true && typeof btn.event === 'function') {
          btn.event(W.Laya?.Event?.CLICK ?? 'click');
        } else if (!ui && typeof rpc()?.actShenQi === 'function') rpc().actShenQi();
        else { S.reason = 'activation_ui_not_ready'; return; }
        S.pending = { signature, at: now, action: 'activate' }; S.steps++; S.reason = 'activation_wait_ack'; return;
      }
      if (!p.uiOpen && now - S.lastOpen > 60000 && typeof manager()?.openByActionId === 'function') {
        manager().openByActionId(189); S.lastOpen = now; S.reason = 'opening_cobao_ui'; return;
      }
      S.reason = 'missing_fragments_no_purchase';
    } catch (e) { S.lastError = String(e?.message ?? e); S.reason = 'error'; }
  }
__esmLocal15=tick;

  function status() { const q = quest(), d = __getKVPV1()?.quickState?.(), p = own() ? snapshot() : null; return { enabled: S.enabled, actor, actorMatch: !!own(), quest: q, active: active(), idleReady: idle(), dailyRunning: d?.running ?? null, dailyJob: d?.job ?? null, commonScene: W._Ba?._$a?.SceneUtil?.isCommonScene ?? null, reason: S.reason, pending: S.pending, pendingAgeMs: S.pending ? Date.now() - Number(S.pending.at || 0) : null, ackTimeouts: S.ackTimeouts, lastError: S.lastError, steps: S.steps, snapshot: p, rpcAvailable: { place: typeof rpc()?.epFragment === 'function', activate: typeof rpc()?.actShenQi === 'function' }, allowKNB: false }; }
__esmLocal16=status;

  W.KVPV_CO_BAO_NATIVE = Object.freeze({ tick, status, stop, _handoff: __captureESMFunction((__esmLocal17=(() => ({ actor, pending: S.pending, steps: S.steps }))),"_handoff") });
  S.reason = 'disabled_ordered_executor';
})),""))();
}
export {getKVPV_CO_BAO_NATIVE} from '../api.mjs';
export const api=Object.freeze({
  get KVPV_CO_BAO_NATIVE(){return globalThis.KVPV_CO_BAO_NATIVE;},
});