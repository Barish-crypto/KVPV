import {getKVPV_XA_MENH_LV2 as __getKVPV0} from '../api.mjs';
function __captureESMFunction(fn,name){
  if(fn.name!==name)Object.defineProperty(fn,"name",{value:name,configurable:true});
  return fn;
}
let __esmLocal0;
let __esmLocal1;
let __esmLocal2;
let __esmLocal3;
let __esmLocal4;
let __esmLocal5;
let __esmLocal6;
let __esmLocal7;
export {__esmLocal0 as local_anonymous_7_1_0};
export {__esmLocal1 as local_lookup_1};
export {__esmLocal2 as local_status_2};
export {__esmLocal3 as local_anonymous_29_27_3};
export {__esmLocal4 as local_anonymous_39_31_4};
export {__esmLocal5 as local_anonymous_39_52_5};
export {__esmLocal6 as local_recover_6};
export {__esmLocal7 as local_disabled_7};
export function initialize(){






(__captureESMFunction((__esmLocal0=(() => {
  'use strict';
  const W=window,KEY='KVPV_THAC_AN_CD0',old=W[KEY];
  try {old?.stop?.();} catch(e){
    console.warn('[Thác Ấn] Previous module cleanup failed:',String(e?.message||e));
  }
  const SPECS=Object.freeze([
    [3021,1,30210001,30000,'Bát Hoang Phá Thế Lv1'],
    [3021,2,30210002,30,'Bát Hoang Phá Thế Lv2'],
    [3021,3,30210003,25000,'Bát Hoang Phá Thế Lv3'],
    [3031,2,30310002,30,'Xá Mệnh Nhất Kích Lv2'],
    [3041,2,30410002,30000,'Quẻ Thượng Lv2'],
    [3121,2,31210002,0,'Ma Hóa Lv2']
  ]);
  let repairs=0,lastError='';
  function lookup([id,level,record]){
    const v=W._ft?._nY?.ins?.getCfgBySkillIdAndLv?.(id,level);
    return Array.isArray(v)&&Number(v[0])===record&&
      Number(v[1])===id&&Number(v[3])===level&&
      Number.isFinite(v[6])?v:null;
  }
__esmLocal1=lookup;

  function status(){
    const skills=SPECS.map(__captureESMFunction((__esmLocal3=(spec=>{
      const [id,level,record,originalMs,name]=spec;
      try{
        const r=lookup(spec);
        return {name,id,level,record,originalMs,
          clientMs:r?.[6]??null,available:!!r,
          unresolved:!!r&&originalMs>0&&r[6]===0};
      }catch(e){return {name,record,originalMs,error:String(e?.message||e)};}
    })),""));
    return {enabled:false,suspended:true,rollbackCount:repairs,
      unresolved:skills.filter(__captureESMFunction((__esmLocal4=(s=>s.unresolved)),"")).map(__captureESMFunction((__esmLocal5=(s=>s.record)),"")),skills,
      lastError,serverCooldownBypassed:false,lockedSlotsOpened:false,
      reason:'safe_config_rollback',note:'0ms disabled. Restores only exact known positive cooldowns; no packets or combat hooks.'};
  }
__esmLocal2=status;

  function recover(){
    lastError='';
    // Use Xa Menh's own recovery when available to maintain compatibility.
    try{__getKVPV0()?.recover?.();}catch(e){
      lastError='xa_recovery:'+String(e?.message||e);
    }
    for(const spec of SPECS){
      const [,,record,originalMs]=spec;
      if(originalMs===0||record===30310002)continue;
      try{
        const r=lookup(spec);
        if(r&&r[6]===0){r[6]=originalMs;repairs++;}
      }catch(e){lastError=String(e?.message||e);}
    }
    return status();
  }
__esmLocal6=recover;

  function disabled(){
    console.warn('[Thác Ấn] Client 0ms remains disabled after combat freeze.');
    return status();
  }
__esmLocal7=disabled;

  W[KEY]=Object.freeze({version:3,status,recover,restore:recover,
    stop:recover,enable:disabled,start:disabled});
  recover();
})),""))();

}
export const api=Object.freeze({
});