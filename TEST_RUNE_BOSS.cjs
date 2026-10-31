// [VI dòng gốc 1] "use strict"
'use strict';
// [VI dòng gốc 2] Khai báo biến không gán lại bằng const: fs = gọi require('node:fs') để nạp module Node.js; vm = gọi require('node:vm') để nạp module Node.js; assert = gọi require('node:assert/strict') để nạp module Node.js
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
// [VI dòng gốc 3] Khai báo biến có thể gán lại bằng let: clock = 1000; current = 1002; common = true; mission = false; finished = 10; dead = false; blocked = false; deny = false; far = false; hr = false; auto = false; targetId = "boss1"; kind = 1; hp = 100
let clock=1000,current=1002,common=true,mission=false,finished=10,dead=false,blocked=false,deny=false,
// [VI dòng gốc 4] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng name. Đọc cùng dòng mở phía trên: far=false,hr=false,auto=false,targetId='boss1',kind=1,hp=100;
  far=false,hr=false,auto=false,targetId='boss1',kind=1,hp=100;
// [VI dòng gốc 5] Khai báo biến không gán lại bằng const: timers = tạo đối tượng bằng Map(); sent = tạo mảng gồm 0 vị trí: [] | Khai báo biến có thể gán lại bằng let: timerId = 0
const timers=new Map(),sent=[];let timerId=0;
// [VI dòng gốc 6] Khai báo biến không gán lại bằng const: target = tạo đối tượng gồm isValid, property
const target={isValid:true,property:{get:k=>({id:targetId,type:kind,occ:777,hp:[hp,100]})[k]}};
// [VI dòng gốc 7] Khai báo biến không gán lại bằng const: role = tạo đối tượng gồm getComponent, property
const role={getComponent:()=>({target}),property:{get:k=>k==='hp'?[100,100]:null}};
// [VI dòng gốc 8] Khai báo biến không gán lại bằng const: W = tạo đối tượng gồm __KVPV_OWN_ACTOR_ID, _Ba, _ft, _d, _C, KVPV_TQ_SCOPE, KVPV_CONFIRM_POPUPS, KVPV, KVPV_TH300, KVPV_RANGE281, KVPV_HITRUN1, KVPV_HITRUN_AUTO, setInterval, clearInterval | Kết thúc hàm hiện tại và trả về: dead.
const W={__KVPV_OWN_ACTOR_ID:'123456',_Ba:{_rJ:{_O$:{ins:{actorId:'123456',get isDead(){return dead;}}}},
// [VI dòng gốc 9] Kết thúc hàm hiện tại và trả về: tính biểu thức finished+1. | Kết thúc hàm hiện tại và trả về: finished.
  _IH:{_ZY:{inst:{get currLv(){return finished+1;},get finishLv(){return finished;}}}},_Co:{_Mo:{ins:{auto:false}}},
// [VI dòng gốc 10] Kết thúc hàm hiện tại và trả về: tạo mảng gồm 1 vị trí: [current]. | Kết thúc hàm hiện tại và trả về: mission. | Kết thúc hàm hiện tại và trả về: common.
  _$a:{_yo:{ins:{get intoSce(){return [current];},get isInMission(){return mission;}}},SceneUtil:{get isCommonScene(){return common;}}},
// [VI dòng gốc 11] Thuộc tính _sst: tạo đối tượng gồm _Cht | Thuộc tính _Cht: tạo đối tượng gồm inst | Thuộc tính inst: tạo đối tượng gồm checkEnterScene, rqEtScene | Thuộc tính checkEnterScene: tạo hàm với tham số (không có); mỗi lần gọi trả về đảo giá trị đúng/sai của deny
  _sst:{_Cht:{inst:{checkEnterScene:()=>!deny,rqEtScene:(...a)=>sent.push(a)}}}},
// [VI dòng gốc 12] Thuộc tính _ft: tạo đối tượng gồm _wZ | Thuộc tính _wZ: tạo đối tượng gồm ins | Thuộc tính ins: tạo đối tượng gồm getCfgByLv | Thuộc tính getCfgByLv: tạo hàm với tham số n; mỗi lần gọi trả về nếu n<=12 thì lấy [n], ngược lại lấy null
  _ft:{_wZ:{ins:{getCfgByLv:n=>n<=12?[n]:null}}},_d:{_Yct:{_Het:1}},
// [VI dòng gốc 13] Kết thúc hàm hiện tại và trả về: current.
  _C:{_Mn:{_Cn:{get currentID(){return current;}}},_Ba:{instance:{getRole:()=>role}}},
// [VI dòng gốc 14] Thuộc tính KVPV_TQ_SCOPE: tạo đối tượng gồm status, inside | Thuộc tính status: tạo hàm với tham số (không có); mỗi lần gọi trả về tạo đối tượng gồm inside | Thuộc tính inside: tính biểu thức current===2995 | Thuộc tính inside: tạo hàm với tham số (không có); mỗi lần gọi trả về tính biểu thức current===2995
  KVPV_TQ_SCOPE:{status:()=>({inside:current===2995}),inside:()=>current===2995},
// [VI dòng gốc 15] Thuộc tính KVPV_CONFIRM_POPUPS: tạo đối tượng gồm beforeTask | Thuộc tính beforeTask: tạo hàm với tham số (không có); mỗi lần gọi trả về blocked | Thuộc tính KVPV: tạo đối tượng gồm combat, timeline | Thuộc tính combat: tạo đối tượng gồm config
  KVPV_CONFIRM_POPUPS:{beforeTask:()=>blocked},KVPV:{combat:{config:{}},timeline:{reservation:()=>null}},
// [VI dòng gốc 16] gán far bằng true | gán far bằng false
  KVPV_TH300:{start(){far=true;},stop(){far=false;},sync(){},status:()=>({running:far,requestedDistance:302,confirmedSkills:[]})},
// [VI dòng gốc 17] Thuộc tính KVPV_RANGE281: tạo đối tượng gồm setTrialRange, enable, status | Thuộc tính setTrialRange: tạo hàm với tham số (không có) | Thuộc tính enable: tạo hàm với tham số (không có) | Thuộc tính status: tạo hàm với tham số (không có); mỗi lần gọi trả về tạo đối tượng gồm
  KVPV_RANGE281:{setTrialRange(){},enable(){},status:()=>({})},
// [VI dòng gốc 18] gán hr bằng true | gán hr bằng false
  KVPV_HITRUN1:{status:()=>({running:hr}),start(){hr=true;},stop(){hr=false;}},
// [VI dòng gốc 19] gán auto bằng false | gán hr bằng false | gán auto bằng true
  KVPV_HITRUN_AUTO:{status:()=>({enabled:auto}),stop(){auto=false;hr=false;},rearm(){auto=true;}},
// [VI dòng gốc 20] gọi timers.set(++timerId, fn) | Kết thúc hàm hiện tại và trả về: timerId. | gọi timers.delete(id)
  setInterval(fn){timers.set(++timerId,fn);return timerId;},clearInterval(id){timers.delete(id);}};
