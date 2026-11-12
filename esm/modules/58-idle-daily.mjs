import {getKVPV_DAILY as __getKVPV0,getKVPV_IDLE_DAILY as __getKVPV1,getKVPV_V1 as __getKVPV2} from '../api.mjs';
export function call_KVPV_IDLE_DAILY_sync(...args){const target=globalThis["KVPV_IDLE_DAILY"];const fn=globalThis["KVPV_IDLE_DAILY"]?.["sync"];if(typeof fn!=='function')throw Error("KVPV_IDLE_DAILY.sync is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_IDLE_DAILY_stop(...args){const target=globalThis["KVPV_IDLE_DAILY"];const fn=globalThis["KVPV_IDLE_DAILY"]?.["stop"];if(typeof fn!=='function')throw Error("KVPV_IDLE_DAILY.stop is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_IDLE_DAILY_status(...args){const target=globalThis["KVPV_IDLE_DAILY"];const fn=globalThis["KVPV_IDLE_DAILY"]?.["status"];if(typeof fn!=='function')throw Error("KVPV_IDLE_DAILY.status is not available");return Reflect.apply(fn,target,args);}
function __captureESMFunction(fn,name){
  if(fn.name!==name)Object.defineProperty(fn,"name",{value:name,configurable:true});
  return fn;
}
let __esmLocal0;
let __esmLocal1;
let __esmLocal2;
let __esmLocal3;
export {__esmLocal0 as local_anonymous_3_1_0};
export {__esmLocal1 as local_stopWatcher_1};
export {__esmLocal2 as local_sync_2};
export {__esmLocal3 as local_status_3};
export function initialize(){
/* Daily scheduler is retired from the extension progression path.
 * Let the red-dot loop finish any already active job, then stop its legacy timer. */
(__captureESMFunction((__esmLocal0=(() => {
  'use strict';
  const W=window;
  __getKVPV1()?.stop?.();
  let timer=null,reason='red_dot_only';
  function stopWatcher(){
    if(timer!==null)(__getKVPV2()?.timers?.clearInterval??W.clearInterval)(timer);
    timer=null;
  }
__esmLocal1=stopWatcher;

  function sync(){
    try{
      const daily=__getKVPV0(),q=daily?.quickState?.();
      if(q&&!['rảnh','ranh'].includes(q.job)){reason='handoff_active_job';return;}
      daily?.stop?.();reason='daily_scheduler_stopped';stopWatcher();
    }catch(e){reason='shutdown_error:'+String(e?.message||e);}
  }
__esmLocal2=sync;

  W.KVPV_IDLE_DAILY=Object.freeze({sync,stop:stopWatcher,status:__captureESMFunction((__esmLocal3=(()=>({enabled:false,reason}))),"status")});
  sync();
  if(timer===null&&reason==='handoff_active_job')timer=(__getKVPV2()?.timers?.setInterval??W.setInterval)(sync,500);
})),""))();

}
export {getKVPV_IDLE_DAILY} from '../api.mjs';
export const api=Object.freeze({
  get KVPV_IDLE_DAILY(){return globalThis.KVPV_IDLE_DAILY;},
});