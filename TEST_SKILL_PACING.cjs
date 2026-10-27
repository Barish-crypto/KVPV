// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: Kiểm thử mô phỏng: SKILL_PACING. Các assert bên dưới ghi điều kiện phải giữ; không chứng minh máy chủ game chấp nhận tốc độ hoặc tầm đánh. [đóng chú thích]
/* Kiểm thử mô phỏng: SKILL_PACING. Các assert bên dưới ghi điều kiện phải giữ; không chứng minh máy chủ game chấp nhận tốc độ hoặc tầm đánh. */
// [VI dòng gốc 2] Khai báo biến không gán lại bằng const: fs = gọi require('node:fs') để nạp module Node.js; vm = gọi require('node:vm') để nạp module Node.js; assert = gọi require('node:assert/strict') để nạp module Node.js
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
// [VI dòng gốc 3] Khai báo biến không gán lại bằng const: W = tạo đối tượng gồm | gọi vm.runInNewContext(fs.readFileSync(__dirname+'/src/00-skill-pacing.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,''), {window:W}) để chạy mã trong ngữ cảnh máy ảo dùng cho kiểm thử
const W={};vm.runInNewContext(fs.readFileSync(__dirname+'/src/00-skill-pacing.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,''),{window:W});
// [VI dòng gốc 4] Khai báo biến không gán lại bằng const: p = gọi W.KVPV_SKILL_PACING.create() | gọi p.context('boss1')
const p=W.KVPV_SKILL_PACING.create();p.context('boss1');
// [VI dòng gốc 5] Lặp for: khởi tạo let i=0; tiếp tục khi i<100; sau mỗi vòng i++. | Khai báo biến có thể gán lại bằng let: i = 0 | gọi p.observe(false, false) | gọi assert.equal(p.pace(), 1) để kiểm tra hai giá trị bằng nhau
for(let i=0;i<100;i++)p.observe(false,false);assert.equal(p.pace(),1);assert.equal(p.status().acceptedSamples,0);
// [VI dòng gốc 6] Lặp for: khởi tạo let i=0; tiếp tục khi i<8; sau mỗi vòng i++. | Khai báo biến có thể gán lại bằng let: i = 0 | gọi p.observe(false, true) | gọi assert.equal(p.pace(), 5) để kiểm tra hai giá trị bằng nhau
for(let i=0;i<8;i++)p.observe(false,true);assert.equal(p.pace(),5);
// [VI dòng gốc 7] Lặp for: khởi tạo let i=0; tiếp tục khi i<7; sau mỗi vòng i++. | Khai báo biến có thể gán lại bằng let: i = 0 | gọi p.observe(true, true) | gọi assert.equal(p.pace(), 5) để kiểm tra hai giá trị bằng nhau
for(let i=0;i<7;i++)p.observe(true,true);assert.equal(p.pace(),5);p.observe(true,true);assert.equal(p.pace(),1);
// [VI dòng gốc 8] Lặp for: khởi tạo let i=0; tiếp tục khi i<100; sau mỗi vòng i++. | Khai báo biến có thể gán lại bằng let: i = 0 | gọi p.observe(true, true) | gọi assert.equal(p.pace(), 1) để kiểm tra hai giá trị bằng nhau
for(let i=0;i<100;i++)p.observe(true,true);assert.equal(p.pace(),1);
// [VI dòng gốc 9] Lặp for: khởi tạo let i=0; tiếp tục khi i<200; sau mỗi vòng i++. | Khai báo biến có thể gán lại bằng let: i = 0 | gọi p.observe(false, true) | gọi assert.equal(p.pace(), 500) để kiểm tra hai giá trị bằng nhau
for(let i=0;i<200;i++)p.observe(false,true);assert.equal(p.pace(),500);
// [VI dòng gốc 10] gọi p.context('boss2') | gọi assert.equal(p.pace(), 1) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(p.status().acceptedSamples, 0) để kiểm tra hai giá trị bằng nhau
p.context('boss2');assert.equal(p.pace(),1);assert.equal(p.status().acceptedSamples,0);
// [VI dòng gốc 11] Lặp for: khởi tạo let i=0; tiếp tục khi i<5; sau mỗi vòng i++. | Khai báo biến có thể gán lại bằng let: i = 0 | gọi p.observe(true, true) | Lặp for: khởi tạo let i=0; tiếp tục khi i<3; sau mỗi vòng i++.
for(let i=0;i<5;i++)p.observe(true,true);for(let i=0;i<3;i++)p.observe(false,true);assert.equal(p.pace(),1);
// [VI dòng gốc 12] gọi console.log('PASS skill pacing: minimum batch, qualified-only evidence, bounded speedup/backoff, mixed hold, per-Boss reset')
console.log('PASS skill pacing: minimum batch, qualified-only evidence, bounded speedup/backoff, mixed hold, per-Boss reset');
// [VI dòng gốc 13] Dòng trống để tách các phần, không có lệnh thực thi.
