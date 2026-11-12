import {getKVPV_ADVENTURE as __getKVPV0} from '../api.mjs';
export function call_KVPV_ADVENTURE_sync(...args){const target=globalThis["KVPV_ADVENTURE"];const fn=globalThis["KVPV_ADVENTURE"]?.["sync"];if(typeof fn!=='function')throw Error("KVPV_ADVENTURE.sync is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_ADVENTURE_stop(...args){const target=globalThis["KVPV_ADVENTURE"];const fn=globalThis["KVPV_ADVENTURE"]?.["stop"];if(typeof fn!=='function')throw Error("KVPV_ADVENTURE.stop is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_ADVENTURE_status(...args){const target=globalThis["KVPV_ADVENTURE"];const fn=globalThis["KVPV_ADVENTURE"]?.["status"];if(typeof fn!=='function')throw Error("KVPV_ADVENTURE.status is not available");return Reflect.apply(fn,target,args);}
function __captureESMFunction(fn,name){
  if(fn.name!==name)Object.defineProperty(fn,"name",{value:name,configurable:true});
  return fn;
}
function __captureESMMethod(receiver,key,kind){
  let owner=receiver;
  while(owner!==null&&(typeof owner==="object"||typeof owner==="function")&&!Object.prototype.hasOwnProperty.call(owner,key))owner=Object.getPrototypeOf(owner);
  if(owner===null)return undefined;
  const descriptor=Object.getOwnPropertyDescriptor(owner,key);
  return kind==="get"?descriptor.get:kind==="set"?descriptor.set:descriptor.value;
}
let __esmLocal0;
let __esmLocal1;
let __esmLocal2;
let __esmLocal3;
export {__esmLocal0 as local_anonymous_1_1_0};
export {__esmLocal1 as local_sync_1};
export {__esmLocal2 as local_stop_2};
export {__esmLocal3 as local_status_3};
export function initialize(){
(__captureESMFunction((__esmLocal0=(() => {
  'use strict';
  const W = window;
  if (__getKVPV0()) return;
  W.KVPV_ADVENTURE = Object.freeze({
    sync() {
__esmLocal1=__captureESMMethod(this,"sync","init");
},
    stop() {
__esmLocal2=__captureESMMethod(this,"stop","init");
},
    status: __captureESMFunction((__esmLocal3=(() => ({ enabled: false, reason: 'red_dot_module_unavailable', allowKNB: false }))),"status")
  });
})),""))();

}
export {getKVPV_ADVENTURE} from '../api.mjs';
export const api=Object.freeze({
  get KVPV_ADVENTURE(){return globalThis.KVPV_ADVENTURE;},
});