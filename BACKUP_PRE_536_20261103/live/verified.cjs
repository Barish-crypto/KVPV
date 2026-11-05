// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: Cache only successful suites for an exact source digest + exact artifact hash.
/* Cache only successful suites for an exact source digest + exact artifact hash.
 * Shared by all browser hosts. The receipt never substitutes syntax/SHA checks. */
// [VI dòng gốc 3] "use strict"
'use strict';
// [VI dòng gốc 4] Khai báo biến không gán lại bằng const: fs = gọi require('node:fs') để nạp module Node.js; path = gọi require('node:path') để nạp module Node.js; crypto = gọi require('node:crypto') để nạp module Node.js
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
// [VI dòng gốc 5] Khai báo biến không gán lại bằng const: {readArtifact} = gọi require('./project.cjs') để nạp module Node.js
const {readArtifact}=require('./project.cjs');
// [VI dòng gốc 6] Định nghĩa hàm sourceDigest; tham số: root
function sourceDigest(root){
// [VI dòng gốc 7] Khai báo biến không gán lại bằng const: files = tạo mảng gồm 0 vị trí: []
 const files=[];
// [VI dòng gốc 8] Duyệt từng giá trị trong fs.readdirSync(root) bằng const name. | Khai báo biến không gán lại bằng const: name (chưa gán giá trị) | Kiểm tra /^(?:runtime-v1\.js|build(?:-[\w-]+)?\.cjs|test\.cjs|TEST_.*\.cjs)$/.test(name): đúng thì chạy nhánh sau if. | gọi files.push(name) để thêm phần tử vào cuối mảng
 for(const name of fs.readdirSync(root))if(/^(?:runtime-v1\.js|build(?:-[\w-]+)?\.cjs|test\.cjs|TEST_.*\.cjs)$/.test(name))files.push(name);
// [VI dòng gốc 9] Duyệt từng giá trị trong ['src','live','android','edge-addon','edge-addon/native'] bằng const dir. | Khai báo biến không gán lại bằng const: dir (chưa gán giá trị)
 for(const dir of ['src','live','android','edge-addon','edge-addon/native']){
// [VI dòng gốc 10] Khai báo biến không gán lại bằng const: folder = gọi path.join(root, dir) | Kiểm tra !fs.existsSync(folder): đúng thì chạy nhánh sau if. | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
  const folder=path.join(root,dir);if(!fs.existsSync(folder))continue;
// [VI dòng gốc 11] Duyệt từng giá trị trong fs.readdirSync(folder) bằng const name. | Khai báo biến không gán lại bằng const: name (chưa gán giá trị) | Kiểm tra /\.(?:js|cjs|json|cs|html)$/.test(name)&& !['core.js','KVPV_ANDROID.user.js','com.kvpv.localwatch.json'].includes(name): đúng thì chạy nhánh sau if.
  for(const name of fs.readdirSync(folder))if(/\.(?:js|cjs|json|cs|html)$/.test(name)&&
// [VI dòng gốc 12] gọi files.push(dir+'/'+name) để thêm phần tử vào cuối mảng
   !['core.js','KVPV_ANDROID.user.js','com.kvpv.localwatch.json'].includes(name))files.push(dir+'/'+name);
// [VI dòng gốc 13] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
 }
// [VI dòng gốc 14] Khai báo biến không gán lại bằng const: hash = gọi crypto.createHash('sha256')
 const hash=crypto.createHash('sha256');
// [VI dòng gốc 15] Duyệt từng giá trị trong files.sort() bằng const name. | Khai báo biến không gán lại bằng const: name (chưa gán giá trị) | gọi hash.update(name+'\0') | gọi hash.update(fs.readFileSync(path.join(root,name)))
 for(const name of files.sort()){hash.update(name+'\0');hash.update(fs.readFileSync(path.join(root,name)));hash.update('\0');}
// [VI dòng gốc 16] Kết thúc hàm hiện tại và trả về: gọi hash.digest('hex').
 return hash.digest('hex');
// [VI dòng gốc 17] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 18] Định nghĩa hàm cached; tham số: root, digest=sourceDigest(root)
function cached(root,digest=sourceDigest(root)){
// [VI dòng gốc 19] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | Khai báo biến không gán lại bằng const: r = gọi JSON.parse(fs.readFileSync(path.join(root,'.kvpv-live','verified.json'),'utf8')) để phân tích dữ liệu đầu vào theo API đang gọi
 try{const r=JSON.parse(fs.readFileSync(path.join(root,'.kvpv-live','verified.json'),'utf8'));
// [VI dòng gốc 20] Kiểm tra r.digest!==digest: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: null. | Khai báo biến không gán lại bằng const: artifact = gọi readArtifact(root)
  if(r.digest!==digest)return null;const artifact=readArtifact(root);
// [VI dòng gốc 21] Kết thúc hàm hiện tại và trả về: nếu artifact.sha256===r.sha256&&artifact.build===r.build thì lấy artifact, ngược lại lấy null.
  return artifact.sha256===r.sha256&&artifact.build===r.build?artifact:null;
// [VI dòng gốc 22] Nhận lỗi bằng _ và chạy phần xử lý lỗi. | Kết thúc hàm hiện tại và trả về: null.
 }catch(_){return null;}
// [VI dòng gốc 23] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 24] Định nghĩa hàm record; tham số: root, digest
function record(root,digest){
// [VI dòng gốc 25] Kiểm tra sourceDigest(root)!==digest: đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('Source changed during tests; waiting for latest save')
 if(sourceDigest(root)!==digest)throw Error('Source changed during tests; waiting for latest save');
// [VI dòng gốc 26] Khai báo biến không gán lại bằng const: artifact = gọi readArtifact(root); dir = gọi path.join(root, '.kvpv-live') | gọi fs.mkdirSync(dir, {recursive:true}) để tạo thư mục
 const artifact=readArtifact(root),dir=path.join(root,'.kvpv-live');fs.mkdirSync(dir,{recursive:true});
// [VI dòng gốc 27] Khai báo biến không gán lại bằng const: tmp = gọi path.join(dir, 'verified-'+process.pid+'.tmp')
 const tmp=path.join(dir,'verified-'+process.pid+'.tmp');
// [VI dòng gốc 28] gọi fs.writeFileSync(tmp, JSON.stringify({digest,build:artifact.build,sha256:artifact.sha256,verifiedAt:Date.now()})) để ghi tệp đồng bộ
 fs.writeFileSync(tmp,JSON.stringify({digest,build:artifact.build,sha256:artifact.sha256,verifiedAt:Date.now()}));
// [VI dòng gốc 29] gọi fs.renameSync(tmp, path.join(dir,'verified.json')) để đổi tên hoặc thay thế tệp | Kết thúc hàm hiện tại và trả về: artifact.
 fs.renameSync(tmp,path.join(dir,'verified.json'));return artifact;
// [VI dòng gốc 30] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 31] gán module.exports bằng {sourceDigest,cached,record}
module.exports={sourceDigest,cached,record};
// [VI dòng gốc 32] Dòng trống để tách các phần, không có lệnh thực thi.
