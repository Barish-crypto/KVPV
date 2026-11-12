import {getKVPV_ENTRY_POLICY as __getKVPV0,getKVPV_EVENT_PRIORITY as __getKVPV1,getKVPV_GUILD_BOSS as __getKVPV2,getKVPV_HITRUN1 as __getKVPV3,getKVPV_MODE as __getKVPV4,getKVPV_V1 as __getKVPV5} from '../api.mjs';
export function call_KVPV_GUILD_BOSS_sync(...args){const target=globalThis["KVPV_GUILD_BOSS"];const fn=globalThis["KVPV_GUILD_BOSS"]?.["sync"];if(typeof fn!=='function')throw Error("KVPV_GUILD_BOSS.sync is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_GUILD_BOSS_stop(...args){const target=globalThis["KVPV_GUILD_BOSS"];const fn=globalThis["KVPV_GUILD_BOSS"]?.["stop"];if(typeof fn!=='function')throw Error("KVPV_GUILD_BOSS.stop is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_GUILD_BOSS_active(...args){const target=globalThis["KVPV_GUILD_BOSS"];const fn=globalThis["KVPV_GUILD_BOSS"]?.["active"];if(typeof fn!=='function')throw Error("KVPV_GUILD_BOSS.active is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_GUILD_BOSS_priority(...args){const target=globalThis["KVPV_GUILD_BOSS"];const fn=globalThis["KVPV_GUILD_BOSS"]?.["priority"];if(typeof fn!=='function')throw Error("KVPV_GUILD_BOSS.priority is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_GUILD_BOSS_status(...args){const target=globalThis["KVPV_GUILD_BOSS"];const fn=globalThis["KVPV_GUILD_BOSS"]?.["status"];if(typeof fn!=='function')throw Error("KVPV_GUILD_BOSS.status is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_GUILD_BOSS__handoff(...args){const target=globalThis["KVPV_GUILD_BOSS"];const fn=globalThis["KVPV_GUILD_BOSS"]?.["_handoff"];if(typeof fn!=='function')throw Error("KVPV_GUILD_BOSS._handoff is not available");return Reflect.apply(fn,target,args);}
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
export {__esmLocal0 as local_anonymous_5_1_0};
export {__esmLocal1 as local_model_1};
export {__esmLocal2 as local_team_2};
export {__esmLocal3 as local_user_3};
export {__esmLocal4 as local_scene_4};
export {__esmLocal5 as local_map_5};
export {__esmLocal6 as local_common_6};
export {__esmLocal7 as local_owned_7};
export {__esmLocal8 as local_data_8};
export {__esmLocal9 as local_release_9};
export {__esmLocal10 as local_hold_10};
export {__esmLocal11 as local_restore_11};
export {__esmLocal12 as local_tick_12};
export {__esmLocal13 as local_stop_13};
export {__esmLocal14 as local_listener_14};
export {__esmLocal15 as local_ended_15};
export {__esmLocal16 as local_active_16};
export {__esmLocal17 as local_priority_17};
export {__esmLocal18 as local_status_18};
export {__esmLocal19 as local__handoff_19};
export function initialize(){

/* Native Fight Team Boss rally: event 6763 + server inspireEndTime, map 3301.
 * Entry is the free manual challenge action; this module never purchases inspiration. */

(__captureESMFunction((__esmLocal0=(() => {

 'use strict';const W=window,old=__getKVPV2(),carry=old?._handoff?.();old?.stop?.('reload');

 const actor=String(W.__KVPV_OWN_ACTOR_ID||''),same=carry?.actor===actor;

 const S={enabled:true,timer:null,busy:false,pending:same?carry.pending:null,saved:same?carry.saved:null,seen:new Set(same?carry.seen:[]),reason:'waiting_team_inspiration',error:'',refreshAt:0,listener:null};

 const model=__captureESMFunction((__esmLocal1=(()=>W._Ba?._a1?._Rvn?.ins)),"model"),team=__captureESMFunction((__esmLocal2=(()=>W._Ba?._a1?._h1?.inst)),"team"),user=__captureESMFunction((__esmLocal3=(()=>W._Ba?._rJ?._O$?.ins)),"user");

 const scene=__captureESMFunction((__esmLocal4=(()=>W.KVPV?.core?.scene)),"scene"),map=__captureESMFunction((__esmLocal5=(()=>Number(W._C?._Mn?._Cn?.currentID??W._Ba?._$a?._yo?.ins?.intoSce?.[0]))),"map");

 const common=__captureESMFunction((__esmLocal6=(()=>W._Ba?._$a?.SceneUtil?.isCommonScene===true&&W._Ba?._$a?._yo?.ins?.isInMission!==true)),"common");

 const owned=__captureESMFunction((__esmLocal7=(()=>actor&&actor===String(user()?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED)),"owned");

 function data(){const m=model(),t=team(),id=String(t?.getMyFightTeamId?.()??''),until=Number(m?.inspireEndTime),now=Number(W._Sa?.svrTime),left=Number(m?.leftFightTm),layer=Number(m?.curTeamPassLayer),max=Number(W._ft?._uph?.ins?.getMaxLayer?.());

  return {team:id,key:id+'/'+until+'/'+layer,until,hasTeam:t?.hasFightTeam?.()===true&&id!==''&&id!=='0',live:Number.isFinite(now)&&Number.isFinite(until)&&until>now,

    canFight:Number.isFinite(left)&&left>0&&Number.isFinite(layer)&&Number.isFinite(max)&&layer<max,finished:Number.isFinite(left)&&left<=0||Number.isFinite(layer)&&Number.isFinite(max)&&layer>=max};}
__esmLocal8=data;


 function release(){if(scene()?.status?.()?.tag==='guild-boss-priority')scene()?.release?.('combat');}
__esmLocal9=release;


 function hold(){if(!S.saved)S.saved={stage:W._Ba?._Co?._Mo?.ins?.auto===true,armed:__getKVPV4()?.status?.(false)?.autoMaintain===true};

  if(W._Ba?._Co?._Mo?.ins)W._Ba._Co._Mo.ins.auto=false;

  if(__getKVPV4()?.status?.(false)?.autoMaintain||__getKVPV3()?.status?.(false)?.running)__getKVPV4()?.stop?.('fight_team_boss_inspiration_priority');

  scene()?.acquire?.('combat','guild-boss-priority');scene()?.renew?.('combat');

 }
__esmLocal10=hold;


 function restore(){if(S.pending||!S.saved||!common())return;const saved=S.saved;S.saved=null;release();

  if(saved.stage&&W._Ba?._Co?._Mo?.ins&&!__getKVPV1()?.hold?.())W._Ba._Co._Mo.ins.auto=true;if(saved.armed)__getKVPV4()?.armTianQuan?.();}
__esmLocal11=restore;


 function tick(){if(__getKVPV0()?.manual===true)return;if(S.busy||!S.enabled)return;S.busy=true;try{

  if(!owned())return;restore();const d=data(),m=model(),rpc=W._Ba?._sst?._Cht?.inst;

  if(!S.pending){

   if(!d.hasTeam){S.reason='not_in_fight_team';return;}

   if(Date.now()>=S.refreshAt){S.refreshAt=Date.now()+30000;W._Ba?._a1?._qvn?.inst?.getFTBossInfo?.();}

   if(!d.live||!d.canFight||S.seen.has(d.key)){S.reason='waiting_team_inspiration';return;}

   S.seen.add(d.key);S.pending={key:d.key,team:d.team,until:d.until,at:Date.now(),entered:map()===3301,exitSent:false,enterSent:false,nativeAuto:m?.c_isAutoIn===true};

   // Native auto-entry already reacts to 6763; do not become a second sender.

   if(S.pending.nativeAuto)S.pending.enterSent=true;

  }

  const p=S.pending;

  if(!d.hasTeam||d.team!==p.team){S.reason='fight_team_changed_no_entry';if(common()&&!p.enterSent){S.pending=null;restore();}return;}

  if(map()===3301){p.entered=true;scene()?.renew?.('combat');S.reason='fighting_team_boss';

   if((d.finished||p.battleEnded)&&!p.endExitSent&&typeof rpc?.rqEtScene==='function'){p.endExitSent=true;rpc.rqEtScene(0);S.reason='waiting_team_boss_return_ack';}return;

  }

  if(p.entered){if(common()){S.pending=null;restore();release();S.reason='team_boss_completed_resume';}else S.reason='waiting_team_boss_return_ack';return;}

  if(p.nativeAuto){S.reason='waiting_native_auto_entry_ack';return;}

  hold();

  if(user()?.isDead===true){S.reason='waiting_revive_for_team_boss';return;}

  if(!common()){

   if(!p.exitSent&&typeof rpc?.rqEtScene==='function'){p.exitSent=true;rpc.rqEtScene(0);}S.reason='waiting_current_activity_exit_ack';return;

  }

  if(!d.live||!d.canFight){S.pending=null;restore();S.reason='team_inspiration_expired_no_entry';return;}

  const ordinary=W._Ba?._cm?._q3t?.ins;

  if(ordinary?.getHasTeams?.()===true){const type=Number(ordinary.teamtype),rooms=W._Ba?._cm?._u3t?.ins;

   if(!p.roomLeaveSent&&Number.isSafeInteger(type)&&type>0&&typeof rooms?.exitSerAreRoom==='function'){p.roomLeaveSent=true;rooms.exitSerAreRoom([type]);}

   S.reason='waiting_old_room_exit_ack';return;

  }

  if(!p.enterSent&&typeof rpc?.rqEtScene==='function'){p.enterSent=true;rpc.rqEtScene(3301);}

  S.reason=Date.now()-p.at>30000?'team_boss_entry_timeout_no_retry':'waiting_team_boss_entry_ack';

 }catch(e){S.error=String(e);S.reason='error_no_retry';}finally{S.busy=false;}}
__esmLocal12=tick;


 function stop(reason='manual'){S.enabled=false;if(S.timer!==null)(__getKVPV5()?.timers?.clearInterval??W.clearInterval)(S.timer);

  for(const id of [6763,6762,6765])W._Sa?.notify?.off?.(id,S,S.listener);W._Sa?.notify?.off?.(5112,S,S.endListener);if(reason!=='reload'){release();restore();}}
__esmLocal13=stop;


 S.listener=__captureESMFunction((__esmLocal14=(()=>tick())),"listener");for(const id of [6763,6762,6765])W._Sa?.notify?.on?.(id,S,S.listener);

 // Native battle end is only evidence for the current Fight Team Boss scene.

 const ended=__captureESMFunction((__esmLocal15=(()=>{if(map()===3301&&S.pending)S.pending.battleEnded=true;tick();})),"ended");

 W._Sa?.notify?.on?.(5112,S,ended);

 W.KVPV_GUILD_BOSS=Object.freeze({sync:tick,stop,active:__captureESMFunction((__esmLocal16=(()=>S.enabled&&!!S.pending)),"active"),priority:__captureESMFunction((__esmLocal17=(()=>S.enabled&&!!S.pending&&!S.pending.entered)),"priority"),

  status:__captureESMFunction((__esmLocal18=(()=>({enabled:S.enabled,reason:S.reason,pending:S.pending,lastError:S.error,allowKNB:false}))),"status"),_handoff:__captureESMFunction((__esmLocal19=(()=>({actor,pending:S.pending,saved:S.saved,seen:[...S.seen]}))),"_handoff")});

 // Keep the exact native battle-end listener for teardown.

 S.endListener=ended;

 S.timer=(__getKVPV5()?.timers?.setInterval??W.setInterval)(tick,500);tick();

})),""))();


}
export {getKVPV_GUILD_BOSS} from '../api.mjs';
export const api=Object.freeze({
  get KVPV_GUILD_BOSS(){return globalThis.KVPV_GUILD_BOSS;},
});