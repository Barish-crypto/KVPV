import {getKVPV_BOSS_TEAM as __getKVPV0,getKVPV_DAILY as __getKVPV1,getKVPV_ENTRY_POLICY as __getKVPV2,getKVPV_EVENT_PRIORITY as __getKVPV3,getKVPV_FAR_SCOPE as __getKVPV4,getKVPV_HITRUN1 as __getKVPV5,getKVPV_MODE as __getKVPV6,getKVPV_V1 as __getKVPV7} from '../api.mjs';
export function call_KVPV_EVENT_PRIORITY_hold(...args){const target=globalThis["KVPV_EVENT_PRIORITY"];const fn=globalThis["KVPV_EVENT_PRIORITY"]?.["hold"];if(typeof fn!=='function')throw Error("KVPV_EVENT_PRIORITY.hold is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_EVENT_PRIORITY_yieldStage(...args){const target=globalThis["KVPV_EVENT_PRIORITY"];const fn=globalThis["KVPV_EVENT_PRIORITY"]?.["yieldStage"];if(typeof fn!=='function')throw Error("KVPV_EVENT_PRIORITY.yieldStage is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_EVENT_PRIORITY_tick(...args){const target=globalThis["KVPV_EVENT_PRIORITY"];const fn=globalThis["KVPV_EVENT_PRIORITY"]?.["tick"];if(typeof fn!=='function')throw Error("KVPV_EVENT_PRIORITY.tick is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_EVENT_PRIORITY_start(...args){const target=globalThis["KVPV_EVENT_PRIORITY"];const fn=globalThis["KVPV_EVENT_PRIORITY"]?.["start"];if(typeof fn!=='function')throw Error("KVPV_EVENT_PRIORITY.start is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_EVENT_PRIORITY_stop(...args){const target=globalThis["KVPV_EVENT_PRIORITY"];const fn=globalThis["KVPV_EVENT_PRIORITY"]?.["stop"];if(typeof fn!=='function')throw Error("KVPV_EVENT_PRIORITY.stop is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_EVENT_PRIORITY_status(...args){const target=globalThis["KVPV_EVENT_PRIORITY"];const fn=globalThis["KVPV_EVENT_PRIORITY"]?.["status"];if(typeof fn!=='function')throw Error("KVPV_EVENT_PRIORITY.status is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_EVENT_PRIORITY__handoff(...args){const target=globalThis["KVPV_EVENT_PRIORITY"];const fn=globalThis["KVPV_EVENT_PRIORITY"]?.["_handoff"];if(typeof fn!=='function')throw Error("KVPV_EVENT_PRIORITY._handoff is not available");return Reflect.apply(fn,target,args);}
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
let __esmLocal24;
let __esmLocal25;
let __esmLocal26;
let __esmLocal27;
let __esmLocal28;
let __esmLocal29;
let __esmLocal30;
let __esmLocal31;
export {__esmLocal0 as local_anonymous_6_1_0};
export {__esmLocal1 as local_owned_1};
export {__esmLocal2 as local_model_2};
export {__esmLocal3 as local_scene_3};
export {__esmLocal4 as local_currentMap_4};
export {__esmLocal5 as local_stageMap_5};
export {__esmLocal6 as local_note_6};
export {__esmLocal7 as local_input_7};
export {__esmLocal8 as local_unwatch_8};
export {__esmLocal9 as local_watch_9};
export {__esmLocal10 as local_cancel_10};
export {__esmLocal11 as local_sameStage_11};
export {__esmLocal12 as local_guardPending_12};
export {__esmLocal13 as local_manualReservation_13};
export {__esmLocal14 as local_eligible_14};
export {__esmLocal15 as local_anonymous_81_34_15};
export {__esmLocal16 as local_anonymous_82_34_16};
export {__esmLocal17 as local_anonymous_83_13_17};
export {__esmLocal18 as local_anonymous_84_11_18};
export {__esmLocal19 as local_observedActivities_19};
export {__esmLocal20 as local_anonymous_92_35_20};
export {__esmLocal21 as local_anonymous_92_70_21};
export {__esmLocal22 as local_chooseReservation_22};
export {__esmLocal23 as local_hold_23};
export {__esmLocal24 as local_yieldStage_24};
export {__esmLocal25 as local_resumeIfSafe_25};
export {__esmLocal26 as local_tick_26};
export {__esmLocal27 as local_start_27};
export {__esmLocal28 as local_stop_28};
export {__esmLocal29 as local_status_29};
export {__esmLocal30 as local_anonymous_193_65_30};
export {__esmLocal31 as local__handoff_31};
export function initialize(){
/* Timed event owns the stage only while the native event reservation is actionable.
 * If native exit fails, restore the paused stage-auto flag only in the same scene,
 * with the same actor, original Daily preference, and no user input in between.
 * No RPC, dungeon re-entry, quest start, or fabricated completion is used.
 */
(__captureESMFunction((__esmLocal0=(() => {
'use strict';
const W=window,NS=W.KVPV||(W.KVPV={}),old=__getKVPV3(),carry=old?._handoff?.();
old?.stop?.('reload');
const actor=String(W.__KVPV_OWN_ACTOR_ID||''),same=carry?.actor===actor;
// Only manually attended large events verified in the existing Daily schedule.
// This is a scene reservation, NOT an event-entry executor or a reward request.
const C={enabled:true,pollMs:250,cacheMs:100,exitRetryMs:15000,exitStageForEvent:true,
 manualLeadMinutes:same?(carry?.manualLeadMinutes??5):5,
 manualPriorityKeys:{
   tien_ma:true,tien_duyen_tac_chien:true,chien_doi:true,tranh_ba_tu_phuong:true,
   ...(same&&carry?.manualPriorityKeys?carry.manualPriorityKeys:{}),
   diet_tho_hao:true
 }};
const S={timer:null,cachedAt:0,hold:null,lastHoldKey:'',paused:same?(carry.paused||0):0,
  resumed:same?(carry.resumed||0):0,exitRequests:same?(carry.exitRequests||0):0,
  pending:same?(carry.pending||null):null,watching:false,
  lastExitAt:same?(carry.lastExitAt||0):0,lastExitKey:same?(carry.lastExitKey||''):'',
  reason:'waiting',lastError:'',history:same?(carry.history||[]).slice(-60):[]};
const owned=__captureESMFunction((__esmLocal1=(()=>!!actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED)),"owned");
const model=__captureESMFunction((__esmLocal2=(()=>W._Ba?._Co?._Mo?.ins)),"model");
const scene=__captureESMFunction((__esmLocal3=(()=>W._Ba?._$a)),"scene");
const currentMap=__captureESMFunction((__esmLocal4=(()=>Number(scene()?._yo?.ins?.intoSce?.[0]))),"currentMap");
const stageMap=__captureESMFunction((__esmLocal5=(()=>Number(W._ft?._h$?.ins?.getCfgByLv?.(model()?.curLv)?.[0]))),"stageMap");
function note(kind,detail){S.history.push({at:Date.now(),kind,detail:String(detail||'').slice(0,150)});if(S.history.length>60)S.history.shift();}
__esmLocal6=note;

function input(e){if(e?.isTrusted===true&&S.pending)cancel('user_input');}
__esmLocal7=input;

function unwatch(){if(!S.watching)return;for(const type of ['pointerdown','keydown','touchstart','click'])W.removeEventListener(type,input,true);S.watching=false;}
__esmLocal8=unwatch;

function watch(){
 if(S.watching)return true;
 if(typeof W.addEventListener!=='function'||typeof W.removeEventListener!=='function')return false;
 for(const type of ['pointerdown','keydown','touchstart','click'])W.addEventListener(type,input,true);
 S.watching=true;return true;
}
__esmLocal9=watch;

function cancel(reason){
 if(S.pending){S.pending=null;note('stage_resume_cancelled',reason);}
 unwatch();S.reason=reason;
}
__esmLocal10=cancel;

function sameStage(p){
 return scene()?.SceneUtil?.isCommonScene===false&&
 Number.isSafeInteger(p?.map)&&p.map>0&&currentMap()===p.map&&stageMap()===p.map;
}
__esmLocal11=sameStage;

function guardPending(){
 const p=S.pending;if(!p)return false;
 if(!owned()){cancel('actor_changed');return false;}
 if(__getKVPV2()?.manual===true){cancel('manual_entry_policy');return false;}
 if(__getKVPV1()?.config?.enableTuVuot!==true){cancel('stage_preference_disabled');return false;}
 if(W._Ba?._rJ?._O$?.ins?.isDead===true){cancel('actor_dead');return false;}
 if(!sameStage(p)){cancel('stage_changed_or_exited');return false;}
 if(model()?.auto!==false){cancel('stage_auto_changed_elsewhere');return false;}
 if(!S.watching&&!watch()){cancel('cannot_monitor_manual_input');return false;}
 return true;
}
__esmLocal12=guardPending;

// Use Daily's authoritative read-only event calendar. Never fabricate event
// windows or treat schedule-only entries as executable automatic actions.
function manualReservation(daily,now){
 if(daily?.config?.enableEventSchedule===false||typeof daily?.lichData!=='function')return null;
 const calendar=daily.lichData();
 if(!calendar||!Array.isArray(calendar.active)||!Array.isArray(calendar.upcoming))return null;
 const lead=Math.max(0,Math.min(10,Number(C.manualLeadMinutes)||0));
 const wallMinute=now/60000+420; // VN is UTC+7, no DST; Daily uses VN wall-clock minutes.
 const eligible=__captureESMFunction((__esmLocal14=((e,phase)=>{
  if(!e||e.action==='auto'||e.unlock)return null;
  // Only entries from Daily's authoritative calendar can reserve the stage.
  const known=C.manualPriorityKeys?.[e.key]===true;
  const highPriority=phase==='opening'&&Number.isInteger(e.priority)&&e.priority>=1&&e.priority<=3;
  const scheduled=typeof e.time==='string'&&e.time.length>0;
  if(!known&&!highPriority&&!scheduled)return null;
  const start=Number(e.start),end=Number(e.end);
  if(!Number.isFinite(start)||!Number.isFinite(end)||end<=start)return null;
  const until=start-wallMinute;
  if(phase==='opening' ? !(wallMinute>=start&&wallMinute<end) : !(until>0&&until<=lead))return null;
  return {key:e.key,name:e.name||e.key,phase,time:e.time,end,priority:Number.isFinite(e.priority)?Number(e.priority):Number.MAX_SAFE_INTEGER,
   minutesUntil:Math.max(0,until),requiresManualEntry:true,mode:'manual'};
 })),"eligible");
 const active=calendar.active.map(__captureESMFunction((__esmLocal15=(e=>eligible(e,'opening'))),"")).filter(Boolean);
 const next=calendar.upcoming.map(__captureESMFunction((__esmLocal16=(e=>eligible(e,'upcoming'))),"")).filter(Boolean);
 active.sort(__captureESMFunction((__esmLocal17=((a,b)=>a.end-b.end||a.priority-b.priority||a.key.localeCompare(b.key))),""));
 next.sort(__captureESMFunction((__esmLocal18=((a,b)=>a.minutesUntil-b.minutesUntil||a.priority-b.priority||a.key.localeCompare(b.key))),""));
 return active[0]||next[0]||null;
}
__esmLocal13=manualReservation;

function observedActivities(){
 const daily=__getKVPV1();
 if(typeof daily?.lichData!=='function')return [];
 try{
  const c=daily.lichData(),active=Array.isArray(c?.active)?c.active:[];
  return active.slice(0,20).filter(__captureESMFunction((__esmLocal20=(e=>e&&typeof e.key==='string')),"")).map(__captureESMFunction((__esmLocal21=(e=>({
   key:e.key,name:String(e.name||e.key),action:e.action||'notice',
   priority:Number.isFinite(e.priority)?Number(e.priority):null,
   state:'calendar_active',autoEntryConfirmed:e.action==='auto'
  }))),""));
 }catch(_){return [];}
}
__esmLocal19=observedActivities;

function chooseReservation(auto,manual){
 if(!manual)return auto;
 if(!auto)return manual;
 if(manual.phase==='opening'&&auto.phase!=='opening')return manual;
 if(auto.phase==='opening'&&manual.phase!=='opening')return auto;
 return manual.minutesUntil<auto.minutesUntil?manual:auto;
}
__esmLocal22=chooseReservation;

function hold(){
 if(!C.enabled||!owned()||__getKVPV2()?.manual===true)return null;
 const now=Date.now();if(now-S.cachedAt<C.cacheMs)return S.hold;
 S.cachedAt=now;
 try{
  const planner=NS.timeline,daily=__getKVPV1();
  if(!planner?.config?.enabled){S.hold=null;return null;}
  const auto=planner.reservation?.({atMs:now,flags:daily.config,forTask:'stage'});
  const manual=manualReservation(daily,now);
  const reservation=chooseReservation(auto,manual);
  S.hold=reservation&&reservation.key?{key:reservation.key,name:reservation.name,
    phase:reservation.phase,time:reservation.time,minutesUntil:reservation.minutesUntil??null,
    mode:reservation.requiresManualEntry===true?'manual':'auto',
    requiresManualEntry:reservation.requiresManualEntry===true}:null;
  const key=S.hold?.key+'/'+S.hold?.phase+'/'+S.hold?.mode;
  if(key!==S.lastHoldKey){S.lastHoldKey=key;
   note(S.hold?.requiresManualEntry?'manual_event_hold':S.hold?'event_hold':'event_released',
    S.hold?.name||'');}
  return S.hold;
 }catch(e){S.lastError=String(e);S.hold=null;return null;}
}
__esmLocal23=hold;

function yieldStage(event=hold()){
 if(!event||!owned())return false;
 const m=model(),sc=scene();
 if(!m)return false;
 const map=stageMap(),inside=sc?.SceneUtil?.isCommonScene===false&&
   Number.isSafeInteger(map)&&map>0&&currentMap()===map;
 // Tian Quan may be running with native stage-auto disabled. It must still
 // relinquish combat ownership and leave on a verified timed reservation.
 const tqInside=__getKVPV4()?.status?.()?.kind==='THIEN_QUAN'&&
   __getKVPV4()?.status?.()?.inside===true;
 if(tqInside){
   try{__getKVPV6()?.stop?.('yield_to_scheduled_event_'+event.key);}
   catch(e){S.lastError=String(e);note('tq_combat_stop_error',event.key);}
 }
 const wasAuto=m.auto===true;
 if(wasAuto){
  // No cross-scene restoration: only a native stage-auto that we actually paused.
  if(inside){S.pending={actor,map,eventKey:event.key,at:Date.now()};if(!watch())cancel('cannot_monitor_manual_input');}
  m.auto=false;NS.core?.scene?.release?.('stage');S.paused++;note('stage_auto_paused',event.key);
 }
 if((inside||tqInside)&&C.exitStageForEvent){
  const now=Date.now(),tag=event.key+'/'+map;
  if(now-S.lastExitAt>=Math.max(5000,C.exitRetryMs)||S.lastExitKey!==tag){
   const exit=sc?._Gr?.ins?.exitDungeon;
   if(typeof exit==='function'){
    S.lastExitAt=now;S.lastExitKey=tag;
    try{exit.call(sc._Gr.ins);S.exitRequests++;note('native_stage_exit_requested',event.key);}
    catch(e){S.lastError=String(e);note('native_exit_error',event.key);}
   }else{S.reason='no_verified_native_exit';}
  }
 }
 S.reason='yield_to_'+event.key;
 return wasAuto||inside||tqInside;
}
__esmLocal24=yieldStage;

function resumeIfSafe(){
 if(!guardPending()){if(!S.pending&&S.reason==='waiting')S.reason='stage_can_resume_when_idle';return false;}
 const owner=NS.core?.scene?.status?.()?.owner;
 if(owner){cancel('another_scene_owner');return false;}
 if(__getKVPV0()?.priority?.()===true){cancel('boss_priority');return false;}
 if(__getKVPV5()?.status?.(false)?.running===true){cancel('other_combat_controller');return false;}
 const m=model();if(!m||m.auto!==false)return false;
 // Native state flag only; never invoke stage entry or emit game-network requests.
 m.auto=true;S.pending=null;unwatch();S.resumed++;
 S.reason='stage_auto_restored_in_same_scene';note('stage_auto_restored','same_stage_no_event');
 return true;
}
__esmLocal25=resumeIfSafe;

function tick(){
 if(!C.enabled||!owned()){cancel('disabled_or_actor_changed');return;}
 const event=hold();
 if(S.pending)guardPending();
 if(event)yieldStage(event);
 else if(S.pending)resumeIfSafe();
 else S.reason='stage_can_resume_when_idle';
}
__esmLocal26=tick;

function start(){C.enabled=true;if(S.timer==null)S.timer=(__getKVPV7()?.timers?.setInterval??W.setInterval)(tick,C.pollMs);tick();return status();}
__esmLocal27=start;

function stop(reason='manual'){
 C.enabled=false;if(S.timer!=null)(__getKVPV7()?.timers?.clearInterval??W.clearInterval)(S.timer);
 S.timer=null;unwatch();if(reason!=='reload')cancel('manual_stop');
 return status();
}
__esmLocal28=stop;

function status(){return {enabled:C.enabled,actor,hold:hold(),observedActivities:observedActivities(),reason:S.reason,paused:S.paused,
 resumed:S.resumed,pendingResume:S.pending?{map:S.pending.map,eventKey:S.pending.eventKey,at:S.pending.at}:null,
 exitRequests:S.exitRequests,stageEnabled:__getKVPV1()?.config?.enableTuVuot??null,
 nativeStageAuto:model()?.auto===true,timerActive:S.timer!=null,lastError:S.lastError,history:S.history.slice(-20),
 manualPriorityKeys:Object.keys(C.manualPriorityKeys||{}).filter(__captureESMFunction((__esmLocal30=(k=>C.manualPriorityKeys[k]===true)),"")),
 note:'Automatic events keep native Daily entry; manual-only events reserve time but require user entry. Restore only in the same stage without manual input. No invented RPC or KNB.'};}
__esmLocal29=status;

W.KVPV_EVENT_PRIORITY=Object.freeze({config:C,hold,yieldStage,tick,start,stop,status,
 _handoff:__captureESMFunction((__esmLocal31=(()=>({actor,paused:S.paused,resumed:S.resumed,exitRequests:S.exitRequests,
  pending:S.pending?{...S.pending}:null,lastExitAt:S.lastExitAt,lastExitKey:S.lastExitKey,history:S.history.slice(-60),
  manualLeadMinutes:C.manualLeadMinutes,manualPriorityKeys:{...C.manualPriorityKeys}}))),"_handoff")});
if(owned()){if(S.pending&&!watch())cancel('cannot_monitor_manual_input');start();}
})),""))();

}
export {getKVPV_EVENT_PRIORITY} from '../api.mjs';
export const api=Object.freeze({
  get KVPV_EVENT_PRIORITY(){return globalThis.KVPV_EVENT_PRIORITY;},
});