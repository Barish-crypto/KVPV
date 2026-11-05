// [VI dòng gốc 1] "use strict"
'use strict';
// [VI dòng gốc 2] Khai báo biến không gán lại bằng const: fs = gọi require('node:fs') để nạp module Node.js; vm = gọi require('node:vm') để nạp module Node.js; assert = gọi require('node:assert/strict') để nạp module Node.js
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
// [VI dòng gốc 3] Khai báo biến có thể gán lại bằng let: now = 1000; taskName = null; taskState = 1; warehouse = tạo mảng gồm 0 vị trí: []; current = null; loot = 0
let now=1000,taskName=null,taskState=1,warehouse=[],current=null,loot=0;
// [VI dòng gốc 4] Khai báo biến không gán lại bằng const: keys = tạo đối tượng bằng Map([[0,2],[1,2],[2,2],[3,2],[4,0]]); calls = tạo mảng gồm 0 vị trí: []; plugins = tạo đối tượng bằng Map(); timers = tạo đối tượng bằng Set()
const keys=new Map([[0,2],[1,2],[2,2],[3,2],[4,0]]),calls=[],plugins=new Map(),timers=new Set();
// [VI dòng gốc 5] Khai báo biến không gán lại bằng const: model = tạo đối tượng gồm selectArr, xbRep, isFirst, isFcOpenByType, c_sendXunBao
const model={selectArr:[],xbRep:null,isFirst:()=>false,isFcOpenByType:()=>true,c_sendXunBao:(...args)=>calls.push(args)};
// [VI dòng gốc 6] Định nghĩa lớp Store. | gán this.parent bằng true | gán this.visible bằng true | gọi calls.push(['withdraw',...model.selectArr.map(r=>r[2])]) để thêm phần tử vào cuối mảng
class Store{constructor(){this.parent=true;this.visible=true;}_lWn(){calls.push(['withdraw',...model.selectArr.map(r=>r[2])]);}}
// [VI dòng gốc 7] Khai báo biến không gán lại bằng const: store = tạo đối tượng bằng Store(); panels = tạo đối tượng bằng Map([[114,store]]); opened = tạo đối tượng bằng Set(); panelTypes = tạo đối tượng gồm 93, 115, 116, 393, 113
const store=new Store(),panels=new Map([[114,store]]),opened=new Set(),panelTypes={93:0,115:1,116:2,393:3,113:4};
// [VI dòng gốc 8] Khai báo biến không gán lại bằng const: W = tạo đối tượng gồm __KVPV_OWN_ACTOR_ID, _Ba, _ft, KVPV_DAILY, KVPV_DAILY_TRIAL, KVPV_QUEST_PRIORITY, KVPV_PROGRESS_PLANNER, KVPV_FABAO_FAST, KVPV_V8, setInterval, clearInterval
const W={__KVPV_OWN_ACTOR_ID:'a',_Ba:{_rJ:{_O$:{ins:{actorId:'a'}}},_ze:{_Ve:{ins:model},_rui:Store},
// [VI dòng gốc 9] Kết thúc hàm hiện tại và trả về: nếu taskName thì lấy ['q',taskState,0], ngược lại lấy null.
 _zIt:{_FIt:{ins:{get taskInfo(){return taskName?['q',taskState,0]:null;}}}},
// [VI dòng gốc 10] Thuộc tính _Ic: tạo đối tượng gồm _aQ, BeiBaoTool | Thuộc tính _aQ: tạo đối tượng gồm ins | Thuộc tính ins: tạo đối tượng gồm getItemCountById, getItemsByBagType | Thuộc tính getItemCountById: tạo hàm với tham số id; mỗi lần gọi trả về nếu id>=100&&id<=104 thì lấy keys.get(id-100), ngược lại lấy loot
 _Ic:{_aQ:{ins:{getItemCountById:id=>id>=100&&id<=104?keys.get(id-100):loot,getItemsByBagType:()=>warehouse}},BeiBaoTool:{canAddItemsAndTip:()=>1}},
// [VI dòng gốc 11] Thuộc tính _$a: tạo đối tượng gồm SceneUtil, _yo | Thuộc tính SceneUtil: tạo đối tượng gồm isCommonScene | Thuộc tính isCommonScene: true | Thuộc tính _yo: tạo đối tượng gồm ins
 _$a:{SceneUtil:{isCommonScene:true},_yo:{ins:{isInMission:false}}}},
// [VI dòng gốc 12] gọi assert.equal(grade, 0) để kiểm tra hai giá trị bằng nhau | Kết thúc hàm hiện tại và trả về: tạo mảng gồm 2 vị trí: [100+type,1].
 _ft:{__Z:{ins:{getTaskCfgById:()=>[0,taskName]}},_oZ:{ins:{getItemConditionByGrad:(type,grade)=>{assert.equal(grade,0);return [100+type,1];},
// [VI dòng gốc 13] Thuộc tính getItemShow: tạo hàm với tham số type; mỗi lần gọi trả về tạo mảng gồm 1 vị trí: [[0,0,0,[[1000+type,1,3]],[2000+type]]]
 getItemShow:type=>[[0,0,0,[[1000+type,1,3]],[2000+type]]]}},
// [VI dòng gốc 14] Khai báo biến không gán lại bằng const: r = tạo mảng gồm 0 vị trí: [] | gán r[14] bằng [900] | Kết thúc hàm hiện tại và trả về: r.
 _mY:{ins:{getItemCfgById:()=>{const r=[];r[14]=[900];return r;}}},_Bwt:{ins:{getCfgById:()=>[900,0,0,[],[],2051]}},
// [VI dòng gốc 15] gán current bằng id | gọi opened.add(id) | Kiểm tra id!==114: đúng thì chạy nhánh sau if. | gọi panels.set(id, {_Qh:type,parent:true,visible:true})
 _Y4n:{ins:{getPanelById:id=>panels.get(id),isOpened:id=>opened.has(id),open(id,type){current=id;opened.add(id);if(id!==114)panels.set(id,{_Qh:type,parent:true,visible:true});},close:id=>opened.delete(id)}}},
// [VI dòng gốc 16] Thuộc tính KVPV_DAILY: tạo đối tượng gồm quickState | Thuộc tính quickState: tạo hàm với tham số (không có); mỗi lần gọi trả về tạo đối tượng gồm job | Thuộc tính job: "rảnh" | Thuộc tính KVPV_DAILY_TRIAL: tạo đối tượng gồm status
 KVPV_DAILY:{quickState:()=>({job:'rảnh'})},KVPV_DAILY_TRIAL:{status:()=>({dungeons:[{id:2051,feature:22,known:true,unlocked:true,taskAllowed:true,remaining:1,level:1}]})},
// [VI dòng gốc 17] Thuộc tính KVPV_QUEST_PRIORITY: tạo đối tượng gồm hasPriority | Thuộc tính hasPriority: tạo hàm với tham số (không có); mỗi lần gọi trả về đảo giá trị đúng/sai của !taskName | Thuộc tính KVPV_PROGRESS_PLANNER: tạo đối tượng gồm inspect | Thuộc tính inspect: tạo hàm với tham số (không có); mỗi lần gọi trả về tạo đối tượng gồm goal
 KVPV_QUEST_PRIORITY:{hasPriority:()=>!!taskName},KVPV_PROGRESS_PLANNER:{inspect:()=>({goal:null})},KVPV_FABAO_FAST:{inspect:()=>[]},
// [VI dòng gốc 18] Kiểm tra plugins.has(p.id): đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('Trung module ID') | gọi plugins.set(p.id, p) | gán plugins.get(id).enabled bằng on
 KVPV_V8:{register(p){if(plugins.has(p.id))throw Error('Trung module ID');plugins.set(p.id,p);},toggle(id,on){plugins.get(id).enabled=on;}},
// [VI dòng gốc 19] gọi timers.add(fn) | Kết thúc hàm hiện tại và trả về: fn. | gọi timers.delete(fn)
 setInterval(fn){timers.add(fn);return fn;},clearInterval(fn){timers.delete(fn);}};
