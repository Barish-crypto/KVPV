// [VI dòng gốc 1] "use strict"
'use strict';
// [VI dòng gốc 2] Khai báo biến không gán lại bằng const: fs = gọi require('node:fs') để nạp module Node.js; vm = gọi require('node:vm') để nạp module Node.js; assert = gọi require('node:assert/strict') để nạp module Node.js
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
// [VI dòng gốc 3] Khai báo biến không gán lại bằng const: source = gọi fs.readFileSync(__dirname+'/src/29-quest-goals.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm, '')
const source=fs.readFileSync(__dirname+'/src/29-quest-goals.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,'');
// [VI dòng gốc 4] Khai báo biến có thể gán lại bằng let: id = "c4"; state = 1; name = "Tích lũy kích hoạt 4 Cổ Bảo"; action = 189; finished = 29; count = 3; step = "activate"; active = false; targetFloor = null; pendingFloor = null; common = true; popup = false; trial = false; job = "rảnh"; starts = 0; stops = 0
let id='c4',state=1,name='Tích lũy kích hoạt 4 Cổ Bảo',action=189,finished=29,count=3,step='activate',
// [VI dòng gốc 5] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng name. Đọc cùng dòng mở phía trên: active=false,targetFloor=null,pendingFloor=null,common=true,popup=false,trial=false,job='rảnh',starts=0,stops=0;
 active=false,targetFloor=null,pendingFloor=null,common=true,popup=false,trial=false,job='rảnh',starts=0,stops=0;
// [VI dòng gốc 6] Khai báo biến không gán lại bằng const: timers = tạo đối tượng bằng Map() | Khai báo biến có thể gán lại bằng let: serial = 0
const timers=new Map();let serial=0;
// [VI dòng gốc 7] Khai báo biến không gán lại bằng const: co = tạo đối tượng gồm config, plan
const co={config:{coBaoTaskId:'m1094',requiredCoBao:2},plan:()=>({step,fragments:{count}})};
// [VI dòng gốc 8] Khai báo biến không gán lại bằng const: W = tạo đối tượng gồm __KVPV_OWN_ACTOR_ID, _Ba, _ft, KVPV_DAILY, KVPV_DAILY_TRIAL, KVPV_CONFIRM_POPUPS, KVPV_V864, KVPV_LINHLUNG922, KVPV_LINHLUNG_TH, setInterval, clearInterval
const W={__KVPV_OWN_ACTOR_ID:'123456',_Ba:{_rJ:{_O$:{ins:{actorId:'123456'}}},
// [VI dòng gốc 9] Kết thúc hàm hiện tại và trả về: tạo mảng gồm 3 vị trí: [id,state,[count,4]]. | Kết thúc hàm hiện tại và trả về: finished.
 _zIt:{_FIt:{ins:{get taskInfo(){return [id,state,[count,4]];}}}},_tQ:{_$Y:{ins:{get finishLevel(){return finished;}}}},
// [VI dòng gốc 10] Kết thúc hàm hiện tại và trả về: common.
 _$a:{SceneUtil:{get isCommonScene(){return common;}},_yo:{ins:{isInMission:false}}}},
// [VI dòng gốc 11] Thuộc tính _ft: tạo đối tượng gồm __Z | Thuộc tính __Z: tạo đối tượng gồm ins | Thuộc tính ins: tạo đối tượng gồm getTaskCfgById | Thuộc tính getTaskCfgById: tạo hàm với tham số (không có); mỗi lần gọi trả về tạo mảng gồm 7 vị trí: [0,name,0,0,0,0,action]
 _ft:{__Z:{ins:{getTaskCfgById:()=>[0,name,0,0,0,0,action]}}},
// [VI dòng gốc 12] Thuộc tính KVPV_DAILY: tạo đối tượng gồm quickState | Thuộc tính quickState: tạo hàm với tham số (không có); mỗi lần gọi trả về tạo đối tượng gồm running, job | Thuộc tính running: true | Thuộc tính job: dùng biến cùng tên
 KVPV_DAILY:{quickState:()=>({running:true,job})},KVPV_DAILY_TRIAL:{hasPriority:()=>trial},
// [VI dòng gốc 13] Thuộc tính KVPV_CONFIRM_POPUPS: tạo đối tượng gồm beforeTask | Thuộc tính beforeTask: tạo hàm với tham số (không có); mỗi lần gọi trả về popup | Thuộc tính KVPV_V864: co
 KVPV_CONFIRM_POPUPS:{beforeTask:()=>popup},KVPV_V864:co,
// [VI dòng gốc 14] tăng stops một đơn vị sau khi lấy giá trị | gán active bằng false | gán targetFloor bằng n
 KVPV_LINHLUNG922:{status:()=>({active,targetFloor,pendingFloor}),stop(){stops++;active=false;},setTargetFloor(n){targetFloor=n;}},
// [VI dòng gốc 15] tăng starts một đơn vị sau khi lấy giá trị | gọi assert.equal(o.exclusiveDaily, true) để kiểm tra hai giá trị bằng nhau | gán active bằng true | gán targetFloor bằng o.targetFloor
 KVPV_LINHLUNG_TH:{start(o){starts++;assert.equal(o.exclusiveDaily,true);active=true;targetFloor=o.targetFloor;}},
// [VI dòng gốc 16] gọi timers.set(++serial, fn) | Kết thúc hàm hiện tại và trả về: serial. | gọi timers.delete(i)
 setInterval(fn){timers.set(++serial,fn);return serial;},clearInterval(i){timers.delete(i);}};
// [VI dòng gốc 17] Khai báo biến không gán lại bằng const: ctx = tạo đối tượng gồm window | Khai báo biến không gán lại bằng const: load = tạo hàm với tham số (không có); mỗi lần gọi trả về gọi vm.runInNewContext(source, ctx) để chạy mã trong ngữ cảnh máy ảo dùng cho kiểm thử | gọi load()
const ctx={window:W};const load=()=>vm.runInNewContext(source,ctx);load();
// [VI dòng gốc 18] Khai báo biến không gán lại bằng const: sync = tạo hàm với tham số (không có); mỗi lần gọi trả về gọi W.KVPV_QUEST_GOALS.sync()
const sync=()=>W.KVPV_QUEST_GOALS.sync();
// [VI dòng gốc 19] gọi assert.equal(co.config.coBaoTaskId, 'c4') để kiểm tra hai giá trị bằng nhau | gọi assert.equal(co.config.requiredCoBao, 4) để kiểm tra hai giá trị bằng nhau
assert.equal(co.config.coBaoTaskId,'c4');assert.equal(co.config.requiredCoBao,4);
// [VI dòng gốc 20] gọi assert.equal(W.KVPV_QUEST_GOALS.status().reason, 'cobao_activate') để kiểm tra hai giá trị bằng nhau
assert.equal(W.KVPV_QUEST_GOALS.status().reason,'cobao_activate');
// [VI dòng gốc 21] gán count bằng 4 | gọi sync() | gọi assert.equal(W.KVPV_QUEST_GOALS.status().reason, 'waiting_cobao_quest_ack') để kiểm tra hai giá trị bằng nhau
count=4;sync();assert.equal(W.KVPV_QUEST_GOALS.status().reason,'waiting_cobao_quest_ack');
// [VI dòng gốc 22] gán step bằng 'missing' | gán count bằng 3 | gọi sync() | gọi assert.equal(W.KVPV_QUEST_GOALS.status().reason, 'missing_cobao_fragments') để kiểm tra hai giá trị bằng nhau
step='missing';count=3;sync();assert.equal(W.KVPV_QUEST_GOALS.status().reason,'missing_cobao_fragments');
// [VI dòng gốc 23] gọi load() | gọi assert.equal(timers.size, 1) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(co.config.requiredCoBao, 4) để kiểm tra hai giá trị bằng nhau
load();assert.equal(timers.size,1);assert.equal(co.config.requiredCoBao,4);
// [VI dòng gốc 24] gán id bằng 'll30' | gán name bằng 'Vượt Linh Lung Tháp Tầng 30' | gán action bằng 21
id='ll30';name='Vượt Linh Lung Tháp Tầng 30';action=21;
// [VI dòng gốc 25] gán trial bằng true | gọi sync() | gọi assert.equal(starts, 0, 'trial priority') để kiểm tra hai giá trị bằng nhau | gán trial bằng false
trial=true;sync();assert.equal(starts,0,'trial priority');trial=false;popup=true;sync();assert.equal(starts,0);
// [VI dòng gốc 26] gán popup bằng false | gán job bằng 'other' | gọi sync() | gọi assert.equal(starts, 0) để kiểm tra hai giá trị bằng nhau
popup=false;job='other';sync();assert.equal(starts,0);job='rảnh';sync();assert.equal(starts,1);assert.equal(targetFloor,30);
// [VI dòng gốc 27] gọi assert.equal(co.config.coBaoTaskId, 'm1094') để kiểm tra hai giá trị bằng nhau | gọi assert.equal(co.config.requiredCoBao, 2, 'restore original cobao config') để kiểm tra hai giá trị bằng nhau
assert.equal(co.config.coBaoTaskId,'m1094');assert.equal(co.config.requiredCoBao,2,'restore original cobao config');
// [VI dòng gốc 28] gọi load() | gọi sync() | gọi assert.equal(starts, 1, 'reload never restarts active floor') để kiểm tra hai giá trị bằng nhau | gọi assert.equal(timers.size, 1) để kiểm tra hai giá trị bằng nhau
load();sync();assert.equal(starts,1,'reload never restarts active floor');assert.equal(timers.size,1);
// [VI dòng gốc 29] gán finished bằng 30 | gán pendingFloor bằng 30 | gọi sync() | gọi assert.equal(stops, 0, 'do not interrupt pending battle') để kiểm tra hai giá trị bằng nhau
finished=30;pendingFloor=30;sync();assert.equal(stops,0,'do not interrupt pending battle');
// [VI dòng gốc 30] gán pendingFloor bằng null | gọi sync() | gọi assert.equal(stops, 1) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(W.KVPV_QUEST_GOALS.status().reason, 'waiting_tower_quest_ack') để kiểm tra hai giá trị bằng nhau
pendingFloor=null;sync();assert.equal(stops,1);assert.equal(W.KVPV_QUEST_GOALS.status().reason,'waiting_tower_quest_ack');
// [VI dòng gốc 31] gán state bằng 2 | gọi sync() | gọi assert.equal(W.KVPV_QUEST_GOALS.status().reason, 'waiting_native_quest_reward') để kiểm tra hai giá trị bằng nhau
state=2;sync();assert.equal(W.KVPV_QUEST_GOALS.status().reason,'waiting_native_quest_reward');
// [VI dòng gốc 32] gán state bằng 1 | gán id bằng 'll40' | gán name bằng 'Vượt Linh Lung Tháp Tầng 40' | gọi sync()
state=1;id='ll40';name='Vượt Linh Lung Tháp Tầng 40';sync();assert.equal(starts,2);assert.equal(targetFloor,40);
// [VI dòng gốc 33] gán active bằng false | gọi sync() | gọi assert.equal(starts, 2, 'failure does not blindly restart same goal') để kiểm tra hai giá trị bằng nhau
active=false;sync();assert.equal(starts,2,'failure does not blindly restart same goal');
// [VI dòng gốc 34] Khai báo biến không gán lại bằng const: recognize = đọc W.KVPV_QUEST_GOALS.recognize
const recognize=W.KVPV_QUEST_GOALS.recognize;
// [VI dòng gốc 35] gọi assert.equal(recognize({id:'x',name:'Vượt Linh Lung Tháp Tầng 30',action:999}), null) để kiểm tra hai giá trị bằng nhau
assert.equal(recognize({id:'x',name:'Vượt Linh Lung Tháp Tầng 30',action:999}),null);
// [VI dòng gốc 36] gọi assert.equal(recognize({id:'x',name:'Kích hoạt Cổ Bảo',action:189}), null) để kiểm tra hai giá trị bằng nhau
assert.equal(recognize({id:'x',name:'Kích hoạt Cổ Bảo',action:189}),null);
// [VI dòng gốc 37] gọi assert.equal(recognize({id:'x',name:'Tích lũy kích hoạt <font>4</font>Cổ Bảo',action:189}).target, 4) để kiểm tra hai giá trị bằng nhau
assert.equal(recognize({id:'x',name:'Tích lũy kích hoạt <font>4</font>Cổ Bảo',action:189}).target,4);
// [VI dòng gốc 38] gọi assert.equal(recognize({id:'x',name:'Vượt Linh Lung Tháp Tầng 30',action:21}).target, 30) để kiểm tra hai giá trị bằng nhau
assert.equal(recognize({id:'x',name:'Vượt Linh Lung Tháp Tầng 30',action:21}).target,30);
// [VI dòng gốc 39] gán W._Ba._rJ._O$.ins.actorId bằng '999999' | gọi sync() | gọi assert.equal(timers.size, 0) để kiểm tra hai giá trị bằng nhau
W._Ba._rJ._O$.ins.actorId='999999';sync();assert.equal(timers.size,0);
// [VI dòng gốc 40] gọi console.log('PASS quest goals: live ID/action/name/target decoding, CoBao4 vs legacy2, missing materials, tower30 from29, priorities…)
console.log('PASS quest goals: live ID/action/name/target decoding, CoBao4 vs legacy2, missing materials, tower30 from29, priorities, reload, in-flight finish, completion, no replay and identity');
// [VI dòng gốc 41] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 42] Chú thích gốc của tác giả; không được thực thi. Nội dung: Native chain: activate fourth artifact -> missing fragment -> configured stage -> claim/use/place/activate.
// Native chain: activate fourth artifact -> missing fragment -> configured stage -> claim/use/place/activate.
// [VI dòng gốc 43] gán W._Ba._rJ._O$.ins.actorId bằng '123456' | gán state bằng 1 | gán id bằng 'c4' | gán name bằng 'Tích lũy kích hoạt 4 Cổ Bảo'
W._Ba._rJ._O$.ins.actorId='123456';state=1;id='c4';name='Tích lũy kích hoạt 4 Cổ Bảo';action=189;
// [VI dòng gốc 44] Khai báo biến có thể gán lại bằng let: stageLevel = 50; stageStarts = 0; locked = false; directorTicks = 0
let stageLevel=50,stageStarts=0,locked=false,directorTicks=0;
// [VI dòng gốc 45] Khai báo biến không gán lại bằng const: stage = tạo đối tượng gồm curLv, auto, awardLvs | Kết thúc hàm hiện tại và trả về: stageLevel.
const stage={get curLv(){return stageLevel;},auto:false,awardLvs:[]};
// [VI dòng gốc 46] gán W._Ba._Co bằng {_Mo:{ins:stage}} | gán W._ft._h$ bằng {ins:{getCfgByLv:n=>n>=50&&n<=60?[2011]:null}}
W._Ba._Co={_Mo:{ins:stage}};W._ft._h$={ins:{getCfgByLv:n=>n>=50&&n<=60?[2011]:null}};
// [VI dòng gốc 47] gán W.KVPV_DAILY.config bằng {enableTuVuot:false}
W.KVPV_DAILY.config={enableTuVuot:false};
// [VI dòng gốc 48] gán W.KVPV_DAILY.tuVuotStart bằng ()=>{stageStarts++;W.KVPV_DAILY.config.enableTuVuot=true;} | tăng stageStarts một đơn vị sau khi lấy giá trị | gán W.KVPV_DAILY.config.enableTuVuot bằng true
W.KVPV_DAILY.tuVuotStart=()=>{stageStarts++;W.KVPV_DAILY.config.enableTuVuot=true;};
// [VI dòng gốc 49] gán W.KVPV_V866 bằng {config:{questFirst:true},tick(){directorTicks++;assert.equal(this.config.questFirst,false);W.KVPV_DAILY.config.enableTuVuot=false;}} | tăng directorTicks một đơn vị sau khi lấy giá trị | gọi assert.equal(this.config.questFirst, false) để kiểm tra hai giá trị bằng nhau | gán W.KVPV_DAILY.config.enableTuVuot bằng false
W.KVPV_V866={config:{questFirst:true},tick(){directorTicks++;assert.equal(this.config.questFirst,false);W.KVPV_DAILY.config.enableTuVuot=false;}};
// [VI dòng gốc 50] gán W.KVPV bằng {stageGuard:{isLocked:()=>locked}}
W.KVPV={stageGuard:{isLocked:()=>locked}};
// [VI dòng gốc 51] gán co.config.suspendTuVuotDuringCoBao bằng true
co.config.suspendTuVuotDuringCoBao=true;
// [VI dòng gốc 52] Khai báo biến có thể gán lại bằng let: dependencyStep = "missing"; have = false
let dependencyStep='missing',have=false;
// [VI dòng gốc 53] gán co.plan bằng ()=>({step:dependencyStep,fragments:{count:3,config:[3,'Artifact Four',[701,702],0,0,0,0,[50,60]], rows:[{id:701,index:0,owned:have,placed:false,stage:50},{id:702,index:1,owned:fal…
co.plan=()=>({step:dependencyStep,fragments:{count:3,config:[3,'Artifact Four',[701,702],0,0,0,0,[50,60]],
// [VI dòng gốc 54] Thuộc tính rows: tạo mảng gồm 2 vị trí: [{id:701,index:0,owned:have,placed:false,stage:50},{id:702,index:1,owned:false,placed:true,stage:60}] | Thuộc tính id: 701 | Thuộc tính index: 0 | Thuộc tính owned: have
 rows:[{id:701,index:0,owned:have,placed:false,stage:50},{id:702,index:1,owned:false,placed:true,stage:60}]}});
// [VI dòng gốc 55] gán common bằng true | gán trial bằng false | gán popup bằng false | gán job bằng 'rảnh'
common=true;trial=false;popup=false;job='rảnh';load();
// [VI dòng gốc 56] gọi assert.equal(stageStarts, 1) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(co.config.suspendTuVuotDuringCoBao, false) để kiểm tra hai giá trị bằng nhau
assert.equal(stageStarts,1);assert.equal(co.config.suspendTuVuotDuringCoBao,false);
// [VI dòng gốc 57] gọi assert.equal(W.KVPV_V866.config.questFirst, false) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(W.KVPV_DAILY.config.enableTuVuot, true) để kiểm tra hai giá trị bằng nhau
assert.equal(W.KVPV_V866.config.questFirst,false);assert.equal(W.KVPV_DAILY.config.enableTuVuot,true);
// [VI dòng gốc 58] gọi assert.equal(W.KVPV_QUEST_GOALS.status().dependency.missing[0].stage, 50) để kiểm tra hai giá trị bằng nhau
assert.equal(W.KVPV_QUEST_GOALS.status().dependency.missing[0].stage,50);
// [VI dòng gốc 59] gọi assert.equal(W.KVPV_QUEST_GOALS.status().dependency.artifactNumber, 4) để kiểm tra hai giá trị bằng nhau
assert.equal(W.KVPV_QUEST_GOALS.status().dependency.artifactNumber,4);
// [VI dòng gốc 60] gọi load() | gọi sync() | gọi assert.equal(stageStarts, 1, 'hot reload retains running prerequisite') để kiểm tra hai giá trị bằng nhau
load();sync();assert.equal(stageStarts,1,'hot reload retains running prerequisite');
// [VI dòng gốc 61] gọi assert.equal(directorTicks, 1) để kiểm tra hai giá trị bằng nhau | gán stageLevel bằng 51 | gán stage.auto bằng true | gán stage.awardLvs bằng [50]
assert.equal(directorTicks,1);stageLevel=51;stage.auto=true;stage.awardLvs=[50];dependencyStep='claimStage';sync();
// [VI dòng gốc 62] gọi assert.equal(stage.auto, false) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(W.KVPV_DAILY.config.enableTuVuot, false) để kiểm tra hai giá trị bằng nhau
assert.equal(stage.auto,false);assert.equal(W.KVPV_DAILY.config.enableTuVuot,false);
// [VI dòng gốc 63] gọi assert.equal(co.config.suspendTuVuotDuringCoBao, true) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(W.KVPV_V866.config.questFirst, true) để kiểm tra hai giá trị bằng nhau
assert.equal(co.config.suspendTuVuotDuringCoBao,true);assert.equal(W.KVPV_V866.config.questFirst,true);
// [VI dòng gốc 64] gọi assert.equal(W.KVPV_QUEST_GOALS.status().reason, 'cobao_claimStage') để kiểm tra hai giá trị bằng nhau
assert.equal(W.KVPV_QUEST_GOALS.status().reason,'cobao_claimStage');
// [VI dòng gốc 65] gán dependencyStep bằng 'put' | gán have bằng true | gọi sync() | gọi assert.equal(stageStarts, 1, 'owned fragment proceeds without farming again') để kiểm tra hai giá trị bằng nhau
dependencyStep='put';have=true;sync();assert.equal(stageStarts,1,'owned fragment proceeds without farming again');
// [VI dòng gốc 66] gán dependencyStep bằng 'missing' | gán have bằng false | gán stageLevel bằng 50 | gán locked bằng true
dependencyStep='missing';have=false;stageLevel=50;locked=true;sync();assert.equal(stageStarts,1,'manual pause respected');
// [VI dòng gốc 67] gọi assert.equal(W.KVPV_QUEST_GOALS.status().reason, 'cobao_prerequisite_stage_manually_paused') để kiểm tra hai giá trị bằng nhau
assert.equal(W.KVPV_QUEST_GOALS.status().reason,'cobao_prerequisite_stage_manually_paused');
// [VI dòng gốc 68] gán locked bằng false | gán W._ft._h$.ins.getCfgByLv bằng ()=>null | gọi sync() | gọi assert.equal(stageStarts, 1, 'unknown stage config is not guessed') để kiểm tra hai giá trị bằng nhau
locked=false;W._ft._h$.ins.getCfgByLv=()=>null;sync();assert.equal(stageStarts,1,'unknown stage config is not guessed');
// [VI dòng gốc 69] gọi console.log('PASS CoBao dependency chain: artifact4 config index3, fragment stage50, old director and CoBao stage locks released tog…)
console.log('PASS CoBao dependency chain: artifact4 config index3, fragment stage50, old director and CoBao stage locks released together, bounded goal, claim/place handoff, reload, pause and unknown-source guards');
// [VI dòng gốc 70] Dòng trống để tách các phần, không có lệnh thực thi.
