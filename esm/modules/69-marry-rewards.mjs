import {getKVPV_DAILY as __getKVPV0,getKVPV_MARRY_REWARDS as __getKVPV1,getKVPV_V1 as __getKVPV2} from '../api.mjs';
export function call_KVPV_MARRY_REWARDS_sync(...args){const target=globalThis["KVPV_MARRY_REWARDS"];const fn=globalThis["KVPV_MARRY_REWARDS"]?.["sync"];if(typeof fn!=='function')throw Error("KVPV_MARRY_REWARDS.sync is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_MARRY_REWARDS_stop(...args){const target=globalThis["KVPV_MARRY_REWARDS"];const fn=globalThis["KVPV_MARRY_REWARDS"]?.["stop"];if(typeof fn!=='function')throw Error("KVPV_MARRY_REWARDS.stop is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_MARRY_REWARDS_status(...args){const target=globalThis["KVPV_MARRY_REWARDS"];const fn=globalThis["KVPV_MARRY_REWARDS"]?.["status"];if(typeof fn!=='function')throw Error("KVPV_MARRY_REWARDS.status is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_MARRY_REWARDS__handoff(...args){const target=globalThis["KVPV_MARRY_REWARDS"];const fn=globalThis["KVPV_MARRY_REWARDS"]?.["_handoff"];if(typeof fn!=='function')throw Error("KVPV_MARRY_REWARDS._handoff is not available");return Reflect.apply(fn,target,args);}
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
export {__esmLocal1 as local_m_1};
export {__esmLocal2 as local_r_2};
export {__esmLocal3 as local_day_3};
export {__esmLocal4 as local_tick_4};
export {__esmLocal5 as local_stop_5};
export {__esmLocal6 as local_status_6};
export {__esmLocal7 as local__handoff_7};
export function initialize(){

/* Married accounts only: native ready rank/daily awards, no purchases. */

(__captureESMFunction((__esmLocal0=(() => {

'use strict';const W=window,old=__getKVPV1(),c=old?._handoff?.();old?.stop?.();const actor=String(W.__KVPV_OWN_ACTOR_ID||''),same=c?.actor===actor;

const S={timer:null,pending:same?c.pending:null,sent:new Set(same?c.sent:[]),requests:same?c.requests:0,confirmed:same?c.confirmed:0,last:-Infinity,reason:'waiting',error:''};

const m=__captureESMFunction((__esmLocal1=(()=>W._Ba?._Yo?.marryFight?._Z9t?.ins)),"m"),r=__captureESMFunction((__esmLocal2=(()=>W._Ba?._Yo?.marryFight?._qGt?.ins)),"r");

const day=__captureESMFunction((__esmLocal3=(()=>new Date(Date.now()+7*3600000).toISOString().slice(0,10))),"day");

function tick(){try{

if(!['10228867268946','10228867268941'].includes(actor)||actor!==String(W._Ba?._rJ?._O$?.ins?.actorId??'')||W.__KVPV_UNIVERSAL_HALTED){S.reason='account_not_selected';return;}

const model=m(),rpc=r();if(!model||!rpc)return;

if(S.pending){const p=S.pending,d=model.getDailyState?.(),ok=p.kind==='rank'?model.getSegAwdState?.(p.id)===2:d?.seg===p.id&&d?.state===2;if(ok){S.pending=null;S.confirmed++;}else{S.reason='waiting_reward_ack_no_retry';return;}}

if(__getKVPV0()?.quickState?.()?.running!==true||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)){S.reason='yield_user_or_disabled_daily';return;}if(Date.now()-S.last<2000)return;

const wife=model.getWifeInfo?.();if(!Array.isArray(wife)||wife.length<2){S.reason='waiting_couple_data';return;}

const rows=model.getSegAwdInfos?.()??W._ft?._KXh?.ins?.geArenatCfg?.()??[];

for(const row of rows){const id=Number(row?.[0]),key=day()+'/rank/'+id;if(!Number.isSafeInteger(id)||id<=0||model.getSegAwdState?.(id)!==0||S.sent.has(key)||typeof rpc.GetMarryArenaSegAward!=='function')continue;

S.sent.add(key);S.pending={kind:'rank',id,at:Date.now()};S.last=Date.now();S.requests++;rpc.GetMarryArenaSegAward(id);S.reason='claim_rank_reward';return;}

const d=model.getDailyState?.(),id=Number(d?.seg),key=day()+'/daily/'+id;

if(Number.isSafeInteger(id)&&id>0&&d?.state===0&&model.hasDailyAwd?.()===true&&!S.sent.has(key)&&typeof rpc.GetMarryArenaDailyAward==='function'){S.sent.add(key);S.pending={kind:'daily',id,at:Date.now()};S.last=Date.now();S.requests++;rpc.GetMarryArenaDailyAward(id);S.reason='claim_daily_reward';return;}

S.reason='no_ready_rank_or_daily_reward';

}catch(e){S.error=String(e.message||e);S.reason='error_no_retry';}}
__esmLocal4=tick;


function stop(){if(S.timer!==null)(__getKVPV2()?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;}
__esmLocal5=stop;


W.KVPV_MARRY_REWARDS=Object.freeze({sync:tick,stop,status:__captureESMFunction((__esmLocal6=(()=>({enabled:true,reason:S.reason,lastError:S.error,requests:S.requests,confirmed:S.confirmed,pending:S.pending,allowKNB:false}))),"status"),_handoff:__captureESMFunction((__esmLocal7=(()=>({actor,pending:S.pending,sent:[...S.sent].slice(-200),requests:S.requests,confirmed:S.confirmed}))),"_handoff")});

S.timer=(__getKVPV2()?.timers?.setInterval??W.setInterval)(tick,2000);tick();

})),""))();


}
export {getKVPV_MARRY_REWARDS} from '../api.mjs';
export const api=Object.freeze({
  get KVPV_MARRY_REWARDS(){return globalThis.KVPV_MARRY_REWARDS;},
});