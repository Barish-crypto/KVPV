// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: Native Linh Thu Du Ngoan: claim completed trips and restart without purchases. [đóng chú thích]
/* Native Linh Thu Du Ngoan: claim completed trips and restart without purchases. */
// [VI dòng gốc 2] chạy ngay hàm bao để tạo phạm vi và khởi tạo phần chức năng bên trong
(() => {
// [VI dòng gốc 3] "use strict" | Khai báo biến không gán lại bằng const: W = window; old = đọc W.KVPV_PET_TRAVEL; c = gọi old?._handoff(); chức năng nội bộ chưa xác minh từ tên hàm (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gọi old?.stop() để dừng bộ điều khiển và dọn tài nguyên (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Khai báo biến không gán lại bằng const: actor = gọi String(W.__KVPV_OWN_ACTOR_ID||'') để chuyển sang chuỗi; same = tính biểu thức c?.actor===actor
'use strict';const W=window,old=W.KVPV_PET_TRAVEL,c=old?._handoff?.();old?.stop?.();const actor=String(W.__KVPV_OWN_ACTOR_ID||''),same=c?.actor===actor;
// [VI dòng gốc 4] Khai báo biến không gán lại bằng const: S = tạo đối tượng gồm timer, pending, queries, last, starts, claims, confirmed, reason, error
const S={timer:null,pending:new Map(same?c.pending:[]),queries:new Set(same?c.queries:[]),last:-Infinity,starts:same?c.starts:0,claims:same?c.claims:0,confirmed:same?c.confirmed:0,reason:'waiting',error:''};
// [VI dòng gốc 5] Khai báo biến không gán lại bằng const: m = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._Ba?._Q9?._ttt?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); r = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._Ba?._Q9?._$dt?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
const m=()=>W._Ba?._Q9?._ttt?.ins,r=()=>W._Ba?._Q9?._$dt?.ins;
// [VI dòng gốc 6] Khai báo biến không gán lại bằng const: own = tạo hàm với tham số (không có); mỗi lần gọi trả về actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'') và chỉ đánh giá vế phải khi vế trái truthy: !W.__KVPV_UNIVERSAL_HALTED
const own=()=>actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;
// [VI dòng gốc 7] Khai báo biến không gán lại bằng const: safe = tạo hàm với tham số (không có); mỗi lần gọi trả về Date.now()>=Number(W.__KVPV_USER_UI_UNTIL||0)&&W.KVPV_DAILY?.quickState?.()?.running===true và chỉ đánh giá vế phải khi vế trái truthy: !W.KVPV_BOSS_TEAM?.priority?.()
const safe=()=>Date.now()>=Number(W.__KVPV_USER_UI_UNTIL||0)&&W.KVPV_DAILY?.quickState?.()?.running===true&&!W.KVPV_BOSS_TEAM?.priority?.();
// [VI dòng gốc 8] Định nghĩa hàm query; tham số: id, key | Kiểm tra S.queries.has(key)||typeof r()?.getSpiritAnimalTravel!=='function': đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể. | gọi S.queries.add(key)
function query(id,key){if(S.queries.has(key)||typeof r()?.getSpiritAnimalTravel!=='function')return;S.queries.add(key);if(S.queries.size>200)S.queries.delete(S.queries.values().next().value);r().getSpiritAnimalTravel([id]);}
// [VI dòng gốc 9] Định nghĩa hàm tick; tham số: không có. Mục đích: xử lý một nhịp kiểm tra | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài.
function tick(){try{
// [VI dòng gốc 10] Kiểm tra !own()||!m()||!r(): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể. | Khai báo biến không gán lại bằng const: ids = đọc W._ft?._vZ?.ins?.ids nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Kiểm tra !Array.isArray(ids): đúng thì chạy nhánh sau if.
if(!own()||!m()||!r())return;const ids=W._ft?._vZ?.ins?.ids;if(!Array.isArray(ids))return;
// [VI dòng gốc 11] Duyệt từng giá trị trong S.pending bằng const [id,p]. | Khai báo biến không gán lại bằng const: [id,p] (chưa gán giá trị) | Khai báo biến không gán lại bằng const: row = gọi m().getPetInfos(id) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Kiểm tra row&&((p.kind==='start'&&row[3]===1&&Number(row[4])>p.end)||(p.kind==='claim'&&row[3]===0)): đúng thì chạy nhánh sau if, sai thì chạy nhánh else.
for(const [id,p]of S.pending){const row=m().getPetInfos?.(id);if(row&&((p.kind==='start'&&row[3]===1&&Number(row[4])>p.end)||(p.kind==='claim'&&row[3]===0))){S.pending.delete(id);S.confirmed++;}else if(Date.now()-p.at>=10000)query(id,'pending/'+id+'/'+p.at);}
// [VI dòng gốc 12] Kiểm tra !safe(): đúng thì chạy nhánh sau if. | gán S.reason bằng 'yield_user_or_disabled_daily' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể. | Kiểm tra Date.now()-S.last<1500: đúng thì chạy nhánh sau if.
if(!safe()){S.reason='yield_user_or_disabled_daily';return;}if(Date.now()-S.last<1500)return;
// [VI dòng gốc 13] Duyệt từng giá trị trong ids.slice(0,4) bằng const id. | Khai báo biến không gán lại bằng const: id (chưa gán giá trị) | Khai báo biến không gán lại bằng const: row = gọi m().getPetInfos(id) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Kiểm tra !row: đúng thì chạy nhánh sau if.
for(const id of ids.slice(0,4)){const row=m().getPetInfos?.(id);if(!row){query(id,'initial/'+id);continue;}if(S.pending.has(id))continue;
// [VI dòng gốc 14] Kiểm tra row[3]===1: đúng thì chạy nhánh sau if. | Khai báo biến không gán lại bằng const: server = gọi Number(W._Sa?.svrTime) để chuyển sang số | Kiểm tra Number.isFinite(server)&&Number(row[4])<=server: đúng thì chạy nhánh sau if. | gọi query(id, 'finished/'+id+'/'+row[4])
if(row[3]===1){const server=Number(W._Sa?.svrTime);if(Number.isFinite(server)&&Number(row[4])<=server)query(id,'finished/'+id+'/'+row[4]);continue;}
// [VI dòng gốc 15] Kiểm tra row[3]===2&&typeof r().getTravelAward==='function': đúng thì chạy nhánh sau if. | gọi S.pending.set(id, {kind:'claim',at:Date.now()}) | gán S.last bằng Date.now() | tăng S.claims một đơn vị sau khi lấy giá trị
if(row[3]===2&&typeof r().getTravelAward==='function'){S.pending.set(id,{kind:'claim',at:Date.now()});S.last=Date.now();S.claims++;r().getTravelAward([id]);S.reason='claim_completed_trip';return;}
// [VI dòng gốc 16] Khai báo biến không gán lại bằng const: max = gọi Number(m().maxPetNum) để chuyển sang số | Kiểm tra row[3]!==0||!Number.isInteger(row[6])||!Number.isFinite(max)||row[6]>=max: đúng thì chạy nhánh sau if. | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
const max=Number(m().maxPetNum);if(row[3]!==0||!Number.isInteger(row[6])||!Number.isFinite(max)||row[6]>=max)continue;
// [VI dòng gốc 17] Khai báo biến không gán lại bằng const: table = đọc W._ft?._sbt?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); available = gọi Number(m().typeInfos?.(1)) để chuyển sang số; reduce = gọi Number(m().travelConsumeReduceValue??0) để chuyển sang số
const table=W._ft?._sbt?.ins,available=Number(m().typeInfos?.(1)),reduce=Number(m().travelConsumeReduceValue??0);
// [VI dòng gốc 18] Kiểm tra !Number.isFinite(available)||!Number.isFinite(reduce)||reduce<0||reduce>100: đúng thì chạy nhánh sau if. | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
if(!Number.isFinite(available)||!Number.isFinite(reduce)||reduce<0||reduce>100)continue;
// [VI dòng gốc 19] Chú thích gốc của tác giả; không được thực thi. Nội dung: First two native destinations need no ticket; choose the cheapest affordable resource cost.
// First two native destinations need no ticket; choose the cheapest affordable resource cost.
// [VI dòng gốc 20] Khai báo biến không gán lại bằng const: routes = gọi (table?.ids??[]).slice(0,2).map(x=>table.getCfgById?.(x)).filter(x=>Array.isArray(x)&&Array.isArray(x[4])&&Number.isFinite(x[4][1])&&x[4][1]>=0&&![90140001,90140002].includes(Numbe…((a,b)=>a.cost-b.cost) để sắp xếp mảng tại chỗ
const routes=(table?.ids??[]).slice(0,2).map(x=>table.getCfgById?.(x)).filter(x=>Array.isArray(x)&&Array.isArray(x[4])&&Number.isFinite(x[4][1])&&x[4][1]>=0&&![90140001,90140002].includes(Number(x[4][0]))).map(x=>({row:x,cost:Math.floor(x[4][1]*(1-.01*reduce))})).filter(x=>x.cost<=available).sort((a,b)=>a.cost-b.cost);
// [VI dòng gốc 21] Kiểm tra !routes.length||typeof r().travel!=='function': đúng thì chạy nhánh sau if. | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
if(!routes.length||typeof r().travel!=='function')continue;
// [VI dòng gốc 22] gọi S.pending.set(id, {kind:'start',at:Date.now(),end:Number(row[4])||0}) | gán S.last bằng Date.now() | tăng S.starts một đơn vị sau khi lấy giá trị | gọi r().travel([id,routes[0].row[0],0,false])
S.pending.set(id,{kind:'start',at:Date.now(),end:Number(row[4])||0});S.last=Date.now();S.starts++;r().travel([id,routes[0].row[0],0,false]);S.reason='start_without_ticket_or_speedup';return;
// [VI dòng gốc 23] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 24] gán S.reason bằng S.pending.size?'waiting_ack_no_retry':'waiting_trip_completion_or_resources'
S.reason=S.pending.size?'waiting_ack_no_retry':'waiting_trip_completion_or_resources';
// [VI dòng gốc 25] Nhận lỗi bằng e và chạy phần xử lý lỗi. | gán S.error bằng String(e.message||e) | gán S.reason bằng 'error_no_retry'
}catch(e){S.error=String(e.message||e);S.reason='error_no_retry';}}
// [VI dòng gốc 26] Định nghĩa hàm stop; tham số: không có. Mục đích: dừng bộ điều khiển và dọn tài nguyên | Kiểm tra S.timer!==null: đúng thì chạy nhánh sau if. | gọi W.KVPV_V1?.timers?.clearInterval??W.clearInterval(S.timer) | gán S.timer bằng null
function stop(){if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;}
// [VI dòng gốc 27] gán W.KVPV_PET_TRAVEL bằng Object.freeze({sync:tick,stop,status:()=>({enabled:true,reason:S.reason,lastError:S.error,starts:S.starts,claims:S.claims,confirmed:S.confirmed,pending:[...S.pending].map(([id,p])=…
W.KVPV_PET_TRAVEL=Object.freeze({sync:tick,stop,status:()=>({enabled:true,reason:S.reason,lastError:S.error,starts:S.starts,claims:S.claims,confirmed:S.confirmed,pending:[...S.pending].map(([id,p])=>({id,kind:p.kind,at:p.at})),allowKNB:false}),_handoff:()=>({actor,pending:[...S.pending],queries:[...S.queries].slice(-200),starts:S.starts,claims:S.claims,confirmed:S.confirmed})});
// [VI dòng gốc 28] gán S.timer bằng (W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,1500) | gọi tick() để xử lý một nhịp kiểm tra
S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,1500);tick();
// [VI dòng gốc 29] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: })();
})();
// [VI dòng gốc 30] Dòng trống để tách các phần, không có lệnh thực thi.
