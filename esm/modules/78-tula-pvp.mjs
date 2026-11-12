import {getKVPV_BOSS_TEAM as __getKVPV0,getKVPV_DAILY as __getKVPV1,getKVPV_ENTRY_POLICY as __getKVPV2,getKVPV_FAR_SCOPE as __getKVPV3,getKVPV_HITRUN1 as __getKVPV4,getKVPV_PVP_LUOFENG as __getKVPV5,getKVPV_TH300 as __getKVPV6,getKVPV_TRANSFORM10 as __getKVPV7,getKVPV_V1 as __getKVPV8} from '../api.mjs';
import {call_KVPV_TRANSFORM10_cast as __callKVPV0} from "./13-transform-skills.mjs";
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
export {__esmLocal0 as local_anonymous_4_1_0};
export {__esmLocal1 as local_transformSkill_1};
export {__esmLocal2 as local_castSkill_2};
export {__esmLocal3 as local_prop_3};
export {__esmLocal4 as local_identity_4};
export {__esmLocal5 as local_own_5};
export {__esmLocal6 as local_role_6};
export {__esmLocal7 as local_nativeTarget_7};
export {__esmLocal8 as local_restoreMove_8};
export {__esmLocal9 as local_applyMove_9};
export {__esmLocal10 as local_active_10};
export {__esmLocal11 as local_validTarget_11};
export {__esmLocal12 as local_approachBoss_12};
export {__esmLocal13 as local_comboAttack_13};
export {__esmLocal14 as local_anonymous_71_10_14};
export {__esmLocal15 as local_anonymous_72_31_15};
export {__esmLocal16 as local_anonymous_72_75_16};
export {__esmLocal17 as local_anonymous_72_135_17};
export {__esmLocal18 as local_anonymous_75_15_18};
export {__esmLocal19 as local_disarmDodge_19};
export {__esmLocal20 as local_release_20};
export {__esmLocal21 as local_tick_21};
export {__esmLocal22 as local_safeTick_22};
export {__esmLocal23 as local_status_23};
export {__esmLocal24 as local_start_24};
export {__esmLocal25 as local_stop_25};
export function initialize(){
/* Tu La Loi Dai: native Tian Quan skills and boss-only approach.
 * Use only a native-selected boss target in valid scene 58/61.
 */
(__captureESMFunction((__esmLocal0=(() => {
'use strict';
const W=window,KEY='KVPV_TULA_PVP',old=W[KEY],actor=String(W.__KVPV_OWN_ACTOR_ID||'');
try{old?.stop?.('reload');}catch(e){__getKVPV8()?.diagnostics?.record?.(e);}
const C={enabled:old?.config?.enabled!==false,pollMs:16,moveFactor:99,stopDistance:180,
  maxChaseDistance:2000,moveGapMs:450,skills:[8001,8002,8003,8004,8005],
  tuyetHoc:[1001,1002,1003,1004,1005,1006,1007,1008]};
const S={timer:null,armed:false,enemyId:'',reason:'waiting_tula',lastError:'',armedCount:0,disarmedCount:0,
  casts:0,thCasts:0,basicCasts:0,lastSkill:null,blocked:0,moveBase:null,moveApplied:null,
  moves:0,distance:null,lastMoveAt:0,movement:'waiting_boss_target'};
const MOVE={obj:null,base:null,applied:null};
const transformSkill=__captureESMFunction((__esmLocal1=(id=>__getKVPV7()?.transformed?.()===true&&__getKVPV7()?.has?.(Number(id))===true)),"transformSkill");
function castSkill(combat,id){if(transformSkill(id))return __callKVPV0(combat,id);return combat.combat(id);}
__esmLocal2=castSkill;

const prop=__captureESMFunction((__esmLocal3=((r,k)=>r?.property?.get?.(k))),"prop");
const identity=__captureESMFunction((__esmLocal4=(r=>String(r?.id??prop(r,'id')??''))),"identity");
const own=__captureESMFunction((__esmLocal5=(()=>!!actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED)),"own");
const role=__captureESMFunction((__esmLocal6=(()=>W._C?._Ba?.instance?.getRole?.(Number(actor)))),"role");
const nativeTarget=__captureESMFunction((__esmLocal7=(r=>{
 const Cmp=W._d?._Yct?._Het;
 return Cmp?r?.getComponent?.(Cmp)?.target:null;
})),"nativeTarget");
function restoreMove(){if(MOVE.obj&&MOVE.obj.speed===MOVE.applied)MOVE.obj.speed=MOVE.base;
 MOVE.obj=null;MOVE.base=null;MOVE.applied=null;S.moveBase=null;S.moveApplied=null;}
__esmLocal8=restoreMove;

function applyMove(r){const mover=W._d?._Yct?._zet?r?.getComponent?.(W._d._Yct._zet):null;
 if(!mover||!Number.isFinite(Number(mover.speed))||Number(mover.speed)<=0){restoreMove();return false;}
 const shared=W.KVPV_EXPERIMENTAL_BOOST?.status?.();
 if(shared?.active===true&&shared.movementApplied===true){restoreMove();return true;}
 if(W.KVPV_COMBAT_ENGINE?.status?.()?.movementSpeed?.active===true){restoreMove();return true;}
 if(MOVE.obj!==mover){restoreMove();MOVE.obj=mover;MOVE.base=Number(mover.speed);MOVE.applied=MOVE.base*C.moveFactor;}
 else if(mover.speed!==MOVE.applied){MOVE.base=Number(mover.speed);MOVE.applied=MOVE.base*C.moveFactor;}
 mover.speed=MOVE.applied;S.moveBase=MOVE.base;S.moveApplied=MOVE.applied;return true;}
__esmLocal9=applyMove;

function active(){
 const d=__getKVPV1()?.tuLaStatus?.(false),m=W._Ba?._hE?._olt?.inst;
 const scene=Number(W._Ba?._$a?.SceneUtil?.curScene);
 const foreign=__getKVPV3()?.status?.();
 if(foreign?.inside===true&&foreign.kind!=='TU_LA')return false;
 const job=__getKVPV1()?.quickState?.()?.job;
 return own()&&__getKVPV1()?.config?.enableTuLa!==false&&
   d?.dangTrongTran===true&&[58,61].includes(Number(d.canh))&&
   [58,61].includes(scene)&&Number(d.giaiDoan)>=1&&m?.funIsOpen===true&&
   (!job||['tula','rảnh','ranh','idle'].includes(String(job).toLowerCase()));
}
__esmLocal10=active;

function validTarget(t,r){
 if(!t||t===r||t.isValid===false||identity(t)===''||identity(t)===actor||
    Number(prop(t,'type'))!==1)return false;
 const Cmp=W._d?._Yct?._Het,c=Cmp?r?.getComponent?.(Cmp):null;
 return c?.target===t&&typeof c?.isValidTarget==='function'&&c.isValidTarget()===true;
}
__esmLocal11=validTarget;

function approachBoss(r,target,combat){
 const p=prop(r,'position'),q=prop(target,'position'),mover=W._d?._Yct?._zet?
  r?.getComponent?.(W._d._Yct._zet):null;
 if(!p||!q||![p.x,p.y,q.x,q.y].every(Number.isFinite)||typeof mover?.moveTo!=='function'){
  S.movement='waiting_movement_component';return false;
 }
 if(combat?.isValidRange?.()!==false){S.movement='native_range_or_unknown';return false;}
 const dx=q.x-p.x,dy=q.y-p.y,d=Math.hypot(dx,dy);S.distance=Math.round(d*100)/100;
 if(d<=C.stopDistance||d>C.maxChaseDistance){S.movement=d>C.maxChaseDistance?'boss_out_of_chase_range':'within_approach_distance';return false;}
 if(Date.now()-S.lastMoveAt<C.moveGapMs||mover.running?.()===true){S.movement='approach_throttled_or_running';return false;}
 const travel=d-C.stopDistance,x=Math.round(p.x+dx/d*travel),y=Math.round(p.y+dy/d*travel);
 if(!Number.isFinite(x)||!Number.isFinite(y)){S.movement='invalid_destination';return false;}
 mover.moveTo(x,y);S.lastMoveAt=Date.now();S.moves++;S.movement='moving_to_native_boss';return true;
}
__esmLocal12=approachBoss;

function comboAttack(r,target){
 const Cmp=W._d?._Yct??{},combat=Cmp._Het?r?.getComponent?.(Cmp._Het):null,selector=Cmp._Eet?r?.getComponent?.(Cmp._Eet):null;
 if(combat?.target!==target||typeof combat?.combat!=='function'||typeof combat?.isCooldown!=='function'||
    typeof combat?.isValidTarget!=='function'||typeof combat?.isValidRange!=='function'||typeof selector?._f7t!=='function'){
  S.reason='native_combat_components_unavailable';return;
 }
 if(combat.isCooldown()!==false||combat.isValidTarget()!==true||combat.isValidRange()!==true){S.blocked++;S.reason='native_cooldown_target_or_range';return;}
 const now=Date.now(),rows=[...(Array.isArray(selector._rtt)?selector._rtt:[]),...(Array.isArray(selector._wet)?selector._wet:[])]
  .filter(__captureESMFunction((__esmLocal14=(row=>(C.tuyetHoc.includes(Number(row?.[0]))||C.skills.includes(Number(row?.[0]))||transformSkill(row?.[0]))&&Number.isFinite(Number(row?.[1]))&&Number(row[1])<now)),""));
 const transformed=rows.filter(__captureESMFunction((__esmLocal15=(row=>transformSkill(row[0]))),"")),th=rows.filter(__captureESMFunction((__esmLocal16=(row=>C.tuyetHoc.includes(Number(row[0])))),"")),basic=rows.filter(__captureESMFunction((__esmLocal17=(row=>C.skills.includes(Number(row[0])))),"")),pool=transformed.length?transformed:th.length?th:basic;
 if(!pool.length){S.reason='no_native_ready_tian_quan_skills';return;}
 const skill=Number(selector._f7t(pool,[],1));
 if(!pool.some(__captureESMFunction((__esmLocal18=(row=>Number(row[0])===skill)),""))||!active()||combat.target!==target||!validTarget(target,r)){S.reason='native_selector_or_target_changed';return;}
 castSkill(combat,skill);S.casts++;S.lastSkill=skill;
 if(transformSkill(skill)){S.transformCasts=(S.transformCasts||0)+1;S.reason='native_transform_skill_cast';}
 else if(C.tuyetHoc.includes(skill)){S.thCasts++;S.reason='native_tian_quan_tuyet_hoc_cast';}
 else{S.basicCasts++;S.reason='native_tian_quan_basic_cast';}
}
__esmLocal13=comboAttack;

function disarmDodge(reason){
 if(S.armed){
  try{__getKVPV5()?.stop?.('tula_'+reason);}catch(e){S.lastError=String(e);}
  S.armed=false;S.disarmedCount++;
 }
 S.enemyId='';
}
__esmLocal19=disarmDodge;

function release(reason){restoreMove();disarmDodge(reason);}
__esmLocal20=release;

function tick(){
 if(!C.enabled||!active()){release('inactive');S.reason='waiting_tula';return;}
 if(__getKVPV2()?.manual===true||W.document?.hidden===true||
    W.document?.hasFocus?.()===false||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)){
  release('manual_or_unfocused');S.reason='manual_or_unfocused';return;
 }
 if(W._Ba?._rJ?._O$?.ins?.isDead===true||__getKVPV0()?.priority?.()===true||
    __getKVPV6()?.status?.(false)?.running===true||
    __getKVPV4()?.status?.(false)?.running===true){
  release('foreign_owner_or_dead');S.reason='foreign_owner_or_dead';return;
 }
 if(W.KVPV?.core?.scene?.combat?.claim?.('78-tula-pvp',100)!==true){release('combat_dispatch');S.reason='combat_dispatch_wait';return;}
 const r=role();
 if(!r){release('waiting_role');S.reason='waiting_role';return;}
 const movementActive=applyMove(r);
 disarmDodge('boss_only_mode');
 const target=nativeTarget(r);
 if(!validTarget(target,r)){S.enemyId='';S.movement='waiting_native_boss_target';S.reason=movementActive?'movement_boost_active_waiting_boss':'waiting_native_boss_target';return;}
 S.enemyId=identity(target);
 const combat=r?.getComponent?.(W._d?._Yct?._Het);
 if(combat?.isValidRange?.()===false){approachBoss(r,target,combat);return;}
 S.movement='native_range';
 comboAttack(r,target);
}
__esmLocal21=tick;

function safeTick(){try{tick();}catch(e){S.lastError=String(e?.message??e);S.reason='error';release('error');}}
__esmLocal22=safeTick;

function status(){
 return {enabled:C.enabled,inside:active(),actor,enemyId:S.enemyId,autoDodgeOwned:S.armed,
   armedCount:S.armedCount,disarmedCount:S.disarmedCount,reason:S.reason,lastError:S.lastError,
   combo:{priority:'native transformed skills, Tuyet Hoc 1001-1008, basics 8001-8005',casts:S.casts,transformCasts:S.transformCasts||0,thCasts:S.thCasts,basicCasts:S.basicCasts,lastSkill:S.lastSkill,blocked:S.blocked},
   movementSpeed:{factor:C.moveFactor,active:!!MOVE.obj,base:S.moveBase,applied:S.moveApplied,clientSide:true},
   movement:{mode:'native_selected_boss_only',state:S.movement,distance:S.distance,moves:S.moves,
     stopDistance:C.stopDistance,maxChaseDistance:C.maxChaseDistance},
   config:{...C},attackMode:'native_selected_boss_only',
   note:'Tu La scene 58/61 only; approaches and attacks only a native-selected type-1 boss. Never selects or attacks player targets. Movement speed is client-side; server acceptance is not guaranteed.'};
}
__esmLocal23=status;

function start(){C.enabled=true;if(S.timer===null)S.timer=(__getKVPV8()?.timers?.setInterval??W.setInterval)(safeTick,C.pollMs);safeTick();return status();}
__esmLocal24=start;

function stop(reason='manual_stop'){C.enabled=false;if(S.timer!==null)(__getKVPV8()?.timers?.clearInterval??W.clearInterval)?.(S.timer);
 S.timer=null;release(reason);S.reason=reason;return status();}
__esmLocal25=stop;

W[KEY]=Object.freeze({start,stop,status,tick:safeTick,config:C});
})),""))();

}
export const api=Object.freeze({
});