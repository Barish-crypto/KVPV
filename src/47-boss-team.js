// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: Private Ma Than / Tinh Than teams; clones yield their activity only for a verified leader invitation. [đóng chú thích]
/* Private Ma Than / Tinh Than teams; clones yield their activity only for a verified leader invitation. */
// [VI dòng gốc 2] chạy ngay hàm bao để tạo phạm vi và khởi tạo phần chức năng bên trong
(() => {
// [VI dòng gốc 3] "use strict" | Khai báo biến không gán lại bằng const: W = window; old = đọc W.KVPV_BOSS_TEAM; carry = gọi old?._handoff(); chức năng nội bộ chưa xác minh từ tên hàm (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gọi old?.stop('reload') để dừng bộ điều khiển và dọn tài nguyên (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
 'use strict';const W=window,old=W.KVPV_BOSS_TEAM,carry=old?._handoff?.();old?.stop?.('reload');
// [VI dòng gốc 4] Khai báo biến không gán lại bằng const: actor = gọi String(W.__KVPV_OWN_ACTOR_ID||'') để chuyển sang chuỗi; same = tính biểu thức carry?.actor===actor
 const actor=String(W.__KVPV_OWN_ACTOR_ID||''),same=carry?.actor===actor;
// [VI dòng gốc 5] Khai báo biến không gán lại bằng const: S = tạo đối tượng gồm enabled, timer, locks, pending, leader, roster, saved, reason, error, refreshAt
 const S={enabled:true,timer:null,locks:new Set(same?carry.locks:[]),pending:same?carry.pending:null,leader:same?carry.leader:null,roster:same?carry.roster:[],saved:same?carry.saved:null,reason:'waiting_boss',error:'',refreshAt:0};
// [VI dòng gốc 6] Khai báo biến không gán lại bằng const: user = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._Ba?._rJ?._O$?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); model = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._Ba?._MT?.the_secret_of_the_stars?._Gvt?.instance nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); rpc = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._Ba?.…
 const user=()=>W._Ba?._rJ?._O$?.ins,model=()=>W._Ba?._MT?.the_secret_of_the_stars?._Gvt?.instance,rpc=()=>W._Ba?._MT?.the_secret_of_the_stars?._jvt?.ins;
// [VI dòng gốc 7] Khai báo biến không gán lại bằng const: scene = tạo hàm với tham số (không có); mỗi lần gọi trả về gọi Number(W._Ba?._$a?.SceneUtil?.curScene) để chuyển sang số; common = tạo hàm với tham số (không có); mỗi lần gọi trả về W._Ba?._$a?.SceneUtil?.isCommonScene===true và chỉ đánh giá vế phải khi vế trái truthy: W._Ba?._$a?._yo?.ins?.isInMission!==true
 const scene=()=>Number(W._Ba?._$a?.SceneUtil?.curScene),common=()=>W._Ba?._$a?.SceneUtil?.isCommonScene===true&&W._Ba?._$a?._yo?.ins?.isInMission!==true;
// [VI dòng gốc 8] Khai báo biến không gán lại bằng const: owned = tạo hàm với tham số (không có); mỗi lần gọi trả về actor&&actor===String(user()?.actorId??'') và chỉ đánh giá vế phải khi vế trái truthy: !W.__KVPV_UNIVERSAL_HALTED
 const owned=()=>actor&&actor===String(user()?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;
// [VI dòng gốc 9] Khai báo biến không gán lại bằng const: rows = tạo hàm với tham số (không có); mỗi lần gọi trả về nếu Array.isArray(model()?.teamPlayerData) thì lấy model().teamPlayerData, ngược lại lấy []
 const rows=()=>Array.isArray(model()?.teamPlayerData)?model().teamPlayerData:[];
// [VI dòng gốc 10] Định nghĩa hàm call; tham số: key, method, ...args | Kiểm tra S.locks.has(key)||typeof rpc()?.[method]!=='function': đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: false. | gọi S.locks.add(key)
 function call(key,method,...args){if(S.locks.has(key)||typeof rpc()?.[method]!=='function')return false;S.locks.add(key);rpc()[method](...args);return true;}
// [VI dòng gốc 11] Định nghĩa hàm refresh; tham số: không có. Mục đích: làm mới dữ liệu theo điều kiện của hàm | Kiểm tra Date.now()<S.refreshAt: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể. | gán S.refreshAt bằng Date.now()+10000
 function refresh(){if(Date.now()<S.refreshAt)return;S.refreshAt=Date.now()+10000;rpc()?.GetSelfStarsSecretTeamInfo?.();}
// [VI dòng gốc 12] Định nghĩa hàm eligible; tham số: map | Kiểm tra map===2711: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: tính biểu thức Number(W._Ba?._Dvt?._Hvt?.ins?.challengePhyStren)>0.
 function eligible(map){if(map===2711)return Number(W._Ba?._Dvt?._Hvt?.ins?.challengePhyStren)>0;
// [VI dòng gốc 13] Kết thúc hàm hiện tại và trả về: map===2371&&Number(model()?.strengthvalue)>0&&model()?.auto!==true và chỉ đánh giá vế phải khi vế trái truthy: model()?.auto!==1.
  return map===2371&&Number(model()?.strengthvalue)>0&&model()?.auto!==true&&model()?.auto!==1;}
// [VI dòng gốc 14] Định nghĩa hàm hold; tham số: không có
 function hold(){
// [VI dòng gốc 15] Kiểm tra !S.saved: đúng thì chạy nhánh sau if. | gán S.saved bằng {stage:W._Ba?._Co?._Mo?.ins?.auto===true,armed:W.KVPV_MODE?.status?.(false)?.autoMaintain===true}
  if(!S.saved)S.saved={stage:W._Ba?._Co?._Mo?.ins?.auto===true,armed:W.KVPV_MODE?.status?.(false)?.autoMaintain===true};
// [VI dòng gốc 16] Khai báo biến không gán lại bằng const: st = đọc W._Ba?._Co?._Mo?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Kiểm tra st: đúng thì chạy nhánh sau if. | gán st.auto bằng false
  const st=W._Ba?._Co?._Mo?.ins;if(st)st.auto=false;
// [VI dòng gốc 17] Kiểm tra W.KVPV_HITRUN1?.status?.(false)?.running||W.KVPV_MODE?.status?.(false)?.autoMaintain: đúng thì chạy nhánh sau if. | gọi W.KVPV_MODE?.stop('priority_private_boss_invitation') để dừng bộ điều khiển và dọn tài nguyên (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  if(W.KVPV_HITRUN1?.status?.(false)?.running||W.KVPV_MODE?.status?.(false)?.autoMaintain)W.KVPV_MODE?.stop?.('priority_private_boss_invitation');
// [VI dòng gốc 18] gọi W.KVPV?.core?.scene?.acquire('combat', 'boss-private-invite') để xin quyền giữ tài nguyên theo bộ điều phối (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  W.KVPV?.core?.scene?.acquire?.('combat','boss-private-invite');
// [VI dòng gốc 19] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
 }
// [VI dòng gốc 20] Định nghĩa hàm restore; tham số: không có | Kiểm tra !S.saved||!common()||S.pending: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể. | Khai báo biến không gán lại bằng const: saved = đọc S.saved
 function restore(){if(!S.saved||!common()||S.pending)return;const saved=S.saved;S.saved=null;
// [VI dòng gốc 21] Kiểm tra saved.stage&&W._Ba?._Co?._Mo?.ins: đúng thì chạy nhánh sau if. | gán W._Ba._Co._Mo.ins.auto bằng true | Kiểm tra saved.armed: đúng thì chạy nhánh sau if. | gọi W.KVPV_MODE?.armTianQuan() để đăng ký bộ theo dõi map để tự bật bộ combat khi vào phó bản phù hợp (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  if(saved.stage&&W._Ba?._Co?._Mo?.ins&&!W.KVPV_EVENT_PRIORITY?.hold?.())W._Ba._Co._Mo.ins.auto=true;if(saved.armed)W.KVPV_MODE?.armTianQuan?.();
// [VI dòng gốc 22] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
 }
// [VI dòng gốc 23] Định nghĩa hàm tick; tham số: không có. Mục đích: xử lý một nhịp kiểm tra | Kiểm tra W.KVPV_ENTRY_POLICY?.manual===true: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể. | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài.
 function tick(){if(W.KVPV_ENTRY_POLICY?.manual===true)return;try{
// [VI dòng gốc 24] Kiểm tra !S.enabled||!owned(): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể. | Kiểm tra W.KVPV_GUILD_BOSS?.active?.(): đúng thì chạy nhánh sau if. | gán S.reason bằng 'guild_boss_priority'
  if(!S.enabled||!owned())return;if(W.KVPV_GUILD_BOSS?.active?.()){S.reason='guild_boss_priority';return;}restore();const peers=W.KVPV_TEAM_COORDINATOR?.status?.()?.accounts??[];
// [VI dòng gốc 25] Kiểm tra peers.length!==4: đúng thì chạy nhánh sau if. | gán S.reason bằng 'waiting_four_known_tool_accounts' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  if(peers.length!==4){S.reason='waiting_four_known_tool_accounts';return;}
// [VI dòng gốc 26] Kiểm tra !S.leader: đúng thì chạy nhánh sau if. | gán S.leader bằng peers[0].actor | gán S.roster bằng peers.map(p=>p.actor)
  if(!S.leader){S.leader=peers[0].actor;S.roster=peers.map(p=>p.actor);}
// [VI dòng gốc 27] Khai báo biến không gán lại bằng const: m = gọi model(); r = gọi rpc() | Kiểm tra !m||!r: đúng thì chạy nhánh sau if. | gán S.reason bằng 'waiting_native_boss_team_model' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  const m=model(),r=rpc();if(!m||!r){S.reason='waiting_native_boss_team_model';return;}
// [VI dòng gốc 28] Khai báo biến không gán lại bằng const: data = gọi rows(); ids = gọi data.map(row=>String(row?.[0])) để biến đổi từng phần tử
  const data=rows(),ids=data.map(row=>String(row?.[0]));
// [VI dòng gốc 29] Kiểm tra actor===S.leader: đúng thì chạy nhánh sau if.
  if(actor===S.leader){
// [VI dòng gốc 30] Kiểm tra ![34,55].includes(scene()): đúng thì chạy nhánh sau if. | Kiểm tra !data.length: đúng thì chạy nhánh sau if. | gán S.leader bằng null | gán S.roster bằng []
   if(![34,55].includes(scene())){if(!data.length){S.leader=null;S.roster=[];}S.reason='leader_waiting_boss_map';return;}
// [VI dòng gốc 31] Kiểm tra Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0): đúng thì chạy nhánh sau if. | gán S.reason bằng 'user_interaction' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
   if(Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)){S.reason='user_interaction';return;}
// [VI dòng gốc 32] Khai báo biến không gán lại bằng const: key = gọi [scene(),m.curmapidScene,m.curMapLvScene,m.curlineScene].join('/')
   const key=[scene(),m.curmapidScene,m.curMapLvScene,m.curlineScene].join('/');
// [VI dòng gốc 33] Kiểm tra !data.length: đúng thì chạy nhánh sau if. | gọi call(key+'/create', 'CreateStarsSecretTeam') | gọi refresh() để làm mới dữ liệu theo điều kiện của hàm | gán S.reason bằng 'waiting_boss_team_create_ack'
   if(!data.length){call(key+'/create','CreateStarsSecretTeam');refresh();S.reason='waiting_boss_team_create_ack';return;}
// [VI dòng gốc 34] Kiểm tra !data.some(row=>String(row?.[0])===actor&&Number(row?.[7])===1): đúng thì chạy nhánh sau if. | gán S.reason bằng 'foreign_boss_leader_preserved' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
   if(!data.some(row=>String(row?.[0])===actor&&Number(row?.[7])===1)){S.reason='foreign_boss_leader_preserved';return;}
// [VI dòng gốc 35] Kiểm tra Number(m.autoAgreeApplyStarsSecretTeam)===1: đúng thì chạy nhánh sau if. | gọi call(key+'/private', 'setAutoAgreeApplyStarsSecretTeam', 0) | gán S.reason bằng 'waiting_private_team_setting' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
   if(Number(m.autoAgreeApplyStarsSecretTeam)===1){call(key+'/private','setAutoAgreeApplyStarsSecretTeam',0);S.reason='waiting_private_team_setting';return;}
// [VI dòng gốc 36] Duyệt từng giá trị trong S.roster.filter(id=>id!==actor&&!ids.includes(id)) bằng const id. | Khai báo biến không gán lại bằng const: id (chưa gán giá trị) | gọi call(key+'/invite/'+id, 'InviteOutMapUserJoinTeam', Number(id))
   for(const id of S.roster.filter(id=>id!==actor&&!ids.includes(id)))call(key+'/invite/'+id,'InviteOutMapUserJoinTeam',Number(id));
// [VI dòng gốc 37] gán S.reason bằng S.roster.every(id=>ids.includes(id))?'private_boss_team_complete':'private_clone_invitations_sent' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
   S.reason=S.roster.every(id=>ids.includes(id))?'private_boss_team_complete':'private_clone_invitations_sent';return;
// [VI dòng gốc 38] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 39] Kiểm tra S.pending: đúng thì chạy nhánh sau if.
  if(S.pending){
// [VI dòng gốc 40] Khai báo biến không gán lại bằng const: p = đọc S.pending; atBoss = tính biểu thức scene()===(p.map===2711?55:34); joined = atBoss&&ids.includes(actor)&&ids.includes(p.leader)&&Number(m.curmapidScene)===p.map&&Number(m.curMapLvScene)===p.level và chỉ đánh giá vế phải khi vế trái truthy: Number(m.curlineScene)===p.line
   const p=S.pending,atBoss=scene()===(p.map===2711?55:34),joined=atBoss&&ids.includes(actor)&&ids.includes(p.leader)&&Number(m.curmapidScene)===p.map&&Number(m.curMapLvScene)===p.level&&Number(m.curlineScene)===p.line;
// [VI dòng gốc 41] Kiểm tra joined: đúng thì chạy nhánh sau if. | gán S.pending bằng null | Kiểm tra W.KVPV?.core?.scene?.status?.()?.tag==='boss-private-invite': đúng thì chạy nhánh sau if. | gọi W.KVPV.core.scene.release('combat') để nhả quyền điều khiển đang giữ (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
   if(joined){S.pending=null;if(W.KVPV?.core?.scene?.status?.()?.tag==='boss-private-invite')W.KVPV.core.scene.release?.('combat');S.reason='private_boss_team_join_confirmed';return;}
// [VI dòng gốc 42] gọi hold() | Kiểm tra data.length&&!ids.includes(p.leader): đúng thì chạy nhánh sau if.
   hold();if(data.length&&!ids.includes(p.leader)){
// [VI dòng gốc 43] Kiểm tra !p.oldTeamLeaveSent&&typeof r.ExitStarsSecretTeam==='function': đúng thì chạy nhánh sau if. | gán p.oldTeamLeaveSent bằng true | gọi r.ExitStarsSecretTeam() | gán S.reason bằng 'waiting_old_boss_team_exit_ack'
    if(!p.oldTeamLeaveSent&&typeof r.ExitStarsSecretTeam==='function'){p.oldTeamLeaveSent=true;r.ExitStarsSecretTeam();}S.reason='waiting_old_boss_team_exit_ack';return;
// [VI dòng gốc 44] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
   }
// [VI dòng gốc 45] Kiểm tra user()?.isDead===true: đúng thì chạy nhánh sau if. | gán S.reason bằng 'waiting_revive_for_boss_invitation' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
   if(user()?.isDead===true){S.reason='waiting_revive_for_boss_invitation';return;}
// [VI dòng gốc 46] Kiểm tra !common()&&!(atBoss&&Number(m.curmapidScene)===p.map&&Number(m.curMapLvScene)===p.level&&Number(m.curlineScene)===p.line): đúng thì chạy nhánh sau if.
   if(!common()&&!(atBoss&&Number(m.curmapidScene)===p.map&&Number(m.curMapLvScene)===p.level&&Number(m.curlineScene)===p.line)){
// [VI dòng gốc 47] Kiểm tra !p.exitSent&&typeof W._Ba?._sst?._Cht?.inst?.rqEtScene==='function': đúng thì chạy nhánh sau if. | gán p.exitSent bằng true | gọi W._Ba._sst._Cht.inst.rqEtScene(0) để gửi yêu cầu vào/ra cảnh qua luồng native
    if(!p.exitSent&&typeof W._Ba?._sst?._Cht?.inst?.rqEtScene==='function'){p.exitSent=true;W._Ba._sst._Cht.inst.rqEtScene(0);}
// [VI dòng gốc 48] gán S.reason bằng 'waiting_current_activity_exit_ack' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    S.reason='waiting_current_activity_exit_ack';return;
// [VI dòng gốc 49] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
   }
// [VI dòng gốc 50] Khai báo biến không gán lại bằng const: ordinary = đọc W._Ba?._cm?._q3t?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
   const ordinary=W._Ba?._cm?._q3t?.ins;
// [VI dòng gốc 51] Kiểm tra ordinary?.getHasTeams?.()===true: đúng thì chạy nhánh sau if. | Khai báo biến không gán lại bằng const: type = gọi Number(ordinary.teamtype) để chuyển sang số; leave = đọc W._Ba?._cm?._u3t?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
   if(ordinary?.getHasTeams?.()===true){const type=Number(ordinary.teamtype),leave=W._Ba?._cm?._u3t?.ins;
// [VI dòng gốc 52] Kiểm tra !p.roomLeaveSent&&Number.isSafeInteger(type)&&type>0&&typeof leave?.exitSerAreRoom==='function': đúng thì chạy nhánh sau if. | gán p.roomLeaveSent bằng true | gọi leave.exitSerAreRoom([type])
    if(!p.roomLeaveSent&&Number.isSafeInteger(type)&&type>0&&typeof leave?.exitSerAreRoom==='function'){p.roomLeaveSent=true;leave.exitSerAreRoom([type]);}
// [VI dòng gốc 53] gán S.reason bằng 'waiting_old_dungeon_team_exit_ack' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    S.reason='waiting_old_dungeon_team_exit_ack';return;
// [VI dòng gốc 54] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
   }
// [VI dòng gốc 55] Kiểm tra !p.joinSent&&eligible(p.map)&&typeof r.checkCanEnterSenceTeam==='function': đúng thì chạy nhánh sau if. | gán p.joinSent bằng true | gọi r.checkCanEnterSenceTeam([p.map,p.level,p.line,p.team])
   if(!p.joinSent&&eligible(p.map)&&typeof r.checkCanEnterSenceTeam==='function'){p.joinSent=true;r.checkCanEnterSenceTeam([p.map,p.level,p.line,p.team]);}
// [VI dòng gốc 56] gọi refresh() để làm mới dữ liệu theo điều kiện của hàm | gán S.reason bằng 'waiting_native_boss_join_ack' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
   refresh();S.reason='waiting_native_boss_join_ack';return;
// [VI dòng gốc 57] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 58] Chú thích gốc của tác giả; không được thực thi. Nội dung: Native inviter row: [actor,name,map,level,line,teamId,...]. Only accept the elected main.
  // Native inviter row: [actor,name,map,level,line,teamId,...]. Only accept the elected main.
// [VI dòng gốc 59] Duyệt từng giá trị trong [657,307] bằng const feature. | Khai báo biến không gán lại bằng const: feature (chưa gán giá trị) | Duyệt từng giá trị trong m.getInvitedList?.(feature)??[] bằng const row. | Khai báo biến không gán lại bằng const: row (chưa gán giá trị)
  for(const feature of [657,307])for(const row of m.getInvitedList?.(feature)??[]){
// [VI dòng gốc 60] Kiểm tra String(row?.[0])!==S.leader||![2371,2711].includes(Number(row?.[2])): đúng thì chạy nhánh sau if. | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
   if(String(row?.[0])!==S.leader||![2371,2711].includes(Number(row?.[2])))continue;
// [VI dòng gốc 61] Khai báo biến không gán lại bằng const: map = gọi Number(row[2]) để chuyển sang số; level = gọi Number(row[3]) để chuyển sang số; line = gọi Number(row[4]) để chuyển sang số; team = gọi Number(row[5]) để chuyển sang số
   const map=Number(row[2]),level=Number(row[3]),line=Number(row[4]),team=Number(row[5]);
// [VI dòng gốc 62] Kiểm tra !Number.isSafeInteger(level)||level<=0||!Number.isSafeInteger(line)||line<0||!Number.isSafeInteger(team)||team<=0||!eligible(map): đúng thì chạy nhánh sau if. | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
   if(!Number.isSafeInteger(level)||level<=0||!Number.isSafeInteger(line)||line<0||!Number.isSafeInteger(team)||team<=0||!eligible(map))continue;
// [VI dòng gốc 63] Khai báo biến không gán lại bằng const: key = tính biểu thức 'accept/'+map+'/'+level+'/'+line+'/'+team
   const key='accept/'+map+'/'+level+'/'+line+'/'+team;
// [VI dòng gốc 64] Kiểm tra S.locks.has(key): đúng thì chạy nhánh sau if. | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo. | gọi S.locks.add(key) | gán S.pending bằng {leader:S.leader,map,level,line,team,exitSent:false,joinSent:false}
   if(S.locks.has(key))continue;S.locks.add(key);S.pending={leader:S.leader,map,level,line,team,exitSent:false,joinSent:false};
// [VI dòng gốc 65] gọi hold() | gán S.reason bằng 'private_boss_invitation_priority' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
   hold();S.reason='private_boss_invitation_priority';return;
// [VI dòng gốc 66] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 67] Kiểm tra ![34,55].includes(scene())&&!data.length: đúng thì chạy nhánh sau if. | gán S.leader bằng null | gán S.roster bằng [] | gán S.reason bằng 'waiting_private_main_invitation'
  if(![34,55].includes(scene())&&!data.length){S.leader=null;S.roster=[];}S.reason='waiting_private_main_invitation';
// [VI dòng gốc 68] Nhận lỗi bằng e và chạy phần xử lý lỗi. | gán S.error bằng String(e) | gán S.reason bằng 'error_no_retry'
 }catch(e){S.error=String(e);S.reason='error_no_retry';}}
// [VI dòng gốc 69] Định nghĩa hàm stop; tham số: reason='manual'. Mục đích: dừng bộ điều khiển và dọn tài nguyên | gán S.enabled bằng false | Kiểm tra reason!=='reload'&&W.KVPV?.core?.scene?.status?.()?.tag==='boss-private-invite': đúng thì chạy nhánh sau if. | gọi W.KVPV.core.scene.release('combat') để nhả quyền điều khiển đang giữ (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
 function stop(reason='manual'){S.enabled=false;if(reason!=='reload'&&W.KVPV?.core?.scene?.status?.()?.tag==='boss-private-invite')W.KVPV.core.scene.release?.('combat');if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);if(reason!=='reload')restore();}
// [VI dòng gốc 70] gán W.KVPV_BOSS_TEAM bằng Object.freeze({sync:tick,stop,ownsBossTeams:()=>S.enabled,priority:()=>S.enabled&&(!!S.pending||W.KVPV_GUILD_BOSS?.priority?.()===true),status:()=>({enabled:S.enabled,leader:S.lead…
 W.KVPV_BOSS_TEAM=Object.freeze({sync:tick,stop,ownsBossTeams:()=>S.enabled,priority:()=>S.enabled&&(!!S.pending||W.KVPV_GUILD_BOSS?.priority?.()===true),status:()=>({enabled:S.enabled,leader:S.leader,roster:S.roster,pending:S.pending,reason:S.reason,lastError:S.error,allowKNB:false}),
// [VI dòng gốc 71] Thuộc tính _handoff: tạo hàm với tham số (không có); mỗi lần gọi trả về tạo đối tượng gồm actor, locks, pending, leader, roster, saved | Thuộc tính actor: dùng biến cùng tên | Thuộc tính locks: tạo mảng gồm 1 vị trí: [...S.locks] | Thuộc tính pending: đọc S.pending
  _handoff:()=>({actor,locks:[...S.locks],pending:S.pending,leader:S.leader,roster:S.roster,saved:S.saved})});
// [VI dòng gốc 72] gán S.timer bằng (W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,500) | gọi tick() để xử lý một nhịp kiểm tra
 S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,500);tick();
// [VI dòng gốc 73] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: })();
})();
// [VI dòng gốc 74] Dòng trống để tách các phần, không có lệnh thực thi.
