// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: Mô phỏng native Thí Luyện Ngày: ACK mới xác nhận, không chứng minh phiên live. [đóng chú thích]
/* Mô phỏng native Thí Luyện Ngày: ACK mới xác nhận, không chứng minh phiên live. */
// [VI dòng gốc 2] "use strict"
'use strict';
// [VI dòng gốc 3] Khai báo biến không gán lại bằng const: fs = gọi require('node:fs') để nạp module Node.js; vm = gọi require('node:vm') để nạp module Node.js; assert = gọi require('node:assert/strict') để nạp module Node.js
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
// [VI dòng gốc 4] Khai báo biến không gán lại bằng const: source = gọi fs.readFileSync(__dirname+'/src/20-daily-trial.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm, '')
const source=fs.readFileSync(__dirname+'/src/20-daily-trial.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,'');
// [VI dòng gốc 5] Định nghĩa hàm harness; tham số: options={}
function harness(options={}){
// [VI dòng gốc 6] Khai báo biến có thể gán lại bằng let: now = 10000; map = 1002; common = true; mission = false; job = "rảnh"; far = false; target = false; lease = null
  let now=10000,map=1002,common=true,mission=false,job='rảnh',far=false,target=false,lease=null;
// [VI dòng gốc 7] Định nghĩa lớp Clock kế thừa Date. | Kết thúc hàm hiện tại và trả về: now.
  class Clock extends Date{static now(){return now;}}
// [VI dòng gốc 8] Khai báo biến không gán lại bằng const: calls = tạo mảng gồm 0 vị trí: []; events = tạo đối tượng bằng Map(); timers = tạo đối tượng bằng Map(); rows = tạo đối tượng gồm | Khai báo biến có thể gán lại bằng let: timer = 0
  const calls=[],events=new Map(),timers=new Map(),rows={};let timer=0;
// [VI dòng gốc 9] Duyệt từng giá trị trong [2051,2061,2721,2071,2081,2301,2331,2321,2311,2341] bằng const id. | Khai báo biến không gán lại bằng const: id (chưa gán giá trị)
  for(const id of [2051,2061,2721,2071,2081,2301,2331,2321,2311,2341]){
// [VI dòng gốc 10] gán rows[id] bằng [id,2,0,0,0,3,0,3,0,0,0]
    rows[id]=[id,2,0,0,0,3,0,3,0,0,0];
// [VI dòng gốc 11] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 12] gán rows[2071][6] bằng options.free??1 | gán rows[2071][8] bằng options.sweeps??2
  rows[2071][6]=options.free??1;rows[2071][8]=options.sweeps??2;
// [VI dòng gốc 13] Khai báo biến không gán lại bằng const: user = tạo đối tượng gồm actorId, ingot, copper, isDead, selectTar
  const user={actorId:'12345',ingot:options.ingot??200,copper:1000,isDead:false,selectTar:(...args)=>calls.push(['target',...args])};
// [VI dòng gốc 14] Khai báo biến không gán lại bằng const: stage = tạo đối tượng gồm auto; arbiter = tạo đối tượng gồm status, acquire, renew, release
  const stage={auto:true},arbiter={
// [VI dòng gốc 15] Thuộc tính status: tạo hàm với tham số (không có); mỗi lần gọi trả về nếu lease thì lấy {owner:'combat',tag:lease}, ngược lại lấy {owner:null,tag:null} | Thuộc tính owner: "combat" | Thuộc tính tag: lease | Thuộc tính owner: null
    status:()=>lease?{owner:'combat',tag:lease}:{owner:null,tag:null},
// [VI dòng gốc 16] Kiểm tra lease&&lease!==tag: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: false. | gán lease bằng tag | Kết thúc hàm hiện tại và trả về: true.
    acquire:(who,tag)=>{if(lease&&lease!==tag)return false;lease=tag;return true;},
// [VI dòng gốc 17] gán lease bằng null
    renew:()=>!!lease,release:()=>{lease=null;}
// [VI dòng gốc 18] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  };
// [VI dòng gốc 19] Khai báo biến không gán lại bằng const: W = tạo đối tượng gồm KVPV_SPENDING_POLICY, __KVPV_OWN_ACTOR_ID, _Ba, _Sa, _d, _C, KVPV, KVPV_DAILY, KVPV_FAR_SCOPE, setInterval, clearInterval
  const W={KVPV_SPENDING_POLICY:{allowKNB:options.allowKNB??true},__KVPV_OWN_ACTOR_ID:'12345',_Ba:{_rJ:{_O$:{ins:user}},_Co:{_Mo:{ins:stage}},
// [VI dòng gốc 20] Kết thúc hàm hiện tại và trả về: common. | Kết thúc hàm hiện tại và trả về: mission.
    _$a:{SceneUtil:{get isCommonScene(){return common;}},_yo:{ins:{get isInMission(){return mission;}}}},
// [VI dòng gốc 21] Thuộc tính _Do: tạo đối tượng gồm _Ho | Thuộc tính _Ho: tạo đối tượng gồm inst | Thuộc tính inst: tạo đối tượng gồm getFcNdShow, getFcIsOpen | Thuộc tính getFcNdShow: tạo hàm với tham số (không có); mỗi lần gọi trả về tính biểu thức options.locked!==true
    _Do:{_Ho:{inst:{getFcNdShow:()=>options.locked!==true,getFcIsOpen:()=>true}}},
// [VI dòng gốc 22] Thuộc tính _sst: tạo đối tượng gồm _ist, _Cht | Thuộc tính _ist: tạo đối tượng gồm inst | Thuộc tính inst: tạo đối tượng gồm timesTab, insp | Thuộc tính timesTab: rows
    _sst:{_ist:{inst:{timesTab:rows,insp:options.inspire?[]:undefined}},_Cht:{inst:{getCpTimes:()=>calls.push(['refresh']),
// [VI dòng gốc 23] Thuộc tính rqEtScene: tạo hàm với tham số ...args; mỗi lần gọi trả về gọi calls.push(['enter',...args]) để thêm phần tử vào cuối mảng | Thuộc tính swpCpy: tạo hàm với tham số id; mỗi lần gọi trả về gọi calls.push(['sweep',id]) để thêm phần tử vào cuối mảng | Thuộc tính rqInsp: tạo hàm với tham số type; mỗi lần gọi trả về gọi calls.push(['inspire',type]) để thêm phần tử vào cuối mảng
      rqEtScene:(...args)=>calls.push(['enter',...args]),swpCpy:id=>calls.push(['sweep',id]),rqInsp:type=>calls.push(['inspire',type])}}},
// [VI dòng gốc 24] Thuộc tính _B_t: tạo đối tượng gồm _KLt | Thuộc tính _KLt: tạo đối tượng gồm ins | Thuộc tính ins: tạo đối tượng gồm getNum | Thuộc tính getNum: tạo hàm với tham số (không có); mỗi lần gọi trả về tạo mảng gồm 1 vị trí: [50]
    _B_t:{_KLt:{ins:{getNum:()=>[50]}}}},
// [VI dòng gốc 25] Kiểm tra events.get(id)===fn: đúng thì chạy nhánh sau if. | gọi events.delete(id)
    _Sa:{notify:{on:(id,o,fn)=>events.set(id,fn),off:(id,o,fn)=>{if(events.get(id)===fn)events.delete(id);}}},
// [VI dòng gốc 26] Kết thúc hàm hiện tại và trả về: map (biến đổi từng phần tử).
    _d:{_Yct:{_Het:function(){}}},_C:{_Mn:{_Cn:{get currentID(){return map;}}},
// [VI dòng gốc 27] Thuộc tính _Ba: tạo đối tượng gồm instance | Thuộc tính instance: tạo đối tượng gồm getRole | Thuộc tính getRole: tạo hàm với tham số (không có); mỗi lần gọi trả về tạo đối tượng gồm getComponent | Thuộc tính getComponent: tạo hàm với tham số (không có); mỗi lần gọi trả về tạo đối tượng gồm isValidTarget
      _Ba:{instance:{getRole:()=>({getComponent:()=>({isValidTarget:()=>target})})}}},
// [VI dòng gốc 28] Thuộc tính KVPV: tạo đối tượng gồm core, timeline | Thuộc tính core: tạo đối tượng gồm scene | Thuộc tính scene: arbiter | Thuộc tính timeline: tạo đối tượng gồm reservation
    KVPV:{core:{scene:arbiter},timeline:{reservation:()=>null}},
// [VI dòng gốc 29] Thuộc tính KVPV_DAILY: tạo đối tượng gồm quickState, config | Thuộc tính quickState: tạo hàm với tham số (không có); mỗi lần gọi trả về tạo đối tượng gồm job | Thuộc tính job: dùng biến cùng tên | Thuộc tính config: tạo đối tượng gồm
    KVPV_DAILY:{quickState:()=>({job}),config:{}},KVPV_FAR_SCOPE:{inside:()=>far},
// [VI dòng gốc 30] gọi timers.set(++timer, fn) | Kết thúc hàm hiện tại và trả về: timer.
    setInterval:fn=>{timers.set(++timer,fn);return timer;},clearInterval:id=>timers.delete(id)};
// [VI dòng gốc 31] Kiểm tra options.inspire: đúng thì chạy nhánh sau if. | gán W._ft bằng {_gY:{ins:{getCfgById:id=>[id,0,id===10304?[50,.1,5]:[20,.1,5]]}}}
  if(options.inspire)W._ft={_gY:{ins:{getCfgById:id=>[id,0,id===10304?[50,.1,5]:[20,.1,5]]}}};
// [VI dòng gốc 32] Kiểm tra options.busy: đúng thì chạy nhánh sau if. | gán job bằng 'another_job'
  if(options.busy)job='another_job';
// [VI dòng gốc 33] Kiểm tra options.actualCore: đúng thì chạy nhánh sau if. | gọi vm.runInNewContext(fs.readFileSync(__dirname+'/src/02-scene.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,''), {window:W,_Ba:W._…) để chạy mã trong ngữ cảnh máy ảo dùng cho kiểm thử
  if(options.actualCore)vm.runInNewContext(fs.readFileSync(__dirname+'/src/02-scene.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,''),{window:W,_Ba:W._Ba,_ft:W._ft??{},Date:Clock});
// [VI dòng gốc 34] gọi vm.runInNewContext(source, {window:W,Date:Clock}) để chạy mã trong ngữ cảnh máy ảo dùng cho kiểm thử
  vm.runInNewContext(source,{window:W,Date:Clock});
// [VI dòng gốc 35] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm W, calls, rows, user, stage, events, mod, advance, map, job, far, target, reload. | Kết thúc hàm hiện tại và trả về: đọc W.KVPV_DAILY_TRIAL.
  return {W,calls,rows,user,stage,events,get mod(){return W.KVPV_DAILY_TRIAL;},
// [VI dòng gốc 36] cập nhật bằng toán tử += now bằng ms | gọi W.KVPV_DAILY_TRIAL.sync()
    advance(ms=1000){now+=ms;W.KVPV_DAILY_TRIAL.sync();},
// [VI dòng gốc 37] gán map bằng id | gán common bằng isCommon | gán job bằng v | gán far bằng v
    map(id,isCommon=false){map=id;common=isCommon;},job(v){job=v;},far(v){far=v;},target(v){target=v;},
// [VI dòng gốc 38] gọi vm.runInNewContext(source, {window:W,Date:Clock}) để chạy mã trong ngữ cảnh máy ảo dùng cho kiểm thử
    reload(){vm.runInNewContext(source,{window:W,Date:Clock});}};
// [VI dòng gốc 39] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 40] Khai báo biến không gán lại bằng const: actions = tạo hàm với tham số q; mỗi lần gọi trả về gọi q.calls.filter(x=>['enter','sweep'].includes(x[0])) để giữ phần tử thỏa điều kiện
const actions=q=>q.calls.filter(x=>['enter','sweep'].includes(x[0]));
// [VI dòng gốc 41] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng {. Đọc cùng dòng mở phía trên: {
{
// [VI dòng gốc 42] Khai báo biến không gán lại bằng const: q = gọi harness() | gọi assert.deepEqual(actions(q), [['enter',2071,2]]) để kiểm tra cấu trúc hai giá trị tương đương | gọi assert.equal(q.stage.auto, false) để kiểm tra hai giá trị bằng nhau
 const q=harness();assert.deepEqual(actions(q),[['enter',2071,2]]);assert.equal(q.stage.auto,false);
// [VI dòng gốc 43] gọi q.advance(5000) | gọi assert.equal(actions(q).length, 1) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.mod.status().entries, 0) để kiểm tra hai giá trị bằng nhau
 q.advance(5000);assert.equal(actions(q).length,1);assert.equal(q.mod.status().entries,0);
// [VI dòng gốc 44] Khai báo biến không gán lại bằng const: old = đọc q.mod | gọi q.reload() | gọi assert.notEqual(q.W.KVPV_DAILY_TRIAL, old) | gọi assert.equal(q.mod.status().inFlight, true) để kiểm tra hai giá trị bằng nhau
 const old=q.mod;q.reload();assert.notEqual(q.W.KVPV_DAILY_TRIAL,old);assert.equal(q.mod.status().inFlight,true);assert.equal(actions(q).length,1);
// [VI dòng gốc 45] gọi q.map(2071) để biến đổi từng phần tử | gọi q.advance() | gọi assert.equal(q.mod.status().entries, 1) để kiểm tra hai giá trị bằng nhau | gọi assert(q.calls.some(x=>x[0]==='target'&&x[1]===1)) để kiểm tra điều kiện của bài test
 q.map(2071);q.advance();assert.equal(q.mod.status().entries,1);assert(q.calls.some(x=>x[0]==='target'&&x[1]===1));
// [VI dòng gốc 46] gọi q.events.get(5112)() | gọi q.advance(2500) | gọi assert.deepEqual(actions(q).at(-1), ['enter',0]) để kiểm tra cấu trúc hai giá trị tương đương | gọi q.advance(3000)
 q.events.get(5112)();q.advance(2500);assert.deepEqual(actions(q).at(-1),['enter',0]);q.advance(3000);assert.equal(actions(q).filter(x=>x[1]===0).length,1);
// [VI dòng gốc 47] gọi q.map(1002, true) để biến đổi từng phần tử | gán q.rows[2071][6] bằng 0 | gọi q.advance() | gọi assert.equal(q.mod.status().returns, 1) để kiểm tra hai giá trị bằng nhau
 q.map(1002,true);q.rows[2071][6]=0;q.advance();assert.equal(q.mod.status().returns,1);
// [VI dòng gốc 48] gọi q.advance(2000) | gọi assert.deepEqual(actions(q).at(-1), ['sweep',2071]) để kiểm tra cấu trúc hai giá trị tương đương | gọi assert.equal(q.mod.status().sweepConfirmed, 0) để kiểm tra hai giá trị bằng nhau
 q.advance(2000);assert.deepEqual(actions(q).at(-1),['sweep',2071]);assert.equal(q.mod.status().sweepConfirmed,0);
// [VI dòng gốc 49] gọi q.advance(2000) | gọi assert.equal(actions(q).filter(x=>x[0]==='sweep').length, 1) để kiểm tra hai giá trị bằng nhau
 q.advance(2000);assert.equal(actions(q).filter(x=>x[0]==='sweep').length,1);
// [VI dòng gốc 50] gán q.rows[2071][8] bằng 1 | gán q.rows[2071][10] bằng 1 | gán q.user.ingot bằng 150 | gọi q.advance()
 q.rows[2071][8]=1;q.rows[2071][10]=1;q.user.ingot=150;q.advance();assert.equal(q.mod.status().sweepConfirmed,1);
// [VI dòng gốc 51] gọi q.advance(2000) | gọi assert.equal(actions(q).filter(x=>x[0]==='sweep').length, 2) để kiểm tra hai giá trị bằng nhau
 q.advance(2000);assert.equal(actions(q).filter(x=>x[0]==='sweep').length,2);
// [VI dòng gốc 52] gán q.rows[2071][8] bằng 0 | gán q.rows[2071][10] bằng 2 | gán q.user.ingot bằng 100 | gọi q.advance()
 q.rows[2071][8]=0;q.rows[2071][10]=2;q.user.ingot=100;q.advance();q.advance(2000);
// [VI dòng gốc 53] gọi assert.equal(q.mod.status().sweepConfirmed, 2) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.mod.status().confirmedSweepCost, 100) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.stage.auto, true) để kiểm tra hai giá trị bằng nhau
 assert.equal(q.mod.status().sweepConfirmed,2);assert.equal(q.mod.status().confirmedSweepCost,100);assert.equal(q.stage.auto,true);
// [VI dòng gốc 54] gọi q.mod.stop() để dừng bộ điều khiển và dọn tài nguyên | gọi assert.equal(q.events.has(5112), false) để kiểm tra hai giá trị bằng nhau
 q.mod.stop();assert.equal(q.events.has(5112),false);
// [VI dòng gốc 55] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 56] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng {. Đọc cùng dòng mở phía trên: {
{
// [VI dòng gốc 57] Khai báo biến không gán lại bằng const: q = gọi harness({free:0,sweeps:1}) | gọi assert.deepEqual(actions(q), [['sweep',2071]]) để kiểm tra cấu trúc hai giá trị tương đương
 const q=harness({free:0,sweeps:1});assert.deepEqual(actions(q),[['sweep',2071]]);
// [VI dòng gốc 58] gọi q.advance(16000) | gọi assert.equal(q.mod.status().inFlight, false) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.mod.status().sweepConfirmed, 0) để kiểm tra hai giá trị bằng nhau
 q.advance(16000);assert.equal(q.mod.status().inFlight,false);assert.equal(q.mod.status().sweepConfirmed,0);
// [VI dòng gốc 59] gọi q.advance(60000) | gọi assert.equal(actions(q).length, 1) để kiểm tra hai giá trị bằng nhau | gọi q.reload() | gọi q.advance(1000)
 q.advance(60000);assert.equal(actions(q).length,1);q.reload();q.advance(1000);assert.equal(actions(q).length,1); // Không gửi lại yêu cầu trả tiền chưa rõ kết quả.
// [VI dòng gốc 60] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 61] Duyệt từng giá trị trong [{locked:true},{busy:true},{free:0,sweeps:2,ingot:49}] bằng const options. | Khai báo biến không gán lại bằng const: options (chưa gán giá trị)
for(const options of [{locked:true},{busy:true},{free:0,sweeps:2,ingot:49}]){
// [VI dòng gốc 62] Khai báo biến không gán lại bằng const: q = gọi harness(options) | gọi assert.equal(actions(q).length, 0) để kiểm tra hai giá trị bằng nhau | gọi q.mod.stop() để dừng bộ điều khiển và dọn tài nguyên
 const q=harness(options);assert.equal(actions(q).length,0);q.mod.stop();
// [VI dòng gốc 63] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 64] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng {. Đọc cùng dòng mở phía trên: {
{
// [VI dòng gốc 65] Khai báo biến không gán lại bằng const: q = gọi harness({busy:true}) | gọi q.job('rảnh') | gọi q.far(true) | gọi q.advance()
 const q=harness({busy:true});q.job('rảnh');q.far(true);q.advance();assert.equal(actions(q).length,0);
// [VI dòng gốc 66] gọi q.far(false) | gán q.user.isDead bằng true | gọi q.advance() | gọi assert.equal(actions(q).length, 0) để kiểm tra hai giá trị bằng nhau
 q.far(false);q.user.isDead=true;q.advance();assert.equal(actions(q).length,0);
// [VI dòng gốc 67] gán q.user.isDead bằng false | gán q.user.actorId bằng '67890' | gọi q.advance() | gọi assert.equal(actions(q).length, 0) để kiểm tra hai giá trị bằng nhau
 q.user.isDead=false;q.user.actorId='67890';q.advance();assert.equal(actions(q).length,0);assert.equal(q.mod.status().enabled,false);
// [VI dòng gốc 68] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 69] gọi console.log('PASS daily trial: native challenge before paid sweeps, entry/return/result/count ACK, costs/balance, no duplicate paid …)
console.log('PASS daily trial: native challenge before paid sweeps, entry/return/result/count ACK, costs/balance, no duplicate paid retry, idle/unlock/death/actor gates, reload and stop');
// [VI dòng gốc 70] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 71] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng {. Đọc cùng dòng mở phía trên: {
{
// [VI dòng gốc 72] Khai báo biến không gán lại bằng const: q = gọi harness({busy:true,actualCore:true}); scene = đọc q.W.KVPV.core.scene
 const q=harness({busy:true,actualCore:true}),scene=q.W.KVPV.core.scene;
// [VI dòng gốc 73] gọi assert.equal(actions(q).length, 0) để kiểm tra hai giá trị bằng nhau | gọi q.job('rảnh')
 assert.equal(actions(q).length,0);q.job('rảnh');
// [VI dòng gốc 74] gọi assert.equal(q.mod.hasPriority(), true) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(scene.can('daily'), false) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(scene.can('stage'), false) để kiểm tra hai giá trị bằng nhau
 assert.equal(q.mod.hasPriority(),true);assert.equal(scene.can('daily'),false);assert.equal(scene.can('stage'),false);
// [VI dòng gốc 75] gọi assert.equal(scene.can('combat'), false) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(scene.reason('daily'), 'priority: daily trial') để kiểm tra hai giá trị bằng nhau
 assert.equal(scene.can('combat'),false);assert.equal(scene.reason('daily'),'priority: daily trial');
// [VI dòng gốc 76] gọi q.mod.stop() để dừng bộ điều khiển và dọn tài nguyên | gọi assert.equal(scene.can('daily'), true) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(scene.acquire('stage','tu-vuot'), true) để kiểm tra hai giá trị bằng nhau
 q.mod.stop();assert.equal(scene.can('daily'),true);assert.equal(scene.acquire('stage','tu-vuot'),true);
// [VI dòng gốc 77] gán q.W.KVPV.timeline bằng {reservation:()=>({key:'scheduled-event',time:'21:00'})}
 q.W.KVPV.timeline={reservation:()=>({key:'scheduled-event',time:'21:00'})};
// [VI dòng gốc 78] gọi q.mod.start() để khởi động bộ điều khiển | gọi assert.deepEqual(actions(q), [['enter',2071,2]]) để kiểm tra cấu trúc hai giá trị tương đương | gọi assert.equal(scene.status().tag, 'daily-trial') để kiểm tra hai giá trị bằng nhau
 q.mod.start();assert.deepEqual(actions(q),[['enter',2071,2]]);assert.equal(scene.status().tag,'daily-trial');
// [VI dòng gốc 79] gọi assert.equal(q.stage.auto, false) để kiểm tra hai giá trị bằng nhau | gọi q.mod.stop() để dừng bộ điều khiển và dọn tài nguyên | gọi assert.equal(q.stage.auto, true) để kiểm tra hai giá trị bằng nhau
 assert.equal(q.stage.auto,false);q.mod.stop();assert.equal(q.stage.auto,true);
// [VI dòng gốc 80] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 81] gọi console.log('PASS daily trial priority: central Daily/stage/new event gates, idle Tu Vuot lease handoff, scheduled reservation bypas…)
console.log('PASS daily trial priority: central Daily/stage/new event gates, idle Tu Vuot lease handoff, scheduled reservation bypass, manual stop restores queue');
// [VI dòng gốc 82] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 83] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng {. Đọc cùng dòng mở phía trên: {
{
// [VI dòng gốc 84] Khai báo biến không gán lại bằng const: q = gọi harness({inspire:true}) | gọi q.map(2071) để biến đổi từng phần tử | gọi q.advance() | Khai báo biến có thể gán lại bằng let: requests = tạo hàm với tham số (không có); mỗi lần gọi trả về gọi q.calls.filter(x=>x[0]==='inspire') để giữ phần tử thỏa điều kiện
 const q=harness({inspire:true});q.map(2071);q.advance();let requests=()=>q.calls.filter(x=>x[0]==='inspire');
// [VI dòng gốc 85] gọi assert.deepEqual(requests(), [['inspire',1]]) để kiểm tra cấu trúc hai giá trị tương đương | gọi q.advance(1000) | gọi assert.equal(requests().length, 1) để kiểm tra hai giá trị bằng nhau
 assert.deepEqual(requests(),[['inspire',1]]);q.advance(1000);assert.equal(requests().length,1);
// [VI dòng gốc 86] Khai báo biến không gán lại bằng const: m = đọc q.W._Ba._sst._ist.inst
 const m=q.W._Ba._sst._ist.inst;
// [VI dòng gốc 87] Lặp for: khởi tạo let count=1; tiếp tục khi count<=10; sau mỗi vòng count++. | Khai báo biến có thể gán lại bằng let: count = 1
 for(let count=1;count<=10;count++){
// [VI dòng gốc 88] gán m.insp bằng [[1,Math.min(count,5),Math.min(count,5)*.1],[2,Math.max(0,count-5),Math.max(0,count-5)*.1]]
  m.insp=[[1,Math.min(count,5),Math.min(count,5)*.1],[2,Math.max(0,count-5),Math.max(0,count-5)*.1]];
// [VI dòng gốc 89] gọi q.advance(1000)
  q.advance(1000);
// [VI dòng gốc 90] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
 }
// [VI dòng gốc 91] gọi assert.equal(requests().length, 10) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(requests().filter(x=>x[1]===1).length, 5) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(requests().filter(x=>x[1]===2).length, 5) để kiểm tra hai giá trị bằng nhau
 assert.equal(requests().length,10);assert.equal(requests().filter(x=>x[1]===1).length,5);assert.equal(requests().filter(x=>x[1]===2).length,5);
// [VI dòng gốc 92] gọi assert.equal(q.mod.status().inspire.percent, 100) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.mod.status().pending.cheer.reason, 'inspire_full') để kiểm tra hai giá trị bằng nhau
 assert.equal(q.mod.status().inspire.percent,100);assert.equal(q.mod.status().pending.cheer.reason,'inspire_full');
// [VI dòng gốc 93] gọi assert.equal(q.mod.status().pending.cheer.confirmed, 10) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.mod.status().pending.cheer.confirmedKNBCost, 100) để kiểm tra hai giá trị bằng nhau | gọi q.reload() | gọi q.advance(1000)
 assert.equal(q.mod.status().pending.cheer.confirmed,10);assert.equal(q.mod.status().pending.cheer.confirmedKNBCost,100);q.reload();q.advance(1000);assert.equal(requests().length,10);
// [VI dòng gốc 94] Khai báo biến không gán lại bằng const: snapshot = gọi q.mod.status() để trả trạng thái để kiểm tra | gán snapshot.pending.cheer.blocked bằng true | gọi assert.equal(q.mod.status().pending.cheer.blocked, false) để kiểm tra hai giá trị bằng nhau
 const snapshot=q.mod.status();snapshot.pending.cheer.blocked=true;assert.equal(q.mod.status().pending.cheer.blocked,false);
// [VI dòng gốc 95] gọi q.mod.stop() để dừng bộ điều khiển và dọn tài nguyên | gọi assert.equal(q.events.has(5108), false) để kiểm tra hai giá trị bằng nhau
 q.mod.stop();assert.equal(q.events.has(5108),false);
// [VI dòng gốc 96] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 97] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng {. Đọc cùng dòng mở phía trên: {
{
// [VI dòng gốc 98] Khai báo biến không gán lại bằng const: q = gọi harness({inspire:true}); m = đọc q.W._Ba._sst._ist.inst | gán m.insp bằng [[1,5,.5],[2,5,.5]]
 const q=harness({inspire:true}),m=q.W._Ba._sst._ist.inst;m.insp=[[1,5,.5],[2,5,.5]];
// [VI dòng gốc 99] gọi q.map(2071) để biến đổi từng phần tử | gọi q.advance() | gọi assert.equal(q.calls.filter(x=>x[0]==='inspire').length, 0) để kiểm tra hai giá trị bằng nhau
 q.map(2071);q.advance();assert.equal(q.calls.filter(x=>x[0]==='inspire').length,0);
// [VI dòng gốc 100] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 101] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng {. Đọc cùng dòng mở phía trên: {
{
// [VI dòng gốc 102] Khai báo biến không gán lại bằng const: q = gọi harness({inspire:true}) | gọi q.map(2071) để biến đổi từng phần tử | gọi q.advance() | gọi q.advance(9000)
 const q=harness({inspire:true});q.map(2071);q.advance();q.advance(9000);q.advance(9000);
// [VI dòng gốc 103] gọi assert.equal(q.calls.filter(x=>x[0]==='inspire').length, 1) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.mod.status().pending.cheer.reason, 'inspire_ack_timeout') để kiểm tra hai giá trị bằng nhau
 assert.equal(q.calls.filter(x=>x[0]==='inspire').length,1);assert.equal(q.mod.status().pending.cheer.reason,'inspire_ack_timeout');
// [VI dòng gốc 104] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 105] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng {. Đọc cùng dòng mở phía trên: {
{
// [VI dòng gốc 106] Khai báo biến không gán lại bằng const: q = gọi harness({inspire:true}) | gọi q.map(2071) để biến đổi từng phần tử | gọi q.advance() | gán q.W._Ba._sst._ist.inst.inspState bằng [133063]
 const q=harness({inspire:true});q.map(2071);q.advance();q.W._Ba._sst._ist.inst.inspState=[133063];q.events.get(5108)();q.advance();
// [VI dòng gốc 107] gọi assert.deepEqual(q.calls.filter(x=>x[0]==='inspire'), [['inspire',1],['inspire',2]]) để kiểm tra cấu trúc hai giá trị tương đương
 assert.deepEqual(q.calls.filter(x=>x[0]==='inspire'),[['inspire',1],['inspire',2]]);
// [VI dòng gốc 108] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 109] gọi console.log('PASS trial full inspire: native coin/KNB caps and cost, ACK per request, max100% no extra send, error fallback, unknown…)
console.log('PASS trial full inspire: native coin/KNB caps and cost, ACK per request, max100% no extra send, error fallback, unknown ACK blocks retry, reload and detached snapshots');
// [VI dòng gốc 110] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 111] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng {. Đọc cùng dòng mở phía trên: {
{
// [VI dòng gốc 112] Khai báo biến không gán lại bằng const: q = gọi harness({free:0,sweeps:3,allowKNB:false}) | gọi q.advance(60000) | gọi assert.equal(actions(q).length, 0) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.mod.status().paidSweep, false) để kiểm tra hai giá trị bằng nhau
 const q=harness({free:0,sweeps:3,allowKNB:false});q.advance(60000);assert.equal(actions(q).length,0);assert.equal(q.mod.status().paidSweep,false);
// [VI dòng gốc 113] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 114] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng {. Đọc cùng dòng mở phía trên: {
{
// [VI dòng gốc 115] Khai báo biến không gán lại bằng const: q = gọi harness({inspire:true,allowKNB:false}) | gọi q.map(2071) để biến đổi từng phần tử | gọi q.advance() | Khai báo biến không gán lại bằng const: m = đọc q.W._Ba._sst._ist.inst
 const q=harness({inspire:true,allowKNB:false});q.map(2071);q.advance();const m=q.W._Ba._sst._ist.inst;
// [VI dòng gốc 116] Lặp for: khởi tạo let count=1; tiếp tục khi count<=5; sau mỗi vòng count++. | Khai báo biến có thể gán lại bằng let: count = 1 | gán m.insp bằng [[1,count,count*.1],[2,0,0]] | gọi q.advance()
 for(let count=1;count<=5;count++){m.insp=[[1,count,count*.1],[2,0,0]];q.advance();}
// [VI dòng gốc 117] gọi q.advance(10000) | gọi assert(q.calls.filter(x=>x[0]==='inspire').every(x=>x[1]===1)) để kiểm tra điều kiện của bài test | gọi assert.equal(q.calls.filter(x=>x[0]==='inspire').length, 5) để kiểm tra hai giá trị bằng nhau
 q.advance(10000);assert(q.calls.filter(x=>x[0]==='inspire').every(x=>x[1]===1));assert.equal(q.calls.filter(x=>x[0]==='inspire').length,5);
// [VI dòng gốc 118] gán q.user.copper bằng 0 | gọi q.advance() | gọi assert(q.calls.filter(x=>x[0]==='inspire').every(x=>x[1]===1)) để kiểm tra điều kiện của bài test
 q.user.copper=0;q.advance();assert(q.calls.filter(x=>x[0]==='inspire').every(x=>x[1]===1));
// [VI dòng gốc 119] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 120] gọi console.log('PASS no KNB policy: paid sweep disabled and full coin inspire stops at coin cap without requesting ingot')
console.log('PASS no KNB policy: paid sweep disabled and full coin inspire stops at coin cap without requesting ingot');
// [VI dòng gốc 121] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 122] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng {. Đọc cùng dòng mở phía trên: {
{
// [VI dòng gốc 123] Khai báo biến không gán lại bằng const: W = tạo đối tượng gồm KVPV_SPENDING_POLICY
 const W={KVPV_SPENDING_POLICY:{allowKNB:true}};
// [VI dòng gốc 124] gọi vm.runInNewContext(fs.readFileSync(__dirname+'/src/00-spending-policy.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,''), {window…) để chạy mã trong ngữ cảnh máy ảo dùng cho kiểm thử
 vm.runInNewContext(fs.readFileSync(__dirname+'/src/00-spending-policy.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,''),{window:W});
// [VI dòng gốc 125] gọi assert.equal(W.KVPV_SPENDING_POLICY.allowKNB, false) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(Object.isFrozen(W.KVPV_SPENDING_POLICY), true) để kiểm tra hai giá trị bằng nhau
 assert.equal(W.KVPV_SPENDING_POLICY.allowKNB,false);assert.equal(Object.isFrozen(W.KVPV_SPENDING_POLICY),true);
// [VI dòng gốc 126] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 127] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 128] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng {. Đọc cùng dòng mở phía trên: {
{
// [VI dòng gốc 129] Khai báo biến không gán lại bằng const: q = gọi harness({busy:true,allowKNB:false}) | Khai báo biến có thể gán lại bằng let: requested = 2061
 const q=harness({busy:true,allowKNB:false});let requested=2061;
// [VI dòng gốc 130] gán q.W.KVPV_PROGRESS_PLANNER bằng {materialDungeon:()=>requested}
 q.W.KVPV_PROGRESS_PLANNER={materialDungeon:()=>requested};
// [VI dòng gốc 131] gán q.W.KVPV_QUEST_PRIORITY bằng {blocks:()=>!requested}
 q.W.KVPV_QUEST_PRIORITY={blocks:()=>!requested};
// [VI dòng gốc 132] gán q.rows[2051][6] bằng 1 | gán q.rows[2061][6] bằng 1 | gọi q.job('rảnh') | gọi q.advance()
 q.rows[2051][6]=1;q.rows[2061][6]=1;q.job('rảnh');q.advance();
// [VI dòng gốc 133] gọi assert.deepEqual(actions(q), [['enter',2061]], 'material dependency selects its exact dungeon before unrelated free trials') để kiểm tra cấu trúc hai giá trị tương đương
 assert.deepEqual(actions(q),[['enter',2061]],'material dependency selects its exact dungeon before unrelated free trials');
// [VI dòng gốc 134] gán requested bằng null | gọi q.map(2061) để biến đổi từng phần tử | gọi q.advance() | gọi assert.equal(q.mod.status().inFlight, true, 'priority change preserves an already sent challenge') để kiểm tra hai giá trị bằng nhau
 requested=null;q.map(2061);q.advance();assert.equal(q.mod.status().inFlight,true,'priority change preserves an already sent challenge');
// [VI dòng gốc 135] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 136] gọi console.log('PASS planner -> actual Daily Trial: exact material dungeon selection, no unrelated challenge, in-flight request preserv…)
console.log('PASS planner -> actual Daily Trial: exact material dungeon selection, no unrelated challenge, in-flight request preserved');
// [VI dòng gốc 137] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 138] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng {. Đọc cùng dòng mở phía trên: {
{
// [VI dòng gốc 139] Khai báo biến không gán lại bằng const: q = gọi harness({busy:true,allowKNB:false})
 const q=harness({busy:true,allowKNB:false});
// [VI dòng gốc 140] gán q.W.KVPV_PROGRESS_PLANNER bằng {materialDungeon:()=>null}
 q.W.KVPV_PROGRESS_PLANNER={materialDungeon:()=>null};
// [VI dòng gốc 141] gán q.W.KVPV_EQUIPMENT_TREASURE bằng {materialDungeon:()=>2061}
 q.W.KVPV_EQUIPMENT_TREASURE={materialDungeon:()=>2061};
// [VI dòng gốc 142] gán q.W.KVPV_QUEST_PRIORITY bằng {blocks:()=>false} | gán q.rows[2061][6] bằng 1 | gọi q.job('rảnh') | gọi q.advance()
 q.W.KVPV_QUEST_PRIORITY={blocks:()=>false};q.rows[2061][6]=1;q.job('rảnh');q.advance();
// [VI dòng gốc 143] gọi assert.deepEqual(actions(q), [['enter',2061]], 'equipment key source fallback selects the exact native free dungeon') để kiểm tra cấu trúc hai giá trị tương đương
 assert.deepEqual(actions(q),[['enter',2061]],'equipment key source fallback selects the exact native free dungeon');
// [VI dòng gốc 144] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 145] gọi console.log('PASS equipment treasure -> Daily Trial: verified key-source fallback is consumed by the existing scheduler')
console.log('PASS equipment treasure -> Daily Trial: verified key-source fallback is consumed by the existing scheduler');
// [VI dòng gốc 146] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 147] Duyệt từng giá trị trong [2051,2061] bằng const id. | Khai báo biến không gán lại bằng const: id (chưa gán giá trị)
for(const id of [2051,2061]){
// [VI dòng gốc 148] Khai báo biến không gán lại bằng const: q = gọi harness({inspire:true,allowKNB:false,busy:true})
 const q=harness({inspire:true,allowKNB:false,busy:true});
// [VI dòng gốc 149] gọi vm.runInNewContext(fs.readFileSync(__dirname+'/src/00-spending-policy.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,''), {window…) để chạy mã trong ngữ cảnh máy ảo dùng cho kiểm thử
 vm.runInNewContext(fs.readFileSync(__dirname+'/src/00-spending-policy.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,''),{window:q.W});
// [VI dòng gốc 150] gán q.rows[2071][6] bằng 0 | gán q.rows[id][6] bằng 1 | gọi q.job('rảnh') | gọi q.advance()
 q.rows[2071][6]=0;q.rows[id][6]=1;q.job('rảnh');q.advance();q.map(id);q.advance();
// [VI dòng gốc 151] Khai báo biến không gán lại bằng const: m = đọc q.W._Ba._sst._ist.inst
 const m=q.W._Ba._sst._ist.inst;
// [VI dòng gốc 152] Lặp for: khởi tạo let count=1; tiếp tục khi count<=10; sau mỗi vòng count++. | Khai báo biến có thể gán lại bằng let: count = 1 | gán m.insp bằng [[1,Math.min(count,5),Math.min(count,5)*.1],[2,Math.max(0,count-5),Math.max(0,count-5)*.1]] | gọi q.advance()
 for(let count=1;count<=10;count++){m.insp=[[1,Math.min(count,5),Math.min(count,5)*.1],[2,Math.max(0,count-5),Math.max(0,count-5)*.1]];q.advance();}
// [VI dòng gốc 153] Khai báo biến không gán lại bằng const: requests = gọi q.calls.filter(x=>x[0]==='inspire') để giữ phần tử thỏa điều kiện | gọi assert.equal(requests.filter(x=>x[1]===2).length, 5, 'scoped KNB inspire in '+id) để kiểm tra hai giá trị bằng nhau
 const requests=q.calls.filter(x=>x[0]==='inspire');assert.equal(requests.filter(x=>x[1]===2).length,5,'scoped KNB inspire in '+id);
// [VI dòng gốc 154] gọi assert.equal(q.mod.status().paidSweep, false) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.mod.status().pending.cheer.confirmed, 10) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.mod.status().pending.cheer.confirmedKNBCost, 100) để kiểm tra hai giá trị bằng nhau | gọi q.reload()
 assert.equal(q.mod.status().paidSweep,false);assert.equal(q.mod.status().pending.cheer.confirmed,10);assert.equal(q.mod.status().pending.cheer.confirmedKNBCost,100);q.reload();q.advance();assert.equal(q.calls.filter(x=>x[0]==='inspire').length,10,'full buff never repeats on reload');
// [VI dòng gốc 155] gọi assert.equal(q.W.KVPV_SPENDING_POLICY.allowKNB, false) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.W.KVPV_SPENDING_POLICY.canDailyInspireKNB(2071), false) để kiểm tra hai giá trị bằng nhau | gọi q.mod.stop() để dừng bộ điều khiển và dọn tài nguyên
 assert.equal(q.W.KVPV_SPENDING_POLICY.allowKNB,false);assert.equal(q.W.KVPV_SPENDING_POLICY.canDailyInspireKNB(2071),false);q.mod.stop();
// [VI dòng gốc 156] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 157] gọi console.log('PASS scoped KNB inspire: 2051/2061 only, coins first, native limits, ACK/reload, other spending and sweeps remain block…)
console.log('PASS scoped KNB inspire: 2051/2061 only, coins first, native limits, ACK/reload, other spending and sweeps remain blocked');
// [VI dòng gốc 158] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 159] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng {. Đọc cùng dòng mở phía trên: {
{
// [VI dòng gốc 160] Khai báo biến không gán lại bằng const: q = gọi harness({inspire:true}) | gọi q.map(2071) để biến đổi từng phần tử | gọi q.advance() | Khai báo biến không gán lại bằng const: m = đọc q.W._Ba._sst._ist.inst
 const q=harness({inspire:true});q.map(2071);q.advance();const m=q.W._Ba._sst._ist.inst;
// [VI dòng gốc 161] gán m.insp bằng [[1,0,0],[2,1,.1]] | gọi q.advance() | gọi assert.equal(q.calls.filter(x=>x[0]==='inspire').length, 1, 'other inspire type cannot ACK pending coin request') để kiểm tra hai giá trị bằng nhau
 m.insp=[[1,0,0],[2,1,.1]];q.advance();assert.equal(q.calls.filter(x=>x[0]==='inspire').length,1,'other inspire type cannot ACK pending coin request');
// [VI dòng gốc 162] gọi q.advance(9000) | gán m.insp bằng [[1,1,.1],[2,1,.1]] | gọi q.advance() | gọi assert.equal(q.mod.status().pending.cheer.blocked, false, 'late matching ACK safely unblocks continuation') để kiểm tra hai giá trị bằng nhau
 q.advance(9000);m.insp=[[1,1,.1],[2,1,.1]];q.advance();assert.equal(q.mod.status().pending.cheer.blocked,false,'late matching ACK safely unblocks continuation');q.mod.stop();
// [VI dòng gốc 163] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 164] gọi console.log('PASS inspire ACK: exact currency-type count required; late server confirmation releases the pending latch')
console.log('PASS inspire ACK: exact currency-type count required; late server confirmation releases the pending latch');
// [VI dòng gốc 165] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 166] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng {. Đọc cùng dòng mở phía trên: {
{
// [VI dòng gốc 167] Khai báo biến không gán lại bằng const: q = gọi harness({inspire:true,busy:true}) | Định nghĩa lớp NativePanel. | Khai báo biến không gán lại bằng const: panel = tạo đối tượng bằng NativePanel() | gán panel.parent bằng {}
 const q=harness({inspire:true,busy:true});class NativePanel{_jqn(){}}const panel=new NativePanel();panel.parent={};panel.visible=true;
// [VI dòng gốc 168] gán q.W._Ba._sst._Rqn bằng NativePanel | gán q.W._ft._Y4n bằng {ins:{openTable:{77:{}},getPanelById:()=>panel}} | gán q.W._Ba._sst._ist.inst.getAutoInspState bằng ()=>true
 q.W._Ba._sst._Rqn=NativePanel;q.W._ft._Y4n={ins:{openTable:{77:{}},getPanelById:()=>panel}};q.W._Ba._sst._ist.inst.getAutoInspState=()=>true;
// [VI dòng gốc 169] gọi q.job('rảnh') | gọi q.advance() | gọi q.map(2071) để biến đổi từng phần tử
 q.job('rảnh');q.advance();q.map(2071);q.advance();assert.equal(q.calls.filter(x=>x[0]==='inspire').length,0,'native automatic panel remains the only sender');assert.equal(q.mod.status().pending.cheer.reason,'native_auto_inspire_owner');
// [VI dòng gốc 170] gán panel.visible bằng false | gán q.W.KVPV_BOSS_TEAM bằng {priority:()=>true} | gọi q.advance() | gọi assert.equal(q.calls.filter(x=>x[0]==='inspire').length, 0, 'no spending after priority boss invitation') để kiểm tra hai giá trị bằng nhau
 panel.visible=false;q.W.KVPV_BOSS_TEAM={priority:()=>true};q.advance();assert.equal(q.calls.filter(x=>x[0]==='inspire').length,0,'no spending after priority boss invitation');q.mod.stop();
// [VI dòng gốc 171] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 172] gọi console.log('PASS inspiration ownership: visible native auto sender is respected; boss invitation priority stops new spending')
console.log('PASS inspiration ownership: visible native auto sender is respected; boss invitation priority stops new spending');
// [VI dòng gốc 173] Dòng trống để tách các phần, không có lệnh thực thi.
