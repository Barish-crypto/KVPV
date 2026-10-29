// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: Kiểm thử mô phỏng: HONOR_TARGET. Các assert bên dưới ghi điều kiện phải giữ; không chứng minh máy chủ game chấp nhận tốc độ hoặc tầm đánh. [đóng chú thích]
/* Kiểm thử mô phỏng: HONOR_TARGET. Các assert bên dưới ghi điều kiện phải giữ; không chứng minh máy chủ game chấp nhận tốc độ hoặc tầm đánh. */
// [VI dòng gốc 2] Khai báo biến không gán lại bằng const: fs = gọi require('node:fs') để nạp module Node.js; vm = gọi require('node:vm') để nạp module Node.js; assert = gọi require('node:assert/strict') để nạp module Node.js
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
// [VI dòng gốc 3] Khai báo biến có thể gán lại bằng let: now = 1000; type = 0; target = null; callback = null | Định nghĩa lớp Clock kế thừa Date. | Kết thúc hàm hiện tại và trả về: now.
let now=1000,type=0,target=null,callback=null;class Clock extends Date{static now(){return now;}}
// [VI dòng gốc 4] Khai báo biến không gán lại bằng const: selected = tạo mảng gồm 0 vị trí: []; remote = tạo mảng gồm 0 vị trí: []; applied = tạo mảng gồm 0 vị trí: []
const selected=[],remote=[],applied=[];
// [VI dòng gốc 5] Khai báo biến không gán lại bằng const: model = tạo đối tượng gồm getRankDataById, getPlayerPos, setPlayerTarget
const model={getRankDataById:id=>id==='enemy'?[[id,0,0,2,false]]:id==='ally'?[[id,0,0,1,false]]:null,
// [VI dòng gốc 6] Thuộc tính getPlayerPos: tạo hàm với tham số (không có); mỗi lần gọi trả về null | Thuộc tính setPlayerTarget: tạo hàm với tham số id, p; mỗi lần gọi trả về gọi applied.push([id,p]) để thêm phần tử vào cuối mảng
  getPlayerPos:()=>null,setPlayerTarget:(id,p)=>applied.push([id,p])};
// [VI dòng gốc 7] Khai báo biến không gán lại bằng const: user = tạo đối tượng gồm actorId, selectTar
const user={actorId:'12345',selectTar:(kind,id)=>selected.push([kind,id])};
// [VI dòng gốc 8] Khai báo biến không gán lại bằng const: W = tạo đối tượng gồm __KVPV_OWN_ACTOR_ID, _Ba, _C, _d, _ft, _Sa, setInterval, clearInterval
const W={__KVPV_OWN_ACTOR_ID:'12345',_Ba:{_rJ:{_O$:{ins:user}},_Zpt:{_Jpt:{inst:model},_nZt:{ins:{reqSearchObj:(...args)=>remote.push(args)}}},_a1:{_h1:{inst:{getMyFightTeamId:()=>1}}}},
// [VI dòng gốc 9] Thuộc tính _C: tạo đối tượng gồm _Mn, _Ba | Thuộc tính _Mn: tạo đối tượng gồm _Cn | Thuộc tính _Cn: tạo đối tượng gồm currentID | Thuộc tính currentID: 2162
  _C:{_Mn:{_Cn:{currentID:2162}},_Ba:{instance:{getRole:()=>({getComponent:()=>({target,isValidTarget:()=>true})})}}},_d:{_Yct:{_Het:function(){}}},
// [VI dòng gốc 10] Khai báo biến không gán lại bằng const: r = tạo mảng gồm 0 vị trí: [] | gán r[7] bằng type | Kết thúc hàm hiện tại và trả về: r.
  _ft:{_po:{ins:{getCfgById:()=>{const r=[];r[7]=type;return r;}}}},
// [VI dòng gốc 11] gán callback bằng fn | gán callback bằng null
  _Sa:{notify:{on:(event,owner,fn)=>{callback=fn;},off:()=>{callback=null;}}},setInterval:()=>1,clearInterval(){}};
