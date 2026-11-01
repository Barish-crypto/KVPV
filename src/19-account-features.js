// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: Chức năng cũ từng khóa acc MAIN: nay lấy actor của game-frame hiện tại.
/* Chức năng cũ từng khóa acc MAIN: nay lấy actor của game-frame hiện tại.
 * Giữ worker đang chạy/chờ phản hồi hoặc bị khóa do yêu cầu chưa xác nhận khi cập nhật,
 * tránh mất trạng thái và phát lại yêu cầu. Chỉ cài lại worker chưa hoạt động trên acc clone. */
// [VI dòng gốc 4] chạy ngay hàm bao để tạo phạm vi và khởi tạo phần chức năng bên trong
(() => {
// [VI dòng gốc 5] Khai báo biến không gán lại bằng const: W = window; actor = gọi String(W.__KVPV_OWN_ACTOR_ID||'') để chuyển sang chuỗi; results = tạo mảng gồm 0 vị trí: []
  const W=window,actor=String(W.__KVPV_OWN_ACTOR_ID||''),results=[];
// [VI dòng gốc 6] Kiểm tra !actor||actor!==String(W._Ba?._rJ?._O$?.ins?.actorId??'')||W.__KVPV_UNIVERSAL_HALTED: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  if(!actor||actor!==String(W._Ba?._rJ?._O$?.ins?.actorId??'')||W.__KVPV_UNIVERSAL_HALTED)return;
// [VI dòng gốc 7] Chú thích gốc của tác giả; không được thực thi. Nội dung: Dọn phân vai hai acc cũ; không tự đặt clone thành leader hay gửi lời mời sang acc cố định.
  // Dọn phân vai hai acc cũ; không tự đặt clone thành leader hay gửi lời mời sang acc cố định.
// [VI dòng gốc 8] Duyệt từng giá trị trong ['marryBattle','macLan'] bằng const key. | Khai báo biến không gán lại bằng const: key (chưa gán giá trị) | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | Khai báo biến không gán lại bằng const: m = đọc W.KVPV?.[key] nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  for(const key of ['marryBattle','macLan']){try{const m=W.KVPV?.[key];if(m?.config?.cloneId){m.stop?.();m.config.enabled=false;m.config.cloneId='';m.config.mainId=actor;}}catch(e){W.KVPV_V1?.diagnostics?.record?.(e);}}
// [VI dòng gốc 9] Kiểm tra W.KVPV_DAILY?.config: đúng thì chạy nhánh sau if. | gán W.KVPV_DAILY.config.tinhThanCloneId bằng ''
  // Preserve only a valid, distinct configured clone actor ID; reject stale placeholders.
  const dailyConfig=W.KVPV_DAILY?.config;
  if(dailyConfig){
    const clone=String(dailyConfig.tinhThanCloneId??'');
    if(clone && (!/^[1-9]\d{4,24}$/.test(clone)||clone===actor))
      dailyConfig.tinhThanCloneId='';
  }
// [VI dòng gốc 10] Định nghĩa hàm install; tham số: name, fn | Khai báo biến không gán lại bằng const: old = đọc W[name]
  function install(name,fn){const old=W[name];
// [VI dòng gốc 11] Kiểm tra old: đúng thì chạy nhánh sau if. | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | Khai báo biến không gán lại bằng const: s = gọi old.status(false) để trả trạng thái để kiểm tra (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Kiểm tra s?.running||s?.pending||s?.blocked: đúng thì chạy nhánh sau if.
    if(old){try{const s=old.status?.(false);if(s?.running||s?.pending||s?.blocked){results.push({name,state:'preserved'});return;}}
// [VI dòng gốc 12] Nhận lỗi bằng e và chạy phần xử lý lỗi. | gọi results.push({name,state:'preserved_unknown',error:String(e)}) để thêm phần tử vào cuối mảng | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      catch(e){results.push({name,state:'preserved_unknown',error:String(e)});return;}
// [VI dòng gốc 13] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | gọi old.stopMonitor() (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gọi old.stop() để dừng bộ điều khiển và dọn tài nguyên (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | xóa thuộc tính W[name]
      try{old.stopMonitor?.();old.stop?.();delete W[name];}catch(e){results.push({name,state:'cleanup_failed',error:String(e)});return;}}
// [VI dòng gốc 14] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | gọi fn() | gọi results.push({name,state:W[name]?'ready':'dependencies_missing'}) để thêm phần tử vào cuối mảng | Nhận lỗi bằng e và chạy phần xử lý lỗi.
    try{fn();results.push({name,state:W[name]?'ready':'dependencies_missing'});}catch(e){results.push({name,state:'error',error:String(e)});W.KVPV_V1?.diagnostics?.record?.(e);}
// [VI dòng gốc 15] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 16] gọi install("KVPV_FAST927", ()=>{ (() => { 'use strict'; const W=window, VERSION='9.2.7'; try{W.KVPV_FAST927?.stopMonitor?.();}catch…)
  install("KVPV_FAST927",()=>{
// [VI dòng gốc 17] chạy ngay hàm bao để tạo phạm vi và khởi tạo phần chức năng bên trong
(() => {
// [VI dòng gốc 18] "use strict"
 'use strict';
// [VI dòng gốc 19] Khai báo biến không gán lại bằng const: W = window; VERSION = "9.2.7"
 const W=window, VERSION='9.2.7';
// [VI dòng gốc 20] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | gọi W.KVPV_FAST927?.stopMonitor() (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Nhận lỗi bằng _ và chạy phần xử lý lỗi. | gọi window.KVPV_V1?.diagnostics?.record(_) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
 try{W.KVPV_FAST927?.stopMonitor?.();}catch(_){window.KVPV_V1?.diagnostics?.record(_);}
// [VI dòng gốc 21] Khai báo biến không gán lại bằng const: actor = tạo hàm với tham số (không có); mỗi lần gọi trả về gọi String(window._Ba?._rJ?._O$?.ins?.actorId??'') để chuyển sang chuỗi
 const actor=()=>String(window._Ba?._rJ?._O$?.ins?.actorId??'');
// [VI dòng gốc 22] Khai báo biến không gán lại bằng const: main = gọi String(window.__KVPV_OWN_ACTOR_ID||'') để chuyển sang chuỗi
 const main=String(window.__KVPV_OWN_ACTOR_ID||'');
// [VI dòng gốc 23] Khai báo biến không gán lại bằng const: copy = tạo hàm với tham số (không có); mỗi lần gọi trả về nếu typeof _Ba!=='undefined' thì lấy _Ba?._Yo?.marryCopy?._gOt?.ins, ngược lại lấy null
 const copy=()=>typeof _Ba!=='undefined'?_Ba?._Yo?.marryCopy?._gOt?.ins:null;
// [VI dòng gốc 24] Khai báo biến không gán lại bằng const: couple = tạo hàm với tham số (không có); mỗi lần gọi trả về nếu typeof _Ba!=='undefined' thì lấy _Ba?._Yo?._tdt?.instance, ngược lại lấy null
 const couple=()=>typeof _Ba!=='undefined'?_Ba?._Yo?._tdt?.instance:null;
// [VI dòng gốc 25] Khai báo biến không gán lại bằng const: star = tạo hàm với tham số (không có); mỗi lần gọi trả về nếu typeof _Ba!=='undefined' thì lấy _Ba?._MT?.the_secret_of_the_stars?._Gvt?.instance, ngược lại lấy null
 const star=()=>typeof _Ba!=='undefined'?_Ba?._MT?.the_secret_of_the_stars?._Gvt?.instance:null;
// [VI dòng gốc 26] Khai báo biến không gán lại bằng const: pane = tạo hàm với tham số (không có); mỗi lần gọi trả về nếu typeof _ft!=='undefined' thì lấy _ft?._Y4n?.ins, ngược lại lấy null
 const pane=()=>typeof _ft!=='undefined'?_ft?._Y4n?.ins:null;
// [VI dòng gốc 27] Khai báo biến không gán lại bằng const: common = tạo hàm với tham số (không có); mỗi lần gọi trả về typeof _Ba!=='undefined' và chỉ đánh giá vế phải khi vế trái truthy: _Ba?._$a?.SceneUtil?.isCommonScene===true
 const common=()=>typeof _Ba!=='undefined'&&_Ba?._$a?.SceneUtil?.isCommonScene===true;
// [VI dòng gốc 28] Khai báo biến không gán lại bằng const: scene = tạo hàm với tham số (không có); mỗi lần gọi trả về nếu typeof _Ba!=='undefined' thì lấy Number(_Ba?._$a?.SceneUtil?.curScene), ngược lại lấy null
 const scene=()=>typeof _Ba!=='undefined'?Number(_Ba?._$a?.SceneUtil?.curScene):null;
// [VI dòng gốc 29] Khai báo biến không gán lại bằng const: inQuest = tạo hàm với tham số (không có); mỗi lần gọi trả về typeof _Ba!=='undefined' và chỉ đánh giá vế phải khi vế trái truthy: !!_Ba?._$a?._yo?.ins?.isInMission
 const inQuest=()=>typeof _Ba!=='undefined'&&!!_Ba?._$a?._yo?.ins?.isInMission;
// [VI dòng gốc 30] Khai báo biến không gán lại bằng const: fixedTeam = tạo hàm với tham số (không có); mỗi lần gọi trả về typeof _Ba!=='undefined' và chỉ đánh giá vế phải khi vế trái truthy: !!_Ba?._cm?._q3t?.ins?.getHasTeams?.()
 const fixedTeam=()=>typeof _Ba!=='undefined'&&!!_Ba?._cm?._q3t?.ins?.getHasTeams?.();
// [VI dòng gốc 31] Khai báo biến có thể gán lại bằng let: timer = null
 let timer=null;
// [VI dòng gốc 32] Khai báo biến có thể gán lại bằng let: note = "initialized"
 let note='initialized';
// [VI dòng gốc 33] Chú thích gốc của tác giả; không được thực thi. Nội dung: Trả trạng thái hiện tại để kiểm tra; ý nghĩa từng bộ đếm thuộc phạm vi module này.
 // Trả trạng thái hiện tại để kiểm tra; ý nghĩa từng bộ đếm thuộc phạm vi module này.
// [VI dòng gốc 34] Định nghĩa hàm status; tham số: print=true. Mục đích: trả trạng thái để kiểm tra
 function status(print=true){
// [VI dòng gốc 35] Khai báo biến không gán lại bằng const: D = đọc W.KVPV_DAILY; q = D?.quickState?.() hoặc dùng vế phải khi vế trái falsy: {}; c = D?.config hoặc dùng vế phải khi vế trái falsy: {}
   const D=W.KVPV_DAILY, q=D?.quickState?.()||{}, c=D?.config||{};
// [VI dòng gốc 36] Khai báo biến không gán lại bằng const: M = gọi copy(); B = gọi star(); C = gọi couple()
   const M=copy(), B=star(), C=couple();
// [VI dòng gốc 37] Khai báo biến không gán lại bằng const: copyReady = Array.isArray(M?.copyTime) và chỉ đánh giá vế phải khi vế trái truthy: M.copyTime.length>0
   const copyReady=Array.isArray(M?.copyTime)&&M.copyTime.length>0;
// [VI dòng gốc 38] Khai báo biến không gán lại bằng const: total = gọi Number(M?.maxCopyNum) để chuyển sang số; used = gọi Number(M?.copyFightNum) để chuyển sang số
   const total=Number(M?.maxCopyNum), used=Number(M?.copyFightNum);
// [VI dòng gốc 39] Khai báo biến không gán lại bằng const: remaining = nếu copyReady&&Number.isFinite(total)&&Number.isFinite(used) thì lấy Math.max(0,total-used), ngược lại lấy null
   const remaining=copyReady&&Number.isFinite(total)&&Number.isFinite(used)?Math.max(0,total-used):null;
// [VI dòng gốc 40] Khai báo biến không gán lại bằng const: married = tính biểu thức C?.isMarry?.()===true
   const married=C?.isMarry?.()===true;
// [VI dòng gốc 41] Khai báo biến không gán lại bằng const: merged = M?.isCombin===true hoặc dùng vế phải khi vế trái falsy: M?.isCombin===1
   const merged=M?.isCombin===true||M?.isCombin===1;
// [VI dòng gốc 42] Khai báo biến không gán lại bằng const: busy = q.job và chỉ đánh giá vế phải khi vế trái truthy: q.job!=='rảnh'
   const busy=q.job&&q.job!=='rảnh';
// [VI dòng gốc 43] Khai báo biến không gán lại bằng const: blockers = tạo mảng gồm 0 vị trí: []
   const blockers=[];
// [VI dòng gốc 44] Kiểm tra actor()!==main: đúng thì chạy nhánh sau if. | gọi blockers.push('Đang ở acc khác MAIN') để thêm phần tử vào cuối mảng
   if(actor()!==main)blockers.push('Đang ở acc khác MAIN');
// [VI dòng gốc 45] Kiểm tra !q.running: đúng thì chạy nhánh sau if. | gọi blockers.push('Auto Daily chưa chạy') để thêm phần tử vào cuối mảng
   if(!q.running)blockers.push('Auto Daily chưa chạy');
// [VI dòng gốc 46] Kiểm tra busy: đúng thì chạy nhánh sau if. | gọi blockers.push('Auto đang xử lý: '+q.job+' / '+q.step) để thêm phần tử vào cuối mảng
   if(busy)blockers.push('Auto đang xử lý: '+q.job+' / '+q.step);
// [VI dòng gốc 47] Kiểm tra !common(): đúng thì chạy nhánh sau if. | gọi blockers.push('Chưa ở bản đồ thường (scene '+scene()+')') để thêm phần tử vào cuối mảng
   if(!common())blockers.push('Chưa ở bản đồ thường (scene '+scene()+')');
// [VI dòng gốc 48] Kiểm tra fixedTeam(): đúng thì chạy nhánh sau if. | gọi blockers.push('Đang ở tổ đội loại khác') để thêm phần tử vào cuối mảng
   if(fixedTeam())blockers.push('Đang ở tổ đội loại khác');
// [VI dòng gốc 49] Kiểm tra common()&&inQuest(): đúng thì chạy nhánh sau if. | gọi blockers.push('Game đang auto nhiệm vụ; ưu tiên Tiên Duyên/Tinh Thần được phép xét') để thêm phần tử vào cuối mảng
   if(common()&&inQuest())blockers.push('Game đang auto nhiệm vụ; ưu tiên Tiên Duyên/Tinh Thần được phép xét');
// [VI dòng gốc 50] Khai báo biến có thể gán lại bằng let: whyTD = "Sẵn sàng, chờ lượt điều phối"
   let whyTD='Sẵn sàng, chờ lượt điều phối';
// [VI dòng gốc 51] Kiểm tra !c.enableTienDuyen: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gán whyTD bằng 'Đã tắt'
   if(!c.enableTienDuyen)whyTD='Đã tắt';
// [VI dòng gốc 52] Kiểm tra !M: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gán whyTD bằng 'Model Tiên Duyên chưa tải'
   else if(!M)whyTD='Model Tiên Duyên chưa tải';
// [VI dòng gốc 53] Kiểm tra !copyReady: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gán whyTD bằng 'Dữ liệu lượt chưa tải; chỉ yêu cầu refresh có giới hạn'
   else if(!copyReady)whyTD='Dữ liệu lượt chưa tải; chỉ yêu cầu refresh có giới hạn';
// [VI dòng gốc 54] Kiểm tra !married: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gán whyTD bằng 'Chưa kết duyên — không dùng Nguyên Bảo'
   else if(!married)whyTD='Chưa kết duyên — không dùng Nguyên Bảo';
// [VI dòng gốc 55] Kiểm tra !(remaining>0): đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gán whyTD bằng 'Hết lượt'
   else if(!(remaining>0))whyTD='Hết lượt';
// [VI dòng gốc 56] Kiểm tra merged: đúng thì chạy nhánh sau if. | gán whyTD bằng 'Gộp lượt đang bật — không tự đánh'
   else if(merged)whyTD='Gộp lượt đang bật — không tự đánh';
// [VI dòng gốc 57] Khai báo biến có thể gán lại bằng let: whyStar = "Sẵn sàng, chờ lượt điều phối"
   let whyStar='Sẵn sàng, chờ lượt điều phối';
// [VI dòng gốc 58] Kiểm tra !c.enableTinhThan: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gán whyStar bằng 'Đã tắt'
   if(!c.enableTinhThan)whyStar='Đã tắt';
// [VI dòng gốc 59] Kiểm tra !B: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gán whyStar bằng 'Model Tinh Thần chưa tải'
   else if(!B)whyStar='Model Tinh Thần chưa tải';
// [VI dòng gốc 60] Kiểm tra !Number.isFinite(Number(B.strengthvalue)): đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gán whyStar bằng 'Chưa tải Nguyên Lực'
   else if(!Number.isFinite(Number(B.strengthvalue)))whyStar='Chưa tải Nguyên Lực';
// [VI dòng gốc 61] Kiểm tra Number(B.strengthvalue)<=0: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gán whyStar bằng 'Hết Nguyên Lực'
   else if(Number(B.strengthvalue)<=0)whyStar='Hết Nguyên Lực';
// [VI dòng gốc 62] Kiểm tra B.auto===1||B.auto===true: đúng thì chạy nhánh sau if. | gán whyStar bằng 'Bật tự dùng Nguyên Lực Đơn; tool không tiêu vật phẩm'
   else if(B.auto===1||B.auto===true)whyStar='Bật tự dùng Nguyên Lực Đơn; tool không tiêu vật phẩm';
// [VI dòng gốc 63] Khai báo biến không gán lại bằng const: panel = gọi pane() | Khai báo biến không gán lại bằng const: u = nếu panel?.isOpened?.(605) thì lấy panel.getPanelById?.(605), ngược lại lấy null
   const panel=pane();const u=panel?.isOpened?.(605)?panel.getPanelById?.(605):null;
// [VI dòng gốc 64] Khai báo biến không gán lại bằng const: out = tạo đối tượng gồm version, actor, running, job, step, scene, common, inQuest, fixedTeam, towerMode, tienDuyen, tinhThan, blockers, note
   const out={version:VERSION,actor:actor(),running:!!q.running,job:q.job||'rảnh',step:q.step||'-',
// [VI dòng gốc 65] Thuộc tính scene: gọi scene() | Thuộc tính common: gọi common() | Thuộc tính inQuest: gọi inQuest() | Thuộc tính fixedTeam: gọi fixedTeam()
     scene:scene(),common:common(),inQuest:inQuest(),fixedTeam:fixedTeam(),
// [VI dòng gốc 66] Thuộc tính towerMode: W.KVPV_TOWER_MANUAL925?.status?.()?.mode hoặc dùng vế phải khi vế trái là null/undefined: 'unknown'
     towerMode:W.KVPV_TOWER_MANUAL925?.status?.()?.mode??'unknown',
// [VI dòng gốc 67] Thuộc tính tienDuyen: tạo đối tượng gồm enabled, reason, modelReady, copyReady, remaining, married, merged, api, coreBound, last, active | Thuộc tính enabled: đảo giá trị đúng/sai của !c.enableTienDuyen | Thuộc tính reason: whyTD | Thuộc tính modelReady: đảo giá trị đúng/sai của !M
     tienDuyen:{enabled:!!c.enableTienDuyen,reason:whyTD,modelReady:!!M,
// [VI dòng gốc 68] Thuộc tính copyReady: dùng biến cùng tên | Thuộc tính remaining: dùng biến cùng tên | Thuộc tính married: dùng biến cùng tên | Thuộc tính merged: dùng biến cùng tên
       copyReady,remaining,married,merged,api:!!W.KVPV_TD925?.status,
// [VI dòng gốc 69] Thuộc tính coreBound: tính biểu thức W.KVPV_TD925?.installed===true | Thuộc tính last: nếu W.KVPV_TD925?.config thì lấy 'Native TD925 available', ngược lại lấy 'TD925 API may be missing'
       coreBound:W.KVPV_TD925?.installed===true,last:W.KVPV_TD925?.config? 'Native TD925 available':'TD925 API may be missing',
// [VI dòng gốc 70] Thuộc tính active: tính biểu thức q.job==='tienduyen'
       active:q.job==='tienduyen'},
// [VI dòng gốc 71] Thuộc tính tinhThan: tạo đối tượng gồm enabled, reason, power, teamMembers, wantedTier, tierUI, active, team | Thuộc tính enabled: đảo giá trị đúng/sai của !c.enableTinhThan | Thuộc tính reason: whyStar | Thuộc tính power: B?.strengthvalue hoặc dùng vế phải khi vế trái là null/undefined: null
     tinhThan:{enabled:!!c.enableTinhThan,reason:whyStar,power:B?.strengthvalue??null,
// [VI dòng gốc 72] Thuộc tính teamMembers: B?.teamLength hoặc dùng vế phải khi vế trái là null/undefined: null | Thuộc tính wantedTier: đọc c.tinhThanTang | Thuộc tính tierUI: u?._bvt hoặc dùng vế phải khi vế trái là null/undefined: null
       teamMembers:B?.teamLength??null,wantedTier:c.tinhThanTang,tierUI:u?._bvt??null,
// [VI dòng gốc 73] Thuộc tính active: tính biểu thức q.job==='tinhthan' | Thuộc tính team: W.KVPV_V924_STAR?.team?.() hoặc dùng vế phải khi vế trái là null/undefined: null
       active:q.job==='tinhthan',team:W.KVPV_V924_STAR?.team?.()??null},
// [VI dòng gốc 74] Thuộc tính blockers: dùng biến cùng tên | Thuộc tính note: dùng biến cùng tên
     blockers, note};
// [VI dòng gốc 75] Kiểm tra print: đúng thì chạy nhánh sau if. | gọi console.log('[V927 AUTO DIAGNOSTICS]', out) | gọi console.table([{ running:out.running,job:out.job,scene:out.scene,Quest:out.inQuest, TienDuyen:whyTD,TinhThan:whyStar,Tower:out.towerMo…)
   if(print){console.log('[V927 AUTO DIAGNOSTICS]',out);console.table([{
// [VI dòng gốc 76] Thuộc tính running: đọc out.running | Thuộc tính job: đọc out.job | Thuộc tính scene: đọc out.scene | Thuộc tính Quest: đọc out.inQuest
     running:out.running,job:out.job,scene:out.scene,Quest:out.inQuest,
// [VI dòng gốc 77] Thuộc tính TienDuyen: whyTD | Thuộc tính TinhThan: whyStar | Thuộc tính Tower: đọc out.towerMode
     TienDuyen:whyTD,TinhThan:whyStar,Tower:out.towerMode,
// [VI dòng gốc 78] Thuộc tính LyDoChung: blockers.join(' | ') hoặc dùng vế phải khi vế trái falsy: 'không có'
     LyDoChung:blockers.join(' | ')||'không có'
// [VI dòng gốc 79] Kết thúc hàm hiện tại và trả về: out.
   }]);}return out;
// [VI dòng gốc 80] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
 }
// [VI dòng gốc 81] Chú thích gốc của tác giả; không được thực thi. Nội dung: Some earlier running snippets reported TD925 missing. Only give a read-only
 // Some earlier running snippets reported TD925 missing. Only give a read-only
// [VI dòng gốc 82] Chú thích gốc của tác giả; không được thực thi. Nội dung: compatibility shim when it is absent; this does NOT claim to install engine logic.
 // compatibility shim when it is absent; this does NOT claim to install engine logic.
// [VI dòng gốc 83] Kiểm tra typeof W.KVPV_TD925?.status!=='function': đúng thì chạy nhánh sau if.
 if(typeof W.KVPV_TD925?.status!=='function'){
// [VI dòng gốc 84] gán W.KVPV_TD925 bằng Object.freeze({installed:false,version:VERSION+'-diagnostic-only', status:()=>{const s=status(false);return {version:VERSION,engineAvailable:false, remaining:s.tienDuyen.remaining,…
   W.KVPV_TD925=Object.freeze({installed:false,version:VERSION+'-diagnostic-only',
// [VI dòng gốc 85] Khai báo biến không gán lại bằng const: s = gọi status(false) để trả trạng thái để kiểm tra | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm version, engineAvailable, remaining, married, reason.
     status:()=>{const s=status(false);return {version:VERSION,engineAvailable:false,
// [VI dòng gốc 86] Thuộc tính remaining: đọc s.tienDuyen.remaining | Thuộc tính married: đọc s.tienDuyen.married
       remaining:s.tienDuyen.remaining,married:s.tienDuyen.married,
// [VI dòng gốc 87] Thuộc tính reason: "Missing underlying TD925 API; use full V9.2.7 source"
       reason:'Missing underlying TD925 API; use full V9.2.7 source'};},
// [VI dòng gốc 88] Kiểm tra W.KVPV_DAILY?.config: đúng thì chạy nhánh sau if. | gán W.KVPV_DAILY.config.enableTienDuyen bằng true
     enable:()=>{if(W.KVPV_DAILY?.config)W.KVPV_DAILY.config.enableTienDuyen=true;},
// [VI dòng gốc 89] Kiểm tra W.KVPV_DAILY?.config: đúng thì chạy nhánh sau if. | gán W.KVPV_DAILY.config.enableTienDuyen bằng false
     disable:()=>{if(W.KVPV_DAILY?.config)W.KVPV_DAILY.config.enableTienDuyen=false;}});
// [VI dòng gốc 90] gọi console.warn('[V927] TD925 export absent; installed a diagnostic-only shim, not a claim/upgrade engine.')
   console.warn('[V927] TD925 export absent; installed a diagnostic-only shim, not a claim/upgrade engine.');
// [VI dòng gốc 91] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
 }
// [VI dòng gốc 92] Chú thích gốc của tác giả; không được thực thi. Nội dung: Bật bộ điều khiển và lịch kiểm tra của module; trả trạng thái sau khi khởi động.
 // Bật bộ điều khiển và lịch kiểm tra của module; trả trạng thái sau khi khởi động.
// [VI dòng gốc 93] Định nghĩa hàm start; tham số: không có. Mục đích: khởi động bộ điều khiển
 function start(){
// [VI dòng gốc 94] Khai báo biến không gán lại bằng const: D = đọc W.KVPV_DAILY
   const D=W.KVPV_DAILY;
// [VI dòng gốc 95] Kiểm tra actor()!==main: đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('ONLY run MAIN FULL on account '+main)
   if(actor()!==main)throw Error('ONLY run MAIN FULL on account '+main);
// [VI dòng gốc 96] Kiểm tra !D?.config: đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('Auto Daily core missing; reload FULL into game-frame')
   if(!D?.config)throw Error('Auto Daily core missing; reload FULL into game-frame');
// [VI dòng gốc 97] gán D.config.enableTienDuyen bằng true
   D.config.enableTienDuyen=true;
// [VI dòng gốc 98] gán D.config.enableTinhThan bằng true
   D.config.enableTinhThan=true;
// [VI dòng gốc 99] gán D.config.autoTeam bằng true
   D.config.autoTeam=true;
// [VI dòng gốc 100] gán D.config.autoApproveTeam bằng true
   D.config.autoApproveTeam=true;
// [VI dòng gốc 101] gán D.config.tienDuyenMs bằng 600
   D.config.tienDuyenMs=600;
// [VI dòng gốc 102] gán D.config.tinhThanMs bằng 600
   D.config.tinhThanMs=600;
// [VI dòng gốc 103] gán D.config.tinhThanTang bằng 5
   // Use the highest server-confirmed unlocked tier, never a fixed floor 6.
   const starModel=typeof _Ba!=='undefined'?_Ba?._MT?.the_secret_of_the_stars?._Gvt?.instance:null;
   const tierCandidates=[starModel?.maxPassTier,starModel?.maxOpenTier,starModel?.maxTier,starModel?.highestUnlockedTier]
     .map(Number).filter(v=>Number.isSafeInteger(v)&&v>0&&v<=10000);
   if(tierCandidates.length)D.config.tinhThanTang=Math.max(...tierCandidates);
   // If the native model has not published an unlocked tier yet, preserve user settings.
   D.config.autoTeam=true;
   D.config.autoApproveTeam=true;
// [VI dòng gốc 104] Chú thích gốc của tác giả; không được thực thi. Nội dung: Respect existing dedicated Tower manual controls; do not call tower.start.
   // Respect existing dedicated Tower manual controls; do not call tower.start.
// [VI dòng gốc 105] Kiểm tra W.KVPV_V873?.config: đúng thì chạy nhánh sau if. | gán W.KVPV_V873.config.autoChallenge bằng false | gán W.KVPV_V873.config.autoOpen bằng false
   if(W.KVPV_V873?.config){W.KVPV_V873.config.autoChallenge=false;W.KVPV_V873.config.autoOpen=false;}
// [VI dòng gốc 106] gọi D.start() để khởi động bộ điều khiển (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
   D.start?.();
// [VI dòng gốc 107] gán note bằng 'Running; server conditions continue to apply'
   note='Running; server conditions continue to apply';
// [VI dòng gốc 108] Kết thúc hàm hiện tại và trả về: gọi status(false) để trả trạng thái để kiểm tra.
   return status(false);
// [VI dòng gốc 109] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
 }
// [VI dòng gốc 110] Định nghĩa hàm stopMonitor; tham số: không có | gọi clearInterval(timer) để hủy tác vụ lặp | gán timer bằng null | Kết thúc hàm hiện tại và trả về: true.
 function stopMonitor(){clearInterval(timer);timer=null;return true;}
// [VI dòng gốc 111] Định nghĩa hàm monitor; tham số: không có
 function monitor(){
// [VI dòng gốc 112] Kiểm tra actor()!==main: đúng thì chạy nhánh sau if. | gọi stopMonitor() | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
   if(actor()!==main){stopMonitor();return;}
// [VI dòng gốc 113] Chú thích gốc của tác giả; không được thực thi. Nội dung: No RPC from this timer. Never restart a stopped Daily automatically.
   // No RPC from this timer. Never restart a stopped Daily automatically.
// [VI dòng gốc 114] Khai báo biến không gán lại bằng const: D = đọc W.KVPV_DAILY
   const D=W.KVPV_DAILY;
// [VI dòng gốc 115] Kiểm tra D?.config: đúng thì chạy nhánh sau if.
   if(D?.config){
// [VI dòng gốc 116] Kiểm tra W.KVPV_V873?.config: đúng thì chạy nhánh sau if. | gán W.KVPV_V873.config.autoChallenge bằng false | gán W.KVPV_V873.config.autoOpen bằng false
     if(W.KVPV_V873?.config){W.KVPV_V873.config.autoChallenge=false;W.KVPV_V873.config.autoOpen=false;}
// [VI dòng gốc 117] Chú thích gốc của tác giả; không được thực thi. Nội dung: No config overwrite for disabled user modules; only provide readout.
     // No config overwrite for disabled user modules; only provide readout.
// [VI dòng gốc 118] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
   }
// [VI dòng gốc 119] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
 }
// [VI dòng gốc 120] gán W.KVPV_FAST927 bằng Object.freeze({status,start,diagnostics:status,stopMonitor, version:VERSION,disableDungeons(){const c=W.KVPV_DAILY?.config; if(c){c.enableTienDuyen=false;c.enableTinhThan=false;}re…
 W.KVPV_FAST927=Object.freeze({status,start,diagnostics:status,stopMonitor,
// [VI dòng gốc 121] Khai báo biến không gán lại bằng const: c = đọc W.KVPV_DAILY?.config nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
   version:VERSION,disableDungeons(){const c=W.KVPV_DAILY?.config;
// [VI dòng gốc 122] Kiểm tra c: đúng thì chạy nhánh sau if. | gán c.enableTienDuyen bằng false | gán c.enableTinhThan bằng false | Kết thúc hàm hiện tại và trả về: gọi status(false) để trả trạng thái để kiểm tra.
     if(c){c.enableTienDuyen=false;c.enableTinhThan=false;}return status(false);},
// [VI dòng gốc 123] Thuộc tính enableDungeons: start (khởi động bộ điều khiển)
   enableDungeons:start});
// [VI dòng gốc 124] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | gọi start() để khởi động bộ điều khiển | Nhận lỗi bằng e và chạy phần xử lý lỗi. | gọi console.warn('[V927] Main startup:', String(e))
 try{start();}catch(e){console.warn('[V927] Main startup:',String(e));note=String(e);}
// [VI dòng gốc 125] gán timer bằng setInterval(monitor,10000)
 timer=setInterval(monitor,10000);
// [VI dòng gốc 126] gọi console.info('[V927] Tinh Than + Tien Duyen priority loaded. Tower remains manual. KVPV_FAST927.status()')
 console.info('[V927] Tinh Than + Tien Duyen priority loaded. Tower remains manual. KVPV_FAST927.status()');
// [VI dòng gốc 127] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: })();
})();
// [VI dòng gốc 128] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  });
// [VI dòng gốc 129] gọi install("KVPV_ASYNC928", ()=>{ (() => { 'use strict'; const W=window, VERSION='9.2.8', MAIN=String(window.__KVPV_OWN_ACTOR_ID||'…)
  install("KVPV_ASYNC928",()=>{
// [VI dòng gốc 130] chạy ngay hàm bao để tạo phạm vi và khởi tạo phần chức năng bên trong
(() => {
// [VI dòng gốc 131] "use strict"
  'use strict';
// [VI dòng gốc 132] Khai báo biến không gán lại bằng const: W = window; VERSION = "9.2.8"; MAIN = gọi String(window.__KVPV_OWN_ACTOR_ID||'') để chuyển sang chuỗi
  const W=window, VERSION='9.2.8', MAIN=String(window.__KVPV_OWN_ACTOR_ID||'');
// [VI dòng gốc 133] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | gọi W.KVPV_ASYNC928?.stop() để dừng bộ điều khiển và dọn tài nguyên (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Nhận lỗi bằng _ và chạy phần xử lý lỗi. | gọi window.KVPV_V1?.diagnostics?.record(_) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  try { W.KVPV_ASYNC928?.stop?.(); } catch(_){window.KVPV_V1?.diagnostics?.record(_);}
// [VI dòng gốc 134] Khai báo biến không gán lại bằng const: actor = tạo hàm với tham số (không có); mỗi lần gọi trả về gọi String(typeof _Ba==='undefined'?'':(_Ba?._rJ?._O$?.ins?.actorId??'')) để chuyển sang chuỗi
  const actor=()=>String(typeof _Ba==='undefined'?'':(_Ba?._rJ?._O$?.ins?.actorId??''));
// [VI dòng gốc 135] Khai báo biến không gán lại bằng const: daily = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W.KVPV_DAILY
  const daily=()=>W.KVPV_DAILY;
// [VI dòng gốc 136] Khai báo biến không gán lại bằng const: tower = tạo hàm với tham số (không có); mỗi lần gọi trả về gọi W.KVPV_TOWER_MANUAL925?.status() để trả trạng thái để kiểm tra (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  const tower=()=>W.KVPV_TOWER_MANUAL925?.status?.();
// [VI dòng gốc 137] Khai báo biến không gán lại bằng const: stage = tạo hàm với tham số (không có); mỗi lần gọi trả về nếu typeof _Ba!=='undefined' thì lấy _Ba?._Co?._Mo?.ins, ngược lại lấy null
  const stage=()=>typeof _Ba!=='undefined'?_Ba?._Co?._Mo?.ins:null;
// [VI dòng gốc 138] Khai báo biến không gán lại bằng const: scene = tạo hàm với tham số (không có); mỗi lần gọi trả về nếu typeof _Ba!=='undefined' thì lấy Number(_Ba?._$a?.SceneUtil?.curScene??-1), ngược lại lấy -1
  const scene=()=>typeof _Ba!=='undefined'?Number(_Ba?._$a?.SceneUtil?.curScene??-1):-1;
// [VI dòng gốc 139] Khai báo biến không gán lại bằng const: mission = tạo hàm với tham số (không có); mỗi lần gọi trả về typeof _Ba!=='undefined' và chỉ đánh giá vế phải khi vế trái truthy: !!_Ba?._$a?._yo?.ins?.isInMission
  const mission=()=>typeof _Ba!=='undefined'&&!!_Ba?._$a?._yo?.ins?.isInMission;
// [VI dòng gốc 140] Khai báo biến không gán lại bằng const: clock = tạo hàm với tham số (không có); mỗi lần gọi trả về gọi Date.now()
  const clock=()=>Date.now();
// [VI dòng gốc 141] Khai báo biến không gán lại bằng const: safeError = tạo hàm với tham số e; mỗi lần gọi trả về gọi String(e?.message??e).slice(0, 250) để lấy một đoạn dữ liệu
  const safeError=e=>String(e?.message??e).slice(0,250);
// [VI dòng gốc 142] Khai báo biến không gán lại bằng const: STATE = tạo đối tượng gồm running, actor, epoch, startedAt, stoppedAt, errors, lastError, scene, stage, background, lanes, log, tasks, controller
  const STATE={running:false, actor:actor(), epoch:0, startedAt:0, stoppedAt:0,
// [VI dòng gốc 143] Thuộc tính errors: 0 | Thuộc tính lastError: "" | Thuộc tính scene: tạo đối tượng gồm lastJob, lastStep, stuckAt, warnings | Thuộc tính lastJob: ""
    errors:0, lastError:'', scene:{lastJob:'',lastStep:'',stuckAt:0, warnings:0},
// [VI dòng gốc 144] Thuộc tính stage: tạo đối tượng gồm floor, gains, paused, auto, lastGain, lockWarned | Thuộc tính floor: null | Thuộc tính gains: 0 | Thuộc tính paused: false
    stage:{floor:null,gains:0,paused:false,auto:false,lastGain:0,lockWarned:false},
// [VI dòng gốc 145] Thuộc tính background: tạo đối tượng gồm readyRewards, modules, scans | Thuộc tính readyRewards: false | Thuộc tính modules: tạo mảng gồm 0 vị trí: [] | Thuộc tính scans: 0
    background:{readyRewards:false,modules:[],scans:0},
// [VI dòng gốc 146] Thuộc tính lanes: tạo đối tượng gồm scene, stage, background | Thuộc tính scene: tạo đối tượng gồm runs, errors, lastAt, lagMaxMs | Thuộc tính runs: 0 | Thuộc tính errors: 0
    lanes:{scene:{runs:0,errors:0,lastAt:0,lagMaxMs:0},
// [VI dòng gốc 147] Thuộc tính stage: tạo đối tượng gồm runs, errors, lastAt, lagMaxMs | Thuộc tính runs: 0 | Thuộc tính errors: 0 | Thuộc tính lastAt: 0
           stage:{runs:0,errors:0,lastAt:0,lagMaxMs:0},
// [VI dòng gốc 148] Thuộc tính background: tạo đối tượng gồm runs, errors, lastAt, lagMaxMs | Thuộc tính runs: 0 | Thuộc tính errors: 0 | Thuộc tính lastAt: 0
           background:{runs:0,errors:0,lastAt:0,lagMaxMs:0}},
// [VI dòng gốc 149] Thuộc tính log: tạo mảng gồm 0 vị trí: [] | Thuộc tính tasks: tạo mảng gồm 0 vị trí: [] | Thuộc tính controller: null
    log:[], tasks:[], controller:null};
// [VI dòng gốc 150] Chú thích gốc của tác giả; không được thực thi. Nội dung: Ghi diễn biến vào lịch sử nội bộ có giới hạn để truy vết quyết định.
  // Ghi diễn biến vào lịch sử nội bộ có giới hạn để truy vết quyết định.
// [VI dòng gốc 151] Định nghĩa hàm note; tham số: type, msg, detail
  function note(type,msg,detail){
// [VI dòng gốc 152] Khai báo biến không gán lại bằng const: record = tạo đối tượng gồm at, type, msg, detail
    const record={at:new Date().toISOString(),type,msg,detail:detail??null};
// [VI dòng gốc 153] gọi STATE.log.push(record) để thêm phần tử vào cuối mảng | Kiểm tra STATE.log.length>120: đúng thì chạy nhánh sau if. | gọi STATE.log.shift()
    STATE.log.push(record);if(STATE.log.length>120)STATE.log.shift();
// [VI dòng gốc 154] Kiểm tra type==='error'||type==='warning': đúng thì chạy nhánh sau if. | gọi console.warn('[KVPV ASYNC928]', msg, detail??'')
    if(type==='error'||type==='warning')console.warn('[KVPV ASYNC928]',msg,detail??'');
// [VI dòng gốc 155] Kết thúc hàm hiện tại và trả về: record.
    return record;
// [VI dòng gốc 156] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 157] Chú thích gốc của tác giả; không được thực thi. Nội dung: Abort-aware sleep: releases the timer instantly on stop/reload. No busy wait.
  // Abort-aware sleep: releases the timer instantly on stop/reload. No busy wait.
// [VI dòng gốc 158] Định nghĩa hàm sleep; tham số: ms, signal
  function sleep(ms,signal){
// [VI dòng gốc 159] Kết thúc hàm hiện tại và trả về: tạo đối tượng bằng Promise(resolve=>{ if(signal.aborted)return resolve(false); let id=null; const done=()=>{clearTimeout(id);signal.removeEventList…).
    return new Promise(resolve=>{
// [VI dòng gốc 160] Kiểm tra signal.aborted: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: gọi resolve(false).
      if(signal.aborted)return resolve(false);
// [VI dòng gốc 161] Khai báo biến có thể gán lại bằng let: id = null
      let id=null;
// [VI dòng gốc 162] Khai báo biến không gán lại bằng const: done = tạo hàm với tham số (không có) | gọi clearTimeout(id) để hủy lịch thực hiện một lần | gọi signal.removeEventListener('abort', aborted) để gỡ bộ xử lý sự kiện | gọi resolve(!signal.aborted)
      const done=()=>{clearTimeout(id);signal.removeEventListener('abort',aborted);resolve(!signal.aborted);};
// [VI dòng gốc 163] Khai báo biến không gán lại bằng const: aborted = tạo hàm với tham số (không có); mỗi lần gọi trả về gọi done()
      const aborted=()=>done();
// [VI dòng gốc 164] gọi signal.addEventListener('abort', aborted, {once:true}) để đăng ký bộ xử lý sự kiện
      signal.addEventListener('abort',aborted,{once:true});
// [VI dòng gốc 165] gán id bằng setTimeout(done,ms)
      id=setTimeout(done,ms);
// [VI dòng gốc 166] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    });
// [VI dòng gốc 167] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 168] Định nghĩa hàm belongs; tham số: không có | Kết thúc hàm hiện tại và trả về: actor()===MAIN và chỉ đánh giá vế phải khi vế trái truthy: actor()===STATE.actor.
  function belongs(){return actor()===MAIN&&actor()===STATE.actor;}
// [VI dòng gốc 169] Định nghĩa hàm bất đồng bộ loop; tham số: name, delay, fn, signal
  async function loop(name,delay,fn,signal){
// [VI dòng gốc 170] Khai báo biến không gán lại bằng const: m = đọc STATE.lanes[name]
    const m=STATE.lanes[name];
// [VI dòng gốc 171] Khai báo biến có thể gán lại bằng let: next = gọi clock()
    let next=clock();
// [VI dòng gốc 172] Lặp khi điều kiện còn đúng: !signal.aborted
    while(!signal.aborted){
// [VI dòng gốc 173] Kiểm tra !belongs(): đúng thì chạy nhánh sau if.
      if(!belongs()){
// [VI dòng gốc 174] gọi note('warning', 'Tài khoản/game-frame đã thay đổi, dừng giám sát')
        note('warning','Tài khoản/game-frame đã thay đổi, dừng giám sát');
// [VI dòng gốc 175] gọi stop() để dừng bộ điều khiển và dọn tài nguyên | Thoát vòng lặp/switch hiện tại.
        stop();break;
// [VI dòng gốc 176] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
      }
// [VI dòng gốc 177] Khai báo biến không gán lại bằng const: began = gọi clock()
      const began=clock();
// [VI dòng gốc 178] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | chờ tác vụ bất đồng bộ: gọi fn(signal)
      try{await fn(signal);}
// [VI dòng gốc 179] Nhận lỗi bằng e và chạy phần xử lý lỗi. | tăng m.errors một đơn vị sau khi lấy giá trị | tăng STATE.errors một đơn vị sau khi lấy giá trị | gán STATE.lastError bằng safeError(e)
      catch(e){m.errors++;STATE.errors++;STATE.lastError=safeError(e);
// [VI dòng gốc 180] Nội dung nguyên văn của chuỗi mẫu; đây là dữ liệu trong chuỗi, không phải lệnh đang chạy.
        note('error',`Lỗi lane ${name}`,STATE.lastError);}
// [VI dòng gốc 181] tăng m.runs một đơn vị sau khi lấy giá trị | gán m.lastAt bằng clock()
      m.runs++;m.lastAt=clock();
// [VI dòng gốc 182] gán next bằng Math.max(began+delay,clock()+100)
      next=Math.max(began+delay,clock()+100);
// [VI dòng gốc 183] gán m.lagMaxMs bằng Math.max(m.lagMaxMs,Math.max(0,m.lastAt-began-delay))
      m.lagMaxMs=Math.max(m.lagMaxMs,Math.max(0,m.lastAt-began-delay));
// [VI dòng gốc 184] Kiểm tra !await sleep(Math.max(100,next-clock()),signal): đúng thì chạy nhánh sau if. | Thoát vòng lặp/switch hiện tại.
      if(!await sleep(Math.max(100,next-clock()),signal))break;
// [VI dòng gốc 185] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 186] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 187] Định nghĩa hàm observeScene; tham số: không có
  function observeScene(){
// [VI dòng gốc 188] Khai báo biến không gán lại bằng const: q = daily()?.quickState?.() hoặc dùng vế phải khi vế trái falsy: {}
    const q=daily()?.quickState?.()||{};
// [VI dòng gốc 189] Khai báo biến không gán lại bằng const: name = gọi String(q.job||'rảnh') để chuyển sang chuỗi; step = gọi String(q.step||'-') để chuyển sang chuỗi
    const name=String(q.job||'rảnh'),step=String(q.step||'-');
// [VI dòng gốc 190] Khai báo biến không gán lại bằng const: s = đọc STATE.scene
    const s=STATE.scene;
// [VI dòng gốc 191] Kiểm tra s.lastJob!==name||s.lastStep!==step: đúng thì chạy nhánh sau if.
    if(s.lastJob!==name||s.lastStep!==step){
// [VI dòng gốc 192] gán s.lastJob bằng name | gán s.lastStep bằng step | gán s.stuckAt bằng clock() | gán s.warnedFor bằng ''
      s.lastJob=name;s.lastStep=step;s.stuckAt=clock();s.warnedFor='';
// [VI dòng gốc 193] Nội dung nguyên văn của chuỗi mẫu; đây là dữ liệu trong chuỗi, không phải lệnh đang chạy.
      note('step',`Scene job: ${name}/${step}`);
// [VI dòng gốc 194] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 195] Nội dung nguyên văn của chuỗi mẫu; đây là dữ liệu trong chuỗi, không phải lệnh đang chạy.
    if(name!=='rảnh'&&s.stuckAt&&clock()-s.stuckAt>120000 && s.warnedFor!==`${name}/${step}`){
// [VI dòng gốc 196] Nội dung nguyên văn của chuỗi mẫu; đây là dữ liệu trong chuỗi, không phải lệnh đang chạy.
      s.warnedFor=`${name}/${step}`;s.warnings++;
// [VI dòng gốc 197] Nội dung nguyên văn của chuỗi mẫu; đây là dữ liệu trong chuỗi, không phải lệnh đang chạy.
      note('warning',`Job ${name}/${step} giữ nguyên >120s, chờ server xác nhận`,{scene:scene()});
// [VI dòng gốc 198] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 199] Chú thích gốc của tác giả; không được thực thi. Nội dung: Do not call dispatch directly or start a second scene job.
    // Do not call dispatch directly or start a second scene job.
// [VI dòng gốc 200] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 201] Định nghĩa hàm observeStage; tham số: không có
  function observeStage(){
// [VI dòng gốc 202] Khai báo biến không gán lại bằng const: m = gọi stage() | Kiểm tra !m: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    const m=stage();if(!m)return;
// [VI dòng gốc 203] Khai báo biến không gán lại bằng const: lv = gọi Number(m.curLv) để chuyển sang số; s = đọc STATE.stage
    const lv=Number(m.curLv), s=STATE.stage;
// [VI dòng gốc 204] Kiểm tra Number.isFinite(lv)&&lv>0: đúng thì chạy nhánh sau if.
    if(Number.isFinite(lv)&&lv>0){
// [VI dòng gốc 205] Kiểm tra s.floor!==null&&lv>s.floor: đúng thì chạy nhánh sau if.
      if(s.floor!==null&&lv>s.floor){
// [VI dòng gốc 206] cập nhật bằng toán tử += s.gains bằng lv-s.floor | gán s.lastGain bằng clock()
        s.gains+=lv-s.floor;s.lastGain=clock();
// [VI dòng gốc 207] Nội dung nguyên văn của chuỗi mẫu; đây là dữ liệu trong chuỗi, không phải lệnh đang chạy.
        note('progress',`Tự Vượt tăng cấp ải: ${s.floor} → ${lv}`);
// [VI dòng gốc 208] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
      }
// [VI dòng gốc 209] gán s.floor bằng lv
      s.floor=lv;
// [VI dòng gốc 210] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 211] gán s.auto bằng !!m.auto
    s.auto=!!m.auto;
// [VI dòng gốc 212] Khai báo biến không gán lại bằng const: C = đọc daily()?.config nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const C=daily()?.config;
// [VI dòng gốc 213] gán s.paused bằng !!C&&!C.enableTuVuot
    s.paused=!!C&&!C.enableTuVuot;
// [VI dòng gốc 214] Kiểm tra W.KVPV_TOWER_MANUAL925?.status?.()?.mode!=='manual': đúng thì chạy nhánh sau if.
    // The optional legacy Tower MANUAL925 controller is not bundled in the curated FULL.
    // A missing controller is not a missing safety lock: this observer never starts Tower.
    // Preserve native manual entry; do not synthesize a fake MANUAL925 controller.
// [VI dòng gốc 217] Chú thích gốc của tác giả; không được thực thi. Nội dung: Daily native Tu Vuot: unlimited retries by default; manual stop only.
    // Daily native Tu Vuot: unlimited retries by default; manual stop only.
// [VI dòng gốc 218] Chú thích gốc của tác giả; không được thực thi. Nội dung: The engine never sends raw RPC or resets server state.
    // The engine never sends raw RPC or resets server state.
// [VI dòng gốc 219] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 220] Định nghĩa hàm observeBackground; tham số: không có
  function observeBackground(){
// [VI dòng gốc 221] Khai báo biến không gán lại bằng const: up = đọc W.KVPV_UPGRADES
    const up=W.KVPV_UPGRADES;
// [VI dòng gốc 222] Khai báo biến có thể gán lại bằng let: hasReady = false
    let hasReady=false;
// [VI dòng gốc 223] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | gán hasReady bằng up?.hasReadyClaims?.()===true | Nhận lỗi bằng e và chạy phần xử lý lỗi.
    try{hasReady=up?.hasReadyClaims?.()===true;}catch(e){
// [VI dòng gốc 224] gọi note('warning', 'Không đọc được dấu đỏ đang chờ', safeError(e))
      note('warning','Không đọc được dấu đỏ đang chờ',safeError(e));
// [VI dòng gốc 225] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 226] Khai báo biến không gán lại bằng const: b = đọc STATE.background
    const b=STATE.background;
// [VI dòng gốc 227] Kiểm tra hasReady!==b.readyRewards: đúng thì chạy nhánh sau if. | gán b.readyRewards bằng hasReady
    if(hasReady!==b.readyRewards){b.readyRewards=hasReady;
// [VI dòng gốc 228] gọi note('reward', hasReady?'Có quà/dấu đỏ sẵn sàng, module hiện có sẽ nhận':'Không còn quà sẵn sàng')
      note('reward',hasReady?'Có quà/dấu đỏ sẵn sàng, module hiện có sẽ nhận':'Không còn quà sẵn sàng');}
// [VI dòng gốc 229] tăng b.scans một đơn vị sau khi lấy giá trị
    b.scans++;
// [VI dòng gốc 230] gán b.modules bằng ['KVPV_V8','KVPV_UPGRADES','KVPV_TD925','KVPV_V924_STAR','KVPV_FAST927'] .filter(key=>!!W[key])
    b.modules=['KVPV_V8','KVPV_UPGRADES','KVPV_TD925','KVPV_V924_STAR','KVPV_FAST927']
// [VI dòng gốc 231] Định nghĩa hàm hàm không đặt tên; tham số: key
      .filter(key=>!!W[key]);
// [VI dòng gốc 232] Chú thích gốc của tác giả; không được thực thi. Nội dung: Native V8/Upgrades modules already run in background with ACK gating.
    // Native V8/Upgrades modules already run in background with ACK gating.
// [VI dòng gốc 233] Chú thích gốc của tác giả; không được thực thi. Nội dung: No duplicate claim requests or unverified automatic purchases here.
    // No duplicate claim requests or unverified automatic purchases here.
// [VI dòng gốc 234] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 235] Chú thích gốc của tác giả; không được thực thi. Nội dung: Trả trạng thái hiện tại để kiểm tra; ý nghĩa từng bộ đếm thuộc phạm vi module này.
  // Trả trạng thái hiện tại để kiểm tra; ý nghĩa từng bộ đếm thuộc phạm vi module này.
// [VI dòng gốc 236] Định nghĩa hàm status; tham số: không có. Mục đích: trả trạng thái để kiểm tra
  function status(){
// [VI dòng gốc 237] Khai báo biến không gán lại bằng const: q = daily()?.quickState?.() hoặc dùng vế phải khi vế trái falsy: {}; C = daily()?.config hoặc dùng vế phải khi vế trái falsy: {}; s = đọc STATE.stage
    const q=daily()?.quickState?.()||{},C=daily()?.config||{},s=STATE.stage;
// [VI dòng gốc 238] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm version, running, actor, elapsedMs, daily, stage, tinhThan, tienDuyen, towerManual, background, lanes, errors, lastError, lastEvents.
    return {version:VERSION,running:STATE.running,actor:STATE.actor,
// [VI dòng gốc 239] Thuộc tính elapsedMs: nếu STATE.running thì lấy clock()-STATE.startedAt, ngược lại lấy 0
      elapsedMs:STATE.running?clock()-STATE.startedAt:0,
// [VI dòng gốc 240] Thuộc tính daily: tạo đối tượng gồm running, job, step, scene, mission | Thuộc tính running: đảo giá trị đúng/sai của !q.running | Thuộc tính job: q.job hoặc dùng vế phải khi vế trái falsy: 'rảnh' | Thuộc tính step: q.step hoặc dùng vế phải khi vế trái falsy: '-'
      daily:{running:!!q.running,job:q.job||'rảnh',step:q.step||'-',scene:scene(),mission:mission()},
// [VI dòng gốc 241] Thuộc tính stage: tạo đối tượng gồm các thuộc tính của s, enabled, priority, prioritySpacingMs, note | Thuộc tính enabled: đảo giá trị đúng/sai của !C.enableTuVuot | Thuộc tính priority: đảo giá trị đúng/sai của !C.asyncStagePriority
      stage:{...s,enabled:!!C.enableTuVuot,priority:!!C.asyncStagePriority,
// [VI dòng gốc 242] Thuộc tính prioritySpacingMs: C.asyncStagePrioritySpacingMs hoặc dùng vế phải khi vế trái falsy: null
        prioritySpacingMs:C.asyncStagePrioritySpacingMs||null,
// [VI dòng gốc 243] Thuộc tính note: "Thien Quan native; choi khong gioi han; dung bang KVPV_DAILY.tuVuotStop()"
        note:'Thien Quan native; choi khong gioi han; dung bang KVPV_DAILY.tuVuotStop()'},
// [VI dòng gốc 244] Thuộc tính tinhThan: đảo giá trị đúng/sai của !C.enableTinhThan | Thuộc tính tienDuyen: đảo giá trị đúng/sai của !C.enableTienDuyen
      tinhThan:!!C.enableTinhThan,tienDuyen:!!C.enableTienDuyen,
// [VI dòng gốc 245] Thuộc tính towerManual: tính biểu thức tower()?.mode==='manual'
      towerManual:tower()?.mode==='manual',
// [VI dòng gốc 246] Thuộc tính background: tạo đối tượng gồm các thuộc tính của STATE.background, modules | Thuộc tính modules: tạo mảng gồm 1 vị trí: [...STATE.background.modules]
      background:{...STATE.background,modules:[...STATE.background.modules]},
// [VI dòng gốc 247] Thuộc tính lanes: gọi Object.fromEntries(Object.entries(STATE.lanes).map(([k,v])=>[k,{...v}]))
      lanes:Object.fromEntries(Object.entries(STATE.lanes).map(([k,v])=>[k,{...v}])),
// [VI dòng gốc 248] Thuộc tính errors: đọc STATE.errors | Thuộc tính lastError: đọc STATE.lastError | Thuộc tính lastEvents: gọi STATE.log.slice(-8) để lấy một đoạn dữ liệu
      errors:STATE.errors,lastError:STATE.lastError,lastEvents:STATE.log.slice(-8)};
// [VI dòng gốc 249] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 250] Chú thích gốc của tác giả; không được thực thi. Nội dung: Tổng hợp số liệu và lịch sử cho việc chẩn đoán; phân biệt quan sát với xác nhận từ game.
  // Tổng hợp số liệu và lịch sử cho việc chẩn đoán; phân biệt quan sát với xác nhận từ game.
// [VI dòng gốc 251] Định nghĩa hàm report; tham số: không có | Khai báo biến không gán lại bằng const: s = gọi status() để trả trạng thái để kiểm tra | gọi console.log('[KVPV ASYNC928]', s)
  function report(){const s=status();console.log('[KVPV ASYNC928]',s);
// [VI dòng gốc 252] gọi console.table(Object.entries(s.lanes).map(([lane,v])=>({lane,...v})))
    console.table(Object.entries(s.lanes).map(([lane,v])=>({lane,...v})));
// [VI dòng gốc 253] Kết thúc hàm hiện tại và trả về: s.
    return s;}
// [VI dòng gốc 254] Định nghĩa hàm pauseStage; tham số: không có
  function pauseStage(){
// [VI dòng gốc 255] Khai báo biến không gán lại bằng const: c = đọc daily()?.config nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Kiểm tra !c: đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('KVPV_DAILY chưa khởi tạo')
    const c=daily()?.config;if(!c)throw Error('KVPV_DAILY chưa khởi tạo');
// [VI dòng gốc 256] gán c.enableTuVuot bằng false
    c.enableTuVuot=false;
// [VI dòng gốc 257] Khai báo biến không gán lại bằng const: m = gọi stage() | Kiểm tra m?.auto===true: đúng thì chạy nhánh sau if. | gán m.auto bằng false
    const m=stage();if(m?.auto===true)m.auto=false;
// [VI dòng gốc 258] gán STATE.stage.paused bằng true | gọi note('control', 'Tạm dừng Thiên Quan (không ảnh hưởng Tinh Thần/Tiên Duyên)')
    STATE.stage.paused=true;note('control','Tạm dừng Thiên Quan (không ảnh hưởng Tinh Thần/Tiên Duyên)');
// [VI dòng gốc 259] Kết thúc hàm hiện tại và trả về: đọc status().stage.
    return status().stage;
// [VI dòng gốc 260] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 261] Định nghĩa hàm resumeStage; tham số: không có
  function resumeStage(){
// [VI dòng gốc 262] Khai báo biến không gán lại bằng const: d = gọi daily() | Kiểm tra !d?.config: đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('KVPV_DAILY chưa khởi tạo')
    const d=daily();if(!d?.config)throw Error('KVPV_DAILY chưa khởi tạo');
// [VI dòng gốc 263] Chú thích gốc của tác giả; không được thực thi. Nội dung: Only resume a user-stopped stage after explicit action.
    // Only resume a user-stopped stage after explicit action.
// [VI dòng gốc 264] gọi d.tuVuotStart() (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    d.tuVuotStart?.();
// [VI dòng gốc 265] gán d.config.enableTuVuot bằng true | gán STATE.stage.paused bằng false
    d.config.enableTuVuot=true;STATE.stage.paused=false;
// [VI dòng gốc 266] gọi note('control', 'Bật Thiên Quan; core sẽ xử lý khi rảnh, không gửi lệnh ngay')
    note('control','Bật Thiên Quan; core sẽ xử lý khi rảnh, không gửi lệnh ngay');
// [VI dòng gốc 267] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm ok.
    return {ok:true};
// [VI dòng gốc 268] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 269] Chú thích gốc của tác giả; không được thực thi. Nội dung: Dừng bộ điều khiển, hủy lịch và giải phóng tài nguyên do module này sở hữu.
  // Dừng bộ điều khiển, hủy lịch và giải phóng tài nguyên do module này sở hữu.
// [VI dòng gốc 270] Định nghĩa hàm stop; tham số: không có. Mục đích: dừng bộ điều khiển và dọn tài nguyên
  function stop(){
// [VI dòng gốc 271] Khai báo biến không gán lại bằng const: ctrl = đọc STATE.controller | gán STATE.controller bằng null
    const ctrl=STATE.controller;STATE.controller=null;
// [VI dòng gốc 272] gán STATE.running bằng false | gán STATE.stoppedAt bằng clock() | tăng STATE.epoch một đơn vị sau khi lấy giá trị
    STATE.running=false;STATE.stoppedAt=clock();STATE.epoch++;
// [VI dòng gốc 273] Kiểm tra ctrl: đúng thì chạy nhánh sau if. | gọi ctrl.abort()
    if(ctrl)ctrl.abort();
// [VI dòng gốc 274] Kết thúc hàm hiện tại và trả về: gọi status() để trả trạng thái để kiểm tra.
    return status();
// [VI dòng gốc 275] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 276] Chú thích gốc của tác giả; không được thực thi. Nội dung: Bật bộ điều khiển và lịch kiểm tra của module; trả trạng thái sau khi khởi động.
  // Bật bộ điều khiển và lịch kiểm tra của module; trả trạng thái sau khi khởi động.
// [VI dòng gốc 277] Định nghĩa hàm start; tham số: không có. Mục đích: khởi động bộ điều khiển
  function start(){
// [VI dòng gốc 278] Kiểm tra STATE.running: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: gọi status() để trả trạng thái để kiểm tra.
    if(STATE.running)return status();
// [VI dòng gốc 279] Nội dung nguyên văn của chuỗi mẫu; đây là dữ liệu trong chuỗi, không phải lệnh đang chạy.
    if(actor()!==MAIN)throw Error(`Bản MAIN chỉ chạy ở actor ${MAIN}; đang là ${actor()||'chưa tải'}`);
// [VI dòng gốc 280] gán STATE.actor bằng actor() | gán STATE.startedAt bằng clock() | gán STATE.controller bằng new AbortController()
    STATE.actor=actor();STATE.startedAt=clock();STATE.controller=new AbortController();
// [VI dòng gốc 281] gán STATE.running bằng true | tăng STATE.epoch một đơn vị sau khi lấy giá trị
    STATE.running=true;STATE.epoch++;
// [VI dòng gốc 282] Khai báo biến không gán lại bằng const: signal = đọc STATE.controller.signal
    const signal=STATE.controller.signal;
// [VI dòng gốc 283] Chú thích gốc của tác giả; không được thực thi. Nội dung: Promise loops are independent and non-blocking. Only one scene owner: Daily.
    // Promise loops are independent and non-blocking. Only one scene owner: Daily.
// [VI dòng gốc 284] gán STATE.tasks bằng [ loop('scene',800,observeScene,signal), loop('stage',1200,observeStage,signal), loop('background',3000,observeBackground,signal) ]
    STATE.tasks=[
// [VI dòng gốc 285] gọi loop('scene', 800, observeScene, signal)
      loop('scene',800,observeScene,signal),
// [VI dòng gốc 286] gọi loop('stage', 1200, observeStage, signal)
      loop('stage',1200,observeStage,signal),
// [VI dòng gốc 287] gọi loop('background', 3000, observeBackground, signal)
      loop('background',3000,observeBackground,signal)
// [VI dòng gốc 288] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    ];
// [VI dòng gốc 289] gọi note('start', 'Đã bật 3 lane async; scene commands still serialized by existing Daily')
    note('start','Đã bật 3 lane async; scene commands still serialized by existing Daily');
// [VI dòng gốc 290] Kết thúc hàm hiện tại và trả về: gọi status() để trả trạng thái để kiểm tra.
    return status();
// [VI dòng gốc 291] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 292] gán W.KVPV_ASYNC928 bằng Object.freeze({version:VERSION,start,stop,status,report, history:()=>STATE.log.slice(),pauseStage,resumeStage})
  W.KVPV_ASYNC928=Object.freeze({version:VERSION,start,stop,status,report,
// [VI dòng gốc 293] Thuộc tính history: tạo hàm với tham số (không có); mỗi lần gọi trả về gọi STATE.log.slice() để lấy một đoạn dữ liệu | Thuộc tính pauseStage: dùng biến cùng tên | Thuộc tính resumeStage: dùng biến cùng tên
    history:()=>STATE.log.slice(),pauseStage,resumeStage});
// [VI dòng gốc 294] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | gọi start() để khởi động bộ điều khiển | Nhận lỗi bằng e và chạy phần xử lý lỗi. | gọi console.warn('[KVPV ASYNC928] Chưa bật:', safeError(e))
  try{start();}catch(e){console.warn('[KVPV ASYNC928] Chưa bật:',safeError(e));}
// [VI dòng gốc 295] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: })();
})();
// [VI dòng gốc 296] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  });
// [VI dòng gốc 297] gọi install("KVPV_QUEST929", ()=>{ (() => { 'use strict'; const W=window, VERSION='9.2.9', MAIN=String(window.__KVPV_OWN_ACTOR_ID||'…)
  install("KVPV_QUEST929",()=>{
// [VI dòng gốc 298] chạy ngay hàm bao để tạo phạm vi và khởi tạo phần chức năng bên trong
(() => {
// [VI dòng gốc 299] "use strict"
  'use strict';
// [VI dòng gốc 300] Khai báo biến không gán lại bằng const: W = window; VERSION = "9.2.9"; MAIN = gọi String(window.__KVPV_OWN_ACTOR_ID||'') để chuyển sang chuỗi
  const W=window, VERSION='9.2.9', MAIN=String(window.__KVPV_OWN_ACTOR_ID||'');
// [VI dòng gốc 301] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | gọi W.KVPV_QUEST929?.stop() để dừng bộ điều khiển và dọn tài nguyên (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Nhận lỗi bằng _ và chạy phần xử lý lỗi. | gọi window.KVPV_V1?.diagnostics?.record(_) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  try { W.KVPV_QUEST929?.stop?.(); } catch(_){window.KVPV_V1?.diagnostics?.record(_);}
// [VI dòng gốc 302] Khai báo biến không gán lại bằng const: actor = tạo hàm với tham số (không có); mỗi lần gọi trả về gọi String(typeof _Ba==='undefined'?'':_Ba?._rJ?._O$?.ins?.actorId??'') để chuyển sang chuỗi
  const actor=()=>String(typeof _Ba==='undefined'?'':_Ba?._rJ?._O$?.ins?.actorId??'');
// [VI dòng gốc 303] Khai báo biến không gán lại bằng const: now = tạo hàm với tham số (không có); mỗi lần gọi trả về gọi Date.now()
  const now=()=>Date.now();
// [VI dòng gốc 304] Khai báo biến không gán lại bằng const: D = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W.KVPV_DAILY
  const D=()=>W.KVPV_DAILY;
// [VI dòng gốc 305] Khai báo biến không gán lại bằng const: F = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W.KVPV_V876
  const F=()=>W.KVPV_V876;
// [VI dòng gốc 306] Khai báo biến không gán lại bằng const: Q = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W.KVPV_V866
  const Q=()=>W.KVPV_V866;
// [VI dòng gốc 307] Khai báo biến không gán lại bằng const: U = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W.KVPV_UPGRADES
  const U=()=>W.KVPV_UPGRADES;
// [VI dòng gốc 308] Khai báo biến không gán lại bằng const: cfg = tạo hàm với tham số (không có); mỗi lần gọi trả về D()?.config hoặc dùng vế phải khi vế trái falsy: {}
  const cfg=()=>D()?.config||{};
// [VI dòng gốc 309] Khai báo biến không gán lại bằng const: qtask = tạo hàm với tham số (không có) | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | Kết thúc hàm hiện tại và trả về: Q()?.task?.() hoặc dùng vế phải khi vế trái là null/undefined: null. | Nhận lỗi bằng _ và chạy phần xử lý lỗi.
  const qtask=()=>{try{return Q()?.task?.()??null;}catch(_){return null;}};
// [VI dòng gốc 310] Khai báo biến không gán lại bằng const: qs = tạo hàm với tham số (không có) | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | Kết thúc hàm hiện tại và trả về: D()?.quickState?.() hoặc dùng vế phải khi vế trái falsy: {}. | Nhận lỗi bằng _ và chạy phần xử lý lỗi.
  const qs=()=>{try{return D()?.quickState?.()||{};}catch(_){return {};}};
// [VI dòng gốc 311] Khai báo biến không gán lại bằng const: common = tạo hàm với tham số (không có); mỗi lần gọi trả về typeof _Ba!=='undefined' và chỉ đánh giá vế phải khi vế trái truthy: _Ba?._$a?.SceneUtil?.isCommonScene===true
  const common=()=>typeof _Ba!=='undefined'&&_Ba?._$a?.SceneUtil?.isCommonScene===true;
// [VI dòng gốc 312] Khai báo biến không gán lại bằng const: scene = tạo hàm với tham số (không có); mỗi lần gọi trả về gọi Number(typeof _Ba==='undefined'?-1:_Ba?._$a?.SceneUtil?.curScene??-1) để chuyển sang số
  const scene=()=>Number(typeof _Ba==='undefined'?-1:_Ba?._$a?.SceneUtil?.curScene??-1);
// [VI dòng gốc 313] Khai báo biến không gán lại bằng const: cleanError = tạo hàm với tham số e; mỗi lần gọi trả về gọi String(e?.message??e).slice(0, 240) để lấy một đoạn dữ liệu
  const cleanError=e=>String(e?.message??e).slice(0,240);
// [VI dòng gốc 314] Khai báo biến không gán lại bằng const: SETTINGS = tạo đối tượng gồm enabled, enableQueueNudge, enableCatalogRecovery, claimNudgeCooldownMs, stuckWarnMs, maxLog, questPollMs, queuePollMs, healthPollMs
  const SETTINGS={enabled:true,enableQueueNudge:true,enableCatalogRecovery:true,
// [VI dòng gốc 315] Thuộc tính claimNudgeCooldownMs: 4000 | Thuộc tính stuckWarnMs: 180000 | Thuộc tính maxLog: 140
    claimNudgeCooldownMs:4000,stuckWarnMs:180000,maxLog:140,
// [VI dòng gốc 316] Thuộc tính questPollMs: 750 | Thuộc tính queuePollMs: 1400 | Thuộc tính healthPollMs: 3000
    questPollMs:750,queuePollMs:1400,healthPollMs:3000};
// [VI dòng gốc 317] Khai báo biến không gán lại bằng const: state = tạo đối tượng gồm running, controller, generation, startedAt, quest, questKey, progressAt, detected, confirmed, unknowns, lastWarning, latestExecutor, lastCatalogRecoveryAt, catalogRecoveries, lastQueueNudgeAt, queueNudgeKeys, queueNudges, errors, lastError, warnings, redReady, lanes, log
  const state={running:false,controller:null,generation:0,startedAt:0,
// [VI dòng gốc 318] Thuộc tính quest: null | Thuộc tính questKey: "" | Thuộc tính progressAt: 0 | Thuộc tính detected: 0
    quest:null,questKey:'',progressAt:0,detected:0,confirmed:0,
// [VI dòng gốc 319] Thuộc tính unknowns: tạo đối tượng bằng Map() | Thuộc tính lastWarning: tạo đối tượng bằng Set() | Thuộc tính latestExecutor: null
    unknowns:new Map(),lastWarning:new Set(),latestExecutor:null,
// [VI dòng gốc 320] Thuộc tính lastCatalogRecoveryAt: 0 | Thuộc tính catalogRecoveries: 0
    lastCatalogRecoveryAt:0,catalogRecoveries:0,
// [VI dòng gốc 321] Thuộc tính lastQueueNudgeAt: 0 | Thuộc tính queueNudgeKeys: tạo đối tượng bằng Set() | Thuộc tính queueNudges: 0
    lastQueueNudgeAt:0,queueNudgeKeys:new Set(),queueNudges:0,
// [VI dòng gốc 322] Thuộc tính errors: 0 | Thuộc tính lastError: "" | Thuộc tính warnings: 0 | Thuộc tính redReady: false
    errors:0,lastError:'',warnings:0,redReady:false,
// [VI dòng gốc 323] Thuộc tính lanes: tạo đối tượng gồm quest, queue, health | Thuộc tính quest: tạo đối tượng gồm runs, errors, msMax | Thuộc tính runs: 0 | Thuộc tính errors: 0
    lanes:{quest:{runs:0,errors:0,msMax:0},queue:{runs:0,errors:0,msMax:0},health:{runs:0,errors:0,msMax:0}},
// [VI dòng gốc 324] Thuộc tính log: tạo mảng gồm 0 vị trí: []
    log:[]};
// [VI dòng gốc 325] Định nghĩa hàm emit; tham số: kind, message, data
  function emit(kind,message,data){
// [VI dòng gốc 326] Khai báo biến không gán lại bằng const: row = tạo đối tượng gồm at, kind, message, data
    const row={at:new Date().toISOString(),kind,message,data:data??null};
// [VI dòng gốc 327] gọi state.log.push(row) để thêm phần tử vào cuối mảng | Kiểm tra state.log.length>SETTINGS.maxLog: đúng thì chạy nhánh sau if. | gọi state.log.shift()
    state.log.push(row);if(state.log.length>SETTINGS.maxLog)state.log.shift();
// [VI dòng gốc 328] Kiểm tra kind==='warning'||kind==='error': đúng thì chạy nhánh sau if. | gọi console.warn('[KVPV QUEST929]', message, data??'')
    if(kind==='warning'||kind==='error')console.warn('[KVPV QUEST929]',message,data??'');
// [VI dòng gốc 329] Kết thúc hàm hiện tại và trả về: row.
    return row;
// [VI dòng gốc 330] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 331] Định nghĩa hàm sleep; tham số: ms, signal | Kết thúc hàm hiện tại và trả về: tạo đối tượng bằng Promise(resolve=>{ if(signal.aborted){resolve(false);return;} let t=null; function end(){clearTimeout(t);signal.removeEventListe…).
  function sleep(ms,signal){return new Promise(resolve=>{
// [VI dòng gốc 332] Kiểm tra signal.aborted: đúng thì chạy nhánh sau if. | gọi resolve(false) | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(signal.aborted){resolve(false);return;}
// [VI dòng gốc 333] Khai báo biến có thể gán lại bằng let: t = null
    let t=null;
// [VI dòng gốc 334] Định nghĩa hàm end; tham số: không có | gọi clearTimeout(t) để hủy lịch thực hiện một lần | gọi signal.removeEventListener('abort', end) để gỡ bộ xử lý sự kiện | gọi resolve(!signal.aborted)
    function end(){clearTimeout(t);signal.removeEventListener('abort',end);resolve(!signal.aborted);}
// [VI dòng gốc 335] gọi signal.addEventListener('abort', end, {once:true}) để đăng ký bộ xử lý sự kiện | gán t bằng setTimeout(end,ms)
    signal.addEventListener('abort',end,{once:true});t=setTimeout(end,ms);
// [VI dòng gốc 336] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  });}
// [VI dòng gốc 337] Định nghĩa hàm bất đồng bộ lane; tham số: name, interval, handler, signal, generation
  async function lane(name,interval,handler,signal,generation){
// [VI dòng gốc 338] Khai báo biến không gán lại bằng const: stat = đọc state.lanes[name]
    const stat=state.lanes[name];
// [VI dòng gốc 339] Lặp khi điều kiện còn đúng: !signal.aborted&&generation===state.generation
    while(!signal.aborted&&generation===state.generation){
// [VI dòng gốc 340] Khai báo biến không gán lại bằng const: began = gọi now()
      const began=now();
// [VI dòng gốc 341] Kiểm tra actor()!==MAIN: đúng thì chạy nhánh sau if. | gọi emit('warning', 'Sai nhân vật/game-frame; dừng toàn bộ Quest929') | gọi stop() để dừng bộ điều khiển và dọn tài nguyên | Thoát vòng lặp/switch hiện tại.
      if(actor()!==MAIN){emit('warning','Sai nhân vật/game-frame; dừng toàn bộ Quest929');stop();break;}
// [VI dòng gốc 342] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | chờ tác vụ bất đồng bộ: gọi handler() | Nhận lỗi bằng e và chạy phần xử lý lỗi. | tăng state.errors một đơn vị sau khi lấy giá trị
      try{await handler();}catch(e){state.errors++;stat.errors++;state.lastError=cleanError(e);
// [VI dòng gốc 343] gọi emit('error', 'Lỗi lane '+name, state.lastError)
        emit('error','Lỗi lane '+name,state.lastError);}
// [VI dòng gốc 344] tăng stat.runs một đơn vị sau khi lấy giá trị | gán stat.msMax bằng Math.max(stat.msMax,now()-began)
      stat.runs++;stat.msMax=Math.max(stat.msMax,now()-began);
// [VI dòng gốc 345] Khai báo biến có thể gán lại bằng let: wait = interval
      let wait=interval;
// [VI dòng gốc 346] Kiểm tra document?.hidden: đúng thì chạy nhánh sau if. | gán wait bằng Math.max(wait,2500)
      if(document?.hidden)wait=Math.max(wait,2500);
// [VI dòng gốc 347] Kiểm tra !await sleep(Math.max(100,wait-(now()-began)),signal): đúng thì chạy nhánh sau if. | Thoát vòng lặp/switch hiện tại.
      if(!await sleep(Math.max(100,wait-(now()-began)),signal))break;
// [VI dòng gốc 348] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 349] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 350] Khai báo biến không gán lại bằng const: taskSignature = tạo hàm với tham số q; mỗi lần gọi trả về gọi JSON.stringify([q?.id??null,q?.state??null,q?.progress??null]) để chuyển giá trị thành chuỗi JSON
  const taskSignature=q=>JSON.stringify([q?.id??null,q?.state??null,q?.progress??null]);
// [VI dòng gốc 351] Định nghĩa hàm executor; tham số: q
  function executor(q){
// [VI dòng gốc 352] Kiểm tra !q: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: null.
    if(!q)return null;
// [VI dòng gốc 353] Khai báo biến có thể gán lại bằng let: info = null
    let info=null;
// [VI dòng gốc 354] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | gán info bằng F()?.status?.(false)||null | Nhận lỗi bằng _ và chạy phần xử lý lỗi.
    try{info=F()?.status?.(false)||null;}catch(_){ /* diagnostic-only */ }
// [VI dòng gốc 355] Kiểm tra !info||String(info.id)!==String(q.id): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm id, verified, executable, module, reason.
    if(!info||String(info.id)!==String(q.id))return {
// [VI dòng gốc 356] Thuộc tính id: gọi String(q.id) để chuyển sang chuỗi | Thuộc tính verified: false | Thuộc tính executable: false | Thuộc tính module: null
      id:String(q.id),verified:false,executable:false,module:null,reason:'Factory chưa có dữ liệu đồng bộ'};
// [VI dòng gốc 357] Khai báo biến không gán lại bằng const: tower = /linh lung/i.test(String(q.name||'')) hoặc dùng vế phải khi vế trái falsy: info.family==='linhlung'
    const tower=/linh lung/i.test(String(q.name||''))||info.family==='linhlung';
// [VI dòng gốc 358] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm id, family, verified, executable, module, reason, forcedManual.
    return {id:String(q.id),family:info.family||null,verified:!!info.verified,
// [VI dòng gốc 359] Thuộc tính executable: !!info.executable và chỉ đánh giá vế phải khi vế trái truthy: !tower | Thuộc tính module: info.module hoặc dùng vế phải khi vế trái falsy: null
      executable:!!info.executable&&!tower,module:info.module||null,
// [VI dòng gốc 360] Thuộc tính reason: nếu tower thì lấy 'Linh Lung Tháp MANUAL: không tự chạy executor', ngược lại lấy info.reason||''
      reason:tower?'Linh Lung Tháp MANUAL: không tự chạy executor':info.reason||'',
// [VI dòng gốc 361] Thuộc tính forcedManual: tower
      forcedManual:tower};
// [VI dòng gốc 362] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 363] Định nghĩa hàm taskLane; tham số: không có
  function taskLane(){
// [VI dòng gốc 364] Khai báo biến không gán lại bằng const: q = gọi qtask()
    const q=qtask();
// [VI dòng gốc 365] Kiểm tra !q||q.id==null: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(!q||q.id==null)return;
// [VI dòng gốc 366] Khai báo biến không gán lại bằng const: key = gọi taskSignature(q); was = đọc state.quest
    const key=taskSignature(q),was=state.quest;
// [VI dòng gốc 367] Kiểm tra key!==state.questKey: đúng thì chạy nhánh sau if.
    if(key!==state.questKey){
// [VI dòng gốc 368] gán state.questKey bằng key | gán state.quest bằng {id:String(q.id),name:String(q.name||''), state:Number(q.state),actionId:Number(q.actionId||0),progress:q.progress??null}
      state.questKey=key;state.quest={id:String(q.id),name:String(q.name||''),
// [VI dòng gốc 369] Thuộc tính state: gọi Number(q.state) để chuyển sang số | Thuộc tính actionId: gọi Number(q.actionId||0) để chuyển sang số | Thuộc tính progress: q.progress hoặc dùng vế phải khi vế trái là null/undefined: null
        state:Number(q.state),actionId:Number(q.actionId||0),progress:q.progress??null};
// [VI dòng gốc 370] gán state.progressAt bằng now() | tăng state.detected một đơn vị sau khi lấy giá trị
      state.progressAt=now();state.detected++;
// [VI dòng gốc 371] Kiểm tra was?.id===String(q.id)&&state.quest.state===2&&was.state!==2: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | tăng state.confirmed một đơn vị sau khi lấy giá trị
      if(was?.id===String(q.id)&&state.quest.state===2&&was.state!==2){state.confirmed++;
// [VI dòng gốc 372] gọi emit('confirmed', 'Server báo nhiệm vụ hoàn tất', {id:String(q.id)})
        emit('confirmed','Server báo nhiệm vụ hoàn tất',{id:String(q.id)});
// [VI dòng gốc 373] gọi emit('task', 'Server cập nhật nhiệm vụ', { id:String(q.id),state:q.state,actionId:q.actionId})
      }else emit('task','Server cập nhật nhiệm vụ',{
// [VI dòng gốc 374] Thuộc tính id: gọi String(q.id) để chuyển sang chuỗi | Thuộc tính state: đọc q.state | Thuộc tính actionId: đọc q.actionId
        id:String(q.id),state:q.state,actionId:q.actionId});
// [VI dòng gốc 375] Chú thích gốc của tác giả; không được thực thi. Nội dung: A changed server signature merits a fresh queue evaluation, but never
      // A changed server signature merits a fresh queue evaluation, but never
// [VI dòng gốc 376] Chú thích gốc của tác giả; không được thực thi. Nội dung: replay the exact request or bypass an existing ACK lock.
      // replay the exact request or bypass an existing ACK lock.
// [VI dòng gốc 377] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 378] Khai báo biến không gán lại bằng const: ex = gọi executor(q) | gán state.latestExecutor bằng ex
    const ex=executor(q);state.latestExecutor=ex;
// [VI dòng gốc 379] Kiểm tra Number(q.state)!==2&&!ex?.executable: đúng thì chạy nhánh sau if.
    if(Number(q.state)!==2&&!ex?.executable){
// [VI dòng gốc 380] Khai báo biến không gán lại bằng const: row = tạo đối tượng gồm id, name, actionId, family, reason, at
      const row={id:String(q.id),name:String(q.name||''),actionId:Number(q.actionId||0),
// [VI dòng gốc 381] Thuộc tính family: ex?.family hoặc dùng vế phải khi vế trái falsy: 'unknown' | Thuộc tính reason: ex?.reason hoặc dùng vế phải khi vế trái falsy: 'Thiếu executor đã xác minh' | Thuộc tính at: gọi now()
        family:ex?.family||'unknown',reason:ex?.reason||'Thiếu executor đã xác minh',at:now()};
// [VI dòng gốc 382] gọi state.unknowns.set(row.id, row)
      state.unknowns.set(row.id,row);
// [VI dòng gốc 383] Kiểm tra state.unknowns.size>80: đúng thì chạy nhánh sau if. | gọi state.unknowns.delete(state.unknowns.keys().next().value)
      if(state.unknowns.size>80)state.unknowns.delete(state.unknowns.keys().next().value);
// [VI dòng gốc 384] Khai báo biến không gán lại bằng const: warningKey = tính biểu thức 'missing:'+row.id+':'+row.reason
      const warningKey='missing:'+row.id+':'+row.reason;
// [VI dòng gốc 385] Kiểm tra !state.lastWarning.has(warningKey): đúng thì chạy nhánh sau if.
      if(!state.lastWarning.has(warningKey)){
// [VI dòng gốc 386] gọi state.lastWarning.add(warningKey) | tăng state.warnings một đơn vị sau khi lấy giá trị
        state.lastWarning.add(warningKey);state.warnings++;
// [VI dòng gốc 387] gọi emit('warning', 'Nhiệm vụ chưa có executor được phép tự chạy', row)
        emit('warning','Nhiệm vụ chưa có executor được phép tự chạy',row);
// [VI dòng gốc 388] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
      }
// [VI dòng gốc 389] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 390] Kiểm tra Number(q.state)!==2&&state.progressAt&&now()-state.progressAt>SETTINGS.stuckWarnMs: đúng thì chạy nhánh sau if.
    if(Number(q.state)!==2&&state.progressAt&&now()-state.progressAt>SETTINGS.stuckWarnMs){
// [VI dòng gốc 391] Khai báo biến không gán lại bằng const: key = tính biểu thức 'idle:'+String(q.id)+':'+state.questKey
      const key='idle:'+String(q.id)+':'+state.questKey;
// [VI dòng gốc 392] Kiểm tra !state.lastWarning.has(key): đúng thì chạy nhánh sau if.
      if(!state.lastWarning.has(key)){
// [VI dòng gốc 393] gọi state.lastWarning.add(key) | tăng state.warnings một đơn vị sau khi lấy giá trị
        state.lastWarning.add(key);state.warnings++;
// [VI dòng gốc 394] gọi emit('warning', 'Tiến độ nhiệm vụ đứng yên >3 phút, không tự phát lại RPC', { quest:q.id,job:qs().job,scene:scene(),executor:…)
        emit('warning','Tiến độ nhiệm vụ đứng yên >3 phút, không tự phát lại RPC',{
// [VI dòng gốc 395] Thuộc tính quest: đọc q.id | Thuộc tính job: đọc qs().job | Thuộc tính scene: gọi scene() | Thuộc tính executor: đọc ex?.module nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
          quest:q.id,job:qs().job,scene:scene(),executor:ex?.module});
// [VI dòng gốc 396] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
      }
// [VI dòng gốc 397] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 398] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 399] Định nghĩa hàm towerManual; tham số: không có
  function towerManual(){
// [VI dòng gốc 400] Khai báo biến không gán lại bằng const: c = đọc W.KVPV_V873?.config nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const c=W.KVPV_V873?.config;
// [VI dòng gốc 401] Kiểm tra c: đúng thì chạy nhánh sau if. | gán c.autoChallenge bằng false | gán c.autoOpen bằng false
    if(c){c.autoChallenge=false;c.autoOpen=false;}
// [VI dòng gốc 402] Chú thích gốc của tác giả; không được thực thi. Nội dung: Do not disable the explicit KVPV_TOWER_MANUAL925.start API.
    // Do not disable the explicit KVPV_TOWER_MANUAL925.start API.
// [VI dòng gốc 403] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 404] Định nghĩa hàm recoverCatalog; tham số: không có
  function recoverCatalog(){
// [VI dòng gốc 405] Kiểm tra !SETTINGS.enableCatalogRecovery||now()-state.lastCatalogRecoveryAt<60000: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(!SETTINGS.enableCatalogRecovery||now()-state.lastCatalogRecoveryAt<60000)return;
// [VI dòng gốc 406] Khai báo biến không gán lại bằng const: f = gọi F(); origin = nếu typeof _ft!=='undefined' thì lấy _ft?.__Z?.ins?.originCfg, ngược lại lấy null
    const f=F(),origin=typeof _ft!=='undefined'?_ft?.__Z?.ins?.originCfg:null;
// [VI dòng gốc 407] Kiểm tra !f?.buildAll||!Array.isArray(origin)||!origin.length: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(!f?.buildAll||!Array.isArray(origin)||!origin.length)return;
// [VI dòng gốc 408] Khai báo biến không gán lại bằng const: n = nếu Array.isArray(f.executors?.()) thì lấy f.executors().length, ngược lại lấy 1
    const n=Array.isArray(f.executors?.())?f.executors().length:1;
// [VI dòng gốc 409] Kiểm tra n>0: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(n>0)return;
// [VI dòng gốc 410] gán state.lastCatalogRecoveryAt bằng now()
    state.lastCatalogRecoveryAt=now();
// [VI dòng gốc 411] Khai báo biến không gán lại bằng const: result = gọi f.buildAll() | tăng state.catalogRecoveries một đơn vị sau khi lấy giá trị
    const result=f.buildAll();state.catalogRecoveries++;
// [VI dòng gốc 412] gọi emit('recovered', 'Tải lại danh mục executor sau khi model game có dữ liệu', result)
    emit('recovered','Tải lại danh mục executor sau khi model game có dữ liệu',result);
// [VI dòng gốc 413] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 414] Định nghĩa hàm queueLane; tham số: không có
  function queueLane(){
// [VI dòng gốc 415] gọi towerManual()
    towerManual();
// [VI dòng gốc 416] Khai báo biến không gán lại bằng const: q = gọi qtask(); u = gọi U(); s = gọi qs()
    const q=qtask(),u=U(),s=qs();
// [VI dòng gốc 417] Chú thích gốc của tác giả; không được thực thi. Nội dung: Exactly one acceleration of the native queue when a *new* server
    // Exactly one acceleration of the native queue when a *new* server
// [VI dòng gốc 418] Chú thích gốc của tác giả; không được thực thi. Nội dung: snapshot reports the main quest in completed state. No direct reward RPC.
    // snapshot reports the main quest in completed state. No direct reward RPC.
// [VI dòng gốc 419] Kiểm tra !SETTINGS.enableQueueNudge||!state.running||!q||Number(q.state)!==2|| !u||typeof u.run!=='function'||typeof u.busy!=='function'||u.busy()|| !W.KVPV_V86?.config?.autoClaimMainQuest|…: đúng thì chạy nhánh sau if.
    if(!SETTINGS.enableQueueNudge||!state.running||!q||Number(q.state)!==2||
// [VI dòng gốc 420] gọi u.busy()
       !u||typeof u.run!=='function'||typeof u.busy!=='function'||u.busy()||
// [VI dòng gốc 421] Tiếp tục hàm queueLane; thành phần cú pháp bắt đầu bằng !/~. Đọc cùng dòng mở phía trên: !W.KVPV_V86?.config?.autoClaimMainQuest||
       !W.KVPV_V86?.config?.autoClaimMainQuest||
// [VI dòng gốc 422] gọi common()
       W.KVPV_V86?.config?.enabled===false||!s.running||!common()||
// [VI dòng gốc 423] Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
       now()-state.lastQueueNudgeAt<SETTINGS.claimNudgeCooldownMs)return;
// [VI dòng gốc 424] Khai báo biến không gán lại bằng const: key = gọi taskSignature(q)
    const key=taskSignature(q);
// [VI dòng gốc 425] Kiểm tra state.queueNudgeKeys.has(key): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(state.queueNudgeKeys.has(key))return;
// [VI dòng gốc 426] gọi state.queueNudgeKeys.add(key)
    state.queueNudgeKeys.add(key);
// [VI dòng gốc 427] Kiểm tra state.queueNudgeKeys.size>120: đúng thì chạy nhánh sau if. | gọi state.queueNudgeKeys.delete(state.queueNudgeKeys.values().next().value)
    if(state.queueNudgeKeys.size>120)state.queueNudgeKeys.delete(state.queueNudgeKeys.values().next().value);
// [VI dòng gốc 428] gán state.lastQueueNudgeAt bằng now() | tăng state.queueNudges một đơn vị sau khi lấy giá trị
    state.lastQueueNudgeAt=now();state.queueNudges++;
// [VI dòng gốc 429] Chú thích gốc của tác giả; không được thực thi. Nội dung: The existing queue owns all eligibility, prioritization and server ACK.
    // The existing queue owns all eligibility, prioritization and server ACK.
// [VI dòng gốc 430] gọi u.run()
    u.run();
// [VI dòng gốc 431] gọi emit('queue', 'Yêu cầu hàng đợi native xét nhiệm vụ đã hoàn thành', { id:String(q.id),state:Number(q.state)})
    emit('queue','Yêu cầu hàng đợi native xét nhiệm vụ đã hoàn thành',{
// [VI dòng gốc 432] Thuộc tính id: gọi String(q.id) để chuyển sang chuỗi | Thuộc tính state: gọi Number(q.state) để chuyển sang số
      id:String(q.id),state:Number(q.state)});
// [VI dòng gốc 433] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 434] Định nghĩa hàm healthLane; tham số: không có
  function healthLane(){
// [VI dòng gốc 435] gọi towerManual() | gọi recoverCatalog()
    towerManual();recoverCatalog();
// [VI dòng gốc 436] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | gán state.redReady bằng U()?.hasReadyClaims?.()===true | Nhận lỗi bằng _ và chạy phần xử lý lỗi. | gán state.redReady bằng false
    try{state.redReady=U()?.hasReadyClaims?.()===true;}catch(_){state.redReady=false;}
// [VI dòng gốc 437] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 438] Chú thích gốc của tác giả; không được thực thi. Nội dung: Trả trạng thái hiện tại để kiểm tra; ý nghĩa từng bộ đếm thuộc phạm vi module này.
  // Trả trạng thái hiện tại để kiểm tra; ý nghĩa từng bộ đếm thuộc phạm vi module này.
// [VI dòng gốc 439] Định nghĩa hàm status; tham số: không có. Mục đích: trả trạng thái để kiểm tra
  function status(){
// [VI dòng gốc 440] Khai báo biến không gán lại bằng const: q = gọi qs()
    const q=qs();
// [VI dòng gốc 441] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm version, running, actor, elapsedMs, daily, quest, executor, waitingMs, tower, tier, enableTienDuyen, enableTinhThan, redReady, detected, serverCompleted, missingCount, catalogRecoveries, queueNudges, queueBusy, errors, warnings, lastError, lanes, recent.
    return {version:VERSION,running:state.running,actor:actor(),
// [VI dòng gốc 442] Thuộc tính elapsedMs: nếu state.running thì lấy now()-state.startedAt, ngược lại lấy 0
      elapsedMs:state.running?now()-state.startedAt:0,
// [VI dòng gốc 443] Thuộc tính daily: tạo đối tượng gồm running, job, step, scene | Thuộc tính running: đảo giá trị đúng/sai của !q.running | Thuộc tính job: q.job hoặc dùng vế phải khi vế trái falsy: 'rảnh' | Thuộc tính step: q.step hoặc dùng vế phải khi vế trái falsy: '-'
      daily:{running:!!q.running,job:q.job||'rảnh',step:q.step||'-',scene:scene()},
// [VI dòng gốc 444] Thuộc tính quest: nếu state.quest thì lấy {...state.quest}, ngược lại lấy null
      quest:state.quest?{...state.quest}:null,
// [VI dòng gốc 445] Thuộc tính executor: nếu state.latestExecutor thì lấy {...state.latestExecutor}, ngược lại lấy null
      executor:state.latestExecutor?{...state.latestExecutor}:null,
// [VI dòng gốc 446] Thuộc tính waitingMs: nếu state.progressAt thì lấy now()-state.progressAt, ngược lại lấy null
      waitingMs:state.progressAt?now()-state.progressAt:null,
// [VI dòng gốc 447] Thuộc tính tower: W.KVPV_TOWER_MANUAL925?.status?.()?.mode hoặc dùng vế phải khi vế trái falsy: 'unknown'
      tower:W.KVPV_TOWER_MANUAL925?.status?.()?.mode||'unknown',
// [VI dòng gốc 448] Thuộc tính tier: đọc cfg().tinhThanTang | Thuộc tính enableTienDuyen: đảo giá trị đúng/sai của !cfg().enableTienDuyen
      tier:cfg().tinhThanTang,enableTienDuyen:!!cfg().enableTienDuyen,
// [VI dòng gốc 449] Thuộc tính enableTinhThan: đảo giá trị đúng/sai của !cfg().enableTinhThan | Thuộc tính redReady: đọc state.redReady
      enableTinhThan:!!cfg().enableTinhThan,redReady:state.redReady,
// [VI dòng gốc 450] Thuộc tính detected: đọc state.detected | Thuộc tính serverCompleted: đọc state.confirmed
      detected:state.detected,serverCompleted:state.confirmed,
// [VI dòng gốc 451] Thuộc tính missingCount: đọc state.unknowns.size | Thuộc tính catalogRecoveries: đọc state.catalogRecoveries
      missingCount:state.unknowns.size,catalogRecoveries:state.catalogRecoveries,
// [VI dòng gốc 452] Thuộc tính queueNudges: đọc state.queueNudges | Thuộc tính queueBusy: đảo giá trị đúng/sai của !U()?.busy?.()
      queueNudges:state.queueNudges,queueBusy:!!U()?.busy?.(),
// [VI dòng gốc 453] Thuộc tính errors: đọc state.errors | Thuộc tính warnings: đọc state.warnings | Thuộc tính lastError: đọc state.lastError
      errors:state.errors,warnings:state.warnings,lastError:state.lastError,
// [VI dòng gốc 454] Thuộc tính lanes: gọi Object.fromEntries(Object.entries(state.lanes).map(([k,v])=>[k,{...v}]))
      lanes:Object.fromEntries(Object.entries(state.lanes).map(([k,v])=>[k,{...v}])),
// [VI dòng gốc 455] Thuộc tính recent: gọi state.log.slice(-8) để lấy một đoạn dữ liệu
      recent:state.log.slice(-8)};
// [VI dòng gốc 456] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 457] Chú thích gốc của tác giả; không được thực thi. Nội dung: Tổng hợp số liệu và lịch sử cho việc chẩn đoán; phân biệt quan sát với xác nhận từ game.
  // Tổng hợp số liệu và lịch sử cho việc chẩn đoán; phân biệt quan sát với xác nhận từ game.
// [VI dòng gốc 458] Định nghĩa hàm report; tham số: không có | Khai báo biến không gán lại bằng const: s = gọi status() để trả trạng thái để kiểm tra | gọi console.log('[KVPV QUEST929]', s)
  function report(){const s=status();console.log('[KVPV QUEST929]',s);
// [VI dòng gốc 459] gọi console.table([{ Main:s.actor,Quest:s.quest?.id||'-',Name:s.quest?.name||'-', State:s.quest?.state??'-',Verified:!!s.executor?.verifie…)
    console.table([{
// [VI dòng gốc 460] Thuộc tính Main: đọc s.actor | Thuộc tính Quest: s.quest?.id hoặc dùng vế phải khi vế trái falsy: '-' | Thuộc tính Name: s.quest?.name hoặc dùng vế phải khi vế trái falsy: '-'
      Main:s.actor,Quest:s.quest?.id||'-',Name:s.quest?.name||'-',
// [VI dòng gốc 461] Thuộc tính State: s.quest?.state hoặc dùng vế phải khi vế trái là null/undefined: '-' | Thuộc tính Verified: đảo giá trị đúng/sai của !s.executor?.verified
      State:s.quest?.state??'-',Verified:!!s.executor?.verified,
// [VI dòng gốc 462] Thuộc tính Executable: đảo giá trị đúng/sai của !s.executor?.executable | Thuộc tính Executor: s.executor?.module hoặc dùng vế phải khi vế trái falsy: '-'
      Executable:!!s.executor?.executable,Executor:s.executor?.module||'-',
// [VI dòng gốc 463] Thuộc tính Job: đọc s.daily.job | Thuộc tính Tower: đọc s.tower | Thuộc tính Red: đọc s.redReady
      Job:s.daily.job,Tower:s.tower,Red:s.redReady,
// [VI dòng gốc 464] Thuộc tính Queue: nếu s.queueBusy thì lấy 'BUSY', ngược lại lấy 'FREE' | Thuộc tính Warnings: đọc s.warnings
      Queue:s.queueBusy?'BUSY':'FREE',Warnings:s.warnings
// [VI dòng gốc 465] Kết thúc hàm hiện tại và trả về: s.
    }]);return s;
// [VI dòng gốc 466] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 467] Chú thích gốc của tác giả; không được thực thi. Nội dung: Dừng bộ điều khiển, hủy lịch và giải phóng tài nguyên do module này sở hữu.
  // Dừng bộ điều khiển, hủy lịch và giải phóng tài nguyên do module này sở hữu.
// [VI dòng gốc 468] Định nghĩa hàm stop; tham số: không có. Mục đích: dừng bộ điều khiển và dọn tài nguyên | gán state.running bằng false | tăng state.generation một đơn vị sau khi lấy giá trị
  function stop(){state.running=false;state.generation++;
// [VI dòng gốc 469] Khai báo biến không gán lại bằng const: c = đọc state.controller | gán state.controller bằng null
    const c=state.controller;state.controller=null;
// [VI dòng gốc 470] Kiểm tra c: đúng thì chạy nhánh sau if. | gọi c.abort() | Kết thúc hàm hiện tại và trả về: gọi status() để trả trạng thái để kiểm tra.
    if(c)c.abort();return status();}
// [VI dòng gốc 471] Chú thích gốc của tác giả; không được thực thi. Nội dung: Bật bộ điều khiển và lịch kiểm tra của module; trả trạng thái sau khi khởi động.
  // Bật bộ điều khiển và lịch kiểm tra của module; trả trạng thái sau khi khởi động.
// [VI dòng gốc 472] Định nghĩa hàm start; tham số: không có. Mục đích: khởi động bộ điều khiển
  function start(){
// [VI dòng gốc 473] Kiểm tra state.running: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: gọi status() để trả trạng thái để kiểm tra.
    if(state.running)return status();
// [VI dòng gốc 474] Nội dung nguyên văn của chuỗi mẫu; đây là dữ liệu trong chuỗi, không phải lệnh đang chạy.
    if(actor()!==MAIN)throw Error(`MAIN only (${MAIN}), actor now ${actor()||'not loaded'}`);
// [VI dòng gốc 475] Kiểm tra !D()?.quickState||!Q()?.task: đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('V9.2.8 FULL is required in game-frame')
    if(!D()?.quickState||!Q()?.task)throw Error('V9.2.8 FULL is required in game-frame');
// [VI dòng gốc 476] gán state.startedAt bằng now() | gán state.running bằng true | tăng state.generation một đơn vị sau khi lấy giá trị
    state.startedAt=now();state.running=true;state.generation++;
// [VI dòng gốc 477] gán state.controller bằng new AbortController()
    state.controller=new AbortController();
// [VI dòng gốc 478] Khai báo biến không gán lại bằng const: signal = đọc state.controller.signal; generation = đọc state.generation
    const signal=state.controller.signal,generation=state.generation;
// [VI dòng gốc 479] gọi towerManual()
    towerManual();
// [VI dòng gốc 480] Chú thích gốc của tác giả; không được thực thi. Nội dung: Independent cooperative loops; no duplicate scene owner.
    // Independent cooperative loops; no duplicate scene owner.
// [VI dòng gốc 481] gọi lane('quest', SETTINGS.questPollMs, taskLane, signal, generation)
    lane('quest',SETTINGS.questPollMs,taskLane,signal,generation);
// [VI dòng gốc 482] gọi lane('queue', SETTINGS.queuePollMs, queueLane, signal, generation)
    lane('queue',SETTINGS.queuePollMs,queueLane,signal,generation);
// [VI dòng gốc 483] gọi lane('health', SETTINGS.healthPollMs, healthLane, signal, generation)
    lane('health',SETTINGS.healthPollMs,healthLane,signal,generation);
// [VI dòng gốc 484] gọi emit('start', 'Bật 3 lane bất đồng bộ: quest, queue và health')
    emit('start','Bật 3 lane bất đồng bộ: quest, queue và health');
// [VI dòng gốc 485] Kết thúc hàm hiện tại và trả về: gọi status() để trả trạng thái để kiểm tra.
    return status();
// [VI dòng gốc 486] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 487] Khai báo biến không gán lại bằng const: api = gọi Object.freeze({version:VERSION,start,stop,status,report, history:()=>state.log.slice(), missing:()=>[...state.unknowns.values()].map(x…) để khóa thay đổi trực tiếp các thuộc tính của đối tượng ở mức ngoài cùng
  const api=Object.freeze({version:VERSION,start,stop,status,report,
// [VI dòng gốc 488] Thuộc tính history: tạo hàm với tham số (không có); mỗi lần gọi trả về gọi state.log.slice() để lấy một đoạn dữ liệu
    history:()=>state.log.slice(),
// [VI dòng gốc 489] Thuộc tính missing: tạo hàm với tham số (không có); mỗi lần gọi trả về gọi [...state.unknowns.values()].map(x=>({...x})) để biến đổi từng phần tử
    missing:()=>[...state.unknowns.values()].map(x=>({...x})),
// [VI dòng gốc 490] Thuộc tính config: SETTINGS
    config:SETTINGS,
// [VI dòng gốc 491] Kết thúc hàm hiện tại và trả về: gọi stop() để dừng bộ điều khiển và dọn tài nguyên. | Kết thúc hàm hiện tại và trả về: gọi start() để khởi động bộ điều khiển.
    pause(){return stop();},resume(){return start();}});
// [VI dòng gốc 492] gán W.KVPV_QUEST929 bằng api
  W.KVPV_QUEST929=api;
// [VI dòng gốc 493] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | gọi start() để khởi động bộ điều khiển | Nhận lỗi bằng e và chạy phần xử lý lỗi. | gọi console.warn('[KVPV QUEST929] Chưa bật:', cleanError(e))
  try{start();}catch(e){console.warn('[KVPV QUEST929] Chưa bật:',cleanError(e));}
// [VI dòng gốc 494] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: })();
})();
// [VI dòng gốc 495] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  });
// [VI dòng gốc 496] gọi install("KVPV_RUNES930", ()=>{ (() => { 'use strict'; const W=window,MAIN=String(window.__KVPV_OWN_ACTOR_ID||''); if(W.KVPV_RUNE…)
  install("KVPV_RUNES930",()=>{
// [VI dòng gốc 497] chạy ngay hàm bao để tạo phạm vi và khởi tạo phần chức năng bên trong
(() => {
// [VI dòng gốc 498] "use strict"
  'use strict';
// [VI dòng gốc 499] Khai báo biến không gán lại bằng const: W = window; MAIN = gọi String(window.__KVPV_OWN_ACTOR_ID||'') để chuyển sang chuỗi
  const W=window,MAIN=String(window.__KVPV_OWN_ACTOR_ID||'');
// [VI dòng gốc 500] Kiểm tra W.KVPV_RUNES930?.installed: đúng thì chạy nhánh sau if. | gọi W.KVPV_RUNES930.start() để khởi động bộ điều khiển | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  if(W.KVPV_RUNES930?.installed){W.KVPV_RUNES930.start();return;}
// [VI dòng gốc 501] Khai báo biến không gán lại bằng const: F = đọc W.KVPV_V876; Q = đọc W.KVPV_V866; D = đọc W.KVPV_DAILY
  const F=W.KVPV_V876,Q=W.KVPV_V866,D=W.KVPV_DAILY;
// [VI dòng gốc 502] Kiểm tra !F?.registerRecipe||!Q?.task||!D?.quickState||typeof _Ba==='undefined'||typeof _ft==='undefined': đúng thì chạy nhánh sau if.
  if(!F?.registerRecipe||!Q?.task||!D?.quickState||typeof _Ba==='undefined'||typeof _ft==='undefined'){
// [VI dòng gốc 503] gọi console.warn('[KVPV RUNES930] Need V9.2.9 FULL and game-frame') | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    console.warn('[KVPV RUNES930] Need V9.2.9 FULL and game-frame');return;
// [VI dòng gốc 504] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 505] Khai báo biến không gán lại bằng const: C = tạo đối tượng gồm enabled, autoRefine, pollMs, minGapMs, ackTimeoutMs, maxAttemptsPerQuest, maxItemPerUpgrade, maxRuneExpPerUpgrade, requireCommonScene, maxHistory
  const C={enabled:true,autoRefine:true,pollMs:750,minGapMs:1500,
// [VI dòng gốc 506] Thuộc tính ackTimeoutMs: 30000 | Thuộc tính maxAttemptsPerQuest: 40 | Thuộc tính maxItemPerUpgrade: 10000
    ackTimeoutMs:30000,maxAttemptsPerQuest:40,maxItemPerUpgrade:10000,
// [VI dòng gốc 507] Thuộc tính maxRuneExpPerUpgrade: 1000000000
    maxRuneExpPerUpgrade:1000000000,
// [VI dòng gốc 508] Thuộc tính requireCommonScene: true | Thuộc tính maxHistory: 80
    requireCommonScene:true,maxHistory:80};
// [VI dòng gốc 509] Khai báo biến không gán lại bằng const: S = tạo đối tượng gồm running, timer, registered, pending, blocked, lastSendAt, attempts, success, sent, errors, history, lastError
  const S={running:false,timer:null,registered:false,pending:null,blocked:null,
// [VI dòng gốc 510] Thuộc tính lastSendAt: 0 | Thuộc tính attempts: tạo đối tượng bằng Map() | Thuộc tính success: 0 | Thuộc tính sent: 0
    lastSendAt:0,attempts:new Map(),success:0,sent:0,errors:0,history:[],lastError:''};
// [VI dòng gốc 511] Khai báo biến không gán lại bằng const: now = tạo hàm với tham số (không có); mỗi lần gọi trả về gọi Date.now()
  const now=()=>Date.now();
// [VI dòng gốc 512] Khai báo biến không gán lại bằng const: integer = tạo hàm với tham số x; mỗi lần gọi trả về nếu Number.isSafeInteger(Number(x))&&Number(x)>=0 thì lấy Number(x), ngược lại lấy null
  const integer=x=>Number.isSafeInteger(Number(x))&&Number(x)>=0?Number(x):null;
// [VI dòng gốc 513] Khai báo biến không gán lại bằng const: norm = tạo hàm với tham số x; mỗi lần gọi trả về gọi String(x??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'') .replace(/[đĐ]/g,'d').toLowerCase().replace(/\s+/g,' ').trim()
  const norm=x=>String(x??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'')
// [VI dòng gốc 514] Tiếp tục hàm norm; thành phần cú pháp bắt đầu bằng .. Đọc cùng dòng mở phía trên: .replace(/[đĐ]/g,'d').toLowerCase().replace(/\s+/g,' ').trim();
    .replace(/[đĐ]/g,'d').toLowerCase().replace(/\s+/g,' ').trim();
// [VI dòng gốc 515] Khai báo biến không gán lại bằng const: actor = tạo hàm với tham số (không có); mỗi lần gọi trả về gọi String(_Ba?._rJ?._O$?.ins?.actorId??'') để chuyển sang chuỗi
  const actor=()=>String(_Ba?._rJ?._O$?.ins?.actorId??'');
// [VI dòng gốc 516] Khai báo biến không gán lại bằng const: rune = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc _Ba?._QV?._Bri?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  const rune=()=>_Ba?._QV?._Bri?.ins;
// [VI dòng gốc 517] Khai báo biến không gán lại bằng const: rpc = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc _Ba?._QV?._Wri?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  const rpc=()=>_Ba?._QV?._Wri?.ins;
// [VI dòng gốc 518] Khai báo biến không gán lại bằng const: cfg = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc _ft?._NY?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  const cfg=()=>_ft?._NY?.ins;
// [VI dòng gốc 519] Khai báo biến không gán lại bằng const: bag = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc _Ba?._Ic?._aQ?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  const bag=()=>_Ba?._Ic?._aQ?.ins;
// [VI dòng gốc 520] Khai báo biến không gán lại bằng const: quest = tạo hàm với tham số (không có); mỗi lần gọi trả về Q.task?.() hoặc dùng vế phải khi vế trái là null/undefined: null
  const quest=()=>Q.task?.()??null;
// [VI dòng gốc 521] Khai báo biến không gán lại bằng const: common = tạo hàm với tham số (không có); mỗi lần gọi trả về _Ba?._$a?.SceneUtil?.isCommonScene===true && _Ba?._$a?._yo?.ins?.isInMission!==true và chỉ đánh giá vế phải khi vế trái truthy: _Ba?._$a?._yo?.ins?.isInArena!==true
  const common=()=>_Ba?._$a?.SceneUtil?.isCommonScene===true &&
// [VI dòng gốc 522] Tiếp tục hàm common; thành phần cú pháp bắt đầu bằng name. Đọc cùng dòng mở phía trên: _Ba?._$a?._yo?.ins?.isInMission!==true && _Ba?._$a?._yo?.ins?.isInArena!==true;
    _Ba?._$a?._yo?.ins?.isInMission!==true && _Ba?._$a?._yo?.ins?.isInArena!==true;
// [VI dòng gốc 523] Chú thích gốc của tác giả; không được thực thi. Nội dung: Trả lịch sử đã ghi để kiểm tra các chuyển trạng thái trước đó.
  // Trả lịch sử đã ghi để kiểm tra các chuyển trạng thái trước đó.
// [VI dòng gốc 524] Định nghĩa hàm history; tham số: kind, data
  function history(kind,data){
// [VI dòng gốc 525] gọi S.history.push({at:new Date().toISOString(),kind,data}) để thêm phần tử vào cuối mảng
    S.history.push({at:new Date().toISOString(),kind,data});
// [VI dòng gốc 526] Kiểm tra S.history.length>C.maxHistory: đúng thì chạy nhánh sau if. | gọi S.history.shift()
    if(S.history.length>C.maxHistory)S.history.shift();
// [VI dòng gốc 527] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 528] Định nghĩa hàm match; tham số: q
  function match(q){
// [VI dòng gốc 529] Kiểm tra !q||Number(q.state)===2||!/^m\d+$/.test(String(q.id)): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: null.
    if(!q||Number(q.state)===2||!/^m\d+$/.test(String(q.id)))return null;
// [VI dòng gốc 530] Khai báo biến không gán lại bằng const: name = gọi norm(q.name)
    const name=norm(q.name);
// [VI dòng gốc 531] Kiểm tra !/\bphu van\b/.test(name)||!/(?:tang|nang) cap/.test(name): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: null.
    if(!/\bphu van\b/.test(name)||!/(?:tang|nang) cap/.test(name))return null;
// [VI dòng gốc 532] Kiểm tra /(?:phan giai|kham|thay the|che tao|thu thap|tang sao|cuong hoa trang bi|phu van cam dia)/.test(name): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: null.
    if(/(?:phan giai|kham|thay the|che tao|thu thap|tang sao|cuong hoa trang bi|phu van cam dia)/.test(name))return null;
// [VI dòng gốc 533] Khai báo biến không gán lại bằng const: times = gọi /\b(\d{1,3})\s*lan\b/.exec(name)
    const times=/\b(\d{1,3})\s*lan\b/.exec(name);
// [VI dòng gốc 534] Kiểm tra !times: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: null.
    if(!times)return null;
// [VI dòng gốc 535] Khai báo biến không gán lại bằng const: target = gọi integer(times[1])
    const target=integer(times[1]);
// [VI dòng gốc 536] Kiểm tra target===null||target<=0||target>100: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: null.
    if(target===null||target<=0||target>100)return null;
// [VI dòng gốc 537] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm target, actionId, name.
    return {target,actionId:integer(q.actionId),name};
// [VI dòng gốc 538] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 539] Định nghĩa hàm materialCount; tham số: id
  function materialCount(id){
// [VI dòng gốc 540] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | Kết thúc hàm hiện tại và trả về: nếu id===91740001 thì lấy integer(rune()?.exp), ngược lại lấy integer(bag()?.getItemCountById?.(id)).
    try{return id===91740001?integer(rune()?.exp):integer(bag()?.getItemCountById?.(id));}
// [VI dòng gốc 541] Nhận lỗi bằng _ và chạy phần xử lý lỗi. | Kết thúc hàm hiện tại và trả về: null.
    catch(_){return null;}
// [VI dòng gốc 542] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 543] Định nghĩa hàm baseData; tham số: q=quest()
  function baseData(q=quest()){
// [VI dòng gốc 544] Khai báo biến không gán lại bằng const: rule = gọi match(q); r = gọi rune(); c = gọi cfg(); fn = đọc rpc()?.runeRefine nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const rule=match(q),r=rune(),c=cfg(),fn=rpc()?.runeRefine;
// [VI dòng gốc 545] Khai báo biến không gán lại bằng const: tab = đọc r?.tab nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const tab=r?.tab;
// [VI dòng gốc 546] Kiểm tra !rule||!tab||typeof tab!=='object'||!c||typeof fn!=='function': đúng thì chạy nhánh sau if.
    if(!rule||!tab||typeof tab!=='object'||!c||typeof fn!=='function'){
// [VI dòng gốc 547] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm ready, reason, rule, questId.
      return {ready:false,reason:!rule?'Current quest not explicit rune-refine-times objective':
// [VI dòng gốc 548] Thuộc tính rule: dùng biến cùng tên | Thuộc tính questId: đọc q?.id nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
        !tab?'Server rune model not loaded':'Missing native client method/config',rule,questId:q?.id};
// [VI dòng gốc 549] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 550] Khai báo biến không gán lại bằng const: options = tạo mảng gồm 0 vị trí: []
    const options=[];
// [VI dòng gốc 551] Lặp for: khởi tạo let pos=1; tiếp tục khi pos<=11; sau mỗi vòng pos++. | Khai báo biến có thể gán lại bằng let: pos = 1
    for(let pos=1;pos<=11;pos++){
// [VI dòng gốc 552] Khai báo biến không gán lại bằng const: runeId = gọi integer(tab[pos])
      const runeId=integer(tab[pos]);
// [VI dòng gốc 553] Kiểm tra !runeId||runeId<=0: đúng thì chạy nhánh sau if. | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
      if(!runeId||runeId<=0)continue;
// [VI dòng gốc 554] Khai báo biến có thể gán lại bằng let: old = null; next = null
      let old=null,next=null;
// [VI dòng gốc 555] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | gán old bằng c.getCfgById?.(runeId) | gán next bằng c.getCfgById?.(runeId+1) | Nhận lỗi bằng _ và chạy phần xử lý lỗi.
      try{old=c.getCfgById?.(runeId);next=c.getCfgById?.(runeId+1);}catch(_){window.KVPV_V1?.diagnostics?.record(_);}
// [VI dòng gốc 556] Kiểm tra !Array.isArray(old)||!Array.isArray(next)||!Array.isArray(old[1]): đúng thì chạy nhánh sau if. | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
      if(!Array.isArray(old)||!Array.isArray(next)||!Array.isArray(old[1]))continue;
// [VI dòng gốc 557] Khai báo biến không gán lại bằng const: itemId = gọi integer(old[1][0]); need = gọi integer(old[1][1])
      const itemId=integer(old[1][0]),need=integer(old[1][1]);
// [VI dòng gốc 558] Kiểm tra !itemId||need===null||need<1||need> (itemId===91740001?C.maxRuneExpPerUpgrade:C.maxItemPerUpgrade): đúng thì chạy nhánh sau if.
      if(!itemId||need===null||need<1||need>
// [VI dòng gốc 559] Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
         (itemId===91740001?C.maxRuneExpPerUpgrade:C.maxItemPerUpgrade))continue;
// [VI dòng gốc 560] Kiểm tra itemId!==91740001 && itemId<10000: đúng thì chạy nhánh sau if. | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
      if(itemId!==91740001 && itemId<10000)continue; // Unknown currency IDs are never spent
// [VI dòng gốc 561] Khai báo biến không gán lại bằng const: have = gọi materialCount(itemId)
      const have=materialCount(itemId);
// [VI dòng gốc 562] Kiểm tra have===null||have<need: đúng thì chạy nhánh sau if. | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
      if(have===null||have<need)continue;
// [VI dòng gốc 563] Khai báo biến không gán lại bằng const: reborn = gọi integer(old[5])
      const reborn=integer(old[5]);
// [VI dòng gốc 564] Kiểm tra reborn!==null&&reborn>0: đúng thì chạy nhánh sau if.
      if(reborn!==null&&reborn>0){
// [VI dòng gốc 565] Khai báo biến không gán lại bằng const: current = gọi integer(_Ba?._rJ?._O$?.ins?.earLv?.())
        const current=integer(_Ba?._rJ?._O$?.ins?.earLv?.());
// [VI dòng gốc 566] Kiểm tra current===null||current<reborn: đúng thì chạy nhánh sau if. | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
        if(current===null||current<reborn)continue;
// [VI dòng gốc 567] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
      }
// [VI dòng gốc 568] gọi options.push({pos,runeId,itemId,need,have,reborn, isExp:itemId===91740001}) để thêm phần tử vào cuối mảng
      options.push({pos,runeId,itemId,need,have,reborn,
// [VI dòng gốc 569] Thuộc tính isExp: tính biểu thức itemId===91740001
        isExp:itemId===91740001});
// [VI dòng gốc 570] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 571] gọi options.sort((a,b)=>{ if(a.isExp!==b.isExp)return a.isExp?-1:1; return a.need-b.need||a.runeId-b.runeId||a.pos-b.pos; }) để sắp xếp mảng tại chỗ
    options.sort((a,b)=>{
// [VI dòng gốc 572] Kiểm tra a.isExp!==b.isExp: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: nếu a.isExp thì lấy -1, ngược lại lấy 1.
      if(a.isExp!==b.isExp)return a.isExp?-1:1;
// [VI dòng gốc 573] Kết thúc hàm hiện tại và trả về: a.need-b.need||a.runeId-b.runeId hoặc dùng vế phải khi vế trái falsy: a.pos-b.pos.
      return a.need-b.need||a.runeId-b.runeId||a.pos-b.pos;
// [VI dòng gốc 574] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    });
// [VI dòng gốc 575] Khai báo biến không gán lại bằng const: pick = options[0] hoặc dùng vế phải khi vế trái falsy: null
    const pick=options[0]||null;
// [VI dòng gốc 576] Khai báo biến không gán lại bằng const: runeSig = gọi JSON.stringify(Array.from({length:11},(_,i)=>integer(tab[i+1])||0)) để chuyển giá trị thành chuỗi JSON
    const runeSig=JSON.stringify(Array.from({length:11},(_,i)=>integer(tab[i+1])||0));
// [VI dòng gốc 577] Khai báo biến không gán lại bằng const: serverSig = gọi JSON.stringify([String(q.id),q.state,q.progress??null,runeSig]) để chuyển giá trị thành chuỗi JSON
    const serverSig=JSON.stringify([String(q.id),q.state,q.progress??null,runeSig]);
// [VI dòng gốc 578] Khai báo biến không gán lại bằng const: sig = gọi JSON.stringify([serverSig,pick?.pos,pick?.runeId,pick?.itemId,pick?.have]) để chuyển giá trị thành chuỗi JSON
    const sig=JSON.stringify([serverSig,pick?.pos,pick?.runeId,pick?.itemId,pick?.have]);
// [VI dòng gốc 579] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm ready, reason, questId, rule, selected, options, serverSig, signature, runeSig, progressSig.
    return {ready:!!pick,reason:pick?'Eligible native refinement':'No equipped upgradeable rune with owned material',
// [VI dòng gốc 580] Thuộc tính questId: gọi String(q.id) để chuyển sang chuỗi | Thuộc tính rule: dùng biến cùng tên | Thuộc tính selected: pick | Thuộc tính options: đọc options.length
      questId:String(q.id),rule,selected:pick,options:options.length,serverSig,signature:sig,
// [VI dòng gốc 581] Thuộc tính runeSig: dùng biến cùng tên | Thuộc tính progressSig: gọi JSON.stringify(q.progress??null) để chuyển giá trị thành chuỗi JSON
      runeSig,progressSig:JSON.stringify(q.progress??null)};
// [VI dòng gốc 582] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 583] Định nghĩa hàm ack; tham số: row, q=quest()
  function ack(row,q=quest()){
// [VI dòng gốc 584] Kiểm tra !q||String(q.id)!==row.questId||Number(q.state)===2: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: true.
    if(!q||String(q.id)!==row.questId||Number(q.state)===2)return true;
// [VI dòng gốc 585] Khai báo biến không gán lại bằng const: current = gọi baseData(q)
    const current=baseData(q);
// [VI dòng gốc 586] Kết thúc hàm hiện tại và trả về: !!current.runeSig&&current.runeSig!==row.runeSig hoặc dùng vế phải khi vế trái falsy: JSON.stringify(q.progress??null)!==row.progressSig.
    return (!!current.runeSig&&current.runeSig!==row.runeSig) ||
// [VI dòng gốc 587] gọi JSON.stringify(q.progress??null) để chuyển giá trị thành chuỗi JSON
      JSON.stringify(q.progress??null)!==row.progressSig;
// [VI dòng gốc 588] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 589] Chú thích gốc của tác giả; không được thực thi. Nội dung: Đăng ký theo dõi nguồn trạng thái hoặc thông báo mà module cần.
  // Đăng ký theo dõi nguồn trạng thái hoặc thông báo mà module cần.
// [VI dòng gốc 590] Định nghĩa hàm watch; tham số: không có
  function watch(){
// [VI dòng gốc 591] Khai báo biến không gán lại bằng const: q = gọi quest()
    const q=quest();
// [VI dòng gốc 592] Duyệt từng giá trị trong ['pending','blocked'] bằng const key. | Khai báo biến không gán lại bằng const: key (chưa gán giá trị)
    for(const key of ['pending','blocked']){
// [VI dòng gốc 593] Khai báo biến không gán lại bằng const: p = đọc S[key] | Kiểm tra !p: đúng thì chạy nhánh sau if. | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
      const p=S[key];if(!p)continue;
// [VI dòng gốc 594] Kiểm tra ack(p,q): đúng thì chạy nhánh sau if, sai thì chạy nhánh else.
      if(ack(p,q)){
// [VI dòng gốc 595] Kiểm tra key==='pending': đúng thì chạy nhánh sau if. | tăng S.success một đơn vị sau khi lấy giá trị
        if(key==='pending')S.success++;
// [VI dòng gốc 596] gọi history(key==='pending'?'server-progress':'unblocked', {id:p.questId,position:p.pos,previousRune:p.runeId})
        history(key==='pending'?'server-progress':'unblocked',
// [VI dòng gốc 597] Thuộc tính id: đọc p.questId | Thuộc tính position: đọc p.pos | Thuộc tính previousRune: đọc p.runeId
          {id:p.questId,position:p.pos,previousRune:p.runeId});
// [VI dòng gốc 598] gán S[key] bằng null
        S[key]=null;
// [VI dòng gốc 599] Kiểm tra key==='pending'&&now()-p.at>C.ackTimeoutMs: đúng thì chạy nhánh sau if.
      }else if(key==='pending'&&now()-p.at>C.ackTimeoutMs){
// [VI dòng gốc 600] gán S.blocked bằng p | gán S.pending bằng null
        S.blocked=p;S.pending=null;
// [VI dòng gốc 601] gọi console.warn('[KVPV RUNES930] Refinement did not receive server state ACK; locked for this state', p.questId)
        console.warn('[KVPV RUNES930] Refinement did not receive server state ACK; locked for this state',p.questId);
// [VI dòng gốc 602] gọi history('ack-timeout', {questId:p.questId,position:p.pos})
        history('ack-timeout',{questId:p.questId,position:p.pos});
// [VI dòng gốc 603] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
      }
// [VI dòng gốc 604] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 605] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 606] Chú thích gốc của tác giả; không được thực thi. Nội dung: Tính phương án từ dữ liệu hiện tại để kiểm tra trước khi thực thi.
  // Tính phương án từ dữ liệu hiện tại để kiểm tra trước khi thực thi.
// [VI dòng gốc 607] Định nghĩa hàm preview; tham số: q=quest()
  function preview(q=quest()){
// [VI dòng gốc 608] Khai báo biến không gán lại bằng const: p = gọi baseData(q); used = S.attempts.get(String(q?.id)) hoặc dùng vế phải khi vế trái falsy: 0
    const p=baseData(q),used=S.attempts.get(String(q?.id))||0;
// [VI dòng gốc 609] Khai báo biến không gán lại bằng const: waiting = tính biểu thức now()-S.lastSendAt<C.minGapMs
    const waiting=now()-S.lastSendAt<C.minGapMs;
// [VI dòng gốc 610] Khai báo biến không gán lại bằng const: ready = C.enabled&&C.autoRefine&&actor()===MAIN&&p.ready&&!S.pending&&!S.blocked&&!waiting&& used<C.maxAttemptsPerQuest và chỉ đánh giá vế phải khi vế trái truthy: !C.requireCommonScene||common()
    const ready=C.enabled&&C.autoRefine&&actor()===MAIN&&p.ready&&!S.pending&&!S.blocked&&!waiting&&
// [VI dòng gốc 611] gọi common()
      used<C.maxAttemptsPerQuest&&(!C.requireCommonScene||common());
// [VI dòng gốc 612] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm các thuộc tính của p, ready, used, pending, blocked, reason.
    return {...p,ready,used,pending:!!S.pending,blocked:!!S.blocked,
// [VI dòng gốc 613] Thuộc tính reason: nếu actor()!==MAIN thì lấy 'MAIN only', ngược lại lấy !C.enabled||!C.autoRefine?'Executor disabled': S.pending?'Awaiting server model ACK':S.blocked?'Locked: no ACK for unchanged server state': C.requireCommonScene&&!common()?'Not in …
      reason:actor()!==MAIN?'MAIN only':!C.enabled||!C.autoRefine?'Executor disabled':
// [VI dòng gốc 614] Tiếp tục hàm preview; thành phần cú pháp bắt đầu bằng name. Đọc cùng dòng mở phía trên: S.pending?'Awaiting server model ACK':S.blocked?'Locked: no ACK for unchanged server state':
      S.pending?'Awaiting server model ACK':S.blocked?'Locked: no ACK for unchanged server state':
// [VI dòng gốc 615] gọi common()
      C.requireCommonScene&&!common()?'Not in safe common scene':
// [VI dòng gốc 616] Tiếp tục hàm preview; thành phần cú pháp bắt đầu bằng name. Đọc cùng dòng mở phía trên: waiting?'Native command minimum gap':used>=C.maxAttemptsPerQuest?'Quest safety limit':p.reason};
      waiting?'Native command minimum gap':used>=C.maxAttemptsPerQuest?'Quest safety limit':p.reason};
// [VI dòng gốc 617] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 618] Chú thích gốc của tác giả; không được thực thi. Nội dung: Đọc điều kiện và tiến độ hiện tại, phục vụ quyết định có nhận tác vụ hay không.
  // Đọc điều kiện và tiến độ hiện tại, phục vụ quyết định có nhận tác vụ hay không.
// [VI dòng gốc 619] Định nghĩa hàm probe; tham số: q | Khai báo biến không gán lại bằng const: p = gọi preview(q) | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm ready, signature.
  function probe(q){const p=preview(q);return {ready:p.ready,signature:p.signature||'no-rune-state'};}
// [VI dòng gốc 620] Định nghĩa hàm run; tham số: q, snap
  function run(q,snap){
// [VI dòng gốc 621] Khai báo biến không gán lại bằng const: current = gọi quest(); p = gọi preview(current)
    const current=quest(),p=preview(current);
// [VI dòng gốc 622] Kiểm tra String(current?.id)!==String(q?.id)||Number(current?.state)===2||!p.ready|| p.signature!==snap.signature||!p.selected||typeof rpc()?.runeRefine!=='function': đúng thì chạy nhánh sau if.
    if(String(current?.id)!==String(q?.id)||Number(current?.state)===2||!p.ready||
// [VI dòng gốc 623] gọi rpc()
       p.signature!==snap.signature||!p.selected||typeof rpc()?.runeRefine!=='function')
// [VI dòng gốc 624] Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('Rune quest/model changed since shared queue probe')
      throw Error('Rune quest/model changed since shared queue probe');
// [VI dòng gốc 625] Khai báo biến không gán lại bằng const: row = tạo đối tượng gồm questId, pos, runeId, runeSig, progressSig, serverSig, at
    const row={questId:String(q.id),pos:p.selected.pos,runeId:p.selected.runeId,
// [VI dòng gốc 626] Thuộc tính runeSig: đọc p.runeSig | Thuộc tính progressSig: đọc p.progressSig | Thuộc tính serverSig: đọc p.serverSig | Thuộc tính at: gọi now()
      runeSig:p.runeSig,progressSig:p.progressSig,serverSig:p.serverSig,at:now()};
// [VI dòng gốc 627] gán S.pending bằng row | gán S.lastSendAt bằng row.at | gọi S.attempts.set(row.questId, p.used+1)
    S.pending=row;S.lastSendAt=row.at;S.attempts.set(row.questId,p.used+1);
// [VI dòng gốc 628] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | gọi rpc().runeRefine([row.pos]) | tăng S.sent một đơn vị sau khi lấy giá trị | gọi history('sent', {questId:row.questId,pos:row.pos, itemId:p.selected.itemId,need:p.selected.need})
    try{rpc().runeRefine([row.pos]);S.sent++;history('sent',{questId:row.questId,pos:row.pos,
// [VI dòng gốc 629] Thuộc tính itemId: đọc p.selected.itemId | Thuộc tính need: đọc p.selected.need
      itemId:p.selected.itemId,need:p.selected.need});}
// [VI dòng gốc 630] Nhận lỗi bằng e và chạy phần xử lý lỗi. | tăng S.errors một đơn vị sau khi lấy giá trị | gán S.lastError bằng String(e) | gán S.pending bằng null
    catch(e){S.errors++;S.lastError=String(e);S.pending=null;S.blocked=row;throw e;}
// [VI dòng gốc 631] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 632] Chú thích gốc của tác giả; không được thực thi. Nội dung: Trả trạng thái hiện tại để kiểm tra; ý nghĩa từng bộ đếm thuộc phạm vi module này.
  // Trả trạng thái hiện tại để kiểm tra; ý nghĩa từng bộ đếm thuộc phạm vi module này.
// [VI dòng gốc 633] Định nghĩa hàm status; tham số: không có. Mục đích: trả trạng thái để kiểm tra | Khai báo biến không gán lại bằng const: p = gọi preview() | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm version, running, actor, registered, questId, matched, ready, reason, options, selected, used, pending, blocked, sent, serverConfirmed, errors, lastError, towerMode.
  function status(){const p=preview();return {version:'9.3.0',running:S.running,
// [VI dòng gốc 634] Thuộc tính actor: gọi actor() để ID nhân vật sở hữu phiên này | Thuộc tính registered: đọc S.registered | Thuộc tính questId: p.questId hoặc dùng vế phải khi vế trái là null/undefined: null
    actor:actor(),registered:S.registered,questId:p.questId??null,
// [VI dòng gốc 635] Thuộc tính matched: đảo giá trị đúng/sai của !p.rule | Thuộc tính ready: đọc p.ready | Thuộc tính reason: đọc p.reason
    matched:!!p.rule,ready:p.ready,reason:p.reason,
// [VI dòng gốc 636] Thuộc tính options: p.options hoặc dùng vế phải khi vế trái là null/undefined: 0 | Thuộc tính selected: p.selected hoặc dùng vế phải khi vế trái falsy: null | Thuộc tính used: p.used hoặc dùng vế phải khi vế trái falsy: 0
    options:p.options??0,selected:p.selected||null,used:p.used||0,
// [VI dòng gốc 637] Thuộc tính pending: đảo giá trị đúng/sai của !S.pending | Thuộc tính blocked: đảo giá trị đúng/sai của !S.blocked
    pending:!!S.pending,blocked:!!S.blocked,
// [VI dòng gốc 638] Thuộc tính sent: đọc S.sent | Thuộc tính serverConfirmed: đọc S.success | Thuộc tính errors: đọc S.errors | Thuộc tính lastError: đọc S.lastError
    sent:S.sent,serverConfirmed:S.success,errors:S.errors,lastError:S.lastError,
// [VI dòng gốc 639] Thuộc tính towerMode: "manual-only"
    towerMode:'manual-only'};}
// [VI dòng gốc 640] Chú thích gốc của tác giả; không được thực thi. Nội dung: Bật bộ điều khiển và lịch kiểm tra của module; trả trạng thái sau khi khởi động.
  // Bật bộ điều khiển và lịch kiểm tra của module; trả trạng thái sau khi khởi động.
// [VI dòng gốc 641] Định nghĩa hàm start; tham số: không có. Mục đích: khởi động bộ điều khiển
  function start(){
// [VI dòng gốc 642] gán C.enabled bằng true
    C.enabled=true;
// [VI dòng gốc 643] Kiểm tra !S.registered: đúng thì chạy nhánh sau if.
    if(!S.registered){
// [VI dòng gốc 644] gọi F.registerRecipe({type:'rune-refine-times',verified:true,spend:'materials', match:q=>!!match(q),probe,run})
      F.registerRecipe({type:'rune-refine-times',verified:true,spend:'materials',
// [VI dòng gốc 645] Thuộc tính match: tạo hàm với tham số q; mỗi lần gọi trả về đảo giá trị đúng/sai của !match(q) | Thuộc tính probe: dùng biến cùng tên | Thuộc tính run: dùng biến cùng tên
        match:q=>!!match(q),probe,run});
// [VI dòng gốc 646] gán S.registered bằng true
      S.registered=true;
// [VI dòng gốc 647] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 648] Kiểm tra F.config: đúng thì chạy nhánh sau if. | gán F.config.allowMaterialRecipes bằng true
    if(F.config)F.config.allowMaterialRecipes=true;
// [VI dòng gốc 649] Kiểm tra S.timer: đúng thì chạy nhánh sau if. | Kiểm tra typeof __KVPV29!=='undefined': đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gọi __KVPV29.cancel(S.timer) | gọi clearInterval(S.timer) để hủy tác vụ lặp
    if(S.timer){if(typeof __KVPV29!=='undefined')__KVPV29.cancel(S.timer);else clearInterval(S.timer);}
// [VI dòng gốc 650] Khai báo biến không gán lại bằng const: callback = tạo hàm với tham số (không có) | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | Kiểm tra actor()!==MAIN: đúng thì chạy nhánh sau if. | gọi stop() để dừng bộ điều khiển và dọn tài nguyên
    const callback=()=>{try{if(actor()!==MAIN){stop();return;}watch();}
// [VI dòng gốc 651] Nhận lỗi bằng e và chạy phần xử lý lỗi. | tăng S.errors một đơn vị sau khi lấy giá trị | gán S.lastError bằng String(e)
      catch(e){S.errors++;S.lastError=String(e);}};
// [VI dòng gốc 652] gán S.timer bằng typeof __KVPV29!=='undefined'&&typeof __KVPV29.every==='function'? __KVPV29.every(callback,C.pollMs):setInterval(callback,C.pollMs)
    S.timer=typeof __KVPV29!=='undefined'&&typeof __KVPV29.every==='function'?
// [VI dòng gốc 653] gọi __KVPV29.every(callback, C.pollMs) để kiểm tra mọi phần tử đều thỏa điều kiện | gọi setInterval(callback, C.pollMs) để đăng ký tác vụ lặp theo khoảng thời gian
      __KVPV29.every(callback,C.pollMs):setInterval(callback,C.pollMs);
// [VI dòng gốc 654] gán S.running bằng true | gọi callback() | Kết thúc hàm hiện tại và trả về: gọi status() để trả trạng thái để kiểm tra.
    S.running=true;callback();return status();
// [VI dòng gốc 655] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 656] Chú thích gốc của tác giả; không được thực thi. Nội dung: Dừng bộ điều khiển, hủy lịch và giải phóng tài nguyên do module này sở hữu.
  // Dừng bộ điều khiển, hủy lịch và giải phóng tài nguyên do module này sở hữu.
// [VI dòng gốc 657] Định nghĩa hàm stop; tham số: không có. Mục đích: dừng bộ điều khiển và dọn tài nguyên | gán C.enabled bằng false | gán S.running bằng false
  function stop(){C.enabled=false;S.running=false;
// [VI dòng gốc 658] Kiểm tra S.timer: đúng thì chạy nhánh sau if. | Kiểm tra typeof __KVPV29!=='undefined'&&__KVPV29.cancel: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gọi __KVPV29.cancel(S.timer)
    if(S.timer){if(typeof __KVPV29!=='undefined'&&__KVPV29.cancel)__KVPV29.cancel(S.timer);
// [VI dòng gốc 659] gọi clearInterval(S.timer) để hủy tác vụ lặp | gán S.timer bằng null | Kết thúc hàm hiện tại và trả về: gọi status() để trả trạng thái để kiểm tra.
      else clearInterval(S.timer);S.timer=null;}return status();}
// [VI dòng gốc 660] Khai báo biến không gán lại bằng const: api = tạo đối tượng gồm installed, version, config, start, stop, status, preview, history, report
  const api={installed:true,version:'9.3.0',config:C,start,stop,status,preview,
// [VI dòng gốc 661] Khai báo biến không gán lại bằng const: x = gọi status() để trả trạng thái để kiểm tra | gọi console.table([x]) | Kết thúc hàm hiện tại và trả về: x.
    history:()=>S.history.slice(),report(){const x=status();console.table([x]);return x;}};
// [VI dòng gốc 662] gán W.KVPV_RUNES930 bằng api
  W.KVPV_RUNES930=api;
// [VI dòng gốc 663] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | gọi start() để khởi động bộ điều khiển | Nhận lỗi bằng e và chạy phần xử lý lỗi. | tăng S.errors một đơn vị sau khi lấy giá trị
  try{start();}catch(e){S.errors++;S.lastError=String(e);
// [VI dòng gốc 664] gọi console.warn('[KVPV RUNES930] Could not register executor', e)
    console.warn('[KVPV RUNES930] Could not register executor',e);}
// [VI dòng gốc 665] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: })();
})();
// [VI dòng gốc 666] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  });
// [VI dòng gốc 667] gọi install("KVPV_RUNE_INLAY931", ()=>{ (() => { 'use strict'; const W=window, VERSION='9.3.1', MAIN=String(window.__KVPV_OWN_ACTOR_…)
  install("KVPV_RUNE_INLAY931",()=>{
// [VI dòng gốc 668] chạy ngay hàm bao để tạo phạm vi và khởi tạo phần chức năng bên trong
(() => {
// [VI dòng gốc 669] "use strict"
  'use strict';
// [VI dòng gốc 670] Khai báo biến không gán lại bằng const: W = window; VERSION = "9.3.1"; MAIN = gọi String(window.__KVPV_OWN_ACTOR_ID||'') để chuyển sang chuỗi
  const W=window, VERSION='9.3.1', MAIN=String(window.__KVPV_OWN_ACTOR_ID||'');
// [VI dòng gốc 671] Kiểm tra W.KVPV_RUNE_INLAY931?.installed: đúng thì chạy nhánh sau if. | gọi W.KVPV_RUNE_INLAY931.start() để khởi động bộ điều khiển | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  if(W.KVPV_RUNE_INLAY931?.installed){W.KVPV_RUNE_INLAY931.start();return;}
// [VI dòng gốc 672] Khai báo biến không gán lại bằng const: F = đọc W.KVPV_V876; Q = đọc W.KVPV_V866; D = đọc W.KVPV_DAILY
  const F=W.KVPV_V876,Q=W.KVPV_V866,D=W.KVPV_DAILY;
// [VI dòng gốc 673] Kiểm tra !F?.registerRecipe||!Q?.task||!D?.quickState|| typeof _Ba==='undefined'||typeof _ft==='undefined'||typeof _et==='undefined': đúng thì chạy nhánh sau if.
  if(!F?.registerRecipe||!Q?.task||!D?.quickState||
// [VI dòng gốc 674] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng typeof. Đọc cùng dòng mở phía trên: typeof _Ba==='undefined'||typeof _ft==='undefined'||typeof _et==='undefined'){
     typeof _Ba==='undefined'||typeof _ft==='undefined'||typeof _et==='undefined'){
// [VI dòng gốc 675] gọi console.warn('[KVPV INLAY931] Need V9.3.0 MAIN FULL + game-frame; no RPC sent')
    console.warn('[KVPV INLAY931] Need V9.3.0 MAIN FULL + game-frame; no RPC sent');
// [VI dòng gốc 676] Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    return;
// [VI dòng gốc 677] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 678] Khai báo biến không gán lại bằng const: C = tạo đối tượng gồm enabled, autoInlay, requireCommonScene, pollMs, minGapMs, ackTimeoutMs, maxRequestsPerQuest, slots, maxHistory
  const C={enabled:true,autoInlay:true,requireCommonScene:true,
// [VI dòng gốc 679] Thuộc tính pollMs: 750 | Thuộc tính minGapMs: 1600 | Thuộc tính ackTimeoutMs: 30000 | Thuộc tính maxRequestsPerQuest: 8
    pollMs:750,minGapMs:1600,ackTimeoutMs:30000,maxRequestsPerQuest:8,
// [VI dòng gốc 680] Thuộc tính slots: tạo mảng gồm 8 vị trí: [1,2,3,4,5,6,7,8] | Thuộc tính maxHistory: 80
    slots:[1,2,3,4,5,6,7,8],maxHistory:80};
// [VI dòng gốc 681] Khai báo biến không gán lại bằng const: S = tạo đối tượng gồm installed, registered, running, timer, pending, blocked, lastSendAt, attempts, sent, acked, errors, lastError, history
  const S={installed:true,registered:false,running:false,timer:null,pending:null,blocked:null,
// [VI dòng gốc 682] Thuộc tính lastSendAt: 0 | Thuộc tính attempts: tạo đối tượng bằng Map() | Thuộc tính sent: 0 | Thuộc tính acked: 0
    lastSendAt:0,attempts:new Map(),sent:0,acked:0,errors:0,lastError:'',history:[]};
// [VI dòng gốc 683] Khai báo biến không gán lại bằng const: time = tạo hàm với tham số (không có); mỗi lần gọi trả về gọi Date.now()
  const time=()=>Date.now();
// [VI dòng gốc 684] Khai báo biến không gán lại bằng const: asInt = tạo hàm với tham số v | Khai báo biến không gán lại bằng const: n = gọi Number(v) để chuyển sang số | Kết thúc hàm hiện tại và trả về: nếu Number.isSafeInteger(n)&&n>=0 thì lấy n, ngược lại lấy null.
  const asInt=v=>{const n=Number(v);return Number.isSafeInteger(n)&&n>=0?n:null;};
// [VI dòng gốc 685] Khai báo biến không gán lại bằng const: norm = tạo hàm với tham số v; mỗi lần gọi trả về gọi String(v??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'') .replace(/[đĐ]/g,'d').toLowerCase().replace(/\s+/g,' ').trim()
  const norm=v=>String(v??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'')
// [VI dòng gốc 686] Tiếp tục hàm norm; thành phần cú pháp bắt đầu bằng .. Đọc cùng dòng mở phía trên: .replace(/[đĐ]/g,'d').toLowerCase().replace(/\s+/g,' ').trim();
    .replace(/[đĐ]/g,'d').toLowerCase().replace(/\s+/g,' ').trim();
// [VI dòng gốc 687] Khai báo biến không gán lại bằng const: actor = tạo hàm với tham số (không có); mỗi lần gọi trả về gọi String(_Ba?._rJ?._O$?.ins?.actorId??'') để chuyển sang chuỗi
  const actor=()=>String(_Ba?._rJ?._O$?.ins?.actorId??'');
// [VI dòng gốc 688] Khai báo biến không gán lại bằng const: model = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc _Ba?._QV?._Bri?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  const model=()=>_Ba?._QV?._Bri?.ins;
// [VI dòng gốc 689] Khai báo biến không gán lại bằng const: rpc = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc _Ba?._QV?._Wri?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  const rpc=()=>_Ba?._QV?._Wri?.ins;
// [VI dòng gốc 690] Khai báo biến không gán lại bằng const: bag = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc _Ba?._Ic?._aQ?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  const bag=()=>_Ba?._Ic?._aQ?.ins;
// [VI dòng gốc 691] Khai báo biến không gán lại bằng const: runeInfo = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc _ft?._CY?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  const runeInfo=()=>_ft?._CY?.ins;
// [VI dòng gốc 692] Khai báo biến không gán lại bằng const: quest = tạo hàm với tham số (không có); mỗi lần gọi trả về Q.task?.() hoặc dùng vế phải khi vế trái là null/undefined: null
  const quest=()=>Q.task?.()??null;
// [VI dòng gốc 693] Khai báo biến không gán lại bằng const: common = tạo hàm với tham số (không có); mỗi lần gọi trả về _Ba?._$a?.SceneUtil?.isCommonScene===true&& _Ba?._$a?._yo?.ins?.isInMission!==true và chỉ đánh giá vế phải khi vế trái truthy: _Ba?._$a?._yo?.ins?.isInArena!==true
  const common=()=>_Ba?._$a?.SceneUtil?.isCommonScene===true&&
// [VI dòng gốc 694] Tiếp tục hàm common; thành phần cú pháp bắt đầu bằng name. Đọc cùng dòng mở phía trên: _Ba?._$a?._yo?.ins?.isInMission!==true&&
    _Ba?._$a?._yo?.ins?.isInMission!==true&&
// [VI dòng gốc 695] Tiếp tục hàm common; thành phần cú pháp bắt đầu bằng name. Đọc cùng dòng mở phía trên: _Ba?._$a?._yo?.ins?.isInArena!==true;
    _Ba?._$a?._yo?.ins?.isInArena!==true;
// [VI dòng gốc 696] Chú thích gốc của tác giả; không được thực thi. Nội dung: Ghi thông tin chẩn đoán trong phạm vi module, giúp đối chiếu trạng thái và thời điểm.
  // Ghi thông tin chẩn đoán trong phạm vi module, giúp đối chiếu trạng thái và thời điểm.
// [VI dòng gốc 697] Định nghĩa hàm log; tham số: kind, data | gọi S.history.push({when:new Date().toISOString(),kind,...data}) để thêm phần tử vào cuối mảng
  function log(kind,data){S.history.push({when:new Date().toISOString(),kind,...data});
// [VI dòng gốc 698] Kiểm tra S.history.length>C.maxHistory: đúng thì chạy nhánh sau if. | gọi S.history.shift()
    if(S.history.length>C.maxHistory)S.history.shift();}
// [VI dòng gốc 699] Định nghĩa hàm match; tham số: q
  function match(q){
// [VI dòng gốc 700] Kiểm tra !q||q.id==null||Number(q.state)===2||!/^m\d+$/.test(String(q.id)): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: null.
    if(!q||q.id==null||Number(q.state)===2||!/^m\d+$/.test(String(q.id)))return null;
// [VI dòng gốc 701] Khai báo biến không gán lại bằng const: n = gọi norm(q.name)
    const n=norm(q.name);
// [VI dòng gốc 702] Kiểm tra !/\bphu van\b/.test(n)||!/\bkham\b/.test(n): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: null.
    if(!/\bphu van\b/.test(n)||!/\bkham\b/.test(n))return null;
// [VI dòng gốc 703] Kiểm tra /\b(?:thay|thao|phan giai|che tao|tang cap|nang cap|tang sao|ghep|doi|mua|doi tuong)\b/.test(n): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: null.
    if(/\b(?:thay|thao|phan giai|che tao|tang cap|nang cap|tang sao|ghep|doi|mua|doi tuong)\b/.test(n))return null;
// [VI dòng gốc 704] Chú thích gốc của tác giả; không được thực thi. Nội dung: Explicit N only. Refuse ambiguous goals, level targets and arbitrary rune actions.
    // Explicit N only. Refuse ambiguous goals, level targets and arbitrary rune actions.
// [VI dòng gốc 705] Khai báo biến không gán lại bằng const: m = gọi /(?:\bkham\s+(\d{1,2})\s+phu van\b)|(?:\bphu van\b.{0,30}?\b(\d{1,2})\s*(?:lan|vien|cai)\b)/.exec(n)
    const m=/(?:\bkham\s+(\d{1,2})\s+phu van\b)|(?:\bphu van\b.{0,30}?\b(\d{1,2})\s*(?:lan|vien|cai)\b)/.exec(n);
// [VI dòng gốc 706] Khai báo biến không gán lại bằng const: count = gọi asInt(m?.[1]??m?.[2])
    const count=asInt(m?.[1]??m?.[2]);
// [VI dòng gốc 707] Kiểm tra count===null||count<1||count>8: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: null.
    if(count===null||count<1||count>8)return null;
// [VI dòng gốc 708] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm count, name.
    return {count,name:n};
// [VI dòng gốc 709] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 710] Chú thích gốc của tác giả; không được thực thi. Nội dung: Gom dữ liệu quan sát thành một ảnh trạng thái phục vụ chẩn đoán hoặc lập kế hoạch.
  // Gom dữ liệu quan sát thành một ảnh trạng thái phục vụ chẩn đoán hoặc lập kế hoạch.
// [VI dòng gốc 711] Định nghĩa hàm snapshot; tham số: q=quest(). Mục đích: đọc ảnh chụp trạng thái hiện tại
  function snapshot(q=quest()){
// [VI dòng gốc 712] Khai báo biến không gán lại bằng const: rule = gọi match(q); m = gọi model(); rp = gọi rpc(); b = gọi bag(); ri = gọi runeInfo()
    const rule=match(q),m=model(),rp=rpc(),b=bag(),ri=runeInfo();
// [VI dòng gốc 713] Kiểm tra !rule: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm ready, reason, rule, questId.
    if(!rule)return {ready:false,reason:'Not explicit rune-inlay quest',rule:null,questId:q?.id??null};
// [VI dòng gốc 714] Kiểm tra !m||typeof m.tab!=='object'||!Array.isArray(m.tips)|| !b||typeof b.getItemsByBagType!=='function'||!ri|| typeof rp?.inlayRune!=='function'||typeof _et.getStnTypeById!=='function': đúng thì chạy nhánh sau if.
    if(!m||typeof m.tab!=='object'||!Array.isArray(m.tips)||
// [VI dòng gốc 715] Tiếp tục hàm snapshot; thành phần cú pháp bắt đầu bằng !/~. Đọc cùng dòng mở phía trên: !b||typeof b.getItemsByBagType!=='function'||!ri||
       !b||typeof b.getItemsByBagType!=='function'||!ri||
// [VI dòng gốc 716] Tiếp tục hàm snapshot; thành phần cú pháp bắt đầu bằng typeof. Đọc cùng dòng mở phía trên: typeof rp?.inlayRune!=='function'||typeof _et.getStnTypeById!=='function'){
       typeof rp?.inlayRune!=='function'||typeof _et.getStnTypeById!=='function'){
// [VI dòng gốc 717] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm ready, reason, rule, questId.
      return {ready:false,reason:'Game rune/bag model or native inlay API not loaded',rule,questId:q?.id};
// [VI dòng gốc 718] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 719] Khai báo biến không gán lại bằng const: finish = gọi asInt(_Ba?._IH?._ZY?.inst?.finishLv)
    const finish=asInt(_Ba?._IH?._ZY?.inst?.finishLv);
// [VI dòng gốc 720] Kiểm tra finish===null: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm ready, reason, rule, questId.
    if(finish===null)return {ready:false,reason:'Rune dungeon unlock level not loaded',rule,questId:q?.id};
// [VI dòng gốc 721] Khai báo biến không gán lại bằng const: occupied = gọi C.slots.map(pos=>[pos,asInt(m.tab[pos])||0]) để biến đổi từng phần tử
    const occupied=C.slots.map(pos=>[pos,asInt(m.tab[pos])||0]);
// [VI dòng gốc 722] Khai báo biến không gán lại bằng const: sigBase = gọi JSON.stringify([String(q.id),Number(q.state),q.progress??null,occupied]) để chuyển giá trị thành chuỗi JSON
    const sigBase=JSON.stringify([String(q.id),Number(q.state),q.progress??null,occupied]);
// [VI dòng gốc 723] Khai báo biến không gán lại bằng const: source = nếu Array.isArray(m.canIlyRunes?.(0)) thì lấy m.canIlyRunes(0), ngược lại lấy null
    const source=Array.isArray(m.canIlyRunes?.(0))?m.canIlyRunes(0):null;
// [VI dòng gốc 724] Kiểm tra !source: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm ready, reason, rule, questId, serverSig.
    if(!source)return {ready:false,reason:'Native bag rune list unavailable',rule,questId:q.id,
// [VI dòng gốc 725] Thuộc tính serverSig: sigBase
      serverSig:sigBase};
// [VI dòng gốc 726] Khai báo biến không gán lại bằng const: candidates = tạo mảng gồm 0 vị trí: []
    const candidates=[];
// [VI dòng gốc 727] Duyệt từng giá trị trong C.slots bằng const pos. | Khai báo biến không gán lại bằng const: pos (chưa gán giá trị)
    for(const pos of C.slots){
// [VI dòng gốc 728] Kiểm tra (asInt(m.tab[pos])||0)!==0: đúng thì chạy nhánh sau if. | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
      if((asInt(m.tab[pos])||0)!==0)continue;
// [VI dòng gốc 729] Khai báo biến không gán lại bằng const: unlock = đọc m.tips[pos-1]
      const unlock=m.tips[pos-1];
// [VI dòng gốc 730] Kiểm tra typeof unlock!=='string': đúng thì chạy nhánh sau if. | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
      if(typeof unlock!=='string')continue;
// [VI dòng gốc 731] Khai báo biến không gán lại bằng const: required = gọi asInt(unlock.split('#').pop())
      const required=asInt(unlock.split('#').pop());
// [VI dòng gốc 732] Kiểm tra required===null||finish<required: đúng thì chạy nhánh sau if. | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
      if(required===null||finish<required)continue;
// [VI dòng gốc 733] Duyệt từng giá trị trong source bằng const entry. | Khai báo biến không gán lại bằng const: entry (chưa gán giá trị)
      for(const entry of source){
// [VI dòng gốc 734] Kiểm tra !Array.isArray(entry): đúng thì chạy nhánh sau if. | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
        if(!Array.isArray(entry))continue;
// [VI dòng gốc 735] Khai báo biến không gán lại bằng const: id = gọi asInt(entry[0]); count = gọi asInt(entry[1]); uid = gọi asInt(entry[2])
        const id=asInt(entry[0]),count=asInt(entry[1]),uid=asInt(entry[2]);
// [VI dòng gốc 736] Kiểm tra !id||!count||!uid: đúng thì chạy nhánh sau if. | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
        if(!id||!count||!uid)continue;
// [VI dòng gốc 737] Khai báo biến có thể gán lại bằng let: subtype = null; cfg = null; quality = null; used = false
        let subtype=null,cfg=null,quality=null,used=false;
// [VI dòng gốc 738] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài.
        try{
// [VI dòng gốc 739] gán subtype bằng asInt(_et.getStnTypeById(id))
          subtype=asInt(_et.getStnTypeById(id));
// [VI dòng gốc 740] gán cfg bằng ri.getCfgById?.(Math.floor(id/10000)*10000)
          cfg=ri.getCfgById?.(Math.floor(id/10000)*10000);
// [VI dòng gốc 741] gán quality bằng asInt(_et.getQltyById?.(id))
          quality=asInt(_et.getQltyById?.(id));
// [VI dòng gốc 742] gán used bằng !!m.getIsHave?.(id,pos,0)
          used=!!m.getIsHave?.(id,pos,0);
// [VI dòng gốc 743] Nhận lỗi bằng _ và chạy phần xử lý lỗi. | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
        }catch(_){continue;}
// [VI dòng gốc 744] Kiểm tra subtype===null||subtype>=90||subtype===2||!Array.isArray(cfg)|| finish<(asInt(cfg[5])??Infinity)||used: đúng thì chạy nhánh sau if.
        if(subtype===null||subtype>=90||subtype===2||!Array.isArray(cfg)||
// [VI dòng gốc 745] Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
           finish<(asInt(cfg[5])??Infinity)||used)continue;
// [VI dòng gốc 746] Kiểm tra m.pttab&&m.pttab[subtype]: đúng thì chạy nhánh sau if. | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
        if(m.pttab&&m.pttab[subtype])continue;
// [VI dòng gốc 747] Chú thích gốc của tác giả; không được thực thi. Nội dung: Re-validate UID is still present in the server-backed bag snapshot.
        // Re-validate UID is still present in the server-backed bag snapshot.
// [VI dòng gốc 748] Khai báo biến không gán lại bằng const: live = gọi (b.getItemsByBagType(5)||[]).some(x=>Array.isArray(x)&& asInt(x[0])===id&&asInt(x[2])===uid&&Number(x[1])>0) để kiểm tra có ít nhất một phần tử thỏa điều kiện
        const live=(b.getItemsByBagType(5)||[]).some(x=>Array.isArray(x)&&
// [VI dòng gốc 749] gọi asInt(x[0]) | gọi asInt(x[2]) | gọi Number(x[1]) để chuyển sang số
          asInt(x[0])===id&&asInt(x[2])===uid&&Number(x[1])>0);
// [VI dòng gốc 750] Kiểm tra live: đúng thì chạy nhánh sau if. | gọi candidates.push({pos,id,uid,quality:quality||0,required}) để thêm phần tử vào cuối mảng
        if(live)candidates.push({pos,id,uid,quality:quality||0,required});
// [VI dòng gốc 751] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
      }
// [VI dòng gốc 752] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 753] gọi candidates.sort((a,b)=>b.quality-a.quality||b.id-a.id||a.pos-b.pos) để sắp xếp mảng tại chỗ
    candidates.sort((a,b)=>b.quality-a.quality||b.id-a.id||a.pos-b.pos);
// [VI dòng gốc 754] Khai báo biến không gán lại bằng const: chosen = candidates[0] hoặc dùng vế phải khi vế trái falsy: null
    const chosen=candidates[0]||null;
// [VI dòng gốc 755] Khai báo biến không gán lại bằng const: signature = gọi JSON.stringify([sigBase,chosen?.pos,chosen?.id,chosen?.uid]) để chuyển giá trị thành chuỗi JSON
    const signature=JSON.stringify([sigBase,chosen?.pos,chosen?.id,chosen?.uid]);
// [VI dòng gốc 756] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm ready, reason, rule, questId, chosen, candidates, serverSig, signature, progressSig.
    return {ready:!!chosen,reason:chosen?'Eligible empty slot with owned rune':'No empty unlocked slot and suitable owned rune',
// [VI dòng gốc 757] Thuộc tính rule: dùng biến cùng tên | Thuộc tính questId: gọi String(q.id) để chuyển sang chuỗi | Thuộc tính chosen: dùng biến cùng tên | Thuộc tính candidates: đọc candidates.length
      rule,questId:String(q.id),chosen,candidates:candidates.length,
// [VI dòng gốc 758] Thuộc tính serverSig: sigBase | Thuộc tính signature: dùng biến cùng tên | Thuộc tính progressSig: gọi JSON.stringify(q.progress??null) để chuyển giá trị thành chuỗi JSON
      serverSig:sigBase,signature,progressSig:JSON.stringify(q.progress??null)};
// [VI dòng gốc 759] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 760] Định nghĩa hàm acknowledged; tham số: p
  function acknowledged(p){
// [VI dòng gốc 761] Khai báo biến không gán lại bằng const: q = gọi quest(); m = gọi model()
    const q=quest(),m=model();
// [VI dòng gốc 762] Kiểm tra !q||String(q.id)!==p.questId||Number(q.state)===2: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: true.
    if(!q||String(q.id)!==p.questId||Number(q.state)===2)return true;
// [VI dòng gốc 763] Kiểm tra (asInt(m?.tab?.[p.pos])||0)!==0: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: true.
    if((asInt(m?.tab?.[p.pos])||0)!==0)return true;
// [VI dòng gốc 764] Kết thúc hàm hiện tại và trả về: tính biểu thức JSON.stringify(q.progress??null)!==p.progressSig.
    return JSON.stringify(q.progress??null)!==p.progressSig;
// [VI dòng gốc 765] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 766] Chú thích gốc của tác giả; không được thực thi. Nội dung: Đăng ký theo dõi nguồn trạng thái hoặc thông báo mà module cần.
  // Đăng ký theo dõi nguồn trạng thái hoặc thông báo mà module cần.
// [VI dòng gốc 767] Định nghĩa hàm watch; tham số: không có
  function watch(){
// [VI dòng gốc 768] Duyệt từng giá trị trong ['pending','blocked'] bằng const k. | Khai báo biến không gán lại bằng const: k (chưa gán giá trị)
    for(const k of ['pending','blocked']){
// [VI dòng gốc 769] Khai báo biến không gán lại bằng const: p = đọc S[k] | Kiểm tra !p: đúng thì chạy nhánh sau if. | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
      const p=S[k];if(!p)continue;
// [VI dòng gốc 770] Kiểm tra acknowledged(p): đúng thì chạy nhánh sau if, sai thì chạy nhánh else.
      if(acknowledged(p)){
// [VI dòng gốc 771] Kiểm tra k==='pending': đúng thì chạy nhánh sau if. | tăng S.acked một đơn vị sau khi lấy giá trị
        if(k==='pending')S.acked++;
// [VI dòng gốc 772] gọi log(k==='pending'?'server-ack':'server-changed', {questId:p.questId,pos:p.pos})
        log(k==='pending'?'server-ack':'server-changed',{questId:p.questId,pos:p.pos});
// [VI dòng gốc 773] gán S[k] bằng null
        S[k]=null;
// [VI dòng gốc 774] Kiểm tra k==='pending'&&time()-p.at>C.ackTimeoutMs: đúng thì chạy nhánh sau if.
      }else if(k==='pending'&&time()-p.at>C.ackTimeoutMs){
// [VI dòng gốc 775] gán S.blocked bằng p | gán S.pending bằng null
        S.blocked=p;S.pending=null;
// [VI dòng gốc 776] gọi log('timeout-locked', {questId:p.questId,pos:p.pos})
        log('timeout-locked',{questId:p.questId,pos:p.pos});
// [VI dòng gốc 777] gọi console.warn('[KVPV INLAY931] No server ACK; locked without retry', p.questId)
        console.warn('[KVPV INLAY931] No server ACK; locked without retry',p.questId);
// [VI dòng gốc 778] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
      }
// [VI dòng gốc 779] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 780] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 781] Chú thích gốc của tác giả; không được thực thi. Nội dung: Tính phương án từ dữ liệu hiện tại để kiểm tra trước khi thực thi.
  // Tính phương án từ dữ liệu hiện tại để kiểm tra trước khi thực thi.
// [VI dòng gốc 782] Định nghĩa hàm preview; tham số: q=quest()
  function preview(q=quest()){
// [VI dòng gốc 783] Khai báo biến không gán lại bằng const: p = gọi snapshot(q) để đọc ảnh chụp trạng thái hiện tại; used = S.attempts.get(String(q?.id)) hoặc dùng vế phải khi vế trái falsy: 0
    const p=snapshot(q),used=S.attempts.get(String(q?.id))||0;
// [VI dòng gốc 784] Khai báo biến có thể gán lại bằng let: reason = đọc p.reason
    let reason=p.reason;
// [VI dòng gốc 785] Kiểm tra actor()!==MAIN: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gán reason bằng 'MAIN account only'
    if(actor()!==MAIN)reason='MAIN account only';
// [VI dòng gốc 786] Kiểm tra !C.enabled||!C.autoInlay: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gán reason bằng 'Disabled'
    else if(!C.enabled||!C.autoInlay)reason='Disabled';
// [VI dòng gốc 787] Kiểm tra S.pending: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gán reason bằng 'Waiting server ACK'
    else if(S.pending)reason='Waiting server ACK';
// [VI dòng gốc 788] Kiểm tra S.blocked: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gán reason bằng 'Blocked until server state changes'
    else if(S.blocked)reason='Blocked until server state changes';
// [VI dòng gốc 789] Kiểm tra C.requireCommonScene&&!common(): đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gán reason bằng 'In battle/instance or not a safe common scene'
    else if(C.requireCommonScene&&!common())reason='In battle/instance or not a safe common scene';
// [VI dòng gốc 790] Kiểm tra used>=C.maxRequestsPerQuest: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gán reason bằng 'Quest safety limit'
    else if(used>=C.maxRequestsPerQuest)reason='Quest safety limit';
// [VI dòng gốc 791] Kiểm tra time()-S.lastSendAt<C.minGapMs: đúng thì chạy nhánh sau if. | gán reason bằng 'Native command gap'
    else if(time()-S.lastSendAt<C.minGapMs)reason='Native command gap';
// [VI dòng gốc 792] Khai báo biến không gán lại bằng const: ready = p.ready&&actor()===MAIN&&C.enabled&&C.autoInlay&& !S.pending&&!S.blocked&&(!C.requireCommonScene||common())&& used<C.maxRequestsPerQuest và chỉ đánh giá vế phải khi vế trái truthy: time()-S.lastSendAt>=C.minGapMs
    const ready=p.ready&&actor()===MAIN&&C.enabled&&C.autoInlay&&
// [VI dòng gốc 793] gọi common()
      !S.pending&&!S.blocked&&(!C.requireCommonScene||common())&&
// [VI dòng gốc 794] gọi time()
      used<C.maxRequestsPerQuest&&time()-S.lastSendAt>=C.minGapMs;
// [VI dòng gốc 795] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm các thuộc tính của p, ready, reason, used, pending, blocked.
    return {...p,ready,reason,used,pending:!!S.pending,blocked:!!S.blocked};
// [VI dòng gốc 796] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 797] Khai báo biến không gán lại bằng const: probe = tạo hàm với tham số q | Khai báo biến không gán lại bằng const: p = gọi preview(q) | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm ready, signature.
  const probe=q=>{const p=preview(q);return {ready:p.ready,signature:p.signature||'missing-rune-snapshot'};};
// [VI dòng gốc 798] Định nghĩa hàm run; tham số: q, previous
  function run(q,previous){
// [VI dòng gốc 799] Khai báo biến không gán lại bằng const: current = gọi quest(); p = gọi preview(current)
    const current=quest(),p=preview(current);
// [VI dòng gốc 800] Kiểm tra String(q?.id)!==String(current?.id)||!p.ready||!p.chosen|| p.signature!==previous.signature||typeof rpc()?.inlayRune!=='function': đúng thì chạy nhánh sau if.
    if(String(q?.id)!==String(current?.id)||!p.ready||!p.chosen||
// [VI dòng gốc 801] gọi rpc()
       p.signature!==previous.signature||typeof rpc()?.inlayRune!=='function')
// [VI dòng gốc 802] Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('Server quest/rune snapshot changed before native action')
      throw Error('Server quest/rune snapshot changed before native action');
// [VI dòng gốc 803] Khai báo biến không gán lại bằng const: row = tạo đối tượng gồm at, questId, pos, uid, id, progressSig
    const row={at:time(),questId:String(q.id),pos:p.chosen.pos,uid:p.chosen.uid,
// [VI dòng gốc 804] Thuộc tính id: đọc p.chosen.id | Thuộc tính progressSig: đọc p.progressSig
      id:p.chosen.id,progressSig:p.progressSig};
// [VI dòng gốc 805] gán S.pending bằng row | gán S.lastSendAt bằng row.at
    S.pending=row;S.lastSendAt=row.at;
// [VI dòng gốc 806] gọi S.attempts.set(row.questId, p.used+1)
    S.attempts.set(row.questId,p.used+1);
// [VI dòng gốc 807] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài.
    try{
// [VI dòng gốc 808] gọi rpc().inlayRune([row.pos,row.uid])
      rpc().inlayRune([row.pos,row.uid]);
// [VI dòng gốc 809] tăng S.sent một đơn vị sau khi lấy giá trị | gọi log('native-inlay', {questId:row.questId,pos:row.pos,itemId:row.id})
      S.sent++;log('native-inlay',{questId:row.questId,pos:row.pos,itemId:row.id});
// [VI dòng gốc 810] Nhận lỗi bằng e và chạy phần xử lý lỗi. | tăng S.errors một đơn vị sau khi lấy giá trị | gán S.lastError bằng String(e) | gán S.pending bằng null
    }catch(e){S.errors++;S.lastError=String(e);S.pending=null;S.blocked=row;throw e;}
// [VI dòng gốc 811] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 812] Chú thích gốc của tác giả; không được thực thi. Nội dung: Trả trạng thái hiện tại để kiểm tra; ý nghĩa từng bộ đếm thuộc phạm vi module này.
  // Trả trạng thái hiện tại để kiểm tra; ý nghĩa từng bộ đếm thuộc phạm vi module này.
// [VI dòng gốc 813] Định nghĩa hàm status; tham số: không có. Mục đích: trả trạng thái để kiểm tra | Khai báo biến không gán lại bằng const: p = gọi preview() | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm version, running, actor, questId, matched, ready, reason, candidate, pending, blocked, sent, serverConfirmed, errors, lastError, tower.
  function status(){const p=preview();return {version:VERSION,running:S.running,actor:actor(),
// [VI dòng gốc 814] Thuộc tính questId: p.questId hoặc dùng vế phải khi vế trái là null/undefined: null | Thuộc tính matched: đảo giá trị đúng/sai của !p.rule | Thuộc tính ready: đọc p.ready | Thuộc tính reason: đọc p.reason
    questId:p.questId??null,matched:!!p.rule,ready:p.ready,reason:p.reason,
// [VI dòng gốc 815] Thuộc tính candidate: p.chosen hoặc dùng vế phải khi vế trái falsy: null | Thuộc tính pending: đọc p.pending | Thuộc tính blocked: đọc p.blocked
    candidate:p.chosen||null,pending:p.pending,blocked:p.blocked,
// [VI dòng gốc 816] Thuộc tính sent: đọc S.sent | Thuộc tính serverConfirmed: đọc S.acked | Thuộc tính errors: đọc S.errors | Thuộc tính lastError: đọc S.lastError
    sent:S.sent,serverConfirmed:S.acked,errors:S.errors,lastError:S.lastError,
// [VI dòng gốc 817] Thuộc tính tower: "manual-only"
    tower:'manual-only'};}
// [VI dòng gốc 818] Chú thích gốc của tác giả; không được thực thi. Nội dung: Dừng bộ điều khiển, hủy lịch và giải phóng tài nguyên do module này sở hữu.
  // Dừng bộ điều khiển, hủy lịch và giải phóng tài nguyên do module này sở hữu.
// [VI dòng gốc 819] Định nghĩa hàm stop; tham số: không có. Mục đích: dừng bộ điều khiển và dọn tài nguyên | gán C.enabled bằng false | gán S.running bằng false
  function stop(){C.enabled=false;S.running=false;
// [VI dòng gốc 820] Kiểm tra S.timer: đúng thì chạy nhánh sau if. | Kiểm tra typeof __KVPV29!=='undefined'&&typeof __KVPV29.cancel==='function': đúng thì chạy nhánh sau if, sai thì chạy nhánh else.
    if(S.timer){if(typeof __KVPV29!=='undefined'&&typeof __KVPV29.cancel==='function')
// [VI dòng gốc 821] gọi __KVPV29.cancel(S.timer) | gọi clearInterval(S.timer) để hủy tác vụ lặp | gán S.timer bằng null
      __KVPV29.cancel(S.timer);else clearInterval(S.timer);S.timer=null;}
// [VI dòng gốc 822] Kết thúc hàm hiện tại và trả về: gọi status() để trả trạng thái để kiểm tra.
    return status();}
// [VI dòng gốc 823] Chú thích gốc của tác giả; không được thực thi. Nội dung: Bật bộ điều khiển và lịch kiểm tra của module; trả trạng thái sau khi khởi động.
  // Bật bộ điều khiển và lịch kiểm tra của module; trả trạng thái sau khi khởi động.
// [VI dòng gốc 824] Định nghĩa hàm start; tham số: không có. Mục đích: khởi động bộ điều khiển
  function start(){
// [VI dòng gốc 825] gán C.enabled bằng true
    C.enabled=true;
// [VI dòng gốc 826] Kiểm tra !S.registered: đúng thì chạy nhánh sau if.
    if(!S.registered){
// [VI dòng gốc 827] gọi F.registerRecipe({type:'rune-inlay-empty',verified:true,spend:'materials', match:q=>!!match(q),probe,run})
      F.registerRecipe({type:'rune-inlay-empty',verified:true,spend:'materials',
// [VI dòng gốc 828] gán S.registered bằng true
        match:q=>!!match(q),probe,run});S.registered=true;
// [VI dòng gốc 829] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 830] Kiểm tra F.config: đúng thì chạy nhánh sau if. | gán F.config.allowMaterialRecipes bằng true
    if(F.config)F.config.allowMaterialRecipes=true;
// [VI dòng gốc 831] Kiểm tra S.timer: đúng thì chạy nhánh sau if. | Kiểm tra typeof __KVPV29!=='undefined'&&typeof __KVPV29.cancel==='function': đúng thì chạy nhánh sau if, sai thì chạy nhánh else.
    if(S.timer){if(typeof __KVPV29!=='undefined'&&typeof __KVPV29.cancel==='function')
// [VI dòng gốc 832] gọi __KVPV29.cancel(S.timer) | gọi clearInterval(S.timer) để hủy tác vụ lặp
      __KVPV29.cancel(S.timer);else clearInterval(S.timer);}
// [VI dòng gốc 833] Khai báo biến không gán lại bằng const: tick = tạo hàm với tham số (không có) | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | Kiểm tra actor()!==MAIN: đúng thì chạy nhánh sau if. | gọi stop() để dừng bộ điều khiển và dọn tài nguyên
    const tick=()=>{try{if(actor()!==MAIN){stop();return;}watch();}
// [VI dòng gốc 834] Nhận lỗi bằng e và chạy phần xử lý lỗi. | tăng S.errors một đơn vị sau khi lấy giá trị | gán S.lastError bằng String(e)
      catch(e){S.errors++;S.lastError=String(e);}};
// [VI dòng gốc 835] gán S.timer bằng typeof __KVPV29!=='undefined'&&typeof __KVPV29.every==='function'? __KVPV29.every(tick,C.pollMs):setInterval(tick,C.pollMs)
    S.timer=typeof __KVPV29!=='undefined'&&typeof __KVPV29.every==='function'?
// [VI dòng gốc 836] gọi __KVPV29.every(tick, C.pollMs) để kiểm tra mọi phần tử đều thỏa điều kiện | gọi setInterval(tick, C.pollMs) để đăng ký tác vụ lặp theo khoảng thời gian
      __KVPV29.every(tick,C.pollMs):setInterval(tick,C.pollMs);
// [VI dòng gốc 837] gán S.running bằng true | gọi tick() để xử lý một nhịp kiểm tra | Kết thúc hàm hiện tại và trả về: gọi status() để trả trạng thái để kiểm tra.
    S.running=true;tick();return status();
// [VI dòng gốc 838] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 839] Khai báo biến không gán lại bằng const: api = tạo đối tượng gồm installed, version, config, start, stop, status, preview, history, report
  const api={installed:true,version:VERSION,config:C,start,stop,status,preview,
// [VI dòng gốc 840] Khai báo biến không gán lại bằng const: x = gọi status() để trả trạng thái để kiểm tra | gọi console.table([x]) | Kết thúc hàm hiện tại và trả về: x.
    history:()=>S.history.slice(),report(){const x=status();console.table([x]);return x;}};
// [VI dòng gốc 841] gán W.KVPV_RUNE_INLAY931 bằng api
  W.KVPV_RUNE_INLAY931=api;
// [VI dòng gốc 842] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | gọi start() để khởi động bộ điều khiển | gọi console.log('[KVPV INLAY931] Native rune inlay executor ready; tower manual')
  try{start();console.log('[KVPV INLAY931] Native rune inlay executor ready; tower manual');}
// [VI dòng gốc 843] Nhận lỗi bằng e và chạy phần xử lý lỗi. | tăng S.errors một đơn vị sau khi lấy giá trị | gán S.lastError bằng String(e) | gọi console.warn('[KVPV INLAY931] Install failed', e)
  catch(e){S.errors++;S.lastError=String(e);console.warn('[KVPV INLAY931] Install failed',e);}
// [VI dòng gốc 844] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: })();
})();
// [VI dòng gốc 845] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  });
// [VI dòng gốc 846] gọi install("KVPV_STAR_REWARD932", ()=>{ (() => { 'use strict'; const W = window; const MAIN_ID = String(window.__KVPV_OWN_ACTOR_ID|…)
  install("KVPV_STAR_REWARD932",()=>{
// [VI dòng gốc 847] chạy ngay hàm bao để tạo phạm vi và khởi tạo phần chức năng bên trong
(() => {
// [VI dòng gốc 848] "use strict"
  'use strict';
// [VI dòng gốc 849] Khai báo biến không gán lại bằng const: W = window
  const W = window;
// [VI dòng gốc 850] Khai báo biến không gán lại bằng const: MAIN_ID = gọi String(window.__KVPV_OWN_ACTOR_ID||'') để chuyển sang chuỗi
  const MAIN_ID = String(window.__KVPV_OWN_ACTOR_ID||'');
// [VI dòng gốc 851] Khai báo biến không gán lại bằng const: existing = đọc W.KVPV_STAR_REWARD932
  const existing = W.KVPV_STAR_REWARD932;
// [VI dòng gốc 852] Kiểm tra existing?.installed: đúng thì chạy nhánh sau if.
  if (existing?.installed) {
// [VI dòng gốc 853] gọi console.info('[KVPV STAR932] Already installed, avoiding duplicate claim worker')
    console.info('[KVPV STAR932] Already installed, avoiding duplicate claim worker');
// [VI dòng gốc 854] Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    return;
// [VI dòng gốc 855] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 856] Khai báo biến không gán lại bằng const: config = tạo đối tượng gồm enabled, autoCollect, sceneId, pollMs, minGapMs, ackTimeoutMs, maxRequestsPerVisit, maxHistory
  const config = {
// [VI dòng gốc 857] Thuộc tính enabled: true
    enabled: true,
// [VI dòng gốc 858] Thuộc tính autoCollect: true
    autoCollect: true,
// [VI dòng gốc 859] Thuộc tính sceneId: 34
    sceneId: 34,
// [VI dòng gốc 860] Thuộc tính pollMs: 900
    pollMs: 900,
// [VI dòng gốc 861] Thuộc tính minGapMs: 2500
    minGapMs: 2500,
// [VI dòng gốc 862] Thuộc tính ackTimeoutMs: 30000
    ackTimeoutMs: 30000,
// [VI dòng gốc 863] Thuộc tính maxRequestsPerVisit: 12
    maxRequestsPerVisit: 12,
// [VI dòng gốc 864] Thuộc tính maxHistory: 80
    maxHistory: 80
// [VI dòng gốc 865] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  };
// [VI dòng gốc 866] Khai báo biến không gán lại bằng const: state = tạo đối tượng gồm installed, running, timer, scheduler, pending, blocked, lastSendAt, lastScene, visit, sentThisVisit, sent, confirmed, timedOut, errors, lastError, observed, log
  const state = {
// [VI dòng gốc 867] Thuộc tính installed: true | Thuộc tính running: false | Thuộc tính timer: null | Thuộc tính scheduler: null
    installed: true, running: false, timer: null, scheduler: null,
// [VI dòng gốc 868] Thuộc tính pending: null | Thuộc tính blocked: null
    pending: null, blocked: null,
// [VI dòng gốc 869] Thuộc tính lastSendAt: 0 | Thuộc tính lastScene: null | Thuộc tính visit: 0 | Thuộc tính sentThisVisit: 0
    lastSendAt: 0, lastScene: null, visit: 0, sentThisVisit: 0,
// [VI dòng gốc 870] Thuộc tính sent: 0 | Thuộc tính confirmed: 0 | Thuộc tính timedOut: 0 | Thuộc tính errors: 0
    sent: 0, confirmed: 0, timedOut: 0, errors: 0, lastError: '',
// [VI dòng gốc 871] Thuộc tính observed: 0 | Thuộc tính log: tạo mảng gồm 0 vị trí: []
    observed: 0, log: []
// [VI dòng gốc 872] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  };
// [VI dòng gốc 873] Khai báo biến không gán lại bằng const: now = tạo hàm với tham số (không có); mỗi lần gọi trả về gọi Date.now()
  const now = () => Date.now();
// [VI dòng gốc 874] Khai báo biến không gán lại bằng const: game = tạo hàm với tham số (không có); mỗi lần gọi trả về nếu typeof _Ba !== 'undefined' thì lấy _Ba, ngược lại lấy null
  const game = () => typeof _Ba !== 'undefined' ? _Ba : null;
// [VI dòng gốc 875] Khai báo biến không gán lại bằng const: actor = tạo hàm với tham số (không có); mỗi lần gọi trả về gọi String(game()?._rJ?._O$?.ins?.actorId ?? '') để chuyển sang chuỗi
  const actor = () => String(game()?._rJ?._O$?.ins?.actorId ?? '');
// [VI dòng gốc 876] Khai báo biến không gán lại bằng const: scene = tạo hàm với tham số (không có); mỗi lần gọi trả về gọi Number(game()?._$a?.SceneUtil?.curScene ?? -1) để chuyển sang số
  const scene = () => Number(game()?._$a?.SceneUtil?.curScene ?? -1);
// [VI dòng gốc 877] Khai báo biến không gán lại bằng const: model = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc game()?._MT?.the_secret_of_the_stars?._Gvt?.instance nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  const model = () => game()?._MT?.the_secret_of_the_stars?._Gvt?.instance;
// [VI dòng gốc 878] Khai báo biến không gán lại bằng const: native = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc game()?._MT?.the_secret_of_the_stars?._jvt?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  const native = () => game()?._MT?.the_secret_of_the_stars?._jvt?.ins;
// [VI dòng gốc 879] Khai báo biến không gán lại bằng const: inventory = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc game()?._Ic?._aQ?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  const inventory = () => game()?._Ic?._aQ?.ins;
// [VI dòng gốc 880] Khai báo biến không gán lại bằng const: queueBusy = tạo hàm với tham số (không có)
  const queueBusy = () => {
// [VI dòng gốc 881] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | Kết thúc hàm hiện tại và trả về: tính biểu thức W.KVPV_UPGRADES?.busy?.() === true.
    try { return W.KVPV_UPGRADES?.busy?.() === true; }
// [VI dòng gốc 882] Nhận lỗi bằng _ và chạy phần xử lý lỗi. | Kết thúc hàm hiện tại và trả về: true.
    catch (_) { return true; }  // fail closed if shared queue status breaks
// [VI dòng gốc 883] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  };
// [VI dòng gốc 884] Khai báo biến không gán lại bằng const: log = tạo hàm với tham số kind, details = {}
  const log = (kind, details = {}) => {
// [VI dòng gốc 885] gọi state.log.push({ time: new Date().toISOString(), kind, ...details }) để thêm phần tử vào cuối mảng
    state.log.push({ time: new Date().toISOString(), kind, ...details });
// [VI dòng gốc 886] Kiểm tra state.log.length > config.maxHistory: đúng thì chạy nhánh sau if. | gọi state.log.shift()
    if (state.log.length > config.maxHistory) state.log.shift();
// [VI dòng gốc 887] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  };
// [VI dòng gốc 888] Định nghĩa hàm bagSnapshot; tham số: không có
  function bagSnapshot() {
// [VI dòng gốc 889] Khai báo biến có thể gán lại bằng let: rows (chưa gán giá trị)
    let rows;
// [VI dòng gốc 890] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | gán rows bằng inventory()?.getItemsByBagType?.(7)
    try { rows = inventory()?.getItemsByBagType?.(7); }
// [VI dòng gốc 891] Nhận lỗi bằng _ và chạy phần xử lý lỗi. | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm available, count, signature.
    catch (_) { return { available: false, count: 0, signature: null }; }
// [VI dòng gốc 892] Kiểm tra !Array.isArray(rows): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm available, count, signature.
    if (!Array.isArray(rows)) return { available: false, count: 0, signature: null };
// [VI dòng gốc 893] Chú thích gốc của tác giả; không được thực thi. Nội dung: Only serializable primitive item fields. Never mutate the live bag array.
    // Only serializable primitive item fields. Never mutate the live bag array.
// [VI dòng gốc 894] Khai báo biến không gán lại bằng const: items = gọi rows.filter(Array.isArray).map(r => [ String(r[0] ?? ''), Number(r[1] ?? 0), String(r[2] ?? '') ]).sort((a,b) => JSON.stringify(a).localeCompare(JSON.stringify(b))) để sắp xếp mảng tại chỗ
    const items = rows.filter(Array.isArray).map(r => [
// [VI dòng gốc 895] gọi String(r[0] ?? '') để chuyển sang chuỗi | gọi Number(r[1] ?? 0) để chuyển sang số | gọi String(r[2] ?? '') để chuyển sang chuỗi
      String(r[0] ?? ''), Number(r[1] ?? 0), String(r[2] ?? '')
// [VI dòng gốc 896] Định nghĩa hàm hàm không đặt tên; tham số: a, b
    ]).sort((a,b) => JSON.stringify(a).localeCompare(JSON.stringify(b)));
// [VI dòng gốc 897] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm available, count, signature, items.
    return { available: true, count: items.length,
// [VI dòng gốc 898] Thuộc tính signature: gọi JSON.stringify(items) để chuyển giá trị thành chuỗi JSON | Thuộc tính items: dùng biến cùng tên
      signature: JSON.stringify(items), items };
// [VI dòng gốc 899] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 900] Định nghĩa hàm rewardReady; tham số: không có
  function rewardReady() {
// [VI dòng gốc 901] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | Kết thúc hàm hiện tại và trả về: tính biểu thức model()?.getState?.() === true.
    try { return model()?.getState?.() === true; }
// [VI dòng gốc 902] Nhận lỗi bằng _ và chạy phần xử lý lỗi. | Kết thúc hàm hiện tại và trả về: false.
    catch (_) { return false; }
// [VI dòng gốc 903] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 904] Định nghĩa hàm progress; tham số: bag
  function progress(bag) {
// [VI dòng gốc 905] Chú thích gốc của tác giả; không được thực thi. Nội dung: Require a *new inventory state* after a native request; scene changes,
    // Require a *new inventory state* after a native request; scene changes,
// [VI dòng gốc 906] Chú thích gốc của tác giả; không được thực thi. Nội dung: timer expiry and UI animations are NOT proof of server confirmation.
    // timer expiry and UI animations are NOT proof of server confirmation.
// [VI dòng gốc 907] Kiểm tra state.pending && bag.available && bag.signature !== state.pending.signature: đúng thì chạy nhánh sau if.
    if (state.pending && bag.available && bag.signature !== state.pending.signature) {
// [VI dòng gốc 908] tăng state.confirmed một đơn vị sau khi lấy giá trị
      state.confirmed++;
// [VI dòng gốc 909] gọi log('confirmed-server-bag-change', { previousCount: state.pending.count, nextCount: bag.count })
      log('confirmed-server-bag-change', { previousCount: state.pending.count,
// [VI dòng gốc 910] Thuộc tính nextCount: đọc bag.count
        nextCount: bag.count });
// [VI dòng gốc 911] gán state.pending bằng null
      state.pending = null;
// [VI dòng gốc 912] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 913] Kiểm tra state.blocked && bag.available && bag.signature !== state.blocked.signature: đúng thì chạy nhánh sau if.
    if (state.blocked && bag.available && bag.signature !== state.blocked.signature) {
// [VI dòng gốc 914] gọi log('unblocked-new-server-bag', { count: bag.count })
      log('unblocked-new-server-bag', { count: bag.count });
// [VI dòng gốc 915] gán state.blocked bằng null
      state.blocked = null;
// [VI dòng gốc 916] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 917] Kiểm tra state.pending && now() - state.pending.sentAt >= config.ackTimeoutMs: đúng thì chạy nhánh sau if.
    if (state.pending && now() - state.pending.sentAt >= config.ackTimeoutMs) {
// [VI dòng gốc 918] gán state.blocked bằng { ...state.pending }
      state.blocked = { ...state.pending };
// [VI dòng gốc 919] gán state.pending bằng null
      state.pending = null;
// [VI dòng gốc 920] tăng state.timedOut một đơn vị sau khi lấy giá trị
      state.timedOut++;
// [VI dòng gốc 921] gọi log('timeout-locked', { count: state.blocked.count })
      log('timeout-locked', { count: state.blocked.count });
// [VI dòng gốc 922] gọi console.warn('[KVPV STAR932] No confirmed server change after claim; locked until bag changes')
      console.warn('[KVPV STAR932] No confirmed server change after claim; locked until bag changes');
// [VI dòng gốc 923] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 924] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 925] Chú thích gốc của tác giả; không được thực thi. Nội dung: Tính phương án từ dữ liệu hiện tại để kiểm tra trước khi thực thi.
  // Tính phương án từ dữ liệu hiện tại để kiểm tra trước khi thực thi.
// [VI dòng gốc 926] Định nghĩa hàm preview; tham số: không có
  function preview() {
// [VI dòng gốc 927] Khai báo biến không gán lại bằng const: bag = gọi bagSnapshot()
    const bag = bagSnapshot();
// [VI dòng gốc 928] Khai báo biến không gán lại bằng const: currentScene = gọi scene()
    const currentScene = scene();
// [VI dòng gốc 929] Khai báo biến có thể gán lại bằng let: reason = "Reward ready"
    let reason = 'Reward ready';
// [VI dòng gốc 930] Kiểm tra actor() !== MAIN_ID: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gán reason bằng 'MAIN account only'
    if (actor() !== MAIN_ID) reason = 'MAIN account only';
// [VI dòng gốc 931] Kiểm tra !state.running || !config.enabled || !config.autoCollect: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gán reason bằng 'Disabled'
    else if (!state.running || !config.enabled || !config.autoCollect) reason = 'Disabled';
// [VI dòng gốc 932] Kiểm tra currentScene !== config.sceneId: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gán reason bằng 'Not in Tinh Than boss scene 34'
    else if (currentScene !== config.sceneId) reason = 'Not in Tinh Than boss scene 34';
// [VI dòng gốc 933] Kiểm tra !bag.available: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gán reason bằng 'Temporary bag data not loaded'
    else if (!bag.available) reason = 'Temporary bag data not loaded';
// [VI dòng gốc 934] Kiểm tra !bag.count: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gán reason bằng 'No temporary rewards in bag'
    else if (!bag.count) reason = 'No temporary rewards in bag';
// [VI dòng gốc 935] Kiểm tra typeof native()?.PickTempReward !== 'function': đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gán reason bằng 'Native claim API not loaded'
    else if (typeof native()?.PickTempReward !== 'function') reason = 'Native claim API not loaded';
// [VI dòng gốc 936] Kiểm tra !rewardReady(): đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gán reason bằng 'Game has not enabled temporary reward claim'
    else if (!rewardReady()) reason = 'Game has not enabled temporary reward claim';
// [VI dòng gốc 937] Kiểm tra state.pending: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gán reason bằng 'Waiting server bag change'
    else if (state.pending) reason = 'Waiting server bag change';
// [VI dòng gốc 938] Kiểm tra state.blocked: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gán reason bằng 'Server ACK timeout: waiting for new bag state'
    else if (state.blocked) reason = 'Server ACK timeout: waiting for new bag state';
// [VI dòng gốc 939] Kiểm tra state.sentThisVisit >= config.maxRequestsPerVisit: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gán reason bằng 'Visit claim limit reached'
    else if (state.sentThisVisit >= config.maxRequestsPerVisit) reason = 'Visit claim limit reached';
// [VI dòng gốc 940] Kiểm tra queueBusy(): đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gán reason bằng 'Shared queue busy'
    else if (queueBusy()) reason = 'Shared queue busy';
// [VI dòng gốc 941] Kiểm tra now() - state.lastSendAt < config.minGapMs: đúng thì chạy nhánh sau if. | gán reason bằng 'Minimum interval between native claims'
    else if (now() - state.lastSendAt < config.minGapMs) reason = 'Minimum interval between native claims';
// [VI dòng gốc 942] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm ready, reason, scene, actor, bagAvailable, bagCount, bagSignature, pending, blocked.
    return { ready: reason === 'Reward ready', reason, scene: currentScene,
// [VI dòng gốc 943] Thuộc tính actor: gọi actor() để ID nhân vật sở hữu phiên này | Thuộc tính bagAvailable: đọc bag.available | Thuộc tính bagCount: đọc bag.count
      actor: actor(), bagAvailable: bag.available, bagCount: bag.count,
// [VI dòng gốc 944] Thuộc tính bagSignature: đọc bag.signature | Thuộc tính pending: đảo giá trị đúng/sai của !state.pending | Thuộc tính blocked: đảo giá trị đúng/sai của !state.blocked
      bagSignature: bag.signature, pending: !!state.pending, blocked: !!state.blocked };
// [VI dòng gốc 945] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 946] Chú thích gốc của tác giả; không được thực thi. Nội dung: Thực hiện một lượt kiểm tra của module; các nhánh bên dưới quyết định có đủ điều kiện để hành động hay phải chờ.
  // Thực hiện một lượt kiểm tra của module; các nhánh bên dưới quyết định có đủ điều kiện để hành động hay phải chờ.
// [VI dòng gốc 947] Định nghĩa hàm tick; tham số: không có. Mục đích: xử lý một nhịp kiểm tra
  function tick() {
// [VI dòng gốc 948] Kiểm tra !state.running: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if (!state.running) return;
// [VI dòng gốc 949] Kiểm tra actor() !== MAIN_ID: đúng thì chạy nhánh sau if. | gọi stop() để dừng bộ điều khiển và dọn tài nguyên | gọi log('wrong-actor-stopped') | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if (actor() !== MAIN_ID) { stop(); log('wrong-actor-stopped'); return; }
// [VI dòng gốc 950] Khai báo biến không gán lại bằng const: curScene = gọi scene()
    const curScene = scene();
// [VI dòng gốc 951] Kiểm tra state.lastScene !== curScene: đúng thì chạy nhánh sau if.
    if (state.lastScene !== curScene) {
// [VI dòng gốc 952] Kiểm tra curScene === config.sceneId: đúng thì chạy nhánh sau if.
      if (curScene === config.sceneId) {
// [VI dòng gốc 953] tăng state.visit một đơn vị sau khi lấy giá trị
        state.visit++;
// [VI dòng gốc 954] gán state.sentThisVisit bằng 0
        state.sentThisVisit = 0;
// [VI dòng gốc 955] gọi log('entered-star-scene', { visit: state.visit })
        log('entered-star-scene', { visit: state.visit });
// [VI dòng gốc 956] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
      }
// [VI dòng gốc 957] gán state.lastScene bằng curScene
      state.lastScene = curScene;
// [VI dòng gốc 958] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 959] Khai báo biến không gán lại bằng const: bag = gọi bagSnapshot()
    const bag = bagSnapshot();
// [VI dòng gốc 960] Kiểm tra bag.available: đúng thì chạy nhánh sau if. | tăng state.observed một đơn vị sau khi lấy giá trị | gọi progress(bag)
    if (bag.available) { state.observed++; progress(bag); }
// [VI dòng gốc 961] Khai báo biến không gán lại bằng const: p = gọi preview()
    const p = preview();
// [VI dòng gốc 962] Kiểm tra !p.ready: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if (!p.ready) return;
// [VI dòng gốc 963] Chú thích gốc của tác giả; không được thực thi. Nội dung: Recheck all native eligibility immediately before sending.
    // Recheck all native eligibility immediately before sending.
// [VI dòng gốc 964] Khai báo biến không gán lại bằng const: before = gọi bagSnapshot()
    const before = bagSnapshot();
// [VI dòng gốc 965] Kiểm tra !before.available || before.signature !== p.bagSignature || !rewardReady() || queueBusy() || scene() !== config.sceneId: đúng thì chạy nhánh sau if.
    if (!before.available || before.signature !== p.bagSignature ||
// [VI dòng gốc 966] Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
        !rewardReady() || queueBusy() || scene() !== config.sceneId) return;
// [VI dòng gốc 967] Khai báo biến không gán lại bằng const: req = tạo đối tượng gồm signature, count, sentAt
    const req = { signature: before.signature, count: before.count, sentAt: now() };
// [VI dòng gốc 968] gán state.pending bằng req | gán state.lastSendAt bằng req.sentAt
    state.pending = req; state.lastSendAt = req.sentAt;
// [VI dòng gốc 969] tăng state.sentThisVisit một đơn vị sau khi lấy giá trị
    state.sentThisVisit++;
// [VI dòng gốc 970] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài.
    try {
// [VI dòng gốc 971] gọi native().PickTempReward()
      native().PickTempReward();
// [VI dòng gốc 972] tăng state.sent một đơn vị sau khi lấy giá trị
      state.sent++;
// [VI dòng gốc 973] gọi log('sent-native-claim', { count: req.count, visit: state.visit })
      log('sent-native-claim', { count: req.count, visit: state.visit });
// [VI dòng gốc 974] Nhận lỗi bằng e và chạy phần xử lý lỗi.
    } catch (e) {
// [VI dòng gốc 975] tăng state.errors một đơn vị sau khi lấy giá trị | gán state.lastError bằng String(e?.message ?? e)
      state.errors++; state.lastError = String(e?.message ?? e);
// [VI dòng gốc 976] gán state.blocked bằng req | gán state.pending bằng null
      state.blocked = req; state.pending = null;
// [VI dòng gốc 977] gọi log('native-error-locked', { error: state.lastError })
      log('native-error-locked', { error: state.lastError });
// [VI dòng gốc 978] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 979] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 980] Chú thích gốc của tác giả; không được thực thi. Nội dung: Trả trạng thái hiện tại để kiểm tra; ý nghĩa từng bộ đếm thuộc phạm vi module này.
  // Trả trạng thái hiện tại để kiểm tra; ý nghĩa từng bộ đếm thuộc phạm vi module này.
// [VI dòng gốc 981] Định nghĩa hàm status; tham số: không có. Mục đích: trả trạng thái để kiểm tra
  function status() {
// [VI dòng gốc 982] Khai báo biến không gán lại bằng const: p = gọi preview()
    const p = preview();
// [VI dòng gốc 983] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm version, running, autoCollect, các thuộc tính của p, visit, requestsThisVisit, sent, serverConfirmed, timeouts, errors, lastError, tower.
    return { version: '9.3.2', running: state.running, autoCollect: config.autoCollect,
// [VI dòng gốc 984] Thuộc tính visit: đọc state.visit | Thuộc tính requestsThisVisit: đọc state.sentThisVisit
      ...p, visit: state.visit, requestsThisVisit: state.sentThisVisit,
// [VI dòng gốc 985] Thuộc tính sent: đọc state.sent | Thuộc tính serverConfirmed: đọc state.confirmed | Thuộc tính timeouts: đọc state.timedOut
      sent: state.sent, serverConfirmed: state.confirmed, timeouts: state.timedOut,
// [VI dòng gốc 986] Thuộc tính errors: đọc state.errors | Thuộc tính lastError: đọc state.lastError
      errors: state.errors, lastError: state.lastError,
// [VI dòng gốc 987] Thuộc tính tower: "manual-only"
      tower: 'manual-only' };
// [VI dòng gốc 988] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 989] Chú thích gốc của tác giả; không được thực thi. Nội dung: Dừng bộ điều khiển, hủy lịch và giải phóng tài nguyên do module này sở hữu.
  // Dừng bộ điều khiển, hủy lịch và giải phóng tài nguyên do module này sở hữu.
// [VI dòng gốc 990] Định nghĩa hàm stop; tham số: không có. Mục đích: dừng bộ điều khiển và dọn tài nguyên
  function stop() {
// [VI dòng gốc 991] gán state.running bằng false
    state.running = false;
// [VI dòng gốc 992] Kiểm tra state.timer !== null: đúng thì chạy nhánh sau if.
    if (state.timer !== null) {
// [VI dòng gốc 993] Kiểm tra state.scheduler === 'shared' && typeof __KVPV29 !== 'undefined': đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gọi __KVPV29.cancel(state.timer)
      if (state.scheduler === 'shared' && typeof __KVPV29 !== 'undefined') __KVPV29.cancel(state.timer);
// [VI dòng gốc 994] gọi clearInterval(state.timer) để hủy tác vụ lặp
      else clearInterval(state.timer);
// [VI dòng gốc 995] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 996] gán state.timer bằng null | gán state.scheduler bằng null
    state.timer = null; state.scheduler = null;
// [VI dòng gốc 997] Kết thúc hàm hiện tại và trả về: gọi status() để trả trạng thái để kiểm tra.
    return status();
// [VI dòng gốc 998] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 999] Chú thích gốc của tác giả; không được thực thi. Nội dung: Bật bộ điều khiển và lịch kiểm tra của module; trả trạng thái sau khi khởi động.
  // Bật bộ điều khiển và lịch kiểm tra của module; trả trạng thái sau khi khởi động.
// [VI dòng gốc 1000] Định nghĩa hàm start; tham số: không có. Mục đích: khởi động bộ điều khiển
  function start() {
// [VI dòng gốc 1001] Kiểm tra state.running: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: gọi status() để trả trạng thái để kiểm tra.
    if (state.running) return status();
// [VI dòng gốc 1002] Kiểm tra actor() !== MAIN_ID: đúng thì chạy nhánh sau if.
    if (actor() !== MAIN_ID) {
// [VI dòng gốc 1003] gọi console.warn('[KVPV STAR932] Refuse start: MAIN-only; wrong game-frame')
      console.warn('[KVPV STAR932] Refuse start: MAIN-only; wrong game-frame');
// [VI dòng gốc 1004] Kết thúc hàm hiện tại và trả về: gọi status() để trả trạng thái để kiểm tra.
      return status();
// [VI dòng gốc 1005] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 1006] gán state.running bằng true
    state.running = true;
// [VI dòng gốc 1007] Khai báo biến không gán lại bằng const: cb = tạo hàm với tham số (không có)
    const cb = () => {
// [VI dòng gốc 1008] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | gọi tick() để xử lý một nhịp kiểm tra | Nhận lỗi bằng e và chạy phần xử lý lỗi.
      try { tick(); } catch (e) {
// [VI dòng gốc 1009] tăng state.errors một đơn vị sau khi lấy giá trị | gán state.lastError bằng String(e?.message ?? e)
        state.errors++; state.lastError = String(e?.message ?? e);
// [VI dòng gốc 1010] gọi log('watch-error', { error: state.lastError })
        log('watch-error', { error: state.lastError });
// [VI dòng gốc 1011] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
      }
// [VI dòng gốc 1012] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    };
// [VI dòng gốc 1013] Kiểm tra typeof __KVPV29 !== 'undefined' && typeof __KVPV29.every === 'function': đúng thì chạy nhánh sau if, sai thì chạy nhánh else.
    if (typeof __KVPV29 !== 'undefined' && typeof __KVPV29.every === 'function') {
// [VI dòng gốc 1014] gán state.scheduler bằng 'shared'
      state.scheduler = 'shared';
// [VI dòng gốc 1015] gán state.timer bằng __KVPV29.every(cb, config.pollMs)
      state.timer = __KVPV29.every(cb, config.pollMs);
// [VI dòng gốc 1016] Tiếp tục hàm start; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: } else {
    } else {
// [VI dòng gốc 1017] gán state.scheduler bằng 'interval'
      state.scheduler = 'interval';
// [VI dòng gốc 1018] gán state.timer bằng setInterval(cb, config.pollMs)
      state.timer = setInterval(cb, config.pollMs);
// [VI dòng gốc 1019] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 1020] gọi cb()
    cb();
// [VI dòng gốc 1021] Kết thúc hàm hiện tại và trả về: gọi status() để trả trạng thái để kiểm tra.
    return status();
// [VI dòng gốc 1022] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 1023] Khai báo biến không gán lại bằng const: api = tạo đối tượng gồm installed, version, config, start, stop, status, preview, scan, history, report
  const api = {
// [VI dòng gốc 1024] Thuộc tính installed: true | Thuộc tính version: "9.3.2" | Thuộc tính config: dùng biến cùng tên | Thuộc tính start: dùng biến cùng tên
    installed: true, version: '9.3.2', config, start, stop, status, preview,
// [VI dòng gốc 1025] Thuộc tính scan: tick (xử lý một nhịp kiểm tra)
    scan: tick,
// [VI dòng gốc 1026] Thuộc tính history: tạo hàm với tham số (không có); mỗi lần gọi trả về gọi state.log.slice() để lấy một đoạn dữ liệu
    history: () => state.log.slice(),
// [VI dòng gốc 1027] Khai báo biến không gán lại bằng const: data = gọi status() để trả trạng thái để kiểm tra | gọi console.table([data]) | Kết thúc hàm hiện tại và trả về: data.
    report() { const data = status(); console.table([data]); return data; }
// [VI dòng gốc 1028] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  };
// [VI dòng gốc 1029] gán W.KVPV_STAR_REWARD932 bằng api
  W.KVPV_STAR_REWARD932 = api;
// [VI dòng gốc 1030] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | gọi start() để khởi động bộ điều khiển
  try { start(); }
// [VI dòng gốc 1031] Nhận lỗi bằng e và chạy phần xử lý lỗi. | tăng state.errors một đơn vị sau khi lấy giá trị | gán state.lastError bằng String(e) | gọi stop() để dừng bộ điều khiển và dọn tài nguyên
  catch (e) { state.errors++; state.lastError = String(e); stop();
// [VI dòng gốc 1032] gọi console.warn('[KVPV STAR932] Unable to install', e)
    console.warn('[KVPV STAR932] Unable to install', e); }
// [VI dòng gốc 1033] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: })();
})();
// [VI dòng gốc 1034] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  });
// [VI dòng gốc 1035] gọi install("KVPV_BEAUTY933", ()=>{ (() => { 'use strict'; const W=window, MAIN=String(window.__KVPV_OWN_ACTOR_ID||''), NAME='KVPV_B…)
  install("KVPV_BEAUTY933",()=>{
// [VI dòng gốc 1036] chạy ngay hàm bao để tạo phạm vi và khởi tạo phần chức năng bên trong
(() => {
// [VI dòng gốc 1037] "use strict"
  'use strict';
// [VI dòng gốc 1038] Khai báo biến không gán lại bằng const: W = window; MAIN = gọi String(window.__KVPV_OWN_ACTOR_ID||'') để chuyển sang chuỗi; NAME = "KVPV_BEAUTY933"
  const W=window, MAIN=String(window.__KVPV_OWN_ACTOR_ID||''), NAME='KVPV_BEAUTY933';
// [VI dòng gốc 1039] Kiểm tra W[NAME]?.installed: đúng thì chạy nhánh sau if. | gọi console.info('[BEAUTY933] Already installed') | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  if(W[NAME]?.installed){console.info('[BEAUTY933] Already installed');return;}
// [VI dòng gốc 1040] Khai báo biến không gán lại bằng const: C = tạo đối tượng gồm enabled, autoActivate, pollMs, minGapMs, ackTimeoutMs, maxCommandsSession, maxHistory
  const C={enabled:true,autoActivate:true,pollMs:800,minGapMs:1000,
// [VI dòng gốc 1041] Thuộc tính ackTimeoutMs: 30000 | Thuộc tính maxCommandsSession: 90 | Thuộc tính maxHistory: 100
    ackTimeoutMs:30000,maxCommandsSession:90,maxHistory:100};
// [VI dòng gốc 1042] Khai báo biến không gán lại bằng const: S = tạo đối tượng gồm running, timer, scheduler, pending, blocked, lastSend, lastModelRequest, modelRequests, commands, confirmed, timeouts, errors, lastError, notes
  const S={running:false,timer:null,scheduler:null,pending:null,blocked:null,
// [VI dòng gốc 1043] Thuộc tính lastSend: 0 | Thuộc tính lastModelRequest: 0 | Thuộc tính modelRequests: 0 | Thuộc tính commands: 0
    lastSend:0,lastModelRequest:0,modelRequests:0,commands:0,confirmed:0,
// [VI dòng gốc 1044] Thuộc tính timeouts: 0 | Thuộc tính errors: 0 | Thuộc tính lastError: "" | Thuộc tính notes: tạo mảng gồm 0 vị trí: []
    timeouts:0,errors:0,lastError:'',notes:[]};
// [VI dòng gốc 1045] Khai báo biến không gán lại bằng const: now = tạo hàm với tham số (không có); mỗi lần gọi trả về gọi Date.now()
  const now=()=>Date.now();
// [VI dòng gốc 1046] Khai báo biến không gán lại bằng const: getGame = tạo hàm với tham số (không có); mỗi lần gọi trả về nếu typeof _Ba==='undefined' thì lấy null, ngược lại lấy _Ba
  const getGame=()=>typeof _Ba==='undefined'?null:_Ba;
// [VI dòng gốc 1047] Khai báo biến không gán lại bằng const: getConfig = tạo hàm với tham số (không có); mỗi lần gọi trả về nếu typeof _ft==='undefined' thì lấy null, ngược lại lấy _ft._Ftt?.ins
  const getConfig=()=>typeof _ft==='undefined'?null:_ft._Ftt?.ins;
// [VI dòng gốc 1048] Khai báo biến không gán lại bằng const: actor = tạo hàm với tham số (không có); mỗi lần gọi trả về gọi String(getGame()?._rJ?._O$?.ins?.actorId??'') để chuyển sang chuỗi
  const actor=()=>String(getGame()?._rJ?._O$?.ins?.actorId??'');
// [VI dòng gốc 1049] Khai báo biến không gán lại bằng const: model = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc getGame()?._Q9?._ttt?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  const model=()=>getGame()?._Q9?._ttt?.ins;
// [VI dòng gốc 1050] Khai báo biến không gán lại bằng const: api = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc getGame()?._Q9?._$dt?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  const api=()=>getGame()?._Q9?._$dt?.ins;
// [VI dòng gốc 1051] Khai báo biến không gán lại bằng const: bag = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc getGame()?._Ic?._aQ?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  const bag=()=>getGame()?._Ic?._aQ?.ins;
// [VI dòng gốc 1052] Khai báo biến không gán lại bằng const: num = tạo hàm với tham số v | Khai báo biến không gán lại bằng const: n = gọi Number(v) để chuyển sang số | Kết thúc hàm hiện tại và trả về: nếu Number.isSafeInteger(n)&&n>=0 thì lấy n, ngược lại lấy null.
  const num=v=>{const n=Number(v);return Number.isSafeInteger(n)&&n>=0?n:null;};
// [VI dòng gốc 1053] Khai báo biến không gán lại bằng const: record = tạo hàm với tham số kind, extra={}
  const record=(kind,extra={})=>{
// [VI dòng gốc 1054] gọi S.notes.push({at:new Date().toISOString(),kind,...extra}) để thêm phần tử vào cuối mảng
    S.notes.push({at:new Date().toISOString(),kind,...extra});
// [VI dòng gốc 1055] Kiểm tra S.notes.length>C.maxHistory: đúng thì chạy nhánh sau if. | gọi S.notes.shift()
    if(S.notes.length>C.maxHistory)S.notes.shift();
// [VI dòng gốc 1056] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  };
// [VI dòng gốc 1057] Định nghĩa hàm getLevel; tham số: id
  function getLevel(id){
// [VI dòng gốc 1058] Khai báo biến không gán lại bằng const: book = đọc model()?.BeautyInfodirc?.[1] nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const book=model()?.BeautyInfodirc?.[1];
// [VI dòng gốc 1059] Kiểm tra !book||typeof book!=='object': đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: null.
    if(!book||typeof book!=='object')return null;  // no server snapshot yet
// [VI dòng gốc 1060] Khai báo biến không gán lại bằng const: lv = đọc book[id]?.level nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const lv=book[id]?.level;
// [VI dòng gốc 1061] Kết thúc hàm hiện tại và trả về: nếu lv==null thì lấy 0, ngược lại lấy num(lv).
    return lv==null?0:num(lv);
// [VI dòng gốc 1062] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 1063] Định nghĩa hàm material; tham số: id
  function material(id){
// [VI dòng gốc 1064] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | Kết thúc hàm hiện tại và trả về: gọi num(bag()?.getItemCountById?.(id)). | Nhận lỗi bằng _ và chạy phần xử lý lỗi. | Kết thúc hàm hiện tại và trả về: null.
    try{return num(bag()?.getItemCountById?.(id));}catch(_){return null;}
// [VI dòng gốc 1065] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 1066] Định nghĩa hàm collect; tham số: không có
  function collect(){
// [VI dòng gốc 1067] Khai báo biến không gán lại bằng const: book = đọc model()?.BeautyInfodirc?.[1] nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); cfg = gọi getConfig()
    const book=model()?.BeautyInfodirc?.[1],cfg=getConfig();
// [VI dòng gốc 1068] Kiểm tra !book||typeof book!=='object': đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm ready, reason, options.
    if(!book||typeof book!=='object')return {ready:false,reason:'Dang doi du lieu Nữ Bộc tu server',options:[]};
// [VI dòng gốc 1069] Kiểm tra !cfg||typeof cfg.getBeautyFairyIds!=='function'||typeof cfg.getCfgByIdAndLv!=='function': đúng thì chạy nhánh sau if.
    if(!cfg||typeof cfg.getBeautyFairyIds!=='function'||typeof cfg.getCfgByIdAndLv!=='function')
// [VI dòng gốc 1070] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm ready, reason, options.
      return {ready:false,reason:'Chua tai cau hinh Nữ Bộc',options:[]};
// [VI dòng gốc 1071] Khai báo biến không gán lại bằng const: ids = gọi cfg.getBeautyFairyIds()
    const ids=cfg.getBeautyFairyIds();
// [VI dòng gốc 1072] Kiểm tra !Array.isArray(ids)||ids.length===0: đúng thì chạy nhánh sau if.
    if(!Array.isArray(ids)||ids.length===0)
// [VI dòng gốc 1073] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm ready, reason, options.
      return {ready:false,reason:'Danh sach Nữ Bộc chua tai',options:[]};
// [VI dòng gốc 1074] Khai báo biến không gán lại bằng const: options = tạo mảng gồm 0 vị trí: [] | Khai báo biến có thể gán lại bằng let: activated = 0; needed = 0
    const options=[];let activated=0,needed=0;
// [VI dòng gốc 1075] Duyệt từng giá trị trong ids bằng const rawId. | Khai báo biến không gán lại bằng const: rawId (chưa gán giá trị)
    for(const rawId of ids){
// [VI dòng gốc 1076] Khai báo biến không gán lại bằng const: id = gọi num(rawId); level = gọi getLevel(id)
      const id=num(rawId),level=getLevel(id);
// [VI dòng gốc 1077] Kiểm tra !id||level===null: đúng thì chạy nhánh sau if. | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
      if(!id||level===null)continue;
// [VI dòng gốc 1078] Kiểm tra level>=9: đúng thì chạy nhánh sau if. | tăng activated một đơn vị sau khi lấy giá trị | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
      if(level>=9){activated++;continue;}  // never auto promote to new tiers
// [VI dòng gốc 1079] tăng needed một đơn vị sau khi lấy giá trị
      needed++;
// [VI dòng gốc 1080] Khai báo biến có thể gán lại bằng let: row (chưa gán giá trị)
      let row;
// [VI dòng gốc 1081] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | gán row bằng cfg.getCfgByIdAndLv(id,level) | Nhận lỗi bằng _ và chạy phần xử lý lỗi. | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
      try{row=cfg.getCfgByIdAndLv(id,level);}catch(_){continue;}
// [VI dòng gốc 1082] Kiểm tra !Array.isArray(row)||num(row[0])!==id||!Array.isArray(row[5]): đúng thì chạy nhánh sau if. | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
      if(!Array.isArray(row)||num(row[0])!==id||!Array.isArray(row[5]))continue;
// [VI dòng gốc 1083] Khai báo biến không gán lại bằng const: itemId = gọi num(row[5][0]); count = gọi num(row[5][1]); kind = gọi num(row[2])
      const itemId=num(row[5][0]),count=num(row[5][1]),kind=num(row[2]);
// [VI dòng gốc 1084] Chú thích gốc của tác giả; không được thực thi. Nội dung: Reject costs that might be currency or malformed configuration.
      // Reject costs that might be currency or malformed configuration.
// [VI dòng gốc 1085] Kiểm tra !itemId||itemId<10000||!count||count>10000||kind===null: đúng thì chạy nhánh sau if. | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
      if(!itemId||itemId<10000||!count||count>10000||kind===null)continue;
// [VI dòng gốc 1086] Khai báo biến không gán lại bằng const: have = gọi material(itemId)
      const have=material(itemId);
// [VI dòng gốc 1087] Kiểm tra have===null||have<count: đúng thì chạy nhánh sau if. | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
      if(have===null||have<count)continue;
// [VI dòng gốc 1088] gọi options.push({id,level,materialId:itemId,need:count,have, nativeKind:kind,nativeId:id}) để thêm phần tử vào cuối mảng
      options.push({id,level,materialId:itemId,need:count,have,
// [VI dòng gốc 1089] Thuộc tính nativeKind: kind | Thuộc tính nativeId: id
        nativeKind:kind,nativeId:id});
// [VI dòng gốc 1090] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 1091] gọi options.sort((a,b)=>b.level-a.level||a.need-b.need||a.id-b.id) để sắp xếp mảng tại chỗ
    options.sort((a,b)=>b.level-a.level||a.need-b.need||a.id-b.id);
// [VI dòng gốc 1092] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm ready, reason, options, activated, notActivated, total.
    return {ready:options.length>0,
// [VI dòng gốc 1093] Thuộc tính reason: nếu options.length thì lấy 'Co Nữ Bộc du nguyen lieu kich hoat', ngược lại lấy needed===0?'Tat ca Nữ Bộc da duoc kich hoat':'Chua co Nữ Bộc du nguyen lieu kich hoat'
      reason:options.length?'Co Nữ Bộc du nguyen lieu kich hoat':
// [VI dòng gốc 1094] Tiếp tục hàm collect; thành phần cú pháp bắt đầu bằng name. Đọc cùng dòng mở phía trên: needed===0?'Tat ca Nữ Bộc da duoc kich hoat':'Chua co Nữ Bộc du nguyen lieu kich hoat',
        needed===0?'Tat ca Nữ Bộc da duoc kich hoat':'Chua co Nữ Bộc du nguyen lieu kich hoat',
// [VI dòng gốc 1095] Thuộc tính options: dùng biến cùng tên | Thuộc tính activated: dùng biến cùng tên | Thuộc tính notActivated: needed | Thuộc tính total: đọc ids.length
      options,activated,notActivated:needed,total:ids.length};
// [VI dòng gốc 1096] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 1097] Định nghĩa hàm reconcile; tham số: không có
  function reconcile(){
// [VI dòng gốc 1098] Khai báo biến không gán lại bằng const: p = S.pending hoặc dùng vế phải khi vế trái falsy: S.blocked
    const p=S.pending||S.blocked;
// [VI dòng gốc 1099] Kiểm tra !p: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(!p)return;
// [VI dòng gốc 1100] Khai báo biến không gán lại bằng const: lv = gọi getLevel(p.id)
    const lv=getLevel(p.id);
// [VI dòng gốc 1101] Kiểm tra lv!==null&&lv>p.level: đúng thì chạy nhánh sau if.
    if(lv!==null&&lv>p.level){
// [VI dòng gốc 1102] Kiểm tra S.pending: đúng thì chạy nhánh sau if. | tăng S.confirmed một đơn vị sau khi lấy giá trị
      if(S.pending)S.confirmed++;
// [VI dòng gốc 1103] gọi record(S.pending?'server-confirmed':'late-server-confirmed', { id:p.id,from:p.level,to:lv})
      record(S.pending?'server-confirmed':'late-server-confirmed',{
// [VI dòng gốc 1104] Thuộc tính id: đọc p.id | Thuộc tính from: đọc p.level | Thuộc tính to: lv
        id:p.id,from:p.level,to:lv});
// [VI dòng gốc 1105] gán S.pending bằng null | gán S.blocked bằng null
      S.pending=null;S.blocked=null;
// [VI dòng gốc 1106] Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      return;
// [VI dòng gốc 1107] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 1108] Kiểm tra S.pending&&now()-S.pending.sentAt>C.ackTimeoutMs: đúng thì chạy nhánh sau if.
    if(S.pending&&now()-S.pending.sentAt>C.ackTimeoutMs){
// [VI dòng gốc 1109] gán S.blocked bằng S.pending | gán S.pending bằng null | tăng S.timeouts một đơn vị sau khi lấy giá trị
      S.blocked=S.pending;S.pending=null;S.timeouts++;
// [VI dòng gốc 1110] gọi record('ack-timeout-locked', {id:S.blocked.id,level:S.blocked.level})
      record('ack-timeout-locked',{id:S.blocked.id,level:S.blocked.level});
// [VI dòng gốc 1111] gọi console.warn('[BEAUTY933] Timeout: khong thay cap Nu Boc thay doi; dung gui lenh')
      console.warn('[BEAUTY933] Timeout: khong thay cap Nu Boc thay doi; dung gui lenh');
// [VI dòng gốc 1112] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 1113] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 1114] Chú thích gốc của tác giả; không được thực thi. Nội dung: Tính phương án từ dữ liệu hiện tại để kiểm tra trước khi thực thi.
  // Tính phương án từ dữ liệu hiện tại để kiểm tra trước khi thực thi.
// [VI dòng gốc 1115] Định nghĩa hàm preview; tham số: không có
  function preview(){
// [VI dòng gốc 1116] Khai báo biến không gán lại bằng const: scan = gọi collect(); chosen = scan.options[0] hoặc dùng vế phải khi vế trái falsy: null
    const scan=collect(),chosen=scan.options[0]||null;
// [VI dòng gốc 1117] Khai báo biến có thể gán lại bằng let: reason = đọc scan.reason
    let reason=scan.reason;
// [VI dòng gốc 1118] Kiểm tra actor()!==MAIN: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gán reason bằng 'Sai nhan vat MAIN'
    if(actor()!==MAIN)reason='Sai nhan vat MAIN';
// [VI dòng gốc 1119] Kiểm tra !S.running||!C.enabled||!C.autoActivate: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gán reason bằng 'Da tam dung'
    else if(!S.running||!C.enabled||!C.autoActivate)reason='Da tam dung';
// [VI dòng gốc 1120] Kiểm tra W.__KVPV_UNIVERSAL_HALTED: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gán reason bằng 'FULL da dung'
    else if(W.__KVPV_UNIVERSAL_HALTED)reason='FULL da dung';
// [VI dòng gốc 1121] Kiểm tra !scan.ready: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gán reason bằng scan.reason
    else if(!scan.ready)reason=scan.reason;
// [VI dòng gốc 1122] Kiểm tra typeof api()?.RiseBeauty!=='function': đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gán reason bằng 'Thieu native RiseBeauty'
    else if(typeof api()?.RiseBeauty!=='function')reason='Thieu native RiseBeauty';
// [VI dòng gốc 1123] Kiểm tra S.pending: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gán reason bằng 'Doi server ACK'
    else if(S.pending)reason='Doi server ACK';
// [VI dòng gốc 1124] Kiểm tra S.blocked: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gán reason bằng 'ACK timeout: khoa de khong gui lap'
    else if(S.blocked)reason='ACK timeout: khoa de khong gui lap';
// [VI dòng gốc 1125] Kiểm tra S.commands>=C.maxCommandsSession: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gán reason bằng 'Dat gioi han hanh dong phien'
    else if(S.commands>=C.maxCommandsSession)reason='Dat gioi han hanh dong phien';
// [VI dòng gốc 1126] Kiểm tra now()-S.lastSend<C.minGapMs: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gán reason bằng 'Dang giãn cach lenh'
    else if(now()-S.lastSend<C.minGapMs)reason='Dang giãn cach lenh';
// [VI dòng gốc 1127] Nhánh else được chạy khi điều kiện if tương ứng không đúng.
    else {
// [VI dòng gốc 1128] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | Kiểm tra W.KVPV_UPGRADES?.busy?.()===true: đúng thì chạy nhánh sau if. | gán reason bằng 'Hang doi nang cap dang ban'
      try{if(W.KVPV_UPGRADES?.busy?.()===true)reason='Hang doi nang cap dang ban';}
// [VI dòng gốc 1129] Nhận lỗi bằng _ và chạy phần xử lý lỗi. | gán reason bằng 'Khong doc duoc hang doi nang cap'
      catch(_){reason='Khong doc duoc hang doi nang cap';}
// [VI dòng gốc 1130] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 1131] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm ready, reason, selected, count, activated, notActivated, total.
    return {ready:reason===scan.reason&&scan.ready,reason,selected:chosen,
// [VI dòng gốc 1132] Thuộc tính count: đọc scan.options.length | Thuộc tính activated: đọc scan.activated | Thuộc tính notActivated: đọc scan.notActivated
      count:scan.options.length,activated:scan.activated,notActivated:scan.notActivated,
// [VI dòng gốc 1133] Thuộc tính total: đọc scan.total
      total:scan.total};
// [VI dòng gốc 1134] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 1135] Chú thích gốc của tác giả; không được thực thi. Nội dung: Thực hiện một lượt kiểm tra của module; các nhánh bên dưới quyết định có đủ điều kiện để hành động hay phải chờ.
  // Thực hiện một lượt kiểm tra của module; các nhánh bên dưới quyết định có đủ điều kiện để hành động hay phải chờ.
// [VI dòng gốc 1136] Định nghĩa hàm tick; tham số: không có. Mục đích: xử lý một nhịp kiểm tra
  function tick(){
// [VI dòng gốc 1137] Kiểm tra !S.running: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(!S.running)return;
// [VI dòng gốc 1138] Kiểm tra actor()!==MAIN||W.__KVPV_UNIVERSAL_HALTED: đúng thì chạy nhánh sau if. | gọi stop() để dừng bộ điều khiển và dọn tài nguyên | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(actor()!==MAIN||W.__KVPV_UNIVERSAL_HALTED){stop();return;}
// [VI dòng gốc 1139] Kiểm tra !model()?.BeautyInfodirc?.[1]: đúng thì chạy nhánh sau if.
    if(!model()?.BeautyInfodirc?.[1]){
// [VI dòng gốc 1140] Chú thích gốc của tác giả; không được thực thi. Nội dung: Native read-only model request; at most once per running session.
      // Native read-only model request; at most once per running session.
// [VI dòng gốc 1141] Kiểm tra !S.modelRequests&&typeof api()?.GetBeautyHandBookInfo==='function': đúng thì chạy nhánh sau if.
      if(!S.modelRequests&&typeof api()?.GetBeautyHandBookInfo==='function'){
// [VI dòng gốc 1142] tăng S.modelRequests một đơn vị sau khi lấy giá trị | gán S.lastModelRequest bằng now()
        S.modelRequests++;S.lastModelRequest=now();
// [VI dòng gốc 1143] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | gọi api().GetBeautyHandBookInfo() | gọi record('requested-model-once')
        try{api().GetBeautyHandBookInfo();record('requested-model-once');}
// [VI dòng gốc 1144] Nhận lỗi bằng e và chạy phần xử lý lỗi. | tăng S.errors một đơn vị sau khi lấy giá trị | gán S.lastError bằng String(e)
        catch(e){S.errors++;S.lastError=String(e);}
// [VI dòng gốc 1145] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
      }
// [VI dòng gốc 1146] Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      return;
// [VI dòng gốc 1147] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 1148] gọi reconcile()
    reconcile();
// [VI dòng gốc 1149] Khai báo biến không gán lại bằng const: p = gọi preview() | Kiểm tra !p.ready||!p.selected: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    const p=preview();if(!p.ready||!p.selected)return;
// [VI dòng gốc 1150] Khai báo biến không gán lại bằng const: before = gọi collect().options.find(x=>x.id===p.selected.id) để tìm phần tử đầu tiên thỏa điều kiện
    const before=collect().options.find(x=>x.id===p.selected.id);
// [VI dòng gốc 1151] Kiểm tra !before||before.level!==p.selected.level||before.have<before.need|| S.pending||S.blocked||typeof api()?.RiseBeauty!=='function': đúng thì chạy nhánh sau if.
    if(!before||before.level!==p.selected.level||before.have<before.need||
// [VI dòng gốc 1152] Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
       S.pending||S.blocked||typeof api()?.RiseBeauty!=='function')return;
// [VI dòng gốc 1153] Khai báo biến không gán lại bằng const: req = tạo đối tượng gồm id, level, materialId, need, sentAt
    const req={id:before.id,level:before.level,materialId:before.materialId,
// [VI dòng gốc 1154] Thuộc tính need: đọc before.need | Thuộc tính sentAt: gọi now()
      need:before.need,sentAt:now()};
// [VI dòng gốc 1155] gán S.pending bằng req | gán S.lastSend bằng req.sentAt
    S.pending=req;S.lastSend=req.sentAt;
// [VI dòng gốc 1156] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài.
    try{
// [VI dòng gốc 1157] gọi api().RiseBeauty(before.nativeKind, before.nativeId)
      api().RiseBeauty(before.nativeKind,before.nativeId);
// [VI dòng gốc 1158] tăng S.commands một đơn vị sau khi lấy giá trị
      S.commands++;
// [VI dòng gốc 1159] gọi record('native-activation-sent', {id:req.id,level:req.level, materialId:req.materialId,need:req.need})
      record('native-activation-sent',{id:req.id,level:req.level,
// [VI dòng gốc 1160] Thuộc tính materialId: đọc req.materialId | Thuộc tính need: đọc req.need
        materialId:req.materialId,need:req.need});
// [VI dòng gốc 1161] Nhận lỗi bằng e và chạy phần xử lý lỗi.
    }catch(e){
// [VI dòng gốc 1162] tăng S.errors một đơn vị sau khi lấy giá trị | gán S.lastError bằng String(e?.message??e)
      S.errors++;S.lastError=String(e?.message??e);
// [VI dòng gốc 1163] gán S.blocked bằng req | gán S.pending bằng null
      S.blocked=req;S.pending=null;
// [VI dòng gốc 1164] gọi record('native-error-locked', {error:S.lastError,id:req.id})
      record('native-error-locked',{error:S.lastError,id:req.id});
// [VI dòng gốc 1165] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 1166] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 1167] Chú thích gốc của tác giả; không được thực thi. Nội dung: Trả trạng thái hiện tại để kiểm tra; ý nghĩa từng bộ đếm thuộc phạm vi module này.
  // Trả trạng thái hiện tại để kiểm tra; ý nghĩa từng bộ đếm thuộc phạm vi module này.
// [VI dòng gốc 1168] Định nghĩa hàm status; tham số: không có. Mục đích: trả trạng thái để kiểm tra | Khai báo biến không gán lại bằng const: p = gọi preview() | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm version, running, autoActivate, các thuộc tính của p, pending, blocked, sent, serverConfirmed, timeouts, errors, lastError, tower.
  function status(){const p=preview();return {version:'9.3.3',running:S.running,
// [VI dòng gốc 1169] Thuộc tính autoActivate: đọc C.autoActivate | Thuộc tính pending: đọc S.pending | Thuộc tính blocked: đọc S.blocked
    autoActivate:C.autoActivate,...p,pending:S.pending,blocked:S.blocked,
// [VI dòng gốc 1170] Thuộc tính sent: đọc S.commands | Thuộc tính serverConfirmed: đọc S.confirmed | Thuộc tính timeouts: đọc S.timeouts
    sent:S.commands,serverConfirmed:S.confirmed,timeouts:S.timeouts,
// [VI dòng gốc 1171] Thuộc tính errors: đọc S.errors | Thuộc tính lastError: đọc S.lastError | Thuộc tính tower: "manual-only"
    errors:S.errors,lastError:S.lastError,tower:'manual-only'};}
// [VI dòng gốc 1172] Chú thích gốc của tác giả; không được thực thi. Nội dung: Dừng bộ điều khiển, hủy lịch và giải phóng tài nguyên do module này sở hữu.
  // Dừng bộ điều khiển, hủy lịch và giải phóng tài nguyên do module này sở hữu.
// [VI dòng gốc 1173] Định nghĩa hàm stop; tham số: không có. Mục đích: dừng bộ điều khiển và dọn tài nguyên
  function stop(){
// [VI dòng gốc 1174] gán S.running bằng false
    S.running=false;
// [VI dòng gốc 1175] Kiểm tra S.timer!=null: đúng thì chạy nhánh sau if.
    if(S.timer!=null){
// [VI dòng gốc 1176] Kiểm tra S.scheduler==='shared'&&typeof __KVPV29!=='undefined': đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gọi __KVPV29.cancel(S.timer)
      if(S.scheduler==='shared'&&typeof __KVPV29!=='undefined')__KVPV29.cancel(S.timer);
// [VI dòng gốc 1177] gọi clearInterval(S.timer) để hủy tác vụ lặp
      else clearInterval(S.timer);
// [VI dòng gốc 1178] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 1179] gán S.timer bằng null | gán S.scheduler bằng null
    S.timer=null;S.scheduler=null;
// [VI dòng gốc 1180] Kết thúc hàm hiện tại và trả về: gọi status() để trả trạng thái để kiểm tra.
    return status();
// [VI dòng gốc 1181] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 1182] Chú thích gốc của tác giả; không được thực thi. Nội dung: Bật bộ điều khiển và lịch kiểm tra của module; trả trạng thái sau khi khởi động.
  // Bật bộ điều khiển và lịch kiểm tra của module; trả trạng thái sau khi khởi động.
// [VI dòng gốc 1183] Định nghĩa hàm start; tham số: không có. Mục đích: khởi động bộ điều khiển
  function start(){
// [VI dòng gốc 1184] Kiểm tra S.running: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: gọi status() để trả trạng thái để kiểm tra.
    if(S.running)return status();
// [VI dòng gốc 1185] Kiểm tra actor()!==MAIN: đúng thì chạy nhánh sau if. | gọi console.warn('[BEAUTY933] MAIN-only') | Kết thúc hàm hiện tại và trả về: gọi status() để trả trạng thái để kiểm tra.
    if(actor()!==MAIN){console.warn('[BEAUTY933] MAIN-only');return status();}
// [VI dòng gốc 1186] gán S.running bằng true
    S.running=true;
// [VI dòng gốc 1187] Khai báo biến không gán lại bằng const: cb = tạo hàm với tham số (không có) | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | gọi tick() để xử lý một nhịp kiểm tra | Nhận lỗi bằng e và chạy phần xử lý lỗi.
    const cb=()=>{try{tick();}catch(e){S.errors++;S.lastError=String(e);record('worker-error',{error:S.lastError});}};
// [VI dòng gốc 1188] Kiểm tra typeof __KVPV29!=='undefined'&&typeof __KVPV29.every==='function': đúng thì chạy nhánh sau if, sai thì chạy nhánh else.
    if(typeof __KVPV29!=='undefined'&&typeof __KVPV29.every==='function'){
// [VI dòng gốc 1189] gán S.scheduler bằng 'shared' | gán S.timer bằng __KVPV29.every(cb,C.pollMs)
      S.scheduler='shared';S.timer=__KVPV29.every(cb,C.pollMs);
// [VI dòng gốc 1190] gán S.scheduler bằng 'interval' | gán S.timer bằng setInterval(cb,C.pollMs)
    }else{S.scheduler='interval';S.timer=setInterval(cb,C.pollMs);}
// [VI dòng gốc 1191] gọi cb() | Kết thúc hàm hiện tại và trả về: gọi status() để trả trạng thái để kiểm tra.
    cb();return status();
// [VI dòng gốc 1192] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 1193] Khai báo biến không gán lại bằng const: ext = tạo đối tượng gồm installed, version, config, start, stop, status, preview, scan, history, report
  const ext={installed:true,version:'9.3.3',config:C,start,stop,status,preview,
// [VI dòng gốc 1194] Khai báo biến không gán lại bằng const: s = gọi status() để trả trạng thái để kiểm tra | gọi console.table([{ running:s.running,reason:s.reason,ready:s.ready,selected:s.selected?.id, currentLevel:s.selected?.level,owned:s.selec…)
    scan:tick,history:()=>S.notes.slice(),report(){const s=status();console.table([{
// [VI dòng gốc 1195] Thuộc tính running: đọc s.running | Thuộc tính reason: đọc s.reason | Thuộc tính ready: đọc s.ready | Thuộc tính selected: đọc s.selected?.id nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
      running:s.running,reason:s.reason,ready:s.ready,selected:s.selected?.id,
// [VI dòng gốc 1196] Thuộc tính currentLevel: đọc s.selected?.level nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Thuộc tính owned: đọc s.selected?.have nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Thuộc tính required: đọc s.selected?.need nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
      currentLevel:s.selected?.level,owned:s.selected?.have,required:s.selected?.need,
// [VI dòng gốc 1197] Kết thúc hàm hiện tại và trả về: s.
      sent:s.sent,serverConfirmed:s.serverConfirmed,blocked:!!s.blocked}]);return s;}};
// [VI dòng gốc 1198] gán W[NAME] bằng ext
  W[NAME]=ext;
// [VI dòng gốc 1199] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | gọi start() để khởi động bộ điều khiển | Nhận lỗi bằng e và chạy phần xử lý lỗi. | gán S.lastError bằng String(e)
  try{start();}catch(e){S.lastError=String(e);S.errors++;stop();console.warn('[BEAUTY933] Start failed',e);}
// [VI dòng gốc 1200] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: })();
})();
// [VI dòng gốc 1201] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  });
// [VI dòng gốc 1202] gọi install("KVPV_ESCORT934", ()=>{ (() => { 'use strict'; const W=window, NAME='KVPV_ESCORT934', MAIN=String(window.__KVPV_OWN_ACTO…)
  install("KVPV_ESCORT934",()=>{
// [VI dòng gốc 1203] chạy ngay hàm bao để tạo phạm vi và khởi tạo phần chức năng bên trong
(() => {
// [VI dòng gốc 1204] "use strict"
  'use strict';
// [VI dòng gốc 1205] Khai báo biến không gán lại bằng const: W = window; NAME = "KVPV_ESCORT934"; MAIN = gọi String(window.__KVPV_OWN_ACTOR_ID||'') để chuyển sang chuỗi
  const W=window, NAME='KVPV_ESCORT934', MAIN=String(window.__KVPV_OWN_ACTOR_ID||'');
// [VI dòng gốc 1206] Kiểm tra W[NAME]?.installed: đúng thì chạy nhánh sau if. | gọi console.info('[ESCORT934] Da nap san. status():', W[NAME].status()) | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  if(W[NAME]?.installed){console.info('[ESCORT934] Da nap san. status():',W[NAME].status());return;}
// [VI dòng gốc 1207] Khai báo biến không gán lại bằng const: C = tạo đối tượng gồm enabled, autoStart, autoClaim, onlyDouble, pollMs, minActionGapMs, ackTimeoutMs, refreshAfterMs, readWhenNoModel, maxActionsPerSession, maxHistory
  const C={enabled:true,autoStart:true,autoClaim:true,onlyDouble:true,
// [VI dòng gốc 1208] Thuộc tính pollMs: 900 | Thuộc tính minActionGapMs: 1200 | Thuộc tính ackTimeoutMs: 30000
    pollMs:900,minActionGapMs:1200,ackTimeoutMs:30000,
// [VI dòng gốc 1209] Thuộc tính refreshAfterMs: 3000 | Thuộc tính readWhenNoModel: true | Thuộc tính maxActionsPerSession: 10
    refreshAfterMs:3000,readWhenNoModel:true,maxActionsPerSession:10,
// [VI dòng gốc 1210] Thuộc tính maxHistory: 100
    maxHistory:100};
// [VI dòng gốc 1211] Khai báo biến không gán lại bằng const: S = tạo đối tượng gồm running, timer, scheduler, listenerOn, pending, blocked, waitingLoad, modelReads, lastAction, sentStart, sentClaim, confirmedStart, confirmedClaim, timeouts, errors, lastError, history, stoppedReason
  const S={running:false,timer:null,scheduler:null,listenerOn:false,
// [VI dòng gốc 1212] Thuộc tính pending: null | Thuộc tính blocked: null | Thuộc tính waitingLoad: false | Thuộc tính modelReads: 0
    pending:null,blocked:null,waitingLoad:false,modelReads:0,
// [VI dòng gốc 1213] Thuộc tính lastAction: 0 | Thuộc tính sentStart: 0 | Thuộc tính sentClaim: 0 | Thuộc tính confirmedStart: 0
    lastAction:0,sentStart:0,sentClaim:0,confirmedStart:0,confirmedClaim:0,
// [VI dòng gốc 1214] Thuộc tính timeouts: 0 | Thuộc tính errors: 0 | Thuộc tính lastError: "" | Thuộc tính history: tạo mảng gồm 0 vị trí: []
    timeouts:0,errors:0,lastError:'',history:[],stoppedReason:''};
// [VI dòng gốc 1215] Khai báo biến không gán lại bằng const: game = tạo hàm với tham số (không có); mỗi lần gọi trả về nếu typeof _Ba==='undefined' thì lấy null, ngược lại lấy _Ba
  const game=()=>typeof _Ba==='undefined'?null:_Ba;
// [VI dòng gốc 1216] Khai báo biến không gán lại bằng const: actor = tạo hàm với tham số (không có); mỗi lần gọi trả về gọi String(game()?._rJ?._O$?.ins?.actorId??'') để chuyển sang chuỗi
  const actor=()=>String(game()?._rJ?._O$?.ins?.actorId??'');
// [VI dòng gốc 1217] Khai báo biến không gán lại bằng const: model = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc game()?._m8?._gmi?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  const model=()=>game()?._m8?._gmi?.ins;
// [VI dòng gốc 1218] Khai báo biến không gán lại bằng const: api = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc game()?._m8?._bmi?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  const api=()=>game()?._m8?._bmi?.ins;
// [VI dòng gốc 1219] Khai báo biến không gán lại bằng const: now = tạo hàm với tham số (không có); mỗi lần gọi trả về gọi Date.now()
  const now=()=>Date.now();
// [VI dòng gốc 1220] Khai báo biến không gán lại bằng const: utcDayVN = tạo hàm với tham số (không có); mỗi lần gọi trả về gọi new Intl.DateTimeFormat('sv-SE',{timeZone:'Asia/Ho_Chi_Minh',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date())
  const utcDayVN=()=>new Intl.DateTimeFormat('sv-SE',{timeZone:'Asia/Ho_Chi_Minh',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
// [VI dòng gốc 1221] Nội dung nguyên văn của chuỗi mẫu; đây là dữ liệu trong chuỗi, không phải lệnh đang chạy.
  const cacheKey=()=>`KVPV_ESCORT934_LOCK_${MAIN}_${utcDayVN()}`;
// [VI dòng gốc 1222] Khai báo biến không gán lại bằng const: num = tạo hàm với tham số v; mỗi lần gọi trả về nếu v===null||v===undefined||v==='' thì lấy null, ngược lại lấy Number.isSafeInteger(Number(v))?Number(v):null
  const num=v=>(v===null||v===undefined||v==='')?null:(Number.isSafeInteger(Number(v))?Number(v):null);
// [VI dòng gốc 1223] Khai báo biến không gán lại bằng const: note = tạo hàm với tham số kind, detail={} | gọi S.history.push({time:new Date().toISOString(),kind,...detail}) để thêm phần tử vào cuối mảng | Kiểm tra S.history.length>C.maxHistory: đúng thì chạy nhánh sau if. | gọi S.history.shift()
  const note=(kind,detail={})=>{S.history.push({time:new Date().toISOString(),kind,...detail});if(S.history.length>C.maxHistory)S.history.shift();};
// [VI dòng gốc 1224] Định nghĩa hàm limit; tham số: không có | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | Kết thúc hàm hiện tại và trả về: gọi num(_ft?._gY?.ins?.getCfgById?.(31005)?.[2]?.[0]). | Nhận lỗi bằng _ và chạy phần xử lý lỗi.
  function limit(){try{return num(_ft?._gY?.ins?.getCfgById?.(31005)?.[2]?.[0]);}catch(_){return null;}}
// [VI dòng gốc 1225] Chú thích gốc của tác giả; không được thực thi. Nội dung: Gom dữ liệu quan sát thành một ảnh trạng thái phục vụ chẩn đoán hoặc lập kế hoạch.
  // Gom dữ liệu quan sát thành một ảnh trạng thái phục vụ chẩn đoán hoặc lập kế hoạch.
// [VI dòng gốc 1226] Định nghĩa hàm snapshot; tham số: không có. Mục đích: đọc ảnh chụp trạng thái hiện tại
  function snapshot(){
// [VI dòng gốc 1227] Khai báo biến không gán lại bằng const: m = gọi model(); a = gọi api(); hasModel = đảo giá trị đúng/sai của !m
    const m=model(),a=api(),hasModel=!!m;
// [VI dòng gốc 1228] Khai báo biến không gán lại bằng const: state = gọi num(m?.sendState); used = gọi num(m?.escort); max = gọi limit()
    const state=num(m?.sendState),used=num(m?.escort),max=limit();
// [VI dòng gốc 1229] Khai báo biến không gán lại bằng const: fairy = gọi num(m?.fairyId); endTime = gọi num(m?.endTime); doubleRaw = đọc m?.isDouble nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const fairy=num(m?.fairyId),endTime=num(m?.endTime),doubleRaw=m?.isDouble;
// [VI dòng gốc 1230] Khai báo biến không gán lại bằng const: sceneDouble = chạy ngay hàm bao để tạo phạm vi và khởi tạo phần chức năng bên trong | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | Kết thúc hàm hiện tại và trả về: tính biểu thức Number(game()?._sst?._ist?.inst?.getCpSceneStateByType?.(23)?.[2])===2. | Nhận lỗi bằng _ và chạy phần xử lý lỗi.
    const sceneDouble=(()=>{try{return Number(game()?._sst?._ist?.inst?.getCpSceneStateByType?.(23)?.[2])===2;}catch(_){return false;}})();
// [VI dòng gốc 1231] Chú thích gốc của tác giả; không được thực thi. Nội dung: Only server-owned x2 flags; never use fixed guessed clock windows to spend attempts.
    // Only server-owned x2 flags; never use fixed guessed clock windows to spend attempts.
// [VI dòng gốc 1232] Khai báo biến không gán lại bằng const: isDouble = doubleRaw===true||doubleRaw===1||doubleRaw==='1' hoặc dùng vế phải khi vế trái falsy: sceneDouble
    const isDouble=doubleRaw===true||doubleRaw===1||doubleRaw==='1'||sceneDouble;
// [VI dòng gốc 1233] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm modelReady, apiReady, state, used, max, left, fairy, endTime, isDouble, sceneDouble, rawDouble, signature.
    return {modelReady:hasModel&&[0,1,2].includes(state)&&used!==null&&max!==null,
// [VI dòng gốc 1234] Thuộc tính apiReady: typeof a?.escortFairy==='function' và chỉ đánh giá vế phải khi vế trái truthy: typeof a?.getFairyAward==='function'
      apiReady:typeof a?.escortFairy==='function'&&typeof a?.getFairyAward==='function',
// [VI dòng gốc 1235] Thuộc tính state: dùng biến cùng tên | Thuộc tính used: dùng biến cùng tên | Thuộc tính max: dùng biến cùng tên | Thuộc tính left: nếu used!==null&&max!==null thì lấy Math.max(0,max-used), ngược lại lấy null
      state,used,max,left:(used!==null&&max!==null)?Math.max(0,max-used):null,
// [VI dòng gốc 1236] Thuộc tính fairy: dùng biến cùng tên | Thuộc tính endTime: dùng biến cùng tên | Thuộc tính isDouble: dùng biến cùng tên | Thuộc tính sceneDouble: dùng biến cùng tên
      fairy,endTime,isDouble,sceneDouble,rawDouble:doubleRaw??null,
// [VI dòng gốc 1237] Nội dung nguyên văn của chuỗi mẫu; đây là dữ liệu trong chuỗi, không phải lệnh đang chạy.
      signature:`${state??'x'}|${used??'x'}|${fairy??'x'}|${endTime??'x'}`};
// [VI dòng gốc 1238] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 1239] Định nghĩa hàm saveLock; tham số: không có
  function saveLock(){
// [VI dòng gốc 1240] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài.
    try{
// [VI dòng gốc 1241] Kiểm tra S.pending||S.blocked: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gọi sessionStorage.setItem(cacheKey(), JSON.stringify({day:utcDayVN(),pending:S.pending,blocked:S.blocked})) để ghi giá trị vào bộ lưu trữ
      if(S.pending||S.blocked)sessionStorage.setItem(cacheKey(),JSON.stringify({day:utcDayVN(),pending:S.pending,blocked:S.blocked}));
// [VI dòng gốc 1242] gọi sessionStorage.removeItem(cacheKey())
      else sessionStorage.removeItem(cacheKey());
// [VI dòng gốc 1243] Nhận lỗi bằng _ và chạy phần xử lý lỗi.
    }catch(_){/* storage can be disabled */}
// [VI dòng gốc 1244] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 1245] Định nghĩa hàm restoreLock; tham số: không có
  function restoreLock(){
// [VI dòng gốc 1246] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài.
    try{
// [VI dòng gốc 1247] Khai báo biến không gán lại bằng const: value = gọi JSON.parse(sessionStorage.getItem(cacheKey())||'null') để phân tích dữ liệu đầu vào theo API đang gọi
      const value=JSON.parse(sessionStorage.getItem(cacheKey())||'null');
// [VI dòng gốc 1248] Kiểm tra value?.day===utcDayVN(): đúng thì chạy nhánh sau if.
      if(value?.day===utcDayVN()){
// [VI dòng gốc 1249] gán S.pending bằng value.pending||null | gán S.blocked bằng value.blocked||null
        S.pending=value.pending||null;S.blocked=value.blocked||null;
// [VI dòng gốc 1250] Kiểm tra S.pending||S.blocked: đúng thì chạy nhánh sau if. | gọi note('restored-lock-after-reload')
        if(S.pending||S.blocked)note('restored-lock-after-reload');
// [VI dòng gốc 1251] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
      }
// [VI dòng gốc 1252] Nhận lỗi bằng _ và chạy phần xử lý lỗi.
    }catch(_){/* no stored lock */}
// [VI dòng gốc 1253] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 1254] Định nghĩa hàm clearOnServerAck; tham số: s
  function clearOnServerAck(s){
// [VI dòng gốc 1255] Khai báo biến không gán lại bằng const: lock = S.pending hoặc dùng vế phải khi vế trái falsy: S.blocked
    const lock=S.pending||S.blocked;
// [VI dòng gốc 1256] Kiểm tra !lock||!s.modelReady: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(!lock||!s.modelReady)return;
// [VI dòng gốc 1257] Khai báo biến không gán lại bằng const: changed = nếu lock.kind==='start' thì lấy s.state===1||s.state===2||s.used>lock.used||s.endTime!==lock.endTime, ngược lại lấy s.state!==2
    const changed=lock.kind==='start'
// [VI dòng gốc 1258] Tiếp tục hàm clearOnServerAck; thành phần cú pháp bắt đầu bằng ?. Đọc cùng dòng mở phía trên: ? (s.state===1||s.state===2||s.used>lock.used||s.endTime!==lock.endTime)
      ? (s.state===1||s.state===2||s.used>lock.used||s.endTime!==lock.endTime)
// [VI dòng gốc 1259] Tiếp tục hàm clearOnServerAck; thành phần cú pháp bắt đầu bằng :. Đọc cùng dòng mở phía trên: : (s.state!==2);
      : (s.state!==2);
// [VI dòng gốc 1260] Kiểm tra changed: đúng thì chạy nhánh sau if.
    if(changed){
// [VI dòng gốc 1261] Kiểm tra lock.kind==='start': đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | tăng S.confirmedStart một đơn vị sau khi lấy giá trị
      if(lock.kind==='start')S.confirmedStart++;
// [VI dòng gốc 1262] tăng S.confirmedClaim một đơn vị sau khi lấy giá trị
      else S.confirmedClaim++;
// [VI dòng gốc 1263] gọi note('server-confirmed', {action:lock.kind,from:lock.before,to:s.signature,late:!!S.blocked})
      note('server-confirmed',{action:lock.kind,from:lock.before,to:s.signature,late:!!S.blocked});
// [VI dòng gốc 1264] gán S.pending bằng null | gán S.blocked bằng null | gọi saveLock()
      S.pending=null;S.blocked=null;saveLock();
// [VI dòng gốc 1265] Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      return;
// [VI dòng gốc 1266] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 1267] Kiểm tra S.pending && now()-S.pending.at>=C.ackTimeoutMs: đúng thì chạy nhánh sau if.
    if(S.pending && now()-S.pending.at>=C.ackTimeoutMs){
// [VI dòng gốc 1268] gán S.blocked bằng {...S.pending,unconfirmedAt:now()} | gán S.pending bằng null | tăng S.timeouts một đơn vị sau khi lấy giá trị
      S.blocked={...S.pending,unconfirmedAt:now()};S.pending=null;S.timeouts++;
// [VI dòng gốc 1269] gọi note('ack-timeout-locked', {action:S.blocked.kind,before:S.blocked.before})
      note('ack-timeout-locked',{action:S.blocked.kind,before:S.blocked.before});
// [VI dòng gốc 1270] gọi saveLock() | gọi console.warn('[ESCORT934] Server chua xac nhan; khoa de tranh gui lap:', S.blocked.kind)
      saveLock();console.warn('[ESCORT934] Server chua xac nhan; khoa de tranh gui lap:',S.blocked.kind);
// [VI dòng gốc 1271] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 1272] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 1273] Định nghĩa hàm legacyDisable; tham số: không có
  function legacyDisable(){
// [VI dòng gốc 1274] Khai báo biến không gán lại bằng const: V = đọc W.KVPV_V8 | Kiểm tra typeof V?.toggle!=='function': đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    const V=W.KVPV_V8;if(typeof V?.toggle!=='function')return;
// [VI dòng gốc 1275] Chú thích gốc của tác giả; không được thực thi. Nội dung: Old 8.6.25 reward plugin uses an over-broad daily lock;
    // Old 8.6.25 reward plugin uses an over-broad daily lock;
// [VI dòng gốc 1276] Chú thích gốc của tác giả; không được thực thi. Nội dung: old 8.6.23 start was intentionally disabled. This module owns escort only.
    // old 8.6.23 start was intentionally disabled. This module owns escort only.
// [VI dòng gốc 1277] Duyệt từng giá trị trong ['e23_escort_start','e23_escort_claim','e25_escort_reward_ack'] bằng const id. | Khai báo biến không gán lại bằng const: id (chưa gán giá trị)
    for(const id of ['e23_escort_start','e23_escort_claim','e25_escort_reward_ack']){
// [VI dòng gốc 1278] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | gọi V.toggle(id, false) | Nhận lỗi bằng _ và chạy phần xử lý lỗi.
      try{V.toggle(id,false);}catch(_){/* plugin may not exist */}
// [VI dòng gốc 1279] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 1280] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 1281] Định nghĩa hàm legacyPending; tham số: không có
  function legacyPending(){
// [VI dòng gốc 1282] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | Kết thúc hàm hiện tại và trả về: tính biểu thức W.KVPV_EVENTS25?.status?.(false)?.actions?.some(x=>x.key==='escort'&&x.pending)===true.
    try{return W.KVPV_EVENTS25?.status?.(false)?.actions?.some(x=>x.key==='escort'&&x.pending)===true;}
// [VI dòng gốc 1283] Nhận lỗi bằng _ và chạy phần xử lý lỗi. | Kết thúc hàm hiện tại và trả về: false.
    catch(_){return false;}
// [VI dòng gốc 1284] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 1285] Định nghĩa hàm plan; tham số: s=snapshot()
  function plan(s=snapshot()){
// [VI dòng gốc 1286] Khai báo biến có thể gán lại bằng let: action = "wait"; reason = ""
    let action='wait',reason='';
// [VI dòng gốc 1287] Kiểm tra actor()!==MAIN: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gán reason bằng 'Sai tai khoan MAIN'
    if(actor()!==MAIN)reason='Sai tai khoan MAIN';
// [VI dòng gốc 1288] Kiểm tra !S.running||!C.enabled: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gán reason bằng 'Da tam dung'
    else if(!S.running||!C.enabled)reason='Da tam dung';
// [VI dòng gốc 1289] Kiểm tra W.__KVPV_UNIVERSAL_HALTED: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gán reason bằng 'FULL da dung'
    else if(W.__KVPV_UNIVERSAL_HALTED)reason='FULL da dung';
// [VI dòng gốc 1290] Kiểm tra !s.modelReady: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gán reason bằng 'Doi du lieu Ho Tong tu server'
    else if(!s.modelReady)reason='Doi du lieu Ho Tong tu server';
// [VI dòng gốc 1291] Kiểm tra !s.apiReady: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gán reason bằng 'Thieu native Ho Tong'
    else if(!s.apiReady)reason='Thieu native Ho Tong';
// [VI dòng gốc 1292] Nội dung nguyên văn của chuỗi mẫu; đây là dữ liệu trong chuỗi, không phải lệnh đang chạy.
    else if(S.pending)reason=`Dang doi server ACK: ${S.pending.kind}`;
// [VI dòng gốc 1293] Nội dung nguyên văn của chuỗi mẫu; đây là dữ liệu trong chuỗi, không phải lệnh đang chạy.
    else if(S.blocked)reason=`Da khoa vi khong co ACK: ${S.blocked.kind}`;
// [VI dòng gốc 1294] Kiểm tra now()-S.lastAction<C.minActionGapMs: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gán reason bằng 'Gian cach toi thieu giua thao tac'
    else if(now()-S.lastAction<C.minActionGapMs)reason='Gian cach toi thieu giua thao tac';
// [VI dòng gốc 1295] Kiểm tra S.sentStart+S.sentClaim>=C.maxActionsPerSession: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gán reason bằng 'Dat gioi han lenh trong phien'
    else if(S.sentStart+S.sentClaim>=C.maxActionsPerSession)reason='Dat gioi han lenh trong phien';
// [VI dòng gốc 1296] Kiểm tra s.state===1: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gán reason bằng 'Dang ho tong (cho server ket thuc)'
    else if(s.state===1)reason='Dang ho tong (cho server ket thuc)';
// [VI dòng gốc 1297] Kiểm tra s.state===2: đúng thì chạy nhánh sau if, sai thì chạy nhánh else.
    else if(s.state===2){
// [VI dòng gốc 1298] Kiểm tra !C.autoClaim: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gán reason bằng 'Tu nhan thuong dang tat'
      if(!C.autoClaim)reason='Tu nhan thuong dang tat';
// [VI dòng gốc 1299] Kiểm tra legacyPending(): đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gán reason bằng 'Dang co lenh nhan thuong cu cho ACK'
      else if(legacyPending())reason='Dang co lenh nhan thuong cu cho ACK';
// [VI dòng gốc 1300] gán action bằng 'claim'
      else action='claim';
// [VI dòng gốc 1301] Kiểm tra s.state===0: đúng thì chạy nhánh sau if, sai thì chạy nhánh else.
    }else if(s.state===0){
// [VI dòng gốc 1302] Kiểm tra !C.autoStart: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gán reason bằng 'Tu bat dau dang tat'
      if(!C.autoStart)reason='Tu bat dau dang tat';
// [VI dòng gốc 1303] Kiểm tra C.onlyDouble&&!s.isDouble: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gán reason bằng 'Dang cho Ho Tong x2'
      else if(C.onlyDouble&&!s.isDouble)reason='Dang cho Ho Tong x2';
// [VI dòng gốc 1304] Kiểm tra s.left===null||s.left<=0: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gán reason bằng 'Het luot ho tong'
      else if(s.left===null||s.left<=0)reason='Het luot ho tong';
// [VI dòng gốc 1305] Kiểm tra !(s.fairy>0): đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gán reason bằng 'Chua co Tien Nu mac dinh duoc server xac nhan'
      else if(!(s.fairy>0))reason='Chua co Tien Nu mac dinh duoc server xac nhan';
// [VI dòng gốc 1306] gán action bằng 'start'
      else action='start';
// [VI dòng gốc 1307] gán reason bằng 'Trang thai chua biet'
    }else reason='Trang thai chua biet';
// [VI dòng gốc 1308] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm ready, action, reason, snapshot.
    return {ready:action!=='wait',action,reason:reason||'San sang',snapshot:s};
// [VI dòng gốc 1309] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 1310] Định nghĩa hàm doNative; tham số: action, s
  function doNative(action,s){
// [VI dòng gốc 1311] Khai báo biến không gán lại bằng const: a = gọi api() | Khai báo biến không gán lại bằng const: meth = nếu action==='start' thì lấy 'escortFairy', ngược lại lấy 'getFairyAward'
    const a=api();const meth=action==='start'?'escortFairy':'getFairyAward';
// [VI dòng gốc 1312] Kiểm tra typeof a?.[meth]!=='function': đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(typeof a?.[meth]!=='function')return;
// [VI dòng gốc 1313] Khai báo biến không gán lại bằng const: recheck = gọi plan() | Kiểm tra !recheck.ready||recheck.action!==action||recheck.snapshot.signature!==s.signature: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    const recheck=plan();if(!recheck.ready||recheck.action!==action||recheck.snapshot.signature!==s.signature)return;
// [VI dòng gốc 1314] Khai báo biến không gán lại bằng const: lock = tạo đối tượng gồm kind, at, before, state, used, endTime, refreshDone
    const lock={kind:action,at:now(),before:s.signature,state:s.state,used:s.used,endTime:s.endTime,refreshDone:false};
// [VI dòng gốc 1315] gán S.pending bằng lock | gán S.lastAction bằng lock.at | gọi saveLock()
    S.pending=lock;S.lastAction=lock.at;saveLock();
// [VI dòng gốc 1316] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài.
    try{
// [VI dòng gốc 1317] gọi a[meth]()
      a[meth]();
// [VI dòng gốc 1318] Kiểm tra action==='start': đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | tăng S.sentStart một đơn vị sau khi lấy giá trị | tăng S.sentClaim một đơn vị sau khi lấy giá trị
      if(action==='start')S.sentStart++;else S.sentClaim++;
// [VI dòng gốc 1319] gọi note('sent-native', {action,method:meth,before:s.signature,left:s.left,double:s.isDouble})
      note('sent-native',{action,method:meth,before:s.signature,left:s.left,double:s.isDouble});
// [VI dòng gốc 1320] Nhận lỗi bằng e và chạy phần xử lý lỗi.
    }catch(e){
// [VI dòng gốc 1321] Chú thích gốc của tác giả; không được thực thi. Nội dung: An exception does not prove that the network message was not sent.
      // An exception does not prove that the network message was not sent.
// [VI dòng gốc 1322] gán S.lastError bằng String(e?.message??e) | tăng S.errors một đơn vị sau khi lấy giá trị
      S.lastError=String(e?.message??e);S.errors++;
// [VI dòng gốc 1323] gán S.blocked bằng {...lock,error:S.lastError} | gán S.pending bằng null | gọi saveLock()
      S.blocked={...lock,error:S.lastError};S.pending=null;saveLock();
// [VI dòng gốc 1324] gọi note('native-error-locked', {action,error:S.lastError})
      note('native-error-locked',{action,error:S.lastError});
// [VI dòng gốc 1325] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 1326] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 1327] Chú thích gốc của tác giả; không được thực thi. Nội dung: Thực hiện một lượt kiểm tra của module; các nhánh bên dưới quyết định có đủ điều kiện để hành động hay phải chờ.
  // Thực hiện một lượt kiểm tra của module; các nhánh bên dưới quyết định có đủ điều kiện để hành động hay phải chờ.
// [VI dòng gốc 1328] Định nghĩa hàm tick; tham số: không có. Mục đích: xử lý một nhịp kiểm tra
  function tick(){
// [VI dòng gốc 1329] Kiểm tra !S.running: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(!S.running)return;
// [VI dòng gốc 1330] Kiểm tra actor()!==MAIN||W.__KVPV_UNIVERSAL_HALTED: đúng thì chạy nhánh sau if. | gán S.stoppedReason bằng 'actor-mismatch-or-full-stopped' | gọi stop() để dừng bộ điều khiển và dọn tài nguyên | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(actor()!==MAIN||W.__KVPV_UNIVERSAL_HALTED){S.stoppedReason='actor-mismatch-or-full-stopped';stop();return;}
// [VI dòng gốc 1331] gọi legacyDisable()
    legacyDisable();
// [VI dòng gốc 1332] Khai báo biến có thể gán lại bằng let: s = gọi snapshot() để đọc ảnh chụp trạng thái hiện tại | gọi clearOnServerAck(s)
    let s=snapshot();clearOnServerAck(s);
// [VI dòng gốc 1333] Chú thích gốc của tác giả; không được thực thi. Nội dung: A single read-only refresh if the initial server model is missing.
    // A single read-only refresh if the initial server model is missing.
// [VI dòng gốc 1334] Kiểm tra !s.modelReady: đúng thì chạy nhánh sau if.
    if(!s.modelReady){
// [VI dòng gốc 1335] Kiểm tra C.readWhenNoModel&&S.modelReads===0&&typeof api()?.getFairyInfo==='function': đúng thì chạy nhánh sau if.
      if(C.readWhenNoModel&&S.modelReads===0&&typeof api()?.getFairyInfo==='function'){
// [VI dòng gốc 1336] tăng S.modelReads một đơn vị sau khi lấy giá trị | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | gọi api().getFairyInfo() | gọi note('read-initial-fairy-info')
        S.modelReads++;try{api().getFairyInfo();note('read-initial-fairy-info');}
// [VI dòng gốc 1337] Nhận lỗi bằng e và chạy phần xử lý lỗi. | tăng S.errors một đơn vị sau khi lấy giá trị | gán S.lastError bằng String(e)
        catch(e){S.errors++;S.lastError=String(e);}
// [VI dòng gốc 1338] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
      }
// [VI dòng gốc 1339] Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      return;
// [VI dòng gốc 1340] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 1341] Chú thích gốc của tác giả; không được thực thi. Nội dung: One re-read after a sent action, but never issue the action again without server ACK.
    // One re-read after a sent action, but never issue the action again without server ACK.
// [VI dòng gốc 1342] Kiểm tra S.pending&&!S.pending.refreshDone&&now()-S.pending.at>=C.refreshAfterMs: đúng thì chạy nhánh sau if.
    if(S.pending&&!S.pending.refreshDone&&now()-S.pending.at>=C.refreshAfterMs){
// [VI dòng gốc 1343] gán S.pending.refreshDone bằng true | gọi saveLock()
      S.pending.refreshDone=true;saveLock();
// [VI dòng gốc 1344] Kiểm tra typeof api()?.getFairyInfo==='function': đúng thì chạy nhánh sau if.
      if(typeof api()?.getFairyInfo==='function'){
// [VI dòng gốc 1345] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | gọi api().getFairyInfo() | gọi note('refresh-info-for-ack', {action:S.pending.kind})
        try{api().getFairyInfo();note('refresh-info-for-ack',{action:S.pending.kind});}
// [VI dòng gốc 1346] Nhận lỗi bằng e và chạy phần xử lý lỗi. | tăng S.errors một đơn vị sau khi lấy giá trị | gán S.lastError bằng String(e)
        catch(e){S.errors++;S.lastError=String(e);}
// [VI dòng gốc 1347] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
      }
// [VI dòng gốc 1348] Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      return;
// [VI dòng gốc 1349] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 1350] Kiểm tra S.pending||S.blocked: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(S.pending||S.blocked)return;
// [VI dòng gốc 1351] Khai báo biến không gán lại bằng const: p = gọi plan(s) | Kiểm tra p.ready: đúng thì chạy nhánh sau if. | gọi doNative(p.action, p.snapshot)
    const p=plan(s);if(p.ready)doNative(p.action,p.snapshot);
// [VI dòng gốc 1352] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 1353] Khai báo biến không gán lại bằng const: listener = tạo đối tượng gồm onFairy | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | gọi tick() để xử lý một nhịp kiểm tra | Nhận lỗi bằng e và chạy phần xử lý lỗi.
  const listener={onFairy(){try{tick();}catch(e){S.errors++;S.lastError=String(e);}}};
// [VI dòng gốc 1354] Định nghĩa hàm attach; tham số: không có | Kiểm tra S.listenerOn||typeof _Sa==='undefined'||typeof _Sa.notify?.on!=='function': đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  function attach(){if(S.listenerOn||typeof _Sa==='undefined'||typeof _Sa.notify?.on!=='function')return;
// [VI dòng gốc 1355] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | gọi _Sa.notify.on(5464, listener, listener.onFairy) | gán S.listenerOn bằng true | Nhận lỗi bằng _ và chạy phần xử lý lỗi.
    try{_Sa.notify.on(5464,listener,listener.onFairy);S.listenerOn=true;}catch(_){window.KVPV_V1?.diagnostics?.record(_);}}
// [VI dòng gốc 1356] Định nghĩa hàm detach; tham số: không có | Kiểm tra !S.listenerOn: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  function detach(){if(!S.listenerOn)return;
// [VI dòng gốc 1357] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | gọi _Sa?.notify?.off(5464, listener, listener.onFairy) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Nhận lỗi bằng _ và chạy phần xử lý lỗi. | gọi window.KVPV_V1?.diagnostics?.record(_) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    try{_Sa?.notify?.off?.(5464,listener,listener.onFairy);}catch(_){window.KVPV_V1?.diagnostics?.record(_);}
// [VI dòng gốc 1358] gán S.listenerOn bằng false
    S.listenerOn=false;
// [VI dòng gốc 1359] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 1360] Chú thích gốc của tác giả; không được thực thi. Nội dung: Bật bộ điều khiển và lịch kiểm tra của module; trả trạng thái sau khi khởi động.
  // Bật bộ điều khiển và lịch kiểm tra của module; trả trạng thái sau khi khởi động.
// [VI dòng gốc 1361] Định nghĩa hàm start; tham số: không có. Mục đích: khởi động bộ điều khiển
  function start(){
// [VI dòng gốc 1362] Kiểm tra S.running: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: gọi status() để trả trạng thái để kiểm tra.
    if(S.running)return status();
// [VI dòng gốc 1363] Kiểm tra actor()!==MAIN: đúng thì chạy nhánh sau if. | gọi console.warn('[ESCORT934] Chi chay tai MAIN') | Kết thúc hàm hiện tại và trả về: gọi status() để trả trạng thái để kiểm tra.
    if(actor()!==MAIN){console.warn('[ESCORT934] Chi chay tai MAIN');return status();}
// [VI dòng gốc 1364] gán S.running bằng true | gán S.stoppedReason bằng '' | gọi legacyDisable() | gọi attach()
    S.running=true;S.stoppedReason='';legacyDisable();attach();
// [VI dòng gốc 1365] Khai báo biến không gán lại bằng const: job = tạo hàm với tham số (không có) | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | gọi tick() để xử lý một nhịp kiểm tra | Nhận lỗi bằng e và chạy phần xử lý lỗi.
    const job=()=>{try{tick();}catch(e){S.errors++;S.lastError=String(e);note('tick-error',{error:S.lastError});}};
// [VI dòng gốc 1366] Kiểm tra typeof __KVPV29!=='undefined'&&typeof __KVPV29.every==='function': đúng thì chạy nhánh sau if, sai thì chạy nhánh else.
    if(typeof __KVPV29!=='undefined'&&typeof __KVPV29.every==='function'){
// [VI dòng gốc 1367] gán S.scheduler bằng 'shared' | gán S.timer bằng __KVPV29.every(job,C.pollMs)
      S.scheduler='shared';S.timer=__KVPV29.every(job,C.pollMs);
// [VI dòng gốc 1368] gán S.scheduler bằng 'interval' | gán S.timer bằng setInterval(job,C.pollMs)
    }else{S.scheduler='interval';S.timer=setInterval(job,C.pollMs);}
// [VI dòng gốc 1369] gọi job() | Kết thúc hàm hiện tại và trả về: gọi status() để trả trạng thái để kiểm tra.
    job();return status();
// [VI dòng gốc 1370] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 1371] Chú thích gốc của tác giả; không được thực thi. Nội dung: Dừng bộ điều khiển, hủy lịch và giải phóng tài nguyên do module này sở hữu.
  // Dừng bộ điều khiển, hủy lịch và giải phóng tài nguyên do module này sở hữu.
// [VI dòng gốc 1372] Định nghĩa hàm stop; tham số: không có. Mục đích: dừng bộ điều khiển và dọn tài nguyên
  function stop(){
// [VI dòng gốc 1373] gán S.running bằng false
    S.running=false;
// [VI dòng gốc 1374] Kiểm tra S.timer!=null: đúng thì chạy nhánh sau if.
    if(S.timer!=null){
// [VI dòng gốc 1375] Kiểm tra S.scheduler==='shared'&&typeof __KVPV29!=='undefined': đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gọi __KVPV29.cancel(S.timer)
      if(S.scheduler==='shared'&&typeof __KVPV29!=='undefined')__KVPV29.cancel(S.timer);
// [VI dòng gốc 1376] gọi clearInterval(S.timer) để hủy tác vụ lặp
      else clearInterval(S.timer);
// [VI dòng gốc 1377] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 1378] gán S.timer bằng null | gán S.scheduler bằng null | gọi detach() | Kết thúc hàm hiện tại và trả về: gọi status() để trả trạng thái để kiểm tra.
    S.timer=null;S.scheduler=null;detach();return status();
// [VI dòng gốc 1379] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 1380] Chú thích gốc của tác giả; không được thực thi. Nội dung: Trả trạng thái hiện tại để kiểm tra; ý nghĩa từng bộ đếm thuộc phạm vi module này.
  // Trả trạng thái hiện tại để kiểm tra; ý nghĩa từng bộ đếm thuộc phạm vi module này.
// [VI dòng gốc 1381] Định nghĩa hàm status; tham số: không có. Mục đích: trả trạng thái để kiểm tra | Khai báo biến không gán lại bằng const: s = gọi snapshot() để đọc ảnh chụp trạng thái hiện tại; p = gọi plan(s) | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm version, running, actor, onlyDouble, state, stateLabel, used, left, dailyLimit, isDouble, fairyId, action, reason, pending, blocked, sentStart, sentClaim, serverConfirmedStart, serverConfirmedClaim, timeouts, errors, lastError, stoppedReason, tower.
  function status(){const s=snapshot(),p=plan(s);return {
// [VI dòng gốc 1382] Thuộc tính version: "9.3.4" | Thuộc tính running: đọc S.running | Thuộc tính actor: gọi actor() để ID nhân vật sở hữu phiên này | Thuộc tính onlyDouble: đọc C.onlyDouble
    version:'9.3.4',running:S.running,actor:actor(),onlyDouble:C.onlyDouble,
// [VI dòng gốc 1383] Thuộc tính state: đọc s.state | Thuộc tính stateLabel: {0:'CHO BAT DAU',1:'DANG HO TONG',2:'NHAN THUONG'}[s.state] hoặc dùng vế phải khi vế trái falsy: 'CHUA TAI' | Thuộc tính 0: "CHO BAT DAU" | Thuộc tính 1: "DANG HO TONG"
    state:s.state,stateLabel:{0:'CHO BAT DAU',1:'DANG HO TONG',2:'NHAN THUONG'}[s.state]||'CHUA TAI',
// [VI dòng gốc 1384] Thuộc tính used: đọc s.used | Thuộc tính left: đọc s.left | Thuộc tính dailyLimit: đọc s.max | Thuộc tính isDouble: đọc s.isDouble
    used:s.used,left:s.left,dailyLimit:s.max,isDouble:s.isDouble,fairyId:s.fairy,
// [VI dòng gốc 1385] Thuộc tính action: đọc p.action | Thuộc tính reason: đọc p.reason | Thuộc tính pending: đọc S.pending | Thuộc tính blocked: đọc S.blocked
    action:p.action,reason:p.reason,pending:S.pending,blocked:S.blocked,
// [VI dòng gốc 1386] Thuộc tính sentStart: đọc S.sentStart | Thuộc tính sentClaim: đọc S.sentClaim | Thuộc tính serverConfirmedStart: đọc S.confirmedStart
    sentStart:S.sentStart,sentClaim:S.sentClaim,serverConfirmedStart:S.confirmedStart,
// [VI dòng gốc 1387] Thuộc tính serverConfirmedClaim: đọc S.confirmedClaim | Thuộc tính timeouts: đọc S.timeouts | Thuộc tính errors: đọc S.errors
    serverConfirmedClaim:S.confirmedClaim,timeouts:S.timeouts,errors:S.errors,
// [VI dòng gốc 1388] Thuộc tính lastError: đọc S.lastError | Thuộc tính stoppedReason: đọc S.stoppedReason | Thuộc tính tower: "manual-only"
    lastError:S.lastError,stoppedReason:S.stoppedReason,tower:'manual-only'
// [VI dòng gốc 1389] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  };}
// [VI dòng gốc 1390] Chú thích gốc của tác giả; không được thực thi. Nội dung: Tổng hợp số liệu và lịch sử cho việc chẩn đoán; phân biệt quan sát với xác nhận từ game.
  // Tổng hợp số liệu và lịch sử cho việc chẩn đoán; phân biệt quan sát với xác nhận từ game.
// [VI dòng gốc 1391] Định nghĩa hàm report; tham số: không có | Khai báo biến không gán lại bằng const: s = gọi status() để trả trạng thái để kiểm tra | gọi console.table([{ running:s.running,state:s.stateLabel,left:s.left,limit:s.dailyLimit, x2:s.isDouble,action:s.action,reason:s.reason,st…)
  function report(){const s=status();console.table([{
// [VI dòng gốc 1392] Thuộc tính running: đọc s.running | Thuộc tính state: đọc s.stateLabel | Thuộc tính left: đọc s.left | Thuộc tính limit: đọc s.dailyLimit
    running:s.running,state:s.stateLabel,left:s.left,limit:s.dailyLimit,
// [VI dòng gốc 1393] Thuộc tính x2: đọc s.isDouble | Thuộc tính action: đọc s.action | Thuộc tính reason: đọc s.reason | Thuộc tính started: đọc s.sentStart
    x2:s.isDouble,action:s.action,reason:s.reason,started:s.sentStart,
// [VI dòng gốc 1394] Thuộc tính claimed: đọc s.sentClaim | Thuộc tính ackStart: đọc s.serverConfirmedStart | Thuộc tính ackClaim: đọc s.serverConfirmedClaim
    claimed:s.sentClaim,ackStart:s.serverConfirmedStart,ackClaim:s.serverConfirmedClaim,
// [VI dòng gốc 1395] Thuộc tính pending: đảo giá trị đúng/sai của !s.pending | Thuộc tính blocked: đảo giá trị đúng/sai của !s.blocked
    pending:!!s.pending,blocked:!!s.blocked
// [VI dòng gốc 1396] Kết thúc hàm hiện tại và trả về: s.
  }]);return s;}
// [VI dòng gốc 1397] Chú thích gốc của tác giả; không được thực thi. Nội dung: Locks persisted across page reload; never offer unsafe instant retry.
  // Locks persisted across page reload; never offer unsafe instant retry.
// [VI dòng gốc 1398] gọi restoreLock()
  restoreLock();
// [VI dòng gốc 1399] gán W[NAME] bằng {installed:true,version:'9.3.4',config:C,start,stop,status,report, history:()=>S.history.slice(),check:()=>plan(), [mở chú thích] A manual reset should be used only after the player verifies i…
  W[NAME]={installed:true,version:'9.3.4',config:C,start,stop,status,report,
// [VI dòng gốc 1400] Thuộc tính history: tạo hàm với tham số (không có); mỗi lần gọi trả về gọi S.history.slice() để lấy một đoạn dữ liệu | Thuộc tính check: tạo hàm với tham số (không có); mỗi lần gọi trả về gọi plan()
    history:()=>S.history.slice(),check:()=>plan(),
// [VI dòng gốc 1401] Chú thích gốc của tác giả; không được thực thi. Nội dung: A manual reset should be used only after the player verifies in-game state. [đóng chú thích]
    /* A manual reset should be used only after the player verifies in-game state. */
// [VI dòng gốc 1402] Kiểm tra S.pending: đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('Dang doi ACK, khong xoa khoa')
    resetUnconfirmedAfterReview(){if(S.pending)throw Error('Dang doi ACK, khong xoa khoa');
// [VI dòng gốc 1403] Kiểm tra !S.blocked: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: false.
      if(!S.blocked)return false;
// [VI dòng gốc 1404] gán S.blocked bằng null | gọi saveLock() | gọi note('lock-manually-cleared-after-review') | Kết thúc hàm hiện tại và trả về: true.
      S.blocked=null;saveLock();note('lock-manually-cleared-after-review');return true;
// [VI dòng gốc 1405] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }};
// [VI dòng gốc 1406] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | gọi start() để khởi động bộ điều khiển | Nhận lỗi bằng e và chạy phần xử lý lỗi. | gán S.lastError bằng String(e)
  try{start();}catch(e){S.lastError=String(e);S.errors++;stop();console.warn('[ESCORT934] Khoi tao loi',e);}
// [VI dòng gốc 1407] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: })();
})();
// [VI dòng gốc 1408] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  });
// [VI dòng gốc 1409] gán W.KVPV_ACCOUNT_FEATURES bằng Object.freeze({status:()=>({actorId:actor,modules:results.map(x=>({...x}))})})
  W.KVPV_ACCOUNT_FEATURES=Object.freeze({status:()=>({actorId:actor,modules:results.map(x=>({...x}))})});
// [VI dòng gốc 1410] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: })();
})();
// [VI dòng gốc 1411] Dòng trống để tách các phần, không có lệnh thực thi.
