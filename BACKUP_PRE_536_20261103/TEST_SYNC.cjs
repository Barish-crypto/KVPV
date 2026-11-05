// [VI dòng gốc 1] "use strict"
'use strict';
// [VI dòng gốc 2] Khai báo biến không gán lại bằng const: fs = gọi require('node:fs') để nạp module Node.js; path = gọi require('node:path') để nạp module Node.js; os = gọi require('node:os') để nạp module Node.js; vm = gọi require('node:vm') để nạp module Node.js; assert = gọi require('node:assert/strict') để nạp module Node.js; crypto = gọi require('node:crypto') để nạp module Node.js; {execFile} = gọi require('node:child_process') để nạp module Node.js
const fs=require('node:fs'),path=require('node:path'),os=require('node:os'),vm=require('node:vm'),assert=require('node:assert/strict'),crypto=require('node:crypto'),{execFile}=require('node:child_process');
// [VI dòng gốc 3] Khai báo biến không gán lại bằng const: {sourceDigest,cached,record} = gọi require('./live/verified.cjs') để nạp module Node.js
const {sourceDigest,cached,record}=require('./live/verified.cjs');
// [VI dòng gốc 4] Định nghĩa hàm bất đồng bộ main; tham số: không có
async function main(){
// [VI dòng gốc 5] Khai báo biến không gán lại bằng const: root = gọi fs.mkdtempSync(path.join(os.tmpdir(),'kvpv-sync-'))
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'kvpv-sync-'));
// [VI dòng gốc 6] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài.
 try{
// [VI dòng gốc 7] gọi fs.mkdirSync(path.join(root,'live')) để tạo thư mục | gọi fs.mkdirSync(path.join(root,'src')) để tạo thư mục
  fs.mkdirSync(path.join(root,'live'));fs.mkdirSync(path.join(root,'src'));
// [VI dòng gốc 8] Duyệt từng giá trị trong ['project.cjs','verified.cjs','verify.cjs'] bằng const file. | Khai báo biến không gán lại bằng const: file (chưa gán giá trị) | gọi fs.copyFileSync(path.join(__dirname,'live',file), path.join(root,'live',file))
  for(const file of ['project.cjs','verified.cjs','verify.cjs'])fs.copyFileSync(path.join(__dirname,'live',file),path.join(root,'live',file));
// [VI dòng gốc 9] Khai báo biến không gán lại bằng const: full = "window.fixture=true;" | gọi fs.writeFileSync(path.join(root,'KVPV_V1_FULL.js'), full) để ghi tệp đồng bộ
  const full='window.fixture=true;';fs.writeFileSync(path.join(root,'KVPV_V1_FULL.js'),full);
// [VI dòng gốc 10] gọi fs.writeFileSync(path.join(root,'MANIFEST.json'), JSON.stringify({file:'KVPV_V1_FULL.js',buildId:'123456abcdef',sha256:crypto.createHash(…) để ghi tệp đồng bộ
  fs.writeFileSync(path.join(root,'MANIFEST.json'),JSON.stringify({file:'KVPV_V1_FULL.js',buildId:'123456abcdef',sha256:crypto.createHash('sha256').update(full).digest('hex')}));
// [VI dòng gốc 11] Nội dung nguyên văn của chuỗi mẫu; đây là dữ liệu trong chuỗi, không phải lệnh đang chạy.
  fs.writeFileSync(path.join(root,'test.cjs'),`const fs=require('node:fs'),v=require('./live/verified.cjs');const d=v.sourceDigest(__dirname);fs.appendFileSync(__dirname+'/runs.txt','run\\n');setTimeout(()=>v.record(__dirname,d),200);`);
// [VI dòng gốc 12] Khai báo biến không gán lại bằng const: run = tạo hàm với tham số (không có); mỗi lần gọi trả về tạo đối tượng bằng Promise((resolve,reject)=>execFile(process.execPath,[path.join(root,'live/verify.cjs')],{windowsHide:true},(err,out,stderr)=>err…)
  const run=()=>new Promise((resolve,reject)=>execFile(process.execPath,[path.join(root,'live/verify.cjs')],{windowsHide:true},(err,out,stderr)=>err?reject(Error(stderr)):resolve(out)));
// [VI dòng gốc 13] Khai báo biến không gán lại bằng const: results = chờ tác vụ bất đồng bộ: gọi Promise.all([run(),run()])
  const results=await Promise.all([run(),run()]);
// [VI dòng gốc 14] gọi assert.equal(fs.readFileSync(path.join(root,'runs.txt'),'utf8'), 'run\n') để kiểm tra hai giá trị bằng nhau
  assert.equal(fs.readFileSync(path.join(root,'runs.txt'),'utf8'),'run\n');
// [VI dòng gốc 15] gọi assert(results.some(x=>x.includes('VERIFIED'))) để kiểm tra điều kiện của bài test | gọi assert(results.some(x=>x.includes('CACHED'))) để kiểm tra điều kiện của bài test
  assert(results.some(x=>x.includes('VERIFIED')));assert(results.some(x=>x.includes('CACHED')));
// [VI dòng gốc 16] gọi assert((await run()).includes('CACHED'), 'unchanged reconnect skips tests') để kiểm tra điều kiện của bài test
  assert((await run()).includes('CACHED'),'unchanged reconnect skips tests');
// [VI dòng gốc 17] Khai báo biến không gán lại bằng const: digest = gọi sourceDigest(root) | gọi assert(cached(root,digest)) để kiểm tra điều kiện của bài test
  const digest=sourceDigest(root);assert(cached(root,digest));
// [VI dòng gốc 18] gọi fs.writeFileSync(path.join(root,'src/00-fixture.js'), 'changed') để ghi tệp đồng bộ | gọi assert.equal(cached(root), null) để kiểm tra hai giá trị bằng nhau
  fs.writeFileSync(path.join(root,'src/00-fixture.js'),'changed');assert.equal(cached(root),null);
// [VI dòng gốc 19] gọi assert.throws(()=>record(root,digest), /Source changed/, 'never certify sources saved during a suite') để kiểm tra đoạn mã có ném lỗi như dự kiến
  assert.throws(()=>record(root,digest),/Source changed/,'never certify sources saved during a suite');
// [VI dòng gốc 20] chờ tác vụ bất đồng bộ: gọi run() | gọi assert.equal(fs.readFileSync(path.join(root,'runs.txt'),'utf8'), 'run\nrun\n') để kiểm tra hai giá trị bằng nhau
  await run();assert.equal(fs.readFileSync(path.join(root,'runs.txt'),'utf8'),'run\nrun\n');
// [VI dòng gốc 21] gọi fs.writeFileSync(path.join(root,'KVPV_V1_FULL.js'), 'tampered') để ghi tệp đồng bộ | gọi assert.equal(cached(root), null, 'artifact corruption invalidates receipt') để kiểm tra hai giá trị bằng nhau
  fs.writeFileSync(path.join(root,'KVPV_V1_FULL.js'),'tampered');assert.equal(cached(root),null,'artifact corruption invalidates receipt');
// [VI dòng gốc 22] Nội dung nguyên văn của chuỗi mẫu; đây là dữ liệu trong chuỗi, không phải lệnh đang chạy.
  fs.writeFileSync(path.join(root,'test.cjs'),`process.stderr.write('fixture failure');process.exit(1);`);
// [VI dòng gốc 23] chờ tác vụ bất đồng bộ: gọi assert.rejects(run, /fixture failure/) | gọi assert.equal(cached(root), null) để kiểm tra hai giá trị bằng nhau
  await assert.rejects(run,/fixture failure/);assert.equal(cached(root),null);
// [VI dòng gốc 24] Tiếp tục hàm main; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: }finally{
 }finally{
// [VI dòng gốc 25] gọi assert(path.resolve(root).startsWith(path.resolve(os.tmpdir())+path.sep)) để kiểm tra điều kiện của bài test | gọi fs.rmSync(root, {recursive:true,force:true})
  assert(path.resolve(root).startsWith(path.resolve(os.tmpdir())+path.sep));fs.rmSync(root,{recursive:true,force:true});
// [VI dòng gốc 26] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
 }
