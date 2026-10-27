// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: Giám sát reload được: một nguồn thông báo thời hạn tháp; không ẩn lỗi hay thay console toàn cục. [đóng chú thích]
/* Giám sát reload được: một nguồn thông báo thời hạn tháp; không ẩn lỗi hay thay console toàn cục. */
// [VI dòng gốc 2] Chú thích gốc của tác giả; không được thực thi. Nội dung: KVPV V11.0 STABLE: timed-events monitor + non-invasive watchdog + combat/tower guard.
/* KVPV V11.0 STABLE: timed-events monitor + non-invasive watchdog + combat/tower guard.
 * Appended after V10 components. Does NOT send RPC, manipulate game attributes,
 * change original game timers, restart stopped modules, or claim server results.
 */
// [VI dòng gốc 6] Chú thích gốc của tác giả; không được thực thi. Nội dung: KHỐI LÕI 64 — Giám sát sự kiện, chiến đấu và tháp; đọc trạng thái và đưa cảnh báo. [đóng chú thích]
/* KHỐI LÕI 64 — Giám sát sự kiện, chiến đấu và tháp; đọc trạng thái và đưa cảnh báo. */
// [VI dòng gốc 7] chạy ngay hàm bao để tạo phạm vi và khởi tạo phần chức năng bên trong
(() => {
// [VI dòng gốc 8] "use strict"
  'use strict';
// [VI dòng gốc 9] Khai báo biến không gán lại bằng const: W = window; TAG = "[KVPV V11 STABLE]"; VERSION = "11.0.0"
  const W=window, TAG='[KVPV V11 STABLE]', VERSION='11.0.0';
// [VI dòng gốc 10] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | gọi W.KVPV_V11_STABLE?.stop('reload') để dừng bộ điều khiển và dọn tài nguyên (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Nhận lỗi bằng _ và chạy phần xử lý lỗi. | gọi window.KVPV_V1?.diagnostics?.record(_) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  try { W.KVPV_V11_STABLE?.stop?.('reload'); } catch(_){window.KVPV_V1?.diagnostics?.record(_);}
// [VI dòng gốc 11] Khai báo biến không gán lại bằng const: expected = gọi String(W.__KVPV_OWN_ACTOR_ID??'') để chuyển sang chuỗi
  const expected=String(W.__KVPV_OWN_ACTOR_ID??'');
// [VI dòng gốc 12] Khai báo biến không gán lại bằng const: actor = tạo hàm với tham số (không có); mỗi lần gọi trả về gọi String((typeof _Ba==='undefined'?null:_Ba?._rJ?._O$?.ins?.actorId)??'') để chuyển sang chuỗi
  const actor=()=>String((typeof _Ba==='undefined'?null:_Ba?._rJ?._O$?.ins?.actorId)??'');
// [VI dòng gốc 13] Kiểm tra !expected || actor()!==expected || W.__KVPV_UNIVERSAL_HALTED: đúng thì chạy nhánh sau if.
  if (!expected || actor()!==expected || W.__KVPV_UNIVERSAL_HALTED) {
// [VI dòng gốc 14] gọi console.warn(TAG, 'Only install in the original game-frame with the expected actor.')
    console.warn(TAG,'Only install in the original game-frame with the expected actor.');
// [VI dòng gốc 15] Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    return;
// [VI dòng gốc 16] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 17] Khai báo biến không gán lại bằng const: C = tạo đối tượng gồm enabled, normalTickMs, nearEventTickMs, prepareBeforeMs, warnLateMs, towerDeadlineMs, towerWarnBeforeMs, autoRepairHitRunPolling, pollingRepairCooldownMs, errorThreshold, errorCooldownMs, maxHistory, consoleWarnings
  const C={
// [VI dòng gốc 18] Thuộc tính enabled: true | Thuộc tính normalTickMs: 4000 | Thuộc tính nearEventTickMs: 1000
    enabled:true, normalTickMs:4000, nearEventTickMs:1000,
// [VI dòng gốc 19] Thuộc tính prepareBeforeMs: 60000 | Thuộc tính warnLateMs: 4000
    prepareBeforeMs:60000, warnLateMs:4000,
// [VI dòng gốc 20] Thuộc tính towerDeadlineMs: 30000 | Thuộc tính towerWarnBeforeMs: 5000
    towerDeadlineMs:30000, towerWarnBeforeMs:5000,
// [VI dòng gốc 21] Thuộc tính autoRepairHitRunPolling: true | Thuộc tính pollingRepairCooldownMs: 30000
    autoRepairHitRunPolling:true, pollingRepairCooldownMs:30000,
// [VI dòng gốc 22] Thuộc tính errorThreshold: 3 | Thuộc tính errorCooldownMs: 120000 | Thuộc tính maxHistory: 100
    errorThreshold:3, errorCooldownMs:120000, maxHistory:100,
// [VI dòng gốc 23] Thuộc tính consoleWarnings: true
    consoleWarnings:true
// [VI dòng gốc 24] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  };
// [VI dòng gốc 25] Khai báo biến không gán lại bằng const: state = tạo đối tượng gồm timer, running, stoppedByUser, scans, startedAt, lastScanAt, lastGapMs, longestGapMs, delayedWakeups, errors, lastError, lastEvent, nearest, active, notices, history, repairs, lastRepairAt, tower, combat
  const state={timer:null, running:false, stoppedByUser:false, scans:0, startedAt:Date.now(),
// [VI dòng gốc 26] Thuộc tính lastScanAt: 0 | Thuộc tính lastGapMs: 0 | Thuộc tính longestGapMs: 0 | Thuộc tính delayedWakeups: 0
    lastScanAt:0, lastGapMs:0, longestGapMs:0, delayedWakeups:0,
// [VI dòng gốc 27] Thuộc tính errors: gọi Object.create(null) | Thuộc tính lastError: "" | Thuộc tính lastEvent: null | Thuộc tính nearest: null
    errors:Object.create(null), lastError:'', lastEvent:null, nearest:null, active:[],
// [VI dòng gốc 28] Thuộc tính notices: gọi Object.create(null) | Thuộc tính history: tạo mảng gồm 0 vị trí: [] | Thuộc tính repairs: 0 | Thuộc tính lastRepairAt: 0
    notices:Object.create(null), history:[], repairs:0, lastRepairAt:0,
// [VI dòng gốc 29] Thuộc tính tower: tạo đối tượng gồm active, phase, floor, phaseSince, secondsRemaining, warning | Thuộc tính active: false | Thuộc tính phase: "" | Thuộc tính floor: null
    tower:{active:false,phase:'',floor:null,phaseSince:0,secondsRemaining:null,warning:false},
// [VI dòng gốc 30] Thuộc tính combat: tạo đối tượng gồm running, phase, pollEnabled, repairEligible | Thuộc tính running: false | Thuộc tính phase: "off" | Thuộc tính pollEnabled: null
    combat:{running:false,phase:'off',pollEnabled:null,repairEligible:false}};
// [VI dòng gốc 31] Khai báo biến không gán lại bằng const: now = tạo hàm với tham số (không có); mỗi lần gọi trả về gọi Date.now()
  const now=()=>Date.now();
// [VI dòng gốc 32] Khai báo biến không gán lại bằng const: log = tạo hàm với tham số kind, message, extra={}
  const log=(kind,message,extra={})=>{
// [VI dòng gốc 33] gọi state.history.push({time:new Date().toISOString(),kind,message,...extra}) để thêm phần tử vào cuối mảng
    state.history.push({time:new Date().toISOString(),kind,message,...extra});
// [VI dòng gốc 34] Kiểm tra state.history.length>C.maxHistory: đúng thì chạy nhánh sau if. | gọi state.history.splice(0, state.history.length-C.maxHistory)
    if(state.history.length>C.maxHistory)state.history.splice(0,state.history.length-C.maxHistory);
// [VI dòng gốc 35] Kiểm tra kind==='error' || (kind==='warn' && C.consoleWarnings): đúng thì chạy nhánh sau if. | gọi console.warn(TAG, message)
    if(kind==='error' || (kind==='warn' && C.consoleWarnings)) console.warn(TAG,message);
// [VI dòng gốc 36] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  };
// [VI dòng gốc 37] Khai báo biến không gán lại bằng const: valid = tạo hàm với tham số (không có); mỗi lần gọi trả về expected===actor() và chỉ đánh giá vế phải khi vế trái truthy: !W.__KVPV_UNIVERSAL_HALTED
  const valid=()=>expected===actor() && !W.__KVPV_UNIVERSAL_HALTED;
// [VI dòng gốc 38] Định nghĩa hàm oneNotice; tham số: key, msg, kind='info'
  function oneNotice(key,msg,kind='info'){
// [VI dòng gốc 39] Kiểm tra state.notices[key]: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: false.
    if(state.notices[key])return false;
// [VI dòng gốc 40] gán state.notices[key] bằng now() | gọi log(kind, msg) | Kết thúc hàm hiện tại và trả về: true.
    state.notices[key]=now();log(kind,msg);return true;
// [VI dòng gốc 41] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 42] Định nghĩa hàm check; tham số: name, fn
  function check(name,fn){
// [VI dòng gốc 43] Khai báo biến không gán lại bằng const: t = gọi now(); s = state.errors[name] hoặc dùng vế phải khi vế trái falsy: state.errors[name]={count:0,until:0,total:0}
    const t=now(),s=state.errors[name]||(state.errors[name]={count:0,until:0,total:0});
// [VI dòng gốc 44] Kiểm tra t<s.until: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: null.
    if(t<s.until)return null;
// [VI dòng gốc 45] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | Khai báo biến không gán lại bằng const: value = gọi fn() | gán s.count bằng 0 | Kết thúc hàm hiện tại và trả về: value.
    try{const value=fn();s.count=0;return value;}
// [VI dòng gốc 46] Nhận lỗi bằng e và chạy phần xử lý lỗi. | tăng s.total một đơn vị sau khi lấy giá trị | tăng s.count một đơn vị sau khi lấy giá trị | gán state.lastError bằng name+': '+String(e?.message||e)
    catch(e){s.total++;s.count++;state.lastError=name+': '+String(e?.message||e);
// [VI dòng gốc 47] Kiểm tra s.count>=C.errorThreshold: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gán s.until bằng t+C.errorCooldownMs | gán s.count bằng 0 | gọi log('warn', name+' temporarily disabled after failures')
      if(s.count>=C.errorThreshold){s.until=t+C.errorCooldownMs;s.count=0;log('warn',name+' temporarily disabled after failures');}
// [VI dòng gốc 48] gọi log('error', state.lastError)
      else log('error',state.lastError);
// [VI dòng gốc 49] Kết thúc hàm hiện tại và trả về: null.
      return null;
// [VI dòng gốc 50] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 51] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 52] Khai báo biến không gán lại bằng const: hhmm = tạo hàm với tham số v
  const hhmm=v=>{
// [VI dòng gốc 53] Khai báo biến không gán lại bằng const: m = gọi /^(\d\d?):([0-5]\d)$/.exec(String(v))
    const m=/^(\d\d?):([0-5]\d)$/.exec(String(v));
// [VI dòng gốc 54] Kiểm tra !m||+m[1]>23: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: null.
    if(!m||+m[1]>23)return null;
// [VI dòng gốc 55] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm h, m.
    return {h:+m[1],m:+m[2]};
// [VI dòng gốc 56] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  };
// [VI dòng gốc 57] Khai báo biến không gán lại bằng const: DAY_MS = 86400000; VN_MS = tính biểu thức 7*3600000
  const DAY_MS=86400000, VN_MS=7*3600000;
// [VI dòng gốc 58] Khai báo biến không gán lại bằng const: stamp = tạo hàm với tham số vnMidnightUtc, offset, h, m; mỗi lần gọi trả về tính biểu thức vnMidnightUtc+offset*DAY_MS+h*3600000+m*60000-VN_MS
  const stamp=(vnMidnightUtc,offset,h,m)=>vnMidnightUtc+offset*DAY_MS+h*3600000+m*60000-VN_MS;
// [VI dòng gốc 59] Định nghĩa hàm occurrence; tham số: event, t
  function occurrence(event,t){
// [VI dòng gốc 60] Khai báo biến không gán lại bằng const: local = tạo đối tượng bằng Date(t+VN_MS)
    const local=new Date(t+VN_MS);
// [VI dòng gốc 61] Khai báo biến không gán lại bằng const: vnMidnight = gọi Date.UTC(local.getUTCFullYear(), local.getUTCMonth(), local.getUTCDate())
    const vnMidnight=Date.UTC(local.getUTCFullYear(),local.getUTCMonth(),local.getUTCDate());
// [VI dòng gốc 62] Khai báo biến không gán lại bằng const: items = tạo mảng gồm 0 vị trí: []
    const items=[];
// [VI dòng gốc 63] Khai báo biến không gán lại bằng const: add = tạo hàm với tham số start, end, day, kind
    const add=(start,end,day,kind)=>{
// [VI dòng gốc 64] Kiểm tra !start: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      if(!start)return;
// [VI dòng gốc 65] Khai báo biến không gán lại bằng const: target = gọi new Date(vnMidnight+day*DAY_MS).getUTCDay()
      const target=new Date(vnMidnight+day*DAY_MS).getUTCDay();
// [VI dòng gốc 66] Kiểm tra Array.isArray(event.days)&&!event.days.includes(target): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      if(Array.isArray(event.days)&&!event.days.includes(target))return;
// [VI dòng gốc 67] Khai báo biến không gán lại bằng const: at = gọi stamp(vnMidnight, day, start.h, start.m)
      const at=stamp(vnMidnight,day,start.h,start.m);
// [VI dòng gốc 68] Khai báo biến không gán lại bằng const: until = nếu end thì lấy stamp(vnMidnight,day,end.h,end.m), ngược lại lấy at
      const until=end?stamp(vnMidnight,day,end.h,end.m):at;
// [VI dòng gốc 69] Kiểm tra until<t-(kind==='instant'?15000:1000): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      if(until<t-(kind==='instant'?15000:1000))return;
// [VI dòng gốc 70] gọi items.push({key:String(event.key??event.name),name:String(event.name??event.key), kind,at,until,auto:event.action==='auto',action:e…) để thêm phần tử vào cuối mảng
      items.push({key:String(event.key??event.name),name:String(event.name??event.key),
// [VI dòng gốc 71] Thuộc tính kind: dùng biến cùng tên | Thuộc tính at: dùng biến cùng tên | Thuộc tính until: dùng biến cùng tên | Thuộc tính auto: tính biểu thức event.action==='auto'
        kind,at,until,auto:event.action==='auto',action:event.action||'notice',
// [VI dòng gốc 72] Thuộc tính unlock: event.unlock hoặc dùng vế phải khi vế trái falsy: null
        unlock:event.unlock||null});
// [VI dòng gốc 73] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    };
// [VI dòng gốc 74] Lặp for: khởi tạo let day=-1; tiếp tục khi day<=8; sau mỗi vòng day++. | Khai báo biến có thể gán lại bằng let: day = áp dụng toán tử - lên 1
    for(let day=-1;day<=8;day++){
// [VI dòng gốc 75] Duyệt từng giá trị trong event.slots||[] bằng const spec. | Khai báo biến không gán lại bằng const: spec (chưa gán giá trị)
      for(const spec of event.slots||[]){
// [VI dòng gốc 76] Khai báo biến không gán lại bằng const: [a,b] = gọi String(spec).split('-')
        const [a,b]=String(spec).split('-');
// [VI dòng gốc 77] Khai báo biến không gán lại bằng const: begin = gọi hhmm(a); end = gọi hhmm(b)
        const begin=hhmm(a),end=hhmm(b);
// [VI dòng gốc 78] Kiểm tra begin&&end: đúng thì chạy nhánh sau if. | gọi add(begin, end, day, 'window')
        if(begin&&end)add(begin,end,day,'window');
// [VI dòng gốc 79] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
      }
// [VI dòng gốc 80] Duyệt từng giá trị trong event.instants||[] bằng const p. | Khai báo biến không gán lại bằng const: p (chưa gán giá trị) | gọi add(hhmm(p), null, day, 'instant')
      for(const p of event.instants||[])add(hhmm(p),null,day,'instant');
// [VI dòng gốc 81] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 82] Kết thúc hàm hiện tại và trả về: items.
    return items;
// [VI dòng gốc 83] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 84] Định nghĩa hàm eventScan; tham số: t
  function eventScan(t){
// [VI dòng gốc 85] Khai báo biến không gán lại bằng const: events = gọi W.KVPV_DAILY?.lichEvents() (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const events=W.KVPV_DAILY?.lichEvents?.();
// [VI dòng gốc 86] Kiểm tra !Array.isArray(events): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(!Array.isArray(events))return;
// [VI dòng gốc 87] Khai báo biến không gán lại bằng const: options = tạo mảng gồm 0 vị trí: []
    const options=[];
// [VI dòng gốc 88] Duyệt từng giá trị trong events bằng const e. | Khai báo biến không gán lại bằng const: e (chưa gán giá trị) | Kiểm tra e && typeof e==='object': đúng thì chạy nhánh sau if. | gọi options.push(...occurrence(e,t)) để thêm phần tử vào cuối mảng
    for(const e of events){if(e && typeof e==='object')options.push(...occurrence(e,t));}
// [VI dòng gốc 89] gọi options.sort((a,b)=>a.at-b.at) để sắp xếp mảng tại chỗ
    options.sort((a,b)=>a.at-b.at);
// [VI dòng gốc 90] gán state.active bằng options.filter(x=>x.kind==='window'&&x.at<=t&&t<x.until).map(x=>({ key:x.key,name:x.name,endsAt:new Date(x.until).toISOString(),auto:x.auto }))
    state.active=options.filter(x=>x.kind==='window'&&x.at<=t&&t<x.until).map(x=>({
// [VI dòng gốc 91] Thuộc tính key: đọc x.key | Thuộc tính name: đọc x.name | Thuộc tính endsAt: gọi new Date(x.until).toISOString() | Thuộc tính auto: đọc x.auto
      key:x.key,name:x.name,endsAt:new Date(x.until).toISOString(),auto:x.auto
// [VI dòng gốc 92] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }));
// [VI dòng gốc 93] Khai báo biến không gán lại bằng const: upcoming = options.find(x=>x.at>t) hoặc dùng vế phải khi vế trái falsy: null
    const upcoming=options.find(x=>x.at>t)||null;
// [VI dòng gốc 94] gán state.nearest bằng upcoming?{key:upcoming.key,name:upcoming.name, startsAt:new Date(upcoming.at).toISOString(),startsInSeconds:Math.ceil((upcoming.at-t)/1000), action:upcoming.action,unlock:upcoming.…
    state.nearest=upcoming?{key:upcoming.key,name:upcoming.name,
// [VI dòng gốc 95] Thuộc tính startsAt: gọi new Date(upcoming.at).toISOString() | Thuộc tính startsInSeconds: gọi Math.ceil((upcoming.at-t)/1000)
      startsAt:new Date(upcoming.at).toISOString(),startsInSeconds:Math.ceil((upcoming.at-t)/1000),
// [VI dòng gốc 96] Thuộc tính action: đọc upcoming.action | Thuộc tính unlock: đọc upcoming.unlock
      action:upcoming.action,unlock:upcoming.unlock}:null;
// [VI dòng gốc 97] Khai báo biến không gán lại bằng const: relevant = gọi options.filter(x=>Math.abs(x.at-t)<=Math.max(C.prepareBeforeMs,15000)) để giữ phần tử thỏa điều kiện
    const relevant=options.filter(x=>Math.abs(x.at-t)<=Math.max(C.prepareBeforeMs,15000));
// [VI dòng gốc 98] Khai báo biến không gán lại bằng const: localDay = gọi new Date(t+VN_MS).toISOString().slice(0, 10) để lấy một đoạn dữ liệu
    const localDay=new Date(t+VN_MS).toISOString().slice(0,10);
// [VI dòng gốc 99] Duyệt từng giá trị trong relevant bằng const e. | Khai báo biến không gán lại bằng const: e (chưa gán giá trị)
    for(const e of relevant){
// [VI dòng gốc 100] Khai báo biến không gán lại bằng const: key = tính biểu thức localDay+'/'+e.key+'/'+e.at
      const key=localDay+'/'+e.key+'/'+e.at;
// [VI dòng gốc 101] Kiểm tra t>=e.at && t-e.at<=15000: đúng thì chạy nhánh sau if, sai thì chạy nhánh else.
      if(t>=e.at && t-e.at<=15000){
// [VI dòng gốc 102] gán state.lastEvent bằng e.name | gọi oneNotice('open/'+key, 'Event window: '+e.name+' (check server open state)')
        state.lastEvent=e.name;oneNotice('open/'+key,'Event window: '+e.name+' (check server open state)');
// [VI dòng gốc 103] Kiểm tra t<e.at && e.at-t<=C.prepareBeforeMs: đúng thì chạy nhánh sau if.
      }else if(t<e.at && e.at-t<=C.prepareBeforeMs){
// [VI dòng gốc 104] gọi oneNotice('prepare/'+key, 'Upcoming '+e.name+' in '+Math.ceil((e.at-t)/1000)+'s')
        oneNotice('prepare/'+key,'Upcoming '+e.name+' in '+Math.ceil((e.at-t)/1000)+'s');
// [VI dòng gốc 105] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
      }
// [VI dòng gốc 106] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 107] Chú thích gốc của tác giả; không được thực thi. Nội dung: Only diagnostics: an event can be blocked when another job holds the scene.
    // Only diagnostics: an event can be blocked when another job holds the scene.
// [VI dòng gốc 108] Kiểm tra relevant.some(x=>x.at>t && x.at-t<15000): đúng thì chạy nhánh sau if.
    if(relevant.some(x=>x.at>t && x.at-t<15000)){
// [VI dòng gốc 109] Khai báo biến không gán lại bằng const: job = đọc W.KVPV_DAILY?.quickState?.()?.job nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
      const job=W.KVPV_DAILY?.quickState?.()?.job;
// [VI dòng gốc 110] Kiểm tra job && job!=='rảnh': đúng thì chạy nhánh sau if. | gọi oneNotice('busy/'+localDay+'/'+relevant[0].key, 'Event approaching while Daily is busy with '+job, 'warn')
      if(job && job!=='rảnh')oneNotice('busy/'+localDay+'/'+relevant[0].key,
// [VI dòng gốc 111] Tiếp tục hàm eventScan; thành phần cú pháp bắt đầu bằng string. Đọc cùng dòng mở phía trên: 'Event approaching while Daily is busy with '+job,'warn');
        'Event approaching while Daily is busy with '+job,'warn');
// [VI dòng gốc 112] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 113] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 114] Định nghĩa hàm combatScan; tham số: t
  function combatScan(t){
// [VI dòng gốc 115] Khai báo biến không gán lại bằng const: hit = gọi W.KVPV_HITRUN1?.status(false) để trả trạng thái để kiểm tra (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const hit=W.KVPV_HITRUN1?.status?.(false);
// [VI dòng gốc 116] Khai báo biến không gán lại bằng const: poll = gọi W.KVPV_HITRUN_AUTO?.status(false) để trả trạng thái để kiểm tra (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const poll=W.KVPV_HITRUN_AUTO?.status?.(false);
// [VI dòng gốc 117] gán state.combat bằng {running:hit?.running===true,phase:hit?.phase||'off', pollEnabled:poll?.enabled??null,repairEligible:false}
    state.combat={running:hit?.running===true,phase:hit?.phase||'off',
// [VI dòng gốc 118] Thuộc tính pollEnabled: poll?.enabled hoặc dùng vế phải khi vế trái là null/undefined: null | Thuộc tính repairEligible: false
      pollEnabled:poll?.enabled??null,repairEligible:false};
// [VI dòng gốc 119] Kiểm tra !C.autoRepairHitRunPolling||!poll||poll.enabled!==true ||poll.timerActive!==false|| W.KVPV?.combat?.config?.autoArm===false||t-state.startedAt<C.pollingRepairCooldownMs|| t-state.l…: đúng thì chạy nhánh sau if.
    if(!C.autoRepairHitRunPolling||!poll||poll.enabled!==true ||poll.timerActive!==false||
// [VI dòng gốc 120] Tiếp tục hàm combatScan; thành phần cú pháp bắt đầu bằng name. Đọc cùng dòng mở phía trên: W.KVPV?.combat?.config?.autoArm===false||t-state.startedAt<C.pollingRepairCooldownMs||
       W.KVPV?.combat?.config?.autoArm===false||t-state.startedAt<C.pollingRepairCooldownMs||
// [VI dòng gốc 121] Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
       t-state.lastRepairAt<C.pollingRepairCooldownMs)return;
// [VI dòng gốc 122] Kiểm tra typeof W.KVPV_HITRUN_AUTO?.repairPolling!=='function': đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(typeof W.KVPV_HITRUN_AUTO?.repairPolling!=='function')return;
// [VI dòng gốc 123] gán state.combat.repairEligible bằng true
    state.combat.repairEligible=true;
// [VI dòng gốc 124] Chú thích gốc của tác giả; không được thực thi. Nội dung: Existing native helper only repairs a LOST interval, and does not re-arm a Boss attempt.
    // Existing native helper only repairs a LOST interval, and does not re-arm a Boss attempt.
// [VI dòng gốc 125] gán state.lastRepairAt bằng t
    state.lastRepairAt=t;
// [VI dòng gốc 126] Kiểm tra W.KVPV_HITRUN_AUTO.repairPolling()===true: đúng thì chạy nhánh sau if. | tăng state.repairs một đơn vị sau khi lấy giá trị | gọi log('info', 'Repaired lost HitRun polling timer')
    if(W.KVPV_HITRUN_AUTO.repairPolling()===true){state.repairs++;log('info','Repaired lost HitRun polling timer');}
// [VI dòng gốc 127] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 128] Định nghĩa hàm towerScan; tham số: t
  function towerScan(t){
// [VI dòng gốc 129] Khai báo biến không gán lại bằng const: tower = gọi W.KVPV_LINHLUNG922?.status(false) để trả trạng thái để kiểm tra (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const tower=W.KVPV_LINHLUNG922?.status?.(false);
// [VI dòng gốc 130] Kiểm tra !tower?.active: đúng thì chạy nhánh sau if. | gán state.tower bằng {active:false,phase:'',floor:null,phaseSince:0, secondsRemaining:null,warning:false}
    if(!tower?.active){state.tower={active:false,phase:'',floor:null,phaseSince:0,
// [VI dòng gốc 131] Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      secondsRemaining:null,warning:false};return;}
// [VI dòng gốc 132] Khai báo biến không gán lại bằng const: floor = tower.pendingFloor??tower.nextFloor hoặc dùng vế phải khi vế trái là null/undefined: null; phase = tower.phase hoặc dùng vế phải khi vế trái falsy: 'unknown'
    const floor=tower.pendingFloor??tower.nextFloor??null,phase=tower.phase||'unknown';
// [VI dòng gốc 133] Kiểm tra state.tower.phase!==phase||state.tower.floor!==floor||!state.tower.active: đúng thì chạy nhánh sau if.
    if(state.tower.phase!==phase||state.tower.floor!==floor||!state.tower.active){
// [VI dòng gốc 134] gán state.tower bằng {active:true,phase,floor,phaseSince:t,secondsRemaining:null,warning:false}
      state.tower={active:true,phase,floor,phaseSince:t,secondsRemaining:null,warning:false};
// [VI dòng gốc 135] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 136] Kiểm tra phase==='fighting': đúng thì chạy nhánh sau if, sai thì chạy nhánh else.
    if(phase==='fighting'){
// [VI dòng gốc 137] Khai báo biến không gán lại bằng const: elapsed = tính biểu thức t-state.tower.phaseSince
      const elapsed=t-state.tower.phaseSince;
// [VI dòng gốc 138] gán state.tower.secondsRemaining bằng Math.max(0,Math.ceil((C.towerDeadlineMs-elapsed)/1000))
      state.tower.secondsRemaining=Math.max(0,Math.ceil((C.towerDeadlineMs-elapsed)/1000));
// [VI dòng gốc 139] Kiểm tra !state.tower.warning&&elapsed>=C.towerDeadlineMs-C.towerWarnBeforeMs: đúng thì chạy nhánh sau if.
      if(!state.tower.warning&&elapsed>=C.towerDeadlineMs-C.towerWarnBeforeMs){
// [VI dòng gốc 140] gán state.tower.warning bằng true
        state.tower.warning=true;
// [VI dòng gốc 141] Chú thích gốc của tác giả; không được thực thi. Nội dung: Chỉ cập nhật trạng thái: bộ COMBAT phía dưới là nguồn thông báo thời hạn duy nhất.
        // Chỉ cập nhật trạng thái: bộ COMBAT phía dưới là nguồn thông báo thời hạn duy nhất.
// [VI dòng gốc 142] Chú thích gốc của tác giả; không được thực thi. Nội dung: Giữ cảnh báo sự kiện và lỗi thật của STABLE như trước.
        // Giữ cảnh báo sự kiện và lỗi thật của STABLE như trước.
// [VI dòng gốc 143] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
      }
// [VI dòng gốc 144] gán state.tower.secondsRemaining bằng null
    }else state.tower.secondsRemaining=null;
// [VI dòng gốc 145] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 146] Định nghĩa hàm scan; tham số: không có
  function scan(){
// [VI dòng gốc 147] Kiểm tra !state.running: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: gọi status(false) để trả trạng thái để kiểm tra.
    if(!state.running)return status(false);
// [VI dòng gốc 148] Kiểm tra !valid(): đúng thì chạy nhánh sau if.
    if(!valid()){
// [VI dòng gốc 149] gọi log('warn', 'Game-frame actor changed; supervisor stopped') | gọi stop('actor switched') để dừng bộ điều khiển và dọn tài nguyên | Kết thúc hàm hiện tại và trả về: gọi status(false) để trả trạng thái để kiểm tra.
      log('warn','Game-frame actor changed; supervisor stopped');stop('actor switched');return status(false);
// [VI dòng gốc 150] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 151] Khai báo biến không gán lại bằng const: t = gọi now() | tăng state.scans một đơn vị sau khi lấy giá trị
    const t=now();state.scans++;
// [VI dòng gốc 152] Kiểm tra state.lastScanAt: đúng thì chạy nhánh sau if.
    if(state.lastScanAt){
// [VI dòng gốc 153] gán state.lastGapMs bằng t-state.lastScanAt
      state.lastGapMs=t-state.lastScanAt;
// [VI dòng gốc 154] gán state.longestGapMs bằng Math.max(state.longestGapMs,state.lastGapMs)
      state.longestGapMs=Math.max(state.longestGapMs,state.lastGapMs);
// [VI dòng gốc 155] Kiểm tra state.lastGapMs>Math.max(10000,C.normalTickMs*3): đúng thì chạy nhánh sau if.
      if(state.lastGapMs>Math.max(10000,C.normalTickMs*3)){
// [VI dòng gốc 156] tăng state.delayedWakeups một đơn vị sau khi lấy giá trị
        state.delayedWakeups++;
// [VI dòng gốc 157] gọi oneNotice('throttle/'+Math.floor(t/DAY_MS), 'Timer delay detected; browser background throttling can miss event windows', 'warn')
        oneNotice('throttle/'+Math.floor(t/DAY_MS),
// [VI dòng gốc 158] Tiếp tục hàm scan; thành phần cú pháp bắt đầu bằng string. Đọc cùng dòng mở phía trên: 'Timer delay detected; browser background throttling can miss event windows','warn');
          'Timer delay detected; browser background throttling can miss event windows','warn');
// [VI dòng gốc 159] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
      }
// [VI dòng gốc 160] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 161] gán state.lastScanAt bằng t
    state.lastScanAt=t;
// [VI dòng gốc 162] gọi check('events', ()=>eventScan(t))
    check('events',()=>eventScan(t));
// [VI dòng gốc 163] gọi check('combat', ()=>combatScan(t))
    check('combat',()=>combatScan(t));
// [VI dòng gốc 164] gọi check('tower', ()=>towerScan(t))
    check('tower',()=>towerScan(t));
// [VI dòng gốc 165] Kết thúc hàm hiện tại và trả về: gọi status(false) để trả trạng thái để kiểm tra.
    return status(false);
// [VI dòng gốc 166] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 167] Định nghĩa hàm nextDelay; tham số: không có
  function nextDelay(){
// [VI dòng gốc 168] Kiểm tra !state.nearest: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: đọc C.normalTickMs.
    if(!state.nearest)return C.normalTickMs;
// [VI dòng gốc 169] Khai báo biến không gán lại bằng const: s = đọc state.nearest.startsInSeconds
    const s=state.nearest.startsInSeconds;
// [VI dòng gốc 170] Kết thúc hàm hiện tại và trả về: nếu s>=0&&s<=Math.ceil(C.prepareBeforeMs/1000) thì lấy C.nearEventTickMs, ngược lại lấy C.normalTickMs.
    return s>=0&&s<=Math.ceil(C.prepareBeforeMs/1000)?C.nearEventTickMs:C.normalTickMs;
// [VI dòng gốc 171] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 172] Định nghĩa hàm loop; tham số: không có
  function loop(){
// [VI dòng gốc 173] gán state.timer bằng null
    state.timer=null;
// [VI dòng gốc 174] Kiểm tra !state.running: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(!state.running)return;
// [VI dòng gốc 175] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | gọi scan() | Kiểm tra state.running: đúng thì chạy nhánh sau if. | gán state.timer bằng (W.KVPV_V1?.timers?.setTimeout ?? W.setTimeout)(loop,nextDelay())
    try{scan();}finally{if(state.running)state.timer=(W.KVPV_V1?.timers?.setTimeout ?? W.setTimeout)(loop,nextDelay());}
// [VI dòng gốc 176] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 177] Định nghĩa hàm onWake; tham số: không có
  function onWake(){
// [VI dòng gốc 178] Kiểm tra !state.running||!valid(): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(!state.running||!valid())return;
// [VI dòng gốc 179] Kiểm tra state.timer!==null: đúng thì chạy nhánh sau if. | gọi W.KVPV_V1?.timers?.clearTimeout ?? W.clearTimeout(state.timer) | gán state.timer bằng null
    if(state.timer!==null){(W.KVPV_V1?.timers?.clearTimeout ?? W.clearTimeout)(state.timer);state.timer=null;}
// [VI dòng gốc 180] gọi loop()
    loop();
// [VI dòng gốc 181] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 182] Chú thích gốc của tác giả; không được thực thi. Nội dung: Trả trạng thái hiện tại để kiểm tra; ý nghĩa từng bộ đếm thuộc phạm vi module này.
  // Trả trạng thái hiện tại để kiểm tra; ý nghĩa từng bộ đếm thuộc phạm vi module này.
// [VI dòng gốc 183] Định nghĩa hàm status; tham số: print=false. Mục đích: trả trạng thái để kiểm tra
  function status(print=false){
// [VI dòng gốc 184] Khai báo biến không gán lại bằng const: out = tạo đối tượng gồm version, running, actor, scans, nextEvent, activeEvents, delayedWakeups, lastGapMs, longestGapMs, repairs, combat, tower, errors, lastError, history
    const out={version:VERSION,running:state.running,actor:expected,scans:state.scans,
// [VI dòng gốc 185] Thuộc tính nextEvent: đọc state.nearest | Thuộc tính activeEvents: gọi state.active.slice() để lấy một đoạn dữ liệu
      nextEvent:state.nearest,activeEvents:state.active.slice(),
// [VI dòng gốc 186] Thuộc tính delayedWakeups: đọc state.delayedWakeups | Thuộc tính lastGapMs: đọc state.lastGapMs
      delayedWakeups:state.delayedWakeups,lastGapMs:state.lastGapMs,
// [VI dòng gốc 187] Thuộc tính longestGapMs: đọc state.longestGapMs | Thuộc tính repairs: đọc state.repairs | Thuộc tính combat: tạo đối tượng gồm các thuộc tính của state.combat
      longestGapMs:state.longestGapMs,repairs:state.repairs,combat:{...state.combat},
// [VI dòng gốc 188] Thuộc tính tower: tạo đối tượng gồm các thuộc tính của state.tower | Thuộc tính errors: gọi JSON.parse(JSON.stringify(state.errors)) để phân tích dữ liệu đầu vào theo API đang gọi
      tower:{...state.tower},errors:JSON.parse(JSON.stringify(state.errors)),
// [VI dòng gốc 189] Thuộc tính lastError: đọc state.lastError | Thuộc tính history: gọi state.history.slice(-20) để lấy một đoạn dữ liệu
      lastError:state.lastError,history:state.history.slice(-20)};
// [VI dòng gốc 190] Kiểm tra print: đúng thì chạy nhánh sau if. | gọi console.log(TAG, out) | Kiểm tra console.table: đúng thì chạy nhánh sau if. | gọi console.table(out.activeEvents)
    if(print){console.log(TAG,out);if(console.table)console.table(out.activeEvents);}
// [VI dòng gốc 191] Kết thúc hàm hiện tại và trả về: out.
    return out;
// [VI dòng gốc 192] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 193] Chú thích gốc của tác giả; không được thực thi. Nội dung: Dừng bộ điều khiển, hủy lịch và giải phóng tài nguyên do module này sở hữu.
  // Dừng bộ điều khiển, hủy lịch và giải phóng tài nguyên do module này sở hữu.
// [VI dòng gốc 194] Định nghĩa hàm stop; tham số: reason='manual'. Mục đích: dừng bộ điều khiển và dọn tài nguyên
  function stop(reason='manual'){
// [VI dòng gốc 195] gán state.running bằng false | gán state.stoppedByUser bằng reason==='manual'
    state.running=false;state.stoppedByUser=reason==='manual';
// [VI dòng gốc 196] Kiểm tra state.timer!==null: đúng thì chạy nhánh sau if. | gọi W.KVPV_V1?.timers?.clearTimeout ?? W.clearTimeout(state.timer) | gán state.timer bằng null
    if(state.timer!==null){(W.KVPV_V1?.timers?.clearTimeout ?? W.clearTimeout)(state.timer);state.timer=null;}
// [VI dòng gốc 197] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | gọi document.removeEventListener('visibilitychange', onWake) để gỡ bộ xử lý sự kiện | Nhận lỗi bằng _ và chạy phần xử lý lỗi. | gọi window.KVPV_V1?.diagnostics?.record(_) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    try{document.removeEventListener('visibilitychange',onWake);}catch(_){window.KVPV_V1?.diagnostics?.record(_);}
// [VI dòng gốc 198] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | gọi W.removeEventListener('focus', onWake) để gỡ bộ xử lý sự kiện | Nhận lỗi bằng _ và chạy phần xử lý lỗi. | gọi window.KVPV_V1?.diagnostics?.record(_) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    try{W.removeEventListener('focus',onWake);}catch(_){window.KVPV_V1?.diagnostics?.record(_);}
// [VI dòng gốc 199] gọi log('info', 'Supervisor stopped: '+reason)
    log('info','Supervisor stopped: '+reason);
// [VI dòng gốc 200] Kết thúc hàm hiện tại và trả về: gọi status(false) để trả trạng thái để kiểm tra.
    return status(false);
// [VI dòng gốc 201] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 202] Chú thích gốc của tác giả; không được thực thi. Nội dung: Bật bộ điều khiển và lịch kiểm tra của module; trả trạng thái sau khi khởi động.
  // Bật bộ điều khiển và lịch kiểm tra của module; trả trạng thái sau khi khởi động.
// [VI dòng gốc 203] Định nghĩa hàm start; tham số: không có. Mục đích: khởi động bộ điều khiển
  function start(){
// [VI dòng gốc 204] Kiểm tra state.running: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: gọi status(false) để trả trạng thái để kiểm tra.
    if(state.running)return status(false);
// [VI dòng gốc 205] Kiểm tra !valid(): đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('Wrong account/game-frame')
    if(!valid())throw Error('Wrong account/game-frame');
// [VI dòng gốc 206] gán state.running bằng true | gán state.stoppedByUser bằng false
    state.running=true;state.stoppedByUser=false;
// [VI dòng gốc 207] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | gọi document.addEventListener('visibilitychange', onWake) để đăng ký bộ xử lý sự kiện | Nhận lỗi bằng _ và chạy phần xử lý lỗi. | gọi window.KVPV_V1?.diagnostics?.record(_) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    try{document.addEventListener('visibilitychange',onWake);}catch(_){window.KVPV_V1?.diagnostics?.record(_);}
// [VI dòng gốc 208] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | gọi W.addEventListener('focus', onWake) để đăng ký bộ xử lý sự kiện | Nhận lỗi bằng _ và chạy phần xử lý lỗi. | gọi window.KVPV_V1?.diagnostics?.record(_) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    try{W.addEventListener('focus',onWake);}catch(_){window.KVPV_V1?.diagnostics?.record(_);}
// [VI dòng gốc 209] gọi loop() | Kết thúc hàm hiện tại và trả về: gọi status(false) để trả trạng thái để kiểm tra.
    loop();return status(false);
// [VI dòng gốc 210] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 211] gán W.KVPV_V11_STABLE bằng Object.freeze({version:VERSION,config:C,start,stop,scan,status, history:()=>state.history.slice(),eventPlan:()=>state.nearest})
  W.KVPV_V11_STABLE=Object.freeze({version:VERSION,config:C,start,stop,scan,status,
// [VI dòng gốc 212] Thuộc tính history: tạo hàm với tham số (không có); mỗi lần gọi trả về gọi state.history.slice() để lấy một đoạn dữ liệu | Thuộc tính eventPlan: tạo hàm với tham số (không có); mỗi lần gọi trả về đọc state.nearest
    history:()=>state.history.slice(),eventPlan:()=>state.nearest});
// [VI dòng gốc 213] gọi start() để khởi động bộ điều khiển
  start();
// [VI dòng gốc 214] gọi console.info(TAG, 'Loaded: read-only schedule and tower monitor + guarded HitRun polling repair.')
  console.info(TAG,'Loaded: read-only schedule and tower monitor + guarded HitRun polling repair.');
// [VI dòng gốc 215] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: })();
})();
// [VI dòng gốc 216] Chú thích gốc của tác giả; không được thực thi. Nội dung: KVPV V11.1: Combat/tower supervisory helper.
/* KVPV V11.1: Combat/tower supervisory helper.
 * Works with the existing native HitRun and Tower controllers. Does not forge
 * server results, write character stats, send additional RPC or bypass manual stop.
 */
// [VI dòng gốc 220] Chú thích gốc của tác giả; không được thực thi. Nội dung: KHỐI LÕI 65 — Giám sát phối hợp combat/tháp với các bộ điều khiển đang hoạt động. [đóng chú thích]
/* KHỐI LÕI 65 — Giám sát phối hợp combat/tháp với các bộ điều khiển đang hoạt động. */
// [VI dòng gốc 221] chạy ngay hàm bao để tạo phạm vi và khởi tạo phần chức năng bên trong
(() => {
// [VI dòng gốc 222] "use strict"
  'use strict';
// [VI dòng gốc 223] Khai báo biến không gán lại bằng const: W = window; TAG = "[KVPV V11.1 COMBAT]"; VERSION = "11.1.0"
  const W=window, TAG='[KVPV V11.1 COMBAT]', VERSION='11.1.0';
// [VI dòng gốc 224] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | gọi W.KVPV_V111_COMBAT?.stop('reload') để dừng bộ điều khiển và dọn tài nguyên (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Nhận lỗi bằng _ và chạy phần xử lý lỗi. | gọi window.KVPV_V1?.diagnostics?.record(_) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  try{W.KVPV_V111_COMBAT?.stop?.('reload');}catch(_){window.KVPV_V1?.diagnostics?.record(_);}
// [VI dòng gốc 225] Khai báo biến không gán lại bằng const: actor = gọi String(W.__KVPV_OWN_ACTOR_ID??'') để chuyển sang chuỗi
  const actor=String(W.__KVPV_OWN_ACTOR_ID??'');
// [VI dòng gốc 226] Khai báo biến không gán lại bằng const: readActor = tạo hàm với tham số (không có); mỗi lần gọi trả về gọi String((typeof _Ba!=='undefined'?_Ba?._rJ?._O$?.ins?.actorId:null)??'') để chuyển sang chuỗi
  const readActor=()=>String((typeof _Ba!=='undefined'?_Ba?._rJ?._O$?.ins?.actorId:null)??'');
// [VI dòng gốc 227] Kiểm tra !actor||actor!==readActor()||W.__KVPV_UNIVERSAL_HALTED: đúng thì chạy nhánh sau if.
  if(!actor||actor!==readActor()||W.__KVPV_UNIVERSAL_HALTED){
// [VI dòng gốc 228] gọi console.warn(TAG, 'Load FULL in original game-frame with matching actor') | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    console.warn(TAG,'Load FULL in original game-frame with matching actor');return;
// [VI dòng gốc 229] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 230] Khai báo biến không gán lại bằng const: C = tạo đối tượng gồm regularScanMs, towerScanMs, deadlineEstimateMs, warningBeforeMs, fastTowerBossScan, maxBossScansPerFloor, minBossScanIntervalMs, maxHistory
  const C={
// [VI dòng gốc 231] Thuộc tính regularScanMs: 2000 | Thuộc tính towerScanMs: 750
    regularScanMs:2000, towerScanMs:750,
// [VI dòng gốc 232] Thuộc tính deadlineEstimateMs: 30000 | Thuộc tính warningBeforeMs: 5000
    deadlineEstimateMs:30000, warningBeforeMs:5000,
// [VI dòng gốc 233] Thuộc tính fastTowerBossScan: true | Thuộc tính maxBossScansPerFloor: 12
    fastTowerBossScan:true, maxBossScansPerFloor:12,
// [VI dòng gốc 234] Thuộc tính minBossScanIntervalMs: 700 | Thuộc tính maxHistory: 80
    minBossScanIntervalMs:700, maxHistory:80
// [VI dòng gốc 235] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  };
// [VI dòng gốc 236] Khai báo biến không gán lại bằng const: S = tạo đối tượng gồm running, timer, scans, actor, startedAt, errors, lastError, lastWarnAt, history, tower, combat, lastFloorKey, lastBossScanAt, warnedKey, lateKey
  const S={running:false,timer:null,scans:0,actor,startedAt:0,
// [VI dòng gốc 237] Thuộc tính errors: 0 | Thuộc tính lastError: "" | Thuộc tính lastWarnAt: 0 | Thuộc tính history: tạo mảng gồm 0 vị trí: []
    errors:0,lastError:'',lastWarnAt:0,history:[],
// [VI dòng gốc 238] Thuộc tính tower: tạo đối tượng gồm active, phase, floor, battleStartedAt, remainingSeconds, late, bossScans | Thuộc tính active: false | Thuộc tính phase: "off" | Thuộc tính floor: null
    tower:{active:false,phase:'off',floor:null,battleStartedAt:null,
// [VI dòng gốc 239] Thuộc tính remainingSeconds: null | Thuộc tính late: false | Thuộc tính bossScans: 0
      remainingSeconds:null,late:false,bossScans:0},
// [VI dòng gốc 240] Thuộc tính combat: tạo đối tượng gồm running, phase, stallRecoveries, stallsInRow | Thuộc tính running: false | Thuộc tính phase: "off" | Thuộc tính stallRecoveries: 0
    combat:{running:false,phase:'off',stallRecoveries:0,stallsInRow:0},
// [VI dòng gốc 241] Thuộc tính lastFloorKey: "" | Thuộc tính lastBossScanAt: 0 | Thuộc tính warnedKey: "" | Thuộc tính lateKey: ""
    lastFloorKey:'',lastBossScanAt:0,warnedKey:'',lateKey:''};
// [VI dòng gốc 242] Khai báo biến không gán lại bằng const: at = tạo hàm với tham số (không có); mỗi lần gọi trả về gọi Date.now()
  const at=()=>Date.now();
// [VI dòng gốc 243] Khai báo biến không gán lại bằng const: valid = tạo hàm với tham số (không có); mỗi lần gọi trả về actor===readActor() và chỉ đánh giá vế phải khi vế trái truthy: !W.__KVPV_UNIVERSAL_HALTED
  const valid=()=>actor===readActor()&&!W.__KVPV_UNIVERSAL_HALTED;
// [VI dòng gốc 244] Chú thích gốc của tác giả; không được thực thi. Nội dung: Ghi diễn biến vào lịch sử nội bộ có giới hạn để truy vết quyết định.
  // Ghi diễn biến vào lịch sử nội bộ có giới hạn để truy vết quyết định.
// [VI dòng gốc 245] Định nghĩa hàm note; tham số: level, msg
  function note(level,msg){
// [VI dòng gốc 246] gọi S.history.push({time:new Date().toISOString(),level,msg}) để thêm phần tử vào cuối mảng
    S.history.push({time:new Date().toISOString(),level,msg});
// [VI dòng gốc 247] Kiểm tra S.history.length>C.maxHistory: đúng thì chạy nhánh sau if. | gọi S.history.splice(0, S.history.length-C.maxHistory)
    if(S.history.length>C.maxHistory)S.history.splice(0,S.history.length-C.maxHistory);
// [VI dòng gốc 248] Kiểm tra level==='warn': đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gọi console.warn(TAG, msg)
    if(level==='warn')console.warn(TAG,msg);
// [VI dòng gốc 249] Kiểm tra level==='info'&&msg.startsWith('Linh Lung tầng '): đúng thì chạy nhánh sau if. | gọi console.info(TAG, msg)
    else if(level==='info'&&msg.startsWith('Linh Lung tầng '))console.info(TAG,msg);
// [VI dòng gốc 250] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 251] Khai báo biến không gán lại bằng const: obtain = tạo hàm với tham số fn | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | Kết thúc hàm hiện tại và trả về: fn() hoặc dùng vế phải khi vế trái falsy: null. | Nhận lỗi bằng e và chạy phần xử lý lỗi.
  const obtain=(fn)=>{try{return fn()||null;}catch(e){S.errors++;
// [VI dòng gốc 252] gán S.lastError bằng String(e?.message||e) | Kết thúc hàm hiện tại và trả về: null.
    S.lastError=String(e?.message||e);return null;}};
// [VI dòng gốc 253] Định nghĩa hàm scan; tham số: không có
  function scan(){
// [VI dòng gốc 254] Kiểm tra !S.running: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: gọi status(false) để trả trạng thái để kiểm tra.
    if(!S.running)return status(false);
// [VI dòng gốc 255] Kiểm tra !valid(): đúng thì chạy nhánh sau if. | gọi stop('actor switched / halted') để dừng bộ điều khiển và dọn tài nguyên | Kết thúc hàm hiện tại và trả về: gọi status(false) để trả trạng thái để kiểm tra.
    if(!valid()){stop('actor switched / halted');return status(false);}
// [VI dòng gốc 256] tăng S.scans một đơn vị sau khi lấy giá trị
    S.scans++;
// [VI dòng gốc 257] Khai báo biến không gán lại bằng const: hr = gọi obtain(()=>W.KVPV_HITRUN1?.status?.(false))
    const hr=obtain(()=>W.KVPV_HITRUN1?.status?.(false));
// [VI dòng gốc 258] gán S.combat bằng {running:hr?.running===true,phase:hr?.phase||'off', stallRecoveries:hr?.stallRecoveries??0,stallsInRow:hr?.consecutiveStallCycles??0}
    S.combat={running:hr?.running===true,phase:hr?.phase||'off',
// [VI dòng gốc 259] Thuộc tính stallRecoveries: hr?.stallRecoveries hoặc dùng vế phải khi vế trái là null/undefined: 0 | Thuộc tính stallsInRow: hr?.consecutiveStallCycles hoặc dùng vế phải khi vế trái là null/undefined: 0
      stallRecoveries:hr?.stallRecoveries??0,stallsInRow:hr?.consecutiveStallCycles??0};
// [VI dòng gốc 260] Khai báo biến không gán lại bằng const: tower = gọi obtain(()=>W.KVPV_LINHLUNG922?.status?.(false))
    const tower=obtain(()=>W.KVPV_LINHLUNG922?.status?.(false));
// [VI dòng gốc 261] Kiểm tra !tower?.active: đúng thì chạy nhánh sau if.
    if(!tower?.active){
// [VI dòng gốc 262] gán S.tower bằng {active:false,phase:'off',floor:null,battleStartedAt:null, remainingSeconds:null,late:false,bossScans:0}
      S.tower={active:false,phase:'off',floor:null,battleStartedAt:null,
// [VI dòng gốc 263] Thuộc tính remainingSeconds: null | Thuộc tính late: false | Thuộc tính bossScans: 0
        remainingSeconds:null,late:false,bossScans:0};
// [VI dòng gốc 264] gán S.lastFloorKey bằng '' | Kết thúc hàm hiện tại và trả về: gọi status(false) để trả trạng thái để kiểm tra.
      S.lastFloorKey='';return status(false);
// [VI dòng gốc 265] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 266] Khai báo biến không gán lại bằng const: fighting = tính biểu thức tower.phase==='fighting'
    const fighting=tower.phase==='fighting';
// [VI dòng gốc 267] Khai báo biến không gán lại bằng const: floor = tower.pendingFloor hoặc dùng vế phải khi vế trái là null/undefined: null
    const floor=tower.pendingFloor??null;
// [VI dòng gốc 268] Khai báo biến không gán lại bằng const: started = Number(tower.battleStartedAt) hoặc dùng vế phải khi vế trái falsy: null
    const started=Number(tower.battleStartedAt)||null;
// [VI dòng gốc 269] Khai báo biến không gán lại bằng const: floorKey = tính biểu thức String(floor)+'@'+String(started)
    const floorKey=String(floor)+'@'+String(started);
// [VI dòng gốc 270] Kiểm tra S.lastFloorKey!==floorKey: đúng thì chạy nhánh sau if.
    if(S.lastFloorKey!==floorKey){
// [VI dòng gốc 271] gán S.lastFloorKey bằng floorKey | gán S.lastBossScanAt bằng 0 | gán S.warnedKey bằng '' | gán S.lateKey bằng ''
      S.lastFloorKey=floorKey;S.lastBossScanAt=0;S.warnedKey='';S.lateKey='';
// [VI dòng gốc 272] gán S.tower.bossScans bằng 0
      S.tower.bossScans=0;
// [VI dòng gốc 273] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 274] Khai báo biến không gán lại bằng const: elapsed = nếu fighting&&started thì lấy Math.max(0,at()-started), ngược lại lấy null
    const elapsed=fighting&&started?Math.max(0,at()-started):null;
// [VI dòng gốc 275] Khai báo biến không gán lại bằng const: remain = nếu elapsed===null thì lấy null, ngược lại lấy Math.max(0,Math.ceil((C.deadlineEstimateMs-elapsed)/1000))
    const remain=elapsed===null?null:Math.max(0,Math.ceil((C.deadlineEstimateMs-elapsed)/1000));
// [VI dòng gốc 276] gán S.tower bằng {active:true,phase:tower.phase||'unknown',floor, battleStartedAt:started,remainingSeconds:remain, late:elapsed!==null&&elapsed>=C.deadlineEstimateMs, bossScans:S.tower.bossScans}
    S.tower={active:true,phase:tower.phase||'unknown',floor,
// [VI dòng gốc 277] Thuộc tính battleStartedAt: started | Thuộc tính remainingSeconds: remain
      battleStartedAt:started,remainingSeconds:remain,
// [VI dòng gốc 278] Thuộc tính late: elapsed!==null và chỉ đánh giá vế phải khi vế trái truthy: elapsed>=C.deadlineEstimateMs
      late:elapsed!==null&&elapsed>=C.deadlineEstimateMs,
// [VI dòng gốc 279] Thuộc tính bossScans: đọc S.tower.bossScans
      bossScans:S.tower.bossScans};
// [VI dòng gốc 280] Kiểm tra fighting&&elapsed!==null: đúng thì chạy nhánh sau if.
    if(fighting&&elapsed!==null){
// [VI dòng gốc 281] Kiểm tra elapsed>=C.deadlineEstimateMs && S.lateKey!==floorKey: đúng thì chạy nhánh sau if, sai thì chạy nhánh else.
      if(elapsed>=C.deadlineEstimateMs && S.lateKey!==floorKey){
// [VI dòng gốc 282] gán S.lateKey bằng floorKey
        S.lateKey=floorKey;
// [VI dòng gốc 283] gọi note('info', 'Linh Lung tầng '+floor+': hết cửa sổ 30s cục bộ; chờ kết quả native')
        note('info','Linh Lung tầng '+floor+': hết cửa sổ 30s cục bộ; chờ kết quả native');
// [VI dòng gốc 284] Kiểm tra elapsed>=C.deadlineEstimateMs-C.warningBeforeMs&&S.warnedKey!==floorKey: đúng thì chạy nhánh sau if.
      }else if(elapsed>=C.deadlineEstimateMs-C.warningBeforeMs&&S.warnedKey!==floorKey){
// [VI dòng gốc 285] gán S.warnedKey bằng floorKey
        S.warnedKey=floorKey;
// [VI dòng gốc 286] gọi note('info', 'Linh Lung tầng '+floor+': còn dưới 5s theo đồng hồ cục bộ')
        note('info','Linh Lung tầng '+floor+': còn dưới 5s theo đồng hồ cục bộ');
// [VI dòng gốc 287] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
      }
// [VI dòng gốc 288] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 289] Chú thích gốc của tác giả; không được thực thi. Nội dung: Assist only when the original Boss-only auto-arm was already enabled.
    // Assist only when the original Boss-only auto-arm was already enabled.
// [VI dòng gốc 290] Chú thích gốc của tác giả; không được thực thi. Nội dung: Its own attemptedKey prevents duplicate boss starts; never calls rearm().
    // Its own attemptedKey prevents duplicate boss starts; never calls rearm().
// [VI dòng gốc 291] Kiểm tra fighting && started && C.fastTowerBossScan && S.tower.bossScans<C.maxBossScansPerFloor && at()-S.lastBossScanAt>=C.minBossScanIntervalMs && W.KVPV?.combat?.config?.autoArm!==false …: đúng thì chạy nhánh sau if.
    if(fighting && started && C.fastTowerBossScan &&
// [VI dòng gốc 292] Tiếp tục hàm scan; thành phần cú pháp bắt đầu bằng name. Đọc cùng dòng mở phía trên: S.tower.bossScans<C.maxBossScansPerFloor &&
       S.tower.bossScans<C.maxBossScansPerFloor &&
// [VI dòng gốc 293] gọi at()
       at()-S.lastBossScanAt>=C.minBossScanIntervalMs &&
// [VI dòng gốc 294] Tiếp tục hàm scan; thành phần cú pháp bắt đầu bằng name. Đọc cùng dòng mở phía trên: W.KVPV?.combat?.config?.autoArm!==false && !S.combat.running){
       W.KVPV?.combat?.config?.autoArm!==false && !S.combat.running){
// [VI dòng gốc 295] Khai báo biến không gán lại bằng const: poll = gọi obtain(()=>W.KVPV_HITRUN_AUTO?.status?.(false))
      const poll=obtain(()=>W.KVPV_HITRUN_AUTO?.status?.(false));
// [VI dòng gốc 296] Kiểm tra poll?.enabled===true && poll?.timerActive===true && ['waiting-for-boss','scene-busy'].includes(poll.lastMode) && typeof W.KVPV_HITRUN_AUTO.scan==='function': đúng thì chạy nhánh sau if.
      if(poll?.enabled===true && poll?.timerActive===true &&
// [VI dòng gốc 297] gọi ['waiting-for-boss','scene-busy'].includes(poll.lastMode) để kiểm tra dữ liệu có chứa giá trị
         ['waiting-for-boss','scene-busy'].includes(poll.lastMode) &&
// [VI dòng gốc 298] Tiếp tục hàm scan; thành phần cú pháp bắt đầu bằng typeof. Đọc cùng dòng mở phía trên: typeof W.KVPV_HITRUN_AUTO.scan==='function'){
         typeof W.KVPV_HITRUN_AUTO.scan==='function'){
// [VI dòng gốc 299] tăng S.tower.bossScans một đơn vị sau khi lấy giá trị
        S.tower.bossScans++;
// [VI dòng gốc 300] gán S.lastBossScanAt bằng at()
        S.lastBossScanAt=at();
// [VI dòng gốc 301] gọi obtain(()=>W.KVPV_HITRUN_AUTO.scan())
        obtain(()=>W.KVPV_HITRUN_AUTO.scan());
// [VI dòng gốc 302] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
      }
// [VI dòng gốc 303] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 304] Kết thúc hàm hiện tại và trả về: gọi status(false) để trả trạng thái để kiểm tra.
    return status(false);
// [VI dòng gốc 305] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 306] Định nghĩa hàm loop; tham số: không có
  function loop(){
// [VI dòng gốc 307] gán S.timer bằng null
    S.timer=null;
// [VI dòng gốc 308] Kiểm tra !S.running: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(!S.running)return;
// [VI dòng gốc 309] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | gọi scan() | Nhận lỗi bằng e và chạy phần xử lý lỗi. | tăng S.errors một đơn vị sau khi lấy giá trị
    try{scan();}catch(e){S.errors++;S.lastError=String(e);}
// [VI dòng gốc 310] Kiểm tra S.running: đúng thì chạy nhánh sau if. | gán S.timer bằng (W.KVPV_V1?.timers?.setTimeout ?? W.setTimeout)(loop, S.tower.active&&S.tower.phase==='fighting'?C.towerScanMs:C.regularScanMs)
    finally{if(S.running)S.timer=(W.KVPV_V1?.timers?.setTimeout ?? W.setTimeout)(loop,
// [VI dòng gốc 311] Tiếp tục hàm loop; thành phần cú pháp bắt đầu bằng name. Đọc cùng dòng mở phía trên: S.tower.active&&S.tower.phase==='fighting'?C.towerScanMs:C.regularScanMs);}
      S.tower.active&&S.tower.phase==='fighting'?C.towerScanMs:C.regularScanMs);}
// [VI dòng gốc 312] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 313] Chú thích gốc của tác giả; không được thực thi. Nội dung: Trả trạng thái hiện tại để kiểm tra; ý nghĩa từng bộ đếm thuộc phạm vi module này.
  // Trả trạng thái hiện tại để kiểm tra; ý nghĩa từng bộ đếm thuộc phạm vi module này.
// [VI dòng gốc 314] Định nghĩa hàm status; tham số: print=false. Mục đích: trả trạng thái để kiểm tra
  function status(print=false){
// [VI dòng gốc 315] Khai báo biến không gán lại bằng const: out = tạo đối tượng gồm version, running, actor, scans, tower, combat, errors, lastError, history
    const out={version:VERSION,running:S.running,actor,scans:S.scans,
// [VI dòng gốc 316] Thuộc tính tower: tạo đối tượng gồm các thuộc tính của S.tower | Thuộc tính combat: tạo đối tượng gồm các thuộc tính của S.combat | Thuộc tính errors: đọc S.errors
      tower:{...S.tower},combat:{...S.combat},errors:S.errors,
// [VI dòng gốc 317] Thuộc tính lastError: đọc S.lastError | Thuộc tính history: gọi S.history.slice(-20) để lấy một đoạn dữ liệu
      lastError:S.lastError,history:S.history.slice(-20)};
// [VI dòng gốc 318] Kiểm tra print: đúng thì chạy nhánh sau if. | gọi console.log(TAG, out)
    if(print)console.log(TAG,out);
// [VI dòng gốc 319] Kết thúc hàm hiện tại và trả về: out.
    return out;
// [VI dòng gốc 320] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 321] Chú thích gốc của tác giả; không được thực thi. Nội dung: Dừng bộ điều khiển, hủy lịch và giải phóng tài nguyên do module này sở hữu.
  // Dừng bộ điều khiển, hủy lịch và giải phóng tài nguyên do module này sở hữu.
// [VI dòng gốc 322] Định nghĩa hàm stop; tham số: reason='manual'. Mục đích: dừng bộ điều khiển và dọn tài nguyên
  function stop(reason='manual'){
// [VI dòng gốc 323] gán S.running bằng false
    S.running=false;
// [VI dòng gốc 324] Kiểm tra S.timer!==null: đúng thì chạy nhánh sau if. | gọi W.KVPV_V1?.timers?.clearTimeout ?? W.clearTimeout(S.timer) | gán S.timer bằng null
    if(S.timer!==null){(W.KVPV_V1?.timers?.clearTimeout ?? W.clearTimeout)(S.timer);S.timer=null;}
// [VI dòng gốc 325] gọi note('info', 'Stopped: '+reason)
    note('info','Stopped: '+reason);
// [VI dòng gốc 326] Kết thúc hàm hiện tại và trả về: gọi status(false) để trả trạng thái để kiểm tra.
    return status(false);
// [VI dòng gốc 327] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 328] Chú thích gốc của tác giả; không được thực thi. Nội dung: Bật bộ điều khiển và lịch kiểm tra của module; trả trạng thái sau khi khởi động.
  // Bật bộ điều khiển và lịch kiểm tra của module; trả trạng thái sau khi khởi động.
// [VI dòng gốc 329] Định nghĩa hàm start; tham số: không có. Mục đích: khởi động bộ điều khiển
  function start(){
// [VI dòng gốc 330] Kiểm tra S.running: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: gọi status(false) để trả trạng thái để kiểm tra.
    if(S.running)return status(false);
// [VI dòng gốc 331] Kiểm tra !valid(): đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('Actor changed: refuse to start')
    if(!valid())throw Error('Actor changed: refuse to start');
// [VI dòng gốc 332] gán S.running bằng true | gán S.startedAt bằng at() | gọi loop()
    S.running=true;S.startedAt=at();loop();
// [VI dòng gốc 333] Kết thúc hàm hiện tại và trả về: gọi status(false) để trả trạng thái để kiểm tra.
    return status(false);
// [VI dòng gốc 334] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 335] gán W.KVPV_V111_COMBAT bằng Object.freeze({version:VERSION,config:C, start,stop,scan,status,history:()=>S.history.slice()})
  W.KVPV_V111_COMBAT=Object.freeze({version:VERSION,config:C,
// [VI dòng gốc 336] Thuộc tính start: dùng biến cùng tên | Thuộc tính stop: dùng biến cùng tên | Thuộc tính scan: dùng biến cùng tên | Thuộc tính status: dùng biến cùng tên
    start,stop,scan,status,history:()=>S.history.slice()});
// [VI dòng gốc 337] gọi start() để khởi động bộ điều khiển
  start();
// [VI dòng gốc 338] gọi console.info(TAG, 'Active: adaptive retreat diagnostics + 30s tower clock + Boss-only fast scan.')
  console.info(TAG,'Active: adaptive retreat diagnostics + 30s tower clock + Boss-only fast scan.');
// [VI dòng gốc 339] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: })();
})();
// [VI dòng gốc 340] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 341] Dòng trống để tách các phần, không có lệnh thực thi.
