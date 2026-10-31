/* Four independent async observers + guarded native task executors.
 * Never buys, upgrades, spends currency or sends unverified RPC. */
(() => {
 'use strict';
 const W=window,old=W.KVPV_FOUR_SCANS,carry=old?._handoff?.();
 old?.stop?.();
 const actor=String(W.__KVPV_OWN_ACTOR_ID??'');
 const same=carry?.actor===actor;
 const keys=['luyen_khi','phap_thuat','tui','tien_phu'];
 const intervals={luyen_khi:1500,phap_thuat:1700,tui:1200,tien_phu:1900};
 const timers=new Map(),adapters=Object.create(null),lanes=Object.fromEntries(keys.map(key=>[key,{
   count:0,updatedAt:0,reason:'waiting_adapter',error:'',value:null,busy:false,
   pending:same?carry.pending?.[key]??null:null,requests:same?carry.requests?.[key]??0:0,
   confirmed:same?carry.confirmed?.[key]??0:0
 }]));
 let enabled=true,generation=0;
 const owned=()=>!!actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&
   W.__KVPV_UNIVERSAL_HALTED!==true&&W.document?.hidden!==true;
 const copy=v=>{try{return v===undefined?null:JSON.parse(JSON.stringify(v));}catch(_){return {unserializable:true};}};
 // A task is actionable only after its native adapter attests free/no-spend.
 const allowed=new Set(['claim_free_reward','collect_free','accept_free_quest','use_free_consumable']);
 const forbidden=new Set(['upgrade','enhance','purchase','buy','spend','reforge','synthesize','auto_level']);
 const safeTask=t=>t&&typeof t.key==='string'&&t.key.length>0&&t.key.length<=180&&
   allowed.has(t.action)&&!forbidden.has(t.action)&&t.free===true&&t.costVerified===true&&
   t.requiresCurrency!==true&&t.requiresMaterials!==true&&t.requiresKNB!==true;
 function registerAdapter(key,adapter){
   if(!keys.includes(key)||!adapter||['inspect','execute','confirm'].some(k=>typeof adapter[k]!=='function'))
     throw Error('Verified native inspect/execute/confirm adapter required');
   adapters[key]=adapter;lanes[key].reason='adapter_registered';return status();
 }
 // Compatibility with old scan-only readers: inspection only, never execution.
 function registerReader(key,reader){
   if(!keys.includes(key)||typeof reader!=='function')throw Error('Verified reader required');
   adapters[key]={inspect:reader};lanes[key].reason='reader_registered';return status();
 }
 adapters.tui={inspect:()=>W._Ba?._aJ?._hJ?.ins?{available:true,tasks:[]}:null};
 async function scan(key){
   if(!keys.includes(key))throw Error('Unknown scan lane');
   const lane=lanes[key];if(!enabled||lane.busy)return;
   if(!owned()){lane.reason='waiting_own_visible_actor';return;}
   const adapter=adapters[key];if(!adapter){lane.reason='waiting_verified_adapter';return;}
   lane.busy=true;const token=generation;
   try{
     const observed=await adapter.inspect();
     if(!enabled||token!==generation)return;
     lane.count++;lane.updatedAt=Date.now();
     lane.value=copy(observed);lane.error='';
     const tasks=Array.isArray(observed?.tasks)?observed.tasks:[];
     if(lane.pending){
       if(typeof adapter.confirm!=='function'){lane.reason='pending_waiting_verified_confirmation';return;}
       const confirmed=await adapter.confirm(lane.pending.key,observed);
       if(!enabled||token!==generation)return;
       if(confirmed===true){lane.confirmed++;lane.pending=null;}
       else {lane.reason='pending_waiting_confirmation';return;}
     }
     if(typeof adapter.execute!=='function'||typeof adapter.confirm!=='function'){
       lane.reason='observe_only_no_verified_executor';return;
     }
     if(W.KVPV_ENTRY_POLICY?.manual===true||W.KVPV_EVENT_PRIORITY?.hold?.()){
       lane.reason='yield_to_priority';return;
     }
     const task=tasks.find(safeTask);
     if(!task){lane.reason=tasks.length?'no_verified_free_action':'no_tasks';return;}
     // Keep a pending latch before calling native executor; never replay unknown result.
     lane.pending={key:task.key,action:task.action,at:Date.now()};
     lane.requests++;
     await adapter.execute(task.key,task);
     lane.reason='action_requested_waiting_server_confirmation';
   }catch(e){if(enabled&&token===generation){
     lane.error=String(e?.message??e);lane.reason=lane.pending?'action_error_pending_no_retry':'reader_error';
   }}finally{lane.busy=false;}
 }
 function status(){return {enabled,actor,readOnly:false,allowKNB:false,autoUpgrades:false,
   lanes:Object.fromEntries(keys.map(k=>[k,{...lanes[k],intervalMs:intervals[k],
     adapterReady:!!adapters[k],executorReady:typeof adapters[k]?.execute==='function'}]))};}
 function stop(){enabled=false;generation++;for(const id of timers.values())
   (W.KVPV_V1?.timers?.clearInterval??W.clearInterval)?.(id);timers.clear();}
 function start(){if(timers.size)return status();enabled=true;
   const set=W.KVPV_V1?.timers?.setInterval??W.setInterval;
   if(typeof set!=='function')return status();
   for(const key of keys){timers.set(key,set(()=>{void scan(key);},intervals[key]));void scan(key);}
   return status();
 }
 W.KVPV_FOUR_SCANS=Object.freeze({start,stop,scan,status,registerReader,registerAdapter,
   _handoff:()=>({actor,pending:Object.fromEntries(keys.map(k=>[k,lanes[k].pending])),
     requests:Object.fromEntries(keys.map(k=>[k,lanes[k].requests])),
     confirmed:Object.fromEntries(keys.map(k=>[k,lanes[k].confirmed]))})});
 start();
})();