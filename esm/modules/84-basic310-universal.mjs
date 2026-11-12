import {getKVPV_BASIC310_UNIVERSAL as __getKVPV0,getKVPV_BEAST_ISLAND as __getKVPV1,getKVPV_BOSS_TEAM as __getKVPV2,getKVPV_DAILY as __getKVPV3,getKVPV_ENTRY_POLICY as __getKVPV4,getKVPV_EVENT_PRIORITY as __getKVPV5,getKVPV_HITRUN1 as __getKVPV6,getKVPV_MODE as __getKVPV7,getKVPV_TH300 as __getKVPV8,getKVPV_TRANH_BA_TU_PHUONG as __getKVPV9,getKVPV_V1 as __getKVPV10} from '../api.mjs';
export function call_KVPV_BASIC310_UNIVERSAL_status(...args){const target=globalThis["KVPV_BASIC310_UNIVERSAL"];const fn=globalThis["KVPV_BASIC310_UNIVERSAL"]?.["status"];if(typeof fn!=='function')throw Error("KVPV_BASIC310_UNIVERSAL.status is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_BASIC310_UNIVERSAL_tick(...args){const target=globalThis["KVPV_BASIC310_UNIVERSAL"];const fn=globalThis["KVPV_BASIC310_UNIVERSAL"]?.["tick"];if(typeof fn!=='function')throw Error("KVPV_BASIC310_UNIVERSAL.tick is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_BASIC310_UNIVERSAL_stop(...args){const target=globalThis["KVPV_BASIC310_UNIVERSAL"];const fn=globalThis["KVPV_BASIC310_UNIVERSAL"]?.["stop"];if(typeof fn!=='function')throw Error("KVPV_BASIC310_UNIVERSAL.stop is not available");return Reflect.apply(fn,target,args);}
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
export {__esmLocal0 as local_anonymous_3_1_0};
export {__esmLocal1 as local_own_1};
export {__esmLocal2 as local_pos_2};
export {__esmLocal3 as local_get_3};
export {__esmLocal4 as local_excluded_4};
export {__esmLocal5 as local_crystalScope_5};
export {__esmLocal6 as local_releaseCrystalGuard_6};
export {__esmLocal7 as local_installCrystalGuard_7};
export {__esmLocal8 as local_wrapper_8};
export {__esmLocal9 as local_priority_9};
export {__esmLocal10 as local_tick_10};
export {__esmLocal11 as local_anonymous_48_26_11};
export {__esmLocal12 as local_anonymous_67_25_12};
export {__esmLocal13 as local_stop_13};
export {__esmLocal14 as local_status_14};
export function initialize(){
/* Generic idle combat: native basic 8001 at standoff 310.
 * Crystal map 2992/type 35 uses native basics 8001..8005 without a standoff goal. */
(__captureESMFunction((__esmLocal0=(()=>{'use strict';
const W=window,old=__getKVPV0();old?.stop?.('reload');
const actor=String(W.__KVPV_OWN_ACTOR_ID??'');
const S={enabled:true,timer:null,casts:0,moves:0,lastMoveAt:0,lastCastAt:0,crystalCasts:0,crystalBlocked:0,distance:null,reason:'waiting',error:'',skill:8001};
const BASIC_IDS=Object.freeze([8001,8002,8003,8004,8005]),CRYSTAL_MAP=2992,CRYSTAL_SCENE=35;
const G={combat:null,wrapper:null,descriptor:null};
function nativeSkillChoice(selector,rows){
  if(!selector||typeof selector._f7t!=='function'||!Array.isArray(rows)||!rows.length)return null;
  const picked=Number(selector._f7t(rows,[],1));
  return BASIC_IDS.includes(picked)?picked:null;
}
const own=__captureESMFunction((__esmLocal1=(()=>!!actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED)),"own");
const pos=__captureESMFunction((__esmLocal2=(r=>{const p=r?.property?.get?.('position'),x=Number(p?.x),y=Number(p?.y);return Number.isFinite(x)&&Number.isFinite(y)?{x,y}:null;})),"pos");
const get=__captureESMFunction((__esmLocal3=((r,k)=>{const t=W._d?._Yct?.[k];return t?r?.getComponent?.(t):null;})),"get");
function excluded(){const e=__getKVPV9()?.status?.();return e?.inside===true||(e?.eventActive===true&&W._Ba?._$a?.SceneUtil?.isCommonScene===false&&(e?.verifiedMap==null||Number(e.map)===Number(e.verifiedMap)));}
__esmLocal4=excluded;

function crystalScope(){const id=Number(W._C?._Mn?._Cn?.currentID??W._Ba?._$a?._yo?.ins?.intoSce?.[0]);return id===CRYSTAL_MAP&&Number(W._ft?._po?.ins?.getCfgById?.(id)?.[7])===CRYSTAL_SCENE&&Number(W._Ba?._$a?._yo?.ins?.intoSce?.[0])===CRYSTAL_MAP;}
__esmLocal5=crystalScope;

function releaseCrystalGuard(){const g=G;if(!g.combat)return;try{if(g.combat.combat===g.wrapper){if(g.descriptor)Object.defineProperty(g.combat,'combat',g.descriptor);else delete g.combat.combat;}}catch(e){S.error=String(e?.message??e);}G.combat=G.wrapper=G.descriptor=null;}
__esmLocal6=releaseCrystalGuard;

function installCrystalGuard(c){if(G.combat===c&&c?.combat===G.wrapper)return true;releaseCrystalGuard();if(typeof c?.combat!=='function')return false;const original=c.combat,descriptor=Object.getOwnPropertyDescriptor(c,'combat');if(descriptor?.configurable===false&&descriptor.writable!==true)return false;const wrapper=__captureESMFunction((__esmLocal8=(function(skill,...args){if(crystalScope()&&!BASIC_IDS.includes(Number(skill))){S.crystalBlocked++;return;}return original.apply(this,[skill,...args]);})),"wrapper");try{Object.defineProperty(c,'combat',{configurable:descriptor?.configurable??true,writable:descriptor?.writable??true,enumerable:descriptor?.enumerable??false,value:wrapper});G.combat=c;G.wrapper=wrapper;G.descriptor=descriptor;return true;}catch(e){S.error=String(e?.message??e);return false;}}
__esmLocal7=installCrystalGuard;

function priority(){
 if(__getKVPV4()?.manual===true||__getKVPV5()?.hold?.()||__getKVPV2()?.priority?.())return 'priority_owner';
 const q=__getKVPV3()?.quickState?.();
 if(q?.running===true&&!['idle','rảnh','ranh',''].includes(String(q?.job??'').toLowerCase()))return 'daily_job';
 if(__getKVPV8()?.status?.(false)?.running===true||__getKVPV6()?.status?.(false)?.running===true)return 'boss_owner';
 const mode=__getKVPV7()?.status?.(false)?.mode;
 if(mode&&mode!=='OFF')return 'mode_owner';
 const lease=W.KVPV?.core?.scene?.status?.();
 if(lease?.owner)return 'scene_lease';
 const beast=__getKVPV1()?.status?.();
 if(beast?.phase==='ACTIVE'||beast?.phase==='ENTERING')return 'beast_task';
 if(W._Ba?._K_t?._Z7t?.ins?.gathering===true)return 'gathering';
 return null;
}
__esmLocal9=priority;

function tick(){try{
 if(!S.enabled||!own()){releaseCrystalGuard();S.reason='actor_unavailable';return;}
 if(excluded()){releaseCrystalGuard();S.reason='excluded_tranh_ba_tu_phuong';return;}
 const crystal=crystalScope();
 if(!crystal)releaseCrystalGuard();
 if(W._Ba?._rJ?._O$?.ins?.isDead===true){releaseCrystalGuard();S.reason='dead';return;}
 if(Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)){releaseCrystalGuard();S.reason='manual_ui';return;}
 const blocked=priority();if(blocked){releaseCrystalGuard();S.reason=blocked;return;}
 const role=W._C?._Ba?.instance?.getRole?.(Number(actor)),combat=get(role,'_Het'),selector=get(role,'_Eet'),mover=get(role,'_zet'),target=combat?.target;
 if(crystal&&!installCrystalGuard(combat)){S.reason='crystal_guard_unavailable';return;}
 const kind=Number(target?.property?.get?.('type'));
 if(!target||target.isValid===false||kind!==1){S.reason='waiting_monster_target';return;}
 const hp=target.property?.get?.('hp');
 if(Array.isArray(hp)&&Number(hp[0])<=0){S.reason='target_dead';return;}
 if(W.KVPV?.core?.scene?.combat?.claim?.('84-basic310-universal',60)!==true){releaseCrystalGuard();S.reason='combat_dispatch_wait';return;}
 if(crystal){
  if(combat.target!==target||typeof combat?.isCooldown!=='function'||combat.isCooldown()!==false){S.reason='crystal_native_cooldown';return;}
  if(combat.isValidTarget?.()!==true||combat.isValidRange?.()!==true){S.reason='crystal_native_range_or_target';return;}
  const rows=[...(Array.isArray(selector?._rtt)?selector._rtt:[]),...(Array.isArray(selector?._wet)?selector._wet:[])],now=Date.now();
  const ready=rows.filter(__captureESMFunction((__esmLocal11=(r=>BASIC_IDS.includes(Number(r?.[0]))&&Number(r?.[1])<now)),""));
  if(!ready.length||typeof selector?._f7t!=='function'||typeof combat?.combat!=='function'){S.reason='crystal_waiting_basic';return;}
  const skill=nativeSkillChoice(selector,ready);
  if(!BASIC_IDS.includes(skill)||combat.target!==target||!crystalScope()||priority()){S.reason='crystal_selector_changed';return;}
  combat.combat(skill);S.crystalCasts++;S.lastCastAt=now;S.reason='crystal_cast_'+skill;return;
 }
 const a=pos(role),b=pos(target);if(!a||!b){S.reason='waiting_positions';return;}
 const d=Math.hypot(a.x-b.x,a.y-b.y);S.distance=Math.round(d*100)/100;
 if(d<1){S.reason='overlap';return;}
 if(Math.abs(d-310)>5){
  if(typeof mover?.moveTo==='function'&&Date.now()-S.lastMoveAt>=800&&mover.running?.()!==true){
   const x=b.x+(a.x-b.x)*310/d,y=b.y+(a.y-b.y)*310/d;
   if(Number.isFinite(x)&&Number.isFinite(y)){mover.moveTo(x,y);S.moves++;S.lastMoveAt=Date.now();}
  }
  S.reason='moving_to_310';return;
 }
 if(typeof combat?.isCooldown!=='function'||combat.isCooldown()!==false){S.reason='native_cooldown';return;}
 if(combat.isValidTarget?.()!==true||combat.isValidRange?.()!==true){S.reason='native_range_or_target';return;}
 const rows=[...(Array.isArray(selector?._rtt)?selector._rtt:[]),...(Array.isArray(selector?._wet)?selector._wet:[])];
 const ready=rows.filter(__captureESMFunction((__esmLocal12=(r=>Number(r?.[0])===8001&&Number(r?.[1])<Date.now())),""));
 if(!ready.length||typeof selector?._f7t!=='function'||typeof combat?.combat!=='function'){S.reason='waiting_basic8001';return;}
 const skill=nativeSkillChoice(selector,ready);
 if(skill!==8001){S.reason='selector_rejected';return;}
 if(combat.target!==target||excluded()||priority()){S.reason='owner_changed';return;}
 combat.combat(skill);S.casts++;S.lastCastAt=Date.now();S.reason='cast_8001';
 }catch(e){S.error=String(e?.message??e);S.reason='error';}}
__esmLocal10=tick;

function stop(reason='stop'){S.enabled=false;releaseCrystalGuard();const clear=__getKVPV10()?.timers?.clearInterval??W.clearInterval;if(S.timer!==null&&typeof clear==='function')clear(S.timer);S.timer=null;S.reason=reason;}
__esmLocal13=stop;

function status(){return {enabled:S.enabled,skill:8001,crystalMap:CRYSTAL_MAP,crystalScene:CRYSTAL_SCENE,crystalSkills:BASIC_IDS.slice(),crystalMode:'native range, no standoff',crystalCasts:S.crystalCasts,crystalBlockedNonBasic:S.crystalBlocked,goal:crystalScope()?null:310,tolerance:crystalScope()?null:5,pollMs:1,insideExcludedEvent:excluded(),distance:S.distance,casts:S.casts,moves:S.moves,lastCastAt:S.lastCastAt,reason:S.reason,error:S.error,nativeCooldown:true,nativeRange:true};}
__esmLocal14=status;

W.KVPV_BASIC310_UNIVERSAL=Object.freeze({status,tick,stop});
const schedule=__getKVPV10()?.timers?.setInterval??W.setInterval;
if(typeof W.setInterval==='function'&&typeof schedule==='function')S.timer=schedule(tick,1);
tick();
})),""))();
}
export {getKVPV_BASIC310_UNIVERSAL} from '../api.mjs';
export const api=Object.freeze({
  get KVPV_BASIC310_UNIVERSAL(){return globalThis.KVPV_BASIC310_UNIVERSAL;},
});