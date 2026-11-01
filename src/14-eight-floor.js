// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: CHÚ THÍCH V1 — Thiên Thê 8 Tầng.
/* CHÚ THÍCH V1 — Thiên Thê 8 Tầng.
 * Đối chiếu lịch và trạng thái mở native trước khi vào. Giữ quyền combat, cập nhật mục tiêu, nhận thưởng một lần theo trạng thái và chờ xác nhận chuyển map.
 * Sửa nguồn tại đây rồi chạy node build.cjs; FULL và bản vá được sinh tự động. */
// [VI dòng gốc 4] Chú thích gốc của tác giả; không được thực thi. Nội dung: Thien The 8 Tang: native map 7101 / scene type 71 / function 903.
/* Thien The 8 Tang: native map 7101 / scene type 71 / function 903.
 * Native references: copy_eight model _t8._w_t, controller _t8._Scn.
 * Entry ACK is the actual scene; reward ACK is rank state 2, never a send call.
 */
// [VI dòng gốc 8] chạy ngay hàm bao để tạo phạm vi và khởi tạo phần chức năng bên trong
(() => {
// [VI dòng gốc 9] "use strict"
  'use strict';
// [VI dòng gốc 10] Khai báo biến không gán lại bằng const: W = window; old = đọc W.KVPV_EIGHT_FLOOR; carry = gọi old?._handoff(); chức năng nội bộ chưa xác minh từ tên hàm (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gọi old?.stop() để dừng bộ điều khiển và dọn tài nguyên (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  const W=window,old=W.KVPV_EIGHT_FLOOR,carry=old?._handoff?.();old?.stop?.();
// [VI dòng gốc 11] Khai báo biến không gán lại bằng const: actor = gọi String(W.__KVPV_OWN_ACTOR_ID||'') để chuyển sang chuỗi
  const actor=String(W.__KVPV_OWN_ACTOR_ID||'');
// [VI dòng gốc 12] Khai báo biến không gán lại bằng const: C = tạo đối tượng gồm enabled, pollMs, entryRetryMs, maxEntriesPerDay, entryTimeoutMs, targetRefreshMs
  const C={enabled:true,pollMs:1000,entryRetryMs:30000,maxEntriesPerDay:15,entryTimeoutMs:25000,targetRefreshMs:10000};
// [VI dòng gốc 13] Khai báo biến không gán lại bằng const: same = tính biểu thức carry?.actor===actor; storage = tính biểu thức 'kvpv.eightfloor.completed.'+actor | Khai báo biến có thể gán lại bằng let: completedDay = nếu same thì lấy carry.completedDay, ngược lại lấy '' | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | gán completedDay bằng W.localStorage?.getItem(storage)||completedDay
  const same=carry?.actor===actor,storage='kvpv.eightfloor.completed.'+actor;let completedDay=same?carry.completedDay:'';try{completedDay=W.localStorage?.getItem(storage)||completedDay;}catch(_){}
// [VI dòng gốc 14] Khai báo biến không gán lại bằng const: S = tạo đối tượng gồm timer, phase, reason, day, attempts, entries, enteredAt, lastEntry, lastTarget, session, lease, stageAuto, claimKeys, claimPending, rewardConfirmed, lastError, history, exitAt
  const S={timer:null,phase:same&&carry.phase==='EXITING'?'EXITING':'WAITING',reason:'starting',day:same?carry.day:'',attempts:same?carry.attempts:0,entries:0,enteredAt:0,lastEntry:-Infinity,
// [VI dòng gốc 15] Thuộc tính lastTarget: áp dụng toán tử - lên Infinity | Thuộc tính session: false | Thuộc tính lease: false | Thuộc tính stageAuto: null
    lastTarget:-Infinity,session:false,lease:false,stageAuto:null,claimKeys:new Set(same?carry.claimKeys:[]),claimPending:same?carry.claimPending:null,rewardConfirmed:same?carry.rewardConfirmed:0,
// [VI dòng gốc 16] Thuộc tính lastError: "" | Thuộc tính history: tạo mảng gồm 0 vị trí: [] | Thuộc tính exitAt: 0
    lastError:'',history:[],exitAt:0};
// [VI dòng gốc 17] Khai báo biến không gán lại bằng const: formatter = tạo đối tượng bằng Intl.DateTimeFormat('en-GB', {timeZone:'Asia/Ho_Chi_Minh',hourCycle:'h23',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute…)
  const formatter=new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Ho_Chi_Minh',hourCycle:'h23',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit'});
