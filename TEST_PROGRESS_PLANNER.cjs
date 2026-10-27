// [VI dòng gốc 1] "use strict"
'use strict';
// [VI dòng gốc 2] Khai báo biến không gán lại bằng const: fs = gọi require('node:fs') để nạp module Node.js; vm = gọi require('node:vm') để nạp module Node.js; assert = gọi require('node:assert/strict') để nạp module Node.js
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
// [VI dòng gốc 3] Khai báo biến không gán lại bằng const: source = gọi fs.readFileSync(__dirname+'/src/33-progress-planner.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm, '')
const source=fs.readFileSync(__dirname+'/src/33-progress-planner.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,'');
// [VI dòng gốc 4] Khai báo biến có thể gán lại bằng let: progress = 635; amount = 3; upgradeCalls = 0; turns = 1; main = null; taskState = 0; gain = 10
let progress=635,amount=3,upgradeCalls=0,turns=1,main=null,taskState=0,gain=10;
// [VI dòng gốc 5] Khai báo biến không gán lại bằng const: timers = tạo đối tượng bằng Set(); config = tạo mảng gồm 0 vị trí: [] | gán config[3] bằng 'Tu vi Pháp Bảo đạt 1200' | gán config[12] bằng 1200
const timers=new Set(),config=[];config[3]='Tu vi Pháp Bảo đạt 1200';config[12]=1200;
// [VI dòng gốc 6] Khai báo biến không gán lại bằng const: W = tạo đối tượng gồm __KVPV_OWN_ACTOR_ID, _Ba, _ft, KVPV_FABAO_FAST, KVPV_DAILY_TRIAL, setInterval, clearInterval
const W={__KVPV_OWN_ACTOR_ID:'a',_Ba:{_rJ:{_O$:{ins:{actorId:'a'}}},
// [VI dòng gốc 7] Kết thúc hàm hiện tại và trả về: main. | Kết thúc hàm hiện tại và trả về: tạo mảng gồm 1 vị trí: [[10,taskState,progress]].
 _zIt:{_FIt:{ins:{get taskInfo(){return main;}}}},_G_n:{_U_n:{ins:{get tasks(){return [[10,taskState,progress]];}}}},
// [VI dòng gốc 8] Thuộc tính _rnt: tạo đối tượng gồm _vnt | Thuộc tính _vnt: tạo đối tượng gồm ins | Thuộc tính ins: tạo đối tượng gồm getAmuletRise | Thuộc tính getAmuletRise: tạo hàm với tham số (không có); mỗi lần gọi trả về tạo mảng gồm 2 vị trí: [1,635]
 _rnt:{_vnt:{ins:{getAmuletRise:()=>[1,635]}}},_Ic:{_aQ:{ins:{getItemCountById:id=>id===77?amount:0}}}},
// [VI dòng gốc 9] Thuộc tính _ft: tạo đối tượng gồm _mei, __Z, _s$, _mY, _Bwt | Thuộc tính _mei: tạo đối tượng gồm ins | Thuộc tính ins: tạo đối tượng gồm getXianweiTaskDataById | Thuộc tính getXianweiTaskDataById: tạo hàm với tham số (không có); mỗi lần gọi trả về config
 _ft:{_mei:{ins:{getXianweiTaskDataById:()=>config}},__Z:{ins:{getTaskCfgById:()=>[0,'Đạt cấp 300']}},
// [VI dòng gốc 10] Khai báo biến không gán lại bằng const: a = tạo mảng gồm 0 vị trí: [] | gán a[3] bằng [id,4] | gán a[4] bằng 77 | gán a[5] bằng lv===3?10:10+gain
 _s$:{ins:{getCfgByIdLevel(id,lv){const a=[];a[3]=[id,4];a[4]=77;a[5]=lv===3?10:10+gain;return a;}}},
// [VI dòng gốc 11] Khai báo biến không gán lại bằng const: a = tạo mảng gồm 0 vị trí: [] | gán a[14] bằng [901,902] | Kết thúc hàm hiện tại và trả về: a.
 _mY:{ins:{getItemCfgById(){const a=[];a[14]=[901,902];return a;}}},
// [VI dòng gốc 12] Thuộc tính _Bwt: tạo đối tượng gồm ins | Thuộc tính ins: tạo đối tượng gồm getCfgById | Thuộc tính getCfgById: tạo hàm với tham số id; mỗi lần gọi trả về nếu id===901 thì lấy [901,0,0,[],[],2051], ngược lại lấy [902,0,0,[47],[],2051]
 _Bwt:{ins:{getCfgById:id=>id===901?[901,0,0,[],[],2051]:[902,0,0,[47],[],2051]}}},
// [VI dòng gốc 13] tăng upgradeCalls một đơn vị sau khi lấy giá trị
 KVPV_FABAO_FAST:{inspect:()=>[{id:6,level:3,max:9}],sync(){upgradeCalls++;}},
// [VI dòng gốc 14] Thuộc tính KVPV_DAILY_TRIAL: tạo đối tượng gồm status | Thuộc tính status: tạo hàm với tham số (không có); mỗi lần gọi trả về tạo đối tượng gồm dungeons | Thuộc tính dungeons: tạo mảng gồm 1 vị trí: [{id:2051,feature:22,level:1,remaining:turns,known:true,unlocked:true,taskAllowed:true}] | Thuộc tính id: 2051
 KVPV_DAILY_TRIAL:{status:()=>({dungeons:[{id:2051,feature:22,level:1,remaining:turns,known:true,unlocked:true,taskAllowed:true}]})},
// [VI dòng gốc 15] gọi timers.add(fn) | Kết thúc hàm hiện tại và trả về: fn. | gọi timers.delete(fn)
 setInterval(fn){timers.add(fn);return fn;},clearInterval(fn){timers.delete(fn);}};
// [VI dòng gốc 16] Khai báo biến không gán lại bằng const: ctx = gọi vm.createContext({window:W}); load = tạo hàm với tham số (không có); mỗi lần gọi trả về gọi vm.runInContext(source, ctx) | gọi load()
const ctx=vm.createContext({window:W}),load=()=>vm.runInContext(source,ctx);load();
// [VI dòng gốc 17] Khai báo biến có thể gán lại bằng let: p = gọi W.KVPV_PROGRESS_PLANNER.inspect() | gọi assert.equal(p.current, 635) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(p.remaining, 565) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(p.upgrades[0].missing, 1) để kiểm tra hai giá trị bằng nhau
let p=W.KVPV_PROGRESS_PLANNER.inspect();assert.equal(p.current,635);assert.equal(p.remaining,565);assert.equal(p.upgrades[0].missing,1);assert.equal(p.upgrades[0].gain,10);
// [VI dòng gốc 18] gọi assert.equal(W.KVPV_PROGRESS_PLANNER.materialDungeon(), 2051, 'native item get-way map routes verified free executor') để kiểm tra hai giá trị bằng nhau
assert.equal(W.KVPV_PROGRESS_PLANNER.materialDungeon(),2051,'native item get-way map routes verified free executor');
// [VI dòng gốc 19] gọi assert.equal(p.upgrades[0].sources[1].ready, false, 'action/panel precedence prevents a paid route from using its map field') để kiểm tra hai giá trị bằng nhau
assert.equal(p.upgrades[0].sources[1].ready,false,'action/panel precedence prevents a paid route from using its map field');
// [VI dòng gốc 20] gán amount bằng 4 | gọi W.KVPV_PROGRESS_PLANNER.sync() | gọi assert.equal(upgradeCalls, 1) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(W.KVPV_PROGRESS_PLANNER.materialDungeon(), null, 'new owned material immediately releases farming priority') để kiểm tra hai giá trị bằng nhau
amount=4;W.KVPV_PROGRESS_PLANNER.sync();assert.equal(upgradeCalls,1);assert.equal(W.KVPV_PROGRESS_PLANNER.materialDungeon(),null,'new owned material immediately releases farming priority');
// [VI dòng gốc 21] gọi assert.equal(W.KVPV_PROGRESS_PLANNER.inspect().reason, 'upgrade_owned_materials') để kiểm tra hai giá trị bằng nhau
assert.equal(W.KVPV_PROGRESS_PLANNER.inspect().reason,'upgrade_owned_materials');
// [VI dòng gốc 22] gán amount bằng 0 | gán turns bằng 0 | gọi assert.equal(W.KVPV_PROGRESS_PLANNER.materialDungeon(), null) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(W.KVPV_PROGRESS_PLANNER.inspect().reason, 'missing_materials_no_verified_free_source') để kiểm tra hai giá trị bằng nhau
amount=0;turns=0;assert.equal(W.KVPV_PROGRESS_PLANNER.materialDungeon(),null);assert.equal(W.KVPV_PROGRESS_PLANNER.inspect().reason,'missing_materials_no_verified_free_source');
// [VI dòng gốc 23] gán turns bằng 1 | gán gain bằng 0 | gọi assert.equal(W.KVPV_PROGRESS_PLANNER.inspect().reason, 'no_verified_positive_upgrade') để kiểm tra hai giá trị bằng nhau | gán gain bằng 10
turns=1;gain=0;assert.equal(W.KVPV_PROGRESS_PLANNER.inspect().reason,'no_verified_positive_upgrade');gain=10;
// [VI dòng gốc 24] gán progress bằng 1200 | gọi assert.equal(W.KVPV_PROGRESS_PLANNER.inspect().reason, 'waiting_server_goal_ack') để kiểm tra hai giá trị bằng nhau | gọi assert.equal(W.KVPV_PROGRESS_PLANNER.materialDungeon(), null) để kiểm tra hai giá trị bằng nhau
progress=1200;assert.equal(W.KVPV_PROGRESS_PLANNER.inspect().reason,'waiting_server_goal_ack');assert.equal(W.KVPV_PROGRESS_PLANNER.materialDungeon(),null);
// [VI dòng gốc 25] gán taskState bằng 1 | gọi assert.equal(W.KVPV_PROGRESS_PLANNER.inspect().reason, 'waiting_existing_reward_queue') để kiểm tra hai giá trị bằng nhau
taskState=1;assert.equal(W.KVPV_PROGRESS_PLANNER.inspect().reason,'waiting_existing_reward_queue');
// [VI dòng gốc 26] gán taskState bằng 0 | gán progress bằng 635 | gán main bằng ['main',1,0] | gọi assert.equal(W.KVPV_PROGRESS_PLANNER.inspect().goal, null, 'main quest takes priority over unrelated Tien Vi') để kiểm tra hai giá trị bằng nhau
taskState=0;progress=635;main=['main',1,0];assert.equal(W.KVPV_PROGRESS_PLANNER.inspect().goal,null,'main quest takes priority over unrelated Tien Vi');
// [VI dòng gốc 27] gán main bằng null | gọi load() | gọi assert.equal(timers.size, 1) để kiểm tra hai giá trị bằng nhau | gán W._Ba._rJ._O$.ins.actorId bằng 'other'
main=null;load();assert.equal(timers.size,1);W._Ba._rJ._O$.ins.actorId='other';W.KVPV_PROGRESS_PLANNER.sync();assert.equal(timers.size,0);assert.equal(W.KVPV_PROGRESS_PLANNER.materialDungeon(),null);
// [VI dòng gốc 28] gọi console.log('PASS progression planner: native cultivation goal/progress/gain, material deficit, exact get-way free source, no paid/u…)
console.log('PASS progression planner: native cultivation goal/progress/gain, material deficit, exact get-way free source, no paid/unknown route, quota exhaustion, server completion, shared upgrade executor, main priority and reload ownership');
// [VI dòng gốc 29] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 30] Chú thích gốc của tác giả; không được thực thi. Nội dung: User-confirmed general free source: bound each climb to one floor, then replan.
// User-confirmed general free source: bound each climb to one floor, then replan.
// [VI dòng gốc 31] gán W._Ba._rJ._O$.ins.actorId bằng 'a' | gán main bằng null | gán taskState bằng 0 | gán progress bằng 635
W._Ba._rJ._O$.ins.actorId='a';main=null;taskState=0;progress=635;amount=0;turns=0;
// [VI dòng gốc 32] gán W._Ba._$a bằng {SceneUtil:{isCommonScene:true},_yo:{ins:{isInMission:false}}}
W._Ba._$a={SceneUtil:{isCommonScene:true},_yo:{ins:{isInMission:false}}};
// [VI dòng gốc 33] gán W.KVPV_DAILY bằng {quickState:()=>({running:true,job:'rảnh'})}
W.KVPV_DAILY={quickState:()=>({running:true,job:'rảnh'})};
// [VI dòng gốc 34] Khai báo biến có thể gán lại bằng let: floor = 239; active = false; pending = null; unclaimed = 0; target = null; starts = 0; stops = 0
let floor=239,active=false,pending=null,unclaimed=0,target=null,starts=0,stops=0;
// [VI dòng gốc 35] gán W.KVPV_LINHLUNG922 bằng {status:()=>({active,highestFloor:floor,nextFloor:floor+1,targetFloor:target,pendingFloor:pending,unclaimedNormal:unclaimed}), stop(){stops++;active=false;}}
W.KVPV_LINHLUNG922={status:()=>({active,highestFloor:floor,nextFloor:floor+1,targetFloor:target,pendingFloor:pending,unclaimedNormal:unclaimed}),
// [VI dòng gốc 36] tăng stops một đơn vị sau khi lấy giá trị | gán active bằng false
 stop(){stops++;active=false;}};
// [VI dòng gốc 37] gán W.KVPV_LINHLUNG_TH bằng {start(o){starts++;active=true;target=o.targetFloor;pending=target;assert.equal(o.autoClaim,true);assert.equal(o.exclusiveDaily,true);}} | tăng starts một đơn vị sau khi lấy giá trị | gán active bằng true | gán target bằng o.targetFloor
W.KVPV_LINHLUNG_TH={start(o){starts++;active=true;target=o.targetFloor;pending=target;assert.equal(o.autoClaim,true);assert.equal(o.exclusiveDaily,true);}};
// [VI dòng gốc 38] gọi load() | gọi assert.equal(starts, 1) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(target, 240) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(W.KVPV_PROGRESS_PLANNER.inspect().source.executor, 'linh_lung') để kiểm tra hai giá trị bằng nhau
load();assert.equal(starts,1);assert.equal(target,240);assert.equal(W.KVPV_PROGRESS_PLANNER.inspect().source.executor,'linh_lung');
// [VI dòng gốc 39] gọi assert.equal(W.KVPV_PROGRESS_PLANNER.inspect().source.specificDropVerified, false, 'general source does not guarantee a specific frag…) để kiểm tra hai giá trị bằng nhau
assert.equal(W.KVPV_PROGRESS_PLANNER.inspect().source.specificDropVerified,false,'general source does not guarantee a specific fragment');
// [VI dòng gốc 40] gọi load() | gọi assert.equal(starts, 1, 'hot reload never restarts an in-flight material climb') để kiểm tra hai giá trị bằng nhau
load();assert.equal(starts,1,'hot reload never restarts an in-flight material climb');
// [VI dòng gốc 41] gán amount bằng 4 | gọi W.KVPV_PROGRESS_PLANNER.sync() | gọi assert.equal(stops, 0, 'wait for tower battle') để kiểm tra hai giá trị bằng nhau
amount=4;W.KVPV_PROGRESS_PLANNER.sync();assert.equal(stops,0,'wait for tower battle');
// [VI dòng gốc 42] gán pending bằng null | gán unclaimed bằng 1 | gọi W.KVPV_PROGRESS_PLANNER.sync() | gọi assert.equal(stops, 0, 'wait for reward claim') để kiểm tra hai giá trị bằng nhau
pending=null;unclaimed=1;W.KVPV_PROGRESS_PLANNER.sync();assert.equal(stops,0,'wait for reward claim');
// [VI dòng gốc 43] gán unclaimed bằng 0 | Khai báo biến không gán lại bằng const: before = upgradeCalls | gọi W.KVPV_PROGRESS_PLANNER.sync() | gọi assert.equal(stops, 1) để kiểm tra hai giá trị bằng nhau
unclaimed=0;const before=upgradeCalls;W.KVPV_PROGRESS_PLANNER.sync();assert.equal(stops,1);assert.equal(upgradeCalls,before+1,'return to upgrade when owned material is sufficient');
// [VI dòng gốc 44] gán amount bằng 0 | gọi W.KVPV_PROGRESS_PLANNER.sync() | gọi assert.equal(starts, 1, 'same floor is not blindly restarted') để kiểm tra hai giá trị bằng nhau
amount=0;W.KVPV_PROGRESS_PLANNER.sync();assert.equal(starts,1,'same floor is not blindly restarted');
// [VI dòng gốc 45] gán floor bằng 240 | gọi W.KVPV_PROGRESS_PLANNER.sync() | gọi assert.equal(starts, 2) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(target, 241, 'replan next floor only from updated native progress') để kiểm tra hai giá trị bằng nhau
floor=240;W.KVPV_PROGRESS_PLANNER.sync();assert.equal(starts,2);assert.equal(target,241,'replan next floor only from updated native progress');
// [VI dòng gốc 46] gán pending bằng null | gán active bằng false | gọi W.KVPV_PROGRESS_PLANNER.sync() | gọi assert.equal(starts, 2, 'failed/stopped attempt does not auto restart') để kiểm tra hai giá trị bằng nhau
pending=null;active=false;W.KVPV_PROGRESS_PLANNER.sync();assert.equal(starts,2,'failed/stopped attempt does not auto restart');
// [VI dòng gốc 47] gọi console.log('PASS Linh Lung material source: user-confirmed general drops, one-floor goals, native autoClaim, battle/reward ACK, inv…)
console.log('PASS Linh Lung material source: user-confirmed general drops, one-floor goals, native autoClaim, battle/reward ACK, inventory replan, hot reload and no blind replay');
// [VI dòng gốc 48] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 49] Khai báo biến có thể gán lại bằng let: keysWork = true | gán W.KVPV_FABAO_TREASURE bằng {hasWork:()=>keysWork,sync(){}}
let keysWork=true;W.KVPV_FABAO_TREASURE={hasWork:()=>keysWork,sync(){}};
// [VI dòng gốc 50] gọi W.KVPV_PROGRESS_PLANNER.sync() | gọi assert.equal(starts, 2, 'owned keys or warehouse loot are processed before collecting more keys') để kiểm tra hai giá trị bằng nhau
W.KVPV_PROGRESS_PLANNER.sync();assert.equal(starts,2,'owned keys or warehouse loot are processed before collecting more keys');
// [VI dòng gốc 51] gọi assert.equal(W.KVPV_PROGRESS_PLANNER.status().reason, 'use_treasure_keys_then_collect_fabao') để kiểm tra hai giá trị bằng nhau | gọi assert.equal(W.KVPV_PROGRESS_PLANNER.materialDungeon(), null) để kiểm tra hai giá trị bằng nhau
assert.equal(W.KVPV_PROGRESS_PLANNER.status().reason,'use_treasure_keys_then_collect_fabao');assert.equal(W.KVPV_PROGRESS_PLANNER.materialDungeon(),null);
// [VI dòng gốc 52] gọi console.log('PASS corrected chain: owned keys -> treasure/warehouse before further tower or material dungeon farming')
console.log('PASS corrected chain: owned keys -> treasure/warehouse before further tower or material dungeon farming');
// [VI dòng gốc 53] Dòng trống để tách các phần, không có lệnh thực thi.
