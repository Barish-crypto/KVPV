import {getKVPV_CONFIRM_POPUPS as __getKVPV0,getKVPV_SKILL_REWARDS as __getKVPV1,getKVPV_V1 as __getKVPV2,getKVPV_V8 as __getKVPV3} from '../api.mjs';
export function call_KVPV_SKILL_REWARDS_start(...args){const target=globalThis["KVPV_SKILL_REWARDS"];const fn=globalThis["KVPV_SKILL_REWARDS"]?.["start"];if(typeof fn!=='function')throw Error("KVPV_SKILL_REWARDS.start is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_SKILL_REWARDS_stop(...args){const target=globalThis["KVPV_SKILL_REWARDS"];const fn=globalThis["KVPV_SKILL_REWARDS"]?.["stop"];if(typeof fn!=='function')throw Error("KVPV_SKILL_REWARDS.stop is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_SKILL_REWARDS_sync(...args){const target=globalThis["KVPV_SKILL_REWARDS"];const fn=globalThis["KVPV_SKILL_REWARDS"]?.["sync"];if(typeof fn!=='function')throw Error("KVPV_SKILL_REWARDS.sync is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_SKILL_REWARDS__probe(...args){const target=globalThis["KVPV_SKILL_REWARDS"];const fn=globalThis["KVPV_SKILL_REWARDS"]?.["_probe"];if(typeof fn!=='function')throw Error("KVPV_SKILL_REWARDS._probe is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_SKILL_REWARDS__run(...args){const target=globalThis["KVPV_SKILL_REWARDS"];const fn=globalThis["KVPV_SKILL_REWARDS"]?.["_run"];if(typeof fn!=='function')throw Error("KVPV_SKILL_REWARDS._run is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_SKILL_REWARDS_status(...args){const target=globalThis["KVPV_SKILL_REWARDS"];const fn=globalThis["KVPV_SKILL_REWARDS"]?.["status"];if(typeof fn!=='function')throw Error("KVPV_SKILL_REWARDS.status is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_SKILL_REWARDS__handoff(...args){const target=globalThis["KVPV_SKILL_REWARDS"];const fn=globalThis["KVPV_SKILL_REWARDS"]?.["_handoff"];if(typeof fn!=='function')throw Error("KVPV_SKILL_REWARDS._handoff is not available");return Reflect.apply(fn,target,args);}
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
export {__esmLocal0 as local_anonymous_6_1_0};
export {__esmLocal1 as local_model_1};
export {__esmLocal2 as local_rpc_2};
export {__esmLocal3 as local_owned_3};
export {__esmLocal4 as local_ready_4};
export {__esmLocal5 as local_anonymous_26_20_5};
export {__esmLocal6 as local_anonymous_26_54_6};
export {__esmLocal7 as local_anonymous_28_11_7};
export {__esmLocal8 as local_observe_8};
export {__esmLocal9 as local_probe_9};
export {__esmLocal10 as local_run_10};
export {__esmLocal11 as local_sync_11};
export {__esmLocal12 as local_stop_12};
export {__esmLocal13 as local_start_13};
export {__esmLocal14 as local_probe_14};
export {__esmLocal15 as local_run_15};
export {__esmLocal16 as local_status_16};
export {__esmLocal17 as local__handoff_17};
export function initialize(){

/* Native Skill Handbook reward: _tYt._hYt._NCt rows [id,state,...].
 * UI _Kns claims only 0 < state <= 1 with GetSkillHandbookInfoReward(id).
 * Includes active/passive/holy categories; never opens a locked skill source. */

(__captureESMFunction((__esmLocal0=(() => {

  'use strict';

  const W=window,old=__getKVPV1(),carry=old?._handoff?.();old?.stop?.('reload');

  const actor=String(W.__KVPV_OWN_ACTOR_ID||''),same=carry?.actor===actor,id='skill_handbook_rewards';

  const S={enabled:true,timer:null,registered:false,pending:same?carry.pending:null,

    requests:same?carry.requests:0,confirmed:same?carry.confirmed:0,reason:'waiting_model',lastError:''};

  const model=__captureESMFunction((__esmLocal1=(()=>W._Ba?._tYt?._hYt?.inst)),"model"),rpc=__captureESMFunction((__esmLocal2=(()=>W._Ba?._tYt?._aYt?.inst)),"rpc");

  const owned=__captureESMFunction((__esmLocal3=(()=>actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED)),"owned");

  function ready(){

    const m=model(),keys=m?._NCt?.keys;if(!Array.isArray(keys))return [];

    return keys.map(__captureESMFunction((__esmLocal5=(key=>m.getInfoById?.(key))),"")).filter(__captureESMFunction((__esmLocal6=(r=>Array.isArray(r)&&Number.isSafeInteger(Number(r[0]))&&Number(r[0])>0&&Number(r[1])>0&&Number(r[1])<=1)),""))

      .map(__captureESMFunction((__esmLocal7=(r=>({id:Number(r[0]),state:Number(r[1])}))),""));

  }
__esmLocal4=ready;


  function observe(){if(!S.pending)return;

    const row=model()?.getInfoById?.(S.pending.id);

    if(Array.isArray(row)&&Number(row[1])>=2){S.confirmed++;S.pending=null;S.reason='server_reward_claimed';}

    else S.reason=Date.now()-S.pending.at>30000?'waiting_reward_ack_no_retry':'waiting_reward_ack';

  }
__esmLocal8=observe;


  function probe(){

    if(!S.enabled||!owned())return {ready:false};observe();

    if(S.pending||__getKVPV0()?.beforeTask?.()===true||typeof rpc()?.GetSkillHandbookInfoReward!=='function')return {ready:false};

    const q=ready()[0];return q?{ready:true,signature:q.id+':'+q.state,id:q.id}:{ready:false};

  }
__esmLocal9=probe;


  function run(before){const q=probe();if(!q.ready||q.signature!==before.signature)throw Error('Skill reward state changed');

    S.pending={id:q.id,at:Date.now()};S.requests++;S.reason='native_reward_sent';

    try{rpc().GetSkillHandbookInfoReward(q.id);}catch(e){S.lastError=String(e);throw e;}

  }
__esmLocal10=run;


  function sync(){try{if(!S.enabled)return;if(!owned()){stop();return;}observe();

    if(!S.pending)S.reason=ready().length?'waiting_shared_claim_queue':'waiting_unclaimed_skill';

  }catch(e){S.lastError=String(e);}}
__esmLocal11=sync;


  function stop(){S.enabled=false;if(S.timer!==null)(__getKVPV2()?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;

    if(S.registered)__getKVPV3()?.toggle?.(id,false);}
__esmLocal12=stop;


  function start(){const queue=__getKVPV3();if(!queue?.register||!queue?.toggle){S.reason='waiting_shared_queue';return;}

    S.enabled=true;try{queue.register({id,name:'Nhận thưởng kích hoạt kỹ năng',kind:'claim',verified:true,enabled:true,

      spend:'none',background:true,directDuringPve:true,redIds:[],hourlyLimit:60,cooldownMs:2000,

      probe:__captureESMFunction((__esmLocal14=(()=>__getKVPV1()?._probe()??{ready:false})),"probe"),run:__captureESMFunction((__esmLocal15=(p=>__getKVPV1()?._run(p))),"run")});

    }catch(e){if(!/Trung module ID|already exists/i.test(String(e)))throw e;}

    queue.toggle(id,true);S.registered=true;

    if(S.timer===null)S.timer=(__getKVPV2()?.timers?.setInterval??W.setInterval)(sync,500);sync();

  }
__esmLocal13=start;


  W.KVPV_SKILL_REWARDS=Object.freeze({start,stop,sync,_probe:probe,_run:run,

    status:__captureESMFunction((__esmLocal16=(()=>({enabled:S.enabled,actor,reason:S.reason,ready:ready(),pending:S.pending?{...S.pending}:null,

      requests:S.requests,confirmed:S.confirmed,lastError:S.lastError,allowKNB:false}))),"status"),

    _handoff:__captureESMFunction((__esmLocal17=(()=>({actor,pending:S.pending?{...S.pending}:null,requests:S.requests,confirmed:S.confirmed}))),"_handoff")});

  start();

})),""))();


}
export {getKVPV_SKILL_REWARDS} from '../api.mjs';
export const api=Object.freeze({
  get KVPV_SKILL_REWARDS(){return globalThis.KVPV_SKILL_REWARDS;},
});