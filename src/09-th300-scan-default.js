/* Restore historical TH300 SCAN as the active far-Boss owner; keep the new engine as opt-in test. */
(()=>{
'use strict';
const W=window;
W.KVPV_TQ_TH10_TRIAL?.stop?.('native_cooldown_restored');
W.KVPV_TQ4100_COOLDOWN_EXPERIMENT?.stop?.('native_cooldown_restored');
function activate(){
 const legacy=W.KVPV_TH300,mode=W.KVPV_MODE;
 if(!legacy?.start||!mode?.start)return {ready:false,reason:'legacy_dependencies_missing'};
 try{
  W.KVPV_LEGACY_COMBAT_TEST?.stop?.();
  W.KVPV_COMBAT_ENGINE?.stop?.();
  W.KVPV_RANGE_KEEP310?.stop?.();
  // Explicit no-heal 310 profile for live TH300; legacy test contexts
  // without this flag retain original boss handoff behavior.
  W.KVPV_TQ_POSITION_ONLY={...(W.KVPV_TQ_POSITION_ONLY??{}),enabled:true,distance:310};
  legacy.setDistance?.(310);
  // Configure the native mixed selector BEFORE entering SCAN. Mode.start
  // can defer activation outside Tian Quan; its handoff must inherit basics.
  // Only the original TH300 controller dispatches combat.
  // Tian Quan: all five native basics at 310, without Tuyet Hoc.
  // Five-basic profile must be enabled before setting rotation (8002 is otherwise excluded).
  legacy.setBasicOnly?.(false); // BasicOnly's legacy path hardcodes 8001.
  const five=legacy.setTianQuanFiveBasics?.(true,10);
  if(five?.available===false||five?.enabled===false)throw Error('Tian Quan five-basics profile unavailable');
  legacy.setTianQuanTuyetHoc?.(false);
  legacy.setBasicRotation?.([8001,8002,8003,8004,8005]);
  // Mixed selector dispatches native basics even while Tuyet Hoc is disabled.
  legacy.setInterleaved?.(true,310);
  legacy.setPrimaryBasic?.(true);
  legacy.setSkillPriority?.('interleaved');
  // Visual playback only; native cooldown and server damage stay unchanged.
  legacy.setBasicAnimationSpeed?.(99);
  legacy.setTianQuanBasicVisualSpeed?.(99);
  legacy.setClientPace?.(100);
  mode.start('BOSS_TH300_SCAN');
  // Mode owns the TH300 sender and map handoff. Explicitly remove newer senders afterwards.
  W.KVPV_COMBAT_ENGINE?.stop?.();
  W.KVPV_RANGE_KEEP310?.stop?.();
  const th=legacy.status?.(false);
  return {ready:true,mode:mode.status?.(),th,requestedBasicIds:[8001,8002,8003,8004,8005],tuyetHocEnabled:false};
 }catch(e){return {ready:false,reason:String(e?.message??e)};}
}
// Persistent scoped client-only cooldown FALSE override in Tian Quan.
// It cannot modify server-side cooldowns; restore the original on scope exit.
W.KVPV_TQ_8001_CD?.stop?.('reload');
const CD={hook:null,timer:null,enabled:true,forced:0,reason:'armed'};
function cdScope(){
 const s=W.KVPV_FAR_SCOPE?.status?.();
 return CD.enabled&&s?.inside===true&&
  (s.kind==='THIEN_QUAN'&&W.KVPV_TH300?.status?.(false)?.running===true)&&
  String(W._Ba?._rJ?._O$?.ins?.actorId??'')===String(W.__KVPV_OWN_ACTOR_ID??'');
}
function cdRelease(reason){
 const h=CD.hook;CD.hook=null;
 if(h&&h.obj.isCooldown===h.fn){
  try{if(h.own)Object.defineProperty(h.obj,'isCooldown',h.own);else delete h.obj.isCooldown;}
  catch(e){CD.reason='restore_error:'+String(e);return;}
 }
 CD.reason=reason;
}
function cdSync(){
 if(!cdScope()){cdRelease('outside_combat_scope');return;}
 const id=String(W.__KVPV_OWN_ACTOR_ID??'');
 const world=W._C?._Ba?.instance;
 const actor=world?.getRole?.(Number(id))??world?.getRole?.(id);
 const c=actor?.getComponent?.(W._d?._Yct?._Het);
 if(!c||typeof c.isCooldown!=='function')return;
 if(CD.hook){
  if(CD.hook.obj===c&&c.isCooldown===CD.hook.fn)return;
  cdRelease('combat_component_changed');
 }
 const own=Object.getOwnPropertyDescriptor(c,'isCooldown');
 if(own&&!own.configurable)return;
 const original=c.isCooldown;
 const fn=function(...args){
  if(this===c&&cdScope()){CD.forced++;return false;}
  return original.apply(this,args);
 };
 try{Object.defineProperty(c,'isCooldown',{value:fn,writable:true,configurable:true,enumerable:!!own?.enumerable});
  CD.hook={obj:c,fn,own};CD.reason='active';
 }catch(e){CD.reason='hook_error:'+String(e);}
}
function cdStop(reason='manual'){
 CD.enabled=false;
 if(CD.timer!==null){W.clearInterval?.(CD.timer);CD.timer=null;}
 cdRelease(reason);return cdStatus();
}
function cdStatus(){return {enabled:CD.enabled,active:!!CD.hook&&CD.hook.obj.isCooldown===CD.hook.fn&&cdScope(),
 forcedTrue:0,forcedFalse:CD.forced,returnValueWhenActive:false,reason:CD.reason,serverCooldownModified:false};}
W.KVPV_TQ_8001_CD=Object.freeze({status:cdStatus,stop:cdStop});
if(typeof W.setInterval==='function')CD.timer=W.setInterval(cdSync,200);
cdSync();
W.KVPV_TH300_RESTORE=Object.freeze({activate,status:()=>({mode:W.KVPV_MODE?.status?.(),th:W.KVPV_TH300?.status?.(false),newEngine:W.KVPV_COMBAT_ENGINE?.status?.()})});
activate();
})();