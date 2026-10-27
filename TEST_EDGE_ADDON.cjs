// [VI dòng gốc 1] "use strict"
'use strict';
// [VI dòng gốc 2] Khai báo biến không gán lại bằng const: assert = gọi require('node:assert/strict') để nạp module Node.js; fs = gọi require('node:fs') để nạp module Node.js; vm = gọi require('node:vm') để nạp module Node.js; crypto = gọi require('node:crypto') để nạp module Node.js
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),crypto=require('node:crypto');
// [VI dòng gốc 3] Khai báo biến không gán lại bằng const: {packet,payloadPackets,Parser} = gọi require('./edge-addon/native/protocol.cjs') để nạp module Node.js
const {packet,payloadPackets,Parser}=require('./edge-addon/native/protocol.cjs');
// [VI dòng gốc 4] Chú thích gốc của tác giả; không được thực thi. Nội dung: FULL thực tế lớn hơn 1MB: chia gói theo byte để không cắt vỡ tiếng Việt.
// FULL thực tế lớn hơn 1MB: chia gói theo byte để không cắt vỡ tiếng Việt.
// [VI dòng gốc 5] Khai báo biến không gán lại bằng const: bytes = gọi Buffer.from('Đồng bộ tuyệt học 🐉 '.repeat(85000)); sha256 = gọi crypto.createHash('sha256').update(bytes).digest('hex')
const bytes=Buffer.from('Đồng bộ tuyệt học 🐉 '.repeat(85000)),sha256=crypto.createHash('sha256').update(bytes).digest('hex');
// [VI dòng gốc 6] Khai báo biến không gán lại bằng const: p = tạo đối tượng gồm bytes, sha256, build; parts = tạo mảng gồm 0 vị trí: []; messages = tạo mảng gồm 0 vị trí: []
const p={bytes,sha256,build:'123456abcdef'},parts=[],messages=[];
// [VI dòng gốc 7] Khai báo biến không gán lại bằng const: parser = tạo đối tượng bằng Parser(m=>messages.push(m))
const parser=new Parser(m=>messages.push(m));
// [VI dòng gốc 8] Duyệt từng giá trị trong payloadPackets(p) bằng const m. | Khai báo biến không gán lại bằng const: m (chưa gán giá trị) | Khai báo biến không gán lại bằng const: b = gọi packet(m) | gọi assert(b.readUInt32LE()<1024*1024) để kiểm tra điều kiện của bài test
for(const m of payloadPackets(p)){const b=packet(m);assert(b.readUInt32LE()<1024*1024);parser.push(b.subarray(0,2));parser.push(b.subarray(2,11));parser.push(b.subarray(11));}
// [VI dòng gốc 9] Duyệt từng giá trị trong messages bằng const m. | Khai báo biến không gán lại bằng const: m (chưa gán giá trị) | Kiểm tra m.type==='chunk': đúng thì chạy nhánh sau if. | gọi parts.push(Buffer.from(m.data,'base64')) để thêm phần tử vào cuối mảng
for(const m of messages)if(m.type==='chunk')parts.push(Buffer.from(m.data,'base64'));
// [VI dòng gốc 10] gọi assert(Buffer.concat(parts).equals(bytes)) để kiểm tra điều kiện của bài test | gọi assert.equal(messages[0].bytes, bytes.length) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(messages.at(-1).type, 'end') để kiểm tra hai giá trị bằng nhau
assert(Buffer.concat(parts).equals(bytes));assert.equal(messages[0].bytes,bytes.length);assert.equal(messages.at(-1).type,'end');
// [VI dòng gốc 11] gọi assert.throws(()=>new Parser(()=>{}).push(Buffer.from([255,255,255,127]))) để kiểm tra đoạn mã có ném lỗi như dự kiến
assert.throws(()=>new Parser(()=>{}).push(Buffer.from([255,255,255,127])));
// [VI dòng gốc 12] Khai báo biến không gán lại bằng const: manifest = gọi JSON.parse(fs.readFileSync(__dirname+'/edge-addon/manifest.json','utf8')) để phân tích dữ liệu đầu vào theo API đang gọi
const manifest=JSON.parse(fs.readFileSync(__dirname+'/edge-addon/manifest.json','utf8'));
// [VI dòng gốc 13] gọi assert(manifest.key) để kiểm tra điều kiện của bài test | gọi assert(manifest.permissions.includes('debugger')) để kiểm tra điều kiện của bài test | gọi assert(manifest.permissions.includes('nativeMessaging')) để kiểm tra điều kiện của bài test | gọi assert(!manifest.host_permissions) để kiểm tra điều kiện của bài test
assert(manifest.key);assert(manifest.permissions.includes('debugger'));assert(manifest.permissions.includes('nativeMessaging'));assert(!manifest.host_permissions);assert(!manifest.externally_connectable);
// [VI dòng gốc 14] Chú thích gốc của tác giả; không được thực thi. Nội dung: Kiểm tra receiver giữ nguyên payload cũ nếu FULL nhận thiếu/sai hash.
// Kiểm tra receiver giữ nguyên payload cũ nếu FULL nhận thiếu/sai hash.
// [VI dòng gốc 15] Khai báo biến không gán lại bằng const: event = tạo hàm với tham số (không có); mỗi lần gọi trả về tạo đối tượng gồm addListener; nativePort = tạo đối tượng gồm onMessage, onDisconnect, postMessage, disconnect
const event=()=>({addListener(){}}),nativePort={onMessage:event(),onDisconnect:event(),postMessage(){},disconnect(){}};
// [VI dòng gốc 16] Khai báo biến không gán lại bằng const: chrome = tạo đối tượng gồm runtime, debugger, tabs
const chrome={runtime:{connectNative:()=>nativePort,id:'test',getURL:()=> 'chrome-extension://test/',onMessage:event()},
// [VI dòng gốc 17] Thuộc tính debugger: tạo đối tượng gồm onEvent, onDetach | Thuộc tính onEvent: gọi event() | Thuộc tính onDetach: gọi event() | Thuộc tính tabs: tạo đối tượng gồm
 debugger:{onEvent:event(),onDetach:event()},tabs:{}};
