// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: Only fresh, bounded observations from fixed local diagnostic files. No commands. [đóng chú thích]
/* Only fresh, bounded observations from fixed local diagnostic files. No commands. */
// [VI dòng gốc 2] "use strict"
'use strict';
// [VI dòng gốc 3] Khai báo biến không gán lại bằng const: fs = gọi require('node:fs') để nạp module Node.js; path = gọi require('node:path') để nạp module Node.js
const fs=require('node:fs'),path=require('node:path');
// [VI dòng gốc 4] Định nghĩa hàm readPartyPeers; tham số: root, now=Date.now()
function readPartyPeers(root,now=Date.now()){
// [VI dòng gốc 5] Khai báo biến không gán lại bằng const: dir = gọi path.join(root, '.kvpv-live', 'diagnostics'); rows = tạo mảng gồm 0 vị trí: []
 const dir=path.join(root,'.kvpv-live','diagnostics'),rows=[];
// [VI dòng gốc 6] Khai báo biến có thể gán lại bằng let: files (chưa gán giá trị) | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | gán files bằng fs.readdirSync(dir) | Nhận lỗi bằng _ và chạy phần xử lý lỗi.
 let files;try{files=fs.readdirSync(dir);}catch(_){return rows;}
// [VI dòng gốc 7] Duyệt từng giá trị trong files.filter(n=>/^[1-9]\d{4,24}\.json$/.test(n)).slice(0,64) bằng const name. | Khai báo biến không gán lại bằng const: name (chưa gán giá trị) | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài.
 for(const name of files.filter(n=>/^[1-9]\d{4,24}\.json$/.test(n)).slice(0,64))try{
// [VI dòng gốc 8] Khai báo biến không gán lại bằng const: file = gọi path.join(dir, name); st = gọi fs.lstatSync(file)
  const file=path.join(dir,name),st=fs.lstatSync(file);
// [VI dòng gốc 9] Kiểm tra !st.isFile()||st.isSymbolicLink()||st.size>128*1024||now-st.mtimeMs>15000: đúng thì chạy nhánh sau if. | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
  if(!st.isFile()||st.isSymbolicLink()||st.size>128*1024||now-st.mtimeMs>15000)continue;
// [VI dòng gốc 10] Khai báo biến không gán lại bằng const: report = gọi JSON.parse(fs.readFileSync(file,'utf8')) để phân tích dữ liệu đầu vào theo API đang gọi; p = đọc report.teamCoordinator?.self nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  const report=JSON.parse(fs.readFileSync(file,'utf8')),p=report.teamCoordinator?.self;
// [VI dòng gốc 11] Kiểm tra report.schema!==1||String(report.actor)+'.json'!==name||!Number.isFinite(report.at)||now-report.at>15000||report.at>now+2000||!p||String(p.actor)!==String(report.actor)||!Number.is…: đúng thì chạy nhánh sau if. | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
  if(report.schema!==1||String(report.actor)+'.json'!==name||!Number.isFinite(report.at)||now-report.at>15000||report.at>now+2000||!p||String(p.actor)!==String(report.actor)||!Number.isFinite(p.at)||now-p.at>15000||p.at>now+2000||!Number.isFinite(p.power)||p.power<=0||!Array.isArray(p.quotas)||p.quotas.length>8)continue;
// [VI dòng gốc 12] gọi rows.push({actor:String(p.actor),power:p.power,at:p.at,idle:p.idle===true,quotas:p.quotas,session:p.session??null}) để thêm phần tử vào cuối mảng
  rows.push({actor:String(p.actor),power:p.power,at:p.at,idle:p.idle===true,quotas:p.quotas,session:p.session??null});
// [VI dòng gốc 13] Kiểm tra rows.length===32: đúng thì chạy nhánh sau if. | Thoát vòng lặp/switch hiện tại.
  if(rows.length===32)break;
// [VI dòng gốc 14] Nhận lỗi bằng _ và chạy phần xử lý lỗi.
 }catch(_){}
// [VI dòng gốc 15] Kết thúc hàm hiện tại và trả về: rows.
 return rows;
// [VI dòng gốc 16] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 17] gán module.exports bằng {readPartyPeers}
module.exports={readPartyPeers};
// [VI dòng gốc 18] Dòng trống để tách các phần, không có lệnh thực thi.
