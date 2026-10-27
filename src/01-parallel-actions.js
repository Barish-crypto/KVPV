// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: Independent verified actions. Capture native plugin callbacks at registration;
/* Independent verified actions. Capture native plugin callbacks at registration;
 * one pending per function, no shared ACK queue. Existing resources keep their
 * own batch ACK/UID protections. No premium/unverified plugin is executed here. */
// [VI dòng gốc 4] chạy ngay hàm bao để tạo phạm vi và khởi tạo phần chức năng bên trong
(() => {
// [VI dòng gốc 5] "use strict"
  'use strict';
// [VI dòng gốc 6] Khai báo biến không gán lại bằng const: W = window; old = đọc W.KVPV_PARALLEL_ACTIONS; carry = gọi old?._handoff(); chức năng nội bộ chưa xác minh từ tên hàm (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gọi old?.stop('reload') để dừng bộ điều khiển và dọn tài nguyên (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  const W=window,old=W.KVPV_PARALLEL_ACTIONS,carry=old?._handoff?.();old?.stop?.('reload');
// [VI dòng gốc 7] Khai báo biến không gán lại bằng const: actor = gọi String(W.__KVPV_OWN_ACTOR_ID||'') để chuyển sang chuỗi; same = tính biểu thức carry?.actor===actor
  const actor=String(W.__KVPV_OWN_ACTOR_ID||''),same=carry?.actor===actor;
// [VI dòng gốc 8] Khai báo biến không gán lại bằng const: S = tạo đối tượng gồm enabled, timer, taken, busy, definitions, pending, hooks, v8, upgrades, legacyBlocked, reason, sent, confirmed, lastError
  const S={enabled:true,timer:null,taken:same?carry.taken:false,busy:false,
// [VI dòng gốc 9] Thuộc tính definitions: tạo đối tượng bằng Map(same?carry.definitions:[]) | Thuộc tính pending: tạo đối tượng bằng Map(same?carry.pending:[])
    definitions:new Map(same?carry.definitions:[]),pending:new Map(same?carry.pending:[]),
// [VI dòng gốc 10] Thuộc tính hooks: tạo mảng gồm 0 vị trí: [] | Thuộc tính v8: null | Thuộc tính upgrades: null | Thuộc tính legacyBlocked: false
    hooks:[],v8:null,upgrades:null,legacyBlocked:false,reason:'waiting_core',sent:same?carry.sent:0,confirmed:same?carry.confirmed:0,lastError:''};
// [VI dòng gốc 11] Khai báo biến không gán lại bằng const: owned = tạo hàm với tham số (không có); mỗi lần gọi trả về actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'') và chỉ đánh giá vế phải khi vế trái truthy: !W.__KVPV_UNIVERSAL_HALTED
  const owned=()=>actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;
// [VI dòng gốc 12] Khai báo biến không gán lại bằng const: rewardSources = tạo đối tượng bằng Set(['dailyExpedition','limitedExpedition','expeditionMilestone'])
  const rewardSources=new Set(['dailyExpedition','limitedExpedition','expeditionMilestone']);
// [VI dòng gốc 13] Định nghĩa hàm rewardPolicy; tham số: d | Kiểm tra rewardSources.has(d.id)&&d.kind==='claim'&&d.spend==='none'&&d.verified===true: đúng thì chạy nhánh sau if.
  function rewardPolicy(d){if(rewardSources.has(d.id)&&d.kind==='claim'&&d.spend==='none'&&d.verified===true){
// [VI dòng gốc 14] gán d.background bằng true | gán d.directDuringPve bằng true | Kiểm tra d.id!=='expeditionMilestone': đúng thì chạy nhánh sau if. | gán d.claimGroup bằng 'expedition_task'
    d.background=true;d.directDuringPve=true;if(d.id!=='expeditionMilestone')d.claimGroup='expedition_task';
// [VI dòng gốc 15] Kết thúc hàm hiện tại và trả về: d.
  }return d;}
// [VI dòng gốc 16] Duyệt từng giá trị trong S.definitions.values() bằng const d. | Khai báo biến không gán lại bằng const: d (chưa gán giá trị) | gọi rewardPolicy(d)
  for(const d of S.definitions.values())rewardPolicy(d);
// [VI dòng gốc 17] Khai báo biến có thể gán lại bằng let: redAt = áp dụng toán tử - lên Infinity; redActive = tạo đối tượng bằng Set(); redAudit = tạo mảng gồm 0 vị trí: []
  let redAt=-Infinity,redActive=new Set(),redAudit=[];
// [VI dòng gốc 18] Định nghĩa hàm inspectRed; tham số: không có | Kiểm tra Date.now()-redAt<500: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể. | gán redAt bằng Date.now()
  function inspectRed(){if(Date.now()-redAt<500)return;redAt=Date.now();
// [VI dòng gốc 19] Khai báo biến không gán lại bằng const: rp = đọc W._Ba?._Xo?._Ko?.instance nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); u = đọc rp?._Uu nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const rp=W._Ba?._Xo?._Ko?.instance,u=rp?._Uu;
// [VI dòng gốc 20] Khai báo biến không gán lại bằng const: keys = nếu u&&typeof u.keys==='function' thì lấy [...u.keys()], ngược lại lấy Object.keys(u??{})
    const keys=u&&typeof u.keys==='function'?[...u.keys()]:Object.keys(u??{});
// [VI dòng gốc 21] gán redActive bằng new Set(keys.slice(0,4096).map(Number).filter(id=>Number.isSafeInteger(id)&&id>=0&&rp?.getRpKeyState?.(id)===true))
    redActive=new Set(keys.slice(0,4096).map(Number).filter(id=>Number.isSafeInteger(id)&&id>=0&&rp?.getRpKeyState?.(id)===true));
// [VI dòng gốc 22] gán redAudit bằng [...redActive].slice(0,256).map(id=>({id,handlers:[]}))
    redAudit=[...redActive].slice(0,256).map(id=>({id,handlers:[]}));
// [VI dòng gốc 23] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 24] Định nghĩa hàm recordRed; tham số: d, state | Duyệt từng giá trị trong redAudit bằng const row. | Khai báo biến không gán lại bằng const: row (chưa gán giá trị) | Kiểm tra d.redIds?.includes(row.id): đúng thì chạy nhánh sau if.
  function recordRed(d,state){for(const row of redAudit)if(d.redIds?.includes(row.id))row.handlers.push({id:d.id,kind:d.kind,
// [VI dòng gốc 25] Thuộc tính state: nếu S.pending.has(d.id) thì lấy 'waiting_ack', ngược lại lấy !d.enabled?'disabled':!context(d)?'waiting_context':state?.ready===true?'ready':'conditions_not_met'
    state:S.pending.has(d.id)?'waiting_ack':!d.enabled?'disabled':!context(d)?'waiting_context':state?.ready===true?'ready':'conditions_not_met'});}
// [VI dòng gốc 26] Chú thích gốc của tác giả; không được thực thi. Nội dung: Trusted user input temporarily owns UI; pending ACK observation continues.
  // Trusted user input temporarily owns UI; pending ACK observation continues.
// [VI dòng gốc 27] Khai báo biến không gán lại bằng const: userInput = tạo hàm với tham số e | Kiểm tra e?.isTrusted: đúng thì chạy nhánh sau if. | gán W.__KVPV_USER_UI_UNTIL bằng Date.now()+5000
  const userInput=e=>{if(e?.isTrusted)W.__KVPV_USER_UI_UNTIL=Date.now()+5000;};
// [VI dòng gốc 28] Duyệt từng giá trị trong ['pointerdown','keydown'] bằng const type. | Khai báo biến không gán lại bằng const: type (chưa gán giá trị)
  for(const type of ['pointerdown','keydown']){
// [VI dòng gốc 29] gọi W.document?.addEventListener(type, userInput, true) để đăng ký bộ xử lý sự kiện (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    W.document?.addEventListener?.(type,userInput,true);
// [VI dòng gốc 30] gọi S.hooks.push(()=>W.document?.removeEventListener?.(type,userInput,true)) để thêm phần tử vào cuối mảng
    S.hooks.push(()=>W.document?.removeEventListener?.(type,userInput,true));
// [VI dòng gốc 31] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 32] Định nghĩa hàm hook; tham số: object, key, fn | Khai báo biến không gán lại bằng const: original = đọc object[key] | gán object[key] bằng fn | gọi S.hooks.push(()=>{if(object[key]===fn)object[key]=original;}) để thêm phần tử vào cuối mảng
  function hook(object,key,fn){const original=object[key];object[key]=fn;S.hooks.push(()=>{if(object[key]===fn)object[key]=original;});return original;}
// [VI dòng gốc 33] Định nghĩa hàm canCapture; tham số: d | Kết thúc hàm hiện tại và trả về: d&&d.verified===true&&['none','materials',undefined].includes(d.spend)&& ['claim','work'].includes(d.kind)&&!(d.kind==='claim'&&d.spend==='materials')&&typeof d.probe==='function' và chỉ đánh giá vế phải khi vế trái truthy: typeof d.run==='function'.
  function canCapture(d){return d&&d.verified===true&&['none','materials',undefined].includes(d.spend)&&
// [VI dòng gốc 34] gọi ['claim','work'].includes(d.kind) để kiểm tra dữ liệu có chứa giá trị
    ['claim','work'].includes(d.kind)&&!(d.kind==='claim'&&d.spend==='materials')&&typeof d.probe==='function'&&typeof d.run==='function';}
// [VI dòng gốc 35] Định nghĩa hàm wrapV8; tham số: v | Kiểm tra !v?.register||S.v8?.object===v: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể. | gán S.v8 bằng {object:v,provide:v.provide,toggle:v.toggle,report:v.report}
  function wrapV8(v){if(!v?.register||S.v8?.object===v)return;S.v8={object:v,provide:v.provide,toggle:v.toggle,report:v.report};
// [VI dòng gốc 36] Khai báo biến không gán lại bằng const: register = đọc v.register; toggle = đọc v.toggle; provide = đọc v.provide; report = đọc v.report
    const register=v.register,toggle=v.toggle,provide=v.provide,report=v.report;
// [VI dòng gốc 37] gọi hook(v, 'register', function(d){let result,error;try{result=register.call(v,d);}catch(e){error=e;} if((!error||/Trung module …) | Khai báo biến có thể gán lại bằng let: result (chưa gán giá trị); error (chưa gán giá trị) | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | gán result bằng register.call(v,d)
    hook(v,'register',function(d){let result,error;try{result=register.call(v,d);}catch(e){error=e;}
// [VI dòng gốc 38] Kiểm tra (!error||/Trung module ID|already exists/i.test(String(error)))&&canCapture(d): đúng thì chạy nhánh sau if.
      if((!error||/Trung module ID|already exists/i.test(String(error)))&&canCapture(d)){
// [VI dòng gốc 39] gọi S.definitions.set(d.id, rewardPolicy({...d,enabled:d.enabled===true})) | gọi toggle.call(v, d.id, false)
        S.definitions.set(d.id,rewardPolicy({...d,enabled:d.enabled===true}));toggle.call(v,d.id,false);
// [VI dòng gốc 40] Kiểm tra error: đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: error | Kết thúc hàm hiện tại và trả về: result.
      }if(error)throw error;return result;
// [VI dòng gốc 41] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    });
// [VI dòng gốc 42] gọi hook(v, 'toggle', function(id,on){const d=S.definitions.get(id); if(d){toggle.call(v,id,false);d.enabled=!!on;return d.enable…) | Khai báo biến không gán lại bằng const: d = gọi S.definitions.get(id)
    hook(v,'toggle',function(id,on){const d=S.definitions.get(id);
// [VI dòng gốc 43] Kiểm tra d: đúng thì chạy nhánh sau if. | gọi toggle.call(v, id, false) | gán d.enabled bằng !!on | Kết thúc hàm hiện tại và trả về: đọc d.enabled.
      if(d){toggle.call(v,id,false);d.enabled=!!on;return d.enabled;}return toggle.call(v,id,on);
// [VI dòng gốc 44] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    });
// [VI dòng gốc 45] gọi hook(v, 'provide', function(mode){return S.enabled&&S.taken?null:provide.call(v,mode);}) | Kết thúc hàm hiện tại và trả về: nếu S.enabled&&S.taken thì lấy null, ngược lại lấy provide.call(v,mode).
    hook(v,'provide',function(mode){return S.enabled&&S.taken?null:provide.call(v,mode);});
// [VI dòng gốc 46] Kiểm tra typeof report==='function': đúng thì chạy nhánh sau if. | gọi hook(v, 'report', function(){const r=report.call(v);return {...r,plugins:r.plugins?.map(p=>S.definitions.has(p.id)?{...p,enab…) | Khai báo biến không gán lại bằng const: r = gọi report.call(v) | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm các thuộc tính của r, plugins.
    if(typeof report==='function')hook(v,'report',function(){const r=report.call(v);return {...r,plugins:r.plugins?.map(p=>S.definitions.has(p.id)?{...p,enabled:S.definitions.get(p.id).enabled}:p)};});
// [VI dòng gốc 47] Chú thích gốc của tác giả; không được thực thi. Nội dung: Definitions carried across reload remain disabled in the original queue.
    // Definitions carried across reload remain disabled in the original queue.
// [VI dòng gốc 48] Duyệt từng giá trị trong S.definitions.values() bằng const d. | Khai báo biến không gán lại bằng const: d (chưa gán giá trị) | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | gọi toggle.call(v, d.id, false)
    for(const d of S.definitions.values())try{toggle.call(v,d.id,false);}catch(_){}
// [VI dòng gốc 49] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 50] Định nghĩa hàm wrapUpgrades; tham số: u | Kiểm tra !u?.busy||S.upgrades?.object===u: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  function wrapUpgrades(u){if(!u?.busy||S.upgrades?.object===u)return;
// [VI dòng gốc 51] Khai báo biến không gán lại bằng const: busy = đọc u.busy | gán S.upgrades bằng {object:u,busy}
    const busy=u.busy;S.upgrades={object:u,busy};
// [VI dòng gốc 52] gọi hook(u, 'busy', ()=>S.enabled&&S.taken?false:busy.call(u))
    hook(u,'busy',()=>S.enabled&&S.taken?false:busy.call(u));
// [VI dòng gốc 53] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 54] Định nghĩa hàm watchGlobal; tham số: key, wrap | Khai báo biến không gán lại bằng const: descriptor = gọi Object.getOwnPropertyDescriptor(W, key)
  function watchGlobal(key,wrap){const descriptor=Object.getOwnPropertyDescriptor(W,key);
// [VI dòng gốc 55] Kiểm tra descriptor&&!descriptor.configurable: đúng thì chạy nhánh sau if. | gọi wrap(W[key]) | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(descriptor&&!descriptor.configurable){wrap(W[key]);return;}
// [VI dòng gốc 56] Khai báo biến có thể gán lại bằng let: value = đọc W[key] | gọi wrap(value)
    let value=W[key];wrap(value);
// [VI dòng gốc 57] Khai báo biến không gán lại bằng const: get = tạo hàm với tham số (không có); mỗi lần gọi trả về value; set = tạo hàm với tham số next | gán value bằng next | gọi wrap(next)
    const get=()=>value,set=next=>{value=next;wrap(next);};
// [VI dòng gốc 58] gọi Object.defineProperty(W, key, {configurable:true,enumerable:descriptor?.enumerable??true,get,set})
    Object.defineProperty(W,key,{configurable:true,enumerable:descriptor?.enumerable??true,get,set});
// [VI dòng gốc 59] gọi S.hooks.push(()=>{if(Object.getOwnPropertyDescriptor(W,key)?.get===get)Object.defineProperty(W,key,{configurable:true,enumerable:true…) để thêm phần tử vào cuối mảng | Kiểm tra Object.getOwnPropertyDescriptor(W,key)?.get===get: đúng thì chạy nhánh sau if. | gọi Object.defineProperty(W, key, {configurable:true,enumerable:true,writable:true,value})
    S.hooks.push(()=>{if(Object.getOwnPropertyDescriptor(W,key)?.get===get)Object.defineProperty(W,key,{configurable:true,enumerable:true,writable:true,value});});
// [VI dòng gốc 60] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 61] Khai báo biến có thể gán lại bằng let: directFrame (chưa gán giá trị)
  let directFrame;
// [VI dòng gốc 62] Định nghĩa hàm canDirectDuringPve; tham số: q=W.KVPV_DAILY?.quickState?.()
  function canDirectDuringPve(q=W.KVPV_DAILY?.quickState?.()){
// [VI dòng gốc 63] Kiểm tra q?.running!==true||['entering','exiting','matching','result'].includes(q.step): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: false.
    if(q?.running!==true||['entering','exiting','matching','result'].includes(q.step))return false;
// [VI dòng gốc 64] Kiểm tra W._Ba?._rJ?._O$?.ins?.isDead===true: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: false.
    if(W._Ba?._rJ?._O$?.ins?.isDead===true)return false;
// [VI dòng gốc 65] Kiểm tra W.KVPV_CONTEXT_BRAIN?.activity?.().direct===true: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: true.
    if(W.KVPV_CONTEXT_BRAIN?.activity?.().direct===true)return true;
// [VI dòng gốc 66] Kiểm tra q.step==='fighting': đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: true.
    if(q.step==='fighting')return true;
// [VI dòng gốc 67] Kiểm tra !['rảnh','ranh'].includes(q.job)||W._Ba?._$a?._yo?.ins?.isInMission!==true: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: false.
    if(!['rảnh','ranh'].includes(q.job)||W._Ba?._$a?._yo?.ins?.isInMission!==true)return false;
// [VI dòng gốc 68] Khai báo biến không gán lại bằng const: lease = gọi W.KVPV?.core?.scene?.status() để trả trạng thái để kiểm tra (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const lease=W.KVPV?.core?.scene?.status?.();
// [VI dòng gốc 69] Kiểm tra lease?.owner!=='combat'||lease.tag!=='hitrun': đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: false.
    if(lease?.owner!=='combat'||lease.tag!=='hitrun')return false;
// [VI dòng gốc 70] Kiểm tra S.busy&&directFrame!==undefined: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: directFrame.
    if(S.busy&&directFrame!==undefined)return directFrame;
// [VI dòng gốc 71] Khai báo biến không gán lại bằng const: hr = gọi W.KVPV_HITRUN1?.status(false) để trả trạng thái để kiểm tra (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); ready = hr?.running===true và chỉ đánh giá vế phải khi vế trái truthy: hr.phase==='FIGHT' | Kiểm tra S.busy: đúng thì chạy nhánh sau if. | gán directFrame bằng ready | Kết thúc hàm hiện tại và trả về: ready.
    const hr=W.KVPV_HITRUN1?.status?.(false),ready=hr?.running===true&&hr.phase==='FIGHT';if(S.busy)directFrame=ready;return ready;
// [VI dòng gốc 72] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 73] Định nghĩa hàm context; tham số: d | Khai báo biến không gán lại bằng const: q = gọi W.KVPV_DAILY?.quickState() (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Kiểm tra q?.running!==true: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: false.
  function context(d){const q=W.KVPV_DAILY?.quickState?.();if(q?.running!==true)return false;
// [VI dòng gốc 74] Kiểm tra ['entering','exiting','matching','result'].includes(q.step): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: false.
    if(['entering','exiting','matching','result'].includes(q.step))return false;
// [VI dòng gốc 75] Kiểm tra d.background===true&&d.directDuringPve===true&&canDirectDuringPve(q): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: true.
    if(d.background===true&&d.directDuringPve===true&&canDirectDuringPve(q))return true;
// [VI dòng gốc 76] Kiểm tra ['rảnh','ranh'].includes(q.job): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: W._Ba?._$a?.SceneUtil?.isCommonScene===true và chỉ đánh giá vế phải khi vế trái truthy: W._Ba?._$a?._yo?.ins?.isInMission!==true.
    if(['rảnh','ranh'].includes(q.job))return W._Ba?._$a?.SceneUtil?.isCommonScene===true&&W._Ba?._$a?._yo?.ins?.isInMission!==true;
// [VI dòng gốc 77] Kết thúc hàm hiện tại và trả về: d.background===true&&q.step==='fighting' và chỉ đánh giá vế phải khi vế trái truthy: W.KVPV_UPGRADES?.config?.backgroundJobs?.includes(q.job)===true.
    return d.background===true&&q.step==='fighting'&&W.KVPV_UPGRADES?.config?.backgroundJobs?.includes(q.job)===true;
// [VI dòng gốc 78] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 79] Định nghĩa hàm evidence; tham số: id
  function evidence(id){
// [VI dòng gốc 80] Kiểm tra id==='reborn_cobao_step': đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: đọc W.KVPV_REBORN_EXECUTORS?.status?.()?.cobao?.confirmed nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại).
    if(id==='reborn_cobao_step')return W.KVPV_REBORN_EXECUTORS?.status?.()?.cobao?.confirmed;
// [VI dòng gốc 81] Kiểm tra id==='reborn_arena_fight': đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: đọc W.KVPV_REBORN_EXECUTORS?.status?.()?.arena?.confirmed nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại).
    if(id==='reborn_arena_fight')return W.KVPV_REBORN_EXECUTORS?.status?.()?.arena?.confirmed;
// [VI dòng gốc 82] Kiểm tra id==='season_completed_tasks': đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: đọc W.KVPV_SEASON_REWARDS?.status?.()?.confirmed nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại).
    if(id==='season_completed_tasks')return W.KVPV_SEASON_REWARDS?.status?.()?.confirmed;
// [VI dòng gốc 83] Kiểm tra id==='skill_handbook_rewards': đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: đọc W.KVPV_SKILL_REWARDS?.status?.()?.confirmed nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại).
    if(id==='skill_handbook_rewards')return W.KVPV_SKILL_REWARDS?.status?.()?.confirmed;
// [VI dòng gốc 84] Kiểm tra id==='fabao_treasure_keys': đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: đọc W.KVPV_FABAO_TREASURE?.status?.()?.confirmed nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại).
    if(id==='fabao_treasure_keys')return W.KVPV_FABAO_TREASURE?.status?.()?.confirmed;
// [VI dòng gốc 85] Kiểm tra String(id).startsWith('appearance_auto_'): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: đọc W.KVPV_APPEARANCE_AUTO?.status?.()?.confirmed nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại).
    if(String(id).startsWith('appearance_auto_'))return W.KVPV_APPEARANCE_AUTO?.status?.()?.confirmed;
// [VI dòng gốc 86] Kết thúc hàm hiện tại và trả về: undefined.
    return undefined;
// [VI dòng gốc 87] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 88] Định nghĩa hàm observe; tham số: không có | Duyệt từng giá trị trong S.pending bằng const [id,p]. | Khai báo biến không gán lại bằng const: [id,p] (chưa gán giá trị) | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài.
  function observe(){for(const [id,p]of S.pending){try{
// [VI dòng gốc 89] Khai báo biến không gán lại bằng const: after = gọi p.probe(); confirmed = gọi evidence(id); nativeAck = Number.isFinite(p.evidence)&&Number.isFinite(confirmed) và chỉ đánh giá vế phải khi vế trái truthy: confirmed>p.evidence
    const after=p.probe(),confirmed=evidence(id),nativeAck=Number.isFinite(p.evidence)&&Number.isFinite(confirmed)&&confirmed>p.evidence;
// [VI dòng gốc 90] Kiểm tra nativeAck||after!==null&&after!==undefined&&String(after)!==p.before: đúng thì chạy nhánh sau if, sai thì chạy nhánh else.
    if(nativeAck||after!==null&&after!==undefined&&String(after)!==p.before){
// [VI dòng gốc 91] gọi S.pending.delete(id) | tăng S.confirmed một đơn vị sau khi lấy giá trị | gọi p.done() (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
      S.pending.delete(id);S.confirmed++;p.done?.();
// [VI dòng gốc 92] Kiểm tra p.legacy&&p.restoreEnabled&&!S.definitions.has(id): đúng thì chạy nhánh sau if. | gọi S.v8?.toggle.call(S.v8.object, id, true) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
      if(p.legacy&&p.restoreEnabled&&!S.definitions.has(id))S.v8?.toggle.call(S.v8.object,id,true);
// [VI dòng gốc 93] Kiểm tra Date.now()-p.at>30000: đúng thì chạy nhánh sau if. | gán p.reason bằng 'waiting_ack_no_retry'
    }else if(Date.now()-p.at>30000)p.reason='waiting_ack_no_retry';
// [VI dòng gốc 94] Nhận lỗi bằng e và chạy phần xử lý lỗi. | gán p.reason bằng 'probe_error_no_retry' | gán p.error bằng String(e)
  }catch(e){p.reason='probe_error_no_retry';p.error=String(e);}}}
// [VI dòng gốc 95] Định nghĩa hàm dispatch; tham số: d | Kiểm tra !d.enabled||S.pending.has(d.id)||!context(d): đúng thì chạy nhánh sau if. | gọi recordRed(d, null) | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  function dispatch(d){if(!d.enabled||S.pending.has(d.id)||!context(d)){recordRed(d,null);return;}
// [VI dòng gốc 96] Kiểm tra d.claimGroup&&[...S.pending].some(([id,p])=>(p.claimGroup??S.definitions.get(id)?.claimGroup)===d.claimGroup): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(d.claimGroup&&[...S.pending].some(([id,p])=>(p.claimGroup??S.definitions.get(id)?.claimGroup)===d.claimGroup))return;
// [VI dòng gốc 97] Khai báo biến không gán lại bằng const: state = gọi d.probe() | gọi recordRed(d, state) | Kiểm tra state?.ready!==true||state.signature==null: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    const state=d.probe();recordRed(d,state);if(state?.ready!==true||state.signature==null)return;
// [VI dòng gốc 98] Khai báo biến không gán lại bằng const: p = tạo đối tượng gồm claimGroup, before, evidence, at, reason, probe
    const p={claimGroup:d.claimGroup,before:String(state.signature),evidence:evidence(d.id),at:Date.now(),reason:'waiting_server',
// [VI dòng gốc 99] gọi S.pending.set(d.id, p) | tăng S.sent một đơn vị sau khi lấy giá trị
      probe:()=>d.probe()?.signature};S.pending.set(d.id,p);S.sent++;
// [VI dòng gốc 100] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | Khai báo biến không gán lại bằng const: result = gọi d.run(state) | Kiểm tra result&&typeof result.catch==='function': đúng thì chạy nhánh sau if. | gọi result.catch(e=>{p.reason='send_error_no_retry';p.error=String(e);})
    try{const result=d.run(state);if(result&&typeof result.catch==='function')result.catch(e=>{p.reason='send_error_no_retry';p.error=String(e);});}
// [VI dòng gốc 101] Nhận lỗi bằng e và chạy phần xử lý lỗi. | gán p.reason bằng 'send_error_no_retry' | gán p.error bằng String(e) | gán S.lastError bằng String(e)
    catch(e){p.reason='send_error_no_retry';p.error=String(e);S.lastError=String(e);}
// [VI dòng gốc 102] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 103] Định nghĩa hàm legacy; tham số: không có | Khai báo biến không gán lại bằng const: v = đọc S.v8 | Kiểm tra S.legacyBlocked||!v?.provide||!v.report: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  function legacy(){const v=S.v8;if(S.legacyBlocked||!v?.provide||!v.report)return;
// [VI dòng gốc 104] Duyệt từng giá trị trong ['claim','work'] bằng const mode. | Khai báo biến không gán lại bằng const: mode (chưa gán giá trị) | Lặp for: khởi tạo let i=0; tiếp tục khi i<64; sau mỗi vòng i++. | Khai báo biến có thể gán lại bằng let: i = 0
    for(const mode of ['claim','work'])for(let i=0;i<64;i++){
// [VI dòng gốc 105] Khai báo biến không gán lại bằng const: action = gọi v.provide.call(v.object, mode) | Kiểm tra !action: đúng thì chạy nhánh sau if. | Thoát vòng lặp/switch hiện tại.
      const action=v.provide.call(v.object,mode);if(!action)break;
// [VI dòng gốc 106] Khai báo biến không gán lại bằng const: matches = gọi (v.report.call(v.object).plugins??[]).filter(p=>'V8 '+p.name===action.what) để giữ phần tử thỏa điều kiện
      const matches=(v.report.call(v.object).plugins??[]).filter(p=>'V8 '+p.name===action.what);
// [VI dòng gốc 107] Kiểm tra matches.length!==1: đúng thì chạy nhánh sau if. | Thoát vòng lặp/switch hiện tại. | Khai báo biến không gán lại bằng const: d = đọc matches[0] | Kiểm tra d.verified!==true||d.spend==='premium': đúng thì chạy nhánh sau if.
      if(matches.length!==1)break;const d=matches[0];if(d.verified!==true||d.spend==='premium')break;if(S.definitions.has(d.id)||S.pending.has(d.id))break;
// [VI dòng gốc 108] Khai báo biến không gán lại bằng const: p = tạo đối tượng gồm legacy, restoreEnabled, before, at, reason, probe, done
      const p={legacy:true,restoreEnabled:d.enabled,before:String(action.before),at:Date.now(),reason:'waiting_server',probe:action.probe,done:action.done};
// [VI dòng gốc 109] gọi S.pending.set(d.id, p) | gọi v.toggle.call(v.object, d.id, false) | tăng S.sent một đơn vị sau khi lấy giá trị
      S.pending.set(d.id,p);v.toggle.call(v.object,d.id,false);S.sent++;
// [VI dòng gốc 110] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | gọi action.run() | Nhận lỗi bằng e và chạy phần xử lý lỗi. | gán p.reason bằng 'send_error_no_retry'
      try{action.run();}catch(e){p.reason='send_error_no_retry';p.error=String(e);}
// [VI dòng gốc 111] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 112] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 113] Định nghĩa hàm tick; tham số: không có. Mục đích: xử lý một nhịp kiểm tra | Kiểm tra !S.enabled||S.busy: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể. | gán S.busy bằng true
  function tick(){if(!S.enabled||S.busy)return;S.busy=true;directFrame=undefined;try{
// [VI dòng gốc 114] Kiểm tra !owned(): đúng thì chạy nhánh sau if. | gọi stop() để dừng bộ điều khiển và dọn tài nguyên | Kết thúc hàm hiện tại mà không trả giá trị cụ thể. | gọi wrapV8(W.KVPV_V8)
    if(!owned()){stop();return;}wrapV8(W.KVPV_V8);wrapUpgrades(W.KVPV_UPGRADES);
// [VI dòng gốc 115] Kiểm tra !S.v8||!S.upgrades: đúng thì chạy nhánh sau if. | gán S.reason bằng 'waiting_core' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(!S.v8||!S.upgrades){S.reason='waiting_core';return;}
// [VI dòng gốc 116] Kiểm tra !S.taken: đúng thì chạy nhánh sau if. | Kiểm tra S.upgrades.busy.call(S.upgrades.object): đúng thì chạy nhánh sau if. | gán S.reason bằng 'finishing_previous_shared_request' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(!S.taken){if(S.upgrades.busy.call(S.upgrades.object)){S.reason='finishing_previous_shared_request';return;}S.taken=true;}
// [VI dòng gốc 117] Khai báo biến không gán lại bằng const: u = đọc W.KVPV_UPGRADES?.config nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const u=W.KVPV_UPGRADES?.config;
// [VI dòng gốc 118] Kiểm tra u: đúng thì chạy nhánh sau if. | gán u.checkMs bằng 50 | gán u.backgroundGapMs bằng 50 | gán u.noActivityNearEvents bằng false
    if(u){u.checkMs=50;u.backgroundGapMs=50;u.noActivityNearEvents=false;
// [VI dòng gốc 119] Kiểm tra u.maxRequestsPerHour: đúng thì chạy nhánh sau if. | Duyệt từng giá trị trong Object.keys(u.maxRequestsPerHour) bằng const k. | Khai báo biến không gán lại bằng const: k (chưa gán giá trị) | gán u.maxRequestsPerHour[k] bằng 3600
      if(u.maxRequestsPerHour)for(const k of Object.keys(u.maxRequestsPerHour))u.maxRequestsPerHour[k]=3600;}
// [VI dòng gốc 120] Khai báo biến không gán lại bằng const: resources = đọc W.KVPV_BG_RESOURCES?.config nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Kiểm tra resources: đúng thì chạy nhánh sau if. | gán resources.minBetweenMs bằng 0
    const resources=W.KVPV_BG_RESOURCES?.config;if(resources)resources.minBetweenMs=0;
// [VI dòng gốc 121] gọi observe()
    observe();
// [VI dòng gốc 122] gọi inspectRed() | Duyệt từng giá trị trong redAudit bằng const row. | Khai báo biến không gán lại bằng const: row (chưa gán giá trị) | gán row.handlers bằng []
    inspectRed();for(const row of redAudit)row.handlers=[];
// [VI dòng gốc 123] Kiểm tra Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0): đúng thì chạy nhánh sau if. | gán S.reason bằng 'user_using_ui' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)){S.reason='user_using_ui';return;}
// [VI dòng gốc 124] Kiểm tra W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true: đúng thì chạy nhánh sau if. | gán S.reason bằng 'priority_popup' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true){S.reason='priority_popup';return;}
// [VI dòng gốc 125] Kiểm tra S.v8.object.config?.enabled!==false&&S.v8.object.config?.autoExecuteVerified!==false: đúng thì chạy nhánh sau if.
    if(S.v8.object.config?.enabled!==false&&S.v8.object.config?.autoExecuteVerified!==false){
// [VI dòng gốc 126] Khai báo biến không gán lại bằng const: priority = tạo hàm với tham số d; mỗi lần gọi trả về tính biểu thức (d.redIds?.some(id=>redActive.has(id))?2:0)+(d.kind==='claim'?1:0)
      const priority=d=>(d.redIds?.some(id=>redActive.has(id))?2:0)+(d.kind==='claim'?1:0);
// [VI dòng gốc 127] Duyệt từng giá trị trong [...S.definitions.values()].sort((a,b)=>priority(b)-priority(a)) bằng const d. | Khai báo biến không gán lại bằng const: d (chưa gán giá trị) | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | gọi dispatch(d)
      for(const d of [...S.definitions.values()].sort((a,b)=>priority(b)-priority(a)))try{dispatch(d);}catch(e){S.lastError=String(e);}
// [VI dòng gốc 128] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | gọi legacy() | Nhận lỗi bằng e và chạy phần xử lý lỗi. | Kiểm tra e instanceof RangeError||/Maximum call stack/.test(String(e)): đúng thì chạy nhánh sau if, sai thì chạy nhánh else.
      try{legacy();}catch(e){if(e instanceof RangeError||/Maximum call stack/.test(String(e))){S.legacyBlocked=true;S.lastError='Legacy provider recursion isolated';}else throw e;}
// [VI dòng gốc 129] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 130] Chú thích gốc của tác giả; không được thực thi. Nội dung: The legacy core retains native providers and per-request ACK. Poll promptly
    // The legacy core retains native providers and per-request ACK. Poll promptly
// [VI dòng gốc 131] Chú thích gốc của tác giả; không được thực thi. Nội dung: instead of its old 2s/4s timers. Per-function busy flags still prevent spam.
    // instead of its old 2s/4s timers. Per-function busy flags still prevent spam.
// [VI dòng gốc 132] Kiểm tra S.legacyBlocked&&S.v8.object.provide!==S.v8.isolatedProvide: đúng thì chạy nhánh sau if. | gán khi giá trị hiện tại là null/undefined S.v8.isolatedProvide bằng ()=>null | gán S.v8.object.provide bằng S.v8.isolatedProvide
    if(S.legacyBlocked&&S.v8.object.provide!==S.v8.isolatedProvide){S.v8.isolatedProvide??=()=>null;S.v8.object.provide=S.v8.isolatedProvide;}
// [VI dòng gốc 133] gọi W.KVPV_UPGRADES?.run() (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gọi W.KVPV_BG_RESOURCES?.tick() để xử lý một nhịp kiểm tra (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gán S.reason bằng 'independent_functions'
    W.KVPV_UPGRADES?.run?.();W.KVPV_BG_RESOURCES?.tick?.();S.reason='independent_functions';
// [VI dòng gốc 134] Nhận lỗi bằng e và chạy phần xử lý lỗi. | gán S.lastError bằng String(e?.stack??e) | gán S.reason bằng 'error' | gán S.busy bằng false
  }catch(e){S.lastError=String(e?.stack??e);S.reason='error';}finally{S.busy=false;}}
// [VI dòng gốc 135] Định nghĩa hàm stop; tham số: không có. Mục đích: dừng bộ điều khiển và dọn tài nguyên | gán S.enabled bằng false | Kiểm tra S.timer!==null: đúng thì chạy nhánh sau if. | gọi W.KVPV_V1?.timers?.clearInterval??W.clearInterval(S.timer)
  function stop(){S.enabled=false;if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;
// [VI dòng gốc 136] Duyệt từng giá trị trong S.hooks.reverse() bằng const undo. | Khai báo biến không gán lại bằng const: undo (chưa gán giá trị) | gọi undo() | gán S.hooks bằng []
    for(const undo of S.hooks.reverse())undo();S.hooks=[];
// [VI dòng gốc 137] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 138] Định nghĩa hàm start; tham số: không có. Mục đích: khởi động bộ điều khiển | Kiểm tra S.timer!==null: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể. | gán S.enabled bằng true
  function start(){if(S.timer!==null)return;S.enabled=true;S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,50);tick();}
// [VI dòng gốc 139] gọi watchGlobal('KVPV_V8', wrapV8) | gọi watchGlobal('KVPV_UPGRADES', wrapUpgrades)
  watchGlobal('KVPV_V8',wrapV8);watchGlobal('KVPV_UPGRADES',wrapUpgrades);
// [VI dòng gốc 140] gán W.KVPV_PARALLEL_ACTIONS bằng Object.freeze({start,stop,sync:tick,canDirectDuringPve,legacyBusy:()=>S.upgrades?.busy.call(S.upgrades.object)??true,get independent(){return S.enabled&&S.taken;}, status:()=>({ena… | Kết thúc hàm hiện tại và trả về: S.enabled và chỉ đánh giá vế phải khi vế trái truthy: S.taken.
  W.KVPV_PARALLEL_ACTIONS=Object.freeze({start,stop,sync:tick,canDirectDuringPve,legacyBusy:()=>S.upgrades?.busy.call(S.upgrades.object)??true,get independent(){return S.enabled&&S.taken;},
// [VI dòng gốc 141] Thuộc tính status: tạo hàm với tham số (không có); mỗi lần gọi trả về tạo đối tượng gồm enabled, actor, sharedQueue, pollMs, reason, sent, confirmed, redDots, pending, lastError, allowKNB | Thuộc tính enabled: đọc S.enabled | Thuộc tính actor: dùng biến cùng tên | Thuộc tính sharedQueue: false
    status:()=>({enabled:S.enabled,actor,sharedQueue:false,pollMs:50,reason:S.reason,sent:S.sent,confirmed:S.confirmed,
// [VI dòng gốc 142] Thuộc tính redDots: gọi redAudit.map(r=>({id:r.id,state:r.handlers.length?'checked':'needs_verified_mapping',handlers:r.handlers.map(h=>({...h}))})) để biến đổi từng phần tử | Thuộc tính id: đọc r.id | Thuộc tính state: nếu r.handlers.length thì lấy 'checked', ngược lại lấy 'needs_verified_mapping' | Thuộc tính handlers: gọi r.handlers.map(h=>({...h})) để biến đổi từng phần tử
      redDots:redAudit.map(r=>({id:r.id,state:r.handlers.length?'checked':'needs_verified_mapping',handlers:r.handlers.map(h=>({...h}))})),
// [VI dòng gốc 143] Thuộc tính pending: gọi [...S.pending].map(([id,p])=>({id,at:p.at,reason:p.reason,error:p.error??''})) để biến đổi từng phần tử | Thuộc tính id: dùng biến cùng tên | Thuộc tính at: đọc p.at | Thuộc tính reason: đọc p.reason
      pending:[...S.pending].map(([id,p])=>({id,at:p.at,reason:p.reason,error:p.error??''})),lastError:S.lastError,allowKNB:false}),
// [VI dòng gốc 144] Thuộc tính _handoff: tạo hàm với tham số (không có); mỗi lần gọi trả về tạo đối tượng gồm actor, taken, definitions, pending, sent, confirmed | Thuộc tính actor: dùng biến cùng tên | Thuộc tính taken: đọc S.taken | Thuộc tính definitions: tạo mảng gồm 1 vị trí: [...S.definitions]
    _handoff:()=>({actor,taken:S.taken,definitions:[...S.definitions],pending:[...S.pending],sent:S.sent,confirmed:S.confirmed})});
// [VI dòng gốc 145] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: })();
})();
// [VI dòng gốc 146] Dòng trống để tách các phần, không có lệnh thực thi.
