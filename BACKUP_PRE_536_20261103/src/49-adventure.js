// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: Dai Hoang Adventure: native free handlers, event-specific ACK latches, no purchase/instant finish. [đóng chú thích]
/* Dai Hoang Adventure: native free handlers, event-specific ACK latches, no purchase/instant finish. */
// [VI dòng gốc 2] chạy ngay hàm bao để tạo phạm vi và khởi tạo phần chức năng bên trong
(() => {
// [VI dòng gốc 3] "use strict" | Khai báo biến không gán lại bằng const: W = window; old = đọc W.KVPV_ADVENTURE; c = gọi old?._handoff(); chức năng nội bộ chưa xác minh từ tên hàm (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gọi old?.stop() để dừng bộ điều khiển và dọn tài nguyên (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
 'use strict';const W=window,old=W.KVPV_ADVENTURE,c=old?._handoff?.();old?.stop?.();
// [VI dòng gốc 4] Khai báo biến không gán lại bằng const: actor = gọi String(W.__KVPV_OWN_ACTOR_ID||'') để chuyển sang chuỗi; same = tính biểu thức c?.actor===actor
 const actor=String(W.__KVPV_OWN_ACTOR_ID||''),same=c?.actor===actor;
// [VI dòng gốc 5] Khai báo biến không gán lại bằng const: S = tạo đối tượng gồm enabled, timer, pending, navigated, mini, requests, confirmed, lastRefresh, refreshed, reason, error
 const S={enabled:true,timer:null,pending:new Map(same?c.pending:[]),navigated:new Set(same?c.navigated:[]),mini:new Map(same?c.mini:[]),requests:same?c.requests:0,confirmed:same?c.confirmed:0,lastRefresh:same?(c.lastRefresh??-Infinity):-Infinity,refreshed:new Set(same?c.refreshed:[]),reason:'waiting_model',error:''};
// [VI dòng gốc 6] Chú thích gốc của tác giả; không được thực thi. Nội dung: Retire the quest-only sender before taking ownership; no duplicate chg/claim calls.
 // Retire the quest-only sender before taking ownership; no duplicate chg/claim calls.
// [VI dòng gốc 7] gọi W.KVPV_V871?.stop() để dừng bộ điều khiển và dọn tài nguyên (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
 W.KVPV_V871?.stop?.();
// [VI dòng gốc 8] Khai báo biến không gán lại bằng const: model = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._Ba?._Ab?._mat?.inst nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); rpc = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._Ba?._Ab?._VIt?.inst nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); ui = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._j?.ins nếu đối tượng tồn tại (bỏ …
 const model=()=>W._Ba?._Ab?._mat?.inst,rpc=()=>W._Ba?._Ab?._VIt?.inst,ui=()=>W._j?.ins;
// [VI dòng gốc 9] Khai báo biến không gán lại bằng const: owned = tạo hàm với tham số (không có); mỗi lần gọi trả về actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'') và chỉ đánh giá vế phải khi vế trái truthy: !W.__KVPV_UNIVERSAL_HALTED
 const owned=()=>actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;
// [VI dòng gốc 10] Khai báo biến không gán lại bằng const: rows = tạo hàm với tham số (không có); mỗi lần gọi trả về nếu Array.isArray(model()?.evtLst) thì lấy model().evtLst.slice(0,4).filter(r=>Array.isArray(r)&&Number.isSafeInteger(Number(r[0]))&&Number(r[0])>0), ngược lại lấy []
 const rows=()=>Array.isArray(model()?.evtLst)?model().evtLst.slice(0,4).filter(r=>Array.isArray(r)&&Number.isSafeInteger(Number(r[0]))&&Number(r[0])>0):[];
// [VI dòng gốc 11] Khai báo biến không gán lại bằng const: sig = tạo hàm với tham số r; mỗi lần gọi trả về gọi JSON.stringify(r) để chuyển giá trị thành chuỗi JSON
 const sig=r=>JSON.stringify(r);
// [VI dòng gốc 12] Khai báo biến không gán lại bằng const: panel = tạo hàm với tham số (không có); mỗi lần gọi trả về nếu ui()?.isOpened?.(247) thì lấy ui().getPanelById?.(247)||ui().getDialogById?.(247), ngược lại lấy null
 const panel=()=>ui()?.isOpened?.(247)?(ui().getPanelById?.(247)||ui().getDialogById?.(247)):null;
// [VI dòng gốc 13] Khai báo biến không gán lại bằng const: idle = tạo hàm với tham số (không có); mỗi lần gọi trả về W._Ba?._$a?.SceneUtil?.isCommonScene===true&&W._Ba?._$a?._yo?.ins?.isInMission!==true&&W._Ba?._$a?._yo?.ins?.isInArena!==true&&W._Ba?._cm?._q3t?.ins?.getHasTeams?.()!==true&&W._Ba?… và chỉ đánh giá vế phải khi vế trái truthy: W.KVPV_DAILY?.quickState?.()?.job==='rảnh'
 const idle=()=>W._Ba?._$a?.SceneUtil?.isCommonScene===true&&W._Ba?._$a?._yo?.ins?.isInMission!==true&&W._Ba?._$a?._yo?.ins?.isInArena!==true&&W._Ba?._cm?._q3t?.ins?.getHasTeams?.()!==true&&W._Ba?._cm?._vJ?.ins?.isHaveRoom!==true&&W._Ba?._of?._x_t?.ins?.haveTeam!==true&&!W.KVPV?.core?.scene?.status?.()?.owner&&W.KVPV_DAILY?.quickState?.()?.job==='rảnh';
// [VI dòng gốc 14] Định nghĩa hàm send; tham số: r, kind, fn | Khai báo biến không gán lại bằng const: key = gọi String(r[0]) để chuyển sang chuỗi | gọi S.pending.set(key, {kind,before:sig(r),at:Date.now()}) | tăng S.requests một đơn vị sau khi lấy giá trị
 function send(r,kind,fn){const key=String(r[0]);S.pending.set(key,{kind,before:sig(r),at:Date.now()});S.requests++;S.reason='waiting_'+kind+'_ack';fn();}
// [VI dòng gốc 15] Định nghĩa hàm tick; tham số: không có. Mục đích: xử lý một nhịp kiểm tra | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài.
 function tick(){try{
// [VI dòng gốc 16] Kiểm tra !S.enabled||!owned(): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  if(!S.enabled||!owned())return;
// [VI dòng gốc 17] Kiểm tra !model()||!Array.isArray(model().evtLst): đúng thì chạy nhánh sau if. | gán S.reason bằng 'waiting_model' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  if(!model()||!Array.isArray(model().evtLst)){S.reason='waiting_model';return;}
// [VI dòng gốc 18] Khai báo biến không gán lại bằng const: list = gọi rows()
  const list=rows();
// [VI dòng gốc 19] Duyệt từng giá trị trong S.pending bằng const [id,p]. | Khai báo biến không gán lại bằng const: [id,p] (chưa gán giá trị) | Khai báo biến không gán lại bằng const: r = gọi list.find(r=>String(r[0])===id) để tìm phần tử đầu tiên thỏa điều kiện
  for(const [id,p]of S.pending){const r=list.find(r=>String(r[0])===id);
// [VI dòng gốc 20] Kiểm tra !r||sig(r)!==p.before: đúng thì chạy nhánh sau if. | gọi S.pending.delete(id) | tăng S.confirmed một đơn vị sau khi lấy giá trị
   if(!r||sig(r)!==p.before){S.pending.delete(id);S.confirmed++;}
// [VI dòng gốc 21] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 22] Chú thích gốc của tác giả; không được thực thi. Nội dung: Query only; never clear/replay an unresolved action because a timeout elapsed.
  // Query only; never clear/replay an unresolved action because a timeout elapsed.
// [VI dòng gốc 23] Khai báo biến không gán lại bằng const: unresolved = gọi [...S.pending].filter(([,p])=>Date.now()-p.at>=10000).map(([id,p])=>id+'/'+p.kind+'/'+p.at).sort().join('|')
  const unresolved=[...S.pending].filter(([,p])=>Date.now()-p.at>=10000).map(([id,p])=>id+'/'+p.kind+'/'+p.at).sort().join('|');
// [VI dòng gốc 24] Kiểm tra unresolved&&!S.refreshed.has(unresolved)&&Date.now()-S.lastRefresh>=30000&&typeof rpc()?._IIt==='function': đúng thì chạy nhánh sau if.
  if(unresolved&&!S.refreshed.has(unresolved)&&Date.now()-S.lastRefresh>=30000&&typeof rpc()?._IIt==='function'){
// [VI dòng gốc 25] gán S.lastRefresh bằng Date.now() | gọi S.refreshed.add(unresolved) | gọi rpc()._IIt(); chức năng nội bộ chưa xác minh từ tên hàm
   S.lastRefresh=Date.now();S.refreshed.add(unresolved);rpc()._IIt();
// [VI dòng gốc 26] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 27] Kiểm tra Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0): đúng thì chạy nhánh sau if. | gán S.reason bằng 'user_using_ui' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  if(Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)){S.reason='user_using_ui';return;}
// [VI dòng gốc 28] Kiểm tra W.KVPV_BOSS_TEAM?.priority?.(): đúng thì chạy nhánh sau if. | gán S.reason bằng 'team_invitation_priority' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  if(W.KVPV_BOSS_TEAM?.priority?.()){S.reason='team_invitation_priority';return;}
// [VI dòng gốc 29] Kiểm tra !model()||!rpc(): đúng thì chạy nhánh sau if. | gán S.reason bằng 'waiting_model' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  if(!model()||!rpc()){S.reason='waiting_model';return;}
// [VI dòng gốc 30] Chú thích gốc của tác giả; không được thực thi. Nội dung: Claim does not spend event points; native challenge/explore use existing free yL only.
  // Claim does not spend event points; native challenge/explore use existing free yL only.
// [VI dòng gốc 31] Khai báo biến không gán lại bằng const: ready = gọi list.find(r=>!S.pending.has(String(r[0]))&&(Number(r[1])===1&&Number(r[4])===1||Number(r[1])===5&&Number(r[3])>0&&Number(r[3])<Num…) để tìm phần tử đầu tiên thỏa điều kiện
  const ready=list.find(r=>!S.pending.has(String(r[0]))&&(Number(r[1])===1&&Number(r[4])===1||Number(r[1])===5&&Number(r[3])>0&&Number(r[3])<Number(W._Sa?.svrTime)));
// [VI dòng gốc 32] Kiểm tra ready&&typeof rpc().getAdreAward==='function': đúng thì chạy nhánh sau if. | gọi send(ready, 'claim', ()=>rpc().getAdreAward(ready[0])) | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  if(ready&&typeof rpc().getAdreAward==='function'){send(ready,'claim',()=>rpc().getAdreAward(ready[0]));return;}
// [VI dòng gốc 33] Khai báo biến không gán lại bằng const: mini = gọi panel()
  const mini=panel();
// [VI dòng gốc 34] Kiểm tra mini: đúng thì chạy nhánh sau if.
  if(mini){
// [VI dòng gốc 35] Khai báo biến không gán lại bằng const: r = gọi list.find(r=>String(r[0])===String(mini._myi?.[0])) để tìm phần tử đầu tiên thỏa điều kiện
   const r=list.find(r=>String(r[0])===String(mini._myi?.[0]));
// [VI dòng gốc 36] Kiểm tra !r||Number(r[1])!==0: đúng thì chạy nhánh sau if. | gán S.reason bằng 'unknown_minigame_preserved' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
   if(!r||Number(r[1])!==0){S.reason='unknown_minigame_preserved';return;}
// [VI dòng gốc 37] Khai báo biến không gán lại bằng const: id = gọi String(r[0]) để chuyển sang chuỗi; out = đọc mini._yTt
   const id=String(r[0]),out=mini._yTt;
// [VI dòng gốc 38] Kiểm tra (out===0||out===1)&&!S.pending.has(id)&&typeof mini.close==='function': đúng thì chạy nhánh sau if. | gọi send(r, 'mini_close', ()=>mini.close()) | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
   if((out===0||out===1)&&!S.pending.has(id)&&typeof mini.close==='function'){send(r,'mini_close',()=>mini.close());return;}
// [VI dòng gốc 39] Khai báo biến không gán lại bằng const: pending = gọi S.pending.get(id)
   const pending=S.pending.get(id);
// [VI dòng gốc 40] Kiểm tra pending?.kind==='mini'&&pending.acked===true&&(out===0||out===1||out===2&&mini.sp_0?.mouseEnabled===true): đúng thì chạy nhánh sau if. | gọi S.pending.delete(id) | tăng S.confirmed một đơn vị sau khi lấy giá trị
   if(pending?.kind==='mini'&&pending.acked===true&&(out===0||out===1||out===2&&mini.sp_0?.mouseEnabled===true)){S.pending.delete(id);S.confirmed++;}
// [VI dòng gốc 41] Kiểm tra (out===0||out===1)&&!S.pending.has(id)&&typeof mini.close==='function': đúng thì chạy nhánh sau if. | gọi send(r, 'mini_close', ()=>mini.close()) | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
   if((out===0||out===1)&&!S.pending.has(id)&&typeof mini.close==='function'){send(r,'mini_close',()=>mini.close());return;}
// [VI dòng gốc 42] Kiểm tra Number(model().yL)>0&&!S.pending.has(id)&&mini.sp_0?.mouseEnabled===true&&typeof mini._GAn==='function'&&(S.mini.get(id)||0)<3: đúng thì chạy nhánh sau if.
   if(Number(model().yL)>0&&!S.pending.has(id)&&mini.sp_0?.mouseEnabled===true&&typeof mini._GAn==='function'&&(S.mini.get(id)||0)<3){
// [VI dòng gốc 43] gọi S.mini.set(id, (S.mini.get(id)||0)+1) | gọi send(r, 'mini', ()=>mini._GAn(mini.sp_0)) | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    S.mini.set(id,(S.mini.get(id)||0)+1);send(r,'mini',()=>mini._GAn(mini.sp_0));return;
// [VI dòng gốc 44] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
   }
// [VI dòng gốc 45] gán S.reason bằng 'waiting_minigame_result' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
   S.reason='waiting_minigame_result';return;
// [VI dòng gốc 46] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 47] Kiểm tra !(Number(model().yL)>0): đúng thì chạy nhánh sau if. | gán S.reason bằng 'no_free_event_points' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  if(!(Number(model().yL)>0)){S.reason='no_free_event_points';return;}
// [VI dòng gốc 48] Kiểm tra !idle(): đúng thì chạy nhánh sau if. | gán S.reason bằng S.pending.size?'waiting_idle_scene_with_unconfirmed_events':'waiting_idle_scene' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  if(!idle()){S.reason=S.pending.size?'waiting_idle_scene_with_unconfirmed_events':'waiting_idle_scene';return;}
// [VI dòng gốc 49] Khai báo biến không gán lại bằng const: accept = gọi list.find(r=>!S.pending.has(String(r[0]))&&Number(r[1])===1&&Number(r[4])!==1&&Number(r[7])===0) để tìm phần tử đầu tiên thỏa điều kiện
  const accept=list.find(r=>!S.pending.has(String(r[0]))&&Number(r[1])===1&&Number(r[4])!==1&&Number(r[7])===0);
// [VI dòng gốc 50] Kiểm tra accept&&typeof rpc().chg==='function': đúng thì chạy nhánh sau if. | gọi send(accept, 'accept', ()=>rpc().chg(accept)) | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  if(accept&&typeof rpc().chg==='function'){send(accept,'accept',()=>rpc().chg(accept));return;}
// [VI dòng gốc 51] Kiểm tra [...S.pending.values()].some(p=>p.kind==='explore'): đúng thì chạy nhánh sau if. | gán S.reason bằng 'waiting_exploration_ack' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  if([...S.pending.values()].some(p=>p.kind==='explore')){S.reason='waiting_exploration_ack';return;}
// [VI dòng gốc 52] Khai báo biến không gán lại bằng const: start = gọi list.find(r=>!S.pending.has(String(r[0]))&&([2,3,4].includes(Number(r[1]))||Number(r[1])===5&&Number(r[3])===0)) để tìm phần tử đầu tiên thỏa điều kiện
  const start=list.find(r=>!S.pending.has(String(r[0]))&&([2,3,4].includes(Number(r[1]))||Number(r[1])===5&&Number(r[3])===0));
// [VI dòng gốc 53] Kiểm tra !W.KVPV_ENTRY_POLICY?.manual&&start&&typeof rpc().chg==='function': đúng thì chạy nhánh sau if. | gọi send(start, 'explore', ()=>rpc().chg(start)) | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  if(!W.KVPV_ENTRY_POLICY?.manual&&start&&typeof rpc().chg==='function'){send(start,'explore',()=>rpc().chg(start));return;}
// [VI dòng gốc 54] Khai báo biến không gán lại bằng const: game = gọi list.find(r=>!S.pending.has(String(r[0]))&&Number(r[1])===0&&(S.mini.get(String(r[0]))||0)<3) để tìm phần tử đầu tiên thỏa điều kiện
  const game=list.find(r=>!S.pending.has(String(r[0]))&&Number(r[1])===0&&(S.mini.get(String(r[0]))||0)<3);
// [VI dòng gốc 55] Kiểm tra game&&typeof ui()?.open==='function': đúng thì chạy nhánh sau if. | Khai báo biến không gán lại bằng const: key = tính biểu thức 'mini/'+game[0] | Kiểm tra !S.navigated.has(key): đúng thì chạy nhánh sau if. | gọi S.navigated.add(key)
  if(game&&typeof ui()?.open==='function'){const key='mini/'+game[0];if(!S.navigated.has(key)){S.navigated.add(key);ui().open(247,game);S.reason='opened_minigame';return;}}
// [VI dòng gốc 56] Duyệt từng giá trị trong list bằng const r. | Khai báo biến không gán lại bằng const: r (chưa gán giá trị) | Kiểm tra Number(r[1])===1&&Number(r[4])!==1&&Number(r[7])>0: đúng thì chạy nhánh sau if.
  for(const r of list)if(Number(r[1])===1&&Number(r[4])!==1&&Number(r[7])>0){
// [VI dòng gốc 57] Khai báo biến không gán lại bằng const: cfg = gọi W._ft?._$Ah?.ins?.getCfgById(r[7]) để tra cấu hình theo ID bằng API client (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); fc = gọi Number(cfg?.[3]) để chuyển sang số; win = nếu fc>0 thì lấy W._Sa?.getWindowCfgByFcId?.(fc), ngược lại lấy null; id = gọi Number(win?.[0]) để chuyển sang số
   const cfg=W._ft?._$Ah?.ins?.getCfgById?.(r[7]),fc=Number(cfg?.[3]),win=fc>0?W._Sa?.getWindowCfgByFcId?.(fc):null,id=Number(win?.[0]);
// [VI dòng gốc 58] Khai báo biến không gán lại bằng const: key = tính biểu thức r[0]+'/'+r[7]
   const key=r[0]+'/'+r[7];
// [VI dòng gốc 59] Kiểm tra Number.isSafeInteger(id)&&id>0&&typeof ui()?.open==='function'&&!S.navigated.has(key): đúng thì chạy nhánh sau if.
   if(Number.isSafeInteger(id)&&id>0&&typeof ui()?.open==='function'&&!S.navigated.has(key)){
// [VI dòng gốc 60] gọi S.navigated.add(key)
    S.navigated.add(key);
// [VI dòng gốc 61] Kiểm tra W._Ba?._iB?.ChatTool?.isChatPanel?.(id): đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | Kiểm tra W._Ba?._iB?._C$?.instance: đúng thì chạy nhánh sau if. | gán W._Ba._iB._C$.instance.openPanelId bằng 246 | gọi ui().open(id, Number(r[7])===23?2:0)
    if(W._Ba?._iB?.ChatTool?.isChatPanel?.(id)){if(W._Ba?._iB?._C$?.instance)W._Ba._iB._C$.instance.openPanelId=246;ui().open(id,Number(r[7])===23?2:0);}else ui().open(id);
// [VI dòng gốc 62] gán S.reason bằng 'opened_objective_wait_server_progress' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    S.reason='opened_objective_wait_server_progress';return;
// [VI dòng gốc 63] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
   }
// [VI dòng gốc 64] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 65] gán S.reason bằng S.pending.size?'waiting_event_ack_no_retry':'waiting_objective_or_event'
  S.reason=S.pending.size?'waiting_event_ack_no_retry':'waiting_objective_or_event';
// [VI dòng gốc 66] Nhận lỗi bằng e và chạy phần xử lý lỗi. | gán S.error bằng String(e?.message||e) | gán S.reason bằng 'error_no_retry'
 }catch(e){S.error=String(e?.message||e);S.reason='error_no_retry';}}
// [VI dòng gốc 67] Định nghĩa hàm onEvent; tham số: data | Khai báo biến không gán lại bằng const: id = gọi String(data?.[0]?.[0]??'') để chuyển sang chuỗi; p = gọi S.pending.get(id) | Kiểm tra p?.kind==='mini': đúng thì chạy nhánh sau if. | gán p.acked bằng true
 function onEvent(data){const id=String(data?.[0]?.[0]??''),p=S.pending.get(id);if(p?.kind==='mini')p.acked=true;}
// [VI dòng gốc 68] Khai báo biến không gán lại bằng const: notify = đọc W._Sa?.notify nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Kiểm tra typeof notify?.on==='function'&&typeof notify?.off==='function': đúng thì chạy nhánh sau if. | gọi notify.on(5475, S, onEvent)
 const notify=W._Sa?.notify;if(typeof notify?.on==='function'&&typeof notify?.off==='function')notify.on(5475,S,onEvent);
// [VI dòng gốc 69] Định nghĩa hàm stop; tham số: không có. Mục đích: dừng bộ điều khiển và dọn tài nguyên | gọi notify?.off(5475, S, onEvent) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gán S.enabled bằng false | Kiểm tra S.timer!==null: đúng thì chạy nhánh sau if.
 function stop(){notify?.off?.(5475,S,onEvent);S.enabled=false;if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);}
// [VI dòng gốc 70] gán W.KVPV_ADVENTURE bằng Object.freeze({sync:tick,stop,status:()=>({enabled:S.enabled,reason:S.reason,lastError:S.error,requests:S.requests,confirmed:S.confirmed,freePoints:Number(model()?.yL)||0,pending:[…
 W.KVPV_ADVENTURE=Object.freeze({sync:tick,stop,status:()=>({enabled:S.enabled,reason:S.reason,lastError:S.error,requests:S.requests,confirmed:S.confirmed,freePoints:Number(model()?.yL)||0,pending:[...S.pending].map(([id,p])=>({id,kind:p.kind,at:p.at,ageMs:Date.now()-p.at,unconfirmed:Date.now()-p.at>=10000})),refreshQueries:S.refreshed.size,events:rows().map(r=>({id:r[0],type:r[1],progress:r[3],rewardReady:r[4],objective:r[7]})),allowKNB:false}),_handoff:()=>({actor,lastRefresh:S.lastRefresh,refreshed:[...S.refreshed],pending:[...S.pending],navigated:[...S.navigated],mini:[...S.mini],requests:S.requests,confirmed:S.confirmed})});
// [VI dòng gốc 71] gán S.timer bằng (W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,500) | gọi tick() để xử lý một nhịp kiểm tra
 S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,500);tick();
// [VI dòng gốc 72] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: })();
})();
// [VI dòng gốc 73] Dòng trống để tách các phần, không có lệnh thực thi.
