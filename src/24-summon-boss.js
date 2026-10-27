// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: Triệu Hồi Boss: dùng vé sẵn có, không mở mua vé hoặc tiêu KNB.
/* Triệu Hồi Boss: dùng vé sẵn có, không mở mua vé hoặc tiêu KNB.
 * Acc chính bật checkbox native; clone (cấu hình đảo Boss 500) gọi từng lượt.
 * Mỗi lần bấm tay phải thấy vào map và trở về; timeout chưa rõ kết quả thì giữ chờ.
 * Giữ yêu cầu đang chờ qua hot reload để không phát lại lần triệu hồi. */
// [VI dòng gốc 5] chạy ngay hàm bao để tạo phạm vi và khởi tạo phần chức năng bên trong
(() => {
// [VI dòng gốc 6] "use strict"
  'use strict';
// [VI dòng gốc 7] Khai báo biến không gán lại bằng const: W = window; old = đọc W.KVPV_SUMMON_BOSS; carry = gọi old?._handoff(); chức năng nội bộ chưa xác minh từ tên hàm (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  const W=window,old=W.KVPV_SUMMON_BOSS,carry=old?._handoff?.();
// [VI dòng gốc 8] gọi old?.stop() để dừng bộ điều khiển và dọn tài nguyên (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  old?.stop?.();
// [VI dòng gốc 9] Khai báo biến không gán lại bằng const: actor = gọi String(W.__KVPV_OWN_ACTOR_ID||'') để chuyển sang chuỗi; tag = "summon-boss"
  const actor=String(W.__KVPV_OWN_ACTOR_ID||''),tag='summon-boss';
// [VI dòng gốc 10] Khai báo biến không gán lại bằng const: S = tạo đối tượng gồm enabled, timer, lease, stageAuto, reason, lastError, pending, mode, nextOpen, requests, autoOwned
  const S={enabled:true,timer:null,lease:false,stageAuto:null,reason:'starting',lastError:'',
// [VI dòng gốc 11] Thuộc tính pending: nếu carry?.actor===actor thì lấy carry.pending, ngược lại lấy null | Thuộc tính mode: nếu carry?.actor===actor thì lấy carry.mode, ngược lại lấy 'adaptive'
    pending:carry?.actor===actor?carry.pending:null,mode:carry?.actor===actor?carry.mode:'adaptive',
// [VI dòng gốc 12] Thuộc tính nextOpen: 0 | Thuộc tính requests: nếu carry?.actor===actor thì lấy carry.requests, ngược lại lấy 0 | Thuộc tính autoOwned: false
    nextOpen:0,requests:carry?.actor===actor?carry.requests:0,autoOwned:false};
// [VI dòng gốc 13] Khai báo biến không gán lại bằng const: model = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._Ba?._F_t?._E_t?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  const model=()=>W._Ba?._F_t?._E_t?.ins;
// [VI dòng gốc 14] Khai báo biến không gán lại bằng const: ui = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._ft?._Y4n?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  const ui=()=>W._ft?._Y4n?.ins;
// [VI dòng gốc 15] Khai báo biến không gán lại bằng const: arb = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W.KVPV?.core?.scene nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  const arb=()=>W.KVPV?.core?.scene;
// [VI dòng gốc 16] Khai báo biến không gán lại bằng const: common = tạo hàm với tham số (không có); mỗi lần gọi trả về W._Ba?._$a?.SceneUtil?.isCommonScene===true và chỉ đánh giá vế phải khi vế trái truthy: W._Ba?._$a?._yo?.ins?.isInMission!==true
  const common=()=>W._Ba?._$a?.SceneUtil?.isCommonScene===true&&W._Ba?._$a?._yo?.ins?.isInMission!==true;
// [VI dòng gốc 17] Khai báo biến không gán lại bằng const: inside = tạo hàm với tham số (không có); mỗi lần gọi trả về tính biểu thức Number(W._ft?._po?.ins?.getCfgById?.(W._C?._Mn?._Cn?.currentID)?.[7])===45
  const inside=()=>Number(W._ft?._po?.ins?.getCfgById?.(W._C?._Mn?._Cn?.currentID)?.[7])===45;
// [VI dòng gốc 18] Khai báo biến không gán lại bằng const: owned = tạo hàm với tham số (không có); mỗi lần gọi trả về actor&&String(W._Ba?._rJ?._O$?.ins?.actorId??'')===actor và chỉ đánh giá vế phải khi vế trái truthy: !W.__KVPV_UNIVERSAL_HALTED
  const owned=()=>actor&&String(W._Ba?._rJ?._O$?.ins?.actorId??'')===actor&&!W.__KVPV_UNIVERSAL_HALTED;
// [VI dòng gốc 19] Khai báo biến không gán lại bằng const: manual = tạo hàm với tham số (không có); mỗi lần gọi trả về S.mode==='manual' hoặc dùng vế phải khi vế trái falsy: S.mode==='adaptive'&&W.KVPV_BEAST_ISLAND?.status?.().bossLevel===500
  const manual=()=>S.mode==='manual'||S.mode==='adaptive'&&W.KVPV_BEAST_ISLAND?.status?.().bossLevel===500;
// [VI dòng gốc 20] Định nghĩa hàm tickets; tham số: không có
  function tickets(){
// [VI dòng gốc 21] Khai báo biến không gán lại bằng const: m = gọi model(); bag = đọc W._Ba?._Ic?._aQ?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const m=model(),bag=W._Ba?._Ic?._aQ?.ins;
// [VI dòng gốc 22] Khai báo biến không gán lại bằng const: count = tạo hàm với tham số id; mỗi lần gọi trả về nếu id>0 thì lấy Number(bag?.getItemCountById?.(id)), ngược lại lấy NaN
    const count=id=>id>0?Number(bag?.getItemCountById?.(id)):NaN;
// [VI dòng gốc 23] Khai báo biến không gán lại bằng const: normal = gọi count(m?.comItemId); epic = gọi count(m?.legendItemId)
    const normal=count(m?.comItemId),epic=count(m?.legendItemId);
// [VI dòng gốc 24] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm normal, epic, known.
    return {normal,epic,known:Number.isFinite(normal)&&normal>=0&&Number.isFinite(epic)&&epic>=0};
// [VI dòng gốc 25] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 26] Định nghĩa hàm release; tham số: không có. Mục đích: nhả quyền điều khiển đang giữ
  function release(){
// [VI dòng gốc 27] Kiểm tra S.lease&&arb()?.status?.().tag===tag: đúng thì chạy nhánh sau if. | gọi arb().release('combat') để nhả quyền điều khiển đang giữ | gán S.lease bằng false
    if(S.lease&&arb()?.status?.().tag===tag)arb().release('combat');S.lease=false;
// [VI dòng gốc 28] Khai báo biến không gán lại bằng const: stage = đọc W._Ba?._Co?._Mo?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const stage=W._Ba?._Co?._Mo?.ins;
// [VI dòng gốc 29] Kiểm tra owned()&&S.stageAuto===true&&stage?.auto===false: đúng thì chạy nhánh sau if. | gán stage.auto bằng true
    if(owned()&&S.stageAuto===true&&stage?.auto===false&&!W.KVPV_EVENT_PRIORITY?.hold?.())stage.auto=true;
// [VI dòng gốc 30] gán S.stageAuto bằng null
    S.stageAuto=null;
// [VI dòng gốc 31] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 32] Định nghĩa hàm disableAuto; tham số: không có
  function disableAuto(){
// [VI dòng gốc 33] Kiểm tra S.autoOwned&&owned(): đúng thì chạy nhánh sau if. | gọi panel()?._ngt(); chức năng nội bộ chưa xác minh từ tên hàm (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Kiểm tra model(): đúng thì chạy nhánh sau if. | gán model().isAutoCall bằng false
    if(S.autoOwned&&owned()){panel()?._ngt?.();if(model())model().isAutoCall=false;}
// [VI dòng gốc 34] gán S.autoOwned bằng false
    S.autoOwned=false;
// [VI dòng gốc 35] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 36] Định nghĩa hàm reserve; tham số: không có. Mục đích: xin giữ quyền điều khiển cảnh
  function reserve(){
// [VI dòng gốc 37] Khai báo biến không gán lại bằng const: a = gọi arb(); l = gọi a?.status() để trả trạng thái để kiểm tra (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const a=arb(),l=a?.status?.();
// [VI dòng gốc 38] Kiểm tra !a||l?.owner&&l.tag!==tag||W.KVPV_HITRUN1?.status?.(false)?.running: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: false.
    if(!a||l?.owner&&l.tag!==tag||W.KVPV_HITRUN1?.status?.(false)?.running)return false;
// [VI dòng gốc 39] Khai báo biến không gán lại bằng const: job = đọc W.KVPV_DAILY?.quickState?.()?.job nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const job=W.KVPV_DAILY?.quickState?.()?.job;
// [VI dòng gốc 40] Kiểm tra job&&job!=='rảnh'&&job!=='ranh': đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: false.
    if(job&&job!=='rảnh'&&job!=='ranh')return false;
// [VI dòng gốc 41] Khai báo biến không gán lại bằng const: stage = đọc W._Ba?._Co?._Mo?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const stage=W._Ba?._Co?._Mo?.ins;
// [VI dòng gốc 42] Kiểm tra S.stageAuto===null: đúng thì chạy nhánh sau if. | gán S.stageAuto bằng stage?.auto===true
    if(S.stageAuto===null)S.stageAuto=stage?.auto===true;
// [VI dòng gốc 43] Kiểm tra stage?.auto===true: đúng thì chạy nhánh sau if. | gán stage.auto bằng false
    if(stage?.auto===true)stage.auto=false;
// [VI dòng gốc 44] Kiểm tra !a.acquire('combat',tag): đúng thì chạy nhánh sau if. | gọi release() để nhả quyền điều khiển đang giữ | Kết thúc hàm hiện tại và trả về: false.
    if(!a.acquire('combat',tag)){release();return false;}
// [VI dòng gốc 45] gán S.lease bằng true | Kết thúc hàm hiện tại và trả về: true.
    S.lease=true;return true;
// [VI dòng gốc 46] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 47] Định nghĩa hàm panel; tham số: không có | Khai báo biến không gán lại bằng const: u = gọi ui(); p = gọi u?.getPanelById(952) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); Type = đọc W._Ba?._F_t?._eUs nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  function panel(){const u=ui(),p=u?.getPanelById?.(952),Type=W._Ba?._F_t?._eUs;
// [VI dòng gốc 48] Kết thúc hàm hiện tại và trả về: nếu u?.isOpened?.(952)&&typeof Type==='function'&&p instanceof Type&&p.parent&&p.visible!==false thì lấy p, ngược lại lấy null.
    return u?.isOpened?.(952)&&typeof Type==='function'&&p instanceof Type&&p.parent&&p.visible!==false?p:null;}
// [VI dòng gốc 49] Định nghĩa hàm tick; tham số: không có. Mục đích: xử lý một nhịp kiểm tra | Kiểm tra W.KVPV_ENTRY_POLICY?.manual===true: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể. | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài.
  function tick(){if(W.KVPV_ENTRY_POLICY?.manual===true)return;try{
// [VI dòng gốc 50] Kiểm tra !S.enabled: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(!S.enabled)return;
// [VI dòng gốc 51] Kiểm tra !owned(): đúng thì chạy nhánh sau if. | gọi stop() để dừng bộ điều khiển và dọn tài nguyên | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(!owned()){stop();return;}
// [VI dòng gốc 52] Kiểm tra W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true: đúng thì chạy nhánh sau if. | gán S.reason bằng 'priority_popup' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true){S.reason='priority_popup';return;}
// [VI dòng gốc 53] Khai báo biến không gán lại bằng const: t = gọi tickets(); m = gọi model()
    const t=tickets(),m=model();
// [VI dòng gốc 54] Kiểm tra !t.known: đúng thì chạy nhánh sau if. | gán S.reason bằng 'waiting_ticket_data' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(!t.known){S.reason='waiting_ticket_data';return;}
// [VI dòng gốc 55] Kiểm tra S.lease: đúng thì chạy nhánh sau if. | gọi arb()?.renew('combat') để gia hạn quyền đang giữ (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    if(S.lease)arb()?.renew?.('combat');
// [VI dòng gốc 56] Kiểm tra S.pending: đúng thì chạy nhánh sau if.
    if(S.pending){
// [VI dòng gốc 57] Kiểm tra inside(): đúng thì chạy nhánh sau if. | gán S.pending.entered bằng true | gán S.reason bằng 'fighting_summoned_boss' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      if(inside()){S.pending.entered=true;S.reason='fighting_summoned_boss';return;}
// [VI dòng gốc 58] Chú thích gốc của tác giả; không được thực thi. Nội dung: Vé giảm là ACK tiêu vé, nhưng vẫn chờ map về để không gọi Boss tiếp giữa trận.
      // Vé giảm là ACK tiêu vé, nhưng vẫn chờ map về để không gọi Boss tiếp giữa trận.
// [VI dòng gốc 59] Kiểm tra common()&&S.pending.entered: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gán S.pending bằng null | gán S.reason bằng 'returned_from_boss'
      if(common()&&S.pending.entered){S.pending=null;S.reason='returned_from_boss';}
// [VI dòng gốc 60] gán S.reason bằng Date.now()-S.pending.at>30000?'waiting_summon_ack_no_retry':'waiting_summon_entry' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      else {S.reason=Date.now()-S.pending.at>30000?'waiting_summon_ack_no_retry':'waiting_summon_entry';return;}
// [VI dòng gốc 61] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 62] Kiểm tra !common(): đúng thì chạy nhánh sau if. | gán S.reason bằng inside()?'native_boss_fight':'other_activity' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(!common()){S.reason=inside()?'native_boss_fight':'other_activity';return;}
// [VI dòng gốc 63] Kiểm tra W.KVPV_QUEST_PRIORITY?.blocks?.('summon_boss'): đúng thì chạy nhánh sau if. | gọi disableAuto() | gọi release() để nhả quyền điều khiển đang giữ | gán S.reason bằng 'priority_quest'
    if(W.KVPV_QUEST_PRIORITY?.blocks?.('summon_boss')){disableAuto();release();S.reason='priority_quest';return;}
// [VI dòng gốc 64] Kiểm tra !t.normal&&!t.epic: đúng thì chạy nhánh sau if. | gọi disableAuto() | gọi release() để nhả quyền điều khiển đang giữ | gán S.reason bằng 'tickets_exhausted'
    if(!t.normal&&!t.epic){disableAuto();release();S.reason='tickets_exhausted';return;}
// [VI dòng gốc 65] Kiểm tra !reserve(): đúng thì chạy nhánh sau if. | gán S.reason bằng 'scene_reserved' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(!reserve()){S.reason='scene_reserved';return;}
// [VI dòng gốc 66] Khai báo biến không gán lại bằng const: p = gọi panel()
    const p=panel();
// [VI dòng gốc 67] Kiểm tra !p: đúng thì chạy nhánh sau if. | Kiểm tra Date.now()>=S.nextOpen: đúng thì chạy nhánh sau if. | gán S.nextOpen bằng Date.now()+5000 | gọi ui()?.open(952) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    if(!p){if(Date.now()>=S.nextOpen){S.nextOpen=Date.now()+5000;ui()?.open?.(952);}S.reason='opening_summon_panel';return;}
// [VI dòng gốc 68] Kiểm tra p.gotoBtn?.disabled||p.gotoBtn?.gray: đúng thì chạy nhánh sau if. | gọi disableAuto() | gọi release() để nhả quyền điều khiển đang giữ | gán S.reason bằng 'native_summon_locked'
    if(p.gotoBtn?.disabled||p.gotoBtn?.gray){disableAuto();release();S.reason='native_summon_locked';return;}
// [VI dòng gốc 69] Khai báo biến không gán lại bằng const: wantEpic = tính biểu thức t.normal<1
    const wantEpic=t.normal<1;
// [VI dòng gốc 70] Kiểm tra p.curCheckBox?.selected!==wantEpic: đúng thì chạy nhánh sau if.
    if(p.curCheckBox?.selected!==wantEpic){
// [VI dòng gốc 71] Khai báo biến không gán lại bằng const: select = nếu wantEpic thì lấy p._nUs, ngược lại lấy p._sUs
      const select=wantEpic?p._nUs:p._sUs;
// [VI dòng gốc 72] Kiểm tra typeof select!=='function': đúng thì chạy nhánh sau if. | gán S.reason bằng 'missing_native_ticket_selector' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      if(typeof select!=='function'){S.reason='missing_native_ticket_selector';return;}
// [VI dòng gốc 73] gọi select.call(p)
      select.call(p);
// [VI dòng gốc 74] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 75] Kiểm tra p.curCheckBox?.selected!==wantEpic: đúng thì chạy nhánh sau if. | gán S.reason bằng 'waiting_ticket_selection' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(p.curCheckBox?.selected!==wantEpic){S.reason='waiting_ticket_selection';return;}
// [VI dòng gốc 76] Khai báo biến không gán lại bằng const: useManual = manual()||p.autoCheckBox?.visible===false hoặc dùng vế phải khi vế trái falsy: p.autoCheckBox?.disabled===true
    const useManual=manual()||p.autoCheckBox?.visible===false||p.autoCheckBox?.disabled===true;
// [VI dòng gốc 77] Kiểm tra useManual: đúng thì chạy nhánh sau if, sai thì chạy nhánh else.
    if(useManual){
// [VI dòng gốc 78] Chú thích gốc của tác giả; không được thực thi. Nội dung: Không để countdown native và vòng gọi tay cùng phát yêu cầu.
      // Không để countdown native và vòng gọi tay cùng phát yêu cầu.
// [VI dòng gốc 79] Kiểm tra m.isAutoCall: đúng thì chạy nhánh sau if. | Kiểm tra typeof p._ngt!=='function': đúng thì chạy nhánh sau if. | gán S.reason bằng 'waiting_native_auto_stop' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      if(m.isAutoCall){if(typeof p._ngt!=='function'){S.reason='waiting_native_auto_stop';return;}
// [VI dòng gốc 80] gọi p._ngt(); chức năng nội bộ chưa xác minh từ tên hàm | gán m.isAutoCall bằng false | gán S.autoOwned bằng false
        p._ngt();m.isAutoCall=false;S.autoOwned=false;}
// [VI dòng gốc 81] Kiểm tra typeof p._hQn!=='function': đúng thì chạy nhánh sau if. | gán S.reason bằng 'missing_native_summon_button' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      if(typeof p._hQn!=='function'){S.reason='missing_native_summon_button';return;}
// [VI dòng gốc 82] gán S.pending bằng {at:Date.now(),entered:false,normal:t.normal,epic:t.epic} | tăng S.requests một đơn vị sau khi lấy giá trị
      S.pending={at:Date.now(),entered:false,normal:t.normal,epic:t.epic};S.requests++;
// [VI dòng gốc 83] gán S.reason bằng 'manual_summon_sent' | gọi p._hQn(); chức năng nội bộ chưa xác minh từ tên hàm
      S.reason='manual_summon_sent';p._hQn();
// [VI dòng gốc 84] Tiếp tục hàm tick; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: }else{
    }else{
// [VI dòng gốc 85] Kiểm tra !m.isAutoCall: đúng thì chạy nhánh sau if. | Kiểm tra typeof p._cQn!=='function': đúng thì chạy nhánh sau if. | gán S.reason bằng 'missing_native_auto_checkbox' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      if(!m.isAutoCall){if(typeof p._cQn!=='function'){S.reason='missing_native_auto_checkbox';return;}
// [VI dòng gốc 86] gán S.autoOwned bằng true | gọi p._cQn(); chức năng nội bộ chưa xác minh từ tên hàm
        S.autoOwned=true;p._cQn();}
// [VI dòng gốc 87] gán S.autoOwned bằng true | gán S.reason bằng 'native_auto_summon'
      S.autoOwned=true;S.reason='native_auto_summon';
// [VI dòng gốc 88] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 89] Nhận lỗi bằng e và chạy phần xử lý lỗi. | gán S.lastError bằng String(e) | gán S.reason bằng 'error' | gọi W.KVPV_V1?.diagnostics?.record(e) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  }catch(e){S.lastError=String(e);S.reason='error';W.KVPV_V1?.diagnostics?.record?.(e);}}
// [VI dòng gốc 90] Định nghĩa hàm stop; tham số: không có. Mục đích: dừng bộ điều khiển và dọn tài nguyên | gán S.enabled bằng false
  function stop(){S.enabled=false;
// [VI dòng gốc 91] Kiểm tra S.timer!==null: đúng thì chạy nhánh sau if. | gọi W.KVPV_V1?.timers?.clearInterval??W.clearInterval(S.timer)
    if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);
// [VI dòng gốc 92] gán S.timer bằng null | gọi disableAuto() | gọi release() để nhả quyền điều khiển đang giữ
    S.timer=null;disableAuto();release();}
// [VI dòng gốc 93] Định nghĩa hàm start; tham số: không có. Mục đích: khởi động bộ điều khiển | Kiểm tra S.timer!==null: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể. | gán S.enabled bằng true
  function start(){if(S.timer!==null)return;S.enabled=true;
// [VI dòng gốc 94] gán S.timer bằng (W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,1000) | gọi tick() để xử lý một nhịp kiểm tra
    S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,1000);tick();}
// [VI dòng gốc 95] gán W.KVPV_SUMMON_BOSS bằng Object.freeze({start,stop,sync:tick, status:()=>({enabled:S.enabled,actor,mode:S.mode,manual:manual(),reason:S.reason,pending:S.pending?{...S.pending}:null, tickets:tickets(),reque…
  W.KVPV_SUMMON_BOSS=Object.freeze({start,stop,sync:tick,
// [VI dòng gốc 96] Thuộc tính status: tạo hàm với tham số (không có); mỗi lần gọi trả về tạo đối tượng gồm enabled, actor, mode, manual, reason, pending, tickets, requests, lastError, allowKNB | Thuộc tính enabled: đọc S.enabled | Thuộc tính actor: dùng biến cùng tên | Thuộc tính mode: đọc S.mode
    status:()=>({enabled:S.enabled,actor,mode:S.mode,manual:manual(),reason:S.reason,pending:S.pending?{...S.pending}:null,
// [VI dòng gốc 97] Thuộc tính tickets: gọi tickets() | Thuộc tính requests: đọc S.requests | Thuộc tính lastError: đọc S.lastError | Thuộc tính allowKNB: false
      tickets:tickets(),requests:S.requests,lastError:S.lastError,allowKNB:false}),
// [VI dòng gốc 98] Kiểm tra !['adaptive','auto','manual'].includes(value): đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('mode: adaptive / auto / manual')
    setMode(value){if(!['adaptive','auto','manual'].includes(value))throw Error('mode: adaptive / auto / manual');
// [VI dòng gốc 99] gọi disableAuto() | gán S.mode bằng value | Kết thúc hàm hiện tại và trả về: gọi this.status() để trả trạng thái để kiểm tra.
      disableAuto();S.mode=value;return this.status();},
// [VI dòng gốc 100] Thuộc tính _handoff: tạo hàm với tham số (không có); mỗi lần gọi trả về tạo đối tượng gồm actor, pending, mode, requests | Thuộc tính actor: dùng biến cùng tên | Thuộc tính pending: nếu S.pending thì lấy {...S.pending}, ngược lại lấy null | Thuộc tính mode: đọc S.mode
    _handoff:()=>({actor,pending:S.pending?{...S.pending}:null,mode:S.mode,requests:S.requests})});
// [VI dòng gốc 101] gọi start() để khởi động bộ điều khiển
  start();
// [VI dòng gốc 102] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: })();
})();
// [VI dòng gốc 103] Dòng trống để tách các phần, không có lệnh thực thi.
