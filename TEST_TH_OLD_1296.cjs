// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: Kiểm thử mô phỏng: TH_OLD_1296. Các assert bên dưới ghi điều kiện phải giữ; không chứng minh máy chủ game chấp nhận tốc độ hoặc tầm đánh. [đóng chú thích]
/* Kiểm thử mô phỏng: TH_OLD_1296. Các assert bên dưới ghi điều kiện phải giữ; không chứng minh máy chủ game chấp nhận tốc độ hoặc tầm đánh. */
// [VI dòng gốc 2] "use strict"
'use strict';
// [VI dòng gốc 3] Khai báo biến không gán lại bằng const: assert = gọi require('assert') để nạp module Node.js; fs = gọi require('fs') để nạp module Node.js; vm = gọi require('vm') để nạp module Node.js
const assert=require('assert'),fs=require('fs'),vm=require('vm');
// [VI dòng gốc 4] Khai báo biến không gán lại bằng const: path = gọi require('path') để nạp module Node.js
const path=require('path');
// [VI dòng gốc 5] Khai báo biến không gán lại bằng const: src = gọi fs.readFileSync(path.join(__dirname,'KVPV_V1_FULL.js'), 'utf8') để đọc tệp đồng bộ
const src=fs.readFileSync(path.join(__dirname,'KVPV_V1_FULL.js'),'utf8');
// [VI dòng gốc 6] gọi assert(src.includes('// Source: src/07-tuyet-hoc.js')) để kiểm tra điều kiện của bài test
assert(src.includes('// Source: src/07-tuyet-hoc.js'));
// [VI dòng gốc 7] Khai báo biến không gán lại bằng const: rangeSource = gọi fs.readFileSync(path.join(__dirname,'src/07-tuyet-hoc.js'),'utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm, '')
const rangeSource=fs.readFileSync(path.join(__dirname,'src/07-tuyet-hoc.js'),'utf8').replace(/\r\n?/g,'\n').replace(/^\/\/ \[VI dòng gốc \d+\].*\n/gm,'');
// [VI dòng gốc 8] Khai báo biến không gán lại bằng const: oldStart = gọi rangeSource.indexOf('[mở chú thích] ===========================================================================\n * KVPV V12.9.5 — BOSS TH ONLY')
const oldStart=rangeSource.indexOf('/* ===========================================================================\n * KVPV V12.9.5 — BOSS TH ONLY');
// [VI dòng gốc 9] gọi assert(oldStart>0) để kiểm tra điều kiện của bài test
assert(oldStart>0);
// [VI dòng gốc 10] Khai báo biến không gán lại bằng const: addon = tính biểu thức rangeSource.slice(oldStart)+'\n'+fs.readFileSync(path.join(__dirname,'src/08-range-evidence.js'),'utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,'')
const addon=rangeSource.slice(oldStart)+'\n'+fs.readFileSync(path.join(__dirname,'src/08-range-evidence.js'),'utf8').replace(/\r\n?/g,'\n').replace(/^\/\/ \[VI dòng gốc \d+\].*\n/gm,'');
// [VI dòng gốc 11] Khai báo biến có thể gán lại bằng let: passed = 0
let passed=0;
// [VI dòng gốc 12] Định nghĩa hàm test; tham số: label, fn | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | gọi fn() | tăng passed một đơn vị sau khi lấy giá trị
function test(label,fn){try{fn();passed++;console.log('PASS',label);}catch(e){console.error('FAIL',label,e.stack);process.exitCode=1;}}
// [VI dòng gốc 13] Định nghĩa hàm mock; tham số: không có
function mock(){
// [VI dòng gốc 14] Khai báo biến không gán lại bằng const: actor = "10228867268946"
  const actor='10228867268946';
// [VI dòng gốc 15] Khai báo biến có thể gán lại bằng let: mode = "BOSS_TH"; phase = "FIGHT"; hps = 90
  let mode='BOSS_TH',phase='FIGHT',hps=90;
// [VI dòng gốc 16] Khai báo biến có thể gán lại bằng let: attack = tạo mảng gồm 0 vị trí: []; moves = tạo mảng gồm 0 vị trí: []; timers = tạo đối tượng bằng Map(); seq = 0
  let attack=[],moves=[],timers=new Map(),seq=0;
// [VI dòng gốc 17] Khai báo biến không gán lại bằng const: owner = tạo đối tượng gồm id, property, coords | Kết thúc hàm hiện tại và trả về: đọc {id:actor,position:owner.coords}[k].
  const owner={id:actor,property:{get(k){return {id:actor,position:owner.coords}[k];}},coords:{x:290,y:0}};
// [VI dòng gốc 18] Khai báo biến không gán lại bằng const: listeners = tạo đối tượng gồm
  const listeners={};
// [VI dòng gốc 19] Khai báo biến không gán lại bằng const: boss = tạo đối tượng gồm id, property, on, off | Kết thúc hàm hiện tại và trả về: đọc {id:'boss1',type:1,occ:222503,name:'Boss test',position:{x:0,y:0}}[k].
  const boss={id:'boss1',property:{get(k){return {id:'boss1',type:1,occ:222503,name:'Boss test',position:{x:0,y:0}}[k];}},
// [VI dòng gốc 20] gán listeners[id] bằng fn | Kiểm tra listeners[id]===fn: đúng thì chạy nhánh sau if. | xóa thuộc tính listeners[id]
    on(id,o,fn){listeners[id]=fn;},off(id,o,fn){if(listeners[id]===fn)delete listeners[id];}};
// [VI dòng gốc 21] Khai báo biến không gán lại bằng const: selector = tạo đối tượng gồm _rtt, _wet, _f7t, selectSkill
  const selector={_rtt:[[8001,0,100],[1001,0,2000],[1002,Date.now()+999999,2000]],_wet:[[8002,0,100]],
// [VI dòng gốc 22] Khai báo biến không gán lại bằng const: x = gọi active.find(r=>r[1]<Date.now()) để tìm phần tử đầu tiên thỏa điều kiện | Kết thúc hàm hiện tại và trả về: nếu x thì lấy x[0], ngược lại lấy common?.length?common[0][0]:-1.
    _f7t(active,common,mode){const x=active.find(r=>r[1]<Date.now());return x?x[0]:common?.length?common[0][0]:-1;},
// [VI dòng gốc 23] Kết thúc hàm hiện tại và trả về: gọi this._f7t(this._rtt, this._wet, 1); chức năng nội bộ chưa xác minh từ tên hàm.
    selectSkill(){return this._f7t(this._rtt,this._wet,1);}};
// [VI dòng gốc 24] Khai báo biến không gán lại bằng const: combat = tạo đối tượng gồm target, owner, combat | gọi attack.push(skill) để thêm phần tử vào cuối mảng | Kết thúc hàm hiện tại và trả về: skill.
  const combat={target:boss,owner,combat(skill){attack.push(skill);return skill;}};
// [VI dòng gốc 25] Khai báo biến không gán lại bằng const: mover = tạo đối tượng gồm moveTo | gọi moves.push({x,y}) để thêm phần tử vào cuối mảng | gán owner.coords bằng {x,y}
  const mover={moveTo(x,y){moves.push({x,y});owner.coords={x,y};}};
// [VI dòng gốc 26] Khai báo biến không gán lại bằng const: A = tạo đối tượng gồm | Khai báo biến không gán lại bằng const: S = tạo đối tượng gồm | Khai báo biến không gán lại bằng const: M = tạo đối tượng gồm
  const A={}; const S={}; const M={};
// [VI dòng gốc 27] gán owner.getComponent bằng (C)=>C===A?combat:C===S?selector:C===M?mover:null
  owner.getComponent=(C)=>C===A?combat:C===S?selector:C===M?mover:null;
// [VI dòng gốc 28] Khai báo biến không gán lại bằng const: W = tạo đối tượng gồm __KVPV_OWN_ACTOR_ID, console, document, _d, _Ba, _ft, _C, KVPV_HITRUN1, KVPV_MODE, setInterval, clearInterval
  const W={__KVPV_OWN_ACTOR_ID:actor,console:{info(){},warn(){},log(){},table(){}},
// [VI dòng gốc 29] Thuộc tính document: tạo đối tượng gồm hidden | Thuộc tính hidden: false | Thuộc tính _d: tạo đối tượng gồm _Yct | Thuộc tính _Yct: tạo đối tượng gồm _Het, _Eet, _zet
    document:{hidden:false},_d:{_Yct:{_Het:A,_Eet:S,_zet:M}},
// [VI dòng gốc 30] Thuộc tính _Ba: tạo đối tượng gồm _rJ, _Co | Thuộc tính _rJ: tạo đối tượng gồm _O$ | Thuộc tính _O$: tạo đối tượng gồm ins | Thuộc tính ins: tạo đối tượng gồm actorId
    _Ba:{_rJ:{_O$:{ins:{actorId:actor}}},_Co:{_Mo:{ins:{curLv:2503}}}},
// [VI dòng gốc 31] Kết thúc hàm hiện tại và trả về: tạo mảng gồm 1 vị trí: [999]. | Kết thúc hàm hiện tại và trả về: 222503.
    _ft:{_h$:{ins:{getCfgByLv(){return[999];},occ(){return 222503;}}}},
// [VI dòng gốc 32] Kết thúc hàm hiện tại và trả về: nếu String(id)===actor thì lấy owner, ngược lại lấy null.
    _C:{_Ba:{instance:{getRole(id){return String(id)===actor?owner:null;}}}},
// [VI dòng gốc 33] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm running, phase, hpPct, leavePct.
    KVPV_HITRUN1:{status(){return{running:true,phase,hpPct:hps,leavePct:35};}},
// [VI dòng gốc 34] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm mode.
    KVPV_MODE:{status(){return{mode};}},
// [VI dòng gốc 35] Khai báo biến không gán lại bằng const: key = tăng seq một đơn vị trước khi lấy giá trị | gọi timers.set(key, fn) | Kết thúc hàm hiện tại và trả về: key.
    setInterval(fn){const key=++seq;timers.set(key,fn);return key;},
// [VI dòng gốc 36] gọi timers.delete(key)
    clearInterval(key){timers.delete(key);}};
// [VI dòng gốc 37] gọi vm.runInNewContext(addon, {window:W,console:W.console,Date,Math,Number,String,Object,Array,Error,Set,Map,JSON}, {timeout:3000}) để chạy mã trong ngữ cảnh máy ảo dùng cho kiểm thử
  vm.runInNewContext(addon,{window:W,console:W.console,Date,Math,Number,String,Object,Array,Error,Set,Map,JSON}, {timeout:3000});
// [VI dòng gốc 38] Khai báo biến không gán lại bằng const: mod = đọc W.KVPV_TH_FAR
  const mod=W.KVPV_TH_FAR;
// [VI dòng gốc 39] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm W, mod, boss, selector, combat, owner, mover, attack, moves, timers, listeners, pump, mode, phase, hp.
  return {W,mod,boss,selector,combat,owner,mover,attack,moves,timers,listeners,
// [VI dòng gốc 40] Duyệt từng giá trị trong [...timers.values()] bằng const fn. | Khai báo biến không gán lại bằng const: fn (chưa gán giá trị) | gọi fn()
    pump(){for(const fn of [...timers.values()])fn();},
// [VI dòng gốc 41] gán mode bằng x | gán phase bằng x | gán hps bằng x
    mode(x){mode=x;},phase(x){phase=x;},hp(x){hps=x;}};
// [VI dòng gốc 42] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 43] gọi test('TH module installs OFF and has 8-ID allowlist available', ()=>{ const x=mock();assert.equal(x.mod.status(false).enabled…)
test('TH module installs OFF and has 8-ID allowlist available',()=>{
// [VI dòng gốc 44] Khai báo biến không gán lại bằng const: x = gọi mock() | gọi assert.equal(x.mod.status(false).enabled, false) để kiểm tra hai giá trị bằng nhau
  const x=mock();assert.equal(x.mod.status(false).enabled,false);
// [VI dòng gốc 45] gọi assert.deepEqual(Array.from(x.mod.status(false).availableTuyetHoc), [1001,1002]) để kiểm tra cấu trúc hai giá trị tương đương
  assert.deepEqual(Array.from(x.mod.status(false).availableTuyetHoc),[1001,1002]);
// [VI dòng gốc 46] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 47] gọi test('when only TH ready, selects 1001 even if native selector favors 8001', ()=>{ const x=mock();x.mod.start();assert.equal(…)
test('when only TH ready, selects 1001 even if native selector favors 8001',()=>{
// [VI dòng gốc 48] Khai báo biến không gán lại bằng const: x = gọi mock() | gọi x.mod.start() để khởi động bộ điều khiển | gọi assert.equal(x.selector.selectSkill(), 1001) để kiểm tra hai giá trị bằng nhau
  const x=mock();x.mod.start();assert.equal(x.selector.selectSkill(),1001);
// [VI dòng gốc 49] gọi x.combat.combat(1001) | gọi assert.deepEqual(x.attack, [1001]) để kiểm tra cấu trúc hai giá trị tương đương
  x.combat.combat(1001);assert.deepEqual(x.attack,[1001]);
// [VI dòng gốc 50] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 51] gọi test('blocks native basic and non-TH attacks from main actor', ()=>{ const x=mock();x.mod.start();x.combat.combat(8001);x.com…)
test('blocks native basic and non-TH attacks from main actor',()=>{
// [VI dòng gốc 52] Khai báo biến không gán lại bằng const: x = gọi mock() | gọi x.mod.start() để khởi động bộ điều khiển | gọi x.combat.combat(8001) | gọi x.combat.combat(8011)
  const x=mock();x.mod.start();x.combat.combat(8001);x.combat.combat(8011);x.combat.combat(3001);
// [VI dòng gốc 53] gọi assert.equal(x.attack.length, 0) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(x.mod.status(false).blockedBasics, 1) để kiểm tra hai giá trị bằng nhau
  assert.equal(x.attack.length,0);assert.equal(x.mod.status(false).blockedBasics,1);
// [VI dòng gốc 54] gọi assert.equal(x.mod.status(false).blockedOther, 2) để kiểm tra hai giá trị bằng nhau
  assert.equal(x.mod.status(false).blockedOther,2);
// [VI dòng gốc 55] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 56] gọi test('when no TH ready: returns -1, DOES NOT fall back to 8001 / 8002', ()=>{ const x=mock();x.mod.start();x.selector._rtt[1]…)
test('when no TH ready: returns -1, DOES NOT fall back to 8001 / 8002',()=>{
// [VI dòng gốc 57] Khai báo biến không gán lại bằng const: x = gọi mock() | gọi x.mod.start() để khởi động bộ điều khiển | gán x.selector._rtt[1][1] bằng Date.now()+100000
  const x=mock();x.mod.start();x.selector._rtt[1][1]=Date.now()+100000;
// [VI dòng gốc 58] gọi assert.equal(x.selector.selectSkill(), -1) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(x.attack.length, 0) để kiểm tra hai giá trị bằng nhau
  assert.equal(x.selector.selectSkill(),-1);assert.equal(x.attack.length,0);
// [VI dòng gốc 59] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 60] gọi test('does not affect other selected players/monsters or off mode', ()=>{ const x=mock();x.mod.start();x.combat.target={prope…)
test('does not affect other selected players/monsters or off mode',()=>{
// [VI dòng gốc 61] Khai báo biến không gán lại bằng const: x = gọi mock() | gọi x.mod.start() để khởi động bộ điều khiển | gán x.combat.target bằng {property:{get(){return 3;}}} | Kết thúc hàm hiện tại và trả về: 3.
  const x=mock();x.mod.start();x.combat.target={property:{get(){return 3;}}};
// [VI dòng gốc 62] gọi x.combat.combat(8001) | gọi assert.deepEqual(x.attack, [8001]) để kiểm tra cấu trúc hai giá trị tương đương
  x.combat.combat(8001);assert.deepEqual(x.attack,[8001]);
// [VI dòng gốc 63] gọi x.mod.stop() để dừng bộ điều khiển và dọn tài nguyên | gọi x.combat.combat(8002) | gọi assert.deepEqual(x.attack, [8001,8002]) để kiểm tra cấu trúc hai giá trị tương đương
  x.mod.stop();x.combat.combat(8002);assert.deepEqual(x.attack,[8001,8002]);
// [VI dòng gốc 64] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 65] gọi test('stops auto reposition when HitRun is RETREAT', ()=>{ const x=mock();x.phase('RETREAT');x.mod.start();x.pump();assert.eq…)
test('stops auto reposition when HitRun is RETREAT',()=>{
// [VI dòng gốc 66] Khai báo biến không gán lại bằng const: x = gọi mock() | gọi x.phase('RETREAT') | gọi x.mod.start() để khởi động bộ điều khiển | gọi x.pump()
  const x=mock();x.phase('RETREAT');x.mod.start();x.pump();assert.equal(x.moves.length,0);
// [VI dòng gốc 67] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 68] gọi test('positions near 280.4 if in FIGHT with HP safe', ()=>{ const x=mock();x.mod.start();x.pump();assert.equal(x.moves.length…)
test('positions near 280.4 if in FIGHT with HP safe',()=>{
// [VI dòng gốc 69] Khai báo biến không gán lại bằng const: x = gọi mock() | gọi x.mod.start() để khởi động bộ điều khiển | gọi x.pump() | gọi assert.equal(x.moves.length, 1) để kiểm tra hai giá trị bằng nhau
  const x=mock();x.mod.start();x.pump();assert.equal(x.moves.length,1);
// [VI dòng gốc 70] gọi assert(Math.abs(x.moves[0].x-280.4)<0.01) để kiểm tra điều kiện của bài test | gọi assert.equal(x.mod.status(false).goalDistance, 280.4) để kiểm tra hai giá trị bằng nhau
  assert(Math.abs(x.moves[0].x-280.4)<0.01);assert.equal(x.mod.status(false).goalDistance,280.4);
// [VI dòng gốc 71] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 72] gọi test('never moves while HP is low', ()=>{ const x=mock();x.hp(30);x.mod.start();x.pump();assert.equal(x.moves.length,0); })
test('never moves while HP is low',()=>{
// [VI dòng gốc 73] Khai báo biến không gán lại bằng const: x = gọi mock() | gọi x.hp(30) | gọi x.mod.start() để khởi động bộ điều khiển | gọi x.pump()
  const x=mock();x.hp(30);x.mod.start();x.pump();assert.equal(x.moves.length,0);
// [VI dòng gốc 74] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 75] gọi test('listener counts only own TH damage on exact Boss', ()=>{ const x=mock();x.mod.start();x.pump();assert.equal(typeof x.li…)
test('listener counts only own TH damage on exact Boss',()=>{
// [VI dòng gốc 76] Khai báo biến không gán lại bằng const: x = gọi mock() | gọi x.mod.start() để khởi động bộ điều khiển | gọi x.pump() | gọi assert.equal(typeof x.listeners[1012], 'function') để kiểm tra hai giá trị bằng nhau
  const x=mock();x.mod.start();x.pump();assert.equal(typeof x.listeners[1012],'function');
// [VI dòng gốc 77] gọi x.listeners[1012]('other', 10010000, 1000, 0, 'boss1')
  x.listeners[1012]('other',10010000,1000,0,'boss1');
// [VI dòng gốc 78] gọi x.listeners[1012]('10228867268946', 80010000, 1000, 0, 'boss1')
  x.listeners[1012]('10228867268946',80010000,1000,0,'boss1');
// [VI dòng gốc 79] gọi x.listeners[1012]('10228867268946', 10010000, 1000, 0, 'other')
  x.listeners[1012]('10228867268946',10010000,1000,0,'other');
// [VI dòng gốc 80] gọi x.listeners[1012]('10228867268946', 10010000, 1000, 0, 'boss1')
  x.listeners[1012]('10228867268946',10010000,1000,0,'boss1');
// [VI dòng gốc 81] gọi assert.equal(x.mod.status(false).confirmedTH, 1) để kiểm tra hai giá trị bằng nhau
  assert.equal(x.mod.status(false).confirmedTH,1);
// [VI dòng gốc 82] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 83] gọi test('stop releases own hooks & timers, start can resume', ()=>{ const x=mock(),native=x.combat.combat,orig=x.selector._f7t; …)
test('stop releases own hooks & timers, start can resume',()=>{
// [VI dòng gốc 84] Khai báo biến không gán lại bằng const: x = gọi mock(); native = đọc x.combat.combat; orig = đọc x.selector._f7t
  const x=mock(),native=x.combat.combat,orig=x.selector._f7t;
// [VI dòng gốc 85] gọi x.mod.start() để khởi động bộ điều khiển | gọi assert.notEqual(x.combat.combat, native) | gọi x.mod.stop() để dừng bộ điều khiển và dọn tài nguyên
  x.mod.start();assert.notEqual(x.combat.combat,native);x.mod.stop();
// [VI dòng gốc 86] gọi assert.strictEqual(x.combat.combat, native) | gọi assert.strictEqual(x.selector._f7t, orig)
  assert.strictEqual(x.combat.combat,native);assert.strictEqual(x.selector._f7t,orig);
// [VI dòng gốc 87] gọi assert.equal(x.timers.size, 0) để kiểm tra hai giá trị bằng nhau | gọi x.mod.start() để khởi động bộ điều khiển | gọi assert.equal(x.selector.selectSkill(), 1001) để kiểm tra hai giá trị bằng nhau
  assert.equal(x.timers.size,0);x.mod.start();assert.equal(x.selector.selectSkill(),1001);
// [VI dòng gốc 88] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 89] Nội dung nguyên văn của chuỗi mẫu; đây là dữ liệu trong chuỗi, không phải lệnh đang chạy.
console.log(`PASSED ${passed}/10`);if(passed!==10)process.exitCode=1;
// [VI dòng gốc 90] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 91] Dòng trống để tách các phần, không có lệnh thực thi.
