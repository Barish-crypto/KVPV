// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: Kiểm thử mô phỏng: EIGHT_FLOOR. Các assert bên dưới ghi điều kiện phải giữ; không chứng minh máy chủ game chấp nhận tốc độ hoặc tầm đánh. [đóng chú thích]
/* Kiểm thử mô phỏng: EIGHT_FLOOR. Các assert bên dưới ghi điều kiện phải giữ; không chứng minh máy chủ game chấp nhận tốc độ hoặc tầm đánh. */
// [VI dòng gốc 2] Khai báo biến không gán lại bằng const: fs = gọi require('node:fs') để nạp module Node.js; vm = gọi require('node:vm') để nạp module Node.js; assert = gọi require('node:assert/strict') để nạp module Node.js
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
// [VI dòng gốc 3] Khai báo biến có thể gán lại bằng let: now = gọi Date.parse('2026-10-21T14:05:00Z') để phân tích dữ liệu đầu vào theo API đang gọi; type = 0; open = false; unlocked = true; busy = false; claimCount = 0; rank = tạo mảng gồm 3 vị trí: [1,1,0]
let now=Date.parse('2026-10-21T14:05:00Z'),type=0,open=false,unlocked=true,busy=false,claimCount=0,rank=[1,1,0];
// [VI dòng gốc 4] Định nghĩa lớp Clock kế thừa Date. | gọi super(...(args.length?args:[now])) | Kết thúc hàm hiện tại và trả về: now.
class Clock extends Date{constructor(...args){super(...(args.length?args:[now]));}static now(){return now;}}
// [VI dòng gốc 5] Khai báo biến không gán lại bằng const: entries = tạo mảng gồm 0 vị trí: []; targets = tạo mảng gồm 0 vị trí: []; stage = tạo đối tượng gồm auto; m = tạo đối tượng gồm curLayer, isPass, nxtEnterTime, getRankInfo, getSpeBossInfo, setAutoTarget, setFirstBoss
const entries=[],targets=[],stage={auto:true},m={curLayer:1,isPass:false,nxtEnterTime:0,getRankInfo:()=>rank,
// [VI dòng gốc 6] Thuộc tính getSpeBossInfo: tạo hàm với tham số (không có); mỗi lần gọi trả về tạo mảng gồm 4 vị trí: [0,'boss',true,false] | Thuộc tính setAutoTarget: tạo hàm với tham số id; mỗi lần gọi trả về gọi targets.push(id) để thêm phần tử vào cuối mảng | Thuộc tính setFirstBoss: tạo hàm với tham số (không có)
  getSpeBossInfo:()=>[0,'boss',true,false],setAutoTarget:(id)=>targets.push(id),setFirstBoss(){}};
// [VI dòng gốc 7] Khai báo biến không gán lại bằng const: W = tạo đối tượng gồm __KVPV_OWN_ACTOR_ID, _Ba, _C, _ft, _Sa, KVPV, KVPV_DAILY, KVPV_TQ_SCOPE, setInterval, clearInterval
const W={__KVPV_OWN_ACTOR_ID:'12345',_Ba:{_rJ:{_O$:{ins:{actorId:'12345'}}},_Co:{_Mo:{ins:stage}},
// [VI dòng gốc 8] tăng claimCount một đơn vị sau khi lấy giá trị
  _t8:{_w_t:{ins:m},_Scn:{ins:{getRankInfo(){},getMyAwards(){claimCount++;}}}},
// [VI dòng gốc 9] Thuộc tính _$a: tạo đối tượng gồm SceneUtil | Thuộc tính SceneUtil: tạo đối tượng gồm isCommonScene | Thuộc tính isCommonScene: true | Thuộc tính _sst: tạo đối tượng gồm _ist, _Cht
  _$a:{SceneUtil:{isCommonScene:true}},_sst:{_ist:{inst:{getCpSceneStateByType:()=>[0,0,open?2:0]}},_Cht:{inst:{rqEtScene:id=>entries.push(id)}}},_Do:{_Ho:{inst:{getFcIsOpen:id=>id===903&&unlocked}}}},
// [VI dòng gốc 10] Khai báo biến không gán lại bằng const: a = tạo mảng gồm 0 vị trí: [] | gán a[7] bằng type | Kết thúc hàm hiện tại và trả về: a.
  _C:{_Mn:{_Cn:{currentID:7101}}},_ft:{_po:{ins:{getCfgById:()=>{const a=[];a[7]=type;return a;}}}},_Sa:{svrTime:now},
// [VI dòng gốc 11] Thuộc tính KVPV: tạo đối tượng gồm core | Thuộc tính core: tạo đối tượng gồm scene | Thuộc tính scene: tạo đối tượng gồm acquire, renew, release | Thuộc tính acquire: tạo hàm với tham số (không có); mỗi lần gọi trả về đảo giá trị đúng/sai của busy
  KVPV:{core:{scene:{acquire:()=>!busy,renew(){},release(){}}}},KVPV_DAILY:{quickState:()=>({job:busy?'other job':'rảnh'})},KVPV_TQ_SCOPE:{inside:()=>false},setInterval:()=>1,clearInterval(){}};
