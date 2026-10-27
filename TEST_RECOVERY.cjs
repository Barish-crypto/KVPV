// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: Kiểm thử mô phỏng: RECOVERY. Các assert bên dưới ghi điều kiện phải giữ; không chứng minh máy chủ game chấp nhận tốc độ hoặc tầm đánh. [đóng chú thích]
/* Kiểm thử mô phỏng: RECOVERY. Các assert bên dưới ghi điều kiện phải giữ; không chứng minh máy chủ game chấp nhận tốc độ hoặc tầm đánh. */
// [VI dòng gốc 2] "use strict"
'use strict';
// [VI dòng gốc 3] Khai báo biến không gán lại bằng const: fs = gọi require('node:fs') để nạp module Node.js; vm = gọi require('node:vm') để nạp module Node.js; assert = gọi require('node:assert/strict') để nạp module Node.js
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
// [VI dòng gốc 4] Khai báo biến không gán lại bằng const: engine = gọi fs.readFileSync(__dirname+'/src/04-engine.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm, '')
const engine=fs.readFileSync(__dirname+'/src/04-engine.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,'');
// [VI dòng gốc 5] Khai báo biến không gán lại bằng const: policy = gọi fs.readFileSync(__dirname+'/src/00-boss-recovery.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm, '')
const policy=fs.readFileSync(__dirname+'/src/00-boss-recovery.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,'');
// [VI dòng gốc 6] Định nghĩa hàm moduleAt; tham số: marker, endMarker | Khai báo biến không gán lại bằng const: at = gọi engine.indexOf(marker) | gọi assert(at>0) để kiểm tra điều kiện của bài test | Khai báo biến không gán lại bằng const: start = gọi engine.lastIndexOf('(() => {', at)
function moduleAt(marker,endMarker){const at=engine.indexOf(marker);assert(at>0);const start=engine.lastIndexOf('(() => {',at);const end=engine.indexOf(endMarker,at);assert(end>start);return engine.slice(start,end);}
// [VI dòng gốc 7] Khai báo biến không gán lại bằng const: trackerSource = gọi moduleAt('maxAdaptiveResumePct:100,resumeFightPct:100,returnPct:100,', "(() => {\n 'use strict';\n const W=window, TAG='[HITRUN")
const trackerSource=moduleAt('maxAdaptiveResumePct:100,resumeFightPct:100,returnPct:100,',"(() => {\n  'use strict';\n  const W=window, TAG='[HITRUN");
// [VI dòng gốc 8] Khai báo biến không gán lại bằng const: hitrunSource = gọi moduleAt("const W=window, TAG='[HITRUN-V11.5.2-CLEAN]'", '[mở chú thích] V10.3: Boss-only')
const hitrunSource=moduleAt("const W=window, TAG='[HITRUN-V11.5.2-CLEAN]'",'/* V10.3: Boss-only');
// [VI dòng gốc 9] Định nghĩa hàm harness; tham số: options={}
function harness(options={}){
// [VI dòng gốc 10] Khai báo biến có thể gán lại bằng let: time = 0; current = 100; bossHP = 100; range = 280; bossX = 0; damageListener = null | Khai báo biến không gán lại bằng const: timers = tạo đối tượng bằng Map(); moves = tạo mảng gồm 0 vị trí: []
 let time=0,current=100,bossHP=100,range=280,bossX=0,damageListener=null;const timers=new Map(),moves=[];
// [VI dòng gốc 11] Khai báo biến không gán lại bằng const: values = tạo đối tượng gồm id, type, hp, position
 const values={id:'123456',type:3,hp:null,position:{x:250,y:0}};
// [VI dòng gốc 12] Khai báo biến không gán lại bằng const: boss = tạo đối tượng gồm id, isValid, property, on, off | Kết thúc hàm hiện tại và trả về: đọc {id:'boss1',type:1,occ:99,name:'Thiên Quan Boss',hp:[bossHP,100],position:{x:bossX,y:0}}[k].
 const boss={id:'boss1',isValid:true,property:{get(k){return {id:'boss1',type:1,occ:99,name:'Thiên Quan Boss',hp:[bossHP,100],position:{x:bossX,y:0}}[k];}},on(){},off(){}};
// [VI dòng gốc 13] Khai báo biến có thể gán lại bằng let: destination = null; readyAt = 0
 let destination=null,readyAt=0;
// [VI dòng gốc 14] Khai báo biến không gán lại bằng const: mover = tạo đối tượng gồm moveTo, stop, running | gọi moves.push({x,y}) để thêm phần tử vào cuối mảng | Kiểm tra options.slowMove: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gán destination bằng {x,y}
 const mover={moveTo(x,y){moves.push({x,y});if(options.slowMove){destination={x,y};readyAt=time+400;}else values.position={x,y};},stop(){destination=null;},running(){return options.slowMove&&destination!==null;}};
// [VI dòng gốc 15] Khai báo biến không gán lại bằng const: combat = tạo đối tượng gồm target, combat, isValidTarget | Kết thúc hàm hiện tại và trả về: "native attack". | Kết thúc hàm hiện tại và trả về: true.
 const combat={target:boss,combat(){return 'native attack';},isValidTarget(){return true;}};
// [VI dòng gốc 16] Khai báo biến không gán lại bằng const: Move = tạo hàm với tham số (không có); Combat = tạo hàm với tham số (không có)
 const Move=function(){},Combat=function(){};
// [VI dòng gốc 17] Khai báo biến không gán lại bằng const: me = tạo đối tượng gồm id, isValid, property, getComponent, on, off | Kết thúc hàm hiện tại và trả về: nếu k==='hp' thì lấy [current,100], ngược lại lấy values[k]. | Kết thúc hàm hiện tại và trả về: nếu type===Move thì lấy mover, ngược lại lấy type===Combat?combat:null. | Kiểm tra id===1012: đúng thì chạy nhánh sau if.
 const me={id:'123456',isValid:true,property:{get(k){return k==='hp'?[current,100]:values[k];}},getComponent(type){return type===Move?mover:type===Combat?combat:null;},on(id,owner,fn){if(id===1012)damageListener=fn;},off(){}};
// [VI dòng gốc 18] Khai báo biến không gán lại bằng const: Ba = tạo đối tượng gồm _rJ, _$a, _Co
 const Ba={_rJ:{_O$:{ins:{actorId:'123456'}}},_$a:{_yo:{ins:{intoSce:[10]}}},_Co:{_Mo:{ins:{curLv:1}}}};
// [VI dòng gốc 19] Khai báo biến không gán lại bằng const: ft = tạo đối tượng gồm _tY, _h$ | Kết thúc hàm hiện tại và trả về: tạo mảng gồm 4 vị trí: [0,0,0,range]. | Kết thúc hàm hiện tại và trả về: true. | Kết thúc hàm hiện tại và trả về: tạo mảng gồm 1 vị trí: [10].
 const ft={_tY:{ins:{getCfgById(){return [0,0,0,range];},isBoss(){return true;}}},_h$:{ins:{getCfgByLv(){return [10];},occ(){return 99;}}}};
// [VI dòng gốc 20] Khai báo biến có thể gán lại bằng let: next = 0 | Khai báo biến không gán lại bằng const: W = tạo đối tượng gồm __KVPV_OWN_ACTOR_ID, KVPV, setInterval, clearInterval | Kết thúc hàm hiện tại và trả về: true.
 let next=0;const W={__KVPV_OWN_ACTOR_ID:'123456',KVPV:{core:{scene:{acquire(){return true;},renew(){},release(){}}}},
// [VI dòng gốc 21] Khai báo biến không gán lại bằng const: id = tăng next một đơn vị trước khi lấy giá trị | gọi timers.set(id, fn) | Kết thúc hàm hiện tại và trả về: id. | gọi timers.delete(id)
 setInterval(fn){const id=++next;timers.set(id,fn);return id;},clearInterval(id){timers.delete(id);}};
// [VI dòng gốc 22] Khai báo biến không gán lại bằng const: context = tạo đối tượng gồm window, _Ba, _ft, _d, _C, performance, console, document, Date, Math | Kết thúc hàm hiện tại và trả về: nếu String(id)==='123456' thì lấy me, ngược lại lấy boss.
 const context={window:W,_Ba:Ba,_ft:ft,_d:{_Yct:{_zet:Move,_Het:Combat}},_C:{_Ba:{instance:{getRole(id){return String(id)==='123456'?me:boss;}}}},
// [VI dòng gốc 23] Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error(args.join(' '))
 performance:{now:()=>time},console:{info(){},warn(){},log(){},table(){},error(...args){throw Error(args.join(' '));}},document:{hidden:false},Date,Math};
// [VI dòng gốc 24] gọi vm.runInNewContext(policy, context) để chạy mã trong ngữ cảnh máy ảo dùng cho kiểm thử | gọi vm.runInNewContext(fs.readFileSync(__dirname+'/src/00-boss-session.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,''), context) để chạy mã trong ngữ cảnh máy ảo dùng cho kiểm thử | gọi vm.runInNewContext(trackerSource, context) để chạy mã trong ngữ cảnh máy ảo dùng cho kiểm thử | gọi vm.runInNewContext(hitrunSource, context) để chạy mã trong ngữ cảnh máy ảo dùng cho kiểm thử
 vm.runInNewContext(policy,context);vm.runInNewContext(fs.readFileSync(__dirname+'/src/00-boss-session.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,''),context);vm.runInNewContext(trackerSource,context);vm.runInNewContext(hitrunSource,context);
// [VI dòng gốc 25] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm W, mover, combat, moves, values, boss, hp, range, bossHP, bossX, hit, tick, start, status. | gán current bằng v | gán range bằng v | gán bossHP bằng v
 return {W,mover,combat,moves,values,boss,hp(v){current=v;},range(v){range=v;},bossHP(v){bossHP=v;},bossX(v){bossX=v;},hit(source='boss1',flags=0){assert(damageListener);damageListener(source,90230000,10,flags,'123456');},tick(ms=500){
// [VI dòng gốc 26] Khai báo biến không gán lại bằng const: previous = time | cập nhật bằng toán tử += time bằng ms
  const previous=time;time+=ms;
// [VI dòng gốc 27] Kiểm tra destination&&time>readyAt: đúng thì chạy nhánh sau if. | Khai báo biến không gán lại bằng const: p = đọc values.position; dx = tính biểu thức destination.x-p.x; dy = tính biểu thức destination.y-p.y; d = gọi Math.hypot(dx, dy); travel = tính biểu thức 80*Math.max(0,time-Math.max(previous,readyAt))/1000
  if(destination&&time>readyAt){const p=values.position,dx=destination.x-p.x,dy=destination.y-p.y,d=Math.hypot(dx,dy),travel=80*Math.max(0,time-Math.max(previous,readyAt))/1000;
// [VI dòng gốc 28] Kiểm tra travel>=d: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gán values.position bằng {...destination} | gán destination bằng null | gán values.position bằng {x:p.x+dx/d*travel,y:p.y+dy/d*travel}
   if(travel>=d){values.position={...destination};destination=null;}else values.position={x:p.x+dx/d*travel,y:p.y+dy/d*travel};}
// [VI dòng gốc 29] Duyệt từng giá trị trong [...timers.values()] bằng const fn. | Khai báo biến không gán lại bằng const: fn (chưa gán giá trị) | gọi fn()
  for(const fn of [...timers.values()])fn();
// [VI dòng gốc 30] Kết thúc hàm hiện tại và trả về: gọi W.KVPV_HITRUN1.start() để khởi động bộ điều khiển. | Kết thúc hàm hiện tại và trả về: gọi W.KVPV_HITRUN1.status(false) để trả trạng thái để kiểm tra.
 },start(){return W.KVPV_HITRUN1.start();},status(){return W.KVPV_HITRUN1.status(false);}};
// [VI dòng gốc 31] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 32] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 33] Khai báo biến có thể gán lại bằng let: passed = 0
let passed=0;
// [VI dòng gốc 34] Định nghĩa hàm test; tham số: name, fn | gọi fn() | tăng passed một đơn vị sau khi lấy giá trị | gọi console.log('PASS', name)
function test(name,fn){fn();passed++;console.log('PASS',name);}
// [VI dòng gốc 35] Định nghĩa hàm retreat; tham số: q | gọi q.start() để khởi động bộ điều khiển | gọi q.hp(35) | gọi q.tick() để xử lý một nhịp kiểm tra
function retreat(q){q.start();q.hp(35);q.tick();assert.equal(q.status().phase,'RETREAT');}
// [VI dòng gốc 36] Định nghĩa hàm segmentDistance; tham số: p, q, b={x:0,y:0} | Khai báo biến không gán lại bằng const: x = tính biểu thức q.x-p.x; y = tính biểu thức q.y-p.y; k = gọi Math.max(0, Math.min(1,((b.x-p.x)*x+(b.y-p.y)*y)/(x*x+y*y||1))) | Kết thúc hàm hiện tại và trả về: gọi Math.hypot(p.x+k*x-b.x, p.y+k*y-b.y).
function segmentDistance(p,q,b={x:0,y:0}){const x=q.x-p.x,y=q.y-p.y,k=Math.max(0,Math.min(1,((b.x-p.x)*x+(b.y-p.y)*y)/(x*x+y*y||1)));return Math.hypot(p.x+k*x-b.x,p.y+k*y-b.y);}
// [VI dòng gốc 37] gọi test('exactly 35% triggers retreat and blocks native attacks/chase', ()=>{ const q=harness();retreat(q);assert.equal(q.combat…)
test('exactly 35% triggers retreat and blocks native attacks/chase',()=>{
// [VI dòng gốc 38] Khai báo biến không gán lại bằng const: q = gọi harness() | gọi retreat(q) | gọi assert.equal(q.combat.combat(8001), undefined) để kiểm tra hai giá trị bằng nhau
 const q=harness();retreat(q);assert.equal(q.combat.combat(8001),undefined);
// [VI dòng gốc 39] gọi assert.equal(typeof q.combat.combat.__KVPV_GUARD_PARENT, 'function') để kiểm tra hai giá trị bằng nhau
 assert.equal(typeof q.combat.combat.__KVPV_GUARD_PARENT,'function');
// [VI dòng gốc 40] gọi assert(q.moves.length>0) để kiểm tra điều kiện của bài test | gọi assert(Math.hypot(q.values.position.x,q.values.position.y)>280) để kiểm tra điều kiện của bài test
 assert(q.moves.length>0);assert(Math.hypot(q.values.position.x,q.values.position.y)>280);
// [VI dòng gốc 41] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 42] gọi test('70%, 99% and 99.999% never release recovery', ()=>{ const q=harness();retreat(q);for(const hp of [70,99,99.999]){q.hp(h…)
test('70%, 99% and 99.999% never release recovery',()=>{
// [VI dòng gốc 43] Khai báo biến không gán lại bằng const: q = gọi harness() | gọi retreat(q) | Duyệt từng giá trị trong [70,99,99.999] bằng const hp. | Khai báo biến không gán lại bằng const: hp (chưa gán giá trị)
 const q=harness();retreat(q);for(const hp of [70,99,99.999]){q.hp(hp);for(let i=0;i<8;i++)q.tick();assert.equal(q.status().phase,'RETREAT');assert.equal(q.combat.combat(8001),undefined);}
// [VI dòng gốc 44] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 45] gọi test('100% stable HP resumes native combat, then repeats another cycle', ()=>{ const q=harness();retreat(q);q.hp(100);q.tick(…)
test('100% stable HP resumes native combat, then repeats another cycle',()=>{
// [VI dòng gốc 46] Khai báo biến không gán lại bằng const: q = gọi harness() | gọi retreat(q) | gọi q.hp(100) | gọi q.tick(1500) để xử lý một nhịp kiểm tra
 const q=harness();retreat(q);q.hp(100);q.tick(1500);assert.equal(q.status().phase,'RETREAT');q.tick(400);assert.equal(q.status().phase,'FIGHT');assert.equal(q.combat.combat(8001),'native attack');
// [VI dòng gốc 47] gọi q.hp(35) | gọi q.tick() để xử lý một nhịp kiểm tra | gọi assert.equal(q.status().phase, 'RETREAT') để kiểm tra hai giá trị bằng nhau | gọi q.hp(100)
 q.hp(35);q.tick();assert.equal(q.status().phase,'RETREAT');q.hp(100);q.tick(1500);q.tick(400);assert.equal(q.status().phase,'FIGHT');assert.equal(q.status().completedRetreats,2);
// [VI dòng gốc 48] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 49] gọi test('transient full HP resets confirmation when health falls', ()=>{ const q=harness();retreat(q);q.hp(100);q.tick(1500);q.h…)
test('transient full HP resets confirmation when health falls',()=>{
// [VI dòng gốc 50] Khai báo biến không gán lại bằng const: q = gọi harness() | gọi retreat(q) | gọi q.hp(100) | gọi q.tick(1500) để xử lý một nhịp kiểm tra
 const q=harness();retreat(q);q.hp(100);q.tick(1500);q.hp(99);q.tick();q.hp(100);q.tick();assert.equal(q.status().phase,'RETREAT');q.tick(400);assert.equal(q.status().phase,'FIGHT');
// [VI dòng gốc 51] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 52] gọi test('orbit chords remain outside Boss range through multiple waypoints', ()=>{ const q=harness();retreat(q);let previous={..…)
test('orbit chords remain outside Boss range through multiple waypoints',()=>{
// [VI dòng gốc 53] Khai báo biến không gán lại bằng const: q = gọi harness() | gọi retreat(q) | Khai báo biến có thể gán lại bằng let: previous = tạo đối tượng gồm các thuộc tính của q.values.position | Khai báo biến có thể gán lại bằng let: orbitMoves = 0
 const q=harness();retreat(q);let previous={...q.values.position};let orbitMoves=0;
// [VI dòng gốc 54] Lặp for: khởi tạo let i=0; tiếp tục khi i<35; sau mỗi vòng i++. | Khai báo biến có thể gán lại bằng let: i = 0 | Khai báo biến không gán lại bằng const: n = đọc q.moves.length | gọi q.tick(1000) để xử lý một nhịp kiểm tra
 for(let i=0;i<35;i++){const n=q.moves.length;q.tick(1000);if(q.moves.length>n){const next={...q.values.position};assert(segmentDistance(previous,next)>280);previous=next;orbitMoves++;}}
// [VI dòng gốc 55] gọi assert(orbitMoves>=8) để kiểm tra điều kiện của bài test | gọi assert.equal(q.status().phase, 'RETREAT') để kiểm tra hai giá trị bằng nhau
 assert(orbitMoves>=8);assert.equal(q.status().phase,'RETREAT');
// [VI dòng gốc 56] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 57] gọi test('Boss range above old radius cap expands the recovery ring', ()=>{ const q=harness();q.range(600);retreat(q);assert(q.st…)
test('Boss range above old radius cap expands the recovery ring',()=>{
// [VI dòng gốc 58] Khai báo biến không gán lại bằng const: q = gọi harness() | gọi q.range(600) | gọi retreat(q) | gọi assert(q.status().recoveryRing>=680) để kiểm tra điều kiện của bài test
 const q=harness();q.range(600);retreat(q);assert(q.status().recoveryRing>=680);assert(Math.hypot(q.values.position.x,q.values.position.y)>=680);
// [VI dòng gốc 59] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 60] gọi test('moving Boss causes replan instead of aborting recovery', ()=>{ const q=harness();retreat(q);q.bossX(200);q.tick(5000);a…)
test('moving Boss causes replan instead of aborting recovery',()=>{
// [VI dòng gốc 61] Khai báo biến không gán lại bằng const: q = gọi harness() | gọi retreat(q) | gọi q.bossX(200) | gọi q.tick(5000) để xử lý một nhịp kiểm tra
 const q=harness();retreat(q);q.bossX(200);q.tick(5000);assert.equal(q.status().running,true);assert.equal(q.status().phase,'RETREAT');assert(Math.hypot(q.values.position.x-200,q.values.position.y)>280);
// [VI dòng gốc 62] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 63] gọi test('no healing keeps orbit active instead of timed attack reentry', ()=>{ const q=harness();retreat(q);for(let i=0;i<40;i++…)
test('no healing keeps orbit active instead of timed attack reentry',()=>{
// [VI dòng gốc 64] Khai báo biến không gán lại bằng const: q = gọi harness() | gọi retreat(q) | Lặp for: khởi tạo let i=0; tiếp tục khi i<40; sau mỗi vòng i++. | Khai báo biến có thể gán lại bằng let: i = 0
 const q=harness();retreat(q);for(let i=0;i<40;i++)q.tick(1000);assert.equal(q.status().running,true);assert.equal(q.status().phase,'RETREAT');
// [VI dòng gốc 65] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 66] gọi test('Boss death stops controller during fight and retreat', ()=>{ for(const recovering of [false,true]){const q=harness();if…)
test('Boss death stops controller during fight and retreat',()=>{
// [VI dòng gốc 67] Duyệt từng giá trị trong [false,true] bằng const recovering. | Khai báo biến không gán lại bằng const: recovering (chưa gán giá trị) | Khai báo biến không gán lại bằng const: q = gọi harness() | Kiểm tra recovering: đúng thì chạy nhánh sau if, sai thì chạy nhánh else.
 for(const recovering of [false,true]){const q=harness();if(recovering)retreat(q);else q.start();q.bossHP(0);q.tick();assert.equal(q.status().running,false);assert.equal(q.status().phase,'OFF');}
// [VI dòng gốc 68] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 69] gọi test('legacy recovery controls cannot lower full-health gate', ()=>{ const q=harness();retreat(q);assert.equal(q.W.KVPV_V127_…)
test('legacy recovery controls cannot lower full-health gate',()=>{
// [VI dòng gốc 70] Khai báo biến không gán lại bằng const: q = gọi harness() | gọi retreat(q) | gọi assert.equal(q.W.KVPV_V127_HEAL.setResumePct(70), false) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.W.KVPV_V127_HEAL.enable(false), false) để kiểm tra hai giá trị bằng nhau
 const q=harness();retreat(q);assert.equal(q.W.KVPV_V127_HEAL.setResumePct(70),false);assert.equal(q.W.KVPV_V127_HEAL.enable(false),false);q.W.KVPV_V127_HEAL.config.enabled=false;q.hp(99);q.tick(5000);assert.equal(q.status().phase,'RETREAT');assert.equal(q.W.KVPV_V127_HEAL.status().resumeHpPct,100);
// [VI dòng gốc 71] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 72] gọi test('real controller trace captures recovery, HP loss and full-health return', ()=>{ const q=harness();q.W.KVPV_BOSS_LOG.sta…)
test('real controller trace captures recovery, HP loss and full-health return',()=>{
// [VI dòng gốc 73] Khai báo biến không gán lại bằng const: q = gọi harness() | gọi q.W.KVPV_BOSS_LOG.start() để khởi động bộ điều khiển | gọi retreat(q) | gọi q.hp(30)
 const q=harness();q.W.KVPV_BOSS_LOG.start();retreat(q);q.hp(30);q.tick();q.hp(100);q.tick(1500);q.tick(400);
// [VI dòng gốc 74] Khai báo biến không gán lại bằng const: report = gọi q.W.KVPV_BOSS_LOG.report() | gọi assert.equal(report.summary.completedReturns, 1) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(report.summary.earlyReturns, 0) để kiểm tra hai giá trị bằng nhau
 const report=q.W.KVPV_BOSS_LOG.report();assert.equal(report.summary.completedReturns,1);assert.equal(report.summary.earlyReturns,0);
// [VI dòng gốc 75] gọi assert(report.summary.hpDropsDuringRetreat>=1) để kiểm tra điều kiện của bài test | gọi assert(report.summary.movementCommands>=1) để kiểm tra điều kiện của bài test
 assert(report.summary.hpDropsDuringRetreat>=1);assert(report.summary.movementCommands>=1);
// [VI dòng gốc 76] gọi q.W.KVPV_BOSS_LOG.stop() để dừng bộ điều khiển và dọn tài nguyên | gọi assert.equal(q.status().running, true) để kiểm tra hai giá trị bằng nhau
 q.W.KVPV_BOSS_LOG.stop();assert.equal(q.status().running,true);
// [VI dòng gốc 77] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 78] gọi test('native-speed movement reaches outer ring and orbits without repeated path resets', ()=>{ const q=harness({slowMove:true…)
test('native-speed movement reaches outer ring and orbits without repeated path resets',()=>{
// [VI dòng gốc 79] Khai báo biến không gán lại bằng const: q = gọi harness({slowMove:true}) | gọi retreat(q)
 const q=harness({slowMove:true});retreat(q);
// [VI dòng gốc 80] Lặp for: khởi tạo let i=0; tiếp tục khi i<100; sau mỗi vòng i++. | Khai báo biến có thể gán lại bằng let: i = 0 | gọi q.tick(140) để xử lý một nhịp kiểm tra
 for(let i=0;i<100;i++)q.tick(140);
// [VI dòng gốc 81] gọi assert.equal(q.status().running, true) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.status().phase, 'RETREAT') để kiểm tra hai giá trị bằng nhau
 assert.equal(q.status().running,true);assert.equal(q.status().phase,'RETREAT');
// [VI dòng gốc 82] gọi assert(Math.hypot(q.values.position.x,q.values.position.y)>280, 'must reach outside Boss range') để kiểm tra điều kiện của bài test
 assert(Math.hypot(q.values.position.x,q.values.position.y)>280,'must reach outside Boss range');
// [VI dòng gốc 83] gọi assert(q.W.KVPV_V125_ORBIT.status().arcWaypoints>=2, 'must continue on circular arc') để kiểm tra điều kiện của bài test
 assert(q.W.KVPV_V125_ORBIT.status().arcWaypoints>=2,'must continue on circular arc');
// [VI dòng gốc 84] gọi assert(q.moves.length<25, 'must not reset the native path every tick') để kiểm tra điều kiện của bài test
 assert(q.moves.length<25,'must not reset the native path every tick');
// [VI dòng gốc 85] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 86] gọi test('old survival forecast cannot start recovery at 58% HP', ()=>{ const q=harness();q.W.KVPV_V123_SURVIVAL={_decision(){ret…)
test('old survival forecast cannot start recovery at 58% HP',()=>{
// [VI dòng gốc 87] Khai báo biến không gán lại bằng const: q = gọi harness() | gán q.W.KVPV_V123_SURVIVAL bằng {_decision(){return {retreat:true,reason:'forecast',hpPct:58,thresholdPct:60};}} | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm retreat, reason, hpPct, thresholdPct.
 const q=harness();q.W.KVPV_V123_SURVIVAL={_decision(){return {retreat:true,reason:'forecast',hpPct:58,thresholdPct:60};}};
// [VI dòng gốc 88] gọi q.start() để khởi động bộ điều khiển | gọi q.hp(58) | gọi q.tick() để xử lý một nhịp kiểm tra | gọi assert.notEqual(q.status().phase, 'RETREAT')
 q.start();q.hp(58);q.tick();assert.notEqual(q.status().phase,'RETREAT');q.hp(35);q.tick();assert.equal(q.status().phase,'RETREAT');
// [VI dòng gốc 89] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 90] gọi test('direct Boss hit on outer ring expands ring and subsequent orbit', ()=>{ const q=harness();q.range(240);retreat(q);const…)
test('direct Boss hit on outer ring expands ring and subsequent orbit',()=>{
// [VI dòng gốc 91] Khai báo biến không gán lại bằng const: q = gọi harness() | gọi q.range(240) | gọi retreat(q) | Khai báo biến không gán lại bằng const: d = gọi Math.hypot(q.values.position.x, q.values.position.y)
 const q=harness();q.range(240);retreat(q);const d=Math.hypot(q.values.position.x,q.values.position.y);
// [VI dòng gốc 92] gọi q.hit() | gọi assert(q.status().observedDangerRadius>=d) để kiểm tra điều kiện của bài test | gọi assert(q.status().recoveryRing>=d+80) để kiểm tra điều kiện của bài test
 q.hit();assert(q.status().observedDangerRadius>=d);assert(q.status().recoveryRing>=d+80);
// [VI dòng gốc 93] gọi q.tick() để xử lý một nhịp kiểm tra | gọi assert(Math.hypot(q.values.position.x,q.values.position.y)>=d+80) để kiểm tra điều kiện của bài test
 q.tick();assert(Math.hypot(q.values.position.x,q.values.position.y)>=d+80);
// [VI dòng gốc 94] Lặp for: khởi tạo let i=0; tiếp tục khi i<8; sau mỗi vòng i++. | Khai báo biến có thể gán lại bằng let: i = 0 | gọi q.tick(1000) để xử lý một nhịp kiểm tra | gọi assert.equal(q.status().running, true) để kiểm tra hai giá trị bằng nhau
 for(let i=0;i<8;i++)q.tick(1000);assert.equal(q.status().running,true);
// [VI dòng gốc 95] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 96] gọi test('foreign hits and reflection flags never expand Boss ring', ()=>{ const q=harness();retreat(q);const before=q.status().r…)
test('foreign hits and reflection flags never expand Boss ring',()=>{
// [VI dòng gốc 97] Khai báo biến không gán lại bằng const: q = gọi harness() | gọi retreat(q) | Khai báo biến không gán lại bằng const: before = đọc q.status().recoveryRing | gọi q.hit('other')
 const q=harness();retreat(q);const before=q.status().recoveryRing;q.hit('other');q.hit('boss1',32);q.hit('boss1',4);
// [VI dòng gốc 98] gọi assert.equal(q.status().recoveryRing, before) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.status().observedDangerRadius, 0) để kiểm tra hai giá trị bằng nhau
 assert.equal(q.status().recoveryRing,before);assert.equal(q.status().observedDangerRadius,0);
// [VI dòng gốc 99] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 100] gọi test('native path slipping back near Boss triggers escape without waiting for stall timeout', ()=>{ const q=harness();retreat…)
test('native path slipping back near Boss triggers escape without waiting for stall timeout',()=>{
// [VI dòng gốc 101] Khai báo biến không gán lại bằng const: q = gọi harness() | gọi retreat(q) | gọi q.tick(140) để xử lý một nhịp kiểm tra
 const q=harness();retreat(q);q.tick(140);
// [VI dòng gốc 102] Khai báo biến không gán lại bằng const: angle = gọi Math.atan2(q.values.position.y, q.values.position.x)
 const angle=Math.atan2(q.values.position.y,q.values.position.x);
// [VI dòng gốc 103] gán q.values.position bằng {x:283*Math.cos(angle),y:283*Math.sin(angle)}
 q.values.position={x:283*Math.cos(angle),y:283*Math.sin(angle)};
// [VI dòng gốc 104] Khai báo biến không gán lại bằng const: before = đọc q.moves.length | gọi q.tick(140) để xử lý một nhịp kiểm tra
 const before=q.moves.length;q.tick(140);
// [VI dòng gốc 105] gọi assert(q.moves.length>before, 'must issue an escape before 2.2s stall timeout') để kiểm tra điều kiện của bài test
 assert(q.moves.length>before,'must issue an escape before 2.2s stall timeout');
// [VI dòng gốc 106] gọi assert(Math.hypot(q.values.position.x,q.values.position.y)>320) để kiểm tra điều kiện của bài test
 assert(Math.hypot(q.values.position.x,q.values.position.y)>320);
// [VI dòng gốc 107] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 108] gọi test('repeated native AI stop calls cannot cancel the owned retreat path', ()=>{ const q=harness({slowMove:true});retreat(q);…)
test('repeated native AI stop calls cannot cancel the owned retreat path',()=>{
// [VI dòng gốc 109] Khai báo biến không gán lại bằng const: q = gọi harness({slowMove:true}) | gọi retreat(q) | Lặp for: khởi tạo let i=0; tiếp tục khi i<100; sau mỗi vòng i++. | Khai báo biến có thể gán lại bằng let: i = 0
 const q=harness({slowMove:true});retreat(q);for(let i=0;i<100;i++){q.mover.stop();q.tick(140);}
// [VI dòng gốc 110] gọi assert.equal(q.status().phase, 'RETREAT') để kiểm tra hai giá trị bằng nhau | gọi assert(q.status().blockedNativeStops>0) để kiểm tra điều kiện của bài test
 assert.equal(q.status().phase,'RETREAT');assert(q.status().blockedNativeStops>0);
// [VI dòng gốc 111] gọi assert(Math.hypot(q.values.position.x,q.values.position.y)>280) để kiểm tra điều kiện của bài test | gọi assert(q.W.KVPV_V125_ORBIT.status().arcWaypoints>=2) để kiểm tra điều kiện của bài test
 assert(Math.hypot(q.values.position.x,q.values.position.y)>280);assert(q.W.KVPV_V125_ORBIT.status().arcWaypoints>=2);
// [VI dòng gốc 112] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 113] gọi test('immobilization still permits native stop during retreat', ()=>{ const q=harness({slowMove:true});retreat(q);assert.equa…)
test('immobilization still permits native stop during retreat',()=>{
// [VI dòng gốc 114] Khai báo biến không gán lại bằng const: q = gọi harness({slowMove:true}) | gọi retreat(q) | gọi assert.equal(q.mover.running(), true) để kiểm tra hai giá trị bằng nhau | gán q.mover._fut bằng 3
 const q=harness({slowMove:true});retreat(q);assert.equal(q.mover.running(),true);q.mover._fut=3;q.mover.stop();assert.equal(q.mover.running(),false);
// [VI dòng gốc 115] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 116] gọi console.log('PASSED', passed+'/18')
console.log('PASSED',passed+'/18');
// [VI dòng gốc 117] Dòng trống để tách các phần, không có lệnh thực thi.
