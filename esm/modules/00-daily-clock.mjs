import {getKVPV_DAILY_CLOCK as __getKVPV0} from '../api.mjs';
export function call_KVPV_DAILY_CLOCK_status(...args){const target=globalThis["KVPV_DAILY_CLOCK"];const fn=globalThis["KVPV_DAILY_CLOCK"]?.["status"];if(typeof fn!=='function')throw Error("KVPV_DAILY_CLOCK.status is not available");return Reflect.apply(fn,target,args);}
function __captureESMFunction(fn,name){
  if(fn.name!==name)Object.defineProperty(fn,"name",{value:name,configurable:true});
  return fn;
}
let __esmLocal0;
let __esmLocal1;
let __esmLocal2;
let __esmLocal3;
export {__esmLocal0 as local_anonymous_6_1_0};
export {__esmLocal1 as local_key_1};
export {__esmLocal2 as local_nextResetAt_2};
export {__esmLocal3 as local_status_3};
export function initialize(){

/* Logical activity day begins at 05:00 Asia/Saigon (UTC+7).
 * Calendar event schedules keep their actual wall-clock dates. */
// HOT_RELOAD_SMOKE_20261027: comment-only probe; runtime logic unchanged.

(__captureESMFunction((__esmLocal0=(() => {

 'use strict';const W=window,DAY=86400000,OFFSET=2*3600000;

 const key=__captureESMFunction((__esmLocal1=((at=Date.now())=>new Date(Number(at)+OFFSET).toISOString().slice(0,10))),"key");

 const nextResetAt=__captureESMFunction((__esmLocal2=((at=Date.now())=>(Math.floor((Number(at)+OFFSET)/DAY)+1)*DAY-OFFSET)),"nextResetAt");

 W.KVPV_DAILY_CLOCK=Object.freeze({key,nextResetAt,status:__captureESMFunction((__esmLocal3=(()=>({timezone:'Asia/Saigon',resetHour:5,day:key(),nextResetAt:new Date(nextResetAt()).toISOString()}))),"status")});

})),""))();


}
export {getKVPV_DAILY_CLOCK} from '../api.mjs';
export const api=Object.freeze({
  get KVPV_DAILY_CLOCK(){return globalThis.KVPV_DAILY_CLOCK;},
});