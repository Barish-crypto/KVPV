// [VI dòng gốc 1] "use strict"
'use strict';
// [VI dòng gốc 2] Khai báo biến không gán lại bằng const: fs = gọi require('fs') để nạp module Node.js; vm = gọi require('vm') để nạp module Node.js; assert = gọi require('assert/strict') để nạp module Node.js | Khai báo biến không gán lại bằng const: source = gọi fs.readFileSync('src/48-guild-boss.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm, '')
const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');const source=fs.readFileSync('src/48-guild-boss.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,'');
// [VI dòng gốc 3] Định nghĩa hàm harness; tham số: opts={} | Khai báo biến có thể gán lại bằng let: now = 10000 | Định nghĩa lớp Clock kế thừa Date. | Kết thúc hàm hiện tại và trả về: now.
function harness(opts={}){let now=10000;class Clock extends Date{static now(){return now;}}
// [VI dòng gốc 4] Khai báo biến không gán lại bằng const: calls = tạo mảng gồm 0 vị trí: []; events = tạo đối tượng bằng Map(); state = tạo đối tượng gồm map, common, member, until, left, layer, auto, armed
 const calls=[],events=new Map(),state={map:2996,common:false,member:true,until:20000,left:5000,layer:0,auto:!!opts.auto,armed:true};
// [VI dòng gốc 5] Khai báo biến không gán lại bằng const: boss = tạo đối tượng gồm inspireEndTime, leftFightTm, curTeamPassLayer, c_isAutoIn | Kết thúc hàm hiện tại và trả về: đọc state.until. | Kết thúc hàm hiện tại và trả về: đọc state.left. | Kết thúc hàm hiện tại và trả về: đọc state.layer.
 const boss={get inspireEndTime(){return state.until;},get leftFightTm(){return state.left;},get curTeamPassLayer(){return state.layer;},get c_isAutoIn(){return state.auto;}};
// [VI dòng gốc 6] Khai báo biến không gán lại bằng const: W = tạo đối tượng gồm __KVPV_OWN_ACTOR_ID, _Ba, _C, _ft, _Sa, KVPV_MODE, setInterval, clearInterval | Kết thúc hàm hiện tại và trả về: đọc state.common. | Kết thúc hàm hiện tại và trả về: đảo giá trị đúng/sai của state.common. | Kết thúc hàm hiện tại và trả về: đọc state.map.
 const W={__KVPV_OWN_ACTOR_ID:'12345',_Ba:{_rJ:{_O$:{ins:{actorId:'12345'}}},_a1:{_Rvn:{ins:boss},_h1:{inst:{hasFightTeam:()=>state.member,getMyFightTeamId:()=>9}},_qvn:{inst:{getFTBossInfo:()=>calls.push('refresh')}}},_Co:{_Mo:{ins:{auto:true}}},_$a:{SceneUtil:{get isCommonScene(){return state.common;}},_yo:{ins:{get isInMission(){return !state.common;}}}},_sst:{_Cht:{inst:{rqEtScene:id=>calls.push(id)}}}},_C:{_Mn:{_Cn:{get currentID(){return state.map;}}}},_ft:{_uph:{ins:{getMaxLayer:()=>10}}},_Sa:{get svrTime(){return now;},notify:{on(id,owner,fn){events.set(id,fn);},off(id,owner,fn){if(events.get(id)===fn)events.delete(id);}}},KVPV_MODE:{status:()=>({autoMaintain:state.armed}),stop(){state.armed=false;calls.push('stop');},armTianQuan(){calls.push('resume');}},setInterval:()=>1,clearInterval(){}};
// [VI dòng gốc 7] Khai báo biến không gán lại bằng const: ctx = gọi vm.createContext({window:W,Date:Clock}) | Khai báo biến không gán lại bằng const: load = tạo hàm với tham số (không có); mỗi lần gọi trả về gọi vm.runInContext(source, ctx) | gọi load() | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm W, calls, state, events, load, tick, advance.
 const ctx=vm.createContext({window:W,Date:Clock});const load=()=>vm.runInContext(source,ctx);load();return {W,calls,state,events,load,tick:()=>W.KVPV_GUILD_BOSS.sync(),advance(ms){now+=ms;W.KVPV_GUILD_BOSS.sync();}};}
