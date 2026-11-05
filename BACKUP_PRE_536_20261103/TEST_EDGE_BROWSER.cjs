// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: Edge thật + extension thật + game giả cục bộ; không đụng phiên đăng nhập hiện có. [đóng chú thích]
/* Edge thật + extension thật + game giả cục bộ; không đụng phiên đăng nhập hiện có. */
// [VI dòng gốc 2] "use strict"
'use strict';
// [VI dòng gốc 3] Khai báo biến không gán lại bằng const: fs = gọi require('node:fs') để nạp module Node.js; path = gọi require('node:path') để nạp module Node.js; http = gọi require('node:http') để nạp module Node.js; assert = gọi require('node:assert/strict') để nạp module Node.js; {spawn} = gọi require('node:child_process') để nạp module Node.js
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict'),{spawn}=require('node:child_process');
// [VI dòng gốc 4] Khai báo biến không gán lại bằng const: {CDP} = gọi require('./live/core.cjs') để nạp module Node.js | Khai báo biến không gán lại bằng const: sleep = tạo hàm với tham số ms; mỗi lần gọi trả về tạo đối tượng bằng Promise(r=>setTimeout(r,ms))
const {CDP}=require('./live/core.cjs');const sleep=ms=>new Promise(r=>setTimeout(r,ms));
// [VI dòng gốc 5] gọi (async()=>{ const base=path.join(__dirname,'.kvpv-live','edge-addon-test-'+Date.now()),addon=path.join(base,'addon'),profile=path.join(base,'profile');fs.mkdirSync(addon,{recursive…(e=>{console.error(e);process.exitCode=1;})
(async()=>{
// [VI dòng gốc 6] Khai báo biến không gán lại bằng const: base = gọi path.join(__dirname, '.kvpv-live', 'edge-addon-test-'+Date.now()); addon = gọi path.join(base, 'addon'); profile = gọi path.join(base, 'profile') | gọi fs.mkdirSync(addon, {recursive:true}) để tạo thư mục
 const base=path.join(__dirname,'.kvpv-live','edge-addon-test-'+Date.now()),addon=path.join(base,'addon'),profile=path.join(base,'profile');fs.mkdirSync(addon,{recursive:true});
// [VI dòng gốc 7] Duyệt từng giá trị trong ['manifest.json','core.js','background.js','popup.html','popup.css','popup.js'] bằng const file. | Khai báo biến không gán lại bằng const: file (chưa gán giá trị) | gọi fs.copyFileSync(path.join(__dirname,'edge-addon',file), path.join(addon,file))
 for(const file of ['manifest.json','core.js','background.js','popup.html','popup.css','popup.js'])fs.copyFileSync(path.join(__dirname,'edge-addon',file),path.join(addon,file));
// [VI dòng gốc 8] Khai báo biến không gán lại bằng const: manifest = gọi JSON.parse(fs.readFileSync(path.join(addon,'manifest.json'),'utf8')) để phân tích dữ liệu đầu vào theo API đang gọi | gán manifest.host_permissions bằng ['http://play.choingay.vn[mở chú thích]'] | gọi fs.writeFileSync(path.join(addon,'manifest.json'), JSON.stringify(manifest)) để ghi tệp đồng bộ
 const manifest=JSON.parse(fs.readFileSync(path.join(addon,'manifest.json'),'utf8'));manifest.host_permissions=['http://play.choingay.vn/*'];fs.writeFileSync(path.join(addon,'manifest.json'),JSON.stringify(manifest));
// [VI dòng gốc 9] Khai báo biến có thể gán lại bằng let: port = 0; cdp = null; child = null
 let port=0,cdp=null,child=null;
// [VI dòng gốc 10] Nội dung nguyên văn của chuỗi mẫu; đây là dữ liệu trong chuỗi, không phải lệnh đang chạy.
 const server=http.createServer((req,res)=>{res.setHeader('content-type','text/html');res.end(req.url==='/frame'?`<script>window._Ba={_rJ:{_O$:{ins:{actorId:'123456'}}}};window._ft={};window._Sa={};window._d={_Yct:{_Eet:1,_Het:2,_zet:3}};window._C={_Ba:{instance:{getRole:()=>({getComponent:()=>({})})}}};window.startedAt=Date.now();</script>`:`<iframe src="http://frame.kvpv.test:${port}/frame"></iframe>`);});
// [VI dòng gốc 11] chờ tác vụ bất đồng bộ: tạo đối tượng bằng Promise(r=>server.listen(0,'127.0.0.1',r)) | gán port bằng server.address().port
 await new Promise(r=>server.listen(0,'127.0.0.1',r));port=server.address().port;
// [VI dòng gốc 12] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài.
 try{
// [VI dòng gốc 13] gán child bằng spawn('C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',['--headless=new','--no-proxy-server','--site-per-process','--disable-features=HttpsUpgrades,HTTPSFirstMod…
  child=spawn('C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',['--headless=new','--no-proxy-server','--site-per-process','--disable-features=HttpsUpgrades,HTTPSFirstModeV2',
// [VI dòng gốc 14] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng string. Đọc cùng dòng mở phía trên: '--host-resolver-rules=MAP play.choingay.vn 127.0.0.1, MAP frame.kvpv.test 127.0.0.1','--remote-debugging-port=0','--user-data-dir='+profile,
   '--host-resolver-rules=MAP play.choingay.vn 127.0.0.1, MAP frame.kvpv.test 127.0.0.1','--remote-debugging-port=0','--user-data-dir='+profile,
// [VI dòng gốc 15] Thuộc tính stdio: "ignore" | Thuộc tính windowsHide: true
   '--load-extension='+addon,'--disable-extensions-except='+addon,'--no-first-run','--no-default-browser-check','about:blank'],{stdio:'ignore',windowsHide:true});
// [VI dòng gốc 16] Khai báo biến có thể gán lại bằng let: active (chưa gán giá trị) | Lặp for: khởi tạo let n=0; tiếp tục khi n<100; sau mỗi vòng n++. | Khai báo biến có thể gán lại bằng let: n = 0 | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài.
  let active;for(let n=0;n<100;n++){try{active=fs.readFileSync(path.join(profile,'DevToolsActivePort'),'utf8').trim().split(/\r?\n/);break;}catch(_){await sleep(100);}}
// [VI dòng gốc 17] gọi assert(active, 'Edge debugger started') để kiểm tra điều kiện của bài test | gán cdp bằng await CDP.connect('ws://127.0.0.1:'+active[0]+active[1])
  assert(active,'Edge debugger started');cdp=await CDP.connect('ws://127.0.0.1:'+active[0]+active[1]);
// [VI dòng gốc 18] Khai báo biến không gán lại bằng const: {targetId} = chờ tác vụ bất đồng bộ: gọi cdp.send('Target.createTarget', {url:'http://play.choingay.vn:'+port+'/1046'})
  const {targetId}=await cdp.send('Target.createTarget',{url:'http://play.choingay.vn:'+port+'/1046'});
// [VI dòng gốc 19] Khai báo biến có thể gán lại bằng let: worker (chưa gán giá trị) | Lặp for: khởi tạo let n=0; tiếp tục khi n<80; sau mỗi vòng n++. | Khai báo biến có thể gán lại bằng let: n = 0 | gán worker bằng (await cdp.send('Target.getTargets')).targetInfos.find(t=>t.type==='service_worker'&&t.url.endsWith('/background.js'))
  let worker;for(let n=0;n<80;n++){worker=(await cdp.send('Target.getTargets')).targetInfos.find(t=>t.type==='service_worker'&&t.url.endsWith('/background.js'));if(worker)break;await sleep(100);}
// [VI dòng gốc 20] gọi assert(worker, 'Edge extension loaded') để kiểm tra điều kiện của bài test | Khai báo biến không gán lại bằng const: {sessionId} = chờ tác vụ bất đồng bộ: gọi cdp.send('Target.attachToTarget', {targetId:worker.targetId,flatten:true})
  assert(worker,'Edge extension loaded');const {sessionId}=await cdp.send('Target.attachToTarget',{targetId:worker.targetId,flatten:true});
// [VI dòng gốc 21] chờ tác vụ bất đồng bộ: gọi cdp.send('Runtime.runIfWaitingForDebugger', {}, sessionId) | chờ tác vụ bất đồng bộ: gọi cdp.send('Runtime.enable', {}, sessionId) | gọi console.log('worker runtime enabled')
  await cdp.send('Runtime.runIfWaitingForDebugger',{},sessionId);await cdp.send('Runtime.enable',{},sessionId);console.log('worker runtime enabled');
// [VI dòng gốc 22] Khai báo biến không gán lại bằng const: evaluate = tạo hàm bất đồng bộ với tham số expression | Khai báo biến không gán lại bằng const: r = chờ tác vụ bất đồng bộ: gọi cdp.send('Runtime.evaluate', {expression,returnByValue:true,awaitPromise:true}, sessionId) | Kiểm tra r.exceptionDetails: đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error(r.exceptionDetails.exception?.description||r.exceptionDetails.text)
  const evaluate=async expression=>{const r=await cdp.send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true},sessionId);if(r.exceptionDetails)throw Error(r.exceptionDetails.exception?.description||r.exceptionDetails.text);return r.result?.value;};
// [VI dòng gốc 23] gọi console.log('worker ready', worker.url) | Lặp for: khởi tạo let n=0; tiếp tục khi n<50; sau mỗi vòng n++. | Khai báo biến có thể gán lại bằng let: n = 0 | Kiểm tra await evaluate('typeof chrome !== \'undefined\' && !!chrome.debugger'): đúng thì chạy nhánh sau if.
  console.log('worker ready',worker.url);for(let n=0;n<50;n++){if(await evaluate('typeof chrome !== \'undefined\' && !!chrome.debugger'))break;await sleep(100);}
// [VI dòng gốc 24] gọi console.log('env', await evaluate('({href:location.href,chrome:typeof chrome,browser:typeof browser})')) | Khai báo biến không gán lại bằng const: tabId = chờ tác vụ bất đồng bộ: gọi evaluate('(async()=>{const t=await chrome.debugger.getTargets();return t.find(t=>t.id==='+JSON.stringify(targetId)+').tabId;})()')
  console.log('env',await evaluate('({href:location.href,chrome:typeof chrome,browser:typeof browser})'));const tabId=await evaluate('(async()=>{const t=await chrome.debugger.getTargets();return t.find(t=>t.id==='+JSON.stringify(targetId)+').tabId;})()');
// [VI dòng gốc 25] gọi console.log('tab', tabId)
  console.log('tab',tabId);
// [VI dòng gốc 26] Chú thích gốc của tác giả; không được thực thi. Nội dung: Giả lập nguồn file đã xác minh; kiểm tra riêng Native Messaging bằng TEST_EDGE_NATIVE.
  // Giả lập nguồn file đã xác minh; kiểm tra riêng Native Messaging bằng TEST_EDGE_NATIVE.
// [VI dòng gốc 27] chờ tác vụ bất đồng bộ: gọi evaluate('payload={build:"edge-test-v1",full:\'window.KVPV_V1={};window.__KVPV_OWN_ACTOR_ID="123456";window.installs=(window.inst…)
  await evaluate('payload={build:"edge-test-v1",full:\'window.KVPV_V1={};window.__KVPV_OWN_ACTOR_ID="123456";window.installs=(window.installs||0)+1;\'};attach('+tabId+')');
// [VI dòng gốc 28] gọi console.log('attached') | Khai báo biến có thể gán lại bằng let: state (chưa gán giá trị)
  console.log('attached');let state;
// [VI dòng gốc 29] Lặp for: khởi tạo let n=0; tiếp tục khi n<60; sau mỗi vòng n++. | Khai báo biến có thể gán lại bằng let: n = 0 | chờ tác vụ bất đồng bộ: gọi evaluate('pump()') | gán state bằng await evaluate('tabs.get('+tabId+').history')
  for(let n=0;n<60;n++){await evaluate('pump()');state=await evaluate('tabs.get('+tabId+').history');if(state?.some(x=>x.startsWith('LOADED')))break;await sleep(100);}
// [VI dòng gốc 30] gọi assert(state?.some(x=>x.startsWith('LOADED')), JSON.stringify(await evaluate('report(tabs.get('+tabId+'))'))) để kiểm tra điều kiện của bài test
  assert(state?.some(x=>x.startsWith('LOADED')),JSON.stringify(await evaluate('report(tabs.get('+tabId+'))')));
// [VI dòng gốc 31] chờ tác vụ bất đồng bộ: gọi evaluate('payload={...payload,build:"edge-test-v2"};pump()')
  await evaluate('payload={...payload,build:"edge-test-v2"};pump()');
// [VI dòng gốc 32] Khai báo biến không gán lại bằng const: result = chờ tác vụ bất đồng bộ: gọi evaluate('(async()=>{const e=tabs.get('+tabId+');for(const c of e.bridge.contexts.values()){const r=await e.bridge.evaluate(c,"({…)
  const result=await evaluate('(async()=>{const e=tabs.get('+tabId+');for(const c of e.bridge.contexts.values()){const r=await e.bridge.evaluate(c,"({installs:window.installs,loaded:window.__KVPV_LIVE_BUILD})");if(r.installs)return r;}})()');
// [VI dòng gốc 33] gọi assert.equal(result.installs, 2) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(result.loaded, 'edge-test-v2') để kiểm tra hai giá trị bằng nhau | gọi console.log('PASS real Edge extension: attach existing tab, cross-origin game frame, two builds without page reload')
  assert.equal(result.installs,2);assert.equal(result.loaded,'edge-test-v2');console.log('PASS real Edge extension: attach existing tab, cross-origin game frame, two builds without page reload');
// [VI dòng gốc 34] Kiểm tra cdp: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | chờ tác vụ bất đồng bộ: gọi cdp.send('Browser.close') | Nhận lỗi bằng _ và chạy phần xử lý lỗi.
 }finally{if(cdp){try{await cdp.send('Browser.close');}catch(_){}cdp.close();}else if(child)child.kill();await new Promise(r=>server.close(r));}
// [VI dòng gốc 35] gọi console.error(e) | gán process.exitCode bằng 1
})().catch(e=>{console.error(e);process.exitCode=1;});
// [VI dòng gốc 36] Dòng trống để tách các phần, không có lệnh thực thi.
