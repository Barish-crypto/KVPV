/* Strongest Team PvP: native cast priority and selected-enemy TH dodge.
 * Scope is verified native scene 82 and the existing Strongest Team owner.
 * No synthetic RPC, cooldown rewrites, team-target switching or rewards.
 */
(() => {
'use strict';
const W=window,KEY='KVPV_STRONGEST_PVP',old=W[KEY];
try{old?.stop?.('reload');}catch(e){W.KVPV_V1?.diagnostics?.record?.(e);}
const actor=String(W.__KVPV_OWN_ACTOR_ID||'');
const C={enabled:true,nativeAttack:true,dodgeTH:true,pollMs:120};
const S={timer:null,armedDodge:false,casts:0,blocked:0,thCasts:0,basicCasts:0,
 lastSkill:null,lastCastAt:null,reason:'waiting_scene_82',lastError:'',enemyId:''};
const prop=(o,k)=>o?.property?.get?.(k);
const identity=o=>String(o?.id??prop(o,'id')??'');
const types=()=>W._d?._Yct??{};
const component=(role,key)=>types()[key]?role?.getComponent?.(types()[key]):null;
const me=()=>W._C?._Ba?.instance?.getRole?.(Number(actor))??null;
const owned=()=>!!actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;
const inEvent=()=>{
 const s=W.KVPV_STRONGEST_TEAM?.status?.();
 return s?.enabled===true&&s?.phase==='ACTIVE'&&s?.inside===true&&s?.open===true;
};
function enemyValid(target){
 if(!target||target.isValid===false||identity(target)===''||identity(target)===actor||Number(prop(target,'type'))!==4)return false;
 const m=W._Ba?._T3?._G_t?.instance;
 if(!m||String(m.selectTagetId)!==identity(target))return false;
 const opponents=m.getNearPlayerRank?.();
 return Array.isArray(opponents)&&opponents.some(x=>x&&String(x.objId)===identity(target)&&m.isMyTeam?.(x.color)===false);
}
function releaseDodge(reason){
 if(!S.armedDodge)return;
 try{W.KVPV_PVP_LUOFENG?.stop?.('strongest_team_'+reason);}catch(e){S.lastError=String(e);}
 S.armedDodge=false;
}
function dodge(target){
 if(!C.dodgeTH){releaseDodge('disabled');return;}
 const observer=W.KVPV_PVP_LUOFENG;
 if(!observer?.start||!observer?.status){S.reason='dodge_module_missing';return;}
 if(!S.armedDodge){
  if(observer.status().enabled){S.reason='other_dodge_owner';return;}
  observer.start({autoDodge:true,nearby:true});S.armedDodge=true;
 }else if(observer.status().enabled!==true){S.armedDodge=false;S.reason='dodge_stopped_elsewhere';return;}
 observer.sync?.();
}
const readySkills=(selector,at)=>{
 const rows=[...(Array.isArray(selector?._rtt)?selector._rtt:[]),
             ...(Array.isArray(selector?._wet)?selector._wet:[])];
 return rows.filter(row=>{
  const k=Number(row?.[0]),until=Number(row?.[1]);
  return Number.isSafeInteger(k)&&k===8005&&
         Number.isFinite(until)&&until<at;
 });
};
function tick(){
 if(!C.enabled||!owned()){releaseDodge('inactive');S.reason='disabled_or_actor_changed';return;}
 if(!inEvent()){releaseDodge('scene_left');S.reason='waiting_scene_82';S.enemyId='';return;}
 if(W.KVPV_ENTRY_POLICY?.manual===true){releaseDodge('manual_policy');S.reason='manual_policy';return;}
 const role=me(),combat=component(role,'_Het'),selector=component(role,'_Eet'),target=combat?.target;
 if(!enemyValid(target)){releaseDodge('no_enemy');S.reason='waiting_verified_enemy';S.enemyId='';return;}
 S.enemyId=identity(target);
 if(W._Ba?._rJ?._O$?.ins?.isDead===true){releaseDodge('dead');S.reason='dead';return;}
 try{dodge(target);}catch(e){S.lastError=String(e);S.reason='dodge_error';}
 // A native lateral dodge gets a short exclusive movement window. Avoid
 // sending an attack in the same instant as an observed enemy TH.
 const d=S.armedDodge?W.KVPV_PVP_LUOFENG?.status?.():null;
 if(d?.lastDodgeAt!=null&&Date.now()-d.lastDodgeAt<180){
   S.reason='dodge_movement_priority';return;
 }
 if(!C.nativeAttack){S.reason='dodge_only';return;}
 if(W.document?.hidden===true||W.document?.hasFocus?.()===false||
    Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)){S.reason='manual_or_unfocused';return;}
 if(W.KVPV_BOSS_TEAM?.priority?.()===true||
    W.KVPV_TH300?.status?.(false)?.running===true||
    W.KVPV_HITRUN1?.status?.(false)?.running===true){S.reason='foreign_combat_owner';return;}
 if(typeof combat?.combat!=='function'||typeof combat?.isCooldown!=='function'||
    typeof combat?.isValidTarget!=='function'||typeof combat?.isValidRange!=='function'||
    typeof selector?._f7t!=='function'){S.reason='native_combat_unavailable';return;}
 if(combat.isCooldown()!==false||combat.isValidTarget()!==true||combat.isValidRange()!==true){
   S.blocked++;S.reason='native_cooldown_target_or_range';return;
 }
 const now=Date.now(),rows=readySkills(selector,now);
 // Native selectors decide within the ready group, TH before basic. Never forge a ready timestamp.
 const th=rows.filter(r=>Number(r[0])>=1001&&Number(r[0])<=1008);
 const basic=rows.filter(r=>Number(r[0])>=8001&&Number(r[0])<=8005);
 const pool=th.length?th:basic;
 if(!pool.length){S.reason='no_native_ready_skills';return;}
 const skill=Number(selector._f7t(pool,[],1));
 if(!Number.isSafeInteger(skill)||!pool.some(r=>Number(r[0])===skill)){S.reason='selector_rejected';return;}
 if(!inEvent()||!enemyValid(combat.target)||combat.target!==target){S.reason='event_target_changed';return;}
 combat.combat(skill);
 S.casts++;S.lastCastAt=now;S.lastSkill=skill;
 if(skill>=1001&&skill<=1008)S.thCasts++;else S.basicCasts++;
 S.reason='native_pvp_cast';
}
function safeTick(){try{tick();}catch(e){S.lastError=String(e?.message??e);S.reason='error';}}
function start(){
 C.enabled=true;
 if(S.timer===null)S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(safeTick,C.pollMs);
 safeTick();return status();
}
function stop(reason='manual_stop'){
 C.enabled=false;
 if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)?.(S.timer);
 S.timer=null;releaseDodge(reason);S.reason=reason;return status();
}
function status(){return {enabled:C.enabled,inside:inEvent(),actor,enemyId:S.enemyId,
 nativeCasts:S.casts,thCasts:S.thCasts,basicCasts:S.basicCasts,blocked:S.blocked,
 lastSkill:S.lastSkill,lastCastAt:S.lastCastAt,reason:S.reason,lastError:S.lastError,
 autoDodgeOwned:S.armedDodge,nearbyTH:W.KVPV_PVP_LUOFENG?.status?.()?.nearbyTH??0,
 dodge:W.KVPV_PVP_LUOFENG?.status?.()??null,
 config:{...C},note:'Only scene 82 and native non-teammate type-4 target. TH dodge requires observable remote 1039; cast and move attempts cannot guarantee server hits or successful evasion.'};}
W[KEY]=Object.freeze({start,stop,status,tick:safeTick,config:C});start();
})();