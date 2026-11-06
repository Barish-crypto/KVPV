/* CHÚ THÍCH V1 — Kích hoạt mặc định của FULL.
 * Bật nhật ký Boss và đăng ký chế độ BOSS chờ Thiên Quan; bộ theo dõi map quyết định lúc thực sự bắt đầu.
 * Sửa nguồn tại đây rồi chạy node build.cjs; FULL và bản vá được sinh tự động. */
/* User-requested startup: arm map watcher, leave other maps to native combat. */
(() => {
  const W=window;
  W.KVPV_TQ_SINGLE_STRONGEST_TH=false;
  // Thiên Quan: stand at 310 while preserving native HitRun recovery (35/100).
  // User requested a hard 310 ring in Tian Quan without waiting for HP retreat.
  W.KVPV_TQ_POSITION_ONLY=Object.freeze({enabled:true,distance:310,heal:false});
  try{
    W.KVPV_BOSS_LOG?.start?.();
    // Unified native Boss mode is the only auto-combat entry.
    W.KVPV_FAR_SCOPE?.setAllBosses?.(false);
    W.KVPV_TQ115?.stop?.();
    const th=W.KVPV_TH300;
    th?.setDistance?.(310);
    th?.setBasicOnly?.(false);
    const profile=th?.setTianQuanThreeBasics?.(true,0);
    if(profile?.available===false||profile?.enabled===false)throw Error('Thiên Quan three-basic profile unavailable');
    th?.setScanInterval?.(100);
    th?.setBasicRotation?.([8001,8002,8003]);
    th?.setTianQuanMpackExtras?.(true);
    th?.setTianQuanTuyetHoc?.(true);
    th?.setInterleaved?.(true,310);
    th?.setPrimaryBasic?.(true);
    th?.setSkillPriority?.('interleaved');
    // User requested a temporary burst trial. Apply after interleave setters
    // so the native selector keeps Tuyet Hoc as the burst priority.
    th?.setBurst?.(true);
    th?.setClientPace?.(100);
    th?.setAfterTHWait?.(100);
    // Use the TQ-scoped visual hook at its maximum finite factor. The hook
    // changes client animation duration only; native cooldown/ready gates stay.
    th?.setTianQuanVisualSpeed?.(9999);
    // Enable Ma Thần Nộ (enhanced Tuyet Học) for Tian Quan
    th?.setTianQuanTuyetHoc?.(true);
    W.KVPV_MODE.armTianQuan();
    th?.setTianQuanMpackExtras?.(true);
    th?.setTianQuanTuyetHoc?.(true);
    W.KVPV_TH_FAR?.stop?.('four basic skills only');
    W.KVPV_TQ_BASIC_FORCE?.setEnabled?.(false);
    console?.info?.('[KVPV V1] Tian Quan burst trial: native Tuyet Hoc batches; native readiness/cooldown gates preserved.');
  }catch(e){W.KVPV_V1?.diagnostics?.record?.(e);console?.warn?.('[KVPV V1] Auto Thiên Quan:',String(e));}
})();
