import {getKVPV_COMBAT_ENGINE as __getKVPV0,getKVPV_FAR_SCOPE as __getKVPV1,getKVPV_MODE as __getKVPV3,getKVPV_RANGE_KEEP310 as __getKVPV4,getKVPV_TH300 as __getKVPV5,getKVPV_TH300_RESTORE as __getKVPV6,getKVPV_TH_FAR as __getKVPV7,getKVPV_TQ_POSITION_ONLY as __getKVPV10} from '../api.mjs';
export function call_KVPV_TH300_RESTORE_activate(...args){const target=globalThis["KVPV_TH300_RESTORE"];const fn=globalThis["KVPV_TH300_RESTORE"]?.["activate"];if(typeof fn!=='function')throw Error("KVPV_TH300_RESTORE.activate is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_TH300_RESTORE_status(...args){const target=globalThis["KVPV_TH300_RESTORE"];const fn=globalThis["KVPV_TH300_RESTORE"]?.["status"];if(typeof fn!=='function')throw Error("KVPV_TH300_RESTORE.status is not available");return Reflect.apply(fn,target,args);}
function __captureESMFunction(fn,name){
  if(fn.name!==name)Object.defineProperty(fn,"name",{value:name,configurable:true});
  return fn;
}
let __esmLocal0;
let __esmLocal1;
let __esmLocal8;
export {__esmLocal0 as local_anonymous_2_1_0};
export {__esmLocal1 as local_activate_1};
export {__esmLocal8 as local_status_8};
export function initialize(){
/* Restore historical TH300 SCAN as the active far-Boss owner. */
(__captureESMFunction((__esmLocal0=(()=>{
'use strict';
const W=window;
function activate(){
 const legacy=__getKVPV5(),mode=__getKVPV3();
 if(!legacy?.start||!mode?.start)return {ready:false,reason:'legacy_dependencies_missing'};
 try{
  __getKVPV0()?.stop?.();
  __getKVPV4()?.stop?.();
  // Explicit no-heal 310 profile for live TH300.
  W.KVPV_TQ_POSITION_ONLY={...(__getKVPV10()??{}),enabled:true,distance:310};
  legacy.setDistance?.(310);
  // Configure the native mixed selector BEFORE entering SCAN. Mode.start
  // can defer activation outside Tian Quan; its handoff must inherit basics.
  // Only the original TH300 controller dispatches combat.
  // Tian Quan: all five native basics at 310, without Tuyet Hoc.
  // Five-basic profile must be enabled before setting rotation (8002 is otherwise excluded).
  legacy.setBasicOnly?.(false); // BasicOnly's legacy path hardcodes 8001.
  const five=legacy.setTianQuanFiveBasics?.(true,1);
  if(five?.available===false||five?.enabled===false)throw Error('Tian Quan five-basics profile unavailable');
  legacy.setTianQuanTuyetHoc?.(false);
  legacy.setBasicRotation?.([8001,8002,8003,8004,8005]);
  // Mixed selector dispatches native basics even while Tuyet Hoc is disabled.
  legacy.setInterleaved?.(true,310);
  legacy.setPrimaryBasic?.(true);
  legacy.setSkillPriority?.('interleaved');
  // Keep native animation timing; extreme client time scales can stall rendering.
  legacy.setBasicAnimationSpeed?.(1);
  legacy.setTianQuanBasicVisualSpeed?.(1);
  legacy.setClientPace?.(1);
  mode.start('BOSS_TH300_SCAN');
  // Enforce five basics after mode startup/handoff; TH must remain disabled.
  legacy.setTianQuanTuyetHoc?.(false);
  __getKVPV7()?.stop?.('tianquan_five_basics_only');
  // Mode owns the TH300 sender and map handoff. Explicitly remove newer senders afterwards.
  __getKVPV0()?.stop?.();
  __getKVPV4()?.stop?.();
  const th=legacy.status?.(false);
  return {ready:true,mode:mode.status?.(),th,requestedBasicIds:[8001,8002,8003,8004,8005],tuyetHocEnabled:false};
 }catch(e){return {ready:false,reason:String(e?.message??e)};}
}
__esmLocal1=activate;

W.KVPV_TH300_RESTORE=Object.freeze({activate,status:__captureESMFunction((__esmLocal8=(()=>({mode:__getKVPV3()?.status?.(),th:__getKVPV5()?.status?.(false),newEngine:__getKVPV0()?.status?.()}))),"status")});
activate();
})),""))();

}
export {getKVPV_TH300_RESTORE} from '../api.mjs';
export {getKVPV_TQ_POSITION_ONLY} from '../api.mjs';
export const api=Object.freeze({
  get KVPV_TH300_RESTORE(){return globalThis.KVPV_TH300_RESTORE;},
  get KVPV_TQ_POSITION_ONLY(){return globalThis.KVPV_TQ_POSITION_ONLY;},
});