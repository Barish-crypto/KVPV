// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: Kiểm tra nhận diện tháp, chuyển quyền combat và chuyển tầng; chưa phải thử trong game thật. [đóng chú thích]
/* Kiểm tra nhận diện tháp, chuyển quyền combat và chuyển tầng; chưa phải thử trong game thật. */
// [VI dòng gốc 2] "use strict"
'use strict';
// [VI dòng gốc 3] Khai báo biến không gán lại bằng const: fs = gọi require('node:fs') để nạp module Node.js; vm = gọi require('node:vm') để nạp module Node.js; assert = gọi require('node:assert/strict') để nạp module Node.js
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
// [VI dòng gốc 4] Khai báo biến không gán lại bằng const: actor = "123456789" | Khai báo biến có thể gán lại bằng let: current = 1002; floor = 11; highest = 10; inMission = false; common = true; dead = false; targetId = "a"; type = 1; occ = 77; alive = true; clock = 100000; hr = false; hrBoss = ""; auto = false; starts = 0; stops = 0; rearms = 0; far = false; towerRunning = false; failStart = false
const actor='123456789';let current=1002,floor=11,highest=10,inMission=false,common=true,
// [VI dòng gốc 5] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng name. Đọc cùng dòng mở phía trên: dead=false,targetId='a',type=1,occ=77,alive=true,clock=100000,hr=false,hrBoss='',auto=false,
  dead=false,targetId='a',type=1,occ=77,alive=true,clock=100000,hr=false,hrBoss='',auto=false,
// [VI dòng gốc 6] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng name. Đọc cùng dòng mở phía trên: starts=0,stops=0,rearms=0,far=false,towerRunning=false,failStart=false;
  starts=0,stops=0,rearms=0,far=false,towerRunning=false,failStart=false;