// [VI dòng gốc 18] Định nghĩa hàm clock; tham số: không có | Khai báo biến không gán lại bằng const: p = gọi Object.fromEntries(formatter.formatToParts(new Date()).map(x=>[x.type,x.value]))
  function clock(){const p=Object.fromEntries(formatter.formatToParts(new Date()).map(x=>[x.type,x.value]));
// [VI dòng gốc 19] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm day, weekday, minute.
    return {day:p.year+'-'+p.month+'-'+p.day,weekday:new Date(Date.UTC(+p.year,+p.month-1,+p.day)).getUTCDay(),minute:+p.hour*60+(+p.minute)};}
// [VI dòng gốc 20] Khai báo biến không gán lại bằng const: model = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._Ba?._t8?._w_t?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  const model=()=>W._Ba?._t8?._w_t?.ins;
// [VI dòng gốc 21] Khai báo biến không gán lại bằng const: rpc = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._Ba?._t8?._Scn?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  const rpc=()=>W._Ba?._t8?._Scn?.ins;
// [VI dòng gốc 22] Khai báo biến không gán lại bằng const: sceneRpc = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._Ba?._sst?._Cht?.inst nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  const sceneRpc=()=>W._Ba?._sst?._Cht?.inst;
// [VI dòng gốc 23] Khai báo biến không gán lại bằng const: owned = tạo hàm với tham số (không có); mỗi lần gọi trả về actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'') và chỉ đánh giá vế phải khi vế trái truthy: !W.__KVPV_UNIVERSAL_HALTED
  const owned=()=>actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;
// [VI dòng gốc 24] Định nghĩa hàm data; tham số: không có | Khai báo biến không gán lại bằng const: c = gọi clock(); m = gọi model(); id = gọi Number(W._C?._Mn?._Cn?.currentID??W._Ba?._$a?._yo?.ins?.intoSce?.[0]) để chuyển sang số
  function data(){const c=clock(),m=model(),id=Number(W._C?._Mn?._Cn?.currentID??W._Ba?._$a?._yo?.ins?.intoSce?.[0]);
// [VI dòng gốc 25] Khai báo biến không gán lại bằng const: type = gọi Number(W._ft?._po?.ins?.getCfgById?.(id)?.[7]??W._Ba?._$a?.SceneUtil?.curScene) để chuyển sang số
    const type=Number(W._ft?._po?.ins?.getCfgById?.(id)?.[7]??W._Ba?._$a?.SceneUtil?.curScene);
// [VI dòng gốc 26] Khai báo biến không gán lại bằng const: event = gọi W._Ba?._sst?._ist?.inst?.getCpSceneStateByType(71) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const event=W._Ba?._sst?._ist?.inst?.getCpSceneStateByType?.(71);
// [VI dòng gốc 27] Khai báo biến không gán lại bằng const: serverTime = gọi Number(W._Sa?.svrTime) để chuyển sang số; next = gọi Number(m?.nxtEnterTime) để chuyển sang số
    const serverTime=Number(W._Sa?.svrTime),next=Number(m?.nxtEnterTime);
// [VI dòng gốc 28] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm day, scheduled, ended, map, type, inside, open, unlocked, cooldownReady, floor, score, passed, rank.
    return {day:c.day,scheduled:[0,1,3,5].includes(c.weekday)&&c.minute>=1260&&c.minute<1290,
// [VI dòng gốc 29] Thuộc tính ended: tính biểu thức c.minute>=1290 | Thuộc tính map: id | Thuộc tính type: dùng biến cùng tên | Thuộc tính inside: tính biểu thức type===71
      ended:c.minute>=1290,map:id,type,inside:type===71,open:Number(event?.[2])===2,
// [VI dòng gốc 30] Thuộc tính unlocked: tính biểu thức W._Ba?._Do?._Ho?.inst?.getFcIsOpen?.(903)===true
      unlocked:W._Ba?._Do?._Ho?.inst?.getFcIsOpen?.(903)===true,
// [VI dòng gốc 31] Thuộc tính cooldownReady: Number.isFinite(serverTime)&&Number.isFinite(next) và chỉ đánh giá vế phải khi vế trái truthy: next<=serverTime
      cooldownReady:Number.isFinite(serverTime)&&Number.isFinite(next)&&next<=serverTime,
      serverTime:Number.isFinite(serverTime)?serverTime:null,nextEnterTime:Number.isFinite(next)?next:null,
// [VI dòng gốc 32] Thuộc tính floor: Number(m?.curLayer) hoặc dùng vế phải khi vế trái falsy: null | Thuộc tính score: m?.score hoặc dùng vế phải khi vế trái là null/undefined: null | Thuộc tính passed: tính biểu thức m?.isPass===true | Thuộc tính rank: m?.getRankInfo?.() hoặc dùng vế phải khi vế trái là null/undefined: null
      floor:Number(m?.curLayer)||null,score:m?.score??null,passed:m?.isPass===true,rank:m?.getRankInfo?.()??null};}
