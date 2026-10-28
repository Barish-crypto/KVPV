// [VI dòng gốc 1] "use strict"
'use strict';
// [VI dòng gốc 2] Khai báo biến không gán lại bằng const: fs = gọi require('node:fs') để nạp module Node.js; vm = gọi require('node:vm') để nạp module Node.js; assert = gọi require('node:assert/strict') để nạp module Node.js
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
// [VI dòng gốc 3] Khai báo biến không gán lại bằng const: source = gọi fs.readFileSync('src/50-companion-combat.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm, '')
const source=fs.readFileSync('src/50-companion-combat.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,'');
// [VI dòng gốc 4] Khai báo biến không gán lại bằng const: SEL = tạo đối tượng gồm ; COM = tạo đối tượng gồm | Khai báo biến có thể gán lại bằng let: interval = 0; inside = true; kind = "THIEN_QUAN"; cooldown = false; ready = true; rejected = false
const SEL={},COM={};let interval=0,inside=true,kind='THIEN_QUAN',cooldown=false,ready=true,rejected=false;
let scheduledCallback=null,scheduledMs=null;
// [VI dòng gốc 5] Khai báo biến không gán lại bằng const: rows = tạo mảng gồm 1 vị trí: [[3817,9000,30000]]; casts = tạo mảng gồm 0 vị trí: []; target = tạo đối tượng gồm id, isValid, property
const rows=[[3817,9000,30000]],casts=[],target={id:222,isValid:true,property:{get:k=>({type:1,hp:[100,100],status:0})[k]}};
// [VI dòng gốc 6] Định nghĩa hàm emitter; tham số: value | Khai báo biến không gán lại bằng const: listeners = tạo mảng gồm 0 vị trí: [] | Kết thúc hàm hiện tại và trả về: gọi Object.assign(value, {on(event,owner,fn){listeners.push({event,owner,fn});},off(event,owner,fn){const i=listeners.findIndex(x=>x.event…). | gọi listeners.push({event,owner,fn}) để thêm phần tử vào cuối mảng
function emitter(value){const listeners=[];return Object.assign(value,{on(event,owner,fn){listeners.push({event,owner,fn});},off(event,owner,fn){const i=listeners.findIndex(x=>x.event===event&&x.owner===owner&&x.fn===fn);if(i>=0)listeners.splice(i,1);},publish(event,...args){for(const l of listeners.slice())if(l.event===event)l.fn.apply(l.owner,args);},listeners});}
// [VI dòng gốc 7] Khai báo biến không gán lại bằng const: rideCombat = tạo đối tượng gồm target, isCooldown, setTarget, isValidTarget, combat | Kiểm tra !rejected: đúng thì chạy nhánh sau if. | gán this.target bằng t | gọi casts.push([id,...args]) để thêm phần tử vào cuối mảng
const rideCombat={target:null,isCooldown:()=>cooldown,setTarget(t){if(!rejected)this.target=t;},isValidTarget:()=>!rejected,combat(id,...args){casts.push([id,...args]);cooldown=true;ride.publish(1039,target.id,id);role.publish(1039,target.id,id);}};
// [VI dòng gốc 8] Khai báo biến không gán lại bằng const: ride = gọi emitter({isValid:true,property:{get:k=>({type:7,status:0})[k]},getComponent:k=>k===COM?rideCombat:k===SEL?{_rtt:rows,selectSkill…)
const ride=emitter({isValid:true,property:{get:k=>({type:7,status:0})[k]},getComponent:k=>k===COM?rideCombat:k===SEL?{_rtt:rows,selectSkill:()=>ready?3817:-1}:null});
// [VI dòng gốc 9] Khai báo biến không gán lại bằng const: master = tạo đối tượng gồm target, isValidTarget, isValidRange
const master={target,isValidTarget:()=>true,isValidRange:()=>false};
// [VI dòng gốc 10] Khai báo biến không gán lại bằng const: role = gọi emitter({id:123,isValid:true,property:{get:k=>({type:4,status:0,rideContext:ride})[k]},getComponent:k=>k===COM?master:k===SEL?{_…)
const role=emitter({id:123,isValid:true,property:{get:k=>({type:4,status:0,rideContext:ride})[k]},getComponent:k=>k===COM?master:k===SEL?{_rtt:[[8001,0,100]],_wet:[[1001,0,1000]]}:null});
// [VI dòng gốc 11] Khai báo biến không gán lại bằng const: W = tạo đối tượng gồm __KVPV_OWN_ACTOR_ID, _Ba, _d, _C, KVPV_FAR_SCOPE, setInterval, clearInterval | tăng interval một đơn vị sau khi lấy giá trị | Kết thúc hàm hiện tại và trả về: 1. | giảm interval một đơn vị sau khi lấy giá trị
const W={__KVPV_OWN_ACTOR_ID:'123',_Ba:{_rJ:{_O$:{ins:{actorId:'123'}}},_Jtt:{_ant:{ins:{getCfgById:()=>Array(16).fill(0)}}}},_d:{_Yct:{_Eet:SEL,_Het:COM}},_C:{_Ba:{instance:{getRole:()=>role}}},KVPV_FAR_SCOPE:{status:()=>({inside,kind}),eligible:t=>t===target},setInterval(fn,ms){scheduledCallback=fn;scheduledMs=ms;interval++;return 1;},clearInterval(){interval--;}};
// [VI dòng gốc 12] Định nghĩa hàm load; tham số: không có | gọi vm.runInNewContext(source, {window:W}) để chạy mã trong ngữ cảnh máy ảo dùng cho kiểm thử | Kết thúc hàm hiện tại và trả về: đọc W.KVPV_COMPANION_COMBAT.
function load(){vm.runInNewContext(source,{window:W});return W.KVPV_COMPANION_COMBAT;}
// [VI dòng gốc 13] Khai báo biến có thể gán lại bằng let: api = gọi load() | Khai báo biến không gán lại bằng const: emit = tạo hàm với tham số id=8001, tar=222; mỗi lần gọi trả về gọi role.publish(1039, tar, id)
let api=load();const emit=(id=8001,tar=222)=>role.publish(1039,tar,id);
// [VI dòng gốc 14] Duyệt từng giá trị trong ['THIEN_QUAN','LINH_LUNG','PHU_VAN'] bằng const scene. | Khai báo biến không gán lại bằng const: scene (chưa gán giá trị) | gán kind bằng scene | gán cooldown bằng false
for(const scene of ['THIEN_QUAN','LINH_LUNG','PHU_VAN']){kind=scene;cooldown=false;emit();}
// [VI dòng gốc 15] gọi assert.equal(casts.length, 3, 'follow player casts in all three dungeons even when melee range is false') để kiểm tra hai giá trị bằng nhau
assert.equal(casts.length,3,'follow player casts in all three dungeons even when melee range is false');
// [VI dòng gốc 16] gọi assert.equal(api.status().nativeCastSignals, 3) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(api.status().attempts, 3) để kiểm tra hai giá trị bằng nhau
assert.equal(api.status().nativeCastSignals,3);assert.equal(api.status().attempts,3);
// [VI dòng gốc 17] gọi emit() | gọi assert.equal(casts.length, 3, 'native animation/cooldown blocks duplicate casts') để kiểm tra hai giá trị bằng nhau
emit();assert.equal(casts.length,3,'native animation/cooldown blocks duplicate casts');
// [VI dòng gốc 18] gán cooldown bằng false | gọi emit(3817) | gọi emit(8001, 999) | gọi assert.equal(casts.length, 3, 'ignore forwarded ride events and wrong targets') để kiểm tra hai giá trị bằng nhau
cooldown=false;emit(3817);emit(8001,999);assert.equal(casts.length,3,'ignore forwarded ride events and wrong targets');
// [VI dòng gốc 19] gán inside bằng false | gọi emit() | gán inside bằng true | gán kind bằng 'OUTSIDE'
inside=false;emit();inside=true;kind='OUTSIDE';emit();assert.equal(casts.length,3,'never cast outside supported scope');
// [VI dòng gốc 20] gán kind bằng 'PHU_VAN' | gán ready bằng false | gọi emit() | gọi assert.equal(casts.length, 3, 'selector decides ready skill') để kiểm tra hai giá trị bằng nhau
kind='PHU_VAN';ready=false;emit();assert.equal(casts.length,3,'selector decides ready skill');ready=true;
// [VI dòng gốc 21] gán rejected bằng true | gán rideCombat.target bằng null | gọi emit() | gọi assert.equal(casts.length, 3, 'respect native target rejection') để kiểm tra hai giá trị bằng nhau
rejected=true;rideCombat.target=null;emit();assert.equal(casts.length,3,'respect native target rejection');rejected=false;
// [VI dòng gốc 22] gán W._Ba._rJ._O$.ins.actorId bằng '999' | gọi emit() | gọi assert.equal(casts.length, 3, 'wrong actor blocked') để kiểm tra hai giá trị bằng nhau | gán W._Ba._rJ._O$.ins.actorId bằng '123'
W._Ba._rJ._O$.ins.actorId='999';emit();assert.equal(casts.length,3,'wrong actor blocked');W._Ba._rJ._O$.ins.actorId='123';
// [VI dòng gốc 23] gọi assert.deepEqual(rows, [[3817,9000,30000]], 'do not rewrite cooldown rows') để kiểm tra cấu trúc hai giá trị tương đương
assert.deepEqual(rows,[[3817,9000,30000]],'do not rewrite cooldown rows');
// [VI dòng gốc 24] gán api bằng load() | gọi assert.equal(interval, 1) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(role.listeners.length, 1) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(ride.listeners.length, 1) để kiểm tra hai giá trị bằng nhau
api=load();assert.equal(scheduledMs,50);cooldown=true;assert.equal(scheduledCallback(),undefined);assert.equal(typeof api.sync(),'object');assert.equal(interval,1);assert.equal(role.listeners.length,1);assert.equal(ride.listeners.length,1);assert.equal(api.status().attempts,3);
// [VI dòng gốc 25] gán cooldown bằng false | gọi emit() | gọi assert.equal(casts.length, 4, 'one cast after reload, no duplicate listeners') để kiểm tra hai giá trị bằng nhau
cooldown=false;emit();assert.equal(casts.length,4,'one cast after reload, no duplicate listeners');
// [VI dòng gốc 26] gán cooldown bằng false | gán kind bằng 'TRU_TIEN' | gọi emit() | gọi assert.equal(casts.length, 5, 'ride also follows player casts in Tru Tien') để kiểm tra hai giá trị bằng nhau
cooldown=false;kind='TRU_TIEN';emit();assert.equal(casts.length,5,'ride also follows player casts in Tru Tien');
// [VI dòng gốc 27] gọi api.stop() để dừng bộ điều khiển và dọn tài nguyên | gọi assert.equal(interval, 0) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(role.listeners.length, 0) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(ride.listeners.length, 0) để kiểm tra hai giá trị bằng nhau
api.stop();assert.equal(interval,0);assert.equal(role.listeners.length,0);assert.equal(ride.listeners.length,0);emit();assert.equal(casts.length,5);
// [VI dòng gốc 28] gọi assert.equal(master.isValidRange(), false, 'do not replace master range method') để kiểm tra hai giá trị bằng nhau
assert.equal(master.isValidRange(),false,'do not replace master range method');
// [VI dòng gốc 29] gọi console.log('PASS ride follows player casts: three scopes, identity/target gates, native selector/cooldown, no recursion, preserved …)
console.log('PASS ride follows player casts: three scopes, identity/target gates, native selector/cooldown, no recursion, preserved rows, reload and teardown');
// [VI dòng gốc 30] Khai báo biến có thể gán lại bằng let: mansionCooldown = false; mansionRange = true; mansionReady = true; mansionCalls = 0; followProfile = tạo đối tượng gồm rideFollow, mansionFollow | Khai báo biến không gán lại bằng const: mansionRows = tạo mảng gồm 1 vị trí: [[4901,7000,20000]]
let mansionCooldown=false,mansionRange=true,mansionReady=true,mansionCalls=0,followProfile={rideFollow:false,mansionFollow:true};const mansionRows=[[4901,7000,20000]];
// [VI dòng gốc 31] Khai báo biến không gán lại bằng const: mansionCombat = tạo đối tượng gồm target, isCooldown, setTarget, isValidTarget, isValidRange, combat | gán this.target bằng t | gọi assert.equal(id, 4901) để kiểm tra hai giá trị bằng nhau | tăng mansionCalls một đơn vị sau khi lấy giá trị
const mansionCombat={target:null,isCooldown:()=>mansionCooldown,setTarget(t){this.target=t;},isValidTarget:()=>true,isValidRange:()=>mansionRange,combat(id){assert.equal(id,4901);mansionCalls++;mansionCooldown=true;mansion.publish(1039,target.id,id);role.publish(1039,target.id,id);}};
// [VI dòng gốc 32] Khai báo biến không gán lại bằng const: mansion = gọi emitter({isValid:true,property:{get:k=>({type:12,status:0})[k]},getComponent:k=>k===COM?mansionCombat:k===SEL?{_rtt:mansionRows,…)
const mansion=emitter({isValid:true,property:{get:k=>({type:12,status:0})[k]},getComponent:k=>k===COM?mansionCombat:k===SEL?{_rtt:mansionRows,selectSkill:()=>mansionReady?4901:-1}:null});
// [VI dòng gốc 33] Khai báo biến không gán lại bằng const: oldGet = đọc role.property.get | gán role.property.get bằng k=>k==='mansionContext'?mansion:oldGet(k) | gán W.KVPV_DESKTOP_CONTROL bằng {scopeProfile:()=>followProfile} | gán kind bằng 'LINH_LUNG'
const oldGet=role.property.get;role.property.get=k=>k==='mansionContext'?mansion:oldGet(k);W.KVPV_DESKTOP_CONTROL={scopeProfile:()=>followProfile};kind='LINH_LUNG';cooldown=false;api=load();const rideBefore=casts.length;emit();assert.equal(mansionCalls,1);assert.equal(casts.length,rideBefore,'ride disabled separately');emit();assert.equal(mansionCalls,1,'mansion native cooldown blocks repeat');mansionCooldown=false;mansionRange=false;emit();assert.equal(mansionCalls,1,'mansion keeps native range gate');mansionRange=true;mansionReady=false;emit();assert.equal(mansionCalls,1,'mansion native selector controls readiness');mansionReady=true;followProfile={rideFollow:true,mansionFollow:true};emit();assert.equal(mansionCalls,2);assert.equal(casts.length,rideBefore+1,'both companions can follow one player cast independently');followProfile={rideFollow:false,mansionFollow:false};cooldown=false;mansionCooldown=false;emit();assert.equal(mansionCalls,2);assert.equal(casts.length,rideBefore+1);assert.deepEqual(mansionRows,[[4901,7000,20000]]);inside=false;followProfile.mansionFollow=true;emit();assert.equal(mansionCalls,2);inside=true;api.stop();assert.equal(mansion.listeners.length,0);assert.equal(role.listeners.length,0);assert.equal(interval,0);
// [VI dòng gốc 34] gọi console.log('PASS per-scope ride/mansion toggles, independent cooldown, native mansion range/readiness, forwarding guard and teardow…)
console.log('PASS per-scope ride/mansion toggles, independent cooldown, native mansion range/readiness, forwarding guard and teardown');
// [VI dòng gốc 35] Dòng trống để tách các phần, không có lệnh thực thi.

// Road helpers keep attacking independently when the player has no cast events.
{
 let clock=100000,petCd=false,fuwaCd=false,petReady=true,fuwaReady=true,roadRange=true,petCalls=0,fuwaCalls=0,team=true;
 class RoadDate extends Date{static now(){return clock;}}
 function helper(type,skill,cooling,mark){const data=[[skill,9000,30000]];const combat={target:null,isCooldown:cooling,isValidTarget:()=>true,isValidRange:()=>roadRange,setTarget(t){this.target=t;},combat(id){assert.equal(id,skill);mark();role.publish(1039,target.id,id);}};return {data,role:emitter({isValid:true,property:{get:k=>({type,status:0})[k]},getComponent:k=>k===COM?combat:k===SEL?{_rtt:data,selectSkill:()=>type===2?(petReady?skill:-1):(fuwaReady?skill:-1)}:null})};}
 const pet=helper(2,2001,()=>petCd,()=>{petCalls++;petCd=true;}),fuwa=helper(9,3001,()=>fuwaCd,()=>{fuwaCalls++;fuwaCd=true;});
 const get=role.property.get;role.property.get=k=>k==='petContext'?pet.role:k==='fuwaContext'?fuwa.role:get(k);
 W._ft={_po:{ins:{getCfgById:()=>[0,0,0,0,0,0,0,41]}}};W._C._Mn={_Cn:{currentID:2518}};W._Ba._cm={_q3t:{ins:{getHasTeamByType:()=>team}}};W.KVPV_ROAD_CADENCE={enabled:true};followProfile={rideFollow:true,mansionFollow:false};inside=false;cooldown=false;
 vm.runInNewContext(source,{window:W,Date:RoadDate});api=W.KVPV_COMPANION_COMBAT;
 assert.equal(petCalls,1);assert.equal(fuwaCalls,1);assert.equal(cooldown,true,'ride also dispatched without a player event');
 clock+=1;api.sync();assert.equal(petCalls,1);assert.equal(fuwaCalls,1,'Road companions honor native cooldown on repeated scans');
 fuwaCd=false;clock+=1;api.sync();assert.equal(petCalls,1);assert.equal(fuwaCalls,2,'only native-ready Fuwa resumes');
 petCd=false;petReady=false;clock+=1;api.sync();assert.equal(petCalls,1,'selector readiness retained');petReady=true;roadRange=false;clock+=1;api.sync();assert.equal(petCalls,1,'native range retained');roadRange=true;
 W._Ba._rJ._O$.ins.isDead=true;clock+=1;api.sync();emit();assert.equal(petCalls,1);W._Ba._rJ._O$.ins.isDead=false;
 W.KVPV_ROAD_CADENCE.enabled=false;clock+=1;api.sync();assert.equal(petCalls,1);W.KVPV_ROAD_CADENCE.enabled=true;team=false;clock+=1;api.sync();assert.equal(petCalls,1);team=true;
 clock+=1;api.sync();assert.equal(petCalls,2);assert.equal(fuwaCalls,2);assert.deepEqual(pet.data,[[2001,9000,30000]]);assert.deepEqual(fuwa.data,[[3001,9000,30000]]);
 api.stop();assert.equal(interval,0);assert.equal(role.listeners.length,0);
 console.log('PASS Road pet/fuwa/ride: independent native skill selection with DEFAULT cooldown, range, death, team and support gates');
}