// [VI dòng gốc 7] Định nghĩa lớp Clock kế thừa Date. | Kết thúc hàm hiện tại và trả về: clock.
class Clock extends Date{static now(){return clock;}}
// [VI dòng gốc 8] Khai báo biến không gán lại bằng const: target = tạo đối tượng gồm isValid, property | Kết thúc hàm hiện tại và trả về: đọc {id:targetId,type,occ,hp:[alive?100:0,100]}[k].
const target={isValid:true,property:{get(k){return {id:targetId,type,occ,hp:[alive?100:0,100]}[k];}}};
// [VI dòng gốc 9] Khai báo biến không gán lại bằng const: combat = tạo đối tượng gồm target; me = tạo đối tượng gồm getComponent | Kết thúc hàm hiện tại và trả về: combat.
const combat={target},me={getComponent(){return combat;}};
// [VI dòng gốc 10] Khai báo biến không gán lại bằng const: W = tạo đối tượng gồm __KVPV_OWN_ACTOR_ID, console, _d, _C, _Ba, _ft, KVPV_TQ_SCOPE, KVPV, KVPV_LINHLUNG922, KVPV_TH300, KVPV_RANGE281, KVPV_HITRUN_AUTO, KVPV_HITRUN1, setInterval, clearInterval
const W={__KVPV_OWN_ACTOR_ID:actor,console:{warn(){},info(){},table(){},log(){}},
// [VI dòng gốc 11] Kết thúc hàm hiện tại và trả về: current. | Kết thúc hàm hiện tại và trả về: me.
 _d:{_Yct:{_Het:function(){}}},_C:{_Mn:{_Cn:{get currentID(){return current;}}},_Ba:{instance:{getRole(){return me;}}}},
// [VI dòng gốc 12] Kết thúc hàm hiện tại và trả về: dead.
 _Ba:{_rJ:{_O$:{ins:{actorId:actor,get isDead(){return dead;}}}},
// [VI dòng gốc 13] Kết thúc hàm hiện tại và trả về: tạo mảng gồm 1 vị trí: [current]. | Kết thúc hàm hiện tại và trả về: inMission. | Kết thúc hàm hiện tại và trả về: common.
  _$a:{_yo:{ins:{get intoSce(){return [current];},get isInMission(){return inMission;}}},SceneUtil:{get isCommonScene(){return common;}}},
// [VI dòng gốc 14] Kết thúc hàm hiện tại và trả về: highest.
  _tQ:{_$Y:{ins:{get finishLevel(){return highest;}}}},_Co:{_Mo:{ins:{auto:true,curLv:10}}}},
// [VI dòng gốc 15] Kết thúc hàm hiện tại và trả về: nếu n>=10&&n<=13 thì lấy [4000+n], ngược lại lấy null.
 _ft:{_u$:{ins:{getCfgByLv(n){return n>=10&&n<=13?[4000+n]:null;}}}},
// [VI dòng gốc 16] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm inside, current. | Kết thúc hàm hiện tại và trả về: tính biểu thức current===2995.
 KVPV_TQ_SCOPE:{status(){return {inside:current===2995,current};},inside(){return current===2995;}},
// [VI dòng gốc 17] Kết thúc hàm hiện tại và trả về: null.
 KVPV:{combat:{config:{}},timeline:{reservation(){return null;}}},
// [VI dòng gốc 18] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm active, pendingFloor. | gán towerRunning bằng true | Kết thúc hàm hiện tại và trả về: gọi this.status() để trả trạng thái để kiểm tra. | gán towerRunning bằng false
 KVPV_LINHLUNG922:{status(){return {active:towerRunning,pendingFloor:towerRunning?floor:null};},start(){towerRunning=true;return this.status();},stop(){towerRunning=false;return this.status();}},
// [VI dòng gốc 19] gán far bằng true | gán far bằng false | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm running, confirmedSkills.
 KVPV_TH300:{start(){far=true;},stop(){far=false;},sync(){},status(){return {running:far,confirmedSkills:[]};}},
// [VI dòng gốc 20] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm .
 KVPV_RANGE281:{setTrialRange(){},enable(){},status(){return {}; }},
// [VI dòng gốc 21] gán auto bằng false | Kiểm tra hr: đúng thì chạy nhánh sau if. | tăng stops một đơn vị sau khi lấy giá trị | gán hr bằng false
 KVPV_HITRUN_AUTO:{stop(){auto=false;if(hr)stops++;hr=false;},rearm(){auto=true;rearms++;},status(){return {enabled:auto};}},
// [VI dòng gốc 22] Kiểm tra failStart: đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('blocked') | gọi assert.equal(W.KVPV.core.scene.can('combat'), true) để kiểm tra hai giá trị bằng nhau | gán hr bằng true
 KVPV_HITRUN1:{start(){if(failStart)throw Error('blocked');assert.equal(W.KVPV.core.scene.can('combat'),true);hr=true;hrBoss=targetId;starts++;},
// [VI dòng gốc 23] gán hr bằng false | tăng stops một đơn vị sau khi lấy giá trị | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm running, bossId, phase.
  stop(){hr=false;stops++;},status(){return {running:hr,bossId:hrBoss,phase:hr?'FIGHT':'OFF'};}},
// [VI dòng gốc 24] Kết thúc hàm hiện tại và trả về: 1.
 setInterval(){return 1;},clearInterval(){},
// [VI dòng gốc 25] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
};
// [VI dòng gốc 26] Khai báo biến không gán lại bằng const: ctx = tạo đối tượng gồm window, console, Date, _Ba, _ft
const ctx={window:W,console:W.console,Date:Clock,_Ba:W._Ba,_ft:W._ft};
// [VI dòng gốc 27] Định nghĩa hàm load; tham số: name | gọi vm.runInNewContext(fs.readFileSync(__dirname+'/src/'+name,'utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,''), ctx) để chạy mã trong ngữ cảnh máy ảo dùng cho kiểm thử
function load(name){vm.runInNewContext(fs.readFileSync(__dirname+'/src/'+name,'utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,''),ctx);}
// [VI dòng gốc 28] gọi load('00-far-scope.js') | gọi load('02-scene.js') | gọi load('09-modes.js') | gọi load('17-linh-lung-th.js')
load('00-far-scope.js');load('02-scene.js');load('09-modes.js');load('17-linh-lung-th.js');
// [VI dòng gốc 29] gọi assert.equal(W.KVPV_FAR_SCOPE.inside(), false) để kiểm tra hai giá trị bằng nhau | gọi W.KVPV_LINHLUNG_TH.start() để khởi động bộ điều khiển | gọi assert(towerRunning) để kiểm tra điều kiện của bài test | gọi assert.equal(starts, 0) để kiểm tra hai giá trị bằng nhau
assert.equal(W.KVPV_FAR_SCOPE.inside(),false);W.KVPV_LINHLUNG_TH.start();assert(towerRunning);assert.equal(starts,0);
// [VI dòng gốc 30] gán current bằng 4011 | gán inMission bằng true | gán common bằng false | gọi W.KVPV_MODE.syncMap()
current=4011;inMission=true;common=false;W.KVPV_MODE.syncMap();assert.equal(starts,1);assert(hr);assert(far);assert.equal(auto,false);assert.equal(rearms,0);
// [VI dòng gốc 31] gọi assert.equal(W.KVPV_FAR_SCOPE.status().kind, 'LINH_LUNG') để kiểm tra hai giá trị bằng nhau | gọi assert(W.KVPV_FAR_SCOPE.eligible(target)) để kiểm tra điều kiện của bài test
assert.equal(W.KVPV_FAR_SCOPE.status().kind,'LINH_LUNG');assert(W.KVPV_FAR_SCOPE.eligible(target));
// [VI dòng gốc 32] gán type bằng 2 | gọi assert.equal(W.KVPV_FAR_SCOPE.eligible(target), false) để kiểm tra hai giá trị bằng nhau | gán type bằng 1
type=2;assert.equal(W.KVPV_FAR_SCOPE.eligible(target),false);type=1;
// [VI dòng gốc 33] gán alive bằng false | gọi assert.equal(W.KVPV_FAR_SCOPE.eligible(target), false) để kiểm tra hai giá trị bằng nhau | gán alive bằng true
alive=false;assert.equal(W.KVPV_FAR_SCOPE.eligible(target),false);alive=true;
// [VI dòng gốc 34] gọi W.KVPV_MODE.syncMap() | gọi assert.equal(starts, 1) để kiểm tra hai giá trị bằng nhau
W.KVPV_MODE.syncMap();assert.equal(starts,1);
// [VI dòng gốc 35] Chú thích gốc của tác giả; không được thực thi. Nội dung: Cùng Boss giữ nguyên phiên HitRun để không làm mất pha hồi máu.
// Cùng Boss giữ nguyên phiên HitRun để không làm mất pha hồi máu.
// [VI dòng gốc 36] gán hr bằng true | gọi W.KVPV_MODE.syncMap() | gọi assert.equal(hr, true) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(starts, 1) để kiểm tra hai giá trị bằng nhau
hr=true;W.KVPV_MODE.syncMap();assert.equal(hr,true);assert.equal(starts,1);
// [VI dòng gốc 37] gán dead bằng true | gọi W.KVPV_MODE.syncMap() | gọi assert.equal(hr, false) để kiểm tra hai giá trị bằng nhau
dead=true;W.KVPV_MODE.syncMap();assert.equal(hr,false);
// [VI dòng gốc 38] gán dead bằng false | gọi W.KVPV_MODE.syncMap() | gọi assert.equal(hr, true) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(starts, 2, 'same Boss resumes after revival') để kiểm tra hai giá trị bằng nhau
dead=false;W.KVPV_MODE.syncMap();assert.equal(hr,true);assert.equal(starts,2,'same Boss resumes after revival');
// [VI dòng gốc 39] gán targetId bằng 'b' | gọi W.KVPV_MODE.syncMap() | gọi assert.equal(starts, 3) để kiểm tra hai giá trị bằng nhau
targetId='b';W.KVPV_MODE.syncMap();assert.equal(starts,3);
// [VI dòng gốc 40] gán floor bằng 12 | gán highest bằng 11 | gán current bằng 4012 | gán targetId bằng 'c'
floor=12;highest=11;current=4012;targetId='c';W.KVPV_MODE.syncMap();assert(far);assert.equal(W.KVPV_FAR_SCOPE.status().floor,12);
// [VI dòng gốc 41] gán highest bằng 12 | gọi assert.equal(W.KVPV_FAR_SCOPE.status().floor, 12) để kiểm tra hai giá trị bằng nhau
highest=12;assert.equal(W.KVPV_FAR_SCOPE.status().floor,12);
// [VI dòng gốc 42] gán current bằng 1002 | gán common bằng true | gán inMission bằng true | gọi W.KVPV_MODE.syncMap()
current=1002;common=true;inMission=true;W.KVPV_MODE.syncMap();assert.equal(far,false);assert.equal(hr,false);assert.equal(W.KVPV_FAR_SCOPE.inside(),false);
// [VI dòng gốc 43] gán current bằng 4012 | gán common bằng false | gán targetId bằng 'd' | gán dead bằng true
current=4012;common=false;targetId='d';dead=true;W.KVPV_MODE.syncMap();assert.equal(far,false);dead=false;
// [VI dòng gốc 44] gọi W.KVPV_MODE.syncMap() | gọi assert(far) để kiểm tra điều kiện của bài test | gọi assert.equal(starts, 5) để kiểm tra hai giá trị bằng nhau
W.KVPV_MODE.syncMap();assert(far);assert.equal(starts,5);
// [VI dòng gốc 45] Chú thích gốc của tác giả; không được thực thi. Nội dung: Thiên Quan vẫn trả về bộ auto/HitRun cũ; quay lại tháp thì giải phóng bộ đó.
// Thiên Quan vẫn trả về bộ auto/HitRun cũ; quay lại tháp thì giải phóng bộ đó.
// [VI dòng gốc 46] gán current bằng 2995 | gọi W.KVPV_MODE.syncMap() | gọi assert(auto) để kiểm tra điều kiện của bài test | gọi assert.equal(rearms, 1) để kiểm tra hai giá trị bằng nhau
current=2995;W.KVPV_MODE.syncMap();assert(auto);assert.equal(rearms,1);
// [VI dòng gốc 47] gán current bằng 4012 | gán targetId bằng 'e' | gọi W.KVPV_MODE.syncMap() | gọi assert.equal(auto, false) để kiểm tra hai giá trị bằng nhau
current=4012;targetId='e';W.KVPV_MODE.syncMap();assert.equal(auto,false);assert.equal(starts,6);
// [VI dòng gốc 48] gọi W.KVPV_LINHLUNG_TH.stop() để dừng bộ điều khiển và dọn tài nguyên | gọi assert.equal(towerRunning, false) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(hr, false) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(far, false) để kiểm tra hai giá trị bằng nhau
W.KVPV_LINHLUNG_TH.stop();assert.equal(towerRunning,false);assert.equal(hr,false);assert.equal(far,false);
// [VI dòng gốc 49] gọi assert.equal(W.KVPV_LINHLUNG_TH.enabled, false) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(W.KVPV_LINHLUNG_TH.status().recovery.enabled, true) để kiểm tra hai giá trị bằng nhau
assert.equal(W.KVPV_LINHLUNG_TH.enabled,false);assert.equal(W.KVPV_LINHLUNG_TH.status().recovery.enabled,true);
// [VI dòng gốc 50] gọi console.log('PASS Linh Lung TH: shared HitRun recovery, native floor-map scope, next target/floor, same-Boss revival, Tian Quan hand…)
console.log('PASS Linh Lung TH: shared HitRun recovery, native floor-map scope, next target/floor, same-Boss revival, Tian Quan handoff and stop');
// [VI dòng gốc 51] Dòng trống để tách các phần, không có lệnh thực thi.
