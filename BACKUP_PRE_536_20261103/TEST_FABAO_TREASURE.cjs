// [VI dòng gốc 1] "use strict"
'use strict';
// [VI dòng gốc 2] Khai báo biến không gán lại bằng const: fs = gọi require('node:fs') để nạp module Node.js; vm = gọi require('node:vm') để nạp module Node.js; assert = gọi require('node:assert/strict') để nạp module Node.js
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
// [VI dòng gốc 3] Khai báo biến không gán lại bằng const: source = gọi fs.readFileSync(__dirname+'/src/34-fabao-treasure.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm, '')
const source=fs.readFileSync(__dirname+'/src/34-fabao-treasure.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,'');
// [VI dòng gốc 4] Khai báo biến có thể gán lại bằng let: keys = 4; first = false; need = true; common = true; popup = false; now = 1000; warehouse = tạo mảng gồm 0 vị trí: []; loot = 0; opened = false; drawOpened = false; capacity = 1
let keys=4,first=false,need=true,common=true,popup=false,now=1000,warehouse=[],loot=0,opened=false,drawOpened=false,capacity=1;
// [VI dòng gốc 5] Khai báo biến không gán lại bằng const: calls = tạo mảng gồm 0 vị trí: []; plugins = tạo đối tượng bằng Map(); timers = tạo đối tượng bằng Set()
const calls=[],plugins=new Map(),timers=new Set();
// [VI dòng gốc 6] Khai báo biến không gán lại bằng const: model = tạo đối tượng gồm selectArr, isFirst, isFcOpenByType, c_sendXunBao, xbRep
const model={selectArr:[],isFirst:()=>first,isFcOpenByType:()=>true,c_sendXunBao:(...args)=>calls.push(args),xbRep:null};
// [VI dòng gốc 7] Định nghĩa lớp Warehouse. | gán this.parent bằng true | gán this.visible bằng true | gọi calls.push(['withdraw',...model.selectArr.map(r=>r[2])]) để thêm phần tử vào cuối mảng
class Warehouse{constructor(){this.parent=true;this.visible=true;}_lWn(){calls.push(['withdraw',...model.selectArr.map(r=>r[2])]);}}
// [VI dòng gốc 8] Khai báo biến không gán lại bằng const: panel = tạo đối tượng bằng Warehouse()
const panel=new Warehouse();
// [VI dòng gốc 9] Khai báo biến không gán lại bằng const: W = tạo đối tượng gồm __KVPV_OWN_ACTOR_ID, _Ba, _ft, KVPV_PROGRESS_PLANNER, KVPV_FABAO_FAST, KVPV_CONFIRM_POPUPS, KVPV_DAILY, KVPV_V8, setInterval, clearInterval
const W={__KVPV_OWN_ACTOR_ID:'a',_Ba:{_rJ:{_O$:{ins:{actorId:'a'}}},_ze:{_Ve:{ins:model},_rui:Warehouse},
// [VI dòng gốc 10] Thuộc tính _Ic: tạo đối tượng gồm _aQ, BeiBaoTool | Thuộc tính _aQ: tạo đối tượng gồm ins | Thuộc tính ins: tạo đối tượng gồm getItemCountById, getItemsByBagType | Thuộc tính getItemCountById: tạo hàm với tham số id; mỗi lần gọi trả về nếu id===99 thì lấy keys, ngược lại lấy loot
 _Ic:{_aQ:{ins:{getItemCountById:id=>id===99?keys:loot,getItemsByBagType:()=>warehouse}},BeiBaoTool:{canAddItemsAndTip:()=>capacity}},
// [VI dòng gốc 11] Kết thúc hàm hiện tại và trả về: common.
 _$a:{SceneUtil:{get isCommonScene(){return common;}},_yo:{ins:{isInMission:false}}}},
// [VI dòng gốc 12] gọi assert.equal(type, 4) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(grade, 0) để kiểm tra hai giá trị bằng nhau | Kết thúc hàm hiện tại và trả về: tạo mảng gồm 2 vị trí: [99,1].
 _ft:{_oZ:{ins:{getItemConditionByGrad:(type,grade)=>{assert.equal(type,4);assert.equal(grade,0);return [99,1];}}},
// [VI dòng gốc 13] Kiểm tra id===113: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gán drawOpened bằng true | gọi assert.equal(id, 114) để kiểm tra hai giá trị bằng nhau | gán opened bằng true
 _Y4n:{ins:{getPanelById:id=>id===113?{_Qh:4,parent:true,visible:true}:panel,isOpened:id=>id===113?drawOpened:opened,open:id=>{if(id===113)drawOpened=true;else {assert.equal(id,114);opened=true;}} ,close:()=>opened=false}}},
// [VI dòng gốc 14] Thuộc tính KVPV_PROGRESS_PLANNER: tạo đối tượng gồm inspect | Thuộc tính inspect: tạo hàm với tham số (không có); mỗi lần gọi trả về tạo đối tượng gồm goal, remaining, selected | Thuộc tính goal: nếu need thì lấy {}, ngược lại lấy null | Thuộc tính remaining: 5
 KVPV_PROGRESS_PLANNER:{inspect:()=>({goal:need?{}:null,remaining:5,selected:null})},KVPV_FABAO_FAST:{inspect:()=>[{id:6}]},
// [VI dòng gốc 15] Thuộc tính KVPV_CONFIRM_POPUPS: tạo đối tượng gồm beforeTask | Thuộc tính beforeTask: tạo hàm với tham số (không có); mỗi lần gọi trả về popup | Thuộc tính KVPV_DAILY: tạo đối tượng gồm quickState | Thuộc tính quickState: tạo hàm với tham số (không có); mỗi lần gọi trả về tạo đối tượng gồm job
 KVPV_CONFIRM_POPUPS:{beforeTask:()=>popup},KVPV_DAILY:{quickState:()=>({job:'rảnh'})},
// [VI dòng gốc 16] Kiểm tra plugins.has(p.id): đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('Trung module ID') | gọi plugins.set(p.id, p) | gán plugins.get(id).enabled bằng on
 KVPV_V8:{register(p){if(plugins.has(p.id))throw Error('Trung module ID');plugins.set(p.id,p);},toggle(id,on){plugins.get(id).enabled=on;}},
// [VI dòng gốc 17] gọi timers.add(fn) | Kết thúc hàm hiện tại và trả về: fn. | gọi timers.delete(fn)
 setInterval(fn){timers.add(fn);return fn;},clearInterval(fn){timers.delete(fn);}};
// [VI dòng gốc 18] Khai báo biến không gán lại bằng const: ctx = gọi vm.createContext({window:W,Date:{now:()=>now}}); load = tạo hàm với tham số (không có); mỗi lần gọi trả về gọi vm.runInContext(source, ctx) | gọi load()
const ctx=vm.createContext({window:W,Date:{now:()=>now}}),load=()=>vm.runInContext(source,ctx);load();
// [VI dòng gốc 19] Khai báo biến không gán lại bằng const: p = gọi plugins.get('fabao_treasure_keys') | gọi assert.equal(p.spend, 'materials') để kiểm tra hai giá trị bằng nhau | gọi assert.equal(p.background, false) để kiểm tra hai giá trị bằng nhau
const p=plugins.get('fabao_treasure_keys');assert.equal(p.spend,'materials');assert.equal(p.background,false);
// [VI dòng gốc 20] gọi p.run(p.probe()) | gọi assert.deepEqual(calls[0], [0,false,false,4,false], 'single type4 only, no quick multiplier, no purchase') để kiểm tra cấu trúc hai giá trị tương đương
p.run(p.probe());assert.deepEqual(calls[0],[0,false,false,4,false],'single type4 only, no quick multiplier, no purchase');
// [VI dòng gốc 21] gọi load() | gọi assert.equal(timers.size, 1) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(p.probe().ready, false) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(calls.length, 1) để kiểm tra hai giá trị bằng nhau
load();assert.equal(timers.size,1);assert.equal(p.probe().ready,false);assert.equal(calls.length,1);
// [VI dòng gốc 22] gán keys bằng 3 | gán model.xbRep bằng [3,0,[6]] | gọi W.KVPV_FABAO_TREASURE.sync() | gọi assert.equal(W.KVPV_FABAO_TREASURE.status().pending, 'draw', 'different treasure category cannot ACK') để kiểm tra hai giá trị bằng nhau
keys=3;model.xbRep=[3,0,[6]];W.KVPV_FABAO_TREASURE.sync();assert.equal(W.KVPV_FABAO_TREASURE.status().pending,'draw','different treasure category cannot ACK');
// [VI dòng gốc 23] gán model.xbRep bằng [4,0,[6]] | gọi W.KVPV_FABAO_TREASURE.sync() | gọi assert.equal(W.KVPV_FABAO_TREASURE.status().confirmed, 1) để kiểm tra hai giá trị bằng nhau
model.xbRep=[4,0,[6]];W.KVPV_FABAO_TREASURE.sync();assert.equal(W.KVPV_FABAO_TREASURE.status().confirmed,1);
// [VI dòng gốc 24] cập nhật bằng toán tử += now bằng 6000 | gán warehouse bằng [[6,2,'fabao-uid'],[1,50,'unrelated-uid']] | gọi W.KVPV_FABAO_TREASURE.sync() | gọi assert.equal(opened, true) để kiểm tra hai giá trị bằng nhau
now+=6000;warehouse=[[6,2,'fabao-uid'],[1,50,'unrelated-uid']];W.KVPV_FABAO_TREASURE.sync();assert.equal(opened,true);
// [VI dòng gốc 25] gọi p.run(p.probe()) | gọi assert.deepEqual(calls.at(-1), ['withdraw','fabao-uid'], 'withdraw only identified Phap Bao') để kiểm tra cấu trúc hai giá trị tương đương
p.run(p.probe());assert.deepEqual(calls.at(-1),['withdraw','fabao-uid'],'withdraw only identified Phap Bao');
// [VI dòng gốc 26] gán warehouse bằng [[1,50,'unrelated-uid']] | gọi assert.equal(p.probe().ready, false, 'warehouse removal alone is not bag ACK') để kiểm tra hai giá trị bằng nhau | gán loot bằng 2 | gọi W.KVPV_FABAO_TREASURE.sync()
warehouse=[[1,50,'unrelated-uid']];assert.equal(p.probe().ready,false,'warehouse removal alone is not bag ACK');loot=2;W.KVPV_FABAO_TREASURE.sync();assert.equal(W.KVPV_FABAO_TREASURE.status().confirmed,2);
// [VI dòng gốc 27] gán keys bằng 0 | gọi assert.equal(p.probe().ready, false, 'no keys never buys shortfall') để kiểm tra hai giá trị bằng nhau | gán first bằng true | gọi assert.equal(p.probe().ready, true) để kiểm tra hai giá trị bằng nhau
keys=0;assert.equal(p.probe().ready,false,'no keys never buys shortfall');first=true;assert.equal(p.probe().ready,true);p.run(p.probe());assert.deepEqual(calls.at(-1),[0,true,false,4,false]);
// [VI dòng gốc 28] gán model.xbRep bằng [4,0,[6]] | gán first bằng false | gọi W.KVPV_FABAO_TREASURE.sync() | gọi assert.equal(W.KVPV_FABAO_TREASURE.status().confirmed, 3) để kiểm tra hai giá trị bằng nhau
model.xbRep=[4,0,[6]];first=false;W.KVPV_FABAO_TREASURE.sync();assert.equal(W.KVPV_FABAO_TREASURE.status().confirmed,3);
// [VI dòng gốc 29] gán keys bằng 1 | gán popup bằng true | gọi assert.equal(p.probe().ready, false) để kiểm tra hai giá trị bằng nhau | gán popup bằng false
keys=1;popup=true;assert.equal(p.probe().ready,false);popup=false;common=false;assert.equal(p.probe().ready,false);common=true;
// [VI dòng gốc 30] gán need bằng false | gọi assert.equal(p.probe().ready, false) để kiểm tra hai giá trị bằng nhau | gán need bằng true | gọi p.run(p.probe())
need=false;assert.equal(p.probe().ready,false);need=true;p.run(p.probe());now+=60000;W.KVPV_FABAO_TREASURE.sync();assert.equal(W.KVPV_FABAO_TREASURE.status().reason,'waiting_ack_no_retry');
// [VI dòng gốc 31] gọi assert.equal(p.probe().ready, false, 'unconfirmed request never replayed') để kiểm tra hai giá trị bằng nhau | gán W._Ba._rJ._O$.ins.actorId bằng 'b' | gọi W.KVPV_FABAO_TREASURE.sync() | gọi assert.equal(p.enabled, false) để kiểm tra hai giá trị bằng nhau
assert.equal(p.probe().ready,false,'unconfirmed request never replayed');W._Ba._rJ._O$.ins.actorId='b';W.KVPV_FABAO_TREASURE.sync();assert.equal(p.enabled,false);assert.equal(timers.size,0);
// [VI dòng gốc 32] gọi console.log('PASS Fabao treasure: exact single/free/key cost, no multiplier/buy, type-specific ACK, reload/timeout no replay, select…)
console.log('PASS Fabao treasure: exact single/free/key cost, no multiplier/buy, type-specific ACK, reload/timeout no replay, selected warehouse withdrawal and bag ACK, goal/popup/scene/actor guards');
// [VI dòng gốc 33] Dòng trống để tách các phần, không có lệnh thực thi.
