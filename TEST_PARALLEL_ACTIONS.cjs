// [VI dòng gốc 1] "use strict"
'use strict';
// [VI dòng gốc 2] Khai báo biến không gán lại bằng const: fs = gọi require('node:fs') để nạp module Node.js; vm = gọi require('node:vm') để nạp module Node.js; assert = gọi require('node:assert/strict') để nạp module Node.js
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
// [VI dòng gốc 3] Khai báo biến không gán lại bằng const: source = gọi fs.readFileSync(__dirname+'/src/01-parallel-actions.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm, '')
const source=fs.readFileSync(__dirname+'/src/01-parallel-actions.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,'');
// [VI dòng gốc 4] Khai báo biến có thể gán lại bằng let: legacyReady = false; legacyState = "l0"
let legacyReady=false,legacyState='l0';
// [VI dòng gốc 5] Khai báo biến có thể gán lại bằng let: now = 1000; oldBusy = true; popup = false; upgrades = 0; resources = 0; skillConfirmed = 0
let now=1000,oldBusy=true,popup=false,upgrades=0,resources=0,skillConfirmed=0;
// [VI dòng gốc 6] Khai báo biến không gán lại bằng const: calls = tạo mảng gồm 0 vị trí: []; plugins = tạo đối tượng bằng Map(); timers = tạo đối tượng bằng Set(); states = tạo đối tượng gồm a, b, c; ready = tạo đối tượng gồm a, b, c
const calls=[],plugins=new Map(),timers=new Set(),states={a:'a0',b:'b0',c:'c0'},ready={a:true,b:true,c:true};
// [VI dòng gốc 7] Khai báo biến không gán lại bằng const: v = tạo đối tượng gồm config, register, toggle, report, provide | Kiểm tra plugins.has(d.id): đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('Trung module ID') | gọi plugins.set(d.id, {...d})
const v={config:{enabled:true,autoExecuteVerified:true},register(d){if(plugins.has(d.id))throw Error('Trung module ID');plugins.set(d.id,{...d});return d.id;},
// [VI dòng gốc 8] Khai báo biến không gán lại bằng const: p = gọi plugins.get(id) | Kiểm tra !p: đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('unknown id') | gán p.enabled bằng on
 toggle(id,on){const p=plugins.get(id);if(!p)throw Error('unknown id');p.enabled=on;return on;},
// [VI dòng gốc 9] Thuộc tính report: tạo hàm với tham số (không có); mỗi lần gọi trả về tạo đối tượng gồm plugins | Thuộc tính plugins: gọi [...plugins.values()].map(d=>({id:d.id,name:d.name,enabled:d.enabled,verified:d.verified,spend:d.spend})) để biến đổi từng phần tử | Thuộc tính id: đọc d.id | Thuộc tính name: đọc d.name
 report:()=>({plugins:[...plugins.values()].map(d=>({id:d.id,name:d.name,enabled:d.enabled,verified:d.verified,spend:d.spend}))}),
// [VI dòng gốc 10] Khai báo biến không gán lại bằng const: d = gọi [...plugins.values()].find(d=>d.enabled&&d.kind===mode&&d.probe().ready) để tìm phần tử đầu tiên thỏa điều kiện | Kiểm tra !d: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: null. | Khai báo biến không gán lại bằng const: st = gọi d.probe()
 provide(mode){const d=[...plugins.values()].find(d=>d.enabled&&d.kind===mode&&d.probe().ready);if(!d)return null;const st=d.probe();return {what:'V8 '+d.name,before:st.signature,probe:()=>d.probe().signature,run:()=>d.run(st),done:()=>calls.push('done-'+d.id)};}};
// [VI dòng gốc 11] gọi v.register({id:'legacy',name:'legacy',kind:'claim',verified:true,enabled:true,spend:'none',probe:()=>({ready:legacyReady,signature:…)
v.register({id:'legacy',name:'legacy',kind:'claim',verified:true,enabled:true,spend:'none',probe:()=>({ready:legacyReady,signature:legacyState}),run:()=>calls.push('legacy')});
// [VI dòng gốc 12] Khai báo biến không gán lại bằng const: W = tạo đối tượng gồm __KVPV_OWN_ACTOR_ID, _Ba, KVPV_DAILY, KVPV_CONFIRM_POPUPS, setInterval, clearInterval
const W={__KVPV_OWN_ACTOR_ID:'a',_Ba:{_rJ:{_O$:{ins:{actorId:'a'}}},_$a:{SceneUtil:{isCommonScene:true},_yo:{ins:{isInMission:false}}}},
// [VI dòng gốc 13] Thuộc tính KVPV_DAILY: tạo đối tượng gồm quickState | Thuộc tính quickState: tạo hàm với tham số (không có); mỗi lần gọi trả về tạo đối tượng gồm running, job | Thuộc tính running: true | Thuộc tính job: "rảnh"
 KVPV_DAILY:{quickState:()=>({running:true,job:'rảnh'})},KVPV_CONFIRM_POPUPS:{beforeTask:()=>popup},
// [VI dòng gốc 14] gọi timers.add(fn) | Kết thúc hàm hiện tại và trả về: fn. | gọi timers.delete(fn)
 setInterval(fn){timers.add(fn);return fn;},clearInterval(fn){timers.delete(fn);}};
// [VI dòng gốc 15] Khai báo biến không gán lại bằng const: ctx = gọi vm.createContext({window:W,Date:{now:()=>now}}); load = tạo hàm với tham số (không có); mỗi lần gọi trả về gọi vm.runInContext(source, ctx) | gọi load()
const ctx=vm.createContext({window:W,Date:{now:()=>now}}),load=()=>vm.runInContext(source,ctx);load();
// [VI dòng gốc 16] gán W.KVPV_UPGRADES bằng {config:{checkMs:15000,maxRequestsPerHour:{tienVi:12}},busy:()=>oldBusy,run:()=>upgrades++}
W.KVPV_UPGRADES={config:{checkMs:15000,maxRequestsPerHour:{tienVi:12}},busy:()=>oldBusy,run:()=>upgrades++};
// [VI dòng gốc 17] gán W.KVPV_BG_RESOURCES bằng {config:{minBetweenMs:1100},tick:()=>resources++} | gán W.KVPV_V8 bằng v
W.KVPV_BG_RESOURCES={config:{minBetweenMs:1100},tick:()=>resources++};W.KVPV_V8=v;
// [VI dòng gốc 18] Duyệt từng giá trị trong ['a','b'] bằng const id. | Khai báo biến không gán lại bằng const: id (chưa gán giá trị) | gọi v.register({id,name:id,kind:'work',verified:true,enabled:true,spend:'materials',probe:()=>({ready:ready[id],signature:states[id]}),…)
for(const id of ['a','b'])v.register({id,name:id,kind:'work',verified:true,enabled:true,spend:'materials',probe:()=>({ready:ready[id],signature:states[id]}),run:()=>calls.push(id)});
// [VI dòng gốc 19] gọi v.register({id:'premium',name:'premium',kind:'work',verified:false,enabled:false,spend:'premium',probe:()=>({ready:true,signature:'…)
v.register({id:'premium',name:'premium',kind:'work',verified:false,enabled:false,spend:'premium',probe:()=>({ready:true,signature:'x'}),run:()=>calls.push('premium')});
// [VI dòng gốc 20] gọi W.KVPV_PARALLEL_ACTIONS.start() để khởi động bộ điều khiển | gọi assert.equal(calls.length, 0, 'old shared request finishes once before takeover') để kiểm tra hai giá trị bằng nhau
W.KVPV_PARALLEL_ACTIONS.start();assert.equal(calls.length,0,'old shared request finishes once before takeover');
// [VI dòng gốc 21] gán oldBusy bằng false | gọi W.KVPV_PARALLEL_ACTIONS.sync() | gọi assert.deepEqual(calls, ['a','b'], 'different functions dispatch without waiting for each other') để kiểm tra cấu trúc hai giá trị tương đương
oldBusy=false;W.KVPV_PARALLEL_ACTIONS.sync();assert.deepEqual(calls,['a','b'],'different functions dispatch without waiting for each other');
// [VI dòng gốc 22] gọi assert.equal(W.KVPV_UPGRADES.config.checkMs, 50) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(W.KVPV_BG_RESOURCES.config.minBetweenMs, 0) để kiểm tra hai giá trị bằng nhau
assert.equal(W.KVPV_UPGRADES.config.checkMs,50);assert.equal(W.KVPV_BG_RESOURCES.config.minBetweenMs,0);
// [VI dòng gốc 23] gọi assert(upgrades>0&&resources>0) để kiểm tra điều kiện của bài test | gọi assert.equal(v.provide('work'), null, 'legacy shared queue cannot send captured functions again') để kiểm tra hai giá trị bằng nhau
assert(upgrades>0&&resources>0);assert.equal(v.provide('work'),null,'legacy shared queue cannot send captured functions again');
// [VI dòng gốc 24] gán oldBusy bằng true | gọi assert.equal(W.KVPV_UPGRADES.busy(), false, 'no global busy gate between functions') để kiểm tra hai giá trị bằng nhau | gán oldBusy bằng false
oldBusy=true;assert.equal(W.KVPV_UPGRADES.busy(),false,'no global busy gate between functions');oldBusy=false;
// [VI dòng gốc 25] gọi W.KVPV_PARALLEL_ACTIONS.sync() | gọi assert.deepEqual(calls, ['a','b'], 'unchanged same-function request cannot replay') để kiểm tra cấu trúc hai giá trị tương đương
W.KVPV_PARALLEL_ACTIONS.sync();assert.deepEqual(calls,['a','b'],'unchanged same-function request cannot replay');
// [VI dòng gốc 26] gán states.b bằng 'b1' | gọi W.KVPV_PARALLEL_ACTIONS.sync() | gọi assert.deepEqual(calls, ['a','b','b'], 'slow a does not block a newly ready b') để kiểm tra cấu trúc hai giá trị tương đương
states.b='b1';W.KVPV_PARALLEL_ACTIONS.sync();assert.deepEqual(calls,['a','b','b'],'slow a does not block a newly ready b');
// [VI dòng gốc 27] gọi load() | gọi W.KVPV_PARALLEL_ACTIONS.start() để khởi động bộ điều khiển | gọi assert.equal(timers.size, 1) để kiểm tra hai giá trị bằng nhau | gọi assert.deepEqual(calls, ['a','b','b'], 'hot reload retains both pending functions') để kiểm tra cấu trúc hai giá trị tương đương
load();W.KVPV_PARALLEL_ACTIONS.start();assert.equal(timers.size,1);assert.deepEqual(calls,['a','b','b'],'hot reload retains both pending functions');
// [VI dòng gốc 28] cập nhật bằng toán tử += now bằng 60000 | gọi W.KVPV_PARALLEL_ACTIONS.sync() | gọi assert(W.KVPV_PARALLEL_ACTIONS.status().pending.every(p=>p.reason==='waiting_ack_no_retry')) để kiểm tra điều kiện của bài test
now+=60000;W.KVPV_PARALLEL_ACTIONS.sync();assert(W.KVPV_PARALLEL_ACTIONS.status().pending.every(p=>p.reason==='waiting_ack_no_retry'));
// [VI dòng gốc 29] gọi assert(!calls.includes('premium')) để kiểm tra điều kiện của bài test
assert(!calls.includes('premium'));
// [VI dòng gốc 30] gán W.KVPV_SKILL_REWARDS bằng {status:()=>({confirmed:skillConfirmed})} | Khai báo biến có thể gán lại bằng let: skillReady = true
W.KVPV_SKILL_REWARDS={status:()=>({confirmed:skillConfirmed})};let skillReady=true;
// [VI dòng gốc 31] gọi v.register({id:'skill_handbook_rewards',name:'skills',kind:'claim',verified:true,enabled:true,spend:'none',probe:()=>skillReady?{re…) | gọi calls.push('skill') để thêm phần tử vào cuối mảng | gán skillReady bằng false
v.register({id:'skill_handbook_rewards',name:'skills',kind:'claim',verified:true,enabled:true,spend:'none',probe:()=>skillReady?{ready:true,signature:'one'}:{ready:false},run:()=>{calls.push('skill');skillReady=false;}});
// [VI dòng gốc 32] gọi W.KVPV_PARALLEL_ACTIONS.sync() | gọi assert(calls.includes('skill')) để kiểm tra điều kiện của bài test | tăng skillConfirmed một đơn vị sau khi lấy giá trị
W.KVPV_PARALLEL_ACTIONS.sync();assert(calls.includes('skill'));skillConfirmed++;W.KVPV_PARALLEL_ACTIONS.sync();
// [VI dòng gốc 33] gọi assert(!W.KVPV_PARALLEL_ACTIONS.status().pending.some(p=>p.id==='skill_handbook_rewards'), 'explicit native ACK clears even if …) để kiểm tra điều kiện của bài test
assert(!W.KVPV_PARALLEL_ACTIONS.status().pending.some(p=>p.id==='skill_handbook_rewards'),'explicit native ACK clears even if no next ready signature');
// [VI dòng gốc 34] gọi v.register({id:'c',name:'c',kind:'work',verified:true,enabled:true,spend:'none',probe:()=>({ready:ready.c,signature:states.c}),run:…)
v.register({id:'c',name:'c',kind:'work',verified:true,enabled:true,spend:'none',probe:()=>({ready:ready.c,signature:states.c}),run:()=>calls.push('c')});
// [VI dòng gốc 35] gán popup bằng true | gọi W.KVPV_PARALLEL_ACTIONS.sync() | gọi assert(!calls.includes('c')) để kiểm tra điều kiện của bài test | gán popup bằng false
popup=true;W.KVPV_PARALLEL_ACTIONS.sync();assert(!calls.includes('c'));popup=false;W.KVPV_PARALLEL_ACTIONS.sync();assert(calls.includes('c'));
// [VI dòng gốc 36] gán legacyReady bằng true | gọi W.KVPV_PARALLEL_ACTIONS.sync() | gọi assert(calls.includes('legacy')) để kiểm tra điều kiện của bài test | Khai báo biến không gán lại bằng const: sentLegacy = đọc calls.filter(x=>x==='legacy').length
legacyReady=true;W.KVPV_PARALLEL_ACTIONS.sync();assert(calls.includes('legacy'));const sentLegacy=calls.filter(x=>x==='legacy').length;W.KVPV_PARALLEL_ACTIONS.sync();assert.equal(calls.filter(x=>x==='legacy').length,sentLegacy);
// [VI dòng gốc 37] gán legacyReady bằng false | gán legacyState bằng 'l1' | gọi W.KVPV_PARALLEL_ACTIONS.sync() | gọi assert(calls.includes('done-legacy')) để kiểm tra điều kiện của bài test
legacyReady=false;legacyState='l1';W.KVPV_PARALLEL_ACTIONS.sync();assert(calls.includes('done-legacy'));
// [VI dòng gốc 38] Khai báo biến không gán lại bằng const: beforeUi = đọc calls.length | gán W.__KVPV_USER_UI_UNTIL bằng now+5000 | gán states.c bằng 'c1' | gọi W.KVPV_PARALLEL_ACTIONS.sync()
const beforeUi=calls.length;W.__KVPV_USER_UI_UNTIL=now+5000;states.c='c1';W.KVPV_PARALLEL_ACTIONS.sync();assert.equal(calls.length,beforeUi,'manual UI input pauses new sends while ACK is observed');assert.equal(W.KVPV_PARALLEL_ACTIONS.status().reason,'user_using_ui');now+=5001;W.KVPV_PARALLEL_ACTIONS.sync();assert(calls.length>beforeUi,'automation resumes after user interaction window');
// [VI dòng gốc 39] Khai báo biến có thể gán lại bằng let: activityStep = "fighting" | gán W.KVPV_DAILY.quickState bằng ()=>({running:true,job:'vinhdu',step:activityStep})
let activityStep='fighting';W.KVPV_DAILY.quickState=()=>({running:true,job:'vinhdu',step:activityStep});
// [VI dòng gốc 40] gọi v.register({id:'activity_direct',name:'activity direct',kind:'work',verified:true,enabled:true,spend:'materials',background:true,di…)
v.register({id:'activity_direct',name:'activity direct',kind:'work',verified:true,enabled:true,spend:'materials',background:true,directDuringPve:true,probe:()=>({ready:true,signature:'act'}),run:()=>calls.push('activity_direct')});
// [VI dòng gốc 41] gán activityStep bằng 'entering' | gọi W.KVPV_PARALLEL_ACTIONS.sync() | gọi assert(!calls.includes('activity_direct')) để kiểm tra điều kiện của bài test
activityStep='entering';W.KVPV_PARALLEL_ACTIONS.sync();assert(!calls.includes('activity_direct'));
// [VI dòng gốc 42] gán activityStep bằng 'fighting' | gọi W.KVPV_PARALLEL_ACTIONS.sync() | gọi assert(calls.includes('activity_direct'), 'explicit direct provider works during stable activity outside legacy background job …) để kiểm tra điều kiện của bài test
activityStep='fighting';W.KVPV_PARALLEL_ACTIONS.sync();assert(calls.includes('activity_direct'),'explicit direct provider works during stable activity outside legacy background job list');
// [VI dòng gốc 43] Khai báo biến có thể gán lại bằng let: hrPhase = "FIGHT"; mission = true; leaseOwner = "combat" | gán W._Ba._$a._yo.ins.isInMission bằng true
let hrPhase='FIGHT',mission=true,leaseOwner='combat';W._Ba._$a._yo.ins.isInMission=true;
// [VI dòng gốc 44] gán W.KVPV_DAILY.quickState bằng ()=>({running:true,job:'rảnh',step:'-'})
W.KVPV_DAILY.quickState=()=>({running:true,job:'rảnh',step:'-'});
// [VI dòng gốc 45] gán W.KVPV bằng {core:{scene:{status:()=>({owner:leaseOwner,tag:'hitrun'})}}} | gán W.KVPV_HITRUN1 bằng {status:()=>({running:true,phase:hrPhase})}
W.KVPV={core:{scene:{status:()=>({owner:leaseOwner,tag:'hitrun'})}}};W.KVPV_HITRUN1={status:()=>({running:true,phase:hrPhase})};
// [VI dòng gốc 46] gọi assert.equal(W.KVPV_PARALLEL_ACTIONS.canDirectDuringPve(), true, 'HitRun owns stable Tian Quan combat even when Daily is idle') để kiểm tra hai giá trị bằng nhau
assert.equal(W.KVPV_PARALLEL_ACTIONS.canDirectDuringPve(),true,'HitRun owns stable Tian Quan combat even when Daily is idle');
// [VI dòng gốc 47] gán hrPhase bằng 'RETREAT' | gọi assert.equal(W.KVPV_PARALLEL_ACTIONS.canDirectDuringPve(), false, 'recovery blocked') để kiểm tra hai giá trị bằng nhau
hrPhase='RETREAT';assert.equal(W.KVPV_PARALLEL_ACTIONS.canDirectDuringPve(),false,'recovery blocked');
// [VI dòng gốc 48] gán hrPhase bằng 'FIGHT' | gán leaseOwner bằng 'stage' | gọi assert.equal(W.KVPV_PARALLEL_ACTIONS.canDirectDuringPve(), false, 'stage transition owner blocked') để kiểm tra hai giá trị bằng nhau
hrPhase='FIGHT';leaseOwner='stage';assert.equal(W.KVPV_PARALLEL_ACTIONS.canDirectDuringPve(),false,'stage transition owner blocked');
// [VI dòng gốc 49] gán leaseOwner bằng 'combat' | gán W.KVPV_DAILY.quickState bằng ()=>({running:true,job:'rảnh',step:'exiting'}) | gọi assert.equal(W.KVPV_PARALLEL_ACTIONS.canDirectDuringPve(), false) để kiểm tra hai giá trị bằng nhau
leaseOwner='combat';W.KVPV_DAILY.quickState=()=>({running:true,job:'rảnh',step:'exiting'});assert.equal(W.KVPV_PARALLEL_ACTIONS.canDirectDuringPve(),false);
// [VI dòng gốc 50] gán W.KVPV_DAILY.quickState bằng ()=>({running:true,job:'rảnh',step:'-'}) | gán W._Ba._$a._yo.ins.isInMission bằng false
W.KVPV_DAILY.quickState=()=>({running:true,job:'rảnh',step:'-'});W._Ba._$a._yo.ins.isInMission=false;
// [VI dòng gốc 51] gán W._Ba._Xo bằng {_Ko:{instance:{_Uu:new Map([[77,true],[88,true]]),getRpKeyState:id=>id===77||id===88}}} | cập nhật bằng toán tử += now bằng 501
W._Ba._Xo={_Ko:{instance:{_Uu:new Map([[77,true],[88,true]]),getRpKeyState:id=>id===77||id===88}}};now+=501;
// [VI dòng gốc 52] gọi v.register({id:'red_claim',name:'red reward',kind:'claim',verified:true,enabled:true,spend:'none',redIds:[77],probe:()=>({ready:tru…)
v.register({id:'red_claim',name:'red reward',kind:'claim',verified:true,enabled:true,spend:'none',redIds:[77],probe:()=>({ready:true,signature:'reward'}),run:()=>calls.push('red_claim')});
// [VI dòng gốc 53] gọi W.KVPV_PARALLEL_ACTIONS.sync() | gọi assert(calls.includes('red_claim')) để kiểm tra điều kiện của bài test
W.KVPV_PARALLEL_ACTIONS.sync();assert(calls.includes('red_claim'));
// [VI dòng gốc 54] Khai báo biến không gán lại bằng const: red = đọc W.KVPV_PARALLEL_ACTIONS.status().redDots | gọi assert.equal(red.find(r=>r.id===77).state, 'checked') để kiểm tra hai giá trị bằng nhau | gọi assert.equal(red.find(r=>r.id===88).state, 'needs_verified_mapping', 'unknown red dot must never cause a blind click') để kiểm tra hai giá trị bằng nhau
const red=W.KVPV_PARALLEL_ACTIONS.status().redDots;assert.equal(red.find(r=>r.id===77).state,'checked');assert.equal(red.find(r=>r.id===88).state,'needs_verified_mapping','unknown red dot must never cause a blind click');
// [VI dòng gốc 55] Khai báo biến không gán lại bằng const: redSent = đọc calls.filter(c=>c==='red_claim').length | gọi W.KVPV_PARALLEL_ACTIONS.sync() | gọi assert.equal(calls.filter(c=>c==='red_claim').length, redSent, 'red dot cannot replay a request awaiting ACK') để kiểm tra hai giá trị bằng nhau
const redSent=calls.filter(c=>c==='red_claim').length;W.KVPV_PARALLEL_ACTIONS.sync();assert.equal(calls.filter(c=>c==='red_claim').length,redSent,'red dot cannot replay a request awaiting ACK');
// [VI dòng gốc 56] gán W.KVPV_DAILY.quickState bằng ()=>({running:true,job:'vinhdu',step:'fighting'})
W.KVPV_DAILY.quickState=()=>({running:true,job:'vinhdu',step:'fighting'});
// [VI dòng gốc 57] Khai báo biến không gán lại bằng const: rewardState = tạo đối tượng gồm dailyExpedition, limitedExpedition, expeditionMilestone
const rewardState={dailyExpedition:'a',limitedExpedition:'b',expeditionMilestone:'c'};
// [VI dòng gốc 58] Duyệt từng giá trị trong Object.keys(rewardState) bằng const id. | Khai báo biến không gán lại bằng const: id (chưa gán giá trị) | gọi v.register({id,name:id,kind:'claim',verified:true,enabled:true,spend:'none',probe:()=>({ready:true,signature:rewardState[id]}),run:…)
for(const id of Object.keys(rewardState))v.register({id,name:id,kind:'claim',verified:true,enabled:true,spend:'none',probe:()=>({ready:true,signature:rewardState[id]}),run:()=>calls.push(id)});
// [VI dòng gốc 59] gọi W.KVPV_PARALLEL_ACTIONS.sync() | gọi assert(calls.includes('dailyExpedition')) để kiểm tra điều kiện của bài test | gọi assert(calls.includes('expeditionMilestone'), 'independent API can send without waiting') để kiểm tra điều kiện của bài test | gọi assert(!calls.includes('limitedExpedition'), 'same API must wait') để kiểm tra điều kiện của bài test
W.KVPV_PARALLEL_ACTIONS.sync();assert(calls.includes('dailyExpedition'));assert(calls.includes('expeditionMilestone'),'independent API can send without waiting');assert(!calls.includes('limitedExpedition'),'same API must wait');
// [VI dòng gốc 60] gọi load() | gọi W.KVPV_PARALLEL_ACTIONS.start() để khởi động bộ điều khiển | gọi assert(!calls.includes('limitedExpedition'), 'shared API gate survives reload') để kiểm tra điều kiện của bài test
load();W.KVPV_PARALLEL_ACTIONS.start();assert(!calls.includes('limitedExpedition'),'shared API gate survives reload');
// [VI dòng gốc 61] gán rewardState.dailyExpedition bằng 'ack' | gọi v.toggle('dailyExpedition', false) | gọi W.KVPV_PARALLEL_ACTIONS.sync() | gọi assert(calls.includes('limitedExpedition'), 'next reward becomes eligible after first ACK') để kiểm tra điều kiện của bài test
rewardState.dailyExpedition='ack';v.toggle('dailyExpedition',false);W.KVPV_PARALLEL_ACTIONS.sync();assert(calls.includes('limitedExpedition'),'next reward becomes eligible after first ACK');
// [VI dòng gốc 62] gán W._Ba._rJ._O$.ins.actorId bằng 'b' | gọi W.KVPV_PARALLEL_ACTIONS.sync() | gọi assert.equal(timers.size, 0) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(W.KVPV_PARALLEL_ACTIONS.status().enabled, false) để kiểm tra hai giá trị bằng nhau
W._Ba._rJ._O$.ins.actorId='b';W.KVPV_PARALLEL_ACTIONS.sync();assert.equal(timers.size,0);assert.equal(W.KVPV_PARALLEL_ACTIONS.status().enabled,false);
// [VI dòng gốc 63] gọi console.log('PASS independent actions: registration capture, drain old request, concurrent functions, no shared busy/15s gap, per-fu…)
console.log('PASS independent actions: registration capture, drain old request, concurrent functions, no shared busy/15s gap, per-function ACK/timeout locks, native ACK, reload no replay, popup and premium/actor guards');
// [VI dòng gốc 64] Dòng trống để tách các phần, không có lệnh thực thi.
