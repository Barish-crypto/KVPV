import {getKVPV_MODE as __getKVPV0,getKVPV_PHUVAN_TH as __getKVPV1,getKVPV_TH300 as __getKVPV2} from '../api.mjs';
function __captureESMFunction(fn,name){
  if(fn.name!==name)Object.defineProperty(fn,"name",{value:name,configurable:true});
  return fn;
}
let __esmLocal0;
export {__esmLocal0 as local_anonymous_5_1_0};
export function initialize(){




(__captureESMFunction((__esmLocal0=(() => {
  const W = window;
  
  
  if (__getKVPV2()) {
    
    __getKVPV2().setBasicOnly?.(false);
    __getKVPV2().setTianQuanMpackExtras?.(true);
    __getKVPV2().setTianQuanTuyetHoc?.(true);
    
    __getKVPV2().setBasicAnimationSpeed?.(99);
    __getKVPV2().setScanInterval?.(1);
    
    __getKVPV2().setInterleaved?.(true, 310);
    __getKVPV2().setSkillPriority?.('interleaved');
  }
  
  
  if (__getKVPV1()) {
    
    __getKVPV1().enabled = true;
  }
  
  // Register for map changes to ensure settings are applied
  if (__getKVPV0()) {
    __getKVPV0().armTianQuan(); // Ensure Tian Quan mode is active for tower combat
  }
})),""))();

}
export const api=Object.freeze({
});