import {getKVPV_FAR_SCOPE as __getKVPV0,getKVPV_LINHLUNG922 as __getKVPV1,getKVPV_LINHLUNG_TH as __getKVPV2,getKVPV_MODE as __getKVPV3,getKVPV_TH300 as __getKVPV4} from '../api.mjs';
export function call_KVPV_LINHLUNG_TH_start(...args){const target=globalThis["KVPV_LINHLUNG_TH"];const fn=globalThis["KVPV_LINHLUNG_TH"]?.["start"];if(typeof fn!=='function')throw Error("KVPV_LINHLUNG_TH.start is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_LINHLUNG_TH_stop(...args){const target=globalThis["KVPV_LINHLUNG_TH"];const fn=globalThis["KVPV_LINHLUNG_TH"]?.["stop"];if(typeof fn!=='function')throw Error("KVPV_LINHLUNG_TH.stop is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_LINHLUNG_TH_status(...args){const target=globalThis["KVPV_LINHLUNG_TH"];const fn=globalThis["KVPV_LINHLUNG_TH"]?.["status"];if(typeof fn!=='function')throw Error("KVPV_LINHLUNG_TH.status is not available");return Reflect.apply(fn,target,args);}
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
let __esmLocal4;
let __esmLocal5;
export {__esmLocal0 as local_anonymous_6_1_0};
export {__esmLocal1 as local_get_enabled_1};
export {__esmLocal2 as local_start_2};
export {__esmLocal3 as local_stop_3};
export {__esmLocal4 as local_status_4};
export {__esmLocal5 as local_anonymous_32_1_5};
export function initialize(){





(__captureESMFunction((__esmLocal0=(() => {

  const W=window;let enabled=__getKVPV2()?.enabled!==false;

  W.KVPV_LINHLUNG_TH=Object.freeze({

    get enabled(){
__esmLocal1=__captureESMMethod(this,"enabled","get");
return enabled;},

    start(options={}){
__esmLocal2=__captureESMMethod(this,"start","init");
const tower=__getKVPV1();

      if(!tower?.start)throw Error('Thiếu bộ vượt Linh Lung Tháp');

      enabled=true;__getKVPV3().armTianQuan();return tower.start(options);},

    stop(){
__esmLocal3=__captureESMMethod(this,"stop","init");
enabled=false;const result=__getKVPV1()?.stop?.('Dừng vượt Linh Lung Tuyệt Học');__getKVPV3()?.syncMap?.();return result;},

    status(){
__esmLocal4=__captureESMMethod(this,"status","init");
return {enabled,scope:__getKVPV0()?.status?.(),tower:__getKVPV1()?.status?.(false),

      combat:__getKVPV4()?.status?.(false),recovery:{enabled:true,leavePct:35,returnPct:100,finishBossHpPct:2}};}

  });

})),""))();



(__captureESMFunction((__esmLocal5=(() => {
  const W = window;
  if (__getKVPV4()) {
        
        __getKVPV4().setBasicOnly?.(false);
        __getKVPV4().setTianQuanMpackExtras?.(true);
        __getKVPV4().setTianQuanTuyetHoc?.(true);
        // Client-only basic animation speed; server cooldown and damage are unchanged.
        __getKVPV4().setBasicAnimationSpeed?.(99);
        __getKVPV4().setScanInterval?.(1);
        
        __getKVPV4().setInterleaved?.(true, 310);
        __getKVPV4().setSkillPriority?.('interleaved');
  }
})),""))();

}
export {getKVPV_LINHLUNG_TH} from '../api.mjs';
export const api=Object.freeze({
  get KVPV_LINHLUNG_TH(){return globalThis.KVPV_LINHLUNG_TH;},
});