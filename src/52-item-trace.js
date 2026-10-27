// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: Read-only native inventory notifications; no socket interception, use or replay. [đóng chú thích]
/* Read-only native inventory notifications; no socket interception, use or replay. */
// [VI dòng gốc 2] chạy ngay hàm bao để tạo phạm vi và khởi tạo phần chức năng bên trong
(() => {
// [VI dòng gốc 3] "use strict" | Khai báo biến không gán lại bằng const: W = window; old = đọc W.KVPV_ITEM_TRACE; c = gọi old?._handoff(); chức năng nội bộ chưa xác minh từ tên hàm (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gọi old?.stop() để dừng bộ điều khiển và dọn tài nguyên (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
 'use strict';const W=window,old=W.KVPV_ITEM_TRACE,c=old?._handoff?.();old?.stop?.();
// [VI dòng gốc 4] Khai báo biến không gán lại bằng const: actor = gọi String(W.__KVPV_OWN_ACTOR_ID||'') để chuyển sang chuỗi; same = tính biểu thức c?.actor===actor
 const actor=String(W.__KVPV_OWN_ACTOR_ID||''),same=c?.actor===actor;
// [VI dòng gốc 5] Khai báo biến không gán lại bằng const: S = tạo đối tượng gồm enabled, seeded, stacks, history, serial, partial, error; owner = tạo đối tượng gồm
 const S={enabled:true,seeded:same?c.seeded:false,stacks:new Map(same?c.stacks:[]),history:same?c.history:[],serial:same?c.serial:0,partial:same?c.partial:false,error:''},owner={};
// [VI dòng gốc 6] Khai báo biến không gán lại bằng const: bag = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._Ba?._Ic?._aQ?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); owned = tạo hàm với tham số (không có); mỗi lần gọi trả về actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'') và chỉ đánh giá vế phải khi vế trái truthy: !W.__KVPV_UNIVERSAL_HALTED
 const bag=()=>W._Ba?._Ic?._aQ?.ins,owned=()=>actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;
// [VI dòng gốc 7] Định nghĩa hàm parse; tham số: item. Mục đích: phân tích dữ liệu đầu vào theo API đang gọi | Kiểm tra !Array.isArray(item): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: null. | Khai báo biến không gán lại bằng const: id = gọi Number(item[0]) để chuyển sang số; count = gọi Number(item[1]) để chuyển sang số; uid = gọi String(item[2]??'') để chuyển sang chuỗi
 function parse(item){if(!Array.isArray(item))return null;const id=Number(item[0]),count=Number(item[1]),uid=String(item[2]??'');return Number.isSafeInteger(id)&&id>0&&Number.isSafeInteger(count)&&count>=0&&uid.length>0&&uid.length<=50?{id,count,uid}:null;}
// [VI dòng gốc 8] Định nghĩa hàm seed; tham số: không có | Kiểm tra S.seeded||!owned()||bag()?.isBagInited!==true: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể. | Khai báo biến có thể gán lại bằng let: n = 0
 function seed(){if(S.seeded||!owned()||bag()?.isBagInited!==true)return;let n=0;
// [VI dòng gốc 9] Lặp for: khởi tạo let b=0; tiếp tục khi b<15; sau mỗi vòng b++. | Khai báo biến có thể gán lại bằng let: b = 0 | Khai báo biến không gán lại bằng const: rows = gọi bag().getItemsByBagType(b) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Kiểm tra !Array.isArray(rows): đúng thì chạy nhánh sau if.
  for(let b=0;b<15;b++){const rows=bag().getItemsByBagType?.(b);if(!Array.isArray(rows))continue;for(const item of rows){const r=parse(item);if(r)S.stacks.set(r.id+'/'+r.uid,r);if(++n>=2000){S.partial=true;break;}}if(n>=2000)break;}S.seeded=true;
// [VI dòng gốc 10] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
 }
// [VI dòng gốc 11] Định nghĩa hàm record; tham số: before, after, reason, event
 function record(before,after,reason,event){
// [VI dòng gốc 12] Kiểm tra before&&before.count===after.count: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  if(before&&before.count===after.count)return;
// [VI dòng gốc 13] gọi S.history.push({serial:++S.serial,at:Date.now(),id:after.id,uid:after.uid,before:before?.count??null,after:after.count,delta:before?aft…) để thêm phần tử vào cuối mảng
  S.history.push({serial:++S.serial,at:Date.now(),id:after.id,uid:after.uid,before:before?.count??null,after:after.count,delta:before?after.count-before.count:null,sourceCode:typeof reason==='number'||typeof reason==='string'?String(reason).slice(0,80):null,event,map:Number(W._C?._Mn?._Cn?.currentID)||null,job:String(W.KVPV_DAILY?.quickState?.()?.job??'').slice(0,60),evidence:'native_client_inventory_notification'});
// [VI dòng gốc 14] Kiểm tra S.history.length>80: đúng thì chạy nhánh sau if. | gọi S.history.shift()
  if(S.history.length>80)S.history.shift();
// [VI dòng gốc 15] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
 }
// [VI dòng gốc 16] Định nghĩa hàm add; tham số: item, reason | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | Kiểm tra !S.enabled||!owned(): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
 function add(item,reason){try{if(!S.enabled||!owned())return;const r=parse(item);if(!r)return;const key=r.id+'/'+r.uid,before=S.stacks.get(key);record(before,r,reason,5457);S.stacks.set(key,r);trim();}catch(e){S.error=String(e);}}
// [VI dòng gốc 17] Định nghĩa hàm remove; tham số: uid | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | Kiểm tra !S.enabled||!owned(): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
 function remove(uid){try{if(!S.enabled||!owned())return;uid=String(uid);for(const [key,before]of S.stacks)if(before.uid===uid){const item=bag()?.getItemByIdAndUid?.(before.id,uid),r=parse(item);
// [VI dòng gốc 18] Chú thích gốc của tác giả; không được thực thi. Nội dung: A UID lookup is bag-scoped: never associate a different item ID with this stack.
   // A UID lookup is bag-scoped: never associate a different item ID with this stack.
// [VI dòng gốc 19] Kiểm tra r&&r.id!==before.id: đúng thì chạy nhánh sau if. | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
   if(r&&r.id!==before.id)continue;
// [VI dòng gốc 20] Kiểm tra !item&&typeof bag()?.getItemByIdAndUid!=='function': đúng thì chạy nhánh sau if. | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
   if(!item&&typeof bag()?.getItemByIdAndUid!=='function')continue;
// [VI dòng gốc 21] Khai báo biến không gán lại bằng const: after = r hoặc dùng vế phải khi vế trái là null/undefined: {...before,count:0} | gọi record(before, after, null, 5077) | Kiểm tra after.count===0: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gọi S.stacks.delete(key)
   const after=r??{...before,count:0};record(before,after,null,5077);if(after.count===0)S.stacks.delete(key);else S.stacks.set(key,after);
// [VI dòng gốc 22] Nhận lỗi bằng e và chạy phần xử lý lỗi. | gán S.error bằng String(e)
  }}catch(e){S.error=String(e);}}
// [VI dòng gốc 23] Định nghĩa hàm trim; tham số: không có | Lặp khi điều kiện còn đúng: S.stacks.size>2000 | gán S.partial bằng true | gọi S.stacks.delete(S.stacks.keys().next().value)
 function trim(){while(S.stacks.size>2000){S.partial=true;S.stacks.delete(S.stacks.keys().next().value);}}
// [VI dòng gốc 24] Định nghĩa hàm stop; tham số: không có. Mục đích: dừng bộ điều khiển và dọn tài nguyên | gán S.enabled bằng false | Khai báo biến không gán lại bằng const: n = đọc W._Sa?.notify nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gọi n?.off(5457, owner, add) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
 function stop(){S.enabled=false;const n=W._Sa?.notify;n?.off?.(5457,owner,add);n?.off?.(5077,owner,remove);n?.off?.(5074,owner,seed);n?.off?.(5078,owner,seed);}
// [VI dòng gốc 25] Khai báo biến không gán lại bằng const: n = đọc W._Sa?.notify nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Kiểm tra typeof n?.on==='function'&&typeof n?.off==='function': đúng thì chạy nhánh sau if. | gọi n.on(5457, owner, add) | gọi n.on(5077, owner, remove)
 const n=W._Sa?.notify;if(typeof n?.on==='function'&&typeof n?.off==='function'){n.on(5457,owner,add);n.on(5077,owner,remove);n.on(5074,owner,seed);n.on(5078,owner,seed);}seed();
// [VI dòng gốc 26] gán W.KVPV_ITEM_TRACE bằng Object.freeze({stop,status:()=>({enabled:S.enabled,seeded:S.seeded,partial:S.partial,changes:S.serial,lastError:S.error,recent:S.history.slice(-16),note:'Native client notification…
 W.KVPV_ITEM_TRACE=Object.freeze({stop,status:()=>({enabled:S.enabled,seeded:S.seeded,partial:S.partial,changes:S.serial,lastError:S.error,recent:S.history.slice(-16),note:'Native client notifications only. Source codes are untranslated; map/job are context, not proof of origin. No server ownership guarantee.'}),_handoff:()=>({actor,seeded:S.seeded,stacks:[...S.stacks],history:S.history,serial:S.serial,partial:S.partial})});
// [VI dòng gốc 27] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: })();
})();
// [VI dòng gốc 28] Dòng trống để tách các phần, không có lệnh thực thi.
