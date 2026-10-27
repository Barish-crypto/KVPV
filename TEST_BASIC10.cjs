// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: Kiểm thử mô phỏng: BASIC10. Các assert bên dưới ghi điều kiện phải giữ; không chứng minh máy chủ game chấp nhận tốc độ hoặc tầm đánh. [đóng chú thích]
/* Kiểm thử mô phỏng: BASIC10. Các assert bên dưới ghi điều kiện phải giữ; không chứng minh máy chủ game chấp nhận tốc độ hoặc tầm đánh. */
// [VI dòng gốc 2] Khai báo biến không gán lại bằng const: fs = gọi require('node:fs') để nạp module Node.js; vm = gọi require('node:vm') để nạp module Node.js; assert = gọi require('node:assert/strict') để nạp module Node.js
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
// [VI dòng gốc 3] Khai báo biến có thể gán lại bằng let: now = 1000; inside = false; cooldown = false; inRange = true
let now=1000,inside=false,cooldown=false,inRange=true;
// [VI dòng gốc 4] Định nghĩa lớp Clock kế thừa Date. | Kết thúc hàm hiện tại và trả về: now.
class Clock extends Date{static now(){return now;}}
// [VI dòng gốc 5] Khai báo biến không gán lại bằng const: Skill = tạo hàm với tham số (không có); Combat = tạo hàm với tham số (không có); calls = tạo mảng gồm 0 vị trí: []; timers = tạo mảng gồm 0 vị trí: []
const Skill=function(){},Combat=function(){},calls=[],timers=[];
// [VI dòng gốc 6] Khai báo biến không gán lại bằng const: s = tạo đối tượng gồm _rtt, _wet, _f7t, selectSkill | Khai báo biến không gán lại bằng const: row = gọi [...a,...b].find(r=>r[1]<now) để tìm phần tử đầu tiên thỏa điều kiện | Kiểm tra !row: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: áp dụng toán tử - lên 1.
const s={_rtt:[[1001,0,1000],[8001,0,1]],_wet:[],_f7t(a,b){const row=[...a,...b].find(r=>r[1]<now);if(!row)return -1;row[1]=now+row[2];return row[0];},selectSkill(){return this._f7t(this._rtt,this._wet,1);}};
// [VI dòng gốc 7] Khai báo biến không gán lại bằng const: c = tạo đối tượng gồm combat, isValidTarget, isValidRange, isCooldown
const c={combat:id=>calls.push(id),isValidTarget:()=>true,isValidRange:()=>inRange,isCooldown:()=>cooldown};
// [VI dòng gốc 8] Khai báo biến không gán lại bằng const: nativeSelector = đọc s._f7t; nativeCombat = đọc c.combat
const nativeSelector=s._f7t,nativeCombat=c.combat;
// [VI dòng gốc 9] Khai báo biến không gán lại bằng const: role = tạo đối tượng gồm getComponent
const role={getComponent:t=>t===Skill?s:t===Combat?c:null};
// [VI dòng gốc 10] Khai báo biến không gán lại bằng const: W = tạo đối tượng gồm __KVPV_OWN_ACTOR_ID, _Ba, _d, _C, KVPV_TQ_SCOPE, setInterval, clearInterval | gọi timers.push({fn,ms}) để thêm phần tử vào cuối mảng | Kết thúc hàm hiện tại và trả về: 1.
const W={__KVPV_OWN_ACTOR_ID:'12345',_Ba:{_rJ:{_O$:{ins:{actorId:'12345'}}}},_d:{_Yct:{_Eet:Skill,_Het:Combat}},_C:{_Ba:{instance:{getRole:()=>role}}},KVPV_TQ_SCOPE:{inside:()=>inside},setInterval:(fn,ms)=>{timers.push({fn,ms});return 1;},clearInterval(){}};
// [VI dòng gốc 11] gọi vm.runInNewContext(fs.readFileSync(__dirname+'/src/12-basic-outside.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,''), {window:W…) để chạy mã trong ngữ cảnh máy ảo dùng cho kiểm thử
vm.runInNewContext(fs.readFileSync(__dirname+'/src/12-basic-outside.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,''),{window:W,Date:Clock});
// [VI dòng gốc 12] gọi assert.equal(timers[0].ms, 16) để kiểm tra hai giá trị bằng nhau | gọi assert.deepEqual(calls, [8001]) để kiểm tra cấu trúc hai giá trị tương đương
assert.equal(timers[0].ms,16);assert.deepEqual(calls,[1001]);
assert.equal(W.KVPV_BASIC10.status().skillPriority,'tuyet_hoc_first');
// Ready TH chain before basic filler; original TH cooldowns remain native.
s._rtt.push([1002,0,1000]);now+=2;W.KVPV_BASIC10.sync();assert.equal(calls.at(-1),1002);
now+=2;W.KVPV_BASIC10.sync();assert.equal(calls.at(-1),8001);
now+=1001;W.KVPV_BASIC10.sync();assert.equal(calls.at(-1),1001);
cooldown=true;s._rtt[1][1]=0;const priorityCalls=calls.length;now+=2;W.KVPV_BASIC10.sync();assert.equal(calls.length,priorityCalls);assert.equal(s._rtt[1][1],0);cooldown=false;
assert.throws(()=>W.KVPV_BASIC10.setSkillPriority('invalid'));assert.equal(W.KVPV_BASIC10.status().skillPriority,'tuyet_hoc_first');
W.KVPV_TERRITORY_LOOT={shouldBlock:()=>true};now+=2;const lootCalls=calls.length,lootRows=JSON.stringify(s._rtt);assert.equal(s.selectSkill(),-1);c.combat(1001);assert.equal(calls.length,lootCalls);assert.equal(JSON.stringify(s._rtt),lootRows);delete W.KVPV_TERRITORY_LOOT;
W.KVPV_BASIC10.stop();W.KVPV_BASIC10.setSkillPriority('interleaved');s._rtt=[[1001,0,1000],[8001,0,1]];calls.length=0;now+=2;W.KVPV_BASIC10.start();
assert.deepEqual(calls,[8001]);
// [VI dòng gốc 13] gọi c.combat(1001) | gọi assert.deepEqual(calls, [8001]) để kiểm tra cấu trúc hai giá trị tương đương | gọi assert.equal(s._rtt[0][1], 0) để kiểm tra hai giá trị bằng nhau | gọi c.combat(3012)
c.combat(1001);assert.deepEqual(calls,[8001]);assert.equal(s._rtt[0][1],0);c.combat(3012);assert.deepEqual(calls,[8001]);
// [VI dòng gốc 14] gọi W.KVPV_BASIC10.sync() | gọi assert.equal(calls.length, 1) để kiểm tra hai giá trị bằng nhau
W.KVPV_BASIC10.sync();assert.equal(calls.length,1);
// [VI dòng gốc 15] cập nhật bằng toán tử += now bằng 1 | gọi W.KVPV_BASIC10.sync() | gọi assert.equal(calls.length, 2) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(calls.at(-1), 1001) để kiểm tra hai giá trị bằng nhau
now+=1;W.KVPV_BASIC10.sync();assert.equal(calls.length,2);assert.equal(calls.at(-1),1001);now+=1;W.KVPV_BASIC10.sync();assert.equal(calls.at(-1),8001);assert.equal(s._rtt[0][1],now-1+1000);assert.equal(s._rtt[1][1],0);assert.equal(s._rtt[1][2],1);
// [VI dòng gốc 16] gán cooldown bằng true | cập nhật bằng toán tử += now bằng 10 | gọi W.KVPV_BASIC10.sync() | gọi assert.equal(calls.length, 3) để kiểm tra hai giá trị bằng nhau
cooldown=true;now+=10;W.KVPV_BASIC10.sync();assert.equal(calls.length,3);
// [VI dòng gốc 17] gán cooldown bằng false | gán inRange bằng false | cập nhật bằng toán tử += now bằng 10 | gọi W.KVPV_BASIC10.sync()
cooldown=false;inRange=false;now+=10;W.KVPV_BASIC10.sync();assert.equal(calls.length,3);
// [VI dòng gốc 18] gán inside bằng true | gọi W.KVPV_BASIC10.sync() | gọi assert.equal(s._f7t, nativeSelector) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(c.combat, nativeCombat) để kiểm tra hai giá trị bằng nhau
inside=true;W.KVPV_BASIC10.sync();assert.equal(s._f7t,nativeSelector);assert.equal(c.combat,nativeCombat);assert.equal(W.KVPV_BASIC10.status().active,false);
// [VI dòng gốc 19] gọi c.combat(1001) | gọi assert.equal(calls.at(-1), 1001) để kiểm tra hai giá trị bằng nhau
c.combat(1001);assert.equal(calls.at(-1),1001);
// [VI dòng gốc 20] gán inside bằng false | gán inRange bằng true | cập nhật bằng toán tử += now bằng 10 | gọi W.KVPV_BASIC10.sync()
inside=false;inRange=true;now+=10;W.KVPV_BASIC10.sync();assert.equal(calls.at(-1),8001);
// [VI dòng gốc 21] gán W.document bằng {hidden:true} | cập nhật bằng toán tử += now bằng 20 | Khai báo biến không gán lại bằng const: beforeHidden = đọc calls.length | gọi W.KVPV_BASIC10.sync()
W.document={hidden:true};now+=20;const beforeHidden=calls.length;W.KVPV_BASIC10.sync();assert.equal(calls.length,beforeHidden+1);assert.notEqual(W.KVPV_BASIC10.status().reason,'hidden_tab');
// [VI dòng gốc 22] gọi W.KVPV_BASIC10.stop() để dừng bộ điều khiển và dọn tài nguyên | gọi assert.equal(c.combat, nativeCombat) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(s._f7t, nativeSelector) để kiểm tra hai giá trị bằng nhau
W.KVPV_BASIC10.stop();assert.equal(c.combat,nativeCombat);assert.equal(s._f7t,nativeSelector);
// [VI dòng gốc 23] Khai báo biến không gán lại bằng const: transformRows = tạo mảng gồm 1 vị trí: [[90001,0,5000]]
const transformRows=[[90001,0,5000]];
// [VI dòng gốc 24] gán W._Ba._s3 bằng {_ZJ:{ins:{curShowId:17,getTransformingSkills:()=>({skills:transformRows,comSkills:[]})}}}
W._Ba._s3={_ZJ:{ins:{curShowId:17,getTransformingSkills:()=>({skills:transformRows,comSkills:[]})}}};
// [VI dòng gốc 25] gán W._ft bằng {_nY:{ins:{getCfgBySkillIdAndLv:()=>[0,0,'Huyết Ma Đại Pháp']}}}
W._ft={_nY:{ins:{getCfgBySkillIdAndLv:()=>[0,0,'Huyết Ma Đại Pháp']}}};
// [VI dòng gốc 26] gọi vm.runInNewContext(fs.readFileSync(__dirname+'/src/13-transform-skills.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,''), {windo…) để chạy mã trong ngữ cảnh máy ảo dùng cho kiểm thử
vm.runInNewContext(fs.readFileSync(__dirname+'/src/13-transform-skills.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,''),{window:W,Date:Clock});
// [VI dòng gốc 27] gán s.selectSkill bằng function(){return this._f7t(transformRows,[],2);} | Kết thúc hàm hiện tại và trả về: gọi this._f7t(transformRows, [], 2); chức năng nội bộ chưa xác minh từ tên hàm. | cập nhật bằng toán tử += now bằng 20 | gọi W.KVPV_BASIC10.start() để khởi động bộ điều khiển
s.selectSkill=function(){return this._f7t(transformRows,[],2);};now+=20;W.KVPV_BASIC10.start();
// [VI dòng gốc 28] gọi assert.equal(calls.at(-1), 90001) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(transformRows[0][2], 5000) để kiểm tra hai giá trị bằng nhau
assert.equal(calls.at(-1),90001);assert.equal(transformRows[0][2],5000);
// [VI dòng gốc 29] gọi W.KVPV_BASIC10.stop() để dừng bộ điều khiển và dọn tài nguyên | gọi W.KVPV_TRANSFORM10.stop() để dừng bộ điều khiển và dọn tài nguyên
W.KVPV_BASIC10.stop();W.KVPV_TRANSFORM10.stop();
// [VI dòng gốc 30] gọi console.log('PASS outside combo: 1ms throttle, basic/TH alternation, native cooldown/range, far-map release, hidden tab, transform a…)
console.log('PASS outside combo: 1ms throttle, basic/TH alternation, native cooldown/range, far-map release, hidden tab, transform and stop restore');
// [VI dòng gốc 31] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 32] Chú thích gốc của tác giả; không được thực thi. Nội dung: Khi TH hồi chiêu, đánh thường vẫn tiếp tục; TH sẵn sàng sẽ được dùng lại.
// Khi TH hồi chiêu, đánh thường vẫn tiếp tục; TH sẵn sàng sẽ được dùng lại.
// [VI dòng gốc 33] gán s.selectSkill bằng function(){return this._f7t(this._rtt,this._wet,1);} | Kết thúc hàm hiện tại và trả về: gọi this._f7t(this._rtt, this._wet, 1); chức năng nội bộ chưa xác minh từ tên hàm.
s.selectSkill=function(){return this._f7t(this._rtt,this._wet,1);};
// [VI dòng gốc 34] gán s._rtt[0][1] bằng now+1000 | cập nhật bằng toán tử += now bằng 20 | gọi W.KVPV_BASIC10.start() để khởi động bộ điều khiển | gọi assert.equal(calls.at(-1), 8001) để kiểm tra hai giá trị bằng nhau
s._rtt[0][1]=now+1000;now+=20;W.KVPV_BASIC10.start();assert.equal(calls.at(-1),8001);
// [VI dòng gốc 35] cập nhật bằng toán tử += now bằng 2 | Khai báo biến không gán lại bằng const: beforeFallback = đọc calls.length | gọi W.KVPV_BASIC10.sync() | gọi assert.equal(calls.length, beforeFallback+1) để kiểm tra hai giá trị bằng nhau
now+=2;const beforeFallback=calls.length;W.KVPV_BASIC10.sync();assert.equal(calls.length,beforeFallback+1);assert.equal(calls.at(-1),8001);
// [VI dòng gốc 36] cập nhật bằng toán tử += now bằng 1100 | gọi W.KVPV_BASIC10.sync() | gọi assert.equal(calls.at(-1), 1001) để kiểm tra hai giá trị bằng nhau
now+=1100;W.KVPV_BASIC10.sync();assert.equal(calls.at(-1),1001);
// [VI dòng gốc 37] Chú thích gốc của tác giả; không được thực thi. Nội dung: Không tiêu thụ hồi chiêu TH qua bộ chọn khi cổng combat đang khóa.
// Không tiêu thụ hồi chiêu TH qua bộ chọn khi cổng combat đang khóa.
// [VI dòng gốc 38] gán cooldown bằng true | gán s._rtt[0][1] bằng 0 | Khai báo biến không gán lại bằng const: beforeReady = đọc s._rtt[0][1] | gọi assert.equal(s.selectSkill(), -1) để kiểm tra hai giá trị bằng nhau
cooldown=true;s._rtt[0][1]=0;const beforeReady=s._rtt[0][1];assert.equal(s.selectSkill(),-1);assert.equal(s._rtt[0][1],beforeReady);
// [VI dòng gốc 39] gán cooldown bằng false | gọi W.KVPV_BASIC10.stop() để dừng bộ điều khiển và dọn tài nguyên
cooldown=false;W.KVPV_BASIC10.stop();
// [VI dòng gốc 40] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 41] Chú thích gốc của tác giả; không được thực thi. Nội dung: Toàn bộ đòn thường đã học đều tới lượt; không chỉ spam hàng đầu danh sách.
// Toàn bộ đòn thường đã học đều tới lượt; không chỉ spam hàng đầu danh sách.
// [VI dòng gốc 42] gán s._rtt bằng [[1001,0,1000],[1002,0,1000],[8001,0,1],[8002,0,1],[8003,0,1]]
s._rtt=[[1001,0,1000],[1002,0,1000],[8001,0,1],[8002,0,1],[8003,0,1]];
// [VI dòng gốc 43] cập nhật bằng toán tử += now bằng 10 | Khai báo biến không gán lại bằng const: rotationStart = đọc calls.length | gọi W.KVPV_BASIC10.start() để khởi động bộ điều khiển
now+=10;const rotationStart=calls.length;W.KVPV_BASIC10.start();
// [VI dòng gốc 44] Lặp for: khởi tạo let i=0; tiếp tục khi i<9; sau mỗi vòng i++. | Khai báo biến có thể gán lại bằng let: i = 0 | cập nhật bằng toán tử += now bằng 2 | gọi W.KVPV_BASIC10.sync()
for(let i=0;i<9;i++){now+=2;W.KVPV_BASIC10.sync();}
// [VI dòng gốc 45] Khai báo biến không gán lại bằng const: rotation = gọi calls.slice(rotationStart) để lấy một đoạn dữ liệu | gọi assert(rotation.includes(8001)) để kiểm tra điều kiện của bài test | gọi assert(rotation.includes(8002)) để kiểm tra điều kiện của bài test | gọi assert(rotation.includes(8003)) để kiểm tra điều kiện của bài test
const rotation=calls.slice(rotationStart);assert(rotation.includes(8001));assert(rotation.includes(8002));assert(rotation.includes(8003));assert(rotation.includes(1001));assert(rotation.includes(1002));
// [VI dòng gốc 46] gọi W.KVPV_BASIC10.stop() để dừng bộ điều khiển và dọn tài nguyên
W.KVPV_BASIC10.stop();
// [VI dòng gốc 47] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 48] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 49] Chú thích gốc của tác giả; không được thực thi. Nội dung: Road Trial: native combat owns selector/casting; script only approaches and retargets.
// Road Trial: native combat owns selector/casting; script only approaches and retargets.
// [VI dòng gốc 50] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng {. Đọc cùng dòng mở phía trên: {
{
// [VI dòng gốc 51] Khai báo biến không gán lại bằng const: Move = tạo hàm với tham số (không có); moves = tạo mảng gồm 0 vị trí: [] | Khai báo biến có thể gán lại bằng let: actorPos = tạo đối tượng gồm x, y; found = true; searches = 0 | Khai báo biến không gán lại bằng const: bossPos = tạo đối tượng gồm x, y
 const Move=function(){},moves=[];let actorPos={x:300,y:0},found=true,searches=0;const bossPos={x:0,y:0};
// [VI dòng gốc 52] gán W._d._Yct._zet bằng Move | gán W._ft bằng {_po:{ins:{getCfgById:()=>[0,0,0,0,0,0,0,41]}}} | gán W._C._Mn bằng {_Cn:{currentID:2518}} | gán W._Ba._cm bằng {_q3t:{ins:{getHasTeamByType:t=>t===1}}}
 W._d._Yct._zet=Move;W._ft={_po:{ins:{getCfgById:()=>[0,0,0,0,0,0,0,41]}}};W._C._Mn={_Cn:{currentID:2518}};W._Ba._cm={_q3t:{ins:{getHasTeamByType:t=>t===1}}};
// [VI dòng gốc 53] gán role.property bằng {get:k=>k==='position'?actorPos:null} | gán c.target bằng {property:{get:k=>k==='position'?bossPos:null}} | gán c.isValidTarget bằng ()=>found | gán W._Ba._rJ._O$.ins.selectTar bằng ()=>searches++
 role.property={get:k=>k==='position'?actorPos:null};c.target={property:{get:k=>k==='position'?bossPos:null}};c.isValidTarget=()=>found;W._Ba._rJ._O$.ins.selectTar=()=>searches++;
// [VI dòng gốc 54] Khai báo biến không gán lại bằng const: mover = tạo đối tượng gồm moveTo | gọi moves.push([x,y]) để thêm phần tử vào cuối mảng | gán role.getComponent bằng t=>t===Skill?s:t===Combat?c:t===Move?mover:null
 const mover={moveTo(x,y){moves.push([x,y]);}};role.getComponent=t=>t===Skill?s:t===Combat?c:t===Move?mover:null;
// [VI dòng gốc 55] gán cooldown bằng false | gán inRange bằng true | gán inside bằng false | cập nhật bằng toán tử += now bằng 1000
 cooldown=false;inRange=true;inside=false;now+=1000;const prior=calls.length;W.KVPV_BASIC10.start();
// [VI dòng gốc 56] gọi assert.equal(calls.length, prior) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(moves.length, 1) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(s._f7t, nativeSelector) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(c.combat, nativeCombat) để kiểm tra hai giá trị bằng nhau
 assert.equal(calls.length,prior);assert.equal(moves.length,1);assert.equal(s._f7t,nativeSelector);assert.equal(c.combat,nativeCombat);assert.equal(W.KVPV_BASIC10.status().intervalMs,100);
// [VI dòng gốc 57] Lặp for: khởi tạo let i=0; tiếp tục khi i<20; sau mỗi vòng i++. | Khai báo biến có thể gán lại bằng let: i = 0 | cập nhật bằng toán tử += now bằng 1 | gọi W.KVPV_BASIC10.sync()
 for(let i=0;i<20;i++){now+=1;W.KVPV_BASIC10.sync();}assert.equal(moves.length,1);assert.equal(calls.length,prior);
// [VI dòng gốc 58] gán actorPos bằng {x:70,y:0} | gán s._rtt bằng [[1001,0,1000],[8001,0,50]] | Khai báo biến không gán lại bằng const: rowsBefore = gọi JSON.stringify(s._rtt) để chuyển giá trị thành chuỗi JSON
 mover.running=()=>true;now+=1000;W.KVPV_BASIC10.sync();assert.equal(moves.length,1);delete mover.running;
 actorPos={x:70,y:0};s._rtt=[[1001,0,1000],[8001,0,50]];const rowsBefore=JSON.stringify(s._rtt);
// [VI dòng gốc 59] Lặp for: khởi tạo let i=0; tiếp tục khi i<20; sau mỗi vòng i++. | Khai báo biến có thể gán lại bằng let: i = 0 | cập nhật bằng toán tử += now bằng 100 | gọi W.KVPV_BASIC10.sync()
 for(let i=0;i<20;i++){now+=100;W.KVPV_BASIC10.sync();}assert.equal(calls.length,prior);assert.equal(JSON.stringify(s._rtt),rowsBefore);assert.equal(W.KVPV_BASIC10.status().reason,'road_native_combat');
// [VI dòng gốc 60] gán cooldown bằng true | cập nhật bằng toán tử += now bằng 1000 | gọi W.KVPV_BASIC10.sync() | gọi assert.equal(c.isCooldown(), true) để kiểm tra hai giá trị bằng nhau
 cooldown=true;now+=1000;W.KVPV_BASIC10.sync();assert.equal(c.isCooldown(),true);assert.equal(calls.length,prior);cooldown=false;
// [VI dòng gốc 61] gọi c.combat(1001) | gọi assert.equal(calls.length, prior+1) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(calls.at(-1), 1001) để kiểm tra hai giá trị bằng nhau
 c.combat(1001);assert.equal(calls.length,prior+1);assert.equal(calls.at(-1),1001);
// [VI dòng gốc 62] gán found bằng false | cập nhật bằng toán tử += now bằng 500 | gọi W.KVPV_BASIC10.sync() | gọi assert.equal(searches, 1) để kiểm tra hai giá trị bằng nhau
 found=false;now+=500;W.KVPV_BASIC10.sync();assert.equal(searches,1);now+=10;W.KVPV_BASIC10.sync();assert.equal(searches,1);
// [VI dòng gốc 63] gọi assert.equal(W.KVPV_BASIC10.status().roadMelee.nativeCombat, true) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(W.KVPV_BASIC10.status().roadMelee.nativeCooldownBypass, false) để kiểm tra hai giá trị bằng nhau
 assert.equal(W.KVPV_BASIC10.status().roadMelee.nativeCombat,true);assert.equal(W.KVPV_BASIC10.status().roadMelee.nativeCooldownBypass,false);
// [VI dòng gốc 64] gán W.KVPV_ROAD_CADENCE bằng {enabled:true,combatMode:'basic8001'} | gán found bằng true | cập nhật bằng toán tử += now bằng 1000 | gọi W.KVPV_BASIC10.sync()
 W.KVPV_ROAD_CADENCE={enabled:true,combatMode:'basic8001'};found=true;now+=1000;W.KVPV_BASIC10.sync();const beforeBasic=calls.length;const beforeTH=s._rtt[0][1];assert.equal(s.selectSkill(),8001);assert.equal(s._rtt[0][1],beforeTH);assert.equal(s._rtt[1][1],now+50);assert.equal(calls.length,beforeBasic);cooldown=true;assert.equal(c.isCooldown(),true);cooldown=false;W.KVPV_ROAD_CADENCE.combatMode='native';W.KVPV_BASIC10.sync();assert.equal(s._f7t,nativeSelector);W.KVPV_ROAD_CADENCE.enabled=false;W.KVPV_BASIC10.sync();assert.equal(W.KVPV_BASIC10.status().reason,'road_support_disabled');W.KVPV_ROAD_CADENCE.enabled=true;
// [VI dòng gốc 65] gán W.KVPV_ROAD_CADENCE.minCastIntervalMs bằng 500 | gán W.KVPV_ROAD_CADENCE.combatMode bằng 'native' | cập nhật bằng toán tử += now bằng 1000 | gọi W.KVPV_BASIC10.sync()
  W.KVPV_ROAD_CADENCE.minCastIntervalMs=500;W.KVPV_ROAD_CADENCE.combatMode='native';now+=1000;W.KVPV_BASIC10.sync();const pacedStart=calls.length;c.combat(8001);for(let i=0;i<20;i++)c.combat(8001);assert.equal(calls.length,pacedStart+1);const paceRows=JSON.stringify(s._rtt);assert.equal(s.selectSkill(),-1);assert.equal(JSON.stringify(s._rtt),paceRows);now+=499;c.combat(8001);assert.equal(calls.length,pacedStart+1);now+=1;c.combat(8001);assert.equal(calls.length,pacedStart+2);cooldown=true;assert.equal(c.isCooldown(),true);cooldown=false;W.KVPV_ROAD_CADENCE.minCastIntervalMs=0;W.KVPV_BASIC10.sync();assert.equal(c.combat,nativeCombat);assert.equal(s._f7t,nativeSelector);
// [VI dòng gốc 66] gán W._ft._po.ins.getCfgById bằng ()=>[0,0,0,0,0,0,0,0] | gán found bằng true | cập nhật bằng toán tử += now bằng 1000 | gọi W.KVPV_BASIC10.sync()
 const beforeAnimationCombat=c.combat,animationScales=[],clip={_nt:1};Object.defineProperty(clip,'timeScale',{set(v){this._nt=v;}});const avatar={getCurAction:clip,getActionTween(name,reset,scale){animationScales.push(scale);clip._nt=scale;return {};}};const originalTween=avatar.getActionTween;c.owner=role;c._Qrt=avatar;c._mvt=()=>[0,0,0,0,0,'attack'];c.combat=function(id){avatar.getActionTween('attack',true,1);calls.push(id);};const animationNative=c.combat;let animationFactor=99;W.KVPV_TH300={status:()=>({basicAnimationSpeed:animationFactor})};W.KVPV_ROAD_CADENCE.combatMode='basic8001';now+=1000;W.KVPV_BASIC10.sync();const animationRows=JSON.stringify(s._rtt);c.combat(8001);assert.equal(animationScales.at(-1),99);assert.equal(avatar.getActionTween,originalTween);assert.equal(JSON.stringify(s._rtt),animationRows);c.combat(1001);assert.equal(animationScales.at(-1),1);cooldown=true;assert.equal(c.isCooldown(),true);cooldown=false;c.combat(8001);assert.equal(clip._nt,99);animationFactor=1;W.KVPV_BASIC10.sync();assert.equal(c.combat,animationNative);assert.equal(clip._nt,1);c.combat=beforeAnimationCombat;delete W.KVPV_TH300;
 actorPos={x:0,y:0};cooldown=true;W.KVPV_ROAD_CADENCE.fast1ms=true;W.KVPV_ROAD_CADENCE.selectSkill1ms=()=>{throw Error('Legacy 1ms dispatch must not run');};const noFastCalls=calls.length;now+=1;W.KVPV_BASIC10.sync();now+=1;W.KVPV_BASIC10.sync();assert.equal(calls.length,noFastCalls);assert.equal(W.KVPV_BASIC10.status().intervalMs,100);cooldown=false;
 vm.runInNewContext(fs.readFileSync(__dirname+'/src/59-road-cadence.js','utf8'),{window:W,Date:Clock});
 assert.equal(W.KVPV_ROAD_CADENCE.fast1ms,false);assert.equal(W.KVPV_ROAD_CADENCE.minCastIntervalMs,100);
 W.KVPV_ROAD_CADENCE.setMinCastInterval(1);assert.equal(W.KVPV_ROAD_CADENCE.status().minCastIntervalMs,100);
 now+=1000;const stableStart=calls.length;W.KVPV_BASIC10.sync();assert.equal(calls.length,stableStart);assert.equal(W.KVPV_BASIC10.status().intervalMs,100);
 s._rtt=[[1001,0,1000],[8001,0,50]];const firstStable=s.selectSkill();assert.equal(firstStable,1001);c.combat(firstStable);assert.equal(calls.length,stableStart+1);
 now+=1;const lockedRows=JSON.stringify(s._rtt);assert.equal(s.selectSkill(),-1);assert.equal(JSON.stringify(s._rtt),lockedRows);c.combat(8001);assert.equal(calls.length,stableStart+1);
 now+=99;const nextStable=s.selectSkill();assert.equal(nextStable,8001);c.combat(nextStable);assert.equal(calls.length,stableStart+2);
 W.KVPV_ROAD_CADENCE.stop();W.KVPV_BASIC10.sync();assert.equal(c.combat,nativeCombat);assert.equal(s._f7t,nativeSelector);
 W._ft._po.ins.getCfgById=()=>[0,0,0,0,0,0,0,0];found=true;now+=1000;W.KVPV_BASIC10.sync();assert.notEqual(s._f7t,nativeSelector);W.KVPV_BASIC10.stop();assert.equal(s._f7t,nativeSelector);assert.equal(c.combat,nativeCombat);
// [VI dòng gốc 67] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 68] gọi console.log('PASS Road Trial: native selector/combat unchanged, no script dispatch or skill row mutation, native cooldown, bounded a…)
console.log('PASS Road Trial: native selector/combat unchanged, no script dispatch or skill row mutation, native cooldown, bounded approach/retarget and scope restoration.');
