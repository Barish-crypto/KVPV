// [VI dòng gốc 1] "use strict"
'use strict';
// [VI dòng gốc 2] Định nghĩa hàm packet; tham số: message | Khai báo biến không gán lại bằng const: body = gọi Buffer.from(JSON.stringify(message), 'utf8') | Kiểm tra body.length>1024*1024: đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('Native message too large')
function packet(message){const body=Buffer.from(JSON.stringify(message),'utf8');if(body.length>1024*1024)throw Error('Native message too large');const header=Buffer.alloc(4);header.writeUInt32LE(body.length);return Buffer.concat([header,body]);}
// [VI dòng gốc 3] Định nghĩa hàm payloadPackets; tham số: p | Khai báo biến không gán lại bằng const: size = tính biểu thức 128*1024 | yield {type:'begin',build:p.build,sha256:p.sha256,bytes:p.bytes.length,chunks:Math.ceil(p.bytes.length/size)}
function* payloadPackets(p){const size=128*1024;yield {type:'begin',build:p.build,sha256:p.sha256,bytes:p.bytes.length,chunks:Math.ceil(p.bytes.length/size)};
// [VI dòng gốc 4] Lặp for: khởi tạo let i=0; tiếp tục khi i<p.bytes.length; sau mỗi vòng i+=size. | Khai báo biến có thể gán lại bằng let: i = 0 | yield {type:'chunk',sha256:p.sha256,index:i/size,data:p.bytes.subarray(i,i+size).toString('base64')} | yield {type:'end',sha256:p.sha256}
 for(let i=0;i<p.bytes.length;i+=size)yield {type:'chunk',sha256:p.sha256,index:i/size,data:p.bytes.subarray(i,i+size).toString('base64')};yield {type:'end',sha256:p.sha256};}
// [VI dòng gốc 5] Định nghĩa lớp Parser. | gán this.onMessage bằng onMessage | gán this.buffer bằng Buffer.alloc(0) | gán this.buffer bằng Buffer.concat([this.buffer,chunk])
class Parser{constructor(onMessage){this.onMessage=onMessage;this.buffer=Buffer.alloc(0);}push(chunk){this.buffer=Buffer.concat([this.buffer,chunk]);
// [VI dòng gốc 6] Lặp khi điều kiện còn đúng: this.buffer.length>=4 | Khai báo biến không gán lại bằng const: n = gọi this.buffer.readUInt32LE() | Kiểm tra n>1024*1024: đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('Input message too large')
 while(this.buffer.length>=4){const n=this.buffer.readUInt32LE();if(n>1024*1024)throw Error('Input message too large');if(this.buffer.length<n+4)return;
// [VI dòng gốc 7] Khai báo biến không gán lại bằng const: message = gọi JSON.parse(this.buffer.subarray(4,n+4).toString('utf8')) để phân tích dữ liệu đầu vào theo API đang gọi | gán this.buffer bằng this.buffer.subarray(n+4) | Kiểm tra !message||typeof message!=='object': đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('Invalid message')
 const message=JSON.parse(this.buffer.subarray(4,n+4).toString('utf8'));this.buffer=this.buffer.subarray(n+4);if(!message||typeof message!=='object')throw Error('Invalid message');this.onMessage(message);}}}
// [VI dòng gốc 8] gán module.exports bằng {packet,payloadPackets,Parser}
module.exports={packet,payloadPackets,Parser};
// [VI dòng gốc 9] Dòng trống để tách các phần, không có lệnh thực thi.
