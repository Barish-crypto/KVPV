// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: Account riêng: khóa theo actor hiện tại, không chia sẻ trạng thái và không phát lại worker pending. [đóng chú thích]
/* Account riêng: khóa theo actor hiện tại, không chia sẻ trạng thái và không phát lại worker pending. */
// [VI dòng gốc 2] "use strict"
'use strict';
// [VI dòng gốc 3] Khai báo biến không gán lại bằng const: fs = gọi require('fs') để nạp module Node.js; vm = gọi require('vm') để nạp module Node.js; assert = gọi require('node:assert/strict') để nạp module Node.js
const fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict');
// [VI dòng gốc 4] Khai báo biến không gán lại bằng const: read = tạo hàm với tham số f; mỗi lần gọi trả về gọi fs.readFileSync(__dirname+'/'+f, 'utf8') để đọc tệp đồng bộ
const read=f=>fs.readFileSync(__dirname+'/'+f,'utf8');
// [VI dòng gốc 5] Định nghĩa hàm frame; tham số: id
function frame(id){
// [VI dòng gốc 6] Khai báo biến không gán lại bằng const: Skill = tạo hàm với tham số (không có); Combat = tạo hàm với tham số (không có); Move = tạo hàm với tham số (không có); selector = tạo đối tượng gồm _rtt, _wet
 const Skill=function(){},Combat=function(){},Move=function(){},selector={_rtt:[[1001,0,100]],_wet:[[8001,0,100]]};
// [VI dòng gốc 7] Khai báo biến không gán lại bằng const: role = tạo đối tượng gồm getComponent
 const role={getComponent:t=>t===Skill?selector:{}};
// [VI dòng gốc 8] Khai báo biến không gán lại bằng const: W = tạo đối tượng gồm _Ba, _ft, _Sa, _d, _C, document, setInterval, clearInterval, setTimeout, clearTimeout
 const W={_Ba:{_rJ:{_O$:{ins:{actorId:id}}}},_ft:{},_Sa:{},_d:{_Yct:{_Eet:Skill,_Het:Combat,_zet:Move}},
// [VI dòng gốc 9] Thuộc tính _C: tạo đối tượng gồm _Ba | Thuộc tính _Ba: tạo đối tượng gồm instance | Thuộc tính instance: tạo đối tượng gồm getRole | Thuộc tính getRole: tạo hàm với tham số key; mỗi lần gọi trả về nếu String(key)===id thì lấy role, ngược lại lấy null
  _C:{_Ba:{instance:{getRole:key=>String(key)===id?role:null}}},document:{hidden:true},
// [VI dòng gốc 10] Kết thúc hàm hiện tại và trả về: 1. | Kết thúc hàm hiện tại và trả về: 2.
  setInterval(){return 1;},clearInterval(){},setTimeout(){return 2;},clearTimeout(){}};
// [VI dòng gốc 11] Khai báo biến không gán lại bằng const: ctx = gọi vm.createContext({window:W,_Ba:W._Ba,_ft:W._ft,_Sa:W._Sa,console:{info(){},log(){},error(){}}})
 const ctx=vm.createContext({window:W,_Ba:W._Ba,_ft:W._ft,_Sa:W._Sa,console:{info(){},log(){},error(){}}});
// [VI dòng gốc 12] gọi vm.runInContext(read('runtime-v1.js')+'\n'+read('src/01-identity.js')+'\n'+read('src/00-account-policy.js'), ctx) | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm W, ctx.
 vm.runInContext(read('runtime-v1.js')+'\n'+read('src/01-identity.js')+'\n'+read('src/00-account-policy.js'),ctx);return {W,ctx};
// [VI dòng gốc 13] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 14] Khai báo biến không gán lại bằng const: a = gọi frame('7777777777777'); b = gọi frame('8888888888888')
const a=frame('7777777777777'),b=frame('8888888888888');
// [VI dòng gốc 15] gọi assert.equal(a.W.KVPV_ACCOUNT_POLICY.status().actorMatches, true) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(b.W.KVPV_ACCOUNT_POLICY.status().actorId, '8888888888888') để kiểm tra hai giá trị bằng nhau
assert.equal(a.W.KVPV_ACCOUNT_POLICY.status().actorMatches,true);assert.equal(b.W.KVPV_ACCOUNT_POLICY.status().actorId,'8888888888888');
// [VI dòng gốc 16] gán a.W.KVPV_ACCOUNT_POLICY.config.pauseWhenHidden bằng true | gọi assert.equal(b.W.KVPV_ACCOUNT_POLICY.config.pauseWhenHidden, false) để kiểm tra hai giá trị bằng nhau
a.W.KVPV_ACCOUNT_POLICY.config.pauseWhenHidden=true;assert.equal(b.W.KVPV_ACCOUNT_POLICY.config.pauseWhenHidden,false);
// [VI dòng gốc 17] gọi assert.equal(b.W.KVPV_ACCOUNT_POLICY.status().playerLoaded, true) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(b.W.KVPV_ACCOUNT_POLICY.status().components.selector, true) để kiểm tra hai giá trị bằng nhau
assert.equal(b.W.KVPV_ACCOUNT_POLICY.status().playerLoaded,true);assert.equal(b.W.KVPV_ACCOUNT_POLICY.status().components.selector,true);
// [VI dòng gốc 18] gọi assert.equal(b.W.KVPV_ACCOUNT_POLICY.pollingGap(), 50) để kiểm tra hai giá trị bằng nhau
assert.equal(b.W.KVPV_ACCOUNT_POLICY.pollingGap(),50);
// [VI dòng gốc 19] gán b.W.document.hidden bằng false | gán b.W.document.hasFocus bằng ()=>false | gọi assert.equal(b.W.KVPV_ACCOUNT_POLICY.pollingGap(), 25) để kiểm tra hai giá trị bằng nhau
b.W.document.hidden=false;b.W.document.hasFocus=()=>false;assert.equal(b.W.KVPV_ACCOUNT_POLICY.pollingGap(),25);
// [VI dòng gốc 20] gán b.W.document.hasFocus bằng ()=>true | gọi assert.equal(b.W.KVPV_ACCOUNT_POLICY.pollingGap(), 0) để kiểm tra hai giá trị bằng nhau | gán b.W.document.hidden bằng true
b.W.document.hasFocus=()=>true;assert.equal(b.W.KVPV_ACCOUNT_POLICY.pollingGap(),0);b.W.document.hidden=true;
// [VI dòng gốc 21] gọi assert.notEqual(a.W.KVPV_V1, b.W.KVPV_V1) | gọi assert.equal(Object.getOwnPropertyDescriptor(a.W,'__KVPV_OWN_ACTOR_ID').writable, false) để kiểm tra hai giá trị bằng nhau
assert.notEqual(a.W.KVPV_V1,b.W.KVPV_V1);assert.equal(Object.getOwnPropertyDescriptor(a.W,'__KVPV_OWN_ACTOR_ID').writable,false);
// [VI dòng gốc 22] gán a.W._Ba._rJ._O$.ins.actorId bằng '9999999999999' | gọi assert.equal(a.W.KVPV_ACCOUNT_POLICY.status().actorMatches, false) để kiểm tra hai giá trị bằng nhau
a.W._Ba._rJ._O$.ins.actorId='9999999999999';assert.equal(a.W.KVPV_ACCOUNT_POLICY.status().actorMatches,false);
// [VI dòng gốc 23] Khai báo biến không gán lại bằng const: names = tạo mảng gồm 8 vị trí: ['KVPV_FAST927','KVPV_ASYNC928','KVPV_QUEST929','KVPV_RUNES930','KVPV_RUNE_INLAY931','KVPV_STAR_REWARD932','KVPV_BEAUTY933','KVPV_ESCORT934']
const names=['KVPV_FAST927','KVPV_ASYNC928','KVPV_QUEST929','KVPV_RUNES930','KVPV_RUNE_INLAY931','KVPV_STAR_REWARD932','KVPV_BEAUTY933','KVPV_ESCORT934'];
// [VI dòng gốc 24] Duyệt từng giá trị trong names bằng const name. | Khai báo biến không gán lại bằng const: name (chưa gán giá trị) | gán b.W[name] bằng {status(){return {running:true,pending:{request:'in-flight'}};},stop(){throw Error('must preserve pending worker');}} | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm running, pending.
for(const name of names)b.W[name]={status(){return {running:true,pending:{request:'in-flight'}};},stop(){throw Error('must preserve pending worker');}};
// [VI dòng gốc 25] Khai báo biến có thể gán lại bằng let: stopped = 0 | gán b.W.KVPV bằng {marryBattle:{config:{mainId:'old',cloneId:'old-clone'},stop(){stopped++;}},macLan:{config:{mainId:'old',cloneId:'old-clone'},stop(){stopped++;}}} | tăng stopped một đơn vị sau khi lấy giá trị
let stopped=0;b.W.KVPV={marryBattle:{config:{mainId:'old',cloneId:'old-clone'},stop(){stopped++;}},macLan:{config:{mainId:'old',cloneId:'old-clone'},stop(){stopped++;}}};b.W.KVPV_DAILY={config:{tinhThanCloneId:'old-clone'}};
// [VI dòng gốc 26] gọi vm.runInContext(read('src/19-account-features.js'), b.ctx)
vm.runInContext(read('src/19-account-features.js'),b.ctx);
// [VI dòng gốc 27] gọi assert.equal(stopped, 2) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(b.W.KVPV_DAILY.config.tinhThanCloneId, '') để kiểm tra hai giá trị bằng nhau | gọi assert.equal(b.W.KVPV.macLan.config.cloneId, '') để kiểm tra hai giá trị bằng nhau
assert.equal(stopped,2);assert.equal(b.W.KVPV_DAILY.config.tinhThanCloneId,'');assert.equal(b.W.KVPV.macLan.config.cloneId,'');
// [VI dòng gốc 28] gọi assert.equal(b.W.KVPV_ACCOUNT_FEATURES.status().modules.length, 8) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(new Set(b.W.KVPV_ACCOUNT_FEATURES.status().modules.map(m=>m.name)).size, 8) để kiểm tra hai giá trị bằng nhau | gọi assert(b.W.KVPV_ACCOUNT_FEATURES.status().modules.every(m=>m.state==='preserved')) để kiểm tra điều kiện của bài test
assert.equal(b.W.KVPV_ACCOUNT_FEATURES.status().modules.length,8);assert.equal(new Set(b.W.KVPV_ACCOUNT_FEATURES.status().modules.map(m=>m.name)).size,8);assert(b.W.KVPV_ACCOUNT_FEATURES.status().modules.every(m=>m.state==='preserved'));
// [VI dòng gốc 29] Duyệt từng giá trị trong ['src/04-engine.js','src/19-account-features.js'] bằng const file. | Khai báo biến không gán lại bằng const: file (chưa gán giá trị) | gọi assert.equal(/1022886726894[16]/.test(read(file)), false) để kiểm tra hai giá trị bằng nhau
for(const file of ['src/04-engine.js','src/19-account-features.js'])assert.equal(/1022886726894[16]/.test(read(file)),false);
// [VI dòng gốc 30] Khai báo biến không gán lại bằng const: liveModules = đọc JSON.parse(read('MANIFEST.json')).liveModules
const liveModules=JSON.parse(read('MANIFEST.json')).liveModules;
// [VI dòng gốc 31] gọi assert(liveModules.includes('19-account-features.js')) để kiểm tra điều kiện của bài test
assert(liveModules.includes('19-account-features.js'));
// [VI dòng gốc 32] gọi assert(liveModules.includes('00-account-policy.js')) để kiểm tra điều kiện của bài test
assert(liveModules.includes('00-account-policy.js'));
// [VI dòng gốc 33] gọi console.log('PASS account portability: independent actor sessions/config, immutable identity, no fixed account IDs, pending workers …)
console.log('PASS account portability: independent actor sessions/config, immutable identity, no fixed account IDs, pending workers preserved and legacy pairing detached');
// [VI dòng gốc 34] Dòng trống để tách các phần, không có lệnh thực thi.
