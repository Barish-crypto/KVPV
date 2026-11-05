// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: Kiểm thử nguồn thông báo thời hạn tháp và dọn timer khi cập nhật trực tiếp. [đóng chú thích]
/* Kiểm thử nguồn thông báo thời hạn tháp và dọn timer khi cập nhật trực tiếp. */
// [VI dòng gốc 2] "use strict"
'use strict';
// [VI dòng gốc 3] Khai báo biến không gán lại bằng const: fs = gọi require('fs') để nạp module Node.js; vm = gọi require('vm') để nạp module Node.js; assert = gọi require('node:assert/strict') để nạp module Node.js
const fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict');
// [VI dòng gốc 4] Khai báo biến có thể gán lại bằng let: clock = 100000; started = clock; failed = false; next = 0 | Khai báo biến không gán lại bằng const: timers = tạo đối tượng bằng Map(); logs = tạo mảng gồm 0 vị trí: []
let clock=100000,started=clock,failed=false,next=0;const timers=new Map(),logs=[];
// [VI dòng gốc 5] Định nghĩa lớp Clock kế thừa Date. | Kết thúc hàm hiện tại và trả về: clock.
class Clock extends Date{static now(){return clock;}}
// [VI dòng gốc 6] Khai báo biến không gán lại bằng const: W = tạo đối tượng gồm __KVPV_OWN_ACTOR_ID, _Ba, KVPV_LINHLUNG922, KVPV_HITRUN1, KVPV_HITRUN_AUTO, KVPV_DAILY, setTimeout, clearTimeout, addEventListener, removeEventListener
const W={__KVPV_OWN_ACTOR_ID:'123456',_Ba:{_rJ:{_O$:{ins:{actorId:'123456'}}}},
// [VI dòng gốc 7] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm active, phase, pendingFloor, battleStartedAt.
 KVPV_LINHLUNG922:{status(){return {active:true,phase:'fighting',pendingFloor:479,battleStartedAt:started};}},
// [VI dòng gốc 8] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm running, phase.
 KVPV_HITRUN1:{status(){return {running:true,phase:'FIGHT'};}},
// [VI dòng gốc 9] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm enabled.
 KVPV_HITRUN_AUTO:{status(){return {enabled:false};}},
// [VI dòng gốc 10] Kiểm tra failed: đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('real model failure') | Kết thúc hàm hiện tại và trả về: tạo mảng gồm 0 vị trí: [].
 KVPV_DAILY:{lichEvents(){if(failed)throw Error('real model failure');return [];}},
// [VI dòng gốc 11] Khai báo biến không gán lại bằng const: id = tăng next một đơn vị trước khi lấy giá trị | gọi timers.set(id, fn) | Kết thúc hàm hiện tại và trả về: id. | gọi timers.delete(id)
 setTimeout(fn){const id=++next;timers.set(id,fn);return id;},clearTimeout(id){timers.delete(id);},
// [VI dòng gốc 12] Thuộc tính addEventListener: tạo hàm với tham số (không có) | Thuộc tính removeEventListener: tạo hàm với tham số (không có)
 addEventListener(){},removeEventListener(){}};
// [VI dòng gốc 13] Khai báo biến không gán lại bằng const: ctx = gọi vm.createContext({window:W,_Ba:W._Ba,Date:Clock,document:{addEventListener(){},removeEventListener(){}}, console:{warn(...a){logs.push(['…)
const ctx=vm.createContext({window:W,_Ba:W._Ba,Date:Clock,document:{addEventListener(){},removeEventListener(){}},
// [VI dòng gốc 14] gọi logs.push(['warn',...a]) để thêm phần tử vào cuối mảng | gọi logs.push(['info',...a]) để thêm phần tử vào cuối mảng
 console:{warn(...a){logs.push(['warn',...a]);},info(...a){logs.push(['info',...a]);},log(){},table(){}}});
