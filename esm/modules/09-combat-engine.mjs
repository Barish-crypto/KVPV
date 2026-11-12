import {getKVPV_BOSS_TEAM as __getKVPV0,getKVPV_COMBAT_ENGINE as __getKVPV1,getKVPV_DAILY as __getKVPV2,getKVPV_ENTRY_POLICY as __getKVPV3,getKVPV_EVENT_PRIORITY as __getKVPV4,getKVPV_FAR_SCOPE as __getKVPV5,getKVPV_HITRUN1 as __getKVPV6,getKVPV_RANGE_KEEP310 as __getKVPV7,getKVPV_TQ_SCOPE as __getKVPV8,getKVPV_V1 as __getKVPV9} from '../api.mjs';
export function call_KVPV_COMBAT_ENGINE_start(...args){const target=globalThis["KVPV_COMBAT_ENGINE"];const fn=globalThis["KVPV_COMBAT_ENGINE"]?.["start"];if(typeof fn!=='function')throw Error("KVPV_COMBAT_ENGINE.start is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_COMBAT_ENGINE_stop(...args){const target=globalThis["KVPV_COMBAT_ENGINE"];const fn=globalThis["KVPV_COMBAT_ENGINE"]?.["stop"];if(typeof fn!=='function')throw Error("KVPV_COMBAT_ENGINE.stop is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_COMBAT_ENGINE_tick(...args){const target=globalThis["KVPV_COMBAT_ENGINE"];const fn=globalThis["KVPV_COMBAT_ENGINE"]?.["tick"];if(typeof fn!=='function')throw Error("KVPV_COMBAT_ENGINE.tick is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_COMBAT_ENGINE_status(...args){const target=globalThis["KVPV_COMBAT_ENGINE"];const fn=globalThis["KVPV_COMBAT_ENGINE"]?.["status"];if(typeof fn!=='function')throw Error("KVPV_COMBAT_ENGINE.status is not available");return Reflect.apply(fn,target,args);}
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
export {__esmLocal0 as local_anonymous_5_1_0};
export {__esmLocal1 as local_position_1};
export {__esmLocal2 as local_ring_2};
export {__esmLocal3 as local_valid_3};
export {__esmLocal4 as local_far_4};
export {__esmLocal5 as local_components_5};
export {__esmLocal6 as local_state_6};
export {__esmLocal7 as local_recordReason_7};
export {__esmLocal8 as local_tick_8};
export {__esmLocal9 as local_anonymous_71_66_9};
export {__esmLocal10 as local_anonymous_72_30_10};
export {__esmLocal11 as local_anonymous_73_53_11};
export {__esmLocal12 as local_anonymous_77_51_12};
export {__esmLocal13 as local_anonymous_91_54_13};
export {__esmLocal14 as local_anonymous_92_30_14};
export {__esmLocal15 as local_anonymous_95_28_15};
export {__esmLocal16 as local_anonymous_99_57_16};
export {__esmLocal17 as local_stop_17};
export {__esmLocal18 as local_start_18};
export {__esmLocal19 as local_anonymous_137_29_19};
export {__esmLocal20 as local_hongHoang_20};
export function initialize(){
/* KVPV single native boss combat engine.
 * Replaces TH300/legacy modes in executable FULL. Single serialized sender.
 * Never overrides native cooldown, never sends RPC, respects recovery and actor.
 */
(__captureESMFunction((__esmLocal0=(()=>{
 'use strict';
 const W=window,old=__getKVPV1();old?.stop?.();
 const actor=String(W.__KVPV_OWN_ACTOR_ID??'');
 const ids=[8001,8002,8003,8004,8005,1001,1002,1003,1004,1005,1006,1007,1008];
 // User-confirmed ranged Tuyet Hoc group 1001..1008; exclude basic 8001..8005 at the 310 ring.
 // Still require native selected skill, readiness, range and cooldown checks.
 const confirmedRanged=new Set([1001,1002,1003,1004,1005,1006,1007,1008]);
 const rangedKinds=new Set(['THIEN_QUAN','LINH_LUNG','PHU_VAN']);
 const ringGoal=310,ringTolerance=2,moveFactor=99;
 const MOVE={obj:null,base:null,applied:null};
 const position=__captureESMFunction((__esmLocal1=(o=>{const p=o?.property?.get?.('position'),x=Number(p?.x),y=Number(p?.y);return p&&Number.isFinite(x)&&Number.isFinite(y)?{x,y}:null;})),"position");
 function ring(target){const scope=__getKVPV5()?.status?.(),kind=scope?.kind;
  if(!rangedKinds.has(kind))return {needed:false,ok:true,distance:null};
  const a=position(components().a),b=position(target);
  if(!scope?.inside||!a||!b)return {needed:true,ok:false,distance:null};
  const distance=Math.hypot(a.x-b.x,a.y-b.y);
  return {needed:true,ok:Math.abs(distance-ringGoal)<=ringTolerance,distance};
 }
__esmLocal2=ring;

 const S={enabled:false,armed:false,busy:false,timer:null,timerMs:16,lastTimerTickAt:null,schedulerLagMs:0,casts:0,checks:0,lastSkill:null,reason:'off',error:'',cursor:0,lastTargetSearchAt:0,targetSearches:0,reasonCounts:Object.create(null),lastCastAt:0,lastCooldown:null,lastCooldownAt:0,lastTargetType:null,knownSkillIds:[],filteredCloseSkillIds:[],lastNativeSelectedSkill:null,lastNativeSelectionPreview:null,nativeSelectionWaitMs:null,confirmedRangedAvailable:[],ringDistance:null,ringReady:false,lastRange:null,moveBase:null,moveApplied:null};
 const fastPollReasons=new Set(['native_cast_requested','native_selection_boundary','native_selection_changed','no_native_ready_skill','native_skill_not_enabled','filtered_close_range_skill']);
 const basicFastPollReasons=new Set([...fastPollReasons,'native_cooldown','native_cooldown_unknown']);
 const basicSkillIds=new Set([8001,8002,8003,8004,8005]);
 const targetPollReasons=new Set(['waiting_native_boss_target','native_cooldown','native_cooldown_unknown','native_out_of_range','waiting_distance_310']);
 const valid=__captureESMFunction((__esmLocal3=(()=>actor!==''&&String(W._Ba?._rJ?._O$?.ins?.actorId??'')===actor&&W.__KVPV_UNIVERSAL_HALTED!==true)),"valid");
 const hongHoang=__captureESMFunction((__esmLocal20=(()=>{
  const map=Number(W._C?._Mn?._Cn?.currentID??W._Ba?._$a?._yo?.ins?.intoSce?.[0]);
  return Number(W._Ba?._$a?.SceneUtil?.curScene)===17||
   Number(W._ft?._po?.ins?.getCfgById?.(map)?.[7])===17;
 })),"hongHoang");
 const far=__captureESMFunction((__esmLocal4=(()=>{
  const x=(__getKVPV5()??__getKVPV8()),scope=x?.status?.();
  if(scope?.inside===true&&scope.kind==='EXPEDITION'){S.reason='expedition_unified_boss_owner_required';return false;}
  return !hongHoang()&&x?.inside?.()===true&&scope?.kind!=='TRU_TIEN';
 })),"far");
 const components=__captureESMFunction((__esmLocal5=(()=>{
  const a=W._C?._Ba?.instance?.getRole?.(Number(actor));
  const c=W._d?._Yct;
  return {a,skill:a?.getComponent?.(c?._Eet),combat:a?.getComponent?.(c?._Het)};
 })),"components");
 // Mirror the client selector without mutating cooldown rows before allowlist checks.
 function previewNativeSelection(skill){
  if(skill.property?.get?.('type')==4){
   const forced=W._Ba?._rJ?._O$?.ins?.skillIdIsPlayBySer;
   if(forced)return {id:Number(forced),rows:[...(skill._rtt??[]),...(skill._wet??[])],forced:true};
  }
  let ready=skill._rtt??[],common=skill._wet??[],mode=1;
  const transform=W._Ba?._s3?._ZJ?.ins;
  if(transform&&transform.curShowId!=0&&skill._Net==0){
   const transforming=transform.getTransformingSkills();
   ready=transforming?.skills??[];common=transforming?.comSkills??[];mode=2;
  }else if(skill._Net==3)mode=3;
  else if(skill._Net==4)mode=4;
  else if(skill._Net==7)mode=5;
  const now=Date.now();
  let id=-1,nextReady=null,nextReadyAt=null;
  if(!skill._Cet)for(const row of ready){
   const readyAt=Number(row[1]);
   if(readyAt<now){id=Number(row[0]);break;}
   if(nextReady===null&&Number.isFinite(readyAt)&&readyAt<=now+25){nextReady=Number(row[0]);nextReadyAt=readyAt;}
  }
  if(id===-1&&common.length){
   let index;
   if(skill._Tet===-1){
    const exterior=skill.property.get('exterior');
    index=mode!==1||exterior[5]>0?0:1;
    const row=common[index];
    if(row){
     const readyAt=Number(row[1]);
     if(readyAt<now)id=Number(row[0]);
     else if(Number.isFinite(readyAt)&&readyAt<=now+25)return {id:Number(row[0]),rows:[...ready,...common],boundary:true,waitMs:Math.max(0,readyAt-now)};
    }
   }else{
    index=(skill._Tet+1)%common.length;
    if(mode===1&&index===0)index=skill.property.get('exterior')[5]>0?0:1;
    id=Number(common[index]?.[0]??-1);
   }
  }
  if(id===-1&&nextReady!==null)return {id:nextReady,rows:[...ready,...common],boundary:true,waitMs:Math.max(0,nextReadyAt-now)};
  const selectedRow=[...ready,...common].find(row=>Number(row?.[0])===id);
  const selectedReadyAt=Number(selectedRow?.[1]);
  const boundary=Number.isFinite(selectedReadyAt)&&selectedReadyAt>now&&selectedReadyAt<=now+25;
  return {id,rows:[...ready,...common],boundary,waitMs:boundary?selectedReadyAt-now:null};
 }
 function restoreMove(){
  try{if(MOVE.obj&&MOVE.obj.speed===MOVE.applied)MOVE.obj.speed=MOVE.base;}
  catch(error){S.error=String(error?.message??error);S.reason='movement_restore_error';}
  finally{MOVE.obj=null;MOVE.base=null;MOVE.applied=null;S.moveBase=null;S.moveApplied=null;}
 }
 function applyMove(role){
  const mover=role?.getComponent?.(W._d?._Yct?._zet);
  if(!mover||!Number.isFinite(Number(mover.speed))||Number(mover.speed)<=0){restoreMove();return false;}
  const shared=W.KVPV_EXPERIMENTAL_BOOST?.status?.();
  if(shared?.active===true&&shared.movementApplied===true){restoreMove();return true;}
  if(W.KVPV_TULA_PVP?.status?.()?.movementSpeed?.active===true){restoreMove();return true;}
  if(MOVE.obj!==mover){restoreMove();MOVE.obj=mover;MOVE.base=Number(mover.speed);MOVE.applied=MOVE.base*moveFactor;}
  else if(mover.speed!==MOVE.applied){MOVE.base=Number(mover.speed);MOVE.applied=MOVE.base*moveFactor;}
  mover.speed=MOVE.applied;S.moveBase=MOVE.base;S.moveApplied=MOVE.applied;return true;
 }
 function canBoostMove(role){
  return S.enabled&&valid()&&W._Ba?._rJ?._O$?.ins?.isDead!==true&&
   role!==null&&role!==undefined&&role===components().a;
 }
 function state(){return {enabled:S.enabled,armed:S.armed,busy:S.busy,actor,casts:S.casts,checks:S.checks,lastSkill:S.lastSkill,reason:S.reason,error:S.error,singleSender:true,legacyModes:false,pollIntervalMs:S.timerMs,schedulerLagMs:S.schedulerLagMs,targetSearches:S.targetSearches,lastCastAt:S.lastCastAt,lastCooldown:S.lastCooldown,lastCooldownAt:S.lastCooldownAt,lastTargetType:S.lastTargetType,knownSkillIds:S.knownSkillIds.slice(),filteredCloseSkillIds:S.filteredCloseSkillIds.slice(),lastNativeSelectedSkill:S.lastNativeSelectedSkill,lastNativeSelectionPreview:S.lastNativeSelectionPreview,nativeSelectionWaitMs:S.nativeSelectionWaitMs,confirmedRangedAvailable:S.confirmedRangedAvailable.slice(),ringDistance:S.ringDistance,ringReady:S.ringReady,ringGoal,ringTolerance,lastRange:S.lastRange,movementSpeed:{factor:moveFactor,active:MOVE.obj!==null,base:S.moveBase,applied:MOVE.applied,clientSide:true,serverAcceptedUnverified:true},reasonCounts:{...S.reasonCounts}};}
__esmLocal6=state;

 function recordReason(){S.reasonCounts[S.reason]=(S.reasonCounts[S.reason]||0)+1;}
__esmLocal7=recordReason;

 function pollInterval(){
  if(basicSkillIds.has(S.lastSkill)&&basicFastPollReasons.has(S.reason))return 1;
  if(S.reason==='native_selection_boundary'&&Number.isFinite(S.nativeSelectionWaitMs))
   return Math.max(1,Math.min(16,Math.ceil(S.nativeSelectionWaitMs*0.75-Math.min(4,S.schedulerLagMs))));
  return fastPollReasons.has(S.reason)?4:targetPollReasons.has(S.reason)?8:16;
 }
 function observeTimer(ms){
  const now=Date.now();
  if(S.lastTimerTickAt!==null){
   const elapsed=Math.max(0,now-S.lastTimerTickAt);
   const sample=Math.min(8,Math.max(0,elapsed-ms));
   S.schedulerLagMs=S.schedulerLagMs*0.75+sample*0.25;
  }
  S.lastTimerTickAt=now;
 }
 function schedule(ms){
  if(S.timer!==null&&S.timerMs===ms)return;
  if(S.timer!==null)(__getKVPV9()?.timers?.clearInterval??W.clearInterval)(S.timer);
  S.timerMs=ms;S.lastTimerTickAt=null;
  S.timer=(__getKVPV9()?.timers?.setInterval??W.setInterval)(()=>{observeTimer(ms);void tick();},ms);
 }

 async function tick(){
  if(S.busy||!S.enabled||!valid()){restoreMove();return;}
  let moveRole=null;
  S.busy=true;
  S.nativeSelectionWaitMs=null;
  try{
   moveRole=components().a;
   if(canBoostMove(moveRole))applyMove(moveRole);else restoreMove();
   if(hongHoang()){S.reason='honghoang_combat_paused';return;}
   if(!far()){
    const daily=__getKVPV2()?.quickState?.();
    const scope=__getKVPV5()?.status?.();
    // Daily scene 10 (Yeu Vuong) uses native encounter combat; do not steal its skill sender.
    S.reason=scope?.inside===true&&scope.kind==='EXPEDITION'?'expedition_unified_boss_owner_required':
      daily?.running===true&&daily?.job==='yeuvuong'&&daily?.step==='fighting'&&Number(daily?.scene)===10
       ? 'daily_yeuvuong_native_combat' : 'outside_boss_scope';
    return;
   }
   if(__getKVPV3()?.manual===true||__getKVPV4()?.hold?.()||__getKVPV0()?.priority?.()===true){S.reason='yield_priority';return;}
   if(W._Ba?._rJ?._O$?.ins?.isDead===true){S.reason='dead';return;}
   if(__getKVPV7()?.status?.()?.phase==='RETREAT'){S.reason='yield_recovery';return;}
   const recovery=__getKVPV6()?.status?.(false);
   if(recovery?.running===true&&recovery.phase!=='FIGHT'){S.reason='yield_recovery';return;}
   const {a,skill,combat}=components();
   if(!a||!skill||typeof combat?.combat!=='function'){S.reason='waiting_native_components';return;}
   const nativeTarget=combat.target;
   const rawType=nativeTarget?.property?.get?.('type');
   const type=rawType==null?NaN:Number(rawType);
   S.lastTargetType=Number.isFinite(type)?type:null;
   const hpNow=nativeTarget?.property?.get?.('hp');
   const stale=!nativeTarget||type===4||(Array.isArray(hpNow)&&Number(hpNow[0])<=0);
   if(stale){
     const now=Date.now();
     if(now-S.lastTargetSearchAt>=1000&&typeof W._Ba?._rJ?._O$?.ins?.selectTar==='function'){
       S.lastTargetSearchAt=now;W._Ba._rJ._O$.ins.selectTar(1,-1);S.targetSearches++;
     }
     S.reason='waiting_native_boss_target';return;
   }
   if(!Number.isFinite(type)||(type!==1&&type!==0)){S.reason='non_monster_target';return;}
   if(W.KVPV?.core?.scene?.combat?.claim?.('09-combat-engine',70)!==true){restoreMove();S.reason='combat_dispatch_wait';return;}
   const firstRing=ring(nativeTarget);
   S.ringDistance=firstRing.distance;S.ringReady=firstRing.ok;
   if(firstRing.needed&&!firstRing.ok){S.reason='waiting_distance_310';return;}
   // Inspect native selection before interpreting the shared range gate.
   // isValidRange() has no skill-id parameter; false may concern selected melee skill 1001.
   const rowsBefore=[...(skill._rtt??[]),...(skill._wet??[])];
   const knownBefore=new Set(rowsBefore.filter(Array.isArray).map(__captureESMFunction((__esmLocal9=(x=>Number(x[0]))),"")));
   S.knownSkillIds=ids.filter(__captureESMFunction((__esmLocal10=(id=>knownBefore.has(id))),""));
   S.confirmedRangedAvailable=S.knownSkillIds.filter(__captureESMFunction((__esmLocal11=(id=>confirmedRanged.has(id))),""));
   const rangeResult=typeof combat.isValidRange==='function'?combat.isValidRange():null;
   S.lastRange=rangeResult;
   if(rangeResult===false){S.reason='native_out_of_range';return;}
   const cooldownResult=typeof combat.isCooldown==='function'?combat.isCooldown():null;
   S.lastCooldown=cooldownResult;S.lastCooldownAt=Date.now();
   // Do not cast if the native cooldown API is missing or reports anything but false.
   if(cooldownResult!==false){S.reason=cooldownResult===true?'native_cooldown':'native_cooldown_unknown';return;}
   const target=combat.target;
   const hp=target?.property?.get?.('hp');
   if(Array.isArray(hp)&&Number(hp[0])<=0){S.reason='target_dead';return;}
   // Keep the selector preview and combat call in the same synchronous pass.
   // We only allow one native selection attempt after the final target/range/cooldown checks.
   if(!S.enabled||!valid()||combat.target!==target)return;
   if(!far()||__getKVPV3()?.manual===true||__getKVPV4()?.hold?.()||
      __getKVPV0()?.priority?.()===true){
     S.reason='yield_changed_priority';return;
   }
   if(W._Ba?._rJ?._O$?.ins?.isDead===true){S.reason='dead';return;}
   if(__getKVPV7()?.status?.()?.phase==='RETREAT'){S.reason='yield_recovery';return;}
   const recoveryNow=__getKVPV6()?.status?.(false);
   if(recoveryNow?.running===true&&recoveryNow.phase!=='FIGHT'){S.reason='yield_recovery';return;}
   const rawTypeNow=target?.property?.get?.('type');
   const typeNow=rawTypeNow==null?NaN:Number(rawTypeNow);
   const hpNowFinal=target?.property?.get?.('hp');
   if(!Number.isFinite(typeNow)||(typeNow!==0&&typeNow!==1)||
     (Array.isArray(hpNowFinal)&&Number(hpNowFinal[0])<=0)){S.reason='target_changed_or_dead';return;}
   const finalRing=ring(target);
   S.ringDistance=finalRing.distance;S.ringReady=finalRing.ok;
   if(finalRing.needed&&!finalRing.ok){S.reason='waiting_distance_310';return;}
   if(typeof combat.isValidRange==='function'&&combat.isValidRange()===false){S.reason='native_out_of_range';return;}
   const cooldownFinal=typeof combat.isCooldown==='function'?combat.isCooldown():null;
   S.lastCooldown=cooldownFinal;S.lastCooldownAt=Date.now();
   if(cooldownFinal!==false){S.reason=cooldownFinal===true?'native_cooldown':'native_cooldown_unknown';return;}
   const selection=previewNativeSelection(skill);
   const known=new Set(selection.rows.filter(Array.isArray).map(__captureESMFunction((__esmLocal13=(x=>Number(x[0]))),"")));
   S.knownSkillIds=ids.filter(__captureESMFunction((__esmLocal14=(id=>known.has(id))),""));
   S.lastNativeSelectionPreview=Number.isSafeInteger(selection.id)?selection.id:null;
   const kind=__getKVPV5()?.status?.()?.kind;
   const strictlyRanged=rangedKinds.has(kind);
   const ordered=ids.filter(__captureESMFunction((__esmLocal15=(id=>known.has(id))),""));
   S.filteredCloseSkillIds=strictlyRanged?ordered.filter(__captureESMFunction((__esmLocal16=(id=>!confirmedRanged.has(id))),"")):[];
   if(selection.boundary){S.nativeSelectionWaitMs=selection.waitMs;S.reason='native_selection_boundary';return;}
   if(!Number.isSafeInteger(selection.id)||selection.id<=0){S.reason='no_native_ready_skill';return;}
   if(!ids.includes(selection.id)){S.reason='native_skill_not_enabled';return;}
   if(!selection.forced&&!known.has(selection.id)){S.reason='no_native_ready_skill';return;}
   if(strictlyRanged&&!confirmedRanged.has(selection.id)){S.reason='filtered_close_range_skill';return;}
   const nativeId=Number(skill.selectSkill?.());
   S.lastNativeSelectedSkill=nativeId||null;
   if(nativeId!==selection.id){S.reason='native_selection_changed';return;}
   const chosen=ordered.includes(nativeId)?nativeId:null;
   if(!chosen){S.reason='no_native_ready_skill';return;}
   if(strictlyRanged&&!confirmedRanged.has(chosen)){S.reason='filtered_close_range_skill';return;}
   S.checks++;
   combat.combat(chosen);S.lastSkill=chosen;S.casts++;S.lastCastAt=Date.now();S.reason='native_cast_requested';
  }catch(e){S.reason='error';S.error=String(e?.message??e);}
  finally{
   try{if(!canBoostMove(moveRole))restoreMove();}
   catch(error){S.error=String(error?.message??error);S.reason='movement_boost_error';restoreMove();}
   recordReason();S.busy=false;if(S.enabled&&S.timer!==null)schedule(pollInterval());
  }
 }
__esmLocal8=tick;

 function stop(){S.enabled=false;S.armed=false;restoreMove();
  if(S.timer!==null){const owner=__getKVPV9()?.timers?.clearInterval?__getKVPV9().timers:W;owner?.clearInterval?.(S.timer);S.timer=null;}S.timerMs=16;S.lastTimerTickAt=null;S.schedulerLagMs=0;
  S.reason='stopped';return state();}
__esmLocal17=stop;

 function start(){S.armed=true;if(!valid()){S.reason='waiting_actor';return state();}
  if(typeof W.setInterval!=='function'){S.reason='waiting_timer_api';return state();}
 S.enabled=true;S.reason='armed';schedule(pollInterval());
 void tick();return state();}
__esmLocal18=start;

 W.KVPV_COMBAT_ENGINE=Object.freeze({start,stop,tick,status:state,skillIds:ids.slice()});
 // Startup is timerless in preflight; in the real game, arm once and wait for boss scope.
 start();
})),""))();
}
export {getKVPV_COMBAT_ENGINE} from '../api.mjs';
export const api=Object.freeze({
  get KVPV_COMBAT_ENGINE(){return globalThis.KVPV_COMBAT_ENGINE;},
});