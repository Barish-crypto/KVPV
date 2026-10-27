// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: Mô phỏng popup native; không xác nhận server đã dùng vật phẩm. [đóng chú thích]
/* Mô phỏng popup native; không xác nhận server đã dùng vật phẩm. */
// [VI dòng gốc 2] "use strict"
'use strict';
// [VI dòng gốc 3] Khai báo biến không gán lại bằng const: fs = gọi require('node:fs') để nạp module Node.js; vm = gọi require('node:vm') để nạp module Node.js; assert = gọi require('node:assert/strict') để nạp module Node.js
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
// [VI dòng gốc 4] Khai báo biến không gán lại bằng const: source = gọi fs.readFileSync(__dirname+'/src/21-quick-use.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm, '')
const source=fs.readFileSync(__dirname+'/src/21-quick-use.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,'');
// [VI dòng gốc 5] Định nghĩa hàm harness; tham số: không có
function harness(){
// [VI dòng gốc 6] Khai báo biến không gán lại bằng const: tasks = tạo đối tượng bằng Map(); intervals = tạo đối tượng bằng Map(); calls = tạo mảng gồm 0 vị trí: [] | Khai báo biến có thể gán lại bằng let: seq = 0; item = null; inBag = true; depth = 0
 const tasks=new Map(),intervals=new Map(),calls=[];let seq=0,item=null,inBag=true,depth=0;
// [VI dòng gốc 7] Khai báo biến không gán lại bằng const: popup = tạo đối tượng gồm parent, visible, useBtn, getItem, _M_0
 const popup={parent:{},visible:true,useBtn:{label:'Dùng',visible:true,disabled:false},getItem:()=>item,
// [VI dòng gốc 8] tăng depth một đơn vị sau khi lấy giá trị | gọi assert.equal(depth, 1) để kiểm tra hai giá trị bằng nhau | gọi calls.push(item.slice()) để thêm phần tử vào cuối mảng | giảm depth một đơn vị sau khi lấy giá trị
   _M_0(){depth++;assert.equal(depth,1);calls.push(item.slice());depth--;}};
// [VI dòng gốc 9] Khai báo biến không gán lại bằng const: model = tạo đối tượng gồm _Wr, _Rst | gán item bằng value | Kết thúc hàm hiện tại và trả về: "native-result".
 const model={_Wr:popup,_Rst(value){item=value;return 'native-result';}};
// [VI dòng gốc 10] Khai báo biến không gán lại bằng const: native = đọc model._Rst
 const native=model._Rst;
// [VI dòng gốc 11] Khai báo biến không gán lại bằng const: W = tạo đối tượng gồm __KVPV_OWN_ACTOR_ID, _Ba, KVPV_DAILY, KVPV_HITRUN1, setTimeout, clearTimeout, setInterval, clearInterval
 const W={__KVPV_OWN_ACTOR_ID:'12345',_Ba:{_rJ:{_O$:{ins:{actorId:'12345'}}},_aJ:{_hJ:{ins:model}},
// [VI dòng gốc 12] Thuộc tính _Ic: tạo đối tượng gồm _aQ | Thuộc tính _aQ: tạo đối tượng gồm ins | Thuộc tính ins: tạo đối tượng gồm getItemByIdAndUid | Thuộc tính getItemByIdAndUid: tạo hàm với tham số (không có); mỗi lần gọi trả về nếu inBag thì lấy item, ngược lại lấy null
   _Ic:{_aQ:{ins:{getItemByIdAndUid:()=>inBag?item:null}}}},
// [VI dòng gốc 13] Thuộc tính KVPV_DAILY: tạo đối tượng gồm quickState | Thuộc tính quickState: tạo hàm với tham số (không có); mỗi lần gọi trả về tạo đối tượng gồm job | Thuộc tính job: "busy_dungeon" | Thuộc tính KVPV_HITRUN1: tạo đối tượng gồm status
   KVPV_DAILY:{quickState:()=>({job:'busy_dungeon'})},KVPV_HITRUN1:{status:()=>({running:true,phase:'FIGHT'})},
// [VI dòng gốc 14] gọi tasks.set(++seq, fn) | Kết thúc hàm hiện tại và trả về: seq.
   setTimeout:fn=>{tasks.set(++seq,fn);return seq;},clearTimeout:id=>tasks.delete(id),
// [VI dòng gốc 15] gọi intervals.set(++seq, fn) | Kết thúc hàm hiện tại và trả về: seq.
   setInterval:fn=>{intervals.set(++seq,fn);return seq;},clearInterval:id=>intervals.delete(id)};
// [VI dòng gốc 16] Khai báo biến không gán lại bằng const: load = tạo hàm với tham số (không có); mỗi lần gọi trả về gọi vm.runInNewContext(source, {window:W}) để chạy mã trong ngữ cảnh máy ảo dùng cho kiểm thử | gọi load()
 const load=()=>vm.runInNewContext(source,{window:W});load();
// [VI dòng gốc 17] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm W, popup, model, native, calls, tasks, intervals, load, mod, setItem, bag, flush, poll. | Kết thúc hàm hiện tại và trả về: đọc W.KVPV_QUICK_USE.
 return {W,popup,model,native,calls,tasks,intervals,load,get mod(){return W.KVPV_QUICK_USE;},
// [VI dòng gốc 18] gán item bằng value | gán inBag bằng v
   setItem(value){item=value;},bag(v){inBag=v;},
// [VI dòng gốc 19] Khai báo biến không gán lại bằng const: entries = tạo mảng gồm 1 vị trí: [...tasks] | Duyệt từng giá trị trong entries bằng const [id,fn]. | Khai báo biến không gán lại bằng const: [id,fn] (chưa gán giá trị) | gọi tasks.delete(id)
   flush(){const entries=[...tasks];for(const [id,fn] of entries){tasks.delete(id);fn();}},
// [VI dòng gốc 20] Duyệt từng giá trị trong intervals.values() bằng const fn. | Khai báo biến không gán lại bằng const: fn (chưa gán giá trị) | gọi fn()
   poll(){for(const fn of intervals.values())fn();}};
// [VI dòng gốc 21] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 22] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng {. Đọc cùng dòng mở phía trên: {
{
// [VI dòng gốc 23] Khai báo biến không gán lại bằng const: q = gọi harness() | gọi q.setItem([20000001,7,'uid1']) để ghi giá trị vào bộ lưu trữ | gọi assert.equal(q.calls.length, 0) để kiểm tra hai giá trị bằng nhau | gọi q.flush()
 const q=harness();q.setItem([20000001,7,'uid1']);assert.equal(q.calls.length,0);q.flush();assert.equal(q.calls.length,1);
// [VI dòng gốc 24] gọi assert.equal(q.mod.status().requests, 1) để kiểm tra hai giá trị bằng nhau | gọi q.poll() | gọi assert.equal(q.calls.length, 1) để kiểm tra hai giá trị bằng nhau
 assert.equal(q.mod.status().requests,1);q.poll();q.poll();assert.equal(q.calls.length,1);
// [VI dòng gốc 25] gọi assert.equal(q.model._Rst([20000002,3,'uid2']), 'native-result') để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.calls.length, 1) để kiểm tra hai giá trị bằng nhau | gọi q.flush() | gọi assert.equal(q.calls.length, 2) để kiểm tra hai giá trị bằng nhau
 assert.equal(q.model._Rst([20000002,3,'uid2']),'native-result');assert.equal(q.calls.length,1);q.flush();assert.equal(q.calls.length,2);
// [VI dòng gốc 26] gọi q.load() | gọi q.flush() | gọi assert.equal(q.calls.length, 2) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.mod.status().requests, 2) để kiểm tra hai giá trị bằng nhau
 q.load();q.flush();assert.equal(q.calls.length,2);assert.equal(q.mod.status().requests,2);
// [VI dòng gốc 27] gọi q.mod.stop() để dừng bộ điều khiển và dọn tài nguyên | gọi assert.equal(q.model._Rst, q.native) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.tasks.size, 0) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.intervals.size, 0) để kiểm tra hai giá trị bằng nhau
 q.mod.stop();assert.equal(q.model._Rst,q.native);assert.equal(q.tasks.size,0);assert.equal(q.intervals.size,0);
// [VI dòng gốc 28] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 29] Duyệt từng giá trị trong ['Mua','Xem','Đổi','Trang bị'] bằng const label. | Khai báo biến không gán lại bằng const: label (chưa gán giá trị)
for(const label of ['Mua','Xem','Đổi','Trang bị']){
// [VI dòng gốc 30] Khai báo biến không gán lại bằng const: q = gọi harness() | gán q.popup.useBtn.label bằng label | gọi q.setItem([20000001,1,'uid']) để ghi giá trị vào bộ lưu trữ | gọi q.flush()
 const q=harness();q.popup.useBtn.label=label;q.setItem([20000001,1,'uid']);q.flush();assert.equal(q.calls.length,0);q.mod.stop();
// [VI dòng gốc 31] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 32] Duyệt từng giá trị trong ['hidden','detached','disabled','missingBag','actorChanged'] bằng const condition. | Khai báo biến không gán lại bằng const: condition (chưa gán giá trị)
for(const condition of ['hidden','detached','disabled','missingBag','actorChanged']){
// [VI dòng gốc 33] Khai báo biến không gán lại bằng const: q = gọi harness() | gọi q.setItem([20000001,1,'uid']) để ghi giá trị vào bộ lưu trữ
 const q=harness();q.setItem([20000001,1,'uid']);
// [VI dòng gốc 34] Kiểm tra condition==='hidden': đúng thì chạy nhánh sau if. | gán q.popup.visible bằng false
 if(condition==='hidden')q.popup.visible=false;
// [VI dòng gốc 35] Kiểm tra condition==='detached': đúng thì chạy nhánh sau if. | gán q.popup.parent bằng null
 if(condition==='detached')q.popup.parent=null;
// [VI dòng gốc 36] Kiểm tra condition==='disabled': đúng thì chạy nhánh sau if. | gán q.popup.useBtn.disabled bằng true
 if(condition==='disabled')q.popup.useBtn.disabled=true;
// [VI dòng gốc 37] Kiểm tra condition==='missingBag': đúng thì chạy nhánh sau if. | gọi q.bag(false)
 if(condition==='missingBag')q.bag(false);
// [VI dòng gốc 38] Kiểm tra condition==='actorChanged': đúng thì chạy nhánh sau if. | gán q.W._Ba._rJ._O$.ins.actorId bằng '67890'
 if(condition==='actorChanged')q.W._Ba._rJ._O$.ins.actorId='67890';
// [VI dòng gốc 39] gọi q.flush() | gọi assert.equal(q.calls.length, 0) để kiểm tra hai giá trị bằng nhau | gọi q.mod.stop() để dừng bộ điều khiển và dọn tài nguyên
 q.flush();assert.equal(q.calls.length,0);q.mod.stop();
// [VI dòng gốc 40] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 41] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng {. Đọc cùng dòng mở phía trên: {
{
// [VI dòng gốc 42] Khai báo biến không gán lại bằng const: q = gọi harness() | gọi q.setItem([20000001,1,'uid1']) để ghi giá trị vào bộ lưu trữ
 const q=harness();q.setItem([20000001,1,'uid1']);
// [VI dòng gốc 43] gán q.popup._M_0 bằng function(){q.calls.push(this.getItem().slice());if(q.calls.length===1)q.model._Rst([20000002,1,'uid2']);} | gọi q.calls.push(this.getItem().slice()) để thêm phần tử vào cuối mảng | Kiểm tra q.calls.length===1: đúng thì chạy nhánh sau if. | gọi q.model._Rst([20000002,1,'uid2']); chức năng nội bộ chưa xác minh từ tên hàm
 q.popup._M_0=function(){q.calls.push(this.getItem().slice());if(q.calls.length===1)q.model._Rst([20000002,1,'uid2']);};
// [VI dòng gốc 44] gọi q.flush() | gọi assert.equal(q.calls.length, 1) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.tasks.size, 1) để kiểm tra hai giá trị bằng nhau
 q.flush();assert.equal(q.calls.length,1);assert.equal(q.tasks.size,1); // Món sau nhường event loop, không đệ quy.
// [VI dòng gốc 45] gọi q.flush() | gọi assert.equal(q.calls.length, 2) để kiểm tra hai giá trị bằng nhau | gọi q.mod.stop() để dừng bộ điều khiển và dọn tài nguyên
 q.flush();assert.equal(q.calls.length,2);q.mod.stop();
// [VI dòng gốc 46] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 47] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng {. Đọc cùng dòng mở phía trên: {
{
// [VI dòng gốc 48] Khai báo biến không gán lại bằng const: q = gọi harness() | gọi q.setItem([20000001,1,'uid']) để ghi giá trị vào bộ lưu trữ | gán q.popup._M_0 bằng ()=>{throw Error('native handler failure');} | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('native handler failure')
 const q=harness();q.setItem([20000001,1,'uid']);q.popup._M_0=()=>{throw Error('native handler failure');};
// [VI dòng gốc 49] gọi q.flush() | gọi q.poll() | gọi assert.equal(q.mod.status().requests, 1) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.mod.status().lastError, 'native handler failure') để kiểm tra hai giá trị bằng nhau
 q.flush();q.poll();assert.equal(q.mod.status().requests,1);assert.equal(q.mod.status().lastError,'native handler failure');
// [VI dòng gốc 50] gọi q.load() | gọi q.flush() | gọi assert.equal(q.mod.status().requests, 1) để kiểm tra hai giá trị bằng nhau | gọi q.mod.stop() để dừng bộ điều khiển và dọn tài nguyên
 q.load();q.flush();assert.equal(q.mod.status().requests,1);q.mod.stop();
// [VI dòng gốc 51] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 52] gọi console.log('PASS quick use: deferred native Use handler, independent busy Daily/Boss, item dedup across reload, no Buy/View/Exchang…)
console.log('PASS quick use: deferred native Use handler, independent busy Daily/Boss, item dedup across reload, no Buy/View/Exchange, popup/bag/actor guards, yielding queue and stop cleanup');
// [VI dòng gốc 53] Dòng trống để tách các phần, không có lệnh thực thi.
