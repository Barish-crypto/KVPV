// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: Kiểm thử mô phỏng: TH300. Các assert bên dưới ghi điều kiện phải giữ; không chứng minh máy chủ game chấp nhận tốc độ hoặc tầm đánh. [đóng chú thích]
/* Kiểm thử mô phỏng: TH300. Các assert bên dưới ghi điều kiện phải giữ; không chứng minh máy chủ game chấp nhận tốc độ hoặc tầm đánh. */
// [VI dòng gốc 2] "use strict"
'use strict';
// [VI dòng gốc 3] Khai báo biến không gán lại bằng const: fs = gọi require('fs') để nạp module Node.js; vm = gọi require('vm') để nạp module Node.js; assert = gọi require('assert') để nạp module Node.js
const fs=require('fs'), vm=require('vm'), assert=require('assert');
// [VI dòng gốc 4] Khai báo biến không gán lại bằng const: f = tính biểu thức __dirname+'/KVPV_V1_FULL.js'
const f=__dirname+'/KVPV_V1_FULL.js';
// [VI dòng gốc 5] Khai báo biến không gán lại bằng const: full = gọi fs.readFileSync(f, 'utf8') để đọc tệp đồng bộ
const full=fs.readFileSync(f,'utf8');
// [VI dòng gốc 6] gọi assert(full.includes('// Source: src/08-range-evidence.js')) để kiểm tra điều kiện của bài test
assert(full.includes('// Source: src/08-range-evidence.js'));
// [VI dòng gốc 7] Khai báo biến không gán lại bằng const: src = gọi fs.readFileSync(__dirname+'/src/08-range-evidence.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm, '')
const src=fs.readFileSync(__dirname+'/src/08-range-evidence.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,'');
// [VI dòng gốc 8] Khai báo biến có thể gán lại bằng let: passed = 0
let passed=0;
// [VI dòng gốc 9] Định nghĩa hàm test; tham số: name, cb | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | gọi cb() | gọi console.log('PASS', name)
function test(name,cb){try{cb();console.log('PASS',name);++passed;}catch(e){console.log('FAIL',name,e.stack);process.exitCode=1;}}
// [VI dòng gốc 10] Định nghĩa hàm harness; tham số: options={}
function harness(options={}){
// [VI dòng gốc 11] Khai báo biến có thể gán lại bằng let: clock = gọi Date.now(); destination = null; moveReadyAt = 0; cooling = đảo giá trị đúng/sai của !options.cooling
 let clock=Date.now(),destination=null,moveReadyAt=0,cooling=!!options.cooling;
// [VI dòng gốc 12] Định nghĩa lớp TestDate kế thừa Date. | Kết thúc hàm hiện tại và trả về: clock.
 class TestDate extends Date{static now(){return clock;}}
// [VI dòng gốc 13] Khai báo biến không gán lại bằng const: actorId = options.actorId hoặc dùng vế phải khi vế trái là null/undefined: '10228867268946'; now = gọi Date.now() | Khai báo biến có thể gán lại bằng let: phase = "FIGHT"; hp = 100; mode = "BOSS_TH300_SCAN"; occ = 999; bossOcc = 999
 const actorId=options.actorId??'10228867268946',now=Date.now();let phase='FIGHT',hp=100,mode='BOSS_TH300_SCAN',occ=999,bossOcc=999;
// [VI dòng gốc 14] Khai báo biến không gán lại bằng const: timers = tạo đối tượng bằng Map() | Khai báo biến có thể gán lại bằng let: nextId = 0
 const timers=new Map();let nextId=0;
// [VI dòng gốc 15] Khai báo biến không gán lại bằng const: events = tạo đối tượng gồm | Khai báo biến không gán lại bằng const: calls = tạo mảng gồm 0 vị trí: []; movements = tạo mảng gồm 0 vị trí: []
 const events={};const calls=[],movements=[];
// [VI dòng gốc 16] Khai báo biến không gán lại bằng const: boss = tạo đối tượng gồm id, isValid, property, on, off | Kết thúc hàm hiện tại và trả về: đọc {id:'boss1',type:1,occ:bossOcc,name:'Test Boss',position:{x:0,y:0},hp:options.bossHp}[k].
 const boss={id:'boss1',isValid:true,property:{get(k){return {id:'boss1',type:1,occ:bossOcc,name:'Test Boss',position:{x:0,y:0},hp:options.bossHp}[k];}},
// [VI dòng gốc 17] gán events[id] bằng cb | Kiểm tra events[id]===cb: đúng thì chạy nhánh sau if. | xóa thuộc tính events[id]
  on(id,owner,cb){events[id]=cb;},off(id,owner,cb){if(events[id]===cb)delete events[id];}};
// [VI dòng gốc 18] Khai báo biến không gán lại bằng const: actor = tạo đối tượng gồm id, coords, property | Kết thúc hàm hiện tại và trả về: đọc {id:actorId,position:actor.coords,hp:[hp,100]}[k].
 const actor={id:actorId,coords:{x:options.startX??310.4,y:0},property:{get(k){return {id:actorId,position:actor.coords,hp:[hp,100]}[k];}}};
// [VI dòng gốc 19] Khai báo biến không gán lại bằng const: s = tạo đối tượng gồm _rtt, _wet, _f7t, selectSkill
 const s={_rtt:[[8001,0,50],[1001,0,100],[1002,0,100]],_wet:[[8002,0,50]],
// [VI dòng gốc 20] Khai báo biến không gán lại bằng const: arr = tạo mảng gồm 2 vị trí: [...a,...b] | Khai báo biến không gán lại bằng const: now = clock | Khai báo biến không gán lại bằng const: hit = gọi arr.find(r=>r[1]<now) để tìm phần tử đầu tiên thỏa điều kiện | Kiểm tra hit: đúng thì chạy nhánh sau if.
    _f7t(a,b){const arr=[...a,...b];const now=clock;const hit=arr.find(r=>r[1]<now);if(hit){hit[1]=now+hit[2];return hit[0];}return -1;},
// [VI dòng gốc 21] Kết thúc hàm hiện tại và trả về: gọi this._f7t(this._rtt, this._wet, 1); chức năng nội bộ chưa xác minh từ tên hàm.
    selectSkill(){return this._f7t(this._rtt,this._wet,1);}};
// [VI dòng gốc 22] Khai báo biến không gán lại bằng const: c = tạo đối tượng gồm target, owner, combat | gọi calls.push(id) để thêm phần tử vào cuối mảng | Kết thúc hàm hiện tại và trả về: id.
 const c={target:boss,owner:actor,combat(id){calls.push(id);return id;}};
// [VI dòng gốc 23] Kiểm tra options.fastReady: đúng thì chạy nhánh sau if. | gán c.isCooldown bằng ()=>cooling | gán c.isValidTarget bằng ()=>true
 if(options.fastReady){c.isCooldown=()=>cooling;c.isValidTarget=()=>true;}
// [VI dòng gốc 24] Khai báo biến không gán lại bằng const: m = tạo đối tượng gồm moveTo, stop, running | gọi movements.push({x,y}) để thêm phần tử vào cuối mảng | Kiểm tra options.slowMove: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gán destination bằng {x,y}
 const m={moveTo(x,y){movements.push({x,y});if(options.slowMove){destination={x,y};moveReadyAt=clock+400;}else actor.coords={x,y};},stop(){destination=null;},running(){return !!destination;}};
// [VI dòng gốc 25] Kiểm tra options.alternateMoves: đúng thì chạy nhánh sau if. | gán m.moveToCoordinate bằng function(p){actor.coords={...p};} | gán actor.coords bằng {...p} | gán m.moveByPath bằng function(path){actor.coords={...path[path.length-1]};}
 if(options.alternateMoves){m.moveToCoordinate=function(p){actor.coords={...p};};m.moveByPath=function(path){actor.coords={...path[path.length-1]};};}
// [VI dòng gốc 26] Khai báo biến không gán lại bằng const: CS = tạo hàm với tham số (không có) | Khai báo biến không gán lại bằng const: CC = tạo hàm với tham số (không có) | Khai báo biến không gán lại bằng const: CM = tạo hàm với tham số (không có)
 const CS=function CS(){};const CC=function CC(){};const CM=function CM(){};
// [VI dòng gốc 27] gán actor.getComponent bằng (ctor)=>ctor===CS?s:ctor===CC?c:ctor===CM?m:null
 actor.getComponent=(ctor)=>ctor===CS?s:ctor===CC?c:ctor===CM?m:null;
// [VI dòng gốc 28] Khai báo biến không gán lại bằng const: W = tạo đối tượng gồm __KVPV_OWN_ACTOR_ID, console, document, _d, _Ba, _ft, _C, KVPV_HITRUN1, setInterval, clearInterval
 const W={__KVPV_OWN_ACTOR_ID:actorId,console:{info(){},warn(){},log(){},table(){}},
// [VI dòng gốc 29] Thuộc tính document: tạo đối tượng gồm hidden | Thuộc tính hidden: false | Thuộc tính _d: tạo đối tượng gồm _Yct | Thuộc tính _Yct: tạo đối tượng gồm _Eet, _Het, _zet
    document:{hidden:false},_d:{_Yct:{_Eet:CS,_Het:CC,_zet:CM}},_Ba:{_rJ:{_O$:{ins:{actorId,skills:[[1001,1],[1002,1]]}}},_Co:{_Mo:{ins:{curLv:2503}}}},
// [VI dòng gốc 30] Kết thúc hàm hiện tại và trả về: tạo mảng gồm 4 vị trí: [0,0,0,240]. | Kết thúc hàm hiện tại và trả về: tạo mảng gồm 1 vị trí: [10]. | Kết thúc hàm hiện tại và trả về: occ. | Kết thúc hàm hiện tại và trả về: tạo mảng gồm 3 vị trí: [0,0,'Skill '+id].
    _ft:{_tY:{ins:{getCfgById(){return [0,0,0,240];}}},_h$:{ins:{getCfgByLv(){return[10];},occ(){return occ;}}},_nY:{ins:{getCfgBySkillIdAndLv(id){return[0,0,'Skill '+id];}}}},
// [VI dòng gốc 31] Kết thúc hàm hiện tại và trả về: nếu String(id)===actorId thì lấy actor, ngược lại lấy null.
    _C:{_Ba:{instance:{getRole(id){return String(id)===actorId?actor:null;}}}},
// [VI dòng gốc 32] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm running, phase, hpPct, leavePct.
    KVPV_HITRUN1:{status(){return{running:true,phase,hpPct:hp,leavePct:35};}},
// [VI dòng gốc 33] Khai báo biến không gán lại bằng const: i = tăng nextId một đơn vị trước khi lấy giá trị | gọi timers.set(i, fn) | Kết thúc hàm hiện tại và trả về: i. | gọi timers.delete(id)
    setInterval(fn){const i=++nextId;timers.set(i,fn);return i;},clearInterval(id){timers.delete(id);}
// [VI dòng gốc 34] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  };
// [VI dòng gốc 35] Kiểm tra options.tower: đúng thì chạy nhánh sau if.
 if(options.tower){
// [VI dòng gốc 36] gán W._Ba._$a bằng {_yo:{ins:{intoSce:[4011],isInMission:true}},SceneUtil:{isCommonScene:false}}
  W._Ba._$a={_yo:{ins:{intoSce:[4011],isInMission:true}},SceneUtil:{isCommonScene:false}};
// [VI dòng gốc 37] gán W._Ba._tQ bằng {_$Y:{ins:{finishLevel:10}}} | gán W._ft._u$ bằng {ins:{getCfgByLv(n){return n===11?[4011]:null;}}} | Kết thúc hàm hiện tại và trả về: nếu n===11 thì lấy [4011], ngược lại lấy null.
  W._Ba._tQ={_$Y:{ins:{finishLevel:10}}};W._ft._u$={ins:{getCfgByLv(n){return n===11?[4011]:null;}}};
// [VI dòng gốc 38] gán W._C._Mn bằng {_Cn:{currentID:4011}} | gán W.KVPV_TQ_SCOPE bằng {status(){return {inside:false};},inside(){return false;}} | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm inside. | Kết thúc hàm hiện tại và trả về: false.
  W._C._Mn={_Cn:{currentID:4011}};W.KVPV_TQ_SCOPE={status(){return {inside:false};},inside(){return false;}};
// [VI dòng gốc 39] gọi vm.runInNewContext(fs.readFileSync(__dirname+'/src/00-far-scope.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,''), {window:W}) để chạy mã trong ngữ cảnh máy ảo dùng cho kiểm thử
  vm.runInNewContext(fs.readFileSync(__dirname+'/src/00-far-scope.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,''),{window:W});
// [VI dòng gốc 40] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
 }
// [VI dòng gốc 41] Kiểm tra options.rune: đúng thì chạy nhánh sau if.
 if(options.rune){
// [VI dòng gốc 42] gán W._Ba._$a bằng {_yo:{ins:{intoSce:[2201],isInMission:true}},SceneUtil:{isCommonScene:false}}
  W._Ba._$a={_yo:{ins:{intoSce:[2201],isInMission:true}},SceneUtil:{isCommonScene:false}};
// [VI dòng gốc 43] gán W._Ba._IH bằng {_ZY:{inst:{currLv:11,finishLv:10}}} | gán W._ft._wZ bằng {ins:{getCfgByLv(n){return n===11?[11]:null;}}} | Kết thúc hàm hiện tại và trả về: nếu n===11 thì lấy [11], ngược lại lấy null.
  W._Ba._IH={_ZY:{inst:{currLv:11,finishLv:10}}};W._ft._wZ={ins:{getCfgByLv(n){return n===11?[11]:null;}}};
// [VI dòng gốc 44] gán W._C._Mn bằng {_Cn:{currentID:2201}} | gán W.KVPV_TQ_SCOPE bằng {status(){return {inside:false};},inside(){return false;}} | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm inside. | Kết thúc hàm hiện tại và trả về: false.
  W._C._Mn={_Cn:{currentID:2201}};W.KVPV_TQ_SCOPE={status(){return {inside:false};},inside(){return false;}};
// [VI dòng gốc 45] gọi vm.runInNewContext(fs.readFileSync(__dirname+'/src/00-far-scope.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,''), {window:W}) để chạy mã trong ngữ cảnh máy ảo dùng cho kiểm thử
  vm.runInNewContext(fs.readFileSync(__dirname+'/src/00-far-scope.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,''),{window:W});
// [VI dòng gốc 46] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
 }
// [VI dòng gốc 47] Kiểm tra options.trutien: đúng thì chạy nhánh sau if.
 if(options.trutien){
// [VI dòng gốc 48] gán W._Ba._$a bằng {_yo:{ins:{intoSce:[2692,0,0,6],isInMission:false}},SceneUtil:{isCommonScene:false}}
  W._Ba._$a={_yo:{ins:{intoSce:[2692,0,0,6],isInMission:false}},SceneUtil:{isCommonScene:false}};
// [VI dòng gốc 49] gán W._C._Mn bằng {_Cn:{currentID:2692}} | gán W._ft._po bằng {ins:{getCfgById:()=>[2692,'Tru Tiên',0,0,0,0,0,52]}}
  W._C._Mn={_Cn:{currentID:2692}};W._ft._po={ins:{getCfgById:()=>[2692,'Tru Tiên',0,0,0,0,0,52]}};
// [VI dòng gốc 50] gán W.KVPV_TQ_SCOPE bằng {status:()=>({inside:false}),inside:()=>false}
  W.KVPV_TQ_SCOPE={status:()=>({inside:false}),inside:()=>false};
// [VI dòng gốc 51] gọi vm.runInNewContext(fs.readFileSync(__dirname+'/src/00-far-scope.js','utf8'), {window:W}) để chạy mã trong ngữ cảnh máy ảo dùng cho kiểm thử
  vm.runInNewContext(fs.readFileSync(__dirname+'/src/00-far-scope.js','utf8'),{window:W});
// [VI dòng gốc 52] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
 }
// [VI dòng gốc 53] Kiểm tra options.metrics: đúng thì chạy nhánh sau if. | gọi vm.runInNewContext(fs.readFileSync(__dirname+'/src/00-combat-metrics.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,''), {window:…) để chạy mã trong ngữ cảnh máy ảo dùng cho kiểm thử
 if(options.metrics)vm.runInNewContext(fs.readFileSync(__dirname+'/src/00-combat-metrics.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,''),{window:W,Date:TestDate});
// [VI dòng gốc 54] Kiểm tra options.adaptive: đúng thì chạy nhánh sau if. | gọi vm.runInNewContext(fs.readFileSync(__dirname+'/src/00-skill-pacing.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,''), {window:W}) để chạy mã trong ngữ cảnh máy ảo dùng cho kiểm thử
 if(options.adaptive)vm.runInNewContext(fs.readFileSync(__dirname+'/src/00-skill-pacing.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,''),{window:W});
// [VI dòng gốc 55] gọi vm.runInNewContext(src, {window:W,console:W.console,Date:TestDate,Math,Number,String,Object,Array,Error,Set,Map,JSON}, {timeout:3000}) để chạy mã trong ngữ cảnh máy ảo dùng cho kiểm thử
 vm.runInNewContext(fs.readFileSync(__dirname+'/src/00-tq-basic-profile.js','utf8'),{window:W,Date:TestDate});
 vm.runInNewContext(fs.readFileSync(__dirname+'/src/00-skill1008-trial.js','utf8'),{window:W});
 vm.runInNewContext(src,{window:W,console:W.console,Date:TestDate,Math,Number,String,Object,Array,Error,Set,Map,JSON},{timeout:3000});
// [VI dòng gốc 56] Kiểm tra !options.defaultDistance: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gọi W.KVPV_TH300.setDistance(310.4) | Kiểm tra !options.newDefault: đúng thì chạy nhánh sau if. | gọi W.KVPV_TH300.setDistance(305)
 if(!options.defaultDistance)W.KVPV_TH300.setDistance(310.4);else if(!options.newDefault)W.KVPV_TH300.setDistance(305);
// [VI dòng gốc 57] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm W, mod, s, c, m, boss, actor, calls, movements, events, loseTimers, elapse, timerCount, pump, advance, cooldown, phase, hp, occ.
 return {W,mod:W.KVPV_TH300,s,c,m,boss,actor,calls,movements,events,
// [VI dòng gốc 58] gọi timers.clear() | cập nhật bằng toán tử += clock bằng ms | Kết thúc hàm hiện tại và trả về: đọc timers.size.
  loseTimers(){timers.clear();},elapse(ms){clock+=ms;},timerCount(){return timers.size;},
// [VI dòng gốc 59] Duyệt từng giá trị trong timers.values() bằng const fn. | Khai báo biến không gán lại bằng const: fn (chưa gán giá trị) | gọi fn()
  pump(){for(const fn of timers.values())fn();},
// [VI dòng gốc 60] Khai báo biến không gán lại bằng const: old = clock | cập nhật bằng toán tử += clock bằng ms | Kiểm tra destination&&clock>moveReadyAt: đúng thì chạy nhánh sau if. | Khai báo biến không gán lại bằng const: dx = tính biểu thức destination.x-actor.coords.x; dy = tính biểu thức destination.y-actor.coords.y; d = gọi Math.hypot(dx, dy); step = tính biểu thức 80*Math.max(0,clock-Math.max(old,moveReadyAt))/1000
  advance(ms){const old=clock;clock+=ms;if(destination&&clock>moveReadyAt){const dx=destination.x-actor.coords.x,dy=destination.y-actor.coords.y,d=Math.hypot(dx,dy),step=80*Math.max(0,clock-Math.max(old,moveReadyAt))/1000;if(step>=d){actor.coords={...destination};destination=null;}else actor.coords={x:actor.coords.x+dx/d*step,y:actor.coords.y+dy/d*step};}for(const fn of timers.values())fn();},
// [VI dòng gốc 61] gán cooling bằng v | gán phase bằng v | gán hp bằng v | gán occ bằng v
  cooldown(v){cooling=v;},phase(v){phase=v;},hp(v){hp=v;},occ(v){occ=v;bossOcc=v;}};
// [VI dòng gốc 62] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 63] gọi test('holding 305 retains movement ownership and yields to recovery', ()=>{const q=harness({defaultDistance:true,startX:305})…) | Khai báo biến không gán lại bằng const: q = gọi harness({defaultDistance:true,startX:305}) | gọi q.mod.start('SCAN') để khởi động bộ điều khiển | gọi assert.equal(q.mod.report().positioning, false) để kiểm tra hai giá trị bằng nhau
test('holding 305 retains movement ownership and yields to recovery',()=>{const q=harness({defaultDistance:true,startX:305});q.mod.start('SCAN');assert.equal(q.mod.report().positioning,false);q.m.moveTo(240,0);assert.equal(q.actor.coords.x,305);assert.equal(q.movements.length,0);q.phase('RETREAT');q.m.moveTo(370,0);assert.equal(q.actor.coords.x,370);q.mod.stop();q.m.moveTo(240,0);assert.equal(q.actor.coords.x,240);});
// [VI dòng gốc 64] gọi test('starts OFF, no auto attacks', ()=>{const q=harness();assert.equal(q.mod.status(false).running,false);assert.equal(q.cal…) | Khai báo biến không gán lại bằng const: q = gọi harness() | gọi assert.equal(q.mod.status(false).running, false) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.calls.length, 0) để kiểm tra hai giá trị bằng nhau
test('starts OFF, no auto attacks',()=>{const q=harness();assert.equal(q.mod.status(false).running,false);assert.equal(q.calls.length,0);});
// [VI dòng gốc 65] gọi test('lost far polling repairs once without replacing hooks or clearing Boss evidence', ()=>{ const q=harness();q.mod.start('…)
test('lost far polling repairs once without replacing hooks or clearing Boss evidence',()=>{
// [VI dòng gốc 66] Khai báo biến không gán lại bằng const: q = gọi harness() | gọi q.mod.start('SCAN') để khởi động bộ điều khiển | gọi q.c.combat(1001) | gọi q.events[1012]('10228867268946', 10010000, 10, 1, 'boss1')
 const q=harness();q.mod.start('SCAN');q.c.combat(1001);q.events[1012]('10228867268946',10010000,10,1,'boss1');
// [VI dòng gốc 67] Khai báo biến không gán lại bằng const: combat = đọc q.c.combat; selector = đọc q.s._f7t; attempts = đọc q.mod.report().castAttempts
 const combat=q.c.combat,selector=q.s._f7t,attempts=q.mod.report().castAttempts;
// [VI dòng gốc 68] gọi q.loseTimers() | gọi q.elapse(3000) | gọi assert.equal(q.mod.repairPolling(), true) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.timerCount(), 1) để kiểm tra hai giá trị bằng nhau
 q.loseTimers();q.elapse(3000);assert.equal(q.mod.repairPolling(),true);assert.equal(q.timerCount(),1);
// [VI dòng gốc 69] gọi assert.equal(q.c.combat, combat) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.s._f7t, selector) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.mod.report().castAttempts, attempts) để kiểm tra hai giá trị bằng nhau
 assert.equal(q.c.combat,combat);assert.equal(q.s._f7t,selector);assert.equal(q.mod.report().castAttempts,attempts);
// [VI dòng gốc 70] gọi assert.equal(q.mod.report().confirmedCastHitPairs, 1) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.mod.report().timerRepairs, 1) để kiểm tra hai giá trị bằng nhau
 assert.equal(q.mod.report().confirmedCastHitPairs,1);assert.equal(q.mod.report().timerRepairs,1);
// [VI dòng gốc 71] gọi assert.equal(q.mod.repairPolling(), false) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.timerCount(), 1) để kiểm tra hai giá trị bằng nhau
 assert.equal(q.mod.repairPolling(),false);assert.equal(q.timerCount(),1);
// [VI dòng gốc 72] gọi q.mod.stop() để dừng bộ điều khiển và dọn tài nguyên | gọi q.elapse(3000) | gọi assert.equal(q.mod.repairPolling(), false) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.timerCount(), 0) để kiểm tra hai giá trị bằng nhau
 q.mod.stop();q.elapse(3000);assert.equal(q.mod.repairPolling(),false);assert.equal(q.timerCount(),0);
// [VI dòng gốc 73] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 74] gọi test('polling repair yields to hidden tabs, actor change and native animation', ()=>{ const q=harness({fastReady:true});q.mod…)
test('polling repair yields to hidden tabs, actor change and native animation',()=>{
// [VI dòng gốc 75] Khai báo biến không gán lại bằng const: q = gọi harness({fastReady:true}) | gọi q.mod.start('SCAN') để khởi động bộ điều khiển | Khai báo biến không gán lại bằng const: count = đọc q.calls.length
 const q=harness({fastReady:true});q.mod.start('SCAN');const count=q.calls.length;
// [VI dòng gốc 76] gán q.c._jh bằng {isPlaying:true} | gọi q.loseTimers() | gọi q.elapse(3000) | gán q.W.document.hidden bằng true
 q.c._jh={isPlaying:true};q.loseTimers();q.elapse(3000);q.W.document.hidden=true;
// [VI dòng gốc 77] gọi assert.equal(q.mod.repairPolling(), false) để kiểm tra hai giá trị bằng nhau | gán q.W.document.hidden bằng false
 assert.equal(q.mod.repairPolling(),false);q.W.document.hidden=false;
// [VI dòng gốc 78] gán q.W._Ba._rJ._O$.ins.actorId bằng 'other' | gọi assert.equal(q.mod.repairPolling(), false) để kiểm tra hai giá trị bằng nhau
 q.W._Ba._rJ._O$.ins.actorId='other';assert.equal(q.mod.repairPolling(),false);
// [VI dòng gốc 79] gán q.W._Ba._rJ._O$.ins.actorId bằng '10228867268946' | gọi assert.equal(q.mod.repairPolling(), true) để kiểm tra hai giá trị bằng nhau
 q.W._Ba._rJ._O$.ins.actorId='10228867268946';assert.equal(q.mod.repairPolling(),true);
// [VI dòng gốc 80] gọi assert.equal(q.calls.length, count) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.c._jh.isPlaying, true) để kiểm tra hai giá trị bằng nhau
 assert.equal(q.calls.length,count);assert.equal(q.c._jh.isPlaying,true);
// [VI dòng gốc 81] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 82] gọi test('STRICT refuses unproven TH and ordinary attacks', ()=>{const q=harness();q.mod.start('STRICT');assert.equal(q.s.selectS…) | Khai báo biến không gán lại bằng const: q = gọi harness() | gọi q.mod.start('STRICT') để khởi động bộ điều khiển | gọi assert.equal(q.s.selectSkill(), -1) để kiểm tra hai giá trị bằng nhau
test('STRICT refuses unproven TH and ordinary attacks',()=>{const q=harness();q.mod.start('STRICT');assert.equal(q.s.selectSkill(),-1);q.c.combat(1001);q.c.combat(8001);assert.equal(q.calls.length,0);});
// [VI dòng gốc 83] gọi test('SCAN chooses 1001 at 310 and blocks basic', ()=>{const q=harness();q.mod.start('SCAN');assert.equal(q.s.selectSkill(),1…) | Khai báo biến không gán lại bằng const: q = gọi harness() | gọi q.mod.start('SCAN') để khởi động bộ điều khiển | gọi assert.equal(q.s.selectSkill(), 1001) để kiểm tra hai giá trị bằng nhau
test('SCAN chooses 1001 at 310 and blocks basic',()=>{const q=harness();q.mod.start('SCAN');assert.equal(q.s.selectSkill(),1001);q.c.combat(1001);q.c.combat(8001);assert.deepEqual(q.calls,[1001]);});
// [VI dòng gốc 84] gọi test('SCAN only works when actor beyond 300', ()=>{const q=harness();q.mod.start('SCAN');q.actor.coords.x=280;assert.equal(q.…) | Khai báo biến không gán lại bằng const: q = gọi harness() | gọi q.mod.start('SCAN') để khởi động bộ điều khiển | gán q.actor.coords.x bằng 280
test('SCAN only works when actor beyond 300',()=>{const q=harness();q.mod.start('SCAN');q.actor.coords.x=280;assert.equal(q.s.selectSkill(),-1);q.c.combat(1001);assert.equal(q.calls.length,0);});
// [VI dòng gốc 85] gọi test('one cast hit pair not sufficient for STRICT', ()=>{const q=harness();q.mod.start('SCAN');q.c.combat(1001);q.events[1012…) | Khai báo biến không gán lại bằng const: q = gọi harness() | gọi q.mod.start('SCAN') để khởi động bộ điều khiển | gọi q.c.combat(1001)
test('one cast hit pair not sufficient for STRICT',()=>{const q=harness();q.mod.start('SCAN');q.c.combat(1001);q.events[1012]('10228867268946',10010000,90,1,'boss1');assert.equal(q.mod.status(false).confirmedCastHitPairs,1);q.mod.stop();q.mod.start('STRICT');assert.equal(q.s.selectSkill(),-1);});
// [VI dòng gốc 86] gọi test('two independent cast hit pairs verify one TH', ()=>{const q=harness();q.mod.start('SCAN');for(let i=0;i<2;i++){q.c.comb…) | Khai báo biến không gán lại bằng const: q = gọi harness() | gọi q.mod.start('SCAN') để khởi động bộ điều khiển | Lặp for: khởi tạo let i=0; tiếp tục khi i<2; sau mỗi vòng i++.
test('two independent cast hit pairs verify one TH',()=>{const q=harness();q.mod.start('SCAN');for(let i=0;i<2;i++){q.c.combat(1001);q.events[1012]('10228867268946',10010000,90,1,'boss1');}q.mod.stop();q.mod.start('STRICT');assert.equal(q.s.selectSkill(),1001);q.c.combat(1001);q.c.combat(1002);assert.deepEqual(q.calls,[1001,1001,1001]);assert.deepEqual(Array.from(q.mod.status(false).eligibleSkillIds),[1001]);});
// [VI dòng gốc 87] gọi test('reflected/companion/other actor hits do not count', ()=>{const q=harness();q.mod.start('SCAN');q.c.combat(1001);q.event…) | Khai báo biến không gán lại bằng const: q = gọi harness() | gọi q.mod.start('SCAN') để khởi động bộ điều khiển | gọi q.c.combat(1001)
test('reflected/companion/other actor hits do not count',()=>{const q=harness();q.mod.start('SCAN');q.c.combat(1001);q.events[1012]('other',10010000,9,1,'boss1');q.events[1012]('10228867268946',10010000,9,5,'boss1');q.events[1012]('10228867268946',10010000,9,1,'other');assert.equal(q.mod.status(false).confirmedCastHitPairs,0);});
// [VI dòng gốc 88] gọi test('damage beyond 300 without preceding cast does not count', ()=>{const q=harness();q.mod.start('SCAN');q.events[1012]('10…) | Khai báo biến không gán lại bằng const: q = gọi harness() | gọi q.mod.start('SCAN') để khởi động bộ điều khiển | gọi q.events[1012]('10228867268946', 10010000, 9, 1, 'boss1')
test('damage beyond 300 without preceding cast does not count',()=>{const q=harness();q.mod.start('SCAN');q.events[1012]('10228867268946',10010000,9,1,'boss1');assert.equal(q.mod.status(false).confirmedCastHitPairs,0);});
// [VI dòng gốc 89] gọi test('hit at 290 after cast at 310 does not count', ()=>{const q=harness();q.mod.start('SCAN');q.c.combat(1001);q.actor.coord…) | Khai báo biến không gán lại bằng const: q = gọi harness() | gọi q.mod.start('SCAN') để khởi động bộ điều khiển | gọi q.c.combat(1001)
test('hit at 290 after cast at 310 does not count',()=>{const q=harness();q.mod.start('SCAN');q.c.combat(1001);q.actor.coords.x=290;q.events[1012]('10228867268946',10010000,9,1,'boss1');assert.equal(q.mod.status(false).confirmedCastHitPairs,0);});
// [VI dòng gốc 90] gọi test('proofs are scoped by Boss occurrence', ()=>{const q=harness();q.mod.start('SCAN');for(let i=0;i<2;i++){q.c.combat(1001)…) | Khai báo biến không gán lại bằng const: q = gọi harness() | gọi q.mod.start('SCAN') để khởi động bộ điều khiển | Lặp for: khởi tạo let i=0; tiếp tục khi i<2; sau mỗi vòng i++.
test('proofs are scoped by Boss occurrence',()=>{const q=harness();q.mod.start('SCAN');for(let i=0;i<2;i++){q.c.combat(1001);q.events[1012]('10228867268946',10010000,99,1,'boss1');}q.occ(1000);q.mod.stop();q.mod.start('STRICT');assert.equal(q.s.selectSkill(),-1);});
// [VI dòng gốc 91] gọi test('RETREAT does not issue positioning commands', ()=>{const q=harness();q.phase('RETREAT');q.actor.coords.x=280;q.mod.star…) | Khai báo biến không gán lại bằng const: q = gọi harness() | gọi q.phase('RETREAT') | gán q.actor.coords.x bằng 280
test('RETREAT does not issue positioning commands',()=>{const q=harness();q.phase('RETREAT');q.actor.coords.x=280;q.mod.start('SCAN');q.pump();assert.equal(q.movements.length,0);});
// [VI dòng gốc 92] gọi test('FIGHT positions at 310.4, not 281', ()=>{const q=harness();q.actor.coords.x=278;q.mod.start('SCAN');q.pump();assert(q.m…) | Khai báo biến không gán lại bằng const: q = gọi harness() | gán q.actor.coords.x bằng 278 | gọi q.mod.start('SCAN') để khởi động bộ điều khiển
test('FIGHT positions at 310.4, not 281',()=>{const q=harness();q.actor.coords.x=278;q.mod.start('SCAN');q.pump();assert(q.movements.length>0);assert(Math.abs(q.movements.at(-1).x-310.4)<.1);});
// [VI dòng gốc 93] gọi test('restore native hooks and timers on stop', ()=>{const q=harness(),a=q.s._f7t,b=q.c.combat;q.mod.start('SCAN');q.mod.stop…) | Khai báo biến không gán lại bằng const: q = gọi harness(); a = đọc q.s._f7t; b = đọc q.c.combat | gọi q.mod.start('SCAN') để khởi động bộ điều khiển | gọi q.mod.stop() để dừng bộ điều khiển và dọn tài nguyên
test('restore native hooks and timers on stop',()=>{const q=harness(),a=q.s._f7t,b=q.c.combat;q.mod.start('SCAN');q.mod.stop();assert.equal(q.s._f7t,a);assert.equal(q.c.combat,b);});
// [VI dòng gốc 94] gọi test('RETREAT blocks skill selection and does not count phantom cast attempts', ()=>{const q=harness();q.mod.start('SCAN');q.…) | Khai báo biến không gán lại bằng const: q = gọi harness() | gọi q.mod.start('SCAN') để khởi động bộ điều khiển | gọi q.phase('RETREAT')
test('RETREAT blocks skill selection and does not count phantom cast attempts',()=>{const q=harness();q.mod.start('SCAN');q.phase('RETREAT');assert.equal(q.s.selectSkill(),-1);q.c.combat(1001);assert.equal(q.mod.report().castAttempts,0);});
// [VI dòng gốc 95] gọi test('STRICT refuses distances beyond independently proven cast-hit pairs', ()=>{const q=harness();q.mod.start('SCAN');for(le…) | Khai báo biến không gán lại bằng const: q = gọi harness() | gọi q.mod.start('SCAN') để khởi động bộ điều khiển | Lặp for: khởi tạo let i=0; tiếp tục khi i<2; sau mỗi vòng i++.
test('STRICT refuses distances beyond independently proven cast-hit pairs',()=>{const q=harness();q.mod.start('SCAN');for(let i=0;i<2;i++){q.c.combat(1001);q.events[1012]('10228867268946',10010000,10,1,'boss1');}q.mod.stop();q.mod.start('STRICT');q.actor.coords.x=319;assert.equal(q.s.selectSkill(),-1);});
// [VI dòng gốc 96] gọi test('scene change invalidates pending cast attribution', ()=>{const q=harness();q.W._Ba._$a={_yo:{ins:{intoSce:[1]}}};q.mod.…) | Khai báo biến không gán lại bằng const: q = gọi harness() | gán q.W._Ba._$a bằng {_yo:{ins:{intoSce:[1]}}} | gọi q.mod.start('SCAN') để khởi động bộ điều khiển
test('scene change invalidates pending cast attribution',()=>{const q=harness();q.W._Ba._$a={_yo:{ins:{intoSce:[1]}}};q.mod.start('SCAN');q.c.combat(1001);q.W._Ba._$a._yo.ins.intoSce[0]=2;q.events[1012]('10228867268946',10010000,10,1,'boss1');assert.equal(q.mod.report().confirmedCastHitPairs,0);});
// [VI dòng gốc 97] gọi test('non-basic native active skills are measured without a hardcoded 8-ID roster', ()=>{const q=harness();q.s._rtt.push([200…) | Khai báo biến không gán lại bằng const: q = gọi harness() | gọi q.s._rtt.push([2001,0,100]) để thêm phần tử vào cuối mảng | gọi q.mod.start('SCAN') để khởi động bộ điều khiển
test('non-basic native active skills are measured without a hardcoded 8-ID roster',()=>{const q=harness();q.s._rtt.push([2001,0,100]);q.mod.start('SCAN');q.c.combat(2001);q.events[1012]('10228867268946',20010000,80,1,'boss1');const row=q.mod.report().skills.find(x=>x.id===2001);assert.equal(row.attempts,1);assert.equal(row.hits,1);assert.equal(row.damage,80);q.c.combat(8001);assert.deepEqual(q.calls,[2001]);});
// [VI dòng gốc 98] gọi test('scan distance is configurable while STRICT cannot assume the larger distance works', ()=>{const q=harness();q.mod.setDi…) | Khai báo biến không gán lại bằng const: q = gọi harness() | gọi q.mod.setDistance(350) | gán q.actor.coords.x bằng 350
test('scan distance is configurable while STRICT cannot assume the larger distance works',()=>{const q=harness();q.mod.setDistance(350);q.actor.coords.x=350;q.mod.start('SCAN');q.c.combat(1001);assert.equal(q.mod.report().goalDistance,350);assert.equal(q.mod.report().skills.find(x=>x.id===1001).attempts,1);assert.throws(()=>q.mod.setDistance(280));});
// [VI dòng gốc 99] gọi test('flag-64 auxiliary damage never proves direct skill reach', ()=>{const q=harness();q.mod.start('SCAN');q.c.combat(1001);…) | Khai báo biến không gán lại bằng const: q = gọi harness() | gọi q.mod.start('SCAN') để khởi động bộ điều khiển | gọi q.c.combat(1001)
test('flag-64 auxiliary damage never proves direct skill reach',()=>{const q=harness();q.mod.start('SCAN');q.c.combat(1001);q.events[1012]('10228867268946',10010000,10,64,'boss1');assert.equal(q.mod.report().confirmedCastHitPairs,0);});
// [VI dòng gốc 100] gọi test('explicit distance remains fixed instead of being overridden by observed danger radius', ()=>{const q=harness({defaultDi…) | Khai báo biến không gán lại bằng const: q = gọi harness({defaultDistance:true,startX:305}) | gán q.W.KVPV_HITRUN1.status bằng ()=>({running:true,phase:'FIGHT',hpPct:100,leavePct:35,observedDangerRadius:365}) | gọi q.mod.start('SCAN') để khởi động bộ điều khiển
test('explicit distance remains fixed instead of being overridden by observed danger radius',()=>{const q=harness({defaultDistance:true,startX:305});q.W.KVPV_HITRUN1.status=()=>({running:true,phase:'FIGHT',hpPct:100,leavePct:35,observedDangerRadius:365});q.mod.start('SCAN');assert.equal(q.mod.report().goalDistance,305);assert.equal(q.mod.report().minimumDistance,300);});
// [VI dòng gốc 101] gọi test('losing Boss target never falls back to native basic attacks', ()=>{const q=harness();q.mod.start('SCAN');q.c.target=nul…) | Khai báo biến không gán lại bằng const: q = gọi harness() | gọi q.mod.start('SCAN') để khởi động bộ điều khiển | gán q.c.target bằng null
test('losing Boss target never falls back to native basic attacks',()=>{const q=harness();q.mod.start('SCAN');q.c.target=null;assert.equal(q.s.selectSkill(),-1);q.c.combat(8001);assert.equal(q.calls.length,0);});
// [VI dòng gốc 102] gọi test('temporary HitRun guard never causes repeated wrapping or duplicate attempts', ()=>{const q=harness();q.mod.start('SCAN'…) | Khai báo biến không gán lại bằng const: q = gọi harness() | gọi q.mod.start('SCAN') để khởi động bộ điều khiển | Khai báo biến không gán lại bằng const: parent = đọc q.c.combat
test('temporary HitRun guard never causes repeated wrapping or duplicate attempts',()=>{const q=harness();q.mod.start('SCAN');const parent=q.c.combat;const guard=function(...args){return parent.apply(this,args);};Object.defineProperty(guard,'__KVPV_GUARD_PARENT',{value:parent});q.c.combat=guard;q.phase('RETREAT');for(let i=0;i<6;i++)q.pump();assert.equal(q.c.combat,guard);assert.equal(q.mod.report().lastError,'');q.c.combat=parent;q.phase('FIGHT');q.pump();q.c.combat(1001);assert.equal(q.mod.report().castAttempts,1);assert.deepEqual(q.calls,[1001]);});
// [VI dòng gốc 103] gọi test('direct far-skill stop releases HitRun guard before restoring native combat', ()=>{const q=harness(),native=q.c.combat;q…) | Khai báo biến không gán lại bằng const: q = gọi harness(); native = đọc q.c.combat | gọi q.mod.start('SCAN') để khởi động bộ điều khiển | Khai báo biến không gán lại bằng const: parent = đọc q.c.combat
test('direct far-skill stop releases HitRun guard before restoring native combat',()=>{const q=harness(),native=q.c.combat;q.mod.start('SCAN');const parent=q.c.combat;const guard=function(){};Object.defineProperty(guard,'__KVPV_GUARD_PARENT',{value:parent});q.c.combat=guard;q.W.KVPV_HITRUN1.stop=()=>{q.c.combat=parent;};q.mod.stop();assert.equal(q.c.combat,native);});
// [VI dòng gốc 104] gọi test('unknown external wrapper is preserved and refused rather than repeatedly wrapped', ()=>{const q=harness();q.mod.start('…) | Khai báo biến không gán lại bằng const: q = gọi harness() | gọi q.mod.start('SCAN') để khởi động bộ điều khiển | Khai báo biến không gán lại bằng const: external = tạo hàm với tham số (không có)
test('unknown external wrapper is preserved and refused rather than repeatedly wrapped',()=>{const q=harness();q.mod.start('SCAN');const external=function(){};q.c.combat=external;q.pump();q.pump();assert.equal(q.c.combat,external);assert.match(q.mod.report().lastError,/Unexpected external/);});
// [VI dòng gốc 105] gọi test('outward positioning survives native AI stop calls before HP reaches 35%', ()=>{const q=harness({startX:180,slowMove:tru…) | Khai báo biến không gán lại bằng const: q = gọi harness({startX:180,slowMove:true}) | gọi q.mod.start('SCAN') để khởi động bộ điều khiển | gọi q.c.combat(1001)
test('outward positioning survives native AI stop calls before HP reaches 35%',()=>{const q=harness({startX:180,slowMove:true});q.mod.start('SCAN');q.c.combat(1001);assert.equal(q.calls.length,0);for(let i=0;i<22;i++){q.m.stop();q.advance(150);}assert(q.actor.coords.x>300);assert.equal(q.mod.report().positioning,false);assert(q.mod.report().blockedNativeSteering>0);assert(q.movements.length<=2);});
// [VI dòng gốc 106] gọi test('HP 40% still positions outward instead of waiting for recovery threshold', ()=>{const q=harness({startX:180});q.hp(40);…) | Khai báo biến không gán lại bằng const: q = gọi harness({startX:180}) | gọi q.hp(40) | gọi q.mod.start('SCAN') để khởi động bộ điều khiển
test('HP 40% still positions outward instead of waiting for recovery threshold',()=>{const q=harness({startX:180});q.hp(40);q.mod.start('SCAN');assert(q.movements.length>0);assert(q.actor.coords.x>300);});
// [VI dòng gốc 107] gọi test('fast pacing dispatches only native-ready skills and respects cooldown', ()=>{const q=harness({fastReady:true,cooling:tr…) | Khai báo biến không gán lại bằng const: q = gọi harness({fastReady:true,cooling:true}) | Khai báo biến không gán lại bằng const: cooldown = đọc q.c.isCooldown | gọi q.mod.start('SCAN') để khởi động bộ điều khiển
test('fast pacing dispatches only native-ready skills and respects cooldown',()=>{const q=harness({fastReady:true,cooling:true});const cooldown=q.c.isCooldown;q.mod.start('SCAN');assert.equal(q.calls.length,0);q.cooldown(false);q.advance(150);assert.equal(q.calls.length,1);q.advance(25);assert.equal(q.calls.length,1);q.advance(50);assert.equal(q.calls.length,2);q.cooldown(true);q.advance(200);assert.equal(q.calls.length,2);assert.equal(q.c.isCooldown,cooldown);assert.equal(q.s._rtt[1][2],100);q.phase('RETREAT');q.cooldown(false);q.advance(150);assert.equal(q.calls.length,2);});
// [VI dòng gốc 108] gọi test('stopping restores both native movement methods and cancels owned path', ()=>{const q=harness({startX:180,slowMove:true}…) | Khai báo biến không gán lại bằng const: q = gọi harness({startX:180,slowMove:true}); move = đọc q.m.moveTo; stop = đọc q.m.stop | gọi q.mod.start('SCAN') để khởi động bộ điều khiển | gọi q.mod.stop() để dừng bộ điều khiển và dọn tài nguyên
test('stopping restores both native movement methods and cancels owned path',()=>{const q=harness({startX:180,slowMove:true}),move=q.m.moveTo,stop=q.m.stop;q.mod.start('SCAN');q.mod.stop();assert.equal(q.m.moveTo,move);assert.equal(q.m.stop,stop);assert.equal(q.m.running(),false);});
// [VI dòng gốc 109] gọi test('default 305 measures skill hits above 300', ()=>{const q=harness({defaultDistance:true,startX:305});q.mod.start('SCAN')…) | Khai báo biến không gán lại bằng const: q = gọi harness({defaultDistance:true,startX:305}) | gọi q.mod.start('SCAN') để khởi động bộ điều khiển | Lặp for: khởi tạo let i=0; tiếp tục khi i<2; sau mỗi vòng i++.
test('default 305 measures skill hits above 300',()=>{const q=harness({defaultDistance:true,startX:305});q.mod.start('SCAN');for(let i=0;i<2;i++){q.c.combat(1001);q.events[1012]('10228867268946',10010000,10,1,'boss1');}const r=q.mod.report();assert.equal(r.goalDistance,305);assert.equal(r.paceMs,75);assert.equal(r.confirmedSkills.length,1);assert.equal(r.confirmedOver300.length,1);q.mod.stop();q.mod.start('STRICT');assert.equal(q.s.selectSkill(),1001);});
// [VI dòng gốc 110] gọi test('stop before first start and repeated stop never dereference absent hooks', ()=>{const q=harness();assert.doesNotThrow((…) | Khai báo biến không gán lại bằng const: q = gọi harness() | gọi assert.doesNotThrow(()=>q.mod.stop())
test('stop before first start and repeated stop never dereference absent hooks',()=>{const q=harness();assert.doesNotThrow(()=>q.mod.stop());assert.doesNotThrow(()=>q.mod.stop());q.mod.start('SCAN');q.mod.stop();assert.doesNotThrow(()=>q.mod.stop());assert.equal(q.mod.report().running,false);});
// [VI dòng gốc 111] gọi test('SCAN accepts observed native landing 308.44 but never casts at 280', ()=>{const q=harness({defaultDistance:true,startX:…) | Khai báo biến không gán lại bằng const: q = gọi harness({defaultDistance:true,startX:308.44,fastReady:true}) | gọi q.mod.start('SCAN') để khởi động bộ điều khiển | gọi assert.equal(q.mod.report().positioning, false) để kiểm tra hai giá trị bằng nhau
test('SCAN accepts observed native landing 308.44 but never casts at 280',()=>{const q=harness({defaultDistance:true,startX:308.44,fastReady:true});q.mod.start('SCAN');assert.equal(q.mod.report().positioning,false);assert.equal(q.calls.length,1);assert.equal(q.movements.length,0);q.actor.coords.x=280;q.advance(150);assert.equal(q.calls.length,1);assert(q.movements.length>0);});
// [VI dòng gốc 112] gọi test('overlapping Boss position issues finite outward escape instead of waiting', ()=>{const q=harness({defaultDistance:true,…) | Khai báo biến không gán lại bằng const: q = gọi harness({defaultDistance:true,startX:0}) | gọi q.mod.start('SCAN') để khởi động bộ điều khiển | gọi assert.equal(q.movements.length, 1) để kiểm tra hai giá trị bằng nhau
test('overlapping Boss position issues finite outward escape instead of waiting',()=>{const q=harness({defaultDistance:true,startX:0});q.mod.start('SCAN');assert.equal(q.movements.length,1);assert.equal(q.actor.coords.x,305);q.pump();assert.equal(q.mod.report().positioning,false);});
// [VI dòng gốc 113] gọi test('arrival inside tolerance cancels remaining owned path before casting', ()=>{const q=harness({defaultDistance:true,start…) | Khai báo biến không gán lại bằng const: q = gọi harness({defaultDistance:true,startX:180,slowMove:true,fastReady:true}) | gọi q.mod.start('SCAN') để khởi động bộ điều khiển | Lặp for: khởi tạo let i=0; tiếp tục khi i<15; sau mỗi vòng i++.
test('arrival inside tolerance cancels remaining owned path before casting',()=>{const q=harness({defaultDistance:true,startX:180,slowMove:true,fastReady:true});q.mod.start('SCAN');for(let i=0;i<15;i++)q.advance(150);assert.equal(q.mod.report().positioning,false);assert.equal(q.m.running(),false);assert(q.calls.length>0);const p=q.actor.coords.x;q.advance(150);assert.equal(q.actor.coords.x,p);});
// [VI dòng gốc 114] gọi test('alternate native path APIs cannot pull SCAN toward Boss but recovery can', ()=>{const q=harness({defaultDistance:true,s…) | Khai báo biến không gán lại bằng const: q = gọi harness({defaultDistance:true,startX:305,alternateMoves:true}) | gọi q.mod.start('SCAN') để khởi động bộ điều khiển | gọi q.m.moveToCoordinate({x:200,y:0})
test('alternate native path APIs cannot pull SCAN toward Boss but recovery can',()=>{const q=harness({defaultDistance:true,startX:305,alternateMoves:true});q.mod.start('SCAN');q.m.moveToCoordinate({x:200,y:0});q.m.moveByPath([{x:180,y:0}]);assert.equal(q.actor.coords.x,305);q.phase('RETREAT');q.m.moveToCoordinate({x:370,y:0});assert.equal(q.actor.coords.x,370);});
// [VI dòng gốc 115] gọi test('SCAN rotates native ready skills without changing cooldown durations', ()=>{const q=harness({defaultDistance:true,start…) | Khai báo biến không gán lại bằng const: q = gọi harness({defaultDistance:true,startX:305,fastReady:true}) | gọi q.mod.start('SCAN') để khởi động bộ điều khiển | gọi q.advance(150)
test('SCAN rotates native ready skills without changing cooldown durations',()=>{const q=harness({defaultDistance:true,startX:305,fastReady:true});q.mod.start('SCAN');q.advance(150);assert.deepEqual(q.calls,[1001,1002]);assert.equal(q.s._rtt[1][2],100);assert.equal(q.s._rtt[2][2],100);});
// [VI dòng gốc 116] gọi test('new default moves outward to 302 from Boss', ()=>{const q=harness({defaultDistance:true,newDefault:true,startX:180});q.…) | Khai báo biến không gán lại bằng const: q = gọi harness({defaultDistance:true,newDefault:true,startX:180}) | gọi q.mod.start('SCAN') để khởi động bộ điều khiển | gọi assert.equal(q.mod.report().goalDistance, 302) để kiểm tra hai giá trị bằng nhau
test('new default moves outward to 302 from Boss',()=>{const q=harness({defaultDistance:true,newDefault:true,startX:180});q.mod.start('SCAN');assert.equal(q.mod.report().goalDistance,302);assert.equal(q.actor.coords.x,302);});
// [VI dòng gốc 117] gọi test('full-health handoff cancels orbit path and repositions then casts without restart', ()=>{ const q=harness({fastReady:tr…)
test('full-health handoff cancels orbit path and repositions then casts without restart',()=>{
// [VI dòng gốc 118] Khai báo biến không gán lại bằng const: q = gọi harness({fastReady:true,slowMove:true}) | gọi q.mod.start('SCAN') để khởi động bộ điều khiển | gọi assert.equal(q.calls.length, 1) để kiểm tra hai giá trị bằng nhau
 const q=harness({fastReady:true,slowMove:true});q.mod.start('SCAN');assert.equal(q.calls.length,1);
// [VI dòng gốc 119] gọi q.phase('RETREAT') | gọi q.hp(35) | gọi q.pump() | gán q.actor.coords.x bằng 370
 q.phase('RETREAT');q.hp(35);q.pump();q.actor.coords.x=370;q.m.moveTo(430,0);assert.equal(q.m.running(),true);
// [VI dòng gốc 120] gọi q.hp(99.999) | gọi q.pump() | gọi assert.equal(q.mod.report().recoveryResumes, 0) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.calls.length, 1) để kiểm tra hai giá trị bằng nhau
 q.hp(99.999);q.pump();assert.equal(q.mod.report().recoveryResumes,0);assert.equal(q.calls.length,1);
// [VI dòng gốc 121] gọi q.hp(100) | gọi q.phase('FIGHT') | gọi q.pump() | gọi assert.equal(q.mod.report().recoveryResumes, 1) để kiểm tra hai giá trị bằng nhau
 q.hp(100);q.phase('FIGHT');q.pump();assert.equal(q.mod.report().recoveryResumes,1);assert.equal(q.movements.at(-1).x,310.4);
// [VI dòng gốc 122] gọi q.advance(2000) | gọi assert.equal(q.mod.report().positioning, false) để kiểm tra hai giá trị bằng nhau | gọi assert(q.calls.length>1) để kiểm tra điều kiện của bài test | gọi q.pump()
 q.advance(2000);assert.equal(q.mod.report().positioning,false);assert(q.calls.length>1);q.pump();assert.equal(q.mod.report().recoveryResumes,1);
// [VI dòng gốc 123] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 124] gọi test('adaptive pacing learns only proven direct hits, throttles duplicates and resets at new Boss', ()=>{ const q=harness({ad…)
test('adaptive pacing learns only proven direct hits, throttles duplicates and resets at new Boss',()=>{
// [VI dòng gốc 125] Khai báo biến không gán lại bằng const: q = gọi harness({adaptive:true}) | gọi q.mod.start('SCAN') để khởi động bộ điều khiển
 const q=harness({adaptive:true});q.mod.start('SCAN');
// [VI dòng gốc 126] Lặp for: khởi tạo let i=0; tiếp tục khi i<10; sau mỗi vòng i++. | Khai báo biến có thể gán lại bằng let: i = 0 | gọi q.c.combat(1001) | gọi q.events[1012]('10228867268946', 10010000, 10, 1, 'boss1')
 for(let i=0;i<10;i++){q.c.combat(1001);q.events[1012]('10228867268946',10010000,10,1,'boss1');q.advance(100);}
// [VI dòng gốc 127] gọi assert.equal(q.mod.report().paceMs, 1) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.mod.report().adaptivePacing.acceptedSamples, 8) để kiểm tra hai giá trị bằng nhau
 assert.equal(q.mod.report().paceMs,1);assert.equal(q.mod.report().adaptivePacing.acceptedSamples,8);
// [VI dòng gốc 128] gọi q.c.combat(1001) | Khai báo biến không gán lại bằng const: count = đọc q.calls.length | gọi assert.equal(q.calls.length, count) để kiểm tra hai giá trị bằng nhau
 q.c.combat(1001);const count=q.calls.length;q.c.combat(1001);assert.equal(q.calls.length,count);
// [VI dòng gốc 129] gọi q.advance(3501) | Lặp for: khởi tạo let i=0; tiếp tục khi i<7; sau mỗi vòng i++. | Khai báo biến có thể gán lại bằng let: i = 0 | gọi q.c.combat(1001)
 q.advance(3501);for(let i=0;i<7;i++){q.c.combat(1001);q.advance(3501);}
// [VI dòng gốc 130] gọi assert.equal(q.mod.report().paceMs, 5) để kiểm tra hai giá trị bằng nhau
 assert.equal(q.mod.report().paceMs,5);
// [VI dòng gốc 131] gọi q.occ(1000) | gọi q.pump() | gọi assert.equal(q.mod.report().adaptivePacing.acceptedSamples, 0) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.mod.report().paceMs, 1) để kiểm tra hai giá trị bằng nhau
 q.occ(1000);q.pump();assert.equal(q.mod.report().adaptivePacing.acceptedSamples,0);assert.equal(q.mod.report().paceMs,1);
// [VI dòng gốc 132] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 133] gọi test('recovery interruptions and unknown non-damaging skills never slow adaptive pacing', ()=>{ const q=harness({adaptive:tru…)
test('recovery interruptions and unknown non-damaging skills never slow adaptive pacing',()=>{
// [VI dòng gốc 134] Khai báo biến không gán lại bằng const: q = gọi harness({adaptive:true}) | gọi q.mod.start('SCAN') để khởi động bộ điều khiển
 const q=harness({adaptive:true});q.mod.start('SCAN');
// [VI dòng gốc 135] Lặp for: khởi tạo let i=0; tiếp tục khi i<2; sau mỗi vòng i++. | Khai báo biến có thể gán lại bằng let: i = 0 | gọi q.c.combat(1001) | gọi q.events[1012]('10228867268946', 10010000, 10, 1, 'boss1')
 for(let i=0;i<2;i++){q.c.combat(1001);q.events[1012]('10228867268946',10010000,10,1,'boss1');q.advance(100);}
// [VI dòng gốc 136] gọi q.c.combat(1001) | gọi q.phase('RETREAT') | gọi q.advance(4000) | gọi assert.equal(q.mod.report().adaptivePacing.acceptedSamples, 0) để kiểm tra hai giá trị bằng nhau
 q.c.combat(1001);q.phase('RETREAT');q.advance(4000);assert.equal(q.mod.report().adaptivePacing.acceptedSamples,0);
// [VI dòng gốc 137] gọi q.phase('FIGHT') | gọi q.pump() | gọi q.c.combat(1002) | gọi q.advance(4000)
 q.phase('FIGHT');q.pump();q.c.combat(1002);q.advance(4000);assert.equal(q.mod.report().adaptivePacing.acceptedSamples,0);
// [VI dòng gốc 138] gọi assert.equal(q.mod.report().paceMs, 1) để kiểm tra hai giá trị bằng nhau
 assert.equal(q.mod.report().paceMs,1);
// [VI dòng gốc 139] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 140] gọi test('per-Boss metrics attribute hits, time cooldown/recovery and preserve completed Boss snapshots', ()=>{ const q=harness({…)
test('per-Boss metrics attribute hits, time cooldown/recovery and preserve completed Boss snapshots',()=>{
// [VI dòng gốc 141] Khai báo biến không gán lại bằng const: q = gọi harness({metrics:true,fastReady:true,cooling:true}) | gọi q.mod.start('SCAN') để khởi động bộ điều khiển | gọi q.advance(200)
 const q=harness({metrics:true,fastReady:true,cooling:true});q.mod.start('SCAN');q.advance(200);
// [VI dòng gốc 142] Khai báo biến có thể gán lại bằng let: p = đọc q.mod.report().performance | gọi assert.equal(p.current.timeMs.native_cooldown, 200) để kiểm tra hai giá trị bằng nhau
 let p=q.mod.report().performance;assert.equal(p.current.timeMs.native_cooldown,200);
// [VI dòng gốc 143] gọi q.cooldown(false) | gọi q.advance(100) | gọi q.events[1012]('10228867268946', 10010000, 80, 1, 'boss1')
 q.cooldown(false);q.advance(100);q.events[1012]('10228867268946',10010000,80,1,'boss1');
// [VI dòng gốc 144] gán p bằng q.mod.report().performance | gọi assert.equal(p.current.skills[0].hits, 1) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(p.current.skills[0].matchedDamage, 80) để kiểm tra hai giá trị bằng nhau
 p=q.mod.report().performance;assert.equal(p.current.skills[0].hits,1);assert.equal(p.current.skills[0].matchedDamage,80);
// [VI dòng gốc 145] gọi q.cooldown(true) | gọi q.phase('RETREAT') | gọi q.hp(35) | gọi q.pump()
 q.cooldown(true);q.phase('RETREAT');q.hp(35);q.pump();q.advance(1000);
// [VI dòng gốc 146] gọi assert.equal(q.mod.report().performance.current.timeMs.recovery, 1000) để kiểm tra hai giá trị bằng nhau
 assert.equal(q.mod.report().performance.current.timeMs.recovery,1000);
// [VI dòng gốc 147] gọi q.hp(100) | gọi q.phase('FIGHT') | gọi q.pump() | gọi assert.equal(q.mod.report().performance.current.recoveryResumes, 1) để kiểm tra hai giá trị bằng nhau
 q.hp(100);q.phase('FIGHT');q.pump();assert.equal(q.mod.report().performance.current.recoveryResumes,1);
// [VI dòng gốc 148] gọi q.occ(1000) | gọi q.pump() | gán p bằng q.mod.report().performance | gọi assert.equal(p.completed.length, 1) để kiểm tra hai giá trị bằng nhau
 q.occ(1000);q.pump();p=q.mod.report().performance;assert.equal(p.completed.length,1);assert.equal(p.current.occ,1000);assert.equal(p.current.skills.length,0);
// [VI dòng gốc 149] gán p.completed[0].skills[0].matchedDamage bằng 0 | gọi assert.equal(q.mod.report().performance.completed[0].skills[0].matchedDamage, 80) để kiểm tra hai giá trị bằng nhau
 p.completed[0].skills[0].matchedDamage=0;assert.equal(q.mod.report().performance.completed[0].skills[0].matchedDamage,80);
// [VI dòng gốc 150] gọi q.mod.stop() để dừng bộ điều khiển và dọn tài nguyên | gọi assert.equal(q.mod.report().performance.current, null) để kiểm tra hai giá trị bằng nhau
 q.mod.stop();assert.equal(q.mod.report().performance.current,null);
// [VI dòng gốc 151] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 152] gọi test('metrics bound history and pending calls, exclude interrupted samples and keep report reads passive', ()=>{ const q=harn…)
test('metrics bound history and pending calls, exclude interrupted samples and keep report reads passive',()=>{
// [VI dòng gốc 153] Khai báo biến không gán lại bằng const: q = gọi harness({metrics:true}); m = gọi q.W.KVPV_COMBAT_METRICS.create()
 const q=harness({metrics:true}),m=q.W.KVPV_COMBAT_METRICS.create();
// [VI dòng gốc 154] Lặp for: khởi tạo let i=0; tiếp tục khi i<25; sau mỗi vòng i++. | Khai báo biến có thể gán lại bằng let: i = 0 | gọi m.open({key:String(i),bossId:String(i)}) | gọi m.cast(1, 1001, 1)
 for(let i=0;i<25;i++){m.open({key:String(i),bossId:String(i)});m.cast(1,1001,1);m.close();}
// [VI dòng gốc 155] gọi assert.equal(m.report().completed.length, 20) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(m.report().completed[0].skills[0].interrupted, 1) để kiểm tra hai giá trị bằng nhau
 assert.equal(m.report().completed.length,20);assert.equal(m.report().completed[0].skills[0].interrupted,1);
// [VI dòng gốc 156] gọi m.open({key:'last'}) | Lặp for: khởi tạo let i=0; tiếp tục khi i<260; sau mỗi vòng i++. | Khai báo biến có thể gán lại bằng let: i = 0 | gọi m.cast(i, 1001, 1)
 m.open({key:'last'});for(let i=0;i<260;i++)m.cast(i,1001,1);
// [VI dòng gốc 157] Khai báo biến có thể gán lại bằng let: row = đọc m.report().current.skills[0] | gọi assert.equal(row.pending, 250) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(row.interrupted, 10) để kiểm tra hai giá trị bằng nhau
 let row=m.report().current.skills[0];assert.equal(row.pending,250);assert.equal(row.interrupted,10);
// [VI dòng gốc 158] gọi m.result(259, false, 0, true) | gọi m.result(258, false) | gọi m.result(257, true, 40)
 m.result(259,false,0,true);m.result(258,false);m.result(257,true,40);
// [VI dòng gốc 159] gán row bằng m.report().current.skills[0] | gọi assert.equal(row.interrupted, 11) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(row.unconfirmed, 1) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(row.confirmationRate, 0.5) để kiểm tra hai giá trị bằng nhau
 row=m.report().current.skills[0];assert.equal(row.interrupted,11);assert.equal(row.unconfirmed,1);assert.equal(row.confirmationRate,0.5);
// [VI dòng gốc 160] Lặp for: khởi tạo let i=0; tiếp tục khi i<80; sau mỗi vòng i++. | Khai báo biến có thể gán lại bằng let: i = 0 | gọi m.state('waiting_pace', 'FIGHT', i%2?1:5, 'test')
 for(let i=0;i<80;i++)m.state('waiting_pace','FIGHT',i%2?1:5,'test');
// [VI dòng gốc 161] gọi assert.equal(m.report().current.paceHistory.length, 60) để kiểm tra hai giá trị bằng nhau
 assert.equal(m.report().current.paceHistory.length,60);
// [VI dòng gốc 162] Khai báo biến không gán lại bằng const: p = gọi m.report() | gán p.current.skills[0].attempts bằng 0 | gọi assert.equal(m.report().current.skills[0].attempts, 260) để kiểm tra hai giá trị bằng nhau
 const p=m.report();p.current.skills[0].attempts=0;assert.equal(m.report().current.skills[0].attempts,260);
// [VI dòng gốc 163] gọi assert.equal(q.calls.length, 0) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.movements.length, 0) để kiểm tra hai giá trị bằng nhau
 assert.equal(q.calls.length,0);assert.equal(q.movements.length,0);
// [VI dòng gốc 164] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 165] gọi test('Linh Lung shares Tian Quan recovery and stops at death or exit', ()=>{ const q=harness({tower:true,newDefault:true,defa…)
test('Linh Lung shares Tian Quan recovery and stops at death or exit',()=>{
// [VI dòng gốc 166] Khai báo biến không gán lại bằng const: q = gọi harness({tower:true,newDefault:true,defaultDistance:true,startX:100,fastReady:true}) | gọi q.occ(12345) | gọi q.mod.start('SCAN') để khởi động bộ điều khiển
 const q=harness({tower:true,newDefault:true,defaultDistance:true,startX:100,fastReady:true});q.occ(12345);q.mod.start('SCAN');
// [VI dòng gốc 167] gọi assert.equal(q.actor.coords.x, 302) để kiểm tra hai giá trị bằng nhau | gọi q.pump() | gọi assert(q.calls.length>0) để kiểm tra điều kiện của bài test
 assert.equal(q.actor.coords.x,302);q.pump();assert(q.calls.length>0);
// [VI dòng gốc 168] gọi q.events[1012]('10228867268946', 10010000, 30, 1, 'boss1') | gọi assert.equal(q.mod.report().confirmedCastHitPairs, 1) để kiểm tra hai giá trị bằng nhau
 q.events[1012]('10228867268946',10010000,30,1,'boss1');assert.equal(q.mod.report().confirmedCastHitPairs,1);
// [VI dòng gốc 169] Khai báo biến có thể gán lại bằng let: calls = đọc q.calls.length | gọi q.hp(35) | gọi q.phase('RETREAT') | gọi q.advance(100)
 let calls=q.calls.length;q.hp(35);q.phase('RETREAT');q.advance(100);assert.equal(q.calls.length,calls);
// [VI dòng gốc 170] gọi q.hp(1) | gọi q.advance(100) | gọi assert.equal(q.calls.length, calls) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.mod.report().recoveryEnabled, true) để kiểm tra hai giá trị bằng nhau
 q.hp(1);q.advance(100);assert.equal(q.calls.length,calls);assert.equal(q.mod.report().recoveryEnabled,true);
// [VI dòng gốc 171] gọi assert.equal(q.mod.report().combatOwner, 'HITRUN') để kiểm tra hai giá trị bằng nhau
 assert.equal(q.mod.report().combatOwner,'HITRUN');
// [VI dòng gốc 172] gọi q.hp(100) | gọi q.phase('FIGHT') | gọi q.advance(100) | gọi assert(q.calls.length>calls) để kiểm tra điều kiện của bài test
 q.hp(100);q.phase('FIGHT');q.advance(100);assert(q.calls.length>calls);
// [VI dòng gốc 173] gọi q.hp(0) | gán calls bằng q.calls.length | gọi q.advance(100) | gọi q.c.combat(1001)
 q.hp(0);calls=q.calls.length;q.advance(100);q.c.combat(1001);assert.equal(q.calls.length,calls);
// [VI dòng gốc 174] gọi q.hp(100) | gán q.W._Ba._rJ._O$.ins.isDead bằng true | gọi q.advance(100) | gọi assert.equal(q.calls.length, calls) để kiểm tra hai giá trị bằng nhau
 q.hp(100);q.W._Ba._rJ._O$.ins.isDead=true;q.advance(100);assert.equal(q.calls.length,calls);
// [VI dòng gốc 175] gán q.W._Ba._rJ._O$.ins.isDead bằng false | gán q.W._C._Mn._Cn.currentID bằng 1002 | gán q.W._Ba._$a.SceneUtil.isCommonScene bằng true | gọi q.pump()
 q.W._Ba._rJ._O$.ins.isDead=false;q.W._C._Mn._Cn.currentID=1002;q.W._Ba._$a.SceneUtil.isCommonScene=true;q.pump();
// [VI dòng gốc 176] gọi assert.equal(q.mod.report().lastReason, 'outside_tianquan_native_combat') để kiểm tra hai giá trị bằng nhau
 assert.equal(q.mod.report().lastReason,'outside_tianquan_native_combat');
// [VI dòng gốc 177] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 178] gọi test('busy native combat never consumes selector cooldowns or emits overlapping calls', ()=>{ const q=harness({fastReady:true…)
test('busy native combat never consumes selector cooldowns or emits overlapping calls',()=>{
// [VI dòng gốc 179] Khai báo biến không gán lại bằng const: q = gọi harness({fastReady:true,cooling:true}) | gọi q.mod.start('SCAN') để khởi động bộ điều khiển
 const q=harness({fastReady:true,cooling:true});q.mod.start('SCAN');
// [VI dòng gốc 180] Khai báo biến không gán lại bằng const: before = gọi JSON.stringify(q.s._rtt) để chuyển giá trị thành chuỗi JSON | gọi assert.equal(q.s.selectSkill(), -1) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(JSON.stringify(q.s._rtt), before) để kiểm tra hai giá trị bằng nhau
 const before=JSON.stringify(q.s._rtt);assert.equal(q.s.selectSkill(),-1);assert.equal(JSON.stringify(q.s._rtt),before);
// [VI dòng gốc 181] gọi q.c.combat(1001) | gọi assert.equal(q.calls.length, 0) để kiểm tra hai giá trị bằng nhau | gọi q.cooldown(false) | gọi q.advance(100)
 q.c.combat(1001);assert.equal(q.calls.length,0);q.cooldown(false);q.advance(100);assert.equal(q.calls.length,1);
// [VI dòng gốc 182] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 183] gọi test('tower ranks confirmed damage but preserves periodic native rotation and original durations', ()=>{ const q=harness({tow…)
test('tower ranks confirmed damage but preserves periodic native rotation and original durations',()=>{
// [VI dòng gốc 184] Khai báo biến không gán lại bằng const: q = gọi harness({tower:true}) | gọi q.mod.start('SCAN') để khởi động bộ điều khiển
 const q=harness({tower:true});q.mod.start('SCAN');
// [VI dòng gốc 185] Duyệt từng giá trị trong [[1001,10],[1001,10],[1002,100],[1002,100]] bằng const [id,damage]. | Khai báo biến không gán lại bằng const: [id,damage] (chưa gán giá trị)
 for(const [id,damage]of [[1001,10],[1001,10],[1002,100],[1002,100]]){
// [VI dòng gốc 186] gọi q.c.combat(id) | gọi q.events[1012]('10228867268946', id*10000, damage, 1, 'boss1') | gọi q.advance(101)
   q.c.combat(id);q.events[1012]('10228867268946',id*10000,damage,1,'boss1');q.advance(101);
// [VI dòng gốc 187] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
 }
// [VI dòng gốc 188] gọi assert.equal(q.mod.report().skillPriority, 'observed_damage_with_fair_rotation') để kiểm tra hai giá trị bằng nhau
 assert.equal(q.mod.report().skillPriority,'observed_damage_with_fair_rotation');
// [VI dòng gốc 189] gọi assert.equal(q.s.selectSkill(), 1001) để kiểm tra hai giá trị bằng nhau | gọi q.c.combat(1001) | gọi q.events[1012]('10228867268946', 10010000, 10, 1, 'boss1') | gọi q.advance(101)
 assert.equal(q.s.selectSkill(),1001);q.c.combat(1001);q.events[1012]('10228867268946',10010000,10,1,'boss1');q.advance(101);
// [VI dòng gốc 190] gọi assert.equal(q.s.selectSkill(), 1002) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.s._rtt[1][2], 100) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.s._rtt[2][2], 100) để kiểm tra hai giá trị bằng nhau
 assert.equal(q.s.selectSkill(),1002);assert.equal(q.s._rtt[1][2],100);assert.equal(q.s._rtt[2][2],100);
// [VI dòng gốc 191] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 192] gọi test('OFF to FIGHT handoff does not count as an actual healing recovery', ()=>{ const q=harness({metrics:true});q.phase('OFF'…)
test('OFF to FIGHT handoff does not count as an actual healing recovery',()=>{
// [VI dòng gốc 193] Khai báo biến không gán lại bằng const: q = gọi harness({metrics:true}) | gọi q.phase('OFF') | gọi q.mod.start('SCAN') để khởi động bộ điều khiển | gọi q.phase('FIGHT')
 const q=harness({metrics:true});q.phase('OFF');q.mod.start('SCAN');q.phase('FIGHT');q.pump();
// [VI dòng gốc 194] gọi assert.equal(q.mod.report().recoveryResumes, 0) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.mod.report().performance.current.recoveryResumes, 0) để kiểm tra hai giá trị bằng nhau
 assert.equal(q.mod.report().recoveryResumes,0);assert.equal(q.mod.report().performance.current.recoveryResumes,0);
// [VI dòng gốc 195] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 196] gọi test('burst dispatches eight ready native skills in one turn and verifies every matching hit separately', ()=>{ const q=harne…)
test('burst dispatches eight ready native skills in one turn and verifies every matching hit separately',()=>{
// [VI dòng gốc 197] Khai báo biến không gán lại bằng const: q = gọi harness({fastReady:true}) | Lặp for: khởi tạo let id=1003; tiếp tục khi id<=1008; sau mỗi vòng id++. | Khai báo biến có thể gán lại bằng let: id = 1003 | gọi q.s._rtt.push([id,0,100]) để thêm phần tử vào cuối mảng
 const q=harness({fastReady:true});for(let id=1003;id<=1008;id++)q.s._rtt.push([id,0,100]);
// [VI dòng gốc 198] Khai báo biến không gán lại bằng const: native = đọc q.c.combat | gán q.c.combat bằng function(id){q.cooldown(true);return native.call(this,id);} | gọi q.cooldown(true) | Kết thúc hàm hiện tại và trả về: gọi native.call(this, id).
 const native=q.c.combat;q.c.combat=function(id){q.cooldown(true);return native.call(this,id);};
// [VI dòng gốc 199] gọi q.mod.setBurst(true) để bật/tắt chế độ thử tung nhóm chiêu; false là tắt | gọi q.mod.start('SCAN') để khởi động bộ điều khiển | gọi assert.equal(q.calls.length, 8) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(new Set(q.calls).size, 8) để kiểm tra hai giá trị bằng nhau
 q.mod.setBurst(true);q.mod.start('SCAN');assert.equal(q.calls.length,8);assert.equal(new Set(q.calls).size,8);
// [VI dòng gốc 200] gọi assert.equal(q.mod.report().burst.batches[0].attempted.length, 8) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.mod.report().burst.batches[0].confirmed.length, 0) để kiểm tra hai giá trị bằng nhau
 assert.equal(q.mod.report().burst.batches[0].attempted.length,8);assert.equal(q.mod.report().burst.batches[0].confirmed.length,0);
// [VI dòng gốc 201] gọi q.cooldown(false) | gọi q.advance(1000) | gọi assert.equal(q.calls.length, 8) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.mod.report().lastReason, 'burst_waiting_results') để kiểm tra hai giá trị bằng nhau
 q.cooldown(false);q.advance(1000);assert.equal(q.calls.length,8);assert.equal(q.mod.report().lastReason,'burst_waiting_results');
// [VI dòng gốc 202] Lặp for: khởi tạo let id=1001; tiếp tục khi id<=1008; sau mỗi vòng id++. | Khai báo biến có thể gán lại bằng let: id = 1001 | gọi q.events[1012]('10228867268946', id*10000, 10, 1, 'boss1')
 for(let id=1001;id<=1008;id++)q.events[1012]('10228867268946',id*10000,10,1,'boss1');
// [VI dòng gốc 203] Khai báo biến có thể gán lại bằng let: b = đọc q.mod.report().burst.batches[0] | gọi assert.equal(b.confirmed.length, 8) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(b.matchedDamage, 80) để kiểm tra hai giá trị bằng nhau
 let b=q.mod.report().burst.batches[0];assert.equal(b.confirmed.length,8);assert.equal(b.matchedDamage,80);
// [VI dòng gốc 204] gọi q.phase('RETREAT') | gọi q.hp(35) | gọi q.advance(4000) | gọi assert.equal(q.calls.length, 8) để kiểm tra hai giá trị bằng nhau
 q.phase('RETREAT');q.hp(35);q.advance(4000);assert.equal(q.calls.length,8);
// [VI dòng gốc 205] gọi q.phase('FIGHT') | gọi q.hp(100) | gọi q.pump() | gọi assert.equal(q.calls.length, 16) để kiểm tra hai giá trị bằng nhau
 q.phase('FIGHT');q.hp(100);q.pump();assert.equal(q.calls.length,16);
// [VI dòng gốc 206] gọi q.mod.setBurst(false) để bật/tắt chế độ thử tung nhóm chiêu; false là tắt | gọi q.cooldown(false) | gọi q.advance(1000) | gọi assert.equal(q.calls.length, 17) để kiểm tra hai giá trị bằng nhau
 q.mod.setBurst(false);q.cooldown(false);q.advance(1000);assert.equal(q.calls.length,17);
// [VI dòng gốc 207] gọi assert.equal(q.mod.report().burst.enabled, false) để kiểm tra hai giá trị bằng nhau | gọi assert(q.s._rtt.every(row=>row[2]===100||row[0]===8001)) để kiểm tra điều kiện của bài test
 assert.equal(q.mod.report().burst.enabled,false);assert(q.s._rtt.every(row=>row[2]===100||row[0]===8001));
// [VI dòng gốc 208] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 209] gọi test('burst preserves skill readiness, native initial lock, strict proofs and live tower HP checks', ()=>{ const q=harness({f…)
test('burst preserves skill readiness, native initial lock, strict proofs and live tower HP checks',()=>{
// [VI dòng gốc 210] Khai báo biến không gán lại bằng const: q = gọi harness({fastReady:true,cooling:true,tower:true}) | gán q.s._rtt[2][1] bằng Date.now()+100000
 const q=harness({fastReady:true,cooling:true,tower:true});q.s._rtt[2][1]=Date.now()+100000;
// [VI dòng gốc 211] gọi q.mod.setBurst(true) để bật/tắt chế độ thử tung nhóm chiêu; false là tắt | gọi q.mod.start('SCAN') để khởi động bộ điều khiển | gọi assert.equal(q.calls.length, 0) để kiểm tra hai giá trị bằng nhau
 q.mod.setBurst(true);q.mod.start('SCAN');assert.equal(q.calls.length,0);
// [VI dòng gốc 212] gọi q.cooldown(false) | gọi q.advance(100) | gọi assert.deepEqual(q.calls, [1001]) để kiểm tra cấu trúc hai giá trị tương đương
 q.cooldown(false);q.advance(100);assert.deepEqual(q.calls,[1001]);
// [VI dòng gốc 213] gọi q.hp(1) | gọi q.phase('RETREAT') | gọi q.advance(4000) | gọi assert.equal(q.calls.length, 1) để kiểm tra hai giá trị bằng nhau
 q.hp(1);q.phase('RETREAT');q.advance(4000);assert.equal(q.calls.length,1);q.hp(100);q.phase('FIGHT');q.advance(4000);assert(q.calls.length>1);q.hp(0);const calls=q.calls.length;q.advance(4000);assert.equal(q.calls.length,calls);
// [VI dòng gốc 214] Khai báo biến không gán lại bằng const: r = gọi harness({fastReady:true}) | gọi r.mod.setBurst(true) để bật/tắt chế độ thử tung nhóm chiêu; false là tắt | gọi r.mod.start('STRICT') để khởi động bộ điều khiển | gọi assert.equal(r.calls.length, 0) để kiểm tra hai giá trị bằng nhau
 const r=harness({fastReady:true});r.mod.setBurst(true);r.mod.start('STRICT');assert.equal(r.calls.length,0);
// [VI dòng gốc 215] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 216] gọi test('an unconfirmed skill never holds other confirmed ready skills behind a batch barrier', ()=>{ const q=harness({fastReady…)
test('an unconfirmed skill never holds other confirmed ready skills behind a batch barrier',()=>{
// [VI dòng gốc 217] Khai báo biến không gán lại bằng const: q = gọi harness({fastReady:true}) | gọi q.mod.setBurst(true) để bật/tắt chế độ thử tung nhóm chiêu; false là tắt | gọi q.mod.start('SCAN') để khởi động bộ điều khiển | gọi assert.equal(q.calls.length, 2) để kiểm tra hai giá trị bằng nhau
 const q=harness({fastReady:true});q.mod.setBurst(true);q.mod.start('SCAN');assert.equal(q.calls.length,2);
// [VI dòng gốc 218] gọi q.events[1012]('10228867268946', 10010000, 10, 1, 'boss1')
 q.events[1012]('10228867268946',10010000,10,1,'boss1');
// [VI dòng gốc 219] gọi q.advance(1000) | gọi assert.equal(q.calls.length, 3) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.calls[2], 1001) để kiểm tra hai giá trị bằng nhau
 q.advance(1000);assert.equal(q.calls.length,3);assert.equal(q.calls[2],1001);
// [VI dòng gốc 220] Khai báo biến không gán lại bằng const: b = đọc q.mod.report().burst | gọi assert.equal(b.resultWaitScope, 'per_skill') để kiểm tra hai giá trị bằng nhau | gọi assert.deepEqual(Array.from(b.batches[1].attempted), [1001]) để kiểm tra cấu trúc hai giá trị tương đương
 const b=q.mod.report().burst;assert.equal(b.resultWaitScope,'per_skill');assert.deepEqual(Array.from(b.batches[1].attempted),[1001]);
// [VI dòng gốc 221] gọi q.advance(1000) | gọi assert.equal(q.calls.length, 3) để kiểm tra hai giá trị bằng nhau
 q.advance(1000);assert.equal(q.calls.length,3); // Hai ID đều có lần tung đang chờ, không gọi trùng.
// [VI dòng gốc 222] gọi q.advance(100) | gọi assert.equal(q.mod.report().burst.batches.length, 2) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.mod.report().burst.batches[1].serial, 2) để kiểm tra hai giá trị bằng nhau
 q.advance(100);assert.equal(q.mod.report().burst.batches.length,2);assert.equal(q.mod.report().burst.batches[1].serial,2);
// [VI dòng gốc 223] gọi q.hp(35) | gọi q.phase('RETREAT') | gọi q.advance(4000) | gọi assert.equal(q.calls.length, 3) để kiểm tra hai giá trị bằng nhau
 q.hp(35);q.phase('RETREAT');q.advance(4000);assert.equal(q.calls.length,3);
// [VI dòng gốc 224] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 225] gọi test('basic probe uses native basic IDs, verifies distance/source and resumes Tuyet Hoc after bounded attempts', ()=>{ const …)
test('basic probe uses native basic IDs, verifies distance/source and resumes Tuyet Hoc after bounded attempts',()=>{
// [VI dòng gốc 226] Khai báo biến không gán lại bằng const: q = gọi harness({fastReady:true}) | gọi q.mod.setBasicProbe(true) để bật/tắt phép thử đòn thường có giới hạn | gọi q.mod.start('SCAN') để khởi động bộ điều khiển | gọi assert.equal(q.calls.length, 1) để kiểm tra hai giá trị bằng nhau
 const q=harness({fastReady:true});q.mod.setBasicProbe(true);q.mod.start('SCAN');assert.equal(q.calls.length,1);assert.equal(q.calls[0],8001);
// [VI dòng gốc 227] gọi q.events[1012]('other', 80010000, 100, 1, 'boss1') | gọi q.events[1012]('10228867268946', 80010000, 100, 4, 'boss1')
 q.events[1012]('other',80010000,100,1,'boss1');q.events[1012]('10228867268946',80010000,100,4,'boss1');
// [VI dòng gốc 228] gọi assert.equal(q.mod.report().basicProbe.confirmedHits, 0) để kiểm tra hai giá trị bằng nhau
 assert.equal(q.mod.report().basicProbe.confirmedHits,0);
// [VI dòng gốc 229] gọi q.events[1012]('10228867268946', 80010000, 100, 1, 'boss1')
 q.events[1012]('10228867268946',80010000,100,1,'boss1');
// [VI dòng gốc 230] Khai báo biến có thể gán lại bằng let: p = đọc q.mod.report().basicProbe | gọi assert.equal(p.confirmedHits, 1) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(p.matchedDamage, 100) để kiểm tra hai giá trị bằng nhau | gọi assert(p.examples[0].castDistance>300) để kiểm tra điều kiện của bài test
 let p=q.mod.report().basicProbe;assert.equal(p.confirmedHits,1);assert.equal(p.matchedDamage,100);assert(p.examples[0].castDistance>300);
// [VI dòng gốc 231] gọi assert.equal(q.mod.report().confirmedCastHitPairs, 0) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.mod.report().confirmedSkills.length, 0) để kiểm tra hai giá trị bằng nhau
 assert.equal(q.mod.report().confirmedCastHitPairs,0);assert.equal(q.mod.report().confirmedSkills.length,0);
// [VI dòng gốc 232] Lặp for: khởi tạo let i=0; tiếp tục khi i<12; sau mỗi vòng i++. | Khai báo biến có thể gán lại bằng let: i = 0 | gọi q.advance(500) | Khai báo biến không gán lại bằng const: id = gọi q.calls.at(-1)
 for(let i=0;i<12;i++){q.advance(500);const id=q.calls.at(-1);if(id>=8001&&id<=8009)q.events[1012]('10228867268946',id*10000,10,1,'boss1');}
// [VI dòng gốc 233] gọi assert.equal(q.calls.filter(id=>id>=8001&&id<=8009).length, 8) để kiểm tra hai giá trị bằng nhau | gọi assert(q.calls.some(id=>id===1001||id===1002)) để kiểm tra điều kiện của bài test
 assert.equal(q.calls.filter(id=>id>=8001&&id<=8009).length,8);assert(q.calls.some(id=>id===1001||id===1002));
// [VI dòng gốc 234] gọi assert.equal(q.mod.report().basicProbe.active, false) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.s._rtt[0][2], 50) để kiểm tra hai giá trị bằng nhau
 assert.equal(q.mod.report().basicProbe.active,false);assert.equal(q.s._rtt[0][2],50);
// [VI dòng gốc 235] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 236] gọi test('unconfirmed basic probes time out without proof, honor recovery and stop, and work in living low-HP tower', ()=>{ const…)
test('unconfirmed basic probes time out without proof, honor recovery and stop, and work in living low-HP tower',()=>{
// [VI dòng gốc 237] Khai báo biến không gán lại bằng const: q = gọi harness({fastReady:true}) | gọi q.mod.setBasicProbe(true) để bật/tắt phép thử đòn thường có giới hạn | gọi q.mod.start('SCAN') để khởi động bộ điều khiển | gọi q.phase('RETREAT')
 const q=harness({fastReady:true});q.mod.setBasicProbe(true);q.mod.start('SCAN');q.phase('RETREAT');q.hp(35);const n=q.calls.length;q.advance(16000);
// [VI dòng gốc 238] gọi assert.equal(q.calls.length, n) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.mod.report().basicProbe.confirmedHits, 0) để kiểm tra hai giá trị bằng nhau
 assert.equal(q.calls.length,n);assert.equal(q.mod.report().basicProbe.confirmedHits,0);
// [VI dòng gốc 239] gọi q.phase('FIGHT') | gọi q.hp(100) | gọi q.pump() | gọi assert(q.calls.at(-1)<8001) để kiểm tra điều kiện của bài test
 q.phase('FIGHT');q.hp(100);q.pump();assert(q.calls.at(-1)<8001);q.mod.setBasicProbe(false);assert.equal(q.mod.report().basicProbe.enabled,false);
// [VI dòng gốc 240] Khai báo biến không gán lại bằng const: r = gọi harness({fastReady:true,tower:true}) | gọi r.hp(1) | gọi r.phase('RETREAT') | gọi r.mod.setBasicProbe(true) để bật/tắt phép thử đòn thường có giới hạn
 const r=harness({fastReady:true,tower:true});r.hp(1);r.phase('RETREAT');r.mod.setBasicProbe(true);r.mod.start('SCAN');assert.equal(r.calls.length,0);r.hp(100);r.phase('FIGHT');r.pump();assert.equal(r.calls[0],8001);
// [VI dòng gốc 241] gọi r.mod.stop() để dừng bộ điều khiển và dọn tài nguyên | gọi assert.equal(r.c.combat(1001), 1001) để kiểm tra hai giá trị bằng nhau
 r.mod.stop();assert.equal(r.c.combat(1001),1001);
// [VI dòng gốc 242] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 243] gọi test('290 interleaving alternates native Tuyet Hoc and basics with independent damage proof and no burst', ()=>{ const q=harn…)
test('290 interleaving alternates native Tuyet Hoc and basics with independent damage proof and no burst',()=>{
// [VI dòng gốc 244] Khai báo biến không gán lại bằng const: q = gọi harness({fastReady:true,metrics:true}) | gọi q.mod.setBurst(true) để bật/tắt chế độ thử tung nhóm chiêu; false là tắt | gọi q.mod.setBasicProbe(true) để bật/tắt phép thử đòn thường có giới hạn | gọi q.mod.setInterleaved(true, 290) để bật/tắt bộ chọn xen đòn thường và đặt khoảng cách mục tiêu
 const q=harness({fastReady:true,metrics:true});q.mod.setBurst(true);q.mod.setBasicProbe(true);q.mod.setInterleaved(true,290);q.mod.start('SCAN');q.pump();
// [VI dòng gốc 245] gọi assert.equal(q.actor.coords.x, 290) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.mod.report().requestedDistance, 290) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.mod.report().burst.enabled, false) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.mod.report().basicProbe.enabled, false) để kiểm tra hai giá trị bằng nhau
 assert.equal(q.actor.coords.x,290);assert.equal(q.mod.report().requestedDistance,290);assert.equal(q.mod.report().burst.enabled,false);assert.equal(q.mod.report().basicProbe.enabled,false);
// [VI dòng gốc 246] Lặp for: khởi tạo let i=0; tiếp tục khi i<4; sau mỗi vòng i++. | Khai báo biến có thể gán lại bằng let: i = 0 | Khai báo biến không gán lại bằng const: id = gọi q.calls.at(-1) | gọi q.events[1012]('10228867268946', id*10000, 10, 1, 'boss1')
 for(let i=0;i<4;i++){const id=q.calls.at(-1);q.events[1012]('10228867268946',id*10000,10,1,'boss1');if(i<3)q.advance(500);}
// [VI dòng gốc 247] gọi assert.deepEqual(q.calls, [1001,8001,1002,8001]) để kiểm tra cấu trúc hai giá trị tương đương | Khai báo biến có thể gán lại bằng let: r = gọi q.mod.report() | gọi assert.equal(r.interleaved.basicAttempts, 2) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(r.interleaved.basicConfirmedHits, 2) để kiểm tra hai giá trị bằng nhau
 assert.deepEqual(q.calls,[1001,8001,1002,8001]);let r=q.mod.report();assert.equal(r.interleaved.basicAttempts,2);assert.equal(r.interleaved.basicConfirmedHits,2);assert.equal(r.confirmedCastHitPairs,2);
// [VI dòng gốc 248] gọi assert.equal(r.interleaved.examples[0].castDistance, 290) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(r.minimumDistance, 280) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(r.clientTrialRadius, 300) để kiểm tra hai giá trị bằng nhau
 assert.equal(r.interleaved.examples[0].castDistance,290);assert.equal(r.minimumDistance,280);assert.equal(r.clientTrialRadius,300);
// [VI dòng gốc 249] gọi q.hp(35) | gọi q.phase('RETREAT') | gọi q.advance(1000) | gọi assert.equal(q.calls.length, 4) để kiểm tra hai giá trị bằng nhau
 q.hp(35);q.phase('RETREAT');q.advance(1000);assert.equal(q.calls.length,4);
// [VI dòng gốc 250] gọi q.hp(100) | gọi q.phase('FIGHT') | gọi q.pump() | gọi assert(q.calls.length>4) để kiểm tra điều kiện của bài test
 q.hp(100);q.phase('FIGHT');q.pump();assert(q.calls.length>4);
// [VI dòng gốc 251] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 252] gọi test('FULL startup selects 310 and only 8001 with no TH fallback', ()=>{ const q=harness({fastReady:true,tower:true});q.W.__K…)
test('FULL startup selects 310 and enables native Tuyet Hoc plus basics in Tian Quan',()=>{
 const q=harness({fastReady:true,tower:true});q.W.__KVPV_BASIC_RANGE_TEST_20261023={status:'complete'};q.W.KVPV_MODE={armTianQuan(){q.mod.start('SCAN');}};
 vm.runInNewContext(fs.readFileSync(__dirname+'/src/11-auto-tianquan.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,''),{window:q.W});
 q.pump();
 assert.equal(q.mod.report().goalDistance,310);
 assert(Math.abs(q.actor.coords.x-310)<=5);
 assert.equal(q.mod.report().interleaved.enabled,true);
 assert.equal(q.mod.report().basicOnly,true,'Tian Quan defaults to native basic only');
 assert.equal(q.mod.report().basicHitQuota,null);
 assert.equal(q.mod.report().afterTHWaitMs,1);
 assert.equal(q.mod.report().interleaved.basicClientWaitMs,0,'basic-only mode has no TH interleave delay');
 assert(q.calls.every(id=>id===8005),'Tian Quan startup selects only basic 8005');
 const n=q.calls.length;q.cooldown(true);q.advance(500);assert.equal(q.calls.length,n);
 q.cooldown(false);q.hp(0);q.advance(500);assert.equal(q.calls.length,n);
});

for(const scope of [{},{tower:true},{rune:true},{trutien:true}])test('Boss TH priority keeps ready skills ahead of filler and respects retreat '+JSON.stringify(scope),()=>{
 const q=harness({...scope,fastReady:true});q.mod.setInterleaved(true,302);q.mod.setBasicRotation([8001]);q.mod.setClientPace(0);q.mod.setBasicPace(0);q.mod.setSkillPriority('tuyet_hoc_first');q.mod.start('SCAN');q.pump();
 assert.equal(q.calls[0],1001);q.advance(10);assert.equal(q.calls.at(-1),1002);assert(!q.calls.includes(8001));
 q.s._rtt[1][1]=Date.now()+100000;q.s._rtt[2][1]=Date.now()+100000;q.advance(10);assert.equal(q.calls.at(-1),8001);
 const n=q.calls.length;q.phase('RETREAT');q.hp(35);q.advance(1000);assert.equal(q.calls.length,n);
 assert.throws(()=>q.mod.setSkillPriority('invalid'));assert.equal(q.mod.report().skillPriority,'ready_tuyet_hoc_observed_damage_then_basic');q.mod.stop();
});
test('1ms basic client trial preserves native rows, matches real hits and respects native combat lock',()=>{
// [VI dòng gốc 261] Khai báo biến không gán lại bằng const: q = gọi harness({fastReady:true,adaptive:true}) | gọi q.mod.setBasicPace(1) để đặt khoảng chờ thêm phía client cho đòn tay; 0 nghĩa là không thêm thời gian chờ | gọi q.mod.setInterleaved(true, 302) để bật/tắt bộ chọn xen đòn thường và đặt khoảng cách mục tiêu | gọi q.mod.start('SCAN') để khởi động bộ điều khiển
 const q=harness({fastReady:true,adaptive:true});q.mod.setBasicPace(1);q.mod.setInterleaved(true,302);q.mod.start('SCAN');q.pump();
// [VI dòng gốc 262] gọi q.events[1012]('10228867268946', 10010000, 10, 1, 'boss1') | gán q.s._rtt[1][1] bằng Date.now()+100000 | gán q.s._rtt[2][1] bằng Date.now()+100000
 q.events[1012]('10228867268946',10010000,10,1,'boss1');q.s._rtt[1][1]=Date.now()+100000;q.s._rtt[2][1]=Date.now()+100000;
// [VI dòng gốc 263] Khai báo biến không gán lại bằng const: original = gọi JSON.stringify(q.s._rtt[0]) để chuyển giá trị thành chuỗi JSON | gọi q.advance(1) | gọi assert.equal(q.calls.at(-1), 8001) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(JSON.stringify(q.s._rtt[0]), original) để kiểm tra hai giá trị bằng nhau
 const original=JSON.stringify(q.s._rtt[0]);q.advance(1);assert.equal(q.calls.at(-1),8001);assert.equal(JSON.stringify(q.s._rtt[0]),original);
// [VI dòng gốc 264] gọi q.events[1012]('10228867268946', 80010000, 10, 1, 'boss1') | Khai báo biến không gán lại bằng const: n = đọc q.calls.length | gọi q.advance(2) | gọi assert.equal(q.calls.length, n+1) để kiểm tra hai giá trị bằng nhau
 q.events[1012]('10228867268946',80010000,10,1,'boss1');const n=q.calls.length;q.advance(2);assert.equal(q.calls.length,n+1);assert.equal(q.calls.at(-1),8001);
// [VI dòng gốc 265] gọi assert.equal(q.mod.report().interleaved.basicClientWaitMs, 1) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.mod.report().interleaved.scanMs, 8) để kiểm tra hai giá trị bằng nhau
 assert.equal(q.mod.report().interleaved.basicClientWaitMs,1);assert.equal(q.mod.report().interleaved.scanMs,4);
// [VI dòng gốc 266] gọi q.cooldown(true) | gọi q.advance(20) | gọi assert.equal(q.calls.length, n+1) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(JSON.stringify(q.s._rtt[0]), original) để kiểm tra hai giá trị bằng nhau
 q.cooldown(true);q.advance(20);assert.equal(q.calls.length,n+1);assert.equal(JSON.stringify(q.s._rtt[0]),original);
// [VI dòng gốc 267] gọi assert.throws(()=>q.mod.setBasicPace(-1)) để kiểm tra đoạn mã có ném lỗi như dự kiến | gọi q.mod.setBasicPace(null) để đặt khoảng chờ thêm phía client cho đòn tay; 0 nghĩa là không thêm thời gian chờ | gọi assert.equal(q.mod.report().interleaved.basicClientWaitMs, null) để kiểm tra hai giá trị bằng nhau
 assert.throws(()=>q.mod.setBasicPace(-1));q.mod.setBasicPace(null);assert.equal(q.mod.report().interleaved.basicClientWaitMs,null);
// [VI dòng gốc 268] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 269] gọi test('separate actor frames stay independent and hidden clone keeps casting with bounded model polling', ()=>{ const a=harnes…)
test('separate actor frames stay independent and hidden clone keeps casting with bounded model polling',()=>{
// [VI dòng gốc 270] Khai báo biến không gán lại bằng const: a = gọi harness({fastReady:true,actorId:'7777777777777'}); b = gọi harness({fastReady:true,actorId:'8888888888888'})
 const a=harness({fastReady:true,actorId:'7777777777777'}),b=harness({fastReady:true,actorId:'8888888888888'});
// [VI dòng gốc 271] gọi a.mod.setInterleaved(true, 302) để bật/tắt bộ chọn xen đòn thường và đặt khoảng cách mục tiêu | gọi b.mod.setInterleaved(true, 302) để bật/tắt bộ chọn xen đòn thường và đặt khoảng cách mục tiêu | gọi a.mod.start('SCAN') để khởi động bộ điều khiển | gọi b.mod.start('SCAN') để khởi động bộ điều khiển
 a.mod.setInterleaved(true,302);b.mod.setInterleaved(true,302);a.mod.start('SCAN');b.mod.start('SCAN');a.pump();b.pump();
// [VI dòng gốc 272] gọi assert.equal(a.calls[0], 1001) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(b.calls[0], 1001) để kiểm tra hai giá trị bằng nhau
 assert.equal(a.calls[0],1001);assert.equal(b.calls[0],1001);
// [VI dòng gốc 273] gọi a.events[1012]('8888888888888', 10010000, 100, 1, 'boss1') | gọi assert.equal(a.mod.report().confirmedCastHitPairs, 0) để kiểm tra hai giá trị bằng nhau
 a.events[1012]('8888888888888',10010000,100,1,'boss1');assert.equal(a.mod.report().confirmedCastHitPairs,0);
// [VI dòng gốc 274] gọi a.events[1012]('7777777777777', 10010000, 100, 1, 'boss1') | gọi assert.equal(a.mod.report().confirmedCastHitPairs, 1) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(b.mod.report().confirmedCastHitPairs, 0) để kiểm tra hai giá trị bằng nhau
 a.events[1012]('7777777777777',10010000,100,1,'boss1');assert.equal(a.mod.report().confirmedCastHitPairs,1);assert.equal(b.mod.report().confirmedCastHitPairs,0);
// [VI dòng gốc 275] gán b.W.document.hidden bằng true | gán b.W.KVPV_ACCOUNT_POLICY bằng {config:{pauseWhenHidden:false,backgroundTickMs:50}}
 b.W.document.hidden=true;b.W.KVPV_ACCOUNT_POLICY={config:{pauseWhenHidden:false,backgroundTickMs:50}};
// [VI dòng gốc 276] gọi b.advance(100) | gọi assert(b.calls.length>1) để kiểm tra điều kiện của bài test | gọi assert.notEqual(b.mod.report().lastReason, 'hidden_tab')
 b.advance(100);assert(b.calls.length>1);assert.notEqual(b.mod.report().lastReason,'hidden_tab');
// [VI dòng gốc 277] Khai báo biến không gán lại bằng const: n = đọc b.calls.length | gọi b.advance(1) | gọi assert.equal(b.calls.length, n) để kiểm tra hai giá trị bằng nhau
 const n=b.calls.length;b.advance(1);assert.equal(b.calls.length,n);
// [VI dòng gốc 278] gọi a.mod.stop() để dừng bộ điều khiển và dọn tài nguyên | gọi assert.equal(b.mod.status(false).running, true) để kiểm tra hai giá trị bằng nhau
 a.mod.stop();assert.equal(b.mod.status(false).running,true);
// [VI dòng gốc 279] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 280] gọi test('native interrupt-ready animation cannot be overwritten by interleaved basics before animation completes', ()=>{ const q…)
test('native interrupt-ready animation cannot be overwritten by interleaved basics before animation completes',()=>{
// [VI dòng gốc 281] Khai báo biến không gán lại bằng const: q = gọi harness({fastReady:true}) | gán q.c._jh bằng {isPlaying:true} | gọi q.mod.setInterleaved(true, 302) để bật/tắt bộ chọn xen đòn thường và đặt khoảng cách mục tiêu | gọi q.mod.start('SCAN') để khởi động bộ điều khiển
 const q=harness({fastReady:true});q.c._jh={isPlaying:true};q.mod.setInterleaved(true,302);q.mod.start('SCAN');q.pump();
// [VI dòng gốc 282] gọi assert.equal(q.calls.length, 0) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.mod.report().lastReason, 'waiting_native_animation') để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.s._rtt[1][1], 0) để kiểm tra hai giá trị bằng nhau
 assert.equal(q.calls.length,0);assert.equal(q.mod.report().lastReason,'waiting_native_animation');assert.equal(q.s._rtt[1][1],0);
// [VI dòng gốc 283] gán q.c._jh.isPlaying bằng false | gọi q.advance(100) | gọi assert.equal(q.calls.length, 1) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.calls[0], 1001) để kiểm tra hai giá trị bằng nhau
 q.c._jh.isPlaying=false;q.advance(100);assert.equal(q.calls.length,1);assert.equal(q.calls[0],1001);
// [VI dòng gốc 284] gán q.c._jh.isPlaying bằng true | gọi q.advance(500) | gọi assert.equal(q.calls.length, 1) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.mod.report().nativeCombat.animationPlaying, true) để kiểm tra hai giá trị bằng nhau
 q.c._jh.isPlaying=true;q.advance(500);assert.equal(q.calls.length,1);assert.equal(q.mod.report().nativeCombat.animationPlaying,true);
// [VI dòng gốc 285] gán q.c._jh.isPlaying bằng false | gọi q.advance(100) | gọi assert.equal(q.calls.length, 2) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.calls[1], 8001) để kiểm tra hai giá trị bằng nhau
 q.c._jh.isPlaying=false;q.advance(100);assert.equal(q.calls.length,2);assert.equal(q.calls[1],8001);
// [VI dòng gốc 286] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 287] gọi test('three unconfirmed basic results suspend interleaving without blocking Tuyet Hoc or mixing rejected hit evidence', ()=>{…)
test('three unconfirmed basic results suspend interleaving without blocking Tuyet Hoc or mixing rejected hit evidence',()=>{
// [VI dòng gốc 288] Khai báo biến không gán lại bằng const: q = gọi harness() | gọi q.mod.setInterleaved(true, 302) để bật/tắt bộ chọn xen đòn thường và đặt khoảng cách mục tiêu | gọi q.mod.start('SCAN') để khởi động bộ điều khiển | gọi q.pump()
 const q=harness();q.mod.setInterleaved(true,302);q.mod.start('SCAN');q.pump();
// [VI dòng gốc 289] Lặp for: khởi tạo let i=0; tiếp tục khi i<3; sau mỗi vòng i++. | Khai báo biến có thể gán lại bằng let: i = 0 | gọi q.c.combat(8001) | gọi q.advance(3501)
 for(let i=0;i<3;i++){q.c.combat(8001);q.advance(3501);}
// [VI dòng gốc 290] Khai báo biến có thể gán lại bằng let: r = gọi q.mod.report() | gọi assert.equal(r.interleaved.basicSuspended, true) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(r.interleaved.basicUnconfirmed, 3) để kiểm tra hai giá trị bằng nhau
 let r=q.mod.report();assert.equal(r.interleaved.basicSuspended,true);assert.equal(r.interleaved.basicUnconfirmed,3);
// [VI dòng gốc 291] Khai báo biến không gán lại bằng const: count = đọc q.calls.length | gọi q.c.combat(8001) | gọi assert.equal(q.calls.length, count) để kiểm tra hai giá trị bằng nhau
 const count=q.calls.length;q.c.combat(8001);assert.equal(q.calls.length,count);
// [VI dòng gốc 292] gọi q.c.combat(1001) | gọi assert.equal(q.calls.at(-1), 1001) để kiểm tra hai giá trị bằng nhau
 q.c.combat(1001);assert.equal(q.calls.at(-1),1001);
// [VI dòng gốc 293] gọi q.events[1012]('other', 10010000, 10, 1, 'boss1')
 q.events[1012]('other',10010000,10,1,'boss1');
// [VI dòng gốc 294] gọi q.events[1012]('10228867268946', 10010000, 10, 4, 'boss1')
 q.events[1012]('10228867268946',10010000,10,4,'boss1');
// [VI dòng gốc 295] gọi q.events[1012]('10228867268946', 1001, 10, 1, 'boss1')
 q.events[1012]('10228867268946',1001,10,1,'boss1');
// [VI dòng gốc 296] gọi q.events[1012]('10228867268946', 10010000, 10, 1, 'boss1')
 q.events[1012]('10228867268946',10010000,10,1,'boss1');
// [VI dòng gốc 297] gán r bằng q.mod.report() | gọi assert.equal(r.confirmedCastHitPairs, 1) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(r.hitDiagnostics.accepted, 1) để kiểm tra hai giá trị bằng nhau
 r=q.mod.report();assert.equal(r.confirmedCastHitPairs,1);assert.equal(r.hitDiagnostics.accepted,1);
// [VI dòng gốc 298] gọi assert.equal(r.hitDiagnostics.rejected.foreign_source, 1) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(r.hitDiagnostics.rejected.auxiliary_flags, 1) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(r.hitDiagnostics.rejected.unsupported_marker, 1) để kiểm tra hai giá trị bằng nhau
 assert.equal(r.hitDiagnostics.rejected.foreign_source,1);assert.equal(r.hitDiagnostics.rejected.auxiliary_flags,1);assert.equal(r.hitDiagnostics.rejected.unsupported_marker,1);
// [VI dòng gốc 299] gán r.hitDiagnostics.rejected.foreign_source bằng 99 | gọi assert.equal(q.mod.report().hitDiagnostics.rejected.foreign_source, 1) để kiểm tra hai giá trị bằng nhau
 r.hitDiagnostics.rejected.foreign_source=99;assert.equal(q.mod.report().hitDiagnostics.rejected.foreign_source,1);
// [VI dòng gốc 300] gọi q.occ(1000) | gọi q.pump() | gọi assert.equal(q.mod.report().interleaved.basicSuspended, false) để kiểm tra hai giá trị bằng nhau
 q.occ(1000);q.pump();assert.equal(q.mod.report().interleaved.basicSuspended,false);
// [VI dòng gốc 301] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 302] gọi test('primary basic repeats across three dungeons with native skill readiness and recovery gates', ()=>{ for(const scope of […)
test('suspended basics release confirmed-hit quota for Tuyet Hoc in all far dungeons',()=>{
 for(const scope of [{},{tower:true},{rune:true}]){
  const q=harness({...scope,fastReady:true});
  q.mod.setInterleaved(true,302);q.mod.setPrimaryBasic(true);q.mod.setBasicHitQuota(1);q.mod.start('SCAN');q.pump();
  for(let i=0;i<3;i++)q.advance(3501);
  assert.equal(q.mod.report().interleaved.basicSuspended,true);
  assert(q.calls.some(id=>id>=1001&&id<=1008),'Tuyet Hoc must continue when basic hit confirmation is suspended');
  const count=q.calls.length;q.phase('RETREAT');q.advance(500);assert.equal(q.calls.length,count);
  q.mod.stop();
 }
});

test('primary basic repeats across three dungeons with native skill readiness and recovery gates',()=>{
// [VI dòng gốc 303] Duyệt từng giá trị trong [{},{tower:true},{rune:true}] bằng const scope. | Khai báo biến không gán lại bằng const: scope (chưa gán giá trị)
 for(const scope of [{},{tower:true},{rune:true}]){
// [VI dòng gốc 304] Khai báo biến không gán lại bằng const: q = gọi harness({...scope,fastReady:true}) | gọi q.s._rtt.push([8002,0,50]) để thêm phần tử vào cuối mảng | gán q.s._rtt[0][2] bằng 200
  const q=harness({...scope,fastReady:true});q.s._rtt.push([8002,0,50]);q.s._rtt[0][2]=200;
// [VI dòng gốc 305] gọi q.mod.setInterleaved(true, 302) để bật/tắt bộ chọn xen đòn thường và đặt khoảng cách mục tiêu | gọi q.mod.setPrimaryBasic(true) để bật/tắt ưu tiên kỹ năng đánh thường đã chọn | gọi q.mod.start('SCAN') để khởi động bộ điều khiển | gọi q.pump()
  q.mod.setInterleaved(true,302);q.mod.setPrimaryBasic(true);q.mod.start('SCAN');q.pump();
// [VI dòng gốc 306] gọi assert.equal(q.calls[0], 8001) để kiểm tra hai giá trị bằng nhau | Khai báo biến không gán lại bằng const: ready = đọc q.s._rtt[0][1]
  assert.equal(q.calls[0],8001);const ready=q.s._rtt[0][1];
// [VI dòng gốc 307] gọi q.events[1012]('10228867268946', 80010000, 10, 1, 'boss1')
  q.events[1012]('10228867268946',80010000,10,1,'boss1');
// [VI dòng gốc 308] gọi q.advance(75) | gọi assert.equal(q.calls.at(-1), 1001) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.s._rtt[0][1], ready, 'basic not rewritten to 1ms') để kiểm tra hai giá trị bằng nhau
  q.advance(75);assert.equal(q.calls.at(-1),1001);assert.equal(q.s._rtt[0][1],ready,'basic not rewritten to 1ms');
// [VI dòng gốc 309] gọi q.advance(150) | gọi assert.equal(q.calls.at(-1), 8001) để kiểm tra hai giá trị bằng nhau | gọi assert(!q.calls.includes(8002)) để kiểm tra điều kiện của bài test
  q.advance(150);assert.equal(q.calls.at(-1),8001);assert(!q.calls.includes(8002));
// [VI dòng gốc 310] gọi q.events[1012]('10228867268946', 80010000, 10, 1, 'boss1') | gọi assert.equal(q.mod.report().interleaved.basicConfirmedHits, 2) để kiểm tra hai giá trị bằng nhau
  q.events[1012]('10228867268946',80010000,10,1,'boss1');assert.equal(q.mod.report().interleaved.basicConfirmedHits,2);
// [VI dòng gốc 311] Khai báo biến không gán lại bằng const: count = đọc q.calls.length | gọi q.phase('RETREAT') | gọi q.advance(100) | gọi assert.equal(q.calls.length, count) để kiểm tra hai giá trị bằng nhau
  const count=q.calls.length;q.phase('RETREAT');q.advance(100);assert.equal(q.calls.length,count);
// [VI dòng gốc 312] gọi q.hp(100) | gọi q.phase('FIGHT') | gọi q.cooldown(true) | gọi q.advance(100)
  q.hp(100);q.phase('FIGHT');q.cooldown(true);q.advance(100);assert.equal(q.calls.length,count);
// [VI dòng gốc 313] gọi q.mod.stop() để dừng bộ điều khiển và dọn tài nguyên
  q.mod.stop();
// [VI dòng gốc 314] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
 }
// [VI dòng gốc 315] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 316] gọi test('primary-basic 1ms client trial preserves original skill rows and native combat gate', ()=>{ for(const scope of [{},{tow…)
test('primary-basic 1ms client trial preserves original skill rows and native combat gate',()=>{
// [VI dòng gốc 317] Duyệt từng giá trị trong [{},{tower:true},{rune:true}] bằng const scope. | Khai báo biến không gán lại bằng const: scope (chưa gán giá trị)
 for(const scope of [{},{tower:true},{rune:true}]){
// [VI dòng gốc 318] Khai báo biến không gán lại bằng const: q = gọi harness({...scope,fastReady:true}) | gán q.s._rtt[0][2] bằng 2000
  const q=harness({...scope,fastReady:true});q.s._rtt[0][2]=2000;
// [VI dòng gốc 319] gọi q.mod.setInterleaved(true, 302) để bật/tắt bộ chọn xen đòn thường và đặt khoảng cách mục tiêu | gọi q.mod.setBasicPace(1) để đặt khoảng chờ thêm phía client cho đòn tay; 0 nghĩa là không thêm thời gian chờ | gọi q.mod.setPrimaryBasic(true) để bật/tắt ưu tiên kỹ năng đánh thường đã chọn | gọi q.mod.start('SCAN') để khởi động bộ điều khiển
  q.mod.setInterleaved(true,302);q.mod.setBasicPace(1);q.mod.setPrimaryBasic(true);q.mod.start('SCAN');q.pump();
// [VI dòng gốc 320] gọi assert.equal(q.calls[0], 8001) để kiểm tra hai giá trị bằng nhau | gọi q.events[1012]('10228867268946', 80010000, 10, 1, 'boss1')
  assert.equal(q.calls[0],8001);q.events[1012]('10228867268946',80010000,10,1,'boss1');
// [VI dòng gốc 321] gọi q.advance(2) | gọi assert.deepEqual(q.calls, [8001,8001]) để kiểm tra cấu trúc hai giá trị tương đương | gọi assert.equal(q.s._rtt[0][1], 0) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.s._rtt[0][2], 2000) để kiểm tra hai giá trị bằng nhau
  q.advance(2);assert.deepEqual(q.calls,[8001,8001]);assert.equal(q.s._rtt[0][1],0);assert.equal(q.s._rtt[0][2],2000);
// [VI dòng gốc 322] gọi q.cooldown(true) | Khai báo biến không gán lại bằng const: count = đọc q.calls.length | gọi q.advance(100) | gọi assert.equal(q.calls.length, count) để kiểm tra hai giá trị bằng nhau
  q.cooldown(true);const count=q.calls.length;q.advance(100);assert.equal(q.calls.length,count);
// [VI dòng gốc 323] gọi assert.equal(q.mod.report().primaryBasicClientWaitMs, 1) để kiểm tra hai giá trị bằng nhau | gọi q.mod.stop() để dừng bộ điều khiển và dọn tài nguyên
  assert.equal(q.mod.report().primaryBasicClientWaitMs,1);q.mod.stop();
// [VI dòng gốc 324] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
 }
// [VI dòng gốc 325] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 326] gọi test('bounded basic range test measures each learned remaining skill then restores primary basic', ()=>{ const q=harness({fas…)
test('bounded basic range test measures each learned remaining skill then restores primary basic',()=>{
// [VI dòng gốc 327] Khai báo biến không gán lại bằng const: q = gọi harness({fastReady:true}) | gọi q.s._rtt.push([8003,0,50], [8004,0,50]) để thêm phần tử vào cuối mảng
 const q=harness({fastReady:true});q.s._rtt.push([8003,0,50],[8004,0,50]);
// [VI dòng gốc 328] gọi q.mod.setInterleaved(true, 302) để bật/tắt bộ chọn xen đòn thường và đặt khoảng cách mục tiêu | gọi q.mod.setBasicPace(1) để đặt khoảng chờ thêm phía client cho đòn tay; 0 nghĩa là không thêm thời gian chờ | gọi q.mod.setPrimaryBasic(true) để bật/tắt ưu tiên kỹ năng đánh thường đã chọn
 q.mod.setInterleaved(true,302);q.mod.setBasicPace(1);q.mod.setPrimaryBasic(true);
// [VI dòng gốc 329] Khai báo biến không gán lại bằng const: probe = gọi q.mod.startBasicRangeTest() | gọi q.mod.start('SCAN') để khởi động bộ điều khiển | gọi q.pump()
 const probe=q.mod.startBasicRangeTest();q.mod.start('SCAN');q.pump();
// [VI dòng gốc 330] Duyệt từng giá trị trong [8003,8004] bằng const id. | Khai báo biến không gán lại bằng const: id (chưa gán giá trị) | Lặp for: khởi tạo let n=0; tiếp tục khi n<2; sau mỗi vòng n++. | Khai báo biến có thể gán lại bằng let: n = 0
 for(const id of [8003,8004])for(let n=0;n<2;n++){
// [VI dòng gốc 331] gọi assert.equal(q.calls.at(-1), id) để kiểm tra hai giá trị bằng nhau | gọi q.events[1012]('10228867268946', id*10000, 10, 1, 'boss1') | gọi q.advance(100)
  assert.equal(q.calls.at(-1),id);q.events[1012]('10228867268946',id*10000,10,1,'boss1');q.advance(100);
// [VI dòng gốc 332] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
 }
// [VI dòng gốc 333] gọi assert.equal(probe.status, 'complete') để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.mod.report().primaryBasicSkillId, 8001) để kiểm tra hai giá trị bằng nhau
 assert.equal(probe.status,'complete');assert.equal(q.mod.report().primaryBasicSkillId,8001);
// [VI dòng gốc 334] Duyệt từng giá trị trong probe.rows bằng const row. | Khai báo biến không gán lại bằng const: row (chưa gán giá trị) | gọi assert.equal(row.attempts.length, 2) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(row.hits.length, 2) để kiểm tra hai giá trị bằng nhau
 for(const row of probe.rows){assert.equal(row.attempts.length,2);assert.equal(row.hits.length,2);assert(row.hits.every(h=>h.castDistance>300&&h.hitDistance>300));}
// [VI dòng gốc 335] gọi assert.equal(q.mod.startBasicRangeTest(), probe, 'one request per tab, no automatic replay') để kiểm tra hai giá trị bằng nhau | gọi q.mod.stop() để dừng bộ điều khiển và dọn tài nguyên
 assert.equal(q.mod.startBasicRangeTest(),probe,'one request per tab, no automatic replay');q.mod.stop();
// [VI dòng gốc 336] Khai báo biến không gán lại bằng const: r = gọi harness({fastReady:true}) | gọi r.s._rtt.push([8003,0,50]) để thêm phần tử vào cuối mảng | gọi r.mod.setInterleaved(true, 302) để bật/tắt bộ chọn xen đòn thường và đặt khoảng cách mục tiêu | gọi r.mod.setPrimaryBasic(true) để bật/tắt ưu tiên kỹ năng đánh thường đã chọn
 const r=harness({fastReady:true});r.s._rtt.push([8003,0,50]);r.mod.setInterleaved(true,302);r.mod.setPrimaryBasic(true);const timeout=r.mod.startBasicRangeTest();r.mod.start('SCAN');r.phase('RETREAT');r.advance(60001);assert.equal(timeout.status,'timeout');assert.equal(r.mod.report().primaryBasicSkillId,8001);r.mod.stop();
// [VI dòng gốc 337] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 338] gọi test('8002 is excluded in three dungeons including native finish and restored on release', ()=>{ for(const scope of [{},{towe…)
test('8002 is excluded in three dungeons including native finish and restored on release',()=>{
// [VI dòng gốc 339] Duyệt từng giá trị trong [{},{tower:true},{rune:true}] bằng const scope. | Khai báo biến không gán lại bằng const: scope (chưa gán giá trị)
 for(const scope of [{},{tower:true},{rune:true}]){
// [VI dòng gốc 340] Khai báo biến không gán lại bằng const: q = gọi harness({...scope,bossHp:[20,1000]}) | gọi q.s._rtt.unshift([8002,0,50])
  const q=harness({...scope,bossHp:[20,1000]});q.s._rtt.unshift([8002,0,50]);
// [VI dòng gốc 341] gọi q.mod.setInterleaved(true, 302) để bật/tắt bộ chọn xen đòn thường và đặt khoảng cách mục tiêu | gọi q.mod.start('SCAN') để khởi động bộ điều khiển | gọi q.pump()
  q.mod.setInterleaved(true,302);q.mod.start('SCAN');q.pump();
// [VI dòng gốc 342] gọi assert.notEqual(q.s.selectSkill(), 8002) | gọi q.c.combat(8002) | gọi assert(!q.calls.includes(8002)) để kiểm tra điều kiện của bài test
  assert.notEqual(q.s.selectSkill(),8002);q.c.combat(8002);assert(!q.calls.includes(8002));
// [VI dòng gốc 343] gọi assert.deepEqual(Array.from(q.mod.report().excludedBasicSkillIds), [8002]) để kiểm tra cấu trúc hai giá trị tương đương
  assert.deepEqual(Array.from(q.mod.report().excludedBasicSkillIds),[8002]);
// [VI dòng gốc 344] gọi q.c.combat(8001) | gọi assert(q.calls.includes(8001)) để kiểm tra điều kiện của bài test | gọi q.mod.stop() để dừng bộ điều khiển và dọn tài nguyên | gọi q.c.combat(8002)
  q.c.combat(8001);assert(q.calls.includes(8001));q.mod.stop();q.c.combat(8002);assert.equal(q.calls.at(-1),8002);
// [VI dòng gốc 345] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
 }
// [VI dòng gốc 346] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 347] gọi test('primary combo gives every fourth ready cast to Tuyet Hoc across all three dungeons', ()=>{ for(const scope of [{},{towe…)
test('primary combo gives every fourth ready cast to Tuyet Hoc across all three dungeons',()=>{
// [VI dòng gốc 348] Duyệt từng giá trị trong [{},{tower:true},{rune:true}] bằng const scope. | Khai báo biến không gán lại bằng const: scope (chưa gán giá trị)
 for(const scope of [{},{tower:true},{rune:true}]){
// [VI dòng gốc 349] Khai báo biến không gán lại bằng const: q = gọi harness({...scope,fastReady:true}) | gọi q.mod.setInterleaved(true, 302) để bật/tắt bộ chọn xen đòn thường và đặt khoảng cách mục tiêu | gọi q.mod.setBasicPace(1) để đặt khoảng chờ thêm phía client cho đòn tay; 0 nghĩa là không thêm thời gian chờ | gọi q.mod.setPrimaryBasic(true) để bật/tắt ưu tiên kỹ năng đánh thường đã chọn
  const q=harness({...scope,fastReady:true});q.mod.setInterleaved(true,302);q.mod.setBasicPace(1);q.mod.setPrimaryBasic(true);q.mod.start('SCAN');q.pump();
// [VI dòng gốc 350] Lặp for: khởi tạo let i=0; tiếp tục khi i<7; sau mỗi vòng i++. | Khai báo biến có thể gán lại bằng let: i = 0 | Khai báo biến không gán lại bằng const: id = gọi q.calls.at(-1) | gọi q.events[1012]('10228867268946', id*10000, 10, 1, 'boss1')
  for(let i=0;i<7;i++){const id=q.calls.at(-1);q.events[1012]('10228867268946',id*10000,10,1,'boss1');q.advance(350);}
// [VI dòng gốc 351] gọi assert.deepEqual(q.calls, [8001,8001,8001,1001,8001,8001,8001,1002]) để kiểm tra cấu trúc hai giá trị tương đương | gọi q.mod.stop() để dừng bộ điều khiển và dọn tài nguyên
  assert.deepEqual(q.calls,[8001,8001,8001,1001,8001,8001,8001,1002]);q.mod.stop();
// [VI dòng gốc 352] Khai báo biến không gán lại bằng const: r = gọi harness({...scope,fastReady:true}) | gán r.s._rtt[1][1] bằng Date.now()+100000 | gán r.s._rtt[2][1] bằng Date.now()+100000
  const r=harness({...scope,fastReady:true});r.s._rtt[1][1]=Date.now()+100000;r.s._rtt[2][1]=Date.now()+100000;
// [VI dòng gốc 353] gọi r.mod.setInterleaved(true, 302) để bật/tắt bộ chọn xen đòn thường và đặt khoảng cách mục tiêu | gọi r.mod.setBasicPace(1) để đặt khoảng chờ thêm phía client cho đòn tay; 0 nghĩa là không thêm thời gian chờ | gọi r.mod.setPrimaryBasic(true) để bật/tắt ưu tiên kỹ năng đánh thường đã chọn | gọi r.mod.start('SCAN') để khởi động bộ điều khiển
  r.mod.setInterleaved(true,302);r.mod.setBasicPace(1);r.mod.setPrimaryBasic(true);r.mod.start('SCAN');r.pump();
// [VI dòng gốc 354] Lặp for: khởi tạo let i=0; tiếp tục khi i<5; sau mỗi vòng i++. | Khai báo biến có thể gán lại bằng let: i = 0 | gọi r.events[1012]('10228867268946', 80010000, 10, 1, 'boss1') | gọi r.advance(350)
  for(let i=0;i<5;i++){r.events[1012]('10228867268946',80010000,10,1,'boss1');r.advance(350);}
// [VI dòng gốc 355] gọi assert.equal(r.calls.length, 6) để kiểm tra hai giá trị bằng nhau | gọi assert(r.calls.every(id=>id===8001), 'keep fighting when Tuyet Hoc is cooling down') để kiểm tra điều kiện của bài test | gọi r.mod.stop() để dừng bộ điều khiển và dọn tài nguyên
  assert.equal(r.calls.length,6);assert(r.calls.every(id=>id===8001),'keep fighting when Tuyet Hoc is cooling down');r.mod.stop();
// [VI dòng gốc 356] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
 }
// [VI dòng gốc 357] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 358] gọi test('four-basic rotation excludes 8002 and interleaves Tuyet Hoc across three dungeons', ()=>{ for(const scope of [{},{tower…)
test('four-basic rotation excludes 8002 and interleaves Tuyet Hoc across three dungeons',()=>{
// [VI dòng gốc 359] Duyệt từng giá trị trong [{},{tower:true},{rune:true}] bằng const scope. | Khai báo biến không gán lại bằng const: scope (chưa gán giá trị)
 for(const scope of [{},{tower:true},{rune:true}]){
// [VI dòng gốc 360] Khai báo biến không gán lại bằng const: q = gọi harness({...scope,fastReady:true}) | gọi q.s._rtt.push([8002,0,50], [8003,0,50], [8004,0,50], [8005,0,50]) để thêm phần tử vào cuối mảng
  const q=harness({...scope,fastReady:true});q.s._rtt.push([8002,0,50],[8003,0,50],[8004,0,50],[8005,0,50]);
// [VI dòng gốc 361] gọi q.mod.setInterleaved(true, 302) để bật/tắt bộ chọn xen đòn thường và đặt khoảng cách mục tiêu | gọi q.mod.setBasicPace(1) để đặt khoảng chờ thêm phía client cho đòn tay; 0 nghĩa là không thêm thời gian chờ | gọi q.mod.setPrimaryBasic(true) để bật/tắt ưu tiên kỹ năng đánh thường đã chọn | gọi q.mod.setBasicRotation([8001,8003,8004,8005]) để chọn danh sách ID đòn thường được phép luân phiên
  q.mod.setInterleaved(true,302);q.mod.setBasicPace(1);q.mod.setPrimaryBasic(true);q.mod.setBasicRotation([8001,8003,8004,8005]);q.mod.start('SCAN');q.pump();
// [VI dòng gốc 362] Lặp for: khởi tạo let i=0; tiếp tục khi i<9; sau mỗi vòng i++. | Khai báo biến có thể gán lại bằng let: i = 0 | Khai báo biến không gán lại bằng const: id = gọi q.calls.at(-1) | gọi q.events[1012]('10228867268946', id*10000, 10, 1, 'boss1')
  for(let i=0;i<9;i++){const id=q.calls.at(-1);q.events[1012]('10228867268946',id*10000,10,1,'boss1');q.advance(350);}
// [VI dòng gốc 363] gọi assert.deepEqual(q.calls, [8001,8003,8004,8005,1001,8001,8003,8004,8005,1002]) để kiểm tra cấu trúc hai giá trị tương đương
  assert.deepEqual(q.calls,[8001,8003,8004,8005,1001,8001,8003,8004,8005,1002]);
// [VI dòng gốc 364] Khai báo biến không gán lại bằng const: count = đọc q.calls.length | gọi q.phase('RETREAT') | gọi q.advance(500) | gọi assert.equal(q.calls.length, count) để kiểm tra hai giá trị bằng nhau
  const count=q.calls.length;q.phase('RETREAT');q.advance(500);assert.equal(q.calls.length,count);
// [VI dòng gốc 365] gọi assert.throws(()=>q.mod.setBasicRotation([8002])) để kiểm tra đoạn mã có ném lỗi như dự kiến | gọi q.mod.stop() để dừng bộ điều khiển và dọn tài nguyên
  assert.throws(()=>q.mod.setBasicRotation([8002]));q.mod.stop();
// [VI dòng gốc 366] Khai báo biến không gán lại bằng const: r = gọi harness({...scope,fastReady:true}) | gọi r.s._rtt.push([8005,0,50]) để thêm phần tử vào cuối mảng | gọi r.mod.setInterleaved(true, 302) để bật/tắt bộ chọn xen đòn thường và đặt khoảng cách mục tiêu | gọi r.mod.setBasicPace(1) để đặt khoảng chờ thêm phía client cho đòn tay; 0 nghĩa là không thêm thời gian chờ
  const r=harness({...scope,fastReady:true});r.s._rtt.push([8005,0,50]);r.mod.setInterleaved(true,302);r.mod.setBasicPace(1);r.mod.setPrimaryBasic(true);r.mod.setBasicRotation([8001,8003,8004,8005]);r.mod.start('SCAN');r.pump();
// [VI dòng gốc 367] Lặp for: khởi tạo let i=0; tiếp tục khi i<2; sau mỗi vòng i++. | Khai báo biến có thể gán lại bằng let: i = 0 | Khai báo biến không gán lại bằng const: id = gọi r.calls.at(-1) | gọi r.events[1012]('10228867268946', id*10000, 10, 1, 'boss1')
  for(let i=0;i<2;i++){const id=r.calls.at(-1);r.events[1012]('10228867268946',id*10000,10,1,'boss1');r.advance(350);}
// [VI dòng gốc 368] gọi assert.deepEqual(r.calls, [8001,8005,1001]) để kiểm tra cấu trúc hai giá trị tương đương | gọi r.mod.stop() để dừng bộ điều khiển và dọn tài nguyên
  assert.deepEqual(r.calls,[8001,8005,1001]);r.mod.stop();
// [VI dòng gốc 369] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
 }
// [VI dòng gốc 370] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 371] gọi test('two-basic configuration uses only 8001 and 8005 plus Tuyet Hoc, including finish phase', ()=>{ for(const scope of [{},{…)
test('two-basic configuration uses only 8001 and 8005 plus Tuyet Hoc, including finish phase',()=>{
// [VI dòng gốc 372] Duyệt từng giá trị trong [{},{tower:true},{rune:true}] bằng const scope. | Khai báo biến không gán lại bằng const: scope (chưa gán giá trị)
 for(const scope of [{},{tower:true},{rune:true}]){
// [VI dòng gốc 373] Khai báo biến không gán lại bằng const: q = gọi harness({...scope,fastReady:true}) | gọi q.s._rtt.push([8002,0,50], [8003,0,50], [8004,0,50], [8005,0,50]) để thêm phần tử vào cuối mảng
  const q=harness({...scope,fastReady:true});q.s._rtt.push([8002,0,50],[8003,0,50],[8004,0,50],[8005,0,50]);
// [VI dòng gốc 374] gọi q.mod.setInterleaved(true, 302) để bật/tắt bộ chọn xen đòn thường và đặt khoảng cách mục tiêu | gọi q.mod.setBasicPace(1) để đặt khoảng chờ thêm phía client cho đòn tay; 0 nghĩa là không thêm thời gian chờ | gọi q.mod.setPrimaryBasic(true) để bật/tắt ưu tiên kỹ năng đánh thường đã chọn | gọi q.mod.setBasicRotation([8001,8005]) để chọn danh sách ID đòn thường được phép luân phiên
  q.mod.setInterleaved(true,302);q.mod.setBasicPace(1);q.mod.setPrimaryBasic(true);q.mod.setBasicRotation([8001,8005]);q.mod.start('SCAN');q.pump();
// [VI dòng gốc 375] Lặp for: khởi tạo let i=0; tiếp tục khi i<5; sau mỗi vòng i++. | Khai báo biến có thể gán lại bằng let: i = 0 | Khai báo biến không gán lại bằng const: id = gọi q.calls.at(-1) | gọi q.events[1012]('10228867268946', id*10000, 10, 1, 'boss1')
  for(let i=0;i<5;i++){const id=q.calls.at(-1);q.events[1012]('10228867268946',id*10000,10,1,'boss1');q.advance(350);}
// [VI dòng gốc 376] gọi assert.deepEqual(q.calls, [8001,8005,1001,8001,8005,1002]) để kiểm tra cấu trúc hai giá trị tương đương | gọi q.mod.stop() để dừng bộ điều khiển và dọn tài nguyên
  assert.deepEqual(q.calls,[8001,8005,1001,8001,8005,1002]);q.mod.stop();
// [VI dòng gốc 377] Khai báo biến không gán lại bằng const: r = gọi harness({...scope,bossHp:[20,1000]}) | gọi r.s._rtt.unshift([8003,0,50], [8004,0,50]) | gọi r.s._rtt.push([8005,0,50]) để thêm phần tử vào cuối mảng
  const r=harness({...scope,bossHp:[20,1000]});r.s._rtt.unshift([8003,0,50],[8004,0,50]);r.s._rtt.push([8005,0,50]);
// [VI dòng gốc 378] gọi r.mod.setInterleaved(true, 302) để bật/tắt bộ chọn xen đòn thường và đặt khoảng cách mục tiêu | gọi r.mod.setPrimaryBasic(true) để bật/tắt ưu tiên kỹ năng đánh thường đã chọn | gọi r.mod.setBasicRotation([8001,8005]) để chọn danh sách ID đòn thường được phép luân phiên | gọi r.mod.start('SCAN') để khởi động bộ điều khiển
  r.mod.setInterleaved(true,302);r.mod.setPrimaryBasic(true);r.mod.setBasicRotation([8001,8005]);r.mod.start('SCAN');r.pump();
// [VI dòng gốc 379] gọi assert(![8002,8003,8004].includes(r.s.selectSkill())) để kiểm tra điều kiện của bài test
  assert(![8002,8003,8004].includes(r.s.selectSkill()));
// [VI dòng gốc 380] Duyệt từng giá trị trong [8002,8003,8004] bằng const id. | Khai báo biến không gán lại bằng const: id (chưa gán giá trị) | gọi r.c.combat(id)
  for(const id of [8002,8003,8004])r.c.combat(id);
// [VI dòng gốc 381] gọi assert(!r.calls.some(id=>[8002,8003,8004].includes(id))) để kiểm tra điều kiện của bài test | gọi r.mod.stop() để dừng bộ điều khiển và dọn tài nguyên
  assert(!r.calls.some(id=>[8002,8003,8004].includes(id)));r.mod.stop();
// [VI dòng gốc 382] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
 }
// [VI dòng gốc 383] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 384] gọi test('bounded tail study cuts only a matched basic hit and still obeys remaining native cooldown', ()=>{ const q=harness({fas…)
test('bounded tail study cuts only a matched basic hit and still obeys remaining native cooldown',()=>{
// [VI dòng gốc 385] Khai báo biến không gán lại bằng const: q = gọi harness({fastReady:true}) | gọi q.s._rtt.push([8005,0,50]) để thêm phần tử vào cuối mảng | Khai báo biến có thể gán lại bằng let: hardLock = false; stops = 0
 const q=harness({fastReady:true});q.s._rtt.push([8005,0,50]);let hardLock=false,stops=0;
// [VI dòng gốc 386] Khai báo biến không gán lại bằng const: cooldown = tạo hàm với tham số (không có); mỗi lần gọi trả về hardLock hoặc dùng vế phải khi vế trái falsy: q.c._jh?.isPlaying===true | gán q.c.isCooldown bằng cooldown
 const cooldown=()=>hardLock||q.c._jh?.isPlaying===true;q.c.isCooldown=cooldown;
// [VI dòng gốc 387] gọi q.mod.setInterleaved(true, 302) để bật/tắt bộ chọn xen đòn thường và đặt khoảng cách mục tiêu | gọi q.mod.setBasicPace(1) để đặt khoảng chờ thêm phía client cho đòn tay; 0 nghĩa là không thêm thời gian chờ | gọi q.mod.setPrimaryBasic(true) để bật/tắt ưu tiên kỹ năng đánh thường đã chọn | gọi q.mod.setBasicRotation([8001,8005]) để chọn danh sách ID đòn thường được phép luân phiên
 q.mod.setInterleaved(true,302);q.mod.setBasicPace(1);q.mod.setPrimaryBasic(true);q.mod.setBasicRotation([8001,8005]);
// [VI dòng gốc 388] Khai báo biến không gán lại bằng const: study = gọi q.mod.startConfirmedTailStudy() | gọi q.mod.start('SCAN') để khởi động bộ điều khiển | gọi q.pump() | gọi assert.equal(q.calls.at(-1), 8001) để kiểm tra hai giá trị bằng nhau
 const study=q.mod.startConfirmedTailStudy();q.mod.start('SCAN');q.pump();assert.equal(q.calls.at(-1),8001);
// [VI dòng gốc 389] Khai báo biến không gán lại bằng const: tween = tạo hàm với tham số (không có); mỗi lần gọi trả về tạo đối tượng gồm isPlaying, stop | gán this.isPlaying bằng false | tăng stops một đơn vị sau khi lấy giá trị | gán q.c._jh bằng tween()
 const tween=()=>({isPlaying:true,stop(){this.isPlaying=false;stops++;}});q.c._jh=tween();
// [VI dòng gốc 390] gọi q.events[1012]('10228867268946', 80010000, 10, 1, 'boss1')
 q.events[1012]('10228867268946',80010000,10,1,'boss1');
// [VI dòng gốc 391] Lặp for: khởi tạo let i=0; tiếp tục khi i<8; sau mỗi vòng i++. | Khai báo biến có thể gán lại bằng let: i = 0 | gọi q.advance(1000)
 for(let i=0;i<8;i++)q.advance(1000);
// [VI dòng gốc 392] gọi assert.equal(study.phase, 'trim') để kiểm tra hai giá trị bằng nhau | gọi assert.equal(stops, 0, 'baseline animation is never cut') để kiểm tra hai giá trị bằng nhau
 assert.equal(study.phase,'trim');assert.equal(stops,0,'baseline animation is never cut');
// [VI dòng gốc 393] gán q.c._jh.isPlaying bằng false | gọi q.advance(100) | gọi assert.equal(q.calls.at(-1), 8005) để kiểm tra hai giá trị bằng nhau | gán q.c._jh bằng tween()
 q.c._jh.isPlaying=false;q.advance(100);assert.equal(q.calls.at(-1),8005);q.c._jh=tween();
// [VI dòng gốc 394] gọi q.advance(100) | gọi assert.equal(stops, 0, 'cast without matching hit cannot cut animation') để kiểm tra hai giá trị bằng nhau
 q.advance(100);assert.equal(stops,0,'cast without matching hit cannot cut animation');
// [VI dòng gốc 395] gọi q.events[1012]('10228867268946', 80050000, 10, 1, 'boss1') | gán hardLock bằng true | Khai báo biến không gán lại bằng const: count = đọc q.calls.length | gọi q.advance(100)
 q.events[1012]('10228867268946',80050000,10,1,'boss1');hardLock=true;const count=q.calls.length;q.advance(100);
// [VI dòng gốc 396] gọi assert.equal(stops, 1) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(study.trim.cuts, 1) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.calls.length, count, 'remaining native cooldown still blocks') để kiểm tra hai giá trị bằng nhau
 assert.equal(stops,1);assert.equal(study.trim.cuts,1);assert.equal(q.calls.length,count,'remaining native cooldown still blocks');
// [VI dòng gốc 397] gọi assert.equal(q.c.isCooldown, cooldown) để kiểm tra hai giá trị bằng nhau | gán hardLock bằng false | gọi q.advance(100) | gọi assert(q.calls.length>count) để kiểm tra điều kiện của bài test
 assert.equal(q.c.isCooldown,cooldown);hardLock=false;q.advance(100);assert(q.calls.length>count);
// [VI dòng gốc 398] gọi q.mod.stop() để dừng bộ điều khiển và dọn tài nguyên | gọi assert.equal(study.status, 'stopped: user') để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.mod.startConfirmedTailStudy(), study, 'no replay') để kiểm tra hai giá trị bằng nhau
 q.mod.stop();assert.equal(study.status,'stopped: user');assert.equal(q.mod.startConfirmedTailStudy(),study,'no replay');
// [VI dòng gốc 399] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 400] gọi test('1ms client pacing and matched-hit tail cutting work across all three dungeons', ()=>{ for(const scope of [{},{tower:tru…)
test('1ms client pacing and matched-hit tail cutting work across all three dungeons',()=>{
// [VI dòng gốc 401] Duyệt từng giá trị trong [{},{tower:true},{rune:true}] bằng const scope. | Khai báo biến không gán lại bằng const: scope (chưa gán giá trị)
 for(const scope of [{},{tower:true},{rune:true}]){
// [VI dòng gốc 402] Khai báo biến không gán lại bằng const: q = gọi harness({...scope,fastReady:true}) | gọi q.s._rtt.push([8005,0,50]) để thêm phần tử vào cuối mảng | Khai báo biến có thể gán lại bằng let: stopped = 0
  const q=harness({...scope,fastReady:true});q.s._rtt.push([8005,0,50]);let stopped=0;
// [VI dòng gốc 403] gán q.c.isCooldown bằng ()=>q.c._jh?.isPlaying===true
  q.c.isCooldown=()=>q.c._jh?.isPlaying===true;
// [VI dòng gốc 404] gọi q.mod.setInterleaved(true, 302) để bật/tắt bộ chọn xen đòn thường và đặt khoảng cách mục tiêu | gọi q.mod.setBasicPace(1) để đặt khoảng chờ thêm phía client cho đòn tay; 0 nghĩa là không thêm thời gian chờ | gọi q.mod.setPrimaryBasic(true) để bật/tắt ưu tiên kỹ năng đánh thường đã chọn | gọi q.mod.setBasicRotation([8001,8005]) để chọn danh sách ID đòn thường được phép luân phiên
  q.mod.setInterleaved(true,302);q.mod.setBasicPace(1);q.mod.setPrimaryBasic(true);q.mod.setBasicRotation([8001,8005]);q.mod.setClientPace(1);q.mod.setConfirmedTailCut(true);q.mod.start('SCAN');q.pump();
// [VI dòng gốc 405] Khai báo biến không gán lại bằng const: tween = tạo hàm với tham số (không có); mỗi lần gọi trả về tạo đối tượng gồm isPlaying, stop | gán this.isPlaying bằng false | tăng stopped một đơn vị sau khi lấy giá trị | gán q.c._jh bằng tween()
  const tween=()=>({isPlaying:true,stop(){this.isPlaying=false;stopped++;}});q.c._jh=tween();q.advance(100);assert.equal(stopped,0);
// [VI dòng gốc 406] gọi q.events[1012]('10228867268946', 80010000, 10, 1, 'boss1') | gọi q.advance(2) | gọi assert.equal(stopped, 1) để kiểm tra hai giá trị bằng nhau | gọi assert.deepEqual(q.calls, [8001,8005]) để kiểm tra cấu trúc hai giá trị tương đương
  q.events[1012]('10228867268946',80010000,10,1,'boss1');q.advance(2);assert.equal(stopped,1);assert.deepEqual(q.calls,[8001,8005]);
// [VI dòng gốc 407] gán q.c._jh bằng tween() | gọi q.events[1012]('10228867268946', 80050000, 10, 1, 'boss1') | gọi q.advance(2) | gọi assert.equal(stopped, 2) để kiểm tra hai giá trị bằng nhau
  q.c._jh=tween();q.events[1012]('10228867268946',80050000,10,1,'boss1');q.advance(2);assert.equal(stopped,2);assert.equal(q.calls.at(-1),1001);
// [VI dòng gốc 408] gán q.c._jh bằng tween() | gọi q.phase('RETREAT') | gọi q.advance(2) | gọi assert.equal(stopped, 2, 'retreat never cuts animation to attack') để kiểm tra hai giá trị bằng nhau
  q.c._jh=tween();q.phase('RETREAT');q.advance(2);assert.equal(stopped,2,'retreat never cuts animation to attack');
// [VI dòng gốc 409] gọi q.phase('FIGHT') | gọi q.advance(2) | gọi assert.equal(stopped, 2, 'Tuyet Hoc animation cannot use an earlier basic hit') để kiểm tra hai giá trị bằng nhau
  q.phase('FIGHT');q.advance(2);assert.equal(stopped,2,'Tuyet Hoc animation cannot use an earlier basic hit');
// [VI dòng gốc 410] gọi assert.equal(q.s._rtt[1][2], 100, 'Tuyet Hoc native skill cooldown is preserved') để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.mod.report().paceMs, 1) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.mod.report().interleaved.scanMs, 8) để kiểm tra hai giá trị bằng nhau | gọi q.mod.stop() để dừng bộ điều khiển và dọn tài nguyên
  assert.equal(q.s._rtt[1][2],100,'Tuyet Hoc native skill cooldown is preserved');assert.equal(q.mod.report().paceMs,1);assert.equal(q.mod.report().interleaved.scanMs,4);q.mod.stop();
// [VI dòng gốc 411] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
 }
// [VI dòng gốc 412] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 413] gọi test('zero added client wait remains bounded by native combat and pending-hit gates', ()=>{ const q=harness({fastReady:true})…)
test('zero added client wait remains bounded by native combat and pending-hit gates',()=>{
// [VI dòng gốc 414] Khai báo biến không gán lại bằng const: q = gọi harness({fastReady:true}) | gọi q.s._rtt.push([8005,0,50]) để thêm phần tử vào cuối mảng | gọi q.mod.setInterleaved(true, 302) để bật/tắt bộ chọn xen đòn thường và đặt khoảng cách mục tiêu | gọi q.mod.setPrimaryBasic(true) để bật/tắt ưu tiên kỹ năng đánh thường đã chọn
 const q=harness({fastReady:true});q.s._rtt.push([8005,0,50]);q.mod.setInterleaved(true,302);q.mod.setPrimaryBasic(true);q.mod.setBasicRotation([8001,8005]);q.mod.setBasicPace(0);q.mod.setClientPace(0);q.mod.start('SCAN');q.pump();
// [VI dòng gốc 415] gọi assert.equal(q.mod.report().paceMs, 0) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.mod.report().interleaved.basicClientWaitMs, 0) để kiểm tra hai giá trị bằng nhau
 assert.equal(q.mod.report().paceMs,0);assert.equal(q.mod.report().interleaved.basicClientWaitMs,0);
// [VI dòng gốc 416] gọi q.cooldown(true) | Khai báo biến không gán lại bằng const: count = đọc q.calls.length | Lặp for: khởi tạo let i=0; tiếp tục khi i<50; sau mỗi vòng i++. | Khai báo biến có thể gán lại bằng let: i = 0
 q.cooldown(true);const count=q.calls.length;for(let i=0;i<50;i++)q.pump();assert.equal(q.calls.length,count);
// [VI dòng gốc 417] gọi q.cooldown(false) | Lặp for: khởi tạo let i=0; tiếp tục khi i<50; sau mỗi vòng i++. | Khai báo biến có thể gán lại bằng let: i = 0 | gọi q.pump()
 q.cooldown(false);for(let i=0;i<50;i++)q.pump();assert(q.calls.filter(id=>id===8001).length<=1,'unconfirmed basic is not replayed');
// [VI dòng gốc 418] gọi assert.throws(()=>q.mod.setClientPace(-1)) để kiểm tra đoạn mã có ném lỗi như dự kiến | gọi assert.throws(()=>q.mod.setBasicPace(-1)) để kiểm tra đoạn mã có ném lỗi như dự kiến | gọi q.mod.stop() để dừng bộ điều khiển và dọn tài nguyên
 assert.throws(()=>q.mod.setClientPace(-1));assert.throws(()=>q.mod.setBasicPace(-1));q.mod.stop();
// [VI dòng gốc 419] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 420] Duyệt từng giá trị trong [{},{tower:true},{rune:true},{tower:true,bossHp:[1,100]}] bằng const scope. | Khai báo biến không gán lại bằng const: scope (chưa gán giá trị) | gọi test('30 confirmed basics then one TH '+JSON.stringify(scope), ()=>{ const q=harness({...scope,fastReady:true});const listene…)
for(const scope of [{},{tower:true},{rune:true},{tower:true,bossHp:[1,100]}])test('30 confirmed basics then one TH '+JSON.stringify(scope),()=>{
// [VI dòng gốc 421] Khai báo biến không gán lại bằng const: q = gọi harness({...scope,fastReady:true}) | Khai báo biến không gán lại bằng const: listeners = tạo đối tượng bằng Map() | Khai báo biến có thể gán lại bằng let: emit = true
 const q=harness({...scope,fastReady:true});const listeners=new Map();let emit=true;
// [VI dòng gốc 422] gán q.actor.on bằng (id,owner,fn)=>listeners.set(id,fn) | gán q.actor.off bằng (id,owner,fn)=>{if(listeners.get(id)===fn)listeners.delete(id);} | Kiểm tra listeners.get(id)===fn: đúng thì chạy nhánh sau if. | gọi listeners.delete(id)
 q.actor.on=(id,owner,fn)=>listeners.set(id,fn);q.actor.off=(id,owner,fn)=>{if(listeners.get(id)===fn)listeners.delete(id);};
// [VI dòng gốc 423] gán q.c.combat bằng function(id){q.calls.push(id);if(emit)listeners.get(1039)?.('boss1',id);} | gọi q.calls.push(id) để thêm phần tử vào cuối mảng | Kiểm tra emit: đúng thì chạy nhánh sau if. | gọi listeners.get(1039)('boss1', id) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
 q.c.combat=function(id){q.calls.push(id);if(emit)listeners.get(1039)?.('boss1',id);};
// [VI dòng gốc 424] gọi q.s._rtt.push([8005,0,50]) để thêm phần tử vào cuối mảng | gọi q.mod.setInterleaved(true, 302) để bật/tắt bộ chọn xen đòn thường và đặt khoảng cách mục tiêu | gọi q.mod.setPrimaryBasic(true) để bật/tắt ưu tiên kỹ năng đánh thường đã chọn | gọi q.mod.setBasicRotation([8001]) để chọn danh sách ID đòn thường được phép luân phiên
 q.s._rtt.push([8005,0,50]);q.mod.setInterleaved(true,302);q.mod.setPrimaryBasic(true);q.mod.setBasicRotation([8001]);q.mod.setBasicPace(0);q.mod.setClientPace(0);q.mod.setBasicHitQuota(30);q.mod.start('SCAN');
// [VI dòng gốc 425] Khai báo biến không gán lại bằng const: finish = đảo giá trị đúng/sai của !scope.bossHp
 const finish=!!scope.bossHp;
// [VI dòng gốc 426] Lặp for: khởi tạo let i=0; tiếp tục khi i<30; sau mỗi vòng i++. | Khai báo biến có thể gán lại bằng let: i = 0
 for(let i=0;i<30;i++){
// [VI dòng gốc 427] Kiểm tra finish: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gọi q.c.combat(8001) | gọi q.pump()
   if(finish)q.c.combat(8001);else q.pump();
// [VI dòng gốc 428] gọi assert.equal(q.calls.at(-1), 8001) để kiểm tra hai giá trị bằng nhau
   assert.equal(q.calls.at(-1),8001);
// [VI dòng gốc 429] gọi q.events[1012]('foreign', 80010000, 10, 1, 'boss1')
   q.events[1012]('foreign',80010000,10,1,'boss1');
// [VI dòng gốc 430] gọi assert.equal(q.mod.report().confirmedSinceTH, i) để kiểm tra hai giá trị bằng nhau
   assert.equal(q.mod.report().confirmedSinceTH,i);
// [VI dòng gốc 431] gọi q.events[1012]('10228867268946', 80010000, 10, 1, 'boss1')
   q.events[1012]('10228867268946',80010000,10,1,'boss1');
// [VI dòng gốc 432] gọi q.events[1012]('10228867268946', 80010000, 10, 1, 'boss1')
   q.events[1012]('10228867268946',80010000,10,1,'boss1');
// [VI dòng gốc 433] gọi assert.equal(q.mod.report().confirmedSinceTH, i+1) để kiểm tra hai giá trị bằng nhau
   assert.equal(q.mod.report().confirmedSinceTH,i+1);
// [VI dòng gốc 434] gọi q.c.combat(8005) | gọi assert(!q.calls.includes(8005)) để kiểm tra điều kiện của bài test
   q.c.combat(8005);assert(!q.calls.includes(8005));
// [VI dòng gốc 435] Kiểm tra i<29: đúng thì chạy nhánh sau if. | gọi q.c.combat(1001) | gọi assert(!q.calls.includes(1001)) để kiểm tra điều kiện của bài test | gọi q.elapse(500)
   if(i<29){q.c.combat(1001);assert(!q.calls.includes(1001));}q.elapse(500);
// [VI dòng gốc 436] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
 }
// [VI dòng gốc 437] gán emit bằng false | gọi q.c.combat(1001) | gọi assert.equal(q.mod.report().confirmedSinceTH, 30) để kiểm tra hai giá trị bằng nhau
 emit=false;q.c.combat(1001);assert.equal(q.mod.report().confirmedSinceTH,30);
// [VI dòng gốc 438] gán emit bằng true | gọi q.elapse(4000) | gọi q.c.combat(1002) | gọi assert.equal(q.calls.at(-1), 1002) để kiểm tra hai giá trị bằng nhau
 emit=true;q.elapse(4000);q.c.combat(1002);assert.equal(q.calls.at(-1),1002);assert.equal(q.mod.report().confirmedSinceTH,0);assert.equal(q.mod.report().thCycles,1);
// [VI dòng gốc 439] gọi q.c.combat(1001) | gọi assert.equal(q.calls.at(-1), 1002) để kiểm tra hai giá trị bằng nhau | gọi q.mod.stop() để dừng bộ điều khiển và dọn tài nguyên
 q.c.combat(1001);assert.equal(q.calls.at(-1),1002);q.mod.stop();
// [VI dòng gốc 440] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 441] gọi test('quota keeps unmatched records without a 3.5 second stall after native recovery', ()=>{ const q=harness({fastReady:true}…)
test('quota keeps unmatched records without a 3.5 second stall after native recovery',()=>{
// [VI dòng gốc 442] Khai báo biến không gán lại bằng const: q = gọi harness({fastReady:true}) | gọi q.mod.setInterleaved(true, 302) để bật/tắt bộ chọn xen đòn thường và đặt khoảng cách mục tiêu | gọi q.mod.setPrimaryBasic(true) để bật/tắt ưu tiên kỹ năng đánh thường đã chọn | gọi q.mod.setBasicRotation([8001]) để chọn danh sách ID đòn thường được phép luân phiên
 const q=harness({fastReady:true});q.mod.setInterleaved(true,302);q.mod.setPrimaryBasic(true);q.mod.setBasicRotation([8001]);q.mod.setBasicHitQuota(30);q.mod.setBasicPace(0);q.mod.setClientPace(0);q.mod.start('SCAN');q.pump();assert.equal(q.calls.length,1);
// [VI dòng gốc 443] gọi q.advance(499) | gọi assert.equal(q.calls.length, 1) để kiểm tra hai giá trị bằng nhau | gọi q.cooldown(true) | gọi q.advance(1)
 q.advance(499);assert.equal(q.calls.length,1);q.cooldown(true);q.advance(1);assert.equal(q.calls.length,1);
// [VI dòng gốc 444] gọi q.cooldown(false) | gán q.c._jh bằng {isPlaying:true} | gọi q.advance(1) | gọi assert.equal(q.calls.length, 1) để kiểm tra hai giá trị bằng nhau
 q.cooldown(false);q.c._jh={isPlaying:true};q.advance(1);assert.equal(q.calls.length,1);
// [VI dòng gốc 445] gán q.c._jh.isPlaying bằng false | gọi q.advance(1) | gọi assert.equal(q.calls.length, 2) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.mod.report().confirmedSinceTH, 0) để kiểm tra hai giá trị bằng nhau
 q.c._jh.isPlaying=false;q.advance(1);assert.equal(q.calls.length,2);assert.equal(q.mod.report().confirmedSinceTH,0);
// [VI dòng gốc 446] gọi q.events[1012]('10228867268946', 80010000, 10, 1, 'boss1') | gọi assert.equal(q.mod.report().confirmedSinceTH, 1) để kiểm tra hai giá trị bằng nhau
 q.events[1012]('10228867268946',80010000,10,1,'boss1');assert.equal(q.mod.report().confirmedSinceTH,1);
// [VI dòng gốc 447] gọi assert(!q.calls.some(id=>id>=1001&&id<=1008)) để kiểm tra điều kiện của bài test | gọi q.mod.stop() để dừng bộ điều khiển và dọn tài nguyên
 assert(!q.calls.some(id=>id>=1001&&id<=1008));q.mod.stop();
// [VI dòng gốc 448] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 449] Duyệt từng giá trị trong [{},{tower:true},{rune:true},{rune:true,bossHp:[1,100]}] bằng const scope. | Khai báo biến không gán lại bằng const: scope (chưa gán giá trị) | gọi test('7 hits then TH with 1ms post TH gate '+JSON.stringify(scope), ()=>{ const q=harness({...scope,fastReady:true});const li…)
for(const scope of [{},{tower:true},{rune:true},{rune:true,bossHp:[1,100]}])test('7 hits then TH with 1ms post TH gate '+JSON.stringify(scope),()=>{
// [VI dòng gốc 450] Khai báo biến không gán lại bằng const: q = gọi harness({...scope,fastReady:true}) | Khai báo biến không gán lại bằng const: listeners = tạo đối tượng bằng Map() | gán q.actor.on bằng (id,owner,fn)=>listeners.set(id,fn) | gán q.actor.off bằng (id,owner,fn)=>{if(listeners.get(id)===fn)listeners.delete(id);}
 const q=harness({...scope,fastReady:true});const listeners=new Map();q.actor.on=(id,owner,fn)=>listeners.set(id,fn);q.actor.off=(id,owner,fn)=>{if(listeners.get(id)===fn)listeners.delete(id);};q.c.combat=function(id){q.calls.push(id);listeners.get(1039)?.('boss1',id);};
// [VI dòng gốc 451] gọi q.mod.setInterleaved(true, 302) để bật/tắt bộ chọn xen đòn thường và đặt khoảng cách mục tiêu | gọi q.mod.setPrimaryBasic(true) để bật/tắt ưu tiên kỹ năng đánh thường đã chọn | gọi q.mod.setBasicRotation([8001]) để chọn danh sách ID đòn thường được phép luân phiên | gọi q.mod.setBasicHitQuota(7) để đặt số đòn thường đã xác nhận trước khi cho Tuyệt Học; chế độ basicOnly vẫn chặn Tuyệt Học
 q.mod.setInterleaved(true,302);q.mod.setPrimaryBasic(true);q.mod.setBasicRotation([8001]);q.mod.setBasicHitQuota(7);q.mod.setAfterTHWait(1);q.mod.setBasicPace(0);q.mod.setClientPace(0);q.mod.start('SCAN');
// [VI dòng gốc 452] gọi q.pump() | Lặp for: khởi tạo let i=0; tiếp tục khi i<7; sau mỗi vòng i++. | Khai báo biến có thể gán lại bằng let: i = 0 | Kiểm tra i>0||!q.calls.length: đúng thì chạy nhánh sau if.
 q.pump();for(let i=0;i<7;i++){if(i>0||!q.calls.length)q.c.combat(8001);q.events[1012]('10228867268946',80010000,10,1,'boss1');if(i<6){q.c.combat(1001);assert(!q.calls.includes(1001));}q.elapse(100);}
// [VI dòng gốc 453] gọi q.c.combat(1001) | gọi assert.equal(q.calls.at(-1), 1001) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.mod.report().confirmedSinceTH, 0) để kiểm tra hai giá trị bằng nhau | Khai báo biến không gán lại bằng const: n = đọc q.calls.length
 q.c.combat(1001);assert.equal(q.calls.at(-1),1001);assert.equal(q.mod.report().confirmedSinceTH,0);const n=q.calls.length;
// [VI dòng gốc 454] gọi assert.equal(q.s.selectSkill(), -1) để kiểm tra hai giá trị bằng nhau | gọi q.c.combat(8001) | gọi assert.equal(q.calls.length, n) để kiểm tra hai giá trị bằng nhau
 assert.equal(q.s.selectSkill(),-1);q.c.combat(8001);assert.equal(q.calls.length,n);
// [VI dòng gốc 455] gọi q.elapse(1) | gọi q.c.combat(8001) | gọi assert.equal(q.calls.length, n+1) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.calls.at(-1), 8001) để kiểm tra hai giá trị bằng nhau
 q.elapse(1);q.c.combat(8001);assert.equal(q.calls.length,n+1);assert.equal(q.calls.at(-1),8001);q.mod.stop();
// [VI dòng gốc 456] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 457] gọi console.log('PASSED', passed, '/78') | Kiểm tra passed!==78: đúng thì chạy nhánh sau if. | gán process.exitCode bằng 1
console.log('PASSED',passed,'/83');if(passed!==83)process.exitCode=1;
// [VI dòng gốc 458] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 459] gọi test('native dispatch distinguishes silent calls from actual actor signals and detaches on stop', ()=>{ const q=harness({fast…)
test('native dispatch distinguishes silent calls from actual actor signals and detaches on stop',()=>{
// [VI dòng gốc 460] Khai báo biến không gán lại bằng const: q = gọi harness({fastReady:true}); listeners = tạo đối tượng bằng Map()
 const q=harness({fastReady:true}),listeners=new Map();
// [VI dòng gốc 461] gán q.actor.on bằng (id,owner,fn)=>listeners.set(id,fn) | gán q.actor.off bằng (id,owner,fn)=>{if(listeners.get(id)===fn)listeners.delete(id);} | Kiểm tra listeners.get(id)===fn: đúng thì chạy nhánh sau if. | gọi listeners.delete(id)
 q.actor.on=(id,owner,fn)=>listeners.set(id,fn);q.actor.off=(id,owner,fn)=>{if(listeners.get(id)===fn)listeners.delete(id);};
// [VI dòng gốc 462] gán q.c.combat bằng function(id){q.calls.push(id);if(id===1001)listeners.get(1039)?.('boss1',id);} | gọi q.calls.push(id) để thêm phần tử vào cuối mảng | Kiểm tra id===1001: đúng thì chạy nhánh sau if. | gọi listeners.get(1039)('boss1', id) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
 q.c.combat=function(id){q.calls.push(id);if(id===1001)listeners.get(1039)?.('boss1',id);};
// [VI dòng gốc 463] gọi q.mod.start('SCAN') để khởi động bộ điều khiển | Khai báo biến có thể gán lại bằng let: d = đọc q.mod.report().nativeCombat.dispatch | gọi assert.equal(d.observed, true) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(d.signals, 1) để kiểm tra hai giá trị bằng nhau
 q.mod.start('SCAN');let d=q.mod.report().nativeCombat.dispatch;assert.equal(d.observed,true);assert.equal(d.signals,1);
// [VI dòng gốc 464] gọi q.advance(4000) | gọi q.c.combat(1002) | gán d bằng q.mod.report().nativeCombat.dispatch | gọi assert(d.silent>=1) để kiểm tra điều kiện của bài test
 q.advance(4000);q.c.combat(1002);d=q.mod.report().nativeCombat.dispatch;assert(d.silent>=1);assert.equal(d.recent.at(-1).signaled,false);
// [VI dòng gốc 465] gọi q.mod.stop() để dừng bộ điều khiển và dọn tài nguyên | gọi assert.equal(listeners.has(1039), false) để kiểm tra hai giá trị bằng nhau
 q.mod.stop();assert.equal(listeners.has(1039),false);
// [VI dòng gốc 466] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 467] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 468] gọi test('native path stalled at 307.35 releases positioning after stable arrival, keeps goal 302', ()=>{ const q=harness({newDef…)
test('native path stalled at 307.35 releases positioning after stable arrival, keeps goal 302',()=>{
// [VI dòng gốc 469] Khai báo biến không gán lại bằng const: q = gọi harness({newDefault:true,defaultDistance:true,startX:307.35,fastReady:true})
 const q=harness({newDefault:true,defaultDistance:true,startX:307.35,fastReady:true});
// [VI dòng gốc 470] gán q.m.moveTo bằng ()=>{} | gán q.m.running bằng ()=>true | gọi q.mod.start('SCAN') để khởi động bộ điều khiển
 q.m.moveTo=()=>{};q.m.running=()=>true;q.mod.start('SCAN');
// [VI dòng gốc 471] gọi assert.equal(q.calls.length, 0) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.mod.report().positioning, true) để kiểm tra hai giá trị bằng nhau
 assert.equal(q.calls.length,0);assert.equal(q.mod.report().positioning,true);
// [VI dòng gốc 472] gọi q.advance(500) | gọi assert.equal(q.calls.length, 0) để kiểm tra hai giá trị bằng nhau | gọi q.advance(1100)
 q.advance(500);assert.equal(q.calls.length,0);q.advance(1100);
// [VI dòng gốc 473] Khai báo biến có thể gán lại bằng let: r = gọi q.mod.report() | gọi assert.equal(r.goalDistance, 302) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(r.nativeArrivalSnap, true) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(r.positioning, false) để kiểm tra hai giá trị bằng nhau
 let r=q.mod.report();assert.equal(r.goalDistance,302);assert.equal(r.nativeArrivalSnap,true);assert.equal(r.positioning,false);assert(q.calls.length>0);
// [VI dòng gốc 474] gọi q.advance(4000) | gọi assert.equal(q.mod.report().positioning, false) để kiểm tra hai giá trị bằng nhau
 q.advance(4000);assert.equal(q.mod.report().positioning,false);
// [VI dòng gốc 475] gán q.actor.coords.x bằng 308.5 | Khai báo biến không gán lại bằng const: n = đọc q.calls.length | gọi q.advance(100) | gọi assert.equal(q.mod.report().nativeArrivalSnap, false) để kiểm tra hai giá trị bằng nhau
 q.actor.coords.x=308.5;const n=q.calls.length;q.advance(100);assert.equal(q.mod.report().nativeArrivalSnap,false);assert.equal(q.calls.length,n);
// [VI dòng gốc 476] gán q.actor.coords.x bằng 300 | gọi q.advance(2000) | gọi assert.equal(q.calls.length, n) để kiểm tra hai giá trị bằng nhau
 q.actor.coords.x=300;q.advance(2000);assert.equal(q.calls.length,n);
// [VI dòng gốc 477] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 478] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 479] gọi test('native actor listener cleared at stage change is reattached before dispatch', ()=>{ const q=harness({fastReady:true}),l…)
test('native actor listener cleared at stage change is reattached before dispatch',()=>{
// [VI dòng gốc 480] Khai báo biến không gán lại bằng const: q = gọi harness({fastReady:true}); listeners = tạo đối tượng bằng Map()
 const q=harness({fastReady:true}),listeners=new Map();
// [VI dòng gốc 481] gán q.actor.on bằng (id,o,fn)=>listeners.set(id,fn) | gán q.actor.off bằng (id,o,fn)=>{if(listeners.get(id)===fn)listeners.delete(id);} | Kiểm tra listeners.get(id)===fn: đúng thì chạy nhánh sau if. | gọi listeners.delete(id)
 q.actor.on=(id,o,fn)=>listeners.set(id,fn);q.actor.off=(id,o,fn)=>{if(listeners.get(id)===fn)listeners.delete(id);};
// [VI dòng gốc 482] gán q.c.combat bằng function(id){listeners.get(1039)?.('boss1',id);} | gọi listeners.get(1039)('boss1', id) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gọi q.mod.start('SCAN') để khởi động bộ điều khiển
 q.c.combat=function(id){listeners.get(1039)?.('boss1',id);};q.mod.start('SCAN');
// [VI dòng gốc 483] gọi listeners.clear() | gọi q.advance(4000) | Khai báo biến không gán lại bằng const: d = đọc q.mod.report().nativeCombat.dispatch
 listeners.clear();q.advance(4000);const d=q.mod.report().nativeCombat.dispatch;
// [VI dòng gốc 484] gọi assert.equal(d.silent, 0) để kiểm tra hai giá trị bằng nhau | gọi assert(d.signals>=2) để kiểm tra điều kiện của bài test
 assert.equal(d.silent,0);assert(d.signals>=2);
// [VI dòng gốc 485] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 486] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 487] gọi test('leftover tagged TH300 combat wrapper is removed before rebind, not nested', ()=>{ const q=harness({fastReady:true,adapt…)
test('leftover tagged TH300 combat wrapper is removed before rebind, not nested',()=>{
// [VI dòng gốc 488] Khai báo biến không gán lại bằng const: q = gọi harness({fastReady:true,adaptive:true}) | gọi q.mod.start('SCAN') để khởi động bộ điều khiển | Khai báo biến không gán lại bằng const: stale = đọc q.c.combat | gọi q.mod.stop() để dừng bộ điều khiển và dọn tài nguyên
 const q=harness({fastReady:true,adaptive:true});q.mod.start('SCAN');const stale=q.c.combat;q.mod.stop();
// [VI dòng gốc 489] gọi Object.defineProperty(q.c, 'combat', {value:stale,writable:true,configurable:true})
 Object.defineProperty(q.c,'combat',{value:stale,writable:true,configurable:true});
// [VI dòng gốc 490] gọi q.advance(4000) | Khai báo biến không gán lại bằng const: n = đọc q.calls.length | gọi q.mod.start('SCAN') để khởi động bộ điều khiển | gọi assert(q.calls.length>n) để kiểm tra điều kiện của bài test
 q.advance(4000);const n=q.calls.length;q.mod.start('SCAN');assert(q.calls.length>n);
// [VI dòng gốc 491] gọi assert(q.mod.history().some(x=>x.type==='HOOK-DEDUP'&&x.data.method==='combat')) để kiểm tra điều kiện của bài test
 assert(q.mod.history().some(x=>x.type==='HOOK-DEDUP'&&x.data.method==='combat'));
// [VI dòng gốc 492] gọi q.mod.stop() để dừng bộ điều khiển và dọn tài nguyên | gọi assert.notEqual(q.c.combat, stale)
 q.mod.stop();assert.notEqual(q.c.combat,stale);
// [VI dòng gốc 493] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 494] gọi test('legacy untagged TH300 combat wrapper migrates to inherited native method', ()=>{ const q=harness({fastReady:true,adapti…)
test('legacy untagged TH300 combat wrapper migrates to inherited native method',()=>{
// [VI dòng gốc 495] Khai báo biến không gán lại bằng const: q = gọi harness({fastReady:true,adaptive:true}) | Khai báo biến không gán lại bằng const: native = đọc q.c.combat
 const q=harness({fastReady:true,adaptive:true});const native=q.c.combat;
// [VI dòng gốc 496] gọi Object.setPrototypeOf(q.c, {combat:native})
 Object.setPrototypeOf(q.c,{combat:native});
// [VI dòng gốc 497] gán q.c.combat bằng function(skillId){if(ST.running&&this===r.c){ST.lastInvocation=Date.now();}throw Error('stale wrapper must not run');} | Kiểm tra ST.running&&this===r.c: đúng thì chạy nhánh sau if. | gán ST.lastInvocation bằng Date.now() | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('stale wrapper must not run')
 q.c.combat=function(skillId){if(ST.running&&this===r.c){ST.lastInvocation=Date.now();}throw Error('stale wrapper must not run');};
// [VI dòng gốc 498] gọi q.mod.start('SCAN') để khởi động bộ điều khiển | gọi assert(q.calls.length>0) để kiểm tra điều kiện của bài test | gọi assert.equal(q.mod.report().lastError, '') để kiểm tra hai giá trị bằng nhau
 q.mod.start('SCAN');assert(q.calls.length>0);assert.equal(q.mod.report().lastError,'');
// [VI dòng gốc 499] gọi q.mod.stop() để dừng bộ điều khiển và dọn tài nguyên | gọi assert.equal(q.c.combat, native) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(Object.hasOwn(q.c,'combat'), false) để kiểm tra hai giá trị bằng nhau
 q.mod.stop();assert.equal(q.c.combat,native);assert.equal(Object.hasOwn(q.c,'combat'),false);
// [VI dòng gốc 500] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 501] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 502] gọi test('confirmed basic hit releases only its animation tail and still obeys native cooldown', ()=>{ const q=harness({fastReady…)
test('confirmed basic hit releases only its animation tail and still obeys native cooldown',()=>{
// [VI dòng gốc 503] Khai báo biến không gán lại bằng const: q = gọi harness({fastReady:true}) | gọi q.mod.setInterleaved(true, 302) để bật/tắt bộ chọn xen đòn thường và đặt khoảng cách mục tiêu | gọi q.mod.setBasicPace(1) để đặt khoảng chờ thêm phía client cho đòn tay; 0 nghĩa là không thêm thời gian chờ | gọi q.mod.start('SCAN') để khởi động bộ điều khiển
 const q=harness({fastReady:true});q.mod.setInterleaved(true,302);q.mod.setBasicPace(1);q.mod.start('SCAN');
// [VI dòng gốc 504] gọi q.advance(100) | gọi assert.equal(q.calls.at(-1), 8001) để kiểm tra hai giá trị bằng nhau | gán q.c._jh bằng {isPlaying:true}
 q.advance(100);q.advance(100);assert.equal(q.calls.at(-1),8001);q.c._jh={isPlaying:true};
// [VI dòng gốc 505] Khai báo biến không gán lại bằng const: n = đọc q.calls.length | gọi q.advance(100) | gọi assert.equal(q.calls.length, n) để kiểm tra hai giá trị bằng nhau
 const n=q.calls.length;q.advance(100);assert.equal(q.calls.length,n);
// [VI dòng gốc 506] gọi q.events[1012]('10228867268946', 80010000, 100, 1, 'boss1') | gọi q.cooldown(true) | gọi q.advance(100) | gọi assert.equal(q.calls.length, n) để kiểm tra hai giá trị bằng nhau
 q.events[1012]('10228867268946',80010000,100,1,'boss1');q.cooldown(true);q.advance(100);assert.equal(q.calls.length,n);
// [VI dòng gốc 507] gọi q.cooldown(false) | gọi q.advance(100) | gọi assert.equal(q.calls.length, n+1) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.mod.report().interleaved.basicTailReleases, 1) để kiểm tra hai giá trị bằng nhau
 q.cooldown(false);q.advance(100);assert.equal(q.calls.length,n+1);assert.equal(q.mod.report().interleaved.basicTailReleases,1);
// [VI dòng gốc 508] gọi q.advance(4000) | gọi assert.equal(q.calls.length, n+1) để kiểm tra hai giá trị bằng nhau
 q.advance(4000);assert.equal(q.calls.length,n+1); // TH tail cannot use prior basic hit
// [VI dòng gốc 509] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 510] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 511] gọi test('native outward path stopping seven units short retries waypoint and casts only above 300', ()=>{ const q=harness({newDe…)
test('native outward path stopping seven units short retries waypoint and casts only above 300',()=>{
// [VI dòng gốc 512] Khai báo biến không gán lại bằng const: q = gọi harness({newDefault:true,defaultDistance:true,startX:295.0254,fastReady:true})
 const q=harness({newDefault:true,defaultDistance:true,startX:295.0254,fastReady:true});
// [VI dòng gốc 513] gán q.m.running bằng ()=>true | gán q.m.moveTo bằng (x,y)=>{q.movements.push([x,y]);const d=Math.hypot(x,y);q.actor.coords.x=x*(d-7)/d;q.actor.coords.y=y*(d-7)/d;} | gọi q.movements.push([x,y]) để thêm phần tử vào cuối mảng | Khai báo biến không gán lại bằng const: d = gọi Math.hypot(x, y)
 q.m.running=()=>true;q.m.moveTo=(x,y)=>{q.movements.push([x,y]);const d=Math.hypot(x,y);q.actor.coords.x=x*(d-7)/d;q.actor.coords.y=y*(d-7)/d;};
// [VI dòng gốc 514] gọi q.mod.start('SCAN') để khởi động bộ điều khiển | gọi assert.equal(q.calls.length, 0) để kiểm tra hai giá trị bằng nhau | gọi q.advance(1900) | gọi q.advance(100)
 q.mod.start('SCAN');assert.equal(q.calls.length,0);q.advance(1900);q.advance(100);
// [VI dòng gốc 515] Khai báo biến không gán lại bằng const: r = gọi q.mod.report() | gọi assert.equal(r.goalDistance, 302) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(r.positioning, false) để kiểm tra hai giá trị bằng nhau | gọi assert(q.actor.coords.x>300) để kiểm tra điều kiện của bài test
 const r=q.mod.report();assert.equal(r.goalDistance,302);assert.equal(r.positioning,false);assert(q.actor.coords.x>300);assert(q.calls.length>0);
// [VI dòng gốc 516] gọi assert(q.mod.history().some(e=>e.type==='POSITION-RETRY')) để kiểm tra điều kiện của bài test
 assert(q.mod.history().some(e=>e.type==='POSITION-RETRY'));
// [VI dòng gốc 517] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 518] gọi test('blocked path retries are bounded, never allows casts at 295, and yields to recovery', ()=>{ const q=harness({newDefault…)
test('outside 310 path short-stop retries with inward native waypoint and no out-of-range cast',()=>{
 const q=harness({newDefault:true,defaultDistance:true,startX:315.57,fastReady:true});
 q.m.running=()=>true;q.m.moveTo=(x,y)=>q.movements.push({x,y});
 q.mod.setInterleaved(true,310);q.mod.start('SCAN');
 for(let i=0;i<7;i++)q.advance(1900);
 assert(q.movements.some(p=>p.x<310),'retry must aim slightly inward when native stops too far away');
 assert.equal(q.calls.length,0,'cannot cast outside range');q.mod.stop();
});
test('blocked path retries are bounded, never allows casts at 295, and yields to recovery',()=>{
// [VI dòng gốc 519] Khai báo biến không gán lại bằng const: q = gọi harness({newDefault:true,defaultDistance:true,startX:295,fastReady:true}) | gán q.m.running bằng ()=>true | gán q.m.moveTo bằng (x,y)=>q.movements.push([x,y])
 const q=harness({newDefault:true,defaultDistance:true,startX:295,fastReady:true});q.m.running=()=>true;q.m.moveTo=(x,y)=>q.movements.push([x,y]);
// [VI dòng gốc 520] gọi q.mod.start('SCAN') để khởi động bộ điều khiển | Lặp for: khởi tạo let i=0; tiếp tục khi i<20&&q.mod.report().lastReason!=='position_stalled_bounded'; sau mỗi vòng i++. | Khai báo biến có thể gán lại bằng let: i = 0 | gọi q.advance(1900)
 q.mod.start('SCAN');for(let i=0;i<20&&q.mod.report().lastReason!=='position_stalled_bounded';i++)q.advance(1900);
// [VI dòng gốc 521] Khai báo biến có thể gán lại bằng let: r = gọi q.mod.report() | gọi assert.equal(r.positionRetries, 6) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.calls.length, 0) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(r.positioning, true) để kiểm tra hai giá trị bằng nhau
 let r=q.mod.report();assert.equal(r.positionRetries,6);assert.equal(q.calls.length,0);assert.equal(r.positioning,true);
// [VI dòng gốc 522] Khai báo biến không gán lại bằng const: stalledMoves = đọc q.movements.length | gọi q.advance(7999) | gọi assert.equal(q.movements.length, stalledMoves, 'bounded pause must not spam movement') để kiểm tra hai giá trị bằng nhau | gọi q.advance(1)
 const stalledMoves=q.movements.length;q.advance(7999);assert.equal(q.movements.length,stalledMoves,'bounded pause must not spam movement');q.advance(1);assert(q.movements.length>stalledMoves,'stationary boss must not freeze recovery forever');assert.equal(q.calls.length,0,'recovery never casts inside 300');
// [VI dòng gốc 523] gọi assert(q.movements.every(([x,y])=>Number.isFinite(x)&&Number.isFinite(y))) để kiểm tra điều kiện của bài test
 assert(q.movements.every(([x,y])=>Number.isFinite(x)&&Number.isFinite(y)));
// [VI dòng gốc 524] gọi q.phase('RETREAT') | Khai báo biến không gán lại bằng const: n = đọc q.movements.length | gọi q.advance(4000) | gọi assert.equal(q.movements.length, n) để kiểm tra hai giá trị bằng nhau
 q.phase('RETREAT');const n=q.movements.length;q.advance(4000);assert.equal(q.movements.length,n);
// [VI dòng gốc 525] gọi q.occ(1000) | gọi q.phase('FIGHT') | gọi q.advance(100) | gọi assert.equal(q.mod.report().positionRetries, 0, 'new Boss resets path retries') để kiểm tra hai giá trị bằng nhau
 q.occ(1000);q.phase('FIGHT');q.advance(100);assert.equal(q.mod.report().positionRetries,0,'new Boss resets path retries');
// [VI dòng gốc 526] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 527] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 528] gọi test('Phu Van shares Tian Quan recovery and resumes interleaving at full HP', ()=>{ const q=harness({rune:true,newDefault:tru…)
test('Phu Van shares Tian Quan recovery and resumes interleaving at full HP',()=>{
// [VI dòng gốc 529] Khai báo biến không gán lại bằng const: q = gọi harness({rune:true,newDefault:true,defaultDistance:true,startX:100,fastReady:true})
 const q=harness({rune:true,newDefault:true,defaultDistance:true,startX:100,fastReady:true});
// [VI dòng gốc 530] gọi q.mod.start('SCAN') để khởi động bộ điều khiển | gọi q.mod.setInterleaved(true, 302) để bật/tắt bộ chọn xen đòn thường và đặt khoảng cách mục tiêu | Khai báo biến không gán lại bằng const: before = đọc q.calls.length | gọi q.hp(1)
 q.mod.start('SCAN');q.mod.setInterleaved(true,302);const before=q.calls.length;q.hp(1);q.phase('RETREAT');q.advance(100);
// [VI dòng gốc 531] gọi assert.equal(q.actor.coords.x, 302) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.calls.length, before) để kiểm tra hai giá trị bằng nhau
 assert.equal(q.actor.coords.x,302);assert.equal(q.calls.length,before);
// [VI dòng gốc 532] gọi assert.equal(q.mod.report().combatOwner, 'HITRUN') để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.mod.report().recoveryEnabled, true) để kiểm tra hai giá trị bằng nhau
 assert.equal(q.mod.report().combatOwner,'HITRUN');assert.equal(q.mod.report().recoveryEnabled,true);
// [VI dòng gốc 533] gọi q.hp(100) | gọi q.phase('FIGHT') | gọi q.advance(100) | gọi assert(q.calls.length>before) để kiểm tra điều kiện của bài test
 q.hp(100);q.phase('FIGHT');q.advance(100);assert(q.calls.length>before);
// [VI dòng gốc 534] gọi q.hp(0) | Khai báo biến không gán lại bằng const: n = đọc q.calls.length | gọi q.advance(100) | gọi q.c.combat(1001)
 q.hp(0);const n=q.calls.length;q.advance(100);q.c.combat(1001);assert.equal(q.calls.length,n);
// [VI dòng gốc 535] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 536] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 537] gọi test('actual outside/far controllers hand off hooks across repeated scope transitions', ()=>{ const q=harness({fastReady:true…)
test('actual outside/far controllers hand off hooks across repeated scope transitions',()=>{
// [VI dòng gốc 538] Khai báo biến không gán lại bằng const: q = gọi harness({fastReady:true}) | Khai báo biến có thể gán lại bằng let: inside = true | gán q.W.KVPV_TQ_SCOPE bằng {inside:()=>inside} | gán q.c.isValidRange bằng ()=>true
 const q=harness({fastReady:true});let inside=true;q.W.KVPV_TQ_SCOPE={inside:()=>inside};q.c.isValidRange=()=>true;
// [VI dòng gốc 539] Khai báo biến không gán lại bằng const: nativeSelector = đọc q.s._f7t; nativeCombat = đọc q.c.combat
 const nativeSelector=q.s._f7t,nativeCombat=q.c.combat;
// [VI dòng gốc 540] gọi q.mod.start('SCAN') để khởi động bộ điều khiển | gọi assert.equal(q.mod.releaseOutsideScope(), false, 'cannot release active far scope') để kiểm tra hai giá trị bằng nhau
 q.mod.start('SCAN');assert.equal(q.mod.releaseOutsideScope(),false,'cannot release active far scope');
// [VI dòng gốc 541] gọi vm.runInNewContext(fs.readFileSync(__dirname+'/src/12-basic-outside.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,''), {window:q…) để chạy mã trong ngữ cảnh máy ảo dùng cho kiểm thử
 vm.runInNewContext(fs.readFileSync(__dirname+'/src/12-basic-outside.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,''),{window:q.W});
// [VI dòng gốc 542] Lặp for: khởi tạo let i=0; tiếp tục khi i<3; sau mỗi vòng i++. | Khai báo biến có thể gán lại bằng let: i = 0
 for(let i=0;i<3;i++){
// [VI dòng gốc 543] gán inside bằng false | gọi q.W.KVPV_BASIC10.sync() | gọi assert.equal(q.W.KVPV_BASIC10.status().active, true) để kiểm tra hai giá trị bằng nhau
  inside=false;q.W.KVPV_BASIC10.sync();assert.equal(q.W.KVPV_BASIC10.status().active,true);
// [VI dòng gốc 544] gọi assert(!q.mod.report().lastError, 'outside controller releases far before wrapping') để kiểm tra điều kiện của bài test
  assert(!q.mod.report().lastError,'outside controller releases far before wrapping');
// [VI dòng gốc 545] gán inside bằng true | gọi q.mod.sync() | gọi assert.equal(q.mod.report().nativeCombat.combatOwned, true) để kiểm tra hai giá trị bằng nhau
  inside=true;q.mod.sync();assert.equal(q.mod.report().nativeCombat.combatOwned,true);
// [VI dòng gốc 546] gọi assert.equal(q.W.KVPV_BASIC10.status().active, false) để kiểm tra hai giá trị bằng nhau | gọi assert(!q.mod.report().lastError) để kiểm tra điều kiện của bài test
  assert.equal(q.W.KVPV_BASIC10.status().active,false);assert(!q.mod.report().lastError);
// [VI dòng gốc 547] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
 }
// [VI dòng gốc 548] gán inside bằng false | gọi q.W.KVPV_BASIC10.sync() | gọi q.W.KVPV_BASIC10.stop() để dừng bộ điều khiển và dọn tài nguyên | gọi q.mod.stop() để dừng bộ điều khiển và dọn tài nguyên
 inside=false;q.W.KVPV_BASIC10.sync();q.W.KVPV_BASIC10.stop();q.mod.stop();
// [VI dòng gốc 549] gọi assert.equal(q.s._f7t, nativeSelector) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.c.combat, nativeCombat, 'no stopped wrapper remains after leaving map') để kiểm tra hai giá trị bằng nhau
 assert.equal(q.s._f7t,nativeSelector);assert.equal(q.c.combat,nativeCombat,'no stopped wrapper remains after leaving map');
// [VI dòng gốc 550] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 551] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 552] gọi test('hot reload tears down outside and far hooks without retaining old wrappers', ()=>{ const q=harness({fastReady:true});le…)
test('hot reload tears down outside and far hooks without retaining old wrappers',()=>{
// [VI dòng gốc 553] Khai báo biến không gán lại bằng const: q = gọi harness({fastReady:true}) | Khai báo biến có thể gán lại bằng let: inside = true | gán q.W.KVPV_TQ_SCOPE bằng {inside:()=>inside} | gán q.c.isValidRange bằng ()=>true
 const q=harness({fastReady:true});let inside=true;q.W.KVPV_TQ_SCOPE={inside:()=>inside};q.c.isValidRange=()=>true;
// [VI dòng gốc 554] Khai báo biến không gán lại bằng const: selector = đọc q.s._f7t; combat = đọc q.c.combat; basicSource = gọi fs.readFileSync(__dirname+'/src/12-basic-outside.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm, '')
 const selector=q.s._f7t,combat=q.c.combat,basicSource=fs.readFileSync(__dirname+'/src/12-basic-outside.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,'');
// [VI dòng gốc 555] Khai báo biến không gán lại bằng const: reloadFar = tạo hàm với tham số (không có); mỗi lần gọi trả về gọi vm.runInNewContext(src, {window:q.W,console:q.W.console}) để chạy mã trong ngữ cảnh máy ảo dùng cho kiểm thử
 const reloadFar=()=>vm.runInNewContext(src,{window:q.W,console:q.W.console});
// [VI dòng gốc 556] Khai báo biến không gán lại bằng const: reloadBasic = tạo hàm với tham số (không có); mỗi lần gọi trả về gọi vm.runInNewContext(basicSource, {window:q.W}) để chạy mã trong ngữ cảnh máy ảo dùng cho kiểm thử
 const reloadBasic=()=>vm.runInNewContext(basicSource,{window:q.W});
// [VI dòng gốc 557] gọi q.mod.start('SCAN') để khởi động bộ điều khiển | gọi reloadBasic()
 q.mod.start('SCAN');reloadBasic();
// [VI dòng gốc 558] Duyệt từng giá trị trong [false,true,false,true] bằng const nextScope. | Khai báo biến không gán lại bằng const: nextScope (chưa gán giá trị)
 for(const nextScope of [false,true,false,true]){
// [VI dòng gốc 559] gán inside bằng nextScope | Kiểm tra !inside: đúng thì chạy nhánh sau if. | gọi q.W.KVPV_BASIC10.sync()
  inside=nextScope;if(!inside)q.W.KVPV_BASIC10.sync();
// [VI dòng gốc 560] gọi reloadFar() | gọi reloadBasic()
  reloadFar();reloadBasic();
// [VI dòng gốc 561] Khai báo biến không gán lại bằng const: current = đọc q.W.KVPV_TH300
  const current=q.W.KVPV_TH300;
// [VI dòng gốc 562] Kiểm tra inside: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gọi current.start('SCAN') để khởi động bộ điều khiển | gọi assert.equal(current.report().nativeCombat.combatOwned, true) để kiểm tra hai giá trị bằng nhau
  if(inside){current.start('SCAN');assert.equal(current.report().nativeCombat.combatOwned,true);}
// [VI dòng gốc 563] gọi q.W.KVPV_BASIC10.sync() | gọi assert.equal(q.W.KVPV_BASIC10.status().active, true) để kiểm tra hai giá trị bằng nhau
  else{q.W.KVPV_BASIC10.sync();assert.equal(q.W.KVPV_BASIC10.status().active,true);}
// [VI dòng gốc 564] gọi assert.equal(current.report().lastError, '') để kiểm tra hai giá trị bằng nhau
  assert.equal(current.report().lastError,'');
// [VI dòng gốc 565] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
 }
// [VI dòng gốc 566] gọi q.W.KVPV_BASIC10.stop() để dừng bộ điều khiển và dọn tài nguyên | gọi q.W.KVPV_TH300.stop() để dừng bộ điều khiển và dọn tài nguyên
 q.W.KVPV_BASIC10.stop();q.W.KVPV_TH300.stop();
// [VI dòng gốc 567] gọi assert.equal(q.s._f7t, selector) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.c.combat, combat) để kiểm tra hai giá trị bằng nhau
 assert.equal(q.s._f7t,selector);assert.equal(q.c.combat,combat);
// [VI dòng gốc 568] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 569] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 570] gọi test('oscillating actor cannot issue unbounded positioning commands', ()=>{ const q=harness({fastReady:true,startX:330});let …)
test('oscillating actor cannot issue unbounded positioning commands',()=>{
// [VI dòng gốc 571] Khai báo biến không gán lại bằng const: q = gọi harness({fastReady:true,startX:330}) | Khai báo biến có thể gán lại bằng let: n = 0
 const q=harness({fastReady:true,startX:330});let n=0;
// [VI dòng gốc 572] gán q.m.moveTo bằng ()=>{n++;q.actor.coords={x:n%2?320:330,y:0};} | tăng n một đơn vị sau khi lấy giá trị | gán q.actor.coords bằng {x:n%2?320:330,y:0} | gọi q.mod.start('SCAN') để khởi động bộ điều khiển
 q.m.moveTo=()=>{n++;q.actor.coords={x:n%2?320:330,y:0};};q.mod.start('SCAN');
// [VI dòng gốc 573] Lặp for: khởi tạo let i=0; tiếp tục khi i<80&&q.mod.report().lastReason!=='position_oscillation_bounded'; sau mỗi vòng i++. | Khai báo biến có thể gán lại bằng let: i = 0 | gọi q.advance(700)
 for(let i=0;i<80&&q.mod.report().lastReason!=='position_oscillation_bounded';i++)q.advance(700);
// [VI dòng gốc 574] gọi assert.equal(n, 24) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.mod.report().lastReason, 'position_oscillation_bounded') để kiểm tra hai giá trị bằng nhau
 assert.equal(n,24);assert.equal(q.mod.report().lastReason,'position_oscillation_bounded');
// [VI dòng gốc 575] gọi q.advance(7999) | gọi assert.equal(n, 24, 'pause does not spam movement') để kiểm tra hai giá trị bằng nhau
 q.advance(7999);assert.equal(n,24,'pause does not spam movement');
// [VI dòng gốc 576] Chú thích gốc của tác giả; không được thực thi. Nội dung: A changed native route can recover even while the boss remains still.
 // A changed native route can recover even while the boss remains still.
// [VI dòng gốc 577] gán q.m.moveTo bằng (x,y)=>{n++;q.actor.coords={x,y};} | tăng n một đơn vị sau khi lấy giá trị | gán q.actor.coords bằng {x,y} | gọi q.advance(1)
 q.m.moveTo=(x,y)=>{n++;q.actor.coords={x,y};};q.advance(1);assert(n>24);
// [VI dòng gốc 578] gọi q.advance(100) | gọi assert.equal(q.mod.report().positioning, false) để kiểm tra hai giá trị bằng nhau | gọi assert(q.calls.length>0, 'combat resumes after reaching the measured ring') để kiểm tra điều kiện của bài test
 q.advance(100);assert.equal(q.mod.report().positioning,false);assert(q.calls.length>0,'combat resumes after reaching the measured ring');
// [VI dòng gốc 579] gọi assert(q.mod.history().some(e=>e.type==='POSITION-RECOVERY')) để kiểm tra điều kiện của bài test
 assert(q.mod.history().some(e=>e.type==='POSITION-RECOVERY'));
// [VI dòng gốc 580] gọi q.mod.stop() để dừng bộ điều khiển và dọn tài nguyên
 q.mod.stop();
// [VI dòng gốc 581] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 582] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 583] gọi test('Linh Lung and Rune close at <=2% Boss HP while recovery retains priority', ()=>{ for(const kind of ['tower','rune']){ c…)
test('Linh Lung and Rune close at <=2% Boss HP while recovery retains priority',()=>{
// [VI dòng gốc 584] Duyệt từng giá trị trong ['tower','rune'] bằng const kind. | Khai báo biến không gán lại bằng const: kind (chưa gán giá trị)
 for(const kind of ['tower','rune']){
// [VI dòng gốc 585] Khai báo biến không gán lại bằng const: opt = tạo đối tượng gồm kind, bossHp, startX | Khai báo biến không gán lại bằng const: q = gọi harness(opt) | gọi q.mod.start('SCAN') để khởi động bộ điều khiển
 const opt={[kind]:true,bossHp:[21,1000],startX:310.4};const q=harness(opt);q.mod.start('SCAN');
// [VI dòng gốc 586] gọi q.m.moveTo(100, 0) | gọi assert.equal(q.actor.coords.x, 310.4) để kiểm tra hai giá trị bằng nhau
 q.m.moveTo(100,0);assert.equal(q.actor.coords.x,310.4);
// [VI dòng gốc 587] gán opt.bossHp bằng [20,1000] | gọi q.pump() | gọi assert.equal(q.actor.coords.x, 192) để kiểm tra hai giá trị bằng nhau | Khai báo biến không gán lại bằng const: sent = đọc q.movements.length
 opt.bossHp=[20,1000];q.pump();assert.equal(q.actor.coords.x,192);const sent=q.movements.length;q.pump();assert.equal(q.movements.length,sent);q.m.moveTo(100,0);assert.equal(q.actor.coords.x,100);
// [VI dòng gốc 588] gọi q.c.combat(8001) | gọi assert(q.calls.includes(8001)) để kiểm tra điều kiện của bài test | gọi assert.notEqual(q.s.selectSkill(), -1)
 q.c.combat(8001);assert(q.calls.includes(8001));assert.notEqual(q.s.selectSkill(),-1);
// [VI dòng gốc 589] Khai báo biến không gán lại bằng const: count = đọc q.calls.length | gọi q.phase('RETREAT') | gọi q.pump() | gọi q.c.combat(8001)
 const count=q.calls.length;q.phase('RETREAT');q.pump();q.c.combat(8001);assert.equal(q.calls.length,count);q.phase('FIGHT');
// [VI dòng gốc 590] gán opt.bossHp bằng [1000,1000] | gọi q.pump() | gọi q.m.moveTo(100, 0) | gọi assert(q.actor.coords.x>300) để kiểm tra điều kiện của bài test
 opt.bossHp=[1000,1000];q.pump();q.m.moveTo(100,0);assert(q.actor.coords.x>300);q.mod.stop();
// [VI dòng gốc 591] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
 }
// [VI dòng gốc 592] Duyệt từng giá trị trong [{bossHp:[1,1000]},{tower:true},{rune:true}] bằng const options. | Khai báo biến không gán lại bằng const: options (chưa gán giá trị)
 for(const options of [{bossHp:[1,1000]},{tower:true},{rune:true}]){
// [VI dòng gốc 593] Khai báo biến không gán lại bằng const: r = gọi harness(options) | gọi r.mod.start('SCAN') để khởi động bộ điều khiển | gọi r.m.moveTo(100, 0) | gọi assert(r.actor.coords.x>300, JSON.stringify(options)) để kiểm tra điều kiện của bài test
  const r=harness(options);r.mod.start('SCAN');r.m.moveTo(100,0);assert(r.actor.coords.x>300,JSON.stringify(options));r.mod.stop();
// [VI dòng gốc 594] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
 }
// [VI dòng gốc 595] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 596] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 597] gọi test('Tian Quan stays ranged at 5% and 1% and retains retreat priority', ()=>{ const opt={bossHp:[51,1000],fastReady:true};co…)
test('Rune and Linh Lung finish last 2pct with automatic 8001-8005 native attacks',()=>{
 for(const kind of ['rune','tower']){
  const opts={[kind]:true,fastReady:true,defaultDistance:true,newDefault:true,startX:310.4,bossHp:[21,1000]};
  const q=harness(opts);
  q.s._rtt=[[8001,0,50],[8002,0,50],[8003,0,50],[8004,0,50],[8005,0,50],[1001,0,100]];
  q.s._wet=[];
  q.mod.setTianQuanFiveBasics(true,1);
  q.mod.setTianQuanTuyetHoc(false);
  q.mod.start('SCAN');
  opts.bossHp=[20,1000];
  q.advance(1);assert.equal(q.actor.coords.x,192,'native melee approach should execute');
  const before=q.calls.length;
  q.advance(1);
  assert(q.calls.length>before,kind+' should automatically cast after arrival');
  assert.equal(q.mod.report().lastReason,'dungeon_finish_basic_cast');
  const n=q.calls.length;
  for(let i=0;i<6;i++)q.advance(1);
  assert(q.calls.length>n,'melee casts keep running after first one');
  assert(q.calls.slice(before).every(id=>id>=8001&&id<=8005),'no TH in last 2pct');
  const rowBefore=JSON.stringify(q.s._rtt);
  q.cooldown(true);const pending=q.calls.length;q.advance(30);
  assert.equal(q.calls.length,pending,'native cooldown still controls finish without the force hook');
  q.cooldown(false);
  q.phase('RETREAT');q.advance(30);
  assert.equal(q.calls.length,pending,'HP recovery phase stops last-2pct attacks');
  q.phase('FIGHT');q.advance(30);assert(q.calls.length>pending,'finish resumes after recovery');
  assert.equal(JSON.stringify(q.s._rtt),rowBefore,'native cooldown rows are not rewritten');
  const preDead=q.calls.length;opts.bossHp=[0,1000];q.advance(30);
  assert.equal(q.calls.length,preDead,'dead Boss must not receive finishing casts');
  q.mod.stop();
 }
});
test('Rune finish reapproaches a moving Boss only while native range is invalid',()=>{
 const opts={rune:true,fastReady:true,defaultDistance:true,newDefault:true,startX:310.4,bossHp:[20,1000]};
 const q=harness(opts);
 q.s._rtt=[8001,8002,8003,8004,8005].map(id=>[id,0,50]);q.s._wet=[];
 q.mod.setTianQuanFiveBasics(true,1);q.mod.setTianQuanTuyetHoc(false);
 q.c.isValidRange=()=>false;
 q.mod.start('SCAN');assert.equal(q.actor.coords.x,192);
 const n=q.calls.length;q.advance(600);assert.equal(q.actor.coords.x,172);
 assert.equal(q.calls.length,n);
 q.c.isValidRange=()=>true;q.advance(1);
 assert(q.calls.length>n,'native range confirmed and auto finish continues');
 q.mod.stop();
});
test('Tian Quan stays ranged at 5% and 1% and retains retreat priority',()=>{
// [VI dòng gốc 598] Khai báo biến không gán lại bằng const: opt = tạo đối tượng gồm bossHp, fastReady | Khai báo biến không gán lại bằng const: q = gọi harness(opt)
 const opt={bossHp:[51,1000],fastReady:true};const q=harness(opt);
// [VI dòng gốc 599] gán q.W.KVPV_FAR_SCOPE bằng {status:()=>({kind:'THIEN_QUAN'}),inside:()=>true}
 q.W.KVPV_FAR_SCOPE={status:()=>({kind:'THIEN_QUAN'}),inside:()=>true};
// [VI dòng gốc 600] gọi q.mod.start('SCAN') để khởi động bộ điều khiển
 q.mod.start('SCAN');
// [VI dòng gốc 601] Duyệt từng giá trị trong [50,10,1] bằng const hp. | Khai báo biến không gán lại bằng const: hp (chưa gán giá trị) | gán opt.bossHp bằng [hp,1000] | gọi q.pump()
 for(const hp of [50,10,1]){opt.bossHp=[hp,1000];q.pump();q.m.moveTo(100,0);assert(q.actor.coords.x>300);}
// [VI dòng gốc 602] gọi q.c.combat(1001) | gọi assert(q.calls.includes(1001)) để kiểm tra điều kiện của bài test
 q.c.combat(1001);assert(q.calls.includes(1001));
// [VI dòng gốc 603] Khai báo biến không gán lại bằng const: n = đọc q.calls.length | gọi q.phase('RETREAT') | gọi q.pump() | gọi q.c.combat(1001)
 const n=q.calls.length;q.phase('RETREAT');q.pump();q.c.combat(1001);assert.equal(q.calls.length,n);
// [VI dòng gốc 604] gọi q.mod.stop() để dừng bộ điều khiển và dọn tài nguyên
 q.mod.stop();
// [VI dòng gốc 605] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 606] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 607] Duyệt từng giá trị trong [{},{tower:true},{rune:true},{trutien:true},{rune:true,bossHp:[1,100]}] bằng const scope. | Khai báo biến không gán lại bằng const: scope (chưa gán giá trị) | gọi test('8001 only without TH fallback and without extra 500ms gate '+JSON.stringify(scope), ()=>{ const q=harness({...scope,fas…)
for(const scope of [{},{tower:true},{rune:true},{trutien:true},{rune:true,bossHp:[1,100]}])test('8001 only without TH fallback and without extra 500ms gate '+JSON.stringify(scope),()=>{
// [VI dòng gốc 608] Khai báo biến không gán lại bằng const: q = gọi harness({...scope,fastReady:true}) | gọi q.mod.setBasicHitQuota(1) để đặt số đòn thường đã xác nhận trước khi cho Tuyệt Học; chế độ basicOnly vẫn chặn Tuyệt Học | gọi q.mod.setBasicOnly(true) để bật/tắt chế độ nhân vật chỉ dùng đòn tay 8001 trong Thiên Quan, Linh Lung, Phù Văn và Tru Tiên | gọi q.mod.start('SCAN') để khởi động bộ điều khiển
 const q=harness({...scope,fastReady:true});q.mod.setBasicHitQuota(1);q.mod.setBasicOnly(true);q.mod.start('SCAN');q.pump();
// [VI dòng gốc 609] Kiểm tra scope.bossHp: đúng thì chạy nhánh sau if. | gọi q.c.combat(q.s.selectSkill())
 if(scope.bossHp)q.c.combat(q.s.selectSkill());
// [VI dòng gốc 610] gọi assert.equal(q.calls[0], 8001) để kiểm tra hai giá trị bằng nhau | Khai báo biến không gán lại bằng const: rows = gọi JSON.stringify(q.s._rtt) để chuyển giá trị thành chuỗi JSON; n = đọc q.calls.length
 assert.equal(q.calls[0],8001);const rows=JSON.stringify(q.s._rtt),n=q.calls.length;
// [VI dòng gốc 611] gọi q.c.combat(1001) | gọi q.c.combat(8005) | gọi assert.equal(q.calls.length, n, 'reject every other player skill') để kiểm tra hai giá trị bằng nhau
 q.c.combat(1001);q.c.combat(8005);assert.equal(q.calls.length,n,'reject every other player skill');
// [VI dòng gốc 612] gọi q.elapse(2) | gọi q.pump() | Kiểm tra scope.bossHp: đúng thì chạy nhánh sau if. | gọi q.c.combat(q.s.selectSkill())
 q.elapse(2);q.pump();if(scope.bossHp)q.c.combat(q.s.selectSkill());assert(q.calls.length>n,'native recovered basic does not wait an extra 500ms');
// [VI dòng gốc 613] gọi assert(q.calls.every(id=>id===8001)) để kiểm tra điều kiện của bài test | gọi assert.equal(JSON.stringify(q.s._rtt), rows, 'basic selection only edits row copies') để kiểm tra hai giá trị bằng nhau
 assert(q.calls.every(id=>id===8001));assert.equal(JSON.stringify(q.s._rtt),rows,'basic selection only edits row copies');
// [VI dòng gốc 614] Khai báo biến không gán lại bằng const: m = đọc q.calls.length | gọi q.cooldown(true) | gọi q.advance(20) | gọi assert.equal(q.calls.length, m, 'still obey native animation/cooldown') để kiểm tra hai giá trị bằng nhau
 const m=q.calls.length;q.cooldown(true);q.advance(20);assert.equal(q.calls.length,m,'still obey native animation/cooldown');
// [VI dòng gốc 615] gọi q.cooldown(false) | gọi q.phase('RETREAT') | gọi q.advance(20) | gọi assert.equal(q.calls.length, m, 'recovery still takes priority') để kiểm tra hai giá trị bằng nhau
 q.cooldown(false);q.phase('RETREAT');q.advance(20);assert.equal(q.calls.length,m,'recovery still takes priority');
// [VI dòng gốc 616] gọi assert.equal(q.mod.report().basicOnly, true) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.mod.report().interleaved.scanMs, 1) để kiểm tra hai giá trị bằng nhau | gọi q.mod.stop() để dừng bộ điều khiển và dọn tài nguyên
 assert.equal(q.mod.report().basicOnly,true);assert.equal(q.mod.report().interleaved.scanMs,1);q.mod.stop();
// [VI dòng gốc 617] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 618] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 619] Duyệt từng giá trị trong [9,99] bằng const factor. | Khai báo biến không gán lại bằng const: factor (chưa gán giá trị) | gọi test('bounded x'+factor+' animation trial changes native attack scale only, measures hits and restores after five seconds', (…)
for(const factor of [9,99])test('bounded x'+factor+' animation trial changes native attack scale only, measures hits and restores after five seconds',()=>{
// [VI dòng gốc 620] Khai báo biến không gán lại bằng const: q = gọi harness({fastReady:true}); listeners = tạo đối tượng bằng Map(); scales = tạo mảng gồm 0 vị trí: []
 const q=harness({fastReady:true}),listeners=new Map(),scales=[];
// [VI dòng gốc 621] gán q.actor.on bằng (id,owner,fn)=>listeners.set(id,fn) | gán q.actor.off bằng (id,owner,fn)=>{if(listeners.get(id)===fn)listeners.delete(id);} | Kiểm tra listeners.get(id)===fn: đúng thì chạy nhánh sau if. | gọi listeners.delete(id)
 q.actor.on=(id,owner,fn)=>listeners.set(id,fn);q.actor.off=(id,owner,fn)=>{if(listeners.get(id)===fn)listeners.delete(id);};
// [VI dòng gốc 622] Khai báo biến không gán lại bằng const: clip = tạo đối tượng gồm _nt, timeScale; avatar = tạo đối tượng gồm getCurAction, getActionTween | gán this._nt bằng v | Kết thúc hàm hiện tại và trả về: clip. | gọi scales.push(scale) để thêm phần tử vào cuối mảng
 const clip={_nt:1,set timeScale(v){this._nt=v;}},avatar={get getCurAction(){return clip;},getActionTween(name,reset,scale=1){scales.push(scale);clip.timeScale=scale;return {};}};
// [VI dòng gốc 623] Khai báo biến không gán lại bằng const: original = đọc avatar.getActionTween | gán q.c._Qrt bằng avatar
 const original=avatar.getActionTween;q.c._Qrt=avatar;
// [VI dòng gốc 624] gán q.c.combat bằng function(id){q.calls.push(id);this._Qrt.getActionTween('attack');listeners.get(1039)?.('boss1',id);} | gọi q.calls.push(id) để thêm phần tử vào cuối mảng | gọi this._Qrt.getActionTween('attack') | gọi listeners.get(1039)('boss1', id) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
 q.c.combat=function(id){q.calls.push(id);this._Qrt.getActionTween('attack');listeners.get(1039)?.('boss1',id);};
// [VI dòng gốc 625] Khai báo biến không gán lại bằng const: hit = tạo hàm với tham số (không có); mỗi lần gọi trả về gọi q.events[1012]('10228867268946', 80010000, 10, 1, 'boss1')
 const hit=()=>q.events[1012]('10228867268946',80010000,10,1,'boss1');
// [VI dòng gốc 626] gọi q.mod.setBasicHitQuota(1) để đặt số đòn thường đã xác nhận trước khi cho Tuyệt Học; chế độ basicOnly vẫn chặn Tuyệt Học | gọi q.mod.setBasicOnly(true) để bật/tắt chế độ nhân vật chỉ dùng đòn tay 8001 trong Thiên Quan, Linh Lung, Phù Văn và Tru Tiên | gọi q.mod.start('SCAN') để khởi động bộ điều khiển | gọi hit()
 q.mod.setBasicHitQuota(1);q.mod.setBasicOnly(true);q.mod.start('SCAN');hit();
// [VI dòng gốc 627] Khai báo biến không gán lại bằng const: trial = gọi q.mod.startBasicSpeedTrial(factor) để bắt đầu phép so sánh hoạt ảnh có thời hạn và tự khôi phục | gọi q.pump() | gọi hit() | gọi q.elapse(100)
 const trial=q.mod.startBasicSpeedTrial(factor);q.pump();hit();q.elapse(100);q.pump();hit();
// [VI dòng gốc 628] gọi assert.equal(trial.state, 'baseline') để kiểm tra hai giá trị bằng nhau | gọi assert.equal(scales.at(-1), 1) để kiểm tra hai giá trị bằng nhau
 assert.equal(trial.state,'baseline');assert.equal(scales.at(-1),1);
// [VI dòng gốc 629] gọi q.elapse(5000) | gọi q.pump() | gọi hit() | gọi assert.equal(trial.state, 'accelerated') để kiểm tra hai giá trị bằng nhau
 q.elapse(5000);q.pump();hit();assert.equal(trial.state,'accelerated');assert.equal(scales.at(-1),factor);
// [VI dòng gốc 630] gọi assert.equal(avatar.getActionTween, original, 'temporary wrapper removed immediately after native call') để kiểm tra hai giá trị bằng nhau
 assert.equal(avatar.getActionTween,original,'temporary wrapper removed immediately after native call');
// [VI dòng gốc 631] gọi q.elapse(5000) | gọi q.pump() | gọi assert.equal(trial.state, 'complete') để kiểm tra hai giá trị bằng nhau | gọi assert.equal(trial.restored, true) để kiểm tra hai giá trị bằng nhau
 q.elapse(5000);q.pump();assert.equal(trial.state,'complete');assert.equal(trial.restored,true);assert.equal(clip._nt,1);
// [VI dòng gốc 632] gọi assert(trial.baseline.hits>0) để kiểm tra điều kiện của bài test | gọi assert(trial.accelerated.hits>0) để kiểm tra điều kiện của bài test | gọi assert.equal(q.mod.startBasicSpeedTrial(factor), trial, 'no automatic rerun') để kiểm tra hai giá trị bằng nhau
 assert(trial.baseline.hits>0);assert(trial.accelerated.hits>0);assert.equal(q.mod.startBasicSpeedTrial(factor),trial,'no automatic rerun');
// [VI dòng gốc 633] gọi assert.throws(()=>q.mod.startBasicSpeedTrial(999)) để kiểm tra đoạn mã có ném lỗi như dự kiến | gọi q.mod.stop() để dừng bộ điều khiển và dọn tài nguyên | gọi assert.equal(avatar.getActionTween, original) để kiểm tra hai giá trị bằng nhau
 assert.throws(()=>q.mod.startBasicSpeedTrial(999));q.mod.stop();assert.equal(avatar.getActionTween,original);
// [VI dòng gốc 634] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 635] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 636] Duyệt từng giá trị trong [{},{trutien:true}] bằng const scope. | Khai báo biến không gán lại bằng const: scope (chưa gán giá trị) | gọi test('persistent main 8001 animation does not expire and restores on explicit disable '+JSON.stringify(scope), ()=>{ const q=…)
for(const scope of [{},{trutien:true}])test('persistent main 8001 animation does not expire and restores on explicit disable '+JSON.stringify(scope),()=>{
// [VI dòng gốc 637] Khai báo biến không gán lại bằng const: q = gọi harness({...scope,fastReady:true}); listeners = tạo đối tượng bằng Map(); scales = tạo mảng gồm 0 vị trí: []; factor = nếu scope.trutien thì lấy 99999, ngược lại lấy 99
 const q=harness({...scope,fastReady:true}),listeners=new Map(),scales=[],factor=scope.trutien?99999:99;
// [VI dòng gốc 638] gán q.actor.on bằng (id,owner,fn)=>listeners.set(id,fn) | gán q.actor.off bằng (id,owner,fn)=>{if(listeners.get(id)===fn)listeners.delete(id);} | Kiểm tra listeners.get(id)===fn: đúng thì chạy nhánh sau if. | gọi listeners.delete(id)
 q.actor.on=(id,owner,fn)=>listeners.set(id,fn);q.actor.off=(id,owner,fn)=>{if(listeners.get(id)===fn)listeners.delete(id);};
// [VI dòng gốc 639] Khai báo biến không gán lại bằng const: clip = tạo đối tượng gồm _nt, timeScale; avatar = tạo đối tượng gồm getCurAction, getActionTween | gán this._nt bằng v | Kết thúc hàm hiện tại và trả về: clip. | gán clip.timeScale bằng scale
 const clip={_nt:1,set timeScale(v){this._nt=v;}},avatar={get getCurAction(){return clip;},getActionTween(name,reset,scale=1){clip.timeScale=scale;scales.push(scale);return {};}};
// [VI dòng gốc 640] Khai báo biến không gán lại bằng const: original = đọc avatar.getActionTween | gán q.c._Qrt bằng avatar | gán q.c.combat bằng function(id){q.calls.push(id);this._Qrt.getActionTween('attack');listeners.get(1039)?.('boss1',id);} | gọi q.calls.push(id) để thêm phần tử vào cuối mảng
 const original=avatar.getActionTween;q.c._Qrt=avatar;q.c.combat=function(id){q.calls.push(id);this._Qrt.getActionTween('attack');listeners.get(1039)?.('boss1',id);};
// [VI dòng gốc 641] gọi q.mod.setBasicHitQuota(1) để đặt số đòn thường đã xác nhận trước khi cho Tuyệt Học; chế độ basicOnly vẫn chặn Tuyệt Học | gọi q.mod.setBasicOnly(true) để bật/tắt chế độ nhân vật chỉ dùng đòn tay 8001 trong Thiên Quan, Linh Lung, Phù Văn và Tru Tiên | gọi q.mod.setBasicAnimationSpeed(factor) để đặt hệ số phát hoạt ảnh 8001 phía client; không phải hệ số sát thương server | gọi q.mod.start('SCAN') để khởi động bộ điều khiển
 q.mod.setBasicHitQuota(1);q.mod.setBasicOnly(true);q.mod.setBasicAnimationSpeed(factor);q.mod.start('SCAN');
// [VI dòng gốc 642] gọi q.events[1012]('10228867268946', 80010000, 10, 1, 'boss1') | gọi assert.equal(scales.at(-1), factor) để kiểm tra hai giá trị bằng nhau
 q.events[1012]('10228867268946',80010000,10,1,'boss1');assert.equal(scales.at(-1),factor);
// [VI dòng gốc 643] gọi q.advance(20000) | gọi assert.equal(scales.at(-1), factor) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.mod.report().basicAnimationSpeed, factor) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(avatar.getActionTween, original) để kiểm tra hai giá trị bằng nhau
 q.advance(20000);assert.equal(scales.at(-1),factor);assert.equal(q.mod.report().basicAnimationSpeed,factor);assert.equal(avatar.getActionTween,original);
// [VI dòng gốc 644] gọi assert.throws(()=>q.mod.startBasicSpeedTrial(99)) để kiểm tra đoạn mã có ném lỗi như dự kiến | gọi q.mod.setBasicAnimationSpeed(1) để đặt hệ số phát hoạt ảnh 8001 phía client; không phải hệ số sát thương server | gọi assert.equal(clip._nt, 1) để kiểm tra hai giá trị bằng nhau
 assert.throws(()=>q.mod.startBasicSpeedTrial(99));q.mod.setBasicAnimationSpeed(1);assert.equal(clip._nt,1);
// [VI dòng gốc 645] gọi q.advance(1) | gọi assert.equal(scales.at(-1), 1) để kiểm tra hai giá trị bằng nhau | gọi q.mod.stop() để dừng bộ điều khiển và dọn tài nguyên | gọi assert.equal(avatar.getActionTween, original) để kiểm tra hai giá trị bằng nhau
 q.advance(1);assert.equal(scales.at(-1),1);q.mod.stop();assert.equal(avatar.getActionTween,original);
// [VI dòng gốc 646] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 647] gọi test('per-dungeon combat settings switch mode, distance and interval without leaking', ()=>{const q=harness();let kind='THIEN…) | Khai báo biến không gán lại bằng const: q = gọi harness() | Khai báo biến có thể gán lại bằng let: kind = "THIEN_QUAN" | Khai báo biến không gán lại bằng const: profiles = tạo đối tượng gồm THIEN_QUAN, LINH_LUNG, PHU_VAN, TRU_TIEN
test('per-dungeon combat settings switch mode, distance and interval without leaking',()=>{const q=harness();let kind='THIEN_QUAN';const profiles={THIEN_QUAN:{mode:'basic8001',distance:302,intervalMs:100},LINH_LUNG:{mode:'mixed',distance:310,intervalMs:300},PHU_VAN:{mode:'basic8001',distance:305,intervalMs:500},TRU_TIEN:{mode:'mixed',distance:312,intervalMs:0}};q.W.KVPV_FAR_SCOPE={status:()=>({kind}),inside:()=>true,eligible:()=>true};q.W.KVPV_DESKTOP_CONTROL={scopeProfile:s=>profiles[s]??null};for(const scope of Object.keys(profiles)){kind=scope;const state=q.mod.status(false),p=profiles[scope];assert.equal(state.requestedDistance,p.distance);assert.equal(state.basicOnly,p.mode==='basic8001');assert.equal(state.paceMs,p.intervalMs);}kind='THIEN_QUAN';assert.equal(q.mod.status(false).requestedDistance,302);q.mod.stop();});
// [VI dòng gốc 648] Duyệt từng giá trị trong [[{},'THIEN_QUAN'],[{tower:true},'LINH_LUNG'],[{rune:true},'PHU_VAN'],[{trutien:true},'TRU_TIEN']] bằng const [scope,kind]. | Khai báo biến không gán lại bằng const: [scope,kind] (chưa gán giá trị) | gọi test('switch live scoped basic to mixed and back '+kind, ()=>{const q=harness({...scope,fastReady:true});let mode='basic8001'…) | Khai báo biến không gán lại bằng const: q = gọi harness({...scope,fastReady:true})
for(const [scope,kind] of [[{},'THIEN_QUAN'],[{tower:true},'LINH_LUNG'],[{rune:true},'PHU_VAN'],[{trutien:true},'TRU_TIEN']])test('switch live scoped basic to mixed and back '+kind,()=>{const q=harness({...scope,fastReady:true});let mode='basic8001';q.W.KVPV_FAR_SCOPE={status:()=>({kind}),inside:()=>true,eligible:()=>true};q.W.KVPV_DESKTOP_CONTROL={scopeProfile:()=>({mode,distance:302,intervalMs:0})};q.mod.setBasicHitQuota(null);q.mod.setBasicOnly(true);q.mod.start('SCAN');q.pump();assert.equal(q.calls.at(-1),8001);q.elapse(1000);const n=q.calls.length;q.c.combat(1001);assert.equal(q.calls.length,n);mode='mixed';q.c.combat(1001);assert.equal(q.calls.at(-1),1001);q.elapse(1000);mode='basic8001';const m=q.calls.length;q.c.combat(1001);assert.equal(q.calls.length,m);q.c.combat(8001);assert.equal(q.calls.at(-1),8001);q.mod.stop();});
// [VI dòng gốc 649] Dòng trống để tách các phần, không có lệnh thực thi.


test('TQ fixed distance continues at low HP and yields on death',()=>{
 const q=harness({defaultDistance:true,newDefault:true,startX:190,fastReady:true});
 q.W.KVPV_FAR_SCOPE={inside:()=>true,status:()=>({kind:'THIEN_QUAN',inside:true}),eligible:()=>true};
 q.W.KVPV_TQ_POSITION_ONLY={enabled:true,distance:310,heal:false};
 q.W.KVPV_HITRUN1.status=()=>({running:false,phase:'RETREAT',hpPct:10,leavePct:35});
 q.hp(10);q.mod.start('SCAN');q.pump();
 const first=q.mod.status(false);
 assert.equal(first.goalDistance,310);assert.equal(first.recoveryEnabled,false);
 assert.equal(first.distanceOnly310,true);assert.equal(q.actor.coords.x,310);
 const count=first.castAttempts;q.hp(1);q.advance(150);
 assert(q.mod.status(false).castAttempts>count);
 q.hp(0);const deadCount=q.mod.status(false).castAttempts;q.advance(150);
 assert.equal(q.mod.status(false).castAttempts,deadCount);
 q.mod.stop();
});
