(() => {
  'use strict';
  const W=window,actor=String(W._Ba?._rJ?._O$?.ins?.actorId||'');
  if(!actor||actor!==String(W.__KVPV_OWN_ACTOR_ID||''))throw Error('Chạy trong game-frame đã nạp FULL đúng nhân vật.');
  if(W.KVPV_TQ_SCOPE?.inside?.()!==true||W.KVPV_FAR_SCOPE?.status?.()?.kind!=='THIEN_QUAN')throw Error('Bản đánh–né này chỉ áp dụng trong Thiên Quan.');
  const requirements={KVPV_FAR_SCOPE:['setAllBosses'],KVPV_TH300:['setBasicOnly','setInterleaved','setPrimaryBasic','setBasicRotation','setBasicHitQuota','setSkillPriority','setClientPace','setBurst'],KVPV_TQ112:['enable'],KVPV_TQ113:['enable'],KVPV_TQ114:['enable'],KVPV_TQ117:['enable'],KVPV_TQ115:['stop'],KVPV_MODE:['armTianQuan']};
  for(const [name,methods]of Object.entries(requirements))for(const method of methods)if(typeof W[name]?.[method]!=='function')throw Error('Thiếu '+name+'.'+method+'; nạp FULL mới trước.');
  const profile=W.KVPV_DESKTOP_CONTROL?.scopeProfile?.(W.KVPV_FAR_SCOPE?.status?.()?.kind);
  if(profile?.mode==='basic8001')throw Error('Cấu hình map trong app đang khóa chỉ đánh 8001; đổi sang mixed trước.');
  const combat=W.KVPV_TH300;
  W.KVPV_FAR_SCOPE.setAllBosses(false);
  combat.setBurst(false);combat.setBasicOnly(false);
  combat.setInterleaved(true,302);combat.setPrimaryBasic(false);combat.setBasicRotation([8001]);combat.setBasicHitQuota(null);
  combat.setSkillPriority('tuyet_hoc_first');combat.setClientPace(100);
  W.KVPV_TQ115.stop();
  W.KVPV_TQ112.enable(true);W.KVPV_TQ113.enable(true);W.KVPV_TQ114.enable(true);W.KVPV_TQ117.enable(true);
  W.KVPV_MODE.armTianQuan();
  W.console.info('[KVPV] Chỉ Boss Thiên Quan: đánh → né theo tín hiệu → đánh lại, 100ms. Giữ điều kiện hồi máu; cần đủ mẫu để né dự báo.');
})();
