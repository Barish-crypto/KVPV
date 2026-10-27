// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: Phạm vi Tru Tiên chỉ mở trong map có cấu hình loại 52 và entry khớp map thực tế. [đóng chú thích]
/* Phạm vi Tru Tiên chỉ mở trong map có cấu hình loại 52 và entry khớp map thực tế. */
// [VI dòng gốc 2] "use strict"
'use strict';
// [VI dòng gốc 3] Khai báo biến không gán lại bằng const: fs = gọi require('node:fs') để nạp module Node.js; vm = gọi require('node:vm') để nạp module Node.js; assert = gọi require('node:assert/strict') để nạp module Node.js
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
// [VI dòng gốc 4] Khai báo biến không gán lại bằng const: source = gọi fs.readFileSync('src/00-far-scope.js', 'utf8') để đọc tệp đồng bộ
const source=fs.readFileSync('src/00-far-scope.js','utf8');
// [VI dòng gốc 5] Khai báo biến có thể gán lại bằng let: current = 2692; entryMap = 2692; type = 52; common = false; targetType = 1; hp = 10
let current=2692,entryMap=2692,type=52,common=false,targetType=1,hp=10;
// [VI dòng gốc 6] Khai báo biến không gán lại bằng const: entry = tạo đối tượng gồm intoSce | Kết thúc hàm hiện tại và trả về: tạo mảng gồm 4 vị trí: [entryMap,0,0,6].
const entry={get intoSce(){return [entryMap,0,0,6];}};
// [VI dòng gốc 7] Khai báo biến không gán lại bằng const: W = tạo đối tượng gồm _C, _Ba, _ft, KVPV_TQ_SCOPE | Kết thúc hàm hiện tại và trả về: current. | Kết thúc hàm hiện tại và trả về: common.
const W={_C:{_Mn:{_Cn:{get currentID(){return current;}}}},_Ba:{_$a:{_yo:{ins:entry},SceneUtil:{get isCommonScene(){return common;}}}},
// [VI dòng gốc 8] Thuộc tính _ft: tạo đối tượng gồm _po | Thuộc tính _po: tạo đối tượng gồm ins | Thuộc tính ins: tạo đối tượng gồm getCfgById | Thuộc tính getCfgById: tạo hàm với tham số (không có); mỗi lần gọi trả về tạo mảng gồm 8 vị trí: [current,'Tru Tiên',0,0,0,0,0,type]
  _ft:{_po:{ins:{getCfgById:()=>[current,'Tru Tiên',0,0,0,0,0,type]}}},KVPV_TQ_SCOPE:{status:()=>({inside:false})}};
