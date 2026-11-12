import {getKVPV_DAILY as __getKVPV0,getKVPV_TIEN_DUYEN_DAI_CHIEN as __getKVPV1,getKVPV_V1 as __getKVPV2} from '../api.mjs';
export function call_KVPV_TIEN_DUYEN_DAI_CHIEN_start(...args){const target=globalThis["KVPV_TIEN_DUYEN_DAI_CHIEN"];const fn=globalThis["KVPV_TIEN_DUYEN_DAI_CHIEN"]?.["start"];if(typeof fn!=='function')throw Error("KVPV_TIEN_DUYEN_DAI_CHIEN.start is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_TIEN_DUYEN_DAI_CHIEN_stop(...args){const target=globalThis["KVPV_TIEN_DUYEN_DAI_CHIEN"];const fn=globalThis["KVPV_TIEN_DUYEN_DAI_CHIEN"]?.["stop"];if(typeof fn!=='function')throw Error("KVPV_TIEN_DUYEN_DAI_CHIEN.stop is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_TIEN_DUYEN_DAI_CHIEN_tick(...args){const target=globalThis["KVPV_TIEN_DUYEN_DAI_CHIEN"];const fn=globalThis["KVPV_TIEN_DUYEN_DAI_CHIEN"]?.["tick"];if(typeof fn!=='function')throw Error("KVPV_TIEN_DUYEN_DAI_CHIEN.tick is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_TIEN_DUYEN_DAI_CHIEN_status(...args){const target=globalThis["KVPV_TIEN_DUYEN_DAI_CHIEN"];const fn=globalThis["KVPV_TIEN_DUYEN_DAI_CHIEN"]?.["status"];if(typeof fn!=='function')throw Error("KVPV_TIEN_DUYEN_DAI_CHIEN.status is not available");return Reflect.apply(fn,target,args);}
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
let __esmLocal20;
let __esmLocal21;
let __esmLocal22;
let __esmLocal23;
let __esmLocal24;
let __esmLocal25;
let __esmLocal26;
let __esmLocal27;
let __esmLocal28;
export {__esmLocal0 as local_anonymous_2_1_0};
export {__esmLocal1 as local_owned_1};
export {__esmLocal2 as local_role_2};
export {__esmLocal3 as local_map_3};
export {__esmLocal4 as local_inEvent_4};
export {__esmLocal5 as local_common_5};
export {__esmLocal6 as local_hasTeam_6};
export {__esmLocal7 as local_married_7};
export {__esmLocal8 as local_entryRpc_8};
export {__esmLocal9 as local_enterEvent_9};
export {__esmLocal10 as local_eventOpen_10};
export {__esmLocal11 as local_anonymous_34_74_11};
export {__esmLocal12 as local_component_12};
export {__esmLocal13 as local_restore_13};
export {__esmLocal14 as local_releaseHooks_14};
export {__esmLocal15 as local_hook_15};
export {__esmLocal16 as local_mainBoss_16};
export {__esmLocal17 as local_installMain8001_17};
export {__esmLocal18 as local_anonymous_50_34_18};
export {__esmLocal19 as local_anonymous_50_42_19};
export {__esmLocal20 as local_anonymous_53_47_20};
export {__esmLocal21 as local_anonymous_54_47_21};
export {__esmLocal22 as local_anonymous_60_32_22};
export {__esmLocal23 as local_anonymous_60_40_23};
export {__esmLocal24 as local_reconcile_24};
export {__esmLocal25 as local_tick_25};
export {__esmLocal26 as local_start_26};
export {__esmLocal27 as local_stop_27};
export {__esmLocal28 as local_status_28};
export function initialize(){
 
(__captureESMFunction((__esmLocal0=(()=>{'use strict';
 const W=window,K=W.KVPV||(W.KVPV={}),old=__getKVPV1();
 try{old?.stop?.('reload');}catch(_){}
 const MAIN='10228867268946',CLONE='10228867268941',BOSS=2812,STAGES=[2811,2813];
 const actor=String(W.__KVPV_OWN_ACTOR_ID||''),S={enabled:false,timer:null,reason:'waiting_event',filtered:0,skillCalls:0,error:'',entryPending:false,entryAt:0,entryMap:0,entrySent:0,entryConfirmed:0};
 const G={selector:null,combat:null};
 const owned=__captureESMFunction((__esmLocal1=(()=>!!actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED)),"owned");
 const role=__captureESMFunction((__esmLocal2=(()=>actor===MAIN?'main':actor===CLONE?'clone':'none')),"role");
 const map=__captureESMFunction((__esmLocal3=(()=>Number(W._Ba?._$a?._yo?.ins?.intoSce?.[0]??W._C?._Mn?._Cn?.currentID))),"map");
 const inEvent=__captureESMFunction((__esmLocal4=(()=>[...STAGES,BOSS].includes(map()))),"inEvent");
 const common=__captureESMFunction((__esmLocal5=(()=>{try{return W._Ba?._$a?.SceneUtil?.isCommonSceneByType?.(W._Ba?._$a?.SceneUtil?.curScene)===true;}catch(_){return W._Ba?._$a?.SceneUtil?.isCommonScene===true;}})),"common");
 const hasTeam=__captureESMFunction((__esmLocal6=(()=>!!W._Ba?._cm?._q3t?.ins?.getHasTeams?.())),"hasTeam");
 const married=__captureESMFunction((__esmLocal7=(()=>W._Ba?._Yo?._tdt?.instance?.isMarry?.()===true)),"married");
 const entryRpc=__captureESMFunction((__esmLocal8=(()=>W._Ba?._sst?._Cht?.inst)),"entryRpc");
 function enterEvent(){
  if(!eventOpen()||inEvent()){S.reason=inEvent()?'event_scene_confirmed':'waiting_tien_duyen_tac_chien_window';return false;}
  if(S.entryPending){
   if(inEvent()){S.entryPending=false;S.entryConfirmed++;return true;}
   if(Date.now()-S.entryAt<30000){S.reason='waiting_event_entry_ack';return false;}
   S.reason='event_entry_sent_waiting_ack';return false;
  }
  if(!common()){S.reason='waiting_common_scene';return false;}
  if(hasTeam()){S.reason='leave_team_before_event_entry';return false;}
  if(!married()){S.reason='need_marry_unlock_859';return false;}
  if(W._rka?.inst?.getFcIsOpen?.(859)!==true){S.reason='event_feature_859_closed';return false;}
  const rpc=entryRpc();if(typeof rpc?.rqEtScene!=='function'){S.reason='native_entry_rpc_unavailable';return false;}
  const target=W._Ba?._B_?._I_t?.ins?.getIsCrossGlobal?.()===true?2813:2811;
  S.entryPending=true;S.entryAt=Date.now();S.entryMap=target;S.entrySent++;
  try{const ok=rpc.rqEtScene(target);if(ok===false){S.entryPending=false;S.reason='event_entry_rejected_locally';return false;}}
  catch(e){S.entryPending=false;throw e;}
  S.reason='event_entry_requested';return false;
 }
__esmLocal9=enterEvent;

 function eventOpen(){try{return __getKVPV0()?.lichData?.()?.active?.some(__captureESMFunction((__esmLocal11=(e=>e?.key==='tien_duyen_tac_chien')),""))===true;}catch(_){return false;}}
__esmLocal10=eventOpen;

 const component=__captureESMFunction((__esmLocal12=((key)=>{const r=W._C?._Ba?.instance?.getRole?.(Number(actor)),id=W._d?._Yct?.[key];return id?r?.getComponent?.(id):null;})),"component");
 function restore(h){if(!h?.obj||h.obj[h.key]!==h.wrapper)return;try{if(h.descriptor)Object.defineProperty(h.obj,h.key,h.descriptor);else delete h.obj[h.key];}catch(e){S.error=String(e?.message??e);}}
__esmLocal13=restore;

 function releaseHooks(){restore(G.selector);restore(G.combat);G.selector=G.combat=null;}
__esmLocal14=releaseHooks;

 function hook(slot,obj,key,factory){
  if(!obj||typeof obj[key]!=='function')return null;
  const prior=G[slot];if(prior?.obj===obj&&obj[key]===prior.wrapper)return prior;
  restore(prior);G[slot]=null;
  const descriptor=Object.getOwnPropertyDescriptor(obj,key),native=obj[key],wrapper=factory(native);
  try{Object.defineProperty(obj,key,{configurable:descriptor?.configurable??true,writable:descriptor?.writable??true,enumerable:descriptor?.enumerable??false,value:wrapper});return G[slot]={obj,key,wrapper,descriptor};}
  catch(e){S.error=String(e?.message??e);return null;}
 }
__esmLocal15=hook;

 function mainBoss(){return S.enabled&&owned()&&role()==='main'&&map()===BOSS;}
__esmLocal16=mainBoss;

 function installMain8001(){
  if(!mainBoss()){releaseHooks();return;}
  const selector=component('_Eet'),combat=component('_Het');
  hook('selector',selector,'_f7t',__captureESMFunction((__esmLocal18=(native=>__captureESMFunction((__esmLocal19=(function(active,common,mode,...rest){
   if(!mainBoss())return native.call(this,active,common,mode,...rest);
   if(mode!==1){S.filtered++;return -1;}
   const a=Array.isArray(active)?active.filter(__captureESMFunction((__esmLocal20=(r=>Number(r?.[0])===8001)),"")):[];
   const c=Array.isArray(common)?common.filter(__captureESMFunction((__esmLocal21=(r=>Number(r?.[0])===8001)),"")):[];
   if(!a.length&&!c.length){S.filtered++;return -1;}
   const picked=Number(native.call(this,a,c,mode,...rest));
   if(picked!==8001){S.filtered++;return -1;}
   S.skillCalls++;return 8001;
  })),""))),""));
  hook('combat',combat,'combat',__captureESMFunction((__esmLocal22=(native=>__captureESMFunction((__esmLocal23=(function(skill,...args){
   if(mainBoss()&&Number(skill)!==8001){S.filtered++;return;}
   if(mainBoss())S.skillCalls++;
   return native.call(this,skill,...args);
  })),""))),""));
 }
__esmLocal17=installMain8001;

 function reconcile(){
  if(!owned()){releaseHooks();K.marryBattle?.stop?.();S.reason='actor_changed_or_halted';return;}
  if(role()==='none'){releaseHooks();K.marryBattle?.stop?.();S.reason='account_not_assigned';return;}
  if(eventOpen()&&!inEvent()){enterEvent();installMain8001();return;}
  if(inEvent()){
   const battle=K.marryBattle;
   if(!battle||battle.version!=='11.8.0'){S.reason='native_battle_module_unavailable';return;}
   battle.config.mainId=MAIN;battle.config.cloneId=CLONE;
   if(S.entryPending){S.entryPending=false;S.entryConfirmed++;}
   if(battle.status?.().enabled!==true)battle.start();
   S.reason=map()===BOSS?(role()==='main'?'main_boss_8001':'clone_boss_chest_priority'):'native_20_box_stage';
  }else{
   const battle=K.marryBattle;
   if(battle?.status?.().enabled===true)battle.stop();
   S.reason='waiting_tien_duyen_tac_chien_window';
  }
  installMain8001();
 }
__esmLocal24=reconcile;

 function tick(){try{reconcile();}catch(e){S.error=String(e?.message??e);S.reason='error';}}
__esmLocal25=tick;

 function start(){S.enabled=true;if(S.timer===null)S.timer=(__getKVPV2()?.timers?.setInterval??W.setInterval)(tick,250);tick();return status();}
__esmLocal26=start;

 function stop(reason='manual'){S.enabled=false;if(S.timer!==null){(__getKVPV2()?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;}releaseHooks();if(K.marryBattle?.status?.().enabled===true)K.marryBattle.stop();S.reason=reason;return status();}
__esmLocal27=stop;

 function status(){return {enabled:S.enabled,actor,role:role(),map:map(),eventOpen:eventOpen(),reason:S.reason,entry:{pending:S.entryPending,target:S.entryMap,sent:S.entrySent,confirmed:S.entryConfirmed},mainSkill:role()==='main'&&map()===BOSS?8001:null,filtered:S.filtered,skillCalls:S.skillCalls,battle:K.marryBattle?.status?.()??null,error:S.error};}
__esmLocal28=status;

 W.KVPV_TIEN_DUYEN_DAI_CHIEN=Object.freeze({start,stop,tick,status});
 if(owned()&&role()!=='none')start();
})),""))();

}
export {getKVPV_TIEN_DUYEN_DAI_CHIEN} from '../api.mjs';
export const api=Object.freeze({
  get KVPV_TIEN_DUYEN_DAI_CHIEN(){return globalThis.KVPV_TIEN_DUYEN_DAI_CHIEN;},
});