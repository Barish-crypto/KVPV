// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: Kiểm thử mô phỏng: STRONGEST_TEAM. Các assert bên dưới ghi điều kiện phải giữ; không chứng minh máy chủ game chấp nhận tốc độ hoặc tầm đánh. [đóng chú thích]
/* Kiểm thử mô phỏng: STRONGEST_TEAM. Các assert bên dưới ghi điều kiện phải giữ; không chứng minh máy chủ game chấp nhận tốc độ hoặc tầm đánh. */
// [VI dòng gốc 2] Khai báo biến không gán lại bằng const: fs = gọi require('node:fs') để nạp module Node.js; vm = gọi require('node:vm') để nạp module Node.js; assert = gọi require('node:assert/strict') để nạp module Node.js
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
// [VI dòng gốc 3] Khai báo biến có thể gán lại bằng let: now = 100000; type = 0; open = false; eligible = true; busy = false; enemy = true; boss = true; releases = 0; entered = 0; rewardState = 0; claims = 0
let now=100000,type=0,open=false,eligible=true,busy=false,enemy=true,boss=true,releases=0,entered=0,rewardState=0,claims=0;
// [VI dòng gốc 4] Định nghĩa lớp Clock kế thừa Date. | gọi super(...(a.length?a:[Date.parse('2026-10-21T13:05:00Z')+now])) | Kết thúc hàm hiện tại và trả về: now.
class Clock extends Date{constructor(...a){super(...(a.length?a:[Date.parse('2026-10-21T13:05:00Z')+now]));}static now(){return now;}}
// [VI dòng gốc 5] Khai báo biến không gán lại bằng const: calls = tạo mảng gồm 0 vị trí: []; stage = tạo đối tượng gồm auto; ownNode = tạo đối tượng gồm areaId, color; bossNode = tạo đối tượng gồm npcId
const calls=[],stage={auto:true},ownNode={areaId:1,color:'blue'},bossNode={npcId:99};
// [VI dòng gốc 6] Khai báo biến không gán lại bằng const: m = tạo đối tượng gồm reEnterTime, score, killNum, helpKillNum, myDamage, selectTagetId, bossId, getStateById, getNearPlayerRank, isMyTeam, getCollectInfo, resetState
const m={reEnterTime:0,score:0,killNum:0,helpKillNum:0,myDamage:0,selectTagetId:-1,bossId:-1,
// [VI dòng gốc 7] Thuộc tính getStateById: tạo hàm với tham số (không có); mỗi lần gọi trả về rewardState | Thuộc tính getNearPlayerRank: tạo hàm với tham số (không có); mỗi lần gọi trả về nếu enemy thì lấy [{objId:'enemy',color:'red'}], ngược lại lấy [] | Thuộc tính objId: "enemy" | Thuộc tính color: "red"
  getStateById:()=>rewardState,getNearPlayerRank:()=>enemy?[{objId:'enemy',color:'red'}]:[],isMyTeam:color=>color==='blue',getCollectInfo:()=>[bossNode,ownNode],
// [VI dòng gốc 8] gán this.collecting bằng false | gán this.findTarget bằng false | gán this.bossId bằng -1 | gán this.selectTagetId bằng -1
  resetState(){this.collecting=false;this.findTarget=false;this.bossId=-1;this.selectTagetId=-1;}};