// [VI dòng gốc 20] Khai báo biến không gán lại bằng const: ctx = gọi vm.createContext({window:W,Date:{now:()=>now}}); load = tạo hàm với tham số name; mỗi lần gọi trả về gọi vm.runInContext(fs.readFileSync(__dirname+'/src/'+name,'utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,''), ctx)
const ctx=vm.createContext({window:W,Date:{now:()=>now}}),load=name=>vm.runInContext(fs.readFileSync(__dirname+'/src/'+name,'utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,''),ctx);
// [VI dòng gốc 21] gọi load('34-fabao-treasure.js') | gọi load('35-equipment-treasure.js') | Khai báo biến không gán lại bằng const: p = gọi plugins.get('fabao_treasure_keys')
load('34-fabao-treasure.js');load('35-equipment-treasure.js');const p=plugins.get('fabao_treasure_keys');
// [VI dòng gốc 22] gọi assert.equal(plugins.size, 1, 'one sender for all regular categories') để kiểm tra hai giá trị bằng nhau
assert.equal(plugins.size,1,'one sender for all regular categories');
// [VI dòng gốc 23] Duyệt từng giá trị trong [[0,'Trang bị'],[3,'Phù Văn'],[1,'Đỉnh Cao'],[2,'Chí Tôn']] bằng const [type,name]. | Khai báo biến không gán lại bằng const: [type,name] (chưa gán giá trị)
for(const [type,name]of [[0,'Trang bị'],[3,'Phù Văn'],[1,'Đỉnh Cao'],[2,'Chí Tôn']]){
// [VI dòng gốc 24] gán taskName bằng name | cập nhật bằng toán tử += now bằng 6000 | gọi W.KVPV_EQUIPMENT_TREASURE.sync()
 taskName=name;now+=6000;W.KVPV_EQUIPMENT_TREASURE.sync();
// [VI dòng gốc 25] gọi assert.equal(panelTypes[current], type, 'native panel matches the requested category') để kiểm tra hai giá trị bằng nhau
 assert.equal(panelTypes[current],type,'native panel matches the requested category');
// [VI dòng gốc 26] Khai báo biến có thể gán lại bằng let: before = gọi p.probe() | gọi assert.equal(before.ready, true) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(before.type, type) để kiểm tra hai giá trị bằng nhau | gọi p.run(before)
 let before=p.probe();assert.equal(before.ready,true);assert.equal(before.type,type);p.run(before);
// [VI dòng gốc 27] gọi assert.deepEqual(calls.at(-1), [0,false,false,type,false]) để kiểm tra cấu trúc hai giá trị tương đương | gọi assert.equal(p.probe().ready, false, 'all categories share one pending lock') để kiểm tra hai giá trị bằng nhau
 assert.deepEqual(calls.at(-1),[0,false,false,type,false]);assert.equal(p.probe().ready,false,'all categories share one pending lock');
// [VI dòng gốc 28] gọi keys.set(type, keys.get(type)-1) | gán model.xbRep bằng [type,0,[1000+type]] | gọi W.KVPV_FABAO_TREASURE.sync()
 keys.set(type,keys.get(type)-1);model.xbRep=[type,0,[1000+type]];W.KVPV_FABAO_TREASURE.sync();
// [VI dòng gốc 29] gán warehouse bằng [[1000+type,1,'uid-'+type],[8888,1,'unrelated']] | cập nhật bằng toán tử += now bằng 6000 | gọi W.KVPV_EQUIPMENT_TREASURE.sync()
 warehouse=[[1000+type,1,'uid-'+type],[8888,1,'unrelated']];now+=6000;W.KVPV_EQUIPMENT_TREASURE.sync();
// [VI dòng gốc 30] gán before bằng p.probe() | gọi assert.equal(before.kind, 'withdraw') để kiểm tra hai giá trị bằng nhau | gọi p.run(before) | gọi assert.deepEqual(calls.at(-1), ['withdraw','uid-'+type]) để kiểm tra cấu trúc hai giá trị tương đương
 before=p.probe();assert.equal(before.kind,'withdraw');p.run(before);assert.deepEqual(calls.at(-1),['withdraw','uid-'+type]);
// [VI dòng gốc 31] gán warehouse bằng [[8888,1,'unrelated']] | tăng loot một đơn vị sau khi lấy giá trị | gọi W.KVPV_FABAO_TREASURE.sync() | gán warehouse bằng []
 warehouse=[[8888,1,'unrelated']];loot++;W.KVPV_FABAO_TREASURE.sync();warehouse=[];
// [VI dòng gốc 32] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 33] gán taskName bằng 'Đạt cấp 300' | gọi W.KVPV_EQUIPMENT_TREASURE.sync() | gọi assert.equal(p.probe().ready, false, 'unrelated primary quest retains priority') để kiểm tra hai giá trị bằng nhau
taskName='Đạt cấp 300';W.KVPV_EQUIPMENT_TREASURE.sync();assert.equal(p.probe().ready,false,'unrelated primary quest retains priority');
// [VI dòng gốc 34] gán taskName bằng 'Phù Văn' | gọi keys.set(3, 0) | gọi assert.equal(W.KVPV_EQUIPMENT_TREASURE.materialDungeon(), 2051, 'verified native key source delegates to existing free dungeon') để kiểm tra hai giá trị bằng nhau
taskName='Phù Văn';keys.set(3,0);assert.equal(W.KVPV_EQUIPMENT_TREASURE.materialDungeon(),2051,'verified native key source delegates to existing free dungeon');
// [VI dòng gốc 35] gọi keys.set(3, 1) | gọi assert.equal(W.KVPV_EQUIPMENT_TREASURE.materialDungeon(), null, 'owned key stops key farming') để kiểm tra hai giá trị bằng nhau
keys.set(3,1);assert.equal(W.KVPV_EQUIPMENT_TREASURE.materialDungeon(),null,'owned key stops key farming');
// [VI dòng gốc 36] gán taskState bằng 2 | gọi assert.equal(p.probe().ready, false, 'completed primary task must be claimed first') để kiểm tra hai giá trị bằng nhau | gán taskState bằng 1
taskState=2;assert.equal(p.probe().ready,false,'completed primary task must be claimed first');taskState=1;
// [VI dòng gốc 37] cập nhật bằng toán tử += now bằng 6000 | gọi W.KVPV_EQUIPMENT_TREASURE.sync() | gọi p.run(p.probe())
now+=6000;W.KVPV_EQUIPMENT_TREASURE.sync();p.run(p.probe());
// [VI dòng gốc 38] gọi load('34-fabao-treasure.js') | gọi load('35-equipment-treasure.js') | gọi assert.equal(plugins.size, 1) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(timers.size, 2) để kiểm tra hai giá trị bằng nhau
load('34-fabao-treasure.js');load('35-equipment-treasure.js');assert.equal(plugins.size,1);assert.equal(timers.size,2);assert.equal(p.probe().ready,false,'cross-category pending survives hot reload');
// [VI dòng gốc 39] gọi assert.deepEqual(Array.from(W.KVPV_FABAO_TREASURE.status().categories,x=>x.type).sort(), [0,1,2,3,4]) để kiểm tra cấu trúc hai giá trị tương đương
assert.deepEqual(Array.from(W.KVPV_FABAO_TREASURE.status().categories,x=>x.type).sort(),[0,1,2,3,4]);
// [VI dòng gốc 40] gọi assert.throws(()=>W.KVPV_FABAO_TREASURE.registerType({type:9}), /Unverified/, 'premium/event types not enabled') để kiểm tra đoạn mã có ném lỗi như dự kiến
assert.throws(()=>W.KVPV_FABAO_TREASURE.registerType({type:9}),/Unverified/,'premium/event types not enabled');
// [VI dòng gốc 41] gán W._Ba._rJ._O$.ins.actorId bằng 'b' | gọi W.KVPV_EQUIPMENT_TREASURE.sync() | gọi W.KVPV_FABAO_TREASURE.sync() | gọi assert.equal(timers.size, 0) để kiểm tra hai giá trị bằng nhau
W._Ba._rJ._O$.ins.actorId='b';W.KVPV_EQUIPMENT_TREASURE.sync();W.KVPV_FABAO_TREASURE.sync();assert.equal(timers.size,0);
// [VI dòng gốc 42] gọi console.log('PASS equipment treasure: all five regular types share one sender, exact panels/key costs/no buy, category ACK/warehouse…)
console.log('PASS equipment treasure: all five regular types share one sender, exact panels/key costs/no buy, category ACK/warehouse membership, quest priority, native free key source, reload and no premium categories');
// [VI dòng gốc 43] Dòng trống để tách các phần, không có lệnh thực thi.
