import {getKVPV_EVENT_PRIORITY as __getKVPV0,getKVPV_FAR_SCOPE as __getKVPV1,getKVPV_TH300 as __getKVPV2,getKVPV_TQ_MA_THAN as __getKVPV3,getKVPV_V1 as __getKVPV4} from '../api.mjs';
export function call_KVPV_TQ_MA_THAN_status(...args){const target=globalThis["KVPV_TQ_MA_THAN"];const fn=globalThis["KVPV_TQ_MA_THAN"]?.["status"];if(typeof fn!=='function')throw Error("KVPV_TQ_MA_THAN.status is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_TQ_MA_THAN_tick(...args){const target=globalThis["KVPV_TQ_MA_THAN"];const fn=globalThis["KVPV_TQ_MA_THAN"]?.["tick"];if(typeof fn!=='function')throw Error("KVPV_TQ_MA_THAN.tick is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_TQ_MA_THAN_stop(...args){const target=globalThis["KVPV_TQ_MA_THAN"];const fn=globalThis["KVPV_TQ_MA_THAN"]?.["stop"];if(typeof fn!=='function')throw Error("KVPV_TQ_MA_THAN.stop is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_TQ_MA_THAN__handoff(...args){const target=globalThis["KVPV_TQ_MA_THAN"];const fn=globalThis["KVPV_TQ_MA_THAN"]?.["_handoff"];if(typeof fn!=='function')throw Error("KVPV_TQ_MA_THAN._handoff is not available");return Reflect.apply(fn,target,args);}
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
export {__esmLocal0 as local_anonymous_2_1_0};
export {__esmLocal1 as local_scope_1};
export {__esmLocal2 as local_tick_2};
export {__esmLocal3 as local_stop_3};
export {__esmLocal4 as local_status_4};
export {__esmLocal5 as local__handoff_5};
export function initialize(){
/* Tian Quan: trigger owned Ma Than transformation once per free full-rage charge. No skill acceleration or purchase. */
(__captureESMFunction((__esmLocal0=(() => {
    'use strict';
    const W = window, old = __getKVPV3(), carry = old?._handoff?.(); old?.stop?.('reload');
    const actor = String(W.__KVPV_OWN_ACTOR_ID ?? '');
    const S = { enabled: true, timer: null, lastAt: carry?.actor === actor ? carry.lastAt : 0, pending: carry?.actor === actor ? carry.pending : null, spent: carry?.actor === actor ? carry.spent : false, lastStrength: carry?.actor === actor ? carry.lastStrength : null, requests: carry?.actor === actor ? carry.requests : 0, reason: 'armed', lastError: '' };
    function scope() { const s = __getKVPV1()?.status?.(); return s?.inside === true && s.kind === 'THIEN_QUAN' && __getKVPV2()?.status?.(false)?.running === true; }
__esmLocal1=scope;

    function tick() {
        if (!S.enabled) return;
        try {
            if (actor !== String(W._Ba?._rJ?._O$?.ins?.actorId ?? '') || W.__KVPV_UNIVERSAL_HALTED) { S.reason = 'actor_mismatch'; return; }
            if (!scope()) { S.reason = 'outside_tianquan'; return; }
            const m = W._Ba?._s3?._ZJ?.ins, need = Number(W._ft?._gY?.ins?.getCfgById?.(92001)?.[2]?.[0]), energy = Number(m?.curStrength), form = Number(m?.curFightShowId);
            if (m?.isTransforming?.() === true || Number(m?.curShowId) > 0) { S.spent = true; S.pending = null; S.reason = 'native_form_active'; return; }
            if (!Number.isFinite(need) || need <= 0 || !Number.isFinite(energy)) { S.reason = 'native_strength_unavailable'; return; }
            if (energy < need) { S.spent = false; S.pending = null; S.reason = 'charging_rage'; S.lastStrength = energy; return; }
            if (S.spent) { S.reason = 'already_requested_this_charge'; return; }
            if (S.pending) { S.reason = 'awaiting_native_ack_no_retry'; return; }
            const role = W._C?._Ba?.instance?.getRole?.(Number(actor)), combat = role?.getComponent?.(W._d?._Yct?._Het), target = combat?.target;
            if (W._Ba?._rJ?._O$?.ins?.isDead !== false || Number(target?.property?.get?.('type')) !== 1 || combat?.isValidTarget?.() !== true || Date.now() < Number(W.__KVPV_USER_UI_UNTIL || 0) || __getKVPV0()?.hold?.()) { S.reason = 'waiting_boss_ready'; return; }
            if (!Number.isSafeInteger(form) || form <= 0 || !m?.huanhuaList?.()?.[form] || m?.sendTrans || W._Ba?._Do?._Ho?.inst?.getFcIsOpen?.(327) !== true) { S.reason = 'native_form_unavailable'; return; }
            const rpc = W._Ba?._s3?._Kyt?.ins; if (typeof rpc?.Transforming !== 'function') { S.reason = 'native_rpc_unavailable'; return; }
            if (Date.now() - S.lastAt < 3000) return;
            S.lastAt = Date.now(); S.requests++; S.spent = true; S.pending = { at: S.lastAt, form, strength: energy };
            rpc.Transforming(); S.reason = 'native_transform_requested';
        } catch (e) { S.lastError = String(e?.message ?? e); S.reason = 'native_error_no_retry'; }
    }
__esmLocal2=tick;

    function stop(reason = 'manual') { S.enabled = false; if (S.timer != null) (__getKVPV4()?.timers?.clearInterval ?? W.clearInterval)?.(S.timer); S.timer = null; S.reason = reason; }
__esmLocal3=stop;

    function status() { return { enabled: S.enabled, scope: scope(), reason: S.reason, requests: S.requests, pending: S.pending, lastError: S.lastError, allowKNB: false }; }
__esmLocal4=status;

    W.KVPV_TQ_MA_THAN = Object.freeze({ status, tick, stop, _handoff: __captureESMFunction((__esmLocal5=(() => ({ actor, lastAt: S.lastAt, pending: S.pending, spent: S.spent, lastStrength: S.lastStrength, requests: S.requests }))),"_handoff") });
    const schedule = __getKVPV4()?.timers?.setInterval ?? W.setInterval;
    if (typeof W.setInterval === 'function' && typeof schedule === 'function') S.timer = schedule(tick, 250);
    tick();
})),""))();
}
export {getKVPV_TQ_MA_THAN} from '../api.mjs';
export const api=Object.freeze({
  get KVPV_TQ_MA_THAN(){return globalThis.KVPV_TQ_MA_THAN;},
});