// [VI dòng gốc 9] gọi vm.runInNewContext(source, {window:W}) để chạy mã trong ngữ cảnh máy ảo dùng cho kiểm thử | Khai báo biến không gán lại bằng const: scope = đọc W.KVPV_FAR_SCOPE
vm.runInNewContext(source,{window:W});const scope=W.KVPV_FAR_SCOPE;
// [VI dòng gốc 10] Khai báo biến không gán lại bằng const: target = tạo đối tượng gồm isValid, property
const target={isValid:true,property:{get:k=>({type:targetType,hp:[hp,10],occ:123})[k]}};
// [VI dòng gốc 11] gọi assert.equal(scope.status().kind, 'TRU_TIEN') để kiểm tra hai giá trị bằng nhau | gọi assert.equal(scope.eligible(target), true) để kiểm tra hai giá trị bằng nhau
assert.equal(scope.status().kind,'TRU_TIEN');assert.equal(scope.eligible(target),true);
// [VI dòng gốc 12] gán targetType bằng 4 | gọi assert.equal(scope.eligible(target), false, 'do not include players') để kiểm tra hai giá trị bằng nhau | gán targetType bằng 1 | gán hp bằng 0
targetType=4;assert.equal(scope.eligible(target),false,'do not include players');targetType=1;hp=0;assert.equal(scope.eligible(target),false);hp=10;
// [VI dòng gốc 13] gán entryMap bằng 2691 | gọi assert.equal(scope.inside(), false, 'stale scene entry must not arm combat') để kiểm tra hai giá trị bằng nhau | gán entryMap bằng current
entryMap=2691;assert.equal(scope.inside(),false,'stale scene entry must not arm combat');entryMap=current;
// [VI dòng gốc 14] gán type bằng 41 | gọi assert.equal(scope.inside(), false, 'Road Trial is not Tru Tien') để kiểm tra hai giá trị bằng nhau | gán type bằng 52 | gán common bằng true
type=41;assert.equal(scope.inside(),false,'Road Trial is not Tru Tien');type=52;common=true;assert.equal(scope.inside(),false);common=false;
// [VI dòng gốc 15] gán current bằng 2691 | gán entryMap bằng 2691 | gọi assert.equal(scope.status().kind, 'TRU_TIEN', 'support other native type52 maps') để kiểm tra hai giá trị bằng nhau
current=2691;entryMap=2691;assert.equal(scope.status().kind,'TRU_TIEN','support other native type52 maps');
// [VI dòng gốc 16] gọi console.log('PASS Tru Tien: native scene52 + current entry, no stale/common/PvP/dead targets')
console.log('PASS Tru Tien: native scene52 + current entry, no stale/common/PvP/dead targets');
// [VI dòng gốc 17] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 18] Chú thích gốc của tác giả; không được thực thi. Nội dung: Boss chết/mất mục tiêu: bộ điều phối tìm lại quái, không chọn người và không lặp mỗi tick.
// Boss chết/mất mục tiêu: bộ điều phối tìm lại quái, không chọn người và không lặp mỗi tick.
// [VI dòng gốc 19] chạy ngay hàm bao để tạo phạm vi và khởi tạo phần chức năng bên trong
(() => {
// [VI dòng gốc 20] Khai báo biến có thể gán lại bằng let: clock = 100000; searches = 0; starts = 0; running = false; phase = "OFF"; spawn = true; far = false; enabled = false; inside = true
  let clock=100000,searches=0,starts=0,running=false,phase='OFF',spawn=true,far=false,enabled=false,inside=true;
// [VI dòng gốc 21] Định nghĩa lớp Clock kế thừa Date. | Kết thúc hàm hiện tại và trả về: clock.
  class Clock extends Date{static now(){return clock;}}
// [VI dòng gốc 22] Khai báo biến không gán lại bằng const: monster = tạo đối tượng gồm id, isValid, property; human = tạo đối tượng gồm id
  const monster={id:'monster',isValid:true,property:{get:k=>({id:'monster',occ:900,type:1,hp:[100,100]})[k]}},human={id:'human'};
// [VI dòng gốc 23] Khai báo biến không gán lại bằng const: combat = tạo đối tượng gồm target; role = tạo đối tượng gồm getComponent, property
  const combat={target:human},role={getComponent:()=>combat,property:{get:k=>k==='hp'?[100,100]:null}};
// [VI dòng gốc 24] Khai báo biến không gán lại bằng const: env = tạo đối tượng gồm __KVPV_OWN_ACTOR_ID, console, _Ba, _d, _C, KVPV, KVPV_FAR_SCOPE, KVPV_RANGE281, KVPV_TH300, KVPV_HITRUN1, KVPV_HITRUN_AUTO, setInterval, clearInterval | gọi assert.equal(kind, 1) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(occ, -1) để kiểm tra hai giá trị bằng nhau | tăng searches một đơn vị sau khi lấy giá trị
  const env={__KVPV_OWN_ACTOR_ID:'123456',console:{info(){},warn(){},table(){}},_Ba:{_rJ:{_O$:{ins:{actorId:'123456',isDead:false,selectTar(kind,occ){assert.equal(kind,1);assert.equal(occ,-1);searches++;if(spawn)combat.target=monster;}}}}},
// [VI dòng gốc 25] Thuộc tính _d: tạo đối tượng gồm _Yct | Thuộc tính _Yct: tạo đối tượng gồm _Het | Thuộc tính _Het: tạo hàm với tham số (không có) | Thuộc tính _C: tạo đối tượng gồm _Ba
    _d:{_Yct:{_Het:function(){}}},_C:{_Ba:{instance:{getRole:()=>role}}},KVPV:{combat:{config:{}}},
// [VI dòng gốc 26] Thuộc tính KVPV_FAR_SCOPE: tạo đối tượng gồm status, inside, eligible | Thuộc tính status: tạo hàm với tham số (không có); mỗi lần gọi trả về tạo đối tượng gồm inside, kind, current, floor | Thuộc tính inside: dùng biến cùng tên | Thuộc tính kind: nếu inside thì lấy 'TRU_TIEN', ngược lại lấy 'OUTSIDE'
    KVPV_FAR_SCOPE:{status:()=>({inside,kind:inside?'TRU_TIEN':'OUTSIDE',current:2692,floor:1}),inside:()=>inside,eligible:t=>t===monster},
// [VI dòng gốc 27] Thuộc tính KVPV_RANGE281: tạo đối tượng gồm enable, setTrialRange, status | Thuộc tính enable: tạo hàm với tham số (không có) | Thuộc tính setTrialRange: tạo hàm với tham số (không có) | Thuộc tính status: tạo hàm với tham số (không có); mỗi lần gọi trả về tạo đối tượng gồm enabled, hookAttached
    KVPV_RANGE281:{enable(){},setTrialRange(){},status:()=>({enabled:true,hookAttached:true})},
// [VI dòng gốc 28] gán far bằng true | gán far bằng false
    KVPV_TH300:{start(){far=true;},stop(){far=false;},sync(){},status:()=>({running:far,requestedDistance:302,confirmedSkills:[]})},
// [VI dòng gốc 29] gán running bằng true | gán phase bằng 'FIGHT' | tăng starts một đơn vị sau khi lấy giá trị | gán running bằng false
    KVPV_HITRUN1:{start(){running=true;phase='FIGHT';starts++;},stop(){running=false;phase='OFF';},status:()=>({running,phase,bossId:'monster'})},
// [VI dòng gốc 30] gán enabled bằng true | gán enabled bằng false | gán running bằng false
    KVPV_HITRUN_AUTO:{rearm(){enabled=true;},stop(){enabled=false;running=false;},status:()=>({enabled,timerActive:enabled,lastMode:'waiting-for-boss'})},setInterval:()=>1,clearInterval(){}};
// [VI dòng gốc 31] gọi vm.runInNewContext(fs.readFileSync('src/09-modes.js','utf8'), {window:env,Date:Clock,console:env.console}) để chạy mã trong ngữ cảnh máy ảo dùng cho kiểm thử
  vm.runInNewContext(fs.readFileSync('src/09-modes.js','utf8'),{window:env,Date:Clock,console:env.console});
// [VI dòng gốc 32] gọi env.KVPV_MODE.armTianQuan() để đăng ký bộ theo dõi map để tự bật bộ combat khi vào phó bản phù hợp | gọi assert.equal(searches, 1) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(starts, 1) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(combat.target, monster) để kiểm tra hai giá trị bằng nhau
  env.KVPV_MODE.armTianQuan();assert.equal(searches,1);assert.equal(starts,1);assert.equal(combat.target,monster);
// [VI dòng gốc 33] gán running bằng false | gán phase bằng 'OFF' | gán combat.target bằng human | gán spawn bằng false
  running=false;phase='OFF';combat.target=human;spawn=false;clock+=1000;env.KVPV_MODE.syncMap();const n=searches;
// [VI dòng gốc 34] Lặp for: khởi tạo let i=0; tiếp tục khi i<10; sau mỗi vòng i++. | Khai báo biến có thể gán lại bằng let: i = 0 | cập nhật bằng toán tử += clock bằng 10 | gọi env.KVPV_MODE.syncMap()
  for(let i=0;i<10;i++){clock+=10;env.KVPV_MODE.syncMap();}assert.equal(searches,n,'search at most once per second');
// [VI dòng gốc 35] gán spawn bằng true | cập nhật bằng toán tử += clock bằng 1000 | gọi env.KVPV_MODE.syncMap() | gọi assert.equal(starts, 2, 'same native monster can be reacquired after stale target') để kiểm tra hai giá trị bằng nhau
  spawn=true;clock+=1000;env.KVPV_MODE.syncMap();assert.equal(starts,2,'same native monster can be reacquired after stale target');
// [VI dòng gốc 36] gán combat.target bằng human | gán running bằng false | gán env.__KVPV_USER_UI_UNTIL bằng clock+10000 | cập nhật bằng toán tử += clock bằng 1000
  combat.target=human;running=false;env.__KVPV_USER_UI_UNTIL=clock+10000;clock+=1000;const before=searches;env.KVPV_MODE.syncMap();assert.equal(searches,before,'yield to user UI');
// [VI dòng gốc 37] gán env.__KVPV_USER_UI_UNTIL bằng 0 | gán running bằng true | gán phase bằng 'RETREAT' | cập nhật bằng toán tử += clock bằng 1000
  env.__KVPV_USER_UI_UNTIL=0;running=true;phase='RETREAT';clock+=1000;env.KVPV_MODE.syncMap();assert.equal(searches,before,'do not interrupt healing');
// [VI dòng gốc 38] gán inside bằng false | gán running bằng false | cập nhật bằng toán tử += clock bằng 1000 | gọi env.KVPV_MODE.syncMap()
  inside=false;running=false;clock+=1000;env.KVPV_MODE.syncMap();assert.equal(searches,before,'never search outside Tru Tien');
// [VI dòng gốc 39] gọi env.KVPV_MODE.stop() để dừng bộ điều khiển và dọn tài nguyên | gọi console.log('PASS Tru Tien target reacquisition: native monsters only, bounded searches, handoff after defeat, UI/healing/exit respe…)
  env.KVPV_MODE.stop();console.log('PASS Tru Tien target reacquisition: native monsters only, bounded searches, handoff after defeat, UI/healing/exit respected');
// [VI dòng gốc 40] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: })();
})();
// [VI dòng gốc 41] Dòng trống để tách các phần, không có lệnh thực thi.
