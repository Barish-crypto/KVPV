import {getKVPV_CONFIRM_POPUPS as __getKVPV0,getKVPV_DAILY as __getKVPV1,getKVPV_EVENT_PRIORITY as __getKVPV2,getKVPV_HITRUN1 as __getKVPV3,getKVPV_MARRY_ARENA as __getKVPV4,getKVPV_V1 as __getKVPV5} from '../api.mjs';
export function call_KVPV_MARRY_ARENA_sync(...args){const target=globalThis["KVPV_MARRY_ARENA"];const fn=globalThis["KVPV_MARRY_ARENA"]?.["sync"];if(typeof fn!=='function')throw Error("KVPV_MARRY_ARENA.sync is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_MARRY_ARENA_stop(...args){const target=globalThis["KVPV_MARRY_ARENA"];const fn=globalThis["KVPV_MARRY_ARENA"]?.["stop"];if(typeof fn!=='function')throw Error("KVPV_MARRY_ARENA.stop is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_MARRY_ARENA_status(...args){const target=globalThis["KVPV_MARRY_ARENA"];const fn=globalThis["KVPV_MARRY_ARENA"]?.["status"];if(typeof fn!=='function')throw Error("KVPV_MARRY_ARENA.status is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_MARRY_ARENA__handoff(...args){const target=globalThis["KVPV_MARRY_ARENA"];const fn=globalThis["KVPV_MARRY_ARENA"]?.["_handoff"];if(typeof fn!=='function')throw Error("KVPV_MARRY_ARENA._handoff is not available");return Reflect.apply(fn,target,args);}
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
export {__esmLocal0 as local_anonymous_4_1_0};
export {__esmLocal1 as local_model_1};
export {__esmLocal2 as local_rpc_2};
export {__esmLocal3 as local_own_3};
export {__esmLocal4 as local_map_4};
export {__esmLocal5 as local_release_5};
export {__esmLocal6 as local_safe_6};
export {__esmLocal7 as local_tick_7};
export {__esmLocal8 as local_anonymous_30_101_8};
export {__esmLocal9 as local_anonymous_46_28_9};
export {__esmLocal10 as local_anonymous_47_34_10};
export {__esmLocal11 as local_anonymous_47_66_11};
export {__esmLocal12 as local_stop_12};
export {__esmLocal13 as local_status_13};
export {__esmLocal14 as local__handoff_14};
export function initialize(){

 

(__captureESMFunction((__esmLocal0=(() => {

'use strict';const W=window,old=__getKVPV4(),c=old?._handoff?.();old?.stop?.('reload');const actor=String(W.__KVPV_OWN_ACTOR_ID||''),same=c?.actor===actor;

const S={timer:null,pending:same?c.pending:null,lastAction:same?c.lastAction:-Infinity,queried:false,entries:same?c.entries:0,refreshes:same?c.refreshes:0,confirmed:same?c.confirmed:0,lease:same?c.lease:false,stageAuto:same?c.stageAuto:null,reason:'waiting_idle',error:''};

const model=__captureESMFunction((__esmLocal1=(()=>W._Ba?._Yo?.marryFight?._Z9t?.ins)),"model"),rpc=__captureESMFunction((__esmLocal2=(()=>W._Ba?._Yo?.marryFight?._qGt?.ins)),"rpc");

const own=__captureESMFunction((__esmLocal3=(()=>actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED)),"own");

const map=__captureESMFunction((__esmLocal4=(()=>Number(W._C?._Mn?._Cn?.currentID))),"map");

function release(){if(S.lease)W.KVPV?.core?.scene?.release?.('daily');S.lease=false;const stage=W._Ba?._Co?._Mo?.ins;if(S.stageAuto===true&&stage?.auto===false&&!__getKVPV2()?.hold?.())stage.auto=true;S.stageAuto=null;}
__esmLocal5=release;


function safe(){const q=__getKVPV1()?.quickState?.(),b=W._Ba;return b?._rJ?._O$?.ins?.isDead===false&&b?._$a?.SceneUtil?.isCommonScene===true&&b?._$a?._yo?.ins?.isInMission===false&&q?.running===true&&['rảnh','ranh'].includes(q.job)&&!W.KVPV?.core?.scene?.status?.()?.owner&&!b?._cm?._q3t?.ins?.getHasTeams?.()&&!__getKVPV3()?.status?.(false)?.running&&Date.now()>=Number(W.__KVPV_USER_UI_UNTIL||0)&&__getKVPV0()?.beforeTask?.()!==true;}
__esmLocal6=safe;


function tick(){try{

if(!own())return;const m=model(),r=rpc();if(!m||!r){S.reason='waiting_native_model';return;}

if(S.pending){const p=S.pending;

 if(p.kind==='refresh'){if(m.getFightInfo?.()!==p.list&&m.getCanRef?.()===false){S.pending=null;S.confirmed++;S.reason='free_refresh_confirmed';}else{S.reason='waiting_refresh_ack_no_retry';return;}}

 else{if(map()===2391){p.entered=true;W.KVPV?.core?.scene?.renew?.('daily');S.reason='native_arena_battle';return;}

 const count=Number(m.getRemainCount?.()),list=m.getFightInfo?.(),won=Array.isArray(list)&&list.some(__captureESMFunction((__esmLocal8=(x=>Number(x?.[2])===p.tier&&Number(x?.[3])===1)),""));

 if(W._Ba?._$a?.SceneUtil?.isCommonScene===true&&(p.entered||(count<p.count&&won&&list!==p.list))){release();S.pending=null;S.confirmed++;S.reason='battle_return_confirmed';}else{W.KVPV?.core?.scene?.renew?.('daily');S.reason='waiting_battle_ack_no_retry';return;}}

}

if(!['10228867268946','10228867268941'].includes(actor)){S.reason='account_not_selected_unmarried';return;}

if(!safe()){S.reason='yield_current_activity';return;}if(Date.now()-S.lastAction<5000)return;

if(!S.queried){S.queried=true;S.lastAction=Date.now();r.GetMarryArenaInfo?.();r.GetMarryArenaRankInfo?.();r.GetMarryArenaChallengeList?.();S.reason='refreshing_readonly_state';return;}

const count=Number(m.getRemainCount?.()),wife=m.getWifeInfo?.();if(!Number.isInteger(count)||count<1){S.reason='no_available_challenge_turns';return;}if(!Array.isArray(wife)||wife.length<2){S.reason='waiting_couple_data';return;}

const list=m.getFightInfo?.();if(!Array.isArray(list)||!list.length){S.reason='waiting_opponent_list';return;}
const teamPower=Number(m.getTotalFightVal?.());if(!Number.isFinite(teamPower)||teamPower<=0){S.reason='waiting_team_power';return;}
const available=list.filter(__captureESMFunction((__esmLocal9=(x=>Array.isArray(x)&&Number(x[3])===0&&Number.isInteger(x[2])&&x[2]>=1&&x[2]<=4&&Number.isFinite(Number(x[1])))),""));
const candidates=available.filter(__captureESMFunction((__esmLocal10=(x=>teamPower>Number(x[1]))),"")).sort(__captureESMFunction((__esmLocal11=((a,b)=>Number(a[1])-Number(b[1]))),""));

if(candidates.length){const tier=candidates[0][2],entry=W._Ba?._sst?._Cht?.inst;if(typeof entry?.rqEtScene!=='function'||W.KVPV?.core?.scene?.acquire?.('daily','marry-arena')!==true){S.reason='waiting_scene_permission';return;}

 S.lease=true;const stage=W._Ba?._Co?._Mo?.ins;S.stageAuto=stage?.auto===true;if(stage?.auto===true)stage.auto=false;

 S.pending={kind:'battle',tier,count,list,entered:false,at:Date.now()};S.lastAction=Date.now();S.entries++;entry.rqEtScene(2391,tier,[1]);S.reason='single_free_turn_battle_requested';return;

}

if(m.getCanRef?.()!==true){S.reason=available.length?'no_opponent_weaker_than_team':'waiting_free_refresh_no_purchase';return;}

if(typeof r.FlushMarryArenaChallengeList!=='function')return;

S.pending={kind:'refresh',list,at:Date.now()};S.lastAction=Date.now();S.refreshes++;r.FlushMarryArenaChallengeList();S.reason='free_refresh_requested';

}catch(e){S.error=String(e.message||e);S.reason='error_no_retry';}}
__esmLocal7=tick;


function stop(reason){if(S.timer!==null)(__getKVPV5()?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;if(reason!=='reload')release();}
__esmLocal12=stop;


W.KVPV_MARRY_ARENA=Object.freeze({sync:tick,stop,status:__captureESMFunction((__esmLocal13=(()=>({enabled:true,reason:S.reason,lastError:S.error,entries:S.entries,freeRefreshes:S.refreshes,confirmed:S.confirmed,teamPower:model()?.getTotalFightVal?.()??null,remaining:model()?.getRemainCount?.()??null,freeRefresh:model()?.getCanRef?.()===true,pending:S.pending?{kind:S.pending.kind,tier:S.pending.tier,at:S.pending.at}:null,allowKNB:false,selectedAccount:['10228867268946','10228867268941'].includes(actor)}))),"status"),_handoff:__captureESMFunction((__esmLocal14=(()=>({actor,pending:S.pending,lastAction:S.lastAction,entries:S.entries,refreshes:S.refreshes,confirmed:S.confirmed,lease:S.lease,stageAuto:S.stageAuto}))),"_handoff")});

S.timer=(__getKVPV5()?.timers?.setInterval??W.setInterval)(tick,1000);tick();

})),""))();


}
export {getKVPV_MARRY_ARENA} from '../api.mjs';
export const api=Object.freeze({
  get KVPV_MARRY_ARENA(){return globalThis.KVPV_MARRY_ARENA;},
});