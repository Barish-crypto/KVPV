import {getKVPV_ENTRY_POLICY as __getKVPV0,getKVPV_FREE_DAILY_SIGN as __getKVPV1,getKVPV_V1 as __getKVPV2} from '../api.mjs';
export function call_KVPV_FREE_DAILY_SIGN_start(...args){const target=globalThis["KVPV_FREE_DAILY_SIGN"];const fn=globalThis["KVPV_FREE_DAILY_SIGN"]?.["start"];if(typeof fn!=='function')throw Error("KVPV_FREE_DAILY_SIGN.start is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_FREE_DAILY_SIGN_stop(...args){const target=globalThis["KVPV_FREE_DAILY_SIGN"];const fn=globalThis["KVPV_FREE_DAILY_SIGN"]?.["stop"];if(typeof fn!=='function')throw Error("KVPV_FREE_DAILY_SIGN.stop is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_FREE_DAILY_SIGN_tick(...args){const target=globalThis["KVPV_FREE_DAILY_SIGN"];const fn=globalThis["KVPV_FREE_DAILY_SIGN"]?.["tick"];if(typeof fn!=='function')throw Error("KVPV_FREE_DAILY_SIGN.tick is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_FREE_DAILY_SIGN_status(...args){const target=globalThis["KVPV_FREE_DAILY_SIGN"];const fn=globalThis["KVPV_FREE_DAILY_SIGN"]?.["status"];if(typeof fn!=='function')throw Error("KVPV_FREE_DAILY_SIGN.status is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_FREE_DAILY_SIGN__handoff(...args){const target=globalThis["KVPV_FREE_DAILY_SIGN"];const fn=globalThis["KVPV_FREE_DAILY_SIGN"]?.["_handoff"];if(typeof fn!=='function')throw Error("KVPV_FREE_DAILY_SIGN._handoff is not available");return Reflect.apply(fn,target,args);}
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
export {__esmLocal0 as local_anonymous_3_1_0};
export {__esmLocal1 as local_model_1};
export {__esmLocal2 as local_api_2};
export {__esmLocal3 as local_now_3};
export {__esmLocal4 as local_owned_4};
export {__esmLocal5 as local_persist_5};
export {__esmLocal6 as local_restore_6};
export {__esmLocal7 as local_tick_7};
export {__esmLocal8 as local_anonymous_22_31_8};
export {__esmLocal9 as local_start_9};
export {__esmLocal10 as local_stop_10};
export {__esmLocal11 as local_status_11};
export {__esmLocal12 as local_anonymous_34_116_12};
export {__esmLocal13 as local__handoff_13};
export function initialize(){
/* Claim only the current free daily sign-in reward when the native game model
 * says it is available. The paid sign-in API is never called. */
(__captureESMFunction((__esmLocal0=(() => {
  'use strict';
  const W=window,old=__getKVPV1(),carry=old?._handoff?.();old?.stop?.('reload');
  const actor=String(W.__KVPV_OWN_ACTOR_ID||''),key='KVPV_FREE_DAILY_SIGN_V1_'+actor;
  const S={enabled:true,timer:null,lastQuery:0,lastClaim:0,locks:new Map(),sentAt:[],acked:0,reason:'waiting_model',lastError:''};
  const model=__captureESMFunction((__esmLocal1=(()=>W._Ba?._R1a?.ins)),"model"),api=__captureESMFunction((__esmLocal2=(()=>W._Ba?._S5n?.ins)),"api"),now=__captureESMFunction((__esmLocal3=(()=>Date.now())),"now");
  function owned(){return !!actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED&&__getKVPV0()?.manual!==true;}
__esmLocal4=owned;

  function persist(){try{sessionStorage.setItem(key,JSON.stringify({sentAt:S.sentAt,locks:[...S.locks]}));}catch(_){}}
__esmLocal5=persist;

  function restore(){if(carry?.actor===actor){S.sentAt=carry.sentAt||[];S.locks=new Map(carry.locks||[]);S.acked=carry.acked||0;return;}try{const x=JSON.parse(sessionStorage.getItem(key)||'null');if(Array.isArray(x?.sentAt)&&Array.isArray(x?.locks)){S.sentAt=x.sentAt;S.locks=new Map(x.locks);}}catch(_){}}
__esmLocal6=restore;

  function tick(){
    if(!S.enabled)return;if(!owned()){S.reason=actor?'actor_or_manual_guard':'waiting_actor';return;}
    try{
      const t=now(),m=model(),r=api();if(!m||!r){S.reason='waiting_sign_model';return;}
      if(t-S.lastQuery>=10*60*1000&&typeof r.reqWelfareInfo==='function'){S.lastQuery=t;r.reqWelfareInfo();}
      const day=Number(m.curSignDay),info=Number.isSafeInteger(day)&&day>0?m.getSignInfo?.(day):null;
      if(!info||!Array.isArray(info)){S.reason='waiting_sign_info';return;}
      const free=typeof m.checkSignFreeAwdRp==='function'&&m.checkSignFreeAwdRp(day)===true;
      if(Number(info[1])===1){if(S.locks.delete(day)){S.acked++;persist();}S.reason='free_reward_already_claimed';return;}
      if(!free){S.reason='no_verified_free_reward';return;}
      S.sentAt=S.sentAt.filter(__captureESMFunction((__esmLocal8=(x=>Number.isFinite(x)&&t-x<3600000)),""));
      if(S.locks.has(day)){S.reason='waiting_server_ack';return;}
      if(S.sentAt.length>=12){S.reason='hourly_claim_limit';return;}
      if(t-S.lastClaim<10000){S.reason='claim_cooldown';return;}
      if(typeof r.reqSignAwd!=='function'){S.reason='waiting_native_claim_api';return;}
      S.locks.set(day,{status:'waiting_server_ack',at:t});S.sentAt.push(t);S.lastClaim=t;persist();
      try{const result=r.reqSignAwd([day]);if(result===false)throw Error('native_reward_api_returned_false');S.reason='claim_requested_waiting_ack';}
      catch(e){S.lastError=String(e?.message||e);S.reason='reward_request_uncertain';persist();}
    }catch(e){S.lastError=String(e?.message||e);S.reason='error';}
  }
__esmLocal7=tick;

  function start(){if(S.timer!==null)return status();S.enabled=true;S.timer=(__getKVPV2()?.timers?.setInterval??W.setInterval)(tick,5000);tick();return status();}
__esmLocal9=start;

  function stop(reason='manual'){S.enabled=false;S.reason=reason;if(S.timer!==null)(__getKVPV2()?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;}
__esmLocal10=stop;

  function status(){return {enabled:S.enabled,actor,reason:S.reason,locks:[...S.locks],sentLastHour:S.sentAt.filter(__captureESMFunction((__esmLocal12=(x=>now()-x<3600000)),"")).length,acked:S.acked,lastError:S.lastError};}
__esmLocal11=status;

  restore();W.KVPV_FREE_DAILY_SIGN=Object.freeze({start,stop,tick,status,_handoff:__captureESMFunction((__esmLocal13=(()=>({actor,sentAt:S.sentAt,locks:[...S.locks],acked:S.acked}))),"_handoff")});start();
})),""))();

}
export {getKVPV_FREE_DAILY_SIGN} from '../api.mjs';
export const api=Object.freeze({
  get KVPV_FREE_DAILY_SIGN(){return globalThis.KVPV_FREE_DAILY_SIGN;},
});