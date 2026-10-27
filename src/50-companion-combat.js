// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: Ngự Thú và kỹ năng Dinh Thự theo đòn của chủ trong Thiên Quan, Linh Lung Tháp, Phù Văn.
/* Ngự Thú và kỹ năng Dinh Thự theo đòn của chủ trong Thiên Quan, Linh Lung Tháp, Phù Văn.
 * AI native chờ tầm đánh thường của chủ nên có thể đứng khi chủ đánh xa.
 * Nhận sự kiện tung đòn 1039, dùng selector và hồi chiêu/hoạt ảnh native của Ngự Thú.
 * Đường Thí Luyện: Linh Thú, Phúc Oa, Ngự Thú chọn chiêu native độc lập mỗi 1 ms khi sẵn sàng. Không đổi timestamp kỹ năng.
 * Tín hiệu tung đòn không phải xác nhận sát thương từ server. */
// [VI dòng gốc 6] chạy ngay hàm bao để tạo phạm vi và khởi tạo phần chức năng bên trong
(() => {
// [VI dòng gốc 7] "use strict"
  'use strict';
// [VI dòng gốc 8] Khai báo biến không gán lại bằng const: W = window; old = đọc W.KVPV_COMPANION_COMBAT; carry = gọi old?._handoff(); chức năng nội bộ chưa xác minh từ tên hàm (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  const W=window,old=W.KVPV_COMPANION_COMBAT,carry=old?._handoff?.();
// [VI dòng gốc 9] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | gọi old?.stop() để dừng bộ điều khiển và dọn tài nguyên (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Nhận lỗi bằng e và chạy phần xử lý lỗi. | gọi W.KVPV_V1?.diagnostics?.record(e) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  try{old?.stop?.();}catch(e){W.KVPV_V1?.diagnostics?.record?.(e);}
// [VI dòng gốc 10] Khai báo biến không gán lại bằng const: actor = gọi String(W.__KVPV_OWN_ACTOR_ID??'') để chuyển sang chuỗi; allowed = tạo đối tượng bằng Set(['THIEN_QUAN','LINH_LUNG','PHU_VAN','TRU_TIEN']); scanMs = 1
  const actor=String(W.__KVPV_OWN_ACTOR_ID??''),allowed=new Set(['THIEN_QUAN','LINH_LUNG','PHU_VAN','TRU_TIEN']),scanMs=50;
// [VI dòng gốc 11] Khai báo biến không gán lại bằng const: S = tạo đối tượng gồm enabled, timer, role, ride, mansion, mansionAttempts, dispatching, reason, lastError, attempts, nativeCastSignals, lastSkill, lastTarget
  const S={enabled:true,timer:null,role:null,ride:null,mansion:null,mansionAttempts:0,dispatching:false,reason:'starting',lastError:'',
// [VI dòng gốc 12] Thuộc tính attempts: nếu carry?.actor===actor thì lấy Number(carry.attempts)||0, ngược lại lấy 0 | Thuộc tính nativeCastSignals: nếu carry?.actor===actor thì lấy Number(carry.nativeCastSignals)||0, ngược lại lấy 0 | Thuộc tính lastSkill: null | Thuộc tính lastTarget: null
    attempts:carry?.actor===actor?Number(carry.attempts)||0:0,nativeCastSignals:carry?.actor===actor?Number(carry.nativeCastSignals)||0:0,lastSkill:null,lastTarget:null};
// [VI dòng gốc 13] Khai báo biến không gán lại bằng const: prop = tạo hàm với tham số r, k; mỗi lần gọi trả về gọi r?.property?.get(k) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); types = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._d?._Yct nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  const prop=(r,k)=>r?.property?.get?.(k),types=()=>W._d?._Yct;
// [VI dòng gốc 14] Khai báo biến không gán lại bằng const: component = tạo hàm với tham số r, k; mỗi lần gọi trả về nếu types()?.[k] thì lấy r?.getComponent?.(types()[k]), ngược lại lấy null
  const component=(r,k)=>types()?.[k]?r?.getComponent?.(types()[k]):null;
// [VI dòng gốc 15] Khai báo biến không gán lại bằng const: identity = tạo hàm với tham số r; mỗi lần gọi trả về gọi String(r?.id??prop(r,'id')??'') để chuyển sang chuỗi
  const identity=r=>String(r?.id??prop(r,'id')??'');
// [VI dòng gốc 16] Khai báo biến không gán lại bằng const: owned = tạo hàm với tham số (không có); mỗi lần gọi trả về !!actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'') và chỉ đánh giá vế phải khi vế trái truthy: !W.__KVPV_UNIVERSAL_HALTED
  const owned=()=>!!actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;
// [VI dòng gốc 17] Khai báo biến không gán lại bằng const: scope = tạo hàm với tham số (không có) | Khai báo biến không gán lại bằng const: s = gọi W.KVPV_FAR_SCOPE?.status() để trả trạng thái để kiểm tra (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Kết thúc hàm hiện tại và trả về: s?.inside===true và chỉ đánh giá vế phải khi vế trái truthy: allowed.has(s.kind).
  const inRoad=()=>Number(W._ft?._po?.ins?.getCfgById?.(Number(W._C?._Mn?._Cn?.currentID))?.[7])===41&&W._Ba?._cm?._q3t?.ins?.getHasTeamByType?.(1)===true&&W.KVPV_ROAD_CADENCE?.enabled!==false;
  const scope=()=>{if(inRoad())return true;const s=W.KVPV_FAR_SCOPE?.status?.();return s?.inside===true&&allowed.has(s.kind);};
// [VI dòng gốc 18] Khai báo biến không gán lại bằng const: settings = tạo hàm với tham số (không có); mỗi lần gọi trả về W.KVPV_DESKTOP_CONTROL?.scopeProfile?.(inRoad()?'ROAD_TRIAL':W.KVPV_FAR_SCOPE?.status?.()?.kind) hoặc dùng vế phải khi vế trái là null/undefined: {}
  const settings=()=>W.KVPV_DESKTOP_CONTROL?.scopeProfile?.(W.KVPV_FAR_SCOPE?.status?.()?.kind)??{};
// [VI dòng gốc 19] Khai báo biến không gán lại bằng const: live = tạo hàm với tham số r | Khai báo biến không gán lại bằng const: hp = gọi prop(r, 'hp') | Kết thúc hàm hiện tại và trả về: !!r&&r.isValid!==false&&Number(prop(r,'status'))!==1024 và chỉ đánh giá vế phải khi vế trái truthy: !Array.isArray(hp)||Number(hp[0])>0.
  const live=r=>{const hp=prop(r,'hp');return !!r&&r.isValid!==false&&Number(prop(r,'status'))!==1024&&(!Array.isArray(hp)||Number(hp[0])>0);};
// [VI dòng gốc 20] Định nghĩa hàm playerSkill; tham số: role, id | Khai báo biến không gán lại bằng const: s = gọi component(role, '_Eet') | Kết thúc hàm hiện tại và trả về: Number.isSafeInteger(id)&&id>0 và chỉ đánh giá vế phải khi vế trái truthy: [...(s?._rtt??[]),...(s?._wet??[])].some(r=>Number(r?.[0])===id).
  function playerSkill(role,id){const s=component(role,'_Eet');return Number.isSafeInteger(id)&&id>0&&[...(s?._rtt??[]),...(s?._wet??[])].some(r=>Number(r?.[0])===id);}
// [VI dòng gốc 21] Định nghĩa hàm rideSignal; tham số: không có | Kiểm tra S.enabled: đúng thì chạy nhánh sau if. | tăng S.nativeCastSignals một đơn vị sau khi lấy giá trị
  function rideSignal(){if(S.enabled)S.nativeCastSignals++;}
// [VI dòng gốc 22] Định nghĩa hàm setRide; tham số: ride | Kiểm tra ride===S.ride: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể. | gọi S.ride?.off(1039, S, rideSignal) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  function setRide(ride){if(ride===S.ride)return;S.ride?.off?.(1039,S,rideSignal);S.ride=ride;ride?.on?.(1039,S,rideSignal);}
// [VI dòng gốc 23] Định nghĩa hàm setMansion; tham số: context | Kiểm tra context===S.mansion: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể. | gọi S.mansion?.off(1039, S, rideSignal) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  function setMansion(context){if(context===S.mansion)return;S.mansion?.off?.(1039,S,rideSignal);S.mansion=context;context?.on?.(1039,S,rideSignal);}
// [VI dòng gốc 24] Định nghĩa hàm onPlayerCast; tham số: targetId, skillId | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài.
  function onPlayerCast(targetId,skillId){try{
// [VI dòng gốc 25] Kiểm tra !S.enabled||S.dispatching||!owned()||!scope(): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(!S.enabled||S.dispatching||!owned()||!scope())return;
// [VI dòng gốc 26] Khai báo biến không gán lại bằng const: role = đọc S.role; master = gọi component(role, '_Het'); target = đọc master?.target nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); id = gọi Number(skillId) để chuyển sang số
    const role=S.role,master=component(role,'_Het'),target=master?.target,id=Number(skillId);
// [VI dòng gốc 27] Chú thích gốc của tác giả; không được thực thi. Nội dung: Đồng hành chuyển tiếp 1039 về chủ: chỉ nhận skill trong bộ của nhân vật.
    // Đồng hành chuyển tiếp 1039 về chủ: chỉ nhận skill trong bộ của nhân vật.
// [VI dòng gốc 28] Kiểm tra !live(role)||Number(prop(role,'type'))!==4||!playerSkill(role,id)||!live(target)||identity(target)!==String(targetId)|| (!inRoad()&&W.KVPV_FAR_SCOPE?.eligible?.(target)!==true)||master?.isValid…: đúng thì chạy nhánh sau if.
    if(!live(role)||Number(prop(role,'type'))!==4||!playerSkill(role,id)||!live(target)||identity(target)!==String(targetId)||
// [VI dòng gốc 29] Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      W.KVPV_FAR_SCOPE?.eligible?.(target)!==true||master?.isValidTarget?.()!==true)return;
// [VI dòng gốc 30] Khai báo biến không gán lại bằng const: p = gọi settings() | gán S.dispatching bằng true | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | Duyệt từng giá trị trong [['ride',7,p.rideFollow!==false],['mansion',12,p.mansionFollow===true]] bằng const [key,type,on].
    if(inRoad()){dispatchRoad(role,target);return;}
    const p=settings();S.dispatching=true;try{for(const [key,type,on] of [['ride',7,p.rideFollow!==false],['mansion',12,p.mansionFollow===true]])if(on){try{follow(key,type,role,target);}catch(e){S.lastError=String(e?.message??e);S.reason='error';}}}finally{S.dispatching=false;}
// [VI dòng gốc 31] Nhận lỗi bằng e và chạy phần xử lý lỗi. | gán S.lastError bằng String(e?.message??e) | gán S.reason bằng 'error'
  }catch(e){S.lastError=String(e?.message??e);S.reason='error';}}
// [VI dòng gốc 32] Định nghĩa hàm follow; tham số: key, type, role, target
  let lastRoadDispatch=-Infinity;
  function dispatchRoad(role,target){if(W._Ba?._rJ?._O$?.ins?.isDead===true||S.dispatching||Date.now()-lastRoadDispatch<1||!live(role)||Number(prop(role,'type'))!==4||!live(target)||Number(prop(target,'type'))!==1||component(role,'_Het')?.isValidTarget?.()!==true)return;lastRoadDispatch=Date.now();S.dispatching=true;try{const p=settings();for(const [key,type,on] of [['pet',2,true],['fuwa',9,true],['ride',7,p.rideFollow!==false]])if(on)try{follow(key,type,role,target);}catch(e){S.lastError=String(e?.message??e);S.reason='error';}}finally{S.dispatching=false;}}
  function follow(key,type,role,target){
// [VI dòng gốc 33] Khai báo biến không gán lại bằng const: ride = gọi prop(role, key+'Context') | Kiểm tra key==='ride': đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gọi setRide(ride) | gọi setMansion(ride)
    const ride=prop(role,key+'Context');if(key==='ride')setRide(ride);else if(key==='mansion')setMansion(ride);
// [VI dòng gốc 34] Kiểm tra !live(ride)||Number(prop(ride,'type'))!==type: đúng thì chạy nhánh sau if. | gán S.reason bằng 'waiting_native_'+key | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(!live(ride)||Number(prop(ride,'type'))!==type){S.reason='waiting_native_'+key;return;}
// [VI dòng gốc 35] Khai báo biến không gán lại bằng const: combat = gọi component(ride, '_Het'); selector = gọi component(ride, '_Eet')
    const combat=component(ride,'_Het'),selector=component(ride,'_Eet');
// [VI dòng gốc 36] Kiểm tra typeof combat?.combat!=='function'||typeof combat?.setTarget!=='function'||typeof selector?.selectSkill!=='function': đúng thì chạy nhánh sau if. | gán S.reason bằng 'waiting_native_components' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(typeof combat?.combat!=='function'||typeof combat?.setTarget!=='function'||typeof selector?.selectSkill!=='function'){S.reason='waiting_native_components';return;}
// [VI dòng gốc 37] Kiểm tra combat.isCooldown?.()!==false: đúng thì chạy nhánh sau if. | gán S.reason bằng 'native_ride_cooldown' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(!inRoad()&&(combat._jh?.isPlaying===true||combat.isCooldown?.()!==false)){S.reason='native_ride_cooldown';return;}
// [VI dòng gốc 38] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 39] Khai báo biến không gán lại bằng const: selected = gọi Number(selector.selectSkill()) để chuyển sang số
      const selected=Number(inRoad()&&W.KVPV_ROAD_CADENCE?.selectSkill1ms?W.KVPV_ROAD_CADENCE.selectSkill1ms(selector):selector.selectSkill());
// [VI dòng gốc 40] Kiểm tra !Number.isSafeInteger(selected)||selected<=0: đúng thì chạy nhánh sau if. | gán S.reason bằng 'no_ready_native_skill' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      if(!Number.isSafeInteger(selected)||selected<=0){S.reason='no_ready_native_skill';return;}
// [VI dòng gốc 41] Khai báo biến không gán lại bằng const: cfg = gọi W._Ba?._Jtt?._ant?.ins?.getCfgById(10000*selected+1) để tra cấu hình theo ID bằng API client (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
      const cfg=W._Ba?._Jtt?._ant?.ins?.getCfgById?.(10000*selected+1);
// [VI dòng gốc 42] Kiểm tra !cfg: đúng thì chạy nhánh sau if. | gán S.reason bằng 'waiting_native_skill_config' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      if(!cfg){S.reason='waiting_native_skill_config';return;}
// [VI dòng gốc 43] Khai báo biến không gán lại bằng const: targetKind = Number(cfg[15]) hoặc dùng vế phải khi vế trái falsy: 0; destination = nếu targetKind===1 thì lấy role, ngược lại lấy target
      const targetKind=Number(cfg[15])||0,destination=targetKind===1?role:target;
// [VI dòng gốc 44] gọi combat.setTarget(destination, targetKind) để đặt mục tiêu qua đối tượng đang gọi
      combat.setTarget(destination,targetKind);
// [VI dòng gốc 45] Kiểm tra combat.target!==destination||combat.isValidTarget?.(targetKind)!==true: đúng thì chạy nhánh sau if. | gán S.reason bằng 'native_target_rejected' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      if(combat.target!==destination||combat.isValidTarget?.(targetKind)!==true){S.reason='native_target_rejected';return;}
// [VI dòng gốc 46] Kiểm tra key==='mansion'&&combat.isValidRange?.()!==true: đúng thì chạy nhánh sau if. | gán S.reason bằng 'native_mansion_range' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      if((key==='mansion'||inRoad()&&typeof combat.isValidRange==='function')&&combat.isValidRange?.()!==true){S.reason='native_mansion_range';return;}
// [VI dòng gốc 47] Kiểm tra key==='mansion': đúng thì chạy nhánh sau if. | tăng S.mansionAttempts một đơn vị sau khi lấy giá trị | tăng S.attempts một đơn vị sau khi lấy giá trị | gán S.lastSkill bằng selected
      if(key==='mansion')S.mansionAttempts++;S.attempts++;S.lastSkill=selected;S.lastTarget=identity(destination);
// [VI dòng gốc 48] gọi combat.combat(selected, 0, targetKind) | gán S.reason bằng key+'_follow_player_cast'
      combat.combat(selected,0,targetKind);S.reason=key+'_follow_player_cast';
// [VI dòng gốc 49] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 50] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 51] Định nghĩa hàm unbind; tham số: không có | gọi S.role?.off(1039, S, onPlayerCast) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gán S.role bằng null | gọi setRide(null)
  function unbind(){S.role?.off?.(1039,S,onPlayerCast);S.role=null;setRide(null);setMansion(null);}
// [VI dòng gốc 52] Chú thích gốc của tác giả; không được thực thi. Nội dung: Timer chỉ cập nhật đăng ký sự kiện khi chủ/Ngự Thú đổi, không tự lặp combat.
  // Timer chỉ cập nhật đăng ký sự kiện khi chủ/Ngự Thú đổi, không tự lặp combat.
// [VI dòng gốc 53] Định nghĩa hàm sync; tham số: không có | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài.
  function sync(withStatus=true){try{
// [VI dòng gốc 54] Kiểm tra !S.enabled: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: gọi status() để trả trạng thái để kiểm tra.
    if(!S.enabled)return withStatus?status():undefined;
// [VI dòng gốc 55] Kiểm tra !owned(): đúng thì chạy nhánh sau if. | gọi unbind() | gán S.reason bằng 'wrong_actor_or_halted' | Kết thúc hàm hiện tại và trả về: gọi status() để trả trạng thái để kiểm tra.
    if(!owned()){unbind();S.reason='wrong_actor_or_halted';return withStatus?status():undefined;}
// [VI dòng gốc 56] Khai báo biến không gán lại bằng const: role = gọi W._C?._Ba?.instance?.getRole(Number(actor)) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const role=W._C?._Ba?.instance?.getRole?.(Number(actor));
// [VI dòng gốc 57] Kiểm tra role!==S.role: đúng thì chạy nhánh sau if. | gọi unbind() | gán S.role bằng role | gọi role?.on(1039, S, onPlayerCast) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    if(role!==S.role){unbind();S.role=role;role?.on?.(1039,S,onPlayerCast);}
// [VI dòng gốc 58] gọi setRide(prop(role,'rideContext')??null) | gọi setMansion(prop(role,'mansionContext')??null)
    setRide(prop(role,'rideContext')??null);setMansion(prop(role,'mansionContext')??null);
    if(inRoad()&&owned()&&W._Ba?._rJ?._O$?.ins?.isDead!==true)dispatchRoad(role,component(role,'_Het')?.target);
// [VI dòng gốc 59] Kiểm tra !role: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gán S.reason bằng 'waiting_player' | Kiểm tra !scope(): đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gán S.reason bằng 'outside_supported_dungeons'
    if(!role)S.reason='waiting_player';else if(!scope())S.reason='outside_supported_dungeons';
// [VI dòng gốc 60] Kiểm tra !S.ride: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gán S.reason bằng 'waiting_native_ride'
    else if(!S.ride)S.reason='waiting_native_ride';
// [VI dòng gốc 61] Kiểm tra ['starting','outside_supported_dungeons','waiting_player','waiting_native_ride'].includes(S.reason): đúng thì chạy nhánh sau if. | gán S.reason bằng 'waiting_player_cast'
    else if(['starting','outside_supported_dungeons','waiting_player','waiting_native_ride'].includes(S.reason))S.reason='waiting_player_cast';
// [VI dòng gốc 62] Nhận lỗi bằng e và chạy phần xử lý lỗi. | gán S.lastError bằng String(e?.message??e) | gán S.reason bằng 'error' | Kết thúc hàm hiện tại và trả về: gọi status() để trả trạng thái để kiểm tra.
  }catch(e){S.lastError=String(e?.message??e);S.reason='error';}return withStatus?status():undefined;}
// [VI dòng gốc 63] Định nghĩa hàm status; tham số: không có. Mục đích: trả trạng thái để kiểm tra | Khai báo biến không gán lại bằng const: combat = gọi component(S.ride, '_Het'); selector = gọi component(S.ride, '_Eet') | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm mansionAttempts, rideFollow, mansionFollow, mansionPresent, mansionNativeRangeGate, enabled, mode, reason, lastError, scanMs, clientSkillCooldownMs, attempts, nativeCastSignals, lastSkill, lastTarget, nativeRangeGate, rangePolicy, nativeAnimationGate, contexts, otherCompanions.
  function status(){const combat=component(S.ride,'_Het'),selector=component(S.ride,'_Eet');return {
// [VI dòng gốc 64] Thuộc tính mansionAttempts: đọc S.mansionAttempts | Thuộc tính rideFollow: tính biểu thức settings().rideFollow!==false | Thuộc tính mansionFollow: tính biểu thức settings().mansionFollow===true | Thuộc tính mansionPresent: đảo giá trị đúng/sai của !S.mansion
    mansionAttempts:S.mansionAttempts,rideFollow:settings().rideFollow!==false,mansionFollow:settings().mansionFollow===true,mansionPresent:!!S.mansion,mansionNativeRangeGate:true,enabled:S.enabled,mode:'ride_follow_player_cast',reason:S.reason,lastError:S.lastError,scanMs,clientSkillCooldownMs:null,
// [VI dòng gốc 65] Thuộc tính attempts: đọc S.attempts | Thuộc tính nativeCastSignals: đọc S.nativeCastSignals | Thuộc tính lastSkill: đọc S.lastSkill | Thuộc tính lastTarget: đọc S.lastTarget
    attempts:S.attempts,nativeCastSignals:S.nativeCastSignals,lastSkill:S.lastSkill,lastTarget:S.lastTarget,
// [VI dòng gốc 66] Thuộc tính nativeRangeGate: false | Thuộc tính rangePolicy: "same_target_as_player_cast_in_verified_dungeons" | Thuộc tính nativeAnimationGate: true
    nativeRangeGate:false,rangePolicy:'same_target_as_player_cast_in_verified_dungeons',nativeAnimationGate:!inRoad(),clientSkillWaitMs:inRoad()?1:null,
// [VI dòng gốc 67] Thuộc tính contexts: nếu S.ride thì lấy [{kind:'ride',present:true,target:identity(combat?.target),skills:(selector?._rtt??[]).slice(0,10).map(r=>r.slice(0,3))}], ngược lại lấy [] | Thuộc tính kind: "ride" | Thuộc tính present: true | Thuộc tính target: gọi identity(combat?.target)
    contexts:S.ride?[{kind:'ride',present:true,target:identity(combat?.target),skills:(selector?._rtt??[]).slice(0,10).map(r=>r.slice(0,3))}]:[],otherCompanions:inRoad()?'pet_fuwa_ride_native_ready':'native_defaults'};}
// [VI dòng gốc 68] Định nghĩa hàm stop; tham số: không có. Mục đích: dừng bộ điều khiển và dọn tài nguyên | gán S.enabled bằng false | Kiểm tra S.timer!==null: đúng thì chạy nhánh sau if. | gọi W.KVPV_V1?.timers?.clearInterval??W.clearInterval(S.timer)
  function stop(){S.enabled=false;if(S.timer!==null){(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;}unbind();S.reason='stopped';return status();}
// [VI dòng gốc 69] gán W.KVPV_COMPANION_COMBAT bằng Object.freeze({sync,status,stop,_handoff:()=>({actor,attempts:S.attempts,nativeCastSignals:S.nativeCastSignals})})
  W.KVPV_COMPANION_COMBAT=Object.freeze({sync,status,stop,_handoff:()=>({actor,attempts:S.attempts,nativeCastSignals:S.nativeCastSignals})});
// [VI dòng gốc 70] gọi sync() | Kiểm tra owned(): đúng thì chạy nhánh sau if. | gán S.timer bằng (W.KVPV_V1?.timers?.setInterval??W.setInterval)(sync,scanMs)
  sync();if(owned())S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(()=>sync(false),scanMs);
// [VI dòng gốc 71] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: })();
})();
// [VI dòng gốc 72] Dòng trống để tách các phần, không có lệnh thực thi.
