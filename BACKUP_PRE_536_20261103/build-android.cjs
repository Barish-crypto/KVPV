// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: Đóng gói FULL ngoại tuyến cho Tampermonkey; không tải mã từ máy chủ bên ngoài. [đóng chú thích]
/* Đóng gói FULL ngoại tuyến cho Tampermonkey; không tải mã từ máy chủ bên ngoài. */
// [VI dòng gốc 2] "use strict"
'use strict';
// [VI dòng gốc 3] Khai báo biến không gán lại bằng const: fs = gọi require('node:fs') để nạp module Node.js; path = gọi require('node:path') để nạp module Node.js; vm = gọi require('node:vm') để nạp module Node.js
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
// [VI dòng gốc 4] Khai báo biến không gán lại bằng const: {readArtifact} = gọi require('./live/project.cjs') để nạp module Node.js
const {readArtifact}=require('./live/project.cjs');
// [VI dòng gốc 5] Khai báo biến không gán lại bằng const: {probe} = gọi require('./live/core.cjs') để nạp module Node.js
const {probe}=require('./live/core.cjs');
// [VI dòng gốc 6] Khai báo biến không gán lại bằng const: root = __dirname; artifact = gọi readArtifact(root); dir = gọi path.join(root, 'android')
const root=__dirname,artifact=readArtifact(root),dir=path.join(root,'android');
// [VI dòng gốc 7] gọi fs.mkdirSync(dir, {recursive:true}) để tạo thư mục
fs.mkdirSync(dir,{recursive:true});
// [VI dòng gốc 8] Khai báo biến không gán lại bằng const: loader = gọi fs.readFileSync(path.join(dir,'loader.js'), 'utf8') để đọc tệp đồng bộ
const loader=fs.readFileSync(path.join(dir,'loader.js'),'utf8');
// [VI dòng gốc 9] Nội dung nguyên văn của chuỗi mẫu; đây là dữ liệu trong chuỗi, không phải lệnh đang chạy.
const metadata=`// ==UserScript==
// @name         KVPV FULL Android
// @namespace    kvpv.local.android
// @version      1.0.1
// @description  FULL ngoại tuyến; chỉ khởi động trong frame game Kiếm Vũ Phong Vân 1046. Build ${artifact.build}
// @match        http://*/*
// @match        https://*/*
// @run-at       document-idle
// @grant        none
// @sandbox      raw
// @updateURL    none
// ==/UserScript==
`;
// [VI dòng gốc 22] Khai báo biến không gán lại bằng const: source = tính biểu thức metadata+loader.replace('[mở chú thích] BUILD_ID [đóng chú thích]',JSON.stringify(artifact.build)) .replace('[mở chú thích] READINESS [đóng chú thích]',probe).replace('[mở chú thích] FULL_BUNDLE [đóng chú thích]',artifact.full)
const source=metadata+loader.replace('/* BUILD_ID */',JSON.stringify(artifact.build))
// [VI dòng gốc 23] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng .. Đọc cùng dòng mở phía trên: .replace('[mở chú thích] READINESS [đóng chú thích]',probe).replace('[mở chú thích] FULL_BUNDLE [đóng chú thích]',artifact.full);
  .replace('/* READINESS */',probe).replace('/* FULL_BUNDLE */',artifact.full);
// [VI dòng gốc 24] tạo đối tượng bằng vm.Script(source, {filename:'KVPV_ANDROID.user.js'})
new vm.Script(source,{filename:'KVPV_ANDROID.user.js'});
// [VI dòng gốc 25] gọi fs.writeFileSync(path.join(dir,'KVPV_ANDROID.user.js'), source) để ghi tệp đồng bộ
fs.writeFileSync(path.join(dir,'KVPV_ANDROID.user.js'),source);
// [VI dòng gốc 26] Chú thích gốc của tác giả; không được thực thi. Nội dung: ZIP một tệp, không nén: Tampermonkey nhập trực tiếp, không cần thư viện ngoài.
// ZIP một tệp, không nén: Tampermonkey nhập trực tiếp, không cần thư viện ngoài.
// [VI dòng gốc 27] Khai báo biến không gán lại bằng const: data = gọi Buffer.from(source); name = gọi Buffer.from('KVPV_ANDROID.user.js')
const data=Buffer.from(source),name=Buffer.from('KVPV_ANDROID.user.js');
// [VI dòng gốc 28] Khai báo biến không gán lại bằng const: crc = gọi require('node:zlib').crc32(data)
const crc=require('node:zlib').crc32(data);
// [VI dòng gốc 29] Khai báo biến không gán lại bằng const: local = gọi Buffer.alloc(30) | gọi local.writeUInt32LE(0x04034b50) | gọi local.writeUInt16LE(20, 4)
const local=Buffer.alloc(30);local.writeUInt32LE(0x04034b50);local.writeUInt16LE(20,4);
// [VI dòng gốc 30] gọi local.writeUInt32LE(crc, 14) | gọi local.writeUInt32LE(data.length, 18) | gọi local.writeUInt32LE(data.length, 22) | gọi local.writeUInt16LE(name.length, 26)
local.writeUInt32LE(crc,14);local.writeUInt32LE(data.length,18);local.writeUInt32LE(data.length,22);local.writeUInt16LE(name.length,26);
// [VI dòng gốc 31] Khai báo biến không gán lại bằng const: central = gọi Buffer.alloc(46) | gọi central.writeUInt32LE(0x02014b50) | gọi central.writeUInt16LE(20, 4) | gọi central.writeUInt16LE(20, 6)
const central=Buffer.alloc(46);central.writeUInt32LE(0x02014b50);central.writeUInt16LE(20,4);central.writeUInt16LE(20,6);
// [VI dòng gốc 32] gọi central.writeUInt32LE(crc, 16) | gọi central.writeUInt32LE(data.length, 20) | gọi central.writeUInt32LE(data.length, 24) | gọi central.writeUInt16LE(name.length, 28)
central.writeUInt32LE(crc,16);central.writeUInt32LE(data.length,20);central.writeUInt32LE(data.length,24);central.writeUInt16LE(name.length,28);
// [VI dòng gốc 33] Khai báo biến không gán lại bằng const: end = gọi Buffer.alloc(22) | gọi end.writeUInt32LE(0x06054b50) | gọi end.writeUInt16LE(1, 8) | gọi end.writeUInt16LE(1, 10)
const end=Buffer.alloc(22);end.writeUInt32LE(0x06054b50);end.writeUInt16LE(1,8);end.writeUInt16LE(1,10);
// [VI dòng gốc 34] gọi end.writeUInt32LE(central.length+name.length, 12) | gọi end.writeUInt32LE(local.length+name.length+data.length, 16)
end.writeUInt32LE(central.length+name.length,12);end.writeUInt32LE(local.length+name.length+data.length,16);
// [VI dòng gốc 35] gọi fs.writeFileSync(path.join(dir,'KVPV_ANDROID.zip'), Buffer.concat([local,name,data,central,name,end])) để ghi tệp đồng bộ
fs.writeFileSync(path.join(dir,'KVPV_ANDROID.zip'),Buffer.concat([local,name,data,central,name,end]));
// [VI dòng gốc 36] gọi console.log('Built Android userscript + import ZIP '+artifact.build)
console.log('Built Android userscript + import ZIP '+artifact.build);
// [VI dòng gốc 37] Dòng trống để tách các phần, không có lệnh thực thi.
