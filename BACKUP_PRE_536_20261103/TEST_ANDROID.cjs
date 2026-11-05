// [VI dòng gốc 1] "use strict"
'use strict';
// [VI dòng gốc 2] Khai báo biến không gán lại bằng const: fs = gọi require('node:fs') để nạp module Node.js; vm = gọi require('node:vm') để nạp module Node.js; assert = gọi require('node:assert/strict') để nạp module Node.js
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
// [VI dòng gốc 3] Khai báo biến không gán lại bằng const: {probe} = gọi require('./live/core.cjs') để nạp module Node.js
const {probe}=require('./live/core.cjs');
// [VI dòng gốc 4] Khai báo biến không gán lại bằng const: loader = gọi fs.readFileSync(__dirname+'/android/loader.js','utf8').replace('[mở chú thích] BUILD_ID [đóng chú thích]','"test-build"') .replace('[mở chú thích] READINESS [đóng chú thích]',probe).replace('[mở chú thích] FULL_BUNDLE [đóng chú thích]', 'window.installs=(window.installs||0)+1;window.KVPV_V1={};')
const loader=fs.readFileSync(__dirname+'/android/loader.js','utf8').replace('/* BUILD_ID */','"test-build"')
// [VI dòng gốc 5] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng .. Đọc cùng dòng mở phía trên: .replace('[mở chú thích] READINESS [đóng chú thích]',probe).replace('[mở chú thích] FULL_BUNDLE [đóng chú thích]','window.installs=(window.installs||0)+1;window.KVPV_V1={};');
  .replace('/* READINESS */',probe).replace('/* FULL_BUNDLE */','window.installs=(window.installs||0)+1;window.KVPV_V1={};');
