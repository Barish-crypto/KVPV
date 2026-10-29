// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: CHÚ THÍCH V1 — Điều phối chế độ chiến đấu.
/* CHÚ THÍCH V1 — Điều phối chế độ chiến đấu.
 * Một chủ điều khiển combat tại một thời điểm. Theo dõi vào/ra Thiên Quan, dọn hook đúng thứ tự và chuyển lại SCAN nếu Boss mới chưa có bằng chứng. OFF ngoài map vẫn có thể đang chờ vào Thiên Quan.
 * Sửa nguồn tại đây rồi chạy node build.cjs; FULL và bản vá được sinh tự động. */
// [VI dòng gốc 4] Chú thích gốc của tác giả; không được thực thi. Nội dung: ================================================================
/* ================================================================
 * KVPV V12.9.4 — MANUAL COMBAT MODES / CLIENT-ONLY COORDINATOR
 * start('BOSS') -> native Boss combo and 35/100 recovery, no range experiment.
 * start('BOSS_TH') -> only native Tuyet Hoc 1001..1008, far 280.4; no basic fallback.
 * stop() -> no active owner. Auto Daily jobs remain independent.
 * No RPC. All mode switching is explicit; only one combat owner.
 * ================================================================ */
// [VI dòng gốc 11] chạy ngay hàm bao để tạo phạm vi và khởi tạo phần chức năng bên trong
(() => {
// [VI dòng gốc 12] "use strict"
  'use strict';
// [VI dòng gốc 13] Khai báo biến không gán lại bằng const: W = window; TAG = "[KVPV V12.9.4 MODES]"
  const W=window, TAG='[KVPV V12.9.4 MODES]';
// [VI dòng gốc 14] Khai báo biến không gán lại bằng const: MODE = gọi Object.freeze({OFF:'OFF',BOSS:'BOSS',BOSS_TH:'BOSS_TH',BOSS_TH300:'BOSS_TH300',BOSS_TH300_SCAN:'BOSS_TH300_SCAN'}) để khóa thay đổi trực tiếp các thuộc tính của đối tượng ở mức ngoài cùng
  const MODE=Object.freeze({OFF:'OFF',BOSS:'BOSS',BOSS_TH:'BOSS_TH',BOSS_TH300:'BOSS_TH300',BOSS_TH300_SCAN:'BOSS_TH300_SCAN'});
// [VI dòng gốc 15] Khai báo biến không gán lại bằng const: initialActor = gọi String(W.__KVPV_OWN_ACTOR_ID || W._Ba?._rJ?._O$?.ins?.actorId || '') để chuyển sang chuỗi
  const initialActor=String(W.__KVPV_OWN_ACTOR_ID || W._Ba?._rJ?._O$?.ins?.actorId || '');
// [VI dòng gốc 16] Khai báo biến không gán lại bằng const: S = tạo đối tượng gồm mode, reason, switches, errors, lastError, lastChangedAt, history
  const S={mode:'OFF',reason:'Chưa chọn mode',switches:0,errors:0,lastError:'',lastChangedAt:null,
// [VI dòng gốc 17] Thuộc tính history: tạo mảng gồm 0 vị trí: []
    history:[]};
// [VI dòng gốc 18] Khai báo biến có thể gán lại bằng let: scopedMode = null; mapTimer = null; towerAttempt = null; lastScopeKey = null; lastMaintenanceAt = áp dụng toán tử - lên Infinity; lastTianQuanKey = null; lastTruAcquire = áp dụng toán tử - lên Infinity
  let scopedMode=null,mapTimer=null,towerAttempt=null,lastScopeKey=null,lastMaintenanceAt=-Infinity,lastTianQuanKey=null,lastTruAcquire=-Infinity,lastTowerRetryAt=-Infinity;
// [VI dòng gốc 19] Khai báo biến không gán lại bằng const: inFarMap = tạo hàm với tham số (không có); mỗi lần gọi trả về tính biểu thức (W.KVPV_FAR_SCOPE??W.KVPV_TQ_SCOPE)?.inside?.()!==false
  const inFarMap=()=>(W.KVPV_FAR_SCOPE??W.KVPV_TQ_SCOPE)?.inside?.()!==false;
  const tqNoHeal=()=>W.KVPV_TQ_POSITION_ONLY?.enabled===true&&W.KVPV_FAR_SCOPE?.status?.()?.kind==='THIEN_QUAN';
// [VI dòng gốc 20] Khai báo biến có thể gán lại bằng let: entryMoveHook = null
  let entryMoveHook=null;
// [VI dòng gốc 21] Định nghĩa hàm releaseEntryMove; tham số: không có | Khai báo biến không gán lại bằng const: h = entryMoveHook | Kiểm tra h&&h.m.moveTo===h.fn: đúng thì chạy nhánh sau if. | Kiểm tra h.own: đúng thì chạy nhánh sau if, sai thì chạy nhánh else.
  function releaseEntryMove(){const h=entryMoveHook;if(h&&h.m.moveTo===h.fn){if(h.own)Object.defineProperty(h.m,'moveTo',h.own);else delete h.m.moveTo;}entryMoveHook=null;}
// [VI dòng gốc 22] Định nghĩa hàm guardEntryMove; tham số: không có
  function guardEntryMove(){
// [VI dòng gốc 23] Khai báo biến không gán lại bằng const: me = gọi W._C?._Ba?.instance?.getRole(Number(initialActor)) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); m = gọi me?.getComponent(W._d?._Yct?._zet) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const me=W._C?._Ba?.instance?.getRole?.(Number(initialActor)),m=me?.getComponent?.(W._d?._Yct?._zet);
// [VI dòng gốc 24] Kiểm tra !m||typeof m.moveTo!=='function'||entryMoveHook?.m===m: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(!m||typeof m.moveTo!=='function'||entryMoveHook?.m===m)return;
// [VI dòng gốc 25] gọi releaseEntryMove() | Khai báo biến không gán lại bằng const: own = gọi Object.getOwnPropertyDescriptor(m, 'moveTo'); native = đọc m.moveTo
    releaseEntryMove();const own=Object.getOwnPropertyDescriptor(m,'moveTo'),native=m.moveTo;
// [VI dòng gốc 26] Kiểm tra own&&!own.configurable: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(own&&!own.configurable)return;
// [VI dòng gốc 27] Khai báo biến không gán lại bằng const: fn = tạo hàm với tham số x, y, ...args
    const fn=function(x,y,...args){
// [VI dòng gốc 28] Khai báo biến không gán lại bằng const: scope = gọi W.KVPV_FAR_SCOPE?.status() để trả trạng thái để kiểm tra (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); hr = gọi W.KVPV_HITRUN1?.status(false) để trả trạng thái để kiểm tra (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
      const scope=W.KVPV_FAR_SCOPE?.status?.(),hr=W.KVPV_HITRUN1?.status?.(false);
// [VI dòng gốc 29] Khai báo biến không gán lại bằng const: target = đọc me?.getComponent?.(W._d?._Yct?._Het)?.target nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); hp = gọi me?.property?.get('hp') (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
      const target=me?.getComponent?.(W._d?._Yct?._Het)?.target,hp=me?.property?.get?.('hp');
// [VI dòng gốc 30] Khai báo biến không gán lại bằng const: a = gọi me?.property?.get('position') (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); b = gọi target?.property?.get('position') (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); entryGoal = W.KVPV_DESKTOP_CONTROL?.distance?.() hoặc dùng vế phải khi vế trái là null/undefined: 302
      const a=me?.property?.get?.('position'),b=target?.property?.get?.('position'),entryGoal=tqNoHeal()?310:(W.KVPV_DESKTOP_CONTROL?.distance?.()??310);
// [VI dòng gốc 31] Kiểm tra scopedMode&&valid()&&scope?.inside&&scope.kind==='THIEN_QUAN'&& (!hr?.running||hr.phase==='FIGHT')&&Array.isArray(hp)&&Number(hp[1])>0&&Number(hp[0])/Number(hp[1])*100>35&& W.KVPV_…: đúng thì chạy nhánh sau if.
      if(scopedMode&&valid()&&scope?.inside&&scope.kind==='THIEN_QUAN'&&W.KVPV_TH300?.basicRangeProbeGoal?.()==null&&
// [VI dòng gốc 32] gọi Array.isArray(hp) | gọi Number(hp[1]) để chuyển sang số | gọi Number(hp[0]) để chuyển sang số
        Array.isArray(hp)&&Number(hp[1])>0&&Number(hp[0])>0&&
        (tqNoHeal()||(!hr?.running||hr.phase==='FIGHT')&&Number(hp[0])/Number(hp[1])*100>35)&&
// [VI dòng gốc 33] gọi W.KVPV_FAR_SCOPE?.eligible(target) | gọi Number.isFinite(x) | gọi Number.isFinite(y) | gọi Math.hypot(x-b.x, y-b.y)
        W.KVPV_FAR_SCOPE?.eligible?.(target)&&a&&b&&Number.isFinite(x)&&Number.isFinite(y)&&Math.hypot(x-b.x,y-b.y)<Math.max(280,entryGoal-2)){
// [VI dòng gốc 34] Khai báo biến không gán lại bằng const: d = gọi Math.hypot(a.x-b.x, a.y-b.y)
        const d=Math.hypot(a.x-b.x,a.y-b.y);
// [VI dòng gốc 35] Kiểm tra d>0: đúng thì chạy nhánh sau if. | gán x bằng b.x+(a.x-b.x)/d*entryGoal | gán y bằng b.y+(a.y-b.y)/d*entryGoal | gọi log('ENTRY-310', 'redirect native inward path')
        if(d>0){x=b.x+(a.x-b.x)/d*entryGoal;y=b.y+(a.y-b.y)/d*entryGoal;log('ENTRY-302','redirect native inward path');}
// [VI dòng gốc 36] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
      }
// [VI dòng gốc 37] Kết thúc hàm hiện tại và trả về: gọi native.call(this, x, y, ...args).
      return native.call(this,x,y,...args);
// [VI dòng gốc 38] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    };
// [VI dòng gốc 39] gọi Object.defineProperty(m, 'moveTo', {configurable:true,writable:true,enumerable:own?.enumerable??false,value:fn}) | gán entryMoveHook bằng {m,own,fn}
    Object.defineProperty(m,'moveTo',{configurable:true,writable:true,enumerable:own?.enumerable??false,value:fn});entryMoveHook={m,own,fn};
// [VI dòng gốc 40] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 41] Chú thích gốc của tác giả; không được thực thi. Nội dung: Linh Lung/Phù Văn dùng cùng bộ HitRun với Thiên Quan, bàn giao theo Boss/tầng.
  // Linh Lung/Phù Văn dùng cùng bộ HitRun với Thiên Quan, bàn giao theo Boss/tầng.
// [VI dòng gốc 42] Định nghĩa hàm syncTowerBoss; tham số: không có
  function syncTowerBoss(){
// [VI dòng gốc 43] Khai báo biến không gán lại bằng const: scope = gọi W.KVPV_FAR_SCOPE?.status() để trả trạng thái để kiểm tra (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Kiểm tra !['LINH_LUNG','PHU_VAN','TRU_TIEN'].includes(scope?.kind): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    const scope=W.KVPV_FAR_SCOPE?.status?.();if(!['LINH_LUNG','PHU_VAN','TRU_TIEN'].includes(scope?.kind))return;
// [VI dòng gốc 44] Kiểm tra !valid()||W._Ba?._rJ?._O$?.ins?.isDead===true: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(!valid()||W._Ba?._rJ?._O$?.ins?.isDead===true)return;
// [VI dòng gốc 45] Khai báo biến không gán lại bằng const: me = gọi W._C?._Ba?.instance?.getRole(Number(initialActor)) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const me=W._C?._Ba?.instance?.getRole?.(Number(initialActor));
// [VI dòng gốc 46] Khai báo biến không gán lại bằng const: combat = gọi me?.getComponent(W._d?._Yct?._Het) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Khai báo biến có thể gán lại bằng let: target = đọc combat?.target nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const combat=me?.getComponent?.(W._d?._Yct?._Het);let target=combat?.target;
// [VI dòng gốc 47] Kiểm tra scope.kind==='TRU_TIEN'&&!W.KVPV_FAR_SCOPE.eligible(target): đúng thì chạy nhánh sau if.
    if(scope.kind==='TRU_TIEN'&&!W.KVPV_FAR_SCOPE.eligible(target)){
// [VI dòng gốc 48] Chú thích gốc của tác giả; không được thực thi. Nội dung: Boss cũ chết có thể để lại mục tiêu là người cùng đội. Chỉ tìm quái bằng luồng native.
      // Boss cũ chết có thể để lại mục tiêu là người cùng đội. Chỉ tìm quái bằng luồng native.
// [VI dòng gốc 49] Chú thích gốc của tác giả; không được thực thi. Nội dung: Không giành mục tiêu khi đang rút lui, thu thập hoặc người dùng đang thao tác UI.
      // Không giành mục tiêu khi đang rút lui, thu thập hoặc người dùng đang thao tác UI.
// [VI dòng gốc 50] Khai báo biến không gán lại bằng const: currentHitrun = gọi W.KVPV_HITRUN1?.status(false) để trả trạng thái để kiểm tra (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
      const currentHitrun=W.KVPV_HITRUN1?.status?.(false);
// [VI dòng gốc 51] Kiểm tra currentHitrun?.running&&currentHitrun.phase!=='FIGHT'||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)||W._Ba?._K_t?._Z7t?.ins?.gathering: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      if(currentHitrun?.running&&currentHitrun.phase!=='FIGHT'||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)||W._Ba?._K_t?._Z7t?.ins?.gathering)return;
// [VI dòng gốc 52] gán towerAttempt bằng null | gán S.reason bằng 'Tru Tiên: chờ mục tiêu quái'
      towerAttempt=null;S.reason='Tru Tiên: chờ mục tiêu quái';
// [VI dòng gốc 53] Khai báo biến không gán lại bằng const: user = đọc W._Ba?._rJ?._O$?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
      const user=W._Ba?._rJ?._O$?.ins;
// [VI dòng gốc 54] Kiểm tra typeof user?.selectTar==='function'&&Date.now()-lastTruAcquire>=1000: đúng thì chạy nhánh sau if.
      if(typeof user?.selectTar==='function'&&Date.now()-lastTruAcquire>=1000){
// [VI dòng gốc 55] gán lastTruAcquire bằng Date.now() | gọi user.selectTar(1, -1) | gán target bằng combat?.target | gọi log('TRU-TARGET-SEARCH', 'native monsters only')
        lastTruAcquire=Date.now();user.selectTar(1,-1);target=combat?.target;log('TRU-TARGET-SEARCH','native monsters only');
// [VI dòng gốc 56] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
      }
// [VI dòng gốc 57] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 58] Kiểm tra !W.KVPV_FAR_SCOPE.eligible(target): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(!W.KVPV_FAR_SCOPE.eligible(target))return;
    if(scope.kind==='ALL_BOSS'&&(Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)||W.KVPV?.core?.scene?.can?.('combat','hitrun')===false))return;
// [VI dòng gốc 59] Khai báo biến không gán lại bằng const: id = gọi String(target.property?.get?.('id')??target.id??'') để chuyển sang chuỗi | Kiểm tra !id: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    const id=String(target.property?.get?.('id')??target.id??'');if(!id)return;
// [VI dòng gốc 60] Khai báo biến không gán lại bằng const: key = tính biểu thức scope.current+'/'+scope.floor+'/'+id | Kiểm tra towerAttempt===key: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    const key=scope.current+'/'+scope.floor+'/'+id;
    // A native boss/HitRun controller may stop while the same monster stays
    // selected. Previous code treated this as completed forever and froze PvE.
    // Re-arm only after a bounded delay, never every 75ms scheduler tick.
    const existing=W.KVPV_HITRUN1?.status?.(false);
    if(towerAttempt===key&&existing?.running===true)return;
    if(towerAttempt===key&&Date.now()-lastTowerRetryAt<3000)return;
// [VI dòng gốc 61] Khai báo biến không gán lại bằng const: hr = gọi W.KVPV_HITRUN1?.status(false) để trả trạng thái để kiểm tra (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const hr=W.KVPV_HITRUN1?.status?.(false);
// [VI dòng gốc 62] gán towerAttempt bằng key | gán S.lastError bằng ''
    towerAttempt=key;lastTowerRetryAt=Date.now();S.lastError='';
// [VI dòng gốc 63] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài.
    try{
// [VI dòng gốc 64] Kiểm tra hr?.running: đúng thì chạy nhánh sau if. | gọi W.KVPV_HITRUN1.stop('Chuyển Boss phó bản: '+id) để dừng bộ điều khiển và dọn tài nguyên
      if(hr?.running)W.KVPV_HITRUN1.stop('Chuyển Boss phó bản: '+id);
      if(scope.kind==='ALL_BOSS')W.KVPV_TH300.setDistance(scope.goal);
// [VI dòng gốc 65] gọi W.KVPV_HITRUN1.start() để khởi động bộ điều khiển | gọi W.KVPV_TH300.sync() (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gọi log('TOWER-HITRUN', key)
      W.KVPV_HITRUN1.start();W.KVPV_TH300.sync?.();log('TOWER-HITRUN',key);
// [VI dòng gốc 66] Nhận lỗi bằng e và chạy phần xử lý lỗi. | gán S.lastError bằng String(e?.message||e) | gọi log('TOWER-HANDOFF-BLOCKED', S.lastError)
    }catch(e){S.lastError=String(e?.message||e);log('TOWER-HANDOFF-BLOCKED',S.lastError);}
// [VI dòng gốc 67] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 68] Chú thích gốc của tác giả; không được thực thi. Nội dung: Chuyển Boss Thiên Quan bằng ID + loại Boss + tầng, không dựa bộ auto cũ nhận dạng tên Boss.
  // Chuyển Boss Thiên Quan bằng ID + loại Boss + tầng, không dựa bộ auto cũ nhận dạng tên Boss.
// [VI dòng gốc 69] Chú thích gốc của tác giả; không được thực thi. Nội dung: Chỉ nhận lượt mới khi khóa thay đổi; không tự lặp lại cùng Boss đã dừng vì lỗi.
  // Chỉ nhận lượt mới khi khóa thay đổi; không tự lặp lại cùng Boss đã dừng vì lỗi.
// [VI dòng gốc 70] Định nghĩa hàm syncTianQuanBoss; tham số: không có
  function syncTianQuanBoss(){
// [VI dòng gốc 71] Khai báo biến không gán lại bằng const: scope = gọi W.KVPV_FAR_SCOPE?.status() để trả trạng thái để kiểm tra (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Kiểm tra scope?.kind!=='THIEN_QUAN'||!scope.inside: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    const scope=W.KVPV_FAR_SCOPE?.status?.();if(scope?.kind!=='THIEN_QUAN'||!scope.inside)return;
// [VI dòng gốc 72] Kiểm tra !valid()||W._Ba?._rJ?._O$?.ins?.isDead===true: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(!valid()||W._Ba?._rJ?._O$?.ins?.isDead===true)return;
// [VI dòng gốc 73] Khai báo biến không gán lại bằng const: me = gọi W._C?._Ba?.instance?.getRole(Number(initialActor)) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const me=W._C?._Ba?.instance?.getRole?.(Number(initialActor));
// [VI dòng gốc 74] Khai báo biến không gán lại bằng const: target = đọc me?.getComponent?.(W._d?._Yct?._Het)?.target nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const target=me?.getComponent?.(W._d?._Yct?._Het)?.target;
// [VI dòng gốc 75] Kiểm tra !W.KVPV_FAR_SCOPE.eligible(target): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(!W.KVPV_FAR_SCOPE.eligible(target))return;
// [VI dòng gốc 76] Khai báo biến không gán lại bằng const: id = gọi String(target.property?.get?.('id')??target.id??'') để chuyển sang chuỗi; occ = gọi Number(target.property?.get?.('occ')) để chuyển sang số
    const id=String(target.property?.get?.('id')??target.id??''),occ=Number(target.property?.get?.('occ'));
// [VI dòng gốc 77] Khai báo biến không gán lại bằng const: key = tính biểu thức scope.current+'/'+String(W._Ba?._Co?._Mo?.ins?.curLv??'')+'/'+occ+'/'+id | Kiểm tra !id||lastTianQuanKey===key: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    const key=scope.current+'/'+String(W._Ba?._Co?._Mo?.ins?.curLv??'')+'/'+occ+'/'+id;if(!id||lastTianQuanKey===key)return;
// [VI dòng gốc 78] Khai báo biến không gán lại bằng const: hr = gọi W.KVPV_HITRUN1?.status(false) để trả trạng thái để kiểm tra (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const hr=W.KVPV_HITRUN1?.status?.(false);
// [VI dòng gốc 79] Kiểm tra lastTianQuanKey===null&&hr?.running&&String(hr.bossId)===id: đúng thì chạy nhánh sau if. | gán lastTianQuanKey bằng key | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(!tqNoHeal()&&lastTianQuanKey===null&&hr?.running&&String(hr.bossId)===id){lastTianQuanKey=key;return;}
// [VI dòng gốc 80] gán lastTianQuanKey bằng key
    lastTianQuanKey=key;
// [VI dòng gốc 81] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài.
    try{
// [VI dòng gốc 82] Chú thích gốc của tác giả; không được thực thi. Nội dung: Gỡ HitRun trước hook kỹ năng để không giữ lớp combat/movement của Boss cũ.
      // Gỡ HitRun trước hook kỹ năng để không giữ lớp combat/movement của Boss cũ.
// [VI dòng gốc 83] gọi stopOwners('Chuyển Boss Thiên Quan: '+id)
      stopOwners('Chuyển Boss Thiên Quan: '+id);
// [VI dòng gốc 84] gọi W.KVPV_RANGE281.setTrialRange(Number(W.KVPV_TH300.status(false).requestedDistance??302)+10) | gọi W.KVPV_RANGE281.enable(true)
      W.KVPV_RANGE281.setTrialRange(Number(W.KVPV_TH300.status(false).requestedDistance??302)+10);W.KVPV_RANGE281.enable(true);
// [VI dòng gốc 85] gọi W.KVPV_TH300.start('SCAN') để khởi động bộ điều khiển | gán S.mode bằng MODE.BOSS_TH300_SCAN | gán scopedMode bằng MODE.BOSS_TH300_SCAN
      W.KVPV_TH300.start('SCAN');S.mode=MODE.BOSS_TH300_SCAN;scopedMode=MODE.BOSS_TH300_SCAN;
// [VI dòng gốc 86] Kiểm tra W.KVPV?.combat?.config: đúng thì chạy nhánh sau if. | gán W.KVPV.combat.config.autoArm bằng true
      if(W.KVPV?.combat?.config)W.KVPV.combat.config.autoArm=!tqNoHeal();
// [VI dòng gốc 87] gọi W.KVPV_HITRUN_AUTO.rearm()
      if(tqNoHeal())stopTqHealing('TQ 310 distance only');
      else W.KVPV_HITRUN_AUTO.rearm();
// [VI dòng gốc 88] Chú thích gốc của tác giả; không được thực thi. Nội dung: Quái tầng đã đối chiếu cấu hình có thể không được native isBoss()/regex tên của auto cũ nhận ra.
      // Quái tầng đã đối chiếu cấu hình có thể không được native isBoss()/regex tên của auto cũ nhận ra.
// [VI dòng gốc 89] Kiểm tra W.KVPV_HITRUN1.status(false)?.running!==true: đúng thì chạy nhánh sau if. | gọi W.KVPV_HITRUN1.start() để khởi động bộ điều khiển
      if(!tqNoHeal()&&W.KVPV_HITRUN1.status(false)?.running!==true)W.KVPV_HITRUN1.start();
// [VI dòng gốc 90] gọi W.KVPV_TH300.sync() (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gán S.lastError bằng '' | tăng S.switches một đơn vị sau khi lấy giá trị | gán S.lastChangedAt bằng new Date().toISOString()
      W.KVPV_TH300.sync?.();S.lastError='';S.switches++;S.lastChangedAt=new Date().toISOString();log('TQ-BOSS-HANDOFF',key);
// [VI dòng gốc 91] Nhận lỗi bằng e và chạy phần xử lý lỗi. | gán S.lastError bằng String(e?.message||e) | gọi log('TQ-HANDOFF-BLOCKED', S.lastError)
    }catch(e){S.lastError=String(e?.message||e);log('TQ-HANDOFF-BLOCKED',S.lastError);}
// [VI dòng gốc 92] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 93] Chú thích gốc của tác giả; không được thực thi. Nội dung: Đồng bộ chế độ với phạm vi Thiên Quan; ra ngoài thì giải phóng, Boss mới thiếu bằng chứng thì quay lại SCAN.
  // Đồng bộ chế độ với phạm vi Thiên Quan; ra ngoài thì giải phóng, Boss mới thiếu bằng chứng thì quay lại SCAN.
// [VI dòng gốc 94] Định nghĩa hàm syncMap; tham số: không có
  function syncMap(){
// [VI dòng gốc 95] Kiểm tra !scopedMode: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(!scopedMode)return;
// [VI dòng gốc 96] Kiểm tra !valid(): đúng thì chạy nhánh sau if. | gọi stop('Actor/session changed') để dừng bộ điều khiển và dọn tài nguyên | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(!valid()){stop('Actor/session changed');return;}
// [VI dòng gốc 97] gọi guardEntryMove()
    guardEntryMove();
// [VI dòng gốc 98] Khai báo biến không gán lại bằng const: scope = gọi W.KVPV_FAR_SCOPE?.status() để trả trạng thái để kiểm tra (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const scope=W.KVPV_FAR_SCOPE?.status?.();
    // A PvP observer waits for player targets; dungeon auto must own monsters.
    // Disable only when actually in Tru Tien, never on other maps.
    if(scope?.inside===true&&scope.kind==='TRU_TIEN'&&
       W.KVPV_TRUTIEN_PVP?.status?.()?.enabled===true)
      W.KVPV_TRUTIEN_PVP.stop('auto_trutien_dungeon_pve');

// [VI dòng gốc 99] Kiểm tra scope: đúng thì chạy nhánh sau if. | Khai báo biến không gán lại bằng const: key = tính biểu thức scope.kind+'/'+scope.current+'/'+(scope.floor??'')
    if(scope){const key=scope.kind+'/'+scope.current+'/'+(scope.floor??'');
// [VI dòng gốc 100] Kiểm tra lastScopeKey!==null&&lastScopeKey!==key: đúng thì chạy nhánh sau if. | gọi stopOwners('Đổi phạm vi/map/tầng') | gán S.mode bằng MODE.OFF | gán towerAttempt bằng null
      if(lastScopeKey!==null&&lastScopeKey!==key){stopOwners('Đổi phạm vi/map/tầng');S.mode=MODE.OFF;towerAttempt=null;lastTianQuanKey=null;}
// [VI dòng gốc 101] Kiểm tra lastScopeKey!==key&&scope.kind==='THIEN_QUAN'&&scope.inside: đúng thì chạy nhánh sau if. | gọi W.KVPV_TH300?.setDistance(W.KVPV_DESKTOP_CONTROL?.distance?.()??310) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
      if(lastScopeKey!==key&&scope.kind==='THIEN_QUAN'&&scope.inside)W.KVPV_TH300?.setDistance?.(tqNoHeal()?310:(W.KVPV_DESKTOP_CONTROL?.distance?.()??310));
// [VI dòng gốc 102] gán lastScopeKey bằng key
      lastScopeKey=key;}
// [VI dòng gốc 103] Kiểm tra !inFarMap(): đúng thì chạy nhánh sau if.
    if(!inFarMap()){
// [VI dòng gốc 104] Kiểm tra S.mode!==MODE.OFF||W.KVPV_TH300?.status?.(false)?.running||W.KVPV_HITRUN1?.status?.(false)?.running: đúng thì chạy nhánh sau if. | gọi stopOwners('Rời Thiên Quan: trả combat mặc định') | gán S.mode bằng MODE.OFF | gán towerAttempt bằng null
      if(S.mode!==MODE.OFF||W.KVPV_TH300?.status?.(false)?.running||W.KVPV_HITRUN1?.status?.(false)?.running){stopOwners('Rời Thiên Quan: trả combat mặc định');S.mode=MODE.OFF;towerAttempt=null;log('MAP-EXIT','native combat');}
// [VI dòng gốc 105] gọi W.KVPV_EXPERIMENTAL_BOOST?.sync() (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
      W.KVPV_EXPERIMENTAL_BOOST?.sync?.();
// [VI dòng gốc 106] gán S.reason bằng 'Ngoài Thiên Quan/Linh Lung: chờ vào map' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      S.reason='Ngoài Thiên Quan/Linh Lung: chờ vào map';return;
// [VI dòng gốc 107] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 108] Chú thích gốc của tác giả; không được thực thi. Nội dung: Giữ trạng thái ARMED qua chết/hồi sinh. MODE.stop() xóa scopedMode nên không bị tự bật lại.
    if(tqNoHeal())stopTqHealing('Thiên Quan giữ 310, không hồi máu');
    // Giữ trạng thái ARMED qua chết/hồi sinh. MODE.stop() xóa scopedMode nên không bị tự bật lại.
// [VI dòng gốc 109] Khai báo biến không gán lại bằng const: me = gọi W._C?._Ba?.instance?.getRole(Number(initialActor)) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const me=W._C?._Ba?.instance?.getRole?.(Number(initialActor));
// [VI dòng gốc 110] Khai báo biến không gán lại bằng const: hp = gọi me?.property?.get('hp') (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const hp=me?.property?.get?.('hp');
// [VI dòng gốc 111] Khai báo biến không gán lại bằng const: dead = W._Ba?._rJ?._O$?.ins?.isDead===true hoặc dùng vế phải khi vế trái falsy: Array.isArray(hp)&&Number(hp[0])<=0
    const dead=W._Ba?._rJ?._O$?.ins?.isDead===true||(Array.isArray(hp)&&Number(hp[0])<=0);
// [VI dòng gốc 112] Kiểm tra dead: đúng thì chạy nhánh sau if.
    if(dead){
// [VI dòng gốc 113] Khai báo biến không gán lại bằng const: z = gọi inspect() | Kiểm tra S.mode!==MODE.OFF||z.auto?.enabled||z.boss?.running||z.long?.running: đúng thì chạy nhánh sau if. | gọi stopOwners('Chết: chờ hồi sinh, giữ chế độ tự động')
      const z=inspect();if(S.mode!==MODE.OFF||z.auto?.enabled||z.boss?.running||z.long?.running)stopOwners('Chết: chờ hồi sinh, giữ chế độ tự động');
// [VI dòng gốc 114] gán S.mode bằng MODE.OFF | gán lastTianQuanKey bằng null | gán towerAttempt bằng null | gán S.reason bằng 'Chờ hồi sinh; vẫn giữ tự động Thiên Quan/Linh Lung'
      S.mode=MODE.OFF;lastTianQuanKey=null;towerAttempt=null;S.reason='Chờ hồi sinh; vẫn giữ tự động Thiên Quan/Linh Lung';return;
// [VI dòng gốc 115] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 116] Chú thích gốc của tác giả; không được thực thi. Nội dung: Sửa timer mất bằng API cũ, không xóa attemptedKey hay phát lại yêu cầu Boss lỗi.
    // Sửa timer mất bằng API cũ, không xóa attemptedKey hay phát lại yêu cầu Boss lỗi.
// [VI dòng gốc 117] Kiểm tra S.mode!==MODE.OFF&&Date.now()-lastMaintenanceAt>=2000: đúng thì chạy nhánh sau if.
    if(S.mode!==MODE.OFF&&Date.now()-lastMaintenanceAt>=2000){
// [VI dòng gốc 118] gán lastMaintenanceAt bằng Date.now() | Khai báo biến không gán lại bằng const: z = gọi inspect(); tower = gọi ['LINH_LUNG','PHU_VAN','TRU_TIEN'].includes(scope?.kind) để kiểm tra dữ liệu có chứa giá trị
      lastMaintenanceAt=Date.now();const z=inspect(),tower=['LINH_LUNG','PHU_VAN','TRU_TIEN'].includes(scope?.kind);
// [VI dòng gốc 119] Kiểm tra z.long?.running!==true||(!tower&&z.auto?.enabled===false&&z.auto?.lastMode==='session-unavailable'&&!z.boss?.running): đúng thì chạy nhánh sau if.
      if(z.long?.running!==true||(!tower&&z.auto?.enabled===false&&z.auto?.lastMode==='session-unavailable'&&!z.boss?.running)){
// [VI dòng gốc 120] gọi log('AUTO-RESUME', 'Khôi phục bộ đánh trong map sau khi gián đoạn') | gọi start(scopedMode) để khởi động bộ điều khiển | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
        log('AUTO-RESUME','Khôi phục bộ đánh trong map sau khi gián đoạn');start(scopedMode);return;
// [VI dòng gốc 121] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
      }
// [VI dòng gốc 122] Kiểm tra !tower&&z.auto?.enabled===true&&z.auto?.timerActive===false: đúng thì chạy nhánh sau if. | gọi W.KVPV_HITRUN_AUTO?.repairPolling() (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
      if(!tower&&z.auto?.enabled===true&&z.auto?.timerActive===false)W.KVPV_HITRUN_AUTO?.repairPolling?.();
// [VI dòng gốc 123] gọi W.KVPV_TH300?.repairPolling() (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
      W.KVPV_TH300?.repairPolling?.();
// [VI dòng gốc 124] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 125] Chú thích gốc của tác giả; không được thực thi. Nội dung: Sang Boss khác, bằng chứng của loại Boss cũ có thể không dùng được: cho SCAN học lại.
    // Sang Boss khác, bằng chứng của loại Boss cũ có thể không dùng được: cho SCAN học lại.
// [VI dòng gốc 126] Kiểm tra S.mode===MODE.BOSS_TH300: đúng thì chạy nhánh sau if.
    if(S.mode===MODE.BOSS_TH300){
// [VI dòng gốc 127] Khai báo biến không gán lại bằng const: evidence = gọi W.KVPV_TH300?.status(false) để trả trạng thái để kiểm tra (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
      const evidence=W.KVPV_TH300?.status?.(false);
// [VI dòng gốc 128] Kiểm tra evidence?.running&&(evidence.confirmedSkills??evidence.confirmedOver300??[]).length===0: đúng thì chạy nhánh sau if.
      if(evidence?.running&&(evidence.confirmedSkills??evidence.confirmedOver300??[]).length===0){
// [VI dòng gốc 129] gọi log('RESCAN', 'Boss hiện tại chưa có chiêu xác nhận') | gọi start(MODE.BOSS_TH300_SCAN) để khởi động bộ điều khiển | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
        log('RESCAN','Boss hiện tại chưa có chiêu xác nhận');start(MODE.BOSS_TH300_SCAN);return;
// [VI dòng gốc 130] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
      }
// [VI dòng gốc 131] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 132] Kiểm tra S.mode===MODE.OFF&&W._Ba?._rJ?._O$?.ins?.isDead!==true: đúng thì chạy nhánh sau if. | gọi start(scopedMode) để khởi động bộ điều khiển
    if(S.mode===MODE.OFF&&W._Ba?._rJ?._O$?.ins?.isDead!==true)start(scopedMode);
// [VI dòng gốc 133] Kiểm tra S.mode!==MODE.OFF: đúng thì chạy nhánh sau if. | gọi syncTowerBoss() | gọi syncTianQuanBoss()
    if(S.mode!==MODE.OFF){syncTowerBoss();syncTianQuanBoss();}
// [VI dòng gốc 134] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 135] Chú thích gốc của tác giả; không được thực thi. Nội dung: Lưu chế độ chờ và chỉ tạo một lịch theo dõi chuyển map.
  // Lưu chế độ chờ và chỉ tạo một lịch theo dõi chuyển map.
// [VI dòng gốc 136] Định nghĩa hàm watchMap; tham số: mode | gán scopedMode bằng mode
  function watchMap(mode){scopedMode=mode;
// [VI dòng gốc 137] Khai báo biến không gán lại bằng const: schedule = W.KVPV_V1?.timers?.setInterval hoặc dùng vế phải khi vế trái là null/undefined: W.setInterval
    const schedule=W.KVPV_V1?.timers?.setInterval??W.setInterval;
// [VI dòng gốc 138] Kiểm tra mapTimer==null&&typeof schedule==='function': đúng thì chạy nhánh sau if. | gán mapTimer bằng schedule(syncMap,75)
    if(mapTimer==null&&typeof schedule==='function')mapTimer=schedule(syncMap,75);
// [VI dòng gốc 139] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 140] Khai báo biến không gán lại bằng const: actorNow = tạo hàm với tham số (không có); mỗi lần gọi trả về gọi String(W._Ba?._rJ?._O$?.ins?.actorId??'') để chuyển sang chuỗi
  const actorNow=()=>String(W._Ba?._rJ?._O$?.ins?.actorId??'');
// [VI dòng gốc 141] Khai báo biến không gán lại bằng const: valid = tạo hàm với tham số (không có); mỗi lần gọi trả về !!initialActor && actorNow()===initialActor và chỉ đánh giá vế phải khi vế trái truthy: !W.__KVPV_UNIVERSAL_HALTED
  const valid=()=>!!initialActor && actorNow()===initialActor && !W.__KVPV_UNIVERSAL_HALTED;
// [VI dòng gốc 142] Khai báo biến không gán lại bằng const: log = tạo hàm với tham số event, detail='' | gọi S.history.push({at:new Date().toISOString(),event,detail}) để thêm phần tử vào cuối mảng
  const log=(event,detail='')=>{S.history.push({at:new Date().toISOString(),event,detail});
// [VI dòng gốc 143] Kiểm tra S.history.length>40: đúng thì chạy nhánh sau if. | gọi S.history.shift()
    if(S.history.length>40)S.history.shift();};
// [VI dòng gốc 144] Khai báo biến không gán lại bằng const: inspect = tạo hàm với tham số (không có); mỗi lần gọi trả về tạo đối tượng gồm boss, auto, range, th, long
  const inspect=()=>({boss:W.KVPV_HITRUN1?.status?.(false),
// [VI dòng gốc 145] Thuộc tính auto: gọi W.KVPV_HITRUN_AUTO?.status(false) để trả trạng thái để kiểm tra (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    auto:W.KVPV_HITRUN_AUTO?.status?.(false),
// [VI dòng gốc 146] Thuộc tính range: gọi W.KVPV_RANGE281?.status(false) để trả trạng thái để kiểm tra (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    range:W.KVPV_RANGE281?.status?.(false),
// [VI dòng gốc 147] Thuộc tính th: gọi W.KVPV_TH_FAR?.status(false) để trả trạng thái để kiểm tra (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    th:W.KVPV_TH_FAR?.status?.(false),
// [VI dòng gốc 148] Thuộc tính long: gọi W.KVPV_TH300?.status(false) để trả trạng thái để kiểm tra (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    long:W.KVPV_TH300?.status?.(false)});
// [VI dòng gốc 149] Chú thích gốc của tác giả; không được thực thi. Nội dung: Dừng HitRun trước bộ kỹ năng để gỡ các lớp hook theo thứ tự sở hữu.
  // Dừng HitRun trước bộ kỹ năng để gỡ các lớp hook theo thứ tự sở hữu.
// [VI dòng gốc 150] Định nghĩa hàm stopOwners; tham số: reason
  function stopTqHealing(reason){
    if(!tqNoHeal())return;
    // Stop only the HP-retreat owner; the far-range controller remains running.
    try{if(W.KVPV_HITRUN_AUTO?.status?.(false)?.enabled===true)W.KVPV_HITRUN_AUTO.stop(true);}catch(e){log('tq-auto-stop-error',String(e));}
    try{if(W.KVPV_HITRUN1?.status?.(false)?.running===true)W.KVPV_HITRUN1.stop(reason);}catch(e){log('tq-hitrun-stop-error',String(e));}
    try{if(W.KVPV?.combat?.config)W.KVPV.combat.config.autoArm=false;}catch(e){log('tq-autoarm-error',String(e));}
  }
  function stopOwners(reason){
// [VI dòng gốc 151] Chú thích gốc của tác giả; không được thực thi. Nội dung: Release temporary HitRun wrappers before removing the skill hook beneath.
    // Release temporary HitRun wrappers before removing the skill hook beneath.
// [VI dòng gốc 152] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | gọi W.KVPV_HITRUN_AUTO?.stop(true) để dừng bộ điều khiển và dọn tài nguyên (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Nhận lỗi bằng e và chạy phần xử lý lỗi. | gọi log('auto-stop-error', String(e))
    try{W.KVPV_HITRUN_AUTO?.stop?.(true);}catch(e){log('auto-stop-error',String(e));}
// [VI dòng gốc 153] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | Kiểm tra W.KVPV_HITRUN1?.status?.(false)?.running: đúng thì chạy nhánh sau if. | gọi W.KVPV_HITRUN1.stop(reason) để dừng bộ điều khiển và dọn tài nguyên | Nhận lỗi bằng e và chạy phần xử lý lỗi.
    try{if(W.KVPV_HITRUN1?.status?.(false)?.running)W.KVPV_HITRUN1.stop(reason);}catch(e){log('boss-stop-error',String(e));}
// [VI dòng gốc 154] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | gọi W.KVPV_TH300?.stop(reason) để dừng bộ điều khiển và dọn tài nguyên (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Nhận lỗi bằng e và chạy phần xử lý lỗi. | gọi log('long-stop-error', String(e))
    try{W.KVPV_TH300?.stop?.(reason);}catch(e){log('long-stop-error',String(e));}
// [VI dòng gốc 155] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | gọi W.KVPV_TH_FAR?.stop(reason) để dừng bộ điều khiển và dọn tài nguyên (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Nhận lỗi bằng e và chạy phần xử lý lỗi. | gọi log('th-stop-error', String(e))
    try{W.KVPV_TH_FAR?.stop?.(reason);}catch(e){log('th-stop-error',String(e));}
// [VI dòng gốc 156] Chú thích gốc của tác giả; không được thực thi. Nội dung: Do not attempt to stop a controller that has not been installed.
    // Do not attempt to stop a controller that has not been installed.
// [VI dòng gốc 157] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | gọi W.KVPV_RANGE281?.enable(false) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Nhận lỗi bằng e và chạy phần xử lý lỗi. | gọi log('range-stop-error', String(e))
    try{W.KVPV_RANGE281?.enable?.(false);}catch(e){log('range-stop-error',String(e));}
// [VI dòng gốc 158] Chú thích gốc của tác giả; không được thực thi. Nội dung: Disable any other auto-arm repair watcher until manual BOSS start.
    // Disable any other auto-arm repair watcher until manual BOSS start.
// [VI dòng gốc 159] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | Kiểm tra W.KVPV?.combat?.config: đúng thì chạy nhánh sau if. | gán W.KVPV.combat.config.autoArm bằng false | Nhận lỗi bằng e và chạy phần xử lý lỗi.
    try{if(W.KVPV?.combat?.config)W.KVPV.combat.config.autoArm=false;}catch(e){log('flag-stop-error',String(e));}
// [VI dòng gốc 160] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 161] Chú thích gốc của tác giả; không được thực thi. Nội dung: Đối chiếu trạng thái chế độ với bộ Boss thực tế, giúp hiển thị lý do đang chờ hoặc đã dừng.
  // Đối chiếu trạng thái chế độ với bộ Boss thực tế, giúp hiển thị lý do đang chờ hoặc đã dừng.
// [VI dòng gốc 162] Định nghĩa hàm cleanState; tham số: không có
  function cleanState(){
// [VI dòng gốc 163] Khai báo biến không gán lại bằng const: z = gọi inspect()
    const z=inspect();
// [VI dòng gốc 164] Kiểm tra ([MODE.BOSS,MODE.BOSS_TH,MODE.BOSS_TH300,MODE.BOSS_TH300_SCAN].includes(S.mode)) && z.boss?.running!==true: đúng thì chạy nhánh sau if.
    if(([MODE.BOSS,MODE.BOSS_TH,MODE.BOSS_TH300,MODE.BOSS_TH300_SCAN].includes(S.mode)) && z.boss?.running!==true)
// [VI dòng gốc 165] Kết thúc hàm hiện tại và trả về: nếu ['LINH_LUNG','PHU_VAN','TRU_TIEN'].includes(W.KVPV_FAR_SCOPE?.status?.().kind) thì lấy S.lastError||'Phó bản: chờ mục tiêu hợp lệ để bật HitRun 35/100', ngược lại lấy z.auto?.enabled===true?'Boss chưa chạy: '+String(z.auto.lastError||z.auto.lastBlocked||z.auto.lastMode||'chờ game chọn Boss'):'Boss auto OFF / awaiting explicit BOSS start'.
      return ['LINH_LUNG','PHU_VAN','TRU_TIEN'].includes(W.KVPV_FAR_SCOPE?.status?.().kind)?(S.lastError||'Phó bản: chờ mục tiêu hợp lệ để bật HitRun 35/100'):z.auto?.enabled===true?'Boss chưa chạy: '+String(z.auto.lastError||z.auto.lastBlocked||z.auto.lastMode||'chờ game chọn Boss'):'Boss auto OFF / awaiting explicit BOSS start';
// [VI dòng gốc 166] Kết thúc hàm hiện tại và trả về: đọc S.reason.
    return S.reason;
// [VI dòng gốc 167] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 168] Chú thích gốc của tác giả; không được thực thi. Nội dung: Trả trạng thái hiện tại để kiểm tra; ý nghĩa từng bộ đếm thuộc phạm vi module này.
  // Trả trạng thái hiện tại để kiểm tra; ý nghĩa từng bộ đếm thuộc phạm vi module này.
// [VI dòng gốc 169] Định nghĩa hàm status; tham số: show=true. Mục đích: trả trạng thái để kiểm tra
  function status(show=true){
// [VI dòng gốc 170] Khai báo biến không gán lại bằng const: z = gọi inspect()
    const z=inspect();
// [VI dòng gốc 171] Khai báo biến không gán lại bằng const: out = tạo đối tượng gồm version, mode, actorId, actorValid, tianQuanOnly, farMapsOnly, insideTianQuan, farScope, pendingTianQuanMode, mapScope, tianQuanBossKey, autoMaintain, manualStopCommand, reason, switched, lastChangedAt, combatOwner, combatRunning, combatPhase, bossRunning, bossPhase, bossAutoEnabled, stand281Enabled, bossAutoState, bossAutoBlocked, bossAutoError, bossDistanceTarget, tuyetHocOnly, tuyetHocConfi…
    const out={version:'1.0.0',mode:S.mode,actorId:initialActor,actorValid:valid(),
// [VI dòng gốc 172] Thuộc tính tianQuanOnly: !!scopedMode và chỉ đánh giá vế phải khi vế trái truthy: !W.KVPV_FAR_SCOPE | Thuộc tính farMapsOnly: đảo giá trị đúng/sai của !scopedMode | Thuộc tính insideTianQuan: W.KVPV_TQ_SCOPE?.inside?.() hoặc dùng vế phải khi vế trái là null/undefined: false | Thuộc tính farScope: W.KVPV_FAR_SCOPE?.status?.() hoặc dùng vế phải khi vế trái là null/undefined: null
      tianQuanOnly:!!scopedMode&&!W.KVPV_FAR_SCOPE,farMapsOnly:!!scopedMode,insideTianQuan:W.KVPV_TQ_SCOPE?.inside?.()??false,farScope:W.KVPV_FAR_SCOPE?.status?.()??null,pendingTianQuanMode:scopedMode,mapScope:W.KVPV_TQ_SCOPE?.status?.()??null,
// [VI dòng gốc 173] Thuộc tính tianQuanBossKey: lastTianQuanKey | Thuộc tính autoMaintain: đảo giá trị đúng/sai của !scopedMode | Thuộc tính manualStopCommand: "KVPV_MODE.stop()" | Thuộc tính reason: gọi cleanState()
      tianQuanBossKey:lastTianQuanKey,autoMaintain:!!scopedMode,manualStopCommand:'KVPV_MODE.stop()',reason:cleanState(),switched:S.switches,lastChangedAt:S.lastChangedAt,
// [VI dòng gốc 174] Thuộc tính combatOwner: z.long?.combatOwner hoặc dùng vế phải khi vế trái là null/undefined: 'HITRUN' | Thuộc tính combatRunning: nếu z.long?.running thì lấy z.long?.combatRunning===true, ngược lại lấy z.boss?.running===true | Thuộc tính combatPhase: nếu z.long?.running thì lấy z.long?.combatPhase, ngược lại lấy z.boss?.phase
      combatOwner:z.long?.combatOwner??'HITRUN',combatRunning:z.long?.running?z.long?.combatRunning===true:z.boss?.running===true,combatPhase:z.long?.running?z.long?.combatPhase:z.boss?.phase,
// [VI dòng gốc 175] Thuộc tính bossRunning: tính biểu thức z.boss?.running===true | Thuộc tính bossPhase: z.boss?.phase hoặc dùng vế phải khi vế trái là null/undefined: null
      distanceOnly310:tqNoHeal(),healingEnabled:!tqNoHeal(),
      bossRunning:z.boss?.running===true,bossPhase:z.boss?.phase??null,
// [VI dòng gốc 176] Thuộc tính bossAutoEnabled: tính biểu thức z.auto?.enabled===true | Thuộc tính stand281Enabled: false
      bossAutoEnabled:z.auto?.enabled===true,stand281Enabled:false,
// [VI dòng gốc 177] Thuộc tính bossAutoState: z.auto?.lastMode hoặc dùng vế phải khi vế trái là null/undefined: null | Thuộc tính bossAutoBlocked: z.auto?.lastBlocked hoặc dùng vế phải khi vế trái là null/undefined: null | Thuộc tính bossAutoError: z.auto?.lastError hoặc dùng vế phải khi vế trái là null/undefined: ''
      bossAutoState:z.auto?.lastMode??null,bossAutoBlocked:z.auto?.lastBlocked??null,bossAutoError:z.auto?.lastError??'',
// [VI dòng gốc 178] Thuộc tính bossDistanceTarget: nếu [MODE.BOSS_TH300,MODE.BOSS_TH300_SCAN].includes(S.mode) thì lấy z.long?.goalDistance??null, ngược lại lấy S.mode===MODE.BOSS_TH?z.th?.goalDistance??null:null
      bossDistanceTarget:[MODE.BOSS_TH300,MODE.BOSS_TH300_SCAN].includes(S.mode)?z.long?.goalDistance??null:S.mode===MODE.BOSS_TH?z.th?.goalDistance??null:null,
// [VI dòng gốc 179] Thuộc tính tuyetHocOnly: z.th?.enabled===true hoặc dùng vế phải khi vế trái falsy: z.long?.running===true&&!z.long?.basicProbeActive&&!z.long?.interleavedBasic | Thuộc tính tuyetHocConfirmed: z.th?.confirmedTH hoặc dùng vế phải khi vế trái là null/undefined: 0
      tuyetHocOnly:z.th?.enabled===true||(z.long?.running===true&&!z.long?.basicProbeActive&&!z.long?.interleavedBasic),tuyetHocConfirmed:z.th?.confirmedTH??0,
// [VI dòng gốc 180] Thuộc tính longRangeProof: z.long?.confirmedSkills||z.long?.confirmedOver300 hoặc dùng vế phải khi vế trái falsy: [] | Thuộc tính longScan: tính biểu thức z.long?.operation==='SCAN'
      longRangeProof:z.long?.confirmedSkills||z.long?.confirmedOver300||[],longScan:z.long?.operation==='SCAN',
// [VI dòng gốc 181] Thuộc tính range281Enabled: z.range?.enabled===true và chỉ đánh giá vế phải khi vế trái truthy: z.range?.hookAttached===true
      range281Enabled:z.range?.enabled===true && z.range?.hookAttached===true,
// [VI dòng gốc 182] Thuộc tính errors: đọc S.errors | Thuộc tính lastError: đọc S.lastError | Thuộc tính history: gọi S.history.slice(-8) để lấy một đoạn dữ liệu
      errors:S.errors,lastError:S.lastError,history:S.history.slice(-8),
// [VI dòng gốc 183] Thuộc tính note: "BOSS_TH300_SCAN probes native Tuyet Hoc at the configured distance (default 302) to measure cast+hit; BOSS_TH300 only uses independently confirmed skills at the configured distance. If none verified, it waits. Range override never guarantees server reach."
      note:'BOSS_TH300_SCAN probes native Tuyet Hoc at the configured distance (default 302) to measure cast+hit; BOSS_TH300 only uses independently confirmed skills at the configured distance. If none verified, it waits. Range override never guarantees server reach.'};
// [VI dòng gốc 184] Kiểm tra show: đúng thì chạy nhánh sau if. | gọi console.table([{mode:out.mode,valid:out.actorValid,boss:out.bossRunning, phase:out.bossPhase,stand281:out.stand281Enabled, distance:ou…)
    if(show){console.table([{mode:out.mode,valid:out.actorValid,boss:out.bossRunning,
// [VI dòng gốc 185] Thuộc tính phase: đọc out.bossPhase | Thuộc tính stand281: đọc out.stand281Enabled
      phase:out.bossPhase,stand281:out.stand281Enabled,
// [VI dòng gốc 186] Thuộc tính distance: đọc out.bossDistanceTarget | Thuộc tính thOnly: đọc out.tuyetHocOnly | Thuộc tính lastError: đọc out.lastError
      distance:out.bossDistanceTarget,thOnly:out.tuyetHocOnly,lastError:out.lastError}]);}
// [VI dòng gốc 187] Kết thúc hàm hiện tại và trả về: out.
    return out;
// [VI dòng gốc 188] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 189] Chú thích gốc của tác giả; không được thực thi. Nội dung: Chuẩn hóa tên chế độ và từ chối chế độ không được hỗ trợ.
  // Chuẩn hóa tên chế độ và từ chối chế độ không được hỗ trợ.
// [VI dòng gốc 190] Định nghĩa hàm choose; tham số: input
  function choose(input){
// [VI dòng gốc 191] Khai báo biến không gán lại bằng const: name = gọi String(input??'').trim().toUpperCase()
    const name=String(input??'').trim().toUpperCase();
// [VI dòng gốc 192] Khai báo biến không gán lại bằng const: aliases = tạo đối tượng gồm BOSS, BOSS_281, THIENQUAN, THIEN_QUAN, BOSS_TH, TH, TUYETHOC, TUYET_HOC, BOSS_TH300, BOSS_TH300_SCAN, OFF, STOP
    const aliases={BOSS:'BOSS',BOSS_281:'BOSS',THIENQUAN:'BOSS',THIEN_QUAN:'BOSS',
// [VI dòng gốc 193] Thuộc tính BOSS_TH: "BOSS_TH" | Thuộc tính TH: "BOSS_TH" | Thuộc tính TUYETHOC: "BOSS_TH" | Thuộc tính TUYET_HOC: "BOSS_TH"
      BOSS_TH:'BOSS_TH',TH:'BOSS_TH',TUYETHOC:'BOSS_TH',TUYET_HOC:'BOSS_TH',
// [VI dòng gốc 194] Thuộc tính BOSS_TH300: "BOSS_TH300" | Thuộc tính BOSS_TH300_SCAN: "BOSS_TH300_SCAN"
      BOSS_TH300:'BOSS_TH300',BOSS_TH300_SCAN:'BOSS_TH300_SCAN',
// [VI dòng gốc 195] Thuộc tính OFF: "OFF" | Thuộc tính STOP: "OFF"
      OFF:'OFF',STOP:'OFF'};
// [VI dòng gốc 196] Kiểm tra !Object.prototype.hasOwnProperty.call(aliases,name): đúng thì chạy nhánh sau if.
    if(!Object.prototype.hasOwnProperty.call(aliases,name))
// [VI dòng gốc 197] Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('Chọn BOSS | BOSS_TH | BOSS_TH300_SCAN | BOSS_TH300 | OFF')
      throw Error('Chọn BOSS | BOSS_TH | BOSS_TH300_SCAN | BOSS_TH300 | OFF');
// [VI dòng gốc 198] Kết thúc hàm hiện tại và trả về: đọc aliases[name].
    return aliases[name];
// [VI dòng gốc 199] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 200] Chú thích gốc của tác giả; không được thực thi. Nội dung: Dừng bộ điều khiển, hủy lịch và giải phóng tài nguyên do module này sở hữu.
  // Dừng bộ điều khiển, hủy lịch và giải phóng tài nguyên do module này sở hữu.
// [VI dòng gốc 201] Định nghĩa hàm stop; tham số: reason='Người dùng dừng combat mode'. Mục đích: dừng bộ điều khiển và dọn tài nguyên
  function stop(reason='Người dùng dừng combat mode'){
// [VI dòng gốc 202] gọi releaseEntryMove()
    releaseEntryMove();
// [VI dòng gốc 203] gán scopedMode bằng null | gán lastTianQuanKey bằng null | Kiểm tra mapTimer!=null: đúng thì chạy nhánh sau if. | gọi W.KVPV_V1?.timers?.clearInterval??W.clearInterval(mapTimer) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    scopedMode=null;lastTianQuanKey=null;if(mapTimer!=null){(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)?.(mapTimer);mapTimer=null;}
// [VI dòng gốc 204] gọi stopOwners(reason) | gán S.mode bằng MODE.OFF | gán S.reason bằng reason | tăng S.switches một đơn vị sau khi lấy giá trị
    stopOwners(reason);S.mode=MODE.OFF;S.reason=reason;S.switches++;
// [VI dòng gốc 205] gán S.lastChangedAt bằng new Date().toISOString() | gọi log('STOP', reason) | Kết thúc hàm hiện tại và trả về: gọi status(false) để trả trạng thái để kiểm tra.
    S.lastChangedAt=new Date().toISOString();log('STOP',reason);return status(false);
// [VI dòng gốc 206] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 207] Chú thích gốc của tác giả; không được thực thi. Nội dung: Bật bộ điều khiển và lịch kiểm tra của module; trả trạng thái sau khi khởi động.
  // Bật bộ điều khiển và lịch kiểm tra của module; trả trạng thái sau khi khởi động.
// [VI dòng gốc 208] Định nghĩa hàm start; tham số: modeName. Mục đích: khởi động bộ điều khiển
  function start(modeName){
// [VI dòng gốc 209] Khai báo biến có thể gán lại bằng let: target = gọi choose(modeName)
    let target=choose(modeName);
// [VI dòng gốc 210] Kiểm tra target===MODE.OFF: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: gọi stop() để dừng bộ điều khiển và dọn tài nguyên.
    if(target===MODE.OFF)return stop();
// [VI dòng gốc 211] Kiểm tra W._Ba?._rJ?._O$?.ins?.isDead===true: đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('Nhân vật đã chết; hồi sinh rồi START lại')
    if(W._Ba?._rJ?._O$?.ins?.isDead===true)throw Error('Nhân vật đã chết; hồi sinh rồi START lại');
// [VI dòng gốc 212] Kiểm tra !valid(): đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('Sai game-frame hoặc nhân vật chưa sẵn sàng')
    if(!valid())throw Error('Sai game-frame hoặc nhân vật chưa sẵn sàng');
// [VI dòng gốc 213] Kiểm tra !W.KVPV_HITRUN_AUTO || !W.KVPV_HITRUN1: đúng thì chạy nhánh sau if.
    if(!W.KVPV_HITRUN_AUTO || !W.KVPV_HITRUN1)
// [VI dòng gốc 214] Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('Thiếu module combat trong V1')
      throw Error('Thiếu module combat trong V1');
// [VI dòng gốc 215] Kiểm tra target!==MODE.BOSS && !W.KVPV_RANGE281?.enable: đúng thì chạy nhánh sau if.
    if(target!==MODE.BOSS && !W.KVPV_RANGE281?.enable)
// [VI dòng gốc 216] Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('Thiếu RANGE281 cho mode Tuyệt Học thử nghiệm')
      throw Error('Thiếu RANGE281 cho mode Tuyệt Học thử nghiệm');
// [VI dòng gốc 217] Kiểm tra target===MODE.BOSS_TH && !W.KVPV_TH_FAR?.start: đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('Thiếu TUYET HOC FAR')
    if(target===MODE.BOSS_TH && !W.KVPV_TH_FAR?.start)throw Error('Thiếu TUYET HOC FAR');
// [VI dòng gốc 218] Kiểm tra ([MODE.BOSS_TH300,MODE.BOSS_TH300_SCAN].includes(target)) && (!W.KVPV_TH300?.start||!W.KVPV_RANGE281?.setTrialRange): đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('Thiếu TH300 / Range adjustable')
    if(([MODE.BOSS_TH300,MODE.BOSS_TH300_SCAN].includes(target)) && (!W.KVPV_TH300?.start||!W.KVPV_RANGE281?.setTrialRange))throw Error('Thiếu TH300 / Range adjustable');
// [VI dòng gốc 219] Kiểm tra target===MODE.BOSS_TH300: đúng thì chạy nhánh sau if.
    if(target===MODE.BOSS_TH300){
// [VI dòng gốc 220] Khai báo biến không gán lại bằng const: evidence = gọi W.KVPV_TH300.status(false) để trả trạng thái để kiểm tra
      const evidence=W.KVPV_TH300.status(false);
// [VI dòng gốc 221] Kiểm tra (evidence.confirmedSkills??evidence.confirmedOver300??[]).length===0: đúng thì chạy nhánh sau if.
      if((evidence.confirmedSkills??evidence.confirmedOver300??[]).length===0){
// [VI dòng gốc 222] gán target bằng MODE.BOSS_TH300_SCAN | gọi log('RESCAN', 'STRICT chưa có bằng chứng cho Boss hiện tại')
        target=MODE.BOSS_TH300_SCAN;log('RESCAN','STRICT chưa có bằng chứng cho Boss hiện tại');
// [VI dòng gốc 223] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
      }
// [VI dòng gốc 224] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 225] Kiểm tra [MODE.BOSS_TH300,MODE.BOSS_TH300_SCAN].includes(target): đúng thì chạy nhánh sau if, sai thì chạy nhánh else.
    if([MODE.BOSS_TH300,MODE.BOSS_TH300_SCAN].includes(target)){
// [VI dòng gốc 226] gọi watchMap(target)
      watchMap(target);
// [VI dòng gốc 227] Kiểm tra !inFarMap(): đúng thì chạy nhánh sau if. | gọi stopOwners('Chờ map Thiên Quan/Linh Lung') | gán S.mode bằng MODE.OFF | gán S.reason bằng 'Ngoài Thiên Quan/Linh Lung: combat mặc định; chờ vào map'
      if(!inFarMap()){stopOwners('Chờ map Thiên Quan/Linh Lung');S.mode=MODE.OFF;S.reason='Ngoài Thiên Quan/Linh Lung: combat mặc định; chờ vào map';return status(false);}
// [VI dòng gốc 228] gán scopedMode bằng null | Kiểm tra mapTimer!=null: đúng thì chạy nhánh sau if. | gọi W.KVPV_V1?.timers?.clearInterval??W.clearInterval(mapTimer) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gán mapTimer bằng null
    }else{scopedMode=null;if(mapTimer!=null){(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)?.(mapTimer);mapTimer=null;}}
// [VI dòng gốc 229] Khai báo biến không gán lại bằng const: previous = đọc S.mode
    const previous=S.mode;
// [VI dòng gốc 230] Chú thích gốc của tác giả; không được thực thi. Nội dung: Release the outside-map basic selector before installing stage hooks.
    // Release the outside-map basic selector before installing stage hooks.
// [VI dòng gốc 231] gọi W.KVPV_BASIC10?.release() để nhả quyền điều khiển đang giữ (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    W.KVPV_BASIC10?.release?.();
// [VI dòng gốc 232] Chú thích gốc của tác giả; không được thực thi. Nội dung: An idempotent command never destroys an active session.
    // An idempotent command never destroys an active session.
// [VI dòng gốc 233] Khai báo biến không gán lại bằng const: z = gọi inspect()
    const z=inspect();
// [VI dòng gốc 234] Kiểm tra previous===target && (target===MODE.BOSS || (target===MODE.BOSS_TH && z.th?.enabled===true) || ([MODE.BOSS_TH300,MODE.BOSS_TH300_SCAN].includes(target)&&z.long?.running===true)) &&…: đúng thì chạy nhánh sau if.
    if(previous===target &&
// [VI dòng gốc 235] Tiếp tục hàm start; thành phần cú pháp bắt đầu bằng (. Đọc cùng dòng mở phía trên: (target===MODE.BOSS || (target===MODE.BOSS_TH && z.th?.enabled===true) ||
       (target===MODE.BOSS || (target===MODE.BOSS_TH && z.th?.enabled===true) ||
// [VI dòng gốc 236] gọi [MODE.BOSS_TH300,MODE.BOSS_TH300_SCAN].includes(target) để kiểm tra dữ liệu có chứa giá trị
        ([MODE.BOSS_TH300,MODE.BOSS_TH300_SCAN].includes(target)&&z.long?.running===true)) &&
// [VI dòng gốc 237] Kết thúc hàm hiện tại và trả về: gọi status(false) để trả trạng thái để kiểm tra.
       (z.auto?.enabled||z.boss?.running||tqNoHeal()&&z.long?.running===true))return status(false);
// [VI dòng gốc 238] gọi stopOwners('Chuyển combat mode '+previous+' → '+target)
    stopOwners('Chuyển combat mode '+previous+' → '+target);
// [VI dòng gốc 239] gán S.mode bằng MODE.OFF
    S.mode=MODE.OFF;
// [VI dòng gốc 240] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài.
    try{
// [VI dòng gốc 241] Kiểm tra [MODE.BOSS,MODE.BOSS_TH,MODE.BOSS_TH300,MODE.BOSS_TH300_SCAN].includes(target): đúng thì chạy nhánh sau if.
      if([MODE.BOSS,MODE.BOSS_TH,MODE.BOSS_TH300,MODE.BOSS_TH300_SCAN].includes(target)){
// [VI dòng gốc 242] Chú thích gốc của tác giả; không được thực thi. Nội dung: All Boss safety decisions remain with the original HitRun controller.
        // All Boss safety decisions remain with the original HitRun controller.
// [VI dòng gốc 243] Kiểm tra target!==MODE.BOSS: đúng thì chạy nhánh sau if.
        if(target!==MODE.BOSS){
// [VI dòng gốc 244] gọi W.KVPV_RANGE281.setTrialRange([MODE.BOSS_TH300,MODE.BOSS_TH300_SCAN].includes(target)?Number(W.KVPV_TH300.status(false).requestedDistance??W.KVPV_TH30…)
          W.KVPV_RANGE281.setTrialRange([MODE.BOSS_TH300,MODE.BOSS_TH300_SCAN].includes(target)?Number(W.KVPV_TH300.status(false).requestedDistance??W.KVPV_TH300.status(false).goalDistance??302)+10:281);
// [VI dòng gốc 245] gọi W.KVPV_RANGE281.enable(true)
          W.KVPV_RANGE281.enable(true);
// [VI dòng gốc 246] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
        }
// [VI dòng gốc 247] Kiểm tra target===MODE.BOSS_TH: đúng thì chạy nhánh sau if. | gọi W.KVPV_TH_FAR.start() để khởi động bộ điều khiển
        if(target===MODE.BOSS_TH)W.KVPV_TH_FAR.start();
// [VI dòng gốc 248] Kiểm tra target===MODE.BOSS_TH300_SCAN: đúng thì chạy nhánh sau if. | gọi W.KVPV_TH300.start('SCAN') để khởi động bộ điều khiển
        if(target===MODE.BOSS_TH300_SCAN)W.KVPV_TH300.start('SCAN');
// [VI dòng gốc 249] Kiểm tra target===MODE.BOSS_TH300: đúng thì chạy nhánh sau if. | gọi W.KVPV_TH300.start('STRICT') để khởi động bộ điều khiển
        if(target===MODE.BOSS_TH300)W.KVPV_TH300.start('STRICT');
// [VI dòng gốc 250] Kiểm tra W.KVPV?.combat?.config: đúng thì chạy nhánh sau if. | gán W.KVPV.combat.config.autoArm bằng true
        if(W.KVPV?.combat?.config)W.KVPV.combat.config.autoArm=!tqNoHeal();
// [VI dòng gốc 251] Kiểm tra ['LINH_LUNG','PHU_VAN','TRU_TIEN'].includes(W.KVPV_FAR_SCOPE?.status?.().kind): đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gọi syncTowerBoss()
        if(['LINH_LUNG','PHU_VAN','TRU_TIEN'].includes(W.KVPV_FAR_SCOPE?.status?.().kind)){syncTowerBoss();}
// [VI dòng gốc 252] gọi W.KVPV_HITRUN_AUTO.rearm() | Khai báo biến không gán lại bằng const: ar = gọi W.KVPV_HITRUN_AUTO.status(false) để trả trạng thái để kiểm tra
        else if(tqNoHeal())stopTqHealing('TQ 310 distance only');
        else{W.KVPV_HITRUN_AUTO.rearm();const ar=W.KVPV_HITRUN_AUTO.status(false);
// [VI dòng gốc 253] Kiểm tra ar?.enabled!==true: đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('Boss auto-arm chưa bật')
          if(ar?.enabled!==true)throw Error('Boss auto-arm chưa bật');}
// [VI dòng gốc 254] Kiểm tra [MODE.BOSS_TH300,MODE.BOSS_TH300_SCAN].includes(target): đúng thì chạy nhánh sau if. | gọi W.KVPV_TH300.sync() (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
        if([MODE.BOSS_TH300,MODE.BOSS_TH300_SCAN].includes(target))W.KVPV_TH300.sync?.();
// [VI dòng gốc 255] gán S.reason bằng target===MODE.BOSS_TH300_SCAN?'TH300 SCAN: thử kỹ năng native ở khoảng cách cấu hình, ghi nhận sát thương':target===MODE.BOSS_TH300?'TH300 STRICT: chỉ dùng chiêu có >=2 hit xác nhậ…
        S.reason=target===MODE.BOSS_TH300_SCAN?'TH300 SCAN: thử kỹ năng native ở khoảng cách cấu hình, ghi nhận sát thương':target===MODE.BOSS_TH300?'TH300 STRICT: chỉ dùng chiêu có >=2 hit xác nhận ở khoảng cách đã đo, không có thì chờ':target===MODE.BOSS_TH?'Boss chỉ dùng Tuyệt Học 1001..1008, đứng xa 280.4 khi FIGHT':'Boss combo gốc; HP <=35% chạy vòng ngoài tầm, đầy 100% mới đánh tiếp';
// [VI dòng gốc 256] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
      }
// [VI dòng gốc 257] gán S.mode bằng target | tăng S.switches một đơn vị sau khi lấy giá trị | gán S.lastChangedAt bằng new Date().toISOString()
      S.mode=target;S.switches++;S.lastChangedAt=new Date().toISOString();
// [VI dòng gốc 258] gán S.lastError bằng '' | gọi log('START', target) | Kết thúc hàm hiện tại và trả về: gọi status(true) để trả trạng thái để kiểm tra.
      S.lastError='';log('START',target);return status(true);
// [VI dòng gốc 259] Nhận lỗi bằng e và chạy phần xử lý lỗi.
    }catch(e){
// [VI dòng gốc 260] tăng S.errors một đơn vị sau khi lấy giá trị | gán S.lastError bằng String(e?.message||e) | gọi log('START-ERROR', S.lastError)
      S.errors++;S.lastError=String(e?.message||e);log('START-ERROR',S.lastError);
// [VI dòng gốc 261] gọi stopOwners('Start '+target+' thất bại') | gán S.mode bằng MODE.OFF | gán S.reason bằng 'Không khởi động được '+target
      stopOwners('Start '+target+' thất bại');S.mode=MODE.OFF;S.reason='Không khởi động được '+target;
// [VI dòng gốc 262] gọi console.warn(TAG, S.lastError) | Kết thúc hàm hiện tại và trả về: gọi status(true) để trả trạng thái để kiểm tra.
      console.warn(TAG,S.lastError);return status(true);
// [VI dòng gốc 263] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 264] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 265] Chú thích gốc của tác giả; không được thực thi. Nội dung: Đăng ký SCAN tự chạy khi đủ điều kiện Thiên Quan; kiểm tra map ngay sau khi đăng ký.
  // Đăng ký SCAN tự chạy khi đủ điều kiện Thiên Quan; kiểm tra map ngay sau khi đăng ký.
// [VI dòng gốc 266] Định nghĩa hàm armTianQuan; tham số: không có. Mục đích: đăng ký bộ theo dõi map để tự bật bộ combat khi vào phó bản phù hợp | gán lastTianQuanKey bằng null | gọi watchMap(MODE.BOSS_TH300_SCAN) | gọi syncMap()
  function armTianQuan(){lastTianQuanKey=null;watchMap(MODE.BOSS_TH300_SCAN);syncMap();return status(false);}
// [VI dòng gốc 267] Khai báo biến không gán lại bằng const: api = gọi Object.freeze({version:'1.0.0',start,stop,status,syncMap,armTianQuan, modes:MODE,history:()=>S.history.slice()}) để khóa thay đổi trực tiếp các thuộc tính của đối tượng ở mức ngoài cùng
  const api=Object.freeze({version:'1.0.0',start,stop,status,syncMap,armTianQuan,
// [VI dòng gốc 268] Thuộc tính modes: MODE | Thuộc tính history: tạo hàm với tham số (không có); mỗi lần gọi trả về gọi S.history.slice() để lấy một đoạn dữ liệu
    modes:MODE,history:()=>S.history.slice()});
// [VI dòng gốc 269] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | gọi W.KVPV_MODE?.stop('Reload integrated FULL') để dừng bộ điều khiển và dọn tài nguyên (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Nhận lỗi bằng _ và chạy phần xử lý lỗi. | gọi window.KVPV_V1?.diagnostics?.record(_) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  try{W.KVPV_MODE?.stop?.('Reload integrated FULL');}catch(_){window.KVPV_V1?.diagnostics?.record(_);}
// [VI dòng gốc 270] gán W.KVPV_MODE bằng api
  W.KVPV_MODE=api;
// [VI dòng gốc 271] Chú thích gốc của tác giả; không được thực thi. Nội dung: The base FULL used to auto-start Boss. V12.9.4 requires explicit selection.
  // The base FULL used to auto-start Boss. V12.9.4 requires explicit selection.
// [VI dòng gốc 272] gọi stopOwners('Khởi tạo: chờ chọn mode')
  stopOwners('Khởi tạo: chờ chọn mode');
// [VI dòng gốc 273] gọi console.info(TAG, 'READY/OFF. Chạy KVPV_MODE.start("BOSS") | .start("BOSS_TH") | .start("BOSS_TH300_SCAN") | .start("BOSS_TH300") | .…)
  console.info(TAG,'READY/OFF. Chạy KVPV_MODE.start("BOSS") | .start("BOSS_TH") | .start("BOSS_TH300_SCAN") | .start("BOSS_TH300") | .stop()');
// [VI dòng gốc 274] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: })();
})();
// [VI dòng gốc 275] Dòng trống để tách các phần, không có lệnh thực thi.
