(() => {
  'use strict';
  const w=window,combat=w.KVPV_TH300;
  if(!combat||!w.__KVPV_OWN_ACTOR_ID||String(w.__KVPV_OWN_ACTOR_ID)!==String(w._Ba?._rJ?._O$?.ins?.actorId))throw Error('Chọn game-frame đã nạp FULL.');
  if(typeof combat.setTianQuanFiveBasics!=='function'||typeof combat.setTianQuanTuyetHoc!=='function')throw Error('Nạp FULL mới trước.');
  combat.stop1008Trial?.();
  combat.setTianQuanFiveBasics(true,10);
  combat.setTianQuanTuyetHoc(false);
  console.info('[KVPV] Thiên Quan chỉ dùng 8001–8005, wait 10ms.');
  return combat.rangeReport();
})();
