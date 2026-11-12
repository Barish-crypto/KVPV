




(() => {

  const W=window;let enabled=W.KVPV_LINHLUNG_TH?.enabled!==false;

  W.KVPV_LINHLUNG_TH=Object.freeze({

    get enabled(){return enabled;},

    start(options={}){const tower=W.KVPV_LINHLUNG922;

      if(!tower?.start)throw Error('Thiếu bộ vượt Linh Lung Tháp');

      enabled=true;W.KVPV_MODE.armTianQuan();return tower.start(options);},

    stop(){enabled=false;const result=W.KVPV_LINHLUNG922?.stop?.('Dừng vượt Linh Lung Tuyệt Học');W.KVPV_MODE?.syncMap?.();return result;},

    status(){return {enabled,scope:W.KVPV_FAR_SCOPE?.status?.(),tower:W.KVPV_LINHLUNG922?.status?.(false),

      combat:W.KVPV_TH300?.status?.(false),recovery:{enabled:true,leavePct:35,returnPct:100,finishBossHpPct:2}};}

  });

})();



(() => {
  const W = window;
  if (W.KVPV_TH300) {
        
        W.KVPV_TH300.setBasicOnly?.(false);
        W.KVPV_TH300.setTianQuanMpackExtras?.(true);
        W.KVPV_TH300.setTianQuanTuyetHoc?.(true);
        // Client-only basic animation speed; server cooldown and damage are unchanged.
        W.KVPV_TH300.setBasicAnimationSpeed?.(99);
        W.KVPV_TH300.setScanInterval?.(1);
        
        W.KVPV_TH300.setInterleaved?.(true, 310);
        W.KVPV_TH300.setSkillPriority?.('interleaved');
  }
})();
