import {getKVPV_DAILY as __getKVPV0,getKVPV_FOUR_WORSHIP as __getKVPV1,getKVPV_V1 as __getKVPV2} from '../api.mjs';
export function call_KVPV_FOUR_WORSHIP_sync(...args){const target=globalThis["KVPV_FOUR_WORSHIP"];const fn=globalThis["KVPV_FOUR_WORSHIP"]?.["sync"];if(typeof fn!=='function')throw Error("KVPV_FOUR_WORSHIP.sync is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_FOUR_WORSHIP_stop(...args){const target=globalThis["KVPV_FOUR_WORSHIP"];const fn=globalThis["KVPV_FOUR_WORSHIP"]?.["stop"];if(typeof fn!=='function')throw Error("KVPV_FOUR_WORSHIP.stop is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_FOUR_WORSHIP_status(...args){const target=globalThis["KVPV_FOUR_WORSHIP"];const fn=globalThis["KVPV_FOUR_WORSHIP"]?.["status"];if(typeof fn!=='function')throw Error("KVPV_FOUR_WORSHIP.status is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_FOUR_WORSHIP__handoff(...args){const target=globalThis["KVPV_FOUR_WORSHIP"];const fn=globalThis["KVPV_FOUR_WORSHIP"]?.["_handoff"];if(typeof fn!=='function')throw Error("KVPV_FOUR_WORSHIP._handoff is not available");return Reflect.apply(fn,target,args);}
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
export {__esmLocal0 as local_anonymous_4_1_0};
export {__esmLocal1 as local_m_1};
export {__esmLocal2 as local_r_2};
export {__esmLocal3 as local_own_3};
export {__esmLocal4 as local_day_4};
export {__esmLocal5 as local_tick_5};
export {__esmLocal6 as local_stop_6};
export {__esmLocal7 as local_status_7};
export {__esmLocal8 as local__handoff_8};
export function initialize(){

 

(__captureESMFunction((__esmLocal0=(() => {

'use strict';const W=window,old=__getKVPV1(),c=old?._handoff?.();old?.stop?.();const actor=String(W.__KVPV_OWN_ACTOR_ID||''),same=c?.actor===actor;

const S={timer:null,pending:same?c.pending:null,sent:new Set(same?c.sent:[]),queried:false,last:-Infinity,requests:same?c.requests:0,confirmed:same?c.confirmed:0,reason:'waiting',error:''};

const m=__captureESMFunction((__esmLocal1=(()=>W._Ba?._Dd?._Kpt?.inst)),"m"),r=__captureESMFunction((__esmLocal2=(()=>W._Ba?._Dd?._C3n?.ins)),"r");

const own=__captureESMFunction((__esmLocal3=(()=>actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED)),"own");

const day=__captureESMFunction((__esmLocal4=(()=>new Date(Date.now()+7*3600000).toISOString().slice(0,10))),"day");

function tick(){try{

if(!own()||!m()||!r())return;const count=Number(m().getThumbsCount?.());

if(S.pending){if(Number.isInteger(count)&&count<S.pending.count){S.pending=null;S.confirmed++;}else{S.reason='waiting_count_ack_no_retry';return;}}

if(__getKVPV0()?.quickState?.()?.running!==true||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)){S.reason='yield_user_or_disabled_daily';return;}if(Date.now()-S.last<2000)return;

if(!S.queried){S.queried=true;S.last=Date.now();r().ReqFightFourLeaderActorInfo?.();S.reason='querying_native_worship_state';return;}

const key=day()+'/'+count;if(!Number.isInteger(count)||count<=0||m().canThumbsUp?.()!==true||W._Ba?._Do?._Ho?.inst?.getFcIsOpen?.(1101)!==true||S.sent.has(key)||typeof r().ReqThumbsUpFighFourBest!=='function'){S.reason='no_free_worship_remaining';return;}

S.sent.add(key);S.pending={count,at:Date.now()};S.last=Date.now();S.requests++;r().ReqThumbsUpFighFourBest();S.reason='free_worship_requested';

}catch(e){S.error=String(e.message||e);S.reason='error_no_retry';}}
__esmLocal5=tick;


function stop(){if(S.timer!==null)(__getKVPV2()?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;}
__esmLocal6=stop;


W.KVPV_FOUR_WORSHIP=Object.freeze({sync:tick,stop,status:__captureESMFunction((__esmLocal7=(()=>({enabled:true,reason:S.reason,lastError:S.error,remaining:m()?.getThumbsCount?.()??null,requests:S.requests,confirmed:S.confirmed,pending:S.pending,allowKNB:false}))),"status"),_handoff:__captureESMFunction((__esmLocal8=(()=>({actor,pending:S.pending,sent:[...S.sent].slice(-100),requests:S.requests,confirmed:S.confirmed}))),"_handoff")});

S.timer=(__getKVPV2()?.timers?.setInterval??W.setInterval)(tick,2000);tick();

})),""))();


}
export {getKVPV_FOUR_WORSHIP} from '../api.mjs';
export const api=Object.freeze({
  get KVPV_FOUR_WORSHIP(){return globalThis.KVPV_FOUR_WORSHIP;},
});