// [VI dòng gốc 15] Khai báo biến không gán lại bằng const: src = gọi fs.readFileSync(__dirname+'/src/18-supervisors.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm, '') | gọi vm.runInContext(src, ctx)
const src=fs.readFileSync(__dirname+'/src/18-supervisors.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,'');vm.runInContext(src,ctx);
// [VI dòng gốc 16] gọi assert.equal(timers.size, 2) để kiểm tra hai giá trị bằng nhau
assert.equal(timers.size,2);
// [VI dòng gốc 17] cập nhật bằng toán tử += clock bằng 26000 | gọi W.KVPV_V11_STABLE.scan() | gọi W.KVPV_V111_COMBAT.scan()
clock+=26000;W.KVPV_V11_STABLE.scan();W.KVPV_V111_COMBAT.scan();
// [VI dòng gốc 18] cập nhật bằng toán tử += clock bằng 5000 | Lặp for: khởi tạo let i=0; tiếp tục khi i<4; sau mỗi vòng i++. | Khai báo biến có thể gán lại bằng let: i = 0 | gọi W.KVPV_V11_STABLE.scan()
clock+=5000;for(let i=0;i<4;i++){W.KVPV_V11_STABLE.scan();W.KVPV_V111_COMBAT.scan();}
// [VI dòng gốc 19] gọi assert.equal(logs.filter(x=>x[0]==='info'&&String(x[2]).startsWith('Linh Lung tầng ')).length, 2) để kiểm tra hai giá trị bằng nhau
assert.equal(logs.filter(x=>x[0]==='info'&&String(x[2]).startsWith('Linh Lung tầng ')).length,2);
// [VI dòng gốc 20] gọi assert.equal(logs.filter(x=>x[0]==='warn'&&/Tower floor|Linh Lung floor/.test(x.join(' '))).length, 0) để kiểm tra hai giá trị bằng nhau
assert.equal(logs.filter(x=>x[0]==='warn'&&/Tower floor|Linh Lung floor/.test(x.join(' '))).length,0);
// [VI dòng gốc 21] gọi assert.equal(W.KVPV_V111_COMBAT.status().tower.late, true) để kiểm tra hai giá trị bằng nhau
assert.equal(W.KVPV_V111_COMBAT.status().tower.late,true);
// [VI dòng gốc 22] gán failed bằng true | cập nhật bằng toán tử += clock bằng 1000 | gọi W.KVPV_V11_STABLE.scan() | gọi assert(logs.some(x=>x[0]==='warn'&&x.join(' ').includes('real model failure'))) để kiểm tra điều kiện của bài test
failed=true;clock+=1000;W.KVPV_V11_STABLE.scan();assert(logs.some(x=>x[0]==='warn'&&x.join(' ').includes('real model failure')));
// [VI dòng gốc 23] gọi vm.runInContext(src, ctx) | gọi assert.equal(timers.size, 2) để kiểm tra hai giá trị bằng nhau
vm.runInContext(src,ctx);assert.equal(timers.size,2); // Hai lịch cũ đã được hủy, không tích lũy sau reload.
// [VI dòng gốc 24] gọi W.KVPV_V11_STABLE.stop() để dừng bộ điều khiển và dọn tài nguyên | gọi W.KVPV_V111_COMBAT.stop() để dừng bộ điều khiển và dọn tài nguyên | gọi assert.equal(timers.size, 0) để kiểm tra hai giá trị bằng nhau
W.KVPV_V11_STABLE.stop();W.KVPV_V111_COMBAT.stop();assert.equal(timers.size,0);
// [VI dòng gốc 25] gọi console.log('PASS supervisors: one info source per deadline milestone, no duplicate deadline warnings, real failures preserved and h…)
console.log('PASS supervisors: one info source per deadline milestone, no duplicate deadline warnings, real failures preserved and hot reload timers cleaned');
// [VI dòng gốc 26] Dòng trống để tách các phần, không có lệnh thực thi.
