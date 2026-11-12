import {getKVPV_CUU_TIEU_LENH as __getKVPV0,getKVPV_ENTRY_POLICY as __getKVPV1,getKVPV_EVENT_PRIORITY as __getKVPV2,getKVPV_V1 as __getKVPV3} from '../api.mjs';
export function call_KVPV_CUU_TIEU_LENH_start(...args){const target=globalThis["KVPV_CUU_TIEU_LENH"];const fn=globalThis["KVPV_CUU_TIEU_LENH"]?.["start"];if(typeof fn!=='function')throw Error("KVPV_CUU_TIEU_LENH.start is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_CUU_TIEU_LENH_stop(...args){const target=globalThis["KVPV_CUU_TIEU_LENH"];const fn=globalThis["KVPV_CUU_TIEU_LENH"]?.["stop"];if(typeof fn!=='function')throw Error("KVPV_CUU_TIEU_LENH.stop is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_CUU_TIEU_LENH_tick(...args){const target=globalThis["KVPV_CUU_TIEU_LENH"];const fn=globalThis["KVPV_CUU_TIEU_LENH"]?.["tick"];if(typeof fn!=='function')throw Error("KVPV_CUU_TIEU_LENH.tick is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_CUU_TIEU_LENH_status(...args){const target=globalThis["KVPV_CUU_TIEU_LENH"];const fn=globalThis["KVPV_CUU_TIEU_LENH"]?.["status"];if(typeof fn!=='function')throw Error("KVPV_CUU_TIEU_LENH.status is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_CUU_TIEU_LENH_registerNativeAdapter(...args){const target=globalThis["KVPV_CUU_TIEU_LENH"];const fn=globalThis["KVPV_CUU_TIEU_LENH"]?.["registerNativeAdapter"];if(typeof fn!=='function')throw Error("KVPV_CUU_TIEU_LENH.registerNativeAdapter is not available");return Reflect.apply(fn,target,args);}
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
export {__esmLocal0 as local_anonymous_4_1_0};
export {__esmLocal1 as local_normalize_1};
export {__esmLocal2 as local_own_2};
export {__esmLocal3 as local_status_3};
export {__esmLocal4 as local_registerNativeAdapter_4};
export {__esmLocal5 as local_tick_5};
export {__esmLocal6 as local_stop_6};
export {__esmLocal7 as local_start_7};
export function initialize(){



(__captureESMFunction((__esmLocal0=(() => {
 'use strict';
 const W=window, old=__getKVPV0();
 old?.stop?.();
 const actor=String(W.__KVPV_OWN_ACTOR_ID??'');
 const S={enabled:true,timer:null,reason:'waiting_verified_native_adapter',attempts:0,lastError:'',lastKey:'',lastAt:0,adapter:null};
 const normalize=__captureESMFunction((__esmLocal1=(x=>String(x??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/gi,'d').toLowerCase().replace(/\s+/g,' ').trim())),"normalize");
 const own=__captureESMFunction((__esmLocal2=(()=>actor&&String(W._Ba?._rJ?._O$?.ins?.actorId??'')===actor&&W.__KVPV_UNIVERSAL_HALTED!==true&&W.document?.hidden!==true)),"own");
 function status(){return {enabled:S.enabled,reason:S.reason,attempts:S.attempts,lastError:S.lastError,adapterReady:!!S.adapter,lastKey:S.lastKey,allowKNB:false};}
__esmLocal3=status;

 function registerNativeAdapter(adapter){
   // Explicitly registered, previously verified adapter. No undocumented client calls.
   if(!adapter||typeof adapter.inspect!=='function'||typeof adapter.accept!=='function')throw Error('Verified inspect and accept callbacks required');
   S.adapter=adapter;S.reason='adapter_registered';return status();
 }
__esmLocal4=registerNativeAdapter;

 function tick(){
   if(!S.enabled||!own()){S.reason='waiting_own_visible_actor';return;}
   if(__getKVPV2()?.hold?.()||__getKVPV1()?.manual===true){S.reason='yield_to_priority';return;}
   if(!S.adapter){S.reason='waiting_verified_native_adapter';return;}
   try{
     const info=S.adapter.inspect();
     if(!info||normalize(info.title)!=='cuu tieu lenh'||info.action!=='accept_quest'){
       S.reason='waiting_cuu_tieu_lenh_accept';return;
     }
     if(info.visible!==true||info.enabled!==true||info.free!==true||info.costVerified!==true||typeof info.key!=='string'||!info.key){
       S.reason='unverified_or_paid_action';return;
     }
     if(S.lastKey===info.key){S.reason='already_requested_awaiting_confirmation';return;}
     if(Date.now()-S.lastAt<1500){S.reason='request_rate_limited';return;}
     // Mark before action to prevent repeat after synchronous errors.
     S.lastKey=info.key;S.lastAt=Date.now();S.attempts++;
     S.adapter.accept(info.key);
     S.reason='accept_requested_awaiting_native_confirmation';
   }catch(e){S.lastError=String(e?.message??e);S.reason='adapter_error_no_retry';}
 }
__esmLocal5=tick;

 function stop(){S.enabled=false;if(S.timer!==null)(__getKVPV3()?.timers?.clearInterval??W.clearInterval)?.(S.timer);S.timer=null;}
__esmLocal6=stop;

 function start(){S.enabled=true;if(S.timer!==null)return status();const owner=__getKVPV3()?.timers?.setInterval?__getKVPV3().timers:W;const set=owner?.setInterval;if(typeof W.setInterval==='function'&&typeof set==='function')S.timer=set.call(owner,tick,500);else S.reason='waiting_timer_api';return status();}
__esmLocal7=start;

 W.KVPV_CUU_TIEU_LENH=Object.freeze({start,stop,tick,status,registerNativeAdapter});
 start();
})),""))();

}
export {getKVPV_CUU_TIEU_LENH} from '../api.mjs';
export const api=Object.freeze({
  get KVPV_CUU_TIEU_LENH(){return globalThis.KVPV_CUU_TIEU_LENH;},
});