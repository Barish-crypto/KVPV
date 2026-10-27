// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: CHÚ THÍCH V1 — Chọn mục tiêu Chiến Trường Vinh Dự.
/* CHÚ THÍCH V1 — Chọn mục tiêu Chiến Trường Vinh Dự.
 * Chỉ chạy trong map sự kiện: ưu tiên người khác đội, tìm quái khi chưa có người phù hợp rồi định kỳ tìm người lại. Phản hồi tìm kiếm phải khớp yêu cầu đang chờ.
 * Sửa nguồn tại đây rồi chạy node build.cjs; FULL và bản vá được sinh tự động. */
// [VI dòng gốc 4] Chú thích gốc của tác giả; không được thực thi. Nội dung: Vinh Du scene 42: native Find Player first, Find Monster fallback.
/* Vinh Du scene 42: native Find Player first, Find Monster fallback.
 * Native UI: selectTar(2,-1); fireGodInfo -> reqSearchObj(1,id).
 * Native search reply 5978 -> setPlayerTarget(id, position).
 */
// [VI dòng gốc 8] chạy ngay hàm bao để tạo phạm vi và khởi tạo phần chức năng bên trong
(() => {
// [VI dòng gốc 9] "use strict"
  'use strict';
// [VI dòng gốc 10] Khai báo biến không gán lại bằng const: W = window | gọi W.KVPV_HONOR_TARGET?.stop() để dừng bộ điều khiển và dọn tài nguyên (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  const W=window;W.KVPV_HONOR_TARGET?.stop?.();
// [VI dòng gốc 11] Khai báo biến không gán lại bằng const: actor = gọi String(W.__KVPV_OWN_ACTOR_ID||'') để chuyển sang chuỗi
  const actor=String(W.__KVPV_OWN_ACTOR_ID||'');
// [VI dòng gốc 12] Khai báo biến không gán lại bằng const: S = tạo đối tượng gồm enabled, timer, inside, entryPlayerPending, lastPlayer, lastMonster, pending, playerSearches, monsterSearches, searchReplies, reason, lastError, listening
  const S={enabled:true,timer:null,inside:false,entryPlayerPending:false,lastPlayer:-Infinity,lastMonster:-Infinity,pending:null,
// [VI dòng gốc 13] Thuộc tính playerSearches: 0 | Thuộc tính monsterSearches: 0 | Thuộc tính searchReplies: 0 | Thuộc tính reason: "waiting_scene_42"
    playerSearches:0,monsterSearches:0,searchReplies:0,reason:'waiting_scene_42',lastError:'',listening:false};
// [VI dòng gốc 14] Khai báo biến không gán lại bằng const: model = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._Ba?._Zpt?._Jpt?.inst nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  const model=()=>W._Ba?._Zpt?._Jpt?.inst;
// [VI dòng gốc 15] Khai báo biến không gán lại bằng const: player = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._Ba?._rJ?._O$?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  const player=()=>W._Ba?._rJ?._O$?.ins;
// [VI dòng gốc 16] Khai báo biến không gán lại bằng const: owned = tạo hàm với tham số (không có); mỗi lần gọi trả về actor&&String(player()?.actorId??'')===actor và chỉ đánh giá vế phải khi vế trái truthy: !W.__KVPV_UNIVERSAL_HALTED
  const owned=()=>actor&&String(player()?.actorId??'')===actor&&!W.__KVPV_UNIVERSAL_HALTED;
// [VI dòng gốc 17] Khai báo biến không gán lại bằng const: prop = tạo hàm với tham số o, k; mỗi lần gọi trả về gọi o?.property?.get(k) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  const prop=(o,k)=>o?.property?.get?.(k);
// [VI dòng gốc 18] Định nghĩa hàm inside; tham số: không có | Khai báo biến không gán lại bằng const: id = gọi Number(W._C?._Mn?._Cn?.currentID??W._Ba?._$a?._yo?.ins?.intoSce?.[0]) để chuyển sang số
  function inside(){const id=Number(W._C?._Mn?._Cn?.currentID??W._Ba?._$a?._yo?.ins?.intoSce?.[0]);
// [VI dòng gốc 19] Kết thúc hàm hiện tại và trả về: tính biểu thức Number(W._ft?._po?.ins?.getCfgById?.(id)?.[7]??W._Ba?._$a?.SceneUtil?.curScene)===42.
    return Number(W._ft?._po?.ins?.getCfgById?.(id)?.[7]??W._Ba?._$a?.SceneUtil?.curScene)===42;}
// [VI dòng gốc 20] Chú thích gốc của tác giả; không được thực thi. Nội dung: So đội mục tiêu với đội nhân vật, không chọn đồng đội làm địch.
  // So đội mục tiêu với đội nhân vật, không chọn đồng đội làm địch.
// [VI dòng gốc 21] Định nghĩa hàm enemyTeam; tham số: team | Khai báo biến không gán lại bằng const: mine = gọi W._Ba?._a1?._h1?.inst?.getMyFightTeamId() (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  function enemyTeam(team){const mine=W._Ba?._a1?._h1?.inst?.getMyFightTeamId?.();
// [VI dòng gốc 22] Kết thúc hàm hiện tại và trả về: mine!=null&&team!=null và chỉ đánh giá vế phải khi vế trái truthy: Number(team)!==Number(mine).
    return mine!=null&&team!=null&&Number(team)!==Number(mine);}
// [VI dòng gốc 23] Chú thích gốc của tác giả; không được thực thi. Nội dung: Kiểm tra mục tiêu người hiện tại còn hợp lệ và thuộc phe địch trước khi tìm lại.
  // Kiểm tra mục tiêu người hiện tại còn hợp lệ và thuộc phe địch trước khi tìm lại.
// [VI dòng gốc 24] Định nghĩa hàm validPlayerTarget; tham số: không có | Khai báo biến không gán lại bằng const: me = gọi W._C?._Ba?.instance?.getRole(Number(actor)) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); c = gọi me?.getComponent(W._d?._Yct?._Het) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); t = đọc c?.target nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  function validPlayerTarget(){const me=W._C?._Ba?.instance?.getRole?.(Number(actor)),c=me?.getComponent?.(W._d?._Yct?._Het),t=c?.target;
// [VI dòng gốc 25] Kiểm tra !t||t.isValid===false||c.isValidTarget?.()!==true: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: false.
    if(!t||t.isValid===false||c.isValidTarget?.()!==true)return false;
// [VI dòng gốc 26] Khai báo biến không gán lại bằng const: id = gọi String(prop(t,'id')??t.id??'') để chuyển sang chuỗi | Kiểm tra !id||id===actor: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: false.
    const id=String(prop(t,'id')??t.id??'');if(!id||id===actor)return false;
// [VI dòng gốc 27] Khai báo biến không gán lại bằng const: row = model()?.getRankDataById?.(id) hoặc dùng vế phải khi vế trái là null/undefined: model()?.getRankDataById?.(Number(id))
    const row=model()?.getRankDataById?.(id)??model()?.getRankDataById?.(Number(id));
// [VI dòng gốc 28] Kết thúc hàm hiện tại và trả về: !!row&&!row[0]?.[4] và chỉ đánh giá vế phải khi vế trái truthy: enemyTeam(row[0]?.[3]).
    return !!row&&!row[0]?.[4]&&enemyTeam(row[0]?.[3]);
// [VI dòng gốc 29] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 30] Chú thích gốc của tác giả; không được thực thi. Nội dung: Chỉ nhận phản hồi tìm người khớp phiên, map và yêu cầu đang chờ; bỏ phản hồi cũ hoặc thiếu tọa độ.
  // Chỉ nhận phản hồi tìm người khớp phiên, map và yêu cầu đang chờ; bỏ phản hồi cũ hoặc thiếu tọa độ.
// [VI dòng gốc 31] Định nghĩa hàm onSearch; tham số: reply | Kiểm tra !S.enabled||!owned()||!inside()||!S.pending: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  function onSearch(reply){if(!S.enabled||!owned()||!inside()||!S.pending)return;
// [VI dòng gốc 32] Kiểm tra String(reply?.[0])!==S.pending.id||Number(reply?.[2])!==1: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(String(reply?.[0])!==S.pending.id||Number(reply?.[2])!==1)return;
// [VI dòng gốc 33] Khai báo biến không gán lại bằng const: pos = đọc reply?.[1] nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Kiểm tra !Array.isArray(pos)||!pos.every(Number.isFinite)||(!pos[0]&&!pos[1]): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    const pos=reply?.[1];if(!Array.isArray(pos)||!pos.every(Number.isFinite)||(!pos[0]&&!pos[1]))return;
// [VI dòng gốc 34] Khai báo biến không gán lại bằng const: pending = đọc S.pending | gán S.pending bằng null | Kiểm tra !enemyTeam(pending.team): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    const pending=S.pending;S.pending=null;if(!enemyTeam(pending.team))return;
// [VI dòng gốc 35] gọi model()?.setPlayerTarget(reply[0], pos) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | tăng S.searchReplies một đơn vị sau khi lấy giá trị | gán S.reason bằng 'player_search_reply_applied'
    model()?.setPlayerTarget?.(reply[0],pos);S.searchReplies++;S.reason='player_search_reply_applied';
// [VI dòng gốc 36] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 37] Chú thích gốc của tác giả; không được thực thi. Nội dung: Ưu tiên mục tiêu người từ dữ liệu sự kiện, dùng phương thức tìm native khi cần.
  // Ưu tiên mục tiêu người từ dữ liệu sự kiện, dùng phương thức tìm native khi cần.
// [VI dòng gốc 38] Định nghĩa hàm findPlayer; tham số: không có | Khai báo biến không gán lại bằng const: m = gọi model(); p = gọi player(); god = đọc m?.fireGodInfo nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gán S.lastPlayer bằng Date.now() | tăng S.playerSearches một đơn vị sau khi lấy giá trị
  function findPlayer(){const m=model(),p=player(),god=m?.fireGodInfo;S.lastPlayer=Date.now();S.playerSearches++;S.pending=null;
// [VI dòng gốc 39] Kiểm tra god?.[0]&&enemyTeam(god[2]): đúng thì chạy nhánh sau if.
    if(god?.[0]&&enemyTeam(god[2])){
// [VI dòng gốc 40] Khai báo biến không gán lại bằng const: id = đọc god[1]; pos = gọi m?.getPlayerPos(id) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
      const id=god[1],pos=m?.getPlayerPos?.(id);
// [VI dòng gốc 41] Kiểm tra pos&&typeof m?.setPlayerTarget==='function': đúng thì chạy nhánh sau if. | gọi m.setPlayerTarget(id, pos) | gán S.reason bằng 'seeking_enemy_player' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      if(pos&&typeof m?.setPlayerTarget==='function'){m.setPlayerTarget(id,pos);S.reason='seeking_enemy_player';return;}
// [VI dòng gốc 42] Khai báo biến không gán lại bằng const: request = đọc W._Ba?._Zpt?._nZt?.ins?.reqSearchObj nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
      const request=W._Ba?._Zpt?._nZt?.ins?.reqSearchObj;
// [VI dòng gốc 43] Kiểm tra S.listening&&typeof request==='function': đúng thì chạy nhánh sau if.
      if(S.listening&&typeof request==='function'){
// [VI dòng gốc 44] gán S.pending bằng {id:String(id),team:god[2]} | gọi request.call(W._Ba._Zpt._nZt.ins, 1, id) | gán S.reason bằng 'searching_remote_player' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
        S.pending={id:String(id),team:god[2]};request.call(W._Ba._Zpt._nZt.ins,1,id);S.reason='searching_remote_player';return;
// [VI dòng gốc 45] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
      }
// [VI dòng gốc 46] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 47] gọi p?.selectTar(2, -1) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gán S.reason bằng 'find_player'
    p?.selectTar?.(2,-1);S.reason='find_player';
// [VI dòng gốc 48] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 49] Chú thích gốc của tác giả; không được thực thi. Nội dung: Thực hiện một lượt kiểm tra của module; các nhánh bên dưới quyết định có đủ điều kiện để hành động hay phải chờ.
  // Thực hiện một lượt kiểm tra của module; các nhánh bên dưới quyết định có đủ điều kiện để hành động hay phải chờ.
// [VI dòng gốc 50] Định nghĩa hàm tick; tham số: không có. Mục đích: xử lý một nhịp kiểm tra | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài.
  function tick(){try{
// [VI dòng gốc 51] Kiểm tra !S.enabled||!owned(): đúng thì chạy nhánh sau if. | gọi stop() để dừng bộ điều khiển và dọn tài nguyên | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(!S.enabled||!owned()){stop();return;}
// [VI dòng gốc 52] Kiểm tra !inside(): đúng thì chạy nhánh sau if. | gán S.inside bằng false | gán S.entryPlayerPending bằng false | gán S.pending bằng null
    if(!inside()){S.inside=false;S.entryPlayerPending=false;S.pending=null;S.reason='outside_vinh_du';return;}
// [VI dòng gốc 53] Kiểm tra !S.inside: đúng thì chạy nhánh sau if. | gán S.inside bằng true | gán S.entryPlayerPending bằng true | gán S.lastPlayer bằng -Infinity
    if(!S.inside){S.inside=true;S.entryPlayerPending=true;S.lastPlayer=-Infinity;S.lastMonster=-Infinity;}
// [VI dòng gốc 54] Kiểm tra player()?.isDead===true: đúng thì chạy nhánh sau if. | gán S.reason bằng 'waiting_revive' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(player()?.isDead===true){S.reason='waiting_revive';return;}
// [VI dòng gốc 55] Kiểm tra typeof player()?.selectTar!=='function': đúng thì chạy nhánh sau if. | gán S.reason bằng 'waiting_native_target_api' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(typeof player()?.selectTar!=='function'){S.reason='waiting_native_target_api';return;}
// [VI dòng gốc 56] Chú thích gốc của tác giả; không được thực thi. Nội dung: Exactly the native Find Player button, before retaining a target or searching monsters.
    // Exactly the native Find Player button, before retaining a target or searching monsters.
// [VI dòng gốc 57] Kiểm tra S.entryPlayerPending: đúng thì chạy nhánh sau if. | gán S.entryPlayerPending bằng false | gán S.lastPlayer bằng Date.now() | tăng S.playerSearches một đơn vị sau khi lấy giá trị
    if(S.entryPlayerPending){S.entryPlayerPending=false;S.lastPlayer=Date.now();S.playerSearches++;player().selectTar(2,-1);S.reason='entry_find_player_first';return;}
// [VI dòng gốc 58] Kiểm tra !model(): đúng thì chạy nhánh sau if. | gán S.reason bằng 'waiting_native_target_api' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(!model()){S.reason='waiting_native_target_api';return;}
// [VI dòng gốc 59] Kiểm tra validPlayerTarget(): đúng thì chạy nhánh sau if. | gán S.pending bằng null | gán S.reason bằng 'fighting_enemy_player' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(validPlayerTarget()){S.pending=null;S.reason='fighting_enemy_player';return;}
// [VI dòng gốc 60] Khai báo biến không gán lại bằng const: now = gọi Date.now()
    const now=Date.now();
// [VI dòng gốc 61] Kiểm tra now-S.lastPlayer>=8000: đúng thì chạy nhánh sau if. | gọi findPlayer() | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(now-S.lastPlayer>=8000){findPlayer();return;}
// [VI dòng gốc 62] Kiểm tra now-S.lastPlayer>=1500&&S.lastMonster<S.lastPlayer: đúng thì chạy nhánh sau if.
    if(now-S.lastPlayer>=1500&&S.lastMonster<S.lastPlayer){
// [VI dòng gốc 63] gán S.pending bằng null | gọi player().selectTar(1, -1) | gán S.lastMonster bằng now | tăng S.monsterSearches một đơn vị sau khi lấy giá trị
      S.pending=null;player().selectTar(1,-1);S.lastMonster=now;S.monsterSearches++;S.reason='monster_fallback';
// [VI dòng gốc 64] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 65] Nhận lỗi bằng e và chạy phần xử lý lỗi. | gán S.lastError bằng String(e?.message||e) | gán S.reason bằng 'error'
  }catch(e){S.lastError=String(e?.message||e);S.reason='error';}}
// [VI dòng gốc 66] Khai báo biến không gán lại bằng const: observer = tạo đối tượng gồm
  const observer={};
// [VI dòng gốc 67] Chú thích gốc của tác giả; không được thực thi. Nội dung: Trả trạng thái hiện tại để kiểm tra; ý nghĩa từng bộ đếm thuộc phạm vi module này.
  // Trả trạng thái hiện tại để kiểm tra; ý nghĩa từng bộ đếm thuộc phạm vi module này.
// [VI dòng gốc 68] Định nghĩa hàm status; tham số: không có. Mục đích: trả trạng thái để kiểm tra | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm enabled, inside, prefer, reason, playerSearches, monsterSearches, searchReplies, pendingPlayer, lastError.
  function status(){return {enabled:S.enabled,inside:inside(),prefer:'players',reason:S.reason,playerSearches:S.playerSearches,
// [VI dòng gốc 69] Thuộc tính monsterSearches: đọc S.monsterSearches | Thuộc tính searchReplies: đọc S.searchReplies | Thuộc tính pendingPlayer: S.pending?.id hoặc dùng vế phải khi vế trái là null/undefined: null | Thuộc tính lastError: đọc S.lastError
    monsterSearches:S.monsterSearches,searchReplies:S.searchReplies,pendingPlayer:S.pending?.id??null,lastError:S.lastError};}
// [VI dòng gốc 70] Chú thích gốc của tác giả; không được thực thi. Nội dung: Dừng bộ điều khiển, hủy lịch và giải phóng tài nguyên do module này sở hữu.
  // Dừng bộ điều khiển, hủy lịch và giải phóng tài nguyên do module này sở hữu.
// [VI dòng gốc 71] Định nghĩa hàm stop; tham số: không có. Mục đích: dừng bộ điều khiển và dọn tài nguyên | gán S.enabled bằng false | Kiểm tra S.timer!=null: đúng thì chạy nhánh sau if. | gọi W.KVPV_V1?.timers?.clearInterval??W.clearInterval(S.timer)
  function stop(){S.enabled=false;if(S.timer!=null){(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;}
// [VI dòng gốc 72] Kiểm tra S.listening: đúng thì chạy nhánh sau if. | gọi W._Sa?.notify?.off(5978, observer, onSearch) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gán S.listening bằng false | gán S.pending bằng null
    if(S.listening)W._Sa?.notify?.off?.(5978,observer,onSearch);S.listening=false;S.pending=null;return {enabled:false};}
// [VI dòng gốc 73] Chú thích gốc của tác giả; không được thực thi. Nội dung: Bật bộ điều khiển và lịch kiểm tra của module; trả trạng thái sau khi khởi động.
  // Bật bộ điều khiển và lịch kiểm tra của module; trả trạng thái sau khi khởi động.
// [VI dòng gốc 74] Định nghĩa hàm start; tham số: không có. Mục đích: khởi động bộ điều khiển | gán S.enabled bằng true | Kiểm tra !S.listening&&typeof W._Sa?.notify?.on==='function': đúng thì chạy nhánh sau if. | gọi W._Sa.notify.on(5978, observer, onSearch)
  function start(){S.enabled=true;if(!S.listening&&typeof W._Sa?.notify?.on==='function'){W._Sa.notify.on(5978,observer,onSearch);S.listening=true;}
// [VI dòng gốc 75] Kiểm tra S.timer==null: đúng thì chạy nhánh sau if. | gán S.timer bằng (W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,500) | gọi tick() để xử lý một nhịp kiểm tra | Kết thúc hàm hiện tại và trả về: gọi status() để trả trạng thái để kiểm tra.
    if(S.timer==null)S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,500);tick();return status();}
// [VI dòng gốc 76] gán W.KVPV_HONOR_TARGET bằng Object.freeze({start,stop,status,sync:tick}) | gọi start() để khởi động bộ điều khiển
  W.KVPV_HONOR_TARGET=Object.freeze({start,stop,status,sync:tick});start();
// [VI dòng gốc 77] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: })();
})();
// [VI dòng gốc 78] Dòng trống để tách các phần, không có lệnh thực thi.
