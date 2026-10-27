// [VI dòng gốc 1] "use strict"
'use strict';
// [VI dòng gốc 2] Khai báo biến không gán lại bằng const: fs = gọi require('fs') để nạp module Node.js; vm = gọi require('vm') để nạp module Node.js; assert = gọi require('assert') để nạp module Node.js
const fs=require('fs'),vm=require('vm'),assert=require('assert');
// [VI dòng gốc 3] Khai báo biến không gán lại bằng const: code = gọi fs.readFileSync(__dirname+'/src/71-kiem-khieu.js', 'utf8') để đọc tệp đồng bộ
const code=fs.readFileSync(__dirname+'/src/71-kiem-khieu.js','utf8');
// [VI dòng gốc 4] Định nghĩa hàm harness; tham số: không có
function harness(){
// [VI dòng gốc 5] Khai báo biến có thể gán lại bằng let: now = 100; common = true; inside = false; job = "rảnh"; actor = "a" | Khai báo biến không gán lại bằng const: calls = tạo mảng gồm 0 vị trí: []; store = tạo đối tượng gồm
 let now=100,common=true,inside=false,job='rảnh',actor='a';const calls=[],store={};
// [VI dòng gốc 6] Khai báo biến không gán lại bằng const: m = tạo đối tượng gồm enterInfo, stageStat, matchCd, keepOutSize, isChampion, getSceneState1, reqInfo
 const m={enterInfo:[0,0,0,[]],stageStat:0,matchCd:10,keepOutSize:false,isChampion:false,getSceneState1:()=>[0,0,1,0,200,0,0,true],reqInfo:()=>calls.push('query')};
// [VI dòng gốc 7] Khai báo biến không gán lại bằng const: W = tạo đối tượng gồm __KVPV_OWN_ACTOR_ID, localStorage, setInterval, clearInterval, _Sa, _Ba, _C, _ft, KVPV_DAILY, KVPV_DAILY_CLOCK, KVPV
 const W={__KVPV_OWN_ACTOR_ID:'a',localStorage:{getItem:k=>store[k],setItem:(k,v)=>store[k]=v},setInterval:()=>1,clearInterval(){},
// [VI dòng gốc 8] Kết thúc hàm hiện tại và trả về: now. | Kết thúc hàm hiện tại và trả về: actor (ID nhân vật sở hữu phiên này). | Kết thúc hàm hiện tại và trả về: common.
 _Sa:{get svrTime(){return now;}},_Ba:{_rJ:{_O$:{ins:{get actorId(){return actor;},isDead:false}}},_T_t:{_k_t:{ins:m},_O3n:{ins:{reqHurtReward:id=>calls.push(['reward',id]),reqKeepOutSize:v=>calls.push(['keep',v])}}},_a2t:{_P3n:{ins:{c2sName:id=>calls.push(['register',id])}}},_sst:{_Cht:{inst:{rqEtScene:(...a)=>calls.push(['enter',...a])}}},_$a:{SceneUtil:{get isCommonScene(){return common;}},_yo:{ins:{isInMission:false}}},_cm:{_q3t:{ins:{getHasTeams:()=>false}}}},
// [VI dòng gốc 9] Thuộc tính _C: tạo đối tượng gồm _Mn | Thuộc tính _Mn: tạo đối tượng gồm _Cn | Thuộc tính _Cn: tạo đối tượng gồm currentID | Thuộc tính currentID: 8501
 _C:{_Mn:{_Cn:{currentID:8501}}},_ft:{_po:{ins:{getCfgById:()=>[0,0,0,0,0,0,0,inside?84:0]}},_UAh:{ins:{getRewardCfgByType:()=>[[1,1,50]]}}},
// [VI dòng gốc 10] Thuộc tính KVPV_DAILY: tạo đối tượng gồm quickState | Thuộc tính quickState: tạo hàm với tham số (không có); mỗi lần gọi trả về tạo đối tượng gồm running, job | Thuộc tính running: true | Thuộc tính job: dùng biến cùng tên
 KVPV_DAILY:{quickState:()=>({running:true,job})},KVPV_DAILY_CLOCK:{key:()=> 'day'},KVPV:{core:{scene:{status:()=>({owner:null})}}}};
// [VI dòng gốc 11] Khai báo biến không gán lại bằng const: load = tạo hàm với tham số (không có); mỗi lần gọi trả về gọi vm.runInNewContext(code, {window:W,Date,Number,String,Array,Object,JSON,Math}) để chạy mã trong ngữ cảnh máy ảo dùng cho kiểm thử | gọi load()
 const load=()=>vm.runInNewContext(code,{window:W,Date,Number,String,Array,Object,JSON,Math});load();
// [VI dòng gốc 12] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm W, m, calls, load, sync, clock, busy, wrong, inside. | gán inside bằng true | gán common bằng false
 return {W,m,calls,load,sync:()=>W.KVPV_KIEM_KHIEU.sync(),clock:n=>now=n,busy:()=>job='busy',wrong:()=>actor='b',inside:()=>{inside=true;common=false;}};
// [VI dòng gốc 13] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 14] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng {. Đọc cùng dòng mở phía trên: {
{
// [VI dòng gốc 15] Khai báo biến không gán lại bằng const: q = gọi harness() | gọi assert.deepEqual(q.calls, [['register',1581],'query']) để kiểm tra cấu trúc hai giá trị tương đương | gọi q.sync() | gọi q.load()
 const q=harness();assert.deepEqual(q.calls,[['register',1581],'query']);q.sync();q.load();assert.equal(q.calls.filter(x=>Array.isArray(x)&&x[0]==='register').length,1);
// [VI dòng gốc 16] gán q.m.enterInfo[1] bằng 1 | gọi q.clock(201) | gán q.m.getSceneState1 bằng ()=>[0,0,2,0,200,0,0,true] | gọi q.sync()
 q.m.enterInfo[1]=1;q.clock(201);q.m.getSceneState1=()=>[0,0,2,0,200,0,0,true];q.sync();assert.deepEqual(q.calls.at(-1),['enter',8501,1]);q.m.matchCd=9;q.sync();assert.equal(q.calls.filter(x=>Array.isArray(x)&&x[0]==='enter').length,1);
// [VI dòng gốc 17] gán q.m.enterInfo[2] bằng 50 | gọi q.sync() | gọi assert.deepEqual(q.calls.at(-1), ['reward',1]) để kiểm tra cấu trúc hai giá trị tương đương
 q.m.enterInfo[2]=50;q.sync();assert.deepEqual(q.calls.at(-1),['reward',1]);q.sync();assert.equal(q.calls.filter(x=>Array.isArray(x)&&x[0]==='reward').length,1);
// [VI dòng gốc 18] gán q.m.enterInfo[3] bằng [1] | gọi q.inside() | gọi q.sync() | gọi assert.equal(q.W.KVPV_KIEM_KHIEU.status().reason, 'inside_native_combat') để kiểm tra hai giá trị bằng nhau
 q.m.enterInfo[3]=[1];q.inside();q.sync();assert.equal(q.W.KVPV_KIEM_KHIEU.status().reason,'inside_native_combat');
// [VI dòng gốc 19] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 20] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng {. Đọc cùng dòng mở phía trên: {
{
// [VI dòng gốc 21] Khai báo biến không gán lại bằng const: q = gọi harness() | gán q.calls.length bằng 0 | gán q.m.enterInfo[1] bằng 1 | gọi q.clock(201)
 const q=harness();q.calls.length=0;q.m.enterInfo[1]=1;q.clock(201);q.m.getSceneState1=()=>[0,0,2,0,200,0,0,true];q.busy();q.sync();assert.equal(q.calls.length,0);q.wrong();q.sync();assert.equal(q.calls.length,0);
// [VI dòng gốc 22] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 23] Tiếp tục biểu thức hoặc khai báo đang mở; thành phần cú pháp bắt đầu bằng {. Đọc cùng dòng mở phía trên: {
{
// [VI dòng gốc 24] Khai báo biến không gán lại bằng const: q = gọi harness() | gán q.calls.length bằng 0 | gán q.m.stageStat bằng 1 | gán q.m.isChampion bằng true
 const q=harness();q.calls.length=0;q.m.stageStat=1;q.m.isChampion=true;q.sync();q.sync();assert.deepEqual(q.calls,[['keep',1]]);
// [VI dòng gốc 25] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 26] gọi console.log('PASS Kiem Khieu: native signup, timed entry once despite countdown, reward eligibility, hot reload, busy/identity gates…)
console.log('PASS Kiem Khieu: native signup, timed entry once despite countdown, reward eligibility, hot reload, busy/identity gates, champion native rounds');
// [VI dòng gốc 27] Dòng trống để tách các phần, không có lệnh thực thi.
