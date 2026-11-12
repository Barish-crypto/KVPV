import {getKVPV_DAILY as __getKVPV0,getKVPV_HONG_MAP_READY as __getKVPV1,getKVPV_V1 as __getKVPV2} from '../api.mjs';
export function call_KVPV_HONG_MAP_READY_start(...args){const target=globalThis["KVPV_HONG_MAP_READY"];const fn=globalThis["KVPV_HONG_MAP_READY"]?.["start"];if(typeof fn!=='function')throw Error("KVPV_HONG_MAP_READY.start is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_HONG_MAP_READY_stop(...args){const target=globalThis["KVPV_HONG_MAP_READY"];const fn=globalThis["KVPV_HONG_MAP_READY"]?.["stop"];if(typeof fn!=='function')throw Error("KVPV_HONG_MAP_READY.stop is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_HONG_MAP_READY_sync(...args){const target=globalThis["KVPV_HONG_MAP_READY"];const fn=globalThis["KVPV_HONG_MAP_READY"]?.["sync"];if(typeof fn!=='function')throw Error("KVPV_HONG_MAP_READY.sync is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_HONG_MAP_READY_status(...args){const target=globalThis["KVPV_HONG_MAP_READY"];const fn=globalThis["KVPV_HONG_MAP_READY"]?.["status"];if(typeof fn!=='function')throw Error("KVPV_HONG_MAP_READY.status is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_HONG_MAP_READY__handoff(...args){const target=globalThis["KVPV_HONG_MAP_READY"];const fn=globalThis["KVPV_HONG_MAP_READY"]?.["_handoff"];if(typeof fn!=='function')throw Error("KVPV_HONG_MAP_READY._handoff is not available");return Reflect.apply(fn,target,args);}
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
export {__esmLocal0 as local_anonymous_3_1_0};
export {__esmLocal1 as local_owned_1};
export {__esmLocal2 as local_tick_2};
export {__esmLocal3 as local_anonymous_19_58_3};
export {__esmLocal4 as local_anonymous_19_118_4};
export {__esmLocal5 as local_status_5};
export {__esmLocal6 as local_stop_6};
export {__esmLocal7 as local_start_7};
export {__esmLocal8 as local__handoff_8};
export function initialize(){
/* Hong Hoang: keep the Daily native map resolver supplied with verified scene data.
 * No RPC, combat, rewards or scene transitions are sent here. */
(__captureESMFunction((__esmLocal0=(()=>{'use strict';
const W=window,actor=String(W.__KVPV_OWN_ACTOR_ID||''),old=__getKVPV1(),carry=old?._handoff?.();
old?.stop?.();
const S={timer:null,enabled:true,resolved:0,reason:'waiting',checks:0};
const owned=__captureESMFunction((__esmLocal1=(()=>actor&&String(W._Ba?._rJ?._O$?.ins?.actorId??'')===actor&&!W.__KVPV_UNIVERSAL_HALTED)),"owned");
function tick(){
 if(!owned())return;
 S.checks++;
 const c=__getKVPV0()?.config,scene=W._ft?._po?.ins;
 if(!c||c.enableHongHoang!==true||!scene){S.reason='waiting_daily_scene';return;}
 const preset=Number(c.hongHoangMap);
 if(preset>0){S.reason='existing_manual_map';return;}
 const table=scene._gh;
 if(!table||typeof table!=='object'){
   S.reason='native_scene_cfg_unavailable';return;
 }
 const candidates=[...new Set(Object.values(table).filter(__captureESMFunction((__esmLocal3=(r=>Array.isArray(r)&&Number(r[7])===17&&Number(r[0])>0)),"")).map(__captureESMFunction((__esmLocal4=(r=>Number(r[0]))),"")))];
 if(candidates.length!==1){S.reason='ambiguous_native_maps_'+candidates.length;return;}
 const id=candidates[0];
 if(scene.getCfgById?.(id)?.[7]!==17){S.reason='map_cfg_not_confirmed';return;}
 c.hongHoangMap=id;
 S.resolved=id;S.reason='native_unique_map_ready';
}
__esmLocal2=tick;

function status(){return {enabled:S.enabled,reason:S.reason,map:S.resolved,checks:S.checks,configuredMap:Number(__getKVPV0()?.config?.hongHoangMap??0)};}
__esmLocal5=status;

function stop(){S.enabled=false;if(S.timer!=null)(__getKVPV2()?.timers?.clearInterval??W.clearInterval)?.(S.timer);S.timer=null;}
__esmLocal6=stop;

function start(){S.enabled=true;if(S.timer==null)S.timer=(__getKVPV2()?.timers?.setInterval??W.setInterval)?.(tick,3000);tick();return status();}
__esmLocal7=start;

W.KVPV_HONG_MAP_READY=Object.freeze({start,stop,sync:tick,status,_handoff:__captureESMFunction((__esmLocal8=(()=>({actor}))),"_handoff")});
if(owned())start();
})),""))();

}
export {getKVPV_HONG_MAP_READY} from '../api.mjs';
export const api=Object.freeze({
  get KVPV_HONG_MAP_READY(){return globalThis.KVPV_HONG_MAP_READY;},
});