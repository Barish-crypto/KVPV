// [VI dòng gốc 1] "use strict" | Khai báo biến không gán lại bằng const: fs = gọi require('node:fs') để nạp module Node.js; vm = gọi require('node:vm') để nạp module Node.js; assert = gọi require('node:assert/strict') để nạp module Node.js | Khai báo biến không gán lại bằng const: {gameURL} = gọi require('./live/core.cjs') để nạp module Node.js
'use strict';const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');const {gameURL}=require('./live/core.cjs');
// [VI dòng gốc 2] Khai báo biến không gán lại bằng const: rows = tạo mảng gồm 4 vị trí: [{id:1,url:'https://play.choingay.vn/1046'},{id:2,url:'https://play.choingay.vn/1046?x=1'},{id:3,url:'https://example.com/1046'},{id:4,url:'https://play.choingay.vn/10460'}]; attached = tạo mảng gồm 0 vị trí: [] | Khai báo biến có thể gán lại bằng let: listener (chưa gán giá trị)
const rows=[{id:1,url:'https://play.choingay.vn/1046'},{id:2,url:'https://play.choingay.vn/1046?x=1'},{id:3,url:'https://example.com/1046'},{id:4,url:'https://play.choingay.vn/10460'}],attached=[];let listener;
// [VI dòng gốc 3] Khai báo biến không gán lại bằng const: event = tạo hàm với tham số (không có); mỗi lần gọi trả về tạo đối tượng gồm addListener; port = tạo đối tượng gồm onMessage, onDisconnect, postMessage, disconnect
const event=()=>({addListener(){}}),port={onMessage:event(),onDisconnect:event(),postMessage(){},disconnect(){}};
// [VI dòng gốc 4] Khai báo biến không gán lại bằng const: chrome = tạo đối tượng gồm tabs, debugger, runtime | Kiểm tra t.tabId===2: đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('busy') | gọi attached.push(t.tabId) để thêm phần tử vào cuối mảng
const chrome={tabs:{query:async()=>rows,get:async id=>rows.find(t=>t.id===id)},debugger:{attach:async t=>{if(t.tabId===2)throw Error('busy');attached.push(t.tabId);},getTargets:async()=>rows.map(t=>({id:'target'+t.id,tabId:t.id})),sendCommand:async()=>({}),detach:async()=>{},onEvent:event(),onDetach:event()},runtime:{id:'unit',getURL:()=> 'chrome-extension://unit/',connectNative:()=>port,onMessage:{addListener(fn){listener=fn;}}}};
// [VI dòng gốc 5] Khai báo biến không gán lại bằng const: context = tạo đối tượng gồm chrome, self, importScripts, setInterval, Map, Promise, Array, Number, String, Object, Uint8Array, TextDecoder, Error | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm diagnostics.
const context={chrome,self:{KVPV_EDGE_CORE:{gameURL,GameBridge:class{async sync(){return {diagnostics:[]};}}}},importScripts(){},setInterval(){},Map,Promise,Array,Number,String,Object,Uint8Array,TextDecoder,Error};
// [VI dòng gốc 6] gọi vm.runInNewContext(fs.readFileSync(__dirname+'/edge-addon/background.js','utf8'), context) để chạy mã trong ngữ cảnh máy ảo dùng cho kiểm thử
vm.runInNewContext(fs.readFileSync(__dirname+'/edge-addon/background.js','utf8'),context);
// [VI dòng gốc 7] Khai báo biến không gán lại bằng const: sender = tạo đối tượng gồm id, url
const sender={id:'unit',url:'chrome-extension://unit/popup.html'};
// [VI dòng gốc 8] Định nghĩa hàm bất đồng bộ run; tham số: không có
async function run(){
// [VI dòng gốc 9] gọi assert.equal(listener({type:'attachAll'},{...sender,tab:{id:1}},()=>{}), false, 'web tab cannot request all-tab attach') để kiểm tra hai giá trị bằng nhau
 assert.equal(listener({type:'attachAll'},{...sender,tab:{id:1}},()=>{}),false,'web tab cannot request all-tab attach');
// [VI dòng gốc 10] Khai báo biến không gán lại bằng const: result = chờ tác vụ bất đồng bộ: tạo đối tượng bằng Promise(resolve=>listener({type:'attachAll'},sender,resolve)) | gọi assert.equal(result.ok, true) để kiểm tra hai giá trị bằng nhau | gọi assert.match(result.result.reason, /1\/2/) | gọi assert.deepEqual(attached, [1]) để kiểm tra cấu trúc hai giá trị tương đương
 const result=await new Promise(resolve=>listener({type:'attachAll'},sender,resolve));assert.equal(result.ok,true);assert.match(result.result.reason,/1\/2/);assert.deepEqual(attached,[1]);
// [VI dòng gốc 11] chờ tác vụ bất đồng bộ: tạo đối tượng bằng Promise(resolve=>listener({type:'attachAll'},sender,resolve)) | gọi assert.deepEqual(attached, [1], 'already attached tab not attached twice') để kiểm tra cấu trúc hai giá trị tương đương
 await new Promise(resolve=>listener({type:'attachAll'},sender,resolve));assert.deepEqual(attached,[1],'already attached tab not attached twice');
// [VI dòng gốc 12] gán rows.length bằng 0 | Khai báo biến không gán lại bằng const: none = chờ tác vụ bất đồng bộ: tạo đối tượng bằng Promise(resolve=>listener({type:'attachAll'},sender,resolve)) | gọi assert.match(none.result.reason, /Không tìm thấy/)
 rows.length=0;const none=await new Promise(resolve=>listener({type:'attachAll'},sender,resolve));assert.match(none.result.reason,/Không tìm thấy/);
// [VI dòng gốc 13] gọi assert(fs.readFileSync(__dirname+'/edge-addon/popup.html','utf8').includes('id="attachAll"')) để kiểm tra điều kiện của bài test
 assert(fs.readFileSync(__dirname+'/edge-addon/popup.html','utf8').includes('id="attachAll"'));
// [VI dòng gốc 14] gọi console.log('PASS attach all: trusted popup only, exact game URLs, per-tab failure isolation, idempotent attach and empty inventory')
 console.log('PASS attach all: trusted popup only, exact game URLs, per-tab failure isolation, idempotent attach and empty inventory');
// [VI dòng gốc 15] gọi run().catch(e=>{console.error(e);process.exitCode=1;}) | gọi console.error(e) | gán process.exitCode bằng 1
}run().catch(e=>{console.error(e);process.exitCode=1;});
// [VI dòng gốc 16] Dòng trống để tách các phần, không có lệnh thực thi.
