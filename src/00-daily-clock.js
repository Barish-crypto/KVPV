// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: Logical activity day begins at 05:00 Asia/Saigon (UTC+7).
/* Logical activity day begins at 05:00 Asia/Saigon (UTC+7).
 * Calendar event schedules keep their actual wall-clock dates. */
// HOT_RELOAD_SMOKE_20261027: comment-only probe; runtime logic unchanged.
// [VI dòng gốc 3] chạy ngay hàm bao để tạo phạm vi và khởi tạo phần chức năng bên trong
(() => {
// [VI dòng gốc 4] "use strict" | Khai báo biến không gán lại bằng const: W = window; DAY = 86400000; OFFSET = tính biểu thức 2*3600000
 'use strict';const W=window,DAY=86400000,OFFSET=2*3600000;
// [VI dòng gốc 5] Khai báo biến không gán lại bằng const: key = tạo hàm với tham số at=Date.now(); mỗi lần gọi trả về gọi new Date(Number(at)+OFFSET).toISOString().slice(0, 10) để lấy một đoạn dữ liệu
 const key=(at=Date.now())=>new Date(Number(at)+OFFSET).toISOString().slice(0,10);
// [VI dòng gốc 6] Khai báo biến không gán lại bằng const: nextResetAt = tạo hàm với tham số at=Date.now(); mỗi lần gọi trả về tính biểu thức (Math.floor((Number(at)+OFFSET)/DAY)+1)*DAY-OFFSET
 const nextResetAt=(at=Date.now())=>(Math.floor((Number(at)+OFFSET)/DAY)+1)*DAY-OFFSET;
// [VI dòng gốc 7] gán W.KVPV_DAILY_CLOCK bằng Object.freeze({key,nextResetAt,status:()=>({timezone:'Asia/Saigon',resetHour:5,day:key(),nextResetAt:new Date(nextResetAt()).toISOString()})})
 W.KVPV_DAILY_CLOCK=Object.freeze({key,nextResetAt,status:()=>({timezone:'Asia/Saigon',resetHour:5,day:key(),nextResetAt:new Date(nextResetAt()).toISOString()})});
// [VI dòng gốc 8] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: })();
})();
// [VI dòng gốc 9] Dòng trống để tách các phần, không có lệnh thực thi.
