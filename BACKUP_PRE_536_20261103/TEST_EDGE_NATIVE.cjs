// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: Kiểm thử riêng host .exe đã build, không ghi registry, không mở tab game. [đóng chú thích]
/* Kiểm thử riêng host .exe đã build, không ghi registry, không mở tab game. */
// [VI dòng gốc 2] "use strict"
'use strict';
// [VI dòng gốc 3] Khai báo biến không gán lại bằng const: fs = gọi require('node:fs') để nạp module Node.js; path = gọi require('node:path') để nạp module Node.js; crypto = gọi require('node:crypto') để nạp module Node.js; assert = gọi require('node:assert/strict') để nạp module Node.js; {spawn} = gọi require('node:child_process') để nạp module Node.js
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),assert=require('node:assert/strict'),{spawn}=require('node:child_process');
// [VI dòng gốc 4] Khai báo biến không gán lại bằng const: {packet,Parser} = gọi require('./edge-addon/native/protocol.cjs') để nạp module Node.js
const {packet,Parser}=require('./edge-addon/native/protocol.cjs');
// [VI dòng gốc 5] Khai báo biến không gán lại bằng const: manifest = gọi JSON.parse(fs.readFileSync(__dirname+'/edge-addon/manifest.json','utf8')) để phân tích dữ liệu đầu vào theo API đang gọi
const manifest=JSON.parse(fs.readFileSync(__dirname+'/edge-addon/manifest.json','utf8'));
// [VI dòng gốc 6] Khai báo biến không gán lại bằng const: id = gọi Array.from(crypto.createHash('sha256').update(Buffer.from(manifest.key,'base64')).digest().subarray(0,16),b=>String.fromCharCode(97+(b>>4),97+(b&15))).join('')
const id=Array.from(crypto.createHash('sha256').update(Buffer.from(manifest.key,'base64')).digest().subarray(0,16),b=>String.fromCharCode(97+(b>>4),97+(b&15))).join('');
// [VI dòng gốc 7] Khai báo biến không gán lại bằng const: child = gọi spawn(path.join(__dirname,'edge-addon/native/KvpvNativeHost.exe'), ['chrome-extension://'+id+'/'], {stdio:['pipe','pipe','pipe…)
const child=spawn(path.join(__dirname,'edge-addon/native/KvpvNativeHost.exe'),['chrome-extension://'+id+'/'],{stdio:['pipe','pipe','pipe'],windowsHide:true});
// [VI dòng gốc 8] Khai báo biến không gán lại bằng const: diagnosticFile = gọi path.join(__dirname, '.kvpv-live/diagnostics/99999999999001.json') | Kiểm tra fs.existsSync(diagnosticFile): đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('Diagnostic test actor already exists')
const diagnosticFile=path.join(__dirname,'.kvpv-live/diagnostics/99999999999001.json');if(fs.existsSync(diagnosticFile))throw Error('Diagnostic test actor already exists');
// [VI dòng gốc 9] Khai báo biến không gán lại bằng const: parts = tạo mảng gồm 0 vị trí: [] | Khai báo biến có thể gán lại bằng let: expected = null; done = false; stderr = "" | Khai báo biến không gán lại bằng const: timeout = gọi setTimeout(()=>{child.kill();throw Error('Native host timeout');}, 30000) để hẹn thực hiện một lần | gọi child.kill()
const parts=[];let expected=null,done=false,stderr='';const timeout=setTimeout(()=>{child.kill();throw Error('Native host timeout');},30000);
// [VI dòng gốc 10] gọi child.stderr.on('data', b=>stderr+=b) | gọi child.on('error', e=>{clearTimeout(timeout);console.error(e);process.exitCode=1;}) | gọi clearTimeout(timeout) để hủy lịch thực hiện một lần | gọi console.error(e)
child.stderr.on('data',b=>stderr+=b);child.on('error',e=>{clearTimeout(timeout);console.error(e);process.exitCode=1;});
// [VI dòng gốc 11] Khai báo biến không gán lại bằng const: parser = tạo đối tượng bằng Parser(m=>{if(m.type==='state')console.log(m.text);if(m.type==='begin')expected=m;if(m.type==='chunk')parts.push(Buffer.from(m.…) | Kiểm tra m.type==='state': đúng thì chạy nhánh sau if. | gọi console.log(m.text) | Kiểm tra m.type==='begin': đúng thì chạy nhánh sau if.
const parser=new Parser(m=>{if(m.type==='state')console.log(m.text);if(m.type==='begin')expected=m;if(m.type==='chunk')parts.push(Buffer.from(m.data,'base64'));
// [VI dòng gốc 12] Kiểm tra m.type==='end': đúng thì chạy nhánh sau if. | Khai báo biến không gán lại bằng const: bytes = gọi Buffer.concat(parts) | gọi assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'), expected.sha256) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(bytes.length, expected.bytes) để kiểm tra hai giá trị bằng nhau
 if(m.type==='end'){const bytes=Buffer.concat(parts);assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'),expected.sha256);assert.equal(bytes.length,expected.bytes);done=true;child.stdin.end();}});
// [VI dòng gốc 13] gọi child.stdout.on('data', b=>parser.push(b)) | gọi child.on('exit', code=>{clearTimeout(timeout);assert(done,'FULL was not emitted: '+stderr);assert.equal(code,0);assert.equal(JSON…) | gọi clearTimeout(timeout) để hủy lịch thực hiện một lần | gọi assert(done, 'FULL was not emitted: '+stderr) để kiểm tra điều kiện của bài test
child.stdout.on('data',b=>parser.push(b));child.on('exit',code=>{clearTimeout(timeout);assert(done,'FULL was not emitted: '+stderr);assert.equal(code,0);assert.equal(JSON.parse(fs.readFileSync(diagnosticFile,'utf8')).schema,1);fs.unlinkSync(diagnosticFile);console.log('PASS real Windows native host: .exe -> Node -> build/tests -> chunked FULL -> clean disconnect');});
// [VI dòng gốc 14] gọi child.stdin.write(packet({type:'watch'}))
child.stdin.write(packet({type:'watch'}));
// [VI dòng gốc 15] gọi child.stdin.write(packet({type:'diagnostics',report:{schema:1,actor:'99999999999001',missing:[],reborn:{tasks:[]},tienVi:[]}}))
child.stdin.write(packet({type:'diagnostics',report:{schema:1,actor:'99999999999001',missing:[],reborn:{tasks:[]},tienVi:[]}}));
// [VI dòng gốc 16] Dòng trống để tách các phần, không có lệnh thực thi.
