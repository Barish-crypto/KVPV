// [VI dòng gốc 1] "use strict"
'use strict';
// [VI dòng gốc 2] Khai báo biến không gán lại bằng const: fs = gọi require('node:fs') để nạp module Node.js; vm = gọi require('node:vm') để nạp module Node.js; assert = gọi require('node:assert/strict') để nạp module Node.js
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
// [VI dòng gốc 3] Khai báo biến không gán lại bằng const: source = gọi fs.readFileSync(__dirname+'/src/31-skill-rewards.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm, '')
const source=fs.readFileSync(__dirname+'/src/31-skill-rewards.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,'');
// [VI dòng gốc 4] Khai báo biến không gán lại bằng const: rows = tạo đối tượng bằng Map([[100,[100,1]],[200,[200,0]],[300,[300,2]],[400,[400,1]]]); plugins = tạo đối tượng bằng Map(); timers = tạo đối tượng bằng Set(); sent = tạo mảng gồm 0 vị trí: []
const rows=new Map([[100,[100,1]],[200,[200,0]],[300,[300,2]],[400,[400,1]]]),plugins=new Map(),timers=new Set(),sent=[];
// [VI dòng gốc 5] Khai báo biến có thể gán lại bằng let: popup = false; now = 1000
let popup=false,now=1000;
// [VI dòng gốc 6] Khai báo biến không gán lại bằng const: W = tạo đối tượng gồm __KVPV_OWN_ACTOR_ID, _Ba, KVPV_CONFIRM_POPUPS, KVPV_V8, setInterval, clearInterval
const W={__KVPV_OWN_ACTOR_ID:'actor',_Ba:{_rJ:{_O$:{ins:{actorId:'actor'}}},_tYt:{
// [VI dòng gốc 7] Kết thúc hàm hiện tại và trả về: tạo mảng gồm 1 vị trí: [...rows.keys()].
 _hYt:{inst:{_NCt:{get keys(){return [...rows.keys()];}},getInfoById:id=>rows.get(id)}},
// [VI dòng gốc 8] Thuộc tính _aYt: tạo đối tượng gồm inst | Thuộc tính inst: tạo đối tượng gồm GetSkillHandbookInfoReward | Thuộc tính GetSkillHandbookInfoReward: tạo hàm với tham số id; mỗi lần gọi trả về gọi sent.push(id) để thêm phần tử vào cuối mảng
 _aYt:{inst:{GetSkillHandbookInfoReward:id=>sent.push(id)}}}},
// [VI dòng gốc 9] Thuộc tính KVPV_CONFIRM_POPUPS: tạo đối tượng gồm beforeTask | Thuộc tính beforeTask: tạo hàm với tham số (không có); mỗi lần gọi trả về popup
 KVPV_CONFIRM_POPUPS:{beforeTask:()=>popup},
// [VI dòng gốc 10] Kiểm tra plugins.has(p.id): đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('Trung module ID') | gọi plugins.set(p.id, p) | gán plugins.get(id).enabled bằng on
 KVPV_V8:{register(p){if(plugins.has(p.id))throw Error('Trung module ID');plugins.set(p.id,p);},toggle(id,on){plugins.get(id).enabled=on;}},
// [VI dòng gốc 11] gọi timers.add(fn) | Kết thúc hàm hiện tại và trả về: fn. | gọi timers.delete(fn)
 setInterval(fn){timers.add(fn);return fn;},clearInterval(fn){timers.delete(fn);}};
// [VI dòng gốc 12] Khai báo biến không gán lại bằng const: ctx = gọi vm.createContext({window:W,Date:{now:()=>now}}); load = tạo hàm với tham số (không có); mỗi lần gọi trả về gọi vm.runInContext(source, ctx) | gọi load()
const ctx=vm.createContext({window:W,Date:{now:()=>now}}),load=()=>vm.runInContext(source,ctx);load();
// [VI dòng gốc 13] Khai báo biến không gán lại bằng const: plugin = gọi plugins.get('skill_handbook_rewards') | gọi assert.equal(plugin.kind, 'claim') để kiểm tra hai giá trị bằng nhau | gọi assert.equal(plugin.spend, 'none') để kiểm tra hai giá trị bằng nhau | gọi assert.equal(plugin.background, true) để kiểm tra hai giá trị bằng nhau
const plugin=plugins.get('skill_handbook_rewards');assert.equal(plugin.kind,'claim');assert.equal(plugin.spend,'none');assert.equal(plugin.background,true);assert.equal(plugin.directDuringPve,true);
// [VI dòng gốc 14] gán popup bằng true | gọi assert.equal(plugin.probe().ready, false) để kiểm tra hai giá trị bằng nhau | gán popup bằng false
popup=true;assert.equal(plugin.probe().ready,false);popup=false;
// [VI dòng gốc 15] Khai báo biến có thể gán lại bằng let: p = gọi plugin.probe() | gọi assert.equal(p.id, 100) để kiểm tra hai giá trị bằng nhau | gọi plugin.run(p) | gọi assert.deepEqual(sent, [100]) để kiểm tra cấu trúc hai giá trị tương đương
let p=plugin.probe();assert.equal(p.id,100);plugin.run(p);assert.deepEqual(sent,[100]);assert.equal(plugin.probe().ready,false);
// [VI dòng gốc 16] gọi load() | gọi assert.equal(timers.size, 1) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(plugins.size, 1) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(plugin.probe().ready, false, 'reload retains pending request') để kiểm tra hai giá trị bằng nhau
load();assert.equal(timers.size,1);assert.equal(plugins.size,1);assert.equal(plugin.probe().ready,false,'reload retains pending request');
// [VI dòng gốc 17] cập nhật bằng toán tử += now bằng 60000 | gọi W.KVPV_SKILL_REWARDS.sync() | gọi assert.equal(W.KVPV_SKILL_REWARDS.status().reason, 'waiting_reward_ack_no_retry') để kiểm tra hai giá trị bằng nhau | gọi assert.deepEqual(sent, [100]) để kiểm tra cấu trúc hai giá trị tương đương
now+=60000;W.KVPV_SKILL_REWARDS.sync();assert.equal(W.KVPV_SKILL_REWARDS.status().reason,'waiting_reward_ack_no_retry');assert.deepEqual(sent,[100]);
// [VI dòng gốc 18] gọi rows.set(100, [100,2]) | gọi W.KVPV_SKILL_REWARDS.sync() | gọi assert.equal(W.KVPV_SKILL_REWARDS.status().confirmed, 1) để kiểm tra hai giá trị bằng nhau
rows.set(100,[100,2]);W.KVPV_SKILL_REWARDS.sync();assert.equal(W.KVPV_SKILL_REWARDS.status().confirmed,1);
// [VI dòng gốc 19] gán p bằng plugin.probe() | gọi assert.equal(p.id, 400) để kiểm tra hai giá trị bằng nhau | gọi rows.set(400, [400,2]) | gọi assert.throws(()=>plugin.run(p), /changed/, 'manual claim invalidates queued work') để kiểm tra đoạn mã có ném lỗi như dự kiến
p=plugin.probe();assert.equal(p.id,400);rows.set(400,[400,2]);assert.throws(()=>plugin.run(p),/changed/,'manual claim invalidates queued work');
// [VI dòng gốc 20] gọi assert.equal(plugin.probe().ready, false, 'locked and already claimed skills are excluded') để kiểm tra hai giá trị bằng nhau
assert.equal(plugin.probe().ready,false,'locked and already claimed skills are excluded');
// [VI dòng gốc 21] gọi rows.set(500, [500,1]) | gán p bằng plugin.probe() | gọi plugin.run(p) | gọi assert.deepEqual(sent, [100,500]) để kiểm tra cấu trúc hai giá trị tương đương
rows.set(500,[500,1]);p=plugin.probe();plugin.run(p);assert.deepEqual(sent,[100,500]);
// [VI dòng gốc 22] gọi rows.delete(500) | gọi assert.equal(plugin.probe().ready, false, 'missing server row is not an ACK') để kiểm tra hai giá trị bằng nhau
rows.delete(500);assert.equal(plugin.probe().ready,false,'missing server row is not an ACK');
// [VI dòng gốc 23] gán W._Ba._rJ._O$.ins.actorId bằng 'other' | gọi W.KVPV_SKILL_REWARDS.sync() | gọi assert.equal(plugin.enabled, false) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(timers.size, 0) để kiểm tra hai giá trị bằng nhau
W._Ba._rJ._O$.ins.actorId='other';W.KVPV_SKILL_REWARDS.sync();assert.equal(plugin.enabled,false);assert.equal(timers.size,0);
// [VI dòng gốc 24] gọi console.log('PASS skill rewards: native ready-only claims, shared queue, popup, server ACK, reload/timeout no replay, manual claim r…)
console.log('PASS skill rewards: native ready-only claims, shared queue, popup, server ACK, reload/timeout no replay, manual claim race, missing row and account guards');
// [VI dòng gốc 25] Dòng trống để tách các phần, không có lệnh thực thi.