// [VI dòng gốc 12] gọi vm.runInNewContext(fs.readFileSync(__dirname+'/src/15-honor-targets.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,''), {window:W…) để chạy mã trong ngữ cảnh máy ảo dùng cho kiểm thử
vm.runInNewContext(fs.readFileSync(__dirname+'/src/15-honor-targets.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,''),{window:W,Date:Clock});
// [VI dòng gốc 13] Khai báo biến không gán lại bằng const: mod = đọc W.KVPV_HONOR_TARGET | gọi assert.equal(selected.length, 0) để kiểm tra hai giá trị bằng nhau
const mod=W.KVPV_HONOR_TARGET;assert.equal(selected.length,0);
// [VI dòng gốc 14] gán type bằng 42 | gọi mod.sync() | gọi assert.deepEqual(selected, [[2,-1]]) để kiểm tra cấu trúc hai giá trị tương đương
type=42;mod.sync();assert.deepEqual(selected,[[2,-1]]);
// [VI dòng gốc 15] gán target bằng {property:{get:k=>k==='id'?'enemy':null}} | cập nhật bằng toán tử += now bằng 2000 | gọi mod.sync() | gọi assert.equal(selected.length, 1) để kiểm tra hai giá trị bằng nhau
target={property:{get:k=>k==='id'?'enemy':null}};now+=2000;mod.sync();assert.equal(selected.length,1);assert.equal(mod.status().reason,'fighting_enemy_player');
// [VI dòng gốc 16] gán target bằng null | gọi mod.sync() | gọi assert.deepEqual(selected.at(-1), [1,-1]) để kiểm tra cấu trúc hai giá trị tương đương
target=null;mod.sync();assert.equal(selected.length,1,'no monster fallback');
// [VI dòng gốc 17] cập nhật bằng toán tử += now bằng 6000 | gọi mod.sync() | gọi assert.deepEqual(selected.at(-1), [2,-1]) để kiểm tra cấu trúc hai giá trị tương đương
now+=6000;mod.sync();assert.deepEqual(selected.at(-1),[2,-1]);
// [VI dòng gốc 18] gán target bằng {property:{get:k=>k==='id'?'ally':null}} | cập nhật bằng toán tử += now bằng 1600 | gọi mod.sync() | gọi assert.deepEqual(selected.at(-1), [1,-1]) để kiểm tra cấu trúc hai giá trị tương đương
target={property:{get:k=>k==='id'?'ally':null}};now+=1600;mod.sync();assert.deepEqual(selected.at(-1),[2,-1]);
// [VI dòng gốc 19] gán target bằng null | gán model.fireGodInfo bằng [1,'god-player',2] | cập nhật bằng toán tử += now bằng 8000 | gọi mod.sync()
target=null;model.fireGodInfo=[1,'god-player',2];now+=8000;mod.sync();assert.deepEqual(remote,[[1,'god-player']]);
// [VI dòng gốc 20] gọi callback(['god-player',[10,20],1]) | gọi assert.equal(applied.length, 1) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(mod.status().searchReplies, 1) để kiểm tra hai giá trị bằng nhau
callback(['god-player',[10,20],1]);assert.equal(applied.length,1);assert.equal(mod.status().searchReplies,1);
// [VI dòng gốc 21] gán user.isDead bằng true | cập nhật bằng toán tử += now bằng 10000 | Khai báo biến không gán lại bằng const: count = đọc selected.length | gọi mod.sync()
user.isDead=true;now+=10000;const count=selected.length;mod.sync();assert.equal(selected.length,count);
// [VI dòng gốc 22] gán user.isDead bằng false | gán type bằng 0 | gọi mod.sync() | gọi assert.equal(selected.length, count) để kiểm tra hai giá trị bằng nhau
user.isDead=false;type=0;mod.sync();assert.equal(selected.length,count);
// [VI dòng gốc 23] gán target bằng {property:{get:k=>k==='id'?'enemy':null}} | gán type bằng 42 | gọi mod.sync() | gọi assert.equal(selected.length, count+1) để kiểm tra hai giá trị bằng nhau
target={property:{get:k=>k==='id'?'enemy':null}};type=42;mod.sync();assert.equal(selected.length,count+1);assert.deepEqual(selected.at(-1),[2,-1]);assert.equal(mod.status().reason,'entry_find_player_first');mod.sync();assert.equal(selected.length,count+1);
// [VI dòng gốc 24] gọi mod.stop() để dừng bộ điều khiển và dọn tài nguyên | gọi assert.equal(callback, null) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(mod.status().enabled, false) để kiểm tra hai giá trị bằng nhau
assert.equal(selected.some(row=>row[0]===1),false,'never search monsters');
mod.stop();assert.equal(callback,null);assert.equal(mod.status().enabled,false);
// [VI dòng gốc 25] gọi console.log('PASS Honor targets: scene42 only, player-first, keep valid enemy, no monster fallback, retry players, ally exclusion, nati…)
console.log('PASS Honor targets: scene42 only, player-first, keep valid enemy, monster fallback, retry players, ally exclusion, native remote reply, death and stop');
// [VI dòng gốc 26] Dòng trống để tách các phần, không có lệnh thực thi.
