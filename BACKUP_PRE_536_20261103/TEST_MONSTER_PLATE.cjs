// [VI dòng gốc 1] "use strict"
'use strict';
// [VI dòng gốc 2] Khai báo biến không gán lại bằng const: fs = gọi require('fs') để nạp module Node.js; vm = gọi require('vm') để nạp module Node.js; assert = gọi require('assert/strict') để nạp module Node.js | Khai báo biến có thể gán lại bằng let: lv = 1; have = 20; sent = 0
const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');let lv=1,have=20,sent=0;
// [VI dòng gốc 3] Khai báo biến không gán lại bằng const: W = tạo đối tượng gồm __KVPV_OWN_ACTOR_ID, _Ba, _ft, KVPV_V8 | gọi assert.equal(t, 1) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(p, 1) để kiểm tra hai giá trị bằng nhau | tăng sent một đơn vị sau khi lấy giá trị
const W={__KVPV_OWN_ACTOR_ID:'1',_Ba:{_rJ:{_O$:{ins:{actorId:'1'}}},_Lk:{_yQ:{instance:{openMaxIndex:0,getEupByPart:(t,p)=>p===1?[0,0,0,0,0,0,0,[0,0,0,lv]]:null,partCanStrong:()=>true}},_Qan:{ins:{strongEquip:(t,p)=>{assert.equal(t,1);assert.equal(p,1);sent++;}}}},_Ic:{_aQ:{ins:{getItemCountById:()=>have}}}},_ft:{trgStrongCfg:{ins:{getCfg:(t,p,l)=>l<4?[l]:null,items:()=>[123,12]}}},KVPV_V8:{register(){},toggle(){}}};
// [VI dòng gốc 4] Khai báo biến không gán lại bằng const: ctx = gọi vm.createContext({window:W}); load = tạo hàm với tham số (không có); mỗi lần gọi trả về gọi vm.runInContext(fs.readFileSync('src/45-monster-plate.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,''), ctx) | gọi load()
const ctx=vm.createContext({window:W}),load=()=>vm.runInContext(fs.readFileSync('src/45-monster-plate.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,''),ctx);load();
// [VI dòng gốc 5] Khai báo biến có thể gán lại bằng let: a = đọc W.KVPV_MONSTER_PLATE | gọi a.run(a.probe()) | gọi assert.equal(sent, 1) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(a.probe().ready, false) để kiểm tra hai giá trị bằng nhau
let a=W.KVPV_MONSTER_PLATE;a.run(a.probe());assert.equal(sent,1);assert.equal(a.probe().ready,false);
// [VI dòng gốc 6] gọi load() | gán a bằng W.KVPV_MONSTER_PLATE | gọi assert.equal(a.probe().ready, false) để kiểm tra hai giá trị bằng nhau | gán lv bằng 2
load();a=W.KVPV_MONSTER_PLATE;assert.equal(a.probe().ready,false);lv=2;assert.equal(a.probe().ready,true);assert.equal(a.status().confirmed,1);
// [VI dòng gốc 7] gán have bằng 11 | gọi assert.equal(a.probe().ready, false) để kiểm tra hai giá trị bằng nhau | gán have bằng 20 | gán W.__KVPV_USER_UI_UNTIL bằng Date.now()+5000
have=11;assert.equal(a.probe().ready,false);have=20;W.__KVPV_USER_UI_UNTIL=Date.now()+5000;assert.equal(a.probe().ready,false);W.__KVPV_USER_UI_UNTIL=0;
// [VI dòng gốc 8] gọi a.run(a.probe()) | gán lv bằng 3 | gọi assert.equal(a.probe().ready, false, 'maximum native config') để kiểm tra hai giá trị bằng nhau | gọi assert.equal(sent, 2) để kiểm tra hai giá trị bằng nhau
a.run(a.probe());lv=3;assert.equal(a.probe().ready,false,'maximum native config');assert.equal(sent,2);
// [VI dòng gốc 9] gọi console.log('PASS Quái Bàn: material and next-level guards, exact native operation, reload ACK, manual yield, max level')
console.log('PASS Quái Bàn: material and next-level guards, exact native operation, reload ACK, manual yield, max level');
// [VI dòng gốc 10] Dòng trống để tách các phần, không có lệnh thực thi.
