// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: Tứ Phương Bá Chủ: native free worship count, one request then count ACK. [đóng chú thích]
/* Tứ Phương Bá Chủ: native free worship count, one request then count ACK. */
// [VI dòng gốc 2] chạy ngay hàm bao để tạo phạm vi và khởi tạo phần chức năng bên trong
(() => {
// [VI dòng gốc 3] "use strict" | Khai báo biến không gán lại bằng const: W = window; old = đọc W.KVPV_FOUR_WORSHIP; c = gọi old?._handoff(); chức năng nội bộ chưa xác minh từ tên hàm (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gọi old?.stop() để dừng bộ điều khiển và dọn tài nguyên (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Khai báo biến không gán lại bằng const: actor = gọi String(W.__KVPV_OWN_ACTOR_ID||'') để chuyển sang chuỗi; same = tính biểu thức c?.actor===actor
'use strict';const W=window,old=W.KVPV_FOUR_WORSHIP,c=old?._handoff?.();old?.stop?.();const actor=String(W.__KVPV_OWN_ACTOR_ID||''),same=c?.actor===actor;
// [VI dòng gốc 4] Khai báo biến không gán lại bằng const: S = tạo đối tượng gồm timer, pending, sent, queried, last, requests, confirmed, reason, error
const S={timer:null,pending:same?c.pending:null,sent:new Set(same?c.sent:[]),queried:false,last:-Infinity,requests:same?c.requests:0,confirmed:same?c.confirmed:0,reason:'waiting',error:''};
// [VI dòng gốc 5] Khai báo biến không gán lại bằng const: m = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._Ba?._Dd?._Kpt?.inst nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); r = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._Ba?._Dd?._C3n?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
const m=()=>W._Ba?._Dd?._Kpt?.inst,r=()=>W._Ba?._Dd?._C3n?.ins;
// [VI dòng gốc 6] Khai báo biến không gán lại bằng const: own = tạo hàm với tham số (không có); mỗi lần gọi trả về actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'') và chỉ đánh giá vế phải khi vế trái truthy: !W.__KVPV_UNIVERSAL_HALTED
const own=()=>actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;
// [VI dòng gốc 7] Khai báo biến không gán lại bằng const: day = tạo hàm với tham số (không có); mỗi lần gọi trả về gọi new Date(Date.now()+7*3600000).toISOString().slice(0, 10) để lấy một đoạn dữ liệu
const day=()=>new Date(Date.now()+7*3600000).toISOString().slice(0,10);
// [VI dòng gốc 8] Định nghĩa hàm tick; tham số: không có. Mục đích: xử lý một nhịp kiểm tra | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài.
function tick(){try{
// [VI dòng gốc 9] Kiểm tra !own()||!m()||!r(): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể. | Khai báo biến không gán lại bằng const: count = gọi Number(m().getThumbsCount?.()) để chuyển sang số
if(!own()||!m()||!r())return;const count=Number(m().getThumbsCount?.());
// [VI dòng gốc 10] Kiểm tra S.pending: đúng thì chạy nhánh sau if. | Kiểm tra Number.isInteger(count)&&count<S.pending.count: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gán S.pending bằng null | tăng S.confirmed một đơn vị sau khi lấy giá trị
if(S.pending){if(Number.isInteger(count)&&count<S.pending.count){S.pending=null;S.confirmed++;}else{S.reason='waiting_count_ack_no_retry';return;}}
// [VI dòng gốc 11] Kiểm tra W.KVPV_DAILY?.quickState?.()?.running!==true||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0): đúng thì chạy nhánh sau if. | gán S.reason bằng 'yield_user_or_disabled_daily' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể. | Kiểm tra Date.now()-S.last<2000: đúng thì chạy nhánh sau if.
if(W.KVPV_DAILY?.quickState?.()?.running!==true||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)){S.reason='yield_user_or_disabled_daily';return;}if(Date.now()-S.last<2000)return;
// [VI dòng gốc 12] Kiểm tra !S.queried: đúng thì chạy nhánh sau if. | gán S.queried bằng true | gán S.last bằng Date.now() | gọi r().ReqFightFourLeaderActorInfo() (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
if(!S.queried){S.queried=true;S.last=Date.now();r().ReqFightFourLeaderActorInfo?.();S.reason='querying_native_worship_state';return;}
// [VI dòng gốc 13] Khai báo biến không gán lại bằng const: key = tính biểu thức day()+'/'+count | Kiểm tra !Number.isInteger(count)||count<=0||m().canThumbsUp?.()!==true||W._Ba?._Do?._Ho?.inst?.getFcIsOpen?.(1101)!==true||S.sent.has(key)||typeof r().ReqThumbsUpFighFourBest!=='function': đúng thì chạy nhánh sau if. | gán S.reason bằng 'no_free_worship_remaining' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
const key=day()+'/'+count;if(!Number.isInteger(count)||count<=0||m().canThumbsUp?.()!==true||W._Ba?._Do?._Ho?.inst?.getFcIsOpen?.(1101)!==true||S.sent.has(key)||typeof r().ReqThumbsUpFighFourBest!=='function'){S.reason='no_free_worship_remaining';return;}
// [VI dòng gốc 14] gọi S.sent.add(key) | gán S.pending bằng {count,at:Date.now()} | gán S.last bằng Date.now() | tăng S.requests một đơn vị sau khi lấy giá trị
S.sent.add(key);S.pending={count,at:Date.now()};S.last=Date.now();S.requests++;r().ReqThumbsUpFighFourBest();S.reason='free_worship_requested';
// [VI dòng gốc 15] Nhận lỗi bằng e và chạy phần xử lý lỗi. | gán S.error bằng String(e.message||e) | gán S.reason bằng 'error_no_retry'
}catch(e){S.error=String(e.message||e);S.reason='error_no_retry';}}
// [VI dòng gốc 16] Định nghĩa hàm stop; tham số: không có. Mục đích: dừng bộ điều khiển và dọn tài nguyên | Kiểm tra S.timer!==null: đúng thì chạy nhánh sau if. | gọi W.KVPV_V1?.timers?.clearInterval??W.clearInterval(S.timer) | gán S.timer bằng null
function stop(){if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;}
// [VI dòng gốc 17] gán W.KVPV_FOUR_WORSHIP bằng Object.freeze({sync:tick,stop,status:()=>({enabled:true,reason:S.reason,lastError:S.error,remaining:m()?.getThumbsCount?.()??null,requests:S.requests,confirmed:S.confirmed,pending:…
W.KVPV_FOUR_WORSHIP=Object.freeze({sync:tick,stop,status:()=>({enabled:true,reason:S.reason,lastError:S.error,remaining:m()?.getThumbsCount?.()??null,requests:S.requests,confirmed:S.confirmed,pending:S.pending,allowKNB:false}),_handoff:()=>({actor,pending:S.pending,sent:[...S.sent].slice(-100),requests:S.requests,confirmed:S.confirmed})});
// [VI dòng gốc 18] gán S.timer bằng (W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,2000) | gọi tick() để xử lý một nhịp kiểm tra
S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,2000);tick();
// [VI dòng gốc 19] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: })();
})();
// [VI dòng gốc 20] Dòng trống để tách các phần, không có lệnh thực thi.
