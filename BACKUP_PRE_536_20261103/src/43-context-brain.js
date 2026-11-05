// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: Context rules grounded in native state. No new RPC, UI click, purchase or chat. [đóng chú thích]
/* Context rules grounded in native state. No new RPC, UI click, purchase or chat. */
// [VI dòng gốc 2] chạy ngay hàm bao để tạo phạm vi và khởi tạo phần chức năng bên trong
(() => {
// [VI dòng gốc 3] "use strict"
  'use strict';
// [VI dòng gốc 4] Khai báo biến không gán lại bằng const: W = window; actor = gọi String(W.__KVPV_OWN_ACTOR_ID||'') để chuyển sang chuỗi
  const W=window,actor=String(W.__KVPV_OWN_ACTOR_ID||'');
// [VI dòng gốc 5] Định nghĩa hàm activity; tham số: không có
  function activity(){
// [VI dòng gốc 6] Kiểm tra !actor||actor!==String(W._Ba?._rJ?._O$?.ins?.actorId??'')||W.__KVPV_UNIVERSAL_HALTED: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm kind, direct, reason.
    if(!actor||actor!==String(W._Ba?._rJ?._O$?.ins?.actorId??'')||W.__KVPV_UNIVERSAL_HALTED)return {kind:'UNAVAILABLE',direct:false,reason:'actor_or_session'};
// [VI dòng gốc 7] Kiểm tra W._Ba?._rJ?._O$?.ins?.isDead===true: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm kind, direct, reason.
    if(W._Ba?._rJ?._O$?.ins?.isDead===true)return {kind:'DEAD',direct:false,reason:'wait_revive'};
// [VI dòng gốc 8] Khai báo biến không gán lại bằng const: q = gọi W.KVPV_DAILY?.quickState() (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const q=W.KVPV_DAILY?.quickState?.();
// [VI dòng gốc 9] Kiểm tra ['entering','exiting','matching','result'].includes(q?.step): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm kind, direct, reason.
    if(['entering','exiting','matching','result'].includes(q?.step))return {kind:'TRANSITION',direct:false,reason:q.step};
// [VI dòng gốc 10] Khai báo biến không gán lại bằng const: ui = đọc W._ft?._Y4n?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); Type = đọc W._Ba?._We?._p9i nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); p = gọi ui?.getPanelById(297) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); m = đọc W._Ba?._We?._eJ?.inst nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const ui=W._ft?._Y4n?.ins,Type=W._Ba?._We?._p9i,p=ui?.getPanelById?.(297),m=W._Ba?._We?._eJ?.inst;
// [VI dòng gốc 11] Khai báo biến không gán lại bằng const: mission = tính biểu thức W._Ba?._$a?._yo?.ins?.isInMission===true
    const mission=W._Ba?._$a?._yo?.ins?.isInMission===true;
// [VI dòng gốc 12] Kiểm tra mission&&typeof Type==='function'&&p instanceof Type&&p.parent&&p.visible!==false&&ui?.isOpened?.(297)===true&&Number(m?.cpInfo?.[0])>0: đúng thì chạy nhánh sau if.
    if(mission&&typeof Type==='function'&&p instanceof Type&&p.parent&&p.visible!==false&&ui?.isOpened?.(297)===true&&Number(m?.cpInfo?.[0])>0)
// [VI dòng gốc 13] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm kind, direct, reason, remainingMs, damage.
      return {kind:'TRAN_MA',direct:q?.running===true,reason:'native_panel_and_active_timer',remainingMs:Number(m.cpInfo[0]),damage:String(m.ht??'').slice(0,80)};
// [VI dòng gốc 14] Kiểm tra q?.running===true&&q.step==='fighting': đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm kind, direct, reason.
    if(q?.running===true&&q.step==='fighting')return {kind:'DAILY_FIGHT',direct:true,reason:String(q.job??'').slice(0,80)};
// [VI dòng gốc 15] Kiểm tra !mission&&W._Ba?._$a?.SceneUtil?.isCommonScene===true: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm kind, direct, reason.
    if(!mission&&W._Ba?._$a?.SceneUtil?.isCommonScene===true)return {kind:'COMMON',direct:false,reason:'idle_rules_apply'};
// [VI dòng gốc 16] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm kind, direct, reason.
    return {kind:'OTHER_MAP',direct:false,reason:'use_existing_combat_scope_rules'};
// [VI dòng gốc 17] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 18] Định nghĩa hàm plan; tham số: không có | Khai báo biến không gán lại bằng const: context = gọi activity(); eye = gọi W.KVPV_WORLD_EYE?.status() để trả trạng thái để kiểm tra (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); actions = tạo mảng gồm 0 vị trí: []
  function plan(){const context=activity(),eye=W.KVPV_WORLD_EYE?.status?.(),actions=[];
// [VI dòng gốc 19] Duyệt từng giá trị trong (eye?.actions??[]).slice(0,80) bằng const a. | Khai báo biến không gán lại bằng const: a (chưa gán giá trị) | gọi actions.push({panel:a.panel,key:a.key,kind:a.kind, decision:a.kind==='manual_control'?'manual_only':a.kind==='paid_or_currency'?'bloc…) để thêm phần tử vào cuối mảng
    for(const a of (eye?.actions??[]).slice(0,80))actions.push({panel:a.panel,key:a.key,kind:a.kind,
// [VI dòng gốc 20] Thuộc tính decision: nếu a.kind==='manual_control' thì lấy 'manual_only', ngược lại lấy a.kind==='paid_or_currency'?'blocked_currency':!a.ready?'wait_native_condition': a.kind==='navigate'&&context.kind!=='COMMON'?'defer_until_activity_finishes':'match_verified_execut…
      decision:a.kind==='manual_control'?'manual_only':a.kind==='paid_or_currency'?'blocked_currency':!a.ready?'wait_native_condition':
// [VI dòng gốc 21] Tiếp tục hàm plan; thành phần cú pháp bắt đầu bằng name. Đọc cùng dòng mở phía trên: a.kind==='navigate'&&context.kind!=='COMMON'?'defer_until_activity_finishes':'match_verified_executor'});
        a.kind==='navigate'&&context.kind!=='COMMON'?'defer_until_activity_finishes':'match_verified_executor'});
// [VI dòng gốc 22] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm context, policy, actions.
    return {context,policy:{keepCurrentActivity:context.kind!=='COMMON',directRewardsAndUpgrades:context.direct,
// [VI dòng gốc 23] Thuộc tính noKNB: true | Thuộc tính unknownActions: "inspect_only" | Thuộc tính sceneChanges: "existing_arbiter" | Thuộc tính actions: dùng biến cùng tên
      noKNB:true,unknownActions:'inspect_only',sceneChanges:'existing_arbiter'},actions};
// [VI dòng gốc 24] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 25] gán W.KVPV_CONTEXT_BRAIN bằng Object.freeze({activity,plan,status:plan})
  W.KVPV_CONTEXT_BRAIN=Object.freeze({activity,plan,status:plan});
// [VI dòng gốc 26] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: })();
})();
// [VI dòng gốc 27] Dòng trống để tách các phần, không có lệnh thực thi.
