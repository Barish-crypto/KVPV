/* CHÚ THÍCH V1 — Chính sách hồi máu Boss.
 * Rút lui ở 35%; chỉ quay lại khi máu thực đạt tối đa. Vòng hồi máu lấy tầm Boss cộng biên, có giá trị dự phòng khi thiếu cấu hình.
 * Sửa nguồn tại đây rồi chạy node build.cjs; FULL và bản vá được sinh tự động. */
/* V1: fixed Thiên Quan recovery thresholds and client-range geometry. */
(() => {
  'use strict';
  const policy = Object.freeze({leavePct:35,returnPct:100,margin:80,minRing:360,fallbackRange:350});
  // Tính vòng hồi máu bằng tầm Boss cộng biên; đánh dấu rõ khi đang dùng tầm dự phòng.
  function geometry(nativeRange) {
    const value=Number(nativeRange);
    const known=Number.isFinite(value)&&value>0;
    const range=known?value:policy.fallbackRange;
    return {range,known,ring:Math.max(policy.minRing,range+policy.margin)};
  }
  // So máu hiện tại với máu tối đa thực; không dùng phần trăm đã làm tròn để cho đánh lại.
  function fullHP(hp) {
    return !!hp&&Number.isFinite(hp.current)&&Number.isFinite(hp.max)&&hp.max>0&&hp.current>=hp.max;
  }
  window.KVPV_BOSS_RECOVERY=Object.freeze({version:'1.0.0',policy,geometry,fullHP});
})();
