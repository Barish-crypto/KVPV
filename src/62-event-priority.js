(() => {
'use strict';
const W=window,NS=W.KVPV||(W.KVPV={}),old=W.KVPV_EVENT_PRIORITY;
old?.stop?.();
const actor=String(W.__KVPV_OWN_ACTOR_ID||'');
const C={enabled:true,pollMs:750,cacheMs:400,exitRetryMs:15000,
  // Only timed, enabled, ready native-auto events take control away from Tu Vuot.
  // The existing timetable/availability gates decide which events are actually actionable.
  exitStageForEvent:true};
const S={timer:null,cachedAt:0,hold:null,lastHoldKey:'',paused:0,exitRequests:0,
  lastExitAt:0,lastExitKey:'',reason:'waiting',lastError:'',history:[]};
const owned=()=>!!actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;
function note(kind,detail){S.history.push({at:Date.now(),kind,detail:String(detail||'').slice(0,150)});if(S.history.length>60)S.history.shift();}
function hold(){
 if(!C.enabled||!owned()||W.KVPV_ENTRY_POLICY?.manual===true)return null;
 const now=Date.now();if(now-S.cachedAt<C.cacheMs)return S.hold;
 S.cachedAt=now;
 try{
  const planner=NS.timeline,daily=W.KVPV_DAILY;
  if(!planner?.config?.enabled||!daily?.quickState?.()?.running){S.hold=null;return null;}
  const reservation=planner.reservation?.({atMs:now,flags:daily.config,forTask:'stage'});
  // Native event readiness is checked by planner; a mere notice will never preempt a stage.
  S.hold=reservation&&reservation.key?{
   key:reservation.key,name:reservation.name,phase:reservation.phase,
   time:reservation.time,minutesUntil:reservation.minutesUntil??null}:null;
  const key=S.hold?.key+'/'+S.hold?.phase;
  if(key!==S.lastHoldKey){S.lastHoldKey=key;note(S.hold?'event_hold':'event_released',S.hold?.name||'');}
  return S.hold;
 }catch(e){S.lastError=String(e);S.hold=null;return null;}
}
function yieldStage(event=hold()){
 if(!event||!owned())return false;
 const model=W._Ba?._Co?._Mo?.ins,scene=W._Ba?._$a,entry=scene?._yo?.ins;
 if(!model)return false;
 const cfg=W._ft?._h$?.ins?.getCfgByLv?.(model.curLv);
 const stageMap=Number(cfg?.[0]),current=Number(entry?.intoSce?.[0]);
 const inside=scene?.SceneUtil?.isCommonScene!==true&&Number.isFinite(stageMap)&&stageMap>0&&current===stageMap;
 const wasAuto=model.auto===true;
 if(wasAuto){model.auto=false;NS.core?.scene?.release?.('stage');S.paused++;note('stage_auto_paused',event.key);}
 if(inside&&C.exitStageForEvent){
  const now=Date.now(),tag=event.key+'/'+stageMap;
  if(now-S.lastExitAt>=Math.max(5000,C.exitRetryMs)||S.lastExitKey!==tag){
   const exit=scene?._Gr?.ins?.exitDungeon;
   // Do not fake a victory, send a repeat-entry command or send an unknown RPC.
   if(typeof exit==='function'){
    S.lastExitAt=now;S.lastExitKey=tag;
    try{exit.call(scene._Gr.ins);S.exitRequests++;note('native_stage_exit_requested',event.key);}
    catch(e){S.lastError=String(e);note('native_exit_error',event.key);}
   }else{S.reason='no_verified_native_exit';}
  }
 }
 S.reason='yield_to_'+event.key;
 return wasAuto||inside;
}
function tick(){if(!C.enabled||!owned())return;const h=hold();if(h)yieldStage(h);else S.reason='stage_can_resume_when_idle';}
function start(){C.enabled=true;if(S.timer==null)S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,C.pollMs);tick();return status();}
function stop(){C.enabled=false;if(S.timer!=null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;return status();}
function status(){return {enabled:C.enabled,actor,hold:hold(),reason:S.reason,paused:S.paused,exitRequests:S.exitRequests,
 stageEnabled:W.KVPV_DAILY?.config?.enableTuVuot??null,nativeStageAuto:W._Ba?._Co?._Mo?.ins?.auto===true,
 timerActive:S.timer!=null,lastError:S.lastError,history:S.history.slice(-20),note:'Events with verified active time/eligibility take priority; stage setting is preserved. Normal idle scheduler resumes after the event.'};}
W.KVPV_EVENT_PRIORITY=Object.freeze({config:C,hold,yieldStage,tick,start,stop,status});
if(owned())start();
})();