// [VI dòng gốc 33] Chú thích gốc của tác giả; không được thực thi. Nội dung: Ghi diễn biến vào lịch sử nội bộ có giới hạn để truy vết quyết định.
  // Ghi diễn biến vào lịch sử nội bộ có giới hạn để truy vết quyết định.
// [VI dòng gốc 34] Định nghĩa hàm note; tham số: kind | gọi S.history.push({at:Date.now(),kind,phase:S.phase}) để thêm phần tử vào cuối mảng | Kiểm tra S.history.length>50: đúng thì chạy nhánh sau if. | gọi S.history.shift()
  function note(kind){S.history.push({at:Date.now(),kind,phase:S.phase});if(S.history.length>50)S.history.shift();}
// [VI dòng gốc 35] Định nghĩa hàm release; tham số: không có. Mục đích: nhả quyền điều khiển đang giữ | Kiểm tra S.lease: đúng thì chạy nhánh sau if. | gọi W.KVPV?.core?.scene?.release('combat') để nhả quyền điều khiển đang giữ (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gán S.lease bằng false
  function release(){if(S.lease)W.KVPV?.core?.scene?.release?.('combat');S.lease=false;const m=W._Ba?._Co?._Mo?.ins;
// [VI dòng gốc 36] Kiểm tra owned()&&S.stageAuto===true&&m?.auto===false: đúng thì chạy nhánh sau if. | gán m.auto bằng true | gán S.stageAuto bằng null | gán S.session bằng false
    if(owned()&&S.stageAuto===true&&m?.auto===false&&!W.KVPV_EVENT_PRIORITY?.hold?.())m.auto=true;S.stageAuto=null;S.session=false;S.exitAt=0;}
