import {getKVPV_BOSS_TEAM as __getKVPV0,getKVPV_ENTRY_POLICY as __getKVPV1,getKVPV_HITRUN1 as __getKVPV2,getKVPV_MODE as __getKVPV3,getKVPV_TH300 as __getKVPV4,getKVPV_TRANSFORM10 as __getKVPV5,getKVPV_V1 as __getKVPV6} from '../api.mjs';
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
let __esmLocal26;
let __esmLocal27;
let __esmLocal28;
let __esmLocal29;
let __esmLocal30;
let __esmLocal31;
let __esmLocal32;
let __esmLocal33;
export {__esmLocal0 as local_anonymous_5_1_0};
export {__esmLocal1 as local_transformSkill_1};
export {__esmLocal2 as local_castSkill_2};
export {__esmLocal3 as local_prop_3};
export {__esmLocal4 as local_id_4};
export {__esmLocal5 as local_comp_5};
export {__esmLocal6 as local_me_6};
export {__esmLocal7 as local_owned_7};
export {__esmLocal8 as local_map_8};
export {__esmLocal9 as local_war_9};
export {__esmLocal10 as local_camp_10};
export {__esmLocal11 as local_inside_11};
export {__esmLocal12 as local_alive_12};
export {__esmLocal13 as local_pos_13};
export {__esmLocal14 as local_enemy_14};
export {__esmLocal15 as local_restoreMove_15};
export {__esmLocal16 as local_applyMove_16};
export {__esmLocal17 as local_nearest_17};
export {__esmLocal18 as local_inspect_18};
export {__esmLocal19 as local_canRun_19};
export {__esmLocal20 as local_flee_20};
export {__esmLocal21 as local_attack_21};
export {__esmLocal22 as local_anonymous_111_11_22};
export {__esmLocal23 as local_anonymous_112_32_23};
export {__esmLocal24 as local_anonymous_112_72_24};
export {__esmLocal25 as local_anonymous_112_128_25};
export {__esmLocal26 as local_anonymous_115_15_26};
export {__esmLocal27 as local_tick_27};
export {__esmLocal28 as local_safeTick_28};
export {__esmLocal29 as local_schedule_29};
export {__esmLocal30 as local_status_30};
export {__esmLocal31 as local_anonymous_160_132_31};
export {__esmLocal32 as local_stop_32};
export {__esmLocal33 as local_start_33};
export function initialize(){
/* Tien Ma Quyet Chien: Tian Quan Tuyet Hoc-first combo, with basic fallback.
 * Auto-arms. Active ONLY in native Camp War battle maps 2191..2194.
 * No fabricated packets, cooldown bypass, auto entry or target switching.
 */
(__captureESMFunction((__esmLocal0=(() => {
'use strict';
const W=window,KEY='KVPV_TIENMA_PVP',old=W[KEY];
try{old?.stop?.('reload');}catch(e){__getKVPV6()?.diagnostics?.record?.(e);}
const actor=String(W.__KVPV_OWN_ACTOR_ID||'');
const C=Object.freeze({skills:[8001,8002,8003,8004,8005],tuyetHoc:[1001,1002,1003,1004,1005,1006,1007,1008],
 hpRetreat:0.10,hpResume:0.15,distance:600,fleeBelow:580,step:260,
 pollMs:150,idleMs:800,moveGapMs:450,maxScan:300,moveFactor:5});
const S={enabled:false,timer:null,timerMs:null,retreat:false,casts:0,moves:0,blocked:0,
 lastCast:null,lastMove:-Infinity,lastDestination:null,enemyId:'',nearDistance:null,
 thCasts:0,basicCasts:0,moveBase:null,moveApplied:null,reason:'off',lastError:''};
const MOVE={obj:null,base:null,applied:null};
const transformSkill=__captureESMFunction((__esmLocal1=(id=>__getKVPV5()?.transformed?.()===true&&__getKVPV5()?.has?.(Number(id))===true)),"transformSkill");
function castSkill(combat,id){if(transformSkill(id))return __callKVPV0(combat,id);return combat.combat(id);}
__esmLocal2=castSkill;

const prop=__captureESMFunction((__esmLocal3=((r,k)=>r?.property?.get?.(k))),"prop");
const id=__captureESMFunction((__esmLocal4=(r=>String(r?.id??prop(r,'id')??''))),"id");
const comp=__captureESMFunction((__esmLocal5=((r,k)=>{const type=W._d?._Yct?.[k];return type?r?.getComponent?.(type):null;})),"comp");
const me=__captureESMFunction((__esmLocal6=(()=>W._C?._Ba?.instance?.getRole?.(Number(actor))??null)),"me");
const owned=__captureESMFunction((__esmLocal7=(()=>!!actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED)),"owned");
const map=__captureESMFunction((__esmLocal8=(()=>Number(W._C?._Mn?._Cn?.currentID))),"map");
const war=__captureESMFunction((__esmLocal9=(()=>W._Ba?._W8t?.main?._mWt?.ins)),"war");
const camp=__captureESMFunction((__esmLocal10=(()=>W._Ba?._W8t?._O8t?.ins)),"camp");
function inside(){
 const m=map(),entry=Number(W._Ba?._$a?._yo?.ins?.intoSce?.[0]);
 const w=war(),c=camp();
 return [2191,2192,2193,2194].includes(m)&&entry===m&&
  Number(w?.status)===3&&Number(w?.fightTime)>0&&
  [0,1].includes(Number(c?.myCampType));
}
__esmLocal11=inside;

function alive(r){
 const hp=prop(r,'hp');
 return !!r&&r.isValid!==false&&Number(prop(r,'status'))!==1024&&
  (!Array.isArray(hp)||Number(hp[0])>0);
}
__esmLocal12=alive;

const pos=__captureESMFunction((__esmLocal13=(r=>{
 const p=prop(r,'position'),x=Number(p?.x),y=Number(p?.y);
 return p&&Number.isFinite(x)&&Number.isFinite(y)?{x,y}:null;
})),"pos");
function enemy(r,self){
 const side=Number(prop(r,'campType'));
 return alive(r)&&r!==self&&id(r)!==actor&&!!id(r)&&
  Number(prop(r,'type'))===4&&[0,1].includes(side)&&
  side!==Number(camp()?.myCampType)&&
  Number(prop(self,'campType'))===Number(camp()?.myCampType);
}
__esmLocal14=enemy;

function restoreMove(){if(MOVE.obj&&MOVE.obj.speed===MOVE.applied)MOVE.obj.speed=MOVE.base;MOVE.obj=null;MOVE.base=null;MOVE.applied=null;S.moveBase=null;S.moveApplied=null;}
__esmLocal15=restoreMove;

function applyMove(self){const mover=comp(self,'_zet');if(!mover||!Number.isFinite(Number(mover.speed))||Number(mover.speed)<=0){restoreMove();return false;}
 const shared=W.KVPV_EXPERIMENTAL_BOOST?.status?.();
 if(shared?.active===true&&shared.movementApplied===true){restoreMove();return false;}
 if(MOVE.obj!==mover){restoreMove();MOVE.obj=mover;MOVE.base=Number(mover.speed);MOVE.applied=MOVE.base*C.moveFactor;}
 else if(mover.speed!==MOVE.applied){MOVE.base=Number(mover.speed);MOVE.applied=MOVE.base*C.moveFactor;}
 mover.speed=MOVE.applied;S.moveBase=MOVE.base;S.moveApplied=MOVE.applied;return true;}
__esmLocal16=applyMove;

function nearest(self,selected){
 const p=pos(self);if(!p)return null;
 let best=null,bestD=Infinity;
 const inspect=__captureESMFunction((__esmLocal18=(r=>{
  if(!enemy(r,self))return;
  const q=pos(r);if(!q)return;
  const d=Math.hypot(q.x-p.x,q.y-p.y);
  if(d<bestD){bestD=d;best={id:id(r),distance:d,ownPos:p,enemyPos:q};}
 })),"inspect");
 inspect(selected);
 const roles=W._C?._Ba?.instance?.getRoles?.();
 if(roles&&typeof roles==='object'){
  let n=0;for(const r of Object.values(roles)){if(++n>C.maxScan)break;inspect(r);}
 }
 return best;
}
__esmLocal17=nearest;

const canRun=__captureESMFunction((__esmLocal19=(()=>W.document?.hidden!==true&&W.document?.hasFocus?.()!==false&&
 Date.now()>=Number(W.__KVPV_USER_UI_UNTIL||0)&&
 __getKVPV1()?.manual!==true&&
 __getKVPV0()?.priority?.()!==true&&
 __getKVPV2()?.status?.(false)?.running!==true)),"canRun");
function flee(self,selected){
 const threat=nearest(self,selected);
 if(!threat){S.enemyId='';S.nearDistance=null;S.reason='retreat_no_verified_enemy';return;}
 S.enemyId=threat.id;S.nearDistance=Number(threat.distance.toFixed(1));
 if(threat.distance>=C.fleeBelow){S.reason='distance_safe';return;}
 const move=comp(self,'_zet');
 if(typeof move?.moveTo!=='function'){S.reason='native_movement_unavailable';return;}
 const now=Date.now();
 if(now-S.lastMove<C.moveGapMs){S.reason='retreat_move_throttled';return;}
 let dx=threat.ownPos.x-threat.enemyPos.x,dy=threat.ownPos.y-threat.enemyPos.y;
 const norm=Math.hypot(dx,dy);
 if(norm<0.001){dx=1;dy=0;}else{dx/=norm;dy/=norm;}
 const step=Math.min(C.step,Math.max(0,C.distance+20-threat.distance));
 const dest={x:Math.round(threat.ownPos.x+dx*step),y:Math.round(threat.ownPos.y+dy*step)};
 if(move.running?.()===true&&S.lastDestination&&
  Math.hypot(dest.x-S.lastDestination.x,dest.y-S.lastDestination.y)<50){
  S.reason='retreat_moving';return;
 }
 move.moveTo(dest.x,dest.y);
 S.lastMove=now;S.lastDestination=dest;S.moves++;S.reason='retreat_kiting_600';
}
__esmLocal20=flee;

function attack(self,combat,selector,selected){
 if(!enemy(selected,self)){S.reason='waiting_selected_enemy';return;}
 S.enemyId=id(selected);
 if(typeof combat?.combat!=='function'||typeof combat?.isCooldown!=='function'||
  typeof combat?.isValidTarget!=='function'||typeof combat?.isValidRange!=='function'||
  typeof selector?._f7t!=='function'){S.reason='native_skill_components_missing';return;}
 if(combat.isCooldown()!==false||combat.isValidTarget()!==true||combat.isValidRange()!==true){
  S.blocked++;S.reason='native_cooldown_target_or_range';return;
 }
 const now=Date.now(),rows=[
  ...(Array.isArray(selector?._rtt)?selector._rtt:[]),
  ...(Array.isArray(selector?._wet)?selector._wet:[])
  ].filter(__captureESMFunction((__esmLocal22=(r=>(C.tuyetHoc.includes(Number(r?.[0]))||C.skills.includes(Number(r?.[0]))||transformSkill(r?.[0]))&&Number.isFinite(Number(r?.[1]))&&Number(r[1])<now)),""));
  const transformed=rows.filter(__captureESMFunction((__esmLocal23=(r=>transformSkill(r[0]))),"")),th=rows.filter(__captureESMFunction((__esmLocal24=(r=>C.tuyetHoc.includes(Number(r[0])))),"")),basic=rows.filter(__captureESMFunction((__esmLocal25=(r=>C.skills.includes(Number(r[0])))),"")),pool=transformed.length?transformed:th.length?th:basic;
 if(!pool.length){S.reason='no_native_ready_tian_quan_skills';return;}
 const picked=Number(selector._f7t(pool,[],1));
 if(!pool.some(__captureESMFunction((__esmLocal26=(r=>Number(r[0])===picked)),""))){S.reason='native_selector_rejected';return;}
 if(!inside()||!enemy(combat.target,self)||combat.target!==selected)return;
  castSkill(combat,picked);
 S.casts++;S.lastCast=now;S.lastSkill=picked;
  if(transformSkill(picked)){S.transformCasts=(S.transformCasts||0)+1;S.reason='native_transform_skill_cast';}
  else if(C.tuyetHoc.includes(picked)){S.thCasts++;S.reason='native_tian_quan_tuyet_hoc_cast';}
 else{S.basicCasts++;S.reason='native_tian_quan_basic_cast';}
}
__esmLocal21=attack;

function tick(){
 if(!S.enabled)return;
 if(!owned()||!inside()){restoreMove();S.reason='outside_verified_tien_ma';S.retreat=false;return;}
 if(!canRun()){restoreMove();S.reason='manual_or_foreign_owner';return;}
 const mode=__getKVPV3()?.status?.(false)?.mode;
 if(mode&&mode!=='OFF'){
  if(typeof __getKVPV3()?.stop==='function')__getKVPV3().stop('yield_to_tien_ma_quyet_chien');
  restoreMove();S.reason='yield_previous_combat_owner';return;
 }
 if(__getKVPV4()?.status?.(false)?.running===true){restoreMove();S.reason='boss_combat_owner';return;}
 const self=me();
 if(!alive(self)||W._Ba?._rJ?._O$?.ins?.isDead===true){restoreMove();S.reason='player_dead';return;}
 applyMove(self);
 const hp=prop(self,'hp'),h=Number(hp?.[0]),max=Number(hp?.[1]);
 if(!Array.isArray(hp)||!Number.isFinite(h)||!Number.isFinite(max)||max<=0){
  S.reason='hp_unavailable';return;
 }
 const ratio=h/max;
 if(ratio<=C.hpRetreat)S.retreat=true;
 else if(ratio>C.hpResume)S.retreat=false;
 const combat=comp(self,'_Het'),selected=combat?.target;
 if(S.retreat){flee(self,selected);return;}
 if(W.KVPV?.core?.scene?.combat?.claim?.('80-tienma-quyetchien-pvp',100)!==true){restoreMove();S.reason='combat_dispatch_wait';return;}
 S.nearDistance=null;attack(self,combat,comp(self,'_Eet'),selected);
}
__esmLocal27=tick;

function safeTick(){
 try{tick();}catch(e){S.lastError=String(e?.message??e);S.reason='error';}
 finally{if(S.enabled)schedule();}
}
__esmLocal28=safeTick;

function schedule(){
 const interval=inside()?C.pollMs:C.idleMs;
 if(S.timer!==null&&S.timerMs===interval)return;
 if(S.timer!==null)(__getKVPV6()?.timers?.clearInterval??W.clearInterval)?.(S.timer);
 S.timer=(__getKVPV6()?.timers?.setInterval??W.setInterval)(safeTick,interval);
 S.timerMs=interval;
}
__esmLocal29=schedule;

function status(){
 const self=me(),hp=prop(self,'hp');
 return {enabled:S.enabled,inside:inside(),map:map(),actor,skills:[...C.tuyetHoc,...C.skills,...(__getKVPV5()?.skills?.().map(__captureESMFunction((__esmLocal31=(x=>x.id)),""))||[])],combo:'native transformed skills, Tuyet Hoc, then basics',
  hpPercent:Array.isArray(hp)&&Number(hp[1])>0?Number((100*hp[0]/hp[1]).toFixed(1)):null,
  retreat:S.retreat,enemyId:S.enemyId,lastSkill:S.lastSkill,transformCasts:S.transformCasts||0,thCasts:S.thCasts,basicCasts:S.basicCasts,moveSpeed:{factor:C.moveFactor,active:!!MOVE.obj,base:S.moveBase,applied:S.moveApplied},nearestEnemyDistance:S.nearDistance,
  targetDistance:C.distance,casts:S.casts,moves:S.moves,blocked:S.blocked,
  lastDestination:S.lastDestination,reason:S.reason,lastError:S.lastError,
  config:{...C},note:'Native Tian Quan skill rotation, verified rival camp, 3x local movement speed. Retreat at 10%, resume above 15%; range 600 is a movement goal, not a server guarantee.'};
}
__esmLocal30=status;

function stop(reason='manual_stop'){
 S.enabled=false;if(S.timer!==null)(__getKVPV6()?.timers?.clearInterval??W.clearInterval)?.(S.timer);
 S.timer=null;S.timerMs=null;S.retreat=false;restoreMove();S.reason=reason;return status();
}
__esmLocal32=stop;

function start(){
 if(!owned())throw Error('Game actor not ready; cannot arm Tien Ma PvP');
 S.enabled=true;safeTick();return status();
}
__esmLocal33=start;

W[KEY]=Object.freeze({start,stop,status,tick:safeTick,config:C});
})),""))();

}
export const api=Object.freeze({
});