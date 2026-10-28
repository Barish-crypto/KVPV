// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: Mô phỏng driver đảo: quota server, đường thu thập và giới hạn Boss. [đóng chú thích]
/* Mô phỏng driver đảo: quota server, đường thu thập và giới hạn Boss. */
// [VI dòng gốc 2] Khai báo biến không gán lại bằng const: fs = gọi require('node:fs') để nạp module Node.js; vm = gọi require('node:vm') để nạp module Node.js; assert = gọi require('node:assert/strict') để nạp module Node.js
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
// [VI dòng gốc 3] Khai báo biến không gán lại bằng const: source = gọi fs.readFileSync(__dirname+'/src/23-beast-island.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm, '')
const source=fs.readFileSync(__dirname+'/src/23-beast-island.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,'');
// [VI dòng gốc 4] Khai báo biến có thể gán lại bằng let: now = 100000; map = 1; type = 0; busy = true; lease = null; point = null; gathering = false; alive = true; refresh = 0; intervals = 0
let now=100000,map=1,type=0,busy=true,lease=null,point=null,gathering=false,alive=true,refresh=0,intervals=0;
// [VI dòng gốc 5] Khai báo biến không gán lại bằng const: calls = tạo mảng gồm 0 vị trí: []; stage = tạo đối tượng gồm auto
const calls=[],stage={auto:true};
// [VI dòng gốc 6] Định nghĩa lớp Clock kế thừa Date. | Kết thúc hàm hiện tại và trả về: now.
class Clock extends Date{static now(){return now;}}
// [VI dòng gốc 7] Khai báo biến không gán lại bằng const: rows = tạo mảng gồm 4 vị trí: [[4902,2,0,2,101],[4902,2,0,2,102],[4902,2,0,1,7500],[4902,2,0,1,8000]]
const rows=[[4902,2,0,2,101],[4902,2,0,2,102],[4902,2,0,1,7500],[4902,2,0,1,8000]];
// [VI dòng gốc 8] Khai báo biến không gán lại bằng const: m = tạo đối tượng gồm _c_a, dragonOcc, lastSelectOcc, lastSelectType, getMACurPsNum, getMAMaxPsNum, getNpcCollectionNum, getNpcCollectionMaxNum, getCurMapLevel, getMABossIsLive, setTempTargetOcc, getNpcPos, getMovePoint, setNpcMovePoint, setTarget, MASequenceAutoFight
const m={_c_a:[0,[],[],false],dragonOcc:102,lastSelectOcc:-1,lastSelectType:-1,
// [VI dòng gốc 9] Kết thúc hàm hiện tại và trả về: đọc this._c_a[0].
 getMACurPsNum(){return this._c_a[0];},getMAMaxPsNum:()=>3,
// [VI dòng gốc 10] Kết thúc hàm hiện tại và trả về: this._c_a[1].find(r=>r[0]===occ)?.[1] hoặc dùng vế phải khi vế trái falsy: 0.
 getNpcCollectionNum(occ){return this._c_a[1].find(r=>r[0]===occ)?.[1]||0;},getNpcCollectionMaxNum:occ=>occ===101?20:2,
// [VI dòng gốc 11] Thuộc tính getCurMapLevel: tạo hàm với tham số (không có); mỗi lần gọi trả về 2 | Thuộc tính getMABossIsLive: tạo hàm với tham số occ, kind; mỗi lần gọi trả về nếu kind===1 thì lấy alive, ngược lại lấy true
 getCurMapLevel:()=>2,getMABossIsLive:(occ,kind)=>kind===1?alive:true,
// [VI dòng gốc 12] gọi calls.push(['temp',...a]) để thêm phần tử vào cuối mảng
 setTempTargetOcc(...a){calls.push(['temp',...a]);},getNpcPos:()=>({x:1,y:2}),getMovePoint:()=>point,
// [VI dòng gốc 13] gán point bằng p | gán this.lastSelectOcc bằng occ | gọi calls.push(['move',occ]) để thêm phần tử vào cuối mảng
 setNpcMovePoint(p,occ){point=p;this.lastSelectOcc=occ;calls.push(['move',occ]);},
// [VI dòng gốc 14] gọi calls.push(['target',...a]) để thêm phần tử vào cuối mảng | gọi calls.push(['auto']) để thêm phần tử vào cuối mảng | Kết thúc hàm hiện tại và trả về: true.
 setTarget(...a){calls.push(['target',...a]);},MASequenceAutoFight(){calls.push(['auto']);return true;}};
// [VI dòng gốc 15] Khai báo biến không gán lại bằng const: original = đọc m.setTarget; autoOriginal = đọc m.MASequenceAutoFight
const original=m.setTarget,autoOriginal=m.MASequenceAutoFight;
// [VI dòng gốc 16] Khai báo biến không gán lại bằng const: W = tạo đối tượng gồm __KVPV_OWN_ACTOR_ID, _Ba, _C, _ft, KVPV, KVPV_DAILY, setInterval, clearInterval
const W={__KVPV_OWN_ACTOR_ID:'a',_Ba:{_rJ:{_O$:{ins:{actorId:'a'}}},_Co:{_Mo:{ins:stage}},
// [VI dòng gốc 17] tăng refresh một đơn vị sau khi lấy giá trị
 _dP:{_P5t:{ins:m},_l0n:{ins:{GetMythicalAnimalCopyInfo(){refresh++;},GetMythicalAnimalNpcRefreshInfo(){}}}},
// [VI dòng gốc 18] Kết thúc hàm hiện tại và trả về: gathering.
 _K_t:{_Z7t:{ins:{get gathering(){return gathering;}}}},_Do:{_Ho:{inst:{getFcIsOpen:()=>true}}},
// [VI dòng gốc 19] Kết thúc hàm hiện tại và trả về: tính biểu thức type===0.
 _$a:{SceneUtil:{get isCommonScene(){return type===0;}}},_sst:{_Cht:{inst:{rqEtScene:(...a)=>calls.push(['map',...a])}}}},
// [VI dòng gốc 20] Kết thúc hàm hiện tại và trả về: map (biến đổi từng phần tử).
 _C:{_Mn:{_Cn:{get currentID(){return map;}}}},_ft:{_gci:{ins:{getMABosss:()=>rows,
// [VI dòng gốc 21] Thuộc tính getTabs: tạo hàm với tham số (không có); mỗi lần gọi trả về tạo mảng gồm 2 vị trí: [{type:49,lv:1,actionOpenId:898},{type:49,lv:2,actionOpenId:900}] | Thuộc tính type: 49 | Thuộc tính lv: 1 | Thuộc tính actionOpenId: 898
 getTabs:()=>[{type:49,lv:1,actionOpenId:898},{type:49,lv:2,actionOpenId:900}]}},_tY:{ins:{getCfgById:occ=>[0,0,0,0,0,0,occ===7500?750:800]}},
// [VI dòng gốc 22] Thuộc tính _Xpt: tạo đối tượng gồm ins | Thuộc tính ins: tạo đối tượng gồm getCfgById | Thuộc tính getCfgById: tạo hàm với tham số occ; mỗi lần gọi trả về tạo mảng gồm 5 vị trí: [0,0,0,0,occ===101?'Phượng Huyết Thủy Tinh':'Long Phách Thủy Tinh']
 _Xpt:{ins:{getCfgById:occ=>[0,0,0,0,occ===101?'Phượng Huyết Thủy Tinh':'Long Phách Thủy Tinh']}},
// [VI dòng gốc 23] Thuộc tính _po: tạo đối tượng gồm ins | Thuộc tính ins: tạo đối tượng gồm getCfgById | Thuộc tính getCfgById: tạo hàm với tham số (không có); mỗi lần gọi trả về tạo mảng gồm 8 vị trí: [0,0,0,0,0,0,0,type]
 _po:{ins:{getCfgById:()=>[0,0,0,0,0,0,0,type]}}},
// [VI dòng gốc 24] Kiểm tra busy: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: false. | gán lease bằng tag | Kết thúc hàm hiện tại và trả về: true.
 KVPV:{core:{scene:{status:()=>({tag:lease,owner:lease?'combat':null}),acquire:(who,tag)=>{if(busy)return false;lease=tag;return true;},
// [VI dòng gốc 25] gán lease bằng null
 renew:()=>!!lease,release:()=>{lease=null;}}}},KVPV_DAILY:{quickState:()=>({job:'rảnh'})},
// [VI dòng gốc 26] Thuộc tính setInterval: tạo hàm với tham số (không có); mỗi lần gọi trả về tăng intervals một đơn vị trước khi lấy giá trị | Thuộc tính clearInterval: tạo hàm với tham số (không có); mỗi lần gọi trả về giảm intervals một đơn vị trước khi lấy giá trị
 setInterval:()=>++intervals,clearInterval:()=>--intervals};
// [VI dòng gốc 27] Định nghĩa hàm load; tham số: không có | gọi vm.runInNewContext(source, {window:W,Date:Clock}) để chạy mã trong ngữ cảnh máy ảo dùng cho kiểm thử | Kết thúc hàm hiện tại và trả về: đọc W.KVPV_BEAST_ISLAND.
function load(){vm.runInNewContext(source,{window:W,Date:Clock});return W.KVPV_BEAST_ISLAND;}
// [VI dòng gốc 28] Khai báo biến có thể gán lại bằng let: a = gọi load() | gọi assert.equal(calls.length, 0) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(stage.auto, true) để kiểm tra hai giá trị bằng nhau | gán busy bằng false
let a=load();assert.equal(calls.length,0);assert.equal(stage.auto,true);busy=false;a.sync();
// [VI dòng gốc 29] gọi assert.deepEqual(calls.at(-1), ['map',4902,2]) để kiểm tra cấu trúc hai giá trị tương đương | gọi a.sync() | gọi assert.equal(calls.filter(r=>r[0]==='map').length, 1) để kiểm tra hai giá trị bằng nhau
assert.deepEqual(calls.at(-1),['map',4902,2]);a.sync();assert.equal(calls.filter(r=>r[0]==='map').length,1);
// [VI dòng gốc 30] gán map bằng 4902 | gán type bằng 49 | gọi a.sync() | gọi assert.deepEqual(calls.at(-1), ['move',101]) để kiểm tra cấu trúc hai giá trị tương đương
map=4902;type=49;a.sync();assert.deepEqual(calls.at(-1),['move',101]);
assert.equal(a.basicCombatReady({isValid:true,property:{get:()=>7500}}),false,'Gathering stage cannot start BASIC FORCE');
// [VI dòng gốc 31] cập nhật bằng toán tử += now bằng 10000 | gọi a.sync() | gọi assert.equal(calls.filter(r=>r[0]==='move').length, 1, 'do not restart native walking') để kiểm tra hai giá trị bằng nhau
now+=10000;a.sync();assert.equal(calls.filter(r=>r[0]==='move').length,1,'do not restart native walking');
// [VI dòng gốc 32] gán gathering bằng true | gán point bằng null | cập nhật bằng toán tử += now bằng 10000 | gọi a.sync()
gathering=true;point=null;now+=10000;a.sync();assert.equal(a.status().reason,'native_gathering');
// [VI dòng gốc 33] gán gathering bằng false | gán m._c_a[1] bằng [[101,20]] | gọi a.sync() | gọi assert.deepEqual(calls.at(-1), ['move',102]) để kiểm tra cấu trúc hai giá trị tương đương
gathering=false;m._c_a[1]=[[101,20]];a.sync();assert.deepEqual(calls.at(-1),['move',102]);
// [VI dòng gốc 34] gọi m._c_a[1].push([102,2]) để thêm phần tử vào cuối mảng | gán point bằng null | gọi a.sync() | gọi assert.deepEqual(calls.at(-1), ['target',7500,1,49]) để kiểm tra cấu trúc hai giá trị tương đương
m._c_a[1].push([102,2]);point=null;a.sync();assert.deepEqual(calls.at(-1),['target',7500,1,49]);
const beastBoss=(occ,type=1)=>({isValid:true,property:{get(k){return {occ,type,hp:[100,100]}[k];}}});
assert.equal(a.basicCombatReady(beastBoss(7500)),true,'Boss phase authorizes BASIC FORCE');
assert.equal(a.basicCombatReady(beastBoss(9999)),false,'Wrong target never authorized');
assert.equal(a.basicCombatReady(beastBoss(7500,4)),false,'Player target excluded');
gathering=true;assert.equal(a.basicCombatReady(beastBoss(7500)),false,'Crystal collection must suspend combat');gathering=false;
// [VI dòng gốc 35] Khai báo biến không gán lại bằng const: n = đọc calls.length | gọi m.setTarget(8000, 1, 49) để đặt mục tiêu qua đối tượng đang gọi | gọi m.setTarget('enemy', 2, 49) để đặt mục tiêu qua đối tượng đang gọi | gọi m.MASequenceAutoFight()
const n=calls.length;m.setTarget(8000,1,49);m.setTarget('enemy',2,49);m.MASequenceAutoFight();assert.equal(calls.length,n);
// [VI dòng gốc 36] gọi assert.equal(a.status().quota.boss.remaining, 3, 'dispatch does not consume quota') để kiểm tra hai giá trị bằng nhau
assert.equal(a.status().quota.boss.remaining,3,'dispatch does not consume quota');
// [VI dòng gốc 37] gán m._c_a[0] bằng 3 | gọi a.sync() | gọi assert.deepEqual(calls.at(-1), ['map',0]) để kiểm tra cấu trúc hai giá trị tương đương
m._c_a[0]=3;a.sync();assert.deepEqual(calls.at(-1),['map',0]);
assert.equal(a.basicCombatReady(beastBoss(7500)),false,'Server quota complete revokes BASIC FORCE');a.sync();assert.equal(calls.at(-1)[1],0);
// [VI dòng gốc 38] gán type bằng 0 | gán map bằng 1 | gọi a.sync() | gọi assert.equal(lease, null) để kiểm tra hai giá trị bằng nhau
type=0;map=1;a.sync();assert.equal(lease,null);assert.equal(stage.auto,true);assert.equal(a.status().phase,'DONE');
// [VI dòng gốc 39] gọi assert.equal(m.setTarget, original) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(m.MASequenceAutoFight, autoOriginal) để kiểm tra hai giá trị bằng nhau
assert.equal(m.setTarget,original);assert.equal(m.MASequenceAutoFight,autoOriginal);
// [VI dòng gốc 40] Khai báo biến không gán lại bằng const: entries = đọc calls.filter(r=>r[0]==='map').length | gán a bằng load() | gọi assert.equal(intervals, 1) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(calls.filter(r=>r[0]==='map').length, entries) để kiểm tra hai giá trị bằng nhau
const entries=calls.filter(r=>r[0]==='map').length;a=load();assert.equal(intervals,1);assert.equal(calls.filter(r=>r[0]==='map').length,entries);
// [VI dòng gốc 41] gán m._c_a bằng [0,[],[],false] | cập nhật bằng toán tử += now bằng 86400000 | gán alive bằng false | gọi a.sync()
m._c_a=[0,[],[],false];now+=86400000;alive=false;a.sync();assert.deepEqual(calls.at(-1),['map',4902,2]);
// [VI dòng gốc 42] gán type bằng 49 | gán map bằng 4902 | gán m._c_a[1] bằng [[101,20],[102,2]] | gọi a.sync()
type=49;map=4902;m._c_a[1]=[[101,20],[102,2]];a.sync();assert.equal(a.status().reason,'waiting_respawn');
// [VI dòng gốc 43] cập nhật bằng toán tử += now bằng 46000 | gọi a.sync() | gọi assert.equal(a.status().phase, 'EXITING') để kiểm tra hai giá trị bằng nhau
now+=46000;a.sync();assert.equal(a.status().phase,'EXITING');
// [VI dòng gốc 44] gọi a.stop() để dừng bộ điều khiển và dọn tài nguyên | gán type bằng 0 | gán map bằng 1 | gán m._c_a bằng null
a.stop();type=0;map=1;m._c_a=null;now+=60000;a=load();assert.equal(a.status().reason,'waiting_native_config_and_server_quotas');
// [VI dòng gốc 45] gán W._Ba._rJ._O$.ins.actorId bằng 'other' | gọi a.sync() | gọi assert.equal(a.status().enabled, false) để kiểm tra hai giá trị bằng nhau
W._Ba._rJ._O$.ins.actorId='other';a.sync();assert.equal(a.status().enabled,false);
// [VI dòng gốc 46] gọi console.log('PASS beast island: server quotas, daily reset, native gather preservation, 750-only guard, idle release, reload cleanup…)
console.log('PASS beast island: server quotas, daily reset, native gather preservation, 750-only guard, idle release, reload cleanup, unknown data and identity gates');
// [VI dòng gốc 47] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 48] gán W._Ba._rJ._O$.ins.actorId bằng 'a' | gán m._c_a bằng [0,[[101,20],[102,2]],[],false] | cập nhật bằng toán tử += now bằng 60001
W._Ba._rJ._O$.ins.actorId='a';m._c_a=[0,[[101,20],[102,2]],[],false];now+=60001;
// [VI dòng gốc 49] gọi rows.push([4901,1,0,1,5000]) để thêm phần tử vào cuối mảng | gán W._ft._gci.ins.getMABosss bằng layer=>rows.filter(r=>r[1]===layer)
rows.push([4901,1,0,1,5000]);W._ft._gci.ins.getMABosss=layer=>rows.filter(r=>r[1]===layer);
// [VI dòng gốc 50] gán W._ft._tY.ins.getCfgById bằng occ=>[0,0,0,0,0,0,occ===5000?500:occ===7500?750:800]
W._ft._tY.ins.getCfgById=occ=>[0,0,0,0,0,0,occ===5000?500:occ===7500?750:800];
// [VI dòng gốc 51] gán alive bằng true | gán a bằng load() | gọi a.setBossLevel(500) để đổi lựa chọn cấp boss cho nhân vật hiện tại | cập nhật bằng toán tử += now bằng 60001
alive=true;a=load();a.setBossLevel(500);now+=60001;a.sync();assert.deepEqual(calls.at(-1),['map',4901,1]);
// [VI dòng gốc 52] gán map bằng 4901 | gán type bằng 49 | gán m.getCurMapLevel bằng ()=>1 | gọi a.sync()
map=4901;type=49;m.getCurMapLevel=()=>1;a.sync();assert.deepEqual(calls.at(-1),['target',5000,1,49]);
// [VI dòng gốc 53] Khai báo biến không gán lại bằng const: total = đọc calls.length | gọi m.setTarget(7500, 1, 49) để đặt mục tiêu qua đối tượng đang gọi | gọi assert.equal(calls.length, total, 'clone must not select 750') để kiểm tra hai giá trị bằng nhau
const total=calls.length;m.setTarget(7500,1,49);assert.equal(calls.length,total,'clone must not select 750');
// [VI dòng gốc 54] gán a bằng load() | gọi assert.equal(a.status().bossLevel, 500, 'per-account setting survives hot reload') để kiểm tra hai giá trị bằng nhau
a=load();assert.equal(a.status().bossLevel,500,'per-account setting survives hot reload');
// [VI dòng gốc 55] gọi assert.throws(()=>a.setBossLevel(800)) để kiểm tra đoạn mã có ném lỗi như dự kiến | gọi a.stop() để dừng bộ điều khiển và dọn tài nguyên
assert.throws(()=>a.setBossLevel(800));a.stop();
// [VI dòng gốc 56] gọi console.log('PASS clone boss500: resolve configured layer, select only 500, reject 750, retain setting on reload')
console.log('PASS clone boss500: resolve configured layer, select only 500, reject 750, retain setting on reload');
// [VI dòng gốc 57] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 58] Chú thích gốc của tác giả; không được thực thi. Nội dung: Clone vào tầng 2 chỉ thu thập; đầy quota thì thoát ngay, không chọn Boss tầng 2.
// Clone vào tầng 2 chỉ thu thập; đầy quota thì thoát ngay, không chọn Boss tầng 2.
// [VI dòng gốc 59] gán type bằng 0 | gán map bằng 1 | gán m._c_a bằng [0,[],[],false] | cập nhật bằng toán tử += now bằng 60001
type=0;map=1;m._c_a=[0,[],[],false];now+=60001;a=load();a.sync();assert.deepEqual(calls.at(-1),['map',4902,2]);
// [VI dòng gốc 60] gán type bằng 49 | gán map bằng 4902 | gán m.getCurMapLevel bằng ()=>2 | gọi a.sync()
type=49;map=4902;m.getCurMapLevel=()=>2;a.sync();assert.deepEqual(calls.at(-1),['move',101]);
// [VI dòng gốc 61] Khai báo biến không gán lại bằng const: before = đọc calls.length | gọi m.setTarget(7500, 1, 49) để đặt mục tiêu qua đối tượng đang gọi | gọi m.setTarget(5000, 1, 49) để đặt mục tiêu qua đối tượng đang gọi | gọi assert.equal(calls.length, before) để kiểm tra hai giá trị bằng nhau
const before=calls.length;m.setTarget(7500,1,49);m.setTarget(5000,1,49);assert.equal(calls.length,before);
// [VI dòng gốc 62] gán m._c_a[1] bằng [[101,20],[102,2]] | gán point bằng null | gọi a.sync() | gọi assert.equal(a.status().phase, 'EXITING') để kiểm tra hai giá trị bằng nhau
m._c_a[1]=[[101,20],[102,2]];point=null;a.sync();assert.equal(a.status().phase,'EXITING');assert.deepEqual(calls.at(-1),['map',0]);
// [VI dòng gốc 63] gán type bằng 0 | gán map bằng 1 | gọi a.sync() | cập nhật bằng toán tử += now bằng 60001
type=0;map=1;a.sync();now+=60001;a.sync();assert.deepEqual(calls.at(-1),['map',4901,1]);
// [VI dòng gốc 64] gán type bằng 49 | gán map bằng 4901 | gán m.getCurMapLevel bằng ()=>1 | gọi a.sync()
type=49;map=4901;m.getCurMapLevel=()=>1;a.sync();assert.deepEqual(calls.at(-1),['target',5000,1,49]);
// [VI dòng gốc 65] gán m._c_a[0] bằng 3 | gọi a.sync() | gọi assert.deepEqual(calls.at(-1), ['map',0]) để kiểm tra cấu trúc hai giá trị tương đương | gọi a.stop() để dừng bộ điều khiển và dọn tài nguyên
m._c_a[0]=3;a.sync();assert.deepEqual(calls.at(-1),['map',0]);a.stop();
// [VI dòng gốc 66] Chú thích gốc của tác giả; không được thực thi. Nội dung: Tự chuyển cấu hình clone cũ 600 -> 500, không đổi mặc định acc chính.
// Tự chuyển cấu hình clone cũ 600 -> 500, không đổi mặc định acc chính.
// [VI dòng gốc 67] gán W.localStorage bằng {getItem:()=> '600'} | gán a bằng load() | gọi assert.equal(a.status().bossLevel, 500) để kiểm tra hai giá trị bằng nhau | gọi a.stop() để dừng bộ điều khiển và dọn tài nguyên
W.localStorage={getItem:()=> '600'};a=load();assert.equal(a.status().bossLevel,500);a.stop();
// [VI dòng gốc 68] gọi console.log('PASS clone route: collect layer2 -> exit -> boss500 layer1 -> exit at three server credits; legacy600 migrates')
console.log('PASS clone route: collect layer2 -> exit -> boss500 layer1 -> exit at three server credits; legacy600 migrates');
// [VI dòng gốc 69] Dòng trống để tách các phần, không có lệnh thực thi.
