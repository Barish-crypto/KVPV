// [VI dòng gốc 1] "use strict"
'use strict';
// [VI dòng gốc 2] Khai báo biến không gán lại bằng const: fs = gọi require('node:fs') để nạp module Node.js; vm = gọi require('node:vm') để nạp module Node.js; assert = gọi require('node:assert/strict') để nạp module Node.js
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
// [VI dòng gốc 3] Khai báo biến không gán lại bằng const: recipe = tạo hàm với tham số id, result, items; mỗi lần gọi trả về tạo mảng gồm 7 vị trí: [id,result,0,[807],0,items,[]]
const recipe=(id,result,items)=>[id,result,0,[807],0,items,[]];
// [VI dòng gốc 4] Khai báo biến không gán lại bằng const: recipes = tạo mảng gồm 4 vị trí: [recipe(1,3003,[[2002,2]]),recipe(2,4004,[[2002,2]]),recipe(3,3003,[[4004,1]]),recipe(4,3003,[[999,1]])]
const recipes=[recipe(1,3003,[[2002,2]]),recipe(2,4004,[[2002,2]]),recipe(3,3003,[[4004,1]]),recipe(4,3003,[[999,1]])];
// [VI dòng gốc 5] Khai báo biến có thể gán lại bằng let: busy = false; count = 2; equipped = false; valuable = false; protectedUid = false; blocked = false; timerId = 0
let busy=false,count=2,equipped=false,valuable=false,protectedUid=false,blocked=false,timerId=0;
// [VI dòng gốc 6] Khai báo biến không gán lại bằng const: timers = tạo đối tượng bằng Map()
const timers=new Map();
// [VI dòng gốc 7] Khai báo biến không gán lại bằng const: bag = tạo đối tượng gồm isBagInited, getItemCountById, getItemsById
const bag={isBagInited:true,getItemCountById:()=>count,getItemsById:id=>[[id,1,101],[id,1,102]]};
// [VI dòng gốc 8] Khai báo biến không gán lại bằng const: et = tạo đối tượng gồm getStageById, getTypeById, getNameById
const et={getStageById:id=>({2002:2,3003:3,4004:4})[id]??0,getTypeById:id=>id===999?2:5,getNameById:()=> 'Gear'};
// [VI dòng gốc 9] Khai báo biến không gán lại bằng const: cfg = tạo đối tượng gồm gearCraft, protectedItemIds, protectedUIDs, keepByItemId
const cfg={gearCraft:{approvedRecipeIds:[],approvedMaterialIds:[],maxComponents:8},protectedItemIds:[],protectedUIDs:[],keepByItemId:{}};
// [VI dòng gốc 10] Khai báo biến không gán lại bằng const: api = tạo đối tượng gồm config, status
const api={config:cfg,status:()=>({busy})};
// [VI dòng gốc 11] Khai báo biến không gán lại bằng const: W = tạo đối tượng gồm __KVPV_OWN_ACTOR_ID, _et, _Sa, _Ba, _ft, KVPV_BG_RESOURCES, KVPV_CONFIRM_POPUPS, setInterval, clearInterval
const W={__KVPV_OWN_ACTOR_ID:'123456',_et:et,_Sa:{getCfg:()=>recipes},
// [VI dòng gốc 12] Thuộc tính _Ba: tạo đối tượng gồm _rJ, _Ic, _k6, _MT | Thuộc tính _rJ: tạo đối tượng gồm _O$ | Thuộc tính _O$: tạo đối tượng gồm ins | Thuộc tính ins: tạo đối tượng gồm actorId
 _Ba:{_rJ:{_O$:{ins:{actorId:'123456'}}},_Ic:{_aQ:{ins:bag}},_k6:{_rRt:{ins:{getPlayerIsChuanDai:()=>equipped,isUpMe:()=>[]}}},
// [VI dòng gốc 13] Thuộc tính _MT: tạo đối tượng gồm immortalsEquip | Thuộc tính immortalsEquip: tạo đối tượng gồm _mQ | Thuộc tính _mQ: tạo đối tượng gồm ins | Thuộc tính ins: tạo đối tượng gồm getAnJinQuality, getAnJinSkillAndLv
  _MT:{immortalsEquip:{_mQ:{ins:{getAnJinQuality:()=>valuable?1:0,getAnJinSkillAndLv:()=>null}}}}},
// [VI dòng gốc 14] Thuộc tính _ft: tạo đối tượng gồm _Cji | Thuộc tính _Cji: tạo đối tượng gồm ins | Thuộc tính ins: tạo đối tượng gồm getCfgById | Thuộc tính getCfgById: tạo hàm với tham số id; mỗi lần gọi trả về gọi recipes.find(r=>r[0]===id) để tìm phần tử đầu tiên thỏa điều kiện
 _ft:{_Cji:{ins:{getCfgById:id=>recipes.find(r=>r[0]===id)}}},KVPV_BG_RESOURCES:api,
// [VI dòng gốc 15] Thuộc tính KVPV_CONFIRM_POPUPS: tạo đối tượng gồm beforeTask | Thuộc tính beforeTask: tạo hàm với tham số (không có); mỗi lần gọi trả về blocked
 KVPV_CONFIRM_POPUPS:{beforeTask:()=>blocked},
// [VI dòng gốc 16] gọi timers.set(++timerId, fn) | Kết thúc hàm hiện tại và trả về: timerId. | gọi timers.delete(id)
 setInterval(fn){timers.set(++timerId,fn);return timerId;},clearInterval(id){timers.delete(id);}};
