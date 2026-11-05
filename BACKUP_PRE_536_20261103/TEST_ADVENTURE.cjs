// [VI dòng gốc 1] "use strict"
'use strict';
// [VI dòng gốc 2] Khai báo biến không gán lại bằng const: fs = gọi require('fs') để nạp module Node.js; vm = gọi require('vm') để nạp module Node.js; assert = gọi require('assert/strict') để nạp module Node.js; source = gọi fs.readFileSync('src/49-adventure.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm, '')
const fs=require('fs'),vm=require('vm'),assert=require('assert/strict'),source=fs.readFileSync('src/49-adventure.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,'');
// [VI dòng gốc 3] Định nghĩa hàm harness; tham số: không có
function harness(){
// [VI dòng gốc 4] Khai báo biến không gán lại bằng const: calls = tạo mảng gồm 0 vị trí: []; timers = tạo đối tượng bằng Map(); listeners = tạo đối tượng bằng Set() | Khai báo biến có thể gán lại bằng let: serial = 0; panel = null; idle = true
 const calls=[],timers=new Map(),listeners=new Set();let serial=0,panel=null,idle=true;
// [VI dòng gốc 5] Khai báo biến không gán lại bằng const: m = tạo đối tượng gồm evtLst, yL; rpc = tạo đối tượng gồm chg, getAdreAward
 const m={evtLst:[],yL:20},rpc={chg:r=>calls.push(['chg',r[0]]),getAdreAward:id=>calls.push(['claim',id])};
// [VI dòng gốc 6] Khai báo biến không gán lại bằng const: W = tạo đối tượng gồm __KVPV_OWN_ACTOR_ID, setInterval, clearInterval, _Ba, _Sa, _ft, KVPV_V871, KVPV_DAILY, _j | gọi timers.set(++serial, fn) | Kết thúc hàm hiện tại và trả về: serial. | gọi timers.delete(id)
 const W={__KVPV_OWN_ACTOR_ID:'12345',setInterval(fn){timers.set(++serial,fn);return serial;},clearInterval(id){timers.delete(id);},
// [VI dòng gốc 7] Kết thúc hàm hiện tại và trả về: idle. | Kết thúc hàm hiện tại và trả về: đảo giá trị đúng/sai của idle.
 _Ba:{_rJ:{_O$:{ins:{actorId:'12345'}}},_Ab:{_mat:{inst:m},_VIt:{inst:rpc}},_$a:{SceneUtil:{get isCommonScene(){return idle;}},_yo:{ins:{get isInMission(){return !idle;}}}}},
// [VI dòng gốc 8] gọi listeners.add(fn) | gọi listeners.delete(fn)
 _Sa:{svrTime:10000,notify:{on(e,s,fn){listeners.add(fn);},off(e,s,fn){listeners.delete(fn);}},getWindowCfgByFcId:fc=>[fc]},
// [VI dòng gốc 9] gọi calls.push(['oldStop']) để thêm phần tử vào cuối mảng
 _ft:{_$Ah:{ins:{getCfgById:()=>[0,0,0,55]}}},KVPV_V871:{stop(){calls.push(['oldStop']);}},KVPV_DAILY:{quickState:()=>({job:'rảnh'})},
// [VI dòng gốc 10] Thuộc tính _j: tạo đối tượng gồm ins | Thuộc tính ins: tạo đối tượng gồm isOpened, getPanelById, open | Thuộc tính isOpened: tạo hàm với tham số (không có); mỗi lần gọi trả về đảo giá trị đúng/sai của !panel | Thuộc tính getPanelById: tạo hàm với tham số (không có); mỗi lần gọi trả về panel
 _j:{ins:{isOpened:()=>!!panel,getPanelById:()=>panel,open:(...args)=>calls.push(['open',...args])}}};
// [VI dòng gốc 11] Khai báo biến không gán lại bằng const: load = tạo hàm với tham số (không có); mỗi lần gọi trả về gọi vm.runInNewContext(source, {window:W,Date,Map,Set,Number,String,Array,JSON,Object}) để chạy mã trong ngữ cảnh máy ảo dùng cho kiểm thử | gọi load()
 const load=()=>vm.runInNewContext(source,{window:W,Date,Map,Set,Number,String,Array,JSON,Object});load();
// [VI dòng gốc 12] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm W, m, calls, timers, listeners, load, tick, idle, panel, event. | Duyệt từng giá trị trong listeners bằng const fn. | Khai báo biến không gán lại bằng const: fn (chưa gán giá trị) | gọi fn([r,0,0])
 return {W,m,calls,timers,listeners,load,tick:()=>W.KVPV_ADVENTURE.sync(),idle:v=>idle=v,panel:p=>panel=p,event:r=>{for(const fn of listeners)fn([r,0,0]);}};
// [VI dòng gốc 13] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 14] Khai báo biến không gán lại bằng const: row = tạo hàm với tham số id, type, progress=0, ready=0, obj=0; mỗi lần gọi trả về tạo mảng gồm 8 vị trí: [id,type,100,progress,ready,[],0,obj]
const row=(id,type,progress=0,ready=0,obj=0)=>[id,type,100,progress,ready,[],0,obj];
// [VI dòng gốc 15] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng {. Đọc cùng dòng mở phía trên: {
{
// [VI dòng gốc 16] Khai báo biến không gán lại bằng const: q = gọi harness() | gán q.m.evtLst bằng [row(1,1,0,1),row(2,1),row(3,1),row(4,2)] | gọi q.tick() để xử lý một nhịp kiểm tra | gọi assert.deepEqual(q.calls.at(-1), ['claim',1]) để kiểm tra cấu trúc hai giá trị tương đương
 const q=harness();q.m.evtLst=[row(1,1,0,1),row(2,1),row(3,1),row(4,2)];q.tick();assert.deepEqual(q.calls.at(-1),['claim',1]);q.tick();assert.deepEqual(q.calls.at(-1),['chg',2]);q.tick();assert.deepEqual(q.calls.at(-1),['chg',3]);q.tick();assert.deepEqual(q.calls.at(-1),['chg',4]);
// [VI dòng gốc 17] Khai báo biến không gán lại bằng const: n = đọc q.calls.length | gọi q.tick() để xử lý một nhịp kiểm tra | gọi q.load()
 const n=q.calls.length;q.tick();q.load();q.tick();assert.equal(q.calls.filter(c=>c[0]!=='oldStop').length,n-1);assert.equal(q.timers.size,1);assert.equal(q.listeners.size,1);
// [VI dòng gốc 18] gọi assert.equal(q.W.KVPV_ADVENTURE.status().pending.length, 4) để kiểm tra hai giá trị bằng nhau
 assert.equal(q.W.KVPV_ADVENTURE.status().pending.length,4);
// [VI dòng gốc 19] gán q.m.evtLst[1] bằng row(2,1,0,0,5) | gán q.m.evtLst bằng q.m.evtLst.filter(r=>r[0]!==1) | gọi q.tick() để xử lý một nhịp kiểm tra | gọi assert.equal(q.W.KVPV_ADVENTURE.status().confirmed, 2) để kiểm tra hai giá trị bằng nhau
 q.m.evtLst[1]=row(2,1,0,0,5);q.m.evtLst=q.m.evtLst.filter(r=>r[0]!==1);q.tick();assert.equal(q.W.KVPV_ADVENTURE.status().confirmed,2);
// [VI dòng gốc 20] gán q.m.evtLst bằng undefined | gọi q.tick() để xử lý một nhịp kiểm tra | gọi assert.equal(q.W.KVPV_ADVENTURE.status().pending.length, 2, 'missing model cannot ACK pending') để kiểm tra hai giá trị bằng nhau
 q.m.evtLst=undefined;q.tick();assert.equal(q.W.KVPV_ADVENTURE.status().pending.length,2,'missing model cannot ACK pending');
// [VI dòng gốc 21] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 22] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng {. Đọc cùng dòng mở phía trên: {
{
// [VI dòng gốc 23] Khai báo biến không gán lại bằng const: q = gọi harness() | gán q.m.yL bằng 0 | gán q.m.evtLst bằng [row(1,1,0,1),row(2,2)] | gọi q.tick() để xử lý một nhịp kiểm tra
 const q=harness();q.m.yL=0;q.m.evtLst=[row(1,1,0,1),row(2,2)];q.tick();assert.deepEqual(q.calls.at(-1),['claim',1]);q.tick();assert(!q.calls.some(c=>c[0]==='chg'));
// [VI dòng gốc 24] Khai báo biến không gán lại bằng const: r = gọi harness() | gán r.m.evtLst bằng [row(5,5,9999)] | gọi r.idle(false) | gọi r.tick() để xử lý một nhịp kiểm tra
 const r=harness();r.m.evtLst=[row(5,5,9999)];r.idle(false);r.tick();assert.deepEqual(r.calls.at(-1),['claim',5]);
// [VI dòng gốc 25] Khai báo biến không gán lại bằng const: s = gọi harness() | gán s.m.evtLst bằng [row(8,5,10001)] | gọi s.tick() để xử lý một nhịp kiểm tra | gọi assert(!s.calls.some(c=>c[0]==='claim'||c[0]==='chg')) để kiểm tra điều kiện của bài test
 const s=harness();s.m.evtLst=[row(8,5,10001)];s.tick();assert(!s.calls.some(c=>c[0]==='claim'||c[0]==='chg'));
// [VI dòng gốc 26] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 27] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng {. Đọc cùng dòng mở phía trên: {
{
// [VI dòng gốc 28] Khai báo biến không gán lại bằng const: q = gọi harness() | gán q.m.evtLst bằng [row(1,2),row(2,3)] | gọi q.idle(false) | gọi q.tick() để xử lý một nhịp kiểm tra
 const q=harness();q.m.evtLst=[row(1,2),row(2,3)];q.idle(false);q.tick();assert(!q.calls.some(c=>c[0]==='chg'));q.idle(true);q.tick();q.tick();assert.equal(q.calls.filter(c=>c[0]==='chg').length,1,'only one exploration in flight');
// [VI dòng gốc 29] Khai báo biến không gán lại bằng const: r = gọi harness() | gán r.m.evtLst bằng [row(1,1,0,0,23)] | gọi r.tick() để xử lý một nhịp kiểm tra | gọi assert.deepEqual(r.calls.at(-1), ['open',55]) để kiểm tra cấu trúc hai giá trị tương đương
 const r=harness();r.m.evtLst=[row(1,1,0,0,23)];r.tick();assert.deepEqual(r.calls.at(-1),['open',55]);r.tick();assert.equal(r.calls.filter(c=>c[0]==='open').length,1);
// [VI dòng gốc 30] gán r.W.__KVPV_USER_UI_UNTIL bằng Date.now()+5000 | gán r.m.evtLst bằng [row(9,1,0,1)] | gọi r.tick() để xử lý một nhịp kiểm tra | gọi assert(!r.calls.some(c=>c[0]==='claim')) để kiểm tra điều kiện của bài test
 r.W.__KVPV_USER_UI_UNTIL=Date.now()+5000;r.m.evtLst=[row(9,1,0,1)];r.tick();assert(!r.calls.some(c=>c[0]==='claim'));
// [VI dòng gốc 31] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 32] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng {. Đọc cùng dòng mở phía trên: {
{
// [VI dòng gốc 33] Khai báo biến không gán lại bằng const: q = gọi harness(); r = gọi row(1, 0) | gán q.m.evtLst bằng [r] | gọi q.tick() để xử lý một nhịp kiểm tra | gọi assert.equal(q.calls.at(-1)[0], 'open') để kiểm tra hai giá trị bằng nhau
 const q=harness(),r=row(1,0);q.m.evtLst=[r];q.tick();assert.equal(q.calls.at(-1)[0],'open');
// [VI dòng gốc 34] Khai báo biến không gán lại bằng const: p = tạo đối tượng gồm _myi, _yTt, sp_0, _GAn, close | gọi q.calls.push(['mini']) để thêm phần tử vào cuối mảng | gán this.sp_0.mouseEnabled bằng false | gọi q.calls.push(['close']) để thêm phần tử vào cuối mảng
 const p={_myi:r,_yTt:null,sp_0:{mouseEnabled:true},_GAn(){q.calls.push(['mini']);this.sp_0.mouseEnabled=false;},close(){q.calls.push(['close']);q.panel(null);}};q.panel(p);q.tick();q.tick();assert.equal(q.calls.filter(c=>c[0]==='mini').length,1);
// [VI dòng gốc 35] gán p._yTt bằng 0 | gán q.m.yL bằng 0 | gọi q.tick() để xử lý một nhịp kiểm tra | gọi assert(!q.calls.some(c=>c[0]==='close'), 'wait exact native ACK') để kiểm tra điều kiện của bài test
 p._yTt=0;q.m.yL=0;q.tick();assert(!q.calls.some(c=>c[0]==='close'),'wait exact native ACK');q.event(r);q.tick();assert(q.calls.some(c=>c[0]==='close'));
// [VI dòng gốc 36] gọi q.W.KVPV_ADVENTURE.stop() để dừng bộ điều khiển và dọn tài nguyên | gọi assert.equal(q.timers.size, 0) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.listeners.size, 0) để kiểm tra hai giá trị bằng nhau
 q.W.KVPV_ADVENTURE.stop();assert.equal(q.timers.size,0);assert.equal(q.listeners.size,0);
// [VI dòng gốc 37] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 38] gọi console.log('PASS Adventure: independent rewards/accept, free points only, idle exploration, exact event pending/reload, objective n…)
console.log('PASS Adventure: independent rewards/accept, free points only, idle exploration, exact event pending/reload, objective navigation, native mini ACK and timer ownership');
// [VI dòng gốc 39] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 40] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng {. Đọc cùng dòng mở phía trên: {
{
// [VI dòng gốc 41] Khai báo biến không gán lại bằng const: q = gọi harness() | gán q.m.evtLst bằng [row(7,1)] | gọi q.idle(false) | gọi q.tick() để xử lý một nhịp kiểm tra
 const q=harness();q.m.evtLst=[row(7,1)];q.idle(false);q.tick();assert(!q.calls.some(c=>c[0]==='chg'),'accept cannot send during another activity');
// [VI dòng gốc 42] gọi q.idle(true) | gọi q.tick() để xử lý một nhịp kiểm tra | gọi assert.deepEqual(q.calls.at(-1), ['chg',7]) để kiểm tra cấu trúc hai giá trị tương đương
 q.idle(true);q.tick();assert.deepEqual(q.calls.at(-1),['chg',7]);
// [VI dòng gốc 43] Khai báo biến có thể gán lại bằng let: reads = 0 | gán q.W._Ba._Ab._VIt.inst._IIt bằng ()=>reads++
 let reads=0;q.W._Ba._Ab._VIt.inst._IIt=()=>reads++;
// [VI dòng gốc 44] Khai báo biến không gán lại bằng const: prior = gọi q.W.KVPV_ADVENTURE._handoff(); chức năng nội bộ chưa xác minh từ tên hàm | xóa thuộc tính prior.lastRefresh | gán prior.pending[0][1].at bằng Date.now()-60000
 const prior=q.W.KVPV_ADVENTURE._handoff();delete prior.lastRefresh;prior.pending[0][1].at=Date.now()-60000;
// [VI dòng gốc 45] Chú thích gốc của tác giả; không được thực thi. Nội dung: Use a facade to simulate a persisted old unresolved request.
 // Use a facade to simulate a persisted old unresolved request.
// [VI dòng gốc 46] Khai báo biến không gán lại bằng const: old = đọc q.W.KVPV_ADVENTURE | gán q.W.KVPV_ADVENTURE bằng {_handoff:()=>prior,stop:()=>old.stop()} | gọi q.load()
 const old=q.W.KVPV_ADVENTURE;q.W.KVPV_ADVENTURE={_handoff:()=>prior,stop:()=>old.stop()};q.load();
// [VI dòng gốc 47] gọi assert.equal(reads, 1) để kiểm tra hai giá trị bằng nhau | gọi q.tick() để xử lý một nhịp kiểm tra | gọi q.load()
 assert.equal(reads,1);q.tick();q.load();q.tick();assert.equal(reads,1,'refresh query and unresolved action carried across reload');
// [VI dòng gốc 48] gọi assert.equal(q.calls.filter(c=>c[0]==='chg').length, 1, 'read refresh never retries accept') để kiểm tra hai giá trị bằng nhau
 assert.equal(q.calls.filter(c=>c[0]==='chg').length,1,'read refresh never retries accept');
// [VI dòng gốc 49] gán q.m.evtLst bằng [row(7,1,0,0,16)] | gọi q.tick() để xử lý một nhịp kiểm tra | gọi assert.equal(q.W.KVPV_ADVENTURE.status().pending.length, 0, 'native changed row ACK releases latch') để kiểm tra hai giá trị bằng nhau
 q.m.evtLst=[row(7,1,0,0,16)];q.tick();assert.equal(q.W.KVPV_ADVENTURE.status().pending.length,0,'native changed row ACK releases latch');
// [VI dòng gốc 50] gọi console.log('PASS Adventure safe acceptance: defer while busy, one read-only refresh per unresolved state, no replay/reload and late…)
 console.log('PASS Adventure safe acceptance: defer while busy, one read-only refresh per unresolved state, no replay/reload and late native ACK');
// [VI dòng gốc 51] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 52] Dòng trống để tách các phần, không có lệnh thực thi.
