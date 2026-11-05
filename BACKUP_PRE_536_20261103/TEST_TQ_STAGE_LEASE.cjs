// [VI dòng gốc 1] "use strict"
'use strict';
// [VI dòng gốc 2] Khai báo biến không gán lại bằng const: fs = gọi require('fs') để nạp module Node.js; vm = gọi require('vm') để nạp module Node.js; assert = gọi require('assert/strict') để nạp module Node.js; src = gọi fs.readFileSync('src/04-engine.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm, '')
const fs=require('fs'),vm=require('vm'),assert=require('assert/strict'),src=fs.readFileSync('src/04-engine.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,'');
// [VI dòng gốc 3] Khai báo biến không gán lại bằng const: a = gọi src.indexOf(' function tuVuotObserve()'); b = gọi src.indexOf(' function tuVuotIdle()', a); code = tính biểu thức src.slice(a,b)+';tuVuotObserve();'
const a=src.indexOf('  function tuVuotObserve()'),b=src.indexOf('  function tuVuotIdle()',a),code=src.slice(a,b)+';tuVuotObserve();';
// [VI dòng gốc 4] Định nghĩa hàm run; tham số: kind, inside, lease | Khai báo biến không gán lại bằng const: calls = tạo mảng gồm 0 vị trí: []; m = tạo đối tượng gồm auto | Khai báo biến không gán lại bằng const: window = tạo đối tượng gồm KVPV_FAR_SCOPE, KVPV
function run(kind,inside,lease){const calls=[],m={auto:true};const window={KVPV_FAR_SCOPE:{status:()=>({kind,inside})},KVPV:{core:{scene:{status:()=>lease,release:k=>calls.push(['release',k]),renew:k=>calls.push(['renew',k])}}}};
// [VI dòng gốc 5] gọi vm.runInNewContext(code, {window,C:{enableTuVuot:true},tuVuot:{run:null},tvData:()=>({m,valid:false}),now:()=>0,job:null,common:()=>true,tv…) để chạy mã trong ngữ cảnh máy ảo dùng cho kiểm thử | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('unexpected auto disable') | gọi assert.equal(m.auto, true) để kiểm tra hai giá trị bằng nhau | Kết thúc hàm hiện tại và trả về: calls.
 vm.runInNewContext(code,{window,C:{enableTuVuot:true},tuVuot:{run:null},tvData:()=>({m,valid:false}),now:()=>0,job:null,common:()=>true,tvDisable(){throw Error('unexpected auto disable');}});assert.equal(m.auto,true);return calls;}
// [VI dòng gốc 6] gọi assert.deepEqual(run('THIEN_QUAN',true,{owner:'stage',tag:'tu-vuot'}), [['release','stage']]) để kiểm tra cấu trúc hai giá trị tương đương
assert.deepEqual(run('THIEN_QUAN',true,{owner:'stage',tag:'tu-vuot'}),[['release','stage']]);
// [VI dòng gốc 7] Duyệt từng giá trị trong [{owner:'combat',tag:'hitrun'},{owner:'stage',tag:'foreign'},{owner:'daily',tag:'dungeon'}] bằng const lease. | Khai báo biến không gán lại bằng const: lease (chưa gán giá trị) | gọi assert.deepEqual(run('THIEN_QUAN',true,lease), []) để kiểm tra cấu trúc hai giá trị tương đương
for(const lease of [{owner:'combat',tag:'hitrun'},{owner:'stage',tag:'foreign'},{owner:'daily',tag:'dungeon'}])assert.deepEqual(run('THIEN_QUAN',true,lease),[]);
// [VI dòng gốc 8] gọi assert.deepEqual(run('OUTSIDE',false,{owner:'stage',tag:'tu-vuot'}), [['renew','stage']]) để kiểm tra cấu trúc hai giá trị tương đương
assert.deepEqual(run('OUTSIDE',false,{owner:'stage',tag:'tu-vuot'}),[['renew','stage']]);
// [VI dòng gốc 9] gọi assert.deepEqual(run('LINH_LUNG',true,{owner:'stage',tag:'tu-vuot'}), [['renew','stage']]) để kiểm tra cấu trúc hai giá trị tương đương
assert.deepEqual(run('LINH_LUNG',true,{owner:'stage',tag:'tu-vuot'}),[['renew','stage']]);
// [VI dòng gốc 10] gọi console.log('PASS Tian Quan stage lease: training/entry renews; verified fight releases only own tu-vuot lease; native auto/ACK and …)
console.log('PASS Tian Quan stage lease: training/entry renews; verified fight releases only own tu-vuot lease; native auto/ACK and foreign leases preserved');
// [VI dòng gốc 11] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 12] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng {. Đọc cùng dòng mở phía trên: {
{
// [VI dòng gốc 13] Khai báo biến có thể gán lại bằng let: inside = false | Khai báo biến không gán lại bằng const: Ba = tạo đối tượng gồm _Co, _$a; Ft = tạo đối tượng gồm _h$
 let inside=false;const Ba={_Co:{_Mo:{ins:{auto:true,curLv:1}}},_$a:{_yo:{ins:{intoSce:[100]}},SceneUtil:{isCommonScene:true}}},Ft={_h$:{ins:{getCfgByLv:()=>[100]}}};
// [VI dòng gốc 14] Khai báo biến không gán lại bằng const: W = tạo đối tượng gồm KVPV_FAR_SCOPE, KVPV_MODE, KVPV_DAILY
 const W={KVPV_FAR_SCOPE:{status:()=>({kind:inside?'THIEN_QUAN':'OUTSIDE',inside}),inside:()=>inside},KVPV_MODE:{status:()=>({pendingTianQuanMode:'BOSS_TH300_SCAN'})},KVPV_DAILY:{quickState:()=>({job:'rảnh'})}};
// [VI dòng gốc 15] gọi vm.runInNewContext(fs.readFileSync('src/02-scene.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,''), {window:W,_Ba:Ba,_ft:Ft}) để chạy mã trong ngữ cảnh máy ảo dùng cho kiểm thử
 vm.runInNewContext(fs.readFileSync('src/02-scene.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,''),{window:W,_Ba:Ba,_ft:Ft});
// [VI dòng gốc 16] Khai báo biến không gán lại bằng const: gate = đọc W.KVPV.core.scene | gọi assert(gate.acquire('stage','tu-vuot')) để kiểm tra điều kiện của bài test | gán inside bằng true | gán Ba._$a.SceneUtil.isCommonScene bằng false
 const gate=W.KVPV.core.scene;assert(gate.acquire('stage','tu-vuot'));inside=true;Ba._$a.SceneUtil.isCommonScene=false;
// [VI dòng gốc 17] gọi assert(gate.can('combat'), 'hot-update core yields prior stage entry lease') để kiểm tra điều kiện của bài test | gọi assert.equal(gate.status().owner, null) để kiểm tra hai giá trị bằng nhau | gọi assert(gate.acquire('combat','hitrun')) để kiểm tra điều kiện của bài test
 assert(gate.can('combat'),'hot-update core yields prior stage entry lease');assert.equal(gate.status().owner,null);assert(gate.acquire('combat','hitrun'));
// [VI dòng gốc 18] gọi assert.equal(gate.renew('stage'), false) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(gate.status().owner, 'combat') để kiểm tra hai giá trị bằng nhau
 assert.equal(gate.renew('stage'),false);assert.equal(gate.status().owner,'combat');
// [VI dòng gốc 19] gọi gate.release('combat') để nhả quyền điều khiển đang giữ | gán inside bằng false | gọi assert(gate.acquire('stage','foreign')) để kiểm tra điều kiện của bài test | gán inside bằng true
 gate.release('combat');inside=false;assert(gate.acquire('stage','foreign'));inside=true;assert.equal(gate.can('combat'),false);assert.equal(gate.status().tag,'foreign');
// [VI dòng gốc 20] gọi gate.release('stage') để nhả quyền điều khiển đang giữ | gán inside bằng false | gọi assert(gate.acquire('stage','tu-vuot')) để kiểm tra điều kiện của bài test | gán inside bằng true
 gate.release('stage');inside=false;assert(gate.acquire('stage','tu-vuot'));inside=true;assert.equal(gate.renew('stage'),false);assert.equal(gate.status().owner,null);
// [VI dòng gốc 21] gọi console.log('PASS live core handoff: old Daily closure renewal cannot starve combat; foreign lease preserved')
 console.log('PASS live core handoff: old Daily closure renewal cannot starve combat; foreign lease preserved');
// [VI dòng gốc 22] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 23] Dòng trống để tách các phần, không có lệnh thực thi.
