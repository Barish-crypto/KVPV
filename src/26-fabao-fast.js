// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: Pháp Bảo Tăng nhanh: gọi đúng handler native panel46._BDn (TXio [0]).
/* Pháp Bảo Tăng nhanh: gọi đúng handler native panel46._BDn (TXio [0]).
 * Chỉ Pháp Bảo đã kích hoạt, chưa tối đa và đủ vật phẩm/mảnh theo cfg native.
 * Không mua, không tự kích hoạt/luyện hóa. Một yêu cầu chờ ACK + tăng cấp server.
 * Giữ pending qua hot reload; không phát lại khi chưa rõ kết quả. */
// [VI dòng gốc 5] chạy ngay hàm bao để tạo phạm vi và khởi tạo phần chức năng bên trong
(() => {
// [VI dòng gốc 6] "use strict"
  'use strict';
// [VI dòng gốc 7] Khai báo biến không gán lại bằng const: W = window; old = đọc W.KVPV_FABAO_FAST; carry = gọi old?._handoff(); chức năng nội bộ chưa xác minh từ tên hàm (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gọi old?.stop() để dừng bộ điều khiển và dọn tài nguyên (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  const W=window,old=W.KVPV_FABAO_FAST,carry=old?._handoff?.();old?.stop?.();
// [VI dòng gốc 8] Khai báo biến không gán lại bằng const: actor = gọi String(W.__KVPV_OWN_ACTOR_ID||'') để chuyển sang chuỗi; same = tính biểu thức carry?.actor===actor
  const actor=String(W.__KVPV_OWN_ACTOR_ID||''),same=carry?.actor===actor;
// [VI dòng gốc 9] Khai báo biến không gán lại bằng const: S = tạo đối tượng gồm enabled, timer, pending, lastSent, ownedPanel, nextOpen, requests, confirmed, reason, lastError
  const S={enabled:true,timer:null,pending:same?carry.pending:null,lastSent:same?carry.lastSent:null,
// [VI dòng gốc 10] Thuộc tính ownedPanel: nếu same thì lấy carry.ownedPanel, ngược lại lấy false | Thuộc tính nextOpen: 0 | Thuộc tính requests: nếu same thì lấy carry.requests, ngược lại lấy 0
    ownedPanel:same?carry.ownedPanel:false,nextOpen:0,requests:same?carry.requests:0,
// [VI dòng gốc 11] Thuộc tính confirmed: nếu same thì lấy carry.confirmed, ngược lại lấy 0 | Thuộc tính reason: "waiting" | Thuộc tính lastError: ""
    confirmed:same?carry.confirmed:0,reason:'waiting',lastError:''};
// [VI dòng gốc 12] Khai báo biến không gán lại bằng const: model = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._Ba?._rnt?._vnt?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); ui = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._ft?._Y4n?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  const model=()=>W._Ba?._rnt?._vnt?.ins,ui=()=>W._ft?._Y4n?.ins;
// [VI dòng gốc 13] Khai báo biến không gán lại bằng const: owned = tạo hàm với tham số (không có); mỗi lần gọi trả về !!actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'') và chỉ đánh giá vế phải khi vế trái truthy: !W.__KVPV_UNIVERSAL_HALTED
  const owned=()=>!!actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;
// [VI dòng gốc 14] Định nghĩa hàm items; tham số: không có | Khai báo biến không gán lại bằng const: m = gọi model(); c = đọc W._ft?._s$?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); b = đọc W._Ba?._Ic?._aQ?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); all = tạo đối tượng bằng Map()
  function items(){const m=model(),c=W._ft?._s$?.ins,b=W._Ba?._Ic?._aQ?.ins,all=new Map();
// [VI dòng gốc 15] Lặp for: khởi tạo let group=0; tiếp tục khi group<4; sau mỗi vòng group++. | Khai báo biến có thể gán lại bằng let: group = 0
    for(let group=0;group<4;group++){
// [VI dòng gốc 16] Khai báo biến không gán lại bằng const: rows = gọi m?.getAmuletRefineQuaArr(group) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Kiểm tra !Array.isArray(rows): đúng thì chạy nhánh sau if. | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
      const rows=m?.getAmuletRefineQuaArr?.(group);if(!Array.isArray(rows))continue;
// [VI dòng gốc 17] Duyệt từng giá trị trong rows bằng const raw. | Khai báo biến không gán lại bằng const: raw (chưa gán giá trị) | Khai báo biến không gán lại bằng const: id = gọi Number(raw?.[0]) để chuyển sang số; level = gọi Number(m?.getFaBaoLv?.(id)) để chuyển sang số
      for(const raw of rows){const id=Number(raw?.[0]),level=Number(m?.getFaBaoLv?.(id));
// [VI dòng gốc 18] Kiểm tra !Number.isSafeInteger(id)||id<=0||!Number.isSafeInteger(level)||level<0: đúng thì chạy nhánh sau if. | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
        if(!Number.isSafeInteger(id)||id<=0||!Number.isSafeInteger(level)||level<0)continue;
// [VI dòng gốc 19] Khai báo biến không gán lại bằng const: row = gọi c?.getCfgByIdLevel(id, level) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); max = gọi Number(c?.getMaxLvById?.(id)) để chuyển sang số
        const row=c?.getCfgByIdLevel?.(id,level),max=Number(c?.getMaxLvById?.(id));
// [VI dòng gốc 20] Khai báo biến không gán lại bằng const: fragment = gọi Number(row?.[4]) để chuyển sang số; cost = gọi Number(row?.[3]?.[1]) để chuyển sang số
        const fragment=Number(row?.[4]),cost=Number(row?.[3]?.[1]);
// [VI dòng gốc 21] Khai báo biến không gán lại bằng const: count = gọi Number(b?.getItemCountById?.(id)) để chuyển sang số; parts = nếu fragment>0 thì lấy Number(b?.getItemCountById?.(fragment)), ngược lại lấy NaN
        const count=Number(b?.getItemCountById?.(id)),parts=fragment>0?Number(b?.getItemCountById?.(fragment)):NaN;
// [VI dòng gốc 22] Khai báo biến không gán lại bằng const: total = tính biểu thức count+parts
        const total=count+parts;
// [VI dòng gốc 23] Khai báo biến không gán lại bằng const: eligible = level>0&&Number.isFinite(max)&&level<max&&Number.isSafeInteger(cost)&&cost>0&& Number.isFinite(count)&&count>=0&&Number.isFinite(parts)&&parts>=0 và chỉ đánh giá vế phải khi vế trái truthy: total>=cost
        const eligible=level>0&&Number.isFinite(max)&&level<max&&Number.isSafeInteger(cost)&&cost>0&&
// [VI dòng gốc 24] gọi Number.isFinite(count) | gọi Number.isFinite(parts)
          Number.isFinite(count)&&count>=0&&Number.isFinite(parts)&&parts>=0&&total>=cost;
// [VI dòng gốc 25] gọi all.set(id, {id,level,group,max,cost,total,eligible})
        all.set(id,{id,level,group,max,cost,total,eligible});
// [VI dòng gốc 26] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
      }
// [VI dòng gốc 27] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 28] Kết thúc hàm hiện tại và trả về: gọi [...all.values()].sort((a,b)=>a.id-b.id) để sắp xếp mảng tại chỗ.
    return [...all.values()].sort((a,b)=>a.id-b.id);
// [VI dòng gốc 29] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 30] Định nghĩa hàm panel; tham số: không có | Khai báo biến không gán lại bằng const: p = gọi ui()?.getPanelById(46) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); Type = đọc W._Ba?._rnt?._GDn nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  function panel(){const p=ui()?.getPanelById?.(46),Type=W._Ba?._rnt?._GDn;
// [VI dòng gốc 31] Kết thúc hàm hiện tại và trả về: nếu typeof Type==='function'&&p instanceof Type&&ui()?.isOpened?.(46)&&p.parent&&p.visible!==false thì lấy p, ngược lại lấy null.
    return typeof Type==='function'&&p instanceof Type&&ui()?.isOpened?.(46)&&p.parent&&p.visible!==false?p:null;}
// [VI dòng gốc 32] Định nghĩa hàm closeOwnPanel; tham số: không có | Kiểm tra S.ownedPanel&&owned()&&panel(): đúng thì chạy nhánh sau if. | gọi ui()?.close(46) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gán S.ownedPanel bằng false
  function closeOwnPanel(){if(S.ownedPanel&&owned()&&panel())ui()?.close?.(46);S.ownedPanel=false;}
// [VI dòng gốc 33] Định nghĩa hàm idle; tham số: không có | Kiểm tra Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: false. | Khai báo biến không gán lại bằng const: q = gọi W.KVPV_DAILY?.quickState() (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); lease = gọi W.KVPV?.core?.scene?.status() để trả trạng thái để kiểm tra (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  function idle(){if(Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0))return false;const q=W.KVPV_DAILY?.quickState?.(),lease=W.KVPV?.core?.scene?.status?.();
// [VI dòng gốc 34] Kết thúc hàm hiện tại và trả về: W._Ba?._$a?.SceneUtil?.isCommonScene===true&&W._Ba?._$a?._yo?.ins?.isInMission!==true&& W._Ba?._rJ?._O$?.ins?.isDead!==true&&(!q?.job||['rảnh','ranh'].includes(q.job))&&!lease?.own… và chỉ đánh giá vế phải khi vế trái truthy: !W.KVPV_UPGRADES?.busy?.().
    return W._Ba?._$a?.SceneUtil?.isCommonScene===true&&W._Ba?._$a?._yo?.ins?.isInMission!==true&&
// [VI dòng gốc 35] gọi ['rảnh','ranh'].includes(q.job) để kiểm tra dữ liệu có chứa giá trị
      W._Ba?._rJ?._O$?.ins?.isDead!==true&&(!q?.job||['rảnh','ranh'].includes(q.job))&&!lease?.owner&&
// [VI dòng gốc 36] gọi W.KVPV_HITRUN1?.status(false) để trả trạng thái để kiểm tra | gọi W.KVPV_UPGRADES?.busy()
      !W.KVPV_HITRUN1?.status?.(false)?.running&&!W.KVPV_UPGRADES?.busy?.();
// [VI dòng gốc 37] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 38] Định nghĩa hàm tick; tham số: không có. Mục đích: xử lý một nhịp kiểm tra | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài.
  function tick(){try{
// [VI dòng gốc 39] Kiểm tra !S.enabled: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể. | Kiểm tra !owned(): đúng thì chạy nhánh sau if. | gọi stop() để dừng bộ điều khiển và dọn tài nguyên
    if(!S.enabled)return;if(W.KVPV_MATERIAL_RESERVE?.active===true){S.reason='materials_reserved_for_so_tai';return;}
    if(!owned()){stop();return;}
// [VI dòng gốc 40] Kiểm tra W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true: đúng thì chạy nhánh sau if. | gán S.reason bằng 'priority_popup' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true){S.reason='priority_popup';return;}
// [VI dòng gốc 41] Khai báo biến không gán lại bằng const: list = gọi items(); signature = gọi JSON.stringify(list.map(x=>[x.id,x.level,x.total])) để chuyển giá trị thành chuỗi JSON
    const list=items(),signature=JSON.stringify(list.map(x=>[x.id,x.level,x.total]));
// [VI dòng gốc 42] Kiểm tra S.pending: đúng thì chạy nhánh sau if.
    if(S.pending){
// [VI dòng gốc 43] Khai báo biến không gán lại bằng const: reply = đọc model()?.RefineAmuletRep nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); newReply = reply và chỉ đánh giá vế phải khi vế trái truthy: reply!==S.pending.reply
      const reply=model()?.RefineAmuletRep,newReply=reply&&reply!==S.pending.reply;
// [VI dòng gốc 44] Khai báo biến không gán lại bằng const: increased = gọi list.some(x=>x.level>Number(S.pending.levels[x.id]??x.level)) để kiểm tra có ít nhất một phần tử thỏa điều kiện
      const increased=list.some(x=>x.level>Number(S.pending.levels[x.id]??x.level));
// [VI dòng gốc 45] Kiểm tra newReply&&Number(reply[0])!==0: đúng thì chạy nhánh sau if. | gán S.reason bằng 'server_rejected' | gán S.lastError bằng 'Phap Bao result '+reply[0] | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      if(newReply&&Number(reply[0])!==0){S.reason='server_rejected';S.lastError='Phap Bao result '+reply[0];return;}
// [VI dòng gốc 46] Kiểm tra newReply&&Number(reply[0])===0&&increased: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | tăng S.confirmed một đơn vị sau khi lấy giá trị | gán S.pending bằng null | gán S.reason bằng 'upgrade_confirmed'
      if(newReply&&Number(reply[0])===0&&increased){S.confirmed++;S.pending=null;S.reason='upgrade_confirmed';}
// [VI dòng gốc 47] gán S.reason bằng Date.now()-S.pending.at>15000?'waiting_upgrade_ack_no_retry':'waiting_upgrade_ack' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      else {S.reason=Date.now()-S.pending.at>15000?'waiting_upgrade_ack_no_retry':'waiting_upgrade_ack';return;}
// [VI dòng gốc 48] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 49] Khai báo biến không gán lại bằng const: candidate = gọi list.find(x=>x.eligible) để tìm phần tử đầu tiên thỏa điều kiện
    const candidate=list.find(x=>x.eligible);
// [VI dòng gốc 50] Kiểm tra !candidate: đúng thì chạy nhánh sau if. | gán S.reason bằng 'no_owned_materials_or_max_level' | gọi closeOwnPanel() | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(!candidate){S.reason='no_owned_materials_or_max_level';closeOwnPanel();return;}
// [VI dòng gốc 51] Kiểm tra !idle(): đúng thì chạy nhánh sau if. | gán S.reason bằng 'other_activity' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(!idle()){S.reason='other_activity';return;}
// [VI dòng gốc 52] Kiểm tra S.lastSent===signature: đúng thì chạy nhánh sau if. | gán S.reason bằng 'already_requested_this_state' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(S.lastSent===signature){S.reason='already_requested_this_state';return;}
// [VI dòng gốc 53] Khai báo biến có thể gán lại bằng let: p = gọi panel()
    let p=panel();
// [VI dòng gốc 54] Kiểm tra !p: đúng thì chạy nhánh sau if. | Kiểm tra Date.now()>=S.nextOpen: đúng thì chạy nhánh sau if. | gán S.nextOpen bằng Date.now()+5000
    if(!p){if(Date.now()>=S.nextOpen){S.nextOpen=Date.now()+5000;
// [VI dòng gốc 55] Kiểm tra ui()?.isOpened?.(46)!==true: đúng thì chạy nhánh sau if. | gán S.ownedPanel bằng true | gọi ui()?.open(46) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
        if(ui()?.isOpened?.(46)!==true){S.ownedPanel=true;ui()?.open?.(46);}}
// [VI dòng gốc 56] gán S.reason bằng 'opening_fabao' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      S.reason='opening_fabao';return;}
// [VI dòng gốc 57] Kiểm tra !p._FSn: đúng thì chạy nhánh sau if. | gán S.reason bằng 'waiting_native_tabs' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(!p._FSn){S.reason='waiting_native_tabs';return;}
// [VI dòng gốc 58] Kiểm tra Number(p._FSn.selIdx)!==candidate.group: đúng thì chạy nhánh sau if. | gán p._FSn.selIdx bằng candidate.group | gán S.reason bằng 'selecting_fabao_group' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(Number(p._FSn.selIdx)!==candidate.group){p._FSn.selIdx=candidate.group;S.reason='selecting_fabao_group';return;}
// [VI dòng gốc 59] Kiểm tra !list.some(x=>x.id===Number(p._IDn)&&x.eligible): đúng thì chạy nhánh sau if.
    if(!list.some(x=>x.id===Number(p._IDn)&&x.eligible)){
// [VI dòng gốc 60] Khai báo biến không gán lại bằng const: index = gọi p._wgn?.array?.findIndex(row=>Number(row?.[0]?.[0])===candidate.id) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
      const index=p._wgn?.array?.findIndex?.(row=>Number(row?.[0]?.[0])===candidate.id);
// [VI dòng gốc 61] Kiểm tra Number.isInteger(index)&&index>=0: đúng thì chạy nhánh sau if. | gán p._wgn.selectedIndex bằng index
      if(Number.isInteger(index)&&index>=0)p._wgn.selectedIndex=index;
// [VI dòng gốc 62] gán S.reason bằng 'selecting_upgradeable_fabao' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      S.reason='selecting_upgradeable_fabao';return;
// [VI dòng gốc 63] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 64] Khai báo biến không gán lại bằng const: native = đọc W._Ba?._rnt?._GDn?.prototype?._BDn nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const native=W._Ba?._rnt?._GDn?.prototype?._BDn;
// [VI dòng gốc 65] Kiểm tra p._BDn!==native||typeof native!=='function': đúng thì chạy nhánh sau if. | gán S.reason bằng 'native_handler_changed' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(p._BDn!==native||typeof native!=='function'){S.reason='native_handler_changed';return;}
// [VI dòng gốc 66] Chú thích gốc của tác giả; không được thực thi. Nội dung: Đọc lại điều kiện đúng Pháp Bảo mà UI đang chọn; không gọi nhánh thiếu vật phẩm.
    // Đọc lại điều kiện đúng Pháp Bảo mà UI đang chọn; không gọi nhánh thiếu vật phẩm.
// [VI dòng gốc 67] Khai báo biến không gán lại bằng const: chosen = gọi list.find(x=>x.id===Number(p._IDn)) để tìm phần tử đầu tiên thỏa điều kiện
    const chosen=list.find(x=>x.id===Number(p._IDn));
// [VI dòng gốc 68] Kiểm tra !chosen?.eligible||p._EDn!==false||p.allupBtn?.visible===false||p.allupBtn?.disabled||p.allupBtn?.gray|| Number(p._kwn)!==chosen.cost||Number(p._Twn)<chosen.cost: đúng thì chạy nhánh sau if.
    if(!chosen?.eligible||p._EDn!==false||p.allupBtn?.visible===false||p.allupBtn?.disabled||p.allupBtn?.gray||
// [VI dòng gốc 69] gán S.reason bằng 'waiting_native_upgrade_selection' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      Number(p._kwn)!==chosen.cost||Number(p._Twn)<chosen.cost){S.reason='waiting_native_upgrade_selection';return;}
// [VI dòng gốc 70] gán S.pending bằng {at:Date.now(),reply:model()?.RefineAmuletRep,levels:Object.fromEntries(list.map(x=>[x.id,x.level]))}
    S.pending={at:Date.now(),reply:model()?.RefineAmuletRep,levels:Object.fromEntries(list.map(x=>[x.id,x.level]))};
// [VI dòng gốc 71] gán S.lastSent bằng signature | tăng S.requests một đơn vị sau khi lấy giá trị | gán S.reason bằng 'quick_upgrade_sent' | gọi native.call(p)
    S.lastSent=signature;S.requests++;S.reason='quick_upgrade_sent';native.call(p);
// [VI dòng gốc 72] Nhận lỗi bằng e và chạy phần xử lý lỗi. | gán S.lastError bằng String(e) | gán S.reason bằng 'error' | gọi W.KVPV_V1?.diagnostics?.record(e) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  }catch(e){S.lastError=String(e);S.reason='error';W.KVPV_V1?.diagnostics?.record?.(e);}}
// [VI dòng gốc 73] Định nghĩa hàm stop; tham số: không có. Mục đích: dừng bộ điều khiển và dọn tài nguyên | gán S.enabled bằng false | Kiểm tra S.timer!==null: đúng thì chạy nhánh sau if. | gọi W.KVPV_V1?.timers?.clearInterval??W.clearInterval(S.timer)
  function stop(){S.enabled=false;if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;}
// [VI dòng gốc 74] Định nghĩa hàm start; tham số: không có. Mục đích: khởi động bộ điều khiển | Kiểm tra S.timer!==null: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể. | gán S.enabled bằng true
  function start(){if(S.timer!==null)return;S.enabled=true;
// [VI dòng gốc 75] gán S.timer bằng (W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,500) | gọi tick() để xử lý một nhịp kiểm tra
    S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,500);tick();}
// [VI dòng gốc 76] gán W.KVPV_FABAO_FAST bằng Object.freeze({start,stop,sync:tick,inspect:items, status:()=>({enabled:S.enabled,actor,reason:S.reason,requests:S.requests,confirmed:S.confirmed, pending:S.pending?{at:S.pending.a…
  W.KVPV_FABAO_FAST=Object.freeze({start,stop,sync:tick,inspect:items,
// [VI dòng gốc 77] Thuộc tính status: tạo hàm với tham số (không có); mỗi lần gọi trả về tạo đối tượng gồm enabled, actor, reason, requests, confirmed, pending, eligible, lastError, allowKNB | Thuộc tính enabled: đọc S.enabled | Thuộc tính actor: dùng biến cùng tên | Thuộc tính reason: đọc S.reason
    status:()=>({enabled:S.enabled,actor,reason:S.reason,requests:S.requests,confirmed:S.confirmed,
// [VI dòng gốc 78] Thuộc tính pending: nếu S.pending thì lấy {at:S.pending.at}, ngược lại lấy null | Thuộc tính at: đọc S.pending.at | Thuộc tính eligible: gọi items().filter(x=>x.eligible) để giữ phần tử thỏa điều kiện | Thuộc tính lastError: đọc S.lastError
      pending:S.pending?{at:S.pending.at}:null,eligible:items().filter(x=>x.eligible),lastError:S.lastError,allowKNB:false}),
// [VI dòng gốc 79] Thuộc tính _handoff: tạo hàm với tham số (không có); mỗi lần gọi trả về tạo đối tượng gồm actor, pending, lastSent, ownedPanel, requests, confirmed | Thuộc tính actor: dùng biến cùng tên | Thuộc tính pending: đọc S.pending | Thuộc tính lastSent: đọc S.lastSent
    _handoff:()=>({actor,pending:S.pending,lastSent:S.lastSent,ownedPanel:S.ownedPanel,requests:S.requests,confirmed:S.confirmed})});
// [VI dòng gốc 80] gọi start() để khởi động bộ điều khiển
  start();
// [VI dòng gốc 81] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: })();
})();
// [VI dòng gốc 82] Dòng trống để tách các phần, không có lệnh thực thi.
