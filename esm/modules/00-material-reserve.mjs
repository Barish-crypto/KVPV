import {getKVPV_BG_RESOURCES as __getKVPV0,getKVPV_FABAO_FAST as __getKVPV1,getKVPV_MATERIAL_RESERVE as __getKVPV2,getKVPV_SOUL_STONE_FAST as __getKVPV3,getKVPV_UPGRADES as __getKVPV4,getKVPV_V1 as __getKVPV5,getKVPV_V875 as __getKVPV6,getKVPV_V877 as __getKVPV7,getKVPV_V880 as __getKVPV8} from '../api.mjs';
export function call_KVPV_MATERIAL_RESERVE_apply(...args){const target=globalThis["KVPV_MATERIAL_RESERVE"];const fn=globalThis["KVPV_MATERIAL_RESERVE"]?.["apply"];if(typeof fn!=='function')throw Error("KVPV_MATERIAL_RESERVE.apply is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_MATERIAL_RESERVE_start(...args){const target=globalThis["KVPV_MATERIAL_RESERVE"];const fn=globalThis["KVPV_MATERIAL_RESERVE"]?.["start"];if(typeof fn!=='function')throw Error("KVPV_MATERIAL_RESERVE.start is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_MATERIAL_RESERVE_stop(...args){const target=globalThis["KVPV_MATERIAL_RESERVE"];const fn=globalThis["KVPV_MATERIAL_RESERVE"]?.["stop"];if(typeof fn!=='function')throw Error("KVPV_MATERIAL_RESERVE.stop is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_MATERIAL_RESERVE_status(...args){const target=globalThis["KVPV_MATERIAL_RESERVE"];const fn=globalThis["KVPV_MATERIAL_RESERVE"]?.["status"];if(typeof fn!=='function')throw Error("KVPV_MATERIAL_RESERVE.status is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_MATERIAL_RESERVE__handoff(...args){const target=globalThis["KVPV_MATERIAL_RESERVE"];const fn=globalThis["KVPV_MATERIAL_RESERVE"]?.["_handoff"];if(typeof fn!=='function')throw Error("KVPV_MATERIAL_RESERVE._handoff is not available");return Reflect.apply(fn,target,args);}
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
export {__esmLocal0 as local_anonymous_5_1_0};
export {__esmLocal1 as local_owned_1};
export {__esmLocal2 as local_disable_2};
export {__esmLocal3 as local_apply_3};
export {__esmLocal4 as local_stop_4};
export {__esmLocal5 as local_status_5};
export {__esmLocal6 as local_start_6};
export {__esmLocal7 as local__handoff_7};
export function initialize(){
/* Upgrade policy: the native progression queue owns the approved upgrade list.
 * Legacy broad senders stay disabled so excluded appearance and feed-stone
 * categories cannot be restarted through older controllers.
 */
(__captureESMFunction((__esmLocal0=(() => {
 'use strict';
 const W=window,prev=__getKVPV2();
 prev?.stop?.();
 const actor=String(W.__KVPV_OWN_ACTOR_ID||'');
 const S={active:true,timer:null,applications:0};
 const owned=__captureESMFunction((__esmLocal1=(()=>!!actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED)),"owned");
 function disable(obj,keys){
   if(!obj||typeof obj!=='object')return;
   for(const key of keys??Object.keys(obj))if(typeof obj[key]==='boolean')obj[key]=false;
 }
__esmLocal2=disable;

 function apply(){
   if(!owned())return false;
   // Keep legacy broad senders disabled; approved progression runs through
   // KVPV_APPEARANCE_AUTO with an explicit per-category allow-list.
   __getKVPV1()?.stop?.();
   __getKVPV3()?.stop?.('user_upgrade_disabled');
   disable(__getKVPV4()?.config);
   disable(__getKVPV0()?.config?.enabled);
   disable(__getKVPV8()?.config,['autoWeapon','autoWing','autoArm']);
   disable(__getKVPV6()?.config,['autoFeed']);
   disable(__getKVPV7()?.config,['autoFeed']);
   S.applications++;return true;
 }
__esmLocal3=apply;

 function stop(){if(S.timer!==null)(__getKVPV5()?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;}
__esmLocal4=stop;

 function status(){return {active:true,actor,reason:'legacy_upgrade_senders_disabled_allowlist_managed_by_native_queue',timerActive:S.timer!==null,applications:S.applications};}
__esmLocal5=status;

 function start(){if(S.timer===null){const schedule=__getKVPV5()?.timers?.setInterval??W.setInterval;if(typeof schedule==='function')S.timer=schedule(apply,1000);}apply();return status();}
__esmLocal6=start;

 W.KVPV_MATERIAL_RESERVE=Object.freeze({active:true,apply,start,stop,status,_handoff:__captureESMFunction((__esmLocal7=(()=>({actor,saved:{}}))),"_handoff")});
 if(owned())start();
})),""))();

}
export {getKVPV_MATERIAL_RESERVE} from '../api.mjs';
export const api=Object.freeze({
  get KVPV_MATERIAL_RESERVE(){return globalThis.KVPV_MATERIAL_RESERVE;},
});