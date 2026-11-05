// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: CHÚ THÍCH V1 — Bộ Tuyệt Học cũ được giữ tương thích.
/* CHÚ THÍCH V1 — Bộ Tuyệt Học cũ được giữ tương thích.
 * Chế độ tùy chọn BOSS_TH lọc kỹ năng native. Luồng mặc định khoảng cách 302 nằm ở module 08 và 09.
 * Sửa nguồn tại đây rồi chạy node build.cjs; FULL và bản vá được sinh tự động. */
// [VI dòng gốc 4] Chú thích gốc của tác giả; không được thực thi. Nội dung: ===========================================================================
/* ===========================================================================
 * KVPV V12.9.5 — BOSS TH ONLY / FAR STANCE (client side, experimental)
 * Uses native selector and NATIVE cooldown; never invents a ready skill.
 * 1001..1008 = assumed Tuyet Hoc family in the existing FULL's combat module.
 * Main actor only, current Tian Quan Boss only, no combat RPC, no skill reach hack.
 * Only active after KVPV_MODE.start('BOSS_TH'); no default auto activation.
 * =========================================================================== */
// [VI dòng gốc 11] chạy ngay hàm bao để tạo phạm vi và khởi tạo phần chức năng bên trong
(() => {
// [VI dòng gốc 12] "use strict"
  'use strict';
// [VI dòng gốc 13] Khai báo biến không gán lại bằng const: W = window; NAME = "KVPV_TH_FAR"; TAG = "[TH-FAR V12.9.5]"
  const W=window, NAME='KVPV_TH_FAR', TAG='[TH-FAR V12.9.5]';
// [VI dòng gốc 14] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | gọi W[NAME]?.stop('reload') để dừng bộ điều khiển và dọn tài nguyên (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Nhận lỗi bằng _ và chạy phần xử lý lỗi. | gọi window.KVPV_V1?.diagnostics?.record(_) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  try {W[NAME]?.stop?.('reload');}catch(_){window.KVPV_V1?.diagnostics?.record(_);}
// [VI dòng gốc 15] Khai báo biến không gán lại bằng const: actorId = gọi String(W.__KVPV_OWN_ACTOR_ID||'') để chuyển sang chuỗi
  const actorId=String(W.__KVPV_OWN_ACTOR_ID||'');
// [VI dòng gốc 16] Khai báo biến không gán lại bằng const: Comp = đọc W._d?._Yct?._Het nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); Sel = đọc W._d?._Yct?._Eet nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); Mov = đọc W._d?._Yct?._zet nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  const Comp=W._d?._Yct?._Het, Sel=W._d?._Yct?._Eet,
// [VI dòng gốc 17] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng name. Đọc cùng dòng mở phía trên: Mov=W._d?._Yct?._zet;
    Mov=W._d?._Yct?._zet;
// [VI dòng gốc 18] Kiểm tra !actorId||!Comp||!Sel||!Mov||!W.KVPV_HITRUN1?.status: đúng thì chạy nhánh sau if.
  if(!actorId||!Comp||!Sel||!Mov||!W.KVPV_HITRUN1?.status){
// [VI dòng gốc 19] gọi console.warn(TAG, 'Chưa sẵn sàng trong game-frame') | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    console.warn(TAG,'Chưa sẵn sàng trong game-frame');return;
// [VI dòng gốc 20] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 21] Khai báo biến không gán lại bằng const: TH = tạo đối tượng bằng Set([1001,1002,1003,1004,1005,1006,1007,1008])
  const TH=new Set([1001,1002,1003,1004,1005,1006,1007,1008]);
// [VI dòng gốc 22] Khai báo biến không gán lại bằng const: CFG = tạo đối tượng gồm goal, tolerance, moveIntervalMs, scanMs, closeGuard, warnNoHitMs
  const CFG={goal:280.4,tolerance:0.45,moveIntervalMs:1500,
// [VI dòng gốc 23] Thuộc tính scanMs: 500 | Thuộc tính closeGuard: 330 | Thuộc tính warnNoHitMs: 25000
    scanMs:500,closeGuard:330,warnNoHitMs:25000};
// [VI dòng gốc 24] Khai báo biến không gán lại bằng const: S = tạo đối tượng gồm running, stopped, selector, combat, target, owner, bossId, bossName, lastTarget, selectorChoices, blockedBasics, blockedOther, allowedTH, confirmedTH, noReady, moves, skips, lastMoveAt, lastHitAt, startedAt, lastDistance, lastHitDistance, lastReason, lastError, hookChanges, interval, seenIds, history
  const S={running:false,stopped:false,selector:null,combat:null,target:null,
// [VI dòng gốc 25] Thuộc tính owner: tạo đối tượng gồm | Thuộc tính bossId: "" | Thuộc tính bossName: "" | Thuộc tính lastTarget: ""
    owner:{},bossId:'',bossName:'',lastTarget:'',selectorChoices:0,
// [VI dòng gốc 26] Thuộc tính blockedBasics: 0 | Thuộc tính blockedOther: 0 | Thuộc tính allowedTH: 0 | Thuộc tính confirmedTH: 0
    blockedBasics:0,blockedOther:0,allowedTH:0,confirmedTH:0,
// [VI dòng gốc 27] Thuộc tính noReady: 0 | Thuộc tính moves: 0 | Thuộc tính skips: 0 | Thuộc tính lastMoveAt: 0
    noReady:0,moves:0,skips:0,lastMoveAt:0,lastHitAt:0,
// [VI dòng gốc 28] Thuộc tính startedAt: 0 | Thuộc tính lastDistance: null | Thuộc tính lastHitDistance: null | Thuộc tính lastReason: "off"
    startedAt:0,lastDistance:null,lastHitDistance:null,lastReason:'off',lastError:'',
// [VI dòng gốc 29] Thuộc tính hookChanges: 0 | Thuộc tính interval: null | Thuộc tính seenIds: tạo đối tượng bằng Set() | Thuộc tính history: tạo mảng gồm 0 vị trí: []
    hookChanges:0,interval:null,seenIds:new Set(),history:[]};
// [VI dòng gốc 30] Định nghĩa hàm prop; tham số: o, k | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | Kết thúc hàm hiện tại và trả về: o?.property?.get?.(k) hoặc dùng vế phải khi vế trái là null/undefined: null. | Nhận lỗi bằng _ và chạy phần xử lý lỗi.
  function prop(o,k){try{return o?.property?.get?.(k)??null;}catch(_){return null;}}
// [VI dòng gốc 31] Khai báo biến không gán lại bằng const: rid = tạo hàm với tham số o; mỗi lần gọi trả về gọi String(prop(o,'id')??o?.id??'') để chuyển sang chuỗi
  const rid=o=>String(prop(o,'id')??o?.id??'');
// [VI dòng gốc 32] Định nghĩa hàm point; tham số: o | Khai báo biến không gán lại bằng const: p = gọi prop(o, 'position') | Kiểm tra !p: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: null.
  function point(o){const p=prop(o,'position');if(!p)return null;
// [VI dòng gốc 33] Khai báo biến không gán lại bằng const: x = gọi Number(p.x) để chuyển sang số; y = gọi Number(p.y) để chuyển sang số
    const x=Number(p.x),y=Number(p.y);
// [VI dòng gốc 34] Kết thúc hàm hiện tại và trả về: nếu Number.isFinite(x)&&Number.isFinite(y) thì lấy {x,y}, ngược lại lấy null.
    return Number.isFinite(x)&&Number.isFinite(y)?{x,y}:null;}
// [VI dòng gốc 35] Định nghĩa hàm current; tham số: không có | Khai báo biến không gán lại bằng const: w = đọc W._C?._Ba?.instance nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  function current(){const w=W._C?._Ba?.instance;
// [VI dòng gốc 36] Khai báo biến không gán lại bằng const: a = w?.getRole?.(Number(actorId))||w?.getRole?.(actorId) hoặc dùng vế phải khi vế trái falsy: null
    const a=w?.getRole?.(Number(actorId))||w?.getRole?.(actorId)||null;
// [VI dòng gốc 37] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm a, selector, combat, mover.
    return {a,selector:a?.getComponent?.(Sel),combat:a?.getComponent?.(Comp),
// [VI dòng gốc 38] Thuộc tính mover: gọi a?.getComponent(Mov) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
      mover:a?.getComponent?.(Mov)};}
// [VI dòng gốc 39] Định nghĩa hàm stageOcc; tham số: không có | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | Khai báo biến không gán lại bằng const: lv = gọi Number(W._Ba?._Co?._Mo?.ins?.curLv) để chuyển sang số
  function stageOcc(){try{const lv=Number(W._Ba?._Co?._Mo?.ins?.curLv);
// [VI dòng gốc 40] Khai báo biến không gán lại bằng const: t = đọc W._ft?._h$?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Khai báo biến không gán lại bằng const: c = gọi t?.getCfgByLv(lv) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const t=W._ft?._h$?.ins;const c=t?.getCfgByLv?.(lv);
// [VI dòng gốc 41] Khai báo biến không gán lại bằng const: n = nếu c thì lấy Number(t.occ(c,lv)), ngược lại lấy NaN
    const n=c?Number(t.occ(c,lv)):NaN;
// [VI dòng gốc 42] Kết thúc hàm hiện tại và trả về: nếu Number.isSafeInteger(n)&&n>0 thì lấy n, ngược lại lấy null. | Nhận lỗi bằng _ và chạy phần xử lý lỗi. | Kết thúc hàm hiện tại và trả về: null.
    return Number.isSafeInteger(n)&&n>0?n:null;}catch(_){return null;}}
// [VI dòng gốc 43] Định nghĩa hàm sceneOk; tham số: c | Khai báo biến không gán lại bằng const: t = đọc c?.combat?.target nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  function sceneOk(c){const t=c?.combat?.target;
// [VI dòng gốc 44] Kiểm tra !t||t.isValid===false||Number(prop(t,'type'))!==1: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: false.
    if(!t||t.isValid===false||Number(prop(t,'type'))!==1)return false;
// [VI dòng gốc 45] Khai báo biến không gán lại bằng const: stage = gọi stageOcc() | Kết thúc hàm hiện tại và trả về: stage!==null và chỉ đánh giá vế phải khi vế trái truthy: Number(prop(t,'occ'))===stage.
    const stage=stageOcc();return stage!==null&&Number(prop(t,'occ'))===stage;}
// [VI dòng gốc 46] Chú thích gốc của tác giả; không được thực thi. Nội dung: Ghi thông tin chẩn đoán trong phạm vi module, giúp đối chiếu trạng thái và thời điểm.
  // Ghi thông tin chẩn đoán trong phạm vi module, giúp đối chiếu trạng thái và thời điểm.
// [VI dòng gốc 47] Định nghĩa hàm log; tham số: type, detail='' | gọi S.history.push({at:Date.now(),type,detail}) để thêm phần tử vào cuối mảng
  function log(type,detail=''){S.history.push({at:Date.now(),type,detail});
// [VI dòng gốc 48] Kiểm tra S.history.length>35: đúng thì chạy nhánh sau if. | gọi S.history.shift()
    if(S.history.length>35)S.history.shift();}
// [VI dòng gốc 49] Định nghĩa hàm restore; tham số: link | Kiểm tra !link: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  function restore(link){if(!link)return;
// [VI dòng gốc 50] Khai báo biến không gán lại bằng const: {obj,key,wrapper,own} = link
    const {obj,key,wrapper,own}=link;
// [VI dòng gốc 51] Kiểm tra obj[key]!==wrapper: đúng thì chạy nhánh sau if. | gán S.lastError bằng 'Another hook replaced '+key+'; not overwriting' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(obj[key]!==wrapper){S.lastError='Another hook replaced '+key+'; not overwriting';return;}
// [VI dòng gốc 52] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | Kiểm tra own: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gọi Object.defineProperty(obj, key, own) | xóa thuộc tính obj[key]
    try{if(own)Object.defineProperty(obj,key,own);else delete obj[key];}
// [VI dòng gốc 53] Nhận lỗi bằng e và chạy phần xử lý lỗi. | gán S.lastError bằng 'Cannot restore '+key+': '+String(e)
    catch(e){S.lastError='Cannot restore '+key+': '+String(e);}}
