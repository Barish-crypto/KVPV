/* KVPV single native boss combat engine.
 * Replaces TH300/legacy modes in executable FULL. Single serialized sender.
 * Never overrides native cooldown, never sends RPC, respects recovery and actor.
 */
(()=>{
 'use strict';
 const W=window,old=W.KVPV_COMBAT_ENGINE;old?.stop?.();
 const actor=String(W.__KVPV_OWN_ACTOR_ID??'');
 const ids=[8001,8002,8003,8004,8005,1001,1002,1003,1004,1005,1006,1007,1008];
 // Only skills with observed successful hits near distance 307 are eligible in these three ranged instances.
 // A native selected melee skill is skipped; never force-cast or substitute an unready skill.
 const confirmedRanged=new Set([1006,1007]);
 const rangedKinds=new Set(['THIEN_QUAN','LINH_LUNG','PHU_VAN']);
 const ringGoal=310,ringTolerance=12;
 const position=o=>{const p=o?.property?.get?.('position'),x=Number(p?.x),y=Number(p?.y);return p&&Number.isFinite(x)&&Number.isFinite(y)?{x,y}:null;};
 function ring(target){const scope=W.KVPV_FAR_SCOPE?.status?.(),kind=scope?.kind;
  if(!rangedKinds.has(kind))return {needed:false,ok:true,distance:null};
  const a=position(components().a),b=position(target);
  if(!scope?.inside||!a||!b)return {needed:true,ok:false,distance:null};
  const distance=Math.hypot(a.x-b.x,a.y-b.y);
  return {needed:true,ok:Math.abs(distance-ringGoal)<=ringTolerance,distance};
 }
 const S={enabled:false,armed:false,busy:false,timer:null,casts:0,checks:0,lastSkill:null,reason:'off',error:'',cursor:0,lastTargetSearchAt:0,targetSearches:0,reasonCounts:Object.create(null),lastCastAt:0,lastCooldown:null,lastCooldownAt:0,lastTargetType:null,knownSkillIds:[],filteredCloseSkillIds:[],lastNativeSelectedSkill:null,confirmedRangedAvailable:[],ringDistance:null,ringReady:false,lastRange:null};
 const valid=()=>actor!==''&&String(W._Ba?._rJ?._O$?.ins?.actorId??'')===actor&&W.__KVPV_UNIVERSAL_HALTED!==true;
 const far=()=>{const x=(W.KVPV_FAR_SCOPE??W.KVPV_TQ_SCOPE);return x?.inside?.()===true&&x?.status?.()?.kind!=='TRU_TIEN';};
 const components=()=>{
  const a=W._C?._Ba?.instance?.getRole?.(Number(actor));
  const c=W._d?._Yct;
  return {a,skill:a?.getComponent?.(c?._Eet),combat:a?.getComponent?.(c?._Het)};
 };
 function state(){return {enabled:S.enabled,armed:S.armed,busy:S.busy,actor,casts:S.casts,checks:S.checks,lastSkill:S.lastSkill,reason:S.reason,error:S.error,singleSender:true,legacyModes:false,targetSearches:S.targetSearches,lastCastAt:S.lastCastAt,lastCooldown:S.lastCooldown,lastCooldownAt:S.lastCooldownAt,lastTargetType:S.lastTargetType,knownSkillIds:S.knownSkillIds.slice(),filteredCloseSkillIds:S.filteredCloseSkillIds.slice(),lastNativeSelectedSkill:S.lastNativeSelectedSkill,confirmedRangedAvailable:S.confirmedRangedAvailable.slice(),ringDistance:S.ringDistance,ringReady:S.ringReady,ringGoal,ringTolerance,lastRange:S.lastRange,reasonCounts:{...S.reasonCounts}};}
 function recordReason(){S.reasonCounts[S.reason]=(S.reasonCounts[S.reason]||0)+1;}
 async function tick(){
  if(S.busy||!S.enabled||!valid())return;
  S.busy=true;
  try{
   if(!far()){
    const daily=W.KVPV_DAILY?.quickState?.();
    // Daily scene 10 (Yeu Vuong) uses native encounter combat; do not steal its skill sender.
    S.reason=daily?.running===true&&daily?.job==='yeuvuong'&&daily?.step==='fighting'&&Number(daily?.scene)===10
      ? 'daily_yeuvuong_native_combat' : 'outside_boss_scope';
    return;
   }
   if(W.KVPV_ENTRY_POLICY?.manual===true||W.KVPV_EVENT_PRIORITY?.hold?.()||W.KVPV_BOSS_TEAM?.priority?.()===true){S.reason='yield_priority';return;}
   if(W._Ba?._rJ?._O$?.ins?.isDead===true){S.reason='dead';return;}
   const recovery=W.KVPV_HITRUN1?.status?.(false);
   if(recovery?.running===true&&recovery.phase!=='FIGHT'){S.reason='yield_recovery';return;}
   const {a,skill,combat}=components();
   if(!a||!skill||typeof combat?.combat!=='function'){S.reason='waiting_native_components';return;}
   const nativeTarget=combat.target;
   const rawType=nativeTarget?.property?.get?.('type');
   const type=rawType==null?NaN:Number(rawType);
   S.lastTargetType=Number.isFinite(type)?type:null;
   const hpNow=nativeTarget?.property?.get?.('hp');
   const stale=!nativeTarget||type===4||(Array.isArray(hpNow)&&Number(hpNow[0])<=0);
   if(stale){
     const now=Date.now();
     if(now-S.lastTargetSearchAt>=1000&&typeof W._Ba?._rJ?._O$?.ins?.selectTar==='function'){
       S.lastTargetSearchAt=now;W._Ba._rJ._O$.ins.selectTar(1,-1);S.targetSearches++;
     }
     S.reason='waiting_native_boss_target';return;
   }
   if(!Number.isFinite(type)||(type!==1&&type!==0)){S.reason='non_monster_target';return;}
   const firstRing=ring(nativeTarget);
   S.ringDistance=firstRing.distance;S.ringReady=firstRing.ok;
   if(firstRing.needed&&!firstRing.ok){S.reason='waiting_distance_310';return;}
   // Inspect native selection before interpreting the shared range gate.
   // isValidRange() has no skill-id parameter; false may concern selected melee skill 1001.
   const rowsBefore=[...(skill._rtt??[]),...(skill._wet??[])];
   const knownBefore=new Set(rowsBefore.filter(Array.isArray).map(x=>Number(x[0])));
   S.knownSkillIds=ids.filter(id=>knownBefore.has(id));
   S.confirmedRangedAvailable=S.knownSkillIds.filter(id=>confirmedRanged.has(id));
   S.lastNativeSelectedSkill=Number(skill.selectSkill?.())||null;
   const initialKind=W.KVPV_FAR_SCOPE?.status?.()?.kind;
   if(rangedKinds.has(initialKind)&&!confirmedRanged.has(S.lastNativeSelectedSkill)){
    S.filteredCloseSkillIds=S.knownSkillIds.filter(id=>!confirmedRanged.has(id));
    S.reason='filtered_close_range_skill';return;
   }
   const rangeResult=typeof combat.isValidRange==='function'?combat.isValidRange():null;
   S.lastRange=rangeResult;
   if(rangeResult===false){S.reason='native_out_of_range';return;}
   const cooldownResult=typeof combat.isCooldown==='function'?combat.isCooldown():null;
   S.lastCooldown=cooldownResult;S.lastCooldownAt=Date.now();
   // Do not cast if the native cooldown API is missing or reports anything but false.
   if(cooldownResult!==false){S.reason=cooldownResult===true?'native_cooldown':'native_cooldown_unknown';return;}
   const target=combat.target;
   const hp=target?.property?.get?.('hp');
   if(Array.isArray(hp)&&Number(hp[0])<=0){S.reason='target_dead';return;}
   const rows=[...(skill._rtt??[]),...(skill._wet??[])];
   const known=new Set(rows.filter(Array.isArray).map(x=>Number(x[0])));
   S.knownSkillIds=ids.filter(id=>known.has(id));
   // No bypass of target range; use native selection when its result is learned.
   const nativeId=Number(skill.selectSkill?.());
   const ordered=ids.filter(id=>known.has(id));
   const chosen=ordered.includes(nativeId)?nativeId:(!Number.isFinite(nativeId)?null:nativeId);
   const kind=W.KVPV_FAR_SCOPE?.status?.()?.kind;
   const strictlyRanged=rangedKinds.has(kind);
   S.filteredCloseSkillIds=strictlyRanged?ordered.filter(id=>!confirmedRanged.has(id)):[];
   if(!chosen||!ordered.includes(chosen)){S.reason='no_native_ready_skill';return;}
   if(strictlyRanged&&!confirmedRanged.has(chosen)){S.reason='filtered_close_range_skill';return;}
   S.checks++;
   await Promise.resolve();
   if(!S.enabled||!valid()||combat.target!==target)return;
   // Scene, event and recovery may change during the async skill-readiness boundary.
   if(!far()||W.KVPV_ENTRY_POLICY?.manual===true||W.KVPV_EVENT_PRIORITY?.hold?.()||
      W.KVPV_BOSS_TEAM?.priority?.()===true){
     S.reason='yield_changed_priority';return;
   }
   if(W._Ba?._rJ?._O$?.ins?.isDead===true){S.reason='dead';return;}
   const recoveryNow=W.KVPV_HITRUN1?.status?.(false);
   if(recoveryNow?.running===true&&recoveryNow.phase!=='FIGHT'){S.reason='yield_recovery';return;}
   const rawTypeNow=target?.property?.get?.('type');
   const typeNow=rawTypeNow==null?NaN:Number(rawTypeNow);
   const hpNowFinal=target?.property?.get?.('hp');
   if(!Number.isFinite(typeNow)||(typeNow!==0&&typeNow!==1)||
     (Array.isArray(hpNowFinal)&&Number(hpNowFinal[0])<=0)){S.reason='target_changed_or_dead';return;}
   const finalRing=ring(target);
   S.ringDistance=finalRing.distance;S.ringReady=finalRing.ok;
   if(finalRing.needed&&!finalRing.ok){S.reason='waiting_distance_310';return;}
   if(typeof combat.isValidRange==='function'&&combat.isValidRange()===false){S.reason='native_out_of_range';return;}
   const cooldownFinal=typeof combat.isCooldown==='function'?combat.isCooldown():null;
   S.lastCooldown=cooldownFinal;S.lastCooldownAt=Date.now();
   if(cooldownFinal!==false){S.reason=cooldownFinal===true?'native_cooldown':'native_cooldown_unknown';return;}
   combat.combat(chosen);S.lastSkill=chosen;S.casts++;S.lastCastAt=Date.now();S.reason='native_cast_requested';
  }catch(e){S.reason='error';S.error=String(e?.message??e);}
  finally{recordReason();S.busy=false;}
 }
 function stop(){S.enabled=false;S.armed=false;
  if(S.timer!==null){const owner=W.KVPV_V1?.timers?.clearInterval?W.KVPV_V1.timers:W;owner?.clearInterval?.(S.timer);S.timer=null;}
  S.reason='stopped';return state();}
 function start(){S.armed=true;if(!valid()){S.reason='waiting_actor';return state();}
  if(typeof W.setInterval!=='function'){S.reason='waiting_timer_api';return state();}
  S.enabled=true;
  if(S.timer===null){const owner=W.KVPV_V1?.timers?.setInterval?W.KVPV_V1.timers:W;
   S.timer=owner.setInterval(()=>{void tick();},100);}
  S.reason='armed';return state();}
 W.KVPV_COMBAT_ENGINE=Object.freeze({start,stop,tick,status:state,skillIds:ids.slice()});
 // Startup is timerless in preflight; in the real game, arm once and wait for boss scope.
 start();
})();