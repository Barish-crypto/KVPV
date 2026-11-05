// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: Free consecutive-login reward milestones: native ready state -> single claim -> state2 ACK. [đóng chú thích]
/* Free consecutive-login reward milestones: native ready state -> single claim -> state2 ACK. */
// [VI dòng gốc 2] chạy ngay hàm bao để tạo phạm vi và khởi tạo phần chức năng bên trong
(() => {
// [VI dòng gốc 3] "use strict" | Khai báo biến không gán lại bằng const: W = window; old = đọc W.KVPV_LOGIN_STREAK; c = gọi old?._handoff(); chức năng nội bộ chưa xác minh từ tên hàm (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gọi old?.stop() để dừng bộ điều khiển và dọn tài nguyên (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Khai báo biến không gán lại bằng const: actor = gọi String(W.__KVPV_OWN_ACTOR_ID||'') để chuyển sang chuỗi; same = tính biểu thức c?.actor===actor
'use strict';const W=window,old=W.KVPV_LOGIN_STREAK,c=old?._handoff?.();old?.stop?.();const actor=String(W.__KVPV_OWN_ACTOR_ID||''),same=c?.actor===actor;
// [VI dòng gốc 4] Khai báo biến không gán lại bằng const: S = tạo đối tượng gồm timer, pending, sent, confirmed, requests, queried, last, reason, error
const S={timer:null,pending:new Map(same?c.pending:[]),sent:new Set(same?c.sent:[]),confirmed:same?c.confirmed:0,requests:same?c.requests:0,queried:false,last:-Infinity,reason:'waiting_model',error:''};
// [VI dòng gốc 5] Khai báo biến không gán lại bằng const: ns = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._Ba?.__1?.sea_contue_login nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); m = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc ns()?._k1?.instance nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); r = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._Ba?._IY?._WRt?.ins nếu đối tượng tồn…
const ns=()=>W._Ba?.__1?.sea_contue_login,m=()=>ns()?._k1?.instance,r=()=>W._Ba?._IY?._WRt?.ins;
// [VI dòng gốc 6] Khai báo biến không gán lại bằng const: own = tạo hàm với tham số (không có); mỗi lần gọi trả về actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'') và chỉ đánh giá vế phải khi vế trái truthy: !W.__KVPV_UNIVERSAL_HALTED
const own=()=>actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;
// [VI dòng gốc 7] Định nghĩa hàm tick; tham số: không có. Mục đích: xử lý một nhịp kiểm tra | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài.
function tick(){try{
// [VI dòng gốc 8] Kiểm tra !own()||!m()||!r(): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
if(!own()||!m()||!r())return;
// [VI dòng gốc 9] Duyệt từng giá trị trong S.pending bằng const [key,p]. | Khai báo biến không gán lại bằng const: [key,p] (chưa gán giá trị) | Kiểm tra m().getAwardState?.(p.act,p.id)===2: đúng thì chạy nhánh sau if. | gọi S.pending.delete(key)
for(const [key,p]of S.pending)if(m().getAwardState?.(p.act,p.id)===2){S.pending.delete(key);S.confirmed++;}
// [VI dòng gốc 10] Kiểm tra W.KVPV_DAILY?.quickState?.()?.running!==true||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0): đúng thì chạy nhánh sau if. | gán S.reason bằng 'yield_user_or_disabled_daily' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
if(W.KVPV_DAILY?.quickState?.()?.running!==true||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)){S.reason='yield_user_or_disabled_daily';return;}
// [VI dòng gốc 11] Kiểm tra Date.now()-S.last<2000: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
if(Date.now()-S.last<2000)return;
// [VI dòng gốc 12] Kiểm tra !S.queried&&typeof r().getFestivalContinuityLoginInfo==='function': đúng thì chạy nhánh sau if. | gán S.queried bằng true | gán S.last bằng Date.now() | gọi r().getFestivalContinuityLoginInfo()
if(!S.queried&&typeof r().getFestivalContinuityLoginInfo==='function'){S.queried=true;S.last=Date.now();r().getFestivalContinuityLoginInfo();S.reason='querying_login_state';return;}
// [VI dòng gốc 13] Khai báo biến không gán lại bằng const: maps = tạo mảng gồm 2 vị trí: [ns()?.FitActIdToDatas,ns()?.FitActIdToDatasHQ]; acts = tạo mảng gồm 1 vị trí: [...new Set(maps.flatMap(x=>Object.keys(x??{})).map(Number))]; time = gọi Number(W._Sa?.svrTime) để chuyển sang số
const maps=[ns()?.FitActIdToDatas,ns()?.FitActIdToDatasHQ],acts=[...new Set(maps.flatMap(x=>Object.keys(x??{})).map(Number))],time=Number(W._Sa?.svrTime);
// [VI dòng gốc 14] Duyệt từng giá trị trong acts bằng const act. | Khai báo biến không gán lại bằng const: act (chưa gán giá trị) | Khai báo biến không gán lại bằng const: end = gọi Number(m().getEndTime?.(act)) để chuyển sang số | Kiểm tra W._Ba?._IY?._BY?.ins?.getActIsOpen?.(act)!==true||!Number.isFinite(time)||!Number.isFinite(end)||end<=time: đúng thì chạy nhánh sau if.
for(const act of acts){const end=Number(m().getEndTime?.(act));if(W._Ba?._IY?._BY?.ins?.getActIsOpen?.(act)!==true||!Number.isFinite(time)||!Number.isFinite(end)||end<=time)continue;
// [VI dòng gốc 15] Duyệt từng giá trị trong m().getStateList?.(act)??[] bằng const row. | Khai báo biến không gán lại bằng const: row (chưa gán giá trị) | Khai báo biến không gán lại bằng const: id = gọi Number(row?.[0]) để chuyển sang số; key = tính biểu thức act+'/'+end+'/'+id | Kiểm tra !Number.isSafeInteger(id)||id<=0||row?.[1]!==1||m().getAwardState?.(act,id)!==1||S.sent.has(key): đúng thì chạy nhánh sau if.
for(const row of m().getStateList?.(act)??[]){const id=Number(row?.[0]),key=act+'/'+end+'/'+id;if(!Number.isSafeInteger(id)||id<=0||row?.[1]!==1||m().getAwardState?.(act,id)!==1||S.sent.has(key))continue;
// [VI dòng gốc 16] Kiểm tra typeof r().getFestivalContinuityLoginReward!=='function': đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể. | gọi S.sent.add(key) | gọi S.pending.set(key, {act,id,at:Date.now()})
if(typeof r().getFestivalContinuityLoginReward!=='function')return;S.sent.add(key);S.pending.set(key,{act,id,at:Date.now()});S.requests++;S.last=Date.now();r().getFestivalContinuityLoginReward(id);S.reason='claim_ready_milestone';return;
// [VI dòng gốc 17] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}}
// [VI dòng gốc 18] gán S.reason bằng S.pending.size?'waiting_server_state2_no_retry':'no_ready_milestone'
S.reason=S.pending.size?'waiting_server_state2_no_retry':'no_ready_milestone';
// [VI dòng gốc 19] Nhận lỗi bằng e và chạy phần xử lý lỗi. | gán S.error bằng String(e.message||e) | gán S.reason bằng 'error_no_retry'
}catch(e){S.error=String(e.message||e);S.reason='error_no_retry';}}
// [VI dòng gốc 20] Định nghĩa hàm stop; tham số: không có. Mục đích: dừng bộ điều khiển và dọn tài nguyên | Kiểm tra S.timer!==null: đúng thì chạy nhánh sau if. | gọi W.KVPV_V1?.timers?.clearInterval??W.clearInterval(S.timer) | gán S.timer bằng null
function stop(){if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;}
// [VI dòng gốc 21] gán W.KVPV_LOGIN_STREAK bằng Object.freeze({sync:tick,stop,status:()=>({enabled:true,reason:S.reason,lastError:S.error,requests:S.requests,confirmed:S.confirmed,pending:[...S.pending.values()],allowKNB:false})…
W.KVPV_LOGIN_STREAK=Object.freeze({sync:tick,stop,status:()=>({enabled:true,reason:S.reason,lastError:S.error,requests:S.requests,confirmed:S.confirmed,pending:[...S.pending.values()],allowKNB:false}),_handoff:()=>({actor,pending:[...S.pending],sent:[...S.sent].slice(-200),requests:S.requests,confirmed:S.confirmed})});
// [VI dòng gốc 22] gán S.timer bằng (W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,2000) | gọi tick() để xử lý một nhịp kiểm tra
S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,2000);tick();
// [VI dòng gốc 23] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: })();
})();
// [VI dòng gốc 24] Dòng trống để tách các phần, không có lệnh thực thi.