// [VI dòng gốc 54] Định nghĩa hàm hook; tham số: obj, key, fn | Kiểm tra typeof obj?.[key]!=='function': đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: null.
  function hook(obj,key,fn){if(typeof obj?.[key]!=='function')return null;
// [VI dòng gốc 55] Khai báo biến không gán lại bằng const: own = gọi Object.getOwnPropertyDescriptor(obj, key)
    const own=Object.getOwnPropertyDescriptor(obj,key);
// [VI dòng gốc 56] Kiểm tra own&&own.configurable===false: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: null.
    if(own&&own.configurable===false)return null;
// [VI dòng gốc 57] Khai báo biến không gán lại bằng const: before = đọc obj[key] | Khai báo biến không gán lại bằng const: wrapper = gọi fn(before)
    const before=obj[key];const wrapper=fn(before);
// [VI dòng gốc 58] gọi Object.defineProperty(obj, key, {configurable:true,writable:true, enumerable:own?.enumerable??false,value:wrapper})
    Object.defineProperty(obj,key,{configurable:true,writable:true,
// [VI dòng gốc 59] Thuộc tính enumerable: own?.enumerable hoặc dùng vế phải khi vế trái là null/undefined: false | Thuộc tính value: wrapper
      enumerable:own?.enumerable??false,value:wrapper});
// [VI dòng gốc 60] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm obj, key, own, wrapper.
    return {obj,key,own,wrapper};}
