// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: Free native treasure turns only. One shared sender, exact reply + free-state ACK. [đóng chú thích]
/* Free native treasure turns only. One shared sender, exact reply + free-state ACK. */
// [VI dòng gốc 2] chạy ngay hàm bao để tạo phạm vi và khởi tạo phần chức năng bên trong
(() => {
// [VI dòng gốc 3] "use strict" | Khai báo biến không gán lại bằng const: W = window; old = đọc W.KVPV_FREE_TREASURE; c = gọi old?._handoff(); chức năng nội bộ chưa xác minh từ tên hàm (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gọi old?.stop() để dừng bộ điều khiển và dọn tài nguyên (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
 'use strict';const W=window,old=W.KVPV_FREE_TREASURE,c=old?._handoff?.();old?.stop?.();
// [VI dòng gốc 4] Khai báo biến không gán lại bằng const: actor = gọi String(W.__KVPV_OWN_ACTOR_ID||'') để chuyển sang chuỗi; same = tính biểu thức c?.actor===actor
 const actor=String(W.__KVPV_OWN_ACTOR_ID||''),same=c?.actor===actor;
// [VI dòng gốc 5] Khai báo biến không gán lại bằng const: S = tạo đối tượng gồm enabled, timer, pending, sent, confirmed, reason, error
 const S={enabled:true,timer:null,pending:same?c.pending:null,sent:new Set(same?c.sent:[]),confirmed:same?c.confirmed:0,reason:'waiting',error:''};
// [VI dòng gốc 6] Khai báo biến không gán lại bằng const: types = tạo mảng gồm 9 vị trí: [[0,93],[1,115],[2,116],[3,393],[4,113],[9,965],[10,1001],[11,1126],[15,1371]]
 const types=[[0,93],[1,115],[2,116],[3,393],[4,113],[9,965],[10,1001],[11,1126],[15,1371]];
// [VI dòng gốc 7] Khai báo biến không gán lại bằng const: model = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._Ba?._ze?._Ve?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); ui = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._ft?._Y4n?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
 const model=()=>W._Ba?._ze?._Ve?.ins,ui=()=>W._ft?._Y4n?.ins;
// [VI dòng gốc 8] Khai báo biến không gán lại bằng const: day = tạo hàm với tham số (không có); mỗi lần gọi trả về W.KVPV_DAILY_CLOCK?.key?.() hoặc dùng vế phải khi vế trái là null/undefined: new Date(Date.now()+7200000).toISOString().slice(0,10)
 const day=()=>W.KVPV_DAILY_CLOCK?.key?.()??new Date(Date.now()+7200000).toISOString().slice(0,10);
// [VI dòng gốc 9] Khai báo biến không gán lại bằng const: own = tạo hàm với tham số (không có); mỗi lần gọi trả về actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'') và chỉ đánh giá vế phải khi vế trái truthy: !W.__KVPV_UNIVERSAL_HALTED
 const own=()=>actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;
// [VI dòng gốc 10] Khai báo biến không gán lại bằng const: free = tạo hàm với tham số t; mỗi lần gọi trả về gọi [true,1].includes(model()?.isFirst?.(t)) để kiểm tra dữ liệu có chứa giá trị
 const free=t=>[true,1].includes(model()?.isFirst?.(t));
// [VI dòng gốc 11] Định nghĩa hàm safe; tham số: không có | Kết thúc hàm hiện tại và trả về: own()&&W._Ba?._rJ?._O$?.ins?.isDead===false&& W._Ba?._$a?.SceneUtil?.isCommonScene===true&&W._Ba?._$a?._yo?.ins?.isInMission===false&& !W.KVPV?.core?.scene?.status?.()?.owner&&Date… và chỉ đánh giá vế phải khi vế trái truthy: W.KVPV_CONFIRM_POPUPS?.beforeTask?.()!==true.
 function safe(){return own()&&W._Ba?._rJ?._O$?.ins?.isDead===false&&
// [VI dòng gốc 12] Tiếp tục hàm safe; thành phần cú pháp bắt đầu bằng name. Đọc cùng dòng mở phía trên: W._Ba?._$a?.SceneUtil?.isCommonScene===true&&W._Ba?._$a?._yo?.ins?.isInMission===false&&
  W._Ba?._$a?.SceneUtil?.isCommonScene===true&&W._Ba?._$a?._yo?.ins?.isInMission===false&&
// [VI dòng gốc 13] gọi W.KVPV?.core?.scene?.status() để trả trạng thái để kiểm tra | gọi Date.now() | gọi Number(W.__KVPV_USER_UI_UNTIL||0) để chuyển sang số
  !W.KVPV?.core?.scene?.status?.()?.owner&&Date.now()>=Number(W.__KVPV_USER_UI_UNTIL||0)&&
// [VI dòng gốc 14] gọi ['rảnh','ranh'].includes(W.KVPV_DAILY?.quickState?.()?.job??'') để kiểm tra dữ liệu có chứa giá trị | gọi W.KVPV_DAILY?.quickState() | gọi W.KVPV_CONFIRM_POPUPS?.beforeTask()
  ['rảnh','ranh'].includes(W.KVPV_DAILY?.quickState?.()?.job??'')&&W.KVPV_CONFIRM_POPUPS?.beforeTask?.()!==true;}
// [VI dòng gốc 15] Định nghĩa hàm next; tham số: không có | Kết thúc hàm hiện tại và trả về: gọi types.find(([t])=>!S.sent.has(day()+'/'+t)&&model()?.isFcOpenByType?.(t)===true&&free(t)) để tìm phần tử đầu tiên thỏa điều kiện.
 function next(){return types.find(([t])=>!S.sent.has(day()+'/'+t)&&model()?.isFcOpenByType?.(t)===true&&free(t));}
// [VI dòng gốc 16] Định nghĩa hàm busy; tham số: không có | Kết thúc hàm hiện tại và trả về: S.enabled&&own() và chỉ đánh giá vế phải khi vế trái truthy: !!S.pending||safe()&&!!next().
 function busy(){return S.enabled&&own()&&(!!S.pending||safe()&&!!next());}
// [VI dòng gốc 17] Định nghĩa hàm sync; tham số: không có | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài.
 function sync(){try{
// [VI dòng gốc 18] Kiểm tra !S.enabled||!own(): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  if(!S.enabled||!own())return;
// [VI dòng gốc 19] Kiểm tra S.pending: đúng thì chạy nhánh sau if. | Khai báo biến không gán lại bằng const: p = đọc S.pending; reply = đọc model()?.xbRep nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  if(S.pending){const p=S.pending,reply=model()?.xbRep;
// [VI dòng gốc 20] Kiểm tra reply!==p.reply&&Number(reply?.[0])===p.type: đúng thì chạy nhánh sau if.
   if(reply!==p.reply&&Number(reply?.[0])===p.type){
// [VI dòng gốc 21] Kiểm tra Number(reply?.[1])!==0: đúng thì chạy nhánh sau if. | gán S.reason bằng 'server_rejected_no_retry' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(Number(reply?.[1])!==0){S.reason='server_rejected_no_retry';return;}
// [VI dòng gốc 22] Kiểm tra model()?.isFirst?.(p.type)===false||model()?.isFirst?.(p.type)===0: đúng thì chạy nhánh sau if. | tăng S.confirmed một đơn vị sau khi lấy giá trị | gán S.pending bằng null
    if(model()?.isFirst?.(p.type)===false||model()?.isFirst?.(p.type)===0){S.confirmed++;S.pending=null;}
// [VI dòng gốc 23] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
   }
// [VI dòng gốc 24] Kiểm tra S.pending: đúng thì chạy nhánh sau if. | gán S.reason bằng Date.now()-p.at>10000?'waiting_ack_no_retry':'waiting_server' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
   if(S.pending){S.reason=Date.now()-p.at>10000?'waiting_ack_no_retry':'waiting_server';return;}
// [VI dòng gốc 25] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 26] Kiểm tra W.KVPV_FESTIVAL_FREE?.busy?.(): đúng thì chạy nhánh sau if. | gán S.reason bằng 'waiting_festival_treasure' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  if(W.KVPV_FESTIVAL_FREE?.busy?.()){S.reason='waiting_festival_treasure';return;}
// [VI dòng gốc 27] Kiểm tra W.KVPV_FABAO_TREASURE?.status?.()?.pending: đúng thì chạy nhánh sau if. | gán S.reason bằng 'waiting_existing_treasure_request' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  if(W.KVPV_FABAO_TREASURE?.status?.()?.pending){S.reason='waiting_existing_treasure_request';return;}
// [VI dòng gốc 28] Kiểm tra !safe(): đúng thì chạy nhánh sau if. | gán S.reason bằng 'waiting_idle' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  if(!safe()){S.reason='waiting_idle';return;}
// [VI dòng gốc 29] Khai báo biến không gán lại bằng const: row = gọi next() | Kiểm tra !row: đúng thì chạy nhánh sau if. | gán S.reason bằng 'no_free_turns' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  const row=next();if(!row){S.reason='no_free_turns';return;}const [type,panelId]=row;
// [VI dòng gốc 30] Khai báo biến không gán lại bằng const: manager = gọi ui(); panel = gọi manager?.getPanelById(panelId) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  const manager=ui(),panel=manager?.getPanelById?.(panelId);
// [VI dòng gốc 31] Kiểm tra manager?.isOpened?.(panelId)!==true||panel?._Qh!==type||!panel?.parent||panel.visible===false: đúng thì chạy nhánh sau if.
  if(manager?.isOpened?.(panelId)!==true||panel?._Qh!==type||!panel?.parent||panel.visible===false){
// [VI dòng gốc 32] Kiểm tra S.openAt!==undefined&&Date.now()-S.openAt<5000: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể. | gán S.openAt bằng Date.now() | gọi manager?.open(panelId, type) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
   if(S.openAt!==undefined&&Date.now()-S.openAt<5000)return;S.openAt=Date.now();manager?.open?.(panelId,type);S.reason='opening_free_treasure_'+type;return;
// [VI dòng gốc 33] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 34] Kiểm tra typeof model()?.c_sendXunBao!=='function'||!free(type): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  if(typeof model()?.c_sendXunBao!=='function'||!free(type))return;
// [VI dòng gốc 35] gọi S.sent.add(day()+'/'+type) | gán S.pending bằng {type,at:Date.now(),reply:model().xbRep} | gán S.reason bằng 'sent_free_'+type
  S.sent.add(day()+'/'+type);S.pending={type,at:Date.now(),reply:model().xbRep};S.reason='sent_free_'+type;
// [VI dòng gốc 36] gọi model().c_sendXunBao(0, true, false, type, false)
  model().c_sendXunBao(0,true,false,type,false);
// [VI dòng gốc 37] Nhận lỗi bằng e và chạy phần xử lý lỗi. | gán S.error bằng String(e?.message||e) | gán S.reason bằng 'error_no_retry'
 }catch(e){S.error=String(e?.message||e);S.reason='error_no_retry';}}
// [VI dòng gốc 38] Định nghĩa hàm stop; tham số: không có. Mục đích: dừng bộ điều khiển và dọn tài nguyên | gán S.enabled bằng false | Kiểm tra S.timer!==null: đúng thì chạy nhánh sau if. | gọi W.KVPV_V1?.timers?.clearInterval??W.clearInterval(S.timer)
 function stop(){S.enabled=false;if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;}
// [VI dòng gốc 39] gán W.KVPV_FREE_TREASURE bằng Object.freeze({sync,busy,stop,status:()=>({enabled:S.enabled,reason:S.reason,pending:S.pending?{type:S.pending.type,at:S.pending.at}:null, confirmed:S.confirmed,sent:S.sent.size,la…
 W.KVPV_FREE_TREASURE=Object.freeze({sync,busy,stop,status:()=>({enabled:S.enabled,reason:S.reason,pending:S.pending?{type:S.pending.type,at:S.pending.at}:null,
// [VI dòng gốc 40] Thuộc tính confirmed: đọc S.confirmed | Thuộc tính sent: đọc S.sent.size | Thuộc tính lastError: đọc S.error | Thuộc tính freeOnly: true
  confirmed:S.confirmed,sent:S.sent.size,lastError:S.error,freeOnly:true,allowKNB:false,types:types.map(([type])=>({type,free:free(type)}))}),
// [VI dòng gốc 41] Thuộc tính _handoff: tạo hàm với tham số (không có); mỗi lần gọi trả về tạo đối tượng gồm actor, pending, sent, confirmed | Thuộc tính actor: dùng biến cùng tên | Thuộc tính pending: đọc S.pending | Thuộc tính sent: tạo mảng gồm 1 vị trí: [...S.sent]
  _handoff:()=>({actor,pending:S.pending,sent:[...S.sent],confirmed:S.confirmed})});
// [VI dòng gốc 42] gán S.timer bằng (W.KVPV_V1?.timers?.setInterval??W.setInterval)(sync,250) | gọi sync()
 S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(sync,250);sync();
// [VI dòng gốc 43] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: })();
})();
// [VI dòng gốc 44] Dòng trống để tách các phần, không có lệnh thực thi.
