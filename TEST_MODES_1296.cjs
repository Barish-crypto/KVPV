// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: Kiểm thử mô phỏng: MODES_1296. Các assert bên dưới ghi điều kiện phải giữ; không chứng minh máy chủ game chấp nhận tốc độ hoặc tầm đánh. [đóng chú thích]
/* Kiểm thử mô phỏng: MODES_1296. Các assert bên dưới ghi điều kiện phải giữ; không chứng minh máy chủ game chấp nhận tốc độ hoặc tầm đánh. */
// [VI dòng gốc 2] "use strict"
'use strict';
// [VI dòng gốc 3] Khai báo biến không gán lại bằng const: assert = gọi require('assert') để nạp module Node.js; fs = gọi require('fs') để nạp module Node.js; vm = gọi require('vm') để nạp module Node.js
const assert=require('assert'),fs=require('fs'),vm=require('vm');
// [VI dòng gốc 4] Khai báo biến không gán lại bằng const: f = tính biểu thức __dirname+'/KVPV_V1_FULL.js'
const f=__dirname+'/KVPV_V1_FULL.js';
// [VI dòng gốc 5] Khai báo biến không gán lại bằng const: code = gọi fs.readFileSync(f, 'utf8') để đọc tệp đồng bộ
const code=fs.readFileSync(f,'utf8');
// [VI dòng gốc 6] Khai báo biến không gán lại bằng const: marker = "[mở chú thích] ================================================================\n * KVPV V12.9.4 — MANUAL COMBAT MODES"
const marker='/* ================================================================\n * KVPV V12.9.4 — MANUAL COMBAT MODES';
// [VI dòng gốc 7] Khai báo biến không gán lại bằng const: index = gọi code.lastIndexOf(marker)
// Windows Git may check out source files as CRLF, while this marker uses LF.
const markerIndex=text=>String(text).replace(/\r\n/g,'\n').lastIndexOf(marker);
const index=markerIndex(code);
// [VI dòng gốc 8] gọi assert(index>0, 'mode manager included in full') để kiểm tra điều kiện của bài test
assert(index>0,'mode manager included in full (LF or CRLF)');
assert(markerIndex('prefix\r\n'+marker.replace(/\n/g,'\r\n'))>0,'CRLF marker detection regression');
// [VI dòng gốc 9] Khai báo biến không gán lại bằng const: manager = gọi fs.readFileSync(__dirname+'/src/09-modes.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm, '')
const manager=fs.readFileSync(__dirname+'/src/09-modes.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,'');
// [VI dòng gốc 10] Khai báo biến có thể gán lại bằng let: passed = 0
let passed=0;
// [VI dòng gốc 11] Định nghĩa hàm harness; tham số: không có
function harness(){
// [VI dòng gốc 12] Khai báo biến có thể gán lại bằng let: actor = "10228867268946"; stand = false; range = false; auto = true; boss = true; pvp = false; pvpMode = "OFF"; th = false; thStarts = 0
 let actor='10228867268946', stand=false,range=false,auto=true,boss=true,pvp=false,pvpMode='OFF',th=false,thStarts=0;
// [VI dòng gốc 13] Khai báo biến có thể gán lại bằng let: stopBoss = 0; stopAuto = 0; stopPvP = 0; standEnabled = 0; rangeEnabled = 0; rearms = 0; requests = tạo mảng gồm 0 vị trí: []
 let stopBoss=0,stopAuto=0,stopPvP=0,standEnabled=0,rangeEnabled=0,rearms=0,requests=[];
// [VI dòng gốc 14] Khai báo biến có thể gán lại bằng let: throwPvP = false; longRunning = false; longMode = "OFF"; trial = 281
 let throwPvP=false, longRunning=false, longMode='OFF',trial=281; 
// [VI dòng gốc 15] Khai báo biến không gán lại bằng const: log = tạo mảng gồm 0 vị trí: []
 const log=[];
// [VI dòng gốc 16] Khai báo biến không gán lại bằng const: W = tạo đối tượng gồm __KVPV_OWN_ACTOR_ID, _Ba, console, KVPV, KVPV_TH300, KVPV_TH_FAR, KVPV_STAND281, KVPV_RANGE281, KVPV_HITRUN1, KVPV_HITRUN_AUTO, KVPV_V128_PVP
 const W={__KVPV_OWN_ACTOR_ID:actor,_Ba:{_rJ:{_O$:{ins:{actorId:actor}}}},
// [VI dòng gốc 17] gọi log.push(['warn',...x]) để thêm phần tử vào cuối mảng | gọi log.push(['info',...x]) để thêm phần tử vào cuối mảng
   console:{warn(...x){log.push(['warn',...x]);},info(...x){log.push(['info',...x]);},table(){}},
// [VI dòng gốc 18] Thuộc tính KVPV: tạo đối tượng gồm combat, daily | Thuộc tính combat: tạo đối tượng gồm config | Thuộc tính config: tạo đối tượng gồm autoArm | Thuộc tính autoArm: true
   KVPV:{combat:{config:{autoArm:true}},daily:{preserveMe:true}},
// [VI dòng gốc 19] gán longRunning bằng true | gán longMode bằng mode | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm running. | gán longRunning bằng false
   KVPV_TH300:{start(mode){longRunning=true;longMode=mode;return{running:true};},stop(){longRunning=false;longMode='OFF';return{running:false};},status(){return{running:longRunning,operation:longMode,goalDistance:302,confirmedOver300:[{id:1001}]};}},
// [VI dòng gốc 20] gán th bằng true | tăng thStarts một đơn vị sau khi lấy giá trị | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm enabled. | gán th bằng false
   KVPV_TH_FAR:{start(){th=true;thStarts++;return{enabled:true};},stop(){th=false;return{enabled:false};},status(){return{enabled:th,goalDistance:280.4,confirmedTH:3};}},
// [VI dòng gốc 21] gán stand bằng v | tăng standEnabled một đơn vị sau khi lấy giá trị | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm enabled. | gọi requests.push('reset-stand') để thêm phần tử vào cuối mảng
   KVPV_STAND281:{enable(v){stand=v;standEnabled++;return{enabled:stand};},reset(){requests.push('reset-stand');},status(){return{enabled:stand,activeGoal:280.8};}},
// [VI dòng gốc 22] gán trial bằng v | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm trialRange. | gán range bằng v | tăng rangeEnabled một đơn vị sau khi lấy giá trị
   KVPV_RANGE281:{setTrialRange(v){trial=v;return{trialRange:v};},enable(v){range=v;rangeEnabled++;return{enabled:range};},status(){return{enabled:range,hookAttached:true};}},
// [VI dòng gốc 23] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm running, phase. | gán boss bằng false | tăng stopBoss một đơn vị sau khi lấy giá trị
   KVPV_HITRUN1:{status(){return{running:boss,phase:boss?'FIGHT':'OFF'};},stop(){boss=false;stopBoss++;}},
// [VI dòng gốc 24] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm enabled. | gán auto bằng false | gán boss bằng false | tăng stopAuto một đơn vị sau khi lấy giá trị
   KVPV_HITRUN_AUTO:{status(){return{enabled:auto};},stop(){auto=false;boss=false;stopAuto++;},rearm(){auto=true;rearms++;}},
// [VI dòng gốc 25] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm running, mode. | Kiểm tra throwPvP: đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('no selected player') | gán pvp bằng true
   KVPV_V128_PVP:{status(){return{running:pvp,mode:pvpMode};},start(o){if(throwPvP)throw Error('no selected player');pvp=true;pvpMode=o.mode;requests.push('pvp-'+o.mode);return{running:pvp,mode:pvpMode};},stop(){pvp=false;pvpMode='OFF';stopPvP++;}},
// [VI dòng gốc 26] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
 };
// [VI dòng gốc 27] gán W._Ba._rJ._O$.ins.actorId bằng actor
 W._Ba._rJ._O$.ins.actorId=actor;
// [VI dòng gốc 28] gọi vm.runInNewContext(manager, {window:W,console:W.console,Date,Number,Math,Object,Error,String,Array}, {timeout:3000}) để chạy mã trong ngữ cảnh máy ảo dùng cho kiểm thử
 vm.runInNewContext(manager,{window:W,console:W.console,Date,Number,Math,Object,Error,String,Array}, {timeout:3000});
// [VI dòng gốc 29] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm W, log, requests, state, setTargetMissing, changeActor.
 return {W,log,requests,state:()=>({actor,stand,range,auto,boss,pvp,pvpMode,th,thStarts,stopBoss,stopAuto,stopPvP,standEnabled,rangeEnabled,rearms}),
// [VI dòng gốc 30] gán throwPvP bằng v | gán W._Ba._rJ._O$.ins.actorId bằng newId
   setTargetMissing(v){throwPvP=v;},changeActor(newId){W._Ba._rJ._O$.ins.actorId=newId;},};
// [VI dòng gốc 31] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 32] Định nghĩa hàm test; tham số: name, fn | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | gọi fn() | tăng passed một đơn vị sau khi lấy giá trị
function test(name,fn){try{fn();passed++;console.log('PASS',name);}catch(e){console.error('FAIL',name,e.stack);process.exitCode=1;}}
// [VI dòng gốc 33] gọi test('starts OFF, disables old Boss polling even if prior FULL autoarmed', ()=>{ const q=harness(),s=q.W.KVPV_MODE.status(fal…)
test('starts OFF, disables old Boss polling even if prior FULL autoarmed',()=>{
// [VI dòng gốc 34] Khai báo biến không gán lại bằng const: q = gọi harness(); s = gọi q.W.KVPV_MODE.status(false) để trả trạng thái để kiểm tra
 const q=harness(),s=q.W.KVPV_MODE.status(false);
// [VI dòng gốc 35] gọi assert.equal(s.mode, 'OFF') để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.state().auto, false) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.state().boss, false) để kiểm tra hai giá trị bằng nhau
 assert.equal(s.mode,'OFF');assert.equal(q.state().auto,false);assert.equal(q.state().boss,false);
// [VI dòng gốc 36] gọi assert.equal(q.state().stand, false) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.state().range, false) để kiểm tra hai giá trị bằng nhau
 assert.equal(q.state().stand,false);assert.equal(q.state().range,false);
// [VI dòng gốc 37] gọi assert.equal(q.W.KVPV.combat.config.autoArm, false) để kiểm tra hai giá trị bằng nhau
 assert.equal(q.W.KVPV.combat.config.autoArm,false);
// [VI dòng gốc 38] gọi assert.equal(q.W.KVPV.daily.preserveMe, true) để kiểm tra hai giá trị bằng nhau
 assert.equal(q.W.KVPV.daily.preserveMe,true);
// [VI dòng gốc 39] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 40] gọi test('BOSS uses native range and rearms HitRun without experimental positioning', ()=>{ const q=harness();const v=q.W.KVPV_MO…)
test('BOSS uses native range and rearms HitRun without experimental positioning',()=>{
// [VI dòng gốc 41] Khai báo biến không gán lại bằng const: q = gọi harness() | Khai báo biến không gán lại bằng const: v = gọi q.W.KVPV_MODE.start('BOSS') để khởi động bộ điều khiển
 const q=harness();const v=q.W.KVPV_MODE.start('BOSS');
// [VI dòng gốc 42] gọi assert.equal(v.mode, 'BOSS') để kiểm tra hai giá trị bằng nhau | gọi assert.equal(v.bossAutoEnabled, true) để kiểm tra hai giá trị bằng nhau
 assert.equal(v.mode,'BOSS');assert.equal(v.bossAutoEnabled,true);
// [VI dòng gốc 43] gọi assert.equal(v.stand281Enabled, false) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(v.range281Enabled, false) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(v.tuyetHocOnly, false) để kiểm tra hai giá trị bằng nhau
 assert.equal(v.stand281Enabled,false);assert.equal(v.range281Enabled,false);assert.equal(v.tuyetHocOnly,false);
// [VI dòng gốc 44] gọi assert.equal(q.W.KVPV.combat.config.autoArm, true) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.state().rearms, 1) để kiểm tra hai giá trị bằng nhau
 assert.equal(q.W.KVPV.combat.config.autoArm,true);assert.equal(q.state().rearms,1);
// [VI dòng gốc 45] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 46] gọi test('repeated BOSS start does not restart current session', ()=>{ const q=harness();q.W.KVPV_MODE.start('BOSS');q.W.KVPV_MOD…)
test('repeated BOSS start does not restart current session',()=>{
// [VI dòng gốc 47] Khai báo biến không gán lại bằng const: q = gọi harness() | gọi q.W.KVPV_MODE.start('BOSS') để khởi động bộ điều khiển
 const q=harness();q.W.KVPV_MODE.start('BOSS');q.W.KVPV_MODE.start('BOSS');
// [VI dòng gốc 48] gọi assert.equal(q.state().rearms, 1) để kiểm tra hai giá trị bằng nhau
 assert.equal(q.state().rearms,1);
// [VI dòng gốc 49] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 50] gọi test('PVP rejected without changing active Boss mode', ()=>{ const q=harness();q.W.KVPV_MODE.start('BOSS');assert.throws(()=>…)
test('PVP rejected without changing active Boss mode',()=>{
// [VI dòng gốc 51] Khai báo biến không gán lại bằng const: q = gọi harness() | gọi q.W.KVPV_MODE.start('BOSS') để khởi động bộ điều khiển | gọi assert.throws(()=>q.W.KVPV_MODE.start('PVP'), /Chọn BOSS/) để kiểm tra đoạn mã có ném lỗi như dự kiến | gọi assert.equal(q.W.KVPV_MODE.status(false).mode, 'BOSS') để kiểm tra hai giá trị bằng nhau
 const q=harness();q.W.KVPV_MODE.start('BOSS');assert.throws(()=>q.W.KVPV_MODE.start('PVP'),/Chọn BOSS/);assert.equal(q.W.KVPV_MODE.status(false).mode,'BOSS');
// [VI dòng gốc 52] gọi test('all removed PK aliases rejected from OFF', ()=>{ const q=harness();for(const mode of ['PVP','PVP_GUARD','TRUTIEN','TRU_…)
});test('all removed PK aliases rejected from OFF',()=>{
// [VI dòng gốc 53] Khai báo biến không gán lại bằng const: q = gọi harness() | Duyệt từng giá trị trong ['PVP','PVP_GUARD','TRUTIEN','TRU_TIEN','ALL_IN'] bằng const mode. | Khai báo biến không gán lại bằng const: mode (chưa gán giá trị) | gọi assert.throws(()=>q.W.KVPV_MODE.start(mode), /Chọn BOSS/) để kiểm tra đoạn mã có ném lỗi như dự kiến
 const q=harness();for(const mode of ['PVP','PVP_GUARD','TRUTIEN','TRU_TIEN','ALL_IN'])assert.throws(()=>q.W.KVPV_MODE.start(mode),/Chọn BOSS/);assert.equal(q.W.KVPV_MODE.status(false).mode,'OFF');
// [VI dòng gốc 54] gọi test('manual stop disables Boss combat', ()=>{ const q=harness();q.W.KVPV_MODE.start('BOSS');const v=q.W.KVPV_MODE.stop();ass…)
});test('manual stop disables Boss combat',()=>{
// [VI dòng gốc 55] Khai báo biến không gán lại bằng const: q = gọi harness() | gọi q.W.KVPV_MODE.start('BOSS') để khởi động bộ điều khiển | Khai báo biến không gán lại bằng const: v = gọi q.W.KVPV_MODE.stop() để dừng bộ điều khiển và dọn tài nguyên | gọi assert.equal(v.mode, 'OFF') để kiểm tra hai giá trị bằng nhau
 const q=harness();q.W.KVPV_MODE.start('BOSS');const v=q.W.KVPV_MODE.stop();assert.equal(v.mode,'OFF');assert.equal(v.bossAutoEnabled,false);assert.equal(v.stand281Enabled,false);
// [VI dòng gốc 56] gọi test('Boss works without any PvP module installed', ()=>{ const q=harness();delete q.W.KVPV_V128_PVP;delete q.W.KVPV_RANGE281…)
});test('Boss works without any PvP module installed',()=>{
// [VI dòng gốc 57] Khai báo biến không gán lại bằng const: q = gọi harness() | xóa thuộc tính q.W.KVPV_V128_PVP | xóa thuộc tính q.W.KVPV_RANGE281 | xóa thuộc tính q.W.KVPV_STAND281
 const q=harness();delete q.W.KVPV_V128_PVP;delete q.W.KVPV_RANGE281;delete q.W.KVPV_STAND281;
// [VI dòng gốc 58] gọi assert.equal(q.W.KVPV_MODE.start('BOSS').mode, 'BOSS') để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.state().rearms, 1) để kiểm tra hai giá trị bằng nhau
 assert.equal(q.W.KVPV_MODE.start('BOSS').mode,'BOSS');assert.equal(q.W.KVPV_MODE.start('BOSS').mode,'BOSS');assert.equal(q.state().rearms,1);
// [VI dòng gốc 59] gọi assert.equal(q.W.KVPV_MODE.stop().mode, 'OFF') để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.W.KVPV_MODE.modes.PVP, undefined) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.W.KVPV_MODE.modes.TRUTIEN, undefined) để kiểm tra hai giá trị bằng nhau
 assert.equal(q.W.KVPV_MODE.stop().mode,'OFF');assert.equal(q.W.KVPV_MODE.modes.PVP,undefined);assert.equal(q.W.KVPV_MODE.modes.TRUTIEN,undefined);
// [VI dòng gốc 60] gọi test('rejects running on different actor', ()=>{ const q=harness();q.changeActor('another'); assert.throws(()=>q.W.KVPV_MODE.…)
});test('rejects running on different actor',()=>{
// [VI dòng gốc 61] Khai báo biến không gán lại bằng const: q = gọi harness() | gọi q.changeActor('another')
 const q=harness();q.changeActor('another');
// [VI dòng gốc 62] gọi assert.throws(()=>q.W.KVPV_MODE.start('BOSS'), /game-frame/) để kiểm tra đoạn mã có ném lỗi như dự kiến
 assert.throws(()=>q.W.KVPV_MODE.start('BOSS'),/game-frame/);
// [VI dòng gốc 63] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 64] gọi test('aliases and unknown mode validated without changing state', ()=>{ const q=harness();assert.equal(q.W.KVPV_MODE.start('B…)
test('aliases and unknown mode validated without changing state',()=>{
// [VI dòng gốc 65] Khai báo biến không gán lại bằng const: q = gọi harness() | gọi assert.equal(q.W.KVPV_MODE.start('BOSS_281').mode, 'BOSS') để kiểm tra hai giá trị bằng nhau
 const q=harness();assert.equal(q.W.KVPV_MODE.start('BOSS_281').mode,'BOSS');
// [VI dòng gốc 66] gọi assert.throws(()=>q.W.KVPV_MODE.start('INVENTED'), /Chọn BOSS/) để kiểm tra đoạn mã có ném lỗi như dự kiến
 assert.throws(()=>q.W.KVPV_MODE.start('INVENTED'),/Chọn BOSS/);
// [VI dòng gốc 67] gọi assert.equal(q.W.KVPV_MODE.status(false).mode, 'BOSS') để kiểm tra hai giá trị bằng nhau
 assert.equal(q.W.KVPV_MODE.status(false).mode,'BOSS');
// [VI dòng gốc 68] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 69] gọi test('legacy marker fixed, early BossPosition context protected', ()=>{ assert(!code.includes('KVPV_COMBO317')); assert(code.…)
test('legacy marker fixed, early BossPosition context protected',()=>{
// [VI dòng gốc 70] gọi assert(!code.includes('KVPV_COMBO317')) để kiểm tra điều kiện của bài test
 assert(!code.includes('KVPV_COMBO317'));
// [VI dòng gốc 71] gọi assert(code.includes("if (typeof _Ba === 'undefined' || typeof _C === 'undefined' ||")) để kiểm tra điều kiện của bài test
 assert(code.includes("if (typeof _Ba === 'undefined' || typeof _C === 'undefined' ||"));
// [VI dòng gốc 72] gọi assert(code.includes('W.KVPV_RANGE281=')===false) để kiểm tra điều kiện của bài test
 assert(code.includes('W.KVPV_RANGE281=')===false); // uses W[name] in module
// [VI dòng gốc 73] gọi assert(code.includes('W[NAME]=api;')) để kiểm tra điều kiện của bài test
 assert(code.includes('W[NAME]=api;'));
// [VI dòng gốc 74] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 75] gọi test('BOSS_TH enables TH-only at 280.4 and disables old basic distance keeper', ()=>{ const q=harness();const v=q.W.KVPV_MODE…)
test('BOSS_TH enables TH-only at 280.4 and disables old basic distance keeper',()=>{
// [VI dòng gốc 76] Khai báo biến không gán lại bằng const: q = gọi harness() | Khai báo biến không gán lại bằng const: v = gọi q.W.KVPV_MODE.start('BOSS_TH') để khởi động bộ điều khiển
 const q=harness();const v=q.W.KVPV_MODE.start('BOSS_TH');
// [VI dòng gốc 77] gọi assert.equal(v.mode, 'BOSS_TH') để kiểm tra hai giá trị bằng nhau | gọi assert.equal(v.bossAutoEnabled, true) để kiểm tra hai giá trị bằng nhau
 assert.equal(v.mode,'BOSS_TH');assert.equal(v.bossAutoEnabled,true);
// [VI dòng gốc 78] gọi assert.equal(v.stand281Enabled, false) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(v.tuyetHocOnly, true) để kiểm tra hai giá trị bằng nhau
 assert.equal(v.stand281Enabled,false);assert.equal(v.tuyetHocOnly,true);
// [VI dòng gốc 79] gọi assert.equal(v.bossDistanceTarget, 280.4) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.state().thStarts, 1) để kiểm tra hai giá trị bằng nhau
 assert.equal(v.bossDistanceTarget,280.4);assert.equal(q.state().thStarts,1);
// [VI dòng gốc 80] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 81] gọi test('repeated BOSS_TH is idempotent', ()=>{ const q=harness();q.W.KVPV_MODE.start('BOSS_TH');q.W.KVPV_MODE.start('BOSS_TH');…)
test('repeated BOSS_TH is idempotent',()=>{
// [VI dòng gốc 82] Khai báo biến không gán lại bằng const: q = gọi harness() | gọi q.W.KVPV_MODE.start('BOSS_TH') để khởi động bộ điều khiển
 const q=harness();q.W.KVPV_MODE.start('BOSS_TH');q.W.KVPV_MODE.start('BOSS_TH');
// [VI dòng gốc 83] gọi assert.equal(q.state().thStarts, 1) để kiểm tra hai giá trị bằng nhau
 assert.equal(q.state().thStarts,1);
// [VI dòng gốc 84] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 85] gọi test('switching BOSS_TH to BOSS stops TH hook', ()=>{ const q=harness();q.W.KVPV_MODE.start('BOSS_TH');const s=q.W.KVPV_MODE.…)
test('switching BOSS_TH to BOSS stops TH hook',()=>{
// [VI dòng gốc 86] Khai báo biến không gán lại bằng const: q = gọi harness() | gọi q.W.KVPV_MODE.start('BOSS_TH') để khởi động bộ điều khiển | Khai báo biến không gán lại bằng const: s = gọi q.W.KVPV_MODE.start('BOSS') để khởi động bộ điều khiển | gọi assert.equal(s.mode, 'BOSS') để kiểm tra hai giá trị bằng nhau
 const q=harness();q.W.KVPV_MODE.start('BOSS_TH');const s=q.W.KVPV_MODE.start('BOSS');assert.equal(s.mode,'BOSS');assert.equal(s.tuyetHocOnly,false);
// [VI dòng gốc 87] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 88] gọi test('BOSS_TH300_SCAN extends guarded client trial to 312 and starts scanning', ()=>{const q=harness();const s=q.W.KVPV_MODE.…) | Khai báo biến không gán lại bằng const: q = gọi harness() | Khai báo biến không gán lại bằng const: s = gọi q.W.KVPV_MODE.start('BOSS_TH300_SCAN') để khởi động bộ điều khiển | gọi assert.equal(s.mode, 'BOSS_TH300_SCAN') để kiểm tra hai giá trị bằng nhau
test('BOSS_TH300_SCAN extends guarded client trial to 312 and starts scanning',()=>{const q=harness();const s=q.W.KVPV_MODE.start('BOSS_TH300_SCAN');assert.equal(s.mode,'BOSS_TH300_SCAN');assert.equal(s.bossDistanceTarget,302);assert.equal(s.longScan,true);assert.equal(s.stand281Enabled,false);});
// [VI dòng gốc 89] gọi test('BOSS_TH300 enters strict mode using verified only and disables basic stand mode', ()=>{const q=harness();q.W.KVPV_MODE.…) | Khai báo biến không gán lại bằng const: q = gọi harness() | gọi q.W.KVPV_MODE.start('BOSS_TH300_SCAN') để khởi động bộ điều khiển | Khai báo biến không gán lại bằng const: s = gọi q.W.KVPV_MODE.start('BOSS_TH300') để khởi động bộ điều khiển
test('BOSS_TH300 enters strict mode using verified only and disables basic stand mode',()=>{const q=harness();q.W.KVPV_MODE.start('BOSS_TH300_SCAN');const s=q.W.KVPV_MODE.start('BOSS_TH300');assert.equal(s.mode,'BOSS_TH300');assert.equal(s.longScan,false);assert.equal(s.tuyetHocOnly,true);assert.equal(s.stand281Enabled,false);});
// [VI dòng gốc 90] gọi test('BOSS_TH300 stop releases long skill mode', ()=>{const q=harness();q.W.KVPV_MODE.start('BOSS_TH300');const s=q.W.KVPV_MO…) | Khai báo biến không gán lại bằng const: q = gọi harness() | gọi q.W.KVPV_MODE.start('BOSS_TH300') để khởi động bộ điều khiển | Khai báo biến không gán lại bằng const: s = gọi q.W.KVPV_MODE.stop() để dừng bộ điều khiển và dọn tài nguyên
test('BOSS_TH300 stop releases long skill mode',()=>{const q=harness();q.W.KVPV_MODE.start('BOSS_TH300');const s=q.W.KVPV_MODE.stop();assert.equal(s.mode,'OFF');assert.equal(s.tuyetHocOnly,false);});
// [VI dòng gốc 91] gọi test('armed but inactive Boss exposes actual auto-start blocking reason', ()=>{const q=harness();q.W.KVPV_HITRUN_AUTO.status=…) | Khai báo biến không gán lại bằng const: q = gọi harness() | gán q.W.KVPV_HITRUN_AUTO.status bằng ()=>({enabled:true,lastMode:'scene-busy',lastBlocked:'daily job',lastError:''}) | Khai báo biến không gán lại bằng const: s = gọi q.W.KVPV_MODE.start('BOSS') để khởi động bộ điều khiển
test('armed but inactive Boss exposes actual auto-start blocking reason',()=>{const q=harness();q.W.KVPV_HITRUN_AUTO.status=()=>({enabled:true,lastMode:'scene-busy',lastBlocked:'daily job',lastError:''});const s=q.W.KVPV_MODE.start('BOSS');assert.equal(s.bossRunning,false);assert.equal(s.bossAutoState,'scene-busy');assert.equal(s.bossAutoBlocked,'daily job');assert.match(s.reason,/daily job/);});
// [VI dòng gốc 92] gọi test('dead character cannot arm a new Boss or far-skill session', ()=>{const q=harness();q.W._Ba._rJ._O$.ins.isDead=true;asse…) | Khai báo biến không gán lại bằng const: q = gọi harness() | gán q.W._Ba._rJ._O$.ins.isDead bằng true | gọi assert.throws(()=>q.W.KVPV_MODE.start('BOSS_TH300_SCAN'), /hồi sinh/) để kiểm tra đoạn mã có ném lỗi như dự kiến
test('dead character cannot arm a new Boss or far-skill session',()=>{const q=harness();q.W._Ba._rJ._O$.ins.isDead=true;assert.throws(()=>q.W.KVPV_MODE.start('BOSS_TH300_SCAN'),/hồi sinh/);assert.equal(q.W.KVPV_MODE.status(false).mode,'OFF');assert.equal(q.state().rearms,0);});
// [VI dòng gốc 93] gọi test('outside stage waits natively, enters SCAN, exits and restores defaults, reenters automatically', ()=>{ const q=harness(…)
test('outside stage waits natively, enters SCAN, exits and restores defaults, reenters automatically',()=>{
// [VI dòng gốc 94] Khai báo biến không gán lại bằng const: q = gọi harness() | Khai báo biến có thể gán lại bằng let: inside = false | gán q.W.KVPV_TQ_SCOPE bằng {inside:()=>inside}
 const q=harness();let inside=false;q.W.KVPV_TQ_SCOPE={inside:()=>inside};
// [VI dòng gốc 95] Khai báo biến không gán lại bằng const: s = gọi q.W.KVPV_MODE.start('BOSS_TH300_SCAN') để khởi động bộ điều khiển | gọi assert.equal(s.mode, 'OFF') để kiểm tra hai giá trị bằng nhau | gọi assert.equal(s.tianQuanOnly, true) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.state().auto, false) để kiểm tra hai giá trị bằng nhau
 const s=q.W.KVPV_MODE.start('BOSS_TH300_SCAN');assert.equal(s.mode,'OFF');assert.equal(s.tianQuanOnly,true);assert.equal(q.state().auto,false);assert.equal(q.state().range,false);
// [VI dòng gốc 96] gán inside bằng true | gọi q.W.KVPV_MODE.syncMap() | gọi assert.equal(q.W.KVPV_MODE.status(false).mode, 'BOSS_TH300_SCAN') để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.state().auto, true) để kiểm tra hai giá trị bằng nhau
 inside=true;q.W.KVPV_MODE.syncMap();assert.equal(q.W.KVPV_MODE.status(false).mode,'BOSS_TH300_SCAN');assert.equal(q.state().auto,true);
// [VI dòng gốc 97] gán inside bằng false | gọi q.W.KVPV_MODE.syncMap() | gọi assert.equal(q.state().range, false) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.state().auto, false) để kiểm tra hai giá trị bằng nhau
 inside=false;q.W.KVPV_MODE.syncMap();assert.equal(q.state().range,false);assert.equal(q.state().auto,false);assert.equal(q.W.KVPV_MODE.status(false).tuyetHocOnly,false);
// [VI dòng gốc 98] gán inside bằng true | gọi q.W.KVPV_MODE.syncMap() | gọi assert.equal(q.W.KVPV_MODE.status(false).mode, 'BOSS_TH300_SCAN') để kiểm tra hai giá trị bằng nhau
 inside=true;q.W.KVPV_MODE.syncMap();assert.equal(q.W.KVPV_MODE.status(false).mode,'BOSS_TH300_SCAN');
// [VI dòng gốc 99] gọi q.W.KVPV_MODE.stop() để dừng bộ điều khiển và dọn tài nguyên | gán inside bằng false | gọi q.W.KVPV_MODE.syncMap() | gán inside bằng true
 q.W.KVPV_MODE.stop();inside=false;q.W.KVPV_MODE.syncMap();inside=true;q.W.KVPV_MODE.syncMap();assert.equal(q.W.KVPV_MODE.status(false).mode,'OFF');assert.equal(q.W.KVPV_MODE.status(false).tianQuanOnly,false);
// [VI dòng gốc 100] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 101] gọi test('FULL startup automatically arms map watcher and logger without attacking outside map', ()=>{ const q=harness();let insi…)
test('FULL startup automatically arms map watcher and logger without attacking outside map',()=>{
// [VI dòng gốc 102] Khai báo biến không gán lại bằng const: q = gọi harness() | Khai báo biến có thể gán lại bằng let: inside = false; logs = 0 | gán q.W.KVPV_TQ_SCOPE bằng {inside:()=>inside} | gán q.W.KVPV_BOSS_LOG bằng {start(){logs++;}}
 const q=harness();let inside=false,logs=0;q.W.KVPV_TQ_SCOPE={inside:()=>inside};q.W.KVPV_BOSS_LOG={start(){logs++;}};
// [VI dòng gốc 103] Khai báo biến không gán lại bằng const: startup = gọi fs.readFileSync(__dirname+'/src/11-auto-tianquan.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm, '')
 const startup=fs.readFileSync(__dirname+'/src/11-auto-tianquan.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,'');
// [VI dòng gốc 104] gọi vm.runInNewContext(startup, {window:q.W,console:q.W.console,String}) để chạy mã trong ngữ cảnh máy ảo dùng cho kiểm thử
 vm.runInNewContext(startup,{window:q.W,console:q.W.console,String});
// [VI dòng gốc 105] gọi assert.equal(logs, 1) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.W.KVPV_MODE.status(false).pendingTianQuanMode, 'BOSS') để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.state().auto, false) để kiểm tra hai giá trị bằng nhau
 assert.equal(logs,1);assert.equal(q.W.KVPV_MODE.status(false).pendingTianQuanMode,'BOSS');assert.equal(q.state().auto,false);
// [VI dòng gốc 106] gán inside bằng true | gọi q.W.KVPV_MODE.syncMap() | gọi assert.equal(q.W.KVPV_MODE.status(false).mode, 'BOSS') để kiểm tra hai giá trị bằng nhau
 inside=true;q.W.KVPV_MODE.syncMap();assert.equal(q.W.KVPV_MODE.status(false).mode,'BOSS');
// [VI dòng gốc 107] gọi q.W.KVPV_MODE.stop() để dừng bộ điều khiển và dọn tài nguyên | gọi q.W.KVPV_MODE.syncMap() | gọi assert.equal(q.W.KVPV_MODE.status(false).mode, 'OFF') để kiểm tra hai giá trị bằng nhau
 q.W.KVPV_MODE.stop();q.W.KVPV_MODE.syncMap();assert.equal(q.W.KVPV_MODE.status(false).mode,'OFF');
// [VI dòng gốc 108] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 109] gọi test('unproven STRICT request starts SCAN instead of waiting forever', ()=>{ const q=harness(),original=q.W.KVPV_TH300.status…)
test('unproven STRICT request starts SCAN instead of waiting forever',()=>{
// [VI dòng gốc 110] Khai báo biến không gán lại bằng const: q = gọi harness(); original = đọc q.W.KVPV_TH300.status
 const q=harness(),original=q.W.KVPV_TH300.status;
// [VI dòng gốc 111] gán q.W.KVPV_TH300.status bằng ()=>({...original(),confirmedSkills:[],confirmedOver300:[]})
 q.W.KVPV_TH300.status=()=>({...original(),confirmedSkills:[],confirmedOver300:[]});
// [VI dòng gốc 112] gọi assert.equal(q.W.KVPV_MODE.start('BOSS_TH300').mode, 'BOSS_TH300_SCAN') để kiểm tra hai giá trị bằng nhau
 assert.equal(q.W.KVPV_MODE.start('BOSS_TH300').mode,'BOSS_TH300_SCAN');
// [VI dòng gốc 113] gọi assert.equal(q.W.KVPV_MODE.status(false).longScan, true) để kiểm tra hai giá trị bằng nhau
 assert.equal(q.W.KVPV_MODE.status(false).longScan,true);
// [VI dòng gốc 114] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 115] gọi test('new Boss without proofs automatically leaves STRICT for SCAN', ()=>{ const q=harness();q.W.KVPV_MODE.start('BOSS_TH300'…)
test('new Boss without proofs automatically leaves STRICT for SCAN',()=>{
// [VI dòng gốc 116] Khai báo biến không gán lại bằng const: q = gọi harness() | gọi q.W.KVPV_MODE.start('BOSS_TH300') để khởi động bộ điều khiển | gọi assert.equal(q.W.KVPV_MODE.status(false).mode, 'BOSS_TH300') để kiểm tra hai giá trị bằng nhau
 const q=harness();q.W.KVPV_MODE.start('BOSS_TH300');assert.equal(q.W.KVPV_MODE.status(false).mode,'BOSS_TH300');
// [VI dòng gốc 117] Khai báo biến không gán lại bằng const: original = đọc q.W.KVPV_TH300.status | gán q.W.KVPV_TH300.status bằng ()=>({...original(),confirmedSkills:[],confirmedOver300:[]})
 const original=q.W.KVPV_TH300.status;q.W.KVPV_TH300.status=()=>({...original(),confirmedSkills:[],confirmedOver300:[]});
// [VI dòng gốc 118] gọi q.W.KVPV_MODE.syncMap() | gọi assert.equal(q.W.KVPV_MODE.status(false).mode, 'BOSS_TH300_SCAN') để kiểm tra hai giá trị bằng nhau
 q.W.KVPV_MODE.syncMap();assert.equal(q.W.KVPV_MODE.status(false).mode,'BOSS_TH300_SCAN');
// [VI dòng gốc 119] gọi assert.equal(q.W.KVPV_MODE.status(false).pendingTianQuanMode, 'BOSS_TH300_SCAN') để kiểm tra hai giá trị bằng nhau
 assert.equal(q.W.KVPV_MODE.status(false).pendingTianQuanMode,'BOSS_TH300_SCAN');
// [VI dòng gốc 120] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 121] gọi test('armed stage combo survives death/revival but manual mode stop stays stopped', ()=>{ const q=harness();q.W.KVPV_TQ_SCOPE…)
test('armed stage combo survives death/revival but manual mode stop stays stopped',()=>{
// [VI dòng gốc 122] Khai báo biến không gán lại bằng const: q = gọi harness() | gán q.W.KVPV_TQ_SCOPE bằng {inside:()=>true} | gọi q.W.KVPV_MODE.armTianQuan() để đăng ký bộ theo dõi map để tự bật bộ combat khi vào phó bản phù hợp | Khai báo biến không gán lại bằng const: n = đọc q.state().rearms
 const q=harness();q.W.KVPV_TQ_SCOPE={inside:()=>true};q.W.KVPV_MODE.armTianQuan();const n=q.state().rearms;
// [VI dòng gốc 123] gán q.W._Ba._rJ._O$.ins.isDead bằng true | gọi q.W.KVPV_MODE.syncMap() | gọi assert.equal(q.state().auto, false) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.W.KVPV_MODE.status(false).mode, 'OFF') để kiểm tra hai giá trị bằng nhau
 q.W._Ba._rJ._O$.ins.isDead=true;q.W.KVPV_MODE.syncMap();assert.equal(q.state().auto,false);assert.equal(q.W.KVPV_MODE.status(false).mode,'OFF');assert.equal(q.W.KVPV_MODE.status(false).autoMaintain,true);
// [VI dòng gốc 124] gán q.W._Ba._rJ._O$.ins.isDead bằng false | gọi q.W.KVPV_MODE.syncMap() | gọi assert.equal(q.state().rearms, n+1) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.W.KVPV_MODE.status(false).mode, 'BOSS_TH300_SCAN') để kiểm tra hai giá trị bằng nhau
 q.W._Ba._rJ._O$.ins.isDead=false;q.W.KVPV_MODE.syncMap();assert.equal(q.state().rearms,n+1);assert.equal(q.W.KVPV_MODE.status(false).mode,'BOSS_TH300_SCAN');
// [VI dòng gốc 125] gọi q.W.KVPV_MODE.stop() để dừng bộ điều khiển và dọn tài nguyên | gọi q.W.KVPV_MODE.syncMap() | gọi assert.equal(q.state().rearms, n+1) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.W.KVPV_MODE.status(false).autoMaintain, false) để kiểm tra hai giá trị bằng nhau
 q.W.KVPV_MODE.stop();q.W.KVPV_MODE.syncMap();assert.equal(q.state().rearms,n+1);assert.equal(q.W.KVPV_MODE.status(false).autoMaintain,false);
// [VI dòng gốc 126] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 127] gọi test('continuous stage maintenance restores missing far module and only repairs polling without rearming failed Boss attempts…)
test('continuous stage maintenance restores missing far module and only repairs polling without rearming failed Boss attempts',()=>{
// [VI dòng gốc 128] Khai báo biến không gán lại bằng const: q = gọi harness() | gán q.W.KVPV_TQ_SCOPE bằng {inside:()=>true} | gọi q.W.KVPV_MODE.armTianQuan() để đăng ký bộ theo dõi map để tự bật bộ combat khi vào phó bản phù hợp | gọi q.W.KVPV_TH300.stop() để dừng bộ điều khiển và dọn tài nguyên
 const q=harness();q.W.KVPV_TQ_SCOPE={inside:()=>true};q.W.KVPV_MODE.armTianQuan();q.W.KVPV_TH300.stop();const n=q.state().rearms;
// [VI dòng gốc 129] gọi q.W.KVPV_MODE.syncMap() | gọi assert.equal(q.state().rearms, n+1) để kiểm tra hai giá trị bằng nhau | gọi assert(q.W.KVPV_TH300.status().running) để kiểm tra điều kiện của bài test
 q.W.KVPV_MODE.syncMap();assert.equal(q.state().rearms,n+1);assert(q.W.KVPV_TH300.status().running);
// [VI dòng gốc 130] Khai báo biến không gán lại bằng const: r = gọi harness() | Khai báo biến có thể gán lại bằng let: repairs = 0 | gán r.W.KVPV_TQ_SCOPE bằng {inside:()=>true} | gọi r.W.KVPV_MODE.armTianQuan() để đăng ký bộ theo dõi map để tự bật bộ combat khi vào phó bản phù hợp
 const r=harness();let repairs=0;r.W.KVPV_TQ_SCOPE={inside:()=>true};r.W.KVPV_MODE.armTianQuan();
// [VI dòng gốc 131] gán r.W.KVPV_HITRUN_AUTO.status bằng ()=>({enabled:true,timerActive:false,lastMode:'already-attempted'}) | gán r.W.KVPV_HITRUN_AUTO.repairPolling bằng ()=>{repairs++;} | tăng repairs một đơn vị sau khi lấy giá trị
 r.W.KVPV_HITRUN_AUTO.status=()=>({enabled:true,timerActive:false,lastMode:'already-attempted'});r.W.KVPV_HITRUN_AUTO.repairPolling=()=>{repairs++;};
// [VI dòng gốc 132] Khai báo biến không gán lại bằng const: starts = đọc r.state().rearms | gọi r.W.KVPV_MODE.syncMap() | gọi assert.equal(repairs, 1) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(r.state().rearms, starts) để kiểm tra hai giá trị bằng nhau
 const starts=r.state().rearms;r.W.KVPV_MODE.syncMap();assert.equal(repairs,1);assert.equal(r.state().rearms,starts);
// [VI dòng gốc 133] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 134] gọi test('Tian Quan restores 300 once per entry or floor, never on every polling tick', ()=>{ const q=harness();let inside=false,…)
test('Tian Quan restores 300 once per entry or floor, never on every polling tick',()=>{
// [VI dòng gốc 135] Khai báo biến không gán lại bằng const: q = gọi harness() | Khai báo biến có thể gán lại bằng let: inside = false; floor = 1 | Khai báo biến không gán lại bằng const: distances = tạo mảng gồm 0 vị trí: []
 const q=harness();let inside=false,floor=1;const distances=[];
// [VI dòng gốc 136] gán q.W.KVPV_FAR_SCOPE bằng {eligible:()=>false,inside:()=>inside,status:()=>({kind:inside?'THIEN_QUAN':'OUTSIDE',inside,current:100,floor})}
 q.W.KVPV_FAR_SCOPE={eligible:()=>false,inside:()=>inside,status:()=>({kind:inside?'THIEN_QUAN':'OUTSIDE',inside,current:100,floor})};
// [VI dòng gốc 137] gán q.W.KVPV_TH300.setDistance bằng d=>distances.push(d)
 q.W.KVPV_TH300.setDistance=d=>distances.push(d);
// [VI dòng gốc 138] gọi q.W.KVPV_MODE.armTianQuan() để đăng ký bộ theo dõi map để tự bật bộ combat khi vào phó bản phù hợp | gọi assert.deepEqual(distances, []) để kiểm tra cấu trúc hai giá trị tương đương
 q.W.KVPV_MODE.armTianQuan();assert.deepEqual(distances,[]);
// [VI dòng gốc 139] gán inside bằng true | gọi q.W.KVPV_MODE.syncMap() | gọi assert.deepEqual(distances, [300]) để kiểm tra cấu trúc hai giá trị tương đương
 inside=true;q.W.KVPV_MODE.syncMap();assert.deepEqual(distances,[300]);
// [VI dòng gốc 140] gọi q.W.KVPV_MODE.syncMap() | gọi assert.deepEqual(distances, [300]) để kiểm tra cấu trúc hai giá trị tương đương
 q.W.KVPV_MODE.syncMap();assert.deepEqual(distances,[300]);
// [VI dòng gốc 141] tăng floor một đơn vị sau khi lấy giá trị | gọi q.W.KVPV_MODE.syncMap() | gọi assert.deepEqual(distances, [300,300]) để kiểm tra cấu trúc hai giá trị tương đương
 floor++;q.W.KVPV_MODE.syncMap();assert.deepEqual(distances,[300,300]);
// [VI dòng gốc 142] gán inside bằng false | gọi q.W.KVPV_MODE.syncMap() | gán inside bằng true
 inside=false;q.W.KVPV_MODE.syncMap();inside=true;q.W.KVPV_MODE.syncMap();assert.deepEqual(distances,[300,300,300]);
// [VI dòng gốc 143] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 144] gọi test('native inward path is redirected before first entry poll; retreat and outside paths preserved', ()=>{ const q=harness()…)
test('native inward path is redirected before first entry poll; retreat and outside paths preserved',()=>{
// [VI dòng gốc 145] Khai báo biến không gán lại bằng const: q = gọi harness() | Khai báo biến có thể gán lại bằng let: inside = false | Khai báo biến không gán lại bằng const: moves = tạo mảng gồm 0 vị trí: []
 const q=harness();let inside=false;const moves=[];
// [VI dòng gốc 146] Khai báo biến không gán lại bằng const: native = tạo hàm với tham số x, y; mover = tạo đối tượng gồm moveTo | gọi moves.push([x,y]) để thêm phần tử vào cuối mảng | Kết thúc hàm hiện tại và trả về: 17.
 const native=function(x,y){moves.push([x,y]);return 17;},mover={moveTo:native};
// [VI dòng gốc 147] Khai báo biến không gán lại bằng const: monster = tạo đối tượng gồm property; combat = tạo đối tượng gồm target
 const monster={property:{get:k=>k==='position'?{x:0,y:0}:undefined}},combat={target:monster};
// [VI dòng gốc 148] Khai báo biến không gán lại bằng const: me = tạo đối tượng gồm property, getComponent
 const me={property:{get:k=>k==='hp'?[100,100]:k==='position'?{x:500,y:0}:undefined},getComponent:k=>k==='move'?mover:combat};
// [VI dòng gốc 149] gán q.W._d bằng {_Yct:{_zet:'move',_Het:'combat'}} | gán q.W._C bằng {_Ba:{instance:{getRole:()=>me}}}
 q.W._d={_Yct:{_zet:'move',_Het:'combat'}};q.W._C={_Ba:{instance:{getRole:()=>me}}};
// [VI dòng gốc 150] gán q.W.KVPV_FAR_SCOPE bằng {inside:()=>inside,status:()=>({inside,kind:inside?'THIEN_QUAN':'OUTSIDE',current:1}),eligible:t=>t===monster}
 q.W.KVPV_FAR_SCOPE={inside:()=>inside,status:()=>({inside,kind:inside?'THIEN_QUAN':'OUTSIDE',current:1}),eligible:t=>t===monster};
// [VI dòng gốc 151] gọi q.W.KVPV_MODE.armTianQuan() để đăng ký bộ theo dõi map để tự bật bộ combat khi vào phó bản phù hợp | gán inside bằng true
 q.W.KVPV_MODE.armTianQuan();inside=true;
// [VI dòng gốc 152] gọi assert.equal(mover.moveTo(0,0), 17) để kiểm tra hai giá trị bằng nhau | gọi assert.deepEqual(moves.pop(), [302,0]) để kiểm tra cấu trúc hai giá trị tương đương
 assert.equal(mover.moveTo(0,0),17);assert.deepEqual(moves.pop(),[300,0]);
// [VI dòng gốc 153] gán q.W.KVPV_HITRUN1.status bằng ()=>({running:true,phase:'RETREAT'})
 q.W.KVPV_HITRUN1.status=()=>({running:true,phase:'RETREAT'});
// [VI dòng gốc 154] gọi mover.moveTo(0, 0) | gọi assert.deepEqual(moves.pop(), [0,0]) để kiểm tra cấu trúc hai giá trị tương đương
 mover.moveTo(0,0);assert.deepEqual(moves.pop(),[0,0]);
// [VI dòng gốc 155] gán inside bằng false | gọi mover.moveTo(0, 0) | gọi assert.deepEqual(moves.pop(), [0,0]) để kiểm tra cấu trúc hai giá trị tương đương
 inside=false;mover.moveTo(0,0);assert.deepEqual(moves.pop(),[0,0]);
// [VI dòng gốc 156] gọi q.W.KVPV_MODE.stop() để dừng bộ điều khiển và dọn tài nguyên | gọi assert.equal(mover.moveTo, native) để kiểm tra hai giá trị bằng nhau
 q.W.KVPV_MODE.stop();assert.equal(mover.moveTo,native);
// [VI dòng gốc 157] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 158] gọi console.log('PASSED', passed, '/26') | Kiểm tra passed!==26: đúng thì chạy nhánh sau if. | gán process.exitCode bằng 1
test('Tian Quan keeps 310 and restores HitRun HP recovery',()=>{
  const q=harness();let kind='THIEN_QUAN',distances=[];
  q.W.KVPV_FAR_SCOPE={inside:()=>true,status:()=>({kind,inside:true,current:2051,floor:2000}),eligible:()=>false};
  q.W.KVPV_TQ_POSITION_ONLY={enabled:false,distance:310,heal:true};
  q.W.KVPV_TH300.setDistance=v=>distances.push(v);
  q.W.KVPV_MODE.armTianQuan();
  assert.equal(q.W.KVPV_MODE.status(false).mode,'BOSS_TH300_SCAN');
  assert.equal(q.state().auto,true,'HitRun recovery stays armed');
  assert.equal(q.W.KVPV.combat.config.autoArm,true);
  assert.deepEqual(distances,[310],'set TQ range once per floor');
  const rearmed=q.state().rearms;
  q.W.KVPV_MODE.syncMap();
  assert.equal(q.state().rearms,rearmed,'do not continually rearm recovery');
  assert.equal(q.state().auto,true);
  q.W.KVPV_MODE.stop();
  kind='OUTSIDE';q.W.KVPV_MODE.start('BOSS');
  assert.equal(q.state().auto,true);
  assert.equal(q.W.KVPV.combat.config.autoArm,true);
});
console.log('PASSED',passed,'/27');if(passed!==27)process.exitCode=1;
// [VI dòng gốc 159] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 160] Dòng trống để tách các phần, không có lệnh thực thi.