// [VI dòng gốc 6] Định nghĩa hàm setup; tham số: url='https://play.choingay.vn/1046', referrer=''
function setup(url='https://play.choingay.vn/1046',referrer=''){
// [VI dòng gốc 7] Khai báo biến có thể gán lại bằng let: now = 0 | Khai báo biến không gán lại bằng const: timers = tạo đối tượng bằng Map(); listeners = tạo mảng gồm 0 vị trí: [] | Khai báo biến có thể gán lại bằng let: serial = 0
  let now=0;const timers=new Map(),listeners=[];let serial=0;
// [VI dòng gốc 8] Khai báo biến không gán lại bằng const: W = tạo đối tượng gồm location, setInterval, clearInterval | gọi timers.set(++serial, fn) | Kết thúc hàm hiện tại và trả về: serial. | gọi timers.delete(id)
  const W={location:{href:url},setInterval(fn){timers.set(++serial,fn);return serial;},clearInterval(id){timers.delete(id);}};
// [VI dòng gốc 9] gán W.parent bằng W | gán W.frames bằng [] | gán W.addEventListener bằng (name,fn)=>{if(name==='message')listeners.push(fn);} | Kiểm tra name==='message': đúng thì chạy nhánh sau if.
  W.parent=W;W.frames=[];W.addEventListener=(name,fn)=>{if(name==='message')listeners.push(fn);};
// [VI dòng gốc 10] Định nghĩa lớp Clock kế thừa Date. | Kết thúc hàm hiện tại và trả về: now.
  class Clock extends Date{static now(){return now;}}
// [VI dòng gốc 11] Khai báo biến không gán lại bằng const: document = tạo đối tượng gồm referrer
  const document={referrer};
// [VI dòng gốc 12] Khai báo biến không gán lại bằng const: ctx = tạo đối tượng gồm window, location, document, URL, Date, console
  const ctx={window:W,location:W.location,document,URL,Date:Clock,console:{error(){},info(){}}};
// [VI dòng gốc 13] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm W, timers, document, message, load, tick, advance, ready. | Duyệt từng giá trị trong listeners bằng const fn. | Khai báo biến không gán lại bằng const: fn (chưa gán giá trị) | gọi fn({source,data})
  return {W,timers,document,message(source,data){for(const fn of listeners)fn({source,data});},load(){vm.runInNewContext(loader,ctx);},tick(){for(const f of timers.values())f();},
// [VI dòng gốc 14] cập nhật bằng toán tử += now bằng ms | gán W._Ba bằng {_rJ:{_O$:{ins:{actorId:'123456',isDead:false}}}} | gán W._ft bằng {} | gán W._Sa bằng {}
    advance(ms){now+=ms;},ready(){W._Ba={_rJ:{_O$:{ins:{actorId:'123456',isDead:false}}}};W._ft={};W._Sa={};
// [VI dòng gốc 15] gán W._d bằng {_Yct:{_Eet:1,_Het:2,_zet:3}} | gán W._C bằng {_Ba:{instance:{getRole:()=>({getComponent:()=>({})})}}}
      W._d={_Yct:{_Eet:1,_Het:2,_zet:3}};W._C={_Ba:{instance:{getRole:()=>({getComponent:()=>({})})}}};}};
// [VI dòng gốc 16] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 17] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng {. Đọc cùng dòng mở phía trên: {
{
// [VI dòng gốc 18] Khai báo biến không gán lại bằng const: q = gọi setup() | gọi q.load() | gọi assert.equal(q.W.installs, undefined) để kiểm tra hai giá trị bằng nhau | gọi q.ready()
 const q=setup();q.load();assert.equal(q.W.installs,undefined);q.ready();q.tick();
// [VI dòng gốc 19] gọi assert.equal(q.W.installs, 1) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.timers.size, 0) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.W.__KVPV_ANDROID_LOADER.state, 'loaded') để kiểm tra hai giá trị bằng nhau
 assert.equal(q.W.installs,1);assert.equal(q.timers.size,0);assert.equal(q.W.__KVPV_ANDROID_LOADER.state,'loaded');
// [VI dòng gốc 20] gọi q.load() | gọi assert.equal(q.W.installs, 1) để kiểm tra hai giá trị bằng nhau
 q.load();assert.equal(q.W.installs,1);
// [VI dòng gốc 21] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 22] Duyệt từng giá trị trong ['https://example.com/','https://play.choingay.vn/10460','https://play.choingay.vn.evil.com/1046'] bằng const url. | Khai báo biến không gán lại bằng const: url (chưa gán giá trị)
for(const url of ['https://example.com/','https://play.choingay.vn/10460','https://play.choingay.vn.evil.com/1046']){
// [VI dòng gốc 23] Khai báo biến không gán lại bằng const: q = gọi setup(url) | gọi q.ready() | gọi q.load() | gọi assert.equal(q.W.installs, undefined) để kiểm tra hai giá trị bằng nhau
 const q=setup(url);q.ready();q.load();assert.equal(q.W.installs,undefined);assert.equal(q.timers.size,0);
// [VI dòng gốc 24] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 25] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng {. Đọc cùng dòng mở phía trên: {
{
// [VI dòng gốc 26] Khai báo biến không gán lại bằng const: q = gọi setup('https://game.example/frame', 'https://play.choingay.vn/1046?platform=pc') | gọi q.ready() | gọi q.load() | gọi assert.equal(q.W.installs, 1) để kiểm tra hai giá trị bằng nhau
 const q=setup('https://game.example/frame','https://play.choingay.vn/1046?platform=pc');q.ready();q.load();assert.equal(q.W.installs,1);
// [VI dòng gốc 27] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 28] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng {. Đọc cùng dòng mở phía trên: {
{
// [VI dòng gốc 29] Khai báo biến không gán lại bằng const: q = gọi setup() | gọi q.ready() | gán q.W._Ba._rJ._O$.ins.isDead bằng true | gọi q.load()
 const q=setup();q.ready();q.W._Ba._rJ._O$.ins.isDead=true;q.load();assert.equal(q.W.installs,undefined);
// [VI dòng gốc 30] gán q.W._Ba._rJ._O$.ins.isDead bằng false | gọi q.tick() để xử lý một nhịp kiểm tra | gọi assert.equal(q.W.installs, 1) để kiểm tra hai giá trị bằng nhau
 q.W._Ba._rJ._O$.ins.isDead=false;q.tick();assert.equal(q.W.installs,1);
// [VI dòng gốc 31] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 32] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng {. Đọc cùng dòng mở phía trên: {
{
// [VI dòng gốc 33] Khai báo biến không gán lại bằng const: q = gọi setup() | gọi q.load() | gọi q.advance(600001) | gọi q.tick() để xử lý một nhịp kiểm tra
 const q=setup();q.load();q.advance(600001);q.tick();assert.equal(q.timers.size,0);assert.equal(q.W.__KVPV_ANDROID_LOADER.state,'timeout');
// [VI dòng gốc 34] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 35] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng {. Đọc cùng dòng mở phía trên: {
{
// [VI dòng gốc 36] Khai báo biến không gán lại bằng const: q = gọi setup() | gọi q.ready() | gán q.W.KVPV_V1 bằng {} | gán q.W.__KVPV_OWN_ACTOR_ID bằng '999999'
 const q=setup();q.ready();q.W.KVPV_V1={};q.W.__KVPV_OWN_ACTOR_ID='999999';q.load();q.tick();assert.equal(q.W.installs,undefined);
// [VI dòng gốc 37] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 38] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng {. Đọc cùng dòng mở phía trên: {
{
// [VI dòng gốc 39] Khai báo biến không gán lại bằng const: q = gọi setup('https://game.example/frame', 'https://play.choingay.vn/')
 const q=setup('https://game.example/frame','https://play.choingay.vn/');
// [VI dòng gốc 40] gán q.W.parent bằng {} | gọi q.ready() | gọi q.load() | gọi assert.equal(q.W.installs, 1, 'origin-only cross-frame referrer') để kiểm tra hai giá trị bằng nhau
 q.W.parent={};q.ready();q.load();assert.equal(q.W.installs,1,'origin-only cross-frame referrer');
// [VI dòng gốc 41] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 42] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 43] Chú thích gốc của tác giả; không được thực thi. Nội dung: Nested cross-origin iframe with an empty referrer: parent-only scope relay.
// Nested cross-origin iframe with an empty referrer: parent-only scope relay.
// [VI dòng gốc 44] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng {. Đọc cùng dòng mở phía trên: {
{
// [VI dòng gốc 45] Khai báo biến không gán lại bằng const: root = gọi setup(); middle = gọi setup('https://launcher.example/start', ''); game = gọi setup('https://engine.example/game', '')
 const root=setup(),middle=setup('https://launcher.example/start',''),game=setup('https://engine.example/game','');
// [VI dòng gốc 46] Khai báo biến không gán lại bằng const: deniedLocation = tạo hàm với tham số (không có) | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('cross-origin')
 const deniedLocation=()=>{throw Error('cross-origin');};
// [VI dòng gốc 47] Khai báo biến không gán lại bằng const: rootProxy = tạo đối tượng gồm postMessage
 const rootProxy={postMessage:data=>root.message(middle.W,data)};
// [VI dòng gốc 48] gọi Object.defineProperty(rootProxy, 'location', {get:deniedLocation})
 Object.defineProperty(rootProxy,'location',{get:deniedLocation});
// [VI dòng gốc 49] Khai báo biến không gán lại bằng const: middleProxy = tạo đối tượng gồm postMessage
 const middleProxy={postMessage:data=>middle.message(game.W,data)};
// [VI dòng gốc 50] gọi Object.defineProperty(middleProxy, 'location', {get:deniedLocation})
 Object.defineProperty(middleProxy,'location',{get:deniedLocation});
// [VI dòng gốc 51] gán middle.W.parent bằng rootProxy | gán game.W.parent bằng middleProxy
 middle.W.parent=rootProxy;game.W.parent=middleProxy;
// [VI dòng gốc 52] gán root.W.frames bằng [middle.W] | gán middle.W.frames bằng [game.W]
 root.W.frames=[middle.W];middle.W.frames=[game.W];
// [VI dòng gốc 53] gán middle.W.postMessage bằng data=>middle.message(rootProxy,data)
 middle.W.postMessage=data=>middle.message(rootProxy,data);
// [VI dòng gốc 54] gán game.W.postMessage bằng data=>game.message(middleProxy,data)
 game.W.postMessage=data=>game.message(middleProxy,data);
// [VI dòng gốc 55] Khai báo biến không gán lại bằng const: badges = tạo mảng gồm 0 vị trí: [] | gán root.document.createElement bằng ()=>({style:{},textContent:''}) | gán root.document.body bằng {appendChild:b=>badges.push(b)}
 const badges=[];root.document.createElement=()=>({style:{},textContent:''});root.document.body={appendChild:b=>badges.push(b)};
// [VI dòng gốc 56] gọi root.load() | gọi middle.load() | gọi game.ready() | gọi game.load()
 root.load();middle.load();game.ready();game.load();
// [VI dòng gốc 57] gọi assert.equal(game.W.installs, 1, 'scope reaches nested frame without readable ancestors or referrer') để kiểm tra hai giá trị bằng nhau
 assert.equal(game.W.installs,1,'scope reaches nested frame without readable ancestors or referrer');
// [VI dòng gốc 58] gọi assert.equal(middle.W.installs, undefined, 'launcher frame never installs FULL') để kiểm tra hai giá trị bằng nhau
 assert.equal(middle.W.installs,undefined,'launcher frame never installs FULL');
// [VI dòng gốc 59] gọi assert.equal(root.W.installs, undefined, 'shell never installs FULL') để kiểm tra hai giá trị bằng nhau
 assert.equal(root.W.installs,undefined,'shell never installs FULL');
// [VI dòng gốc 60] gọi assert(badges[0].textContent.includes('Đã chạy'), 'top-level badge shows game-frame success') để kiểm tra điều kiện của bài test
 assert(badges[0].textContent.includes('Đã chạy'),'top-level badge shows game-frame success');
// [VI dòng gốc 61] Khai báo biến không gán lại bằng const: alien = gọi setup('https://unrelated.example/') | gán alien.W.parent bằng {} | gọi alien.ready() | gọi alien.load()
 const alien=setup('https://unrelated.example/');alien.W.parent={};alien.ready();alien.load();
// [VI dòng gốc 62] gọi alien.message({}, {channel:'kvpv-android-loader-v2',build:'test-build',type:'scope'})
 alien.message({}, {channel:'kvpv-android-loader-v2',build:'test-build',type:'scope'});
// [VI dòng gốc 63] gọi assert.equal(alien.W.installs, undefined, 'foreign source cannot authorize a frame') để kiểm tra hai giá trị bằng nhau
 assert.equal(alien.W.installs,undefined,'foreign source cannot authorize a frame');
// [VI dòng gốc 64] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 65] Khai báo biến không gán lại bằng const: source = gọi fs.readFileSync(__dirname+'/android/KVPV_ANDROID.user.js', 'utf8') để đọc tệp đồng bộ
const source=fs.readFileSync(__dirname+'/android/KVPV_ANDROID.user.js','utf8');
// [VI dòng gốc 66] Khai báo biến không gán lại bằng const: full = gọi fs.readFileSync(__dirname+'/KVPV_V1_FULL.js', 'utf8') để đọc tệp đồng bộ
const full=fs.readFileSync(__dirname+'/KVPV_V1_FULL.js','utf8');
// [VI dòng gốc 67] gọi assert(source.includes(full)) để kiểm tra điều kiện của bài test | gọi assert(!source.includes('[mở chú thích] FULL_BUNDLE [đóng chú thích]')) để kiểm tra điều kiện của bài test | tạo đối tượng bằng vm.Script(source)
assert(source.includes(full));assert(!source.includes('/* FULL_BUNDLE */'));new vm.Script(source);
// [VI dòng gốc 68] gọi assert(source.includes('@sandbox raw')) để kiểm tra điều kiện của bài test | gọi assert(source.includes('@grant none')) để kiểm tra điều kiện của bài test
assert(source.includes('@sandbox      raw'));assert(source.includes('@grant        none'));
// [VI dòng gốc 69] Khai báo biến không gán lại bằng const: zip = gọi fs.readFileSync(__dirname+'/android/KVPV_ANDROID.zip') để đọc tệp đồng bộ | gọi assert.equal(zip.readUInt32LE(0), 0x04034b50) để kiểm tra hai giá trị bằng nhau
const zip=fs.readFileSync(__dirname+'/android/KVPV_ANDROID.zip');assert.equal(zip.readUInt32LE(0),0x04034b50);
// [VI dòng gốc 70] Khai báo biến không gán lại bằng const: len = gọi zip.readUInt32LE(22); offset = tính biểu thức 30+zip.readUInt16LE(26)+zip.readUInt16LE(28)
const len=zip.readUInt32LE(22),offset=30+zip.readUInt16LE(26)+zip.readUInt16LE(28);
// [VI dòng gốc 71] gọi assert.equal(zip.subarray(offset,offset+len).toString(), source) để kiểm tra hai giá trị bằng nhau
assert.equal(zip.subarray(offset,offset+len).toString(),source);
// [VI dòng gốc 72] gọi assert.equal(require('node:zlib').crc32(zip.subarray(offset,offset+len)), zip.readUInt32LE(14)) để kiểm tra hai giá trị bằng nhau
assert.equal(require('node:zlib').crc32(zip.subarray(offset,offset+len)),zip.readUInt32LE(14));
// [VI dòng gốc 73] gọi console.log('PASS Android: game scope only, iframe referrer, wait/revive, once, timeout, identity, exact FULL and import ZIP CRC')
console.log('PASS Android: game scope only, iframe referrer, wait/revive, once, timeout, identity, exact FULL and import ZIP CRC');
// [VI dòng gốc 74] Dòng trống để tách các phần, không có lệnh thực thi.
