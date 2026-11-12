import {getKVPV_TQ_BASIC_PROFILE as __getKVPV0} from '../api.mjs';
export function call_KVPV_TQ_BASIC_PROFILE_create(...args){const target=globalThis["KVPV_TQ_BASIC_PROFILE"];const fn=globalThis["KVPV_TQ_BASIC_PROFILE"]?.["create"];if(typeof fn!=='function')throw Error("KVPV_TQ_BASIC_PROFILE.create is not available");return Reflect.apply(fn,target,args);}
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
let __esmLocal3;
let __esmLocal4;
let __esmLocal5;
let __esmLocal23;
let __esmLocal27;
let __esmLocal28;
let __esmLocal29;
let __esmLocal30;
let __esmLocal31;
let __esmLocal32;
export {__esmLocal0 as local_anonymous_1_1_0};
export {__esmLocal1 as local_create_1};
export {__esmLocal3 as local_active_3};
export {__esmLocal4 as local_learned_4};
export {__esmLocal5 as local_anonymous_7_33_5};
export {__esmLocal23 as local_report_23};
export {__esmLocal27 as local_allowsTuyetHoc_27};
export {__esmLocal28 as local_setTuyetHoc_28};
export {__esmLocal29 as local_wait_29};
export {__esmLocal30 as local_ids_30};
export {__esmLocal31 as local_configure_31};
export {__esmLocal32 as local_anonymous_37_208_32};
export function initialize(){
(__captureESMFunction((__esmLocal0=(() => {
  'use strict';
  window.KVPV_TQ_BASIC_PROFILE=Object.freeze({create(env){
__esmLocal1=__captureESMMethod(this,"create","init");

    const allIds=[8001,8002,8003,8004,8005];let ids=allIds.slice();
    let enabled=false,waitMs=10,tuyetHoc=false;
    const active=__captureESMFunction((__esmLocal3=(()=>enabled&&['THIEN_QUAN','LINH_LUNG','PHU_VAN'].includes(env.scope()))),"active");
    const learned=__captureESMFunction((__esmLocal4=(()=>ids.filter(__captureESMFunction((__esmLocal5=(id=>env.learned().includes(id))),"")))),"learned");
    function report(){return {enabled,active:active(),tuyetHocEnabled:tuyetHoc,tuyetHocActive:active()&&tuyetHoc,waitClientMs:waitMs,ids,learned:learned()};}
__esmLocal23=report;

    return Object.freeze({active,allowsTuyetHoc:__captureESMFunction((__esmLocal27=(()=>active()&&tuyetHoc)),"allowsTuyetHoc"),setTuyetHoc(value=true){
__esmLocal28=__captureESMMethod(this,"setTuyetHoc","init");
tuyetHoc=!!value;return report();},wait:__captureESMFunction((__esmLocal29=(()=>waitMs)),"wait"),ids:__captureESMFunction((__esmLocal30=(()=>ids.slice())),"ids"),report,
      configure(on=true,wait=0,skillIds=null){
__esmLocal31=__captureESMMethod(this,"configure","init");
if(!Number.isFinite(wait)||wait<0||wait>1000)throw Error('Wait must be 0..1000ms');if(skillIds!==null&&(!Array.isArray(skillIds)||!skillIds.length||skillIds.some(__captureESMFunction((__esmLocal32=(id=>!allIds.includes(Number(id)))),""))))throw Error('Basic profile requires native IDs 8001..8005');enabled=!!on;waitMs=wait;ids=skillIds===null?allIds.slice():[...new Set(skillIds.map(Number))];return report();}});
  }});
})),""))();

}
export {getKVPV_TQ_BASIC_PROFILE} from '../api.mjs';
export const api=Object.freeze({
  get KVPV_TQ_BASIC_PROFILE(){return globalThis.KVPV_TQ_BASIC_PROFILE;},
});