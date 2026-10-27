// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: Chỉ nhận cấu hình có kiểu và giới hạn cố định từ file app cục bộ; không nhận JS/shell. [đóng chú thích]
/* Chỉ nhận cấu hình có kiểu và giới hạn cố định từ file app cục bộ; không nhận JS/shell. */
// [VI dòng gốc 2] "use strict" | Khai báo biến không gán lại bằng const: fs = gọi require('node:fs') để nạp module Node.js; path = gọi require('node:path') để nạp module Node.js
'use strict';const fs=require('node:fs'),path=require('node:path');
// [VI dòng gốc 3] Khai báo biến không gán lại bằng const: schema = gọi require('../windows-app/control-schema.json') để nạp module Node.js
const schema=require('../windows-app/control-schema.json');
// [VI dòng gốc 4] Định nghĩa hàm validateProfile; tham số: p
function validateProfile(p){
// [VI dòng gốc 5] Kiểm tra p?.combatProfiles!==undefined: đúng thì chạy nhánh sau if. | Khai báo biến không gán lại bằng const: validator = gọi require.resolve('./combat-profiles.cjs') | xóa thuộc tính require.cache[validator] | Kiểm tra !require(validator).validCombatProfiles(p.combatProfiles): đúng thì chạy nhánh sau if.
 if(p?.combatProfiles!==undefined){const validator=require.resolve('./combat-profiles.cjs');delete require.cache[validator];if(!require(validator).validCombatProfiles(p.combatProfiles))return null;}
// [VI dòng gốc 6] Kiểm tra p?.roadMinCastMs!==undefined&&(!Number.isSafeInteger(p.roadMinCastMs)||p.roadMinCastMs<0||p.roadMinCastMs>5000): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: null.
 if(p?.roadMinCastMs!==undefined&&(!Number.isSafeInteger(p.roadMinCastMs)||p.roadMinCastMs<0||p.roadMinCastMs>5000))return null;
// [VI dòng gốc 7] Kiểm tra p?.roadCombatMode!==undefined&&!['native','basic8001'].includes(p.roadCombatMode)||p?.towerBasicOnly!==undefined&&typeof p.towerBasicOnly!=='boolean': đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: null.
 if(p?.roadCombatMode!==undefined&&!['native','basic8001'].includes(p.roadCombatMode)||p?.towerBasicOnly!==undefined&&typeof p.towerBasicOnly!=='boolean')return null;
// [VI dòng gốc 8] Kiểm tra !p||typeof p!=='object'||Array.isArray(p)||!Object.keys(p).every(k=>['revision','modules','distance','animationSpeed','stageAuto','dailyEnabled','roadCombatMode','towerBasicOnly','…: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: null.
 if(!p||typeof p!=='object'||Array.isArray(p)||!Object.keys(p).every(k=>['revision','modules','distance','animationSpeed','stageAuto','dailyEnabled','roadCombatMode','towerBasicOnly','roadMinCastMs','combatProfiles'].includes(k))||!/^[a-f0-9]{32}$/.test(p.revision))return null;
// [VI dòng gốc 9] Kiểm tra p.distance!==undefined&&(!Number.isFinite(p.distance)||p.distance<281||p.distance>600): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: null.
 if(p.distance!==undefined&&(!Number.isFinite(p.distance)||p.distance<281||p.distance>600))return null;
// [VI dòng gốc 10] Kiểm tra p.animationSpeed!==undefined&&![1,9,99].includes(p.animationSpeed): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: null.
 if(p.animationSpeed!==undefined&&![1,9,99].includes(p.animationSpeed))return null;
// [VI dòng gốc 11] Kiểm tra p.stageAuto!==undefined&&typeof p.stageAuto!=='boolean'||p.dailyEnabled!==undefined&&p.dailyEnabled!==true: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: null.
 if(p.stageAuto!==undefined&&typeof p.stageAuto!=='boolean'||p.dailyEnabled!==undefined&&p.dailyEnabled!==true)return null;
// [VI dòng gốc 12] Kiểm tra p.modules!==undefined&&(!p.modules||typeof p.modules!=='object'||Array.isArray(p.modules)||Object.entries(p.modules).some(([k,v])=>!Object.hasOwn(schema,k)||typeof v!=='boolean')): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: null.
 if(p.modules!==undefined&&(!p.modules||typeof p.modules!=='object'||Array.isArray(p.modules)||Object.entries(p.modules).some(([k,v])=>!Object.hasOwn(schema,k)||typeof v!=='boolean')))return null;
// [VI dòng gốc 13] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm revision, các thuộc tính của p.modules?{modules:{...p.modules}}:{}, các thuộc tính của Object.fromEntries(['distance','animationSpeed','stageAuto','dailyEnabled','roadCombatMode','towerBasicOnly','roadMinCastMs','combatProfiles'].filter(k=>p[k]!==undefined).map(k=>[k….
 return {revision:p.revision,...(p.modules?{modules:{...p.modules}}:{}),...Object.fromEntries(['distance','animationSpeed','stageAuto','dailyEnabled','roadCombatMode','towerBasicOnly','roadMinCastMs','combatProfiles'].filter(k=>p[k]!==undefined).map(k=>[k,p[k]]))};
// [VI dòng gốc 14] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 15] Định nghĩa hàm readDesktopControls; tham số: root | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài.
function readDesktopControls(root){try{
// [VI dòng gốc 16] Khai báo biến không gán lại bằng const: file = gọi path.join(root, '.kvpv-live', 'desktop-controls.json'); stat = gọi fs.lstatSync(file) | Kiểm tra !stat.isFile()||stat.isSymbolicLink()||stat.size>32768: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: tạo mảng gồm 0 vị trí: [].
 const file=path.join(root,'.kvpv-live','desktop-controls.json'),stat=fs.lstatSync(file);if(!stat.isFile()||stat.isSymbolicLink()||stat.size>32768)return [];
// [VI dòng gốc 17] Khai báo biến không gán lại bằng const: doc = gọi JSON.parse(fs.readFileSync(file,'utf8')) để phân tích dữ liệu đầu vào theo API đang gọi | Kiểm tra doc.schema!==1||!doc.actors||typeof doc.actors!=='object'||Array.isArray(doc.actors): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: tạo mảng gồm 0 vị trí: [].
 const doc=JSON.parse(fs.readFileSync(file,'utf8'));if(doc.schema!==1||!doc.actors||typeof doc.actors!=='object'||Array.isArray(doc.actors))return [];
// [VI dòng gốc 18] Kết thúc hàm hiện tại và trả về: gọi Object.entries(doc.actors).slice(0,8).flatMap(([actor,p])=>{const profile=validateProfile(p);return /^[1-9]\d{4,24}$/.test(actor)&&profile?[{actor,...profile}]:[];}). | Khai báo biến không gán lại bằng const: profile = gọi validateProfile(p) | Kết thúc hàm hiện tại và trả về: nếu /^[1-9]\d{4,24}$/.test(actor)&&profile thì lấy [{actor,...profile}], ngược lại lấy [].
 return Object.entries(doc.actors).slice(0,8).flatMap(([actor,p])=>{const profile=validateProfile(p);return /^[1-9]\d{4,24}$/.test(actor)&&profile?[{actor,...profile}]:[];});
// [VI dòng gốc 19] Nhận lỗi bằng _ và chạy phần xử lý lỗi. | Kết thúc hàm hiện tại và trả về: tạo mảng gồm 0 vị trí: [].
 }catch(_){return [];}}
// [VI dòng gốc 20] gán module.exports bằng {validateProfile,readDesktopControls}
module.exports={validateProfile,readDesktopControls};
// [VI dòng gốc 21] Dòng trống để tách các phần, không có lệnh thực thi.
