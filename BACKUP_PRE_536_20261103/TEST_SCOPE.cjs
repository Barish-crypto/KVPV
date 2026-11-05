// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: Kiểm thử mô phỏng: SCOPE. Các assert bên dưới ghi điều kiện phải giữ; không chứng minh máy chủ game chấp nhận tốc độ hoặc tầm đánh. [đóng chú thích]
/* Kiểm thử mô phỏng: SCOPE. Các assert bên dưới ghi điều kiện phải giữ; không chứng minh máy chủ game chấp nhận tốc độ hoặc tầm đánh. */
// [VI dòng gốc 2] Khai báo biến không gán lại bằng const: fs = gọi require('node:fs') để nạp module Node.js; vm = gọi require('node:vm') để nạp module Node.js; assert = gọi require('node:assert/strict') để nạp module Node.js
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
// [VI dòng gốc 3] Khai báo biến không gán lại bằng const: Ba = tạo đối tượng gồm _rJ, _Co, _$a
const Ba={_rJ:{_O$:{ins:{actorId:'12345'}}},_Co:{_Mo:{ins:{curLv:2523,auto:true}}},_$a:{_yo:{ins:{intoSce:[100],isInMission:true}},SceneUtil:{isCommonScene:true}}};
// [VI dòng gốc 4] Khai báo biến không gán lại bằng const: Ft = tạo đối tượng gồm _h$, _po | Khai báo biến không gán lại bằng const: c = tạo mảng gồm 0 vị trí: [] | gán c[7] bằng id===2995?1:0 | Kết thúc hàm hiện tại và trả về: c.
const Ft={_h$:{ins:{getCfgByLv:()=>[2900]}},_po:{ins:{getCfgById:id=>{const c=[];c[7]=id===2995?1:0;return c;}}}};
// [VI dòng gốc 5] Khai báo biến không gán lại bằng const: W = tạo đối tượng gồm __KVPV_OWN_ACTOR_ID, _Ba, _ft, _C, KVPV_MODE
const W={__KVPV_OWN_ACTOR_ID:'12345',_Ba:Ba,_ft:Ft,_C:{_Mn:{_Cn:{currentID:2995}}},KVPV_MODE:{status:()=>({pendingTianQuanMode:'BOSS_TH300_SCAN'})}};
// [VI dòng gốc 6] Khai báo biến không gán lại bằng const: ctx = tạo đối tượng gồm window, _Ba, _ft
const ctx={window:W,_Ba:Ba,_ft:Ft};
// [VI dòng gốc 7] Khai báo biến không gán lại bằng const: originalCfg = đọc Ft._po.ins.getCfgById
const originalCfg=Ft._po.ins.getCfgById;
// [VI dòng gốc 8] gán Ft._po.ins.getCfgById bằng id=>{if(id===2996||id===9999){const row=[];row[7]=35;return row;}return originalCfg(id);} | Kiểm tra id===2996||id===9999: đúng thì chạy nhánh sau if. | Khai báo biến không gán lại bằng const: row = tạo mảng gồm 0 vị trí: [] | gán row[7] bằng 35
Ft._po.ins.getCfgById=id=>{if(id===2996||id===9999){const row=[];row[7]=35;return row;}return originalCfg(id);};
// [VI dòng gốc 9] gọi vm.runInNewContext(fs.readFileSync(__dirname+'/src/00-thienquan-scope.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,''), ctx) để chạy mã trong ngữ cảnh máy ảo dùng cho kiểm thử
vm.runInNewContext(fs.readFileSync(__dirname+'/src/00-thienquan-scope.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,''),ctx);
// [VI dòng gốc 10] gọi assert.equal(W.KVPV_TQ_SCOPE.inside(), true) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(W.KVPV_TQ_SCOPE.status().entry, 100) để kiểm tra hai giá trị bằng nhau
assert.equal(W.KVPV_TQ_SCOPE.inside(),true);assert.equal(W.KVPV_TQ_SCOPE.status().entry,100);
// [VI dòng gốc 11] gọi vm.runInNewContext(fs.readFileSync(__dirname+'/src/02-scene.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,''), ctx) để chạy mã trong ngữ cảnh máy ảo dùng cho kiểm thử
vm.runInNewContext(fs.readFileSync(__dirname+'/src/02-scene.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,''),ctx);
// [VI dòng gốc 12] gọi assert.equal(W.KVPV.core.scene.can('combat'), true) để kiểm tra hai giá trị bằng nhau
assert.equal(W.KVPV.core.scene.can('combat'),true);
// [VI dòng gốc 13] gán W._C._Mn._Cn.currentID bằng 2996 | gán Ba._$a._yo.ins.intoSce bằng [2996] | gán Ft._h$.ins.getCfgByLv bằng ()=>[2011]
W._C._Mn._Cn.currentID=2996;Ba._$a._yo.ins.intoSce=[2996];Ft._h$.ins.getCfgByLv=()=>[2011];
// [VI dòng gốc 14] gọi assert.equal(W.KVPV_TQ_SCOPE.inside(), true) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(W.KVPV.core.scene.can('combat'), true) để kiểm tra hai giá trị bằng nhau
assert.equal(W.KVPV_TQ_SCOPE.inside(),true);assert.equal(W.KVPV.core.scene.can('combat'),true);
// [VI dòng gốc 15] gán Ba._$a._yo.ins.isInMission bằng false | gọi assert.equal(W.KVPV_TQ_SCOPE.inside(), false) để kiểm tra hai giá trị bằng nhau
Ba._$a._yo.ins.isInMission=false;assert.equal(W.KVPV_TQ_SCOPE.inside(),false);
// [VI dòng gốc 16] gán Ba._$a._yo.ins.isInMission bằng true | gán W._C._Mn._Cn.currentID bằng 9999 | gọi assert.equal(W.KVPV_TQ_SCOPE.inside(), false) để kiểm tra hai giá trị bằng nhau
Ba._$a._yo.ins.isInMission=true;W._C._Mn._Cn.currentID=9999;assert.equal(W.KVPV_TQ_SCOPE.inside(),false);
// [VI dòng gốc 17] gán W._C._Mn._Cn.currentID bằng 2996
W._C._Mn._Cn.currentID=2996;
// [VI dòng gốc 18] gán W.KVPV_DAILY bằng {quickState:()=>({job:'daily test'})} | gọi assert.equal(W.KVPV.core.scene.can('combat'), false) để kiểm tra hai giá trị bằng nhau | xóa thuộc tính W.KVPV_DAILY
W.KVPV_DAILY={quickState:()=>({job:'daily test'})};assert.equal(W.KVPV.core.scene.can('combat'),false);delete W.KVPV_DAILY;
// [VI dòng gốc 19] gán W._C._Mn._Cn.currentID bằng 100 | gán Ba._$a._yo.ins.isInMission bằng false
W._C._Mn._Cn.currentID=100;Ba._$a._yo.ins.isInMission=false;
// [VI dòng gốc 20] gọi assert.equal(W.KVPV_TQ_SCOPE.inside(), false) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(W.KVPV.core.scene.can('combat'), false) để kiểm tra hai giá trị bằng nhau
assert.equal(W.KVPV_TQ_SCOPE.inside(),false);assert.equal(W.KVPV.core.scene.can('combat'),false);
// [VI dòng gốc 21] Chú thích gốc của tác giả; không được thực thi. Nội dung: Other type-35 stage maps are discovered by matching the native stage Boss.
// Other type-35 stage maps are discovered by matching the native stage Boss.
// [VI dòng gốc 22] Khai báo biến không gán lại bằng const: Combat = tạo hàm với tham số (không có) | gán W._d bằng {_Yct:{_Het:Combat}} | Khai báo biến có thể gán lại bằng let: target = tạo đối tượng gồm property
const Combat=function(){};W._d={_Yct:{_Het:Combat}};let target={property:{get:k=>({type:1,occ:222523})[k]}};
// [VI dòng gốc 23] gán W._C._Ba bằng {instance:{getRole:()=>({getComponent:()=>({target})})}} | gán Ft._h$.ins.occ bằng ()=>222523
W._C._Ba={instance:{getRole:()=>({getComponent:()=>({target})})}};Ft._h$.ins.occ=()=>222523;
// [VI dòng gốc 24] gán W._C._Mn._Cn.currentID bằng 9999 | gán Ba._$a._yo.ins.isInMission bằng true
W._C._Mn._Cn.currentID=9999;Ba._$a._yo.ins.isInMission=true;
// [VI dòng gốc 25] gọi assert.equal(W.KVPV_TQ_SCOPE.inside(), true) để kiểm tra hai giá trị bằng nhau
assert.equal(W.KVPV_TQ_SCOPE.inside(),true);
// [VI dòng gốc 26] gán target bằng null | gọi assert.equal(W.KVPV_TQ_SCOPE.inside(), true) để kiểm tra hai giá trị bằng nhau
target=null;assert.equal(W.KVPV_TQ_SCOPE.inside(),true);
// [VI dòng gốc 27] gán W._C._Mn._Cn.currentID bằng 1009 | gán Ba._$a._yo.ins.intoSce bằng [1009]
W._C._Mn._Cn.currentID=1009;Ba._$a._yo.ins.intoSce=[1009];
// [VI dòng gốc 28] gọi assert.equal(W.KVPV_TQ_SCOPE.inside(), false) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(W.KVPV_TQ_SCOPE.status().mission, true) để kiểm tra hai giá trị bằng nhau
assert.equal(W.KVPV_TQ_SCOPE.inside(),false);assert.equal(W.KVPV_TQ_SCOPE.status().mission,true);
// [VI dòng gốc 29] Chú thích gốc của tác giả; không được thực thi. Nội dung: Regression from live log: map 1002/type 0, mission true, exact stage Boss.
// Regression from live log: map 1002/type 0, mission true, exact stage Boss.
// [VI dòng gốc 30] gán W._C._Mn._Cn.currentID bằng 1002 | gán Ba._$a._yo.ins.intoSce bằng [1002]
W._C._Mn._Cn.currentID=1002;Ba._$a._yo.ins.intoSce=[1002];
// [VI dòng gốc 31] gán target bằng {property:{get:k=>({type:1,occ:222529})[k]}} | gán Ft._h$.ins.occ bằng ()=>222529
target={property:{get:k=>({type:1,occ:222529})[k]}};Ft._h$.ins.occ=()=>222529;
// [VI dòng gốc 32] gọi assert.equal(W.KVPV_TQ_SCOPE.inside(), true) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(W.KVPV.core.scene.can('combat'), true) để kiểm tra hai giá trị bằng nhau
assert.equal(W.KVPV_TQ_SCOPE.inside(),true);assert.equal(W.KVPV.core.scene.can('combat'),true);
// [VI dòng gốc 33] gán target bằng {property:{get:k=>({type:1,occ:999})[k]}} | gọi assert.equal(W.KVPV_TQ_SCOPE.inside(), false) để kiểm tra hai giá trị bằng nhau
target={property:{get:k=>({type:1,occ:999})[k]}};assert.equal(W.KVPV_TQ_SCOPE.inside(),false);
// [VI dòng gốc 34] gán target bằng null | gọi assert.equal(W.KVPV_TQ_SCOPE.inside(), false) để kiểm tra hai giá trị bằng nhau
target=null;assert.equal(W.KVPV_TQ_SCOPE.inside(),false);
// [VI dòng gốc 35] gọi console.log('PASS live mission map overrides stale entry map; selected SCAN owns stage combat; daily and outside gates remain intact…)
console.log('PASS live mission map overrides stale entry map; selected SCAN owns stage combat; daily and outside gates remain intact');
// [VI dòng gốc 36] Dòng trống để tách các phần, không có lệnh thực thi.
