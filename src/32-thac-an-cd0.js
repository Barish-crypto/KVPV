/*
 * KVPV Thác Ấn client-only skill[6] cooldown experiment.
 *
 * Screenshot: Bát Hoang Phá Thế (level unreadable), Xá Mệnh Nhất Kích Lv2,
 * Ma Hóa Lv2, Quẻ Thượng Lv2. Data: configs_yuenan.mpacks 20261014002.
 *
 * Bát Hoang Phá Thế: lv1/lv2/lv3 = 30000/30000/25000ms.
 * Quẻ Thượng lv2: 30000ms. Xá Mệnh lv2: existing separate module.
 * Ma Hóa lv2: ALREADY 0ms; never modify.
 *
 * OFF by default; no timers, socket sends, packet rewriting, purchases,
 * unlock bypass, or real server cooldown claims.
 */
(() => {
  'use strict';
  const W=window,KEY='KVPV_THAC_AN_CD0';
  const old=W[KEY];
  let resume=false;
  try {
    resume=old?.status?.().enabled===true;
    old?.stop?.();
  } catch(error) { console.warn('[Thác Ấn CD0] Previous cleanup:',error); }

  const SPECS=Object.freeze([
    {id:3021,lv:1,record:30210001,ms:30000,name:'Bát Hoang Phá Thế Lv1'},
    {id:3021,lv:2,record:30210002,ms:30000,name:'Bát Hoang Phá Thế Lv2'},
    {id:3021,lv:3,record:30210003,ms:25000,name:'Bát Hoang Phá Thế Lv3'},
    {id:3041,lv:2,record:30410002,ms:30000,name:'Quẻ Thượng Lv2'}
  ]);
  const MA_HOA={id:3121,lv:2,record:31210002,ms:0,name:'Ma Hóa Lv2'};
  const XA_ID=30310002;
  let enabled=false,ownXa=false;
  let changed=[];

  function locate(spec) {
    const mgr=W._ft?._nY?.ins;
    if(typeof mgr?.getCfgBySkillIdAndLv!=='function')
      throw Error('Skill manager not ready. Select the game iframe and load character.');
    const row=mgr.getCfgBySkillIdAndLv(spec.id,spec.lv);
    if(!Array.isArray(row)||Number(row[0])!==spec.record||
       Number(row[1])!==spec.id||Number(row[3])!==spec.lv||
       !Number.isFinite(row[6]))
      throw Error('Skill config mismatch: '+spec.name+'. No mutation.');
    return row;
  }
  const xa=()=>W.KVPV_XA_MENH_LV2;
  function xaState(){
    const a=xa();
    if(typeof a?.status!=='function'||typeof a?.enable!=='function'||typeof a?.restore!=='function')
      throw Error('Missing KVPV_XA_MENH_LV2; load the latest FULL.');
    const s=a.status();
    if(Number(s.recordId)!==XA_ID||!Number.isFinite(s.configCooldownMs))
      throw Error('Unexpected Xá Mệnh Lv2 config; no mutation.');
    return s;
  }
  function status(){
    const rows=[];
    for(const sp of [...SPECS,MA_HOA]){
      try{const row=locate(sp);rows.push({name:sp.name,record:sp.record,
        clientMs:row[6],originalMs:sp.ms,
        owned:changed.some(x=>x.row===row)});}
      catch(error){rows.push({name:sp.name,error:String(error.message||error)});}
    }
    let x;
    try{x=xaState();}catch(error){x={error:String(error.message||error)};}
    return {enabled,changedCount:changed.length,xaManagedByThisModule:ownXa,
      xaMenhLv2:x,skills:rows,
      serverCooldownBypassed:false,lockedSlotsOpened:false,
      note:'Changes only loaded client skill[6]. Server may enforce all original cooldowns.'};
  }
  function stop(){
    // Only restore memory we changed and only if no other module has rewritten it.
    for(const item of changed){
      if(item.row[6]===0)item.row[6]=item.originalMs;
      else if(item.row[6]!==item.originalMs)
        console.warn('[Thác Ấn CD0] Third-party change detected:',item.name);
    }
    changed=[];
    if(ownXa){
      try{if(xaState().enabled===true)xa().restore();}
      catch(error){console.warn('[Thác Ấn CD0] Xá Mệnh restore:',error);}
    }
    ownXa=false;enabled=false;
    return status();
  }
  function start(){
    if(enabled)return status();
    // Atomic preflight before modifying ANY skill.
    const rows=SPECS.map(sp=>({sp,row:locate(sp)}));
    const ma=locate(MA_HOA);
    if(ma[6]!==0)throw Error('Ma Hóa Lv2 expected 0ms; found '+ma[6]+'ms. Aborting.');
    const x=xaState();
    if(x.configCooldownMs!==0&&x.configCooldownMs!==30000)
      throw Error('Xá Mệnh Lv2 config unexpectedly '+x.configCooldownMs+'ms; aborting.');
    for(const {sp,row}of rows){
      if(row[6]!==sp.ms&&row[6]!==0)
        throw Error(sp.name+' expected '+sp.ms+'ms or 0ms; found '+row[6]+'ms.');
    }
    try{
      for(const {sp,row}of rows){
        if(row[6]===sp.ms&&sp.ms!==0){
          changed.push({row,originalMs:sp.ms,name:sp.name});
          row[6]=0;
        }
      }
      if(x.configCooldownMs===30000){
        xa().enable();ownXa=true;
      }
      enabled=true;
      console.info('[Thác Ấn CD0] Client configuration only; server bypass UNVERIFIED.');
      return status();
    }catch(error){
      stop();
      throw error;
    }
  }
  W[KEY]=Object.freeze({version:1,status,start,enable:start,stop,restore:stop});
  if(resume){
    try{start();}
    catch(error){console.warn('[Thác Ấn CD0] Cannot resume:',error);}
  }
})();
