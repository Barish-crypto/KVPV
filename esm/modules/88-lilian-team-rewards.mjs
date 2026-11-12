import {getKVPV_ENTRY_POLICY as __getKVPV0,getKVPV_LILIAN_TEAM_REWARDS as __getKVPV1,getKVPV_V1 as __getKVPV2} from '../api.mjs';
export function call_KVPV_LILIAN_TEAM_REWARDS_start(...args){const target=globalThis["KVPV_LILIAN_TEAM_REWARDS"];const fn=globalThis["KVPV_LILIAN_TEAM_REWARDS"]?.["start"];if(typeof fn!=='function')throw Error("KVPV_LILIAN_TEAM_REWARDS.start is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_LILIAN_TEAM_REWARDS_stop(...args){const target=globalThis["KVPV_LILIAN_TEAM_REWARDS"];const fn=globalThis["KVPV_LILIAN_TEAM_REWARDS"]?.["stop"];if(typeof fn!=='function')throw Error("KVPV_LILIAN_TEAM_REWARDS.stop is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_LILIAN_TEAM_REWARDS_tick(...args){const target=globalThis["KVPV_LILIAN_TEAM_REWARDS"];const fn=globalThis["KVPV_LILIAN_TEAM_REWARDS"]?.["tick"];if(typeof fn!=='function')throw Error("KVPV_LILIAN_TEAM_REWARDS.tick is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_LILIAN_TEAM_REWARDS_status(...args){const target=globalThis["KVPV_LILIAN_TEAM_REWARDS"];const fn=globalThis["KVPV_LILIAN_TEAM_REWARDS"]?.["status"];if(typeof fn!=='function')throw Error("KVPV_LILIAN_TEAM_REWARDS.status is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_LILIAN_TEAM_REWARDS__handoff(...args){const target=globalThis["KVPV_LILIAN_TEAM_REWARDS"];const fn=globalThis["KVPV_LILIAN_TEAM_REWARDS"]?.["_handoff"];if(typeof fn!=='function')throw Error("KVPV_LILIAN_TEAM_REWARDS._handoff is not available");return Reflect.apply(fn,target,args);}
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
let __esmLocal18;
let __esmLocal19;
let __esmLocal20;
let __esmLocal21;
let __esmLocal22;
let __esmLocal23;
export {__esmLocal0 as local_anonymous_4_1_0};
export {__esmLocal1 as local_red_1};
export {__esmLocal2 as local_lian_2};
export {__esmLocal3 as local_lianRpc_3};
export {__esmLocal4 as local_team_4};
export {__esmLocal5 as local_teamRpc_5};
export {__esmLocal6 as local_t_6};
export {__esmLocal7 as local_owned_7};
export {__esmLocal8 as local_persist_8};
export {__esmLocal9 as local_restore_9};
export {__esmLocal10 as local_ack_10};
export {__esmLocal11 as local_candidates_11};
export {__esmLocal12 as local_run_12};
export {__esmLocal13 as local_run_13};
export {__esmLocal14 as local_run_14};
export {__esmLocal15 as local_run_15};
export {__esmLocal16 as local_tick_16};
export {__esmLocal17 as local_anonymous_54_45_17};
export {__esmLocal18 as local_anonymous_55_36_18};
export {__esmLocal19 as local_start_19};
export {__esmLocal20 as local_stop_20};
export {__esmLocal21 as local_status_21};
export {__esmLocal22 as local_anonymous_71_33_22};
export {__esmLocal23 as local__handoff_23};
export function initialize(){
/* Claim only completed Lian Lian and Fight Team rewards.
 * Reuses the game's claim RPCs and red-point/state gates from its own UI.
 * Does not enter activities, create/join teams, or spend currency. */
(__captureESMFunction((__esmLocal0=(() => {
  'use strict';
  const W=window,old=__getKVPV1(),carry=old?._handoff?.();old?.stop?.('reload');
  const actor=String(W.__KVPV_OWN_ACTOR_ID||''),storageKey='KVPV_LILIAN_TEAM_REWARDS_V1_'+actor;
  const S={enabled:true,timer:null,lastClaim:0,sentAt:[],locks:new Map(),acked:0,reason:'waiting_models',lastError:''};
  const red=__captureESMFunction((__esmLocal1=(id=>W._Ba?._Xo?._Ko?.instance?.getRpKeyState?.(id)===true)),"red");
  const lian=__captureESMFunction((__esmLocal2=(()=>W._Ba?._$qt?._tKt?.ins)),"lian");
  const lianRpc=__captureESMFunction((__esmLocal3=(()=>W._Ba?._$qt?.TemperCrtl?.ins)),"lianRpc");
  const team=__captureESMFunction((__esmLocal4=(()=>W._Ba?._Zpt?._Jpt?.inst)),"team");
  const teamRpc=__captureESMFunction((__esmLocal5=(()=>W._Ba?._Zpt?._nZt?.ins)),"teamRpc");
  const t=__captureESMFunction((__esmLocal6=(()=>Date.now())),"t");
  function owned(){return !!actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&
    !W.__KVPV_UNIVERSAL_HALTED&&__getKVPV0()?.manual!==true;}
__esmLocal7=owned;

  function persist(){try{sessionStorage.setItem(storageKey,JSON.stringify({sentAt:S.sentAt,locks:[...S.locks]}));}catch(_){}}
__esmLocal8=persist;

  function restore(){
    if(carry?.actor===actor){S.sentAt=carry.sentAt||[];S.locks=new Map(carry.locks||[]);S.acked=carry.acked||0;return;}
    try{const x=JSON.parse(sessionStorage.getItem(storageKey)||'null');
      if(x&&Array.isArray(x.sentAt)&&Array.isArray(x.locks)){S.sentAt=x.sentAt;S.locks=new Map(x.locks);}}
    catch(_){}
  }
__esmLocal9=restore;

  function ack(key){if(S.locks.delete(key)){S.acked++;persist();}}
__esmLocal10=ack;

  function candidates(){
    const out=[],l=lian(),lr=lianRpc(),tm=team(),tr=teamRpc();
    if(l&&lr&&red(17)){
      if(Array.isArray(l.tasks))for(const row of l.tasks){
        const id=Number(row?.[0]);if(Array.isArray(row)&&Number.isSafeInteger(id)&&id>0&&Number(row[1])===2)ack('lian-task:'+id);
        if(typeof lr.getLiLianTaskAward==='function'&&Array.isArray(row)&&Number.isSafeInteger(id)&&id>0&&Number(row[1])===1)
          out.push({key:'lian-task:'+id,kind:'lian_task',id,ready:true,run:__captureESMFunction((__esmLocal12=(()=>lr.getLiLianTaskAward(id))),"run")});
      }
      const daily=Number(l.getOtherValue?.(3))===1;
      if(S.locks.has('lian-daily')&&!daily)ack('lian-daily');
      if(daily&&typeof lr.getLiLianDayAward==='function')out.push({key:'lian-daily',kind:'lian_daily',ready:true,run:__captureESMFunction((__esmLocal13=(()=>lr.getLiLianDayAward())),"run")});
    }
    if(tm&&tr&&red(408)&&Array.isArray(tm.fightTeamCopyAchievement))for(const row of tm.fightTeamCopyAchievement){
      const id=Number(row?.[0]);if(Array.isArray(row)&&Number.isSafeInteger(id)&&id>0&&Number(row[2])===2)ack('team-achievement:'+id);
      if(typeof tr.GetFightTeamCopyAchievementReward==='function'&&Array.isArray(row)&&Number.isSafeInteger(id)&&id>0&&Number(row[2])===1)
        out.push({key:'team-achievement:'+id,kind:'team_achievement',id,ready:true,run:__captureESMFunction((__esmLocal14=(()=>tr.GetFightTeamCopyAchievementReward(id))),"run")});
    }
    const taskRows=tm?._wzn&&typeof tm._wzn==='object'?Object.values(tm._wzn):[];
    if(tm&&tr&&red(407))for(const row of taskRows){
      const id=Number(row?.[0]);if(Array.isArray(row)&&Number.isSafeInteger(id)&&id>0&&Number(row[2])===2)ack('team-task:'+id);
      if(typeof tr.GetFightTeamCopyTaskReward==='function'&&Array.isArray(row)&&Number.isSafeInteger(id)&&id>0&&Number(row[2])===1)
        out.push({key:'team-task:'+id,kind:'team_task',id,ready:true,run:__captureESMFunction((__esmLocal15=(()=>tr.GetFightTeamCopyTaskReward(id))),"run")});
    }
    return out;
  }
__esmLocal11=candidates;

  function tick(){
    if(!S.enabled)return;
    if(!owned()){S.reason=actor?'actor_or_manual_guard':'waiting_actor';return;}
    try{
      const now=t();S.sentAt=S.sentAt.filter(__captureESMFunction((__esmLocal17=(x=>Number.isFinite(x)&&now-x<60*60*1000)),""));
      const ready=candidates().find(__captureESMFunction((__esmLocal18=(x=>x.ready&&!S.locks.has(x.key))),""));
      if(!ready){S.reason='no_verified_ready_reward';return;}
      if(S.sentAt.length>=12){S.reason='hourly_claim_limit';return;}
      if(now-S.lastClaim<9000){S.reason='claim_cooldown';return;}
      const lock={kind:ready.kind,id:ready.id??null,at:now,status:'waiting_server_ack'};
      S.locks.set(ready.key,lock);S.sentAt.push(now);S.lastClaim=now;persist();
      try{const result=ready.run();if(result===false)throw Error('native_reward_api_returned_false');
        S.reason='reward_requested_waiting_ack';}
      catch(e){lock.error=String(e?.message||e);S.lastError=lock.error;S.reason='reward_request_uncertain';persist();}
    }catch(e){S.lastError=String(e?.message||e);S.reason='error';}
  }
__esmLocal16=tick;

  function start(){if(S.timer!==null)return status();S.enabled=true;
    S.timer=(__getKVPV2()?.timers?.setInterval??W.setInterval)(tick,5000);tick();return status();}
__esmLocal19=start;

  function stop(reason='manual'){S.enabled=false;S.reason=reason;
    if(S.timer!==null)(__getKVPV2()?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;}
__esmLocal20=stop;

  function status(){return {enabled:S.enabled,actor,reason:S.reason,locks:[...S.locks.entries()],
    sentLastHour:S.sentAt.filter(__captureESMFunction((__esmLocal22=(x=>t()-x<60*60*1000)),"")).length,acked:S.acked,lastError:S.lastError};}
__esmLocal21=status;

  restore();
  W.KVPV_LILIAN_TEAM_REWARDS=Object.freeze({start,stop,tick,status,
    _handoff:__captureESMFunction((__esmLocal23=(()=>({actor,sentAt:S.sentAt,locks:[...S.locks.entries()],acked:S.acked}))),"_handoff")});
  start();
})),""))();

}
export {getKVPV_LILIAN_TEAM_REWARDS} from '../api.mjs';
export const api=Object.freeze({
  get KVPV_LILIAN_TEAM_REWARDS(){return globalThis.KVPV_LILIAN_TEAM_REWARDS;},
});