// [VI dòng gốc 8] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng {. Đọc cùng dòng mở phía trên: {
{
// [VI dòng gốc 9] Khai báo biến không gán lại bằng const: q = gọi harness() | gọi assert.deepEqual(q.calls, ['refresh','stop',0]) để kiểm tra cấu trúc hai giá trị tương đương | gọi q.tick() để xử lý một nhịp kiểm tra | gọi assert.equal(q.calls.filter(x=>x===0).length, 1) để kiểm tra hai giá trị bằng nhau
 const q=harness();assert.deepEqual(q.calls,['refresh','stop',0]);q.tick();assert.equal(q.calls.filter(x=>x===0).length,1);q.load();q.tick();assert.equal(q.calls.filter(x=>x===0).length,1,'reload retains pending exit');
// [VI dòng gốc 10] gán q.state.map bằng 1002 | gán q.state.common bằng true | gọi q.tick() để xử lý một nhịp kiểm tra | gọi assert.equal(q.calls.filter(x=>x===3301).length, 1) để kiểm tra hai giá trị bằng nhau
 q.state.map=1002;q.state.common=true;q.tick();assert.equal(q.calls.filter(x=>x===3301).length,1);q.tick();assert.equal(q.calls.filter(x=>x===3301).length,1);
// [VI dòng gốc 11] gán q.state.map bằng 3301 | gán q.state.common bằng false | gọi q.tick() để xử lý một nhịp kiểm tra | gọi assert.equal(q.W.KVPV_GUILD_BOSS.priority(), false, 'combat allowed inside boss') để kiểm tra hai giá trị bằng nhau
 q.state.map=3301;q.state.common=false;q.tick();assert.equal(q.W.KVPV_GUILD_BOSS.priority(),false,'combat allowed inside boss');assert.equal(q.W.KVPV_GUILD_BOSS.active(),true);
// [VI dòng gốc 12] gọi q.events.get(5112)() | gọi assert.equal(q.calls.filter(x=>x===0).length, 2, 'native battle end exits boss once') để kiểm tra hai giá trị bằng nhau | gán q.state.map bằng 1002 | gán q.state.common bằng true
 q.events.get(5112)();assert.equal(q.calls.filter(x=>x===0).length,2,'native battle end exits boss once');q.state.map=1002;q.state.common=true;q.tick();assert(q.calls.includes('resume'));q.tick();assert.equal(q.calls.filter(x=>x===3301).length,1,'same inspiration never replayed');q.W.KVPV_GUILD_BOSS.stop();assert.equal(q.events.size,0);
// [VI dòng gốc 13] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 14] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng {. Đọc cùng dòng mở phía trên: {
{
// [VI dòng gốc 15] Khai báo biến không gán lại bằng const: q = gọi harness({auto:true}) | gọi assert.equal(q.calls.some(x=>typeof x==='number'), false, 'native auto-entry is the only sender') để kiểm tra hai giá trị bằng nhau | gọi assert.equal(q.W.KVPV_GUILD_BOSS.status().reason, 'waiting_native_auto_entry_ack') để kiểm tra hai giá trị bằng nhau | gọi q.W.KVPV_GUILD_BOSS.stop() để dừng bộ điều khiển và dọn tài nguyên
 const q=harness({auto:true});assert.equal(q.calls.some(x=>typeof x==='number'),false,'native auto-entry is the only sender');assert.equal(q.W.KVPV_GUILD_BOSS.status().reason,'waiting_native_auto_entry_ack');q.W.KVPV_GUILD_BOSS.stop();
// [VI dòng gốc 16] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 17] Duyệt từng giá trị trong [s=>s.member=false,s=>s.until=0,s=>s.left=0,s=>s.layer=10] bằng const change. | Khai báo biến không gán lại bằng const: change (chưa gán giá trị)
for(const change of [s=>s.member=false,s=>s.until=0,s=>s.left=0,s=>s.layer=10]){
// [VI dòng gốc 18] Khai báo biến không gán lại bằng const: q = gọi harness({auto:true}) | gọi q.W.KVPV_GUILD_BOSS.stop() để dừng bộ điều khiển và dọn tài nguyên | gán q.state.auto bằng false | gọi change(q.state)
 const q=harness({auto:true});q.W.KVPV_GUILD_BOSS.stop();q.state.auto=false;change(q.state);q.calls.length=0;q.load();assert.equal(q.calls.some(x=>typeof x==='number'),false,'no entry without native membership, live inspiration, time and remaining boss');q.W.KVPV_GUILD_BOSS.stop();
// [VI dòng gốc 19] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 20] gọi console.log('PASS Fight Team Boss: server inspiration/membership/time guards, priority exit, native map 3301 entry, no replay/reload…)
console.log('PASS Fight Team Boss: server inspiration/membership/time guards, priority exit, native map 3301 entry, no replay/reload, native-auto ownership, battle-end return and resume');
// [VI dòng gốc 21] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 22] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng {. Đọc cùng dòng mở phía trên: {
{
// [VI dòng gốc 23] Khai báo biến không gán lại bằng const: q = gọi harness() | gán q.state.map bằng 1002 | gán q.state.common bằng true | gán q.state.until bằng 0
 const q=harness();q.state.map=1002;q.state.common=true;q.state.until=0;q.tick();assert.equal(q.calls.filter(x=>x===3301).length,0,'expired buff cancels after exit ACK');q.W.KVPV_GUILD_BOSS.stop();
// [VI dòng gốc 24] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 25] gọi console.log('PASS guild rally expiration: expired inspiration cannot spend a new challenge after leaving previous activity')
console.log('PASS guild rally expiration: expired inspiration cannot spend a new challenge after leaving previous activity');
// [VI dòng gốc 26] Dòng trống để tách các phần, không có lệnh thực thi.
