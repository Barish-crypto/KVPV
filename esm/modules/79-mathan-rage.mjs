import {getKVPV_ENTRY_POLICY as __getKVPV0,getKVPV_MATHAN_RAGE as __getKVPV1,getKVPV_V1 as __getKVPV2} from '../api.mjs';
export function call_KVPV_MATHAN_RAGE_start(...args){const target=globalThis["KVPV_MATHAN_RAGE"];const fn=globalThis["KVPV_MATHAN_RAGE"]?.["start"];if(typeof fn!=='function')throw Error("KVPV_MATHAN_RAGE.start is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_MATHAN_RAGE_stop(...args){const target=globalThis["KVPV_MATHAN_RAGE"];const fn=globalThis["KVPV_MATHAN_RAGE"]?.["stop"];if(typeof fn!=='function')throw Error("KVPV_MATHAN_RAGE.stop is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_MATHAN_RAGE_sync(...args){const target=globalThis["KVPV_MATHAN_RAGE"];const fn=globalThis["KVPV_MATHAN_RAGE"]?.["sync"];if(typeof fn!=='function')throw Error("KVPV_MATHAN_RAGE.sync is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_MATHAN_RAGE_status(...args){const target=globalThis["KVPV_MATHAN_RAGE"];const fn=globalThis["KVPV_MATHAN_RAGE"]?.["status"];if(typeof fn!=='function')throw Error("KVPV_MATHAN_RAGE.status is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_MATHAN_RAGE__handoff(...args){const target=globalThis["KVPV_MATHAN_RAGE"];const fn=globalThis["KVPV_MATHAN_RAGE"]?.["_handoff"];if(typeof fn!=='function')throw Error("KVPV_MATHAN_RAGE._handoff is not available");return Reflect.apply(fn,target,args);}
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
export {__esmLocal0 as local_anonymous_2_1_0};
export {__esmLocal1 as local_ok_1};
export {__esmLocal2 as local_snapshot_2};
export {__esmLocal3 as local_tick_3};
export {__esmLocal4 as local_status_4};
export {__esmLocal5 as local_stop_5};
export {__esmLocal6 as local_start_6};
export {__esmLocal7 as local__handoff_7};
export function initialize(){
/* Ma Than: summon once per verified native readiness cycle; no purchases. */
(__captureESMFunction((__esmLocal0=(()=>{'use strict';
const W=window,actor=String(W.__KVPV_OWN_ACTOR_ID||''),old=__getKVPV1(),carry=old?._handoff?.();old?.stop?.();
const ok=__captureESMFunction((__esmLocal1=(()=>!!actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED)),"ok");
const S={timer:null,pending:carry?.actor===actor?carry.pending:null,lastKey:carry?.actor===actor?carry.lastKey:'',sent:carry?.actor===actor?carry.sent:0,confirmed:carry?.actor===actor?carry.confirmed:0,enabled:carry?.actor===actor?carry.enabled!==false:true,reason:'waiting'};
function snapshot(){const m=W._Ba?._u3?._YQ?.ins,n=Number(W._Sa?.svrTime),end=Number(m?.endTimer),call=Number(m?.callEndTimer),id=Number(m?.msShowid),summoned=Number(W._C?._Ba?.instance?.getRole?.(Number(actor))?.property?.get?.('warcraft')?.[0])>0;return {id,call,end,summoned,active:Number.isFinite(n)&&end>n,ready:Number.isFinite(n)&&n>0&&Number.isFinite(end)&&Number.isFinite(call)&&id>0&&!summoned&&end<=n&&call<=n};}
__esmLocal2=snapshot;

function tick(){if(!S.enabled||!ok())return;const v=snapshot();
 if(S.pending){if(v.summoned||v.active||v.call!==S.pending.call){S.confirmed++;S.pending=null;S.reason='confirmed';}else{S.reason='awaiting_server';return;}}
 if(!v.ready||W._Ba?._rJ?._O$?.ins?.isDead===true||__getKVPV0()?.manual===true||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0))return;
 const key=v.id+'/'+v.call;if(key===S.lastKey)return;
 const native=W._Ba?._u3?._ern?.ins;if(typeof native?.CallBackSpiritEquipShow!=='function'){S.reason='missing_native';return;}
 S.lastKey=key;S.pending={call:v.call};S.sent++;
 try{native.CallBackSpiritEquipShow();S.reason='requested';}catch(e){S.reason='uncertain_no_retry';}
}
__esmLocal3=tick;

function status(){return {...snapshot(),enabled:S.enabled,sent:S.sent,confirmed:S.confirmed,pending:!!S.pending,reason:S.reason,allowKNB:false};}
__esmLocal4=status;

function stop(){S.enabled=false;if(S.timer!==null)(__getKVPV2()?.timers?.clearInterval??W.clearInterval)?.(S.timer);S.timer=null;}
__esmLocal5=stop;

function start(){S.enabled=true;if(S.timer===null)S.timer=(__getKVPV2()?.timers?.setInterval??W.setInterval)?.(tick,150);tick();return status();}
__esmLocal6=start;

W.KVPV_MATHAN_RAGE=Object.freeze({start,stop,sync:tick,status,_handoff:__captureESMFunction((__esmLocal7=(()=>({actor,enabled:S.enabled,pending:S.pending,lastKey:S.lastKey,sent:S.sent,confirmed:S.confirmed}))),"_handoff")});if(ok()&&S.enabled)start();
})),""))();
}
export {getKVPV_MATHAN_RAGE} from '../api.mjs';
export const api=Object.freeze({
  get KVPV_MATHAN_RAGE(){return globalThis.KVPV_MATHAN_RAGE;},
});