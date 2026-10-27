// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: Bật tự Chế tạo Rèn cho bậc1..3 theo quyền người dùng.
/* Bật tự Chế tạo Rèn cho bậc1..3 theo quyền người dùng.
 * Chỉ cấp công thức có đầu ra và toàn bộ trang bị nguyên liệu đều dưới bậc4.
 * Bộ resources có sẵn tiếp tục chọn UID trong túi, giữ đồ đang mặc/thuộc tính quý,
 * kiểm tra lại trước khi gửi, chờ ACK và dùng khóa một yêu cầu chung.
 * Module này không gửi RPC và không bấm đồng ý cho đồ bậc4 hoặc Đá Thần Trang. */
// [VI dòng gốc 6] chạy ngay hàm bao để tạo phạm vi và khởi tạo phần chức năng bên trong
(() => {
// [VI dòng gốc 7] "use strict"
  'use strict';
// [VI dòng gốc 8] Khai báo biến không gán lại bằng const: W = window; old = đọc W.KVPV_CRAFT_LOW; carry = gọi old?._handoff(); chức năng nội bộ chưa xác minh từ tên hàm (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gọi old?.stop() để dừng bộ điều khiển và dọn tài nguyên (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  const W=window,old=W.KVPV_CRAFT_LOW,carry=old?._handoff?.();old?.stop?.();
// [VI dòng gốc 9] Khai báo biến không gán lại bằng const: actor = gọi String(W.__KVPV_OWN_ACTOR_ID||'') để chuyển sang chuỗi
  const actor=String(W.__KVPV_OWN_ACTOR_ID||'');
// [VI dòng gốc 10] Khai báo biến không gán lại bằng const: S = tạo đối tượng gồm enabled, timer, automatic, reason, lastError, ready, blocked
  const S={enabled:true,timer:null,automatic:new Set(carry?.actor===actor?carry.automatic:[]),
// [VI dòng gốc 11] Thuộc tính reason: "waiting" | Thuộc tính lastError: "" | Thuộc tính ready: tạo mảng gồm 0 vị trí: [] | Thuộc tính blocked: 0
    reason:'waiting',lastError:'',ready:[],blocked:0};
// [VI dòng gốc 12] Khai báo biến không gán lại bằng const: worker = tạo hàm với tham số (không có); mỗi lần gọi trả về W.KVPV_BG_RESOURCES hoặc dùng vế phải khi vế trái là null/undefined: W.KVPV?.resources
  const worker=()=>W.KVPV_BG_RESOURCES??W.KVPV?.resources;
// [VI dòng gốc 13] Khai báo biến không gán lại bằng const: valid = tạo hàm với tham số (không có); mỗi lần gọi trả về actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'') và chỉ đánh giá vế phải khi vế trái truthy: !W.__KVPV_UNIVERSAL_HALTED
  const valid=()=>actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;
// [VI dòng gốc 14] Khai báo biến không gán lại bằng const: gearTypes = tạo đối tượng bằng Set([5,8,10,11,12,13])
  const gearTypes=new Set([5,8,10,11,12,13]);
// [VI dòng gốc 15] Định nghĩa hàm scan; tham số: không có
  function scan(){
// [VI dòng gốc 16] Khai báo biến không gán lại bằng const: et = W._et hoặc dùng vế phải khi vế trái là null/undefined: typeof _et!=='undefined'?_et:null; c = đọc W._ft?._Cji?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); b = đọc W._Ba?._Ic?._aQ?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const et=W._et??(typeof _et!=='undefined'?_et:null),c=W._ft?._Cji?.ins,b=W._Ba?._Ic?._aQ?.ins;
// [VI dòng gốc 17] Khai báo biến không gán lại bằng const: rows = gọi W._Sa?.getCfg('item_compose') (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); out = tạo mảng gồm 0 vị trí: [] | gán S.blocked bằng 0
    const rows=W._Sa?.getCfg?.('item_compose'),out=[];S.blocked=0;
// [VI dòng gốc 18] Kiểm tra !et?.getStageById||!et?.getTypeById||!c?.getCfgById||!b?.isBagInited||!Array.isArray(rows): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: null.
    if(!et?.getStageById||!et?.getTypeById||!c?.getCfgById||!b?.isBagInited||!Array.isArray(rows))return null;
// [VI dòng gốc 19] Định nghĩa hàm lowGear; tham số: id | Khai báo biến không gán lại bằng const: tier = gọi Number(et.getStageById(id)) để chuyển sang số | Kết thúc hàm hiện tại và trả về: gearTypes.has(Number(et.getTypeById(id)))&&Number.isSafeInteger(tier)&&tier>0 và chỉ đánh giá vế phải khi vế trái truthy: tier<4.
    function lowGear(id){const tier=Number(et.getStageById(id));return gearTypes.has(Number(et.getTypeById(id)))&&Number.isSafeInteger(tier)&&tier>0&&tier<4;}
// [VI dòng gốc 20] Duyệt từng giá trị trong rows bằng const raw. | Khai báo biến không gán lại bằng const: raw (chưa gán giá trị) | Khai báo biến không gán lại bằng const: id = gọi Number(raw?.[0]) để chuyển sang số | Kiểm tra !Number.isSafeInteger(id)||id<=0: đúng thì chạy nhánh sau if.
    for(const raw of rows){const id=Number(raw?.[0]);if(!Number.isSafeInteger(id)||id<=0)continue;
// [VI dòng gốc 21] Khai báo biến không gán lại bằng const: row = gọi c.getCfgById(id) để tra cấu hình theo ID bằng API client | Kiểm tra !Array.isArray(row)||Number(row[0])!==id||![807,808].includes(Number(row?.[3]?.[0])): đúng thì chạy nhánh sau if. | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
      const row=c.getCfgById(id);if(!Array.isArray(row)||Number(row[0])!==id||![807,808].includes(Number(row?.[3]?.[0])))continue;
// [VI dòng gốc 22] Kiểm tra !lowGear(Number(row[1])): đúng thì chạy nhánh sau if. | tăng S.blocked một đơn vị sau khi lấy giá trị | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
      if(!lowGear(Number(row[1]))){S.blocked++;continue;}
// [VI dòng gốc 23] Khai báo biến không gán lại bằng const: source = tạo mảng gồm 2 vị trí: [...(Array.isArray(row[5])?row[5]:[]),...(Array.isArray(row[6])?row[6]:[])]
      const source=[...(Array.isArray(row[5])?row[5]:[]),...(Array.isArray(row[6])?row[6]:[])];
// [VI dòng gốc 24] Khai báo biến không gán lại bằng const: need = tạo đối tượng bằng Map() | Khai báo biến có thể gán lại bằng let: okay = source.length>0 và chỉ đánh giá vế phải khi vế trái truthy: source.length<=8
      const need=new Map();let okay=source.length>0&&source.length<=8;
// [VI dòng gốc 25] Duyệt từng giá trị trong source bằng const pair. | Khai báo biến không gán lại bằng const: pair (chưa gán giá trị) | Khai báo biến không gán lại bằng const: item = gọi Number(pair?.[0]) để chuyển sang số; count = gọi Number(pair?.[1]) để chuyển sang số
      for(const pair of source){const item=Number(pair?.[0]),count=Number(pair?.[1]);
// [VI dòng gốc 26] Kiểm tra !Number.isSafeInteger(item)||item<=0||!Number.isSafeInteger(count)||count<1||count>8||!lowGear(item): đúng thì chạy nhánh sau if. | gán okay bằng false | Thoát vòng lặp/switch hiện tại.
        if(!Number.isSafeInteger(item)||item<=0||!Number.isSafeInteger(count)||count<1||count>8||!lowGear(item)){okay=false;break;}
// [VI dòng gốc 27] gọi need.set(item, (need.get(item)||0)+count)
        need.set(item,(need.get(item)||0)+count);
// [VI dòng gốc 28] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
      }
// [VI dòng gốc 29] Kiểm tra !okay: đúng thì chạy nhánh sau if. | tăng S.blocked một đơn vị sau khi lấy giá trị | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
      if(!okay){S.blocked++;continue;}
// [VI dòng gốc 30] Kiểm tra [...need].some(([item,count])=>{const owned=Number(b.getItemCountById?.(item));return !Number.isFinite(owned)||owned<count;}): đúng thì chạy nhánh sau if. | Khai báo biến không gán lại bằng const: owned = gọi Number(b.getItemCountById?.(item)) để chuyển sang số | Kết thúc hàm hiện tại và trả về: !Number.isFinite(owned) hoặc dùng vế phải khi vế trái falsy: owned<count. | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
      if([...need].some(([item,count])=>{const owned=Number(b.getItemCountById?.(item));return !Number.isFinite(owned)||owned<count;}))continue;
// [VI dòng gốc 31] gọi out.push(id) để thêm phần tử vào cuối mảng | Kiểm tra out.length>=100: đúng thì chạy nhánh sau if. | Thoát vòng lặp/switch hiện tại.
      out.push(id);if(out.length>=100)break;
// [VI dòng gốc 32] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 33] Kết thúc hàm hiện tại và trả về: out.
    return out;
// [VI dòng gốc 34] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 35] Định nghĩa hàm tick; tham số: không có. Mục đích: xử lý một nhịp kiểm tra | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài.
  function tick(){try{
// [VI dòng gốc 36] Kiểm tra !S.enabled: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể. | Kiểm tra !valid(): đúng thì chạy nhánh sau if. | gọi stop() để dừng bộ điều khiển và dọn tài nguyên
    if(!S.enabled)return;if(W.KVPV_MATERIAL_RESERVE?.active===true){stop();S.reason='materials_reserved_for_so_tai';return;}
    if(!valid()){stop();S.reason='actor_changed';return;}
// [VI dòng gốc 37] Kiểm tra W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true: đúng thì chạy nhánh sau if. | gán S.reason bằng 'priority_popup' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true){S.reason='priority_popup';return;}
// [VI dòng gốc 38] Khai báo biến không gán lại bằng const: api = gọi worker(); state = gọi api?.status() để trả trạng thái để kiểm tra (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); cfg = đọc api?.config?.gearCraft nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const api=worker(),state=api?.status?.(),cfg=api?.config?.gearCraft;
// [VI dòng gốc 39] Kiểm tra !cfg||!Array.isArray(cfg.approvedRecipeIds): đúng thì chạy nhánh sau if. | gán S.reason bằng 'waiting_resource_worker' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(!cfg||!Array.isArray(cfg.approvedRecipeIds)){S.reason='waiting_resource_worker';return;}
// [VI dòng gốc 40] Kiểm tra state?.busy||state?.pending: đúng thì chạy nhánh sau if. | gán S.reason bằng 'waiting_existing_request' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(state?.busy||state?.pending){S.reason='waiting_existing_request';return;}
// [VI dòng gốc 41] Khai báo biến không gán lại bằng const: ids = gọi scan() | Kiểm tra ids===null: đúng thì chạy nhánh sau if. | gán S.reason bằng 'waiting_native_config_and_bag' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    const ids=scan();if(ids===null){S.reason='waiting_native_config_and_bag';return;}
// [VI dòng gốc 42] Khai báo biến không gán lại bằng const: manual = gọi cfg.approvedRecipeIds.filter(id=>!S.automatic.has(Number(id))) để giữ phần tử thỏa điều kiện
    const manual=cfg.approvedRecipeIds.filter(id=>!S.automatic.has(Number(id)));
// [VI dòng gốc 43] gán cfg.approvedRecipeIds bằng [...new Set([...manual,...ids])] | gán S.automatic bằng new Set(ids) | gán S.ready bằng ids
    cfg.approvedRecipeIds=[...new Set([...manual,...ids])];S.automatic=new Set(ids);S.ready=ids;
// [VI dòng gốc 44] gán S.reason bằng ids.length?'low_tier_recipes_enabled':'waiting_low_tier_materials'
    S.reason=ids.length?'low_tier_recipes_enabled':'waiting_low_tier_materials';
// [VI dòng gốc 45] Nhận lỗi bằng e và chạy phần xử lý lỗi. | gán S.lastError bằng String(e) | gán S.reason bằng 'error' | gọi W.KVPV_V1?.diagnostics?.record(e) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  }catch(e){S.lastError=String(e);S.reason='error';W.KVPV_V1?.diagnostics?.record?.(e);}}
// [VI dòng gốc 46] Định nghĩa hàm stop; tham số: không có. Mục đích: dừng bộ điều khiển và dọn tài nguyên | gán S.enabled bằng false
  function stop(){S.enabled=false;
// [VI dòng gốc 47] Kiểm tra S.timer!==null: đúng thì chạy nhánh sau if. | gọi W.KVPV_V1?.timers?.clearInterval??W.clearInterval(S.timer) | gán S.timer bằng null
    if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;
// [VI dòng gốc 48] Khai báo biến không gán lại bằng const: cfg = đọc worker()?.config?.gearCraft nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const cfg=worker()?.config?.gearCraft;
// [VI dòng gốc 49] Kiểm tra Array.isArray(cfg?.approvedRecipeIds): đúng thì chạy nhánh sau if. | gán cfg.approvedRecipeIds bằng cfg.approvedRecipeIds.filter(id=>!S.automatic.has(Number(id)))
    if(Array.isArray(cfg?.approvedRecipeIds))cfg.approvedRecipeIds=cfg.approvedRecipeIds.filter(id=>!S.automatic.has(Number(id)));
// [VI dòng gốc 50] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 51] Định nghĩa hàm start; tham số: không có. Mục đích: khởi động bộ điều khiển | Kiểm tra S.timer!==null: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể. | gán S.enabled bằng true
  function start(){if(S.timer!==null)return;S.enabled=true;
// [VI dòng gốc 52] gán S.timer bằng (W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,2000) | gọi tick() để xử lý một nhịp kiểm tra
    S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,2000);tick();}
// [VI dòng gốc 53] gán W.KVPV_CRAFT_LOW bằng Object.freeze({start,stop,sync:tick, status:()=>({enabled:S.enabled,actor,reason:S.reason,maximumAutoTier:3,manualFromTier:4, recipes:S.ready.slice(),blockedRecipes:S.blocked,lastE…
  W.KVPV_CRAFT_LOW=Object.freeze({start,stop,sync:tick,
// [VI dòng gốc 54] Thuộc tính status: tạo hàm với tham số (không có); mỗi lần gọi trả về tạo đối tượng gồm enabled, actor, reason, maximumAutoTier, manualFromTier, recipes, blockedRecipes, lastError, allowKNB | Thuộc tính enabled: đọc S.enabled | Thuộc tính actor: dùng biến cùng tên | Thuộc tính reason: đọc S.reason
    status:()=>({enabled:S.enabled,actor,reason:S.reason,maximumAutoTier:3,manualFromTier:4,
// [VI dòng gốc 55] Thuộc tính recipes: gọi S.ready.slice() để lấy một đoạn dữ liệu | Thuộc tính blockedRecipes: đọc S.blocked | Thuộc tính lastError: đọc S.lastError | Thuộc tính allowKNB: false
      recipes:S.ready.slice(),blockedRecipes:S.blocked,lastError:S.lastError,allowKNB:false}),
// [VI dòng gốc 56] Thuộc tính _handoff: tạo hàm với tham số (không có); mỗi lần gọi trả về tạo đối tượng gồm actor, automatic | Thuộc tính actor: dùng biến cùng tên | Thuộc tính automatic: tạo mảng gồm 1 vị trí: [...S.automatic]
    _handoff:()=>({actor,automatic:[...S.automatic]})});
// [VI dòng gốc 57] gọi start() để khởi động bộ điều khiển
  start();
// [VI dòng gốc 58] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: })();
})();
// [VI dòng gốc 59] Dòng trống để tách các phần, không có lệnh thực thi.
