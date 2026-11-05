// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: CHÚ THÍCH V1 — Cổng kiểm tra khoảng cách phía client.
/* CHÚ THÍCH V1 — Cổng kiểm tra khoảng cách phía client.
 * Giữ tên RANGE281 để tương thích. Chỉ mở rộng kiểm tra cho nhân vật sở hữu và Boss đủ điều kiện; kết quả client không bảo đảm máy chủ chấp nhận đòn đánh.
 * Sửa nguồn tại đây rồi chạy node build.cjs; FULL và bản vá được sinh tự động. */
// [VI dòng gốc 4] Chú thích gốc của tác giả; không được thực thi. Nội dung: Client range trial for the active Tian Quan skill controller. [đóng chú thích]
/* Client range trial for the active Tian Quan skill controller. */
// [VI dòng gốc 5] Chú thích gốc của tác giả; không được thực thi. Nội dung: KVPV RANGE281 — guarded client-only +1 trial for Thiên Quan stage bosses.
/* KVPV RANGE281 — guarded client-only +1 trial for Thiên Quan stage bosses.
 * Included in V1; dependencies are installed by the bundle in order.
 * No RPC, cooldown, damage/stat changes. Does NOT enlarge server hit range.
 */
// [VI dòng gốc 9] chạy ngay hàm bao để tạo phạm vi và khởi tạo phần chức năng bên trong
(() => {
// [VI dòng gốc 10] "use strict"
  'use strict';
// [VI dòng gốc 11] Khai báo biến không gán lại bằng const: W = window
  const W = window;
// [VI dòng gốc 12] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | gọi W.KVPV_RANGE281?.stop() để dừng bộ điều khiển và dọn tài nguyên (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Nhận lỗi bằng _ và chạy phần xử lý lỗi. | gọi window.KVPV_V1?.diagnostics?.record(_) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  try { W.KVPV_RANGE281?.stop?.(); } catch(_){window.KVPV_V1?.diagnostics?.record(_);}
// [VI dòng gốc 13] Khai báo biến không gán lại bằng const: name = "KVPV_RANGE281"
  const name='KVPV_RANGE281';
// [VI dòng gốc 14] Khai báo biến không gán lại bằng const: baseRadius = 280 | Khai báo biến có thể gán lại bằng let: requestedRadius = 281
  const baseRadius=280; let requestedRadius=281;
// [VI dòng gốc 15] Khai báo biến không gán lại bằng const: P = đọc W._d?._Yct?._Het?.prototype nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  const P=W._d?._Yct?._Het?.prototype;
// [VI dòng gốc 16] Khai báo biến không gán lại bằng const: pos = đọc W.KVPV_BOSS_POSITION
  const pos=W.KVPV_BOSS_POSITION;
// [VI dòng gốc 17] Khai báo biến không gán lại bằng const: actorId = gọi String(W._Ba?._rJ?._O$?.ins?.actorId??'') để chuyển sang chuỗi
  const actorId=String(W._Ba?._rJ?._O$?.ins?.actorId??'');
// [VI dòng gốc 18] Kiểm tra !P || typeof P.isValidRange!=='function' || !actorId: đúng thì chạy nhánh sau if.
  if(!P || typeof P.isValidRange!=='function' || !actorId){
// [VI dòng gốc 19] gọi console.error('[RANGE281] Module V1 chưa sẵn sàng; kiểm tra game-frame.') | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    console.error('[RANGE281] Module V1 chưa sẵn sàng; kiểm tra game-frame.');return;
// [VI dòng gốc 20] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 21] Chú thích gốc của tác giả; không được thực thi. Nội dung: Bộ giữ vị trí cũ có watchdog riêng: dừng hẳn trước khi RANGE nhận hook.
  // Bộ giữ vị trí cũ có watchdog riêng: dừng hẳn trước khi RANGE nhận hook.
// [VI dòng gốc 22] Chú thích gốc của tác giả; không được thực thi. Nội dung: Chỉ enable(false) vẫn để watchdog báo nhầm xung đột mỗi 15 giây.
  // Chỉ enable(false) vẫn để watchdog báo nhầm xung đột mỗi 15 giây.
// [VI dòng gốc 23] Khai báo biến không gán lại bằng const: prevStatus = pos?.status?.(false) hoặc dùng vế phải khi vế trái falsy: {}
  const prevStatus=pos?.status?.(false)||{};
// [VI dòng gốc 24] Khai báo biến không gán lại bằng const: wasPositionEnabled = đảo giá trị đúng/sai của !prevStatus.active
  const wasPositionEnabled=!!prevStatus.active;
// [VI dòng gốc 25] Khai báo biến có thể gán lại bằng let: legacyPositionRetired = false
  let legacyPositionRetired=false;
// [VI dòng gốc 26] Kiểm tra pos?.version==='3.8.0'&&typeof pos.stop==='function': đúng thì chạy nhánh sau if. | gọi pos.stop() để dừng bộ điều khiển và dọn tài nguyên | gán legacyPositionRetired bằng true
  if(pos?.version==='3.8.0'&&typeof pos.stop==='function'){pos.stop();legacyPositionRetired=true;}
// [VI dòng gốc 27] Khai báo biến không gán lại bằng const: source = đọc P.isValidRange
  const source=P.isValidRange;
// [VI dòng gốc 28] Khai báo biến không gán lại bằng const: ownDescriptor = gọi Object.getOwnPropertyDescriptor(P, 'isValidRange')
  const ownDescriptor=Object.getOwnPropertyDescriptor(P,'isValidRange');
// [VI dòng gốc 29] Kiểm tra ownDescriptor && !ownDescriptor.configurable: đúng thì chạy nhánh sau if. | gọi console.error('[RANGE281] isValidRange không cho phép thay thế an toàn.') | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  if(ownDescriptor && !ownDescriptor.configurable){console.error('[RANGE281] isValidRange không cho phép thay thế an toàn.');return;}
// [VI dòng gốc 30] Khai báo biến có thể gán lại bằng let: enabled = false; stopped = false; overrides = 0; nativeOK = 0; excluded = 0; lastDistance = null; lastTarget = ""; lastError = ""; lastReason = "waiting_for_eligible_boss"
  let enabled=false, stopped=false, overrides=0, nativeOK=0, excluded=0, lastDistance=null,
// [VI dòng gốc 31] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng name. Đọc cùng dòng mở phía trên: lastTarget='', lastError='', lastReason='waiting_for_eligible_boss';
      lastTarget='', lastError='', lastReason='waiting_for_eligible_boss';
// [VI dòng gốc 32] Khai báo biến không gán lại bằng const: get = tạo hàm với tham số r, k | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | Kết thúc hàm hiện tại và trả về: r?.property?.get?.(k) hoặc dùng vế phải khi vế trái là null/undefined: null. | Nhận lỗi bằng _ và chạy phần xử lý lỗi.
  const get=(r,k)=>{try{return r?.property?.get?.(k)??null;}catch(_){return null;}};
// [VI dòng gốc 33] Khai báo biến không gán lại bằng const: stageOcc = tạo hàm với tham số (không có)
  const stageOcc=()=>{
// [VI dòng gốc 34] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài.
    try{
// [VI dòng gốc 35] Khai báo biến không gán lại bằng const: lvl = gọi Number(W._Ba?._Co?._Mo?.ins?.curLv) để chuyển sang số
      const lvl=Number(W._Ba?._Co?._Mo?.ins?.curLv);
// [VI dòng gốc 36] Khai báo biến không gán lại bằng const: cfg = gọi W._ft?._h$?.ins?.getCfgByLv(lvl) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
      const cfg=W._ft?._h$?.ins?.getCfgByLv?.(lvl);
// [VI dòng gốc 37] Kiểm tra !cfg: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: null.
      if(!cfg) return null;
// [VI dòng gốc 38] Khai báo biến không gán lại bằng const: v = gọi Number(W._ft._h$.ins.occ(cfg,lvl)) để chuyển sang số
      const v=Number(W._ft._h$.ins.occ(cfg,lvl));
// [VI dòng gốc 39] Kết thúc hàm hiện tại và trả về: nếu Number.isSafeInteger(v)&&v>0 thì lấy v, ngược lại lấy null.
      return Number.isSafeInteger(v)&&v>0?v:null;
// [VI dòng gốc 40] Nhận lỗi bằng _ và chạy phần xử lý lỗi. | Kết thúc hàm hiện tại và trả về: null.
    }catch(_){return null;}
// [VI dòng gốc 41] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  };
// [VI dòng gốc 42] Định nghĩa hàm qualifies; tham số: self
  function qualifies(self){
// [VI dòng gốc 43] Kiểm tra !self || String(get(self.owner,'id')??self.owner?.id??'')!==actorId || String(W._Ba?._rJ?._O$?.ins?.actorId??'')!==actorId: đúng thì chạy nhánh sau if.
    if(!self || String(get(self.owner,'id')??self.owner?.id??'')!==actorId ||
// [VI dòng gốc 44] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm ok, reason.
       String(W._Ba?._rJ?._O$?.ins?.actorId??'')!==actorId) return {ok:false,reason:'different_actor'};
// [VI dòng gốc 45] Kiểm tra [2,9].includes(Number(get(self.owner,'type'))): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm ok, reason.
    if([2,9].includes(Number(get(self.owner,'type'))))return {ok:false,reason:'companion_native_range'};
// [VI dòng gốc 46] Khai báo biến không gán lại bằng const: target = đọc self.target
    const target=self.target;
// [VI dòng gốc 47] Kiểm tra !target || target.isValid===false || Number(get(target,'type'))!==1: đúng thì chạy nhánh sau if.
    if(!target || target.isValid===false || Number(get(target,'type'))!==1)
// [VI dòng gốc 48] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm ok, reason.
      return {ok:false,reason:'not_monster_target'};
// [VI dòng gốc 49] Khai báo biến không gán lại bằng const: h = gọi get(target, 'hp'); hp = gọi Number(h?.[0]) để chuyển sang số; maxHp = gọi Number(h?.[1]) để chuyển sang số
    const h=get(target,'hp'),hp=Number(h?.[0]),maxHp=Number(h?.[1]);
// [VI dòng gốc 50] Khai báo biến không gán lại bằng const: kind = đọc W.KVPV_FAR_SCOPE?.status?.().kind (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); finishThreshold = nếu kind==='LINH_LUNG' thì lấy .03, ngược lại lấy 0
    const kind=W.KVPV_FAR_SCOPE?.status?.().kind,finishThreshold=kind==='LINH_LUNG'?.03:0;
// [VI dòng gốc 51] Kiểm tra finishThreshold&&Array.isArray(h)&&Number.isFinite(hp)&&Number.isFinite(maxHp)&&maxHp>0&&hp>0&&hp/maxHp<=finishThreshold: đúng thì chạy nhánh sau if.
    if(finishThreshold&&Array.isArray(h)&&Number.isFinite(hp)&&Number.isFinite(maxHp)&&maxHp>0&&hp>0&&hp/maxHp<=finishThreshold)
// [VI dòng gốc 52] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm ok, reason.
      return {ok:false,reason:'finish_native_range'};
// [VI dòng gốc 53] Khai báo biến không gán lại bằng const: actual = gọi Number(get(target,'occ')) để chuyển sang số
    const actual=Number(get(target,'occ'));
// [VI dòng gốc 54] Khai báo biến không gán lại bằng const: expected = nếu ['LINH_LUNG','PHU_VAN','TRU_TIEN'].includes(W.KVPV_FAR_SCOPE?.status?.().kind)&&W.KVPV_FAR_SCOPE.eligible(target) thì lấy actual, ngược lại lấy stageOcc()
    const expected=['LINH_LUNG','PHU_VAN','TRU_TIEN'].includes(W.KVPV_FAR_SCOPE?.status?.().kind)&&W.KVPV_FAR_SCOPE.eligible(target)?actual:stageOcc();
// [VI dòng gốc 55] Kiểm tra expected===null || actual!==expected: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm ok, reason.
    if(expected===null || actual!==expected)return {ok:false,reason:'not_current_tianquan_boss'};
// [VI dòng gốc 56] Kiểm tra typeof self.isValidTarget!=='function' || self.isValidTarget()!==true: đúng thì chạy nhánh sau if.
    if(typeof self.isValidTarget!=='function' || self.isValidTarget()!==true)
// [VI dòng gốc 57] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm ok, reason.
      return {ok:false,reason:'native_target_invalid'};
// [VI dòng gốc 58] Chú thích gốc của tác giả; không được thực thi. Nội dung: Native scene guard: blocked war scenes must remain blocked.
    // Native scene guard: blocked war scenes must remain blocked.
// [VI dòng gốc 59] Khai báo biến không gán lại bằng const: scene = gọi W._ft?._po?.ins?.getCfgById(Number(W._C?._Mn?._Cn?.currentID)) để tra cấu hình theo ID bằng API client (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const scene=W._ft?._po?.ins?.getCfgById?.(Number(W._C?._Mn?._Cn?.currentID));
// [VI dòng gốc 60] Kiểm tra !scene: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm ok, reason.
    if(!scene) return {ok:false,reason:'scene_unavailable'};
// [VI dòng gốc 61] Kiểm tra Number(scene[7])===50 && !W._Ba?._htt?._stt?.inst?.isWar: đúng thì chạy nhánh sau if.
    if(Number(scene[7])===50 && !W._Ba?._htt?._stt?.inst?.isWar)
// [VI dòng gốc 62] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm ok, reason.
      return {ok:false,reason:'war_scene_block'};
// [VI dòng gốc 63] Kiểm tra W._BLa?.isLandScapeScreen?.() || Number(scene[0])===8601: đúng thì chạy nhánh sau if.
    if(W._BLa?.isLandScapeScreen?.() || Number(scene[0])===8601)
// [VI dòng gốc 64] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm ok, reason.
      return {ok:false,reason:'different_native_range_rule'};
// [VI dòng gốc 65] Khai báo biến không gán lại bằng const: monster = gọi W._ft?._tY?.ins?.getCfgById(actual) để tra cấu hình theo ID bằng API client (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const monster=W._ft?._tY?.ins?.getCfgById?.(actual);
// [VI dòng gốc 66] Khai báo biến không gán lại bằng const: nativeRadius = gọi Number(monster?.[3]) để chuyển sang số
    const nativeRadius=Number(monster?.[3]);
// [VI dòng gốc 67] Kiểm tra !Number.isFinite(nativeRadius)||nativeRadius<=0: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm ok, reason.
    if(!Number.isFinite(nativeRadius)||nativeRadius<=0)return {ok:false,reason:'unknown_monster_range'};
// [VI dòng gốc 68] Khai báo biến không gán lại bằng const: a = đọc self._Ha; b = gọi get(target, 'position')
    const a=self._Ha, b=get(target,'position');
// [VI dòng gốc 69] Kiểm tra !Number.isFinite(Number(a?.x)) || !Number.isFinite(Number(a?.y)) || !Number.isFinite(Number(b?.x)) || !Number.isFinite(Number(b?.y)): đúng thì chạy nhánh sau if.
    if(!Number.isFinite(Number(a?.x)) || !Number.isFinite(Number(a?.y)) ||
// [VI dòng gốc 70] gọi Number.isFinite(Number(b?.x)) | gọi Number(b?.x) để chuyển sang số | gọi Number.isFinite(Number(b?.y)) | gọi Number(b?.y) để chuyển sang số
       !Number.isFinite(Number(b?.x)) || !Number.isFinite(Number(b?.y)))
// [VI dòng gốc 71] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm ok, reason.
      return {ok:false,reason:'missing_position'};
// [VI dòng gốc 72] Khai báo biến không gán lại bằng const: d = gọi Math.hypot(Number(a.x)-Number(b.x), Number(a.y)-Number(b.y))
    const d=Math.hypot(Number(a.x)-Number(b.x),Number(a.y)-Number(b.y));
// [VI dòng gốc 73] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm ok, reason, distance, target.
    return {ok:Number.isFinite(d)&&d>nativeRadius&&d<=requestedRadius,
// [VI dòng gốc 74] Thuộc tính reason: "within_trial_extension" | Thuộc tính distance: d | Thuộc tính target: gọi String(get(target,'name')??'') để chuyển sang chuỗi
      reason:'within_trial_extension',distance:d,target:String(get(target,'name')??'')};
// [VI dòng gốc 75] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 76] Định nghĩa hàm hooked; tham số: không có
  function hooked(){
// [VI dòng gốc 77] Khai báo biến không gán lại bằng const: result = gọi source.apply(this, arguments)
    const result=source.apply(this,arguments);
// [VI dòng gốc 78] Kiểm tra result===true: đúng thì chạy nhánh sau if. | tăng nativeOK một đơn vị sau khi lấy giá trị | Kết thúc hàm hiện tại và trả về: result.
    if(result===true){nativeOK++;return result;}
// [VI dòng gốc 79] Kiểm tra stopped||!enabled||(W.KVPV_FAR_SCOPE??W.KVPV_TQ_SCOPE)?.inside?.()===false: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: result.
    if(stopped||!enabled||(W.KVPV_FAR_SCOPE??W.KVPV_TQ_SCOPE)?.inside?.()===false)return result;
// [VI dòng gốc 80] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài.
    try{
// [VI dòng gốc 81] Khai báo biến không gán lại bằng const: q = gọi qualifies(this)
      const q=qualifies(this);
// [VI dòng gốc 82] gán lastReason bằng q.reason
      lastReason=q.reason;
// [VI dòng gốc 83] Kiểm tra Number.isFinite(q.distance): đúng thì chạy nhánh sau if. | gán lastDistance bằng +q.distance.toFixed(3)
      if(Number.isFinite(q.distance))lastDistance=+q.distance.toFixed(3);
// [VI dòng gốc 84] Kiểm tra q.target: đúng thì chạy nhánh sau if. | gán lastTarget bằng q.target
      if(q.target)lastTarget=q.target;
// [VI dòng gốc 85] Kiểm tra !q.ok: đúng thì chạy nhánh sau if. | tăng excluded một đơn vị sau khi lấy giá trị | Kết thúc hàm hiện tại và trả về: result.
      if(!q.ok){excluded++;return result;}
// [VI dòng gốc 86] tăng overrides một đơn vị sau khi lấy giá trị | Kết thúc hàm hiện tại và trả về: true.
      overrides++;return true;
// [VI dòng gốc 87] Nhận lỗi bằng e và chạy phần xử lý lỗi. | gán lastError bằng String(e) | Kết thúc hàm hiện tại và trả về: result.
    }catch(e){lastError=String(e);return result;}
// [VI dòng gốc 88] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 89] Định nghĩa hàm ensure; tham số: không có
  function ensure(){
// [VI dòng gốc 90] Kiểm tra P.isValidRange!==hooked: đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('isValidRange was replaced by another add-on; not overriding it')
    if(P.isValidRange!==hooked){throw Error('isValidRange was replaced by another add-on; not overriding it');}
// [VI dòng gốc 91] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 92] Khai báo biến không gán lại bằng const: restorePosition = tạo hàm với tham số (không có)
  const restorePosition=()=>{
// [VI dòng gốc 93] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài.
    try{
// [VI dòng gốc 94] Chú thích gốc của tác giả; không được thực thi. Nội dung: Restore only the active/disabled toggle, not the old ratio or other tuning.
      // Restore only the active/disabled toggle, not the old ratio or other tuning.
// [VI dòng gốc 95] Kiểm tra pos && pos===W.KVPV_BOSS_POSITION && wasPositionEnabled && !pos.status(false).active: đúng thì chạy nhánh sau if. | gọi pos.enable(true)
      if(pos && pos===W.KVPV_BOSS_POSITION && wasPositionEnabled && !pos.status(false).active) pos.enable(true);
// [VI dòng gốc 96] Nhận lỗi bằng e và chạy phần xử lý lỗi. | gọi console.warn('[RANGE281] Không khôi phục được Boss Position:', e)
    }catch(e){console.warn('[RANGE281] Không khôi phục được Boss Position:',e);}
// [VI dòng gốc 97] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  };
// [VI dòng gốc 98] Chú thích gốc của tác giả; không được thực thi. Nội dung: Trả trạng thái hiện tại để kiểm tra; ý nghĩa từng bộ đếm thuộc phạm vi module này.
  // Trả trạng thái hiện tại để kiểm tra; ý nghĩa từng bộ đếm thuộc phạm vi module này.
// [VI dòng gốc 99] Định nghĩa hàm status; tham số: show=true. Mục đích: trả trạng thái để kiểm tra
  function status(show=true){
// [VI dòng gốc 100] Khai báo biến không gán lại bằng const: s = tạo đối tượng gồm version, legacyPositionRetired, enabled, actorId, clientCfgRange, trialRange, bossPositionOverrideDisabled, hookAttached, extraOneUnitAllowed, nativeAlreadyValid, notEligible, lastDistance, lastTarget, lastReason, lastError, note
    const s={version:'281-client-trial',legacyPositionRetired,enabled:enabled&&!stopped,actorId,
// [VI dòng gốc 101] Thuộc tính clientCfgRange: baseRadius | Thuộc tính trialRange: requestedRadius
      clientCfgRange:baseRadius,trialRange:requestedRadius,
// [VI dòng gốc 102] Thuộc tính bossPositionOverrideDisabled: !!W.KVPV_BOSS_POSITION và chỉ đánh giá vế phải khi vế trái truthy: !pos.status(false).active
      bossPositionOverrideDisabled:!!W.KVPV_BOSS_POSITION && !pos.status(false).active,
// [VI dòng gốc 103] Thuộc tính hookAttached: tính biểu thức P.isValidRange===hooked | Thuộc tính extraOneUnitAllowed: overrides
      hookAttached:P.isValidRange===hooked,extraOneUnitAllowed:overrides,
// [VI dòng gốc 104] Thuộc tính nativeAlreadyValid: nativeOK | Thuộc tính notEligible: excluded | Thuộc tính lastDistance: dùng biến cùng tên | Thuộc tính lastTarget: dùng biến cùng tên
      nativeAlreadyValid:nativeOK,notEligible:excluded,lastDistance,lastTarget,lastReason,lastError,
// [VI dòng gốc 105] Thuộc tính note: "Client trial radius; The configured trial radius is used only in scan/strict mode, not evidence of server cast reach."
      note:'Client trial radius; The configured trial radius is used only in scan/strict mode, not evidence of server cast reach.'};
// [VI dòng gốc 106] Kiểm tra show: đúng thì chạy nhánh sau if. | gọi console.table([s]) | Kết thúc hàm hiện tại và trả về: s.
    if(show)console.table([s]);return s;
// [VI dòng gốc 107] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 108] Chú thích gốc của tác giả; không được thực thi. Nội dung: Dừng bộ điều khiển, hủy lịch và giải phóng tài nguyên do module này sở hữu.
  // Dừng bộ điều khiển, hủy lịch và giải phóng tài nguyên do module này sở hữu.
// [VI dòng gốc 109] Định nghĩa hàm stop; tham số: không có. Mục đích: dừng bộ điều khiển và dọn tài nguyên
  function stop(){
// [VI dòng gốc 110] Kiểm tra stopped: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(stopped)return;
// [VI dòng gốc 111] gán stopped bằng true | gán enabled bằng false
    stopped=true;enabled=false;
// [VI dòng gốc 112] Kiểm tra P.isValidRange===hooked: đúng thì chạy nhánh sau if, sai thì chạy nhánh else.
    if(P.isValidRange===hooked){
// [VI dòng gốc 113] Kiểm tra ownDescriptor: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gọi Object.defineProperty(P, 'isValidRange', ownDescriptor)
      if(ownDescriptor)Object.defineProperty(P,'isValidRange',ownDescriptor);
// [VI dòng gốc 114] xóa thuộc tính P.isValidRange
      else delete P.isValidRange;
// [VI dòng gốc 115] gọi console.warn('[RANGE281] Hook changed externally; leaving it untouched.')
    }else console.warn('[RANGE281] Hook changed externally; leaving it untouched.');
// [VI dòng gốc 116] gọi restorePosition()
    restorePosition();
// [VI dòng gốc 117] Kiểm tra W[name]===api: đúng thì chạy nhánh sau if. | xóa thuộc tính W[name]
    if(W[name]===api) delete W[name];
// [VI dòng gốc 118] gọi console.log('[RANGE281] Đã hoàn tác điều chỉnh client +1.')
    console.log('[RANGE281] Đã hoàn tác điều chỉnh client +1.');
// [VI dòng gốc 119] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 120] Khai báo biến không gán lại bằng const: api = tạo đối tượng gồm version, status, stop, setTrialRange, enable
  const api={version:'281-client-trial',status,stop,
// [VI dòng gốc 121] Khai báo biến không gán lại bằng const: v = gọi Number(value) để chuyển sang số | Kiểm tra !Number.isFinite(v)||v<=280||v>610: đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('Client trial range: (280,610]') | gán requestedRadius bằng v
    setTrialRange(value){const v=Number(value);if(!Number.isFinite(v)||v<=280||v>610)throw Error('Client trial range: (280,610]');requestedRadius=v;return status(false);},
// [VI dòng gốc 122] gán enabled bằng !!v&&!stopped | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | Kiểm tra pos && pos===W.KVPV_BOSS_POSITION: đúng thì chạy nhánh sau if. | Kiểm tra enabled: đúng thì chạy nhánh sau if, sai thì chạy nhánh else.
    enable(v=true){enabled=!!v&&!stopped;try{if(pos && pos===W.KVPV_BOSS_POSITION){if(enabled)pos.enable(false);else if(wasPositionEnabled)pos.enable(true);}}catch(e){lastError=String(e);}return status(false);}};
// [VI dòng gốc 123] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài.
  try{
// [VI dòng gốc 124] Chú thích gốc của tác giả; không được thực thi. Nội dung: The old Position hook deliberately forces the actor closer than cfg radius.
    // The old Position hook deliberately forces the actor closer than cfg radius.
// [VI dòng gốc 125] Chú thích gốc của tác giả; không được thực thi. Nội dung: Disable ONLY that feature; keep the HitRun controller untouched.
    // Disable ONLY that feature; keep the HitRun controller untouched.
// [VI dòng gốc 126] gọi pos?.enable(false) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    pos?.enable?.(false);
// [VI dòng gốc 127] gọi Object.defineProperty(P, 'isValidRange', {value:hooked,writable:true,enumerable:!!ownDescriptor?.enumerable,configurable:true})
    Object.defineProperty(P,'isValidRange',{value:hooked,writable:true,enumerable:!!ownDescriptor?.enumerable,configurable:true});
// [VI dòng gốc 128] gọi ensure() | gán W[name] bằng api
    ensure();W[name]=api;
// [VI dòng gốc 129] Nhận lỗi bằng e và chạy phần xử lý lỗi.
  }catch(e){
// [VI dòng gốc 130] gán lastError bằng String(e) | gọi restorePosition() | gọi console.error('[RANGE281] Failed to install:', e) | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    lastError=String(e);restorePosition();console.error('[RANGE281] Failed to install:',e);return;
// [VI dòng gốc 131] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 132] gọi console.log('[RANGE281] Đã đặt mốc thử client 281 (Boss Thiên Quan có cfg 280). Không ép server tăng tầm.')
  console.log('[RANGE281] Đã đặt mốc thử client 281 (Boss Thiên Quan có cfg 280). Không ép server tăng tầm.');
// [VI dòng gốc 133] gọi status(true) để trả trạng thái để kiểm tra
  status(true);
// [VI dòng gốc 134] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: })();
})();
// [VI dòng gốc 135] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 136] Dòng trống để tách các phần, không có lệnh thực thi.
