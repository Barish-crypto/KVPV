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
   confirmed:same?carry.confirmed?.[key]??0:0,lastCompletedKey:same?carry.completed?.[key]??null:null
 }]));
 let enabled=true,generation=0;
 const observer={busy:false,updatedAt:0,reason:'waiting',error:'',snapshot:null,count:0};
 const owned=()=>!!actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&
   W.__KVPV_UNIVERSAL_HALTED!==true&&W.document?.hidden!==true;
 const copy=v=>{try{return v===undefined?null:JSON.parse(JSON.stringify(v));}catch(_){return {unserializable:true};}};
 // A task is actionable only after its native adapter attests free/no-spend.
 const allowed=new Set(['claim_free_reward','collect_free','accept_free_quest']);
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
 // Report the actual verified controllers, without claiming ownership of their actions.
 adapters.tui={inspect:()=>{
   const model=W._Ba?._aJ?._hJ?.ins;
   const quickUse=W.KVPV_QUICK_USE?.status?.()??null;
   const freeDailyBag=W.KVPV_FREE_DAILY_BAG?.status?.()??null;
   const soulStone=W.KVPV_SOUL_STONE_FAST?.status?.()??null;
   return (model||quickUse||freeDailyBag||soulStone)?{available:!!model,quickUse,
     freeDailyBag,soulStone,
     note:'screens show Dung Luyen/Cuong Hoa/Da Hon/Ghep; native status only, no new paid actions',tasks:[]}:null;
 }};
 adapters.phap_thuat={inspect:()=>{
   const handbook=W.KVPV_SKILL_REWARDS?.status?.();
   const fabao=W.KVPV_FABAO_FAST?.status?.();
   return (handbook||fabao)?{available:true,skillHandbookRewards:handbook??null,
     fabao:fabao??null,
     note:'Tuyet Hoc and Phap Bao UI confirmed; only existing verified rewards/fabao status observed',tasks:[]}:null;
 }};
 adapters.luyen_khi={inspect:()=>{
   const craft=W.KVPV_CRAFT_LOW?.status?.(),reserve=W.KVPV_MATERIAL_RESERVE;
   return craft?{available:true,craftStatus:craft,materialsReserved:reserve?.active===true,
     note:'existing crafting executor; do not start or spend resources',tasks:[]}:null;
 }};
 adapters.tien_phu={inspect:()=>{
   const daily=W.KVPV_DAILY?.quickState?.();
   return daily?{available:true,dailyStatus:{running:daily.running,job:daily.job},
     note:'no verified Tien Phu-specific native executor',tasks:[]}:null;
 }};
 async function scan(key){
   if(!keys.includes(key))throw Error('Unknown scan lane');
   const lane=lanes[key];if(!enabled||lane.busy)return;
   if(!owned()){lane.reason='waiting_own_visible_actor';return;}
   const adapter=adapters[key];if(!adapter){lane.reason='waiting_verified_adapter';return;}
   lane.busy=true;const token=generation;
   try{
     // Respect user interaction and event ownership before delegating existing senders.
   const interrupted=W.KVPV_ENTRY_POLICY?.manual===true||
     W.KVPV_EVENT_PRIORITY?.hold?.()||
     Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0);
   if(!interrupted&&key==='tui'){
     const bag=W.KVPV_FREE_DAILY_BAG,bagState=bag?.status?.();
     if(bagState?.enabled===true&&bagState.allowKNB===false)bag.sync?.();
     const quick=W.KVPV_QUICK_USE,quickState=quick?.status?.();
     if(quickState?.enabled===true&&quickState.allowKNB===false)quick.sync?.();
   }else if(!interrupted&&key==='phap_thuat'){
     const rewards=W.KVPV_SKILL_REWARDS,rewardsState=rewards?.status?.();
     if(rewardsState?.enabled===true&&rewardsState.allowKNB===false)rewards.sync?.();
   }
   const observed=await adapter.inspect();
     if(!enabled||token!==generation)return;
     lane.count++;lane.updatedAt=Date.now();
     lane.value=copy(observed);lane.error='';
     const tasks=Array.isArray(observed?.tasks)?observed.tasks:[];
     if(lane.pending){
       if(typeof adapter.confirm!=='function'){lane.reason='pending_waiting_verified_confirmation';return;}
       const confirmed=await adapter.confirm(lane.pending.key,observed);
       if(!enabled||token!==generation)return;
       if(confirmed===true){lane.confirmed++;lane.lastCompletedKey=lane.pending.key;lane.pending=null;}
       else {lane.reason='pending_waiting_confirmation';return;}
     }
     if(typeof adapter.execute!=='function'||typeof adapter.confirm!=='function'){
       lane.reason='observe_only_no_verified_executor';return;
     }
     if(interrupted){
       lane.reason='yield_to_priority';return;
     }
     const task=tasks.find(t=>safeTask(t)&&t.key!==lane.lastCompletedKey);
     if(!task){if(!tasks.some(t=>t.key===lane.lastCompletedKey))lane.lastCompletedKey=null;
       lane.reason=tasks.length?'no_verified_free_action':'no_tasks';return;}
     // Keep a pending latch before calling native executor; never replay unknown result.
     lane.pending={key:task.key,action:task.action,at:Date.now()};
     lane.requests++;
     await adapter.execute(task.key,task);
     if(!enabled||token!==generation)return;
     lane.reason='action_requested_waiting_server_confirmation';
   }catch(e){if(enabled&&token===generation){
     lane.error=String(e?.message??e);lane.reason=lane.pending?'action_error_pending_no_retry':'reader_error';
   }}finally{lane.busy=false;void refreshOpportunities();}
 }
 // Classify red-dot work without implying permission to spend resources.
 function computeOpportunities(){
   const state=status().lanes;
   const fabao=state.phap_thuat.value?.fabao;
   const rewards=state.phap_thuat.value?.skillHandbookRewards;
   const craft=state.luyen_khi.value?.craftStatus;
   const bag=state.tui.value;
   const groups={
     tuyet_hoc:{state:'awaiting_verified_native_reader',spendAllowed:false},
     phap_bao:{state:fabao?.eligible?.length?'upgrade_available_blocked_by_reserve':'observing',count:fabao?.eligible?.length??0,spendAllowed:false},
     bi_thuat:{state:'awaiting_verified_native_reader',spendAllowed:false},
     skill_rewards:{state:rewards?.ready?.length?'free_rewards_detected':'observing',count:rewards?.ready?.length??0,spendAllowed:false},
     luyen_khi:{state:craft?.recipes?.length?'craft_available_blocked_by_reserve':'observing',count:craft?.recipes?.length??0,spendAllowed:false},
     cuong_hoa:{state:'awaiting_verified_native_reader',spendAllowed:false},
     da_hon:{state:bag?.soulStone?'existing_controller_observed':'awaiting_verified_native_reader',spendAllowed:false},
     dung_luyen:{state:'awaiting_verified_native_reader',spendAllowed:false},
     ghep:{state:'awaiting_verified_native_reader',spendAllowed:false},
     ra:{state:'awaiting_verified_native_reader',spendAllowed:false},
     tien_phu:{state:'awaiting_verified_native_reader',spendAllowed:false}
   };
   return groups;
 }
 async function refreshOpportunities(){
   if(!enabled||observer.busy)return;
   if(!owned()){observer.reason='waiting_own_visible_actor';return;}
   observer.busy=true;const token=generation;
   try{
     // Let active native scan lanes finish first; do not block the event loop.
     await Promise.resolve();
     const next=computeOpportunities();
     if(enabled&&token===generation){observer.snapshot=copy(next);observer.updatedAt=Date.now();observer.count++;observer.reason='observed';observer.error='';}
   }catch(e){if(enabled&&token===generation){observer.error=String(e?.message??e);observer.reason='error';}}
   finally{observer.busy=false;}
 }
 function opportunities(){return observer.snapshot??computeOpportunities();}
 function status(){return {enabled,actor,readOnly:false,allowKNB:false,autoUpgrades:false,
   observer:{busy:observer.busy,count:observer.count,updatedAt:observer.updatedAt,reason:observer.reason,error:observer.error},
   lanes:Object.fromEntries(keys.map(k=>[k,{...lanes[k],intervalMs:intervals[k],
     adapterReady:!!adapters[k],executorReady:typeof adapters[k]?.execute==='function'}]))};}
 function stop(){enabled=false;generation++;for(const id of timers.values())
   (W.KVPV_V1?.timers?.clearInterval??W.clearInterval)?.(id);timers.clear();}
 function start(){if(timers.size)return status();enabled=true;
   const owner=W.KVPV_V1?.timers?.setInterval?W.KVPV_V1.timers:W;
   const set=owner?.setInterval;
   if(typeof set!=='function')return status();
   for(const key of keys){timers.set(key,set.call(owner,()=>{void scan(key);},intervals[key]));void scan(key);}
   void refreshOpportunities();return status();
 }
 W.KVPV_FOUR_SCANS=Object.freeze({start,stop,scan,status,opportunities,refreshOpportunities,registerReader,registerAdapter,
   _handoff:()=>({actor,pending:Object.fromEntries(keys.map(k=>[k,lanes[k].pending])),
     requests:Object.fromEntries(keys.map(k=>[k,lanes[k].requests])),
     confirmed:Object.fromEntries(keys.map(k=>[k,lanes[k].confirmed])),
     completed:Object.fromEntries(keys.map(k=>[k,lanes[k].lastCompletedKey]))})});
 start();
})();