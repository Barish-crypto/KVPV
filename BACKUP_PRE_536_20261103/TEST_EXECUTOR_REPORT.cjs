// [VI dòng gốc 1] "use strict"
'use strict';
// [VI dòng gốc 2] Khai báo biến không gán lại bằng const: fs = gọi require('node:fs') để nạp module Node.js; path = gọi require('node:path') để nạp module Node.js; os = gọi require('node:os') để nạp module Node.js; vm = gọi require('node:vm') để nạp module Node.js; assert = gọi require('node:assert/strict') để nạp module Node.js
const fs=require('node:fs'),path=require('node:path'),os=require('node:os'),vm=require('node:vm'),assert=require('node:assert/strict');
// [VI dòng gốc 3] Khai báo biến không gán lại bằng const: {saveDiagnostics} = gọi require('./live/diagnostics.cjs') để nạp module Node.js | Khai báo biến có thể gán lại bằng let: now = 10000
const {saveDiagnostics}=require('./live/diagnostics.cjs');let now=10000;
// [VI dòng gốc 4] Khai báo biến không gán lại bằng const: W = tạo đối tượng gồm __KVPV_OWN_ACTOR_ID, _Ba, KVPV_REBORN_GOALS, KVPV_TIENVI_GOALS
const W={__KVPV_OWN_ACTOR_ID:'123456',_Ba:{_rJ:{_O$:{ins:{actorId:'123456'}}}},
// [VI dòng gốc 5] Thuộc tính KVPV_REBORN_GOALS: tạo đối tượng gồm inspect | Thuộc tính inspect: tạo hàm với tham số (không có); mỗi lần gọi trả về tạo đối tượng gồm eraLevel, reason, tasks | Thuộc tính eraLevel: 102 | Thuộc tính reason: "unmet_requirements_need_executor"
 KVPV_REBORN_GOALS:{inspect:()=>({eraLevel:102,reason:'unmet_requirements_need_executor',tasks:[{id:'x',name:'Unknown task',state:0,kind:'unverified_executor'}]})},
// [VI dòng gốc 6] Thuộc tính KVPV_TIENVI_GOALS: tạo đối tượng gồm inspect | Thuộc tính inspect: tạo hàm với tham số (không có); mỗi lần gọi trả về tạo mảng gồm 1 vị trí: [{id:10,state:0,name:'Unknown Tien Vi',executor:'unverified_requirement'}] | Thuộc tính id: 10 | Thuộc tính state: 0
 KVPV_TIENVI_GOALS:{inspect:()=>[{id:10,state:0,name:'Unknown Tien Vi',executor:'unverified_requirement'}]}};
