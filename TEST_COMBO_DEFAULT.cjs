// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: Kiểm thử mô phỏng: COMBO_DEFAULT. Các assert bên dưới ghi điều kiện phải giữ; không chứng minh máy chủ game chấp nhận tốc độ hoặc tầm đánh. [đóng chú thích]
/* Kiểm thử mô phỏng: COMBO_DEFAULT. Các assert bên dưới ghi điều kiện phải giữ; không chứng minh máy chủ game chấp nhận tốc độ hoặc tầm đánh. */
// [VI dòng gốc 2] "use strict"
'use strict';
// [VI dòng gốc 3] Khai báo biến không gán lại bằng const: fs = gọi require('node:fs') để nạp module Node.js; assert = gọi require('node:assert/strict') để nạp module Node.js
const fs=require('node:fs'),assert=require('node:assert/strict');
// [VI dòng gốc 4] Khai báo biến không gán lại bằng const: source = gọi fs.readFileSync(__dirname+'/KVPV_V1_FULL.js', 'utf8') để đọc tệp đồng bộ
const source=fs.readFileSync(__dirname+'/KVPV_V1_FULL.js','utf8');
// [VI dòng gốc 5] Khai báo biến không gán lại bằng const: nativeSource = đọc source.split('// Source: src/10-experimental-boost.js')[0]
const nativeSource=source.split('// Source: src/10-experimental-boost.js')[0];
// [VI dòng gốc 6] Khai báo biến không gán lại bằng const: trialStart = gọi nativeSource.indexOf(" const speedKey='__KVPV_BASIC_SPEED_TRIAL_99_REPEAT1_20261025'"); trialEnd = gọi nativeSource.indexOf(' function onNativeCast(', trialStart)
const trialStart=nativeSource.indexOf("  const speedKey='__KVPV_BASIC_SPEED_TRIAL_99_REPEAT1_20261025'"),trialEnd=nativeSource.indexOf('  function onNativeCast(',trialStart);
// [VI dòng gốc 7] gọi assert(trialStart>0&&trialEnd>trialStart) để kiểm tra điều kiện của bài test
assert(trialStart>0&&trialEnd>trialStart);
// [VI dòng gốc 8] Khai báo biến không gán lại bằng const: speedTrialSource = gọi nativeSource.slice(trialStart, trialEnd) để lấy một đoạn dữ liệu; defaultNativeSource = tính biểu thức nativeSource.slice(0,trialStart)+nativeSource.slice(trialEnd)
const speedTrialSource=nativeSource.slice(trialStart,trialEnd),defaultNativeSource=nativeSource.slice(0,trialStart)+nativeSource.slice(trialEnd);
// [VI dòng gốc 9] Khai báo biến không gán lại bằng const: manifest = gọi JSON.parse(fs.readFileSync(__dirname+'/MANIFEST.json','utf8')) để phân tích dữ liệu đầu vào theo API đang gọi
const manifest=JSON.parse(fs.readFileSync(__dirname+'/MANIFEST.json','utf8'));
// [VI dòng gốc 10] Khai báo biến có thể gán lại bằng let: passed = 0
let passed=0;
// [VI dòng gốc 11] Định nghĩa hàm test; tham số: name, fn | gọi fn() | tăng passed một đơn vị sau khi lấy giá trị | gọi console.log('PASS', name)
function test(name,fn){fn();passed++;console.log('PASS',name);}
// [VI dòng gốc 12] gọi test('all attack modifier modules excluded from bundle and manifest', ()=>{ for(const token of ['KVPV_COMBAT_ALL','KVPV_COMBO…)
test('all attack modifier modules excluded from bundle and manifest',()=>{
// [VI dòng gốc 13] Duyệt từng giá trị trong ['KVPV_COMBAT_ALL','KVPV_COMBO317','KVPV_COMBO316','KVPV_COMBO91','KVPV_MAIN315','KVPV_COMPANION39','KVPV_COMPANION40','KVPV_COMPANION41','KVPV_COMPANION42','KVPV_RIDE_CLOAK40','KV… bằng const token. | Khai báo biến không gán lại bằng const: token (chưa gán giá trị) | gọi assert.equal(source.includes(token), false, token) để kiểm tra hai giá trị bằng nhau
 for(const token of ['KVPV_COMBAT_ALL','KVPV_COMBO317','KVPV_COMBO316','KVPV_COMBO91','KVPV_MAIN315','KVPV_COMPANION39','KVPV_COMPANION40','KVPV_COMPANION41','KVPV_COMPANION42','KVPV_RIDE_CLOAK40','KVPV_RIDE_CLOAK41','KVPV_TUYETHOC44','KVPV_TUYETHOC45','KVPV_NGUTHU46'])assert.equal(source.includes(token),false,token);
// [VI dòng gốc 14] gọi assert(manifest.modules.every(name=>!name.includes('attack-modifiers'))) để kiểm tra điều kiện của bài test
 assert(manifest.modules.every(name=>!name.includes('attack-modifiers')));
// [VI dòng gốc 15] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 16] gọi test('main combat keeps native cooldown and animation; experimental boost stays isolated', ()=>{ for(const pattern of [/\.isC…)
test('main combat keeps native cooldown and animation; experimental boost stays isolated',()=>{
// [VI dòng gốc 17] Duyệt từng giá trị trong [/\.isCooldown\s*=/,/(hook|install)\([^\n]*['"]isCooldown['"]/,/\bvirtualReady\b/,/\blocalNext\b/,/\bsetBasic\b/,/\bsetParallel\b/,/\bsetCompanion\b/,/\bsetMaThanAuto\b/,/\bsetSpee… bằng const pattern. | Khai báo biến không gán lại bằng const: pattern (chưa gán giá trị) | gọi assert.equal(pattern.test(nativeSource), false, String(pattern)) để kiểm tra hai giá trị bằng nhau
 for(const pattern of [/\.isCooldown\s*=/,/(hook|install)\([^\n]*['"]isCooldown['"]/,/\bvirtualReady\b/,/\blocalNext\b/,/\bsetBasic\b/,/\bsetParallel\b/,/\bsetCompanion\b/,/\bsetMaThanAuto\b/,/\bsetSpeed\b/,/\.speed\s*=/,/_Tet\s*=/,/\.combat\s*\(\s*800[1-9]\s*\)/])assert.equal(pattern.test(nativeSource),false,String(pattern));
// [VI dòng gốc 18] gọi assert.equal(/\btimeScale\b/.test(defaultNativeSource), false, 'animation scaling is isolated to the explicit bounded trial') để kiểm tra hai giá trị bằng nhau
 assert.equal(/\btimeScale\b/.test(defaultNativeSource),false,'animation scaling is isolated to the explicit bounded trial');
// [VI dòng gốc 19] Duyệt từng giá trị trong ['multiplier!==9&&multiplier!==99','phaseMs:5000','deadline:Date.now()+60000','Math.min(factor,before*factor)',"t?.state==='accelerated'",'Number(args[0])!==8001','self.owner!==dis… bằng const token. | Khai báo biến không gán lại bằng const: token (chưa gán giá trị) | gọi assert(speedTrialSource.includes(token), token) để kiểm tra điều kiện của bài test
 for(const token of ['multiplier!==9&&multiplier!==99','phaseMs:5000','deadline:Date.now()+60000','Math.min(factor,before*factor)',"t?.state==='accelerated'",'Number(args[0])!==8001','self.owner!==dispatch.actor','clip.timeScale=s.before','avatar.getActionTween=original'])assert(speedTrialSource.includes(token),token);
// [VI dòng gốc 20] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 21] gọi test('Boss safety and native-only optional TH selectors remain available', ()=>{ assert(source.includes('W.KVPV_HITRUN1=api;'…)
test('Boss safety and native-only optional TH selectors remain available',()=>{
// [VI dòng gốc 22] gọi assert(source.includes('W.KVPV_HITRUN1=api;')) để kiểm tra điều kiện của bài test
 assert(source.includes('W.KVPV_HITRUN1=api;'));
// [VI dòng gốc 23] gọi assert(source.includes('W.KVPV_MODE=api;')) để kiểm tra điều kiện của bài test
 assert(source.includes('W.KVPV_MODE=api;'));
// [VI dòng gốc 24] Duyệt từng giá trị trong ['07-tuyet-hoc.js','08-range-evidence.js'] bằng const file. | Khai báo biến không gán lại bằng const: file (chưa gán giá trị)
 for(const file of ['07-tuyet-hoc.js','08-range-evidence.js']){
// [VI dòng gốc 25] Khai báo biến không gán lại bằng const: code = gọi fs.readFileSync(__dirname+'/src/'+file,'utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm, '')
  const code=fs.readFileSync(__dirname+'/src/'+file,'utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,'');
// [VI dòng gốc 26] gọi assert(code.includes('native.call(this,')) để kiểm tra điều kiện của bài test
  assert(code.includes('native.call(this,'));
// [VI dòng gốc 27] Chú thích gốc của tác giả; không được thực thi. Nội dung: Filtering may restrict skill IDs but must never rewrite native cooldown rows.
  // Filtering may restrict skill IDs but must never rewrite native cooldown rows.
// [VI dòng gốc 28] gọi assert.equal(/\b(row|r|x)\s*\[\s*[12]\s*\]\s*=/.test(code), false) để kiểm tra hai giá trị bằng nhau
  assert.equal(/\b(row|r|x)\s*\[\s*[12]\s*\]\s*=/.test(code),false);
// [VI dòng gốc 29] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
 }
// [VI dòng gốc 30] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
});
// [VI dòng gốc 31] gọi console.log('PASSED', passed+'/3')
console.log('PASSED',passed+'/3');
// [VI dòng gốc 32] Dòng trống để tách các phần, không có lệnh thực thi.
