import {getKVPV_CRYSTAL_CAPTURE as __getKVPV0,getKVPV_V1 as __getKVPV1} from '../api.mjs';
export function call_KVPV_CRYSTAL_CAPTURE_status(...args){const target=globalThis["KVPV_CRYSTAL_CAPTURE"];const fn=globalThis["KVPV_CRYSTAL_CAPTURE"]?.["status"];if(typeof fn!=='function')throw Error("KVPV_CRYSTAL_CAPTURE.status is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_CRYSTAL_CAPTURE_stop(...args){const target=globalThis["KVPV_CRYSTAL_CAPTURE"];const fn=globalThis["KVPV_CRYSTAL_CAPTURE"]?.["stop"];if(typeof fn!=='function')throw Error("KVPV_CRYSTAL_CAPTURE.stop is not available");return Reflect.apply(fn,target,args);}
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
let __esmLocal8;
let __esmLocal9;
let __esmLocal10;
let __esmLocal11;
let __esmLocal12;
let __esmLocal13;
let __esmLocal14;
let __esmLocal15;
export {__esmLocal0 as local_anonymous_4_1_0};
export {__esmLocal1 as local_copy_1};
export {__esmLocal2 as local_anonymous_14_60_2};
export {__esmLocal3 as local_owned_3};
export {__esmLocal4 as local_stop_4};
export {__esmLocal5 as local_attach_5};
export {__esmLocal6 as local_filter_6};
export {__esmLocal7 as local_anonymous_22_22_7};
export {__esmLocal8 as local_fn_8};
export {__esmLocal9 as local_anonymous_32_139_9};
export {__esmLocal10 as local_sync_10};
export {__esmLocal11 as local_anonymous_50_128_11};
export {__esmLocal12 as local_status_12};
export {__esmLocal13 as local_anonymous_62_97_13};
export {__esmLocal14 as local_anonymous_66_53_14};
export {__esmLocal15 as local_anonymous_66_87_15};
export function initialize(){

/* Temporary native-call observation for the user's main account. No sender/replay. */

(__captureESMFunction((__esmLocal0=(() => {

 'use strict';const W=window,actor=String(W.__KVPV_OWN_ACTOR_ID||'');

 __getKVPV0()?.stop?.();if(actor!=='10228867268946')return;

 const key='__KVPV_CRYSTAL_CAPTURE_20261024_SESSION2',S=W[key]??(W[key]={until:Date.now()+900000,records:[],errors:[]});

 const hooks=[];let timer=null;

 const copy=__captureESMFunction((__esmLocal1=((v,d=0)=>Array.isArray(v)?d<5?v.slice(0,24).map(__captureESMFunction((__esmLocal2=(x=>copy(x,d+1))),"")):null:typeof v==='number'||typeof v==='boolean'?v:typeof v==='string'?v.slice(0,200):null)),"copy");

 const owned=__captureESMFunction((__esmLocal3=(()=>String(W._Ba?._rJ?._O$?.ins?.actorId)===actor&&!W.__KVPV_UNIVERSAL_HALTED)),"owned");

 function stop(){if(timer!==null)(__getKVPV1()?.timers?.clearInterval??W.clearInterval)(timer);timer=null;for(const h of hooks.splice(0))if(h.obj[h.name]===h.fn){if(h.descriptor)Object.defineProperty(h.obj,h.name,h.descriptor);else delete h.obj[h.name];}}
__esmLocal4=stop;


 function attach(obj,name,direction,filter=__captureESMFunction((__esmLocal6=(()=>true)),"filter")){

  if(!obj||hooks.some(__captureESMFunction((__esmLocal7=(h=>h.obj===obj&&h.name===name)),"")))return;

  const native=Object.getPrototypeOf(obj)?.[name];if(typeof native!=='function'||obj[name]!==native)return;

  const descriptor=Object.getOwnPropertyDescriptor(obj,name);

  const fn=__captureESMFunction((__esmLocal8=(function(...args){

   if(owned()&&Date.now()<S.until&&filter(args)){

    try{S.records.push({at:Date.now(),direction,method:name,args:copy(args)});if(S.records.length>48){const expendable=S.records.findIndex(__captureESMFunction((__esmLocal9=(r=>r.method==='setSceneInfo')),""));S.records.splice(expendable>=0?expendable:0,1);}}catch(e){S.errors.push(String(e));}

   }

   return native.apply(this,args);

  })),"fn");

  Object.defineProperty(obj,name,{value:fn,writable:true,configurable:true});hooks.push({obj,name,fn,descriptor});

 }
__esmLocal5=attach;


 function sync(){if(!owned()||Date.now()>=S.until){stop();return;}

  try{

   const room=W._Ba?._cm?._u3t?.ins,trigram=W._Ba?._n4t?._oun?.ins,model=W._Ba?._n4t?._t4t?.ins;

   for(const name of ['creSerAreRoom','startTeamBossCopy','agrInviUSARoom','joinSerAreRoom'])attach(room,name,'outgoing_native',__captureESMFunction((__esmLocal11=(args=>Number(args[0]?.[0])===6)),""));

   for(const name of ['TrigramCopySetAreaId','TrigramCopyCreateTowner','_run','setTrigramCopyAutoTower'])attach(trigram,name,'outgoing_native');

   for(const name of ['setTrigramCopyInfo','setSceneInfo'])attach(model,name,'incoming_model');

  }catch(e){if(S.errors.length<8)S.errors.push(String(e));}

 }
__esmLocal10=sync;


 function status(){sync();const m=W._Ba?._n4t?._t4t?.ins,cfg=W._ft?._Esi?.ins;

  return {actor,active:Date.now()<S.until&&owned()&&hooks.length>0,until:S.until,hooks:hooks.map(__captureESMFunction((__esmLocal13=(h=>h.name)),"")),

   map:W._Ba?._$a?._yo?.ins?.intoSce?.[0],remainTimes:m?.remainTimes,curType:m?.curType,curWave:m?.curWare,

   types:Object.values(cfg?._Osh??{}).slice(0,8).map(__captureESMFunction((__esmLocal14=(r=>copy(r))),"")),records:S.records.map(__captureESMFunction((__esmLocal15=(r=>({...r,args:copy(r.args)}))),"")),errors:S.errors.slice(),

   note:'Decoded native method arguments/model updates; not raw network packets. No requests sent by capture.'};

 }
__esmLocal12=status;


 W.KVPV_CRYSTAL_CAPTURE=Object.freeze({status,stop});sync();

 if(owned()&&Date.now()<S.until)timer=(__getKVPV1()?.timers?.setInterval??W.setInterval)(sync,1000);

})),""))();


}
export {getKVPV_CRYSTAL_CAPTURE} from '../api.mjs';
export const api=Object.freeze({
  get KVPV_CRYSTAL_CAPTURE(){return globalThis.KVPV_CRYSTAL_CAPTURE;},
});