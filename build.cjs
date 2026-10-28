// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: Đóng gói nguồn theo thứ tự tên module, kiểm tra cú pháp và sinh FULL/bản vá/manifest. Nạp lại FULL đi qua nhánh cập nhật trực tiếp, giữ lõi Daily đã chạy. Mã build được tính từ nội dung nguồn, kể cả chú thích. [đóng chú thích]
/* Đóng gói nguồn theo thứ tự tên module, kiểm tra cú pháp và sinh FULL/bản vá/manifest. Nạp lại FULL đi qua nhánh cập nhật trực tiếp, giữ lõi Daily đã chạy. Mã build được tính từ nội dung nguồn, kể cả chú thích. */
// [VI dòng gốc 2] "use strict"
'use strict';
// [VI dòng gốc 3] Khai báo biến không gán lại bằng const: fs = gọi require('node:fs') để nạp module Node.js
const fs = require('node:fs');
// [VI dòng gốc 4] Khai báo biến không gán lại bằng const: path = gọi require('node:path') để nạp module Node.js
const path = require('node:path');
// [VI dòng gốc 5] Khai báo biến không gán lại bằng const: vm = gọi require('node:vm') để nạp module Node.js
const vm = require('node:vm');
// [VI dòng gốc 6] Khai báo biến không gán lại bằng const: crypto = gọi require('node:crypto') để nạp module Node.js
const crypto = require('node:crypto');
// [VI dòng gốc 7] Khai báo biến không gán lại bằng const: root = __dirname
const root = __dirname;
// [VI dòng gốc 8] Kiểm tra fs.existsSync(path.join(root,'.kvpv-live','maintenance.lock')) && process.env.KVPV_VERIFY_MAINTENANCE!=='1': đúng thì chạy nhánh sau if.
if (fs.existsSync(path.join(root,'.kvpv-live','maintenance.lock')) && process.env.KVPV_VERIFY_MAINTENANCE!=='1') {
// [VI dòng gốc 9] Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('MAINTENANCE: giữ bản đang chạy trong lúc dọn nguồn.')
  throw Error('MAINTENANCE: giữ bản đang chạy trong lúc dọn nguồn.');
// [VI dòng gốc 10] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 11] Khai báo biến không gán lại bằng const: modules = gọi fs.readdirSync(path.join(root, 'src')).filter(x => /^\d\d-.*\.js$/.test(x)).sort() để sắp xếp mảng tại chỗ
const modules = fs.readdirSync(path.join(root, 'src')).filter(x => /^\d\d-.*\.js$/.test(x)).sort();
// [VI dòng gốc 12] Khai báo biến không gán lại bằng const: prelude = gọi fs.readFileSync(path.join(root,'runtime-v1.js'), 'utf8') để đọc tệp đồng bộ
const prelude = fs.readFileSync(path.join(root,'runtime-v1.js'),'utf8');
// [VI dòng gốc 13] Khai báo biến không gán lại bằng const: sources = tạo đối tượng bằng Map()
const sources = new Map();
// [VI dòng gốc 14] Khai báo biến không gán lại bằng const: body = gọi modules.map(name => { const text=fs.readFileSync(path.join(root,'src',name),'utf8'); new vm.Script(text,{filename:name}); sources.set(name,text); return '// Source: src/'+name+'\n'…('\n')
const body = modules.map(name => {
// [VI dòng gốc 15] Khai báo biến không gán lại bằng const: text = gọi fs.readFileSync(path.join(root,'src',name), 'utf8') để đọc tệp đồng bộ
  const text=fs.readFileSync(path.join(root,'src',name),'utf8');
// [VI dòng gốc 16] tạo đối tượng bằng vm.Script(text, {filename:name})
  new vm.Script(text,{filename:name});
// [VI dòng gốc 17] gọi sources.set(name, text)
  sources.set(name,text);
// [VI dòng gốc 18] Kết thúc hàm hiện tại và trả về: tính biểu thức '// Source: src/'+name+'\n'+text.
  return '// Source: src/'+name+'\n'+text;
// [VI dòng gốc 19] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: }).join('\n');
}).join('\n');
// [VI dòng gốc 20] Khai báo biến không gán lại bằng const: controlsSchemaText = gọi fs.readFileSync(path.join(root,'windows-app/control-schema.json'), 'utf8') để đọc tệp đồng bộ
const controlsSchemaText=fs.readFileSync(path.join(root,'windows-app/control-schema.json'),'utf8');
// [VI dòng gốc 21] Khai báo biến không gán lại bằng const: buildId = gọi crypto.createHash('sha256').update('shared-installers-v2\n'+prelude+'\n'+body+'\n'+controlsSchemaText).digest('hex').slice(0, 12) để lấy một đoạn dữ liệu
const buildId=crypto.createHash('sha256').update('shared-installers-v2\n'+prelude+'\n'+body+'\n'+controlsSchemaText).digest('hex').slice(0,12);
// [VI dòng gốc 22] Khai báo biến không gán lại bằng const: moduleCatalog = gọi modules.map(file=>({file,apis:[...new Set([...sources.get(file).replace(/^\/\/ \[VI dòng gốc \d+\].*$/gm,'').matchAll(/(?:window|W)\…) để biến đổi từng phần tử
const moduleCatalog=modules.map(file=>({file,apis:[...new Set([...sources.get(file).replace(/^\/\/ \[VI dòng gốc \d+\].*$/gm,'').matchAll(/(?:window|W)\.(KVPV_[A-Z0-9_]+)\s*=/g)].map(m=>m[1]))]}));
// [VI dòng gốc 23] Khai báo biến không gán lại bằng const: metadata = gọi JSON.stringify({id:buildId,release:'1.0.0',recovery:'35-100-observed-ring',modules:moduleCatalog}) để chuyển giá trị thành chuỗi JSON
const metadata=JSON.stringify({id:buildId,release:'1.0.0',recovery:'35-100-observed-ring',modules:moduleCatalog});
// [VI dòng gốc 24] Khai báo biến không gán lại bằng const: liveModules = tạo mảng gồm 76 vị trí: [ "00-daily-clock.js", "00-manual-entry-policy.js", "00-spending-policy.js", "00-account-policy.js", "00-far-scope.js", "00-thienquan-scope.js", "00-combat-metrics.js", "00-skill-p…
const liveModules = [
// [VI dòng gốc 25] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng string. Đọc cùng dòng mở phía trên: "00-daily-clock.js",
  "00-daily-clock.js",
// [VI dòng gốc 26] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng string. Đọc cùng dòng mở phía trên: "00-manual-entry-policy.js",
  "00-manual-entry-policy.js",
  "00-material-reserve.js",
// [VI dòng gốc 27] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng string. Đọc cùng dòng mở phía trên: "00-spending-policy.js",
  "00-spending-policy.js",
// [VI dòng gốc 28] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng string. Đọc cùng dòng mở phía trên: "00-account-policy.js",
  "00-account-policy.js",
// [VI dòng gốc 29] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng string. Đọc cùng dòng mở phía trên: "00-far-scope.js",
  "00-far-scope.js",
// [VI dòng gốc 30] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng string. Đọc cùng dòng mở phía trên: "00-thienquan-scope.js",
  "00-thienquan-scope.js",
// [VI dòng gốc 31] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng string. Đọc cùng dòng mở phía trên: "00-combat-metrics.js",
  "00-combat-metrics.js",
  "00-skill1008-trial.js",
// [VI dòng gốc 32] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng string. Đọc cùng dòng mở phía trên: "00-skill-pacing.js",
  "00-skill-pacing.js",
  "00-territory-loot.js",
  "00-tq-basic-profile.js",
// [VI dòng gốc 33] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng string. Đọc cùng dòng mở phía trên: "01-parallel-actions.js",
  "01-parallel-actions.js",
// [VI dòng gốc 34] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng string. Đọc cùng dòng mở phía trên: "01-quest-priority.js",
  "01-quest-priority.js",
// [VI dòng gốc 35] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng string. Đọc cùng dòng mở phía trên: "02-scene.js",
  "02-scene.js",
// [VI dòng gốc 36] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng string. Đọc cùng dòng mở phía trên: "06-range.js",
  "06-range.js",
// [VI dòng gốc 37] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng string. Đọc cùng dòng mở phía trên: "08-range-evidence.js",
  "08-range-evidence.js",
// [VI dòng gốc 38] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng string. Đọc cùng dòng mở phía trên: "09-modes.js",
  "09-modes.js",
// [VI dòng gốc 39] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng string. Đọc cùng dòng mở phía trên: "10-experimental-boost.js",
  "10-experimental-boost.js",
// [VI dòng gốc 40] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng string. Đọc cùng dòng mở phía trên: "11-auto-tianquan.js",
  "11-auto-tianquan.js",
// [VI dòng gốc 41] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng string. Đọc cùng dòng mở phía trên: "12-basic-outside.js",
  "12-basic-outside.js",
// [VI dòng gốc 42] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng string. Đọc cùng dòng mở phía trên: "13-transform-skills.js",
  "13-transform-skills.js",
// [VI dòng gốc 43] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng string. Đọc cùng dòng mở phía trên: "14-eight-floor.js",
  "14-eight-floor.js",
// [VI dòng gốc 44] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng string. Đọc cùng dòng mở phía trên: "15-honor-targets.js",
  "15-honor-targets.js",
// [VI dòng gốc 45] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng string. Đọc cùng dòng mở phía trên: "16-strongest-team.js",
  "16-strongest-team.js",
// [VI dòng gốc 46] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng string. Đọc cùng dòng mở phía trên: "17-linh-lung-th.js",
  "17-linh-lung-th.js",
// [VI dòng gốc 47] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng string. Đọc cùng dòng mở phía trên: "18-supervisors.js",
  "18-supervisors.js",
// [VI dòng gốc 48] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng string. Đọc cùng dòng mở phía trên: "19-account-features.js",
  "19-account-features.js",
// [VI dòng gốc 49] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng string. Đọc cùng dòng mở phía trên: "20-daily-trial.js",
  "20-daily-trial.js",
// [VI dòng gốc 50] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng string. Đọc cùng dòng mở phía trên: "21-quick-use.js",
  "21-quick-use.js",
// [VI dòng gốc 51] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng string. Đọc cùng dòng mở phía trên: "22-confirm-popups.js",
  "22-confirm-popups.js",
// [VI dòng gốc 52] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng string. Đọc cùng dòng mở phía trên: "23-beast-island.js",
  "23-beast-island.js",
// [VI dòng gốc 53] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng string. Đọc cùng dòng mở phía trên: "24-summon-boss.js",
  "24-summon-boss.js",
// [VI dòng gốc 54] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng string. Đọc cùng dòng mở phía trên: "25-rune-boss.js",
  "25-rune-boss.js",
// [VI dòng gốc 55] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng string. Đọc cùng dòng mở phía trên: "26-fabao-fast.js",
  "26-fabao-fast.js",
// [VI dòng gốc 56] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng string. Đọc cùng dòng mở phía trên: "27-craft-low.js",
  "27-craft-low.js",
// [VI dòng gốc 57] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng string. Đọc cùng dòng mở phía trên: "28-appearance-auto.js",
  "28-appearance-auto.js",
// [VI dòng gốc 58] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng string. Đọc cùng dòng mở phía trên: "29-quest-goals.js",
  "29-quest-goals.js",
// [VI dòng gốc 59] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng string. Đọc cùng dòng mở phía trên: "30-tienvi-goals.js",
  "30-tienvi-goals.js",
// [VI dòng gốc 60] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng string. Đọc cùng dòng mở phía trên: "31-skill-rewards.js",
  "31-skill-rewards.js",
// [VI dòng gốc 61] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng string. Đọc cùng dòng mở phía trên: "33-progress-planner.js",
  "33-progress-planner.js",
// [VI dòng gốc 62] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng string. Đọc cùng dòng mở phía trên: "34-fabao-treasure.js",
  "34-fabao-treasure.js",
// [VI dòng gốc 63] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng string. Đọc cùng dòng mở phía trên: "35-equipment-treasure.js",
  "35-equipment-treasure.js",
// [VI dòng gốc 64] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng string. Đọc cùng dòng mở phía trên: "36-fast-actions.js",
  "36-fast-actions.js",
// [VI dòng gốc 65] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng string. Đọc cùng dòng mở phía trên: "37-reborn-goals.js",
  "37-reborn-goals.js",
// [VI dòng gốc 66] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng string. Đọc cùng dòng mở phía trên: "38-reborn-executors.js",
  "38-reborn-executors.js",
// [VI dòng gốc 67] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng string. Đọc cùng dòng mở phía trên: "39-executor-report.js",
  "39-executor-report.js",
// [VI dòng gốc 68] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng string. Đọc cùng dòng mở phía trên: "40-soul-stone-fast.js",
  "40-soul-stone-fast.js",
// [VI dòng gốc 69] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng string. Đọc cùng dòng mở phía trên: "41-season-rewards.js",
  "41-season-rewards.js",
// [VI dòng gốc 70] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng string. Đọc cùng dòng mở phía trên: "42-world-eye.js",
  "42-world-eye.js",
// [VI dòng gốc 71] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng string. Đọc cùng dòng mở phía trên: "43-context-brain.js",
  "43-context-brain.js",
// [VI dòng gốc 72] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng string. Đọc cùng dòng mở phía trên: "44-red-navigator.js",
  "44-red-navigator.js",
// [VI dòng gốc 73] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng string. Đọc cùng dòng mở phía trên: "72-bag-open-session.js",
  "72-bag-open-session.js",
// [VI dòng gốc 74] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng string. Đọc cùng dòng mở phía trên: "45-monster-plate.js",
  "45-monster-plate.js",
// [VI dòng gốc 75] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng string. Đọc cùng dòng mở phía trên: "46-team-coordinator.js",
  "46-team-coordinator.js",
// [VI dòng gốc 76] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng string. Đọc cùng dòng mở phía trên: "47-boss-team.js",
  "47-boss-team.js",
// [VI dòng gốc 77] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng string. Đọc cùng dòng mở phía trên: "48-guild-boss.js", "49-adventure.js", "50-companion-combat.js", "51-demon-king-recovery.js", "52-item-trace.js", "55-crystal-capture.js", "56-free-treasure.js", "57-free-daily-bag…
  "48-guild-boss.js", "49-adventure.js", "50-companion-combat.js", "51-demon-king-recovery.js", "52-item-trace.js", "55-crystal-capture.js", "56-free-treasure.js", "57-free-daily-bag.js", "58-idle-daily.js", "59-road-cadence.js", "60-quiz-auto.js", "61-peak-chest.js", "62-event-priority.js", "62-resume-stage.js", "63-peak-completion.js", "64-eight-chest.js", "65-marry-arena.js", "66-pet-travel.js", "67-login-streak.js", "68-festival-free.js", "69-marry-rewards.js", "70-four-worship.js", "71-kiem-khieu.js", "72-desktop-control.js", "73-frame-click.js", "74-tien-ton-native-auto.js", "75-pvp-luofeng.js", "76-trutien-pvp.js", "99-manual-entry.js", "99-z-pb-boss-daily.js"
// [VI dòng gốc 78] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
];
// [VI dòng gốc 79] Chú thích gốc của tác giả; không được thực thi. Nội dung: Cùng một trình tự dừng được dùng cho FULL và bản vá độc lập.
// Cùng một trình tự dừng được dùng cho FULL và bản vá độc lập.
// [VI dòng gốc 80] Nội dung nguyên văn của chuỗi mẫu; đây là dữ liệu trong chuỗi, không phải lệnh đang chạy.
const prepareUpdate = `
const W=window;
if(!W.KVPV_MODE||!W.KVPV_HITRUN_AUTO||!W.KVPV_RANGE281)throw Error("Load V1 first");
if(W._Ba?._rJ?._O$?.ins?.isDead===true)throw Error("Hồi sinh nhân vật trước khi chạy bản vá");
if(String(W.__KVPV_OWN_ACTOR_ID)!==String(W._Ba?._rJ?._O$?.ins?.actorId)||W.__KVPV_UNIVERSAL_HALTED)throw Error("Actor/session mismatch");
W.KVPV_BEAST_ISLAND?.stop?.();W.KVPV_STRONGEST_TEAM?.stop?.();W.KVPV_HONOR_TARGET?.stop?.();W.KVPV_EIGHT_FLOOR?.stop?.();W.KVPV_BASIC10?.stop?.();W.KVPV_STAND281?.stop?.();W.KVPV_MODE.stop("Install live SCAN update");
`;
// [VI dòng gốc 87] Duyệt từng giá trị trong liveModules bằng const name. | Khai báo biến không gán lại bằng const: name (chưa gán giá trị) | Kiểm tra !sources.has(name): đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('Missing live module: '+name)
for(const name of liveModules)if(!sources.has(name))throw Error('Missing live module: '+name);
// [VI dòng gốc 88] Khai báo biến không gán lại bằng const: patch = tính biểu thức '[mở chú thích] Paste into the existing game Console; no refresh required. [đóng chú thích]\n(() => {\n'+ prepareUpdate+'const __KVPV_V1_BUILD=Object.freeze('+metadata+');\n'+ liveModules.map(name=>sources.…
const patch='/* Paste into the existing game Console; no refresh required. */\n(() => {\n'+
// [VI dòng gốc 89] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng name. Đọc cùng dòng mở phía trên: prepareUpdate+'const __KVPV_V1_BUILD=Object.freeze('+metadata+');\n'+
  prepareUpdate+'const __KVPV_V1_BUILD=Object.freeze('+metadata+');\n'+
// [VI dòng gốc 90] Định nghĩa hàm hàm không đặt tên; tham số: name
  liveModules.map(name=>sources.get(name)).join('\n')+'\n})();\n';
// [VI dòng gốc 91] Chú thích gốc của tác giả; không được thực thi. Nội dung: Mỗi module có đúng một thân hàm trong FULL. Khởi tạo và cập nhật gọi lại cùng hàm.
// Mỗi module có đúng một thân hàm trong FULL. Khởi tạo và cập nhật gọi lại cùng hàm.
// [VI dòng gốc 92] Khai báo biến không gán lại bằng const: installerName = tạo hàm với tham số name; mỗi lần gọi trả về tính biểu thức '__KVPV_INSTALL_'+name.replace(/\W/g,'_')
const installerName = name => '__KVPV_INSTALL_'+name.replace(/\W/g,'_');
// [VI dòng gốc 93] Khai báo biến không gán lại bằng const: installers = gọi modules.map(name => 'function '+installerName(name)+'(){\n// Source: src/'+name+'\n'+sources.get(name)+'\n}').join('\n')
const installers = modules.map(name =>
// [VI dòng gốc 94] gọi installerName(name) | gọi sources.get(name)
  'function '+installerName(name)+'(){\n// Source: src/'+name+'\n'+sources.get(name)+'\n}').join('\n');
// [VI dòng gốc 95] Khai báo biến không gán lại bằng const: controlSchema = gọi require("./windows-app/control-schema.json") để nạp module Node.js
const controlSchema=require("./windows-app/control-schema.json");
// [VI dòng gốc 96] Khai báo biến không gán lại bằng const: controlInstallers = tính biểu thức "window.__KVPV_CONTROL_SCHEMA=Object.freeze("+JSON.stringify(controlSchema)+");window.__KVPV_CONTROL_INSTALLERS=Object.freeze({"+Object.keys(controlSchema).map(file=>JSON.stringify…
const controlInstallers="window.__KVPV_CONTROL_SCHEMA=Object.freeze("+JSON.stringify(controlSchema)+");window.__KVPV_CONTROL_INSTALLERS=Object.freeze({"+Object.keys(controlSchema).map(file=>JSON.stringify(file)+":"+installerName(file)).join(",")+"});\n";
// [VI dòng gốc 97] Khai báo biến không gán lại bằng const: initialCalls = tính biểu thức controlInstallers+modules.map(name=>installerName(name)+'();').join('\n')
const initialCalls = controlInstallers+modules.map(name=>installerName(name)+'();').join('\n');
// [VI dòng gốc 98] Khai báo biến không gán lại bằng const: updateCalls = tính biểu thức controlInstallers+liveModules.map(name=>installerName(name)+'();').join('\n')
const updateCalls = controlInstallers+liveModules.map(name=>installerName(name)+'();').join('\n');
// [VI dòng gốc 99] Chú thích gốc của tác giả; không được thực thi. Nội dung: FULL chạy lần nữa sẽ gọi bản vá; khóa nhân vật phải còn khớp phiên đã cài.
// FULL chạy lần nữa sẽ gọi bản vá; khóa nhân vật phải còn khớp phiên đã cài.
// [VI dòng gốc 100] Nội dung nguyên văn của chuỗi mẫu; đây là dữ liệu trong chuỗi, không phải lệnh đang chạy.
const reloadGuard = `
if (window.KVPV_V1) {
  const actor=String(window._Ba?._rJ?._O$?.ins?.actorId??'');
  if (!actor || actor!==String(window.__KVPV_OWN_ACTOR_ID??'') || window.__KVPV_UNIVERSAL_HALTED) {
    console.error('[KVPV V1] Reload blocked: actor changed or session halted.');return;
  }
  __KVPV_LIVE_UPDATE();return;
}
`;
// [VI dòng gốc 109] Khai báo biến không gán lại bằng const: bundle = tính biểu thức '[mở chú thích] KVPV V1 / 1.0.0 — generated by node build.cjs; edit src/, not this file. [đóng chú thích]\n(() => {\nconst __KVPV_V1_BUILD=Object.freeze('+metadata+');\n'+reloadGuard+prelude+'\nif (!__KVPV_…
const bundle = '/* KVPV V1 / 1.0.0 — generated by node build.cjs; edit src/, not this file. */\n(() => {\nconst __KVPV_V1_BUILD=Object.freeze('+metadata+');\n'+reloadGuard+prelude+'\nif (!__KVPV_V1_READY) return;\n'+initialCalls+'\n'+installers+'\nfunction __KVPV_LIVE_UPDATE(){\n'+prepareUpdate+updateCalls+'\n}\n})();\n';
// [VI dòng gốc 110] tạo đối tượng bằng vm.Script(bundle, {filename:'KVPV_V1_FULL.js'})
new vm.Script(bundle,{filename:'KVPV_V1_FULL.js'});
// [VI dòng gốc 111] gọi fs.writeFileSync(path.join(root,'KVPV_V1_FULL.js'), bundle) để ghi tệp đồng bộ
fs.writeFileSync(path.join(root,'KVPV_V1_FULL.js'),bundle);
fs.writeFileSync(path.join(root,'KVPV_PB_BOSS_DAILY.js'),bundle);
// [VI dòng gốc 112] tạo đối tượng bằng vm.Script(patch, {filename:'KVPV_SCAN_LIVE_PATCH.js'})
new vm.Script(patch,{filename:'KVPV_SCAN_LIVE_PATCH.js'});
// [VI dòng gốc 113] gọi fs.writeFileSync(path.join(root,'KVPV_SCAN_LIVE_PATCH.js'), patch) để ghi tệp đồng bộ
fs.writeFileSync(path.join(root,'KVPV_SCAN_LIVE_PATCH.js'),patch);
// [VI dòng gốc 114] Chú thích gốc của tác giả; không được thực thi. Nội dung: Manifest ghi danh sách module và hàm băm của đúng FULL vừa sinh để kiểm tra bản sao.
// Manifest ghi danh sách module và hàm băm của đúng FULL vừa sinh để kiểm tra bản sao.
// [VI dòng gốc 115] gọi fs.writeFileSync(path.join(root,'MANIFEST.json'), JSON.stringify({version:'1.0.0',buildId,file:'KVPV_V1_FULL.js',sha256:crypto.createHash…) để ghi tệp đồng bộ
fs.writeFileSync(path.join(root,'MANIFEST.json'),JSON.stringify({version:'1.0.0',buildId,file:'KVPV_V1_FULL.js',sha256:crypto.createHash('sha256').update(bundle).digest('hex'),modules,liveModules},null,2)+'\n');
// [VI dòng gốc 116] gọi console.log('Built V1 '+buildId+': '+modules.length+' modules; syntax OK.')
console.log('Built V1 '+buildId+': '+modules.length+' modules; syntax OK.');
// [VI dòng gốc 117] gọi require('./build-edge-addon.cjs') để nạp module Node.js
require('./build-edge-addon.cjs');
// [VI dòng gốc 118] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 119] gọi require('./build-android.cjs') để nạp module Node.js
require('./build-android.cjs');
// [VI dòng gốc 120] Dòng trống để tách các phần, không có lệnh thực thi.
