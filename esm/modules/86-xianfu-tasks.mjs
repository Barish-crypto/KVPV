import {getKVPV_ENTRY_POLICY as __getKVPV0,getKVPV_RED_DOT_MODULE as __getKVPV1,getKVPV_V1 as __getKVPV2,getKVPV_XIANFU_TASKS as __getKVPV3} from '../api.mjs';
export function call_KVPV_XIANFU_TASKS_start(...args){const target=globalThis["KVPV_XIANFU_TASKS"];const fn=globalThis["KVPV_XIANFU_TASKS"]?.["start"];if(typeof fn!=='function')throw Error("KVPV_XIANFU_TASKS.start is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_XIANFU_TASKS_stop(...args){const target=globalThis["KVPV_XIANFU_TASKS"];const fn=globalThis["KVPV_XIANFU_TASKS"]?.["stop"];if(typeof fn!=='function')throw Error("KVPV_XIANFU_TASKS.stop is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_XIANFU_TASKS_tick(...args){const target=globalThis["KVPV_XIANFU_TASKS"];const fn=globalThis["KVPV_XIANFU_TASKS"]?.["tick"];if(typeof fn!=='function')throw Error("KVPV_XIANFU_TASKS.tick is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_XIANFU_TASKS_status(...args){const target=globalThis["KVPV_XIANFU_TASKS"];const fn=globalThis["KVPV_XIANFU_TASKS"]?.["status"];if(typeof fn!=='function')throw Error("KVPV_XIANFU_TASKS.status is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_XIANFU_TASKS__handoff(...args){const target=globalThis["KVPV_XIANFU_TASKS"];const fn=globalThis["KVPV_XIANFU_TASKS"]?.["_handoff"];if(typeof fn!=='function')throw Error("KVPV_XIANFU_TASKS._handoff is not available");return Reflect.apply(fn,target,args);}
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
export {__esmLocal0 as local_anonymous_4_1_0};
export {__esmLocal1 as local_dateKey_1};
export {__esmLocal2 as local_model_2};
export {__esmLocal3 as local_api_3};
export {__esmLocal4 as local_cfgApi_4};
export {__esmLocal5 as local_owned_5};
export {__esmLocal6 as local_persist_6};
export {__esmLocal7 as local_restore_7};
export {__esmLocal8 as local_eventIsOpen_8};
export {__esmLocal9 as local_query_9};
export {__esmLocal10 as local_tick_10};
export {__esmLocal11 as local_anonymous_46_33_11};
export {__esmLocal12 as local_start_12};
export {__esmLocal13 as local_stop_13};
export {__esmLocal14 as local_status_14};
export {__esmLocal15 as local_anonymous_93_33_15};
export {__esmLocal16 as local__handoff_16};
export function initialize(){
/* Auto-claim only verified, completed Immortal Home tasks.
 * Read task state from the native model and use the game's reward API.
 * Never start upgrades, purchases, building, or activity entry. */
(__captureESMFunction((__esmLocal0=(() => {
  'use strict';
  const W=window,old=__getKVPV3(),carry=old?._handoff?.();old?.stop?.('reload');
  const actor=String(W.__KVPV_OWN_ACTOR_ID||'');
  const dateKey=__captureESMFunction((__esmLocal1=(()=>new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Ho_Chi_Minh'}).format(new Date()))),"dateKey");
  let day=dateKey();
  const storageKey='KVPV_XIANFU_TASKS_V1_'+actor;
  const S={enabled:true,timer:null,lastQuery:0,lastClaim:0,claims:new Map(),sentAt:[],acked:0,
    reason:'waiting_model',lastError:''};
  const model=__captureESMFunction((__esmLocal2=(()=>W._Ba?._Q9?._ttt?.ins)),"model");
  const api=__captureESMFunction((__esmLocal3=(()=>W._Ba?._Q9?._$dt?.ins)),"api");
  const cfgApi=__captureESMFunction((__esmLocal4=(()=>W._ft?._ubt?.ins)),"cfgApi");
  function owned(){return !!actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&
    !W.__KVPV_UNIVERSAL_HALTED&&__getKVPV0()?.manual!==true;}
__esmLocal5=owned;

  function persist(){try{sessionStorage.setItem(storageKey,JSON.stringify({day,sentAt:S.sentAt,claims:[...S.claims]}));}catch(_){}}
__esmLocal6=persist;

  function restore(){
    if(carry?.actor===actor){S.sentAt=carry.sentAt||[];S.claims=new Map(carry.claims||[]);S.acked=carry.acked||0;return;}
    try{const x=JSON.parse(sessionStorage.getItem(storageKey)||'null');
      if(x?.day===day&&Array.isArray(x.sentAt)&&Array.isArray(x.claims)){S.sentAt=x.sentAt;S.claims=new Map(x.claims);}}
    catch(_){}
  }
__esmLocal7=restore;

  function eventIsOpen(conf){
    const type=Number(conf?.[6]);
    if(type===1)return true;
    if(type===2){const eventId=Number(conf?.[3]?.[0]);
      return Number.isSafeInteger(eventId)&&eventId>0&&model()?.CheckEventIsOpen?.(eventId)===true;}
    return false;
  }
__esmLocal8=eventIsOpen;

  function query(){
    const r=api();if(!r||typeof r.getXianfuTaskList!=='function')return false;
    S.lastQuery=Date.now();r.getXianfuTaskList();return true;
  }
__esmLocal9=query;

  function tick(){
    if(!S.enabled)return;
    if(__getKVPV1()?.ownsProgression?.()){S.reason='delegated_to_red_dot_module';return;}
    if(!owned()){S.reason=actor?'actor_or_manual_guard':'waiting_actor';return;}
    try{
      const today=dateKey();if(today!==day){day=today;S.claims.clear();S.sentAt=[];persist();}
      const now=Date.now(),m=model(),r=api(),rows=m?.taskList;
      if(!m||!r){S.reason='waiting_xianfu_model';return;}
      if(now-S.lastQuery>=10*60*1000&&!query()){S.reason='waiting_task_api';return;}
      if(!Array.isArray(rows)){S.reason='waiting_task_list';return;}
      const sent=S.sentAt.filter(__captureESMFunction((__esmLocal11=(t=>Number.isFinite(t)&&now-t<60*60*1000)),""));S.sentAt=sent;
      if(sent.length>=15){S.reason='hourly_claim_limit';return;}
      if(now-S.lastClaim<4000){S.reason='claim_cooldown';return;}
      const config=cfgApi();if(typeof config?.getCfgById!=='function'){S.reason='waiting_task_config';return;}
      const activeRows=m.taskActivesValue,claimedRows=m.getDcs,activeValue=Number(m.taskValue);
      if(Array.isArray(activeRows)&&Array.isArray(claimedRows)&&Number.isFinite(activeValue)&&
        typeof r.getXianFuActivaAward==='function'){
        for(let index=0;index<activeRows.length;index++){
          const key='activity:'+index,threshold=Number(activeRows[index]);
          if(claimedRows.includes(index)){if(S.claims.has(key)){S.claims.delete(key);S.acked++;persist();}continue;}
          if(Number.isFinite(threshold)&&threshold>0&&activeValue>=threshold&&!S.claims.has(key)){
            const record={status:'waiting_server_ack',at:now};
            S.claims.set(key,record);S.sentAt.push(now);S.lastClaim=now;persist();
            try{const result=r.getXianFuActivaAward([index]);
              if(result===false)throw Error('native_reward_api_returned_false');
              S.reason='activity_reward_requested_waiting_ack';}
            catch(e){record.error=String(e?.message||e);S.reason='activity_reward_uncertain';S.lastError=record.error;persist();}
            return; // One reward RPC at a time; wait for the native claimed-index list.
          }
        }
      }
      for(const row of rows){
        if(!Array.isArray(row)||row.length<3)continue;
        const id=Number(row[0]),state=Number(row[2]);
        if(!Number.isSafeInteger(id)||id<=0)continue;
        const lock=S.claims.get(id);
        if(state===2){if(lock){S.claims.delete(id);S.acked++;persist();}continue;}
        if(state===0)continue;
        if(state!==1||lock)continue;
        const conf=config.getCfgById(id);if(!conf||!eventIsOpen(conf))continue;
        if(typeof r.getXianFuTaskAward!=='function'){S.reason='waiting_reward_api';return;}
        const record={status:'waiting_server_ack',at:now};
        S.claims.set(id,record);S.sentAt.push(now);S.lastClaim=now;persist();
        try{const result=r.getXianFuTaskAward([id]);
          if(result===false)throw Error('native_reward_api_returned_false');
          S.reason='reward_requested_waiting_ack';
        }catch(e){record.error=String(e?.message||e);S.reason='reward_request_uncertain';S.lastError=record.error;persist();}
        return; // One claim at a time; never replay an uncertain request.
      }
      S.reason='no_verified_completed_task';
    }catch(e){S.lastError=String(e?.message||e);S.reason='error';}
  }
__esmLocal10=tick;

  function start(){if(S.timer!==null)return status();S.enabled=true;
    S.timer=(__getKVPV2()?.timers?.setInterval??W.setInterval)(tick,5000);tick();return status();}
__esmLocal12=start;

  function stop(reason='manual'){S.enabled=false;S.reason=reason;
    if(S.timer!==null)(__getKVPV2()?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;}
__esmLocal13=stop;

  function status(){return {enabled:S.enabled,actor,reason:S.reason,trackedClaims:[...S.claims.entries()],
    sentLastHour:S.sentAt.filter(__captureESMFunction((__esmLocal15=(t=>Date.now()-t<60*60*1000)),"")).length,acked:S.acked,lastError:S.lastError};}
__esmLocal14=status;

  restore();
  W.KVPV_XIANFU_TASKS=Object.freeze({start,stop,tick,status,_handoff:__captureESMFunction((__esmLocal16=(()=>({actor,sentAt:S.sentAt,
    claims:[...S.claims.entries()],acked:S.acked}))),"_handoff")});
  start();
})),""))();

}
export {getKVPV_XIANFU_TASKS} from '../api.mjs';
export const api=Object.freeze({
  get KVPV_XIANFU_TASKS(){return globalThis.KVPV_XIANFU_TASKS;},
});