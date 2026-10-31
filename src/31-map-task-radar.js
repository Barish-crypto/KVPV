/* Cross-map task radar: observes native state on every scene without taking combat or scene ownership.
 * Event/daily executors remain authoritative; no unsolicited RPC, spending or scene exits. */
(()=>{
 'use strict';
 const W=window,old=W.KVPV_MAP_TASK_RADAR;old?.stop?.();
 const actor=String(W.__KVPV_OWN_ACTOR_ID??'');
 const S={enabled:true,timer:null,busy:false,scans:0,changes:0,map:null,lastAt:0,reason:'waiting',error:'',snapshot:null};
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
 function tick(){
  if(!S.enabled||S.busy)return;
  if(!owned()){S.reason='waiting_actor';return;}
  S.busy=true;
  try{
   const next=read();const changed=next.map!==S.map;
   if(changed){S.map=next.map;S.changes++;}
   S.snapshot=next;S.scans++;S.lastAt=Date.now();S.reason=changed?'map_changed_observed':'observing_any_map';S.error='';
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
 function status(){return {enabled:S.enabled,actor,scans:S.scans,map:S.map,mapChanges:S.changes,lastAt:S.lastAt,reason:S.reason,error:S.error,snapshot:S.snapshot,readOnly:true,allowKNB:false};}
 W.KVPV_MAP_TASK_RADAR=Object.freeze({start,stop,tick,status});
 start();
})();
