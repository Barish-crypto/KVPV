// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: Chạy nền cục bộ. Đổi src/ -> build -> nạp FULL vào từng game-frame; không reload trang. [đóng chú thích]
/* Chạy nền cục bộ. Đổi src/ -> build -> nạp FULL vào từng game-frame; không reload trang. */
// [VI dòng gốc 2] "use strict"
'use strict';
// [VI dòng gốc 3] Khai báo biến không gán lại bằng const: fs = gọi require('node:fs') để nạp module Node.js; path = gọi require('node:path') để nạp module Node.js
const fs=require('node:fs'),path=require('node:path');
// [VI dòng gốc 4] Khai báo biến không gán lại bằng const: {spawn,execFile} = gọi require('node:child_process') để nạp module Node.js
const {spawn,execFile}=require('node:child_process');
// [VI dòng gốc 5] Khai báo biến không gán lại bằng const: {readPartyPeers} = gọi require('./party-relay.cjs') để nạp module Node.js
const {readPartyPeers}=require('./party-relay.cjs');
// [VI dòng gốc 6] Định nghĩa hàm readDesktopControls; tham số: root | Khai báo biến không gán lại bằng const: file = gọi require.resolve('./desktop-controls.cjs') | xóa thuộc tính require.cache[file] | Kết thúc hàm hiện tại và trả về: gọi require(file).readDesktopControls(root).
function readDesktopControls(root){const file=require.resolve('./desktop-controls.cjs');delete require.cache[file];return require(file).readDesktopControls(root);}
// [VI dòng gốc 7] Khai báo biến không gán lại bằng const: {saveDiagnostics} = gọi require('./diagnostics.cjs') để nạp module Node.js
const {saveDiagnostics}=require('./diagnostics.cjs');
// [VI dòng gốc 8] Khai báo biến không gán lại bằng const: {CDP,GameBridge} = gọi require('./core.cjs') để nạp module Node.js
const {CDP,GameBridge}=require('./core.cjs');
// [VI dòng gốc 9] Khai báo biến không gán lại bằng const: {readArtifact,watchSources} = gọi require('./project.cjs') để nạp module Node.js
const {readArtifact,watchSources}=require('./project.cjs');
// [VI dòng gốc 10] Khai báo biến không gán lại bằng const: root = gọi path.resolve(__dirname, '..'); stateDir = gọi path.join(root, '.kvpv-live'); profile = gọi path.join(stateDir, process.env.KVPV_BROWSER==='chrome'?'browser-profile-chrome':'browser-profile-edge')
const root=path.resolve(__dirname,'..'),stateDir=path.join(root,'.kvpv-live'),profile=path.join(stateDir,process.env.KVPV_BROWSER==='chrome'?'browser-profile-chrome':'browser-profile-edge');
// [VI dòng gốc 11] gọi fs.mkdirSync(stateDir, {recursive:true}) để tạo thư mục
fs.mkdirSync(stateDir,{recursive:true});
// [VI dòng gốc 12] Khai báo biến không gán lại bằng const: pidFile = gọi path.join(stateDir, 'watcher.pid')
const pidFile=path.join(stateDir,'watcher.pid');
// [VI dòng gốc 13] Khai báo biến không gán lại bằng const: diagnosticsSent = tạo đối tượng bằng Map()
const diagnosticsSent=new Map();
// [VI dòng gốc 14] Khai báo biến không gán lại bằng const: log = tạo hàm với tham số message; mỗi lần gọi trả về gọi console.log(new Date().toISOString()+' '+message)
const log=message=>console.log(new Date().toISOString()+' '+message);
// [VI dòng gốc 15] Khai báo biến có thể gán lại bằng let: cdp = null; bridge = null; connecting = false; pumping = false; building = false; queued = false; debounce = null; payload = null; lastBuildError = ""; stopping = false
let cdp=null,bridge=null,connecting=false,pumping=false,building=false,queued=false,debounce=null,payload=null,lastBuildError='',stopping=false;
// [VI dòng gốc 16] Định nghĩa hàm build; tham số: không có | Kiểm tra stopping: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể. | Kiểm tra building: đúng thì chạy nhánh sau if.
function build(){if(stopping)return;if(building){queued=true;return;}building=true;
// [VI dòng gốc 17] gọi execFile(process.execPath, [path.join(root,'live/verify.cjs')], {cwd:root,windowsHide:true,maxBuffer:1024*1024}, (error,stdout,st…)
  execFile(process.execPath,[path.join(root,'live/verify.cjs')],{cwd:root,windowsHide:true,maxBuffer:1024*1024},(error,stdout,stderr)=>{
// [VI dòng gốc 18] gán building bằng false | Kiểm tra error: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | Khai báo biến không gán lại bằng const: detail = gọi String(stderr||error.message).slice(-1600) để lấy một đoạn dữ liệu | Kiểm tra detail!==lastBuildError: đúng thì chạy nhánh sau if.
    building=false;if(error){const detail=String(stderr||error.message).slice(-1600);if(detail!==lastBuildError){lastBuildError=detail;log('BUILD ERROR (old game kept running): '+detail);}}
// [VI dòng gốc 19] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | gán payload bằng readArtifact(root) | gán lastBuildError bằng '' | gọi log('VERIFIED / BUILD READY '+payload.build)
    else{try{payload=readArtifact(root);lastBuildError='';log('VERIFIED / BUILD READY '+payload.build);queueMicrotask(pump);}catch(e){lastBuildError=e.message;log('BUILD INVALID: '+e.message);}}
// [VI dòng gốc 20] Kiểm tra queued: đúng thì chạy nhánh sau if. | gán queued bằng false | gọi build()
    if(queued){queued=false;build();}
// [VI dòng gốc 21] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  });}
// [VI dòng gốc 22] Định nghĩa hàm scheduleBuild; tham số: không có | gọi clearTimeout(debounce) để hủy lịch thực hiện một lần | gán debounce bằng setTimeout(()=>{debounce=null;build();},150) | gán debounce bằng null
function scheduleBuild(){clearTimeout(debounce);debounce=setTimeout(()=>{debounce=null;build();},150);}
// [VI dòng gốc 23] Định nghĩa hàm bất đồng bộ localEndpoint; tham số: không có | Khai báo biến không gán lại bằng const: [port,wsPath] = gọi fs.readFileSync(path.join(profile,'DevToolsActivePort'),'utf8').trim().split(/\r?\n/)
async function localEndpoint(){const [port,wsPath]=fs.readFileSync(path.join(profile,'DevToolsActivePort'),'utf8').trim().split(/\r?\n/);
// [VI dòng gốc 24] Kiểm tra !/^\d+$/.test(port)||!wsPath.startsWith('/devtools/browser/'): đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('No local debugger')
  if(!/^\d+$/.test(port)||!wsPath.startsWith('/devtools/browser/'))throw Error('No local debugger');
// [VI dòng gốc 25] Khai báo biến không gán lại bằng const: response = chờ tác vụ bất đồng bộ: gọi fetch('http://127.0.0.1:'+port+'/json/version', {signal:AbortSignal.timeout(1500)}) để gửi yêu cầu mạng theo URL và tùy chọn | Kiểm tra !response.ok: đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('Browser unavailable')
  const response=await fetch('http://127.0.0.1:'+port+'/json/version',{signal:AbortSignal.timeout(1500)});if(!response.ok)throw Error('Browser unavailable');
// [VI dòng gốc 26] Kết thúc hàm hiện tại và trả về: tính biểu thức 'ws://127.0.0.1:'+port+wsPath.
  return 'ws://127.0.0.1:'+port+wsPath;
// [VI dòng gốc 27] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 28] Định nghĩa hàm launchBrowser; tham số: không có
function launchBrowser(){
// [VI dòng gốc 29] Khai báo biến không gán lại bằng const: candidates = nếu process.env.KVPV_BROWSER!=='chrome' thì lấy [ 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe','C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe' ], ngược lại lấy ['C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe','C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',path.join(process.env.LOCALAPPDATA||'','Google/Chro…
  const candidates=process.env.KVPV_BROWSER!=='chrome'?[
// [VI dòng gốc 30] Tiếp tục hàm launchBrowser; thành phần cú pháp bắt đầu bằng string. Đọc cùng dòng mở phía trên: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe','C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe'
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe','C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe'
// [VI dòng gốc 31] gọi path.join(process.env.LOCALAPPDATA||'', 'Google/Chrome/Application/chrome.exe')
  ]:['C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe','C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',path.join(process.env.LOCALAPPDATA||'','Google/Chrome/Application/chrome.exe'),'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'];
// [VI dòng gốc 32] Khai báo biến không gán lại bằng const: exe = gọi candidates.find(p=>fs.existsSync(p)) để tìm phần tử đầu tiên thỏa điều kiện | Kiểm tra !exe: đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('Không tìm thấy Chrome/Edge.')
  const exe=candidates.find(p=>fs.existsSync(p));if(!exe)throw Error('Không tìm thấy Chrome/Edge.');
// [VI dòng gốc 33] gọi fs.mkdirSync(profile, {recursive:true}) để tạo thư mục
  fs.mkdirSync(profile,{recursive:true});
// [VI dòng gốc 34] Khai báo biến không gán lại bằng const: child = gọi spawn(exe, ['--user-data-dir='+profile,'--remote-debugging-address=127.0.0.1','--remote-debugging-port=0','--no-first-run','--…)
  const child=spawn(exe,['--user-data-dir='+profile,'--remote-debugging-address=127.0.0.1','--remote-debugging-port=0','--no-first-run','--no-default-browser-check','--new-window','https://play.choingay.vn/1046'],{detached:true,stdio:'ignore',windowsHide:false});
// [VI dòng gốc 35] gọi child.on('error', e=>log('BROWSER ERROR: '+e.message)) | gọi child.unref() | gọi log('Opened dedicated game browser. Login once; main and clone can use separate tabs.')
  child.on('error',e=>log('BROWSER ERROR: '+e.message));child.unref();log('Opened dedicated game browser. Login once; main and clone can use separate tabs.');
// [VI dòng gốc 36] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 37] Định nghĩa hàm bất đồng bộ connect; tham số: không có | Kiểm tra cdp||connecting||stopping: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể. | gán connecting bằng true
async function connect(){if(cdp||connecting||stopping)return;connecting=true;try{cdp=await CDP.connect(await localEndpoint());bridge=new GameBridge(cdp,log);
// [VI dòng gốc 38] gọi cdp.on('closed', ()=>{cdp=null;bridge=null;log('Browser disconnected; waiting for dedicated browser.');}) | gán cdp bằng null | gán bridge bằng null | gọi log('Browser disconnected; waiting for dedicated browser.')
    cdp.on('closed',()=>{cdp=null;bridge=null;log('Browser disconnected; waiting for dedicated browser.');});log('Connected to local browser');
// [VI dòng gốc 39] Nhận lỗi bằng _ và chạy phần xử lý lỗi. | gán cdp bằng null | gán bridge bằng null | gán connecting bằng false
  }catch(_){cdp=null;bridge=null;}finally{connecting=false;}}
// [VI dòng gốc 40] Định nghĩa hàm bất đồng bộ pump; tham số: không có | Kiểm tra pumping||stopping: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể. | gán pumping bằng true
async function pump(){if(pumping||stopping)return;pumping=true;try{
// [VI dòng gốc 41] chờ tác vụ bất đồng bộ: gọi connect() | Kiểm tra !bridge||building||queued||debounce!==null||lastBuildError: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    await connect();if(!bridge||building||queued||debounce!==null||lastBuildError)return;
// [VI dòng gốc 42] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | Khai báo biến không gán lại bằng const: latest = gọi readArtifact(root) | Kiểm tra !payload||latest.build!==payload.build: đúng thì chạy nhánh sau if. | gán payload bằng latest
    try{const latest=readArtifact(root);if(!payload||latest.build!==payload.build){payload=latest;log('FULL CHANGED '+latest.build);}}catch(_){return;}
// [VI dòng gốc 43] Kiểm tra payload: đúng thì chạy nhánh sau if. | Khai báo biến không gán lại bằng const: result = chờ tác vụ bất đồng bộ: gọi bridge.sync(payload, readPartyPeers(root), readDesktopControls(root)) | Duyệt từng giá trị trong result?.diagnostics??[] bằng const report. | Khai báo biến không gán lại bằng const: report (chưa gán giá trị)
    if(payload){const result=await bridge.sync(payload,readPartyPeers(root),readDesktopControls(root));for(const report of result?.diagnostics??[]){const stamp=report.build+'/'+report.at;if(diagnosticsSent.get(report.actor)!==stamp&&saveDiagnostics(root,report))diagnosticsSent.set(report.actor,stamp);}}
// [VI dòng gốc 44] Nhận lỗi bằng e và chạy phần xử lý lỗi. | gọi log('SYNC: '+String(e.message||e).slice(0,250)) | gán pumping bằng false
  }catch(e){log('SYNC: '+String(e.message||e).slice(0,250));}finally{pumping=false;}}
// [VI dòng gốc 45] Định nghĩa hàm stop; tham số: không có. Mục đích: dừng bộ điều khiển và dọn tài nguyên | Kiểm tra stopping: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể. | gán stopping bằng true
function stop(){if(stopping)return;stopping=true;clearInterval(interval);clearTimeout(debounce);for(const w of watchers)w.close();cdp?.close();
// [VI dòng gốc 46] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | Kiểm tra fs.readFileSync(pidFile,'utf8').trim()===String(process.pid): đúng thì chạy nhánh sau if. | gọi fs.unlinkSync(pidFile) để xóa một tệp | Nhận lỗi bằng _ và chạy phần xử lý lỗi.
  try{if(fs.readFileSync(pidFile,'utf8').trim()===String(process.pid))fs.unlinkSync(pidFile);}catch(_){}log('Stopped watcher; game/browser stay open.');}
// [VI dòng gốc 47] Khai báo biến không gán lại bằng const: watchers = gọi watchSources(root, scheduleBuild)
const watchers=watchSources(root,scheduleBuild);
// [VI dòng gốc 48] Khai báo biến không gán lại bằng const: interval = gọi setInterval(pump, 500) để đăng ký tác vụ lặp theo khoảng thời gian | gọi process.on('SIGINT', ()=>{stop();process.exit(0);}) | gọi stop() để dừng bộ điều khiển và dọn tài nguyên | gọi process.exit(0)
const interval=setInterval(pump,500);process.on('SIGINT',()=>{stop();process.exit(0);});process.on('SIGTERM',()=>{stop();process.exit(0);});
// [VI dòng gốc 49] gọi fs.writeFileSync(pidFile, String(process.pid)) để ghi tệp đồng bộ
fs.writeFileSync(pidFile,String(process.pid));
// [VI dòng gốc 50] gọi (async()=>{try{await localEndpoint();}catch(_){launchBrowser();}build();await pump();})().catch(e=>{log('START ERROR: '+e.message);stop();process.exitCode=1;}) | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | chờ tác vụ bất đồng bộ: gọi localEndpoint() | Nhận lỗi bằng _ và chạy phần xử lý lỗi.
(async()=>{try{await localEndpoint();}catch(_){launchBrowser();}build();await pump();})().catch(e=>{log('START ERROR: '+e.message);stop();process.exitCode=1;});
// [VI dòng gốc 51] Dòng trống để tách các phần, không có lệnh thực thi.
