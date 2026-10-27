// [VI dòng gốc 1] "use strict"
'use strict';
// [VI dòng gốc 2] Khai báo biến không gán lại bằng const: fs = gọi require('fs') để nạp module Node.js; vm = gọi require('vm') để nạp module Node.js; assert = gọi require('assert/strict') để nạp module Node.js; src = gọi fs.readFileSync('src/51-demon-king-recovery.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm, '') | Khai báo biến có thể gán lại bằng let: now = 10000 | Định nghĩa lớp Clock kế thừa Date. | Kết thúc hàm hiện tại và trả về: now.
const fs=require('fs'),vm=require('vm'),assert=require('assert/strict'),src=fs.readFileSync('src/51-demon-king-recovery.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,'');let now=10000;class Clock extends Date{static now(){return now;}}
// [VI dòng gốc 3] Khai báo biến không gán lại bằng const: timers = tạo đối tượng bằng Map() | Khai báo biến có thể gán lại bằng let: retargets = 0; serial = 0; exits = 0; flag = true; common = false; owner = null; job = "rảnh"; type = 10
const timers=new Map();let retargets=0,serial=0,exits=0,flag=true,common=false,owner=null,job='rảnh',type=10;
// [VI dòng gốc 4] Khai báo biến không gán lại bằng const: W = tạo đối tượng gồm __KVPV_OWN_ACTOR_ID, setInterval, clearInterval, _C, _Ba, _ft, KVPV_DAILY, KVPV | gọi timers.set(++serial, fn) | Kết thúc hàm hiện tại và trả về: serial. | gọi assert.equal(type, 1) để kiểm tra hai giá trị bằng nhau
const W={__KVPV_OWN_ACTOR_ID:'12345',setInterval:fn=>{timers.set(++serial,fn);return serial;},clearInterval:id=>timers.delete(id),_C:{_Mn:{_Cn:{currentID:2101}}},_Ba:{_rJ:{_O$:{ins:{actorId:'12345',selectTar(type,id){assert.equal(type,1);assert.equal(id,920004);retargets++;}}}},_$a:{_yo:{ins:{intoSce:[2101,0,0,4]}},SceneUtil:{curScene:10,get isCommonScene(){return common;}},_Gr:{ins:{exitDungeon(){exits++;}}}},_sst:{_ist:{inst:{getBsInfoById:id=>{assert.equal(id,920004,'actual entry level, not current era');return [0,0,[flag]];}}}}},_ft:{_po:{ins:{getCfgById:()=>{const r=[];r[7]=type;return r;}}},_$st:{ins:{getCfgByMapIdAndLv:(map,level)=>[map,level,920004]}}},KVPV_DAILY:{quickState:()=>({running:true,job})},KVPV:{core:{scene:{status:()=>({owner})}}}};
// [VI dòng gốc 5] Khai báo biến không gán lại bằng const: load = tạo hàm với tham số (không có); mỗi lần gọi trả về gọi vm.runInNewContext(src, {window:W,Date:Clock,Number,String,Object}) để chạy mã trong ngữ cảnh máy ảo dùng cho kiểm thử | Khai báo biến không gán lại bằng const: tick = tạo hàm với tham số (không có); mỗi lần gọi trả về gọi W.KVPV_DEMON_KING_RECOVERY.sync()
const load=()=>vm.runInNewContext(src,{window:W,Date:Clock,Number,String,Object});const tick=()=>W.KVPV_DEMON_KING_RECOVERY.sync();
// [VI dòng gốc 6] gọi load() | cập nhật bằng toán tử += now bằng 4999 | gọi tick() để xử lý một nhịp kiểm tra | gọi assert.equal(exits, 0) để kiểm tra hai giá trị bằng nhau
load();now+=4999;tick();assert.equal(exits,0);now++;tick();assert.equal(exits,1);tick();load();tick();assert.equal(exits,1,'no resend on reload without ACK');assert.equal(timers.size,1);
// [VI dòng gốc 7] gán common bằng true | gọi tick() để xử lý một nhịp kiểm tra | gọi assert.equal(W.KVPV_DEMON_KING_RECOVERY.status().confirmed, 1) để kiểm tra hai giá trị bằng nhau
common=true;tick();assert.equal(W.KVPV_DEMON_KING_RECOVERY.status().confirmed,1);
// [VI dòng gốc 8] gán common bằng false | gán flag bằng false | cập nhật bằng toán tử += now bằng 10000 | gọi tick() để xử lý một nhịp kiểm tra
common=false;flag=false;now+=10000;tick();now+=10000;tick();assert.equal(exits,1,'live boss preserved');assert.equal(retargets,1);load();tick();assert.equal(retargets,1,'native retarget once across reload');
// [VI dòng gốc 9] gán flag bằng undefined | gọi tick() để xử lý một nhịp kiểm tra | cập nhật bằng toán tử += now bằng 6000
flag=undefined;tick();now+=6000;tick();assert.equal(exits,1,'unknown state preserved');
// [VI dòng gốc 10] gán flag bằng true | gán owner bằng 'combat' | gọi tick() để xử lý một nhịp kiểm tra | cập nhật bằng toán tử += now bằng 6000
flag=true;owner='combat';tick();now+=6000;tick();assert.equal(exits,1,'foreign owner preserved');owner=null;job='yeuvuong';tick();now+=6000;tick();assert.equal(exits,1,'existing daily job preserved');job='rảnh';type=4;tick();now+=6000;tick();assert.equal(exits,1,'other scene preserved');
// [VI dòng gốc 11] gọi W.KVPV_DEMON_KING_RECOVERY.stop() để dừng bộ điều khiển và dọn tài nguyên | gọi assert.equal(timers.size, 0) để kiểm tra hai giá trị bằng nhau
W.KVPV_DEMON_KING_RECOVERY.stop();assert.equal(timers.size,0);
// [VI dòng gốc 12] gọi console.log('PASS orphan Demon King: actual instance boss, confirmed dead + idle stable 5s, exit once across reload, common ACK, liv…)
console.log('PASS orphan Demon King: actual instance boss, confirmed dead + idle stable 5s, exit once across reload, common ACK, live/unknown/owned/other maps preserved');
// [VI dòng gốc 13] Dòng trống để tách các phần, không có lệnh thực thi.
