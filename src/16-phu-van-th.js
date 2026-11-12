



(() => {
  const W = window;
  
  
  if (W.KVPV_TH300) {
    
    W.KVPV_TH300.setBasicOnly?.(false);
    W.KVPV_TH300.setTianQuanMpackExtras?.(true);
    W.KVPV_TH300.setTianQuanTuyetHoc?.(true);
    
    W.KVPV_TH300.setBasicAnimationSpeed?.(99);
    W.KVPV_TH300.setScanInterval?.(1);
    
    W.KVPV_TH300.setInterleaved?.(true, 310);
    W.KVPV_TH300.setSkillPriority?.('interleaved');
  }
  
  
  if (W.KVPV_PHUVAN_TH) {
    
    W.KVPV_PHUVAN_TH.enabled = true;
  }
  
  // Register for map changes to ensure settings are applied
  if (W.KVPV_MODE) {
    W.KVPV_MODE.armTianQuan(); // Ensure Tian Quan mode is active for tower combat
  }
})();
