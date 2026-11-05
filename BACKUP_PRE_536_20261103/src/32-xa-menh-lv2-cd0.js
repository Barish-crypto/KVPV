/*
 * Xá Mệnh Nhất Kích Lv2: emergency client CONFIG rollback.
 * Prior 0ms test froze live combat (2026-10-31). Never re-enable it.
 * This module restores ONLY verified record 30310002 when skill[6]===0.
 */
(() => {
  'use strict';
  const W=window, KEY='KVPV_XA_MENH_LV2', REC=30310002, NATIVE_MS=30000;
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
  function status(){
    let r=null;try{r=row();}catch(e){lastError=String(e?.message||e);}
    return {enabled:false,suspended:true,skillId:3031,level:2,
      recordId:r?.[0]??null,configCooldownMs:r?.[6]??null,
      originalMs:NATIVE_MS,rollbackCount:repairs,unresolved:r?.[6]===0,
      lastError,serverBypassConfirmed:false,
      note:'0ms disabled. Auto-restores only verified 30310002 when still at 0ms.'};
  }
  function disabled(){
    console.warn('[Xá Mệnh] Client 0ms disabled after combat freeze. No change.');
    return status();
  }
  W[KEY]=Object.freeze({version:4,status,recover,restore:recover,stop:recover,
    enable:disabled,start:disabled});
  recover();
})();
