import {getKVPV_DAILY as __getKVPV0,getKVPV_FABAO_TREASURE as __getKVPV1,getKVPV_FESTIVAL_FREE as __getKVPV2,getKVPV_FREE_TREASURE as __getKVPV3,getKVPV_V1 as __getKVPV4} from '../api.mjs';
export function call_KVPV_FESTIVAL_FREE_sync(...args){const target=globalThis["KVPV_FESTIVAL_FREE"];const fn=globalThis["KVPV_FESTIVAL_FREE"]?.["sync"];if(typeof fn!=='function')throw Error("KVPV_FESTIVAL_FREE.sync is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_FESTIVAL_FREE_busy(...args){const target=globalThis["KVPV_FESTIVAL_FREE"];const fn=globalThis["KVPV_FESTIVAL_FREE"]?.["busy"];if(typeof fn!=='function')throw Error("KVPV_FESTIVAL_FREE.busy is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_FESTIVAL_FREE_stop(...args){const target=globalThis["KVPV_FESTIVAL_FREE"];const fn=globalThis["KVPV_FESTIVAL_FREE"]?.["stop"];if(typeof fn!=='function')throw Error("KVPV_FESTIVAL_FREE.stop is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_FESTIVAL_FREE_status(...args){const target=globalThis["KVPV_FESTIVAL_FREE"];const fn=globalThis["KVPV_FESTIVAL_FREE"]?.["status"];if(typeof fn!=='function')throw Error("KVPV_FESTIVAL_FREE.status is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_FESTIVAL_FREE__handoff(...args){const target=globalThis["KVPV_FESTIVAL_FREE"];const fn=globalThis["KVPV_FESTIVAL_FREE"]?.["_handoff"];if(typeof fn!=='function')throw Error("KVPV_FESTIVAL_FREE._handoff is not available");return Reflect.apply(fn,target,args);}
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
let __esmLocal16;
let __esmLocal17;
let __esmLocal18;
let __esmLocal19;
export {__esmLocal0 as local_anonymous_4_1_0};
export {__esmLocal1 as local_ns_1};
export {__esmLocal2 as local_rpc_2};
export {__esmLocal3 as local_actModel_3};
export {__esmLocal4 as local_own_4};
export {__esmLocal5 as local_day_5};
export {__esmLocal6 as local_active_6};
export {__esmLocal7 as local_state_7};
export {__esmLocal8 as local_anonymous_18_86_8};
export {__esmLocal9 as local_bag_9};
export {__esmLocal10 as local_send_10};
export {__esmLocal11 as local_tick_11};
export {__esmLocal12 as local_anonymous_46_247_12};
export {__esmLocal13 as local_anonymous_50_170_13};
export {__esmLocal14 as local_anonymous_58_255_14};
export {__esmLocal15 as local_anonymous_72_67_15};
export {__esmLocal16 as local_stop_16};
export {__esmLocal17 as local_busy_17};
export {__esmLocal18 as local_status_18};
export {__esmLocal19 as local__handoff_19};
export function initialize(){

/* Native festival claims / free Dbao / existing seasonal tokens. No purchase paths. */

(__captureESMFunction((__esmLocal0=(() => {

'use strict';const W=window,old=__getKVPV2(),c=old?._handoff?.();old?.stop?.();const actor=String(W.__KVPV_OWN_ACTOR_ID||''),same=c?.actor===actor;

const S={timer:null,pending:same?c.pending:null,sent:new Set(same?c.sent:[]),queries:new Set(),last:-Infinity,requests:same?c.requests:0,confirmed:same?c.confirmed:0,reason:'waiting',error:''};

const ns=__captureESMFunction((__esmLocal1=(()=>W._Ba?.__1)),"ns"),rpc=__captureESMFunction((__esmLocal2=(()=>W._Ba?._IY?._WRt?.ins)),"rpc"),actModel=__captureESMFunction((__esmLocal3=(()=>W._Ba?._IY?._BY?.ins)),"actModel");

const own=__captureESMFunction((__esmLocal4=(()=>actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED)),"own");

const day=__captureESMFunction((__esmLocal5=(()=>new Date(Date.now()+7*3600000).toISOString().slice(0,10))),"day");

const active=__captureESMFunction((__esmLocal6=(a=>actModel()?.getActIsOpen?.(a)===true)),"active");

const state=__captureESMFunction((__esmLocal7=((act,id)=>ns()?.sea_login_award?._m1?.instance?.getStateList?.(act)?.find(__captureESMFunction((__esmLocal8=(x=>Number(x?.[0])===id)),""))?.[1])),"state");

const bag=__captureESMFunction((__esmLocal9=(id=>Number(W._Ba?._Ic?._aQ?.ins?.getItemCountById?.(id)))),"bag");

function send(key,p,fn){S.sent.add(key);if(S.sent.size>200)S.sent.delete(S.sent.values().next().value);S.pending={...p,at:Date.now()};S.last=Date.now();S.requests++;fn();S.reason='sent_'+p.kind;}
__esmLocal10=send;


function tick(){try{

if(!own())return;const dbao=W._Ba?._EEt?._GEt?.inst,guide=ns()?.activity_guide?._ue?.instance,treasure=W._Ba?._ze?._Ve?.ins;

if(S.pending){const p=S.pending;let ok=false;

if(p.kind==='login')ok=state(p.act,p.id)===2;

if(p.kind==='guide')ok=guide?.getAwardState?.(p.act)===2;

if(p.kind==='dbao')ok=Number(dbao?.fTimes)<p.count&&dbao?.noteLst!==p.reply;

if(p.kind==='token')ok=treasure?.xbRep!==p.reply&&Number(treasure?.xbRep?.[0])===p.type&&Number(treasure?.xbRep?.[1])===0&&bag(p.item)<p.count;

if(ok){S.pending=null;S.confirmed++;}else{S.reason='waiting_'+p.kind+'_ack_no_retry';return;}}

if(__getKVPV0()?.quickState?.()?.running!==true||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)){S.reason='yield_user_or_disabled_daily';return;}if(Date.now()-S.last<3000)return;

const login=ns()?.sea_login_award,m=login?._m1?.instance;

for(const a of Object.keys({...login?.FitActIdToDatas,...login?.FitActIdToDatasHQ}).map(Number)){if(!active(a))continue;

for(const row of m?.getStateList?.(a)??[]){const id=Number(row?.[0]),key=day()+'/login/'+a+'/'+id;if(Number.isSafeInteger(id)&&id>0&&row[1]===1&&!S.sent.has(key)&&typeof rpc()?.getFestivalLoginReward==='function'){send(key,{kind:'login',act:a,id},__captureESMFunction((__esmLocal12=(()=>rpc().getFestivalLoginReward(id))),""));return;}}}

const a=Number(guide?.curActId),gkey=day()+'/guide/'+a;

if(a>0&&active(a)&&guide.getAwardState?.(a)===1&&!S.sent.has(gkey)&&typeof ns()?.activity_guide?._lin?.instance?.c2sGetAward==='function'){send(gkey,{kind:'guide',act:a},__captureESMFunction((__esmLocal13=(()=>ns().activity_guide._lin.instance.c2sGetAward(a))),""));return;}

// Refresh read-only state once per calendar day, independent of whether its panel is open.

if(!S.queries.has(day())){S.queries.add(day());S.last=Date.now();rpc()?.getFestivalLoginRewardInfo?.();W._Ba?._EEt?._OEt?.inst?.GetDbaoInfo?.();ns()?.activity_guide?._lin?.instance?.c2sGetInfo?.();S.reason='querying_free_event_state';return;}

const server=Number(W._Sa?.svrTime),count=Number(dbao?.fTimes),dkey=day()+'/dbao/'+dbao?.restTm+'/'+count;

if(Number.isInteger(count)&&count>0&&dbao?.oState===1&&Number(dbao.restTm)>server&&W._Ba?._Do?._Ho?.inst?.getFcIsOpen?.(217)===true&&!S.sent.has(dkey)&&typeof W._Ba?._EEt?._OEt?.inst?.DbaoRun==='function'){send(dkey,{kind:'dbao',count,reply:dbao.noteLst},__captureESMFunction((__esmLocal14=(()=>W._Ba._EEt._OEt.inst.DbaoRun(0))),""));return;}

if(__getKVPV3()?.busy?.()||__getKVPV1()?.status?.()?.pending){S.reason='waiting_other_treasure';return;}

const season=ns()?.sea_treasure,sm=season?._v1?.instance;

for(const [id,meta]of Object.entries(season?.FitActIdToDatas??{})){const act=Number(id);const end=Number(sm?.getEndTm?.(act));if(!active(act)||!Number.isFinite(server)||!Number.isFinite(end)||end<=server)continue;

const type=W._ft?._gY?.ins?.getCfgById?.(66068)?.[2]?.[meta[0]];if(!Number.isSafeInteger(type))continue;

const cost=W._ft?._oZ?.ins?.getQDXBCostNumList?.(type)?.[0];if(!Array.isArray(cost))continue;const item=Number(cost[0]),qty=Number(cost[1]),have=bag(item),key=day()+'/token/'+act+'/'+type+'/'+have;

if(!Number.isSafeInteger(item)||item<=0||item>=90000000||!Number.isSafeInteger(qty)||qty<=0||!Number.isInteger(have)||have<qty||S.sent.has(key)||typeof W._Ba?._ze?._pmt?.ins?.runXunbao!=='function')continue;

send(key,{kind:'token',type,item,count:have,reply:treasure?.xbRep},__captureESMFunction((__esmLocal15=(()=>W._Ba._ze._pmt.ins.runXunbao(type,0,false))),""));return;}

S.reason='no_eligible_free_rewards_or_tokens';

}catch(e){S.error=String(e.message||e);S.reason='error_no_retry';}}
__esmLocal11=tick;


function stop(){if(S.timer!==null)(__getKVPV4()?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;}
__esmLocal16=stop;


W.KVPV_FESTIVAL_FREE=Object.freeze({sync:tick,busy:__captureESMFunction((__esmLocal17=(()=>!!S.pending)),"busy"),stop,status:__captureESMFunction((__esmLocal18=(()=>({enabled:true,reason:S.reason,lastError:S.error,requests:S.requests,confirmed:S.confirmed,pending:S.pending?{kind:S.pending.kind,act:S.pending.act,type:S.pending.type,at:S.pending.at}:null,allowKNB:false}))),"status"),_handoff:__captureESMFunction((__esmLocal19=(()=>({actor,pending:S.pending,sent:[...S.sent],requests:S.requests,confirmed:S.confirmed}))),"_handoff")});

S.timer=(__getKVPV4()?.timers?.setInterval??W.setInterval)(tick,2000);tick();

})),""))();


}
export {getKVPV_FESTIVAL_FREE} from '../api.mjs';
export const api=Object.freeze({
  get KVPV_FESTIVAL_FREE(){return globalThis.KVPV_FESTIVAL_FREE;},
});