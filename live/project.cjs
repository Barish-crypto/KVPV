// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: Một nơi đọc artifact đã build: xác thực đường dẫn, SHA-256 và cú pháp. [đóng chú thích]
/* Một nơi đọc artifact đã build: xác thực đường dẫn, SHA-256 và cú pháp. */
// [VI dòng gốc 2] "use strict"
'use strict';
// [VI dòng gốc 3] Khai báo biến không gán lại bằng const: fs = gọi require('node:fs') để nạp module Node.js
const fs = require('node:fs');
// [VI dòng gốc 4] Khai báo biến không gán lại bằng const: path = gọi require('node:path') để nạp module Node.js
const path = require('node:path');
// [VI dòng gốc 5] Khai báo biến không gán lại bằng const: crypto = gọi require('node:crypto') để nạp module Node.js
const crypto = require('node:crypto');
// [VI dòng gốc 6] Khai báo biến không gán lại bằng const: vm = gọi require('node:vm') để nạp module Node.js
const vm = require('node:vm');
// [VI dòng gốc 7] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 8] Định nghĩa hàm readArtifact; tham số: root
function readArtifact(root) {
// [VI dòng gốc 9] Khai báo biến không gán lại bằng const: manifest = gọi JSON.parse(fs.readFileSync(path.join(root, 'MANIFEST.json'), 'utf8')) để phân tích dữ liệu đầu vào theo API đang gọi
  const manifest = JSON.parse(fs.readFileSync(path.join(root, 'MANIFEST.json'), 'utf8'));
// [VI dòng gốc 10] Kiểm tra manifest.file !== 'KVPV_V1_FULL.js': đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('Invalid FULL path')
  if (manifest.file !== 'KVPV_V1_FULL.js') throw Error('Invalid FULL path');
// [VI dòng gốc 11] Khai báo biến không gán lại bằng const: bytes = gọi fs.readFileSync(path.join(root, manifest.file)) để đọc tệp đồng bộ
  const bytes = fs.readFileSync(path.join(root, manifest.file));
// [VI dòng gốc 12] Khai báo biến không gán lại bằng const: sha256 = gọi crypto.createHash('sha256').update(bytes).digest('hex')
  const sha256 = crypto.createHash('sha256').update(bytes).digest('hex');
// [VI dòng gốc 13] Kiểm tra sha256 !== manifest.sha256: đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('FULL/manifest not synchronized')
  if (sha256 !== manifest.sha256) throw Error('FULL/manifest not synchronized');
// [VI dòng gốc 14] Khai báo biến không gán lại bằng const: full = gọi bytes.toString('utf8') để function toString() { [native code] }
  const full = bytes.toString('utf8');
// [VI dòng gốc 15] tạo đối tượng bằng vm.Script(full, {filename: manifest.file})
  new vm.Script(full, {filename: manifest.file});
// [VI dòng gốc 16] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm build, sha256, bytes, full.
  return {build: manifest.buildId, sha256, bytes, full};
// [VI dòng gốc 17] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 18] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 19] Định nghĩa hàm extensionId; tham số: key
function extensionId(key) {
// [VI dòng gốc 20] Khai báo biến không gán lại bằng const: digest = gọi crypto.createHash('sha256').update(Buffer.from(key, 'base64')).digest()
  const digest = crypto.createHash('sha256').update(Buffer.from(key, 'base64')).digest();
// [VI dòng gốc 21] Kết thúc hàm hiện tại và trả về: gọi Array.from(digest.subarray(0, 16), byte => String.fromCharCode(97 + (byte >> 4), 97 + (byte & 15))).join('').
  return Array.from(digest.subarray(0, 16), byte =>
// [VI dòng gốc 22] gọi String.fromCharCode(97 + (byte >> 4), 97 + (byte & 15))
    String.fromCharCode(97 + (byte >> 4), 97 + (byte & 15))).join('');
// [VI dòng gốc 23] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 24] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 25] Định nghĩa hàm isWatchedSource; tham số: file
function isWatchedSource(file) {
// [VI dòng gốc 26] Kiểm tra String(file).replace(/\\/g,'/')==='windows-app/control-schema.json': đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: true.
  if(String(file).replace(/\\/g,'/')==='windows-app/control-schema.json')return true;
// [VI dòng gốc 27] gán file bằng String(file).replace(/\\/g,'/')
  file=String(file).replace(/\\/g,'/');
// [VI dòng gốc 28] Kiểm tra ['core.js','KVPV_ANDROID.user.js','com.kvpv.localwatch.json'].includes(path.basename(file)): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: false.
  if(['core.js','KVPV_ANDROID.user.js','com.kvpv.localwatch.json'].includes(path.basename(file)))return false;
// [VI dòng gốc 29] Kiểm tra /^(?:src|live|android|edge-addon(?:\/native)?)\/[^/]+\.(?:js|cjs|json|cs|html)$/.test(file): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: true.
  if(/^(?:src|live|android|edge-addon(?:\/native)?)\/[^/]+\.(?:js|cjs|json|cs|html)$/.test(file))return true;
// [VI dòng gốc 30] Kết thúc hàm hiện tại và trả về: ['runtime-v1.js', 'build.cjs', 'build-edge-addon.cjs', 'build-android.cjs', 'test.cjs'].includes(String(file)) hoặc dùng vế phải khi vế trái falsy: /^TEST_.*\.cjs$/.test(String(file)).
  return ['runtime-v1.js', 'build.cjs', 'build-edge-addon.cjs', 'build-android.cjs', 'test.cjs'].includes(String(file)) ||
// [VI dòng gốc 31] gọi /^TEST_.*\.cjs$/.test(String(file)) | gọi String(file) để chuyển sang chuỗi
    /^TEST_.*\.cjs$/.test(String(file));
// [VI dòng gốc 32] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 33] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 34] Định nghĩa hàm watchSources; tham số: root, onChange
function watchSources(root,onChange){
// [VI dòng gốc 35] Kết thúc hàm hiện tại và trả về: gọi ['', 'src', 'live', 'android', 'edge-addon', 'edge-addon/native', 'windows-app'].filter(dir=>fs.existsSync(path.join(root,dir))) .map(dir=>fs.watch(path.join(root,dir),(event,file)=>{if(file&&isWatchedSource(dir?dir+'/'+file:file))onChange();})) để biến đổi từng phần tử.
  return ['', 'src', 'live', 'android', 'edge-addon', 'edge-addon/native', 'windows-app'].filter(dir=>fs.existsSync(path.join(root,dir)))
// [VI dòng gốc 36] Kiểm tra file&&isWatchedSource(dir?dir+'/'+file:file): đúng thì chạy nhánh sau if. | gọi onChange()
    .map(dir=>fs.watch(path.join(root,dir),(event,file)=>{if(file&&isWatchedSource(dir?dir+'/'+file:file))onChange();}));
// [VI dòng gốc 37] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 38] gán module.exports bằng {readArtifact, extensionId, isWatchedSource, watchSources}
module.exports = {readArtifact, extensionId, isWatchedSource, watchSources};
// [VI dòng gốc 39] Dòng trống để tách các phần, không có lệnh thực thi.
