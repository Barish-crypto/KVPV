// [VI dòng gốc 1] "use strict" | Khai báo biến không gán lại bằng const: fs = gọi require('node:fs') để nạp module Node.js; vm = gọi require('node:vm') để nạp module Node.js; assert = gọi require('node:assert/strict') để nạp module Node.js
'use strict';const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
// [VI dòng gốc 2] Khai báo biến không gán lại bằng const: source = gọi fs.readFileSync(__dirname+'/src/60-quiz-auto.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm, ''); store = tạo đối tượng bằng Map(); calls = tạo mảng gồm 0 vị trí: []; chats = tạo mảng gồm 0 vị trí: []; timers = tạo đối tượng bằng Set() | Khai báo biến có thể gán lại bằng let: scene = 69; done = 0; syncChat = false
const source=fs.readFileSync(__dirname+'/src/60-quiz-auto.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,''),store=new Map(),calls=[],chats=[],timers=new Set();let scene=69,done=0,syncChat=false;
// [VI dòng gốc 3] Khai báo biến có thể gán lại bằng let: row = tạo mảng gồm 6 vị trí: [1,2000,'"Trứng muối" làm từ trứng nào?',['Trứng vịt','Trứng gà'],-1,10000]
let row=[1,2000,'"Trứng muối" làm từ trứng nào?',['Trứng vịt','Trứng gà'],-1,10000];
// [VI dòng gốc 4] Khai báo biến không gán lại bằng const: model = tạo đối tượng gồm getCopyInfo, getDoneRwdQNum, getSyncChat, choiceAnswer
const model={getCopyInfo:()=>row,getDoneRwdQNum:()=>done,getSyncChat:()=>syncChat,choiceAnswer:(...a)=>calls.push(a)};
// [VI dòng gốc 5] Khai báo biến không gán lại bằng const: W = tạo đối tượng gồm __KVPV_OWN_ACTOR_ID, _Sa, _C, _ft, _Ba, localStorage, setInterval, clearInterval
const W={__KVPV_OWN_ACTOR_ID:'123',_Sa:{svrTime:1000},_C:{_Mn:{_Cn:{currentID:6901}}},_ft:{_po:{ins:{getCfgById:()=>({7:scene})}}},_Ba:{_rJ:{_O$:{ins:{actorId:'123',isDead:false}}},_vlt:{_llt:{ins:model},_hcn:{ins:{setAnswerSyncChat:a=>chats.push(a)}}}},localStorage:{getItem:k=>store.get(k),setItem:(k,v)=>store.set(k,v)},setInterval:fn=>(timers.add(fn),fn),clearInterval:fn=>timers.delete(fn)};
// [VI dòng gốc 6] Khai báo biến không gán lại bằng const: load = tạo hàm với tham số (không có); mỗi lần gọi trả về gọi vm.runInNewContext(source, {window:W}) để chạy mã trong ngữ cảnh máy ảo dùng cho kiểm thử; tick = tạo hàm với tham số (không có); mỗi lần gọi trả về gọi W.KVPV_QUIZ_AUTO.sync()
const load=()=>vm.runInNewContext(source,{window:W}),tick=()=>W.KVPV_QUIZ_AUTO.sync();
// [VI dòng gốc 7] gọi load() | gọi assert.equal(calls.length, 1) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(calls[0][0], 0) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(calls[0][1], true) để kiểm tra hai giá trị bằng nhau
load();assert.equal(calls.length,1);assert.equal(calls[0][0],0);assert.equal(calls[0][1],true);tick();load();assert.equal(calls.length,1);assert.equal(timers.size,1);
// [VI dòng gốc 8] gán row bằng [1,3000,row[2],['Trứng gà','Trứng vịt'],-1,20000] | gọi tick() để xử lý một nhịp kiểm tra | gọi assert.equal(calls.at(-1)[0], 1) để kiểm tra hai giá trị bằng nhau
row=[1,3000,row[2],['Trứng gà','Trứng vịt'],-1,20000];tick();assert.equal(calls.at(-1)[0],1);
// [VI dòng gốc 9] gán row bằng [1,3000,'Câu mới',['Sai','Đúng'],-1,30000] | gọi tick() để xử lý một nhịp kiểm tra | gọi assert.equal(calls.length, 2) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(W.KVPV_QUIZ_AUTO.status().reason, 'unknown_answer_no_guess') để kiểm tra hai giá trị bằng nhau
row=[1,3000,'Câu mới',['Sai','Đúng'],-1,30000];tick();assert.equal(calls.length,2);assert.equal(W.KVPV_QUIZ_AUTO.status().reason,'unknown_answer_no_guess');
// [VI dòng gốc 10] gán row[0] bằng 2 | gán row[4] bằng 1 | gọi tick() để xử lý một nhịp kiểm tra | gọi assert.equal(W.KVPV_QUIZ_AUTO.status().learned, 0) để kiểm tra hai giá trị bằng nhau
row[0]=2;row[4]=1;tick();assert.equal(W.KVPV_QUIZ_AUTO.status().learned,0);
// [VI dòng gốc 11] gán row[0] bằng 3 | gọi tick() để xử lý một nhịp kiểm tra | gọi assert.equal(W.KVPV_QUIZ_AUTO.status().learned, 1) để kiểm tra hai giá trị bằng nhau | gọi assert(store.size) để kiểm tra điều kiện của bài test
row[0]=3;tick();assert.equal(W.KVPV_QUIZ_AUTO.status().learned,1);assert(store.size);
// [VI dòng gốc 12] gọi W.KVPV_QUIZ_AUTO.stop() để dừng bộ điều khiển và dọn tài nguyên | xóa thuộc tính W.KVPV_QUIZ_AUTO | gán row bằng [1,4000,'Câu mới',['Đúng','Sai'],-1,40000] | gọi load()
W.KVPV_QUIZ_AUTO.stop();delete W.KVPV_QUIZ_AUTO;row=[1,4000,'Câu mới',['Đúng','Sai'],-1,40000];load();assert.equal(calls.at(-1)[0],0);assert.equal(calls.length,3);
// [VI dòng gốc 13] gán syncChat bằng true | gán row bằng [1,4000,'Câu mới',['Sai','Đúng'],-1,50000] | gọi tick() để xử lý một nhịp kiểm tra
syncChat=true;row=[1,4000,'Câu mới',['Sai','Đúng'],-1,50000];tick();tick();assert.equal(chats.length,1);assert.equal(chats[0][0],false);assert.equal(calls.length,3);syncChat=false;tick();assert.equal(calls.length,4);
// [VI dòng gốc 14] gán done bằng 20 | tăng row[5] một đơn vị sau khi lấy giá trị | gọi tick() để xử lý một nhịp kiểm tra | gọi assert.equal(calls.length, 4) để kiểm tra hai giá trị bằng nhau
done=20;row[5]++;tick();assert.equal(calls.length,5);done=0;scene=41;tick();assert.equal(calls.length,5);scene=69;W._Sa.svrTime=5000;tick();assert.equal(calls.length,5);W._Sa.svrTime=1000;
// [VI dòng gốc 15] gán row bằng [1,4000,'Câu mới',['Đúng','Đúng'],-1,60000] | gọi tick() để xử lý một nhịp kiểm tra | gọi assert.equal(calls.length, 4) để kiểm tra hai giá trị bằng nhau | gán row[3] bằng ['Sai','Đúng']
row=[1,4000,'Câu mới',['Đúng','Đúng'],-1,60000];tick();assert.equal(calls.length,5);row[3]=['Sai','Đúng'];W._Ba._rJ._O$.ins.actorId='foreign';tick();assert.equal(calls.length,5);
// [VI dòng gốc 16] gọi W.KVPV_QUIZ_AUTO.stop() để dừng bộ điều khiển và dọn tài nguyên | gọi assert.equal(timers.size, 0) để kiểm tra hai giá trị bằng nhau
W.KVPV_QUIZ_AUTO.stop();assert.equal(timers.size,0);
// [VI dòng gốc 17] gọi console.log('PASS quiz: exact content and reordered options, no unknown guesses, server-result learning and persistent reload, once-…)
console.log('PASS quiz: exact content and reordered options, no unknown guesses, server-result learning and persistent reload, once-only selection, chat disabled ACK, complete/clock/scope/actor gates');
// [VI dòng gốc 18] Dòng trống để tách các phần, không có lệnh thực thi.
const entered=[];scene=1;W._Ba._rJ._O$.ins.actorId='123';W._Ba._$a={SceneUtil:{isCommonScene:true}};W._Ba._sst={_ist:{inst:{getCpSceneStateByType:()=>[0,0,2]}},_Cht:{inst:{checkEnterScene:()=>true,rqEtScene:id=>entered.push(id)}}};W._ft._po.ins.getCfgById=id=>({7:id===6901?69:1});W._C._Mn._Cn.currentID=1001;load();tick();assert.deepEqual(entered,[6901]);load();tick();assert.deepEqual(entered,[6901]);W.KVPV_QUIZ_AUTO.stop();console.log('PASS quiz native entry: server-open common map, one request and reload deduplication.');

const listeners=new Map();W._Sa.notify={on(id,ctx,fn){listeners.set(id,{ctx,fn});},off(id,ctx,fn){if(listeners.get(id)?.fn===fn)listeners.delete(id);}};
scene=69;W._C._Mn._Cn.currentID=6901;done=25;row=[1,4000,'Question after twenty',['Wrong','Correct'],-1,80000];load();assert.equal(listeners.size,2);
row[0]=3;row[4]=1;listeners.get(6514).fn();row=[1,4000,'Next fast question',['No','Yes'],-1,90000];
assert.equal(JSON.parse(store.get('kvpv.quiz.answers.v1'))['question after twenty'],'correct');
load();assert.equal(listeners.size,2);W.KVPV_QUIZ_AUTO.stop();assert.equal(listeners.size,0);
console.log('PASS quiz beyond twenty: native result event persists correct answer without polling, hot reload listeners and stop cleanup.');
