// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: Native festival claims / free Dbao / existing seasonal tokens. No purchase paths. [đóng chú thích]
/* Native festival claims / free Dbao / existing seasonal tokens. No purchase paths. */
// [VI dòng gốc 2] chạy ngay hàm bao để tạo phạm vi và khởi tạo phần chức năng bên trong
(() => {
// [VI dòng gốc 3] "use strict" | Khai báo biến không gán lại bằng const: W = window; old = đọc W.KVPV_FESTIVAL_FREE; c = gọi old?._handoff(); chức năng nội bộ chưa xác minh từ tên hàm (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gọi old?.stop() để dừng bộ điều khiển và dọn tài nguyên (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Khai báo biến không gán lại bằng const: actor = gọi String(W.__KVPV_OWN_ACTOR_ID||'') để chuyển sang chuỗi; same = tính biểu thức c?.actor===actor
'use strict';const W=window,old=W.KVPV_FESTIVAL_FREE,c=old?._handoff?.();old?.stop?.();const actor=String(W.__KVPV_OWN_ACTOR_ID||''),same=c?.actor===actor;
// [VI dòng gốc 4] Khai báo biến không gán lại bằng const: S = tạo đối tượng gồm timer, pending, sent, queries, last, requests, confirmed, reason, error
const S={timer:null,pending:same?c.pending:null,sent:new Set(same?c.sent:[]),queries:new Set(),last:-Infinity,requests:same?c.requests:0,confirmed:same?c.confirmed:0,reason:'waiting',error:''};
// [VI dòng gốc 5] Khai báo biến không gán lại bằng const: ns = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._Ba?.__1 nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); rpc = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._Ba?._IY?._WRt?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); actModel = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._Ba?._IY?._BY?.ins nếu đối tượng tồn tại (bỏ…
const ns=()=>W._Ba?.__1,rpc=()=>W._Ba?._IY?._WRt?.ins,actModel=()=>W._Ba?._IY?._BY?.ins;
// [VI dòng gốc 6] Khai báo biến không gán lại bằng const: own = tạo hàm với tham số (không có); mỗi lần gọi trả về actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'') và chỉ đánh giá vế phải khi vế trái truthy: !W.__KVPV_UNIVERSAL_HALTED
const own=()=>actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;
// [VI dòng gốc 7] Khai báo biến không gán lại bằng const: day = tạo hàm với tham số (không có); mỗi lần gọi trả về gọi new Date(Date.now()+7*3600000).toISOString().slice(0, 10) để lấy một đoạn dữ liệu
const day=()=>new Date(Date.now()+7*3600000).toISOString().slice(0,10);
// [VI dòng gốc 8] Khai báo biến không gán lại bằng const: active = tạo hàm với tham số a; mỗi lần gọi trả về tính biểu thức actModel()?.getActIsOpen?.(a)===true
const active=a=>actModel()?.getActIsOpen?.(a)===true;
// [VI dòng gốc 9] Khai báo biến không gán lại bằng const: state = tạo hàm với tham số act, id; mỗi lần gọi trả về đọc ns()?.sea_login_award?._m1?.instance?.getStateList?.(act)?.find(x=>Number(x?.[0])===id)?.[1] nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
const state=(act,id)=>ns()?.sea_login_award?._m1?.instance?.getStateList?.(act)?.find(x=>Number(x?.[0])===id)?.[1];
// [VI dòng gốc 10] Khai báo biến không gán lại bằng const: bag = tạo hàm với tham số id; mỗi lần gọi trả về gọi Number(W._Ba?._Ic?._aQ?.ins?.getItemCountById?.(id)) để chuyển sang số
const bag=id=>Number(W._Ba?._Ic?._aQ?.ins?.getItemCountById?.(id));
// [VI dòng gốc 11] Định nghĩa hàm send; tham số: key, p, fn | gọi S.sent.add(key) | Kiểm tra S.sent.size>200: đúng thì chạy nhánh sau if. | gọi S.sent.delete(S.sent.values().next().value)
function send(key,p,fn){S.sent.add(key);if(S.sent.size>200)S.sent.delete(S.sent.values().next().value);S.pending={...p,at:Date.now()};S.last=Date.now();S.requests++;fn();S.reason='sent_'+p.kind;}
// [VI dòng gốc 12] Định nghĩa hàm tick; tham số: không có. Mục đích: xử lý một nhịp kiểm tra | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài.
function tick(){try{
// [VI dòng gốc 13] Kiểm tra !own(): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể. | Khai báo biến không gán lại bằng const: dbao = đọc W._Ba?._EEt?._GEt?.inst nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); guide = đọc ns()?.activity_guide?._ue?.instance nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); treasure = đọc W._Ba?._ze?._Ve?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
if(!own())return;const dbao=W._Ba?._EEt?._GEt?.inst,guide=ns()?.activity_guide?._ue?.instance,treasure=W._Ba?._ze?._Ve?.ins;
// [VI dòng gốc 14] Kiểm tra S.pending: đúng thì chạy nhánh sau if. | Khai báo biến không gán lại bằng const: p = đọc S.pending | Khai báo biến có thể gán lại bằng let: ok = false
if(S.pending){const p=S.pending;let ok=false;
// [VI dòng gốc 15] Kiểm tra p.kind==='login': đúng thì chạy nhánh sau if. | gán ok bằng state(p.act,p.id)===2
if(p.kind==='login')ok=state(p.act,p.id)===2;
// [VI dòng gốc 16] Kiểm tra p.kind==='guide': đúng thì chạy nhánh sau if. | gán ok bằng guide?.getAwardState?.(p.act)===2
if(p.kind==='guide')ok=guide?.getAwardState?.(p.act)===2;
// [VI dòng gốc 17] Kiểm tra p.kind==='dbao': đúng thì chạy nhánh sau if. | gán ok bằng Number(dbao?.fTimes)<p.count&&dbao?.noteLst!==p.reply
if(p.kind==='dbao')ok=Number(dbao?.fTimes)<p.count&&dbao?.noteLst!==p.reply;
// [VI dòng gốc 18] Kiểm tra p.kind==='token': đúng thì chạy nhánh sau if. | gán ok bằng treasure?.xbRep!==p.reply&&Number(treasure?.xbRep?.[0])===p.type&&Number(treasure?.xbRep?.[1])===0&&bag(p.item)<p.count
if(p.kind==='token')ok=treasure?.xbRep!==p.reply&&Number(treasure?.xbRep?.[0])===p.type&&Number(treasure?.xbRep?.[1])===0&&bag(p.item)<p.count;
// [VI dòng gốc 19] Kiểm tra ok: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gán S.pending bằng null | tăng S.confirmed một đơn vị sau khi lấy giá trị | gán S.reason bằng 'waiting_'+p.kind+'_ack_no_retry'
if(ok){S.pending=null;S.confirmed++;}else{S.reason='waiting_'+p.kind+'_ack_no_retry';return;}}
// [VI dòng gốc 20] Kiểm tra W.KVPV_DAILY?.quickState?.()?.running!==true||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0): đúng thì chạy nhánh sau if. | gán S.reason bằng 'yield_user_or_disabled_daily' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể. | Kiểm tra Date.now()-S.last<3000: đúng thì chạy nhánh sau if.
if(W.KVPV_DAILY?.quickState?.()?.running!==true||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)){S.reason='yield_user_or_disabled_daily';return;}if(Date.now()-S.last<3000)return;
// [VI dòng gốc 21] Khai báo biến không gán lại bằng const: login = đọc ns()?.sea_login_award nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); m = đọc login?._m1?.instance nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
const login=ns()?.sea_login_award,m=login?._m1?.instance;
// [VI dòng gốc 22] Duyệt từng giá trị trong Object.keys({...login?.FitActIdToDatas,...login?.FitActIdToDatasHQ}).map(Number) bằng const a. | Khai báo biến không gán lại bằng const: a (chưa gán giá trị) | Kiểm tra !active(a): đúng thì chạy nhánh sau if. | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
for(const a of Object.keys({...login?.FitActIdToDatas,...login?.FitActIdToDatasHQ}).map(Number)){if(!active(a))continue;
// [VI dòng gốc 23] Duyệt từng giá trị trong m?.getStateList?.(a)??[] bằng const row. | Khai báo biến không gán lại bằng const: row (chưa gán giá trị) | Khai báo biến không gán lại bằng const: id = gọi Number(row?.[0]) để chuyển sang số; key = tính biểu thức day()+'/login/'+a+'/'+id | Kiểm tra Number.isSafeInteger(id)&&id>0&&row[1]===1&&!S.sent.has(key)&&typeof rpc()?.getFestivalLoginReward==='function': đúng thì chạy nhánh sau if.
for(const row of m?.getStateList?.(a)??[]){const id=Number(row?.[0]),key=day()+'/login/'+a+'/'+id;if(Number.isSafeInteger(id)&&id>0&&row[1]===1&&!S.sent.has(key)&&typeof rpc()?.getFestivalLoginReward==='function'){send(key,{kind:'login',act:a,id},()=>rpc().getFestivalLoginReward(id));return;}}}
// [VI dòng gốc 24] Khai báo biến không gán lại bằng const: a = gọi Number(guide?.curActId) để chuyển sang số; gkey = tính biểu thức day()+'/guide/'+a
const a=Number(guide?.curActId),gkey=day()+'/guide/'+a;
// [VI dòng gốc 25] Kiểm tra a>0&&active(a)&&guide.getAwardState?.(a)===1&&!S.sent.has(gkey)&&typeof ns()?.activity_guide?._lin?.instance?.c2sGetAward==='function': đúng thì chạy nhánh sau if. | gọi send(gkey, {kind:'guide',act:a}, ()=>ns().activity_guide._lin.instance.c2sGetAward(a)) | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
if(a>0&&active(a)&&guide.getAwardState?.(a)===1&&!S.sent.has(gkey)&&typeof ns()?.activity_guide?._lin?.instance?.c2sGetAward==='function'){send(gkey,{kind:'guide',act:a},()=>ns().activity_guide._lin.instance.c2sGetAward(a));return;}
// [VI dòng gốc 26] Chú thích gốc của tác giả; không được thực thi. Nội dung: Refresh read-only state once per calendar day, independent of whether its panel is open.
// Refresh read-only state once per calendar day, independent of whether its panel is open.
// [VI dòng gốc 27] Kiểm tra !S.queries.has(day()): đúng thì chạy nhánh sau if. | gọi S.queries.add(day()) | gán S.last bằng Date.now() | gọi rpc()?.getFestivalLoginRewardInfo() (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
if(!S.queries.has(day())){S.queries.add(day());S.last=Date.now();rpc()?.getFestivalLoginRewardInfo?.();W._Ba?._EEt?._OEt?.inst?.GetDbaoInfo?.();ns()?.activity_guide?._lin?.instance?.c2sGetInfo?.();S.reason='querying_free_event_state';return;}
// [VI dòng gốc 28] Khai báo biến không gán lại bằng const: server = gọi Number(W._Sa?.svrTime) để chuyển sang số; count = gọi Number(dbao?.fTimes) để chuyển sang số; dkey = tính biểu thức day()+'/dbao/'+dbao?.restTm+'/'+count
const server=Number(W._Sa?.svrTime),count=Number(dbao?.fTimes),dkey=day()+'/dbao/'+dbao?.restTm+'/'+count;
// [VI dòng gốc 29] Kiểm tra Number.isInteger(count)&&count>0&&dbao?.oState===1&&Number(dbao.restTm)>server&&W._Ba?._Do?._Ho?.inst?.getFcIsOpen?.(217)===true&&!S.sent.has(dkey)&&typeof W._Ba?._EEt?._OEt?.inst?…: đúng thì chạy nhánh sau if. | gọi send(dkey, {kind:'dbao',count,reply:dbao.noteLst}, ()=>W._Ba._EEt._OEt.inst.DbaoRun(0)) | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
if(Number.isInteger(count)&&count>0&&dbao?.oState===1&&Number(dbao.restTm)>server&&W._Ba?._Do?._Ho?.inst?.getFcIsOpen?.(217)===true&&!S.sent.has(dkey)&&typeof W._Ba?._EEt?._OEt?.inst?.DbaoRun==='function'){send(dkey,{kind:'dbao',count,reply:dbao.noteLst},()=>W._Ba._EEt._OEt.inst.DbaoRun(0));return;}
// [VI dòng gốc 30] Kiểm tra W.KVPV_FREE_TREASURE?.busy?.()||W.KVPV_FABAO_TREASURE?.status?.()?.pending: đúng thì chạy nhánh sau if. | gán S.reason bằng 'waiting_other_treasure' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
if(W.KVPV_FREE_TREASURE?.busy?.()||W.KVPV_FABAO_TREASURE?.status?.()?.pending){S.reason='waiting_other_treasure';return;}
// [VI dòng gốc 31] Khai báo biến không gán lại bằng const: season = đọc ns()?.sea_treasure nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); sm = đọc season?._v1?.instance nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
const season=ns()?.sea_treasure,sm=season?._v1?.instance;
// [VI dòng gốc 32] Duyệt từng giá trị trong Object.entries(season?.FitActIdToDatas??{}) bằng const [id,meta]. | Khai báo biến không gán lại bằng const: [id,meta] (chưa gán giá trị) | Khai báo biến không gán lại bằng const: act = gọi Number(id) để chuyển sang số | Khai báo biến không gán lại bằng const: end = gọi Number(sm?.getEndTm?.(act)) để chuyển sang số
for(const [id,meta]of Object.entries(season?.FitActIdToDatas??{})){const act=Number(id);const end=Number(sm?.getEndTm?.(act));if(!active(act)||!Number.isFinite(server)||!Number.isFinite(end)||end<=server)continue;
// [VI dòng gốc 33] Khai báo biến không gán lại bằng const: type = đọc W._ft?._gY?.ins?.getCfgById?.(66068)?.[2]?.[meta[0]] nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Kiểm tra !Number.isSafeInteger(type): đúng thì chạy nhánh sau if. | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
const type=W._ft?._gY?.ins?.getCfgById?.(66068)?.[2]?.[meta[0]];if(!Number.isSafeInteger(type))continue;
// [VI dòng gốc 34] Khai báo biến không gán lại bằng const: cost = đọc W._ft?._oZ?.ins?.getQDXBCostNumList?.(type)?.[0] nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Kiểm tra !Array.isArray(cost): đúng thì chạy nhánh sau if. | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo. | Khai báo biến không gán lại bằng const: item = gọi Number(cost[0]) để chuyển sang số; qty = gọi Number(cost[1]) để chuyển sang số; have = gọi bag(item); key = tính biểu thức day()+'/token/'+act+'/'+type+'/'+have
const cost=W._ft?._oZ?.ins?.getQDXBCostNumList?.(type)?.[0];if(!Array.isArray(cost))continue;const item=Number(cost[0]),qty=Number(cost[1]),have=bag(item),key=day()+'/token/'+act+'/'+type+'/'+have;
// [VI dòng gốc 35] Kiểm tra !Number.isSafeInteger(item)||item<=0||item>=90000000||!Number.isSafeInteger(qty)||qty<=0||!Number.isInteger(have)||have<qty||S.sent.has(key)||typeof W._Ba?._ze?._pmt?.ins?.runXunba…: đúng thì chạy nhánh sau if. | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
if(!Number.isSafeInteger(item)||item<=0||item>=90000000||!Number.isSafeInteger(qty)||qty<=0||!Number.isInteger(have)||have<qty||S.sent.has(key)||typeof W._Ba?._ze?._pmt?.ins?.runXunbao!=='function')continue;
// [VI dòng gốc 36] gọi send(key, {kind:'token',type,item,count:have,reply:treasure?.xbRep}, ()=>W._Ba._ze._pmt.ins.runXunbao(type,0,false)) | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
send(key,{kind:'token',type,item,count:have,reply:treasure?.xbRep},()=>W._Ba._ze._pmt.ins.runXunbao(type,0,false));return;}
// [VI dòng gốc 37] gán S.reason bằng 'no_eligible_free_rewards_or_tokens'
S.reason='no_eligible_free_rewards_or_tokens';
// [VI dòng gốc 38] Nhận lỗi bằng e và chạy phần xử lý lỗi. | gán S.error bằng String(e.message||e) | gán S.reason bằng 'error_no_retry'
}catch(e){S.error=String(e.message||e);S.reason='error_no_retry';}}
// [VI dòng gốc 39] Định nghĩa hàm stop; tham số: không có. Mục đích: dừng bộ điều khiển và dọn tài nguyên | Kiểm tra S.timer!==null: đúng thì chạy nhánh sau if. | gọi W.KVPV_V1?.timers?.clearInterval??W.clearInterval(S.timer) | gán S.timer bằng null
function stop(){if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;}
// [VI dòng gốc 40] gán W.KVPV_FESTIVAL_FREE bằng Object.freeze({sync:tick,busy:()=>!!S.pending,stop,status:()=>({enabled:true,reason:S.reason,lastError:S.error,requests:S.requests,confirmed:S.confirmed,pending:S.pending?{kind:S.p…
W.KVPV_FESTIVAL_FREE=Object.freeze({sync:tick,busy:()=>!!S.pending,stop,status:()=>({enabled:true,reason:S.reason,lastError:S.error,requests:S.requests,confirmed:S.confirmed,pending:S.pending?{kind:S.pending.kind,act:S.pending.act,type:S.pending.type,at:S.pending.at}:null,allowKNB:false}),_handoff:()=>({actor,pending:S.pending,sent:[...S.sent],requests:S.requests,confirmed:S.confirmed})});
// [VI dòng gốc 41] gán S.timer bằng (W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,2000) | gọi tick() để xử lý một nhịp kiểm tra
S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,2000);tick();
// [VI dòng gốc 42] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: })();
})();
// [VI dòng gốc 43] Dòng trống để tách các phần, không có lệnh thực thi.
