// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: Diagnostics are untrusted data. Fixed directory, digit-only actor filename,
/* Diagnostics are untrusted data. Fixed directory, digit-only actor filename,
 * bounded JSON, atomic replacement. No commands, source files or path input. */
// [VI dòng gốc 3] "use strict"
'use strict';
// [VI dòng gốc 4] Khai báo biến không gán lại bằng const: fs = gọi require('node:fs') để nạp module Node.js; path = gọi require('node:path') để nạp module Node.js
const fs=require('node:fs'),path=require('node:path');
// [VI dòng gốc 5] Định nghĩa hàm saveDiagnostics; tham số: root, report
function saveDiagnostics(root,report){
// [VI dòng gốc 6] Kiểm tra !report||report.schema!==1||!/^[1-9]\d{4,24}$/.test(String(report.actor))|| !Array.isArray(report.missing)||!Array.isArray(report.reborn?.tasks)||!Array.isArray(report.tienVi)|| re…: đúng thì chạy nhánh sau if.
 if(!report||report.schema!==1||!/^[1-9]\d{4,24}$/.test(String(report.actor))||
// [VI dòng gốc 7] gọi Array.isArray(report.missing) | gọi Array.isArray(report.reborn?.tasks) | gọi Array.isArray(report.tienVi)
   !Array.isArray(report.missing)||!Array.isArray(report.reborn?.tasks)||!Array.isArray(report.tienVi)||
// [VI dòng gốc 8] Kết thúc hàm hiện tại và trả về: false.
   report.missing.length>80||report.reborn.tasks.length>20||report.tienVi.length>80)return false;
// [VI dòng gốc 9] Khai báo biến không gán lại bằng const: json = gọi JSON.stringify(report, null, 2) để chuyển giá trị thành chuỗi JSON | Kiểm tra Buffer.byteLength(json,'utf8')>128*1024: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: false.
 const json=JSON.stringify(report,null,2);if(Buffer.byteLength(json,'utf8')>128*1024)return false;
// [VI dòng gốc 10] Khai báo biến không gán lại bằng const: dir = gọi path.join(root, '.kvpv-live', 'diagnostics') | gọi fs.mkdirSync(dir, {recursive:true}) để tạo thư mục
 const dir=path.join(root,'.kvpv-live','diagnostics');fs.mkdirSync(dir,{recursive:true});
// [VI dòng gốc 11] Khai báo biến không gán lại bằng const: file = gọi path.join(dir, String(report.actor)+'.json'); tmp = gọi path.join(dir, String(report.actor)+'-'+process.pid+'.tmp')
 const file=path.join(dir,String(report.actor)+'.json'),tmp=path.join(dir,String(report.actor)+'-'+process.pid+'.tmp');
// [VI dòng gốc 12] gọi fs.writeFileSync(tmp, json+'\n') để ghi tệp đồng bộ | gọi fs.renameSync(tmp, file) để đổi tên hoặc thay thế tệp | Kết thúc hàm hiện tại và trả về: true.
 fs.writeFileSync(tmp,json+'\n');fs.renameSync(tmp,file);return true;
// [VI dòng gốc 13] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 14] gán module.exports bằng {saveDiagnostics}
module.exports={saveDiagnostics};
// [VI dòng gốc 15] Dòng trống để tách các phần, không có lệnh thực thi.
