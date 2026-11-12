import {getKVPV_BOSS_TEAM as __getKVPV0,getKVPV_DAILY as __getKVPV1,getKVPV_ENTRY_POLICY as __getKVPV2,getKVPV_HITRUN1 as __getKVPV3,getKVPV_TH300 as __getKVPV4,getKVPV_TRANSFORM10 as __getKVPV5,getKVPV_V1 as __getKVPV6} from '../api.mjs';
import {call_KVPV_TRANSFORM10_cast as __callKVPV0} from "./13-transform-skills.mjs";
import {pvpCoordinateDistance as __pvpCoordinateDistance} from "./00-far-scope.mjs";
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
export {__esmLocal0 as local_anonymous_5_1_0};
export {__esmLocal1 as local_prop_1};
export {__esmLocal2 as local_id_2};
export {__esmLocal3 as local_own_3};
export {__esmLocal4 as local_map_4};
export {__esmLocal5 as local_entryMap_5};
export {__esmLocal6 as local_liveEvent_6};
export {__esmLocal7 as local_anonymous_20_65_7};
export {__esmLocal8 as local_inside_8};
export {__esmLocal9 as local_comp_9};
export {__esmLocal10 as local_transformSkill_10};
export {__esmLocal11 as local_me_11};
export {__esmLocal12 as local_releaseMoveBoost_12};
export {__esmLocal13 as local_applyMoveBoost_13};
export {__esmLocal14 as local_enemy_14};
export {__esmLocal15 as local_ready_15};
export {__esmLocal16 as local_anonymous_44_64_16};
export {__esmLocal17 as local_approach_17};
export {__esmLocal18 as local_tick_18};
export {__esmLocal19 as local_anonymous_87_67_19};
export {__esmLocal20 as local_anonymous_88_22_20};
export {__esmLocal21 as local_anonymous_89_25_21};
export {__esmLocal22 as local_anonymous_93_18_22};
export {__esmLocal23 as local_wrapped_23};
export {__esmLocal24 as local_safeTick_24};
export {__esmLocal25 as local_start_25};
export {__esmLocal26 as local_stop_26};
export {__esmLocal27 as local_calibrateHere_27};
export {__esmLocal28 as local_status_28};
export function initialize(){
/* Tranh Ba Tu Phuong cross-server PvP. Native Tuyet Hoc-first combo against the selected enemy.
 * Requires verified event calendar and explicitly calibrated non-common map.
 * No fabricated RPC, target selection, rewards, cooldown overrides or auto entry.
 */
(__captureESMFunction((__esmLocal0=(() => {
  'use strict';
  const W=window,KEY='KVPV_TRANH_BA_TU_PHUONG',old=W[KEY];
  try{old?.stop?.('reload');}catch(_){}
  const actor=String(W.__KVPV_OWN_ACTOR_ID||'');
  const C={pollMs:1,mapId:null,enabled:true,moveGapMs:80,stopDistance:180,maxChaseDistance:2000,visualSpeed:99999};
   const S={timer:null,casts:0,th:0,basic:0,transform:0,blocked:0,reason:'map_not_calibrated',error:'',lastSkill:null,readyTH:0,readyBasic:0,moves:0,lastMoveAt:0,visualScaled:0,visualUnavailable:0};
  const MOVE={obj:null,base:null,applied:null,factor:99};
  const prop=__captureESMFunction((__esmLocal1=((r,k)=>r?.property?.get?.(k))),"prop");
  const id=__captureESMFunction((__esmLocal2=(r=>String(r?.id??prop(r,'id')??''))),"id");
  const own=__captureESMFunction((__esmLocal3=(()=>!!actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED)),"own");
  const map=__captureESMFunction((__esmLocal4=(()=>Number(W._C?._Mn?._Cn?.currentID))),"map");
  const entryMap=__captureESMFunction((__esmLocal5=(()=>Number(W._Ba?._$a?._yo?.ins?.intoSce?.[0]))),"entryMap");
  const liveEvent=__captureESMFunction((__esmLocal6=(()=>{
    const calendar=__getKVPV1()?.lichData?.();
    return Array.isArray(calendar?.active)&&calendar.active.some(__captureESMFunction((__esmLocal7=(e=>e?.key==='tranh_ba_tu_phuong')),""));
  })),"liveEvent");
  const inside=__captureESMFunction((__esmLocal8=(()=>own()&&Number.isSafeInteger(C.mapId)&&C.mapId>0&&
    map()===C.mapId&&entryMap()===C.mapId&&
    W._Ba?._$a?.SceneUtil?.isCommonScene===false&&liveEvent())),"inside");
  const comp=__captureESMFunction((__esmLocal9=((r,k)=>{const t=W._d?._Yct?.[k];return t?r?.getComponent?.(t):null;})),"comp");
   const transformSkill=__captureESMFunction((__esmLocal10=(skill=>__getKVPV5()?.transformed?.()===true&&__getKVPV5()?.has?.(Number(skill))===true)),"transformSkill");
  const me=__captureESMFunction((__esmLocal11=(()=>W._C?._Ba?.instance?.getRole?.(Number(actor)))),"me");
  function releaseMoveBoost(){if(MOVE.obj&&MOVE.obj.speed===MOVE.applied)MOVE.obj.speed=MOVE.base;MOVE.obj=null;MOVE.base=null;MOVE.applied=null;}
__esmLocal12=releaseMoveBoost;

  function applyMoveBoost(self){
    const mover=comp(self,'_zet');if(!mover||!Number.isFinite(Number(mover.speed))||Number(mover.speed)<=0){releaseMoveBoost();return false;}
    const shared=W.KVPV_EXPERIMENTAL_BOOST?.status?.();
    if(shared?.active===true&&shared.movementApplied===true){releaseMoveBoost();return false;}
    if(MOVE.obj!==mover){releaseMoveBoost();MOVE.obj=mover;MOVE.base=Number(mover.speed);MOVE.applied=MOVE.base*MOVE.factor;}
    else if(mover.speed!==MOVE.applied){MOVE.base=Number(mover.speed);MOVE.applied=MOVE.base*MOVE.factor;}
    mover.speed=MOVE.applied;return true;
  }
__esmLocal13=applyMoveBoost;

  const enemy=__captureESMFunction((__esmLocal14=((r,self)=>{
    const a=Number(prop(self,'campType')),b=Number(prop(r,'campType'));
    const hp=prop(r,'hp');
    return !!r&&r.isValid!==false&&id(r)!==actor&&!!id(r)&&
      Number(prop(r,'type'))===4&&Number.isInteger(a)&&Number.isInteger(b)&&
      a>=0&&b>=0&&a!==b&&
      (!Array.isArray(hp)||Number(hp[0])>0);
  })),"enemy");
  const ready=__captureESMFunction((__esmLocal15=((selector,now)=>[...(Array.isArray(selector?._rtt)?selector._rtt:[]),
    ...(Array.isArray(selector?._wet)?selector._wet:[])].filter(__captureESMFunction((__esmLocal16=(x=>{
      const skill=Number(x?.[0]),time=Number(x?.[1]);
       return Number.isInteger(skill)&&(skill>=1001&&skill<=1008||skill>=8001&&skill<=8005||transformSkill(skill))&&
        Number.isFinite(time)&&time<now;
    })),"")))),"ready");
  // Native walking at the game's default speed; avoid repeated path resets.
  function approach(self,target){
    const p=prop(self,'position'),q=prop(target,'position');
    if(!p||!q||![p.x,p.y,q.x,q.y].every(Number.isFinite))return false;
    const dx=q.x-p.x,dy=q.y-p.y,d=__pvpCoordinateDistance(p,q);
    if(d===null)return false;
    if(d<=C.stopDistance||d>C.maxChaseDistance)return false;
    const now=Date.now();
    if(now-S.lastMoveAt<C.moveGapMs)return false;
    const mover=comp(self,'_zet');
    if(typeof mover?.moveTo!=='function')return false;
    const travel=d-C.stopDistance;
    mover.moveTo(Math.round(p.x+dx/d*travel),Math.round(p.y+dy/d*travel));
    S.lastMoveAt=now;S.moves++;S.reason='native_walk_toward_enemy';
    return true;
  }
__esmLocal17=approach;

  function tick(){
    if(!C.enabled){S.reason='disabled';return;}
    if(!inside()){releaseMoveBoost();S.reason=C.mapId===null?'map_not_calibrated':'outside_verified_event';return;}
    if(__getKVPV2()?.manual===true||W.document?.hidden===true||
       W.document?.hasFocus?.()===false||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)){
      releaseMoveBoost();S.reason='manual_or_unfocused';return;
    }
    if(__getKVPV3()?.status?.(false)?.running||
       __getKVPV4()?.status?.(false)?.running||
       __getKVPV0()?.priority?.()){
      releaseMoveBoost();S.reason='other_combat_owner';return;
    }
    if(W.KVPV?.core?.scene?.combat?.claim?.('81-tranh-ba-tu-phuong-pvp',100)!==true){
      releaseMoveBoost();S.reason='combat_dispatch_wait';return;
    }
    const self=me(),combat=comp(self,'_Het'),selector=comp(self,'_Eet'),target=combat?.target;
    if(W._Ba?._rJ?._O$?.ins?.isDead===true){releaseMoveBoost();S.reason='dead';return;}
    applyMoveBoost(self);
    if(!enemy(target,self)){S.reason='waiting_verified_selected_enemy';return;}
    if(typeof combat?.combat!=='function'||typeof combat?.isCooldown!=='function'||
       typeof combat?.isValidTarget!=='function'||typeof combat?.isValidRange!=='function'||
       typeof selector?._f7t!=='function'){S.reason='native_combat_missing';return;}
    if(combat.isValidRange()!==true){approach(self,target);S.reason=S.reason==='native_walk_toward_enemy'?S.reason:'target_out_of_range';return;}
    if(combat.isCooldown()!==false||combat.isValidTarget()!==true){
      S.blocked++;S.reason='native_cooldown_range_or_target';return;
    }
     const rows=ready(selector,Date.now()),transformed=rows.filter(__captureESMFunction((__esmLocal19=(x=>transformSkill(x[0]))),"")),
       th=rows.filter(__captureESMFunction((__esmLocal20=(x=>Number(x[0])>=1001&&Number(x[0])<=1008)),"")),
       basic=rows.filter(__captureESMFunction((__esmLocal21=(x=>Number(x[0])>=8001&&Number(x[0])<=8005)),"")),pool=transformed.length?transformed:th.length?th:basic;
    S.readyTH=th.length;S.readyBasic=basic.length;
    if(!pool.length){S.reason='no_native_ready_combo_skills';return;}
    const skill=Number(selector._f7t(pool,[],1));
    if(!pool.some(__captureESMFunction((__esmLocal22=(x=>Number(x[0])===skill)),""))){S.reason='native_selector_rejected';return;}
    if(!inside()||combat.target!==target||!enemy(target,self))return;
     if(transformSkill(skill)){__callKVPV0(combat,skill);S.casts++;S.transform++;S.lastSkill=skill;S.reason='native_transform_skill_cast';return;}
     const avatar=combat?._Qrt,original=avatar?.getActionTween,own=avatar&&Object.getOwnPropertyDescriptor(avatar,'getActionTween');
    let wrapped=null,visual=false;
    try{
      let action=null;try{action=combat?._mvt?.(skill)?.[5];}catch(_){}
      if(typeof original==='function'&&typeof action==='string'&&action.trim()){
        wrapped=__captureESMFunction((__esmLocal23=(function(...args){
          if(args[0]!==action)return original.apply(this,args);
          const before=Number(args[2]??1);if(!Number.isFinite(before)||before<=0)return original.apply(this,args);
          args[2]=Math.min(C.visualSpeed,before*C.visualSpeed);
          return original.apply(this,args);
        })),"wrapped");
        try{
          Object.defineProperty(avatar,'getActionTween',{configurable:true,writable:true,enumerable:!!own?.enumerable,value:wrapped});
          visual=avatar.getActionTween===wrapped;
        }catch(_){S.visualUnavailable++;}
      }else S.visualUnavailable++;
      combat.combat(skill);S.casts++;S.lastSkill=skill;if(visual)S.visualScaled++;
    }finally{
      if(visual&&avatar.getActionTween===wrapped){
        if(own)Object.defineProperty(avatar,'getActionTween',own);else delete avatar.getActionTween;
      }
    }
    if(skill>=1001&&skill<=1008){S.th++;S.reason='native_tuyet_hoc_combo_cast';}
    else{S.basic++;S.reason='native_basic_combo_fallback';}
  }
__esmLocal18=tick;

  function safeTick(){try{tick();}catch(e){S.error=String(e);S.reason='error';}}
__esmLocal24=safeTick;

  function start(){if(!own())throw Error('Actor not ready');C.enabled=true;
    if(S.timer===null)S.timer=(__getKVPV6()?.timers?.setInterval??W.setInterval)(safeTick,C.pollMs);
    safeTick();return status();}
__esmLocal25=start;

  function stop(reason='manual'){C.enabled=false;
    if(S.timer!==null)(__getKVPV6()?.timers?.clearInterval??W.clearInterval)?.(S.timer);
    S.timer=null;releaseMoveBoost();S.reason=reason;return status();}
__esmLocal26=stop;

  function calibrateHere(){
    if(!own()||!liveEvent()||W._Ba?._$a?.SceneUtil?.isCommonScene!==false||
       map()!==entryMap()||!(map()>0))throw Error('Enter verified event map first');
    C.mapId=map();return status();
  }
__esmLocal27=calibrateHere;

   function status(){return {actor,enabled:C.enabled,eventActive:liveEvent(),inside:inside(),
     map:map(),verifiedMap:C.mapId,casts:S.casts,transformCasts:S.transform,thCasts:S.th,basicCasts:S.basic,
     combo:{priority:'native transformed skills, Tuyet Hoc 1001-1008, then native basics 8001-8005',readyTuyetHoc:S.readyTH,readyBasic:S.readyBasic,pollMs:C.pollMs,moveGapMs:C.moveGapMs,visualSpeed:C.visualSpeed,transformVisualSpeed:null,visualOnly:false,nativeSkillSpeed:true},
    blocked:S.blocked,moves:S.moves,movementSpeedBoost:{factor:MOVE.factor,active:!!MOVE.obj,base:MOVE.base,applied:MOVE.applied,clientSide:true,serverAcceptedUnverified:true},visualScaled:S.visualScaled,visualUnavailable:S.visualUnavailable,lastSkill:S.lastSkill,reason:S.reason,error:S.error};}
__esmLocal28=status;

  W[KEY]=Object.freeze({start,stop,status,tick:safeTick,calibrateHere});
})),""))();

}
export const api=Object.freeze({
});