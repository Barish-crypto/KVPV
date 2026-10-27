// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: Định tuyến hai nhóm nhiệm vụ đã có executor: Cổ Bảo và Linh Lung.
/* Định tuyến hai nhóm nhiệm vụ đã có executor: Cổ Bảo và Linh Lung.
 * Đọc taskInfo + cfg native; khớp actionId lẫn tên và số mục tiêu, không OCR.
 * Không tạo RPC: chỉnh mục tiêu executor cũ, gọi controller tháp khi map rảnh.
 * Giữ lượt đã khởi động qua reload; không restart cùng nhiệm vụ sau lỗi. */
// [VI dòng gốc 5] chạy ngay hàm bao để tạo phạm vi và khởi tạo phần chức năng bên trong
(() => {
// [VI dòng gốc 6] "use strict"
  'use strict';
// [VI dòng gốc 7] Khai báo biến không gán lại bằng const: W = window; old = đọc W.KVPV_QUEST_GOALS; carry = gọi old?._handoff(); chức năng nội bộ chưa xác minh từ tên hàm (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gọi old?.stop('reload') để dừng bộ điều khiển và dọn tài nguyên (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  const W=window,old=W.KVPV_QUEST_GOALS,carry=old?._handoff?.();old?.stop?.('reload');
// [VI dòng gốc 8] Khai báo biến không gán lại bằng const: actor = gọi String(W.__KVPV_OWN_ACTOR_ID||'') để chuyển sang chuỗi; same = tính biểu thức carry?.actor===actor
  const actor=String(W.__KVPV_OWN_ACTOR_ID||''),same=carry?.actor===actor;
// [VI dòng gốc 9] Khai báo biến không gán lại bằng const: S = tạo đối tượng gồm enabled, timer, route, reason, lastError, towerOwned, startedKey, savedCo, stageWork, dependency, history
  const S={enabled:true,timer:null,route:null,reason:'waiting_task',lastError:'',
// [VI dòng gốc 10] Thuộc tính towerOwned: nếu same thì lấy carry.towerOwned, ngược lại lấy false | Thuộc tính startedKey: nếu same thì lấy carry.startedKey, ngược lại lấy null
    towerOwned:same?carry.towerOwned:false,startedKey:same?carry.startedKey:null,
// [VI dòng gốc 11] Thuộc tính savedCo: nếu same thì lấy carry.savedCo, ngược lại lấy null | Thuộc tính stageWork: nếu same thì lấy carry.stageWork, ngược lại lấy null | Thuộc tính dependency: null | Thuộc tính history: tạo mảng gồm 0 vị trí: []
    savedCo:same?carry.savedCo:null,stageWork:same?carry.stageWork:null,dependency:null,history:[]};
// [VI dòng gốc 12] Khai báo biến không gán lại bằng const: owned = tạo hàm với tham số (không có); mỗi lần gọi trả về actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'') và chỉ đánh giá vế phải khi vế trái truthy: !W.__KVPV_UNIVERSAL_HALTED
  const owned=()=>actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;
// [VI dòng gốc 13] Định nghĩa hàm mainTask; tham số: không có | Khai báo biến không gán lại bằng const: row = đọc W._Ba?._zIt?._FIt?.ins?.taskInfo nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  function mainTask(){const row=W._Ba?._zIt?._FIt?.ins?.taskInfo;
// [VI dòng gốc 14] Kiểm tra !Array.isArray(row)||row[0]==null: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: null.
    if(!Array.isArray(row)||row[0]==null)return null;
// [VI dòng gốc 15] Khai báo biến không gán lại bằng const: cfg = gọi W._ft?.__Z?.ins?.getTaskCfgById(row[0]) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Kiểm tra !cfg: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: null.
    const cfg=W._ft?.__Z?.ins?.getTaskCfgById?.(row[0]);if(!cfg)return null;
// [VI dòng gốc 16] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm id, state, name, action, progress.
    return {id:String(row[0]),state:Number(row[1]),name:String(cfg[1]||''),action:Number(cfg[6]),progress:row[2]??null};
// [VI dòng gốc 17] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 18] Định nghĩa hàm task; tham số: không có | Khai báo biến không gán lại bằng const: main = gọi mainTask() | Kết thúc hàm hiện tại và trả về: nếu recognize(main)&&main.state!==2 thì lấy main, ngược lại lấy W.KVPV_REBORN_GOALS?.towerGoal?.()??W.KVPV_TIENVI_GOALS?.goal?.()??main.
  function task(){const main=mainTask();return recognize(main)&&main.state!==2?main:(W.KVPV_REBORN_GOALS?.towerGoal?.()??W.KVPV_TIENVI_GOALS?.goal?.()??main);}
// [VI dòng gốc 19] Khai báo biến không gán lại bằng const: normalize = tạo hàm với tham số x; mỗi lần gọi trả về gọi String(x).replace(/<[^>]*>/g,'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/gi,'d').toLowerCase().replace(/\s+/g,' ').trim()
  const normalize=x=>String(x).replace(/<[^>]*>/g,'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/gi,'d').toLowerCase().replace(/\s+/g,' ').trim();
// [VI dòng gốc 20] Định nghĩa hàm recognize; tham số: q | Kiểm tra !q: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: null. | Khai báo biến không gán lại bằng const: name = gọi normalize(q.name)
  function recognize(q){if(!q)return null;const name=normalize(q.name);let kind,match;
// [VI dòng gốc 21] Kiểm tra q.action===189&&/co bao/.test(name)&&/kich hoat/.test(name): đúng thì chạy nhánh sau if, sai thì chạy nhánh else.
    if(q.action===189&&/co bao/.test(name)&&/kich hoat/.test(name)){
// [VI dòng gốc 22] gán kind bằng 'CO_BAO' | gán match bằng /kich hoat\s*(\d+)\s*co bao/.exec(name)
      kind='CO_BAO';match=/kich hoat\s*(\d+)\s*co bao/.exec(name);
// [VI dòng gốc 23] Kiểm tra q.action===21&&/linh lung thap/.test(name): đúng thì chạy nhánh sau if.
    }else if(q.action===21&&/linh lung thap/.test(name)){
// [VI dòng gốc 24] gán kind bằng 'LINH_LUNG' | gán match bằng /linh lung thap\s*(?:tang)?\s*(\d+)/.exec(name)
      kind='LINH_LUNG';match=/linh lung thap\s*(?:tang)?\s*(\d+)/.exec(name);
// [VI dòng gốc 25] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 26] Khai báo biến không gán lại bằng const: target = gọi Number(['TIEN_VI','REBORN'].includes(q.source)?q.target:match?.[1]) để chuyển sang số | Kết thúc hàm hiện tại và trả về: nếu kind&&Number.isSafeInteger(target)&&target>0&&target<=10000 thì lấy {kind,target,key:q.id+'/'+kind+'/'+target}, ngược lại lấy null.
    const target=Number(['TIEN_VI','REBORN'].includes(q.source)?q.target:match?.[1]);return kind&&Number.isSafeInteger(target)&&target>0&&target<=10000?{kind,target,key:q.id+'/'+kind+'/'+target}:null;
// [VI dòng gốc 27] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 28] Định nghĩa hàm restoreCo; tham số: không có | gọi restoreStage() | Khai báo biến không gán lại bằng const: cfg = đọc W.KVPV_V864?.config nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Kiểm tra S.savedCo&&cfg: đúng thì chạy nhánh sau if.
  function restoreCo(){restoreStage();const cfg=W.KVPV_V864?.config;if(S.savedCo&&cfg){Object.assign(cfg,S.savedCo);S.savedCo=null;}}
// [VI dòng gốc 29] Định nghĩa hàm note; tham số: reason | Kiểm tra S.reason!==reason: đúng thì chạy nhánh sau if. | gọi S.history.push({at:Date.now(),reason}) để thêm phần tử vào cuối mảng | Kiểm tra S.history.length>40: đúng thì chạy nhánh sau if.
  function note(reason){if(S.reason!==reason){S.history.push({at:Date.now(),reason});if(S.history.length>40)S.history.shift();}S.reason=reason;}
// [VI dòng gốc 30] Định nghĩa hàm tower; tham số: không có | Kết thúc hàm hiện tại và trả về: đọc W.KVPV_LINHLUNG922.
  function tower(){return W.KVPV_LINHLUNG922;}
// [VI dòng gốc 31] Định nghĩa hàm stopOwnedTower; tham số: không có
  function stopOwnedTower(){
// [VI dòng gốc 32] Kiểm tra !S.towerOwned: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: true.
    if(!S.towerOwned)return true;
// [VI dòng gốc 33] Khai báo biến không gán lại bằng const: s = gọi tower()?.status(false) để trả trạng thái để kiểm tra (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const s=tower()?.status?.(false);
// [VI dòng gốc 34] Kiểm tra s?.pendingFloor||s?.pendingClaim: đúng thì chạy nhánh sau if. | gọi note('waiting_owned_tower_finish') | Kết thúc hàm hiện tại và trả về: false.
    if(s?.pendingFloor||s?.pendingClaim){note('waiting_owned_tower_finish');return false;}
// [VI dòng gốc 35] Kiểm tra s?.active: đúng thì chạy nhánh sau if. | gọi tower()?.stop('Nhiệm vụ đã đổi hoặc đủ mục tiêu') để dừng bộ điều khiển và dọn tài nguyên (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gán S.towerOwned bằng false | Kết thúc hàm hiện tại và trả về: true.
    if(s?.active)tower()?.stop?.('Nhiệm vụ đã đổi hoặc đủ mục tiêu');S.towerOwned=false;return true;
// [VI dòng gốc 36] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 37] Định nghĩa hàm idle; tham số: không có | Kiểm tra Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: false. | Khai báo biến không gán lại bằng const: q = gọi W.KVPV_DAILY?.quickState() (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); lease = gọi W.KVPV?.core?.scene?.status() để trả trạng thái để kiểm tra (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  function idle(){if(Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0))return false;const q=W.KVPV_DAILY?.quickState?.(),lease=W.KVPV?.core?.scene?.status?.();
// [VI dòng gốc 38] Kết thúc hàm hiện tại và trả về: W._Ba?._$a?.SceneUtil?.isCommonScene===true&&W._Ba?._$a?._yo?.ins?.isInMission!==true&& W._Ba?._rJ?._O$?.ins?.isDead!==true&&q?.running===true&&['rảnh','ranh'].includes(q.job)&& !l… và chỉ đánh giá vế phải khi vế trái truthy: !W.KVPV_DAILY_TRIAL?.hasPriority?.().
    return W._Ba?._$a?.SceneUtil?.isCommonScene===true&&W._Ba?._$a?._yo?.ins?.isInMission!==true&&
// [VI dòng gốc 39] gọi ['rảnh','ranh'].includes(q.job) để kiểm tra dữ liệu có chứa giá trị
      W._Ba?._rJ?._O$?.ins?.isDead!==true&&q?.running===true&&['rảnh','ranh'].includes(q.job)&&
// [VI dòng gốc 40] gọi W.KVPV_HITRUN1?.status(false) để trả trạng thái để kiểm tra | gọi W.KVPV_UPGRADES?.busy()
      !lease?.owner&&!W.KVPV_HITRUN1?.status?.(false)?.running&&!W.KVPV_UPGRADES?.busy?.()&&
// [VI dòng gốc 41] gọi W.KVPV_DAILY_TRIAL?.hasPriority()
      !W.KVPV_DAILY_TRIAL?.hasPriority?.();
// [VI dòng gốc 42] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 43] Chú thích gốc của tác giả; không được thực thi. Nội dung: Native Cổ Bảo: cfg[2] là các mảnh, cfg[7] cùng chỉ số là ải nhận.
  // Native Cổ Bảo: cfg[2] là các mảnh, cfg[7] cùng chỉ số là ải nhận.
// [VI dòng gốc 44] Định nghĩa hàm prerequisites; tham số: p
  function prerequisites(p){
// [VI dòng gốc 45] Khai báo biến không gán lại bằng const: f = đọc p?.fragments nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); stage = đọc W._Ba?._Co?._Mo?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); level = gọi Number(stage?.curLv) để chuyển sang số
    const f=p?.fragments,stage=W._Ba?._Co?._Mo?.ins,level=Number(stage?.curLv);
// [VI dòng gốc 46] Khai báo biến không gán lại bằng const: missing = gọi (f?.rows??[]).filter(x=>!x.owned&&!x.placed).map((x,index)=>{ const required=Number(x.stage??f?.config?.[7]?.[x.index??index]); const cfg=Number.isSafeInteger(required)&…) để biến đổi từng phần tử
    const missing=(f?.rows??[]).filter(x=>!x.owned&&!x.placed).map((x,index)=>{
// [VI dòng gốc 47] Khai báo biến không gán lại bằng const: required = gọi Number(x.stage??f?.config?.[7]?.[x.index??index]) để chuyển sang số
      const required=Number(x.stage??f?.config?.[7]?.[x.index??index]);
// [VI dòng gốc 48] Khai báo biến không gán lại bằng const: cfg = nếu Number.isSafeInteger(required)&&required>0 thì lấy W._ft?._h$?.ins?.getCfgByLv?.(required), ngược lại lấy null
      const cfg=Number.isSafeInteger(required)&&required>0?W._ft?._h$?.ins?.getCfgByLv?.(required):null;
// [VI dòng gốc 49] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm id, name, stage, source, step.
      return {id:x.id,name:String(W._ft?._mY?.ins?.getItemCfgById?.(x.id)?.[1]||''),
// [VI dòng gốc 50] Thuộc tính stage: nếu cfg&&Number(cfg[0])>0 thì lấy required, ngược lại lấy null
        stage:cfg&&Number(cfg[0])>0?required:null,
// [VI dòng gốc 51] Thuộc tính source: "shenqi[7]" | Thuộc tính step: nếu cfg&&Number(cfg[0])>0&&Number.isSafeInteger(level) thì lấy level<=required?'clear_stage':Array.isArray(stage?.awardLvs)&&stage.awardLvs.map(Number).includes(required)?'claim_reward':'waiting_fragment_state', ngược lại lấy 'unknown_source'
        source:'shenqi[7]',step:cfg&&Number(cfg[0])>0&&Number.isSafeInteger(level)?
// [VI dòng gốc 52] gọi Array.isArray(stage?.awardLvs) | gọi stage.awardLvs.map(Number).includes(required) để kiểm tra dữ liệu có chứa giá trị | gọi stage.awardLvs.map(Number) để biến đổi từng phần tử
          level<=required?'clear_stage':Array.isArray(stage?.awardLvs)&&stage.awardLvs.map(Number).includes(required)?'claim_reward':'waiting_fragment_state':'unknown_source'};
// [VI dòng gốc 53] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    });
// [VI dòng gốc 54] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm artifactNumber, name, currentStage, missing.
    return {artifactNumber:Number(f?.count)+1,name:String(f?.config?.[1]||''),currentStage:Number.isSafeInteger(level)?level:null,missing};
// [VI dòng gốc 55] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 56] Định nghĩa hàm restoreStage; tham số: không có | Khai báo biến không gán lại bằng const: w = đọc S.stageWork | Kiểm tra !w: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  function restoreStage(){const w=S.stageWork;if(!w)return;
// [VI dòng gốc 57] Khai báo biến không gán lại bằng const: cfg = đọc W.KVPV_V864?.config nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); stage = đọc W._Ba?._Co?._Mo?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); daily = đọc W.KVPV_DAILY
    const cfg=W.KVPV_V864?.config,stage=W._Ba?._Co?._Mo?.ins,daily=W.KVPV_DAILY;
// [VI dòng gốc 58] Kiểm tra cfg: đúng thì chạy nhánh sau if. | gán cfg.suspendTuVuotDuringCoBao bằng w.suspend
    if(cfg)cfg.suspendTuVuotDuringCoBao=w.suspend;
// [VI dòng gốc 59] Kiểm tra W.KVPV_V866?.config&&typeof w.questFirst==='boolean': đúng thì chạy nhánh sau if. | gán W.KVPV_V866.config.questFirst bằng w.questFirst
    if(W.KVPV_V866?.config&&typeof w.questFirst==='boolean')W.KVPV_V866.config.questFirst=w.questFirst;
// [VI dòng gốc 60] Kiểm tra owned(): đúng thì chạy nhánh sau if.
    if(owned()){
// [VI dòng gốc 61] Chú thích gốc của tác giả; không được thực thi. Nội dung: Dừng nhận ải tiếp theo, không gửi lệnh rời trận đang đánh.
      // Dừng nhận ải tiếp theo, không gửi lệnh rời trận đang đánh.
// [VI dòng gốc 62] Kiểm tra stage?.auto===true: đúng thì chạy nhánh sau if. | gán stage.auto bằng false
      if(stage?.auto===true)stage.auto=false;
// [VI dòng gốc 63] Kiểm tra daily?.config: đúng thì chạy nhánh sau if. | gán daily.config.enableTuVuot bằng w.dailyEnabled
      if(daily?.config)daily.config.enableTuVuot=w.dailyEnabled;
// [VI dòng gốc 64] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 65] gán S.stageWork bằng null
    S.stageWork=null;
// [VI dòng gốc 66] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 67] Định nghĩa hàm acquireFragment; tham số: p
  function acquireFragment(p){
// [VI dòng gốc 68] gán S.dependency bằng prerequisites(p)
    S.dependency=prerequisites(p);
// [VI dòng gốc 69] Kiểm tra p?.step!=='missing': đúng thì chạy nhánh sau if. | gọi restoreStage() | Kết thúc hàm hiện tại và trả về: false.
    if(p?.step!=='missing'){restoreStage();return false;}
// [VI dòng gốc 70] Khai báo biến không gán lại bằng const: goals = gọi S.dependency.missing.filter(x=>x.step==='clear_stage').map(x=>x.stage) để biến đổi từng phần tử
    const goals=S.dependency.missing.filter(x=>x.step==='clear_stage').map(x=>x.stage);
// [VI dòng gốc 71] Khai báo biến không gán lại bằng const: target = nếu goals.length thì lấy Math.min(...goals), ngược lại lấy null
    const target=goals.length?Math.min(...goals):null;
// [VI dòng gốc 72] Kiểm tra S.stageWork&&(target===null||S.stageWork.goal!==target): đúng thì chạy nhánh sau if. | gọi restoreStage()
    if(S.stageWork&&(target===null||S.stageWork.goal!==target))restoreStage();
// [VI dòng gốc 73] Kiểm tra target===null: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: false.
    if(target===null)return false;
// [VI dòng gốc 74] Khai báo biến không gán lại bằng const: cfg = đọc W.KVPV_V864?.config nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); daily = đọc W.KVPV_DAILY
    const cfg=W.KVPV_V864?.config,daily=W.KVPV_DAILY;
// [VI dòng gốc 75] Kiểm tra !cfg||typeof daily?.tuVuotStart!=='function': đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: false.
    if(!cfg||typeof daily?.tuVuotStart!=='function')return false;
// [VI dòng gốc 76] Kiểm tra W.KVPV?.stageGuard?.isLocked?.()===true: đúng thì chạy nhánh sau if. | gọi note('cobao_prerequisite_stage_manually_paused') | Kết thúc hàm hiện tại và trả về: true.
    if(W.KVPV?.stageGuard?.isLocked?.()===true){note('cobao_prerequisite_stage_manually_paused');return true;}
// [VI dòng gốc 77] Kiểm tra S.stageWork: đúng thì chạy nhánh sau if. | gán cfg.suspendTuVuotDuringCoBao bằng false | gọi note('cobao_farming_stage_'+target) | Kết thúc hàm hiện tại và trả về: true.
    if(S.stageWork){cfg.suspendTuVuotDuringCoBao=false;note('cobao_farming_stage_'+target);return true;}
// [VI dòng gốc 78] Kiểm tra !idle(): đúng thì chạy nhánh sau if. | gọi note('waiting_idle_for_cobao_fragment_stage') | Kết thúc hàm hiện tại và trả về: true.
    if(!idle()){note('waiting_idle_for_cobao_fragment_stage');return true;}
// [VI dòng gốc 79] gán S.stageWork bằng {goal:target,suspend:cfg.suspendTuVuotDuringCoBao,dailyEnabled:daily.config?.enableTuVuot===true,questFirst:W.KVPV_V866?.config?.questFirst}
    S.stageWork={goal:target,suspend:cfg.suspendTuVuotDuringCoBao,dailyEnabled:daily.config?.enableTuVuot===true,questFirst:W.KVPV_V866?.config?.questFirst};
// [VI dòng gốc 80] gán cfg.suspendTuVuotDuringCoBao bằng false
    cfg.suspendTuVuotDuringCoBao=false;
// [VI dòng gốc 81] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài.
    try{
// [VI dòng gốc 82] Chú thích gốc của tác giả; không được thực thi. Nội dung: Director cũ cũng giữ enableTuVuot=false cho mọi quest Cổ Bảo.
      // Director cũ cũng giữ enableTuVuot=false cho mọi quest Cổ Bảo.
// [VI dòng gốc 83] Chú thích gốc của tác giả; không được thực thi. Nội dung: Nhả riêng chính sách đó trong lượt kiếm mảnh, không dừng executor/queue.
      // Nhả riêng chính sách đó trong lượt kiếm mảnh, không dừng executor/queue.
// [VI dòng gốc 84] Kiểm tra W.KVPV_V866?.config: đúng thì chạy nhánh sau if. | gán W.KVPV_V866.config.questFirst bằng false | gọi W.KVPV_V866.tick() để xử lý một nhịp kiểm tra (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
      if(W.KVPV_V866?.config){W.KVPV_V866.config.questFirst=false;W.KVPV_V866.tick?.();}
// [VI dòng gốc 85] gọi daily.tuVuotStart() | gọi note('cobao_farming_stage_'+target)
      daily.tuVuotStart();note('cobao_farming_stage_'+target);}
// [VI dòng gốc 86] Nhận lỗi bằng e và chạy phần xử lý lỗi. | gọi restoreStage() | Ném lỗi và chuyển luồng tới catch gần nhất: e
    catch(e){restoreStage();throw e;}
// [VI dòng gốc 87] Kết thúc hàm hiện tại và trả về: true.
    return true;
// [VI dòng gốc 88] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 89] Định nghĩa hàm tick; tham số: không có. Mục đích: xử lý một nhịp kiểm tra | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài.
  function tick(){try{
// [VI dòng gốc 90] Kiểm tra !S.enabled: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể. | Kiểm tra !owned(): đúng thì chạy nhánh sau if. | gọi stop() để dừng bộ điều khiển và dọn tài nguyên
    if(!S.enabled)return;if(!owned()){stop();return;}
// [VI dòng gốc 91] Kiểm tra W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true: đúng thì chạy nhánh sau if. | gọi note('priority_popup') | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true){note('priority_popup');return;}
// [VI dòng gốc 92] Khai báo biến không gán lại bằng const: q = gọi task(); route = gọi recognize(q) | gán S.route bằng route?{...route,task:q}:null
    const q=task(),route=recognize(q);S.route=route?{...route,task:q}:null;
// [VI dòng gốc 93] Kiểm tra !route||q.state===2: đúng thì chạy nhánh sau if. | gọi restoreCo() | Kiểm tra !stopOwnedTower(): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(!route||q.state===2){restoreCo();if(!stopOwnedTower())return;note(q?.state===2?'waiting_native_quest_reward':'no_supported_goal');return;}
// [VI dòng gốc 94] Kiểm tra route.kind==='CO_BAO': đúng thì chạy nhánh sau if.
    if(route.kind==='CO_BAO'){
// [VI dòng gốc 95] Kiểm tra !stopOwnedTower(): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      if(!stopOwnedTower())return;
// [VI dòng gốc 96] Khai báo biến không gán lại bằng const: api = đọc W.KVPV_V864; cfg = đọc api?.config nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Kiểm tra !cfg: đúng thì chạy nhánh sau if. | gọi note('waiting_cobao_executor') | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      const api=W.KVPV_V864,cfg=api?.config;if(!cfg){note('waiting_cobao_executor');return;}
// [VI dòng gốc 97] Kiểm tra !S.savedCo: đúng thì chạy nhánh sau if. | gán S.savedCo bằng {coBaoTaskId:cfg.coBaoTaskId,requiredCoBao:cfg.requiredCoBao}
      if(!S.savedCo)S.savedCo={coBaoTaskId:cfg.coBaoTaskId,requiredCoBao:cfg.requiredCoBao};
// [VI dòng gốc 98] gán cfg.coBaoTaskId bằng q.id | gán cfg.requiredCoBao bằng route.target
      cfg.coBaoTaskId=q.id;cfg.requiredCoBao=route.target;
// [VI dòng gốc 99] Khai báo biến không gán lại bằng const: p = gọi api.plan() (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
      const p=api.plan?.();
// [VI dòng gốc 100] Kiểm tra acquireFragment(p): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      if(acquireFragment(p))return;
// [VI dòng gốc 101] gọi note(p?.fragments?.count>=route.target?'waiting_cobao_quest_ack': p?.step==='missing'?'missing_cobao_fragments':p?.step?'coba…)
      note(p?.fragments?.count>=route.target?'waiting_cobao_quest_ack':
// [VI dòng gốc 102] Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
        p?.step==='missing'?'missing_cobao_fragments':p?.step?'cobao_'+p.step:'cobao_executor_ready');return;
// [VI dòng gốc 103] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 104] gọi restoreCo() | Khai báo biến không gán lại bằng const: t = gọi tower(); state = gọi t?.status(false) để trả trạng thái để kiểm tra (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); finished = gọi Number(W._Ba?._tQ?._$Y?.ins?.finishLevel) để chuyển sang số
    restoreCo();const t=tower(),state=t?.status?.(false),finished=Number(W._Ba?._tQ?._$Y?.ins?.finishLevel);
// [VI dòng gốc 105] Kiểm tra !Number.isSafeInteger(finished)||finished<0: đúng thì chạy nhánh sau if. | gọi note('waiting_tower_server_progress') | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(!Number.isSafeInteger(finished)||finished<0){note('waiting_tower_server_progress');return;}
// [VI dòng gốc 106] Kiểm tra finished>=route.target: đúng thì chạy nhánh sau if. | Kiểm tra !stopOwnedTower(): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể. | gọi note('waiting_tower_quest_ack')
    if(finished>=route.target){if(!stopOwnedTower())return;note('waiting_tower_quest_ack');return;}
// [VI dòng gốc 107] Kiểm tra state?.active: đúng thì chạy nhánh sau if.
    if(state?.active){
// [VI dòng gốc 108] Kiểm tra S.towerOwned&&state.targetFloor!==route.target: đúng thì chạy nhánh sau if. | gọi t.setTargetFloor(route.target)
      if(S.towerOwned&&state.targetFloor!==route.target)t.setTargetFloor(route.target);
// [VI dòng gốc 109] gọi note(S.towerOwned?'tower_goal_running':'manual_tower_already_running') | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      note(S.towerOwned?'tower_goal_running':'manual_tower_already_running');return;
// [VI dòng gốc 110] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 111] Kiểm tra S.startedKey===route.key: đúng thì chạy nhánh sau if. | gọi note('tower_goal_already_started_no_replay') | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(S.startedKey===route.key){note('tower_goal_already_started_no_replay');return;}
// [VI dòng gốc 112] Kiểm tra !idle(): đúng thì chạy nhánh sau if. | gọi note('waiting_idle_for_tower_goal') | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(!idle()){note('waiting_idle_for_tower_goal');return;}
// [VI dòng gốc 113] Kiểm tra !W.KVPV_LINHLUNG_TH?.start: đúng thì chạy nhánh sau if. | gọi note('waiting_tower_executor') | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(!W.KVPV_LINHLUNG_TH?.start){note('waiting_tower_executor');return;}
// [VI dòng gốc 114] gán S.startedKey bằng route.key | gán S.towerOwned bằng true | gọi note('starting_tower_goal')
    S.startedKey=route.key;S.towerOwned=true;note('starting_tower_goal');
// [VI dòng gốc 115] gọi W.KVPV_LINHLUNG_TH.start({targetFloor:route.target,exclusiveDaily:true}) để khởi động bộ điều khiển
    W.KVPV_LINHLUNG_TH.start({targetFloor:route.target,exclusiveDaily:true});
// [VI dòng gốc 116] Nhận lỗi bằng e và chạy phần xử lý lỗi. | gán S.lastError bằng String(e) | gọi note('error') | gọi W.KVPV_V1?.diagnostics?.record(e) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  }catch(e){S.lastError=String(e);note('error');W.KVPV_V1?.diagnostics?.record?.(e);}}
// [VI dòng gốc 117] Định nghĩa hàm stop; tham số: reason='manual'. Mục đích: dừng bộ điều khiển và dọn tài nguyên | gán S.enabled bằng false
  function stop(reason='manual'){S.enabled=false;
// [VI dòng gốc 118] Kiểm tra S.timer!==null: đúng thì chạy nhánh sau if. | gọi W.KVPV_V1?.timers?.clearInterval??W.clearInterval(S.timer) | gán S.timer bằng null
    if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;
// [VI dòng gốc 119] Kiểm tra reason!=='reload': đúng thì chạy nhánh sau if. | gọi restoreCo() | gọi stopOwnedTower()
    if(reason!=='reload'){restoreCo();stopOwnedTower();}}
// [VI dòng gốc 120] Định nghĩa hàm start; tham số: không có. Mục đích: khởi động bộ điều khiển | Kiểm tra S.timer!==null: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể. | gán S.enabled bằng true
  function start(){if(S.timer!==null)return;S.enabled=true;
// [VI dòng gốc 121] gán S.timer bằng (W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,1000) | gọi tick() để xử lý một nhịp kiểm tra
    S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,1000);tick();}
// [VI dòng gốc 122] gán W.KVPV_QUEST_GOALS bằng Object.freeze({start,stop,sync:tick,recognize, status:()=>({enabled:S.enabled,actor,route:S.route,dependency:S.dependency,reason:S.reason,lastError:S.lastError,history:S.history.ma…
  W.KVPV_QUEST_GOALS=Object.freeze({start,stop,sync:tick,recognize,
// [VI dòng gốc 123] Thuộc tính status: tạo hàm với tham số (không có); mỗi lần gọi trả về tạo đối tượng gồm enabled, actor, route, dependency, reason, lastError, history, allowKNB | Thuộc tính enabled: đọc S.enabled | Thuộc tính actor: dùng biến cùng tên | Thuộc tính route: đọc S.route
    status:()=>({enabled:S.enabled,actor,route:S.route,dependency:S.dependency,reason:S.reason,lastError:S.lastError,history:S.history.map(x=>({...x})),allowKNB:false}),
// [VI dòng gốc 124] Thuộc tính _handoff: tạo hàm với tham số (không có); mỗi lần gọi trả về tạo đối tượng gồm actor, towerOwned, startedKey, savedCo, stageWork | Thuộc tính actor: dùng biến cùng tên | Thuộc tính towerOwned: đọc S.towerOwned | Thuộc tính startedKey: đọc S.startedKey
    _handoff:()=>({actor,towerOwned:S.towerOwned,startedKey:S.startedKey,savedCo:S.savedCo,stageWork:S.stageWork})});
// [VI dòng gốc 125] gọi start() để khởi động bộ điều khiển
  start();
// [VI dòng gốc 126] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: })();
})();
// [VI dòng gốc 127] Dòng trống để tách các phần, không có lệnh thực thi.
