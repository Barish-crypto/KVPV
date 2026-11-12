import {getKVPV_SKILL_ASYNC_OBSERVER as __getKVPV0,getKVPV_V1 as __getKVPV1} from '../api.mjs';
export function call_KVPV_SKILL_ASYNC_OBSERVER_scan(...args){const target=globalThis["KVPV_SKILL_ASYNC_OBSERVER"];const fn=globalThis["KVPV_SKILL_ASYNC_OBSERVER"]?.["scan"];if(typeof fn!=='function')throw Error("KVPV_SKILL_ASYNC_OBSERVER.scan is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_SKILL_ASYNC_OBSERVER_start(...args){const target=globalThis["KVPV_SKILL_ASYNC_OBSERVER"];const fn=globalThis["KVPV_SKILL_ASYNC_OBSERVER"]?.["start"];if(typeof fn!=='function')throw Error("KVPV_SKILL_ASYNC_OBSERVER.start is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_SKILL_ASYNC_OBSERVER_stop(...args){const target=globalThis["KVPV_SKILL_ASYNC_OBSERVER"];const fn=globalThis["KVPV_SKILL_ASYNC_OBSERVER"]?.["stop"];if(typeof fn!=='function')throw Error("KVPV_SKILL_ASYNC_OBSERVER.stop is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_SKILL_ASYNC_OBSERVER_status(...args){const target=globalThis["KVPV_SKILL_ASYNC_OBSERVER"];const fn=globalThis["KVPV_SKILL_ASYNC_OBSERVER"]?.["status"];if(typeof fn!=='function')throw Error("KVPV_SKILL_ASYNC_OBSERVER.status is not available");return Reflect.apply(fn,target,args);}
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
export {__esmLocal0 as local_anonymous_3_1_0};
export {__esmLocal1 as local_owned_1};
export {__esmLocal2 as local_role_2};
export {__esmLocal3 as local_scan_3};
export {__esmLocal4 as local_anonymous_19_34_4};
export {__esmLocal5 as local_anonymous_22_56_5};
export {__esmLocal6 as local_anonymous_26_22_6};
export {__esmLocal7 as local_stop_7};
export {__esmLocal8 as local_start_8};
export {__esmLocal9 as local_anonymous_36_228_9};
export {__esmLocal10 as local_status_10};
export function initialize(){
/* Async skill readiness observer: never casts or overrides cooldown/animation.
 * Combat remains the sole native sender. */
(__captureESMFunction((__esmLocal0=(() => {
 'use strict';
 const W=window,old=__getKVPV0();old?.stop?.();
 const actor=String(W.__KVPV_OWN_ACTOR_ID??'');
 const ids=[8001,8002,8003,8004,8005,1001,1002,1003,1004,1005,1006,1007,1008];
 const S={timer:null,enabled:true,busy:false,checks:0,updatedAt:0,reason:'waiting_role',skills:[],nativeSkills:[],error:''};
 const rotation={owner:{},role:null,total:0,lastAt:0,lastMap:null,lastSkill:null,repeatStreak:0,
   recent:[],byMap:new Map(),error:''};
 const pollMs=250; // Cast events are observed immediately; inventory polling stays lightweight.
 const suiteControllers=[
   ['combatEngine','KVPV_COMBAT_ENGINE',[]],
   ['th300Combat','KVPV_TH300',[false]],
   ['tuyetHoc','KVPV_TUYET_HOC',[false]],
   ['experimentalBoost','KVPV_EXPERIMENTAL_BOOST',[]],
   ['tqBasicForce','KVPV_TQ_BASIC_FORCE',[]],
   ['tqMaThan','KVPV_TQ_MA_THAN',[]],
   ['basicRotation','KVPV_BASIC10',[]],
   ['basic310','KVPV_BASIC310_UNIVERSAL',[]],
   ['transformSkills','KVPV_TRANSFORM10',[]],
   ['linhLung','KVPV_LINHLUNG_TH',[]],
   ['companions','KVPV_COMPANION_COMBAT',[]],
   ['beastIsland','KVPV_BEAST_ISLAND',[]],
   ['kiemKhieuBasic','KVPV_KIEM_KHIEU_BASIC',[]],
   ['tienDuyenBattle','KVPV_TIEN_DUYEN_DAI_CHIEN',[]],
   ['honorTarget','KVPV_HONOR_TARGET',[]],
   ['pvpLuoFeng','KVPV_PVP_LUOFENG',[]],
   ['pvpTruTien','KVPV_TRUTIEN_PVP',[]],
   ['pvpStrongestTeam','KVPV_STRONGEST_TEAM',[]],
   ['pvpTuLa','KVPV_TULA_PVP',[]],
   ['pvpTienMa','KVPV_TIENMA_PVP',[]],
   ['pvpTranhBa','KVPV_TRANH_BA_TU_PHUONG',[]]
 ];
 const owned=__captureESMFunction((__esmLocal1=(()=>!!actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED)),"owned");
 const role=__captureESMFunction((__esmLocal2=(()=>{const world=W._C?._Ba?.instance;return world?.getRole?.(Number(actor))??world?.getRole?.(actor);})),"role");
 function detachRole(){
   const bound=rotation.role;rotation.role=null;
   if(bound){try{bound.off?.(1039,rotation.owner,onNativeCast);}catch(e){rotation.error=String(e?.message??e);}}
 }
 function attachRole(a){
   if(rotation.role===a)return;
   detachRole();
   if(typeof a?.on!=='function'||typeof a?.off!=='function'){rotation.error='native_cast_event_unavailable';return;}
   try{a.on(1039,rotation.owner,onNativeCast);rotation.role=a;rotation.error='';}
   catch(e){rotation.error=String(e?.message??e);}
 }
 function onNativeCast(targetId,skillId){
   if(!S.enabled||!owned())return;
   const id=Number(skillId);
   if(!Number.isSafeInteger(id)||id<=0)return;
   const now=Date.now(),rawMap=Number(W._C?._Mn?._Cn?.currentID??W._Ba?._$a?._yo?.ins?.intoSce?.[0]);
   const mapId=Number.isSafeInteger(rawMap)&&rawMap>0?rawMap:null,mapKey=mapId===null?'unknown':String(mapId);
   let map=rotation.byMap.get(mapKey);
   if(!map){
     if(rotation.byMap.size>=32)rotation.byMap.delete(rotation.byMap.keys().next().value);
     map={mapId,casts:0,lastAt:0,lastSkill:null,repeatStreak:0,skills:Object.create(null)};
     rotation.byMap.set(mapKey,map);
   }
   map.casts++;map.lastAt=now;
   map.repeatStreak=map.lastSkill===id?map.repeatStreak+1:1;
   map.lastSkill=id;
   if(Object.prototype.hasOwnProperty.call(map.skills,id)||Object.keys(map.skills).length<64)map.skills[id]=(map.skills[id]||0)+1;
   rotation.total++;rotation.lastAt=now;
   rotation.repeatStreak=rotation.lastMap===mapId&&rotation.lastSkill===id?rotation.repeatStreak+1:1;
   rotation.lastMap=mapId;rotation.lastSkill=id;
   rotation.recent.push({at:now,mapId,skillId:id});
   if(rotation.recent.length>64)rotation.recent.shift();
 }
 async function scan(){
   if(!S.enabled||S.busy)return;
   if(!owned()){S.reason='waiting_actor';detachRole();return;}
   S.busy=true;
   try{
     // Never call selectSkill/combat/isCooldown here: native decisions are authoritative.
     const a=role();
     if(!a){S.reason='waiting_role';return;}
     attachRole(a);
     const selectorClass=W._d?._Yct?._Eet;
     if(!selectorClass){S.reason='waiting_selector_class';return;}
     const skills=a.getComponent?.(selectorClass);
     if(!skills){S.reason='waiting_skill_component';return;}
     const rows=[...(skills._rtt??[]),...(skills._wet??[])];
     const known=new Map(rows.filter(Array.isArray).map(__captureESMFunction((__esmLocal5=(row=>[Number(row[0]),row])),"")));
     S.nativeSkills=[...known.entries()].filter(([id,row])=>Number.isSafeInteger(id)&&id>0&&Array.isArray(row))
       .slice(0,128).map(([id,row])=>{const readyAt=Number(row[1]);return {id,nativeReadyAt:Number.isFinite(readyAt)?readyAt:null,
         estimatedRemainingMs:Number.isFinite(readyAt)?Math.max(0,readyAt-Date.now()):null};});
     await Promise.resolve();
     if(!S.enabled||!owned())return;
     const now=Date.now();
     S.skills=ids.map(__captureESMFunction((__esmLocal6=(id=>{const row=known.get(id),readyAt=Number(row?.[1]);
       return {id,learned:!!row,nativeRowPresent:!!row,
         nativeReadyAt:row&&Number.isFinite(readyAt)?readyAt:null,
         estimatedRemainingMs:row&&Number.isFinite(readyAt)?Math.max(0,readyAt-now):null};
     })),""));
     S.checks++;S.updatedAt=Date.now();S.reason='observed_native_skill_inventory';S.error='';
   }catch(e){S.error=String(e?.message??e);S.reason='observer_error';}
   finally{S.busy=false;}
 }
__esmLocal3=scan;

 function stop(){S.enabled=false;if(S.timer!==null)(__getKVPV1()?.timers?.clearInterval??W.clearInterval)?.(S.timer);S.timer=null;detachRole();}
__esmLocal7=stop;

 function start(){S.enabled=true;if(S.timer===null){const owner=__getKVPV1()?.timers?.setInterval?__getKVPV1().timers:W;const set=owner?.setInterval;if(typeof W.setInterval==='function'&&typeof set==='function')S.timer=set.call(owner,__captureESMFunction((__esmLocal9=(()=>{void scan();})),""),pollMs);else S.reason='waiting_timer_api';}void scan();return status();}
__esmLocal8=start;

 function status(){return {enabled:S.enabled,actor,observerOnly:true,castsByObserver:0,pollMs,checks:S.checks,updatedAt:S.updatedAt,reason:S.reason,error:S.error,
   skills:S.skills.slice(),nativeSkills:S.nativeSkills.slice(),rotation:{source:'native_actor_event_1039',serverOutcomeProven:false,
     casts:rotation.total,lastAt:rotation.lastAt,lastMap:rotation.lastMap,lastSkill:rotation.lastSkill,
     consecutiveSameSkill:rotation.repeatStreak,eventListenerAttached:!!rotation.role,error:rotation.error,
     maps:[...rotation.byMap.entries()].map(([key,row])=>({mapId:row.mapId,key,casts:row.casts,lastAt:row.lastAt,
       lastSkill:row.lastSkill,consecutiveSameSkill:row.repeatStreak,skills:{...row.skills}})),
     recent:rotation.recent.slice()}};}
__esmLocal10=status;

 function suiteStatus(){
   const controllers={};
   for(const [name,key,args] of suiteControllers){
     const controller=W[key],readStatus=controller?.status;
     if(typeof readStatus!=='function'){
       controllers[name]={available:false,status:null};
       continue;
     }
     try{
       controllers[name]={available:true,status:Reflect.apply(readStatus,controller,args),error:null};
     }catch(error){
       controllers[name]={available:true,status:null,error:String(error?.message??error)};
     }
   }
   const results=Object.values(controllers);
   return {checkedAt:Date.now(),observer:status(),summary:{
     controllerCount:results.length,
     availableCount:results.filter(result=>result.available).length,
     unavailableCount:results.filter(result=>!result.available).length,
     errorCount:results.filter(result=>typeof result.error==='string'&&result.error.length>0).length
   },controllers};
 }

 W.KVPV_SKILL_ASYNC_OBSERVER=Object.freeze({scan,start,stop,status,suiteStatus});
 start();
})),""))();
}
export {getKVPV_SKILL_ASYNC_OBSERVER} from '../api.mjs';
export const api=Object.freeze({
  get KVPV_SKILL_ASYNC_OBSERVER(){return globalThis.KVPV_SKILL_ASYNC_OBSERVER;},
});