// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: First verified red-dot route: Luyen Khi -> soul forge (action 192, red 156).
/* First verified red-dot route: Luyen Khi -> soul forge (action 192, red 156).
 * UI navigation/material selection only; existing resource worker owns the RPC. */
// [VI dòng gốc 3] chạy ngay hàm bao để tạo phạm vi và khởi tạo phần chức năng bên trong
(() => {
// [VI dòng gốc 4] "use strict"
  'use strict';
// [VI dòng gốc 5] Khai báo biến không gán lại bằng const: W = window; old = đọc W.KVPV_RED_NAVIGATOR; c = gọi old?._handoff(); chức năng nội bộ chưa xác minh từ tên hàm (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gọi old?.stop() để dừng bộ điều khiển và dọn tài nguyên (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  const W=window,old=W.KVPV_RED_NAVIGATOR,c=old?._handoff?.();old?.stop?.();
// [VI dòng gốc 6] Khai báo biến không gán lại bằng const: actor = gọi String(W.__KVPV_OWN_ACTOR_ID||'') để chuyển sang chuỗi; same = tính biểu thức c?.actor===actor
  const actor=String(W.__KVPV_OWN_ACTOR_ID||''),same=c?.actor===actor;
// [VI dòng gốc 7] Khai báo biến không gán lại bằng const: S = tạo đối tượng gồm timer, enabled, opened, pending, confirmed, reason, error
  const S={timer:null,enabled:true,opened:same?c.opened:null,pending:same?c.pending:null,confirmed:same?c.confirmed:0,reason:'waiting',error:''};
// [VI dòng gốc 8] Khai báo biến không gán lại bằng const: owned = tạo hàm với tham số (không có); mỗi lần gọi trả về actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'') và chỉ đánh giá vế phải khi vế trái truthy: !W.__KVPV_UNIVERSAL_HALTED
  const owned=()=>actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;
// [VI dòng gốc 9] Khai báo biến không gán lại bằng const: model = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._Ba?._eW?._pEt?.inst nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  const model=()=>W._Ba?._eW?._pEt?.inst;
// [VI dòng gốc 10] Khai báo biến không gán lại bằng const: signature = tạo hàm với tham số (không có); mỗi lần gọi trả về nếu Array.isArray(model()?.zhList) thì lấy JSON.stringify(model().zhList.map(r=>r?[r[0],r[1],r[2]]:null)), ngược lại lấy null
  const signature=()=>Array.isArray(model()?.zhList)?JSON.stringify(model().zhList.map(r=>r?[r[0],r[1],r[2]]:null)):null;
// [VI dòng gốc 11] Khai báo biến không gán lại bằng const: strengthSignature = tạo hàm với tham số (không có) | Khai báo biến không gán lại bằng const: d = đọc W._Ba?._Agt?._Rgt?.ins?.partLev nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Kết thúc hàm hiện tại và trả về: nếu Array.isArray(d?.keys) thì lấy JSON.stringify(d.keys.slice(0,10).map(k=>[k,d.get(k)])), ngược lại lấy null.
  const strengthSignature=()=>{const d=W._Ba?._Agt?._Rgt?.ins?.partLev;return Array.isArray(d?.keys)?JSON.stringify(d.keys.slice(0,10).map(k=>[k,d.get(k)])):null;};
// [VI dòng gốc 12] Định nghĩa hàm findPanel; tham số: ui | Khai báo biến không gán lại bằng const: Type = đọc W._Ba?._eW?._NTi nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Kiểm tra typeof Type!=='function': đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: null.
  function findPanel(ui){const Type=W._Ba?._eW?._NTi;if(typeof Type!=='function')return null;
// [VI dòng gốc 13] Khai báo biến không gán lại bằng const: queue = gọi Object.keys(ui?.openTable??ui?._H$t??{}).slice(0,80).filter(id=>ui.isOpened?.(Number(id))).map(id=>ui.getPanelById?.(Number(id))) để biến đổi từng phần tử; seen = tạo đối tượng bằng Set()
    const queue=Object.keys(ui?.openTable??ui?._H$t??{}).slice(0,80).filter(id=>ui.isOpened?.(Number(id))).map(id=>ui.getPanelById?.(Number(id))),seen=new Set();
// [VI dòng gốc 14] Lặp for: khởi tạo let n=0; tiếp tục khi queue.length&&n<240; sau mỗi vòng n++. | Khai báo biến có thể gán lại bằng let: n = 0 | Khai báo biến không gán lại bằng const: p = gọi queue.shift() | Kiểm tra !p||seen.has(p)||p.visible===false||p.destroyed: đúng thì chạy nhánh sau if.
    for(let n=0;queue.length&&n<240;n++){const p=queue.shift();if(!p||seen.has(p)||p.visible===false||p.destroyed)continue;seen.add(p);
// [VI dòng gốc 15] Kiểm tra p instanceof Type&&p.parent: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: p.
      if(p instanceof Type&&p.parent)return p;
// [VI dòng gốc 16] Khai báo biến không gán lại bằng const: children = p._children hoặc dùng vế phải khi vế trái là null/undefined: p._childs | Kiểm tra Array.isArray(children): đúng thì chạy nhánh sau if. | gọi queue.push(...children.slice(0,40)) để thêm phần tử vào cuối mảng
      const children=p._children??p._childs;if(Array.isArray(children))queue.push(...children.slice(0,40));
// [VI dòng gốc 17] Kết thúc hàm hiện tại và trả về: null.
    }return null;
// [VI dòng gốc 18] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 19] Định nghĩa hàm tick; tham số: không có. Mục đích: xử lý một nhịp kiểm tra | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài.
  function tick(){try{
// [VI dòng gốc 20] Kiểm tra !S.enabled: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể. | Kiểm tra !owned(): đúng thì chạy nhánh sau if. | gọi stop() để dừng bộ điều khiển và dọn tài nguyên
    if(!S.enabled)return;if(!owned()){stop();return;}
// [VI dòng gốc 21] Khai báo biến không gán lại bằng const: sig = gọi signature() | Kiểm tra S.pending?.kind==='gearCraft': đúng thì chạy nhánh sau if.
    const sig=signature();if(S.pending?.kind==='gearCraft'){
// [VI dòng gốc 22] Khai báo biến không gán lại bằng const: verified = gọi Number(W.KVPV_BG_RESOURCES?.status?.()?.stats?.gearCraft?.verified) để chuyển sang số
      const verified=Number(W.KVPV_BG_RESOURCES?.status?.()?.stats?.gearCraft?.verified);
// [VI dòng gốc 23] Kiểm tra Number.isFinite(verified)&&verified>S.pending.verified: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gán S.pending bằng null | tăng S.confirmed một đơn vị sau khi lấy giá trị | gán S.reason bằng 'waiting_craft_worker_verification'
      if(Number.isFinite(verified)&&verified>S.pending.verified){S.pending=null;S.confirmed++;}else{S.reason='waiting_craft_worker_verification';return;}
// [VI dòng gốc 24] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 25] Kiểm tra S.pending: đúng thì chạy nhánh sau if. | Khai báo biến không gán lại bằng const: current = nếu S.pending.kind==='strength' thì lấy strengthSignature(), ngược lại lấy sig; before = nếu S.pending.kind==='strength' thì lấy S.pending.before, ngược lại lấy S.pending
    if(S.pending){const current=S.pending.kind==='strength'?strengthSignature():sig,before=S.pending.kind==='strength'?S.pending.before:S.pending;
// [VI dòng gốc 26] Kiểm tra current!==null&&current!==before: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gán S.pending bằng null | tăng S.confirmed một đơn vị sau khi lấy giá trị | gán S.reason bằng 'waiting_existing_worker_ack'
      if(current!==null&&current!==before){S.pending=null;S.confirmed++;}else{S.reason='waiting_existing_worker_ack';return;}}
// [VI dòng gốc 27] Kiểm tra Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0): đúng thì chạy nhánh sau if. | gán S.reason bằng 'user_using_ui' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)){S.reason='user_using_ui';return;}
// [VI dòng gốc 28] Khai báo biến không gán lại bằng const: q = gọi W.KVPV_DAILY?.quickState() (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); worker = đọc W.KVPV_BG_RESOURCES; state = gọi worker?.status() để trả trạng thái để kiểm tra (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const q=W.KVPV_DAILY?.quickState?.(),worker=W.KVPV_BG_RESOURCES,state=worker?.status?.();
// [VI dòng gốc 29] Kiểm tra !worker||state?.running!==true||state.active!==true: đúng thì chạy nhánh sau if. | gán S.reason bằng 'worker_disabled_or_halted' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(!worker||state?.running!==true||state.active!==true){S.reason='worker_disabled_or_halted';return;}
// [VI dòng gốc 30] Kiểm tra state.busy: đúng thì chạy nhánh sau if. | gán S.reason bằng 'existing_worker_busy' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(state.busy){S.reason='existing_worker_busy';return;}
// [VI dòng gốc 31] Kiểm tra q?.running!==true||!['rảnh','ranh'].includes(q.job)||W._Ba?._$a?.SceneUtil?.isCommonScene!==true||W._Ba?._$a?._yo?.ins?.isInMission===true||W._Ba?._rJ?._O$?.ins?.isDead===true||W.K…: đúng thì chạy nhánh sau if. | gán S.reason bằng 'defer_ui_until_idle' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(q?.running!==true||!['rảnh','ranh'].includes(q.job)||W._Ba?._$a?.SceneUtil?.isCommonScene!==true||W._Ba?._$a?._yo?.ins?.isInMission===true||W._Ba?._rJ?._O$?.ins?.isDead===true||W.KVPV?.core?.scene?.status?.()?.owner){S.reason='defer_ui_until_idle';return;}
// [VI dòng gốc 32] Kiểm tra W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true)return;
// [VI dòng gốc 33] Kiểm tra worker.config?.enabled?.gearCraft===true&&!state.halted?.gearCraft: đúng thì chạy nhánh sau if.
    if(worker.config?.enabled?.gearCraft===true&&!state.halted?.gearCraft){
// [VI dòng gốc 34] gọi W.KVPV_CRAFT_LOW?.sync() (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
      W.KVPV_CRAFT_LOW?.sync?.();
// [VI dòng gốc 35] Khai báo biến không gán lại bằng const: approved = đọc worker.config?.gearCraft?.approvedRecipeIds nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
      const approved=worker.config?.gearCraft?.approvedRecipeIds;
// [VI dòng gốc 36] Khai báo biến không gán lại bằng const: candidate = nếu Array.isArray(approved)&&approved.length thì lấy worker.preview?.()?.gearCraft, ngược lại lấy null
      const candidate=Array.isArray(approved)&&approved.length?worker.preview?.()?.gearCraft:null;
// [VI dòng gốc 37] Kiểm tra candidate?.recipe&&approved.includes(candidate.recipe): đúng thì chạy nhánh sau if.
      if(candidate?.recipe&&approved.includes(candidate.recipe)){
// [VI dòng gốc 38] Khai báo biến không gán lại bằng const: row = gọi W._ft?._Cji?.ins?.getCfgById(candidate.recipe) để tra cấu hình theo ID bằng API client (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); category = gọi Number(row?.[3]?.[0]) để chuyển sang số; ui = đọc W._ft?._Y4n?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); Type = đọc W._Ba?._k6?._Rji nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
        const row=W._ft?._Cji?.ins?.getCfgById?.(candidate.recipe),category=Number(row?.[3]?.[0]),ui=W._ft?._Y4n?.ins,Type=W._Ba?._k6?._Rji;
// [VI dòng gốc 39] Kiểm tra [807,808].includes(category)&&typeof Type==='function': đúng thì chạy nhánh sau if.
        if([807,808].includes(category)&&typeof Type==='function'){
// [VI dòng gốc 40] Khai báo biến không gán lại bằng const: key = tính biểu thức 'craft/'+candidate.recipe+'/'+JSON.stringify((candidate.materialIds??[]).map(id=>W._Ba?._Ic?._aQ?.ins?.getItemCountById?.(id)))
          const key='craft/'+candidate.recipe+'/'+JSON.stringify((candidate.materialIds??[]).map(id=>W._Ba?._Ic?._aQ?.ins?.getItemCountById?.(id)));
// [VI dòng gốc 41] Kiểm tra ui?.isOpened?.(413)!==true: đúng thì chạy nhánh sau if. | Khai báo biến không gán lại bằng const: cfg = gọi ui?.getWindowConfigById(413) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
          if(ui?.isOpened?.(413)!==true){const cfg=ui?.getWindowConfigById?.(413);
// [VI dòng gốc 42] Kiểm tra cfg?.[2]!==Type||Number(cfg?.[5])!==249: đúng thì chạy nhánh sau if. | gán S.reason bằng 'unverified_craft_route' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
            if(cfg?.[2]!==Type||Number(cfg?.[5])!==249){S.reason='unverified_craft_route';return;}
// [VI dòng gốc 43] Kiểm tra S.opened!==key: đúng thì chạy nhánh sau if. | gán S.opened bằng key | gọi ui.openByActionId(249) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gán S.reason bằng 'opening_craft_branch'
            if(S.opened!==key){S.opened=key;ui.openByActionId?.(249);}S.reason='opening_craft_branch';return;
// [VI dòng gốc 44] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
          }
// [VI dòng gốc 45] Khai báo biến không gán lại bằng const: panel = gọi ui.getPanelById(413) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); m = đọc W._Ba?._k6?._rRt?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
          const panel=ui.getPanelById?.(413),m=W._Ba?._k6?._rRt?.ins;
// [VI dòng gốc 46] Kiểm tra !(panel instanceof Type)||!panel.parent||panel.visible===false: đúng thì chạy nhánh sau if. | gán S.reason bằng 'waiting_craft_panel' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
          if(!(panel instanceof Type)||!panel.parent||panel.visible===false){S.reason='waiting_craft_panel';return;}
// [VI dòng gốc 47] Kiểm tra Number(m?.tClsNow)!==category: đúng thì chạy nhánh sau if.
          if(Number(m?.tClsNow)!==category){
// [VI dòng gốc 48] Khai báo biến không gán lại bằng const: native = đọc Type.prototype.startShowUIByType
            const native=Type.prototype.startShowUIByType;
// [VI dòng gốc 49] Kiểm tra panel.startShowUIByType!==native||typeof native!=='function': đúng thì chạy nhánh sau if. | gán S.reason bằng 'unverified_craft_selector' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
            if(panel.startShowUIByType!==native||typeof native!=='function'){S.reason='unverified_craft_selector';return;}
// [VI dòng gốc 50] gọi native.call(panel, category===807?10:11) | gán S.reason bằng 'select_craft_subcategory' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
            native.call(panel,category===807?10:11);S.reason='select_craft_subcategory';return;
// [VI dòng gốc 51] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
          }
// [VI dòng gốc 52] Khai báo biến không gán lại bằng const: verified = gọi Number(state.stats?.gearCraft?.verified??0) để chuyển sang số | gọi worker.tick() để xử lý một nhịp kiểm tra (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
          const verified=Number(state.stats?.gearCraft?.verified??0);worker.tick?.();
// [VI dòng gốc 53] Kiểm tra worker.status?.()?.pending?.kind==='gearCraft': đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gán S.pending bằng {kind:'gearCraft',verified} | gán S.reason bằng 'craft_worker_sent' | gán S.reason bằng 'waiting_worker_turn'
          if(worker.status?.()?.pending?.kind==='gearCraft'){S.pending={kind:'gearCraft',verified};S.reason='craft_worker_sent';}else S.reason='waiting_worker_turn';return;
// [VI dòng gốc 54] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
        }
// [VI dòng gốc 55] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
      }
// [VI dòng gốc 56] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 57] Khai báo biến không gán lại bằng const: stone = đọc W.KVPV_SOUL_STONE_FAST; stoneState = gọi stone?.status() để trả trạng thái để kiểm tra (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const stone=W.KVPV_SOUL_STONE_FAST,stoneState=stone?.status?.();
// [VI dòng gốc 58] Kiểm tra W._Ba?._Xo?._Ko?.instance?.getRpKeyState?.(16)===true&&stoneState?.enabled===true&& !stoneState.pending&&!stoneState.error&&stoneState.reason!=='no_upgrade_materials': đúng thì chạy nhánh sau if.
    if(W._Ba?._Xo?._Ko?.instance?.getRpKeyState?.(16)===true&&stoneState?.enabled===true&&
// [VI dòng gốc 59] Tiếp tục hàm tick; thành phần cú pháp bắt đầu bằng !/~. Đọc cùng dòng mở phía trên: !stoneState.pending&&!stoneState.error&&stoneState.reason!=='no_upgrade_materials'){
      !stoneState.pending&&!stoneState.error&&stoneState.reason!=='no_upgrade_materials'){
// [VI dòng gốc 60] Khai báo biến không gán lại bằng const: m = đọc W._Ba?._ZE?._Qgt?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); slots = gọi m?.getValueByPos() (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); ui = đọc W._ft?._Y4n?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
      const m=W._Ba?._ZE?._Qgt?.ins,slots=m?.getValueByPos?.(),ui=W._ft?._Y4n?.ins;
// [VI dòng gốc 61] Kiểm tra slots&&Array.isArray(slots.keys): đúng thì chạy nhánh sau if.
      if(slots&&Array.isArray(slots.keys)){
// [VI dòng gốc 62] Khai báo biến không gán lại bằng const: key = tính biểu thức 'soulStone/'+JSON.stringify([slots.keys.slice(0,50).map(k=>[k,slots.get(k)]),m.otherValue?.[0]])
        const key='soulStone/'+JSON.stringify([slots.keys.slice(0,50).map(k=>[k,slots.get(k)]),m.otherValue?.[0]]);
// [VI dòng gốc 63] Kiểm tra S.opened!==key&&typeof ui?.openByActionId==='function': đúng thì chạy nhánh sau if. | gán S.opened bằng key | gọi ui.openByActionId(18) | gán S.reason bằng 'opening_soul_stone_branch'
        if(S.opened!==key&&typeof ui?.openByActionId==='function'){S.opened=key;ui.openByActionId(18);S.reason='opening_soul_stone_branch';return;}
// [VI dòng gốc 64] gọi stone.sync() (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gán S.reason bằng 'delegated_soul_stone_upgrade' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
        stone.sync?.();S.reason='delegated_soul_stone_upgrade';return;
// [VI dòng gốc 65] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
      }
// [VI dòng gốc 66] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 67] Khai báo biến không gán lại bằng const: strength = đọc W._Ba?._Agt?._Rgt?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); strengthSig = gọi strengthSignature()
    const strength=W._Ba?._Agt?._Rgt?.ins,strengthSig=strengthSignature();
// [VI dòng gốc 68] Kiểm tra worker.config?.enabled?.strength===true&&!state.halted?.strength&&strengthSig!==null&&strength?.isCanUpEquip===true&&W._Ba?._Xo?._Ko?.instance?.getRpKeyState?.(15)===true: đúng thì chạy nhánh sau if.
    if(worker.config?.enabled?.strength===true&&!state.halted?.strength&&strengthSig!==null&&strength?.isCanUpEquip===true&&W._Ba?._Xo?._Ko?.instance?.getRpKeyState?.(15)===true){
// [VI dòng gốc 69] Khai báo biến không gán lại bằng const: ui = đọc W._ft?._Y4n?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); Type = đọc W._Ba?._Agt?._xUn nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); p = gọi ui?.getPanelById(56) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); key = tính biểu thức 'strength/'+strengthSig
      const ui=W._ft?._Y4n?.ins,Type=W._Ba?._Agt?._xUn,p=ui?.getPanelById?.(56),key='strength/'+strengthSig;
// [VI dòng gốc 70] Kiểm tra typeof Type!=='function': đúng thì chạy nhánh sau if. | gán S.reason bằng 'waiting_native_strength_class' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      if(typeof Type!=='function'){S.reason='waiting_native_strength_class';return;}
// [VI dòng gốc 71] Kiểm tra ui?.isOpened?.(56)!==true: đúng thì chạy nhánh sau if.
      if(ui?.isOpened?.(56)!==true){
// [VI dòng gốc 72] Khai báo biến không gán lại bằng const: cfg = gọi ui?.getWindowConfigById(56) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
        const cfg=ui?.getWindowConfigById?.(56);
// [VI dòng gốc 73] Kiểm tra cfg?.[2]!==Type||Number(cfg?.[5])!==17: đúng thì chạy nhánh sau if. | gán S.reason bằng 'unverified_strength_route' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
        if(cfg?.[2]!==Type||Number(cfg?.[5])!==17){S.reason='unverified_strength_route';return;}
// [VI dòng gốc 74] Kiểm tra S.opened!==key: đúng thì chạy nhánh sau if. | gán S.opened bằng key | gọi ui.openByActionId(17) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gán S.reason bằng 'opening_strength_branch'
        if(S.opened!==key){S.opened=key;ui.openByActionId?.(17);}S.reason='opening_strength_branch';return;
// [VI dòng gốc 75] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
      }
// [VI dòng gốc 76] Kiểm tra !(p instanceof Type)||!p.parent||p.visible===false: đúng thì chạy nhánh sau if. | gán S.reason bằng 'waiting_strength_panel' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      if(!(p instanceof Type)||!p.parent||p.visible===false){S.reason='waiting_strength_panel';return;}
// [VI dòng gốc 77] gọi worker.tick() để xử lý một nhịp kiểm tra (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Kiểm tra worker.status?.()?.pending?.kind==='strength': đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gán S.pending bằng {kind:'strength',before:strengthSig} | gán S.reason bằng 'strength_worker_sent'
      worker.tick?.();if(worker.status?.()?.pending?.kind==='strength'){S.pending={kind:'strength',before:strengthSig};S.reason='strength_worker_sent';}else S.reason='waiting_worker_turn';return;
// [VI dòng gốc 78] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 79] Kiểm tra state.halted?.soulForge||worker.config?.enabled?.soulForge!==true: đúng thì chạy nhánh sau if. | gán S.reason bằng 'forge_disabled_or_halted' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(state.halted?.soulForge||worker.config?.enabled?.soulForge!==true){S.reason='forge_disabled_or_halted';return;}
// [VI dòng gốc 80] Kiểm tra W._Ba?._Xo?._Ko?.instance?.getRpKeyState?.(156)!==true: đúng thì chạy nhánh sau if. | gán S.reason bằng 'branch_no_red_dot' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(W._Ba?._Xo?._Ko?.instance?.getRpKeyState?.(156)!==true){S.reason='branch_no_red_dot';return;}
// [VI dòng gốc 81] Khai báo biến không gán lại bằng const: m = gọi model(); parts = đọc W._Ba?._rJ?._O$?.ins?.equipsDic?.keys nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); bag = đọc W._Ba?._Ic?._aQ?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const m=model(),parts=W._Ba?._rJ?._O$?.ins?.equipsDic?.keys,bag=W._Ba?._Ic?._aQ?.ins;
// [VI dòng gốc 82] Kiểm tra !Array.isArray(parts)||!Array.isArray(m?._csptMtlItem)||!parts.some(p=>Number(p)>=1&&Number(p)<=10&&m.getCanUpZH?.(Number(p))===true): đúng thì chạy nhánh sau if. | gán S.reason bằng 'no_upgradeable_part' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(!Array.isArray(parts)||!Array.isArray(m?._csptMtlItem)||!parts.some(p=>Number(p)>=1&&Number(p)<=10&&m.getCanUpZH?.(Number(p))===true)){S.reason='no_upgradeable_part';return;}
// [VI dòng gốc 83] Khai báo biến không gán lại bằng const: index = gọi m._csptMtlItem.findIndex(r=>Number.isSafeInteger(Number(r?.[0]))&&Number(r[0])>0&&Number(bag?.getItemCountById?.(r[0]))>0)
    const index=m._csptMtlItem.findIndex(r=>Number.isSafeInteger(Number(r?.[0]))&&Number(r[0])>0&&Number(bag?.getItemCountById?.(r[0]))>0);
// [VI dòng gốc 84] Kiểm tra index<0: đúng thì chạy nhánh sau if. | gán S.reason bằng 'no_owned_material' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(index<0){S.reason='no_owned_material';return;}
// [VI dòng gốc 85] Khai báo biến không gán lại bằng const: ui = đọc W._ft?._Y4n?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); p = gọi findPanel(ui); key = tính biểu thức sig+'/'+m._csptMtlItem[index][0]
    const ui=W._ft?._Y4n?.ins,p=findPanel(ui),key=sig+'/'+m._csptMtlItem[index][0];
// [VI dòng gốc 86] Kiểm tra !p: đúng thì chạy nhánh sau if. | Kiểm tra S.opened!==key&&typeof ui?.openByActionId==='function': đúng thì chạy nhánh sau if. | gán S.opened bằng key | gọi ui.openByActionId(192)
    if(!p){if(S.opened!==key&&typeof ui?.openByActionId==='function'){S.opened=key;ui.openByActionId(192);}S.reason='opening_verified_branch';return;}
// [VI dòng gốc 87] Kiểm tra !p._mTi: đúng thì chạy nhánh sau if. | gán S.reason bằng 'waiting_native_material_tabs' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(!p._mTi){S.reason='waiting_native_material_tabs';return;}
// [VI dòng gốc 88] Kiểm tra p._mTi.selIdx!==index: đúng thì chạy nhánh sau if. | gán p._mTi.selIdx bằng index | gán S.reason bằng 'select_owned_material' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(p._mTi.selIdx!==index){p._mTi.selIdx=index;S.reason='select_owned_material';return;}
// [VI dòng gốc 89] Kiểm tra Number(m._mtItemID?.[0])!==Number(m._csptMtlItem[index][0]): đúng thì chạy nhánh sau if. | gán S.reason bằng 'waiting_native_selection' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(Number(m._mtItemID?.[0])!==Number(m._csptMtlItem[index][0])){S.reason='waiting_native_selection';return;}
// [VI dòng gốc 90] gọi worker.tick() để xử lý một nhịp kiểm tra (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Khai báo biến không gán lại bằng const: after = gọi worker.status() để trả trạng thái để kiểm tra (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    worker.tick?.();const after=worker.status?.();
// [VI dòng gốc 91] Kiểm tra after?.pending?.kind==='soulForge': đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gán S.pending bằng sig | gán S.reason bằng 'existing_worker_sent' | gán S.reason bằng 'waiting_worker_turn'
    if(after?.pending?.kind==='soulForge'){S.pending=sig;S.reason='existing_worker_sent';}else S.reason='waiting_worker_turn';
// [VI dòng gốc 92] Nhận lỗi bằng e và chạy phần xử lý lỗi. | gán S.error bằng String(e) | gán S.reason bằng 'error'
  }catch(e){S.error=String(e);S.reason='error';}}
// [VI dòng gốc 93] Định nghĩa hàm stop; tham số: không có. Mục đích: dừng bộ điều khiển và dọn tài nguyên | gán S.enabled bằng false | Kiểm tra S.timer!==null: đúng thì chạy nhánh sau if. | gọi W.KVPV_V1?.timers?.clearInterval??W.clearInterval(S.timer)
  function stop(){S.enabled=false;if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;}
// [VI dòng gốc 94] gán W.KVPV_RED_NAVIGATOR bằng Object.freeze({sync:tick,stop,status:()=>({enabled:S.enabled,route:'action249/gearCraft;red15/action17/strength;red16/action18/soulStone;red156/action192/soulForge',reason:S.reason…
  W.KVPV_RED_NAVIGATOR=Object.freeze({sync:tick,stop,status:()=>({enabled:S.enabled,route:'action249/gearCraft;red15/action17/strength;red16/action18/soulStone;red156/action192/soulForge',reason:S.reason,pending:!!S.pending,confirmed:S.confirmed,error:S.error}),
// [VI dòng gốc 95] Thuộc tính _handoff: tạo hàm với tham số (không có); mỗi lần gọi trả về tạo đối tượng gồm actor, opened, pending, confirmed | Thuộc tính actor: dùng biến cùng tên | Thuộc tính opened: đọc S.opened | Thuộc tính pending: đọc S.pending
    _handoff:()=>({actor,opened:S.opened,pending:S.pending,confirmed:S.confirmed})});
// [VI dòng gốc 96] gán S.timer bằng (W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,500) | gọi tick() để xử lý một nhịp kiểm tra
  S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,500);tick();
// [VI dòng gốc 97] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: })();
})();
// [VI dòng gốc 98] Dòng trống để tách các phần, không có lệnh thực thi.