// [VI dòng gốc 27] Khai báo biến có thể gán lại bằng let: release (chưa gán giá trị) | Khai báo biến không gán lại bằng const: calls = tạo mảng gồm 0 vị trí: []; messages = tạo mảng gồm 0 vị trí: [] | Khai báo biến không gán lại bằng const: slow = tạo đối tượng bằng Promise(r=>release=r)
 let release;const calls=[],messages=[];const slow=new Promise(r=>release=r);
// [VI dòng gốc 28] Khai báo biến không gán lại bằng const: context = gọi vm.createContext({self:{KVPV_EDGE_CORE:{gameURL:()=>true}},importScripts(){},setInterval(){}, chrome:{tabs:{get:async id=>({url:'https://…)
 const context=vm.createContext({self:{KVPV_EDGE_CORE:{gameURL:()=>true}},importScripts(){},setInterval(){},
// [VI dòng gốc 29] Thuộc tính chrome: tạo đối tượng gồm tabs, debugger, runtime | Thuộc tính tabs: tạo đối tượng gồm get | Thuộc tính get: tạo hàm bất đồng bộ với tham số id; mỗi lần gọi trả về tạo đối tượng gồm url | Thuộc tính url: "https://play.choingay.vn/1046"
  chrome:{tabs:{get:async id=>({url:'https://play.choingay.vn/1046'})},debugger:{onEvent:{addListener(){}},onDetach:{addListener(){}}},runtime:{onMessage:{addListener(){}}}}});
