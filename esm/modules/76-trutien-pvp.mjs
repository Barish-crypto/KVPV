import {getKVPV_DAILY as __getKVPV0,getKVPV_FAR_SCOPE as __getKVPV1,getKVPV_HITRUN1 as __getKVPV2,getKVPV_MODE as __getKVPV3,getKVPV_PVP_LUOFENG as __getKVPV4,getKVPV_TH300 as __getKVPV5,getKVPV_V1 as __getKVPV6} from '../api.mjs';
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
let __esmLocal34;
let __esmLocal35;
let __esmLocal36;
let __esmLocal37;
let __esmLocal38;
let __esmLocal39;
export {__esmLocal0 as local_anonymous_5_1_0};
export {__esmLocal1 as local_prop_1};
export {__esmLocal2 as local_id_2};
export {__esmLocal3 as local_components_3};
export {__esmLocal4 as local_me_4};
export {__esmLocal5 as local_component_5};
export {__esmLocal6 as local_scene_6};
export {__esmLocal7 as local_scope_7};
export {__esmLocal8 as local_own_8};
export {__esmLocal9 as local_live_9};
export {__esmLocal10 as local_enemy_10};
export {__esmLocal11 as local_isBasic_11};
export {__esmLocal12 as local_learned_12};
export {__esmLocal13 as local_anonymous_30_86_13};
export {__esmLocal14 as local_companionTick_14};
export {__esmLocal15 as local_resetFocus_15};
export {__esmLocal16 as local_setFocusToSelected_16};
export {__esmLocal17 as local_ranked_17};
export {__esmLocal18 as local_score_18};
export {__esmLocal19 as local_anonymous_73_26_19};
export {__esmLocal20 as local_occupied_20};
export {__esmLocal21 as local_castSignal_21};
export {__esmLocal22 as local_hitSignal_22};
export {__esmLocal23 as local_setVisualSpeed_23};
export {__esmLocal24 as local_castBasicWithVisual_24};
export {__esmLocal25 as local_wrapped_25};
export {__esmLocal26 as local_unlink_26};
export {__esmLocal27 as local_link_27};
export {__esmLocal28 as local_stop_28};
export {__esmLocal29 as local_status_29};
export {__esmLocal30 as local_anonymous_171_94_30};
export {__esmLocal31 as local_anonymous_172_28_31};
export {__esmLocal32 as local_anonymous_176_46_32};
export {__esmLocal33 as local_tick_33};
export {__esmLocal34 as local_anonymous_219_26_34};
export {__esmLocal35 as local_anonymous_220_34_35};
export {__esmLocal36 as local_anonymous_225_34_36};
export {__esmLocal37 as local_anonymous_226_32_37};
export {__esmLocal38 as local_anonymous_229_34_38};
export {__esmLocal39 as local_start_39};
export function initialize(){
/* Tru Tien PvP mode: native basic attacks 8001-8005 only; no outgoing Tuyet Hoc.
 * No HP retreat, healing, auto target switching, invented RPC or native cooldown rewrite.
 * Optional remote-player TH dodge delegates to KVPV_PVP_LUOFENG.
 */
(__captureESMFunction((__esmLocal0=(() => {
'use strict';
const W=window,KEY='KVPV_TRUTIEN_PVP',actorId=String(W.__KVPV_OWN_ACTOR_ID||'');
try{W[KEY]?.stop?.('reload');}catch(e){__getKVPV6()?.diagnostics?.record?.(e);}
const S={enabled:false,timer:null,role:null,target:null,scene:null,attacks:0,signals:0,hits:0,matchedDamage:0,blockedCooldown:0,
  thAttempts:0,basicAttempts:0,lastGroup:null,perSkill:new Map(),focusLock:true,focusTarget:null,focusId:'',focusBlocked:0,focusSwitches:0,
  visual:{factor:9999,calls:0,applied:0,unavailable:0,conflicts:0,lastAction:null,lastTimeScale:null},
  companions:true,lastCompanionPoll:-Infinity,companionAttempts:{pet:0,fuwa:0,ride:0},companionRetryAfter:{pet:0,fuwa:0,ride:0},
  companionLastSkill:null,companionLastTarget:null,companionBlocked:0,companionErrors:0,
  reason:'off',error:'',lastSkill:null,lastCastAt:null,lastOwnerRecoveryAt:-Infinity,autoDodge:false};
const prop=__captureESMFunction((__esmLocal1=((r,k)=>r?.property?.get?.(k))),"prop");
const id=__captureESMFunction((__esmLocal2=(r=>String(r?.id??prop(r,'id')??''))),"id");
const components=__captureESMFunction((__esmLocal3=(()=>W._d?._Yct??{})),"components");
const me=__captureESMFunction((__esmLocal4=(()=>W._C?._Ba?.instance?.getRole?.(Number(actorId))??null)),"me");
const component=__captureESMFunction((__esmLocal5=((r,key)=>components()[key]?r?.getComponent?.(components()[key]):null)),"component");
const scene=__captureESMFunction((__esmLocal6=(()=>String(W._C?._Mn?._Cn?.currentID??''))),"scene");
const scope=__captureESMFunction((__esmLocal7=(()=>{const s=__getKVPV1()?.status?.();return s?.inside===true&&s.kind==='TRU_TIEN';})),"scope");
const own=__captureESMFunction((__esmLocal8=(()=>!!actorId&&actorId===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED)),"own");
const live=__captureESMFunction((__esmLocal9=(r=>{const hp=prop(r,'hp');return !!r&&r.isValid!==false&&(!Array.isArray(hp)||Number(hp[0])>0);})),"live");
const enemy=__captureESMFunction((__esmLocal10=((t,actor)=>live(t)&&t!==actor&&id(t)!==actorId&&Number(prop(t,'type'))===4&&!!id(t))),"enemy");
const isBasic=__captureESMFunction((__esmLocal11=(x=>Number.isSafeInteger(Number(x))&&Number(x)>=8001&&Number(x)<=8005)),"isBasic");
const priorityBasic=[8005,8004,8002,8003,8001];
// Borrow ONLY native basics from Tian Quan. Do not import its boss targeting/movement hooks.
const tqRoster=Object.freeze([8001,8002,8003,8004,8005]);
const companionTypes=Object.freeze([['pet',2],['fuwa',9],['ride',7]]);
const learned=__captureESMFunction((__esmLocal12=(selector=>new Set([...(selector?._rtt??[]),...(selector?._wet??[])].map(__captureESMFunction((__esmLocal13=(row=>Number(row?.[0]))),"")).filter(Number.isSafeInteger)))),"learned");
function companionTick(role,target,now){
 if(!S.companions||now-S.lastCompanionPoll<50)return;
 S.lastCompanionPoll=now;
 if(!enemy(target,role)||!live(role)||S.focusLock&&S.focusId!==id(target))return;
 for(const [name,type] of companionTypes){
   if(now<S.companionRetryAfter[name])continue;
   try{
     const ctx=prop(role,name+'Context');
     if(!live(ctx)||Number(prop(ctx,'type'))!==type)continue;
     const cc=component(ctx,'_Het'),sel=component(ctx,'_Eet');
     if(typeof cc?.setTarget!=='function'||typeof cc?.combat!=='function'||
        typeof cc?.isCooldown!=='function'||cc.isCooldown()!==false||
        typeof sel?.selectSkill!=='function')continue;
     if(W.KVPV?.core?.scene?.combat?.claim?.('76-trutien-pvp-support',100,'companion')!==true)continue;
     // Copy Tian Quan companion's native skill selection, no guessed cooldown or RPC.
     // Per-skill native config says whether the destination is the owner or PvP opponent.
     const skill=Number(sel.selectSkill());
     if(!Number.isSafeInteger(skill)||skill<=0)continue;
     const cfg=W._Ba?._Jtt?._ant?.ins?.getCfgById?.(10000*skill+1);
     if(!cfg){S.companionBlocked++;S.companionRetryAfter[name]=now+1000;continue;}
     const targetKind=Number(cfg[15])||0,dest=targetKind===1?role:target;
     cc.setTarget(dest,targetKind);
     if(cc.target!==dest||typeof cc.isValidTarget!=='function'||cc.isValidTarget(targetKind)!==true||
        typeof cc.isValidRange!=='function'||cc.isValidRange()!==true){
       S.companionBlocked++;S.companionRetryAfter[name]=now+1000;continue;
     }
     if(!scope()||!own()||!enemy(target,role))return;
     cc.combat(skill,0,targetKind);
     S.companionAttempts[name]++;
     S.companionLastSkill=skill;S.companionLastTarget=id(dest);
   }catch(e){S.companionErrors++;S.error=String(e?.message??e);}
 }
}
__esmLocal14=companionTick;

function resetFocus(target){S.focusTarget=target;S.focusId=id(target);S.focusSwitches++;S.lastGroup=null;S.perSkill.clear();}
__esmLocal15=resetFocus;

function resolveFocus(role,target){
 if(!enemy(target,role))return false;
 if(!S.focusId||!live(S.focusTarget)||!enemy(S.focusTarget,role)){
   resetFocus(target);
   return true;
 }
 return false;
}

function setFocusToSelected(){
 if(!S.enabled||!scope()||!own())throw Error('Start PvP in verified Tru Tien first');
 const r=me(),t=component(r,'_Het')?.target;
 if(!enemy(t,r))throw Error('Select an alive enemy player first');
 resetFocus(t);link(r,t);return status();
}
__esmLocal16=setFocusToSelected;

function selectionState(role,target){
 if(!enemy(target,role))return {ok:false,reason:'waiting_player_target'};
 if(S.focusLock&&S.focusId&&S.focusId!==id(target))return {ok:false,reason:'focus_locked_switch_manual'};
 return {ok:true,reason:'native_basic_cast'};
}

function ranked(rows){
 const order=priorityBasic;
 const score=__captureESMFunction((__esmLocal18=(n=>{const sample=S.perSkill.get(n);return sample&&sample.hits>=2?sample.damage/sample.hits:null;})),"score");
 return rows.slice().sort(__captureESMFunction((__esmLocal19=((a,b)=>{
   const ai=Number(a[0]),bi=Number(b[0]),as=score(ai),bs=score(bi);
   if(as!==null||bs!==null){
     if(as===null)return 1;if(bs===null)return -1;
     if(as!==bs)return bs-as;
   }
   return order.indexOf(ai)-order.indexOf(bi);
 })),""));
}
__esmLocal17=ranked;

const occupied=__captureESMFunction((__esmLocal20=(()=>{
 const daily=__getKVPV0()?.quickState?.();
 // Daily must be tested before PvE ownership, or PvP may stop Daily's combat.
 if(daily?.running===true)return 'daily_priority';
 const job=daily?.job;
 if(job&&!['rảnh','ranh','idle'].includes(String(job).toLowerCase()))return 'daily_job';
 const mode=__getKVPV3()?.status?.(false)?.mode;
 if(mode&&mode!=='OFF')return 'combat_mode_owner';
 if(__getKVPV5()?.status?.(false)?.running===true||__getKVPV2()?.status?.(false)?.running===true)
   return 'boss_owner';
 return null;
})),"occupied");
function castSignal(targetId,skill){if(S.enabled&&S.target&&String(targetId)===id(S.target)&&isBasic(skill))S.signals++;}
__esmLocal21=castSignal;

function hitSignal(source,marker,damage,flags,receiver){
 if(!S.enabled||String(source)!==actorId||String(receiver)!==id(S.target)||Number(damage)<=0||
   Number(flags)&(4|16|32|64|128|256))return;
 const m=Number(marker);if(!Number.isSafeInteger(m)||m%10000!==0)return;
 const skill=m/10000;if(isBasic(skill)){
   S.hits++;S.matchedDamage+=Number(damage);
   const row=S.perSkill.get(skill)??{id:skill,hits:0,damage:0};
   row.hits++;row.damage+=Number(damage);S.perSkill.set(skill,row);
 }
}
__esmLocal22=hitSignal;

function setVisualSpeed(factor=9999){
 if(![1,9,99,9999].includes(factor))throw Error('Tru Tien basic visual speed must be 1, 9, 99 or 9999');
 S.visual.factor=factor;
 return {factor,scope:'TRU_TIEN',skills:tqRoster.slice(),visualOnly:true,nativeCooldownPreserved:true};
}
__esmLocal23=setVisualSpeed;

// Adjust only one synchronous native basic cast's visual tween; restore the original
// method descriptor immediately. No persistent hooks or native cooldown changes.
function castBasicWithVisual(combat,skill){
 const factor=S.visual.factor;
 if(factor===1)return combat.combat(skill);
 S.visual.calls++;
 const avatar=combat?._Qrt,original=avatar?.getActionTween,descriptor=avatar&&Object.getOwnPropertyDescriptor(avatar,'getActionTween');
 if(typeof original!=='function'||descriptor&&descriptor.configurable===false){
   S.visual.unavailable++;return combat.combat(skill);
 }
 let action;try{action=combat?._mvt?.(skill)?.[5];}catch(_){}
 const expected=typeof action==='string'&&action.trim()?action:'attack';
 S.visual.lastAction=expected;
 const wrapped=__captureESMFunction((__esmLocal25=(function(...args){
   if(args[0]===expected){
     const before=Number(args[2]??1);
     if(Number.isFinite(before)&&before>0){
       args[2]=Math.min(9999,before*factor);
       S.visual.applied++;S.visual.lastTimeScale=args[2];
     }
   }
   return original.apply(this,args);
 })),"wrapped");
 try{
   Object.defineProperty(avatar,'getActionTween',{configurable:true,writable:true,
     enumerable:descriptor?.enumerable??false,value:wrapped});
 }catch(e){S.visual.unavailable++;return combat.combat(skill);}
 try{return combat.combat(skill);}
 finally{
   if(avatar.getActionTween===wrapped){
     try{if(descriptor)Object.defineProperty(avatar,'getActionTween',descriptor);
       else delete avatar.getActionTween;}catch(e){S.visual.conflicts++;S.error=String(e);}
   }else S.visual.conflicts++;
 }
}
__esmLocal24=castBasicWithVisual;

function unlink(){
 try{S.role?.off?.(1039,S,castSignal);}catch(e){S.error=String(e);}
 try{S.target?.off?.(1012,S,hitSignal);}catch(e){S.error=String(e);}
 S.role=null;S.target=null;
}
__esmLocal26=unlink;

function link(role,target){
 if(role===S.role&&target===S.target)return;
 unlink();S.role=role;S.target=target;
 role?.on?.(1039,S,castSignal);target?.on?.(1012,S,hitSignal);
}
__esmLocal27=link;

function stop(reason='manual_stop'){
 S.enabled=false;
 if(S.timer!==null)(__getKVPV6()?.timers?.clearInterval??W.clearInterval)(S.timer);
 S.timer=null;unlink();S.focusTarget=null;S.focusId='';S.lastGroup=null;S.reason=reason;
 __getKVPV4()?.stop?.('trutien_pvp_'+reason);
 return status();
}
__esmLocal28=stop;

function status(){
 const r=me(),t=component(r,'_Het')?.target;
 return {enabled:S.enabled,mode:'TRU_TIEN_PVP_BASIC_SPAM',scene:S.scene,inside:scope(),actor:actorId,
  targetId:id(t),targetType:prop(t,'type')??null,selectedPlayer:enemy(t,r),attacks:S.attacks,castSignals:S.signals,
  observedDirectHits:S.hits,confirmedHits:S.hits,matchedDamage:S.matchedDamage,blockedCooldown:S.blockedCooldown,
  thAttempts:S.thAttempts,basicAttempts:S.basicAttempts,lastGroup:S.lastGroup,
  focusLocked:S.focusLock,focusTargetId:S.focusId,focusBlocked:S.focusBlocked,focusSwitches:S.focusSwitches,
  lastSkill:S.lastSkill,lastCastAt:S.lastCastAt,paceMs:10,armed:S.enabled,
  visual:{...S.visual,scope:'TRU_TIEN',visualOnly:true},
  tqSkillProfile:{requested:tqRoster.slice(),learned:[...learned(component(r,'_Eet'))].filter(__captureESMFunction((__esmLocal30=(x=>tqRoster.includes(x))),"")),
    missing:tqRoster.filter(__captureESMFunction((__esmLocal31=(x=>!learned(component(r,'_Eet')).has(x))),"")),source:'Tian Quan five native basics; no Tuyet Hoc or boss hooks'},
  companions:{enabled:S.companions,scanMs:50,attempts:{...S.companionAttempts},lastSkill:S.companionLastSkill,lastTarget:S.companionLastTarget,
    blocked:S.companionBlocked,retryAfter:{...S.companionRetryAfter},errors:S.companionErrors,nativePvPTargetAcceptanceRequired:true},
  skillIds:{th:[],basic:tqRoster.slice()},
  observedSkills:[...S.perSkill.values()].map(__captureESMFunction((__esmLocal32=(row=>({...row,averageDamage:row.hits?row.damage/row.hits:null}))),"")),
  autoDodge:S.autoDodge,dodge:__getKVPV4()?.status?.()??null,
  allIn:true,autoRetreat:false,autoHeal:false,autoApproach:false,autoTarget:false,
  reason:S.reason,error:S.error,
  note:'TRU_TIEN only native 8001-8005, no outgoing TH. 9999 is visual-only and may not affect native cast gating. A player must be selected for attacks; arm may wait without one. Native cooldown/range/target still required.'};
}
__esmLocal29=status;

function tick(){
 try{
  if(!S.enabled)return;
  if(!scope()||scene()!==S.scene||!own()){stop('left_trutien_or_actor_changed');return;}
  const r=me(),c=component(r,'_Het'),s=component(r,'_Eet'),t=c?.target;
  if(!live(r)||W._Ba?._rJ?._O$?.ins?.isDead===true){S.reason='player_dead';return;}
  // Release a rearmed PvE owner before waiting for a manually selected PvP target.
  let owner=occupied();
  if((owner==='combat_mode_owner'||owner==='boss_owner')&&
     Date.now()-S.lastOwnerRecoveryAt>=5000&&typeof __getKVPV3()?.stop==='function'){
    S.lastOwnerRecoveryAt=Date.now();
    __getKVPV3().stop('Tru Tien PvP selected player; transfer combat ownership');
    owner=occupied();
  }
  if(owner){
    S.reason=owner==='combat_mode_owner'||owner==='boss_owner'?'pvp_wait_owner_release':owner;
    return;
  }
  if(W.document?.hidden===true||W.document?.hasFocus?.()===false){S.reason='unfocused';return;}
  if(Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)){S.reason='manual_ui';return;}
  if((!S.focusId||!live(S.focusTarget)||!enemy(S.focusTarget,r))&&enemy(t,r))resolveFocus(r,t);
  // Concentrate attacks on one selected opponent until observed dead/invalid.
  // Switching to a still-alive target requires explicit setFocusToSelected().
  if(S.focusLock&&S.focusId&&live(S.focusTarget)&&id(t)!==S.focusId){
    S.focusBlocked++;S.reason='focus_locked_switch_manual';return;
  }
  if(!S.focusLock&&S.focusId!==id(t))resetFocus(t);
  if(!S.focusId||!live(S.focusTarget))resetFocus(t);
  const selection=selectionState(r,t);
  if(!selection.ok){link(null,null);S.reason=selection.reason;return;}
  link(r,t);
  companionTick(r,t,Date.now()); // independent of master's native cooldown
  if(typeof c?.isCooldown!=='function'||c.isCooldown()!==false){S.blockedCooldown++;S.reason='native_cooldown';return;}
  if(typeof c?.isValidTarget!=='function'||c.isValidTarget()!==true){S.reason='native_target_invalid';return;}
  if(typeof c?.isValidRange!=='function'||c.isValidRange()!==true){S.reason='outside_native_range';return;}
  if(typeof s?._f7t!=='function'||typeof c?.combat!=='function'){S.reason='native_selector_unavailable';return;}
  if(W.KVPV?.core?.scene?.combat?.claim?.('76-trutien-pvp',100)!==true){S.reason='combat_dispatch_wait';return;}
  const now=Date.now(),list=[...(Array.isArray(s._rtt)?s._rtt:[]),...(Array.isArray(s._wet)?s._wet:[])];
  const ready=list.filter(__captureESMFunction((__esmLocal34=(row=>Number.isFinite(Number(row?.[1]))&&Number(row[1])<now)),""));
  const basic=ranked(ready.filter(__captureESMFunction((__esmLocal35=(row=>isBasic(row?.[0]))),"")));
  if(!basic.length){S.reason='no_ready_basic';return;}
  // Try ranked basics first. If the native selector declines that ordering,
  // retry the original ready basic order; never synthesize or force a cast.
  let skill=Number(s._f7t(basic,[],1));
  if(!isBasic(skill)||!basic.some(__captureESMFunction((__esmLocal36=(row=>Number(row?.[0])===skill)),""))){
    const original=ready.filter(__captureESMFunction((__esmLocal37=(row=>isBasic(row?.[0]))),""));
    if(original.length>1)skill=Number(s._f7t(original,[],1));
  }
  if(!isBasic(skill)||!basic.some(__captureESMFunction((__esmLocal38=(row=>Number(row?.[0])===skill)),""))){
    S.reason='native_basic_selector_rejected';return;
  }
  if(c.target!==t||!enemy(t,r)){S.reason='target_changed';return;}
  if(S.focusLock&&S.focusId!==id(t)){S.reason='focus_changed';return;}
  // Dispatch immediately when native gates admit, keeping original per-skill cooldown.
  castBasicWithVisual(c,skill);S.attacks++;S.basicAttempts++;
  S.lastSkill=skill;S.lastCastAt=now;S.lastGroup='BASIC';S.reason='native_basic_cast';
 }catch(e){S.error=String(e?.message??e);S.reason='error';}
}
__esmLocal33=tick;

function start(opts={}){
 if(!opts||typeof opts!=='object')throw Error('Use start({autoDodge:true|false})');
 if(!own()||!scope())throw Error('Must be inside verified Tru Tien (native scene type 52)');
 const r=me(),c=component(r,'_Het'),s=component(r,'_Eet'),t=c?.target;
 // Allow arming with no selected player: wait rather than throwing or auto-targeting.
 if(typeof c?.combat!=='function'||typeof s?._f7t!=='function'||typeof c?.isCooldown!=='function')
   throw Error('Native player combat/selector/cooldown unavailable');
 if(!__getKVPV4()?.start)throw Error('La Phong PvP observer from PR #2 is not loaded');
 const owner=occupied();
 if(owner==='daily_priority'||owner==='daily_job')throw Error('Auto Daily has priority; PvP will not interrupt it');
 if(owner){
   if(typeof __getKVPV3()?.stop!=='function')throw Error('Cannot release Boss combat owner; use KVPV_MODE.stop() first');
   __getKVPV3().stop(); // Explicit PvP start takes over, disables auto reacquire monsters.
 }
 if(occupied())throw Error('Combat owner or Daily is still active; not taking over');
 if(S.enabled)stop('restart');
 S.enabled=true;S.scene=scene();S.autoDodge=opts.autoDodge===true;S.lastOwnerRecoveryAt=-Infinity;
 S.focusLock=opts.focusLock!==false;S.companions=opts.companions!==false;S.lastCompanionPoll=-Infinity;S.companionRetryAfter={pet:0,fuwa:0,ride:0};
 if(enemy(t,r))resetFocus(t);else{S.focusTarget=null;S.focusId='';S.lastGroup=null;}
 try{
   if(enemy(t,r))link(r,t);else link(null,null);
   __getKVPV4().start({autoDodge:S.autoDodge});
   S.timer=(__getKVPV6()?.timers?.setInterval??W.setInterval)(tick,10);
   S.reason=enemy(t,r)?'active':'waiting_player_target';return status();
 }catch(e){stop('start_failed');S.error=String(e?.message??e);throw e;}
}
__esmLocal39=start;

W[KEY]=Object.freeze({start,stop,status,tick,setFocusToSelected,setVisualSpeed});
})),""))();

}
export const api=Object.freeze({
});