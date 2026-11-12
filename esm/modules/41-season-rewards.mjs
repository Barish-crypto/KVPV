import {getKVPV_CONFIRM_POPUPS as __getKVPV0,getKVPV_SEASON_REWARDS as __getKVPV1,getKVPV_V8 as __getKVPV2} from '../api.mjs';
export function call_KVPV_SEASON_REWARDS__probe(...args){const target=globalThis["KVPV_SEASON_REWARDS"];const fn=globalThis["KVPV_SEASON_REWARDS"]?.["_probe"];if(typeof fn!=='function')throw Error("KVPV_SEASON_REWARDS._probe is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_SEASON_REWARDS__run(...args){const target=globalThis["KVPV_SEASON_REWARDS"];const fn=globalThis["KVPV_SEASON_REWARDS"]?.["_run"];if(typeof fn!=='function')throw Error("KVPV_SEASON_REWARDS._run is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_SEASON_REWARDS_stop(...args){const target=globalThis["KVPV_SEASON_REWARDS"];const fn=globalThis["KVPV_SEASON_REWARDS"]?.["stop"];if(typeof fn!=='function')throw Error("KVPV_SEASON_REWARDS.stop is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_SEASON_REWARDS_status(...args){const target=globalThis["KVPV_SEASON_REWARDS"];const fn=globalThis["KVPV_SEASON_REWARDS"]?.["status"];if(typeof fn!=='function')throw Error("KVPV_SEASON_REWARDS.status is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_SEASON_REWARDS__handoff(...args){const target=globalThis["KVPV_SEASON_REWARDS"];const fn=globalThis["KVPV_SEASON_REWARDS"]?.["_handoff"];if(typeof fn!=='function')throw Error("KVPV_SEASON_REWARDS._handoff is not available");return Reflect.apply(fn,target,args);}
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
export {__esmLocal1 as local_model_1};
export {__esmLocal2 as local_owned_2};
export {__esmLocal3 as local_rows_3};
export {__esmLocal4 as local_probe_4};
export {__esmLocal5 as local_anonymous_22_56_5};
export {__esmLocal6 as local_run_6};
export {__esmLocal7 as local_stop_7};
export {__esmLocal8 as local_status_8};
export {__esmLocal9 as local__handoff_9};
export function initialize(){

/* Jiu Xiao Ling completed tasks: native state 1, never visits paid task targets. */

(__captureESMFunction((__esmLocal0=(() => {

  'use strict';

  const W=window,old=__getKVPV1(),c=old?._handoff?.();

  const missingLegacyPlugin=__captureESMFunction((e=>/Khong tim thay module|Không tìm thấy module|module not found|module does not exist/i.test(String(e?.message??e))),"missingLegacyPlugin");

  try{old?.stop?.();}catch(e){if(!missingLegacyPlugin(e))throw e;}

  const actor=String(W.__KVPV_OWN_ACTOR_ID||''),same=c?.actor===actor;

  const S={pending:same?c.pending:null,requests:same?c.requests:0,confirmed:same?c.confirmed:0};

  const id='season_completed_tasks',model=__captureESMFunction((__esmLocal1=(()=>W._Ba?._Je?._bJ?.ins)),"model");

  function disableLegacyPlugin(){try{__getKVPV2()?.toggle?.(id,false);}catch(e){if(!missingLegacyPlugin(e))throw e;}}

  const owned=__captureESMFunction((__esmLocal2=(()=>actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&actor&&!W.__KVPV_UNIVERSAL_HALTED)),"owned");

  const rows=__captureESMFunction((__esmLocal3=(kind=>model()?.[kind==='stage'?'stageTaskList':'seasonTaskList']??[])),"rows");

  function probe(){if(!owned())return {ready:false};

    if(S.pending){const p=S.pending,r=rows(p.kind).find(__captureESMFunction((__esmLocal5=(r=>Number(r._id)===p.id)),"")),m=model();

      if(p.kind==='level'?(Number(m?.jiuxiaolingHaveRewardLV)>p.free||Number(m?.jiuxiaolingHaveGoldenRewardLV)>p.gold):r&&(Number(r._state)===2||Number(r._curtimes)>p.times)){S.pending=null;S.confirmed++;}else return {ready:false};

    }

    if(__getKVPV0()?.beforeTask?.()===true)return {ready:false};

    for(const kind of ['stage','season'])for(const r of rows(kind).slice(0,200)){

      const taskId=Number(r._id),method=kind==='stage'?'getStageTaskReward':'getSeasonTaskReward';

      if(Number(r._state)!==1||!Number.isSafeInteger(taskId)||taskId<=0||typeof W._Ba?._Je?._Qe?.ins?.[method]!=='function')continue;

      return {ready:true,id:taskId,kind,method,times:Number(r._curtimes)||0,signature:kind+'/'+taskId+'/'+r._curtimes+'/'+r._state};

    }

    const m=model(),level=Number(m?.jiuxiaolingMyLevel),free=Number(m?.jiuxiaolingHaveRewardLV),gold=Number(m?.jiuxiaolingHaveGoldenRewardLV);

    if(Number.isSafeInteger(level)&&level>0&&Number.isSafeInteger(free)&&free>=0&&Number.isSafeInteger(gold)&&gold>=0&&

      (free<level||Number(m?.goldenState)>0&&gold<level)&&typeof W._Ba?._Je?._Qe?.ins?.getJiuXiaoLingReward==='function')

      return {ready:true,kind:'level',free,gold,signature:'level/'+level+'/'+free+'/'+gold};

    return {ready:false};

  }
__esmLocal4=probe;


  function run(before){const p=probe();if(!p.ready||p.signature!==before.signature)throw Error('Task reward state changed');

    S.pending={id:p.id,kind:p.kind,times:p.times,free:p.free,gold:p.gold};S.requests++;

    if(p.kind==='level')W._Ba._Je._Qe.ins.getJiuXiaoLingReward();else W._Ba._Je._Qe.ins[p.method](p.id);

  }
__esmLocal6=run;


  function stop(){disableLegacyPlugin();}
__esmLocal7=stop;


  W.KVPV_SEASON_REWARDS=Object.freeze({_probe:probe,_run:run,stop,status:__captureESMFunction((__esmLocal8=(()=>({...S}))),"status"),_handoff:__captureESMFunction((__esmLocal9=(()=>({actor,...S}))),"_handoff")});

  disableLegacyPlugin();

})),""))();


}
export {getKVPV_SEASON_REWARDS} from '../api.mjs';
export const api=Object.freeze({
  get KVPV_SEASON_REWARDS(){return globalThis.KVPV_SEASON_REWARDS;},
});