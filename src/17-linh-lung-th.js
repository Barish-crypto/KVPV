// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: Giao diện vượt Linh Lung bằng bộ Tuyệt Học xa dùng chung.
/* Giao diện vượt Linh Lung bằng bộ Tuyệt Học xa dùng chung.
 * Vào tầng/nhận thưởng vẫn thuộc bộ tháp native đã có; không chạy thêm timer combat.
 * FULL tự hỗ trợ khi vào map tháp. start() mới yêu cầu bộ tháp vượt liên tiếp. */
// [VI dòng gốc 4] chạy ngay hàm bao để tạo phạm vi và khởi tạo phần chức năng bên trong
(() => {
// [VI dòng gốc 5] Khai báo biến không gán lại bằng const: W = window | Khai báo biến có thể gán lại bằng let: enabled = tính biểu thức W.KVPV_LINHLUNG_TH?.enabled!==false
  const W=window;let enabled=W.KVPV_LINHLUNG_TH?.enabled!==false;
// [VI dòng gốc 6] gán W.KVPV_LINHLUNG_TH bằng Object.freeze({ get enabled(){return enabled;}, start(options={}){const tower=W.KVPV_LINHLUNG922; if(!tower?.start)throw Error('Thiếu bộ vượt Linh Lung Tháp'); enabled=true;W.KVPV_MODE.armTianQuan() để đăng ký bộ theo dõi map để tự bật bộ combat khi vào phó bản phù hợp | Kết thúc hàm hiện tại và trả về: gọi tower.start(options) để khởi động bộ điều khiển.
  W.KVPV_LINHLUNG_TH=Object.freeze({
// [VI dòng gốc 7] Kết thúc hàm hiện tại và trả về: enabled.
    get enabled(){return enabled;},
// [VI dòng gốc 8] Khai báo biến không gán lại bằng const: tower = đọc W.KVPV_LINHLUNG922
    start(options={}){const tower=W.KVPV_LINHLUNG922;
// [VI dòng gốc 9] Kiểm tra !tower?.start: đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('Thiếu bộ vượt Linh Lung Tháp')
      if(!tower?.start)throw Error('Thiếu bộ vượt Linh Lung Tháp');
// [VI dòng gốc 10] gán enabled bằng true | gọi W.KVPV_MODE.armTianQuan() để đăng ký bộ theo dõi map để tự bật bộ combat khi vào phó bản phù hợp | Kết thúc hàm hiện tại và trả về: gọi tower.start(options) để khởi động bộ điều khiển.
      enabled=true;W.KVPV_MODE.armTianQuan();return tower.start(options);},
// [VI dòng gốc 11] gán enabled bằng false | Khai báo biến không gán lại bằng const: result = gọi W.KVPV_LINHLUNG922?.stop('Dừng vượt Linh Lung Tuyệt Học') để dừng bộ điều khiển và dọn tài nguyên (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gọi W.KVPV_MODE?.syncMap() (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Kết thúc hàm hiện tại và trả về: result.
    stop(){enabled=false;const result=W.KVPV_LINHLUNG922?.stop?.('Dừng vượt Linh Lung Tuyệt Học');W.KVPV_MODE?.syncMap?.();return result;},
// [VI dòng gốc 12] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm enabled, scope, tower, combat, recovery.
    status(){return {enabled,scope:W.KVPV_FAR_SCOPE?.status?.(),tower:W.KVPV_LINHLUNG922?.status?.(false),
// [VI dòng gốc 13] Thuộc tính combat: gọi W.KVPV_TH300?.status(false) để trả trạng thái để kiểm tra (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Thuộc tính recovery: tạo đối tượng gồm enabled, leavePct, returnPct, finishBossHpPct | Thuộc tính enabled: true | Thuộc tính leavePct: 35
      combat:W.KVPV_TH300?.status?.(false),recovery:{enabled:true,leavePct:35,returnPct:100,finishBossHpPct:2}};}
// [VI dòng gốc 14] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  });
// [VI dòng gốc 15] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: })();  
})();
// [VI dòng gốc 16] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 17] Tăng tốc độ hoạt ảnh cho Linh Lung Tháp
(() => {
  const W = window;
  if (W.KVPV_TH300) {
    // Set animation speed to 99 times for Linh Lung Tháp
        W.KVPV_TH300.setBasicAnimationSpeed?.(99);
        // Enable Ma Thần Nộ (enhanced Tuyet Học) for Linh Lung Tháp
        W.KVPV_TH300.setTianQuanTuyetHoc?.(true);
        // Enable basic only mode to bypass native cooldowns
        W.KVPV_TH300.setBasicOnly?.(true);
  }
})();
