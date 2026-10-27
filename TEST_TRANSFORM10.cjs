// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: Kiểm thử mô phỏng: TRANSFORM10. Các assert bên dưới ghi điều kiện phải giữ; không chứng minh máy chủ game chấp nhận tốc độ hoặc tầm đánh. [đóng chú thích]
/* Kiểm thử mô phỏng: TRANSFORM10. Các assert bên dưới ghi điều kiện phải giữ; không chứng minh máy chủ game chấp nhận tốc độ hoặc tầm đánh. */
// [VI dòng gốc 2] Khai báo biến không gán lại bằng const: fs = gọi require('node:fs') để nạp module Node.js; vm = gọi require('node:vm') để nạp module Node.js; assert = gọi require('node:assert/strict') để nạp module Node.js
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
// [VI dòng gốc 3] Khai báo biến có thể gán lại bằng let: now = 1000 | Định nghĩa lớp Clock kế thừa Date. | Kết thúc hàm hiện tại và trả về: now.
let now=1000;class Clock extends Date{static now(){return now;}}
// [VI dòng gốc 4] Khai báo biến không gán lại bằng const: names = tạo mảng gồm 5 vị trí: ['Thiên Phú: Huyết Ma Đại Pháp','Huyết Ngục Quỷ Thủ','Huyết Khế Tổ Chú','Huyết Ma Hình Phạt','Other skill']
const names=['Thiên Phú: Huyết Ma Đại Pháp','Huyết Ngục Quỷ Thủ','Huyết Khế Tổ Chú','Huyết Ma Hình Phạt','Other skill'];
// [VI dòng gốc 5] Khai báo biến không gán lại bằng const: rows = gọi names.map((_,i)=>[90001+i,now+60000,5000]) để biến đổi từng phần tử
const rows=names.map((_,i)=>[90001+i,now+60000,5000]);
// [VI dòng gốc 6] Khai báo biến không gán lại bằng const: W = tạo đối tượng gồm __KVPV_OWN_ACTOR_ID, _Ba, _ft
const W={__KVPV_OWN_ACTOR_ID:'12345',_Ba:{_rJ:{_O$:{ins:{actorId:'12345'}}},_s3:{_ZJ:{ins:{curShowId:17,getTransformingSkills:()=>({skills:rows,comSkills:[]})}}}},_ft:{_nY:{ins:{getCfgBySkillIdAndLv:id=>[0,0,names[id-90001]]}}}};
// [VI dòng gốc 7] gọi vm.runInNewContext(fs.readFileSync(__dirname+'/src/13-transform-skills.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,''), {windo…) để chạy mã trong ngữ cảnh máy ảo dùng cho kiểm thử
vm.runInNewContext(fs.readFileSync(__dirname+'/src/13-transform-skills.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,''),{window:W,Date:Clock});
// [VI dòng gốc 8] Khai báo biến không gán lại bằng const: mod = đọc W.KVPV_TRANSFORM10; selector = tạo đối tượng gồm ; snapshot = gọi JSON.stringify(rows) để chuyển giá trị thành chuỗi JSON
const mod=W.KVPV_TRANSFORM10,selector={},snapshot=JSON.stringify(rows);
// [VI dòng gốc 9] Khai báo biến không gán lại bằng const: native = tạo hàm với tham số a, b=[] | Kết thúc hàm hiện tại và trả về: [...a,...b].find(r=>{if(r[1]<now){r[1]=now+r[2];return true;}return false;})?.[0] hoặc dùng vế phải khi vế trái là null/undefined: -1. | Kiểm tra r[1]<now: đúng thì chạy nhánh sau if. | gán r[1] bằng now+r[2]
const native=function(a,b=[]){return [...a,...b].find(r=>{if(r[1]<now){r[1]=now+r[2];return true;}return false;})?.[0]??-1;};
// [VI dòng gốc 10] gọi assert.equal(mod.status().matchedSkills.length, 5) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(mod.has(90005), true) để kiểm tra hai giá trị bằng nhau
assert.equal(mod.status().matchedSkills.length,5);assert.equal(mod.has(90005),true);
// [VI dòng gốc 11] Lặp for: khởi tạo let i=0; tiếp tục khi i<5; sau mỗi vòng i++. | Khai báo biến có thể gán lại bằng let: i = 0 | gọi assert.equal(mod.select(native,selector,rows,[],2), 90001+i) để kiểm tra hai giá trị bằng nhau
for(let i=0;i<5;i++)assert.equal(mod.select(native,selector,rows,[],2),90001+i);
// [VI dòng gốc 12] gọi assert.equal(mod.select(native,selector,rows,[],2), -1) để kiểm tra hai giá trị bằng nhau | cập nhật bằng toán tử += now bằng 11 | gọi assert.equal(mod.select(native,selector,rows,[],2), 90001) để kiểm tra hai giá trị bằng nhau
assert.equal(mod.select(native,selector,rows,[],2),-1);now+=11;assert.equal(mod.select(native,selector,rows,[],2),90001);
// [VI dòng gốc 13] gọi assert.equal(JSON.stringify(rows), snapshot) để kiểm tra hai giá trị bằng nhau
assert.equal(JSON.stringify(rows),snapshot);
// [VI dòng gốc 14] gán W._Ba._s3._ZJ.ins.curShowId bằng 0 | gọi assert.equal(mod.has(90001), false) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(mod.select(native,selector,rows,[],2), -1) để kiểm tra hai giá trị bằng nhau
W._Ba._s3._ZJ.ins.curShowId=0;assert.equal(mod.has(90001),false);assert.equal(mod.select(native,selector,rows,[],2),-1);
// [VI dòng gốc 15] gán W._Ba._s3._ZJ.ins.curShowId bằng 17 | gọi mod.stop() để dừng bộ điều khiển và dọn tài nguyên | gọi assert.equal(mod.select(native,selector,rows,[],2), -1) để kiểm tra hai giá trị bằng nhau
W._Ba._s3._ZJ.ins.curShowId=17;mod.stop();assert.equal(mod.select(native,selector,rows,[],2),-1);
// [VI dòng gốc 16] gọi console.log('PASS transformation10: exact four named native skills, fair rotation, 10ms client wait, untouched original rows, inacti…)
console.log('PASS transformation10: exact four named native skills, fair rotation, 10ms client wait, untouched original rows, inactive/stop passthrough');
// [VI dòng gốc 17] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 18] Chú thích gốc của tác giả; không được thực thi. Nội dung: Minh Hà Long Vương lấy ID từ model native, không gán ID từ biểu tượng trong ảnh.
// Minh Hà Long Vương lấy ID từ model native, không gán ID từ biểu tượng trong ảnh.
// [VI dòng gốc 19] Khai báo biến không gán lại bằng const: dragonNames = tạo mảng gồm 4 vị trí: ['Thiên Phú: Ma Long Quyết','Minh Hà Long Trảm','Huyết Lục Trảm','Ma Long Nghịch Lân']
const dragonNames=['Thiên Phú: Ma Long Quyết','Minh Hà Long Trảm','Huyết Lục Trảm','Ma Long Nghịch Lân'];
// [VI dòng gốc 20] Khai báo biến không gán lại bằng const: dragonRows = gọi dragonNames.map((_,i)=>[90101+i,now+60000,5000]) để biến đổi từng phần tử
const dragonRows=dragonNames.map((_,i)=>[90101+i,now+60000,5000]);
// [VI dòng gốc 21] gán W._Ba._s3._ZJ.ins.getTransformingSkills bằng ()=>({skills:dragonRows.slice(0,3),comSkills:dragonRows.slice(3)})
W._Ba._s3._ZJ.ins.getTransformingSkills=()=>({skills:dragonRows.slice(0,3),comSkills:dragonRows.slice(3)});
// [VI dòng gốc 22] gán W._ft._nY.ins.getCfgBySkillIdAndLv bằng id=>[0,0,dragonNames[id-90101]??'Unrelated']
W._ft._nY.ins.getCfgBySkillIdAndLv=id=>[0,0,dragonNames[id-90101]??'Unrelated'];
// [VI dòng gốc 23] gán W._Ba._s3._ZJ.ins.curShowId bằng 22 | gọi mod.start() để khởi động bộ điều khiển
W._Ba._s3._ZJ.ins.curShowId=22;mod.start();
// [VI dòng gốc 24] gọi assert.equal(mod.skills().length, 4) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(mod.has(90001), false, 'previous form excluded') để kiểm tra hai giá trị bằng nhau
assert.equal(mod.skills().length,4);assert.equal(mod.has(90001),false,'previous form excluded');
// [VI dòng gốc 25] Khai báo biến không gán lại bằng const: dragonSnapshot = gọi JSON.stringify(dragonRows) để chuyển giá trị thành chuỗi JSON
const dragonSnapshot=JSON.stringify(dragonRows);
// [VI dòng gốc 26] Lặp for: khởi tạo let i=0; tiếp tục khi i<4; sau mỗi vòng i++. | Khai báo biến có thể gán lại bằng let: i = 0 | gọi assert.equal(mod.select(native,selector,dragonRows.slice(0,3),dragonRows.slice(3),2), i<3?90101+i:90104) để kiểm tra hai giá trị bằng nhau
for(let i=0;i<4;i++)assert.equal(mod.select(native,selector,dragonRows.slice(0,3),dragonRows.slice(3),2),i<3?90101+i:90104);
// [VI dòng gốc 27] gọi assert.equal(mod.select(native,selector,dragonRows,[],2), -1) để kiểm tra hai giá trị bằng nhau | cập nhật bằng toán tử += now bằng 11
assert.equal(mod.select(native,selector,dragonRows,[],2),-1);now+=11;
// [VI dòng gốc 28] gọi assert.equal(mod.select(native,selector,dragonRows,[],2), 90101) để kiểm tra hai giá trị bằng nhau
assert.equal(mod.select(native,selector,dragonRows,[],2),90101);
// [VI dòng gốc 29] gọi assert.equal(JSON.stringify(dragonRows), dragonSnapshot, 'native cooldown rows preserved') để kiểm tra hai giá trị bằng nhau
assert.equal(JSON.stringify(dragonRows),dragonSnapshot,'native cooldown rows preserved');
// [VI dòng gốc 30] gán W._Ba._s3._ZJ.ins.getTransformingSkills bằng ()=>({skills:dragonRows.slice(1),comSkills:[]})
W._Ba._s3._ZJ.ins.getTransformingSkills=()=>({skills:dragonRows.slice(1),comSkills:[]});
// [VI dòng gốc 31] gọi assert.equal(mod.has(90101), false, 'talent absent from castable native kit is not invented') để kiểm tra hai giá trị bằng nhau
assert.equal(mod.has(90101),false,'talent absent from castable native kit is not invented');
// [VI dòng gốc 32] gọi assert.equal(mod.skills().length, 3) để kiểm tra hai giá trị bằng nhau
assert.equal(mod.skills().length,3);
// [VI dòng gốc 33] gọi console.log('PASS Minh Ha Long Vuong: all four names, native active/common skills, 10ms rotation, no invented talent or old-form IDs…)
console.log('PASS Minh Ha Long Vuong: all four names, native active/common skills, 10ms rotation, no invented talent or old-form IDs');
// [VI dòng gốc 34] Dòng trống để tách các phần, không có lệnh thực thi.
