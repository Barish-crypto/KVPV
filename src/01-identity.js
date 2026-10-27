// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: CHÚ THÍCH V1 — Khóa nhân vật của phiên.
/* CHÚ THÍCH V1 — Khóa nhân vật của phiên.
 * Ghi nhận nhân vật sở hữu khi cài đặt; module phía sau dùng khóa này để tránh điều khiển nhầm sau khi đổi nhân vật.
 * Sửa nguồn tại đây rồi chạy node build.cjs; FULL và bản vá được sinh tự động. */
// [VI dòng gốc 4] chạy ngay hàm bao để tạo phạm vi và khởi tạo phần chức năng bên trong
(() => {
// [VI dòng gốc 5] "use strict"
  'use strict';
// [VI dòng gốc 6] Khai báo biến không gán lại bằng const: id = nếu typeof _Ba==='undefined' thì lấy '', ngược lại lấy String(_Ba?._rJ?._O$?.ins?.actorId??'')
  const id=(typeof _Ba==='undefined')?'':String(_Ba?._rJ?._O$?.ins?.actorId??'');
// [VI dòng gốc 7] Kiểm tra !/^[1-9]\d{4,24}$/.test(id) || typeof _ft==='undefined' || typeof _Sa==='undefined': đúng thì chạy nhánh sau if.
  if(!/^[1-9]\d{4,24}$/.test(id) || typeof _ft==='undefined' || typeof _Sa==='undefined'){
// [VI dòng gốc 8] gọi console.error('[UNIVERSAL35] Chưa vào nhân vật hoặc chọn sai context. Chọn game-frame, đợi tải game rồi chạy lại Snippet.')
    console.error('[UNIVERSAL35] Chưa vào nhân vật hoặc chọn sai context. Chọn game-frame, đợi tải game rồi chạy lại Snippet.');
// [VI dòng gốc 9] Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    return;
// [VI dòng gốc 10] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 11] Khai báo biến không gán lại bằng const: key = "__KVPV_OWN_ACTOR_ID"
  const key='__KVPV_OWN_ACTOR_ID';
// [VI dòng gốc 12] Khai báo biến không gán lại bằng const: existing = gọi Object.getOwnPropertyDescriptor(window, key)
  const existing=Object.getOwnPropertyDescriptor(window,key);
// [VI dòng gốc 13] Kiểm tra existing && existing.value!==id: đúng thì chạy nhánh sau if.
  if(existing && existing.value!==id){
// [VI dòng gốc 14] gọi console.error('[UNIVERSAL35] Không đổi nhân vật trong phiên. F5 game rồi chạy lại Snippet.')
    console.error('[UNIVERSAL35] Không đổi nhân vật trong phiên. F5 game rồi chạy lại Snippet.');
// [VI dòng gốc 15] Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    return;
// [VI dòng gốc 16] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 17] Kiểm tra !existing: đúng thì chạy nhánh sau if. | gọi Object.defineProperty(window, key, {value:id,enumerable:false,writable:false,configurable:false})
  if(!existing)Object.defineProperty(window,key,{value:id,enumerable:false,writable:false,configurable:false});
// [VI dòng gốc 18] gọi console.info('[UNIVERSAL35] Nhận diện nhân vật hiện tại; không dùng ID cố định.', id)
  console.info('[UNIVERSAL35] Nhận diện nhân vật hiện tại; không dùng ID cố định.',id);
// [VI dòng gốc 19] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: })();
})();
// [VI dòng gốc 20] Dòng trống để tách các phần, không có lệnh thực thi.
