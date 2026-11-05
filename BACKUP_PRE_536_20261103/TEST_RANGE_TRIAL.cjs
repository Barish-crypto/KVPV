// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: Kiểm thử mô phỏng: RANGE_TRIAL. Các assert bên dưới ghi điều kiện phải giữ; không chứng minh máy chủ game chấp nhận tốc độ hoặc tầm đánh. [đóng chú thích]
/* Kiểm thử mô phỏng: RANGE_TRIAL. Các assert bên dưới ghi điều kiện phải giữ; không chứng minh máy chủ game chấp nhận tốc độ hoặc tầm đánh. */
// [VI dòng gốc 2] "use strict"
'use strict';
// [VI dòng gốc 3] Khai báo biến không gán lại bằng const: fs = gọi require('node:fs') để nạp module Node.js; vm = gọi require('node:vm') để nạp module Node.js; assert = gọi require('node:assert/strict') để nạp module Node.js
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
// [VI dòng gốc 4] Khai báo biến không gán lại bằng const: all = gọi fs.readFileSync(__dirname+'/src/06-range.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm, '')
const all=fs.readFileSync(__dirname+'/src/06-range.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,'');
// [VI dòng gốc 5] Khai báo biến không gán lại bằng const: source = all
const source=all;
// [VI dòng gốc 6] Định nghĩa hàm harness; tham số: range | Khai báo biến không gán lại bằng const: Combat = tạo hàm với tham số (không có) | gán Combat.prototype.isValidRange bằng ()=>false
function harness(range){const Combat=function(){};Combat.prototype.isValidRange=()=>false;
// [VI dòng gốc 7] Khai báo biến không gán lại bằng const: target = tạo đối tượng gồm isValid, property | Kết thúc hàm hiện tại và trả về: đọc {type:1,occ:99,position:{x:0,y:0},name:'Boss'}[k].
 const target={isValid:true,property:{get(k){return {type:1,occ:99,position:{x:0,y:0},name:'Boss'}[k];}}};
// [VI dòng gốc 8] Khai báo biến không gán lại bằng const: W = tạo đối tượng gồm _d, _Ba, _ft, _C
 const W={_d:{_Yct:{_Het:Combat}},_Ba:{_rJ:{_O$:{ins:{actorId:'123456'}}},_Co:{_Mo:{ins:{curLv:1}}}},
// [VI dòng gốc 9] Kết thúc hàm hiện tại và trả về: tạo mảng gồm 1 vị trí: [1]. | Kết thúc hàm hiện tại và trả về: 99. | Kết thúc hàm hiện tại và trả về: tạo mảng gồm 4 vị trí: [0,0,0,range]. | Kết thúc hàm hiện tại và trả về: tạo mảng gồm 8 vị trí: [1,0,0,0,0,0,0,1].
 _ft:{_h$:{ins:{getCfgByLv(){return [1];},occ(){return 99;}}},_tY:{ins:{getCfgById(){return [0,0,0,range];}}},_po:{ins:{getCfgById(){return [1,0,0,0,0,0,0,1];}}}},_C:{_Mn:{_Cn:{currentID:1}}}};
// [VI dòng gốc 10] gọi vm.runInNewContext(source, {window:W,console:{log(){},warn(){},error(){},table(){}}}) để chạy mã trong ngữ cảnh máy ảo dùng cho kiểm thử
 vm.runInNewContext(source,{window:W,console:{log(){},warn(){},error(){},table(){}}});
// [VI dòng gốc 11] Khai báo biến không gán lại bằng const: c = tạo đối tượng bằng Combat() | gán c.owner bằng {id:'123456'} | gán c.target bằng target | gán c._Ha bằng {x:310.4,y:0}
 const c=new Combat();c.owner={id:'123456'};c.target=target;c._Ha={x:310.4,y:0};c.isValidTarget=()=>true;return {W,c};}
// [VI dòng gốc 12] Duyệt từng giá trị trong [240,280] bằng const range. | Khai báo biến không gán lại bằng const: range (chưa gán giá trị) | Khai báo biến không gán lại bằng const: q = gọi harness(range) | gọi assert(q.W.KVPV_RANGE281) để kiểm tra điều kiện của bài test
for(const range of [240,280]){const q=harness(range);assert(q.W.KVPV_RANGE281);q.W.KVPV_RANGE281.setTrialRange(320);q.W.KVPV_RANGE281.enable(true);assert.equal(q.c.isValidRange(),true);q.W.KVPV_RANGE281.enable(false);assert.equal(q.c.isValidRange(),false);}
// [VI dòng gốc 13] gọi console.log('PASS range trial installs without legacy position module and supports Boss cfg 240/280')
console.log('PASS range trial installs without legacy position module and supports Boss cfg 240/280');
// [VI dòng gốc 14] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 15] Chú thích gốc của tác giả; không được thực thi. Nội dung: Mô phỏng chính module giữ vị trí cũ: stop phải hủy watchdog trước khi RANGE nhận quyền.
// Mô phỏng chính module giữ vị trí cũ: stop phải hủy watchdog trước khi RANGE nhận quyền.
// [VI dòng gốc 16] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng {. Đọc cùng dòng mở phía trên: {
{
// [VI dòng gốc 17] Khai báo biến không gán lại bằng const: q = gọi harness(280); P = đọc q.W._d._Yct._Het.prototype | gọi q.W.KVPV_RANGE281.stop() để dừng bộ điều khiển và dọn tài nguyên
 const q=harness(280),P=q.W._d._Yct._Het.prototype;q.W.KVPV_RANGE281.stop();
// [VI dòng gốc 18] Khai báo biến không gán lại bằng const: native = đọc P.isValidRange | Khai báo biến có thể gán lại bằng let: stopped = 0
 const native=P.isValidRange;let stopped=0;
// [VI dòng gốc 19] gán P.isValidRange bằng function(){return native.apply(this,arguments);} | Kết thúc hàm hiện tại và trả về: gọi native.apply(this, arguments).
 P.isValidRange=function(){return native.apply(this,arguments);};
// [VI dòng gốc 20] gán q.W.KVPV_BOSS_POSITION bằng {version:'3.8.0',status(){return {active:true};},enable(){},stop(){stopped++;P.isValidRange=native;delete q.W.KVPV_BOSS_POSITION;}} | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm active. | tăng stopped một đơn vị sau khi lấy giá trị | gán P.isValidRange bằng native
 q.W.KVPV_BOSS_POSITION={version:'3.8.0',status(){return {active:true};},enable(){},stop(){stopped++;P.isValidRange=native;delete q.W.KVPV_BOSS_POSITION;}};
// [VI dòng gốc 21] gọi vm.runInNewContext(source, {window:q.W,console:{log(){},warn(){},error(){},table(){}}}) để chạy mã trong ngữ cảnh máy ảo dùng cho kiểm thử
 vm.runInNewContext(source,{window:q.W,console:{log(){},warn(){},error(){},table(){}}});
// [VI dòng gốc 22] gọi assert.equal(stopped, 1) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.W.KVPV_BOSS_POSITION, undefined) để kiểm tra hai giá trị bằng nhau
 assert.equal(stopped,1);assert.equal(q.W.KVPV_BOSS_POSITION,undefined);
// [VI dòng gốc 23] gọi assert.equal(q.W.KVPV_RANGE281.status(false).legacyPositionRetired, true) để kiểm tra hai giá trị bằng nhau
 assert.equal(q.W.KVPV_RANGE281.status(false).legacyPositionRetired,true);
// [VI dòng gốc 24] gọi q.W.KVPV_RANGE281.stop() để dừng bộ điều khiển và dọn tài nguyên | gọi assert.equal(P.isValidRange, native) để kiểm tra hai giá trị bằng nhau
 q.W.KVPV_RANGE281.stop();assert.equal(P.isValidRange,native);
// [VI dòng gốc 25] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 26] gọi console.log('PASS range handoff retires old position watchdog and restores native range on stop')
console.log('PASS range handoff retires old position watchdog and restores native range on stop');
// [VI dòng gốc 27] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 28] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng {. Đọc cùng dòng mở phía trên: {
{
// [VI dòng gốc 29] Khai báo biến không gán lại bằng const: q = gọi harness(240) | Khai báo biến có thể gán lại bằng let: hp = tạo mảng gồm 2 vị trí: [31,1000] | Khai báo biến không gán lại bằng const: original = đọc q.c.target.property.get
 const q=harness(240);let hp=[31,1000];const original=q.c.target.property.get;
// [VI dòng gốc 30] gán q.c.target.property.get bằng k=>k==='hp'?hp:original(k)
 q.c.target.property.get=k=>k==='hp'?hp:original(k);
// [VI dòng gốc 31] gán q.W.KVPV_FAR_SCOPE bằng {status:()=>({kind:'LINH_LUNG'}),inside:()=>true,eligible:()=>true}
 q.W.KVPV_FAR_SCOPE={status:()=>({kind:'LINH_LUNG'}),inside:()=>true,eligible:()=>true};
// [VI dòng gốc 32] gọi q.W.KVPV_RANGE281.setTrialRange(320) | gọi q.W.KVPV_RANGE281.enable(true)
 q.W.KVPV_RANGE281.setTrialRange(320);q.W.KVPV_RANGE281.enable(true);
// [VI dòng gốc 33] gọi assert.equal(q.c.isValidRange(), true) để kiểm tra hai giá trị bằng nhau | gán hp bằng [30,1000] | gọi assert.equal(q.c.isValidRange(), false) để kiểm tra hai giá trị bằng nhau
 assert.equal(q.c.isValidRange(),true);hp=[30,1000];assert.equal(q.c.isValidRange(),false);
// [VI dòng gốc 34] gán hp bằng [1000,1000] | gọi assert.equal(q.c.isValidRange(), true) để kiểm tra hai giá trị bằng nhau
 hp=[1000,1000];assert.equal(q.c.isValidRange(),true);
// [VI dòng gốc 35] gọi console.log('PASS Linh Lung <=3% disables extended range so native AI must approach')
 console.log('PASS Linh Lung <=3% disables extended range so native AI must approach');
// [VI dòng gốc 36] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 37] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 38] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng {. Đọc cùng dòng mở phía trên: {
{
// [VI dòng gốc 39] Khai báo biến không gán lại bằng const: q = gọi harness(240); original = đọc q.c.target.property.get
 const q=harness(240),original=q.c.target.property.get;
// [VI dòng gốc 40] gán q.c.target.property.get bằng k=>k==='hp'?[1,1000]:original(k)
 q.c.target.property.get=k=>k==='hp'?[1,1000]:original(k);
// [VI dòng gốc 41] gán q.W.KVPV_FAR_SCOPE bằng {status:()=>({kind:'THIEN_QUAN'}),inside:()=>true}
 q.W.KVPV_FAR_SCOPE={status:()=>({kind:'THIEN_QUAN'}),inside:()=>true};
// [VI dòng gốc 42] gọi q.W.KVPV_RANGE281.setTrialRange(320) | gọi q.W.KVPV_RANGE281.enable(true)
 q.W.KVPV_RANGE281.setTrialRange(320);q.W.KVPV_RANGE281.enable(true);
// [VI dòng gốc 43] gọi assert.equal(q.c.isValidRange(), true) để kiểm tra hai giá trị bằng nhau
 assert.equal(q.c.isValidRange(),true);
// [VI dòng gốc 44] gọi console.log('PASS Tian Quan low boss HP keeps ranged extension')
 console.log('PASS Tian Quan low boss HP keeps ranged extension');
// [VI dòng gốc 45] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 46] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 47] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng {. Đọc cùng dòng mở phía trên: {
{
// [VI dòng gốc 48] Khai báo biến không gán lại bằng const: q = gọi harness(240) | gọi q.W.KVPV_RANGE281.setTrialRange(320) | gọi q.W.KVPV_RANGE281.enable(true)
 const q=harness(240);q.W.KVPV_RANGE281.setTrialRange(320);q.W.KVPV_RANGE281.enable(true);
// [VI dòng gốc 49] gán q.c.owner bằng {property:{get:k=>k==='id'?'123456':k==='type'?2:null}} | gọi assert.equal(q.c.isValidRange(), false) để kiểm tra hai giá trị bằng nhau
 q.c.owner={property:{get:k=>k==='id'?'123456':k==='type'?2:null}};assert.equal(q.c.isValidRange(),false);
// [VI dòng gốc 50] gọi console.log('PASS companion sharing owner actor ID does not inherit main-character range extension')
 console.log('PASS companion sharing owner actor ID does not inherit main-character range extension');
// [VI dòng gốc 51] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 52] Dòng trống để tách các phần, không có lệnh thực thi.
