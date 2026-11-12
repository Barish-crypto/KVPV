import {getKVPV_CONFIRM_POPUPS as __getKVPV0,getKVPV_DAILY as __getKVPV1,getKVPV_ENTRY_POLICY as __getKVPV2,getKVPV_EVENT_PRIORITY as __getKVPV3,getKVPV_HITRUN1 as __getKVPV4,getKVPV_MODE as __getKVPV5,getKVPV_QUEST_PRIORITY as __getKVPV6,getKVPV_RUNE_BOSS as __getKVPV7,getKVPV_V1 as __getKVPV8} from '../api.mjs';
export function call_KVPV_RUNE_BOSS_start(...args){const target=globalThis["KVPV_RUNE_BOSS"];const fn=globalThis["KVPV_RUNE_BOSS"]?.["start"];if(typeof fn!=='function')throw Error("KVPV_RUNE_BOSS.start is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_RUNE_BOSS_stop(...args){const target=globalThis["KVPV_RUNE_BOSS"];const fn=globalThis["KVPV_RUNE_BOSS"]?.["stop"];if(typeof fn!=='function')throw Error("KVPV_RUNE_BOSS.stop is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_RUNE_BOSS_sync(...args){const target=globalThis["KVPV_RUNE_BOSS"];const fn=globalThis["KVPV_RUNE_BOSS"]?.["sync"];if(typeof fn!=='function')throw Error("KVPV_RUNE_BOSS.sync is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_RUNE_BOSS_status(...args){const target=globalThis["KVPV_RUNE_BOSS"];const fn=globalThis["KVPV_RUNE_BOSS"]?.["status"];if(typeof fn!=='function')throw Error("KVPV_RUNE_BOSS.status is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_RUNE_BOSS__handoff(...args){const target=globalThis["KVPV_RUNE_BOSS"];const fn=globalThis["KVPV_RUNE_BOSS"]?.["_handoff"];if(typeof fn!=='function')throw Error("KVPV_RUNE_BOSS._handoff is not available");return Reflect.apply(fn,target,args);}
function __captureESMFunction(fn,name){
  if(fn.name!==name)Object.defineProperty(fn,"name",{value:name,configurable:true});
  return fn;
}
function __captureESMMethod(receiver,key,kind){
  let owner=receiver;
  while(owner!==null&&(typeof owner==="object"||typeof owner==="function")&&!Object.prototype.hasOwnProperty.call(owner,key))owner=Object.getPrototypeOf(owner);
  if(owner===null)return undefined;
  const descriptor=Object.getOwnPropertyDescriptor(owner,key);
  return kind==="get"?descriptor.get:kind==="set"?descriptor.set:descriptor.value;
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
export {__esmLocal0 as local_anonymous_7_1_0};
export {__esmLocal1 as local_model_1};
export {__esmLocal2 as local_arb_2};
export {__esmLocal3 as local_owned_3};
export {__esmLocal4 as local_current_4};
export {__esmLocal5 as local_common_5};
export {__esmLocal6 as local_release_6};
export {__esmLocal7 as local_reserve_7};
export {__esmLocal8 as local_tick_8};
export {__esmLocal9 as local_stop_9};
export {__esmLocal10 as local_start_10};
export {__esmLocal11 as local_get_enabled_11};
export {__esmLocal12 as local_status_12};
export {__esmLocal13 as local__handoff_13};
export function initialize(){






(__captureESMFunction((__esmLocal0=(() => {

  'use strict';

  const W=window,old=__getKVPV7(),carry=old?._handoff?.();old?.stop?.();

  const actor=String(W.__KVPV_OWN_ACTOR_ID||''),same=carry?.actor===actor,tag='rune-boss';

  const S={enabled:same?carry.enabled:true,timer:null,lease:false,stageAuto:null,

    pending:same?carry.pending:null,attempted:same?carry.attempted:null,reason:'waiting',lastError:'',requests:same?carry.requests:0};

  const model=__captureESMFunction((__esmLocal1=(()=>W._Ba?._IH?._ZY?.inst)),"model"),arb=__captureESMFunction((__esmLocal2=(()=>W.KVPV?.core?.scene)),"arb");

  const owned=__captureESMFunction((__esmLocal3=(()=>!!actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED)),"owned");

  const current=__captureESMFunction((__esmLocal4=(()=>Number(W._C?._Mn?._Cn?.currentID??W._Ba?._$a?._yo?.ins?.intoSce?.[0]))),"current");

  const common=__captureESMFunction((__esmLocal5=(()=>W._Ba?._$a?.SceneUtil?.isCommonScene===true&&W._Ba?._$a?._yo?.ins?.isInMission!==true)),"common");

  function release(){

    if(S.lease&&arb()?.status?.().tag===tag)arb()?.release?.('combat');S.lease=false;

    const stage=W._Ba?._Co?._Mo?.ins;if(owned()&&S.stageAuto===true&&stage?.auto===false&&!__getKVPV3()?.hold?.())stage.auto=true;

    S.stageAuto=null;

  }
__esmLocal6=release;


  function reserve(){

    const a=arb(),l=a?.status?.(),job=__getKVPV1()?.quickState?.()?.job;

    if(!a||l?.owner&&l.tag!==tag||job&&job!=='rảnh'&&job!=='ranh'||__getKVPV4()?.status?.(false)?.running)return false;

    const stage=W._Ba?._Co?._Mo?.ins;

    if(S.stageAuto===null)S.stageAuto=stage?.auto===true;if(stage?.auto===true)stage.auto=false;

    if(!a.acquire('combat',tag)){release();return false;}S.lease=true;return true;

  }
__esmLocal7=reserve;


  function tick(){if(__getKVPV2()?.manual===true)return;try{

    if(!S.enabled)return;

    if(!owned()){stop();return;}

    if(__getKVPV0()?.beforeTask?.()===true){S.reason='priority_popup';return;}

    const finished=Number(model()?.finishLv),floor=Number(model()?.currLv);

    if(!Number.isSafeInteger(finished)||finished<0||!Number.isSafeInteger(floor)||floor!==finished+1){S.reason='waiting_server_progress';return;}

    if(current()===2201&&!common()){

      if(S.pending)S.pending.entered=true;

      if(S.lease)arb()?.renew?.('combat');

      S.reason='hitrun_far_combat';return;

    }

    if(S.pending){

      if(common()&&finished>=S.pending.floor){S.pending=null;release();S.reason='floor_confirmed';}

      else if(common()&&S.pending.entered){S.pending=null;release();S.reason='floor_not_passed';return;}

      else {S.reason=Date.now()-S.pending.at>25000?'waiting_entry_ack_no_retry':'entering';

        if(Date.now()-S.pending.at>25000)release();else if(S.lease)arb()?.renew?.('combat');return;}

    }

    if(!common()){release();S.reason='other_activity';return;}

    if(__getKVPV6()?.blocks?.('rune_boss')){release();S.reason='priority_quest';return;}

    if(W._Ba?._rJ?._O$?.ins?.isDead===true){S.reason='waiting_revive';return;}

    const cfg=W._ft?._wZ?.ins?.getCfgByLv?.(floor);

    if(!cfg){release();S.reason='all_floors_completed_or_missing_config';return;}

    if(Number(cfg[0])!==floor){S.reason='invalid_floor_config';return;}

    if(S.attempted===floor){release();S.reason='floor_already_attempted';return;}

    const rpc=W._Ba?._sst?._Cht?.inst;

    if(typeof rpc?.rqEtScene!=='function'||rpc.checkEnterScene?.(2201,false)!==true){S.reason='native_entry_not_ready';return;}

    if(!reserve()){S.reason='scene_reserved';return;}

    S.pending={floor,at:Date.now(),entered:false};S.attempted=floor;S.requests++;

    S.reason='entering';rpc.rqEtScene(2201,floor);

  }catch(e){S.lastError=String(e);S.reason='error';release();__getKVPV8()?.diagnostics?.record?.(e);}}
__esmLocal8=tick;


  function stop(){S.enabled=false;if(S.timer!==null)(__getKVPV8()?.timers?.clearInterval??W.clearInterval)(S.timer);

    S.timer=null;release();__getKVPV5()?.syncMap?.();}
__esmLocal9=stop;


  function start(){S.enabled=true;__getKVPV5()?.armTianQuan?.();

    if(S.timer===null)S.timer=(__getKVPV8()?.timers?.setInterval??W.setInterval)(tick,1000);tick();}
__esmLocal10=start;


  W.KVPV_RUNE_BOSS=Object.freeze({get enabled(){
__esmLocal11=__captureESMMethod(this,"enabled","get");
return S.enabled;},start,stop,sync:tick,

    status:__captureESMFunction((__esmLocal12=(()=>({enabled:S.enabled,actor,reason:S.reason,pending:S.pending?{...S.pending}:null,

      floor:Number(model()?.currLv),finished:Number(model()?.finishLv),requests:S.requests,lastError:S.lastError,

      goalDistance:302,recoveryEnabled:true,finishBossHpPct:2,allowKNB:false}))),"status"),

    _handoff:__captureESMFunction((__esmLocal13=(()=>({actor,enabled:S.enabled,pending:S.pending?{...S.pending}:null,attempted:S.attempted,requests:S.requests}))),"_handoff")});

  if(S.enabled)start();

})),""))();


}
export {getKVPV_RUNE_BOSS} from '../api.mjs';
export const api=Object.freeze({
  get KVPV_RUNE_BOSS(){return globalThis.KVPV_RUNE_BOSS;},
});