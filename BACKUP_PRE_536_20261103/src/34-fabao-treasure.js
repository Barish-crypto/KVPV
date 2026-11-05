// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: Shared regular treasure sender; default Pháp Bảo = type4. Single draw grade0, quickUse=false,
/* Shared regular treasure sender; default Pháp Bảo = type4. Single draw grade0, quickUse=false,
 * buy=false. Warehouse114 selected withdrawal uses native _lWn only. */
// [VI dòng gốc 3] chạy ngay hàm bao để tạo phạm vi và khởi tạo phần chức năng bên trong
(() => {
// [VI dòng gốc 4] "use strict"
  'use strict';
// [VI dòng gốc 5] Khai báo biến không gán lại bằng const: W = window; old = đọc W.KVPV_FABAO_TREASURE; carry = gọi old?._handoff(); chức năng nội bộ chưa xác minh từ tên hàm (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gọi old?.stop('reload') để dừng bộ điều khiển và dọn tài nguyên (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  const W=window,old=W.KVPV_FABAO_TREASURE,carry=old?._handoff?.();old?.stop?.('reload');
// [VI dòng gốc 6] Khai báo biến không gán lại bằng const: actor = gọi String(W.__KVPV_OWN_ACTOR_ID||'') để chuyển sang chuỗi; same = tính biểu thức carry?.actor===actor; id = "fabao_treasure_keys"
  const actor=String(W.__KVPV_OWN_ACTOR_ID||''),same=carry?.actor===actor,id='fabao_treasure_keys';
// [VI dòng gốc 7] Khai báo biến không gán lại bằng const: S = tạo đối tượng gồm enabled, timer, pending, ownedPanel, requests, confirmed, nextOpen, reason, registered, lastError
  const S={enabled:true,timer:null,pending:same?carry.pending:null,ownedPanel:same?carry.ownedPanel:false,
// [VI dòng gốc 8] Thuộc tính requests: nếu same thì lấy carry.requests, ngược lại lấy 0 | Thuộc tính confirmed: nếu same thì lấy carry.confirmed, ngược lại lấy 0 | Thuộc tính nextOpen: 0 | Thuộc tính reason: "waiting_goal"
    requests:same?carry.requests:0,confirmed:same?carry.confirmed:0,nextOpen:0,reason:'waiting_goal',registered:false,lastError:''};
// [VI dòng gốc 9] Khai báo biến không gán lại bằng const: catalog = tạo đối tượng bằng Map([[4,{type:4,panel:113,name:'Pháp Bảo',allowed:()=>need(),itemKnown:id=>(W.KVPV_FABAO_FAST?.inspect?.()??[]).some(x=>x.id…)
  const catalog=new Map([[4,{type:4,panel:113,name:'Pháp Bảo',allowed:()=>need(),itemKnown:id=>(W.KVPV_FABAO_FAST?.inspect?.()??[]).some(x=>x.id===id)||W._et?.getTypeById?.(id)===6}]]);
// [VI dòng gốc 10] Khai báo biến không gán lại bằng const: m = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._Ba?._ze?._Ve?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); bag = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._Ba?._Ic?._aQ?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); ui = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._ft?._Y4n?.ins nếu đối tượng tồn tại (bỏ q…
  const m=()=>W._Ba?._ze?._Ve?.ins,bag=()=>W._Ba?._Ic?._aQ?.ins,ui=()=>W._ft?._Y4n?.ins;
// [VI dòng gốc 11] Khai báo biến không gán lại bằng const: owned = tạo hàm với tham số (không có); mỗi lần gọi trả về actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'') và chỉ đánh giá vế phải khi vế trái truthy: !W.__KVPV_UNIVERSAL_HALTED
  const owned=()=>actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;
// [VI dòng gốc 12] Định nghĩa hàm need; tham số: không có | Khai báo biến không gán lại bằng const: p = gọi W.KVPV_PROGRESS_PLANNER?.inspect() (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Kết thúc hàm hiện tại và trả về: !!p?.goal&&p.remaining>0 và chỉ đánh giá vế phải khi vế trái truthy: !p.selected.
  function need(){const p=W.KVPV_PROGRESS_PLANNER?.inspect?.();return !!p?.goal&&p.remaining>0&&!p.selected;}
// [VI dòng gốc 13] Định nghĩa hàm allowed; tham số: type | Kết thúc hàm hiện tại và trả về: tính biểu thức catalog.get(type)?.allowed?.()===true.
  function allowed(type){return catalog.get(type)?.allowed?.()===true;}
// [VI dòng gốc 14] Định nghĩa hàm draw; tham số: type=4 | Khai báo biến không gán lại bằng const: model = gọi m(); condition = gọi W._ft?._oZ?.ins?.getItemConditionByGrad(type, 0) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); first = gọi model?.isFirst(type) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); key = gọi Number(condition?.[0]) để chuyển sang số; cost = gọi Number(condition?.[1]) để chuyển sang số; count = gọi Number(bag()?.getItemCountById?.(key)) để chuyển sang số
  function draw(type=4){const model=m(),condition=W._ft?._oZ?.ins?.getItemConditionByGrad?.(type,0),first=model?.isFirst?.(type),
// [VI dòng gốc 15] gọi Number(condition?.[0]) để chuyển sang số | gọi Number(condition?.[1]) để chuyển sang số | gọi Number(bag()?.getItemCountById?.(key)) để chuyển sang số | gọi bag()?.getItemCountById(key)
    key=Number(condition?.[0]),cost=Number(condition?.[1]),count=Number(bag()?.getItemCountById?.(key));
// [VI dòng gốc 16] Khai báo biến không gán lại bằng const: free = first===true hoặc dùng vế phải khi vế trái falsy: first===1; known = [true,false,0,1].includes(first)&&Number.isSafeInteger(key)&&key>0&&Number.isSafeInteger(cost)&&cost>0&&Number.isFinite(count) và chỉ đánh giá vế phải khi vế trái truthy: count>=0
    const free=first===true||first===1,known=[true,false,0,1].includes(first)&&Number.isSafeInteger(key)&&key>0&&Number.isSafeInteger(cost)&&cost>0&&Number.isFinite(count)&&count>=0;
// [VI dòng gốc 17] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm type, ready, key, cost, count, free.
    return {type,ready:known&&model?.isFcOpenByType?.(type)===true&&typeof model?.c_sendXunBao==='function'&&(free||count>=cost),key,cost,count,free};
// [VI dòng gốc 18] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 19] Định nghĩa hàm warehouse; tham số: type=4 | Khai báo biến không gán lại bằng const: rows = gọi bag()?.getItemsByBagType(4) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  function warehouse(type=4){const rows=bag()?.getItemsByBagType?.(4);
// [VI dòng gốc 20] Kết thúc hàm hiện tại và trả về: gọi (Array.isArray(rows)?rows:[]).filter(r=>Array.isArray(r)&&r[2]!=null&&Number(r[1])>0&&catalog.get(type)?.itemKnown?.(Number(r[0]))===true) để giữ phần tử thỏa điều kiện.
    return (Array.isArray(rows)?rows:[]).filter(r=>Array.isArray(r)&&r[2]!=null&&Number(r[1])>0&&catalog.get(type)?.itemKnown?.(Number(r[0]))===true);
// [VI dòng gốc 21] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 22] Định nghĩa hàm next; tham số: không có | Khai báo biến không gán lại bằng const: list = gọi [...catalog.keys()].filter(allowed) để giữ phần tử thỏa điều kiện
  function next(){const list=[...catalog.keys()].filter(allowed);
// [VI dòng gốc 23] Duyệt từng giá trị trong list bằng const type. | Khai báo biến không gán lại bằng const: type (chưa gán giá trị) | Kiểm tra warehouse(type).length: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm type, kind.
    for(const type of list)if(warehouse(type).length)return {type,kind:'withdraw'};
// [VI dòng gốc 24] Duyệt từng giá trị trong list bằng const type. | Khai báo biến không gán lại bằng const: type (chưa gán giá trị) | Kiểm tra draw(type).ready: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm type, kind.
    for(const type of list)if(draw(type).ready)return {type,kind:'draw'};
// [VI dòng gốc 25] Kết thúc hàm hiện tại và trả về: null.
    return null;
// [VI dòng gốc 26] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 27] Định nghĩa hàm panel; tham số: không có | Khai báo biến không gán lại bằng const: p = gọi ui()?.getPanelById(114) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); Type = đọc W._Ba?._ze?._rui nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  function panel(){const p=ui()?.getPanelById?.(114),Type=W._Ba?._ze?._rui;
// [VI dòng gốc 28] Kết thúc hàm hiện tại và trả về: nếu typeof Type==='function'&&p instanceof Type&&ui()?.isOpened?.(114)&&p.parent&&p.visible!==false thì lấy p, ngược lại lấy null.
    return typeof Type==='function'&&p instanceof Type&&ui()?.isOpened?.(114)&&p.parent&&p.visible!==false?p:null;
// [VI dòng gốc 29] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 30] Định nghĩa hàm safe; tham số: không có | Kiểm tra Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: false. | Khai báo biến không gán lại bằng const: d = gọi W.KVPV_DAILY?.quickState() (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  function safe(){if(Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0))return false;const d=W.KVPV_DAILY?.quickState?.();return owned()&&
// [VI dòng gốc 31] Tiếp tục hàm safe; thành phần cú pháp bắt đầu bằng name. Đọc cùng dòng mở phía trên: W._Ba?._$a?.SceneUtil?.isCommonScene===true&&W._Ba?._$a?._yo?.ins?.isInMission!==true&&W._Ba?._rJ?._O$?.ins?.isDead!==true&&
    W._Ba?._$a?.SceneUtil?.isCommonScene===true&&W._Ba?._$a?._yo?.ins?.isInMission!==true&&W._Ba?._rJ?._O$?.ins?.isDead!==true&&
// [VI dòng gốc 32] gọi ['rảnh','ranh'].includes(d.job) để kiểm tra dữ liệu có chứa giá trị | gọi W.KVPV?.core?.scene?.status() để trả trạng thái để kiểm tra | gọi W.KVPV_HITRUN1?.status(false) để trả trạng thái để kiểm tra
    (!d?.job||['rảnh','ranh'].includes(d.job))&&!W.KVPV?.core?.scene?.status?.()?.owner&&!W.KVPV_HITRUN1?.status?.(false)?.running;
// [VI dòng gốc 33] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 34] Định nghĩa hàm observe; tham số: không có | Khai báo biến không gán lại bằng const: p = đọc S.pending | Kiểm tra !p: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  function observe(){const p=S.pending;if(!p)return;
// [VI dòng gốc 35] Khai báo biến có thể gán lại bằng let: done = false
    let done=false;
// [VI dòng gốc 36] Kiểm tra p.kind==='draw': đúng thì chạy nhánh sau if, sai thì chạy nhánh else.
    if(p.kind==='draw'){
// [VI dòng gốc 37] Khai báo biến không gán lại bằng const: reply = đọc m()?.xbRep nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); changed = reply&&reply!==p.reply và chỉ đánh giá vế phải khi vế trái truthy: Number(reply[0])===(p.type??4)
      const reply=m()?.xbRep,changed=reply&&reply!==p.reply&&Number(reply[0])===(p.type??4);
// [VI dòng gốc 38] Kiểm tra changed&&Number(reply[1])!==0: đúng thì chạy nhánh sau if. | gán S.reason bằng 'treasure_server_rejected_no_retry' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      if(changed&&Number(reply[1])!==0){S.reason='treasure_server_rejected_no_retry';return;}
// [VI dòng gốc 39] Khai báo biến không gán lại bằng const: d = gọi draw(p.type??4) | gán done bằng changed&&Number(reply[1])===0&&(p.free&&!d.free||!p.free&&d.count<=p.count-p.cost)
      const d=draw(p.type??4);done=changed&&Number(reply[1])===0&&(p.free&&!d.free||!p.free&&d.count<=p.count-p.cost);
// [VI dòng gốc 40] Tiếp tục hàm observe; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: }else{
    }else{
// [VI dòng gốc 41] Khai báo biến không gán lại bằng const: rows = gọi bag()?.getItemsByBagType(4) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
      const rows=bag()?.getItemsByBagType?.(4);
// [VI dòng gốc 42] gán done bằng Array.isArray(rows)&&p.uids.every(uid=>!rows.some(r=>String(r?.[2])===uid))&& Object.entries(p.before).every(([id,n])=>Number(bag()?.getItemCountById?.(Number(id)))>=n+p.amount[id]…
      done=Array.isArray(rows)&&p.uids.every(uid=>!rows.some(r=>String(r?.[2])===uid))&&
// [VI dòng gốc 43] Định nghĩa hàm hàm không đặt tên; tham số: [id,n]
        Object.entries(p.before).every(([id,n])=>Number(bag()?.getItemCountById?.(Number(id)))>=n+p.amount[id]);
// [VI dòng gốc 44] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 45] Kiểm tra done: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gán S.pending bằng null | tăng S.confirmed một đơn vị sau khi lấy giá trị | gán S.reason bằng 'server_confirmed'
    if(done){S.pending=null;S.confirmed++;S.reason='server_confirmed';}
// [VI dòng gốc 46] gán S.reason bằng Date.now()-p.at>30000?'waiting_ack_no_retry':'waiting_server_ack'
    else S.reason=Date.now()-p.at>30000?'waiting_ack_no_retry':'waiting_server_ack';
// [VI dòng gốc 47] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 48] Định nghĩa hàm signature; tham số: rows | Kết thúc hàm hiện tại và trả về: gọi JSON.stringify(rows.map(r=>[r[0],r[1],String(r[2])])) để chuyển giá trị thành chuỗi JSON.
  function signature(rows){return JSON.stringify(rows.map(r=>[r[0],r[1],String(r[2])]));}
// [VI dòng gốc 49] Định nghĩa hàm probe; tham số: không có | Kiểm tra !S.enabled||!owned(): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm ready. | gọi observe()
  function probe(){if(!S.enabled||!owned())return {ready:false};observe();
// [VI dòng gốc 50] Kiểm tra S.pending||(W.KVPV_FREE_TREASURE?.busy?.()||W.KVPV_FESTIVAL_FREE?.busy?.())||!safe()||W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm ready.
    if(S.pending||(W.KVPV_FREE_TREASURE?.busy?.()||W.KVPV_FESTIVAL_FREE?.busy?.())||!safe()||W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true)return {ready:false};
// [VI dòng gốc 51] Khai báo biến không gán lại bằng const: selected = gọi next() | Kiểm tra !selected: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm ready. | Khai báo biến không gán lại bằng const: {type} = selected; rows = gọi warehouse(type)
    const selected=next();if(!selected)return {ready:false};const {type}=selected,rows=warehouse(type);
// [VI dòng gốc 52] Kiểm tra rows.length: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm ready, type, kind, signature.
    if(rows.length)return {ready:!!panel(),type,kind:'withdraw',signature:type+'/'+signature(rows)};
// [VI dòng gốc 53] Khai báo biến không gán lại bằng const: d = gọi draw(type); panelId = đọc catalog.get(type).panel; p = gọi ui()?.getPanelById(panelId) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const d=draw(type),panelId=catalog.get(type).panel,p=ui()?.getPanelById?.(panelId);
// [VI dòng gốc 54] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm các thuộc tính của d, ready, kind, signature.
    return {...d,ready:d.ready&&ui()?.isOpened?.(panelId)===true&&p?._Qh===type&&!!p.parent&&p.visible!==false,kind:'draw',signature:JSON.stringify([type,d.key,d.cost,d.count,d.free])};
// [VI dòng gốc 55] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 56] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 57] Định nghĩa hàm run; tham số: before | Khai báo biến không gán lại bằng const: q = gọi probe() | Kiểm tra !q.ready||q.signature!==before.signature||q.kind!==before.kind||q.type!==before.type: đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('Fabao treasure state changed')
  function run(before){const q=probe();if(!q.ready||q.signature!==before.signature||q.kind!==before.kind||q.type!==before.type)throw Error('Fabao treasure state changed');
// [VI dòng gốc 58] Kiểm tra q.kind==='draw': đúng thì chạy nhánh sau if, sai thì chạy nhánh else.
    if(q.kind==='draw'){
// [VI dòng gốc 59] gán S.pending bằng {kind:'draw',type:q.type,at:Date.now(),reply:m()?.xbRep,key:q.key,cost:q.cost,count:q.count,free:q.free} | tăng S.requests một đơn vị sau khi lấy giá trị
      S.pending={kind:'draw',type:q.type,at:Date.now(),reply:m()?.xbRep,key:q.key,cost:q.cost,count:q.count,free:q.free};S.requests++;
// [VI dòng gốc 60] Chú thích gốc của tác giả; không được thực thi. Nội dung: Fixed single draw prevents checkbox multipliers and disables buy-shortfall.
      // Fixed single draw prevents checkbox multipliers and disables buy-shortfall.
// [VI dòng gốc 61] gọi m().c_sendXunBao(0, q.free, false, q.type, false)
      m().c_sendXunBao(0,q.free,false,q.type,false);
// [VI dòng gốc 62] Tiếp tục hàm run; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: }else{
    }else{
// [VI dòng gốc 63] Khai báo biến không gán lại bằng const: p = gọi panel(); native = đọc W._Ba?._ze?._rui?.prototype?._lWn nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); rows = gọi warehouse(q.type); before = tạo đối tượng gồm ; amount = tạo đối tượng gồm
      const p=panel(),native=W._Ba?._ze?._rui?.prototype?._lWn,rows=warehouse(q.type),before={},amount={};
// [VI dòng gốc 64] Kiểm tra typeof native!=='function'||p?._lWn!==native: đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('Warehouse handler changed')
      if(typeof native!=='function'||p?._lWn!==native)throw Error('Warehouse handler changed');
// [VI dòng gốc 65] Khai báo biến không gán lại bằng const: capacity = gọi W._Ba?._Ic?.BeiBaoTool?.canAddItemsAndTip(rows) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
      const capacity=W._Ba?._Ic?.BeiBaoTool?.canAddItemsAndTip?.(rows);
// [VI dòng gốc 66] Kiểm tra capacity!==true&&capacity!==1: đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('Bag cannot receive Phap Bao')
      if(capacity!==true&&capacity!==1)throw Error('Bag cannot receive Phap Bao');
// [VI dòng gốc 67] Kiểm tra !Array.isArray(m()?.selectArr): đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('Warehouse selection unavailable')
      if(!Array.isArray(m()?.selectArr))throw Error('Warehouse selection unavailable');
// [VI dòng gốc 68] Duyệt từng giá trị trong rows bằng const r. | Khai báo biến không gán lại bằng const: r (chưa gán giá trị) | gán before[r[0]] bằng Number(bag().getItemCountById(r[0])) | gán amount[r[0]] bằng (amount[r[0]]||0)+Number(r[1])
      for(const r of rows){before[r[0]]=Number(bag().getItemCountById(r[0]));amount[r[0]]=(amount[r[0]]||0)+Number(r[1]);}
// [VI dòng gốc 69] gán S.pending bằng {kind:'withdraw',type:q.type,at:Date.now(),uids:rows.map(r=>String(r[2])),before,amount} | tăng S.requests một đơn vị sau khi lấy giá trị
      S.pending={kind:'withdraw',type:q.type,at:Date.now(),uids:rows.map(r=>String(r[2])),before,amount};S.requests++;
// [VI dòng gốc 70] gán m().selectArr.length bằng 0 | gọi m().selectArr.push(...rows) để thêm phần tử vào cuối mảng | gọi native.call(p)
      m().selectArr.length=0;m().selectArr.push(...rows);native.call(p);
// [VI dòng gốc 71] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 72] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 73] Định nghĩa hàm sync; tham số: không có | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | Kiểm tra !S.enabled: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  function sync(){try{if(!S.enabled)return;if(!owned()){stop();return;}observe();if(S.pending)return;
// [VI dòng gốc 74] Khai báo biến không gán lại bằng const: selected = gọi next()
    const selected=next();
// [VI dòng gốc 75] Kiểm tra !selected: đúng thì chạy nhánh sau if. | gán S.reason bằng 'no_authorized_free_or_key_work' | Kiểm tra S.ownedPanel&&panel(): đúng thì chạy nhánh sau if. | gọi ui().close(114) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    if(!selected){S.reason='no_authorized_free_or_key_work';if(S.ownedPanel&&panel()){ui().close?.(114);S.ownedPanel=false;}return;}
// [VI dòng gốc 76] Kiểm tra (W.KVPV_FREE_TREASURE?.busy?.()||W.KVPV_FESTIVAL_FREE?.busy?.())||!safe()||W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true: đúng thì chạy nhánh sau if. | gán S.reason bằng 'waiting_idle_or_popup' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if((W.KVPV_FREE_TREASURE?.busy?.()||W.KVPV_FESTIVAL_FREE?.busy?.())||!safe()||W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true){S.reason='waiting_idle_or_popup';return;}
// [VI dòng gốc 77] Khai báo biến không gán lại bằng const: {type,kind} = selected
    const {type,kind}=selected;
// [VI dòng gốc 78] Kiểm tra kind==='withdraw'&&!panel()&&Date.now()>=S.nextOpen: đúng thì chạy nhánh sau if.
    if(kind==='withdraw'&&!panel()&&Date.now()>=S.nextOpen){
// [VI dòng gốc 79] gán S.nextOpen bằng Date.now()+5000 | Kiểm tra ui()?.isOpened?.(114)!==true: đúng thì chạy nhánh sau if. | gán S.ownedPanel bằng true | gọi ui()?.open(114) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
      S.nextOpen=Date.now()+5000;if(ui()?.isOpened?.(114)!==true){S.ownedPanel=true;ui()?.open?.(114);}S.reason='opening_equipment_warehouse';return;}
// [VI dòng gốc 80] Khai báo biến không gán lại bằng const: panelId = đọc catalog.get(type).panel
    const panelId=catalog.get(type).panel;
// [VI dòng gốc 81] Kiểm tra kind==='draw'&&ui()?.isOpened?.(panelId)!==true&&Date.now()>=S.nextOpen: đúng thì chạy nhánh sau if.
    if(kind==='draw'&&ui()?.isOpened?.(panelId)!==true&&Date.now()>=S.nextOpen){
// [VI dòng gốc 82] gán S.nextOpen bằng Date.now()+5000 | gọi ui()?.open(panelId, type) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gán S.reason bằng 'opening_treasure_type_'+type | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      S.nextOpen=Date.now()+5000;ui()?.open?.(panelId,type);S.reason='opening_treasure_type_'+type;return;
// [VI dòng gốc 83] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 84] gán S.reason bằng kind==='withdraw'?'waiting_warehouse_claim_queue':'waiting_key_draw_queue'
    S.reason=kind==='withdraw'?'waiting_warehouse_claim_queue':'waiting_key_draw_queue';
// [VI dòng gốc 85] Nhận lỗi bằng e và chạy phần xử lý lỗi. | gán S.lastError bằng String(e) | gán S.reason bằng 'error'
  }catch(e){S.lastError=String(e);S.reason='error';}}
// [VI dòng gốc 86] Định nghĩa hàm hasWork; tham số: không có | Kết thúc hàm hiện tại và trả về: S.enabled&&owned() và chỉ đánh giá vế phải khi vế trái truthy: !!S.pending&&(S.pending.type??4)===4||need()&&(warehouse().length>0||draw().ready).
  function hasWork(){return S.enabled&&owned()&&(!!S.pending&&(S.pending.type??4)===4||need()&&(warehouse().length>0||draw().ready));}
// [VI dòng gốc 87] Định nghĩa hàm stop; tham số: không có. Mục đích: dừng bộ điều khiển và dọn tài nguyên | gán S.enabled bằng false | Kiểm tra S.timer!==null: đúng thì chạy nhánh sau if. | gọi W.KVPV_V1?.timers?.clearInterval??W.clearInterval(S.timer)
  function stop(){S.enabled=false;if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;if(S.registered)W.KVPV_V8?.toggle?.(id,false);}
// [VI dòng gốc 88] gán W.KVPV_FABAO_TREASURE bằng Object.freeze({sync,stop,hasWork,registerType(d){if(![0,1,2,3].includes(d?.type)||!Number.isSafeInteger(d.panel)||typeof d.allowed!=='function'||typeof d.itemKnown!=='function')thr… | Kiểm tra ![0,1,2,3].includes(d?.type)||!Number.isSafeInteger(d.panel)||typeof d.allowed!=='function'||typeof d.itemKnown!=='function': đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('Unverified treasure type') | gọi catalog.set(d.type, d)
  W.KVPV_FABAO_TREASURE=Object.freeze({sync,stop,hasWork,registerType(d){if(![0,1,2,3].includes(d?.type)||!Number.isSafeInteger(d.panel)||typeof d.allowed!=='function'||typeof d.itemKnown!=='function')throw Error('Unverified treasure type');catalog.set(d.type,d);},
// [VI dòng gốc 89] Thuộc tính inspectType: tạo hàm với tham số type; mỗi lần gọi trả về tạo đối tượng gồm draw, warehouse | Thuộc tính draw: gọi draw(type) | Thuộc tính warehouse: đọc warehouse(type).length
    inspectType:type=>({draw:draw(type),warehouse:warehouse(type).length}),
// [VI dòng gốc 90] Thuộc tính hasAnyWork: tạo hàm với tham số (không có); mỗi lần gọi trả về S.enabled&&owned() và chỉ đánh giá vế phải khi vế trái truthy: !!S.pending||!!next() | Thuộc tính _probe: probe | Thuộc tính _run: run
    hasAnyWork:()=>S.enabled&&owned()&&(!!S.pending||!!next()),_probe:probe,_run:run,
// [VI dòng gốc 91] Thuộc tính status: tạo hàm với tham số (không có); mỗi lần gọi trả về tạo đối tượng gồm enabled, actor, reason, draw, warehouse, pending, requests, confirmed, categories, lastError, allowKNB | Thuộc tính enabled: đọc S.enabled | Thuộc tính actor: dùng biến cùng tên | Thuộc tính reason: đọc S.reason
    status:()=>({enabled:S.enabled,actor,reason:S.reason,draw:draw(),warehouse:warehouse().length,pending:S.pending?.kind??null,requests:S.requests,confirmed:S.confirmed,categories:[...catalog.values()].map(d=>({type:d.type,name:d.name,allowed:allowed(d.type),draw:draw(d.type),warehouse:warehouse(d.type).length})),lastError:S.lastError,allowKNB:false}),
// [VI dòng gốc 92] Thuộc tính _handoff: tạo hàm với tham số (không có); mỗi lần gọi trả về tạo đối tượng gồm actor, pending, ownedPanel, requests, confirmed | Thuộc tính actor: dùng biến cùng tên | Thuộc tính pending: đọc S.pending | Thuộc tính ownedPanel: đọc S.ownedPanel
    _handoff:()=>({actor,pending:S.pending,ownedPanel:S.ownedPanel,requests:S.requests,confirmed:S.confirmed})});
// [VI dòng gốc 93] gán W.KVPV_TREASURE_AUTO bằng W.KVPV_FABAO_TREASURE
  W.KVPV_TREASURE_AUTO=W.KVPV_FABAO_TREASURE;
// [VI dòng gốc 94] Khai báo biến không gán lại bằng const: queue = đọc W.KVPV_V8 | Kiểm tra queue?.register&&queue?.toggle: đúng thì chạy nhánh sau if. | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | gọi queue.register({id,name:'Tầm Bảo: dùng chìa miễn phí và lấy trang bị từ Kho',kind:'work',spend:'materials',verified:true,enabled:true, …)
  const queue=W.KVPV_V8;if(queue?.register&&queue?.toggle){try{queue.register({id,name:'Tầm Bảo: dùng chìa miễn phí và lấy trang bị từ Kho',kind:'work',spend:'materials',verified:true,enabled:true,
// [VI dòng gốc 95] Thuộc tính background: false | Thuộc tính redIds: tạo mảng gồm 0 vị trí: [] | Thuộc tính hourlyLimit: 60 | Thuộc tính cooldownMs: 2000
      background:false,redIds:[],hourlyLimit:60,cooldownMs:2000,probe:()=>W.KVPV_FABAO_TREASURE?._probe()??{ready:false},run:p=>W.KVPV_FABAO_TREASURE?._run(p)});
// [VI dòng gốc 96] Nhận lỗi bằng e và chạy phần xử lý lỗi. | Kiểm tra !/Trung module ID|already exists/i.test(String(e)): đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: e
    }catch(e){if(!/Trung module ID|already exists/i.test(String(e)))throw e;}
// [VI dòng gốc 97] gọi queue.toggle(id, true) | gán S.registered bằng true
    queue.toggle(id,true);S.registered=true;}
// [VI dòng gốc 98] gán S.timer bằng (W.KVPV_V1?.timers?.setInterval??W.setInterval)(sync,500) | gọi sync()
  S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(sync,500);sync();
// [VI dòng gốc 99] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: })();
})();
// [VI dòng gốc 100] Dòng trống để tách các phần, không có lệnh thực thi.
