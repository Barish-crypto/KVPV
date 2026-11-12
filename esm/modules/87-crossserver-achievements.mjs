import {getKVPV_CROSSSERVER_ACHIEVEMENTS as __getKVPV0,getKVPV_ENTRY_POLICY as __getKVPV1,getKVPV_V1 as __getKVPV2} from '../api.mjs';
export function call_KVPV_CROSSSERVER_ACHIEVEMENTS_start(...args){const target=globalThis["KVPV_CROSSSERVER_ACHIEVEMENTS"];const fn=globalThis["KVPV_CROSSSERVER_ACHIEVEMENTS"]?.["start"];if(typeof fn!=='function')throw Error("KVPV_CROSSSERVER_ACHIEVEMENTS.start is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_CROSSSERVER_ACHIEVEMENTS_stop(...args){const target=globalThis["KVPV_CROSSSERVER_ACHIEVEMENTS"];const fn=globalThis["KVPV_CROSSSERVER_ACHIEVEMENTS"]?.["stop"];if(typeof fn!=='function')throw Error("KVPV_CROSSSERVER_ACHIEVEMENTS.stop is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_CROSSSERVER_ACHIEVEMENTS_tick(...args){const target=globalThis["KVPV_CROSSSERVER_ACHIEVEMENTS"];const fn=globalThis["KVPV_CROSSSERVER_ACHIEVEMENTS"]?.["tick"];if(typeof fn!=='function')throw Error("KVPV_CROSSSERVER_ACHIEVEMENTS.tick is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_CROSSSERVER_ACHIEVEMENTS_status(...args){const target=globalThis["KVPV_CROSSSERVER_ACHIEVEMENTS"];const fn=globalThis["KVPV_CROSSSERVER_ACHIEVEMENTS"]?.["status"];if(typeof fn!=='function')throw Error("KVPV_CROSSSERVER_ACHIEVEMENTS.status is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_CROSSSERVER_ACHIEVEMENTS__handoff(...args){const target=globalThis["KVPV_CROSSSERVER_ACHIEVEMENTS"];const fn=globalThis["KVPV_CROSSSERVER_ACHIEVEMENTS"]?.["_handoff"];if(typeof fn!=='function')throw Error("KVPV_CROSSSERVER_ACHIEVEMENTS._handoff is not available");return Reflect.apply(fn,target,args);}
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
export {__esmLocal0 as local_anonymous_4_1_0};
export {__esmLocal1 as local_model_1};
export {__esmLocal2 as local_api_2};
export {__esmLocal3 as local_now_3};
export {__esmLocal4 as local_owned_4};
export {__esmLocal5 as local_readyGate_5};
export {__esmLocal6 as local_persist_6};
export {__esmLocal7 as local_restore_7};
export {__esmLocal8 as local_tick_8};
export {__esmLocal9 as local_anonymous_33_33_9};
export {__esmLocal10 as local_start_10};
export {__esmLocal11 as local_stop_11};
export {__esmLocal12 as local_status_12};
export {__esmLocal13 as local_anonymous_62_33_13};
export {__esmLocal14 as local__handoff_14};
export function initialize(){
/* Auto-claim only Cross Server Copy achievements whose native row is ready.
 * The game UI exposes its claim button only for state 1 and sends that row's ID.
 * This module never enters PvP, occupies a stronghold, or builds a tower. */
(__captureESMFunction((__esmLocal0=(() => {
  'use strict';
  const W=window,old=__getKVPV0(),carry=old?._handoff?.();old?.stop?.('reload');
  const actor=String(W.__KVPV_OWN_ACTOR_ID||''),storageKey='KVPV_CROSSSERVER_ACHIEVEMENTS_V1_'+actor;
  const S={enabled:true,timer:null,lastQuery:0,lastClaim:0,claims:new Map(),sentAt:[],acked:0,
    reason:'waiting_model',lastError:''};
  const model=__captureESMFunction((__esmLocal1=(()=>W._Ba?._gg?._Z5t?.inst)),"model");
  const api=__captureESMFunction((__esmLocal2=(()=>W._Ba?._gg?._Rhn?.ins)),"api");
  const now=__captureESMFunction((__esmLocal3=(()=>Date.now())),"now");
  function owned(){return !!actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&
    !W.__KVPV_UNIVERSAL_HALTED&&__getKVPV1()?.manual!==true;}
__esmLocal4=owned;

  function readyGate(){return W._Ba?._Xo?._Ko?.instance?.getRpKeyState?.(471)===true;}
__esmLocal5=readyGate;

  function persist(){try{sessionStorage.setItem(storageKey,JSON.stringify({sentAt:S.sentAt,claims:[...S.claims]}));}catch(_){}}
__esmLocal6=persist;

  function restore(){
    if(carry?.actor===actor){S.sentAt=carry.sentAt||[];S.claims=new Map(carry.claims||[]);S.acked=carry.acked||0;return;}
    try{const x=JSON.parse(sessionStorage.getItem(storageKey)||'null');
      if(x&&Array.isArray(x.sentAt)&&Array.isArray(x.claims)){S.sentAt=x.sentAt;S.claims=new Map(x.claims);}}
    catch(_){}
  }
__esmLocal7=restore;

  function tick(){
    if(!S.enabled)return;
    if(!owned()){S.reason=actor?'actor_or_manual_guard':'waiting_actor';return;}
    try{
      const t=now(),m=model(),r=api(),rows=m?.crossServerCopyAchievement;
      if(!m||!r){S.reason='waiting_crossserver_model';return;}
      if(t-S.lastQuery>=10*60*1000&&typeof r.GetCrossServerCopyAchievementInfo==='function'){
        S.lastQuery=t;r.GetCrossServerCopyAchievementInfo();
      }
      if(!Array.isArray(rows)){S.reason='waiting_achievement_data';return;}
      const sent=S.sentAt.filter(__captureESMFunction((__esmLocal9=(x=>Number.isFinite(x)&&t-x<60*60*1000)),""));S.sentAt=sent;
      if(sent.length>=12){S.reason='hourly_claim_limit';return;}
      if(t-S.lastClaim<5000){S.reason='claim_cooldown';return;}
      for(const row of rows){
        if(!Array.isArray(row)||row.length<3)continue;
        const id=Number(row[0]),state=Number(row[2]);
        if(!Number.isSafeInteger(id)||id<=0)continue;
        const lock=S.claims.get(id);
        if(state===2&&lock){S.claims.delete(id);S.acked++;persist();continue;}
        if(state!==1)continue;
        if(lock||!readyGate())continue;
        if(typeof r.GetCrossServerCopyAchievementReward!=='function'){S.reason='waiting_native_reward_api';return;}
        const record={status:'waiting_server_ack',at:t};
        S.claims.set(id,record);S.sentAt.push(t);S.lastClaim=t;persist();
        try{const result=r.GetCrossServerCopyAchievementReward(id);
          if(result===false)throw Error('native_reward_api_returned_false');
          S.reason='reward_requested_waiting_ack';
        }catch(e){record.error=String(e?.message||e);S.reason='reward_request_uncertain';
          S.lastError=record.error;persist();}
        return;
      }
      S.reason=readyGate()?'no_ready_achievement':'feature_or_reward_not_open';
    }catch(e){S.lastError=String(e?.message||e);S.reason='error';}
  }
__esmLocal8=tick;

  function start(){if(S.timer!==null)return status();S.enabled=true;
    S.timer=(__getKVPV2()?.timers?.setInterval??W.setInterval)(tick,5000);tick();return status();}
__esmLocal10=start;

  function stop(reason='manual'){S.enabled=false;S.reason=reason;
    if(S.timer!==null)(__getKVPV2()?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;}
__esmLocal11=stop;

  function status(){return {enabled:S.enabled,actor,reason:S.reason,trackedClaims:[...S.claims.entries()],
    sentLastHour:S.sentAt.filter(__captureESMFunction((__esmLocal13=(x=>now()-x<60*60*1000)),"")).length,acked:S.acked,lastError:S.lastError};}
__esmLocal12=status;

  restore();
  W.KVPV_CROSSSERVER_ACHIEVEMENTS=Object.freeze({start,stop,tick,status,
    _handoff:__captureESMFunction((__esmLocal14=(()=>({actor,sentAt:S.sentAt,claims:[...S.claims.entries()],acked:S.acked}))),"_handoff")});
  start();
})),""))();

}
export {getKVPV_CROSSSERVER_ACHIEVEMENTS} from '../api.mjs';
export const api=Object.freeze({
  get KVPV_CROSSSERVER_ACHIEVEMENTS(){return globalThis.KVPV_CROSSSERVER_ACHIEVEMENTS;},
});