import {getKVPV_BOSS_TEAM as __getKVPV0,getKVPV_DAILY as __getKVPV1,getKVPV_DEMON_KING_RECOVERY as __getKVPV2,getKVPV_ENTRY_POLICY as __getKVPV3,getKVPV_V1 as __getKVPV4} from '../api.mjs';
export function call_KVPV_DEMON_KING_RECOVERY_sync(...args){const target=globalThis["KVPV_DEMON_KING_RECOVERY"];const fn=globalThis["KVPV_DEMON_KING_RECOVERY"]?.["sync"];if(typeof fn!=='function')throw Error("KVPV_DEMON_KING_RECOVERY.sync is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_DEMON_KING_RECOVERY_stop(...args){const target=globalThis["KVPV_DEMON_KING_RECOVERY"];const fn=globalThis["KVPV_DEMON_KING_RECOVERY"]?.["stop"];if(typeof fn!=='function')throw Error("KVPV_DEMON_KING_RECOVERY.stop is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_DEMON_KING_RECOVERY_status(...args){const target=globalThis["KVPV_DEMON_KING_RECOVERY"];const fn=globalThis["KVPV_DEMON_KING_RECOVERY"]?.["status"];if(typeof fn!=='function')throw Error("KVPV_DEMON_KING_RECOVERY.status is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_DEMON_KING_RECOVERY__handoff(...args){const target=globalThis["KVPV_DEMON_KING_RECOVERY"];const fn=globalThis["KVPV_DEMON_KING_RECOVERY"]?.["_handoff"];if(typeof fn!=='function')throw Error("KVPV_DEMON_KING_RECOVERY._handoff is not available");return Reflect.apply(fn,target,args);}
function __captureESMFunction(fn,name){
  if(fn.name!==name)Object.defineProperty(fn,"name",{value:name,configurable:true});
  return fn;
}
let __esmLocal0;
let __esmLocal1;
let __esmLocal2;
let __esmLocal3;
let __esmLocal4;
export {__esmLocal0 as local_anonymous_4_1_0};
export {__esmLocal1 as local_tick_1};
export {__esmLocal2 as local_stop_2};
export {__esmLocal3 as local_status_3};
export {__esmLocal4 as local__handoff_4};
export function initialize(){

/* Recover only an unmanaged, completed native Demon King instance. Never retry unknown exit. */

(__captureESMFunction((__esmLocal0=(() => {

 'use strict';const W=window,old=__getKVPV2(),carry=old?._handoff?.();old?.stop?.();

 const actor=String(W.__KVPV_OWN_ACTOR_ID||''),same=carry?.actor===actor;

 const S={timer:null,enabled:true,key:same?carry.key:null,since:same?carry.since:0,pending:same?carry.pending:null,selected:same?carry.selected:null,retargets:same?carry.retargets:0,exits:same?carry.exits:0,confirmed:same?carry.confirmed:0,reason:'observing',error:''};

 function tick(){if(__getKVPV3()?.manual===true)return;try{

  if(!S.enabled||!actor||String(W._Ba?._rJ?._O$?.ins?.actorId??'')!==actor||W.__KVPV_UNIVERSAL_HALTED)return;

  const scene=W._Ba?._$a,entry=scene?._yo?.ins?.intoSce,map=Number(W._C?._Mn?._Cn?.currentID??entry?.[0]);

  if(scene?.SceneUtil?.isCommonScene===true){if(S.pending){S.confirmed++;S.pending=null;}S.key=null;S.selected=null;S.reason='common_scene';return;}

  const type=Number(W._ft?._po?.ins?.getCfgById?.(map)?.[7]);

  if(type!==10||Number(scene?.SceneUtil?.curScene)!==10||Number(entry?.[0])!==map){S.key=null;S.reason='other_scene_preserved';return;}

  if(S.pending){S.reason='waiting_exit_ack_no_retry';return;}

  const daily=__getKVPV1()?.quickState?.(),lease=W.KVPV?.core?.scene?.status?.();

  if(daily?.running!==true||!['rảnh','ranh'].includes(daily?.job)||lease?.owner||__getKVPV0()?.priority?.()){S.key=null;S.reason='existing_owner_preserved';return;}

  if(Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)){S.key=null;S.reason='user_using_ui';return;}

  const cfg=W._ft?._$st?.ins?.getCfgByMapIdAndLv?.(map,entry?.[3]),id=Number(cfg?.[2]);

  if(!Number.isSafeInteger(id)||id<=0){S.key=null;S.reason='unknown_instance_boss';return;}

  const flag=W._Ba?._sst?._ist?.inst?.getBsInfoById?.(id)?.[2]?.[0];

  const key=map+'/'+entry[3]+'/'+id;

  if(flag===0||flag===false){

   const liveKey='live/'+key;

   if(S.key!==liveKey){S.key=liveKey;S.since=Date.now();S.reason='observing_unmanaged_live_boss';return;}

   if(Date.now()-S.since>=5000&&S.selected!==key&&typeof W._Ba?._rJ?._O$?.ins?.selectTar==='function'){

    S.selected=key;S.retargets++;W._Ba._rJ._O$.ins.selectTar(1,id);S.reason='native_target_selected_once';

   }else S.reason='live_boss_native_combat';

   return;

  }

  if(flag!==1&&flag!==true){S.key=null;S.reason='unknown_boss_preserved';return;}

  if(S.key!==key){S.key=key;S.since=Date.now();S.reason='confirming_completed_orphan';return;}

  if(Date.now()-S.since<5000||typeof scene?._Gr?.ins?.exitDungeon!=='function')return;

  S.pending={key,at:Date.now()};S.exits++;S.reason='waiting_exit_ack_no_retry';scene._Gr.ins.exitDungeon();

 }catch(e){S.error=String(e?.message||e);S.reason='error_no_retry';}}
__esmLocal1=tick;


 function stop(){S.enabled=false;if(S.timer!==null)(__getKVPV4()?.timers?.clearInterval??W.clearInterval)(S.timer);}
__esmLocal2=stop;


 W.KVPV_DEMON_KING_RECOVERY=Object.freeze({sync:tick,stop,status:__captureESMFunction((__esmLocal3=(()=>({enabled:S.enabled,reason:S.reason,lastError:S.error,pending:S.pending,retargets:S.retargets,exits:S.exits,confirmed:S.confirmed}))),"status"),_handoff:__captureESMFunction((__esmLocal4=(()=>({actor,key:S.key,since:S.since,pending:S.pending,selected:S.selected,retargets:S.retargets,exits:S.exits,confirmed:S.confirmed}))),"_handoff")});

 S.timer=(__getKVPV4()?.timers?.setInterval??W.setInterval)(tick,500);tick();

})),""))();


}
export {getKVPV_DEMON_KING_RECOVERY} from '../api.mjs';
export const api=Object.freeze({
  get KVPV_DEMON_KING_RECOVERY(){return globalThis.KVPV_DEMON_KING_RECOVERY;},
});