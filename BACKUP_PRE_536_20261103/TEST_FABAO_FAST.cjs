// [VI dòng gốc 1] "use strict"
'use strict';
// [VI dòng gốc 2] Khai báo biến không gán lại bằng const: fs = gọi require('node:fs') để nạp module Node.js; vm = gọi require('node:vm') để nạp module Node.js; assert = gọi require('node:assert/strict') để nạp module Node.js
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
// [VI dòng gốc 3] Khai báo biến không gán lại bằng const: source = gọi fs.readFileSync(__dirname+'/src/26-fabao-fast.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm, '')
const source=fs.readFileSync(__dirname+'/src/26-fabao-fast.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,'');
// [VI dòng gốc 4] Định nghĩa hàm harness; tham số: không có
function harness(){
// [VI dòng gốc 5] Khai báo biến có thể gán lại bằng let: now = 1000; level = 3; count = 11; parts = 0; opened = false; blocked = false; common = true; reply = tạo mảng gồm 1 vị trí: [0]; requests = 0; closes = 0
 let now=1000,level=3,count=11,parts=0,opened=false,blocked=false,common=true,reply=[0],requests=0,closes=0;
// [VI dòng gốc 6] Khai báo biến có thể gán lại bằng let: id = 0 | Khai báo biến không gán lại bằng const: timers = tạo đối tượng bằng Map()
 let id=0;const timers=new Map();
// [VI dòng gốc 7] Định nghĩa lớp Panel. | tăng requests một đơn vị sau khi lấy giá trị
 class Panel{_BDn(){requests++;}}
// [VI dòng gốc 8] Khai báo biến không gán lại bằng const: p = tạo đối tượng bằng Panel() | gọi Object.assign(p, {parent:true,visible:true,_FSn:{selIdx:0},_IDn:100,_EDn:false, _kwn:4,get _Twn(){return count+parts;},allupBtn:{visib…)
 const p=new Panel();Object.assign(p,{parent:true,visible:true,_FSn:{selIdx:0},_IDn:100,_EDn:false,
// [VI dòng gốc 9] Kết thúc hàm hiện tại và trả về: tính biểu thức count+parts.
   _kwn:4,get _Twn(){return count+parts;},allupBtn:{visible:true,disabled:false}});
// [VI dòng gốc 10] Khai báo biến không gán lại bằng const: W = tạo đối tượng gồm __KVPV_OWN_ACTOR_ID, _Ba, _ft, KVPV_CONFIRM_POPUPS, setInterval, clearInterval
 const W={__KVPV_OWN_ACTOR_ID:'123456',_Ba:{_rJ:{_O$:{ins:{actorId:'123456',isDead:false}}},
// [VI dòng gốc 11] Kết thúc hàm hiện tại và trả về: reply.
  _rnt:{_GDn:Panel,_vnt:{ins:{getAmuletRefineQuaArr:g=>g===0?[[100]]:[],getFaBaoLv:()=>level,get RefineAmuletRep(){return reply;}}}},
// [VI dòng gốc 12] Thuộc tính _Ic: tạo đối tượng gồm _aQ | Thuộc tính _aQ: tạo đối tượng gồm ins | Thuộc tính ins: tạo đối tượng gồm getItemCountById | Thuộc tính getItemCountById: tạo hàm với tham số i; mỗi lần gọi trả về nếu i===100 thì lấy count, ngược lại lấy parts
  _Ic:{_aQ:{ins:{getItemCountById:i=>i===100?count:parts}}},
// [VI dòng gốc 13] Kết thúc hàm hiện tại và trả về: common.
  _$a:{SceneUtil:{get isCommonScene(){return common;}},_yo:{ins:{isInMission:false}}}},
// [VI dòng gốc 14] Thuộc tính _ft: tạo đối tượng gồm _s$, _Y4n | Thuộc tính _s$: tạo đối tượng gồm ins | Thuộc tính ins: tạo đối tượng gồm getCfgByIdLevel, getMaxLvById | Thuộc tính getCfgByIdLevel: tạo hàm với tham số (không có); mỗi lần gọi trả về tạo mảng gồm 5 vị trí: [100,0,0,[0,4],200]
  _ft:{_s$:{ins:{getCfgByIdLevel:()=>[100,0,0,[0,4],200],getMaxLvById:()=>5}},
// [VI dòng gốc 15] gọi assert.equal(n, 46) để kiểm tra hai giá trị bằng nhau | gán opened bằng true | tăng closes một đơn vị sau khi lấy giá trị | gán opened bằng false
   _Y4n:{ins:{getPanelById:()=>p,isOpened:()=>opened,open(n){assert.equal(n,46);opened=true;},close(){closes++;opened=false;}}}},
// [VI dòng gốc 16] gọi timers.set(++id, fn) | Kết thúc hàm hiện tại và trả về: id. | gọi timers.delete(i)
  KVPV_CONFIRM_POPUPS:{beforeTask:()=>blocked},setInterval(fn){timers.set(++id,fn);return id;},clearInterval(i){timers.delete(i);}};
// [VI dòng gốc 17] Định nghĩa lớp Clock kế thừa Date. | Kết thúc hàm hiện tại và trả về: now.
 class Clock extends Date{static now(){return now;}}
// [VI dòng gốc 18] Khai báo biến không gán lại bằng const: ctx = tạo đối tượng gồm window, Date | Khai báo biến không gán lại bằng const: load = tạo hàm với tham số (không có); mỗi lần gọi trả về gọi vm.runInNewContext(source, ctx) để chạy mã trong ngữ cảnh máy ảo dùng cho kiểm thử | gọi load()
 const ctx={window:W,Date:Clock};const load=()=>vm.runInNewContext(source,ctx);load();
// [VI dòng gốc 19] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm W, p, load, sync, set, ack, advance, state. | Kiểm tra 'level'in v: đúng thì chạy nhánh sau if. | gán level bằng v.level | Kiểm tra 'count'in v: đúng thì chạy nhánh sau if.
 return {W,p,load,sync:()=>W.KVPV_FABAO_FAST.sync(),set(v){if('level'in v)level=v.level;if('count'in v)count=v.count;if('parts'in v)parts=v.parts;if('blocked'in v)blocked=v.blocked;if('common'in v)common=v.common;},
// [VI dòng gốc 20] gán reply bằng [code] | cập nhật bằng toán tử += now bằng ms | gọi this.sync()
  ack(code=0){reply=[code];},advance(ms){now+=ms;this.sync();},state:()=>({requests,closes,opened,timers:timers.size})};
// [VI dòng gốc 21] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 22] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng {. Đọc cùng dòng mở phía trên: {
{
// [VI dòng gốc 23] Khai báo biến không gán lại bằng const: q = gọi harness() | gọi q.sync() | gọi assert.equal(q.state().requests, 1) để kiểm tra hai giá trị bằng nhau
 const q=harness();q.sync();assert.equal(q.state().requests,1);q.sync();q.advance(20000);assert.equal(q.state().requests,1);
// [VI dòng gốc 24] gọi assert.equal(q.W.KVPV_FABAO_FAST.status().reason, 'waiting_upgrade_ack_no_retry') để kiểm tra hai giá trị bằng nhau
 assert.equal(q.W.KVPV_FABAO_FAST.status().reason,'waiting_upgrade_ack_no_retry');
// [VI dòng gốc 25] gọi q.load() | gọi q.sync() | gọi assert.equal(q.state().requests, 1, 'reload preserves unresolved request') để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.state().timers, 1) để kiểm tra hai giá trị bằng nhau
 q.load();q.sync();assert.equal(q.state().requests,1,'reload preserves unresolved request');assert.equal(q.state().timers,1);
// [VI dòng gốc 26] gọi q.set({level:4,count:7}) | gọi q.ack() | gọi q.sync() | gọi assert.equal(q.state().requests, 2, 'next batch only after reply and observed level increase') để kiểm tra hai giá trị bằng nhau
 q.set({level:4,count:7});q.ack();q.sync();assert.equal(q.state().requests,2,'next batch only after reply and observed level increase');
// [VI dòng gốc 27] gọi q.set({level:5,count:0}) | gọi q.ack() | gọi q.sync() | gọi assert.equal(q.state().requests, 2) để kiểm tra hai giá trị bằng nhau
 q.set({level:5,count:0});q.ack();q.sync();assert.equal(q.state().requests,2);assert.equal(q.W.KVPV_FABAO_FAST.status().confirmed,2);
// [VI dòng gốc 28] gọi assert.equal(q.state().closes, 1, 'close only panel opened by worker') để kiểm tra hai giá trị bằng nhau
 assert.equal(q.state().closes,1,'close only panel opened by worker');
// [VI dòng gốc 29] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 30] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng {. Đọc cùng dòng mở phía trên: {
{
// [VI dòng gốc 31] Khai báo biến không gán lại bằng const: q = gọi harness() | gọi q.set({count:0,parts:4,blocked:true}) | gọi q.sync() | gọi assert.equal(q.state().requests, 0) để kiểm tra hai giá trị bằng nhau
 const q=harness();q.set({count:0,parts:4,blocked:true});q.sync();assert.equal(q.state().requests,0);
// [VI dòng gốc 32] gọi q.set({blocked:false,common:false}) | gọi q.sync() | gọi assert.equal(q.state().requests, 0) để kiểm tra hai giá trị bằng nhau
 q.set({blocked:false,common:false});q.sync();assert.equal(q.state().requests,0);
// [VI dòng gốc 33] gọi q.set({common:true}) | gọi q.sync() | gọi assert.equal(q.state().requests, 1, 'native fragments accepted') để kiểm tra hai giá trị bằng nhau
 q.set({common:true});q.sync();assert.equal(q.state().requests,1,'native fragments accepted');
// [VI dòng gốc 34] gọi q.ack(135017) | gọi q.sync() | gọi assert.equal(q.W.KVPV_FABAO_FAST.status().reason, 'server_rejected') để kiểm tra hai giá trị bằng nhau
 q.ack(135017);q.sync();assert.equal(q.W.KVPV_FABAO_FAST.status().reason,'server_rejected');q.sync();assert.equal(q.state().requests,1);
// [VI dòng gốc 35] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 36] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng {. Đọc cùng dòng mở phía trên: {
{
// [VI dòng gốc 37] Khai báo biến không gán lại bằng const: q = gọi harness() | gọi q.set({level:0}) | gọi q.sync() | gọi assert.equal(q.state().requests, 0, 'never activates') để kiểm tra hai giá trị bằng nhau
 const q=harness();q.set({level:0});q.sync();assert.equal(q.state().requests,0,'never activates');
// [VI dòng gốc 38] gọi q.set({level:5}) | gọi q.sync() | gọi assert.equal(q.state().requests, 0, 'never exceeds max') để kiểm tra hai giá trị bằng nhau
 q.set({level:5});q.sync();assert.equal(q.state().requests,0,'never exceeds max');
// [VI dòng gốc 39] gọi q.set({level:3,count:3}) | gọi q.sync() | gọi assert.equal(q.state().requests, 0, 'insufficient materials') để kiểm tra hai giá trị bằng nhau
 q.set({level:3,count:3});q.sync();assert.equal(q.state().requests,0,'insufficient materials');
// [VI dòng gốc 40] gọi q.set({count:11}) | gán q.p._BDn bằng ()=>{throw Error('foreign handler');} | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('foreign handler') | gọi q.sync()
 q.set({count:11});q.p._BDn=()=>{throw Error('foreign handler');};q.sync();assert.equal(q.state().requests,0);
// [VI dòng gốc 41] gán q.W._Ba._rJ._O$.ins.actorId bằng '999999' | gọi q.sync() | gọi assert.equal(q.state().timers, 0) để kiểm tra hai giá trị bằng nhau
 q.W._Ba._rJ._O$.ins.actorId='999999';q.sync();assert.equal(q.state().timers,0);
// [VI dòng gốc 42] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 43] gọi console.log('PASS Fabao fast: native bulk handler, item/fragment eligibility, server ACK and level increase, no duplicate/reload rep…)
console.log('PASS Fabao fast: native bulk handler, item/fragment eligibility, server ACK and level increase, no duplicate/reload replay, max/activation/cost/popup/combat/identity guards');
// [VI dòng gốc 44] Dòng trống để tách các phần, không có lệnh thực thi.
