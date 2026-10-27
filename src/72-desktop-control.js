// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: Bảng Windows chỉ thay cấu hình qua danh sách API có sẵn; nhận đúng actor và revision. [đóng chú thích]
/* Bảng Windows chỉ thay cấu hình qua danh sách API có sẵn; nhận đúng actor và revision. */
// [VI dòng gốc 2] chạy ngay hàm bao để tạo phạm vi và khởi tạo phần chức năng bên trong
(() => {
// [VI dòng gốc 3] "use strict" | Khai báo biến không gán lại bằng const: W = window; old = đọc W.KVPV_DESKTOP_CONTROL; carry = gọi old?._handoff(); chức năng nội bộ chưa xác minh từ tên hàm (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gọi old?.stop() để dừng bộ điều khiển và dọn tài nguyên (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
 'use strict';const W=window,old=W.KVPV_DESKTOP_CONTROL,carry=old?._handoff?.();old?.stop?.();
// [VI dòng gốc 4] Khai báo biến không gán lại bằng const: actor = gọi String(W.__KVPV_OWN_ACTOR_ID||'') để chuyển sang chuỗi; schema = W.__KVPV_CONTROL_SCHEMA hoặc dùng vế phải khi vế trái là null/undefined: {}
 const actor=String(W.__KVPV_OWN_ACTOR_ID||''),schema=W.__KVPV_CONTROL_SCHEMA??{};
// [VI dòng gốc 5] Khai báo biến có thể gán lại bằng let: desired = nếu carry?.actor===actor thì lấy carry.desired, ngược lại lấy null; applied = ""; timer = null; reason = "waiting_desktop"; error = ""; combatApi = null; stageRevision = ""; stageStopRevision = ""; stageStopApi = null; failedRevision = nếu carry?.actor===actor thì lấy carry.failedRevision, ngược lại lấy ''
 let desired=carry?.actor===actor?carry.desired:null,applied='',timer=null,reason='waiting_desktop',error='',combatApi=null,stageRevision='',stageStopRevision='',stageStopApi=null,failedRevision=carry?.actor===actor?carry.failedRevision:'';
// [VI dòng gốc 6] Khai báo biến không gán lại bằng const: targets = tạo đối tượng bằng Map(); states = tạo đối tượng bằng Map()
 const targets=new Map(),states=new Map();
// [VI dòng gốc 7] Khai báo biến có thể gán lại bằng let: roadApi = null
 let roadApi=null;
// [VI dòng gốc 8] Định nghĩa hàm validCombatProfiles; tham số: profiles | Kết thúc hàm hiện tại và trả về: !!profiles&&typeof profiles==='object'&&!Array.isArray(profiles) và chỉ đánh giá vế phải khi vế trái truthy: Object.entries(profiles).every(([scope,p])=>['THIEN_QUAN','LINH_LUNG','PHU_VAN','TRU_TIEN','ROAD_TRIAL'].includes(scope)&&p&&typeof p==='object'&&!Array.isArray(p)&&['mode','distan….
 function validCombatProfiles(profiles){return !!profiles&&typeof profiles==='object'&&!Array.isArray(profiles)&&Object.entries(profiles).every(([scope,p])=>['THIEN_QUAN','LINH_LUNG','PHU_VAN','TRU_TIEN','ROAD_TRIAL'].includes(scope)&&p&&typeof p==='object'&&!Array.isArray(p)&&['mode','distance','intervalMs'].every(k=>Object.hasOwn(p,k))&&Object.keys(p).every(k=>['mode','distance','intervalMs','rideFollow','mansionFollow'].includes(k))&&['rideFollow','mansionFollow'].every(k=>p[k]===undefined||typeof p[k]==='boolean')&&(scope==='ROAD_TRIAL'?['native','basic8001']:['mixed','basic8001']).includes(p.mode)&&Number.isSafeInteger(p.intervalMs)&&p.intervalMs>=0&&p.intervalMs<=5000&&Number.isFinite(p.distance)&&p.distance>=(scope==='ROAD_TRIAL'?20:281)&&p.distance<=(scope==='ROAD_TRIAL'?150:600));}
// [VI dòng gốc 9] Định nghĩa hàm scopeProfile; tham số: scope | Kết thúc hàm hiện tại và trả về: desired?.combatProfiles?.[scope] hoặc dùng vế phải khi vế trái là null/undefined: null.
 function scopeProfile(scope){return desired?.combatProfiles?.[scope]??null;}
// [VI dòng gốc 10] Định nghĩa hàm valid; tham số: p | Kết thúc hàm hiện tại và trả về: p&&String(p.actor)===actor&&/^[a-f0-9]{32}$/.test(p.revision)&&Object.keys(p).every(k=>['actor','revision','modules','distance','animationSpeed','stageAuto','dailyEnabled','roadCom… và chỉ đánh giá vế phải khi vế trái truthy: p.modules===undefined||p.modules&&typeof p.modules==='object'&&!Array.isArray(p.modules)&&Object.entries(p.modules).every(([file,on])=>Object.prototype.hasOwnProperty.call(schema,f….
 function valid(p){return p&&String(p.actor)===actor&&/^[a-f0-9]{32}$/.test(p.revision)&&Object.keys(p).every(k=>['actor','revision','modules','distance','animationSpeed','stageAuto','dailyEnabled','roadCombatMode','towerBasicOnly','roadMinCastMs','combatProfiles'].includes(k))&&
// [VI dòng gốc 11] gọi Number.isFinite(p.distance) | gọi [1,9,99].includes(p.animationSpeed) để kiểm tra dữ liệu có chứa giá trị
  (p.distance===undefined||Number.isFinite(p.distance)&&p.distance>=281&&p.distance<=600)&&(p.animationSpeed===undefined||[1,9,99].includes(p.animationSpeed))&&
// [VI dòng gốc 12] gọi ['native','basic8001'].includes(p.roadCombatMode) để kiểm tra dữ liệu có chứa giá trị | gọi Number.isSafeInteger(p.roadMinCastMs)
  (p.stageAuto===undefined||typeof p.stageAuto==='boolean')&&(p.dailyEnabled===undefined||p.dailyEnabled===true)&&(p.roadCombatMode===undefined||['native','basic8001'].includes(p.roadCombatMode))&&(p.towerBasicOnly===undefined||typeof p.towerBasicOnly==='boolean')&&(p.roadMinCastMs===undefined||Number.isSafeInteger(p.roadMinCastMs)&&p.roadMinCastMs>=0&&p.roadMinCastMs<=5000)&&
// [VI dòng gốc 13] Định nghĩa hàm hàm không đặt tên; tham số: [file,on]
  (p.combatProfiles===undefined||validCombatProfiles(p.combatProfiles))&&(p.modules===undefined||p.modules&&typeof p.modules==='object'&&!Array.isArray(p.modules)&&Object.entries(p.modules).every(([file,on])=>Object.prototype.hasOwnProperty.call(schema,file)&&typeof on==='boolean'));}
// [VI dòng gốc 14] Định nghĩa hàm receive; tham số: rows | Kiểm tra !Array.isArray(rows)||rows.length>8: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: false. | Khai báo biến không gán lại bằng const: p = gọi rows.find(x=>String(x?.actor)===actor) để tìm phần tử đầu tiên thỏa điều kiện
 function receive(rows){if(!Array.isArray(rows)||rows.length>8)return false;const p=rows.find(x=>String(x?.actor)===actor);if(!p)return false;if(!valid(p)){reason='invalid_desktop_profile';return false;}
// [VI dòng gốc 15] Kiểm tra desired?.revision!==p.revision: đúng thì chạy nhánh sau if. | gán desired bằng JSON.parse(JSON.stringify(p)) | gán error bằng '' | gán failedRevision bằng ''
  if(desired?.revision!==p.revision){desired=JSON.parse(JSON.stringify(p));error='';failedRevision='';}tick();return true;}
// [VI dòng gốc 16] Định nghĩa hàm tick; tham số: không có. Mục đích: xử lý một nhịp kiểm tra | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài.
 function tick(){try{
// [VI dòng gốc 17] Kiểm tra !desired||failedRevision===desired.revision||String(W._Ba?._rJ?._O$?.ins?.actorId??'')!==actor||W.__KVPV_UNIVERSAL_HALTED: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  if(!desired||failedRevision===desired.revision||String(W._Ba?._rJ?._O$?.ins?.actorId??'')!==actor||W.__KVPV_UNIVERSAL_HALTED)return;
// [VI dòng gốc 18] Chú thích gốc của tác giả; không được thực thi. Nội dung: Lệnh dừng cục bộ phải có hiệu lực cả khi đang mở giao diện hoặc nhân vật chết.
  // Lệnh dừng cục bộ phải có hiệu lực cả khi đang mở giao diện hoặc nhân vật chết.
// [VI dòng gốc 19] Kiểm tra desired.stageAuto===false: đúng thì chạy nhánh sau if. | Khai báo biến không gán lại bằng const: daily = đọc W.KVPV_DAILY | Kiểm tra typeof daily?.tuVuotStop!=='function': đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('Stage API unavailable')
  if(desired.stageAuto===false){const daily=W.KVPV_DAILY;if(typeof daily?.tuVuotStop!=='function')throw Error('Stage API unavailable');if(stageStopRevision!==desired.revision||stageStopApi!==daily||daily.config?.enableTuVuot===true||W._Ba?._Co?._Mo?.ins?.auto===true){daily.tuVuotStop();stageStopRevision=desired.revision;stageStopApi=daily;}}
// [VI dòng gốc 20] Kiểm tra W._Ba?._rJ?._O$?.ins?.isDead!==false||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0): đúng thì chạy nhánh sau if. | gán reason bằng 'waiting_user_or_revive' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  if(W._Ba?._rJ?._O$?.ins?.isDead!==false||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)){reason='waiting_user_or_revive';return;}
// [VI dòng gốc 21] Duyệt từng giá trị trong Object.entries(desired.modules??{}) bằng const [file,on]. | Khai báo biến không gán lại bằng const: [file,on] (chưa gán giá trị)
  for(const [file,on]of Object.entries(desired.modules??{})){
// [VI dòng gốc 22] Khai báo biến có thể gán lại bằng let: api = đọc W[schema[file]] | Kiểm tra !api||typeof api.stop!=='function': đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('Module API unavailable: '+file)
   let api=W[schema[file]];if(!api||typeof api.stop!=='function')throw Error('Module API unavailable: '+file);
// [VI dòng gốc 23] Kiểm tra targets.get(file)===api&&states.get(file)===on: đúng thì chạy nhánh sau if. | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
   if(targets.get(file)===api&&states.get(file)===on)continue;
// [VI dòng gốc 24] Kiểm tra !on: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gọi api.stop() để dừng bộ điều khiển và dọn tài nguyên
   if(!on)api.stop();
// [VI dòng gốc 25] Kiểm tra states.get(file)!==true: đúng thì chạy nhánh sau if. | Khai báo biến không gán lại bằng const: install = đọc W.__KVPV_CONTROL_INSTALLERS?.[file] nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Kiểm tra typeof install!=='function': đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('Installer unavailable: '+file)
   else if(states.get(file)!==true){const install=W.__KVPV_CONTROL_INSTALLERS?.[file];if(typeof install!=='function')throw Error('Installer unavailable: '+file);install();api=W[schema[file]];if(typeof api?.start==='function')api.start();}
// [VI dòng gốc 26] gọi targets.set(file, api) | gọi states.set(file, on)
   targets.set(file,api);states.set(file,on);
// [VI dòng gốc 27] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 28] Kiểm tra desired.roadCombatMode!==undefined||desired.roadMinCastMs!==undefined: đúng thì chạy nhánh sau if. | Khai báo biến không gán lại bằng const: api = đọc W.KVPV_ROAD_CADENCE | Kiểm tra desired.roadCombatMode!==undefined&&typeof api?.setCombatMode!=='function'||desired.roadMinCastMs!==undefined&&typeof api?.setMinCastInterval!=='function': đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('Road settings API unavailable')
  if(desired.roadCombatMode!==undefined||desired.roadMinCastMs!==undefined){const api=W.KVPV_ROAD_CADENCE;if(desired.roadCombatMode!==undefined&&typeof api?.setCombatMode!=='function'||desired.roadMinCastMs!==undefined&&typeof api?.setMinCastInterval!=='function')throw Error('Road settings API unavailable');if(roadApi!==api||applied!==desired.revision){if(desired.roadCombatMode!==undefined)api.setCombatMode(desired.roadCombatMode);if(desired.roadMinCastMs!==undefined)api.setMinCastInterval(desired.roadMinCastMs);roadApi=api;}}
// [VI dòng gốc 29] Khai báo biến không gán lại bằng const: combat = đọc W.KVPV_TH300
  const combat=W.KVPV_TH300;
// [VI dòng gốc 30] Kiểm tra desired.towerBasicOnly!==undefined&&typeof combat?.setBasicOnly!=='function': đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('Tower combat mode API unavailable')
  if(desired.towerBasicOnly!==undefined&&typeof combat?.setBasicOnly!=='function')throw Error('Tower combat mode API unavailable');
// [VI dòng gốc 31] Kiểm tra combat&&(combatApi!==combat||applied!==desired.revision): đúng thì chạy nhánh sau if.
  if(combat&&(combatApi!==combat||applied!==desired.revision)){
// [VI dòng gốc 32] Kiểm tra desired.towerBasicOnly!==undefined: đúng thì chạy nhánh sau if. | gọi combat.setBasicOnly(desired.towerBasicOnly) để bật/tắt chế độ nhân vật chỉ dùng đòn tay 8001 trong Thiên Quan, Linh Lung, Phù Văn và Tru Tiên
   if(desired.towerBasicOnly!==undefined)combat.setBasicOnly(desired.towerBasicOnly);
// [VI dòng gốc 33] Kiểm tra desired.distance!==undefined: đúng thì chạy nhánh sau if. | gọi combat.setDistance(desired.distance)
   if(desired.distance!==undefined)combat.setDistance(desired.distance);
// [VI dòng gốc 34] Kiểm tra desired.animationSpeed!==undefined: đúng thì chạy nhánh sau if. | gọi combat.setBasicAnimationSpeed(desired.animationSpeed) để đặt hệ số phát hoạt ảnh 8001 phía client; không phải hệ số sát thương server
   if(desired.animationSpeed!==undefined)combat.setBasicAnimationSpeed(desired.animationSpeed);
// [VI dòng gốc 35] gán combatApi bằng combat
   combatApi=combat;
// [VI dòng gốc 36] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 37] Kiểm tra stageRevision!==desired.revision: đúng thì chạy nhánh sau if.
  if(stageRevision!==desired.revision){
// [VI dòng gốc 38] Kiểm tra desired.dailyEnabled===true: đúng thì chạy nhánh sau if. | Kiểm tra typeof W.KVPV_DAILY?.start!=='function': đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('Daily unavailable') | gọi W.KVPV_DAILY.start() để khởi động bộ điều khiển
   if(desired.dailyEnabled===true){if(typeof W.KVPV_DAILY?.start!=='function')throw Error('Daily unavailable');W.KVPV_DAILY.start();}
// [VI dòng gốc 39] Kiểm tra desired.stageAuto===true: đúng thì chạy nhánh sau if. | Khai báo biến không gán lại bằng const: method = nếu desired.stageAuto thì lấy 'tuVuotStart', ngược lại lấy 'tuVuotStop' | Kiểm tra typeof W.KVPV_DAILY?.[method]!=='function': đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('Stage API unavailable')
   if(desired.stageAuto===true){const method=desired.stageAuto?'tuVuotStart':'tuVuotStop';if(typeof W.KVPV_DAILY?.[method]!=='function')throw Error('Stage API unavailable');W.KVPV_DAILY[method]();}
// [VI dòng gốc 40] gán stageRevision bằng desired.revision
   stageRevision=desired.revision;
// [VI dòng gốc 41] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 42] gán applied bằng desired.revision | gán reason bằng 'desktop_applied' | gán error bằng ''
  applied=desired.revision;reason='desktop_applied';error='';
// [VI dòng gốc 43] Nhận lỗi bằng e và chạy phần xử lý lỗi. | gán failedRevision bằng desired?.revision | gán error bằng String(e.message||e).slice(0,300) | gán reason bằng 'desktop_apply_error'
 }catch(e){failedRevision=desired?.revision;error=String(e.message||e).slice(0,300);reason='desktop_apply_error';}}
// [VI dòng gốc 44] Định nghĩa hàm stop; tham số: không có. Mục đích: dừng bộ điều khiển và dọn tài nguyên | Kiểm tra timer!==null: đúng thì chạy nhánh sau if. | gọi W.KVPV_V1?.timers?.clearInterval??W.clearInterval(timer) | gán timer bằng null
 function stop(){if(timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(timer);timer=null;}
// [VI dòng gốc 45] gán W.KVPV_DESKTOP_CONTROL bằng Object.freeze({receive,sync:tick,stop,scopeProfile,distance:()=>scopeProfile(W.KVPV_FAR_SCOPE?.status?.()?.kind)?.distance??desired?.distance,stageAllowed:()=>desired?.stageAuto!==…
 W.KVPV_DESKTOP_CONTROL=Object.freeze({receive,sync:tick,stop,scopeProfile,distance:()=>scopeProfile(W.KVPV_FAR_SCOPE?.status?.()?.kind)?.distance??desired?.distance,stageAllowed:()=>desired?.stageAuto!==false,
// [VI dòng gốc 46] Thuộc tính status: tạo hàm với tham số (không có); mỗi lần gọi trả về tạo đối tượng gồm reason, lastError, requested, applied, modules, distance, animationSpeed, stageAuto | Thuộc tính reason: dùng biến cùng tên | Thuộc tính lastError: error | Thuộc tính requested: desired?.revision hoặc dùng vế phải khi vế trái là null/undefined: null
  status:()=>({reason,lastError:error,requested:desired?.revision??null,applied,modules:desired?.modules??{},distance:desired?.distance??null,animationSpeed:desired?.animationSpeed??null,stageAuto:desired?.stageAuto??null}),_handoff:()=>({actor,desired,failedRevision})});
// [VI dòng gốc 47] gán timer bằng (W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,1000) | gọi tick() để xử lý một nhịp kiểm tra
 timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,1000);tick();
// [VI dòng gốc 48] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: })();
})();
// [VI dòng gốc 49] Dòng trống để tách các phần, không có lệnh thực thi.
