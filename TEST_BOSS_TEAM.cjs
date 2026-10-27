// [VI dòng gốc 1] "use strict"
'use strict';
// [VI dòng gốc 2] Khai báo biến không gán lại bằng const: fs = gọi require('fs') để nạp module Node.js; vm = gọi require('vm') để nạp module Node.js; assert = gọi require('assert/strict') để nạp module Node.js | Khai báo biến không gán lại bằng const: src = gọi fs.readFileSync('src/47-boss-team.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm, '')
const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');const src=fs.readFileSync('src/47-boss-team.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,'');
// [VI dòng gốc 3] Định nghĩa hàm harness; tham số: actor='12345'
function harness(actor='12345'){
// [VI dòng gốc 4] Khai báo biến không gán lại bằng const: calls = tạo mảng gồm 0 vị trí: []; state = tạo đối tượng gồm scene, common, team, invites, challenge, armed; m = tạo đối tượng gồm curmapidScene, curMapLvScene, curlineScene, teamPlayerData, getInvitedList, strengthvalue, auto | Kết thúc hàm hiện tại và trả về: đọc state.team.
 const calls=[],state={scene:55,common:false,team:[],invites:[],challenge:1,armed:true},m={curmapidScene:2711,curMapLvScene:101,curlineScene:1,get teamPlayerData(){return state.team;},getInvitedList:()=>state.invites,strengthvalue:1,auto:0};
// [VI dòng gốc 5] Khai báo biến không gán lại bằng const: rpc = tạo đối tượng gồm CreateStarsSecretTeam, GetSelfStarsSecretTeamInfo, InviteOutMapUserJoinTeam, checkCanEnterSenceTeam
 const rpc={CreateStarsSecretTeam:()=>calls.push('create'),GetSelfStarsSecretTeamInfo:()=>{},InviteOutMapUserJoinTeam:id=>calls.push(['invite',id]),checkCanEnterSenceTeam:a=>calls.push(['join',...a])};
// [VI dòng gốc 6] Khai báo biến không gán lại bằng const: W = tạo đối tượng gồm __KVPV_OWN_ACTOR_ID, _Ba, KVPV_MODE, KVPV_TEAM_COORDINATOR, setInterval, clearInterval | Kết thúc hàm hiện tại và trả về: đọc state.challenge. | Kết thúc hàm hiện tại và trả về: đọc state.scene. | Kết thúc hàm hiện tại và trả về: đọc state.common.
 const W={__KVPV_OWN_ACTOR_ID:actor,_Ba:{_rJ:{_O$:{ins:{actorId:actor}}},_MT:{the_secret_of_the_stars:{_Gvt:{instance:m},_jvt:{ins:rpc}}},_Dvt:{_Hvt:{ins:{get challengePhyStren(){return state.challenge;}}}},_$a:{SceneUtil:{get curScene(){return state.scene;},get isCommonScene(){return state.common;}},_yo:{ins:{get isInMission(){return !state.common;}}}},_Co:{_Mo:{ins:{auto:true}}},_sst:{_Cht:{inst:{rqEtScene:id=>calls.push(['exit',id])}}}},KVPV_MODE:{status:()=>({autoMaintain:state.armed}),stop(){state.armed=false;calls.push('stop-combat');},armTianQuan(){calls.push('restore');}},KVPV_TEAM_COORDINATOR:{status:()=>({accounts:[{actor:'12345',power:4},{actor:'12346',power:3},{actor:'12347',power:2},{actor:'12348',power:1}]})},setInterval:()=>1,clearInterval(){}};
// [VI dòng gốc 7] Khai báo biến không gán lại bằng const: ctx = gọi vm.createContext({window:W}) | Khai báo biến không gán lại bằng const: load = tạo hàm với tham số (không có); mỗi lần gọi trả về gọi vm.runInContext(src, ctx) | gọi load() | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm W, state, m, calls, load, tick.
 const ctx=vm.createContext({window:W});const load=()=>vm.runInContext(src,ctx);load();return {W,state,m,calls,load,tick:()=>W.KVPV_BOSS_TEAM.sync()};
// [VI dòng gốc 8] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 9] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng {. Đọc cùng dòng mở phía trên: {
{
// [VI dòng gốc 10] Khai báo biến không gán lại bằng const: q = gọi harness() | gọi assert.equal(q.calls[0], 'create') để kiểm tra hai giá trị bằng nhau | gọi q.tick() để xử lý một nhịp kiểm tra | gán q.m.selfTeamId bằng 42
 const q=harness();assert.equal(q.calls[0],'create');q.tick();q.m.selfTeamId=42;q.tick();assert.equal(q.calls.filter(x=>x==='create').length,1,'partial create ACK never repeats');
// [VI dòng gốc 11] gán q.state.team bằng [['12345',0,0,0,0,0,0,1]] | gọi q.tick() để xử lý một nhịp kiểm tra | gọi assert.deepEqual(q.calls.filter(x=>Array.isArray(x)), [['invite',12346],['invite',12347],['invite',12348]]) để kiểm tra cấu trúc hai giá trị tương đương
 q.state.team=[['12345',0,0,0,0,0,0,1]];q.tick();assert.deepEqual(q.calls.filter(x=>Array.isArray(x)),[['invite',12346],['invite',12347],['invite',12348]]);q.tick();assert.equal(q.calls.filter(x=>Array.isArray(x)).length,3,'no public invite or repeated private sends');q.load();q.tick();assert.equal(q.calls.filter(x=>Array.isArray(x)).length,3);q.W.KVPV_BOSS_TEAM.stop();
// [VI dòng gốc 12] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 13] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng {. Đọc cùng dòng mở phía trên: {
{
// [VI dòng gốc 14] Khai báo biến không gán lại bằng const: q = gọi harness('12346') | gán q.state.scene bằng 35 | gán q.state.common bằng false
 const q=harness('12346');q.state.scene=35;q.state.common=false;
// [VI dòng gốc 15] gán q.state.invites bằng [['99999','outsider',2711,101,1,42]] | gọi q.tick() để xử lý một nhịp kiểm tra | gọi assert.equal(q.W.KVPV_BOSS_TEAM.priority(), false) để kiểm tra hai giá trị bằng nhau
 q.state.invites=[['99999','outsider',2711,101,1,42]];q.tick();assert.equal(q.W.KVPV_BOSS_TEAM.priority(),false);
// [VI dòng gốc 16] gán q.state.invites bằng [['12345','main',2711,101,1,42]] | gọi q.tick() để xử lý một nhịp kiểm tra | gọi assert.equal(q.W.KVPV_BOSS_TEAM.priority(), true) để kiểm tra hai giá trị bằng nhau | gọi assert(q.calls.includes('stop-combat')) để kiểm tra điều kiện của bài test
 q.state.invites=[['12345','main',2711,101,1,42]];q.tick();assert.equal(q.W.KVPV_BOSS_TEAM.priority(),true);assert(q.calls.includes('stop-combat'));q.tick();q.tick();assert.equal(q.calls.filter(x=>Array.isArray(x)&&x[0]==='exit').length,1,'exit once even while TQ is running');
// [VI dòng gốc 17] gọi q.load() | gọi q.tick() để xử lý một nhịp kiểm tra | gọi assert.equal(q.calls.filter(x=>Array.isArray(x)&&x[0]==='exit').length, 1, 'unconfirmed exit retained through reload') để kiểm tra hai giá trị bằng nhau
 q.load();q.tick();assert.equal(q.calls.filter(x=>Array.isArray(x)&&x[0]==='exit').length,1,'unconfirmed exit retained through reload');
// [VI dòng gốc 18] gán q.state.scene bằng 0 | gán q.state.common bằng true | gọi q.tick() để xử lý một nhịp kiểm tra | gọi assert.deepEqual(q.calls.at(-1), ['join',2711,101,1,42]) để kiểm tra cấu trúc hai giá trị tương đương
 q.state.scene=0;q.state.common=true;q.tick();assert.deepEqual(q.calls.at(-1),['join',2711,101,1,42]);q.tick();assert.equal(q.calls.filter(x=>Array.isArray(x)&&x[0]==='join').length,1);
// [VI dòng gốc 19] gán q.state.scene bằng 55 | gán q.state.common bằng false | gán q.state.team bằng [['12345',0,0,0,0,0,0,1],['12346']] | gọi q.tick() để xử lý một nhịp kiểm tra
 q.state.scene=55;q.state.common=false;q.state.team=[['12345',0,0,0,0,0,0,1],['12346']];q.tick();assert.equal(q.W.KVPV_BOSS_TEAM.priority(),false,'boss team can proceed before all three clones arrive');
// [VI dòng gốc 20] gán q.state.scene bằng 0 | gán q.state.common bằng true | gán q.state.team bằng [] | gọi q.tick() để xử lý một nhịp kiểm tra
 q.state.scene=0;q.state.common=true;q.state.team=[];q.tick();assert(q.calls.includes('restore'),'TQ restored after returning from boss');q.W.KVPV_BOSS_TEAM.stop();
// [VI dòng gốc 21] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 22] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng {. Đọc cùng dòng mở phía trên: {
{
// [VI dòng gốc 23] Khai báo biến không gán lại bằng const: q = gọi harness('12346') | gán q.state.challenge bằng 0 | gán q.state.invites bằng [['12345','main',2711,101,1,42]] | gọi q.tick() để xử lý một nhịp kiểm tra
 const q=harness('12346');q.state.challenge=0;q.state.invites=[['12345','main',2711,101,1,42]];q.tick();assert.equal(q.W.KVPV_BOSS_TEAM.priority(),false,'never joins by buying stamina');q.W.KVPV_BOSS_TEAM.stop();
// [VI dòng gốc 24] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 25] gọi console.log('PASS private boss team: strongest main, three private invites, native join, TQ/boss exit priority, no duplicate/reload,…)
console.log('PASS private boss team: strongest main, three private invites, native join, TQ/boss exit priority, no duplicate/reload, no stamina purchase and resume');
// [VI dòng gốc 26] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 27] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng {. Đọc cùng dòng mở phía trên: {
{
// [VI dòng gốc 28] Khai báo biến không gán lại bằng const: q = gọi harness() | gán q.state.team bằng [['12345',0,0,0,0,0,0,1]] | gán q.m.autoAgreeApplyStarsSecretTeam bằng 1
 const q=harness();q.state.team=[['12345',0,0,0,0,0,0,1]];q.m.autoAgreeApplyStarsSecretTeam=1;
// [VI dòng gốc 29] gán q.W._Ba._MT.the_secret_of_the_stars._jvt.ins.setAutoAgreeApplyStarsSecretTeam bằng x=>q.calls.push(['private',x]) | gọi q.tick() để xử lý một nhịp kiểm tra | gọi assert.equal(q.calls.filter(x=>Array.isArray(x)&&x[0]==='private').length, 1) để kiểm tra hai giá trị bằng nhau
 q.W._Ba._MT.the_secret_of_the_stars._jvt.ins.setAutoAgreeApplyStarsSecretTeam=x=>q.calls.push(['private',x]);q.tick();q.tick();assert.equal(q.calls.filter(x=>Array.isArray(x)&&x[0]==='private').length,1);
// [VI dòng gốc 30] gọi assert.equal(q.calls.filter(x=>Array.isArray(x)&&x[0]==='invite').length, 0, 'wait for native private-setting ACK') để kiểm tra hai giá trị bằng nhau | gán q.m.autoAgreeApplyStarsSecretTeam bằng 0 | gọi q.tick() để xử lý một nhịp kiểm tra | gọi assert.equal(q.calls.filter(x=>Array.isArray(x)&&x[0]==='invite').length, 3) để kiểm tra hai giá trị bằng nhau
 assert.equal(q.calls.filter(x=>Array.isArray(x)&&x[0]==='invite').length,0,'wait for native private-setting ACK');q.m.autoAgreeApplyStarsSecretTeam=0;q.tick();assert.equal(q.calls.filter(x=>Array.isArray(x)&&x[0]==='invite').length,3);q.W.KVPV_BOSS_TEAM.stop();
// [VI dòng gốc 31] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 32] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng {. Đọc cùng dòng mở phía trên: {
{
// [VI dòng gốc 33] Khai báo biến không gán lại bằng const: q = gọi harness('12346') | gán q.state.scene bằng 34 | gán q.state.team bằng [['99999',0,0,0,0,0,0,1],['12346']]
 const q=harness('12346');q.state.scene=34;q.state.team=[['99999',0,0,0,0,0,0,1],['12346']];
// [VI dòng gốc 34] gán q.W._Ba._MT.the_secret_of_the_stars._jvt.ins.ExitStarsSecretTeam bằng ()=>q.calls.push('leave-old-team')
 q.W._Ba._MT.the_secret_of_the_stars._jvt.ins.ExitStarsSecretTeam=()=>q.calls.push('leave-old-team');
// [VI dòng gốc 35] gán q.state.invites bằng [['12345','main',2711,101,1,42]] | gọi q.tick() để xử lý một nhịp kiểm tra
 q.state.invites=[['12345','main',2711,101,1,42]];q.tick();q.tick();q.tick();assert.equal(q.calls.filter(x=>x==='leave-old-team').length,1);assert.equal(q.calls.some(x=>Array.isArray(x)&&x[0]==='join'),false);
// [VI dòng gốc 36] gán q.state.team bằng [] | gọi q.tick() để xử lý một nhịp kiểm tra | gọi assert(q.calls.some(x=>Array.isArray(x)&&x[0]==='exit')) để kiểm tra điều kiện của bài test | gọi q.W.KVPV_BOSS_TEAM.stop() để dừng bộ điều khiển và dọn tài nguyên
 q.state.team=[];q.tick();assert(q.calls.some(x=>Array.isArray(x)&&x[0]==='exit'));q.W.KVPV_BOSS_TEAM.stop();
// [VI dòng gốc 37] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 38] gọi console.log('PASS private settings ACK and old boss-team exit ACK before switching activities')
console.log('PASS private settings ACK and old boss-team exit ACK before switching activities');
// [VI dòng gốc 39] Dòng trống để tách các phần, không có lệnh thực thi.