// [VI dòng gốc 61] Định nghĩa hàm unbind; tham số: không có | gọi restore(S.selector) | gọi restore(S.combat)
  function unbind(){restore(S.selector);restore(S.combat);
// [VI dòng gốc 62] gán S.selector bằng null | gán S.combat bằng null
    S.selector=null;S.combat=null;}
// [VI dòng gốc 63] Định nghĩa hàm bind; tham số: c
  function bind(c){
// [VI dòng gốc 64] Kiểm tra S.selector?.obj===c.selector && S.combat?.obj===c.combat && S.selector?.obj?._f7t===S.selector?.wrapper && S.combat?.obj?.combat===S.combat?.wrapper: đúng thì chạy nhánh sau if.
    if(S.selector?.obj===c.selector && S.combat?.obj===c.combat &&
// [VI dòng gốc 65] Tiếp tục hàm bind; thành phần cú pháp bắt đầu bằng name. Đọc cùng dòng mở phía trên: S.selector?.obj?._f7t===S.selector?.wrapper &&
       S.selector?.obj?._f7t===S.selector?.wrapper &&
// [VI dòng gốc 66] Kết thúc hàm hiện tại và trả về: true.
       S.combat?.obj?.combat===S.combat?.wrapper)return true;
// [VI dòng gốc 67] gọi unbind()
    unbind();
// [VI dòng gốc 68] Khai báo biến không gán lại bằng const: sh = gọi hook(c.selector, '_f7t', native=>function(active,common,mode){ if(!S.running||this!==c.selector||mode!==1|| !sceneOk(current(…)
    const sh=hook(c.selector,'_f7t',native=>function(active,common,mode){
// [VI dòng gốc 69] Kiểm tra !S.running||this!==c.selector||mode!==1|| !sceneOk(current())||!Array.isArray(active): đúng thì chạy nhánh sau if.
      if(!S.running||this!==c.selector||mode!==1||
// [VI dòng gốc 70] gọi sceneOk(current()) | gọi current() | gọi Array.isArray(active)
         !sceneOk(current())||!Array.isArray(active))
// [VI dòng gốc 71] Kết thúc hàm hiện tại và trả về: gọi native.apply(this, arguments).
        return native.apply(this,arguments);
// [VI dòng gốc 72] Chú thích gốc của tác giả; không được thực thi. Nội dung: Pass only genuine Tuyet Hoc rows to the ORIGINAL selector.
      // Pass only genuine Tuyet Hoc rows to the ORIGINAL selector.
// [VI dòng gốc 73] Chú thích gốc của tác giả; không được thực thi. Nội dung: Empty native lists yield -1: wait, never fall back to basic attacks.
      // Empty native lists yield -1: wait, never fall back to basic attacks.
// [VI dòng gốc 74] Khai báo biến không gán lại bằng const: a = gọi active.filter(r=>TH.has(Number(r?.[0]))) để giữ phần tử thỏa điều kiện
      const a=active.filter(r=>TH.has(Number(r?.[0])));
// [VI dòng gốc 75] Khai báo biến không gán lại bằng const: b = nếu Array.isArray(common) thì lấy common.filter(r=>TH.has(Number(r?.[0]))), ngược lại lấy []
      const b=Array.isArray(common)?common.filter(r=>TH.has(Number(r?.[0]))):[];
// [VI dòng gốc 76] Khai báo biến không gán lại bằng const: chosen = gọi native.call(this, a, b, mode)
      const chosen=native.call(this,a,b,mode);
// [VI dòng gốc 77] Kiểm tra TH.has(Number(chosen)): đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | tăng S.selectorChoices một đơn vị sau khi lấy giá trị | gọi S.seenIds.add(Number(chosen))
      if(TH.has(Number(chosen))){S.selectorChoices++;S.seenIds.add(Number(chosen));}
// [VI dòng gốc 78] tăng S.noReady một đơn vị sau khi lấy giá trị
      else S.noReady++;
// [VI dòng gốc 79] Kết thúc hàm hiện tại và trả về: nếu TH.has(Number(chosen)) thì lấy chosen, ngược lại lấy -1.
      return TH.has(Number(chosen))?chosen:-1;
// [VI dòng gốc 80] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    });
// [VI dòng gốc 81] Kiểm tra !sh: đúng thì chạy nhánh sau if. | gán S.lastError bằng 'Cannot hook native skill selector' | Kết thúc hàm hiện tại và trả về: false.
    if(!sh){S.lastError='Cannot hook native skill selector';return false;}
// [VI dòng gốc 82] Khai báo biến không gán lại bằng const: ch = gọi hook(c.combat, 'combat', native=>function(skillId){ if(S.running&&this===c.combat&&sceneOk(current())){ const id=Number(skill…)
    const ch=hook(c.combat,'combat',native=>function(skillId){
// [VI dòng gốc 83] Kiểm tra S.running&&this===c.combat&&sceneOk(current()): đúng thì chạy nhánh sau if.
      if(S.running&&this===c.combat&&sceneOk(current())){
// [VI dòng gốc 84] Khai báo biến không gán lại bằng const: id = gọi Number(skillId) để chuyển sang số
        const id=Number(skillId);
// [VI dòng gốc 85] Kiểm tra id===-1: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: undefined.
        if(id===-1)return undefined;
// [VI dòng gốc 86] Kiểm tra !TH.has(id): đúng thì chạy nhánh sau if.
        if(!TH.has(id)){
// [VI dòng gốc 87] Kiểm tra id>=8001&&id<=8009: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | tăng S.blockedBasics một đơn vị sau khi lấy giá trị
          if(id>=8001&&id<=8009)S.blockedBasics++;
// [VI dòng gốc 88] tăng S.blockedOther một đơn vị sau khi lấy giá trị
          else S.blockedOther++;
// [VI dòng gốc 89] Kết thúc hàm hiện tại và trả về: undefined.
          return undefined; // no basic attacks, no other actor attack skills
// [VI dòng gốc 90] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
        }
// [VI dòng gốc 91] tăng S.allowedTH một đơn vị sau khi lấy giá trị
        S.allowedTH++;
// [VI dòng gốc 92] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
      }
// [VI dòng gốc 93] Kết thúc hàm hiện tại và trả về: gọi native.apply(this, arguments).
      return native.apply(this,arguments);
// [VI dòng gốc 94] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    });
// [VI dòng gốc 95] Kiểm tra !ch: đúng thì chạy nhánh sau if. | gọi restore(sh) | gán S.lastError bằng 'Cannot hook native combat' | Kết thúc hàm hiện tại và trả về: false.
    if(!ch){restore(sh);S.lastError='Cannot hook native combat';return false;}
// [VI dòng gốc 96] gán S.selector bằng sh | gán S.combat bằng ch | tăng S.hookChanges một đơn vị sau khi lấy giá trị
    S.selector=sh;S.combat=ch;S.hookChanges++;
// [VI dòng gốc 97] gọi log('HOOK', 'actor main combat + main selector')
    log('HOOK', 'actor main combat + main selector');
// [VI dòng gốc 98] Kết thúc hàm hiện tại và trả về: true.
    return true;
// [VI dòng gốc 99] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 100] Định nghĩa hàm detachTarget; tham số: không có | Kiểm tra S.target: đúng thì chạy nhánh sau if. | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | gọi S.target.off(1012, S.owner, onHit) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  function detachTarget(){if(S.target){try{S.target.off?.(1012,S.owner,onHit);}catch(_){window.KVPV_V1?.diagnostics?.record(_);}}
// [VI dòng gốc 101] gán S.target bằng null | gán S.bossId bằng '' | gán S.bossName bằng ''
    S.target=null;S.bossId='';S.bossName='';}
// [VI dòng gốc 102] Định nghĩa hàm onHit; tham số: source, marker, damage, flags, receiver
  function onHit(source,marker,damage,flags,receiver){
// [VI dòng gốc 103] Kiểm tra !S.running||String(source)!==actorId||String(receiver)!==S.bossId: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(!S.running||String(source)!==actorId||String(receiver)!==S.bossId)return;
// [VI dòng gốc 104] Khai báo biến không gán lại bằng const: raw = gọi Number(marker) để chuyển sang số; id = tính biểu thức raw/10000; f = Number(flags) hoặc dùng vế phải khi vế trái falsy: 0
    const raw=Number(marker),id=raw/10000,f=Number(flags)||0;
// [VI dòng gốc 105] Kiểm tra !Number.isSafeInteger(raw)||raw%10000!==0||!TH.has(id)|| !(Number(damage)>0)||(f&(4|16|32|128|256)): đúng thì chạy nhánh sau if.
    if(!Number.isSafeInteger(raw)||raw%10000!==0||!TH.has(id)||
// [VI dòng gốc 106] Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
       !(Number(damage)>0)||(f&(4|16|32|128|256)))return;
// [VI dòng gốc 107] tăng S.confirmedTH một đơn vị sau khi lấy giá trị | gán S.lastHitAt bằng Date.now()
    S.confirmedTH++;S.lastHitAt=Date.now();
// [VI dòng gốc 108] Khai báo biến không gán lại bằng const: c = gọi current(); a = gọi point(c.a); b = gọi point(S.target)
    const c=current(),a=point(c.a),b=point(S.target);
// [VI dòng gốc 109] gán S.lastHitDistance bằng a&&b?+Math.hypot(a.x-b.x,a.y-b.y).toFixed(1):null
    S.lastHitDistance=a&&b?+Math.hypot(a.x-b.x,a.y-b.y).toFixed(1):null;
// [VI dòng gốc 110] gọi log('HIT', {skillId:id,distance:S.lastHitDistance})
    log('HIT',{skillId:id,distance:S.lastHitDistance});
// [VI dòng gốc 111] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 112] Định nghĩa hàm attachTarget; tham số: t | Kiểm tra S.target===t: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  function attachTarget(t){if(S.target===t)return;
// [VI dòng gốc 113] gọi detachTarget() | Kiểm tra !t||!rid(t): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    detachTarget();if(!t||!rid(t))return;
// [VI dòng gốc 114] gán S.target bằng t | gán S.bossId bằng rid(t) | gán S.bossName bằng String(prop(t,'name')||'Boss')
    S.target=t;S.bossId=rid(t);S.bossName=String(prop(t,'name')||'Boss');
// [VI dòng gốc 115] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | gọi t.on(1012, S.owner, onHit) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Nhận lỗi bằng e và chạy phần xử lý lỗi. | gán S.lastError bằng 'Hit listener: '+String(e)
    try{t.on?.(1012,S.owner,onHit);}catch(e){S.lastError='Hit listener: '+String(e);}
// [VI dòng gốc 116] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 117] Chú thích gốc của tác giả; không được thực thi. Nội dung: Thực hiện một lượt kiểm tra của module; các nhánh bên dưới quyết định có đủ điều kiện để hành động hay phải chờ.
  // Thực hiện một lượt kiểm tra của module; các nhánh bên dưới quyết định có đủ điều kiện để hành động hay phải chờ.
// [VI dòng gốc 118] Định nghĩa hàm tick; tham số: không có. Mục đích: xử lý một nhịp kiểm tra | Kiểm tra !S.running: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  function tick(){if(!S.running)return;
// [VI dòng gốc 119] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài.
    try{
// [VI dòng gốc 120] Kiểm tra String(W._Ba?._rJ?._O$?.ins?.actorId??'')!==actorId|| W.__KVPV_UNIVERSAL_HALTED: đúng thì chạy nhánh sau if.
      if(String(W._Ba?._rJ?._O$?.ins?.actorId??'')!==actorId||
// [VI dòng gốc 121] gọi stop('actor/session change') để dừng bộ điều khiển và dọn tài nguyên | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
         W.__KVPV_UNIVERSAL_HALTED){stop('actor/session change');return;}
// [VI dòng gốc 122] Khai báo biến không gán lại bằng const: c = gọi current()
      const c=current();
// [VI dòng gốc 123] Kiểm tra !c.a||!c.combat||!c.selector||!c.mover: đúng thì chạy nhánh sau if. | gán S.lastReason bằng 'no_live_components' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      if(!c.a||!c.combat||!c.selector||!c.mover){S.lastReason='no_live_components';return;}
// [VI dòng gốc 124] Kiểm tra !bind(c): đúng thì chạy nhánh sau if. | gán S.lastReason bằng 'hook_failed' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      if(!bind(c)){S.lastReason='hook_failed';return;}
// [VI dòng gốc 125] Kiểm tra !sceneOk(c): đúng thì chạy nhánh sau if. | gọi detachTarget() | gán S.lastReason bằng 'not_tianquan' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      if(!sceneOk(c)){detachTarget();S.lastReason='not_tianquan';return;}
// [VI dòng gốc 126] gọi attachTarget(c.combat.target)
      attachTarget(c.combat.target);
// [VI dòng gốc 127] Kiểm tra W.KVPV_MODE?.status?.(false)?.mode!=='BOSS_TH': đúng thì chạy nhánh sau if.
      if(W.KVPV_MODE?.status?.(false)?.mode!=='BOSS_TH'){
// [VI dòng gốc 128] gán S.lastReason bằng 'mode_not_boss_th' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
        S.lastReason='mode_not_boss_th';return;
// [VI dòng gốc 129] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
      }
// [VI dòng gốc 130] Khai báo biến không gán lại bằng const: hr = gọi W.KVPV_HITRUN1?.status(false) để trả trạng thái để kiểm tra (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
      const hr=W.KVPV_HITRUN1?.status?.(false);
// [VI dòng gốc 131] Kiểm tra !hr?.running||hr.phase!=='FIGHT': đúng thì chạy nhánh sau if.
      if(!hr?.running||hr.phase!=='FIGHT'){
// [VI dòng gốc 132] gán S.lastReason bằng 'hitrun_'+(hr?.phase||'off') | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
        S.lastReason='hitrun_'+(hr?.phase||'off');return;}
// [VI dòng gốc 133] Kiểm tra Number(hr.hpPct)<Math.max(48,Number(hr.leavePct||35)+10): đúng thì chạy nhánh sau if.
      if(Number(hr.hpPct)<Math.max(48,Number(hr.leavePct||35)+10)){
// [VI dòng gốc 134] gán S.lastReason bằng 'low_hp' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
        S.lastReason='low_hp';return;}
// [VI dòng gốc 135] Kiểm tra W.document?.hidden: đúng thì chạy nhánh sau if. | gán S.lastReason bằng 'tab_background' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      if(W.document?.hidden){S.lastReason='tab_background';return;}
// [VI dòng gốc 136] Khai báo biến không gán lại bằng const: next = đọc W.KVPV_V127_BASIC?.status?.(false)?.nextImpactInMs nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
      const next=W.KVPV_V127_BASIC?.status?.(false)?.nextImpactInMs;
// [VI dòng gốc 137] Kiểm tra Number.isFinite(next)&&next>=-100&&next<=1350: đúng thì chạy nhánh sau if. | gán S.lastReason bằng 'dodge_soon' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      if(Number.isFinite(next)&&next>=-100&&next<=1350){S.lastReason='dodge_soon';return;}
// [VI dòng gốc 138] Khai báo biến không gán lại bằng const: a = gọi point(c.a); b = gọi point(c.combat.target)
      const a=point(c.a),b=point(c.combat.target);
// [VI dòng gốc 139] Kiểm tra !a||!b: đúng thì chạy nhánh sau if. | gán S.lastReason bằng 'position_missing' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      if(!a||!b){S.lastReason='position_missing';return;}
// [VI dòng gốc 140] Khai báo biến không gán lại bằng const: dx = tính biểu thức a.x-b.x; dy = tính biểu thức a.y-b.y; d = gọi Math.hypot(dx, dy)
      const dx=a.x-b.x,dy=a.y-b.y,d=Math.hypot(dx,dy);
// [VI dòng gốc 141] gán S.lastDistance bằng +d.toFixed(2)
      S.lastDistance=+d.toFixed(2);
// [VI dòng gốc 142] Kiểm tra !Number.isFinite(d)||d<1: đúng thì chạy nhánh sau if. | gán S.lastReason bằng 'overlap' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      if(!Number.isFinite(d)||d<1){S.lastReason='overlap';return;}
// [VI dòng gốc 143] Kiểm tra Math.abs(d-CFG.goal)<=CFG.tolerance: đúng thì chạy nhánh sau if. | gán S.lastReason bằng 'holding_far' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      if(Math.abs(d-CFG.goal)<=CFG.tolerance){S.lastReason='holding_far';return;}
// [VI dòng gốc 144] Chú thích gốc của tác giả; không được thực thi. Nội dung: From far away, let native auto approach the Boss first to avoid ping-pong.
      // From far away, let native auto approach the Boss first to avoid ping-pong.
// [VI dòng gốc 145] Kiểm tra d>CFG.closeGuard: đúng thì chạy nhánh sau if. | gán S.lastReason bằng 'native_approach' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      if(d>CFG.closeGuard){S.lastReason='native_approach';return;}
// [VI dòng gốc 146] Kiểm tra Date.now()-S.lastMoveAt<CFG.moveIntervalMs: đúng thì chạy nhánh sau if. | gán S.lastReason bằng 'move_cooldown' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      if(Date.now()-S.lastMoveAt<CFG.moveIntervalMs){S.lastReason='move_cooldown';return;}
// [VI dòng gốc 147] Kiểm tra typeof c.mover.moveTo!=='function': đúng thì chạy nhánh sau if. | gán S.lastReason bằng 'no_mover' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      if(typeof c.mover.moveTo!=='function'){S.lastReason='no_mover';return;}
// [VI dòng gốc 148] Chú thích gốc của tác giả; không được thực thi. Nội dung: A bounded client waypoint, no server-range or cooldown changes.
      // A bounded client waypoint, no server-range or cooldown changes.
// [VI dòng gốc 149] Khai báo biến không gán lại bằng const: x = tính biểu thức b.x+dx/d*CFG.goal; y = tính biểu thức b.y+dy/d*CFG.goal
      const x=b.x+dx/d*CFG.goal,y=b.y+dy/d*CFG.goal;
// [VI dòng gốc 150] Kiểm tra !Number.isFinite(x)||!Number.isFinite(y): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      if(!Number.isFinite(x)||!Number.isFinite(y))return;
// [VI dòng gốc 151] gọi c.mover.moveTo(x, y) | gán S.lastMoveAt bằng Date.now() | tăng S.moves một đơn vị sau khi lấy giá trị
      c.mover.moveTo(x,y);S.lastMoveAt=Date.now();S.moves++;
// [VI dòng gốc 152] gán S.lastReason bằng d<CFG.goal?'move_out':'move_in'
      S.lastReason=d<CFG.goal?'move_out':'move_in';
// [VI dòng gốc 153] Nhận lỗi bằng e và chạy phần xử lý lỗi. | gán S.lastError bằng String(e?.message||e) | gán S.lastReason bằng 'error'
    }catch(e){S.lastError=String(e?.message||e);S.lastReason='error';}
// [VI dòng gốc 154] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 155] Chú thích gốc của tác giả; không được thực thi. Nội dung: Trả trạng thái hiện tại để kiểm tra; ý nghĩa từng bộ đếm thuộc phạm vi module này.
  // Trả trạng thái hiện tại để kiểm tra; ý nghĩa từng bộ đếm thuộc phạm vi module này.
// [VI dòng gốc 156] Định nghĩa hàm status; tham số: show=true. Mục đích: trả trạng thái để kiểm tra
  function status(show=true){
// [VI dòng gốc 157] Khai báo biến không gán lại bằng const: c = gọi current() | Khai báo biến không gán lại bằng const: ids = tạo mảng gồm 0 vị trí: []
    const c=current();const ids=[];
// [VI dòng gốc 158] Duyệt từng giá trị trong [c.selector?._rtt,c.selector?._wet] bằng const rows. | Khai báo biến không gán lại bằng const: rows (chưa gán giá trị) | Kiểm tra Array.isArray(rows): đúng thì chạy nhánh sau if.
    for(const rows of [c.selector?._rtt,c.selector?._wet])if(Array.isArray(rows))
// [VI dòng gốc 159] Duyệt từng giá trị trong rows bằng const row. | Khai báo biến không gán lại bằng const: row (chưa gán giá trị) | Kiểm tra TH.has(Number(row?.[0])): đúng thì chạy nhánh sau if. | gọi ids.push(Number(row[0])) để thêm phần tử vào cuối mảng
      for(const row of rows)if(TH.has(Number(row?.[0])))ids.push(Number(row[0]));
// [VI dòng gốc 160] Khai báo biến không gán lại bằng const: out = tạo đối tượng gồm version, enabled, modeControl, goalDistance, measuredDistance, availableTuyetHoc, selectedTuyetHoc, allowedTH, confirmedTH, blockedBasics, blockedOther, cooldownNoReady, moves, boss, lastHitDistance, lastReason, lastError, selectorHooked, combatHooked, note
    const out={version:'12.9.5',enabled:S.running,
// [VI dòng gốc 161] Thuộc tính modeControl: "KVPV_MODE"
      modeControl:'KVPV_MODE',
// [VI dòng gốc 162] Thuộc tính goalDistance: đọc CFG.goal | Thuộc tính measuredDistance: đọc S.lastDistance
      goalDistance:CFG.goal,measuredDistance:S.lastDistance,
// [VI dòng gốc 163] Thuộc tính availableTuyetHoc: gọi [...new Set(ids)].sort((a,b)=>a-b) để sắp xếp mảng tại chỗ
      availableTuyetHoc:[...new Set(ids)].sort((a,b)=>a-b),
// [VI dòng gốc 164] Thuộc tính selectedTuyetHoc: gọi [...S.seenIds].sort((a,b)=>a-b) để sắp xếp mảng tại chỗ
      selectedTuyetHoc:[...S.seenIds].sort((a,b)=>a-b),
// [VI dòng gốc 165] Thuộc tính allowedTH: đọc S.allowedTH | Thuộc tính confirmedTH: đọc S.confirmedTH
      allowedTH:S.allowedTH,confirmedTH:S.confirmedTH,
// [VI dòng gốc 166] Thuộc tính blockedBasics: đọc S.blockedBasics | Thuộc tính blockedOther: đọc S.blockedOther
      blockedBasics:S.blockedBasics,blockedOther:S.blockedOther,
// [VI dòng gốc 167] Thuộc tính cooldownNoReady: đọc S.noReady | Thuộc tính moves: đọc S.moves | Thuộc tính boss: S.bossName hoặc dùng vế phải khi vế trái falsy: null
      cooldownNoReady:S.noReady,moves:S.moves,boss:S.bossName||null,
// [VI dòng gốc 168] Thuộc tính lastHitDistance: đọc S.lastHitDistance | Thuộc tính lastReason: đọc S.lastReason | Thuộc tính lastError: đọc S.lastError
      lastHitDistance:S.lastHitDistance,lastReason:S.lastReason,lastError:S.lastError,
// [VI dòng gốc 169] Thuộc tính selectorHooked: !!S.selector và chỉ đánh giá vế phải khi vế trái truthy: S.selector.obj._f7t===S.selector.wrapper
      selectorHooked:!!S.selector&&S.selector.obj._f7t===S.selector.wrapper,
// [VI dòng gốc 170] Thuộc tính combatHooked: !!S.combat và chỉ đánh giá vế phải khi vế trái truthy: S.combat.obj.combat===S.combat.wrapper
      combatHooked:!!S.combat&&S.combat.obj.combat===S.combat.wrapper,
// [VI dòng gốc 171] Thuộc tính note: nếu ids.length thì lấy 'Only 1001..1008 from native selector; when cooling down NO basic fallback. Server hit range unchanged.', ngược lại lấy 'No native Tuyet Hoc 1001..1008 in current selector; waits without basic attacks. Check game skill configuration.'
      note:ids.length?'Only 1001..1008 from native selector; when cooling down NO basic fallback. Server hit range unchanged.':'No native Tuyet Hoc 1001..1008 in current selector; waits without basic attacks. Check game skill configuration.'};
// [VI dòng gốc 172] Kiểm tra show: đúng thì chạy nhánh sau if. | gọi console.table([out]) | Kết thúc hàm hiện tại và trả về: out.
    if(show)console.table([out]);return out;
// [VI dòng gốc 173] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 174] Chú thích gốc của tác giả; không được thực thi. Nội dung: Bật bộ điều khiển và lịch kiểm tra của module; trả trạng thái sau khi khởi động.
  // Bật bộ điều khiển và lịch kiểm tra của module; trả trạng thái sau khi khởi động.
// [VI dòng gốc 175] Định nghĩa hàm start; tham số: không có. Mục đích: khởi động bộ điều khiển
  function start(){
// [VI dòng gốc 176] Kiểm tra S.stopped: đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('Bản này đã stop vĩnh viễn, cần F5 nạp lại')
    if(S.stopped)throw Error('Bản này đã stop vĩnh viễn, cần F5 nạp lại');
// [VI dòng gốc 177] Kiểm tra S.running: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: gọi status(false) để trả trạng thái để kiểm tra.
    if(S.running)return status(false);
// [VI dòng gốc 178] Kiểm tra String(W._Ba?._rJ?._O$?.ins?.actorId??'')!==actorId: đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('Sai nhân vật')
    if(String(W._Ba?._rJ?._O$?.ins?.actorId??'')!==actorId)throw Error('Sai nhân vật');
// [VI dòng gốc 179] gán S.running bằng true | gán S.startedAt bằng Date.now() | gán S.lastReason bằng 'starting'
    S.running=true;S.startedAt=Date.now();S.lastReason='starting';
// [VI dòng gốc 180] gán S.interval bằng (W.KVPV_V1?.timers?.setInterval ?? W.setInterval)(tick,CFG.scanMs) | gọi tick() để xử lý một nhịp kiểm tra
    S.interval=(W.KVPV_V1?.timers?.setInterval ?? W.setInterval)(tick,CFG.scanMs);tick();
// [VI dòng gốc 181] Kết thúc hàm hiện tại và trả về: gọi status(false) để trả trạng thái để kiểm tra.
    return status(false);
// [VI dòng gốc 182] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 183] Chú thích gốc của tác giả; không được thực thi. Nội dung: Dừng bộ điều khiển, hủy lịch và giải phóng tài nguyên do module này sở hữu.
  // Dừng bộ điều khiển, hủy lịch và giải phóng tài nguyên do module này sở hữu.
// [VI dòng gốc 184] Định nghĩa hàm stop; tham số: reason='user stop'. Mục đích: dừng bộ điều khiển và dọn tài nguyên
  function stop(reason='user stop'){
// [VI dòng gốc 185] gán S.running bằng false
    S.running=false;
// [VI dòng gốc 186] Kiểm tra S.interval!==null: đúng thì chạy nhánh sau if. | gọi W.KVPV_V1?.timers?.clearInterval ?? W.clearInterval(S.interval) | gán S.interval bằng null
    if(S.interval!==null){(W.KVPV_V1?.timers?.clearInterval ?? W.clearInterval)(S.interval);S.interval=null;}
// [VI dòng gốc 187] gọi unbind() | gọi detachTarget() | gán S.lastReason bằng reason | gọi log('STOP', reason)
    unbind();detachTarget();S.lastReason=reason;log('STOP',reason);
// [VI dòng gốc 188] Kết thúc hàm hiện tại và trả về: gọi status(false) để trả trạng thái để kiểm tra.
    return status(false);
// [VI dòng gốc 189] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 190] Khai báo biến không gán lại bằng const: api = tạo đối tượng gồm start, stop, status, history
  const api={start,stop,status,history:()=>S.history.slice()};
// [VI dòng gốc 191] gán W[NAME] bằng api
  W[NAME]=api;
// [VI dòng gốc 192] gọi console.info(TAG, 'READY/OFF. Chạy KVPV_MODE.start("BOSS_TH") để chỉ xả Tuyệt Học ở xa.')
  console.info(TAG,'READY/OFF. Chạy KVPV_MODE.start("BOSS_TH") để chỉ xả Tuyệt Học ở xa.');
// [VI dòng gốc 193] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: })();
})();
// [VI dòng gốc 194] Dòng trống để tách các phần, không có lệnh thực thi.
