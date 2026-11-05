// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: Resume Daily only in idle common scenes. Never starts a dungeon or resets a job. [đóng chú thích]
/* Resume Daily only in idle common scenes. Never starts a dungeon or resets a job. */
// [VI dòng gốc 2] chạy ngay hàm bao để tạo phạm vi và khởi tạo phần chức năng bên trong
(() => {
// [VI dòng gốc 3] "use strict" | Khai báo biến không gán lại bằng const: W = window | gọi W.KVPV_IDLE_DAILY?.stop() để dừng bộ điều khiển và dọn tài nguyên (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Khai báo biến có thể gán lại bằng let: timer = null; reason = "waiting"
 'use strict';const W=window;W.KVPV_IDLE_DAILY?.stop?.();let timer=null,reason='waiting';
// [VI dòng gốc 4] Định nghĩa hàm sync; tham số: không có | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài.
 function sync(){try{
// [VI dòng gốc 5] Kiểm tra W.KVPV_ENTRY_POLICY?.idleDaily!==true: đúng thì chạy nhánh sau if. | gán reason bằng 'disabled' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  if(W.KVPV_ENTRY_POLICY?.idleDaily!==true){reason='disabled';return;}
// [VI dòng gốc 6] Khai báo biến không gán lại bằng const: actor = gọi String(W.__KVPV_OWN_ACTOR_ID||'') để chuyển sang chuỗi; u = đọc W._Ba?._rJ?._O$?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); d = đọc W.KVPV_DAILY; q = gọi d?.quickState() (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  const actor=String(W.__KVPV_OWN_ACTOR_ID||''),u=W._Ba?._rJ?._O$?.ins,d=W.KVPV_DAILY,q=d?.quickState?.();
// [VI dòng gốc 7] Kiểm tra !actor||String(u?.actorId)!==actor||W.__KVPV_UNIVERSAL_HALTED: đúng thì chạy nhánh sau if. | gán reason bằng 'wrong_session' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  if(!actor||String(u?.actorId)!==actor||W.__KVPV_UNIVERSAL_HALTED){reason='wrong_session';return;}
// [VI dòng gốc 8] Kiểm tra u?.isDead!==false||W._Ba?._$a?.SceneUtil?.isCommonScene!==true||W._Ba?._$a?._yo?.ins?.isInMission!==false|| W._Ba?._cm?._q3t?.ins?.getHasTeams?.()===true||W.KVPV?.core?.scene?.stat…: đúng thì chạy nhánh sau if.
  if(u?.isDead!==false||W._Ba?._$a?.SceneUtil?.isCommonScene!==true||W._Ba?._$a?._yo?.ins?.isInMission!==false||
// [VI dòng gốc 9] gọi W._Ba?._cm?._q3t?.ins?.getHasTeams() | gọi W.KVPV?.core?.scene?.status() để trả trạng thái để kiểm tra
   W._Ba?._cm?._q3t?.ins?.getHasTeams?.()===true||W.KVPV?.core?.scene?.status?.()?.owner||
// [VI dòng gốc 10] gán reason bằng 'yield_to_user_or_activity' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
   Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)){reason='yield_to_user_or_activity';return;}
// [VI dòng gốc 11] Kiểm tra q?.running===true: đúng thì chạy nhánh sau if. | gán reason bằng 'running_when_idle' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  if(q?.running===true){reason='running_when_idle';return;}
// [VI dòng gốc 12] Kiểm tra q&&!['rảnh','ranh'].includes(q.job): đúng thì chạy nhánh sau if. | gán reason bằng 'preserve_existing_job' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  if(q&&!['rảnh','ranh'].includes(q.job)){reason='preserve_existing_job';return;}
// [VI dòng gốc 13] Kiểm tra q&&typeof d?.start==='function': đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gọi d.start() để khởi động bộ điều khiển | gán reason bằng 'started_when_idle' | gán reason bằng 'waiting_daily'
  if(q&&typeof d?.start==='function'){d.start();reason='started_when_idle';}else reason='waiting_daily';
// [VI dòng gốc 14] Nhận lỗi bằng e và chạy phần xử lý lỗi. | gán reason bằng 'error: '+String(e?.message||e)
 }catch(e){reason='error: '+String(e?.message||e);}}
// [VI dòng gốc 15] Định nghĩa hàm stop; tham số: không có. Mục đích: dừng bộ điều khiển và dọn tài nguyên | Kiểm tra timer!==null: đúng thì chạy nhánh sau if. | gọi W.KVPV_V1?.timers?.clearInterval??W.clearInterval(timer) | gán timer bằng null
 function stop(){if(timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(timer);timer=null;}
// [VI dòng gốc 16] gán W.KVPV_IDLE_DAILY bằng Object.freeze({sync,stop,status:()=>({enabled:W.KVPV_ENTRY_POLICY?.idleDaily===true,reason,manualDungeons:W.KVPV_ENTRY_POLICY?.manual===true})})
 W.KVPV_IDLE_DAILY=Object.freeze({sync,stop,status:()=>({enabled:W.KVPV_ENTRY_POLICY?.idleDaily===true,reason,manualDungeons:W.KVPV_ENTRY_POLICY?.manual===true})});
// [VI dòng gốc 17] gán timer bằng (W.KVPV_V1?.timers?.setInterval??W.setInterval)(sync,1000) | gọi sync()
 timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(sync,1000);sync();
// [VI dòng gốc 18] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: })();
})();
// [VI dòng gốc 19] Dòng trống để tách các phần, không có lệnh thực thi.
