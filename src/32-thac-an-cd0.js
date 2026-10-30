/*
 * Thác Ấn: safe rollback of abandoned client 0ms passive cooldowns.
 * A live user saw casting freeze on 2026-10-31 after patching skill[6].
 * Restores ONLY known positive-MPACK cooldowns when the exact record is 0ms;
 * native Ma Hóa Lv2=0ms is NEVER modified. Does not send gameplay commands.
 */
(() => {
  'use strict';
  const W=window,KEY='KVPV_THAC_AN_CD0',old=W[KEY];
  try {old?.stop?.();} catch(e){
    console.warn('[Thác Ấn] Previous module cleanup failed:',String(e?.message||e));
  }
  const SPECS=Object.freeze([
    [3021,1,30210001,30000,'Bát Hoang Phá Thế Lv1'],
    [3021,2,30210002,30000,'Bát Hoang Phá Thế Lv2'],
    [3021,3,30210003,25000,'Bát Hoang Phá Thế Lv3'],
    [3031,2,30310002,30000,'Xá Mệnh Nhất Kích Lv2'],
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
  function status(){
    const skills=SPECS.map(spec=>{
      const [id,level,record,originalMs,name]=spec;
      try{
        const r=lookup(spec);
        return {name,id,level,record,originalMs,
          clientMs:r?.[6]??null,available:!!r,
          unresolved:!!r&&originalMs>0&&r[6]===0};
      }catch(e){return {name,record,originalMs,error:String(e?.message||e)};}
    });
    return {enabled:false,suspended:true,rollbackCount:repairs,
      unresolved:skills.filter(s=>s.unresolved).map(s=>s.record),skills,
      lastError,serverCooldownBypassed:false,lockedSlotsOpened:false,
      reason:'safe_config_rollback',note:'0ms disabled. Restores only exact known positive cooldowns; no packets or combat hooks.'};
  }
  function recover(){
    lastError='';
    // Use Xa Menh's own recovery when available to maintain compatibility.
    try{W.KVPV_XA_MENH_LV2?.recover?.();}catch(e){
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
  function disabled(){
    console.warn('[Thác Ấn] Client 0ms remains disabled after combat freeze.');
    return status();
  }
  W[KEY]=Object.freeze({version:3,status,recover,restore:recover,
    stop:recover,enable:disabled,start:disabled});
  recover();
})();
