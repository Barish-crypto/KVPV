// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: Paste into game-frame Console. Defines an explicit one-shot starter; does not run it. [đóng chú thích]
/* Paste into game-frame Console. Defines an explicit one-shot starter; does not run it. */
// [VI dòng gốc 2] chạy ngay hàm bao để tạo phạm vi và khởi tạo phần chức năng bên trong
(() => {
// [VI dòng gốc 3] "use strict" | Khai báo biến không gán lại bằng const: W = window; actor = "10228867268946"
 'use strict';const W=window,actor='10228867268946';
// [VI dòng gốc 4] Khai báo biến không gán lại bằng const: key = "__KVPV_MAC_LAN_ONCE"
 const key='__KVPV_MAC_LAN_ONCE';
// [VI dòng gốc 5] Khai báo biến không gán lại bằng const: S = W[key] hoặc dùng vế phải khi vế trái là null/undefined: W[key]={attempted:false,pending:null,error:''}
 const S=W[key]??(W[key]={attempted:false,pending:null,error:''});
// [VI dòng gốc 6] Khai báo biến không gán lại bằng const: party = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._Ba?._cm?._q3t?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
 const party=()=>W._Ba?._cm?._q3t?.ins;
// [VI dòng gốc 7] Định nghĩa hàm inspect; tham số: không có | Khai báo biến không gán lại bằng const: p = gọi party(); m = đọc W._Ba?._n4t?._t4t?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
 function inspect(){const p=party(),m=W._Ba?._n4t?._t4t?.ins;
// [VI dòng gốc 8] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm actor, remaining, roomId, type6, leader, map, tier, attempted, pending, error.
  return {actor:String(W._Ba?._rJ?._O$?.ins?.actorId??''),remaining:Number(m?.remainTimes),
// [VI dòng gốc 9] Thuộc tính roomId: đọc p?.roomId nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Thuộc tính type6: tính biểu thức p?.getHasTeamByType?.(6)===true | Thuộc tính leader: tính biểu thức p?.isLeader===true
   roomId:p?.roomId,type6:p?.getHasTeamByType?.(6)===true,leader:p?.isLeader===true,
// [VI dòng gốc 10] Thuộc tính map: gọi Number(p?.roomMapId) để chuyển sang số | Thuộc tính tier: gọi Number(p?.mapLve??p?.roomMapLv) để chuyển sang số | Thuộc tính attempted: đọc S.attempted | Thuộc tính pending: đọc S.pending
   map:Number(p?.roomMapId),tier:Number(p?.mapLve??p?.roomMapLv),attempted:S.attempted,pending:S.pending,error:S.error};
// [VI dòng gốc 11] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
 }
// [VI dòng gốc 12] Định nghĩa hàm start; tham số: không có. Mục đích: khởi động bộ điều khiển | Khai báo biến không gán lại bằng const: r = gọi inspect(); u = đọc W._Ba?._rJ?._O$?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
 function start(){const r=inspect(),u=W._Ba?._rJ?._O$?.ins;
// [VI dòng gốc 13] Khai báo biến không gán lại bằng const: fail = tạo hàm với tham số reason; mỗi lần gọi trả về tạo đối tượng gồm ok, reason
  const fail=reason=>({ok:false,reason});
// [VI dòng gốc 14] Kiểm tra r.actor!==actor||String(W.__KVPV_OWN_ACTOR_ID)!==actor||W.__KVPV_UNIVERSAL_HALTED: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: gọi fail('wrong_account').
  if(r.actor!==actor||String(W.__KVPV_OWN_ACTOR_ID)!==actor||W.__KVPV_UNIVERSAL_HALTED)return fail('wrong_account');
// [VI dòng gốc 15] Kiểm tra S.attempted: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: gọi fail('already_attempted_no_retry').
  if(S.attempted)return fail('already_attempted_no_retry');
// [VI dòng gốc 16] Kiểm tra !Number.isFinite(r.remaining)||r.remaining<=0: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: gọi fail('no_free_attempt').
  if(!Number.isFinite(r.remaining)||r.remaining<=0)return fail('no_free_attempt');
// [VI dòng gốc 17] Kiểm tra !r.type6||!r.leader||!r.roomId||r.map!==2702||r.tier!==1: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: gọi fail('need_mac_lan_room_and_leader').
  if(!r.type6||!r.leader||!r.roomId||r.map!==2702||r.tier!==1)return fail('need_mac_lan_room_and_leader');
// [VI dòng gốc 18] Kiểm tra u?.isDead!==false||W._Ba?._$a?.SceneUtil?.isCommonScene!==true||W._Ba?._$a?._yo?.ins?.isInMission!==false: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: gọi fail('not_idle_or_alive').
  if(u?.isDead!==false||W._Ba?._$a?.SceneUtil?.isCommonScene!==true||W._Ba?._$a?._yo?.ins?.isInMission!==false)return fail('not_idle_or_alive');
// [VI dòng gốc 19] Khai báo biến không gán lại bằng const: rpc = đọc W._Ba?._cm?._u3t?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Kiểm tra typeof rpc?.startTeamBossCopy!=='function': đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: gọi fail('native_handler_unavailable').
  const rpc=W._Ba?._cm?._u3t?.ins;if(typeof rpc?.startTeamBossCopy!=='function')return fail('native_handler_unavailable');
// [VI dòng gốc 20] gán S.attempted bằng true | gán S.pending bằng {at:Date.now(),roomId:String(r.roomId),type:6,map:2702,tier:1}
  S.attempted=true;S.pending={at:Date.now(),roomId:String(r.roomId),type:6,map:2702,tier:1};
// [VI dòng gốc 21] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | gọi rpc.startTeamBossCopy([6]) | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm ok, state.
  try{rpc.startTeamBossCopy([6]);return {ok:true,state:'native_called_wait_server'};}
// [VI dòng gốc 22] Nhận lỗi bằng e và chạy phần xử lý lỗi. | gán S.error bằng String(e?.message||e) | Kết thúc hàm hiện tại và trả về: gọi fail('native_error_no_retry').
  catch(e){S.error=String(e?.message||e);return fail('native_error_no_retry');}
// [VI dòng gốc 23] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
 }
// [VI dòng gốc 24] gán W.KVPV_MAC_LAN bằng Object.freeze({inspect,start})
 W.KVPV_MAC_LAN=Object.freeze({inspect,start});
// [VI dòng gốc 25] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: })();
})();
// [VI dòng gốc 26] Dòng trống để tách các phần, không có lệnh thực thi.
