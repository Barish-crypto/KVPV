// [VI dòng gốc 1] "use strict"
'use strict';
// [VI dòng gốc 2] Khai báo biến không gán lại bằng const: fs = gọi require('node:fs') để nạp module Node.js; vm = gọi require('node:vm') để nạp module Node.js; assert = gọi require('node:assert/strict') để nạp module Node.js
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
// [VI dòng gốc 3] Khai báo biến có thể gán lại bằng let: mainState = 1; eraLevel = 102; level = 279; popup = false; common = true; opens = 0; fetches = 0
let mainState=1,eraLevel=102,level=279,popup=false,common=true,opens=0,fetches=0;
// [VI dòng gốc 4] Khai báo biến không gán lại bằng const: timers = tạo đối tượng bằng Set(); nodes = tạo đối tượng bằng Map([[1,[1,0,279]],[2,[2,0,29]],[3,[3,0,635]],[4,[4,0,0]]])
const timers=new Set(),nodes=new Map([[1,[1,0,279]],[2,[2,0,29]],[3,[3,0,635]],[4,[4,0,0]]]);
// [VI dòng gốc 5] Khai báo biến không gán lại bằng const: make = tạo hàm với tham số name, target, action; mỗi lần gọi trả về tạo mảng gồm 3 vị trí: [0,name,[1,target,action]]
const make=(name,target,action)=>[0,name,[1,target,action]];
// [VI dòng gốc 6] Khai báo biến không gán lại bằng const: configs = tạo đối tượng bằng Map([[1,make('Đạt cấp 280',280,43)],[2,make('Vượt Linh Lung Tháp Tầng 30',30,21)], [3,make('Tu vi Pháp Bảo đạt 1200',1200,15…)
const configs=new Map([[1,make('Đạt cấp 280',280,43)],[2,make('Vượt Linh Lung Tháp Tầng 30',30,21)],
// [VI dòng gốc 7] gọi make('Tu vi Pháp Bảo đạt 1200', 1200, 15) | gọi make('Mặc trang bị', 1, 2)
 [3,make('Tu vi Pháp Bảo đạt 1200',1200,15)],[4,make('Mặc trang bị',1,2)]]);
// [VI dòng gốc 8] Khai báo biến không gán lại bằng const: W = tạo đối tượng gồm __KVPV_OWN_ACTOR_ID, _Ba, _ft, KVPV_DAILY, KVPV_CONFIRM_POPUPS, KVPV_V868, setInterval, clearInterval | Kết thúc hàm hiện tại và trả về: level.
const W={__KVPV_OWN_ACTOR_ID:'a',_Ba:{_rJ:{_O$:{ins:{actorId:'a',get level(){return level;}}}},
// [VI dòng gốc 9] Kết thúc hàm hiện tại và trả về: tạo mảng gồm 3 vị trí: ['reborn-main',mainState,0]. | Kết thúc hàm hiện tại và trả về: eraLevel. | Kết thúc hàm hiện tại và trả về: tạo mảng gồm 1 vị trí: [...nodes.keys()].
 _zIt:{_FIt:{ins:{get taskInfo(){return ['reborn-main',mainState,0];}}}},n_zS:{_Aht:{instance:{get lv(){return eraLevel;},get ids(){return [...nodes.keys()];},getEraNode:id=>nodes.get(id)}}},
// [VI dòng gốc 10] Kết thúc hàm hiện tại và trả về: common.
 _$a:{SceneUtil:{get isCommonScene(){return common;}},_yo:{ins:{isInMission:false}}}},
// [VI dòng gốc 11] Thuộc tính _ft: tạo đối tượng gồm __Z, _Pht, _Y4n | Thuộc tính __Z: tạo đối tượng gồm ins | Thuộc tính ins: tạo đối tượng gồm getTaskCfgById | Thuộc tính getTaskCfgById: tạo hàm với tham số (không có); mỗi lần gọi trả về tạo mảng gồm 2 vị trí: [0,'Chuyển Sinh đạt CS1 Tầng 3']
 _ft:{__Z:{ins:{getTaskCfgById:()=>[0,'Chuyển Sinh đạt CS1 Tầng 3']}},_Pht:{ins:{getCfgById:id=>configs.get(id)}},
// [VI dòng gốc 12] gọi assert.equal(id, 41) để kiểm tra hai giá trị bằng nhau | tăng opens một đơn vị sau khi lấy giá trị
 _Y4n:{ins:{open:id=>{assert.equal(id,41);opens++;}}}},
// [VI dòng gốc 13] Thuộc tính KVPV_DAILY: tạo đối tượng gồm quickState | Thuộc tính quickState: tạo hàm với tham số (không có); mỗi lần gọi trả về tạo đối tượng gồm running, job | Thuộc tính running: true | Thuộc tính job: "rảnh"
 KVPV_DAILY:{quickState:()=>({running:true,job:'rảnh'})},KVPV_CONFIRM_POPUPS:{beforeTask:()=>popup},
// [VI dòng gốc 14] tăng fetches một đơn vị sau khi lấy giá trị
 KVPV_V868:{config:{enabled:true,autoNavigateUnfinished:true},inspect(){fetches++;}},
// [VI dòng gốc 15] gọi timers.add(fn) | Kết thúc hàm hiện tại và trả về: fn. | gọi timers.delete(fn)
 setInterval(fn){timers.add(fn);return fn;},clearInterval(fn){timers.delete(fn);}};
