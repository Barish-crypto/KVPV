// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: Không nhận lệnh từ website. Chỉ popup nội bộ được gắn/ngắt tab người dùng chọn. [đóng chú thích]
/* Không nhận lệnh từ website. Chỉ popup nội bộ được gắn/ngắt tab người dùng chọn. */
// [VI dòng gốc 2] gọi importScripts('core.js')
importScripts('core.js','input-click.js');
// [VI dòng gốc 3] Khai báo biến không gán lại bằng const: diagnosticsSent = tạo đối tượng bằng Map()
const diagnosticsSent=new Map();
// [VI dòng gốc 4] Khai báo biến không gán lại bằng const: tabs = tạo đối tượng bằng Map(); core = đọc self.KVPV_EDGE_CORE
const tabs=new Map(),core=self.KVPV_EDGE_CORE;
// [VI dòng gốc 5] Khai báo biến có thể gán lại bằng let: desktopControls = tạo mảng gồm 0 vị trí: []; partyPeers = tạo mảng gồm 0 vị trí: []; port = null; payload = null; transfer = null; nativeState = "Chưa kết nối bộ theo dõi"; queue = gọi Promise.resolve(); busy = false; pumpAgain = false
let desktopControls=[],partyPeers=[],port=null,payload=null,transfer=null,nativeState='Chưa kết nối bộ theo dõi',queue=Promise.resolve(),busy=false,pumpAgain=false;
// [VI dòng gốc 6] Định nghĩa lớp Adapter.
class Adapter{
// [VI dòng gốc 7] gán this.tabId bằng tabId | gán this.targetId bằng targetId | gán this.url bằng url | gán this.listeners bằng []
  constructor(tabId,targetId,url){this.tabId=tabId;this.targetId=targetId;this.url=url;this.listeners=[];this.children=new Map();}
// [VI dòng gốc 8] Kiểm tra event==='event': đúng thì chạy nhánh sau if. | gọi this.listeners.push(fn) để thêm phần tử vào cuối mảng
  on(event,fn){if(event==='event')this.listeners.push(fn);}
// [VI dòng gốc 9] Duyệt từng giá trị trong this.listeners bằng const fn. | Khai báo biến không gán lại bằng const: fn (chưa gán giá trị) | gọi fn(event)
  emit(event){for(const fn of this.listeners)fn(event);}
// [VI dòng gốc 10] Định nghĩa phương thức send của đối tượng.
  async send(method,params={},sessionId='root'){
// [VI dòng gốc 11] Khai báo biến không gán lại bằng const: source = tạo đối tượng gồm tabId, các thuộc tính của sessionId!=='root'?{sessionId}:{}
    const source={tabId:this.tabId,...(sessionId!=='root'?{sessionId}:{})};
// [VI dòng gốc 12] Kiểm tra method==='Target.getTargets': đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm targetInfos.
    if(method==='Target.getTargets')return {targetInfos:[{type:'page',targetId:this.targetId,url:this.url},...Array.from(this.children.values(),c=>c.info)]};
// [VI dòng gốc 13] Kiểm tra method==='Target.attachToTarget'&&params.targetId===this.targetId: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm sessionId.
    if(method==='Target.attachToTarget'&&params.targetId===this.targetId)return {sessionId:'root'};
// [VI dòng gốc 14] Kiểm tra method==='Target.attachToTarget': đúng thì chạy nhánh sau if. | Khai báo biến không gán lại bằng const: child = gọi this.children.get(params.targetId) | Kiểm tra child: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm sessionId.
    if(method==='Target.attachToTarget'){const child=this.children.get(params.targetId);if(child)return {sessionId:child.sessionId};throw Error('Frame chưa auto-attach');}
// [VI dòng gốc 15] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | Kết thúc hàm hiện tại và trả về: chờ tác vụ bất đồng bộ: gọi chrome.debugger.sendCommand(source, method, params). | Nhận lỗi bằng e và chạy phần xử lý lỗi. | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error(method+': '+e.message)
    try{return await chrome.debugger.sendCommand(source,method,params);}catch(e){throw Error(method+': '+e.message);}
// [VI dòng gốc 16] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 17] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 18] Định nghĩa hàm report; tham số: tab | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm nativeState, build, attached, reason, history.
function report(tab){return {nativeState,build:payload?.build||null,attached:!!tab,reason:tab?.reason||'Chưa gắn vào tab này',history:tab?.history.slice(-4)||[],inputClick:tab?.input?.status?.()??{enabled:false}};}
// [VI dòng gốc 19] Định nghĩa hàm bất đồng bộ attach; tham số: tabId
async function attach(tabId){
// [VI dòng gốc 20] Khai báo biến không gán lại bằng const: tab = chờ tác vụ bất đồng bộ: gọi chrome.tabs.get(tabId) | Kiểm tra !core.gameURL(tab.url): đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('Chọn tab Kiếm Vũ Phong Vân trên play.choingay.vn/1046 trước.')
  const tab=await chrome.tabs.get(tabId);if(!core.gameURL(tab.url))throw Error('Chọn tab Kiếm Vũ Phong Vân trên play.choingay.vn/1046 trước.');
// [VI dòng gốc 21] Kiểm tra tabs.has(tabId): đúng thì chạy nhánh sau if. | gọi connect() | Kết thúc hàm hiện tại và trả về: gọi report(tabs.get(tabId)).
  if(tabs.has(tabId)){connect();return report(tabs.get(tabId));}
// [VI dòng gốc 22] chờ tác vụ bất đồng bộ: gọi chrome.debugger.attach({tabId}, '1.3')
  await chrome.debugger.attach({tabId},'1.3');
// [VI dòng gốc 23] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài.
  try{
// [VI dòng gốc 24] Khai báo biến không gán lại bằng const: targetInfo = gọi (await chrome.debugger.getTargets()).find(t=>t.tabId===tabId) để tìm phần tử đầu tiên thỏa điều kiện
    const targetInfo=(await chrome.debugger.getTargets()).find(t=>t.tabId===tabId);
// [VI dòng gốc 25] Kiểm tra !targetInfo: đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('Không tìm thấy debugger target của tab')
    if(!targetInfo)throw Error('Không tìm thấy debugger target của tab');
// [VI dòng gốc 26] Khai báo biến không gán lại bằng const: adapter = tạo đối tượng bằng Adapter(tabId, targetInfo.id, tab.url); entry = tạo đối tượng gồm adapter, reason, history
    const adapter=new Adapter(tabId,targetInfo.id,tab.url),entry={adapter,reason:'Đang đợi nhân vật tải xong',history:[]};
// [VI dòng gốc 27] gán entry.bridge bằng new core.GameBridge(adapter,text=>{entry.reason=text;entry.history.push(text);if(entry.history.length>20)entry.history.shift();}) | gán entry.reason bằng text | gọi entry.history.push(text) để thêm phần tử vào cuối mảng | Kiểm tra entry.history.length>20: đúng thì chạy nhánh sau if.
    entry.bridge=new core.GameBridge(adapter,text=>{entry.reason=text;entry.history.push(text);if(entry.history.length>20)entry.history.shift();});
// [VI dòng gốc 28] gọi tabs.set(tabId, entry)
    entry.input=self.KVPV_EDGE_INPUT?.create(entry,chrome,core.gameURL);
    tabs.set(tabId,entry);
// [VI dòng gốc 29] chờ tác vụ bất đồng bộ: gọi chrome.debugger.sendCommand({tabId}, 'Target.setAutoAttach', {autoAttach:true,waitForDebuggerOnStart:false,flatten:true})
    await chrome.debugger.sendCommand({tabId},'Target.setAutoAttach',{autoAttach:true,waitForDebuggerOnStart:false,flatten:true});
// [VI dòng gốc 30] gọi connect() | Kiểm tra payload: đúng thì chạy nhánh sau if. | chờ tác vụ bất đồng bộ: gọi entry.bridge.sync(payload) | Kết thúc hàm hiện tại và trả về: gọi report(entry).
    connect();if(payload)await entry.bridge.sync(payload);return report(entry);
// [VI dòng gốc 31] Nhận lỗi bằng e và chạy phần xử lý lỗi. | chờ tác vụ bất đồng bộ: gọi chrome.debugger.detach({tabId}).catch(()=>{}) | Ném lỗi và chuyển luồng tới catch gần nhất: e
  }catch(e){await chrome.debugger.detach({tabId}).catch(()=>{});throw e;}
// [VI dòng gốc 32] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 33] Định nghĩa hàm connect; tham số: không có
function connect(){
// [VI dòng gốc 34] Kiểm tra port: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  if(port)return;
// [VI dòng gốc 35] gán nativeState bằng 'Đang kết nối file trên máy…' | gán port bằng chrome.runtime.connectNative('com.kvpv.localwatch')
  nativeState='Đang kết nối file trên máy…';port=chrome.runtime.connectNative('com.kvpv.localwatch');
// [VI dòng gốc 36] gọi port.onMessage.addListener(message=>{queue=queue.then(()=>receive(message)).catch(e=>{nativeState='Lỗi dữ liệu: '+e.message;transfer=null;});}) để đăng ký bộ lắng nghe | gán queue bằng queue.then(()=>receive(message)).catch(e=>{nativeState='Lỗi dữ liệu: '+e.message;transfer=null;}) | gán nativeState bằng 'Lỗi dữ liệu: '+e.message | gán transfer bằng null
  port.onMessage.addListener(message=>{queue=queue.then(()=>receive(message)).catch(e=>{nativeState='Lỗi dữ liệu: '+e.message;transfer=null;});});
// [VI dòng gốc 37] gọi port.onDisconnect.addListener(()=>{nativeState=chrome.runtime.lastError?.message||'Bộ theo dõi đã ngắt';port=null;transfer=null;}) để đăng ký bộ lắng nghe | gán nativeState bằng chrome.runtime.lastError?.message||'Bộ theo dõi đã ngắt' | gán port bằng null | gán transfer bằng null
  port.onDisconnect.addListener(()=>{nativeState=chrome.runtime.lastError?.message||'Bộ theo dõi đã ngắt';port=null;transfer=null;});
// [VI dòng gốc 38] gọi port.postMessage({type:'watch'})
  port.postMessage({type:'watch'});
// [VI dòng gốc 39] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 40] Định nghĩa hàm bất đồng bộ receive; tham số: m
async function receive(m){
// [VI dòng gốc 41] Kiểm tra m.type==='desktopControls': đúng thì chạy nhánh sau if. | Kiểm tra Array.isArray(m.profiles)&&m.profiles.length<=8: đúng thì chạy nhánh sau if. | gán desktopControls bằng m.profiles | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  if(m.type==='desktopControls'){if(Array.isArray(m.profiles)&&m.profiles.length<=8)desktopControls=m.profiles;return;}
// [VI dòng gốc 42] Kiểm tra m.type==='partyPeers': đúng thì chạy nhánh sau if. | Kiểm tra Array.isArray(m.peers)&&m.peers.length<=32: đúng thì chạy nhánh sau if. | gán partyPeers bằng m.peers | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  if(m.type==='partyPeers'){if(Array.isArray(m.peers)&&m.peers.length<=32)partyPeers=m.peers;return;}
// [VI dòng gốc 43] Kiểm tra m.type==='state': đúng thì chạy nhánh sau if. | gán nativeState bằng m.text | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  if(m.type==='state'){nativeState=m.text;return;}
// [VI dòng gốc 44] Kiểm tra m.type==='begin': đúng thì chạy nhánh sau if.
  if(m.type==='begin'){
// [VI dòng gốc 45] Kiểm tra !Number.isInteger(m.chunks)||m.chunks<1||m.chunks>128||!Number.isInteger(m.bytes)||m.bytes<1||m.bytes>16000000||!/^[a-f0-9]{64}$/.test(m.sha256)||!/^[a-f0-9]{12}$/.test(m.build): đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('Manifest không hợp lệ')
    if(!Number.isInteger(m.chunks)||m.chunks<1||m.chunks>128||!Number.isInteger(m.bytes)||m.bytes<1||m.bytes>16000000||!/^[a-f0-9]{64}$/.test(m.sha256)||!/^[a-f0-9]{12}$/.test(m.build))throw Error('Manifest không hợp lệ');
// [VI dòng gốc 46] gán transfer bằng {...m,parts:[],received:0} | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    transfer={...m,parts:[],received:0};return;
// [VI dòng gốc 47] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 48] Kiểm tra m.type==='chunk': đúng thì chạy nhánh sau if.
  if(m.type==='chunk'){
// [VI dòng gốc 49] Kiểm tra !transfer||m.index!==transfer.parts.length||m.sha256!==transfer.sha256||typeof m.data!=='string'||m.data.length>180000: đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('Thứ tự gói không hợp lệ')
    if(!transfer||m.index!==transfer.parts.length||m.sha256!==transfer.sha256||typeof m.data!=='string'||m.data.length>180000)throw Error('Thứ tự gói không hợp lệ');
// [VI dòng gốc 50] Khai báo biến không gán lại bằng const: part = gọi Uint8Array.from(atob(m.data), c=>c.charCodeAt(0)) | gọi transfer.parts.push(part) để thêm phần tử vào cuối mảng | cập nhật bằng toán tử += transfer.received bằng part.length
    const part=Uint8Array.from(atob(m.data),c=>c.charCodeAt(0));transfer.parts.push(part);transfer.received+=part.length;
// [VI dòng gốc 51] Kiểm tra transfer.received>transfer.bytes: đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('Gói vượt dung lượng') | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(transfer.received>transfer.bytes)throw Error('Gói vượt dung lượng');return;
// [VI dòng gốc 52] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 53] Kiểm tra m.type==='end': đúng thì chạy nhánh sau if.
  if(m.type==='end'){
// [VI dòng gốc 54] Khai báo biến không gán lại bằng const: t = transfer | gán transfer bằng null | Kiểm tra !t||m.sha256!==t.sha256||t.parts.length!==t.chunks||t.received!==t.bytes: đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('FULL nhận thiếu')
    const t=transfer;transfer=null;if(!t||m.sha256!==t.sha256||t.parts.length!==t.chunks||t.received!==t.bytes)throw Error('FULL nhận thiếu');
// [VI dòng gốc 55] Khai báo biến không gán lại bằng const: bytes = tạo đối tượng bằng Uint8Array(t.bytes) | Khai báo biến có thể gán lại bằng let: at = 0 | Duyệt từng giá trị trong t.parts bằng const part. | Khai báo biến không gán lại bằng const: part (chưa gán giá trị)
    const bytes=new Uint8Array(t.bytes);let at=0;for(const part of t.parts){bytes.set(part,at);at+=part.length;}
// [VI dòng gốc 56] Khai báo biến không gán lại bằng const: digest = gọi Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',bytes)),b=>b.toString(16).padStart(2,'0')).join('')
    const digest=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',bytes)),b=>b.toString(16).padStart(2,'0')).join('');
// [VI dòng gốc 57] Kiểm tra digest!==t.sha256: đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('FULL sai hash')
    if(digest!==t.sha256)throw Error('FULL sai hash');
// [VI dòng gốc 58] gán payload bằng {build:t.build,full:new TextDecoder('utf-8',{fatal:true}).decode(bytes)} | gán nativeState bằng 'Đã kiểm thử · FULL '+payload.build | áp dụng toán tử void lên pump()
    payload={build:t.build,full:new TextDecoder('utf-8',{fatal:true}).decode(bytes)};nativeState='Đã kiểm thử · FULL '+payload.build;void pump();
// [VI dòng gốc 59] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 60] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 61] Định nghĩa hàm bất đồng bộ pump; tham số: không có
async function pump(){
// [VI dòng gốc 62] Kiểm tra busy: đúng thì chạy nhánh sau if. | gán pumpAgain bằng true | Kết thúc hàm hiện tại mà không trả giá trị cụ thể. | Kiểm tra !payload: đúng thì chạy nhánh sau if.
  if(busy){pumpAgain=true;return;}if(!payload)return;busy=true;
// [VI dòng gốc 63] Khai báo biến không gán lại bằng const: snapshot = payload
  const snapshot=payload;
// [VI dòng gốc 64] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài.
  try{
// [VI dòng gốc 65] Chú thích gốc của tác giả; không được thực thi. Nội dung: Independent tabs must not wait for a slow or backgrounded game tab.
    // Independent tabs must not wait for a slow or backgrounded game tab.
// [VI dòng gốc 66] chờ tác vụ bất đồng bộ: gọi Promise.allSettled(Array.from(tabs,async([tabId,entry])=>{try{ const tab=await chrome.tabs.get(tabId);if(!core.gameURL(tab.url)){await deta…) | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài.
    await Promise.allSettled(Array.from(tabs,async([tabId,entry])=>{try{
// [VI dòng gốc 67] Khai báo biến không gán lại bằng const: tab = chờ tác vụ bất đồng bộ: gọi chrome.tabs.get(tabId) | Kiểm tra !core.gameURL(tab.url): đúng thì chạy nhánh sau if. | chờ tác vụ bất đồng bộ: gọi detach(tabId) | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      const tab=await chrome.tabs.get(tabId);if(!core.gameURL(tab.url)){await detach(tabId);return;}
// [VI dòng gốc 68] gán entry.adapter.url bằng tab.url | Khai báo biến không gán lại bằng const: result = chờ tác vụ bất đồng bộ: gọi entry.bridge.sync(snapshot, partyPeers, desktopControls)
      entry.adapter.url=tab.url;const result=await entry.bridge.sync(snapshot,partyPeers,desktopControls);
// [VI dòng gốc 69] Duyệt từng giá trị trong result?.diagnostics??[] bằng const report. | Khai báo biến không gán lại bằng const: report (chưa gán giá trị)
      for(const report of result?.diagnostics??[]){
// [VI dòng gốc 70] Khai báo biến không gán lại bằng const: key = gọi String(report.actor) để chuyển sang chuỗi; stamp = tính biểu thức report.build+'/'+report.at | Kiểm tra diagnosticsSent.get(key)===stamp: đúng thì chạy nhánh sau if. | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
        const key=String(report.actor),stamp=report.build+'/'+report.at;if(diagnosticsSent.get(key)===stamp)continue;
// [VI dòng gốc 71] Kiểm tra port: đúng thì chạy nhánh sau if. | gọi port.postMessage({type:'diagnostics',report}) | gọi diagnosticsSent.set(key, stamp)
        if(port){port.postMessage({type:'diagnostics',report});diagnosticsSent.set(key,stamp);}
// [VI dòng gốc 72] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
      }
// [VI dòng gốc 73] Nhận lỗi bằng e và chạy phần xử lý lỗi. | gán entry.reason bằng String(e.message||e).slice(0,300)
    }catch(e){entry.reason=String(e.message||e).slice(0,300);}}));
// [VI dòng gốc 74] gán busy bằng false | Kiểm tra pumpAgain||payload!==snapshot: đúng thì chạy nhánh sau if. | gán pumpAgain bằng false | áp dụng toán tử void lên pump()
  }finally{busy=false;if(pumpAgain||payload!==snapshot){pumpAgain=false;void pump();}}
// [VI dòng gốc 75] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 76] Định nghĩa hàm bất đồng bộ detach; tham số: tabId | gọi tabs.delete(tabId) | chờ tác vụ bất đồng bộ: gọi chrome.debugger.detach({tabId}).catch(()=>{}) | Kiểm tra !tabs.size&&port: đúng thì chạy nhánh sau if.
async function detach(tabId){tabs.get(tabId)?.input?.setEnabled(false);tabs.delete(tabId);await chrome.debugger.detach({tabId}).catch(()=>{});if(!tabs.size&&port){port.disconnect();port=null;nativeState='Đã ngắt đồng bộ';}}
// [VI dòng gốc 77] Định nghĩa hàm bất đồng bộ attachAll; tham số: không có
async function attachAll(){
// [VI dòng gốc 78] Khai báo biến không gán lại bằng const: candidates = gọi (await chrome.tabs.query({})).filter(tab=>core.gameURL(tab.url)).slice(0, 32) để lấy một đoạn dữ liệu
  const candidates=(await chrome.tabs.query({})).filter(tab=>core.gameURL(tab.url)).slice(0,32);
// [VI dòng gốc 79] Khai báo biến không gán lại bằng const: results = chờ tác vụ bất đồng bộ: gọi Promise.allSettled(candidates.map(tab=>attach(tab.id)))
  const results=await Promise.allSettled(candidates.map(tab=>attach(tab.id)));
// [VI dòng gốc 80] Khai báo biến không gán lại bằng const: attached = đọc results.filter(r=>r.status==='fulfilled').length; failed = tính biểu thức results.length-attached
  const attached=results.filter(r=>r.status==='fulfilled').length,failed=results.length-attached;
// [VI dòng gốc 81] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm các thuộc tính của report(null), reason.
  return {...report(null),reason:candidates.length?'Đã gắn '+attached+'/'+candidates.length+' tab game'+(failed?' · '+failed+' tab chưa gắn được':'')+'; chờ app nhận diện acc.':'Không tìm thấy tab Kiếm Vũ Phong Vân đang mở.'};
// [VI dòng gốc 82] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 83] gọi chrome.debugger.onEvent.addListener((source,method,params)=>{const entry=tabs.get(source.tabId);if(!entry)return; if(method==='Target.attachedToTarget'&&par…) để đăng ký bộ lắng nghe | Khai báo biến không gán lại bằng const: entry = gọi tabs.get(source.tabId) | Kiểm tra !entry: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
chrome.debugger.onEvent.addListener((source,method,params)=>{const entry=tabs.get(source.tabId);if(!entry)return;
// [VI dòng gốc 84] Kiểm tra method==='Target.attachedToTarget'&&params.targetInfo?.type==='iframe': đúng thì chạy nhánh sau if.
  if(method==='Target.attachedToTarget'&&params.targetInfo?.type==='iframe'){
// [VI dòng gốc 85] Khai báo biến không gán lại bằng const: adapter = đọc entry.adapter; parent = nếu source.sessionId thì lấy Array.from(adapter.children.values()).find(c=>c.sessionId===source.sessionId)?.info.targetId, ngược lại lấy adapter.targetId
    const adapter=entry.adapter,parent=source.sessionId?Array.from(adapter.children.values()).find(c=>c.sessionId===source.sessionId)?.info.targetId:adapter.targetId;
// [VI dòng gốc 86] gọi adapter.children.set(params.targetInfo.targetId, {sessionId:params.sessionId,info:{...params.targetInfo,parentId:parent}})
    adapter.children.set(params.targetInfo.targetId,{sessionId:params.sessionId,info:{...params.targetInfo,parentId:parent}});
// [VI dòng gốc 87] gọi chrome.debugger.sendCommand({tabId:source.tabId,sessionId:params.sessionId},'Target.setAutoAttach',{autoAttach:true,waitForDebuggerOnStart:false,flatten:true}).catch(()=>{})
    chrome.debugger.sendCommand({tabId:source.tabId,sessionId:params.sessionId},'Target.setAutoAttach',{autoAttach:true,waitForDebuggerOnStart:false,flatten:true}).catch(()=>{});
// [VI dòng gốc 88] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 89] Kiểm tra method==='Target.detachedFromTarget': đúng thì chạy nhánh sau if. | Duyệt từng giá trị trong entry.adapter.children bằng const [id,c]. | Khai báo biến không gán lại bằng const: [id,c] (chưa gán giá trị) | Kiểm tra c.sessionId===params.sessionId: đúng thì chạy nhánh sau if.
  if(method==='Target.detachedFromTarget')for(const [id,c]of entry.adapter.children)if(c.sessionId===params.sessionId)entry.adapter.children.delete(id);
// [VI dòng gốc 90] gọi entry.adapter.emit({method,params,sessionId:source.sessionId||'root'})
  entry.adapter.emit({method,params,sessionId:source.sessionId||'root'});
// [VI dòng gốc 91] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 92] gọi chrome.debugger.onDetach.addListener(source=>{tabs.get(source.tabId)?.input?.setEnabled(false);tabs.delete(source.tabId);if(!tabs.size&&port){port.disconnect();port=null;}}) để đăng ký bộ lắng nghe | gọi tabs.delete(source.tabId) | Kiểm tra !tabs.size&&port: đúng thì chạy nhánh sau if. | gọi port.disconnect()
chrome.debugger.onDetach.addListener(source=>{tabs.delete(source.tabId);if(!tabs.size&&port){port.disconnect();port=null;}});
// [VI dòng gốc 93] gọi chrome.runtime.onMessage.addListener((m,sender,reply)=>{ if(sender.id!==chrome.runtime.id||sender.tab||!sender.url?.startsWith(chrome.runtime.getURL('')))ret…) để đăng ký bộ lắng nghe
chrome.runtime.onMessage.addListener((m,sender,reply)=>{
// [VI dòng gốc 94] Kiểm tra sender.id!==chrome.runtime.id||sender.tab||!sender.url?.startsWith(chrome.runtime.getURL('')): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: false.
  if(sender.id!==chrome.runtime.id||sender.tab||!sender.url?.startsWith(chrome.runtime.getURL('')))return false;
// [VI dòng gốc 95] gọi (async()=>{ if(m.type==='attachAll')return await attachAll(); if(!Number.isInteger(m.tabId))throw Error('Tab không hợp lệ'); if(m.type==='attach')return await attach(m.tabId); if(m…(result=>reply({ok:true,result}), e=>reply({ok:false,error:String(e.message||e)}))
  (async()=>{
// [VI dòng gốc 96] Kiểm tra m.type==='attachAll': đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: chờ tác vụ bất đồng bộ: gọi attachAll().
    if(m.type==='attachAll')return await attachAll();
// [VI dòng gốc 97] Kiểm tra !Number.isInteger(m.tabId): đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('Tab không hợp lệ')
    if(!Number.isInteger(m.tabId))throw Error('Tab không hợp lệ');
// [VI dòng gốc 98] Kiểm tra m.type==='attach': đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: chờ tác vụ bất đồng bộ: gọi attach(m.tabId).
    if(m.type==='attach')return await attach(m.tabId);
// [VI dòng gốc 99] Kiểm tra m.type==='detach': đúng thì chạy nhánh sau if. | chờ tác vụ bất đồng bộ: gọi detach(m.tabId) | Kết thúc hàm hiện tại và trả về: gọi report(null).
    if(m.type==='detach'){await detach(m.tabId);return report(null);}
// [VI dòng gốc 100] Kiểm tra m.type==='status': đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: gọi report(tabs.get(m.tabId)).
    if(m.type==='inputOn'||m.type==='inputOff'){const entry=tabs.get(m.tabId);if(!entry?.input)throw Error('Bật đồng bộ tab này trước.');entry.input.setEnabled(m.type==='inputOn');return report(entry);}
    if(m.type==='status')return report(tabs.get(m.tabId));
// [VI dòng gốc 101] Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('Yêu cầu không hợp lệ')
    throw Error('Yêu cầu không hợp lệ');
// [VI dòng gốc 102] Kết thúc hàm hiện tại và trả về: true.
  })().then(result=>reply({ok:true,result}),e=>reply({ok:false,error:String(e.message||e)}));return true;
// [VI dòng gốc 103] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 104] gọi setInterval(pump, 500) để đăng ký tác vụ lặp theo khoảng thời gian
setInterval(pump,500);
// [VI dòng gốc 105] Dòng trống để tách các phần, không có lệnh thực thi.

setInterval(()=>{for(const entry of tabs.values())if(entry.input?.status().enabled)void entry.input.tick();},1000);
