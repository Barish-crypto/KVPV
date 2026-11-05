// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: Jiu Xiao Ling completed tasks: native state 1, never visits paid task targets. [đóng chú thích]
/* Jiu Xiao Ling completed tasks: native state 1, never visits paid task targets. */
// [VI dòng gốc 2] chạy ngay hàm bao để tạo phạm vi và khởi tạo phần chức năng bên trong
(() => {
// [VI dòng gốc 3] "use strict"
  'use strict';
// [VI dòng gốc 4] Khai báo biến không gán lại bằng const: W = window; old = đọc W.KVPV_SEASON_REWARDS; c = gọi old?._handoff(); chức năng nội bộ chưa xác minh từ tên hàm (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gọi old?.stop() để dừng bộ điều khiển và dọn tài nguyên (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  const W=window,old=W.KVPV_SEASON_REWARDS,c=old?._handoff?.();old?.stop?.();
// [VI dòng gốc 5] Khai báo biến không gán lại bằng const: actor = gọi String(W.__KVPV_OWN_ACTOR_ID||'') để chuyển sang chuỗi; same = tính biểu thức c?.actor===actor
  const actor=String(W.__KVPV_OWN_ACTOR_ID||''),same=c?.actor===actor;
// [VI dòng gốc 6] Khai báo biến không gán lại bằng const: S = tạo đối tượng gồm pending, requests, confirmed
  const S={pending:same?c.pending:null,requests:same?c.requests:0,confirmed:same?c.confirmed:0};
// [VI dòng gốc 7] Khai báo biến không gán lại bằng const: id = "season_completed_tasks"; model = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._Ba?._Je?._bJ?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  const id='season_completed_tasks',model=()=>W._Ba?._Je?._bJ?.ins;
// [VI dòng gốc 8] Khai báo biến không gán lại bằng const: owned = tạo hàm với tham số (không có); mỗi lần gọi trả về actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&actor và chỉ đánh giá vế phải khi vế trái truthy: !W.__KVPV_UNIVERSAL_HALTED
  const owned=()=>actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&actor&&!W.__KVPV_UNIVERSAL_HALTED;
// [VI dòng gốc 9] Khai báo biến không gán lại bằng const: rows = tạo hàm với tham số kind; mỗi lần gọi trả về model()?.[kind==='stage'?'stageTaskList':'seasonTaskList'] hoặc dùng vế phải khi vế trái là null/undefined: []
  const rows=kind=>model()?.[kind==='stage'?'stageTaskList':'seasonTaskList']??[];
// [VI dòng gốc 10] Định nghĩa hàm probe; tham số: không có | Kiểm tra !owned(): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm ready.
  function probe(){if(!owned())return {ready:false};
// [VI dòng gốc 11] Kiểm tra S.pending: đúng thì chạy nhánh sau if. | Khai báo biến không gán lại bằng const: p = đọc S.pending; r = gọi rows(p.kind).find(r=>Number(r._id)===p.id) để tìm phần tử đầu tiên thỏa điều kiện; m = gọi model()
    if(S.pending){const p=S.pending,r=rows(p.kind).find(r=>Number(r._id)===p.id),m=model();
// [VI dòng gốc 12] Kiểm tra p.kind==='level'?(Number(m?.jiuxiaolingHaveRewardLV)>p.free||Number(m?.jiuxiaolingHaveGoldenRewardLV)>p.gold):r&&(Number(r._state)===2||Number(r._curtimes)>p.times): đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gán S.pending bằng null | tăng S.confirmed một đơn vị sau khi lấy giá trị | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm ready.
      if(p.kind==='level'?(Number(m?.jiuxiaolingHaveRewardLV)>p.free||Number(m?.jiuxiaolingHaveGoldenRewardLV)>p.gold):r&&(Number(r._state)===2||Number(r._curtimes)>p.times)){S.pending=null;S.confirmed++;}else return {ready:false};
// [VI dòng gốc 13] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 14] Kiểm tra W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm ready.
    if(W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true)return {ready:false};
// [VI dòng gốc 15] Duyệt từng giá trị trong ['stage','season'] bằng const kind. | Khai báo biến không gán lại bằng const: kind (chưa gán giá trị) | Duyệt từng giá trị trong rows(kind).slice(0,200) bằng const r. | Khai báo biến không gán lại bằng const: r (chưa gán giá trị)
    for(const kind of ['stage','season'])for(const r of rows(kind).slice(0,200)){
// [VI dòng gốc 16] Khai báo biến không gán lại bằng const: taskId = gọi Number(r._id) để chuyển sang số; method = nếu kind==='stage' thì lấy 'getStageTaskReward', ngược lại lấy 'getSeasonTaskReward'
      const taskId=Number(r._id),method=kind==='stage'?'getStageTaskReward':'getSeasonTaskReward';
// [VI dòng gốc 17] Kiểm tra Number(r._state)!==1||!Number.isSafeInteger(taskId)||taskId<=0||typeof W._Ba?._Je?._Qe?.ins?.[method]!=='function': đúng thì chạy nhánh sau if. | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
      if(Number(r._state)!==1||!Number.isSafeInteger(taskId)||taskId<=0||typeof W._Ba?._Je?._Qe?.ins?.[method]!=='function')continue;
// [VI dòng gốc 18] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm ready, id, kind, method, times, signature.
      return {ready:true,id:taskId,kind,method,times:Number(r._curtimes)||0,signature:kind+'/'+taskId+'/'+r._curtimes+'/'+r._state};
// [VI dòng gốc 19] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 20] Khai báo biến không gán lại bằng const: m = gọi model(); level = gọi Number(m?.jiuxiaolingMyLevel) để chuyển sang số; free = gọi Number(m?.jiuxiaolingHaveRewardLV) để chuyển sang số; gold = gọi Number(m?.jiuxiaolingHaveGoldenRewardLV) để chuyển sang số
    const m=model(),level=Number(m?.jiuxiaolingMyLevel),free=Number(m?.jiuxiaolingHaveRewardLV),gold=Number(m?.jiuxiaolingHaveGoldenRewardLV);
// [VI dòng gốc 21] Kiểm tra Number.isSafeInteger(level)&&level>0&&Number.isSafeInteger(free)&&free>=0&&Number.isSafeInteger(gold)&&gold>=0&& (free<level||Number(m?.goldenState)>0&&gold<level)&&typeof W._Ba?._…: đúng thì chạy nhánh sau if.
    if(Number.isSafeInteger(level)&&level>0&&Number.isSafeInteger(free)&&free>=0&&Number.isSafeInteger(gold)&&gold>=0&&
// [VI dòng gốc 22] gọi Number(m?.goldenState) để chuyển sang số
      (free<level||Number(m?.goldenState)>0&&gold<level)&&typeof W._Ba?._Je?._Qe?.ins?.getJiuXiaoLingReward==='function')
// [VI dòng gốc 23] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm ready, kind, free, gold, signature.
      return {ready:true,kind:'level',free,gold,signature:'level/'+level+'/'+free+'/'+gold};
// [VI dòng gốc 24] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm ready.
    return {ready:false};
// [VI dòng gốc 25] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 26] Định nghĩa hàm run; tham số: before | Khai báo biến không gán lại bằng const: p = gọi probe() | Kiểm tra !p.ready||p.signature!==before.signature: đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('Task reward state changed')
  function run(before){const p=probe();if(!p.ready||p.signature!==before.signature)throw Error('Task reward state changed');
// [VI dòng gốc 27] gán S.pending bằng {id:p.id,kind:p.kind,times:p.times,free:p.free,gold:p.gold} | tăng S.requests một đơn vị sau khi lấy giá trị
    S.pending={id:p.id,kind:p.kind,times:p.times,free:p.free,gold:p.gold};S.requests++;
// [VI dòng gốc 28] Kiểm tra p.kind==='level': đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gọi W._Ba._Je._Qe.ins.getJiuXiaoLingReward() | gọi W._Ba._Je._Qe.ins[p.method](p.id)
    if(p.kind==='level')W._Ba._Je._Qe.ins.getJiuXiaoLingReward();else W._Ba._Je._Qe.ins[p.method](p.id);
// [VI dòng gốc 29] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 30] Định nghĩa hàm stop; tham số: không có. Mục đích: dừng bộ điều khiển và dọn tài nguyên | gọi W.KVPV_V8?.toggle(id, false) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  function stop(){W.KVPV_V8?.toggle?.(id,false);}
// [VI dòng gốc 31] gán W.KVPV_SEASON_REWARDS bằng Object.freeze({_probe:probe,_run:run,stop,status:()=>({...S}),_handoff:()=>({actor,...S})})
  W.KVPV_SEASON_REWARDS=Object.freeze({_probe:probe,_run:run,stop,status:()=>({...S}),_handoff:()=>({actor,...S})});
// [VI dòng gốc 32] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | gọi W.KVPV_V8?.register({id,name:'Nhận nhiệm vụ mùa/giai đoạn đã xong',kind:'claim',spend:'none',verified:true,enabled:true,background:true,dire…) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  try{W.KVPV_V8?.register?.({id,name:'Nhận nhiệm vụ mùa/giai đoạn đã xong',kind:'claim',spend:'none',verified:true,enabled:true,background:true,directDuringPve:true,redIds:[],
// [VI dòng gốc 33] Thuộc tính probe: tạo hàm với tham số (không có); mỗi lần gọi trả về gọi W.KVPV_SEASON_REWARDS._probe(); chức năng nội bộ chưa xác minh từ tên hàm | Thuộc tính run: tạo hàm với tham số p; mỗi lần gọi trả về gọi W.KVPV_SEASON_REWARDS._run(p); chức năng nội bộ chưa xác minh từ tên hàm
    probe:()=>W.KVPV_SEASON_REWARDS._probe(),run:p=>W.KVPV_SEASON_REWARDS._run(p)});
// [VI dòng gốc 34] Nhận lỗi bằng e và chạy phần xử lý lỗi. | Kiểm tra !/Trung module ID|already exists/i.test(String(e)): đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: e
  }catch(e){if(!/Trung module ID|already exists/i.test(String(e)))throw e;}
// [VI dòng gốc 35] gọi W.KVPV_V8?.toggle(id, true) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  W.KVPV_V8?.toggle?.(id,true);
// [VI dòng gốc 36] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: })();
})();
// [VI dòng gốc 37] Dòng trống để tách các phần, không có lệnh thực thi.
