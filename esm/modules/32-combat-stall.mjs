import {getKVPV_BASIC10 as __getKVPV0,getKVPV_FAR_SCOPE as __getKVPV1,getKVPV_HITRUN1 as __getKVPV2,getKVPV_MODE as __getKVPV3,getKVPV_TH300 as __getKVPV4,getKVPV_THAC_AN_CD0 as __getKVPV5,getKVPV_TQ_BASIC_FORCE as __getKVPV7,getKVPV_XA_MENH_LV2 as __getKVPV8} from '../api.mjs';
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
export {__esmLocal0 as local_anonymous_5_1_0};
export {__esmLocal1 as local_safe_1};
export {__esmLocal2 as local_state_2};
export {__esmLocal3 as local_anonymous_10_33_3};
export {__esmLocal4 as local_snapshot_4};
export {__esmLocal5 as local_anonymous_20_17_5};
export {__esmLocal6 as local_anonymous_24_19_6};
export {__esmLocal7 as local_anonymous_25_23_7};
export {__esmLocal8 as local_anonymous_27_25_8};
export {__esmLocal9 as local_anonymous_28_23_9};
export {__esmLocal10 as local_recover_10};
export {__esmLocal11 as local_anonymous_61_8_11};
export {__esmLocal12 as local_anonymous_62_8_12};
export function initialize(){




(__captureESMFunction((__esmLocal0=(() => {
 'use strict';
 const W=window,KEY='KVPV_COMBAT_STALL';
 const actor=String(W.__KVPV_OWN_ACTOR_ID??'');
 let progressWatch={key:'',since:0,lastSampleAt:0,lastProgressAt:0,samples:0,changes:0,lastHp:''};
 const safe=__captureESMFunction((__esmLocal1=(fn=>{try{return fn();}catch(e){return {error:String(e?.message||e)};}})),"safe");
 const state=__captureESMFunction((__esmLocal2=((obj,...args)=>safe(__captureESMFunction((__esmLocal3=(()=>obj?.status?.(...args)??null)),"")))),"state");
 function observeProgress({own,scene,far,mode,th,basics,hr,target,targetType,targetOcc,targetHp}){
   const now=Date.now(),active=mode?.combatRunning===true||th?.running===true||hr?.running===true||
     (far?.inside===false&&basics?.enabled===true);
   const hp=Array.isArray(targetHp)?targetHp.slice(0,2).map(Number):
     typeof targetHp==='number'&&Number.isFinite(targetHp)?[targetHp]:null;
   if(!own||!active||!target||!hp?.length||hp.some(value=>!Number.isFinite(value))){
     progressWatch={key:'',since:0,lastSampleAt:0,lastProgressAt:0,samples:0,changes:0,lastHp:''};
     return {state:'not_observed',reason:!own?'game_context_not_ready':!active?'no_active_combat_controller':
       !target?'no_native_target':'target_hp_unavailable',samples:0,unchangedMs:0,confidence:'none'};
   }
   const key=JSON.stringify([scene,String(targetOcc??''),String(targetType??'')]),hpKey=JSON.stringify(hp);
   if(progressWatch.key!==key){
     progressWatch={key,since:now,lastSampleAt:0,lastProgressAt:now,samples:0,changes:0,lastHp:''};
   }
   if(now-progressWatch.lastSampleAt>=4000){
     if(progressWatch.lastHp&&progressWatch.lastHp!==hpKey){
       progressWatch.lastProgressAt=now;progressWatch.changes++;
     }
     progressWatch.lastHp=hpKey;progressWatch.lastSampleAt=now;progressWatch.samples++;
   }
   const unchangedMs=Math.max(0,now-progressWatch.lastProgressAt);
   const stalled=progressWatch.samples>=4&&unchangedMs>=60000;
   return {state:stalled?'possible_stall':unchangedMs>=20000?'waiting':'observing',
     reason:stalled?'target_hp_unchanged':unchangedMs>=20000?'no_recent_target_hp_change':'collecting_samples',
     observedMs:Math.max(0,now-progressWatch.since),unchangedMs,samples:progressWatch.samples,
     progressChanges:progressWatch.changes,lastSampleAt:progressWatch.lastSampleAt,
     confidence:stalled?'low':'medium'};
 }
 function snapshot(){
   const own=String(W._Ba?._rJ?._O$?.ins?.actorId??'')===actor&&
     !!actor&&!W.__KVPV_UNIVERSAL_HALTED;
   const scene=Number(W._C?._Mn?._Cn?.currentID??W._Ba?._$a?._yo?.ins?.intoSce?.[0]);
   const far=state(__getKVPV1()),mode=state(__getKVPV3(),false),
     th=state(__getKVPV4(),false),basics=state(__getKVPV0()),
     hr=state(__getKVPV2(),false),force=state(__getKVPV7()),
     thac=state(__getKVPV5()),xa=state(__getKVPV8());
   const me=safe(__captureESMFunction((__esmLocal5=(()=>{
     const world=W._C?._Ba?.instance;
     return world?.getRole?.(Number(actor))??world?.getRole?.(actor);
   })),""));
   const comp=safe(__captureESMFunction((__esmLocal6=(()=>me?.getComponent?.(W._d?._Yct?._Het))),""));
   const selector=safe(__captureESMFunction((__esmLocal7=(()=>me?.getComponent?.(W._d?._Yct?._Eet))),""));
   const target=comp?.target;
   const targetType=safe(__captureESMFunction((__esmLocal8=(()=>target?.property?.get?.('type')??null)),""));
   const targetOcc=safe(()=>target?.property?.get?.('occ')??null);
   const targetHp=safe(__captureESMFunction((__esmLocal9=(()=>target?.property?.get?.('hp')??null)),""));
   const progress=observeProgress({own,scene,far,mode,th,basics,hr,target,targetType,targetOcc,targetHp});
   const hints=[];
   if(!own)hints.push('game_frame_actor_or_session_not_ready');
   if(thac?.unresolved?.length)hints.push('thac_an_client_cooldowns_still_zero');
   if(xa?.unresolved===true)hints.push('xa_menh_client_cooldown_still_zero');
   if(!comp||typeof comp?.combat!=='function')hints.push('native_combat_component_missing');
   if(!selector||typeof selector?._f7t!=='function')hints.push('native_skill_selector_missing');
   if(target==null)hints.push('native_target_missing');
   if(mode?.mode==='OFF'&&far?.inside===true)hints.push('far_combat_mode_off_or_waiting');
   if(far?.inside===false&&basics?.enabled===false)hints.push('outside_basic_controller_off');
   if(typeof th?.reason==='string'&&/animation|cooldown|skill_readiness/.test(th.reason))
     hints.push('long_range_controller_waiting_'+th.reason);
   if(typeof basics?.reason==='string'&&/cooldown|ready|target|range/.test(basics.reason))
     hints.push('outside_controller_waiting_'+basics.reason);
   let diagnosis={code:'no_known_blocker',confidence:'low',evidence:[],nextStep:'collect_more_runtime_samples'};
   if(!own)diagnosis={code:'game_context_not_ready',confidence:'high',evidence:['game_frame_actor_or_session_not_ready'],nextStep:'check_actor_and_live_session'};
   else if(!comp||typeof comp?.combat!=='function')diagnosis={code:'native_combat_component_missing',confidence:'high',evidence:['native_combat_component_missing'],nextStep:'wait_for_game_components'};
   else if(!selector||typeof selector?._f7t!=='function')diagnosis={code:'native_skill_selector_missing',confidence:'high',evidence:['native_skill_selector_missing'],nextStep:'wait_for_game_components'};
   else if(mode?.mode==='OFF'&&far?.inside===true)diagnosis={code:'far_combat_mode_disabled',confidence:'high',evidence:['far_combat_mode_off_or_waiting'],nextStep:'check_combat_mode_setting'};
   else if(thac?.unresolved?.length||xa?.unresolved===true)diagnosis={code:'client_cooldown_not_restored',confidence:'high',
     evidence:hints.filter(hint=>hint==='thac_an_client_cooldowns_still_zero'||hint==='xa_menh_client_cooldown_still_zero'),nextStep:'review_verified_cooldown_recovery'};
   else if(target==null)diagnosis={code:'waiting_for_native_target',confidence:'medium',evidence:['native_target_missing'],nextStep:'wait_for_target_selection'};
   else if(hints.some(hint=>hint.startsWith('long_range_controller_waiting_')||hint.startsWith('outside_controller_waiting_')))
     diagnosis={code:'combat_controller_waiting',confidence:'medium',evidence:hints.filter(hint=>hint.startsWith('long_range_controller_waiting_')||hint.startsWith('outside_controller_waiting_')),nextStep:'inspect_controller_status'};
   else if(hints.includes('outside_basic_controller_off'))diagnosis={code:'outside_basic_controller_disabled',confidence:'high',evidence:['outside_basic_controller_off'],nextStep:'check_outside_controller_setting'};
   else if(progress.state==='possible_stall'&&diagnosis.code==='no_known_blocker')
     diagnosis={code:'possible_combat_stall',confidence:'low',evidence:['target_hp_unchanged_for_60s','multiple_runtime_samples'],nextStep:'compare_recent_diagnostics_before_manual_recovery'};
   return {version:3,diagnosis,progress,actorMatches:own,map:scene,scene:far?.kind??'unknown',
     native:{combatPresent:typeof comp?.combat==='function',selectorPresent:typeof selector?._f7t==='function',
       cooldownMethodPresent:typeof comp?.isCooldown==='function',
       targetType,targetHp},hints,
     mode:{mode:mode?.mode??null,reason:mode?.reason??null,lastError:mode?.lastError??null,
       running:mode?.combatRunning??null},
     outside:{enabled:basics?.enabled??null,reason:basics?.reason??null,
       attempts:basics?.attempts??null,lastError:basics?.lastError??null},
     long:{running:th?.running??null,reason:th?.reason??th?.lastReason??null,
       phase:th?.phase??th?.combatPhase??null,lastError:th?.lastError??null},
     hitrun:{running:hr?.running??null,phase:hr?.phase??null},
     hooks:{tqBasicForce:force?.enabled??null},
     thac:{enabled:thac?.enabled??null,unresolved:thac?.unresolved??[],rollbackCount:thac?.rollbackCount??null},
     xa:{enabled:xa?.enabled??null,ms:xa?.configCooldownMs??null,rollbackCount:xa?.rollbackCount??null},
     note:'Read-only snapshot; no server skill outcome proven. Do not infer reason from a still image alone.'};
 }
__esmLocal4=snapshot;

 function recover(){
   
   // combat ownership/animation or forcibly restart a manually stopped mode.
   safe(__captureESMFunction((__esmLocal11=(()=>__getKVPV8()?.recover?.())),""));
   safe(__captureESMFunction((__esmLocal12=(()=>__getKVPV5()?.recover?.())),""));
   return snapshot();
 }
__esmLocal10=recover;

 W[KEY]=Object.freeze({snapshot,status:snapshot,recover});
})),""))();

}
export const api=Object.freeze({
});