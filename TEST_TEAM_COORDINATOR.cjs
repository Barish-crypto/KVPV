// [VI dòng gốc 1] "use strict"
'use strict';
// [VI dòng gốc 2] Khai báo biến không gán lại bằng const: fs = gọi require('fs') để nạp module Node.js; vm = gọi require('vm') để nạp module Node.js; assert = gọi require('assert/strict') để nạp module Node.js | Khai báo biến không gán lại bằng const: source = gọi fs.readFileSync('src/46-team-coordinator.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm, '') | Khai báo biến có thể gán lại bằng let: now = gọi Date.now() | Khai báo biến không gán lại bằng const: channels = tạo đối tượng bằng Set()
const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');const source=fs.readFileSync('src/46-team-coordinator.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,'');let now=Date.now();const channels=new Set();
// [VI dòng gốc 3] Định nghĩa lớp Channel. | gọi channels.add(this) | Duyệt từng giá trị trong channels bằng const c. | Khai báo biến không gán lại bằng const: c (chưa gán giá trị)
class Channel{constructor(){channels.add(this);}postMessage(data){for(const c of channels)if(c!==this)c.onmessage?.({data:JSON.parse(JSON.stringify(data))});}close(){channels.delete(this);}}
// [VI dòng gốc 4] Định nghĩa lớp Clock kế thừa Date. | Kết thúc hàm hiện tại và trả về: now.
class Clock extends Date{static now(){return now;}}
// [VI dòng gốc 5] Định nghĩa hàm account; tham số: id, power | Khai báo biến không gán lại bằng const: calls = tạo mảng gồm 0 vị trí: []; state = tạo đối tượng gồm inRoom, members, remaining, mission
function account(id,power){const calls=[],state={inRoom:false,members:[],remaining:1,mission:false};
// [VI dòng gốc 6] Định nghĩa lớp Native. | gọi calls.push(['start',...a]) để thêm phần tử vào cuối mảng | gọi calls.push(['create',...a]) để thêm phần tử vào cuối mảng | gọi calls.push(['invite',...a]) để thêm phần tử vào cuối mảng
 class Native{startTeamBossCopy(a){calls.push(['start',...a]);}creSerAreRoom(a){calls.push(['create',...a]);}inviUserSARoom(a){calls.push(['invite',...a]);}agrInviUSARoom(a){calls.push(['join',...a]);}agreAplySARoom(a){calls.push(['approve',...a]);}exitSerAreRoom(a){calls.push(['leave',...a]);}}
// [VI dòng gốc 7] Khai báo biến không gán lại bằng const: native = tạo đối tượng bằng Native(); party = tạo đối tượng gồm getHasTeams, getHasTeamByType, getTeamAllMembers, getAskLs, isLeader, roomId, roomMapId, mapLve, applyList | Kết thúc hàm hiện tại và trả về: tính biểu thức state.members[0]===id.
 const native=new Native(),party={getHasTeams:()=>state.inRoom,getHasTeamByType:t=>state.inRoom&&t===2,getTeamAllMembers:()=>state.members.map(x=>[x]),getAskLs:()=>state.invites||[],get isLeader(){return state.members[0]===id;},roomId:71,roomMapId:2091,mapLve:1,applyList:[]};
// [VI dòng gốc 8] Khai báo biến không gán lại bằng const: W = tạo đối tượng gồm __KVPV_OWN_ACTOR_ID, BroadcastChannel, setInterval, clearInterval, _Ba, KVPV_DAILY | Kết thúc hàm hiện tại và trả về: đọc state.remaining. | Kết thúc hàm hiện tại và trả về: đảo giá trị đúng/sai của state.mission. | Kết thúc hàm hiện tại và trả về: đọc state.mission.
 const W={__KVPV_OWN_ACTOR_ID:id,BroadcastChannel:Channel,setInterval:()=>1,clearInterval(){},_Ba:{_rJ:{_O$:{ins:{actorId:id}}},_qo:{_Ro:{ins:{fight:power}}},_cm:{_q3t:{ins:party},_u3t:{ins:native},_vJ:{ins:{get remainTimes(){return state.remaining;},isCombin:false}},TeamTypeToFuncId:{2:52}},_$a:{SceneUtil:{get isCommonScene(){return !state.mission;}},_yo:{ins:{get isInMission(){return state.mission;}}}}},KVPV_DAILY:{quickState:()=>({running:true,job:'rảnh'})}};
// [VI dòng gốc 9] Khai báo biến không gán lại bằng const: ctx = gọi vm.createContext({window:W,Date:Clock}) | Khai báo biến không gán lại bằng const: load = tạo hàm với tham số (không có); mỗi lần gọi trả về gọi vm.runInContext(source, ctx) | gọi load() | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm W, calls, state, party, native, load, tick.
 const ctx=vm.createContext({window:W,Date:Clock});const load=()=>vm.runInContext(source,ctx);load();return {W,calls,state,party,native,load,tick:()=>W.KVPV_TEAM_COORDINATOR.sync()};}