// [VI dòng gốc 17] Khai báo biến không gán lại bằng const: context = tạo đối tượng gồm window, _et, _Ba, _ft, CFG, bag, num, protect
const context={window:W,_et:et,_Ba:W._Ba,_ft:W._ft,CFG:cfg,bag:()=>bag,
// [VI dòng gốc 18] Thuộc tính num: tạo hàm với tham số x; mỗi lần gọi trả về Number.isSafeInteger(Number(x)) và chỉ đánh giá vế phải khi vế trái truthy: Number(x)>0 | Thuộc tính protect: tạo hàm với tham số id, uid; mỗi lần gọi trả về protectedUid và chỉ đánh giá vế phải khi vế trái truthy: uid===101
 num:x=>Number.isSafeInteger(Number(x))&&Number(x)>0,protect:(id,uid)=>protectedUid&&uid===101};
// [VI dòng gốc 19] gọi vm.createContext(context)
vm.createContext(context);
// [VI dòng gốc 20] Khai báo biến không gán lại bằng const: source = gọi fs.readFileSync(__dirname+'/src/27-craft-low.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm, '')
const source=fs.readFileSync(__dirname+'/src/27-craft-low.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,'');
// [VI dòng gốc 21] gọi vm.runInContext(source, context)
vm.runInContext(source,context);
// [VI dòng gốc 22] gọi assert.deepEqual(Array.from(cfg.gearCraft.approvedRecipeIds), [1]) để kiểm tra cấu trúc hai giá trị tương đương
assert.deepEqual(Array.from(cfg.gearCraft.approvedRecipeIds),[1]);
// [VI dòng gốc 23] Khai báo biến không gán lại bằng const: engine = gọi fs.readFileSync(__dirname+'/src/04-engine.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm, '')
const engine=fs.readFileSync(__dirname+'/src/04-engine.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,'');
// [VI dòng gốc 24] Khai báo biến không gán lại bằng const: a = gọi engine.indexOf(' function gearCraftInfo(){'); b = gọi engine.indexOf(' const v1114Select=', a)
const a=engine.indexOf('  function gearCraftInfo(){'),b=engine.indexOf('  const v1114Select=',a);
// [VI dòng gốc 25] gọi assert(a>0&&b>a) để kiểm tra điều kiện của bài test | gọi vm.runInContext(engine.slice(a,b), context)
assert(a>0&&b>a);vm.runInContext(engine.slice(a,b),context);
// [VI dòng gốc 26] Khai báo biến không gán lại bằng const: preview = tạo hàm với tham số (không có); mỗi lần gọi trả về gọi vm.runInContext('gearCraftInfo()', context)
const preview=()=>vm.runInContext('gearCraftInfo()',context);
// [VI dòng gốc 27] Khai báo biến có thể gán lại bằng let: op = gọi preview() | gọi assert.equal(op.id, 1) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(op.outputTier, 3) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(op.uidList.join(','), '101,102') để kiểm tra hai giá trị bằng nhau
let op=preview();assert.equal(op.id,1);assert.equal(op.outputTier,3);assert.equal(op.uidList.join(','),'101,102');
// [VI dòng gốc 28] gán equipped bằng true | gọi assert.equal(preview(), null, 'equipped gear preserved') để kiểm tra hai giá trị bằng nhau | gán equipped bằng false
equipped=true;assert.equal(preview(),null,'equipped gear preserved');equipped=false;
// [VI dòng gốc 29] gán valuable bằng true | gọi assert.equal(preview(), null, 'inherited valuable gear preserved') để kiểm tra hai giá trị bằng nhau | gán valuable bằng false
valuable=true;assert.equal(preview(),null,'inherited valuable gear preserved');valuable=false;
// [VI dòng gốc 30] gán protectedUid bằng true | gọi assert.equal(preview(), null, 'protected UID preserved') để kiểm tra hai giá trị bằng nhau | gán protectedUid bằng false
protectedUid=true;assert.equal(preview(),null,'protected UID preserved');protectedUid=false;
// [VI dòng gốc 31] gán busy bằng true | gán count bằng 0 | gọi W.KVPV_CRAFT_LOW.sync() | gọi assert.deepEqual(Array.from(cfg.gearCraft.approvedRecipeIds), [1], 'pending request keeps stable policy') để kiểm tra cấu trúc hai giá trị tương đương
busy=true;count=0;W.KVPV_CRAFT_LOW.sync();assert.deepEqual(Array.from(cfg.gearCraft.approvedRecipeIds),[1],'pending request keeps stable policy');
// [VI dòng gốc 32] gán busy bằng false | gọi W.KVPV_CRAFT_LOW.sync() | gọi assert.equal(cfg.gearCraft.approvedRecipeIds.length, 0) để kiểm tra hai giá trị bằng nhau
busy=false;W.KVPV_CRAFT_LOW.sync();assert.equal(cfg.gearCraft.approvedRecipeIds.length,0);
// [VI dòng gốc 33] gán count bằng 2 | gán blocked bằng true | gọi W.KVPV_CRAFT_LOW.sync() | gọi assert.equal(cfg.gearCraft.approvedRecipeIds.length, 0) để kiểm tra hai giá trị bằng nhau
count=2;blocked=true;W.KVPV_CRAFT_LOW.sync();assert.equal(cfg.gearCraft.approvedRecipeIds.length,0);
// [VI dòng gốc 34] gán blocked bằng false | gọi W.KVPV_CRAFT_LOW.sync() | gọi assert.deepEqual(Array.from(cfg.gearCraft.approvedRecipeIds), [1]) để kiểm tra cấu trúc hai giá trị tương đương
blocked=false;W.KVPV_CRAFT_LOW.sync();assert.deepEqual(Array.from(cfg.gearCraft.approvedRecipeIds),[1]);
// [VI dòng gốc 35] gọi vm.runInContext(source, context) | gọi assert.equal(timers.size, 1) để kiểm tra hai giá trị bằng nhau | gọi assert.deepEqual(Array.from(cfg.gearCraft.approvedRecipeIds), [1]) để kiểm tra cấu trúc hai giá trị tương đương
vm.runInContext(source,context);assert.equal(timers.size,1);assert.deepEqual(Array.from(cfg.gearCraft.approvedRecipeIds),[1]);
// [VI dòng gốc 36] gọi W.KVPV_CRAFT_LOW.stop() để dừng bộ điều khiển và dọn tài nguyên | gọi assert.equal(cfg.gearCraft.approvedRecipeIds.length, 0) để kiểm tra hai giá trị bằng nhau
W.KVPV_CRAFT_LOW.stop();assert.equal(cfg.gearCraft.approvedRecipeIds.length,0);
// [VI dòng gốc 37] gọi console.log('PASS low-tier craft: authorize only output+ingredients tiers1..3, original worker UID/equipped/valuable protection, pop…)
console.log('PASS low-tier craft: authorize only output+ingredients tiers1..3, original worker UID/equipped/valuable protection, popup, shared pending and reload cleanup');
// [VI dòng gốc 38] Dòng trống để tách các phần, không có lệnh thực thi.
