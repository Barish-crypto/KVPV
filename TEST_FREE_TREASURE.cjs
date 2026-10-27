// [VI dòng gốc 1] "use strict" | Khai báo biến không gán lại bằng const: fs = gọi require('node:fs') để nạp module Node.js; vm = gọi require('node:vm') để nạp module Node.js; assert = gọi require('node:assert/strict') để nạp module Node.js
'use strict';const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
// [VI dòng gốc 2] Khai báo biến có thể gán lại bằng let: now = 0; focus = false; existing = false | Khai báo biến không gán lại bằng const: calls = tạo mảng gồm 0 vị trí: []; timers = tạo đối tượng bằng Set(); flags = tạo đối tượng bằng Map([[0,true],[9,true]]); panels = tạo đối tượng bằng Map()
let now=0,focus=false,existing=false;const calls=[],timers=new Set(),flags=new Map([[0,true],[9,true]]),panels=new Map();
// [VI dòng gốc 3] Khai báo biến không gán lại bằng const: m = tạo đối tượng gồm isFirst, isFcOpenByType, c_sendXunBao | gọi calls.push(a) để thêm phần tử vào cuối mảng
const m={isFirst:t=>flags.get(t)??false,isFcOpenByType:()=>true,c_sendXunBao(...a){calls.push(a);}};
// [VI dòng gốc 4] Khai báo biến không gán lại bằng const: W = tạo đối tượng gồm __KVPV_OWN_ACTOR_ID, _Ba, _ft, KVPV_DAILY_CLOCK, KVPV_DAILY, KVPV_FABAO_TREASURE, KVPV_CONFIRM_POPUPS, setInterval, clearInterval
const W={__KVPV_OWN_ACTOR_ID:'12345',_Ba:{_rJ:{_O$:{ins:{actorId:'12345',isDead:false}}},_ze:{_Ve:{ins:m}},_$a:{SceneUtil:{isCommonScene:true},_yo:{ins:{isInMission:false}}}},
// [VI dòng gốc 5] gọi panels.set(id, {_Qh:type,parent:true,visible:true})
 _ft:{_Y4n:{ins:{isOpened:id=>panels.has(id),getPanelById:id=>panels.get(id),open(id,type){panels.set(id,{_Qh:type,parent:true,visible:true});}}}},
// [VI dòng gốc 6] Thuộc tính KVPV_DAILY_CLOCK: tạo đối tượng gồm key | Thuộc tính key: tạo hàm với tham số (không có); mỗi lần gọi trả về "2026-10-24" | Thuộc tính KVPV_DAILY: tạo đối tượng gồm quickState | Thuộc tính quickState: tạo hàm với tham số (không có); mỗi lần gọi trả về tạo đối tượng gồm job, running
 KVPV_DAILY_CLOCK:{key:()=>"2026-10-24"},KVPV_DAILY:{quickState:()=>({job:'rảnh',running:false})},KVPV_FABAO_TREASURE:{status:()=>({pending:existing})},KVPV_CONFIRM_POPUPS:{beforeTask:()=>focus},
// [VI dòng gốc 7] gọi timers.add(fn) | Kết thúc hàm hiện tại và trả về: fn. | gọi timers.delete(fn)
 setInterval(fn){timers.add(fn);return fn;},clearInterval(fn){timers.delete(fn);}};
// [VI dòng gốc 8] Khai báo biến không gán lại bằng const: load = tạo hàm với tham số (không có); mỗi lần gọi trả về gọi vm.runInNewContext(fs.readFileSync(__dirname+'/src/56-free-treasure.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,''), {window:W…) để chạy mã trong ngữ cảnh máy ảo dùng cho kiểm thử | gọi load() | gọi assert.equal(calls.length, 0) để kiểm tra hai giá trị bằng nhau | gọi assert(W.KVPV_FREE_TREASURE.busy()) để kiểm tra điều kiện của bài test
const load=()=>vm.runInNewContext(fs.readFileSync(__dirname+'/src/56-free-treasure.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,''),{window:W,Date:{now:()=>now}});load();assert.equal(calls.length,0);assert(W.KVPV_FREE_TREASURE.busy());
// [VI dòng gốc 9] gán focus bằng true | gọi W.KVPV_FREE_TREASURE.sync() | gọi assert.equal(calls.length, 0) để kiểm tra hai giá trị bằng nhau | gán focus bằng false
focus=true;W.KVPV_FREE_TREASURE.sync();assert.equal(calls.length,0);focus=false;existing=true;W.KVPV_FREE_TREASURE.sync();assert.equal(calls.length,0);existing=false;
// [VI dòng gốc 10] gọi W.KVPV_FREE_TREASURE.sync() | gọi assert.deepEqual(calls[0], [0,true,false,0,false]) để kiểm tra cấu trúc hai giá trị tương đương | gọi load() | gọi assert.equal(calls.length, 1) để kiểm tra hai giá trị bằng nhau
W.KVPV_FREE_TREASURE.sync();assert.deepEqual(calls[0],[0,true,false,0,false]);load();assert.equal(calls.length,1);assert.equal(timers.size,1);
// [VI dòng gốc 11] gọi flags.set(0, false) | gán m.xbRep bằng [9,0,[]] | gọi W.KVPV_FREE_TREASURE.sync() | gọi assert(W.KVPV_FREE_TREASURE.status().pending) để kiểm tra điều kiện của bài test
flags.set(0,false);m.xbRep=[9,0,[]];W.KVPV_FREE_TREASURE.sync();assert(W.KVPV_FREE_TREASURE.status().pending);
// [VI dòng gốc 12] gán m.xbRep bằng [0,0,[]] | gán now bằng 6000 | gọi W.KVPV_FREE_TREASURE.sync() | gọi assert.equal(W.KVPV_FREE_TREASURE.status().confirmed, 1) để kiểm tra hai giá trị bằng nhau
m.xbRep=[0,0,[]];now=6000;W.KVPV_FREE_TREASURE.sync();assert.equal(W.KVPV_FREE_TREASURE.status().confirmed,1);W.KVPV_FREE_TREASURE.sync();assert.deepEqual(calls[1],[0,true,false,9,false]);
// [VI dòng gốc 13] gán m.xbRep bằng [9,123,[]] | gán now bằng 30000 | gọi W.KVPV_FREE_TREASURE.sync() | gọi load()
m.xbRep=[9,123,[]];now=30000;W.KVPV_FREE_TREASURE.sync();load();assert.equal(calls.length,2);assert.equal(W.KVPV_FREE_TREASURE.status().reason,'server_rejected_no_retry');
// [VI dòng gốc 14] gọi console.log('PASS free treasure: normal/glory, free-only, manual dungeon mode retained, UI/pending gates, exact ACK, no replay after…)
console.log('PASS free treasure: normal/glory, free-only, manual dungeon mode retained, UI/pending gates, exact ACK, no replay after reload/reject.');
// [VI dòng gốc 15] Dòng trống để tách các phần, không có lệnh thực thi.
