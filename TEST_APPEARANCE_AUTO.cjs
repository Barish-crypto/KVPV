// [VI dòng gốc 1] "use strict"
'use strict';
// [VI dòng gốc 2] Khai báo biến không gán lại bằng const: fs = gọi require('node:fs') để nạp module Node.js; vm = gọi require('node:vm') để nạp module Node.js; assert = gọi require('node:assert/strict') để nạp module Node.js
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
// [VI dòng gốc 3] Khai báo biến không gán lại bằng const: source = gọi fs.readFileSync(__dirname+'/src/28-appearance-auto.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm, '')
const source=fs.readFileSync(__dirname+'/src/28-appearance-auto.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,'');
// [VI dòng gốc 4] Định nghĩa hàm harness; tham số: không có
function harness(){
// [VI dòng gốc 5] Khai báo biến có thể gán lại bằng let: now = 1000; count = 40; common = true; blocked = false; legacyPending = false; resourcesBusy = false
 let now=1000,count=40,common=true,blocked=false,legacyPending=false,resourcesBusy=false;
// [VI dòng gốc 6] Khai báo biến không gán lại bằng const: plugins = tạo đối tượng bằng Map(); timers = tạo đối tượng bằng Map(); sent = tạo mảng gồm 0 vị trí: [] | Khai báo biến có thể gán lại bằng let: id = 0
 const plugins=new Map(),timers=new Map(),sent=[];let id=0;
// [VI dòng gốc 7] Khai báo biến không gán lại bằng const: levels = tạo đối tượng gồm weapon, wing, fashion, arm
 const levels={weapon:5,wing:5,fashion:5,arm:5};
// [VI dòng gốc 8] Khai báo biến không gán lại bằng const: legacyCfg = tạo đối tượng gồm autoWeapon, autoWing, autoArm
 const legacyCfg={autoWeapon:true,autoWing:true,autoArm:true};
// [VI dòng gốc 9] Khai báo biến không gán lại bằng const: row = tạo hàm với tham số n; mỗi lần gọi trả về nếu n<=6 thì lấy [n,[999,5]], ngược lại lấy null
 const row=n=>n<=6?[n,[999,5]]:null;
// [VI dòng gốc 10] Khai báo biến không gán lại bằng const: W = tạo đối tượng gồm __KVPV_OWN_ACTOR_ID, _Ba, _ft, KVPV_V880, KVPV_BG_RESOURCES, KVPV_CONFIRM_POPUPS, KVPV_V8, setInterval, clearInterval
 const W={__KVPV_OWN_ACTOR_ID:'123456',
// [VI dòng gốc 11] Thuộc tính _Ba: tạo đối tượng gồm _rJ, _$a, _Ic, _M4, _RJ, _KJ, _UJ | Thuộc tính _rJ: tạo đối tượng gồm _O$ | Thuộc tính _O$: tạo đối tượng gồm ins | Thuộc tính ins: tạo đối tượng gồm actorId, isDead
  _Ba:{_rJ:{_O$:{ins:{actorId:'123456',isDead:false}}},
// [VI dòng gốc 12] Kết thúc hàm hiện tại và trả về: common.
    _$a:{SceneUtil:{get isCommonScene(){return common;}},_yo:{ins:{isInMission:false}}},_Ic:{_aQ:{ins:{getItemCountById:()=>count}}},
// [VI dòng gốc 13] Kết thúc hàm hiện tại và trả về: đọc levels.weapon. | gọi sent.push('weapon') để thêm phần tử vào cuối mảng
    _M4:{_HJ:{inst:{otherValue:{get 'Tăng cấp'(){return levels.weapon;}}}},_j6t:{inst:{fdShbing(){sent.push('weapon');}}}},
// [VI dòng gốc 14] Kết thúc hàm hiện tại và trả về: đọc levels.wing. | gọi sent.push('wing') để thêm phần tử vào cuối mảng
    _RJ:{_DJ:{ins:{otherValue:{get 'Tăng cấp'(){return levels.wing;}}}},_R6t:{ins:{feedSb(){sent.push('wing');}}}},
// [VI dòng gốc 15] Kết thúc hàm hiện tại và trả về: tạo mảng gồm 1 vị trí: [levels.fashion]. | gọi sent.push('fashion') để thêm phần tử vào cuối mảng
    _KJ:{_qJ:{inst:{get fashInfo(){return [levels.fashion];}}},_Ejt:{inst:{fdFash(){sent.push('fashion');}}}},
// [VI dòng gốc 16] Kết thúc hàm hiện tại và trả về: tạo mảng gồm 1 vị trí: [levels.arm]. | gọi sent.push('arm') để thêm phần tử vào cuối mảng
    _UJ:{_XJ:{ins:{get handInfo(){return [levels.arm];}}},_Ujt:{ins:{feedHand(){sent.push('arm');}}}}},
// [VI dòng gốc 17] Thuộc tính _ft: tạo đối tượng gồm _r$, _PZ, _Iqt, _BKt | Thuộc tính _r$: tạo đối tượng gồm ins | Thuộc tính ins: tạo đối tượng gồm getShengjiCfgByLv | Thuộc tính getShengjiCfgByLv: row
  _ft:{_r$:{ins:{getShengjiCfgByLv:row}},_PZ:{ins:{getShengjiCfgByLv:row}},_Iqt:{ins:{getCfgByLevel:row}},_BKt:{ins:{getCfgByLevel:row}}},
// [VI dòng gốc 18] Thuộc tính KVPV_V880: tạo đối tượng gồm config, status | Thuộc tính config: legacyCfg | Thuộc tính status: tạo hàm với tham số (không có); mỗi lần gọi trả về tạo đối tượng gồm groups | Thuộc tính groups: tạo mảng gồm 1 vị trí: [{pending:legacyPending}]
  KVPV_V880:{config:legacyCfg,status:()=>({groups:[{pending:legacyPending}]})},
// [VI dòng gốc 19] Thuộc tính KVPV_BG_RESOURCES: tạo đối tượng gồm status | Thuộc tính status: tạo hàm với tham số (không có); mỗi lần gọi trả về tạo đối tượng gồm busy | Thuộc tính busy: resourcesBusy | Thuộc tính KVPV_CONFIRM_POPUPS: tạo đối tượng gồm beforeTask
  KVPV_BG_RESOURCES:{status:()=>({busy:resourcesBusy})},KVPV_CONFIRM_POPUPS:{beforeTask:()=>blocked},
// [VI dòng gốc 20] Kiểm tra plugins.has(p.id): đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('Trung module ID') | gọi plugins.set(p.id, p) | gán plugins.get(key).enabled bằng on
  KVPV_V8:{register(p){if(plugins.has(p.id))throw Error('Trung module ID');plugins.set(p.id,p);},toggle(key,on){plugins.get(key).enabled=on;}},
// [VI dòng gốc 21] gọi timers.set(++id, fn) | Kết thúc hàm hiện tại và trả về: id. | gọi timers.delete(i)
  setInterval(fn){timers.set(++id,fn);return id;},clearInterval(i){timers.delete(i);}};
// [VI dòng gốc 22] Định nghĩa lớp Clock kế thừa Date. | Kết thúc hàm hiện tại và trả về: now.
 class Clock extends Date{static now(){return now;}}
// [VI dòng gốc 23] Khai báo biến không gán lại bằng const: ctx = tạo đối tượng gồm window, Date | Khai báo biến không gán lại bằng const: load = tạo hàm với tham số (không có); mỗi lần gọi trả về gọi vm.runInNewContext(source, ctx) để chạy mã trong ngữ cảnh máy ảo dùng cho kiểm thử | gọi load()
 const ctx={window:W,Date:Clock};const load=()=>vm.runInNewContext(source,ctx);load();
// [VI dòng gốc 24] Khai báo biến không gán lại bằng const: get = tạo hàm với tham số key; mỗi lần gọi trả về gọi plugins.get('appearance_auto_'+key)
 const get=key=>plugins.get('appearance_auto_'+key);
// [VI dòng gốc 25] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm W, plugins, timers, sent, levels, legacyCfg, load, get, ready, run, set, advance.
 return {W,plugins,timers,sent,levels,legacyCfg,load,get,
// [VI dòng gốc 26] Khai báo biến không gán lại bằng const: p = gọi get(key); s = gọi p.probe() | gọi assert(s.ready, key+' ready') để kiểm tra điều kiện của bài test | gọi p.run(s)
  ready:key=>get(key).probe(),run(key){const p=get(key),s=p.probe();assert(s.ready,key+' ready');p.run(s);},
// [VI dòng gốc 27] Kiểm tra 'count'in v: đúng thì chạy nhánh sau if. | gán count bằng v.count | Kiểm tra 'common'in v: đúng thì chạy nhánh sau if. | gán common bằng v.common
  set(v){if('count'in v)count=v.count;if('common'in v)common=v.common;if('blocked'in v)blocked=v.blocked;
// [VI dòng gốc 28] Kiểm tra 'legacyPending'in v: đúng thì chạy nhánh sau if. | gán legacyPending bằng v.legacyPending | Kiểm tra 'resourcesBusy'in v: đúng thì chạy nhánh sau if. | gán resourcesBusy bằng v.resourcesBusy
    if('legacyPending'in v)legacyPending=v.legacyPending;if('resourcesBusy'in v)resourcesBusy=v.resourcesBusy;},
// [VI dòng gốc 29] cập nhật bằng toán tử += now bằng ms | gọi W.KVPV_APPEARANCE_AUTO.sync()
  advance(ms){now+=ms;W.KVPV_APPEARANCE_AUTO.sync();}};
// [VI dòng gốc 30] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 31] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng {. Đọc cùng dòng mở phía trên: {
{
// [VI dòng gốc 32] Khai báo biến không gán lại bằng const: q = gọi harness() | gọi assert.equal(q.plugins.size, 64) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.legacyCfg.autoWeapon, false) để kiểm tra hai giá trị bằng nhau
 const q=harness();assert.equal(q.plugins.size,64);assert.equal(q.legacyCfg.autoWeapon,false);
// [VI dòng gốc 33] Duyệt từng giá trị trong ['weapon','wing','fashion','arm'] bằng const key. | Khai báo biến không gán lại bằng const: key (chưa gán giá trị)
 for(const key of ['weapon','wing','fashion','arm']){
// [VI dòng gốc 34] gọi q.run(key) | gọi assert.equal(q.ready('weapon').ready, false, 'one shared pending') để kiểm tra hai giá trị bằng nhau
  q.run(key);assert.equal(q.ready('weapon').ready,false,'one shared pending');
// [VI dòng gốc 35] tăng q.levels[key] một đơn vị sau khi lấy giá trị | gọi q.W.KVPV_APPEARANCE_AUTO.sync()
  q.levels[key]++;q.W.KVPV_APPEARANCE_AUTO.sync();
// [VI dòng gốc 36] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
 }
// [VI dòng gốc 37] gọi assert.deepEqual(q.sent, ['weapon','wing','fashion','arm']) để kiểm tra cấu trúc hai giá trị tương đương | gọi assert.equal(q.W.KVPV_APPEARANCE_AUTO.status().confirmed, 4) để kiểm tra hai giá trị bằng nhau
 assert.deepEqual(q.sent,['weapon','wing','fashion','arm']);assert.equal(q.W.KVPV_APPEARANCE_AUTO.status().confirmed,4);
// [VI dòng gốc 38] Duyệt từng giá trị trong ['weapon','wing','fashion','arm'] bằng const key. | Khai báo biến không gán lại bằng const: key (chưa gán giá trị) | gọi assert.equal(q.ready(key).ready, false, 'next cfg missing at max') để kiểm tra hai giá trị bằng nhau
 for(const key of ['weapon','wing','fashion','arm'])assert.equal(q.ready(key).ready,false,'next cfg missing at max');
// [VI dòng gốc 39] gọi q.W.KVPV_APPEARANCE_AUTO.stop() để dừng bộ điều khiển và dọn tài nguyên | gọi assert.equal(q.legacyCfg.autoWeapon, true, 'manual stop restores old executor if settled') để kiểm tra hai giá trị bằng nhau
 q.W.KVPV_APPEARANCE_AUTO.stop();assert.equal(q.legacyCfg.autoWeapon,true,'manual stop restores old executor if settled');
// [VI dòng gốc 40] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 41] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng {. Đọc cùng dòng mở phía trên: {
{
// [VI dòng gốc 42] Khai báo biến không gán lại bằng const: q = gọi harness() | gọi q.run('weapon') | gọi q.advance(60000) | gọi assert.equal(q.ready('wing').ready, false) để kiểm tra hai giá trị bằng nhau
 const q=harness();q.run('weapon');q.advance(60000);assert.equal(q.ready('wing').ready,false);
// [VI dòng gốc 43] gọi assert.equal(q.W.KVPV_APPEARANCE_AUTO.status().reason, 'waiting_level_ack_no_retry') để kiểm tra hai giá trị bằng nhau
 assert.equal(q.W.KVPV_APPEARANCE_AUTO.status().reason,'waiting_level_ack_no_retry');
// [VI dòng gốc 44] gọi q.load() | gọi assert.equal(q.timers.size, 1) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.plugins.size, 64) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.ready('weapon').ready, false, 'reload keeps pending') để kiểm tra hai giá trị bằng nhau
 q.load();assert.equal(q.timers.size,1);assert.equal(q.plugins.size,64);assert.equal(q.ready('weapon').ready,false,'reload keeps pending');
// [VI dòng gốc 45] gọi assert.equal(q.sent.length, 1) để kiểm tra hai giá trị bằng nhau | tăng q.levels.weapon một đơn vị sau khi lấy giá trị | gọi q.W.KVPV_APPEARANCE_AUTO.sync() | gọi assert.equal(q.ready('wing').ready, true) để kiểm tra hai giá trị bằng nhau
 assert.equal(q.sent.length,1);q.levels.weapon++;q.W.KVPV_APPEARANCE_AUTO.sync();assert.equal(q.ready('wing').ready,true);
// [VI dòng gốc 46] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 47] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng {. Đọc cùng dòng mở phía trên: {
{
// [VI dòng gốc 48] Khai báo biến không gán lại bằng const: q = gọi harness() | gọi q.set({blocked:true}) | gọi assert.equal(q.ready('weapon').ready, false) để kiểm tra hai giá trị bằng nhau
 const q=harness();q.set({blocked:true});assert.equal(q.ready('weapon').ready,false);
// [VI dòng gốc 49] gọi q.set({blocked:false,common:false}) | gọi assert.equal(q.ready('weapon').ready, false) để kiểm tra hai giá trị bằng nhau
 q.set({blocked:false,common:false});assert.equal(q.ready('weapon').ready,false);
// [VI dòng gốc 50] gọi q.set({common:true,count:4}) | gọi assert.equal(q.ready('weapon').ready, false, 'no purchase when short') để kiểm tra hai giá trị bằng nhau
 q.set({common:true,count:4});assert.equal(q.ready('weapon').ready,false,'no purchase when short');
// [VI dòng gốc 51] gọi q.set({count:40,resourcesBusy:true}) | gọi assert.equal(q.ready('weapon').ready, false) để kiểm tra hai giá trị bằng nhau
 q.set({count:40,resourcesBusy:true});assert.equal(q.ready('weapon').ready,false);
// [VI dòng gốc 52] gọi q.set({resourcesBusy:false,legacyPending:true}) | gọi assert.equal(q.ready('weapon').ready, false, 'never overlaps old quest ACK') để kiểm tra hai giá trị bằng nhau
 q.set({resourcesBusy:false,legacyPending:true});assert.equal(q.ready('weapon').ready,false,'never overlaps old quest ACK');
// [VI dòng gốc 53] gọi q.set({legacyPending:false}) | gán q.W._Ba._rJ._O$.ins.actorId bằng '999999' | gọi q.W.KVPV_APPEARANCE_AUTO.sync()
 q.set({legacyPending:false});q.W._Ba._rJ._O$.ins.actorId='999999';q.W.KVPV_APPEARANCE_AUTO.sync();
// [VI dòng gốc 54] gọi assert.equal(q.timers.size, 0) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.get('weapon').enabled, false) để kiểm tra hai giá trị bằng nhau
 assert.equal(q.timers.size,0);assert.equal(q.get('weapon').enabled,false);
// [VI dòng gốc 55] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 56] gọi console.log('PASS appearance upgrades: all four native actions, shared V8 plugins, material/max checks, old quest takeover, one pend…)
console.log('PASS appearance upgrades: all four native actions, shared V8 plugins, material/max checks, old quest takeover, one pending, timeout, reload, popup/combat/resource and identity guards');
// [VI dòng gốc 57] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 58] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng {. Đọc cùng dòng mở phía trên: {
{
// [VI dòng gốc 59] Khai báo biến không gán lại bằng const: q = gọi harness() | Khai báo biến có thể gán lại bằng let: level = 25; exp = 10 | Khai báo biến không gán lại bằng const: mountConfig = tạo đối tượng gồm autoFeed
 const q=harness();let level=25,exp=10;const mountConfig={autoFeed:true};
// [VI dòng gốc 60] gán q.W.KVPV_V877 bằng {config:mountConfig} | gán q.W.KVPV_UPGRADES bằng {busy:()=>false}
 q.W.KVPV_V877={config:mountConfig};q.W.KVPV_UPGRADES={busy:()=>false};
// [VI dòng gốc 61] gán q.W._Ba._YJ bằng {_WJ:{ins:{get feed(){return [level,exp];}}},_bgt:{ins:{feedRide(){q.sent.push('mount');}}}} | Kết thúc hàm hiện tại và trả về: tạo mảng gồm 2 vị trí: [level,exp]. | gọi q.sent.push('mount') để thêm phần tử vào cuối mảng
 q.W._Ba._YJ={_WJ:{ins:{get feed(){return [level,exp];}}},_bgt:{ins:{feedRide(){q.sent.push('mount');}}}};
// [VI dòng gốc 62] gán q.W._ft.__qt bằng {ins:{getPetFeedCfgByLv:n=>n<=26?[n,0,[999,1,10]]:null}}
 q.W._ft.__qt={ins:{getPetFeedCfgByLv:n=>n<=26?[n,0,[999,1,10]]:null}};
// [VI dòng gốc 63] gọi q.W.KVPV_APPEARANCE_AUTO.sync() | gọi assert.equal(mountConfig.autoFeed, false) để kiểm tra hai giá trị bằng nhau
 q.W.KVPV_APPEARANCE_AUTO.sync();assert.equal(mountConfig.autoFeed,false);
// [VI dòng gốc 64] gọi q.run('mount') | gọi assert.equal(q.ready('mount').ready, false) để kiểm tra hai giá trị bằng nhau | gán exp bằng 20 | gọi q.W.KVPV_APPEARANCE_AUTO.sync()
 q.run('mount');assert.equal(q.ready('mount').ready,false);exp=20;q.W.KVPV_APPEARANCE_AUTO.sync();
// [VI dòng gốc 65] gọi assert.equal(q.W.KVPV_APPEARANCE_AUTO.status().confirmed, 1, 'EXP increase confirms feed without level-up') để kiểm tra hai giá trị bằng nhau
 assert.equal(q.W.KVPV_APPEARANCE_AUTO.status().confirmed,1,'EXP increase confirms feed without level-up');
// [VI dòng gốc 66] gọi q.run('mount') | gọi q.load() | gọi assert.equal(q.ready('mount').ready, false, 'mount pending survives reload') để kiểm tra hai giá trị bằng nhau
 q.run('mount');q.load();assert.equal(q.ready('mount').ready,false,'mount pending survives reload');
// [VI dòng gốc 67] gán level bằng 26 | gán exp bằng 0 | gọi q.W.KVPV_APPEARANCE_AUTO.sync() | gọi assert.equal(q.W.KVPV_APPEARANCE_AUTO.status().confirmed, 2) để kiểm tra hai giá trị bằng nhau
 level=26;exp=0;q.W.KVPV_APPEARANCE_AUTO.sync();assert.equal(q.W.KVPV_APPEARANCE_AUTO.status().confirmed,2);
// [VI dòng gốc 68] gọi assert.equal(q.ready('mount').ready, false, 'maximum config stops feed') để kiểm tra hai giá trị bằng nhau
 assert.equal(q.ready('mount').ready,false,'maximum config stops feed');
// [VI dòng gốc 69] gọi assert.deepEqual(q.sent, ['mount','mount']) để kiểm tra cấu trúc hai giá trị tương đương | gọi q.W.KVPV_APPEARANCE_AUTO.stop() để dừng bộ điều khiển và dọn tài nguyên | gọi assert.equal(mountConfig.autoFeed, true) để kiểm tra hai giá trị bằng nhau
 assert.deepEqual(q.sent,['mount','mount']);q.W.KVPV_APPEARANCE_AUTO.stop();assert.equal(mountConfig.autoFeed,true);
// [VI dòng gốc 70] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 71] gọi console.log('PASS mount feed: native material row[2], shared pending, EXP ACK before level-up, level-up EXP reset, reload and max le…)
console.log('PASS mount feed: native material row[2], shared pending, EXP ACK before level-up, level-up EXP reset, reload and max level');
// [VI dòng gốc 72] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 73] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng {. Đọc cùng dòng mở phía trên: {
{
// [VI dòng gốc 74] Khai báo biến không gán lại bằng const: q = gọi harness() | gọi q.set({resourcesBusy:true}) | gọi assert.equal(q.ready('weapon').ready, false) để kiểm tra hai giá trị bằng nhau
 const q=harness();q.set({resourcesBusy:true});assert.equal(q.ready('weapon').ready,false);
// [VI dòng gốc 75] gán q.W.KVPV_PARALLEL_ACTIONS bằng {independent:true} | gọi assert.equal(q.ready('weapon').ready, true, 'parallel mode removes the cross-function resource lock') để kiểm tra hai giá trị bằng nhau
 q.W.KVPV_PARALLEL_ACTIONS={independent:true};assert.equal(q.ready('weapon').ready,true,'parallel mode removes the cross-function resource lock');
// [VI dòng gốc 76] gọi q.run('weapon') | gọi assert.equal(q.ready('wing').ready, false, 'own appearance pending still prevents duplicate upgrade requests') để kiểm tra hai giá trị bằng nhau
 q.run('weapon');assert.equal(q.ready('wing').ready,false,'own appearance pending still prevents duplicate upgrade requests');
// [VI dòng gốc 77] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 78] gọi console.log('PASS parallel mode: appearance upgrade no longer waits for unrelated resource worker, own ACK gate remains')
console.log('PASS parallel mode: appearance upgrade no longer waits for unrelated resource worker, own ACK gate remains');
// [VI dòng gốc 79] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 80] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng {. Đọc cùng dòng mở phía trên: {
{
// [VI dòng gốc 81] Khai báo biến không gán lại bằng const: q = gọi harness(); entries = tạo đối tượng bằng Map([[71,[71,1,0,0]],[72,[72,0,0,0]]])
 const q=harness(),entries=new Map([[71,[71,1,0,0]],[72,[72,0,0,0]]]);
// [VI dòng gốc 82] gán q.W._Ba._M4._HJ.inst.hhuaLst bằng {keys:[71,72],get:id=>entries.get(id)}
 q.W._Ba._M4._HJ.inst.hhuaLst={keys:[71,72],get:id=>entries.get(id)};
// [VI dòng gốc 83] gán q.W._ft._r$.ins.getHuanhuaCfgByIdAndLev bằng (id,lv)=>lv<=2?[id,lv,[[999,5]]]:null
 q.W._ft._r$.ins.getHuanhuaCfgByIdAndLev=(id,lv)=>lv<=2?[id,lv,[[999,5]]]:null;
// [VI dòng gốc 84] gán q.W._et bằng {getSvipLimit:()=>0} | gán q.W._Ba._ke bằng {_Le:{instance:{curSvipLv:0}}}
 q.W._et={getSvipLimit:()=>0};q.W._Ba._ke={_Le:{instance:{curSvipLv:0}}};
// [VI dòng gốc 85] gán q.W._Ba._M4._j6t.inst.mgcLv bằng ids=>q.sent.push(Array.from(ids))
 q.W._Ba._M4._j6t.inst.mgcLv=ids=>q.sent.push(Array.from(ids));
// [VI dòng gốc 86] gọi assert.equal(q.ready('weapon_illusion').id, 71) để kiểm tra hai giá trị bằng nhau | gọi q.run('weapon_illusion')
 assert.equal(q.ready('weapon_illusion').id,71);q.run('weapon_illusion');
// [VI dòng gốc 87] gọi assert.deepEqual(q.sent, [[71]]) để kiểm tra cấu trúc hai giá trị tương đương | gọi assert.equal(q.ready('weapon_illusion').ready, false) để kiểm tra hai giá trị bằng nhau
 assert.deepEqual(q.sent,[[71]]);assert.equal(q.ready('weapon_illusion').ready,false);
// [VI dòng gốc 88] gọi q.load() | gọi assert.equal(q.ready('weapon_illusion').ready, false, 'reload does not replay pending illusion') để kiểm tra hai giá trị bằng nhau
 q.load();assert.equal(q.ready('weapon_illusion').ready,false,'reload does not replay pending illusion');
// [VI dòng gốc 89] gọi entries.set(71, [71,2,0,0]) | gọi q.W.KVPV_APPEARANCE_AUTO.sync() | gọi assert.equal(q.W.KVPV_APPEARANCE_AUTO.status().confirmed, 1) để kiểm tra hai giá trị bằng nhau
 entries.set(71,[71,2,0,0]);q.W.KVPV_APPEARANCE_AUTO.sync();assert.equal(q.W.KVPV_APPEARANCE_AUTO.status().confirmed,1);
// [VI dòng gốc 90] gọi assert.equal(q.ready('weapon_illusion').id, 72, 'unopened form now activates when materials exist') để kiểm tra hai giá trị bằng nhau | gọi entries.set(72, [72,0,1,100])
 assert.equal(q.ready('weapon_illusion').id,72,'unopened form now activates when materials exist');entries.set(72,[72,0,1,100]);
// [VI dòng gốc 91] gọi entries.set(71, [71,1,0,0]) | gọi q.set({count:4}) | gọi assert.equal(q.ready('weapon_illusion').ready, false, 'no buying missing materials') để kiểm tra hai giá trị bằng nhau
 entries.set(71,[71,1,0,0]);q.set({count:4});assert.equal(q.ready('weapon_illusion').ready,false,'no buying missing materials');
// [VI dòng gốc 92] gọi q.set({count:40}) | gán q.W._et.getSvipLimit bằng ()=>1 | gọi assert.equal(q.ready('weapon_illusion').ready, false, 'native SVIP limit is preserved') để kiểm tra hai giá trị bằng nhau
 q.set({count:40});q.W._et.getSvipLimit=()=>1;assert.equal(q.ready('weapon_illusion').ready,false,'native SVIP limit is preserved');
// [VI dòng gốc 93] gán q.W._et.getSvipLimit bằng ()=>0 | gọi entries.set(71, [71,1,1,100]) | gọi assert.equal(q.ready('weapon_illusion').ready, false, 'timed forms require manual renewal') để kiểm tra hai giá trị bằng nhau
 q.W._et.getSvipLimit=()=>0;entries.set(71,[71,1,1,100]);assert.equal(q.ready('weapon_illusion').ready,false,'timed forms require manual renewal');
// [VI dòng gốc 94] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 95] gọi console.log('PASS illusion: exact native upgrade args, activated permanent forms, material/SVIP/max guards, server level ACK and rel…)
console.log('PASS illusion: exact native upgrade args, activated permanent forms, material/SVIP/max guards, server level ACK and reload no replay');
// [VI dòng gốc 96] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 97] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng {. Đọc cùng dòng mở phía trên: {
{
// [VI dòng gốc 98] Khai báo biến không gán lại bằng const: q = gọi harness(); rows = tạo đối tượng bằng Map([[101,[101,0,1]],[102,[102,0,0]]])
 const q=harness(),rows=new Map([[101,[101,0,1]],[102,[102,0,0]]]);
// [VI dòng gốc 99] gán q.W._Ba._M4._HJ.inst.skillLst bằng {keys:[101,102],get:id=>rows.get(id)}
 q.W._Ba._M4._HJ.inst.skillLst={keys:[101,102],get:id=>rows.get(id)};
// [VI dòng gốc 100] gán q.W._Ba._M4._j6t.inst.skillLv bằng ids=>q.sent.push(Array.from(ids))
 q.W._Ba._M4._j6t.inst.skillLv=ids=>q.sent.push(Array.from(ids));
// [VI dòng gốc 101] gọi q.run('weapon_skill') | gọi assert.deepEqual(q.sent, [[101]], 'activate native ready skill') để kiểm tra cấu trúc hai giá trị tương đương
 q.run('weapon_skill');assert.deepEqual(q.sent,[[101]],'activate native ready skill');
// [VI dòng gốc 102] gọi assert.equal(q.ready('weapon_skill').ready, false) để kiểm tra hai giá trị bằng nhau | gọi q.load() | gọi assert.equal(q.ready('weapon_skill').ready, false, 'no replay across reload') để kiểm tra hai giá trị bằng nhau
 assert.equal(q.ready('weapon_skill').ready,false);q.load();assert.equal(q.ready('weapon_skill').ready,false,'no replay across reload');
// [VI dòng gốc 103] gọi rows.set(101, [101,1,1]) | gọi q.W.KVPV_APPEARANCE_AUTO.sync() | gọi q.run('weapon_skill')
 rows.set(101,[101,1,1]);q.W.KVPV_APPEARANCE_AUTO.sync();q.run('weapon_skill');
// [VI dòng gốc 104] gọi assert.equal(q.sent.length, 2, 'native ready flag also permits level upgrade') để kiểm tra hai giá trị bằng nhau
 assert.equal(q.sent.length,2,'native ready flag also permits level upgrade');
// [VI dòng gốc 105] gọi rows.set(101, [101,2,0]) | gọi q.W.KVPV_APPEARANCE_AUTO.sync() | gọi assert.equal(q.ready('weapon_skill').ready, false, 'locked skills and exhausted upgrades remain untouched') để kiểm tra hai giá trị bằng nhau
 rows.set(101,[101,2,0]);q.W.KVPV_APPEARANCE_AUTO.sync();assert.equal(q.ready('weapon_skill').ready,false,'locked skills and exhausted upgrades remain untouched');
// [VI dòng gốc 106] gọi assert.equal(q.W.KVPV_APPEARANCE_AUTO.status().confirmed, 2) để kiểm tra hai giá trị bằng nhau
 assert.equal(q.W.KVPV_APPEARANCE_AUTO.status().confirmed,2);
// [VI dòng gốc 107] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 108] gọi console.log('PASS appearance skill activation: native ready flag, exact skill id, activation and upgrade ACK, reload and locked skil…)
console.log('PASS appearance skill activation: native ready flag, exact skill id, activation and upgrade ACK, reload and locked skill guard');
// [VI dòng gốc 109] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 110] Duyệt từng giá trị trong ['fashion','arm','mount'] bằng const key. | Khai báo biến không gán lại bằng const: key (chưa gán giá trị)
for(const key of ['fashion','arm','mount']){
// [VI dòng gốc 111] Khai báo biến không gán lại bằng const: q = gọi harness(); rows = tạo mảng gồm 1 vị trí: [[101,0,1]]; calls = tạo mảng gồm 0 vị trí: [] | gán q.W._et bằng {_KQ:id=>Math.floor(Number(id)/100)}
 const q=harness(),rows=[[101,0,1]],calls=[];q.W._et={_KQ:id=>Math.floor(Number(id)/100)};
// [VI dòng gốc 112] Kiểm tra key==='fashion': đúng thì chạy nhánh sau if. | gán q.W._Ba._KJ._qJ.inst bằng {fashInfo:[5,rows]} | gán q.W._Ba._KJ._Ejt.inst.addFashSkillLvl bằng id=>calls.push([id])
 if(key==='fashion'){q.W._Ba._KJ._qJ.inst={fashInfo:[5,rows]};q.W._Ba._KJ._Ejt.inst.addFashSkillLvl=id=>calls.push([id]);}
// [VI dòng gốc 113] Kiểm tra key==='arm': đúng thì chạy nhánh sau if. | gán q.W._Ba._UJ._XJ.ins bằng {handInfo:[5,rows]} | gán q.W._Ba._UJ._Ujt.ins.addHandSkillLev bằng id=>calls.push([id])
 if(key==='arm'){q.W._Ba._UJ._XJ.ins={handInfo:[5,rows]};q.W._Ba._UJ._Ujt.ins.addHandSkillLev=id=>calls.push([id]);}
// [VI dòng gốc 114] Kiểm tra key==='mount': đúng thì chạy nhánh sau if. | gán q.W._Ba._YJ bằng {_WJ:{ins:{feed:[5,0,rows]}},_bgt:{ins:{addRideSkillLevel:(id,type)=>calls.push([id,type])}}}
 if(key==='mount')q.W._Ba._YJ={_WJ:{ins:{feed:[5,0,rows]}},_bgt:{ins:{addRideSkillLevel:(id,type)=>calls.push([id,type])}}};
// [VI dòng gốc 115] gọi q.run(key+'_skill') | gọi assert.deepEqual(calls, key==='mount'?[[101,1]]:[[101]], 'exact official arguments for '+key) để kiểm tra cấu trúc hai giá trị tương đương
 q.run(key+'_skill');assert.deepEqual(calls,key==='mount'?[[101,1]]:[[101]],'exact official arguments for '+key);
// [VI dòng gốc 116] gán rows[0] bằng [102,1,0] | gọi q.W.KVPV_APPEARANCE_AUTO.sync()
 rows[0]=[102,1,0];q.W.KVPV_APPEARANCE_AUTO.sync();
// [VI dòng gốc 117] gọi assert.equal(q.W.KVPV_APPEARANCE_AUTO.status().confirmed, 1, 'native skill family matches changed encoded id') để kiểm tra hai giá trị bằng nhau
 assert.equal(q.W.KVPV_APPEARANCE_AUTO.status().confirmed,1,'native skill family matches changed encoded id');
// [VI dòng gốc 118] gọi assert.equal(q.ready(key+'_skill').ready, false, 'native readiness cleared') để kiểm tra hai giá trị bằng nhau
 assert.equal(q.ready(key+'_skill').ready,false,'native readiness cleared');
// [VI dòng gốc 119] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 120] gọi console.log('PASS fashion/arm/mount skill activation: exact scalar/type arguments and ACK across encoded skill id change')
console.log('PASS fashion/arm/mount skill activation: exact scalar/type arguments and ACK across encoded skill id change');
// [VI dòng gốc 121] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 122] Duyệt từng giá trị trong ['pet','transform','weapon','wing'] bằng const key. | Khai báo biến không gán lại bằng const: key (chưa gán giá trị)
for(const key of ['pet','transform','weapon','wing']){
// [VI dòng gốc 123] Khai báo biến không gán lại bằng const: q = gọi harness(); rows = tạo mảng gồm 1 vị trí: [[301,0,1]]; sent = tạo mảng gồm 0 vị trí: []
 const q=harness(),rows=[[301,0,1]],sent=[];
// [VI dòng gốc 124] Kiểm tra key==='pet': đúng thì chạy nhánh sau if. | gán q.W._Ba._OJ bằng {_GJ:{inst:{fdSkills:rows}},_VBn:{inst:{skillUp:(...a)=>sent.push(a)}}}
 if(key==='pet')q.W._Ba._OJ={_GJ:{inst:{fdSkills:rows}},_VBn:{inst:{skillUp:(...a)=>sent.push(a)}}};
// [VI dòng gốc 125] Kiểm tra key==='transform': đúng thì chạy nhánh sau if. | gán q.W._Ba._s3 bằng {_ZJ:{ins:{feed:[0,0,0,rows]}},_Kyt:{ins:{onTransformingUpgradeReq:(...a)=>sent.push(a)}}}
 if(key==='transform')q.W._Ba._s3={_ZJ:{ins:{feed:[0,0,0,rows]}},_Kyt:{ins:{onTransformingUpgradeReq:(...a)=>sent.push(a)}}};
// [VI dòng gốc 126] Kiểm tra key==='weapon': đúng thì chạy nhánh sau if. | gán q.W._Ba._M4._HJ.inst.feedSkills bằng rows | gán q.W._Ba._M4._j6t.inst.skillLv bằng a=>sent.push(Array.from(a))
 if(key==='weapon'){q.W._Ba._M4._HJ.inst.feedSkills=rows;q.W._Ba._M4._j6t.inst.skillLv=a=>sent.push(Array.from(a));}
// [VI dòng gốc 127] Kiểm tra key==='wing': đúng thì chạy nhánh sau if. | gán q.W._Ba._RJ._DJ.ins.feedSkills bằng rows | gán q.W._Ba._RJ._R6t.ins.skillLev bằng a=>sent.push(Array.from(a))
 if(key==='wing'){q.W._Ba._RJ._DJ.ins.feedSkills=rows;q.W._Ba._RJ._R6t.ins.skillLev=a=>sent.push(Array.from(a));}
// [VI dòng gốc 128] gọi q.run(key+'_skill') | gọi assert.deepEqual(sent, key==='pet'?[[301,1]]:key==='transform'?[[1,301]]:[[301]], 'exact native args '+key) để kiểm tra cấu trúc hai giá trị tương đương
 q.run(key+'_skill');assert.deepEqual(sent,key==='pet'?[[301,1]]:key==='transform'?[[1,301]]:[[301]],'exact native args '+key);
// [VI dòng gốc 129] gọi q.load() | gọi assert.equal(q.ready(key+'_skill').ready, false, 'pending retained') để kiểm tra hai giá trị bằng nhau
 q.load();assert.equal(q.ready(key+'_skill').ready,false,'pending retained');
// [VI dòng gốc 130] gán rows[0] bằng [301,1,0] | gọi q.W.KVPV_APPEARANCE_AUTO.sync() | gọi assert.equal(q.W.KVPV_APPEARANCE_AUTO.status().confirmed, 1) để kiểm tra hai giá trị bằng nhau
 rows[0]=[301,1,0];q.W.KVPV_APPEARANCE_AUTO.sync();assert.equal(q.W.KVPV_APPEARANCE_AUTO.status().confirmed,1);
// [VI dòng gốc 131] gọi assert.equal(q.ready(key+'_skill').ready, false, 'no repeat when native ready flag cleared') để kiểm tra hai giá trị bằng nhau
 assert.equal(q.ready(key+'_skill').ready,false,'no repeat when native ready flag cleared');
// [VI dòng gốc 132] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 133] gọi console.log('PASS pet/transform/feed skills: exact argument order, source lists, native ACK and reload protection')
console.log('PASS pet/transform/feed skills: exact argument order, source lists, native ACK and reload protection');
// [VI dòng gốc 134] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 135] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng {. Đọc cùng dòng mở phía trên: {
{
// [VI dòng gốc 136] Khai báo biến không gán lại bằng const: q = gọi harness() | gọi q.set({common:false,resourcesBusy:true})
 const q=harness();q.set({common:false,resourcesBusy:true});
// [VI dòng gốc 137] Khai báo biến có thể gán lại bằng let: step = "fighting" | gán q.W.KVPV_DAILY bằng {quickState:()=>({running:true,job:'vinhdu',step})}
 let step='fighting';q.W.KVPV_DAILY={quickState:()=>({running:true,job:'vinhdu',step})};
// [VI dòng gốc 138] gán q.W.KVPV bằng {core:{scene:{status:()=>({owner:'combat'})}}} | gán q.W.KVPV_PARALLEL_ACTIONS bằng {independent:true}
 q.W.KVPV={core:{scene:{status:()=>({owner:'combat'})}}};q.W.KVPV_PARALLEL_ACTIONS={independent:true};
// [VI dòng gốc 139] gọi assert.equal(q.get('weapon').background, true) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.ready('weapon').ready, true, 'direct upgrade runs during stable PVE') để kiểm tra hai giá trị bằng nhau
 assert.equal(q.get('weapon').background,true);assert.equal(q.ready('weapon').ready,true,'direct upgrade runs during stable PVE');
// [VI dòng gốc 140] gọi q.run('weapon') | gọi assert.equal(q.ready('wing').ready, false, 'own pending still prevents overlap') để kiểm tra hai giá trị bằng nhau
 q.run('weapon');assert.equal(q.ready('wing').ready,false,'own pending still prevents overlap');
// [VI dòng gốc 141] tăng q.levels.weapon một đơn vị sau khi lấy giá trị | gọi q.W.KVPV_APPEARANCE_AUTO.sync() | gán step bằng 'entering' | gọi assert.equal(q.ready('wing').ready, false, 'transition blocks new send') để kiểm tra hai giá trị bằng nhau
 q.levels.weapon++;q.W.KVPV_APPEARANCE_AUTO.sync();step='entering';assert.equal(q.ready('wing').ready,false,'transition blocks new send');
// [VI dòng gốc 142] gán step bằng 'fighting' | gán q.W._Ba._rJ._O$.ins.isDead bằng true | gọi assert.equal(q.ready('wing').ready, false, 'dead actor blocked') để kiểm tra hai giá trị bằng nhau
 step='fighting';q.W._Ba._rJ._O$.ins.isDead=true;assert.equal(q.ready('wing').ready,false,'dead actor blocked');
// [VI dòng gốc 143] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 144] gọi console.log('PASS stable PVE appearance upgrades: direct send without UI/scene changes, native ACK, transition and death guards')
console.log('PASS stable PVE appearance upgrades: direct send without UI/scene changes, native ACK, transition and death guards');
// [VI dòng gốc 145] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 146] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng {. Đọc cùng dòng mở phía trên: {
{
// [VI dòng gốc 147] Khai báo biến không gán lại bằng const: q = gọi harness() | gọi q.set({common:false}) | Khai báo biến có thể gán lại bằng let: allowed = true
 const q=harness();q.set({common:false});let allowed=true;
// [VI dòng gốc 148] gán q.W.KVPV_DAILY bằng {quickState:()=>({running:true,job:'rảnh',step:'-'})}
 q.W.KVPV_DAILY={quickState:()=>({running:true,job:'rảnh',step:'-'})};
// [VI dòng gốc 149] gán q.W.KVPV_PARALLEL_ACTIONS bằng {independent:true,canDirectDuringPve:()=>allowed}
 q.W.KVPV_PARALLEL_ACTIONS={independent:true,canDirectDuringPve:()=>allowed};
// [VI dòng gốc 150] gọi assert.equal(q.ready('weapon').ready, true, 'HitRun background gate accepted') để kiểm tra hai giá trị bằng nhau | gán allowed bằng false | gọi assert.equal(q.ready('weapon').ready, false, 'recovery gate still blocks') để kiểm tra hai giá trị bằng nhau
 assert.equal(q.ready('weapon').ready,true,'HitRun background gate accepted');allowed=false;assert.equal(q.ready('weapon').ready,false,'recovery gate still blocks');
// [VI dòng gốc 151] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 152] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 153] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng {. Đọc cùng dòng mở phía trên: {
{
// [VI dòng gốc 154] Khai báo biến không gán lại bằng const: q = gọi harness() | Khai báo biến có thể gán lại bằng let: lv = 156; exp = 50 | Khai báo biến không gán lại bằng const: calls = tạo mảng gồm 0 vị trí: []
 const q=harness();let lv=156,exp=50;const calls=[];
// [VI dòng gốc 155] gán q.W._Ba._s3 bằng {_ZJ:{ins:{get feed(){return [lv,exp,0,[]];}}},_Kyt:{ins:{onTransformingUpgradeReq:(...a)=>calls.push(a)}}} | Kết thúc hàm hiện tại và trả về: tạo mảng gồm 4 vị trí: [lv,exp,0,[]].
 q.W._Ba._s3={_ZJ:{ins:{get feed(){return [lv,exp,0,[]];}}},_Kyt:{ins:{onTransformingUpgradeReq:(...a)=>calls.push(a)}}};
// [VI dòng gốc 156] gán q.W._ft._Tyt bằng {ins:{getFeedCfgByLv:n=>n<158?[n,320,[999,1,10]]:null}}
 q.W._ft._Tyt={ins:{getFeedCfgByLv:n=>n<158?[n,320,[999,1,10]]:null}};
// [VI dòng gốc 157] gọi q.run('transform') | gọi assert.deepEqual(calls, [[0]], 'native feed type 0') để kiểm tra cấu trúc hai giá trị tương đương | gọi assert.equal(q.ready('transform').ready, false) để kiểm tra hai giá trị bằng nhau
 q.run('transform');assert.deepEqual(calls,[[0]],'native feed type 0');assert.equal(q.ready('transform').ready,false);
// [VI dòng gốc 158] gọi q.load() | gọi assert.equal(q.ready('transform').ready, false, 'pending retained on reload') để kiểm tra hai giá trị bằng nhau
 q.load();assert.equal(q.ready('transform').ready,false,'pending retained on reload');
// [VI dòng gốc 159] gán exp bằng 60 | gọi q.W.KVPV_APPEARANCE_AUTO.sync() | gọi assert.equal(q.ready('transform').ready, true, 'blessing EXP confirms same-level feed') để kiểm tra hai giá trị bằng nhau
 exp=60;q.W.KVPV_APPEARANCE_AUTO.sync();assert.equal(q.ready('transform').ready,true,'blessing EXP confirms same-level feed');
// [VI dòng gốc 160] gọi q.run('transform') | gán lv bằng 157 | gán exp bằng 0 | gọi q.W.KVPV_APPEARANCE_AUTO.sync()
 q.run('transform');lv=157;exp=0;q.W.KVPV_APPEARANCE_AUTO.sync();assert.equal(q.ready('transform').ready,false,'max native feed config');
// [VI dòng gốc 161] gọi assert.equal(q.W.KVPV_APPEARANCE_AUTO.status().confirmed, 2) để kiểm tra hai giá trị bằng nhau | gọi q.W.KVPV_APPEARANCE_AUTO.stop() để dừng bộ điều khiển và dọn tài nguyên
 assert.equal(q.W.KVPV_APPEARANCE_AUTO.status().confirmed,2);q.W.KVPV_APPEARANCE_AUTO.stop();
// [VI dòng gốc 162] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 163] gọi console.log('PASS transform feed: native material config and type 0, blessing EXP ACK, reload pending and maximum level')
console.log('PASS transform feed: native material config and type 0, blessing EXP ACK, reload pending and maximum level');
// [VI dòng gốc 164] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 165] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng {. Đọc cùng dòng mở phía trên: {
{
// [VI dòng gốc 166] Khai báo biến không gán lại bằng const: q = gọi harness() | Khai báo biến có thể gán lại bằng let: lv = 84 | Khai báo biến không gán lại bằng const: calls = tạo mảng gồm 0 vị trí: [] | gán q.W._Ba._rJ._O$.ins.level bằng 502
 const q=harness();let lv=84;const calls=[];q.W._Ba._rJ._O$.ins.level=502;
// [VI dòng gốc 167] gán q.W._Ba._M4._HJ.inst._kat bằng new Map() | gán q.W._Ba._M4._HJ.inst.getFhunLstByType bằng t=>t===3?[t,lv]:[t,100]
 q.W._Ba._M4._HJ.inst._kat=new Map();q.W._Ba._M4._HJ.inst.getFhunLstByType=t=>t===3?[t,lv]:[t,100];
// [VI dòng gốc 168] gán q.W._Ba._M4._j6t.inst.refLv bằng a=>calls.push([...a])
 q.W._Ba._M4._j6t.inst.refLv=a=>calls.push([...a]);
// [VI dòng gốc 169] gán q.W._ft._r$.ins.getFuhunCfgByTypeAndLev bằng (t,n)=>n<=85?[n,0,[999,1],500]:null
 q.W._ft._r$.ins.getFuhunCfgByTypeAndLev=(t,n)=>n<=85?[n,0,[999,1],500]:null;
// [VI dòng gốc 170] gọi assert.equal(q.ready('weapon_soul_0').ready, false, 'max soul') để kiểm tra hai giá trị bằng nhau | gọi q.run('weapon_soul_3') | gọi assert.deepEqual(calls, [[3,0]], 'single native infusion, no bulk purchase') để kiểm tra cấu trúc hai giá trị tương đương
 assert.equal(q.ready('weapon_soul_0').ready,false,'max soul');q.run('weapon_soul_3');assert.deepEqual(calls,[[3,0]],'single native infusion, no bulk purchase');
// [VI dòng gốc 171] gọi q.load() | gọi assert.equal(q.ready('weapon_soul_3').ready, false, 'unconfirmed infusion retained') để kiểm tra hai giá trị bằng nhau | gán lv bằng 85 | gọi q.W.KVPV_APPEARANCE_AUTO.sync()
 q.load();assert.equal(q.ready('weapon_soul_3').ready,false,'unconfirmed infusion retained');lv=85;q.W.KVPV_APPEARANCE_AUTO.sync();assert.equal(q.ready('weapon_soul_3').ready,false,'max config');
// [VI dòng gốc 172] gán lv bằng 84 | gán q.W._Ba._rJ._O$.ins.level bằng 499 | gọi assert.equal(q.ready('weapon_soul_3').ready, false, 'character level cap') để kiểm tra hai giá trị bằng nhau
 lv=84;q.W._Ba._rJ._O$.ins.level=499;assert.equal(q.ready('weapon_soul_3').ready,false,'character level cap');
// [VI dòng gốc 173] gán q.W._Ba._rJ._O$.ins.level bằng 502 | gọi q.set({count:0}) | gọi assert.equal(q.ready('weapon_soul_3').ready, false, 'materials required') để kiểm tra hai giá trị bằng nhau | gọi q.set({count:2})
 q.W._Ba._rJ._O$.ins.level=502;q.set({count:0});assert.equal(q.ready('weapon_soul_3').ready,false,'materials required');q.set({count:2});
// [VI dòng gốc 174] gọi assert.equal(q.ready('weapon_soul_3').ready, true) để kiểm tra hai giá trị bằng nhau | gán q.W._Ba._M4._HJ.inst._kat bằng null | gọi assert.equal(q.ready('weapon_soul_3').ready, false, 'unloaded model is not level zero') để kiểm tra hai giá trị bằng nhau | gọi q.W.KVPV_APPEARANCE_AUTO.stop() để dừng bộ điều khiển và dọn tài nguyên
 assert.equal(q.ready('weapon_soul_3').ready,true);q.W._Ba._M4._HJ.inst._kat=null;assert.equal(q.ready('weapon_soul_3').ready,false,'unloaded model is not level zero');q.W.KVPV_APPEARANCE_AUTO.stop();
// [VI dòng gốc 175] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 176] gọi console.log('PASS weapon soul infusion: four native types, material/max/character-level guards, loaded data and ACK across reload')
console.log('PASS weapon soul infusion: four native types, material/max/character-level guards, loaded data and ACK across reload');
// [VI dòng gốc 177] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 178] Duyệt từng giá trị trong ['wing','fashion','arm'] bằng const group. | Khai báo biến không gán lại bằng const: group (chưa gán giá trị)
for(const group of ['wing','fashion','arm']){
// [VI dòng gốc 179] Khai báo biến không gán lại bằng const: q = gọi harness() | Khai báo biến có thể gán lại bằng let: lv = 10 | Khai báo biến không gán lại bằng const: calls = tạo mảng gồm 0 vị trí: [] | gán q.W._Ba._rJ._O$.ins.level bằng 502
 const q=harness();let lv=10;const calls=[];q.W._Ba._rJ._O$.ins.level=502;
// [VI dòng gốc 180] Khai báo biến không gán lại bằng const: row = tạo hàm với tham số type, n; mỗi lần gọi trả về nếu n<=11 thì lấy [n,0,[999,1],500], ngược lại lấy null
 const row=(type,n)=>n<=11?[n,0,[999,1],500]:null;
// [VI dòng gốc 181] Kiểm tra group==='wing': đúng thì chạy nhánh sau if. | gán q.W._Ba._RJ._DJ.ins._kat bằng new Map() | gán q.W._Ba._RJ._DJ.ins.getFuhunLsByType bằng t=>[t,lv] | gán q.W._Ba._RJ._R6t.ins.refineLev bằng a=>calls.push([...a])
 if(group==='wing'){q.W._Ba._RJ._DJ.ins._kat=new Map();q.W._Ba._RJ._DJ.ins.getFuhunLsByType=t=>[t,lv];q.W._Ba._RJ._R6t.ins.refineLev=a=>calls.push([...a]);q.W._ft._PZ.ins.getFuhunCfgByTypeAndLev=row;}
// [VI dòng gốc 182] Kiểm tra group==='fashion': đúng thì chạy nhánh sau if. | gọi Object.defineProperty(q.W._Ba._KJ._qJ.inst, 'fashInfo', {get:()=>[5,[],0,0,[],0,0,[[2,lv]]]}) | gán q.W._Ba._KJ._Ejt.inst.addFashRefine bằng a=>calls.push([...a]) | gán q.W._ft._Hqt bằng {ins:{getCfgByTypeAndLv:row}}
 if(group==='fashion'){Object.defineProperty(q.W._Ba._KJ._qJ.inst,'fashInfo',{get:()=>[5,[],0,0,[],0,0,[[2,lv]]]});q.W._Ba._KJ._Ejt.inst.addFashRefine=a=>calls.push([...a]);q.W._ft._Hqt={ins:{getCfgByTypeAndLv:row}};}
// [VI dòng gốc 183] Kiểm tra group==='arm': đúng thì chạy nhánh sau if. | gọi Object.defineProperty(q.W._Ba._UJ._XJ.ins, 'handInfo', {get:()=>[5,[],0,0,[],0,0,[[2,lv]]]}) | gán q.W._Ba._UJ._Ujt.ins bằng {addHandRefine:a=>calls.push([...a])} | gán q.W._ft._IKt bằng {ins:{getCfgByTypeAndLv:row}}
 if(group==='arm'){Object.defineProperty(q.W._Ba._UJ._XJ.ins,'handInfo',{get:()=>[5,[],0,0,[],0,0,[[2,lv]]]});q.W._Ba._UJ._Ujt.ins={addHandRefine:a=>calls.push([...a])};q.W._ft._IKt={ins:{getCfgByTypeAndLv:row}};}
// [VI dòng gốc 184] gọi q.run(group+'_soul_2') | gọi assert.deepEqual(calls, [[2,0]], group+' native single-item call') để kiểm tra cấu trúc hai giá trị tương đương | gọi q.load() | gọi assert.equal(q.ready(group+'_soul_2').ready, false, 'pending survives reload') để kiểm tra hai giá trị bằng nhau
 q.run(group+'_soul_2');assert.deepEqual(calls,[[2,0]],group+' native single-item call');q.load();assert.equal(q.ready(group+'_soul_2').ready,false,'pending survives reload');
// [VI dòng gốc 185] gán lv bằng 11 | gọi q.W.KVPV_APPEARANCE_AUTO.sync() | gọi assert.equal(q.ready(group+'_soul_2').ready, false, 'max level') để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.W.KVPV_APPEARANCE_AUTO.status().confirmed, 1) để kiểm tra hai giá trị bằng nhau
 lv=11;q.W.KVPV_APPEARANCE_AUTO.sync();assert.equal(q.ready(group+'_soul_2').ready,false,'max level');assert.equal(q.W.KVPV_APPEARANCE_AUTO.status().confirmed,1);
// [VI dòng gốc 186] gán lv bằng 10 | gán q.W._Ba._rJ._O$.ins.level bằng 499 | gọi assert.equal(q.ready(group+'_soul_2').ready, false, 'character cap') để kiểm tra hai giá trị bằng nhau | gán q.W._Ba._rJ._O$.ins.level bằng 502
 lv=10;q.W._Ba._rJ._O$.ins.level=499;assert.equal(q.ready(group+'_soul_2').ready,false,'character cap');q.W._Ba._rJ._O$.ins.level=502;q.set({count:0});assert.equal(q.ready(group+'_soul_2').ready,false,'no materials');q.W.KVPV_APPEARANCE_AUTO.stop();
// [VI dòng gốc 187] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 188] gọi console.log('PASS wing/fashion/arm soul infusion: exact per-group model/config/RPC, all guards and native level ACK')
console.log('PASS wing/fashion/arm soul infusion: exact per-group model/config/RPC, all guards and native level ACK');
// [VI dòng gốc 189] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 190] Duyệt từng giá trị trong ['jewelry','cloak'] bằng const group. | Khai báo biến không gán lại bằng const: group (chưa gán giá trị)
for(const group of ['jewelry','cloak']){
// [VI dòng gốc 191] Khai báo biến không gán lại bằng const: q = gọi harness() | Khai báo biến có thể gán lại bằng let: lv = 10 | Khai báo biến không gán lại bằng const: calls = tạo mảng gồm 0 vị trí: [] | gán q.W._Ba._rJ._O$.ins.level bằng 502
 const q=harness();let lv=10;const calls=[];q.W._Ba._rJ._O$.ins.level=502;
// [VI dòng gốc 192] Khai báo biến không gán lại bằng const: row = tạo hàm với tham số type, n; mỗi lần gọi trả về nếu n<=11 thì lấy [n,0,[999,1],500], ngược lại lấy null
 const row=(type,n)=>n<=11?[n,0,[999,1],500]:null;
// [VI dòng gốc 193] Kiểm tra group==='cloak': đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gán q.W._Ba._JJ bằng {_QJ:{inst:{_kat:new Map(),getFhunLstByType:t=>[t,lv]}},_Oun:{inst:{refLv:a=>calls.push([...a])}}} | gán q.W._ft._o$ bằng {ins:{getFuhunCfgByTypeAndLev:row}}
 if(group==='cloak'){q.W._Ba._JJ={_QJ:{inst:{_kat:new Map(),getFhunLstByType:t=>[t,lv]}},_Oun:{inst:{refLv:a=>calls.push([...a])}}};q.W._ft._o$={ins:{getFuhunCfgByTypeAndLev:row}};}
// [VI dòng gốc 194] gán q.W._Ba.__W bằng {_$J:{inst:{get hlInfo(){return [0,0,0,0,0,0,0,0,[[1,lv]]];}}},_Kon:{inst:{addHlRefine:a=>calls.push([...a])}}} | Kết thúc hàm hiện tại và trả về: tạo mảng gồm 9 vị trí: [0,0,0,0,0,0,0,0,[[1,lv]]]. | gán q.W._ft._pLi bằng {ins:{getCfgByTypeAndLv:row}}
 else {q.W._Ba.__W={_$J:{inst:{get hlInfo(){return [0,0,0,0,0,0,0,0,[[1,lv]]];}}},_Kon:{inst:{addHlRefine:a=>calls.push([...a])}}};q.W._ft._pLi={ins:{getCfgByTypeAndLv:row}};}
// [VI dòng gốc 195] gọi q.run(group+'_soul_1') | gọi assert.deepEqual(calls, [[1,0]], group+' native arguments') để kiểm tra cấu trúc hai giá trị tương đương | gọi q.load() | gọi assert.equal(q.ready(group+'_soul_1').ready, false, 'pending retained') để kiểm tra hai giá trị bằng nhau
 q.run(group+'_soul_1');assert.deepEqual(calls,[[1,0]],group+' native arguments');q.load();assert.equal(q.ready(group+'_soul_1').ready,false,'pending retained');
// [VI dòng gốc 196] gán lv bằng 11 | gọi q.W.KVPV_APPEARANCE_AUTO.sync() | gọi assert.equal(q.ready(group+'_soul_1').ready, false, 'maximum level') để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.W.KVPV_APPEARANCE_AUTO.status().confirmed, 1) để kiểm tra hai giá trị bằng nhau
 lv=11;q.W.KVPV_APPEARANCE_AUTO.sync();assert.equal(q.ready(group+'_soul_1').ready,false,'maximum level');assert.equal(q.W.KVPV_APPEARANCE_AUTO.status().confirmed,1);
// [VI dòng gốc 197] gán lv bằng 10 | gán q.W._Ba._rJ._O$.ins.level bằng 499 | gọi assert.equal(q.ready(group+'_soul_1').ready, false, 'character gate') để kiểm tra hai giá trị bằng nhau | gán q.W._Ba._rJ._O$.ins.level bằng 502
 lv=10;q.W._Ba._rJ._O$.ins.level=499;assert.equal(q.ready(group+'_soul_1').ready,false,'character gate');q.W._Ba._rJ._O$.ins.level=502;q.set({count:0});assert.equal(q.ready(group+'_soul_1').ready,false,'material gate');q.W.KVPV_APPEARANCE_AUTO.stop();
// [VI dòng gốc 198] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 199] gọi console.log('PASS jewelry/cloak soul infusion: exact model, material config, RPC arguments, caps and reload ACK')
console.log('PASS jewelry/cloak soul infusion: exact model, material config, RPC arguments, caps and reload ACK');
// [VI dòng gốc 200] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 201] Duyệt từng giá trị trong ['cloak','jewelry'] bằng const key. | Khai báo biến không gán lại bằng const: key (chưa gán giá trị)
for(const key of ['cloak','jewelry']){
// [VI dòng gốc 202] Khai báo biến không gán lại bằng const: q = gọi harness() | Khai báo biến có thể gán lại bằng let: lv = 5; exp = 0 | Khai báo biến không gán lại bằng const: calls = tạo mảng gồm 0 vị trí: []
 const q=harness();let lv=5,exp=0;const calls=[];
// [VI dòng gốc 203] Kiểm tra key==='cloak': đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gán q.W._Ba._JJ bằng {_QJ:{inst:{otherValue:{get 'Tăng cấp'(){return lv;}}}},_Oun:{inst:{fdShbing:()=>calls.push('cloak')}}} | Kết thúc hàm hiện tại và trả về: lv. | gán q.W._ft._o$ bằng {ins:{getShengjiCfgByLv:n=>n<=6?[n,[999,5]]:null}}
 if(key==='cloak'){q.W._Ba._JJ={_QJ:{inst:{otherValue:{get 'Tăng cấp'(){return lv;}}}},_Oun:{inst:{fdShbing:()=>calls.push('cloak')}}};q.W._ft._o$={ins:{getShengjiCfgByLv:n=>n<=6?[n,[999,5]]:null}};}
// [VI dòng gốc 204] gán q.W._Ba.__W bằng {_$J:{inst:{get hlInfo(){return [lv,exp];}}},_Kon:{inst:{fdHl:()=>calls.push('jewelry')}}} | Kết thúc hàm hiện tại và trả về: tạo mảng gồm 2 vị trí: [lv,exp]. | gán q.W._ft._CBn bằng {ins:{getCfgByLevel:n=>n<=6?[n,100]:null}} | gán q.W._ft._gY bằng {ins:{getCfgById:id=>id===242001?[id,0,[999,10]]:null}}
 else {q.W._Ba.__W={_$J:{inst:{get hlInfo(){return [lv,exp];}}},_Kon:{inst:{fdHl:()=>calls.push('jewelry')}}};q.W._ft._CBn={ins:{getCfgByLevel:n=>n<=6?[n,100]:null}};q.W._ft._gY={ins:{getCfgById:id=>id===242001?[id,0,[999,10]]:null}};}
// [VI dòng gốc 205] gọi q.run(key) | gọi assert.deepEqual(calls, [key]) để kiểm tra cấu trúc hai giá trị tương đương | gọi q.load() | gọi assert.equal(q.ready(key).ready, false, 'pending retained') để kiểm tra hai giá trị bằng nhau
 q.run(key);assert.deepEqual(calls,[key]);q.load();assert.equal(q.ready(key).ready,false,'pending retained');
// [VI dòng gốc 206] Kiểm tra key==='jewelry': đúng thì chạy nhánh sau if. | gán exp bằng 10 | gọi q.W.KVPV_APPEARANCE_AUTO.sync() | gọi assert.equal(q.ready(key).ready, true) để kiểm tra hai giá trị bằng nhau
 if(key==='jewelry'){exp=10;q.W.KVPV_APPEARANCE_AUTO.sync();assert.equal(q.ready(key).ready,true);q.run(key);}
// [VI dòng gốc 207] gán lv bằng 6 | gán exp bằng 0 | gọi q.W.KVPV_APPEARANCE_AUTO.sync() | gọi assert.equal(q.ready(key).ready, false, 'maximum native level') để kiểm tra hai giá trị bằng nhau
 lv=6;exp=0;q.W.KVPV_APPEARANCE_AUTO.sync();assert.equal(q.ready(key).ready,false,'maximum native level');
// [VI dòng gốc 208] gán lv bằng 5 | gọi q.set({count:0}) | gọi assert.equal(q.ready(key).ready, false, 'materials required') để kiểm tra hai giá trị bằng nhau | gọi q.W.KVPV_APPEARANCE_AUTO.stop() để dừng bộ điều khiển và dọn tài nguyên
 lv=5;q.set({count:0});assert.equal(q.ready(key).ready,false,'materials required');q.W.KVPV_APPEARANCE_AUTO.stop();
// [VI dòng gốc 209] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 210] gọi console.log('PASS cloak and jewelry base upgrades: native cost config, single RPC, EXP/level ACK, maximum and material guards')
console.log('PASS cloak and jewelry base upgrades: native cost config, single RPC, EXP/level ACK, maximum and material guards');
// [VI dòng gốc 211] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 212] Duyệt từng giá trị trong ['cloak','jewelry'] bằng const group. | Khai báo biến không gán lại bằng const: group (chưa gán giá trị)
for(const group of ['cloak','jewelry']){
// [VI dòng gốc 213] Khai báo biến không gán lại bằng const: q = gọi harness(); rows = tạo mảng gồm 1 vị trí: [[101,0,1]]; calls = tạo mảng gồm 0 vị trí: []
 const q=harness(),rows=[[101,0,1]],calls=[];
// [VI dòng gốc 214] Kiểm tra group==='cloak': đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gán q.W._Ba._JJ bằng {_QJ:{inst:{skillLst:new Map([[101,rows[0]]])}},_Oun:{inst:{skillLv:a=>calls.push([...a])}}}
 if(group==='cloak')q.W._Ba._JJ={_QJ:{inst:{skillLst:new Map([[101,rows[0]]])}},_Oun:{inst:{skillLv:a=>calls.push([...a])}}};
// [VI dòng gốc 215] gán q.W._Ba.__W bằng {_$J:{inst:{hlInfo:[5,0,rows]}},_Kon:{inst:{addHlSkillLv:id=>calls.push(id)}}}
 else q.W._Ba.__W={_$J:{inst:{hlInfo:[5,0,rows]}},_Kon:{inst:{addHlSkillLv:id=>calls.push(id)}}};
// [VI dòng gốc 216] Kiểm tra group==='cloak': đúng thì chạy nhánh sau if. | Khai báo biến không gán lại bằng const: map = đọc q.W._Ba._JJ._QJ.inst.skillLst | gán map.keys bằng [101]
 if(group==='cloak'){const map=q.W._Ba._JJ._QJ.inst.skillLst;map.keys=[101];}
// [VI dòng gốc 217] gọi q.run(group+'_skill') | gọi assert.deepEqual(calls, group==='cloak'?[[101]]:[101]) để kiểm tra cấu trúc hai giá trị tương đương | gán rows[0][1] bằng 1 | gán rows[0][2] bằng 0
 q.run(group+'_skill');assert.deepEqual(calls,group==='cloak'?[[101]]:[101]);rows[0][1]=1;rows[0][2]=0;q.advance(100);assert.equal(q.ready(group+'_skill').ready,false);q.W.KVPV_APPEARANCE_AUTO.stop();
// [VI dòng gốc 218] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 219] gọi console.log('PASS jewelry and cloak skill activation: exact native arguments and level ACK')
console.log('PASS jewelry and cloak skill activation: exact native arguments and level ACK');
// [VI dòng gốc 220] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 221] Duyệt từng giá trị trong ['weapon','wing','fashion','arm','jewelry','cloak'] bằng const group. | Khai báo biến không gán lại bằng const: group (chưa gán giá trị)
for(const group of ['weapon','wing','fashion','arm','jewelry','cloak']){
// [VI dòng gốc 222] Khai báo biến không gán lại bằng const: q = gọi harness(); entries = tạo mảng gồm 0 vị trí: []; calls = tạo mảng gồm 0 vị trí: [] | Khai báo biến không gán lại bằng const: id = 7001 | Khai báo biến có thể gán lại bằng let: have = 2
 const q=harness(),entries=[],calls=[];const id=7001;let have=2;
// [VI dòng gốc 223] gán q.W._et bằng {getSvipLimit:()=>0} | gán q.W._Ba._ke bằng {_Le:{instance:{curSvipLv:0}}} | gán q.W._Ba._Ic._aQ.ins.getItemCountById bằng ()=>have
 q.W._et={getSvipLimit:()=>0};q.W._Ba._ke={_Le:{instance:{curSvipLv:0}}};q.W._Ba._Ic._aQ.ins.getItemCountById=()=>have;
// [VI dòng gốc 224] Khai báo biến không gán lại bằng const: map = tạo đối tượng gồm keys, get
 const map={keys:[],get:n=>entries.find(r=>r[0]===n)};
// [VI dòng gốc 225] Khai báo biến không gán lại bằng const: cfg = tạo đối tượng gồm getShowIds, getHuanhuaShowIds, getHuanhuaCfgByIdAndLev, getHuanhuaCfgByIdAndLv, getCfgByShowIdAndLevel, getCfgByIdAndLv
 const cfg={getShowIds:()=>[id],getHuanhuaShowIds:()=>[id],getHuanhuaCfgByIdAndLev:(i,n)=>n<=2?[n,0,[[999,1]]]:null,getHuanhuaCfgByIdAndLv:(i,n)=>n<=2?[n,0,[[999,1]]]:null,getCfgByShowIdAndLevel:(i,n)=>n<=2?[n,0,[[999,1]]]:null,getCfgByIdAndLv:(i,n)=>n<=2?[n,0,[[999,1]]]:null};
// [VI dòng gốc 226] Khai báo biến không gán lại bằng const: send = tạo hàm với tham số a; mỗi lần gọi trả về gọi calls.push(Array.isArray(a)?[...a]:a) để thêm phần tử vào cuối mảng
 const send=a=>calls.push(Array.isArray(a)?[...a]:a);
// [VI dòng gốc 227] Kiểm tra group==='weapon': đúng thì chạy nhánh sau if. | gán q.W._Ba._M4._HJ.inst.hhuaLst bằng map | gán q.W._Ba._M4._j6t.inst.mgcLv bằng send | gọi Object.assign(q.W._ft._r$.ins, cfg)
 if(group==='weapon'){q.W._Ba._M4._HJ.inst.hhuaLst=map;q.W._Ba._M4._j6t.inst.mgcLv=send;Object.assign(q.W._ft._r$.ins,cfg);}
// [VI dòng gốc 228] Kiểm tra group==='wing': đúng thì chạy nhánh sau if. | gán q.W._Ba._RJ._DJ.ins.huanhuaLs bằng map | gán q.W._Ba._RJ._R6t.ins.magicLev bằng send | gọi Object.assign(q.W._ft._PZ.ins, cfg)
 if(group==='wing'){q.W._Ba._RJ._DJ.ins.huanhuaLs=map;q.W._Ba._RJ._R6t.ins.magicLev=send;Object.assign(q.W._ft._PZ.ins,cfg);}
// [VI dòng gốc 229] Kiểm tra group==='fashion': đúng thì chạy nhánh sau if. | gọi Object.defineProperty(q.W._Ba._KJ._qJ.inst, 'fashInfo', {get:()=>[5,[],0,0,entries]}) | gán q.W._Ba._KJ._qJ.inst.getActLst bằng ()=>[999,1] | gán q.W._Ba._KJ._Ejt.inst.addFashMgcShow bằng send
 if(group==='fashion'){Object.defineProperty(q.W._Ba._KJ._qJ.inst,'fashInfo',{get:()=>[5,[],0,0,entries]});q.W._Ba._KJ._qJ.inst.getActLst=()=>[999,1];q.W._Ba._KJ._Ejt.inst.addFashMgcShow=send;q.W._ft._Eqt={ins:cfg};}
// [VI dòng gốc 230] Kiểm tra group==='arm': đúng thì chạy nhánh sau if. | gọi Object.defineProperty(q.W._Ba._UJ._XJ.ins, 'handInfo', {get:()=>[5,[],0,0,entries]}) | gán q.W._Ba._UJ._Ujt.ins bằng {addHandMagShow:send} | gán q.W._ft._VKt bằng {ins:cfg}
 if(group==='arm'){Object.defineProperty(q.W._Ba._UJ._XJ.ins,'handInfo',{get:()=>[5,[],0,0,entries]});q.W._Ba._UJ._Ujt.ins={addHandMagShow:send};q.W._ft._VKt={ins:cfg};}
// [VI dòng gốc 231] Kiểm tra group==='jewelry': đúng thì chạy nhánh sau if. | gán q.W._Ba.__W bằng {_$J:{inst:{hlInfo:[5,0,[],0,0,entries]}},_Kon:{inst:{addHlMgcShow:send}}} | gán q.W._ft._iSn bằng {ins:cfg}
 if(group==='jewelry'){q.W._Ba.__W={_$J:{inst:{hlInfo:[5,0,[],0,0,entries]}},_Kon:{inst:{addHlMgcShow:send}}};q.W._ft._iSn={ins:cfg};}
// [VI dòng gốc 232] Kiểm tra group==='cloak': đúng thì chạy nhánh sau if. | gán q.W._Ba._JJ bằng {_QJ:{inst:{hhuaLst:map}},_Oun:{inst:{mgcLv:send}}} | gán q.W._ft._o$ bằng {ins:cfg}
 if(group==='cloak'){q.W._Ba._JJ={_QJ:{inst:{hhuaLst:map}},_Oun:{inst:{mgcLv:send}}};q.W._ft._o$={ins:cfg};}
// [VI dòng gốc 233] gọi q.run(group+'_illusion') | gọi assert.deepEqual(calls, ['fashion','arm','jewelry'].includes(group)?[id]:[[id]], 'native activation '+group) để kiểm tra cấu trúc hai giá trị tương đương
 q.run(group+'_illusion');assert.deepEqual(calls,(['fashion','arm','jewelry'].includes(group)?[id]:[[id]]),'native activation '+group);
// [VI dòng gốc 234] gọi q.load() | gọi assert.equal(q.ready(group+'_illusion').ready, false, 'activation not replayed') để kiểm tra hai giá trị bằng nhau | gọi entries.push([id,1]) để thêm phần tử vào cuối mảng | gán map.keys bằng [id]
 q.load();assert.equal(q.ready(group+'_illusion').ready,false,'activation not replayed');entries.push([id,1]);map.keys=[id];q.advance(100);q.run(group+'_illusion');
// [VI dòng gốc 235] gán entries[0][1] bằng 2 | gọi q.advance(100) | gọi assert.equal(q.ready(group+'_illusion').ready, false, 'maximum native level') để kiểm tra hai giá trị bằng nhau | gán entries[0][1] bằng 1
 entries[0][1]=2;q.advance(100);assert.equal(q.ready(group+'_illusion').ready,false,'maximum native level');entries[0][1]=1;entries[0][2]=true;assert.equal(q.ready(group+'_illusion').ready,false,'timed forms not renewed');entries[0][2]=false;have=0;assert.equal(q.ready(group+'_illusion').ready,false,'material guard');q.W.KVPV_APPEARANCE_AUTO.stop();
// [VI dòng gốc 236] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 237] gọi console.log('PASS all six illusion groups: configured unopened IDs activate, exact RPCs, upgrade, reload ACK, timed and material gua…)
console.log('PASS all six illusion groups: configured unopened IDs activate, exact RPCs, upgrade, reload ACK, timed and material guards');
// [VI dòng gốc 238] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 239] Duyệt từng giá trị trong [false,true] bằng const pet. | Khai báo biến không gán lại bằng const: pet (chưa gán giá trị)
for(const pet of [false,true]){
// [VI dòng gốc 240] Khai báo biến không gán lại bằng const: q = gọi harness(); prefix = nếu pet thì lấy 'pet', ngược lại lấy 'mount'; sent = tạo mảng gồm 0 vị trí: []; model = tạo đối tượng gồm rank, bollZiDong, _bolZD, fd, refine, _ref, magicShow, mgcShow, huanhuaList, hhuaLst
 const q=harness(),prefix=pet?'pet':'mount',sent=[],model={rank:[11,0,[],[]],bollZiDong:false,_bolZD:false,fd:[5,0],refine:[[[0,2]]],_ref:[[[0,2]]],magicShow:[[]],mgcShow:[[]],huanhuaList:{keys:[],get:()=>null},hhuaLst:{keys:[],get:()=>null}};
// [VI dòng gốc 241] Khai báo biến không gán lại bằng const: rpc = tạo đối tượng gồm rankRide, rankPet, riseRideRefine, riseRefet, fdPet, magicLev, mgcLv, skillUp, addRideSkillLevel
 const rpc={rankRide:()=>sent.push('rank'),rankPet:()=>sent.push('rank'),riseRideRefine:a=>sent.push([...a]),riseRefet:a=>sent.push([...a]),fdPet:()=>sent.push('feed'),magicLev:id=>sent.push(id),mgcLv:id=>sent.push(id),skillUp:(...a)=>sent.push(a),addRideSkillLevel:(...a)=>sent.push(a)};
// [VI dòng gốc 242] Kiểm tra pet: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gán q.W._Ba._OJ bằng {_GJ:{inst:model},_VBn:{inst:rpc}} | gán q.W._ft._XZ bằng {ins:{getPetFeedCfgByLv:n=>n<=6?[n,100,[999,1,10]]:null}} | gán q.W.KVPV_V875 bằng {config:{autoFeed:true}}
 if(pet){q.W._Ba._OJ={_GJ:{inst:model},_VBn:{inst:rpc}};q.W._ft._XZ={ins:{getPetFeedCfgByLv:n=>n<=6?[n,100,[999,1,10]]:null}};q.W.KVPV_V875={config:{autoFeed:true}};}
// [VI dòng gốc 243] gán q.W._Ba._YJ bằng {_WJ:{ins:model},_bgt:{ins:rpc}}
 else q.W._Ba._YJ={_WJ:{ins:model},_bgt:{ins:rpc}};
// [VI dòng gốc 244] gán q.W._Ba._rJ._O$.ins.level bằng 502
 q.W._Ba._rJ._O$.ins.level=502;
// [VI dòng gốc 245] gán q.W._ft[pet?'_nqt':'_lDt'] bằng {ins:{getPetRankCfgBySt:n=>n<=12?[n,100,[999,1,10]]:null}}
 q.W._ft[pet?'_nqt':'_lDt']={ins:{getPetRankCfgBySt:n=>n<=12?[n,100,[999,1,10]]:null}};
// [VI dòng gốc 246] gán q.W._ft[pet?'_UZ':'_vqt'] bằng {ins:{getCfgByTypeAndLv:(t,n)=>n<=3?[n,0,[999,1],500]:null}}
 q.W._ft[pet?'_UZ':'_vqt']={ins:{getCfgByTypeAndLv:(t,n)=>n<=3?[n,0,[999,1],500]:null}};
// [VI dòng gốc 247] gọi q.run(prefix+'_rank') | gọi q.load() | gọi assert.equal(q.ready(prefix+'_rank').ready, false) để kiểm tra hai giá trị bằng nhau | gán model.rank[1] bằng 10
 q.run(prefix+'_rank');q.load();assert.equal(q.ready(prefix+'_rank').ready,false);model.rank[1]=10;q.advance(100);assert.equal(q.ready(prefix+'_rank').ready,true);
// [VI dòng gốc 248] gán model[pet?'_bolZD':'bollZiDong'] bằng true | gọi assert.equal(q.ready(prefix+'_rank').ready, false, 'paid auto-buy flag blocked') để kiểm tra hai giá trị bằng nhau | gán model[pet?'_bolZD':'bollZiDong'] bằng false
 model[pet?'_bolZD':'bollZiDong']=true;assert.equal(q.ready(prefix+'_rank').ready,false,'paid auto-buy flag blocked');model[pet?'_bolZD':'bollZiDong']=false;
// [VI dòng gốc 249] gọi q.run(prefix+'_refine_0') | gọi assert.deepEqual(sent.at(-1), [0,0]) để kiểm tra cấu trúc hai giá trị tương đương | gán (pet?model._ref:model.refine)[0][0][1] bằng 3 | gọi q.advance(100)
 q.run(prefix+'_refine_0');assert.deepEqual(sent.at(-1),[0,0]);(pet?model._ref:model.refine)[0][0][1]=3;q.advance(100);assert.equal(q.ready(prefix+'_refine_0').ready,false);
// [VI dòng gốc 250] Kiểm tra pet: đúng thì chạy nhánh sau if. | gọi q.run('pet') | gọi assert.equal(q.W.KVPV_V875.config.autoFeed, false) để kiểm tra hai giá trị bằng nhau | gán model.fd[1] bằng 10
 if(pet){q.run('pet');assert.equal(q.W.KVPV_V875.config.autoFeed,false);model.fd[1]=10;q.advance(100);}
// [VI dòng gốc 251] gán q.W._et bằng {getSvipLimit:()=>0} | gán q.W._Ba._ke bằng {_Le:{instance:{curSvipLv:0}}}
 q.W._et={getSvipLimit:()=>0};q.W._Ba._ke={_Le:{instance:{curSvipLv:0}}};
// [VI dòng gốc 252] Khai báo biến không gán lại bằng const: cfg = tạo đối tượng gồm getShowIds, getCfgByIdAndLv, getHuanhuaCfgByIdAndLev
 const cfg={getShowIds:()=>[7001],getCfgByIdAndLv:(id,n)=>n<=1?[n,0,[[999,1]]]:null,getHuanhuaCfgByIdAndLev:(id,n)=>n<=1?[n,0,[[999,1]]]:null};
// [VI dòng gốc 253] gán q.W._ft[pet?'_GZ':'_HZ'] bằng {ins:cfg} | gán q.W._ft[pet?'_FZ':'_RZ'] bằng {ins:cfg}
 q.W._ft[pet?'_GZ':'_HZ']={ins:cfg};q.W._ft[pet?'_FZ':'_RZ']={ins:cfg};
// [VI dòng gốc 254] gán q.W._Ba._ogt bằng {_Cqt:{inst:{riseMgcShow:a=>sent.push([...a]),riseRideMgcShow:a=>sent.push([...a])}}}
 q.W._Ba._ogt={_Cqt:{inst:{riseMgcShow:a=>sent.push([...a]),riseRideMgcShow:a=>sent.push([...a])}}};
// [VI dòng gốc 255] gọi q.run(prefix+'_illusion') | gọi assert.deepEqual(sent.at(-1), [7001]) để kiểm tra cấu trúc hai giá trị tương đương | gọi (pet?model.mgcShow:model.magicShow)[0].push([7001,1]) để thêm phần tử vào cuối mảng | gọi q.advance(100)
 q.run(prefix+'_illusion');assert.deepEqual(sent.at(-1),[7001]);(pet?model.mgcShow:model.magicShow)[0].push([7001,1]);q.advance(100);
// [VI dòng gốc 256] gọi q.run(prefix+'_formation') | gọi assert.equal(sent.at(-1), 7001) để kiểm tra hai giá trị bằng nhau | gán model[pet?'hhuaLst':'huanhuaList'] bằng {keys:[7001],get:()=>[7001,1]} | gọi q.advance(100)
 q.run(prefix+'_formation');assert.equal(sent.at(-1),7001);model[pet?'hhuaLst':'huanhuaList']={keys:[7001],get:()=>[7001,1]};q.advance(100);
// [VI dòng gốc 257] gọi assert.equal(q.ready(prefix+'_formation').ready, false, 'native max formation') để kiểm tra hai giá trị bằng nhau
 assert.equal(q.ready(prefix+'_formation').ready,false,'native max formation');
// [VI dòng gốc 258] Khai báo biến không gán lại bằng const: skills = tạo mảng gồm 1 vị trí: [[102,0,1]] | Kiểm tra pet: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gán model.upSkills bằng skills | gán model.rank[3] bằng skills
 const skills=[[102,0,1]];if(pet)model.upSkills=skills;else model.rank[3]=skills;
// [VI dòng gốc 259] gọi q.run(prefix+'_rank_skill') | gọi assert.deepEqual(sent.at(-1), [102,2]) để kiểm tra cấu trúc hai giá trị tương đương | gán skills[0][1] bằng 1 | gán skills[0][2] bằng 0
 q.run(prefix+'_rank_skill');assert.deepEqual(sent.at(-1),[102,2]);skills[0][1]=1;skills[0][2]=0;q.advance(100);
// [VI dòng gốc 260] gọi q.W.KVPV_APPEARANCE_AUTO.stop() để dừng bộ điều khiển và dọn tài nguyên | Kiểm tra pet: đúng thì chạy nhánh sau if. | gọi assert.equal(q.W.KVPV_V875.config.autoFeed, true, 'legacy restored only after ACK') để kiểm tra hai giá trị bằng nhau
 q.W.KVPV_APPEARANCE_AUTO.stop();if(pet)assert.equal(q.W.KVPV_V875.config.autoFeed,true,'legacy restored only after ACK');
// [VI dòng gốc 261] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 262] gọi console.log('PASS mount/pet: feed, rank EXP ACK, paid auto-buy guard, refine, illusion, formation and rank skills')
console.log('PASS mount/pet: feed, rank EXP ACK, paid auto-buy guard, refine, illusion, formation and rank skills');
// [VI dòng gốc 263] Dòng trống để tách các phần, không có lệnh thực thi.
