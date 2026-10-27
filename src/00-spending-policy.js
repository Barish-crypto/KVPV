// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: General KNB spending stays disabled. The user authorized only native
/* General KNB spending stays disabled. The user authorized only native
 * daily-trial inspiration in maps 2051 and 2061. Paid sweeps remain disabled. */
// [VI dòng gốc 3] chạy ngay hàm bao để tạo phạm vi và khởi tạo phần chức năng bên trong
(() => {
// [VI dòng gốc 4] Khai báo biến không gán lại bằng const: inspireMaps = gọi Object.freeze([2051,2061]) để khóa thay đổi trực tiếp các thuộc tính của đối tượng ở mức ngoài cùng
  const inspireMaps=Object.freeze([2051,2061]);
// [VI dòng gốc 5] gán window.KVPV_SPENDING_POLICY bằng Object.freeze({allowKNB:false, dailyInspireKNBMaps:inspireMaps, canDailyInspireKNB:map=>inspireMaps.includes(Number(map)), reason:'No general KNB spending. User permits native insp…
  window.KVPV_SPENDING_POLICY=Object.freeze({allowKNB:false,
// [VI dòng gốc 6] Thuộc tính dailyInspireKNBMaps: inspireMaps
    dailyInspireKNBMaps:inspireMaps,
// [VI dòng gốc 7] Thuộc tính canDailyInspireKNB: tạo hàm với tham số map; mỗi lần gọi trả về gọi inspireMaps.includes(Number(map)) để kiểm tra dữ liệu có chứa giá trị
    canDailyInspireKNB:map=>inspireMaps.includes(Number(map)),
// [VI dòng gốc 8] Thuộc tính reason: "No general KNB spending. User permits native inspiration only in daily trial maps 2051 and 2061."
    reason:'No general KNB spending. User permits native inspiration only in daily trial maps 2051 and 2061.'});
// [VI dòng gốc 9] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: })();
})();
// [VI dòng gốc 10] Dòng trống để tách các phần, không có lệnh thực thi.
