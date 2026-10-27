// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: Boss Phù Văn: vào tầng native 2201, dùng bộ đánh xa liên tục như Linh Lung.
/* Boss Phù Văn: vào tầng native 2201, dùng bộ đánh xa liên tục như Linh Lung.
 * Không dùng càn quét/KNB, không tự thoát theo đồng hồ 30s của Linh Lung.
 * Mỗi tầng gửi một yêu cầu; chỉ tiến tiếp khi finishLv server tăng.
 * Thua hoặc thiếu ACK thì giữ chờ, tránh lặp lại yêu cầu không rõ kết quả. */
// [VI dòng gốc 5] chạy ngay hàm bao để tạo phạm vi và khởi tạo phần chức năng bên trong
(() => {
// [VI dòng gốc 6] "use strict"
  'use strict';
// [VI dòng gốc 7] Khai báo biến không gán lại bằng const: W = window; old = đọc W.KVPV_RUNE_BOSS; carry = gọi old?._handoff(); chức năng nội bộ chưa xác minh từ tên hàm (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gọi old?.stop() để dừng bộ điều khiển và dọn tài nguyên (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  const W=window,old=W.KVPV_RUNE_BOSS,carry=old?._handoff?.();old?.stop?.();
// [VI dòng gốc 8] Khai báo biến không gán lại bằng const: actor = gọi String(W.__KVPV_OWN_ACTOR_ID||'') để chuyển sang chuỗi; same = tính biểu thức carry?.actor===actor; tag = "rune-boss"
  const actor=String(W.__KVPV_OWN_ACTOR_ID||''),same=carry?.actor===actor,tag='rune-boss';
// [VI dòng gốc 9] Khai báo biến không gán lại bằng const: S = tạo đối tượng gồm enabled, timer, lease, stageAuto, pending, attempted, reason, lastError, requests
  const S={enabled:same?carry.enabled:true,timer:null,lease:false,stageAuto:null,
// [VI dòng gốc 10] Thuộc tính pending: nếu same thì lấy carry.pending, ngược lại lấy null | Thuộc tính attempted: nếu same thì lấy carry.attempted, ngược lại lấy null | Thuộc tính reason: "waiting" | Thuộc tính lastError: ""
    pending:same?carry.pending:null,attempted:same?carry.attempted:null,reason:'waiting',lastError:'',requests:same?carry.requests:0};
// [VI dòng gốc 11] Khai báo biến không gán lại bằng const: model = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._Ba?._IH?._ZY?.inst nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); arb = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W.KVPV?.core?.scene nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  const model=()=>W._Ba?._IH?._ZY?.inst,arb=()=>W.KVPV?.core?.scene;
// [VI dòng gốc 12] Khai báo biến không gán lại bằng const: owned = tạo hàm với tham số (không có); mỗi lần gọi trả về !!actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'') và chỉ đánh giá vế phải khi vế trái truthy: !W.__KVPV_UNIVERSAL_HALTED
  const owned=()=>!!actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;
// [VI dòng gốc 13] Khai báo biến không gán lại bằng const: current = tạo hàm với tham số (không có); mỗi lần gọi trả về gọi Number(W._C?._Mn?._Cn?.currentID??W._Ba?._$a?._yo?.ins?.intoSce?.[0]) để chuyển sang số
  const current=()=>Number(W._C?._Mn?._Cn?.currentID??W._Ba?._$a?._yo?.ins?.intoSce?.[0]);
// [VI dòng gốc 14] Khai báo biến không gán lại bằng const: common = tạo hàm với tham số (không có); mỗi lần gọi trả về W._Ba?._$a?.SceneUtil?.isCommonScene===true và chỉ đánh giá vế phải khi vế trái truthy: W._Ba?._$a?._yo?.ins?.isInMission!==true
  const common=()=>W._Ba?._$a?.SceneUtil?.isCommonScene===true&&W._Ba?._$a?._yo?.ins?.isInMission!==true;
// [VI dòng gốc 15] Định nghĩa hàm release; tham số: không có. Mục đích: nhả quyền điều khiển đang giữ
  function release(){
// [VI dòng gốc 16] Kiểm tra S.lease&&arb()?.status?.().tag===tag: đúng thì chạy nhánh sau if. | gọi arb()?.release('combat') để nhả quyền điều khiển đang giữ (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gán S.lease bằng false
    if(S.lease&&arb()?.status?.().tag===tag)arb()?.release?.('combat');S.lease=false;
// [VI dòng gốc 17] Khai báo biến không gán lại bằng const: stage = đọc W._Ba?._Co?._Mo?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Kiểm tra owned()&&S.stageAuto===true&&stage?.auto===false: đúng thì chạy nhánh sau if. | gán stage.auto bằng true
    const stage=W._Ba?._Co?._Mo?.ins;if(owned()&&S.stageAuto===true&&stage?.auto===false&&!W.KVPV_EVENT_PRIORITY?.hold?.())stage.auto=true;
// [VI dòng gốc 18] gán S.stageAuto bằng null
    S.stageAuto=null;
// [VI dòng gốc 19] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 20] Định nghĩa hàm reserve; tham số: không có. Mục đích: xin giữ quyền điều khiển cảnh
  function reserve(){
// [VI dòng gốc 21] Khai báo biến không gán lại bằng const: a = gọi arb(); l = gọi a?.status() để trả trạng thái để kiểm tra (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); job = đọc W.KVPV_DAILY?.quickState?.()?.job nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const a=arb(),l=a?.status?.(),job=W.KVPV_DAILY?.quickState?.()?.job;
// [VI dòng gốc 22] Kiểm tra !a||l?.owner&&l.tag!==tag||job&&job!=='rảnh'&&job!=='ranh'||W.KVPV_HITRUN1?.status?.(false)?.running: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: false.
    if(!a||l?.owner&&l.tag!==tag||job&&job!=='rảnh'&&job!=='ranh'||W.KVPV_HITRUN1?.status?.(false)?.running)return false;
// [VI dòng gốc 23] Khai báo biến không gán lại bằng const: stage = đọc W._Ba?._Co?._Mo?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const stage=W._Ba?._Co?._Mo?.ins;
// [VI dòng gốc 24] Kiểm tra S.stageAuto===null: đúng thì chạy nhánh sau if. | gán S.stageAuto bằng stage?.auto===true | Kiểm tra stage?.auto===true: đúng thì chạy nhánh sau if. | gán stage.auto bằng false
    if(S.stageAuto===null)S.stageAuto=stage?.auto===true;if(stage?.auto===true)stage.auto=false;
// [VI dòng gốc 25] Kiểm tra !a.acquire('combat',tag): đúng thì chạy nhánh sau if. | gọi release() để nhả quyền điều khiển đang giữ | Kết thúc hàm hiện tại và trả về: false. | gán S.lease bằng true
    if(!a.acquire('combat',tag)){release();return false;}S.lease=true;return true;
// [VI dòng gốc 26] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 27] Định nghĩa hàm tick; tham số: không có. Mục đích: xử lý một nhịp kiểm tra | Kiểm tra W.KVPV_ENTRY_POLICY?.manual===true: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể. | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài.
  function tick(){if(W.KVPV_ENTRY_POLICY?.manual===true)return;try{
// [VI dòng gốc 28] Kiểm tra !S.enabled: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(!S.enabled)return;
// [VI dòng gốc 29] Kiểm tra !owned(): đúng thì chạy nhánh sau if. | gọi stop() để dừng bộ điều khiển và dọn tài nguyên | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(!owned()){stop();return;}
// [VI dòng gốc 30] Kiểm tra W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true: đúng thì chạy nhánh sau if. | gán S.reason bằng 'priority_popup' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true){S.reason='priority_popup';return;}
// [VI dòng gốc 31] Khai báo biến không gán lại bằng const: finished = gọi Number(model()?.finishLv) để chuyển sang số; floor = gọi Number(model()?.currLv) để chuyển sang số
    const finished=Number(model()?.finishLv),floor=Number(model()?.currLv);
// [VI dòng gốc 32] Kiểm tra !Number.isSafeInteger(finished)||finished<0||!Number.isSafeInteger(floor)||floor!==finished+1: đúng thì chạy nhánh sau if. | gán S.reason bằng 'waiting_server_progress' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(!Number.isSafeInteger(finished)||finished<0||!Number.isSafeInteger(floor)||floor!==finished+1){S.reason='waiting_server_progress';return;}
// [VI dòng gốc 33] Kiểm tra current()===2201&&!common(): đúng thì chạy nhánh sau if.
    if(current()===2201&&!common()){
// [VI dòng gốc 34] Kiểm tra S.pending: đúng thì chạy nhánh sau if. | gán S.pending.entered bằng true
      if(S.pending)S.pending.entered=true;
// [VI dòng gốc 35] Kiểm tra S.lease: đúng thì chạy nhánh sau if. | gọi arb()?.renew('combat') để gia hạn quyền đang giữ (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
      if(S.lease)arb()?.renew?.('combat');
// [VI dòng gốc 36] gán S.reason bằng 'hitrun_far_combat' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      S.reason='hitrun_far_combat';return;
// [VI dòng gốc 37] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 38] Kiểm tra S.pending: đúng thì chạy nhánh sau if.
    if(S.pending){
// [VI dòng gốc 39] Kiểm tra common()&&finished>=S.pending.floor: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gán S.pending bằng null | gọi release() để nhả quyền điều khiển đang giữ | gán S.reason bằng 'floor_confirmed'
      if(common()&&finished>=S.pending.floor){S.pending=null;release();S.reason='floor_confirmed';}
// [VI dòng gốc 40] Kiểm tra common()&&S.pending.entered: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gán S.pending bằng null | gọi release() để nhả quyền điều khiển đang giữ | gán S.reason bằng 'floor_not_passed'
      else if(common()&&S.pending.entered){S.pending=null;release();S.reason='floor_not_passed';return;}
// [VI dòng gốc 41] gán S.reason bằng Date.now()-S.pending.at>25000?'waiting_entry_ack_no_retry':'entering'
      else {S.reason=Date.now()-S.pending.at>25000?'waiting_entry_ack_no_retry':'entering';
// [VI dòng gốc 42] Kiểm tra Date.now()-S.pending.at>25000: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gọi release() để nhả quyền điều khiển đang giữ | Kiểm tra S.lease: đúng thì chạy nhánh sau if. | gọi arb()?.renew('combat') để gia hạn quyền đang giữ (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
        if(Date.now()-S.pending.at>25000)release();else if(S.lease)arb()?.renew?.('combat');return;}
// [VI dòng gốc 43] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 44] Kiểm tra !common(): đúng thì chạy nhánh sau if. | gọi release() để nhả quyền điều khiển đang giữ | gán S.reason bằng 'other_activity' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(!common()){release();S.reason='other_activity';return;}
// [VI dòng gốc 45] Kiểm tra W.KVPV_QUEST_PRIORITY?.blocks?.('rune_boss'): đúng thì chạy nhánh sau if. | gọi release() để nhả quyền điều khiển đang giữ | gán S.reason bằng 'priority_quest' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(W.KVPV_QUEST_PRIORITY?.blocks?.('rune_boss')){release();S.reason='priority_quest';return;}
// [VI dòng gốc 46] Kiểm tra W._Ba?._rJ?._O$?.ins?.isDead===true: đúng thì chạy nhánh sau if. | gán S.reason bằng 'waiting_revive' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(W._Ba?._rJ?._O$?.ins?.isDead===true){S.reason='waiting_revive';return;}
// [VI dòng gốc 47] Khai báo biến không gán lại bằng const: cfg = gọi W._ft?._wZ?.ins?.getCfgByLv(floor) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const cfg=W._ft?._wZ?.ins?.getCfgByLv?.(floor);
// [VI dòng gốc 48] Kiểm tra !cfg: đúng thì chạy nhánh sau if. | gọi release() để nhả quyền điều khiển đang giữ | gán S.reason bằng 'all_floors_completed_or_missing_config' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(!cfg){release();S.reason='all_floors_completed_or_missing_config';return;}
// [VI dòng gốc 49] Kiểm tra Number(cfg[0])!==floor: đúng thì chạy nhánh sau if. | gán S.reason bằng 'invalid_floor_config' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(Number(cfg[0])!==floor){S.reason='invalid_floor_config';return;}
// [VI dòng gốc 50] Kiểm tra S.attempted===floor: đúng thì chạy nhánh sau if. | gọi release() để nhả quyền điều khiển đang giữ | gán S.reason bằng 'floor_already_attempted' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(S.attempted===floor){release();S.reason='floor_already_attempted';return;}
// [VI dòng gốc 51] Khai báo biến không gán lại bằng const: rpc = đọc W._Ba?._sst?._Cht?.inst nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const rpc=W._Ba?._sst?._Cht?.inst;
// [VI dòng gốc 52] Kiểm tra typeof rpc?.rqEtScene!=='function'||rpc.checkEnterScene?.(2201,false)!==true: đúng thì chạy nhánh sau if. | gán S.reason bằng 'native_entry_not_ready' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(typeof rpc?.rqEtScene!=='function'||rpc.checkEnterScene?.(2201,false)!==true){S.reason='native_entry_not_ready';return;}
// [VI dòng gốc 53] Kiểm tra !reserve(): đúng thì chạy nhánh sau if. | gán S.reason bằng 'scene_reserved' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(!reserve()){S.reason='scene_reserved';return;}
// [VI dòng gốc 54] gán S.pending bằng {floor,at:Date.now(),entered:false} | gán S.attempted bằng floor | tăng S.requests một đơn vị sau khi lấy giá trị
    S.pending={floor,at:Date.now(),entered:false};S.attempted=floor;S.requests++;
// [VI dòng gốc 55] gán S.reason bằng 'entering' | gọi rpc.rqEtScene(2201, floor) để gửi yêu cầu vào/ra cảnh qua luồng native
    S.reason='entering';rpc.rqEtScene(2201,floor);
// [VI dòng gốc 56] Nhận lỗi bằng e và chạy phần xử lý lỗi. | gán S.lastError bằng String(e) | gán S.reason bằng 'error' | gọi release() để nhả quyền điều khiển đang giữ
  }catch(e){S.lastError=String(e);S.reason='error';release();W.KVPV_V1?.diagnostics?.record?.(e);}}
// [VI dòng gốc 57] Định nghĩa hàm stop; tham số: không có. Mục đích: dừng bộ điều khiển và dọn tài nguyên | gán S.enabled bằng false | Kiểm tra S.timer!==null: đúng thì chạy nhánh sau if. | gọi W.KVPV_V1?.timers?.clearInterval??W.clearInterval(S.timer)
  function stop(){S.enabled=false;if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);
// [VI dòng gốc 58] gán S.timer bằng null | gọi release() để nhả quyền điều khiển đang giữ | gọi W.KVPV_MODE?.syncMap() (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    S.timer=null;release();W.KVPV_MODE?.syncMap?.();}
// [VI dòng gốc 59] Định nghĩa hàm start; tham số: không có. Mục đích: khởi động bộ điều khiển | gán S.enabled bằng true | gọi W.KVPV_MODE?.armTianQuan() để đăng ký bộ theo dõi map để tự bật bộ combat khi vào phó bản phù hợp (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  function start(){S.enabled=true;W.KVPV_MODE?.armTianQuan?.();
// [VI dòng gốc 60] Kiểm tra S.timer===null: đúng thì chạy nhánh sau if. | gán S.timer bằng (W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,1000) | gọi tick() để xử lý một nhịp kiểm tra
    if(S.timer===null)S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,1000);tick();}
// [VI dòng gốc 61] gán W.KVPV_RUNE_BOSS bằng Object.freeze({get enabled(){return S.enabled;},start,stop,sync:tick, status:()=>({enabled:S.enabled,actor,reason:S.reason,pending:S.pending?{...S.pending}:null, floor:Number(model… | Kết thúc hàm hiện tại và trả về: đọc S.enabled.
  W.KVPV_RUNE_BOSS=Object.freeze({get enabled(){return S.enabled;},start,stop,sync:tick,
// [VI dòng gốc 62] Thuộc tính status: tạo hàm với tham số (không có); mỗi lần gọi trả về tạo đối tượng gồm enabled, actor, reason, pending, floor, finished, requests, lastError, goalDistance, recoveryEnabled, finishBossHpPct, allowKNB | Thuộc tính enabled: đọc S.enabled | Thuộc tính actor: dùng biến cùng tên | Thuộc tính reason: đọc S.reason
    status:()=>({enabled:S.enabled,actor,reason:S.reason,pending:S.pending?{...S.pending}:null,
// [VI dòng gốc 63] Thuộc tính floor: gọi Number(model()?.currLv) để chuyển sang số | Thuộc tính finished: gọi Number(model()?.finishLv) để chuyển sang số | Thuộc tính requests: đọc S.requests | Thuộc tính lastError: đọc S.lastError
      floor:Number(model()?.currLv),finished:Number(model()?.finishLv),requests:S.requests,lastError:S.lastError,
// [VI dòng gốc 64] Thuộc tính goalDistance: 302 | Thuộc tính recoveryEnabled: true | Thuộc tính finishBossHpPct: 2 | Thuộc tính allowKNB: false
      goalDistance:302,recoveryEnabled:true,finishBossHpPct:2,allowKNB:false}),
// [VI dòng gốc 65] Thuộc tính _handoff: tạo hàm với tham số (không có); mỗi lần gọi trả về tạo đối tượng gồm actor, enabled, pending, attempted, requests | Thuộc tính actor: dùng biến cùng tên | Thuộc tính enabled: đọc S.enabled | Thuộc tính pending: nếu S.pending thì lấy {...S.pending}, ngược lại lấy null
    _handoff:()=>({actor,enabled:S.enabled,pending:S.pending?{...S.pending}:null,attempted:S.attempted,requests:S.requests})});
// [VI dòng gốc 66] Kiểm tra S.enabled: đúng thì chạy nhánh sau if. | gọi start() để khởi động bộ điều khiển
  if(S.enabled)start();
// [VI dòng gốc 67] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: })();
})();
// [VI dòng gốc 68] Dòng trống để tách các phần, không có lệnh thực thi.
