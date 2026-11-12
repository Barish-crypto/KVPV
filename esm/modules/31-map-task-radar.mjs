import {getKVPV_BOSS_TEAM as __getKVPV0,getKVPV_DAILY as __getKVPV1,getKVPV_ENTRY_POLICY as __getKVPV2,getKVPV_EVENT_PRIORITY as __getKVPV3,getKVPV_FOUR_SCANS as __getKVPV4,getKVPV_MAP_TASK_RADAR as __getKVPV5,getKVPV_QUEST_GOALS as __getKVPV6,getKVPV_V1 as __getKVPV7} from '../api.mjs';
export function call_KVPV_MAP_TASK_RADAR_start(...args){const target=globalThis["KVPV_MAP_TASK_RADAR"];const fn=globalThis["KVPV_MAP_TASK_RADAR"]?.["start"];if(typeof fn!=='function')throw Error("KVPV_MAP_TASK_RADAR.start is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_MAP_TASK_RADAR_stop(...args){const target=globalThis["KVPV_MAP_TASK_RADAR"];const fn=globalThis["KVPV_MAP_TASK_RADAR"]?.["stop"];if(typeof fn!=='function')throw Error("KVPV_MAP_TASK_RADAR.stop is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_MAP_TASK_RADAR_tick(...args){const target=globalThis["KVPV_MAP_TASK_RADAR"];const fn=globalThis["KVPV_MAP_TASK_RADAR"]?.["tick"];if(typeof fn!=='function')throw Error("KVPV_MAP_TASK_RADAR.tick is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_MAP_TASK_RADAR_status(...args){const target=globalThis["KVPV_MAP_TASK_RADAR"];const fn=globalThis["KVPV_MAP_TASK_RADAR"]?.["status"];if(typeof fn!=='function')throw Error("KVPV_MAP_TASK_RADAR.status is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_MAP_TASK_RADAR__handoff(...args){const target=globalThis["KVPV_MAP_TASK_RADAR"];const fn=globalThis["KVPV_MAP_TASK_RADAR"]?.["_handoff"];if(typeof fn!=='function')throw Error("KVPV_MAP_TASK_RADAR._handoff is not available");return Reflect.apply(fn,target,args);}
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
export {__esmLocal0 as local_anonymous_3_1_0};
export {__esmLocal1 as local_owned_1};
export {__esmLocal2 as local_map_2};
export {__esmLocal3 as local_read_3};
export {__esmLocal4 as local_anonymous_23_101_4};
export {__esmLocal5 as local_priority_5};
export {__esmLocal6 as local_tick_6};
export {__esmLocal7 as local_anonymous_54_13_7};
export {__esmLocal8 as local_stop_8};
export {__esmLocal9 as local_start_9};
export {__esmLocal10 as local_status_10};
export {__esmLocal11 as local__handoff_11};
export function initialize(){
/* Cross-map task radar: observes native state on every scene without taking combat or scene ownership.
 * Event/daily executors remain authoritative; no unsolicited RPC, spending or scene exits. */
(__captureESMFunction((__esmLocal0=(()=>{
 'use strict';
 const W=window,old=__getKVPV5(),carry=old?._handoff?.();old?.stop?.();
 const actor=String(W.__KVPV_OWN_ACTOR_ID??'');
 const S={enabled:true,timer:null,busy:false,scans:carry?.scans??0,changes:carry?.changes??0,map:null,lastAt:0,reason:'waiting',error:'',snapshot:null,
   priority:'idle',stalled:false,stalls:carry?.stalls??0,lastProgressAt:Date.now(),signature:null,
   completed:carry?.completed??0,events:carry?.events??0,missed:carry?.missed??0,
   history:carry?.history?.slice(-60)??[],lastEvent:null,dispatches:0};
 const owned=__captureESMFunction((__esmLocal1=(()=>!!actor&&String(W._Ba?._rJ?._O$?.ins?.actorId??'')===actor&&W.__KVPV_UNIVERSAL_HALTED!==true)),"owned");
 const map=__captureESMFunction((__esmLocal2=(()=>Number(W._C?._Mn?._Cn?.currentID??W._Ba?._$a?._yo?.ins?.intoSce?.[0]))),"map");
 function read(){
  const m=map(),task=W._Ba?._zIt?._FIt?.ins?.taskInfo;
  const job=__getKVPV1()?.quickState?.()??null;
  const ev=__getKVPV3()?.status?.()??null;
  const quest=__getKVPV6()?.status?.()??null;
  const free=__getKVPV4()?.status?.()??null;
  const scene=W.KVPV?.core?.scene?.status?.()??null;
  return {map:Number.isFinite(m)?m:null,task:Array.isArray(task)?{id:task[0]??null,state:task[1]??null}:null,
   daily:job?{job:job.job??null,step:job.step??null}:null,
   event:ev?{reason:ev.reason??null}:null,quest:quest?{reason:quest.reason??null}:null,
   freeScans:free?{enabled:free.enabled,counts:Object.fromEntries(Object.entries(free.lanes??{}).map(__captureESMFunction((__esmLocal4=(([k,v])=>[k,v.count??0])),"")))}:null,
   owner:scene?{tag:scene.tag??null}:null};
 }
__esmLocal3=read;

 function priority(next){
  if(__getKVPV2()?.manual===true)return 'manual';
  if(__getKVPV3()?.hold?.())return 'timed_event';
  if(__getKVPV0()?.priority?.())return 'boss_team';
  if(next.owner?.tag)return 'scene_owner';
  if(next.daily?.job&&next.daily.job!=='rảnh'&&next.daily.job!=='ranh')
   return 'daily_running';
  if(next.quest?.reason&&next.quest.reason!=='waiting_task')return 'quest';
  return 'free_tasks_or_stage';
 }
__esmLocal5=priority;

 function tick(){
  if(!S.enabled||S.busy)return;
  if(!owned()){S.reason='waiting_actor';return;}
  S.busy=true;
  try{
   const next=read();const changed=next.map!==S.map;
   if(changed){S.map=next.map;S.changes++;}
   const now=Date.now(),signature=JSON.stringify([next.map,next.task,next.daily?.job,next.daily?.step]);
   if(S.signature!==signature){S.signature=signature;S.lastProgressAt=now;S.stalled=false;
     S.history.push({at:now,event:'progress',map:next.map,job:next.daily?.job??null});
     if(S.history.length>60)S.history.shift();
   }else if(now-S.lastProgressAt>=60000&&!S.stalled){
     S.stalled=true;S.stalls++;
     S.history.push({at:now,event:'stalled_60s',map:next.map,job:next.daily?.job??null});
     if(S.history.length>60)S.history.shift();
   }
   // Count only ACK-confirmed completions from the independent native scan executors.
   const confirmed=Object.values(__getKVPV4()?.status?.()?.lanes??{})
     .reduce(__captureESMFunction((__esmLocal7=((sum,row)=>sum+(Number(row?.confirmed)||0))),""),0);
   if(Number.isFinite(confirmed)&&confirmed>S.completed)S.completed=confirmed;
   const event=next.event?.reason;
   if(event&&event!=='waiting'&&event!==S.lastEvent){S.events++;S.lastEvent=event;}
   if(changed){S.history.push({at:now,event:'map_change',map:next.map});if(S.history.length>60)S.history.shift();}
   S.priority=priority(next);S.snapshot=next;S.scans++;S.lastAt=now;
   S.reason=S.stalled?'stalled_observation_no_unsafe_retry':changed?'map_changed_observed':'observing_any_map';
   S.error='';
   // Monitoring is deliberately non-invasive. Existing event/task controllers already poll.
  }catch(e){S.error=String(e?.message??e);S.reason='reader_error';}
  finally{S.busy=false;}
 }
__esmLocal6=tick;

 function stop(){S.enabled=false;if(S.timer!==null){
  const owner=__getKVPV7()?.timers?.clearInterval?__getKVPV7().timers:W;
  owner?.clearInterval?.(S.timer);S.timer=null;
 }}
__esmLocal8=stop;

 function start(){S.enabled=true;if(S.timer!==null)return status();
  if(typeof W.setInterval!=='function')return status();
  const owner=__getKVPV7()?.timers?.setInterval?__getKVPV7().timers:W;
  if(typeof owner?.setInterval!=='function')return status();
  S.timer=owner.setInterval(tick,750);tick();return status();
 }
__esmLocal9=start;

 function status(){return {enabled:S.enabled,actor,scans:S.scans,map:S.map,mapChanges:S.changes,lastAt:S.lastAt,
  priority:S.priority,stalled:S.stalled,stalls:S.stalls,lastProgressAt:S.lastProgressAt,
  stats:{completed:S.completed,eventsObserved:S.events,missedConfirmed:S.missed,scans:S.scans,mapChanges:S.changes,stalls:S.stalls},
  history:S.history.slice(-20),reason:S.reason,error:S.error,snapshot:S.snapshot,readOnly:true,allowKNB:false,
  note:'Read-only cross-map coordination: native executors retain dispatch and ACK; no fabricated completion or forced recovery.'};}
__esmLocal10=status;

 W.KVPV_MAP_TASK_RADAR=Object.freeze({start,stop,tick,status,
  _handoff:__captureESMFunction((__esmLocal11=(()=>({actor,scans:S.scans,changes:S.changes,stalls:S.stalls,completed:S.completed,
   events:S.events,missed:S.missed,history:S.history.slice(-60)}))),"_handoff")});
 start();
})),""))();

}
export {getKVPV_MAP_TASK_RADAR} from '../api.mjs';
export const api=Object.freeze({
  get KVPV_MAP_TASK_RADAR(){return globalThis.KVPV_MAP_TASK_RADAR;},
});