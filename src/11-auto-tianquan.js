/* CHÚ THÍCH V1 — Kích hoạt mặc định của FULL.
 * Bật nhật ký Boss và đăng ký chế độ BOSS chờ Thiên Quan; bộ theo dõi map quyết định lúc thực sự bắt đầu.
 * Sửa nguồn tại đây rồi chạy node build.cjs; FULL và bản vá được sinh tự động. */
/* User-requested startup: arm map watcher, leave other maps to native combat. */
(() => {
  const W=window;
  // Thiên Quan: target far goal 300, but restore native HitRun recovery (35/100).
  // Old position-only mode disabled the emergency HP retreat and was unsafe.
  W.KVPV_TQ_POSITION_ONLY=Object.freeze({enabled:false,distance:300,heal:true});
  try{
    W.KVPV_BOSS_LOG?.start?.();
    // Unified native Boss mode is the only auto-combat entry.
    W.KVPV_FAR_SCOPE?.setAllBosses?.(false);
    W.KVPV_TQ115?.stop?.();
    W.KVPV_MODE.armTianQuan();
    W.KVPV_TQ_BASIC_FORCE?.setEnabled?.(false);
    console.info('[KVPV V1] Thiên Quan: unified native BOSS coordinator.');
  }catch(e){W.KVPV_V1?.diagnostics?.record?.(e);console.warn('[KVPV V1] Auto Thiên Quan:',String(e));}
})();
