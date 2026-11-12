import {getKVPV_DAILY as __getKVPV0,getKVPV_HITRUN1 as __getKVPV1,getKVPV_TIEN_TON_AUTO as __getKVPV2,getKVPV_V1 as __getKVPV3} from '../api.mjs';
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
export {__esmLocal0 as local_anonymous_1_1_0};
export {__esmLocal1 as local_model_1};
export {__esmLocal2 as local_rpc_2};
export {__esmLocal3 as local_manager_3};
export {__esmLocal4 as local_owned_4};
export {__esmLocal5 as local_clock_5};
export {__esmLocal6 as local_anonymous_11_85_6};
export {__esmLocal7 as local_data_7};
export {__esmLocal8 as local_note_8};
export {__esmLocal9 as local_disableAuto_9};
export {__esmLocal10 as local_tick_10};
export {__esmLocal11 as local_status_11};
export {__esmLocal12 as local_stop_12};
export {__esmLocal13 as local_start_13};
export {__esmLocal14 as local_history_14};
export {__esmLocal15 as local_anonymous_54_100_15};
export {__esmLocal16 as local__handoff_16};
export function initialize(){
(__captureESMFunction((__esmLocal0=(() => {
 'use strict';
 const W=window,NS=W.KVPV||(W.KVPV={}),actor=String(W.__KVPV_OWN_ACTOR_ID||'');
 const old=__getKVPV2(),carry=old?._handoff?.();old?.stop?.(true);if(NS.tienTon!==old)NS.tienTon?.stop?.();
 if(!actor||String(W._Ba?._rJ?._O$?.ins?.actorId??'')!==actor)return;
 const same=carry?.actor===actor,C={enabled:false,pollMs:1000,windowStart:1170,windowEnd:1185};
 const S={timer:null,reason:'waiting_window',lastError:'',ownedAuto:same?carry.ownedAuto:false,openKey:same?carry.openKey:null,enableKey:same?carry.enableKey:null,queueKey:same?carry.queueKey:null,queueAt:same?carry.queueAt:0,queueAttempts:same?carry.queueAttempts:0,claimKey:same?carry.claimKey:null,claimAt:same?carry.claimAt:0,claimAttempts:same?carry.claimAttempts:0,claims:same?carry.claims:0,refreshDay:same?carry.refreshDay:null,panelOpens:same?carry.panelOpens:0,autoEnables:same?carry.autoEnables:0,history:same?carry.history.slice(-30):[]};
 const model=__captureESMFunction((__esmLocal1=(()=>W._Ba?._Xit?._nst?.inst)),"model"),rpc=__captureESMFunction((__esmLocal2=(()=>W._Ba?._Xit?._hst?.inst)),"rpc"),manager=__captureESMFunction((__esmLocal3=(()=>W._ft?._Y4n?.ins)),"manager");
 const owned=__captureESMFunction((__esmLocal4=(()=>!W.__KVPV_UNIVERSAL_HALTED&&String(W._Ba?._rJ?._O$?.ins?.actorId??'')===actor)),"owned");
 const formatter=new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Ho_Chi_Minh',hourCycle:'h23',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit'});
 function clock(){const p=Object.fromEntries(formatter.formatToParts(new Date()).map(__captureESMFunction((__esmLocal6=(x=>[x.type,x.value])),"")));return {day:p.year+'-'+p.month+'-'+p.day,minute:Number(p.hour)*60+Number(p.minute)};}
__esmLocal5=clock;

 function data(){const c=clock(),m=model(),score=m?.ttiScore,event=W._Ba?._sst?._ist?.inst?.getCpSceneStateByType?.(16),map=Number(W._C?._Mn?._Cn?.currentID??W._Ba?._$a?._yo?.ins?.intoSce?.[0]);return {day:c.day,withinHours:c.minute>=C.windowStart&&c.minute<C.windowEnd,open:Number(event?.[2])===2,rest:Array.isArray(score)&&Number.isFinite(Number(score[3]))?Number(score[3]):null,participated:Number(m?.times?.[0])||0,autoNative:m?.atMatch===true,map,arena:map===2171||W._Ba?._$a?._yo?.ins?.isInArena===true,matching:Number(W._Ba?._cm?._vJ?.ins?.matState),common:W._Ba?._$a?.SceneUtil?.isCommonScene===true};}
__esmLocal7=data;

 function note(kind){S.history.push({at:Date.now(),kind});if(S.history.length>40)S.history.shift();}
__esmLocal8=note;

 function claimReadyAward(d){
  const states=model()?.joinAwardStates;
  if(S.claimKey){
   const index=Number(S.claimKey.split('/').pop()),state=states?.[index];
   if(Array.isArray(state)&&Number(state[1])!==1){
    S.claimKey=null;S.claimAt=0;S.claimAttempts=0;S.claims++;note('award_claim_acknowledged');return true;
   }
   if(Date.now()-S.claimAt<15000){S.reason='waiting_award_claim_ack';return true;}
   if(S.claimAttempts>=3){S.reason='award_claim_retry_limit';return true;}
  }else{
   const index=Array.isArray(states)?states.findIndex((state)=>Number(state?.[1])===1):-1;
   if(index<0)return false;
   S.claimKey=d.day+'/'+index;S.claimAttempts=0;
  }
  const index=Number(S.claimKey.split('/').pop()),claimRpc=rpc();
  if(typeof claimRpc?.getTtiJoinAward!=='function'){S.reason='native_award_claim_unavailable';return true;}
  S.claimAt=Date.now();S.claimAttempts++;
  claimRpc.getTtiJoinAward(index);
  S.reason='native_award_claim_requested';note('award_claim_requested_'+index);
  return true;
 }
 function disableAuto(){if(S.ownedAuto&&owned()&&model()?.atMatch===true){model().atMatch=false;note('native_auto_disabled');}S.ownedAuto=false;}
__esmLocal9=disableAuto;

 function tick(){if(!C.enabled)return;try{
  if(!owned()){S.reason='actor_changed';return;}
  const d=data(),daily=__getKVPV0(),q=daily?.quickState?.();
  if(daily?.config?.enableTienTonAuto===false||q?.running===false||NS.events?.config?.enabled===false){disableAuto();S.reason='daily_or_event_disabled';return;}
  if(S.refreshDay!==d.day&&typeof rpc()?.getTti==='function'){S.refreshDay=d.day;rpc().getTti();note('native_info_requested');return;}
  if(claimReadyAward(d))return;
  if(!d.withinHours){disableAuto();S.reason='outside_1930_1945';return;}
  if(!d.open){disableAuto();S.reason='waiting_server_open';return;}
  if(d.rest===null){S.reason='waiting_server_attempts';return;}
  if(d.rest<=0){disableAuto();S.reason='attempts_exhausted';return;}
  if(d.arena){S.reason='native_fight_in_progress';return;}
  if(d.matching===0||d.matching===1){S.reason='native_matching_in_progress';return;}
  if(!d.common){S.reason='waiting_common_map';return;}
  if(q?.job&&!['rảnh','ranh','idle'].includes(String(q.job))){S.reason='waiting_daily_job';return;}
  if(__getKVPV1()?.status?.(false)?.running===true){S.reason='waiting_current_combat';return;}
  if(Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)){S.reason='waiting_user_ui';return;}
  const reserve=NS.timeline?.reservation?.({atMs:Date.now(),flags:daily?.config||{},excludeKeys:['tien_ton'],forTask:'long'});
  if(reserve&&!(reserve.key==='vinh_du'&&reserve.phase==='upcoming')){S.reason='reserved_'+reserve.key;return;}
  const entry=W._Ba?._sst?._Cht?.inst;if(typeof entry?.checkEnterScene!=='function'||!entry.checkEnterScene(2171)){S.reason='native_entry_denied';return;}
  const key=d.day+'/'+d.rest+'/'+d.participated,p=manager();
  let panel=p?.getPanelById?.(203)??p?.getDialogById?.(203);
  const visible=p?.isOpened?.(203)===true;
  if(!visible){
   if(S.openKey===key){S.reason='waiting_native_panel_or_result';return;}
   if(typeof p?.open!=='function'){S.reason='panel_manager_unavailable';return;}
   const gate=NS.core?.scene;if(gate?.acquire&&gate.acquire('daily','tien-ton-native-auto')!==true){S.reason='scene_lease_denied';return;}
   S.openKey=key;S.panelOpens++;note('open_panel_203');
   try{p.open(203);}finally{gate?.release?.('daily');}
   S.reason='opening_panel_203';return;
  }
  if(typeof panel?._n_i!=='function'||panel._n_i()!==true){S.reason='native_auto_condition_denied';return;}
  if(model()?.atMatch!==true){
   if(typeof panel?._U4i!=='function'||!panel.autoBtn){S.reason='waiting_native_auto_button';return;}
   panel._U4i();
   if(model()?.atMatch===true){S.ownedAuto=true;S.enableKey=key;S.autoEnables++;note('native_auto_button_activated');}
   else{S.ownedAuto=false;S.reason='native_auto_not_enabled';return;}
  }
  if(S.queueKey!==key){S.queueKey=key;S.queueAt=0;S.queueAttempts=0;}
  if(S.queueAt&&Date.now()-S.queueAt<15000){S.reason='waiting_native_match_ack';return;}
  if(S.queueAttempts>=3){S.reason='native_match_retry_limit';return;}
  if(typeof panel?._G4i!=='function'){S.reason='native_match_button_unavailable';return;}
  S.queueAt=Date.now();S.queueAttempts++;
  panel._G4i();
  S.reason='native_match_requested';note('native_match_requested');
 }catch(e){S.lastError=String(e.message||e).slice(0,300);S.reason='error';}}
__esmLocal10=tick;

 function status(){let d=null;try{d=data();}catch(_){}return {version:'1.0.0',actor,enabled:C.enabled,timerActive:S.timer!==null,reason:S.reason,lastError:S.lastError,ownedAuto:S.ownedAuto,challengeLeft:d?.rest??null,autoNative:d?.autoNative??false,withinHours:d?.withinHours??false,serverOpen:d?.open??false,map:d?.map??null,queueAttempts:S.queueAttempts,queuePending:!!S.queueAt&&Date.now()-S.queueAt<15000,claimPending:!!S.claimKey,claimAttempts:S.claimAttempts,claims:S.claims,panelOpens:S.panelOpens,autoEnables:S.autoEnables,panelId:203,mapId:2171,allowPurchase:false};}
__esmLocal11=status;

 function stop(preserveNative=false){C.enabled=false;if(S.timer!==null){(__getKVPV3()?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;}if(!preserveNative)disableAuto();S.reason=preserveNative?'reloading':'stopped';return status();}
__esmLocal12=stop;

 function start(){C.enabled=true;if(S.timer===null)S.timer=(__getKVPV3()?.timers?.setInterval??W.setInterval)(tick,C.pollMs);tick();return status();}
__esmLocal13=start;

 const api=Object.freeze({version:'1.0.0',config:C,start,stop,tick,status,history:__captureESMFunction((__esmLocal14=(()=>S.history.map(__captureESMFunction((__esmLocal15=(x=>({...x}))),"")))),"history"),_handoff:__captureESMFunction((__esmLocal16=(()=>({actor,enabled:C.enabled,ownedAuto:S.ownedAuto,openKey:S.openKey,enableKey:S.enableKey,queueKey:S.queueKey,queueAt:S.queueAt,queueAttempts:S.queueAttempts,claimKey:S.claimKey,claimAt:S.claimAt,claimAttempts:S.claimAttempts,claims:S.claims,refreshDay:S.refreshDay,panelOpens:S.panelOpens,autoEnables:S.autoEnables,history:S.history.slice()}))),"_handoff")});
 W.KVPV_TIEN_TON_AUTO=api;NS.tienTon=api;
})),""))();

}
export {getKVPV_TIEN_TON_AUTO} from '../api.mjs';
export const api=Object.freeze({
  get KVPV_TIEN_TON_AUTO(){return globalThis.KVPV_TIEN_TON_AUTO;},
});