import {getKVPV_PB_BOSS_DAILY as __getKVPV0} from '../api.mjs';
export function call_KVPV_PB_BOSS_DAILY_status(...args){const target=globalThis["KVPV_PB_BOSS_DAILY"];const fn=globalThis["KVPV_PB_BOSS_DAILY"]?.["status"];if(typeof fn!=='function')throw Error("KVPV_PB_BOSS_DAILY.status is not available");return Reflect.apply(fn,target,args);}
function __captureESMFunction(fn,name){
  if(fn.name!==name)Object.defineProperty(fn,"name",{value:name,configurable:true});
  return fn;
}
let __esmLocal0;
let __esmLocal1;
export {__esmLocal0 as local_anonymous_2_1_0};
export {__esmLocal1 as local_status_1};
export function initialize(){
/* Retired progression profile. Red-dot is the only automatic task selector. */
(__captureESMFunction((__esmLocal0=(() => {
  'use strict';
  window.KVPV_PB_BOSS_DAILY=Object.freeze({
    status:__captureESMFunction((__esmLocal1=(()=>({enabled:false,reason:'red-dot-only; legacy daily profile disabled',allowKNB:false}))),"status")
  });
})),""))();

}
export {getKVPV_PB_BOSS_DAILY} from '../api.mjs';
export const api=Object.freeze({
  get KVPV_PB_BOSS_DAILY(){return globalThis.KVPV_PB_BOSS_DAILY;},
});