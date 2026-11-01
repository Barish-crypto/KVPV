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
  legacy.setTianQuanFiveBasics?.(true,10);
  legacy.setBasicRotation?.([8001,8002,8003,8004,8005]);
  legacy.setBasicOnly?.(false);
  legacy.setTianQuanTuyetHoc?.(true);
  legacy.setInterleaved?.(true,310);
  legacy.setPrimaryBasic?.(true);
  legacy.setSkillPriority?.('interleaved');
  legacy.setClientPace?.(100);
  mode.start('BOSS_TH300_SCAN');
  // Mode owns the TH300 sender and map handoff. Explicitly remove newer senders afterwards.
  W.KVPV_COMBAT_ENGINE?.stop?.();
  W.KVPV_RANGE_KEEP310?.stop?.();
  return {ready:true,mode:mode.status?.(),th:legacy.status?.(false)};
 }catch(e){return {ready:false,reason:String(e?.message??e)};}
}
W.KVPV_TH300_RESTORE=Object.freeze({activate,status:()=>({mode:W.KVPV_MODE?.status?.(),th:W.KVPV_TH300?.status?.(false),newEngine:W.KVPV_COMBAT_ENGINE?.status?.()})});
activate();
})();