// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: CHÚ THÍCH V1 — Chính sách hồi máu Boss.
/* CHÚ THÍCH V1 — Chính sách hồi máu Boss.
 * Rút lui ở 35%; chỉ quay lại khi máu thực đạt tối đa. Vòng hồi máu lấy tầm Boss cộng biên, có giá trị dự phòng khi thiếu cấu hình.
 * Sửa nguồn tại đây rồi chạy node build.cjs; FULL và bản vá được sinh tự động. */
// [VI dòng gốc 4] Chú thích gốc của tác giả; không được thực thi. Nội dung: V1: fixed Thiên Quan recovery thresholds and client-range geometry. [đóng chú thích]
/* V1: fixed Thiên Quan recovery thresholds and client-range geometry. */
// [VI dòng gốc 5] chạy ngay hàm bao để tạo phạm vi và khởi tạo phần chức năng bên trong
(() => {
// [VI dòng gốc 6] "use strict"
  'use strict';
// [VI dòng gốc 7] Khai báo biến không gán lại bằng const: policy = gọi Object.freeze({leavePct:35,returnPct:100,margin:80,minRing:360,fallbackRange:350}) để khóa thay đổi trực tiếp các thuộc tính của đối tượng ở mức ngoài cùng
  const policy = Object.freeze({leavePct:35,returnPct:100,margin:80,minRing:360,fallbackRange:350});
// [VI dòng gốc 8] Chú thích gốc của tác giả; không được thực thi. Nội dung: Tính vòng hồi máu bằng tầm Boss cộng biên; đánh dấu rõ khi đang dùng tầm dự phòng.
  // Tính vòng hồi máu bằng tầm Boss cộng biên; đánh dấu rõ khi đang dùng tầm dự phòng.
// [VI dòng gốc 9] Định nghĩa hàm geometry; tham số: nativeRange
  function geometry(nativeRange) {
// [VI dòng gốc 10] Khai báo biến không gán lại bằng const: value = gọi Number(nativeRange) để chuyển sang số
    const value=Number(nativeRange);
// [VI dòng gốc 11] Khai báo biến không gán lại bằng const: known = Number.isFinite(value) và chỉ đánh giá vế phải khi vế trái truthy: value>0
    const known=Number.isFinite(value)&&value>0;
// [VI dòng gốc 12] Khai báo biến không gán lại bằng const: range = nếu known thì lấy value, ngược lại lấy policy.fallbackRange
    const range=known?value:policy.fallbackRange;
// [VI dòng gốc 13] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm range, known, ring.
    return {range,known,ring:Math.max(policy.minRing,range+policy.margin)};
// [VI dòng gốc 14] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 15] Chú thích gốc của tác giả; không được thực thi. Nội dung: So máu hiện tại với máu tối đa thực; không dùng phần trăm đã làm tròn để cho đánh lại.
  // So máu hiện tại với máu tối đa thực; không dùng phần trăm đã làm tròn để cho đánh lại.
// [VI dòng gốc 16] Định nghĩa hàm fullHP; tham số: hp
  function fullHP(hp) {
// [VI dòng gốc 17] Kết thúc hàm hiện tại và trả về: !!hp&&Number.isFinite(hp.current)&&Number.isFinite(hp.max)&&hp.max>0 và chỉ đánh giá vế phải khi vế trái truthy: hp.current>=hp.max.
    return !!hp&&Number.isFinite(hp.current)&&Number.isFinite(hp.max)&&hp.max>0&&hp.current>=hp.max;
// [VI dòng gốc 18] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 19] gán window.KVPV_BOSS_RECOVERY bằng Object.freeze({version:'1.0.0',policy,geometry,fullHP})
  window.KVPV_BOSS_RECOVERY=Object.freeze({version:'1.0.0',policy,geometry,fullHP});
// [VI dòng gốc 20] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: })();
})();
// [VI dòng gốc 21] Dòng trống để tách các phần, không có lệnh thực thi.
