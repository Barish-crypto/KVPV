// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: Ba Boss cùng map: chuyển trực tiếp theo cấu hình tầng, không cần nạp lại FULL. [đóng chú thích]
/* Ba Boss cùng map: chuyển trực tiếp theo cấu hình tầng, không cần nạp lại FULL. */
// [VI dòng gốc 2] "use strict"
'use strict';
// [VI dòng gốc 3] Khai báo biến không gán lại bằng const: fs = gọi require('fs') để nạp module Node.js; vm = gọi require('vm') để nạp module Node.js; assert = gọi require('node:assert/strict') để nạp module Node.js
const fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict');
// [VI dòng gốc 4] Khai báo biến không gán lại bằng const: actor = "7777777777777" | Khai báo biến có thể gán lại bằng let: id = "a"; occ = 220001; level = 1; inside = true; valid = true; hr = false; hrId = ""; auto = false; far = false; starts = 0; rearms = 0; failed = false; clock = 100000
const actor='7777777777777';let id='a',occ=220001,level=1,inside=true,valid=true,hr=false,hrId='',auto=false,far=false,
// [VI dòng gốc 5] Khai báo biến không gán lại bằng const: order = tạo mảng gồm 0 vị trí: []
  starts=0,rearms=0,failed=false,clock=100000;const order=[];
// [VI dòng gốc 6] Định nghĩa lớp Clock kế thừa Date. | Kết thúc hàm hiện tại và trả về: clock.
class Clock extends Date{static now(){return clock;}}
// [VI dòng gốc 7] Khai báo biến không gán lại bằng const: target = tạo đối tượng gồm isValid, property | Kết thúc hàm hiện tại và trả về: valid. | Kết thúc hàm hiện tại và trả về: đọc {id,occ,type:1,hp:[100,100]}[k].
const target={get isValid(){return valid;},property:{get(k){return {id,occ,type:1,hp:[100,100]}[k];}}};
// [VI dòng gốc 8] Khai báo biến không gán lại bằng const: combat = tạo đối tượng gồm target; me = tạo đối tượng gồm property, getComponent | Kết thúc hàm hiện tại và trả về: nếu k==='hp' thì lấy [100,100], ngược lại lấy null. | Kết thúc hàm hiện tại và trả về: combat.
const combat={target},me={property:{get(k){return k==='hp'?[100,100]:null;}},getComponent(){return combat;}};
// [VI dòng gốc 9] Khai báo biến không gán lại bằng const: W = tạo đối tượng gồm __KVPV_OWN_ACTOR_ID, _Ba, _d, _C, KVPV_FAR_SCOPE, KVPV_TQ_SCOPE, KVPV, KVPV_RANGE281, KVPV_TH300, KVPV_HITRUN1, KVPV_HITRUN_AUTO, setInterval, clearInterval | Kết thúc hàm hiện tại và trả về: level.
const W={__KVPV_OWN_ACTOR_ID:actor,_Ba:{_rJ:{_O$:{ins:{actorId:actor,isDead:false}}},_Co:{_Mo:{ins:{get curLv(){return level;}}}}},
// [VI dòng gốc 10] Kết thúc hàm hiện tại và trả về: me.
 _d:{_Yct:{_Het:function(){}}},_C:{_Ba:{instance:{getRole(){return me;}}}},
// [VI dòng gốc 11] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm inside, kind, current. | Kết thúc hàm hiện tại và trả về: inside. | Kết thúc hàm hiện tại và trả về: t===target và chỉ đánh giá vế phải khi vế trái truthy: valid.
 KVPV_FAR_SCOPE:{status(){return {inside,kind:inside?'THIEN_QUAN':'OUTSIDE',current:inside?2992:1002};},inside(){return inside;},eligible(t){return t===target&&valid;}},
// [VI dòng gốc 12] Kết thúc hàm hiện tại và trả về: inside. | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm inside.
 KVPV_TQ_SCOPE:{inside(){return inside;},status(){return {inside};}},
// [VI dòng gốc 13] Thuộc tính KVPV: tạo đối tượng gồm combat | Thuộc tính combat: tạo đối tượng gồm config | Thuộc tính config: tạo đối tượng gồm
 KVPV:{combat:{config:{}}},
// [VI dòng gốc 14] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm enabled, hookAttached.
 KVPV_RANGE281:{enable(){},setTrialRange(){},status(){return {enabled:true,hookAttached:true};}},
// [VI dòng gốc 15] gán far bằng true | gọi order.push('far-start') để thêm phần tử vào cuối mảng | gọi assert.equal(hr, false, 'old HitRun must release before far hook') để kiểm tra hai giá trị bằng nhau | gán far bằng false
 KVPV_TH300:{start(){far=true;order.push('far-start');},stop(){assert.equal(hr,false,'old HitRun must release before far hook');far=false;order.push('far-stop');},
// [VI dòng gốc 16] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm running, requestedDistance, confirmedSkills.
  sync(){},status(){return {running:far,requestedDistance:302,confirmedSkills:[]};}},
// [VI dòng gốc 17] tăng starts một đơn vị sau khi lấy giá trị | Kiểm tra failed: đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('native component unavailable') | gán hr bằng true
 KVPV_HITRUN1:{start(){starts++;if(failed)throw Error('native component unavailable');hr=true;hrId=id;order.push('hr-start-'+id);},
// [VI dòng gốc 18] gán hr bằng false | gọi order.push('hr-stop') để thêm phần tử vào cuối mảng | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm running, bossId, phase.
  stop(){hr=false;order.push('hr-stop');},status(){return {running:hr,bossId:hrId,phase:hr?'FIGHT':'OFF'};}},
// [VI dòng gốc 19] Chú thích gốc của tác giả; không được thực thi. Nội dung: Mô phỏng bộ auto cũ không nhận ra tên/isBoss của quái tầng: chỉ bật polling, không tự start.
 // Mô phỏng bộ auto cũ không nhận ra tên/isBoss của quái tầng: chỉ bật polling, không tự start.
// [VI dòng gốc 20] gán auto bằng true | tăng rearms một đơn vị sau khi lấy giá trị | Kiểm tra hr: đúng thì chạy nhánh sau if. | gọi W.KVPV_HITRUN1.stop() để dừng bộ điều khiển và dọn tài nguyên
 KVPV_HITRUN_AUTO:{rearm(){auto=true;rearms++;},stop(){if(hr)W.KVPV_HITRUN1.stop();auto=false;},status(){return {enabled:auto,timerActive:auto,lastMode:'waiting-for-boss'};}},
// [VI dòng gốc 21] Kết thúc hàm hiện tại và trả về: 1.
 setInterval(){return 1;},clearInterval(){}};
