/* Tru Tien PvP mode: manual player target, native Tuyet Hoc 1001-1008 + basics 8001-8005.
 * No HP retreat, healing, auto target switching, invented RPC or native cooldown rewrite.
 * Optional remote-player TH dodge delegates to KVPV_PVP_LUOFENG.
 */
(() => {
'use strict';
const W=window,KEY='KVPV_TRUTIEN_PVP',actorId=String(W.__KVPV_OWN_ACTOR_ID||'');
try{W[KEY]?.stop?.('reload');}catch(e){W.KVPV_V1?.diagnostics?.record?.(e);}
const S={enabled:false,timer:null,role:null,target:null,scene:null,attacks:0,signals:0,hits:0,matchedDamage:0,blockedCooldown:0,
  thAttempts:0,basicAttempts:0,lastGroup:null,perSkill:new Map(),focusLock:true,focusTarget:null,focusId:'',focusBlocked:0,focusSwitches:0,
  companions:true,lastCompanionPoll:-Infinity,companionAttempts:{pet:0,fuwa:0,ride:0},
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
const isTH=x=>Number.isSafeInteger(Number(x))&&Number(x)>=1001&&Number(x)<=1008;
const isBasic=x=>Number.isSafeInteger(Number(x))&&Number(x)>=8001&&Number(x)<=8005;
const priorityBasic=[8005,8004,8002,8003,8001];
const priorityTH=[1001,1002,1003,1004,1005,1006,1007,1008];
// Same native skill roster as Tian Quan (KVPV_TQ_BASIC_PROFILE + TH300).
// Do not copy TH300 boss-only hooks, targeting or movement into PvP.
const tqRoster=Object.freeze([...priorityTH,...[8001,8002,8003,8004,8005]]);
const companionTypes=Object.freeze([['pet',2],['fuwa',9],['ride',7]]);
const learned=selector=>new Set([...(selector?._rtt??[]),...(selector?._wet??[])].map(row=>Number(row?.[0])).filter(Number.isSafeInteger));
function companionTick(role,target,now){
 if(!S.companions||now-S.lastCompanionPoll<50)return;
 S.lastCompanionPoll=now;
 if(!enemy(target,role)||!live(role)||S.focusLock&&S.focusId!==id(target))return;
 for(const [name,type] of companionTypes){
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
     if(!cfg){S.companionBlocked++;continue;}
     const targetKind=Number(cfg[15])||0,dest=targetKind===1?role:target;
     cc.setTarget(dest,targetKind);
     if(cc.target!==dest||typeof cc.isValidTarget!=='function'||cc.isValidTarget(targetKind)!==true||
        typeof cc.isValidRange!=='function'||cc.isValidRange()!==true){
       S.companionBlocked++;continue;
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
function ranked(rows,group){
 const order=group==='BASIC'?priorityBasic:priorityTH;
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
function castSignal(targetId,skill){if(S.enabled&&S.target&&String(targetId)===id(S.target)&&(isTH(skill)||isBasic(skill)))S.signals++;}
function hitSignal(source,marker,damage,flags,receiver){
 if(!S.enabled||String(source)!==actorId||String(receiver)!==id(S.target)||Number(damage)<=0||
   Number(flags)&(4|16|32|64|128|256))return;
 const m=Number(marker);if(!Number.isSafeInteger(m)||m%10000!==0)return;
 const skill=m/10000;if(isTH(skill)||isBasic(skill)){
   S.hits++;S.matchedDamage+=Number(damage);
   const row=S.perSkill.get(skill)??{id:skill,hits:0,damage:0};
   row.hits++;row.damage+=Number(damage);S.perSkill.set(skill,row);
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
 return {enabled:S.enabled,mode:'TRU_TIEN_PVP_MIXED_TH_BASIC',scene:S.scene,inside:scope(),actor:actorId,
  targetId:id(t),targetType:prop(t,'type')??null,selectedPlayer:enemy(t,r),attacks:S.attacks,castSignals:S.signals,
  observedDirectHits:S.hits,confirmedHits:S.hits,matchedDamage:S.matchedDamage,blockedCooldown:S.blockedCooldown,
  thAttempts:S.thAttempts,basicAttempts:S.basicAttempts,lastGroup:S.lastGroup,
  focusLocked:S.focusLock,focusTargetId:S.focusId,focusBlocked:S.focusBlocked,focusSwitches:S.focusSwitches,
  lastSkill:S.lastSkill,lastCastAt:S.lastCastAt,paceMs:10,
  tqSkillProfile:{requested:tqRoster.slice(),learned:[...learned(component(r,'_Eet'))].filter(x=>tqRoster.includes(x)),
    missing:tqRoster.filter(x=>!learned(component(r,'_Eet')).has(x)),source:'Tian Quan TH300 native roster; no boss-only hooks'},
  companions:{enabled:S.companions,scanMs:50,attempts:{...S.companionAttempts},lastSkill:S.companionLastSkill,lastTarget:S.companionLastTarget,
    blocked:S.companionBlocked,errors:S.companionErrors,nativePvPTargetAcceptanceRequired:true},
  skillIds:{th:priorityTH.slice(),basic:priorityBasic.slice()},
  observedSkills:[...S.perSkill.values()].map(row=>({...row,averageDamage:row.hits?row.damage/row.hits:null})),
  autoDodge:S.autoDodge,dodge:W.KVPV_PVP_LUOFENG?.status?.()??null,
  allIn:true,autoRetreat:false,autoHeal:false,autoApproach:false,autoTarget:false,
  reason:S.reason,error:S.error,
  note:'TQ full main roster: TH+5 basics; pet/fuwa/ride native casts only if client accepts PvP target and range. 1012 observations are not confirmed cast-to-hit pairs. 10ms/50ms are polling cadences.'};
}
function tick(){
 try{
  if(!S.enabled)return;
  if(!scope()||scene()!==S.scene||!own()){stop('left_trutien_or_actor_changed');return;}
  const r=me(),c=component(r,'_Het'),s=component(r,'_Eet'),t=c?.target;
  if(!enemy(t,r)){link(null,null);S.reason='select_player_target';return;}
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
  const th=ready.filter(row=>isTH(row?.[0])),basic=ready.filter(row=>isBasic(row?.[0]));
  // After a TH prefer one ready native basic. When no basics are ready,
  // continue with TH; when TH cools down use whichever basic is ready.
  const order=S.lastGroup==='TH'?[['BASIC',basic],['TH',th]]:[['TH',th],['BASIC',basic]];
  let picked=null;
  for(const [group,rows] of order){
    if(!rows.length)continue;
    const nativeRows=ranked(rows,group),skill=Number(s._f7t(nativeRows,[],1));
    if(!nativeRows.some(row=>Number(row?.[0])===skill))continue;
    picked={group,skill};break;
  }
  if(!picked){S.reason='no_ready_th_or_basic';return;}
  if(c.target!==t||!enemy(t,r)){S.reason='target_changed';return;}
  if(S.focusLock&&S.focusId!==id(t)){S.reason='focus_changed';return;}
  // No animation wait; never rewrite native cooldown, range or skill row durations.
  c.combat(picked.skill);S.attacks++;S.lastSkill=picked.skill;S.lastCastAt=now;
  S.lastGroup=picked.group;
  if(picked.group==='TH')S.thAttempts++;else S.basicAttempts++;
  S.reason=picked.group==='TH'?'native_th_cast':'native_basic_cast';
 }catch(e){S.error=String(e?.message??e);S.reason='error';}
}
function start(opts={}){
 if(!opts||typeof opts!=='object')throw Error('Use start({autoDodge:true|false})');
 if(!own()||!scope())throw Error('Must be inside verified Tru Tien (native scene type 52)');
 const r=me(),c=component(r,'_Het'),s=component(r,'_Eet'),t=c?.target;
 if(!enemy(t,r))throw Error('Select a real enemy player (type 4), not a monster or companion');
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
 S.focusLock=opts.focusLock!==false;S.companions=opts.companions!==false;S.lastCompanionPoll=-Infinity;resetFocus(t);
 try{
   link(r,t);
   W.KVPV_PVP_LUOFENG.start({autoDodge:S.autoDodge});
   S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,10);
   S.reason='active';return status();
 }catch(e){stop('start_failed');S.error=String(e?.message??e);throw e;}
}
W[KEY]=Object.freeze({start,stop,status,tick,setFocusToSelected});
})();
