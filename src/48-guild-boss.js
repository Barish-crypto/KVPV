// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: Native Fight Team Boss rally: event 6763 + server inspireEndTime, map 3301.
/* Native Fight Team Boss rally: event 6763 + server inspireEndTime, map 3301.
 * Entry is the free manual challenge action; this module never purchases inspiration. */
// [VI dòng gốc 3] chạy ngay hàm bao để tạo phạm vi và khởi tạo phần chức năng bên trong
(() => {
// [VI dòng gốc 4] "use strict" | Khai báo biến không gán lại bằng const: W = window; old = đọc W.KVPV_GUILD_BOSS; carry = gọi old?._handoff(); chức năng nội bộ chưa xác minh từ tên hàm (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gọi old?.stop('reload') để dừng bộ điều khiển và dọn tài nguyên (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
 'use strict';const W=window,old=W.KVPV_GUILD_BOSS,carry=old?._handoff?.();old?.stop?.('reload');
// [VI dòng gốc 5] Khai báo biến không gán lại bằng const: actor = gọi String(W.__KVPV_OWN_ACTOR_ID||'') để chuyển sang chuỗi; same = tính biểu thức carry?.actor===actor
 const actor=String(W.__KVPV_OWN_ACTOR_ID||''),same=carry?.actor===actor;
// [VI dòng gốc 6] Khai báo biến không gán lại bằng const: S = tạo đối tượng gồm enabled, timer, busy, pending, saved, seen, reason, error, refreshAt, listener
 const S={enabled:true,timer:null,busy:false,pending:same?carry.pending:null,saved:same?carry.saved:null,seen:new Set(same?carry.seen:[]),reason:'waiting_team_inspiration',error:'',refreshAt:0,listener:null};
// [VI dòng gốc 7] Khai báo biến không gán lại bằng const: model = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._Ba?._a1?._Rvn?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); team = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._Ba?._a1?._h1?.inst nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); user = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._Ba?._rJ?._O$?.ins nếu đối tượng …
 const model=()=>W._Ba?._a1?._Rvn?.ins,team=()=>W._Ba?._a1?._h1?.inst,user=()=>W._Ba?._rJ?._O$?.ins;
// [VI dòng gốc 8] Khai báo biến không gán lại bằng const: scene = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W.KVPV?.core?.scene nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); map = tạo hàm với tham số (không có); mỗi lần gọi trả về gọi Number(W._C?._Mn?._Cn?.currentID??W._Ba?._$a?._yo?.ins?.intoSce?.[0]) để chuyển sang số
 const scene=()=>W.KVPV?.core?.scene,map=()=>Number(W._C?._Mn?._Cn?.currentID??W._Ba?._$a?._yo?.ins?.intoSce?.[0]);
// [VI dòng gốc 9] Khai báo biến không gán lại bằng const: common = tạo hàm với tham số (không có); mỗi lần gọi trả về W._Ba?._$a?.SceneUtil?.isCommonScene===true và chỉ đánh giá vế phải khi vế trái truthy: W._Ba?._$a?._yo?.ins?.isInMission!==true
 const common=()=>W._Ba?._$a?.SceneUtil?.isCommonScene===true&&W._Ba?._$a?._yo?.ins?.isInMission!==true;
// [VI dòng gốc 10] Khai báo biến không gán lại bằng const: owned = tạo hàm với tham số (không có); mỗi lần gọi trả về actor&&actor===String(user()?.actorId??'') và chỉ đánh giá vế phải khi vế trái truthy: !W.__KVPV_UNIVERSAL_HALTED
 const owned=()=>actor&&actor===String(user()?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;
// [VI dòng gốc 11] Định nghĩa hàm data; tham số: không có | Khai báo biến không gán lại bằng const: m = gọi model(); t = gọi team(); id = gọi String(t?.getMyFightTeamId?.()??'') để chuyển sang chuỗi; until = gọi Number(m?.inspireEndTime) để chuyển sang số; now = gọi Number(W._Sa?.svrTime) để chuyển sang số; left = gọi Number(m?.leftFightTm) để chuyển sang số; layer = gọi Number(m?.curTeamPassLayer) để chuyển sang số; max = gọi Number(W._ft?._uph?.ins?.getMaxLayer?.()) để chuyển sang số
 function data(){const m=model(),t=team(),id=String(t?.getMyFightTeamId?.()??''),until=Number(m?.inspireEndTime),now=Number(W._Sa?.svrTime),left=Number(m?.leftFightTm),layer=Number(m?.curTeamPassLayer),max=Number(W._ft?._uph?.ins?.getMaxLayer?.());
// [VI dòng gốc 12] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm team, key, until, hasTeam, live, canFight, finished.
  return {team:id,key:id+'/'+until+'/'+layer,until,hasTeam:t?.hasFightTeam?.()===true&&id!==''&&id!=='0',live:Number.isFinite(now)&&Number.isFinite(until)&&until>now,
// [VI dòng gốc 13] Thuộc tính canFight: Number.isFinite(left)&&left>0&&Number.isFinite(layer)&&Number.isFinite(max) và chỉ đánh giá vế phải khi vế trái truthy: layer<max | Thuộc tính finished: Number.isFinite(left)&&left<=0 hoặc dùng vế phải khi vế trái falsy: Number.isFinite(layer)&&Number.isFinite(max)&&layer>=max
    canFight:Number.isFinite(left)&&left>0&&Number.isFinite(layer)&&Number.isFinite(max)&&layer<max,finished:Number.isFinite(left)&&left<=0||Number.isFinite(layer)&&Number.isFinite(max)&&layer>=max};}
// [VI dòng gốc 14] Định nghĩa hàm release; tham số: không có. Mục đích: nhả quyền điều khiển đang giữ | Kiểm tra scene()?.status?.()?.tag==='guild-boss-priority': đúng thì chạy nhánh sau if. | gọi scene()?.release('combat') để nhả quyền điều khiển đang giữ (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
 function release(){if(scene()?.status?.()?.tag==='guild-boss-priority')scene()?.release?.('combat');}
// [VI dòng gốc 15] Định nghĩa hàm hold; tham số: không có | Kiểm tra !S.saved: đúng thì chạy nhánh sau if. | gán S.saved bằng {stage:W._Ba?._Co?._Mo?.ins?.auto===true,armed:W.KVPV_MODE?.status?.(false)?.autoMaintain===true}
 function hold(){if(!S.saved)S.saved={stage:W._Ba?._Co?._Mo?.ins?.auto===true,armed:W.KVPV_MODE?.status?.(false)?.autoMaintain===true};
// [VI dòng gốc 16] Kiểm tra W._Ba?._Co?._Mo?.ins: đúng thì chạy nhánh sau if. | gán W._Ba._Co._Mo.ins.auto bằng false
  if(W._Ba?._Co?._Mo?.ins)W._Ba._Co._Mo.ins.auto=false;
// [VI dòng gốc 17] Kiểm tra W.KVPV_MODE?.status?.(false)?.autoMaintain||W.KVPV_HITRUN1?.status?.(false)?.running: đúng thì chạy nhánh sau if. | gọi W.KVPV_MODE?.stop('fight_team_boss_inspiration_priority') để dừng bộ điều khiển và dọn tài nguyên (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  if(W.KVPV_MODE?.status?.(false)?.autoMaintain||W.KVPV_HITRUN1?.status?.(false)?.running)W.KVPV_MODE?.stop?.('fight_team_boss_inspiration_priority');
// [VI dòng gốc 18] gọi scene()?.acquire('combat', 'guild-boss-priority') để xin quyền giữ tài nguyên theo bộ điều phối (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gọi scene()?.renew('combat') để gia hạn quyền đang giữ (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  scene()?.acquire?.('combat','guild-boss-priority');scene()?.renew?.('combat');
// [VI dòng gốc 19] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
 }
// [VI dòng gốc 20] Định nghĩa hàm restore; tham số: không có | Kiểm tra S.pending||!S.saved||!common(): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể. | Khai báo biến không gán lại bằng const: saved = đọc S.saved
 function restore(){if(S.pending||!S.saved||!common())return;const saved=S.saved;S.saved=null;release();
// [VI dòng gốc 21] Kiểm tra saved.stage&&W._Ba?._Co?._Mo?.ins: đúng thì chạy nhánh sau if. | gán W._Ba._Co._Mo.ins.auto bằng true | Kiểm tra saved.armed: đúng thì chạy nhánh sau if. | gọi W.KVPV_MODE?.armTianQuan() để đăng ký bộ theo dõi map để tự bật bộ combat khi vào phó bản phù hợp (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  if(saved.stage&&W._Ba?._Co?._Mo?.ins&&!W.KVPV_EVENT_PRIORITY?.hold?.())W._Ba._Co._Mo.ins.auto=true;if(saved.armed)W.KVPV_MODE?.armTianQuan?.();}
// [VI dòng gốc 22] Định nghĩa hàm tick; tham số: không có. Mục đích: xử lý một nhịp kiểm tra | Kiểm tra W.KVPV_ENTRY_POLICY?.manual===true: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể. | Kiểm tra S.busy||!S.enabled: đúng thì chạy nhánh sau if.
 function tick(){if(W.KVPV_ENTRY_POLICY?.manual===true)return;if(S.busy||!S.enabled)return;S.busy=true;try{
// [VI dòng gốc 23] Kiểm tra !owned(): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể. | gọi restore() | Khai báo biến không gán lại bằng const: d = gọi data(); m = gọi model(); rpc = đọc W._Ba?._sst?._Cht?.inst nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  if(!owned())return;restore();const d=data(),m=model(),rpc=W._Ba?._sst?._Cht?.inst;
// [VI dòng gốc 24] Kiểm tra !S.pending: đúng thì chạy nhánh sau if.
  if(!S.pending){
// [VI dòng gốc 25] Kiểm tra !d.hasTeam: đúng thì chạy nhánh sau if. | gán S.reason bằng 'not_in_fight_team' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
   if(!d.hasTeam){S.reason='not_in_fight_team';return;}
// [VI dòng gốc 26] Kiểm tra Date.now()>=S.refreshAt: đúng thì chạy nhánh sau if. | gán S.refreshAt bằng Date.now()+30000 | gọi W._Ba?._a1?._qvn?.inst?.getFTBossInfo() (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
   if(Date.now()>=S.refreshAt){S.refreshAt=Date.now()+30000;W._Ba?._a1?._qvn?.inst?.getFTBossInfo?.();}
// [VI dòng gốc 27] Kiểm tra !d.live||!d.canFight||S.seen.has(d.key): đúng thì chạy nhánh sau if. | gán S.reason bằng 'waiting_team_inspiration' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
   if(!d.live||!d.canFight||S.seen.has(d.key)){S.reason='waiting_team_inspiration';return;}
// [VI dòng gốc 28] gọi S.seen.add(d.key) | gán S.pending bằng {key:d.key,team:d.team,until:d.until,at:Date.now(),entered:map()===3301,exitSent:false,enterSent:false,nativeAuto:m?.c_isAutoIn===true}
   S.seen.add(d.key);S.pending={key:d.key,team:d.team,until:d.until,at:Date.now(),entered:map()===3301,exitSent:false,enterSent:false,nativeAuto:m?.c_isAutoIn===true};
// [VI dòng gốc 29] Chú thích gốc của tác giả; không được thực thi. Nội dung: Native auto-entry already reacts to 6763; do not become a second sender.
   // Native auto-entry already reacts to 6763; do not become a second sender.
// [VI dòng gốc 30] Kiểm tra S.pending.nativeAuto: đúng thì chạy nhánh sau if. | gán S.pending.enterSent bằng true
   if(S.pending.nativeAuto)S.pending.enterSent=true;
// [VI dòng gốc 31] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 32] Khai báo biến không gán lại bằng const: p = đọc S.pending
  const p=S.pending;
// [VI dòng gốc 33] Kiểm tra !d.hasTeam||d.team!==p.team: đúng thì chạy nhánh sau if. | gán S.reason bằng 'fight_team_changed_no_entry' | Kiểm tra common()&&!p.enterSent: đúng thì chạy nhánh sau if. | gán S.pending bằng null
  if(!d.hasTeam||d.team!==p.team){S.reason='fight_team_changed_no_entry';if(common()&&!p.enterSent){S.pending=null;restore();}return;}
// [VI dòng gốc 34] Kiểm tra map()===3301: đúng thì chạy nhánh sau if. | gán p.entered bằng true | gọi scene()?.renew('combat') để gia hạn quyền đang giữ (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gán S.reason bằng 'fighting_team_boss'
  if(map()===3301){p.entered=true;scene()?.renew?.('combat');S.reason='fighting_team_boss';
// [VI dòng gốc 35] Kiểm tra (d.finished||p.battleEnded)&&!p.endExitSent&&typeof rpc?.rqEtScene==='function': đúng thì chạy nhánh sau if. | gán p.endExitSent bằng true | gọi rpc.rqEtScene(0) để gửi yêu cầu vào/ra cảnh qua luồng native | gán S.reason bằng 'waiting_team_boss_return_ack'
   if((d.finished||p.battleEnded)&&!p.endExitSent&&typeof rpc?.rqEtScene==='function'){p.endExitSent=true;rpc.rqEtScene(0);S.reason='waiting_team_boss_return_ack';}return;
// [VI dòng gốc 36] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 37] Kiểm tra p.entered: đúng thì chạy nhánh sau if. | Kiểm tra common(): đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gán S.pending bằng null | gọi restore()
  if(p.entered){if(common()){S.pending=null;restore();release();S.reason='team_boss_completed_resume';}else S.reason='waiting_team_boss_return_ack';return;}
// [VI dòng gốc 38] Kiểm tra p.nativeAuto: đúng thì chạy nhánh sau if. | gán S.reason bằng 'waiting_native_auto_entry_ack' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  if(p.nativeAuto){S.reason='waiting_native_auto_entry_ack';return;}
// [VI dòng gốc 39] gọi hold()
  hold();
// [VI dòng gốc 40] Kiểm tra user()?.isDead===true: đúng thì chạy nhánh sau if. | gán S.reason bằng 'waiting_revive_for_team_boss' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  if(user()?.isDead===true){S.reason='waiting_revive_for_team_boss';return;}
// [VI dòng gốc 41] Kiểm tra !common(): đúng thì chạy nhánh sau if.
  if(!common()){
// [VI dòng gốc 42] Kiểm tra !p.exitSent&&typeof rpc?.rqEtScene==='function': đúng thì chạy nhánh sau if. | gán p.exitSent bằng true | gọi rpc.rqEtScene(0) để gửi yêu cầu vào/ra cảnh qua luồng native | gán S.reason bằng 'waiting_current_activity_exit_ack'
   if(!p.exitSent&&typeof rpc?.rqEtScene==='function'){p.exitSent=true;rpc.rqEtScene(0);}S.reason='waiting_current_activity_exit_ack';return;
// [VI dòng gốc 43] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 44] Kiểm tra !d.live||!d.canFight: đúng thì chạy nhánh sau if. | gán S.pending bằng null | gọi restore() | gán S.reason bằng 'team_inspiration_expired_no_entry'
  if(!d.live||!d.canFight){S.pending=null;restore();S.reason='team_inspiration_expired_no_entry';return;}
// [VI dòng gốc 45] Khai báo biến không gán lại bằng const: ordinary = đọc W._Ba?._cm?._q3t?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  const ordinary=W._Ba?._cm?._q3t?.ins;
// [VI dòng gốc 46] Kiểm tra ordinary?.getHasTeams?.()===true: đúng thì chạy nhánh sau if. | Khai báo biến không gán lại bằng const: type = gọi Number(ordinary.teamtype) để chuyển sang số; rooms = đọc W._Ba?._cm?._u3t?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  if(ordinary?.getHasTeams?.()===true){const type=Number(ordinary.teamtype),rooms=W._Ba?._cm?._u3t?.ins;
// [VI dòng gốc 47] Kiểm tra !p.roomLeaveSent&&Number.isSafeInteger(type)&&type>0&&typeof rooms?.exitSerAreRoom==='function': đúng thì chạy nhánh sau if. | gán p.roomLeaveSent bằng true | gọi rooms.exitSerAreRoom([type])
   if(!p.roomLeaveSent&&Number.isSafeInteger(type)&&type>0&&typeof rooms?.exitSerAreRoom==='function'){p.roomLeaveSent=true;rooms.exitSerAreRoom([type]);}
// [VI dòng gốc 48] gán S.reason bằng 'waiting_old_room_exit_ack' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
   S.reason='waiting_old_room_exit_ack';return;
// [VI dòng gốc 49] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 50] Kiểm tra !p.enterSent&&typeof rpc?.rqEtScene==='function': đúng thì chạy nhánh sau if. | gán p.enterSent bằng true | gọi rpc.rqEtScene(3301) để gửi yêu cầu vào/ra cảnh qua luồng native
  if(!p.enterSent&&typeof rpc?.rqEtScene==='function'){p.enterSent=true;rpc.rqEtScene(3301);}
// [VI dòng gốc 51] gán S.reason bằng Date.now()-p.at>30000?'team_boss_entry_timeout_no_retry':'waiting_team_boss_entry_ack'
  S.reason=Date.now()-p.at>30000?'team_boss_entry_timeout_no_retry':'waiting_team_boss_entry_ack';
// [VI dòng gốc 52] Nhận lỗi bằng e và chạy phần xử lý lỗi. | gán S.error bằng String(e) | gán S.reason bằng 'error_no_retry' | gán S.busy bằng false
 }catch(e){S.error=String(e);S.reason='error_no_retry';}finally{S.busy=false;}}
// [VI dòng gốc 53] Định nghĩa hàm stop; tham số: reason='manual'. Mục đích: dừng bộ điều khiển và dọn tài nguyên | gán S.enabled bằng false | Kiểm tra S.timer!==null: đúng thì chạy nhánh sau if. | gọi W.KVPV_V1?.timers?.clearInterval??W.clearInterval(S.timer)
 function stop(reason='manual'){S.enabled=false;if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);
// [VI dòng gốc 54] Duyệt từng giá trị trong [6763,6762,6765] bằng const id. | Khai báo biến không gán lại bằng const: id (chưa gán giá trị) | gọi W._Sa?.notify?.off(id, S, S.listener) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gọi W._Sa?.notify?.off(5112, S, S.endListener) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  for(const id of [6763,6762,6765])W._Sa?.notify?.off?.(id,S,S.listener);W._Sa?.notify?.off?.(5112,S,S.endListener);if(reason!=='reload'){release();restore();}}
// [VI dòng gốc 55] gán S.listener bằng ()=>tick() | Duyệt từng giá trị trong [6763,6762,6765] bằng const id. | Khai báo biến không gán lại bằng const: id (chưa gán giá trị) | gọi W._Sa?.notify?.on(id, S, S.listener) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
 S.listener=()=>tick();for(const id of [6763,6762,6765])W._Sa?.notify?.on?.(id,S,S.listener);
// [VI dòng gốc 56] Chú thích gốc của tác giả; không được thực thi. Nội dung: Native battle end is only evidence for the current Fight Team Boss scene.
 // Native battle end is only evidence for the current Fight Team Boss scene.
// [VI dòng gốc 57] Khai báo biến không gán lại bằng const: ended = tạo hàm với tham số (không có) | Kiểm tra map()===3301&&S.pending: đúng thì chạy nhánh sau if. | gán S.pending.battleEnded bằng true | gọi tick() để xử lý một nhịp kiểm tra
 const ended=()=>{if(map()===3301&&S.pending)S.pending.battleEnded=true;tick();};
// [VI dòng gốc 58] gọi W._Sa?.notify?.on(5112, S, ended) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
 W._Sa?.notify?.on?.(5112,S,ended);
// [VI dòng gốc 59] gán W.KVPV_GUILD_BOSS bằng Object.freeze({sync:tick,stop,active:()=>S.enabled&&!!S.pending,priority:()=>S.enabled&&!!S.pending&&!S.pending.entered, status:()=>({enabled:S.enabled,reason:S.reason,pending:S.pe…
 W.KVPV_GUILD_BOSS=Object.freeze({sync:tick,stop,active:()=>S.enabled&&!!S.pending,priority:()=>S.enabled&&!!S.pending&&!S.pending.entered,
// [VI dòng gốc 60] Thuộc tính status: tạo hàm với tham số (không có); mỗi lần gọi trả về tạo đối tượng gồm enabled, reason, pending, lastError, allowKNB | Thuộc tính enabled: đọc S.enabled | Thuộc tính reason: đọc S.reason | Thuộc tính pending: đọc S.pending
  status:()=>({enabled:S.enabled,reason:S.reason,pending:S.pending,lastError:S.error,allowKNB:false}),_handoff:()=>({actor,pending:S.pending,saved:S.saved,seen:[...S.seen]})});
// [VI dòng gốc 61] Chú thích gốc của tác giả; không được thực thi. Nội dung: Keep the exact native battle-end listener for teardown.
 // Keep the exact native battle-end listener for teardown.
// [VI dòng gốc 62] gán S.endListener bằng ended
 S.endListener=ended;
// [VI dòng gốc 63] gán S.timer bằng (W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,500) | gọi tick() để xử lý một nhịp kiểm tra
 S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,500);tick();
// [VI dòng gốc 64] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: })();
})();
// [VI dòng gốc 65] Dòng trống để tách các phần, không có lệnh thực thi.
