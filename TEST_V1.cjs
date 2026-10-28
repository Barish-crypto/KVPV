// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: Kiểm thử mô phỏng: V1. Các assert bên dưới ghi điều kiện phải giữ; không chứng minh máy chủ game chấp nhận tốc độ hoặc tầm đánh. [đóng chú thích]
/* Kiểm thử mô phỏng: V1. Các assert bên dưới ghi điều kiện phải giữ; không chứng minh máy chủ game chấp nhận tốc độ hoặc tầm đánh. */
// [VI dòng gốc 2] "use strict"
'use strict';
// [VI dòng gốc 3] Khai báo biến không gán lại bằng const: fs = gọi require('node:fs') để nạp module Node.js; vm = gọi require('node:vm') để nạp module Node.js; assert = gọi require('node:assert/strict') để nạp module Node.js
const fs=require('node:fs'), vm=require('node:vm'), assert=require('node:assert/strict');
// [VI dòng gốc 4] Khai báo biến không gán lại bằng const: code = gọi fs.readFileSync(__dirname+'/KVPV_V1_FULL.js', 'utf8') để đọc tệp đồng bộ
const code=fs.readFileSync(__dirname+'/KVPV_V1_FULL.js','utf8');
// [VI dòng gốc 5] Khai báo biến không gán lại bằng const: prelude = gọi fs.readFileSync(__dirname+'/runtime-v1.js', 'utf8') để đọc tệp đồng bộ
const prelude=fs.readFileSync(__dirname+'/runtime-v1.js','utf8');
// [VI dòng gốc 6] Khai báo biến có thể gán lại bằng let: passed = 0
let passed=0;
// [VI dòng gốc 7] Định nghĩa hàm test; tham số: name, fn | gọi fn() | tăng passed một đơn vị sau khi lấy giá trị | gọi console.log('PASS', name)
function test(name, fn){fn();passed++;console.log('PASS',name);}
// [VI dòng gốc 8] Định nghĩa hàm runPrelude; tham số: W, globals={}
function runPrelude(W, globals={}) {
// [VI dòng gốc 9] Khai báo biến không gán lại bằng const: context = tạo đối tượng gồm window, console, các thuộc tính của globals
  const context={window:W,console:{error(){}},...globals};
// [VI dòng gốc 10] gọi vm.runInNewContext('(() => {\n'+prelude+'\nif (__KVPV_V1_READY) window.entered=true;})();', context, {timeout:1000}) để chạy mã trong ngữ cảnh máy ảo dùng cho kiểm thử
  vm.runInNewContext('(() => {\n'+prelude+'\nif (__KVPV_V1_READY) window.entered=true;})();',context,{timeout:1000});
// [VI dòng gốc 11] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 12] gọi test('whole bundle rejects missing game context before installing any module', ()=>{ const W={};vm.runInNewContext(code,{wind…)
test('whole bundle rejects missing game context before installing any module',()=>{
// [VI dòng gốc 13] Khai báo biến không gán lại bằng const: W = tạo đối tượng gồm | gọi vm.runInNewContext(code, {window:W,console:{error(){}}}, {timeout:1000}) để chạy mã trong ngữ cảnh máy ảo dùng cho kiểm thử
  const W={};vm.runInNewContext(code,{window:W,console:{error(){}}},{timeout:1000});
// [VI dòng gốc 14] gọi assert.deepEqual(Object.keys(W), []) để kiểm tra cấu trúc hai giá trị tương đương
  assert.deepEqual(Object.keys(W),[]);
// [VI dòng gốc 15] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 16] Khai báo biến không gán lại bằng const: globals = tạo đối tượng gồm _Ba, _ft, _Sa
const globals={_Ba:{_rJ:{_O$:{ins:{actorId:'123456'}}}},_ft:{},_Sa:{}};
// [VI dòng gốc 17] gọi test('valid context enters and exposes V1', ()=>{const W={};runPrelude(W,globals);assert.equal(W.entered,true);assert.equal(W…) | Khai báo biến không gán lại bằng const: W = tạo đối tượng gồm | gọi runPrelude(W, globals) | gọi assert.equal(W.entered, true) để kiểm tra hai giá trị bằng nhau
test('valid context enters and exposes V1',()=>{const W={};runPrelude(W,globals);assert.equal(W.entered,true);assert.equal(W.KVPV_V1.version,'1.0.0');});
// [VI dòng gốc 18] gọi test('repeat load does not execute modules', ()=>{const W={KVPV_V1:{}};runPrelude(W,globals);assert.equal(W.entered,undefined…) | Khai báo biến không gán lại bằng const: W = tạo đối tượng gồm KVPV_V1 | gọi runPrelude(W, globals) | gọi assert.equal(W.entered, undefined) để kiểm tra hai giá trị bằng nhau
test('repeat load does not execute modules',()=>{const W={KVPV_V1:{}};runPrelude(W,globals);assert.equal(W.entered,undefined);});
// [VI dòng gốc 19] gọi test('old FULL and changed actor block entire bundle', ()=>{ for(const W of [{KVPV_MAIN_SOLO:{installed:true}},{__KVPV_OWN_AC…)
test('old FULL and changed actor block entire bundle',()=>{
// [VI dòng gốc 20] Duyệt từng giá trị trong [{KVPV_MAIN_SOLO:{installed:true}},{__KVPV_OWN_ACTOR_ID:'987654'},{__KVPV_UNIVERSAL_HALTED:true}] bằng const W. | Khai báo biến không gán lại bằng const: W (chưa gán giá trị) | gọi runPrelude(W, globals) | gọi assert.equal(W.entered, undefined) để kiểm tra hai giá trị bằng nhau
  for(const W of [{KVPV_MAIN_SOLO:{installed:true}},{__KVPV_OWN_ACTOR_ID:'987654'},{__KVPV_UNIVERSAL_HALTED:true}]){runPrelude(W,globals);assert.equal(W.entered,undefined);}
// [VI dòng gốc 21] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 22] gọi test('diagnostics are bounded and snapshots do not mutate history', ()=>{ const W={};runPrelude(W,globals);const d=W.KVPV_V1.…)
test('diagnostics are bounded and snapshots do not mutate history',()=>{
// [VI dòng gốc 23] Khai báo biến không gán lại bằng const: W = tạo đối tượng gồm | gọi runPrelude(W, globals) | Khai báo biến không gán lại bằng const: d = đọc W.KVPV_V1.diagnostics
  const W={};runPrelude(W,globals);const d=W.KVPV_V1.diagnostics;
// [VI dòng gốc 24] Lặp for: khởi tạo let i=0; tiếp tục khi i<150; sau mỗi vòng i++. | Khai báo biến có thể gán lại bằng let: i = 0 | gọi d.record(Error('error '+i))
  for(let i=0;i<150;i++)d.record(Error('error '+i));
// [VI dòng gốc 25] gọi assert.equal(d.status().total, 150) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(d.status().recent.length, 100) để kiểm tra hai giá trị bằng nhau
  assert.equal(d.status().total,150);assert.equal(d.status().recent.length,100);
// [VI dòng gốc 26] gán d.status().recent[0].message bằng 'changed' | gọi assert.equal(d.status().recent[0].message, 'error 50') để kiểm tra hai giá trị bằng nhau
  d.status().recent[0].message='changed';assert.equal(d.status().recent[0].message,'error 50');
// [VI dòng gốc 27] gọi d.clear() | gọi assert.equal(d.status().total, 0) để kiểm tra hai giá trị bằng nhau
  d.clear();assert.equal(d.status().total,0);
// [VI dòng gốc 28] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 29] gọi test('Boss auto module creates no timer and makes no scan on install', ()=>{ // Bỏ riêng chú thích tự sinh khi tìm đoạn mã bằ…)
test('Boss auto module creates no timer and makes no scan on install',()=>{
// [VI dòng gốc 30] Chú thích gốc của tác giả; không được thực thi. Nội dung: Bỏ riêng chú thích tự sinh khi tìm đoạn mã bằng chữ; nội dung chương trình vẫn được kiểm tra đầy đủ.
  // Bỏ riêng chú thích tự sinh khi tìm đoạn mã bằng chữ; nội dung chương trình vẫn được kiểm tra đầy đủ.
// [VI dòng gốc 31] Khai báo biến không gán lại bằng const: engine = gọi fs.readFileSync(__dirname+'/src/04-engine.js','utf8').replace(/\r\n?/g,'\n').replace(/^\/\/ \[VI dòng gốc \d+\].*\n/gm, '')
  const engine=fs.readFileSync(__dirname+'/src/04-engine.js','utf8').replace(/\r\n?/g,'\n').replace(/^\/\/ \[VI dòng gốc \d+\].*\n/gm,'');
// [VI dòng gốc 32] Khai báo biến không gán lại bằng const: start = gọi engine.indexOf("(() => {\n 'use strict';\n const W=window,TAG='[HITRUN AUTO V12.0]'")
  const start=engine.indexOf("(() => {\n  'use strict';\n  const W=window,TAG='[HITRUN AUTO V12.0]'");
// [VI dòng gốc 33] Khai báo biến không gán lại bằng const: end = gọi engine.indexOf('[mở chú thích] V10.1 unified public interfaces', start)
  const end=engine.indexOf('/* V10.1 unified public interfaces',start);
// [VI dòng gốc 34] gọi assert(start>0&&end>start) để kiểm tra điều kiện của bài test | Khai báo biến có thể gán lại bằng let: timers = 0; scans = 0
  assert(start>0&&end>start);let timers=0,scans=0;
// [VI dòng gốc 35] Khai báo biến không gán lại bằng const: W = tạo đối tượng gồm setInterval, KVPV_HITRUN1 | tăng timers một đơn vị sau khi lấy giá trị | tăng scans một đơn vị sau khi lấy giá trị | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm running.
  const W={setInterval(){timers++;},KVPV_HITRUN1:{status(){scans++;return {running:false};}}};
// [VI dòng gốc 36] gọi vm.runInNewContext(engine.slice(start,end), {window:W,_Ba:globals._Ba,console:{info(){},warn(){}}}, {timeout:1000}) để chạy mã trong ngữ cảnh máy ảo dùng cho kiểm thử
  vm.runInNewContext(engine.slice(start,end),{window:W,_Ba:globals._Ba,console:{info(){},warn(){}}},{timeout:1000});
// [VI dòng gốc 37] gọi assert.equal(timers, 0) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(scans, 0) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(W.KVPV_HITRUN_AUTO.status().enabled, false) để kiểm tra hai giá trị bằng nhau
  assert.equal(timers,0);assert.equal(scans,0);assert.equal(W.KVPV_HITRUN_AUTO.status().enabled,false);
// [VI dòng gốc 38] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 39] gọi test('timer registry preserves native handles, arguments and callback receiver', ()=>{ const pending=new Map();let next=0; co…)
test('timer registry preserves native handles, arguments and callback receiver',()=>{
// [VI dòng gốc 40] Khai báo biến không gán lại bằng const: pending = tạo đối tượng bằng Map() | Khai báo biến có thể gán lại bằng let: next = 0
  const pending=new Map();let next=0;
// [VI dòng gốc 41] Khai báo biến không gán lại bằng const: W = tạo đối tượng gồm setInterval, clearInterval, setTimeout, clearTimeout | Khai báo biến không gán lại bằng const: id = tăng next một đơn vị trước khi lấy giá trị | gọi pending.set(id, {fn,args}) | Kết thúc hàm hiện tại và trả về: id.
  const W={setInterval(fn,delay,...args){const id=++next;pending.set(id,{fn,args});return id;},
// [VI dòng gốc 42] gọi pending.delete(id)
    clearInterval(id){pending.delete(id);},
// [VI dòng gốc 43] Khai báo biến không gán lại bằng const: id = tăng next một đơn vị trước khi lấy giá trị | gọi pending.set(id, {fn,args}) | Kết thúc hàm hiện tại và trả về: id.
    setTimeout(fn,delay,...args){const id=++next;pending.set(id,{fn,args});return id;},
// [VI dòng gốc 44] gọi pending.delete(id)
    clearTimeout(id){pending.delete(id);}};
// [VI dòng gốc 45] Khai báo biến không gán lại bằng const: original = đọc W.setInterval | gọi runPrelude(W, globals) | Khai báo biến không gán lại bằng const: t = đọc W.KVPV_V1.timers
  const original=W.setInterval;runPrelude(W,globals);const t=W.KVPV_V1.timers;
// [VI dòng gốc 46] Khai báo biến có thể gán lại bằng let: received (chưa gán giá trị)
  let received;
// [VI dòng gốc 47] Khai báo biến không gán lại bằng const: id = gọi t.setTimeout(function(value){received=[this,value];}, 50, 'payload') để hẹn thực hiện một lần | gán received bằng [this,value]
  const id=t.setTimeout(function(value){received=[this,value];},50,'payload');
// [VI dòng gốc 48] gọi assert.equal(t.status().timeouts, 1) để kiểm tra hai giá trị bằng nhau
  assert.equal(t.status().timeouts,1);
// [VI dòng gốc 49] gọi pending.get(id).fn.apply(W, pending.get(id).args)
  pending.get(id).fn.apply(W,pending.get(id).args);
// [VI dòng gốc 50] gọi assert.equal(received[0], W) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(received[1], 'payload') để kiểm tra hai giá trị bằng nhau | gọi assert.equal(t.status().timeouts, 0) để kiểm tra hai giá trị bằng nhau
  assert.equal(received[0],W);assert.equal(received[1],'payload');assert.equal(t.status().timeouts,0);
// [VI dòng gốc 51] Khai báo biến không gán lại bằng const: interval = gọi t.setInterval(()=>{}, 100) để đăng ký tác vụ lặp theo khoảng thời gian
  const interval=t.setInterval(()=>{},100);
// [VI dòng gốc 52] gọi assert.equal(t.status().intervals, 1) để kiểm tra hai giá trị bằng nhau | gọi t.clearInterval(interval) để hủy tác vụ lặp | gọi assert.equal(t.status().intervals, 0) để kiểm tra hai giá trị bằng nhau
  assert.equal(t.status().intervals,1);t.clearInterval(interval);assert.equal(t.status().intervals,0);
// [VI dòng gốc 53] Khai báo biến không gán lại bằng const: timeout = gọi t.setTimeout(()=>{}, 100) để hẹn thực hiện một lần | gọi t.clearInterval(timeout) để hủy tác vụ lặp | gọi assert.equal(t.status().timeouts, 0) để kiểm tra hai giá trị bằng nhau
  const timeout=t.setTimeout(()=>{},100);t.clearInterval(timeout);assert.equal(t.status().timeouts,0);
// [VI dòng gốc 54] gọi assert.equal(W.setInterval, original) để kiểm tra hai giá trị bằng nhau
  assert.equal(W.setInterval,original);
// [VI dòng gốc 55] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 56] gọi test('manifest hash matches the generated bundle', ()=>{ const manifest=JSON.parse(fs.readFileSync(__dirname+'/MANIFEST.json'…)
test('manifest hash matches the generated bundle',()=>{
// [VI dòng gốc 57] Khai báo biến không gán lại bằng const: manifest = gọi JSON.parse(fs.readFileSync(__dirname+'/MANIFEST.json','utf8')) để phân tích dữ liệu đầu vào theo API đang gọi
  const manifest=JSON.parse(fs.readFileSync(__dirname+'/MANIFEST.json','utf8'));
// [VI dòng gốc 58] gọi assert.equal(manifest.sha256, require('node:crypto').createHash('sha256').update(code).digest('hex')) để kiểm tra hai giá trị bằng nhau
  assert.equal(manifest.sha256,require('node:crypto').createHash('sha256').update(code).digest('hex'));
// [VI dòng gốc 59] gọi assert.equal(manifest.version, '1.0.0') để kiểm tra hai giá trị bằng nhau
  assert.equal(manifest.version,'1.0.0');
// [VI dòng gốc 60] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 61] gọi test('bundle excludes PK module and public PK controllers', ()=>{ const manifest=JSON.parse(fs.readFileSync(__dirname+'/MANIF…)
test('bundle excludes PK module and public PK controllers',()=>{
// [VI dòng gốc 62] Khai báo biến không gán lại bằng const: manifest = gọi JSON.parse(fs.readFileSync(__dirname+'/MANIFEST.json','utf8')) để phân tích dữ liệu đầu vào theo API đang gọi
  const manifest=JSON.parse(fs.readFileSync(__dirname+'/MANIFEST.json','utf8'));
// [VI dòng gốc 63] gọi assert.equal(manifest.modules.includes('05-pvp.js'), false) để kiểm tra hai giá trị bằng nhau
  assert.equal(manifest.modules.includes('05-pvp.js'),false);
// [VI dòng gốc 64] Duyệt từng giá trị trong ['KVPV_V128_PVP','KVPV_V129_TRUTIEN','startTruTien','smartPK','_smartPk'] bằng const token. | Khai báo biến không gán lại bằng const: token (chưa gán giá trị) | gọi assert.equal(code.includes(token), false, token) để kiểm tra hai giá trị bằng nhau
  for(const token of ['KVPV_V128_PVP','KVPV_V129_TRUTIEN','startTruTien','smartPK','_smartPk'])assert.equal(code.includes(token),false,token);
// [VI dòng gốc 65] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 66] gọi test('unused STAND controller is archived and absent from executable bundle', ()=>{ assert.equal(code.includes("const W=windo…)
test('unused STAND controller is archived and absent from executable bundle',()=>{
// [VI dòng gốc 67] gọi assert.equal(code.includes("const W=window, NAME='KVPV_STAND281'"), false) để kiểm tra hai giá trị bằng nhau
  assert.equal(code.includes("const W=window, NAME='KVPV_STAND281'"),false);
// [VI dòng gốc 68] gọi assert.equal(code.includes("NAME='KVPV_STAND281'"), false) để kiểm tra hai giá trị bằng nhau
  assert.equal(code.includes("NAME='KVPV_STAND281'"),false);
// [VI dòng gốc 69] gọi assert(fs.existsSync(__dirname+'/archive/stand281-unused.js')) để kiểm tra điều kiện của bài test
  assert(fs.existsSync(__dirname+'/archive/stand281-unused.js'));
// [VI dòng gốc 70] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 71] gọi test('rerunning FULL dispatches live update before legacy engine initialization', ()=>{ const marker='function __KVPV_LIVE_UP…)
test('rerunning FULL dispatches live update before legacy engine initialization',()=>{
// [VI dòng gốc 72] Khai báo biến không gán lại bằng const: marker = "function __KVPV_LIVE_UPDATE(){" | Khai báo biến không gán lại bằng const: pos = gọi code.lastIndexOf(marker) | gọi assert(pos>0) để kiểm tra điều kiện của bài test
  const marker='function __KVPV_LIVE_UPDATE(){';const pos=code.lastIndexOf(marker);assert(pos>0);
// [VI dòng gốc 73] Khai báo biến không gán lại bằng const: dispatch = tính biểu thức code.slice(0,pos)+'function __KVPV_LIVE_UPDATE(){window.reloads=(window.reloads||0)+1;}\n})();'
  const dispatch=code.slice(0,pos)+'function __KVPV_LIVE_UPDATE(){window.reloads=(window.reloads||0)+1;}\n})();';
// [VI dòng gốc 74] Khai báo biến không gán lại bằng const: W = tạo đối tượng gồm KVPV_V1, __KVPV_OWN_ACTOR_ID, _Ba
  const W={KVPV_V1:{},__KVPV_OWN_ACTOR_ID:'12345',_Ba:{_rJ:{_O$:{ins:{actorId:'12345'}}}}};
// [VI dòng gốc 75] Khai báo biến không gán lại bằng const: ctx = tạo đối tượng gồm window, console | gọi vm.runInNewContext(dispatch, ctx) để chạy mã trong ngữ cảnh máy ảo dùng cho kiểm thử
  const ctx={window:W,console:{error(){}}};vm.runInNewContext(dispatch,ctx);vm.runInNewContext(dispatch,ctx);
// [VI dòng gốc 76] gọi assert.equal(W.reloads, 2) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(W.KVPV_MODE, undefined) để kiểm tra hai giá trị bằng nhau
  assert.equal(W.reloads,2);assert.equal(W.KVPV_MODE,undefined);
// [VI dòng gốc 77] gán W._Ba._rJ._O$.ins.actorId bằng '98765' | gọi vm.runInNewContext(dispatch, ctx) để chạy mã trong ngữ cảnh máy ảo dùng cho kiểm thử | gọi assert.equal(W.reloads, 2) để kiểm tra hai giá trị bằng nhau
  W._Ba._rJ._O$.ins.actorId='98765';vm.runInNewContext(dispatch,ctx);assert.equal(W.reloads,2);
// [VI dòng gốc 78] gán W._Ba._rJ._O$.ins.actorId bằng '12345' | gán W.__KVPV_UNIVERSAL_HALTED bằng true | gọi vm.runInNewContext(dispatch, ctx) để chạy mã trong ngữ cảnh máy ảo dùng cho kiểm thử | gọi assert.equal(W.reloads, 2) để kiểm tra hai giá trị bằng nhau
  W._Ba._rJ._O$.ins.actorId='12345';W.__KVPV_UNIVERSAL_HALTED=true;vm.runInNewContext(dispatch,ctx);assert.equal(W.reloads,2);
// [VI dòng gốc 79] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 80] gọi test('FULL stores each module once and preserves both install orders', ()=>{ const manifest=JSON.parse(fs.readFileSync(__dirn…)
test('FULL stores each module once and preserves both install orders',()=>{
// [VI dòng gốc 81] Khai báo biến không gán lại bằng const: manifest = gọi JSON.parse(fs.readFileSync(__dirname+'/MANIFEST.json','utf8')) để phân tích dữ liệu đầu vào theo API đang gọi
  const manifest=JSON.parse(fs.readFileSync(__dirname+'/MANIFEST.json','utf8'));
// [VI dòng gốc 82] Khai báo biến không gán lại bằng const: nameOf = tạo hàm với tham số name; mỗi lần gọi trả về tính biểu thức '__KVPV_INSTALL_'+name.replace(/\W/g,'_')
  const nameOf=name=>'__KVPV_INSTALL_'+name.replace(/\W/g,'_');
// [VI dòng gốc 83] Duyệt từng giá trị trong manifest.modules bằng const name. | Khai báo biến không gán lại bằng const: name (chưa gán giá trị)
  for(const name of manifest.modules){
// [VI dòng gốc 84] Khai báo biến không gán lại bằng const: marker = tính biểu thức '// Source: src/'+name+'\n'
    const marker='// Source: src/'+name+'\n';
// [VI dòng gốc 85] gọi assert.equal(code.split(marker).length-1, 1, name+' source must appear once') để kiểm tra hai giá trị bằng nhau
    assert.equal(code.split(marker).length-1,1,name+' source must appear once');
// [VI dòng gốc 86] Khai báo biến không gán lại bằng const: source = gọi fs.readFileSync(__dirname+'/src/'+name, 'utf8') để đọc tệp đồng bộ
    const source=fs.readFileSync(__dirname+'/src/'+name,'utf8');
// [VI dòng gốc 87] gọi assert(code.includes(marker+source+'\n}'), name+' source preserved verbatim') để kiểm tra điều kiện của bài test
    assert(code.includes(marker+source+'\n}'),name+' source preserved verbatim');
// [VI dòng gốc 88] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 89] Khai báo biến không gán lại bằng const: initial = gọi manifest.modules.map(name=>nameOf(name)+'();').join('\n')
  const initial=manifest.modules.map(name=>nameOf(name)+'();').join('\n');
// [VI dòng gốc 90] Khai báo biến không gán lại bằng const: live = gọi manifest.liveModules.map(name=>nameOf(name)+'();').join('\n')
  const live=manifest.liveModules.map(name=>nameOf(name)+'();').join('\n');
// [VI dòng gốc 91] gọi assert(code.includes(initial), 'initial order') để kiểm tra điều kiện của bài test
  assert(code.includes(initial),'initial order');
// [VI dòng gốc 92] gọi assert(code.includes(live), 'live update order') để kiểm tra điều kiện của bài test
  assert(code.includes(live),'live update order');
// [VI dòng gốc 93] Khai báo biến không gán lại bằng const: sourceLength = gọi manifest.modules.reduce((n,name)=>n+fs.readFileSync(__dirname+'/src/'+name,'utf8').length, 0) để gộp các phần tử thành một kết quả
  const sourceLength=manifest.modules.reduce((n,name)=>n+fs.readFileSync(__dirname+'/src/'+name,'utf8').length,0);
// [VI dòng gốc 94] gọi assert(code.length<sourceLength+50000, 'FULL contains only source bodies plus bounded installer overhead') để kiểm tra điều kiện của bài test
  assert(code.length<sourceLength+50000,'FULL contains only source bodies plus bounded installer overhead');
// [VI dòng gốc 95] Khai báo biến có thể gán lại bằng let: instrumented = code
  let instrumented=code;
// [VI dòng gốc 96] Duyệt từng giá trị trong manifest.modules bằng const name. | Khai báo biến không gán lại bằng const: name (chưa gán giá trị)
  for(const name of manifest.modules){
// [VI dòng gốc 97] Khai báo biến không gán lại bằng const: marker = tính biểu thức '// Source: src/'+name+'\n'
    const marker='// Source: src/'+name+'\n';
// [VI dòng gốc 98] Khai báo biến không gán lại bằng const: source = gọi fs.readFileSync(__dirname+'/src/'+name, 'utf8') để đọc tệp đồng bộ
    const source=fs.readFileSync(__dirname+'/src/'+name,'utf8');
// [VI dòng gốc 99] gán instrumented bằng instrumented.replace(marker+source+'\n}',marker+'window.installed.push('+JSON.stringify(name)+');\n}')
    instrumented=instrumented.replace(marker+source+'\n}',marker+'window.installed.push('+JSON.stringify(name)+');\n}');
// [VI dòng gốc 100] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 101] Khai báo biến không gán lại bằng const: W = tạo đối tượng gồm installed, _Ba
  const W={installed:[],_Ba:globals._Ba};
// [VI dòng gốc 102] Khai báo biến không gán lại bằng const: context = tạo đối tượng gồm window, các thuộc tính của globals, console
  const context={window:W,...globals,console:{error(){}}};
// [VI dòng gốc 103] gọi vm.runInNewContext(instrumented, context) để chạy mã trong ngữ cảnh máy ảo dùng cho kiểm thử
  vm.runInNewContext(instrumented,context);
// [VI dòng gốc 104] gọi assert.deepEqual(W.installed, manifest.modules, 'first install runs all modules in order') để kiểm tra cấu trúc hai giá trị tương đương
  assert.deepEqual(W.installed,manifest.modules,'first install runs all modules in order');
// [VI dòng gốc 105] gán W.installed bằng [] | gán W.__KVPV_OWN_ACTOR_ID bằng '123456'
  W.installed=[];W.__KVPV_OWN_ACTOR_ID='123456';
// [VI dòng gốc 106] Khai báo biến có thể gán lại bằng let: stops = 0 | gán W.KVPV_MODE bằng {stop(){stops++;}} | tăng stops một đơn vị sau khi lấy giá trị | gán W.KVPV_HITRUN_AUTO bằng {}
  let stops=0;W.KVPV_MODE={stop(){stops++;}};W.KVPV_HITRUN_AUTO={};W.KVPV_RANGE281={};
// [VI dòng gốc 107] gọi vm.runInNewContext(instrumented, context) để chạy mã trong ngữ cảnh máy ảo dùng cho kiểm thử
  vm.runInNewContext(instrumented,context);
// [VI dòng gốc 108] gọi assert.deepEqual(W.installed, manifest.liveModules, 'reload runs only live modules in order') để kiểm tra cấu trúc hai giá trị tương đương
  assert.deepEqual(W.installed,manifest.liveModules,'reload runs only live modules in order');
// [VI dòng gốc 109] gọi assert.equal(stops, 1) để kiểm tra hai giá trị bằng nhau
  assert.equal(stops,1);
// [VI dòng gốc 110] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 111] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 112] gọi console.log('PASSED', passed+'/12')
console.log('PASSED',passed+'/12');
// [VI dòng gốc 113] Dòng trống để tách các phần, không có lệnh thực thi.
