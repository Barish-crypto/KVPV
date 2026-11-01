/* Restore historical TH300 SCAN as the active far-Boss owner; keep the new engine as opt-in test. */
(()=>{
'use strict';
const W=window;
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
  // Restore the last user-confirmed working ranged combat profile.
  // Do not activate the five-basic async rotation at 310: native melee
  // skills can trigger auto-approach and lose the safe boss ring.
  legacy.setSkillPriority?.('tuyet_hoc_first');
  legacy.setBasicOnly?.(false);
  mode.start('BOSS_TH300_SCAN');
  // Keep native TH first; add only requested basics as fallback.
  // Movement guards retain the 310 ring; out-of-range basics may not hit.
  legacy.setTianQuanFiveBasics?.(false,1);
  legacy.setBasicRotation?.([8005,8002]);
  legacy.setBasicOnly?.(false);
  legacy.setTianQuanTuyetHoc?.(true);
  legacy.setSkillPriority?.('tuyet_hoc_first');
  // Poll cast opportunities more often without bypassing native cooldown.
  // Only TH300 sends skill requests; no parallel cast timer.
  legacy.setClientPace?.(100);
  // Mode owns the TH300 sender and map handoff. Explicitly remove newer senders afterwards.
  W.KVPV_COMBAT_ENGINE?.stop?.();
  W.KVPV_RANGE_KEEP310?.stop?.();
  return {ready:true,mode:mode.status?.(),th:legacy.status?.(false)};
 }catch(e){return {ready:false,reason:String(e?.message??e)};}
}
W.KVPV_TH300_RESTORE=Object.freeze({activate,status:()=>({mode:W.KVPV_MODE?.status?.(),th:W.KVPV_TH300?.status?.(false),newEngine:W.KVPV_COMBAT_ENGINE?.status?.()})});
activate();
})();