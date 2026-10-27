// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: Active tool tabs elect the strongest actor; native room actions wait for the exact roster.
/* Active tool tabs elect the strongest actor; native room actions wait for the exact roster.
 * BroadcastChannel plus bounded native-host observations across profiles; no public invitations or commands. */
// [VI dòng gốc 3] chạy ngay hàm bao để tạo phạm vi và khởi tạo phần chức năng bên trong
(() => {
// [VI dòng gốc 4] "use strict" | Khai báo biến không gán lại bằng const: W = window; old = đọc W.KVPV_TEAM_COORDINATOR; carry = gọi old?._handoff(); chức năng nội bộ chưa xác minh từ tên hàm (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gọi old?.stop() để dừng bộ điều khiển và dọn tài nguyên (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
 'use strict';const W=window,old=W.KVPV_TEAM_COORDINATOR,carry=old?._handoff?.();old?.stop?.();
// [VI dòng gốc 5] Khai báo biến không gán lại bằng const: actor = gọi String(W.__KVPV_OWN_ACTOR_ID||'') để chuyển sang chuỗi; same = tính biểu thức carry?.actor===actor
 const actor=String(W.__KVPV_OWN_ACTOR_ID||''),same=carry?.actor===actor;
// [VI dòng gốc 6] Khai báo biến không gán lại bằng const: S = tạo đối tượng gồm enabled, timer, channel, peers, session, locks, relayAt, reason, error, born, seenBattle, joinedRoom, hook
 const S={enabled:true,timer:null,channel:null,peers:new Map(),session:same?carry.session:null,locks:new Set(same?carry.locks:[]),relayAt:0,reason:'discovering_accounts',error:'',born:Date.now(),seenBattle:same?carry.seenBattle:false,joinedRoom:same?carry.joinedRoom:null,hook:null};
// [VI dòng gốc 7] Khai báo biến không gán lại bằng const: user = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._Ba?._rJ?._O$?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); party = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._Ba?._cm?._q3t?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); rpc = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._Ba?._cm?._u3t?.ins nếu đối tượng t…
 const user=()=>W._Ba?._rJ?._O$?.ins,party=()=>W._Ba?._cm?._q3t?.ins,rpc=()=>W._Ba?._cm?._u3t?.ins;
// [VI dòng gốc 8] Khai báo biến không gán lại bằng const: owned = tạo hàm với tham số (không có); mỗi lần gọi trả về actor&&actor===String(user()?.actorId??'') và chỉ đánh giá vế phải khi vế trái truthy: !W.__KVPV_UNIVERSAL_HALTED
 const owned=()=>actor&&actor===String(user()?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;
// [VI dòng gốc 9] Khai báo biến không gán lại bằng const: day = tạo hàm với tham số (không có); mỗi lần gọi trả về W.KVPV_DAILY_CLOCK?.key?.() hoặc dùng vế phải khi vế trái là null/undefined: new Date(Date.now()+2*3600000).toISOString().slice(0,10)
 const day=()=>W.KVPV_DAILY_CLOCK?.key?.()??new Date(Date.now()+2*3600000).toISOString().slice(0,10);
// [VI dòng gốc 10] Khai báo biến không gán lại bằng const: defs = tạo mảng gồm 2 vị trí: [{type:2,map:2091,model:()=>W._Ba?._cm?._vJ?.ins},{type:6,map:2702,model:()=>W._Ba?._n4t?._t4t?.ins}]
 const defs=[{type:2,map:2091,model:()=>W._Ba?._cm?._vJ?.ins},{type:6,map:2702,model:()=>W._Ba?._n4t?._t4t?.ins}];
// [VI dòng gốc 11] Định nghĩa hàm quota; tham số: d | Khai báo biến không gán lại bằng const: m = gọi d.model(); n = gọi Number(m?.remainTimes) để chuyển sang số | Kết thúc hàm hiện tại và trả về: nếu m&&Number.isFinite(n)&&n>0&&m.isCombin!==true&&m.isCombin!==1 thì lấy n, ngược lại lấy 0.
 function quota(d){const m=d.model(),n=Number(m?.remainTimes);return m&&Number.isFinite(n)&&n>0&&m.isCombin!==true&&m.isCombin!==1?n:0;}
// [VI dòng gốc 12] Định nghĩa hàm idle; tham số: không có | Khai báo biến không gán lại bằng const: q = gọi W.KVPV_DAILY?.quickState() (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Kết thúc hàm hiện tại và trả về: W._Ba?._$a?.SceneUtil?.isCommonScene===true&&W._Ba?._$a?._yo?.ins?.isInMission!==true&&user()?.isDead!==true&& Date.now()>=Number(W.__KVPV_USER_UI_UNTIL||0)&&q?.running===true&&['r… và chỉ đánh giá vế phải khi vế trái truthy: !W.KVPV_HITRUN1?.status?.(false)?.running.
 function idle(){const q=W.KVPV_DAILY?.quickState?.();return W._Ba?._$a?.SceneUtil?.isCommonScene===true&&W._Ba?._$a?._yo?.ins?.isInMission!==true&&user()?.isDead!==true&&
// [VI dòng gốc 13] gọi Date.now() | gọi Number(W.__KVPV_USER_UI_UNTIL||0) để chuyển sang số | gọi ['rảnh','ranh'].includes(q.job) để kiểm tra dữ liệu có chứa giá trị | gọi W.KVPV?.core?.scene?.status() để trả trạng thái để kiểm tra
  Date.now()>=Number(W.__KVPV_USER_UI_UNTIL||0)&&q?.running===true&&['rảnh','ranh'].includes(q.job)&&!W.KVPV?.core?.scene?.status?.()?.owner&&!W.KVPV_HITRUN1?.status?.(false)?.running;}
// [VI dòng gốc 14] Định nghĩa hàm members; tham số: không có | Kết thúc hàm hiện tại và trả về: gọi [...new Set((party()?.getTeamAllMembers?.()||[]).map(r=>String(r?.[0]??'')).filter(Boolean))].sort() để sắp xếp mảng tại chỗ.
 function members(){return [...new Set((party()?.getTeamAllMembers?.()||[]).map(r=>String(r?.[0]??'')).filter(Boolean))].sort();}
// [VI dòng gốc 15] Định nghĩa hàm peers; tham số: không có | Kết thúc hàm hiện tại và trả về: gọi [...S.peers.values()].filter(p=>Date.now()-p.at<15000).sort((a,b)=>b.power-a.power||a.actor.localeCompare(b.actor)) để sắp xếp mảng tại chỗ.
 function peers(){return [...S.peers.values()].filter(p=>Date.now()-p.at<15000).sort((a,b)=>b.power-a.power||a.actor.localeCompare(b.actor));}
// [VI dòng gốc 16] Định nghĩa hàm send; tham số: key, method, args | Kiểm tra S.locks.has(key)||typeof rpc()?.[method]!=='function': đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: false. | gọi S.locks.add(key)
 function send(key,method,args){if(S.locks.has(key)||typeof rpc()?.[method]!=='function')return false;S.locks.add(key);rpc()[method](args);return true;}
// [VI dòng gốc 17] Định nghĩa hàm announce; tham số: không có | Khai báo biến không gán lại bằng const: power = gọi Number(W._Ba?._qo?._Ro?.ins?.fight) để chuyển sang số | Kiểm tra !Number.isFinite(power)||power<=0: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
 function announce(){const power=Number(W._Ba?._qo?._Ro?.ins?.fight);if(!Number.isFinite(power)||power<=0)return;
// [VI dòng gốc 18] Khai báo biến không gán lại bằng const: p = tạo đối tượng gồm actor, power, at, idle, room, quotas, session
  const p={actor,power,at:Date.now(),idle:idle(),room:party()?.getHasTeams?.()===true?Number(party()?.roomId):null,
// [VI dòng gốc 19] gọi S.peers.set(actor, p) | gọi S.channel?.postMessage(p) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
   quotas:defs.map(d=>[d.type,quota(d)]),session:S.session};S.peers.set(actor,p);S.channel?.postMessage(p);}
// [VI dòng gốc 20] Định nghĩa hàm exact; tham số: không có | Khai báo biến không gán lại bằng const: s = đọc S.session; rows = gọi members(); live = gọi peers() | Kết thúc hàm hiện tại và trả về: !!s&&party()?.getHasTeamByType?.(s.type)===true&&Number(party()?.roomMapId)===s.map&&Number(party()?.mapLve??party()?.roomMapLv)===s.tier&&s.ids.length>=2&&rows.length===s.ids.leng… và chỉ đánh giá vế phải khi vế trái truthy: party()?.isLeader===true.
 function exact(){const s=S.session,rows=members(),live=peers();return !!s&&party()?.getHasTeamByType?.(s.type)===true&&Number(party()?.roomMapId)===s.map&&Number(party()?.mapLve??party()?.roomMapLv)===s.tier&&s.ids.length>=2&&rows.length===s.ids.length&&s.ids.every(id=>rows.includes(id)&&live.some(p=>p.actor===id))&&party()?.isLeader===true;}
// [VI dòng gốc 21] Định nghĩa hàm attach; tham số: không có | Khai báo biến không gán lại bằng const: r = gọi rpc() | Kiểm tra S.hook?.r===r&&r?.startTeamBossCopy===S.hook.fn: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: true.
 function attach(){const r=rpc();if(S.hook?.r===r&&r?.startTeamBossCopy===S.hook.fn)return true;
// [VI dòng gốc 22] Kiểm tra S.hook: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: false. | Khai báo biến không gán lại bằng const: proto = r và chỉ đánh giá vế phải khi vế trái truthy: Object.getPrototypeOf(r); native = đọc proto?.startTeamBossCopy nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  if(S.hook)return false;const proto=r&&Object.getPrototypeOf(r),native=proto?.startTeamBossCopy;
// [VI dòng gốc 23] Kiểm tra typeof native!=='function'||r.startTeamBossCopy!==native: đúng thì chạy nhánh sau if. | gán S.reason bằng 'waiting_verified_start_handler' | Kết thúc hàm hiện tại và trả về: false.
  if(typeof native!=='function'||r.startTeamBossCopy!==native){S.reason='waiting_verified_start_handler';return false;}
// [VI dòng gốc 24] Khai báo biến không gán lại bằng const: descriptor = gọi Object.getOwnPropertyDescriptor(r, 'startTeamBossCopy')
  const descriptor=Object.getOwnPropertyDescriptor(r,'startTeamBossCopy');
// [VI dòng gốc 25] Khai báo biến không gán lại bằng const: fn = tạo hàm với tham số args
  const fn=function(args){
// [VI dòng gốc 26] Chú thích gốc của tác giả; không được thực thi. Nội dung: Guard only this coordinator's exact room category/map/tier. Other native rooms stay usable.
   // Guard only this coordinator's exact room category/map/tier. Other native rooms stay usable.
// [VI dòng gốc 27] Khai báo biến không gán lại bằng const: p = gọi party(); session = đọc S.session
   const p=party(),session=S.session;
// [VI dòng gốc 28] Kiểm tra !S.enabled||!owned()||!session||Number(args?.[0])!==session.type|| p?.getHasTeamByType?.(session.type)!==true||Number(p.roomMapId)!==session.map|| Number(p.mapLve??p.roomMapLv)!==s…: đúng thì chạy nhánh sau if.
   if(!S.enabled||!owned()||!session||Number(args?.[0])!==session.type||
// [VI dòng gốc 29] gọi p?.getHasTeamByType(session.type) | gọi Number(p.roomMapId) để chuyển sang số
     p?.getHasTeamByType?.(session.type)!==true||Number(p.roomMapId)!==session.map||
// [VI dòng gốc 30] Kết thúc hàm hiện tại và trả về: gọi native.call(this, args).
     Number(p.mapLve??p.roomMapLv)!==session.tier)return native.call(this,args);
// [VI dòng gốc 31] Kiểm tra !exact()||!idle()||!quota(defs.find(d=>d.type===session.type)): đúng thì chạy nhánh sau if. | gán S.reason bằng 'waiting_exact_tool_roster' | Kết thúc hàm hiện tại và trả về: false.
   if(!exact()||!idle()||!quota(defs.find(d=>d.type===session.type))){S.reason='waiting_exact_tool_roster';return false;}
// [VI dòng gốc 32] Khai báo biến không gán lại bằng const: key = tính biểu thức S.session.key+'/start/'+String(party()?.roomId) | Kiểm tra S.locks.has(key): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: false. | gọi S.locks.add(key)
   const key=S.session.key+'/start/'+String(party()?.roomId);if(S.locks.has(key))return false;S.locks.add(key);return native.call(this,args);};
// [VI dòng gốc 33] gọi Object.defineProperty(r, 'startTeamBossCopy', {value:fn,writable:true,configurable:true}) | gán S.hook bằng {r,fn,descriptor} | Kết thúc hàm hiện tại và trả về: true.
  Object.defineProperty(r,'startTeamBossCopy',{value:fn,writable:true,configurable:true});S.hook={r,fn,descriptor};return true;
// [VI dòng gốc 34] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
 }
// [VI dòng gốc 35] Định nghĩa hàm tick; tham số: không có. Mục đích: xử lý một nhịp kiểm tra | Kiểm tra W.KVPV_ENTRY_POLICY?.manual===true: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể. | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài.
 function tick(){if(W.KVPV_ENTRY_POLICY?.manual===true)return;try{if(!S.enabled||!owned())return;const transport=!!S.channel||Date.now()-S.relayAt<15000;const hooked=transport?attach():false;announce();const live=peers();
// [VI dòng gốc 36] Kiểm tra !transport: đúng thì chạy nhánh sau if. | gán S.reason bằng 'account_channel_unavailable' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  if(!transport){S.reason='account_channel_unavailable';return;}
// [VI dòng gốc 37] Kiểm tra W.KVPV_BOSS_TEAM?.priority?.(): đúng thì chạy nhánh sau if. | gán S.reason bằng 'private_boss_invitation_priority' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  if(W.KVPV_BOSS_TEAM?.priority?.()){S.reason='private_boss_invitation_priority';return;}
// [VI dòng gốc 38] Kiểm tra !S.session&&(Date.now()-S.born<5000||live.length<2): đúng thì chạy nhánh sau if. | gán S.reason bằng 'discovering_accounts' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  if(!S.session&&(Date.now()-S.born<5000||live.length<2)){S.reason='discovering_accounts';return;}
// [VI dòng gốc 39] Kiểm tra !S.session: đúng thì chạy nhánh sau if.
  if(!S.session){
// [VI dòng gốc 40] Khai báo biến không gán lại bằng const: active = gọi live.filter(p=>p.idle) để giữ phần tử thỏa điều kiện | Kiểm tra active.length!==live.length: đúng thì chạy nhánh sau if. | gán S.reason bằng 'waiting_accounts_idle' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
   const active=live.filter(p=>p.idle);if(active.length!==live.length){S.reason='waiting_accounts_idle';return;}
// [VI dòng gốc 41] Khai báo biến không gán lại bằng const: lead = đọc live[0] | Kiểm tra lead.actor!==actor: đúng thì chạy nhánh sau if. | Kiểm tra lead.session: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gán S.session bằng lead.session
   const lead=live[0];if(lead.actor!==actor){if(lead.session)S.session=lead.session;else S.reason='waiting_strongest_leader';return;}
// [VI dòng gốc 42] Khai báo biến không gán lại bằng const: d = gọi defs.find(d=>live.every(p=>Number(p.quotas?.find(x=>x[0]===d.type)?.[1])>0)) để tìm phần tử đầu tiên thỏa điều kiện
   const d=defs.find(d=>live.every(p=>Number(p.quotas?.find(x=>x[0]===d.type)?.[1])>0));
// [VI dòng gốc 43] Kiểm tra !d: đúng thì chạy nhánh sau if. | gán S.reason bằng 'waiting_native_daily_attempts' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
   if(!d){S.reason='waiting_native_daily_attempts';return;}
// [VI dòng gốc 44] Kiểm tra live.length!==4: đúng thì chạy nhánh sau if. | gán S.reason bằng 'waiting_four_tool_accounts' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
   if(live.length!==4){S.reason='waiting_four_tool_accounts';return;}
// [VI dòng gốc 45] gán S.session bằng {leader:actor,ids:live.map(p=>p.actor).sort(),type:d.type,map:d.map,tier:1,key:day()+'/'+d.type+'/'+live.map(p=>p.actor).sort().join(',')+'/'+quota(d)} | gọi announce()
   S.session={leader:actor,ids:live.map(p=>p.actor).sort(),type:d.type,map:d.map,tier:1,key:day()+'/'+d.type+'/'+live.map(p=>p.actor).sort().join(',')+'/'+quota(d)};announce();
// [VI dòng gốc 46] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 47] Khai báo biến không gán lại bằng const: s = đọc S.session; d = gọi defs.find(d=>d.type===s.type) để tìm phần tử đầu tiên thỏa điều kiện | Kiểm tra !d: đúng thì chạy nhánh sau if. | gán S.reason bằng 'unsupported_native_room' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  const s=S.session,d=defs.find(d=>d.type===s.type);if(!d){S.reason='unsupported_native_room';return;}
// [VI dòng gốc 48] Khai báo biến không gán lại bằng const: leader = gọi live.find(p=>p.actor===s.leader) để tìm phần tử đầu tiên thỏa điều kiện | Kiểm tra !leader: đúng thì chạy nhánh sau if. | gán S.reason bằng 'leader_offline_keep_pending' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  const leader=live.find(p=>p.actor===s.leader);if(!leader){S.reason='leader_offline_keep_pending';return;}
// [VI dòng gốc 49] Kiểm tra W._Ba?._$a?._yo?.ins?.isInMission===true&&S.joinedRoom!==null: đúng thì chạy nhánh sau if. | gán S.seenBattle bằng true
  if(W._Ba?._$a?._yo?.ins?.isInMission===true&&S.joinedRoom!==null)S.seenBattle=true;
// [VI dòng gốc 50] Kiểm tra !idle(): đúng thì chạy nhánh sau if. | gán S.reason bằng 'waiting_safe_scene' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  if(!idle()){S.reason='waiting_safe_scene';return;}
// [VI dòng gốc 51] Kiểm tra S.seenBattle: đúng thì chạy nhánh sau if.
  if(S.seenBattle){
// [VI dòng gốc 52] Kiểm tra party()?.getHasTeamByType?.(s.type)===true&&String(party()?.roomId)===S.joinedRoom: đúng thì chạy nhánh sau if. | gọi send(s.key+'/leave/'+S.joinedRoom, 'exitSerAreRoom', [s.type]) | gán S.reason bằng 'waiting_completed_room_exit' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
   if(party()?.getHasTeamByType?.(s.type)===true&&String(party()?.roomId)===S.joinedRoom){send(s.key+'/leave/'+S.joinedRoom,'exitSerAreRoom',[s.type]);S.reason='waiting_completed_room_exit';return;}
// [VI dòng gốc 53] Kiểm tra party()?.getHasTeams?.()!==true: đúng thì chạy nhánh sau if. | gán S.session bằng null | gán S.seenBattle bằng false | gán S.joinedRoom bằng null
   if(party()?.getHasTeams?.()!==true){S.session=null;S.seenBattle=false;S.joinedRoom=null;S.born=Date.now();S.reason='completed_waiting_new_attempts';announce();return;}
// [VI dòng gốc 54] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 55] Kiểm tra !hooked: đúng thì chạy nhánh sau if. | gán S.reason bằng 'waiting_verified_start_handler' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  if(!hooked){S.reason='waiting_verified_start_handler';return;}
// [VI dòng gốc 56] Khai báo biến không gán lại bằng const: p = gọi party(); inRoom = tính biểu thức p?.getHasTeamByType?.(s.type)===true
  const p=party(),inRoom=p?.getHasTeamByType?.(s.type)===true;
// [VI dòng gốc 57] Kiểm tra p?.getHasTeams?.()===true&&!inRoom: đúng thì chạy nhánh sau if. | gán S.reason bằng 'other_team_preserved' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  if(p?.getHasTeams?.()===true&&!inRoom){S.reason='other_team_preserved';return;}
// [VI dòng gốc 58] Kiểm tra !inRoom: đúng thì chạy nhánh sau if.
  if(!inRoom){
// [VI dòng gốc 59] Kiểm tra actor===s.leader: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | Kiểm tra !quota(d): đúng thì chạy nhánh sau if. | gán S.reason bằng 'no_daily_attempts' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
   if(actor===s.leader){if(!quota(d)){S.reason='no_daily_attempts';return;}send(s.key+'/create','creSerAreRoom',[s.type,'KVPV',s.map,s.tier,0,0,0,1,false,false]);S.reason='waiting_create_ack';}
// [VI dòng gốc 60] Nhánh else được chạy khi điều kiện if tương ứng không đúng.
   else {
// [VI dòng gốc 61] Khai báo biến không gán lại bằng const: inbox = gọi p?.getAskLs(W._Ba?._cm?.TeamTypeToFuncId?.[s.type]) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Khai báo biến không gán lại bằng const: invite = nếu Array.isArray(inbox) thì lấy inbox.find(r=>Number(r?.[1])===s.type&&String(r?.[5])===s.leader&&Number(r?.[4])===s.tier), ngược lại lấy null
    const inbox=p?.getAskLs?.(W._Ba?._cm?.TeamTypeToFuncId?.[s.type]);const invite=Array.isArray(inbox)?inbox.find(r=>Number(r?.[1])===s.type&&String(r?.[5])===s.leader&&Number(r?.[4])===s.tier):null;
// [VI dòng gốc 62] Kiểm tra invite: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gọi send(s.key+'/join/'+invite[2], 'agrInviUSARoom', [s.type,invite[2],invite[4]]) | gán S.reason bằng 'waiting_join_ack'
    if(invite){send(s.key+'/join/'+invite[2],'agrInviUSARoom',[s.type,invite[2],invite[4]]);S.reason='waiting_join_ack';}
// [VI dòng gốc 63] gán S.reason bằng 'waiting_leader_invitation'
    else S.reason='waiting_leader_invitation';
// [VI dòng gốc 64] Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
   }return;
// [VI dòng gốc 65] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 66] gán S.joinedRoom bằng String(p.roomId)
  S.joinedRoom=String(p.roomId);
// [VI dòng gốc 67] Kiểm tra actor!==s.leader: đúng thì chạy nhánh sau if. | gán S.reason bằng 'member_waiting_full_team' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  if(actor!==s.leader){S.reason='member_waiting_full_team';return;}
// [VI dòng gốc 68] Kiểm tra p.isLeader!==true: đúng thì chạy nhánh sau if. | gán S.reason bằng 'foreign_leader_preserved' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  if(p.isLeader!==true){S.reason='foreign_leader_preserved';return;}
// [VI dòng gốc 69] Kiểm tra Number(p.roomMapId)!==s.map||Number(p.mapLve??p.roomMapLv)!==s.tier: đúng thì chạy nhánh sau if. | gán S.reason bằng 'room_scope_mismatch' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  if(Number(p.roomMapId)!==s.map||Number(p.mapLve??p.roomMapLv)!==s.tier){S.reason='room_scope_mismatch';return;}
// [VI dòng gốc 70] Khai báo biến không gán lại bằng const: ids = gọi members(); rid = gọi String(p.roomId) để chuyển sang chuỗi
  const ids=members(),rid=String(p.roomId);
// [VI dòng gốc 71] Kiểm tra ids.some(id=>!s.ids.includes(id)): đúng thì chạy nhánh sau if. | gán S.reason bằng 'unexpected_member_no_start' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  if(ids.some(id=>!s.ids.includes(id))){S.reason='unexpected_member_no_start';return;}
// [VI dòng gốc 72] Kiểm tra !exact(): đúng thì chạy nhánh sau if.
  if(!exact()){
// [VI dòng gốc 73] Duyệt từng giá trị trong s.ids.filter(id=>id!==actor&&!ids.includes(id)) bằng const id. | Khai báo biến không gán lại bằng const: id (chưa gán giá trị) | gọi send(s.key+'/invite/'+rid+'/'+id, 'inviUserSARoom', [s.type,1,[Number(id)]])
   for(const id of s.ids.filter(id=>id!==actor&&!ids.includes(id)))send(s.key+'/invite/'+rid+'/'+id,'inviUserSARoom',[s.type,1,[Number(id)]]);
// [VI dòng gốc 74] Duyệt từng giá trị trong p.applyList||[] bằng const row. | Khai báo biến không gán lại bằng const: row (chưa gán giá trị) | Kiểm tra s.ids.includes(String(row?.[0])): đúng thì chạy nhánh sau if. | gọi send(s.key+'/approve/'+rid+'/'+row[0], 'agreAplySARoom', [s.type,Number(row[0])])
   for(const row of p.applyList||[])if(s.ids.includes(String(row?.[0])))send(s.key+'/approve/'+rid+'/'+row[0],'agreAplySARoom',[s.type,Number(row[0])]);
// [VI dòng gốc 75] gán S.reason bằng 'waiting_exact_tool_roster' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
   S.reason='waiting_exact_tool_roster';return;
// [VI dòng gốc 76] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 77] Kiểm tra !quota(d): đúng thì chạy nhánh sau if. | gán S.reason bằng 'no_daily_attempts' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  if(!quota(d)){S.reason='no_daily_attempts';return;}
// [VI dòng gốc 78] gọi rpc()?.startTeamBossCopy([s.type]) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gán S.reason bằng 'waiting_start_ack'
  rpc()?.startTeamBossCopy?.([s.type]);S.reason='waiting_start_ack';
// [VI dòng gốc 79] Nhận lỗi bằng e và chạy phần xử lý lỗi. | gán S.error bằng String(e) | gán S.reason bằng 'error_no_retry'
 }catch(e){S.error=String(e);S.reason='error_no_retry';}}
// [VI dòng gốc 80] Định nghĩa hàm stop; tham số: không có. Mục đích: dừng bộ điều khiển và dọn tài nguyên | gán S.enabled bằng false | Kiểm tra S.timer!==null: đúng thì chạy nhánh sau if. | gọi W.KVPV_V1?.timers?.clearInterval??W.clearInterval(S.timer)
 function stop(){S.enabled=false;if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);S.channel?.close?.();
// [VI dòng gốc 81] Khai báo biến không gán lại bằng const: h = đọc S.hook | Kiểm tra h&&h.r.startTeamBossCopy===h.fn: đúng thì chạy nhánh sau if. | Kiểm tra h.descriptor: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gọi Object.defineProperty(h.r, 'startTeamBossCopy', h.descriptor)
  const h=S.hook;if(h&&h.r.startTeamBossCopy===h.fn){if(h.descriptor)Object.defineProperty(h.r,'startTeamBossCopy',h.descriptor);else delete h.r.startTeamBossCopy;}}
// [VI dòng gốc 82] Định nghĩa hàm observe; tham số: p
 function observe(p){
// [VI dòng gốc 83] Kiểm tra !p||!/^\d{5,20}$/.test(String(p.actor))||p.actor===actor||!Number.isFinite(p.power)||p.power<=0||!Array.isArray(p.quotas)||p.quotas.length>8: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  if(!p||!/^\d{5,20}$/.test(String(p.actor))||p.actor===actor||!Number.isFinite(p.power)||p.power<=0||!Array.isArray(p.quotas)||p.quotas.length>8)return;
// [VI dòng gốc 84] Chú thích gốc của tác giả; không được thực thi. Nội dung: Only bounded observations are accepted; no executable callback or method is read from messages.
  // Only bounded observations are accepted; no executable callback or method is read from messages.
// [VI dòng gốc 85] Khai báo biến không gán lại bằng const: session = đọc p.session | Kiểm tra session&&(!Array.isArray(session.ids)||session.ids.length!==4||new Set(session.ids).size!==4||!session.ids.every(id=>/^\d{5,20}$/.test(String(id)))||!session.ids.includes(session.l…: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  const session=p.session;if(session&&(!Array.isArray(session.ids)||session.ids.length!==4||new Set(session.ids).size!==4||!session.ids.every(id=>/^\d{5,20}$/.test(String(id)))||!session.ids.includes(session.leader)||![2,6].includes(session.type)||session.map!==(session.type===2?2091:2702)||session.tier!==1||typeof session.key!=='string'||session.key.length>200))return;
// [VI dòng gốc 86] gọi S.peers.set(String(p.actor), {actor:String(p.actor),power:p.power,at:Date.now(),idle:p.idle===true,quotas:p.quotas.map(r=>[Number(r?…) | Kiểm tra S.peers.size>32: đúng thì chạy nhánh sau if. | gọi S.peers.delete(S.peers.keys().next().value)
  S.peers.set(String(p.actor),{actor:String(p.actor),power:p.power,at:Date.now(),idle:p.idle===true,quotas:p.quotas.map(r=>[Number(r?.[0]),Number(r?.[1])]),session:session?{leader:session.leader,ids:[...session.ids],type:session.type,map:session.map,tier:session.tier,key:session.key}:null});if(S.peers.size>32)S.peers.delete(S.peers.keys().next().value);
// [VI dòng gốc 87] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
 }
// [VI dòng gốc 88] Kiểm tra typeof W.BroadcastChannel==='function': đúng thì chạy nhánh sau if. | gán S.channel bằng new W.BroadcastChannel('kvpv-active-party-v1') | gán S.channel.onmessage bằng e=>observe(e?.data)
 if(typeof W.BroadcastChannel==='function'){S.channel=new W.BroadcastChannel('kvpv-active-party-v1');S.channel.onmessage=e=>observe(e?.data);}
// [VI dòng gốc 89] Định nghĩa hàm receive; tham số: rows | Kiểm tra !S.enabled||!owned()||!Array.isArray(rows)||rows.length>32: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể. | gán S.relayAt bằng Date.now()
 function receive(rows){if(!S.enabled||!owned()||!Array.isArray(rows)||rows.length>32)return;S.relayAt=Date.now();for(const p of rows){if(!Number.isFinite(p?.at)||Date.now()-p.at>15000||p.at>Date.now()+2000)continue;observe(p);}}
// [VI dòng gốc 90] gán W.KVPV_TEAM_COORDINATOR bằng Object.freeze({sync:tick,stop,receive,status:()=>({enabled:S.enabled,reason:S.reason,lastError:S.error,session:S.session,self:S.peers.get(actor)??null,accounts:peers().map(p=>({act…
 W.KVPV_TEAM_COORDINATOR=Object.freeze({sync:tick,stop,receive,status:()=>({enabled:S.enabled,reason:S.reason,lastError:S.error,session:S.session,self:S.peers.get(actor)??null,accounts:peers().map(p=>({actor:p.actor,power:p.power})),allowKNB:false,scope:Date.now()-S.relayAt<15000?'local_machine_profiles':'same_origin_browser_profile'}),_handoff:()=>({actor,session:S.session,locks:[...S.locks],seenBattle:S.seenBattle,joinedRoom:S.joinedRoom})});
// [VI dòng gốc 91] gán S.timer bằng (W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,1000) | gọi tick() để xử lý một nhịp kiểm tra
 S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,1000);tick();
// [VI dòng gốc 92] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: })();
})();
// [VI dòng gốc 93] Dòng trống để tách các phần, không có lệnh thực thi.