// [VI dòng gốc 12] gọi vm.runInNewContext(fs.readFileSync(__dirname+'/src/14-eight-floor.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,''), {window:W,I…) để chạy mã trong ngữ cảnh máy ảo dùng cho kiểm thử
vm.runInNewContext(fs.readFileSync(__dirname+'/src/14-eight-floor.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,''),{window:W,Intl,Date:Clock});
// [VI dòng gốc 13] Khai báo biến không gán lại bằng const: auto = đọc W.KVPV_EIGHT_FLOOR | gọi assert.equal(entries.length, 0) để kiểm tra hai giá trị bằng nhau
const auto=W.KVPV_EIGHT_FLOOR;assert.equal(entries.length,0);
// [VI dòng gốc 14] gán open bằng true | gán unlocked bằng false | gọi auto.sync() | gọi assert.equal(entries.length, 0) để kiểm tra hai giá trị bằng nhau
open=true;unlocked=false;auto.sync();assert.equal(entries.length,0);
// [VI dòng gốc 15] gán unlocked bằng true | gán busy bằng true | gọi auto.sync() | gọi assert.equal(entries.length, 0) để kiểm tra hai giá trị bằng nhau
unlocked=true;busy=true;auto.sync();assert.equal(entries.length,0);
// [VI dòng gốc 16] gán busy bằng false | gọi auto.sync() | gọi assert.deepEqual(entries, [7101]) để kiểm tra cấu trúc hai giá trị tương đương | gọi assert.equal(stage.auto, false) để kiểm tra hai giá trị bằng nhau
busy=false;auto.sync();assert.deepEqual(entries,[7101]);assert.equal(stage.auto,false);assert.equal(auto.status().confirmedEntries,0);
// [VI dòng gốc 17] gọi auto.sync() | gọi assert.equal(entries.length, 1) để kiểm tra hai giá trị bằng nhau
auto.sync();assert.equal(entries.length,1);
// [VI dòng gốc 18] gán type bằng 71 | gọi auto.sync() | gọi assert.equal(auto.status().confirmedEntries, 1) để kiểm tra hai giá trị bằng nhau | gọi assert.deepEqual(targets, [1]) để kiểm tra cấu trúc hai giá trị tương đương
type=71;auto.sync();assert.equal(auto.status().confirmedEntries,1);assert.deepEqual(targets,[1]);
// [VI dòng gốc 19] gán rank bằng [1,1,1] | gọi auto.sync() | gọi assert.equal(claimCount, 1) để kiểm tra hai giá trị bằng nhau
rank=[1,1,1];auto.sync();auto.sync();assert.equal(claimCount,1);assert.equal(auto.status().rewardConfirmed,0);
// [VI dòng gốc 20] gán rank bằng [1,1,2] | gọi auto.sync() | gọi assert.equal(auto.status().rewardConfirmed, 1) để kiểm tra hai giá trị bằng nhau
rank=[1,1,2];auto.sync();assert.equal(auto.status().rewardConfirmed,1);
// [VI dòng gốc 21] gán m.curLayer bằng 8 | gán m.isPass bằng true | gọi auto.sync() | gọi assert.equal(auto.status().phase, 'EXITING') để kiểm tra hai giá trị bằng nhau
m.curLayer=8;m.isPass=true;auto.sync();assert.equal(auto.status().phase,'EXITING');assert.equal(entries.at(-1),0);assert.equal(auto.status().doneToday,true);const afterComplete=entries.length;auto.sync();assert.equal(entries.length,afterComplete);
// [VI dòng gốc 22] gán now bằng Date.parse('2026-10-21T14:31:00Z') | gán open bằng false | gọi auto.sync() | cập nhật bằng toán tử += now bằng 35001
now=Date.parse('2026-10-21T14:31:00Z');open=false;auto.sync();now+=35001;auto.sync();assert.equal(entries.at(-1),0);
// [VI dòng gốc 23] gán type bằng 0 | gọi auto.sync() | gọi assert.equal(stage.auto, true) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(auto.status().phase, 'WAITING') để kiểm tra hai giá trị bằng nhau
type=0;auto.sync();assert.equal(stage.auto,true);assert.equal(auto.status().phase,'WAITING');
// [VI dòng gốc 24] gán open bằng true | gán m.isPass bằng false | gán now bằng Date.parse('2026-10-21T14:20:00Z') | gọi auto.sync()
open=true;m.isPass=false;now=Date.parse('2026-10-21T14:20:00Z');auto.sync();assert.equal(entries.length,afterComplete);assert.equal(auto.status().reason,'completed_and_rewarded_today');
// [VI dòng gốc 25] gọi auto.stop() để dừng bộ điều khiển và dọn tài nguyên | gọi assert.equal(auto.status().enabled, false) để kiểm tra hai giá trị bằng nhau
auto.stop();assert.equal(auto.status().enabled,false);
// [VI dòng gốc 26] gọi console.log('PASS Eight Floor: native opening/unlock/idle gates, bounded entry, scene ACK, target, rank claim once + ACK, completed …)
console.log('PASS Eight Floor: native opening/unlock/idle gates, bounded entry, scene ACK, target, rank claim once + ACK, completed floor, timed exit and restore');
// [VI dòng gốc 27] Dòng trống để tách các phần, không có lệnh thực thi.
