// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: Mô phỏng Đồng ý native; kiểm tra phạm vi callback và lịch bất đồng bộ. [đóng chú thích]
/* Mô phỏng Đồng ý native; kiểm tra phạm vi callback và lịch bất đồng bộ. */
// [VI dòng gốc 2] "use strict"
'use strict';
// [VI dòng gốc 3] Khai báo biến không gán lại bằng const: fs = gọi require('node:fs') để nạp module Node.js; vm = gọi require('node:vm') để nạp module Node.js; assert = gọi require('node:assert/strict') để nạp module Node.js
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
// [VI dòng gốc 4] Khai báo biến không gán lại bằng const: source = gọi fs.readFileSync(__dirname+'/src/22-confirm-popups.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm, '')
const source=fs.readFileSync(__dirname+'/src/22-confirm-popups.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,'');
// [VI dòng gốc 5] Định nghĩa hàm harness; tham số: không có
function harness(){
// [VI dòng gốc 6] Khai báo biến không gán lại bằng const: tasks = tạo đối tượng bằng Map(); intervals = tạo đối tượng bằng Map(); panels = tạo đối tượng bằng Map(); calls = tạo mảng gồm 0 vị trí: [] | Khai báo biến có thể gán lại bằng let: seq = 0
 const tasks=new Map(),intervals=new Map(),panels=new Map(),calls=[];let seq=0;
// [VI dòng gốc 7] Khai báo biến không gán lại bằng const: manager = tạo đối tượng gồm openTable, open, isOpened, getPanelById, getDialogById | gọi assert.equal(this, manager) để kiểm tra hai giá trị bằng nhau | gọi panels.set(id, panel) | gán this.openTable[id] bằng {id}
 const manager={openTable:{},open(id,panel){assert.equal(this,manager);panels.set(id,panel);this.openTable[id]={id};panel.parent={};panel.visible=true;return 'opened';},
// [VI dòng gốc 8] Thuộc tính isOpened: tạo hàm với tham số id; mỗi lần gọi trả về đảo giá trị đúng/sai của !panels.get(id)?.parent | Thuộc tính getPanelById: tạo hàm với tham số id; mỗi lần gọi trả về gọi panels.get(id) | Thuộc tính getDialogById: tạo hàm với tham số (không có); mỗi lần gọi trả về null
  isOpened:id=>!!panels.get(id)?.parent,getPanelById:id=>panels.get(id),getDialogById:()=>null};
// [VI dòng gốc 9] Khai báo biến không gán lại bằng const: native = đọc manager.open; W = tạo đối tượng gồm __KVPV_OWN_ACTOR_ID, _Ba, _ft, KVPV_DAILY, setTimeout, clearTimeout, setInterval, clearInterval
 const native=manager.open,W={__KVPV_OWN_ACTOR_ID:'12345',_Ba:{_rJ:{_O$:{ins:{actorId:'12345'}}}},_ft:{_Y4n:{ins:manager}},
// [VI dòng gốc 10] Thuộc tính KVPV_DAILY: tạo đối tượng gồm quickState | Thuộc tính quickState: tạo hàm với tham số (không có); mỗi lần gọi trả về tạo đối tượng gồm job | Thuộc tính job: "busy"
  KVPV_DAILY:{quickState:()=>({job:'busy'})},
// [VI dòng gốc 11] gọi tasks.set(++seq, fn) | Kết thúc hàm hiện tại và trả về: seq.
  setTimeout:fn=>{tasks.set(++seq,fn);return seq;},clearTimeout:id=>tasks.delete(id),
// [VI dòng gốc 12] gọi intervals.set(++seq, fn) | Kết thúc hàm hiện tại và trả về: seq.
  setInterval:fn=>{intervals.set(++seq,fn);return seq;},clearInterval:id=>intervals.delete(id)};
// [VI dòng gốc 13] Khai báo biến không gán lại bằng const: load = tạo hàm với tham số (không có); mỗi lần gọi trả về gọi vm.runInNewContext(source, {window:W}) để chạy mã trong ngữ cảnh máy ảo dùng cho kiểm thử | gọi load()
 const load=()=>vm.runInNewContext(source,{window:W});load();
// [VI dòng gốc 14] Khai báo biến không gán lại bằng const: panel = tạo hàm với tham số id, callback | Khai báo biến không gán lại bằng const: p = tạo đối tượng gồm okBtn, _oBn, _aBn
 const panel=(id,callback)=>{const p={okBtn:{label:'Đồng ý(9)',visible:true},_oBn:callback?{run:callback}:null,
// [VI dòng gốc 15] gọi calls.push(id) để thêm phần tử vào cuối mảng | gán p.parent bằng null | gọi p._oBn?.run() (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Kết thúc hàm hiện tại và trả về: p.
  _aBn(){calls.push(id);p.parent=null;p._oBn?.run();}};return p;};
// [VI dòng gốc 16] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm W, manager, native, calls, tasks, intervals, load, panel, mod, flush, poll. | Kết thúc hàm hiện tại và trả về: đọc W.KVPV_CONFIRM_POPUPS.
 return {W,manager,native,calls,tasks,intervals,load,panel,get mod(){return W.KVPV_CONFIRM_POPUPS;},
// [VI dòng gốc 17] Duyệt từng giá trị trong [...tasks] bằng const [id,fn]. | Khai báo biến không gán lại bằng const: [id,fn] (chưa gán giá trị) | gọi tasks.delete(id) | gọi fn()
  flush(){for(const [id,fn] of [...tasks]){tasks.delete(id);fn();}},poll(){for(const fn of intervals.values())fn();}};
// [VI dòng gốc 18] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 19] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng {. Đọc cùng dòng mở phía trên: {
{
// [VI dòng gốc 20] Khai báo biến không gán lại bằng const: q = gọi harness(); p = gọi q.panel(12) | gọi q.manager.open(12, p) | gọi assert.equal(q.calls.length, 0) để kiểm tra hai giá trị bằng nhau | gọi q.flush()
 const q=harness(),p=q.panel(12);q.manager.open(12,p);assert.equal(q.calls.length,0);q.flush();assert.deepEqual(q.calls,[12]);
// [VI dòng gốc 21] gọi q.load() | gọi q.flush() | gọi assert.equal(q.calls.length, 1) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.manager.open(12,p), 'opened') để kiểm tra hai giá trị bằng nhau
 q.load();q.flush();assert.equal(q.calls.length,1);assert.equal(q.manager.open(12,p),'opened');assert.equal(q.calls.length,1);
// [VI dòng gốc 22] gọi q.flush() | gọi assert.equal(q.calls.length, 2) để kiểm tra hai giá trị bằng nhau | gọi q.mod.stop() để dừng bộ điều khiển và dọn tài nguyên | gọi assert.equal(q.manager.open, q.native) để kiểm tra hai giá trị bằng nhau
 q.flush();assert.equal(q.calls.length,2);q.mod.stop();assert.equal(q.manager.open,q.native);assert.equal(q.tasks.size,0);assert.equal(q.intervals.size,0);
// [VI dòng gốc 23] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 24] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng {. Đọc cùng dòng mở phía trên: {
{
// [VI dòng gốc 25] Khai báo biến không gán lại bằng const: q = gọi harness() | Khai báo biến có thể gán lại bằng let: spent = 0 | Khai báo biến không gán lại bằng const: p = gọi q.panel(12, ()=>spent++) | gọi q.manager.open(12, p)
 const q=harness();let spent=0;const p=q.panel(12,()=>spent++);q.manager.open(12,p);q.flush();assert.equal(spent,0);
// [VI dòng gốc 26] gọi assert.equal(q.mod.status().skipped[0].id, 12) để kiểm tra hai giá trị bằng nhau | gọi q.mod.setAll(true) | gọi q.flush() | gọi assert.equal(spent, 0) để kiểm tra hai giá trị bằng nhau
 assert.equal(q.mod.status().skipped[0].id,12);q.mod.setAll(true);q.flush();assert.equal(spent,0);
// [VI dòng gốc 27] gọi q.load() | gọi assert.equal(q.mod.status().confirmAll, true) để kiểm tra hai giá trị bằng nhau | gọi q.mod.stop() để dừng bộ điều khiển và dọn tài nguyên
 q.load();assert.equal(q.mod.status().confirmAll,true);q.mod.stop();
// [VI dòng gốc 28] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 29] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng {. Đọc cùng dòng mở phía trên: {
{
// [VI dòng gốc 30] Khai báo biến không gán lại bằng const: q = gọi harness() | Khai báo biến có thể gán lại bằng let: exits = 0 | Khai báo biến không gán lại bằng const: p = tạo đối tượng gồm okBtn, winImg, close | tăng exits một đơn vị sau khi lấy giá trị
 const q=harness();let exits=0;const p={okBtn:{label:'Đồng ý(3)'},winImg:{visible:true},close(){exits++;p.parent=null;}};
// [VI dòng gốc 31] gọi q.manager.open(1293, p) | gọi q.flush() | gọi assert.equal(exits, 1) để kiểm tra hai giá trị bằng nhau | gọi q.poll()
 q.manager.open(1293,p);q.flush();assert.equal(exits,1);q.poll();assert.equal(exits,1);q.mod.stop();
// [VI dòng gốc 32] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 33] Duyệt từng giá trị trong ['Mua','Xác nhận','Hủy'] bằng const label. | Khai báo biến không gán lại bằng const: label (chưa gán giá trị)
for(const label of ['Mua','Xác nhận','Hủy']){
// [VI dòng gốc 34] Khai báo biến không gán lại bằng const: q = gọi harness(); p = gọi q.panel(12) | gán p.okBtn.label bằng label | gọi q.manager.open(12, p) | gọi q.flush()
 const q=harness(),p=q.panel(12);p.okBtn.label=label;q.manager.open(12,p);q.flush();assert.equal(q.calls.length,0);q.mod.stop();
// [VI dòng gốc 35] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 36] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng {. Đọc cùng dòng mở phía trên: {
{
// [VI dòng gốc 37] Khai báo biến không gán lại bằng const: q = gọi harness(); p = gọi q.panel(12) | gọi q.manager.open(12, p) | gán q.W._Ba._rJ._O$.ins.actorId bằng '67890' | gọi q.flush()
 const q=harness(),p=q.panel(12);q.manager.open(12,p);q.W._Ba._rJ._O$.ins.actorId='67890';q.flush();assert.equal(q.calls.length,0);assert.equal(q.mod.status().enabled,false);
// [VI dòng gốc 38] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 39] gọi console.log('PASS confirm popups: async informational/battle result confirmation, callback scope gate, explicit all mode, countdown …)
console.log('PASS confirm popups: async informational/battle result confirmation, callback scope gate, explicit all mode, countdown labels, reopened panel generation, reload and stop');
// [VI dòng gốc 40] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 41] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng {. Đọc cùng dòng mở phía trên: {
{
// [VI dòng gốc 42] Khai báo biến không gán lại bằng const: q = gọi harness(); p = gọi q.panel(12) | gán p.content bằng 'Bạn muốn dùng 50 KNB?' | gọi q.manager.open(12, p) | gọi q.flush()
 const q=harness(),p=q.panel(12);p.content='Bạn muốn dùng 50 KNB?';q.manager.open(12,p);q.flush();assert.equal(q.calls.length,0);
// [VI dòng gốc 43] gọi assert.equal(q.mod.status().skipped[0].reason, 'potential_currency_cost') để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.mod.status().allowKNB, false) để kiểm tra hai giá trị bằng nhau | gọi q.mod.stop() để dừng bộ điều khiển và dọn tài nguyên
 assert.equal(q.mod.status().skipped[0].reason,'potential_currency_cost');assert.equal(q.mod.status().allowKNB,false);q.mod.stop();
// [VI dòng gốc 44] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 45] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 46] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng {. Đọc cùng dòng mở phía trên: {
{
// [VI dòng gốc 47] Khai báo biến không gán lại bằng const: q = gọi harness()
 const q=harness();
// [VI dòng gốc 48] gọi vm.runInNewContext(fs.readFileSync(__dirname+'/src/02-scene.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,''), {window:q.W,_Ba:q…) để chạy mã trong ngữ cảnh máy ảo dùng cho kiểm thử
 vm.runInNewContext(fs.readFileSync(__dirname+'/src/02-scene.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,''),{window:q.W,_Ba:q.W._Ba});
// [VI dòng gốc 49] gọi q.manager.open(12, q.panel(12))
 q.manager.open(12,q.panel(12));
// [VI dòng gốc 50] gọi assert.equal(q.W.KVPV.core.scene.acquire('daily','test'), false) để kiểm tra hai giá trị bằng nhau
 assert.equal(q.W.KVPV.core.scene.acquire('daily','test'),false);
// [VI dòng gốc 51] gọi assert.deepEqual(q.calls, [12], 'confirm before granting a new task') để kiểm tra cấu trúc hai giá trị tương đương
 assert.deepEqual(q.calls,[12],'confirm before granting a new task');
// [VI dòng gốc 52] gọi assert.equal(q.W.KVPV.core.scene.status().owner, null) để kiểm tra hai giá trị bằng nhau
 assert.equal(q.W.KVPV.core.scene.status().owner,null);
// [VI dòng gốc 53] gọi assert.equal(q.mod.beforeTask(), true, 'briefly yield for the next popup') để kiểm tra hai giá trị bằng nhau
 assert.equal(q.mod.beforeTask(),true,'briefly yield for the next popup');
// [VI dòng gốc 54] gọi q.mod.stop() để dừng bộ điều khiển và dọn tài nguyên | gọi assert.equal(q.mod.beforeTask(), false) để kiểm tra hai giá trị bằng nhau
 q.mod.stop();assert.equal(q.mod.beforeTask(),false);
// [VI dòng gốc 55] gọi assert.equal(q.W.KVPV.core.scene.acquire('daily','test'), true) để kiểm tra hai giá trị bằng nhau
 assert.equal(q.W.KVPV.core.scene.acquire('daily','test'),true);
// [VI dòng gốc 56] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 57] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng {. Đọc cùng dòng mở phía trên: {
{
// [VI dòng gốc 58] Khai báo biến không gán lại bằng const: q = gọi harness() | Khai báo biến có thể gán lại bằng let: spent = 0 | Khai báo biến không gán lại bằng const: p = gọi q.panel(12, ()=>spent++) | gán p.content bằng '50 KNB'
 const q=harness();let spent=0;const p=q.panel(12,()=>spent++);p.content='50 KNB';q.manager.open(12,p);
// [VI dòng gốc 59] gọi assert.equal(q.mod.beforeTask(), false, 'unknown paid popup does not hold the queue') để kiểm tra hai giá trị bằng nhau
 assert.equal(q.mod.beforeTask(),false,'unknown paid popup does not hold the queue');
// [VI dòng gốc 60] gọi assert.equal(spent, 0) để kiểm tra hai giá trị bằng nhau | gọi q.mod.stop() để dừng bộ điều khiển và dọn tài nguyên
 assert.equal(spent,0);q.mod.stop();
// [VI dòng gốc 61] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 62] gọi console.log('PASS popup priority: agree before scene lease, brief queue yield, stop releases priority, paid popup never clicked')
console.log('PASS popup priority: agree before scene lease, brief queue yield, stop releases priority, paid popup never clicked');
// [VI dòng gốc 63] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 64] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng {. Đọc cùng dòng mở phía trên: {
{
// [VI dòng gốc 65] Khai báo biến không gán lại bằng const: q = gọi harness() | Khai báo biến có thể gán lại bằng let: fused = 0 | Khai báo biến không gán lại bằng const: bag = tạo đối tượng gồm quickOneKeyFusion | tăng fused một đơn vị sau khi lấy giá trị
 const q=harness();let fused=0;const bag={quickOneKeyFusion(){fused++;}};q.W._Ba._Ic={_aQ:{ins:bag}};
// [VI dòng gốc 66] Khai báo biến không gán lại bằng const: p = gọi q.panel(12, ()=>bag.quickOneKeyFusion()) | gán p.title bằng 'Nhắc nhở' | gán p.content bằng 'Sức chứa túi là hiện tại không đủ, Dung luyện nhanh?'
 const p=q.panel(12,()=>bag.quickOneKeyFusion());p.title='Nhắc nhở';p.content='Sức chứa túi  là  hiện tại không đủ, Dung luyện nhanh?';
// [VI dòng gốc 67] gán p._oBn.method bằng bag.quickOneKeyFusion | gán p._oBn.caller bằng bag
 p._oBn.method=bag.quickOneKeyFusion;p._oBn.caller=bag;
// [VI dòng gốc 68] gọi q.manager.open(12, p) | gọi q.flush() | gọi assert.equal(fused, 1) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.mod.status().history.at(-1).kind, 'bag_quick_fusion') để kiểm tra hai giá trị bằng nhau
 q.manager.open(12,p);q.flush();assert.equal(fused,1);assert.equal(q.mod.status().history.at(-1).kind,'bag_quick_fusion');
// [VI dòng gốc 69] gọi q.poll() | gọi assert.equal(fused, 1) để kiểm tra hai giá trị bằng nhau | gọi q.mod.stop() để dừng bộ điều khiển và dọn tài nguyên
 q.poll();assert.equal(fused,1);q.mod.stop();
// [VI dòng gốc 70] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 71] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng {. Đọc cùng dòng mở phía trên: {
{
// [VI dòng gốc 72] Khai báo biến không gán lại bằng const: q = gọi harness() | Khai báo biến có thể gán lại bằng let: spent = 0 | Khai báo biến không gán lại bằng const: bag = tạo đối tượng gồm quickOneKeyFusion | gán q.W._Ba._Ic bằng {_aQ:{ins:bag}}
 const q=harness();let spent=0;const bag={quickOneKeyFusion(){}};q.W._Ba._Ic={_aQ:{ins:bag}};
// [VI dòng gốc 73] Khai báo biến không gán lại bằng const: p = gọi q.panel(12, ()=>spent++) | gán p.content bằng 'Sức chứa túi hiện tại không đủ, Dung luyện nhanh?'
 const p=q.panel(12,()=>spent++);p.content='Sức chứa túi hiện tại không đủ, Dung luyện nhanh?';
// [VI dòng gốc 74] gán p._oBn.method bằng ()=>spent++ | gán p._oBn.caller bằng bag | gọi q.manager.open(12, p) | gọi q.flush()
 p._oBn.method=()=>spent++;p._oBn.caller=bag;q.manager.open(12,p);q.flush();assert.equal(spent,0);q.mod.stop();
// [VI dòng gốc 75] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 76] gọi console.log('PASS bag-full popup: exact native fusion handler identity allowed once, unrelated callback blocked')
console.log('PASS bag-full popup: exact native fusion handler identity allowed once, unrelated callback blocked');
// [VI dòng gốc 77] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 78] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng {. Đọc cùng dòng mở phía trên: {
{
// [VI dòng gốc 79] Khai báo biến không gán lại bằng const: q = gọi harness() | Khai báo biến có thể gán lại bằng let: fused = 0 | Khai báo biến không gán lại bằng const: bag = tạo đối tượng gồm quickOneKeyFusion | tăng fused một đơn vị sau khi lấy giá trị
 const q=harness();let fused=0;const bag={quickOneKeyFusion(){fused++;}};q.W._Ba._Ic={_aQ:{ins:bag}};
// [VI dòng gốc 80] Khai báo biến không gán lại bằng const: p = gọi q.panel(12, ()=>bag.quickOneKeyFusion()) | gán p.contentTxt bằng {text:null}
 const p=q.panel(12,()=>bag.quickOneKeyFusion());p.contentTxt={text:null};
// [VI dòng gốc 81] gọi Object.defineProperty(p.contentTxt, 'innerHTML', {set(value){}})
 Object.defineProperty(p.contentTxt,'innerHTML',{set(value){}});
// [VI dòng gốc 82] gán p._oBn.method bằng bag.quickOneKeyFusion | gán p._oBn.caller bằng bag
 p._oBn.method=bag.quickOneKeyFusion;p._oBn.caller=bag;
// [VI dòng gốc 83] gọi q.manager.open(12, p) | gọi q.flush() | gọi assert.equal(fused, 1, 'setter-only native content must not block verified fusion') để kiểm tra hai giá trị bằng nhau
 q.manager.open(12,p);q.flush();assert.equal(fused,1,'setter-only native content must not block verified fusion');
// [VI dòng gốc 84] gọi q.poll() | gọi assert.equal(fused, 1) để kiểm tra hai giá trị bằng nhau | gọi q.mod.stop() để dừng bộ điều khiển và dọn tài nguyên
 q.poll();assert.equal(fused,1);q.mod.stop();
// [VI dòng gốc 85] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 86] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng {. Đọc cùng dòng mở phía trên: {
{
// [VI dòng gốc 87] Khai báo biến không gán lại bằng const: q = gọi harness() | Khai báo biến có thể gán lại bằng let: fused = 0 | Khai báo biến không gán lại bằng const: bag = tạo đối tượng gồm quickOneKeyFusion | tăng fused một đơn vị sau khi lấy giá trị
 const q=harness();let fused=0;const bag={quickOneKeyFusion(){fused++;}};q.W._Ba._Ic={_aQ:{ins:bag}};
// [VI dòng gốc 88] Khai báo biến không gán lại bằng const: p = gọi q.panel(12, ()=>bag.quickOneKeyFusion()) | gán p._oBn.method bằng bag.quickOneKeyFusion | gán p._oBn.caller bằng {}
 const p=q.panel(12,()=>bag.quickOneKeyFusion());p._oBn.method=bag.quickOneKeyFusion;p._oBn.caller={};
// [VI dòng gốc 89] gọi q.manager.open(12, p) | gọi q.flush() | gọi assert.equal(fused, 0, 'wrong caller remains unverified') để kiểm tra hai giá trị bằng nhau | gọi q.mod.stop() để dừng bộ điều khiển và dọn tài nguyên
 q.manager.open(12,p);q.flush();assert.equal(fused,0,'wrong caller remains unverified');q.mod.stop();
// [VI dòng gốc 90] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 91] gọi console.log('PASS real popup regression: unreadable content with exact native handler confirms once; wrong caller blocked')
console.log('PASS real popup regression: unreadable content with exact native handler confirms once; wrong caller blocked');
// [VI dòng gốc 92] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 93] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng {. Đọc cùng dòng mở phía trên: {
{
// [VI dòng gốc 94] Khai báo biến không gán lại bằng const: q = gọi harness(); closed = tạo mảng gồm 0 vị trí: [] | gán q.manager.close bằng function(id){closed.push(id);const p=this.getPanelById(id);if(p)p.parent=null;} | gọi closed.push(id) để thêm phần tử vào cuối mảng | Khai báo biến không gán lại bằng const: p = gọi this.getPanelById(id)
 const q=harness(),closed=[];q.manager.close=function(id){closed.push(id);const p=this.getPanelById(id);if(p)p.parent=null;};
// [VI dòng gốc 95] gọi q.manager.open(118, {parent:{}}) | gọi assert.equal(closed.length, 0) để kiểm tra hai giá trị bằng nhau | gọi q.flush() | gọi assert.deepEqual(closed, [118]) để kiểm tra cấu trúc hai giá trị tương đương
 q.manager.open(118,{parent:{}});assert.equal(closed.length,0);q.flush();assert.deepEqual(closed,[118]);
// [VI dòng gốc 96] gọi assert.equal(q.mod.status().history.at(-1).kind, 'first_recharge_close') để kiểm tra hai giá trị bằng nhau | gọi q.poll() | gọi assert.equal(closed.length, 1) để kiểm tra hai giá trị bằng nhau
 assert.equal(q.mod.status().history.at(-1).kind,'first_recharge_close');q.poll();assert.equal(closed.length,1);
// [VI dòng gốc 97] gọi q.manager.open(118, {parent:{}}) | gọi q.flush() | gọi assert.equal(closed.length, 2) để kiểm tra hai giá trị bằng nhau
 q.manager.open(118,{parent:{}});q.flush();assert.equal(closed.length,2);
// [VI dòng gốc 98] gọi q.manager.open(424, {parent:{}}) | gọi q.flush() | gọi assert.equal(closed.length, 2, 'other payment windows untouched') để kiểm tra hai giá trị bằng nhau | gọi q.mod.stop() để dừng bộ điều khiển và dọn tài nguyên
 q.manager.open(424,{parent:{}});q.flush();assert.equal(closed.length,2,'other payment windows untouched');q.mod.stop();
// [VI dòng gốc 99] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 100] gọi console.log('PASS first recharge promotion: async close 118 only, reopen closes again, other windows untouched')
console.log('PASS first recharge promotion: async close 118 only, reopen closes again, other windows untouched');
// [VI dòng gốc 101] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 102] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng {. Đọc cùng dòng mở phía trên: {
{
// [VI dòng gốc 103] Khai báo biến không gán lại bằng const: q = gọi harness(); closed = tạo mảng gồm 0 vị trí: [] | Định nghĩa lớp QuickBuy. | gán q.W._Ba._LJ bằng {_fBi:QuickBuy}
 const q=harness(),closed=[];class QuickBuy{}q.W._Ba._LJ={_fBi:QuickBuy};
// [VI dòng gốc 104] gán q.manager.close bằng function(id){closed.push(id);this.getPanelById(id).parent=null;} | gọi closed.push(id) để thêm phần tử vào cuối mảng | gán this.getPanelById(id).parent bằng null
 q.manager.close=function(id){closed.push(id);this.getPanelById(id).parent=null;};
// [VI dòng gốc 105] gọi q.manager.open(802, new QuickBuy()) | gọi q.flush() | gọi assert.deepEqual(closed, [802]) để kiểm tra cấu trúc hai giá trị tương đương
 q.manager.open(802,new QuickBuy());q.flush();assert.deepEqual(closed,[802]);
// [VI dòng gốc 106] gọi q.manager.open(802, new QuickBuy()) | gọi q.flush() | gọi assert.equal(closed.length, 2) để kiểm tra hai giá trị bằng nhau
 q.manager.open(802,new QuickBuy());q.flush();assert.equal(closed.length,2);
// [VI dòng gốc 107] gọi q.manager.open(424, {}) | gọi q.flush() | gọi assert.equal(closed.length, 2) để kiểm tra hai giá trị bằng nhau
 q.manager.open(424,{});q.flush();assert.equal(closed.length,2);
// [VI dòng gốc 108] gọi q.manager.open(999, new QuickBuy()) | gọi q.flush() | gọi assert.equal(closed.at(-1), 999, 'class identification supports changed ID') để kiểm tra hai giá trị bằng nhau | gọi q.mod.stop() để dừng bộ điều khiển và dọn tài nguyên
 q.manager.open(999,new QuickBuy());q.flush();assert.equal(closed.at(-1),999,'class identification supports changed ID');q.mod.stop();
// [VI dòng gốc 109] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 110] gọi console.log('PASS quick-buy promotion: exact native class closes asynchronously, repeats on reopen, unrelated offers untouched')
console.log('PASS quick-buy promotion: exact native class closes asynchronously, repeats on reopen, unrelated offers untouched');
// [VI dòng gốc 111] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 112] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng {. Đọc cùng dòng mở phía trên: {
{
// [VI dòng gốc 113] Khai báo biến không gán lại bằng const: q = gọi harness(); closed = tạo mảng gồm 0 vị trí: [] | Định nghĩa lớp CombinedQuickBuy. | gán q.W._Ba._LJ bằng {_eBi:CombinedQuickBuy}
 const q=harness(),closed=[];class CombinedQuickBuy{}q.W._Ba._LJ={_eBi:CombinedQuickBuy};
// [VI dòng gốc 114] gán q.manager.close bằng function(id){closed.push(id);this.getPanelById(id).parent=null;} | gọi closed.push(id) để thêm phần tử vào cuối mảng | gán this.getPanelById(id).parent bằng null
 q.manager.close=function(id){closed.push(id);this.getPanelById(id).parent=null;};
// [VI dòng gốc 115] gọi q.manager.open(372, new CombinedQuickBuy()) | gọi q.flush() | gọi assert.deepEqual(closed, [372]) để kiểm tra cấu trúc hai giá trị tương đương
 q.manager.open(372,new CombinedQuickBuy());q.flush();assert.deepEqual(closed,[372]);
// [VI dòng gốc 116] gọi q.manager.open(372, new CombinedQuickBuy()) | gọi q.flush() | gọi assert.deepEqual(closed, [372,372]) để kiểm tra cấu trúc hai giá trị tương đương
 q.manager.open(372,new CombinedQuickBuy());q.flush();assert.deepEqual(closed,[372,372]);
// [VI dòng gốc 117] gọi q.manager.open(802, {}) | gọi q.flush() | gọi assert.equal(closed.length, 2, 'ID alone never closes unrelated panel') để kiểm tra hai giá trị bằng nhau | gọi q.mod.stop() để dừng bộ điều khiển và dọn tài nguyên
 q.manager.open(802,{});q.flush();assert.equal(closed.length,2,'ID alone never closes unrelated panel');q.mod.stop();
// [VI dòng gốc 118] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 119] gọi console.log('PASS live quick-buy regression: window372 class _eBi closes on every opening, unrelated class preserved')
console.log('PASS live quick-buy regression: window372 class _eBi closes on every opening, unrelated class preserved');
// [VI dòng gốc 120] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 121] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng {. Đọc cùng dòng mở phía trên: {
{
// [VI dòng gốc 122] Khai báo biến không gán lại bằng const: q = gọi harness() | Khai báo biến có thể gán lại bằng let: exits = 0
 const q=harness();let exits=0;
// [VI dòng gốc 123] Định nghĩa lớp NativeVictory. | gán this.okBtn bằng {label:'Đồng ý(3)'} | gán this.content bằng 'Nhận thưởng Nguyên Bảo 100' | tăng exits một đơn vị sau khi lấy giá trị
 class NativeVictory {constructor(){this.okBtn={label:'Đồng ý(3)'};this.content='Nhận thưởng Nguyên Bảo 100';}close(){exits++;this.parent=null;}}
// [VI dòng gốc 124] gán q.W._Ba._sst bằng {_EVn:NativeVictory} | Khai báo biến không gán lại bằng const: p = tạo đối tượng bằng NativeVictory() | gọi q.manager.open(777, p)
 q.W._Ba._sst={_EVn:NativeVictory};const p=new NativeVictory();q.manager.open(777,p);
// [VI dòng gốc 125] gọi q.flush() | gọi assert.equal(exits, 1, 'verified native victory closes immediately despite reward currency text') để kiểm tra hai giá trị bằng nhau
 q.flush();assert.equal(exits,1,'verified native victory closes immediately despite reward currency text');
// [VI dòng gốc 126] gọi q.poll() | gọi assert.equal(exits, 1) để kiểm tra hai giá trị bằng nhau | gọi q.load() | gọi q.flush()
 q.poll();assert.equal(exits,1);q.load();q.flush();assert.equal(exits,1,'reload cannot replay closed result');
// [VI dòng gốc 127] Khai báo biến không gán lại bằng const: unknown = gọi q.panel(778, ()=>exits++) | gán unknown.content bằng 'Nhận thưởng Nguyên Bảo' | gọi q.manager.open(778, unknown) | gọi q.flush()
 const unknown=q.panel(778,()=>exits++);unknown.content='Nhận thưởng Nguyên Bảo';q.manager.open(778,unknown);q.flush();assert.equal(exits,1,'lookalike currency callback stays blocked');
// [VI dòng gốc 128] Khai báo biến không gán lại bằng const: changed = tạo đối tượng bằng NativeVictory() | gán changed.close bằng ()=>exits++ | gọi q.manager.open(779, changed) | gọi q.flush()
 const changed=new NativeVictory();changed.close=()=>exits++;q.manager.open(779,changed);q.flush();assert.equal(exits,1,'foreign result close override stays blocked');
// [VI dòng gốc 129] gọi q.mod.stop() để dừng bộ điều khiển và dọn tài nguyên
 q.mod.stop();
// [VI dòng gốc 130] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 131] gọi console.log('PASS native victory: exact class and close handler, countdown skipped, reward currency accepted, foreign callback block…)
console.log('PASS native victory: exact class and close handler, countdown skipped, reward currency accepted, foreign callback blocked');
// [VI dòng gốc 132] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 133] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng {. Đọc cùng dòng mở phía trên: {
{
// [VI dòng gốc 134] Khai báo biến không gán lại bằng const: q = gọi harness() | Khai báo biến có thể gán lại bằng let: closes = 0
 const q=harness();let closes=0;
// [VI dòng gốc 135] Định nghĩa lớp Showcase. | gán this._Qh bằng type | gán this.closeOnSide bằng true | tăng closes một đơn vị sau khi lấy giá trị
 class Showcase {constructor(type){this._Qh=type;this.closeOnSide=true;}close(){closes++;this.parent=null;}}
// [VI dòng gốc 136] gán q.W._Ba._Ytt bằng {_yti:Showcase}
 q.W._Ba._Ytt={_yti:Showcase};
// [VI dòng gốc 137] Duyệt từng giá trị trong [11,19,13] bằng const type. | Khai báo biến không gán lại bằng const: type (chưa gán giá trị) | Khai báo biến không gán lại bằng const: p = tạo đối tượng bằng Showcase(type) | gọi q.manager.open(92, p)
 for(const type of [11,19,13]){const p=new Showcase(type);q.manager.open(92,p);q.flush();assert.equal(p.parent,null);}
// [VI dòng gốc 138] gọi assert.equal(closes, 3, 'CoBao and shared native activation variants close without an OK button') để kiểm tra hai giá trị bằng nhau
 assert.equal(closes,3,'CoBao and shared native activation variants close without an OK button');
// [VI dòng gốc 139] gọi q.poll() | gọi q.load() | gọi q.flush() | gọi assert.equal(closes, 3, 'closed showcase never repeats after reload') để kiểm tra hai giá trị bằng nhau
 q.poll();q.load();q.flush();assert.equal(closes,3,'closed showcase never repeats after reload');
// [VI dòng gốc 140] Khai báo biến không gán lại bằng const: p = tạo đối tượng bằng Showcase(11) | gán p.close bằng ()=>closes++ | gọi q.manager.open(92, p) | gọi q.flush()
 const p=new Showcase(11);p.close=()=>closes++;q.manager.open(92,p);q.flush();assert.equal(closes,3,'foreign close hook is preserved');
// [VI dòng gốc 141] Khai báo biến không gán lại bằng const: other = tạo đối tượng gồm closeOnSide, close, tipTxt | tăng closes một đơn vị sau khi lấy giá trị
 const other={closeOnSide:true,close(){closes++;},tipTxt:{text:'Nhấp vào chỗ trống để thoát'}};
// [VI dòng gốc 142] gọi q.manager.open(333, other) | gọi q.flush() | gọi assert.equal(closes, 3, 'label and closeOnSide alone never authorize unknown windows') để kiểm tra hai giá trị bằng nhau
 q.manager.open(333,other);q.flush();assert.equal(closes,3,'label and closeOnSide alone never authorize unknown windows');
// [VI dòng gốc 143] Khai báo biến không gán lại bằng const: hidden = tạo đối tượng bằng Showcase(11) | gọi q.manager.open(92, hidden) | gán hidden.visible bằng false | gọi q.flush()
 const hidden=new Showcase(11);q.manager.open(92,hidden);hidden.visible=false;q.flush();assert.equal(closes,3);
// [VI dòng gốc 144] gán hidden.visible bằng true | gọi q.poll() | gọi assert.equal(closes, 4) để kiểm tra hai giá trị bằng nhau | gọi q.mod.stop() để dừng bộ điều khiển và dọn tài nguyên
 hidden.visible=true;q.poll();assert.equal(closes,4);q.mod.stop();
// [VI dòng gốc 145] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 146] gọi console.log('PASS activation showcases: exact shared native class, outside-close semantics, all variants, hidden guard, reload and f…)
console.log('PASS activation showcases: exact shared native class, outside-close semantics, all variants, hidden guard, reload and foreign hook protection');
// [VI dòng gốc 147] Dòng trống để tách các phần, không có lệnh thực thi.
