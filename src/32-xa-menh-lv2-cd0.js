/*
 * KVPV Xá Mệnh Nhất Kích Lv2: safe / read-only after 0ms trial.
 * A real game session froze and stopped casting after applying zero cooldown
 * to Thác Ấn passives (2026-10-31).
 * Never set skill[6] to zero here. Do not restore old opt-in on hot reload.
 */
(() => {
  'use strict';
  const W=window,KEY='KVPV_XA_MENH_LV2';
  const old=W[KEY];
  try{old?.restore?.();}catch(error){
    console.warn('[Xá Mệnh] Legacy cooldown cleanup failed:',error);
  }
  function status(){
    try{
      const m=W._ft?._nY?.ins;
      const row=m?.getCfgBySkillIdAndLv?.(3031,2);
      return {enabled:false,suspended:true,skillId:3031,level:2,
        recordId:Array.isArray(row)?row[0]:null,
        configCooldownMs:Array.isArray(row)?row[6]:null,
        originalMs:30000,serverBypassConfirmed:false,
        note:'0ms client cooldown experiment disabled following live combat freeze.'};
    }catch(error){
      return {enabled:false,suspended:true,error:String(error?.message||error)};
    }
  }
  function disabled(){
    console.warn('[Xá Mệnh] 0ms experiment is suspended: previously froze combat.');
    return status();
  }
  W[KEY]=Object.freeze({version:3,status,enable:disabled,start:disabled,
    stop:status,restore:status});
})();