// [VI dòng gốc 22] Khai báo biến không gán lại bằng const: ctx = tạo đối tượng gồm window, Date, console
const ctx={window:W,Date:Clock,console:{warn(){},info(){},table(){}}};
// [VI dòng gốc 23] gọi vm.runInNewContext(fs.readFileSync(__dirname+'/src/09-modes.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,''), ctx) để chạy mã trong ngữ cảnh máy ảo dùng cho kiểm thử
vm.runInNewContext(fs.readFileSync(__dirname+'/src/09-modes.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,''),ctx);
// [VI dòng gốc 24] gọi W.KVPV_MODE.armTianQuan() để đăng ký bộ theo dõi map để tự bật bộ combat khi vào phó bản phù hợp | gọi assert.equal(starts, 1) để kiểm tra hai giá trị bằng nhau | gọi assert(hr) để kiểm tra điều kiện của bài test | gọi assert.equal(hrId, 'a') để kiểm tra hai giá trị bằng nhau
W.KVPV_MODE.armTianQuan();assert.equal(starts,1);assert(hr);assert.equal(hrId,'a');
// [VI dòng gốc 25] Lặp for: khởi tạo let i=0; tiếp tục khi i<5; sau mỗi vòng i++. | Khai báo biến có thể gán lại bằng let: i = 0 | cập nhật bằng toán tử += clock bằng 100 | gọi W.KVPV_MODE.syncMap()
for(let i=0;i<5;i++){clock+=100;W.KVPV_MODE.syncMap();}assert.equal(starts,1);
// [VI dòng gốc 26] gọi W.KVPV_HITRUN1.stop() để dừng bộ điều khiển và dọn tài nguyên | gán valid bằng false | gọi W.KVPV_MODE.syncMap() | gọi assert.equal(starts, 1) để kiểm tra hai giá trị bằng nhau
W.KVPV_HITRUN1.stop();valid=false;W.KVPV_MODE.syncMap();assert.equal(starts,1);
// [VI dòng gốc 27] gán id bằng 'b' | gán occ bằng 220002 | gán level bằng 2 | gán valid bằng true
id='b';occ=220002;level=2;valid=true;W.KVPV_MODE.syncMap();assert.equal(starts,2);assert.equal(hrId,'b');
// [VI dòng gốc 28] Chú thích gốc của tác giả; không được thực thi. Nội dung: Object/ID có thể được game dùng lại: loại Boss và tầng đổi vẫn phải bàn giao.
// Object/ID có thể được game dùng lại: loại Boss và tầng đổi vẫn phải bàn giao.
// [VI dòng gốc 29] gán occ bằng 220003 | gán level bằng 3 | gọi W.KVPV_MODE.syncMap() | gọi assert.equal(starts, 3) để kiểm tra hai giá trị bằng nhau
occ=220003;level=3;W.KVPV_MODE.syncMap();assert.equal(starts,3);assert.equal(hrId,'b');
// [VI dòng gốc 30] gọi assert.equal(W.KVPV_MODE.history().filter(x=>x.event==='TQ-BOSS-HANDOFF').length, 3) để kiểm tra hai giá trị bằng nhau
assert.equal(W.KVPV_MODE.history().filter(x=>x.event==='TQ-BOSS-HANDOFF').length,3);
// [VI dòng gốc 31] Khai báo biến không gán lại bằng const: stableRearms = rearms | gọi W.KVPV_MODE.syncMap() | gọi assert.equal(rearms, stableRearms) để kiểm tra hai giá trị bằng nhau
const stableRearms=rearms;W.KVPV_MODE.syncMap();assert.equal(rearms,stableRearms);
// [VI dòng gốc 32] Chú thích gốc của tác giả; không được thực thi. Nội dung: Dừng vì lỗi cùng Boss không gây vòng retry 75 ms.
// Dừng vì lỗi cùng Boss không gây vòng retry 75 ms.
// [VI dòng gốc 33] gọi W.KVPV_HITRUN1.stop() để dừng bộ điều khiển và dọn tài nguyên | gọi W.KVPV_MODE.syncMap() | gọi assert.equal(starts, 3) để kiểm tra hai giá trị bằng nhau
W.KVPV_HITRUN1.stop();W.KVPV_MODE.syncMap();assert.equal(starts,3);
// [VI dòng gốc 34] gán id bằng 'c' | gán occ bằng 220004 | gán level bằng 4 | gán failed bằng true
id='c';occ=220004;level=4;failed=true;W.KVPV_MODE.syncMap();assert.equal(starts,4);
// [VI dòng gốc 35] Lặp for: khởi tạo let i=0; tiếp tục khi i<10; sau mỗi vòng i++. | Khai báo biến có thể gán lại bằng let: i = 0 | cập nhật bằng toán tử += clock bằng 100 | gọi W.KVPV_MODE.syncMap()
for(let i=0;i<10;i++){clock+=100;W.KVPV_MODE.syncMap();}assert.equal(starts,4);
// [VI dòng gốc 36] gán failed bằng false | gọi W.KVPV_MODE.stop() để dừng bộ điều khiển và dọn tài nguyên | Khai báo biến không gán lại bằng const: before = starts | gọi W.KVPV_MODE.syncMap()
failed=false;W.KVPV_MODE.stop();const before=starts;W.KVPV_MODE.syncMap();assert.equal(starts,before);
// [VI dòng gốc 37] gọi W.KVPV_MODE.armTianQuan() để đăng ký bộ theo dõi map để tự bật bộ combat khi vào phó bản phù hợp | gọi assert.equal(starts, before+1) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(hrId, 'c') để kiểm tra hai giá trị bằng nhau
W.KVPV_MODE.armTianQuan();assert.equal(starts,before+1);assert.equal(hrId,'c');
// [VI dòng gốc 38] gán inside bằng false | gọi W.KVPV_MODE.syncMap() | gọi assert.equal(hr, false) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(far, false) để kiểm tra hai giá trị bằng nhau
inside=false;W.KVPV_MODE.syncMap();assert.equal(hr,false);assert.equal(far,false);
// [VI dòng gốc 39] gọi console.log('PASS Tian Quan handoff: three Boss stages without reload, unnamed Boss fallback, reused target object/ID, ordered hook …)
console.log('PASS Tian Quan handoff: three Boss stages without reload, unnamed Boss fallback, reused target object/ID, ordered hook release, no same-Boss retry loop and manual stop');
// [VI dòng gốc 40] Dòng trống để tách các phần, không có lệnh thực thi.
