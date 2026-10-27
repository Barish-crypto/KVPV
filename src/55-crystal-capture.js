// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: Temporary native-call observation for the user's main account. No sender/replay. [đóng chú thích]
/* Temporary native-call observation for the user's main account. No sender/replay. */
// [VI dòng gốc 2] chạy ngay hàm bao để tạo phạm vi và khởi tạo phần chức năng bên trong
(() => {
// [VI dòng gốc 3] "use strict" | Khai báo biến không gán lại bằng const: W = window; actor = gọi String(W.__KVPV_OWN_ACTOR_ID||'') để chuyển sang chuỗi
 'use strict';const W=window,actor=String(W.__KVPV_OWN_ACTOR_ID||'');
// [VI dòng gốc 4] gọi W.KVPV_CRYSTAL_CAPTURE?.stop() để dừng bộ điều khiển và dọn tài nguyên (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Kiểm tra actor!=='10228867268946': đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
 W.KVPV_CRYSTAL_CAPTURE?.stop?.();if(actor!=='10228867268946')return;
// [VI dòng gốc 5] Khai báo biến không gán lại bằng const: key = "__KVPV_CRYSTAL_CAPTURE_20261024_SESSION2"; S = W[key] hoặc dùng vế phải khi vế trái là null/undefined: W[key]={until:Date.now()+900000,records:[],errors:[]}
 const key='__KVPV_CRYSTAL_CAPTURE_20261024_SESSION2',S=W[key]??(W[key]={until:Date.now()+900000,records:[],errors:[]});
// [VI dòng gốc 6] Khai báo biến không gán lại bằng const: hooks = tạo mảng gồm 0 vị trí: [] | Khai báo biến có thể gán lại bằng let: timer = null
 const hooks=[];let timer=null;
// [VI dòng gốc 7] Khai báo biến không gán lại bằng const: copy = tạo hàm với tham số v, d=0; mỗi lần gọi trả về nếu Array.isArray(v) thì lấy d<5?v.slice(0,24).map(x=>copy(x,d+1)):null, ngược lại lấy typeof v==='number'||typeof v==='boolean'?v:typeof v==='string'?v.slice(0,200):null
 const copy=(v,d=0)=>Array.isArray(v)?d<5?v.slice(0,24).map(x=>copy(x,d+1)):null:typeof v==='number'||typeof v==='boolean'?v:typeof v==='string'?v.slice(0,200):null;
// [VI dòng gốc 8] Khai báo biến không gán lại bằng const: owned = tạo hàm với tham số (không có); mỗi lần gọi trả về String(W._Ba?._rJ?._O$?.ins?.actorId)===actor và chỉ đánh giá vế phải khi vế trái truthy: !W.__KVPV_UNIVERSAL_HALTED
 const owned=()=>String(W._Ba?._rJ?._O$?.ins?.actorId)===actor&&!W.__KVPV_UNIVERSAL_HALTED;
// [VI dòng gốc 9] Định nghĩa hàm stop; tham số: không có. Mục đích: dừng bộ điều khiển và dọn tài nguyên | Kiểm tra timer!==null: đúng thì chạy nhánh sau if. | gọi W.KVPV_V1?.timers?.clearInterval??W.clearInterval(timer) | gán timer bằng null
 function stop(){if(timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(timer);timer=null;for(const h of hooks.splice(0))if(h.obj[h.name]===h.fn){if(h.descriptor)Object.defineProperty(h.obj,h.name,h.descriptor);else delete h.obj[h.name];}}
// [VI dòng gốc 10] Định nghĩa hàm attach; tham số: obj, name, direction, filter=()=>true
 function attach(obj,name,direction,filter=()=>true){
// [VI dòng gốc 11] Kiểm tra !obj||hooks.some(h=>h.obj===obj&&h.name===name): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  if(!obj||hooks.some(h=>h.obj===obj&&h.name===name))return;
// [VI dòng gốc 12] Khai báo biến không gán lại bằng const: native = đọc Object.getPrototypeOf(obj)?.[name] nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Kiểm tra typeof native!=='function'||obj[name]!==native: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  const native=Object.getPrototypeOf(obj)?.[name];if(typeof native!=='function'||obj[name]!==native)return;
// [VI dòng gốc 13] Khai báo biến không gán lại bằng const: descriptor = gọi Object.getOwnPropertyDescriptor(obj, name)
  const descriptor=Object.getOwnPropertyDescriptor(obj,name);
// [VI dòng gốc 14] Khai báo biến không gán lại bằng const: fn = tạo hàm với tham số ...args
  const fn=function(...args){
// [VI dòng gốc 15] Kiểm tra owned()&&Date.now()<S.until&&filter(args): đúng thì chạy nhánh sau if.
   if(owned()&&Date.now()<S.until&&filter(args)){
// [VI dòng gốc 16] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | gọi S.records.push({at:Date.now(),direction,method:name,args:copy(args)}) để thêm phần tử vào cuối mảng | Kiểm tra S.records.length>48: đúng thì chạy nhánh sau if. | Khai báo biến không gán lại bằng const: expendable = gọi S.records.findIndex(r=>r.method==='setSceneInfo')
    try{S.records.push({at:Date.now(),direction,method:name,args:copy(args)});if(S.records.length>48){const expendable=S.records.findIndex(r=>r.method==='setSceneInfo');S.records.splice(expendable>=0?expendable:0,1);}}catch(e){S.errors.push(String(e));}
// [VI dòng gốc 17] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
   }
// [VI dòng gốc 18] Kết thúc hàm hiện tại và trả về: gọi native.apply(this, args).
   return native.apply(this,args);
// [VI dòng gốc 19] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  };
// [VI dòng gốc 20] gọi Object.defineProperty(obj, name, {value:fn,writable:true,configurable:true}) | gọi hooks.push({obj,name,fn,descriptor}) để thêm phần tử vào cuối mảng
  Object.defineProperty(obj,name,{value:fn,writable:true,configurable:true});hooks.push({obj,name,fn,descriptor});
// [VI dòng gốc 21] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
 }
// [VI dòng gốc 22] Định nghĩa hàm sync; tham số: không có | Kiểm tra !owned()||Date.now()>=S.until: đúng thì chạy nhánh sau if. | gọi stop() để dừng bộ điều khiển và dọn tài nguyên | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
 function sync(){if(!owned()||Date.now()>=S.until){stop();return;}
// [VI dòng gốc 23] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài.
  try{
// [VI dòng gốc 24] Khai báo biến không gán lại bằng const: room = đọc W._Ba?._cm?._u3t?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); trigram = đọc W._Ba?._n4t?._oun?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); model = đọc W._Ba?._n4t?._t4t?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
   const room=W._Ba?._cm?._u3t?.ins,trigram=W._Ba?._n4t?._oun?.ins,model=W._Ba?._n4t?._t4t?.ins;
// [VI dòng gốc 25] Duyệt từng giá trị trong ['creSerAreRoom','startTeamBossCopy','agrInviUSARoom','joinSerAreRoom'] bằng const name. | Khai báo biến không gán lại bằng const: name (chưa gán giá trị) | gọi attach(room, name, 'outgoing_native', args=>Number(args[0]?.[0])===6)
   for(const name of ['creSerAreRoom','startTeamBossCopy','agrInviUSARoom','joinSerAreRoom'])attach(room,name,'outgoing_native',args=>Number(args[0]?.[0])===6);
// [VI dòng gốc 26] Duyệt từng giá trị trong ['TrigramCopySetAreaId','TrigramCopyCreateTowner','_run','setTrigramCopyAutoTower'] bằng const name. | Khai báo biến không gán lại bằng const: name (chưa gán giá trị) | gọi attach(trigram, name, 'outgoing_native')
   for(const name of ['TrigramCopySetAreaId','TrigramCopyCreateTowner','_run','setTrigramCopyAutoTower'])attach(trigram,name,'outgoing_native');
// [VI dòng gốc 27] Duyệt từng giá trị trong ['setTrigramCopyInfo','setSceneInfo'] bằng const name. | Khai báo biến không gán lại bằng const: name (chưa gán giá trị) | gọi attach(model, name, 'incoming_model')
   for(const name of ['setTrigramCopyInfo','setSceneInfo'])attach(model,name,'incoming_model');
// [VI dòng gốc 28] Nhận lỗi bằng e và chạy phần xử lý lỗi. | Kiểm tra S.errors.length<8: đúng thì chạy nhánh sau if. | gọi S.errors.push(String(e)) để thêm phần tử vào cuối mảng
  }catch(e){if(S.errors.length<8)S.errors.push(String(e));}
// [VI dòng gốc 29] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
 }
// [VI dòng gốc 30] Định nghĩa hàm status; tham số: không có. Mục đích: trả trạng thái để kiểm tra | gọi sync() | Khai báo biến không gán lại bằng const: m = đọc W._Ba?._n4t?._t4t?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); cfg = đọc W._ft?._Esi?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
 function status(){sync();const m=W._Ba?._n4t?._t4t?.ins,cfg=W._ft?._Esi?.ins;
// [VI dòng gốc 31] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm actor, active, until, hooks, map, remainTimes, curType, curWave, types, records, errors, note.
  return {actor,active:Date.now()<S.until&&owned()&&hooks.length>0,until:S.until,hooks:hooks.map(h=>h.name),
// [VI dòng gốc 32] Thuộc tính map: đọc W._Ba?._$a?._yo?.ins?.intoSce?.[0] nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Thuộc tính remainTimes: đọc m?.remainTimes nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Thuộc tính curType: đọc m?.curType nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Thuộc tính curWave: đọc m?.curWare nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
   map:W._Ba?._$a?._yo?.ins?.intoSce?.[0],remainTimes:m?.remainTimes,curType:m?.curType,curWave:m?.curWare,
// [VI dòng gốc 33] Thuộc tính types: gọi Object.values(cfg?._Osh??{}).slice(0,8).map(r=>copy(r)) để biến đổi từng phần tử | Thuộc tính records: gọi S.records.map(r=>({...r,args:copy(r.args)})) để biến đổi từng phần tử | Thuộc tính args: gọi copy(r.args) | Thuộc tính errors: gọi S.errors.slice() để lấy một đoạn dữ liệu
   types:Object.values(cfg?._Osh??{}).slice(0,8).map(r=>copy(r)),records:S.records.map(r=>({...r,args:copy(r.args)})),errors:S.errors.slice(),
// [VI dòng gốc 34] Thuộc tính note: "Decoded native method arguments/model updates; not raw network packets. No requests sent by capture."
   note:'Decoded native method arguments/model updates; not raw network packets. No requests sent by capture.'};
// [VI dòng gốc 35] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
 }
// [VI dòng gốc 36] gán W.KVPV_CRYSTAL_CAPTURE bằng Object.freeze({status,stop}) | gọi sync()
 W.KVPV_CRYSTAL_CAPTURE=Object.freeze({status,stop});sync();
// [VI dòng gốc 37] Kiểm tra owned()&&Date.now()<S.until: đúng thì chạy nhánh sau if. | gán timer bằng (W.KVPV_V1?.timers?.setInterval??W.setInterval)(sync,1000)
 if(owned()&&Date.now()<S.until)timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(sync,1000);
// [VI dòng gốc 38] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: })();
})();
// [VI dòng gốc 39] Dòng trống để tách các phần, không có lệnh thực thi.
