// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: Peak scene71 floor9: native NPC selection -> real gather panel click -> server ACK. [đóng chú thích]
/* Peak scene71 floor9: native NPC selection -> real gather panel click -> server ACK. */
// [VI dòng gốc 2] chạy ngay hàm bao để tạo phạm vi và khởi tạo phần chức năng bên trong
(() => {
// [VI dòng gốc 3] "use strict" | Khai báo biến không gán lại bằng const: W = window; old = đọc W.KVPV_EIGHT_CHEST; c = gọi old?._handoff(); chức năng nội bộ chưa xác minh từ tên hàm (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gọi old?.stop() để dừng bộ điều khiển và dọn tài nguyên (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
'use strict';const W=window,old=W.KVPV_EIGHT_CHEST,c=old?._handoff?.();old?.stop?.();
// [VI dòng gốc 4] Khai báo biến không gán lại bằng const: actor = gọi String(W.__KVPV_OWN_ACTOR_ID||'') để chuyển sang chuỗi; same = tính biểu thức c?.actor===actor
const actor=String(W.__KVPV_OWN_ACTOR_ID||''),same=c?.actor===actor;
// [VI dòng gốc 5] Khai báo biến không gán lại bằng const: S = tạo đối tượng gồm enabled, timer, pending, claimed, lastSelect, clicks, confirmed, reason, error, listening
const S={enabled:true,timer:null,pending:same?c.pending:null,claimed:new Set(same?c.claimed:[]),lastSelect:-Infinity,clicks:same?c.clicks:0,confirmed:same?c.confirmed:0,reason:'waiting_floor9',error:'',listening:false};
// [VI dòng gốc 6] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 7] Khai báo biến không gán lại bằng const: user = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._Ba?._rJ?._O$?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); model = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._Ba?._K_t?._Z7t?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
const user=()=>W._Ba?._rJ?._O$?.ins,model=()=>W._Ba?._K_t?._Z7t?.ins;
// [VI dòng gốc 8] Khai báo biến không gán lại bằng const: own = tạo hàm với tham số (không có); mỗi lần gọi trả về actor&&actor===String(user()?.actorId??'') và chỉ đánh giá vế phải khi vế trái truthy: !W.__KVPV_UNIVERSAL_HALTED
const own=()=>actor&&actor===String(user()?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;
// [VI dòng gốc 9] Khai báo biến không gán lại bằng const: inside = tạo hàm với tham số (không có); mỗi lần gọi trả về Number(W._ft?._po?.ins?.getCfgById?.(Number(W._C?._Mn?._Cn?.currentID))?.[7])===71 và chỉ đánh giá vế phải khi vế trái truthy: Number(W._Ba?._$a?._yo?.ins?.intoSce?.[3])===9
const inside=()=>Number(W._ft?._po?.ins?.getCfgById?.(Number(W._C?._Mn?._Cn?.currentID))?.[7])===71&&Number(W._Ba?._$a?._yo?.ins?.intoSce?.[3])===9;
// [VI dòng gốc 10] Khai báo biến không gán lại bằng const: day = tạo hàm với tham số (không có); mỗi lần gọi trả về W.KVPV_DAILY_CLOCK?.key?.() hoặc dùng vế phải khi vế trái là null/undefined: new Date(Date.now()+7200000).toISOString().slice(0,10)
const day=()=>W.KVPV_DAILY_CLOCK?.key?.()??new Date(Date.now()+7200000).toISOString().slice(0,10);
// [VI dòng gốc 11] Định nghĩa hàm expected; tham số: không có | Kết thúc hàm hiện tại và trả về: áp dụng toán tử - lên 1.
function expected(){return -1;}
// [VI dòng gốc 12] Khai báo biến không gán lại bằng const: chestName = tạo hàm với tham số role; mỗi lần gọi trả về gọi /rương|ruong/.test(String(role?.property?.get?.('name')??'').toLocaleLowerCase('vi'))
const chestName=role=>/rương|ruong/.test(String(role?.property?.get?.('name')??'').toLocaleLowerCase('vi'));
// [VI dòng gốc 13] Khai báo biến không gán lại bằng const: observer = tạo đối tượng gồm
const observer={};
// [VI dòng gốc 14] Định nghĩa hàm ack; tham số: không có | Khai báo biến không gán lại bằng const: p = đọc S.pending | Kiểm tra !S.enabled||!own()||!inside()||!p||String(model()?.tNpcId)!==p.id: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
function ack(){const p=S.pending;if(!S.enabled||!own()||!inside()||!p||String(model()?.tNpcId)!==p.id)return;S.claimed.add(p.key);S.pending=null;S.confirmed++;S.reason='server_gather_confirmed';}
// [VI dòng gốc 15] Định nghĩa hàm tick; tham số: không có. Mục đích: xử lý một nhịp kiểm tra | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài.
function tick(){try{
// [VI dòng gốc 16] Kiểm tra !S.enabled||!own(): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
if(!S.enabled||!own())return;
// [VI dòng gốc 17] Kiểm tra !S.listening&&typeof W._Sa?.notify?.on==='function': đúng thì chạy nhánh sau if. | gọi W._Sa.notify.on(5038, observer, ack) | gán S.listening bằng true
if(!S.listening&&typeof W._Sa?.notify?.on==='function'){W._Sa.notify.on(5038,observer,ack);S.listening=true;}
// [VI dòng gốc 18] Kiểm tra !inside(): đúng thì chạy nhánh sau if. | gán S.reason bằng 'waiting_floor9' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
if(!inside()){S.reason='waiting_floor9';return;}
// [VI dòng gốc 19] Khai báo biến không gán lại bằng const: key = tính biểu thức day()+'/eight-floor9' | Kiểm tra S.claimed.has(key): đúng thì chạy nhánh sau if. | gán S.reason bằng 'already_confirmed' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
const key=day()+'/eight-floor9';if(S.claimed.has(key)){S.reason='already_confirmed';return;}if(S.pending){S.reason='waiting_server_ack_no_retry';return;}
// [VI dòng gốc 20] Kiểm tra user()?.isDead!==false: đúng thì chạy nhánh sau if. | gán S.reason bằng 'waiting_revive' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
if(user()?.isDead!==false){S.reason='waiting_revive';return;}
// [VI dòng gốc 21] Khai báo biến không gán lại bằng const: occ = gọi expected()
const occ=expected();
// [VI dòng gốc 22] Kiểm tra model()?.gathering===true: đúng thì chạy nhánh sau if. | gán S.reason bằng 'native_gathering' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
if(model()?.gathering===true){S.reason='native_gathering';return;}
// [VI dòng gốc 23] Khai báo biến không gán lại bằng const: manager = đọc W._ft?._Y4n?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); panel = gọi manager?.getPanelById(166) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); id = đọc model()?.tNpcId nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); role = gọi W._C?._Ba?.instance?.getRole(id) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
const manager=W._ft?._Y4n?.ins,panel=manager?.getPanelById?.(166),id=model()?.tNpcId,role=W._C?._Ba?.instance?.getRole?.(id);
// [VI dòng gốc 24] Kiểm tra manager?.isOpened?.(166)===true&&panel?.parent&&panel.visible!==false&&String(panel._lhi)===String(id)&&chestName(role)&&typeof panel._tci==='function'&&Number(panel._sci)!==1: đúng thì chạy nhánh sau if.
if(manager?.isOpened?.(166)===true&&panel?.parent&&panel.visible!==false&&String(panel._lhi)===String(id)&&chestName(role)&&typeof panel._tci==='function'&&Number(panel._sci)!==1){
// [VI dòng gốc 25] Kiểm tra !S.listening: đúng thì chạy nhánh sau if. | gán S.reason bằng 'waiting_ack_observer' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
 if(!S.listening){S.reason='waiting_ack_observer';return;}
// [VI dòng gốc 26] gán S.pending bằng {key,id:String(id),occ,at:Date.now()} | tăng S.clicks một đơn vị sau khi lấy giá trị | gán S.reason bằng 'clicked_native_gather' | gọi panel._tci(); chức năng nội bộ chưa xác minh từ tên hàm
 S.pending={key,id:String(id),occ,at:Date.now()};S.clicks++;S.reason='clicked_native_gather';panel._tci();return;
// [VI dòng gốc 27] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 28] Kiểm tra Date.now()-S.lastSelect>=5000&&typeof user()?.selectTar==='function': đúng thì chạy nhánh sau if. | gán S.lastSelect bằng Date.now() | gọi user().selectTar(3, occ)
if(Date.now()-S.lastSelect>=5000&&typeof user()?.selectTar==='function'){S.lastSelect=Date.now();user().selectTar(3,occ);}
// [VI dòng gốc 29] gán S.reason bằng 'moving_to_chest_waiting_native_panel'
S.reason='moving_to_chest_waiting_native_panel';
// [VI dòng gốc 30] Nhận lỗi bằng e và chạy phần xử lý lỗi. | gán S.error bằng String(e.message||e) | gán S.reason bằng 'error_no_retry'
}catch(e){S.error=String(e.message||e);S.reason='error_no_retry';}}
// [VI dòng gốc 31] Định nghĩa hàm stop; tham số: không có. Mục đích: dừng bộ điều khiển và dọn tài nguyên | gán S.enabled bằng false | Kiểm tra S.timer!==null: đúng thì chạy nhánh sau if. | gọi W.KVPV_V1?.timers?.clearInterval??W.clearInterval(S.timer)
function stop(){S.enabled=false;if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;if(S.listening)W._Sa?.notify?.off?.(5038,observer,ack);S.listening=false;}
// [VI dòng gốc 32] gán W.KVPV_EIGHT_CHEST bằng Object.freeze({sync:tick,stop,status:()=>({enabled:S.enabled,inside:inside(),reason:S.reason,lastError:S.error,pending:S.pending,clicks:S.clicks,confirmed:S.confirmed,doneToday:S.c…
W.KVPV_EIGHT_CHEST=Object.freeze({sync:tick,stop,status:()=>({enabled:S.enabled,inside:inside(),reason:S.reason,lastError:S.error,pending:S.pending,clicks:S.clicks,confirmed:S.confirmed,doneToday:S.claimed.has(day()+'/eight-floor9'),npcSelection:'native_nearest_chest_name_verified'}),_handoff:()=>({actor,pending:S.pending,claimed:[...S.claimed],clicks:S.clicks,confirmed:S.confirmed})});
// [VI dòng gốc 33] gán S.timer bằng (W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,500) | gọi tick() để xử lý một nhịp kiểm tra
S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,500);tick();
// [VI dòng gốc 34] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: })();
})();
// [VI dòng gốc 35] Dòng trống để tách các phần, không có lệnh thực thi.
