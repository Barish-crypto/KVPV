import {getKVPV_DAILY as __getKVPV0,getKVPV_DIET_THO_HAO_AUTO as __getKVPV1,getKVPV_ENTRY_POLICY as __getKVPV2,getKVPV_V1 as __getKVPV3} from '../api.mjs';
export function call_KVPV_DIET_THO_HAO_AUTO_start(...args){const target=globalThis["KVPV_DIET_THO_HAO_AUTO"];const fn=globalThis["KVPV_DIET_THO_HAO_AUTO"]?.["start"];if(typeof fn!=='function')throw Error("KVPV_DIET_THO_HAO_AUTO.start is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_DIET_THO_HAO_AUTO_stop(...args){const target=globalThis["KVPV_DIET_THO_HAO_AUTO"];const fn=globalThis["KVPV_DIET_THO_HAO_AUTO"]?.["stop"];if(typeof fn!=='function')throw Error("KVPV_DIET_THO_HAO_AUTO.stop is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_DIET_THO_HAO_AUTO_sync(...args){const target=globalThis["KVPV_DIET_THO_HAO_AUTO"];const fn=globalThis["KVPV_DIET_THO_HAO_AUTO"]?.["sync"];if(typeof fn!=='function')throw Error("KVPV_DIET_THO_HAO_AUTO.sync is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_DIET_THO_HAO_AUTO_status(...args){const target=globalThis["KVPV_DIET_THO_HAO_AUTO"];const fn=globalThis["KVPV_DIET_THO_HAO_AUTO"]?.["status"];if(typeof fn!=='function')throw Error("KVPV_DIET_THO_HAO_AUTO.status is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_DIET_THO_HAO_AUTO__handoff(...args){const target=globalThis["KVPV_DIET_THO_HAO_AUTO"];const fn=globalThis["KVPV_DIET_THO_HAO_AUTO"]?.["_handoff"];if(typeof fn!=='function')throw Error("KVPV_DIET_THO_HAO_AUTO._handoff is not available");return Reflect.apply(fn,target,args);}
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
export {__esmLocal0 as local_anonymous_2_1_0};
export {__esmLocal1 as local_owned_1};
export {__esmLocal2 as local_map_2};
export {__esmLocal3 as local_calendar_3};
export {__esmLocal4 as local_tick_4};
export {__esmLocal5 as local_anonymous_10_227_5};
export {__esmLocal6 as local_anonymous_16_39_6};
export {__esmLocal7 as local_stop_7};
export {__esmLocal8 as local_start_8};
export {__esmLocal9 as local_status_9};
export {__esmLocal10 as local__handoff_10};
export function initialize(){
 
(__captureESMFunction((__esmLocal0=(()=>{'use strict';
const W=window, actor=String(W.__KVPV_OWN_ACTOR_ID||''),old=__getKVPV1(),carry=old?._handoff?.();
old?.stop?.();const S={enabled:carry?.actor===actor?carry.enabled!==false:true,timer:null,key:carry?.actor===actor?carry.key:'',attempts:carry?.actor===actor?carry.attempts:0,reason:'waiting',error:''};
const owned=__captureESMFunction((__esmLocal1=(()=>!!actor&&String(W._Ba?._rJ?._O$?.ins?.actorId??'')===actor&&!W.__KVPV_UNIVERSAL_HALTED)),"owned");
const map=__captureESMFunction((__esmLocal2=(()=>Number(W._C?._Mn?._Cn?.currentID??W._Ba?._$a?._yo?.ins?.intoSce?.[0]))),"map");
const calendar=__captureESMFunction((__esmLocal3=(()=>__getKVPV0()?.lichData?.())),"calendar");
function tick(){if(!S.enabled||!owned())return;
 try{
  const now=new Date(),parts=Object.fromEntries(new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Ho_Chi_Minh',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(now).map(__captureESMFunction((__esmLocal5=(p=>[p.type,p.value])),"")));
  const day=Date.UTC(+parts.year,+parts.month-1,+parts.day),weekday=new Date(day).getUTCDay(),minute=+parts.hour*60+ +parts.minute;
  if(![2,4,6].includes(weekday)||minute<1200||minute>=1230){S.reason='outside_window';return;}
  const key=parts.year+'-'+parts.month+'-'+parts.day;
  if(map()===2411||map()===2412){S.reason='inside_event';return;}
  if(S.key===key){S.reason='entry_requested_once';return;}
  const event=calendar()?.active?.find(__captureESMFunction((__esmLocal6=(e=>e?.key==='diet_tho_hao')),""));
  if(!event){S.reason='waiting_event_calendar';return;}
  const state=Number(W._Ba?._$d?._oet?.ins?.state);
  if(state!==1){S.reason='waiting_native_open_state';return;}
  if(__getKVPV2()?.manual===true||W._Ba?._rJ?._O$?.ins?.isDead===true||W.document?.hidden===true||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)){S.reason='paused';return;}
  if(W._Ba?._$a?.SceneUtil?.isCommonScene!==true){S.reason='waiting_stage_yield';return;}
  const raw=W._Ba?._sst?._ist?.inst?.getCpSceneStateByType?.(64);
  if(!Array.isArray(raw)||!Number.isFinite(Number(raw[2]))){S.reason='waiting_native_scene_state';return;}
  const scene=Number(raw[2])===2?2412:2411;
  const rpc=W._Ba?._sst?._Cht?.inst;
  if(typeof rpc?.rqEtScene!=='function'){S.reason='native_entry_missing';return;}
  S.key=key;S.attempts++;S.reason='native_entry_requested';
  rpc.rqEtScene(scene,1);
 }catch(e){S.error=String(e?.message||e);S.reason='uncertain_no_retry';}
}
__esmLocal4=tick;

function stop(){S.enabled=false;if(S.timer!==null)(__getKVPV3()?.timers?.clearInterval??W.clearInterval)?.(S.timer);S.timer=null;}
__esmLocal7=stop;

function start(){S.enabled=true;if(S.timer===null)S.timer=(__getKVPV3()?.timers?.setInterval??W.setInterval)?.(tick,1000);tick();return status();}
__esmLocal8=start;

function status(){return {enabled:S.enabled,reason:S.reason,attempts:S.attempts,pendingEventDay:S.key,inside:[2411,2412].includes(map()),error:S.error};}
__esmLocal9=status;

W.KVPV_DIET_THO_HAO_AUTO=Object.freeze({start,stop,sync:tick,status,_handoff:__captureESMFunction((__esmLocal10=(()=>({actor,enabled:S.enabled,key:S.key,attempts:S.attempts}))),"_handoff")});
if(owned()&&S.enabled)start();
})),""))();

}
export {getKVPV_DIET_THO_HAO_AUTO} from '../api.mjs';
export const api=Object.freeze({
  get KVPV_DIET_THO_HAO_AUTO(){return globalThis.KVPV_DIET_THO_HAO_AUTO;},
});