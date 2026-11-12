import {getKVPV_DAILY as __getKVPV0,getKVPV_DAILY_CLOCK as __getKVPV1,getKVPV_PEAK_CHEST as __getKVPV2,getKVPV_PEAK_COMPLETION as __getKVPV3,getKVPV_QUEST_PRIORITY as __getKVPV4,getKVPV_V1 as __getKVPV5} from '../api.mjs';
export function call_KVPV_PEAK_COMPLETION_sync(...args){const target=globalThis["KVPV_PEAK_COMPLETION"];const fn=globalThis["KVPV_PEAK_COMPLETION"]?.["sync"];if(typeof fn!=='function')throw Error("KVPV_PEAK_COMPLETION.sync is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_PEAK_COMPLETION_stop(...args){const target=globalThis["KVPV_PEAK_COMPLETION"];const fn=globalThis["KVPV_PEAK_COMPLETION"]?.["stop"];if(typeof fn!=='function')throw Error("KVPV_PEAK_COMPLETION.stop is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_PEAK_COMPLETION_status(...args){const target=globalThis["KVPV_PEAK_COMPLETION"];const fn=globalThis["KVPV_PEAK_COMPLETION"]?.["status"];if(typeof fn!=='function')throw Error("KVPV_PEAK_COMPLETION.status is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_PEAK_COMPLETION__handoff(...args){const target=globalThis["KVPV_PEAK_COMPLETION"];const fn=globalThis["KVPV_PEAK_COMPLETION"]?.["_handoff"];if(typeof fn!=='function')throw Error("KVPV_PEAK_COMPLETION._handoff is not available");return Reflect.apply(fn,target,args);}
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
export {__esmLocal0 as local_anonymous_4_1_0};
export {__esmLocal1 as local_own_1};
export {__esmLocal2 as local_day_2};
export {__esmLocal3 as local_tick_3};
export {__esmLocal4 as local_stop_4};
export {__esmLocal5 as local_status_5};
export {__esmLocal6 as local__handoff_6};
export function initialize(){

/* Completion, not event opening hours, determines whether Peak needs another run. */

(__captureESMFunction((__esmLocal0=(() => {

'use strict';const W=window,old=__getKVPV3(),c=old?._handoff?.();old?.stop?.();

const actor=String(W.__KVPV_OWN_ACTOR_ID||''),same=c?.actor===actor,storage='kvpv.peak.completed.'+actor;

let completed=same?c.completed:'';try{completed=W.localStorage?.getItem(storage)||completed;}catch(_){}

const cfg=__getKVPV0()?.config,prior=cfg?.enableDinhCao;

const S={timer:null,completed,exitKey:same?c.exitKey:'',resumeKey:same?c.resumeKey:'',blocked:false,reason:'waiting',error:''};

const own=__captureESMFunction((__esmLocal1=(()=>actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED)),"own");

const day=__captureESMFunction((__esmLocal2=(()=>__getKVPV1()?.key?.()??new Date(Date.now()+7200000).toISOString().slice(0,10))),"day");

function tick(){try{

if(!own())return;const today=day(),claimed=__getKVPV2()?._handoff?.()?.claimed??[];

// User explicitly confirmed today's Peak run and rewards are finished for these accounts.

if(today==='2026-10-24'||claimed.includes(today+'/peak-floor9')){S.completed=today;try{W.localStorage?.setItem(storage,today);}catch(_){} }

if(S.completed!==today){if(S.blocked&&cfg?.enableDinhCao===false)cfg.enableDinhCao=prior;S.blocked=false;S.reason='eligible_new_activity_day';return;}

if(cfg)cfg.enableDinhCao=false;S.blocked=true;

const type=Number(W._ft?._po?.ins?.getCfgById?.(Number(W._C?._Mn?._Cn?.currentID))?.[7]),rpc=W._Ba?._sst?._Cht?.inst;

if(type===14){if(S.exitKey!==today&&typeof rpc?.rqEtScene==='function'){S.exitKey=today;rpc.rqEtScene(0);}S.reason='completed_waiting_exit';return;}

const d=__getKVPV0(),q=d?.quickState?.();

if(W._Ba?._$a?.SceneUtil?.isCommonScene!==true||q?.running!==true||!['rảnh','ranh'].includes(q.job)||W.KVPV?.core?.scene?.status?.()?.owner||W._Ba?._$a?._yo?.ins?.isInMission!==false||W._Ba?._cm?._q3t?.ins?.getHasTeams?.()===true||W._Ba?._rJ?._O$?.ins?.isDead!==false){S.reason='completed_waiting_current_job';return;}

if(S.resumeKey!==today&&typeof d.tuVuotStart==='function'){const work=__getKVPV4()?._handoff?.()?.work;if(work)work.dailyEnabled=true;d.tuVuotStart();S.resumeKey=today;}

S.reason='completed_daily_and_stage_resume';

}catch(e){S.error=String(e.message||e);S.reason='error_no_retry';}}
__esmLocal3=tick;


function stop(){if(S.timer!==null)(__getKVPV5()?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;if(S.blocked&&cfg?.enableDinhCao===false)cfg.enableDinhCao=prior;}
__esmLocal4=stop;


W.KVPV_PEAK_COMPLETION=Object.freeze({sync:tick,stop,status:__captureESMFunction((__esmLocal5=(()=>({completedDay:S.completed,doneToday:S.completed===day(),reason:S.reason,lastError:S.error,exitRequested:S.exitKey===day(),stageResumeRequested:S.resumeKey===day()}))),"status"),_handoff:__captureESMFunction((__esmLocal6=(()=>({actor,completed:S.completed,exitKey:S.exitKey,resumeKey:S.resumeKey}))),"_handoff")});

S.timer=(__getKVPV5()?.timers?.setInterval??W.setInterval)(tick,1000);tick();

})),""))();


}
export {getKVPV_PEAK_COMPLETION} from '../api.mjs';
export const api=Object.freeze({
  get KVPV_PEAK_COMPLETION(){return globalThis.KVPV_PEAK_COMPLETION;},
});