// [VI dòng gốc 9] Khai báo biến không gán lại bằng const: enemyRole = tạo đối tượng gồm isValid; bossRole = tạo đối tượng gồm property
const enemyRole={isValid:true},bossRole={property:{get:k=>({id:'boss',hp:[100,100]})[k]}};
// [VI dòng gốc 10] Khai báo biến không gán lại bằng const: W = tạo đối tượng gồm __KVPV_OWN_ACTOR_ID, _Ba, _C, _ft, _Sa, KVPV, KVPV_DAILY, KVPV_TQ_SCOPE, setInterval, clearInterval
const W={__KVPV_OWN_ACTOR_ID:'12345',_Ba:{_rJ:{_O$:{ins:{actorId:'12345',selectTar:(...a)=>calls.push(a)}}},_Co:{_Mo:{ins:stage}},
// [VI dòng gốc 11] tăng entered một đơn vị sau khi lấy giá trị | tăng claims một đơn vị sau khi lấy giá trị
  _T3:{_G_t:{instance:m},_E2n:{ins:{enterScene(){entered++;},GetStrongestTeamEnterTime(){},GetStrongestTeamReward(){},StrongestTeamScoreRank(){},GainStrongestTeamReward(){claims++;}}},_d2n:{ins:{isAlive:()=>eligible,curMatchStage:1}},_b2n:{ins:{isHaveWiner:false}}},
// [VI dòng gốc 12] Thuộc tính _a1: tạo đối tượng gồm _h1 | Thuộc tính _h1: tạo đối tượng gồm inst | Thuộc tính inst: tạo đối tượng gồm getMyFightTeamId | Thuộc tính getMyFightTeamId: tạo hàm với tham số (không có); mỗi lần gọi trả về 1
  _a1:{_h1:{inst:{getMyFightTeamId:()=>1}}},_$a:{SceneUtil:{isCommonScene:true}},_sst:{_ist:{inst:{getCpSceneStateByType:()=>[0,0,open?2:0]}},_Cht:{inst:{rqEtScene:id=>calls.push(['map',id])}}}},
// [VI dòng gốc 13] Thuộc tính _C: tạo đối tượng gồm _Mn, _Ba | Thuộc tính _Mn: tạo đối tượng gồm _Cn | Thuộc tính _Cn: tạo đối tượng gồm currentID | Thuộc tính currentID: 8201
  _C:{_Mn:{_Cn:{currentID:8201}},_Ba:{instance:{getRole:id=>id==='enemy'?enemyRole:null,findNearMonster:()=>boss?bossRole:null}}},
// [VI dòng gốc 14] Khai báo biến không gán lại bằng const: r = tạo mảng gồm 0 vị trí: [] | gán r[7] bằng type | Kết thúc hàm hiện tại và trả về: r.
  _ft:{_po:{ins:{getCfgById:()=>{const r=[];r[7]=type;return r;}}},_Cdh:{ins:{getCfgsByType:k=>k===1?[[501]]:[]}}},_Sa:{svrTime:now},
// [VI dòng gốc 15] tăng releases một đơn vị sau khi lấy giá trị
  KVPV:{core:{scene:{acquire:()=>!busy,renew(){},release(){releases++;}}}},KVPV_DAILY:{quickState:()=>({job:busy?'other':'rảnh'})},KVPV_TQ_SCOPE:{inside:()=>false},setInterval:()=>1,clearInterval(){}};
