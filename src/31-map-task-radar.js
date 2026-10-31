/* Cross-map task radar: observes native state on every scene without taking combat or scene ownership.
 * Event/daily executors remain authoritative; no unsolicited RPC, spending or scene exits. */
(()=>{
 'use strict';
 const W=window,old=W.KVPV_MAP_TASK_RADAR,carry=old?._handoff?.();old?.stop?.();
 const actor=String(W.__KVPV_OWN_ACTOR_ID??'');
 const S={enabled:true,timer:null,busy:false,scans:carry?.scans??0,changes:carry?.changes??0,map:null,lastAt:0,reason:'waiting',error:'',snapshot:null,
   priority:'idle',stalled:false,stalls:carry?.stalls??0,lastProgressAt:Date.now(),signature:null,
   completed:carry?.completed??0,events:carry?.events??0,missed:carry?.missed??0,
   history:carry?.history?.slice(-60)??[],lastEvent:null,dispatches:0};
 const owned=()=>!!actor&&String(W._Ba?._rJ?._O$?.ins?.actorId??'')===actor&&W.__KVPV_UNIVERSAL_HALTED!==true;
 const map=()=>Number(W._C?._Mn?._Cn?.currentID??W._Ba?._$a?._yo?.ins?.intoSce?.[0]);
 function read(){
  const m=map(),task=W._Ba?._zIt?._FIt?.ins?.taskInfo;
  const job=W.KVPV_DAILY?.quickState?.()??null;
  const ev=W.KVPV_EVENT_PRIORITY?.status?.()??null;
  const quest=W.KVPV_QUEST_GOALS?.status?.()??null;
  const free=W.KVPV_FOUR_SCANS?.status?.()??null;
  const scene=W.KVPV?.core?.scene?.status?.()??null;
  return {map:Number.isFinite(m)?m:null,task:Array.isArray(task)?{id:task[0]??null,state:task[1]??null}:null,
   daily:job?{job:job.job??null,step:job.step??null}:null,
   event:ev?{reason:ev.reason??null}:null,quest:quest?{reason:quest.reason??null}:null,
   freeScans:free?{enabled:free.enabled,counts:Object.fromEntries(Object.entries(free.lanes??{}).map(([k,v])=>[k,v.count??0]))}:null,
   owner:scene?{tag:scene.tag??null}:null};
 }
 function priority(next){
  if(W.KVPV_ENTRY_POLICY?.manual===true)return 'manual';
  if(W.KVPV_EVENT_PRIORITY?.hold?.())return 'timed_event';
  if(W.KVPV_BOSS_TEAM?.priority?.())return 'boss_team';
  if(next.owner?.tag)return 'scene_owner';
  if(next.daily?.job&&next.daily.job!=='rảnh'&&next.daily.job!=='ranh')
   return 'daily_running';
  if(next.quest?.reason&&next.quest.reason!=='waiting_task')return 'quest';
  return 'free_tasks_or_stage';
 }
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
   const confirmed=Object.values(W.KVPV_FOUR_SCANS?.status?.()?.lanes??{})
     .reduce((sum,row)=>sum+(Number(row?.confirmed)||0),0);
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
 function stop(){S.enabled=false;if(S.timer!==null){
  const owner=W.KVPV_V1?.timers?.clearInterval?W.KVPV_V1.timers:W;
  owner?.clearInterval?.(S.timer);S.timer=null;
 }}
 function start(){S.enabled=true;if(S.timer!==null)return status();
  if(typeof W.setInterval!=='function')return status();
  const owner=W.KVPV_V1?.timers?.setInterval?W.KVPV_V1.timers:W;
  if(typeof owner?.setInterval!=='function')return status();
  S.timer=owner.setInterval(tick,750);tick();return status();
 }
 function status(){return {enabled:S.enabled,actor,scans:S.scans,map:S.map,mapChanges:S.changes,lastAt:S.lastAt,
  priority:S.priority,stalled:S.stalled,stalls:S.stalls,lastProgressAt:S.lastProgressAt,
  stats:{completed:S.completed,eventsObserved:S.events,missedConfirmed:S.missed,scans:S.scans,mapChanges:S.changes,stalls:S.stalls},
  history:S.history.slice(-20),reason:S.reason,error:S.error,snapshot:S.snapshot,readOnly:true,allowKNB:false,
  note:'Read-only cross-map coordination: native executors retain dispatch and ACK; no fabricated completion or forced recovery.'};}
 W.KVPV_MAP_TASK_RADAR=Object.freeze({start,stop,tick,status,
  _handoff:()=>({actor,scans:S.scans,changes:S.changes,stalls:S.stalls,completed:S.completed,
   events:S.events,missed:S.missed,history:S.history.slice(-60)})});
 start();
})();
