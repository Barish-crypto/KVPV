/*
 * KVPV Thác Ấn — disabled client 0ms experiment (2026-10-31).
 * A user observed combat freezing immediately after enabling 0ms.
 * Restore old trial on hot-update, then expose read-only diagnostics only.
 * No movement/combat hooks, packet sending, timer, or configuration writes.
 */
(() => {
  'use strict';
  const W=window,KEY='KVPV_THAC_AN_CD0';
  const old=W[KEY];
  try{old?.stop?.();}catch(error){
    console.warn('[Thác Ấn] Legacy patch cleanup failed:',error);
  }
  const records=Object.freeze([
    [3021,1,30210001,30000,'Bát Hoang Phá Thế Lv1'],
    [3021,2,30210002,30000,'Bát Hoang Phá Thế Lv2'],
    [3021,3,30210003,25000,'Bát Hoang Phá Thế Lv3'],
    [3031,2,30310002,30000,'Xá Mệnh Nhất Kích Lv2'],
    [3041,2,30410002,30000,'Quẻ Thượng Lv2'],
    [3121,2,31210002,0,'Ma Hóa Lv2 (native 0ms)']
  ]);
  function status(){
    const manager=W._ft?._nY?.ins;
    const skills=records.map(([id,lv,record,originalMs,name])=>{
      let row;
      try{row=manager?.getCfgBySkillIdAndLv?.(id,lv);}catch(error){
        return {name,record,error:String(error?.message||error)};
      }
      return {name,record,originalMs,
        clientMs:Array.isArray(row)&&Number(row[0])===record?row[6]:null};
    });
    return {enabled:false,suspended:true,changedCount:0,
      xaManagedByThisModule:false,skills,serverCooldownBypassed:false,
      lockedSlotsOpened:false,
      reason:'disabled_after_live_freeze',
      note:'Read-only. Zero cooldown patch is disabled; original values should be restored.'};
  }
  function disabled(){
    console.warn('[Thác Ấn] 0ms experiment suspended after combat freeze. No changes applied.');
    return status();
  }
  W[KEY]=Object.freeze({version:2,status,start:disabled,enable:disabled,
    stop:status,restore:status});
})();
