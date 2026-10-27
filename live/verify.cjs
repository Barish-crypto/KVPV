// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: One verification process for Edge/Chrome: concurrent hosts share a lock and
/* One verification process for Edge/Chrome: concurrent hosts share a lock and
 * reuse a successful suite only when every input and generated FULL still match. */
// [VI dòng gốc 3] "use strict"
'use strict';
// [VI dòng gốc 4] Khai báo biến không gán lại bằng const: fs = gọi require('node:fs') để nạp module Node.js; path = gọi require('node:path') để nạp module Node.js; {execFile} = gọi require('node:child_process') để nạp module Node.js
const fs=require('node:fs'),path=require('node:path'),{execFile}=require('node:child_process');
// [VI dòng gốc 5] Khai báo biến không gán lại bằng const: {sourceDigest,cached} = gọi require('./verified.cjs') để nạp module Node.js
const {sourceDigest,cached}=require('./verified.cjs');
// [VI dòng gốc 6] Khai báo biến không gán lại bằng const: root = gọi path.resolve(__dirname, '..'); dir = gọi path.join(root, '.kvpv-live'); lock = gọi path.join(dir, 'verify.lock')
const root=path.resolve(__dirname,'..'),dir=path.join(root,'.kvpv-live'),lock=path.join(dir,'verify.lock');
// [VI dòng gốc 7] gọi fs.mkdirSync(dir, {recursive:true}) để tạo thư mục
fs.mkdirSync(dir,{recursive:true});
// [VI dòng gốc 8] Khai báo biến không gán lại bằng const: pause = tạo hàm với tham số (không có); mỗi lần gọi trả về tạo đối tượng bằng Promise(resolve=>setTimeout(resolve,100))
const pause=()=>new Promise(resolve=>setTimeout(resolve,100));
// [VI dòng gốc 9] Định nghĩa hàm bất đồng bộ main; tham số: không có
async function main(){
// [VI dòng gốc 10] Khai báo biến không gán lại bằng const: deadline = tính biểu thức Date.now()+120000
 const deadline=Date.now()+120000;
// [VI dòng gốc 11] Lặp khi điều kiện còn đúng: Date.now()<deadline
 while(Date.now()<deadline){
// [VI dòng gốc 12] Kiểm tra fs.existsSync(path.join(dir,'maintenance.lock')): đúng thì chạy nhánh sau if. | chờ tác vụ bất đồng bộ: gọi pause() | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
  if(fs.existsSync(path.join(dir,'maintenance.lock'))){await pause();continue;}
// [VI dòng gốc 13] Khai báo biến không gán lại bằng const: digest = gọi sourceDigest(root); hit = gọi cached(root, digest)
  const digest=sourceDigest(root),hit=cached(root,digest);
// [VI dòng gốc 14] Kiểm tra hit: đúng thì chạy nhánh sau if. | gọi console.log('CACHED '+hit.build) | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  if(hit){console.log('CACHED '+hit.build);return;}
// [VI dòng gốc 15] Khai báo biến có thể gán lại bằng let: fd (chưa gán giá trị) | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | gán fd bằng fs.openSync(lock,'wx') | gọi fs.writeFileSync(fd, String(process.pid)) để ghi tệp đồng bộ
  let fd;try{fd=fs.openSync(lock,'wx');fs.writeFileSync(fd,String(process.pid));fs.closeSync(fd);}
// [VI dòng gốc 16] Nhận lỗi bằng e và chạy phần xử lý lỗi. | Kiểm tra e.code!=='EEXIST': đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: e
  catch(e){if(e.code!=='EEXIST')throw e;
// [VI dòng gốc 17] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | Khai báo biến không gán lại bằng const: pid = gọi Number(fs.readFileSync(lock,'utf8')) để chuyển sang số | Kiểm tra Number.isSafeInteger(pid)&&pid>0: đúng thì chạy nhánh sau if.
   try{const pid=Number(fs.readFileSync(lock,'utf8'));if(Number.isSafeInteger(pid)&&pid>0){try{process.kill(pid,0);}catch(error){if(error.code==='ESRCH')fs.unlinkSync(lock);}}}catch(_){}
// [VI dòng gốc 18] chờ tác vụ bất đồng bộ: gọi pause() | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
   await pause();continue;
// [VI dòng gốc 19] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 20] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài.
  try{
// [VI dòng gốc 21] Chú thích gốc của tác giả; không được thực thi. Nội dung: Another host may have finished between our cache read and lock acquisition.
   // Another host may have finished between our cache read and lock acquisition.
// [VI dòng gốc 22] Kiểm tra cached(root): đúng thì chạy nhánh sau if. | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
   if(cached(root))continue;
// [VI dòng gốc 23] chờ tác vụ bất đồng bộ: tạo đối tượng bằng Promise((resolve,reject)=>execFile(process.execPath,[path.join(root,'test.cjs')], {cwd:root,windowsHide:true,maxBuffer:1024*1024…)
   await new Promise((resolve,reject)=>execFile(process.execPath,[path.join(root,'test.cjs')],
// [VI dòng gốc 24] Thuộc tính cwd: root | Thuộc tính windowsHide: true | Thuộc tính maxBuffer: tính biểu thức 1024*1024
    {cwd:root,windowsHide:true,maxBuffer:1024*1024},(error,stdout,stderr)=>error?reject(Error(String(stderr||stdout||error.message).slice(-1600))):resolve()));
// [VI dòng gốc 25] Kiểm tra !cached(root): đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('Verification receipt missing or source changed')
   if(!cached(root))throw Error('Verification receipt missing or source changed');
// [VI dòng gốc 26] gọi console.log('VERIFIED '+cached(root).build) | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
   console.log('VERIFIED '+cached(root).build);return;
// [VI dòng gốc 27] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | Kiểm tra fs.readFileSync(lock,'utf8')===String(process.pid): đúng thì chạy nhánh sau if. | gọi fs.unlinkSync(lock) để xóa một tệp | Nhận lỗi bằng _ và chạy phần xử lý lỗi.
  }finally{try{if(fs.readFileSync(lock,'utf8')===String(process.pid))fs.unlinkSync(lock);}catch(_){}}
// [VI dòng gốc 28] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
 }
// [VI dòng gốc 29] Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('Verification busy for 120s; previous game build kept running')
 throw Error('Verification busy for 120s; previous game build kept running');
// [VI dòng gốc 30] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 31] gọi main().catch(e=>{console.error(e.message);process.exitCode=1;}) | gọi console.error(e.message) | gán process.exitCode bằng 1
main().catch(e=>{console.error(e.message);process.exitCode=1;});
// [VI dòng gốc 32] Dòng trống để tách các phần, không có lệnh thực thi.
