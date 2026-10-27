// [VI dòng gốc 1] "use strict"
'use strict';
// [VI dòng gốc 2] Khai báo biến không gán lại bằng const: fs = gọi require('fs') để nạp module Node.js; vm = gọi require('vm') để nạp module Node.js; assert = gọi require('assert/strict') để nạp module Node.js; src = gọi fs.readFileSync('src/52-item-trace.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm, '')
const fs=require('fs'),vm=require('vm'),assert=require('assert/strict'),src=fs.readFileSync('src/52-item-trace.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,'');
// [VI dòng gốc 3] Khai báo biến không gán lại bằng const: listeners = tạo đối tượng bằng Map(); items = tạo đối tượng bằng Map([['uid1',[100,10,'uid1']]]) | Khai báo biến không gán lại bằng const: notify = tạo đối tượng gồm on, off | Kiểm tra !listeners.has(e): đúng thì chạy nhánh sau if. | gọi listeners.set(e, new Set())
const listeners=new Map(),items=new Map([['uid1',[100,10,'uid1']]]);const notify={on(e,o,f){if(!listeners.has(e))listeners.set(e,new Set());listeners.get(e).add(f);},off(e,o,f){listeners.get(e)?.delete(f);}};
// [VI dòng gốc 4] Khai báo biến không gán lại bằng const: W = tạo đối tượng gồm __KVPV_OWN_ACTOR_ID, _Sa, _Ba
const W={__KVPV_OWN_ACTOR_ID:'12345',_Sa:{notify},_Ba:{_rJ:{_O$:{ins:{actorId:'12345'}}},_Ic:{_aQ:{ins:{isBagInited:true,getItemsByBagType:b=>b===0?[...items.values()]:[],getItemByIdAndUid:(id,uid)=>items.get(uid)}}}}};
// [VI dòng gốc 5] Khai báo biến không gán lại bằng const: load = tạo hàm với tham số (không có); mỗi lần gọi trả về gọi vm.runInNewContext(src, {window:W,Date,Map,Number,String,Array,Object}) để chạy mã trong ngữ cảnh máy ảo dùng cho kiểm thử | Khai báo biến không gán lại bằng const: emit = tạo hàm với tham số e, ...args | Duyệt từng giá trị trong listeners.get(e)||[] bằng const f. | Khai báo biến không gán lại bằng const: f (chưa gán giá trị)
const load=()=>vm.runInNewContext(src,{window:W,Date,Map,Number,String,Array,Object});const emit=(e,...args)=>{for(const f of listeners.get(e)||[])f(...args);};load();assert(W.KVPV_ITEM_TRACE.status().seeded);
// [VI dòng gốc 6] gọi items.set('uid1', [100,13,'uid1']) | gọi emit(5457, items.get('uid1'), 88) | Khai báo biến có thể gán lại bằng let: r = gọi W.KVPV_ITEM_TRACE.status().recent.at(-1) | gọi assert.equal(r.delta, 3) để kiểm tra hai giá trị bằng nhau
items.set('uid1',[100,13,'uid1']);emit(5457,items.get('uid1'),88);let r=W.KVPV_ITEM_TRACE.status().recent.at(-1);assert.equal(r.delta,3);assert.equal(r.sourceCode,'88');emit(5457,items.get('uid1'),88);assert.equal(W.KVPV_ITEM_TRACE.status().changes,1);
// [VI dòng gốc 7] gọi items.set('uid1', [100,9,'uid1']) | gọi emit(5077, 'uid1') | gọi assert.equal(W.KVPV_ITEM_TRACE.status().recent.at(-1).delta, -4) để kiểm tra hai giá trị bằng nhau
items.set('uid1',[100,9,'uid1']);emit(5077,'uid1');assert.equal(W.KVPV_ITEM_TRACE.status().recent.at(-1).delta,-4);
// [VI dòng gốc 8] gọi load() | gọi assert.equal(listeners.get(5457).size, 1) để kiểm tra hai giá trị bằng nhau | gọi assert.equal(W.KVPV_ITEM_TRACE.status().changes, 2) để kiểm tra hai giá trị bằng nhau
load();assert.equal(listeners.get(5457).size,1);assert.equal(W.KVPV_ITEM_TRACE.status().changes,2);
// [VI dòng gốc 9] gọi items.delete('uid1') | gọi emit(5077, 'uid1') | gọi assert.equal(W.KVPV_ITEM_TRACE.status().recent.at(-1).after, 0) để kiểm tra hai giá trị bằng nhau
items.delete('uid1');emit(5077,'uid1');assert.equal(W.KVPV_ITEM_TRACE.status().recent.at(-1).after,0);
// [VI dòng gốc 10] gọi items.set('uid2', [101,2,'uid2']) | gọi emit(5457, items.get('uid2'), 9) | gọi assert.equal(W.KVPV_ITEM_TRACE.status().recent.at(-1).delta, null, 'unseen stack has unknown prior count') để kiểm tra hai giá trị bằng nhau
items.set('uid2',[101,2,'uid2']);emit(5457,items.get('uid2'),9);assert.equal(W.KVPV_ITEM_TRACE.status().recent.at(-1).delta,null,'unseen stack has unknown prior count');
// [VI dòng gốc 11] gán W._Ba._rJ._O$.ins.actorId bằng '67890' | gọi emit(5457, [101,5,'uid2'], 9) | gọi assert.equal(W.KVPV_ITEM_TRACE.status().changes, 4) để kiểm tra hai giá trị bằng nhau
W._Ba._rJ._O$.ins.actorId='67890';emit(5457,[101,5,'uid2'],9);assert.equal(W.KVPV_ITEM_TRACE.status().changes,4);
// [VI dòng gốc 12] gọi W.KVPV_ITEM_TRACE.stop() để dừng bộ điều khiển và dọn tài nguyên | Duyệt từng giá trị trong listeners.values() bằng const set. | Khai báo biến không gán lại bằng const: set (chưa gán giá trị) | gọi assert.equal(set.size, 0) để kiểm tra hai giá trị bằng nhau
W.KVPV_ITEM_TRACE.stop();for(const set of listeners.values())assert.equal(set.size,0);
// [VI dòng gốc 13] gọi console.log('PASS read-only item trace: baseline/deltas, source code, duplicate notification dedupe, deletion, unknown baseline, rel…)
console.log('PASS read-only item trace: baseline/deltas, source code, duplicate notification dedupe, deletion, unknown baseline, reload listeners and actor ownership');
// [VI dòng gốc 14] Dòng trống để tách các phần, không có lệnh thực thi.
