// [VI dòng gốc 1] Khai báo biến không gán lại bằng const: fs = gọi require('fs') để nạp module Node.js; vm = gọi require('vm') để nạp module Node.js; assert = gọi require('node:assert/strict') để nạp module Node.js
const fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict');
// [VI dòng gốc 2] Khai báo biến có thể gán lại bằng let: now = 1000; have = 3; oldBusy = true; skill = 11 | Khai báo biến không gán lại bằng const: cells = tạo đối tượng bằng Map([[10,11]]); sent = tạo mảng gồm 0 vị trí: []; timers = tạo đối tượng bằng Set()
let now=1000,have=3,oldBusy=true,skill=11;const cells=new Map([[10,11]]),sent=[],timers=new Set();
// [VI dòng gốc 3] Khai báo biến không gán lại bằng const: model = tạo đối tượng gồm getValueByPos, otherValue
const model={getValueByPos:()=>cells,otherValue:[1,true,0,10]};
// [VI dòng gốc 4] Khai báo biến không gán lại bằng const: W = tạo đối tượng gồm __KVPV_OWN_ACTOR_ID, _Ba, _ft, _v, KVPV_UPGRADES, KVPV_PARALLEL_ACTIONS, setInterval, clearInterval | gọi assert.equal(ms, 1) để kiểm tra hai giá trị bằng nhau | gọi timers.add(f) | Kết thúc hàm hiện tại và trả về: f.
const W={__KVPV_OWN_ACTOR_ID:'12345',_Ba:{_rJ:{_O$:{ins:{actorId:'12345',equipsDic:{keys:[1]}}}},_ZE:{_Qgt:{ins:model},_Jgt:{ins:{oneKeyHandler:a=>sent.push(a)}}},_Ic:{_aQ:{ins:{getItemCountById:()=>have}}},_Xo:{_Ko:{instance:{getRpKeyState:()=>true}}}},_ft:{_Qyn:{ins:{stoneMaxLv:2,maxLv:3,getCfgById:id=>[id,0,0,1,0,id===11?1:2,4],getUpStoneByLev:()=>[0,10]}}},_v:{ins:{send:(...a)=>sent.push(a)}},KVPV_MATERIAL_RESERVE:{active:true},KVPV_UPGRADES:{config:{daHon:true}},KVPV_PARALLEL_ACTIONS:{legacyBusy:()=>oldBusy,canDirectDuringPve:()=>true},setInterval:(f,ms)=>{assert.equal(ms,50);timers.add(f);return f;},clearInterval:f=>timers.delete(f)};
// [VI dòng gốc 5] Khai báo biến không gán lại bằng const: ctx = tạo đối tượng gồm window, Date; load = tạo hàm với tham số (không có); mỗi lần gọi trả về gọi vm.runInNewContext(fs.readFileSync('src/40-soul-stone-fast.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,''), ctx) để chạy mã trong ngữ cảnh máy ảo dùng cho kiểm thử | gọi load() | gọi assert.equal(sent.length, 0) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(W.KVPV_UPGRADES.config.daHon, false) để kiểm tra hai giá trị bằng nhau
const ctx={window:W,Date:{now:()=>now}},load=()=>vm.runInNewContext(fs.readFileSync('src/40-soul-stone-fast.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,''),ctx);load();assert.equal(sent.length,0);assert.equal(W.KVPV_UPGRADES.config.daHon,false);
// [VI dòng gốc 6] gán oldBusy bằng false | gọi W.KVPV_SOUL_STONE_FAST.sync() | gọi assert.deepEqual(Array.from(sent[0]), [1,2]) để kiểm tra cấu trúc hai giá trị tương đương | gọi load()
oldBusy=false;W.KVPV_SOUL_STONE_FAST.sync();assert.deepEqual(Array.from(sent[0]),[1,2]);load();W.KVPV_SOUL_STONE_FAST.sync();assert.equal(sent.length,1,'no replay before model update');
// [VI dòng gốc 7] gọi cells.set(10, 12) | gán have bằng 0 | gọi W.KVPV_SOUL_STONE_FAST.sync() | gọi assert.deepEqual(Array.from(sent[1]), ['TBhu',null]) để kiểm tra cấu trúc hai giá trị tương đương
cells.set(10,12);have=0;W.KVPV_SOUL_STONE_FAST.sync();assert.deepEqual(Array.from(sent[1]),['TBhu',null]);W.KVPV_SOUL_STONE_FAST.sync();assert.equal(sent.length,2);
// [VI dòng gốc 8] gán model.otherValue[0] bằng 2 | gán model.otherValue[1] bằng false | gọi W.KVPV_SOUL_STONE_FAST.sync() | gọi assert.equal(W.KVPV_SOUL_STONE_FAST.status().confirmed, 2) để kiểm tra hai giá trị bằng nhau
model.otherValue[0]=2;model.otherValue[1]=false;W.KVPV_SOUL_STONE_FAST.sync();assert.equal(W.KVPV_SOUL_STONE_FAST.status().confirmed,2);W.KVPV_SOUL_STONE_FAST.stop();assert.equal(timers.size,0);
// [VI dòng gốc 9] Khai báo biến không gán lại bằng const: plugins = tạo đối tượng bằng Map(); tasks = tạo mảng gồm 2 vị trí: [{_id:1,_state:1,_curtimes:0,_str:'Completed currency spending'},{_id:2,_state:0,_curtimes:0}]
const plugins=new Map(),tasks=[{_id:1,_state:1,_curtimes:0,_str:'Completed currency spending'},{_id:2,_state:0,_curtimes:0}];
// [VI dòng gốc 10] gán W._Ba._Je bằng {_bJ:{ins:{stageTaskList:tasks,seasonTaskList:[]}},_Qe:{ins:{getStageTaskReward:id=>sent.push(id)}}}
W._Ba._Je={_bJ:{ins:{stageTaskList:tasks,seasonTaskList:[]}},_Qe:{ins:{getStageTaskReward:id=>sent.push(id)}}};
// [VI dòng gốc 11] gán W.KVPV_V8 bằng {register:p=>{if(plugins.has(p.id))throw Error('already exists');plugins.set(p.id,p);},toggle(){}} | Kiểm tra plugins.has(p.id): đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('already exists') | gọi plugins.set(p.id, p)
W.KVPV_V8={register:p=>{if(plugins.has(p.id))throw Error('already exists');plugins.set(p.id,p);},toggle(){}};
// [VI dòng gốc 12] Khai báo biến không gán lại bằng const: season = tạo hàm với tham số (không có); mỗi lần gọi trả về gọi vm.runInNewContext(fs.readFileSync('src/41-season-rewards.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,''), ctx) để chạy mã trong ngữ cảnh máy ảo dùng cho kiểm thử | gọi season() | Khai báo biến có thể gán lại bằng let: p = gọi W.KVPV_SEASON_REWARDS._probe(); chức năng nội bộ chưa xác minh từ tên hàm | gọi assert.equal(p.id, 1) để kiểm tra hai giá trị bằng nhau
const season=()=>vm.runInNewContext(fs.readFileSync('src/41-season-rewards.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,''),ctx);season();let p=W.KVPV_SEASON_REWARDS._probe();assert.equal(p.id,1);W.KVPV_SEASON_REWARDS._run(p);season();assert.equal(W.KVPV_SEASON_REWARDS._probe().ready,false);
// [VI dòng gốc 13] gán tasks[0]._state bằng 2 | gọi assert.equal(W.KVPV_SEASON_REWARDS._probe().ready, false) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(W.KVPV_SEASON_REWARDS.status().confirmed, 1) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(sent.at(-1), 1, 'completed spending reward never sends a purchase') để kiểm tra hai giá trị bằng nhau
tasks[0]._state=2;assert.equal(W.KVPV_SEASON_REWARDS._probe().ready,false);assert.equal(W.KVPV_SEASON_REWARDS.status().confirmed,1);assert.equal(sent.at(-1),1,'completed spending reward never sends a purchase');
// [VI dòng gốc 14] gọi console.log('PASS dedicated 50ms stone scanner: legacy drain, native upgrade/master calls, ACK/reload; season completed task rewards …)
console.log('PASS dedicated 50ms stone scanner: legacy drain, native upgrade/master calls, ACK/reload; season completed task rewards without purchases');
// [VI dòng gốc 15] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 16] Khai báo biến không gán lại bằng const: seasonModel = đọc W._Ba._Je._bJ.ins | gọi Object.assign(seasonModel, {jiuxiaolingMyLevel:3,jiuxiaolingHaveRewardLV:1,jiuxiaolingHaveGoldenRewardLV:0,goldenState:0})
const seasonModel=W._Ba._Je._bJ.ins;Object.assign(seasonModel,{jiuxiaolingMyLevel:3,jiuxiaolingHaveRewardLV:1,jiuxiaolingHaveGoldenRewardLV:0,goldenState:0});
// [VI dòng gốc 17] gán W._Ba._Je._Qe.ins.getJiuXiaoLingReward bằng ()=>sent.push('level_reward')
W._Ba._Je._Qe.ins.getJiuXiaoLingReward=()=>sent.push('level_reward');
// [VI dòng gốc 18] gán p bằng W.KVPV_SEASON_REWARDS._probe() | gọi assert.equal(p.kind, 'level') để kiểm tra hai giá trị bằng nhau | gọi W.KVPV_SEASON_REWARDS._run(p); chức năng nội bộ chưa xác minh từ tên hàm | gọi assert.equal(sent.at(-1), 'level_reward') để kiểm tra hai giá trị bằng nhau
p=W.KVPV_SEASON_REWARDS._probe();assert.equal(p.kind,'level');W.KVPV_SEASON_REWARDS._run(p);assert.equal(sent.at(-1),'level_reward');
// [VI dòng gốc 19] gọi season() | gọi assert.equal(W.KVPV_SEASON_REWARDS._probe().ready, false, 'milestone request not replayed after reload') để kiểm tra hai giá trị bằng nhau
season();assert.equal(W.KVPV_SEASON_REWARDS._probe().ready,false,'milestone request not replayed after reload');
// [VI dòng gốc 20] gán seasonModel.jiuxiaolingHaveRewardLV bằng 3 | gọi assert.equal(W.KVPV_SEASON_REWARDS._probe().ready, false, 'unowned golden track is not claimed') để kiểm tra hai giá trị bằng nhau
seasonModel.jiuxiaolingHaveRewardLV=3;assert.equal(W.KVPV_SEASON_REWARDS._probe().ready,false,'unowned golden track is not claimed');
// [VI dòng gốc 21] gán seasonModel.goldenState bằng 1 | gán p bằng W.KVPV_SEASON_REWARDS._probe() | gọi assert.equal(p.kind, 'level') để kiểm tra hai giá trị bằng nhau | gọi W.KVPV_SEASON_REWARDS._run(p); chức năng nội bộ chưa xác minh từ tên hàm
seasonModel.goldenState=1;p=W.KVPV_SEASON_REWARDS._probe();assert.equal(p.kind,'level');W.KVPV_SEASON_REWARDS._run(p);
// [VI dòng gốc 22] gán seasonModel.jiuxiaolingHaveGoldenRewardLV bằng 3 | gọi assert.equal(W.KVPV_SEASON_REWARDS._probe().ready, false) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(W.KVPV_SEASON_REWARDS.status().confirmed, 3) để kiểm tra hai giá trị bằng nhau
seasonModel.jiuxiaolingHaveGoldenRewardLV=3;assert.equal(W.KVPV_SEASON_REWARDS._probe().ready,false);assert.equal(W.KVPV_SEASON_REWARDS.status().confirmed,3);
// [VI dòng gốc 23] gọi console.log('PASS season level milestones: free and already-owned golden track, no purchase, ACK and reload exclusion')
console.log('PASS season level milestones: free and already-owned golden track, no purchase, ACK and reload exclusion');
// [VI dòng gốc 24] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 25] Chú thích gốc của tác giả; không được thực thi. Nội dung: Dedicated replacement takes over resource worker and waits for its old send.
// Dedicated replacement takes over resource worker and waits for its old send.
// [VI dòng gốc 26] gán W.KVPV_SOUL_STONE_FAST bằng undefined | Khai báo biến không gán lại bằng const: workerCfg = tạo đối tượng gồm soulStone | Khai báo biến có thể gán lại bằng let: priorPending = true
W.KVPV_SOUL_STONE_FAST=undefined;const workerCfg={soulStone:true};let priorPending=true;
// [VI dòng gốc 27] gán W.KVPV_BG_RESOURCES bằng {config:{enabled:workerCfg},status:()=>({pending:priorPending?{kind:'soulStone'}:null})}
W.KVPV_BG_RESOURCES={config:{enabled:workerCfg},status:()=>({pending:priorPending?{kind:'soulStone'}:null})};
// [VI dòng gốc 28] Khai báo biến không gán lại bằng const: bag = đọc W._Ba._Ic._aQ.ins | Khai báo biến có thể gán lại bằng let: replacement = 21 | gán bag.getItemsByBagType bằng ()=>[[replacement,1,999]] | gán bag.getItemCountById bằng id=>id===replacement?1:0
const bag=W._Ba._Ic._aQ.ins;let replacement=21;bag.getItemsByBagType=()=>[[replacement,1,999]];bag.getItemCountById=id=>id===replacement?1:0;
// [VI dòng gốc 29] gán W._ft._Qyn.ins.getCfgById bằng id=>[id,0,0,1,0,id===11?1:id===21?3:1,4] | gán W._ft._Qyn.ins.stoneMaxLv bằng 4 | gán model.otherValue[1] bằng false | gọi cells.set(10, 11)
W._ft._Qyn.ins.getCfgById=id=>[id,0,0,1,0,id===11?1:id===21?3:1,4];W._ft._Qyn.ins.stoneMaxLv=4;model.otherValue[1]=false;cells.set(10,11);cells.set(11,21);
// [VI dòng gốc 30] Khai báo biến không gán lại bằng const: base = đọc sent.length | gọi load() | gọi assert.equal(workerCfg.soulStone, false) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(sent.length, base, 'old worker pending must drain') để kiểm tra hai giá trị bằng nhau
const base=sent.length;load();assert.equal(workerCfg.soulStone,false);assert.equal(sent.length,base,'old worker pending must drain');
// [VI dòng gốc 31] gán priorPending bằng false | gọi W.KVPV_SOUL_STONE_FAST.sync() | gọi assert.deepEqual(Array.from(sent.at(-1)), [1,1], 'quick replace uses native action 1') để kiểm tra cấu trúc hai giá trị tương đương
priorPending=false;W.KVPV_SOUL_STONE_FAST.sync();assert.deepEqual(Array.from(sent.at(-1)),[1,1],'quick replace uses native action 1');
// [VI dòng gốc 32] gọi load() | gọi W.KVPV_SOUL_STONE_FAST.sync() | gọi assert.equal(sent.length, base+1, 'replacement not replayed across reload') để kiểm tra hai giá trị bằng nhau
load();W.KVPV_SOUL_STONE_FAST.sync();assert.equal(sent.length,base+1,'replacement not replayed across reload');
// [VI dòng gốc 33] gọi cells.set(10, 21) | gán replacement bằng 22 | gọi W.KVPV_SOUL_STONE_FAST.sync() | gọi assert.equal(sent.length, base+1, 'lower level same-type stone never replaces current') để kiểm tra hai giá trị bằng nhau
cells.set(10,21);replacement=22;W.KVPV_SOUL_STONE_FAST.sync();assert.equal(sent.length,base+1,'lower level same-type stone never replaces current');
// [VI dòng gốc 34] gọi W.KVPV_SOUL_STONE_FAST.stop() để dừng bộ điều khiển và dọn tài nguyên | gọi assert.equal(workerCfg.soulStone, true, 'manual stop restores previous worker ownership') để kiểm tra hai giá trị bằng nhau
W.KVPV_SOUL_STONE_FAST.stop();assert.equal(workerCfg.soulStone,true,'manual stop restores previous worker ownership');
// [VI dòng gốc 35] gọi console.log('PASS quick replacement: higher same-type only, sole sender takeover/drain, native action, reload no replay and restore')
console.log('PASS quick replacement: higher same-type only, sole sender takeover/drain, native action, reload no replay and restore');
// [VI dòng gốc 36] Dòng trống để tách các phần, không có lệnh thực thi.
