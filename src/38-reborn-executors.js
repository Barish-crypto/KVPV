// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: Separate era-node executors. Reuse native CoBao data/validated fragment
/* Separate era-node executors. Reuse native CoBao data/validated fragment
 * discovery, never overwrite main taskInfo. Arena uses free native attempts. */
// [VI dòng gốc 3] chạy ngay hàm bao để tạo phạm vi và khởi tạo phần chức năng bên trong
(() => {
// [VI dòng gốc 4] "use strict"
  'use strict';
// [VI dòng gốc 5] Khai báo biến không gán lại bằng const: W = window; old = đọc W.KVPV_REBORN_EXECUTORS; carry = gọi old?._handoff(); chức năng nội bộ chưa xác minh từ tên hàm (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gọi old?.stop('reload') để dừng bộ điều khiển và dọn tài nguyên (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  const W=window,old=W.KVPV_REBORN_EXECUTORS,carry=old?._handoff?.();old?.stop?.('reload');
// [VI dòng gốc 6] Khai báo biến không gán lại bằng const: actor = gọi String(W.__KVPV_OWN_ACTOR_ID||'') để chuyển sang chuỗi; same = tính biểu thức carry?.actor===actor
  const actor=String(W.__KVPV_OWN_ACTOR_ID||''),same=carry?.actor===actor;
// [VI dòng gốc 7] Khai báo biến không gán lại bằng const: S = tạo đối tượng gồm enabled, timer, fastTimer, fastAt, fastKey, fastRows, lease, savedOld, nextFetch, opened, cobao, arena
  const S={enabled:true,timer:null,fastTimer:null,fastAt:0,fastKey:null,fastRows:[],lease:same?carry.lease:false,savedOld:same?carry.savedOld:{},nextFetch:0,opened:null,
// [VI dòng gốc 8] Thuộc tính cobao: nếu same thì lấy carry.cobao, ngược lại lấy {pending:null,confirmed:0,requests:0,reason:'waiting_goal'} | Thuộc tính pending: null | Thuộc tính confirmed: 0 | Thuộc tính requests: 0
    cobao:same?carry.cobao:{pending:null,confirmed:0,requests:0,reason:'waiting_goal'},
// [VI dòng gốc 9] Thuộc tính arena: nếu same thì lấy carry.arena, ngược lại lấy {pending:null,confirmed:0,requests:0,reason:'waiting_goal'} | Thuộc tính pending: null | Thuộc tính confirmed: 0 | Thuộc tính requests: 0
    arena:same?carry.arena:{pending:null,confirmed:0,requests:0,reason:'waiting_goal'}};
// [VI dòng gốc 10] Khai báo biến không gán lại bằng const: owned = tạo hàm với tham số (không có); mỗi lần gọi trả về actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'') và chỉ đánh giá vế phải khi vế trái truthy: !W.__KVPV_UNIVERSAL_HALTED
  const owned=()=>actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;
// [VI dòng gốc 11] Khai báo biến không gán lại bằng const: stage = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._Ba?._Co?._Mo?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); co = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._Ba?._kAt?._LAt?.inst nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  const stage=()=>W._Ba?._Co?._Mo?.ins,co=()=>W._Ba?._kAt?._LAt?.inst;
// [VI dòng gốc 12] Khai báo biến không gán lại bằng const: arb = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W.KVPV?.core?.scene nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); ui = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._ft?._Y4n?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  const arb=()=>W.KVPV?.core?.scene,ui=()=>W._ft?._Y4n?.ins;
// [VI dòng gốc 13] Khai báo biến không gán lại bằng const: common = tạo hàm với tham số (không có); mỗi lần gọi trả về W._Ba?._$a?.SceneUtil?.isCommonScene===true và chỉ đánh giá vế phải khi vế trái truthy: W._Ba?._$a?._yo?.ins?.isInMission!==true
  const common=()=>W._Ba?._$a?.SceneUtil?.isCommonScene===true&&W._Ba?._$a?._yo?.ins?.isInMission!==true;
// [VI dòng gốc 14] Định nghĩa hàm idle; tham số: arena=false | Kiểm tra Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: false. | Khai báo biến không gán lại bằng const: d = gọi W.KVPV_DAILY?.quickState() (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); lease = gọi arb()?.status() để trả trạng thái để kiểm tra (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  function idle(arena=false){if(Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0))return false;const d=W.KVPV_DAILY?.quickState?.(),lease=arb()?.status?.();
// [VI dòng gốc 15] Kết thúc hàm hiện tại và trả về: owned()&&common()&&W._Ba?._rJ?._O$?.ins?.isDead!==true&&d?.running===true&&['rảnh','ranh'].includes(d.job)&& (!lease?.owner||arena&&lease.tag==='reborn-arena') và chỉ đánh giá vế phải khi vế trái truthy: !W.KVPV_HITRUN1?.status?.(false)?.running.
    return owned()&&common()&&W._Ba?._rJ?._O$?.ins?.isDead!==true&&d?.running===true&&['rảnh','ranh'].includes(d.job)&&
// [VI dòng gốc 16] gọi W.KVPV_HITRUN1?.status(false) để trả trạng thái để kiểm tra
      (!lease?.owner||arena&&lease.tag==='reborn-arena')&&!W.KVPV_HITRUN1?.status?.(false)?.running;
// [VI dòng gốc 17] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 18] Định nghĩa hàm coPlan; tham số: không có | Khai báo biến không gán lại bằng const: eraGoal = gọi W.KVPV_REBORN_GOALS?.cobaoGoal() (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  function coPlan(){const eraGoal=W.KVPV_REBORN_GOALS?.cobaoGoal?.();
// [VI dòng gốc 19] Khai báo biến không gán lại bằng const: p = gọi W.KVPV_V864?.plan() (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); f = đọc p?.fragments nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const p=W.KVPV_V864?.plan?.(),f=p?.fragments;
// [VI dòng gốc 20] Khai báo biến không gán lại bằng const: actionable = đảo giá trị đúng/sai của !(p?.reward||p?.item||f?.owned||f?.allPlaced)
    const actionable=!!(p?.reward||p?.item||f?.owned||f?.allPlaced);
// [VI dòng gốc 21] Khai báo biến không gán lại bằng const: goal = eraGoal hoặc dùng vế phải khi vế trái falsy: actionable?{id:'COBAO/available',target:Infinity,availableOnly:true}:null | Kiểm tra !goal: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: null.
    const goal=eraGoal||(actionable?{id:'COBAO/available',target:Infinity,availableOnly:true}:null);if(!goal)return null;
// [VI dòng gốc 22] Kiểm tra !f: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm goal, step.
    if(!f)return {goal,step:'waiting_cobao_model'};
// [VI dòng gốc 23] Kiểm tra Number(f.count)>=goal.target: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm goal, step, f.
    if(Number(f.count)>=goal.target)return {goal,step:'waiting_era_node_ack',f};
// [VI dòng gốc 24] Khai báo biến không gán lại bằng const: step = nếu !f.ready thì lấy 'fetch', ngược lại lấy f.allPlaced?'activate':f.owned?'put':p.item?'use':p.reward?'claimStage':'missing'
    const step=!f.ready?'fetch':f.allPlaced?'activate':f.owned?'put':p.item?'use':p.reward?'claimStage':'missing';
// [VI dòng gốc 25] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm goal, step, f, item, reward.
    return {goal,step,f,item:p.item,reward:p.reward};
// [VI dòng gốc 26] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 27] Định nghĩa hàm cobaoStageGoal; tham số: không có | Kiểm tra !S.enabled||!owned(): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: null. | Khai báo biến không gán lại bằng const: p = gọi coPlan()
  function cobaoStageGoal(){if(!S.enabled||!owned())return null;const p=coPlan();if(p?.step!=='missing'||p.goal.availableOnly||S.cobao.pending)return null;
// [VI dòng gốc 28] Khai báo biến không gán lại bằng const: level = gọi Number(stage()?.curLv) để chuyển sang số; rows = p.f.rows?.filter(r=>!r.owned&&!r.placed) hoặc dùng vế phải khi vế trái là null/undefined: []
    const level=Number(stage()?.curLv),rows=p.f.rows?.filter(r=>!r.owned&&!r.placed)??[];
// [VI dòng gốc 29] Khai báo biến không gán lại bằng const: target = đọc rows.map(r=>Number(r.stage)).filter(n=>Number.isSafeInteger(n)&&n>0&&Number(W._ft?._h$?.ins?.getCfgByLv?.(n)?.[0])>0&&level<=n).sort((a,b)=>a-b)[0]
    const target=rows.map(r=>Number(r.stage)).filter(n=>Number.isSafeInteger(n)&&n>0&&Number(W._ft?._h$?.ins?.getCfgByLv?.(n)?.[0])>0&&level<=n).sort((a,b)=>a-b)[0];
// [VI dòng gốc 30] Kết thúc hàm hiện tại và trả về: nếu target thì lấy {...p.goal,id:p.goal.id+'/fragment-stage/'+target,kind:'STAGE',target,current:level-1}, ngược lại lấy null.
    return target?{...p.goal,id:p.goal.id+'/fragment-stage/'+target,kind:'STAGE',target,current:level-1}:null;
// [VI dòng gốc 31] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 32] Định nghĩa hàm observeCo; tham số: không có | Khai báo biến không gán lại bằng const: p = đọc S.cobao.pending | Kiểm tra !p: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  function observeCo(){const p=S.cobao.pending;if(!p)return;
// [VI dòng gốc 33] Khai báo biến không gán lại bằng const: fresh = gọi W.KVPV_V864?.plan() (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); f = đọc fresh?.fragments nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); rows = gọi W._Ba?._Ic?._aQ?.ins?.getItemsByBagType(0) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const fresh=W.KVPV_V864?.plan?.(),f=fresh?.fragments,rows=W._Ba?._Ic?._aQ?.ins?.getItemsByBagType?.(0);
// [VI dòng gốc 34] Khai báo biến không gán lại bằng const: done = nếu p.step==='fetch' thì lấy f?.ready===true, ngược lại lấy p.step==='activate'?Number(f?.count)>p.count: p.step==='put'?!!co()?.epFrgmtsDic?.get?.(p.id):p.step==='claimStage'?Array.isArray(stage()?.awardLvs)&&!stage().awardLvs.map(Number).…
    const done=p.step==='fetch'?f?.ready===true:p.step==='activate'?Number(f?.count)>p.count:
// [VI dòng gốc 35] gọi co()?.epFrgmtsDic?.get(p.id) | gọi co() | gọi Array.isArray(stage()?.awardLvs) | gọi stage()
      p.step==='put'?!!co()?.epFrgmtsDic?.get?.(p.id):p.step==='claimStage'?Array.isArray(stage()?.awardLvs)&&!stage().awardLvs.map(Number).includes(p.lv):
// [VI dòng gốc 36] Định nghĩa hàm hàm không đặt tên; tham số: r
      p.step==='use'?Array.isArray(rows)&&!rows.some(r=>String(r?.[2])===p.uid&&Number(r?.[1])>=p.amount):false;
// [VI dòng gốc 37] Kiểm tra done: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gán S.cobao.pending bằng null | tăng S.cobao.confirmed một đơn vị sau khi lấy giá trị | gán S.cobao.reason bằng 'server_confirmed'
    if(done){S.cobao.pending=null;S.cobao.confirmed++;S.cobao.reason='server_confirmed';}
// [VI dòng gốc 38] gán S.cobao.reason bằng Date.now()-p.at>30000?'waiting_ack_no_retry':'waiting_server'
    else S.cobao.reason=Date.now()-p.at>30000?'waiting_ack_no_retry':'waiting_server';
// [VI dòng gốc 39] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 40] Định nghĩa hàm coProbe; tham số: không có | gọi observeCo() | Khai báo biến không gán lại bằng const: p = gọi coPlan() | Kiểm tra !S.enabled||!owned()||S.cobao.pending||!p||!coAllowed()||W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true: đúng thì chạy nhánh sau if.
  function coProbe(){observeCo();const p=coPlan();if(!S.enabled||!owned()||S.cobao.pending||!p||!coAllowed()||W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true)return {ready:false};
// [VI dòng gốc 41] Kiểm tra !['fetch','activate','put','use','claimStage'].includes(p.step): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm ready.
    if(!['fetch','activate','put','use','claimStage'].includes(p.step))return {ready:false};
// [VI dòng gốc 42] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm ready, signature, step.
    return {ready:true,signature:JSON.stringify([p.goal.id,p.step,p.f?.count,p.f?.rows?.map(r=>[r.id,r.owned,r.placed]),p.item?.sig,p.reward?.sig]),step:p.step};
// [VI dòng gốc 43] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 44] Định nghĩa hàm coRun; tham số: before | Khai báo biến không gán lại bằng const: q = gọi coProbe(); p = gọi coPlan() | Kiểm tra !q.ready||q.signature!==before.signature: đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('CoBao era state changed')
  function coRun(before){const q=coProbe(),p=coPlan();if(!q.ready||q.signature!==before.signature)throw Error('CoBao era state changed');
// [VI dòng gốc 45] Khai báo biến không gán lại bằng const: pending = tạo đối tượng gồm step, at, count | Khai báo biến có thể gán lại bằng let: send (chưa gán giá trị)
    const pending={step:p.step,at:Date.now(),count:p.f?.count};let send;
// [VI dòng gốc 46] Khai báo biến không gán lại bằng const: rpc = đọc W._Ba?._kAt?._IMi?.inst nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const rpc=W._Ba?._kAt?._IMi?.inst;
// [VI dòng gốc 47] Kiểm tra p.step==='fetch'&&typeof rpc?.getShQiInfo==='function': đúng thì chạy nhánh sau if. | gán send bằng ()=>rpc.getShQiInfo()
    if(p.step==='fetch'&&typeof rpc?.getShQiInfo==='function')send=()=>rpc.getShQiInfo();
// [VI dòng gốc 48] Kiểm tra p.step==='activate'&&p.f.allPlaced&&typeof rpc?.actShenQi==='function': đúng thì chạy nhánh sau if. | gán send bằng ()=>rpc.actShenQi()
    if(p.step==='activate'&&p.f.allPlaced&&typeof rpc?.actShenQi==='function')send=()=>rpc.actShenQi();
// [VI dòng gốc 49] Kiểm tra p.step==='put'&&p.f.owned&&typeof rpc?.epFragment==='function': đúng thì chạy nhánh sau if. | gán pending.id bằng p.f.owned.id | gán send bằng ()=>rpc.epFragment([pending.id])
    if(p.step==='put'&&p.f.owned&&typeof rpc?.epFragment==='function'){pending.id=p.f.owned.id;send=()=>rpc.epFragment([pending.id]);}
// [VI dòng gốc 50] Kiểm tra p.step==='use'&&p.item&&typeof W._Ba?._Ic?._oJ?.instance?.c2sUseBagItem==='function': đúng thì chạy nhánh sau if.
    if(p.step==='use'&&p.item&&typeof W._Ba?._Ic?._oJ?.instance?.c2sUseBagItem==='function'){
// [VI dòng gốc 51] Khai báo biến không gán lại bằng const: rows = gọi W._Ba?._Ic?._aQ?.ins?.getItemsByBagType(0) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); row = gọi rows?.find(r=>String(r?.[2])===String(p.item.uid)&&Number(r?.[0])===p.item.id) để tìm phần tử đầu tiên thỏa điều kiện (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
      const rows=W._Ba?._Ic?._aQ?.ins?.getItemsByBagType?.(0),row=rows?.find(r=>String(r?.[2])===String(p.item.uid)&&Number(r?.[0])===p.item.id);
// [VI dòng gốc 52] Kiểm tra row&&W._Ba?._Ic?.BeiBaoTool?.checkItemCanUseOrNotice?.(row,false)===true: đúng thì chạy nhánh sau if. | gán pending.uid bằng String(p.item.uid) | gán pending.amount bằng Number(row[1]) | gán send bằng ()=>W._Ba._Ic._oJ.instance.c2sUseBagItem(p.item.uid,p.item.id,1)
      if(row&&W._Ba?._Ic?.BeiBaoTool?.checkItemCanUseOrNotice?.(row,false)===true){pending.uid=String(p.item.uid);pending.amount=Number(row[1]);send=()=>W._Ba._Ic._oJ.instance.c2sUseBagItem(p.item.uid,p.item.id,1);}
// [VI dòng gốc 53] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 54] Kiểm tra p.step==='claimStage'&&Number(stage()?.awardLvs?.[0])===p.reward?.lv&&Number(stage()?.curLv)>p.reward.lv&&typeof W._Ba?._sst?._Cht?.inst?.getCpAward==='function': đúng thì chạy nhánh sau if.
    if(p.step==='claimStage'&&Number(stage()?.awardLvs?.[0])===p.reward?.lv&&Number(stage()?.curLv)>p.reward.lv&&typeof W._Ba?._sst?._Cht?.inst?.getCpAward==='function'){
// [VI dòng gốc 55] gán pending.lv bằng p.reward.lv | gán send bằng ()=>W._Ba._sst._Cht.inst.getCpAward(p.reward.mapId,p.reward.lv)
      pending.lv=p.reward.lv;send=()=>W._Ba._sst._Cht.inst.getCpAward(p.reward.mapId,p.reward.lv);
// [VI dòng gốc 56] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 57] Kiểm tra !send: đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('Native CoBao operation unavailable') | Kiểm tra W.KVPV_V864?.config: đúng thì chạy nhánh sau if. | Kiểm tra !('cobao' in S.savedOld): đúng thì chạy nhánh sau if.
    if(!send)throw Error('Native CoBao operation unavailable');if(W.KVPV_V864?.config){if(!('cobao' in S.savedOld))S.savedOld.cobao=W.KVPV_V864.config.enabled;W.KVPV_V864.config.enabled=false;}
// [VI dòng gốc 58] gán S.cobao.pending bằng pending | tăng S.cobao.requests một đơn vị sau khi lấy giá trị | gọi send()
    S.cobao.pending=pending;S.cobao.requests++;send();
// [VI dòng gốc 59] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 60] Định nghĩa hàm coAllowed; tham số: không có
  function coAllowed(){
// [VI dòng gốc 61] Kiểm tra !owned()||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)||W._Ba?._rJ?._O$?.ins?.isDead===true: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: false.
    if(!owned()||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)||W._Ba?._rJ?._O$?.ins?.isDead===true)return false;
// [VI dòng gốc 62] Kết thúc hàm hiện tại và trả về: W.KVPV_PARALLEL_ACTIONS?.canDirectDuringPve?.()===true hoặc dùng vế phải khi vế trái falsy: idle().
    return W.KVPV_PARALLEL_ACTIONS?.canDirectDuringPve?.()===true||idle();
// [VI dòng gốc 63] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 64] Chú thích gốc của tác giả; không được thực thi. Nội dung: One cheap native-state check per requested tick; bag discovery is bounded to 10 Hz.
  // One cheap native-state check per requested tick; bag discovery is bounded to 10 Hz.
// [VI dòng gốc 65] Chú thích gốc của tác giả; không được thực thi. Nội dung: All sends still use the same pending latch as the normal executor.
  // All sends still use the same pending latch as the normal executor.
// [VI dòng gốc 66] Định nghĩa hàm fastCo; tham số: không có | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài.
  function fastCo(){try{
// [VI dòng gốc 67] Kiểm tra !S.enabled||!owned()||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(!S.enabled||!owned()||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0))return;
// [VI dòng gốc 68] Khai báo biến không gán lại bằng const: m = gọi co(); st = gọi stage(); now = gọi Date.now()
    const m=co(),st=stage(),now=Date.now();
// [VI dòng gốc 69] Khai báo biến không gán lại bằng const: key = gọi JSON.stringify([W._C?._Mn?._Cn?.currentID,st?.curLv,st?.awardLvs, m?.shenqi?.length,S.fastRows.map(id=>[id,!!m?.frgmtsDic?.get?.(id),!!…) để chuyển giá trị thành chuỗi JSON
    const key=JSON.stringify([W._C?._Mn?._Cn?.currentID,st?.curLv,st?.awardLvs,
// [VI dòng gốc 70] Định nghĩa hàm hàm không đặt tên; tham số: id
      m?.shenqi?.length,S.fastRows.map(id=>[id,!!m?.frgmtsDic?.get?.(id),!!m?.epFrgmtsDic?.get?.(id)])]);
// [VI dòng gốc 71] Kiểm tra key===S.fastKey&&now<S.fastAt: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(key===S.fastKey&&now<S.fastAt)return;
// [VI dòng gốc 72] gán S.fastKey bằng key | gán S.fastAt bằng now+100 | Kiểm tra !coAllowed(): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    S.fastKey=key;S.fastAt=now+100;if(!coAllowed())return;
// [VI dòng gốc 73] Khai báo biến không gán lại bằng const: q = gọi coProbe(); p = gọi coPlan() | gán S.fastRows bằng (p?.f?.rows||[]).map(r=>r.id)
    const q=coProbe(),p=coPlan();S.fastRows=(p?.f?.rows||[]).map(r=>r.id);
// [VI dòng gốc 74] Kiểm tra q.ready: đúng thì chạy nhánh sau if. | gọi coRun(q)
    if(q.ready)coRun(q);
// [VI dòng gốc 75] Nhận lỗi bằng e và chạy phần xử lý lỗi. | gán S.cobao.reason bằng 'error' | gán S.cobao.error bằng String(e)
  }catch(e){S.cobao.reason='error';S.cobao.error=String(e);}}
// [VI dòng gốc 76] Định nghĩa hàm arenaPlan; tham số: không có | Khai báo biến không gán lại bằng const: goal = gọi W.KVPV_REBORN_GOALS?.arenaGoal() (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); m = đọc W._Ba?._tjt?._ljt?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); t = đọc m?.times nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); rows = đọc m?.objs nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  function arenaPlan(){const goal=W.KVPV_REBORN_GOALS?.arenaGoal?.(),m=W._Ba?._tjt?._ljt?.ins,t=m?.times,rows=m?.objs;
// [VI dòng gốc 77] Kiểm tra !goal: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: null. | Khai báo biến không gán lại bằng const: attempts = gọi Number(t?.[2]) để chuyển sang số; until = gọi Number(t?.[0]) để chuyển sang số; svr = gọi Number(W._Sa?.svrTime) để chuyển sang số; power = gọi Number(W._Ba?._qo?._Ro?.ins?.fight) để chuyển sang số; rank = gọi Number(rows?.[3]?.[4]) để chuyển sang số
    if(!goal)return null;const attempts=Number(t?.[2]),until=Number(t?.[0]),svr=Number(W._Sa?.svrTime),power=Number(W._Ba?._qo?._Ro?.ins?.fight),rank=Number(rows?.[3]?.[4]);
// [VI dòng gốc 78] Khai báo biến không gán lại bằng const: target = đọc (Array.isArray(rows)?rows.slice(0,3):[]).map(r=>({id:Number(r?.[0]),power:Number(r?.[3]),rank:Number(r?.[4])})) .filter(r=>Number.isSafeInteger(r.id)&&r.id>0&&r.rank>0&&rank>r.rank…
    const target=(Array.isArray(rows)?rows.slice(0,3):[]).map(r=>({id:Number(r?.[0]),power:Number(r?.[3]),rank:Number(r?.[4])}))
// [VI dòng gốc 79] Định nghĩa hàm hàm không đặt tên; tham số: r | Định nghĩa hàm hàm không đặt tên; tham số: a, b
      .filter(r=>Number.isSafeInteger(r.id)&&r.id>0&&r.rank>0&&rank>r.rank&&r.power>0&&power>=r.power*1.08).sort((a,b)=>a.rank-b.rank)[0];
// [VI dòng gốc 80] Khai báo biến không gán lại bằng const: age = gọi Number(W._Ba?._rJ?._O$?.ins?.creRoleDay??W._Ba?._rJ?._O$?.ins?.nDay) để chuyển sang số; quick = t?.[5]===true||t?.[5]===1 và chỉ đánh giá vế phải khi vế trái truthy: age>=2
    const age=Number(W._Ba?._rJ?._O$?.ins?.creRoleDay??W._Ba?._rJ?._O$?.ins?.nDay),quick=(t?.[5]===true||t?.[5]===1)&&age>=2;
// [VI dòng gốc 81] Khai báo biến không gán lại bằng const: ready = Array.isArray(t)&&Number.isFinite(attempts)&&attempts>0&&Number.isFinite(until)&&Number.isFinite(svr)&&until<=svr&&!!target và chỉ đánh giá vế phải khi vế trái truthy: W._Ba?._Do?._Ho?.inst?.getFcIsOpen?.(165)===true
    const ready=Array.isArray(t)&&Number.isFinite(attempts)&&attempts>0&&Number.isFinite(until)&&Number.isFinite(svr)&&until<=svr&&!!target&&
// [VI dòng gốc 82] gọi W._Ba?._Do?._Ho?.inst?.getFcIsOpen(165)
      W._Ba?._Do?._Ho?.inst?.getFcIsOpen?.(165)===true;
// [VI dòng gốc 83] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm goal, attempts, until, target, quick, ready, reason, signature.
    return {goal,attempts,until,target,quick,ready,reason:!Array.isArray(t)?'waiting_native_arena_data':attempts<=0?'no_free_attempts':until>svr?'native_cooldown':!target?'no_safe_opponent':'ready',
// [VI dòng gốc 84] Thuộc tính signature: gọi JSON.stringify([goal.id,goal.progress,t?.slice(0,6),target?.id,target?.rank]) để chuyển giá trị thành chuỗi JSON
      signature:JSON.stringify([goal.id,goal.progress,t?.slice(0,6),target?.id,target?.rank])};
// [VI dòng gốc 85] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 86] Định nghĩa hàm release; tham số: không có. Mục đích: nhả quyền điều khiển đang giữ | Kiểm tra S.lease&&arb()?.status?.()?.tag==='reborn-arena': đúng thì chạy nhánh sau if. | gọi arb()?.release('combat') để nhả quyền điều khiển đang giữ (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gán S.lease bằng false
  function release(){if(S.lease&&arb()?.status?.()?.tag==='reborn-arena')arb()?.release?.('combat');S.lease=false;}
// [VI dòng gốc 87] Định nghĩa hàm observeArena; tham số: không có | Khai báo biến không gán lại bằng const: p = đọc S.arena.pending | Kiểm tra !p: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  function observeArena(){const p=S.arena.pending;if(!p)return;const current=Number(W._C?._Mn?._Cn?.currentID);
// [VI dòng gốc 88] Kiểm tra current===2281||W._Ba?._$a?._yo?.ins?.isInArena===true: đúng thì chạy nhánh sau if. | gán p.entered bằng true
    if(current===2281||W._Ba?._$a?._yo?.ins?.isInArena===true)p.entered=true;
// [VI dòng gốc 89] Khai báo biến không gán lại bằng const: attempts = gọi Number(W._Ba?._tjt?._ljt?.ins?.times?.[2]) để chuyển sang số
    const attempts=Number(W._Ba?._tjt?._ljt?.ins?.times?.[2]);
// [VI dòng gốc 90] Kiểm tra Number.isFinite(attempts)&&attempts<p.attempts&&(p.quick||p.entered&&common()): đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gán S.arena.pending bằng null | tăng S.arena.confirmed một đơn vị sau khi lấy giá trị | gán S.arena.reason bằng 'free_attempt_consumed_fight_returned'
    if(Number.isFinite(attempts)&&attempts<p.attempts&&(p.quick||p.entered&&common())){S.arena.pending=null;S.arena.confirmed++;S.arena.reason='free_attempt_consumed_fight_returned';release();}
// [VI dòng gốc 91] gán S.arena.reason bằng Date.now()-p.at>120000?'waiting_arena_ack_no_retry':'waiting_arena_result' | Kiểm tra S.lease&&arb()?.status?.()?.tag==='reborn-arena': đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gọi arb()?.renew('combat') để gia hạn quyền đang giữ (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gán S.lease bằng false
    else {S.arena.reason=Date.now()-p.at>120000?'waiting_arena_ack_no_retry':'waiting_arena_result';if(S.lease&&arb()?.status?.()?.tag==='reborn-arena')arb()?.renew?.('combat');else S.lease=false;}
// [VI dòng gốc 92] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 93] Định nghĩa hàm arenaProbe; tham số: không có | gọi observeArena() | Khai báo biến không gán lại bằng const: p = gọi arenaPlan() | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm ready, signature.
  function arenaProbe(){observeArena();const p=arenaPlan();return {ready:!!(S.enabled&&owned()&&!S.arena.pending&&p?.ready&&idle(true)&&W.KVPV_CONFIRM_POPUPS?.beforeTask?.()!==true&&
// [VI dòng gốc 94] Thuộc tính signature: đọc p?.signature nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
      ![292,293,1708].some(id=>ui()?.isOpened?.(id)===true)&&typeof W._Ba?._tjt?._vjt?.ins?.challengeArena==='function'),signature:p?.signature};}
// [VI dòng gốc 95] Định nghĩa hàm arenaRun; tham số: before | Khai báo biến không gán lại bằng const: q = gọi arenaProbe(); p = gọi arenaPlan() | Kiểm tra !q.ready||q.signature!==before.signature: đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('Arena era state changed')
  function arenaRun(before){const q=arenaProbe(),p=arenaPlan();if(!q.ready||q.signature!==before.signature)throw Error('Arena era state changed');
// [VI dòng gốc 96] Kiểm tra arb()?.acquire?.('combat','reborn-arena')!==true: đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('Arena scene busy') | gán S.lease bằng true
    if(arb()?.acquire?.('combat','reborn-arena')!==true)throw Error('Arena scene busy');S.lease=true;
// [VI dòng gốc 97] gán S.arena.pending bằng {at:Date.now(),attempts:p.attempts,quick:p.quick,entered:false} | tăng S.arena.requests một đơn vị sau khi lấy giá trị
    S.arena.pending={at:Date.now(),attempts:p.attempts,quick:p.quick,entered:false};S.arena.requests++;
// [VI dòng gốc 98] gọi W._Ba._tjt._vjt.ins.challengeArena(p.target.id, p.quick?1:-1)
    W._Ba._tjt._vjt.ins.challengeArena(p.target.id,p.quick?1:-1);
// [VI dòng gốc 99] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 100] Định nghĩa hàm sync; tham số: không có | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | Kiểm tra !S.enabled: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  function sync(){try{if(!S.enabled)return;if(!owned()){stop();return;}observeCo();observeArena();
// [VI dòng gốc 101] Khai báo biến không gán lại bằng const: c = gọi coPlan()
    const c=coPlan();
// [VI dòng gốc 102] Duyệt từng giá trị trong [['cobao',W.KVPV_V864,!!c||!!S.cobao.pending],['arena',W.KVPV_V865,!!arenaPlan()||!!S.arena.pending]] bằng const [key,api,active]. | Khai báo biến không gán lại bằng const: [key,api,active] (chưa gán giá trị)
    for(const [key,api,active]of [['cobao',W.KVPV_V864,!!c||!!S.cobao.pending],['arena',W.KVPV_V865,!!arenaPlan()||!!S.arena.pending]]){
// [VI dòng gốc 103] Kiểm tra active&&api?.config: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | Kiểm tra !(key in S.savedOld): đúng thì chạy nhánh sau if. | gán S.savedOld[key] bằng api.config.enabled | gán api.config.enabled bằng false
      if(active&&api?.config){if(!(key in S.savedOld))S.savedOld[key]=api.config.enabled;api.config.enabled=false;}
// [VI dòng gốc 104] Kiểm tra key in S.savedOld&&api?.config: đúng thì chạy nhánh sau if. | gán api.config.enabled bằng S.savedOld[key] | xóa thuộc tính S.savedOld[key]
      else if(key in S.savedOld&&api?.config){api.config.enabled=S.savedOld[key];delete S.savedOld[key];}
// [VI dòng gốc 105] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 106] Kiểm tra !S.cobao.pending: đúng thì chạy nhánh sau if. | gán S.cobao.reason bằng c?.step??'waiting_goal'
    if(!S.cobao.pending)S.cobao.reason=c?.step??'waiting_goal';
// [VI dòng gốc 107] Khai báo biến không gán lại bằng const: a = gọi arenaPlan() | Kiểm tra !S.arena.pending: đúng thì chạy nhánh sau if. | gán S.arena.reason bằng a?.reason??'waiting_goal'
    const a=arenaPlan();if(!S.arena.pending)S.arena.reason=a?.reason??'waiting_goal';
// [VI dòng gốc 108] Kiểm tra a&&!S.arena.pending&&idle()&&W.KVPV_CONFIRM_POPUPS?.beforeTask?.()!==true: đúng thì chạy nhánh sau if.
    if(a&&!S.arena.pending&&idle()&&W.KVPV_CONFIRM_POPUPS?.beforeTask?.()!==true){
// [VI dòng gốc 109] Kiểm tra S.opened!==a.goal.id: đúng thì chạy nhánh sau if. | gán S.opened bằng a.goal.id | gọi ui()?.openByActionId(165) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
      if(S.opened!==a.goal.id){S.opened=a.goal.id;ui()?.openByActionId?.(165);}
// [VI dòng gốc 110] Kiểm tra Date.now()>=S.nextFetch&&typeof W._Ba?._tjt?._vjt?.ins?.getArena==='function': đúng thì chạy nhánh sau if. | gán S.nextFetch bằng Date.now()+30000 | gọi W._Ba._tjt._vjt.ins.getArena()
      if(Date.now()>=S.nextFetch&&typeof W._Ba?._tjt?._vjt?.ins?.getArena==='function'){S.nextFetch=Date.now()+30000;W._Ba._tjt._vjt.ins.getArena();}
// [VI dòng gốc 111] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 112] gọi W.KVPV_QUEST_PRIORITY?.sync() (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    W.KVPV_QUEST_PRIORITY?.sync?.();
// [VI dòng gốc 113] Nhận lỗi bằng e và chạy phần xử lý lỗi. | gán S.arena.reason bằng 'error' | gán S.arena.error bằng String(e)
  }catch(e){S.arena.reason='error';S.arena.error=String(e);}}
// [VI dòng gốc 114] Khai báo biến không gán lại bằng const: defs = tạo mảng gồm 2 vị trí: [{id:'reborn_cobao_step',name:'Chuyển Sinh: Cổ Bảo',probe:coProbe,run:coRun},{id:'reborn_arena_fight',name:'Chuyển Sinh: Arena miễn phí',probe:arenaProbe,run:arenaRun}]
  const defs=[{id:'reborn_cobao_step',name:'Chuyển Sinh: Cổ Bảo',probe:coProbe,run:coRun},{id:'reborn_arena_fight',name:'Chuyển Sinh: Arena miễn phí',probe:arenaProbe,run:arenaRun}];
// [VI dòng gốc 115] Định nghĩa hàm stop; tham số: reason='manual'. Mục đích: dừng bộ điều khiển và dọn tài nguyên | gán S.enabled bằng false | Kiểm tra S.timer!==null: đúng thì chạy nhánh sau if. | gọi W.KVPV_V1?.timers?.clearInterval??W.clearInterval(S.timer)
  function stop(reason='manual'){S.enabled=false;if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;if(S.fastTimer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.fastTimer);S.fastTimer=null;
// [VI dòng gốc 116] Duyệt từng giá trị trong defs bằng const d. | Khai báo biến không gán lại bằng const: d (chưa gán giá trị) | gọi W.KVPV_V8?.toggle(d.id, false) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    for(const d of defs)W.KVPV_V8?.toggle?.(d.id,false);
// [VI dòng gốc 117] Kiểm tra reason!=='reload'&&owned(): đúng thì chạy nhánh sau if. | Duyệt từng giá trị trong [['cobao',W.KVPV_V864,S.cobao.pending],['arena',W.KVPV_V865,S.arena.pending]] bằng const [key,api,pending]. | Khai báo biến không gán lại bằng const: [key,api,pending] (chưa gán giá trị)
    if(reason!=='reload'&&owned())for(const [key,api,pending]of [['cobao',W.KVPV_V864,S.cobao.pending],['arena',W.KVPV_V865,S.arena.pending]]){
// [VI dòng gốc 118] Kiểm tra !pending&&key in S.savedOld&&api?.config: đúng thì chạy nhánh sau if. | gán api.config.enabled bằng S.savedOld[key] | xóa thuộc tính S.savedOld[key]
      if(!pending&&key in S.savedOld&&api?.config){api.config.enabled=S.savedOld[key];delete S.savedOld[key];}
// [VI dòng gốc 119] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 120] Kiểm tra reason!=='reload'&&!S.arena.pending: đúng thì chạy nhánh sau if. | gọi release() để nhả quyền điều khiển đang giữ
    if(reason!=='reload'&&!S.arena.pending)release();}
// [VI dòng gốc 121] gán W.KVPV_REBORN_EXECUTORS bằng Object.freeze({sync,stop,cobaoStageGoal,_coProbe:coProbe,_coRun:coRun,_arenaProbe:arenaProbe,_arenaRun:arenaRun, status:()=>({enabled:S.enabled,actor,cobao:{...S.cobao,pollMs:1,bag…
  W.KVPV_REBORN_EXECUTORS=Object.freeze({sync,stop,cobaoStageGoal,_coProbe:coProbe,_coRun:coRun,_arenaProbe:arenaProbe,_arenaRun:arenaRun,
// [VI dòng gốc 122] Thuộc tính status: tạo hàm với tham số (không có); mỗi lần gọi trả về tạo đối tượng gồm enabled, actor, cobao, arena, allowKNB | Thuộc tính enabled: đọc S.enabled | Thuộc tính actor: dùng biến cùng tên | Thuộc tính cobao: tạo đối tượng gồm các thuộc tính của S.cobao, pollMs, bagScanMs, plan
    status:()=>({enabled:S.enabled,actor,cobao:{...S.cobao,pollMs:1,bagScanMs:100,plan:coPlan()},arena:{...S.arena,plan:arenaPlan()},allowKNB:false}),
// [VI dòng gốc 123] Thuộc tính _handoff: tạo hàm với tham số (không có); mỗi lần gọi trả về tạo đối tượng gồm actor, cobao, arena, lease, savedOld | Thuộc tính actor: dùng biến cùng tên | Thuộc tính cobao: đọc S.cobao | Thuộc tính arena: đọc S.arena
    _handoff:()=>({actor,cobao:S.cobao,arena:S.arena,lease:S.lease,savedOld:S.savedOld})});
// [VI dòng gốc 124] Duyệt từng giá trị trong defs bằng const d. | Khai báo biến không gán lại bằng const: d (chưa gán giá trị) | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | gọi W.KVPV_V8?.register({id:d.id,name:d.name,kind:'work',spend:d.id==='reborn_arena_fight'?'none':'materials',verified:true,enabled:true,backgro…) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  for(const d of defs){try{W.KVPV_V8?.register?.({id:d.id,name:d.name,kind:'work',spend:d.id==='reborn_arena_fight'?'none':'materials',verified:true,enabled:true,background:false,redIds:[],hourlyLimit:60,cooldownMs:2000,
// [VI dòng gốc 125] Thuộc tính probe: tạo hàm với tham số (không có); mỗi lần gọi trả về W.KVPV_REBORN_EXECUTORS?.[d.id==='reborn_cobao_step'?'_coProbe':'_arenaProbe']() hoặc dùng vế phải khi vế trái là null/undefined: {ready:false} | Thuộc tính ready: false
      probe:()=>W.KVPV_REBORN_EXECUTORS?.[d.id==='reborn_cobao_step'?'_coProbe':'_arenaProbe']()??{ready:false},
// [VI dòng gốc 126] Thuộc tính run: tạo hàm với tham số p; mỗi lần gọi trả về gọi W.KVPV_REBORN_EXECUTORS?.[d.id==='reborn_cobao_step'?'_coRun':'_arenaRun'](p) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
      run:p=>W.KVPV_REBORN_EXECUTORS?.[d.id==='reborn_cobao_step'?'_coRun':'_arenaRun'](p)});
// [VI dòng gốc 127] Nhận lỗi bằng e và chạy phần xử lý lỗi. | Kiểm tra !/Trung module ID|already exists/i.test(String(e)): đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: e | gọi W.KVPV_V8?.toggle(d.id, true) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    }catch(e){if(!/Trung module ID|already exists/i.test(String(e)))throw e;}W.KVPV_V8?.toggle?.(d.id,true);}
// [VI dòng gốc 128] gán S.timer bằng (W.KVPV_V1?.timers?.setInterval??W.setInterval)(sync,500) | gán S.fastTimer bằng (W.KVPV_V1?.timers?.setInterval??W.setInterval)(fastCo,1) | gọi sync()
  S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(sync,500);S.fastTimer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(fastCo,50);sync();
// [VI dòng gốc 129] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: })();
})();
// [VI dòng gốc 130] Dòng trống để tách các phần, không có lệnh thực thi.
