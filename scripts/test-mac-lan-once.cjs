// [VI dòng gốc 1] "use strict" | Khai báo biến không gán lại bằng const: fs = gọi require('node:fs') để nạp module Node.js; vm = gọi require('node:vm') để nạp module Node.js; assert = gọi require('node:assert/strict') để nạp module Node.js | Khai báo biến có thể gán lại bằng let: sends = 0
'use strict';const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');let sends=0;
// [VI dòng gốc 2] Khai báo biến không gán lại bằng const: p = tạo đối tượng gồm roomId, roomMapId, mapLve, isLeader, getHasTeamByType; m = tạo đối tượng gồm remainTimes
const p={roomId:7,roomMapId:2702,mapLve:1,isLeader:true,getHasTeamByType:n=>n===6},m={remainTimes:0};
// [VI dòng gốc 3] Khai báo biến không gán lại bằng const: W = tạo đối tượng gồm __KVPV_OWN_ACTOR_ID, _Ba | gọi assert.equal(a[0], 6) để kiểm tra hai giá trị bằng nhau | tăng sends một đơn vị sau khi lấy giá trị
const W={__KVPV_OWN_ACTOR_ID:'10228867268946',_Ba:{_rJ:{_O$:{ins:{actorId:'10228867268946',isDead:false}}},_cm:{_q3t:{ins:p},_u3t:{ins:{startTeamBossCopy(a){assert.equal(a[0],6);sends++;}}}},_n4t:{_t4t:{ins:m}},_$a:{SceneUtil:{isCommonScene:true},_yo:{ins:{isInMission:false}}}}};
// [VI dòng gốc 4] Khai báo biến không gán lại bằng const: code = gọi fs.readFileSync(__dirname+'/mac-lan-once.js', 'utf8') để đọc tệp đồng bộ | Khai báo biến không gán lại bằng const: load = tạo hàm với tham số (không có); mỗi lần gọi trả về gọi vm.runInNewContext(code, {window:W,Date}) để chạy mã trong ngữ cảnh máy ảo dùng cho kiểm thử | gọi load() | gọi assert.equal(sends, 0) để kiểm tra hai giá trị bằng nhau
const code=fs.readFileSync(__dirname+'/mac-lan-once.js','utf8');const load=()=>vm.runInNewContext(code,{window:W,Date});load();assert.equal(sends,0);assert.equal(W.KVPV_MAC_LAN.start().reason,'no_free_attempt');
// [VI dòng gốc 5] gán m.remainTimes bằng 1 | gán p.mapLve bằng 2 | gọi assert(!W.KVPV_MAC_LAN.start().ok) để kiểm tra điều kiện của bài test | gán p.mapLve bằng 1
m.remainTimes=1;p.mapLve=2;assert(!W.KVPV_MAC_LAN.start().ok);p.mapLve=1;p.isLeader=false;assert(!W.KVPV_MAC_LAN.start().ok);p.isLeader=true;
// [VI dòng gốc 6] gọi assert(W.KVPV_MAC_LAN.start().ok) để kiểm tra điều kiện của bài test | gọi assert.equal(sends, 1) để kiểm tra hai giá trị bằng nhau | gọi assert(!W.KVPV_MAC_LAN.start().ok) để kiểm tra điều kiện của bài test | gọi load()
assert(W.KVPV_MAC_LAN.start().ok);assert.equal(sends,1);assert(!W.KVPV_MAC_LAN.start().ok);load();assert(!W.KVPV_MAC_LAN.start().ok);assert.equal(sends,1);
// [VI dòng gốc 7] gọi console.log('PASS Mac Lan: no startup request, correct room/account/quota, once only across reload.')
console.log('PASS Mac Lan: no startup request, correct room/account/quota, once only across reload.');
// [VI dòng gốc 8] Dòng trống để tách các phần, không có lệnh thực thi.
