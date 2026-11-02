// [VI dòng gốc 1] "use strict"
'use strict';
// [VI dòng gốc 2] Khai báo biến không gán lại bằng const: fs = gọi require('node:fs') để nạp module Node.js; vm = gọi require('node:vm') để nạp module Node.js; assert = gọi require('node:assert/strict') để nạp module Node.js
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
// [VI dòng gốc 3] Khai báo biến có thể gán lại bằng let: which = "co"; count = 3; owned = false; placed = false; item = null; reward = null; common = true; map = 1002; attempts = 3; quick = true; lease = null
let which='co',count=3,owned=false,placed=false,item=null,reward=null,common=true,map=1002,attempts=3,quick=true,lease=null;
// [VI dòng gốc 4] Khai báo biến không gán lại bằng const: calls = tạo mảng gồm 0 vị trí: []; timers = tạo đối tượng bằng Set(); plugins = tạo đối tượng bằng Map(); bagRows = tạo mảng gồm 0 vị trí: []; ep = tạo đối tượng bằng Map()
const calls=[],timers=new Set(),plugins=new Map(),bagRows=[],ep=new Map();
// [VI dòng gốc 5] Khai báo biến không gán lại bằng const: goal = tạo đối tượng gồm id, target, state, progress
const goal={id:'REBORN/102/1',target:4,state:0,progress:3};
// [VI dòng gốc 6] Khai báo biến không gán lại bằng const: W = tạo đối tượng gồm __KVPV_OWN_ACTOR_ID, _Ba, _C, _Sa, _ft, KVPV_DAILY, KVPV_V864, KVPV_V865, KVPV_REBORN_GOALS, KVPV, KVPV_V8, setInterval, clearInterval
const W={__KVPV_OWN_ACTOR_ID:'123456',_Ba:{_rJ:{_O$:{ins:{actorId:'123456',creRoleDay:2}}},
// [VI dòng gốc 7] Thuộc tính _Co: tạo đối tượng gồm _Mo | Thuộc tính _Mo: tạo đối tượng gồm ins | Thuộc tính ins: tạo đối tượng gồm curLv, awardLvs | Thuộc tính curLv: 50
 _Co:{_Mo:{ins:{curLv:50,awardLvs:[]}}},_kAt:{_LAt:{inst:{epFrgmtsDic:ep}},_IMi:{inst:{getShQiInfo:()=>calls.push('fetch'),epFragment:x=>calls.push(['put',...x]),actShenQi:()=>calls.push('activate')}}},
// [VI dòng gốc 8] Thuộc tính _Ic: tạo đối tượng gồm _aQ, _oJ, BeiBaoTool | Thuộc tính _aQ: tạo đối tượng gồm ins | Thuộc tính ins: tạo đối tượng gồm getItemsByBagType | Thuộc tính getItemsByBagType: tạo hàm với tham số (không có); mỗi lần gọi trả về bagRows
 _Ic:{_aQ:{ins:{getItemsByBagType:()=>bagRows}},_oJ:{instance:{c2sUseBagItem:(...a)=>calls.push(['use',...a])}},BeiBaoTool:{checkItemCanUseOrNotice:()=>true}},
// [VI dòng gốc 9] Thuộc tính _sst: tạo đối tượng gồm _Cht | Thuộc tính _Cht: tạo đối tượng gồm inst | Thuộc tính inst: tạo đối tượng gồm getCpAward | Thuộc tính getCpAward: tạo hàm với tham số ...a; mỗi lần gọi trả về gọi calls.push(['claim',...a]) để thêm phần tử vào cuối mảng
 _sst:{_Cht:{inst:{getCpAward:(...a)=>calls.push(['claim',...a])}}},
// [VI dòng gốc 10] Kết thúc hàm hiện tại và trả về: common.
 _$a:{SceneUtil:{get isCommonScene(){return common;}},_yo:{ins:{isInMission:false}}},
// [VI dòng gốc 11] Kết thúc hàm hiện tại và trả về: tạo mảng gồm 6 vị trí: [0,5,attempts,0,0,quick].
 _tjt:{_ljt:{ins:{get times(){return [0,5,attempts,0,0,quick];},objs:[[42,0,'Opponent',50,10],null,null,[1,0,'Me',100,20]]}},_vjt:{ins:{challengeArena:(...a)=>calls.push(['arena',...a]),getArena:()=>calls.push('arenaInfo')}}},
// [VI dòng gốc 12] Thuộc tính _qo: tạo đối tượng gồm _Ro | Thuộc tính _Ro: tạo đối tượng gồm ins | Thuộc tính ins: tạo đối tượng gồm fight | Thuộc tính fight: 100
 _qo:{_Ro:{ins:{fight:100}}},_Do:{_Ho:{inst:{getFcIsOpen:()=>true}}}},
// [VI dòng gốc 13] Kết thúc hàm hiện tại và trả về: map (biến đổi từng phần tử).
 _C:{_Mn:{_Cn:{get currentID(){return map;}}}},_Sa:{svrTime:10000},_ft:{_h$:{ins:{getCfgByLv:()=>[2011]}},_Y4n:{ins:{isOpened:()=>false,openByActionId:id=>calls.push(['open',id])}}},
// [VI dòng gốc 14] Thuộc tính KVPV_DAILY: tạo đối tượng gồm quickState | Thuộc tính quickState: tạo hàm với tham số (không có); mỗi lần gọi trả về tạo đối tượng gồm running, job | Thuộc tính running: true | Thuộc tính job: "rảnh"
 KVPV_DAILY:{quickState:()=>({running:true,job:'rảnh'})},KVPV_V864:{config:{enabled:true},plan:()=>({fragments:{count,ready:true,allPlaced:placed,owned:owned?{id:700}:null,rows:[{id:700,owned,placed,stage:50}]},item,reward})},
// [VI dòng gốc 15] Thuộc tính KVPV_V865: tạo đối tượng gồm config | Thuộc tính config: tạo đối tượng gồm enabled | Thuộc tính enabled: true | Thuộc tính KVPV_REBORN_GOALS: tạo đối tượng gồm cobaoGoal, arenaGoal
 KVPV_V865:{config:{enabled:true}},KVPV_REBORN_GOALS:{cobaoGoal:()=>which==='co'?goal:null,arenaGoal:()=>which==='arena'?{...goal,id:'arena-goal'}:null},
// [VI dòng gốc 16] Kiểm tra lease: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: false. | gán lease bằng tag | Kết thúc hàm hiện tại và trả về: true.
 KVPV:{core:{scene:{status:()=>lease?{owner:'combat',tag:lease}:{owner:null},acquire:(who,tag)=>{if(lease)return false;lease=tag;return true;},renew:()=>true,release:()=>lease=null}}},
// [VI dòng gốc 17] Kiểm tra plugins.has(p.id): đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('Trung module ID') | gọi plugins.set(p.id, p) | gán plugins.get(id).enabled bằng on
 KVPV_V8:{register(p){if(plugins.has(p.id))throw Error('Trung module ID');plugins.set(p.id,p);},toggle(id,on){plugins.get(id).enabled=on;}},
// [VI dòng gốc 18] gọi timers.add(fn) | Kết thúc hàm hiện tại và trả về: fn. | gọi timers.delete(fn)
 setInterval(fn){timers.add(fn);return fn;},clearInterval(fn){timers.delete(fn);}};
