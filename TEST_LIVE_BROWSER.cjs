// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: Kiểm thử Chrome headless với game giả cục bộ, profile riêng; không chạm phiên game thật. [đóng chú thích]
/* Kiểm thử Chrome headless với game giả cục bộ, profile riêng; không chạm phiên game thật. */
// [VI dòng gốc 2] "use strict"
'use strict';
// [VI dòng gốc 3] Khai báo biến không gán lại bằng const: fs = gọi require('node:fs') để nạp module Node.js; path = gọi require('node:path') để nạp module Node.js; http = gọi require('node:http') để nạp module Node.js; assert = gọi require('node:assert/strict') để nạp module Node.js; {spawn} = gọi require('node:child_process') để nạp module Node.js
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict'),{spawn}=require('node:child_process');
// [VI dòng gốc 4] Khai báo biến không gán lại bằng const: {CDP,GameBridge} = gọi require('./live/core.cjs') để nạp module Node.js
const {CDP,GameBridge}=require('./live/core.cjs');
// [VI dòng gốc 5] Khai báo biến không gán lại bằng const: sleep = tạo hàm với tham số ms; mỗi lần gọi trả về tạo đối tượng bằng Promise(r=>setTimeout(r,ms))
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
// [VI dòng gốc 6] gọi (async()=>{ const exe='C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'; if(!fs.existsSync(exe))throw Error('Chrome required for browser integration test'); const profil…(e=>{console.error(e);process.exitCode=1;})
(async()=>{
// [VI dòng gốc 7] Khai báo biến không gán lại bằng const: exe = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
 const exe='C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
// [VI dòng gốc 8] Kiểm tra !fs.existsSync(exe): đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('Chrome required for browser integration test')
 if(!fs.existsSync(exe))throw Error('Chrome required for browser integration test');
// [VI dòng gốc 9] Khai báo biến không gán lại bằng const: profile = gọi path.join(__dirname, '.kvpv-live', 'test-profile-'+Date.now()) | gọi fs.mkdirSync(profile, {recursive:true}) để tạo thư mục
 const profile=path.join(__dirname,'.kvpv-live','test-profile-'+Date.now());fs.mkdirSync(profile,{recursive:true});
// [VI dòng gốc 10] Khai báo biến có thể gán lại bằng let: cdp = null; child = null; port = 0
 let cdp=null,child=null,port=0;
// [VI dòng gốc 11] Khai báo biến không gán lại bằng const: server = gọi http.createServer((req,res)=>{res.setHeader('content-type','text/html; charset=utf-8'); if(req.url==='/frame')res.end(`<script>window._Ba=…) | gọi res.setHeader('content-type', 'text/html; charset=utf-8')
 const server=http.createServer((req,res)=>{res.setHeader('content-type','text/html; charset=utf-8');
// [VI dòng gốc 12] Nội dung nguyên văn của chuỗi mẫu; đây là dữ liệu trong chuỗi, không phải lệnh đang chạy.
   if(req.url==='/frame')res.end(`<script>window._Ba={_rJ:{_O$:{ins:{actorId:'123456'}}}};window._ft={};window._Sa={};window._d={_Yct:{_Eet:1,_Het:2,_zet:3}};window._C={_Ba:{instance:{getRole:()=>({getComponent:()=>({})})}}};window.beforeUpdates=Date.now();</script><p>Fake game frame for local test</p>`);
// [VI dòng gốc 13] Nội dung nguyên văn của chuỗi mẫu; đây là dữ liệu trong chuỗi, không phải lệnh đang chạy.
   else res.end(`<p>Local bridge test</p><iframe src="http://frame.kvpv.test:${port}/frame"></iframe>`);
// [VI dòng gốc 14] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
 });
// [VI dòng gốc 15] chờ tác vụ bất đồng bộ: tạo đối tượng bằng Promise(r=>server.listen(0,'127.0.0.1',r)) | gán port bằng server.address().port
 await new Promise(r=>server.listen(0,'127.0.0.1',r));port=server.address().port;
// [VI dòng gốc 16] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài.
 try{
// [VI dòng gốc 17] gán child bằng spawn(exe,['--headless=new','--disable-gpu','--no-proxy-server','--site-per-process','--disable-features=HttpsUpgrades,HTTPSFirstModeV2', '--host-resolver-rules=MAP play.choingay.v…
   child=spawn(exe,['--headless=new','--disable-gpu','--no-proxy-server','--site-per-process','--disable-features=HttpsUpgrades,HTTPSFirstModeV2',
// [VI dòng gốc 18] Thuộc tính stdio: "ignore" | Thuộc tính windowsHide: true
    '--host-resolver-rules=MAP play.choingay.vn 127.0.0.1, MAP frame.kvpv.test 127.0.0.1','--remote-debugging-port=0','--user-data-dir='+profile,'--no-first-run','--no-default-browser-check','about:blank'],{stdio:'ignore',windowsHide:true});
// [VI dòng gốc 19] Khai báo biến có thể gán lại bằng let: active (chưa gán giá trị)
   let active;
// [VI dòng gốc 20] Lặp for: khởi tạo let n=0; tiếp tục khi n<80; sau mỗi vòng n++. | Khai báo biến có thể gán lại bằng let: n = 0 | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | gán active bằng fs.readFileSync(path.join(profile,'DevToolsActivePort'),'utf8').trim().split(/\r?\n/)
   for(let n=0;n<80;n++){try{active=fs.readFileSync(path.join(profile,'DevToolsActivePort'),'utf8').trim().split(/\r?\n/);break;}catch(_){await sleep(100);}}
// [VI dòng gốc 21] gọi assert(active, 'DevToolsActivePort created') để kiểm tra điều kiện của bài test | gán cdp bằng await CDP.connect('ws://127.0.0.1:'+active[0]+active[1])
   assert(active,'DevToolsActivePort created');cdp=await CDP.connect('ws://127.0.0.1:'+active[0]+active[1]);
// [VI dòng gốc 22] chờ tác vụ bất đồng bộ: gọi cdp.send('Target.createTarget', {url:'http://play.choingay.vn:'+port+'/1046'})
   await cdp.send('Target.createTarget',{url:'http://play.choingay.vn:'+port+'/1046'});
// [VI dòng gốc 23] Khai báo biến không gán lại bằng const: bridge = tạo đối tượng bằng GameBridge(cdp, console.log); payload = tạo đối tượng gồm build, full
   const bridge=new GameBridge(cdp,console.log),payload={build:'integration-v1',full:'window.KVPV_V1={};window.__KVPV_OWN_ACTOR_ID="123456";window.installCount=(window.installCount||0)+1;'};
// [VI dòng gốc 24] Khai báo biến có thể gán lại bằng let: found = null
   let found=null;
// [VI dòng gốc 25] Lặp for: khởi tạo let n=0; tiếp tục khi n<60; sau mỗi vòng n++. | Khai báo biến có thể gán lại bằng let: n = 0 | chờ tác vụ bất đồng bộ: gọi bridge.sync(payload) | gán found bằng [...bridge.contexts.values()].find(c=>c.auxData?.isDefault&&c.origin.includes('frame.kvpv.test'))
   for(let n=0;n<60;n++){await bridge.sync(payload);found=[...bridge.contexts.values()].find(c=>c.auxData?.isDefault&&c.origin.includes('frame.kvpv.test'));
// [VI dòng gốc 26] Kiểm tra found&&(await bridge.evaluate(found,'window.__KVPV_LIVE_BUILD'))===payload.build: đúng thì chạy nhánh sau if. | Thoát vòng lặp/switch hiện tại. | chờ tác vụ bất đồng bộ: gọi sleep(100)
     if(found&&(await bridge.evaluate(found,'window.__KVPV_LIVE_BUILD'))===payload.build)break;await sleep(100);}
// [VI dòng gốc 27] Kiểm tra !found: đúng thì chạy nhánh sau if. | gọi console.log(JSON.stringify(await cdp.send('Target.getTargets'))) | gọi console.log(JSON.stringify([...bridge.contexts.values()]))
   if(!found){console.log(JSON.stringify(await cdp.send('Target.getTargets')));console.log(JSON.stringify([...bridge.contexts.values()]));}
// [VI dòng gốc 28] gọi assert(found, 'cross-origin game context discovered') để kiểm tra điều kiện của bài test | gọi assert.equal(await bridge.evaluate(found,'window.__KVPV_LIVE_BUILD'), 'integration-v1') để kiểm tra hai giá trị bằng nhau
   assert(found,'cross-origin game context discovered');assert.equal(await bridge.evaluate(found,'window.__KVPV_LIVE_BUILD'),'integration-v1');
// [VI dòng gốc 29] Khai báo biến không gán lại bằng const: before = chờ tác vụ bất đồng bộ: gọi bridge.evaluate(found, 'window.beforeUpdates') | chờ tác vụ bất đồng bộ: gọi bridge.sync({...payload,build:'integration-v2'})
   const before=await bridge.evaluate(found,'window.beforeUpdates');await bridge.sync({...payload,build:'integration-v2'});
// [VI dòng gốc 30] gọi assert.equal(await bridge.evaluate(found,'window.installCount'), 2) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(await bridge.evaluate(found,'window.beforeUpdates'), before, 'document not reloaded') để kiểm tra hai giá trị bằng nhau
   assert.equal(await bridge.evaluate(found,'window.installCount'),2);assert.equal(await bridge.evaluate(found,'window.beforeUpdates'),before,'document not reloaded');
// [VI dòng gốc 31] gọi console.log('PASS real Chrome: cross-origin OOPIF auto-injected and hot-updated in same document, no reload')
   console.log('PASS real Chrome: cross-origin OOPIF auto-injected and hot-updated in same document, no reload');
// [VI dòng gốc 32] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: }finally{
 }finally{
// [VI dòng gốc 33] Kiểm tra cdp: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | chờ tác vụ bất đồng bộ: gọi cdp.send('Browser.close') | Nhận lỗi bằng _ và chạy phần xử lý lỗi.
   if(cdp){try{await cdp.send('Browser.close');}catch(_){}cdp.close();}
// [VI dòng gốc 34] Kiểm tra child: đúng thì chạy nhánh sau if. | gọi child.kill() | chờ tác vụ bất đồng bộ: tạo đối tượng bằng Promise(r=>server.close(r))
   else if(child)child.kill();await new Promise(r=>server.close(r));
// [VI dòng gốc 35] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
 }
// [VI dòng gốc 36] gọi console.error(e) | gán process.exitCode bằng 1
})().catch(e=>{console.error(e);process.exitCode=1;});
// [VI dòng gốc 37] Dòng trống để tách các phần, không có lệnh thực thi.
