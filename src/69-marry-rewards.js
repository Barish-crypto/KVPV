// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: Married accounts only: native ready rank/daily awards, no purchases. [đóng chú thích]
/* Married accounts only: native ready rank/daily awards, no purchases. */
// [VI dòng gốc 2] chạy ngay hàm bao để tạo phạm vi và khởi tạo phần chức năng bên trong
(() => {
// [VI dòng gốc 3] "use strict" | Khai báo biến không gán lại bằng const: W = window; old = đọc W.KVPV_MARRY_REWARDS; c = gọi old?._handoff(); chức năng nội bộ chưa xác minh từ tên hàm (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gọi old?.stop() để dừng bộ điều khiển và dọn tài nguyên (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Khai báo biến không gán lại bằng const: actor = gọi String(W.__KVPV_OWN_ACTOR_ID||'') để chuyển sang chuỗi; same = tính biểu thức c?.actor===actor
'use strict';const W=window,old=W.KVPV_MARRY_REWARDS,c=old?._handoff?.();old?.stop?.();const actor=String(W.__KVPV_OWN_ACTOR_ID||''),same=c?.actor===actor;
// [VI dòng gốc 4] Khai báo biến không gán lại bằng const: S = tạo đối tượng gồm timer, pending, sent, requests, confirmed, last, reason, error
const S={timer:null,pending:same?c.pending:null,sent:new Set(same?c.sent:[]),requests:same?c.requests:0,confirmed:same?c.confirmed:0,last:-Infinity,reason:'waiting',error:''};
// [VI dòng gốc 5] Khai báo biến không gán lại bằng const: m = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._Ba?._Yo?.marryFight?._Z9t?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); r = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._Ba?._Yo?.marryFight?._qGt?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
const m=()=>W._Ba?._Yo?.marryFight?._Z9t?.ins,r=()=>W._Ba?._Yo?.marryFight?._qGt?.ins;
// [VI dòng gốc 6] Khai báo biến không gán lại bằng const: day = tạo hàm với tham số (không có); mỗi lần gọi trả về gọi new Date(Date.now()+7*3600000).toISOString().slice(0, 10) để lấy một đoạn dữ liệu
const day=()=>new Date(Date.now()+7*3600000).toISOString().slice(0,10);
// [VI dòng gốc 7] Định nghĩa hàm tick; tham số: không có. Mục đích: xử lý một nhịp kiểm tra | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài.
function tick(){try{
// [VI dòng gốc 8] Kiểm tra !['10228867268946','10228867268941'].includes(actor)||actor!==String(W._Ba?._rJ?._O$?.ins?.actorId??'')||W.__KVPV_UNIVERSAL_HALTED: đúng thì chạy nhánh sau if. | gán S.reason bằng 'account_not_selected' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
if(!['10228867268946','10228867268941'].includes(actor)||actor!==String(W._Ba?._rJ?._O$?.ins?.actorId??'')||W.__KVPV_UNIVERSAL_HALTED){S.reason='account_not_selected';return;}
// [VI dòng gốc 9] Khai báo biến không gán lại bằng const: model = gọi m(); rpc = gọi r() | Kiểm tra !model||!rpc: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
const model=m(),rpc=r();if(!model||!rpc)return;
// [VI dòng gốc 10] Kiểm tra S.pending: đúng thì chạy nhánh sau if. | Khai báo biến không gán lại bằng const: p = đọc S.pending; d = gọi model.getDailyState() (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); ok = nếu p.kind==='rank' thì lấy model.getSegAwdState?.(p.id)===2, ngược lại lấy d?.seg===p.id&&d?.state===2 | Kiểm tra ok: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gán S.pending bằng null
if(S.pending){const p=S.pending,d=model.getDailyState?.(),ok=p.kind==='rank'?model.getSegAwdState?.(p.id)===2:d?.seg===p.id&&d?.state===2;if(ok){S.pending=null;S.confirmed++;}else{S.reason='waiting_reward_ack_no_retry';return;}}
// [VI dòng gốc 11] Kiểm tra W.KVPV_DAILY?.quickState?.()?.running!==true||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0): đúng thì chạy nhánh sau if. | gán S.reason bằng 'yield_user_or_disabled_daily' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể. | Kiểm tra Date.now()-S.last<2000: đúng thì chạy nhánh sau if.
if(W.KVPV_DAILY?.quickState?.()?.running!==true||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)){S.reason='yield_user_or_disabled_daily';return;}if(Date.now()-S.last<2000)return;
// [VI dòng gốc 12] Khai báo biến không gán lại bằng const: wife = gọi model.getWifeInfo() (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Kiểm tra !Array.isArray(wife)||wife.length<2: đúng thì chạy nhánh sau if. | gán S.reason bằng 'waiting_couple_data' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
const wife=model.getWifeInfo?.();if(!Array.isArray(wife)||wife.length<2){S.reason='waiting_couple_data';return;}
// [VI dòng gốc 13] Khai báo biến không gán lại bằng const: rows = model.getSegAwdInfos?.()??W._ft?._KXh?.ins?.geArenatCfg?.() hoặc dùng vế phải khi vế trái là null/undefined: []
const rows=model.getSegAwdInfos?.()??W._ft?._KXh?.ins?.geArenatCfg?.()??[];
// [VI dòng gốc 14] Duyệt từng giá trị trong rows bằng const row. | Khai báo biến không gán lại bằng const: row (chưa gán giá trị) | Khai báo biến không gán lại bằng const: id = gọi Number(row?.[0]) để chuyển sang số; key = tính biểu thức day()+'/rank/'+id | Kiểm tra !Number.isSafeInteger(id)||id<=0||model.getSegAwdState?.(id)!==0||S.sent.has(key)||typeof rpc.GetMarryArenaSegAward!=='function': đúng thì chạy nhánh sau if.
for(const row of rows){const id=Number(row?.[0]),key=day()+'/rank/'+id;if(!Number.isSafeInteger(id)||id<=0||model.getSegAwdState?.(id)!==0||S.sent.has(key)||typeof rpc.GetMarryArenaSegAward!=='function')continue;
// [VI dòng gốc 15] gọi S.sent.add(key) | gán S.pending bằng {kind:'rank',id,at:Date.now()} | gán S.last bằng Date.now() | tăng S.requests một đơn vị sau khi lấy giá trị
S.sent.add(key);S.pending={kind:'rank',id,at:Date.now()};S.last=Date.now();S.requests++;rpc.GetMarryArenaSegAward(id);S.reason='claim_rank_reward';return;}
// [VI dòng gốc 16] Khai báo biến không gán lại bằng const: d = gọi model.getDailyState() (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); id = gọi Number(d?.seg) để chuyển sang số; key = tính biểu thức day()+'/daily/'+id
const d=model.getDailyState?.(),id=Number(d?.seg),key=day()+'/daily/'+id;
// [VI dòng gốc 17] Kiểm tra Number.isSafeInteger(id)&&id>0&&d?.state===0&&model.hasDailyAwd?.()===true&&!S.sent.has(key)&&typeof rpc.GetMarryArenaDailyAward==='function': đúng thì chạy nhánh sau if. | gọi S.sent.add(key) | gán S.pending bằng {kind:'daily',id,at:Date.now()} | gán S.last bằng Date.now()
if(Number.isSafeInteger(id)&&id>0&&d?.state===0&&model.hasDailyAwd?.()===true&&!S.sent.has(key)&&typeof rpc.GetMarryArenaDailyAward==='function'){S.sent.add(key);S.pending={kind:'daily',id,at:Date.now()};S.last=Date.now();S.requests++;rpc.GetMarryArenaDailyAward(id);S.reason='claim_daily_reward';return;}
// [VI dòng gốc 18] gán S.reason bằng 'no_ready_rank_or_daily_reward'
S.reason='no_ready_rank_or_daily_reward';
// [VI dòng gốc 19] Nhận lỗi bằng e và chạy phần xử lý lỗi. | gán S.error bằng String(e.message||e) | gán S.reason bằng 'error_no_retry'
}catch(e){S.error=String(e.message||e);S.reason='error_no_retry';}}
// [VI dòng gốc 20] Định nghĩa hàm stop; tham số: không có. Mục đích: dừng bộ điều khiển và dọn tài nguyên | Kiểm tra S.timer!==null: đúng thì chạy nhánh sau if. | gọi W.KVPV_V1?.timers?.clearInterval??W.clearInterval(S.timer) | gán S.timer bằng null
function stop(){if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;}
// [VI dòng gốc 21] gán W.KVPV_MARRY_REWARDS bằng Object.freeze({sync:tick,stop,status:()=>({enabled:true,reason:S.reason,lastError:S.error,requests:S.requests,confirmed:S.confirmed,pending:S.pending,allowKNB:false}),_handoff:()=>…
W.KVPV_MARRY_REWARDS=Object.freeze({sync:tick,stop,status:()=>({enabled:true,reason:S.reason,lastError:S.error,requests:S.requests,confirmed:S.confirmed,pending:S.pending,allowKNB:false}),_handoff:()=>({actor,pending:S.pending,sent:[...S.sent].slice(-200),requests:S.requests,confirmed:S.confirmed})});
// [VI dòng gốc 22] gán S.timer bằng (W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,2000) | gọi tick() để xử lý một nhịp kiểm tra
S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,2000);tick();
// [VI dòng gốc 23] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: })();
})();
// [VI dòng gốc 24] Dòng trống để tách các phần, không có lệnh thực thi.
