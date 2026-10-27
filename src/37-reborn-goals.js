// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: Native era task graph: root main quest -> era nodes -> existing executors.
/* Native era task graph: root main quest -> era nodes -> existing executors.
 * Claim/breakthrough stay in V868 (native guard + premium gate). No fastEra,
 * arbitrary Go click, item purchase or replacement of the game's task model. */
// [VI dòng gốc 4] chạy ngay hàm bao để tạo phạm vi và khởi tạo phần chức năng bên trong
(() => {
// [VI dòng gốc 5] "use strict"
  'use strict';
// [VI dòng gốc 6] Khai báo biến không gán lại bằng const: W = window; old = đọc W.KVPV_REBORN_GOALS; carry = gọi old?._handoff(); chức năng nội bộ chưa xác minh từ tên hàm (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gọi old?.stop() để dừng bộ điều khiển và dọn tài nguyên (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  const W=window,old=W.KVPV_REBORN_GOALS,carry=old?._handoff?.();old?.stop?.();
// [VI dòng gốc 7] Khai báo biến không gán lại bằng const: actor = gọi String(W.__KVPV_OWN_ACTOR_ID||'') để chuyển sang chuỗi
  const actor=String(W.__KVPV_OWN_ACTOR_ID||'');
// [VI dòng gốc 8] Khai báo biến không gán lại bằng const: S = tạo đối tượng gồm enabled, timer, openedKey, reason, plan, lastError
  const S={enabled:true,timer:null,openedKey:carry?.actor===actor?carry.openedKey:null,reason:'waiting_root',plan:null,lastError:''};
// [VI dòng gốc 9] Khai báo biến không gán lại bằng const: norm = tạo hàm với tham số x; mỗi lần gọi trả về gọi String(x||'').replace(/<[^>]*>/g,'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/gi,'d').toLowerCase().replace(/\s+/g,' ').trim()
  const norm=x=>String(x||'').replace(/<[^>]*>/g,'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/gi,'d').toLowerCase().replace(/\s+/g,' ').trim();
// [VI dòng gốc 10] Khai báo biến không gán lại bằng const: owned = tạo hàm với tham số (không có); mỗi lần gọi trả về actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'') và chỉ đánh giá vế phải khi vế trái truthy: !W.__KVPV_UNIVERSAL_HALTED
  const owned=()=>actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;
// [VI dòng gốc 11] Định nghĩa hàm root; tham số: không có | Khai báo biến không gán lại bằng const: r = đọc W._Ba?._zIt?._FIt?.ins?.taskInfo nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Kiểm tra !Array.isArray(r): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: null.
  function root(){const r=W._Ba?._zIt?._FIt?.ins?.taskInfo;if(!Array.isArray(r))return null;
// [VI dòng gốc 12] Khai báo biến không gán lại bằng const: cfg = gọi W._ft?.__Z?.ins?.getTaskCfgById(r[0]) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Kiểm tra !cfg||!/chuyen\s*sinh/.test(norm(cfg[1])): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: null.
    const cfg=W._ft?.__Z?.ins?.getTaskCfgById?.(r[0]);if(!cfg||!/chuyen\s*sinh/.test(norm(cfg[1])))return null;
// [VI dòng gốc 13] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm id, state, name.
    return {id:String(r[0]),state:Number(r[1]),name:String(cfg[1])};
// [VI dòng gốc 14] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 15] Định nghĩa hàm classify; tham số: q | Khai báo biến không gán lại bằng const: n = gọi norm(q.name)
  function classify(q){const n=norm(q.name);
// [VI dòng gốc 16] Kiểm tra q.action===-1||/nap|svip|mua|nguyen bao/.test(n): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: "manual_paid_or_item_source".
    if(q.action===-1||/nap|svip|mua|nguyen bao/.test(n))return 'manual_paid_or_item_source';
// [VI dòng gốc 17] Kiểm tra q.action===189&&/co bao/.test(n)&&/kich hoat/.test(n): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: "CO_BAO".
    if(q.action===189&&/co bao/.test(n)&&/kich hoat/.test(n))return 'CO_BAO';
// [VI dòng gốc 18] Kiểm tra q.action===165&&/ke thang lam vua|dau truong/.test(n): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: "ARENA".
    if(q.action===165&&/ke thang lam vua|dau truong/.test(n))return 'ARENA';
// [VI dòng gốc 19] Kiểm tra q.action===21&&/linh lung thap/.test(n): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: "LINH_LUNG".
    if(q.action===21&&/linh lung thap/.test(n))return 'LINH_LUNG';
// [VI dòng gốc 20] Kiểm tra /phap bao/.test(n)&&/tu vi/.test(n): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: "FABAO".
    if(/phap bao/.test(n)&&/tu vi/.test(n))return 'FABAO';
// [VI dòng gốc 21] Kiểm tra q.action===46&&/vuot ai|vuot thien kiep|thien quan|tu vuot/.test(n): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: "STAGE".
    if(q.action===46&&/vuot ai|vuot thien kiep|thien quan|tu vuot/.test(n))return 'STAGE';
// [VI dòng gốc 22] Kiểm tra !/trang bi|ky nang|phap bao|phu van|tu vi/.test(n)&&/dat cap|len cap|cap nhan vat|nhan vat.{0,20}cap/.test(n): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: "LEVEL".
    if(!/trang bi|ky nang|phap bao|phu van|tu vi/.test(n)&&/dat cap|len cap|cap nhan vat|nhan vat.{0,20}cap/.test(n))return 'LEVEL';
// [VI dòng gốc 23] Kiểm tra /phu van|trang bi|dinh cao|chi ton/.test(n): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: "EQUIPMENT".
    if(/phu van|trang bi|dinh cao|chi ton/.test(n))return 'EQUIPMENT';
// [VI dòng gốc 24] Kết thúc hàm hiện tại và trả về: "unverified_executor".
    return 'unverified_executor';
// [VI dòng gốc 25] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 26] Định nghĩa hàm inspect; tham số: không có | Khai báo biến không gán lại bằng const: r = gọi root() | Kiểm tra !r: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm root, tasks, selected, reason.
  function inspect(){const r=root();if(!r)return {root:null,tasks:[],selected:null,reason:'no_reborn_main_quest'};
// [VI dòng gốc 27] Kiểm tra r.state===2: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm root, tasks, selected, reason.
    if(r.state===2)return {root:r,tasks:[],selected:null,reason:'waiting_main_reward_queue'};
// [VI dòng gốc 28] Kiểm tra ![0,1,3].includes(r.state): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm root, tasks, selected, reason.
    if(![0,1,3].includes(r.state))return {root:r,tasks:[],selected:null,reason:'unknown_main_state'};
// [VI dòng gốc 29] Khai báo biến không gán lại bằng const: m = đọc W._Ba?.n_zS?._Aht?.instance nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); ids = đọc m?.ids nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); tasks = tạo mảng gồm 0 vị trí: []
    const m=W._Ba?.n_zS?._Aht?.instance,ids=m?.ids,tasks=[];
// [VI dòng gốc 30] Duyệt từng giá trị trong Array.isArray(ids)?[...new Set(ids)]:[] bằng const id. | Khai báo biến không gán lại bằng const: id (chưa gán giá trị)
    for(const id of Array.isArray(ids)?[...new Set(ids)]:[]){
// [VI dòng gốc 31] Khai báo biến không gán lại bằng const: node = gọi m?.getEraNode(id) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); cfg = gọi W._ft?._Pht?.ins?.getCfgById(id) để tra cấu hình theo ID bằng API client (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
      const node=m?.getEraNode?.(id),cfg=W._ft?._Pht?.ins?.getCfgById?.(id);
// [VI dòng gốc 32] Kiểm tra !Array.isArray(node)||!cfg: đúng thì chạy nhánh sau if. | gọi tasks.push({id:String(id),kind:'waiting_native_task_data',state:null}) để thêm phần tử vào cuối mảng | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
      if(!Array.isArray(node)||!cfg){tasks.push({id:String(id),kind:'waiting_native_task_data',state:null});continue;}
// [VI dòng gốc 33] Khai báo biến không gán lại bằng const: a = đọc cfg[2]; target = gọi Number(a?.[1]) để chuyển sang số; rawAction = gọi Number(a?.[2]) để chuyển sang số; mode = gọi Number(a?.[0]) để chuyển sang số
      const a=cfg[2],target=Number(a?.[1]),rawAction=Number(a?.[2]),mode=Number(a?.[0]);
// [VI dòng gốc 34] Khai báo biến không gán lại bằng const: action = nếu mode===0 thì lấy Number(W._et?.hdleLckExoActId?.(rawAction)), ngược lại lấy rawAction
      const action=mode===0?Number(W._et?.hdleLckExoActId?.(rawAction)):rawAction;
// [VI dòng gốc 35] Khai báo biến không gán lại bằng const: q = tạo đối tượng gồm id, nodeId, source, state, progress, target, name, action, rawAction, mode, claimState
      const q={id:'REBORN/'+Number(m.lv)+'/'+id,nodeId:Number(id),source:'REBORN',state:Number(node[1]),progress:Number(node[2]),
// [VI dòng gốc 36] Thuộc tính target: nếu Number.isFinite(target)&&target>0 thì lấy target, ngược lại lấy null | Thuộc tính name: gọi String(cfg[1]||'') để chuyển sang chuỗi | Thuộc tính action: dùng biến cùng tên | Thuộc tính rawAction: dùng biến cùng tên
        target:Number.isFinite(target)&&target>0?target:null,name:String(cfg[1]||''),action,rawAction,mode,claimState:1};
// [VI dòng gốc 37] gán q.kind bằng Number.isFinite(action)?classify(q):'waiting_native_route'
      q.kind=Number.isFinite(action)?classify(q):'waiting_native_route';
// [VI dòng gốc 38] Kiểm tra q.target===null||!Number.isFinite(q.progress): đúng thì chạy nhánh sau if. | gán q.kind bằng 'waiting_verified_requirement' | gọi tasks.push(q) để thêm phần tử vào cuối mảng
      if(q.target===null||!Number.isFinite(q.progress))q.kind='waiting_verified_requirement';tasks.push(q);
// [VI dòng gốc 39] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 40] Khai báo biến không gán lại bằng const: claim = gọi tasks.find(q=>q.state===1) để tìm phần tử đầu tiên thỏa điều kiện; supported = tạo mảng gồm 7 vị trí: ['LEVEL','STAGE','LINH_LUNG','FABAO','EQUIPMENT','CO_BAO','ARENA']
    const claim=tasks.find(q=>q.state===1),supported=['LEVEL','STAGE','LINH_LUNG','FABAO','EQUIPMENT','CO_BAO','ARENA'];
// [VI dòng gốc 41] Khai báo biến không gán lại bằng const: selected = claim??tasks.find(q=>q.state===0&&supported.includes(q.kind)) hoặc dùng vế phải khi vế trái là null/undefined: null
    const selected=claim??tasks.find(q=>q.state===0&&supported.includes(q.kind))??null;
// [VI dòng gốc 42] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm root, eraLevel, tasks, selected, reason.
    return {root:r,eraLevel:Number(m?.lv),tasks,selected,
// [VI dòng gốc 43] Thuộc tính reason: nếu !tasks.length thì lấy 'waiting_era_info', ngược lại lấy claim?'waiting_existing_era_reward_queue':selected?'doing_'+selected.kind.toLowerCase(): tasks.length===4&&tasks.every(q=>q.state===2)?Number(m?.lv)>=406&&Number(W._Ba?._ke?._Le?.i…
      reason:!tasks.length?'waiting_era_info':claim?'waiting_existing_era_reward_queue':selected?'doing_'+selected.kind.toLowerCase():
// [VI dòng gốc 44] Định nghĩa hàm hàm không đặt tên; tham số: q
        tasks.length===4&&tasks.every(q=>q.state===2)?Number(m?.lv)>=406&&Number(W._Ba?._ke?._Le?.instance?.curSvipLv??0)<1?'premium_gate_blocked':'waiting_existing_breakthrough':'unmet_requirements_need_executor'};
// [VI dòng gốc 45] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 46] Định nghĩa hàm selected; tham số: kind | Kiểm tra !S.enabled||!owned(): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: null. | Khai báo biến không gán lại bằng const: p = gọi inspect(); q = đọc p.selected
  function selected(kind){if(!S.enabled||!owned())return null;const p=inspect(),q=p.selected;return q?.state===0&&q.kind===kind?q:null;}
// [VI dòng gốc 47] Định nghĩa hàm levelGoal; tham số: không có | Khai báo biến không gán lại bằng const: q = selected('LEVEL') hoặc dùng vế phải khi vế trái là null/undefined: selected('STAGE') | Kiểm tra !q: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: W.KVPV_REBORN_EXECUTORS?.cobaoStageGoal?.() hoặc dùng vế phải khi vế trái là null/undefined: null.
  function levelGoal(){const q=selected('LEVEL')??selected('STAGE');if(!q)return W.KVPV_REBORN_EXECUTORS?.cobaoStageGoal?.()??null;
// [VI dòng gốc 48] Khai báo biến không gán lại bằng const: current = nếu q.kind==='LEVEL' thì lấy Number(W._Ba?._rJ?._O$?.ins?.level), ngược lại lấy q.progress
    const current=q.kind==='LEVEL'?Number(W._Ba?._rJ?._O$?.ins?.level):q.progress;
// [VI dòng gốc 49] Kết thúc hàm hiện tại và trả về: nếu Number.isFinite(current)&&current>=0 thì lấy {...q,current}, ngược lại lấy null.
    return Number.isFinite(current)&&current>=0?{...q,current}:null;
// [VI dòng gốc 50] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 51] Định nghĩa hàm idle; tham số: không có | Kiểm tra Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: false. | Khai báo biến không gán lại bằng const: d = gọi W.KVPV_DAILY?.quickState() (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  function idle(){if(Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0))return false;const d=W.KVPV_DAILY?.quickState?.();return d?.running===true&&['rảnh','ranh'].includes(d.job)&&
// [VI dòng gốc 52] Tiếp tục hàm idle; thành phần cú pháp bắt đầu bằng name. Đọc cùng dòng mở phía trên: W._Ba?._$a?.SceneUtil?.isCommonScene===true&&W._Ba?._$a?._yo?.ins?.isInMission!==true&&
    W._Ba?._$a?.SceneUtil?.isCommonScene===true&&W._Ba?._$a?._yo?.ins?.isInMission!==true&&
// [VI dòng gốc 53] gọi W.KVPV?.core?.scene?.status() để trả trạng thái để kiểm tra
    W._Ba?._rJ?._O$?.ins?.isDead!==true&&!W.KVPV?.core?.scene?.status?.()?.owner;}
// [VI dòng gốc 54] Định nghĩa hàm sync; tham số: không có | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | Kiểm tra !S.enabled: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  function sync(){try{if(!S.enabled)return;if(!owned()){stop();return;}
// [VI dòng gốc 55] gán S.plan bằng inspect() | gán S.reason bằng S.plan.reason | Kiểm tra !S.plan.root: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    S.plan=inspect();S.reason=S.plan.reason;if(!S.plan.root)return;
// [VI dòng gốc 56] Kiểm tra W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true: đúng thì chạy nhánh sau if. | gán S.reason bằng 'priority_popup' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true){S.reason='priority_popup';return;}
// [VI dòng gốc 57] Khai báo biến không gán lại bằng const: api = đọc W.KVPV_V868; c = đọc api?.config nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const api=W.KVPV_V868,c=api?.config;
// [VI dòng gốc 58] Kiểm tra c: đúng thì chạy nhánh sau if. | Kiểm tra !c.enabled: đúng thì chạy nhánh sau if. | gọi api.start() để khởi động bộ điều khiển (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gán c.autoClaimEraTasks bằng true
    if(c){if(!c.enabled)api.start?.();c.autoClaimEraTasks=true;c.autoBreakthrough=true;c.autoNavigateUnfinished=false;}
// [VI dòng gốc 59] Kiểm tra S.plan.reason==='waiting_era_info': đúng thì chạy nhánh sau if. | gọi api?.inspect() (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    if(S.plan.reason==='waiting_era_info')api?.inspect?.();
// [VI dòng gốc 60] Chú thích gốc của tác giả; không được thực thi. Nội dung: Show the actual requirement panel once per root/era level. Leave the
    // Show the actual requirement panel once per root/era level. Leave the
// [VI dòng gốc 61] Chú thích gốc của tác giả; không được thực thi. Nội dung: native claim/breakthrough sender in charge; never click its paid bypass.
    // native claim/breakthrough sender in charge; never click its paid bypass.
// [VI dòng gốc 62] Khai báo biến không gán lại bằng const: key = tính biểu thức S.plan.root.id+'/'+S.plan.eraLevel; ui = đọc W._ft?._Y4n?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const key=S.plan.root.id+'/'+S.plan.eraLevel,ui=W._ft?._Y4n?.ins;
// [VI dòng gốc 63] Kiểm tra S.plan.root.state!==2&&S.openedKey!==key&&idle()&&ui?.open: đúng thì chạy nhánh sau if. | gán S.openedKey bằng key | gọi ui.open(41)
    if(S.plan.root.state!==2&&S.openedKey!==key&&idle()&&ui?.open){S.openedKey=key;ui.open(41);}
// [VI dòng gốc 64] gọi W.KVPV_QUEST_PRIORITY?.sync() (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gọi W.KVPV_QUEST_GOALS?.sync() (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gọi W.KVPV_PROGRESS_PLANNER?.sync() (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    W.KVPV_QUEST_PRIORITY?.sync?.();W.KVPV_QUEST_GOALS?.sync?.();W.KVPV_PROGRESS_PLANNER?.sync?.();
// [VI dòng gốc 65] Nhận lỗi bằng e và chạy phần xử lý lỗi. | gán S.lastError bằng String(e) | gán S.reason bằng 'error'
  }catch(e){S.lastError=String(e);S.reason='error';}}
// [VI dòng gốc 66] Định nghĩa hàm stop; tham số: không có. Mục đích: dừng bộ điều khiển và dọn tài nguyên | gán S.enabled bằng false | Kiểm tra S.timer!==null: đúng thì chạy nhánh sau if. | gọi W.KVPV_V1?.timers?.clearInterval??W.clearInterval(S.timer)
  function stop(){S.enabled=false;if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;}
// [VI dòng gốc 67] gán W.KVPV_REBORN_GOALS bằng Object.freeze({sync,stop,inspect,levelGoal,cobaoGoal:()=>selected('CO_BAO'),arenaGoal:()=>selected('ARENA'),towerGoal:()=>selected('LINH_LUNG'),fabaoGoal:()=>selected('FABAO'),equi…
  W.KVPV_REBORN_GOALS=Object.freeze({sync,stop,inspect,levelGoal,cobaoGoal:()=>selected('CO_BAO'),arenaGoal:()=>selected('ARENA'),towerGoal:()=>selected('LINH_LUNG'),fabaoGoal:()=>selected('FABAO'),equipmentGoal:()=>selected('EQUIPMENT'),
// [VI dòng gốc 68] Thuộc tính status: tạo hàm với tham số (không có); mỗi lần gọi trả về tạo đối tượng gồm enabled, actor, reason, plan, lastError, allowKNB | Thuộc tính enabled: đọc S.enabled | Thuộc tính actor: dùng biến cùng tên | Thuộc tính reason: đọc S.reason
    status:()=>({enabled:S.enabled,actor,reason:S.reason,plan:S.plan,lastError:S.lastError,allowKNB:false}),
// [VI dòng gốc 69] Thuộc tính _handoff: tạo hàm với tham số (không có); mỗi lần gọi trả về tạo đối tượng gồm actor, openedKey | Thuộc tính actor: dùng biến cùng tên | Thuộc tính openedKey: đọc S.openedKey
    _handoff:()=>({actor,openedKey:S.openedKey})});
// [VI dòng gốc 70] gán S.timer bằng (W.KVPV_V1?.timers?.setInterval??W.setInterval)(sync,500) | gọi sync()
  S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(sync,500);sync();
// [VI dòng gốc 71] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: })();
})();
// [VI dòng gốc 72] Dòng trống để tách các phần, không có lệnh thực thi.
