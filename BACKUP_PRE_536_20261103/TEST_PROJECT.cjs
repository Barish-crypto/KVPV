// [VI dòng gốc 1] "use strict"
'use strict';
// [VI dòng gốc 2] Khai báo biến không gán lại bằng const: fs = gọi require('node:fs') để nạp module Node.js; os = gọi require('node:os') để nạp module Node.js; path = gọi require('node:path') để nạp module Node.js; crypto = gọi require('node:crypto') để nạp module Node.js; assert = gọi require('node:assert/strict') để nạp module Node.js
const fs=require('node:fs'),os=require('node:os'),path=require('node:path'),crypto=require('node:crypto'),assert=require('node:assert/strict');
// [VI dòng gốc 3] Khai báo biến không gán lại bằng const: {readArtifact,isWatchedSource,extensionId} = gọi require('./live/project.cjs') để nạp module Node.js
const {readArtifact,isWatchedSource,extensionId}=require('./live/project.cjs');
// [VI dòng gốc 4] Khai báo biến không gán lại bằng const: root = gọi fs.mkdtempSync(path.join(os.tmpdir(),'kvpv-artifact-'))
const root=fs.mkdtempSync(path.join(os.tmpdir(),'kvpv-artifact-'));
// [VI dòng gốc 5] Khai báo biến không gán lại bằng const: fullPath = gọi path.join(root, 'KVPV_V1_FULL.js'); manifestPath = gọi path.join(root, 'MANIFEST.json')
const fullPath=path.join(root,'KVPV_V1_FULL.js'),manifestPath=path.join(root,'MANIFEST.json');
// [VI dòng gốc 6] Định nghĩa hàm write; tham số: full, file='KVPV_V1_FULL.js'
function write(full,file='KVPV_V1_FULL.js'){
// [VI dòng gốc 7] gọi fs.writeFileSync(fullPath, full) để ghi tệp đồng bộ
 fs.writeFileSync(fullPath,full);
// [VI dòng gốc 8] gọi fs.writeFileSync(manifestPath, JSON.stringify({file,buildId:'123456abcdef',sha256:crypto.createHash('sha256').update(full).digest('hex')}…) để ghi tệp đồng bộ
 fs.writeFileSync(manifestPath,JSON.stringify({file,buildId:'123456abcdef',sha256:crypto.createHash('sha256').update(full).digest('hex')}));
// [VI dòng gốc 9] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 10] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài.
try{
// [VI dòng gốc 11] gọi write('window.test=true;') | Khai báo biến không gán lại bằng const: p = gọi readArtifact(root) | gọi assert.equal(p.build, '123456abcdef') để kiểm tra hai giá trị bằng nhau | gọi assert.equal(p.bytes.toString('utf8'), p.full) để kiểm tra hai giá trị bằng nhau
 write('window.test=true;');const p=readArtifact(root);assert.equal(p.build,'123456abcdef');assert.equal(p.bytes.toString('utf8'),p.full);
// [VI dòng gốc 12] gọi fs.writeFileSync(fullPath, 'changed') để ghi tệp đồng bộ | gọi assert.throws(()=>readArtifact(root), /synchronized/) để kiểm tra đoạn mã có ném lỗi như dự kiến
 fs.writeFileSync(fullPath,'changed');assert.throws(()=>readArtifact(root),/synchronized/);
// [VI dòng gốc 13] gọi write('window.test=true;', '../other.js') | gọi assert.throws(()=>readArtifact(root), /path/) để kiểm tra đoạn mã có ném lỗi như dự kiến
 write('window.test=true;','../other.js');assert.throws(()=>readArtifact(root),/path/);
// [VI dòng gốc 14] gọi write('invalid javascript {') | gọi assert.throws(()=>readArtifact(root), SyntaxError) để kiểm tra đoạn mã có ném lỗi như dự kiến
 write('invalid javascript {');assert.throws(()=>readArtifact(root),SyntaxError);
// [VI dòng gốc 15] Duyệt từng giá trị trong ['runtime-v1.js','build.cjs','test.cjs','TEST_PROJECT.cjs','live/core.cjs','src/30-tienvi-goals.js','android/loader.js','edge-addon/background.js','edge-addon/native/host.cjs'] bằng const f. | Khai báo biến không gán lại bằng const: f (chưa gán giá trị) | gọi assert(isWatchedSource(f)) để kiểm tra điều kiện của bài test
 for(const f of ['runtime-v1.js','build.cjs','test.cjs','TEST_PROJECT.cjs','live/core.cjs','src/30-tienvi-goals.js','android/loader.js','edge-addon/background.js','edge-addon/native/host.cjs'])assert(isWatchedSource(f));
// [VI dòng gốc 16] Duyệt từng giá trị trong ['KVPV_V1_FULL.js','MANIFEST.json','README.md','edge-addon/core.js','android/KVPV_ANDROID.user.js','edge-addon/native/com.kvpv.localwatch.json'] bằng const f. | Khai báo biến không gán lại bằng const: f (chưa gán giá trị) | gọi assert(!isWatchedSource(f), 'generated outputs must not trigger a build loop') để kiểm tra điều kiện của bài test
 for(const f of ['KVPV_V1_FULL.js','MANIFEST.json','README.md','edge-addon/core.js','android/KVPV_ANDROID.user.js','edge-addon/native/com.kvpv.localwatch.json'])assert(!isWatchedSource(f),'generated outputs must not trigger a build loop');
// [VI dòng gốc 17] Khai báo biến không gán lại bằng const: addon = gọi JSON.parse(fs.readFileSync(__dirname+'/edge-addon/manifest.json','utf8')) để phân tích dữ liệu đầu vào theo API đang gọi
 const addon=JSON.parse(fs.readFileSync(__dirname+'/edge-addon/manifest.json','utf8'));
// [VI dòng gốc 18] gọi assert.match(extensionId(addon.key), /^[a-p]{32}$/)
 assert.match(extensionId(addon.key),/^[a-p]{32}$/);
// [VI dòng gốc 19] Khai báo biến không gán lại bằng const: built = gọi JSON.parse(fs.readFileSync(__dirname+'/MANIFEST.json','utf8')) để phân tích dữ liệu đầu vào theo API đang gọi
 const built=JSON.parse(fs.readFileSync(__dirname+'/MANIFEST.json','utf8'));
// [VI dòng gốc 20] gọi assert.equal(new Set(built.liveModules).size, built.liveModules.length) để kiểm tra hai giá trị bằng nhau
 assert.equal(new Set(built.liveModules).size,built.liveModules.length);
// [VI dòng gốc 21] gọi assert(built.liveModules.every(file=>built.modules.includes(file))) để kiểm tra điều kiện của bài test
 assert(built.liveModules.every(file=>built.modules.includes(file)));
// [VI dòng gốc 22] gọi assert(!built.liveModules.includes('04-engine.js'), 'hot reload must preserve legacy Daily workers') để kiểm tra điều kiện của bài test
 assert(!built.liveModules.includes('04-engine.js'),'hot reload must preserve legacy Daily workers');
// [VI dòng gốc 23] gọi assert(built.liveModules.includes('23-beast-island.js')) để kiểm tra điều kiện của bài test
 assert(built.liveModules.includes('23-beast-island.js'));
// [VI dòng gốc 24] gọi console.log('PASS shared project: manifest path/hash/syntax checks, no generated-file build loop, stable addon ID, live module membe…)
 console.log('PASS shared project: manifest path/hash/syntax checks, no generated-file build loop, stable addon ID, live module membership');
// [VI dòng gốc 25] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: }finally{
}finally{
// [VI dòng gốc 26] Duyệt từng giá trị trong [fullPath,manifestPath] bằng const file. | Khai báo biến không gán lại bằng const: file (chưa gán giá trị) | Kiểm tra fs.existsSync(file): đúng thì chạy nhánh sau if. | gọi fs.unlinkSync(file) để xóa một tệp
 for(const file of [fullPath,manifestPath])if(fs.existsSync(file))fs.unlinkSync(file);
// [VI dòng gốc 27] gọi fs.rmdirSync(root)
 fs.rmdirSync(root);
// [VI dòng gốc 28] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 29] Dòng trống để tách các phần, không có lệnh thực thi.
