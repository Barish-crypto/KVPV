// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: Mỗi game-frame giữ một phiên độc lập cho nhân vật đang đăng nhập.
/* Mỗi game-frame giữ một phiên độc lập cho nhân vật đang đăng nhập.
 * Không đổi khóa actor khi đổi nhân vật trong cùng phiên; không giả mạo trạng thái focus.
 * Tab nền không bị bộ combat tự dừng, nhưng browser/game vẫn có thể giảm nhịp timer. */
// [VI dòng gốc 4] chạy ngay hàm bao để tạo phạm vi và khởi tạo phần chức năng bên trong
(() => {
// [VI dòng gốc 5] Khai báo biến không gán lại bằng const: W = window; config = tạo đối tượng gồm pauseWhenHidden, backgroundTickMs, unfocusedTickMs
  const W=window,config={pauseWhenHidden:false,backgroundTickMs:1,unfocusedTickMs:1};
// [VI dòng gốc 6] Khai báo biến không gán lại bằng const: focused = tạo hàm với tham số (không có); mỗi lần gọi trả về nếu typeof W.document?.hasFocus==='function' thì lấy W.document.hasFocus(), ngược lại lấy null
  const focused=()=>typeof W.document?.hasFocus==='function'?W.document.hasFocus():null;
// [VI dòng gốc 7] Khai báo biến không gán lại bằng const: pollingGap = tạo hàm với tham số (không có); mỗi lần gọi trả về nếu W.document?.hidden thì lấy config.backgroundTickMs, ngược lại lấy focused()===false?config.unfocusedTickMs:0
  const pollingGap=()=>W.document?.hidden?config.backgroundTickMs:focused()===false?config.unfocusedTickMs:0;
// [VI dòng gốc 8] gán W.KVPV_ACCOUNT_POLICY bằng Object.freeze({config,pollingGap,status(){ const actor=String(W._Ba?._rJ?._O$?.ins?.actorId??''),owner=String(W.__KVPV_OWN_ACTOR_ID??''); const me=W._C?._Ba?.instance?.getRole?.(Nu…
  W.KVPV_ACCOUNT_POLICY=Object.freeze({config,pollingGap,status(){
// [VI dòng gốc 9] Khai báo biến không gán lại bằng const: actor = gọi String(W._Ba?._rJ?._O$?.ins?.actorId??'') để chuyển sang chuỗi; owner = gọi String(W.__KVPV_OWN_ACTOR_ID??'') để chuyển sang chuỗi
    const actor=String(W._Ba?._rJ?._O$?.ins?.actorId??''),owner=String(W.__KVPV_OWN_ACTOR_ID??'');
// [VI dòng gốc 10] Khai báo biến không gán lại bằng const: me = W._C?._Ba?.instance?.getRole?.(Number(actor)) hoặc dùng vế phải khi vế trái là null/undefined: W._C?._Ba?.instance?.getRole?.(actor)
    const me=W._C?._Ba?.instance?.getRole?.(Number(actor))??W._C?._Ba?.instance?.getRole?.(actor);
// [VI dòng gốc 11] Khai báo biến không gán lại bằng const: types = đọc W._d?._Yct nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); selector = gọi me?.getComponent(types?._Eet) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const types=W._d?._Yct,selector=me?.getComponent?.(types?._Eet);
// [VI dòng gốc 12] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm actorId, ownerId, actorMatches, playerLoaded, hidden, pauseWhenHidden, backgroundTickMs, focused, pollingGapMs, components, nativeSkillIds, note.
    return {actorId:actor,ownerId:owner,actorMatches:!!actor&&actor===owner,playerLoaded:!!me,
// [VI dòng gốc 13] Thuộc tính hidden: W.document?.hidden hoặc dùng vế phải khi vế trái là null/undefined: null | Thuộc tính pauseWhenHidden: đọc config.pauseWhenHidden | Thuộc tính backgroundTickMs: đọc config.backgroundTickMs
      hidden:W.document?.hidden??null,pauseWhenHidden:config.pauseWhenHidden,backgroundTickMs:config.backgroundTickMs,
// [VI dòng gốc 14] Thuộc tính focused: gọi focused() | Thuộc tính pollingGapMs: gọi pollingGap()
      focused:focused(),pollingGapMs:pollingGap(),
// [VI dòng gốc 15] Thuộc tính components: tạo đối tượng gồm selector, combat, mover | Thuộc tính selector: đảo giá trị đúng/sai của !selector | Thuộc tính combat: đảo giá trị đúng/sai của !me?.getComponent?.(types?._Het) | Thuộc tính mover: đảo giá trị đúng/sai của !me?.getComponent?.(types?._zet)
      components:{selector:!!selector,combat:!!me?.getComponent?.(types?._Het),mover:!!me?.getComponent?.(types?._zet)},
// [VI dòng gốc 16] Thuộc tính nativeSkillIds: tạo mảng gồm 1 vị trí: [...new Set([...(selector?._rtt??[]),...(selector?._wet??[])].map(row=>Number(row?.[0])).filter(Number.isSafeInteger))]
      nativeSkillIds:[...new Set([...(selector?._rtt??[]),...(selector?._wet??[])].map(row=>Number(row?.[0])).filter(Number.isSafeInteger))],
// [VI dòng gốc 17] Thuộc tính note: "Per-frame session; no fixed main/clone identity. Background browser/game throttling is not bypassed."
      note:'Per-frame session; no fixed main/clone identity. Background browser/game throttling is not bypassed.'};
// [VI dòng gốc 18] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }});
// [VI dòng gốc 19] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: })();
})();
// [VI dòng gốc 20] Dòng trống để tách các phần, không có lệnh thực thi.
