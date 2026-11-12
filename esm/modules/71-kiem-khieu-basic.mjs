// Scene-84 combo and movement controller; separate from the Kiếm Khiêu event/window flow.
import {getKVPV_EXPERIMENTAL_BOOST as __getKVPV0,getKVPV_KIEM_KHIEU_BASIC as __getKVPV1,getKVPV_MODE as __getKVPV2,getKVPV_TRANSFORM10 as __getKVPV3,getKVPV_V1 as __getKVPV4} from '../api.mjs';
export function call_KVPV_KIEM_KHIEU_BASIC_tick(...args){const target=globalThis["KVPV_KIEM_KHIEU_BASIC"];const fn=globalThis["KVPV_KIEM_KHIEU_BASIC"]?.["tick"];if(typeof fn!=='function')throw Error("KVPV_KIEM_KHIEU_BASIC.tick is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_KIEM_KHIEU_BASIC_status(...args){const target=globalThis["KVPV_KIEM_KHIEU_BASIC"];const fn=globalThis["KVPV_KIEM_KHIEU_BASIC"]?.["status"];if(typeof fn!=='function')throw Error("KVPV_KIEM_KHIEU_BASIC.status is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_KIEM_KHIEU_BASIC_stop(...args){const target=globalThis["KVPV_KIEM_KHIEU_BASIC"];const fn=globalThis["KVPV_KIEM_KHIEU_BASIC"]?.["stop"];if(typeof fn!=='function')throw Error("KVPV_KIEM_KHIEU_BASIC.stop is not available");return Reflect.apply(fn,target,args);}
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
export {__esmLocal0 as local_anonymous_3_1_0};
export {__esmLocal1 as local_type_1};
export {__esmLocal2 as local_own_2};
export {__esmLocal3 as local_comp_3};
export {__esmLocal4 as local_transformSkill_4};
export {__esmLocal5 as local_allowed_5};
export {__esmLocal6 as local_castSkill_6};
export {__esmLocal7 as local_wrapped_7};
export {__esmLocal8 as local_restoreMove_8};
export {__esmLocal9 as local_applyMove_9};
export {__esmLocal10 as local_releaseGuard_10};
export {__esmLocal11 as local_ensureGuard_11};
export {__esmLocal12 as local_wrap_12};
export {__esmLocal13 as local_tick_13};
export {__esmLocal14 as local_anonymous_89_26_14};
export {__esmLocal15 as local_anonymous_90_33_15};
export {__esmLocal16 as local_anonymous_90_74_16};
export {__esmLocal17 as local_anonymous_90_132_17};
export {__esmLocal18 as local_anonymous_93_30_18};
export {__esmLocal19 as local_stop_19};
export {__esmLocal20 as local_status_20};
export {__esmLocal21 as local_anonymous_102_136_21};
export {__esmLocal22 as local_anonymous_102_541_22};
export function initialize(){
/* Kiem Khieu Quan Hung: native Tian Quan Tuyet Hoc-first combo and local movement boost.
 * Isolated to client scene type 84. Native target, cooldown, range and selector retained. */
(__captureESMFunction((__esmLocal0=(()=>{'use strict';
const W=window,actor=String(W.__KVPV_OWN_ACTOR_ID||''),old=__getKVPV1();
old?.stop?.('reload');
const C={tuyetHoc:[1001,1002,1003,1004,1005,1006,1007,1008],skills:[8001,8002,8003,8004,8005],moveFactor:99};
const S={enabled:true,timer:null,casts:0,transformCasts:0,thCasts:0,basicCasts:0,lastSkill:null,reason:'waiting_scene',error:'',blocked:0,lastOwnerRecoveryAt:0,filtered:0,guard:null,moveBase:null,moveApplied:null,movement:'waiting',visual:{factor:9999,calls:0,applied:0,unavailable:0,conflicts:0}};
const MOVE={obj:null,base:null,applied:null};
const adaptive={enabled:true,minHits:2,exploreEvery:7,ttlMs:3500,maxPending:64,maxContexts:12,
 owner:{},target:null,key:'',pending:[],contexts:new Map(),matchedHits:0,ambiguousHits:0,lastError:''};
const type=__captureESMFunction((__esmLocal1=(()=>Number(W._ft?._po?.ins?.getCfgById?.(Number(W._C?._Mn?._Cn?.currentID))?.[7]))),"type");
const own=__captureESMFunction((__esmLocal2=(()=>actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED)),"own");
const comp=__captureESMFunction((__esmLocal3=((r,n)=>{const key=W._d?._Yct?.[n];return key?r?.getComponent?.(key):null;})),"comp");
const transformSkill=__captureESMFunction((__esmLocal4=(id=>__getKVPV3()?.transformed?.()===true&&__getKVPV3()?.has?.(Number(id))===true)),"transformSkill");
const allowed=__captureESMFunction((__esmLocal5=(id=>C.skills.includes(Number(id))||C.tuyetHoc.includes(Number(id))||transformSkill(id))),"allowed");
const prop=(o,k)=>o?.property?.get?.(k),entityId=o=>String(prop(o,'id')??o?.id??'');
function adaptiveKey(target){return String(W._C?._Mn?._Cn?.currentID??'')+'/'+type()+'/'+entityId(target);}
function adaptiveProfile(target){
 if(!adaptive.enabled||!own()||type()!==84||Number(prop(target,'type'))!==1||!entityId(target))return null;
 const key=adaptiveKey(target);let profile=adaptive.contexts.get(key);
 if(!profile)profile={key,map:String(W._C?._Mn?._Cn?.currentID??''),sceneType:type(),targetId:entityId(target),casts:0,hits:0,explorations:0,skills:new Map()};
 adaptive.contexts.delete(key);adaptive.contexts.set(key,profile);
 while(adaptive.contexts.size>adaptive.maxContexts)adaptive.contexts.delete(adaptive.contexts.keys().next().value);
 return profile;
}
function adaptiveHit(source,marker,damage,flags,receiver){
 if(!adaptive.enabled||!own()||type()!==84||!adaptive.target||String(source)!==actor||
  String(receiver)!==entityId(adaptive.target)||adaptive.key!==adaptiveKey(adaptive.target)||!(Number(damage)>0))return;
 const raw=Number(marker),id=raw/10000,fl=Number(flags)||0;
 if(!Number.isSafeInteger(raw)||raw%10000!==0||!Number.isSafeInteger(id)||(fl&(4|16|32|64|128|256)))return;
 const now=Date.now();adaptive.pending=adaptive.pending.filter(c=>now-c.at<=adaptive.ttlMs);
 const matches=[];for(let i=0;i<adaptive.pending.length;i++)if(adaptive.pending[i].key===adaptive.key&&adaptive.pending[i].id===id)matches.push(i);
 if(matches.length!==1){if(matches.length>1)adaptive.ambiguousHits++;return;}
 adaptive.pending.splice(matches[0],1);const profile=adaptive.contexts.get(adaptive.key);if(!profile)return;
 let sample=profile.skills.get(id);if(!sample){sample={id,attempts:0,hits:0,damage:0};profile.skills.set(id,sample);}
 sample.hits++;sample.damage+=Number(damage);profile.hits++;adaptive.matchedHits++;
}
function detachAdaptiveTarget(){
 const key=adaptive.key;if(adaptive.target){try{adaptive.target.off?.(1012,adaptive.owner,adaptiveHit);}catch(e){adaptive.lastError=String(e?.message??e);}}
 adaptive.target=null;adaptive.key='';if(key)adaptive.pending=adaptive.pending.filter(c=>c.key!==key);
}
function syncAdaptiveTarget(target){
 const valid=adaptive.enabled&&S.enabled&&own()&&type()===84&&Number(prop(target,'type'))===1&&entityId(target)!=='';
 const key=valid?adaptiveKey(target):'';if(target===adaptive.target&&key===adaptive.key)return;
 detachAdaptiveTarget();if(!valid)return;
 if(typeof target?.on!=='function'||typeof target?.off!=='function'){adaptive.lastError='target_hit_listener_unavailable';return;}
 adaptive.target=target;adaptive.key=key;adaptiveProfile(target);
 try{target.on(1012,adaptive.owner,adaptiveHit);adaptive.lastError='';}catch(e){adaptive.lastError=String(e?.message??e);adaptive.target=null;adaptive.key='';}
}
function recordAdaptiveCast(id,target){
 const profile=adaptiveProfile(target);if(!profile)return;
 const now=Date.now();profile.casts++;
 let sample=profile.skills.get(id);if(!sample){sample={id,attempts:0,hits:0,damage:0};profile.skills.set(id,sample);}
 sample.attempts++;adaptive.pending=adaptive.pending.filter(c=>now-c.at<=adaptive.ttlMs);
 adaptive.pending.push({key:profile.key,id,at:now});if(adaptive.pending.length>adaptive.maxPending)adaptive.pending.shift();
}
function rankAdaptive(rows,target){
 const profile=adaptiveProfile(target);if(!profile)return rows;
 const order=new Map(rows.map((row,index)=>[Number(row?.[0]),index]));
 const explore=profile.casts>0&&profile.casts%adaptive.exploreEvery===0;if(explore)profile.explorations++;
 return rows.sort((a,b)=>{
  const aid=Number(a?.[0]),bid=Number(b?.[0]),ah=profile.skills.get(aid)?.hits||0,bh=profile.skills.get(bid)?.hits||0;
  if(explore&&ah!==bh)return ah-bh;
  const as=ah>=adaptive.minHits?profile.skills.get(aid).damage/ah:null,bs=bh>=adaptive.minHits?profile.skills.get(bid).damage/bh:null;
  if(as!==null||bs!==null){if(as===null)return 1;if(bs===null)return -1;if(as!==bs)return bs-as;}
  return (order.get(aid)??0)-(order.get(bid)??0);
 });
}
function adaptiveStatus(){
 const profile=adaptive.contexts.get(adaptive.key);
 adaptive.pending=adaptive.pending.filter(c=>Date.now()-c.at<=adaptive.ttlMs);
 return {enabled:adaptive.enabled,active:!!profile&&adaptive.target!==null,context:adaptive.key||null,contexts:adaptive.contexts.size,
  matchedHits:adaptive.matchedHits,ambiguousHits:adaptive.ambiguousHits,pending:adaptive.pending.length,minimumMatchedHits:adaptive.minHits,exploreEvery:adaptive.exploreEvery,
  explorationChecks:profile?.explorations??0,
  lastError:adaptive.lastError,skills:profile?[...profile.skills.values()].map(s=>({id:s.id,attempts:s.attempts,matchedHits:s.hits,matchedDamage:s.damage,meanDamage:s.hits?s.damage/s.hits:null})):[],
  note:'Only matched direct damage ranks skills; an unconfirmed cast is not treated as a miss.'};
}
// Visual-only acceleration for one native cast; restore the original tween method immediately.
function castSkill(combat,skill){
 const avatar=combat?._Qrt,original=avatar?.getActionTween;
 const descriptor=avatar&&Object.getOwnPropertyDescriptor(avatar,'getActionTween');
 if(typeof original!=='function'||(descriptor&&descriptor.configurable===false)){
  S.visual.unavailable++;return combat.combat(skill);
 }
 let action;try{action=combat?._mvt?.(skill)?.[5];}catch(_){}
 const expected=typeof action==='string'&&action.trim()?action:'attack';
 const wrapped=__captureESMFunction((__esmLocal7=(function(...args){
  if(args[0]===expected){
   const speed=Number(args[2]??1);
   if(Number.isFinite(speed)&&speed>0){args[2]=Math.min(9999,speed*9999);S.visual.applied++;}
  }
  return original.apply(this,args);
 })),"wrapped");
 try{Object.defineProperty(avatar,'getActionTween',{configurable:true,writable:true,enumerable:descriptor?.enumerable??false,value:wrapped});}
 catch(_){S.visual.unavailable++;return combat.combat(skill);}
 S.visual.calls++;
 try{return combat.combat(skill);}
 finally{
  if(avatar.getActionTween===wrapped){
   try{if(descriptor)Object.defineProperty(avatar,'getActionTween',descriptor);else delete avatar.getActionTween;}
   catch(e){S.visual.conflicts++;S.error=String(e?.message??e);}
  }else S.visual.conflicts++;
 }
}
__esmLocal6=castSkill;

function restoreMove(){if(MOVE.obj&&MOVE.obj.speed===MOVE.applied)MOVE.obj.speed=MOVE.base;
 MOVE.obj=null;MOVE.base=null;MOVE.applied=null;S.moveBase=null;S.moveApplied=null;}
__esmLocal8=restoreMove;

function applyMove(role){const mover=comp(role,'_zet'),shared=__getKVPV0()?.status?.();
 if(shared?.enabled===true&&Number(shared.moveFactor)>=9){restoreMove();return 'shared_fast_boost';}
 if(!mover||!Number.isFinite(Number(mover.speed))||Number(mover.speed)<=0){restoreMove();return 'movement_unavailable';}
 if(MOVE.obj!==mover){restoreMove();MOVE.obj=mover;MOVE.base=Number(mover.speed);MOVE.applied=MOVE.base*C.moveFactor;}
 else if(mover.speed!==MOVE.applied){MOVE.base=Number(mover.speed);MOVE.applied=MOVE.base*C.moveFactor;}
 mover.speed=MOVE.applied;S.moveBase=MOVE.base;S.moveApplied=MOVE.applied;return 'local_x99';}
__esmLocal9=applyMove;

function releaseGuard(){
 const g=S.guard;if(!g)return;
 try{if(g.combat.combat===g.wrap){if(g.descriptor)Object.defineProperty(g.combat,'combat',g.descriptor);else delete g.combat.combat;}}catch(e){S.error=String(e?.message??e);}
 S.guard=null;
}
__esmLocal10=releaseGuard;

function ensureGuard(c){
 if(S.guard?.combat===c&&c.combat===S.guard.wrap)return true;
 releaseGuard();
 if(typeof c?.combat!=='function')return false;
 const original=c.combat,descriptor=Object.getOwnPropertyDescriptor(c,'combat');
 if(descriptor&&descriptor.configurable===false)return false;
 const wrap=__captureESMFunction((__esmLocal12=(function(skill,...args){
  if(S.enabled&&own()&&type()===84&&this===c&&!allowed(skill)){S.filtered++;return;}
  return original.call(this,skill,...args);
 })),"wrap");
 try{Object.defineProperty(c,'combat',{configurable:true,writable:true,enumerable:descriptor?.enumerable??false,value:wrap});S.guard={combat:c,wrap,descriptor};return true;}
 catch(e){S.error=String(e?.message??e);return false;}
}
__esmLocal11=ensureGuard;

function tick(){if(!S.enabled){detachAdaptiveTarget();return;}
 try{
  if(!own()||type()!==84){detachAdaptiveTarget();releaseGuard();restoreMove();S.reason='outside_kiem_khieu';return;}
  const role=W._C?._Ba?.instance?.getRole?.(Number(actor)),combat=comp(role,'_Het'),sel=comp(role,'_Eet'),target=combat?.target;
  if(!role||W._Ba?._rJ?._O$?.ins?.isDead===true){detachAdaptiveTarget();releaseGuard();restoreMove();S.reason='waiting_valid_target';return;}
  if(Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)){detachAdaptiveTarget();releaseGuard();restoreMove();S.reason='manual_ui';return;}
  if(![1,4].includes(Number(target?.property?.get?.('type')))||target?.isValid===false){detachAdaptiveTarget();releaseGuard();restoreMove();S.reason='waiting_valid_target';return;}
  S.movement=applyMove(role);
  const mode=__getKVPV2()?.status?.(false)?.mode;
  if(mode&&mode!=='OFF'){
   if(Date.now()-S.lastOwnerRecoveryAt>=5000&&typeof __getKVPV2()?.stop==='function'){
    S.lastOwnerRecoveryAt=Date.now();
    __getKVPV2().stop('Kiem Khieu scene84: handoff player combat to native Tian Quan combo');
   }
   const current=__getKVPV2()?.status?.(false)?.mode;
   if(current&&current!=='OFF'){detachAdaptiveTarget();releaseGuard();restoreMove();S.reason='other_combat_owner';return;}
  }
  syncAdaptiveTarget(Number(prop(target,'type'))===1?target:null);
  if(typeof combat?.isCooldown!=='function'||combat.isCooldown()!==false){releaseGuard();restoreMove();S.blocked++;S.reason='native_cooldown';return;}
  if(combat.isValidTarget?.()!==true||combat.isValidRange?.()!==true){releaseGuard();restoreMove();S.reason='native_target_or_range';return;}
  if(typeof sel?._f7t!=='function'||typeof combat?.combat!=='function'){releaseGuard();restoreMove();S.reason='native_combat_unavailable';return;}
  if(W.KVPV?.core?.scene?.combat?.claim?.('71-kiem-khieu-basic',100)!==true){detachAdaptiveTarget();releaseGuard();restoreMove();S.reason='combat_dispatch_wait';return;}
  if(combat&&!ensureGuard(combat)){detachAdaptiveTarget();restoreMove();S.reason='native_filter_unavailable';return;}
  const now=Date.now(),list=[...(Array.isArray(sel._rtt)?sel._rtt:[]),...(Array.isArray(sel._wet)?sel._wet:[])];
  const ready=list.filter(__captureESMFunction((__esmLocal14=(x=>allowed(x?.[0])&&Number.isFinite(Number(x?.[1]))&&Number(x[1])<now)),""));
  const transformed=ready.filter(__captureESMFunction((__esmLocal15=(x=>transformSkill(x[0]))),"")),th=ready.filter(__captureESMFunction((__esmLocal16=(x=>C.tuyetHoc.includes(Number(x[0])))),"")),basics=ready.filter(__captureESMFunction((__esmLocal17=(x=>C.skills.includes(Number(x[0])))),"")),pool=transformed.length?transformed:th.length?th:basics;
  if(!pool.length){S.reason='waiting_tian_quan_skill_ready';return;}
  const ranked=rankAdaptive(pool,target),id=Number(sel._f7t(ranked,[],1));
  if(!allowed(id)||!pool.some(__captureESMFunction((__esmLocal18=(x=>Number(x[0])===id)),""))){S.reason='native_tian_quan_skill_rejected';return;}
  if(combat.target!==target||type()!==84)return;
  castSkill(combat,id);if(Number(prop(target,'type'))===1)recordAdaptiveCast(id,target);S.casts++;S.lastSkill=id;
  if(transformSkill(id)){S.transformCasts++;S.reason='native_transform_skill_cast';}
  else if(C.tuyetHoc.includes(id)){S.thCasts++;S.reason='native_tian_quan_tuyet_hoc_cast';}
  else{S.basicCasts++;S.reason='native_tian_quan_basic_cast';}
 }catch(e){S.error=String(e?.message??e);S.reason='error';}
}
__esmLocal13=tick;

function setAdaptiveRanking(enabled=true){adaptive.enabled=!!enabled;if(!adaptive.enabled)detachAdaptiveTarget();else syncAdaptiveTarget(comp(W._C?._Ba?.instance?.getRole?.(Number(actor)),'_Het')?.target);return adaptiveStatus();}
function stop(reason='stopped'){S.enabled=false;detachAdaptiveTarget();releaseGuard();restoreMove();const clear=__getKVPV4()?.timers?.clearInterval??W.clearInterval;if(S.timer!=null&&typeof clear==='function')clear(S.timer);S.timer=null;S.reason=reason;}
__esmLocal19=stop;

function status(){return {enabled:S.enabled,inside:type()===84,skills:[...C.tuyetHoc,...C.skills,...(__getKVPV3()?.skills?.().map(__captureESMFunction((__esmLocal21=(x=>x.id)),""))||[])],combo:'native transformed skills, then Tuyet Hoc, then basics',pollMs:1,nativeCooldownPreserved:true,tuyetHoc:true,casts:S.casts,transformCasts:S.transformCasts,thCasts:S.thCasts,basicCasts:S.basicCasts,lastSkill:S.lastSkill,adaptiveCombo:adaptiveStatus(),blockedCooldown:S.blocked,filteredNonCombo:S.filtered,filterActive:!!S.guard,sceneId:W._C?._Mn?._Cn?.currentID??null,sceneType:type(),actorMatch:!!own(),targetType:(__captureESMFunction((__esmLocal22=(()=>{const r=W._C?._Ba?.instance?.getRole?.(Number(actor));return comp(r,'_Het')?.target?.property?.get?.('type')??null;})),""))(),combatMode:__getKVPV2()?.status?.(false)?.mode??null,timerActive:S.timer!==null,moveFactor:C.moveFactor,movement:S.movement,moveBase:S.moveBase,moveApplied:S.moveApplied,moveActive:!!MOVE.obj,visual:{...S.visual,transformVisualFactor:null,visualOnly:false,nativeSkillSpeed:true},reason:S.reason,error:S.error};}
__esmLocal20=status;

W.KVPV_KIEM_KHIEU_BASIC=Object.freeze({tick,status,stop,setAdaptiveRanking});
const schedule=__getKVPV4()?.timers?.setInterval??W.setInterval;
if(typeof W.setInterval==='function'&&typeof schedule==='function')S.timer=schedule(tick,1);
tick();
})),""))();
}
export {getKVPV_KIEM_KHIEU_BASIC} from '../api.mjs';
export const api=Object.freeze({
  get KVPV_KIEM_KHIEU_BASIC(){return globalThis.KVPV_KIEM_KHIEU_BASIC;},
});