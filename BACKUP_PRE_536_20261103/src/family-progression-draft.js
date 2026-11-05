// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: Family tasks and owned-material progression; does not buy resources or change combat forms. [đóng chú thích]
/* Family tasks and owned-material progression; does not buy resources or change combat forms. */
// [VI dòng gốc 2] chạy ngay hàm bao để tạo phạm vi và khởi tạo phần chức năng bên trong
(() => {
// [VI dòng gốc 3] "use strict" | Khai báo biến không gán lại bằng const: W = window; old = đọc W.KVPV_FAMILY_AUTO; c = gọi old?._handoff(); chức năng nội bộ chưa xác minh từ tên hàm (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gọi old?.stop() để dừng bộ điều khiển và dọn tài nguyên (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Khai báo biến không gán lại bằng const: actor = gọi String(W.__KVPV_OWN_ACTOR_ID||'') để chuyển sang chuỗi; same = tính biểu thức c?.actor===actor
'use strict';const W=window,old=W.KVPV_FAMILY_AUTO,c=old?._handoff?.();old?.stop?.();const actor=String(W.__KVPV_OWN_ACTOR_ID||''),same=c?.actor===actor;
// [VI dòng gốc 4] Khai báo biến không gán lại bằng const: S = tạo đối tượng gồm timer, pending, last, queried, requests, confirmed, reason, error
const S={timer:null,pending:same?c.pending:null,last:-Infinity,queried:false,requests:same?c.requests:0,confirmed:same?c.confirmed:0,reason:'waiting',error:''};
// [VI dòng gốc 5] Khai báo biến không gán lại bằng const: child = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._Ba?._Yo?.marryChild?._nZ?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); crpc = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._Ba?._Yo?.marryChild?._uf?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); tm = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._Ba?._Yo?.mar…
const child=()=>W._Ba?._Yo?.marryChild?._nZ?.ins,crpc=()=>W._Ba?._Yo?.marryChild?._uf?.ins,tm=()=>W._Ba?._Yo?.marryTask?._eOt?.ins;
// [VI dòng gốc 6] Khai báo biến không gán lại bằng const: tasks = tạo hàm với tham số (không có); mỗi lần gọi trả về tạo mảng gồm 2 vị trí: [...(tm()?.getTask?.(1)??[]),...(tm()?.getTask?.(2)??[])]
const tasks=()=>[...(tm()?.getTask?.(1)??[]),...(tm()?.getTask?.(2)??[])];
// [VI dòng gốc 7] Khai báo biến không gán lại bằng const: own = tạo hàm với tham số (không có); mỗi lần gọi trả về actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'') và chỉ đánh giá vế phải khi vế trái truthy: !W.__KVPV_UNIVERSAL_HALTED
const own=()=>actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;
// [VI dòng gốc 8] Khai báo biến không gán lại bằng const: pair = tạo hàm với tham số info; mỗi lần gọi trả về gọi JSON.stringify([info?.level,info?.exp]) để chuyển giá trị thành chuỗi JSON
const pair=info=>JSON.stringify([info?.level,info?.exp]);
// [VI dòng gốc 9] Định nghĩa hàm material; tham số: cost | Khai báo biến không gán lại bằng const: id = gọi Number(cost?.[0]) để chuyển sang số; need = gọi Number(cost?.[1]) để chuyển sang số; have = gọi Number(W._Ba?._Ic?._aQ?.ins?.getItemCountById?.(id)) để chuyển sang số | Kết thúc hàm hiện tại và trả về: Number.isSafeInteger(id)&&id>0&&id<90000000&&Number.isInteger(need)&&need>0&&Number.isFinite(have) và chỉ đánh giá vế phải khi vế trái truthy: have>=need.
function material(cost){const id=Number(cost?.[0]),need=Number(cost?.[1]),have=Number(W._Ba?._Ic?._aQ?.ins?.getItemCountById?.(id));return Number.isSafeInteger(id)&&id>0&&id<90000000&&Number.isInteger(need)&&need>0&&Number.isFinite(have)&&have>=need;}
// [VI dòng gốc 10] Định nghĩa hàm send; tham số: p, fn | gán S.pending bằng {...p,at:Date.now()} | gán S.last bằng Date.now() | tăng S.requests một đơn vị sau khi lấy giá trị
function send(p,fn){S.pending={...p,at:Date.now()};S.last=Date.now();S.requests++;fn();S.reason='sent_'+p.kind;}
// [VI dòng gốc 11] Định nghĩa hàm tick; tham số: không có. Mục đích: xử lý một nhịp kiểm tra | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài.
function tick(){try{
// [VI dòng gốc 12] Kiểm tra !own(): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể. | Khai báo biến không gán lại bằng const: m = gọi child(); r = gọi crpc(); tr = đọc W._Ba?._s3?._ZJ?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
if(!own())return;const m=child(),r=crpc(),tr=W._Ba?._s3?._ZJ?.ins;
// [VI dòng gốc 13] Kiểm tra S.pending: đúng thì chạy nhánh sau if. | Khai báo biến không gán lại bằng const: p = đọc S.pending | Khai báo biến có thể gán lại bằng let: ok = false
if(S.pending){const p=S.pending;let ok=false;
// [VI dòng gốc 14] Kiểm tra p.kind==='task': đúng thì chạy nhánh sau if. | gán ok bằng tasks().some(x=>Number(x[0])===p.id&&x[3]===3)
if(p.kind==='task')ok=tasks().some(x=>Number(x[0])===p.id&&x[3]===3);
// [VI dòng gốc 15] Kiểm tra p.kind==='feed': đúng thì chạy nhánh sau if. | gán ok bằng Number(m?.getOneFeedCurInfo?.(p.id))>p.before
if(p.kind==='feed')ok=Number(m?.getOneFeedCurInfo?.(p.id))>p.before;
// [VI dòng gốc 16] Kiểm tra p.kind==='child': đúng thì chạy nhánh sau if. | gán ok bằng pair(m?.getXnInfoByFuWaId?.(p.id))!==p.before&&!!m?.getXnInfoByFuWaId?.(p.id)
if(p.kind==='child')ok=pair(m?.getXnInfoByFuWaId?.(p.id))!==p.before&&!!m?.getXnInfoByFuWaId?.(p.id);
// [VI dòng gốc 17] Kiểm tra p.kind==='illusion': đúng thì chạy nhánh sau if. | gán ok bằng Number(tr?.huanhuaList?.()?.[p.id]?.[1])>p.before
if(p.kind==='illusion')ok=Number(tr?.huanhuaList?.()?.[p.id]?.[1])>p.before;
// [VI dòng gốc 18] Kiểm tra ok: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gán S.pending bằng null | tăng S.confirmed một đơn vị sau khi lấy giá trị | gán S.reason bằng 'waiting_'+p.kind+'_ack_no_retry'
if(ok){S.pending=null;S.confirmed++;}else{S.reason='waiting_'+p.kind+'_ack_no_retry';return;}}
// [VI dòng gốc 19] Kiểm tra W.KVPV_DAILY?.quickState?.()?.running!==true||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)||W.KVPV_UPGRADES?.busy?.()||W.KVPV_APPEARANCE_AUTO?.status?.()?.pending: đúng thì chạy nhánh sau if. | gán S.reason bằng 'yield_user_or_other_upgrade' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể. | Kiểm tra Date.now()-S.last<1500: đúng thì chạy nhánh sau if.
if(W.KVPV_DAILY?.quickState?.()?.running!==true||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)||W.KVPV_UPGRADES?.busy?.()||W.KVPV_APPEARANCE_AUTO?.status?.()?.pending){S.reason='yield_user_or_other_upgrade';return;}if(Date.now()-S.last<1500)return;
// [VI dòng gốc 20] Kiểm tra !S.queried: đúng thì chạy nhánh sau if. | gán S.queried bằng true | gán S.last bằng Date.now() | gọi r?.onFuwaAllInfoReq() (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
if(!S.queried){S.queried=true;S.last=Date.now();r?.onFuwaAllInfoReq?.();if(['10228867268946','10228867268941'].includes(actor))W._Ba?._Yo?.marryTask?._fOt?.ins?.GetMarryTaskInfo?.();S.reason='querying_native_state';return;}
// [VI dòng gốc 21] Kiểm tra ['10228867268946','10228867268941'].includes(actor): đúng thì chạy nhánh sau if. | Duyệt từng giá trị trong tasks() bằng const row. | Khai báo biến không gán lại bằng const: row (chưa gán giá trị) | Khai báo biến không gán lại bằng const: id = gọi Number(row?.[0]) để chuyển sang số
if(['10228867268946','10228867268941'].includes(actor))for(const row of tasks()){const id=Number(row?.[0]);if(Number.isSafeInteger(id)&&id>0&&row[3]===1&&typeof W._Ba?._Yo?.marryTask?._fOt?.ins?.GetMarryTaskReward==='function'){send({kind:'task',id},()=>W._Ba._Yo.marryTask._fOt.ins.GetMarryTaskReward(id));return;}}
// [VI dòng gốc 22] Duyệt từng giá trị trong W._ft?._OOi?.ins?.getAllIds?.()??[] bằng const id. | Khai báo biến không gán lại bằng const: id (chưa gán giá trị) | Kiểm tra Number.isSafeInteger(id)&&id>0&&id<90000000&&m?.checkOneFeedRP?.(id)===true&&material([id,1])&&typeof r?.onFuwaFeedReq==='function': đúng thì chạy nhánh sau if. | gọi send({kind:'feed',id,before:Number(m.getOneFeedCurInfo(id))}, ()=>r.onFuwaFeedReq(id))
for(const id of W._ft?._OOi?.ins?.getAllIds?.()??[]){if(Number.isSafeInteger(id)&&id>0&&id<90000000&&m?.checkOneFeedRP?.(id)===true&&material([id,1])&&typeof r?.onFuwaFeedReq==='function'){send({kind:'feed',id,before:Number(m.getOneFeedCurInfo(id))},()=>r.onFuwaFeedReq(id));return;}}
// [VI dòng gốc 23] Khai báo biến không gán lại bằng const: table = đọc W._ft?._MOi?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); ids = table?.getIds?.() hoặc dùng vế phải khi vế trái là null/undefined: []
const table=W._ft?._MOi?.ins,ids=table?.getIds?.()??[];
// [VI dòng gốc 24] Duyệt từng giá trị trong ids bằng const id. | Khai báo biến không gán lại bằng const: id (chưa gán giá trị) | Khai báo biến không gán lại bằng const: info = gọi m?.getXnInfoByFuWaId(id) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); lv = gọi Number(info?.level) để chuyển sang số; cfg = gọi table.getInfoByIdAndLv(id, lv) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Kiểm tra !info||!Number.isInteger(lv)||!table.getInfoByIdAndLv?.(id,lv+1)||!material(cfg?.[2])||m.checkOneChildXNUpRP?.(id)!==true||typeof r?.onFuwaBaseInfoUpReq!=='function': đúng thì chạy nhánh sau if.
for(const id of ids){const info=m?.getXnInfoByFuWaId?.(id),lv=Number(info?.level),cfg=table.getInfoByIdAndLv?.(id,lv);if(!info||!Number.isInteger(lv)||!table.getInfoByIdAndLv?.(id,lv+1)||!material(cfg?.[2])||m.checkOneChildXNUpRP?.(id)!==true||typeof r?.onFuwaBaseInfoUpReq!=='function')continue;
// [VI dòng gốc 25] gọi send({kind:'child',id,before:pair(info)}, ()=>r.onFuwaBaseInfoUpReq(id)) | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
send({kind:'child',id,before:pair(info)},()=>r.onFuwaBaseInfoUpReq(id));return;}
// [VI dòng gốc 26] Khai báo biến không gán lại bằng const: skins = gọi tr?.huanhuaList() (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); tc = đọc W._ft?._YZ?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); gate = gọi Number(W._ft?._gY?.ins?.getCfgById?.(92009)?.[2]?.[0]) để chuyển sang số; stage = gọi Number(W._Ba?._Co?._Mo?.ins?.curLv) để chuyển sang số
const skins=tr?.huanhuaList?.(),tc=W._ft?._YZ?.ins,gate=Number(W._ft?._gY?.ins?.getCfgById?.(92009)?.[2]?.[0]),stage=Number(W._Ba?._Co?._Mo?.ins?.curLv);
// [VI dòng gốc 27] Kiểm tra skins&&Number.isFinite(gate)&&stage-1>=gate: đúng thì chạy nhánh sau if. | Duyệt từng giá trị trong Object.entries(skins) bằng const [key,entry]. | Khai báo biến không gán lại bằng const: [key,entry] (chưa gán giá trị) | Khai báo biến không gán lại bằng const: id = gọi Number(key) để chuyển sang số; lv = gọi Number(entry?.[1]) để chuyển sang số; cfg = gọi tc?.getHuanhuaCfgByIdAndLev(id, lv) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); cost = đọc cfg?.[6] nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
if(skins&&Number.isFinite(gate)&&stage-1>=gate)for(const [key,entry]of Object.entries(skins)){const id=Number(key),lv=Number(entry?.[1]),cfg=tc?.getHuanhuaCfgByIdAndLev?.(id,lv),cost=cfg?.[6];if(!Number.isSafeInteger(id)||!Number.isInteger(lv)||lv<1||entry?.[2]||Number(entry?.[3])>0||!tc?.getHuanhuaCfgByIdAndLev?.(id,lv+1)||!material(cost))continue;
// [VI dòng gốc 28] Khai báo biến không gán lại bằng const: limit = gọi Number(W._et?.getSvipLimit?.(cost[0])) để chuyển sang số; vip = gọi Number(W._Ba?._ke?._Le?.instance?.curSvipLv) để chuyển sang số | Kiểm tra !Number.isFinite(limit)||!Number.isFinite(vip)||vip<limit||typeof W._Ba?._s3?._Kyt?.ins?.RiseTransformingMagicShow!=='function': đúng thì chạy nhánh sau if. | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
const limit=Number(W._et?.getSvipLimit?.(cost[0])),vip=Number(W._Ba?._ke?._Le?.instance?.curSvipLv);if(!Number.isFinite(limit)||!Number.isFinite(vip)||vip<limit||typeof W._Ba?._s3?._Kyt?.ins?.RiseTransformingMagicShow!=='function')continue;
// [VI dòng gốc 29] gọi send({kind:'illusion',id,before:lv}, ()=>{tr._huanhuaActId=id;W._Ba._s3._Kyt.ins.RiseTransformingMagicShow(id);}) | gán tr._huanhuaActId bằng id | gọi W._Ba._s3._Kyt.ins.RiseTransformingMagicShow(id) | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
send({kind:'illusion',id,before:lv},()=>{tr._huanhuaActId=id;W._Ba._s3._Kyt.ins.RiseTransformingMagicShow(id);});return;}
// [VI dòng gốc 30] gán S.reason bằng 'no_ready_tasks_or_owned_materials'
S.reason='no_ready_tasks_or_owned_materials';
// [VI dòng gốc 31] Nhận lỗi bằng e và chạy phần xử lý lỗi. | gán S.error bằng String(e.message||e) | gán S.reason bằng 'error_no_retry'
}catch(e){S.error=String(e.message||e);S.reason='error_no_retry';}}
// [VI dòng gốc 32] Định nghĩa hàm stop; tham số: không có. Mục đích: dừng bộ điều khiển và dọn tài nguyên | Kiểm tra S.timer!==null: đúng thì chạy nhánh sau if. | gọi W.KVPV_V1?.timers?.clearInterval??W.clearInterval(S.timer) | gán S.timer bằng null
function stop(){if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;}
// [VI dòng gốc 33] gán W.KVPV_FAMILY_AUTO bằng Object.freeze({sync:tick,stop,status:()=>({enabled:true,reason:S.reason,lastError:S.error,requests:S.requests,confirmed:S.confirmed,pending:S.pending,allowKNB:false}),_handoff:()=>…
W.KVPV_FAMILY_AUTO=Object.freeze({sync:tick,stop,status:()=>({enabled:true,reason:S.reason,lastError:S.error,requests:S.requests,confirmed:S.confirmed,pending:S.pending,allowKNB:false}),_handoff:()=>({actor,pending:S.pending,requests:S.requests,confirmed:S.confirmed})});
// [VI dòng gốc 34] gán S.timer bằng (W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,1500) | gọi tick() để xử lý một nhịp kiểm tra
S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,1500);tick();
// [VI dòng gốc 35] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: })();
})();
// [VI dòng gốc 36] Dòng trống để tách các phần, không có lệnh thực thi.
