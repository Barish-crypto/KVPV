import {getKVPV_CRAFT_LOW as __getKVPV0,getKVPV_DAILY as __getKVPV1,getKVPV_ENTRY_POLICY as __getKVPV2,getKVPV_EVENT_PRIORITY as __getKVPV3,getKVPV_FABAO_FAST as __getKVPV4,getKVPV_FOUR_SCANS as __getKVPV5,getKVPV_FREE_DAILY_BAG as __getKVPV6,getKVPV_MATERIAL_RESERVE as __getKVPV7,getKVPV_QUICK_USE as __getKVPV8,getKVPV_SKILL_REWARDS as __getKVPV9,getKVPV_SOUL_STONE_FAST as __getKVPV10,getKVPV_V1 as __getKVPV11} from '../api.mjs';
export function call_KVPV_FOUR_SCANS_start(...args){const target=globalThis["KVPV_FOUR_SCANS"];const fn=globalThis["KVPV_FOUR_SCANS"]?.["start"];if(typeof fn!=='function')throw Error("KVPV_FOUR_SCANS.start is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_FOUR_SCANS_stop(...args){const target=globalThis["KVPV_FOUR_SCANS"];const fn=globalThis["KVPV_FOUR_SCANS"]?.["stop"];if(typeof fn!=='function')throw Error("KVPV_FOUR_SCANS.stop is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_FOUR_SCANS_scan(...args){const target=globalThis["KVPV_FOUR_SCANS"];const fn=globalThis["KVPV_FOUR_SCANS"]?.["scan"];if(typeof fn!=='function')throw Error("KVPV_FOUR_SCANS.scan is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_FOUR_SCANS_status(...args){const target=globalThis["KVPV_FOUR_SCANS"];const fn=globalThis["KVPV_FOUR_SCANS"]?.["status"];if(typeof fn!=='function')throw Error("KVPV_FOUR_SCANS.status is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_FOUR_SCANS_opportunities(...args){const target=globalThis["KVPV_FOUR_SCANS"];const fn=globalThis["KVPV_FOUR_SCANS"]?.["opportunities"];if(typeof fn!=='function')throw Error("KVPV_FOUR_SCANS.opportunities is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_FOUR_SCANS_refreshOpportunities(...args){const target=globalThis["KVPV_FOUR_SCANS"];const fn=globalThis["KVPV_FOUR_SCANS"]?.["refreshOpportunities"];if(typeof fn!=='function')throw Error("KVPV_FOUR_SCANS.refreshOpportunities is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_FOUR_SCANS_registerReader(...args){const target=globalThis["KVPV_FOUR_SCANS"];const fn=globalThis["KVPV_FOUR_SCANS"]?.["registerReader"];if(typeof fn!=='function')throw Error("KVPV_FOUR_SCANS.registerReader is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_FOUR_SCANS_registerAdapter(...args){const target=globalThis["KVPV_FOUR_SCANS"];const fn=globalThis["KVPV_FOUR_SCANS"]?.["registerAdapter"];if(typeof fn!=='function')throw Error("KVPV_FOUR_SCANS.registerAdapter is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_FOUR_SCANS__handoff(...args){const target=globalThis["KVPV_FOUR_SCANS"];const fn=globalThis["KVPV_FOUR_SCANS"]?.["_handoff"];if(typeof fn!=='function')throw Error("KVPV_FOUR_SCANS._handoff is not available");return Reflect.apply(fn,target,args);}
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
export {__esmLocal0 as local_anonymous_3_1_0};
export {__esmLocal1 as local_anonymous_11_87_1};
export {__esmLocal2 as local_owned_2};
export {__esmLocal3 as local_copy_3};
export {__esmLocal4 as local_safeTask_4};
export {__esmLocal5 as local_registerAdapter_5};
export {__esmLocal6 as local_anonymous_28_74_6};
export {__esmLocal7 as local_registerReader_7};
export {__esmLocal8 as local_inspect_8};
export {__esmLocal9 as local_inspect_9};
export {__esmLocal10 as local_inspect_10};
export {__esmLocal11 as local_inspect_11};
export {__esmLocal12 as local_scan_12};
export {__esmLocal13 as local_anonymous_102_27_13};
export {__esmLocal14 as local_anonymous_103_30_14};
export {__esmLocal15 as local_computeOpportunities_15};
export {__esmLocal16 as local_refreshOpportunities_16};
export {__esmLocal17 as local_opportunities_17};
export {__esmLocal18 as local_status_18};
export {__esmLocal19 as local_anonymous_152_37_19};
export {__esmLocal20 as local_stop_20};
export {__esmLocal21 as local_start_21};
export {__esmLocal22 as local_anonymous_160_56_22};
export {__esmLocal23 as local__handoff_23};
export {__esmLocal24 as local_anonymous_164_60_24};
export {__esmLocal25 as local_anonymous_165_42_25};
export {__esmLocal26 as local_anonymous_166_43_26};
export {__esmLocal27 as local_anonymous_167_43_27};
export function initialize(){
/* Four independent async observers + guarded native task executors.
 * Never buys, upgrades, spends currency or sends unverified RPC. */
(__captureESMFunction((__esmLocal0=(() => {
 'use strict';
 const W=window,old=__getKVPV5(),carry=old?._handoff?.();
 old?.stop?.();
 const actor=String(W.__KVPV_OWN_ACTOR_ID??'');
 const same=carry?.actor===actor;
 const keys=['luyen_khi','phap_thuat','tui','tien_phu'];
 const intervals={luyen_khi:1500,phap_thuat:1700,tui:1200,tien_phu:1900};
 const timers=new Map(),adapters=Object.create(null),lanes=Object.fromEntries(keys.map(__captureESMFunction((__esmLocal1=(key=>[key,{
   count:0,updatedAt:0,reason:'waiting_adapter',error:'',value:null,busy:false,
   pending:same?carry.pending?.[key]??null:null,requests:same?carry.requests?.[key]??0:0,
   confirmed:same?carry.confirmed?.[key]??0:0,lastCompletedKey:same?carry.completed?.[key]??null:null
 }])),"")));
 let enabled=true,generation=0;
 const observer={busy:false,updatedAt:0,reason:'waiting',error:'',snapshot:null,count:0};
 const owned=__captureESMFunction((__esmLocal2=(()=>!!actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&
   W.__KVPV_UNIVERSAL_HALTED!==true&&W.document?.hidden!==true)),"owned");
 const copy=__captureESMFunction((__esmLocal3=(v=>{try{return v===undefined?null:JSON.parse(JSON.stringify(v));}catch(_){return {unserializable:true};}})),"copy");
 // A task is actionable only after its native adapter attests free/no-spend.
 const allowed=new Set(['claim_free_reward','collect_free','accept_free_quest']);
 const forbidden=new Set(['upgrade','enhance','purchase','buy','spend','reforge','synthesize','auto_level']);
 const safeTask=__captureESMFunction((__esmLocal4=(t=>t&&typeof t.key==='string'&&t.key.length>0&&t.key.length<=180&&
   allowed.has(t.action)&&!forbidden.has(t.action)&&t.free===true&&t.costVerified===true&&
   t.requiresCurrency!==true&&t.requiresMaterials!==true&&t.requiresKNB!==true)),"safeTask");
 function registerAdapter(key,adapter){
   if(!keys.includes(key)||!adapter||['inspect','execute','confirm'].some(__captureESMFunction((__esmLocal6=(k=>typeof adapter[k]!=='function')),"")))
     throw Error('Verified native inspect/execute/confirm adapter required');
   adapters[key]=adapter;lanes[key].reason='adapter_registered';return status();
 }
__esmLocal5=registerAdapter;

 // Compatibility with old scan-only readers: inspection only, never execution.
 function registerReader(key,reader){
   if(!keys.includes(key)||typeof reader!=='function')throw Error('Verified reader required');
   adapters[key]={inspect:reader};lanes[key].reason='reader_registered';return status();
 }
__esmLocal7=registerReader;

 // Report the actual verified controllers, without claiming ownership of their actions.
 adapters.tui={inspect:__captureESMFunction((__esmLocal8=(()=>{
   const model=W._Ba?._aJ?._hJ?.ins;
   const quickUse=__getKVPV8()?.status?.()??null;
   const freeDailyBag=__getKVPV6()?.status?.()??null;
   const soulStone=__getKVPV10()?.status?.()??null;
   return (model||quickUse||freeDailyBag||soulStone)?{available:!!model,quickUse,
     freeDailyBag,soulStone,
     note:'screens show Dung Luyen/Cuong Hoa/Da Hon/Ghep; native status only, no new paid actions',tasks:[]}:null;
 })),"inspect")};
 adapters.phap_thuat={inspect:__captureESMFunction((__esmLocal9=(()=>{
   const handbook=__getKVPV9()?.status?.();
   const fabao=__getKVPV4()?.status?.();
   return (handbook||fabao)?{available:true,skillHandbookRewards:handbook??null,
     fabao:fabao??null,
     note:'Tuyet Hoc and Phap Bao UI confirmed; only existing verified rewards/fabao status observed',tasks:[]}:null;
 })),"inspect")};
 adapters.luyen_khi={inspect:__captureESMFunction((__esmLocal10=(()=>{
   const craft=__getKVPV0()?.status?.(),reserve=__getKVPV7();
   return craft?{available:true,craftStatus:craft,materialsReserved:reserve?.active===true,
     note:'existing crafting executor; do not start or spend resources',tasks:[]}:null;
 })),"inspect")};
 adapters.tien_phu={inspect:__captureESMFunction((__esmLocal11=(()=>{
   const daily=__getKVPV1()?.quickState?.();
   return daily?{available:true,dailyStatus:{running:daily.running,job:daily.job},
     note:'no verified Tien Phu-specific native executor',tasks:[]}:null;
 })),"inspect")};
 async function scan(key){
   if(!keys.includes(key))throw Error('Unknown scan lane');
   const lane=lanes[key];if(!enabled||lane.busy)return;
   if(!owned()){lane.reason='waiting_own_visible_actor';return;}
   const adapter=adapters[key];if(!adapter){lane.reason='waiting_verified_adapter';return;}
   lane.busy=true;const token=generation;
   try{
     // Respect user interaction and event ownership before delegating existing senders.
   const interrupted=__getKVPV2()?.manual===true||
     __getKVPV3()?.hold?.()||
     Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0);
   if(!interrupted&&key==='tui'){
     const bag=__getKVPV6(),bagState=bag?.status?.();
     if(bagState?.enabled===true&&bagState.allowKNB===false)bag.sync?.();
     const quick=__getKVPV8(),quickState=quick?.status?.();
     if(quickState?.enabled===true&&quickState.allowKNB===false)quick.sync?.();
   }else if(!interrupted&&key==='phap_thuat'){
     const rewards=__getKVPV9(),rewardsState=rewards?.status?.();
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
     const task=tasks.find(__captureESMFunction((__esmLocal13=(t=>safeTask(t)&&t.key!==lane.lastCompletedKey)),""));
     if(!task){if(!tasks.some(__captureESMFunction((__esmLocal14=(t=>t.key===lane.lastCompletedKey)),"")))lane.lastCompletedKey=null;
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
__esmLocal12=scan;

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
__esmLocal15=computeOpportunities;

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
__esmLocal16=refreshOpportunities;

 function opportunities(){return observer.snapshot??computeOpportunities();}
__esmLocal17=opportunities;

 function status(){return {enabled,actor,readOnly:false,allowKNB:false,autoUpgrades:false,
   observer:{busy:observer.busy,count:observer.count,updatedAt:observer.updatedAt,reason:observer.reason,error:observer.error},
   lanes:Object.fromEntries(keys.map(__captureESMFunction((__esmLocal19=(k=>[k,{...lanes[k],intervalMs:intervals[k],
     adapterReady:!!adapters[k],executorReady:typeof adapters[k]?.execute==='function'}])),"")))};}
__esmLocal18=status;

 function stop(){enabled=false;generation++;for(const id of timers.values())
   (__getKVPV11()?.timers?.clearInterval??W.clearInterval)?.(id);timers.clear();}
__esmLocal20=stop;

 function start(){if(timers.size)return status();enabled=true;
   const owner=__getKVPV11()?.timers?.setInterval?__getKVPV11().timers:W;
   const set=owner?.setInterval;
   if(typeof W.setInterval!=='function'||typeof set!=='function')return status();
   for(const key of keys){timers.set(key,set.call(owner,__captureESMFunction((__esmLocal22=(()=>{void scan(key);})),""),intervals[key]));void scan(key);}
   void refreshOpportunities();return status();
 }
__esmLocal21=start;

 W.KVPV_FOUR_SCANS=Object.freeze({start,stop,scan,status,opportunities,refreshOpportunities,registerReader,registerAdapter,
   _handoff:__captureESMFunction((__esmLocal23=(()=>({actor,pending:Object.fromEntries(keys.map(__captureESMFunction((__esmLocal24=(k=>[k,lanes[k].pending])),""))),
     requests:Object.fromEntries(keys.map(__captureESMFunction((__esmLocal25=(k=>[k,lanes[k].requests])),""))),
     confirmed:Object.fromEntries(keys.map(__captureESMFunction((__esmLocal26=(k=>[k,lanes[k].confirmed])),""))),
     completed:Object.fromEntries(keys.map(__captureESMFunction((__esmLocal27=(k=>[k,lanes[k].lastCompletedKey])),"")))}))),"_handoff")});
 start();
})),""))();
}
export {getKVPV_FOUR_SCANS} from '../api.mjs';
export const api=Object.freeze({
  get KVPV_FOUR_SCANS(){return globalThis.KVPV_FOUR_SCANS;},
});