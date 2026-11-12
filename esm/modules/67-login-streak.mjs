import {getKVPV_DAILY as __getKVPV0,getKVPV_LOGIN_STREAK as __getKVPV1,getKVPV_V1 as __getKVPV2} from '../api.mjs';
export function call_KVPV_LOGIN_STREAK_sync(...args){const target=globalThis["KVPV_LOGIN_STREAK"];const fn=globalThis["KVPV_LOGIN_STREAK"]?.["sync"];if(typeof fn!=='function')throw Error("KVPV_LOGIN_STREAK.sync is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_LOGIN_STREAK_stop(...args){const target=globalThis["KVPV_LOGIN_STREAK"];const fn=globalThis["KVPV_LOGIN_STREAK"]?.["stop"];if(typeof fn!=='function')throw Error("KVPV_LOGIN_STREAK.stop is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_LOGIN_STREAK_status(...args){const target=globalThis["KVPV_LOGIN_STREAK"];const fn=globalThis["KVPV_LOGIN_STREAK"]?.["status"];if(typeof fn!=='function')throw Error("KVPV_LOGIN_STREAK.status is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_LOGIN_STREAK__handoff(...args){const target=globalThis["KVPV_LOGIN_STREAK"];const fn=globalThis["KVPV_LOGIN_STREAK"]?.["_handoff"];if(typeof fn!=='function')throw Error("KVPV_LOGIN_STREAK._handoff is not available");return Reflect.apply(fn,target,args);}
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
export {__esmLocal0 as local_anonymous_4_1_0};
export {__esmLocal1 as local_ns_1};
export {__esmLocal2 as local_m_2};
export {__esmLocal3 as local_r_3};
export {__esmLocal4 as local_own_4};
export {__esmLocal5 as local_tick_5};
export {__esmLocal6 as local_anonymous_26_89_6};
export {__esmLocal7 as local_stop_7};
export {__esmLocal8 as local_status_8};
export {__esmLocal9 as local__handoff_9};
export function initialize(){

/* Free consecutive-login reward milestones: native ready state -> single claim -> state2 ACK. */

(__captureESMFunction((__esmLocal0=(() => {

'use strict';const W=window,old=__getKVPV1(),c=old?._handoff?.();old?.stop?.();const actor=String(W.__KVPV_OWN_ACTOR_ID||''),same=c?.actor===actor;

const S={timer:null,pending:new Map(same?c.pending:[]),sent:new Set(same?c.sent:[]),confirmed:same?c.confirmed:0,requests:same?c.requests:0,queried:false,last:-Infinity,reason:'waiting_model',error:''};

const ns=__captureESMFunction((__esmLocal1=(()=>W._Ba?.__1?.sea_contue_login)),"ns"),m=__captureESMFunction((__esmLocal2=(()=>ns()?._k1?.instance)),"m"),r=__captureESMFunction((__esmLocal3=(()=>W._Ba?._IY?._WRt?.ins)),"r");

const own=__captureESMFunction((__esmLocal4=(()=>actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED)),"own");

function tick(){try{

if(!own()||!m()||!r())return;

for(const [key,p]of S.pending)if(m().getAwardState?.(p.act,p.id)===2){S.pending.delete(key);S.confirmed++;}

if(__getKVPV0()?.quickState?.()?.running!==true||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)){S.reason='yield_user_or_disabled_daily';return;}

if(Date.now()-S.last<2000)return;

if(!S.queried&&typeof r().getFestivalContinuityLoginInfo==='function'){S.queried=true;S.last=Date.now();r().getFestivalContinuityLoginInfo();S.reason='querying_login_state';return;}

const maps=[ns()?.FitActIdToDatas,ns()?.FitActIdToDatasHQ],acts=[...new Set(maps.flatMap(__captureESMFunction((__esmLocal6=(x=>Object.keys(x??{}))),"")).map(Number))],time=Number(W._Sa?.svrTime);

for(const act of acts){const end=Number(m().getEndTime?.(act));if(W._Ba?._IY?._BY?.ins?.getActIsOpen?.(act)!==true||!Number.isFinite(time)||!Number.isFinite(end)||end<=time)continue;

for(const row of m().getStateList?.(act)??[]){const id=Number(row?.[0]),key=act+'/'+end+'/'+id;if(!Number.isSafeInteger(id)||id<=0||row?.[1]!==1||m().getAwardState?.(act,id)!==1||S.sent.has(key))continue;

if(typeof r().getFestivalContinuityLoginReward!=='function')return;S.sent.add(key);S.pending.set(key,{act,id,at:Date.now()});S.requests++;S.last=Date.now();r().getFestivalContinuityLoginReward(id);S.reason='claim_ready_milestone';return;

}}

S.reason=S.pending.size?'waiting_server_state2_no_retry':'no_ready_milestone';

}catch(e){S.error=String(e.message||e);S.reason='error_no_retry';}}
__esmLocal5=tick;


function stop(){if(S.timer!==null)(__getKVPV2()?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;}
__esmLocal7=stop;


W.KVPV_LOGIN_STREAK=Object.freeze({sync:tick,stop,status:__captureESMFunction((__esmLocal8=(()=>({enabled:true,reason:S.reason,lastError:S.error,requests:S.requests,confirmed:S.confirmed,pending:[...S.pending.values()],allowKNB:false}))),"status"),_handoff:__captureESMFunction((__esmLocal9=(()=>({actor,pending:[...S.pending],sent:[...S.sent].slice(-200),requests:S.requests,confirmed:S.confirmed}))),"_handoff")});

S.timer=(__getKVPV2()?.timers?.setInterval??W.setInterval)(tick,2000);tick();

})),""))();


}
export {getKVPV_LOGIN_STREAK} from '../api.mjs';
export const api=Object.freeze({
  get KVPV_LOGIN_STREAK(){return globalThis.KVPV_LOGIN_STREAK;},
});