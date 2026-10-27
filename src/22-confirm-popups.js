// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: CHÚ THÍCH V1 — Đồng ý popup bằng lượt xử lý riêng, không chờ Daily.
/* CHÚ THÍCH V1 — Đồng ý popup bằng lượt xử lý riêng, không chờ Daily.
 * Mặc định đóng thông báo không có callback hành động và kết quả trận đã nhận diện.
 * Không tự chạy callback chưa xác minh miễn phí, dù nhãn nút là Đồng ý.
 * Hook open chỉ hẹn xử lý; nút native vẫn thực hiện hành động và kiểm tra của game.
 */
// [VI dòng gốc 6] chạy ngay hàm bao để tạo phạm vi và khởi tạo phần chức năng bên trong
(() => {
// [VI dòng gốc 7] "use strict"
  'use strict';
// [VI dòng gốc 8] Khai báo biến không gán lại bằng const: W = window; old = đọc W.KVPV_CONFIRM_POPUPS; carry = gọi old?._handoff(); chức năng nội bộ chưa xác minh từ tên hàm (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gọi old?.stop() để dừng bộ điều khiển và dọn tài nguyên (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  const W=window,old=W.KVPV_CONFIRM_POPUPS,carry=old?._handoff?.();old?.stop?.();
// [VI dòng gốc 9] Khai báo biến không gán lại bằng const: actor = gọi String(W.__KVPV_OWN_ACTOR_ID||'') để chuyển sang chuỗi
  const actor=String(W.__KVPV_OWN_ACTOR_ID||'');
// [VI dòng gốc 10] Khai báo biến không gán lại bằng const: S = tạo đối tượng gồm enabled, confirmAll, timer, soon, hook, busy, lastPriorityScan, priorityUntil, generations, seen, requests, reason, lastError, skipped, history
  const S={enabled:true,confirmAll:true,timer:null,soon:null,hook:null,busy:false,lastPriorityScan:-Infinity,priorityUntil:0,
// [VI dòng gốc 11] Thuộc tính generations: tạo đối tượng bằng Map(carry?.actor===actor?carry.generations:[]) | Thuộc tính seen: tạo đối tượng bằng Map(carry?.actor===actor?carry.seen:[])
    generations:new Map(carry?.actor===actor?carry.generations:[]),seen:new Map(carry?.actor===actor?carry.seen:[]),
// [VI dòng gốc 12] Thuộc tính requests: nếu carry?.actor===actor thì lấy carry.requests, ngược lại lấy 0 | Thuộc tính reason: "starting" | Thuộc tính lastError: "" | Thuộc tính skipped: tạo mảng gồm 0 vị trí: []
    requests:carry?.actor===actor?carry.requests:0,reason:'starting',lastError:'',skipped:[],history:[]};
// [VI dòng gốc 13] Khai báo biến không gán lại bằng const: ui = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._ft?._Y4n?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  const ui=()=>W._ft?._Y4n?.ins;
// [VI dòng gốc 14] Khai báo biến không gán lại bằng const: owned = tạo hàm với tham số (không có); mỗi lần gọi trả về actor&&String(W._Ba?._rJ?._O$?.ins?.actorId??'')===actor và chỉ đánh giá vế phải khi vế trái truthy: !W.__KVPV_UNIVERSAL_HALTED
  const owned=()=>actor&&String(W._Ba?._rJ?._O$?.ins?.actorId??'')===actor&&!W.__KVPV_UNIVERSAL_HALTED;
// [VI dòng gốc 15] Khai báo biến không gán lại bằng const: norm = tạo hàm với tham số text; mỗi lần gọi trả về gọi String(text??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/gi,'d').trim().toLowerCase()
  const norm=text=>String(text??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/gi,'d').trim().toLowerCase();
// [VI dòng gốc 16] Khai báo biến không gán lại bằng const: agree = tạo hàm với tham số button; mỗi lần gọi trả về button&&button.visible!==false&&button.disabled!==true&&button.gray!==true và chỉ đánh giá vế phải khi vế trái truthy: /^dong y\s*(?:\(\s*\d+\s*\))?$/.test(norm(button.label))
  const agree=button=>button&&button.visible!==false&&button.disabled!==true&&button.gray!==true&&/^dong y\s*(?:\(\s*\d+\s*\))?$/.test(norm(button.label));
// [VI dòng gốc 17] Định nghĩa hàm detach; tham số: không có | Khai báo biến không gán lại bằng const: h = đọc S.hook | Kiểm tra h&&h.obj.open===h.fn: đúng thì chạy nhánh sau if. | Kiểm tra h.descriptor: đúng thì chạy nhánh sau if, sai thì chạy nhánh else.
  function detach(){const h=S.hook;if(h&&h.obj.open===h.fn){if(h.descriptor)Object.defineProperty(h.obj,'open',h.descriptor);else delete h.obj.open;}S.hook=null;}
// [VI dòng gốc 18] Định nghĩa hàm schedule; tham số: không có | Kiểm tra !S.enabled||S.soon!==null: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể. | gán S.soon bằng (W.KVPV_V1?.timers?.setTimeout??W.setTimeout)(()=>{S.soon=null;tick();},0)
  function schedule(){if(!S.enabled||S.soon!==null)return;S.soon=(W.KVPV_V1?.timers?.setTimeout??W.setTimeout)(()=>{S.soon=null;tick();},0);}
// [VI dòng gốc 19] Định nghĩa hàm attach; tham số: manager | Kiểm tra S.hook?.obj===manager&&manager?.open===S.hook.fn: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  function attach(manager){if(S.hook?.obj===manager&&manager?.open===S.hook.fn)return;
// [VI dòng gốc 20] gọi detach() | Kiểm tra typeof manager?.open!=='function': đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    detach();if(typeof manager?.open!=='function')return;
// [VI dòng gốc 21] Khai báo biến không gán lại bằng const: descriptor = gọi Object.getOwnPropertyDescriptor(manager, 'open') | Kiểm tra descriptor&&!descriptor.configurable: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    const descriptor=Object.getOwnPropertyDescriptor(manager,'open');if(descriptor&&!descriptor.configurable)return;
// [VI dòng gốc 22] Khai báo biến không gán lại bằng const: native = đọc manager.open; fn = tạo hàm với tham số id, ...args | Khai báo biến không gán lại bằng const: result = gọi native.call(this, id, ...args); key = gọi Number(id) để chuyển sang số
    const native=manager.open,fn=function(id,...args){const result=native.call(this,id,...args),key=Number(id);
// [VI dòng gốc 23] gọi S.generations.set(key, (S.generations.get(key)||0)+1) | Kiểm tra S.generations.size>200: đúng thì chạy nhánh sau if. | gọi S.generations.delete(S.generations.keys().next().value) | gọi schedule()
      S.generations.set(key,(S.generations.get(key)||0)+1);if(S.generations.size>200)S.generations.delete(S.generations.keys().next().value);schedule();return result;};
// [VI dòng gốc 24] gọi Object.defineProperty(manager, 'open', {value:fn,writable:true,configurable:true,enumerable:!!descriptor?.enumerable}) | gán S.hook bằng {obj:manager,fn,descriptor}
    Object.defineProperty(manager,'open',{value:fn,writable:true,configurable:true,enumerable:!!descriptor?.enumerable});S.hook={obj:manager,fn,descriptor};
// [VI dòng gốc 25] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 26] Định nghĩa hàm tick; tham số: không có. Mục đích: xử lý một nhịp kiểm tra | Kiểm tra !S.enabled||S.busy: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: false. | gán S.busy bằng true
  function tick(){if(!S.enabled||S.busy)return false;S.busy=true;try{
// [VI dòng gốc 27] Kiểm tra !owned(): đúng thì chạy nhánh sau if. | gọi stop() để dừng bộ điều khiển và dọn tài nguyên | gán S.reason bằng 'actor_or_session_changed' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(!owned()){stop();S.reason='actor_or_session_changed';return;}
// [VI dòng gốc 28] Khai báo biến không gán lại bằng const: manager = gọi ui() | gọi attach(manager) | gán S.skipped bằng []
    const manager=ui();attach(manager);S.skipped=[];
// [VI dòng gốc 29] Chú thích gốc của tác giả; không được thực thi. Nội dung: Native window 118 = Quà Nạp Lần Đầu. Chỉ đóng cửa sổ, không chạm nút nạp/nhận.
    // Native window 118 = Quà Nạp Lần Đầu. Chỉ đóng cửa sổ, không chạm nút nạp/nhận.
// [VI dòng gốc 30] Kiểm tra manager?.isOpened?.(118)===true&&typeof manager.close==='function': đúng thì chạy nhánh sau if.
    if(manager?.isOpened?.(118)===true&&typeof manager.close==='function'){
// [VI dòng gốc 31] gọi manager.close(118) | tăng S.requests một đơn vị sau khi lấy giá trị | gán S.reason bằng 'first_recharge_closed'
      manager.close(118);S.requests++;S.reason='first_recharge_closed';
// [VI dòng gốc 32] gọi S.history.push({at:Date.now(),id:118,kind:'first_recharge_close'}) để thêm phần tử vào cuối mảng | Kiểm tra S.history.length>60: đúng thì chạy nhánh sau if. | gọi S.history.shift()
      S.history.push({at:Date.now(),id:118,kind:'first_recharge_close'});if(S.history.length>60)S.history.shift();
// [VI dòng gốc 33] gán S.priorityUntil bằng Date.now()+10 | gọi schedule() | Kết thúc hàm hiện tại và trả về: true.
      S.priorityUntil=Date.now()+10;schedule();return true;
// [VI dòng gốc 34] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 35] Chú thích gốc của tác giả; không được thực thi. Nội dung: Mua Nhanh 1/3/6 TKP + nút gộp 8 TKP: đúng lớp native OneBuy _fBi.
    // Mua Nhanh 1/3/6 TKP + nút gộp 8 TKP: đúng lớp native OneBuy _fBi.
// [VI dòng gốc 36] Chú thích gốc của tác giả; không được thực thi. Nội dung: Duyệt cả bảng đang mở để không phụ thuộc ID cửa sổ ở từng bản client.
    // Duyệt cả bảng đang mở để không phụ thuộc ID cửa sổ ở từng bản client.
// [VI dòng gốc 37] Khai báo biến không gán lại bằng const: quickBuyClasses = gọi [W._Ba?._LJ?._eBi,W._Ba?._LJ?._fBi].filter(c=>typeof c==='function') để giữ phần tử thỏa điều kiện
    const quickBuyClasses=[W._Ba?._LJ?._eBi,W._Ba?._LJ?._fBi].filter(c=>typeof c==='function');
// [VI dòng gốc 38] Kiểm tra quickBuyClasses.length&&typeof manager?.close==='function': đúng thì chạy nhánh sau if.
    if(quickBuyClasses.length&&typeof manager?.close==='function')
// [VI dòng gốc 39] Duyệt từng giá trị trong new Set([372,802,...Object.keys(manager.openTable||manager._H$t||{}).map(Number)]) bằng const id. | Khai báo biến không gán lại bằng const: id (chưa gán giá trị)
      for(const id of new Set([372,802,...Object.keys(manager.openTable||manager._H$t||{}).map(Number)])){
// [VI dòng gốc 40] Kiểm tra manager.isOpened?.(id)!==true: đúng thì chạy nhánh sau if. | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
        if(manager.isOpened?.(id)!==true)continue;
// [VI dòng gốc 41] Khai báo biến không gán lại bằng const: panel = manager.getDialogById?.(id) hoặc dùng vế phải khi vế trái falsy: manager.getPanelById?.(id)
        const panel=manager.getDialogById?.(id)||manager.getPanelById?.(id);
// [VI dòng gốc 42] Kiểm tra !quickBuyClasses.some(c=>panel instanceof c)||!panel.parent||panel.visible===false: đúng thì chạy nhánh sau if. | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
        if(!quickBuyClasses.some(c=>panel instanceof c)||!panel.parent||panel.visible===false)continue;
// [VI dòng gốc 43] gọi manager.close(id) | tăng S.requests một đơn vị sau khi lấy giá trị | gán S.reason bằng 'quick_buy_closed'
        manager.close(id);S.requests++;S.reason='quick_buy_closed';
// [VI dòng gốc 44] gọi S.history.push({at:Date.now(),id,kind:'quick_buy_close'}) để thêm phần tử vào cuối mảng | Kiểm tra S.history.length>60: đúng thì chạy nhánh sau if. | gọi S.history.shift()
        S.history.push({at:Date.now(),id,kind:'quick_buy_close'});if(S.history.length>60)S.history.shift();
// [VI dòng gốc 45] gán S.priorityUntil bằng Date.now()+10 | gọi schedule() | Kết thúc hàm hiện tại và trả về: true.
        S.priorityUntil=Date.now()+10;schedule();return true;
// [VI dòng gốc 46] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
      }
// [VI dòng gốc 47] Chú thích gốc của tác giả; không được thực thi. Nội dung: Native shared activation showcase (window 92): outside click calls close().
    // Native shared activation showcase (window 92): outside click calls close().
// [VI dòng gốc 48] Chú thích gốc của tác giả; không được thực thi. Nội dung: Applies to CoBao and the other cosmetic/item activation variants of this class.
    // Applies to CoBao and the other cosmetic/item activation variants of this class.
// [VI dòng gốc 49] Khai báo biến không gán lại bằng const: Showcase = đọc W._Ba?._Ytt?._yti nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const Showcase=W._Ba?._Ytt?._yti;
// [VI dòng gốc 50] Kiểm tra typeof Showcase==='function'&&typeof Showcase.prototype.close==='function': đúng thì chạy nhánh sau if.
    if(typeof Showcase==='function'&&typeof Showcase.prototype.close==='function')
// [VI dòng gốc 51] Duyệt từng giá trị trong new Set([92,...Object.keys(manager?.openTable||manager?._H$t||{}).map(Number)]) bằng const id. | Khai báo biến không gán lại bằng const: id (chưa gán giá trị)
      for(const id of new Set([92,...Object.keys(manager?.openTable||manager?._H$t||{}).map(Number)])){
// [VI dòng gốc 52] Kiểm tra manager?.isOpened?.(id)!==true: đúng thì chạy nhánh sau if. | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
        if(manager?.isOpened?.(id)!==true)continue;
// [VI dòng gốc 53] Khai báo biến không gán lại bằng const: panel = manager.getPanelById?.(id) hoặc dùng vế phải khi vế trái falsy: manager.getDialogById?.(id)
        const panel=manager.getPanelById?.(id)||manager.getDialogById?.(id);
// [VI dòng gốc 54] Kiểm tra !(panel instanceof Showcase)||panel.close!==Showcase.prototype.close||panel.closeOnSide!==true|| !panel.parent||panel.visible===false||panel.destroyed===true: đúng thì chạy nhánh sau if.
        if(!(panel instanceof Showcase)||panel.close!==Showcase.prototype.close||panel.closeOnSide!==true||
// [VI dòng gốc 55] Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
          !panel.parent||panel.visible===false||panel.destroyed===true)continue;
// [VI dòng gốc 56] Khai báo biến không gán lại bằng const: generation = S.generations.get(id) hoặc dùng vế phải khi vế trái falsy: 0; seen = gọi S.seen.get(id)
        const generation=S.generations.get(id)||0,seen=S.seen.get(id);
// [VI dòng gốc 57] Kiểm tra seen?.panel===panel&&seen.generation===generation: đúng thì chạy nhánh sau if. | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
        if(seen?.panel===panel&&seen.generation===generation)continue;
// [VI dòng gốc 58] gọi S.seen.set(id, {panel,generation}) | Kiểm tra S.seen.size>200: đúng thì chạy nhánh sau if. | gọi S.seen.delete(S.seen.keys().next().value)
        S.seen.set(id,{panel,generation});if(S.seen.size>200)S.seen.delete(S.seen.keys().next().value);
// [VI dòng gốc 59] tăng S.requests một đơn vị sau khi lấy giá trị | gán S.reason bằng 'activation_showcase_closed'
        S.requests++;S.reason='activation_showcase_closed';
// [VI dòng gốc 60] gọi S.history.push({at:Date.now(),id,kind:'activation_showcase_close'}) để thêm phần tử vào cuối mảng | Kiểm tra S.history.length>60: đúng thì chạy nhánh sau if. | gọi S.history.shift()
        S.history.push({at:Date.now(),id,kind:'activation_showcase_close'});if(S.history.length>60)S.history.shift();
// [VI dòng gốc 61] gọi panel.close() | gán S.priorityUntil bằng Date.now()+10 | gọi schedule() | Kết thúc hàm hiện tại và trả về: true.
        panel.close();S.priorityUntil=Date.now()+10;schedule();return true;
// [VI dòng gốc 62] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
      }
// [VI dòng gốc 63] Khai báo biến không gán lại bằng const: ids = tạo đối tượng bằng Set([12,1293,...Object.keys(manager?.openTable||manager?._H$t||{}).map(Number)])
    const ids=new Set([12,1293,...Object.keys(manager?.openTable||manager?._H$t||{}).map(Number)]);
// [VI dòng gốc 64] Duyệt từng giá trị trong ids bằng const id. | Khai báo biến không gán lại bằng const: id (chưa gán giá trị)
    for(const id of ids){
// [VI dòng gốc 65] Kiểm tra manager?.isOpened?.(id)!==true: đúng thì chạy nhánh sau if. | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
      if(manager?.isOpened?.(id)!==true)continue;
// [VI dòng gốc 66] Khai báo biến không gán lại bằng const: panel = manager.getPanelById?.(id) hoặc dùng vế phải khi vế trái falsy: manager.getDialogById?.(id); button = đọc panel?.okBtn nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
      const panel=manager.getPanelById?.(id)||manager.getDialogById?.(id),button=panel?.okBtn;
// [VI dòng gốc 67] Kiểm tra !panel||panel.destroyed===true||panel.visible===false||!panel.parent||!agree(button): đúng thì chạy nhánh sau if. | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
      if(!panel||panel.destroyed===true||panel.visible===false||!panel.parent||!agree(button))continue;
// [VI dòng gốc 68] Khai báo biến không gán lại bằng const: generation = S.generations.get(id) hoặc dùng vế phải khi vế trái falsy: 0; seen = gọi S.seen.get(id)
      const generation=S.generations.get(id)||0,seen=S.seen.get(id);
// [VI dòng gốc 69] Kiểm tra seen?.panel===panel&&seen.generation===generation: đúng thì chạy nhánh sau if. | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
      if(seen?.panel===panel&&seen.generation===generation)continue;
// [VI dòng gốc 70] Chú thích gốc của tác giả; không được thực thi. Nội dung: Không dùng việc thiếu từ KNB để kết luận callback là miễn phí.
      // Không dùng việc thiếu từ KNB để kết luận callback là miễn phí.
// [VI dòng gốc 71] Khai báo biến không gán lại bằng const: content = gọi norm([panel.contentTxt?.innerHTML,panel.contentTxt?.text,panel.content,panel.title].filter(Boolean).join(' '))
      const content=norm([panel.contentTxt?.innerHTML,panel.contentTxt?.text,panel.content,panel.title].filter(Boolean).join(' '));
// [VI dòng gốc 72] Khai báo biến không gán lại bằng const: Result = đọc W._Ba?._sst?._EVn nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
      const Result=W._Ba?._sst?._EVn;
// [VI dòng gốc 73] Khai báo biến không gán lại bằng const: nativeResult = typeof Result==='function'&&panel instanceof Result&&typeof Result.prototype.close==='function' và chỉ đánh giá vế phải khi vế trái truthy: panel.close===Result.prototype.close
      const nativeResult=typeof Result==='function'&&panel instanceof Result&&typeof Result.prototype.close==='function'&&panel.close===Result.prototype.close;
// [VI dòng gốc 74] Khai báo biến không gán lại bằng const: result = id===1293 hoặc dùng vế phải khi vế trái falsy: nativeResult
      const result=id===1293||nativeResult;
// [VI dòng gốc 75] Khai báo biến không gán lại bằng const: paidText = gọi /\b(knb|nguyen bao|yuanbao|ingot|nap tien|thanh toan|mua|tieu hao|chi phi)\b/.test(content)
      const paidText=/\b(knb|nguyen bao|yuanbao|ingot|nap tien|thanh toan|mua|tieu hao|chi phi)\b/.test(content);
// [VI dòng gốc 76] Kiểm tra paidText&&!nativeResult: đúng thì chạy nhánh sau if. | gọi S.skipped.push({id,reason:'potential_currency_cost'}) để thêm phần tử vào cuối mảng | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
      if(paidText&&!nativeResult){S.skipped.push({id,reason:'potential_currency_cost'});continue;}
// [VI dòng gốc 77] Khai báo biến không gán lại bằng const: information = id===12 và chỉ đánh giá vế phải khi vế trái truthy: typeof panel._oBn?.run!=='function'
      const information=id===12&&typeof panel._oBn?.run!=='function';
// [VI dòng gốc 78] Chú thích gốc của tác giả; không được thực thi. Nội dung: Popup túi đầy native gọi đúng quickOneKeyFusion của model túi.
      // Popup túi đầy native gọi đúng quickOneKeyFusion của model túi.
// [VI dòng gốc 79] Chú thích gốc của tác giả; không được thực thi. Nội dung: HTMLDivElement native chỉ có setter innerHTML ở phiên này, không đọc
      // HTMLDivElement native chỉ có setter innerHTML ở phiên này, không đọc
// [VI dòng gốc 80] Chú thích gốc của tác giả; không được thực thi. Nội dung: được nội dung. Danh tính hàm + caller xác nhận đúng thao tác miễn phí.
      // được nội dung. Danh tính hàm + caller xác nhận đúng thao tác miễn phí.
// [VI dòng gốc 81] Khai báo biến không gán lại bằng const: bag = đọc W._Ba?._Ic?._aQ?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); handler = đọc panel._oBn
      const bag=W._Ba?._Ic?._aQ?.ins,handler=panel._oBn;
// [VI dòng gốc 82] Khai báo biến không gán lại bằng const: fusion = id===12&& typeof bag?.quickOneKeyFusion==='function'&&handler?.method===bag.quickOneKeyFusion&&handler?.caller===bag và chỉ đánh giá vế phải khi vế trái truthy: typeof handler?.run==='function'
      const fusion=id===12&&
// [VI dòng gốc 83] Tiếp tục hàm tick; thành phần cú pháp bắt đầu bằng typeof. Đọc cùng dòng mở phía trên: typeof bag?.quickOneKeyFusion==='function'&&handler?.method===bag.quickOneKeyFusion&&handler?.caller===bag&&typeof handler?.run==='function';
        typeof bag?.quickOneKeyFusion==='function'&&handler?.method===bag.quickOneKeyFusion&&handler?.caller===bag&&typeof handler?.run==='function';
// [VI dòng gốc 84] Kiểm tra !information&&!result&&!fusion: đúng thì chạy nhánh sau if. | gọi S.skipped.push({id,reason:'unverified_action_cost'}) để thêm phần tử vào cuối mảng | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
      if(!information&&!result&&!fusion){S.skipped.push({id,reason:'unverified_action_cost'});continue;}
// [VI dòng gốc 85] Khai báo biến không gán lại bằng const: nativeGeneric = id===12 và chỉ đánh giá vế phải khi vế trái truthy: typeof panel._aBn==='function'
      const nativeGeneric=id===12&&typeof panel._aBn==='function';
// [VI dòng gốc 86] Kiểm tra !nativeGeneric&&typeof button.event!=='function'&&!(result&&typeof panel.close==='function'): đúng thì chạy nhánh sau if. | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
      if(!nativeGeneric&&typeof button.event!=='function'&&!(result&&typeof panel.close==='function'))continue;
// [VI dòng gốc 87] gọi S.seen.set(id, {panel,generation}) | Kiểm tra S.seen.size>200: đúng thì chạy nhánh sau if. | gọi S.seen.delete(S.seen.keys().next().value)
      S.seen.set(id,{panel,generation});if(S.seen.size>200)S.seen.delete(S.seen.keys().next().value);
// [VI dòng gốc 88] tăng S.requests một đơn vị sau khi lấy giá trị | gán S.reason bằng 'native_agree_requested' | gọi S.history.push({at:Date.now(),id,kind:fusion?'bag_quick_fusion':information?'information':result?'battle_result':'confirmation'}) để thêm phần tử vào cuối mảng | Kiểm tra S.history.length>60: đúng thì chạy nhánh sau if.
      S.requests++;S.reason='native_agree_requested';S.history.push({at:Date.now(),id,kind:fusion?'bag_quick_fusion':information?'information':result?'battle_result':'confirmation'});if(S.history.length>60)S.history.shift();
// [VI dòng gốc 89] Kiểm tra nativeGeneric: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gọi panel._aBn(); chức năng nội bộ chưa xác minh từ tên hàm | Kiểm tra result&&typeof panel.close==='function': đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gọi panel.close()
      if(nativeGeneric)panel._aBn();else if(result&&typeof panel.close==='function')panel.close();else button.event('click');
// [VI dòng gốc 90] gán S.priorityUntil bằng Date.now()+10 | gọi schedule() | Kết thúc hàm hiện tại và trả về: true.
      S.priorityUntil=Date.now()+10;schedule();return true; // Nhường tác vụ khác cho popup kế tiếp một lượt event loop.
// [VI dòng gốc 91] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 92] gán S.reason bằng S.skipped.length?'waiting_confirmation_scope':'waiting_popup'
    S.reason=S.skipped.length?'waiting_confirmation_scope':'waiting_popup';
// [VI dòng gốc 93] Nhận lỗi bằng e và chạy phần xử lý lỗi. | gán S.lastError bằng String(e?.message||e) | gán S.reason bằng 'error' | gán S.busy bằng false
  }catch(e){S.lastError=String(e?.message||e);S.reason='error';}finally{S.busy=false;}return false;}
// [VI dòng gốc 94] Chú thích gốc của tác giả; không được thực thi. Nội dung: Các hàng đợi gọi trước khi làm việc: xử lý popup miễn phí trước, không giữ
  // Các hàng đợi gọi trước khi làm việc: xử lý popup miễn phí trước, không giữ
// [VI dòng gốc 95] Chú thích gốc của tác giả; không được thực thi. Nội dung: combat an toàn/rút lui và không khóa hàng đợi bởi popup chưa rõ chi phí.
  // combat an toàn/rút lui và không khóa hàng đợi bởi popup chưa rõ chi phí.
// [VI dòng gốc 96] Định nghĩa hàm beforeTask; tham số: không có | Kiểm tra !S.enabled||!owned(): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: false. | Khai báo biến không gán lại bằng const: now = gọi Date.now()
  function beforeTask(){if(!S.enabled||!owned())return false;const now=Date.now();
// [VI dòng gốc 97] Kiểm tra now-S.lastPriorityScan>=50: đúng thì chạy nhánh sau if. | gán S.lastPriorityScan bằng now | Kiểm tra tick()===true: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: true.
    if(now-S.lastPriorityScan>=50){S.lastPriorityScan=now;if(tick()===true)return true;}
// [VI dòng gốc 98] Kết thúc hàm hiện tại và trả về: tính biểu thức now<S.priorityUntil.
    return now<S.priorityUntil;}
// [VI dòng gốc 99] Định nghĩa hàm status; tham số: không có. Mục đích: trả trạng thái để kiểm tra | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm enabled, priority, confirmAll, allowKNB, unknownCosts, asynchronous, pollMs, requests, reason, lastError, skipped, history.
  function status(){return {enabled:S.enabled,priority:'before_scene_tasks_and_quick_use',confirmAll:S.confirmAll,allowKNB:false,unknownCosts:'manual',asynchronous:true,pollMs:100,requests:S.requests,
// [VI dòng gốc 100] Thuộc tính reason: đọc S.reason | Thuộc tính lastError: đọc S.lastError | Thuộc tính skipped: gọi S.skipped.map(x=>({...x})) để biến đổi từng phần tử | Thuộc tính history: gọi S.history.map(x=>({...x})) để biến đổi từng phần tử
    reason:S.reason,lastError:S.lastError,skipped:S.skipped.map(x=>({...x})),history:S.history.map(x=>({...x}))};}
// [VI dòng gốc 101] Định nghĩa hàm stop; tham số: không có. Mục đích: dừng bộ điều khiển và dọn tài nguyên | gán S.enabled bằng false | Kiểm tra S.timer!==null: đúng thì chạy nhánh sau if. | gọi W.KVPV_V1?.timers?.clearInterval??W.clearInterval(S.timer)
  function stop(){S.enabled=false;if(S.timer!==null){(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;}
// [VI dòng gốc 102] Kiểm tra S.soon!==null: đúng thì chạy nhánh sau if. | gọi W.KVPV_V1?.timers?.clearTimeout??W.clearTimeout(S.soon) | gán S.soon bằng null | gọi detach()
    if(S.soon!==null){(W.KVPV_V1?.timers?.clearTimeout??W.clearTimeout)(S.soon);S.soon=null;}detach();S.reason='stopped';return status();}
// [VI dòng gốc 103] Định nghĩa hàm start; tham số: không có. Mục đích: khởi động bộ điều khiển | gán S.enabled bằng true | Kiểm tra S.timer===null: đúng thì chạy nhánh sau if. | gán S.timer bằng (W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,100)
  function start(){S.enabled=true;if(S.timer===null)S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,100);schedule();return status();}
// [VI dòng gốc 104] gán W.KVPV_CONFIRM_POPUPS bằng Object.freeze({start,stop,status,sync:schedule,beforeTask, setAll(value){S.confirmAll=value===true;schedule();return status();}, _handoff:()=>({actor,confirmAll:S.confirmAll,genera…
  W.KVPV_CONFIRM_POPUPS=Object.freeze({start,stop,status,sync:schedule,beforeTask,
// [VI dòng gốc 105] gán S.confirmAll bằng value===true | gọi schedule() | Kết thúc hàm hiện tại và trả về: gọi status() để trả trạng thái để kiểm tra.
    setAll(value){S.confirmAll=value===true;schedule();return status();},
// [VI dòng gốc 106] gọi start() để khởi động bộ điều khiển
    _handoff:()=>({actor,confirmAll:S.confirmAll,generations:[...S.generations],seen:[...S.seen],requests:S.requests})});start();
// [VI dòng gốc 107] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: })();
})();
// [VI dòng gốc 108] Dòng trống để tách các phần, không có lệnh thực thi.
