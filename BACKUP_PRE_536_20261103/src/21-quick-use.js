// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: CHÚ THÍCH V1 — Dùng ngay vật phẩm trên popup Dùng nhanh.
/* CHÚ THÍCH V1 — Dùng ngay vật phẩm trên popup Dùng nhanh.
 * Độc lập hàng đợi Daily/scene: hook thông báo thay popup rồi hẹn một lượt JS mới.
 * Chỉ gọi đúng nút Dùng đang hiện, không tự quét túi, không bấm Mua/Xem/Đổi.
 * Đánh dấu trước khi gọi handler; số yêu cầu không phải số vật phẩm server xác nhận.
 */
// [VI dòng gốc 6] chạy ngay hàm bao để tạo phạm vi và khởi tạo phần chức năng bên trong
(() => {
// [VI dòng gốc 7] "use strict"
  'use strict';
// [VI dòng gốc 8] Khai báo biến không gán lại bằng const: W = window; old = đọc W.KVPV_QUICK_USE; carry = gọi old?._handoff(); chức năng nội bộ chưa xác minh từ tên hàm (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gọi old?.stop() để dừng bộ điều khiển và dọn tài nguyên (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  const W=window,old=W.KVPV_QUICK_USE,carry=old?._handoff?.();old?.stop?.();
// [VI dòng gốc 9] Khai báo biến không gán lại bằng const: actor = gọi String(W.__KVPV_OWN_ACTOR_ID||'') để chuyển sang chuỗi
  const actor=String(W.__KVPV_OWN_ACTOR_ID||'');
// [VI dòng gốc 10] Khai báo biến không gán lại bằng const: S = tạo đối tượng gồm enabled, timer, soon, hook, busy, sent, requests, lastItem, reason, lastError, history
  const S={enabled:true,timer:null,soon:null,hook:null,busy:false,
// [VI dòng gốc 11] Thuộc tính sent: tạo đối tượng bằng Set(carry?.actor===actor?carry.keys:[]) | Thuộc tính requests: nếu carry?.actor===actor thì lấy carry.requests, ngược lại lấy 0
    sent:new Set(carry?.actor===actor?carry.keys:[]),requests:carry?.actor===actor?carry.requests:0,
// [VI dòng gốc 12] Thuộc tính lastItem: null | Thuộc tính reason: "starting" | Thuộc tính lastError: "" | Thuộc tính history: tạo mảng gồm 0 vị trí: []
    lastItem:null,reason:'starting',lastError:'',history:[]};
// [VI dòng gốc 13] Khai báo biến không gán lại bằng const: model = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._Ba?._aJ?._hJ?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  const model=()=>W._Ba?._aJ?._hJ?.ins;
// [VI dòng gốc 14] Khai báo biến không gán lại bằng const: owned = tạo hàm với tham số (không có); mỗi lần gọi trả về actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'') và chỉ đánh giá vế phải khi vế trái truthy: !W.__KVPV_UNIVERSAL_HALTED
  const owned=()=>actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;
// [VI dòng gốc 15] Khai báo biến không gán lại bằng const: label = tạo hàm với tham số text; mỗi lần gọi trả về gọi String(text??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/gi,'d').trim().toLowerCase()
  const label=text=>String(text??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/gi,'d').trim().toLowerCase();
// [VI dòng gốc 16] Định nghĩa hàm note; tham số: event, item | gọi S.history.push({at:Date.now(),event,item}) để thêm phần tử vào cuối mảng | Kiểm tra S.history.length>60: đúng thì chạy nhánh sau if. | gọi S.history.shift()
  function note(event,item){S.history.push({at:Date.now(),event,item});if(S.history.length>60)S.history.shift();}
// [VI dòng gốc 17] Định nghĩa hàm detach; tham số: không có | Khai báo biến không gán lại bằng const: h = đọc S.hook | Kiểm tra h&&h.obj._Rst===h.fn: đúng thì chạy nhánh sau if. | Kiểm tra h.descriptor: đúng thì chạy nhánh sau if, sai thì chạy nhánh else.
  function detach(){const h=S.hook;if(h&&h.obj._Rst===h.fn){if(h.descriptor)Object.defineProperty(h.obj,'_Rst',h.descriptor);else delete h.obj._Rst;}S.hook=null;}
// [VI dòng gốc 18] Định nghĩa hàm schedule; tham số: không có | Kiểm tra !S.enabled||S.soon!==null: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  function schedule(){if(!S.enabled||S.soon!==null)return;
// [VI dòng gốc 19] gán S.soon bằng (W.KVPV_V1?.timers?.setTimeout??W.setTimeout)(()=>{S.soon=null;tick();},0) | gán S.soon bằng null | gọi tick() để xử lý một nhịp kiểm tra
    S.soon=(W.KVPV_V1?.timers?.setTimeout??W.setTimeout)(()=>{S.soon=null;tick();},0);
// [VI dòng gốc 20] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 21] Định nghĩa hàm attach; tham số: m
  function attach(m){
// [VI dòng gốc 22] Kiểm tra S.hook?.obj===m&&m?._Rst===S.hook.fn: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(S.hook?.obj===m&&m?._Rst===S.hook.fn)return;
// [VI dòng gốc 23] gọi detach() | Kiểm tra typeof m?._Rst!=='function': đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    detach();if(typeof m?._Rst!=='function')return;
// [VI dòng gốc 24] Khai báo biến không gán lại bằng const: descriptor = gọi Object.getOwnPropertyDescriptor(m, '_Rst') | Kiểm tra descriptor&&!descriptor.configurable: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    const descriptor=Object.getOwnPropertyDescriptor(m,'_Rst');if(descriptor&&!descriptor.configurable)return;
// [VI dòng gốc 25] Khai báo biến không gán lại bằng const: native = đọc m._Rst; fn = tạo hàm với tham số ...args | Khai báo biến không gán lại bằng const: result = gọi native.apply(this, args) | gọi schedule() | Kết thúc hàm hiện tại và trả về: result.
    const native=m._Rst,fn=function(...args){const result=native.apply(this,args);schedule();return result;};
// [VI dòng gốc 26] gọi Object.defineProperty(m, '_Rst', {value:fn,writable:true,configurable:true,enumerable:!!descriptor?.enumerable})
    Object.defineProperty(m,'_Rst',{value:fn,writable:true,configurable:true,enumerable:!!descriptor?.enumerable});
// [VI dòng gốc 27] gán S.hook bằng {obj:m,descriptor,fn}
    S.hook={obj:m,descriptor,fn};
// [VI dòng gốc 28] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 29] Định nghĩa hàm tick; tham số: không có. Mục đích: xử lý một nhịp kiểm tra | Kiểm tra S.busy||!S.enabled: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  function tick(){if(S.busy||!S.enabled)return;
// [VI dòng gốc 30] Kiểm tra W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true: đúng thì chạy nhánh sau if. | gán S.reason bằng 'priority_agree_popup' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true){S.reason='priority_agree_popup';return;}
// [VI dòng gốc 31] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài.
    try{
// [VI dòng gốc 32] Kiểm tra !owned(): đúng thì chạy nhánh sau if. | gọi stop() để dừng bộ điều khiển và dọn tài nguyên | gán S.reason bằng 'actor_or_session_changed' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      if(!owned()){stop();S.reason='actor_or_session_changed';return;}
// [VI dòng gốc 33] Khai báo biến không gán lại bằng const: m = gọi model() | gọi attach(m) | Khai báo biến không gán lại bằng const: popup = đọc m?._Wr nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); button = đọc popup?.useBtn nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
      const m=model();attach(m);const popup=m?._Wr,button=popup?.useBtn;
// [VI dòng gốc 34] Kiểm tra !popup?.parent||popup.destroyed===true||popup.visible===false: đúng thì chạy nhánh sau if. | gán S.reason bằng 'waiting_popup' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      if(!popup?.parent||popup.destroyed===true||popup.visible===false){S.reason='waiting_popup';return;}
// [VI dòng gốc 35] Kiểm tra !button||button.visible===false||button.disabled===true||button.gray===true||label(button.label)!=='dung': đúng thì chạy nhánh sau if.
      if(!button||button.visible===false||button.disabled===true||button.gray===true||label(button.label)!=='dung'){
// [VI dòng gốc 36] gán S.reason bằng 'not_an_enabled_use_button' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
        S.reason='not_an_enabled_use_button';return;
// [VI dòng gốc 37] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
      }
// [VI dòng gốc 38] Khai báo biến không gán lại bằng const: item = gọi popup.getItem() để đọc giá trị đã lưu (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); id = gọi Number(item?.[0]) để chuyển sang số; count = gọi Number(item?.[1]) để chuyển sang số; uid = đọc item?.[2] nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
      const item=popup.getItem?.(),id=Number(item?.[0]),count=Number(item?.[1]),uid=item?.[2];
// [VI dòng gốc 39] Kiểm tra !Array.isArray(item)||!Number.isSafeInteger(id)||id<=0||!Number.isFinite(count)||count<=0||uid==null||typeof popup._M_0!=='function': đúng thì chạy nhánh sau if.
      if(!Array.isArray(item)||!Number.isSafeInteger(id)||id<=0||!Number.isFinite(count)||count<=0||uid==null||typeof popup._M_0!=='function'){
// [VI dòng gốc 40] gán S.reason bằng 'waiting_native_item' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
        S.reason='waiting_native_item';return;
// [VI dòng gốc 41] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
      }
// [VI dòng gốc 42] Khai báo biến không gán lại bằng const: key = tính biểu thức id+'/'+String(uid)+'/'+count
      const key=id+'/'+String(uid)+'/'+count;
// [VI dòng gốc 43] Kiểm tra S.sent.has(key): đúng thì chạy nhánh sau if. | gán S.reason bằng 'already_requested' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      if(S.sent.has(key)){S.reason='already_requested';return;}
// [VI dòng gốc 44] Khai báo biến không gán lại bằng const: bag = đọc W._Ba?._Ic?._aQ?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
      const bag=W._Ba?._Ic?._aQ?.ins;
// [VI dòng gốc 45] Kiểm tra typeof bag?.getItemByIdAndUid==='function'&&!bag.getItemByIdAndUid(id,uid): đúng thì chạy nhánh sau if.
      if(typeof bag?.getItemByIdAndUid==='function'&&!bag.getItemByIdAndUid(id,uid)){
// [VI dòng gốc 46] gán S.reason bằng 'item_no_longer_in_bag' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
        S.reason='item_no_longer_in_bag';return;
// [VI dòng gốc 47] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
      }
// [VI dòng gốc 48] gọi S.sent.add(key) | Lặp khi điều kiện còn đúng: S.sent.size>500 | gọi S.sent.delete(S.sent.values().next().value)
      S.sent.add(key);while(S.sent.size>500)S.sent.delete(S.sent.values().next().value);
// [VI dòng gốc 49] gán S.busy bằng true | gán S.lastItem bằng {id,uid:String(uid),count} | tăng S.requests một đơn vị sau khi lấy giá trị | gán S.reason bằng 'native_use_requested'
      S.busy=true;S.lastItem={id,uid:String(uid),count};S.requests++;S.reason='native_use_requested';note('USE-REQUEST',S.lastItem);
// [VI dòng gốc 50] Chú thích gốc của tác giả; không được thực thi. Nội dung: Handler của game tự dùng vật phẩm/mở lựa chọn cần thiết và chuyển popup kế tiếp.
      // Handler của game tự dùng vật phẩm/mở lựa chọn cần thiết và chuyển popup kế tiếp.
// [VI dòng gốc 51] gọi popup._M_0(); chức năng nội bộ chưa xác minh từ tên hàm
      popup._M_0();
// [VI dòng gốc 52] Nhận lỗi bằng e và chạy phần xử lý lỗi. | gán S.lastError bằng String(e?.message||e) | gán S.reason bằng 'error'
    }catch(e){S.lastError=String(e?.message||e);S.reason='error';}
// [VI dòng gốc 53] gán S.busy bằng false
    finally{S.busy=false;}
// [VI dòng gốc 54] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 55] Định nghĩa hàm status; tham số: không có. Mục đích: trả trạng thái để kiểm tra | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm enabled, actorId, pollMs, asynchronous, hookAttached, requests, lastItem, reason, lastError, history, note.
  function status(){return {enabled:S.enabled,actorId:actor,pollMs:50,asynchronous:true,
// [VI dòng gốc 56] Thuộc tính hookAttached: đảo giá trị đúng/sai của !S.hook | Thuộc tính requests: đọc S.requests | Thuộc tính lastItem: nếu S.lastItem thì lấy {...S.lastItem}, ngược lại lấy null | Thuộc tính reason: đọc S.reason
    hookAttached:!!S.hook,requests:S.requests,lastItem:S.lastItem?{...S.lastItem}:null,reason:S.reason,lastError:S.lastError,
// [VI dòng gốc 57] Thuộc tính history: gọi S.history.map(x=>({...x,item:x.item?{...x.item}:null})) để biến đổi từng phần tử | Thuộc tính item: nếu x.item thì lấy {...x.item}, ngược lại lấy null
    history:S.history.map(x=>({...x,item:x.item?{...x.item}:null})),
// [VI dòng gốc 58] Thuộc tính note: "Visible native Use popup only; independent of Daily. Requests are not server consumption confirmations."
    note:'Visible native Use popup only; independent of Daily. Requests are not server consumption confirmations.'};}
// [VI dòng gốc 59] Định nghĩa hàm stop; tham số: không có. Mục đích: dừng bộ điều khiển và dọn tài nguyên | gán S.enabled bằng false
  function stop(){S.enabled=false;
// [VI dòng gốc 60] Kiểm tra S.timer!==null: đúng thì chạy nhánh sau if. | gọi W.KVPV_V1?.timers?.clearInterval??W.clearInterval(S.timer) | gán S.timer bằng null
    if(S.timer!==null){(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;}
// [VI dòng gốc 61] Kiểm tra S.soon!==null: đúng thì chạy nhánh sau if. | gọi W.KVPV_V1?.timers?.clearTimeout??W.clearTimeout(S.soon) | gán S.soon bằng null
    if(S.soon!==null){(W.KVPV_V1?.timers?.clearTimeout??W.clearTimeout)(S.soon);S.soon=null;}
// [VI dòng gốc 62] gọi detach() | gán S.reason bằng 'stopped' | Kết thúc hàm hiện tại và trả về: gọi status() để trả trạng thái để kiểm tra.
    detach();S.reason='stopped';return status();
// [VI dòng gốc 63] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 64] Định nghĩa hàm start; tham số: không có. Mục đích: khởi động bộ điều khiển | gán S.enabled bằng true | Kiểm tra S.timer===null: đúng thì chạy nhánh sau if. | gán S.timer bằng (W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,50)
  function start(){S.enabled=true;if(S.timer===null)S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,50);schedule();return status();}
// [VI dòng gốc 65] gán W.KVPV_QUICK_USE bằng Object.freeze({start,stop,status,sync:schedule, _handoff:()=>({actor,keys:[...S.sent],requests:S.requests})})
  W.KVPV_QUICK_USE=Object.freeze({start,stop,status,sync:schedule,
// [VI dòng gốc 66] gọi start() để khởi động bộ điều khiển
    _handoff:()=>({actor,keys:[...S.sent],requests:S.requests})});start();
// [VI dòng gốc 67] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: })();
})();
// [VI dòng gốc 68] Dòng trống để tách các phần, không có lệnh thực thi.
