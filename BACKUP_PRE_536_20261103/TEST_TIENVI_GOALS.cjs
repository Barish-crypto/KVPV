// [VI dòng gốc 1] "use strict"
'use strict';
// [VI dòng gốc 2] Khai báo biến không gán lại bằng const: fs = gọi require('node:fs') để nạp module Node.js; vm = gọi require('node:vm') để nạp module Node.js; assert = gọi require('node:assert/strict') để nạp module Node.js
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
// [VI dòng gốc 3] Khai báo biến có thể gán lại bằng let: rows = tạo mảng gồm 3 vị trí: [[11,0,29],[12,1,1],[13,0,0]]; starts = 0; active = false; stops = 0; main = null
let rows=[[11,0,29],[12,1,1],[13,0,0]],starts=0,active=false,stops=0,main=null;
// [VI dòng gốc 4] Khai báo biến không gán lại bằng const: cfg = tạo hàm với tham số name, action, target | Khai báo biến không gán lại bằng const: a = tạo mảng gồm 0 vị trí: [] | gán a[3] bằng name | gán a[11] bằng [action]
const cfg=(name,action,target)=>{const a=[];a[3]=name;a[11]=[action];a[12]=target;return a;};
// [VI dòng gốc 5] Khai báo biến không gán lại bằng const: configs = tạo đối tượng gồm 11, 12, 13
const configs={11:cfg('Vượt Linh Lung Tháp Tầng 30',21,30),12:cfg('Cường hóa',10,1),13:cfg('Nạp nguyên bảo',47,1)};
// [VI dòng gốc 6] Khai báo biến không gán lại bằng const: timers = tạo đối tượng bằng Map() | Khai báo biến có thể gán lại bằng let: serial = 0
const timers=new Map();let serial=0;
// [VI dòng gốc 7] Khai báo biến không gán lại bằng const: W = tạo đối tượng gồm __KVPV_OWN_ACTOR_ID, setInterval, clearInterval, _Ba, _ft, KVPV_DAILY, KVPV_LINHLUNG922, KVPV_LINHLUNG_TH | gọi timers.set(++serial, fn) | Kết thúc hàm hiện tại và trả về: serial. | gọi timers.delete(id)
const W={__KVPV_OWN_ACTOR_ID:'a',setInterval(fn){timers.set(++serial,fn);return serial;},clearInterval(id){timers.delete(id);},
// [VI dòng gốc 8] Kết thúc hàm hiện tại và trả về: rows.
 _Ba:{_rJ:{_O$:{ins:{actorId:'a'}}},_G_n:{_U_n:{ins:{get tasks(){return rows;}}}},
// [VI dòng gốc 9] Kết thúc hàm hiện tại và trả về: main.
 _zIt:{_FIt:{ins:{get taskInfo(){return main;}}}},_tQ:{_$Y:{ins:{finishLevel:29}}},_$a:{SceneUtil:{isCommonScene:true},_yo:{ins:{isInMission:false}}}},
// [VI dòng gốc 10] Thuộc tính _ft: tạo đối tượng gồm _mei, __Z | Thuộc tính _mei: tạo đối tượng gồm ins | Thuộc tính ins: tạo đối tượng gồm getXianweiTaskDataById | Thuộc tính getXianweiTaskDataById: tạo hàm với tham số id; mỗi lần gọi trả về đọc configs[id]
 _ft:{_mei:{ins:{getXianweiTaskDataById:id=>configs[id]}},__Z:{ins:{getTaskCfgById:()=>[0,'Vượt Linh Lung Tháp Tầng 40',0,0,0,0,21]}}},
// [VI dòng gốc 11] Thuộc tính KVPV_DAILY: tạo đối tượng gồm quickState | Thuộc tính quickState: tạo hàm với tham số (không có); mỗi lần gọi trả về tạo đối tượng gồm running, job | Thuộc tính running: true | Thuộc tính job: "rảnh"
 KVPV_DAILY:{quickState:()=>({running:true,job:'rảnh'})},
// [VI dòng gốc 12] gán active bằng false | tăng stops một đơn vị sau khi lấy giá trị
 KVPV_LINHLUNG922:{status:()=>({active,targetFloor:30}),stop(){active=false;stops++;},setTargetFloor(){}},
// [VI dòng gốc 13] tăng starts một đơn vị sau khi lấy giá trị | gán active bằng true | gọi assert.equal(o.targetFloor, main?40:30) để kiểm tra hai giá trị bằng nhau
 KVPV_LINHLUNG_TH:{start(o){starts++;active=true;assert.equal(o.targetFloor,main?40:30);}}};
