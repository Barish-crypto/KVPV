// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: Recover only an unmanaged, completed native Demon King instance. Never retry unknown exit. [đóng chú thích]
/* Recover only an unmanaged, completed native Demon King instance. Never retry unknown exit. */
// [VI dòng gốc 2] chạy ngay hàm bao để tạo phạm vi và khởi tạo phần chức năng bên trong
(() => {
// [VI dòng gốc 3] "use strict" | Khai báo biến không gán lại bằng const: W = window; old = đọc W.KVPV_DEMON_KING_RECOVERY; carry = gọi old?._handoff(); chức năng nội bộ chưa xác minh từ tên hàm (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gọi old?.stop() để dừng bộ điều khiển và dọn tài nguyên (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
 'use strict';const W=window,old=W.KVPV_DEMON_KING_RECOVERY,carry=old?._handoff?.();old?.stop?.();
// [VI dòng gốc 4] Khai báo biến không gán lại bằng const: actor = gọi String(W.__KVPV_OWN_ACTOR_ID||'') để chuyển sang chuỗi; same = tính biểu thức carry?.actor===actor
 const actor=String(W.__KVPV_OWN_ACTOR_ID||''),same=carry?.actor===actor;
// [VI dòng gốc 5] Khai báo biến không gán lại bằng const: S = tạo đối tượng gồm timer, enabled, key, since, pending, selected, retargets, exits, confirmed, reason, error
 const S={timer:null,enabled:true,key:same?carry.key:null,since:same?carry.since:0,pending:same?carry.pending:null,selected:same?carry.selected:null,retargets:same?carry.retargets:0,exits:same?carry.exits:0,confirmed:same?carry.confirmed:0,reason:'observing',error:''};
// [VI dòng gốc 6] Định nghĩa hàm tick; tham số: không có. Mục đích: xử lý một nhịp kiểm tra | Kiểm tra W.KVPV_ENTRY_POLICY?.manual===true: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể. | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài.
 function tick(){if(W.KVPV_ENTRY_POLICY?.manual===true)return;try{
// [VI dòng gốc 7] Kiểm tra !S.enabled||!actor||String(W._Ba?._rJ?._O$?.ins?.actorId??'')!==actor||W.__KVPV_UNIVERSAL_HALTED: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  if(!S.enabled||!actor||String(W._Ba?._rJ?._O$?.ins?.actorId??'')!==actor||W.__KVPV_UNIVERSAL_HALTED)return;
// [VI dòng gốc 8] Khai báo biến không gán lại bằng const: scene = đọc W._Ba?._$a nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); entry = đọc scene?._yo?.ins?.intoSce nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); map = gọi Number(W._C?._Mn?._Cn?.currentID??entry?.[0]) để chuyển sang số
  const scene=W._Ba?._$a,entry=scene?._yo?.ins?.intoSce,map=Number(W._C?._Mn?._Cn?.currentID??entry?.[0]);
// [VI dòng gốc 9] Kiểm tra scene?.SceneUtil?.isCommonScene===true: đúng thì chạy nhánh sau if. | Kiểm tra S.pending: đúng thì chạy nhánh sau if. | tăng S.confirmed một đơn vị sau khi lấy giá trị | gán S.pending bằng null
  if(scene?.SceneUtil?.isCommonScene===true){if(S.pending){S.confirmed++;S.pending=null;}S.key=null;S.selected=null;S.reason='common_scene';return;}
// [VI dòng gốc 10] Khai báo biến không gán lại bằng const: type = gọi Number(W._ft?._po?.ins?.getCfgById?.(map)?.[7]) để chuyển sang số
  const type=Number(W._ft?._po?.ins?.getCfgById?.(map)?.[7]);
// [VI dòng gốc 11] Kiểm tra type!==10||Number(scene?.SceneUtil?.curScene)!==10||Number(entry?.[0])!==map: đúng thì chạy nhánh sau if. | gán S.key bằng null | gán S.reason bằng 'other_scene_preserved' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  if(type!==10||Number(scene?.SceneUtil?.curScene)!==10||Number(entry?.[0])!==map){S.key=null;S.reason='other_scene_preserved';return;}
// [VI dòng gốc 12] Kiểm tra S.pending: đúng thì chạy nhánh sau if. | gán S.reason bằng 'waiting_exit_ack_no_retry' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  if(S.pending){S.reason='waiting_exit_ack_no_retry';return;}
// [VI dòng gốc 13] Khai báo biến không gán lại bằng const: daily = gọi W.KVPV_DAILY?.quickState() (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); lease = gọi W.KVPV?.core?.scene?.status() để trả trạng thái để kiểm tra (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  const daily=W.KVPV_DAILY?.quickState?.(),lease=W.KVPV?.core?.scene?.status?.();
// [VI dòng gốc 14] Kiểm tra daily?.running!==true||!['rảnh','ranh'].includes(daily?.job)||lease?.owner||W.KVPV_BOSS_TEAM?.priority?.(): đúng thì chạy nhánh sau if. | gán S.key bằng null | gán S.reason bằng 'existing_owner_preserved' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  if(daily?.running!==true||!['rảnh','ranh'].includes(daily?.job)||lease?.owner||W.KVPV_BOSS_TEAM?.priority?.()){S.key=null;S.reason='existing_owner_preserved';return;}
// [VI dòng gốc 15] Kiểm tra Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0): đúng thì chạy nhánh sau if. | gán S.key bằng null | gán S.reason bằng 'user_using_ui' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  if(Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)){S.key=null;S.reason='user_using_ui';return;}
// [VI dòng gốc 16] Khai báo biến không gán lại bằng const: cfg = gọi W._ft?._$st?.ins?.getCfgByMapIdAndLv(map, entry?.[3]) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); id = gọi Number(cfg?.[2]) để chuyển sang số
  const cfg=W._ft?._$st?.ins?.getCfgByMapIdAndLv?.(map,entry?.[3]),id=Number(cfg?.[2]);
// [VI dòng gốc 17] Kiểm tra !Number.isSafeInteger(id)||id<=0: đúng thì chạy nhánh sau if. | gán S.key bằng null | gán S.reason bằng 'unknown_instance_boss' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  if(!Number.isSafeInteger(id)||id<=0){S.key=null;S.reason='unknown_instance_boss';return;}
// [VI dòng gốc 18] Khai báo biến không gán lại bằng const: flag = đọc W._Ba?._sst?._ist?.inst?.getBsInfoById?.(id)?.[2]?.[0] nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  const flag=W._Ba?._sst?._ist?.inst?.getBsInfoById?.(id)?.[2]?.[0];
// [VI dòng gốc 19] Khai báo biến không gán lại bằng const: key = tính biểu thức map+'/'+entry[3]+'/'+id
  const key=map+'/'+entry[3]+'/'+id;
// [VI dòng gốc 20] Kiểm tra flag===0||flag===false: đúng thì chạy nhánh sau if.
  if(flag===0||flag===false){
// [VI dòng gốc 21] Khai báo biến không gán lại bằng const: liveKey = tính biểu thức 'live/'+key
   const liveKey='live/'+key;
// [VI dòng gốc 22] Kiểm tra S.key!==liveKey: đúng thì chạy nhánh sau if. | gán S.key bằng liveKey | gán S.since bằng Date.now() | gán S.reason bằng 'observing_unmanaged_live_boss'
   if(S.key!==liveKey){S.key=liveKey;S.since=Date.now();S.reason='observing_unmanaged_live_boss';return;}
// [VI dòng gốc 23] Kiểm tra Date.now()-S.since>=5000&&S.selected!==key&&typeof W._Ba?._rJ?._O$?.ins?.selectTar==='function': đúng thì chạy nhánh sau if, sai thì chạy nhánh else.
   if(Date.now()-S.since>=5000&&S.selected!==key&&typeof W._Ba?._rJ?._O$?.ins?.selectTar==='function'){
// [VI dòng gốc 24] gán S.selected bằng key | tăng S.retargets một đơn vị sau khi lấy giá trị | gọi W._Ba._rJ._O$.ins.selectTar(1, id) | gán S.reason bằng 'native_target_selected_once'
    S.selected=key;S.retargets++;W._Ba._rJ._O$.ins.selectTar(1,id);S.reason='native_target_selected_once';
// [VI dòng gốc 25] gán S.reason bằng 'live_boss_native_combat'
   }else S.reason='live_boss_native_combat';
// [VI dòng gốc 26] Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
   return;
// [VI dòng gốc 27] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 28] Kiểm tra flag!==1&&flag!==true: đúng thì chạy nhánh sau if. | gán S.key bằng null | gán S.reason bằng 'unknown_boss_preserved' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  if(flag!==1&&flag!==true){S.key=null;S.reason='unknown_boss_preserved';return;}
// [VI dòng gốc 29] Kiểm tra S.key!==key: đúng thì chạy nhánh sau if. | gán S.key bằng key | gán S.since bằng Date.now() | gán S.reason bằng 'confirming_completed_orphan'
  if(S.key!==key){S.key=key;S.since=Date.now();S.reason='confirming_completed_orphan';return;}
// [VI dòng gốc 30] Kiểm tra Date.now()-S.since<5000||typeof scene?._Gr?.ins?.exitDungeon!=='function': đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  if(Date.now()-S.since<5000||typeof scene?._Gr?.ins?.exitDungeon!=='function')return;
// [VI dòng gốc 31] gán S.pending bằng {key,at:Date.now()} | tăng S.exits một đơn vị sau khi lấy giá trị | gán S.reason bằng 'waiting_exit_ack_no_retry' | gọi scene._Gr.ins.exitDungeon()
  S.pending={key,at:Date.now()};S.exits++;S.reason='waiting_exit_ack_no_retry';scene._Gr.ins.exitDungeon();
// [VI dòng gốc 32] Nhận lỗi bằng e và chạy phần xử lý lỗi. | gán S.error bằng String(e?.message||e) | gán S.reason bằng 'error_no_retry'
 }catch(e){S.error=String(e?.message||e);S.reason='error_no_retry';}}
// [VI dòng gốc 33] Định nghĩa hàm stop; tham số: không có. Mục đích: dừng bộ điều khiển và dọn tài nguyên | gán S.enabled bằng false | Kiểm tra S.timer!==null: đúng thì chạy nhánh sau if. | gọi W.KVPV_V1?.timers?.clearInterval??W.clearInterval(S.timer)
 function stop(){S.enabled=false;if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);}
// [VI dòng gốc 34] gán W.KVPV_DEMON_KING_RECOVERY bằng Object.freeze({sync:tick,stop,status:()=>({enabled:S.enabled,reason:S.reason,lastError:S.error,pending:S.pending,retargets:S.retargets,exits:S.exits,confirmed:S.confirmed}),_handof…
 W.KVPV_DEMON_KING_RECOVERY=Object.freeze({sync:tick,stop,status:()=>({enabled:S.enabled,reason:S.reason,lastError:S.error,pending:S.pending,retargets:S.retargets,exits:S.exits,confirmed:S.confirmed}),_handoff:()=>({actor,key:S.key,since:S.since,pending:S.pending,selected:S.selected,retargets:S.retargets,exits:S.exits,confirmed:S.confirmed})});
// [VI dòng gốc 35] gán S.timer bằng (W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,500) | gọi tick() để xử lý một nhịp kiểm tra
 S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,500);tick();
// [VI dòng gốc 36] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: })();
})();
// [VI dòng gốc 37] Dòng trống để tách các phần, không có lệnh thực thi.
