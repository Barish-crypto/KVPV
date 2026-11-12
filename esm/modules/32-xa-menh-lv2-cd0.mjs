function __captureESMFunction(fn,name){
  if(fn.name!==name)Object.defineProperty(fn,"name",{value:name,configurable:true});
  return fn;
}
let __esmLocal0;
let __esmLocal1;
let __esmLocal2;
let __esmLocal3;
let __esmLocal4;
export {__esmLocal0 as local_anonymous_6_1_0};
export {__esmLocal1 as local_row_1};
export {__esmLocal2 as local_recover_2};
export {__esmLocal3 as local_status_3};
export {__esmLocal4 as local_disabled_4};
export function initialize(){





(__captureESMFunction((__esmLocal0=(() => {
  'use strict';
  const W=window, KEY='KVPV_XA_MENH_LV2', REC=30310002, NATIVE_MS=30;
  const old=W[KEY];
  try { old?.restore?.(); } catch(e) {
    console.warn('[Xá Mệnh] Old module cleanup failed:',String(e?.message||e));
  }
  let repairs=0,lastError='';
  function row(){
    const r=W._ft?._nY?.ins?.getCfgBySkillIdAndLv?.(3031,2);
    return Array.isArray(r)&&Number(r[0])===REC&&
      Number(r[1])===3031&&Number(r[3])===2&&
      Number.isFinite(r[6])?r:null;
  }
__esmLocal1=row;

  function recover(){
    try {
      const r=row();
      if(!r) { lastError='verified_skill_row_unavailable'; return status(); }
      if(r[6]===0) {r[6]=NATIVE_MS;repairs++;lastError='';}
      else if(r[6]!==NATIVE_MS)lastError='unexpected_current_ms:'+r[6];
      else lastError='';
    }catch(e){lastError=String(e?.message||e);}
    return status();
  }
__esmLocal2=recover;

  function status(){
    let r=null;try{r=row();}catch(e){lastError=String(e?.message||e);}
    return {enabled:true,suspended:false,skillId:3031,level:2,
      recordId:r?.[0]??null,configCooldownMs:r?.[6]??null,
      originalMs:NATIVE_MS,rollbackCount:repairs,unresolved:r?.[6]===0,
      lastError,serverBypassConfirmed:false,
      note:'0ms disabled. Auto-restores only verified 30310002 when still at 0ms.'};
  }
__esmLocal3=status;

  function disabled(){
    console.warn('[Xá Mệnh] Client 0ms disabled after combat freeze. No change.');
    return status();
  }
__esmLocal4=disabled;

  W[KEY]=Object.freeze({version:4,status,recover,restore:recover,stop:recover,
    enable:disabled,start:disabled});
  recover();
})),""))();

}
export const api=Object.freeze({
});