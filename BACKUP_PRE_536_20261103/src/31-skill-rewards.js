// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: Native Skill Handbook reward: _tYt._hYt._NCt rows [id,state,...].
/* Native Skill Handbook reward: _tYt._hYt._NCt rows [id,state,...].
 * UI _Kns claims only 0 < state <= 1 with GetSkillHandbookInfoReward(id).
 * Includes active/passive/holy categories; never opens a locked skill source. */
// [VI dòng gốc 4] chạy ngay hàm bao để tạo phạm vi và khởi tạo phần chức năng bên trong
(() => {
// [VI dòng gốc 5] "use strict"
  'use strict';
// [VI dòng gốc 6] Khai báo biến không gán lại bằng const: W = window; old = đọc W.KVPV_SKILL_REWARDS; carry = gọi old?._handoff(); chức năng nội bộ chưa xác minh từ tên hàm (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gọi old?.stop('reload') để dừng bộ điều khiển và dọn tài nguyên (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  const W=window,old=W.KVPV_SKILL_REWARDS,carry=old?._handoff?.();old?.stop?.('reload');
// [VI dòng gốc 7] Khai báo biến không gán lại bằng const: actor = gọi String(W.__KVPV_OWN_ACTOR_ID||'') để chuyển sang chuỗi; same = tính biểu thức carry?.actor===actor; id = "skill_handbook_rewards"
  const actor=String(W.__KVPV_OWN_ACTOR_ID||''),same=carry?.actor===actor,id='skill_handbook_rewards';
// [VI dòng gốc 8] Khai báo biến không gán lại bằng const: S = tạo đối tượng gồm enabled, timer, registered, pending, requests, confirmed, reason, lastError
  const S={enabled:true,timer:null,registered:false,pending:same?carry.pending:null,
// [VI dòng gốc 9] Thuộc tính requests: nếu same thì lấy carry.requests, ngược lại lấy 0 | Thuộc tính confirmed: nếu same thì lấy carry.confirmed, ngược lại lấy 0 | Thuộc tính reason: "waiting_model" | Thuộc tính lastError: ""
    requests:same?carry.requests:0,confirmed:same?carry.confirmed:0,reason:'waiting_model',lastError:''};
// [VI dòng gốc 10] Khai báo biến không gán lại bằng const: model = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._Ba?._tYt?._hYt?.inst nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); rpc = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._Ba?._tYt?._aYt?.inst nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  const model=()=>W._Ba?._tYt?._hYt?.inst,rpc=()=>W._Ba?._tYt?._aYt?.inst;
// [VI dòng gốc 11] Khai báo biến không gán lại bằng const: owned = tạo hàm với tham số (không có); mỗi lần gọi trả về actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'') và chỉ đánh giá vế phải khi vế trái truthy: !W.__KVPV_UNIVERSAL_HALTED
  const owned=()=>actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;
// [VI dòng gốc 12] Định nghĩa hàm ready; tham số: không có
  function ready(){
// [VI dòng gốc 13] Khai báo biến không gán lại bằng const: m = gọi model(); keys = đọc m?._NCt?.keys nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Kiểm tra !Array.isArray(keys): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: tạo mảng gồm 0 vị trí: [].
    const m=model(),keys=m?._NCt?.keys;if(!Array.isArray(keys))return [];
// [VI dòng gốc 14] Kết thúc hàm hiện tại và trả về: gọi keys.map(key=>m.getInfoById?.(key)).filter(r=>Array.isArray(r)&&Number.isSafeInteger(Number(r[0]))&&Number(r[0])>0&&Number(r[1])>0&&Number(r[1])<=1) .map(r=>({id:Number(r[0]),state:Number(r[1])})) để biến đổi từng phần tử.
    return keys.map(key=>m.getInfoById?.(key)).filter(r=>Array.isArray(r)&&Number.isSafeInteger(Number(r[0]))&&Number(r[0])>0&&Number(r[1])>0&&Number(r[1])<=1)
// [VI dòng gốc 15] Thuộc tính id: gọi Number(r[0]) để chuyển sang số | Thuộc tính state: gọi Number(r[1]) để chuyển sang số
      .map(r=>({id:Number(r[0]),state:Number(r[1])}));
// [VI dòng gốc 16] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 17] Định nghĩa hàm observe; tham số: không có | Kiểm tra !S.pending: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  function observe(){if(!S.pending)return;
// [VI dòng gốc 18] Khai báo biến không gán lại bằng const: row = gọi model()?.getInfoById(S.pending.id) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const row=model()?.getInfoById?.(S.pending.id);
// [VI dòng gốc 19] Kiểm tra Array.isArray(row)&&Number(row[1])>=2: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | tăng S.confirmed một đơn vị sau khi lấy giá trị | gán S.pending bằng null | gán S.reason bằng 'server_reward_claimed'
    if(Array.isArray(row)&&Number(row[1])>=2){S.confirmed++;S.pending=null;S.reason='server_reward_claimed';}
// [VI dòng gốc 20] gán S.reason bằng Date.now()-S.pending.at>30000?'waiting_reward_ack_no_retry':'waiting_reward_ack'
    else S.reason=Date.now()-S.pending.at>30000?'waiting_reward_ack_no_retry':'waiting_reward_ack';
// [VI dòng gốc 21] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 22] Định nghĩa hàm probe; tham số: không có
  function probe(){
// [VI dòng gốc 23] Kiểm tra !S.enabled||!owned(): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm ready. | gọi observe()
    if(!S.enabled||!owned())return {ready:false};observe();
// [VI dòng gốc 24] Kiểm tra S.pending||W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true||typeof rpc()?.GetSkillHandbookInfoReward!=='function': đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm ready.
    if(S.pending||W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true||typeof rpc()?.GetSkillHandbookInfoReward!=='function')return {ready:false};
// [VI dòng gốc 25] Khai báo biến không gán lại bằng const: q = đọc ready()[0] | Kết thúc hàm hiện tại và trả về: nếu q thì lấy {ready:true,signature:q.id+':'+q.state,id:q.id}, ngược lại lấy {ready:false}.
    const q=ready()[0];return q?{ready:true,signature:q.id+':'+q.state,id:q.id}:{ready:false};
// [VI dòng gốc 26] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 27] Định nghĩa hàm run; tham số: before | Khai báo biến không gán lại bằng const: q = gọi probe() | Kiểm tra !q.ready||q.signature!==before.signature: đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('Skill reward state changed')
  function run(before){const q=probe();if(!q.ready||q.signature!==before.signature)throw Error('Skill reward state changed');
// [VI dòng gốc 28] gán S.pending bằng {id:q.id,at:Date.now()} | tăng S.requests một đơn vị sau khi lấy giá trị | gán S.reason bằng 'native_reward_sent'
    S.pending={id:q.id,at:Date.now()};S.requests++;S.reason='native_reward_sent';
// [VI dòng gốc 29] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | gọi rpc().GetSkillHandbookInfoReward(q.id) | Nhận lỗi bằng e và chạy phần xử lý lỗi. | gán S.lastError bằng String(e)
    try{rpc().GetSkillHandbookInfoReward(q.id);}catch(e){S.lastError=String(e);throw e;}
// [VI dòng gốc 30] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 31] Định nghĩa hàm sync; tham số: không có | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | Kiểm tra !S.enabled: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  function sync(){try{if(!S.enabled)return;if(!owned()){stop();return;}observe();
// [VI dòng gốc 32] Kiểm tra !S.pending: đúng thì chạy nhánh sau if. | gán S.reason bằng ready().length?'waiting_shared_claim_queue':'waiting_unclaimed_skill'
    if(!S.pending)S.reason=ready().length?'waiting_shared_claim_queue':'waiting_unclaimed_skill';
// [VI dòng gốc 33] Nhận lỗi bằng e và chạy phần xử lý lỗi. | gán S.lastError bằng String(e)
  }catch(e){S.lastError=String(e);}}
// [VI dòng gốc 34] Định nghĩa hàm stop; tham số: không có. Mục đích: dừng bộ điều khiển và dọn tài nguyên | gán S.enabled bằng false | Kiểm tra S.timer!==null: đúng thì chạy nhánh sau if. | gọi W.KVPV_V1?.timers?.clearInterval??W.clearInterval(S.timer)
  function stop(){S.enabled=false;if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;
// [VI dòng gốc 35] Kiểm tra S.registered: đúng thì chạy nhánh sau if. | gọi W.KVPV_V8?.toggle(id, false) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    if(S.registered)W.KVPV_V8?.toggle?.(id,false);}
// [VI dòng gốc 36] Định nghĩa hàm start; tham số: không có. Mục đích: khởi động bộ điều khiển | Khai báo biến không gán lại bằng const: queue = đọc W.KVPV_V8 | Kiểm tra !queue?.register||!queue?.toggle: đúng thì chạy nhánh sau if. | gán S.reason bằng 'waiting_shared_queue'
  function start(){const queue=W.KVPV_V8;if(!queue?.register||!queue?.toggle){S.reason='waiting_shared_queue';return;}
// [VI dòng gốc 37] gán S.enabled bằng true | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | gọi queue.register({id,name:'Nhận thưởng kích hoạt kỹ năng',kind:'claim',verified:true,enabled:true, spend:'none',background:true,directDur…)
    S.enabled=true;try{queue.register({id,name:'Nhận thưởng kích hoạt kỹ năng',kind:'claim',verified:true,enabled:true,
// [VI dòng gốc 38] Thuộc tính spend: "none" | Thuộc tính background: true | Thuộc tính directDuringPve: true | Thuộc tính redIds: tạo mảng gồm 0 vị trí: []
      spend:'none',background:true,directDuringPve:true,redIds:[],hourlyLimit:60,cooldownMs:2000,
// [VI dòng gốc 39] Thuộc tính probe: tạo hàm với tham số (không có); mỗi lần gọi trả về W.KVPV_SKILL_REWARDS?._probe() hoặc dùng vế phải khi vế trái là null/undefined: {ready:false} | Thuộc tính ready: false | Thuộc tính run: tạo hàm với tham số p; mỗi lần gọi trả về gọi W.KVPV_SKILL_REWARDS?._run(p); chức năng nội bộ chưa xác minh từ tên hàm (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
      probe:()=>W.KVPV_SKILL_REWARDS?._probe()??{ready:false},run:p=>W.KVPV_SKILL_REWARDS?._run(p)});
// [VI dòng gốc 40] Nhận lỗi bằng e và chạy phần xử lý lỗi. | Kiểm tra !/Trung module ID|already exists/i.test(String(e)): đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: e
    }catch(e){if(!/Trung module ID|already exists/i.test(String(e)))throw e;}
// [VI dòng gốc 41] gọi queue.toggle(id, true) | gán S.registered bằng true
    queue.toggle(id,true);S.registered=true;
// [VI dòng gốc 42] Kiểm tra S.timer===null: đúng thì chạy nhánh sau if. | gán S.timer bằng (W.KVPV_V1?.timers?.setInterval??W.setInterval)(sync,500) | gọi sync()
    if(S.timer===null)S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(sync,500);sync();
// [VI dòng gốc 43] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 44] gán W.KVPV_SKILL_REWARDS bằng Object.freeze({start,stop,sync,_probe:probe,_run:run, status:()=>({enabled:S.enabled,actor,reason:S.reason,ready:ready(),pending:S.pending?{...S.pending}:null, requests:S.requests,…
  W.KVPV_SKILL_REWARDS=Object.freeze({start,stop,sync,_probe:probe,_run:run,
// [VI dòng gốc 45] Thuộc tính status: tạo hàm với tham số (không có); mỗi lần gọi trả về tạo đối tượng gồm enabled, actor, reason, ready, pending, requests, confirmed, lastError, allowKNB | Thuộc tính enabled: đọc S.enabled | Thuộc tính actor: dùng biến cùng tên | Thuộc tính reason: đọc S.reason
    status:()=>({enabled:S.enabled,actor,reason:S.reason,ready:ready(),pending:S.pending?{...S.pending}:null,
// [VI dòng gốc 46] Thuộc tính requests: đọc S.requests | Thuộc tính confirmed: đọc S.confirmed | Thuộc tính lastError: đọc S.lastError | Thuộc tính allowKNB: false
      requests:S.requests,confirmed:S.confirmed,lastError:S.lastError,allowKNB:false}),
// [VI dòng gốc 47] Thuộc tính _handoff: tạo hàm với tham số (không có); mỗi lần gọi trả về tạo đối tượng gồm actor, pending, requests, confirmed | Thuộc tính actor: dùng biến cùng tên | Thuộc tính pending: nếu S.pending thì lấy {...S.pending}, ngược lại lấy null | Thuộc tính requests: đọc S.requests
    _handoff:()=>({actor,pending:S.pending?{...S.pending}:null,requests:S.requests,confirmed:S.confirmed})});
// [VI dòng gốc 48] gọi start() để khởi động bộ điều khiển
  start();
// [VI dòng gốc 49] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: })();
})();
// [VI dòng gốc 50] Dòng trống để tách các phần, không có lệnh thực thi.
