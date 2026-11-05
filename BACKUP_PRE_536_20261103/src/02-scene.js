// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: CHÚ THÍCH V1 — Phân quyền hoạt động trên map.
/* CHÚ THÍCH V1 — Phân quyền hoạt động trên map.
 * Daily, Thiên Quan và combat dùng quyền giữ có thời hạn. Kiểm tra xung đột trước khi nhận việc; không đẩy hoạt động đang chạy ra khỏi map.
 * Sửa nguồn tại đây rồi chạy node build.cjs; FULL và bản vá được sinh tự động. */
// [VI dòng gốc 4] Chú thích gốc của tác giả; không được thực thi. Nội dung: V10.1: scene arbitration / independent core API. No game RPC or timers. [đóng chú thích]
/* V10.1: scene arbitration / independent core API. No game RPC or timers. */
// [VI dòng gốc 5] chạy ngay hàm bao để tạo phạm vi và khởi tạo phần chức năng bên trong
(() => {
// [VI dòng gốc 6] "use strict"
  'use strict';
// [VI dòng gốc 7] Khai báo biến không gán lại bằng const: W = window; NS = W.KVPV hoặc dùng vế phải khi vế trái falsy: W.KVPV={}
  const W=window, NS=W.KVPV||(W.KVPV={});
// [VI dòng gốc 8] Khai báo biến không gán lại bằng const: initialActor = gọi String(W.__KVPV_OWN_ACTOR_ID||'') để chuyển sang chuỗi
  const initialActor=String(W.__KVPV_OWN_ACTOR_ID||'');
// [VI dòng gốc 9] Khai báo biến không gán lại bằng const: opts = tạo đối tượng gồm enabled, leaseMs, maxHistory
  const opts={enabled:true, leaseMs:4000, maxHistory:60};
// [VI dòng gốc 10] Khai báo biến không gán lại bằng const: state = tạo đối tượng gồm lease, denied, grants, history
  const state={lease:null, denied:0, grants:0, history:[]};
// [VI dòng gốc 11] Khai báo biến không gán lại bằng const: now = tạo hàm với tham số (không có); mỗi lần gọi trả về gọi Date.now()
  const now=()=>Date.now();
// [VI dòng gốc 12] Chú thích gốc của tác giả; không được thực thi. Nội dung: Kiểm tra nhân vật hiện tại vẫn thuộc phiên đã cài đặt.
  // Kiểm tra nhân vật hiện tại vẫn thuộc phiên đã cài đặt.
// [VI dòng gốc 13] Định nghĩa hàm actorValid; tham số: không có
  function actorValid(){
// [VI dòng gốc 14] Kiểm tra W.__KVPV_UNIVERSAL_HALTED: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: false.
    if(W.__KVPV_UNIVERSAL_HALTED)return false;
// [VI dòng gốc 15] Kiểm tra !initialActor: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: true.
    if(!initialActor)return true; // permits offline isolated tests
// [VI dòng gốc 16] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | Kết thúc hàm hiện tại và trả về: tính biểu thức String(_Ba?._rJ?._O$?.ins?.actorId??'')===initialActor.
    try{return String(_Ba?._rJ?._O$?.ins?.actorId??'')===initialActor;}
// [VI dòng gốc 17] Nhận lỗi bằng _ và chạy phần xử lý lỗi. | Kết thúc hàm hiện tại và trả về: false.
    catch(_){return false;}
// [VI dòng gốc 18] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 19] Chú thích gốc của tác giả; không được thực thi. Nội dung: Đọc tác vụ Daily đang chiếm quyền làm việc, bỏ qua trạng thái rảnh.
  // Đọc tác vụ Daily đang chiếm quyền làm việc, bỏ qua trạng thái rảnh.
// [VI dòng gốc 20] Định nghĩa hàm dailyJob; tham số: không có
  function dailyJob(){
// [VI dòng gốc 21] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | Khai báo biến không gán lại bằng const: q = gọi W.KVPV_DAILY?.quickState() (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Kết thúc hàm hiện tại và trả về: nếu q?.job&&q.job!=='rảnh'&&q.job!=='ranh' thì lấy String(q.job), ngược lại lấy null.
    try{const q=W.KVPV_DAILY?.quickState?.();return q?.job&&q.job!=='rảnh'&&q.job!=='ranh'?String(q.job):null;}
// [VI dòng gốc 22] Nhận lỗi bằng _ và chạy phần xử lý lỗi. | Kết thúc hàm hiện tại và trả về: null.
    catch(_){return null;}
// [VI dòng gốc 23] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 24] Chú thích gốc của tác giả; không được thực thi. Nội dung: Kiểm tra bộ rút lui Boss có đang hoạt động để tránh nhận việc xung đột.
  // Kiểm tra bộ rút lui Boss có đang hoạt động để tránh nhận việc xung đột.
// [VI dòng gốc 25] Định nghĩa hàm hitrunRunning; tham số: không có
  function hitrunRunning(){
// [VI dòng gốc 26] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | Kết thúc hàm hiện tại và trả về: tính biểu thức W.KVPV_HITRUN1?.status?.(false)?.running===true.
    try{return W.KVPV_HITRUN1?.status?.(false)?.running===true;}
// [VI dòng gốc 27] Nhận lỗi bằng _ và chạy phần xử lý lỗi. | Kết thúc hàm hiện tại và trả về: false.
    catch(_){return false;}
// [VI dòng gốc 28] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 29] Chú thích gốc của tác giả; không được thực thi. Nội dung: Đọc trạng thái Tự Vượt và map theo model native; nhận diện Thiên Quan chi tiết nằm ở module phạm vi.
  // Đọc trạng thái Tự Vượt và map theo model native; nhận diện Thiên Quan chi tiết nằm ở module phạm vi.
// [VI dòng gốc 30] Định nghĩa hàm stageState; tham số: không có
  function stageState(){
// [VI dòng gốc 31] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài.
    try{
// [VI dòng gốc 32] Khai báo biến không gán lại bằng const: m = đọc _Ba?._Co?._Mo?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
      const m=_Ba?._Co?._Mo?.ins;
// [VI dòng gốc 33] Khai báo biến không gán lại bằng const: stageAuto = tính biểu thức m?.auto===true
      const stageAuto=m?.auto===true;
// [VI dòng gốc 34] Khai báo biến không gán lại bằng const: current = gọi Number(_Ba?._$a?._yo?.ins?.intoSce?.[0]) để chuyển sang số
      const current=Number(_Ba?._$a?._yo?.ins?.intoSce?.[0]);
// [VI dòng gốc 35] Khai báo biến không gán lại bằng const: stageMap = gọi Number(_ft?._h$?.ins?.getCfgByLv?.(m?.curLv)?.[0]) để chuyển sang số
      const stageMap=Number(_ft?._h$?.ins?.getCfgByLv?.(m?.curLv)?.[0]);
// [VI dòng gốc 36] Khai báo biến không gán lại bằng const: common = tính biểu thức _Ba?._$a?.SceneUtil?.isCommonScene===true
      const common=_Ba?._$a?.SceneUtil?.isCommonScene===true;
// [VI dòng gốc 37] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm auto, inside.
      return {auto:stageAuto,inside:!common&&Number.isFinite(stageMap)&&stageMap>0&&current===stageMap};
// [VI dòng gốc 38] Nhận lỗi bằng _ và chạy phần xử lý lỗi. | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm auto, inside.
    }catch(_){return {auto:false,inside:false};}
// [VI dòng gốc 39] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 40] Chú thích gốc của tác giả; không được thực thi. Nội dung: Đọc quyền giữ map; quyền quá hạn được xóa trước khi trả kết quả.
  // Đọc quyền giữ map; quyền quá hạn được xóa trước khi trả kết quả.
// [VI dòng gốc 41] Định nghĩa hàm lease; tham số: không có | Kiểm tra state.lease&&state.lease.until<=now(): đúng thì chạy nhánh sau if. | gán state.lease bằng null | Kết thúc hàm hiện tại và trả về: đọc state.lease.
  function lease(){if(state.lease&&state.lease.until<=now())state.lease=null;return state.lease;}
// [VI dòng gốc 42] Định nghĩa hàm yieldStageForCombat; tham số: không có
  function yieldStageForCombat(){
// [VI dòng gốc 43] Khai báo biến không gán lại bằng const: l = gọi lease(); scope = gọi W.KVPV_FAR_SCOPE?.status() để trả trạng thái để kiểm tra (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const l=lease(),scope=W.KVPV_FAR_SCOPE?.status?.();
// [VI dòng gốc 44] Kiểm tra l?.who==='stage'&&l.tag==='tu-vuot'&&actorValid()&&!dailyJob()&&scope?.kind==='THIEN_QUAN'&&scope.inside===true&&W.KVPV_MODE?.status?.(false)?.pendingTianQuanMode: đúng thì chạy nhánh sau if.
    if(l?.who==='stage'&&l.tag==='tu-vuot'&&actorValid()&&!dailyJob()&&scope?.kind==='THIEN_QUAN'&&scope.inside===true&&W.KVPV_MODE?.status?.(false)?.pendingTianQuanMode){
// [VI dòng gốc 45] gán state.lease bằng null | gọi log('handoff', 'stage', 'verified Tian Quan combat') | Kết thúc hàm hiện tại và trả về: true.
      state.lease=null;log('handoff','stage','verified Tian Quan combat');return true;
// [VI dòng gốc 46] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 47] Kết thúc hàm hiện tại và trả về: false.
    return false;
// [VI dòng gốc 48] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 49] Chú thích gốc của tác giả; không được thực thi. Nội dung: Ghi thông tin chẩn đoán trong phạm vi module, giúp đối chiếu trạng thái và thời điểm.
  // Ghi thông tin chẩn đoán trong phạm vi module, giúp đối chiếu trạng thái và thời điểm.
// [VI dòng gốc 50] Định nghĩa hàm log; tham số: event, who, why
  function log(event,who,why){
// [VI dòng gốc 51] gọi state.history.push({time:now(),event,who,why}) để thêm phần tử vào cuối mảng
    state.history.push({time:now(),event,who,why});
// [VI dòng gốc 52] Kiểm tra state.history.length>opts.maxHistory: đúng thì chạy nhánh sau if. | gọi state.history.shift()
    if(state.history.length>opts.maxHistory)state.history.shift();
// [VI dòng gốc 53] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 54] Chú thích gốc của tác giả; không được thực thi. Nội dung: Xét xung đột Daily, combat, Tự Vượt và lịch sắp mở trước khi cấp quyền.
  // Xét xung đột Daily, combat, Tự Vượt và lịch sắp mở trước khi cấp quyền.
// [VI dòng gốc 55] Định nghĩa hàm conflict; tham số: who, tag=''
  // Only a real, open Eight Floor window may outrank the overlapping
  // Tranh Ba Dinh Cao timetable reservation. Do NOT bypass actual scene
  // owners, an active Daily job, native stage combat, or server entry gates.
  function eightEntryReady(who,tag){
    if(who!=='combat'||tag!=='thien-the-8-tang')return false;
    try{
      const d=W.KVPV_EIGHT_FLOOR?.status?.();
      return d?.enabled===true&&d?.scheduled===true&&d?.open===true&&
        d?.unlocked===true&&d?.cooldownReady===true&&
        d?.inside===false&&d?.doneToday!==true&&
        W._Ba?._$a?.SceneUtil?.isCommonScene===true&&
        W.KVPV_DAILY_TRIAL?.status?.()?.inFlight!==true;
    }catch(_){return false;}
  }
  function conflict(who,tag=''){
// [VI dòng gốc 56] Kiểm tra !actorValid(): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: "actor/session unavailable".
    if(!actorValid())return 'actor/session unavailable';
// [VI dòng gốc 57] Kiểm tra !opts.enabled: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: "core stopped".
    if(!opts.enabled)return 'core stopped';
// [VI dòng gốc 58] Kiểm tra who==='combat': đúng thì chạy nhánh sau if. | gọi yieldStageForCombat()
    if(who==='combat')yieldStageForCombat();
// [VI dòng gốc 59] Khai báo biến không gán lại bằng const: j = gọi dailyJob(); s = gọi stageState(); l = gọi lease()
    const j=dailyJob(),s=stageState(),l=lease(),eight=eightEntryReady(who,tag);
// [VI dòng gốc 60] Chú thích gốc của tác giả; không được thực thi. Nội dung: Thí Luyện Ngày được ưu tiên nhận việc trước Daily/Tự Vượt/sự kiện mới.
    // Thí Luyện Ngày được ưu tiên nhận việc trước Daily/Tự Vượt/sự kiện mới.
// [VI dòng gốc 61] Chú thích gốc của tác giả; không được thực thi. Nội dung: Không tranh quyền với job, HitRun hoặc một trận đã ở trong map.
    // Không tranh quyền với job, HitRun hoặc một trận đã ở trong map.
// [VI dòng gốc 62] Kiểm tra tag!=='daily-trial'&&!j&&!hitrunRunning()&&!s.inside&& (!l||l.who!=='combat'||l.tag==='daily-trial')&&W.KVPV_DAILY_TRIAL?.hasPriority?.()===true: đúng thì chạy nhánh sau if.
    if(tag!=='daily-trial'&&!j&&!hitrunRunning()&&!s.inside&&
// [VI dòng gốc 63] gọi W.KVPV_DAILY_TRIAL?.hasPriority()
       (!l||l.who!=='combat'||l.tag==='daily-trial')&&W.KVPV_DAILY_TRIAL?.hasPriority?.()===true)
// [VI dòng gốc 64] Kết thúc hàm hiện tại và trả về: "priority: daily trial".
      return 'priority: daily trial';
// [VI dòng gốc 65] Chú thích gốc của tác giả; không được thực thi. Nội dung: V10.2: a reservation prevents NEW scene work only; never kicks an active fight.
    // V10.2: a reservation prevents NEW scene work only; never kicks an active fight.
// [VI dòng gốc 66] Kiểm tra tag!=='daily-trial'&&(who==='combat'||who==='stage') && !hitrunRunning() && !j && !s.inside && !['LINH_LUNG','PHU_VAN','TRU_TIEN'].includes(W.KVPV_FAR_SCOPE?.status?.().kind): đúng thì chạy nhánh sau if.
    if(tag!=='daily-trial'&&(who==='combat'||who==='stage') && !hitrunRunning() && !j && !s.inside && !['LINH_LUNG','PHU_VAN','TRU_TIEN'].includes(W.KVPV_FAR_SCOPE?.status?.().kind)){
// [VI dòng gốc 67] Khai báo biến không gán lại bằng const: hold = gọi W.KVPV?.timeline?.reservation({ atMs:now(),flags:W.KVPV_DAILY?.config||null,forTask:who }) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
      const hold=W.KVPV?.timeline?.reservation?.({
// [VI dòng gốc 68] Thuộc tính atMs: gọi now() | Thuộc tính flags: W.KVPV_DAILY?.config hoặc dùng vế phải khi vế trái falsy: null | Thuộc tính forTask: who
        atMs:now(),flags:W.KVPV_DAILY?.config||null,forTask:who
// [VI dòng gốc 69] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
      });
// [VI dòng gốc 70] Kiểm tra hold: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: tính biểu thức 'upcoming event '+hold.key+' ('+hold.time+')'.
      if(hold&&!(eight&&hold.key==='tranh_ba_dinh_cao'))return 'upcoming event '+hold.key+' ('+hold.time+')';
// [VI dòng gốc 71] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 72] Kiểm tra who==='combat': đúng thì chạy nhánh sau if, sai thì chạy nhánh else.
    if(who==='combat'){
// [VI dòng gốc 73] Kiểm tra j: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: tính biểu thức 'daily job '+j.
      if(j)return 'daily job '+j;
// [VI dòng gốc 74] Khai báo biến không gán lại bằng const: controlledStage = (W.KVPV_FAR_SCOPE??W.KVPV_TQ_SCOPE)?.inside?.()===true và chỉ đánh giá vế phải khi vế trái truthy: !!W.KVPV_MODE?.status?.(false)?.pendingTianQuanMode
      const controlledStage=(W.KVPV_FAR_SCOPE??W.KVPV_TQ_SCOPE)?.inside?.()===true&&!!W.KVPV_MODE?.status?.(false)?.pendingTianQuanMode;
// [VI dòng gốc 75] Kiểm tra (s.auto||s.inside)&&!controlledStage: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: "native Tu Vuot".
      if((s.auto||s.inside)&&!controlledStage)return 'native Tu Vuot';
// [VI dòng gốc 76] Kiểm tra l&&l.who!==who: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: tính biểu thức 'reserved by '+l.who.
      if(l&&l.who!==who)return 'reserved by '+l.who;
// [VI dòng gốc 77] Kiểm tra who==='stage': đúng thì chạy nhánh sau if, sai thì chạy nhánh else.
    }else if(who==='stage'){
// [VI dòng gốc 78] Kiểm tra j: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: tính biểu thức 'daily job '+j.
      if(j)return 'daily job '+j;
// [VI dòng gốc 79] Kiểm tra hitrunRunning(): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: "HitRun active".
      if(hitrunRunning())return 'HitRun active';
// [VI dòng gốc 80] Kiểm tra l&&l.who!==who: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: tính biểu thức 'reserved by '+l.who.
      if(l&&l.who!==who)return 'reserved by '+l.who;
// [VI dòng gốc 81] Kiểm tra who==='daily': đúng thì chạy nhánh sau if, sai thì chạy nhánh else.
    }else if(who==='daily'){
// [VI dòng gốc 82] Kiểm tra hitrunRunning(): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: "HitRun active".
      if(hitrunRunning())return 'HitRun active';
// [VI dòng gốc 83] Kiểm tra s.inside: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: "Tu Vuot scene".
      if(s.inside)return 'Tu Vuot scene';
// [VI dòng gốc 84] Kiểm tra l&&l.who==='combat': đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: "reserved by combat".
      if(l&&l.who==='combat')return 'reserved by combat';
// [VI dòng gốc 85] Kết thúc hàm hiện tại và trả về: "invalid owner".
    }else return 'invalid owner';
// [VI dòng gốc 86] Kết thúc hàm hiện tại và trả về: null.
    return null;
// [VI dòng gốc 87] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 88] Khai báo biến không gán lại bằng const: scene = gọi Object.freeze({ can:(who)=>conflict(who)===null, reason:(who)=>conflict(who), acquire(who,tag=''){ if(W.KVPV_CONFIRM_POPUPS?.beforeTas…) để khóa thay đổi trực tiếp các thuộc tính của đối tượng ở mức ngoài cùng
  const scene=Object.freeze({
// [VI dòng gốc 89] Thuộc tính can: tạo hàm với tham số who; mỗi lần gọi trả về tính biểu thức conflict(who)===null
    can:(who)=>conflict(who)===null,
// [VI dòng gốc 90] Thuộc tính reason: tạo hàm với tham số who; mỗi lần gọi trả về gọi conflict(who)
    reason:(who,tag='')=>conflict(who,tag),
// [VI dòng gốc 91] Thuộc tính acquire: tạo hàm với tham số who, tag=''
    acquire(who,tag=''){
// [VI dòng gốc 92] Kiểm tra W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true: đúng thì chạy nhánh sau if. | tăng state.denied một đơn vị sau khi lấy giá trị | gọi log('denied', who, 'priority: agree popup') | Kết thúc hàm hiện tại và trả về: false.
      if(W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true){state.denied++;log('denied',who,'priority: agree popup');return false;}
// [VI dòng gốc 93] Khai báo biến không gán lại bằng const: reason = gọi conflict(who, tag)
      const reason=conflict(who,tag);
// [VI dòng gốc 94] Kiểm tra reason: đúng thì chạy nhánh sau if. | tăng state.denied một đơn vị sau khi lấy giá trị | gọi log('denied', who, reason) | Kết thúc hàm hiện tại và trả về: false.
      if(reason){state.denied++;log('denied',who,reason);return false;}
// [VI dòng gốc 95] gán state.lease bằng {who,tag:String(tag),until:now()+opts.leaseMs} | tăng state.grants một đơn vị sau khi lấy giá trị
      state.lease={who,tag:String(tag),until:now()+opts.leaseMs};state.grants++;
// [VI dòng gốc 96] Kết thúc hàm hiện tại và trả về: true.
      return true;
// [VI dòng gốc 97] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    },
// [VI dòng gốc 98] Kiểm tra who==='stage'&&yieldStageForCombat(): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: false. | Khai báo biến không gán lại bằng const: l = gọi lease() | Kiểm tra !l||l.who!==who: đúng thì chạy nhánh sau if.
    renew(who){if(who==='stage'&&yieldStageForCombat())return false;const l=lease();if(!l||l.who!==who)return false;l.until=now()+opts.leaseMs;return true;},
// [VI dòng gốc 99] Khai báo biến không gán lại bằng const: l = gọi lease() | Kiểm tra l?.who===who: đúng thì chạy nhánh sau if. | gán state.lease bằng null | Kết thúc hàm hiện tại và trả về: true.
    release(who){const l=lease();if(l?.who===who){state.lease=null;return true;}return false;},
// [VI dòng gốc 100] Khai báo biến không gán lại bằng const: l = gọi lease(); stage = gọi stageState() | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm owner, tag, ttlMs, dailyJob, combatRunning, stage, denied, grants, canCombat, canDaily, canStage.
    status(){const l=lease(),stage=stageState();return {
// [VI dòng gốc 101] Thuộc tính owner: l?.who hoặc dùng vế phải khi vế trái falsy: null | Thuộc tính tag: l?.tag hoặc dùng vế phải khi vế trái falsy: null | Thuộc tính ttlMs: nếu l thì lấy Math.max(0,l.until-now()), ngược lại lấy 0
      owner:l?.who||null,tag:l?.tag||null,ttlMs:l?Math.max(0,l.until-now()):0,
// [VI dòng gốc 102] Thuộc tính dailyJob: gọi dailyJob() | Thuộc tính combatRunning: gọi hitrunRunning() | Thuộc tính stage: dùng biến cùng tên
      dailyJob:dailyJob(),combatRunning:hitrunRunning(),stage,
// [VI dòng gốc 103] Thuộc tính denied: đọc state.denied | Thuộc tính grants: đọc state.grants
      denied:state.denied,grants:state.grants,
// [VI dòng gốc 104] Thuộc tính canCombat: đảo giá trị đúng/sai của conflict('combat') | Thuộc tính canDaily: đảo giá trị đúng/sai của conflict('daily') | Thuộc tính canStage: đảo giá trị đúng/sai của conflict('stage')
      canCombat:!conflict('combat'),canDaily:!conflict('daily'),canStage:!conflict('stage')};},
// [VI dòng gốc 105] Thuộc tính history: tạo hàm với tham số (không có); mỗi lần gọi trả về gọi state.history.slice() để lấy một đoạn dữ liệu
    history:()=>state.history.slice()
// [VI dòng gốc 106] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  });
// [VI dòng gốc 107] gán NS.core bằng Object.freeze({version:'10.1.0',config:opts,scene, start(){opts.enabled=true;return this.status();}, stop(){opts.enabled=false;state.lease=null;return this.status();}, status(){ret…
  NS.core=Object.freeze({version:'10.1.0',config:opts,scene,
// [VI dòng gốc 108] gán opts.enabled bằng true | Kết thúc hàm hiện tại và trả về: gọi this.status() để trả trạng thái để kiểm tra.
    start(){opts.enabled=true;return this.status();},
// [VI dòng gốc 109] gán opts.enabled bằng false | gán state.lease bằng null | Kết thúc hàm hiện tại và trả về: gọi this.status() để trả trạng thái để kiểm tra.
    stop(){opts.enabled=false;state.lease=null;return this.status();},
// [VI dòng gốc 110] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm version, enabled, scene.
    status(){return {version:'10.1.0',enabled:opts.enabled,scene:scene.status()};}
// [VI dòng gốc 111] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  });
// [VI dòng gốc 112] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: })();
})();
// [VI dòng gốc 113] Dòng trống để tách các phần, không có lệnh thực thi.
