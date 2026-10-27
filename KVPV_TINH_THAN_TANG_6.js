(() => {
  'use strict';
  const W=window,actor=String(W._Ba?._rJ?._O$?.ins?.actorId||'');
  if(!actor||actor!==String(W.__KVPV_OWN_ACTOR_ID||'')||!W.KVPV_DAILY?.config)throw Error('Chạy trong game-frame đã nạp FULL đúng nhân vật.');
  W.KVPV_DAILY.config.tinhThanTang=6;
  W.console.info('[KVPV] Đã đặt Tinh Thần tầng 6. Áp dụng khi chọn lượt tiếp theo; game vẫn kiểm tra điều kiện mở tầng.');
})();