// [VI dòng gốc 21] Định nghĩa lớp Clock kế thừa Date. | Kết thúc hàm hiện tại và trả về: clock.
class Clock extends Date{static now(){return clock;}}
// [VI dòng gốc 22] Khai báo biến không gán lại bằng const: ctx = tạo đối tượng gồm window, _Ba, _ft, Date, console
const ctx={window:W,_Ba:W._Ba,_ft:W._ft,Date:Clock,console:{info(){},warn(){},table(){}}};
// [VI dòng gốc 23] Định nghĩa hàm load; tham số: name | gọi vm.runInNewContext(fs.readFileSync(__dirname+'/src/'+name,'utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,''), ctx) để chạy mã trong ngữ cảnh máy ảo dùng cho kiểm thử
function load(name){vm.runInNewContext(fs.readFileSync(__dirname+'/src/'+name,'utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,''),ctx);}
// [VI dòng gốc 24] gọi load('00-far-scope.js') | gọi load('02-scene.js') | gọi load('09-modes.js') | gọi load('25-rune-boss.js')
load('00-far-scope.js');load('02-scene.js');load('25-rune-boss.js');
// [VI dòng gốc 25] gọi assert.deepEqual(sent, [[2201,11]]) để kiểm tra cấu trúc hai giá trị tương đương | gọi assert.equal(W.KVPV_RUNE_BOSS.status().pending.floor, 11) để kiểm tra hai giá trị bằng nhau
assert.deepEqual(sent,[[2201,11]]);assert.equal(W.KVPV_RUNE_BOSS.status().pending.floor,11);
// [VI dòng gốc 26] gọi load('25-rune-boss.js') | gọi assert.equal(sent.length, 1, 'reload never replays pending entry') để kiểm tra hai giá trị bằng nhau
load('25-rune-boss.js');assert.equal(sent.length,1,'reload never replays pending entry');
// [VI dòng gốc 27] cập nhật bằng toán tử += clock bằng 30000 | gọi W.KVPV_RUNE_BOSS.sync() | gọi assert.equal(sent.length, 1, 'entry timeout never retries') để kiểm tra hai giá trị bằng nhau
clock+=30000;W.KVPV_RUNE_BOSS.sync();assert.equal(sent.length,1,'entry timeout never retries');
// [VI dòng gốc 28] gán current bằng 2201 | gán common bằng false | gán mission bằng true | gọi W.KVPV_RUNE_BOSS.sync()
current=2201;common=false;mission=true;W.KVPV_RUNE_BOSS.sync();
// [VI dòng gốc 29] gọi assert.equal(W.KVPV_FAR_SCOPE.status().kind, 'PHU_VAN') để kiểm tra hai giá trị bằng nhau | gọi assert(far) để kiểm tra điều kiện của bài test | gọi assert.equal(auto, false) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(hr, true) để kiểm tra hai giá trị bằng nhau
assert.equal(W.KVPV_FAR_SCOPE.status().kind,'PHU_VAN');assert.equal(far,false,'retired TH300 sender must not start');assert.equal(auto,false);
// [VI dòng gốc 30] gọi assert(W.KVPV_FAR_SCOPE.eligible(target)) để kiểm tra điều kiện của bài test | gán kind bằng 2 | gọi assert(!W.KVPV_FAR_SCOPE.eligible(target)) để kiểm tra điều kiện của bài test | gán kind bằng 1
assert(W.KVPV_FAR_SCOPE.eligible(target));kind=2;assert(!W.KVPV_FAR_SCOPE.eligible(target));kind=1;
// [VI dòng gốc 31] gán hp bằng 0 | gọi assert(!W.KVPV_FAR_SCOPE.eligible(target)) để kiểm tra điều kiện của bài test | gán hp bằng 100
hp=0;assert(!W.KVPV_FAR_SCOPE.eligible(target));hp=100;
// [VI dòng gốc 32] gán hr bằng true | gọi W.KVPV_MODE.syncMap() | gọi assert.equal(hr, true, 'same Rune Boss preserves HitRun recovery') để kiểm tra hai giá trị bằng nhau
hr=true;assert.equal(hr,true,'same Rune Boss preserves HitRun recovery');
// [VI dòng gốc 33] gán targetId bằng 'boss2' | gán finished bằng 11 | gọi W.KVPV_MODE.syncMap() | gọi assert(far) để kiểm tra điều kiện của bài test
targetId='boss2';finished=11;assert.equal(far,false,'no legacy far sender');
// [VI dòng gốc 34] gán current bằng 1002 | gán common bằng true | gán mission bằng false | gán blocked bằng true
current=1002;common=true;mission=false;blocked=true;W.KVPV_RUNE_BOSS.sync();assert.equal(sent.length,1);
// [VI dòng gốc 35] gán blocked bằng false | gọi W.KVPV_RUNE_BOSS.sync() | gọi assert.deepEqual(sent[1], [2201,12]) để kiểm tra cấu trúc hai giá trị tương đương
blocked=false;W.KVPV_RUNE_BOSS.sync();assert.deepEqual(sent[1],[2201,12]);
// [VI dòng gốc 36] gán current bằng 2201 | gán common bằng false | gán mission bằng true | gọi W.KVPV_RUNE_BOSS.sync()
current=2201;common=false;mission=true;W.KVPV_RUNE_BOSS.sync();
// [VI dòng gốc 37] gán current bằng 1002 | gán common bằng true | gán mission bằng false | gọi W.KVPV_RUNE_BOSS.sync()
current=1002;common=true;mission=false;W.KVPV_RUNE_BOSS.sync();W.KVPV_RUNE_BOSS.sync();
// [VI dòng gốc 38] gọi assert.equal(sent.length, 2, 'failed floor not replayed') để kiểm tra hai giá trị bằng nhau | gọi assert.equal(W.KVPV_RUNE_BOSS.status().reason, 'floor_already_attempted') để kiểm tra hai giá trị bằng nhau
assert.equal(sent.length,2,'failed floor not replayed');assert.equal(W.KVPV_RUNE_BOSS.status().reason,'floor_already_attempted');
// [VI dòng gốc 39] gọi W.KVPV_MODE.syncMap() | gọi assert.equal(far, false, 'outside map releases far combo') để kiểm tra hai giá trị bằng nhau
assert.equal(far,false,'outside map releases far combo');
// [VI dòng gốc 40] gán finished bằng 12 | gọi W.KVPV_RUNE_BOSS.sync() | gọi assert.equal(sent.length, 2, 'max level stops') để kiểm tra hai giá trị bằng nhau
finished=12;W.KVPV_RUNE_BOSS.sync();assert.equal(sent.length,2,'max level stops');
// [VI dòng gốc 41] gán current bằng 2201 | gán common bằng true | gán mission bằng false | gọi assert.equal(W.KVPV_FAR_SCOPE.rune().inside, false, 'common map flag not sufficient') để kiểm tra hai giá trị bằng nhau
current=2201;common=true;mission=false;assert.equal(W.KVPV_FAR_SCOPE.rune().inside,false,'common map flag not sufficient');
// [VI dòng gốc 42] gán finished bằng 11 | gán common bằng false | gán mission bằng true | gọi W.KVPV_RUNE_BOSS.stop() để dừng bộ điều khiển và dọn tài nguyên
finished=11;common=false;mission=true;W.KVPV_RUNE_BOSS.stop();
// [VI dòng gốc 43] gọi assert.equal(W.KVPV_RUNE_BOSS.enabled, false) để kiểm tra hai giá trị bằng nhau
assert.equal(W.KVPV_RUNE_BOSS.enabled,false);
// [VI dòng gốc 44] gọi assert.equal(W.KVPV_FAR_SCOPE.status().kind, 'PHU_VAN', 'manual entry keeps Rune far-combat scope when navigation is stopped') để kiểm tra hai giá trị bằng nhau
assert.equal(W.KVPV_FAR_SCOPE.status().kind,'PHU_VAN','manual entry keeps Rune far-combat scope when navigation is stopped');
// [VI dòng gốc 45] Khai báo biến không gán lại bằng const: requestsBefore = đọc sent.length | gán W.KVPV_ENTRY_POLICY bằng {manual:true} | gọi W.KVPV_RUNE_BOSS.sync()
const requestsBefore=sent.length;W.KVPV_ENTRY_POLICY={manual:true};W.KVPV_RUNE_BOSS.sync();
// [VI dòng gốc 46] gọi assert.equal(sent.length, requestsBefore, 'combat scope cannot reenable automatic floor entry') để kiểm tra hai giá trị bằng nhau
assert.equal(sent.length,requestsBefore,'combat scope cannot reenable automatic floor entry');
// [VI dòng gốc 47] gán W._Ba._rJ._O$.ins.actorId bằng '999999' | gọi W.KVPV_RUNE_BOSS.sync() | gọi assert.equal(W.KVPV_RUNE_BOSS.enabled, false) để kiểm tra hai giá trị bằng nhau
W._Ba._rJ._O$.ins.actorId='999999';W.KVPV_RUNE_BOSS.sync();assert.equal(W.KVPV_RUNE_BOSS.enabled,false);
// [VI dòng gốc 48] gọi console.log('PASS rune Boss: exact map/config scope, shared HitRun coordinator, target/floor handoff, popup priority, native entry, …)
console.log('PASS rune Boss: native floor entry and ACK, scope, popup priority, pending dedupe, server progress, max floor and identity; legacy sender remains inactive');
// [VI dòng gốc 49] Dòng trống để tách các phần, không có lệnh thực thi.
