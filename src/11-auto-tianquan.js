// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: CHÚ THÍCH V1 — Kích hoạt mặc định của FULL.
/* CHÚ THÍCH V1 — Kích hoạt mặc định của FULL.
 * Bật nhật ký Boss và đăng ký chế độ SCAN chờ Thiên Quan; bộ theo dõi map quyết định lúc thực sự bắt đầu.
 * Sửa nguồn tại đây rồi chạy node build.cjs; FULL và bản vá được sinh tự động. */
// [VI dòng gốc 4] Chú thích gốc của tác giả; không được thực thi. Nội dung: User-requested startup: arm map watcher, leave other maps to native combat. [đóng chú thích]
/* User-requested startup: arm map watcher, leave other maps to native combat. */
// [VI dòng gốc 5] chạy ngay hàm bao để tạo phạm vi và khởi tạo phần chức năng bên trong
(() => {
// [VI dòng gốc 6] Khai báo biến không gán lại bằng const: W = window
  const W=window;
  // Thiên Quan only: hold 310 from Boss and skip HP-based retreat.
  W.KVPV_TQ_POSITION_ONLY=Object.freeze({enabled:true,distance:310,heal:false});
// [VI dòng gốc 7] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài.
  try{
// [VI dòng gốc 8] gọi W.KVPV_BOSS_LOG?.start() để khởi động bộ điều khiển (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    W.KVPV_BOSS_LOG?.start?.();
// [VI dòng gốc 9] gọi W.KVPV_TH300?.setBurst(false) để bật/tắt chế độ thử tung nhóm chiêu; false là tắt (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    W.KVPV_TH300?.setBurst?.(false);
// [VI dòng gốc 10] gọi W.KVPV_TH300?.setBasicProbe(false) để bật/tắt phép thử đòn thường có giới hạn (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    W.KVPV_TH300?.setBasicProbe?.(false);
// [VI dòng gốc 11] gọi W.KVPV_TH300?.setBasicPace(0) để đặt khoảng chờ thêm phía client cho đòn tay; 0 nghĩa là không thêm thời gian chờ (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    W.KVPV_TH300?.setBasicPace?.(0);
// [VI dòng gốc 12] gọi W.KVPV_TH300?.setClientPace(0) để đặt khoảng chờ thêm chung giữa các lần thử tung chiêu phía client (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    W.KVPV_TH300?.setClientPace?.(1);
    W.KVPV_FAR_SCOPE?.setAllBosses?.(false);
    W.KVPV_TQ115?.stop?.();
// [VI dòng gốc 13] gọi W.KVPV_TH300?.setInterleaved(true, 302) để bật/tắt bộ chọn xen đòn thường và đặt khoảng cách mục tiêu (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    W.KVPV_TH300?.setInterleaved?.(true,310);
// [VI dòng gốc 14] gọi W.KVPV_TH300?.setPrimaryBasic(true) để bật/tắt ưu tiên kỹ năng đánh thường đã chọn (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    W.KVPV_TH300?.setPrimaryBasic?.(false);
// [VI dòng gốc 15] gọi W.KVPV_TH300?.setBasicRotation([8001]) để chọn danh sách ID đòn thường được phép luân phiên (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    W.KVPV_TH300?.setBasicRotation?.([8001]);
// [VI dòng gốc 16] gọi W.KVPV_TH300?.setBasicHitQuota(1) để đặt số đòn thường đã xác nhận trước khi cho Tuyệt Học; chế độ basicOnly vẫn chặn Tuyệt Học (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    W.KVPV_TH300?.setBasicHitQuota?.(null);
    W.KVPV_TH300?.setSkillPriority?.('tuyet_hoc_first');
// [VI dòng gốc 17] gọi W.KVPV_TH300?.setAfterTHWait(1) để đặt thời gian chờ thêm sau Tuyệt Học theo mili giây (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    W.KVPV_TH300?.setAfterTHWait?.(1);
// [VI dòng gốc 18] gọi W.KVPV_TH300?.setConfirmedTailCut(true) để bật/tắt cắt phần đuôi hoạt ảnh chỉ sau khi đã ghép được đòn trúng (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    // TH and 5 native basics share the Tian Quan-only visual scale configured below.
    W.KVPV_TH300?.setConfirmedTailCut?.(true);
// [VI dòng gốc 19] gọi W.KVPV_TH300?.setBasicOnly(true) để bật/tắt chế độ nhân vật chỉ dùng đòn tay 8001 trong Thiên Quan, Linh Lung, Phù Văn và Tru Tiên (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    W.KVPV_TH300?.setBasicOnly?.(false);
    W.KVPV_TH300?.setTianQuanFiveBasics?.(true,1);
    W.KVPV_TH300?.setTianQuanTuyetHoc?.(false);
    W.KVPV_TH300?.setTianQuanTHGapBasics?.(false);
    W.KVPV_TH300?.setTianQuanCosmic?.(true);
    W.KVPV_TH300?.setTianQuanLuoFeng?.(true);
    W.KVPV_TH300?.setTianQuanIdleFill?.(false);
    // Thiên Quan dùng năm đòn tay native tại mọi tầng, không xen Tuyệt Học.
    W.KVPV_TH300?.setTianQuan4100BasicSolo?.(true);
// [VI dòng gốc 20] gọi W.KVPV_MODE.armTianQuan() để đăng ký bộ theo dõi map để tự bật bộ combat khi vào phó bản phù hợp
    W.KVPV_MODE.armTianQuan();
    // User opt-in: auto-arm persistent BASIC FORCE after the map watcher is ready.
    // Wait for verified Tian Quan/selected native Boss; never affect other maps.
    W.KVPV_TQ_BASIC_FORCE?.setEnabled?.(true);
// [VI dòng gốc 21] Chú thích gốc của tác giả; không được thực thi. Nội dung: Khôi phục tốc độ hoạt ảnh gốc (1) theo yêu cầu; không tăng tốc hoạt ảnh 8001.
    // Khôi phục tốc độ hoạt ảnh gốc (1) theo yêu cầu; không tăng tốc hoạt ảnh 8001.
// [VI dòng gốc 22] Kiểm tra String(W.__KVPV_OWN_ACTOR_ID)==='10228867268946': đúng thì chạy nhánh sau if. | gọi W.KVPV_TH300?.setBasicAnimationSpeed(1) để đặt hệ số phát hoạt ảnh 8001 phía client; không phải hệ số sát thương server (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    if(String(W.__KVPV_OWN_ACTOR_ID)==='10228867268946')W.KVPV_TH300?.setBasicAnimationSpeed?.(1);
    W.KVPV_TH300?.setTianQuanVisualSpeed?.(9999); // 13 skills, Tian Quan only, client visuals
// [VI dòng gốc 23] gọi console.info('[KVPV V1] Ba phó bản chỉ dùng 8001; kiểm tra 1 ms, chờ thêm 0 ms; tốc độ server chưa xác minh.')
    console.info('[KVPV V1] Thiên Quan: auto BASIC FORCE 8001–8005 mọi tầng; tầm 310, client pace 1ms.');
// [VI dòng gốc 24] Nhận lỗi bằng e và chạy phần xử lý lỗi. | gọi W.KVPV_V1?.diagnostics?.record(e) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gọi console.warn('[KVPV V1] Auto Thiên Quan:', String(e))
  }catch(e){W.KVPV_V1?.diagnostics?.record?.(e);console.warn('[KVPV V1] Auto Thiên Quan:',String(e));}
// [VI dòng gốc 25] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: })();
})();
// [VI dòng gốc 26] Dòng trống để tách các phần, không có lệnh thực thi.
