// [VI dòng gốc 1] "use strict"
'use strict';
// [VI dòng gốc 2] Khai báo biến không gán lại bằng const: fs = gọi require('fs') để nạp module Node.js; vm = gọi require('vm') để nạp module Node.js; assert = gọi require('assert/strict') để nạp module Node.js
const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');
// [VI dòng gốc 3] Khai báo biến có thể gán lại bằng let: now = 10000 | Định nghĩa lớp Clock kế thừa Date. | Kết thúc hàm hiện tại và trả về: now.
let now=10000;class Clock extends Date{static now(){return now;}}
// [VI dòng gốc 4] Khai báo biến không gán lại bằng const: Skill = tạo hàm với tham số (không có); Move = tạo hàm với tham số (không có); mover = tạo đối tượng gồm speed
const Skill=function(){},Move=function(){},mover={speed:10};
// [VI dòng gốc 5] Khai báo biến không gán lại bằng const: selectors = gọi Array.from({length:4}, (_,i)=>({_rtt:[[100+i,0,1000]],_f7t(rows){const r=rows.find(x=>x[1]<now);if(!r)return -1;r[1]=now+r[2];retur…) | Khai báo biến không gán lại bằng const: r = gọi rows.find(x=>x[1]<now) để tìm phần tử đầu tiên thỏa điều kiện | Kiểm tra !r: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: áp dụng toán tử - lên 1.
const selectors=Array.from({length:4},(_,i)=>({_rtt:[[100+i,0,1000]],_f7t(rows){const r=rows.find(x=>x[1]<now);if(!r)return -1;r[1]=now+r[2];return r[0];}}));
// [VI dòng gốc 6] Khai báo biến không gán lại bằng const: native = gọi selectors.map(s=>s._f7t) để biến đổi từng phần tử; props = tạo đối tượng gồm
const native=selectors.map(s=>s._f7t),props={};
// [VI dòng gốc 7] gọi ['petContext','fuwaContext','rideContext','cloakContext'].forEach((key,i)=>props[key]={getComponent:c=>c===Skill?selectors[i]:null})
['petContext','fuwaContext','rideContext','cloakContext'].forEach((key,i)=>props[key]={getComponent:c=>c===Skill?selectors[i]:null});
// [VI dòng gốc 8] Khai báo biến không gán lại bằng const: role = tạo đối tượng gồm property, getComponent
const role={property:{get:key=>props[key]},getComponent:c=>c===Move?mover:c===Skill?null:null};
// [VI dòng gốc 9] Khai báo biến không gán lại bằng const: W = tạo đối tượng gồm __KVPV_OWN_ACTOR_ID, _Ba, _C, _d, setInterval, clearInterval
const W={__KVPV_OWN_ACTOR_ID:'12345',_Ba:{_rJ:{_O$:{ins:{actorId:'12345',isDead:false}}}},
// [VI dòng gốc 10] Thuộc tính _C: tạo đối tượng gồm _Ba | Thuộc tính _Ba: tạo đối tượng gồm instance | Thuộc tính instance: tạo đối tượng gồm getRole | Thuộc tính getRole: tạo hàm với tham số (không có); mỗi lần gọi trả về role
 _C:{_Ba:{instance:{getRole:()=>role}}},_d:{_Yct:{_Eet:Skill,_zet:Move}},
// [VI dòng gốc 11] gán W.timer bằng {fn,ms} | Kết thúc hàm hiện tại và trả về: 1.
 setInterval(fn,ms){W.timer={fn,ms};return 1;},clearInterval(){}};
