// [VI dòng gốc 1] "use strict"
'use strict';
// [VI dòng gốc 2] Khai báo biến không gán lại bằng const: assert = gọi require('node:assert/strict') để nạp module Node.js; vm = gọi require('node:vm') để nạp module Node.js; {EventEmitter} = gọi require('node:events') để nạp module Node.js
const assert=require('node:assert/strict'),vm=require('node:vm'),{EventEmitter}=require('node:events');
// [VI dòng gốc 3] Khai báo biến không gán lại bằng const: {GameBridge,gameURL,injection} = gọi require('./live/core.cjs') để nạp module Node.js
const {GameBridge,gameURL,injection}=require('./live/core.cjs');
// [VI dòng gốc 4] gọi assert(gameURL('https://play.choingay.vn/1046?mode=google')) để kiểm tra điều kiện của bài test
assert(gameURL('https://play.choingay.vn/1046?mode=google'));
// [VI dòng gốc 5] Duyệt từng giá trị trong ['https://play.choingay.vn/10460','https://example.com/1046','https://play.choingay.vn.evil.com/1046'] bằng const url. | Khai báo biến không gán lại bằng const: url (chưa gán giá trị) | gọi assert(!gameURL(url)) để kiểm tra điều kiện của bài test
for(const url of ['https://play.choingay.vn/10460','https://example.com/1046','https://play.choingay.vn.evil.com/1046'])assert(!gameURL(url));
// [VI dòng gốc 6] Định nghĩa hàm game; tham số: actor='123456'
function game(actor='123456'){
// [VI dòng gốc 7] Khai báo biến không gán lại bằng const: role = tạo đối tượng gồm getComponent | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm _Ba, _ft, _Sa, _d, _C.
 const role={getComponent:()=>({})};return {_Ba:{_rJ:{_O$:{ins:{actorId:actor}}}},_ft:{},_Sa:{},_d:{_Yct:{_Eet:1,_Het:2,_zet:3}},_C:{_Ba:{instance:{getRole:()=>role}}}};
// [VI dòng gốc 8] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 9] Định nghĩa lớp MockCDP kế thừa EventEmitter.
class MockCDP extends EventEmitter{
// [VI dòng gốc 10] gọi super() | gán this.context bằng game() | gán this.contexts bằng new Map([['root',{}],['child',this.context],['other',game('987654')]]) | gán this.context._Ba._rJ._O$.ins.isDead bằng true
 constructor(){super();this.context=game();this.contexts=new Map([['root',{}],['child',this.context],['other',game('987654')]]);this.context._Ba._rJ._O$.ins.isDead=true;this.executions=[];this.attached=[];}
// [VI dòng gốc 11] Định nghĩa phương thức send của đối tượng.
 async send(method,p={},session){
// [VI dòng gốc 12] Kiểm tra method==='Target.getTargets': đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm targetInfos.
  if(method==='Target.getTargets')return {targetInfos:[{type:'page',targetId:'page',url:'https://play.choingay.vn/1046'},
// [VI dòng gốc 13] Thuộc tính type: "iframe" | Thuộc tính targetId: "child" | Thuộc tính parentId: "page" | Thuộc tính url: "https://cdn.example/game"
   {type:'iframe',targetId:'child',parentId:'page',url:'https://cdn.example/game'}, {type:'iframe',targetId:'other',url:'https://unrelated.example/'},
// [VI dòng gốc 14] Thuộc tính type: "page" | Thuộc tính targetId: "unrelated-page" | Thuộc tính url: "https://example.com"
   {type:'page',targetId:'unrelated-page',url:'https://example.com'}]};
// [VI dòng gốc 15] Kiểm tra method==='Target.attachToTarget': đúng thì chạy nhánh sau if. | gọi this.attached.push(p.targetId) để thêm phần tử vào cuối mảng | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm sessionId.
  if(method==='Target.attachToTarget'){this.attached.push(p.targetId);return {sessionId:p.targetId};}
// [VI dòng gốc 16] Kiểm tra method==='Runtime.enable': đúng thì chạy nhánh sau if. | Duyệt từng giá trị trong this.contexts bằng const [frameId,w]. | Khai báo biến không gán lại bằng const: [frameId,w] (chưa gán giá trị) | Kiểm tra session==='page'&&frameId==='root'||session===frameId: đúng thì chạy nhánh sau if.
  if(method==='Runtime.enable'){for(const [frameId,w]of this.contexts)if(session==='page'&&frameId==='root'||session===frameId){
// [VI dòng gốc 17] gọi this.emit('event', {method:'Runtime.executionContextCreated',sessionId:session,params:{context:{id:1,uniqueId:frameId+'-unique',au…) | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm .
   this.emit('event',{method:'Runtime.executionContextCreated',sessionId:session,params:{context:{id:1,uniqueId:frameId+'-unique',auxData:{isDefault:true,frameId}}}});}return {};}
// [VI dòng gốc 18] Kiểm tra method==='Page.getFrameTree': đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm frameTree.
  if(method==='Page.getFrameTree')return {frameTree:session==='page'?{frame:{id:'root'}}:{frame:{id:session}}};
// [VI dòng gốc 19] Kiểm tra method==='Runtime.evaluate': đúng thì chạy nhánh sau if.
  if(method==='Runtime.evaluate'){
// [VI dòng gốc 20] gọi assert(p.uniqueContextId, 'use unique context to avoid reused numeric IDs') để kiểm tra điều kiện của bài test | Khai báo biến không gán lại bằng const: key = gọi p.uniqueContextId.replace('-unique', ''); W = gọi this.contexts.get(key)
   assert(p.uniqueContextId,'use unique context to avoid reused numeric IDs');const key=p.uniqueContextId.replace('-unique',''),W=this.contexts.get(key);
// [VI dòng gốc 21] Kiểm tra p.expression.includes('sourceURL=KVPV_LIVE_FULL'): đúng thì chạy nhánh sau if. | gọi this.executions.push(key) để thêm phần tử vào cuối mảng
   if(p.expression.includes('sourceURL=KVPV_LIVE_FULL'))this.executions.push(key);
// [VI dòng gốc 22] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm result. | Nhận lỗi bằng e và chạy phần xử lý lỗi. | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm exceptionDetails.
   try{return {result:{value:vm.runInNewContext(p.expression,{window:W})}};}catch(e){return {exceptionDetails:{text:e.message}};}
// [VI dòng gốc 23] Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error(method)
  }throw Error(method);
// [VI dòng gốc 24] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
 }
// [VI dòng gốc 25] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 26] gọi (async()=>{ const c=new MockCDP(),logs=[],bridge=new GameBridge(c,x=>logs.push(x)); const p1={build:'first',full:'window.installCount=(window.installCount||0)+1;window.KVPV_V1={};w…(e=>{console.error(e);process.exitCode=1;})
(async()=>{
// [VI dòng gốc 27] Khai báo biến không gán lại bằng const: c = tạo đối tượng bằng MockCDP(); logs = tạo mảng gồm 0 vị trí: []; bridge = tạo đối tượng bằng GameBridge(c, x=>logs.push(x))
 const c=new MockCDP(),logs=[],bridge=new GameBridge(c,x=>logs.push(x));
// [VI dòng gốc 28] Khai báo biến không gán lại bằng const: p1 = tạo đối tượng gồm build, full
 const p1={build:'first',full:'window.installCount=(window.installCount||0)+1;window.KVPV_V1={};window.__KVPV_OWN_ACTOR_ID="123456";'};
// [VI dòng gốc 29] chờ tác vụ bất đồng bộ: gọi bridge.sync(p1) | gọi assert.equal(c.executions.length, 0, 'wait for revive') để kiểm tra hai giá trị bằng nhau
 await bridge.sync(p1);assert.equal(c.executions.length,0,'wait for revive');
// [VI dòng gốc 30] gán c.context._Ba._rJ._O$.ins.isDead bằng false | chờ tác vụ bất đồng bộ: gọi bridge.sync(p1) | gọi assert.equal(c.context.installCount, 1) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(c.context.__KVPV_LIVE_BUILD, 'first') để kiểm tra hai giá trị bằng nhau
 c.context._Ba._rJ._O$.ins.isDead=false;await bridge.sync(p1);assert.equal(c.context.installCount,1);assert.equal(c.context.__KVPV_LIVE_BUILD,'first');
// [VI dòng gốc 31] chờ tác vụ bất đồng bộ: gọi bridge.sync(p1) | gọi assert.equal(c.context.installCount, 1, 'same build not reapplied') để kiểm tra hai giá trị bằng nhau
 await bridge.sync(p1);assert.equal(c.context.installCount,1,'same build not reapplied');
// [VI dòng gốc 32] chờ tác vụ bất đồng bộ: gọi bridge.sync({...p1,build:'second'}) | gọi assert.equal(c.context.installCount, 2, 'new build updates existing context') để kiểm tra hai giá trị bằng nhau
 await bridge.sync({...p1,build:'second'});assert.equal(c.context.installCount,2,'new build updates existing context');
// [VI dòng gốc 33] gọi assert.deepEqual(c.executions, ['child','child']) để kiểm tra cấu trúc hai giá trị tương đương | gọi assert(!c.attached.includes('other')) để kiểm tra điều kiện của bài test | gọi assert(!c.attached.includes('unrelated-page')) để kiểm tra điều kiện của bài test
 assert.deepEqual(c.executions,['child','child']);assert(!c.attached.includes('other'));assert(!c.attached.includes('unrelated-page'));
// [VI dòng gốc 34] gán c.context.KVPV_EXECUTOR_REPORT bằng {snapshot:()=>({schema:1,actor:'123456',missing:[{name:'missing'}]})}
 c.context.KVPV_EXECUTOR_REPORT={snapshot:()=>({schema:1,actor:'123456',missing:[{name:'missing'}]})};
// [VI dòng gốc 35] Khai báo biến không gán lại bằng const: telemetry = chờ tác vụ bất đồng bộ: gọi bridge.sync({...p1,build:'second'}) | gọi assert.equal(telemetry.diagnostics.length, 1) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(telemetry.diagnostics[0].actor, '123456') để kiểm tra hai giá trị bằng nhau
 const telemetry=await bridge.sync({...p1,build:'second'});assert.equal(telemetry.diagnostics.length,1);assert.equal(telemetry.diagnostics[0].actor,'123456');
// [VI dòng gốc 36] Khai báo biến có thể gán lại bằng let: relayed = null | gán c.context.KVPV_TEAM_COORDINATOR bằng {receive(rows){relayed=rows;}} | gán relayed bằng rows
 let relayed=null;c.context.KVPV_TEAM_COORDINATOR={receive(rows){relayed=rows;}};
// [VI dòng gốc 37] Khai báo biến không gán lại bằng const: peer = tạo đối tượng gồm actor, power, at, idle, quotas, session
 const peer={actor:'99999',power:100,at:Date.now(),idle:true,quotas:[[2,1]],session:null};
// [VI dòng gốc 38] chờ tác vụ bất đồng bộ: gọi bridge.sync({...p1,build:'second'}, [peer]) | gọi assert.equal(relayed[0].actor, '99999') để kiểm tra hai giá trị bằng nhau | gọi assert.equal(c.context.installCount, 2) để kiểm tra hai giá trị bằng nhau
 await bridge.sync({...p1,build:'second'},[peer]);assert.equal(relayed[0].actor,'99999');assert.equal(c.context.installCount,2);
// [VI dòng gốc 39] gán c.context._Ba._rJ._O$.ins.actorId bằng '987654' | chờ tác vụ bất đồng bộ: gọi bridge.sync({...p1,build:'third'}) | gọi assert.equal(c.executions.length, 2, 'account change blocked') để kiểm tra hai giá trị bằng nhau
 c.context._Ba._rJ._O$.ins.actorId='987654';await bridge.sync({...p1,build:'third'});assert.equal(c.executions.length,2,'account change blocked');
// [VI dòng gốc 40] gán c.context._Ba._rJ._O$.ins.actorId bằng '123456' | chờ tác vụ bất đồng bộ: gọi bridge.sync({build:'error',full:'throw Error("test failure")'})
 c.context._Ba._rJ._O$.ins.actorId='123456';await bridge.sync({build:'error',full:'throw Error("test failure")'});
// [VI dòng gốc 41] chờ tác vụ bất đồng bộ: gọi bridge.sync({build:'error',full:'throw Error("test failure")'}) | gọi assert.equal(c.executions.length, 3, 'failed build does not create reload storm') để kiểm tra hai giá trị bằng nhau
 await bridge.sync({build:'error',full:'throw Error("test failure")'});assert.equal(c.executions.length,3,'failed build does not create reload storm');
// [VI dòng gốc 42] Khai báo biến không gán lại bằng const: missing = gọi game() | xóa thuộc tính missing._C | Khai báo biến không gán lại bằng const: result = gọi vm.runInNewContext(injection('throw Error("must not install")','x'), {window:missing}) để chạy mã trong ngữ cảnh máy ảo dùng cho kiểm thử | gọi assert.equal(result.reason, 'waiting_components') để kiểm tra hai giá trị bằng nhau
 const missing=game();delete missing._C;const result=vm.runInNewContext(injection('throw Error("must not install")','x'),{window:missing});assert.equal(result.reason,'waiting_components');
// [VI dòng gốc 43] gọi console.log('PASS live bridge: game-frame tree only, default/unique context, revive/readiness/identity gates, initial load + changed…)
 console.log('PASS live bridge: game-frame tree only, default/unique context, revive/readiness/identity gates, initial load + changed build without reload, failed install bounded');
// [VI dòng gốc 44] gọi console.error(e) | gán process.exitCode bằng 1
})().catch(e=>{console.error(e);process.exitCode=1;});
// [VI dòng gốc 45] Dòng trống để tách các phần, không có lệnh thực thi.
