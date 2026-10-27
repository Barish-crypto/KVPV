// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: Experimental CLIENT settings. Server cooldown and movement acceptance unverified. [đóng chú thích]
/* Experimental CLIENT settings. Server cooldown and movement acceptance unverified. */
// [VI dòng gốc 2] chạy ngay hàm bao để tạo phạm vi và khởi tạo phần chức năng bên trong
(() => {
// [VI dòng gốc 3] "use strict"
  'use strict';
// [VI dòng gốc 4] Khai báo biến không gán lại bằng const: W = window | gọi W.KVPV_EXPERIMENTAL_BOOST?.stop() để dừng bộ điều khiển và dọn tài nguyên (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  const W=window;W.KVPV_EXPERIMENTAL_BOOST?.stop?.();
// [VI dòng gốc 5] Khai báo biến không gán lại bằng const: actor = gọi String(W.__KVPV_OWN_ACTOR_ID||'') để chuyển sang chuỗi
  const actor=String(W.__KVPV_OWN_ACTOR_ID||'');
// [VI dòng gốc 6] Khai báo biến không gán lại bằng const: defs = tạo đối tượng gồm phiPhong
  const defs={phiPhong:'cloakContext'};
// [VI dòng gốc 7] Khai báo biến không gán lại bằng const: state = tạo đối tượng gồm enabled, timer, move, hooks, nextCompanionScan, lastError
  const state={enabled:true,timer:null,move:null,hooks:new Map(),nextCompanionScan:0,lastError:''};
// [VI dòng gốc 8] Khai báo biến không gán lại bằng const: config = tạo đối tượng gồm companionFactor, moveFactor, movementSyncMs, companionScanMs, clientWaitMs
  const config={companionFactor:10,moveFactor:99,movementSyncMs:16,companionScanMs:100,clientWaitMs:{}};
// [VI dòng gốc 9] Khai báo biến không gán lại bằng const: ownActor = tạo hàm với tham số (không có); mỗi lần gọi trả về actor&&String(W._Ba?._rJ?._O$?.ins?.actorId??'')===actor và chỉ đánh giá vế phải khi vế trái truthy: !W.__KVPV_UNIVERSAL_HALTED
  const ownActor=()=>actor&&String(W._Ba?._rJ?._O$?.ins?.actorId??'')===actor&&!W.__KVPV_UNIVERSAL_HALTED;
// [VI dòng gốc 10] Chú thích gốc của tác giả; không được thực thi. Nội dung: User-approved global boost: independent of map and main-character mode.
  // User-approved global boost: independent of map and main-character mode.
// [VI dòng gốc 11] Khai báo biến không gán lại bằng const: active = tạo hàm với tham số (không có); mỗi lần gọi trả về state.enabled&&ownActor() và chỉ đánh giá vế phải khi vế trái truthy: W._Ba?._rJ?._O$?.ins?.isDead!==true
  const active=()=>state.enabled&&ownActor()&&W._Ba?._rJ?._O$?.ins?.isDead!==true;
// [VI dòng gốc 12] Chú thích gốc của tác giả; không được thực thi. Nội dung: Trả cấu hình di chuyển đã lưu khi không còn áp dụng thử nghiệm.
  // Trả cấu hình di chuyển đã lưu khi không còn áp dụng thử nghiệm.
// [VI dòng gốc 13] Định nghĩa hàm restoreMove; tham số: không có | Khai báo biến không gán lại bằng const: h = đọc state.move | Kiểm tra !h: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  function restoreMove(){const h=state.move;if(!h)return;
// [VI dòng gốc 14] Kiểm tra h.obj.speed===h.applied: đúng thì chạy nhánh sau if. | gán h.obj.speed bằng h.base | gán state.move bằng null
    if(h.obj.speed===h.applied)h.obj.speed=h.base;state.move=null;
// [VI dòng gốc 15] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 16] Định nghĩa hàm detach; tham số: key | Khai báo biến không gán lại bằng const: h = gọi state.hooks.get(key) | Kiểm tra !h: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  function detach(key){const h=state.hooks.get(key);if(!h)return;
// [VI dòng gốc 17] Kiểm tra h.obj._f7t===h.fn: đúng thì chạy nhánh sau if. | Kiểm tra h.descriptor: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gọi Object.defineProperty(h.obj, '_f7t', h.descriptor) | xóa thuộc tính h.obj._f7t
    if(h.obj._f7t===h.fn){if(h.descriptor)Object.defineProperty(h.obj,'_f7t',h.descriptor);else delete h.obj._f7t;}
// [VI dòng gốc 18] gọi state.hooks.delete(key)
    state.hooks.delete(key);
// [VI dòng gốc 19] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 20] Định nghĩa hàm attach; tham số: key, selector
  function attach(key,selector){
// [VI dòng gốc 21] Khai báo biến không gán lại bằng const: previous = gọi state.hooks.get(key) | Kiểm tra previous?.obj===selector: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    const previous=state.hooks.get(key);if(previous?.obj===selector)return;
// [VI dòng gốc 22] gọi detach(key) | Kiểm tra typeof selector?._f7t!=='function': đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    detach(key);if(typeof selector?._f7t!=='function')return;
// [VI dòng gốc 23] Khai báo biến không gán lại bằng const: descriptor = gọi Object.getOwnPropertyDescriptor(selector, '_f7t') | Kiểm tra descriptor&&!descriptor.configurable: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    const descriptor=Object.getOwnPropertyDescriptor(selector,'_f7t');if(descriptor&&!descriptor.configurable)return;
// [VI dòng gốc 24] Khai báo biến không gán lại bằng const: native = đọc selector._f7t; h = tạo đối tượng gồm obj, descriptor, fn, ready, selections, context, combat, lastAttempt, attempts, lastReason
    const native=selector._f7t,h={obj:selector,descriptor,fn:null,ready:new Map(),selections:0,context:null,combat:null,lastAttempt:-Infinity,attempts:0,lastReason:'waiting_components'};
// [VI dòng gốc 25] gán h.fn bằng function(activeRows,commonRows,mode){ if(!active()||this!==selector)return native.apply(this,arguments); const now=Date.now(); const clone=rows=>!Array.isArray(rows)?rows:rows.map(…
    h.fn=function(activeRows,commonRows,mode){
// [VI dòng gốc 26] Kiểm tra !active()||this!==selector: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: gọi native.apply(this, arguments).
      if(!active()||this!==selector)return native.apply(this,arguments);
// [VI dòng gốc 27] Khai báo biến không gán lại bằng const: now = gọi Date.now()
      const now=Date.now();
// [VI dòng gốc 28] Khai báo biến không gán lại bằng const: clone = tạo hàm với tham số rows; mỗi lần gọi trả về nếu !Array.isArray(rows) thì lấy rows, ngược lại lấy rows.map(row=>{ if(!Array.isArray(row)||!Number.isSafeInteger(Number(row[0]))||!(Number(row[2])>0))return row; const id=Number(row[0]),copy=row.slice(),fixed=config.clientWaitMs[ke…
      const clone=rows=>!Array.isArray(rows)?rows:rows.map(row=>{
// [VI dòng gốc 29] Kiểm tra !Array.isArray(row)||!Number.isSafeInteger(Number(row[0]))||!(Number(row[2])>0): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: row.
        if(!Array.isArray(row)||!Number.isSafeInteger(Number(row[0]))||!(Number(row[2])>0))return row;
// [VI dòng gốc 30] Khai báo biến không gán lại bằng const: id = gọi Number(row[0]) để chuyển sang số; copy = gọi row.slice() để lấy một đoạn dữ liệu; fixed = đọc config.clientWaitMs[key]
        const id=Number(row[0]),copy=row.slice(),fixed=config.clientWaitMs[key];
// [VI dòng gốc 31] Chú thích gốc của tác giả; không được thực thi. Nội dung: Chỉ thay bản sao của bộ chọn riêng từng trợ chiến, không sửa hàng hồi chiêu gốc; vòng kiểm tra riêng chỉ gọi combat khi native sẵn sàng.
        // Chỉ thay bản sao của bộ chọn riêng từng trợ chiến, không sửa hàng hồi chiêu gốc; vòng kiểm tra riêng chỉ gọi combat khi native sẵn sàng.
// [VI dòng gốc 32] Kiểm tra !h.ready.has(id): đúng thì chạy nhánh sau if. | gọi h.ready.set(id, Number(row[1])<=now?0:now+(fixed??((Number(row[1])-now)/config.companionFactor)))
        if(!h.ready.has(id))h.ready.set(id,Number(row[1])<=now?0:now+(fixed??((Number(row[1])-now)/config.companionFactor)));
// [VI dòng gốc 33] gán copy[1] bằng h.ready.get(id) | gán copy[2] bằng fixed??Math.max(1,Number(row[2])/config.companionFactor) | Kết thúc hàm hiện tại và trả về: copy.
        copy[1]=h.ready.get(id);copy[2]=fixed??Math.max(1,Number(row[2])/config.companionFactor);return copy;
// [VI dòng gốc 34] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
      });
// [VI dòng gốc 35] Khai báo biến không gán lại bằng const: a = gọi clone(activeRows); b = gọi clone(commonRows); id = gọi native.call(this, a, b, mode)
      const a=clone(activeRows),b=clone(commonRows),id=native.call(this,a,b,mode);
// [VI dòng gốc 36] Khai báo biến không gán lại bằng const: row = gọi [...(Array.isArray(a)?a:[]),...(Array.isArray(b)?b:[])].find(x=>Number(x?.[0])===Number(id)) để tìm phần tử đầu tiên thỏa điều kiện
      const row=[...(Array.isArray(a)?a:[]),...(Array.isArray(b)?b:[])].find(x=>Number(x?.[0])===Number(id));
// [VI dòng gốc 37] Kiểm tra Number(id)>0&&row: đúng thì chạy nhánh sau if. | gọi h.ready.set(Number(id), Math.max(now+1,Number(row[1])||now+Number(row[2]))) | tăng h.selections một đơn vị sau khi lấy giá trị
      if(Number(id)>0&&row){h.ready.set(Number(id),Math.max(now+1,Number(row[1])||now+Number(row[2])));h.selections++;}
// [VI dòng gốc 38] Kết thúc hàm hiện tại và trả về: id.
      return id;
// [VI dòng gốc 39] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    };
// [VI dòng gốc 40] gọi Object.defineProperty(selector, '_f7t', {value:h.fn,configurable:true,writable:true,enumerable:!!descriptor?.enumerable}) | gọi state.hooks.set(key, h)
    Object.defineProperty(selector,'_f7t',{value:h.fn,configurable:true,writable:true,enumerable:!!descriptor?.enumerable});state.hooks.set(key,h);
// [VI dòng gốc 41] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 42] Chú thích gốc của tác giả; không được thực thi. Nội dung: Thực hiện một lượt kiểm tra của module; các nhánh bên dưới quyết định có đủ điều kiện để hành động hay phải chờ.
  // Thực hiện một lượt kiểm tra của module; các nhánh bên dưới quyết định có đủ điều kiện để hành động hay phải chờ.
// [VI dòng gốc 43] Định nghĩa hàm tick; tham số: forceCompanions=false. Mục đích: xử lý một nhịp kiểm tra | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài.
  function tick(forceCompanions=false){try{
// [VI dòng gốc 44] Kiểm tra !active(): đúng thì chạy nhánh sau if. | gán state.nextCompanionScan bằng 0 | gọi restoreMove() | Duyệt từng giá trị trong [...state.hooks.keys()] bằng const k.
    if(!active()){state.nextCompanionScan=0;restoreMove();for(const k of [...state.hooks.keys()])detach(k);return;}
// [VI dòng gốc 45] Khai báo biến không gán lại bằng const: world = đọc W._C?._Ba?.instance nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); role = world?.getRole?.(Number(actor)) hoặc dùng vế phải khi vế trái là null/undefined: world?.getRole?.(actor)
    const world=W._C?._Ba?.instance,role=world?.getRole?.(Number(actor))??world?.getRole?.(actor);
// [VI dòng gốc 46] Kiểm tra !role: đúng thì chạy nhánh sau if. | gán state.nextCompanionScan bằng 0 | gọi restoreMove() | Duyệt từng giá trị trong [...state.hooks.keys()] bằng const k.
    if(!role){state.nextCompanionScan=0;restoreMove();for(const k of [...state.hooks.keys()])detach(k);return;}
// [VI dòng gốc 47] Khai báo biến không gán lại bằng const: mover = gọi role.getComponent(W._d?._Yct?._zet) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const mover=role.getComponent?.(W._d?._Yct?._zet);
// [VI dòng gốc 48] Kiểm tra state.move?.obj!==mover: đúng thì chạy nhánh sau if. | gọi restoreMove()
    if(state.move?.obj!==mover)restoreMove();
// [VI dòng gốc 49] Kiểm tra mover: đúng thì chạy nhánh sau if.
    if(mover){
// [VI dòng gốc 50] Khai báo biến không gán lại bằng const: h = đọc state.move
      const h=state.move;
// [VI dòng gốc 51] Kiểm tra !h||mover.speed!==h.applied: đúng thì chạy nhánh sau if. | Khai báo biến không gán lại bằng const: base = gọi Number(mover.speed) để chuyển sang số | Kiểm tra Number.isFinite(base)&&base>0: đúng thì chạy nhánh sau if. | gán state.move bằng {obj:mover,base,applied:base*config.moveFactor}
      if(!h||mover.speed!==h.applied){const base=Number(mover.speed);if(Number.isFinite(base)&&base>0)state.move={obj:mover,base,applied:base*config.moveFactor};}
// [VI dòng gốc 52] Kiểm tra state.move: đúng thì chạy nhánh sau if. | gán mover.speed bằng state.move.applied
      if(state.move)mover.speed=state.move.applied;
// [VI dòng gốc 53] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 54] Chú thích gốc của tác giả; không được thực thi. Nội dung: Đồng bộ mover; chỉ giữ phần chỉnh Phi Phong, ba trợ chiến dùng native mặc định.
    // Đồng bộ mover; chỉ giữ phần chỉnh Phi Phong, ba trợ chiến dùng native mặc định.
// [VI dòng gốc 55] Kiểm tra !forceCompanions&&Date.now()<state.nextCompanionScan: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(!forceCompanions&&Date.now()<state.nextCompanionScan)return;
// [VI dòng gốc 56] gán state.nextCompanionScan bằng Date.now()+config.companionScanMs
    state.nextCompanionScan=Date.now()+config.companionScanMs;
// [VI dòng gốc 57] Duyệt từng giá trị trong Object.entries(defs) bằng const [key,property]. | Khai báo biến không gán lại bằng const: [key,property] (chưa gán giá trị)
    for(const [key,property] of Object.entries(defs)){
// [VI dòng gốc 58] Khai báo biến không gán lại bằng const: context = gọi role.property?.get(property) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
      const context=role.property?.get?.(property);
// [VI dòng gốc 59] Khai báo biến không gán lại bằng const: selector = nếu context&&context!==role thì lấy context.getComponent?.(W._d?._Yct?._Eet), ngược lại lấy null
      const selector=context&&context!==role?context.getComponent?.(W._d?._Yct?._Eet):null;
// [VI dòng gốc 60] gọi attach(key, selector===role.getComponent?.(W._d?._Yct?._Eet)?null:selector)
      attach(key,selector===role.getComponent?.(W._d?._Yct?._Eet)?null:selector);
// [VI dòng gốc 61] Khai báo biến không gán lại bằng const: h = gọi state.hooks.get(key) | Kiểm tra h: đúng thì chạy nhánh sau if. | gán h.context bằng context | gán h.combat bằng context?.getComponent?.(W._d?._Yct?._Het)
      const h=state.hooks.get(key);if(h){h.context=context;h.combat=context?.getComponent?.(W._d?._Yct?._Het);}
// [VI dòng gốc 62] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 63] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 64] Nhận lỗi bằng e và chạy phần xử lý lỗi. | gán state.lastError bằng String(e?.message||e)
  }catch(e){state.lastError=String(e?.message||e);}}
// [VI dòng gốc 65] Chú thích gốc của tác giả; không được thực thi. Nội dung: Trả trạng thái hiện tại để kiểm tra; ý nghĩa từng bộ đếm thuộc phạm vi module này.
  // Trả trạng thái hiện tại để kiểm tra; ý nghĩa từng bộ đếm thuộc phạm vi module này.
// [VI dòng gốc 66] Định nghĩa hàm status; tham số: không có. Mục đích: trả trạng thái để kiểm tra | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm experimental, enabled, active, các thuộc tính của config, clientWaitMs, movementApplied, companions, lastError, note.
  function status(){return {experimental:true,enabled:state.enabled,active:!!active(),...config,clientWaitMs:{...config.clientWaitMs},
// [VI dòng gốc 67] Thuộc tính movementApplied: đảo giá trị đúng/sai của !state.move | Thuộc tính companions: gọi Object.fromEntries(Object.keys(defs).map(k=>[k,{hooked:state.hooks.has(k),selections:state.hooks.get(k)?.selections||0,combatAttempts:state…) | Thuộc tính hooked: gọi state.hooks.has(k) | Thuộc tính selections: state.hooks.get(k)?.selections hoặc dùng vế phải khi vế trái falsy: 0
    movementApplied:!!state.move,companions:Object.fromEntries(Object.keys(defs).map(k=>[k,{hooked:state.hooks.has(k),selections:state.hooks.get(k)?.selections||0,combatAttempts:state.hooks.get(k)?.attempts||0,lastReason:state.hooks.get(k)?.lastReason??'not_attached'}])),lastError:state.lastError,
// [VI dòng gốc 68] Thuộc tính note: "Linh Thu, Phuc Oa and Ngu Thu use native skills; only cloak selector and movement retain existing experimental settings."
    note:'Linh Thu, Phuc Oa and Ngu Thu use native skills; only cloak selector and movement retain existing experimental settings.'};}
// [VI dòng gốc 69] Chú thích gốc của tác giả; không được thực thi. Nội dung: Dừng bộ điều khiển, hủy lịch và giải phóng tài nguyên do module này sở hữu.
  // Dừng bộ điều khiển, hủy lịch và giải phóng tài nguyên do module này sở hữu.
// [VI dòng gốc 70] Định nghĩa hàm stop; tham số: không có. Mục đích: dừng bộ điều khiển và dọn tài nguyên | gán state.enabled bằng false | Kiểm tra state.timer!=null: đúng thì chạy nhánh sau if. | gọi W.KVPV_V1?.timers?.clearInterval??W.clearInterval(state.timer)
  function stop(){state.enabled=false;if(state.timer!=null){(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(state.timer);state.timer=null;}
// [VI dòng gốc 71] gọi restoreMove() | Duyệt từng giá trị trong [...state.hooks.keys()] bằng const k. | Khai báo biến không gán lại bằng const: k (chưa gán giá trị) | gọi detach(k)
    restoreMove();for(const k of [...state.hooks.keys()])detach(k);return status();}
// [VI dòng gốc 72] Chú thích gốc của tác giả; không được thực thi. Nội dung: Bật bộ điều khiển và lịch kiểm tra của module; trả trạng thái sau khi khởi động.
  // Bật bộ điều khiển và lịch kiểm tra của module; trả trạng thái sau khi khởi động.
// [VI dòng gốc 73] Định nghĩa hàm start; tham số: không có. Mục đích: khởi động bộ điều khiển | gán state.enabled bằng true | Kiểm tra state.timer==null: đúng thì chạy nhánh sau if. | gán state.timer bằng (W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,config.movementSyncMs)
  function start(){state.enabled=true;if(state.timer==null)state.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,config.movementSyncMs);tick(true);return status();}
// [VI dòng gốc 74] gán W.KVPV_EXPERIMENTAL_BOOST bằng Object.freeze({start,stop,status,sync:()=>tick(true)}) | gọi start() để khởi động bộ điều khiển
  W.KVPV_EXPERIMENTAL_BOOST=Object.freeze({start,stop,status,sync:()=>tick(true)});start();
// [VI dòng gốc 75] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: })();
})();
// [VI dòng gốc 76] Dòng trống để tách các phần, không có lệnh thực thi.
