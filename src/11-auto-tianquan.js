/* CHÚ THÍCH V1 — Kích hoạt mặc định của FULL.
 * Bật nhật ký Boss và đăng ký chế độ SCAN chờ Thiên Quan; bộ theo dõi map quyết định lúc thực sự bắt đầu.
 * Sửa nguồn tại đây rồi chạy node build.cjs; FULL và bản vá được sinh tự động. */
/* User-requested startup: arm map watcher, leave other maps to native combat. */
(() => {
  const W=window;
  // Thiên Quan: retain far goal 310, but restore native HitRun recovery (35/100).
  // Old position-only mode disabled the emergency HP retreat and was unsafe.
  W.KVPV_TQ_POSITION_ONLY=Object.freeze({enabled:false,distance:310,heal:true});
  try{
    W.KVPV_BOSS_LOG?.start?.();
    W.KVPV_TH300?.setBurst?.(false);
    W.KVPV_TH300?.setBasicProbe?.(false);
    W.KVPV_TH300?.setBasicPace?.(0);
    W.KVPV_TH300?.setClientPace?.(1);
    W.KVPV_FAR_SCOPE?.setAllBosses?.(false);
    W.KVPV_TQ115?.stop?.();
    W.KVPV_TH300?.setInterleaved?.(true,310);
    W.KVPV_TH300?.setPrimaryBasic?.(false);
    W.KVPV_TH300?.setBasicRotation?.([8005]);
    W.KVPV_TH300?.setBasicHitQuota?.(null);
    W.KVPV_TH300?.setSkillPriority?.('basic_first');
    W.KVPV_TH300?.setAfterTHWait?.(1);
    // TH and 5 native basics share the Tian Quan-only visual scale configured below.
    W.KVPV_TH300?.setConfirmedTailCut?.(true);
    W.KVPV_TH300?.setBasicOnly?.(true);
    W.KVPV_TH300?.setTianQuanFiveBasics?.(false,1);
    W.KVPV_TH300?.setTianQuanTuyetHoc?.(false);
    W.KVPV_TH300?.setTianQuanTHGapBasics?.(false);
    W.KVPV_TH300?.setTianQuanCosmic?.(false);
    W.KVPV_TH300?.setTianQuanLuoFeng?.(false);
    W.KVPV_TH300?.setTianQuanIdleFill?.(false);
    // Stage 4100 also uses the native TH/basic mixed profile.
    W.KVPV_TH300?.setTianQuan4100BasicSolo?.(false);
    W.KVPV_MODE.armTianQuan();
    // Restore native cooldown for mixed TH/basic: no BASIC FORCE hooks.
    // Wait for verified Tian Quan/selected native Boss; never affect other maps.
    W.KVPV_TQ_BASIC_FORCE?.setEnabled?.(false); // Mixed TH and basics must not retain forced cooldown hooks.
    // Khôi phục tốc độ hoạt ảnh gốc (1) theo yêu cầu; không tăng tốc hoạt ảnh 8001.
    if(String(W.__KVPV_OWN_ACTOR_ID)==='10228867268946')W.KVPV_TH300?.setBasicAnimationSpeed?.(1);
    W.KVPV_TH300?.setTianQuanVisualSpeed?.(9999); // 13 skills, Tian Quan only, client visuals
    console.info('[KVPV V1] Thiên Quan: basic native 8005 only; tam 310.');
  }catch(e){W.KVPV_V1?.diagnostics?.record?.(e);console.warn('[KVPV V1] Auto Thiên Quan:',String(e));}
})();
