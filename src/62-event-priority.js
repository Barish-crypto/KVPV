/* Timed event owns the stage only while the native event reservation is actionable.
 * If native exit fails, restore the paused stage-auto flag only in the same scene,
 * with the same actor, original Daily preference, and no user input in between.
 * No RPC, dungeon re-entry, quest start, or fabricated completion is used.
 */
(() => {
'use strict';
const W=window,NS=W.KVPV||(W.KVPV={}),old=W.KVPV_EVENT_PRIORITY,carry=old?._handoff?.();
old?.stop?.('reload');
const actor=String(W.__KVPV_OWN_ACTOR_ID||''),same=carry?.actor===actor;
// Only manually attended large events verified in the existing Daily schedule.
// This is a scene reservation, NOT an event-entry executor or a reward request.
const C={enabled:true,pollMs:500,cacheMs:400,exitRetryMs:15000,exitStageForEvent:true,
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
const owned=()=>!!actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;
const model=()=>W._Ba?._Co?._Mo?.ins;
const scene=()=>W._Ba?._$a;
const currentMap=()=>Number(scene()?._yo?.ins?.intoSce?.[0]);
const stageMap=()=>Number(W._ft?._h$?.ins?.getCfgByLv?.(model()?.curLv)?.[0]);
function note(kind,detail){S.history.push({at:Date.now(),kind,detail:String(detail||'').slice(0,150)});if(S.history.length>60)S.history.shift();}
function input(e){if(e?.isTrusted===true&&S.pending)cancel('user_input');}
function unwatch(){if(!S.watching)return;for(const type of ['pointerdown','keydown','touchstart','click'])W.removeEventListener(type,input,true);S.watching=false;}
function watch(){
 if(S.watching)return true;
 if(typeof W.addEventListener!=='function'||typeof W.removeEventListener!=='function')return false;
 for(const type of ['pointerdown','keydown','touchstart','click'])W.addEventListener(type,input,true);
 S.watching=true;return true;
}
function cancel(reason){
 if(S.pending){S.pending=null;note('stage_resume_cancelled',reason);}
 unwatch();S.reason=reason;
}
function sameStage(p){
 return scene()?.SceneUtil?.isCommonScene===false&&
 Number.isSafeInteger(p?.map)&&p.map>0&&currentMap()===p.map&&stageMap()===p.map;
}
function guardPending(){
 const p=S.pending;if(!p)return false;
 if(!owned()){cancel('actor_changed');return false;}
 if(W.KVPV_ENTRY_POLICY?.manual===true){cancel('manual_entry_policy');return false;}
 if(W.KVPV_DAILY?.config?.enableTuVuot!==true){cancel('stage_preference_disabled');return false;}
 if(W._Ba?._rJ?._O$?.ins?.isDead===true){cancel('actor_dead');return false;}
 if(!sameStage(p)){cancel('stage_changed_or_exited');return false;}
 if(model()?.auto!==false){cancel('stage_auto_changed_elsewhere');return false;}
 if(!S.watching&&!watch()){cancel('cannot_monitor_manual_input');return false;}
 return true;
}
// Use Daily's authoritative read-only event calendar. Never fabricate event
// windows or treat schedule-only entries as executable automatic actions.
function manualReservation(daily,now){
 if(daily?.config?.enableEventSchedule===false||typeof daily?.lichData!=='function')return null;
 const calendar=daily.lichData();
 if(!calendar||!Array.isArray(calendar.active)||!Array.isArray(calendar.upcoming))return null;
 const lead=Math.max(0,Math.min(10,Number(C.manualLeadMinutes)||0));
 const wallMinute=now/60000+420; // VN is UTC+7, no DST; Daily uses VN wall-clock minutes.
 const eligible=(e,phase)=>{
  if(!e||e.action==='auto'||e.instant===true||e.unlock)return null;
  // Native Daily calendar is authoritative. Besides the known large events,
  // a currently OPEN high-priority event may preempt stage if Daily supplies
  // an explicit priority (1-3); never guess from a screen icon alone.
  const known=C.manualPriorityKeys?.[e.key]===true;
  const highPriority=phase==='opening'&&Number.isInteger(e.priority)&&e.priority>=1&&e.priority<=3;
  if(!known&&!highPriority)return null;
  const start=Number(e.start),end=Number(e.end);
  if(!Number.isFinite(start)||!Number.isFinite(end)||end<=start)return null;
  const until=start-wallMinute;
  if(phase==='opening' ? !(wallMinute>=start&&wallMinute<end) : !(until>0&&until<=lead))return null;
  return {key:e.key,name:e.name||e.key,phase,time:e.time,
   minutesUntil:Math.max(0,until),requiresManualEntry:true,mode:'manual'};
 };
 const active=calendar.active.map(e=>eligible(e,'opening')).filter(Boolean);
 const next=calendar.upcoming.map(e=>eligible(e,'upcoming')).filter(Boolean);
 active.sort((a,b)=>a.minutesUntil-b.minutesUntil||a.key.localeCompare(b.key));
 next.sort((a,b)=>a.minutesUntil-b.minutesUntil||a.key.localeCompare(b.key));
 return active[0]||next[0]||null;
}
function observedActivities(){
 const daily=W.KVPV_DAILY;
 if(typeof daily?.lichData!=='function')return [];
 try{
  const c=daily.lichData(),active=Array.isArray(c?.active)?c.active:[];
  return active.slice(0,20).filter(e=>e&&typeof e.key==='string').map(e=>({
   key:e.key,name:String(e.name||e.key),action:e.action||'notice',
   priority:Number.isFinite(e.priority)?Number(e.priority):null,
   state:'calendar_active',autoEntryConfirmed:e.action==='auto'
  }));
 }catch(_){return [];}
}
function chooseReservation(auto,manual){
 if(!manual)return auto;
 if(!auto)return manual;
 if(manual.phase==='opening'&&auto.phase!=='opening')return manual;
 if(auto.phase==='opening'&&manual.phase!=='opening')return auto;
 return manual.minutesUntil<auto.minutesUntil?manual:auto;
}
function hold(){
 if(!C.enabled||!owned()||W.KVPV_ENTRY_POLICY?.manual===true)return null;
 const now=Date.now();if(now-S.cachedAt<C.cacheMs)return S.hold;
 S.cachedAt=now;
 try{
  const planner=NS.timeline,daily=W.KVPV_DAILY;
  if(!planner?.config?.enabled||!daily?.quickState?.()?.running){S.hold=null;return null;}
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
function yieldStage(event=hold()){
 if(!event||!owned())return false;
 const m=model(),sc=scene();
 if(!m)return false;
 const map=stageMap(),inside=sc?.SceneUtil?.isCommonScene===false&&
   Number.isSafeInteger(map)&&map>0&&currentMap()===map;
 // Tian Quan may be running with native stage-auto disabled. It must still
 // relinquish combat ownership and leave on a verified timed reservation.
 const tqInside=W.KVPV_FAR_SCOPE?.status?.()?.kind==='THIEN_QUAN'&&
   W.KVPV_FAR_SCOPE?.status?.()?.inside===true;
 if(tqInside){
   try{W.KVPV_MODE?.stop?.('yield_to_scheduled_event_'+event.key);}
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
function resumeIfSafe(){
 if(!guardPending()){if(!S.pending&&S.reason==='waiting')S.reason='stage_can_resume_when_idle';return false;}
 const daily=W.KVPV_DAILY,q=daily?.quickState?.();
 if(q?.running!==true){cancel('daily_inactive');return false;}
 const owner=NS.core?.scene?.status?.()?.owner;
 if(owner){cancel('another_scene_owner');return false;}
 if(W.KVPV_BOSS_TEAM?.priority?.()===true){cancel('boss_priority');return false;}
 if(W.KVPV_HITRUN1?.status?.(false)?.running===true){cancel('other_combat_controller');return false;}
 const m=model();if(!m||m.auto!==false)return false;
 // Native state flag only; never invoke stage entry or emit game-network requests.
 m.auto=true;S.pending=null;unwatch();S.resumed++;
 S.reason='stage_auto_restored_in_same_scene';note('stage_auto_restored','same_stage_no_event');
 return true;
}
function tick(){
 if(!C.enabled||!owned()){cancel('disabled_or_actor_changed');return;}
 const event=hold();
 if(S.pending)guardPending();
 if(event)yieldStage(event);
 else if(S.pending)resumeIfSafe();
 else S.reason='stage_can_resume_when_idle';
}
function start(){C.enabled=true;if(S.timer==null)S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,C.pollMs);tick();return status();}
function stop(reason='manual'){
 C.enabled=false;if(S.timer!=null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);
 S.timer=null;unwatch();if(reason!=='reload')cancel('manual_stop');
 return status();
}
function status(){return {enabled:C.enabled,actor,hold:hold(),observedActivities:observedActivities(),reason:S.reason,paused:S.paused,
 resumed:S.resumed,pendingResume:S.pending?{map:S.pending.map,eventKey:S.pending.eventKey,at:S.pending.at}:null,
 exitRequests:S.exitRequests,stageEnabled:W.KVPV_DAILY?.config?.enableTuVuot??null,
 nativeStageAuto:model()?.auto===true,timerActive:S.timer!=null,lastError:S.lastError,history:S.history.slice(-20),
 manualPriorityKeys:Object.keys(C.manualPriorityKeys||{}).filter(k=>C.manualPriorityKeys[k]===true),
 note:'Automatic events keep native Daily entry; manual-only events reserve time but require user entry. Restore only in the same stage without manual input. No invented RPC or KNB.'};}
W.KVPV_EVENT_PRIORITY=Object.freeze({config:C,hold,yieldStage,tick,start,stop,status,
 _handoff:()=>({actor,paused:S.paused,resumed:S.resumed,exitRequests:S.exitRequests,
  pending:S.pending?{...S.pending}:null,lastExitAt:S.lastExitAt,lastExitKey:S.lastExitKey,history:S.history.slice(-60),
  manualLeadMinutes:C.manualLeadMinutes,manualPriorityKeys:{...C.manualPriorityKeys}})});
if(owned()){if(S.pending&&!watch())cancel('cannot_monitor_manual_input');start();}
})();