// [VI dòng gốc 30] gọi vm.runInContext(fs.readFileSync(__dirname+'/edge-addon/background.js','utf8'), context)
 vm.runInContext(fs.readFileSync(__dirname+'/edge-addon/background.js','utf8'),context);
// [VI dòng gốc 31] gán context.syncTab bằng async(id,p)=>{calls.push(id+'/'+p.build);if(id===1&&p.build==='first')await slow;return {diagnostics:p.build==='latest'?[{schema:1,actor:'123456',build:'latest',at:1000}]:[]};} | gọi calls.push(id+'/'+p.build) để thêm phần tử vào cuối mảng | Kiểm tra id===1&&p.build==='first': đúng thì chạy nhánh sau if. | chờ tác vụ bất đồng bộ: slow
 context.syncTab=async(id,p)=>{calls.push(id+'/'+p.build);if(id===1&&p.build==='first')await slow;return {diagnostics:p.build==='latest'?[{schema:1,actor:'123456',build:'latest',at:1000}]:[]};};
// [VI dòng gốc 32] gán context.diagnosticMessage bằng m=>messages.push(m) | gọi vm.runInContext('port={postMessage:m=>diagnosticMessage(m)};', context)
 context.diagnosticMessage=m=>messages.push(m);vm.runInContext('port={postMessage:m=>diagnosticMessage(m)};',context);
// [VI dòng gốc 33] Nội dung nguyên văn của chuỗi mẫu; đây là dữ liệu trong chuỗi, không phải lệnh đang chạy.
 vm.runInContext(`for(const id of [1,2])tabs.set(id,{adapter:{},bridge:{sync:p=>syncTab(id,p)}});payload={build:'first'};`,context);
// [VI dòng gốc 34] Khai báo biến không gán lại bằng const: first = gọi vm.runInContext('pump()', context) | chờ tác vụ bất đồng bộ: tạo đối tượng bằng Promise(r=>setImmediate(r))
 const first=vm.runInContext('pump()',context);await new Promise(r=>setImmediate(r));
// [VI dòng gốc 35] gọi assert.deepEqual(calls, ['1/first','2/first'], 'slow tab must not block second tab') để kiểm tra cấu trúc hai giá trị tương đương
 assert.deepEqual(calls,['1/first','2/first'],'slow tab must not block second tab');
// [VI dòng gốc 36] gọi vm.runInContext("payload={build:'latest'};void pump();", context) | gọi release() để nhả quyền điều khiển đang giữ | chờ tác vụ bất đồng bộ: first
 vm.runInContext("payload={build:'latest'};void pump();",context);release();await first;
// [VI dòng gốc 37] chờ tác vụ bất đồng bộ: tạo đối tượng bằng Promise(r=>setImmediate(r))
 await new Promise(r=>setImmediate(r));
// [VI dòng gốc 38] gọi assert(calls.includes('1/latest')&&calls.includes('2/latest'), 'new payload drains immediately after in-flight sync') để kiểm tra điều kiện của bài test
 assert(calls.includes('1/latest')&&calls.includes('2/latest'),'new payload drains immediately after in-flight sync');
// [VI dòng gốc 39] gọi assert.equal(messages.filter(m=>m.type==='diagnostics').length, 1, 'same actor snapshot is forwarded once even across tabs') để kiểm tra hai giá trị bằng nhau
 assert.equal(messages.filter(m=>m.type==='diagnostics').length,1,'same actor snapshot is forwarded once even across tabs');
// [VI dòng gốc 40] gọi assert.equal(messages[0].report.actor, '123456') để kiểm tra hai giá trị bằng nhau
 assert.equal(messages[0].report.actor,'123456');
// [VI dòng gốc 41] gọi console.log('PASS sync: shared concurrent verification, cached reconnect, changed-source/failed-test/corrupt-artifact rejection, par…)
 console.log('PASS sync: shared concurrent verification, cached reconnect, changed-source/failed-test/corrupt-artifact rejection, parallel tabs and immediate latest-build drain');
// [VI dòng gốc 42] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 43] gọi main().catch(e=>{console.error(e);process.exitCode=1;}) | gọi console.error(e) | gán process.exitCode bằng 1
main().catch(e=>{console.error(e);process.exitCode=1;});
// [VI dòng gốc 44] Dòng trống để tách các phần, không có lệnh thực thi.
