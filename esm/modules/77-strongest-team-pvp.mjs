import {getKVPV_BOSS_TEAM as __getKVPV0,getKVPV_ENTRY_POLICY as __getKVPV1,getKVPV_HITRUN1 as __getKVPV2,getKVPV_PVP_LUOFENG as __getKVPV3,getKVPV_STRONGEST_TEAM as __getKVPV4,getKVPV_TH300 as __getKVPV5,getKVPV_TRANSFORM10 as __getKVPV6,getKVPV_V1 as __getKVPV7} from '../api.mjs';
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
export {__esmLocal0 as local_anonymous_5_1_0};
export {__esmLocal1 as local_prop_1};
export {__esmLocal2 as local_identity_2};
export {__esmLocal3 as local_types_3};
export {__esmLocal4 as local_component_4};
export {__esmLocal5 as local_me_5};
export {__esmLocal6 as local_owned_6};
export {__esmLocal7 as local_transformSkill_7};
export {__esmLocal8 as local_castSkill_8};
export {__esmLocal9 as local_inEvent_9};
export {__esmLocal10 as local_enemyValid_10};
export {__esmLocal11 as local_anonymous_30_49_11};
export {__esmLocal12 as local_releaseDodge_12};
export {__esmLocal13 as local_dodge_13};
export {__esmLocal14 as local_readySkills_14};
export {__esmLocal15 as local_anonymous_50_20_15};
export {__esmLocal16 as local_tick_16};
export {__esmLocal17 as local_anonymous_85_32_17};
export {__esmLocal18 as local_anonymous_86_23_18};
export {__esmLocal19 as local_anonymous_87_26_19};
export {__esmLocal20 as local_anonymous_91_45_20};
export {__esmLocal21 as local_safeTick_21};
export {__esmLocal22 as local_start_22};
export {__esmLocal23 as local_stop_23};
export {__esmLocal24 as local_status_24};
export function initialize(){
/* Strongest Team PvP: native cast priority and selected-enemy TH dodge.
 * Scope is verified native scene 82 and the existing Strongest Team owner.
 * No synthetic RPC, cooldown rewrites, team-target switching or rewards.
 */
(__captureESMFunction((__esmLocal0=(() => {
'use strict';
const W=window,KEY='KVPV_STRONGEST_PVP',old=W[KEY];
try{old?.stop?.('reload');}catch(e){__getKVPV7()?.diagnostics?.record?.(e);}
const actor=String(W.__KVPV_OWN_ACTOR_ID||'');
const C={enabled:true,nativeAttack:true,dodgeTH:true,pollMs:120};
const S={timer:null,armedDodge:false,casts:0,blocked:0,thCasts:0,basicCasts:0,transformCasts:0,
 lastSkill:null,lastCastAt:null,reason:'waiting_scene_82',lastError:'',enemyId:''};
const prop=__captureESMFunction((__esmLocal1=((o,k)=>o?.property?.get?.(k))),"prop");
const identity=__captureESMFunction((__esmLocal2=(o=>String(o?.id??prop(o,'id')??''))),"identity");
const types=__captureESMFunction((__esmLocal3=(()=>W._d?._Yct??{})),"types");
const component=__captureESMFunction((__esmLocal4=((role,key)=>types()[key]?role?.getComponent?.(types()[key]):null)),"component");
const me=__captureESMFunction((__esmLocal5=(()=>W._C?._Ba?.instance?.getRole?.(Number(actor))??null)),"me");
const owned=__captureESMFunction((__esmLocal6=(()=>!!actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED)),"owned");
const transformSkill=__captureESMFunction((__esmLocal7=(id=>__getKVPV6()?.transformed?.()===true&&__getKVPV6()?.has?.(Number(id))===true)),"transformSkill");
function castSkill(combat,id){if(transformSkill(id))return __callKVPV0(combat,id);return combat.combat(id);}
__esmLocal8=castSkill;

const inEvent=__captureESMFunction((__esmLocal9=(()=>{
 const s=__getKVPV4()?.status?.();
 return s?.enabled===true&&s?.phase==='ACTIVE'&&s?.inside===true&&s?.open===true;
})),"inEvent");
function enemyValid(target){
 if(!target||target.isValid===false||identity(target)===''||identity(target)===actor||Number(prop(target,'type'))!==4)return false;
 const m=W._Ba?._T3?._G_t?.instance;
 if(!m||String(m.selectTagetId)!==identity(target))return false;
 const opponents=m.getNearPlayerRank?.();
 return Array.isArray(opponents)&&opponents.some(__captureESMFunction((__esmLocal11=(x=>x&&String(x.objId)===identity(target)&&m.isMyTeam?.(x.color)===false)),""));
}
__esmLocal10=enemyValid;

function releaseDodge(reason){
 if(!S.armedDodge)return;
 try{__getKVPV3()?.stop?.('strongest_team_'+reason);}catch(e){S.lastError=String(e);}
 S.armedDodge=false;
}
__esmLocal12=releaseDodge;

function dodge(target){
 if(!C.dodgeTH){releaseDodge('disabled');return;}
 const observer=__getKVPV3();
 if(!observer?.start||!observer?.status){S.reason='dodge_module_missing';return;}
 if(!S.armedDodge){
  if(observer.status().enabled){S.reason='other_dodge_owner';return;}
  observer.start({autoDodge:true,nearby:true});S.armedDodge=true;
 }else if(observer.status().enabled!==true){S.armedDodge=false;S.reason='dodge_stopped_elsewhere';return;}
 observer.sync?.();
}
__esmLocal13=dodge;

const readySkills=__captureESMFunction((__esmLocal14=((selector,at)=>{
 const rows=[...(Array.isArray(selector?._rtt)?selector._rtt:[]),
             ...(Array.isArray(selector?._wet)?selector._wet:[])];
 return rows.filter(__captureESMFunction((__esmLocal15=(row=>{
  const k=Number(row?.[0]),until=Number(row?.[1]);
   return Number.isSafeInteger(k)&&(k>=1001&&k<=1008||k>=8001&&k<=8005||transformSkill(k))&&
         Number.isFinite(until)&&until<at;
 })),""));
})),"readySkills");
function tick(){
 if(!C.enabled||!owned()){releaseDodge('inactive');S.reason='disabled_or_actor_changed';return;}
 if(!inEvent()){releaseDodge('scene_left');S.reason='waiting_scene_82';S.enemyId='';return;}
 if(__getKVPV1()?.manual===true){releaseDodge('manual_policy');S.reason='manual_policy';return;}
 const role=me(),combat=component(role,'_Het'),selector=component(role,'_Eet'),target=combat?.target;
 if(!enemyValid(target)){releaseDodge('no_enemy');S.reason='waiting_verified_enemy';S.enemyId='';return;}
 S.enemyId=identity(target);
 if(W._Ba?._rJ?._O$?.ins?.isDead===true){releaseDodge('dead');S.reason='dead';return;}
 try{dodge(target);}catch(e){S.lastError=String(e);S.reason='dodge_error';}
 // A native lateral dodge gets a short exclusive movement window. Avoid
 // sending an attack in the same instant as an observed enemy TH.
 const d=S.armedDodge?__getKVPV3()?.status?.():null;
 if(d?.lastDodgeAt!=null&&Date.now()-d.lastDodgeAt<180){
   S.reason='dodge_movement_priority';return;
 }
 if(!C.nativeAttack){S.reason='dodge_only';return;}
 if(W.document?.hidden===true||W.document?.hasFocus?.()===false||
    Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)){S.reason='manual_or_unfocused';return;}
 if(__getKVPV0()?.priority?.()===true||
    __getKVPV5()?.status?.(false)?.running===true||
    __getKVPV2()?.status?.(false)?.running===true){S.reason='foreign_combat_owner';return;}
 if(C.nativeAttack&&W.KVPV?.core?.scene?.combat?.claim?.('77-strongest-team-pvp',100)!==true){S.reason='combat_dispatch_wait';return;}
 if(typeof combat?.combat!=='function'||typeof combat?.isCooldown!=='function'||
    typeof combat?.isValidTarget!=='function'||typeof combat?.isValidRange!=='function'||
    typeof selector?._f7t!=='function'){S.reason='native_combat_unavailable';return;}
 if(combat.isCooldown()!==false||combat.isValidTarget()!==true||combat.isValidRange()!==true){
   S.blocked++;S.reason='native_cooldown_target_or_range';return;
 }
 const now=Date.now(),rows=readySkills(selector,now);
 // Native selectors decide within the ready group, TH before basic. Never forge a ready timestamp.
  const transformed=rows.filter(__captureESMFunction((__esmLocal17=(r=>transformSkill(r[0]))),""));
  const th=rows.filter(__captureESMFunction((__esmLocal18=(r=>Number(r[0])>=1001&&Number(r[0])<=1008)),""));
  const basic=rows.filter(__captureESMFunction((__esmLocal19=(r=>Number(r[0])>=8001&&Number(r[0])<=8005)),""));
  const pool=transformed.length?transformed:th.length?th:basic;
 if(!pool.length){S.reason='no_native_ready_skills';return;}
 const skill=Number(selector._f7t(pool,[],1));
 if(!Number.isSafeInteger(skill)||!pool.some(__captureESMFunction((__esmLocal20=(r=>Number(r[0])===skill)),""))){S.reason='selector_rejected';return;}
 if(!inEvent()||!enemyValid(combat.target)||combat.target!==target){S.reason='event_target_changed';return;}
  castSkill(combat,skill);
 S.casts++;S.lastCastAt=now;S.lastSkill=skill;
  if(transformSkill(skill)){S.transformCasts++;S.reason='native_transform_skill_cast';}
  else if(skill>=1001&&skill<=1008){S.thCasts++;S.reason='native_tian_quan_cast';}
  else{S.basicCasts++;S.reason='native_basic_cast';}
}
__esmLocal16=tick;

function safeTick(){try{tick();}catch(e){S.lastError=String(e?.message??e);S.reason='error';}}
__esmLocal21=safeTick;

function start(){
 C.enabled=true;
 if(S.timer===null)S.timer=(__getKVPV7()?.timers?.setInterval??W.setInterval)(safeTick,C.pollMs);
 safeTick();return status();
}
__esmLocal22=start;

function stop(reason='manual_stop'){
 C.enabled=false;
 if(S.timer!==null)(__getKVPV7()?.timers?.clearInterval??W.clearInterval)?.(S.timer);
 S.timer=null;releaseDodge(reason);S.reason=reason;return status();
}
__esmLocal23=stop;

function status(){return {enabled:C.enabled,inside:inEvent(),actor,enemyId:S.enemyId,
  nativeCasts:S.casts,transformCasts:S.transformCasts,thCasts:S.thCasts,basicCasts:S.basicCasts,blocked:S.blocked,
 lastSkill:S.lastSkill,lastCastAt:S.lastCastAt,reason:S.reason,lastError:S.lastError,
 autoDodgeOwned:S.armedDodge,nearbyTH:__getKVPV3()?.status?.()?.nearbyTH??0,
 dodge:__getKVPV3()?.status?.()??null,
  combo:'native transformed skills, then Tuyet Hoc, then basics',config:{...C},note:'Only scene 82 and native non-teammate type-4 target. TH dodge requires observable remote 1039; cast and move attempts cannot guarantee server hits or successful evasion.'};}
__esmLocal24=status;

W[KEY]=Object.freeze({start,stop,status,tick:safeTick,config:C});
})),""))();
}
export const api=Object.freeze({
});