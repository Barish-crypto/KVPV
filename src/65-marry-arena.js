// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: Đấu Tiên Duyên: existing challenge turns, quantity one, free refresh only. [đóng chú thích]
/* Đấu Tiên Duyên: existing challenge turns, quantity one, free refresh only. */
// [VI dòng gốc 2] chạy ngay hàm bao để tạo phạm vi và khởi tạo phần chức năng bên trong
(() => {
// [VI dòng gốc 3] "use strict" | Khai báo biến không gán lại bằng const: W = window; old = đọc W.KVPV_MARRY_ARENA; c = gọi old?._handoff(); chức năng nội bộ chưa xác minh từ tên hàm (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gọi old?.stop('reload') để dừng bộ điều khiển và dọn tài nguyên (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Khai báo biến không gán lại bằng const: actor = gọi String(W.__KVPV_OWN_ACTOR_ID||'') để chuyển sang chuỗi; same = tính biểu thức c?.actor===actor
'use strict';const W=window,old=W.KVPV_MARRY_ARENA,c=old?._handoff?.();old?.stop?.('reload');const actor=String(W.__KVPV_OWN_ACTOR_ID||''),same=c?.actor===actor;
// [VI dòng gốc 4] Khai báo biến không gán lại bằng const: S = tạo đối tượng gồm timer, pending, lastAction, queried, entries, refreshes, confirmed, lease, stageAuto, reason, error
const S={timer:null,pending:same?c.pending:null,lastAction:same?c.lastAction:-Infinity,queried:false,entries:same?c.entries:0,refreshes:same?c.refreshes:0,confirmed:same?c.confirmed:0,lease:same?c.lease:false,stageAuto:same?c.stageAuto:null,reason:'waiting_idle',error:''};
// [VI dòng gốc 5] Khai báo biến không gán lại bằng const: model = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._Ba?._Yo?.marryFight?._Z9t?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); rpc = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._Ba?._Yo?.marryFight?._qGt?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
const model=()=>W._Ba?._Yo?.marryFight?._Z9t?.ins,rpc=()=>W._Ba?._Yo?.marryFight?._qGt?.ins;
// [VI dòng gốc 6] Khai báo biến không gán lại bằng const: own = tạo hàm với tham số (không có); mỗi lần gọi trả về actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'') và chỉ đánh giá vế phải khi vế trái truthy: !W.__KVPV_UNIVERSAL_HALTED
const own=()=>actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;
// [VI dòng gốc 7] Khai báo biến không gán lại bằng const: map = tạo hàm với tham số (không có); mỗi lần gọi trả về gọi Number(W._C?._Mn?._Cn?.currentID) để chuyển sang số
const map=()=>Number(W._C?._Mn?._Cn?.currentID);
function eventWindow(){try{const d=W.KVPV_DAILY?.lichData?.();return Array.isArray(d?.active)&&d.active.some(e=>e?.key==='tien_duyen_tac_chien');}catch(_){return false;}}
// [VI dòng gốc 8] Định nghĩa hàm release; tham số: không có. Mục đích: nhả quyền điều khiển đang giữ | Kiểm tra S.lease: đúng thì chạy nhánh sau if. | gọi W.KVPV?.core?.scene?.release('daily') để nhả quyền điều khiển đang giữ (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gán S.lease bằng false
function release(){if(S.lease)W.KVPV?.core?.scene?.release?.('daily');S.lease=false;const stage=W._Ba?._Co?._Mo?.ins;if(S.stageAuto===true&&stage?.auto===false&&!W.KVPV_EVENT_PRIORITY?.hold?.())stage.auto=true;S.stageAuto=null;}
// [VI dòng gốc 9] Định nghĩa hàm safe; tham số: không có | Khai báo biến không gán lại bằng const: q = gọi W.KVPV_DAILY?.quickState() (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); b = đọc W._Ba | Kết thúc hàm hiện tại và trả về: b?._rJ?._O$?.ins?.isDead===false&&b?._$a?.SceneUtil?.isCommonScene===true&&b?._$a?._yo?.ins?.isInMission===false&&q?.running===true&&['rảnh','ranh'].includes(q.job)&&!W.KVPV?.core?… và chỉ đánh giá vế phải khi vế trái truthy: W.KVPV_CONFIRM_POPUPS?.beforeTask?.()!==true.
function safe(){const q=W.KVPV_DAILY?.quickState?.(),b=W._Ba;return b?._rJ?._O$?.ins?.isDead===false&&b?._$a?.SceneUtil?.isCommonScene===true&&b?._$a?._yo?.ins?.isInMission===false&&q?.running===true&&['rảnh','ranh'].includes(q.job)&&!W.KVPV?.core?.scene?.status?.()?.owner&&!b?._cm?._q3t?.ins?.getHasTeams?.()&&!W.KVPV_HITRUN1?.status?.(false)?.running&&Date.now()>=Number(W.__KVPV_USER_UI_UNTIL||0)&&W.KVPV_CONFIRM_POPUPS?.beforeTask?.()!==true;}
// [VI dòng gốc 10] Định nghĩa hàm tick; tham số: không có. Mục đích: xử lý một nhịp kiểm tra | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài.
function tick(){try{
// [VI dòng gốc 11] Kiểm tra !own(): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể. | Khai báo biến không gán lại bằng const: m = gọi model(); r = gọi rpc() | Kiểm tra !m||!r: đúng thì chạy nhánh sau if.
if(!own())return;const m=model(),r=rpc();if(!m||!r){S.reason='waiting_native_model';return;}
// [VI dòng gốc 12] Kiểm tra S.pending: đúng thì chạy nhánh sau if. | Khai báo biến không gán lại bằng const: p = đọc S.pending
if(S.pending){const p=S.pending;
// [VI dòng gốc 13] Kiểm tra p.kind==='refresh': đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | Kiểm tra m.getFightInfo?.()!==p.list&&m.getCanRef?.()===false: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gán S.pending bằng null | tăng S.confirmed một đơn vị sau khi lấy giá trị
 if(p.kind==='refresh'){if(m.getFightInfo?.()!==p.list&&m.getCanRef?.()===false){S.pending=null;S.confirmed++;S.reason='free_refresh_confirmed';}else{S.reason='waiting_refresh_ack_no_retry';return;}}
// [VI dòng gốc 14] Kiểm tra map()===2391: đúng thì chạy nhánh sau if. | gán p.entered bằng true | gọi W.KVPV?.core?.scene?.renew('daily') để gia hạn quyền đang giữ (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gán S.reason bằng 'native_arena_battle'
 else{if(map()===2391){p.entered=true;W.KVPV?.core?.scene?.renew?.('daily');S.reason='native_arena_battle';return;}
// [VI dòng gốc 15] Khai báo biến không gán lại bằng const: count = gọi Number(m.getRemainCount?.()) để chuyển sang số; list = gọi m.getFightInfo() (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); won = Array.isArray(list) và chỉ đánh giá vế phải khi vế trái truthy: list.some(x=>Number(x?.[2])===p.tier&&Number(x?.[3])===1)
 const count=Number(m.getRemainCount?.()),list=m.getFightInfo?.(),won=Array.isArray(list)&&list.some(x=>Number(x?.[2])===p.tier&&Number(x?.[3])===1);
// [VI dòng gốc 16] Kiểm tra W._Ba?._$a?.SceneUtil?.isCommonScene===true&&(p.entered||(count<p.count&&won&&list!==p.list)): đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gọi release() để nhả quyền điều khiển đang giữ | gán S.pending bằng null | tăng S.confirmed một đơn vị sau khi lấy giá trị
 if(W._Ba?._$a?.SceneUtil?.isCommonScene===true&&(p.entered||(count<p.count&&won&&list!==p.list))){release();S.pending=null;S.confirmed++;S.reason='battle_return_confirmed';}else{W.KVPV?.core?.scene?.renew?.('daily');S.reason='waiting_battle_ack_no_retry';return;}}
// [VI dòng gốc 17] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 18] Kiểm tra !['10228867268946','10228867268941'].includes(actor): đúng thì chạy nhánh sau if. | gán S.reason bằng 'account_not_selected_unmarried' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
if(!eventWindow()){S.reason='waiting_tien_duyen_tac_chien_window';return;}
if(!['10228867268946','10228867268941'].includes(actor)){S.reason='account_not_selected_unmarried';return;}
// [VI dòng gốc 19] Kiểm tra !safe(): đúng thì chạy nhánh sau if. | gán S.reason bằng 'yield_current_activity' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể. | Kiểm tra Date.now()-S.lastAction<5000: đúng thì chạy nhánh sau if.
if(!safe()){S.reason='yield_current_activity';return;}if(Date.now()-S.lastAction<5000)return;
// [VI dòng gốc 20] Kiểm tra !S.queried: đúng thì chạy nhánh sau if. | gán S.queried bằng true | gán S.lastAction bằng Date.now() | gọi r.GetMarryArenaInfo() (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
if(!S.queried){S.queried=true;S.lastAction=Date.now();r.GetMarryArenaInfo?.();r.GetMarryArenaRankInfo?.();r.GetMarryArenaChallengeList?.();S.reason='refreshing_readonly_state';return;}
// [VI dòng gốc 21] Khai báo biến không gán lại bằng const: count = gọi Number(m.getRemainCount?.()) để chuyển sang số; wife = gọi m.getWifeInfo() (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Kiểm tra !Number.isInteger(count)||count<1: đúng thì chạy nhánh sau if. | gán S.reason bằng 'no_available_challenge_turns' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
const count=Number(m.getRemainCount?.()),wife=m.getWifeInfo?.();if(!Number.isInteger(count)||count<1){S.reason='no_available_challenge_turns';return;}if(!Array.isArray(wife)||wife.length<2){S.reason='waiting_couple_data';return;}
// [VI dòng gốc 22] Khai báo biến không gán lại bằng const: list = gọi m.getFightInfo() (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Kiểm tra !Array.isArray(list)||!list.length: đúng thì chạy nhánh sau if. | gán S.reason bằng 'waiting_opponent_list' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
const list=m.getFightInfo?.();if(!Array.isArray(list)||!list.length){S.reason='waiting_opponent_list';return;}
// [VI dòng gốc 23] Khai báo biến không gán lại bằng const: candidates = gọi list.filter(x=>Array.isArray(x)&&Number(x[3])===0&&Number.isInteger(x[2])&&x[2]>=1&&x[2]<=4&&Number.isFinite(x[1])).sort((a,b)=>a[1]-b[1]) để sắp xếp mảng tại chỗ
const candidates=list.filter(x=>Array.isArray(x)&&Number(x[3])===0&&Number.isInteger(x[2])&&x[2]>=1&&x[2]<=4&&Number.isFinite(x[1])).sort((a,b)=>a[1]-b[1]);
// [VI dòng gốc 24] Kiểm tra candidates.length: đúng thì chạy nhánh sau if. | Khai báo biến không gán lại bằng const: tier = đọc candidates[0][2]; entry = đọc W._Ba?._sst?._Cht?.inst nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Kiểm tra typeof entry?.rqEtScene!=='function'||W.KVPV?.core?.scene?.acquire?.('daily','marry-arena')!==true: đúng thì chạy nhánh sau if. | gán S.reason bằng 'waiting_scene_permission'
if(candidates.length){const tier=candidates[0][2],entry=W._Ba?._sst?._Cht?.inst;if(typeof entry?.rqEtScene!=='function'||W.KVPV?.core?.scene?.acquire?.('daily','marry-arena')!==true){S.reason='waiting_scene_permission';return;}
// [VI dòng gốc 25] gán S.lease bằng true | Khai báo biến không gán lại bằng const: stage = đọc W._Ba?._Co?._Mo?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gán S.stageAuto bằng stage?.auto===true | Kiểm tra stage?.auto===true: đúng thì chạy nhánh sau if.
 S.lease=true;const stage=W._Ba?._Co?._Mo?.ins;S.stageAuto=stage?.auto===true;if(stage?.auto===true)stage.auto=false;
// [VI dòng gốc 26] gán S.pending bằng {kind:'battle',tier,count,list,entered:false,at:Date.now()} | gán S.lastAction bằng Date.now() | tăng S.entries một đơn vị sau khi lấy giá trị | gọi entry.rqEtScene(2391, tier, [1]) để gửi yêu cầu vào/ra cảnh qua luồng native
 S.pending={kind:'battle',tier,count,list,entered:false,at:Date.now()};S.lastAction=Date.now();S.entries++;entry.rqEtScene(2391,tier,[1]);S.reason='single_free_turn_battle_requested';return;
// [VI dòng gốc 27] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
}
// [VI dòng gốc 28] Kiểm tra m.getCanRef?.()!==true: đúng thì chạy nhánh sau if. | gán S.reason bằng 'waiting_free_refresh_no_purchase' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
if(m.getCanRef?.()!==true){S.reason='waiting_free_refresh_no_purchase';return;}
// [VI dòng gốc 29] Kiểm tra typeof r.FlushMarryArenaChallengeList!=='function': đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
if(typeof r.FlushMarryArenaChallengeList!=='function')return;
// [VI dòng gốc 30] gán S.pending bằng {kind:'refresh',list,at:Date.now()} | gán S.lastAction bằng Date.now() | tăng S.refreshes một đơn vị sau khi lấy giá trị | gọi r.FlushMarryArenaChallengeList()
S.pending={kind:'refresh',list,at:Date.now()};S.lastAction=Date.now();S.refreshes++;r.FlushMarryArenaChallengeList();S.reason='free_refresh_requested';
// [VI dòng gốc 31] Nhận lỗi bằng e và chạy phần xử lý lỗi. | gán S.error bằng String(e.message||e) | gán S.reason bằng 'error_no_retry'
}catch(e){S.error=String(e.message||e);S.reason='error_no_retry';}}
// [VI dòng gốc 32] Định nghĩa hàm stop; tham số: reason. Mục đích: dừng bộ điều khiển và dọn tài nguyên | Kiểm tra S.timer!==null: đúng thì chạy nhánh sau if. | gọi W.KVPV_V1?.timers?.clearInterval??W.clearInterval(S.timer) | gán S.timer bằng null
function stop(reason){if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;if(reason!=='reload')release();}
function start(){if(!own()){S.reason='actor_mismatch';return status();}if(S.timer===null){S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,1000);tick();}return status();}
function status(){return {enabled:S.timer!==null,reason:S.reason,lastError:S.error,entries:S.entries,freeRefreshes:S.refreshes,confirmed:S.confirmed,remaining:model()?.getRemainCount?.()??null,freeRefresh:model()?.getCanRef?.()===true,pending:S.pending?{kind:S.pending.kind,tier:S.pending.tier,at:S.pending.at}:null,allowKNB:false,selectedAccount:['10228867268946','10228867268941'].includes(actor)};}
W.KVPV_MARRY_ARENA=Object.freeze({start,sync:tick,stop,status,_handoff:()=>({actor,pending:S.pending,lastAction:S.lastAction,entries:S.entries,refreshes:S.refreshes,confirmed:S.confirmed,lease:S.lease,stageAuto:S.stageAuto})});
if(own())start();
// [VI dòng gốc 35] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: })();
})();
// [VI dòng gốc 36] Dòng trống để tách các phần, không có lệnh thực thi.