// [VI dòng gốc 19] Khai báo biến không gán lại bằng const: context = gọi vm.createContext({window:W}); load = tạo hàm với tham số (không có); mỗi lần gọi trả về gọi vm.runInContext(fs.readFileSync(__dirname+'/src/38-reborn-executors.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,''), contex…) | gọi load()
const context=vm.createContext({window:W}),load=()=>vm.runInContext(fs.readFileSync(__dirname+'/src/38-reborn-executors.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,''),context);load();
// [VI dòng gốc 20] Khai báo biến không gán lại bằng const: coPlugin = gọi plugins.get('reborn_cobao_step'); arPlugin = gọi plugins.get('reborn_arena_fight')
const coPlugin=plugins.get('reborn_cobao_step'),arPlugin=plugins.get('reborn_arena_fight');
// [VI dòng gốc 21] gọi assert.equal(W.KVPV_V864.config.enabled, false, 'old main-only sender is suspended while separate node executor owns CoBao') để kiểm tra hai giá trị bằng nhau
assert.equal(W.KVPV_V864.config.enabled,false,'old main-only sender is suspended while separate node executor owns CoBao');
// [VI dòng gốc 22] gọi assert.equal(W.KVPV_REBORN_EXECUTORS.cobaoStageGoal().target, 50) để kiểm tra hai giá trị bằng nhau
assert.equal(W.KVPV_REBORN_EXECUTORS.cobaoStageGoal().target,50);
// [VI dòng gốc 23] gán W._Ba._Co._Mo.ins.curLv bằng 51 | gán W._Ba._Co._Mo.ins.awardLvs bằng [50] | gán reward bằng {lv:50,mapId:2011,sig:'r'}
W._Ba._Co._Mo.ins.curLv=51;W._Ba._Co._Mo.ins.awardLvs=[50];reward={lv:50,mapId:2011,sig:'r'};
// [VI dòng gốc 24] gọi coPlugin.run(coPlugin.probe()) | gọi assert.deepEqual(calls.at(-1), ['claim',2011,50]) để kiểm tra cấu trúc hai giá trị tương đương | gọi assert.equal(coPlugin.probe().ready, false) để kiểm tra hai giá trị bằng nhau
coPlugin.run(coPlugin.probe());assert.deepEqual(calls.at(-1),['claim',2011,50]);assert.equal(coPlugin.probe().ready,false);
// [VI dòng gốc 25] gọi load() | gọi assert.equal(timers.size, 2) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(coPlugin.probe().ready, false, 'reload retains claim ACK') để kiểm tra hai giá trị bằng nhau
load();assert.equal(timers.size,2);assert.equal(coPlugin.probe().ready,false,'reload retains claim ACK');
// [VI dòng gốc 26] gán W._Ba._Co._Mo.ins.awardLvs bằng [] | gán reward bằng null | gọi W.KVPV_REBORN_EXECUTORS.sync()
W._Ba._Co._Mo.ins.awardLvs=[];reward=null;W.KVPV_REBORN_EXECUTORS.sync();
// [VI dòng gốc 27] gán item bằng {id:700,uid:900,amount:1,sig:'i'} | gọi bagRows.push([700,1,900]) để thêm phần tử vào cuối mảng | gọi coPlugin.run(coPlugin.probe()) | gọi assert.deepEqual(calls.at(-1), ['use',900,700,1]) để kiểm tra cấu trúc hai giá trị tương đương
item={id:700,uid:900,amount:1,sig:'i'};bagRows.push([700,1,900]);coPlugin.run(coPlugin.probe());assert.deepEqual(calls.at(-1),['use',900,700,1]);
// [VI dòng gốc 28] gán bagRows.length bằng 0 | gán item bằng null | gán owned bằng true | gọi W.KVPV_REBORN_EXECUTORS.sync()
bagRows.length=0;item=null;owned=true;W.KVPV_REBORN_EXECUTORS.sync();coPlugin.run(coPlugin.probe());assert.deepEqual(calls.at(-1),['put',700]);
// [VI dòng gốc 29] gọi ep.set(700, true) | gán placed bằng true | gán owned bằng false | gọi W.KVPV_REBORN_EXECUTORS.sync()
ep.set(700,true);placed=true;owned=false;W.KVPV_REBORN_EXECUTORS.sync();coPlugin.run(coPlugin.probe());assert.equal(calls.at(-1),'activate');
// [VI dòng gốc 30] gán count bằng 4 | gọi W.KVPV_REBORN_EXECUTORS.sync() | gọi assert.equal(W.KVPV_REBORN_EXECUTORS.status().cobao.confirmed, 4) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(coPlugin.probe().ready, false) để kiểm tra hai giá trị bằng nhau
count=4;W.KVPV_REBORN_EXECUTORS.sync();assert.equal(W.KVPV_REBORN_EXECUTORS.status().cobao.confirmed,4);assert.equal(coPlugin.probe().ready,false);
// [VI dòng gốc 31] gán placed bằng false | gán which bằng 'arena' | gọi W.KVPV_REBORN_EXECUTORS.sync() | gọi assert.equal(W.KVPV_V864.config.enabled, true) để kiểm tra hai giá trị bằng nhau
placed=false;which='arena';W.KVPV_REBORN_EXECUTORS.sync();assert.equal(W.KVPV_V864.config.enabled,true);assert.equal(W.KVPV_V865.config.enabled,false);
// [VI dòng gốc 32] gọi arPlugin.run(arPlugin.probe()) | gọi assert.deepEqual(calls.at(-1), ['arena',42,1]) để kiểm tra cấu trúc hai giá trị tương đương | gọi assert.equal(arPlugin.probe().ready, false) để kiểm tra hai giá trị bằng nhau
arPlugin.run(arPlugin.probe());assert.deepEqual(calls.at(-1),['arena',42,1]);assert.equal(arPlugin.probe().ready,false);
// [VI dòng gốc 33] giảm attempts một đơn vị sau khi lấy giá trị | gọi W.KVPV_REBORN_EXECUTORS.sync() | gọi assert.equal(W.KVPV_REBORN_EXECUTORS.status().arena.confirmed, 1) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(lease, null) để kiểm tra hai giá trị bằng nhau
attempts--;W.KVPV_REBORN_EXECUTORS.sync();assert.equal(W.KVPV_REBORN_EXECUTORS.status().arena.confirmed,1);assert.equal(lease,null);
// [VI dòng gốc 34] gán quick bằng false | gọi arPlugin.run(arPlugin.probe()) | gọi assert.deepEqual(calls.at(-1), ['arena',42,-1]) để kiểm tra cấu trúc hai giá trị tương đương
quick=false;arPlugin.run(arPlugin.probe());assert.deepEqual(calls.at(-1),['arena',42,-1]);
// [VI dòng gốc 35] gán common bằng false | gán map bằng 2281 | gọi W.KVPV_REBORN_EXECUTORS.sync() | giảm attempts một đơn vị sau khi lấy giá trị
common=false;map=2281;W.KVPV_REBORN_EXECUTORS.sync();attempts--;common=true;map=1002;W.KVPV_REBORN_EXECUTORS.sync();
// [VI dòng gốc 36] gọi assert.equal(W.KVPV_REBORN_EXECUTORS.status().arena.confirmed, 2) để kiểm tra hai giá trị bằng nhau | gán attempts bằng 0 | gọi assert.equal(arPlugin.probe().ready, false, 'no attempt purchase') để kiểm tra hai giá trị bằng nhau
assert.equal(W.KVPV_REBORN_EXECUTORS.status().arena.confirmed,2);attempts=0;assert.equal(arPlugin.probe().ready,false,'no attempt purchase');
// [VI dòng gốc 37] Chú thích gốc của tác giả; không được thực thi. Nội dung: Available rewards are independent of era goals and never create a stage-farming goal.
// Available rewards are independent of era goals and never create a stage-farming goal.
// [VI dòng gốc 38] gán which bằng 'none' | gán owned bằng true | gán placed bằng false | gọi ep.clear()
which='none';count=3;owned=true;placed=false;ep.clear();
// Available fragments alone must not start CoBao work outside its selected reborn node.
assert.equal(coPlugin.probe().ready,false);assert.equal(W.KVPV_REBORN_EXECUTORS.cobaoStageGoal(),null);
which='co';assert.equal(coPlugin.probe().ready,true,'selected CoBao goal enables fragment work');
// [VI dòng gốc 40] gọi coPlugin.run(coPlugin.probe()) | gọi assert.deepEqual(calls.at(-1), ['put',700]) để kiểm tra cấu trúc hai giá trị tương đương
coPlugin.run(coPlugin.probe());assert.deepEqual(calls.at(-1),['put',700]);
// [VI dòng gốc 41] Khai báo biến không gán lại bằng const: sent = đọc calls.length | Duyệt từng giá trị trong timers bằng const tick. | Khai báo biến không gán lại bằng const: tick (chưa gán giá trị) | gọi tick() để xử lý một nhịp kiểm tra
const sent=calls.length;for(const tick of timers)tick();assert.equal(calls.length,sent,'fast and normal loops share pending latch');
// [VI dòng gốc 42] gọi load() | gọi assert.equal(timers.size, 2) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(coPlugin.probe().ready, false, 'global placement pending survives reload') để kiểm tra hai giá trị bằng nhau
load();assert.equal(timers.size,2);assert.equal(coPlugin.probe().ready,false,'global placement pending survives reload');
// [VI dòng gốc 43] gọi ep.set(700, true) | gán owned bằng false | gán placed bằng true | gọi W.KVPV_REBORN_EXECUTORS.sync()
ep.set(700,true);owned=false;placed=true;W.KVPV_REBORN_EXECUTORS.sync();
// [VI dòng gốc 44] gọi coPlugin.run(coPlugin.probe()) | gọi assert.equal(calls.at(-1), 'activate') để kiểm tra hai giá trị bằng nhau
coPlugin.run(coPlugin.probe());assert.equal(calls.at(-1),'activate');
// [VI dòng gốc 45] tăng count một đơn vị sau khi lấy giá trị | gán placed bằng false | gọi W.KVPV_REBORN_EXECUTORS.sync() | gọi assert.equal(coPlugin.probe().ready, false) để kiểm tra hai giá trị bằng nhau
count++;placed=false;W.KVPV_REBORN_EXECUTORS.sync();assert.equal(coPlugin.probe().ready,false);
// [VI dòng gốc 46] gán reward bằng {lv:50,mapId:2011,sig:'global-reward'} | gán W._Ba._Co._Mo.ins.awardLvs bằng [50]
reward={lv:50,mapId:2011,sig:'global-reward'};W._Ba._Co._Mo.ins.awardLvs=[50];
// [VI dòng gốc 47] gán W.__KVPV_USER_UI_UNTIL bằng Date.now()+5000 | Khai báo biến không gán lại bằng const: beforeManual = đọc calls.length
W.__KVPV_USER_UI_UNTIL=Date.now()+5000;const beforeManual=calls.length;
// [VI dòng gốc 48] Duyệt từng giá trị trong timers bằng const tick. | Khai báo biến không gán lại bằng const: tick (chưa gán giá trị) | gọi tick() để xử lý một nhịp kiểm tra | gọi assert.equal(calls.length, beforeManual, 'manual interaction yields') để kiểm tra hai giá trị bằng nhau
for(const tick of timers)tick();assert.equal(calls.length,beforeManual,'manual interaction yields');
// [VI dòng gốc 49] gán W.__KVPV_USER_UI_UNTIL bằng 0 | Duyệt từng giá trị trong timers bằng const tick. | Khai báo biến không gán lại bằng const: tick (chưa gán giá trị) | gọi tick() để xử lý một nhịp kiểm tra
W.__KVPV_USER_UI_UNTIL=0;for(const tick of timers)tick();
// [VI dòng gốc 50] gọi assert.deepEqual(calls.at(-1), ['claim',2011,50], 'fast watcher claims available reward without era goal') để kiểm tra cấu trúc hai giá trị tương đương
assert.deepEqual(calls.at(-1),['claim',2011,50],'fast watcher claims available reward without era goal');
// [VI dòng gốc 51] Khai báo biến không gán lại bằng const: afterFast = đọc calls.length | Lặp for: khởi tạo let i=0; tiếp tục khi i<20; sau mỗi vòng i++. | Khai báo biến có thể gán lại bằng let: i = 0 | Duyệt từng giá trị trong timers bằng const tick.
const afterFast=calls.length;for(let i=0;i<20;i++)for(const tick of timers)tick();
// [VI dòng gốc 52] gọi assert.equal(calls.length, afterFast, 'repeated ticks never replay unacknowledged claim') để kiểm tra hai giá trị bằng nhau
assert.equal(calls.length,afterFast,'repeated ticks never replay unacknowledged claim');
// [VI dòng gốc 53] gán W._Ba._rJ._O$.ins.actorId bằng 'other' | gọi W.KVPV_REBORN_EXECUTORS.sync() | gọi assert.equal(timers.size, 0) để kiểm tra hai giá trị bằng nhau
W._Ba._rJ._O$.ins.actorId='other';W.KVPV_REBORN_EXECUTORS.sync();assert.equal(timers.size,0);
// [VI dòng gốc 54] gọi console.log('PASS era CoBao/Arena: stage prerequisites, claim/use/place/activate ACK chain, main-sender exclusion, reload, free quic…)
console.log('PASS era CoBao/Arena: stage prerequisites, claim/use/place/activate ACK chain, main-sender exclusion, reload, free quick/normal fight, return ACK, no paid attempts and actor ownership');
// [VI dòng gốc 55] Dòng trống để tách các phần, không có lệnh thực thi.
