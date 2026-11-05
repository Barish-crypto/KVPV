// [VI dòng gốc 1] "use strict"
'use strict';
// [VI dòng gốc 2] Khai báo biến không gán lại bằng const: fs = gọi require('node:fs') để nạp module Node.js; path = gọi require('node:path') để nạp module Node.js; os = gọi require('node:os') để nạp module Node.js; assert = gọi require('node:assert/strict') để nạp module Node.js
const fs=require('node:fs'),path=require('node:path'),os=require('node:os'),assert=require('node:assert/strict');
// [VI dòng gốc 3] Khai báo biến không gán lại bằng const: {readPartyPeers} = gọi require('./live/party-relay.cjs') để nạp module Node.js
const {readPartyPeers}=require('./live/party-relay.cjs');
// [VI dòng gốc 4] Khai báo biến không gán lại bằng const: root = gọi fs.mkdtempSync(path.join(os.tmpdir(),'kvpv-party-relay-')); dir = gọi path.join(root, '.kvpv-live', 'diagnostics') | gọi fs.mkdirSync(dir, {recursive:true}) để tạo thư mục | Khai báo biến không gán lại bằng const: now = gọi Date.now()
const root=fs.mkdtempSync(path.join(os.tmpdir(),'kvpv-party-relay-')),dir=path.join(root,'.kvpv-live','diagnostics');fs.mkdirSync(dir,{recursive:true});const now=Date.now();
// [VI dòng gốc 5] Khai báo biến không gán lại bằng const: put = tạo hàm với tham số id, p={}; mỗi lần gọi trả về gọi fs.writeFileSync(path.join(dir,id+'.json'), JSON.stringify({schema:1,actor:id,at:now,teamCoordinator:{self:{actor:id,power:100,at:now,idl…) để ghi tệp đồng bộ
const put=(id,p={})=>fs.writeFileSync(path.join(dir,id+'.json'),JSON.stringify({schema:1,actor:id,at:now,teamCoordinator:{self:{actor:id,power:100,at:now,idle:true,quotas:[[2,1]],session:null}},...p}));
// [VI dòng gốc 6] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài.
try{
// [VI dòng gốc 7] gọi put('12345') | gọi put('12346', {at:now-16000}) | gọi put('12347', {actor:'99999'}) | gọi put('12348', {at:now+3000})
 put('12345');put('12346',{at:now-16000});put('12347',{actor:'99999'});put('12348',{at:now+3000});put('12349',{teamCoordinator:{self:{actor:'12349',at:now-16000,power:100,quotas:[]}}});
// [VI dòng gốc 8] gọi fs.writeFileSync(path.join(dir,'12350.json'), '{bad') để ghi tệp đồng bộ | gọi fs.writeFileSync(path.join(dir,'12351.json'), 'x'.repeat(128*1024+1)) để ghi tệp đồng bộ
 fs.writeFileSync(path.join(dir,'12350.json'),'{bad');fs.writeFileSync(path.join(dir,'12351.json'),'x'.repeat(128*1024+1));
// [VI dòng gốc 9] gọi assert.deepEqual(readPartyPeers(root,now).map(p=>p.actor), ['12345']) để kiểm tra cấu trúc hai giá trị tương đương | gọi assert.equal(readPartyPeers(root,now+16001).length, 0) để kiểm tra hai giá trị bằng nhau
 assert.deepEqual(readPartyPeers(root,now).map(p=>p.actor),['12345']);assert.equal(readPartyPeers(root,now+16001).length,0);
// [VI dòng gốc 10] gọi console.log('PASS local party relay: fresh own actor only, old/future/oversized/corrupt reports excluded')
 console.log('PASS local party relay: fresh own actor only, old/future/oversized/corrupt reports excluded');
// [VI dòng gốc 11] Duyệt từng giá trị trong fs.readdirSync(dir) bằng const f. | Khai báo biến không gán lại bằng const: f (chưa gán giá trị) | gọi fs.unlinkSync(path.join(dir,f)) để xóa một tệp | gọi fs.rmdirSync(dir)
}finally{for(const f of fs.readdirSync(dir))fs.unlinkSync(path.join(dir,f));fs.rmdirSync(dir);fs.rmdirSync(path.dirname(dir));fs.rmdirSync(root);}
// [VI dòng gốc 12] Dòng trống để tách các phần, không có lệnh thực thi.