// [VI dòng gốc 14] Khai báo biến không gán lại bằng const: ctx = gọi vm.createContext({window:W}) | Khai báo biến không gán lại bằng const: load = tạo hàm với tham số n; mỗi lần gọi trả về gọi vm.runInContext(fs.readFileSync(__dirname+'/src/'+n,'utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,''), ctx)
const ctx=vm.createContext({window:W});const load=n=>vm.runInContext(fs.readFileSync(__dirname+'/src/'+n,'utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,''),ctx);
// [VI dòng gốc 15] gọi load('29-quest-goals.js') | gọi load('30-tienvi-goals.js') | gọi assert.equal(starts, 1) để kiểm tra hai giá trị bằng nhau
load('29-quest-goals.js');load('30-tienvi-goals.js');assert.equal(starts,1);
// [VI dòng gốc 16] gọi assert.equal(W.KVPV_TIENVI_GOALS.status().tasks[1].reason, 'waiting_shared_reward_queue') để kiểm tra hai giá trị bằng nhau
assert.equal(W.KVPV_TIENVI_GOALS.status().tasks[1].reason,'waiting_shared_reward_queue');
// [VI dòng gốc 17] gọi assert.equal(W.KVPV_TIENVI_GOALS.status().tasks[2].executor, 'manual_paid') để kiểm tra hai giá trị bằng nhau
assert.equal(W.KVPV_TIENVI_GOALS.status().tasks[2].executor,'manual_paid');
// [VI dòng gốc 18] gọi load('30-tienvi-goals.js') | gọi assert.equal(starts, 1) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(timers.size, 2) để kiểm tra hai giá trị bằng nhau
load('30-tienvi-goals.js');assert.equal(starts,1);assert.equal(timers.size,2);
// [VI dòng gốc 19] gán rows[0][1] bằng 1 | gọi W.KVPV_TIENVI_GOALS.sync() | gọi assert.equal(stops, 1, 'completed task stops only owned tower') để kiểm tra hai giá trị bằng nhau
rows[0][1]=1;W.KVPV_TIENVI_GOALS.sync();assert.equal(stops,1,'completed task stops only owned tower');
// [VI dòng gốc 20] gọi assert.equal(W.KVPV_TIENVI_GOALS.goal(), null) để kiểm tra hai giá trị bằng nhau
assert.equal(W.KVPV_TIENVI_GOALS.goal(),null);
// [VI dòng gốc 21] gán rows[0][1] bằng 0 | gán configs[11][11] bằng [999] | gọi assert.equal(W.KVPV_TIENVI_GOALS.goal(), null, 'name alone cannot route') để kiểm tra hai giá trị bằng nhau
rows[0][1]=0;configs[11][11]=[999];assert.equal(W.KVPV_TIENVI_GOALS.goal(),null,'name alone cannot route');
// [VI dòng gốc 22] gán configs[11][11] bằng [21] | gán configs[11][12] bằng 0 | gọi assert.equal(W.KVPV_TIENVI_GOALS.goal(), null, 'invalid native target') để kiểm tra hai giá trị bằng nhau
configs[11][11]=[21];configs[11][12]=0;assert.equal(W.KVPV_TIENVI_GOALS.goal(),null,'invalid native target');
// [VI dòng gốc 23] gán configs[11][12] bằng 30 | gán main bằng ['main40',1,0] | gọi W.KVPV_QUEST_GOALS.sync() | gọi assert.equal(starts, 2, 'main quest retains priority') để kiểm tra hai giá trị bằng nhau
configs[11][12]=30;main=['main40',1,0];W.KVPV_QUEST_GOALS.sync();assert.equal(starts,2,'main quest retains priority');
// [VI dòng gốc 24] gán W._Ba._rJ._O$.ins.actorId bằng 'b' | gọi assert.equal(W.KVPV_TIENVI_GOALS.goal(), null) để kiểm tra hai giá trị bằng nhau | gọi W.KVPV_TIENVI_GOALS.sync() | gọi assert.equal(W.KVPV_TIENVI_GOALS.status().enabled, false) để kiểm tra hai giá trị bằng nhau
W._Ba._rJ._O$.ins.actorId='b';assert.equal(W.KVPV_TIENVI_GOALS.goal(),null);W.KVPV_TIENVI_GOALS.sync();assert.equal(W.KVPV_TIENVI_GOALS.status().enabled,false);
// [VI dòng gốc 25] gọi console.log('PASS Tien Vi native task inventory, paid guard, existing claims, tower dispatch, fresh completion, reload, main priorit…)
console.log('PASS Tien Vi native task inventory, paid guard, existing claims, tower dispatch, fresh completion, reload, main priority, action/target validation and identity');
// [VI dòng gốc 26] Dòng trống để tách các phần, không có lệnh thực thi.
