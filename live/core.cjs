// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: Giao tiếp CDP cục bộ: chỉ context mặc định thuộc cây frame của game 1046. [đóng chú thích]
/* Giao tiếp CDP cục bộ: chỉ context mặc định thuộc cây frame của game 1046. */
// [VI dòng gốc 2] "use strict"
'use strict';
// [VI dòng gốc 3] Khai báo biến không gán lại bằng const: {EventEmitter} = gọi require('node:events') để nạp module Node.js
const {EventEmitter}=require('node:events');
// [VI dòng gốc 4] Định nghĩa lớp CDP kế thừa EventEmitter.
class CDP extends EventEmitter{
// [VI dòng gốc 5] gọi super() | gán this.ws bằng ws | gán this.serial bằng 0 | gán this.pending bằng new Map()
  constructor(ws){super();this.ws=ws;this.serial=0;this.pending=new Map();
// [VI dòng gốc 6] gọi ws.addEventListener('message', e=>{const msg=JSON.parse(e.data); if(msg.id){const p=this.pending.get(msg.id);if(!p)return;this.pending.delet…) để đăng ký bộ xử lý sự kiện | Khai báo biến không gán lại bằng const: msg = gọi JSON.parse(e.data) để phân tích dữ liệu đầu vào theo API đang gọi
    ws.addEventListener('message',e=>{const msg=JSON.parse(e.data);
// [VI dòng gốc 7] Kiểm tra msg.id: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | Khai báo biến không gán lại bằng const: p = gọi this.pending.get(msg.id) | Kiểm tra !p: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      if(msg.id){const p=this.pending.get(msg.id);if(!p)return;this.pending.delete(msg.id);clearTimeout(p.timer);msg.error?p.reject(Error(msg.error.message)):p.resolve(msg.result);}
// [VI dòng gốc 8] gọi this.emit('event', msg)
      else this.emit('event',msg);
// [VI dòng gốc 9] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    });
// [VI dòng gốc 10] gọi ws.addEventListener('close', ()=>{for(const p of this.pending.values()){clearTimeout(p.timer);p.reject(Error('Browser disconnected'));}this.…) để đăng ký bộ xử lý sự kiện | Duyệt từng giá trị trong this.pending.values() bằng const p. | Khai báo biến không gán lại bằng const: p (chưa gán giá trị) | gọi clearTimeout(p.timer) để hủy lịch thực hiện một lần
    ws.addEventListener('close',()=>{for(const p of this.pending.values()){clearTimeout(p.timer);p.reject(Error('Browser disconnected'));}this.pending.clear();this.emit('closed');});
// [VI dòng gốc 11] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 12] Khai báo biến không gán lại bằng const: ws = tạo đối tượng bằng WebSocket(url) | chờ tác vụ bất đồng bộ: tạo đối tượng bằng Promise((resolve,reject)=>{ws.addEventListener('open',resolve,{once:true});ws.addEventListener('error',()=>reject(Error('Cannot …) | gọi ws.addEventListener('open', resolve, {once:true}) để đăng ký bộ xử lý sự kiện | gọi ws.addEventListener('error', ()=>reject(Error('Cannot connect local browser')), {once:true}) để đăng ký bộ xử lý sự kiện
  static async connect(url){const ws=new WebSocket(url);await new Promise((resolve,reject)=>{ws.addEventListener('open',resolve,{once:true});ws.addEventListener('error',()=>reject(Error('Cannot connect local browser')),{once:true});});return new CDP(ws);}
// [VI dòng gốc 13] Kết thúc hàm hiện tại và trả về: tạo đối tượng bằng Promise((resolve,reject)=>{ const id=++this.serial,timer=setTimeout(()=>{this.pending.delete(id);reject(Error('CDP timeout: '+me…).
  send(method,params={},sessionId){return new Promise((resolve,reject)=>{
// [VI dòng gốc 14] Khai báo biến không gán lại bằng const: id = tăng this.serial một đơn vị trước khi lấy giá trị; timer = gọi setTimeout(()=>{this.pending.delete(id);reject(Error('CDP timeout: '+method));}, 12000) để hẹn thực hiện một lần | gọi this.pending.delete(id) | gọi reject(Error('CDP timeout: '+method))
    const id=++this.serial,timer=setTimeout(()=>{this.pending.delete(id);reject(Error('CDP timeout: '+method));},12000);
// [VI dòng gốc 15] gọi this.pending.set(id, {resolve,reject,timer}) | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | gọi this.ws.send(JSON.stringify({id,method,params,...(sessionId?{sessionId}:{})})) | Nhận lỗi bằng e và chạy phần xử lý lỗi.
    this.pending.set(id,{resolve,reject,timer});try{this.ws.send(JSON.stringify({id,method,params,...(sessionId?{sessionId}:{})}));}catch(e){clearTimeout(timer);this.pending.delete(id);reject(e);}
// [VI dòng gốc 16] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  });}
// [VI dòng gốc 17] gọi this.ws.close()
  close(){this.ws.close();}
// [VI dòng gốc 18] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 19] Định nghĩa hàm gameURL; tham số: url | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | Khai báo biến không gán lại bằng const: u = tạo đối tượng bằng URL(url) | Kết thúc hàm hiện tại và trả về: /^https?:$/.test(u.protocol)&&u.hostname==='play.choingay.vn' và chỉ đánh giá vế phải khi vế trái truthy: /^\/1046(?:\/|$)/.test(u.pathname).
function gameURL(url){try{const u=new URL(url);return /^https?:$/.test(u.protocol)&&u.hostname==='play.choingay.vn'&&/^\/1046(?:\/|$)/.test(u.pathname);}catch(_){return false;}}
// [VI dòng gốc 20] Định nghĩa hàm frameIds; tham số: tree, out=new Set() | Kiểm tra tree?.frame?.id: đúng thì chạy nhánh sau if. | gọi out.add(tree.frame.id) | Duyệt từng giá trị trong tree?.childFrames||[] bằng const child.
function frameIds(tree,out=new Set()){if(tree?.frame?.id)out.add(tree.frame.id);for(const child of tree?.childFrames||[])frameIds(child,out);return out;}
// [VI dòng gốc 21] Nội dung nguyên văn của chuỗi mẫu; đây là dữ liệu trong chuỗi, không phải lệnh đang chạy.
const probe=`(() => {
 const W=window,p=W._Ba?._rJ?._O$?.ins,actor=String(p?.actorId||'');
 if(!p||!W._ft||!W._Sa||!(/^[1-9]\\d{4,24}$/).test(actor))return {ready:false};
 if(W.__KVPV_UNIVERSAL_HALTED||W.KVPV_V1&&String(W.__KVPV_OWN_ACTOR_ID)!==actor)return {ready:false,reason:'account_changed_open_new_tab'};
 if(p.isDead===true)return {ready:false,reason:'waiting_revive'};
 const types=W._d?._Yct,world=W._C?._Ba?.instance,role=world?.getRole?.(Number(actor))||world?.getRole?.(actor);
 if(!types?._Eet||!types?._Het||!types?._zet||!role?.getComponent?.(types._Eet)||!role.getComponent(types._Het)||!role.getComponent(types._zet))return {ready:false,reason:'waiting_components'};
 let diagnostics=null;try{diagnostics=W.KVPV_EXECUTOR_REPORT?.snapshot?.()??null;}catch(_){}
 return {ready:true,actor,loaded:W.__KVPV_LIVE_BUILD||null,diagnostics};
})()`;
// [VI dòng gốc 31] Nội dung nguyên văn của chuỗi mẫu; đây là dữ liệu trong chuỗi, không phải lệnh đang chạy.
function injection(full,build){return `(() => { const before=${probe};if(!before.ready)return before;\n${full}\nif(!window.KVPV_V1)throw Error('FULL did not install');window.__KVPV_LIVE_BUILD=${JSON.stringify(build)};return {ready:true,loaded:window.__KVPV_LIVE_BUILD};})()\n//# sourceURL=KVPV_LIVE_FULL.js`;}
// [VI dòng gốc 32] Định nghĩa lớp GameBridge.
class GameBridge{
// [VI dòng gốc 33] gán this.cdp bằng cdp | gán this.log bằng log | gán this.targets bằng new Map() | gán this.contexts bằng new Map()
  constructor(cdp,log=()=>{}){this.cdp=cdp;this.log=log;this.targets=new Map();this.contexts=new Map();this.attempts=new Map();this.errors=new Map();
// [VI dòng gốc 34] gọi cdp.on('event', m=>{ const p=m.params||{},sid=m.sessionId; if(m.method==='Runtime.executionContextCreated'&&p.context?.auxData?…)
    cdp.on('event',m=>{
// [VI dòng gốc 35] Khai báo biến không gán lại bằng const: p = m.params hoặc dùng vế phải khi vế trái falsy: {}; sid = đọc m.sessionId
      const p=m.params||{},sid=m.sessionId;
// [VI dòng gốc 36] Kiểm tra m.method==='Runtime.executionContextCreated'&&p.context?.auxData?.isDefault===true: đúng thì chạy nhánh sau if. | Khai báo biến không gán lại bằng const: c = đọc p.context | gọi this.contexts.set(sid+'/'+c.id, {...c,sessionId:sid})
      if(m.method==='Runtime.executionContextCreated'&&p.context?.auxData?.isDefault===true){const c=p.context;this.contexts.set(sid+'/'+c.id,{...c,sessionId:sid});}
// [VI dòng gốc 37] Kiểm tra m.method==='Runtime.executionContextDestroyed': đúng thì chạy nhánh sau if. | gọi this.contexts.delete(sid+'/'+p.executionContextId)
      if(m.method==='Runtime.executionContextDestroyed'){this.contexts.delete(sid+'/'+p.executionContextId);}
// [VI dòng gốc 38] Kiểm tra m.method==='Runtime.executionContextsCleared': đúng thì chạy nhánh sau if. | Duyệt từng giá trị trong this.contexts bằng const [key,c]. | Khai báo biến không gán lại bằng const: [key,c] (chưa gán giá trị) | Kiểm tra c.sessionId===sid: đúng thì chạy nhánh sau if.
      if(m.method==='Runtime.executionContextsCleared')for(const [key,c]of this.contexts)if(c.sessionId===sid)this.contexts.delete(key);
// [VI dòng gốc 39] Kiểm tra m.method==='Target.detachedFromTarget': đúng thì chạy nhánh sau if. | gọi this.removeSession(p.sessionId)
      if(m.method==='Target.detachedFromTarget')this.removeSession(p.sessionId);
// [VI dòng gốc 40] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    });
// [VI dòng gốc 41] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 42] Duyệt từng giá trị trong this.targets bằng const [id,s]. | Khai báo biến không gán lại bằng const: [id,s] (chưa gán giá trị) | Kiểm tra s===sid: đúng thì chạy nhánh sau if. | gọi this.targets.delete(id)
  removeSession(sid){for(const [id,s]of this.targets)if(s===sid)this.targets.delete(id);for(const [key,c]of this.contexts)if(c.sessionId===sid)this.contexts.delete(key);}
// [VI dòng gốc 43] Kiểm tra this.targets.has(info.targetId): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: gọi this.targets.get(info.targetId).
  async attach(info){if(this.targets.has(info.targetId))return this.targets.get(info.targetId);
// [VI dòng gốc 44] Khai báo biến không gán lại bằng const: {sessionId} = chờ tác vụ bất đồng bộ: gọi this.cdp.send('Target.attachToTarget', {targetId:info.targetId,flatten:true}) | gọi this.targets.set(info.targetId, sessionId)
    const {sessionId}=await this.cdp.send('Target.attachToTarget',{targetId:info.targetId,flatten:true});this.targets.set(info.targetId,sessionId);
// [VI dòng gốc 45] chờ tác vụ bất đồng bộ: gọi this.cdp.send('Runtime.enable', {}, sessionId) | Kết thúc hàm hiện tại và trả về: sessionId.
    await this.cdp.send('Runtime.enable',{},sessionId);return sessionId;
// [VI dòng gốc 46] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 47] Khai báo biến không gán lại bằng const: result = chờ tác vụ bất đồng bộ: gọi this.cdp.send('Runtime.evaluate', { expression,returnByValue:true,awaitPromise:false,...(context.uniqueId?{uniqueContextId:context.uni…)
  async evaluate(context,expression){const result=await this.cdp.send('Runtime.evaluate',{
// [VI dòng gốc 48] Thuộc tính expression: dùng biến cùng tên | Thuộc tính returnByValue: true | Thuộc tính awaitPromise: false | Thuộc tính uniqueContextId: đọc context.uniqueId
    expression,returnByValue:true,awaitPromise:false,...(context.uniqueId?{uniqueContextId:context.uniqueId}:{contextId:context.id})
// [VI dòng gốc 49] Kiểm tra result.exceptionDetails: đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error(result.exceptionDetails.exception?.description||result.exceptionDetails.text) | Kết thúc hàm hiện tại và trả về: đọc result.result?.value nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại).
  },context.sessionId);if(result.exceptionDetails)throw Error(result.exceptionDetails.exception?.description||result.exceptionDetails.text);return result.result?.value;}
// [VI dòng gốc 50] Định nghĩa phương thức sync của đối tượng.
  async sync(payload,partyPeers=[],desktopControls=[]){
// [VI dòng gốc 51] Khai báo biến không gán lại bằng const: {targetInfos} = chờ tác vụ bất đồng bộ: gọi this.cdp.send('Target.getTargets') | Khai báo biến không gán lại bằng const: live = tạo đối tượng bằng Set(targetInfos.map(t=>t.targetId))
    const {targetInfos}=await this.cdp.send('Target.getTargets');const live=new Set(targetInfos.map(t=>t.targetId));
// [VI dòng gốc 52] Duyệt từng giá trị trong this.targets bằng const [id,sid]. | Khai báo biến không gán lại bằng const: [id,sid] (chưa gán giá trị) | Kiểm tra !live.has(id): đúng thì chạy nhánh sau if. | gọi this.removeSession(sid)
    for(const [id,sid]of this.targets)if(!live.has(id))this.removeSession(sid);
// [VI dòng gốc 53] Khai báo biến không gán lại bằng const: allowed = tạo đối tượng bằng Set(); pages = gọi targetInfos.filter(t=>t.type==='page'&&gameURL(t.url)) để giữ phần tử thỏa điều kiện
    const allowed=new Set(),pages=targetInfos.filter(t=>t.type==='page'&&gameURL(t.url));
// [VI dòng gốc 54] Duyệt từng giá trị trong pages bằng const page. | Khai báo biến không gán lại bằng const: page (chưa gán giá trị) | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | Khai báo biến không gán lại bằng const: sid = chờ tác vụ bất đồng bộ: gọi this.attach(page)
    for(const page of pages){try{const sid=await this.attach(page);const tree=await this.cdp.send('Page.getFrameTree',{},sid);frameIds(tree.frameTree,allowed);}catch(_){}}
// [VI dòng gốc 55] Chú thích gốc của tác giả; không được thực thi. Nội dung: FrameTree có thể bỏ qua OOPIF. Chrome mới trả parentId/parentFrameId
    // FrameTree có thể bỏ qua OOPIF. Chrome mới trả parentId/parentFrameId
// [VI dòng gốc 56] Chú thích gốc của tác giả; không được thực thi. Nội dung: trong TargetInfo: đi từ tab game xuống, không attach iframe của tab khác.
    // trong TargetInfo: đi từ tab game xuống, không attach iframe của tab khác.
// [VI dòng gốc 57] Khai báo biến không gán lại bằng const: authorizedTargets = tạo đối tượng bằng Set(pages.map(t=>t.targetId)) | Khai báo biến có thể gán lại bằng let: expanded = true
    const authorizedTargets=new Set(pages.map(t=>t.targetId));let expanded=true;
// [VI dòng gốc 58] Lặp khi điều kiện còn đúng: expanded | gán expanded bằng false
    while(expanded){expanded=false;
// [VI dòng gốc 59] Duyệt từng giá trị trong targetInfos bằng const target. | Khai báo biến không gán lại bằng const: target (chưa gán giá trị) | Kiểm tra target.type==='iframe'&&!authorizedTargets.has(target.targetId)&& (allowed.has(target.targetId)||allowed.has(target.parentFrameId)||authorizedTargets.has(target.parentId)): đúng thì chạy nhánh sau if.
      for(const target of targetInfos)if(target.type==='iframe'&&!authorizedTargets.has(target.targetId)&&
// [VI dòng gốc 60] gọi allowed.has(target.targetId) | gọi allowed.has(target.parentFrameId) | gọi authorizedTargets.has(target.parentId)
        (allowed.has(target.targetId)||allowed.has(target.parentFrameId)||authorizedTargets.has(target.parentId))){
// [VI dòng gốc 61] gọi authorizedTargets.add(target.targetId) | gọi allowed.add(target.targetId) | gán expanded bằng true
        authorizedTargets.add(target.targetId);allowed.add(target.targetId);expanded=true;
// [VI dòng gốc 62] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | Khai báo biến không gán lại bằng const: sid = chờ tác vụ bất đồng bộ: gọi this.attach(target) | Khai báo biến không gán lại bằng const: tree = chờ tác vụ bất đồng bộ: gọi this.cdp.send('Page.getFrameTree', {}, sid) | gọi frameIds(tree.frameTree, allowed)
        try{const sid=await this.attach(target);const tree=await this.cdp.send('Page.getFrameTree',{},sid);frameIds(tree.frameTree,allowed);}catch(_){}
// [VI dòng gốc 63] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
      }
// [VI dòng gốc 64] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 65] Khai báo biến không gán lại bằng const: diagnostics = tạo mảng gồm 0 vị trí: []
    const diagnostics=[];
// [VI dòng gốc 66] Duyệt từng giá trị trong [...this.contexts.values()] bằng const context. | Khai báo biến không gán lại bằng const: context (chưa gán giá trị)
    for(const context of [...this.contexts.values()]){
// [VI dòng gốc 67] Kiểm tra !allowed.has(context.auxData?.frameId): đúng thì chạy nhánh sau if. | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
      if(!allowed.has(context.auxData?.frameId))continue;
// [VI dòng gốc 68] Khai báo biến không gán lại bằng const: key = context.uniqueId hoặc dùng vế phải khi vế trái falsy: context.sessionId+'/'+context.id
      const key=context.uniqueId||context.sessionId+'/'+context.id;
// [VI dòng gốc 69] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài.
      try{
// [VI dòng gốc 70] Khai báo biến không gán lại bằng const: state = chờ tác vụ bất đồng bộ: gọi this.evaluate(context, probe) | Kiểm tra !state?.ready: đúng thì chạy nhánh sau if. | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
        const state=await this.evaluate(context,probe);if(!state?.ready)continue;
// [VI dòng gốc 71] Kiểm tra state.diagnostics: đúng thì chạy nhánh sau if. | gọi diagnostics.push(state.diagnostics) để thêm phần tử vào cuối mảng
        if(state.diagnostics)diagnostics.push(state.diagnostics);
// [VI dòng gốc 72] Kiểm tra Array.isArray(partyPeers)&&partyPeers.length<=32: đúng thì chạy nhánh sau if. | chờ tác vụ bất đồng bộ: gọi this.evaluate(context, 'window.KVPV_TEAM_COORDINATOR?.receive?.('+JSON.stringify(partyPeers)+')')
        if(Array.isArray(partyPeers)&&partyPeers.length<=32)await this.evaluate(context,
// [VI dòng gốc 73] gọi JSON.stringify(partyPeers) để chuyển giá trị thành chuỗi JSON
          'window.KVPV_TEAM_COORDINATOR?.receive?.('+JSON.stringify(partyPeers)+')');
// [VI dòng gốc 74] Kiểm tra Array.isArray(desktopControls)&&desktopControls.length<=8&&desktopControls.length: đúng thì chạy nhánh sau if. | chờ tác vụ bất đồng bộ: gọi this.evaluate(context, 'window.KVPV_DESKTOP_CONTROL?.receive?.('+JSON.stringify(desktopControls)+')')
        if(Array.isArray(desktopControls)&&desktopControls.length<=8&&desktopControls.length)await this.evaluate(context,
// [VI dòng gốc 75] gọi JSON.stringify(desktopControls) để chuyển giá trị thành chuỗi JSON
          'window.KVPV_DESKTOP_CONTROL?.receive?.('+JSON.stringify(desktopControls)+')');
// [VI dòng gốc 76] Kiểm tra state.loaded===payload.build: đúng thì chạy nhánh sau if. | Kiểm tra this.attempts.get(key)!==payload.build: đúng thì chạy nhánh sau if. | gọi this.attempts.set(key, payload.build) | gọi this.log('READY '+payload.build+' actor '+state.actor)
        if(state.loaded===payload.build){if(this.attempts.get(key)!==payload.build){this.attempts.set(key,payload.build);this.log('READY '+payload.build+' actor '+state.actor);}continue;}
// [VI dòng gốc 77] Kiểm tra this.attempts.get(key)===payload.build: đúng thì chạy nhánh sau if. | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
        if(this.attempts.get(key)===payload.build)continue;
// [VI dòng gốc 78] Chú thích gốc của tác giả; không được thực thi. Nội dung: Một lần/build/context. Nếu cài lỗi không tự spam khởi động lại trận.
        // Một lần/build/context. Nếu cài lỗi không tự spam khởi động lại trận.
// [VI dòng gốc 79] gọi this.attempts.set(key, payload.build)
        this.attempts.set(key,payload.build);
// [VI dòng gốc 80] Khai báo biến không gán lại bằng const: result = chờ tác vụ bất đồng bộ: gọi this.evaluate(context, injection(payload.full,payload.build))
        const result=await this.evaluate(context,injection(payload.full,payload.build));
// [VI dòng gốc 81] Kiểm tra result?.loaded===payload.build: đúng thì chạy nhánh sau if. | gọi this.log('LOADED '+payload.build+' actor '+state.actor)
        if(result?.loaded===payload.build)this.log('LOADED '+payload.build+' actor '+state.actor);
// [VI dòng gốc 82] Nhận lỗi bằng e và chạy phần xử lý lỗi. | Khai báo biến không gán lại bằng const: message = gọi String(e.message||e).slice(0, 350) để lấy một đoạn dữ liệu
      }catch(e){const message=String(e.message||e).slice(0,350);
// [VI dòng gốc 83] Kiểm tra /uniqueContextId not found|Cannot find context|Execution context was destroyed|Target closed/i.test(message): đúng thì chạy nhánh sau if. | gọi this.attempts.delete(key) | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
        if(/uniqueContextId not found|Cannot find context|Execution context was destroyed|Target closed/i.test(message)){this.attempts.delete(key);continue;}
// [VI dòng gốc 84] Kiểm tra this.errors.get(key)!==message: đúng thì chạy nhánh sau if. | gọi this.errors.set(key, message) | gọi this.log('FRAME ERROR: '+message)
        if(this.errors.get(key)!==message){this.errors.set(key,message);this.log('FRAME ERROR: '+message);}}
// [VI dòng gốc 85] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 86] Chú thích gốc của tác giả; không được thực thi. Nội dung: Không giữ lịch sử của những context đã đóng vô hạn.
    // Không giữ lịch sử của những context đã đóng vô hạn.
// [VI dòng gốc 87] Khai báo biến không gán lại bằng const: keys = tạo đối tượng bằng Set([...this.contexts.values()].map(c=>c.uniqueId||c.sessionId+'/'+c.id))
    const keys=new Set([...this.contexts.values()].map(c=>c.uniqueId||c.sessionId+'/'+c.id));
// [VI dòng gốc 88] Duyệt từng giá trị trong this.attempts.keys() bằng const key. | Khai báo biến không gán lại bằng const: key (chưa gán giá trị) | Kiểm tra !keys.has(key): đúng thì chạy nhánh sau if. | gọi this.attempts.delete(key)
    for(const key of this.attempts.keys())if(!keys.has(key)){this.attempts.delete(key);this.errors.delete(key);}
// [VI dòng gốc 89] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm pages, contexts, diagnostics.
    return {pages:pages.length,contexts:this.contexts.size,diagnostics};
// [VI dòng gốc 90] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 91] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 92] gán module.exports bằng {CDP,GameBridge,gameURL,frameIds,probe,injection}
module.exports={CDP,GameBridge,gameURL,frameIds,probe,injection};
// [VI dòng gốc 93] Dòng trống để tách các phần, không có lệnh thực thi.