// [VI dòng gốc 7] gọi vm.runInNewContext(fs.readFileSync(__dirname+'/src/39-executor-report.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,''), {window…) để chạy mã trong ngữ cảnh máy ảo dùng cho kiểm thử
vm.runInNewContext(fs.readFileSync(__dirname+'/src/39-executor-report.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,''),{window:W,Date:{now:()=>now},__KVPV_V1_BUILD:{modules:[{file:'test.js',apis:['KVPV_READ_ONLY_TEST','KVPV_ABSENT_TEST']}]}});
// [VI dòng gốc 8] gán W.KVPV_READ_ONLY_TEST bằng {status(){throw Error('Registry must not call status');}} | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('Registry must not call status')
W.KVPV_READ_ONLY_TEST={status(){throw Error('Registry must not call status');}};
// [VI dòng gốc 9] gán W.KVPV_TH300 bằng {report:()=>({running:true,nativeCombat:{selectorOwned:true,combatOwned:false},scope:{kind:'THIEN_QUAN',inside:true}})} | gán W.KVPV_BASIC10 bằng {status:()=>({active:false,reason:'tianquan_yield'})}
W.KVPV_TH300={report:()=>({running:true,nativeCombat:{selectorOwned:true,combatOwned:false},scope:{kind:'THIEN_QUAN',inside:true}})};W.KVPV_BASIC10={status:()=>({active:false,reason:'tianquan_yield'})};
// [VI dòng gốc 10] Khai báo biến không gán lại bằng const: a = gọi W.KVPV_EXECUTOR_REPORT.snapshot() để đọc ảnh chụp trạng thái hiện tại | gọi assert.equal(a.combat.selectorOwned, true) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(a.combat.combatOwned, false) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(a.combat.scope, 'THIEN_QUAN') để kiểm tra hai giá trị bằng nhau
const a=W.KVPV_EXECUTOR_REPORT.snapshot();assert.equal(a.combat.selectorOwned,true);assert.equal(a.combat.combatOwned,false);assert.equal(a.combat.scope,'THIEN_QUAN');assert.equal(a.combat.basicActive,false);assert.equal(a.missing.length,2);assert.equal(a.allowKNB,false);assert.equal(W.KVPV_EXECUTOR_REPORT.snapshot(),a,'5s cached snapshot');
// [VI dòng gốc 11] gọi assert.equal(a.modulePresence[0].file, 'test.js') để kiểm tra hai giá trị bằng nhau | gọi assert.equal(a.modulePresence[0].present.join(','), 'KVPV_READ_ONLY_TEST') để kiểm tra hai giá trị bằng nhau
assert.equal(a.modulePresence[0].file,'test.js');assert.equal(a.modulePresence[0].present.join(','),'KVPV_READ_ONLY_TEST');
// [VI dòng gốc 12] Khai báo biến không gán lại bằng const: root = gọi fs.mkdtempSync(path.join(os.tmpdir(),'kvpv-diagnostics-'))
const root=fs.mkdtempSync(path.join(os.tmpdir(),'kvpv-diagnostics-'));
// [VI dòng gốc 13] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài.
try{
// [VI dòng gốc 14] gọi assert(saveDiagnostics(root,a)) để kiểm tra điều kiện của bài test | Khai báo biến không gán lại bằng const: dir = gọi path.join(root, '.kvpv-live/diagnostics') | gọi assert(fs.existsSync(path.join(dir,'123456.json'))) để kiểm tra điều kiện của bài test
 assert(saveDiagnostics(root,a));const dir=path.join(root,'.kvpv-live/diagnostics');assert(fs.existsSync(path.join(dir,'123456.json')));
// [VI dòng gốc 15] gọi assert.equal(saveDiagnostics(root,{...a,actor:'../../outside'}), false) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(saveDiagnostics(root,{...a,actor:'unknown'}), false) để kiểm tra hai giá trị bằng nhau
 assert.equal(saveDiagnostics(root,{...a,actor:'../../outside'}),false);assert.equal(saveDiagnostics(root,{...a,actor:'unknown'}),false);
// [VI dòng gốc 16] gọi assert.equal(saveDiagnostics(root,{...a,tienVi:Array(81).fill({})}), false) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(saveDiagnostics(root,{...a,extra:'x'.repeat(200000)}), false) để kiểm tra hai giá trị bằng nhau
 assert.equal(saveDiagnostics(root,{...a,tienVi:Array(81).fill({})}),false);assert.equal(saveDiagnostics(root,{...a,extra:'x'.repeat(200000)}),false);
// [VI dòng gốc 17] gọi assert.equal(fs.readdirSync(dir).length, 1, 'invalid report cannot create another path/file') để kiểm tra hai giá trị bằng nhau
 assert.equal(fs.readdirSync(dir).length,1,'invalid report cannot create another path/file');
// [VI dòng gốc 18] cập nhật bằng toán tử += now bằng 5000 | gọi assert.notEqual(W.KVPV_EXECUTOR_REPORT.snapshot(), a) | gán W._Ba._rJ._O$.ins.actorId bằng 'other' | gọi assert.equal(W.KVPV_EXECUTOR_REPORT.snapshot(), null) để kiểm tra hai giá trị bằng nhau
 now+=5000;assert.notEqual(W.KVPV_EXECUTOR_REPORT.snapshot(),a);W._Ba._rJ._O$.ins.actorId='other';assert.equal(W.KVPV_EXECUTOR_REPORT.snapshot(),null);
// [VI dòng gốc 19] gán W._Ba._rJ._O$.ins.actorId bằng '123456' | cập nhật bằng toán tử += now bằng 5000
 W._Ba._rJ._O$.ins.actorId='123456';now+=5000;
// [VI dòng gốc 20] gán W.KVPV_TH300.report bằng ()=>({running:false,castAttempts:0,scope:{kind:'OUTSIDE',inside:false}})
 W.KVPV_TH300.report=()=>({running:false,castAttempts:0,scope:{kind:'OUTSIDE',inside:false}});
// [VI dòng gốc 21] gán W.KVPV_BASIC10.status bằng ()=>({active:true,attempts:17,basicAttempts:10,tuyetHocAttempts:7})
 W.KVPV_BASIC10.status=()=>({active:true,attempts:17,basicAttempts:10,tuyetHocAttempts:7});
// [VI dòng gốc 22] Khai báo biến không gán lại bằng const: outside = đọc W.KVPV_EXECUTOR_REPORT.snapshot().combat
 const outside=W.KVPV_EXECUTOR_REPORT.snapshot().combat;
// [VI dòng gốc 23] gọi assert.equal(outside.activeController, 'outside') để kiểm tra hai giá trị bằng nhau | gọi assert.equal(outside.activeAttempts, 17) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(outside.outsideBasicAttempts, 10) để kiểm tra hai giá trị bằng nhau
 assert.equal(outside.activeController,'outside');assert.equal(outside.activeAttempts,17);assert.equal(outside.outsideBasicAttempts,10);
// [VI dòng gốc 24] cập nhật bằng toán tử += now bằng 5000 | gán W.KVPV_TH300.report bằng ()=>({running:true,castAttempts:5,scope:{kind:'LINH_LUNG',inside:true}})
 now+=5000;W.KVPV_TH300.report=()=>({running:true,castAttempts:5,scope:{kind:'LINH_LUNG',inside:true}});
// [VI dòng gốc 25] Khai báo biến không gán lại bằng const: tower = đọc W.KVPV_EXECUTOR_REPORT.snapshot().combat | gọi assert.equal(tower.activeController, 'far') để kiểm tra hai giá trị bằng nhau | gọi assert.equal(tower.activeAttempts, 5) để kiểm tra hai giá trị bằng nhau
 const tower=W.KVPV_EXECUTOR_REPORT.snapshot().combat;assert.equal(tower.activeController,'far');assert.equal(tower.activeAttempts,5);
// [VI dòng gốc 26] gọi assert(path.resolve(root).startsWith(path.resolve(os.tmpdir())+path.sep)) để kiểm tra điều kiện của bài test | gọi fs.rmSync(root, {recursive:true,force:true})
}finally{assert(path.resolve(root).startsWith(path.resolve(os.tmpdir())+path.sep));fs.rmSync(root,{recursive:true,force:true});}
// [VI dòng gốc 27] gọi console.log('PASS executor diagnostics: bounded cached read-only missing-task report, fixed local path, actor/path/size guards and a…)
{
 const user=W._Ba._rJ._O$.ins;
 const read=()=>{now+=5000;return W.KVPV_EXECUTOR_REPORT.snapshot().economy;};
 let e=read();assert.equal(e.gold,null);assert.equal(e.inventoryReady,false);
 assert(e.goldChests.every(r=>r.count===null),'uninitialized bag is unknown, not empty');
 Object.assign(user,{isInitedMoney:true,copper:1234567,ingot:50});
 const inventory=[[20320001,2,11],[20320001,3,12],[20340001,1,13],[999,100,14]];
 const original=JSON.stringify(inventory);
 W._Ba._Ic={_aQ:{ins:{isBagInited:true,getItemsByBagType:type=>{assert.equal(type,0);return inventory;}}}};
 e=read();assert.equal(e.gold,1234567);assert.equal(e.ingot,50);assert.equal(e.actor,'123456');
 assert.equal(e.goldChests.find(r=>r.id===20320001).count,5);
 assert.equal(e.goldChests.find(r=>r.id===20340001).goldPerChest,1000000);
 assert.equal(e.goldChests.find(r=>r.id===20340005).count,0);
 assert.equal(JSON.stringify(inventory),original,'diagnostics must not mutate inventory');
 user.copper=NaN;user.ingot=-1;inventory.push([20320001,-1,15]);
 e=read();assert.equal(e.gold,null);assert.equal(e.ingot,null);
 assert.equal(e.goldChests.find(r=>r.id===20320001).count,null);
 W._Ba._Ic._aQ.ins.getItemsByBagType=()=>{throw Error('bag unavailable');};
 assert.equal(read().error,'bag unavailable','read failure is contained');
 user.actorId='other';now+=5000;assert.equal(W.KVPV_EXECUTOR_REPORT.snapshot(),null);
}
console.log('PASS executor economy: actor isolation, initialization gates, stack totals, unknown/invalid values and read-only inventory');
console.log('PASS executor diagnostics: bounded cached read-only missing-task report, fixed local path, actor/path/size guards and atomic JSON');
// [VI dòng gốc 28] Dòng trống để tách các phần, không có lệnh thực thi.
