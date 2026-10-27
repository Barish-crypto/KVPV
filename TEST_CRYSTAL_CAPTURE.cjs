// [VI dòng gốc 1] "use strict" | Khai báo biến không gán lại bằng const: fs = gọi require('node:fs') để nạp module Node.js; vm = gọi require('node:vm') để nạp module Node.js; assert = gọi require('node:assert/strict') để nạp module Node.js | Khai báo biến có thể gán lại bằng let: calls = 0; now = 1
'use strict';const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');let calls=0,now=1;
// [VI dòng gốc 2] Định nghĩa lớp Room. | tăng calls một đơn vị sau khi lấy giá trị | Kết thúc hàm hiện tại và trả về: đọc arg[0].
class Room{creSerAreRoom(arg){calls++;return arg[0];}startTeamBossCopy(){calls++;}}
// [VI dòng gốc 3] Định nghĩa lớp Model. | tăng calls một đơn vị sau khi lấy giá trị | gán this.data bằng arg
class Model{setSceneInfo(arg){calls++;this.data=arg;}setTrigramCopyInfo(){calls++;}}
// [VI dòng gốc 4] Khai báo biến không gán lại bằng const: room = tạo đối tượng bằng Room(); model = tạo đối tượng bằng Model(); W = tạo đối tượng gồm __KVPV_OWN_ACTOR_ID, _Ba, setInterval, clearInterval
const room=new Room(),model=new Model(),W={__KVPV_OWN_ACTOR_ID:'10228867268946',_Ba:{_rJ:{_O$:{ins:{actorId:'10228867268946'}}},_cm:{_u3t:{ins:room}},_n4t:{_t4t:{ins:model}}},setInterval:()=>1,clearInterval(){}};
// [VI dòng gốc 5] Khai báo biến không gán lại bằng const: source = gọi fs.readFileSync(__dirname+'/src/55-crystal-capture.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm, ''); run = tạo hàm với tham số (không có); mỗi lần gọi trả về gọi vm.runInNewContext(source, {window:W,Date:{now:()=>now}}) để chạy mã trong ngữ cảnh máy ảo dùng cho kiểm thử | gọi run() | gọi assert.equal(calls, 0) để kiểm tra hai giá trị bằng nhau | gọi assert(W.KVPV_CRYSTAL_CAPTURE.status().active) để kiểm tra điều kiện của bài test
const source=fs.readFileSync(__dirname+'/src/55-crystal-capture.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,''),run=()=>vm.runInNewContext(source,{window:W,Date:{now:()=>now}});run();assert.equal(calls,0);assert(W.KVPV_CRYSTAL_CAPTURE.status().active);
// [VI dòng gốc 6] gọi assert.equal(room.creSerAreRoom([6,'room',2702,1]), 6) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(calls, 1) để kiểm tra hai giá trị bằng nhau | gọi model.setSceneInfo([123]) | gọi assert.equal(calls, 2) để kiểm tra hai giá trị bằng nhau
assert.equal(room.creSerAreRoom([6,'room',2702,1]),6);assert.equal(calls,1);model.setSceneInfo([123]);assert.equal(calls,2);assert.equal(W.__KVPV_CRYSTAL_CAPTURE_20261024_SESSION2.records.length,2);
// [VI dòng gốc 7] gọi assert.equal(W.KVPV_CRYSTAL_CAPTURE.status().records[0].method, 'creSerAreRoom') để kiểm tra hai giá trị bằng nhau | gọi room.startTeamBossCopy([2]) | gọi assert.equal(W.__KVPV_CRYSTAL_CAPTURE_20261024_SESSION2.records.length, 2) để kiểm tra hai giá trị bằng nhau | Khai báo biến không gán lại bằng const: before = đọc W.__KVPV_CRYSTAL_CAPTURE_20261024_SESSION2.until
assert.equal(W.KVPV_CRYSTAL_CAPTURE.status().records[0].method,'creSerAreRoom');room.startTeamBossCopy([2]);assert.equal(W.__KVPV_CRYSTAL_CAPTURE_20261024_SESSION2.records.length,2);const before=W.__KVPV_CRYSTAL_CAPTURE_20261024_SESSION2.until;run();assert.equal(W.__KVPV_CRYSTAL_CAPTURE_20261024_SESSION2.until,before);assert.equal(calls,3);
// [VI dòng gốc 8] gán now bằng 900002 | gọi W.KVPV_CRYSTAL_CAPTURE.status() để trả trạng thái để kiểm tra | gọi assert.equal(room.creSerAreRoom, Room.prototype.creSerAreRoom) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(model.setSceneInfo, Model.prototype.setSceneInfo) để kiểm tra hai giá trị bằng nhau
now=900002;W.KVPV_CRYSTAL_CAPTURE.status();assert.equal(room.creSerAreRoom,Room.prototype.creSerAreRoom);assert.equal(model.setSceneInfo,Model.prototype.setSceneInfo);assert.equal(calls,3);
// [VI dòng gốc 9] gọi console.log('PASS crystal capture: no autonomous request, native result preserved, type filter, reload deadline, expiry restores hoo…)
console.log('PASS crystal capture: no autonomous request, native result preserved, type filter, reload deadline, expiry restores hooks.');
// [VI dòng gốc 10] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 11] gán now bằng 1 | gọi run() | Khai báo biến không gán lại bằng const: data = đọc W.__KVPV_CRYSTAL_CAPTURE_20261024_SESSION2 | gán data.records bằng []
now=1;run();const data=W.__KVPV_CRYSTAL_CAPTURE_20261024_SESSION2;data.records=[];room.creSerAreRoom([6,'room',2702,1]);for(let i=0;i<80;i++)model.setSceneInfo([i]);assert.equal(data.records.length,48);assert.equal(data.records[0].method,'creSerAreRoom');assert.equal(data.records.at(-1).args[0][0],79);
// [VI dòng gốc 12] gọi console.log('PASS capture retains outgoing commands during repeated scene updates.')
console.log('PASS capture retains outgoing commands during repeated scene updates.');
// [VI dòng gốc 13] Dòng trống để tách các phần, không có lệnh thực thi.
