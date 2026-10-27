// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: Quest first. Level requirements use the actual native character level;
/* Quest first. Level requirements use the actual native character level;
 * Tian Quan uses the existing Tu Vuot controller, never a second entry RPC. */
// [VI dòng gốc 3] chạy ngay hàm bao để tạo phạm vi và khởi tạo phần chức năng bên trong
(() => {
// [VI dòng gốc 4] "use strict"
  'use strict';
// [VI dòng gốc 5] Khai báo biến không gán lại bằng const: W = window; old = đọc W.KVPV_QUEST_PRIORITY; carry = gọi old?._handoff(); chức năng nội bộ chưa xác minh từ tên hàm (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gọi old?.stop('reload') để dừng bộ điều khiển và dọn tài nguyên (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  const W=window,old=W.KVPV_QUEST_PRIORITY,carry=old?._handoff?.();old?.stop?.('reload');
// [VI dòng gốc 6] Khai báo biến không gán lại bằng const: actor = gọi String(W.__KVPV_OWN_ACTOR_ID||'') để chuyển sang chuỗi
  const actor=String(W.__KVPV_OWN_ACTOR_ID||'');
// [VI dòng gốc 7] Khai báo biến không gán lại bằng const: S = tạo đối tượng gồm enabled, timer, work, reason, lastError
  const S={enabled:true,timer:null,work:carry?.actor===actor?carry.work:null,reason:'waiting_task',lastError:''};
// [VI dòng gốc 8] Khai báo biến không gán lại bằng const: norm = tạo hàm với tham số x; mỗi lần gọi trả về gọi String(x||'').replace(/<[^>]*>/g,'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/gi,'d').toLowerCase()
  const norm=x=>String(x||'').replace(/<[^>]*>/g,'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/gi,'d').toLowerCase();
// [VI dòng gốc 9] Khai báo biến không gán lại bằng const: owned = tạo hàm với tham số (không có); mỗi lần gọi trả về actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'') và chỉ đánh giá vế phải khi vế trái truthy: !W.__KVPV_UNIVERSAL_HALTED
  const owned=()=>actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;
// [VI dòng gốc 10] Định nghĩa hàm task; tham số: không có | Khai báo biến không gán lại bằng const: row = đọc W._Ba?._zIt?._FIt?.ins?.taskInfo nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Kiểm tra !Array.isArray(row)||row[0]==null: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: null.
  function task(){const row=W._Ba?._zIt?._FIt?.ins?.taskInfo;if(!Array.isArray(row)||row[0]==null)return null;
// [VI dòng gốc 11] Khai báo biến không gán lại bằng const: cfg = gọi W._ft?.__Z?.ins?.getTaskCfgById(row[0]) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Kiểm tra !cfg: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: null.
    const cfg=W._ft?.__Z?.ins?.getTaskCfgById?.(row[0]);if(!cfg)return null;
// [VI dòng gốc 12] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm id, state, name, action.
    return {id:String(row[0]),state:Number(row[1]),name:String(cfg[1]||''),action:Number(cfg[6])};
// [VI dòng gốc 13] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 14] Định nghĩa hàm levelGoal; tham số: không có
  function levelGoal(){
// [VI dòng gốc 15] Khai báo biến không gán lại bằng const: dependency = gọi W.KVPV_REBORN_GOALS?.levelGoal() (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Kiểm tra dependency: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: dependency.
    const dependency=W.KVPV_REBORN_GOALS?.levelGoal?.();if(dependency)return dependency;
// [VI dòng gốc 16] Khai báo biến không gán lại bằng const: q = gọi task(); n = gọi norm(q?.name)
    const q=task(),n=norm(q?.name);
// [VI dòng gốc 17] Kiểm tra !q||![0,1,3].includes(q.state)||/phu van|co bao|trang bi|than khi|ky nang|pet|canh|tu vi|thien phu|ngoc|cuong hoa|tien vi|thoi trang|linh thu|phuc oa|bien than|nhan cuoi|than binh|…: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: null.
    if(!q||![0,1,3].includes(q.state)||/phu van|co bao|trang bi|than khi|ky nang|pet|canh|tu vi|thien phu|ngoc|cuong hoa|tien vi|thoi trang|linh thu|phuc oa|bien than|nhan cuoi|than binh|linh duc|thu cuoi/.test(n))return null;
// [VI dòng gốc 18] Kiểm tra !/(?:dat|len|tang)\s+cap\b|\bcap\s+(?:nhan vat|dat|den)|nhan vat.{0,22}cap|\b(?:level|lv)\s*\d/.test(n): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: null.
    if(!/(?:dat|len|tang)\s+cap\b|\bcap\s+(?:nhan vat|dat|den)|nhan vat.{0,22}cap|\b(?:level|lv)\s*\d/.test(n))return null;
// [VI dòng gốc 19] Khai báo biến không gán lại bằng const: target = gọi Number(/(?:cap|level|lv)\s*(\d{1,4})\b/.exec(n)?.[1]) để chuyển sang số; current = gọi Number(W._Ba?._rJ?._O$?.ins?.level) để chuyển sang số
    const target=Number(/(?:cap|level|lv)\s*(\d{1,4})\b/.exec(n)?.[1]),current=Number(W._Ba?._rJ?._O$?.ins?.level);
// [VI dòng gốc 20] Kết thúc hàm hiện tại và trả về: nếu Number.isSafeInteger(target)&&target>0&&Number.isSafeInteger(current)&&current>0 thì lấy {...q,target,current}, ngược lại lấy null.
    return Number.isSafeInteger(target)&&target>0&&Number.isSafeInteger(current)&&current>0?{...q,target,current}:null;
// [VI dòng gốc 21] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 22] Định nghĩa hàm hasPriority; tham số: không có | Kiểm tra !S.enabled||!owned(): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: false.
  function hasPriority(){if(!S.enabled||!owned())return false;
// [VI dòng gốc 23] Khai báo biến không gán lại bằng const: q = gọi task() | Kết thúc hàm hiện tại và trả về: !!(q&&[0,1,2,3].includes(q.state)) hoặc dùng vế phải khi vế trái falsy: !!W.KVPV_TIENVI_GOALS?.goal?.().
    const q=task();return !!(q&&[0,1,2,3].includes(q.state))||!!W.KVPV_TIENVI_GOALS?.goal?.();
// [VI dòng gốc 24] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 25] Định nghĩa hàm blocks; tham số: activity | Kiểm tra activity==='daily_trial': đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: hasPriority() và chỉ đánh giá vế phải khi vế trái truthy: task()?.state===2.
  function blocks(activity){if(activity==='daily_trial')return hasPriority()&&task()?.state===2;
// [VI dòng gốc 26] Kiểm tra !hasPriority(): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: false.
    if(!hasPriority())return false;
// [VI dòng gốc 27] Khai báo biến không gán lại bằng const: n = gọi norm(W.KVPV_REBORN_GOALS?.equipmentGoal?.()?.name??task()?.name); patterns = tạo đối tượng gồm daily_trial, beast_island, summon_boss, rune_boss
    const n=norm(W.KVPV_REBORN_GOALS?.equipmentGoal?.()?.name??task()?.name),patterns={daily_trial:/thi luyen|pho ban ngay/,beast_island:/than thu dao|phuong huyet|long phach/,summon_boss:/trieu hoi.*boss|boss.*trieu hoi/,rune_boss:/phu van/};
// [VI dòng gốc 28] Kết thúc hàm hiện tại và trả về: đảo giá trị đúng/sai của patterns[activity]?.test(n).
    return !patterns[activity]?.test(n);
// [VI dòng gốc 29] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 30] Khai báo biến không gán lại bằng const: sideKeys = tạo mảng gồm 7 vị trí: ['enableTienDuyen','enableCrystal','enableCompose','enableTuyetHoc','enableTinhThan','enableVinhDu','enableDaoTri']
  const sideKeys=['enableTienDuyen','enableCrystal','enableCompose','enableTuyetHoc','enableTinhThan','enableVinhDu','enableDaoTri'];
// [VI dòng gốc 31] Định nghĩa hàm pauseSides; tham số: không có | Khai báo biến không gán lại bằng const: c = đọc W.KVPV_DAILY?.config nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  function pauseSides(){const c=W.KVPV_DAILY?.config;
// [VI dòng gốc 32] Chú thích gốc của tác giả; không được thực thi. Nội dung: Upgrade from the old level-farming policy: return the user's saved Demon King setting once.
    // Upgrade from the old level-farming policy: return the user's saved Demon King setting once.
// [VI dòng gốc 33] Kiểm tra c&&S.work?.sides&&'enableHongHoang' in S.work.sides: đúng thì chạy nhánh sau if. | gán c.enableHongHoang bằng S.work.sides.enableHongHoang | xóa thuộc tính S.work.sides.enableHongHoang
    if(c&&S.work?.sides&&'enableHongHoang' in S.work.sides){c.enableHongHoang=S.work.sides.enableHongHoang;delete S.work.sides.enableHongHoang;}
// [VI dòng gốc 34] Kiểm tra c&&S.work?.sides&&'enableYeuVuong' in S.work.sides: đúng thì chạy nhánh sau if. | gán c.enableYeuVuong bằng S.work.sides.enableYeuVuong | xóa thuộc tính S.work.sides.enableYeuVuong
    if(c&&S.work?.sides&&'enableYeuVuong' in S.work.sides){c.enableYeuVuong=S.work.sides.enableYeuVuong;delete S.work.sides.enableYeuVuong;}
// [VI dòng gốc 35] Kiểm tra c: đúng thì chạy nhánh sau if. | Duyệt từng giá trị trong sideKeys bằng const key. | Khai báo biến không gán lại bằng const: key (chưa gán giá trị) | Kiểm tra S.work?.sides&&!(key in S.work.sides): đúng thì chạy nhánh sau if.
    if(c)for(const key of sideKeys){if(S.work?.sides&&!(key in S.work.sides))S.work.sides[key]=c[key];c[key]=false;}}
// [VI dòng gốc 36] Định nghĩa hàm restore; tham số: không có | Khai báo biến không gán lại bằng const: w = đọc S.work | Kiểm tra !w: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  function restore(){const w=S.work;if(!w)return;
// [VI dòng gốc 37] Kiểm tra owned(): đúng thì chạy nhánh sau if.
    if(owned()){
// [VI dòng gốc 38] Khai báo biến không gán lại bằng const: stage = đọc W._Ba?._Co?._Mo?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Kiểm tra stage?.auto===true: đúng thì chạy nhánh sau if. | gán stage.auto bằng false
      const stage=W._Ba?._Co?._Mo?.ins;if(stage?.auto===true)stage.auto=false;
// [VI dòng gốc 39] Kiểm tra W.KVPV_DAILY?.config: đúng thì chạy nhánh sau if. | gán W.KVPV_DAILY.config.enableTuVuot bằng w.dailyEnabled | gọi Object.assign(W.KVPV_DAILY.config, w.sides??{})
      if(W.KVPV_DAILY?.config){W.KVPV_DAILY.config.enableTuVuot=w.dailyEnabled;Object.assign(W.KVPV_DAILY.config,w.sides??{});}
// [VI dòng gốc 40] Kiểm tra W.KVPV_V866?.config: đúng thì chạy nhánh sau if. | gọi Object.assign(W.KVPV_V866.config, w.director)
      if(W.KVPV_V866?.config)Object.assign(W.KVPV_V866.config,w.director);
// [VI dòng gốc 41] gán S.work bằng null
    }S.work=null;
// [VI dòng gốc 42] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 43] Định nghĩa hàm safe; tham số: không có | Khai báo biến không gán lại bằng const: d = gọi W.KVPV_DAILY?.quickState() (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); scene = đọc W._Ba?._$a nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); team = đọc W._Ba?._cm?._q3t?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  function safe(){const d=W.KVPV_DAILY?.quickState?.(),scene=W._Ba?._$a,team=W._Ba?._cm?._q3t?.ins;
// [VI dòng gốc 44] Khai báo biến không gán lại bằng const: director = gọi W.KVPV_V866?.status(false) để trả trạng thái để kiểm tra (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const director=W.KVPV_V866?.status?.(false);
// [VI dòng gốc 45] Kết thúc hàm hiện tại và trả về: scene?.SceneUtil?.isCommonScene===true&&scene?._yo?.ins?.isInMission!==true&& W._Ba?._rJ?._O$?.ins?.isDead!==true&&d?.running===true&&['rảnh','ranh'].includes(d.job)&& !W.KVPV?.cor… và chỉ đánh giá vế phải khi vế trái truthy: !/Da gui EXP MATCH/.test(String(director?.soloIdleReason||'')).
    return scene?.SceneUtil?.isCommonScene===true&&scene?._yo?.ins?.isInMission!==true&&
// [VI dòng gốc 46] gọi ['rảnh','ranh'].includes(d.job) để kiểm tra dữ liệu có chứa giá trị
      W._Ba?._rJ?._O$?.ins?.isDead!==true&&d?.running===true&&['rảnh','ranh'].includes(d.job)&&
// [VI dòng gốc 47] gọi W.KVPV?.core?.scene?.status() để trả trạng thái để kiểm tra | gọi W.KVPV_UPGRADES?.busy()
      !W.KVPV?.core?.scene?.status?.()?.owner&&!W.KVPV_UPGRADES?.busy?.()&&
// [VI dòng gốc 48] gọi W.KVPV_HITRUN1?.status(false) để trả trạng thái để kiểm tra | gọi team?.getHasTeams() | gọi Number(team?.roomId) để chuyển sang số
      !W.KVPV_HITRUN1?.status?.(false)?.running&&!team?.getHasTeams?.()&&!(Number(team?.roomId)>0)&&
// [VI dòng gốc 49] gọi /Da gui EXP MATCH/.test(String(director?.soloIdleReason||'')) | gọi String(director?.soloIdleReason||'') để chuyển sang chuỗi
      !/Da gui EXP MATCH/.test(String(director?.soloIdleReason||''));
// [VI dòng gốc 50] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 51] Định nghĩa hàm hongOpen; tham số: không có
  function hongOpen(){
// [VI dòng gốc 52] Khai báo biến không gán lại bằng const: enabled = S.work?.sides?.enableHongHoang hoặc dùng vế phải khi vế trái là null/undefined: W.KVPV_DAILY?.config?.enableHongHoang
    const enabled=S.work?.sides?.enableHongHoang??W.KVPV_DAILY?.config?.enableHongHoang;
// [VI dòng gốc 53] Khai báo biến không gán lại bằng const: state = gọi W._Ba?._sst?._ist?.inst?.getCpSceneStateByType(17) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); m = đọc W._Ba?._OBt?._WBt?.inst nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const state=W._Ba?._sst?._ist?.inst?.getCpSceneStateByType?.(17),m=W._Ba?._OBt?._WBt?.inst;
// [VI dòng gốc 54] Kết thúc hàm hiện tại và trả về: enabled===true&&Number(state?.[2])===2&&!!m và chỉ đánh giá vế phải khi vế trái truthy: m.getGathCountIsMax?.()===false.
    return enabled===true&&Number(state?.[2])===2&&!!m&&m.getGathCountIsMax?.()===false;
// [VI dòng gốc 55] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 56] Định nghĩa hàm sync; tham số: không có | Kiểm tra W.KVPV_ENTRY_POLICY?.manual===true: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể. | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài.
  function sync(){if(W.KVPV_ENTRY_POLICY?.manual===true)return;try{
// [VI dòng gốc 57] Kiểm tra !S.enabled: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể. | Kiểm tra W.KVPV_BOSS_TEAM?.priority?.(): đúng thì chạy nhánh sau if. | gán S.reason bằng 'private_boss_invitation_priority'
    if(!S.enabled)return;if(W.KVPV_BOSS_TEAM?.priority?.()){S.reason='private_boss_invitation_priority';return;}if(!owned()){stop();return;}
// [VI dòng gốc 58] Kiểm tra hongOpen(): đúng thì chạy nhánh sau if. | gọi restore() | gán S.reason bằng 'yield_to_open_honghoang' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(hongOpen()){restore();S.reason='yield_to_open_honghoang';return;}
// [VI dòng gốc 59] Khai báo biến không gán lại bằng const: q = gọi levelGoal() | Kiểm tra !q||q.current>=q.target: đúng thì chạy nhánh sau if. | gọi restore() | gán S.reason bằng q?'level_met_waiting_quest_ack':'quest_first'
    const q=levelGoal();if(!q||q.current>=q.target){restore();S.reason=q?'level_met_waiting_quest_ack':'quest_first';return;}
// [VI dòng gốc 60] Kiểm tra W.KVPV?.stageGuard?.isLocked?.()===true: đúng thì chạy nhánh sau if. | gọi restore() | gán S.reason bằng 'tianquan_manually_paused' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(W.KVPV?.stageGuard?.isLocked?.()===true){restore();S.reason='tianquan_manually_paused';return;}
// [VI dòng gốc 61] Kiểm tra W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true: đúng thì chạy nhánh sau if. | gán S.reason bằng 'priority_popup' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true){S.reason='priority_popup';return;}
// [VI dòng gốc 62] Kiểm tra S.work&&S.work.key!==q.id: đúng thì chạy nhánh sau if. | gọi restore()
    if(S.work&&S.work.key!==q.id)restore();
// [VI dòng gốc 63] Kiểm tra S.work: đúng thì chạy nhánh sau if. | gọi pauseSides() | Kiểm tra W.KVPV_DAILY?.config: đúng thì chạy nhánh sau if. | gán W.KVPV_DAILY.config.enableTuVuot bằng true
    if(S.work){pauseSides();if(W.KVPV_DAILY?.config)W.KVPV_DAILY.config.enableTuVuot=true;S.reason='tianquan_for_missing_exp';return;}
// [VI dòng gốc 64] Kiểm tra !safe(): đúng thì chạy nhánh sau if. | gán S.reason bằng 'waiting_current_activity_before_tianquan' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(!safe()){S.reason='waiting_current_activity_before_tianquan';return;}
// [VI dòng gốc 65] Khai báo biến không gán lại bằng const: daily = đọc W.KVPV_DAILY; cfg = đọc W.KVPV_V866?.config nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const daily=W.KVPV_DAILY,cfg=W.KVPV_V866?.config;
// [VI dòng gốc 66] Kiểm tra typeof daily?.tuVuotStart!=='function'||!cfg: đúng thì chạy nhánh sau if. | gán S.reason bằng 'waiting_tianquan_executor' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(typeof daily?.tuVuotStart!=='function'||!cfg){S.reason='waiting_tianquan_executor';return;}
// [VI dòng gốc 67] gán S.work bằng {key:q.id,sides:Object.fromEntries(sideKeys.map(key=>[key,daily.config?.[key]])),dailyEnabled:daily.config?.enableTuVuot===true,director:{questFirst:cfg.questFirst, autoPublicExpMa…
    S.work={key:q.id,sides:Object.fromEntries(sideKeys.map(key=>[key,daily.config?.[key]])),dailyEnabled:daily.config?.enableTuVuot===true,director:{questFirst:cfg.questFirst,
// [VI dòng gốc 68] Thuộc tính autoPublicExpMatching: đọc cfg.autoPublicExpMatching | Thuộc tính enableVerifiedExp4Account: đọc cfg.enableVerifiedExp4Account
      autoPublicExpMatching:cfg.autoPublicExpMatching,enableVerifiedExp4Account:cfg.enableVerifiedExp4Account}};
// [VI dòng gốc 69] gán cfg.questFirst bằng false | gán cfg.autoPublicExpMatching bằng false | gán cfg.enableVerifiedExp4Account bằng false
    cfg.questFirst=false;cfg.autoPublicExpMatching=false;cfg.enableVerifiedExp4Account=false;
// [VI dòng gốc 70] gọi W.KVPV_V866.tick() để xử lý một nhịp kiểm tra (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gọi pauseSides()
    W.KVPV_V866.tick?.();pauseSides();
// [VI dòng gốc 71] gọi daily.tuVuotStart() | gán S.reason bằng 'tianquan_for_missing_exp'
    daily.tuVuotStart();S.reason='tianquan_for_missing_exp';
// [VI dòng gốc 72] Nhận lỗi bằng e và chạy phần xử lý lỗi. | gán S.lastError bằng String(e) | gán S.reason bằng 'error_no_entry_replay'
  }catch(e){S.lastError=String(e);S.reason='error_no_entry_replay';}}
// [VI dòng gốc 73] Định nghĩa hàm stop; tham số: reason='manual'. Mục đích: dừng bộ điều khiển và dọn tài nguyên | gán S.enabled bằng false | Kiểm tra S.timer!==null: đúng thì chạy nhánh sau if. | gọi W.KVPV_V1?.timers?.clearInterval??W.clearInterval(S.timer)
  function stop(reason='manual'){S.enabled=false;if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;if(reason!=='reload')restore();}
// [VI dòng gốc 74] Định nghĩa hàm start; tham số: không có. Mục đích: khởi động bộ điều khiển | Kiểm tra S.timer!==null: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể. | gán S.enabled bằng true
  function start(){if(S.timer!==null)return;S.enabled=true;S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(sync,500);sync();}
// [VI dòng gốc 75] gán W.KVPV_QUEST_PRIORITY bằng Object.freeze({start,stop,sync,hasPriority,blocks, status:()=>({enabled:S.enabled,priority:hasPriority(),task:task(),levelGoal:levelGoal(),reason:S.reason,lastError:S.lastError,all…
  W.KVPV_QUEST_PRIORITY=Object.freeze({start,stop,sync,hasPriority,blocks,
// [VI dòng gốc 76] Thuộc tính status: tạo hàm với tham số (không có); mỗi lần gọi trả về tạo đối tượng gồm enabled, priority, task, levelGoal, reason, lastError, allowKNB | Thuộc tính enabled: đọc S.enabled | Thuộc tính priority: gọi hasPriority() | Thuộc tính task: gọi task()
    status:()=>({enabled:S.enabled,priority:hasPriority(),task:task(),levelGoal:levelGoal(),reason:S.reason,lastError:S.lastError,allowKNB:false}),
// [VI dòng gốc 77] Kiểm tra W.KVPV_DAILY: đúng thì chạy nhánh sau if. | gọi start() để khởi động bộ điều khiển
    _handoff:()=>({actor,work:S.work})});if(W.KVPV_DAILY)start();
// [VI dòng gốc 78] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: })();
})();
// [VI dòng gốc 79] Dòng trống để tách các phần, không có lệnh thực thi.
