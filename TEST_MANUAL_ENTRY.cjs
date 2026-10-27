// [VI dòng gốc 1] "use strict"
'use strict';
// [VI dòng gốc 2] Khai báo biến không gán lại bằng const: fs = gọi require('fs') để nạp module Node.js; vm = gọi require('vm') để nạp module Node.js; assert = gọi require('assert/strict') để nạp module Node.js
const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');
// [VI dòng gốc 3] Khai báo biến không gán lại bằng const: calls = tạo mảng gồm 0 vị trí: []; W = tạo đối tượng gồm _Ba, KVPV_HITRUN1, KVPV_APPEARANCE_AUTO, KVPV | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('combat must remain') | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('upgrades must remain')
const calls=[],W={_Ba:{_Co:{_Mo:{ins:{auto:true}}}},KVPV_HITRUN1:{stop(){throw Error('combat must remain');}},KVPV_APPEARANCE_AUTO:{stop(){throw Error('upgrades must remain');}},KVPV:{core:{scene:{status:()=>({owner:'stage',tag:'tu-vuot'}),release:who=>calls.push(who)}}}};
// [VI dòng gốc 4] Duyệt từng giá trị trong ['KVPV_DAILY','KVPV_QUEST_PRIORITY','KVPV_TEAM_COORDINATOR','KVPV_BOSS_TEAM','KVPV_DAILY_TRIAL'] bằng const name. | Khai báo biến không gán lại bằng const: name (chưa gán giá trị) | gán W[name] bằng {stop:()=>calls.push(name)}
for(const name of ['KVPV_DAILY','KVPV_QUEST_PRIORITY','KVPV_TEAM_COORDINATOR','KVPV_BOSS_TEAM','KVPV_DAILY_TRIAL'])W[name]={stop:()=>calls.push(name)};
// [VI dòng gốc 5] Khai báo biến có thể gán lại bằng let: restarts = 0 | gán W.KVPV_DAILY.start bằng ()=>restarts++
let restarts=0;W.KVPV_DAILY.start=()=>restarts++;
// [VI dòng gốc 6] gọi vm.runInNewContext(fs.readFileSync('src/00-manual-entry-policy.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,''), {window:W}) để chạy mã trong ngữ cảnh máy ảo dùng cho kiểm thử | gọi assert.equal(W.KVPV_ENTRY_POLICY.manual, false, 'user requested full Auto Daily resumed') để kiểm tra hai giá trị bằng nhau
vm.runInNewContext(fs.readFileSync('src/00-manual-entry-policy.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,''),{window:W});assert.equal(W.KVPV_ENTRY_POLICY.manual,false,'user requested full Auto Daily resumed');
// [VI dòng gốc 7] gán W.KVPV_MANUAL_ENTRY bằng {status:()=>({manual:false})}
W.KVPV_MANUAL_ENTRY={status:()=>({manual:false})}; // Transition from previous automatic mode must disable stage auto.
// [VI dòng gốc 8] gán W.KVPV_ENTRY_POLICY bằng {manual:true} | gọi vm.runInNewContext(fs.readFileSync('src/99-manual-entry.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,''), {window:W}) để chạy mã trong ngữ cảnh máy ảo dùng cho kiểm thử
W.KVPV_ENTRY_POLICY={manual:true};vm.runInNewContext(fs.readFileSync('src/99-manual-entry.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,''),{window:W});
// [VI dòng gốc 9] gọi W.KVPV_DAILY.start() để khởi động bộ điều khiển | gọi assert.equal(restarts, 0, 'legacy quest helper cannot restart Daily') để kiểm tra hai giá trị bằng nhau
W.KVPV_DAILY.start();assert.equal(restarts,0,'legacy quest helper cannot restart Daily');
// [VI dòng gốc 10] gọi assert.equal(W._Ba._Co._Mo.ins.auto, false) để kiểm tra hai giá trị bằng nhau | gọi assert(calls.includes('KVPV_TEAM_COORDINATOR')) để kiểm tra điều kiện của bài test | gọi assert(calls.includes('KVPV_DAILY_TRIAL')) để kiểm tra điều kiện của bài test | gọi assert.deepEqual([...W.KVPV_MANUAL_ENTRY.status().errors], []) để kiểm tra cấu trúc hai giá trị tương đương
assert.equal(W._Ba._Co._Mo.ins.auto,false);assert(calls.includes('KVPV_TEAM_COORDINATOR'));assert(calls.includes('KVPV_DAILY_TRIAL'));assert.deepEqual([...W.KVPV_MANUAL_ENTRY.status().errors],[]);
// [VI dòng gốc 11] Chú thích gốc của tác giả; không được thực thi. Nội dung: Cập nhật giữ cờ native người chơi đã bật, kể cả khi Daily.stop() tắt nó trong lúc dọn module.
// Cập nhật giữ cờ native người chơi đã bật, kể cả khi Daily.stop() tắt nó trong lúc dọn module.
// [VI dòng gốc 12] gán W._Ba._Co._Mo.ins.auto bằng true | gán W.KVPV_DAILY.stop bằng ()=>{W._Ba._Co._Mo.ins.auto=false;} | gán W._Ba._Co._Mo.ins.auto bằng false
W._Ba._Co._Mo.ins.auto=true;W.KVPV_DAILY.stop=()=>{W._Ba._Co._Mo.ins.auto=false;};
// [VI dòng gốc 13] gọi vm.runInNewContext(fs.readFileSync('src/99-manual-entry.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,''), {window:W}) để chạy mã trong ngữ cảnh máy ảo dùng cho kiểm thử
vm.runInNewContext(fs.readFileSync('src/99-manual-entry.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,''),{window:W});
// [VI dòng gốc 14] gọi assert.equal(W._Ba._Co._Mo.ins.auto, true) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(W.KVPV_MANUAL_ENTRY.status().stageAutoPreserved, true) để kiểm tra hai giá trị bằng nhau
assert.equal(W._Ba._Co._Mo.ins.auto,true);assert.equal(W.KVPV_MANUAL_ENTRY.status().stageAutoPreserved,true);
// [VI dòng gốc 15] gán W._Ba._Co._Mo.ins.auto bằng false
W._Ba._Co._Mo.ins.auto=false;
// [VI dòng gốc 16] gọi vm.runInNewContext(fs.readFileSync('src/99-manual-entry.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,''), {window:W}) để chạy mã trong ngữ cảnh máy ảo dùng cho kiểm thử
vm.runInNewContext(fs.readFileSync('src/99-manual-entry.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,''),{window:W});
// [VI dòng gốc 17] gọi assert.equal(W._Ba._Co._Mo.ins.auto, false, 'manual pause remains paused after update') để kiểm tra hai giá trị bằng nhau
assert.equal(W._Ba._Co._Mo.ins.auto,false,'manual pause remains paused after update');
// [VI dòng gốc 18] Khai báo biến có thể gán lại bằng let: resumed = 0 | Khai báo biến không gán lại bằng const: pending = tạo đối tượng gồm id, status
let resumed=0;const pending={id:9,status:'waiting_ack'};
// [VI dòng gốc 19] Khai báo biến không gán lại bằng const: R = tạo đối tượng gồm __KVPV_OWN_ACTOR_ID, _Ba, KVPV_ENTRY_POLICY, KVPV_MAIN_SOLO, KVPV_V8, KVPV_DAILY
const R={__KVPV_OWN_ACTOR_ID:'12345',_Ba:{_rJ:{_O$:{ins:{actorId:'12345'}}}},KVPV_ENTRY_POLICY:{manual:false},
// [VI dòng gốc 20] Thuộc tính KVPV_MAIN_SOLO: tạo đối tượng gồm resume | Thuộc tính resume: tạo hàm với tham số (không có); mỗi lần gọi trả về tăng resumed một đơn vị sau khi lấy giá trị | Thuộc tính KVPV_V8: tạo đối tượng gồm start | Thuộc tính start: tạo hàm với tham số (không có); mỗi lần gọi trả về tăng resumed một đơn vị sau khi lấy giá trị
 KVPV_MAIN_SOLO:{resume:()=>resumed++},KVPV_V8:{start:()=>resumed++},
// [VI dòng gốc 21] Thuộc tính KVPV_DAILY: tạo đối tượng gồm pending, start, tuVuotStart | Thuộc tính pending: dùng biến cùng tên | Thuộc tính start: tạo hàm với tham số (không có); mỗi lần gọi trả về tăng resumed một đơn vị sau khi lấy giá trị | Thuộc tính tuVuotStart: tạo hàm với tham số (không có); mỗi lần gọi trả về tăng resumed một đơn vị sau khi lấy giá trị
 KVPV_DAILY:{pending,start:()=>resumed++,tuVuotStart:()=>resumed++}};
// [VI dòng gốc 22] gọi vm.runInNewContext(fs.readFileSync('src/99-manual-entry.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,''), {window:R}) để chạy mã trong ngữ cảnh máy ảo dùng cho kiểm thử
vm.runInNewContext(fs.readFileSync('src/99-manual-entry.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,''),{window:R});
// [VI dòng gốc 23] gọi assert.equal(resumed, 4) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(R.KVPV_MANUAL_ENTRY.status().manual, false) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(R.KVPV_DAILY.pending, pending) để kiểm tra hai giá trị bằng nhau
assert.equal(resumed,4);assert.equal(R.KVPV_MANUAL_ENTRY.status().manual,false);assert.equal(R.KVPV_DAILY.pending,pending);
// [VI dòng gốc 24] gọi vm.runInNewContext(fs.readFileSync('src/99-manual-entry.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,''), {window:R}) để chạy mã trong ngữ cảnh máy ảo dùng cho kiểm thử | gọi assert.equal(resumed, 4, 'restart request is not replayed on hot reload') để kiểm tra hai giá trị bằng nhau
vm.runInNewContext(fs.readFileSync('src/99-manual-entry.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,''),{window:R});assert.equal(resumed,4,'restart request is not replayed on hot reload');
// [VI dòng gốc 25] gán R._Ba._rJ._O$.ins.actorId bằng 'other' | gọi vm.runInNewContext(fs.readFileSync('src/99-manual-entry.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,''), {window:R}) để chạy mã trong ngữ cảnh máy ảo dùng cho kiểm thử | gọi assert.equal(resumed, 4, 'wrong actor cannot restart') để kiểm tra hai giá trị bằng nhau
R._Ba._rJ._O$.ins.actorId='other';vm.runInNewContext(fs.readFileSync('src/99-manual-entry.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,''),{window:R});assert.equal(resumed,4,'wrong actor cannot restart');
// [VI dòng gốc 26] Khai báo biến không gán lại bằng const: entryModules = tạo mảng gồm 11 vị trí: ['01-quest-priority.js','14-eight-floor.js','16-strongest-team.js','20-daily-trial.js','23-beast-island.js','24-summon-boss.js','25-rune-boss.js','46-team-coordinator.js','47-boss-…
const entryModules=['01-quest-priority.js','14-eight-floor.js','16-strongest-team.js','20-daily-trial.js','23-beast-island.js','24-summon-boss.js','25-rune-boss.js','46-team-coordinator.js','47-boss-team.js','48-guild-boss.js','51-demon-king-recovery.js'];
// [VI dòng gốc 27] Duyệt từng giá trị trong entryModules bằng const name. | Khai báo biến không gán lại bằng const: name (chưa gán giá trị) | Khai báo biến không gán lại bằng const: code = gọi fs.readFileSync('src/'+name,'utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm, ''); fn = nếu name==='01-quest-priority.js' thì lấy 'sync', ngược lại lấy 'tick' | gọi assert(code.includes('function '+fn+'(){if(W.KVPV_ENTRY_POLICY?.manual===true)return;'), name+' cannot send on first tick/rearm…) để kiểm tra điều kiện của bài test
for(const name of entryModules){const code=fs.readFileSync('src/'+name,'utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,''),fn=name==='01-quest-priority.js'?'sync':'tick';assert(code.includes('function '+fn+'(){if(W.KVPV_ENTRY_POLICY?.manual===true)return;'),name+' cannot send on first tick/rearm');}
// [VI dòng gốc 28] Khai báo biến không gán lại bằng const: ctx = tạo đối tượng gồm window | gọi vm.runInNewContext(fs.readFileSync('src/20-daily-trial.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,''), ctx) để chạy mã trong ngữ cảnh máy ảo dùng cho kiểm thử | gọi assert.equal(ctx.window.KVPV_DAILY_TRIAL.hasPriority(), false) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(ctx.window.KVPV_DAILY_TRIAL.status().inFlight, false) để kiểm tra hai giá trị bằng nhau
const ctx={window:{KVPV_ENTRY_POLICY:{manual:true},__KVPV_OWN_ACTOR_ID:'12345',setInterval:()=>1,clearInterval(){}}};vm.runInNewContext(fs.readFileSync('src/20-daily-trial.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,''),ctx);assert.equal(ctx.window.KVPV_DAILY_TRIAL.hasPriority(),false);assert.equal(ctx.window.KVPV_DAILY_TRIAL.status().inFlight,false);
// [VI dòng gốc 29] gọi console.log('PASS manual boss/dungeon policy: no first-tick entry, team controllers stopped/restored, stage auto off, combat/upgrade…)
console.log('PASS manual boss/dungeon policy: no first-tick entry, team controllers stopped/restored, stage auto off, combat/upgrades retained');
// [VI dòng gốc 30] Dòng trống để tách các phần, không có lệnh thực thi.
