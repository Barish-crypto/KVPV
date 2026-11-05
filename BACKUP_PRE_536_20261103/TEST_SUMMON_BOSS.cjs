// [VI dòng gốc 1] "use strict"
'use strict';
// [VI dòng gốc 2] Khai báo biến không gán lại bằng const: fs = gọi require('node:fs') để nạp module Node.js; vm = gọi require('node:vm') để nạp module Node.js; assert = gọi require('node:assert/strict') để nạp module Node.js
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
// [VI dòng gốc 3] Khai báo biến không gán lại bằng const: source = gọi fs.readFileSync(__dirname+'/src/24-summon-boss.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm, '')
const source=fs.readFileSync(__dirname+'/src/24-summon-boss.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,'');
// [VI dòng gốc 4] Định nghĩa hàm harness; tham số: clone=false
function harness(clone=false){
// [VI dòng gốc 5] Khai báo biến có thể gán lại bằng let: now = 1000; common = true; type = 0; lease = null; blocked = false; normal = 2; epic = 1; clicks = 0; toggles = 0; opens = 0; clears = 0
  let now=1000,common=true,type=0,lease=null,blocked=false,normal=2,epic=1,clicks=0,toggles=0,opens=0,clears=0;
// [VI dòng gốc 6] Khai báo biến không gán lại bằng const: timers = tạo đối tượng bằng Map() | Khai báo biến có thể gán lại bằng let: id = 0
  const timers=new Map();let id=0;
// [VI dòng gốc 7] Khai báo biến không gán lại bằng const: m = tạo đối tượng gồm comItemId, legendItemId, isAutoCall
  const m={comItemId:1,legendItemId:2,isAutoCall:false};
// [VI dòng gốc 8] Định nghĩa lớp Panel.
  class Panel{}
// [VI dòng gốc 9] Khai báo biến không gán lại bằng const: p = tạo đối tượng bằng Panel() | gọi Object.assign(p, {parent:true,visible:true,gotoBtn:{disabled:false},curCheckBox:{selected:false}, autoCheckBox:{visible:true,disabled:…)
  const p=new Panel();Object.assign(p,{parent:true,visible:true,gotoBtn:{disabled:false},curCheckBox:{selected:false},
// [VI dòng gốc 10] gán this.curCheckBox.selected bằng true | gán this.curCheckBox.selected bằng false
    autoCheckBox:{visible:true,disabled:false},_nUs(){this.curCheckBox.selected=true;},_sUs(){this.curCheckBox.selected=false;},
// [VI dòng gốc 11] tăng toggles một đơn vị sau khi lấy giá trị | gán m.isAutoCall bằng !m.isAutoCall | tăng clears một đơn vị sau khi lấy giá trị | tăng clicks một đơn vị sau khi lấy giá trị
    _cQn(){toggles++;m.isAutoCall=!m.isAutoCall;},_ngt(){clears++;},_hQn(){clicks++;}});
// [VI dòng gốc 12] Khai báo biến có thể gán lại bằng let: opened = false
  let opened=false;
// [VI dòng gốc 13] Khai báo biến không gán lại bằng const: W = tạo đối tượng gồm __KVPV_OWN_ACTOR_ID, _Ba, _ft, _C, KVPV_BEAST_ISLAND, KVPV_CONFIRM_POPUPS, KVPV, setInterval, clearInterval
  const W={__KVPV_OWN_ACTOR_ID:'123456',_Ba:{_rJ:{_O$:{ins:{actorId:'123456'}}},_F_t:{_E_t:{ins:m},_eUs:Panel},
// [VI dòng gốc 14] Thuộc tính _Ic: tạo đối tượng gồm _aQ | Thuộc tính _aQ: tạo đối tượng gồm ins | Thuộc tính ins: tạo đối tượng gồm getItemCountById | Thuộc tính getItemCountById: tạo hàm với tham số i; mỗi lần gọi trả về nếu i===1 thì lấy normal, ngược lại lấy epic
    _Ic:{_aQ:{ins:{getItemCountById:i=>i===1?normal:epic}}},_Co:{_Mo:{ins:{auto:true}}},
// [VI dòng gốc 15] Kết thúc hàm hiện tại và trả về: common.
    _$a:{SceneUtil:{get isCommonScene(){return common;}},_yo:{ins:{isInMission:false}}}},
// [VI dòng gốc 16] gọi assert.equal(n, 952) để kiểm tra hai giá trị bằng nhau | tăng opens một đơn vị sau khi lấy giá trị | gán opened bằng true
    _ft:{_Y4n:{ins:{isOpened:()=>opened,getPanelById:()=>p,open(n){assert.equal(n,952);opens++;opened=true;}}},
// [VI dòng gốc 17] Thuộc tính _po: tạo đối tượng gồm ins | Thuộc tính ins: tạo đối tượng gồm getCfgById | Thuộc tính getCfgById: tạo hàm với tham số (không có); mỗi lần gọi trả về tạo mảng gồm 8 vị trí: [0,0,0,0,0,0,0,type] | Thuộc tính _C: tạo đối tượng gồm _Mn
      _po:{ins:{getCfgById:()=>[0,0,0,0,0,0,0,type]}}},_C:{_Mn:{_Cn:{currentID:2613}}},
// [VI dòng gốc 18] Thuộc tính KVPV_BEAST_ISLAND: tạo đối tượng gồm status | Thuộc tính status: tạo hàm với tham số (không có); mỗi lần gọi trả về tạo đối tượng gồm bossLevel | Thuộc tính bossLevel: nếu clone thì lấy 500, ngược lại lấy 750
    KVPV_BEAST_ISLAND:{status:()=>({bossLevel:clone?500:750})},
// [VI dòng gốc 19] Thuộc tính KVPV_CONFIRM_POPUPS: tạo đối tượng gồm beforeTask | Thuộc tính beforeTask: tạo hàm với tham số (không có); mỗi lần gọi trả về blocked | Thuộc tính KVPV: tạo đối tượng gồm core | Thuộc tính core: tạo đối tượng gồm scene
    KVPV_CONFIRM_POPUPS:{beforeTask:()=>blocked},KVPV:{core:{scene:{status:()=>({owner:lease?'combat':null,tag:lease}),
// [VI dòng gốc 20] gán lease bằng t | Kết thúc hàm hiện tại và trả về: true. | gán lease bằng null
      acquire(w,t){lease=t;return true;},renew(){return true;},release(){lease=null;}}}},
// [VI dòng gốc 21] gọi timers.set(++id, fn) | Kết thúc hàm hiện tại và trả về: id. | gọi timers.delete(i)
    setInterval(fn){timers.set(++id,fn);return id;},clearInterval(i){timers.delete(i);}};
// [VI dòng gốc 22] Định nghĩa lớp Clock kế thừa Date. | Kết thúc hàm hiện tại và trả về: now.
  class Clock extends Date{static now(){return now;}}
// [VI dòng gốc 23] Khai báo biến không gán lại bằng const: context = tạo đối tượng gồm window, Date | gọi vm.runInNewContext(source, context) để chạy mã trong ngữ cảnh máy ảo dùng cho kiểm thử | Khai báo biến không gán lại bằng const: sync = tạo hàm với tham số (không có); mỗi lần gọi trả về gọi W.KVPV_SUMMON_BOSS.sync()
  const context={window:W,Date:Clock};vm.runInNewContext(source,context);const sync=()=>W.KVPV_SUMMON_BOSS.sync();
// [VI dòng gốc 24] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm W, p, m, sync, load, counts, tickets, map, blocked, advance. | gọi vm.runInNewContext(source, context) để chạy mã trong ngữ cảnh máy ảo dùng cho kiểm thử
  return {W,p,m,sync,load(){vm.runInNewContext(source,context);},counts:()=>({clicks,toggles,opens,clears,timers:timers.size,lease}),
// [VI dòng gốc 25] gán normal bằng n | gán epic bằng e | gán common bằng c | gán type bằng t
    tickets(n,e=0){normal=n;epic=e;},map(c,t){common=c;type=t;},blocked(v){blocked=v;},advance(ms){now+=ms;sync();}};
// [VI dòng gốc 26] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 27] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng {. Đọc cùng dòng mở phía trên: {
{
// [VI dòng gốc 28] Khai báo biến không gán lại bằng const: q = gọi harness() | gọi q.sync() | gọi assert.equal(q.m.isAutoCall, true) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.counts().toggles, 1) để kiểm tra hai giá trị bằng nhau
 const q=harness();q.sync();assert.equal(q.m.isAutoCall,true);assert.equal(q.counts().toggles,1);
// [VI dòng gốc 29] Lặp for: khởi tạo let i=0; tiếp tục khi i<8; sau mỗi vòng i++. | Khai báo biến có thể gán lại bằng let: i = 0 | gọi q.sync() | gọi assert.equal(q.counts().clicks, 0) để kiểm tra hai giá trị bằng nhau
 for(let i=0;i<8;i++)q.sync();assert.equal(q.counts().clicks,0);assert.equal(q.counts().toggles,1);
// [VI dòng gốc 30] gọi q.tickets(0, 1) | gọi q.sync() | gọi assert.equal(q.p.curCheckBox.selected, true) để kiểm tra hai giá trị bằng nhau
 q.tickets(0,1);q.sync();assert.equal(q.p.curCheckBox.selected,true);
// [VI dòng gốc 31] gọi q.tickets(0) | gọi q.sync() | gọi assert.equal(q.m.isAutoCall, false) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.counts().lease, null) để kiểm tra hai giá trị bằng nhau
 q.tickets(0);q.sync();assert.equal(q.m.isAutoCall,false);assert.equal(q.counts().lease,null);assert(q.counts().clears>0);
// [VI dòng gốc 32] gọi assert.equal(q.W.KVPV_SUMMON_BOSS.status().reason, 'tickets_exhausted') để kiểm tra hai giá trị bằng nhau
 assert.equal(q.W.KVPV_SUMMON_BOSS.status().reason,'tickets_exhausted');
// [VI dòng gốc 33] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 34] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng {. Đọc cùng dòng mở phía trên: {
{
// [VI dòng gốc 35] Khai báo biến không gán lại bằng const: q = gọi harness(true) | gọi q.sync() | gọi assert.equal(q.counts().clicks, 1) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.m.isAutoCall, false) để kiểm tra hai giá trị bằng nhau
 const q=harness(true);q.sync();assert.equal(q.counts().clicks,1);assert.equal(q.m.isAutoCall,false);
// [VI dòng gốc 36] gọi q.advance(60000) | gọi assert.equal(q.counts().clicks, 1) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.W.KVPV_SUMMON_BOSS.status().reason, 'waiting_summon_ack_no_retry') để kiểm tra hai giá trị bằng nhau
 q.advance(60000);assert.equal(q.counts().clicks,1);assert.equal(q.W.KVPV_SUMMON_BOSS.status().reason,'waiting_summon_ack_no_retry');
// [VI dòng gốc 37] gọi q.load() | gọi q.sync() | gọi assert.equal(q.counts().clicks, 1, 'reload preserves pending') để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.counts().timers, 1) để kiểm tra hai giá trị bằng nhau
 q.load();q.sync();assert.equal(q.counts().clicks,1,'reload preserves pending');assert.equal(q.counts().timers,1);
// [VI dòng gốc 38] gọi q.map(false, 45) để biến đổi từng phần tử | gọi q.sync() | gọi q.tickets(1) | gọi q.map(true, 0) để biến đổi từng phần tử
 q.map(false,45);q.sync();q.tickets(1);q.map(true,0);q.sync();assert.equal(q.counts().clicks,2);
// [VI dòng gốc 39] gọi q.map(false, 45) để biến đổi từng phần tử | gọi q.sync() | gọi q.tickets(0) | gọi q.map(true, 0) để biến đổi từng phần tử
 q.map(false,45);q.sync();q.tickets(0);q.map(true,0);q.sync();assert.equal(q.counts().clicks,2);
// [VI dòng gốc 40] gọi assert.equal(q.W.KVPV_SUMMON_BOSS.status().reason, 'tickets_exhausted') để kiểm tra hai giá trị bằng nhau
 assert.equal(q.W.KVPV_SUMMON_BOSS.status().reason,'tickets_exhausted');
// [VI dòng gốc 41] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 42] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng {. Đọc cùng dòng mở phía trên: {
{
// [VI dòng gốc 43] Khai báo biến không gán lại bằng const: q = gọi harness() | gọi q.blocked(true) | gọi q.sync() | gọi assert.equal(q.counts().toggles, 0) để kiểm tra hai giá trị bằng nhau
 const q=harness();q.blocked(true);q.sync();assert.equal(q.counts().toggles,0);q.blocked(false);
// [VI dòng gốc 44] gán q.p.autoCheckBox.visible bằng false | gọi q.sync() | gọi assert.equal(q.counts().clicks, 1, 'manual fallback') để kiểm tra hai giá trị bằng nhau
 q.p.autoCheckBox.visible=false;q.sync();assert.equal(q.counts().clicks,1,'manual fallback');
// [VI dòng gốc 45] gán q.W._Ba._rJ._O$.ins.actorId bằng '999999' | gọi q.sync() | gọi assert.equal(q.counts().timers, 0, 'actor mismatch stops') để kiểm tra hai giá trị bằng nhau
 q.W._Ba._rJ._O$.ins.actorId='999999';q.sync();assert.equal(q.counts().timers,0,'actor mismatch stops');
// [VI dòng gốc 46] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 47] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng {. Đọc cùng dòng mở phía trên: {
{
// [VI dòng gốc 48] Khai báo biến không gán lại bằng const: q = gọi harness(true) | gán q.p.gotoBtn.disabled bằng true | gọi q.sync() | gọi assert.equal(q.counts().clicks, 0) để kiểm tra hai giá trị bằng nhau
 const q=harness(true);q.p.gotoBtn.disabled=true;q.sync();assert.equal(q.counts().clicks,0);
// [VI dòng gốc 49] gán q.p.gotoBtn.disabled bằng false | gọi q.tickets(NaN) | gọi q.sync() | gọi assert.equal(q.counts().clicks, 0, 'unknown tickets never summon') để kiểm tra hai giá trị bằng nhau
 q.p.gotoBtn.disabled=false;q.tickets(NaN);q.sync();assert.equal(q.counts().clicks,0,'unknown tickets never summon');
// [VI dòng gốc 50] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 51] gọi console.log('PASS summon Boss: native auto once, normal/epic tickets, clone manual ACK, reload pending, exhaustion, popup, native lo…)
console.log('PASS summon Boss: native auto once, normal/epic tickets, clone manual ACK, reload pending, exhaustion, popup, native lock and actor guards');
// [VI dòng gốc 52] Dòng trống để tách các phần, không có lệnh thực thi.