// [VI dòng gốc 16] Khai báo biến không gán lại bằng const: context = gọi vm.createContext({window:W}) | Khai báo biến không gán lại bằng const: load = tạo hàm với tham số (không có); mỗi lần gọi trả về gọi vm.runInContext(fs.readFileSync(__dirname+'/src/37-reborn-goals.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,''), context) | gọi load()
const context=vm.createContext({window:W});const load=()=>vm.runInContext(fs.readFileSync(__dirname+'/src/37-reborn-goals.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,''),context);load();
// [VI dòng gốc 17] gọi assert.equal(opens, 1) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(W.KVPV_V868.config.autoNavigateUnfinished, false) để kiểm tra hai giá trị bằng nhau
assert.equal(opens,1);assert.equal(W.KVPV_V868.config.autoNavigateUnfinished,false);
// [VI dòng gốc 18] gọi assert.equal(W.KVPV_REBORN_GOALS.levelGoal().target, 280) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(W.KVPV_REBORN_GOALS.levelGoal().current, 279) để kiểm tra hai giá trị bằng nhau
assert.equal(W.KVPV_REBORN_GOALS.levelGoal().target,280);assert.equal(W.KVPV_REBORN_GOALS.levelGoal().current,279);
// [VI dòng gốc 19] gọi load() | gọi assert.equal(timers.size, 1) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(opens, 1, 'do not repeatedly open panel on reload') để kiểm tra hai giá trị bằng nhau
load();assert.equal(timers.size,1);assert.equal(opens,1,'do not repeatedly open panel on reload');
// [VI dòng gốc 20] gọi nodes.set(1, [1,1,280]) | gọi assert.equal(W.KVPV_REBORN_GOALS.inspect().reason, 'waiting_existing_era_reward_queue') để kiểm tra hai giá trị bằng nhau | gọi assert.equal(W.KVPV_REBORN_GOALS.levelGoal(), null) để kiểm tra hai giá trị bằng nhau
nodes.set(1,[1,1,280]);assert.equal(W.KVPV_REBORN_GOALS.inspect().reason,'waiting_existing_era_reward_queue');assert.equal(W.KVPV_REBORN_GOALS.levelGoal(),null);
// [VI dòng gốc 21] gọi nodes.set(1, [1,2,280]) | gọi assert.equal(W.KVPV_REBORN_GOALS.towerGoal().target, 30) để kiểm tra hai giá trị bằng nhau
nodes.set(1,[1,2,280]);assert.equal(W.KVPV_REBORN_GOALS.towerGoal().target,30);
// [VI dòng gốc 22] gọi nodes.set(2, [2,2,30]) | gọi assert.equal(W.KVPV_REBORN_GOALS.fabaoGoal().progress, 635) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(W.KVPV_REBORN_GOALS.fabaoGoal().source, 'REBORN') để kiểm tra hai giá trị bằng nhau
nodes.set(2,[2,2,30]);assert.equal(W.KVPV_REBORN_GOALS.fabaoGoal().progress,635);assert.equal(W.KVPV_REBORN_GOALS.fabaoGoal().source,'REBORN');
// [VI dòng gốc 23] gọi nodes.set(3, [3,2,1200]) | gọi assert.equal(W.KVPV_REBORN_GOALS.equipmentGoal().nodeId, 4) để kiểm tra hai giá trị bằng nhau
nodes.set(3,[3,2,1200]);assert.equal(W.KVPV_REBORN_GOALS.equipmentGoal().nodeId,4);
// [VI dòng gốc 24] gọi nodes.set(4, [4,2,1]) | gọi assert.equal(W.KVPV_REBORN_GOALS.inspect().reason, 'waiting_existing_breakthrough', 'reuse existing guarded native breakthrough sende…) để kiểm tra hai giá trị bằng nhau
nodes.set(4,[4,2,1]);assert.equal(W.KVPV_REBORN_GOALS.inspect().reason,'waiting_existing_breakthrough','reuse existing guarded native breakthrough sender');
// [VI dòng gốc 25] gán mainState bằng 2 | gọi assert.equal(W.KVPV_REBORN_GOALS.inspect().reason, 'waiting_main_reward_queue') để kiểm tra hai giá trị bằng nhau
mainState=2;assert.equal(W.KVPV_REBORN_GOALS.inspect().reason,'waiting_main_reward_queue');
// [VI dòng gốc 26] gán mainState bằng 1 | gọi nodes.set(1, [1,0,0]) | gọi configs.set(1, make('Vượt ải Thiên Quan',3,46))
mainState=1;nodes.set(1,[1,0,0]);configs.set(1,make('Vượt ải Thiên Quan',3,46));
// [VI dòng gốc 27] gọi assert.equal(W.KVPV_REBORN_GOALS.levelGoal().kind, 'STAGE') để kiểm tra hai giá trị bằng nhau | gọi assert.equal(W.KVPV_REBORN_GOALS.levelGoal().current, 0) để kiểm tra hai giá trị bằng nhau
assert.equal(W.KVPV_REBORN_GOALS.levelGoal().kind,'STAGE');assert.equal(W.KVPV_REBORN_GOALS.levelGoal().current,0);
// [VI dòng gốc 28] gọi configs.set(1, [0,'Vượt Thiên Kiếp Ải 120',[10,120,46]]) | gọi nodes.set(1, [1,0,119])
configs.set(1,[0,'Vượt Thiên Kiếp Ải 120',[10,120,46]]);nodes.set(1,[1,0,119]);
// [VI dòng gốc 29] gọi assert.equal(W.KVPV_REBORN_GOALS.levelGoal().kind, 'STAGE', 'reported native mode 10 / action 46 uses the existing stage executor') để kiểm tra hai giá trị bằng nhau
assert.equal(W.KVPV_REBORN_GOALS.levelGoal().kind,'STAGE','reported native mode 10 / action 46 uses the existing stage executor');
// [VI dòng gốc 30] gọi assert.equal(W.KVPV_REBORN_GOALS.levelGoal().target, 120) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(W.KVPV_REBORN_GOALS.levelGoal().current, 119) để kiểm tra hai giá trị bằng nhau
assert.equal(W.KVPV_REBORN_GOALS.levelGoal().target,120);assert.equal(W.KVPV_REBORN_GOALS.levelGoal().current,119);
// [VI dòng gốc 31] gọi configs.set(1, make('Vượt Thiên Kiếp Ải 120',120,999)) | gọi assert.equal(W.KVPV_REBORN_GOALS.levelGoal(), null, 'name alone must not authorize stage routing') để kiểm tra hai giá trị bằng nhau
configs.set(1,make('Vượt Thiên Kiếp Ải 120',120,999));assert.equal(W.KVPV_REBORN_GOALS.levelGoal(),null,'name alone must not authorize stage routing');
// [VI dòng gốc 32] gọi configs.set(1, make('Nạp SVIP',1,47)) | gọi assert.equal(W.KVPV_REBORN_GOALS.inspect().tasks[0].kind, 'manual_paid_or_item_source') để kiểm tra hai giá trị bằng nhau | gọi assert.equal(W.KVPV_REBORN_GOALS.levelGoal(), null) để kiểm tra hai giá trị bằng nhau
configs.set(1,make('Nạp SVIP',1,47));assert.equal(W.KVPV_REBORN_GOALS.inspect().tasks[0].kind,'manual_paid_or_item_source');assert.equal(W.KVPV_REBORN_GOALS.levelGoal(),null);
// [VI dòng gốc 33] gọi configs.set(1, make('Điều kiện chưa xác minh',4,999)) | gọi assert.equal(W.KVPV_REBORN_GOALS.inspect().reason, 'unmet_requirements_need_executor', 'unknown dependency stays explicit rather than…) để kiểm tra hai giá trị bằng nhau
configs.set(1,make('Điều kiện chưa xác minh',4,999));assert.equal(W.KVPV_REBORN_GOALS.inspect().reason,'unmet_requirements_need_executor','unknown dependency stays explicit rather than blind click');
// [VI dòng gốc 34] gán popup bằng true | gọi W.KVPV_REBORN_GOALS.sync() | gọi assert.equal(W.KVPV_REBORN_GOALS.status().reason, 'priority_popup') để kiểm tra hai giá trị bằng nhau | gán popup bằng false
popup=true;W.KVPV_REBORN_GOALS.sync();assert.equal(W.KVPV_REBORN_GOALS.status().reason,'priority_popup');popup=false;
// [VI dòng gốc 35] gọi nodes.clear() | gọi W.KVPV_REBORN_GOALS.sync() | gọi assert.equal(fetches, 1) để kiểm tra hai giá trị bằng nhau
nodes.clear();W.KVPV_REBORN_GOALS.sync();assert.equal(fetches,1);
// [VI dòng gốc 36] gán W._Ba._rJ._O$.ins.actorId bằng 'other' | gọi W.KVPV_REBORN_GOALS.sync() | gọi assert.equal(timers.size, 0) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(W.KVPV_REBORN_GOALS.levelGoal(), null) để kiểm tra hai giá trị bằng nhau
W._Ba._rJ._O$.ins.actorId='other';W.KVPV_REBORN_GOALS.sync();assert.equal(timers.size,0);assert.equal(W.KVPV_REBORN_GOALS.levelGoal(),null);
// [VI dòng gốc 37] gọi console.log('PASS reborn graph: native root/era dependencies, level/stage/tower/fabao/equipment selection, existing reward/breakthro…)
console.log('PASS reborn graph: native root/era dependencies, level/stage/tower/fabao/equipment selection, existing reward/breakthrough handoff, no paid or unknown actions, panel once, reload and ownership');
// [VI dòng gốc 38] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 39] Chú thích gốc của tác giả; không được thực thi. Nội dung: Actual adapters consume the selected era dependency, never a fake main task.
// Actual adapters consume the selected era dependency, never a fake main task.
// [VI dòng gốc 40] gán W._Ba._rJ._O$.ins.actorId bằng 'a' | gán mainState bằng 1 | gán eraLevel bằng 102 | gọi nodes.clear()
W._Ba._rJ._O$.ins.actorId='a';mainState=1;eraLevel=102;nodes.clear();
// [VI dòng gốc 41] Duyệt từng giá trị trong [[1,279],[2,29],[3,635],[4,0]] bằng const [id,progress]. | Khai báo biến không gán lại bằng const: [id,progress] (chưa gán giá trị) | gọi nodes.set(id, [id,0,progress])
for(const [id,progress]of [[1,279],[2,29],[3,635],[4,0]])nodes.set(id,[id,0,progress]);
// [VI dòng gốc 42] gọi configs.set(1, make('Đạt cấp 280',280,43))
configs.set(1,make('Đạt cấp 280',280,43));
// [VI dòng gốc 43] gán W._Ba._Co bằng {_Mo:{ins:{auto:false}}} | Khai báo biến có thể gán lại bằng let: stageStarts = 0; towerStarts = 0; towerActive = false
W._Ba._Co={_Mo:{ins:{auto:false}}};let stageStarts=0,towerStarts=0,towerActive=false;
// [VI dòng gốc 44] gán W.KVPV_DAILY.config bằng {enableTuVuot:false} | gán W.KVPV_DAILY.tuVuotStart bằng ()=>{stageStarts++;W._Ba._Co._Mo.ins.auto=true;} | tăng stageStarts một đơn vị sau khi lấy giá trị | gán W._Ba._Co._Mo.ins.auto bằng true
W.KVPV_DAILY.config={enableTuVuot:false};W.KVPV_DAILY.tuVuotStart=()=>{stageStarts++;W._Ba._Co._Mo.ins.auto=true;};
// [VI dòng gốc 45] gán W.KVPV_V866 bằng {config:{questFirst:true},tick(){},status:()=>({})} | gọi load()
W.KVPV_V866={config:{questFirst:true},tick(){},status:()=>({})};load();
// [VI dòng gốc 46] Khai báo biến không gán lại bằng const: loadAdapter = tạo hàm với tham số file; mỗi lần gọi trả về gọi vm.runInContext(fs.readFileSync(__dirname+'/src/'+file,'utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,''), context)
const loadAdapter=file=>vm.runInContext(fs.readFileSync(__dirname+'/src/'+file,'utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,''),context);
// [VI dòng gốc 47] gọi loadAdapter('01-quest-priority.js') | gọi assert.equal(stageStarts, 1, 'actual priority adapter farms Tian Quan for era level condition') để kiểm tra hai giá trị bằng nhau
loadAdapter('01-quest-priority.js');assert.equal(stageStarts,1,'actual priority adapter farms Tian Quan for era level condition');
// [VI dòng gốc 48] gọi nodes.set(1, [1,2,280]) | gọi W.KVPV_QUEST_PRIORITY.sync() | gọi assert.equal(W._Ba._Co._Mo.ins.auto, false, 'release stage farming when node is complete') để kiểm tra hai giá trị bằng nhau
nodes.set(1,[1,2,280]);W.KVPV_QUEST_PRIORITY.sync();assert.equal(W._Ba._Co._Mo.ins.auto,false,'release stage farming when node is complete');
// [VI dòng gốc 49] gán W._Ba._tQ bằng {_$Y:{ins:{finishLevel:29}}}
W._Ba._tQ={_$Y:{ins:{finishLevel:29}}};
// [VI dòng gốc 50] gán W.KVPV_LINHLUNG922 bằng {status:()=>({active:towerActive,targetFloor:30}),stop(){towerActive=false;}} | gán towerActive bằng false
W.KVPV_LINHLUNG922={status:()=>({active:towerActive,targetFloor:30}),stop(){towerActive=false;}};
// [VI dòng gốc 51] gán W.KVPV_LINHLUNG_TH bằng {start:o=>{towerStarts++;towerActive=true;assert.equal(o.targetFloor,30);}} | tăng towerStarts một đơn vị sau khi lấy giá trị | gán towerActive bằng true | gọi assert.equal(o.targetFloor, 30) để kiểm tra hai giá trị bằng nhau
W.KVPV_LINHLUNG_TH={start:o=>{towerStarts++;towerActive=true;assert.equal(o.targetFloor,30);}};
// [VI dòng gốc 52] gọi loadAdapter('29-quest-goals.js') | gọi assert.equal(towerStarts, 1, 'actual tower adapter reads era target') để kiểm tra hai giá trị bằng nhau
loadAdapter('29-quest-goals.js');assert.equal(towerStarts,1,'actual tower adapter reads era target');
// [VI dòng gốc 53] gọi nodes.set(2, [2,2,30]) | gán W._Ba._tQ._$Y.ins.finishLevel bằng 30 | gọi W.KVPV_QUEST_GOALS.sync()
nodes.set(2,[2,2,30]);W._Ba._tQ._$Y.ins.finishLevel=30;W.KVPV_QUEST_GOALS.sync();
// [VI dòng gốc 54] gọi loadAdapter('33-progress-planner.js') | Khai báo biến không gán lại bằng const: plan = gọi W.KVPV_PROGRESS_PLANNER.inspect()
loadAdapter('33-progress-planner.js');const plan=W.KVPV_PROGRESS_PLANNER.inspect();
// [VI dòng gốc 55] gọi assert.equal(plan.goal.source, 'REBORN') để kiểm tra hai giá trị bằng nhau | gọi assert.equal(plan.current, 635) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(plan.remaining, 565, 'actual Fabao planner uses era progress') để kiểm tra hai giá trị bằng nhau
assert.equal(plan.goal.source,'REBORN');assert.equal(plan.current,635);assert.equal(plan.remaining,565,'actual Fabao planner uses era progress');
// [VI dòng gốc 56] gọi nodes.set(3, [3,2,1200]) | gọi loadAdapter('35-equipment-treasure.js')
nodes.set(3,[3,2,1200]);loadAdapter('35-equipment-treasure.js');
// [VI dòng gốc 57] gọi assert.equal(W.KVPV_EQUIPMENT_TREASURE.status().objective.type, 0, 'actual treasure adapter recognizes era equipment condition') để kiểm tra hai giá trị bằng nhau
assert.equal(W.KVPV_EQUIPMENT_TREASURE.status().objective.type,0,'actual treasure adapter recognizes era equipment condition');
// [VI dòng gốc 58] gọi nodes.set(4, [4,2,1]) | gán eraLevel bằng 406 | gọi assert.equal(W.KVPV_REBORN_GOALS.inspect().reason, 'premium_gate_blocked') để kiểm tra hai giá trị bằng nhau
nodes.set(4,[4,2,1]);eraLevel=406;assert.equal(W.KVPV_REBORN_GOALS.inspect().reason,'premium_gate_blocked');
// [VI dòng gốc 59] gọi console.log('PASS actual reborn adapters: level -> Tian Quan -> tower -> Fabao planner -> equipment, authoritative node completion a…)
console.log('PASS actual reborn adapters: level -> Tian Quan -> tower -> Fabao planner -> equipment, authoritative node completion and explicit premium gate');
// [VI dòng gốc 60] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 61] gán eraLevel bằng 102 | gọi nodes.set(1, [1,0,3]) | gọi configs.set(1, make('Kích hoạt 4 Cổ Bảo',4,189))
eraLevel=102;nodes.set(1,[1,0,3]);configs.set(1,make('Kích hoạt 4 Cổ Bảo',4,189));
// [VI dòng gốc 62] gọi assert.equal(W.KVPV_REBORN_GOALS.cobaoGoal().target, 4) để kiểm tra hai giá trị bằng nhau
assert.equal(W.KVPV_REBORN_GOALS.cobaoGoal().target,4);
// [VI dòng gốc 63] gán W.KVPV_V864 bằng {config:{enabled:true},plan:()=>({fragments:{count:3,ready:true,allPlaced:false,rows:[{id:700,stage:50,owned:false,placed:false}]}})}
W.KVPV_V864={config:{enabled:true},plan:()=>({fragments:{count:3,ready:true,allPlaced:false,rows:[{id:700,stage:50,owned:false,placed:false}]}})};
// [VI dòng gốc 64] gán W._ft._h$ bằng {ins:{getCfgByLv:()=>[2011]}} | gán W._Ba._Co._Mo.ins.curLv bằng 50
W._ft._h$={ins:{getCfgByLv:()=>[2011]}};W._Ba._Co._Mo.ins.curLv=50;
// [VI dòng gốc 65] gọi loadAdapter('38-reborn-executors.js') | gọi assert.equal(stageStarts, 2, 'actual CoBao era prerequisite reaches Tian Quan adapter') để kiểm tra hai giá trị bằng nhau
loadAdapter('38-reborn-executors.js');assert.equal(stageStarts,2,'actual CoBao era prerequisite reaches Tian Quan adapter');
// [VI dòng gốc 66] gọi nodes.set(1, [1,0,0]) | gọi configs.set(1, make('Kẻ Thắng Làm Vua',1,165)) | gọi assert.equal(W.KVPV_REBORN_GOALS.arenaGoal().nodeId, 1) để kiểm tra hai giá trị bằng nhau
nodes.set(1,[1,0,0]);configs.set(1,make('Kẻ Thắng Làm Vua',1,165));assert.equal(W.KVPV_REBORN_GOALS.arenaGoal().nodeId,1);
// [VI dòng gốc 67] gọi console.log('PASS new era adapters: CoBao goal -> fragment stage -> actual Tian Quan, and native Arena classification')
console.log('PASS new era adapters: CoBao goal -> fragment stage -> actual Tian Quan, and native Arena classification');
// [VI dòng gốc 68] Dòng trống để tách các phần, không có lệnh thực thi.
