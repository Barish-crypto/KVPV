// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: CHÚ THÍCH V1 — Kiểm tra điều kiện khởi động.
/* CHÚ THÍCH V1 — Kiểm tra điều kiện khởi động.
 * Cung cấp chẩn đoán khi thiếu game-frame, nhân vật hoặc module; không tự sửa trạng thái game.
 * Sửa nguồn tại đây rồi chạy node build.cjs; FULL và bản vá được sinh tự động. */
// [VI dòng gốc 4] Chú thích gốc của tác giả; không được thực thi. Nội dung: Read-only readiness check for this bundle. Does not start combat. [đóng chú thích]
/* Read-only readiness check for this bundle. Does not start combat. */
// [VI dòng gốc 5] chạy ngay hàm bao để tạo phạm vi và khởi tạo phần chức năng bên trong
(() => {
// [VI dòng gốc 6] "use strict"
  'use strict';
// [VI dòng gốc 7] gán window.KVPV_CHECK bằng function KVPV_CHECK(){ const W=window,checks=[]; function check(name,fn){try{checks.push({name,ok:fn()===true});} catch(error){checks.push({name,ok:false,error:String(error?.messag…
  window.KVPV_CHECK=function KVPV_CHECK(){
// [VI dòng gốc 8] Khai báo biến không gán lại bằng const: W = window; checks = tạo mảng gồm 0 vị trí: []
    const W=window,checks=[];
// [VI dòng gốc 9] Định nghĩa hàm check; tham số: name, fn | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | gọi checks.push({name,ok:fn()===true}) để thêm phần tử vào cuối mảng
    function check(name,fn){try{checks.push({name,ok:fn()===true});}
// [VI dòng gốc 10] Nhận lỗi bằng error và chạy phần xử lý lỗi. | gọi checks.push({name,ok:false,error:String(error?.message??error)}) để thêm phần tử vào cuối mảng
      catch(error){checks.push({name,ok:false,error:String(error?.message??error)});}}
// [VI dòng gốc 11] gọi check('session', ()=>!!W.KVPV_V1&&!W.__KVPV_UNIVERSAL_HALTED)
    check('session',()=>!!W.KVPV_V1&&!W.__KVPV_UNIVERSAL_HALTED);
// [VI dòng gốc 12] gọi check('recovery policy', ()=>W.KVPV_BOSS_RECOVERY?.policy?.leavePct===35&&W.KVPV_BOSS_RECOVERY?.policy?.returnPct===100)
    check('recovery policy',()=>W.KVPV_BOSS_RECOVERY?.policy?.leavePct===35&&W.KVPV_BOSS_RECOVERY?.policy?.returnPct===100);
// [VI dòng gốc 13] gọi check('Boss controller', ()=>typeof W.KVPV_HITRUN1?.start==='function'&&typeof W.KVPV_HITRUN1?.status==='function')
    check('Boss controller',()=>typeof W.KVPV_HITRUN1?.start==='function'&&typeof W.KVPV_HITRUN1?.status==='function');
// [VI dòng gốc 14] gọi check('Boss auto controller', ()=>typeof W.KVPV_HITRUN_AUTO?.rearm==='function')
    check('Boss auto controller',()=>typeof W.KVPV_HITRUN_AUTO?.rearm==='function');
// [VI dòng gốc 15] gọi check('mode manager', ()=>typeof W.KVPV_MODE?.start==='function'&&W.KVPV_MODE?.modes?.BOSS==='BOSS')
    check('mode manager',()=>typeof W.KVPV_MODE?.start==='function'&&W.KVPV_MODE?.modes?.BOSS==='BOSS');
// [VI dòng gốc 16] gọi check('fixed HP thresholds', ()=>W.KVPV_HITRUN1?.config?.leavePct===35&&W.KVPV_HITRUN1?.config?.returnPct===100)
    check('fixed HP thresholds',()=>W.KVPV_HITRUN1?.config?.leavePct===35&&W.KVPV_HITRUN1?.config?.returnPct===100);
// [VI dòng gốc 17] gọi check('combat log', ()=>typeof W.KVPV_BOSS_LOG?.start==='function')
    check('combat log',()=>typeof W.KVPV_BOSS_LOG?.start==='function');
// [VI dòng gốc 18] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm ready, build, checks, diagnostics, note.
    return {ready:checks.every(x=>x.ok),build:W.KVPV_V1?.build??null,checks,diagnostics:W.KVPV_V1?.diagnostics?.status?.()??null,
// [VI dòng gốc 19] Thuộc tính note: "Readiness only; game movement, healing and server reach still require an observed fight."
      note:'Readiness only; game movement, healing and server reach still require an observed fight.'};
// [VI dòng gốc 20] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  };
// [VI dòng gốc 21] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: })();
})();
// [VI dòng gốc 22] Dòng trống để tách các phần, không có lệnh thực thi.