// [VI dòng gốc 12] gọi vm.runInNewContext(fs.readFileSync('src/10-experimental-boost.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,''), {window:W,Date:…) để chạy mã trong ngữ cảnh máy ảo dùng cho kiểm thử
vm.runInNewContext(fs.readFileSync('src/10-experimental-boost.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,''),{window:W,Date:Clock});
// [VI dòng gốc 13] gọi assert.equal(mover.speed, 990) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(W.timer.ms, 16) để kiểm tra hai giá trị bằng nhau
assert.equal(mover.speed,990);assert.equal(W.timer.ms,16);
// [VI dòng gốc 14] Lặp for: khởi tạo let i=0; tiếp tục khi i<3; sau mỗi vòng i++. | Khai báo biến có thể gán lại bằng let: i = 0
for(let i=0;i<3;i++){
// [VI dòng gốc 15] gọi assert.equal(selectors[i]._f7t, native[i], 'pet/fuwa/ride selector remains native') để kiểm tra hai giá trị bằng nhau
 assert.equal(selectors[i]._f7t,native[i],'pet/fuwa/ride selector remains native');
// [VI dòng gốc 16] gọi assert.equal(selectors[i]._f7t(selectors[i]._rtt), 100+i) để kiểm tra hai giá trị bằng nhau
 assert.equal(selectors[i]._f7t(selectors[i]._rtt),100+i);
// [VI dòng gốc 17] gọi assert.equal(selectors[i]._rtt[0][1], 11000) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(selectors[i]._rtt[0][2], 1000) để kiểm tra hai giá trị bằng nhau
 assert.equal(selectors[i]._rtt[0][1],11000);assert.equal(selectors[i]._rtt[0][2],1000);
// [VI dòng gốc 18] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 19] cập nhật bằng toán tử += now bằng 2 | gọi W.timer.fn() | Lặp for: khởi tạo let i=0; tiếp tục khi i<3; sau mỗi vòng i++. | Khai báo biến có thể gán lại bằng let: i = 0
now+=2;W.timer.fn();for(let i=0;i<3;i++)assert.equal(selectors[i]._f7t(selectors[i]._rtt),-1,'native companion cooldown remains in force');
// [VI dòng gốc 20] gọi assert.notEqual(selectors[3]._f7t, native[3]) | gọi assert.equal(selectors[3]._f7t(selectors[3]._rtt), 103) để kiểm tra hai giá trị bằng nhau
assert.notEqual(selectors[3]._f7t,native[3]);assert.equal(selectors[3]._f7t(selectors[3]._rtt),103);
// [VI dòng gốc 21] gọi assert.equal(selectors[3]._rtt[0][1], 0) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(selectors[3]._rtt[0][2], 1000) để kiểm tra hai giá trị bằng nhau
assert.equal(selectors[3]._rtt[0][1],0);assert.equal(selectors[3]._rtt[0][2],1000);
// [VI dòng gốc 22] cập nhật bằng toán tử += now bằng 110 | gọi assert.equal(selectors[3]._f7t(selectors[3]._rtt), 103, 'unrequested cloak behavior retained') để kiểm tra hai giá trị bằng nhau
now+=110;assert.equal(selectors[3]._f7t(selectors[3]._rtt),103,'unrequested cloak behavior retained');
// [VI dòng gốc 23] gán mover.speed bằng 20 | gọi W.KVPV_EXPERIMENTAL_BOOST.sync() | gọi assert.equal(mover.speed, 1980) để kiểm tra hai giá trị bằng nhau
mover.speed=20;W.KVPV_EXPERIMENTAL_BOOST.sync();assert.equal(mover.speed,1980);
// [VI dòng gốc 24] gọi W.KVPV_EXPERIMENTAL_BOOST.stop() để dừng bộ điều khiển và dọn tài nguyên | gọi assert.equal(mover.speed, 20) để kiểm tra hai giá trị bằng nhau | gọi selectors.forEach((s,i)=>assert.equal(s._f7t,native[i]))
W.KVPV_EXPERIMENTAL_BOOST.stop();assert.equal(mover.speed,20);selectors.forEach((s,i)=>assert.equal(s._f7t,native[i]));
// [VI dòng gốc 25] gọi console.log('PASS boost: pet/fuwa/ride use native skill selection, native cooldowns remain; cloak and movement settings preserved')
console.log('PASS boost: pet/fuwa/ride use native skill selection, native cooldowns remain; cloak and movement settings preserved');
// [VI dòng gốc 26] Dòng trống để tách các phần, không có lệnh thực thi.
