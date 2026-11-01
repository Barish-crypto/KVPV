/* Restore historical TH300 SCAN as the active far-Boss owner; keep the new engine as opt-in test. */
(()=>{
'use strict';
const W=window;
W.KVPV_TQ_TH10_TRIAL?.stop?.('reload');
function activate(){
 const legacy=W.KVPV_TH300,mode=W.KVPV_MODE;
 if(!legacy?.start||!mode?.start)return {ready:false,reason:'legacy_dependencies_missing'};
 try{
  W.KVPV_LEGACY_COMBAT_TEST?.stop?.();
  W.KVPV_COMBAT_ENGINE?.stop?.();
  W.KVPV_RANGE_KEEP310?.stop?.();
  // Explicit no-heal 300 profile for live TH300; legacy test contexts
  // without this flag retain original boss handoff behavior.
  W.KVPV_TQ_POSITION_ONLY={...(W.KVPV_TQ_POSITION_ONLY??{}),enabled:true,distance:300};
  legacy.setDistance?.(300);
  // Keep TH priority and 300 movement protection while testing all five basics.
  legacy.setSkillPriority?.('tuyet_hoc_first');
  legacy.setBasicOnly?.(false);
  mode.start('BOSS_TH300_SCAN');
  // Keep native TH first; allow all five basic skills as fallback.
  // Movement guards retain the 300 ring; out-of-range basics may not hit.
  // The TH-first selector filters out all basics unless the five-basic
  // profile is active. Enable that profile so native 8002 is not excluded.
  // TH300 remains the only sender and retains native ready/range checks.
  legacy.setTianQuanFiveBasics?.(true,10);
  legacy.setBasicRotation?.([8001,8002,8003,8004,8005]);
  legacy.setBasicOnly?.(false);
  legacy.setTianQuanTuyetHoc?.(true);
  legacy.setSkillPriority?.('interleaved');
  // Poll cast opportunities more often without bypassing native cooldown.
  // Only TH300 sends skill requests; no parallel cast timer.
  legacy.setClientPace?.(100);
  // Mode owns the TH300 sender and map handoff. Explicitly remove newer senders afterwards.
  W.KVPV_COMBAT_ENGINE?.stop?.();
  W.KVPV_RANGE_KEEP310?.stop?.();
  return {ready:true,mode:mode.status?.(),th:legacy.status?.(false)};
 }catch(e){return {ready:false,reason:String(e?.message??e)};}
}
// Reversible, scoped 10ms cast-selection trial; does not forge native cooldown.
const trial={enabled:false,expiresAt:0,checks:0,timer:null,previousPace:100,reason:'off',hook:null,forcedFalse:0,nativeTrue:0,lastForcedAt:0};
function trialStop(reason='manual'){
 const h=trial.hook;trial.hook=null;
 if(h&&h.obj.isCooldown===h.fn){try{if(h.own)Object.defineProperty(h.obj,'isCooldown',h.own);else delete h.obj.isCooldown;}catch(e){trial.reason='restore_failed:'+String(e);}}
 if(trial.timer!==null){W.clearInterval?.(trial.timer);trial.timer=null;}
 trial.enabled=false;trial.expiresAt=0;trial.reason=reason;
 W.KVPV_TH300?.setClientPace?.(trial.previousPace);
 return trialStatus();
}
function trialStatus(){return {enabled:trial.enabled,expiresInMs:trial.enabled?Math.max(0,trial.expiresAt-Date.now()):0,
 checks:trial.checks,clientPaceMs:trial.enabled?10:trial.previousPace,
 clientIsCooldownHook:!!trial.hook,forcedFalse:trial.forcedFalse,nativeTrue:trial.nativeTrue,
 nativeCooldownModified:false,serverCooldownModified:false,affectsSharedCombatGate:true,reason:trial.reason};}
function trialStart(durationMs=15000){
 if(!Number.isInteger(durationMs)||durationMs<1000||durationMs>30000)throw Error('Duration must be 1000..30000ms');
 trialStop('restart');
 const scope=W.KVPV_FAR_SCOPE?.status?.();
 if(scope?.kind!=='THIEN_QUAN'||scope?.inside!==true||W.KVPV_TH300?.status?.(false)?.running!==true)
  throw Error('Requires active Tian Quan TH300');
 const actor=String(W.__KVPV_OWN_ACTOR_ID??''),world=W._C?._Ba?.instance;
 const role=world?.getRole?.(Number(actor))??world?.getRole?.(actor);
 const c=role?.getComponent?.(W._d?._Yct?._Het);
 if(!c||typeof c.isCooldown!=='function')throw Error('Native combat component unavailable');
 const own=Object.getOwnPropertyDescriptor(c,'isCooldown');
 if(own&&!own.configurable)throw Error('Native cooldown hook is not configurable');
 const original=c.isCooldown;
 trial.enabled=true;trial.expiresAt=Date.now()+durationMs;trial.reason='running';trial.checks=0;
 trial.forcedFalse=0;trial.nativeTrue=0;trial.lastForcedAt=0;
 const wrapped=function(...args){
  const result=original.apply(this,args);
  if(result!==true||this!==c||!trial.enabled)return result;
  trial.nativeTrue++;
  const st=W.KVPV_FAR_SCOPE?.status?.();
  if(Date.now()>=trial.expiresAt||st?.kind!=='THIEN_QUAN'||st?.inside!==true||
    W.KVPV_TH300?.status?.(false)?.running!==true||
    String(W._Ba?._rJ?._O$?.ins?.actorId??'')!==actor)return result;
  // Shared native gate: at most one synthetic ready indication per 10ms.
  // This does not change learned skill rows, network requests or server cooldown.
  const now=Date.now();
  if(now-trial.lastForcedAt<10)return result;
  trial.lastForcedAt=now;trial.forcedFalse++;return false;
 };
 try{Object.defineProperty(c,'isCooldown',{value:wrapped,writable:true,configurable:true,enumerable:!!own?.enumerable});}
 catch(e){trial.enabled=false;throw e;}
 trial.hook={obj:c,fn:wrapped,own};
 W.KVPV_TH300.setClientPace?.(10);
 trial.timer=W.setInterval?.(()=>{
  trial.checks++;
  const s=W.KVPV_FAR_SCOPE?.status?.();
  if(trial.hook?.obj?.isCooldown!==trial.hook?.fn||Date.now()>=trial.expiresAt||s?.kind!=='THIEN_QUAN'||s?.inside!==true||
     W.KVPV_TH300?.status?.(false)?.running!==true)trialStop('expired_or_left_scope');
 },100);
 return trialStatus();
}
W.KVPV_TQ_TH10_TRIAL=Object.freeze({start:trialStart,stop:trialStop,status:trialStatus});
W.KVPV_TH300_RESTORE=Object.freeze({activate,status:()=>({mode:W.KVPV_MODE?.status?.(),th:W.KVPV_TH300?.status?.(false),newEngine:W.KVPV_COMBAT_ENGINE?.status?.()})});
activate();
})();