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
  legacy.setDistance?.(310);
  legacy.setSkillPriority?.('tuyet_hoc_first');
  legacy.setBasicOnly?.(false);
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