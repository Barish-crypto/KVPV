// [VI dòng gốc 1] "use strict"
'use strict';
// [VI dòng gốc 2] Khai báo biến không gán lại bằng const: fs = gọi require('node:fs') để nạp module Node.js; vm = gọi require('node:vm') để nạp module Node.js; assert = gọi require('node:assert/strict') để nạp module Node.js
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
// [VI dòng gốc 3] Khai báo biến không gán lại bằng const: source = gọi fs.readFileSync(__dirname+'/src/01-quest-priority.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm, '')
const source=fs.readFileSync(__dirname+'/src/01-quest-priority.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,'');
// [VI dòng gốc 4] Khai báo biến có thể gán lại bằng let: name = "Đạt cấp 280"; state = 1; level = 278; common = true; locked = false; starts = 0; job = "rảnh"; popup = false; match = false
let name='Đạt cấp 280',state=1,level=278,common=true,locked=false,starts=0,job='rảnh',popup=false,match=false;
// [VI dòng gốc 5] Khai báo biến không gán lại bằng const: timers = tạo đối tượng bằng Set(); stage = tạo đối tượng gồm auto; cfg = tạo đối tượng gồm questFirst, autoPublicExpMatching, enableVerifiedExp4Account
const timers=new Set(),stage={auto:false},cfg={questFirst:true,autoPublicExpMatching:true,enableVerifiedExp4Account:true};
// [VI dòng gốc 6] Khai báo biến không gán lại bằng const: W = tạo đối tượng gồm __KVPV_OWN_ACTOR_ID, _Ba, _ft, KVPV_DAILY, KVPV_V866, KVPV, KVPV_CONFIRM_POPUPS, setInterval, clearInterval | Kết thúc hàm hiện tại và trả về: level.
const W={__KVPV_OWN_ACTOR_ID:'a',_Ba:{_rJ:{_O$:{ins:{actorId:'a',get level(){return level;}}}},
// [VI dòng gốc 7] Kết thúc hàm hiện tại và trả về: tạo mảng gồm 3 vị trí: ['q',state,0].
 _zIt:{_FIt:{ins:{get taskInfo(){return ['q',state,0];}}}},_Co:{_Mo:{ins:stage}},
// [VI dòng gốc 8] Kết thúc hàm hiện tại và trả về: common.
 _$a:{SceneUtil:{get isCommonScene(){return common;}},_yo:{ins:{isInMission:false}}}},
// [VI dòng gốc 9] Thuộc tính _ft: tạo đối tượng gồm __Z | Thuộc tính __Z: tạo đối tượng gồm ins | Thuộc tính ins: tạo đối tượng gồm getTaskCfgById | Thuộc tính getTaskCfgById: tạo hàm với tham số (không có); mỗi lần gọi trả về tạo mảng gồm 7 vị trí: [0,name,0,0,0,0,0]
 _ft:{__Z:{ins:{getTaskCfgById:()=>[0,name,0,0,0,0,0]}}},
// [VI dòng gốc 10] tăng starts một đơn vị sau khi lấy giá trị | gán stage.auto bằng true
 KVPV_DAILY:{config:{enableTuVuot:false,enableYeuVuong:true,enableVinhDu:true,enableDaoTri:true,enableHongHoang:true},quickState:()=>({running:true,job}),tuVuotStart(){starts++;stage.auto=true;}},
// [VI dòng gốc 11] Thuộc tính KVPV_V866: tạo đối tượng gồm config, tick, status | Thuộc tính config: cfg | Thuộc tính tick: tạo hàm với tham số (không có) | Thuộc tính status: tạo hàm với tham số (không có); mỗi lần gọi trả về tạo đối tượng gồm soloIdleReason
 KVPV_V866:{config:cfg,tick(){},status:()=>({soloIdleReason:match?'Da gui EXP MATCH; cho server':''})},
// [VI dòng gốc 12] Thuộc tính KVPV: tạo đối tượng gồm stageGuard | Thuộc tính stageGuard: tạo đối tượng gồm isLocked | Thuộc tính isLocked: tạo hàm với tham số (không có); mỗi lần gọi trả về locked | Thuộc tính KVPV_CONFIRM_POPUPS: tạo đối tượng gồm beforeTask
 KVPV:{stageGuard:{isLocked:()=>locked}},KVPV_CONFIRM_POPUPS:{beforeTask:()=>popup},
// [VI dòng gốc 13] gọi timers.add(fn) | Kết thúc hàm hiện tại và trả về: fn. | gọi timers.delete(fn)
 setInterval(fn){timers.add(fn);return fn;},clearInterval(fn){timers.delete(fn);}};
// [VI dòng gốc 14] Khai báo biến không gán lại bằng const: ctx = gọi vm.createContext({window:W}); load = tạo hàm với tham số (không có); mỗi lần gọi trả về gọi vm.runInContext(source, ctx) | gọi load()
const ctx=vm.createContext({window:W}),load=()=>vm.runInContext(source,ctx);load();
// [VI dòng gốc 15] gọi assert.equal(starts, 1) để kiểm tra hai giá trị bằng nhau | Duyệt từng giá trị trong ['enableVinhDu','enableDaoTri'] bằng const key. | Khai báo biến không gán lại bằng const: key (chưa gán giá trị) | gọi assert.equal(W.KVPV_DAILY.config[key], false, 'side activity yields to missing EXP') để kiểm tra hai giá trị bằng nhau
assert.equal(starts,1);for(const key of ['enableVinhDu','enableDaoTri'])assert.equal(W.KVPV_DAILY.config[key],false,'side activity yields to missing EXP');assert.equal(W.KVPV_DAILY.config.enableYeuVuong,true,'level farming must not disable Demon King all day');assert.equal(cfg.questFirst,false);assert.equal(cfg.autoPublicExpMatching,false);
// [VI dòng gốc 16] gọi assert.equal(W.KVPV_QUEST_PRIORITY.blocks('daily_trial'), false, 'unrelated quest cannot starve free daily trials') để kiểm tra hai giá trị bằng nhau | gọi assert(W.KVPV_QUEST_PRIORITY.blocks('rune_boss')) để kiểm tra điều kiện của bài test
assert.equal(W.KVPV_QUEST_PRIORITY.blocks('daily_trial'),false,'unrelated quest cannot starve free daily trials');assert(W.KVPV_QUEST_PRIORITY.blocks('rune_boss'));
// [VI dòng gốc 17] gọi load() | gọi assert.equal(timers.size, 1) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(starts, 1, 'hot reload retains farming ownership') để kiểm tra hai giá trị bằng nhau
load();assert.equal(timers.size,1);assert.equal(starts,1,'hot reload retains farming ownership');
// [VI dòng gốc 18] gán common bằng false | gọi W.KVPV_QUEST_PRIORITY.sync() | gọi assert.equal(starts, 1, 'no entry while already fighting') để kiểm tra hai giá trị bằng nhau
common=false;W.KVPV_QUEST_PRIORITY.sync();assert.equal(starts,1,'no entry while already fighting');
// [VI dòng gốc 19] gán level bằng 280 | gọi W.KVPV_QUEST_PRIORITY.sync() | Duyệt từng giá trị trong ['enableVinhDu','enableDaoTri','enableHongHoang'] bằng const key. | Khai báo biến không gán lại bằng const: key (chưa gán giá trị)
level=280;W.KVPV_QUEST_PRIORITY.sync();for(const key of ['enableVinhDu','enableDaoTri','enableHongHoang'])assert.equal(W.KVPV_DAILY.config[key],true,'restore prior side activity settings after completion');assert.equal(stage.auto,false,'stop next entry at target level');assert.equal(cfg.questFirst,true);assert.equal(W.KVPV_DAILY.config.enableYeuVuong,true);assert.equal(W.KVPV_DAILY.config.enableTuVuot,false);
// [VI dòng gốc 20] gán common bằng true | gán level bằng 278 | gán locked bằng true | gọi W.KVPV_QUEST_PRIORITY.sync()
common=true;level=278;locked=true;W.KVPV_QUEST_PRIORITY.sync();assert.equal(starts,1,'manual pause respected');
// [VI dòng gốc 21] gán locked bằng false | gán match bằng true | gọi W.KVPV_QUEST_PRIORITY.sync() | gọi assert.equal(starts, 1, 'do not overlap unconfirmed EXP matchmaking') để kiểm tra hai giá trị bằng nhau
locked=false;match=true;W.KVPV_QUEST_PRIORITY.sync();assert.equal(starts,1,'do not overlap unconfirmed EXP matchmaking');
// [VI dòng gốc 22] gán match bằng false | gán job bằng 'exp' | gọi W.KVPV_QUEST_PRIORITY.sync() | gọi assert.equal(starts, 1) để kiểm tra hai giá trị bằng nhau
match=false;job='exp';W.KVPV_QUEST_PRIORITY.sync();assert.equal(starts,1);job='rảnh';popup=true;W.KVPV_QUEST_PRIORITY.sync();assert.equal(starts,1);
// [VI dòng gốc 23] gán popup bằng false | gán name bằng 'Tăng cấp kỹ năng 300' | gọi W.KVPV_QUEST_PRIORITY.sync() | gọi assert.equal(starts, 1, 'skill level is not character EXP') để kiểm tra hai giá trị bằng nhau
popup=false;name='Tăng cấp kỹ năng 300';W.KVPV_QUEST_PRIORITY.sync();assert.equal(starts,1,'skill level is not character EXP');
// [VI dòng gốc 24] Duyệt từng giá trị trong ['Cấp Thời Trang tăng đạt Lv175','Bồi dưỡng Linh Thú tăng đến Lv30','Bồi dưỡng Thú Cưỡi tăng đến Lv34'] bằng const objective. | Khai báo biến không gán lại bằng const: objective (chưa gán giá trị) | gán name bằng objective | gọi assert.equal(W.KVPV_QUEST_PRIORITY.status().levelGoal, null, 'upgrade objective must not use character level') để kiểm tra hai giá trị bằng nhau
for(const objective of ['Cấp Thời Trang tăng đạt Lv175','Bồi dưỡng Linh Thú tăng đến Lv30','Bồi dưỡng Thú Cưỡi tăng đến Lv34']){name=objective;assert.equal(W.KVPV_QUEST_PRIORITY.status().levelGoal,null,'upgrade objective must not use character level');}
// [VI dòng gốc 25] gán name bằng 'Khiêu chiến Boss Phù Văn' | gọi assert.equal(W.KVPV_QUEST_PRIORITY.blocks('rune_boss'), false, 'matching quest executor is allowed') để kiểm tra hai giá trị bằng nhau | gọi assert(W.KVPV_QUEST_PRIORITY.blocks('summon_boss')) để kiểm tra điều kiện của bài test
name='Khiêu chiến Boss Phù Văn';assert.equal(W.KVPV_QUEST_PRIORITY.blocks('rune_boss'),false,'matching quest executor is allowed');assert(W.KVPV_QUEST_PRIORITY.blocks('summon_boss'));
// [VI dòng gốc 26] gán name bằng 'Đạt cấp 280' | gọi W.KVPV_QUEST_PRIORITY.sync() | gọi assert.equal(starts, 2) để kiểm tra hai giá trị bằng nhau | gán state bằng 2
name='Đạt cấp 280';W.KVPV_QUEST_PRIORITY.sync();assert.equal(starts,2);state=2;W.KVPV_QUEST_PRIORITY.sync();assert.equal(stage.auto,false);assert(W.KVPV_QUEST_PRIORITY.hasPriority(),'claim remains priority');assert.equal(W.KVPV_QUEST_PRIORITY.blocks('daily_trial'),true,'ready quest reward remains first');
// [VI dòng gốc 27] gán W._Ba._rJ._O$.ins.actorId bằng 'b' | gọi W.KVPV_QUEST_PRIORITY.sync() | gọi assert.equal(timers.size, 0) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(W.KVPV_QUEST_PRIORITY.hasPriority(), false) để kiểm tra hai giá trị bằng nhau
W._Ba._rJ._O$.ins.actorId='b';W.KVPV_QUEST_PRIORITY.sync();assert.equal(timers.size,0);assert.equal(W.KVPV_QUEST_PRIORITY.hasPriority(),false);
// [VI dòng gốc 28] gọi console.log('PASS quest priority: level EXP -> existing Tian Quan, bounded level completion, reload no replay, manual pause, pending…)
console.log('PASS quest priority: level EXP -> existing Tian Quan, bounded level completion, reload no replay, manual pause, pending EXP/team/job/popup guards, relevant activity exception and actor ownership');
// [VI dòng gốc 29] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 30] gọi assert.equal(W.KVPV_DAILY.config.enableHongHoang, true, 'level farming never disables Hong Hoang') để kiểm tra hai giá trị bằng nhau
assert.equal(W.KVPV_DAILY.config.enableHongHoang,true,'level farming never disables Hong Hoang');
// [VI dòng gốc 31] gán W._Ba._rJ._O$.ins.actorId bằng 'a' | gán state bằng 1 | gán level bằng 278 | gán name bằng 'Đạt cấp 280'
W._Ba._rJ._O$.ins.actorId='a';state=1;level=278;name='Đạt cấp 280';let open=false;
// [VI dòng gốc 32] gán W._Ba._sst bằng {_ist:{inst:{getCpSceneStateByType:()=>[17,0,open?2:0]}}} | gán W._Ba._OBt bằng {_WBt:{inst:{getGathCountIsMax:()=>false}}}
W._Ba._sst={_ist:{inst:{getCpSceneStateByType:()=>[17,0,open?2:0]}}};W._Ba._OBt={_WBt:{inst:{getGathCountIsMax:()=>false}}};
// [VI dòng gốc 33] gọi load() | Khai báo biến không gán lại bằng const: previous = starts | gọi assert.equal(stage.auto, true) để kiểm tra hai giá trị bằng nhau | gán open bằng true
load();const previous=starts;assert.equal(stage.auto,true);open=true;W.KVPV_QUEST_PRIORITY.sync();assert.equal(stage.auto,false);assert.equal(starts,previous);assert.equal(W.KVPV_QUEST_PRIORITY.status().reason,'yield_to_open_honghoang');
// [VI dòng gốc 34] gán open bằng false | gọi W.KVPV_QUEST_PRIORITY.sync() | gọi assert.equal(starts, previous+1) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(stage.auto, true) để kiểm tra hai giá trị bằng nhau
open=false;W.KVPV_QUEST_PRIORITY.sync();assert.equal(starts,previous+1);assert.equal(stage.auto,true);
// [VI dòng gốc 35] gọi console.log('PASS Hong Hoang priority: EXP farming yields to confirmed open event without cancelling a battle, resumes after close.')
console.log('PASS Hong Hoang priority: EXP farming yields to confirmed open event without cancelling a battle, resumes after close.');
// [VI dòng gốc 36] Dòng trống để tách các phần, không có lệnh thực thi.
