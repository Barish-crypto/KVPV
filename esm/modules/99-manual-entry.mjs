import {getKVPV_MANUAL_ENTRY as __getKVPV0,getKVPV_RED_DOT_MODULE as __getKVPV1} from '../api.mjs';
import {call_KVPV_RED_DOT_MODULE_start as __callKVPV0} from "./01-red-dot-module.mjs";
export function call_KVPV_MANUAL_ENTRY_main(...args){const target=globalThis["KVPV_MANUAL_ENTRY"];const fn=globalThis["KVPV_MANUAL_ENTRY"]?.["main"];if(typeof fn!=='function')throw Error("KVPV_MANUAL_ENTRY.main is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_MANUAL_ENTRY_status(...args){const target=globalThis["KVPV_MANUAL_ENTRY"];const fn=globalThis["KVPV_MANUAL_ENTRY"]?.["status"];if(typeof fn!=='function')throw Error("KVPV_MANUAL_ENTRY.status is not available");return Reflect.apply(fn,target,args);}
function __captureESMFunction(fn,name){
  if(fn.name!==name)Object.defineProperty(fn,"name",{value:name,configurable:true});
  return fn;
}
let __esmLocal0;
let __esmLocal1;
let __esmLocal2;
export {__esmLocal0 as local_anonymous_2_1_0};
export {__esmLocal1 as local_main_1};
export {__esmLocal2 as local_status_2};
export function initialize(){
/* The sole progression entry point: start the red-dot dispatcher after handlers load. */
(__captureESMFunction((__esmLocal0=(() => {
  'use strict';
  const W=window;
  let result={started:false,reason:'not_started'};
  function main(){
    const actor=String(W._Ba?._rJ?._O$?.ins?.actorId??'');
    if(!actor||actor!==String(W.__KVPV_OWN_ACTOR_ID??'')||W.__KVPV_UNIVERSAL_HALTED)
      return result={started:false,reason:'invalid_actor_or_halted'};
    if(typeof __getKVPV1()?.start!=='function')
      return result={started:false,reason:'red_dot_module_unavailable'};
    __callKVPV0();
    return result={started:true,reason:'red_dot_main_started'};
  }
__esmLocal1=main;

  main();
  W.KVPV_MANUAL_ENTRY=Object.freeze({main,status:__captureESMFunction((__esmLocal2=(()=>({...result,mode:'red-dot-only',at:Date.now()}))),"status")});
})),""))();

}
export {getKVPV_MANUAL_ENTRY} from '../api.mjs';
export const api=Object.freeze({
  get KVPV_MANUAL_ENTRY(){return globalThis.KVPV_MANUAL_ENTRY;},
});