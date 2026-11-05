// [VI dòng gốc 1] "use strict"
'use strict';
// [VI dòng gốc 2] Khai báo biến không gán lại bằng const: fs = gọi require('node:fs') để nạp module Node.js; path = gọi require('node:path') để nạp module Node.js; crypto = gọi require('node:crypto') để nạp module Node.js; vm = gọi require('node:vm') để nạp module Node.js
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),vm=require('node:vm');
// [VI dòng gốc 3] Khai báo biến không gán lại bằng const: dir = gọi path.join(__dirname, 'edge-addon'); file = gọi path.join(dir, 'manifest.json'); manifest = gọi JSON.parse(fs.readFileSync(file,'utf8')) để phân tích dữ liệu đầu vào theo API đang gọi
const dir=path.join(__dirname,'edge-addon'),file=path.join(dir,'manifest.json'),manifest=JSON.parse(fs.readFileSync(file,'utf8'));
// [VI dòng gốc 4] Kiểm tra !manifest.key: đúng thì chạy nhánh sau if. | gán manifest.key bằng crypto.generateKeyPairSync('rsa',{modulusLength:2048}).publicKey.export({type:'spki',format:'der'}).toString('base64') | gọi fs.writeFileSync(file, JSON.stringify(manifest,null,2)+'\n') để ghi tệp đồng bộ
if(!manifest.key){manifest.key=crypto.generateKeyPairSync('rsa',{modulusLength:2048}).publicKey.export({type:'spki',format:'der'}).toString('base64');fs.writeFileSync(file,JSON.stringify(manifest,null,2)+'\n');}
// [VI dòng gốc 5] Khai báo biến không gán lại bằng const: source = gọi fs.readFileSync(path.join(__dirname,'live/core.cjs'), 'utf8') để đọc tệp đồng bộ
const source=fs.readFileSync(path.join(__dirname,'live/core.cjs'),'utf8');
// [VI dòng gốc 6] Khai báo biến không gán lại bằng const: core = tính biểu thức source.slice(source.indexOf('function gameURL('),source.indexOf('module.exports='))+'\nself.KVPV_EDGE_CORE={GameBridge,gameURL};\n'
const core=source.slice(source.indexOf('function gameURL('),source.indexOf('module.exports='))+'\nself.KVPV_EDGE_CORE={GameBridge,gameURL};\n';
// [VI dòng gốc 7] tạo đối tượng bằng vm.Script(core) | gọi fs.writeFileSync(path.join(dir,'core.js'), core) để ghi tệp đồng bộ
new vm.Script(core);fs.writeFileSync(path.join(dir,'core.js'),core);
// [VI dòng gốc 8] Duyệt từng giá trị trong ['background.js','popup.js','input-click.js'] bằng const f. | Khai báo biến không gán lại bằng const: f (chưa gán giá trị) | tạo đối tượng bằng vm.Script(fs.readFileSync(path.join(dir,f),'utf8'), {filename:f})
for(const f of ['background.js','popup.js'])new vm.Script(fs.readFileSync(path.join(dir,f),'utf8'),{filename:f});
// [VI dòng gốc 9] gọi console.log('Built Edge addon core')
console.log('Built Edge addon core');
// [VI dòng gốc 10] Dòng trống để tách các phần, không có lệnh thực thi.
