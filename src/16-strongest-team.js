// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: CHÚ THÍCH V1 — Chiến Đội Mạnh Nhất.
/* CHÚ THÍCH V1 — Chiến Đội Mạnh Nhất.
 * Dựa trên trạng thái mở và điều kiện đội từ client. Ưu tiên người địch, Boss rồi điểm thu thập của đội; theo dõi thưởng và kết thúc bằng trạng thái native.
 * Sửa nguồn tại đây rồi chạy node build.cjs; FULL và bản vá được sinh tự động. */
// [VI dòng gốc 4] Chú thích gốc của tác giả; không được thực thi. Nội dung: Strongest Team: native scene82, _T3._E2n.enterScene() -> map8201,1.
/* Strongest Team: native scene82, _T3._E2n.enterScene() -> map8201,1.
 * Buttons mirrored from native battle UI: selectTagetId / bossId / collecting.
 * Predictions, paid support and worship are deliberately not automated.
 */
// [VI dòng gốc 8] chạy ngay hàm bao để tạo phạm vi và khởi tạo phần chức năng bên trong
(() => {
// [VI dòng gốc 9] "use strict"
  'use strict';
// [VI dòng gốc 10] Khai báo biến không gán lại bằng const: W = window | gọi W.KVPV_STRONGEST_TEAM?.stop() để dừng bộ điều khiển và dọn tài nguyên (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  const W=window;W.KVPV_STRONGEST_TEAM?.stop?.();
// [VI dòng gốc 11] Khai báo biến không gán lại bằng const: actor = gọi String(W.__KVPV_OWN_ACTOR_ID||'') để chuyển sang chuỗi
  const actor=String(W.__KVPV_OWN_ACTOR_ID||'');
// [VI dòng gốc 12] Khai báo biến không gán lại bằng const: S = tạo đối tượng gồm enabled, timer, phase, reason, day, attempts, entries, lastEntry, lastRefresh, lastAction, closedAt, session, lease, stageAuto, requested, pending, rewardConfirmed, lastError, history
  const S={enabled:true,timer:null,phase:'WAITING',reason:'starting',day:'',attempts:0,entries:0,
// [VI dòng gốc 13] Thuộc tính lastEntry: áp dụng toán tử - lên Infinity | Thuộc tính lastRefresh: áp dụng toán tử - lên Infinity | Thuộc tính lastAction: áp dụng toán tử - lên Infinity | Thuộc tính closedAt: null
    lastEntry:-Infinity,lastRefresh:-Infinity,lastAction:-Infinity,closedAt:null,session:false,lease:false,stageAuto:null,
// [VI dòng gốc 14] Thuộc tính requested: tạo đối tượng bằng Set() | Thuộc tính pending: tạo đối tượng bằng Set() | Thuộc tính rewardConfirmed: 0 | Thuộc tính lastError: ""
    requested:new Set(),pending:new Set(),rewardConfirmed:0,lastError:'',history:[]};
// [VI dòng gốc 15] Khai báo biến không gán lại bằng const: model = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._Ba?._T3?._G_t?.instance nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  const model=()=>W._Ba?._T3?._G_t?.instance;
// [VI dòng gốc 16] Khai báo biến không gán lại bằng const: native = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._Ba?._T3?._E2n?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  const native=()=>W._Ba?._T3?._E2n?.ins;
// [VI dòng gốc 17] Khai báo biến không gán lại bằng const: user = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._Ba?._rJ?._O$?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  const user=()=>W._Ba?._rJ?._O$?.ins;
// [VI dòng gốc 18] Khai báo biến không gán lại bằng const: owned = tạo hàm với tham số (không có); mỗi lần gọi trả về actor&&actor===String(user()?.actorId??'') và chỉ đánh giá vế phải khi vế trái truthy: !W.__KVPV_UNIVERSAL_HALTED
  const owned=()=>actor&&actor===String(user()?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;
// [VI dòng gốc 19] Khai báo biến không gán lại bằng const: prop = tạo hàm với tham số o, k; mỗi lần gọi trả về gọi o?.property?.get(k) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  const prop=(o,k)=>o?.property?.get?.(k);
// [VI dòng gốc 20] Định nghĩa hàm data; tham số: không có | Khai báo biến không gán lại bằng const: api = đọc W._Ba?._T3 nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); m = gọi model(); id = gọi Number(W._C?._Mn?._Cn?.currentID??W._Ba?._$a?._yo?.ins?.intoSce?.[0]) để chuyển sang số
  function data(){const api=W._Ba?._T3,m=model(),id=Number(W._C?._Mn?._Cn?.currentID??W._Ba?._$a?._yo?.ins?.intoSce?.[0]);
// [VI dòng gốc 21] Khai báo biến không gán lại bằng const: type = gọi Number(W._ft?._po?.ins?.getCfgById?.(id)?.[7]??W._Ba?._$a?.SceneUtil?.curScene) để chuyển sang số
    const type=Number(W._ft?._po?.ins?.getCfgById?.(id)?.[7]??W._Ba?._$a?.SceneUtil?.curScene);
// [VI dòng gốc 22] Khai báo biến không gán lại bằng const: team = gọi W._Ba?._a1?._h1?.inst?.getMyFightTeamId() (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const team=W._Ba?._a1?._h1?.inst?.getMyFightTeamId?.();
// [VI dòng gốc 23] Khai báo biến không gán lại bằng const: server = gọi W._Ba?._sst?._ist?.inst?.getCpSceneStateByType(82) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const server=W._Ba?._sst?._ist?.inst?.getCpSceneStateByType?.(82);
// [VI dòng gốc 24] Khai báo biến không gán lại bằng const: time = gọi Number(W._Sa?.svrTime) để chuyển sang số; next = gọi Number(m?.reEnterTime) để chuyển sang số
    const time=Number(W._Sa?.svrTime),next=Number(m?.reEnterTime);
// [VI dòng gốc 25] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm map, type, inside, open, teamId, eligible, cooldownReady, matchStage, matchStageName, score, kills, helpKills, myDamage.
    return {map:id,type,inside:type===82,open:Number(server?.[2])===2,teamId:team??null,
// [VI dòng gốc 26] Thuộc tính eligible: !!team&&api?._d2n?.ins?.isAlive?.(team)===true và chỉ đánh giá vế phải khi vế trái truthy: api?._b2n?.ins?.isHaveWiner===false
      eligible:!!team&&api?._d2n?.ins?.isAlive?.(team)===true&&api?._b2n?.ins?.isHaveWiner===false,
// [VI dòng gốc 27] Thuộc tính cooldownReady: Number.isFinite(time)&&Number.isFinite(next) và chỉ đánh giá vế phải khi vế trái truthy: next<=time
      cooldownReady:Number.isFinite(time)&&Number.isFinite(next)&&next<=time,
// [VI dòng gốc 28] Thuộc tính matchStage: api?._d2n?.ins?.curMatchStage hoặc dùng vế phải khi vế trái là null/undefined: null | Thuộc tính matchStageName: api?.MatchStage?.[api?._d2n?.ins?.curMatchStage] hoặc dùng vế phải khi vế trái là null/undefined: null | Thuộc tính score: Number(m?.score) hoặc dùng vế phải khi vế trái falsy: 0
      matchStage:api?._d2n?.ins?.curMatchStage??null,matchStageName:api?.MatchStage?.[api?._d2n?.ins?.curMatchStage]??null,score:Number(m?.score)||0,
// [VI dòng gốc 29] Thuộc tính kills: Number(m?.killNum) hoặc dùng vế phải khi vế trái falsy: 0 | Thuộc tính helpKills: Number(m?.helpKillNum) hoặc dùng vế phải khi vế trái falsy: 0 | Thuộc tính myDamage: Number(m?.myDamage) hoặc dùng vế phải khi vế trái falsy: 0
      kills:Number(m?.killNum)||0,helpKills:Number(m?.helpKillNum)||0,myDamage:Number(m?.myDamage)||0};}
// [VI dòng gốc 30] Chú thích gốc của tác giả; không được thực thi. Nội dung: Ghi diễn biến vào lịch sử nội bộ có giới hạn để truy vết quyết định.
  // Ghi diễn biến vào lịch sử nội bộ có giới hạn để truy vết quyết định.
// [VI dòng gốc 31] Định nghĩa hàm note; tham số: kind | gọi S.history.push({at:Date.now(),kind}) để thêm phần tử vào cuối mảng | Kiểm tra S.history.length>50: đúng thì chạy nhánh sau if. | gọi S.history.shift()
  function note(kind){S.history.push({at:Date.now(),kind});if(S.history.length>50)S.history.shift();}
// [VI dòng gốc 32] Định nghĩa hàm release; tham số: không có. Mục đích: nhả quyền điều khiển đang giữ | Kiểm tra S.lease: đúng thì chạy nhánh sau if. | gọi W.KVPV?.core?.scene?.release('combat') để nhả quyền điều khiển đang giữ (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gán S.lease bằng false
  function release(){if(S.lease)W.KVPV?.core?.scene?.release?.('combat');S.lease=false;S.session=false;S.closedAt=null;
// [VI dòng gốc 33] Khai báo biến không gán lại bằng const: stage = đọc W._Ba?._Co?._Mo?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Kiểm tra owned()&&S.stageAuto===true&&stage?.auto===false: đúng thì chạy nhánh sau if. | gán stage.auto bằng true | gán S.stageAuto bằng null
    const stage=W._Ba?._Co?._Mo?.ins;if(owned()&&S.stageAuto===true&&stage?.auto===false&&!W.KVPV_EVENT_PRIORITY?.hold?.())stage.auto=true;S.stageAuto=null;}
// [VI dòng gốc 34] Định nghĩa hàm reserve; tham số: không có. Mục đích: xin giữ quyền điều khiển cảnh | Khai báo biến không gán lại bằng const: arbiter = đọc W.KVPV?.core?.scene nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); stage = đọc W._Ba?._Co?._Mo?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  function reserve(){const arbiter=W.KVPV?.core?.scene,stage=W._Ba?._Co?._Mo?.ins;
// [VI dòng gốc 35] Kiểm tra W.KVPV_HITRUN1?.status?.(false)?.running||typeof arbiter?.acquire!=='function': đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: false.
    if(W.KVPV_HITRUN1?.status?.(false)?.running||typeof arbiter?.acquire!=='function')return false;
// [VI dòng gốc 36] Kiểm tra S.stageAuto===null: đúng thì chạy nhánh sau if. | gán S.stageAuto bằng stage?.auto===true | Kiểm tra stage?.auto===true: đúng thì chạy nhánh sau if. | gán stage.auto bằng false
    if(S.stageAuto===null)S.stageAuto=stage?.auto===true;if(stage?.auto===true)stage.auto=false;
// [VI dòng gốc 37] Kiểm tra arbiter.acquire('combat','chien-doi-manh-nhat')!==true: đúng thì chạy nhánh sau if. | gọi release() để nhả quyền điều khiển đang giữ | Kết thúc hàm hiện tại và trả về: false. | gán S.lease bằng true
    if(arbiter.acquire('combat','chien-doi-manh-nhat')!==true){release();return false;}S.lease=true;return true;}
// [VI dòng gốc 38] Chú thích gốc của tác giả; không được thực thi. Nội dung: Đọc các mốc thưởng native, khóa yêu cầu đang chờ và xác nhận bằng trạng thái đã nhận.
  // Đọc các mốc thưởng native, khóa yêu cầu đang chờ và xác nhận bằng trạng thái đã nhận.
// [VI dòng gốc 39] Định nghĩa hàm rewards; tham số: không có | Khai báo biến không gán lại bằng const: m = gọi model()
  function rewards(){const m=model();
// [VI dòng gốc 40] Duyệt từng giá trị trong [...S.pending] bằng const id. | Khai báo biến không gán lại bằng const: id (chưa gán giá trị) | Kiểm tra Number(m?.getStateById?.(id))===2: đúng thì chạy nhánh sau if. | gọi S.pending.delete(id)
    for(const id of [...S.pending])if(Number(m?.getStateById?.(id))===2){S.pending.delete(id);S.rewardConfirmed++;note('REWARD-CONFIRMED-'+id);}
// [VI dòng gốc 41] Kiểm tra typeof native()?.GainStrongestTeamReward!=='function': đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(typeof native()?.GainStrongestTeamReward!=='function')return;
// [VI dòng gốc 42] Duyệt từng giá trị trong [1,2,3,4,6,7] bằng const kind. | Khai báo biến không gán lại bằng const: kind (chưa gán giá trị) | Duyệt từng giá trị trong W._ft?._Cdh?.ins?.getCfgsByType?.(kind)||[] bằng const row. | Khai báo biến không gán lại bằng const: row (chưa gán giá trị)
    for(const kind of [1,2,3,4,6,7])for(const row of W._ft?._Cdh?.ins?.getCfgsByType?.(kind)||[]){
// [VI dòng gốc 43] Khai báo biến không gán lại bằng const: id = gọi Number(row?.[0]) để chuyển sang số | Kiểm tra !Number.isSafeInteger(id)||id<=0||Number(m?.getStateById?.(id))!==1||S.requested.has(id): đúng thì chạy nhánh sau if. | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
      const id=Number(row?.[0]);if(!Number.isSafeInteger(id)||id<=0||Number(m?.getStateById?.(id))!==1||S.requested.has(id))continue;
// [VI dòng gốc 44] gọi S.requested.add(id) | gọi S.pending.add(id) | gọi native().GainStrongestTeamReward(id) | gọi note('REWARD-REQUEST-'+id)
      S.requested.add(id);S.pending.add(id);native().GainStrongestTeamReward(id);note('REWARD-REQUEST-'+id);return;
// [VI dòng gốc 45] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 46] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 47] Chú thích gốc của tác giả; không được thực thi. Nội dung: Chọn người địch trước, sau đó Boss hoặc điểm thu thập của đội; tránh gián đoạn thu thập đang chạy.
  // Chọn người địch trước, sau đó Boss hoặc điểm thu thập của đội; tránh gián đoạn thu thập đang chạy.
// [VI dòng gốc 48] Định nghĩa hàm chooseAction; tham số: không có | Khai báo biến không gán lại bằng const: m = gọi model(); p = gọi user(); world = đọc W._C?._Ba?.instance nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  function chooseAction(){const m=model(),p=user(),world=W._C?._Ba?.instance;
// [VI dòng gốc 49] Kiểm tra !m||typeof p?.selectTar!=='function': đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(!m||typeof p?.selectTar!=='function')return;
// [VI dòng gốc 50] Chú thích gốc của tác giả; không được thực thi. Nội dung: Keep native gathering progress instead of cancelling it every poll.
    // Keep native gathering progress instead of cancelling it every poll.
// [VI dòng gốc 51] Kiểm tra m.collecting&&m.collectEntiyVo: đúng thì chạy nhánh sau if. | gán S.reason bằng 'native_collecting' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(m.collecting&&m.collectEntiyVo){S.reason='native_collecting';return;}
// [VI dòng gốc 52] Khai báo biến không gán lại bằng const: enemies = m.getNearPlayerRank?.() hoặc dùng vế phải khi vế trái falsy: []
    const enemies=m.getNearPlayerRank?.()||[];
// [VI dòng gốc 53] Khai báo biến không gán lại bằng const: enemy = gọi enemies.find(vo=>vo&&String(vo.objId)!==actor&&m.isMyTeam?.(vo.color)===false&& world?.getRole?.(vo.objId)?.isValid!==false&&world?.g…) để tìm phần tử đầu tiên thỏa điều kiện
    const enemy=enemies.find(vo=>vo&&String(vo.objId)!==actor&&m.isMyTeam?.(vo.color)===false&&
// [VI dòng gốc 54] gọi world?.getRole(vo.objId)
      world?.getRole?.(vo.objId)?.isValid!==false&&world?.getRole?.(vo.objId));
// [VI dòng gốc 55] Kiểm tra enemy: đúng thì chạy nhánh sau if.
    if(enemy){
// [VI dòng gốc 56] Kiểm tra String(m.selectTagetId)!==String(enemy.objId): đúng thì chạy nhánh sau if. | gọi m.resetState() (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gán m.collectEntiyVo bằng null | gán m.selectTagetId bằng enemy.objId
      if(String(m.selectTagetId)!==String(enemy.objId)){m.resetState?.();m.collectEntiyVo=null;m.selectTagetId=enemy.objId;p.selectTar(2,enemy.objId);note('TARGET-ENEMY');}
// [VI dòng gốc 57] gán S.reason bằng 'native_enemy_target' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      S.reason='native_enemy_target';return;
// [VI dòng gốc 58] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 59] Khai báo biến không gán lại bằng const: nodes = m.getCollectInfo?.() hoặc dùng vế phải khi vế trái falsy: []; bossNode = gọi nodes.find(x=>x&&!x.areaId) để tìm phần tử đầu tiên thỏa điều kiện
    const nodes=m.getCollectInfo?.()||[],bossNode=nodes.find(x=>x&&!x.areaId);
// [VI dòng gốc 60] Khai báo biến không gán lại bằng const: boss = bossNode và chỉ đánh giá vế phải khi vế trái truthy: world?.findNearMonster?.(0,0,Number.MAX_VALUE,bossNode.npcId)
    const boss=bossNode&&world?.findNearMonster?.(0,0,Number.MAX_VALUE,bossNode.npcId);
// [VI dòng gốc 61] Kiểm tra boss&&boss.isValid!==false: đúng thì chạy nhánh sau if. | Khai báo biến không gán lại bằng const: hp = gọi prop(boss, 'hp'); id = prop(boss,'id') hoặc dùng vế phải khi vế trái là null/undefined: boss.id
    if(boss&&boss.isValid!==false){const hp=prop(boss,'hp'),id=prop(boss,'id')??boss.id;
// [VI dòng gốc 62] Kiểm tra id!=null&&(!Array.isArray(hp)||Number(hp[0])>0): đúng thì chạy nhánh sau if.
      if(id!=null&&(!Array.isArray(hp)||Number(hp[0])>0)){
// [VI dòng gốc 63] Kiểm tra String(m.bossId)!==String(id): đúng thì chạy nhánh sau if. | gọi m.resetState() (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gán m.collectEntiyVo bằng null | gán m.bossId bằng id
        if(String(m.bossId)!==String(id)){m.resetState?.();m.collectEntiyVo=null;m.bossId=id;p.selectTar(1,id);note('TARGET-BOSS');}
// [VI dòng gốc 64] gán S.reason bằng 'native_boss_target' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
        S.reason='native_boss_target';return;
// [VI dòng gốc 65] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
      }
// [VI dòng gốc 66] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 67] Khai báo biến không gán lại bằng const: ownNode = gọi nodes.find(x=>x?.areaId&&m.isMyTeam?.(x.color)===true) để tìm phần tử đầu tiên thỏa điều kiện
    const ownNode=nodes.find(x=>x?.areaId&&m.isMyTeam?.(x.color)===true);
// [VI dòng gốc 68] Kiểm tra ownNode: đúng thì chạy nhánh sau if. | gán m.selectTagetId bằng -1 | gán m.bossId bằng -1 | gán m.collecting bằng true
    if(ownNode){m.selectTagetId=-1;m.bossId=-1;m.collecting=true;m.collectEntiyVo=ownNode;S.reason='native_collect_own_area';note('COLLECT-OWN');return;}
// [VI dòng gốc 69] gọi m.resetState() (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gán m.collectEntiyVo bằng null | gán m.findTarget bằng true | gọi p.selectTar(2, -1)
    m.resetState?.();m.collectEntiyVo=null;m.findTarget=true;p.selectTar(2,-1);S.reason='native_find_enemy';note('FIND-ENEMY');
// [VI dòng gốc 70] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 71] Định nghĩa hàm refresh; tham số: không có. Mục đích: làm mới dữ liệu theo điều kiện của hàm | Kiểm tra Date.now()-S.lastRefresh<30000: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể. | gán S.lastRefresh bằng Date.now()
  function refresh(){if(Date.now()-S.lastRefresh<30000)return;S.lastRefresh=Date.now();
// [VI dòng gốc 72] gọi native()?.GetStrongestTeamEnterTime() (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gọi native()?.GetStrongestTeamReward(0) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    native()?.GetStrongestTeamEnterTime?.();native()?.GetStrongestTeamReward?.(0);}
// [VI dòng gốc 73] Chú thích gốc của tác giả; không được thực thi. Nội dung: Thực hiện một lượt kiểm tra của module; các nhánh bên dưới quyết định có đủ điều kiện để hành động hay phải chờ.
  // Thực hiện một lượt kiểm tra của module; các nhánh bên dưới quyết định có đủ điều kiện để hành động hay phải chờ.
// [VI dòng gốc 74] Định nghĩa hàm tick; tham số: không có. Mục đích: xử lý một nhịp kiểm tra | Kiểm tra W.KVPV_ENTRY_POLICY?.manual===true: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể. | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài.
  function tick(){if(W.KVPV_ENTRY_POLICY?.manual===true)return;try{
// [VI dòng gốc 75] Kiểm tra !S.enabled||!owned(): đúng thì chạy nhánh sau if. | gọi stop() để dừng bộ điều khiển và dọn tài nguyên | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(!S.enabled||!owned()){stop();return;}
// [VI dòng gốc 76] Khai báo biến không gán lại bằng const: d = gọi data(); time = gọi Date.now(); day = W.KVPV_DAILY_CLOCK?.key?.() hoặc dùng vế phải khi vế trái là null/undefined: new Date(Date.now()+2*3600000).toISOString().slice(0,10)
    const d=data(),time=Date.now(),day=W.KVPV_DAILY_CLOCK?.key?.()??new Date(Date.now()+2*3600000).toISOString().slice(0,10);
// [VI dòng gốc 77] Kiểm tra day!==S.day: đúng thì chạy nhánh sau if. | gán S.day bằng day | gán S.attempts bằng 0 | gán S.requested bằng new Set(S.pending)
    if(day!==S.day){S.day=day;S.attempts=0;S.requested=new Set(S.pending);}
// [VI dòng gốc 78] Kiểm tra d.inside: đúng thì chạy nhánh sau if.
    if(d.inside){
// [VI dòng gốc 79] Kiểm tra !S.session: đúng thì chạy nhánh sau if. | Kiểm tra !reserve(): đúng thì chạy nhánh sau if. | gán S.reason bằng 'scene_reserved' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      if(!S.session){if(!reserve()){S.reason='scene_reserved';return;}S.session=true;S.entries++;S.lastAction=-Infinity;native()?.StrongestTeamScoreRank?.();note('ENTRY-CONFIRMED');}
// [VI dòng gốc 80] gọi W.KVPV?.core?.scene?.renew('combat') để gia hạn quyền đang giữ (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gọi refresh() để làm mới dữ liệu theo điều kiện của hàm | gọi rewards()
      W.KVPV?.core?.scene?.renew?.('combat');refresh();rewards();
// [VI dòng gốc 81] Kiểm tra S.phase==='EXITING': đúng thì chạy nhánh sau if. | gán S.reason bằng 'waiting_exit_confirmation' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      if(S.phase==='EXITING'){S.reason='waiting_exit_confirmation';return;}
// [VI dòng gốc 82] gán S.phase bằng 'ACTIVE'
      S.phase='ACTIVE';
// [VI dòng gốc 83] Kiểm tra !d.open: đúng thì chạy nhánh sau if, sai thì chạy nhánh else.
      if(!d.open){
// [VI dòng gốc 84] Kiểm tra S.closedAt===null: đúng thì chạy nhánh sau if. | gán S.closedAt bằng time | gán S.reason bằng 'server_closed_waiting_rewards'
        if(S.closedAt===null)S.closedAt=time;S.reason='server_closed_waiting_rewards';
// [VI dòng gốc 85] Khai báo biến không gán lại bằng const: grace = nếu S.pending.size thì lấy 150000, ngược lại lấy 90000
        const grace=S.pending.size?150000:90000;
// [VI dòng gốc 86] Kiểm tra time-S.closedAt>=grace&&typeof W._Ba?._sst?._Cht?.inst?.rqEtScene==='function': đúng thì chạy nhánh sau if.
        if(time-S.closedAt>=grace&&typeof W._Ba?._sst?._Cht?.inst?.rqEtScene==='function'){
// [VI dòng gốc 87] gán S.phase bằng 'EXITING' | gọi W._Ba._sst._Cht.inst.rqEtScene(0) để gửi yêu cầu vào/ra cảnh qua luồng native | gọi note('EXIT-REQUEST')
          S.phase='EXITING';W._Ba._sst._Cht.inst.rqEtScene(0);note('EXIT-REQUEST');
// [VI dòng gốc 88] Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
        }return;
// [VI dòng gốc 89] gán S.closedAt bằng null
      }else S.closedAt=null;
// [VI dòng gốc 90] Kiểm tra user()?.isDead===true: đúng thì chạy nhánh sau if. | gán S.reason bằng 'waiting_revive' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      if(user()?.isDead===true){S.reason='waiting_revive';return;}
// [VI dòng gốc 91] Kiểm tra time-S.lastAction>=4000: đúng thì chạy nhánh sau if. | gán S.lastAction bằng time | gọi chooseAction() | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      if(time-S.lastAction>=4000){S.lastAction=time;chooseAction();}return;
// [VI dòng gốc 92] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 93] Kiểm tra S.session: đúng thì chạy nhánh sau if. | gọi release() để nhả quyền điều khiển đang giữ | gán S.phase bằng 'WAITING' | gọi note('LEFT-EVENT')
    if(S.session){release();S.phase='WAITING';note('LEFT-EVENT');}
// [VI dòng gốc 94] Kiểm tra S.phase==='ENTERING': đúng thì chạy nhánh sau if.
    if(S.phase==='ENTERING'){
// [VI dòng gốc 95] Kiểm tra time-S.lastEntry<25000: đúng thì chạy nhánh sau if. | gán S.reason bằng 'waiting_scene_82' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      if(time-S.lastEntry<25000){S.reason='waiting_scene_82';return;}
// [VI dòng gốc 96] gọi release() để nhả quyền điều khiển đang giữ | gán S.phase bằng 'WAITING' | gán S.reason bằng 'entry_not_confirmed' | gọi note('ENTRY-TIMEOUT')
      release();S.phase='WAITING';S.reason='entry_not_confirmed';note('ENTRY-TIMEOUT');
// [VI dòng gốc 97] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 98] Khai báo biến không gán lại bằng const: job = đọc W.KVPV_DAILY?.quickState?.()?.job nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const job=W.KVPV_DAILY?.quickState?.()?.job;
// [VI dòng gốc 99] Kiểm tra (job&&job!=='rảnh'&&job!=='ranh')||W.KVPV_TQ_SCOPE?.inside?.()===true: đúng thì chạy nhánh sau if. | gán S.reason bằng 'other_job_active' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if((job&&job!=='rảnh'&&job!=='ranh')||W.KVPV_TQ_SCOPE?.inside?.()===true){S.reason='other_job_active';return;}
// [VI dòng gốc 100] Kiểm tra W._Ba?._$a?.SceneUtil?.isCommonScene!==true: đúng thì chạy nhánh sau if. | gán S.reason bằng 'outside_common_scene' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(W._Ba?._$a?.SceneUtil?.isCommonScene!==true){S.reason='outside_common_scene';return;}
// [VI dòng gốc 101] gọi rewards()
    rewards();
// [VI dòng gốc 102] Kiểm tra !d.open: đúng thì chạy nhánh sau if. | gán S.reason bằng 'waiting_server_scene_82_open' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(!d.open){S.reason='waiting_server_scene_82_open';return;}
// [VI dòng gốc 103] gọi refresh() để làm mới dữ liệu theo điều kiện của hàm
    refresh();
// [VI dòng gốc 104] Kiểm tra !d.eligible||!d.cooldownReady||user()?.isDead===true: đúng thì chạy nhánh sau if. | gán S.reason bằng 'team_not_eligible_or_cooldown' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(!d.eligible||!d.cooldownReady||user()?.isDead===true){S.reason='team_not_eligible_or_cooldown';return;}
// [VI dòng gốc 105] Kiểm tra time-S.lastEntry<30000||S.attempts>=15: đúng thì chạy nhánh sau if. | gán S.reason bằng 'entry_retry_limit' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(time-S.lastEntry<30000||S.attempts>=15){S.reason='entry_retry_limit';return;}
// [VI dòng gốc 106] Kiểm tra typeof native()?.enterScene!=='function'||!reserve(): đúng thì chạy nhánh sau if. | gán S.reason bằng 'entry_api_or_scene_unavailable' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(typeof native()?.enterScene!=='function'||!reserve()){S.reason='entry_api_or_scene_unavailable';return;}
// [VI dòng gốc 107] gán S.lastEntry bằng time | tăng S.attempts một đơn vị sau khi lấy giá trị | gán S.phase bằng 'ENTERING' | gán S.reason bằng 'waiting_scene_82'
    S.lastEntry=time;S.attempts++;S.phase='ENTERING';S.reason='waiting_scene_82';note('ENTRY-REQUEST');native().enterScene();
// [VI dòng gốc 108] Nhận lỗi bằng e và chạy phần xử lý lỗi. | gán S.lastError bằng String(e?.message||e) | gán S.reason bằng 'error'
  }catch(e){S.lastError=String(e?.message||e);S.reason='error';}}
// [VI dòng gốc 109] Chú thích gốc của tác giả; không được thực thi. Nội dung: Trả trạng thái hiện tại để kiểm tra; ý nghĩa từng bộ đếm thuộc phạm vi module này.
  // Trả trạng thái hiện tại để kiểm tra; ý nghĩa từng bộ đếm thuộc phạm vi module này.
// [VI dòng gốc 110] Định nghĩa hàm status; tham số: không có. Mục đích: trả trạng thái để kiểm tra | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm các thuộc tính của data(), enabled, phase, reason, entryAttempts, confirmedEntries, rewardPending, rewardConfirmed, lastError, history.
  function status(){return {...data(),enabled:S.enabled,phase:S.phase,reason:S.reason,entryAttempts:S.attempts,
// [VI dòng gốc 111] Thuộc tính confirmedEntries: đọc S.entries | Thuộc tính rewardPending: đọc S.pending.size | Thuộc tính rewardConfirmed: đọc S.rewardConfirmed | Thuộc tính lastError: đọc S.lastError
    confirmedEntries:S.entries,rewardPending:S.pending.size,rewardConfirmed:S.rewardConfirmed,lastError:S.lastError,history:S.history.slice()};}
// [VI dòng gốc 112] Chú thích gốc của tác giả; không được thực thi. Nội dung: Dừng bộ điều khiển, hủy lịch và giải phóng tài nguyên do module này sở hữu.
  // Dừng bộ điều khiển, hủy lịch và giải phóng tài nguyên do module này sở hữu.
// [VI dòng gốc 113] Định nghĩa hàm stop; tham số: không có. Mục đích: dừng bộ điều khiển và dọn tài nguyên | gán S.enabled bằng false | Kiểm tra S.timer!=null: đúng thì chạy nhánh sau if. | gọi W.KVPV_V1?.timers?.clearInterval??W.clearInterval(S.timer)
  function stop(){S.enabled=false;if(S.timer!=null){(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;}
// [VI dòng gốc 114] gọi release() để nhả quyền điều khiển đang giữ | gán S.phase bằng 'OFF' | gán S.reason bằng 'stopped' | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm enabled.
    release();S.phase='OFF';S.reason='stopped';return {enabled:false};}
// [VI dòng gốc 115] Chú thích gốc của tác giả; không được thực thi. Nội dung: Bật bộ điều khiển và lịch kiểm tra của module; trả trạng thái sau khi khởi động.
  // Bật bộ điều khiển và lịch kiểm tra của module; trả trạng thái sau khi khởi động.
// [VI dòng gốc 116] Định nghĩa hàm start; tham số: không có. Mục đích: khởi động bộ điều khiển | gán S.enabled bằng true | Kiểm tra S.timer==null: đúng thì chạy nhánh sau if. | gán S.timer bằng (W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,1000)
  function start(){S.enabled=true;if(S.timer==null)S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,1000);tick();return status();}
// [VI dòng gốc 117] gán W.KVPV_STRONGEST_TEAM bằng Object.freeze({start,stop,status,sync:tick}) | gọi start() để khởi động bộ điều khiển
  W.KVPV_STRONGEST_TEAM=Object.freeze({start,stop,status,sync:tick});start();
// [VI dòng gốc 118] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: })();
})();
// [VI dòng gốc 119] Dòng trống để tách các phần, không có lệnh thực thi.
