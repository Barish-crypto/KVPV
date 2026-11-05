// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: Daily zero-price Phuc Menh/Tuyet shop gift; never opens or consumes the bag. [đóng chú thích]
/* Daily zero-price Phuc Menh/Tuyet shop gift; never opens or consumes the bag. */
// [VI dòng gốc 2] chạy ngay hàm bao để tạo phạm vi và khởi tạo phần chức năng bên trong
(() => {
// [VI dòng gốc 3] "use strict" | Khai báo biến không gán lại bằng const: W = window; old = đọc W.KVPV_FREE_DAILY_BAG; c = gọi old?._handoff(); chức năng nội bộ chưa xác minh từ tên hàm (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gọi old?.stop() để dừng bộ điều khiển và dọn tài nguyên (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
 'use strict';const W=window,old=W.KVPV_FREE_DAILY_BAG,c=old?._handoff?.();old?.stop?.();
// [VI dòng gốc 4] Khai báo biến không gán lại bằng const: actor = gọi String(W.__KVPV_OWN_ACTOR_ID||'') để chuyển sang chuỗi; same = tính biểu thức c?.actor===actor
 const actor=String(W.__KVPV_OWN_ACTOR_ID||''),same=c?.actor===actor;
// [VI dòng gốc 5] Khai báo biến không gán lại bằng const: S = tạo đối tượng gồm enabled, timer, pending, confirmed, reason, error, matches
 const S={enabled:true,timer:null,pending:same?c.pending:null,confirmed:same?c.confirmed:0,reason:'waiting',error:'',matches:[]};
// [VI dòng gốc 6] Khai báo biến không gán lại bằng const: shop = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._Ba?._Iwt?._Dwt?.instance nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); cfg = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._ft?._AY?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
 const shop=()=>W._Ba?._Iwt?._Dwt?.instance,cfg=()=>W._ft?._AY?.ins;
// [VI dòng gốc 7] Khai báo biến không gán lại bằng const: own = tạo hàm với tham số (không có); mỗi lần gọi trả về actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'') và chỉ đánh giá vế phải khi vế trái truthy: !W.__KVPV_UNIVERSAL_HALTED
 const own=()=>actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;
// [VI dòng gốc 8] Khai báo biến có thể gán lại bằng let: targetIds = null
 let targetIds=null;
// [VI dòng gốc 9] Khai báo biến không gán lại bằng const: norm = tạo hàm với tham số s; mỗi lần gọi trả về gọi String(s??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase()
 const norm=s=>String(s??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
// [VI dòng gốc 10] Định nghĩa hàm candidates; tham số: không có | Khai báo biến không gán lại bằng const: out = tạo mảng gồm 0 vị trí: []; table = đọc cfg()?._PY nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
 function candidates(){const out=[],table=cfg()?._PY;
// [VI dòng gốc 11] Kiểm tra !table: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: out.
  if(!table)return out;
// [VI dòng gốc 12] Kiểm tra targetIds===null: đúng thì chạy nhánh sau if. | Khai báo biến không gán lại bằng const: rows = gọi Object.values(table).slice(0, 20000) để lấy một đoạn dữ liệu | Kiểm tra !rows.length: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: out.
  if(targetIds===null){const rows=Object.values(table).slice(0,20000);if(!rows.length)return out;
// [VI dòng gốc 13] gán targetIds bằng rows.filter(r=>{if(!Array.isArray(r))return false;const n=norm(W._ft?._mY?.ins?.getItemCfgById?.(r[1])?.[1]);return /tui\s*phuc\s*m[ae]nh/.test(n)&&n.includes('tuyet');}).map(r=>r[… | Kiểm tra !Array.isArray(r): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: false. | Khai báo biến không gán lại bằng const: n = gọi norm(W._ft?._mY?.ins?.getItemCfgById?.(r[1])?.[1])
   targetIds=rows.filter(r=>{if(!Array.isArray(r))return false;const n=norm(W._ft?._mY?.ins?.getItemCfgById?.(r[1])?.[1]);return /tui\s*phuc\s*m[ae]nh/.test(n)&&n.includes('tuyet');}).map(r=>r[0]);}
// [VI dòng gốc 14] Duyệt từng giá trị trong targetIds bằng const id. | Khai báo biến không gán lại bằng const: id (chưa gán giá trị) | Khai báo biến không gán lại bằng const: r = đọc table[id]
  for(const id of targetIds){const r=table[id];
// [VI dòng gốc 15] Kiểm tra !Array.isArray(r)||!Number.isSafeInteger(r[0])||!Number.isSafeInteger(r[1])||!Array.isArray(r[8])||r[8][1]!==0||r[9]?.[0]!==1||r[9]?.[1]!==1: đúng thì chạy nhánh sau if. | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
  if(!Array.isArray(r)||!Number.isSafeInteger(r[0])||!Number.isSafeInteger(r[1])||!Array.isArray(r[8])||r[8][1]!==0||r[9]?.[0]!==1||r[9]?.[1]!==1)continue;
// [VI dòng gốc 16] Khai báo biến không gán lại bằng const: name = đọc W._ft?._mY?.ins?.getItemCfgById?.(r[1])?.[1] nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); n = gọi norm(name)
  const name=W._ft?._mY?.ins?.getItemCfgById?.(r[1])?.[1],n=norm(name);
// [VI dòng gốc 17] Kiểm tra !/tui\s*phuc\s*m[ae]nh/.test(n)||!n.includes('tuyet'): đúng thì chạy nhánh sau if. | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
  if(!/tui\s*phuc\s*m[ae]nh/.test(n)||!n.includes('tuyet'))continue;
// [VI dòng gốc 18] Kiểm tra !(cfg()?.getCfgs?.(r[3],r[5])??[]).some(x=>x[0]===r[0]): đúng thì chạy nhánh sau if. | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
  if(!(cfg()?.getCfgs?.(r[3],r[5])??[]).some(x=>x[0]===r[0]))continue;
// [VI dòng gốc 19] Kiểm tra Number(r[16])>0&&W._Ba?._IY?._BY?.ins?.getActIsOpen?.(r[16])!==true: đúng thì chạy nhánh sau if. | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
  if(Number(r[16])>0&&W._Ba?._IY?._BY?.ins?.getActIsOpen?.(r[16])!==true)continue;
// [VI dòng gốc 20] Khai báo biến không gán lại bằng const: used = gọi shop()?.getCurBuyNum(r[0]) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); svip = đọc W._Ba?._ke?._Le?.instance?.curSvipLv nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  const used=shop()?.getCurBuyNum?.(r[0]),svip=W._Ba?._ke?._Le?.instance?.curSvipLv;
// [VI dòng gốc 21] Kiểm tra !Number.isSafeInteger(used)||used<0||used>=1||!Number.isFinite(svip)||!Number.isFinite(r[10])||svip<r[10]: đúng thì chạy nhánh sau if. | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
  if(!Number.isSafeInteger(used)||used<0||used>=1||!Number.isFinite(svip)||!Number.isFinite(r[10])||svip<r[10])continue;
// [VI dòng gốc 22] Khai báo biến không gán lại bằng const: required = gọi Number(r[24]??0) để chuyển sang số; rise = đọc W._Ba?._$qt?._tKt?.ins?.curLV nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  const required=Number(r[24]??0),rise=W._Ba?._$qt?._tKt?.ins?.curLV;
// [VI dòng gốc 23] Kiểm tra required>0&&(!Number.isFinite(rise)||rise<required): đúng thì chạy nhánh sau if. | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
  if(required>0&&(!Number.isFinite(rise)||rise<required))continue;
// [VI dòng gốc 24] gọi out.push({id:r[0],itemId:r[1],name,used,price:0}) để thêm phần tử vào cuối mảng
  out.push({id:r[0],itemId:r[1],name,used,price:0});
// [VI dòng gốc 25] Kết thúc hàm hiện tại và trả về: out.
 }return out;}
// [VI dòng gốc 26] Định nghĩa hàm sync; tham số: không có | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | Kiểm tra !S.enabled||!own(): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
 function sync(){try{if(!S.enabled||!own())return;
// [VI dòng gốc 27] Kiểm tra S.pending: đúng thì chạy nhánh sau if. | Khai báo biến không gán lại bằng const: count = gọi shop()?.getCurBuyNum(S.pending.id) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Kiểm tra Number.isSafeInteger(count)&&count>S.pending.used: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | tăng S.confirmed một đơn vị sau khi lấy giá trị
  if(S.pending){const count=shop()?.getCurBuyNum?.(S.pending.id);if(Number.isSafeInteger(count)&&count>S.pending.used){S.confirmed++;S.pending=null;}
// [VI dòng gốc 28] gán S.reason bằng Date.now()-S.pending.at>10000?'waiting_ack_no_retry':'waiting_server' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
   else {S.reason=Date.now()-S.pending.at>10000?'waiting_ack_no_retry':'waiting_server';return;}}
// [VI dòng gốc 29] gán S.matches bằng candidates()
  S.matches=candidates();
// [VI dòng gốc 30] Kiểm tra !S.matches.length: đúng thì chạy nhánh sau if. | gán S.reason bằng 'no_verified_free_bag' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  if(!S.matches.length){S.reason='no_verified_free_bag';return;}
// [VI dòng gốc 31] Kiểm tra W._Ba?._$a?.SceneUtil?.isCommonScene!==true||W._Ba?._$a?._yo?.ins?.isInMission!==false||W._Ba?._rJ?._O$?.ins?.isDead!==false|| Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)||W.KVPV?…: đúng thì chạy nhánh sau if.
  if(W._Ba?._$a?.SceneUtil?.isCommonScene!==true||W._Ba?._$a?._yo?.ins?.isInMission!==false||W._Ba?._rJ?._O$?.ins?.isDead!==false||
// [VI dòng gốc 32] gán S.reason bằng 'waiting_idle' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)||W.KVPV?.core?.scene?.status?.()?.owner||W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true){S.reason='waiting_idle';return;}
// [VI dòng gốc 33] Kiểm tra W.KVPV_FREE_TREASURE?.busy?.(): đúng thì chạy nhánh sau if. | gán S.reason bằng 'waiting_free_treasure' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  if(W.KVPV_FREE_TREASURE?.busy?.()){S.reason='waiting_free_treasure';return;}
// [VI dòng gốc 34] Khai báo biến không gán lại bằng const: q = đọc candidates()[0]; rpc = đọc W._Ba?._Iwt?._rLt?.instance nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  const q=candidates()[0],rpc=W._Ba?._Iwt?._rLt?.instance;
// [VI dòng gốc 35] Kiểm tra !q||typeof rpc?._uLt!=='function': đúng thì chạy nhánh sau if. | gán S.reason bằng 'waiting_native_api' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  if(!q||typeof rpc?._uLt!=='function'){S.reason='waiting_native_api';return;}
// [VI dòng gốc 36] gán S.pending bằng {id:q.id,itemId:q.itemId,used:q.used,at:Date.now()} | gán S.reason bằng 'sent_free_bag' | gọi rpc._uLt(q.id, 1); chức năng nội bộ chưa xác minh từ tên hàm
  S.pending={id:q.id,itemId:q.itemId,used:q.used,at:Date.now()};S.reason='sent_free_bag';rpc._uLt(q.id,1);
// [VI dòng gốc 37] Nhận lỗi bằng e và chạy phần xử lý lỗi. | gán S.error bằng String(e?.message||e) | gán S.reason bằng 'error_no_retry'
 }catch(e){S.error=String(e?.message||e);S.reason='error_no_retry';}}
// [VI dòng gốc 38] Định nghĩa hàm stop; tham số: không có. Mục đích: dừng bộ điều khiển và dọn tài nguyên | gán S.enabled bằng false | Kiểm tra S.timer!==null: đúng thì chạy nhánh sau if. | gọi W.KVPV_V1?.timers?.clearInterval??W.clearInterval(S.timer)
 function stop(){S.enabled=false;if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;}
// [VI dòng gốc 39] gán W.KVPV_FREE_DAILY_BAG bằng Object.freeze({sync,stop,status:()=>({enabled:S.enabled,reason:S.reason,pending:S.pending?{...S.pending}:null,confirmed:S.confirmed,matches:S.matches.map(x=>({...x})),lastError:S.e…
 W.KVPV_FREE_DAILY_BAG=Object.freeze({sync,stop,status:()=>({enabled:S.enabled,reason:S.reason,pending:S.pending?{...S.pending}:null,confirmed:S.confirmed,matches:S.matches.map(x=>({...x})),lastError:S.error,allowKNB:false}),
// [VI dòng gốc 40] Thuộc tính _handoff: tạo hàm với tham số (không có); mỗi lần gọi trả về tạo đối tượng gồm actor, pending, confirmed | Thuộc tính actor: dùng biến cùng tên | Thuộc tính pending: đọc S.pending | Thuộc tính confirmed: đọc S.confirmed
  _handoff:()=>({actor,pending:S.pending,confirmed:S.confirmed})});
// [VI dòng gốc 41] gán S.timer bằng (W.KVPV_V1?.timers?.setInterval??W.setInterval)(sync,1000) | gọi sync()
 S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(sync,1000);sync();
// [VI dòng gốc 42] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: })();
})();
// [VI dòng gốc 43] Dòng trống để tách các phần, không có lệnh thực thi.