// [VI dòng gốc 18] Khai báo biến không gán lại bằng const: context = tạo đối tượng gồm self, chrome, importScripts, setInterval, atob, TextDecoder, Uint8Array, crypto
const context={self:{KVPV_EDGE_CORE:{}},chrome,importScripts(){},setInterval(){},atob:x=>Buffer.from(x,'base64').toString('binary'),TextDecoder,Uint8Array,crypto:crypto.webcrypto};
// [VI dòng gốc 19] gọi vm.createContext(context) | gọi vm.runInContext(fs.readFileSync(__dirname+'/edge-addon/background.js','utf8'), context)
vm.createContext(context);vm.runInContext(fs.readFileSync(__dirname+'/edge-addon/background.js','utf8'),context);
// [VI dòng gốc 20] gán context.messages bằng messages
context.messages=messages;
// [VI dòng gốc 21] gọi (async()=>{ await vm.runInContext('(async()=>{for(const m of messages)await receive(m);})()',context); await vm.runInContext("receive({type:'partyPeers',peers:[{actor:'12345'}]})",…(e=>{console.error(e);process.exitCode=1;})
(async()=>{
// [VI dòng gốc 22] chờ tác vụ bất đồng bộ: gọi vm.runInContext('(async()=>{for(const m of messages)await receive(m);})()', context)
 await vm.runInContext('(async()=>{for(const m of messages)await receive(m);})()',context);
// [VI dòng gốc 23] chờ tác vụ bất đồng bộ: gọi vm.runInContext("receive({type:'partyPeers',peers:[{actor:'12345'}]})", context)
 await vm.runInContext("receive({type:'partyPeers',peers:[{actor:'12345'}]})",context);
// [VI dòng gốc 24] gọi assert.equal(vm.runInContext('partyPeers[0].actor',context), '12345') để kiểm tra hai giá trị bằng nhau
 assert.equal(vm.runInContext('partyPeers[0].actor',context),'12345');
// [VI dòng gốc 25] chờ tác vụ bất đồng bộ: gọi vm.runInContext("receive({type:'partyPeers',peers:Array(33).fill({actor:'99999'})})", context)
 await vm.runInContext("receive({type:'partyPeers',peers:Array(33).fill({actor:'99999'})})",context);
// [VI dòng gốc 26] gọi assert.equal(vm.runInContext('partyPeers[0].actor',context), '12345', 'oversized relay ignored') để kiểm tra hai giá trị bằng nhau
 assert.equal(vm.runInContext('partyPeers[0].actor',context),'12345','oversized relay ignored');
// [VI dòng gốc 27] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 28] gọi assert.equal(vm.runInContext('payload.build',context), p.build) để kiểm tra hai giá trị bằng nhau
 assert.equal(vm.runInContext('payload.build',context),p.build);
// [VI dòng gốc 29] gán context.bad bằng [{...messages[0],sha256:'a'.repeat(64)},...messages.slice(1).map(m=>({...m,sha256:'a'.repeat(64)}))]
 context.bad=[{...messages[0],sha256:'a'.repeat(64)},...messages.slice(1).map(m=>({...m,sha256:'a'.repeat(64)}))];
// [VI dòng gốc 30] chờ tác vụ bất đồng bộ: gọi assert.rejects(vm.runInContext('(async()=>{for(const m of bad)await receive(m);})()',context), /hash/)
 await assert.rejects(vm.runInContext('(async()=>{for(const m of bad)await receive(m);})()',context),/hash/);
// [VI dòng gốc 31] gọi assert.equal(vm.runInContext('payload.build',context), p.build) để kiểm tra hai giá trị bằng nhau
 assert.equal(vm.runInContext('payload.build',context),p.build);
// [VI dòng gốc 32] Chú thích gốc của tác giả; không được thực thi. Nội dung: Trang web/content script không được gửi yêu cầu attach cho worker.
 // Trang web/content script không được gửi yêu cầu attach cho worker.
// [VI dòng gốc 33] Khai báo biến không gán lại bằng const: source = gọi fs.readFileSync(__dirname+'/edge-addon/background.js', 'utf8') để đọc tệp đồng bộ | gọi assert(source.includes('sender.tab')) để kiểm tra điều kiện của bài test | gọi assert(source.includes('core.gameURL(tab.url)')) để kiểm tra điều kiện của bài test
 const source=fs.readFileSync(__dirname+'/edge-addon/background.js','utf8');assert(source.includes('sender.tab'));assert(source.includes('core.gameURL(tab.url)'));
// [VI dòng gốc 34] gọi console.log('PASS Edge addon: >1MB UTF8 chunking, split native headers, bounded input, exact SHA256, invalid data keeps prior payloa…)
 console.log('PASS Edge addon: >1MB UTF8 chunking, split native headers, bounded input, exact SHA256, invalid data keeps prior payload, no website message bridge');
// [VI dòng gốc 35] gọi console.error(e) | gán process.exitCode bằng 1
})().catch(e=>{console.error(e);process.exitCode=1;});
// [VI dòng gốc 36] Dòng trống để tách các phần, không có lệnh thực thi.
