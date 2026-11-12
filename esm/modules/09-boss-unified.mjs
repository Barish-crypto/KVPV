import {getKVPV_BOSS_UNIFIED as __getKVPV0,getKVPV_FAR_SCOPE as __getKVPV1,getKVPV_MODE as __getKVPV2,getKVPV_SKILL_ASYNC_OBSERVER as __getKVPV3,getKVPV_V1 as __getKVPV4} from '../api.mjs';
export function call_KVPV_BOSS_UNIFIED_start(...args){const target=globalThis["KVPV_BOSS_UNIFIED"];const fn=globalThis["KVPV_BOSS_UNIFIED"]?.["start"];if(typeof fn!=='function')throw Error("KVPV_BOSS_UNIFIED.start is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_BOSS_UNIFIED_stop(...args){const target=globalThis["KVPV_BOSS_UNIFIED"];const fn=globalThis["KVPV_BOSS_UNIFIED"]?.["stop"];if(typeof fn!=='function')throw Error("KVPV_BOSS_UNIFIED.stop is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_BOSS_UNIFIED_tick(...args){const target=globalThis["KVPV_BOSS_UNIFIED"];const fn=globalThis["KVPV_BOSS_UNIFIED"]?.["tick"];if(typeof fn!=='function')throw Error("KVPV_BOSS_UNIFIED.tick is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_BOSS_UNIFIED_status(...args){const target=globalThis["KVPV_BOSS_UNIFIED"];const fn=globalThis["KVPV_BOSS_UNIFIED"]?.["status"];if(typeof fn!=='function')throw Error("KVPV_BOSS_UNIFIED.status is not available");return Reflect.apply(fn,target,args);}
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
export {__esmLocal0 as local_anonymous_4_1_0};
export {__esmLocal1 as local_valid_1};
export {__esmLocal2 as local_status_2};
export {__esmLocal3 as local_stop_3};
export {__esmLocal4 as local_tick_4};
export {__esmLocal5 as local_start_5};
export {__esmLocal6 as local_anonymous_34_108_6};
export function initialize(){
/* Unified boss-combat entry point, staged migration.
 * One dispatcher, legacy compatibility is explicitly controlled, no second sender.
 * Default remains passive until validated, preserving active game instances. */
(__captureESMFunction((__esmLocal0=(() => {
 'use strict';
 const W=window,previous=__getKVPV0();previous?.stop?.();
 const actor=String(W.__KVPV_OWN_ACTOR_ID??'');
 const S={enabled:false,mode:'OFF',reason:'awaiting_explicit_activation',timer:null,cycles:0,lastError:''};
 const valid=__captureESMFunction((__esmLocal1=(()=>!!actor&&String(W._Ba?._rJ?._O$?.ins?.actorId??'')===actor&&W.__KVPV_UNIVERSAL_HALTED!==true)),"valid");
 const modes=Object.freeze({BOSS:'BOSS'});
 const pvpOwners=['KVPV_TRUTIEN_PVP','KVPV_TULA_PVP','KVPV_STRONGEST_PVP','KVPV_TIENMA_PVP',
   'KVPV_TRANH_BA_TU_PHUONG','KVPV_LE_HOI_KHU_THU','KVPV_PVP_LUOFENG','KVPV_STRONGEST_TEAM','KVPV_HONOR_TARGET'];
 function activePvpOwner(){
   try{
     const owner=W.KVPV?.core?.scene?.combat?.status?.()?.lanes?.player?.owner;
     if(owner)return 'combat-dispatch:'+String(owner);
   }catch(_){return 'combat-dispatch-unavailable';}
   for(const name of pvpOwners){
     const owner=W[name];if(typeof owner?.status!=='function')continue;
     try{
       const state=owner.status(false);
       if(state?.running===true||state?.active===true||state?.phase==='ACTIVE'||
          state?.enabled===true&&state?.inside===true)return name;
     }catch(_){return name;}
   }
   return '';
 }
 function status(){return {...S,timer:S.timer!==null,actor,singleSender:true,observer:__getKVPV3()?.status?.()??null};}
__esmLocal2=status;

 function stop(){
   S.enabled=false;S.mode='OFF';
   if(S.timer!==null){const owner=__getKVPV4()?.timers?.clearInterval?__getKVPV4().timers:W;owner?.clearInterval?.(S.timer);S.timer=null;}
   S.reason='stopped';return status();
 }
__esmLocal3=stop;

 function tick(){
   if(!S.enabled||!valid())return;
   S.cycles++;
   // All native casts remain under exactly one existing combat coordinator.
   // Never call native combat() from an observer or secondary module.
   const mode=__getKVPV2()?.status?.(false);
   if(mode?.mode==='OFF')S.reason='waiting_native_mode';
   else S.reason='native_single_owner_'+String(mode?.mode??'unknown');
 }
__esmLocal4=tick;

 function start(mode='BOSS'){
   if(!Object.hasOwn(modes,mode))throw Error('Unknown unified boss combat mode');
   if(!valid())throw Error('Actor not ready');
   const scene=Number(W._Ba?._$a?.SceneUtil?.curScene);
   if(scene===74){
     const scope=__getKVPV1()?.status?.();
     if(scope?.inside!==true||scope.kind!=='EXPEDITION'||typeof __getKVPV1()?.eligible!=='function')
       throw Error('Expedition scope is not authoritatively verified');
     const pvpOwner=activePvpOwner();
     if(pvpOwner)throw Error('Expedition combat yielded to active PvP owner: '+pvpOwner);
   }
   if(typeof __getKVPV2()?.start!=='function')throw Error('Native combat coordinator missing');
   // A single transition, never activate multiple mode senders.
   __getKVPV2().start(modes[mode]);
   S.mode=mode;S.enabled=true;S.reason='native_single_owner_'+mode;
   if(S.timer===null){const owner=__getKVPV4()?.timers?.setInterval?__getKVPV4().timers:W;
     if(typeof W.setInterval==='function'&&typeof owner?.setInterval==='function')S.timer=owner.setInterval(__captureESMFunction((__esmLocal6=(()=>tick())),""),250);
   }
   return status();
 }
__esmLocal5=start;

 W.KVPV_BOSS_UNIFIED=Object.freeze({start,stop,tick,status,legacyModes:modes});
})),""))();

}
export {getKVPV_BOSS_UNIFIED} from '../api.mjs';
export const api=Object.freeze({
  get KVPV_BOSS_UNIFIED(){return globalThis.KVPV_BOSS_UNIFIED;},
});