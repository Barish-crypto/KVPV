/* Tru Tien PvP mode: native basic attacks 8001-8005 only; no outgoing Tuyet Hoc.
 * No HP retreat, healing, auto target switching, invented RPC or native cooldown rewrite.
 * Optional remote-player TH dodge delegates to KVPV_PVP_LUOFENG.
 */
(() => {
'use strict';
const W=window,KEY='KVPV_TRUTIEN_PVP',actorId=String(W.__KVPV_OWN_ACTOR_ID||'');
try{W[KEY]?.stop?.('reload');}catch(e){W.KVPV_V1?.diagnostics?.record?.(e);}
const S={enabled:false,timer:null,role:null,target:null,scene:null,attacks:0,signals:0,hits:0,matchedDamage:0,blockedCooldown:0,
  thAttempts:0,basicAttempts:0,lastGroup:null,perSkill:new Map(),focusLock:true,focusTarget:null,focusId:'',focusBlocked:0,focusSwitches:0,
  visual:{factor:9999,calls:0,applied:0,unavailable:0,conflicts:0,lastAction:null,lastTimeScale:null},
  companions:true,lastCompanionPoll:-Infinity,companionAttempts:{pet:0,fuwa:0,ride:0},companionRetryAfter:{pet:0,fuwa:0,ride:0},
  companionLastSkill:null,companionLastTarget:null,companionBlocked:0,companionErrors:0,
  reason:'off',error:'',lastSkill:null,lastCastAt:null,autoDodge:false};
const prop=(r,k)=>r?.property?.get?.(k);
const id=r=>String(r?.id??prop(r,'id')??'');
const components=()=>W._d?._Yct??{};
const me=()=>W._C?._Ba?.instance?.getRole?.(Number(actorId))??null;
const component=(r,key)=>components()[key]?r?.getComponent?.(components()[key]):null;
const scene=()=>String(W._C?._Mn?._Cn?.currentID??'');
const scope=()=>{const s=W.KVPV_FAR_SCOPE?.status?.();return s?.inside===true&&s.kind==='TRU_TIEN';};
const own=()=>!!actorId&&actorId===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;
const live=r=>{const hp=prop(r,'hp');return !!r&&r.isValid!==false&&(!Array.isArray(hp)||Number(hp[0])>0);};
const enemy=(t,actor)=>live(t)&&t!==actor&&id(t)!==actorId&&Number(prop(t,'type'))===4&&!!id(t);
const isBasic=x=>Number.isSafeInteger(Number(x))&&Number(x)>=8001&&Number(x)<=8005;
const priorityBasic=[8005,8004,8002,8003,8001];
// Borrow ONLY native basics from Tian Quan. Do not import its boss targeting/movement hooks.
const tqRoster=Object.freeze([8001,8002,8003,8004,8005]);
const companionTypes=Object.freeze([['pet',2],['fuwa',9],['ride',7]]);
const learned=selector=>new Set([...(selector?._rtt??[]),...(selector?._wet??[])].map(row=>Number(row?.[0])).filter(Number.isSafeInteger));
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
function resetFocus(target){S.focusTarget=target;S.focusId=id(target);S.focusSwitches++;S.lastGroup=null;S.perSkill.clear();}
function setFocusToSelected(){
 if(!S.enabled||!scope()||!own())throw Error('Start PvP in verified Tru Tien first');
 const r=me(),t=component(r,'_Het')?.target;
 if(!enemy(t,r))throw Error('Select an alive enemy player first');
 resetFocus(t);link(r,t);return status();
}
function ranked(rows){
 const order=priorityBasic;
 const score=n=>{const sample=S.perSkill.get(n);return sample&&sample.hits>=2?sample.damage/sample.hits:null;};
 return rows.slice().sort((a,b)=>{
   const ai=Number(a[0]),bi=Number(b[0]),as=score(ai),bs=score(bi);
   if(as!==null||bs!==null){
     if(as===null)return 1;if(bs===null)return -1;
     if(as!==bs)return bs-as;
   }
   return order.indexOf(ai)-order.indexOf(bi);
 });
}
const occupied=()=>{
 const mode=W.KVPV_MODE?.status?.(false)?.mode;
 if(mode&&mode!=='OFF')return 'combat_mode_owner';
 if(W.KVPV_TH300?.status?.(false)?.running===true||W.KVPV_HITRUN1?.status?.(false)?.running===true)
   return 'boss_owner';
 const job=W.KVPV_DAILY?.quickState?.()?.job;
 if(job&&!['rảnh','ranh','idle'].includes(String(job).toLowerCase()))return 'daily_job';
 return null;
};
function castSignal(targetId,skill){if(S.enabled&&S.target&&String(targetId)===id(S.target)&&isBasic(skill))S.signals++;}
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
function setVisualSpeed(factor=9999){
 if(![1,9,99,9999].includes(factor))throw Error('Tru Tien basic visual speed must be 1, 9, 99 or 9999');
 S.visual.factor=factor;
 return {factor,scope:'TRU_TIEN',skills:tqRoster.slice(),visualOnly:true,nativeCooldownPreserved:true};
}
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
 const wrapped=function(...args){
   if(args[0]===expected){
     const before=Number(args[2]??1);
     if(Number.isFinite(before)&&before>0){
       args[2]=Math.min(9999,before*factor);
       S.visual.applied++;S.visual.lastTimeScale=args[2];
     }
   }
   return original.apply(this,args);
 };
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
function unlink(){
 try{S.role?.off?.(1039,S,castSignal);}catch(e){S.error=String(e);}
 try{S.target?.off?.(1012,S,hitSignal);}catch(e){S.error=String(e);}
 S.role=null;S.target=null;
}
function link(role,target){
 if(role===S.role&&target===S.target)return;
 unlink();S.role=role;S.target=target;
 role?.on?.(1039,S,castSignal);target?.on?.(1012,S,hitSignal);
}
function stop(reason='manual_stop'){
 S.enabled=false;
 if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);
 S.timer=null;unlink();S.focusTarget=null;S.focusId='';S.lastGroup=null;S.reason=reason;
 W.KVPV_PVP_LUOFENG?.stop?.('trutien_pvp_'+reason);
 return status();
}
function status(){
 const r=me(),t=component(r,'_Het')?.target;
 return {enabled:S.enabled,mode:'TRU_TIEN_PVP_BASIC_SPAM',scene:S.scene,inside:scope(),actor:actorId,
  targetId:id(t),targetType:prop(t,'type')??null,selectedPlayer:enemy(t,r),attacks:S.attacks,castSignals:S.signals,
  observedDirectHits:S.hits,confirmedHits:S.hits,matchedDamage:S.matchedDamage,blockedCooldown:S.blockedCooldown,
  thAttempts:S.thAttempts,basicAttempts:S.basicAttempts,lastGroup:S.lastGroup,
  focusLocked:S.focusLock,focusTargetId:S.focusId,focusBlocked:S.focusBlocked,focusSwitches:S.focusSwitches,
  lastSkill:S.lastSkill,lastCastAt:S.lastCastAt,paceMs:10,armed:S.enabled,
  visual:{...S.visual,scope:'TRU_TIEN',visualOnly:true},
  tqSkillProfile:{requested:tqRoster.slice(),learned:[...learned(component(r,'_Eet'))].filter(x=>tqRoster.includes(x)),
    missing:tqRoster.filter(x=>!learned(component(r,'_Eet')).has(x)),source:'Tian Quan five native basics; no Tuyet Hoc or boss hooks'},
  companions:{enabled:S.companions,scanMs:50,attempts:{...S.companionAttempts},lastSkill:S.companionLastSkill,lastTarget:S.companionLastTarget,
    blocked:S.companionBlocked,retryAfter:{...S.companionRetryAfter},errors:S.companionErrors,nativePvPTargetAcceptanceRequired:true},
  skillIds:{th:[],basic:tqRoster.slice()},
  observedSkills:[...S.perSkill.values()].map(row=>({...row,averageDamage:row.hits?row.damage/row.hits:null})),
  autoDodge:S.autoDodge,dodge:W.KVPV_PVP_LUOFENG?.status?.()??null,
  allIn:true,autoRetreat:false,autoHeal:false,autoApproach:false,autoTarget:false,
  reason:S.reason,error:S.error,
  note:'TRU_TIEN only native 8001-8005, no outgoing TH. 9999 is visual-only and may not affect native cast gating. A player must be selected for attacks; arm may wait without one. Native cooldown/range/target still required.'};
}
function tick(){
 try{
  if(!S.enabled)return;
  if(!scope()||scene()!==S.scene||!own()){stop('left_trutien_or_actor_changed');return;}
  const r=me(),c=component(r,'_Het'),s=component(r,'_Eet'),t=c?.target;
  if(!enemy(t,r)){link(null,null);S.reason='waiting_player_target';return;}
  // Concentrate attacks on one selected opponent until observed dead/invalid.
  // Switching to a still-alive target requires explicit setFocusToSelected().
  if(S.focusLock&&S.focusId&&live(S.focusTarget)&&id(t)!==S.focusId){
    S.focusBlocked++;S.reason='focus_locked_switch_manual';return;
  }
  if(!S.focusLock&&S.focusId!==id(t))resetFocus(t);
  if(!S.focusId||!live(S.focusTarget))resetFocus(t);
  link(r,t);
  // PvP observer polls its selected target independently every 120ms.
  if(!live(r)||W._Ba?._rJ?._O$?.ins?.isDead===true){S.reason='player_dead';return;}
  if(W.document?.hidden===true||W.document?.hasFocus?.()===false){S.reason='unfocused';return;}
  if(Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)){S.reason='manual_ui';return;}
  const owner=occupied();if(owner){S.reason=owner;return;}
  companionTick(r,t,Date.now()); // independent of master's native cooldown
  if(typeof c?.isCooldown!=='function'||c.isCooldown()!==false){S.blockedCooldown++;S.reason='native_cooldown';return;}
  if(typeof c?.isValidTarget!=='function'||c.isValidTarget()!==true){S.reason='native_target_invalid';return;}
  if(typeof c?.isValidRange!=='function'||c.isValidRange()!==true){S.reason='outside_native_range';return;}
  if(typeof s?._f7t!=='function'||typeof c?.combat!=='function'){S.reason='native_selector_unavailable';return;}
  const now=Date.now(),list=[...(Array.isArray(s._rtt)?s._rtt:[]),...(Array.isArray(s._wet)?s._wet:[])];
  const ready=list.filter(row=>Number.isFinite(Number(row?.[1]))&&Number(row[1])<now);
  const basic=ranked(ready.filter(row=>isBasic(row?.[0])));
  if(!basic.length){S.reason='no_ready_basic';return;}
  const skill=Number(s._f7t(basic,[],1));
  if(!isBasic(skill)||!basic.some(row=>Number(row?.[0])===skill)){
    S.reason='native_basic_selector_rejected';return;
  }
  if(c.target!==t||!enemy(t,r)){S.reason='target_changed';return;}
  if(S.focusLock&&S.focusId!==id(t)){S.reason='focus_changed';return;}
  // Dispatch immediately when native gates admit, keeping original per-skill cooldown.
  castBasicWithVisual(c,skill);S.attacks++;S.basicAttempts++;
  S.lastSkill=skill;S.lastCastAt=now;S.lastGroup='BASIC';S.reason='native_basic_cast';
 }catch(e){S.error=String(e?.message??e);S.reason='error';}
}
function start(opts={}){
 if(!opts||typeof opts!=='object')throw Error('Use start({autoDodge:true|false})');
 if(!own()||!scope())throw Error('Must be inside verified Tru Tien (native scene type 52)');
 const r=me(),c=component(r,'_Het'),s=component(r,'_Eet'),t=c?.target;
 // Allow arming with no selected player: wait rather than throwing or auto-targeting.
 if(typeof c?.combat!=='function'||typeof s?._f7t!=='function'||typeof c?.isCooldown!=='function')
   throw Error('Native player combat/selector/cooldown unavailable');
 if(!W.KVPV_PVP_LUOFENG?.start)throw Error('La Phong PvP observer from PR #2 is not loaded');
 const owner=occupied();
 if(owner&&owner!=='daily_job'){
   if(typeof W.KVPV_MODE?.stop!=='function')throw Error('Cannot release Boss combat owner; use KVPV_MODE.stop() first');
   W.KVPV_MODE.stop(); // Explicit PvP start takes over, disables auto reacquire monsters.
 }
 if(occupied())throw Error('Combat owner or Daily is still active; not taking over');
 if(S.enabled)stop('restart');
 S.enabled=true;S.scene=scene();S.autoDodge=opts.autoDodge===true;
 S.focusLock=opts.focusLock!==false;S.companions=opts.companions!==false;S.lastCompanionPoll=-Infinity;S.companionRetryAfter={pet:0,fuwa:0,ride:0};
 if(enemy(t,r))resetFocus(t);else{S.focusTarget=null;S.focusId='';S.lastGroup=null;}
 try{
   if(enemy(t,r))link(r,t);else link(null,null);
   W.KVPV_PVP_LUOFENG.start({autoDodge:S.autoDodge});
   S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,10);
   S.reason=enemy(t,r)?'active':'waiting_player_target';return status();
 }catch(e){stop('start_failed');S.error=String(e?.message??e);throw e;}
}
W[KEY]=Object.freeze({start,stop,status,tick,setFocusToSelected,setVisualSpeed});
// Visual-only preset; TQ does not alter server cooldown, hits or outgoing RPC.
try {
  W.KVPV_TH300?.setTianQuanVisualSpeed?.(9999);
  W[KEY]?.setVisualSpeed?.(9999);
} catch (e) {W.KVPV_V1?.diagnostics?.record?.(e);}
})();