// [VI dòng gốc 37] Định nghĩa hàm reserve; tham số: không có. Mục đích: xin giữ quyền điều khiển cảnh
  function reserve(){
// [VI dòng gốc 38] Khai báo biến không gán lại bằng const: arbiter = đọc W.KVPV?.core?.scene nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); m = đọc W._Ba?._Co?._Mo?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const arbiter=W.KVPV?.core?.scene,m=W._Ba?._Co?._Mo?.ins;
// [VI dòng gốc 39] Kiểm tra W.KVPV_HITRUN1?.status?.(false)?.running: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: false.
    if(W.KVPV_HITRUN1?.status?.(false)?.running)return false;
// [VI dòng gốc 40] Kiểm tra typeof arbiter?.acquire!=='function': đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: false.
    if(typeof arbiter?.acquire!=='function')return false;
// [VI dòng gốc 41] Kiểm tra S.stageAuto===null: đúng thì chạy nhánh sau if. | gán S.stageAuto bằng m?.auto===true
    if(S.stageAuto===null)S.stageAuto=m?.auto===true;
// [VI dòng gốc 42] Kiểm tra m?.auto===true: đúng thì chạy nhánh sau if. | gán m.auto bằng false
    if(m?.auto===true)m.auto=false;
// [VI dòng gốc 43] Kiểm tra arbiter.acquire('combat','thien-the-8-tang')!==true: đúng thì chạy nhánh sau if. | gọi release() để nhả quyền điều khiển đang giữ | Kết thúc hàm hiện tại và trả về: false. | gán S.lease bằng true
    if(arbiter.acquire('combat','thien-the-8-tang')!==true){release();return false;}S.lease=true;return true;
// [VI dòng gốc 44] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 45] Chú thích gốc của tác giả; không được thực thi. Nội dung: Chỉ gửi nhận thưởng khi trạng thái cho phép; chờ trạng thái nhận thành công trước khi xác nhận.
  // Chỉ gửi nhận thưởng khi trạng thái cho phép; chờ trạng thái nhận thành công trước khi xác nhận.
// [VI dòng gốc 46] Định nghĩa hàm claim; tham số: d | Kiểm tra S.claimPending&&Number(d.rank?.[2])===2: đúng thì chạy nhánh sau if. | tăng S.rewardConfirmed một đơn vị sau khi lấy giá trị | gán S.claimPending bằng null
  function claim(d){if(S.claimPending&&Number(d.rank?.[2])===2){S.rewardConfirmed++;S.claimPending=null;note('REWARD-CONFIRMED');}
// [VI dòng gốc 47] Kiểm tra Number(d.rank?.[2])!==1||typeof rpc()?.getMyAwards!=='function': đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(Number(d.rank?.[2])!==1||typeof rpc()?.getMyAwards!=='function')return;
// [VI dòng gốc 48] Khai báo biến không gán lại bằng const: key = tính biểu thức d.day+'/'+String(d.rank?.[0])+'/'+String(d.rank?.[1]) | Kiểm tra S.claimKeys.has(key): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    const key=d.day+'/'+String(d.rank?.[0])+'/'+String(d.rank?.[1]);if(S.claimKeys.has(key))return;
// [VI dòng gốc 49] gọi S.claimKeys.add(key) | gán S.claimPending bằng key | gọi rpc().getMyAwards() | gọi note('REWARD-REQUEST')
    S.claimKeys.add(key);S.claimPending=key;rpc().getMyAwards();note('REWARD-REQUEST');
// [VI dòng gốc 50] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 51] Chú thích gốc của tác giả; không được thực thi. Nội dung: Làm mới kiểu mục tiêu Thiên Thê theo Boss đặc biệt và lựa chọn native hiện tại.
  // Làm mới kiểu mục tiêu Thiên Thê theo Boss đặc biệt và lựa chọn native hiện tại.
// [VI dòng gốc 52] Định nghĩa hàm refreshTarget; tham số: không có | Khai báo biến không gán lại bằng const: m = gọi model() | Kiểm tra !m||typeof m.setAutoTarget!=='function': đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  function refreshTarget(){const m=model();if(!m||typeof m.setAutoTarget!=='function')return;
// [VI dòng gốc 53] Khai báo biến không gán lại bằng const: boss = gọi m.getSpeBossInfo() (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); activeBoss = !!boss?.[1] và chỉ đánh giá vế phải khi vế trái truthy: !boss?.[3]
    const boss=m.getSpeBossInfo?.(),activeBoss=!!boss?.[1]&&!boss?.[3];
// [VI dòng gốc 54] Khai báo biến không gán lại bằng const: target = nếu activeBoss thì lấy 1, ngược lại lấy [1,2].includes(Number(m.getAutoTarget?.()))?Number(m.getAutoTarget()):2
    const target=activeBoss?1:([1,2].includes(Number(m.getAutoTarget?.()))?Number(m.getAutoTarget()):2);
// [VI dòng gốc 55] Kiểm tra target===1: đúng thì chạy nhánh sau if. | gọi m.setFirstBoss(false) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gọi m.setAutoTarget(target, true) | gán S.lastTarget bằng Date.now()
    if(target===1)m.setFirstBoss?.(false);m.setAutoTarget(target,true);S.lastTarget=Date.now();note('NATIVE-TARGET-'+target);
// [VI dòng gốc 56] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 57] Chú thích gốc của tác giả; không được thực thi. Nội dung: Thực hiện một lượt kiểm tra của module; các nhánh bên dưới quyết định có đủ điều kiện để hành động hay phải chờ.
  // Thực hiện một lượt kiểm tra của module; các nhánh bên dưới quyết định có đủ điều kiện để hành động hay phải chờ.
// [VI dòng gốc 58] Định nghĩa hàm tick; tham số: không có. Mục đích: xử lý một nhịp kiểm tra | Kiểm tra W.KVPV_ENTRY_POLICY?.manual===true: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể. | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài.
  function tick(){if(W.KVPV_ENTRY_POLICY?.manual===true)return;try{
// [VI dòng gốc 59] Kiểm tra !C.enabled||!owned(): đúng thì chạy nhánh sau if. | gọi stop() để dừng bộ điều khiển và dọn tài nguyên | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(!C.enabled)return;
    // Session may momentarily be unavailable while the game reconnects.
    // Wait without sending commands; never permanently disable scheduled entry.
    if(!owned()){S.reason='actor_session_unavailable';return;}
// [VI dòng gốc 60] Khai báo biến không gán lại bằng const: d = gọi data(); time = gọi Date.now() | Kiểm tra S.day!==d.day: đúng thì chạy nhánh sau if. | gán S.day bằng d.day | gán S.attempts bằng 0
    const d=data(),time=Date.now();if(S.day!==d.day){S.day=d.day;S.attempts=0;S.claimKeys.clear();}
// [VI dòng gốc 61] Khai báo biến không gán lại bằng const: top = d.inside và chỉ đánh giá vế phải khi vế trái truthy: Number(W._Ba?._$a?._yo?.ins?.intoSce?.[3])===9||d.floor===9; chestDone = tính biểu thức W.KVPV_EIGHT_CHEST?.status?.()?.doneToday===true
    const top=d.inside&&(Number(W._Ba?._$a?._yo?.ins?.intoSce?.[3])===9||d.floor===9),chestDone=W.KVPV_EIGHT_CHEST?.status?.()?.doneToday===true;
// [VI dòng gốc 62] Kiểm tra chestDone||(!top&&d.passed&&Number(d.rank?.[2])===2): đúng thì chạy nhánh sau if. | gán completedDay bằng d.day | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | gọi W.localStorage?.setItem(storage, completedDay) để ghi giá trị vào bộ lưu trữ (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    if(chestDone||(!top&&d.passed&&Number(d.rank?.[2])===2)){completedDay=d.day;try{W.localStorage?.setItem(storage,completedDay);}catch(_){}}
// [VI dòng gốc 63] Kiểm tra d.inside: đúng thì chạy nhánh sau if.
    if(d.inside){
// [VI dòng gốc 64] Kiểm tra !S.session: đúng thì chạy nhánh sau if. | Kiểm tra !reserve(): đúng thì chạy nhánh sau if. | gán S.reason bằng 'scene_reserved_by_other_job' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      if(!S.session){if(!reserve()){S.reason='scene_reserved_by_other_job';return;}S.session=true;S.entries++;S.enteredAt=time;S.lastTarget=-Infinity;rpc()?.getRankInfo?.();note('ENTRY-CONFIRMED');}
// [VI dòng gốc 65] gọi W.KVPV?.core?.scene?.renew('combat') để gia hạn quyền đang giữ (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gọi claim(d)
      W.KVPV?.core?.scene?.renew?.('combat');claim(d);
// [VI dòng gốc 66] Kiểm tra S.phase==='EXITING': đúng thì chạy nhánh sau if. | gán S.reason bằng 'waiting_exit_confirmation' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      if(S.phase==='EXITING'){S.reason='waiting_exit_confirmation';return;}
// [VI dòng gốc 67] Kiểm tra completedDay===d.day&&!S.claimPending&&(!top||chestDone): đúng thì chạy nhánh sau if. | gán S.reason bằng 'completed_and_rewarded_exit' | Kiểm tra typeof sceneRpc()?.rqEtScene==='function': đúng thì chạy nhánh sau if. | gán S.phase bằng 'EXITING'
      if(completedDay===d.day&&!S.claimPending&&(!top||chestDone)){S.reason='completed_and_rewarded_exit';if(typeof sceneRpc()?.rqEtScene==='function'){S.phase='EXITING';sceneRpc().rqEtScene(0);note('COMPLETED-EXIT-REQUEST');}return;}
// [VI dòng gốc 68] Kiểm tra top&&!chestDone: đúng thì chạy nhánh sau if. | gán S.phase bằng 'CLAIMING_CHEST' | gán S.reason bằng 'floor9_waiting_native_chest_ack' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      if(top&&!chestDone){S.phase='CLAIMING_CHEST';S.reason='floor9_waiting_native_chest_ack';return;}
// [VI dòng gốc 69] gán S.phase bằng d.passed?'COMPLETED':'FIGHTING' | gán S.reason bằng d.passed?'server_passed_8_floors':'native_event_combat'
      S.phase=d.passed?'COMPLETED':'FIGHTING';S.reason=d.passed?'server_passed_8_floors':'native_event_combat';
// [VI dòng gốc 70] Kiểm tra W._Ba?._rJ?._O$?.ins?.isDead!==true&&!d.passed&&time-S.lastTarget>=C.targetRefreshMs: đúng thì chạy nhánh sau if. | gọi refreshTarget()
      if(W._Ba?._rJ?._O$?.ins?.isDead!==true&&!d.passed&&time-S.lastTarget>=C.targetRefreshMs)refreshTarget();
// [VI dòng gốc 71] Kiểm tra d.ended&&!d.open: đúng thì chạy nhánh sau if. | Kiểm tra !S.exitAt: đúng thì chạy nhánh sau if. | gán S.exitAt bằng time | Kiểm tra time-S.exitAt>=35000&&typeof sceneRpc()?.rqEtScene==='function': đúng thì chạy nhánh sau if.
      if(d.ended&&!d.open){if(!S.exitAt)S.exitAt=time;if(time-S.exitAt>=35000&&typeof sceneRpc()?.rqEtScene==='function'){
// [VI dòng gốc 72] gán S.phase bằng 'EXITING' | gọi sceneRpc().rqEtScene(0) để gửi yêu cầu vào/ra cảnh qua luồng native | gọi note('EXIT-REQUEST')
        S.phase='EXITING';sceneRpc().rqEtScene(0);note('EXIT-REQUEST');}}
// [VI dòng gốc 73] Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      return;
// [VI dòng gốc 74] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 75] Kiểm tra S.session: đúng thì chạy nhánh sau if. | gọi release() để nhả quyền điều khiển đang giữ | gán S.phase bằng 'WAITING' | gọi rpc()?.getRankInfo() (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    if(S.session){release();S.phase='WAITING';rpc()?.getRankInfo?.();note('LEFT-EVENT');}
// [VI dòng gốc 76] Kiểm tra S.phase==='ENTERING': đúng thì chạy nhánh sau if.
    if(S.phase==='ENTERING'){
// [VI dòng gốc 77] Kiểm tra time-S.lastEntry<C.entryTimeoutMs: đúng thì chạy nhánh sau if. | gán S.reason bằng 'waiting_scene_71' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      if(time-S.lastEntry<C.entryTimeoutMs){S.reason='waiting_scene_71';return;}
// [VI dòng gốc 78] gọi release() để nhả quyền điều khiển đang giữ | gán S.phase bằng 'WAITING' | gán S.reason bằng 'entry_not_confirmed' | gọi note('ENTRY-TIMEOUT')
      release();S.phase='WAITING';S.reason='entry_not_confirmed';note('ENTRY-TIMEOUT');
// [VI dòng gốc 79] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 80] Khai báo biến không gán lại bằng const: quick = gọi W.KVPV_DAILY?.quickState() (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); job = đọc quick?.job nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const quick=W.KVPV_DAILY?.quickState?.(),job=quick?.job;
// [VI dòng gốc 81] Khai báo biến không gán lại bằng const: idle = !job||job==='rảnh' hoặc dùng vế phải khi vế trái falsy: job==='ranh'
    // Daily reports idle in Vietnamese or English depending on its controller.
    const idle=job==null||['','rảnh','ranh','idle'].includes(String(job).trim().toLowerCase());
// [VI dòng gốc 82] Kiểm tra !idle||W.KVPV_TQ_SCOPE?.inside?.()===true||W.KVPV_HITRUN1?.status?.(false)?.running: đúng thì chạy nhánh sau if. | gán S.reason bằng 'other_job_active' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(!idle||W.KVPV_TQ_SCOPE?.inside?.()===true||W.KVPV_HITRUN1?.status?.(false)?.running){S.reason='other_job_active';return;}
// [VI dòng gốc 83] Kiểm tra W._Ba?._$a?.SceneUtil?.isCommonScene!==true: đúng thì chạy nhánh sau if. | gán S.reason bằng 'outside_common_scene' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(W._Ba?._$a?.SceneUtil?.isCommonScene!==true){S.reason='outside_common_scene';return;}
// [VI dòng gốc 84] gọi claim(d)
    claim(d);
// [VI dòng gốc 85] Kiểm tra completedDay===d.day: đúng thì chạy nhánh sau if. | gán S.reason bằng 'completed_and_rewarded_today' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(completedDay===d.day){S.reason='completed_and_rewarded_today';return;}
// [VI dòng gốc 86] Kiểm tra !d.scheduled||!d.open||!d.unlocked: đúng thì chạy nhánh sau if. | gán S.reason bằng 'waiting_schedule_server_open_unlock' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(!d.scheduled||!d.open||!d.unlocked){S.reason='waiting_schedule_server_open_unlock';return;}
// [VI dòng gốc 87] Kiểm tra d.passed: đúng thì chạy nhánh sau if. | gán S.reason bằng 'already_passed' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(d.passed){S.reason='already_passed';return;}
// [VI dòng gốc 88] Kiểm tra W._Ba?._rJ?._O$?.ins?.isDead===true: đúng thì chạy nhánh sau if. | gán S.reason bằng 'dead' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(W._Ba?._rJ?._O$?.ins?.isDead===true){S.reason='dead';return;}
// [VI dòng gốc 89] Kiểm tra W._Ba?._cm?._q3t?.ins?.getHasTeams?.(): đúng thì chạy nhánh sau if. | gán S.reason bằng 'in_team' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(W._Ba?._cm?._q3t?.ins?.getHasTeams?.()){S.reason='in_team';return;}
// [VI dòng gốc 90] Kiểm tra !d.cooldownReady||time-S.lastEntry<C.entryRetryMs||S.attempts>=C.maxEntriesPerDay: đúng thì chạy nhánh sau if. | gán S.reason bằng 'entry_cooldown_or_limit' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(!d.cooldownReady||time-S.lastEntry<C.entryRetryMs||S.attempts>=C.maxEntriesPerDay){S.reason='entry_cooldown_or_limit';return;}
// [VI dòng gốc 91] Kiểm tra typeof sceneRpc()?.rqEtScene!=='function'||!reserve(): đúng thì chạy nhánh sau if. | gán S.reason bằng 'entry_api_or_scene_unavailable' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(typeof sceneRpc()?.rqEtScene!=='function'){
      S.reason='native_entry_api_unavailable';return;
    }
    if(!reserve()){
      S.reason='scene_denied:'+String(W.KVPV?.core?.scene?.reason?.('combat','thien-the-8-tang')??'arbiter_unavailable');
      return;
    }
// [VI dòng gốc 92] gán S.lastEntry bằng time | tăng S.attempts một đơn vị sau khi lấy giá trị | gán S.phase bằng 'ENTERING' | gán S.reason bằng 'waiting_scene_71'
    S.lastEntry=time;S.attempts++;S.phase='ENTERING';S.reason='waiting_scene_71';note('ENTRY-REQUEST');sceneRpc().rqEtScene(7101);
// [VI dòng gốc 93] Nhận lỗi bằng e và chạy phần xử lý lỗi. | gán S.lastError bằng String(e?.message||e) | gán S.reason bằng 'error'
  }catch(e){S.lastError=String(e?.message||e);S.reason='error';}}
// [VI dòng gốc 94] Chú thích gốc của tác giả; không được thực thi. Nội dung: Trả trạng thái hiện tại để kiểm tra; ý nghĩa từng bộ đếm thuộc phạm vi module này.
  // Trả trạng thái hiện tại để kiểm tra; ý nghĩa từng bộ đếm thuộc phạm vi module này.
// [VI dòng gốc 95] Định nghĩa hàm status; tham số: không có. Mục đích: trả trạng thái để kiểm tra | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm các thuộc tính của data(), enabled, phase, reason, entryAttempts, completedDay, doneToday, confirmedEntries, rewardPending, rewardConfirmed, lastError, history.
  function status(){return {...data(),enabled:C.enabled,phase:S.phase,reason:S.reason,entryAttempts:S.attempts,
      actorMatches:!!owned(),timerActive:S.timer!==null,
      dailyJob:W.KVPV_DAILY?.quickState?.()?.job??null,
      commonScene:W._Ba?._$a?.SceneUtil?.isCommonScene===true,
      manualPolicy:W.KVPV_ENTRY_POLICY?.manual===true,
      inTeam:!!W._Ba?._cm?._q3t?.ins?.getHasTeams?.(),
      bossRunning:W.KVPV_HITRUN1?.status?.(false)?.running===true,
// [VI dòng gốc 96] Thuộc tính completedDay: dùng biến cùng tên | Thuộc tính doneToday: tính biểu thức completedDay===data().day | Thuộc tính confirmedEntries: đọc S.entries | Thuộc tính rewardPending: đảo giá trị đúng/sai của !S.claimPending
    completedDay,doneToday:completedDay===data().day,confirmedEntries:S.entries,rewardPending:!!S.claimPending,rewardConfirmed:S.rewardConfirmed,lastError:S.lastError,history:S.history.slice()};}
// [VI dòng gốc 97] Chú thích gốc của tác giả; không được thực thi. Nội dung: Dừng bộ điều khiển, hủy lịch và giải phóng tài nguyên do module này sở hữu.
  // Dừng bộ điều khiển, hủy lịch và giải phóng tài nguyên do module này sở hữu.
// [VI dòng gốc 98] Định nghĩa hàm stop; tham số: không có. Mục đích: dừng bộ điều khiển và dọn tài nguyên | gán C.enabled bằng false | Kiểm tra S.timer!=null: đúng thì chạy nhánh sau if. | gọi W.KVPV_V1?.timers?.clearInterval??W.clearInterval(S.timer)
  function stop(){C.enabled=false;if(S.timer!=null){(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;}release();S.phase='OFF';S.reason='stopped';return {enabled:false};}
// [VI dòng gốc 99] Chú thích gốc của tác giả; không được thực thi. Nội dung: Bật bộ điều khiển và lịch kiểm tra của module; trả trạng thái sau khi khởi động.
  // Bật bộ điều khiển và lịch kiểm tra của module; trả trạng thái sau khi khởi động.
// [VI dòng gốc 100] Định nghĩa hàm start; tham số: không có. Mục đích: khởi động bộ điều khiển | gán C.enabled bằng true | Kiểm tra S.timer==null: đúng thì chạy nhánh sau if. | gán S.timer bằng (W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,C.pollMs)
  function start(){C.enabled=true;if(S.timer==null){const schedule=W.KVPV_V1?.timers?.setInterval??W.setInterval;if(typeof schedule==='function')S.timer=schedule(tick,C.pollMs);}tick();return status();}
// [VI dòng gốc 101] gán W.KVPV_EIGHT_FLOOR bằng Object.freeze({start,stop,status,sync:tick,_handoff:()=>({actor,completedDay,day:S.day,attempts:S.attempts,phase:S.phase,claimKeys:[...S.claimKeys],claimPending:S.claimPending,rewa… | gọi start() để khởi động bộ điều khiển
  W.KVPV_EIGHT_FLOOR=Object.freeze({start,stop,status,sync:tick,_handoff:()=>({actor,completedDay,day:S.day,attempts:S.attempts,phase:S.phase,claimKeys:[...S.claimKeys],claimPending:S.claimPending,rewardConfirmed:S.rewardConfirmed})});start();
// [VI dòng gốc 102] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: })();
})();
// [VI dòng gốc 103] Dòng trống để tách các phần, không có lệnh thực thi.
