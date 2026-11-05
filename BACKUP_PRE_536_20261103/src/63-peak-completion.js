// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: Completion, not event opening hours, determines whether Peak needs another run. [đóng chú thích]
/* Completion, not event opening hours, determines whether Peak needs another run. */
// [VI dòng gốc 2] chạy ngay hàm bao để tạo phạm vi và khởi tạo phần chức năng bên trong
(() => {
// [VI dòng gốc 3] "use strict" | Khai báo biến không gán lại bằng const: W = window; old = đọc W.KVPV_PEAK_COMPLETION; c = gọi old?._handoff(); chức năng nội bộ chưa xác minh từ tên hàm (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gọi old?.stop() để dừng bộ điều khiển và dọn tài nguyên (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
'use strict';const W=window,old=W.KVPV_PEAK_COMPLETION,c=old?._handoff?.();old?.stop?.();
// [VI dòng gốc 4] Khai báo biến không gán lại bằng const: actor = gọi String(W.__KVPV_OWN_ACTOR_ID||'') để chuyển sang chuỗi; same = tính biểu thức c?.actor===actor; storage = tính biểu thức 'kvpv.peak.completed.'+actor
const actor=String(W.__KVPV_OWN_ACTOR_ID||''),same=c?.actor===actor,storage='kvpv.peak.completed.'+actor;
// [VI dòng gốc 5] Khai báo biến có thể gán lại bằng let: completed = nếu same thì lấy c.completed, ngược lại lấy '' | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | gán completed bằng W.localStorage?.getItem(storage)||completed | Nhận lỗi bằng _ và chạy phần xử lý lỗi.
let completed=same?c.completed:'';try{completed=W.localStorage?.getItem(storage)||completed;}catch(_){}
// [VI dòng gốc 6] Khai báo biến không gán lại bằng const: cfg = đọc W.KVPV_DAILY?.config nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); prior = đọc cfg?.enableDinhCao nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
const cfg=W.KVPV_DAILY?.config,prior=cfg?.enableDinhCao;
// [VI dòng gốc 7] Khai báo biến không gán lại bằng const: S = tạo đối tượng gồm timer, completed, exitKey, resumeKey, blocked, reason, error
const S={timer:null,completed,exitKey:same?c.exitKey:'',resumeKey:same?c.resumeKey:'',blocked:false,reason:'waiting',error:''};
// [VI dòng gốc 8] Khai báo biến không gán lại bằng const: own = tạo hàm với tham số (không có); mỗi lần gọi trả về actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'') và chỉ đánh giá vế phải khi vế trái truthy: !W.__KVPV_UNIVERSAL_HALTED
const own=()=>actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;
// [VI dòng gốc 9] Khai báo biến không gán lại bằng const: day = tạo hàm với tham số (không có); mỗi lần gọi trả về W.KVPV_DAILY_CLOCK?.key?.() hoặc dùng vế phải khi vế trái là null/undefined: new Date(Date.now()+7200000).toISOString().slice(0,10)
const day=()=>W.KVPV_DAILY_CLOCK?.key?.()??new Date(Date.now()+7200000).toISOString().slice(0,10);
// [VI dòng gốc 10] Định nghĩa hàm tick; tham số: không có. Mục đích: xử lý một nhịp kiểm tra | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài.
function tick(){try{
// [VI dòng gốc 11] Kiểm tra !own(): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể. | Khai báo biến không gán lại bằng const: today = gọi day(); claimed = W.KVPV_PEAK_CHEST?._handoff?.()?.claimed hoặc dùng vế phải khi vế trái là null/undefined: []
if(!own())return;const today=day(),claimed=W.KVPV_PEAK_CHEST?._handoff?.()?.claimed??[];
// [VI dòng gốc 12] Chú thích gốc của tác giả; không được thực thi. Nội dung: User explicitly confirmed today's Peak run and rewards are finished for these accounts.
// User explicitly confirmed today's Peak run and rewards are finished for these accounts.
// [VI dòng gốc 13] Kiểm tra today==='2026-10-24'||claimed.includes(today+'/peak-floor9'): đúng thì chạy nhánh sau if. | gán S.completed bằng today | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | gọi W.localStorage?.setItem(storage, today) để ghi giá trị vào bộ lưu trữ (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
if(today==='2026-10-24'||claimed.includes(today+'/peak-floor9')){S.completed=today;try{W.localStorage?.setItem(storage,today);}catch(_){} }
// [VI dòng gốc 14] Kiểm tra S.completed!==today: đúng thì chạy nhánh sau if. | Kiểm tra S.blocked&&cfg?.enableDinhCao===false: đúng thì chạy nhánh sau if. | gán cfg.enableDinhCao bằng prior | gán S.blocked bằng false
if(S.completed!==today){if(S.blocked&&cfg?.enableDinhCao===false)cfg.enableDinhCao=prior;S.blocked=false;S.reason='eligible_new_activity_day';return;}
// [VI dòng gốc 15] Kiểm tra cfg: đúng thì chạy nhánh sau if. | gán cfg.enableDinhCao bằng false | gán S.blocked bằng true
if(cfg)cfg.enableDinhCao=false;S.blocked=true;
// [VI dòng gốc 16] Khai báo biến không gán lại bằng const: type = gọi Number(W._ft?._po?.ins?.getCfgById?.(Number(W._C?._Mn?._Cn?.currentID))?.[7]) để chuyển sang số; rpc = đọc W._Ba?._sst?._Cht?.inst nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
const type=Number(W._ft?._po?.ins?.getCfgById?.(Number(W._C?._Mn?._Cn?.currentID))?.[7]),rpc=W._Ba?._sst?._Cht?.inst;
// [VI dòng gốc 17] Kiểm tra type===14: đúng thì chạy nhánh sau if. | Kiểm tra S.exitKey!==today&&typeof rpc?.rqEtScene==='function': đúng thì chạy nhánh sau if. | gán S.exitKey bằng today | gọi rpc.rqEtScene(0) để gửi yêu cầu vào/ra cảnh qua luồng native
if(type===14){if(S.exitKey!==today&&typeof rpc?.rqEtScene==='function'){S.exitKey=today;rpc.rqEtScene(0);}S.reason='completed_waiting_exit';return;}
// [VI dòng gốc 18] Khai báo biến không gán lại bằng const: d = đọc W.KVPV_DAILY; q = gọi d?.quickState() (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
const d=W.KVPV_DAILY,q=d?.quickState?.();
// [VI dòng gốc 19] Kiểm tra W._Ba?._$a?.SceneUtil?.isCommonScene!==true||q?.running!==true||!['rảnh','ranh'].includes(q.job)||W.KVPV?.core?.scene?.status?.()?.owner||W._Ba?._$a?._yo?.ins?.isInMission!==false|…: đúng thì chạy nhánh sau if. | gán S.reason bằng 'completed_waiting_current_job' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
if(W._Ba?._$a?.SceneUtil?.isCommonScene!==true||q?.running!==true||!['rảnh','ranh'].includes(q.job)||W.KVPV?.core?.scene?.status?.()?.owner||W._Ba?._$a?._yo?.ins?.isInMission!==false||W._Ba?._cm?._q3t?.ins?.getHasTeams?.()===true||W._Ba?._rJ?._O$?.ins?.isDead!==false){S.reason='completed_waiting_current_job';return;}
// [VI dòng gốc 20] Kiểm tra S.resumeKey!==today&&typeof d.tuVuotStart==='function': đúng thì chạy nhánh sau if. | Khai báo biến không gán lại bằng const: work = đọc W.KVPV_QUEST_PRIORITY?._handoff?.()?.work nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Kiểm tra work: đúng thì chạy nhánh sau if. | gán work.dailyEnabled bằng true
if(S.resumeKey!==today&&typeof d.tuVuotStart==='function'){const work=W.KVPV_QUEST_PRIORITY?._handoff?.()?.work;if(work)work.dailyEnabled=true;d.tuVuotStart();S.resumeKey=today;}
// [VI dòng gốc 21] gán S.reason bằng 'completed_daily_and_stage_resume'
S.reason='completed_daily_and_stage_resume';
// [VI dòng gốc 22] Nhận lỗi bằng e và chạy phần xử lý lỗi. | gán S.error bằng String(e.message||e) | gán S.reason bằng 'error_no_retry'
}catch(e){S.error=String(e.message||e);S.reason='error_no_retry';}}
// [VI dòng gốc 23] Định nghĩa hàm stop; tham số: không có. Mục đích: dừng bộ điều khiển và dọn tài nguyên | Kiểm tra S.timer!==null: đúng thì chạy nhánh sau if. | gọi W.KVPV_V1?.timers?.clearInterval??W.clearInterval(S.timer) | gán S.timer bằng null
function stop(){if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;if(S.blocked&&cfg?.enableDinhCao===false)cfg.enableDinhCao=prior;}
// [VI dòng gốc 24] gán W.KVPV_PEAK_COMPLETION bằng Object.freeze({sync:tick,stop,status:()=>({completedDay:S.completed,doneToday:S.completed===day(),reason:S.reason,lastError:S.error,exitRequested:S.exitKey===day(),stageResumeReque…
W.KVPV_PEAK_COMPLETION=Object.freeze({sync:tick,stop,status:()=>({completedDay:S.completed,doneToday:S.completed===day(),reason:S.reason,lastError:S.error,exitRequested:S.exitKey===day(),stageResumeRequested:S.resumeKey===day()}),_handoff:()=>({actor,completed:S.completed,exitKey:S.exitKey,resumeKey:S.resumeKey})});
// [VI dòng gốc 25] gán S.timer bằng (W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,1000) | gọi tick() để xử lý một nhịp kiểm tra
S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,1000);tick();
// [VI dòng gốc 26] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: })();
})();
// [VI dòng gốc 27] Dòng trống để tách các phần, không có lệnh thực thi.
