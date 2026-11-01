// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: Kiếm Khiếu Quần Hùng: báo danh, vào đấu và nhận mốc sát thương bằng API native. [đóng chú thích]
/* Kiếm Khiếu Quần Hùng: báo danh, vào đấu và nhận mốc sát thương bằng API native. */
// [VI dòng gốc 2] chạy ngay hàm bao để tạo phạm vi và khởi tạo phần chức năng bên trong
(() => {
// [VI dòng gốc 3] "use strict" | Khai báo biến không gán lại bằng const: W = window; old = đọc W.KVPV_KIEM_KHIEU; c = gọi old?._handoff(); chức năng nội bộ chưa xác minh từ tên hàm (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gọi old?.stop() để dừng bộ điều khiển và dọn tài nguyên (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
 'use strict';const W=window,old=W.KVPV_KIEM_KHIEU,c=old?._handoff?.();old?.stop?.();
// [VI dòng gốc 4] Khai báo biến không gán lại bằng const: actor = gọi String(W.__KVPV_OWN_ACTOR_ID||'') để chuyển sang chuỗi; storage = tính biểu thức 'kvpv.kiem-khieu.v1.'+actor
 const actor=String(W.__KVPV_OWN_ACTOR_ID||''),storage='kvpv.kiem-khieu.v1.'+actor;
// [VI dòng gốc 5] Khai báo biến có thể gán lại bằng let: attempts = nếu c?.actor===actor thì lấy c.attempts, ngược lại lấy {}
 let attempts=c?.actor===actor?c.attempts:{};
// [VI dòng gốc 6] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | Khai báo biến không gán lại bằng const: saved = gọi JSON.parse(W.localStorage?.getItem(storage)||'{}') để phân tích dữ liệu đầu vào theo API đang gọi | Kiểm tra saved&&typeof saved==='object'&&!Array.isArray(saved): đúng thì chạy nhánh sau if. | gán attempts bằng {...saved,...attempts}
 try{const saved=JSON.parse(W.localStorage?.getItem(storage)||'{}');if(saved&&typeof saved==='object'&&!Array.isArray(saved))attempts={...saved,...attempts};}catch(_){}
// [VI dòng gốc 7] Khai báo biến không gán lại bằng const: S = tạo đối tượng gồm enabled, timer, reason, error, pending, window, registered, inside, claimed
 const S={enabled:true,timer:null,reason:'waiting_server_window',error:'',pending:null,window:null,registered:false,inside:false,claimed:0};
// [VI dòng gốc 8] Khai báo biến không gán lại bằng const: own = tạo hàm với tham số (không có); mỗi lần gọi trả về actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'') và chỉ đánh giá vế phải khi vế trái truthy: !W.__KVPV_UNIVERSAL_HALTED
 const own=()=>actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;
// [VI dòng gốc 9] Khai báo biến không gán lại bằng const: model = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._Ba?._T_t?._k_t?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
 const model=()=>W._Ba?._T_t?._k_t?.ins;
// [VI dòng gốc 10] Định nghĩa hàm once; tham số: key, fn | Kiểm tra attempts[key]: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: false. | gán attempts[key] bằng Date.now()
 function once(key,fn){if(attempts[key])return false;attempts[key]=Date.now();const rows=Object.entries(attempts).slice(-150);attempts=Object.fromEntries(rows);try{W.localStorage?.setItem(storage,JSON.stringify(attempts));}catch(_){}S.pending=key;fn();return true;}
// [VI dòng gốc 11] Định nghĩa hàm idle; tham số: không có | Khai báo biến không gán lại bằng const: q = gọi W.KVPV_DAILY?.quickState() (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); s = gọi W.KVPV?.core?.scene?.status() để trả trạng thái để kiểm tra (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Kết thúc hàm hiện tại và trả về: q?.running===true&&['rảnh','ranh'].includes(q.job)&&!s?.owner&&W.KVPV_HITRUN1?.status?.(false)?.running!==true&& W._Ba?._$a?.SceneUtil?.isCommonScene===true&&W._Ba?._$a?._yo?.ins?.… và chỉ đánh giá vế phải khi vế trái truthy: W._Ba?._cm?._q3t?.ins?.getHasTeams?.()!==true.
 function idle(){const q=W.KVPV_DAILY?.quickState?.(),s=W.KVPV?.core?.scene?.status?.();return q?.running===true&&['rảnh','ranh'].includes(q.job)&&!s?.owner&&W.KVPV_HITRUN1?.status?.(false)?.running!==true&&
// [VI dòng gốc 12] gọi W._Ba?._cm?._q3t?.ins?.getHasTeams()
  W._Ba?._$a?.SceneUtil?.isCommonScene===true&&W._Ba?._$a?._yo?.ins?.isInMission===false&&W._Ba?._cm?._q3t?.ins?.getHasTeams?.()!==true;}
// [VI dòng gốc 13] Định nghĩa hàm tick; tham số: không có. Mục đích: xử lý một nhịp kiểm tra | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài.
 function tick(){try{
// [VI dòng gốc 14] Kiểm tra !S.enabled||!own(): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  if(!S.enabled||!own())return;
// [VI dòng gốc 15] Khai báo biến không gán lại bằng const: m = gọi model(); rpc = đọc W._Ba?._T_t?._O3n?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); now = gọi Number(W._Sa?.svrTime) để chuyển sang số; state = gọi m?.getSceneState1() (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  const m=model(),rpc=W._Ba?._T_t?._O3n?.ins,now=Number(W._Sa?.svrTime),state=m?.getSceneState1?.();
// [VI dòng gốc 16] gán S.inside bằng Number(W._ft?._po?.ins?.getCfgById?.(Number(W._C?._Mn?._Cn?.currentID))?.[7])===84
  S.inside=Number(W._ft?._po?.ins?.getCfgById?.(Number(W._C?._Mn?._Cn?.currentID))?.[7])===84;
// [VI dòng gốc 17] Kiểm tra !m||!Array.isArray(state)||!Number.isFinite(now)||now<=0: đúng thì chạy nhánh sau if. | gán S.reason bằng 'waiting_native_event_state' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  if(!m||!Array.isArray(state)||!Number.isFinite(now)||now<=0){S.reason='waiting_native_event_state';return;}
// [VI dòng gốc 18] Khai báo biến không gán lại bằng const: end = gọi Number(state[4]) để chuyển sang số | Kiểm tra !Number.isFinite(end)||end<=0: đúng thì chạy nhánh sau if. | gán S.reason bằng 'unknown_window' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  const end=Number(state[4]);if(!Number.isFinite(end)||end<=0){S.reason='unknown_window';return;}
// [VI dòng gốc 19] Khai báo biến không gán lại bằng const: day = W.KVPV_DAILY_CLOCK?.key?.() hoặc dùng vế phải khi vế trái là null/undefined: new Date().toISOString().slice(0,10); key = tính biểu thức day+'/'+end
  const day=W.KVPV_DAILY_CLOCK?.key?.()??new Date().toISOString().slice(0,10),key=day+'/'+end;
// [VI dòng gốc 20] gán S.window bằng key | Khai báo biến không gán lại bằng const: info = đọc m.enterInfo | gán S.registered bằng Array.isArray(info)&&Number(info[1])>0
  S.window=key;const info=m.enterInfo;S.registered=Array.isArray(info)&&Number(info[1])>0;
// [VI dòng gốc 21] Kiểm tra !Array.isArray(info): đúng thì chạy nhánh sau if. | Kiểm tra state[7]&&typeof m.reqInfo==='function': đúng thì chạy nhánh sau if. | gọi once(key+'/query', ()=>m.reqInfo(0,0)) | gán S.reason bằng 'waiting_enter_info'
  if(!Array.isArray(info)){if(state[7]&&typeof m.reqInfo==='function')once(key+'/query',()=>m.reqInfo(0,0));S.reason='waiting_enter_info';return;}
// [VI dòng gốc 22] Kiểm tra W._Ba?._rJ?._O$?.ins?.isDead!==false||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0): đúng thì chạy nhánh sau if. | gán S.reason bằng 'yield_user_or_dead' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  if(W._Ba?._rJ?._O$?.ins?.isDead!==false||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)){S.reason='yield_user_or_dead';return;}
// [VI dòng gốc 23] Chú thích gốc của tác giả; không được thực thi. Nội dung: Không suy đoán phần thưởng: chỉ nhận hàng native đủ điểm và chưa nằm trong danh sách đã nhận.
  // Không suy đoán phần thưởng: chỉ nhận hàng native đủ điểm và chưa nằm trong danh sách đã nhận.
// [VI dòng gốc 24] Khai báo biến không gán lại bằng const: rewards = gọi W._ft?._UAh?.ins?.getRewardCfgByType(1) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); damage = gọi Number(info[2]) để chuyển sang số; received = đọc info[3]
  const rewards=W._ft?._UAh?.ins?.getRewardCfgByType?.(1),damage=Number(info[2]),received=info[3];
// [VI dòng gốc 25] Kiểm tra Array.isArray(rewards)&&Number.isFinite(damage)&&Array.isArray(received)&&typeof rpc?.reqHurtReward==='function': đúng thì chạy nhánh sau if.
  if(Array.isArray(rewards)&&Number.isFinite(damage)&&Array.isArray(received)&&typeof rpc?.reqHurtReward==='function'){
// [VI dòng gốc 26] Khai báo biến không gán lại bằng const: row = gọi rewards.find(r=>Array.isArray(r)&&Number.isSafeInteger(r[0])&&Number.isFinite(r[2])&&r[2]<=damage&&!received.includes(r[0])&&!attempt…) để tìm phần tử đầu tiên thỏa điều kiện
   const row=rewards.find(r=>Array.isArray(r)&&Number.isSafeInteger(r[0])&&Number.isFinite(r[2])&&r[2]<=damage&&!received.includes(r[0])&&!attempts[key+'/reward/'+r[0]]);
// [VI dòng gốc 27] Kiểm tra row: đúng thì chạy nhánh sau if. | gọi once(key+'/reward/'+row[0], ()=>rpc.reqHurtReward(row[0])) | gán S.reason bằng 'reward_requested_wait_server' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
   if(row){once(key+'/reward/'+row[0],()=>rpc.reqHurtReward(row[0]));S.reason='reward_requested_wait_server';return;}
// [VI dòng gốc 28] gán S.claimed bằng received.length
   S.claimed=received.length;
// [VI dòng gốc 29] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 30] Kiểm tra S.inside: đúng thì chạy nhánh sau if. | gán S.reason bằng 'inside_native_combat' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  if(S.inside){S.reason='inside_native_combat';return;}
// [VI dòng gốc 31] Chú thích gốc của tác giả; không được thực thi. Nội dung: Lôi chủ ở dã ngoại để server tự đưa vào vòng đấu; không bỏ phiếu/cược tài nguyên.
  // Lôi chủ ở dã ngoại để server tự đưa vào vòng đấu; không bỏ phiếu/cược tài nguyên.
// [VI dòng gốc 32] Kiểm tra m.isChampion===true&&[1,2,3].includes(Number(m.stageStat)): đúng thì chạy nhánh sau if.
  if(m.isChampion===true&&[1,2,3].includes(Number(m.stageStat))){
// [VI dòng gốc 33] Kiểm tra idle()&&m.keepOutSize===false&&typeof rpc?.reqKeepOutSize==='function': đúng thì chạy nhánh sau if. | gọi once(day+'/keep-champion', ()=>rpc.reqKeepOutSize(1))
   if(idle()&&m.keepOutSize===false&&typeof rpc?.reqKeepOutSize==='function')once(day+'/keep-champion',()=>rpc.reqKeepOutSize(1));
// [VI dòng gốc 34] gán S.reason bằng 'champion_wait_native_round' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
   S.reason='champion_wait_native_round';return;
// [VI dòng gốc 35] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 36] Kiểm tra !state[7]||Number(m.stageStat)!==0: đúng thì chạy nhánh sau if. | gán S.reason bằng 'waiting_open_elimination' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  if(!state[7]||Number(m.stageStat)!==0){S.reason='waiting_open_elimination';return;}
// [VI dòng gốc 37] Kiểm tra !idle(): đúng thì chạy nhánh sau if. | gán S.reason bằng 'yield_current_activity' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  if(!idle()){S.reason='yield_current_activity';return;}
// [VI dòng gốc 38] Kiểm tra end>now: đúng thì chạy nhánh sau if.
  if(end>now){
// [VI dòng gốc 39] Kiểm tra Number(info[1])===0&&typeof W._Ba?._a2t?._P3n?.ins?.c2sName==='function': đúng thì chạy nhánh sau if, sai thì chạy nhánh else.
   if(Number(info[1])===0&&typeof W._Ba?._a2t?._P3n?.ins?.c2sName==='function'){
// [VI dòng gốc 40] gọi once(key+'/register', ()=>W._Ba._a2t._P3n.ins.c2sName(1581))
    once(key+'/register',()=>W._Ba._a2t._P3n.ins.c2sName(1581));
// [VI dòng gốc 41] Chú thích gốc của tác giả; không được thực thi. Nội dung: Một lần đọc lại, không lặp báo danh khi ACK chưa rõ.
    // Một lần đọc lại, không lặp báo danh khi ACK chưa rõ.
// [VI dòng gốc 42] Kiểm tra typeof m.reqInfo==='function': đúng thì chạy nhánh sau if. | gọi once(key+'/register-query', ()=>m.reqInfo(0,0))
    if(typeof m.reqInfo==='function')once(key+'/register-query',()=>m.reqInfo(0,0));
// [VI dòng gốc 43] gán S.reason bằng 'registration_requested_wait_server'
    S.reason='registration_requested_wait_server';
// [VI dòng gốc 44] gán S.reason bằng 'registered_wait_entry_time'
   }else S.reason='registered_wait_entry_time';
// [VI dòng gốc 45] Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
   return;
// [VI dòng gốc 46] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 47] Kiểm tra Number(state[2])===2&&S.registered&&Number(m.matchCd)>0&&typeof W._Ba?._sst?._Cht?.inst?.rqEtScene==='function': đúng thì chạy nhánh sau if, sai thì chạy nhánh else.
  if(Number(state[2])===2&&S.registered&&Number(m.matchCd)>0&&typeof W._Ba?._sst?._Cht?.inst?.rqEtScene==='function'){
// [VI dòng gốc 48] gọi once(key+'/enter', ()=>W._Ba._sst._Cht.inst.rqEtScene(8501,1)) | gán S.reason bằng 'entry_requested_wait_server'
   once(key+'/enter',()=>W._Ba._sst._Cht.inst.rqEtScene(8501,1));S.reason='entry_requested_wait_server';
// [VI dòng gốc 49] gán S.reason bằng 'waiting_native_match'
  }else S.reason='waiting_native_match';
// [VI dòng gốc 50] Nhận lỗi bằng e và chạy phần xử lý lỗi. | gán S.error bằng String(e.message||e) | gán S.reason bằng 'error_no_replay'
 }catch(e){S.error=String(e.message||e);S.reason='error_no_replay';}}
// [VI dòng gốc 51] Định nghĩa hàm stop; tham số: không có. Mục đích: dừng bộ điều khiển và dọn tài nguyên | gán S.enabled bằng false | Kiểm tra S.timer!==null: đúng thì chạy nhánh sau if. | gọi W.KVPV_V1?.timers?.clearInterval??W.clearInterval(S.timer)
 function stop(){S.enabled=false;if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;}
// [VI dòng gốc 52] gán W.KVPV_KIEM_KHIEU bằng Object.freeze({sync:tick,stop,status:()=>({enabled:S.enabled,reason:S.reason,lastError:S.error,window:S.window,registered:S.registered,inside:S.inside,claimed:S.claimed,pending:S.p…
 W.KVPV_KIEM_KHIEU=Object.freeze({sync:tick,stop,status:()=>({enabled:S.enabled,reason:S.reason,lastError:S.error,window:S.window,registered:S.registered,inside:S.inside,claimed:S.claimed,pending:S.pending,nativeCombat:true}),_handoff:()=>({actor,attempts:{...attempts}})});
// [VI dòng gốc 53] gán S.timer bằng (W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,1000) | gọi tick() để xử lý một nhịp kiểm tra
 {const schedule=W.KVPV_V1?.timers?.setInterval??W.setInterval;if(typeof schedule==='function')S.timer=schedule(tick,1000);}tick();
// [VI dòng gốc 54] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: })();
})();
// [VI dòng gốc 55] Dòng trống để tách các phần, không có lệnh thực thi.
