/* Tru Tien PvP mode: manual player target, native Tuyet Hoc 1001-1008 only.
 * No HP retreat, healing, auto target switching, invented RPC or native cooldown rewrite.
 * Optional remote-player TH dodge delegates to KVPV_PVP_LUOFENG.
 */
(() => {
'use strict';
const W=window,KEY='KVPV_TRUTIEN_PVP',actorId=String(W.__KVPV_OWN_ACTOR_ID||'');
try{W[KEY]?.stop?.('reload');}catch(e){W.KVPV_V1?.diagnostics?.record?.(e);}
const S={enabled:false,timer:null,role:null,target:null,scene:null,attacks:0,signals:0,hits:0,matchedDamage:0,blockedCooldown:0,
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
const occupied=()=>{
 const mode=W.KVPV_MODE?.status?.(false)?.mode;
 if(mode&&mode!=='OFF')return 'combat_mode_owner';
 if(W.KVPV_TH300?.status?.(false)?.running===true||W.KVPV_HITRUN1?.status?.(false)?.running===true)
   return 'boss_owner';
 const job=W.KVPV_DAILY?.quickState?.()?.job;
 if(job&&!['rảnh','ranh','idle'].includes(String(job).toLowerCase()))return 'daily_job';
 return null;
};
function castSignal(targetId,skill){if(S.enabled&&S.target&&String(targetId)===id(S.target)&&Number(skill)>=1001&&Number(skill)<=1008)S.signals++;}
function hitSignal(source,marker,damage,flags,receiver){
 if(!S.enabled||String(source)!==actorId||String(receiver)!==id(S.target)||Number(damage)<=0||
   Number(flags)&(4|16|32|64|128|256))return;
 const m=Number(marker);if(!Number.isSafeInteger(m)||m%10000!==0)return;
 const skill=m/10000;if(skill>=1001&&skill<=1008){S.hits++;S.matchedDamage+=Number(damage);}
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
 S.timer=null;unlink();S.reason=reason;
 W.KVPV_PVP_LUOFENG?.stop?.('trutien_pvp_'+reason);
 return status();
}
function status(){
 const r=me(),t=component(r,'_Het')?.target;
 return {enabled:S.enabled,mode:'TRU_TIEN_PVP_TH_ONLY',scene:S.scene,inside:scope(),actor:actorId,
  targetId:id(t),targetType:prop(t,'type')??null,selectedPlayer:enemy(t,r),attacks:S.attacks,castSignals:S.signals,
  confirmedHits:S.hits,matchedDamage:S.matchedDamage,blockedCooldown:S.blockedCooldown,
  lastSkill:S.lastSkill,lastCastAt:S.lastCastAt,paceMs:10,onlyTuyetHoc:[1001,1002,1003,1004,1005,1006,1007,1008],
  autoDodge:S.autoDodge,dodge:W.KVPV_PVP_LUOFENG?.status?.()??null,
  allIn:true,autoRetreat:false,autoHeal:false,autoApproach:false,
  reason:S.reason,error:S.error,
  note:'Cast signal is not server confirmation; remote TH 1039 may not be replicated, and dodge is not guaranteed.'};
}
function tick(){
 try{
  if(!S.enabled)return;
  if(!scope()||scene()!==S.scene||!own()){stop('left_trutien_or_actor_changed');return;}
  const r=me(),c=component(r,'_Het'),s=component(r,'_Eet'),t=c?.target;
  if(!enemy(t,r)){link(null,null);S.reason='select_player_target';return;}
  link(r,t);
  // PvP observer polls its selected target independently every 120ms.
  if(!live(r)||W._Ba?._rJ?._O$?.ins?.isDead===true){S.reason='player_dead';return;}
  if(W.document?.hidden===true||W.document?.hasFocus?.()===false){S.reason='unfocused';return;}
  if(Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)){S.reason='manual_ui';return;}
  const owner=occupied();if(owner){S.reason=owner;return;}
  if(typeof c?.isCooldown!=='function'||c.isCooldown()!==false){S.blockedCooldown++;S.reason='native_cooldown';return;}
  if(typeof c?.isValidTarget!=='function'||c.isValidTarget()!==true){S.reason='native_target_invalid';return;}
  if(typeof c?.isValidRange!=='function'||c.isValidRange()!==true){S.reason='outside_native_range';return;}
  // Do not select normal attacks, do not touch native skill rows or clock values.
  if(typeof s?._f7t!=='function'||typeof c?.combat!=='function'){S.reason='native_selector_unavailable';return;}
  const now=Date.now(),list=[...(Array.isArray(s._rtt)?s._rtt:[]),...(Array.isArray(s._wet)?s._wet:[])];
  const ready=list.filter(row=>{const k=Number(row?.[0]);return k>=1001&&k<=1008&&Number.isFinite(Number(row?.[1]))&&Number(row[1])<now;});
  if(!ready.length){S.reason='no_ready_tuyet_hoc';return;}
  const selected=Number(s._f7t(ready,[],1));
  if(!Number.isSafeInteger(selected)||selected<1001||selected>1008){S.reason='native_selector_rejected';return;}
  if(c.target!==t||!enemy(t,r)){S.reason='target_changed';return;}
  // No visual-animation wait; native isCooldown(), range and target remain authoritative.
  c.combat(selected);S.attacks++;S.lastSkill=selected;S.lastCastAt=now;S.reason='native_th_cast';
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
 try{
   link(r,t);
   W.KVPV_PVP_LUOFENG.start({autoDodge:S.autoDodge});
   S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,10);
   S.reason='active';return status();
 }catch(e){stop('start_failed');S.error=String(e?.message??e);throw e;}
}
W[KEY]=Object.freeze({start,stop,status,tick});
})();
