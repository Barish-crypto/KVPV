// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: CHÚ THÍCH V1 — Tự động Thí Luyện Ngày.
/* CHÚ THÍCH V1 — Tự động Thí Luyện Ngày.
 * Dùng lượt khiêu chiến; càn quét KNB tắt; Cổ Vũ KNB chỉ được phép ở map 2051/2061.
 * Mỗi yêu cầu cần ACK qua map/số lượt server; không coi gửi RPC là hoàn thành.
 * Chỉ nhận việc khi rảnh, không kéo nhân vật khỏi Boss/hoạt động khác.
 */
// [VI dòng gốc 6] chạy ngay hàm bao để tạo phạm vi và khởi tạo phần chức năng bên trong
(() => {
// [VI dòng gốc 7] "use strict"
  'use strict';
// [VI dòng gốc 8] Khai báo biến không gán lại bằng const: W = window; old = đọc W.KVPV_DAILY_TRIAL
  const W=window,old=W.KVPV_DAILY_TRIAL;
// [VI dòng gốc 9] Chú thích gốc của tác giả; không được thực thi. Nội dung: Chuyển nguyên yêu cầu đang chờ sang bản mới; không phát lại RPC khi nạp FULL.
  // Chuyển nguyên yêu cầu đang chờ sang bản mới; không phát lại RPC khi nạp FULL.
// [VI dòng gốc 10] Khai báo biến không gán lại bằng const: previous = gọi old?.status() để trả trạng thái để kiểm tra (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  const previous=old?.status?.();
// [VI dòng gốc 11] Khai báo biến không gán lại bằng const: handoff = gọi old?._handoff(); chức năng nội bộ chưa xác minh từ tên hàm (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  const handoff=old?._handoff?.();
// [VI dòng gốc 12] gọi old?.stop() để dừng bộ điều khiển và dọn tài nguyên (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  old?.stop?.();
// [VI dòng gốc 13] Khai báo biến không gán lại bằng const: actor = gọi String(W.__KVPV_OWN_ACTOR_ID||'') để chuyển sang chuỗi
  const actor=String(W.__KVPV_OWN_ACTOR_ID||'');
// [VI dòng gốc 14] Khai báo biến không gán lại bằng const: roster = tạo mảng gồm 10 vị trí: [[2051,22],[2061,23],[2721,679],[2071,25],[2081,24], [2301,219],[2331,222],[2321,221],[2311,220],[2341,223]]
  const roster=[[2051,22],[2061,23],[2721,679],[2071,25],[2081,24],
// [VI dòng gốc 15] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng [. Đọc cùng dòng mở phía trên: [2301,219],[2331,222],[2321,221],[2311,220],[2341,223]];
    [2301,219],[2331,222],[2321,221],[2311,220],[2341,223]];
// [VI dòng gốc 16] Khai báo biến không gán lại bằng const: C = tạo đối tượng gồm enabled, paidSweep, pollMs, refreshMs, entryTimeoutMs, sweepTimeoutMs
  const C={enabled:true,paidSweep:W.KVPV_SPENDING_POLICY?.allowKNB===true,pollMs:1000,refreshMs:30000,entryTimeoutMs:25000,sweepTimeoutMs:15000};
// [VI dòng gốc 17] Khai báo biến không gán lại bằng const: S = tạo đối tượng gồm timer, pending, phase, reason, day, sent, history, nextAt, lastRefresh, lastTarget, stageAuto, lease, entries, returns, sweepRequests, sweepConfirmed, confirmedSweepCost, lastError
  const S={timer:null,pending:previous?.actorId===actor&&previous?.pending?{...previous.pending}:null,phase:previous?.phase??'WAITING',reason:'starting',day:handoff?.day??'',sent:new Set(handoff?.sent??[]),history:[],
// [VI dòng gốc 18] Thuộc tính nextAt: 0 | Thuộc tính lastRefresh: áp dụng toán tử - lên Infinity | Thuộc tính lastTarget: áp dụng toán tử - lên Infinity | Thuộc tính stageAuto: null
    nextAt:0,lastRefresh:-Infinity,lastTarget:-Infinity,stageAuto:null,lease:false,
// [VI dòng gốc 19] Thuộc tính entries: handoff?.entries hoặc dùng vế phải khi vế trái là null/undefined: 0 | Thuộc tính returns: handoff?.returns hoặc dùng vế phải khi vế trái là null/undefined: 0 | Thuộc tính sweepRequests: handoff?.sweepRequests hoặc dùng vế phải khi vế trái là null/undefined: 0 | Thuộc tính sweepConfirmed: handoff?.sweepConfirmed hoặc dùng vế phải khi vế trái là null/undefined: 0
    entries:handoff?.entries??0,returns:handoff?.returns??0,sweepRequests:handoff?.sweepRequests??0,sweepConfirmed:handoff?.sweepConfirmed??0,confirmedSweepCost:handoff?.confirmedSweepCost??0,lastError:''};
// [VI dòng gốc 20] Khai báo biến không gán lại bằng const: user = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._Ba?._rJ?._O$?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  const user=()=>W._Ba?._rJ?._O$?.ins;
// [VI dòng gốc 21] Khai báo biến không gán lại bằng const: model = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._Ba?._sst?._ist?.inst nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  const model=()=>W._Ba?._sst?._ist?.inst;
// [VI dòng gốc 22] Khai báo biến không gán lại bằng const: rpc = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._Ba?._sst?._Cht?.inst nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  const rpc=()=>W._Ba?._sst?._Cht?.inst;
// [VI dòng gốc 23] Khai báo biến không gán lại bằng const: arbiter = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W.KVPV?.core?.scene nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  const arbiter=()=>W.KVPV?.core?.scene;
// [VI dòng gốc 24] Khai báo biến không gán lại bằng const: owned = tạo hàm với tham số (không có); mỗi lần gọi trả về actor&&String(user()?.actorId??'')===actor và chỉ đánh giá vế phải khi vế trái truthy: !W.__KVPV_UNIVERSAL_HALTED
  const owned=()=>actor&&String(user()?.actorId??'')===actor&&!W.__KVPV_UNIVERSAL_HALTED;
// [VI dòng gốc 25] Khai báo biến không gán lại bằng const: currentMap = tạo hàm với tham số (không có); mỗi lần gọi trả về gọi Number(W._C?._Mn?._Cn?.currentID??W._Ba?._$a?._yo?.ins?.intoSce?.[0]) để chuyển sang số
  const currentMap=()=>Number(W._C?._Mn?._Cn?.currentID??W._Ba?._$a?._yo?.ins?.intoSce?.[0]);
// [VI dòng gốc 26] Khai báo biến không gán lại bằng const: common = tạo hàm với tham số (không có); mỗi lần gọi trả về W._Ba?._$a?.SceneUtil?.isCommonScene===true và chỉ đánh giá vế phải khi vế trái truthy: W._Ba?._$a?._yo?.ins?.isInMission!==true
  const common=()=>W._Ba?._$a?.SceneUtil?.isCommonScene===true&&W._Ba?._$a?._yo?.ins?.isInMission!==true;
// [VI dòng gốc 27] Khai báo biến không gán lại bằng const: day = tạo hàm với tham số (không có); mỗi lần gọi trả về W.KVPV_DAILY_CLOCK?.key?.() hoặc dùng vế phải khi vế trái là null/undefined: new Date(Date.now()+2*3600000).toISOString().slice(0,10)
  const day=()=>W.KVPV_DAILY_CLOCK?.key?.()??new Date(Date.now()+2*3600000).toISOString().slice(0,10);
// [VI dòng gốc 28] Định nghĩa hàm note; tham số: event, detail | gọi S.history.push({at:Date.now(),event,detail}) để thêm phần tử vào cuối mảng | Kiểm tra S.history.length>80: đúng thì chạy nhánh sau if. | gọi S.history.shift()
  function note(event,detail){S.history.push({at:Date.now(),event,detail});if(S.history.length>80)S.history.shift();}
// [VI dòng gốc 29] Định nghĩa hàm row; tham số: id | Kết thúc hàm hiện tại và trả về: đọc model()?.timesTab?.[id] nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại).
  function row(id){return model()?.timesTab?.[id];}
// [VI dòng gốc 30] Định nghĩa hàm taskAllows; tham số: id
  function taskAllows(id){
// [VI dòng gốc 31] Khai báo biến không gán lại bằng const: task = đọc W._Ba?._zIt?._FIt?.ins?.taskInfo?.[0] nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); lock = đọc W._ft?.DungTaskLock?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const task=W._Ba?._zIt?._FIt?.ins?.taskInfo?.[0],lock=W._ft?.DungTaskLock?.ins;
// [VI dòng gốc 32] Kết thúc hàm hiện tại và trả về: !lock?.isLockTask?.(task) hoặc dùng vế phải khi vế trái falsy: Number(lock.getCfgByTaskId?.(task)?.[1])===id.
    return !lock?.isLockTask?.(task)||Number(lock.getCfgByTaskId?.(task)?.[1])===id;
// [VI dòng gốc 33] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 34] Định nghĩa hàm candidates; tham số: không có | Kết thúc hàm hiện tại và trả về: gọi roster.map(([id,feature])=>{ const r=row(id),open=W._Ba?._Do?._Ho?.inst; return {id,feature,level:Number(r?.[1]),remaining:Number(r…) để biến đổi từng phần tử.
  function candidates(){return roster.map(([id,feature])=>{
// [VI dòng gốc 35] Khai báo biến không gán lại bằng const: r = gọi row(id); open = đọc W._Ba?._Do?._Ho?.inst nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const r=row(id),open=W._Ba?._Do?._Ho?.inst;
// [VI dòng gốc 36] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm id, feature, level, remaining, sweeps, spentSweeps, known, unlocked, taskAllowed.
    return {id,feature,level:Number(r?.[1]),remaining:Number(r?.[6]),sweeps:Number(r?.[8]),
// [VI dòng gốc 37] Thuộc tính spentSweeps: gọi Number(r?.[10]) để chuyển sang số | Thuộc tính known: gọi Array.isArray(r)
      spentSweeps:Number(r?.[10]),known:Array.isArray(r),
// [VI dòng gốc 38] Thuộc tính unlocked: open?.getFcNdShow?.(feature)===true và chỉ đánh giá vế phải khi vế trái truthy: open?.getFcIsOpen?.(feature)!==false
      unlocked:open?.getFcNdShow?.(feature)===true&&open?.getFcIsOpen?.(feature)!==false,
// [VI dòng gốc 39] Thuộc tính taskAllowed: gọi taskAllows(id)
      taskAllowed:taskAllows(id)};
// [VI dòng gốc 40] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  });}
// [VI dòng gốc 41] Định nghĩa hàm key; tham số: d, kind | Kết thúc hàm hiện tại và trả về: tính biểu thức S.day+'/'+kind+'/'+d.id+'/'+d.level+'/'+d.remaining+'/'+d.sweeps+'/'+d.spentSweeps.
  function key(d,kind){return S.day+'/'+kind+'/'+d.id+'/'+d.level+'/'+d.remaining+'/'+d.sweeps+'/'+d.spentSweeps;}
// [VI dòng gốc 42] Định nghĩa hàm release; tham số: không có. Mục đích: nhả quyền điều khiển đang giữ
  function release(){
// [VI dòng gốc 43] Khai báo biến không gán lại bằng const: a = gọi arbiter() | Kiểm tra S.lease&&a?.status?.().tag==='daily-trial': đúng thì chạy nhánh sau if. | gọi a.release('combat') để nhả quyền điều khiển đang giữ (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gán S.lease bằng false
    const a=arbiter();if(S.lease&&a?.status?.().tag==='daily-trial')a.release?.('combat');S.lease=false;
// [VI dòng gốc 44] Khai báo biến không gán lại bằng const: stage = đọc W._Ba?._Co?._Mo?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const stage=W._Ba?._Co?._Mo?.ins;
// [VI dòng gốc 45] Kiểm tra owned()&&S.stageAuto===true&&stage?.auto===false: đúng thì chạy nhánh sau if. | gán stage.auto bằng true | gán S.stageAuto bằng null
    if(owned()&&S.stageAuto===true&&stage?.auto===false&&!W.KVPV_EVENT_PRIORITY?.hold?.())stage.auto=true;S.stageAuto=null;
// [VI dòng gốc 46] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 47] Định nghĩa hàm reserve; tham số: không có. Mục đích: xin giữ quyền điều khiển cảnh
  function reserve(){
// [VI dòng gốc 48] Khai báo biến không gán lại bằng const: a = gọi arbiter(); lease = gọi a?.status() để trả trạng thái để kiểm tra (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const a=arbiter(),lease=a?.status?.();
// [VI dòng gốc 49] Kiểm tra !a?.acquire: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: false.
    if(!a?.acquire)return false;
// [VI dòng gốc 50] Chú thích gốc của tác giả; không được thực thi. Nội dung: Tự Vượt mới đang chờ ở map thường: nhường hàng đợi cho Thí Luyện, không cắt trận.
    // Tự Vượt mới đang chờ ở map thường: nhường hàng đợi cho Thí Luyện, không cắt trận.
// [VI dòng gốc 51] Kiểm tra lease?.owner==='stage'&&common()&&!busy(): đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gọi a.release('stage') để nhả quyền điều khiển đang giữ (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    if(lease?.owner==='stage'&&common()&&!busy())a.release?.('stage');
// [VI dòng gốc 52] Kiểm tra lease?.owner&&lease.tag!=='daily-trial': đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: false.
    else if(lease?.owner&&lease.tag!=='daily-trial')return false;
// [VI dòng gốc 53] Khai báo biến không gán lại bằng const: stage = đọc W._Ba?._Co?._Mo?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const stage=W._Ba?._Co?._Mo?.ins;
// [VI dòng gốc 54] Kiểm tra S.stageAuto===null: đúng thì chạy nhánh sau if. | gán S.stageAuto bằng stage?.auto===true
    if(S.stageAuto===null)S.stageAuto=stage?.auto===true;
// [VI dòng gốc 55] Kiểm tra stage?.auto===true: đúng thì chạy nhánh sau if. | gán stage.auto bằng false
    if(stage?.auto===true)stage.auto=false;
// [VI dòng gốc 56] Kiểm tra a.acquire('combat','daily-trial')!==true: đúng thì chạy nhánh sau if. | gọi release() để nhả quyền điều khiển đang giữ | Kết thúc hàm hiện tại và trả về: false. | gán S.lease bằng true
    if(a.acquire('combat','daily-trial')!==true){release();return false;}S.lease=true;return true;
// [VI dòng gốc 57] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 58] Định nghĩa hàm renew; tham số: không có. Mục đích: gia hạn quyền đang giữ | Khai báo biến không gán lại bằng const: a = gọi arbiter() | Kiểm tra a?.status?.().tag==='daily-trial': đúng thì chạy nhánh sau if. | gọi a.renew('combat') để gia hạn quyền đang giữ (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  function renew(){const a=arbiter();if(a?.status?.().tag==='daily-trial')a.renew?.('combat');}
// [VI dòng gốc 59] Định nghĩa hàm busy; tham số: không có
  function busy(){
// [VI dòng gốc 60] Khai báo biến không gán lại bằng const: j = đọc W.KVPV_DAILY?.quickState?.()?.job nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const j=W.KVPV_DAILY?.quickState?.()?.job;
// [VI dòng gốc 61] Kiểm tra j&&!['rảnh','ranh'].includes(j): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: tính biểu thức 'daily_job:'+j.
    if(j&&!['rảnh','ranh'].includes(j))return 'daily_job:'+j;
// [VI dòng gốc 62] Kiểm tra W.KVPV_HITRUN1?.status?.(false)?.running: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: "boss_running".
    if(W.KVPV_HITRUN1?.status?.(false)?.running)return 'boss_running';
// [VI dòng gốc 63] Kiểm tra W.KVPV_FAR_SCOPE?.inside?.()===true: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: "far_map_running".
    if(W.KVPV_FAR_SCOPE?.inside?.()===true)return 'far_map_running';
// [VI dòng gốc 64] Kết thúc hàm hiện tại và trả về: null.
    return null;
// [VI dòng gốc 65] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 66] Định nghĩa hàm refresh; tham số: không có. Mục đích: làm mới dữ liệu theo điều kiện của hàm | Kiểm tra Date.now()-S.lastRefresh<C.refreshMs||typeof rpc()?.getCpTimes!=='function': đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  function refresh(){if(Date.now()-S.lastRefresh<C.refreshMs||typeof rpc()?.getCpTimes!=='function')return;
// [VI dòng gốc 67] gán S.lastRefresh bằng Date.now() | gọi rpc().getCpTimes()
    S.lastRefresh=Date.now();rpc().getCpTimes();}
// [VI dòng gốc 68] Định nghĩa hàm finish; tham số: reason | gọi note(reason, S.pending?.id) | gán S.pending bằng null | gán S.phase bằng 'WAITING'
  function finish(reason){note(reason,S.pending?.id);S.pending=null;S.phase='WAITING';S.reason=reason;S.nextAt=Date.now()+1500;}
// [VI dòng gốc 69] Chú thích gốc của tác giả; không được thực thi. Nội dung: Chỉ sự kiện kết thúc phát trong map của yêu cầu hiện tại mới cho phép thoát.
  // Chỉ sự kiện kết thúc phát trong map của yêu cầu hiện tại mới cho phép thoát.
// [VI dòng gốc 70] Định nghĩa hàm ended; tham số: không có | Khai báo biến không gán lại bằng const: p = đọc S.pending | Kiểm tra p?.kind==='challenge'&&p.entered&&currentMap()===p.id: đúng thì chạy nhánh sau if. | gán p.resultAt bằng Date.now()
  function ended(){const p=S.pending;if(p?.kind==='challenge'&&p.entered&&currentMap()===p.id){p.resultAt=Date.now();note('NATIVE-BATTLE-END',p.id);}}
// [VI dòng gốc 71] Định nghĩa hàm chooseTarget; tham số: không có | Kiểm tra Date.now()-S.lastTarget<3000: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  function chooseTarget(){if(Date.now()-S.lastTarget<3000)return;
// [VI dòng gốc 72] Khai báo biến không gán lại bằng const: me = gọi W._C?._Ba?.instance?.getRole(Number(actor)) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); combat = gọi me?.getComponent(W._d?._Yct?._Het) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const me=W._C?._Ba?.instance?.getRole?.(Number(actor)),combat=me?.getComponent?.(W._d?._Yct?._Het);
// [VI dòng gốc 73] Kiểm tra combat?.isValidTarget?.()===true: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(combat?.isValidTarget?.()===true)return;
// [VI dòng gốc 74] Kiểm tra typeof user()?.selectTar==='function': đúng thì chạy nhánh sau if. | gán S.lastTarget bằng Date.now() | gọi user().selectTar(1, -1)
    if(typeof user()?.selectTar==='function'){S.lastTarget=Date.now();user().selectTar(1,-1);}
// [VI dòng gốc 75] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 76] Chú thích gốc của tác giả; không được thực thi. Nội dung: Cổ vũ theo đúng cấu hình UI: 10304 (vàng), 10305 (KNB), insp=[type,count,bonus].
  // Cổ vũ theo đúng cấu hình UI: 10304 (vàng), 10305 (KNB), insp=[type,count,bonus].
// [VI dòng gốc 77] Chú thích gốc của tác giả; không được thực thi. Nội dung: Dùng vàng trước, rồi KNB; không gửi tiếp khi lần trước chưa có ACK số tầng/bonus.
  // Dùng vàng trước, rồi KNB; không gửi tiếp khi lần trước chưa có ACK số tầng/bonus.
// [VI dòng gốc 78] Định nghĩa hàm cheerData; tham số: không có
  function cheerData(){
// [VI dòng gốc 79] Khai báo biến không gán lại bằng const: rows = đọc model()?.insp nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); raw = tạo mảng gồm 2 vị trí: [W._ft?._gY?.ins?.getCfgById?.(10304)?.[2],W._ft?._gY?.ins?.getCfgById?.(10305)?.[2]]
    const rows=model()?.insp,raw=[W._ft?._gY?.ins?.getCfgById?.(10304)?.[2],W._ft?._gY?.ins?.getCfgById?.(10305)?.[2]];
// [VI dòng gốc 80] Kiểm tra !Array.isArray(rows)||raw.some(r=>!Array.isArray(r)||!Number.isFinite(Number(r[0]))||Number(r[0])<0||!Number.isSafeInteger(Number(r[2]))||Number(r[2])<0||Number(r[2])>100): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: null.
    if(!Array.isArray(rows)||raw.some(r=>!Array.isArray(r)||!Number.isFinite(Number(r[0]))||Number(r[0])<0||!Number.isSafeInteger(Number(r[2]))||Number(r[2])<0||Number(r[2])>100))return null;
// [VI dòng gốc 81] Kiểm tra raw.some(r=>!Number.isFinite(Number(r[1]))||Number(r[1])<=0): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: null.
    if(raw.some(r=>!Number.isFinite(Number(r[1]))||Number(r[1])<=0))return null;
// [VI dòng gốc 82] Khai báo biến không gán lại bằng const: total = gọi rows.reduce((sum,r)=>sum+(Number(r?.[2])||0), 0) để gộp các phần tử thành một kết quả; maximum = gọi Math.round(raw.reduce((n,r)=>n+100*Number(r[1])*Number(r[2]),0))
    const total=rows.reduce((sum,r)=>sum+(Number(r?.[2])||0),0),maximum=Math.round(raw.reduce((n,r)=>n+100*Number(r[1])*Number(r[2]),0));
// [VI dòng gốc 83] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm percent, maximum, types.
    return {percent:Math.round(total*100),maximum,types:raw.map((r,i)=>({type:i+1,cost:Number(r[0]),limit:Number(r[2]),
// [VI dòng gốc 84] Thuộc tính count: gọi Number(rows.find(row=>Number(row?.[0])===i+1)?.[1]??0) để chuyển sang số | Thuộc tính balance: gọi Number(i===0?user()?.copper:user()?.ingot) để chuyển sang số
      count:Number(rows.find(row=>Number(row?.[0])===i+1)?.[1]??0),balance:Number(i===0?user()?.copper:user()?.ingot)}))};
// [VI dòng gốc 85] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 86] Định nghĩa hàm inspireReply; tham số: không có | Khai báo biến không gán lại bằng const: p = đọc S.pending | Kiểm tra p?.kind==='challenge'&&p.entered&&currentMap()===p.id&&p.cheer?.pending: đúng thì chạy nhánh sau if.
  function inspireReply(){const p=S.pending;if(p?.kind==='challenge'&&p.entered&&currentMap()===p.id&&p.cheer?.pending)
// [VI dòng gốc 87] gán p.cheer.pending.reply bằng Number(model()?.inspState?.[0])
    p.cheer.pending.reply=Number(model()?.inspState?.[0]);}
// [VI dòng gốc 88] Định nghĩa hàm cheer; tham số: p
  function cheer(p){
// [VI dòng gốc 89] Khai báo biến không gán lại bằng const: c = p.cheer hoặc dùng vế phải khi vế trái falsy: p.cheer={pending:null,blocked:false,blockedTypes:[],requests:0,confirmed:0,reason:'waiting_data'}; d = gọi cheerData(); now = gọi Date.now()
    const c=p.cheer||(p.cheer={pending:null,blocked:false,blockedTypes:[],requests:0,confirmed:0,reason:'waiting_data'}),d=cheerData(),now=Date.now();
// [VI dòng gốc 90] Kiểm tra p.resultAt!=null: đúng thì chạy nhánh sau if. | gán c.reason bằng 'battle_ended' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(p.resultAt!=null){c.reason='battle_ended';return;}
// [VI dòng gốc 91] Kiểm tra W.KVPV_BOSS_TEAM?.priority?.(): đúng thì chạy nhánh sau if. | gán c.reason bằng 'yield_private_boss_invitation' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(W.KVPV_BOSS_TEAM?.priority?.()){c.reason='yield_private_boss_invitation';return;}
// [VI dòng gốc 92] Kiểm tra !d: đúng thì chạy nhánh sau if. | gán c.reason bằng 'waiting_native_inspire_data' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(!d){c.reason='waiting_native_inspire_data';return;}
// [VI dòng gốc 93] Kiểm tra c.pending: đúng thì chạy nhánh sau if.
    if(c.pending){
// [VI dòng gốc 94] Khai báo biến không gán lại bằng const: pending = đọc c.pending; current = gọi d.types.find(t=>t.type===pending.type) để tìm phần tử đầu tiên thỏa điều kiện
      const pending=c.pending,current=d.types.find(t=>t.type===pending.type);
// [VI dòng gốc 95] Kiểm tra current?.count>pending.count: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | tăng c.confirmed một đơn vị sau khi lấy giá trị | gán c.blocked bằng false | Kiểm tra pending.type===2: đúng thì chạy nhánh sau if, sai thì chạy nhánh else.
      if(current?.count>pending.count){c.confirmed++;c.blocked=false;if(pending.type===2)c.confirmedKNBCost=(c.confirmedKNBCost||0)+pending.cost;else c.confirmedCoinCost=(c.confirmedCoinCost||0)+pending.cost;c.pending=null;note('INSPIRE-CONFIRMED',{map:p.id,type:pending.type,cost:pending.cost,percent:d.percent});}
// [VI dòng gốc 96] Kiểm tra pending.reply!=null&&pending.reply!==0: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gọi c.blockedTypes.push(pending.type) để thêm phần tử vào cuối mảng | gán c.pending bằng null | gán c.reason bằng 'native_inspire_error:'+pending.reply
      else if(pending.reply!=null&&pending.reply!==0){c.blockedTypes.push(pending.type);c.pending=null;c.reason='native_inspire_error:'+pending.reply;}
// [VI dòng gốc 97] Kiểm tra now-pending.at>=8000: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gán c.blocked bằng true | gán c.reason bằng 'inspire_ack_timeout' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      else if(now-pending.at>=8000){c.blocked=true;c.reason='inspire_ack_timeout';return;}
// [VI dòng gốc 98] gán c.reason bằng 'waiting_inspire_ack' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      else{c.reason='waiting_inspire_ack';return;}
// [VI dòng gốc 99] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 100] Kiểm tra d.percent>=d.maximum: đúng thì chạy nhánh sau if. | gán c.reason bằng 'inspire_full' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(d.percent>=d.maximum){c.reason='inspire_full';return;}
// [VI dòng gốc 101] Kiểm tra c.blocked: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(c.blocked)return;
// [VI dòng gốc 102] Kiểm tra typeof rpc()?.rqInsp!=='function': đúng thì chạy nhánh sau if. | gán c.reason bằng 'missing_inspire_api' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(typeof rpc()?.rqInsp!=='function'){c.reason='missing_inspire_api';return;}
// [VI dòng gốc 103] Khai báo biến không gán lại bằng const: knbAllowed = W.KVPV_SPENDING_POLICY?.allowKNB===true hoặc dùng vế phải khi vế trái falsy: W.KVPV_SPENDING_POLICY?.canDailyInspireKNB?.(p.id)===true
    const knbAllowed=W.KVPV_SPENDING_POLICY?.allowKNB===true||W.KVPV_SPENDING_POLICY?.canDailyInspireKNB?.(p.id)===true;
// [VI dòng gốc 104] Chú thích gốc của tác giả; không được thực thi. Nội dung: A visible native auto-inspire panel is already a sender. Let it own the
    // A visible native auto-inspire panel is already a sender. Let it own the
// [VI dòng gốc 105] Chú thích gốc của tác giả; không được thực thi. Nội dung: sequence instead of issuing a second request from this controller.
    // sequence instead of issuing a second request from this controller.
// [VI dòng gốc 106] Khai báo biến không gán lại bằng const: manager = đọc W._ft?._Y4n?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); classes = tạo mảng gồm 2 vị trí: [[W._Ba?._sst?._Rqn,4],[W._Ba?._dat?._PYn,10]]
    const manager=W._ft?._Y4n?.ins,classes=[[W._Ba?._sst?._Rqn,4],[W._Ba?._dat?._PYn,10]];
// [VI dòng gốc 107] Duyệt từng giá trị trong Object.keys(manager?.openTable||manager?._H$t||{}).slice(0,80) bằng const id. | Khai báo biến không gán lại bằng const: id (chưa gán giá trị)
    for(const id of Object.keys(manager?.openTable||manager?._H$t||{}).slice(0,80)){
// [VI dòng gốc 108] Khai báo biến không gán lại bằng const: panel = manager?.getPanelById?.(Number(id)) hoặc dùng vế phải khi vế trái falsy: manager?.getDialogById?.(Number(id))
      const panel=manager?.getPanelById?.(Number(id))||manager?.getDialogById?.(Number(id));
// [VI dòng gốc 109] Duyệt từng giá trị trong classes bằng const [Type,kind]. | Khai báo biến không gán lại bằng const: [Type,kind] (chưa gán giá trị) | Kiểm tra typeof Type==='function'&&panel instanceof Type&&panel.parent&&panel.visible!==false&&panel._jqn===Type.prototype._jqn: đúng thì chạy nhánh sau if.
      for(const [Type,kind]of classes)if(typeof Type==='function'&&panel instanceof Type&&panel.parent&&panel.visible!==false&&panel._jqn===Type.prototype._jqn){
// [VI dòng gốc 110] Khai báo biến không gán lại bằng const: active = gọi d.types.some(t=>(t.type===1||knbAllowed)&&!c.blockedTypes.includes(t.type)&&t.count<t.limit&&t.balance>=t.cost&& [true,1].includes(mo…) để kiểm tra có ít nhất một phần tử thỏa điều kiện
        const active=d.types.some(t=>(t.type===1||knbAllowed)&&!c.blockedTypes.includes(t.type)&&t.count<t.limit&&t.balance>=t.cost&&
// [VI dòng gốc 111] gọi [true,1].includes(model()?.getAutoInspState?.(kind,t.type)) để kiểm tra dữ liệu có chứa giá trị | gọi model()?.getAutoInspState(kind, t.type) | gọi model()
          [true,1].includes(model()?.getAutoInspState?.(kind,t.type)));
// [VI dòng gốc 112] Kiểm tra active: đúng thì chạy nhánh sau if. | gán c.reason bằng 'native_auto_inspire_owner' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
        if(active){c.reason='native_auto_inspire_owner';return;}
// [VI dòng gốc 113] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
      }
// [VI dòng gốc 114] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 115] Khai báo biến không gán lại bằng const: type = gọi d.types.find(t=>(t.type===1||knbAllowed)&&!c.blockedTypes.includes(t.type)&&Number.isSafeInteger(t.count)&&t.count>=0&&t.count<t.limi…) để tìm phần tử đầu tiên thỏa điều kiện
    const type=d.types.find(t=>(t.type===1||knbAllowed)&&!c.blockedTypes.includes(t.type)&&Number.isSafeInteger(t.count)&&t.count>=0&&t.count<t.limit&&Number.isFinite(t.balance)&&t.balance>=t.cost);
// [VI dòng gốc 116] Kiểm tra !type: đúng thì chạy nhánh sau if. | gán c.reason bằng !knbAllowed&&d.types.some(t=>t.type===2&&t.count<t.limit)?'knb_inspire_not_authorized_for_map':'inspire_limit_or_insufficient_balance' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(!type){c.reason=!knbAllowed&&d.types.some(t=>t.type===2&&t.count<t.limit)?'knb_inspire_not_authorized_for_map':'inspire_limit_or_insufficient_balance';return;}
// [VI dòng gốc 117] gán c.pending bằng {type:type.type,count:type.count,percent:d.percent,at:now,cost:type.cost} | tăng c.requests một đơn vị sau khi lấy giá trị | gán c.reason bằng 'inspire_request_sent'
    c.pending={type:type.type,count:type.count,percent:d.percent,at:now,cost:type.cost};c.requests++;c.reason='inspire_request_sent';
// [VI dòng gốc 118] gọi note('INSPIRE-REQUEST', {map:p.id,type:type.type,cost:type.cost}) | gọi rpc().rqInsp(type.type)
    note('INSPIRE-REQUEST',{map:p.id,type:type.type,cost:type.cost});rpc().rqInsp(type.type);
// [VI dòng gốc 119] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 120] Định nghĩa hàm processPending; tham số: không có | Khai báo biến không gán lại bằng const: p = đọc S.pending; r = gọi row(p.id); now = gọi Date.now() | gọi renew() để gia hạn quyền đang giữ
  function processPending(){const p=S.pending,r=row(p.id),now=Date.now();renew();
// [VI dòng gốc 121] Kiểm tra p.kind==='sweep': đúng thì chạy nhánh sau if.
    if(p.kind==='sweep'){
// [VI dòng gốc 122] Kiểm tra Array.isArray(r)&&(Number(r[8])<p.beforeSweeps||Number(r[10])>p.beforeSpent): đúng thì chạy nhánh sau if.
      if(Array.isArray(r)&&(Number(r[8])<p.beforeSweeps||Number(r[10])>p.beforeSpent)){
// [VI dòng gốc 123] tăng S.sweepConfirmed một đơn vị sau khi lấy giá trị | cập nhật bằng toán tử += S.confirmedSweepCost bằng p.cost | gọi finish('SWEEP-CONFIRMED') | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
        S.sweepConfirmed++;S.confirmedSweepCost+=p.cost;finish('SWEEP-CONFIRMED');return;
// [VI dòng gốc 124] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
      }
// [VI dòng gốc 125] Kiểm tra now-p.at>C.sweepTimeoutMs: đúng thì chạy nhánh sau if. | gọi finish('SWEEP-ACK-TIMEOUT') | gọi release() để nhả quyền điều khiển đang giữ | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      if(now-p.at>C.sweepTimeoutMs){finish('SWEEP-ACK-TIMEOUT');release();return;}
// [VI dòng gốc 126] gán S.phase bằng 'WAIT_SWEEP_ACK' | gán S.reason bằng 'waiting_server_sweep_count' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      S.phase='WAIT_SWEEP_ACK';S.reason='waiting_server_sweep_count';return;
// [VI dòng gốc 127] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 128] Kiểm tra currentMap()===p.id: đúng thì chạy nhánh sau if.
    if(currentMap()===p.id){
// [VI dòng gốc 129] Kiểm tra !p.entered: đúng thì chạy nhánh sau if. | gán p.entered bằng true | tăng S.entries một đơn vị sau khi lấy giá trị | gọi note('ENTRY-CONFIRMED', p.id)
      if(!p.entered){p.entered=true;S.entries++;note('ENTRY-CONFIRMED',p.id);}
// [VI dòng gốc 130] gán S.phase bằng 'FIGHT' | gán S.reason bằng user()?.isDead===true?'waiting_native_revive_or_exit':'native_dungeon_combat'
      S.phase='FIGHT';S.reason=user()?.isDead===true?'waiting_native_revive_or_exit':'native_dungeon_combat';
// [VI dòng gốc 131] Kiểm tra user()?.isDead!==true: đúng thì chạy nhánh sau if. | gọi cheer(p) | gọi chooseTarget()
      if(user()?.isDead!==true){cheer(p);chooseTarget();}
// [VI dòng gốc 132] Kiểm tra p.resultAt!=null&&now-p.resultAt>=2000&&!p.exitSent: đúng thì chạy nhánh sau if. | gán p.exitSent bằng true | gọi rpc()?.rqEtScene(0) để gửi yêu cầu vào/ra cảnh qua luồng native (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gọi note('NATIVE-EXIT-REQUEST', p.id)
      if(p.resultAt!=null&&now-p.resultAt>=2000&&!p.exitSent){p.exitSent=true;rpc()?.rqEtScene?.(0);note('NATIVE-EXIT-REQUEST',p.id);}
// [VI dòng gốc 133] Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      return;
// [VI dòng gốc 134] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 135] Kiểm tra p.entered: đúng thì chạy nhánh sau if.
    if(p.entered){
// [VI dòng gốc 136] Kiểm tra !common(): đúng thì chạy nhánh sau if. | gán S.phase bằng 'WAIT_RETURN' | gán S.reason bằng 'waiting_common_scene' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      if(!common()){S.phase='WAIT_RETURN';S.reason='waiting_common_scene';return;}
// [VI dòng gốc 137] tăng S.returns một đơn vị sau khi lấy giá trị | gọi finish('RETURN-CONFIRMED') | gọi refresh() để làm mới dữ liệu theo điều kiện của hàm | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      S.returns++;finish('RETURN-CONFIRMED');refresh();return;
// [VI dòng gốc 138] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 139] Kiểm tra now-p.at>C.entryTimeoutMs: đúng thì chạy nhánh sau if. | gọi finish('ENTRY-ACK-TIMEOUT') | gọi release() để nhả quyền điều khiển đang giữ | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(now-p.at>C.entryTimeoutMs){finish('ENTRY-ACK-TIMEOUT');release();return;}
// [VI dòng gốc 140] gán S.phase bằng 'WAIT_ENTRY' | gán S.reason bằng 'waiting_native_scene_ack'
    S.phase='WAIT_ENTRY';S.reason='waiting_native_scene_ack';
// [VI dòng gốc 141] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 142] Chú thích gốc của tác giả; không được thực thi. Nội dung: Cùng phép chọn cho bộ ưu tiên và lượt thực thi; không gửi RPC khi hỏi ưu tiên.
  // Cùng phép chọn cho bộ ưu tiên và lượt thực thi; không gửi RPC khi hỏi ưu tiên.
// [VI dòng gốc 143] Định nghĩa hàm nextAction; tham số: không có
  function nextAction(){
// [VI dòng gốc 144] Khai báo biến không gán lại bằng const: requested = W.KVPV_PROGRESS_PLANNER?.materialDungeon?.() hoặc dùng vế phải khi vế trái là null/undefined: W.KVPV_EQUIPMENT_TREASURE?.materialDungeon?.()
    const requested=W.KVPV_PROGRESS_PLANNER?.materialDungeon?.()??W.KVPV_EQUIPMENT_TREASURE?.materialDungeon?.();
// [VI dòng gốc 145] Khai báo biến không gán lại bằng const: list = gọi candidates().filter(d=>(!requested||d.id===requested)&&d.known&&d.unlocked&&d.taskAllowed&&Number.isSafeInteger(d.level)&&d.level>0) để giữ phần tử thỏa điều kiện
    const list=candidates().filter(d=>(!requested||d.id===requested)&&d.known&&d.unlocked&&d.taskAllowed&&Number.isSafeInteger(d.level)&&d.level>0);
// [VI dòng gốc 146] Khai báo biến có thể gán lại bằng let: d = gọi list.find(d=>d.remaining>0&&!S.sent.has(key(d,'challenge'))) để tìm phần tử đầu tiên thỏa điều kiện; kind = "challenge"; cost = 0
    let d=list.find(d=>d.remaining>0&&!S.sent.has(key(d,'challenge'))),kind='challenge',cost=0;
// [VI dòng gốc 147] Kiểm tra !d&&C.paidSweep&&W.KVPV_SPENDING_POLICY?.allowKNB===true: đúng thì chạy nhánh sau if.
    if(!d&&C.paidSweep&&W.KVPV_SPENDING_POLICY?.allowKNB===true){
// [VI dòng gốc 148] gán kind bằng 'sweep'
      kind='sweep';
// [VI dòng gốc 149] Duyệt từng giá trị trong list bằng const candidate. | Khai báo biến không gán lại bằng const: candidate (chưa gán giá trị)
      for(const candidate of list){
// [VI dòng gốc 150] Kiểm tra !(candidate.sweeps>0)||S.sent.has(key(candidate,kind)): đúng thì chạy nhánh sau if. | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
        if(!(candidate.sweeps>0)||S.sent.has(key(candidate,kind)))continue;
// [VI dòng gốc 151] Khai báo biến không gán lại bằng const: value = gọi Number(W._Ba?._B_t?._KLt?.ins?.getNum?.(candidate.id,candidate.spentSweeps,Number(row(candidate.id)?.[7]))?.[0]) để chuyển sang số
        const value=Number(W._Ba?._B_t?._KLt?.ins?.getNum?.(candidate.id,candidate.spentSweeps,Number(row(candidate.id)?.[7]))?.[0]);
// [VI dòng gốc 152] Kiểm tra !Number.isFinite(value)||value<0||!Number.isFinite(Number(user()?.ingot))||Number(user().ingot)<value: đúng thì chạy nhánh sau if. | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
        if(!Number.isFinite(value)||value<0||!Number.isFinite(Number(user()?.ingot))||Number(user().ingot)<value)continue;
// [VI dòng gốc 153] gán d bằng candidate | gán cost bằng value | Thoát vòng lặp/switch hiện tại.
        d=candidate;cost=value;break;
// [VI dòng gốc 154] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
      }
// [VI dòng gốc 155] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 156] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm d, kind, cost.
    return {d,kind,cost};
// [VI dòng gốc 157] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 158] Định nghĩa hàm hasPriority; tham số: không có | Kiểm tra W.KVPV_ENTRY_POLICY?.manual===true: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: false. | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài.
  function hasPriority(){if(W.KVPV_ENTRY_POLICY?.manual===true)return false;try{
// [VI dòng gốc 159] Kiểm tra W.KVPV_QUEST_PRIORITY?.blocks?.('daily_trial')&&!S.pending: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: false.
    if(W.KVPV_QUEST_PRIORITY?.blocks?.('daily_trial')&&!S.pending)return false;
// [VI dòng gốc 160] Kiểm tra !C.enabled||!owned()||user()?.isDead===true||!common()||busy(): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: false.
    if(!C.enabled||!owned()||user()?.isDead===true||!common()||busy())return false;
// [VI dòng gốc 161] Kết thúc hàm hiện tại và trả về: !!S.pending hoặc dùng vế phải khi vế trái falsy: !!nextAction().d.
    return !!S.pending||!!nextAction().d;
// [VI dòng gốc 162] Nhận lỗi bằng e và chạy phần xử lý lỗi. | gán S.lastError bằng String(e?.message||e) | Kết thúc hàm hiện tại và trả về: false.
  }catch(e){S.lastError=String(e?.message||e);return false;}}
// [VI dòng gốc 163] Định nghĩa hàm tick; tham số: không có. Mục đích: xử lý một nhịp kiểm tra | Kiểm tra W.KVPV_ENTRY_POLICY?.manual===true: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể. | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài.
  function tick(){if(W.KVPV_ENTRY_POLICY?.manual===true)return;try{
// [VI dòng gốc 164] Kiểm tra W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true: đúng thì chạy nhánh sau if. | gán S.reason bằng 'priority_agree_popup' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true){S.reason='priority_agree_popup';return;}
// [VI dòng gốc 165] Kiểm tra !C.enabled||!owned(): đúng thì chạy nhánh sau if. | gọi stop() để dừng bộ điều khiển và dọn tài nguyên | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(!C.enabled||!owned()){stop();return;}
// [VI dòng gốc 166] Khai báo biến không gán lại bằng const: today = gọi day() | Kiểm tra S.day!==today: đúng thì chạy nhánh sau if. | gán S.day bằng today | gọi S.sent.clear()
    const today=day();if(S.day!==today){S.day=today;S.sent.clear();}
// [VI dòng gốc 167] Kiểm tra S.pending: đúng thì chạy nhánh sau if. | gọi processPending() | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(S.pending){processPending();return;}
// [VI dòng gốc 168] Kiểm tra W.KVPV_QUEST_PRIORITY?.blocks?.('daily_trial'): đúng thì chạy nhánh sau if. | gán S.reason bằng 'priority_quest' | gọi release() để nhả quyền điều khiển đang giữ | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(W.KVPV_QUEST_PRIORITY?.blocks?.('daily_trial')){S.reason='priority_quest';release();return;}
// [VI dòng gốc 169] Kiểm tra user()?.isDead===true: đúng thì chạy nhánh sau if. | gán S.reason bằng 'dead' | gọi release() để nhả quyền điều khiển đang giữ | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(user()?.isDead===true){S.reason='dead';release();return;}
// [VI dòng gốc 170] Kiểm tra !common(): đúng thì chạy nhánh sau if. | gán S.reason bằng 'other_scene' | gọi release() để nhả quyền điều khiển đang giữ | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(!common()){S.reason='other_scene';release();return;}
// [VI dòng gốc 171] Khai báo biến không gán lại bằng const: blocked = gọi busy() | Kiểm tra blocked: đúng thì chạy nhánh sau if. | gán S.reason bằng blocked | gọi release() để nhả quyền điều khiển đang giữ
    const blocked=busy();if(blocked){S.reason=blocked;release();return;}
// [VI dòng gốc 172] Kiểm tra Date.now()<S.nextAt: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(Date.now()<S.nextAt)return;
// [VI dòng gốc 173] gọi refresh() để làm mới dữ liệu theo điều kiện của hàm
    refresh();
// [VI dòng gốc 174] Khai báo biến không gán lại bằng const: {d,kind,cost} = gọi nextAction()
    const {d,kind,cost}=nextAction();
// [VI dòng gốc 175] Kiểm tra !d: đúng thì chạy nhánh sau if. | gán S.phase bằng 'WAITING' | gán S.reason bằng 'no_available_challenge_or_affordable_sweep' | gọi release() để nhả quyền điều khiển đang giữ
    if(!d){S.phase='WAITING';S.reason='no_available_challenge_or_affordable_sweep';release();return;}
// [VI dòng gốc 176] Khai báo biến không gán lại bằng const: native = gọi rpc() | Kiểm tra typeof native?.rqEtScene!=='function'||kind==='sweep'&&typeof native.swpCpy!=='function': đúng thì chạy nhánh sau if. | gán S.reason bằng 'missing_native_api' | gọi release() để nhả quyền điều khiển đang giữ
    const native=rpc();if(typeof native?.rqEtScene!=='function'||kind==='sweep'&&typeof native.swpCpy!=='function'){S.reason='missing_native_api';release();return;}
// [VI dòng gốc 177] Kiểm tra !reserve(): đúng thì chạy nhánh sau if. | gán S.reason bằng 'scene_reserved' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(!reserve()){S.reason='scene_reserved';return;}
// [VI dòng gốc 178] Khai báo biến không gán lại bằng const: requestKey = gọi key(d, kind) | gọi S.sent.add(requestKey)
    const requestKey=key(d,kind);S.sent.add(requestKey);
// [VI dòng gốc 179] gán S.pending bằng {kind,id:d.id,level:d.level,at:Date.now(),entered:false,beforeSweeps:d.sweeps,beforeSpent:d.spentSweeps,cost}
    S.pending={kind,id:d.id,level:d.level,at:Date.now(),entered:false,beforeSweeps:d.sweeps,beforeSpent:d.spentSweeps,cost};
// [VI dòng gốc 180] gọi note(kind==='challenge'?'CHALLENGE-REQUEST':'PAID-SWEEP-REQUEST', {id:d.id,level:d.level,cost})
    note(kind==='challenge'?'CHALLENGE-REQUEST':'PAID-SWEEP-REQUEST',{id:d.id,level:d.level,cost});
// [VI dòng gốc 181] Kiểm tra kind==='challenge': đúng thì chạy nhánh sau if, sai thì chạy nhánh else.
    if(kind==='challenge'){
// [VI dòng gốc 182] Kiểm tra d.id===2051||d.id===2061: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gọi native.rqEtScene(d.id) để gửi yêu cầu vào/ra cảnh qua luồng native | gọi native.rqEtScene(d.id, d.level) để gửi yêu cầu vào/ra cảnh qua luồng native
      if(d.id===2051||d.id===2061)native.rqEtScene(d.id);else native.rqEtScene(d.id,d.level);
// [VI dòng gốc 183] tăng S.sweepRequests một đơn vị sau khi lấy giá trị | gọi native.swpCpy(d.id)
    }else{S.sweepRequests++;native.swpCpy(d.id);}
// [VI dòng gốc 184] gán S.phase bằng kind==='challenge'?'WAIT_ENTRY':'WAIT_SWEEP_ACK' | gán S.reason bằng 'request_sent_not_yet_confirmed'
    S.phase=kind==='challenge'?'WAIT_ENTRY':'WAIT_SWEEP_ACK';S.reason='request_sent_not_yet_confirmed';
// [VI dòng gốc 185] Nhận lỗi bằng e và chạy phần xử lý lỗi. | gán S.lastError bằng String(e?.message||e) | gán S.reason bằng 'error' | Kiểm tra !S.pending: đúng thì chạy nhánh sau if.
  }catch(e){S.lastError=String(e?.message||e);S.reason='error';if(!S.pending)release();}}
// [VI dòng gốc 186] Định nghĩa hàm status; tham số: không có. Mục đích: trả trạng thái để kiểm tra | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm enabled, paidSweep, priority, actorId, phase, reason, inFlight, pending, inspire, knbInspireAllowed, entries, returns, sweepRequests, sweepConfirmed, confirmedSweepCost, lastError, dungeons, history, note.
  function status(){return {enabled:C.enabled,paidSweep:C.paidSweep&&W.KVPV_SPENDING_POLICY?.allowKNB===true,priority:'first_when_idle',actorId:actor,phase:S.phase,reason:S.reason,
// [VI dòng gốc 187] Thuộc tính inFlight: đảo giá trị đúng/sai của !S.pending | Thuộc tính pending: nếu S.pending thì lấy JSON.parse(JSON.stringify(S.pending)), ngược lại lấy null | Thuộc tính inspire: gọi cheerData() | Thuộc tính knbInspireAllowed: W.KVPV_SPENDING_POLICY?.canDailyInspireKNB?.(currentMap())===true hoặc dùng vế phải khi vế trái falsy: W.KVPV_SPENDING_POLICY?.allowKNB===true
    inFlight:!!S.pending,pending:S.pending?JSON.parse(JSON.stringify(S.pending)):null,inspire:cheerData(),knbInspireAllowed:W.KVPV_SPENDING_POLICY?.canDailyInspireKNB?.(currentMap())===true||W.KVPV_SPENDING_POLICY?.allowKNB===true,entries:S.entries,returns:S.returns,
// [VI dòng gốc 188] Thuộc tính sweepRequests: đọc S.sweepRequests | Thuộc tính sweepConfirmed: đọc S.sweepConfirmed | Thuộc tính confirmedSweepCost: đọc S.confirmedSweepCost
    sweepRequests:S.sweepRequests,sweepConfirmed:S.sweepConfirmed,confirmedSweepCost:S.confirmedSweepCost,
// [VI dòng gốc 189] Thuộc tính lastError: đọc S.lastError | Thuộc tính dungeons: gọi candidates() | Thuộc tính history: gọi S.history.slice() để lấy một đoạn dữ liệu
    lastError:S.lastError,dungeons:candidates(),history:S.history.slice(),
// [VI dòng gốc 190] Thuộc tính note: "Paid sweep disabled by general policy. Native KNB inspire allowed only on authorized trial maps; server count/bonus ACK required."
    note:'Paid sweep disabled by general policy. Native KNB inspire allowed only on authorized trial maps; server count/bonus ACK required.'};}
// [VI dòng gốc 191] Định nghĩa hàm stop; tham số: không có. Mục đích: dừng bộ điều khiển và dọn tài nguyên | gán C.enabled bằng false | Kiểm tra S.timer!=null: đúng thì chạy nhánh sau if. | gọi W.KVPV_V1?.timers?.clearInterval??W.clearInterval(S.timer)
  function stop(){C.enabled=false;if(S.timer!=null){(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;}
// [VI dòng gốc 192] gọi W._Sa?.notify?.off(5112, S, ended) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gọi W._Sa?.notify?.off(5108, S, inspireReply) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gọi release() để nhả quyền điều khiển đang giữ | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm enabled, inFlight.
    W._Sa?.notify?.off?.(5112,S,ended);W._Sa?.notify?.off?.(5108,S,inspireReply);release();return {enabled:false,inFlight:!!S.pending};}
// [VI dòng gốc 193] Định nghĩa hàm start; tham số: không có. Mục đích: khởi động bộ điều khiển | gán C.enabled bằng true | gọi W._Sa?.notify?.off(5112, S, ended) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gọi W._Sa?.notify?.on(5112, S, ended) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  function start(){C.enabled=true;W._Sa?.notify?.off?.(5112,S,ended);W._Sa?.notify?.on?.(5112,S,ended);W._Sa?.notify?.off?.(5108,S,inspireReply);W._Sa?.notify?.on?.(5108,S,inspireReply);
// [VI dòng gốc 194] Kiểm tra !W.KVPV_ENTRY_POLICY?.manual&&S.pending&&!S.lease: đúng thì chạy nhánh sau if. | gọi reserve() để xin giữ quyền điều khiển cảnh
    if(!W.KVPV_ENTRY_POLICY?.manual&&S.pending&&!S.lease)reserve();
// [VI dòng gốc 195] Kiểm tra S.timer==null: đúng thì chạy nhánh sau if. | gán S.timer bằng (W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,C.pollMs) | gọi tick() để xử lý một nhịp kiểm tra | Kết thúc hàm hiện tại và trả về: gọi status() để trả trạng thái để kiểm tra.
    if(S.timer==null)S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,C.pollMs);tick();return status();}
// [VI dòng gốc 196] gán W.KVPV_DAILY_TRIAL bằng Object.freeze({start,stop,status,hasPriority,sync:tick, _handoff:()=>({day:S.day,sent:[...S.sent],entries:S.entries,returns:S.returns,sweepRequests:S.sweepRequests,sweepConfirmed:S…
  W.KVPV_DAILY_TRIAL=Object.freeze({start,stop,status,hasPriority,sync:tick,
// [VI dòng gốc 197] gọi start() để khởi động bộ điều khiển
    _handoff:()=>({day:S.day,sent:[...S.sent],entries:S.entries,returns:S.returns,sweepRequests:S.sweepRequests,sweepConfirmed:S.sweepConfirmed,confirmedSweepCost:S.confirmedSweepCost})});start();
// [VI dòng gốc 198] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: })();
})();
// [VI dòng gốc 199] Dòng trống để tách các phần, không có lệnh thực thi.
