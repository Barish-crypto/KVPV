// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: Cấu hình mặc định cho Phù Văn Tháp để bật Ma Thần Nộ.
/* Cấu hình mặc định cho Phù Văn Tháp để bật Ma Thần Nộ.
 * Sử dụng cùng hệ thống combat với Linh Lung Tháp và Thiên Quan.
 * Kích hoạt chế độ Tuyệt Học nâng cao khi vào phó bản. */
(() => {
  const W = window;
  
  // Ensure Ma Thần Nộ (enhanced Tuyet Học) is enabled for Phù Văn when using TH300 system
  if (W.KVPV_TH300) {
    // Set animation speed to 99 times for Phù Văn Tháp
    W.KVPV_TH300.setBasicAnimationSpeed?.(99);
    // Enable Ma Thần Nộ (enhanced Tuyet Học) for Phù Văn Tháp
    W.KVPV_TH300.setTianQuanTuyetHoc?.(true);
    // Enable basic only mode to bypass native cooldowns
    W.KVPV_TH300.setBasicOnly?.(true);
  }
  
  // Also configure specific Phù Văn settings if available
  if (W.KVPV_PHUVAN_TH) {
    // Enable Phù Văn Tháp
    W.KVPV_PHUVAN_TH.enabled = true;
  }
  
  // Register for map changes to ensure settings are applied
  if (W.KVPV_MODE) {
    W.KVPV_MODE.armTianQuan(); // Ensure Tian Quan mode is active for tower combat
  }
})();