// [VI dòng gốc 16] gọi vm.runInNewContext(fs.readFileSync(__dirname+'/src/16-strongest-team.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,''), {window:…) để chạy mã trong ngữ cảnh máy ảo dùng cho kiểm thử
vm.runInNewContext(fs.readFileSync(__dirname+'/src/16-strongest-team.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,''),{window:W,Date:Clock,Intl});
// [VI dòng gốc 17] Khai báo biến không gán lại bằng const: auto = đọc W.KVPV_STRONGEST_TEAM | gọi assert.equal(entered, 0) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(releases, 0) để kiểm tra hai giá trị bằng nhau
const auto=W.KVPV_STRONGEST_TEAM;assert.equal(entered,0);assert.equal(releases,0);
// [VI dòng gốc 18] gán open bằng true | gán eligible bằng false | gọi auto.sync() | gọi assert.equal(entered, 0) để kiểm tra hai giá trị bằng nhau
open=true;eligible=false;auto.sync();assert.equal(entered,0);eligible=true;busy=true;auto.sync();assert.equal(entered,0);
// [VI dòng gốc 19] gán busy bằng false | gọi auto.sync() | gọi assert.equal(entered, 1) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(stage.auto, false) để kiểm tra hai giá trị bằng nhau
busy=false;auto.sync();assert.equal(entered,1);assert.equal(stage.auto,false);assert.equal(auto.status().confirmedEntries,0);auto.sync();assert.equal(entered,1);
// [VI dòng gốc 20] gán type bằng 82 | gọi auto.sync() | gọi assert.equal(auto.status().confirmedEntries, 1) để kiểm tra hai giá trị bằng nhau | gọi assert.deepEqual(calls.at(-1), [2,'enemy']) để kiểm tra cấu trúc hai giá trị tương đương
type=82;auto.sync();assert.equal(auto.status().confirmedEntries,1);assert.deepEqual(calls.at(-1),[2,'enemy']);
// [VI dòng gốc 21] gán enemy bằng false | cập nhật bằng toán tử += now bằng 4000 | gọi auto.sync() | gọi assert.deepEqual(calls.at(-1), [1,'boss']) để kiểm tra cấu trúc hai giá trị tương đương
enemy=false;now+=4000;auto.sync();assert.deepEqual(calls.at(-1),[1,'boss']);
// [VI dòng gốc 22] gán boss bằng false | cập nhật bằng toán tử += now bằng 4000 | gọi auto.sync() | gọi assert.equal(m.collecting, true) để kiểm tra hai giá trị bằng nhau
boss=false;now+=4000;auto.sync();assert.equal(m.collecting,true);assert.equal(m.collectEntiyVo,ownNode);
// [VI dòng gốc 23] cập nhật bằng toán tử += now bằng 4000 | gọi auto.sync() | gọi assert.equal(auto.status().reason, 'native_collecting') để kiểm tra hai giá trị bằng nhau
now+=4000;auto.sync();assert.equal(auto.status().reason,'native_collecting');
// [VI dòng gốc 24] gán rewardState bằng 1 | gọi auto.sync() | gọi assert.equal(claims, 1) để kiểm tra hai giá trị bằng nhau
rewardState=1;auto.sync();auto.sync();assert.equal(claims,1);assert.equal(auto.status().rewardConfirmed,0);
// [VI dòng gốc 25] gán rewardState bằng 2 | gọi auto.sync() | gọi assert.equal(auto.status().rewardConfirmed, 1) để kiểm tra hai giá trị bằng nhau
rewardState=2;auto.sync();assert.equal(auto.status().rewardConfirmed,1);
// [VI dòng gốc 26] gán open bằng false | gọi auto.sync() | cập nhật bằng toán tử += now bằng 90001
open=false;auto.sync();now+=90001;auto.sync();assert.deepEqual(calls.at(-1),['map',0]);assert.equal(auto.status().phase,'EXITING');
// [VI dòng gốc 27] gán type bằng 0 | gọi auto.sync() | gọi assert.equal(stage.auto, true) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(auto.status().phase, 'WAITING') để kiểm tra hai giá trị bằng nhau
type=0;auto.sync();assert.equal(stage.auto,true);assert.equal(auto.status().phase,'WAITING');assert.equal(releases,1);
// [VI dòng gốc 28] gọi auto.stop() để dừng bộ điều khiển và dọn tài nguyên | gọi assert.equal(releases, 1) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(auto.status().enabled, false) để kiểm tra hai giá trị bằng nhau
auto.stop();assert.equal(releases,1);assert.equal(auto.status().enabled,false);
// [VI dòng gốc 29] gọi console.log('PASS strongest team: server/team/idle gates, bounded entry + ACK, enemy/Boss/collect choice, native gather preservation…)
console.log('PASS strongest team: server/team/idle gates, bounded entry + ACK, enemy/Boss/collect choice, native gather preservation, reward request once + ACK, restore own lease');
// [VI dòng gốc 30] Dòng trống để tách các phần, không có lệnh thực thi.