// [VI dòng gốc 10] Khai báo biến không gán lại bằng const: acc = tạo mảng gồm 4 vị trí: [account('12345',100),account('12346',400),account('12347',200),account('12348',300)]; lead = đọc acc[1]
const acc=[account('12345',100),account('12346',400),account('12347',200),account('12348',300)],lead=acc[1];
// [VI dòng gốc 11] Khai báo biến không gán lại bằng const: ticks = tạo hàm với tham số (không có) | Duyệt từng giá trị trong acc bằng const a. | Khai báo biến không gán lại bằng const: a (chưa gán giá trị) | gọi a.tick() để xử lý một nhịp kiểm tra
const ticks=()=>{for(const a of acc)a.tick();};ticks();now+=6000;ticks();ticks();
// [VI dòng gốc 12] gọi assert.equal(lead.calls.filter(c=>c[0]==='create').length, 1, 'highest power creates one room') để kiểm tra hai giá trị bằng nhau
assert.equal(lead.calls.filter(c=>c[0]==='create').length,1,'highest power creates one room');
// [VI dòng gốc 13] Duyệt từng giá trị trong acc bằng const a. | Khai báo biến không gán lại bằng const: a (chưa gán giá trị) | gọi assert.equal(a.W.KVPV_TEAM_COORDINATOR.status().session.leader, '12346') để kiểm tra hai giá trị bằng nhau
for(const a of acc)assert.equal(a.W.KVPV_TEAM_COORDINATOR.status().session.leader,'12346');
// [VI dòng gốc 14] gán lead.state.inRoom bằng true | gán lead.state.members bằng ['12346'] | gọi ticks() | gọi assert.equal(lead.calls.filter(c=>c[0]==='invite').length, 3) để kiểm tra hai giá trị bằng nhau
lead.state.inRoom=true;lead.state.members=['12346'];ticks();assert.equal(lead.calls.filter(c=>c[0]==='invite').length,3);
// [VI dòng gốc 15] gọi ticks() | gọi assert.equal(lead.calls.filter(c=>c[0]==='invite').length, 3, 'no invitation resend without ACK') để kiểm tra hai giá trị bằng nhau
ticks();assert.equal(lead.calls.filter(c=>c[0]==='invite').length,3,'no invitation resend without ACK');
// [VI dòng gốc 16] gọi lead.native.startTeamBossCopy([2]) | gọi assert.equal(lead.calls.some(c=>c[0]==='start'), false, 'not full') để kiểm tra hai giá trị bằng nhau
lead.native.startTeamBossCopy([2]);assert.equal(lead.calls.some(c=>c[0]==='start'),false,'not full');
// [VI dòng gốc 17] Duyệt từng giá trị trong acc.filter(a=>a!==lead) bằng const a. | Khai báo biến không gán lại bằng const: a (chưa gán giá trị) | gán a.state.invites bằng [[0,2,71,0,1,'12346']] | gọi a.tick() để xử lý một nhịp kiểm tra
for(const a of acc.filter(a=>a!==lead)){a.state.invites=[[0,2,71,0,1,'12346']];a.tick();assert.equal(a.calls.filter(c=>c[0]==='join').length,1);a.tick();assert.equal(a.calls.filter(c=>c[0]==='join').length,1);}
// [VI dòng gốc 18] gán lead.state.members bằng ['12346','12345','12347','99999'] | gọi ticks() | gọi assert.equal(lead.calls.some(c=>c[0]==='start'), false, 'outsider cannot replace clone') để kiểm tra hai giá trị bằng nhau
lead.state.members=['12346','12345','12347','99999'];ticks();assert.equal(lead.calls.some(c=>c[0]==='start'),false,'outsider cannot replace clone');
// [VI dòng gốc 19] Duyệt từng giá trị trong acc bằng const a. | Khai báo biến không gán lại bằng const: a (chưa gán giá trị) | gán a.state.inRoom bằng true | gán a.state.members bằng ['12346','12345','12347','12348']
for(const a of acc){a.state.inRoom=true;a.state.members=['12346','12345','12347','12348'];}ticks();assert.equal(lead.calls.filter(c=>c[0]==='start').length,1);
// [VI dòng gốc 20] gọi lead.load() | gọi ticks() | gọi assert.equal(lead.calls.filter(c=>c[0]==='start').length, 1, 'reload does not replay start') để kiểm tra hai giá trị bằng nhau
lead.load();ticks();assert.equal(lead.calls.filter(c=>c[0]==='start').length,1,'reload does not replay start');
// [VI dòng gốc 21] Duyệt từng giá trị trong acc bằng const a. | Khai báo biến không gán lại bằng const: a (chưa gán giá trị) | gán a.state.mission bằng true | gọi ticks()
for(const a of acc)a.state.mission=true;ticks();for(const a of acc){a.state.mission=false;a.state.remaining=0;}ticks();
// [VI dòng gốc 22] gọi assert(acc.every(a=>a.calls.filter(c=>c[0]==='leave').length===1), 'owned completed room exits once') để kiểm tra điều kiện của bài test
assert(acc.every(a=>a.calls.filter(c=>c[0]==='leave').length===1),'owned completed room exits once');
// [VI dòng gốc 23] Duyệt từng giá trị trong acc bằng const a. | Khai báo biến không gán lại bằng const: a (chưa gán giá trị) | gán a.state.inRoom bằng false | gọi ticks()
for(const a of acc)a.state.inRoom=false;ticks();now+=86400000;for(const a of acc)a.state.remaining=1;ticks();now+=6000;ticks();ticks();
// [VI dòng gốc 24] gọi assert.equal(lead.calls.filter(c=>c[0]==='create').length, 2, 'server daily quota restored creates a new day session') để kiểm tra hai giá trị bằng nhau
assert.equal(lead.calls.filter(c=>c[0]==='create').length,2,'server daily quota restored creates a new day session');
// [VI dòng gốc 25] Duyệt từng giá trị trong acc bằng const a. | Khai báo biến không gán lại bằng const: a (chưa gán giá trị) | gọi a.W.KVPV_TEAM_COORDINATOR.stop() để dừng bộ điều khiển và dọn tài nguyên | gọi assert.equal(channels.size, 0) để kiểm tra hai giá trị bằng nhau
for(const a of acc)a.W.KVPV_TEAM_COORDINATOR.stop();assert.equal(channels.size,0);
// [VI dòng gốc 26] gọi console.log('PASS active-account party: strongest election, exact four roster, native create/invite/join/start, no replay/reload, co…)
console.log('PASS active-account party: strongest election, exact four roster, native create/invite/join/start, no replay/reload, completed-room exit and next-day quota');
// [VI dòng gốc 27] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 28] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng {. Đọc cùng dòng mở phía trên: {
{
// [VI dòng gốc 29] Khai báo biến không gán lại bằng const: a = gọi account('23456', 100) | gọi a.W.KVPV_TEAM_COORDINATOR.stop() để dừng bộ điều khiển và dọn tài nguyên | gán a.W.BroadcastChannel bằng undefined | Khai báo biến không gán lại bằng const: original = đọc Object.getPrototypeOf(a.native).startTeamBossCopy
 const a=account('23456',100);a.W.KVPV_TEAM_COORDINATOR.stop();a.W.BroadcastChannel=undefined;const original=Object.getPrototypeOf(a.native).startTeamBossCopy;
// [VI dòng gốc 30] gọi a.load() | gọi assert.equal(a.native.startTeamBossCopy, original, 'unsupported channel never blocks native start') để kiểm tra hai giá trị bằng nhau | gọi assert.equal(a.W.KVPV_TEAM_COORDINATOR.status().reason, 'account_channel_unavailable') để kiểm tra hai giá trị bằng nhau | gọi a.W.KVPV_TEAM_COORDINATOR.stop() để dừng bộ điều khiển và dọn tài nguyên
 a.load();assert.equal(a.native.startTeamBossCopy,original,'unsupported channel never blocks native start');assert.equal(a.W.KVPV_TEAM_COORDINATOR.status().reason,'account_channel_unavailable');a.W.KVPV_TEAM_COORDINATOR.stop();
// [VI dòng gốc 31] Khai báo biến không gán lại bằng const: b = gọi account('23457', 100) | gọi b.W.KVPV_TEAM_COORDINATOR.stop() để dừng bộ điều khiển và dọn tài nguyên | Khai báo biến không gán lại bằng const: foreign = tạo hàm với tham số (không có) | gán b.native.startTeamBossCopy bằng foreign
 const b=account('23457',100);b.W.KVPV_TEAM_COORDINATOR.stop();const foreign=()=>{};b.native.startTeamBossCopy=foreign;b.load();assert.equal(b.native.startTeamBossCopy,foreign,'unknown hook preserved');b.W.KVPV_TEAM_COORDINATOR.stop();
// [VI dòng gốc 32] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 33] gọi console.log('PASS party coordinator: unavailable channel leaves native behavior intact; unknown start hooks are never overwritten')
console.log('PASS party coordinator: unavailable channel leaves native behavior intact; unknown start hooks are never overwritten');
// [VI dòng gốc 34] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 35] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng {. Đọc cùng dòng mở phía trên: {
{
// [VI dòng gốc 36] Khai báo biến không gán lại bằng const: group = tạo mảng gồm 4 vị trí: [account('33451',100),account('33452',900),account('33453',200),account('33454',300)]
 const group=[account('33451',100),account('33452',900),account('33453',200),account('33454',300)];
// [VI dòng gốc 37] Duyệt từng giá trị trong group bằng const a. | Khai báo biến không gán lại bằng const: a (chưa gán giá trị) | gọi a.W.KVPV_TEAM_COORDINATOR.stop() để dừng bộ điều khiển và dọn tài nguyên | gán a.W.BroadcastChannel bằng undefined
 for(const a of group){a.W.KVPV_TEAM_COORDINATOR.stop();a.W.BroadcastChannel=undefined;a.load();}
// [VI dòng gốc 38] Khai báo biến không gán lại bằng const: relay = tạo hàm với tham số (không có) | Khai báo biến không gán lại bằng const: rows = gọi group.map(a=>a.W.KVPV_TEAM_COORDINATOR.status().self) để biến đổi từng phần tử | Duyệt từng giá trị trong group bằng const a. | Khai báo biến không gán lại bằng const: a (chưa gán giá trị)
 const relay=()=>{const rows=group.map(a=>a.W.KVPV_TEAM_COORDINATOR.status().self);for(const a of group){a.W.KVPV_TEAM_COORDINATOR.receive(rows);a.tick();}};
// [VI dòng gốc 39] cập nhật bằng toán tử += now bằng 6000 | gọi relay()
 now+=6000;relay();relay();relay();const leader=group[1];
// [VI dòng gốc 40] gọi assert.equal(leader.calls.filter(c=>c[0]==='create').length, 1) để kiểm tra hai giá trị bằng nhau
 assert.equal(leader.calls.filter(c=>c[0]==='create').length,1);
// [VI dòng gốc 41] Duyệt từng giá trị trong group bằng const a. | Khai báo biến không gán lại bằng const: a (chưa gán giá trị) | gọi assert.equal(a.W.KVPV_TEAM_COORDINATOR.status().accounts.length, 4) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(a.W.KVPV_TEAM_COORDINATOR.status().session.leader, '33452') để kiểm tra hai giá trị bằng nhau
 for(const a of group){assert.equal(a.W.KVPV_TEAM_COORDINATOR.status().accounts.length,4);assert.equal(a.W.KVPV_TEAM_COORDINATOR.status().session.leader,'33452');}
// [VI dòng gốc 42] gán leader.state.inRoom bằng true | gán leader.state.members bằng ['33452'] | gọi relay() | gọi assert.equal(leader.calls.filter(c=>c[0]==='invite').length, 3) để kiểm tra hai giá trị bằng nhau
 leader.state.inRoom=true;leader.state.members=['33452'];relay();assert.equal(leader.calls.filter(c=>c[0]==='invite').length,3);
// [VI dòng gốc 43] Duyệt từng giá trị trong group.filter(a=>a!==leader) bằng const a. | Khai báo biến không gán lại bằng const: a (chưa gán giá trị) | gán a.state.invites bằng [[0,2,71,0,1,'33452']] | gọi relay()
 for(const a of group.filter(a=>a!==leader)){a.state.invites=[[0,2,71,0,1,'33452']];relay();assert.equal(a.calls.filter(c=>c[0]==='join').length,1);}
// [VI dòng gốc 44] gọi leader.native.startTeamBossCopy([2]) | gọi assert(!leader.calls.some(c=>c[0]==='start')) để kiểm tra điều kiện của bài test
 leader.native.startTeamBossCopy([2]);assert(!leader.calls.some(c=>c[0]==='start'));
// [VI dòng gốc 45] Duyệt từng giá trị trong group bằng const a. | Khai báo biến không gán lại bằng const: a (chưa gán giá trị) | gán a.state.inRoom bằng true | gán a.state.members bằng ['33452','33451','33453','33454']
 for(const a of group){a.state.inRoom=true;a.state.members=['33452','33451','33453','33454'];}relay();relay();
// [VI dòng gốc 46] gọi assert.equal(leader.calls.filter(c=>c[0]==='start').length, 1) để kiểm tra hai giá trị bằng nhau
 assert.equal(leader.calls.filter(c=>c[0]==='start').length,1);
// [VI dòng gốc 47] Khai báo biến không gán lại bằng const: stale = gọi group.map(a=>a.W.KVPV_TEAM_COORDINATOR.status().self) để biến đổi từng phần tử | cập nhật bằng toán tử += now bằng 16000
 const stale=group.map(a=>a.W.KVPV_TEAM_COORDINATOR.status().self);now+=16000;
// [VI dòng gốc 48] Duyệt từng giá trị trong group bằng const a. | Khai báo biến không gán lại bằng const: a (chưa gán giá trị) | gọi a.W.KVPV_TEAM_COORDINATOR.receive(stale) | gọi a.tick() để xử lý một nhịp kiểm tra
 for(const a of group){a.W.KVPV_TEAM_COORDINATOR.receive(stale);a.tick();assert.equal(a.W.KVPV_TEAM_COORDINATOR.status().accounts.length,1);a.W.KVPV_TEAM_COORDINATOR.stop();}
// [VI dòng gốc 49] gọi console.log('PASS cross-profile relay without BroadcastChannel: strongest leader, private invites, exact four start once, stale peer…)
 console.log('PASS cross-profile relay without BroadcastChannel: strongest leader, private invites, exact four start once, stale peers expire');
// [VI dòng gốc 50] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 51] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 52] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng {. Đọc cùng dòng mở phía trên: {
{
// [VI dòng gốc 53] Khai báo biến không gán lại bằng const: group = tạo mảng gồm 4 vị trí: [account('43451',100),account('43452',900),account('43453',200),account('43454',300)]
 const group=[account('43451',100),account('43452',900),account('43453',200),account('43454',300)];
// [VI dòng gốc 54] Khai báo biến không gán lại bằng const: pump = tạo hàm với tham số (không có); mỗi lần gọi trả về gọi group.forEach(a=>a.tick()) | cập nhật bằng toán tử += now bằng 6000 | gọi pump()
 const pump=()=>group.forEach(a=>a.tick());now+=6000;pump();pump();const leader=group[1];
// [VI dòng gốc 55] gọi assert(leader.W.KVPV_TEAM_COORDINATOR.status().session) để kiểm tra điều kiện của bài test
 assert(leader.W.KVPV_TEAM_COORDINATOR.status().session);
// [VI dòng gốc 56] Khai báo biến không gán lại bằng const: before = đọc leader.calls.filter(c=>c[0]==='start').length
 const before=leader.calls.filter(c=>c[0]==='start').length;
// [VI dòng gốc 57] gán leader.party.getHasTeamByType bằng t=>t===1 | gán leader.party.roomMapId bằng 123 | gán leader.party.mapLve bằng 2
 leader.party.getHasTeamByType=t=>t===1;leader.party.roomMapId=123;leader.party.mapLve=2;
// [VI dòng gốc 58] gọi leader.native.startTeamBossCopy([1]) | gọi assert.equal(leader.calls.filter(c=>c[0]==='start').length, before+1, 'EXP session must not block native Road Trial') để kiểm tra hai giá trị bằng nhau
 leader.native.startTeamBossCopy([1]);assert.equal(leader.calls.filter(c=>c[0]==='start').length,before+1,'EXP session must not block native Road Trial');
// [VI dòng gốc 59] gọi assert.equal(leader.calls.at(-1)[1], 1) để kiểm tra hai giá trị bằng nhau
 assert.equal(leader.calls.at(-1)[1],1);
// [VI dòng gốc 60] Duyệt từng giá trị trong group bằng const a. | Khai báo biến không gán lại bằng const: a (chưa gán giá trị) | gọi a.W.KVPV_TEAM_COORDINATOR.stop() để dừng bộ điều khiển và dọn tài nguyên
 for(const a of group)a.W.KVPV_TEAM_COORDINATOR.stop();
// [VI dòng gốc 61] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 62] gọi console.log('PASS room isolation: native Road Trial type1 passes through an old EXP type2 coordinator session.')
console.log('PASS room isolation: native Road Trial type1 passes through an old EXP type2 coordinator session.');
// [VI dòng gốc 63] Dòng trống để tách các phần, không có lệnh thực thi.
