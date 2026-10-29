// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: Dedicated soul-stone upgrade scanner. Native oneKeyHandler([part,2]); no purchase. [đóng chú thích]
/* Dedicated soul-stone upgrade scanner. Native oneKeyHandler([part,2]); no purchase. */
// [VI dòng gốc 2] chạy ngay hàm bao để tạo phạm vi và khởi tạo phần chức năng bên trong
(() => {
// [VI dòng gốc 3] "use strict"
  'use strict';
// [VI dòng gốc 4] Khai báo biến không gán lại bằng const: W = window; old = đọc W.KVPV_SOUL_STONE_FAST; carry = gọi old?._handoff(); chức năng nội bộ chưa xác minh từ tên hàm (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gọi old?.stop('reload') để dừng bộ điều khiển và dọn tài nguyên (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  const W=window,old=W.KVPV_SOUL_STONE_FAST,carry=old?._handoff?.();old?.stop?.('reload');
// [VI dòng gốc 5] Khai báo biến không gán lại bằng const: actor = gọi String(W.__KVPV_OWN_ACTOR_ID||'') để chuyển sang chuỗi; same = tính biểu thức carry?.actor===actor
  const actor=String(W.__KVPV_OWN_ACTOR_ID||''),same=carry?.actor===actor;
// [VI dòng gốc 6] Khai báo biến không gán lại bằng const: S = tạo đối tượng gồm enabled, timer, pending, saved, workerDrained, workerSaved, drained, requests, confirmed, reason, error
  const S={enabled:true,timer:null,pending:same?carry.pending:null,saved:same?carry.saved:undefined,
// [VI dòng gốc 7] Thuộc tính workerDrained: false | Thuộc tính workerSaved: nếu same thì lấy carry.workerSaved, ngược lại lấy undefined | Thuộc tính drained: nếu same thì lấy carry.drained, ngược lại lấy false | Thuộc tính requests: nếu same thì lấy carry.requests, ngược lại lấy 0
    workerDrained:false,workerSaved:same?carry.workerSaved:undefined,drained:same?carry.drained:false,requests:same?carry.requests:0,confirmed:same?carry.confirmed:0,reason:'waiting_core',error:''};
// [VI dòng gốc 8] Khai báo biến không gán lại bằng const: owned = tạo hàm với tham số (không có); mỗi lần gọi trả về actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'') và chỉ đánh giá vế phải khi vế trái truthy: !W.__KVPV_UNIVERSAL_HALTED
  const owned=()=>actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;
// [VI dòng gốc 9] Khai báo biến không gán lại bằng const: slots = tạo hàm với tham số (không có); mỗi lần gọi trả về gọi W._Ba?._ZE?._Qgt?.ins?.getValueByPos() (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  const slots=()=>W._Ba?._ZE?._Qgt?.ins?.getValueByPos?.();
// [VI dòng gốc 10] Định nghĩa hàm signature; tham số: part | Khai báo biến không gán lại bằng const: s = gọi slots() | Kết thúc hàm hiện tại và trả về: nếu s thì lấy JSON.stringify(Array.from({length:5},(_,i)=>s.get(part*10+i)??null)), ngược lại lấy null.
  function signature(part){const s=slots();return s?JSON.stringify(Array.from({length:5},(_,i)=>s.get(part*10+i)??null)):null;}
// [VI dòng gốc 11] Định nghĩa hàm tick; tham số: không có. Mục đích: xử lý một nhịp kiểm tra | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài.
  function tick(){try{
// [VI dòng gốc 12] Kiểm tra !S.enabled: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể. | Kiểm tra !owned(): đúng thì chạy nhánh sau if. | gọi stop() để dừng bộ điều khiển và dọn tài nguyên
    if(!S.enabled)return;// Explicitly permitted Đá Hồn only; other equipment and Thần Binh upgrades remain blocked.
    if(!owned()){stop();return;}
// [VI dòng gốc 13] Khai báo biến không gán lại bằng const: cfg = đọc W.KVPV_UPGRADES?.config nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Kiểm tra !cfg: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    const cfg=W.KVPV_UPGRADES?.config;if(!cfg)return;
// [VI dòng gốc 14] Kiểm tra S.saved===undefined: đúng thì chạy nhánh sau if. | gán S.saved bằng cfg.daHon===true | gán cfg.daHon bằng false
    if(S.saved===undefined)S.saved=cfg.daHon===true;cfg.daHon=false;
// [VI dòng gốc 15] Khai báo biến không gán lại bằng const: worker = đọc W.KVPV_BG_RESOURCES; wcfg = đọc worker?.config?.enabled nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const worker=W.KVPV_BG_RESOURCES,wcfg=worker?.config?.enabled;
// [VI dòng gốc 16] Kiểm tra wcfg: đúng thì chạy nhánh sau if. | Kiểm tra S.workerSaved===undefined: đúng thì chạy nhánh sau if. | gán S.workerSaved bằng wcfg.soulStone===true | gán wcfg.soulStone bằng false
    if(wcfg){if(S.workerSaved===undefined)S.workerSaved=wcfg.soulStone===true;wcfg.soulStone=false;}
// [VI dòng gốc 17] Kiểm tra S.pending: đúng thì chạy nhánh sau if. | Khai báo biến không gán lại bằng const: value = đọc W._Ba?._ZE?._Qgt?.ins?.otherValue?.[0] nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); sig = nếu S.pending.master thì lấy Number.isFinite(Number(value))&&value!=null?String(value):null, ngược lại lấy signature(S.pending.part)
    if(S.pending){const value=W._Ba?._ZE?._Qgt?.ins?.otherValue?.[0],sig=S.pending.master?(Number.isFinite(Number(value))&&value!=null?String(value):null):signature(S.pending.part);
// [VI dòng gốc 18] Kiểm tra sig!==null&&sig!==S.pending.before: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gán S.pending bằng null | tăng S.confirmed một đơn vị sau khi lấy giá trị | gán S.reason bằng 'server_slots_changed'
      if(sig!==null&&sig!==S.pending.before){S.pending=null;S.confirmed++;S.reason='server_slots_changed';}
// [VI dòng gốc 19] gán S.reason bằng 'waiting_ack_no_retry' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      else{S.reason='waiting_ack_no_retry';return;}
// [VI dòng gốc 20] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 21] Kiểm tra !S.drained: đúng thì chạy nhánh sau if. | Kiểm tra W.KVPV_PARALLEL_ACTIONS?.legacyBusy?.()!==false: đúng thì chạy nhánh sau if. | gán S.reason bằng 'waiting_old_request' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(!S.drained){if(W.KVPV_PARALLEL_ACTIONS?.legacyBusy?.()!==false){S.reason='waiting_old_request';return;}S.drained=true;}
// [VI dòng gốc 22] Kiểm tra !S.workerDrained: đúng thì chạy nhánh sau if. | Kiểm tra worker?.status?.()?.pending?.kind==='soulStone': đúng thì chạy nhánh sau if. | gán S.reason bằng 'waiting_previous_stone_worker' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(!S.workerDrained){if(worker?.status?.()?.pending?.kind==='soulStone'){S.reason='waiting_previous_stone_worker';return;}S.workerDrained=true;}
// [VI dòng gốc 23] Kiểm tra Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)||W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)||W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true)return;
// [VI dòng gốc 24] Kiểm tra W._Ba?._rJ?._O$?.ins?.isDead===true: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(W._Ba?._rJ?._O$?.ins?.isDead===true)return;
// [VI dòng gốc 25] Khai báo biến không gán lại bằng const: q = gọi W.KVPV_DAILY?.quickState() (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); p = đọc W.KVPV_PARALLEL_ACTIONS
    const q=W.KVPV_DAILY?.quickState?.(),p=W.KVPV_PARALLEL_ACTIONS;
// [VI dòng gốc 26] Kiểm tra !p?.canDirectDuringPve?.(q)&&!(q?.running===true&&['rảnh','ranh'].includes(q.job)&&W._Ba?._$a?.SceneUtil?.isCommonScene===true&&W._Ba?._$a?._yo?.ins?.isInMission!==true): đúng thì chạy nhánh sau if. | gán S.reason bằng 'waiting_context' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(!p?.canDirectDuringPve?.(q)&&!(q?.running===true&&['rảnh','ranh'].includes(q.job)&&W._Ba?._$a?.SceneUtil?.isCommonScene===true&&W._Ba?._$a?._yo?.ins?.isInMission!==true)){S.reason='waiting_context';return;}
// [VI dòng gốc 27] Kiểm tra W._Ba?._Xo?._Ko?.instance?.getRpKeyState?.(16)!==true: đúng thì chạy nhánh sau if. | gán S.reason bằng 'no_red_dot' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(W._Ba?._Xo?._Ko?.instance?.getRpKeyState?.(16)!==true){S.reason='no_red_dot';return;}
// [VI dòng gốc 28] Khai báo biến không gán lại bằng const: s = gọi slots(); g = đọc W._ft?._Qyn?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); bag = đọc W._Ba?._Ic?._aQ?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); rpc = đọc W._Ba?._ZE?._Jgt?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const s=slots(),g=W._ft?._Qyn?.ins,bag=W._Ba?._Ic?._aQ?.ins,rpc=W._Ba?._ZE?._Jgt?.ins;
// [VI dòng gốc 29] Khai báo biến không gán lại bằng const: parts = đọc W._Ba?._rJ?._O$?.ins?.equipsDic?.keys nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const parts=W._Ba?._rJ?._O$?.ins?.equipsDic?.keys;
// [VI dòng gốc 30] Kiểm tra !s||!Array.isArray(parts)||typeof rpc?.oneKeyHandler!=='function': đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(!s||!Array.isArray(parts)||typeof rpc?.oneKeyHandler!=='function')return;
// [VI dòng gốc 31] Khai báo biến không gán lại bằng const: gems = gọi (bag?.getItemsByBagType?.(2)??[]).slice(0,500).map(r=>{ const id=Number(r?.[0]),c=g?.getCfgById?.(id);return c&&Number(bag?.getItemCountById?.(id))>0? {id,type:Number(c[3]),level:N…(c=>c&&Number.isSafeInteger(c.id)&&c.id>0&&Number.isFinite(c.type)&&c.type>0&&Number.isFinite(c.level)&&c.level>0) để giữ phần tử thỏa điều kiện
    const gems=(bag?.getItemsByBagType?.(2)??[]).slice(0,500).map(r=>{
// [VI dòng gốc 32] Khai báo biến không gán lại bằng const: id = gọi Number(r?.[0]) để chuyển sang số; c = gọi g?.getCfgById(id) để tra cấu hình theo ID bằng API client (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Kết thúc hàm hiện tại và trả về: nếu c&&Number(bag?.getItemCountById?.(id))>0 thì lấy {id,type:Number(c[3]),level:Number(c[5])}, ngược lại lấy null.
      const id=Number(r?.[0]),c=g?.getCfgById?.(id);return c&&Number(bag?.getItemCountById?.(id))>0?
// [VI dòng gốc 33] Thuộc tính id: dùng biến cùng tên | Thuộc tính type: gọi Number(c[3]) để chuyển sang số | Thuộc tính level: gọi Number(c[5]) để chuyển sang số
        {id,type:Number(c[3]),level:Number(c[5])}:null;
// [VI dòng gốc 34] Định nghĩa hàm hàm không đặt tên; tham số: c
    }).filter(c=>c&&Number.isSafeInteger(c.id)&&c.id>0&&Number.isFinite(c.type)&&c.type>0&&Number.isFinite(c.level)&&c.level>0);
// [VI dòng gốc 35] Duyệt từng giá trị trong parts.slice(0,10).map(Number) bằng const part. | Khai báo biến không gán lại bằng const: part (chưa gán giá trị)
    for(const part of parts.slice(0,10).map(Number)){
// [VI dòng gốc 36] Kiểm tra !Number.isInteger(part)||part<1||part>10: đúng thì chạy nhánh sau if. | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
      if(!Number.isInteger(part)||part<1||part>10)continue;
// [VI dòng gốc 37] Chú thích gốc của tác giả; không được thực thi. Nội dung: Match the native quick-button choice: insert, replace higher same type, upgrade.
      // Match the native quick-button choice: insert, replace higher same type, upgrade.
// [VI dòng gốc 38] Lặp for: khởi tạo let i=0; tiếp tục khi i<5; sau mỗi vòng i++. | Khai báo biến có thể gán lại bằng let: i = 0
      for(let i=0;i<5;i++){
// [VI dòng gốc 39] Khai báo biến không gán lại bằng const: id = gọi s.get(part*10+i); row = nếu id==null thì lấy null, ngược lại lấy g?.getCfgById?.(id)
        const id=s.get(part*10+i),row=id==null?null:g?.getCfgById?.(id);
// [VI dòng gốc 40] Khai báo biến không gán lại bằng const: insert = id==null&&(i!==0||W._Ba?._ZE?._Qgt?.ins?.vipIsOpen===true) và chỉ đánh giá vế phải khi vế trái truthy: gems.some(c=>i===0||c.type===i)
        const insert=id==null&&(i!==0||W._Ba?._ZE?._Qgt?.ins?.vipIsOpen===true)&&gems.some(c=>i===0||c.type===i);
// [VI dòng gốc 41] Khai báo biến không gán lại bằng const: replace = row và chỉ đánh giá vế phải khi vế trái truthy: gems.some(c=>c.type===Number(row[3])&&c.level>Number(row[5]))
        const replace=row&&gems.some(c=>c.type===Number(row[3])&&c.level>Number(row[5]));
// [VI dòng gốc 42] Kiểm tra !insert&&!replace: đúng thì chạy nhánh sau if. | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
        if(!insert&&!replace)continue;
// [VI dòng gốc 43] Khai báo biến không gán lại bằng const: action = nếu insert thì lấy 0, ngược lại lấy 1 | gán S.pending bằng {part,action,before:signature(part),at:Date.now()} | tăng S.requests một đơn vị sau khi lấy giá trị
        const action=insert?0:1;S.pending={part,action,before:signature(part),at:Date.now()};S.requests++;
// [VI dòng gốc 44] gán S.reason bằng insert?'native_insert_sent':'native_replace_sent' | gọi rpc.oneKeyHandler([part,action]) | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
        S.reason=insert?'native_insert_sent':'native_replace_sent';rpc.oneKeyHandler([part,action]);return;
// [VI dòng gốc 45] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
      }
// [VI dòng gốc 46] Lặp for: khởi tạo let i=0; tiếp tục khi i<5; sau mỗi vòng i++. | Khai báo biến có thể gán lại bằng let: i = 0
      for(let i=0;i<5;i++){
// [VI dòng gốc 47] Khai báo biến không gán lại bằng const: id = gọi s.get(part*10+i); row = nếu id==null thì lấy null, ngược lại lấy g?.getCfgById?.(id); need = gọi Number(row?.[6]) để chuyển sang số; have = gọi Number(bag?.getItemCountById?.(id)) để chuyển sang số
        const id=s.get(part*10+i),row=id==null?null:g?.getCfgById?.(id),need=Number(row?.[6]),have=Number(bag?.getItemCountById?.(id));
// [VI dòng gốc 48] Kiểm tra !row||!Number.isFinite(Number(row[5]))||!(Number(row[5])<Number(g.stoneMaxLv))||!Number.isSafeInteger(need)||need<=1||!Number.isFinite(have)||have+1<need: đúng thì chạy nhánh sau if. | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
        if(!row||!Number.isFinite(Number(row[5]))||!(Number(row[5])<Number(g.stoneMaxLv))||!Number.isSafeInteger(need)||need<=1||!Number.isFinite(have)||have+1<need)continue;
// [VI dòng gốc 49] gán S.pending bằng {part,before:signature(part),at:Date.now()} | tăng S.requests một đơn vị sau khi lấy giá trị | gán S.reason bằng 'native_upgrade_sent' | gọi rpc.oneKeyHandler([part,2])
        S.pending={part,before:signature(part),at:Date.now()};S.requests++;S.reason='native_upgrade_sent';rpc.oneKeyHandler([part,2]);return;
// [VI dòng gốc 50] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
      }
// [VI dòng gốc 51] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 52] Khai báo biến không gán lại bằng const: value = đọc W._Ba?._ZE?._Qgt?.ins?.otherValue nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); lv = gọi Number(value?.[0]) để chuyển sang số; max = gọi Number(g?.maxLv) để chuyển sang số; row = gọi g?.getUpStoneByLev(lv) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); net = W._v hoặc dùng vế phải khi vế trái là null/undefined: typeof _v!=='undefined'?_v:null
    const value=W._Ba?._ZE?._Qgt?.ins?.otherValue,lv=Number(value?.[0]),max=Number(g?.maxLv),row=g?.getUpStoneByLev?.(lv),net=W._v??(typeof _v!=='undefined'?_v:null);
// [VI dòng gốc 53] Kiểm tra Number.isSafeInteger(lv)&&lv>=0&&lv<max&&value?.[1]&&Number(row?.[1])>0&&Number.isFinite(Number(row[1]))&&Number(value[3])>=Number(row[1])&&typeof net?.ins?.send==='function': đúng thì chạy nhánh sau if.
    if(Number.isSafeInteger(lv)&&lv>=0&&lv<max&&value?.[1]&&Number(row?.[1])>0&&Number.isFinite(Number(row[1]))&&Number(value[3])>=Number(row[1])&&typeof net?.ins?.send==='function'){
// [VI dòng gốc 54] gán S.pending bằng {master:true,before:String(lv),at:Date.now()} | tăng S.requests một đơn vị sau khi lấy giá trị | gán S.reason bằng 'native_master_sent' | gọi net.ins.send('TBhu', null)
      S.pending={master:true,before:String(lv),at:Date.now()};S.requests++;S.reason='native_master_sent';net.ins.send('TBhu',null);return;
// [VI dòng gốc 55] gán S.reason bằng 'no_upgrade_materials'
    }S.reason='no_upgrade_materials';
// [VI dòng gốc 56] Nhận lỗi bằng e và chạy phần xử lý lỗi. | gán S.error bằng String(e) | gán S.reason bằng 'error_no_retry'
  }catch(e){S.error=String(e);S.reason='error_no_retry';}}
// [VI dòng gốc 57] Định nghĩa hàm stop; tham số: reason='manual'. Mục đích: dừng bộ điều khiển và dọn tài nguyên | gán S.enabled bằng false | Kiểm tra S.timer!==null: đúng thì chạy nhánh sau if. | gọi W.KVPV_V1?.timers?.clearInterval??W.clearInterval(S.timer)
  function stop(reason='manual'){S.enabled=false;if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;
// [VI dòng gốc 58] Kiểm tra reason!=='reload'&&!S.pending&&owned()&&S.saved!==undefined&&W.KVPV_UPGRADES?.config: đúng thì chạy nhánh sau if. | gán W.KVPV_UPGRADES.config.daHon bằng S.saved
    if(reason!=='reload'&&!S.pending&&owned()&&S.saved!==undefined&&W.KVPV_UPGRADES?.config)W.KVPV_UPGRADES.config.daHon=S.saved;
// [VI dòng gốc 59] Kiểm tra reason!=='reload'&&!S.pending&&owned()&&S.workerSaved!==undefined&&W.KVPV_BG_RESOURCES?.config?.enabled: đúng thì chạy nhánh sau if. | gán W.KVPV_BG_RESOURCES.config.enabled.soulStone bằng S.workerSaved
    if(reason!=='reload'&&!S.pending&&owned()&&S.workerSaved!==undefined&&W.KVPV_BG_RESOURCES?.config?.enabled)W.KVPV_BG_RESOURCES.config.enabled.soulStone=S.workerSaved;
// [VI dòng gốc 60] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 61] gán W.KVPV_SOUL_STONE_FAST bằng Object.freeze({sync:tick,stop,status:()=>({enabled:S.enabled,pollMs:1,reason:S.reason,requests:S.requests,confirmed:S.confirmed,pending:S.pending,error:S.error,allowKNB:false}), _h…
  W.KVPV_SOUL_STONE_FAST=Object.freeze({sync:tick,stop,status:()=>({enabled:S.enabled,pollMs:1,reason:S.reason,requests:S.requests,confirmed:S.confirmed,pending:S.pending,error:S.error,allowKNB:false}),
// [VI dòng gốc 62] Thuộc tính _handoff: tạo hàm với tham số (không có); mỗi lần gọi trả về tạo đối tượng gồm actor, pending, saved, workerSaved, drained, requests, confirmed | Thuộc tính actor: dùng biến cùng tên | Thuộc tính pending: đọc S.pending | Thuộc tính saved: đọc S.saved
    _handoff:()=>({actor,pending:S.pending,saved:S.saved,workerSaved:S.workerSaved,drained:S.drained,requests:S.requests,confirmed:S.confirmed})});
// [VI dòng gốc 63] gán S.timer bằng (W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,1) | gọi tick() để xử lý một nhịp kiểm tra
  S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,50);tick();
// [VI dòng gốc 64] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: })();
})();
// [VI dòng gốc 65] Dòng trống để tách các phần, không có lệnh thực thi.
