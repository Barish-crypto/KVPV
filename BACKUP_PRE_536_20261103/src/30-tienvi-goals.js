// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: Tiên Vị: tasks [id,state,progress], cfg[3] name, [11][0] native action,
/* Tiên Vị: tasks [id,state,progress], cfg[3] name, [11][0] native action,
 * [12] goal. Tasks are already active; state 1 awards stay in the shared queue.
 * Never click arbitrary native Go buttons: some lead to SVIP/purchases. */
// [VI dòng gốc 4] chạy ngay hàm bao để tạo phạm vi và khởi tạo phần chức năng bên trong
(() => {
// [VI dòng gốc 5] "use strict"
  'use strict';
// [VI dòng gốc 6] Khai báo biến không gán lại bằng const: W = window; old = đọc W.KVPV_TIENVI_GOALS | gọi old?.stop() để dừng bộ điều khiển và dọn tài nguyên (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  const W=window,old=W.KVPV_TIENVI_GOALS;old?.stop?.();
// [VI dòng gốc 7] Khai báo biến không gán lại bằng const: actor = gọi String(W.__KVPV_OWN_ACTOR_ID||'') để chuyển sang chuỗi
  const actor=String(W.__KVPV_OWN_ACTOR_ID||'');
// [VI dòng gốc 8] Khai báo biến không gán lại bằng const: S = tạo đối tượng gồm enabled, timer, reason, tasks, lastError
  const S={enabled:true,timer:null,reason:'waiting_tasks',tasks:[],lastError:''};
// [VI dòng gốc 9] Khai báo biến không gán lại bằng const: norm = tạo hàm với tham số x; mỗi lần gọi trả về gọi String(x||'').replace(/<[^>]*>/g,'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/gi,'d').toLowerCase()
  const norm=x=>String(x||'').replace(/<[^>]*>/g,'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/gi,'d').toLowerCase();
// [VI dòng gốc 10] Định nghĩa hàm classify; tham số: q
  function classify(q){
// [VI dòng gốc 11] Khai báo biến không gán lại bằng const: n = gọi norm(q.name)
    const n=norm(q.name);
// [VI dòng gốc 12] Kiểm tra /nap|svip|vip|mua|tieu.*knb|nguyen bao/.test(n): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: "manual_paid".
    if(/nap|svip|vip|mua|tieu.*knb|nguyen bao/.test(n))return 'manual_paid';
// [VI dòng gốc 13] Kiểm tra q.action===21&&/linh lung thap/.test(n)&&Number.isSafeInteger(q.target)&&q.target>0&&q.target<=10000: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: "tower".
    if(q.action===21&&/linh lung thap/.test(n)&&Number.isSafeInteger(q.target)&&q.target>0&&q.target<=10000)return 'tower';
// [VI dòng gốc 14] Kiểm tra /phong thuy/.test(n)&&/tien phu/.test(n): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: "feng_shui".
    if(/phong thuy/.test(n)&&/tien phu/.test(n))return 'feng_shui';
// [VI dòng gốc 15] Kiểm tra /nhiem vu/.test(n)&&/tien phu/.test(n): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: "home_tasks".
    if(/nhiem vu/.test(n)&&/tien phu/.test(n))return 'home_tasks';
// [VI dòng gốc 16] Kiểm tra /tuyet hoc|cuong hoa|da hon|linh don|luyen don/.test(n): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: "upgrade_queue".
    if(/tuyet hoc|cuong hoa|da hon|linh don|luyen don/.test(n))return 'upgrade_queue';
// [VI dòng gốc 17] Kiểm tra /phap bao/.test(n): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: "fabao".
    if(/phap bao/.test(n))return 'fabao';
// [VI dòng gốc 18] Kiểm tra /than binh|linh duc|thoi trang|linh ti|thu cuoi/.test(n): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: "appearance".
    if(/than binh|linh duc|thoi trang|linh ti|thu cuoi/.test(n))return 'appearance';
// [VI dòng gốc 19] Kết thúc hàm hiện tại và trả về: "unverified_requirement".
    return 'unverified_requirement';
// [VI dòng gốc 20] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 21] Định nghĩa hàm read; tham số: không có
  function read(){
// [VI dòng gốc 22] Khai báo biến không gán lại bằng const: rows = đọc W._Ba?._G_n?._U_n?.ins?.tasks nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Kiểm tra !Array.isArray(rows): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: tạo mảng gồm 0 vị trí: [].
    const rows=W._Ba?._G_n?._U_n?.ins?.tasks;if(!Array.isArray(rows))return [];
// [VI dòng gốc 23] Kết thúc hàm hiện tại và trả về: gọi rows.filter(r=>Array.isArray(r)&&Number.isSafeInteger(Number(r[0]))&&Number(r[0])>0).map(r=>{ const cfg=W._ft?._mei?.ins?.getXianweiTaskDataById?.(Number(r[0])); const q={id:String(r[0]),state:Number(r[1]),pro…) để biến đổi từng phần tử.
    return rows.filter(r=>Array.isArray(r)&&Number.isSafeInteger(Number(r[0]))&&Number(r[0])>0).map(r=>{
// [VI dòng gốc 24] Khai báo biến không gán lại bằng const: cfg = gọi W._ft?._mei?.ins?.getXianweiTaskDataById(Number(r[0])) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
      const cfg=W._ft?._mei?.ins?.getXianweiTaskDataById?.(Number(r[0]));
// [VI dòng gốc 25] Khai báo biến không gán lại bằng const: q = tạo đối tượng gồm id, state, progress, name, action, target, source
      const q={id:String(r[0]),state:Number(r[1]),progress:Number(r[2])||0,name:String(cfg?.[3]||''),action:Number(cfg?.[11]?.[0]),target:Number(cfg?.[12]),source:'TIEN_VI'};
// [VI dòng gốc 26] gán q.executor bằng cfg?classify(q):'waiting_config'
      q.executor=cfg?classify(q):'waiting_config';
// [VI dòng gốc 27] gán q.reason bằng q.state===1?'waiting_shared_reward_queue':q.state!==0?'claimed':q.executor==='tower'?'tower_goal': ['feng_shui','home_tasks','upgrade_queue','fabao','appearance'].includes(q.execut…
      q.reason=q.state===1?'waiting_shared_reward_queue':q.state!==0?'claimed':q.executor==='tower'?'tower_goal':
// [VI dòng gốc 28] gọi ['feng_shui','home_tasks','upgrade_queue','fabao','appearance'].includes(q.executor) để kiểm tra dữ liệu có chứa giá trị
        ['feng_shui','home_tasks','upgrade_queue','fabao','appearance'].includes(q.executor)?'existing_material_executor':q.executor;
// [VI dòng gốc 29] Kết thúc hàm hiện tại và trả về: q.
      return q;
// [VI dòng gốc 30] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    });
// [VI dòng gốc 31] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 32] Định nghĩa hàm valid; tham số: không có | Kết thúc hàm hiện tại và trả về: actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'') và chỉ đánh giá vế phải khi vế trái truthy: !W.__KVPV_UNIVERSAL_HALTED.
  function valid(){return actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;}
// [VI dòng gốc 33] Định nghĩa hàm goal; tham số: không có | Kiểm tra !S.enabled||!valid(): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: null.
  function goal(){if(!S.enabled||!valid())return null;
// [VI dòng gốc 34] Chú thích gốc của tác giả; không được thực thi. Nội dung: Read fresh server state on every request; never cache a completed goal.
    // Read fresh server state on every request; never cache a completed goal.
// [VI dòng gốc 35] Kết thúc hàm hiện tại và trả về: read().filter(q=>q.state===0&&q.executor==='tower').sort((a,b)=>a.target-b.target)[0] hoặc dùng vế phải khi vế trái là null/undefined: null.
    return read().filter(q=>q.state===0&&q.executor==='tower').sort((a,b)=>a.target-b.target)[0]??null;
// [VI dòng gốc 36] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 37] Định nghĩa hàm sync; tham số: không có | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài.
  function sync(){try{
// [VI dòng gốc 38] Kiểm tra !S.enabled: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể. | Kiểm tra !valid(): đúng thì chạy nhánh sau if. | gọi stop() để dừng bộ điều khiển và dọn tài nguyên
    if(!S.enabled)return;if(!valid()){stop();return;}
// [VI dòng gốc 39] gán S.tasks bằng read() | gán S.reason bằng S.tasks.length?'tracking_native_tasks':'waiting_tasks'
    S.tasks=read();S.reason=S.tasks.length?'tracking_native_tasks':'waiting_tasks';
// [VI dòng gốc 40] Chú thích gốc của tác giả; không được thực thi. Nội dung: Claim and material work retain their existing ACK/rate-limit queue.
    // Claim and material work retain their existing ACK/rate-limit queue.
// [VI dòng gốc 41] Chú thích gốc của tác giả; không được thực thi. Nội dung: This controller adds no independent reward sender or item purchase.
    // This controller adds no independent reward sender or item purchase.
// [VI dòng gốc 42] gọi W.KVPV_QUEST_GOALS?.sync() (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    W.KVPV_QUEST_GOALS?.sync?.();
// [VI dòng gốc 43] Nhận lỗi bằng e và chạy phần xử lý lỗi. | gán S.lastError bằng String(e) | gán S.reason bằng 'error'
  }catch(e){S.lastError=String(e);S.reason='error';}}
// [VI dòng gốc 44] Định nghĩa hàm stop; tham số: không có. Mục đích: dừng bộ điều khiển và dọn tài nguyên | gán S.enabled bằng false | Kiểm tra S.timer!==null: đúng thì chạy nhánh sau if. | gọi W.KVPV_V1?.timers?.clearInterval??W.clearInterval(S.timer)
  function stop(){S.enabled=false;if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;}
// [VI dòng gốc 45] Định nghĩa hàm start; tham số: không có. Mục đích: khởi động bộ điều khiển | Kiểm tra S.timer!==null: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể. | gán S.enabled bằng true
  function start(){if(S.timer!==null)return;S.enabled=true;S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(sync,1000);sync();}
// [VI dòng gốc 46] gán W.KVPV_TIENVI_GOALS bằng Object.freeze({start,stop,sync,goal,inspect:read, status:()=>({enabled:S.enabled,actor,reason:S.reason,tasks:S.tasks.map(q=>({...q})),lastError:S.lastError,allowKNB:false})})
  W.KVPV_TIENVI_GOALS=Object.freeze({start,stop,sync,goal,inspect:read,
// [VI dòng gốc 47] Thuộc tính status: tạo hàm với tham số (không có); mỗi lần gọi trả về tạo đối tượng gồm enabled, actor, reason, tasks, lastError, allowKNB | Thuộc tính enabled: đọc S.enabled | Thuộc tính actor: dùng biến cùng tên | Thuộc tính reason: đọc S.reason
    status:()=>({enabled:S.enabled,actor,reason:S.reason,tasks:S.tasks.map(q=>({...q})),lastError:S.lastError,allowKNB:false})});
// [VI dòng gốc 48] gọi W.KVPV_QUEST_PRIORITY?.start() để khởi động bộ điều khiển (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  W.KVPV_QUEST_PRIORITY?.start?.();
// [VI dòng gốc 49] gọi start() để khởi động bộ điều khiển
  start();
// [VI dòng gốc 50] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: })();
})();
// [VI dòng gốc 51] Dòng trống để tách các phần, không có lệnh thực thi.
