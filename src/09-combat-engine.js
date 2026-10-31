/* KVPV single native boss combat engine.
 * Replaces TH300/legacy modes in executable FULL. Single serialized sender.
 * Never overrides native cooldown, never sends RPC, respects recovery and actor.
 */
(()=>{
 'use strict';
 const W=window,old=W.KVPV_COMBAT_ENGINE;old?.stop?.();
 const actor=String(W.__KVPV_OWN_ACTOR_ID??'');
 const ids=[8001,8002,8003,8004,8005,1001,1002,1003,1004,1005,1006,1007,1008];
 const S={enabled:false,armed:false,busy:false,timer:null,casts:0,checks:0,lastSkill:null,reason:'off',error:'',cursor:0,lastTargetSearchAt:0,targetSearches:0};
 const valid=()=>actor!==''&&String(W._Ba?._rJ?._O$?.ins?.actorId??'')===actor&&W.__KVPV_UNIVERSAL_HALTED!==true;
 const far=()=>{const x=(W.KVPV_FAR_SCOPE??W.KVPV_TQ_SCOPE);return x?.inside?.()===true&&x?.status?.()?.kind!=='TRU_TIEN';};
 const components=()=>{
  const a=W._C?._Ba?.instance?.getRole?.(Number(actor));
  const c=W._d?._Yct;
  return {a,skill:a?.getComponent?.(c?._Eet),combat:a?.getComponent?.(c?._Het)};
 };
 function state(){return {enabled:S.enabled,armed:S.armed,busy:S.busy,actor,casts:S.casts,checks:S.checks,lastSkill:S.lastSkill,reason:S.reason,error:S.error,singleSender:true,legacyModes:false,targetSearches:S.targetSearches};}
 async function tick(){
  if(S.busy||!S.enabled||!valid())return;
  S.busy=true;
  try{
   if(!far()){S.reason='outside_boss_scope';return;}
   if(W.KVPV_ENTRY_POLICY?.manual===true||W.KVPV_EVENT_PRIORITY?.hold?.()||W.KVPV_BOSS_TEAM?.priority?.()===true){S.reason='yield_priority';return;}
   if(W._Ba?._rJ?._O$?.ins?.isDead===true){S.reason='dead';return;}
   const recovery=W.KVPV_HITRUN1?.status?.(false);
   if(recovery?.running===true&&recovery.phase!=='FIGHT'){S.reason='yield_recovery';return;}
   const {a,skill,combat}=components();
   if(!a||!skill||typeof combat?.combat!=='function'){S.reason='waiting_native_components';return;}
   const nativeTarget=combat.target;
   const rawType=nativeTarget?.property?.get?.('type');
   const type=rawType==null?NaN:Number(rawType);
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
   if(typeof combat.isValidRange==='function'&&combat.isValidRange()===false){S.reason='native_out_of_range';return;}
   if(typeof combat.isCooldown==='function'&&combat.isCooldown()!==false){S.reason='native_cooldown';return;}
   const target=combat.target;
   const hp=target?.property?.get?.('hp');
   if(Array.isArray(hp)&&Number(hp[0])<=0){S.reason='target_dead';return;}
   const rows=[...(skill._rtt??[]),...(skill._wet??[])];
   const known=new Set(rows.filter(Array.isArray).map(x=>Number(x[0])));
   // No bypass of target range; use native selection when its result is learned.
   const nativeId=Number(skill.selectSkill?.());
   const ordered=ids.filter(id=>known.has(id));
   const chosen=ordered.includes(nativeId)?nativeId:(!Number.isFinite(nativeId)?null:nativeId);
   if(!chosen||!ordered.includes(chosen)){S.reason='no_native_ready_skill';return;}
   S.checks++;
   await Promise.resolve();
   if(!S.enabled||!valid()||combat.target!==target)return;
   // Scene, event and recovery may change during the async skill-readiness boundary.
   if(!far()||W.KVPV_ENTRY_POLICY?.manual===true||W.KVPV_EVENT_PRIORITY?.hold?.()||
      W.KVPV_BOSS_TEAM?.priority?.()===true){
     S.reason='yield_changed_priority';return;
   }
   const recoveryNow=W.KVPV_HITRUN1?.status?.(false);
   if(recoveryNow?.running===true&&recoveryNow.phase!=='FIGHT'){S.reason='yield_recovery';return;}
   if(W._Ba?._rJ?._O$?.ins?.isDead===true){S.reason='dead';return;}
   const rawTypeNow=target?.property?.get?.('type');
   const typeNow=rawTypeNow==null?NaN:Number(rawTypeNow);
   const hpNowFinal=target?.property?.get?.('hp');
   if(!Number.isFinite(typeNow)||(typeNow!==0&&typeNow!==1)||
     (Array.isArray(hpNowFinal)&&Number(hpNowFinal[0])<=0)){S.reason='target_changed_or_dead';return;}
   if(typeof combat.isValidRange==='function'&&combat.isValidRange()===false){S.reason='native_out_of_range';return;}
   if(typeof combat.isCooldown==='function'&&combat.isCooldown()!==false){S.reason='native_cooldown';return;}
   combat.combat(chosen);S.lastSkill=chosen;S.casts++;S.reason='native_cast_requested';
  }catch(e){S.reason='error';S.error=String(e?.message??e);}
  finally{S.busy=false;}
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