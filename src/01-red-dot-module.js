(() => {
  'use strict';
  const W = window, old = W.KVPV_RED_DOT_MODULE;
  const loginAwardDefs = new Map([
    [389, { act: 101, kind: 'daily' }], [432, { act: 201, kind: 'daily' }],
    [482, { act: 301, kind: 'daily' }], [483, { act: 401, kind: 'daily' }],
    [551, { act: 501, kind: 'daily' }], [747, { act: 601, kind: 'daily' }],
    [748, { act: 701, kind: 'daily' }], [749, { act: 801, kind: 'daily' }],
    [1181, { act: 901, kind: 'daily' }], [1182, { act: 1001, kind: 'daily' }],
    [1183, { act: 1101, kind: 'daily' }], [1184, { act: 1201, kind: 'daily' }],
    [1422, { act: 1301, kind: 'daily' }], [1423, { act: 1401, kind: 'daily' }],
    [1424, { act: 1501, kind: 'daily' }], [586, { act: 10001, kind: 'hq' }]
  ]);
  const loginAwardIds = new Set(loginAwardDefs.keys());
  const adventureCarry=W.KVPV_ADVENTURE?._handoff?.(),adventureActor=String(W.__KVPV_OWN_ACTOR_ID||''),sameAdventure=adventureCarry?.actor===adventureActor;
  W.KVPV_ADVENTURE?.stop?.();W.KVPV_V871?.stop?.();
  old?.stop?.();
  const S = { enabled: false, timer: null, reason: 'stopped', sent: 0, confirmed: 0, lastError: '', startedAt: 0,
    tienThe: { pending: null, blocked: null, lastSend: 0, blocking: false, reason: 'waiting' },
    xianwei: { pending:null, blocked:null, lastSend:0, blocking:false, reason:'waiting', claimed:0 },
    tienDan: { pending: null, blocked: null, lastSend: 0, blocking: false, reason: 'waiting' },
    runeResolve: { pending: null, blocked: null, lastSend: 0, blocking: false, reason: 'waiting' },
    weaponSoul: { pending: null, blocked: null, lastSend: 0, blocking: false, reason: 'waiting' },
    wingSoul: { pending: null, blocked: null, lastSend: 0, blocking: false, reason: 'waiting' },
    fashionSoul: { pending: null, blocked: null, lastSend: 0, blocking: false, reason: 'waiting' },
    armSoul: { pending: null, blocked: null, lastSend: 0, blocking: false, reason: 'waiting' },
    cloakSoul: { pending: null, blocked: null, lastSend: 0, blocking: false, reason: 'waiting' },
    bloodline: { pending: null, blocked: null, lastSend: 0, blocking: false, reason: 'waiting' },
    soulEating: { pending: null, blocked: null, lastSend: 0, blocking: false, reason: 'waiting' },
    magicQuick: { pending: null, blocked: null, lastSend: 0, blocking: false, reason: 'waiting' },
    faBaoQuick: { pending: null, blocked: null, lastSend: 0, blocking: false, reason: 'waiting' },
    transform: { pending: null, blocked: null, lastSend: 0, blocking: false, reason: 'waiting' },
    mount: { pending: null, blocked: null, lastSend: 0, blocking: false, reason: 'waiting' },
    linhThu: { pending: null, blocked: null, lastSend: 0, blocking: false, reason: 'waiting' },
    thanThuStrength: { pending: null, blocked: null, lastSend: 0, blocking: false, reason: 'waiting' },
    gearStrength: { pending: null, blocked: null, lastSend: 0, blocking: false, reason: 'waiting' },
    soulStone: { pending: null, blocked: null, lastSend: 0, blocking: false, reason: 'waiting' },
    soulForge: { pending: null, blocked: null, lastSend: 0, blocking: false, reason: 'waiting' },
    inventoryUse: { pending: null, blocked: new Set(), lastSend: 0, blocking: false, reason: 'waiting', used: 0, skipped: 0 },
    smelt: Object.fromEntries(['equip','holy','pet'].map(key=>[key,{pending:null,blocked:null,lastSend:0,blocking:false,reason:'waiting',ack:0}])),
    compose: { pending:null, lastSend:0, blocking:false, reason:'waiting', ack:0, confirmed:0, failed:0, blocked:new Map(), blockedUntil:0, probe:null },
    tombGear: { pending: null, blocked: null, lastSend: 0, blocking: false, reason: 'waiting' },
    tombBoss: { pending:null, blocking:false, reason:'waiting', attempts:0, dayKey:'', blockedBosses:new Set(), activeBoss:null },
    expGroup: { blocking:false, reason:'waiting_red_dot' },
    frontline: { pending: null, attempted: '', enteredAt: 0, exitSent: false, reason: 'waiting' },
    treasureFree: { pending: null, blocked: null, lastSend: 0, blocking: false, reason: 'waiting' },
    weeklyWelfare: { pending:null, blocked:null, lastSend:0, blocking:false, reason:'waiting' },
    jiuXiaoLing: { pending:null, blocked:null, lastSend:0, blocking:false, reason:'waiting' },
    weekendConsume: { pending:null, blocked:null, lastSend:0, blocking:false, reason:'waiting' },
    dailyCheckin: { pending:null, blocked:null, lastSend:0, blocking:false, reason:'waiting' },
    loginAwards: { pending:null, blocked:null, lastSend:0, blocking:false, reason:'waiting', claimed:0 },
    marriage: { pending:null, blocked:null, lastSend:0, blocking:false, reason:'waiting', intimacyRun:false, claimed:0, upgraded:0 },
    phucOa: { pending:null, blocked:null, lastSend:0, blocking:false, reason:'waiting', upgraded:0 },
    coBao: { pending:null, blocked:null, lastSend:0, lastInfoRefresh:0, chainPlacement:false, chainStarted:0, blocking:false, reason:'waiting', claimed:0, placed:0 },
    onlineReward: { pending:null, blocked:null, lastSend:0, blocking:false, reason:'waiting' },
    dailyMonster: { pending:null, blocked:null, lastSend:0, blocking:false, reason:'waiting', claimed:0 },
    adventure: { enabled:true, blocking:false, reason:'waiting_red_dot', nextAt:0, dispatched:0, pending:new Map(sameAdventure?adventureCarry.pending:[]), navigated:new Set(sameAdventure?adventureCarry.navigated:[]), mini:new Map(sameAdventure?adventureCarry.mini:[]), requests:sameAdventure?adventureCarry.requests:0, confirmed:sameAdventure?adventureCarry.confirmed:0, lastRefresh:sameAdventure?(adventureCarry.lastRefresh??-Infinity):-Infinity, refreshed:new Set(sameAdventure?adventureCarry.refreshed:[]), error:'', notifyReady:false, legacyStopped:false },
    payTurntableReward: { pending:null, blocked:null, lastSend:0, lastRefresh:0, blocking:false, reason:'waiting' },
    happyFrenzy: { pending:null, blocked:null, lastSend:0, blocking:false, reason:'waiting' },
    mail: { pending:null, blocked:null, lastSend:0, lastRefresh:0, blocking:false, reason:'waiting', claimed:0, deleted:0 },
    xianfu: { pending:null, blocked:null, lastSend:0, blocking:false, reason:'waiting', ack:0, cursor:new Map(), lastRefresh:0, watcher:false, ackOk:null, ackErr:null, lastTaskQuery:0 },
    xianfuAppearance: { pending:null, blocked:null, lastSend:0, blocking:false, reason:'waiting' },
    weaponIllusion: { pending:null, blocked:null, lastSend:0, blocking:false, reason:'waiting' },
    appearanceIllusion: { pending:null, blocked:null, lastSend:0, blocking:false, reason:'waiting' },
    thanhVanMeditation: { pending:null, blocked:null, lastSend:0, blocking:false, reason:'waiting', confirmed:0 },
    maThan: { pending:null, blocked:null, lastSend:0, blocking:false, reason:'waiting', confirmed:0, selected:null } };
  let redScanReady = false;
  const redCatalog = new Map([
    [15, { name: 'Luyện Khí – Cường Hóa nhanh', module: 'src/01-red-dot-module.js', route: 'native oneKeyUp while owned material and copper permit; promote eligible ranks; no purchase calls', automatic: true }], [16, { name: 'Luyện Khí – Đá Hồn', module: 'src/01-red-dot-module.js', route: 'native quick socket into empty slots; promote master rank only when server marks it ready; no replacement or purchase', automatic: true }], [156, { name: 'Luyện Khí – Thôn Phệ và Đúc Hồn nhanh', module: 'src/01-red-dot-module.js', route: 'native ShOperOneKey for eligible soul-eating parts 1–6 first; then ZhOperOneKey with owned selected material; await server ACK; no purchase', automatic: true }], [249, { name: 'Ghép trang bị', module: 'src/44-red-navigator.js', route: 'action 249', automatic: true }],
    [110, { name: 'Boss Chiến Tuyến Lv.1300', module: 'src/01-red-dot-module.js', route: 'red dot 110; timed native entry to map 2151/2152, select only a live Lv.1300 Boss, exit at event end; no attempt purchase', automatic: true }],
    [842, { name: 'Trang Bị Thiên Mộ – Rã nhanh', module: 'src/01-red-dot-module.js', route: 'native getSplitRewards selection + Tmei resolve packet; wait for inventory ACK before strengthening', automatic: true }], [828, { name: 'Trang Bị Thiên Mộ – Cường hóa nhanh', module: 'src/01-red-dot-module.js', route: 'native oneKeyUp after dismantle ACK; precheck owned upgrade material; never purchase currency', automatic: true }],
    [1, { name: 'Bồi dưỡng Linh Thú', module: '', route: 'tắt theo chính sách người dùng', automatic: false }], [7, { name: 'Bồi dưỡng Ngự Thú/Thú Cưỡi', module: '', route: 'tắt theo chính sách người dùng', automatic: false }],
    [19, { name: 'Nâng cấp kỹ năng đặc biệt', module: '', route: 'chưa có handler tự động', automatic: false }],
    [234, { name: 'Nâng cấp Biến Thân', module: 'src/01-red-dot-module.js', route: 'native onTransformingUpgradeReq(0); kiểm tra vật phẩm và chờ dữ liệu cấp xác nhận', automatic: true }],
    [235, { name: 'Kỹ năng Biến Thân có thể nâng cấp/kích hoạt', module: 'src/01-red-dot-module.js', route: 'native onTransformingUpgradeReq(1, skillId); kiểm tra cấp kế và chờ phản hồi game', automatic: true }],
    [230, { name: 'Ảo Hóa Biến Thân loại 4', module: 'src/01-red-dot-module.js', route: 'native RiseTransformingMagicShow; kiểm tra điều kiện, vật phẩm và SVIP', automatic: true }],
    [231, { name: 'Ảo Hóa Biến Thân loại 3', module: 'src/01-red-dot-module.js', route: 'native RiseTransformingMagicShow; kiểm tra điều kiện, vật phẩm và SVIP', automatic: true }],
    [232, { name: 'Ảo Hóa Biến Thân loại 5', module: 'src/01-red-dot-module.js', route: 'native RiseTransformingMagicShow; kiểm tra điều kiện, vật phẩm và SVIP', automatic: true }],
    [233, { name: 'Ảo Hóa Biến Thân loại 6', module: 'src/01-red-dot-module.js', route: 'native RiseTransformingMagicShow; kiểm tra điều kiện, vật phẩm và SVIP', automatic: true }],
    [20, { name: 'Tiên Thể có thể tu luyện', module: 'src/01-red-dot-module.js', route: 'red dot 20; nâng tuần tự các dòng thấp bậc nhất bằng native rfSoul; không mua vàng', automatic: true }], [21, { name: 'Tiên Vị – Nhận nhiệm vụ hoàn thành', module: 'src/01-red-dot-module.js', route: 'red dot 21; native getTaskAward(id) for task rows in state 1; wait for Xianwei task ACK', automatic: true }], [173, { name: 'Trang bị có thể ghép trong Túi', module: '', route: 'chưa có handler; cần xác nhận trang bị và nguyên liệu', automatic: false }],
    [167, { name: 'Tiên Đơn có thuốc có thể dùng', module: 'src/01-red-dot-module.js', route: 'red dot 167; dùng nhanh theo nhóm bằng native oneKUseXD, tôn trọng giới hạn ngày và từng loại thuốc', automatic: true }],
    [476, { name: 'Thiên Cơ Đơn', module: '', route: 'red dot riêng; chưa gán handler Tiên Đơn', automatic: false }],
    [159, { name: 'Cổ Bảo – Đặt mảnh đang sở hữu', module: 'src/01-red-dot-module.js', route: 'mở action 189 rồi gọi epFragment([id]) cho mảnh đang sở hữu của Cổ Bảo kế tiếp; chờ epFrgmtsDic ACK', automatic: true }],
    [46, { name: 'Thiên Kiếp – Nhận mảnh Cổ Bảo', module: 'src/01-red-dot-module.js', route: 'chỉ nhận mốc đã mở khi red dot Nhấp Nhận trên panel Thiên Kiếp hiện; getCpAward(mapId, level), chờ awardLvs ACK', automatic: true }],
    [384, { name: 'Tặng Quà – Tăng cấp vật phẩm hôn nhân', module: 'src/01-red-dot-module.js', route: 'native promoteKeepsakeRank only when all configured cost items are owned; reject KNB item 90140001; wait for rank ACK', automatic: true }],
    [385, { name: 'Tặng Quà – Vật phẩm hôn nhân có thể tăng cấp', module: 'src/01-red-dot-module.js', route: 'native promoteKeepsakeRank only when all configured cost items are owned; reject KNB item 90140001; wait for rank ACK', automatic: true }],
    [36, { name: 'Boss Server → Boss Nhóm (scene type 4)', module: 'src/03-daily-core.js', route: 'khi red dot 36 hoạt động, chọn boss nhóm đủ cấp còn sống bằng dữ liệu server, vào bằng rqEtScene, theo dõi hạ boss rồi thoát; không nạp lượt', automatic: true }], [37, { name: 'Boss có lượt đánh (scene type 10)', module: 'src/03-daily-core.js', route: 'red-dot dispatch Yêu Vương bằng tuyến boss đã xác minh; theo dõi hạ boss rồi thoát', automatic: false }], [435, { name: 'Lượt đấu/nhận thưởng Đấu Hôn Nhân', module: '', route: 'chưa có handler tự động', automatic: false }],
    [45, { name: 'Boss phó bản đơn có thể khiêu chiến', module: '', route: 'chưa có tuyến điều hướng đã xác minh', automatic: false }],
    [54, { name: 'Thưởng tiến độ ải hằng ngày', module: '', route: 'chưa có handler nhận thưởng', automatic: false }], [57, { name: 'Hằng Ngày – Treo Máy Hằng Yêu và Boss Hằng Ngày', module: 'src/01-red-dot-module.js', route: 'native getXiangyaoReward([0/1]) khi đủ số quái/BOSS Yêu Ma và còn lượt nhận; chờ receivedTimes ACK; không mua lượt', automatic: true }], [257, { name: 'Phúc lợi – Điểm danh ngày', module: 'src/01-red-dot-module.js', route: 'native TocT chỉ khi signState cho phép điểm danh; chờ signState/signNum xác nhận; không nhận mốc tích lũy', automatic: true }], [259, { name: 'Phúc lợi – Quà Online', module: 'src/01-red-dot-module.js', route: 'native TBhT([id]) từng mốc online đang nhận được; chờ updateRewardReply xác nhận; không mở giao diện', automatic: true }],
    [48, { name: 'Ghép Đá Hồn', module: 'src/01-red-dot-module.js', route: 'native item_compose type 1; material-count checks; send TdKp one recipe at a time and wait for ComposeReply ACK', automatic: true }], [49, { name: 'Ghép Đạo Cụ', module: 'src/01-red-dot-module.js', route: 'native item_compose type 2; material-count checks; send TdKp one recipe at a time and wait for ComposeReply ACK', automatic: true }], [51, { name: 'Phân giải vật phẩm', module: '', route: 'chưa có handler; không tự phân giải', automatic: false }],
    [118, { name: 'Thông báo hợp thành Ngự Thú', module: '', route: 'chưa có handler tự động', automatic: false }], [119, { name: 'Trang Bị – Dung Luyện', module: 'src/01-red-dot-module.js', route: 'native getCanFusionItems + c2sOneKeyFusion; send selected eligible UIDs and wait for server inventory ACK', automatic: true }], [850, { name: 'Thần Thú – Dung Luyện', module: 'src/01-red-dot-module.js', route: 'native getAnmlFusions + oneKeyResolve; send selected eligible UIDs and wait for server ACK', automatic: true }],
    [112, { name: 'Sự kiện quảng cáo có lượt/đồ nhận', module: '', route: 'chưa có handler; nhận thưởng thủ công', automatic: false }], [141, { name: 'Kỳ Ngộ – Thám Hiểm', module: 'src/01-red-dot-module.js', route: 'red dot 141; dispatch the verified adventure event-list workflow only while active; native free claims/exploration, wait for event-state ACK; no purchases', automatic: true }],
    [325, { name: 'Thưởng đăng nhập/SVIP', module: 'src/01-red-dot-module.js', route: 'red dot 325: lần lượt nhận mốc SVIP đủ điều kiện rồi nhận thưởng ngày qua RPC gốc, chờ server cập nhật giữa các lượt', automatic: true }],
    [375, { name: 'Tiên Duyên – Nhiệm vụ cả đời', module: 'src/01-red-dot-module.js', route: 'chỉ nhận các nhiệm vụ kết duyên loại 2 ở trạng thái hoàn thành; dùng RPC gốc và chờ task-list ACK', automatic: true }],
    [376, { name: 'Tiên Duyên – Nhiệm vụ ngày', module: 'src/01-red-dot-module.js', route: 'chỉ nhận các nhiệm vụ kết duyên loại 1 ở trạng thái hoàn thành; dùng RPC gốc và chờ task-list ACK', automatic: true }],
    [377, { name: 'Tiên Duyên – Phó Bản (tối đa 2 lượt sẵn có)', module: 'src/03-daily-core.js', route: 'dùng tuyến Nhẫn Cưới → Phó Bản Tiên Duyên đã xác minh; chỉ lượt server cấp, không gộp lượt và không mua lượt; chờ xác nhận tiêu lượt rồi xét lượt kế tiếp', automatic: true }],
    [378, { name: 'Tiên Duyên – Bồi dưỡng Nhẫn Cưới', module: 'src/01-red-dot-module.js', route: 'native AddMarryRingExp chỉ khi checkRingUPRP và có sẵn vật liệu 81016; chờ level/exp/túi ACK', automatic: true }],
    [379, { name: 'Tiên Duyên – Bồi dưỡng thân mật', module: 'src/01-red-dot-module.js', route: 'native AddMarryIntimacyExp chỉ dùng vật phẩm 81015 đang sở hữu; dừng khi hết vật phẩm hoặc đạt tối đa', automatic: true }],
    [380, { name: 'Tiên Duyên – Nhận thưởng thân mật', module: 'src/01-red-dot-module.js', route: 'native GetMarryIntimacyLevelReward; chỉ nhận mốc đã mở và chờ reward-level ACK', automatic: true }],
    [382, { name: 'Tiên Duyên – Kỹ năng Nhẫn Cưới cơ bản/đặc biệt', module: 'src/01-red-dot-module.js', route: 'native LevelUpMarryRingSkill/OpenMarryRingSpecialSkill; native eligibility and owned-material checks; await skill ACK', automatic: true }],
    [383, { name: 'Tiên Duyên – Nhận quà Cây Tiền đã mở', module: 'src/01-red-dot-module.js', route: 'native GetMarryRewardCardReward only for an active, claimable owned card; never buy a card', automatic: true }],
    [394, { name: 'Red dot đăng nhập lần đầu', module: '', route: 'thiếu handler; chỉ là cờ onboarding', automatic: false }], [559, { name: 'Thần Thú có thể cường hóa hoặc đổi trang bị', module: 'src/01-red-dot-module.js', route: 'chỉ cường hóa nhanh qua native anmlSptStrth([animalId]) khi có sẵn Tinh Thạch Thú Linh đủ cho một lượt; không tự đổi hoặc trang bị vật phẩm', automatic: true }], [606, { name: 'Thẻ Tuần Phúc Lợi – Nhận thưởng đã tích lũy', module: 'src/01-red-dot-module.js', route: 'red dot 606; native GetWeekCardReward() only when active week card and claimable count > 0; wait for card-state ACK; never open or purchase', automatic: true }], [1003, { name: 'Red dot đăng nhập lần đầu', module: '', route: 'thông báo onboarding', automatic: false }], [1459, { name: 'Thông báo TikTok', module: '', route: 'không phải tác vụ game tự động', automatic: false }],
    [646, { name: 'Phụ Hồn Phi Phong', module: 'src/01-red-dot-module.js', route: 'native refLv theo từng loại; kiểm tra vật phẩm và cấp; chờ server ACK', automatic: true }], [27, { name: 'Phụ Hồn Thần Binh', module: 'src/01-red-dot-module.js', route: 'native refLv theo từng loại; kiểm tra vật phẩm và cấp; chờ server ACK', automatic: true }],
    [22, { name: 'Tăng cấp/Kỹ năng Thần Binh', module: '', route: 'tắt theo chính sách người dùng', automatic: false }], [641, { name: 'Tăng cấp/Kỹ năng Thần Binh', module: '', route: 'tắt theo chính sách người dùng', automatic: false }],
    [642, { name: 'Ảo Hóa Thần Binh – Trân', module: 'src/01-red-dot-module.js', route: 'native mgcLv([showId]); only eligible Trân-tier item and owned materials; await model ACK', automatic: true }], [643, { name: 'Ảo Hóa Thần Binh – Cực', module: 'src/01-red-dot-module.js', route: 'native mgcLv([showId]); only eligible Cực-tier item and owned materials; await model ACK', automatic: true }], [644, { name: 'Ảo Hóa Thần Binh – Huyền', module: 'src/01-red-dot-module.js', route: 'native mgcLv([showId]); only eligible Huyền-tier item and owned materials; await model ACK', automatic: true }], [645, { name: 'Ảo Hóa Thần Binh – Điển', module: 'src/01-red-dot-module.js', route: 'native mgcLv([showId]); only eligible Điển-tier item and owned materials; await model ACK', automatic: true }], [955, { name: 'Ảo Hóa Thần Binh – Tàng', module: 'src/01-red-dot-module.js', route: 'native mgcLv([showId]); only eligible Tàng-tier item and owned materials; await model ACK', automatic: true }],
    [23, { name: 'Ảo Hóa Thần Binh – Trân (ID cũ)', module: 'src/01-red-dot-module.js', route: 'native mgcLv([showId]); legacy red ID for Trân; wait for model ACK', automatic: true }], [24, { name: 'Ảo Hóa Thần Binh – Cực (ID cũ)', module: 'src/01-red-dot-module.js', route: 'native mgcLv([showId]); legacy red ID for Cực; wait for model ACK', automatic: true }], [25, { name: 'Ảo Hóa Thần Binh – Huyền (ID cũ)', module: 'src/01-red-dot-module.js', route: 'native mgcLv([showId]); legacy red ID for Huyền; wait for model ACK', automatic: true }], [26, { name: 'Ảo Hóa Thần Binh – Điển (ID cũ)', module: 'src/01-red-dot-module.js', route: 'native mgcLv([showId]); legacy red ID for Điển; wait for model ACK', automatic: true }], [872, { name: 'Ảo Hóa Thần Binh – Tàng (ID cũ)', module: 'src/01-red-dot-module.js', route: 'native mgcLv([showId]); legacy red ID for Tàng; wait for model ACK', automatic: true }],
    [33, { name: 'Phụ Hồn Linh Dực', module: 'src/01-red-dot-module.js', route: 'native refineLev theo từng loại; kiểm tra vật phẩm và cấp; chờ server ACK', automatic: true }], [29, { name: 'Ảo Hóa Linh Dực loại 3', module: 'src/01-red-dot-module.js', route: 'native quality-tier illusion handler; owned materials and SVIP limit required; wait for server ACK; no purchases', automatic: true }], [30, { name: 'Ảo Hóa Linh Dực loại 4', module: 'src/01-red-dot-module.js', route: 'native quality-tier illusion handler; owned materials and SVIP limit required; wait for server ACK; no purchases', automatic: true }], [31, { name: 'Ảo Hóa Linh Dực loại 5', module: 'src/01-red-dot-module.js', route: 'native quality-tier illusion handler; owned materials and SVIP limit required; wait for server ACK; no purchases', automatic: true }], [32, { name: 'Ảo Hóa Linh Dực loại 6', module: 'src/01-red-dot-module.js', route: 'native quality-tier illusion handler; owned materials and SVIP limit required; wait for server ACK; no purchases', automatic: true }], [871, { name: 'Ảo Hóa Linh Dực loại 7', module: 'src/01-red-dot-module.js', route: 'native quality-tier illusion handler; owned materials and SVIP limit required; wait for server ACK; no purchases', automatic: true }], [28, { name: 'Tăng cấp/Kỹ năng Linh Dực', module: '', route: 'tắt theo chính sách người dùng', automatic: false }],
    [148, { name: 'Phụ Hồn Thời Trang', module: 'src/01-red-dot-module.js', route: 'native addFashRefine theo từng loại; kiểm tra vật phẩm và cấp; chờ server ACK', automatic: true }], [145, { name: 'Ảo Hóa Thời Trang loại 3', module: 'src/01-red-dot-module.js', route: 'native quality-tier illusion handler; owned materials and SVIP limit required; wait for server ACK; no purchases', automatic: true }], [144, { name: 'Ảo Hóa Thời Trang loại 4', module: 'src/01-red-dot-module.js', route: 'native quality-tier illusion handler; owned materials and SVIP limit required; wait for server ACK; no purchases', automatic: true }], [146, { name: 'Ảo Hóa Thời Trang loại 5', module: 'src/01-red-dot-module.js', route: 'native quality-tier illusion handler; owned materials and SVIP limit required; wait for server ACK; no purchases', automatic: true }], [147, { name: 'Ảo Hóa Thời Trang loại 6', module: 'src/01-red-dot-module.js', route: 'native quality-tier illusion handler; owned materials and SVIP limit required; wait for server ACK; no purchases', automatic: true }], [873, { name: 'Ảo Hóa Thời Trang loại 7', module: 'src/01-red-dot-module.js', route: 'native quality-tier illusion handler; owned materials and SVIP limit required; wait for server ACK; no purchases', automatic: true }],
    [155, { name: 'Phụ Hồn Linh Tí', module: 'src/01-red-dot-module.js', route: 'native addHandRefine theo từng loại; kiểm tra vật phẩm và cấp; chờ server ACK', automatic: true }], [152, { name: 'Ảo Hóa Linh Tí loại 3', module: 'src/01-red-dot-module.js', route: 'native quality-tier illusion handler; owned materials and SVIP limit required; wait for server ACK; no purchases', automatic: true }], [151, { name: 'Ảo Hóa Linh Tí loại 4', module: 'src/01-red-dot-module.js', route: 'native quality-tier illusion handler; owned materials and SVIP limit required; wait for server ACK; no purchases', automatic: true }], [153, { name: 'Ảo Hóa Linh Tí loại 5', module: 'src/01-red-dot-module.js', route: 'native quality-tier illusion handler; owned materials and SVIP limit required; wait for server ACK; no purchases', automatic: true }], [154, { name: 'Ảo Hóa Linh Tí loại 6', module: 'src/01-red-dot-module.js', route: 'native quality-tier illusion handler; owned materials and SVIP limit required; wait for server ACK; no purchases', automatic: true }], [874, { name: 'Ảo Hóa Linh Tí loại 7', module: 'src/01-red-dot-module.js', route: 'native quality-tier illusion handler; owned materials and SVIP limit required; wait for server ACK; no purchases', automatic: true }], [150, { name: 'Tăng cấp Linh Tí', module: '', route: 'tắt theo chính sách người dùng', automatic: false }],
    [688, { name: 'Ảo Hóa Phi Phong – Trân', module: 'src/01-red-dot-module.js', route: 'native mgcLv([showId]); tier gate, owned material and SVIP limit; wait for ACK', automatic: true }], [689, { name: 'Ảo Hóa Phi Phong – Cực', module: 'src/01-red-dot-module.js', route: 'native mgcLv([showId]); tier gate, owned material and SVIP limit; wait for ACK', automatic: true }], [690, { name: 'Ảo Hóa Phi Phong – Huyền', module: 'src/01-red-dot-module.js', route: 'native mgcLv([showId]); tier gate, owned material and SVIP limit; wait for ACK', automatic: true }], [691, { name: 'Ảo Hóa Phi Phong – Điển', module: 'src/01-red-dot-module.js', route: 'native mgcLv([showId]); tier gate, owned material and SVIP limit; wait for ACK', automatic: true }], [8, { name: 'Ảo Hóa Thú Cưỡi tăng bậc', module: 'src/01-red-dot-module.js', route: 'native riseRideMgcShow(id), giữ điều kiện vật phẩm và SVIP; chờ server ACK', automatic: true }], [10, { name: 'Ảo Hóa Linh Thú (ID cũ)', module: '', route: 'ID cũ sai mapping; giữ tắt, dùng red dot 4', automatic: false }],
    [9, { name: 'Kỹ năng tiến cấp Thú Cưỡi', module: '', route: 'giữ nguyên, chưa được yêu cầu tự động', automatic: false }], [11, { name: 'Kỹ năng tiến cấp Thú Cưỡi', module: '', route: 'giữ nguyên, chưa được yêu cầu tự động', automatic: false }],
    [12, { name: 'Tiến cấp Thú Cưỡi – Chúc Phúc', module: 'src/01-red-dot-module.js', route: 'ưu tiên red dot 12; chỉ gọi rankRide cờ [0] khi đủ vật liệu đang có cho một lượt; chờ ACK', automatic: true }],
    [13, { name: 'Tu Luyện Thú Cưỡi', module: 'src/01-red-dot-module.js', route: 'native riseRideRefine([type,0]); kiểm tra nguyên liệu/cấp và chờ ACK', automatic: true }],
    [105, { name: 'Pháp Trận Thú Cưỡi – Trận', module: 'src/01-red-dot-module.js', route: 'native magicLev(id) trên pháp trận đã kích hoạt; chờ ACK', automatic: true }],
    [106, { name: 'Pháp Trận Thú Cưỡi – Cục', module: 'src/01-red-dot-module.js', route: 'native magicLev(id) trên pháp trận đã kích hoạt; chờ ACK', automatic: true }],
    [107, { name: 'Pháp Trận Thú Cưỡi – Tuyệt', module: 'src/01-red-dot-module.js', route: 'native magicLev(id) trên pháp trận đã kích hoạt; chờ ACK', automatic: true }],
    [44, { name: "Boss Mãn Hoang – Khiêu chiến tầng cao nhất", module: "src/03-daily-core.js", route: "khi red dot 44 hoạt động, dùng getMaxCCEnter() để chọn tầng cao nhất đã mở, vào bằng rqEtScene(map, layer), lần lượt chọn boss còn sống và thoát sau khi hạ hết; không dùng thể lực đơn, mua lượt hoặc tiêu KNB", automatic: true }],
    [53, { name: 'Phó Bản Nhóm – EXP (main mời clone)', module: 'src/01-red-dot-module.js', route: 'chỉ main có red dot 53 mở phòng EXP map 2091; mời đúng clone và chờ clone vào; sau đó bắt đầu ghép ngay cả khi đội mới có 2 acc để người chơi khác ghép vào, tự bắt đầu khi đủ 4; không mua lượt/KNB', automatic: true }],
    [58, { name: 'Vòng quay Rune', module: '', route: 'thưởng ngày khi đã có tầng hoàn thành, hoặc còn thưởng lớn; không tự quay', automatic: false }],
    [73, { name: 'Càn quét phó bản', module: '', route: 'tính năng 107 mở, clearTime = 0, cấp-1 >= 80; không tự quét', automatic: false }],
    [84, { name: 'Nhiệm vụ Tiên Phủ – nhận nhiệm vụ hoàn thành và mốc năng động', module: 'src/01-red-dot-module.js', route: 'native getXianFuTaskAward([id]) for completed tasks; getXianFuActivaAward([index]) for earned milestones; one at a time and wait for server state', automatic: true }],
    [635, { name:'Ngoại Hình Tiên Phủ – Tăng cấp',module:'src/01-red-dot-module.js',route:'native FeedXianFuShow; only owned feed material; wait for feed-level ACK',automatic:true }],
    [636, { name:'Ngoại Hình Tiên Phủ – Kích hoạt/nâng cấp kỹ năng',module:'src/01-red-dot-module.js',route:'native AddXianFuShowSkillLevel(skillId); meet feed-level gate; wait for skill-level ACK',automatic:true }],
    [637, { name:'Ngoại Hình Tiên Phủ – Kích hoạt/nâng bậc Ảo Hóa',module:'src/01-red-dot-module.js',route:'native AddXianFuMagicShow(id); owned material and SVIP gate; wait for show-level ACK',automatic:true }],
    [638, { name:'Ngoại Hình Tiên Phủ – Tu Luyện Phụ Hồn',module:'src/01-red-dot-module.js',route:'native AddXianFuShowRefine(type,flag); only owned material; wait for refine-level ACK',automatic:true }],
    [817, { name:'Ngoại Hình Tiên Phủ – Kích hoạt/nâng cấp kỹ năng Ảo Hóa',module:'src/01-red-dot-module.js',route:'native ActiveXianFuSkill(showId); require owned illusion and native skill readiness; wait for skill ACK',automatic:true }],
    [76, { name:'Tiên Phủ – Nhận Tụ Linh Trận', module:'src/01-red-dot-module.js', route:'red dot 76; native getBuildProduceAward([0]); chờ trạng thái công trình xác nhận', automatic:true }],
    [77, { name:'Tiên Phủ – Nhận Tụ Bảo Bồn', module:'src/01-red-dot-module.js', route:'red dot 77; native getBuildProduceAward([1]); chờ trạng thái công trình xác nhận', automatic:true }],
    [78, { name:'Tiên Phủ – Nhận và luyện chế', module:'src/01-red-dot-module.js', route:'red dot 78; nhận lò hoàn thành, luyện từng loại theo thứ tự với số lượng khả dụng tối đa; không mua hoặc hoàn tất nhanh', automatic:true }],
    [85, { name:'Đồ Giám Dị Thú – Lam', module:'src/01-red-dot-module.js', route:'native PromoteIllustratedHandbook([id]) khi còn cấp kế và đủ nguyên liệu; chờ hbList/hbSP cập nhật', automatic:true }],
    [86, { name:'Đồ Giám Dị Thú – Tím', module:'src/01-red-dot-module.js', route:'native PromoteIllustratedHandbook([id]) khi còn cấp kế và đủ nguyên liệu; chờ hbList/hbSP cập nhật', automatic:true }],
    [87, { name:'Đồ Giám Dị Thú – Cam', module:'src/01-red-dot-module.js', route:'native PromoteIllustratedHandbook([id]) khi còn cấp kế và đủ nguyên liệu; chờ hbList/hbSP cập nhật', automatic:true }],
    [88, { name:'Đồ Giám Dị Thú – Đỏ', module:'src/01-red-dot-module.js', route:'native PromoteIllustratedHandbook([id]) khi còn cấp kế và đủ nguyên liệu; chờ hbList/hbSP cập nhật', automatic:true }],
    [260, { name: 'Tầm Bảo Trang Bị', module: 'src/01-red-dot-module.js', route: 'loại 0, chỉ lượt đầu miễn phí hằng ngày bằng c_sendXunBao; chờ server ACK', automatic: true }],
    [261, { name: 'Tầm Bảo Pháp Bảo', module: 'src/01-red-dot-module.js', route: 'loại 4, chỉ lượt đầu miễn phí hằng ngày bằng c_sendXunBao; chờ server ACK', automatic: true }],
    [262, { name: 'Tầm Bảo Phù Văn', module: 'src/01-red-dot-module.js', route: 'loại 3, chỉ lượt đầu miễn phí hằng ngày bằng c_sendXunBao; chờ server ACK', automatic: true }],
    [263, { name: 'Tầm Bảo Đỉnh Cao', module: 'src/01-red-dot-module.js', route: 'loại 1, chỉ lượt đầu miễn phí hằng ngày bằng c_sendXunBao; chờ server ACK', automatic: true }],
    [264, { name: 'Tầm Bảo Tinh Thạch', module: 'src/01-red-dot-module.js', route: 'loại 2, chỉ lượt đầu miễn phí hằng ngày bằng c_sendXunBao; chờ server ACK', automatic: true }],
    [265, { name: 'Tầm Bảo Tiên Duyên', module: 'src/01-red-dot-module.js', route: 'loại 9, chỉ lượt đầu miễn phí hằng ngày bằng c_sendXunBao; chờ server ACK', automatic: true }],
    [266, { name: 'Tầm Bảo Thánh Tôn', module: 'src/01-red-dot-module.js', route: 'loại 10, chỉ lượt đầu miễn phí hằng ngày bằng c_sendXunBao; chờ server ACK', automatic: true }],
    [267, { name: 'Tầm Bảo Quái Bàn', module: 'src/01-red-dot-module.js', route: 'loại 11, chỉ lượt đầu miễn phí hằng ngày bằng c_sendXunBao; chờ server ACK', automatic: true }],
    [680, { name: 'Tầm Bảo Thánh Trang', module: 'src/01-red-dot-module.js', route: 'loại 15, chỉ lượt đầu miễn phí hằng ngày bằng c_sendXunBao; chờ server ACK', automatic: true }],
    [306, { name: 'Vòng Quay Nạp – Nhận mốc thưởng miễn phí', module: 'src/01-red-dot-module.js', route: 'native getPayRewardReward() only when rewardList contains a state-1 milestone; never call paid payRewardRun()', automatic: true }],
    [308, { name: 'Quà còn lượt mua', module: '', route: 'sự kiện chưa kết thúc và còn suất mua; không tự mua', automatic: false }],
    [309, { name: 'Tranh mua còn lượt', module: '', route: 'SoaringPanicBuying, chưa kết thúc và chưa mua hết; không tự mua', automatic: false }],
    [347, { name: 'Đoạt Bảo Phi Thăng', module: '', route: 'cờ soarduobao nút 250, mặc định bật đến khi mở nút; không tự vào', automatic: false }],
    [387, { name: 'Phúc Oa – Bồi dưỡng cấp Tiên Linh', module: 'src/01-red-dot-module.js', route: 'native onFuwaBaseInfoUpReq([fuwaId]) only when game checker confirms next level and owned materials; await server ACK', automatic: true }],
    [388, { name: 'Phúc Oa – Bổ Sung', module: 'src/01-red-dot-module.js', route: 'native onFuwaFeedReq([ownedItemId]) while native feed checker allows; use inventory only and wait for feedTimes ACK', automatic: true }],
    [389, { name: 'Phúc Oa – Tiên Kỹ / Quà Đăng Nhập', module: 'src/01-red-dot-module.js', route: 'route by native state: upgrade eligible Phúc Oa Immortal Skill, or claim active login-event reward; no purchases', automatic: true }],
    [397, { name: 'Bảng xếp hạng còn lượt thích', module: '', route: 'likeRemainTms > 0; không tự thích', automatic: false }],
    [403, { name: 'Tổng dấu đỏ Chiến Đội', module: '', route: 'gộp đơn, thưởng hoặc điều kiện tiêu hao của đội; không tự bấm', automatic: false }],
    [406, { name: 'Chiến Đội đủ vật phẩm hoặc KNB', module: '', route: 'còn lượt cấu hình và đủ vật phẩm hoặc KNB; không tự tiêu hao', automatic: false }],
    [627, { name: 'Thủ Hộ Thủy Tinh còn lượt', module: '', route: 'tính năng 629 mở và remainTimes > 0; không tự vào hoặc mua lượt', automatic: false }],
    [682, { name: 'Boss Ma Thần – tầng cao nhất và lập đội clone', module: 'src/01-red-dot-module.js', route: 'khi có thể lực miễn phí và clone đã kết nối, chọn tầng cao nhất mở được, vào bằng rqEtScene(2711,level,[],line); src/47-boss-team.js lập đội riêng và mời clone, clone chỉ nhận lời mời Ma Thần từ main; không dùng KNB/vật phẩm hồi thể lực', automatic: true }],
    [825, { name: 'Boss Liên Server – Chúa Tể Thiên Mộ (tối đa 2 lượt/ngày)', module: 'src/01-red-dot-module.js', route: 'chỉ vào boss được checkOneRDByBossid xác nhận đang có red dot; chỉ dùng leftnum còn lại, tối đa 2 lượt/ngày; native enterBsHome, không mua lượt hoặc tiêu KNB', automatic: true }],
    [980, { name: 'Icon tư vấn có quà chưa bấm', module: '', route: 'chưa bấm icon; không tự bấm', automatic: false }],
    [1005, { name: 'Boss Chiến Đội còn lượt đánh', module: '', route: 'leftFightTm > 0 và chưa qua tầng cuối; không tự vào', automatic: false }],
    [1049, { name: 'Xem quảng cáo hoặc còn lượt quay', module: '', route: 'tính năng 1139 mở và còn lượt xem hoặc lượt quay; không tự xem', automatic: false }],
    [1050, { name: 'Còn lượt xem quảng cáo', module: '', route: 'tính năng 1139 mở, còn lượt xem và đã hết thời gian chờ; không tự xem', automatic: false }],
    [1051, { name: 'Hộp chuyển tiếp TP', module: '', route: 'bật khi nhận tin server tpbox; không tự nhảy', automatic: false }],
    [1052, { name: 'Phó bản còn lượt hoặc còn thưởng', module: '', route: 'canReceiveRwd hoặc leftNum > 0; không tự nhận hoặc vào', automatic: false }],
    [1423, { name: 'Quà Đăng Nhập – Thưởng ngày', module: 'src/01-red-dot-module.js', route: 'native getFestivalLoginReward(id) for state-1 rewards; wait for login-award state ACK; no purchases', automatic: true }],
    [1495, { name: 'Cộng đồng WeChat chưa tắt dấu trong ngày', module: '', route: 'weiXinCommunity, cờ lưu theo ngày còn bật; không tự bấm', automatic: false }],
    [3, { name: 'Linh Thú – Chúc Phúc tiến cấp', module: 'src/01-red-dot-module.js', route: 'ưu tiên red dot 3; chỉ gọi rankPet cờ [0] khi đủ vật liệu đang có cho một lượt; chờ ACK', automatic: true }],
    [4, { name: 'Linh Thú – Ảo Hóa tăng bậc', module: 'src/01-red-dot-module.js', route: 'native riseMgcShow([id]) trên mục đã mở; kiểm tra vật liệu/SVIP và chờ ACK', automatic: true }],
    [5, { name: 'Linh Thú – Tu Luyện', module: 'src/01-red-dot-module.js', route: 'native riseRefet([type,0]); kiểm tra vật liệu/cấp và chờ ACK', automatic: true }],
    [102, { name: 'Linh Thú – Pháp Trận Trận', module: 'src/01-red-dot-module.js', route: 'native mgcLv(id) trên pháp trận đã kích hoạt; kiểm tra vật liệu/SVIP và chờ ACK', automatic: true }],
    [103, { name: 'Linh Thú – Pháp Trận Cục', module: 'src/01-red-dot-module.js', route: 'native mgcLv(id) trên pháp trận đã kích hoạt; kiểm tra vật liệu/SVIP và chờ ACK', automatic: true }],
    [104, { name: 'Linh Thú – Pháp Trận Tuyệt', module: 'src/01-red-dot-module.js', route: 'native mgcLv(id) trên pháp trận đã kích hoạt; kiểm tra vật liệu/SVIP và chờ ACK', automatic: true }],
    [1, { name: 'Bồi dưỡng Linh Thú', module: '', route: 'tắt theo chính sách người dùng', automatic: false }],
    [63, { name: 'Phù Văn có thể rã', module: 'src/01-red-dot-module.js', route: 'theo bộ phẩm chất game đã chọn và loại phân giải mặc định; giữ đồ cần xác nhận; chờ ACK', automatic: true }],
    [193, { name: 'Tứ Tượng có nhánh có thể tăng', module: '', route: 'Thanh Long, Bạch Hổ, Chu Tước hoặc Huyền Vũ đủ tăng sao, thiền định hoặc bồi dưỡng; tăng cấp luôn tắt', automatic: false }],
    [195, { name: 'Thánh Trang – Dung Luyện', module: 'src/01-red-dot-module.js', route: 'native getSmeltRank + oneKeySmelt; omit gold protected items and wait for server inventory ACK', automatic: true }],
    [199, { name: 'Tứ Tượng Thanh Long có thể tăng sao', module: '', route: 'tính năng 303 mở, còn sao kế và đủ điều kiện; tăng cấp luôn tắt', automatic: false }],
    [200, { name: 'Tứ Tượng Bạch Hổ có thể tăng sao', module: '', route: 'tính năng 304 mở, còn sao kế và đủ điều kiện; tăng cấp luôn tắt', automatic: false }],
    [201, { name: 'Tứ Tượng Chu Tước có thể tăng sao', module: '', route: 'tính năng 305 mở, còn sao kế và đủ điều kiện; tăng cấp luôn tắt', automatic: false }],
    [202, { name: 'Tứ Tượng Huyền Vũ có thể tăng sao', module: '', route: 'tính năng 306 mở, còn sao kế và đủ điều kiện; tăng cấp luôn tắt', automatic: false }],
    [203, { name: 'Tứ Tượng Thanh Long có thể thiền định', module: '', route: 'tính năng 303 mở, còn cấp thiền, đủ vật phẩm và chưa đầy lượt; tăng cấp luôn tắt', automatic: false }],
    [204, { name: 'Tứ Tượng Bạch Hổ có thể thiền định', module: '', route: 'tính năng 304 mở, còn cấp thiền, đủ vật phẩm và chưa đầy lượt; tăng cấp luôn tắt', automatic: false }],
    [205, { name: 'Tứ Tượng Chu Tước có thể thiền định', module: '', route: 'tính năng 305 mở, còn cấp thiền, đủ vật phẩm và chưa đầy lượt; tăng cấp luôn tắt', automatic: false }],
    [206, { name: 'Tứ Tượng Huyền Vũ có thể thiền định', module: '', route: 'tính năng 306 mở, còn cấp thiền, đủ vật phẩm và chưa đầy lượt; tăng cấp luôn tắt', automatic: false }],
    [238, { name: 'Lôi Đình có vị trí tăng cấp', module: 'src/01-red-dot-module.js', route: 'đủ nguyên liệu và điều kiện mở vị trí; native ThunderEquipUpgrade(id, pos); chờ cấp server xác nhận', automatic: true }],
    [239, { name: 'Lôi Đình có thể tiến bậc', module: '', route: 'chưa tự động tiến bậc', automatic: false }],
    [255, { name: 'Phó bản bang hội còn lượt', module: '', route: 'có bang, cấp-1 >= 65, tính năng 158 mở, còn lượt và chưa xem dấu; không tự vào', automatic: false }],
    [276, { name: 'Túi Tầm Bảo còn vật phẩm', module: '', route: 'túi loại 4 còn đồ; không tự dùng', automatic: false }],
    [346, { name: 'Vui Vẻ Cuồng Nhiệt – Nhận nhiệm vụ và mốc điểm', module: 'src/01-red-dot-module.js', route: 'claim completed tasks first for points, then claim reached point milestones; native claim RPCs only, no spending', automatic: true }],
    [370, { name: 'Cửu Tiêu Lệnh – Thưởng cấp miễn phí', module: 'src/01-red-dot-module.js', route: 'nhận mốc miễn phí bằng Tbyh chỉ khi goldenState=0; bỏ qua nhánh vàng và không mua cấp', automatic: true }],
    [371, { name: 'Nhiệm vụ giai đoạn Cửu Tiêu Lệnh', module: 'src/01-red-dot-module.js', route: 'chỉ nhận nhiệm vụ trạng thái 1 bằng Ttmx([id]); không tự đi tới mục tiêu', automatic: true }],
    [372, { name: 'Nhiệm vụ mùa Cửu Tiêu Lệnh', module: 'src/01-red-dot-module.js', route: 'chỉ nhận nhiệm vụ trạng thái 1 bằng Tqjh([id]); không tự đi tới mục tiêu', automatic: true }],
    [373, { name: 'Gói EXP Cửu Tiêu Lệnh', module: '', route: 'yêu cầu trạng thái vàng; tắt theo yêu cầu không nạp/tiêu KNB', automatic: false }],
    [375, { name: 'Tiên Duyên – Nhiệm vụ cả đời', module: 'src/01-red-dot-module.js', route: 'chỉ nhận nhiệm vụ loại 2 đã hoàn thành và chờ task-list ACK', automatic: true }],
    [695, { name: 'Tiên nhân thường mạnh hơn đang mặc', module: '', route: 'túi hoặc kỹ năng không phải nhẫn có lực chiến cao hơn món yếu nhất; không tự thay', automatic: false }],
    [999, { name: 'Túi còn trang bị tiên nhân có dữ liệu phụ', module: '', route: 'túi loại 8 còn món có mảng dữ liệu phụ; không tự thao tác', automatic: false }],
  ]);
  const navigatorIds = new Set([249]);
  const extras = new Map();
  let redAt = -Infinity, redActive = new Set(), redAudit = [], cloakRpRefreshAt = -Infinity, thanhVanRedRefreshAt=-Infinity;
  let lastTickAt=0,pluginSyncAt=-Infinity,builtinSyncAt=-Infinity,builtinDispatch=null,builtinDispatchOwner=null,auditAt=-Infinity;
  let svipPending = null;
  function syncPluginMappings() {
    const now=Date.now();if(now-pluginSyncAt<500)return;pluginSyncAt=now;
    const plugins = W.KVPV_V8?.report?.()?.plugins;
    if (!Array.isArray(plugins)) return;
    for (const plugin of plugins) {
      if (!Array.isArray(plugin?.redIds)) continue;
      const module = plugin.id === 'monster_plate_strength' ? 'src/45-monster-plate.js' :
        String(plugin.id || '').startsWith('appearance_auto_') ? 'src/28-appearance-auto.js' :
        plugin.id === 'fabao_treasure_keys' ? 'src/34-fabao-treasure.js' : 'src/04-engine.js';
      for (const rawId of plugin.redIds) {
        const id = Number(rawId);
        if (!Number.isSafeInteger(id) || id < 0) continue;
        const current = redCatalog.get(id);
        const handler = plugin.verified === true;
        const needsHandlerRoute = /chưa có handler/i.test(current?.route || '');
        const policyOff = /tắt theo chính sách người dùng|luôn tắt/i.test(current?.route || '');
        redCatalog.set(id, {
          name: current?.name || plugin.name || 'Tác vụ đã đăng ký',
          module: current?.module || module,
          route: needsHandlerRoute ? `V8: ${plugin.name || plugin.id}` : current?.route || `V8: ${plugin.name || plugin.id}`,
          automatic: policyOff ? false : current && !needsHandlerRoute ? current.automatic === true : handler
        });
      }
    }
  }
  const svipModel = () => W._Ba?._ke?._Le?.instance;
  const svipRpc = () => W._Ba?._ke?._bYt?.instance;
  function inspectRed() {
    if (Date.now() - redAt < 20) return;
    redAt = Date.now();
    const rp = W._Ba?._Xo?._Ko?.instance, u = rp?._Uu;
    redScanReady = !!u && typeof rp?.getRpKeyState === 'function';
    const keys = u && typeof u.keys === 'function' ? [...u.keys()] : Object.keys(u ?? {});
    redActive = new Set(keys.slice(0, 4096).map(Number).filter(id => Number.isSafeInteger(id) && id >= 0 && rp?.getRpKeyState?.(id) === true));
  }
  function refreshCloakRedDots() {
    const now=Date.now();
    if(now-cloakRpRefreshAt<1000||!owned()||now<Number(W.__KVPV_USER_UI_UNTIL||0))return;
    const model=W._Ba?._JJ?._QJ?.inst;
    if(typeof model?.huanhuaRp!=='function')return;
    cloakRpRefreshAt=now;
    try{model.huanhuaRp();redAt=-Infinity;}catch(e){S.lastError=String(e?.stack??e);}
  }
  function refreshThanhVanRedDots() {
    const now=Date.now();
    if(now-thanhVanRedRefreshAt<1000||!owned()||now<Number(W.__KVPV_USER_UI_UNTIL||0))return;
    const model=W._Ba?._MT?.immortalsEquipStar?._q$?.ins;
    if(typeof model?.mediaCanUpByType!=='function')return;
    thanhVanRedRefreshAt=now;
    try{for(let type=1;type<=4;type++)model.mediaCanUpByType(type);redAt=-Infinity;}catch(e){S.lastError=String(e?.stack??e);}
  }
  function thanhVanMeditationState(redId) {
    const type=Number(redId)-202,model=W._Ba?._MT?.immortalsEquipStar?._q$?.ins;
    const cfg=W._ft?._i$?.ins,bag=W._Ba?._Ic?._aQ?.ins;
    if(!Number.isInteger(type)||type<1||type>4||!model||!cfg||!bag||typeof cfg.getMeidaConfig!=='function'||
      typeof model.getMeditationCurLevel!=='function'||typeof model.getMeditationCurCount!=='function'||
      typeof model.getMeditationMaxLevel!=='function'||typeof model.getMeditationMaxCount!=='function')
      return {ready:false,reason:'waiting_thanh_van_meditation_data',type};
    const level=Number(model.getMeditationCurLevel(type)),count=Number(model.getMeditationCurCount(type));
    const maxLevel=Number(model.getMeditationMaxLevel(type)),maxCount=Number(model.getMeditationMaxCount(type));
    const current=cfg.getMeidaConfig(type,level),next=cfg.getMeidaConfig(type,level+1),cost=current?.[2];
    const item=Number(cost?.[0]),need=Number(cost?.[1]),ownedCount=Number(bag.getItemCountById?.(item)||0);
    const featureOpen=!!W._Ba?._Do?._Ho?.inst?.getFcIsOpen?.(302+type);
    const redActive=api.isActive(redId),hasMaterials=Number.isSafeInteger(item)&&item>0&&Number.isSafeInteger(need)&&need>0&&ownedCount>=need;
    const underLimits=level<maxLevel&&count<maxCount&&!!next;
    const signature=JSON.stringify([type,level,count,maxLevel,maxCount,item,ownedCount]);
    const ready=redActive&&featureOpen&&hasMaterials&&underLimits;
    return {ready,reason:!featureOpen?'feature_locked':!redActive?'red_dot_clear':!underLimits?'meditation_limit_or_max_level':!hasMaterials?'need_meditation_material':'ready',
      type,level,count,maxLevel,maxCount,item,need,owned:ownedCount,redActive,featureOpen,signature};
  }
  function runThanhVanMeditation(redId) {
    const T=S.thanhVanMeditation,now=Date.now(),rpc=W._Ba?._MT?.immortalsEquipStar?._PXt?.ins;
    T.blocking=false;
    if(!S.enabled||!owned()||W._Ba?._$a?.SceneUtil?.isCommonScene!==true||W._Ba?._$a?._yo?.ins?.isInMission===true||
      now<Number(W.__KVPV_USER_UI_UNTIL||0)||W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true||W.KVPV?.core?.scene?.status?.()?.owner){T.reason='waiting_safe_context';return;}
    if(T.pending){
      const p=T.pending,after=thanhVanMeditationState(p.redId);
      if(after.signature&&after.signature!==p.before){T.pending=null;T.blocked=null;T.reason='server_acknowledged_'+p.redId;T.confirmed++;S.confirmed++;return;}
      if(now-p.at>25000){T.blocked={...p};T.pending=null;T.reason='ack_timeout_no_retry';return;}
      T.blocking=true;T.reason='waiting_server_ack_'+p.redId;return;
    }
    if(T.blocked){const after=thanhVanMeditationState(T.blocked.redId);if(after.signature===T.blocked.before){T.reason='ack_timeout_no_retry';return;}T.blocked=null;}
    const state=thanhVanMeditationState(redId);
    if(!state.ready){T.reason=state.reason;return;}
    if(now-T.lastSend<800||typeof rpc?.ComprehendStarBoard!=='function'){T.reason='waiting_native_meditation_rpc';return;}
    T.pending={redId,type:state.type,before:state.signature,at:now};T.lastSend=now;T.blocking=true;T.reason='waiting_server_ack_'+redId;S.sent++;
    try{const result=rpc.ComprehendStarBoard(state.type);if(result===false)throw Error('native_ComprehendStarBoard_returned_false');}
    catch(e){T.blocked={...T.pending};T.pending=null;T.blocking=false;T.reason='send_error_no_retry';S.lastError=String(e);}
  }
  function handlersFor(id) {
    const list = [];
    if (id === 20) list.push({ id: 'tienTheCultivation', kind: 'work', state: S.tienThe.pending ? 'waiting_ack' : S.tienThe.reason });
    if (id === 167) list.push({ id: 'tienDanUse', kind: 'work', state: S.tienDan.pending ? 'waiting_ack' : S.tienDan.reason });
    if (id === 63) list.push({ id: 'runeResolve', kind: 'work', state: S.runeResolve.pending ? 'waiting_ack' : S.runeResolve.reason });
    if (id === 27) list.push({ id: 'weaponSoul', kind: 'work', state: S.weaponSoul.pending ? 'waiting_ack' : S.weaponSoul.reason });
    if (id === 646) list.push({ id: 'cloakSoul', kind: 'work', state: S.cloakSoul.pending ? 'waiting_ack' : S.cloakSoul.reason });
    if (id === 33) list.push({ id: 'wingSoul', kind: 'work', state: S.wingSoul.pending ? 'waiting_ack' : S.wingSoul.reason });
    if (id === 148) list.push({ id: 'fashionSoul', kind: 'work', state: S.fashionSoul.pending ? 'waiting_ack' : S.fashionSoul.reason });
    if (id === 155) list.push({ id: 'armSoul', kind: 'work', state: S.armSoul.pending ? 'waiting_ack' : S.armSoul.reason });
    if (id === 682) list.push({ id: 'maThanHighestFloor', kind: 'work', state: S.maThan.pending ? 'waiting_ack' : S.maThan.reason });
    if (id === 559) list.push({ id: 'thanThuStrength', kind: 'work', state: S.thanThuStrength.pending ? 'waiting_ack' : S.thanThuStrength.reason });
    if (id === 15) list.push({ id: 'gearStrength', kind: 'work', state: S.gearStrength.pending ? 'waiting_ack' : S.gearStrength.reason });
    if (id === 16) list.push({ id: 'soulStone', kind: 'work', state: S.soulStone.pending ? 'waiting_ack' : S.soulStone.reason });
    if (id === 156) list.push({ id: 'soulForge', kind: 'work', state: S.soulForge.pending ? 'waiting_ack' : S.soulForge.reason });
    if (id === 110) list.push({ id: 'frontlineBoss', kind: 'work', state: S.frontline.reason });
    if (id === 842 || id === 828) list.push({ id: 'tombGear', kind: 'work', state: S.tombGear.pending ? 'waiting_ack' : S.tombGear.reason });
    if (id === 325) list.push({ id: 'svipRewards325', kind: 'claim', state: svipPending ? svipPending.reason : 'ready' });
    if (id === 57) list.push({ id: 'dailyMonster', kind: 'claim', state: S.dailyMonster.pending ? 'waiting_ack' : S.dailyMonster.reason });
    if (id === 141) list.push({ id: 'adventure', kind: 'work', state: S.adventure.reason });
    if (navigatorIds.has(id) && W.KVPV_RED_NAVIGATOR) list.push({ id: 'KVPV_RED_NAVIGATOR', kind: 'work', state: 'delegated' });
    const plugins = W.KVPV_V8?.report?.()?.plugins;
    if (Array.isArray(plugins)) for (const plugin of plugins) {
      if (id===27&&/^appearance_auto_weapon_soul_[0-3]$/.test(String(plugin?.id||''))) continue;
      if (id===646&&/^appearance_auto_cloak_soul_[0-3]$/.test(String(plugin?.id||''))) continue;
      if (id===33&&/^appearance_auto_wing_soul_[0-3]$/.test(String(plugin?.id||''))) continue;
      if (id===148&&/^appearance_auto_fashion_soul_[0-3]$/.test(String(plugin?.id||''))) continue;
      if (id===155&&/^appearance_auto_arm_soul_[0-3]$/.test(String(plugin?.id||''))) continue;
      if (id===8&&plugin?.id==='appearance_auto_mount_illusion') continue;
      if (Array.isArray(plugin?.redIds) && plugin.redIds.includes(id)) list.push({ id: plugin.id, kind: plugin.kind, state: 'delegated' });
    }
    if (extras.has(id)) list.push({ id: 'register:' + id, kind: 'work', state: 'ready' });
    return list;
  }
  function catalogView(id, meta, active) {
    const hierarchy=W.KVPV_RED_NAVIGATOR?.hierarchyFor?.(id)??null;
    const handlers=handlersFor(id);
    return {
      id,...meta,automatic:meta.automatic===true&&handlers.length>0,active:active===true,actionModule:meta.module||'',
      navigationModule:hierarchy?'src/44-red-navigator.js':'',hierarchy,
      state:handlers.length?'checked':meta.module==='src/44-red-navigator.js'?'mapped_route':meta.module?'mapped_no_handler':hierarchy?'mapped_route':'needs_verified_mapping',
      handlers:handlers.map(handler=>({...handler}))
    };
  }
  function blockingRedIds() {
    if (!S.enabled) return [];
    inspectRed();
    syncPluginMappings();
    if (!redScanReady) return Date.now() - S.startedAt < 15000 ? ['red_scan_startup'] : [];
    const active=[...redActive].filter(id => {
      if (redCatalog.get(id)?.automatic !== true) return false;
      if (id === 325) return !!svipPending || svipProbe().ready === true;
      if (id === 57) return S.dailyMonster.blocking === true;
      if (id === 141) return S.adventure.blocking === true;
      if (id === 606) return S.weeklyWelfare.blocking === true;
      if ([370,371,372].includes(id)) return S.jiuXiaoLing.blocking === true&&S.jiuXiaoLing.pending?.redId===id;
      if (id === 321) return S.weekendConsume.blocking === true;
      if (id === 257) return S.dailyCheckin.blocking === true;
      if (id === 389) return (S.loginAwards.blocking === true && S.loginAwards.pending?.redId === id) ||
        (S.phucOa.blocking === true && S.phucOa.pending?.redId === id);
      if (id === 46 || id === 159) return S.coBao.blocking === true && S.coBao.pending?.redId === id;
      if (loginAwardIds.has(id)) return S.loginAwards.blocking === true&&S.loginAwards.pending?.redId===id;
      if ([375,376,378,379,380,382,383,384,385].includes(id)) return S.marriage.blocking === true && S.marriage.pending?.redId === id;
      if ([387,388].includes(id)) return S.phucOa.blocking === true && S.phucOa.pending?.redId === id;
      if (id === 259) return S.onlineReward.blocking === true;
      if (id === 306) return S.payTurntableReward.blocking === true;
      if (id === 346) return S.happyFrenzy.blocking === true;
      if (id === 84) return S.xianfu.blocking === true && S.xianfu.pending?.redId === 84;
      if ([76,77,78,85,86,87,88].includes(id)) return S.xianfu.blocking === true && S.xianfu.pending?.redId === id;
      if ([635,636,637,638,817].includes(id)) return S.xianfuAppearance.blocking === true && S.xianfuAppearance.pending?.redId === id;
      if (weaponIllusionTiers.has(id)) return S.weaponIllusion.blocking === true && S.weaponIllusion.pending?.redId === id;
      if (Object.values(appearanceIllusionDefs).some(d=>d.ids.includes(id))) return S.appearanceIllusion.blocking === true && S.appearanceIllusion.pending?.redId === id;
      if (id === 20) return S.tienThe.blocking === true;
      if (id === 21) return S.xianwei.blocking === true;
      if (id === 167) return S.tienDan.blocking === true;
      if (id === 657) return S.bloodline.blocking === true;
      if (id === 656) return S.soulEating.blocking === true;
      if (id === 682) return S.maThan.blocking === true;
      if (id === 19) return S.magicQuick.blocking === true;
      if (id === 14) return S.faBaoQuick.blocking === true;
      if (id === 63) return S.runeResolve.blocking === true;
      if (id === 27) return S.weaponSoul.blocking === true;
      if (id === 646) return S.cloakSoul.blocking === true;
      if (id === 33) return S.wingSoul.blocking === true;
      if (id === 148) return S.fashionSoul.blocking === true;
      if (id === 155) return S.armSoul.blocking === true;
      if (id === 559) return S.thanThuStrength.blocking === true;
      if (id === 15) return S.gearStrength.blocking === true;
      if (id === 16) return S.soulStone.blocking === true;
      if (id === 156) return S.soulForge.blocking === true;
      if (id === 119) return S.smelt.equip.blocking === true;
      if (id === 195) return S.smelt.holy.blocking === true;
      if (id === 850) return S.smelt.pet.blocking === true;
      if (id === 48 || id === 49) return S.compose.blocking === true;
      if (id === 110) return api.isActive(110) || S.frontline.pending !== null || S.frontline.reason === 'fighting_frontline';
      if (id === 842 || id === 828) return S.tombGear.blocking === true;
      if (id === 825) return S.tombBoss.blocking === true;
      if ([8,12,13,105,106,107].includes(id)) return S.mount.blocking === true&&S.mount.pending?.redId===id;
      if ([3,4,5,102,103,104].includes(id)) return S.linhThu.blocking === true&&S.linhThu.pending?.redId===id;
      if ([260,261,262,263,264,265,266,267,680].includes(id)) return S.treasureFree.blocking === true&&S.treasureFree.pending?.redId===id;
      return handlersFor(id).length > 0;
    });
    if(S.treasureFree.pending&&!active.includes(S.treasureFree.pending.redId))active.push(S.treasureFree.pending.redId);
    if(S.weeklyWelfare.pending&&!active.includes(606))active.push(606);
    if(S.jiuXiaoLing.pending&&!active.includes(S.jiuXiaoLing.pending.redId))active.push(S.jiuXiaoLing.pending.redId);
    if(S.weekendConsume.pending&&!active.includes(321))active.push(321);
    if(S.dailyCheckin.pending&&!active.includes(257))active.push(257);
    if(S.loginAwards.pending&&!active.includes(S.loginAwards.pending.redId))active.push(S.loginAwards.pending.redId);
    if(S.marriage.pending&&!active.includes(S.marriage.pending.redId))active.push(S.marriage.pending.redId);
    if(S.phucOa.pending&&!active.includes(S.phucOa.pending.redId))active.push(S.phucOa.pending.redId);
    if(S.coBao.pending&&!active.includes(S.coBao.pending.redId))active.push(S.coBao.pending.redId);
    if(S.onlineReward.pending&&!active.includes(259))active.push(259);
    if(S.dailyMonster.pending&&!active.includes(57))active.push(57);
    if(S.adventure.blocking&&!active.includes(141))active.push(141);
    if(S.payTurntableReward.pending&&!active.includes(306))active.push(306);
    if(S.happyFrenzy.pending&&!active.includes(346))active.push(346);
    if((S.tombBoss.pending||S.tombBoss.blocking)&&!active.includes(825))active.push(825);
    if(S.xianfu.pending&&!active.includes(S.xianfu.pending.redId))active.push(S.xianfu.pending.redId);
    if(S.maThan.pending&&!active.includes(682))active.push(682);
    if(S.xianfuAppearance.pending&&!active.includes(S.xianfuAppearance.pending.redId))active.push(S.xianfuAppearance.pending.redId);
    if(S.weaponIllusion.pending&&!active.includes(S.weaponIllusion.pending.redId))active.push(S.weaponIllusion.pending.redId);
    if(S.appearanceIllusion.pending&&!active.includes(S.appearanceIllusion.pending.redId))active.push(S.appearanceIllusion.pending.redId);
    if(S.tombGear.pending&&!active.includes(S.tombGear.pending.redId))active.push(S.tombGear.pending.redId);
    if(S.frontline.pending&&!active.includes(110))active.push(110);
    if([21,68].includes(frontlineScene())&&!active.includes(110))active.push(110);
    if(S.mount.pending&&!active.includes(S.mount.pending.redId))active.push(S.mount.pending.redId);
    if(S.gearStrength.pending&&!active.includes(15))active.push(15);
    if(S.soulStone.pending&&!active.includes(16))active.push(16);
    if(S.soulForge.pending&&!active.includes(156))active.push(156);
    if(S.smelt.equip.pending&&!active.includes(119))active.push(119);
    if(S.smelt.holy.pending&&!active.includes(195))active.push(195);
    if(S.smelt.pet.pending&&!active.includes(850))active.push(850);
    if(S.compose.pending&&!active.includes(S.compose.pending.kind===1?48:49))active.push(S.compose.pending.kind===1?48:49);
    if(S.mount.bulkBless&&!active.includes(12))active.push(12);
    if(S.linhThu.pending&&!active.includes(S.linhThu.pending.redId))active.push(S.linhThu.pending.redId);
    if(S.linhThu.bulkBless&&!active.includes(3))active.push(3);
    return active.sort((a,b)=>{
      const ah=W.KVPV_RED_NAVIGATOR?.hierarchyFor?.(a)?.order, bh=W.KVPV_RED_NAVIGATOR?.hierarchyFor?.(b)?.order;
      return (Number.isFinite(ah)?ah:Number.MAX_SAFE_INTEGER)-(Number.isFinite(bh)?bh:Number.MAX_SAFE_INTEGER)||a-b;
    });
  }
  function svipProbe() {
    const m = svipModel(), rpc = svipRpc();
    if (!api.isActive(325) || !m?.isGotSvipData || Number(m.curSvipLv) < 1 ||
        typeof rpc?.getSvipAward !== 'function' || typeof rpc?.getSvipDayAward !== 'function') return { ready: false };
    let level = 0;
    for (let lv = 1; lv <= Number(m.curSvipLv); lv++) if (m.getReceState?.(lv) === 1) { level = lv; break; }
    const daily = !level && m.isGetDayAward === false;
    if (!level && !daily) return { ready: false };
    return { ready: true, signature: JSON.stringify([Number(m.curSvipLv), m._WY, m.isGetDayAward, level, daily]), level, daily };
  }
  function owned() {
    const actor = String(W.__KVPV_OWN_ACTOR_ID || '');
    return actor && actor === String(W._Ba?._rJ?._O$?.ins?.actorId ?? '') && !W.__KVPV_UNIVERSAL_HALTED;
  }
  function svipContext() {
    return W._Ba?._$a?.SceneUtil?.isCommonScene === true &&
      W._Ba?._$a?._yo?.ins?.isInMission !== true &&
      !W.KVPV?.core?.scene?.status?.()?.owner;
  }
  const xianfuModel=()=>W._Ba?._Q9?._ttt?.ins;
  const xianfuRpc=()=>W._Ba?._Q9?._$dt?.ins;
  const xianfuBuild=id=>xianfuModel()?.getBuildData?.(id);
  function xianfuWatch(){
    const notify=W._Sa?.notify,T=S.xianfu;
    if(T.watcher||typeof notify?.on!=='function')return;
    try{T.ackOk=()=>{T.ack++;};T.ackErr=()=>{T.ack++;};notify.on(5410,T,T.ackOk);notify.on(5411,T,T.ackErr);T.watcher=true;}catch{}
  }
  function xianfuSig(ids){
    const m=xianfuModel();
    return JSON.stringify([ids.map(id=>[id,xianfuBuild(id)]),Number(m?.typeInfos?.(0)),m?.fsList]);
  }
  function xianfuRefresh(){
    const T=S.xianfu,r=xianfuRpc();
    if(Date.now()-T.lastRefresh<30000)return false;
    T.lastRefresh=Date.now();
    try{[0,1,2].forEach(id=>r?.getBuildingInfo?.([id]));}catch{}
    try{r?.GetXianFuInfo?.();}catch{}
    try{r?.getXianFuFengShuiInfo?.();}catch{}
    try{r?.getIllustratedHandbook?.();}catch{}
    return true;
  }
  function xianfuRecipeState(buildingId){
    const m=xianfuModel(),b=xianfuBuild(buildingId),cfg=W._ft?._Jdt?.ins;
    if(!m||!b||typeof cfg?.getCfgByIdAndLv!=='function')return {ready:false,reason:'waiting_furnace_data'};
    if(Number(b[3])!==0)return {ready:false,reason:'furnace_not_ready',status:Number(b[3])};
    const level=Number(b[1]),rows=cfg.getCfgByIdAndLv(buildingId,level)?.[5],energy=Number(m.typeInfos?.(0)),max=Number(m.getSmeltMaxNum?.());
    const reduce=Math.min(99,Math.max(0,Number(m.smeltConsumeReduceValue)||0));
    if(!Array.isArray(rows)||!Number.isSafeInteger(level)||!Number.isFinite(energy)||!Number.isSafeInteger(max)||max<1)
      return {ready:false,reason:'waiting_furnace_recipe_config'};
    let cursor=S.xianfu.cursor.get(buildingId);
    if(!cursor||cursor.level!==level){cursor={level,index:0};S.xianfu.cursor.set(buildingId,cursor);}
    const recipes=rows.map((row,index)=>{
      const unit=Number(row?.[3])*(1-reduce/100);
      const qty=Number.isFinite(unit)&&unit>0?Math.min(max,Math.floor(energy/unit)):0;
      return {index,itemId:Number(row?.[0]),unit,qty};
    });
    if(!recipes.length)return {ready:false,reason:'no_furnace_recipes'};
    const start=((cursor.index%recipes.length)+recipes.length)%recipes.length;
    for(let offset=0;offset<recipes.length;offset++){
      const index=(start+offset)%recipes.length,choice=recipes[index];
      if(choice.qty>0&&Number.isSafeInteger(choice.itemId)&&choice.itemId>0){
        cursor.index=index;
        return {ready:true,buildingId,level,choice,recipes:recipes.length,energy,max,
          signature:xianfuSig([buildingId])};
      }
    }
    return {ready:false,reason:'waiting_furnace_energy',buildingId,level,recipes:recipes.length,energy};
  }
  function xianfuHandbookState(redId){
    const m=xianfuModel(),cfg=W._ft?._obt?.ins,type=redId-85;
    if(!m||typeof cfg?.getIdsByType!=='function'||typeof cfg?.getCfgByIdAndLv!=='function'||
      typeof cfg?.items!=='function'||typeof m.getHbStateById!=='function')
      return {ready:false,reason:'waiting_handbook_model'};
    const ids=cfg.getIdsByType(type),choices=[];
    if(!ids)return {ready:false,reason:'waiting_handbook_ids'};
    for(const rawId of Object.values(ids)){
      const id=Number(rawId),level=Number(m.hbList?.[id]||0),cur=cfg.getCfgByIdAndLv(id,level),next=cfg.getCfgByIdAndLv(id,level+1);
      if(!cur||!next)continue;
      const need=cfg.items(cur,level),have=Number(m.hbSP?.get?.(Number(need?.[0]))||0);
      const nativeState=Number(m.getHbStateById(id));
      if(Array.isArray(need)&&Number.isFinite(have)&&have>=Number(need[1])&&[3,4].includes(nativeState))choices.push({id,level,item:Number(need[0]),need:Number(need[1]),have});
    }
    const signature=JSON.stringify([type,choices.map(x=>[x.id,x.level,x.have]),choices.map(x=>Number(m.hbSP?.get?.(x.item)||0))]);
    return {ready:api.isActive(redId)&&choices.length>0,reason:choices.length?'ready':'no_handbook_upgrade',choices,signature};
  }
  function xianfuTaskSnapshot(){
    const m=xianfuModel(),r=xianfuRpc(),cfg=W._ft?._ubt?.ins;
    if(!m||!r||typeof r.getXianFuTaskAward!=='function'||typeof r.getXianFuActivaAward!=='function'||
      !Array.isArray(m.taskList)||!Array.isArray(m.taskActivesValue)||!Array.isArray(m.getDcs)||typeof cfg?.getCfgById!=='function')
      return {ready:false,reason:'waiting_xianfu_task_data'};
    const rows=m.taskList,eligible=[];
    for(const row of rows){
      if(!Array.isArray(row)||Number(row[2])!==1)continue;
      const id=Number(row[0]),conf=cfg.getCfgById(id);
      if(!Number.isSafeInteger(id)||id<=0||!conf)continue;
      eligible.push({kind:'task',id});
    }
    const milestone=m.taskActivesValue.findIndex((threshold,index)=>Number(threshold)>0&&Number(m.taskValue)>=Number(threshold)&&!m.getDcs.includes(index));
    if(milestone>=0)eligible.push({kind:'milestone',index:milestone});
    const signature=JSON.stringify([rows.map(row=>[Number(row?.[0]),Number(row?.[1]),Number(row?.[2])]),Number(m.taskValue),m.getDcs.slice()]);
    return {ready:api.isActive(84)&&eligible.length>0,reason:eligible.length?'ready':'no_completed_xianfu_task',eligible,signature,
      rows:rows.map(row=>({id:Number(row?.[0]),progress:Number(row?.[1]),state:Number(row?.[2])})),milestoneValue:Number(m.taskValue),claimed:[...m.getDcs]};
  }
  function xianweiSnapshot(){
    const m=W._Ba?._G_n?._U_n?.ins,r=W._Ba?._G_n?.__Yn?.ins;
    if(!m||!Array.isArray(m._zJn)||typeof r?.getTaskAward!=='function')return {ready:false,reason:'waiting_xianwei_task_data'};
    const eligible=m._zJn.filter(row=>Array.isArray(row)&&Number.isSafeInteger(Number(row[0]))&&Number(row[0])>0&&Number(row[1])===1).map(row=>({id:Number(row[0]),state:Number(row[1])}));
    const signature=JSON.stringify([Number(m.poslv),eligible,m._zJn.map(row=>[Number(row?.[0]),Number(row?.[1])])]);
    return {ready:api.isActive(21)&&eligible.length>0,reason:eligible.length?'ready':'no_completed_xianwei_task',eligible,signature,poslv:Number(m.poslv),modelReady:true,rpcReady:true};
  }
  function runXianwei(){
    const T=S.xianwei,m=W._Ba?._G_n?._U_n?.ins,r=W._Ba?._G_n?.__Yn?.ins;T.blocking=false;
    if(T.pending){const p=T.pending,after=xianweiSnapshot();if(after.signature&&after.signature!==p.before){T.claimed++;T.pending=null;T.blocked=null;T.reason='task_reward_acknowledged';S.confirmed++;return;}if(Date.now()-p.at>25000){T.blocked={before:p.before,at:p.at,id:p.id};T.pending=null;T.reason='task_ack_timeout_no_retry';return;}T.blocking=true;T.reason='waiting_task_server_ack';return;}
    const state=xianweiSnapshot();if(T.blocked){if(state.signature===T.blocked.before){T.reason='task_ack_timeout_no_retry';return;}T.blocked=null;}
    if(!S.enabled||!owned()||!svipContext()||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)||W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true){T.reason='waiting_safe_context';return;}
    if(!state.ready){T.reason=state.reason;return;}if(Date.now()-T.lastSend<800){T.reason='request_cooldown';return;}
    const choice=state.eligible[0];T.pending={id:choice.id,before:state.signature,at:Date.now()};T.lastSend=T.pending.at;T.blocking=true;T.reason='waiting_task_server_ack';S.sent++;
    try{const result=r.getTaskAward(choice.id);if(result===false)throw Error('native_xianwei_task_award_returned_false');}
    catch(e){T.blocked={id:choice.id,before:state.signature,at:T.pending.at};T.pending=null;T.blocking=false;T.reason='task_send_error_no_retry';S.lastError=String(e);}
  }
  const xianfuAppearanceModel=()=>W._Ba?._Q9?.home_mansion?._tZ?.ins;
  const xianfuAppearanceRpc=()=>W._Ba?._Q9?.home_mansion?._Hun?.ins;
  const xianfuAppearanceBag=()=>W._Ba?._Ic?._aQ?.ins;
  const xianfuAppearanceCount=id=>Number(xianfuAppearanceBag()?.getItemCountById?.(Number(id))||0);
  function xianfuAppearanceState(redId){
    const m=xianfuAppearanceModel(),feed=W._ft?._yvi?.ins,magic=W._ft?._hSn?.ins,refine=W._ft?._DZ?.ins;
    if(!m)return {ready:false,reason:'waiting_appearance_model'};
    if(redId===635){
      const level=Number(m.feedLevel),cur=feed?.getCfgByLv?.(level),next=feed?.getCfgByLv?.(level+1),cost=cur?.[1]?.[0];
      const ownedCount=xianfuAppearanceCount(cost);
      const ready=api.isActive(635)&&m.getFeedUpRP?.()===true&&!!next&&Number.isSafeInteger(Number(cost))&&ownedCount>=Number(cur?.[1]?.[1]);
      return {ready,reason:ready?'ready':next?'no_feed_material':'feed_max',level,cost:Number(cost),need:Number(cur?.[1]?.[1]),owned:ownedCount,
        signature:JSON.stringify([level]),resourceSignature:JSON.stringify([Number(cost),ownedCount])};
    }
    if(redId===636){
      const ids=feed?.getAllSkillId?.()||[],choices=[];
      for(const raw of ids){const id=Number(raw),level=Number(m.getFeedSkillLvById?.(id)||0),required=feed?.getAllCanUpLvBySkillid?.(id)?.[level],skillId=id*10000+level;
        if(Number.isFinite(required)&&Number(m.feedLevel)>=required&&W._ft?._nY?.ins?.getCfgById?.(skillId+1))choices.push({id,level,skillId,required});}
      return {ready:api.isActive(636)&&choices.length>0,reason:choices.length?'ready':'no_feed_skill_ready',choices,signature:JSON.stringify([Number(m.feedLevel),ids.map(id=>[Number(id),Number(m.getFeedSkillLvById?.(id)||0)])]),resourceSignature:JSON.stringify([Number(m.feedLevel)])};
    }
    if(redId===637){
      const ids=magic?.getShowids?.()||[],choices=[];
      for(const raw of ids){const id=Number(raw),level=Number(m.getShowidsInfo?.(id)?.[1]||0),cfg=magic?.getCfgByIdAndLv?.(id,level),cost=cfg?.[2]?.[0],item=Number(cost?.[0]),need=Number(cost?.[1]),have=xianfuAppearanceCount(item),vipNeed=Number(W._et?.getSvipLimit?.(item)||0),vip=Number(W._Ba?._ke?._Le?.instance?.curSvipLv||0);
        if(cfg&&Number.isSafeInteger(item)&&item>0&&need>0&&have>=need&&vip>=vipNeed)choices.push({id,level,item,need,have,vipNeed});}
      return {ready:api.isActive(637)&&choices.length>0,reason:choices.length?'ready':'no_illusion_upgrade_ready',choices,signature:JSON.stringify(ids.map(id=>[Number(id),Number(m.getShowidsInfo?.(Number(id))?.[1]||0)])),resourceSignature:JSON.stringify(ids.map(id=>{const level=Number(m.getShowidsInfo?.(Number(id))?.[1]||0),cost=magic?.getCfgByIdAndLv?.(Number(id),level)?.[2]?.[0];return [Number(cost?.[0]),xianfuAppearanceCount(cost?.[0])];}))};
    }
    if(redId===638){
      const choices=[];
      for(let type=0;type<4;type++){const row=m.getRefineInfoByType?.(type),level=Number(row?.[1]||0),cfg=refine?.getCfgByTypeAndLv?.(type,level),cost=cfg?.[2]?.[0],item=Number(cost?.[0]),need=Number(cost?.[1]),have=xianfuAppearanceCount(item),max=Number(refine?.getMaxLvByLv?.(type,level));
        if(cfg&&Number.isFinite(max)&&level<max&&Number.isSafeInteger(item)&&item>0&&need>0&&have>=need)choices.push({type,level,item,need,have,max});}
      return {ready:api.isActive(638)&&choices.length>0,reason:choices.length?'ready':'no_refine_material_ready',choices,signature:JSON.stringify([0,1,2,3].map(type=>{const row=m.getRefineInfoByType?.(type);return [type,Number(row?.[1]||0)];})),resourceSignature:JSON.stringify([0,1,2,3].map(type=>{const row=m.getRefineInfoByType?.(type),cost=refine?.getCfgByTypeAndLv?.(type,Number(row?.[1]||0))?.[2]?.[0];return [Number(cost?.[0]),xianfuAppearanceCount(cost?.[0])];}))};
    }
    if(redId===817){
      const ids=magic?.getShowids?.()||[],choices=[];
      for(const raw of ids){const id=Number(raw),show=m.getShowidsInfo?.(id),level=Number(show?.[1]||0),active=m.getActiveSkillById?.(id),base=magic?.getCfgByIdAndLv?.(id,0)?.[8],skill=active?Number(W._et?._XQ?.(active[1],active[2])||0):Number(base||0),nextSkill=W._ft?._nY?.ins?.getCfgById?.(skill+1);
        if(level>0&&skill>0&&nextSkill&&m.isActiveIluSkill?.(id)===true)choices.push({id,level,skill,active:!!active});}
      return {ready:api.isActive(817)&&choices.length>0,reason:choices.length?'ready':'no_illusion_skill_ready',choices,signature:JSON.stringify(ids.map(id=>[Number(id),Number(m.getShowidsInfo?.(Number(id))?.[1]||0),m.getActiveSkillById?.(Number(id))]))};
    }
    return {ready:false,reason:'unknown_appearance_action'};
  }
  function runXianfuAppearance(redId){
    const T=S.xianfuAppearance,m=xianfuAppearanceModel(),r=xianfuAppearanceRpc();T.blocking=false;
    if(!S.enabled||!owned()||!svipContext()||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)||W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true){T.reason='waiting_safe_context';return;}
    const p=T.pending;
    if(p){
      const after=xianfuAppearanceState(p.redId);
      if(after.signature&&after.signature!==p.before){T.pending=null;T.blocked=null;T.reason='server_acknowledged_'+p.redId;S.confirmed++;return;}
      if(Date.now()-p.at>25000){T.blocked={redId:p.redId,before:p.before,resourceBefore:p.resourceBefore,at:p.at};T.pending=null;T.reason='ack_timeout_no_retry';return;}
      if(Date.now()-Number(p.lastProbe||p.at)>=3000){p.lastProbe=Date.now();try{r?._Fun?.();}catch{}}
      T.blocking=true;T.reason='waiting_server_ack_'+p.redId;return;
    }
    if(T.blocked){const after=xianfuAppearanceState(T.blocked.redId);if(!after.signature||(after.signature===T.blocked.before&&after.resourceSignature===T.blocked.resourceBefore)){T.reason='ack_timeout_no_retry';return;}T.blocked=null;}
    const state=xianfuAppearanceState(redId);if(!state.ready){T.reason=state.reason;return;}
    if(Date.now()-T.lastSend<700)return;
    let choice,action;
    if(redId===635){choice={level:state.level};action=()=>r.FeedXianFuShow();}
    else if(redId===636){choice=state.choices[0];action=()=>r.AddXianFuShowSkillLevel(choice.skillId);}
    else if(redId===637){choice=state.choices[0];action=()=>r.AddXianFuMagicShow(choice.id);}
    else if(redId===638){choice=state.choices[0];const vip=Number(W._Ba?._ke?._Le?.instance?.curSvipLv||0),vipNeed=Number(W._et?.getSvipLimit?.(68001)||0);action=()=>r.AddXianFuShowRefine(choice.type,vip>=vipNeed?1:0);}
    else {choice=state.choices[0];action=()=>r.ActiveXianFuSkill(choice.id);}
    if(typeof action!=='function'||!r){T.reason='waiting_appearance_rpc';return;}
    T.pending={redId,before:state.signature,resourceBefore:state.resourceSignature,choice,at:Date.now()};T.lastSend=T.pending.at;T.blocking=true;T.reason='waiting_server_ack_'+redId;S.sent++;
    try{const result=action();if(result===false)throw Error('native_xianfu_appearance_rpc_returned_false');}
    catch(e){T.blocked={redId,before:state.signature,resourceBefore:state.resourceSignature,at:Date.now()};T.pending=null;T.blocking=false;T.reason='send_error_no_retry';S.lastError=String(e);}
  }
  const weaponIllusionTiers=new Map([[23,3],[642,3],[24,4],[643,4],[25,5],[644,5],[26,6],[645,6],[872,7],[955,7]]);
  const weaponIllusionNames={3:'Trân',4:'Cực',5:'Huyền',6:'Điển',7:'Tàng'};
  function weaponIllusionState(redId){
    const tier=weaponIllusionTiers.get(Number(redId)),m=W._Ba?._M4?._HJ?.inst,cfg=W._ft?._r$?.ins,bag=W._Ba?._Ic?._aQ?.ins,rpc=W._Ba?._M4?._j6t?.inst;
    if(!tier||!m||!cfg||!bag||typeof m._Hyt!=='function'||typeof cfg.getSkinCfgByType!=='function'||typeof cfg.getHuanhuaCfgByIdAndLev!=='function'||typeof rpc?.mgcLv!=='function')return {ready:false,reason:'waiting_weapon_illusion_data'};
    const rows=cfg.getSkinCfgByType(tier)||[],choices=[];
    for(const row of rows){
      const id=Number(row?.[0]),entry=m.hhuaLst?.get?.(id),level=Number(entry?.[1]||0),current=cfg.getHuanhuaCfgByIdAndLev(id,level),next=cfg.getHuanhuaCfgByIdAndLev(id,level+1);
      if(!Number.isSafeInteger(id)||id<=0||!current||!next)continue;
      let eligible=false;try{eligible=m._Hyt(id,level,entry?.[2]||false,Number(entry?.[3]||0))===true;}catch{}
      if(!eligible)continue;
      const costs=current?.[2]||[],available=costs.map(cost=>({item:Number(cost?.[0]),need:Number(cost?.[1]),owned:Number(bag.getItemCountById?.(Number(cost?.[0]))||0)}));
      const selected=typeof m._cqt==='function'?m._cqt(current):available[0]?[available[0].item,available[0].need]:null;
      choices.push({id,level,tier,item:Number(selected?.[0]),need:Number(selected?.[1]),owned:Number(bag.getItemCountById?.(Number(selected?.[0]))||0),costs:available});
    }
    const allIds=rows.map(row=>Number(row?.[0])).filter(id=>Number.isSafeInteger(id)&&id>0);
    const signature=JSON.stringify(allIds.map(id=>{const entry=m.hhuaLst?.get?.(id);return [id,Number(entry?.[1]||0),entry?.[2]===true,Number(entry?.[3]||0)];}));
    const resourceSignature=JSON.stringify(choices.map(choice=>[choice.id,choice.costs.map(cost=>[cost.item,cost.owned])]));
    return {ready:api.isActive(redId)&&choices.length>0,reason:choices.length?'ready':'no_eligible_'+weaponIllusionNames[tier]+'_upgrade',tier,choices,signature,resourceSignature};
  }
  function runWeaponIllusion(redId){
    const T=S.weaponIllusion,m=W._Ba?._M4?._HJ?.inst,rpc=W._Ba?._M4?._j6t?.inst;T.blocking=false;
    if(!S.enabled||!owned()||!svipContext()||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)||W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true){T.reason='waiting_safe_context';return;}
    if(T.pending){
      const after=weaponIllusionState(T.pending.redId);
      if(after.signature&&after.signature!==T.pending.before){const ackId=T.pending.redId;T.pending=null;T.blocked=null;T.reason='server_acknowledged_'+ackId;S.confirmed++;return;}
      if(Date.now()-T.pending.at>25000){T.blocked={redId:T.pending.redId,before:T.pending.before,resourceBefore:T.pending.resourceBefore,at:T.pending.at};T.pending=null;T.reason='ack_timeout_no_retry';return;}
      T.blocking=true;T.reason='waiting_server_ack_'+T.pending.redId;return;
    }
    if(T.blocked){const after=weaponIllusionState(T.blocked.redId);if(!after.signature||(after.signature===T.blocked.before&&after.resourceSignature===T.blocked.resourceBefore)){T.reason='ack_timeout_no_retry';return;}T.blocked=null;}
    const state=weaponIllusionState(redId);if(!state.ready){T.reason=state.reason;return;}
    if(Date.now()-T.lastSend<800)return;
    const choice=state.choices[0];T.pending={redId,before:state.signature,resourceBefore:state.resourceSignature,choice,at:Date.now()};T.lastSend=T.pending.at;T.blocking=true;T.reason='waiting_server_ack_'+weaponIllusionNames[state.tier];S.sent++;
    try{const result=rpc.mgcLv([choice.id]);if(result===false)throw Error('native_weapon_illusion_rpc_returned_false');}
    catch(e){T.blocked={redId,before:state.signature,resourceBefore:state.resourceSignature,at:Date.now()};T.pending=null;T.blocking=false;T.reason='send_error_no_retry';S.lastError=String(e);}
  }
  const appearanceIllusionDefs={
    wing:{ids:[29,30,31,32,871],tiers:[3,4,5,6,7],model:()=>W._Ba?._RJ?._DJ?.ins,cfg:()=>W._ft?._PZ?.ins,rpc:()=>W._Ba?._RJ?._R6t?.ins,method:'magicLev',list:m=>m?.huanhuaLs,info:(m,id)=>m?.huanhuaLs?.get?.(id),getRows:(c,t)=>c?.getSkinCfgByType?.(t)||[],getCfg:(c,id,lv)=>c?.getHuanhuaCfgByIdAndLv?.(id,lv),cost:(m,row,current)=>m?._cqt?.(current),eligibility:(m,id,lv,e)=>m?._Hyt?.(id,lv,e?.[2]||false,Number(e?.[3]||0))===true},
    fashion:{ids:[145,144,146,147,873],tiers:[3,4,5,6,7],model:()=>W._Ba?._KJ?._qJ?.inst,cfg:()=>W._ft?._Eqt?.ins,rpc:()=>W._Ba?._KJ?._Ejt?.inst,method:'addFashMgcShow',list:m=>m?.fashInfo?.[4],info:(m,id)=>m?.getMgcShowInfoById?.(id),getRows:(c,t)=>c?.getCfgsByQuality?.(t)||[],getCfg:(c,id,lv)=>c?.getCfgByShowIdAndLevel?.(id,lv),cost:(m,row)=>m?.getActLst?.(row),eligibility:()=>true},
    arm:{ids:[152,151,153,154,874],tiers:[3,4,5,6,7],model:()=>W._Ba?._UJ?._XJ?.ins,cfg:()=>W._ft?._VKt?.ins,rpc:()=>W._Ba?._UJ?._Ujt?.ins,method:'addHandMagShow',list:m=>m?.handInfo?.[4],info:(m,id)=>m?.getMagicShowInfoById?.(id),getRows:(c,t)=>c?.getCfgsByQuality?.(t)||[],getCfg:(c,id,lv)=>c?.getCfgByShowIdAndLevel?.(id,lv),cost:(m,row,current)=>m?._NKt?.(row),eligibility:()=>true},
    cloak:{ids:[688,689,690,691],tiers:[3,4,5,6],model:()=>W._Ba?._JJ?._QJ?.inst,cfg:()=>W._ft?._o$?.ins,rpc:()=>W._Ba?._JJ?._Oun?.inst,method:'mgcLv',list:m=>m?.hhuaLst,info:(m,id)=>m?.getMgcShowInfoById?.(id)||m?.hhuaLst?.get?.(id),getRows:(c,t)=>c?.getSkinCfgByType?.(t)||[],getCfg:(c,id,lv)=>c?.getHuanhuaCfgByIdAndLev?.(id,lv)||c?.getCfgByIdAndLv?.(id,lv),cost:(m,row,current)=>m?._cqt?.(current),eligibility:(m,id,lv,e)=>m?._Hyt?.(id,lv,e?.[2]||false,Number(e?.[3]||0))===true}
  };
  const appearanceIllusionName={wing:'Linh Dực',fashion:'Thời Trang',arm:'Linh Tí',cloak:'Phi Phong'};
  function appearanceIllusionState(kind,redId){
    const d=appearanceIllusionDefs[kind],m=d?.model?.(),c=d?.cfg?.(),bag=W._Ba?._Ic?._aQ?.ins,rpc=d?.rpc?.(),idx=d?.ids?.indexOf(Number(redId)),tier=idx>=0?d.tiers[idx]:0;
    if(!d||!tier||!m||!c||!bag||typeof rpc?.[d.method]!=='function')return {ready:false,reason:'waiting_'+kind+'_illusion_data'};
    const rows=d.getRows(c,tier)||[],choices=[];
    for(const row of rows){
      const id=Number(row?.[0]),entry=d.info(m,id),level=Number(entry?.[1]||0),current=d.getCfg(c,id,level),next=d.getCfg(c,id,level+1);
      if(!Number.isSafeInteger(id)||id<=0||!current||!next)continue;
      let eligible=false;try{eligible=d.eligibility(m,id,level,entry)===true;}catch{}
      if(!eligible)continue;
      const cost=d.cost?.(m,row,current)||current?.[2]?.[0],item=Number(cost?.[0]),need=Number(cost?.[1]),ownedCount=Number(bag.getItemCountById?.(item)||0),vipLimit=Number(W._et?.getSvipLimit?.(item)),svip=Number(W._Ba?._ke?._Le?.instance?.curSvipLv);
      if(!Number.isSafeInteger(item)||item<=0||!Number.isSafeInteger(need)||need<=0||ownedCount<need||!Number.isFinite(vipLimit)||!Number.isFinite(svip)||svip<vipLimit)continue;
      choices.push({id,level,tier,item,need,owned:ownedCount,svip, vipLimit});
    }
    const ids=rows.map(row=>Number(row?.[0])).filter(id=>Number.isSafeInteger(id)&&id>0),list=d.list(m),signature=JSON.stringify(ids.map(id=>{const e=d.info(m,id);return [id,Number(e?.[1]||0),e?.[2]===true,Number(e?.[3]||0)];})),resourceSignature=JSON.stringify(choices.map(x=>[x.id,x.item,Number(bag.getItemCountById?.(x.item)||0)]));
    return {ready:api.isActive(redId)&&choices.length>0,reason:choices.length?'ready':'no_eligible_'+kind+'_illusion_upgrade',tier,choices,signature,resourceSignature,listReady:!!list};
  }
  function runAppearanceIllusion(kind,redId){
    const T=S.appearanceIllusion,d=appearanceIllusionDefs[kind],rpc=d?.rpc?.();T.blocking=false;
    if(!S.enabled||!owned()||!svipContext()||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)||W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true){T.reason='waiting_safe_context';return;}
    if(T.pending){const p=T.pending,after=appearanceIllusionState(p.kind,p.redId);if(after.signature&&after.signature!==p.before){T.pending=null;T.blocked=null;T.reason='server_acknowledged_'+p.kind+'_'+p.redId;S.confirmed++;return;}if(Date.now()-p.at>25000){T.blocked={...p};T.pending=null;T.reason='ack_timeout_no_retry';return;}T.blocking=true;T.reason='waiting_server_ack_'+p.kind;return;}
    if(T.blocked){const after=appearanceIllusionState(T.blocked.kind,T.blocked.redId);if(!after.signature||(after.signature===T.blocked.before&&after.resourceSignature===T.blocked.resourceBefore)){T.reason='ack_timeout_no_retry';return;}T.blocked=null;}
    const state=appearanceIllusionState(kind,redId);if(!state.ready){T.reason=state.reason;return;}if(Date.now()-T.lastSend<800)return;
    const choice=state.choices[0];T.pending={kind,redId,before:state.signature,resourceBefore:state.resourceSignature,choice,at:Date.now()};T.lastSend=T.pending.at;T.blocking=true;T.reason='waiting_server_ack_'+kind+'_'+state.tier;S.sent++;
    try{const result=kind==='fashion'||kind==='arm'?rpc[d.method](choice.id):rpc[d.method]([choice.id]);if(result===false)throw Error('native_'+kind+'_illusion_rpc_returned_false');}
    catch(e){T.blocked={...T.pending};T.pending=null;T.blocking=false;T.reason='send_error_no_retry';S.lastError=String(e);}
  }
  function runXianfuTasks(){
    const T=S.xianfu,r=xianfuRpc();T.blocking=false;
    if(!S.enabled||!owned()||!svipContext()||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)||W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true){T.reason='waiting_safe_context';return;}
    const state=xianfuTaskSnapshot();
    if(state.reason==='waiting_xianfu_task_data'&&Date.now()-T.lastTaskQuery>=30000){
      T.lastTaskQuery=Date.now();try{r?.getXianfuTaskList?.();T.reason='refreshing_task_data';}catch(e){T.reason='task_query_error';S.lastError=String(e);}return;
    }
    if(T.pending){
      const p=T.pending;
      if(p.kind==='xianfu_task'||p.kind==='xianfu_milestone'){
        if(Date.now()-Number(p.lastProbe||p.at)>=3000){p.lastProbe=Date.now();try{r?.getXianfuTaskList?.();}catch{}}
        const after=xianfuTaskSnapshot();
        if(after.signature&&after.signature!==p.before){T.pending=null;T.blocked=null;T.reason='task_reward_acknowledged';S.confirmed++;return;}
      }
      if(Date.now()-p.at>30000){T.blocked={before:p.before,at:p.at,kind:p.kind,redId:p.redId};T.pending=null;T.reason='task_ack_timeout_no_retry';}
      else{T.blocking=true;T.reason='waiting_task_server_ack';return;}
    }
    if(T.blocked){
      const nowState=xianfuTaskSnapshot();
      if(!nowState.signature||nowState.signature===T.blocked.before){T.reason='task_ack_timeout_no_retry';return;}
      T.blocked=null;
    }
    if(!state.ready){T.reason=state.reason;return;}
    const choice=state.eligible[0],before=state.signature;
    T.pending={kind:choice.kind==='task'?'xianfu_task':'xianfu_milestone',redId:84,choice,before,at:Date.now()};
    T.lastSend=Date.now();T.blocking=true;T.reason='waiting_task_server_ack';S.sent++;
    try{
      const result=choice.kind==='task'?r.getXianFuTaskAward([choice.id]):r.getXianFuActivaAward([choice.index]);
      if(result===false)throw Error('native_task_reward_api_returned_false');
    }catch(e){T.blocked={before,at:Date.now(),kind:T.pending.kind,redId:84};T.pending=null;T.blocking=false;T.reason='task_send_error_no_retry';S.lastError=String(e);}
  }
  function runXianfu(redId){
    const T=S.xianfu,m=xianfuModel(),r=xianfuRpc();T.blocking=false;xianfuWatch();
    if(!S.enabled||!owned()||!svipContext()||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)||W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true){T.reason='waiting_safe_context';return;}
    if(T.pending){
      const p=T.pending;
      if(p.kind==='craft'&&T.ack>p.ack){
        const afterSig=xianfuSig([p.buildingId]),energy=Number(m?.typeInfos?.(0));
        if(afterSig!==p.before){
          const recipes=W._ft?._Jdt?.ins?.getCfgByIdAndLv?.(p.buildingId,p.level)?.[5];
          if(energy<p.choice.unit)T.cursor.set(p.buildingId,{level:p.level,index:(p.choice.index+1)%Math.max(1,Array.isArray(recipes)?recipes.length:1)});
          T.pending=null;T.blocked=null;T.reason='craft_acknowledged';S.confirmed++;return;
        }
      }else if(p.kind==='handbook'){
        const after=xianfuHandbookState(p.redId);
        if(after.signature&&after.signature!==p.before){T.pending=null;T.blocked=null;T.reason='handbook_acknowledged';S.confirmed++;return;}
      }else if(p.kind==='collect'){
        if(xianfuSig(p.ids)!==p.before){T.pending=null;T.blocked=null;T.reason='collection_acknowledged';S.confirmed++;return;}
      }
      if(Date.now()-Number(p.lastProbe||p.at)>=3000){
        p.lastProbe=Date.now();
        try{
          if(p.kind==='handbook')r?.getIllustratedHandbook?.();
          else if(p.kind==='collect')for(const id of p.ids||[])r?.getBuildingInfo?.([id]);
          else if(p.kind==='craft')r?.getBuildingInfo?.([p.buildingId]);
        }catch{}
      }
      if(Date.now()-p.at>30000){T.blocked={before:p.before,at:p.at,kind:p.kind,redId:p.redId,ids:p.ids,buildingId:p.buildingId};T.pending=null;T.reason='ack_timeout_no_retry';}
      else{T.blocking=true;T.reason='waiting_server_ack';return;}
    }
    if(T.blocked){
      let current='';
      if(T.blocked.kind==='handbook')current=xianfuHandbookState(T.blocked.redId).signature||'';
      else if(T.blocked.kind==='collect')current=xianfuSig(T.blocked.ids||[]);
      else if(T.blocked.kind==='craft')current=xianfuRecipeState(T.blocked.buildingId).signature||'';
      else current=xianfuSig([0,1,2]);
      if(current===T.blocked.before){T.reason='ack_timeout_no_retry';return;}T.blocked=null;
    }
    if(!m||!r){T.reason='waiting_xianfu_model';return;}
    if(xianfuRefresh()){T.reason='refreshing_xianfu_state';return;}
    if([76,77].includes(redId)){
      const id=redId===76?0:1,b=xianfuBuild(id);
      if(!api.isActive(redId)||!Array.isArray(b)||Number(b[3])!==3||typeof r.getBuildProduceAward!=='function'){T.reason='no_collectible_building';return;}
      const before=xianfuSig([id]);T.pending={kind:'collect',redId,ids:[id],before,at:Date.now()};T.lastSend=Date.now();T.blocking=true;T.reason='waiting_server_ack';S.sent++;
      try{r.getBuildProduceAward([id]);}catch(e){T.blocked={kind:'collect',ids:[id],before,at:Date.now()};T.pending=null;T.blocking=false;T.reason='send_error_no_retry';S.lastError=String(e);}
      return;
    }
    if([85,86,87,88].includes(redId)){
      const state=xianfuHandbookState(redId),rpc=r;
      if(!state.ready||typeof rpc.PromoteIllustratedHandbook!=='function'){T.reason=state.reason||'waiting_handbook_rpc';return;}
      const choice=state.choices[0];T.pending={kind:'handbook',redId,choice,before:state.signature,at:Date.now()};T.lastSend=Date.now();T.blocking=true;T.reason='waiting_server_ack';S.sent++;
      try{rpc.PromoteIllustratedHandbook([choice.id]);}catch(e){T.blocked={kind:'handbook',redId,before:state.signature,at:Date.now()};T.pending=null;T.blocking=false;T.reason='send_error_no_retry';S.lastError=String(e);}
      return;
    }
    if(redId!==78||!api.isActive(78)){T.reason='red_dot_clear';return;}
    for(const id of [2]){
      const b=xianfuBuild(id),status=Number(b?.[3]);
      if(!Array.isArray(b))continue;
      if(status===2){
        const before=xianfuSig([id]);T.pending={kind:'collect',redId:78,ids:[id],before,at:Date.now()};T.lastSend=Date.now();T.blocking=true;T.reason='waiting_pill_collection_ack';S.sent++;
        try{r.getBuildProduceAward([id]);}catch(e){T.blocked={kind:'collect',ids:[id],before,at:Date.now()};T.pending=null;T.blocking=false;T.reason='send_error_no_retry';S.lastError=String(e);}
        return;
      }
      if(status===0){
        const state=xianfuRecipeState(id);
        if(!state.ready)continue;
        const before=state.signature,ack=T.ack,choice=state.choice;
        T.pending={kind:'craft',redId:78,buildingId:id,level:state.level,choice,before,ack,at:Date.now()};T.lastSend=Date.now();T.blocking=true;T.reason='waiting_craft_ack';S.sent++;
        try{r.makeItem([id,[[choice.index,choice.qty]]]);}catch(e){T.blocked={kind:'craft',buildingId:id,before,at:Date.now()};T.pending=null;T.blocking=false;T.reason='send_error_no_retry';S.lastError=String(e);}
        return;
      }
    }
    T.reason='no_ready_xianfu_work';
  }
  function blessingContext(){
    return !!W._Ba?._$a?.SceneUtil&&W._Ba?._$a?._yo?.ins?.isInMission!==true&&
      W._Ba?._rJ?._O$?.ins?.isDead!==true&&!W.KVPV?.core?.scene?.status?.()?.owner&&
      W.KVPV?.stageGuard?.isLocked?.()!==true&&W.KVPV_EVENT_PRIORITY?.hold?.()!==true;
  }
  const treasureTypes=new Map([[260,0],[261,4],[262,3],[263,1],[264,2],[265,9],[266,10],[267,11],[680,15]]);
  function treasureState(type){
    const m=W._Ba?._ze?._Ve?.ins;
    if(!m||typeof m.isFirst!=='function'||typeof m.isFcOpenByType!=='function'||typeof m.c_sendXunBao!=='function')return null;
    const first=m.isFirst(type);
    return {free:(first===true||first===1)&&m.isFcOpenByType(type)===true,signature:JSON.stringify([first,m.getValue?.(type),m.getNum?.(type),m.getTimes?.(type)])};
  }
  function runTreasureFree(redId){
    const T=S.treasureFree;
    T.blocking=false;
    const m=W._Ba?._ze?._Ve?.ins;
    if(T.pending){
      const p=T.pending,now=treasureState(p.type),reply=m?.xbRep;
      if(now&&now.signature!==p.before&&now.free===false){T.pending=null;T.blocked=null;T.reason='server_acknowledged_free_draw';S.confirmed++;return;}
      if(reply!==p.reply&&Array.isArray(reply)&&Number(reply[0])===p.type&&Number(reply[1])!==0){T.blocked={before:p.before,at:p.at};T.pending=null;T.reason='server_rejected_no_retry';return;}
      if(Date.now()-p.at>25000){T.blocked={before:p.before,at:p.at};T.pending=null;T.reason='ack_timeout_no_retry';}
      else{T.blocking=true;T.reason='waiting_server_ack';return;}
    }
    if(!S.enabled||!owned()||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)||W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true||!svipContext()){
      T.reason='waiting_safe_context';return;
    }
    const type=treasureTypes.get(Number(redId));
    if(type===undefined||!api.isActive(redId)){T.reason='red_dot_clear';return;}
    const state=treasureState(type);
    if(!state?.free){T.reason='no_daily_free_turn';return;}
    if(T.blocked){if(T.blocked.before===state.signature){T.reason='ack_timeout_no_retry';return;}T.blocked=null;}
    if(Date.now()-T.lastSend<1800){T.blocking=true;T.reason='request_cooldown';return;}
    T.pending={redId:Number(redId),type,before:state.signature,reply:m.xbRep,at:Date.now()};
    T.lastSend=T.pending.at;T.blocking=true;T.reason='waiting_server_ack';S.sent++;
    try{m.c_sendXunBao(0,true,false,type,false);}catch(e){T.blocked={before:state.signature,at:T.pending.at};T.pending=null;T.blocking=false;T.reason='send_error_no_retry';S.lastError=String(e);}
  }
  function weekWelfareState(){
    const m=W._Ba?._MJ?._xJ?.ins,r=W._Ba?._MJ?._O0n?.ins,card=m?.getCardInfo?.();
    if(!Array.isArray(card)||typeof m?.hasWeekCard!=='function'||typeof r?.GetWeekCardReward!=='function')return {ready:false,reason:'waiting_week_card_data'};
    const count=Number(card[4]||0),active=m.hasWeekCard()===true;
    return {ready:api.isActive(606)&&active&&count>0,reason:!active?'week_card_inactive':count>0?'ready':'no_accumulated_reward',active,count,signature:JSON.stringify(card)};
  }
  function runWeekWelfare(){
    const T=S.weeklyWelfare,m=W._Ba?._MJ?._xJ?.ins,r=W._Ba?._MJ?._O0n?.ins;T.blocking=false;
    if(T.pending){
      const p=T.pending,after=weekWelfareState();
      if((after.signature&&after.signature!==p.before)||after.active===false||api.isActive(606)===false){T.pending=null;T.blocked=null;T.reason='server_acknowledged_week_reward';S.confirmed++;return;}
      if(!p.probedAt&&Date.now()-p.at>=1800){p.probedAt=Date.now();try{r?.GetWeekCardInfo?.();T.reason='refreshing_week_card_state';}catch(e){T.reason='week_card_refresh_error';S.lastError=String(e);}}
      if(Date.now()-p.at>30000){T.blocked={before:p.before,at:p.at};T.pending=null;T.reason='ack_timeout_no_retry';return;}
      T.blocking=true;T.reason='waiting_week_card_ack';return;
    }
    if(!S.enabled||!owned()||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)||W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true||!svipContext()){T.reason='waiting_safe_context';return;}
    const state=weekWelfareState();if(!state.ready){T.reason=state.reason;return;}
    if(T.blocked){if(T.blocked.before===state.signature){T.reason='ack_timeout_no_retry';return;}T.blocked=null;}
    if(Date.now()-T.lastSend<800){T.blocking=true;T.reason='request_cooldown';return;}
    T.pending={before:state.signature,at:Date.now(),probedAt:0};T.lastSend=T.pending.at;T.blocking=true;T.reason='waiting_week_card_ack';S.sent++;
    try{const result=r.GetWeekCardReward();if(result===false)throw Error('native_week_card_reward_rpc_returned_false');}
    catch(e){T.blocked={before:state.signature,at:T.pending.at};T.pending=null;T.blocking=false;T.reason='send_error_no_retry';S.lastError=String(e);}
  }
  function jiuXiaoTaskState(redId){
    const m=W._Ba?._Je?._bJ?.ins,rpc=W._Ba?._Je?._Qe?.ins,kind=Number(redId)===371?'stage':'season',list=kind==='stage'?m?.stageTaskList:m?.seasonTaskList;
    if(!Array.isArray(list)||typeof rpc?.[kind==='stage'?'getStageTaskReward':'getSeasonTaskReward']!=='function')return {ready:false,reason:'waiting_jiuxiao_task_data'};
    const row=list.find(x=>Number(x?._state)===1&&Number.isSafeInteger(Number(x?._id))&&Number(x._id)>0);
    if(!row)return {ready:false,reason:'no_completed_task',kind};
    return {ready:api.isActive(redId),reason:api.isActive(redId)?'ready':'red_dot_clear',kind,id:Number(row._id),signature:JSON.stringify([kind,Number(row._id),Number(row._state),Number(row._curprogress),Number(row._curtimes)])};
  }
  function jiuXiaoFreeRewardState(){
    const m=W._Ba?._Je?._bJ?.ins,rpc=W._Ba?._Je?._Qe?.ins;
    if(!m||typeof m.getRewardList!=='function'||typeof m.getCurLvRewardState2!=='function'||typeof rpc?.getJiuXiaoLingReward!=='function')return {ready:false,reason:'waiting_jiuxiao_reward_data'};
    const level=Number(m.jiuxiaolingMyLevel),claimed=Number(m.jiuxiaolingHaveRewardLV),golden=Number(m.goldenState),levels=m.getRewardList();
    if(!Number.isSafeInteger(level)||!Number.isSafeInteger(claimed)||!Number.isFinite(golden)||!Array.isArray(levels))return {ready:false,reason:'invalid_jiuxiao_reward_data'};
    const row=levels.find(x=>Number(x?.[0])>claimed&&Number(x?.[0])<=level&&Array.isArray(x?.[3])&&x[3].length>0&&m.getCurLvRewardState2(Number(x[0]))===1);
    const canClaim=api.isActive(370)&&golden===0&&!!row;
    return {ready:canClaim,reason:!api.isActive(370)?'red_dot_clear':golden!==0?'skip_paid_reward_track':row?'ready':'no_free_level_reward',kind:'level',level,claimed,golden,signature:JSON.stringify([level,claimed,golden]),rewardLevel:Number(row?.[0]||0)};
  }
  function jiuXiaoState(redId){return Number(redId)===370?jiuXiaoFreeRewardState():jiuXiaoTaskState(redId);}
  function runJiuXiaoLing(redId){
    const T=S.jiuXiaoLing,m=W._Ba?._Je?._bJ?.ins,rpc=W._Ba?._Je?._Qe?.ins;T.blocking=false;
    if(T.pending){
      const p=T.pending;let acknowledged=false;
      if(p.kind==='level'){const current=Number(m?.jiuxiaolingHaveRewardLV);acknowledged=Number.isFinite(current)&&current>p.claimed;}
      else {const list=p.kind==='stage'?m?.stageTaskList:m?.seasonTaskList,row=Array.isArray(list)?list.find(x=>Number(x?._id)===p.id):null;acknowledged=!row||Number(row._state)!==1;}
      if(acknowledged||api.isActive(p.redId)===false){T.pending=null;T.blocked=null;T.reason='server_acknowledged_'+p.kind;S.confirmed++;return;}
      if(!p.probedAt&&Date.now()-p.at>=1800){p.probedAt=Date.now();try{rpc?.getJiuXiaoLingInfo?.();T.reason='refreshing_jiuxiao_state';}catch(e){T.reason='jiuxiao_refresh_error';S.lastError=String(e);}}
      if(Date.now()-p.at>30000){T.blocked={redId:p.redId,kind:p.kind,id:p.id,before:p.before,at:p.at};T.pending=null;T.reason='ack_timeout_no_retry';return;}
      T.blocking=true;T.reason='waiting_jiuxiao_ack';return;
    }
    if(!S.enabled||!owned()||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)||W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true||!svipContext()){T.reason='waiting_safe_context';return;}
    const state=jiuXiaoState(redId);if(!state.ready){T.reason=state.reason;return;}
    if(T.blocked){if(T.blocked.redId===Number(redId)&&T.blocked.kind===state.kind&&T.blocked.id===state.id&&T.blocked.before===state.signature){T.reason='ack_timeout_no_retry';return;}T.blocked=null;}
    if(Date.now()-T.lastSend<800){T.blocking=true;T.reason='request_cooldown';return;}
    T.pending={redId:Number(redId),kind:state.kind,id:state.id,claimed:state.claimed,before:state.signature,at:Date.now(),probedAt:0};T.lastSend=T.pending.at;T.blocking=true;T.reason='waiting_jiuxiao_ack';S.sent++;
    try{
      const result=state.kind==='stage'?rpc.getStageTaskReward(state.id):state.kind==='season'?rpc.getSeasonTaskReward(state.id):rpc.getJiuXiaoLingReward();
      if(result===false)throw Error('native_jiuxiaoling_reward_returned_false');
    }catch(e){T.blocked={redId:Number(redId),kind:state.kind,id:state.id,before:state.signature,at:T.pending.at};T.pending=null;T.blocking=false;T.reason='send_error_no_retry';S.lastError=String(e);}
  }
  function weekendConsumeState(){
    const m=W._Ba?._dCi?._kCi?.instance,r=W._Ba?._dCi?._wCi?.instance,rows=m?.arr;
    if(!m||!Array.isArray(rows)||typeof r?.getAward!=='function')return {ready:false,reason:'waiting_weekend_consume_data'};
    const serverTime=Number(W._Sa?.svrTime),endTime=Number(m.time),active=!!m.state&&Number.isFinite(serverTime)&&Number.isFinite(endTime)&&endTime>=serverTime;
    const data=rows.filter(x=>Array.isArray(x)&&Number.isSafeInteger(Number(x[0]))).map(x=>[Number(x[0]),Number(x[1]),Number(x[2])]);
    const ready=data.find(x=>x[1]===1);
    return {ready:api.isActive(321)&&active&&!!ready,reason:!api.isActive(321)?'red_dot_clear':!active?'weekend_consume_inactive':ready?'ready':'no_claimable_consume_reward',id:ready?.[0]??0,signature:JSON.stringify(data),active,endTime};
  }
  function runWeekendConsume(){
    const T=S.weekendConsume,r=W._Ba?._dCi?._wCi?.instance;T.blocking=false;
    if(T.pending){
      const p=T.pending,after=weekendConsumeState(),row=Array.isArray(W._Ba?._dCi?._kCi?.instance?.arr)?W._Ba._dCi._kCi.instance.arr.find(x=>Number(x?.[0])===p.id):null;
      if(!row||Number(row[1])!==1||api.isActive(321)===false||after.active===false){T.pending=null;T.blocked=null;T.reason='server_acknowledged_consume_reward';S.confirmed++;return;}
      if(!p.probedAt&&Date.now()-p.at>=1800){p.probedAt=Date.now();try{r?.getInfo?.();T.reason='refreshing_weekend_consume_state';}catch(e){T.reason='weekend_consume_refresh_error';S.lastError=String(e);}}
      if(Date.now()-p.at>30000){T.blocked={before:p.before,id:p.id,at:p.at};T.pending=null;T.reason='ack_timeout_no_retry';return;}
      T.blocking=true;T.reason='waiting_weekend_consume_ack';return;
    }
    if(!S.enabled||!owned()||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)||W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true||!svipContext()){T.reason='waiting_safe_context';return;}
    const state=weekendConsumeState();if(!state.ready){T.reason=state.reason;return;}
    if(T.blocked){if(T.blocked.id===state.id){T.reason='ack_timeout_no_retry';return;}T.blocked=null;}
    if(Date.now()-T.lastSend<800){T.blocking=true;T.reason='request_cooldown';return;}
    T.pending={id:state.id,before:state.signature,at:Date.now(),probedAt:0};T.lastSend=T.pending.at;T.blocking=true;T.reason='waiting_weekend_consume_ack';S.sent++;
    try{const result=r.getAward(state.id);if(result===false)throw Error('native_weekend_consume_reward_returned_false');}
    catch(e){T.blocked={before:state.signature,id:state.id,at:T.pending.at};T.pending=null;T.blocking=false;T.reason='send_error_no_retry';S.lastError=String(e);}
  }
  function dailyCheckinState(){
    const m=W._Ba?._BI?._ugt?.ins,signState=Number(m?.signState),signNum=Number(m?.signNum),dayNum=Number(m?.dayNum);
    if(!m||!Number.isFinite(signState)||!Number.isFinite(signNum)||!Number.isFinite(dayNum))return {ready:false,reason:'waiting_checkin_data'};
    const canClaim=signState===1&&signNum<=dayNum;
    return {ready:api.isActive(257)&&canClaim,reason:!api.isActive(257)?'red_dot_clear':canClaim?'ready':'no_daily_checkin',signState,signNum,dayNum,signature:JSON.stringify([signState,signNum,dayNum])};
  }
  function runDailyCheckin(){
    const T=S.dailyCheckin;T.blocking=false;
    if(T.pending){
      const p=T.pending,after=dailyCheckinState();
      if((after.signature&&after.signature!==p.before&&after.signState!==1)||api.isActive(257)===false){T.pending=null;T.blocked=null;T.reason='server_acknowledged_checkin';S.confirmed++;return;}
      if(Date.now()-p.at>30000){T.blocked={before:p.before,at:p.at};T.pending=null;T.reason='ack_timeout_no_retry';return;}
      T.blocking=true;T.reason='waiting_checkin_ack';return;
    }
    if(!S.enabled||!owned()||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)||W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true||!svipContext()){T.reason='waiting_safe_context';return;}
    const state=dailyCheckinState();if(!state.ready){T.reason=state.reason;return;}
    if(T.blocked){if(T.blocked.before===state.signature){T.reason='ack_timeout_no_retry';return;}T.blocked=null;}
    if(Date.now()-T.lastSend<800){T.blocking=true;T.reason='request_cooldown';return;}
    T.pending={before:state.signature,at:Date.now()};T.lastSend=T.pending.at;T.blocking=true;T.reason='waiting_checkin_ack';S.sent++;
    try{W._v.ins.send('TocT',null);}catch(e){T.blocked={before:state.signature,at:T.pending.at};T.pending=null;T.blocking=false;T.reason='send_error_no_retry';S.lastError=String(e);}
  }
  function loginAwardRows(act) {
    const model = W._Ba?.__1?.sea_login_award?._m1?.instance;
    const rows = model?.getStateList?.(Number(act));
    return Array.isArray(rows)
      ? rows.filter(row => Array.isArray(row) && Number.isSafeInteger(Number(row[0])) && Number(row[0]) > 0)
      : [];
  }
  function loginAwardState(redId) {
    const id = Number(redId);
    const def = loginAwardDefs.get(id);
    const model = W._Ba?.__1?.sea_login_award?._m1?.instance;
    const rpc = W._Ba?._IY?._WRt?.ins;
    const activity = W._Ba?.__1?.sea_login_award;
    if (!def || !model || typeof model.getStateList !== 'function' || typeof rpc?.getFestivalLoginReward !== 'function') {
      return { ready: false, reason: 'waiting_login_award_model_or_rpc' };
    }

    const act = Number(def.act);
    const activeAct = Number(def.kind === 'hq' ? model._cts : model._fts);
    const table = def.kind === 'hq' ? activity?.FitActIdToDatasHQ : activity?.FitActIdToDatas;
    if (!table?.[act] || Number(table[act][0]) !== id) {
      return { ready: false, reason: 'login_award_config_mismatch' };
    }
    if (activeAct !== act || W._Ba?._IY?._BY?.ins?.getActIsOpen?.(act) !== true) {
      return { ready: false, reason: 'login_award_activity_not_open', act, activeAct };
    }

    const rows = loginAwardRows(act);
    const claimable = rows
      .filter(row => Number(row[1]) === 1)
      .map(row => ({ id: Number(row[0]), state: Number(row[1]), row }));
    const active = api.isActive(id);
    return {
      ready: active && claimable.length > 0,
      reason: !active ? 'red_dot_clear' : claimable.length ? 'ready' : 'no_claimable_login_reward',
      redId: id,
      act,
      kind: def.kind,
      claimable,
      rows,
      signature: JSON.stringify(rows)
    };
  }
  function runLoginAwards(redId) {
    const task = S.loginAwards;
    const id = Number(redId);
    task.blocking = false;
    if (task.pending) {
      const pending = task.pending;
      const current = loginAwardRows(pending.act).find(row => Number(row[0]) === pending.id);
      if (!current || Number(current[1]) !== 1 || api.isActive(pending.redId) === false) {
        task.pending = null;
        task.blocked = null;
        task.reason = 'server_acknowledged_login_reward';
        task.claimed++;
        S.confirmed++;
        return;
      }
      if (Date.now() - pending.at > 30000) {
        task.blocked = { act: pending.act, id: pending.id, before: pending.before, redId: pending.redId, at: pending.at };
        task.pending = null;
        task.reason = 'ack_timeout_no_retry';
        return;
      }
      task.blocking = true;
      task.reason = 'waiting_login_reward_ack';
      return;
    }
    if (!S.enabled || !owned() || Date.now() < Number(W.__KVPV_USER_UI_UNTIL || 0) ||
        W.KVPV_CONFIRM_POPUPS?.beforeTask?.() === true || !svipContext()) {
      task.reason = 'waiting_safe_context';
      return;
    }

    const state = loginAwardState(id);
    if (!state.ready) {
      task.reason = state.reason;
      return;
    }
    const choice = state.claimable[0];
    const before = JSON.stringify(choice.row);
    if (task.blocked) {
      if (task.blocked.act === state.act && task.blocked.id === choice.id && task.blocked.before === before) {
        task.reason = 'ack_timeout_no_retry';
        return;
      }
      task.blocked = null;
    }
    if (Date.now() - task.lastSend < 800) {
      task.blocking = true;
      task.reason = 'request_cooldown';
      return;
    }

    task.pending = {
      redId: id,
      act: state.act,
      id: choice.id,
      before,
      signature: state.signature,
      at: Date.now()
    };
    task.lastSend = task.pending.at;
    task.blocking = true;
    task.reason = 'waiting_login_reward_ack';
    S.sent++;
    try {
      const result = W._Ba._IY._WRt.ins.getFestivalLoginReward(choice.id);
      if (result === false) throw Error('native_getFestivalLoginReward_returned_false');
    } catch (error) {
      task.blocked = { act: state.act, id: choice.id, before, redId: id, at: task.pending.at };
      task.pending = null;
      task.blocking = false;
      task.reason = 'send_error_no_retry';
      S.lastError = String(error);
    }
  }
  const coBaoModel = () => W._Ba?._kAt?._LAt?.inst;
  const coBaoConfig = () => W._ft?._WNn?.ins;
  const coBaoRpc = () => W._Ba?._kAt?._IMi?.inst;
  const thienKiepModel = () => W._Ba?._Co?._Mo?.ins;
  const thienKiepRpc = () => W._Ba?._sst?._Cht?.inst;
  const coBaoWindowMgr = () => (typeof _j !== 'undefined' && _j?.ins) || W.window_WinMgr || null;
  function coBaoThienKiepPanel() {
    let cfg = null;
    try { cfg = W._Sa?.getWindowCfgByFcId?.(46); } catch {}
    const id = Number(cfg?.[0]), mgr = coBaoWindowMgr();
    const open = Number.isSafeInteger(id) && id > 0 && mgr?.isOpened?.(id) === true;
    return { id:Number.isSafeInteger(id) && id > 0 ? id : 0, open,
      ui:open ? (mgr.getPanelById?.(id) || mgr.getDialogById?.(id) || null) : null };
  }
  function coBaoStageReward() {
    const stage = thienKiepModel(), levels = stage?.awardLvs;
    if (!Array.isArray(levels) || !levels.length) return null;
    const level = Number(levels[0]), current = Number(stage?.curLv);
    if (!Number.isSafeInteger(level) || level <= 0 || !Number.isSafeInteger(current) || current <= level) return null;
    const cfg = W._ft?._h$?.ins?.getCfgByLv?.(level);
    if (!Array.isArray(cfg) || !Number.isSafeInteger(Number(cfg[0])) || Number(cfg[0]) <= 0) return null;
    const list = W._ft?._h$?.ins?.award?.(cfg, level);
    return { level, mapId:Number(cfg[0]), list:Array.isArray(list) ? list : [],
      signature:JSON.stringify([current, levels]) };
  }
  function coBaoFragments() {
    const model = coBaoModel(), config = coBaoConfig();
    const count = Array.isArray(model?.shenqi) ? model.shenqi.length : null;
    const cfg = count !== null ? config?.getCfgById?.(count) : null;
    if (!model || !Array.isArray(cfg?.[2])) return { ready:false, reason:'waiting_cobao_fragment_config', count, rows:[] };
    const rows = cfg[2].map((rawId, index) => {
      const id = Number(rawId);
      return { id, index, owned:id > 0 && !!model.frgmtsDic?.get?.(id), placed:id > 0 && !!model.epFrgmtsDic?.get?.(id) };
    });
    const own = rows.find(row => row.id > 0 && row.owned && !row.placed) || null;
    return { ready:model.__gn === true, reason:model.__gn === true ? 'ready' : 'waiting_cobao_server_info', count, rows, own,
      signature:JSON.stringify([count, rows.map(row => [row.id,row.owned,row.placed])]) };
  }
  function coBaoSnapshot(action, detail = {}) {
    if (action === 'claimStage') {
      const stage = thienKiepModel();
      return JSON.stringify([Number(stage?.curLv), stage?.awardLvs]);
    }
    if (action === 'putFragment') return JSON.stringify(!!coBaoModel()?.epFrgmtsDic?.get?.(Number(detail.id)));
    if (action === 'syncInfo') return JSON.stringify([coBaoModel()?.__gn === true, coBaoFragments().signature]);
    return null;
  }
  function runCoBao(redId) {
    const task = S.coBao, id = Number(redId), now = Date.now();
    task.blocking = false;
    if (task.pending) {
      const pending = task.pending, after = coBaoSnapshot(pending.action, pending.detail);
      const acknowledged = pending.action === 'claimStage' ? after !== pending.before
        : pending.action === 'putFragment' ? after === 'true'
          : pending.action === 'syncInfo' ? JSON.parse(after)?.[0] === true && after !== pending.before : false;
      if (acknowledged) {
        task.pending = null; task.blocked = null; task.reason = 'server_acknowledged_' + pending.action;
        if (pending.action === 'claimStage') { task.claimed++; task.chainPlacement = true; task.chainStarted = now; task.lastInfoRefresh = 0; }
        if (pending.action === 'putFragment') { task.placed++; task.chainPlacement = false; }
        S.confirmed++; return;
      }
      if (now - pending.at > 30000) {
        task.blocked = { ...pending }; task.pending = null; task.reason = 'ack_timeout_no_retry'; return;
      }
      task.blocking = true; task.reason = 'waiting_' + pending.action + '_ack'; return;
    }
    if (!S.enabled || !owned() || !svipContext() || now < Number(W.__KVPV_USER_UI_UNTIL || 0) ||
        W.KVPV_CONFIRM_POPUPS?.beforeTask?.() === true) { task.reason = 'waiting_safe_context'; return; }
    if (String(W.KVPV_V864?.task?.()?.id || '') === 'm1094') { task.reason = 'legacy_cobao_quest_owner'; return; }
    if (![46,159].includes(id) || (!api.isActive(id) && !(id === 159 && task.chainPlacement))) { task.reason = 'red_dot_clear'; return; }

    let action = '', detail = {}, before = null, send = null;
    if (id === 46) {
      const reward = coBaoStageReward();
      if (!reward) { task.reason = 'no_claimable_thien_kiep_fragment_reward'; return; }
      const panel = coBaoThienKiepPanel();
      if (!panel.open) {
        if (typeof coBaoWindowMgr()?.openByActionId !== 'function') { task.reason = 'native_thien_kiep_navigation_unavailable'; return; }
        coBaoWindowMgr().openByActionId(46); task.reason = 'opening_thien_kiep_for_fragment'; return;
      }
      if (panel.ui?._uPn?.item?.rpImg?.visible !== true) { task.reason = 'waiting_thien_kiep_claim_red_dot'; return; }
      const rpc = thienKiepRpc();
      if (typeof rpc?.getCpAward !== 'function') { task.reason = 'native_getCpAward_unavailable'; return; }
      action = 'claimStage'; detail = { mapId:reward.mapId, level:reward.level }; before = coBaoSnapshot(action, detail);
      send = () => rpc.getCpAward(reward.mapId, reward.level);
    } else {
      const fragments = coBaoFragments(), rpc = coBaoRpc();
      if (!fragments.ready) {
        if (now - task.lastSend < 5000) { task.reason = 'waiting_cobao_info_refresh'; return; }
        if (typeof rpc?.getShQiInfo !== 'function') { task.reason = fragments.reason; return; }
        action = 'syncInfo'; detail = {}; before = coBaoSnapshot(action, detail); send = () => rpc.getShQiInfo();
      } else if (!fragments.own) {
        if (task.chainPlacement && now - task.chainStarted < 30000 && now - task.lastInfoRefresh >= 5000 && typeof rpc?.getShQiInfo === 'function') {
          task.lastInfoRefresh = now; task.lastSend = now; task.reason = 'refreshing_cobao_fragments_after_claim'; S.sent++;
          try { rpc.getShQiInfo(); } catch (error) { task.reason = 'cobao_info_refresh_error'; S.lastError = String(error); }
          return;
        }
        if (task.chainPlacement && now - task.chainStarted >= 30000) task.chainPlacement = false;
        task.reason = task.chainPlacement ? 'waiting_claimed_fragment_sync' : 'no_owned_unplaced_cobao_fragment'; return;
      }
      else if (typeof coBaoWindowMgr()?.openByActionId === 'function' &&
          coBaoWindowMgr()?.isOpened?.(Number(W._Sa?.getWindowCfgByFcId?.(189)?.[0])) !== true) {
        coBaoWindowMgr().openByActionId(189); task.reason = 'opening_cobao_tab'; return;
      } else if (typeof rpc?.epFragment !== 'function') { task.reason = 'native_epFragment_unavailable'; return; }
      else {
        action = 'putFragment'; detail = { id:fragments.own.id, index:fragments.own.index };
        before = coBaoSnapshot(action, detail); send = () => rpc.epFragment([fragments.own.id]);
      }
    }
    if (now - task.lastSend < 900) { task.reason = 'request_cooldown'; return; }
    if (task.blocked?.action === action && task.blocked.before === before) { task.reason = 'ack_timeout_no_retry'; return; }
    task.blocked = null; task.pending = { redId:id, action, detail, before, at:now };
    task.lastSend = now; task.blocking = true; task.reason = 'waiting_' + action + '_ack'; S.sent++;
    try {
      const result = send();
      if (result === false) throw Error('native_cobao_action_returned_false');
    } catch (error) {
      task.blocked = { ...task.pending }; task.pending = null; task.blocking = false;
      task.reason = 'send_error_no_retry'; S.lastError = String(error);
    }
  }
  const marryRelation = () => W._Ba?._Yo?._tdt?.instance;
  const marryRelationRpc = () => W._Ba?._Yo?.__Gt?.ins;
  const marryTaskModel = () => W._Ba?._Yo?.marryTask?._eOt?.ins;
  const marryTaskRpc = () => W._Ba?._Yo?.marryTask?._fOt?.ins;
  const marryRingModel = () => W._Ba?._Yo?.marryRing?._Wo?.ins;
  const marryRingRpc = () => W._Ba?._Yo?.marryRing?._gGt?.ins;
  const marryTokenModel = () => W._Ba?._Yo?.marryToken?._nKs?.ins;
  const marryTokenRpc = () => W._Ba?._Yo?.marryToken?._Oqs?.ins;
  const marryTokenConfig = () => W._ft?._Qqs?.ins;
  const marryCardModel = () => W._Ba?._Yo?.marryCard?._YGt?.ins;
  const marryCardRpc = () => W._Ba?._Yo?.marryCard?._QGt?.ins;
  const childModel = () => W._Ba?._Yo?.marryChild?._nZ?.ins;
  const childRpc = () => W._Ba?._Yo?.marryChild?._uf?.ins;
  const marrySafe = () => S.enabled && owned() && svipContext() &&
    Date.now() >= Number(W.__KVPV_USER_UI_UNTIL || 0) &&
    W.KVPV_CONFIRM_POPUPS?.beforeTask?.() !== true;
  function marryTaskRows(type) {
    const rows = marryTaskModel()?.getTask?.(Number(type));
    return Array.isArray(rows) ? rows.filter(row => Array.isArray(row) && Number.isSafeInteger(Number(row[0]))) : [];
  }
  function marrySnapshot(action, detail = {}) {
    const relation = marryRelation();
    const ring = marryRingModel();
    const bag = W._Ba?._Ic?._aQ?.ins;
    if (action === 'task') {
      const row = marryTaskRows(detail.type).find(item => Number(item[0]) === detail.id);
      return row ? JSON.stringify(row) : null;
    }
    if (action === 'intimacy' || action === 'intimacyReward') {
      return JSON.stringify([relation?.getIntimateLevel?.(), relation?.getIntimateExp?.(),
        relation?.getIntimacyRewardLevel?.(), bag?.getItemCountById?.(detail.itemId)]);
    }
    if (action === 'ring') {
      return JSON.stringify([ring?._level, ring?._exp, bag?.getItemCountById?.(detail.itemId)]);
    }
    if (action === 'ringSkill') {
      const row = (detail.kind === 'special' ? ring?.specialSkillList : ring?.skillList)?.get?.(detail.id);
      return row ? JSON.stringify(row) : null;
    }
    if (action === 'tokenRank') {
      const level = Number(marryTokenModel()?.getLvByItemId?.(detail.itemId) || 0);
      const counts = (detail.costs || []).map(([itemId]) => Number(bag?.getItemCountById?.(itemId) || 0));
      return JSON.stringify([level, counts]);
    }
    if (action === 'card') {
      const card = marryCardModel();
      return JSON.stringify([card?.marryRewardItemState, card?.marryRewardState]);
    }
    if (action === 'childLevel') return JSON.stringify(childModel()?.getOneChildLV?.(detail.id));
    if (action === 'childFeed') return JSON.stringify(childModel()?.getOneFeedCurInfo?.(detail.id));
    if (action === 'childSkill') {
      const skills = childModel()?.getInmortalSkillInfo?.();
      const row = Array.isArray(skills) ? skills.find(item => Math.floor(Number(item?.[1]) / 10000) === detail.id) : null;
      return row ? JSON.stringify(row) : null;
    }
    return null;
  }
  function ringMaterial() {
    const itemId = Number(W._ft?._gY?.ins?.getCfgById?.(81016)?.[2]?.[0]);
    const count = Number(W._Ba?._Ic?._aQ?.ins?.getItemCountById?.(itemId) || 0);
    return { itemId, count };
  }
  function ringSkillChoice() {
    const ring = marryRingModel();
    const repository = W._ft?._NWi?.ins || W._AWi?.ins;
    const actorLevel = Number(W._Ba?._rJ?._O$?.ins?.level || 0);
    if (!ring || !repository || typeof repository.getactiveSpecialNeedLV !== 'function' ||
        ring.checkRingSkillRP?.() !== true) return null;
    for (const [kind, list] of [['base', ring.skillList], ['special', ring.specialSkillList]]) {
      const keys = Array.isArray(list?.keys) ? list.keys : [];
      for (const key of keys) {
        const row = list.get?.(key);
        if (!Array.isArray(row)) continue;
        const level = Number(row[1] || 0);
        const config = repository.getactiveSpecialNeedLV(Number(key), level);
        if (!Array.isArray(config)) continue;
        if (Number(row[2]) !== 0) {
          const need = config[3]?.[0];
          const item = Number(need?.[0]), count = Number(need?.[1]);
          if (item > 0 && count > 0 && Number(W._Ba?._Ic?._aQ?.ins?.getItemCountById?.(item) || 0) >= count) {
            return { kind, id: Number(key), row: [...row], itemId: item, action: 'level' };
          }
        } else if (kind === 'special') {
          const need = config[4];
          if (!Array.isArray(need)) continue;
          const needType = Number(need[0]), value = Number(need[1]);
          const available = needType === 1
            ? actorLevel >= value
            : value > 0 && Number(W._Ba?._Ic?._aQ?.ins?.getItemCountById?.(value) || 0) > 0;
          if (available) return { kind, id: Number(key), row: [...row], itemId: needType === 1 ? 0 : value, action: 'open' };
        }
      }
    }
    return null;
  }
  function marryTokenRankChoice() {
    const model = marryTokenModel(), config = marryTokenConfig(), bag = W._Ba?._Ic?._aQ?.ins;
    if (!model || !config || typeof config.getAllItemId !== 'function' || typeof config.getCostListByIdAndLv !== 'function') return null;
    for (const rawId of config.getAllItemId() || []) {
      const itemId = Number(rawId), level = Number(model.getLvByItemId?.(itemId) || 0);
      const maxLevel = Number(config.getMaxLvById?.(itemId) || 0);
      if (itemId <= 0 || level <= 0 || maxLevel <= level) continue;
      const costs = config.getCostListByIdAndLv(itemId, level);
      if (!Array.isArray(costs) || !costs.length) continue;
      const ownedCosts = costs.map(row => [Number(row?.[0]), Number(row?.[1])]);
      if (ownedCosts.some(([costId, need]) => !Number.isSafeInteger(costId) || costId <= 0 ||
          costId === 90140001 || !Number.isSafeInteger(need) || need <= 0 ||
          Number(bag?.getItemCountById?.(costId) || 0) < need)) continue;
      return { itemId, level, costs: ownedCosts };
    }
    return null;
  }
  function runMarriage(redId) {
    const task = S.marriage;
    const id = Number(redId);
    const now = Date.now();
    task.blocking = false;
    if (task.pending) {
      const pending = task.pending;
      const after = marrySnapshot(pending.action, pending.detail);
      const confirmed = pending.action === 'task'
        ? !after || JSON.parse(after)?.[3] !== 1
        : pending.action === 'intimacy'
          ? after !== pending.before
          : pending.action === 'intimacyReward'
            ? Number(marryRelation()?.getIntimacyRewardLevel?.() || 0) > pending.rewardBefore
            : pending.action === 'ring'
              ? after !== pending.before
              : pending.action === 'ringSkill'
                ? after !== pending.before
                : pending.action === 'tokenRank'
                  ? Number(marryTokenModel()?.getLvByItemId?.(pending.detail.itemId) || 0) > pending.detail.level
                  : pending.action === 'card'
                  ? Number(marryCardModel()?.marryRewardItemState) === 2 || after !== pending.before
                  : false;
      if (confirmed) {
        task.pending = null;
        task.blocked = null;
        task.reason = 'server_acknowledged_' + pending.action;
        task.claimed += pending.action === 'task' || pending.action === 'intimacyReward' || pending.action === 'card' ? 1 : 0;
        task.upgraded += pending.action === 'intimacy' || pending.action === 'ring' || pending.action === 'ringSkill' || pending.action === 'tokenRank' ? 1 : 0;
        S.confirmed++;
        return;
      }
      if (now - pending.at > 30000) {
        task.blocked = { ...pending };
        task.pending = null;
        task.reason = 'ack_timeout_no_retry';
        return;
      }
      task.blocking = true;
      task.reason = 'waiting_' + pending.action + '_ack';
      return;
    }
    if (!marrySafe()) { task.reason = 'waiting_safe_context'; return; }
    if (![375, 376, 378, 379, 380, 382, 383, 384, 385].includes(id) || !api.isActive(id)) {
      task.reason = 'red_dot_clear';
      return;
    }

    let action = '', detail = {}, send = null, before = null;
    if (id === 375 || id === 376) {
      const type = id === 376 ? 1 : 2;
      const rows = marryTaskRows(type);
      const row = rows.find(item => Number(item[3]) === 1);
      const rpc = marryTaskRpc();
      if (!row || typeof rpc?.GetMarryTaskReward !== 'function') { task.reason = 'no_completed_marriage_task'; return; }
      action = 'task'; detail = { type, id: Number(row[0]) }; before = JSON.stringify(row);
      send = () => rpc.GetMarryTaskReward(detail.id);
    } else if (id === 379) {
      const relation = marryRelation(), rpc = marryRelationRpc();
      const itemId = Number(W._ft?._gY?.ins?.getCfgById?.(81015)?.[2]?.[0]);
      const count = Number(W._Ba?._Ic?._aQ?.ins?.getItemCountById?.(itemId) || 0);
      const fate = W._Ba?._Yo?.marryFate?._jUt?.ins;
      if (!relation?.isMarry?.() || fate?.checkLVUPRP?.() !== true || itemId <= 0 || count <= 0 || typeof rpc?.AddMarryIntimacyExp !== 'function') {
        task.reason = count <= 0 ? 'no_owned_intimacy_material' : 'no_intimacy_upgrade_ready'; return;
      }
      action = 'intimacy'; detail = { itemId }; before = marrySnapshot(action, detail);
      send = () => rpc.AddMarryIntimacyExp();
    } else if (id === 380) {
      const relation = marryRelation(), rpc = marryRelationRpc();
      const level = Number(relation?.getIntimateLevel?.() || 0);
      const rewardLevel = Number(relation?.getIntimacyRewardLevel?.() || 0);
      if (!relation?.isMarry?.() || rewardLevel >= level || level <= 0 || typeof rpc?.GetMarryIntimacyLevelReward !== 'function') {
        task.reason = 'no_intimacy_reward_ready'; return;
      }
      action = 'intimacyReward'; detail = { itemId: 0 }; before = marrySnapshot(action, detail); task.pending = null;
      task.rewardBefore = rewardLevel;
      send = () => rpc.GetMarryIntimacyLevelReward();
    } else if (id === 378) {
      const ring = marryRingModel(), rpc = marryRingRpc(), material = ringMaterial();
      if (!ring?.checkRingUPRP?.() || material.itemId <= 0 || material.count <= 0 || typeof rpc?.AddMarryRingExp !== 'function') {
        task.reason = 'no_owned_ring_material_or_upgrade'; return;
      }
      action = 'ring'; detail = material; before = marrySnapshot(action, detail);
      send = () => rpc.AddMarryRingExp();
    } else if (id === 382) {
      const choice = ringSkillChoice(), rpc = marryRingRpc();
      if (!choice || typeof rpc?.LevelUpMarryRingSkill !== 'function' ||
          choice.action === 'open' && typeof rpc?.OpenMarryRingSpecialSkill !== 'function') {
        task.reason = 'no_ring_skill_upgrade_with_owned_material'; return;
      }
      action = 'ringSkill'; detail = choice; before = JSON.stringify(choice.row);
      send = () => choice.action === 'open'
        ? rpc.OpenMarryRingSpecialSkill(choice.id)
        : rpc.LevelUpMarryRingSkill(choice.id);
    } else if (id === 384 || id === 385) {
      const choice = marryTokenRankChoice(), rpc = marryTokenRpc();
      if (!choice || typeof rpc?.promoteKeepsakeRank !== 'function') { task.reason = 'no_gift_rank_upgrade_with_owned_nonpremium_material'; return; }
      action = 'tokenRank'; detail = choice; before = marrySnapshot(action, detail);
      task.levelBefore = choice.level;
      send = () => rpc.promoteKeepsakeRank([choice.itemId]);
    } else if (id === 383) {
      const card = marryCardModel(), rpc = marryCardRpc();
      if (Number(card?.marryRewardItemState) !== 1 || Number(card?.marryRewardState) !== 1 ||
          typeof rpc?.GetMarryRewardCardReward !== 'function') { task.reason = 'no_active_claimable_gift_card'; return; }
      action = 'card'; detail = {}; before = marrySnapshot(action, detail);
      send = () => rpc.GetMarryRewardCardReward();
    }
    if (!action || now - task.lastSend < 800) { task.reason = 'request_cooldown'; return; }
    if (task.blocked && task.blocked.action === action && task.blocked.before === before) {
      task.reason = 'ack_timeout_no_retry'; return;
    }
    task.blocked = null;
    task.pending = { redId: id, action, detail, before, rewardBefore: task.rewardBefore, levelBefore: detail.level, at: now };
    task.lastSend = now;
    task.blocking = true;
    task.reason = 'waiting_' + action + '_ack';
    S.sent++;
    try {
      const result = send();
      if (result === false) throw Error('native_marriage_action_returned_false');
    } catch (error) {
      task.blocked = { ...task.pending };
      task.pending = null;
      task.blocking = false;
      task.reason = 'send_error_no_retry';
      S.lastError = String(error);
    }
  }
  function phucOaLevelChoice() {
    const model = childModel(), config = W._ft?._MOi?.ins;
    if (!model || !config || typeof model.checkOneChildXNUpRP !== 'function') return null;
    for (const rawId of config.getIds?.() || []) {
      const id = Number(rawId), level = Number(model.getOneChildLV?.(id) || 0);
      if (id > 0 && level > 0 && model.checkOneChildXNUpRP(id) === true) return { id, level };
    }
    return null;
  }
  function phucOaFeedChoice() {
    const model = childModel(), config = W._ft?._OOi?.ins;
    if (!model || !config || typeof model.checkOneFeedRP !== 'function') return null;
    for (const rawId of config.getAllIds?.() || []) {
      const id = Number(rawId), count = Number(W._Ba?._Ic?._aQ?.ins?.getItemCountById?.(id) || 0);
      if (id > 0 && count > 0 && model.checkOneFeedRP(id) === true) {
        return { id, count: count, feedTimes: Number(model.getOneFeedCurInfo?.(id) || 0) };
      }
    }
    return null;
  }
  function phucOaSkillChoice() {
    const model = childModel();
    if (!model || typeof model.getCurSkillInfo !== 'function' || typeof model.checkOneInmortalSkillRP !== 'function') return null;
    for (const row of model.getCurSkillInfo() || []) {
      const id = Number(row?.[0]), level = Number(row?.[1]);
      if (id > 0 && model.checkOneInmortalSkillRP(id, level) === true) return { id, level };
    }
    return null;
  }
  function runPhucOa(redId) {
    const task = S.phucOa, id = Number(redId), now = Date.now();
    task.blocking = false;
    if (task.pending) {
      const pending = task.pending, after = marrySnapshot(pending.action, pending.detail);
      if (after !== pending.before) {
        task.pending = null; task.blocked = null; task.reason = 'server_acknowledged_' + pending.action;
        task.upgraded++; S.confirmed++; return;
      }
      if (now - pending.at > 30000) {
        task.blocked = { ...pending }; task.pending = null; task.reason = 'ack_timeout_no_retry'; return;
      }
      task.blocking = true; task.reason = 'waiting_' + pending.action + '_ack'; return;
    }
    if (!marrySafe()) { task.reason = 'waiting_safe_context'; return; }
    if ((id !== 387 && id !== 388 && id !== 389) || !api.isActive(id)) { task.reason = 'red_dot_clear'; return; }
    const rpc = childRpc();
    let action, detail, send, before;
    if (id === 387) {
      const choice = phucOaLevelChoice();
      if (!choice || typeof rpc?.onFuwaBaseInfoUpReq !== 'function') { task.reason = 'no_owned_phuc_oa_nurture_material'; return; }
      action = 'childLevel'; detail = choice; before = marrySnapshot(action, detail);
      send = () => rpc.onFuwaBaseInfoUpReq(choice.id);
    } else if (id === 388) {
      const choice = phucOaFeedChoice();
      if (!choice || typeof rpc?.onFuwaFeedReq !== 'function') { task.reason = 'no_owned_phuc_oa_feed_material'; return; }
      action = 'childFeed'; detail = choice; before = marrySnapshot(action, detail);
      send = () => rpc.onFuwaFeedReq(choice.id);
    } else {
      const choice = phucOaSkillChoice();
      if (!choice || typeof rpc?.onFuwaInmortalSkillUpReq !== 'function') { task.reason = 'no_owned_phuc_oa_immortal_skill_material'; return; }
      action = 'childSkill'; detail = choice; before = marrySnapshot(action, detail);
      send = () => rpc.onFuwaInmortalSkillUpReq(choice.id);
    }
    if (now - task.lastSend < 800) { task.reason = 'request_cooldown'; return; }
    if (task.blocked && task.blocked.action === action && task.blocked.before === before) { task.reason = 'ack_timeout_no_retry'; return; }
    task.blocked = null; task.pending = { redId: id, action, detail, before, at: now };
    task.lastSend = now; task.blocking = true; task.reason = 'waiting_' + action + '_ack'; S.sent++;
    try {
      const result = send();
      if (result === false) throw Error('native_phuc_oa_action_returned_false');
    } catch (error) {
      task.blocked = { ...task.pending }; task.pending = null; task.blocking = false;
      task.reason = 'send_error_no_retry'; S.lastError = String(error);
    }
  }
  function runRed389() {
    if (S.phucOa.pending) return runPhucOa(389);
    if (S.loginAwards.pending?.redId === 389) return runLoginAwards(389);
    if (phucOaSkillChoice()) return runPhucOa(389);
    return runLoginAwards(389);
  }
  function onlineRewardState(){
    const m=W._Ba?._s6t?._e6t?.ins,rows=m?.updateRewardReply;
    if(!Array.isArray(rows)||typeof W._v?.ins?.send!=='function')return {ready:false,reason:'waiting_online_reward_data'};
    const data=rows.filter(x=>Array.isArray(x)&&Number.isSafeInteger(Number(x[0]))&&Number(x[0])>0).map(x=>[Number(x[0]),Number(x[1])]);
    const ready=data.find(x=>x[1]===1);
    return {ready:api.isActive(259)&&!!ready,reason:!api.isActive(259)?'red_dot_clear':ready?'ready':'no_claimable_online_reward',id:ready?.[0]??0,signature:JSON.stringify(data)};
  }
  function runOnlineReward(){
    const T=S.onlineReward,m=W._Ba?._s6t?._e6t?.ins;T.blocking=false;
    if(T.pending){
      const p=T.pending,current=Array.isArray(m?.updateRewardReply)?m.updateRewardReply.find(x=>Number(x?.[0])===p.id):null;
      if(!current||Number(current[1])!==1||api.isActive(259)===false){T.pending=null;T.blocked=null;T.reason='server_acknowledged_online_reward';S.confirmed++;return;}
      if(Date.now()-p.at>30000){T.blocked={before:p.before,id:p.id,at:p.at};T.pending=null;T.reason='ack_timeout_no_retry';return;}
      T.blocking=true;T.reason='waiting_online_reward_ack';return;
    }
    if(!S.enabled||!owned()||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)||W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true||!svipContext()){T.reason='waiting_safe_context';return;}
    const state=onlineRewardState();if(!state.ready){T.reason=state.reason;return;}
    if(T.blocked){if(T.blocked.id===state.id&&T.blocked.before===state.signature){T.reason='ack_timeout_no_retry';return;}T.blocked=null;}
    if(Date.now()-T.lastSend<800){T.blocking=true;T.reason='request_cooldown';return;}
    T.pending={id:state.id,before:state.signature,at:Date.now()};T.lastSend=T.pending.at;T.blocking=true;T.reason='waiting_online_reward_ack';S.sent++;
    try{W._v.ins.send('TBhT',[state.id]);}catch(e){T.blocked={before:state.signature,id:state.id,at:T.pending.at};T.pending=null;T.blocking=false;T.reason='send_error_no_retry';S.lastError=String(e);}
  }
  function dailyMonsterState(type){
    const m=W._Ba?._eri?._Mri?.ins,cfg=W._ft?._ori?.ins,rpc=W._Ba?._eri?._Sri?.ins;
    if(!m||!cfg||typeof rpc?.getXiangyaoReward!=='function'||![0,1].includes(Number(type)))return {ready:false,reason:'waiting_daily_monster_data'};
    const k=Number(type),born=Number(m.bornLv),received=Number(m.receivedTimes?.[k]),max=Number(m.maxReceivedTimes?.[k]);
    const kills=Number(m.killNumber?.[k]),grade=Number(m.grade?.[k]);
    if(![born,received,max,kills,grade].every(Number.isFinite))return {ready:false,reason:'waiting_daily_monster_state',type:k};
    const row=k===0?cfg.getLittleCfgByEraLv?.(born,grade)||cfg.getLittleCfgByEraLv?.(born,grade-1):cfg.getBsCfgByEra?.(born,grade)||cfg.getBsCfgByEra?.(born,grade-1);
    if(!Array.isArray(row))return {ready:false,reason:'waiting_daily_monster_config',type:k,born,grade};
    const need=Number(row[3]),remaining=received<max,eligible=Number.isFinite(need)&&need>=0&&kills>=need;
    const signature=JSON.stringify([k,born,grade,kills,received,max,need]);
    const ready=api.isActive(57)&&remaining&&eligible;
    return {ready,reason:!api.isActive(57)?'red_dot_clear':!remaining?'daily_claim_limit_reached':!eligible?'kill_requirement_not_met':'ready',type:k,born,grade,kills,received,max,need,signature};
  }
  function runDailyMonster(){
    const T=S.dailyMonster,m=W._Ba?._eri?._Mri?.ins,rpc=W._Ba?._eri?._Sri?.ins;T.blocking=false;
    if(T.pending){
      const p=T.pending,received=Number(m?.receivedTimes?.[p.type]);
      if(Number.isFinite(received)&&received>p.received){T.pending=null;T.blocked=null;T.reason='server_acknowledged_type_'+p.type;T.claimed++;S.confirmed++;return;}
      if(Date.now()-p.at>30000){T.blocked={type:p.type,before:p.before,at:p.at};T.pending=null;T.reason='ack_timeout_no_retry';return;}
      T.blocking=true;T.reason='waiting_daily_monster_ack_type_'+p.type;return;
    }
    if(!S.enabled||!owned()||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)||W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true||!svipContext()){T.reason='waiting_safe_context';return;}
    const states=[dailyMonsterState(0),dailyMonsterState(1)],state=states.find(x=>x.ready);
    if(!state){T.reason=api.isActive(57)?states.map(x=>x.reason).join('|'):'red_dot_clear';return;}
    if(T.blocked){if(T.blocked.type===state.type&&T.blocked.before===state.signature){T.reason='ack_timeout_no_retry';return;}T.blocked=null;}
    if(Date.now()-T.lastSend<800){T.blocking=true;T.reason='request_cooldown';return;}
    T.pending={type:state.type,received:state.received,before:state.signature,at:Date.now()};T.lastSend=T.pending.at;T.blocking=true;T.reason='waiting_daily_monster_ack_type_'+state.type;S.sent++;
    try{const result=rpc.getXiangyaoReward([state.type]);if(result===false)throw Error('native_getXiangyaoReward_returned_false');}
    catch(e){T.blocked={type:state.type,before:state.signature,at:T.pending.at};T.pending=null;T.blocking=false;T.reason='send_error_no_retry';S.lastError=String(e);}
  }
  function payTurntableRewardState(){
    const m=W._Ba?._oBt?._mBt?.ins,rpc=W._Ba?._oBt?._kBt?.ins,rows=m?.rewardList;
    if(!Array.isArray(rows)||typeof rpc?.getPayRewardReward!=='function')return {ready:false,reason:'waiting_pay_turntable_data',modelReady:!!m,rpcReady:typeof rpc?.getPayRewardReward==='function',rewardCount:Number(m?.rewardCount)||0};
    const data=rows.filter(Array.isArray).map(row=>[Number(row[0]),Number(row[1])]).filter(row=>Number.isFinite(row[0])&&row[0]>0);
    const ready=data.find(row=>row[1]===1);
    return {ready:api.isActive(306)&&!!ready,reason:!api.isActive(306)?'red_dot_clear':ready?'ready':'no_free_milestone_claim',id:ready?.[0]??0,signature:JSON.stringify(data),rewardCount:Number(m.rewardCount)||0,modelReady:true,rpcReady:true,rewards:data};
  }
  function runPayTurntableReward(){
    const T=S.payTurntableReward,rpc=W._Ba?._oBt?._kBt?.ins,m=W._Ba?._oBt?._mBt?.ins;T.blocking=false;
    if(T.pending){
      const p=T.pending,rows=Array.isArray(m?.rewardList)?m.rewardList:[],row=rows.find(x=>Number(x?.[0])===p.id);
      if(!row||Number(row[1])!==1||api.isActive(306)===false){T.pending=null;T.blocked=null;T.reason='server_acknowledged_free_milestone';S.confirmed++;return;}
      if(!p.probedAt&&Date.now()-p.at>=1800){p.probedAt=Date.now();try{rpc?.getPayRewardInfo?.();T.reason='refreshing_pay_turntable_state';}catch(e){T.reason='refresh_error';S.lastError=String(e);}}
      if(Date.now()-p.at>30000){T.blocked={id:p.id,before:p.before,at:p.at};T.pending=null;T.reason='ack_timeout_no_retry';return;}
      T.blocking=true;T.reason='waiting_free_milestone_ack';return;
    }
    if(!S.enabled||!owned()||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)||W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true||!svipContext()){T.reason='waiting_safe_context';return;}
    const state=payTurntableRewardState();if(!state.ready){
      T.reason=state.reason;
      if(api.isActive(306)&&S.enabled&&owned()&&Date.now()>=Number(W.__KVPV_USER_UI_UNTIL||0)&&W.KVPV_CONFIRM_POPUPS?.beforeTask?.()!==true&&svipContext()&&typeof rpc?.getPayRewardInfo==='function'&&Date.now()-T.lastRefresh>=15000){
        T.lastRefresh=Date.now();try{rpc.getPayRewardInfo();T.reason='refreshing_pay_turntable_state';}catch(e){T.reason='refresh_error';S.lastError=String(e);}
      }
      return;
    }
    if(T.blocked){if(T.blocked.id===state.id&&T.blocked.before===state.signature){T.reason='ack_timeout_no_retry';return;}T.blocked=null;}
    if(Date.now()-T.lastSend<800){T.blocking=true;T.reason='request_cooldown';return;}
    T.pending={id:state.id,before:state.signature,at:Date.now(),probedAt:0};T.lastSend=T.pending.at;T.blocking=true;T.reason='waiting_free_milestone_ack';S.sent++;
    try{const result=rpc.getPayRewardReward();if(result===false)throw Error('native_free_milestone_claim_returned_false');}
    catch(e){T.blocked={id:state.id,before:state.signature,at:T.pending.at};T.pending=null;T.blocking=false;T.reason='send_error_no_retry';S.lastError=String(e);}
  }
  function happyFrenzyState(){
    const m=W._Ba?._iRt?._aRt?.ins,rpc=W._Ba?._iRt?._uRt?.ins,tasks=m?.taskArr,milestones=m?.dcArr;
    if(!m||!Array.isArray(tasks)||!Array.isArray(milestones)||typeof rpc?.getKuanghaiTaskAward!=='function'||typeof rpc?.getKuanghaiAward!=='function')return {ready:false,reason:'waiting_happy_frenzy_data'};
    const task=tasks.find(row=>Array.isArray(row)&&Number(row[1])===1&&Number(row[0])>0);
    const milestone=milestones.find(row=>Array.isArray(row)&&Number(row[1])===1&&Number(row[0])>0);
    const kind=task?'task':milestone?'milestone':'';
    const row=task||milestone;
    const signature=JSON.stringify([Number(m.id),Number(m.value),tasks.map(x=>[Number(x?.[0]),Number(x?.[1]),Number(x?.[2])]),milestones.map(x=>[Number(x?.[0]),Number(x?.[1])])]);
    return {ready:api.isActive(346)&&!!row,reason:!api.isActive(346)?'red_dot_clear':task?'claim_task_for_points':milestone?'claim_point_milestone':'no_claimable_task_or_milestone',kind,id:Number(row?.[0])||0,signature,points:Number(m.value)||0,taskCount:tasks.length,milestoneCount:milestones.length};
  }
  function runHappyFrenzy(){
    const T=S.happyFrenzy,m=W._Ba?._iRt?._aRt?.ins,rpc=W._Ba?._iRt?._uRt?.ins;T.blocking=false;
    if(T.pending){
      const p=T.pending,list=p.kind==='task'?m?.taskArr:m?.dcArr,row=Array.isArray(list)?list.find(x=>Number(x?.[0])===p.id):null;
      if(!row||Number(row[1])!==1||api.isActive(346)===false){T.pending=null;T.blocked=null;T.reason='server_acknowledged_'+p.kind;S.confirmed++;return;}
      if(!p.probedAt&&Date.now()-p.at>=1800){p.probedAt=Date.now();try{rpc?.getKuanghaiInfo?.();T.reason='refreshing_happy_frenzy_state';}catch(e){T.reason='refresh_error';S.lastError=String(e);}}
      if(Date.now()-p.at>30000){T.blocked={kind:p.kind,id:p.id,before:p.before,at:p.at};T.pending=null;T.reason='ack_timeout_no_retry';return;}
      T.blocking=true;T.reason='waiting_'+p.kind+'_ack';return;
    }
    if(!S.enabled||!owned()||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)||W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true||!svipContext()){T.reason='waiting_safe_context';return;}
    const state=happyFrenzyState();if(!state.ready){T.reason=state.reason;return;}
    if(T.blocked){if(T.blocked.kind===state.kind&&T.blocked.id===state.id&&T.blocked.before===state.signature){T.reason='ack_timeout_no_retry';return;}T.blocked=null;}
    if(Date.now()-T.lastSend<800){T.blocking=true;T.reason='request_cooldown';return;}
    T.pending={kind:state.kind,id:state.id,before:state.signature,at:Date.now(),probedAt:0};T.lastSend=T.pending.at;T.blocking=true;T.reason='waiting_'+state.kind+'_ack';S.sent++;
    try{const result=state.kind==='task'?rpc.getKuanghaiTaskAward(state.id):rpc.getKuanghaiAward(state.id);if(result===false)throw Error('native_happy_frenzy_claim_returned_false');}
    catch(e){T.blocked={kind:state.kind,id:state.id,before:state.signature,at:T.pending.at};T.pending=null;T.blocking=false;T.reason='send_error_no_retry';S.lastError=String(e);}
  }
  function mailModel(){return W._Ba?._dYt?._rpn?.ins;}
  function mailRpc(){return W._Ba?._dYt?._pYt?.ins;}
  function mailRows(){const m=mailModel();return Array.isArray(m?.emlDataShow)?m.emlDataShow:[];}
  function mailSignature(){return JSON.stringify(mailRows().map(row=>[String(row?.[0]??''),Number(row?.[5]),(Array.isArray(row?.[6])?row[6]:[]).map(x=>[Number(x?.[0]),Number(x?.[1])])]));}
  function mailState(){
    const m=mailModel(),rpc=mailRpc(),rows=mailRows(),claim=rows.filter(row=>Array.isArray(row?.[6])&&row[6].length>0&&Number(row[5])!==2),deletable=rows.filter(row=>Number(row?.[5])===1&&(!Array.isArray(row?.[6])||row[6].length===0));
    return {available:!!m?.hasEml&&typeof rpc?.getAwardAll==='function'&&typeof rpc?.oneKeyDelete==='function',hasMail:m?.hasEml===true,loaded:Array.isArray(m?.emlDataShow),claimIds:claim.map(row=>String(row[0])),deleteIds:deletable.map(row=>String(row[0])),rowCount:rows.length,signature:mailSignature(),receiving:!!m?.getAttach,delPending:!!m?.delEmail,modelReady:!!m,rpcReady:typeof rpc?.getAwardAll==='function'&&typeof rpc?.oneKeyDelete==='function'};
  }
  function mailClaimGuard(){
    const rows=mailRows(),bag=W._Ba?._Ic?._aQ?.ins,tool=W._Ba?._Ic?.BeiBaoTool;
    if(!bag||typeof bag.getBagLeftNumById!=='function')return 'waiting_bag_data';
    let animalItems=0;const fusionTypes=new Set();
    for(const row of rows){if(!Array.isArray(row?.[6])||row[6].length===0||Number(row[5])===2)continue;for(const item of row[6]){
      const id=Number(item?.[0]),count=Number(item?.[1])||0,type=Number(W._et?.getTypeById?.(id));
      if(type===11)animalItems+=count;else if([5,8,14].includes(type))fusionTypes.add(type===5?1:type===8?2:3);
    }}
    if(animalItems>Number(bag.getBagLeftNumById(11)))return 'animal_bag_full';
    for(const type of fusionTypes)if(tool?.isShowFusionTip?.(type))return 'fusion_confirmation_required';
    return '';
  }
  function runMail(){
    const T=S.mail,m=mailModel(),rpc=mailRpc();T.blocking=false;
    if(T.pending){
      const p=T.pending,state=mailState();
      if(p.phase==='receive'){
        const outstanding=p.ids.filter(id=>{const row=mailRows().find(item=>String(item?.[0])===id);return row&&Number(row[5])!==2;});
        if(!m?.getAttach&&outstanding.length===0){T.claimed+=p.ids.length;if(state.deleteIds.length){T.pending={phase:'delete',at:Date.now(),before:state.signature,ids:state.deleteIds,sent:false};T.reason='receive_acknowledged_deleting';}else{T.pending=null;T.reason='receive_acknowledged_no_read_mail_to_delete';S.confirmed++;}return;}
      }else if(p.phase==='delete'){
        if(p.sent!==true){
          if(!p.ids?.length){T.pending=null;T.reason='no_read_mail_to_delete';return;}
          if(Date.now()-T.lastSend<800){T.blocking=true;T.reason='request_cooldown';return;}
          p.sent=true;p.at=Date.now();T.lastSend=p.at;T.blocking=true;T.reason='waiting_mail_delete_ack';S.sent++;
          try{const result=rpc.oneKeyDelete();if(result===false)throw Error('native_mail_quick_delete_returned_false');m.delEmail=true;}
          catch(e){T.blocked={phase:'delete',signature:p.before,at:p.at};T.pending=null;T.blocking=false;T.reason='mail_delete_send_error';S.lastError=String(e);}return;
        }
        if(!m?.delEmail){const remaining=mailRows().some(row=>p.ids.includes(String(row?.[0])));if(!remaining){T.deleted+=p.ids.length;T.pending=null;T.blocked=null;T.reason='delete_acknowledged';S.confirmed++;return;}}
      }
      if(Date.now()-p.at>30000){T.blocked={phase:p.phase,signature:p.before,at:p.at};T.pending=null;T.reason='ack_timeout_no_retry';return;}
      T.blocking=true;T.reason=p.phase==='receive'?'waiting_mail_receive_ack':'waiting_mail_delete_ack';return;
    }
    const state=mailState();if(!state.available){T.reason=!state.hasMail?'no_mail':'waiting_mail_data';return;}
    if(!S.enabled||!owned()||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)||W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true||!svipContext()){T.reason='waiting_safe_context';return;}
    if(!state.loaded||state.rowCount===0){if(Date.now()-T.lastRefresh>=30000&&typeof rpc?.c_reqEmailCount==='function'){T.lastRefresh=Date.now();try{rpc.c_reqEmailCount();T.reason='refreshing_mail_list';}catch(e){T.reason='mail_refresh_error';S.lastError=String(e);}}else T.reason='waiting_mail_list';return;}
    if(state.claimIds.length){
      const guard=mailClaimGuard();if(guard){T.reason=guard;return;}
      if(m.getAttach){T.reason='mail_receive_already_pending';T.blocking=true;return;}
      if(Date.now()-T.lastSend<800){T.reason='request_cooldown';return;}
      T.pending={phase:'receive',ids:state.claimIds,before:state.signature,at:Date.now()};T.lastSend=T.pending.at;T.blocking=true;T.reason='waiting_mail_receive_ack';S.sent++;
      try{const result=rpc.getAwardAll();if(result===false)throw Error('native_mail_quick_receive_returned_false');m.getAttach=true;}
      catch(e){T.blocked={phase:'receive',signature:state.signature,at:T.pending.at};T.pending=null;T.blocking=false;T.reason='mail_receive_send_error';S.lastError=String(e);}return;
    }
    if(state.deleteIds.length){
      if(T.blocked?.phase==='delete'&&T.blocked.signature===state.signature){T.reason='ack_timeout_no_retry';return;}T.blocked=null;
      if(m.delEmail){T.reason='mail_delete_already_pending';T.blocking=true;return;}
      if(Date.now()-T.lastSend<800){T.reason='request_cooldown';return;}
      T.pending={phase:'delete',ids:state.deleteIds,before:state.signature,at:Date.now(),sent:true};T.lastSend=T.pending.at;T.blocking=true;T.reason='waiting_mail_delete_ack';S.sent++;
      try{const result=rpc.oneKeyDelete();if(result===false)throw Error('native_mail_quick_delete_returned_false');m.delEmail=true;}
      catch(e){T.blocked={phase:'delete',signature:state.signature,at:T.pending.at};T.pending=null;T.blocking=false;T.reason='mail_delete_send_error';S.lastError=String(e);}return;
    }
    T.reason='no_claimable_or_read_mail';
  }
  function tienTheState() {
    const model=W._Ba?._wAt?._bAt?.inst,rpc=W._Ba?._wAt?._XEn?.inst;
    const names=model?._KIn,data=model?._ref?.[0];
    if(!Array.isArray(names)||!Array.isArray(data)||typeof rpc?.rfSoul!=='function')return {ready:false,reason:'waiting_model'};
    const copper=Number(W._Ba?._rJ?._O$?.ins?.copper);
    if(!Number.isFinite(copper)||copper<0)return {ready:false,reason:'waiting_gold_data'};
    const rows=[];
    for(let i=0;i<names.length;i++)try{
      if(model.ckOpById(i,false)!==true||model.ckIsFitCd(i)!==true||model.ckCanTrByLv(i)!==true)continue;
      const cost=Number(model._n$n?.[i]);
      if(!Number.isFinite(cost)||cost<=0||cost>copper)continue;
      const rank=Number(model.getInfoById?.(i)),level=Number(model.getNwLvById?.(i));
      if(!Number.isFinite(rank)||!Number.isFinite(level)||model.ckCanTrById(i)!==true)continue;
      rows.push({index:i,name:String(names[i]),rank,level,cost});
    }catch(_){}
    rows.sort((a,b)=>a.rank-b.rank||a.level-b.level||a.cost-b.cost||a.index-b.index);
    const signature=JSON.stringify(data.map(row=>[row?.[0],row?.[1]]));
    return {ready:rows.length>0,reason:rows.length?'ready':copper===0?'waiting_gold':'no_eligible_line',choice:rows[0]??null,copper,signature};
  }
  function runTienThe() {
    const T=S.tienThe;T.blocking=false;
    if(!S.enabled||!api.isActive(20)){T.reason='red_dot_clear';T.pending=null;T.blocked=null;return;}
    if(!owned()||!svipContext()||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)||W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true){T.reason='waiting_safe_context';return;}
    if(T.pending){
      const p=tienTheState();
      if(p.signature&&p.signature!==T.pending.before){T.pending=null;T.blocked=null;S.confirmed++;T.reason='server_acknowledged';return;}
      if(Date.now()-T.pending.at>25000){T.blocked={before:T.pending.before,at:T.pending.at};T.pending=null;T.reason='ack_timeout_no_retry';}
      else {T.blocking=true;T.reason='waiting_server_ack';}
      return;
    }
    const p=tienTheState();
    if(T.blocked){
      if(!p.signature||p.signature===T.blocked.before){T.reason='ack_timeout_no_retry';return;}
      T.blocked=null;
    }
    if(!p.ready){T.reason=p.reason;return;}
    if(Date.now()-T.lastSend<1500){T.blocking=true;T.reason='request_cooldown';return;}
    T.pending={before:p.signature,at:Date.now(),choice:p.choice};T.lastSend=T.pending.at;T.blocking=true;T.reason='waiting_server_ack';S.sent++;
    try{W._Ba._wAt._XEn.inst.rfSoul(p.choice.index);}
    catch(e){T.blocked={before:p.signature,at:T.pending.at};T.pending=null;T.blocking=false;T.reason='send_error_no_retry';S.lastError=String(e);}
  }
  function tienDanState() {
    const model=W._Ba?.n_xD?._pVt?.ins,cfg=W._ft?._fZ?.ins,rpc=W._Ba?.n_xD?._KDt?.ins;
    if(!Array.isArray(cfg?.sIds)||typeof cfg?.getIdsBySId!=='function'||
       typeof model?.getUseCountBySId!=='function'||typeof model?.getItemCountById!=='function'||
       typeof model?.getUseCountById!=='function'||typeof model?.getLmt!=='function'||
       typeof model?.getLmtByVipLv!=='function'||typeof rpc?.oneKUseXD!=='function')return {ready:false,reason:'waiting_model'};
    const dailyLimit=Number(model.getLmtByVipLv());
    const groups=cfg.sIds.map(sid=>{
      const ids=cfg.getIdsBySId(sid)||[];
      const used=Number(model.getUseCountBySId(sid))||0;
      const rows=ids.map(id=>({id:Number(id),owned:Number(model.getItemCountById(id))||0,
        used:Number(model.getUseCountById(id))||0,limit:Number(model.getLmt(id))||0}));
      return {sid:Number(sid),used,dailyLimit,rows};
    });
    const signature=JSON.stringify(groups);
    let choice=null;
    for(const group of groups){
      if(!Number.isSafeInteger(group.sid)||group.used>=dailyLimit)continue;
      const totalLimit=group.rows.reduce((sum,row)=>sum+row.limit,0);
      const totalUsed=group.rows.reduce((sum,row)=>sum+row.used,0);
      if(totalLimit>0&&totalUsed/totalLimit>=1)continue;
      const available=group.rows.filter(row=>row.owned>0&&row.used<row.limit);
      if(available.length){choice={sid:group.sid,available:available.map(row=>row.id),dailyUsed:group.used,dailyLimit};break;}
    }
    return {ready:!!choice,reason:choice?'ready':'no_usable_pill',choice,signature,groups};
  }
  function runTienDan() {
    const T=S.tienDan;T.blocking=false;
    if(!S.enabled||!api.isActive(167)){T.reason='red_dot_clear';T.pending=null;T.blocked=null;return;}
    if(!owned()||!svipContext()||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)||W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true){T.reason='waiting_safe_context';return;}
    if(T.pending){
      const p=tienDanState();
      if(p.signature&&p.signature!==T.pending.before){T.pending=null;T.blocked=null;S.confirmed++;T.reason='server_acknowledged';return;}
      if(Date.now()-T.pending.at>25000){T.blocked={before:T.pending.before,at:T.pending.at};T.pending=null;T.reason='ack_timeout_no_retry';}
      else {T.blocking=true;T.reason='waiting_server_ack';}
      return;
    }
    const p=tienDanState();
    if(T.blocked){if(!p.signature||p.signature===T.blocked.before){T.reason='ack_timeout_no_retry';return;}T.blocked=null;}
    if(!p.ready){T.reason=p.reason;return;}
    if(Date.now()-T.lastSend<1500){T.blocking=true;T.reason='request_cooldown';return;}
    T.pending={before:p.signature,at:Date.now(),choice:p.choice};T.lastSend=T.pending.at;T.blocking=true;T.reason='waiting_server_ack';S.sent++;
    try{W._Ba.n_xD._KDt.ins.oneKUseXD(p.choice.sid);}
    catch(e){T.blocked={before:p.signature,at:T.pending.at};T.pending=null;T.blocking=false;T.reason='send_error_no_retry';S.lastError=String(e);}
  }
  function weaponSoulState() {
    const model=W._Ba?._M4?._HJ?.inst,cfg=W._ft?._r$?.ins,rpc=W._Ba?._M4?._j6t?.inst;
    const bag=W._Ba?._Ic?._aQ?.ins,actorLevel=Number(W._Ba?._rJ?._O$?.ins?.level);
    if(typeof model?.getFhunLstByType!=='function'||typeof cfg?.getFuhunCfgByTypeAndLev!=='function'||
       typeof bag?.getItemCountById!=='function'||typeof rpc?.refLv!=='function'||!Number.isFinite(actorLevel))
      return {ready:false,reason:'waiting_model'};
    const rows=[];
    for(let type=0;type<4;type++){
      const current=model.getFhunLstByType(type),level=Number(current?.[1]??0);
      if(!Number.isSafeInteger(level)||level<0)continue;
      const row=cfg.getFuhunCfgByTypeAndLev(type,level),next=cfg.getFuhunCfgByTypeAndLev(type,level+1);
      const item=Number(row?.[2]?.[0]),need=Number(row?.[2]?.[1]),have=Number(bag.getItemCountById(item)),requiredLevel=Number(row?.[3]);
      if(!row||!next||!Number.isSafeInteger(item)||item<=0||!Number.isSafeInteger(need)||need<=0||
         !Number.isFinite(have)||have<need||!Number.isFinite(requiredLevel)||requiredLevel>actorLevel)continue;
      rows.push({type,level,item,need,have,requiredLevel});
    }
    const signature=JSON.stringify([actorLevel,Array.from({length:4},(_,type)=>{
      const current=model.getFhunLstByType(type),level=Number(current?.[1]??0);
      const row=Number.isSafeInteger(level)&&level>=0?cfg.getFuhunCfgByTypeAndLev(type,level):null;
      const item=Number(row?.[2]?.[0]);
      return [type,level,item,Number.isSafeInteger(item)&&item>0?Number(bag.getItemCountById(item)):null];
    })]);
    return {ready:rows.length>0,reason:rows.length?'ready':'no_eligible_soul_line',choice:rows[0]??null,signature};
  }
  function runWeaponSoul() {
    const T=S.weaponSoul;T.blocking=false;
    if(!S.enabled||!api.isActive(27)){T.reason='red_dot_clear';T.pending=null;T.blocked=null;return;}
    if(!owned()||!svipContext()||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)||W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true){T.reason='waiting_safe_context';return;}
    if(T.pending){
      const p=weaponSoulState();
      if(p.signature&&p.signature!==T.pending.before){T.pending=null;T.blocked=null;S.confirmed++;T.reason='server_acknowledged';return;}
      if(Date.now()-T.pending.at>25000){T.blocked={before:T.pending.before,at:T.pending.at};T.pending=null;T.reason='ack_timeout_no_retry';}
      else{T.blocking=true;T.reason='waiting_server_ack';}
      return;
    }
    const p=weaponSoulState();
    if(T.blocked){if(!p.signature||p.signature===T.blocked.before){T.reason='ack_timeout_no_retry';return;}T.blocked=null;}
    if(!p.ready){T.reason=p.reason;return;}
    if(Date.now()-T.lastSend<1500){T.blocking=true;T.reason='request_cooldown';return;}
    T.pending={before:p.signature,at:Date.now(),choice:p.choice};T.lastSend=T.pending.at;T.blocking=true;T.reason='waiting_server_ack';S.sent++;
    try{W._Ba._M4._j6t.inst.refLv([p.choice.type,0]);}
    catch(e){T.blocked={before:p.signature,at:T.pending.at};T.pending=null;T.blocking=false;T.reason='send_error_no_retry';S.lastError=String(e);}
  }
  function cloakSoulState() {
    const model=W._Ba?._JJ?._QJ?.inst,cfg=W._ft?._o$?.ins,rpc=W._Ba?._JJ?._Oun?.inst;
    const bag=W._Ba?._Ic?._aQ?.ins,actorLevel=Number(W._Ba?._rJ?._O$?.ins?.level);
    if(typeof model?.getFhunLstByType!=='function'||typeof cfg?.getFuhunCfgByTypeAndLev!=='function'||
       typeof bag?.getItemCountById!=='function'||typeof rpc?.refLv!=='function'||!Number.isFinite(actorLevel))
      return {ready:false,reason:'waiting_model'};
    const rows=[];
    for(let type=0;type<4;type++){
      const current=model.getFhunLstByType(type),level=Number(current?.[1]??0);
      if(!Number.isSafeInteger(level)||level<0)continue;
      const row=cfg.getFuhunCfgByTypeAndLev(type,level),next=cfg.getFuhunCfgByTypeAndLev(type,level+1);
      const item=Number(row?.[2]?.[0]),need=Number(row?.[2]?.[1]),have=Number(bag.getItemCountById(item)),requiredLevel=Number(row?.[3]);
      if(!row||!next||!Number.isSafeInteger(item)||item<=0||!Number.isSafeInteger(need)||need<=0||
         !Number.isFinite(have)||have<need||!Number.isFinite(requiredLevel)||requiredLevel>actorLevel)continue;
      rows.push({type,level,item,need,have,requiredLevel});
    }
    const signature=JSON.stringify([actorLevel,Array.from({length:4},(_,type)=>{
      const current=model.getFhunLstByType(type),level=Number(current?.[1]??0);
      const row=Number.isSafeInteger(level)&&level>=0?cfg.getFuhunCfgByTypeAndLev(type,level):null;
      const item=Number(row?.[2]?.[0]);
      return [type,level,item,Number.isSafeInteger(item)&&item>0?Number(bag.getItemCountById(item)):null];
    })]);
    return {ready:rows.length>0,reason:rows.length?'ready':'no_eligible_soul_line',choice:rows[0]??null,signature};
  }
  function runCloakSoul() {
    const T=S.cloakSoul;T.blocking=false;
    if(!S.enabled||!api.isActive(646)){T.reason='red_dot_clear';T.pending=null;T.blocked=null;return;}
    if(!owned()||!svipContext()||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)||W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true){T.reason='waiting_safe_context';return;}
    if(T.pending){
      const p=cloakSoulState();
      if(p.signature&&p.signature!==T.pending.before){T.pending=null;T.blocked=null;S.confirmed++;T.reason='server_acknowledged';return;}
      if(Date.now()-T.pending.at>25000){T.blocked={before:T.pending.before,at:T.pending.at};T.pending=null;T.reason='ack_timeout_no_retry';}
      else{T.blocking=true;T.reason='waiting_server_ack';}
      return;
    }
    const p=cloakSoulState();
    if(T.blocked){if(!p.signature||p.signature===T.blocked.before){T.reason='ack_timeout_no_retry';return;}T.blocked=null;}
    if(!p.ready){T.reason=p.reason;return;}
    if(Date.now()-T.lastSend<1500){T.blocking=true;T.reason='request_cooldown';return;}
    T.pending={before:p.signature,at:Date.now(),choice:p.choice};T.lastSend=T.pending.at;T.blocking=true;T.reason='waiting_server_ack';S.sent++;
    try{W._Ba._JJ._Oun.inst.refLv([p.choice.type,0]);}
    catch(e){T.blocked={before:p.signature,at:T.pending.at};T.pending=null;T.blocking=false;T.reason='send_error_no_retry';S.lastError=String(e);}
  }
  function wingSoulState() {
    const model=W._Ba?._RJ?._DJ?.ins,cfg=W._ft?._PZ?.ins,rpc=W._Ba?._RJ?._R6t?.ins;
    const bag=W._Ba?._Ic?._aQ?.ins,actorLevel=Number(W._Ba?._rJ?._O$?.ins?.level);
    if(typeof model?.getFuhunLsByType!=='function'||typeof cfg?.getFuhunCfgByTypeAndLev!=='function'||
       typeof bag?.getItemCountById!=='function'||typeof rpc?.refineLev!=='function'||!Number.isFinite(actorLevel))
      return {ready:false,reason:'waiting_model'};
    const rows=[];
    for(let type=0;type<4;type++){
      const current=model.getFuhunLsByType(type),level=Number(current?.[1]??0);
      if(!Number.isSafeInteger(level)||level<0)continue;
      const row=cfg.getFuhunCfgByTypeAndLev(type,level),next=cfg.getFuhunCfgByTypeAndLev(type,level+1);
      const item=Number(row?.[2]?.[0]),need=Number(row?.[2]?.[1]),have=Number(bag.getItemCountById(item)),requiredLevel=Number(row?.[3]);
      if(!row||!next||!Number.isSafeInteger(item)||item<=0||!Number.isSafeInteger(need)||need<=0||
         !Number.isFinite(have)||have<need||!Number.isFinite(requiredLevel)||requiredLevel>actorLevel)continue;
      rows.push({type,level,item,need,have,requiredLevel});
    }
    const signature=JSON.stringify([actorLevel,Array.from({length:4},(_,type)=>{
      const current=model.getFuhunLsByType(type),level=Number(current?.[1]??0);
      const row=Number.isSafeInteger(level)&&level>=0?cfg.getFuhunCfgByTypeAndLev(type,level):null;
      const item=Number(row?.[2]?.[0]);
      return [type,level,item,Number.isSafeInteger(item)&&item>0?Number(bag.getItemCountById(item)):null];
    })]);
    return {ready:rows.length>0,reason:rows.length?'ready':'no_eligible_soul_line',choice:rows[0]??null,signature};
  }
  function runWingSoul() {
    const T=S.wingSoul;T.blocking=false;
    if(!S.enabled||!api.isActive(33)){T.reason='red_dot_clear';T.pending=null;T.blocked=null;return;}
    if(!owned()||!svipContext()||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)||W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true){T.reason='waiting_safe_context';return;}
    if(T.pending){
      const p=wingSoulState();
      if(p.signature&&p.signature!==T.pending.before){T.pending=null;T.blocked=null;S.confirmed++;T.reason='server_acknowledged';return;}
      if(Date.now()-T.pending.at>25000){T.blocked={before:T.pending.before,at:T.pending.at};T.pending=null;T.reason='ack_timeout_no_retry';}
      else{T.blocking=true;T.reason='waiting_server_ack';}
      return;
    }
    const p=wingSoulState();
    if(T.blocked){if(!p.signature||p.signature===T.blocked.before){T.reason='ack_timeout_no_retry';return;}T.blocked=null;}
    if(!p.ready){T.reason=p.reason;return;}
    if(Date.now()-T.lastSend<1500){T.blocking=true;T.reason='request_cooldown';return;}
    T.pending={before:p.signature,at:Date.now(),choice:p.choice};T.lastSend=T.pending.at;T.blocking=true;T.reason='waiting_server_ack';S.sent++;
    try{W._Ba._RJ._R6t.ins.refineLev([p.choice.type,0]);}
    catch(e){T.blocked={before:p.signature,at:T.pending.at};T.pending=null;T.blocking=false;T.reason='send_error_no_retry';S.lastError=String(e);}
  }
  function appearanceSoulSpec(kind) {
    if(kind==='fashion')return {
      state:S.fashionSoul,redId:148,model:W._Ba?._KJ?._qJ?.inst,rows:W._Ba?._KJ?._qJ?.inst?.fashInfo?.[7],
      cfg:W._ft?._Hqt?.ins,rpc:W._Ba?._KJ?._Ejt?.inst,method:'addFashRefine'
    };
    return {
      state:S.armSoul,redId:155,model:W._Ba?._UJ?._XJ?.ins,rows:W._Ba?._UJ?._XJ?.ins?.handInfo?.[7],
      cfg:W._ft?._IKt?.ins,rpc:W._Ba?._UJ?._Ujt?.ins,method:'addHandRefine'
    };
  }
  function appearanceSoulState(kind) {
    const d=appearanceSoulSpec(kind),bag=W._Ba?._Ic?._aQ?.ins,actorLevel=Number(W._Ba?._rJ?._O$?.ins?.level);
    if(!Array.isArray(d.rows)||typeof d.cfg?.getCfgByTypeAndLv!=='function'||
       typeof bag?.getItemCountById!=='function'||typeof d.rpc?.[d.method]!=='function'||!Number.isFinite(actorLevel))
      return {ready:false,reason:'waiting_model'};
    const rows=[];
    for(let type=0;type<4;type++){
      const current=d.rows.find(row=>Number(row?.[0])===type),level=Number(current?.[1]??0);
      if(!Number.isSafeInteger(level)||level<0)continue;
      const row=d.cfg.getCfgByTypeAndLv(type,level),next=d.cfg.getCfgByTypeAndLv(type,level+1);
      const item=Number(row?.[2]?.[0]),need=Number(row?.[2]?.[1]),have=Number(bag.getItemCountById(item)),requiredLevel=Number(row?.[3]);
      if(!row||!next||!Number.isSafeInteger(item)||item<=0||!Number.isSafeInteger(need)||need<=0||
         !Number.isFinite(have)||have<need||!Number.isFinite(requiredLevel)||requiredLevel>actorLevel)continue;
      rows.push({type,level,item,need,have,requiredLevel});
    }
    const signature=JSON.stringify([actorLevel,Array.from({length:4},(_,type)=>{
      const current=d.rows.find(row=>Number(row?.[0])===type),level=Number(current?.[1]??0);
      const row=Number.isSafeInteger(level)&&level>=0?d.cfg.getCfgByTypeAndLv(type,level):null;
      const item=Number(row?.[2]?.[0]);
      return [type,level,item,Number.isSafeInteger(item)&&item>0?Number(bag.getItemCountById(item)):null];
    })]);
    return {ready:rows.length>0,reason:rows.length?'ready':'no_eligible_soul_line',choice:rows[0]??null,signature};
  }
  function runAppearanceSoul(kind,allowFallback=true) {
    const d=appearanceSoulSpec(kind),T=d.state;T.blocking=false;
    if(!S.enabled||!api.isActive(d.redId)){T.reason='red_dot_clear';T.pending=null;T.blocked=null;return;}
    if(!owned()||!svipContext()||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)||W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true){T.reason='waiting_safe_context';return;}
    if(T.pending){
      const p=appearanceSoulState(kind);
      if(p.signature&&p.signature!==T.pending.before){T.pending=null;T.blocked=null;S.confirmed++;T.reason='server_acknowledged';return;}
      if(Date.now()-T.pending.at>25000){T.blocked={before:T.pending.before,at:T.pending.at};T.pending=null;T.reason='ack_timeout_no_retry';}
      else{T.blocking=true;T.reason='waiting_server_ack';}
      return;
    }
    const p=appearanceSoulState(kind);
    if(T.blocked){if(!p.signature||p.signature===T.blocked.before){T.reason='ack_timeout_no_retry';return;}T.blocked=null;}
    if(!p.ready){
      const other=kind==='fashion'?'arm':'fashion',otherRedId=other==='fashion'?148:155;
      if(allowFallback&&api.isActive(otherRedId)&&appearanceSoulState(other).ready)return runAppearanceSoul(other,false);
      T.reason=p.reason;return;
    }
    if(Date.now()-T.lastSend<1500){T.blocking=true;T.reason='request_cooldown';return;}
    T.pending={before:p.signature,at:Date.now(),choice:p.choice};T.lastSend=T.pending.at;T.blocking=true;T.reason='waiting_server_ack';S.sent++;
    try{d.rpc[d.method]([p.choice.type,0]);}
    catch(e){T.blocked={before:p.signature,at:T.pending.at};T.pending=null;T.blocking=false;T.reason='send_error_no_retry';S.lastError=String(e);}
  }
  function runeResolveState() {
    const model=W._Ba?._QV?._Bri?.ins,rpc=W._Ba?._QV?._Wri?.ins;
    const bag=W._Ba?._Ic?._aQ?.ins,items=bag?.getItemsByBagType?.(5);
    const cfg=W._ft?._CY?.ins;
    if(!Array.isArray(items)||!Array.isArray(model?.rflags)||
       typeof rpc?.resolveRune!=='function'||typeof W._et?.getQltyById!=='function'||
       typeof W._et?.getStnTypeById!=='function'||!Number.isFinite(Number(cfg?.resolveRuneSubTypeId)))
      return {ready:false,reason:'waiting_model'};
    const selected=new Set(model.rflags.map(Number));
    const rows=[];
    for(const row of items){
      if(!Array.isArray(row)||!Number.isSafeInteger(Number(row[0]))||!Number.isSafeInteger(Number(row[2])))continue;
      const id=Number(row[0]),uid=Number(row[2]),count=Number(row[1])||0;
      if(uid<=0||count<=0)continue;
      const subtype=W._et.getStnTypeById(id),quality=Number(W._et.getQltyById(id));
      const eligible=subtype===cfg.resolveRuneSubTypeId||selected.has(quality-1);
      if(!eligible)continue;
      // The native UI asks for confirmation before resolving these protected runes.
      if(subtype>=90||model.getIsSGodById?.(id,2)===true||model.getIsSGodById?.(id,1)===true)continue;
      rows.push([uid,count,id]);
    }
    const signature=JSON.stringify(items.map(row=>Array.isArray(row)?[row[0],row[1],row[2],row[3]]:row));
    return {ready:rows.length>0,reason:rows.length?'ready':'no_safe_runes',rows,signature};
  }
  function runRuneResolve() {
    const T=S.runeResolve;T.blocking=false;
    if(!S.enabled||!api.isActive(63)){T.reason='red_dot_clear';T.pending=null;T.blocked=null;return;}
    if(!owned()||!svipContext()||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)||W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true){T.reason='waiting_safe_context';return;}
    if(T.pending){
      const p=runeResolveState();
      if(p.signature&&p.signature!==T.pending.before){T.pending=null;T.blocked=null;S.confirmed++;T.reason='server_acknowledged';return;}
      if(Date.now()-T.pending.at>25000){T.blocked={before:T.pending.before,at:T.pending.at};T.pending=null;T.reason='ack_timeout_no_retry';}
      else{T.blocking=true;T.reason='waiting_server_ack';}
      return;
    }
    const p=runeResolveState();
    if(T.blocked){if(!p.signature||p.signature===T.blocked.before){T.reason='ack_timeout_no_retry';return;}T.blocked=null;}
    if(!p.ready){T.reason=p.reason;return;}
    if(Date.now()-T.lastSend<1500){T.blocking=true;T.reason='request_cooldown';return;}
    const request=p.rows.map(([uid,count])=>[uid,count]);
    T.pending={before:p.signature,at:Date.now(),items:p.rows.map(row=>row[2])};T.lastSend=T.pending.at;T.blocking=true;T.reason='waiting_server_ack';S.sent++;
    try{W._Ba._QV._Wri.ins.resolveRune(request);}
    catch(e){T.blocked={before:p.signature,at:T.pending.at};T.pending=null;T.blocking=false;T.reason='send_error_no_retry';S.lastError=String(e);}
  }
  function transformState(kind, redId) {
    const model=W._Ba?._s3?._ZJ?.ins,feed=model?.feed,cfg=W._ft?._Tyt?.ins,
      magic=W._ft?._YZ?.ins,rpc=W._Ba?._s3?._Kyt?.ins,bag=W._Ba?._Ic?._aQ?.ins;
    if(kind==='thunder'){
      const thunder=W._Ba?._s3?._ZJ?.ins,thunderRpc=W._Ba?._s3?._Kyt?.ins,
        equipCfg=W._ft?._t$?.ins,levelCfg=W._ft?._JZ?.ins;
      if(typeof thunder?.getEquipPosTypeLv!=='function'||typeof thunder?.equipCanUp!=='function'||
        !Array.isArray(equipCfg?.equipIds)||typeof levelCfg?.getCfgInfo!=='function'||
        typeof thunderRpc?.ThunderEquipUpgrade!=='function'||typeof bag?.getItemCountById!=='function')
        return {ready:false,reason:'waiting_thunder_model'};
      const signatureRows=[],candidates=[];
      for(const rawId of equipCfg.equipIds){
        const id=Number(rawId);if(!Number.isSafeInteger(id)||id<=0)continue;
        for(let pos=1;pos<=5;pos++){
          const level=Number(thunder.getEquipPosTypeLv(id,pos)),row=levelCfg.getCfgInfo(id,pos,level),cost=row?.[4],
            item=Number(cost?.[0]),need=Number(cost?.[1]),have=Number.isSafeInteger(item)&&item>0?Number(bag.getItemCountById(item)):null;
          signatureRows.push([id,pos,level,item,have]);
          if(Number.isSafeInteger(level)&&level>=0&&row&&levelCfg.getCfgInfo(id,pos,level+1)&&
            Number.isSafeInteger(item)&&item>0&&Number.isSafeInteger(need)&&need>0&&Number.isFinite(have)&&have>=need&&
            thunder.equipCanUp(id,pos)===pos)candidates.push({id,pos,level,item,need,have});
        }
      }
      const choice=candidates[0]??null;
      return {ready:api.isActive(238)&&!!choice,reason:'no_eligible_thunder_level',signature:JSON.stringify(signatureRows),choice};
    }
    if(!Array.isArray(feed)||typeof rpc?.onTransformingUpgradeReq!=='function'||
      typeof bag?.getItemCountById!=='function')return {ready:false,reason:'waiting_model'};
    if(kind==='level'){
      const level=Number(feed[0]),row=cfg?.getFeedCfgByLv?.(level),next=cfg?.getFeedCfgByLv?.(level+1),cost=row?.[2];
      const item=Number(cost?.[0]),need=Number(cost?.[1]),have=Number(bag.getItemCountById(item));
      const signature=JSON.stringify([level,Number(feed[1]),item,have]);
      return {ready:api.isActive(234)&&Number.isSafeInteger(level)&&level>=0&&!!row&&!!next&&
        Number.isSafeInteger(item)&&item>0&&Number.isSafeInteger(need)&&need>0&&have>=need,
        reason:'no_transform_level_materials',signature,level,item,need,have};
    }
    if(kind==='skill'){
      const rows=Array.isArray(feed[3])?feed[3]:[],tableCfg=W._ft?._Tyt?.ins,normalize=W._et?._KQ;
      const choices=[];
      for(const row of rows){
        const id=Number(row?.[0]),level=Number(row?.[1]),count=Number(row?.[2]);
        const table=typeof normalize==='function'?tableCfg?.getLvTableBySkillId?.(normalize(id)):null;
        if(Number.isSafeInteger(id)&&id>0&&Number.isSafeInteger(level)&&level>=0&&count>0&&table?.[level+1])
          choices.push({id,level,count});
      }
      const choice=choices[0]??null,signature=JSON.stringify(rows.map(r=>[r?.[0],r?.[1],r?.[2]]));
      return {ready:api.isActive(235)&&!!choice,reason:'no_transform_skill_upgrade',signature,choice};
    }
    const typeByRed={230:4,231:3,232:5,233:6},type=typeByRed[redId];
    const rows=magic?.getSkinCfgByType?.(type),owned=model.huanhuaList?.()??{};
    if(!Array.isArray(rows)||typeof magic?.getHuanhuaCfgByIdAndLev!=='function'||
      typeof model.checkCondition!=='function'||typeof rpc.RiseTransformingMagicShow!=='function')
      return {ready:false,reason:'waiting_illusion_model'};
    for(const skin of rows){
      const id=Number(skin?.[0]);if(!Number.isSafeInteger(id)||id<=0)continue;
      const entry=owned[id],level=Number(entry?.[1]??0),current=magic.getHuanhuaCfgByIdAndLev(id,level),next=magic.getHuanhuaCfgByIdAndLev(id,level+1);
      const cost=current?.[6],item=Number(cost?.[0]),need=Number(cost?.[1]),have=Number(bag.getItemCountById(item));
      if(!current||!next||!Array.isArray(cost)||!model.checkCondition(current[7])||
        !Number.isSafeInteger(item)||item<=0||!Number.isSafeInteger(need)||need<=0||have<need)continue;
      const limit=Number(W._et?.getSvipLimit?.(item)),svip=Number(W._Ba?._ke?._Le?.instance?.curSvipLv);
      if(!Number.isFinite(limit)||!Number.isFinite(svip)||svip<limit)continue;
      const signature=JSON.stringify([id,level,item,have]);
      return {ready:api.isActive(redId),reason:'no_transform_illusion_materials',signature,id,level,item,need,have};
    }
    return {ready:false,reason:'no_transform_illusion_candidate'};
  }
  function runTransform() {
    const T=S.transform;T.blocking=false;
    if(!S.enabled||!owned()||!svipContext()||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)||
      W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true){T.reason='waiting_safe_context';return;}
    const read=p=>transformState(p.kind,p.redId);
    if(T.pending){
      const after=read(T.pending);
      if(after.signature&&after.signature!==T.pending.before){T.pending=null;T.blocked=null;T.blocking=false;T.reason='server_acknowledged';S.confirmed++;return;}
      if(Date.now()-T.pending.at>30000){T.blocked={kind:T.pending.kind,redId:T.pending.redId,before:T.pending.before};T.pending=null;T.blocking=false;T.reason='ack_timeout_no_retry';}
      else{T.blocking=true;T.reason='waiting_server_ack';return;}
    }
    if(T.blocked){const after=read(T.blocked);if(!after.signature||after.signature===T.blocked.before){T.reason='ack_timeout_no_retry';return;}T.blocked=null;}
    const candidates=[{kind:'thunder',redId:238},{kind:'level',redId:234},...([230,231,232,233].map(redId=>({kind:'illusion',redId}))),{kind:'skill',redId:235}];
    let task=null,state=null;
    for(const candidate of candidates){const probe=transformState(candidate.kind,candidate.redId);if(probe.ready){task=candidate;state=probe;break;}}
    if(!task){T.reason='no_eligible_transform_red_dot';return;}
    if(Date.now()-T.lastSend<1800){T.blocking=true;T.reason='request_cooldown';return;}
    T.pending={...task,before:state.signature,level:state.level,choice:state.choice,at:Date.now()};
    T.lastSend=T.pending.at;T.blocking=true;T.reason='waiting_server_ack';S.sent++;
    const rpc=W._Ba._s3._Kyt.ins;
    try{
      if(task.kind==='thunder')rpc.ThunderEquipUpgrade(state.choice.id,state.choice.pos);
      else if(task.kind==='level')rpc.onTransformingUpgradeReq(0);
      else if(task.kind==='skill')rpc.onTransformingUpgradeReq(1,state.choice.id);
      else{W._Ba._s3._ZJ.ins._huanhuaActId=state.id;rpc.RiseTransformingMagicShow(state.id);}
    }catch(e){T.blocked={kind:task.kind,redId:task.redId,before:state.signature};T.pending=null;T.blocking=false;T.reason='send_error_no_retry';S.lastError=String(e);}
  }
  function mountState(redId){
    const m=W._Ba?._YJ?._WJ?.ins,bag=W._Ba?._Ic?._aQ?.ins,rankCfg=W._ft?._lDt?.ins;
    if(!m||typeof bag?.getItemCountById!=='function')return {ready:false,reason:'waiting_mount_model'};
    const numericRows=rows=>JSON.stringify(Array.isArray(rows)?rows.map(r=>Array.isArray(r)?r.slice(0,4):r):rows);
    if(redId===12){
      const rank=m.rank,level=Number(rank?.[0]),cur=rankCfg?.getPetRankCfgBySt?.(level),next=rankCfg?.getPetRankCfgBySt?.(level+1);
      const cost=cur?.[2],item=Number(cost?.[0]),need=Number(cost?.[1]),have=Number(bag.getItemCountById(item));
      const eligible=api.isActive(12)||S.mount.bulkBless||have>=need;
      const signature=JSON.stringify([rank?.[0],rank?.[1],rank?.[4],item,have]);
      return {ready:eligible&&Array.isArray(rank)&&Number.isSafeInteger(level)&&level>=0&&!!cur&&!!next&&
        Number.isSafeInteger(item)&&item>0&&Number.isSafeInteger(need)&&need>0&&have>=need&&
        typeof W._Ba?._YJ?._bgt?.ins?.rankRide==='function',reason:have<need?'no_single_blessing_material':'no_blessing_upgrade',signature,choice:{item,need,have}};
    }
    if(redId===13){
      const rows=m.refine?.[0],cfg=W._ft?._vqt?.ins,choices=[];
      if(!Array.isArray(rows)||typeof cfg?.getCfgByTypeAndLv!=='function')return {ready:false,reason:'waiting_mount_cultivation_data'};
      for(let type=0;type<4;type++){
        const level=Number(rows.find(r=>Number(r?.[0])===type)?.[1]??0),cur=cfg.getCfgByTypeAndLv(type,level),next=cfg.getCfgByTypeAndLv(type,level+1),cost=cur?.[2];
        const item=Number(cost?.[0]),need=Number(cost?.[1]),have=Number(bag.getItemCountById(item)),actorLevel=Number(W._Ba?._rJ?._O$?.ins?.level);
        if(!cur||!next||!Number.isSafeInteger(item)||item<=0||!Number.isSafeInteger(need)||need<=0||have<need||
          !Number.isFinite(actorLevel)||Number(cur?.[3])>actorLevel||level===Number(cfg.getMaxLvByLv?.(type,level)))continue;
        choices.push({type,level,item,need,have});
      }
      const choice=choices[0]??null;
      return {ready:api.isActive(13)&&!!choice,reason:choice?'ready':'no_mount_cultivation_materials',choice,
        signature:numericRows(rows)};
    }
    const rpc=W._Ba?._YJ?._bgt?.ins;
    if(redId===8){
      const cfg=W._ft?._HZ?.ins,ids=cfg?.getShowIds?.()??[],choices=[];
      if(!Array.isArray(ids)||typeof cfg?.getCfgByIdAndLv!=='function'||typeof m.getShowInfoById!=='function'||typeof m._bqt!=='function'||typeof rpc?.magicLev!=='function')return {ready:false,reason:'waiting_mount_illusion_model'};
      for(const raw of ids){
        const id=Number(raw),entry=m.getShowInfoById(id),level=Number(entry?.[1]);
        if(!Number.isSafeInteger(id)||id<=0||!entry||!Number.isSafeInteger(level)||level<1)continue;
        const cur=cfg.getCfgByIdAndLv(id,level),next=cfg.getCfgByIdAndLv(id,level+1),cost=cur&&m._bqt(cur,2),item=Number(cost?.[0]),need=Number(cost?.[1]),have=Number(bag.getItemCountById(item));
        const limit=Number(W._et?.getSvipLimit?.(item)),svip=Number(W._Ba?._ke?._Le?.instance?.curSvipLv);
        if(!cur||!next||!Number.isSafeInteger(item)||item<=0||!Number.isSafeInteger(need)||need<=0||have<need||
          !Number.isFinite(limit)||!Number.isFinite(svip)||svip<limit)continue;
        choices.push({id,level,item,need,have});
      }
      const choice=choices[0]??null;
      return {ready:api.isActive(8)&&!!choice,reason:choice?'ready':'no_mount_illusion_upgrade',choice,
        signature:JSON.stringify(ids.map(id=>{const e=m.getShowInfoById(Number(id));return [Number(id),e?.[1],e?.[2],e?.[3]];}))};
    }
    const formationType={105:3,106:4,107:5}[redId],cfg=W._ft?._RZ?.ins,list=m.huanhuaList;
    if(formationType===undefined||!cfg||!list||typeof cfg.getSkinCfgByType!=='function'||
      typeof cfg.getHuanhuaCfgByIdAndLev!=='function'||typeof m._Hyt!=='function'||typeof m._bqt!=='function'||typeof rpc?.magicLev!=='function')
      return {ready:false,reason:'waiting_mount_formation_model'};
    const skins=cfg.getSkinCfgByType(formationType),choices=[];
    for(const skin of Array.isArray(skins)?skins:[]){
      const id=Number(skin?.[0]),entry=list.get?.(id),level=Number(entry?.[1]);
      if(!Number.isSafeInteger(id)||id<=0||!entry||!Number.isSafeInteger(level)||level<1||![true,1].includes(entry[2]))continue;
      const cur=cfg.getHuanhuaCfgByIdAndLev(id,level),next=cfg.getHuanhuaCfgByIdAndLev(id,level+1),cost=cur&&m._bqt(cur,2),item=Number(cost?.[0]),need=Number(cost?.[1]);
      const have=Number(bag.getItemCountById(item)),limit=Number(W._et?.getSvipLimit?.(item)),svip=Number(W._Ba?._ke?._Le?.instance?.curSvipLv);
      if(!cur||!next||m._Hyt(id,level,entry[2],entry[3])!==true||!Number.isSafeInteger(item)||item<=0||
        !Number.isSafeInteger(need)||need<=0||have<need||!Number.isFinite(limit)||!Number.isFinite(svip)||svip<limit)continue;
      choices.push({id,level,item,need,have});
    }
    const choice=choices[0]??null;
    return {ready:api.isActive(redId)&&!!choice,reason:choice?'ready':'no_active_mount_formation_upgrade',choice,
      signature:JSON.stringify((Array.isArray(skins)?skins:[]).map(s=>{const e=list.get?.(Number(s?.[0]));return [Number(s?.[0]),e?.[1],e?.[2],e?.[3]];}))};
  }
  function runMount(redId){
    const T=S.mount;T.blocking=false;
    const context=()=>S.enabled&&owned()&&blessingContext()&&Date.now()>=Number(W.__KVPV_USER_UI_UNTIL||0)&&W.KVPV_CONFIRM_POPUPS?.beforeTask?.()!==true;
    if(T.pending){
      const after=mountState(T.pending.redId);
      if(after.signature&&after.signature!==T.pending.before){const doneId=T.pending.redId;T.pending=null;T.blocked=null;T.reason='server_acknowledged';S.confirmed++;if(doneId===12&&!mountState(12).ready)restoreBulkBless(T);return;}
      if(Date.now()-T.pending.at>30000){const doneId=T.pending.redId;T.blocked={redId:doneId,before:T.pending.before};T.pending=null;T.reason='ack_timeout_no_retry';if(doneId===12)restoreBulkBless(T);}
      else{T.blocking=true;T.reason='waiting_server_ack';return;}
    }
    if(!context()){if(T.bulkBless&&!T.pending)restoreBulkBless(T);T.reason='waiting_safe_context';return;}
    if(!api.isActive(redId)&&redId!==12){T.reason='red_dot_clear';return;}
    const state=mountState(redId);
    if(T.blocked){if(!state.signature||state.signature===T.blocked.before){T.reason='ack_timeout_no_retry';return;}T.blocked=null;}
    if(!state.ready){if(redId===12)restoreBulkBless(T);T.reason=state.reason||'no_eligible_mount_action';return;}
    if(Date.now()-T.lastSend<1800){T.blocking=true;T.reason='request_cooldown';return;}
    T.pending={redId,before:state.signature,choice:state.choice,at:Date.now()};T.lastSend=T.pending.at;T.blocking=true;T.reason='waiting_server_ack';S.sent++;
    try{
      const rpc=W._Ba?._YJ?._bgt?.ins;
      if(redId===12){disableBulkBless(T,W._Ba._YJ._WJ.ins,'bollZiDong');rpc.rankRide();}
      else if(redId===13)rpc.riseRideRefine([state.choice.type,0]);
      else if(redId===8){W._Ba._YJ._WJ.ins.huanhuaActId=state.choice.id;rpc.magicLev(state.choice.id);}
      else{W._Ba._YJ._WJ.ins.huanhuaActId=state.choice.id;rpc.magicLev(state.choice.id);}
    }catch(e){T.blocked={redId,before:state.signature};T.pending=null;T.blocking=false;if(redId===12)restoreBulkBless(T);T.reason='send_error_no_retry';S.lastError=String(e);}
  }
  function disableBulkBless(state,model,flag){
    state.bulkBless={model,flag};
    model[flag]=false;
  }
  function restoreBulkBless(state){
    const bulk=state?.bulkBless;if(!bulk)return;
    try{bulk.model[bulk.flag]=false;}catch{}
    state.bulkBless=null;
  }
  function linhThuState(redId){
    const m=W._Ba?._OJ?._GJ?.inst,bag=W._Ba?._Ic?._aQ?.ins,rpc=W._Ba?._OJ?._VBn?.inst;
    if(!m||typeof bag?.getItemCountById!=='function'||!rpc)return {ready:false,reason:'waiting_linh_thu_model'};
    if(redId===3){
      const level=Number(m._star),cfg=W._ft?._nqt?.ins,cur=cfg?.getPetRankCfgBySt?.(level),next=cfg?.getPetRankCfgBySt?.(level+1);
      const cost=cur?.[2],item=Number(cost?.[0]),need=Number(cost?.[1]),have=Number(bag.getItemCountById(item));
      const eligible=api.isActive(3)||S.linhThu.bulkBless||have>=need;
      return {ready:eligible&&Number.isSafeInteger(level)&&level>=0&&!!cur&&!!next&&Number.isSafeInteger(item)&&item>0&&
        Number.isSafeInteger(need)&&need>0&&have>=need&&typeof rpc.rankPet==='function',reason:have<need?'no_single_blessing_material':'no_linh_thu_rank_upgrade',
        signature:JSON.stringify([m._star,m._bless,m.rank?.[0],m.rank?.[1],item,have]),choice:{item,need,have}};
    }
    if(redId===5){
      const rows=m._ref?.[0],cfg=W._ft?._UZ?.ins,choices=[];
      if(!Array.isArray(rows)||typeof cfg?.getCfgByTypeAndLv!=='function'||typeof rpc.riseRefet!=='function')return {ready:false,reason:'waiting_linh_thu_cultivation_data'};
      for(let type=0;type<4;type++){
        const level=Number(rows.find(r=>Number(r?.[0])===type)?.[1]??0),cur=cfg.getCfgByTypeAndLv(type,level),next=cfg.getCfgByTypeAndLv(type,level+1),cost=cur?.[2];
        const item=Number(cost?.[0]),need=Number(cost?.[1]),have=Number(bag.getItemCountById(item)),actorLevel=Number(W._Ba?._rJ?._O$?.ins?.level);
        if(!cur||!next||!Number.isSafeInteger(item)||item<=0||!Number.isSafeInteger(need)||need<=0||have<need||!Number.isFinite(actorLevel)||Number(cur?.[3])>actorLevel||level===Number(cfg.getMaxLvByLv?.(type,level)))continue;
        choices.push({type,level,item,need,have});
      }
      return {ready:api.isActive(5)&&choices.length>0,reason:choices.length?'ready':'no_linh_thu_cultivation_materials',choice:choices[0],signature:JSON.stringify(rows)};
    }
    const rpcIllusion=W._Ba?._ogt?._Cqt?.inst;
    if(redId===4){
      const cfg=W._ft?._GZ?.ins,ids=cfg?.getShowIds?.()??[],choices=[];
      if(!Array.isArray(ids)||typeof cfg?.getCfgByIdAndLv!=='function'||typeof m.getShowInfoById!=='function'||typeof m._cqt!=='function'||typeof rpcIllusion?.riseMgcShow!=='function')return {ready:false,reason:'waiting_linh_thu_illusion_model'};
      for(const raw of ids){
        const id=Number(raw),entry=m.getShowInfoById(id),level=Number(entry?.[1]);
        if(!Number.isSafeInteger(id)||id<=0||!entry||!Number.isSafeInteger(level)||level<1||![true,1].includes(entry[2]))continue;
        const cur=cfg.getCfgByIdAndLv(id,level),next=cfg.getCfgByIdAndLv(id,level+1),cost=cur&&m._cqt(cur,2),item=Number(cost?.[0]),need=Number(cost?.[1]),have=Number(bag.getItemCountById(item));
        const limit=Number(W._et?.getSvipLimit?.(item)),svip=Number(W._Ba?._ke?._Le?.instance?.curSvipLv);
        if(!cur||!next||!Number.isSafeInteger(item)||item<=0||!Number.isSafeInteger(need)||need<=0||have<need||!Number.isFinite(limit)||!Number.isFinite(svip)||svip<limit)continue;
        choices.push({id,level,item,need,have});
      }
      return {ready:api.isActive(4)&&choices.length>0,reason:choices.length?'ready':'no_linh_thu_illusion_upgrade',choice:choices[0],
        signature:JSON.stringify(ids.map(id=>{const e=m.getShowInfoById(Number(id));return [Number(id),e?.[1],e?.[2],e?.[3]];}))};
    }
    const formationType={102:3,103:4,104:5}[redId],cfg=W._ft?._FZ?.ins,list=m.hhuaLst;
    if(formationType===undefined||!list||typeof cfg?.getSkinCfgByType!=='function'||typeof cfg?.getHuanhuaCfgByIdAndLev!=='function'||typeof m._Hyt!=='function'||typeof m._cqt!=='function'||typeof rpc.mgcLv!=='function')return {ready:false,reason:'waiting_linh_thu_formation_model'};
    const skins=cfg.getSkinCfgByType(formationType),choices=[];
    for(const skin of Array.isArray(skins)?skins:[]){
      const id=Number(skin?.[0]),entry=list.get?.(id),level=Number(entry?.[1]);
      if(!Number.isSafeInteger(id)||id<=0||!entry||!Number.isSafeInteger(level)||level<1||![true,1].includes(entry[2]))continue;
      const cur=cfg.getHuanhuaCfgByIdAndLev(id,level),next=cfg.getHuanhuaCfgByIdAndLev(id,level+1),cost=cur&&m._cqt(cur,2),item=Number(cost?.[0]),need=Number(cost?.[1]);
      const have=Number(bag.getItemCountById(item)),limit=Number(W._et?.getSvipLimit?.(item)),svip=Number(W._Ba?._ke?._Le?.instance?.curSvipLv);
      if(!cur||!next||m._Hyt(id,level,entry[2],entry[3])!==true||!Number.isSafeInteger(item)||item<=0||!Number.isSafeInteger(need)||need<=0||have<need||!Number.isFinite(limit)||!Number.isFinite(svip)||svip<limit)continue;
      choices.push({id,level,item,need,have});
    }
    return {ready:api.isActive(redId)&&choices.length>0,reason:choices.length?'ready':'no_active_linh_thu_formation_upgrade',choice:choices[0],
      signature:JSON.stringify((Array.isArray(skins)?skins:[]).map(s=>{const e=list.get?.(Number(s?.[0]));return [Number(s?.[0]),e?.[1],e?.[2],e?.[3]];}))};
  }
  function runLinhThu(redId){
    const T=S.linhThu;T.blocking=false;
    if(T.pending){
      const after=linhThuState(T.pending.redId);
      if(after.signature&&after.signature!==T.pending.before){const doneId=T.pending.redId;T.pending=null;T.blocked=null;T.reason='server_acknowledged';S.confirmed++;if(doneId===3&&!linhThuState(3).ready)restoreBulkBless(T);return;}
      if(Date.now()-T.pending.at>30000){const doneId=T.pending.redId;T.blocked={redId:doneId,before:T.pending.before};T.pending=null;T.reason='ack_timeout_no_retry';if(doneId===3)restoreBulkBless(T);}
      else{T.blocking=true;T.reason='waiting_server_ack';return;}
    }
    if(!S.enabled||!owned()||!blessingContext()||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)||W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true){if(T.bulkBless&&!T.pending)restoreBulkBless(T);T.reason='waiting_safe_context';return;}
    if(!api.isActive(redId)&&redId!==3){T.reason='red_dot_clear';return;}
    const state=linhThuState(redId);
    if(T.blocked){if(!state.signature||state.signature===T.blocked.before){T.reason='ack_timeout_no_retry';return;}T.blocked=null;}
    if(!state.ready){if(redId===3)restoreBulkBless(T);T.reason=state.reason||'no_eligible_linh_thu_action';return;}
    if(Date.now()-T.lastSend<1500){T.blocking=true;T.reason='request_cooldown';return;}
    T.pending={redId,before:state.signature,choice:state.choice,at:Date.now()};T.lastSend=T.pending.at;T.blocking=true;T.reason='waiting_server_ack';S.sent++;
    try{
      const m=W._Ba._OJ._GJ.inst,rpc=W._Ba._OJ._VBn.inst;
      if(redId===3){disableBulkBless(T,m,'_bolZD');rpc.rankPet();}
      else if(redId===5)rpc.riseRefet([state.choice.type,0]);
      else if(redId===4){W._Ba._ogt._egt.inst._mgcSelId=state.choice.id;W._Ba._ogt._Cqt.inst.riseMgcShow([state.choice.id]);}
      else{m._hhuaActId=state.choice.id;rpc.mgcLv(state.choice.id);}
    }catch(e){T.blocked={redId,before:state.signature};T.pending=null;T.blocking=false;if(redId===3)restoreBulkBless(T);T.reason='send_error_no_retry';S.lastError=String(e);}
  }
  function frontlineClock(){
    const p=Object.fromEntries(new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Ho_Chi_Minh',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'}).formatToParts(new Date()).map(x=>[x.type,x.value]));
    const minute=Number(p.hour)*60+Number(p.minute);
    const slot=minute>=720&&minute<750?'1200':minute>=1290&&minute<1320?'2130':'';
    return {minute,slot,key:`${p.year}-${p.month}-${p.day}/${slot}`};
  }
  function frontlineScene(){return Number(W._Ba?._$a?.SceneUtil?.curScene);}
  function runFrontline(){
    const F=S.frontline,scene=frontlineScene(),inside=scene===21||scene===68,clock=frontlineClock();
    const boss=W._Ba?._sst?._ist?.inst,reward=W._Ba?._XLt?._YLt?.inst;
    F.blocking=false;
    if(F.pending?.kind==='enter'){
      if(inside){F.pending=null;F.enteredAt=Date.now();F.exitSent=false;F.reason='fighting_frontline';S.confirmed++;}
      else if(Date.now()-F.pending.at>45000){F.attempted=F.pending.key;F.pending=null;F.reason='entry_timeout_no_retry';}
      else{F.blocking=true;F.reason='waiting_frontline_entry';return;}
    }
    if(F.pending?.kind==='exit'){
      if(!inside){F.pending=null;F.enteredAt=0;F.exitSent=false;F.reason='frontline_exited';S.confirmed++;return;}
      if(Date.now()-F.pending.at>30000){F.reason='exit_timeout_waiting';F.blocking=true;return;}
      F.blocking=true;F.reason='waiting_frontline_exit';return;
    }
    if(inside){
      F.enteredAt ||= Date.now();F.blocking=true;F.reason='fighting_frontline';
      const stage=W._Ba?._Co?._Mo?.ins;if(stage&&stage.auto!==true)stage.auto=true;
      try{
        W.KVPV.frontline1300?.refresh?.();
        const state=boss?.getCpSceneStateByType?.(scene),ids=W._ft?._q6i?.ins?.getOccAll?.(state?.[8])||[];
        const target=ids.find(id=>Number(reward?.getCfgByid?.(id)?.[6])===1300&&[0,false].includes(boss?.getBsInfoById?.(id)?.[2]?.[0]));
        if(target!=null&&reward?.lstBsOcc!==target)reward?.setSelTarget?.(target);
      }catch{}
      if(!clock.slot&&!F.exitSent){
        const exit=W._Ba?._$a?._Gr?.ins?.exitDungeon;
        if(typeof exit==='function'){F.pending={kind:'exit',at:Date.now()};F.exitSent=true;F.reason='waiting_frontline_exit';S.sent++;try{exit.call(W._Ba._$a._Gr.ins);}catch(e){F.pending=null;F.reason='exit_error';S.lastError=String(e);}}
        else F.reason='waiting_native_exit';
      }
      return;
    }
    if(!S.enabled||!owned()||!clock.slot||!api.isActive(110)){F.reason=!clock.slot?'outside_frontline_hours':'frontline_red_dot_clear';return;}
    if(F.attempted===clock.key){F.reason='frontline_attempted_this_window';return;}
    if(Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)||W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true||!blessingContext()){F.reason='waiting_safe_context';return;}
    const states=[boss?.getCpSceneStateByType?.(21),boss?.getCpSceneStateByType?.(68)];
    const ready=states.find(s=>s&&Number(s[2])===2&&Boolean(s[7]));
    if(!ready||!Number.isFinite(Number(reward?.remainTimes))||Number(reward.remainTimes)<=0){F.reason='frontline_not_open_or_no_attempts';return;}
    const map=ready===states[1]?2152:2151,entry=W._Ba?._sst?._Cht?.inst;
    if(typeof entry?.rqEtScene!=='function'){F.reason='native_frontline_entry_unavailable';return;}
    if(W._Ba?._Co?._Mo?.ins?.auto===true){F.reason='waiting_stage_stop';return;}
    F.attempted=clock.key;F.pending={kind:'enter',key:clock.key,map,at:Date.now()};F.blocking=true;F.reason='waiting_frontline_entry';S.sent++;
    try{entry.rqEtScene(map);}catch(e){F.pending=null;F.reason='frontline_entry_error';S.lastError=String(e);}
  }
  function tombBossSceneType(){
    const scene=W._Ba?._$a?.SceneUtil,sceneId=W._Ba?._$a?._yo?.ins?.curSceneId;
    try{return Number(typeof scene?.getSceneType==='function'?scene.getSceneType(sceneId):scene?.curScene);}catch{return 0;}
  }
  function tombBossDayKey(){
    const parts=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Ho_Chi_Minh',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());
    const d=Object.fromEntries(parts.map(x=>[x.type,x.value]));return `${d.year}-${d.month}-${d.day}`;
  }
  function tombBossLoadDay(T){
    const key=tombBossDayKey();if(T.dayKey===key)return;
    T.dayKey=key;T.blockedBosses=new Set();T.activeBoss=null;
    try{T.attempts=Math.max(0,Math.min(2,Number(W.localStorage.getItem('kvpv_tomb_boss_attempts_'+String(W.__KVPV_OWN_ACTOR_ID||'' )+'_'+key))||0));}catch{T.attempts=0;}
  }
  function tombBossSaveAttempt(T){
    T.attempts=Math.min(2,T.attempts+1);
    try{W.localStorage.setItem('kvpv_tomb_boss_attempts_'+String(W.__KVPV_OWN_ACTOR_ID||'')+'_'+T.dayKey,String(T.attempts));}catch{}
  }
  function runTombBoss(){
    const T=S.tombBoss,model=W._Ba?._vf?._lf?.instance,cfg=W._ft?._yoh?.ins,bag=W._Ba?._q7?._QQ?.inst,
      controller=W._Ba?._Vht?._MLt?.ins,sceneType=tombBossSceneType();
    T.blocking=false;tombBossLoadDay(T);
    if(T.pending){
      if(sceneType===12){T.activeBoss=T.pending.bossId;T.pending=null;T.blocking=true;T.reason='fighting_tracked_red_dot_boss';S.confirmed++;}
      else if(Date.now()-T.pending.at>45000){T.blockedBosses.add(T.pending.bossId);T.pending=null;T.reason='entry_timeout_no_retry';}
      else{T.blocking=true;T.reason='waiting_tomb_boss_entry';return;}
    }
    if(sceneType===12&&T.activeBoss){
      T.blocking=true;T.reason='fighting_tracked_red_dot_boss';
      const auto=W._Ba?._Vht?._CLt?.ins;if(auto)auto.isAuto=true;
      return;
    }
    if(T.activeBoss){T.activeBoss=null;T.blocking=false;T.reason='tomb_boss_run_finished';return;}
    if(!S.enabled||!owned()||!api.isActive(825)){T.reason='tomb_boss_red_dot_clear';return;}
    if(T.attempts>=2){T.reason='daily_two_attempt_limit';return;}
    if(!model||!cfg||!bag||!controller||typeof cfg.getCfgsByLayer!=='function'||typeof model.checkOneRDByBossid!=='function'||typeof controller.enterBsHome!=='function'){
      T.reason='waiting_tomb_boss_native_model';return;
    }
    if(Number(model.leftnum)<=0){T.reason='no_free_tomb_boss_attempts';return;}
    if(W._Ba?._$a?.SceneUtil?.isCommonScene!==true||W._Ba?._$a?._yo?.ins?.isInMission===true||
       Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)||W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true||
       W._Ba?._rJ?._O$?.ins?.isDead===true||W.KVPV?.core?.scene?.status?.()?.owner){T.reason='waiting_safe_tomb_boss_context';return;}
    let target=null;
    for(let layer=1;layer<=3&&!target;layer++){
      const rows=cfg.getCfgsByLayer(layer);
      for(const row of Array.isArray(rows)?rows:[]){
        const bossId=Number(row?.[3]);
        if(!Number.isSafeInteger(bossId)||bossId<=0||!Number.isSafeInteger(Number(row?.[0]))||
           !Number.isSafeInteger(Number(row?.[1]))||Number(row[1])<1||T.blockedBosses.has(bossId))continue;
        let red=false;try{red=model.checkOneRDByBossid(bossId)===true;}catch{}
        if(red){target={bossId,layer,row};break;}
      }
    }
    if(!target){T.reason='no_tracked_boss_red_dot';return;}
    if(Date.now()-Number(T.lastSend||0)<2500){T.reason='tomb_boss_request_cooldown';return;}
    T.lastSend=Date.now();T.pending={...target,at:T.lastSend};T.blocking=true;T.reason='waiting_tomb_boss_entry';S.sent++;
    try{
      const entered=controller.enterBsHome(Number(target.row[0]),Number(target.row[1])-1,target.bossId,true);
      if(entered){tombBossSaveAttempt(T);const auto=W._Ba?._Vht?._CLt?.ins;if(auto)auto.isAuto=true;}
      else{T.pending=null;T.blocking=false;T.blockedBosses.add(target.bossId);T.reason='native_entry_rejected';}
    }catch(e){T.pending=null;T.blocking=false;T.blockedBosses.add(target.bossId);T.reason='native_entry_error';S.lastError=String(e);}
  }
  function tombGearState(){
    const model=W._Ba?._q7?._QQ?.inst,rpc=W._Ba?._q7?._zen?.inst;
    const bag=W._Ba?._Ic?._aQ?.ins,cfg=W._ft?._Dli?.ins,net=W._v?.ins;
    if(!model||!bag||typeof bag.getItemCountById!=='function'||!cfg||!rpc||typeof rpc.oneKeyUp!=='function')
      return {ready:false,reason:'waiting_tomb_gear_model'};
    let split;
    try{split=model.getSplitRewards;}catch{return {ready:false,reason:'split_probe_error'};}
    const rows=Array.isArray(split?.[1])?split[1]:[];
    const rewardRows=Array.isArray(split?.[0])?split[0]:[];
    const dissolveIds=rows.map(row=>Number(row?.[2])).filter(id=>Number.isSafeInteger(id)&&id>0);
    let dissolveConfig;
    try{dissolveConfig=W._ft?._Cji?.ins?.getResolveCfgByScls?.(2102,401)?.[0];}catch{}
    const levels=[];
    for(let part=1;part<=8;part++)levels.push(Number(model.partLev?.get?.(part)??0));
    const levState=Array.isArray(model.levState)?model.levState.slice():null;
    const candidates=[];
    for(let part=1;part<=8;part++){
      const level=levels[part-1],current=cfg.getCfgByPart?.(part,level),next=cfg.getCfgByPart?.(part,level+1);
      const costs=current&&cfg.items?.(current,level);
      if(!next||!Array.isArray(costs)||!costs.length)continue;
      const item=Number(costs[0]?.[0]),need=Number(costs[0]?.[1]),have=Number(bag.getItemCountById(item));
      if(Number.isSafeInteger(item)&&item>0&&Number.isFinite(need)&&need>0&&Number.isFinite(have)&&have>=need)
        candidates.push({part,level,item,need,have});
    }
    const signature=JSON.stringify({dissolveIds,rewardRows,levels,levState,candidates});
    if(api.isActive(842)&&dissolveIds.length){
      return {ready:true,stage:'dismantle',signature,choice:{ids:dissolveIds,rewardCount:rewardRows.length,
        resolveId:Number(dissolveConfig?.[0]),configReady:Number.isSafeInteger(Number(dissolveConfig?.[0]))&&Number(dissolveConfig[0])>0}};
    }
    if(api.isActive(828)){
      const canWholeLevel=!!levState?.[1];
      const choice=candidates.length?candidates[0]:null;
      if(choice||canWholeLevel)return {ready:true,stage:'strengthen',signature,choice:choice||{wholeLevel:true}};
    }
    return {ready:false,reason:api.isActive(842)?'no_selected_dismantle_candidates':'no_owned_upgrade_material'};
  }
  function runTombGear(){
    const T=S.tombGear;T.blocking=false;
    if(T.pending){
      const after=tombGearState();
      if(after.signature&&after.signature!==T.pending.before){const doneStage=T.pending.stage;T.pending=null;T.blocked=null;T.reason='server_acknowledged_'+doneStage;S.confirmed++;return;}
      if(Date.now()-T.pending.at>30000){T.blocked={before:T.pending.before,stage:T.pending.stage,at:T.pending.at};T.pending=null;T.reason='ack_timeout_no_retry';}
      else{T.blocking=true;T.reason='waiting_server_ack';return;}
    }
    if(!S.enabled||!owned()||!blessingContext()||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)||W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true){T.reason='waiting_safe_context';return;}
    const state=tombGearState();
    if(T.blocked){if(!state.signature||state.signature===T.blocked.before){T.reason='ack_timeout_no_retry';return;}T.blocked=null;}
    if(!state.ready){T.reason=state.reason;return;}
    if(state.stage==='dismantle'&&(!state.choice.configReady||!Array.isArray(state.choice.ids)||!state.choice.ids.length)){
      T.reason='waiting_valid_native_dismantle_selection';return;
    }
    if(Date.now()-T.lastSend<1800){T.blocking=true;T.reason='request_cooldown';return;}
    const stage=state.stage;T.pending={before:state.signature,stage,redId:stage==='dismantle'?842:828,choice:state.choice,at:Date.now()};T.lastSend=T.pending.at;
    T.blocking=true;T.reason='waiting_server_ack_'+stage;S.sent++;
    try{
      if(stage==='dismantle')W._v.ins.send('Tmei',[state.choice.resolveId,state.choice.ids,1]);
      else W._Ba._q7._zen.inst.oneKeyUp();
    }catch(e){T.blocked={before:state.signature,stage,at:T.pending.at};T.pending=null;T.blocking=false;T.reason='send_error_no_retry';S.lastError=String(e);}
  }
  function gearStrengthState(){
    const model=W._Ba?._Agt?._Rgt?.ins,api=W._Ba?._Agt?._qgt?.ins;
    const bag=W._Ba?._Ic?._aQ?.ins,levels=model?.partLev;
    if(!model||!levels?.keys||typeof levels.get!=='function'||typeof api?.oneKeyUp!=='function'||typeof bag?.getItemCountById!=='function')
      return {ready:false,reason:'waiting_strength_model'};
    const items=Number(bag.getItemCountById(10120001)||0),copper=Number(W._Ba?._rJ?._O$?.ins?.copper??W._Ba?._rJ?._O$?.ins?.coin??0);
    const ranks=(model.levState||[]).map((row,index)=>({index,ready:row?.[1]===true})).filter(row=>row.ready);
    const signature=JSON.stringify({levels:levels.keys.map(key=>[key,levels.get(key)]),levState:model.levState,items,copper,can:model.isCanUpEquip===true});
    if(model.isCanUpEquip===true&&items>0)return {ready:true,reason:'strength_materials_available',signature,choice:{kind:'quick',items,copper}};
    if(ranks.length)return {ready:true,reason:'strength_rank_available',signature,choice:{kind:'rank',index:ranks[0].index}};
    return {ready:false,reason:'no_owned_strength_material_or_rank'};
  }
  function runGearStrength(){
    const T=S.gearStrength;T.blocking=false;
    if(T.pending){
      const after=gearStrengthState();
      if(after.signature&&after.signature!==T.pending.before){T.pending=null;T.blocked=null;T.reason='server_acknowledged';S.confirmed++;return;}
      if(Date.now()-T.pending.at>25000){T.blocked={before:T.pending.before,at:T.pending.at};T.pending=null;T.reason='ack_timeout_no_retry';}
      else{T.blocking=true;T.reason='waiting_server_ack';return;}
    }
    if(!S.enabled||!api.isActive(15)){T.reason='red_dot_clear';return;}
    if(!owned()||!blessingContext()||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)||W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true){T.reason='waiting_safe_context';return;}
    const state=gearStrengthState();
    if(T.blocked){if(!state.signature||state.signature===T.blocked.before){T.reason='ack_timeout_no_retry';return;}T.blocked=null;}
    if(!state.ready){T.reason=state.reason;return;}
    if(Date.now()-T.lastSend<1400){T.blocking=true;T.reason='request_cooldown';return;}
    const net=W._v?.ins;if(state.choice.kind==='rank'&&typeof net?.send!=='function'){T.reason='waiting_native_rank_rpc';return;}
    T.pending={before:state.signature,choice:state.choice,at:Date.now()};T.lastSend=T.pending.at;T.blocking=true;T.reason='waiting_server_ack';S.sent++;
    try{if(state.choice.kind==='quick')W._Ba._Agt._qgt.ins.oneKeyUp();else net.send('TWeb',[state.choice.index]);}
    catch(e){T.blocked={before:state.signature,at:T.pending.at};T.pending=null;T.blocking=false;T.reason='send_error_no_retry';S.lastError=String(e);}
  }
  function soulStoneState(){
    const model=W._Ba?._ZE?._Qgt?.ins,rpc=W._Ba?._ZE?._Jgt?.ins,slots=model?.getValueByPos?.(),cfg=W._ft?._Qyn?.ins,bag=W._Ba?._Ic?._aQ?.ins;
    if(!model||!slots||typeof slots.get!=='function'||typeof rpc?.oneKeyHandler!=='function'||typeof model.getStByType!=='function'||typeof cfg?.getUpStoneByLev!=='function')
      return {ready:false,reason:'waiting_soul_stone_model'};
    const parts=model.getHavePos?.()||[];
    const signature=JSON.stringify({slots:parts.map(raw=>{const part=Number(raw);return [part,Array.from({length:5},(_,i)=>slots.get(part*10+i)??null)];}),master:model.otherValue});
    for(const raw of parts){
      const part=Number(raw);if(!Number.isInteger(part)||part<1||part>10)continue;
      for(let slot=0;slot<5;slot++){
        if(slots.get(part*10+slot)!=null||(slot===0&&model.vipIsOpen!==true))continue;
        let hasStones=false;
        try{hasStones=slot===0&&model.vipIsOpen===true?[1,2,3,4].some(type=>model.getStByType(type)?.length>0):model.getStByType(slot)?.length>0;}catch{}
        if(hasStones)return {ready:true,reason:'empty_socket_available',signature,choice:{kind:'socket',part,slot}};
      }
    }
    for(const raw of parts){
      const part=Number(raw);if(!Number.isInteger(part)||part<1||part>10)continue;
      for(let slot=0;slot<5;slot++){
        const id=slots.get(part*10+slot),row=id==null?null:cfg.getCfgById?.(id);
        const level=Number(row?.[5]),maxLevel=Number(cfg.stoneMaxLv),need=Number(row?.[6]),have=Number(bag?.getItemCountById?.(id));
        if(!row||!Number.isFinite(level)||!Number.isFinite(maxLevel)||level>=maxLevel||!Number.isSafeInteger(need)||need<=1||!Number.isFinite(have)||have+1<need)continue;
        return {ready:true,reason:'socket_stone_upgrade_materials_available',signature,choice:{kind:'upgrade',part,slot,itemId:Number(id),level,need,owned:have}};
      }
    }
    const value=model.otherValue,level=Number(value?.[0]),max=Number(cfg.maxLv),rank=cfg.getUpStoneByLev?.(level);
    if(Number.isSafeInteger(level)&&level>=0&&level<max&&Boolean(value?.[1])&&Number(rank?.[1])>0&&Number.isFinite(Number(rank?.[1]))&&Number(value?.[3])>=Number(rank[1])&&typeof W._v?.ins?.send==='function')
      return {ready:true,reason:'soul_master_rank_available',signature,choice:{kind:'rank',level}};
    return {ready:false,reason:'no_empty_socket_or_ready_master_rank'};
  }
  function runSoulStone(){
    const T=S.soulStone;T.blocking=false;
    if(T.pending){
      const after=soulStoneState();
      if(after.signature&&after.signature!==T.pending.before){T.pending=null;T.blocked=null;T.reason='server_acknowledged';S.confirmed++;return;}
      if(Date.now()-T.pending.at>25000){T.blocked={before:T.pending.before,at:T.pending.at};T.pending=null;T.reason='ack_timeout_no_retry';}
      else{T.blocking=true;T.reason='waiting_server_ack';return;}
    }
    if(!S.enabled||!api.isActive(16)){T.reason='red_dot_clear';return;}
    if(!owned()||!blessingContext()||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)||W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true){T.reason='waiting_safe_context';return;}
    const state=soulStoneState();
    if(T.blocked){if(!state.signature||state.signature===T.blocked.before){T.reason='ack_timeout_no_retry';return;}T.blocked=null;}
    if(!state.ready){T.reason=state.reason;return;}
    if(Date.now()-T.lastSend<1000){T.blocking=true;T.reason='request_cooldown';return;}
    T.pending={before:state.signature,choice:state.choice,at:Date.now()};T.lastSend=T.pending.at;T.blocking=true;T.reason='waiting_server_ack';S.sent++;
    try{if(state.choice.kind==='socket')W._Ba._ZE._Jgt.ins.oneKeyHandler([state.choice.part,0]);else if(state.choice.kind==='upgrade')W._Ba._ZE._Jgt.ins.oneKeyHandler([state.choice.part,2]);else W._v.ins.send('TBhu',null);}
    catch(e){T.blocked={before:state.signature,at:T.pending.at};T.pending=null;T.blocking=false;T.reason='send_error_no_retry';S.lastError=String(e);}
  }
  function soulForgeState(){
    const model=W._Ba?._eW?._pEt?.inst,rpc=W._Ba?._eW?._dEt?.inst;
    const bag=W._Ba?._Ic?._aQ?.ins,parts=W._Ba?._rJ?._O$?.ins?.equipsDic?.keys;
    const material=Number(model?._mtItemID?.[0]),ownedCount=Number(bag?.getItemCountById?.(material)||0);
    if(!Array.isArray(model?.zhList)||!Array.isArray(model?.shList)||typeof model?.getCanUpZH!=='function'||
      typeof model?.getCanUpSh!=='function'||typeof rpc?.ShOperOneKey!=='function'||typeof rpc?.ZhOperOneKey!=='function'||
      !Array.isArray(parts)||!Number.isSafeInteger(material)||material<=0||typeof bag?.getItemCountById!=='function')
      return {ready:false,reason:'waiting_soul_forge_model'};
    const levels=parts.map(raw=>{const part=Number(raw),row=model.zhList[part];return [part,row?.[0],row?.[1],row?.[2]];});
    const soulEatingParts=Array.from({length:6},(_,i)=>i+1);
    const soulEatingLevels=soulEatingParts.map(part=>{const row=model.shList[part];return [part,row?.[0],row?.[1]];});
    const consumption=[0,1,2].map(i=>[model.getCsmpNum?.(i),model.getCsmptExp?.(i)]);
    const signature=JSON.stringify({levels,soulEatingLevels,material,ownedCount,consumption});
    const soulEatingPart=soulEatingParts.find(part=>model.getCanUpSh(part)===true);
    if(soulEatingPart!==undefined)return {ready:true,reason:'soul_eating_part_can_upgrade',signature,choice:{kind:'soulEating',part:soulEatingPart}};
    const choice=parts.map(Number).find(part=>Number.isInteger(part)&&part>=1&&part<=10&&model.getCanUpZH(part)===true);
    if(ownedCount>0&&choice!==undefined)return {ready:true,reason:'selected_material_can_forge',signature,choice:{kind:'forge',material,ownedCount,part:choice}};
    return {ready:false,reason:ownedCount<=0?'no_owned_selected_forge_material':'no_eligible_forge_level',signature};
  }
  function runSoulForge(){
    const T=S.soulForge;T.blocking=false;
    if(T.pending){
      const after=soulForgeState();
      if(after.signature&&after.signature!==T.pending.before){T.pending=null;T.blocked=null;T.reason='server_acknowledged';S.confirmed++;return;}
      if(Date.now()-T.pending.at>30000){T.blocked={before:T.pending.before,at:T.pending.at};T.pending=null;T.reason='ack_timeout_no_retry';}
      else{T.blocking=true;T.reason='waiting_server_ack';return;}
    }
    if(!S.enabled||!api.isActive(156)){T.reason='red_dot_clear';return;}
    if(!owned()||!blessingContext()||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)||W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true){T.reason='waiting_safe_context';return;}
    const state=soulForgeState();
    if(T.blocked){if(!state.signature||state.signature===T.blocked.before){T.reason='ack_timeout_no_retry';return;}T.blocked=null;}
    if(!state.ready){T.reason=state.reason;return;}
    if(Date.now()-T.lastSend<1500){T.blocking=true;T.reason='request_cooldown';return;}
    T.pending={before:state.signature,at:Date.now(),choice:state.choice};T.lastSend=T.pending.at;T.blocking=true;T.reason='waiting_server_ack';S.sent++;
    try{
      if(state.choice.kind==='soulEating')W._Ba._eW._dEt.inst.ShOperOneKey(state.choice.part);
      else W._Ba._eW._dEt.inst.ZhOperOneKey(state.choice.material);
    }
    catch(e){T.blocked={before:state.signature,at:T.pending.at};T.pending=null;T.blocking=false;T.reason='send_error_no_retry';S.lastError=String(e);}
  }
  function inventoryUseName(item){
    const id=Number(item?.[0]),cfg=W._et?.getCfgById?.(id),raw=String(cfg?.[1]??cfg?.name??'');
    return raw.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  }
  function inventoryUseExclude(item){
    const id=Number(item?.[0]),name=inventoryUseName(item),type=Number(W._et?.getTypeById?.(id));
    if(!name||![2,3].includes(type))return 'unsupported_item_type_or_missing_name';
    if(/\b(ve|the|ticket|voucher|coupon)\b/.test(name))return 'ticket_reserved';
    if(name.includes('ma tuy don'))return 'reserved_ma_tuy_don';
    if(name.includes('nguyen luc don'))return 'reserved_nguyen_luc_don';
    if(name.includes('da tang cap')||name.includes('chon da tang cap')||name.includes('da luyen tinh'))return 'upgrade_stone_reserved';
    const cfg=W._et?.getCfgById?.(id);
    if(Number(cfg?.[11]||0)>0)return 'opens_native_panel';
    return '';
  }
  function inventoryUseState(){
    const bag=W._Ba?._Ic?._aQ?.ins,tool=W._Ba?._Ic?.BeiBaoTool,rpc=W._Ba?._Ic?._oJ?.instance;
    if(bag?.isBagInited!==true||typeof bag?.getItemsByBagType!=='function'||
       typeof tool?.checkItemCanUseOrNotice!=='function'||typeof rpc?.c2sUseBagItem!=='function'||
       typeof W._et?.getCfgById!=='function'||typeof W._et?.getTypeById!=='function')
      return {ready:false,reason:'waiting_inventory_native_api'};
    const rows=bag.getItemsByBagType(0);
    if(!Array.isArray(rows))return {ready:false,reason:'waiting_prop_bag'};
    const inspected=[];
    for(const item of rows){
      if(!Array.isArray(item)||!Number.isSafeInteger(Number(item[0]))||!Number.isSafeInteger(Number(item[1]))||Number(item[1])<=0)continue;
      const id=Number(item[0]),uid=String(item[2]??''),key=id+'/'+uid,excluded=inventoryUseExclude(item);
      if(excluded){inspected.push({id,uid,excluded});continue;}
      if(S.inventoryUse.blocked.has(key)){inspected.push({id,uid,excluded:'ack_timeout_no_retry'});continue;}
      if(!Array.isArray(item[5])||(item[5][2]!==1&&item[5][2]!==true)){inspected.push({id,uid,excluded:'item_red_dot_inactive'});continue;}
      if(tool.checkItemCanUseOrNotice(item,false)!==true){inspected.push({id,uid,excluded:'native_use_check_false'});continue;}
      return {ready:true,reason:'native_item_red_dot_use_available',choice:{id,uid,count:Number(item[1]),name:inventoryUseName(item),redDot:true},inspected};
    }
    return {ready:false,reason:'no_safe_usable_prop_items',inspected};
  }
  function runInventoryUse(){
    const T=S.inventoryUse;T.blocking=false;
    if(!api.isActive(2)){T.reason='red_dot_clear';return;}
    const bag=W._Ba?._Ic?._aQ?.ins,rpc=W._Ba?._Ic?._oJ?.instance;
    if(T.pending){
      const p=T.pending,row=bag?.getItemsByBagType?.(0)?.find(item=>Number(item?.[0])===p.id&&String(item?.[2]??'')===p.uid),count=Number(row?.[1]??0);
      if(count<p.before){T.pending=null;T.blocked.delete(p.id+'/'+p.uid);T.reason='server_inventory_acknowledged';T.used++;S.confirmed++;return;}
      if(Date.now()-p.at>20000){T.blocked.add(p.id+'/'+p.uid);T.pending=null;T.reason='ack_timeout_no_retry';T.skipped++;}
      else{T.blocking=true;T.reason='waiting_inventory_ack';return;}
    }
    if(!S.enabled||!owned()||!blessingContext()||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)||W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true){T.reason='waiting_safe_context';return;}
    const state=inventoryUseState();T.probe={reason:state.reason,choice:state.choice??null,inspected:state.inspected?.slice(0,40)??[]};
    if(!state.ready){T.reason=state.reason;return;}
    if(Date.now()-T.lastSend<2000){T.blocking=true;T.reason='request_cooldown';return;}
    T.pending={...state.choice,before:state.choice.count,at:Date.now()};T.lastSend=T.pending.at;T.blocking=true;T.reason='waiting_inventory_ack';S.sent++;
    try{rpc.c2sUseBagItem(Number(state.choice.uid),state.choice.id,1);}
    catch(e){T.blocked.add(state.choice.id+'/'+state.choice.uid);T.pending=null;T.blocking=false;T.reason='send_error_no_retry';S.lastError=String(e);}
  }
  const smeltSpecs={
    equip:{redId:119,event:5081,items:()=>W._Ba?._Ic?._aQ?.ins?.getCanFusionItems?.(),rpc:()=>W._Ba?._Ic?._oJ?.instance,method:'c2sOneKeyFusion'},
    holy:{redId:195,event:5765,items:()=>W._Ba?._MT?.immortalsEquipSb?._Mtt?.ins?.getSmeltRank?.(),rpc:()=>W._Ba?._MT?.immortalsEquipSb?._xtt?.ins,method:'oneKeySmelt'},
    pet:{redId:850,event:6297,items:()=>W._Ba?._Ic?._aQ?.ins?.getAnmlFusions?.(),rpc:()=>W._Ba?._Ol?._C0n?.ins,method:'oneKeyResolve'}
  };
  const smeltAckOwner={},smeltAckCallbacks={};
  let smeltAckEventsReady=false;
  function installSmeltAckEvents(){
    if(smeltAckEventsReady)return true;
    const notify=W._Sa?.notify;if(typeof notify?.on!=='function')return false;
    try{for(const [key,spec]of Object.entries(smeltSpecs)){const callback=()=>{S.smelt[key].ack++;};smeltAckCallbacks[key]=callback;notify.on(spec.event,smeltAckOwner,callback);}smeltAckEventsReady=true;return true;}
    catch(e){S.lastError=String(e);return false;}
  }
  function smeltState(key){
    const spec=smeltSpecs[key],list=spec?.items?.();
    if(!spec||!Array.isArray(list))return {ready:false,reason:'waiting_smelt_list'};
    const candidates=list.filter(row=>Array.isArray(row)&&row[2]!=null&&Number.isFinite(Number(row[2]))&&
      (key!=='holy'||!(Array.isArray(row?.[4]?.[1])&&row[4][1].length>0)));
    const ids=[...new Set(candidates.map(row=>Number(row[2])))];
    return {ready:ids.length>0,reason:ids.length?'smelt_items_ready':'no_native_eligible_items',ids,signature:JSON.stringify(ids)};
  }
  function runSmelt(key){
    const T=S.smelt[key],spec=smeltSpecs[key];if(!T||!spec)return;
    T.blocking=false;
    if(T.pending){
      const after=smeltState(key);
      if(after.signature&&after.signature!==T.pending.before){T.pending=null;T.blocked=null;T.reason='server_inventory_acknowledged';S.confirmed++;return;}
      if(T.ack>T.pending.ackBefore){T.blocked={before:T.pending.before,at:T.pending.at};T.pending=null;T.reason='server_ack_list_stale_no_retry';S.confirmed++;return;}
      if(Date.now()-T.pending.at>25000){T.blocked={before:T.pending.before,at:T.pending.at};T.pending=null;T.reason='ack_timeout_no_retry';}
      else{T.blocking=true;T.reason='waiting_server_ack';return;}
    }
    if(!S.enabled||!api.isActive(spec.redId)){T.reason='red_dot_clear';return;}
    if(!owned()||!svipContext()||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)||W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true){T.reason='waiting_safe_context';return;}
    if(Object.entries(S.smelt).some(([other,task])=>other!==key&&task.pending)){T.reason='waiting_other_smelt_ack';return;}
    installSmeltAckEvents();
    const state=smeltState(key);
    if(T.blocked){if(!state.signature||state.signature===T.blocked.before){T.reason='ack_timeout_no_retry';return;}T.blocked=null;}
    if(!state.ready){T.reason=state.reason;return;}
    if(Date.now()-T.lastSend<2500){T.blocking=true;T.reason='request_cooldown';return;}
    const rpc=spec.rpc?.();if(typeof rpc?.[spec.method]!=='function'){T.reason='waiting_smelt_rpc';return;}
    T.pending={before:state.signature,ackBefore:T.ack,at:Date.now(),ids:state.ids.slice()};T.lastSend=T.pending.at;T.blocking=true;T.reason='waiting_server_ack';S.sent++;
    try{if(key==='pet')rpc[spec.method]([state.ids]);else rpc[spec.method](state.ids);}
    catch(e){T.blocked={before:state.signature,at:T.pending.at};T.pending=null;T.blocking=false;T.reason='send_error_no_retry';S.lastError=String(e);}
  }
  function composeRecipeRows(kind){
    const cfg=W._ft?._NZ?.ins;
    if(typeof cfg?.getComposeCfgByTclass==='function'){
      const rows=cfg.getComposeCfgByTclass(kind);if(Array.isArray(rows))return rows.filter(Array.isArray);
    }
    const rows=W._Sa?.getCfg?.('item_compose');
    return Array.isArray(rows)?rows.filter(row=>Array.isArray(row)&&Number(row?.[3]?.[0])===kind):[];
  }
  function composeCandidates(kind){
    const bag=W._Ba?._Ic?._aQ?.ins,game=W.KVPV_MAIN_SOLO?.config??{};
    if(bag?.isBagInited!==true||typeof bag?.getItemCountById!=='function'||typeof bag?.getItemsById!=='function')return {ready:false,reason:'waiting_compose_bag'};
    const excluded=new Set([...(game.composeExcludedRecipes??[])].map(String)),protectedIds=new Set([...(game.composeProtectedItems??[])].map(String));
    const candidates=[];
    for(const row of composeRecipeRows(kind)){
      const id=Number(row?.[0]),result=Number(row?.[1]),materials=row?.[6];
      if(!Number.isSafeInteger(id)||id<=0||!Number.isSafeInteger(result)||result<=0||Number(row?.[3]?.[0])!==kind||excluded.has(String(id))||
        protectedIds.has(String(result))||!Array.isArray(materials)||materials.length<1||materials.length>4)continue;
      if(typeof W._et?.getStageById==='function'&&Number(W._et.getStageById(result))===4)continue;
      const uidList=[],counts=[],matIds=[];let good=true;
      for(const material of materials){
        const itemId=Number(material?.[0]),need=Number(material?.[1]);
        if(!Number.isSafeInteger(itemId)||itemId<=0||!Number.isSafeInteger(need)||need<=0||matIds.includes(itemId)||protectedIds.has(String(itemId))){good=false;break;}
        const name=String(W._et?.getNameById?.(itemId)??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
        if(name.includes('da than trang')||name.includes('than trang')){good=false;break;}
        const keep=Math.max(0,Number(game.composeKeepByItemId?.[itemId])||0),count=Number(bag.getItemCountById(itemId)),stacks=bag.getItemsById(itemId);
        if(!Number.isFinite(count)||count-keep<need||!Array.isArray(stacks)||!stacks.length||!Number.isFinite(Number(stacks[0]?.[1]))||Number(stacks[0]?.[1])<need||!Number.isSafeInteger(Number(stacks[0]?.[2]))||Number(stacks[0]?.[2])<=0){good=false;break;}
        uidList.push(stacks[0][2]);matIds.push(itemId);counts.push(count);
      }
      if(!good)continue;
      const signature=JSON.stringify([id,result,matIds,counts,uidList]);
      if(S.compose.blocked.get(id)===signature)continue;
      if(S.compose.blocked.has(id))S.compose.blocked.delete(id);
      candidates.push({id,result,kind,uidList,matIds,counts,signature});
    }
    return {ready:candidates.length>0,reason:candidates.length?'recipe_materials_available':'no_recipe_with_owned_materials',candidates};
  }
  let composeAckCallback=null,composeAckOwner=null;
  function installComposeAck(){
    if(composeAckCallback)return true;
    const notify=W._Sa?.notify;if(typeof notify?.on!=='function')return false;
    composeAckOwner={};composeAckCallback=()=>{const reply=W._Ba?._Zgt?._n6t?.ins?.ComposeReply;S.compose.ack++;S.compose.reply=Array.isArray(reply)?Number(reply[0]):null;};
    try{notify.on(5225,composeAckOwner,composeAckCallback);return true;}catch(e){composeAckCallback=null;composeAckOwner=null;S.lastError=String(e);return false;}
  }
  function runCompose(kind){
    const T=S.compose,redId=kind===1?48:49;T.blocking=false;
    if(T.pending){
      if(T.ack>T.pending.ackBefore){
        const p=T.pending,code=T.reply,current=composeCandidates(p.kind),fresh=current.candidates?.find(row=>row.id===p.recipe.id);
        T.pending=null;T.blocking=false;
        if(code===0){const stale=fresh?.signature===p.recipe.signature;if(stale){T.blocked.set(p.recipe.id,p.recipe.signature);T.blockedUntil=Date.now()+5000;}else T.blocked.delete(p.recipe.id);T.confirmed++;S.confirmed++;T.reason=stale?'server_ack_waiting_inventory_refresh':'server_acknowledged';}
        else{T.blocked.set(p.recipe.id,fresh?.signature??p.recipe.signature);T.failed++;T.reason='server_rejected_recipe_'+String(T.reply);}
        return;
      }
      if(Date.now()-T.pending.at>18000){const p=T.pending;T.blocked.set(p.recipe.id,p.recipe.signature);T.pending=null;T.blockedUntil=Date.now()+15*60*1000;T.failed++;T.reason='ack_timeout_no_retry';return;}
      else{T.blocking=true;T.reason='waiting_compose_ack';return;}
    }
    if(!S.enabled||!api.isActive(redId)){T.reason='red_dot_clear';return;}
    if(!owned()||!svipContext()||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)||W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true){T.reason='waiting_safe_context';return;}
    if(Date.now()<T.blockedUntil){T.reason='ack_timeout_backoff';return;}
    if(T.pending){T.reason='waiting_other_compose_ack';return;}
    if(Date.now()-T.lastSend<1800){T.blocking=true;T.reason='request_cooldown';return;}
    if(!installComposeAck()){T.reason='waiting_compose_ack_api';return;}
    const state=composeCandidates(kind);T.probe={kind,reason:state.reason,available:state.candidates?.length??0,recipes:state.candidates?.slice(0,20).map(row=>row.id)??[]};
    const recipe=state.candidates?.[0];if(!recipe){T.reason=state.reason;return;}
    if(typeof W._v?.ins?.send!=='function'){T.reason='waiting_native_compose_rpc';return;}
    T.pending={kind,recipe,ackBefore:T.ack,at:Date.now()};T.lastSend=T.pending.at;T.blocking=true;T.reason='waiting_compose_ack';S.sent++;
    try{W._v.ins.send('TdKp',[recipe.id,recipe.uidList,1,0]);}
    catch(e){T.blocked.set(recipe.id,recipe.signature);T.pending=null;T.blocking=false;T.failed++;T.reason='send_error_no_retry';S.lastError=String(e);}
  }
  function thanThuStrengthState(){
    const model=W._Ba?._Ol?._M0n?.ins,cfg=W._ft?._CZ?.ins,rpc=W._Ba?._Ol?._C0n?.ins;
    if(!model||!Array.isArray(cfg?.datas)||typeof model.canStrength!=='function'||
       typeof model.getAnmlInfo!=='function'||typeof rpc?.anmlSptStrth!=='function')
      return {ready:false,reason:'waiting_than_thu_strength_model'};
    const animals=cfg.datas.map(row=>Number(row?.[1])).filter(id=>Number.isSafeInteger(id)&&id>0);
    const signature=JSON.stringify([model.animalCrystal,animals.map(id=>{
      const info=model.getAnmlInfo(id),parts=Array.isArray(info?.[3])?info[3].map(row=>[row?.[0],row?.[1]?.[8]?.[3]]):null;
      return [id,parts];
    })]);
    for(const id of animals){
      if(!model.getAnmlInfo(id))continue;
      let ready=false;try{ready=model.canStrength(id)===true;}catch{}
      if(ready)return {ready:true,reason:'ready',signature,choice:{animalId:id,crystal:Number(model.animalCrystal)}};
    }
    return {ready:false,reason:'no_owned_animal_strength_cost_available',signature};
  }
  function runThanThuStrength(){
    const T=S.thanThuStrength;T.blocking=false;
    if(T.pending){
      const after=thanThuStrengthState();
      if(after.signature&&after.signature!==T.pending.before){T.pending=null;T.blocked=null;T.reason='server_acknowledged';S.confirmed++;return;}
      if(Date.now()-T.pending.at>25000){T.blocked={before:T.pending.before,at:T.pending.at};T.pending=null;T.reason='ack_timeout_no_retry';}
      else{T.blocking=true;T.reason='waiting_server_ack';return;}
    }
    if(!S.enabled||!api.isActive(559)){T.reason='red_dot_clear';return;}
    if(!owned()||!svipContext()||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)||W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true){T.reason='waiting_safe_context';return;}
    const state=thanThuStrengthState();
    if(T.blocked){if(!state.signature||state.signature===T.blocked.before){T.reason='ack_timeout_no_retry';return;}T.blocked=null;}
    if(!state.ready){T.reason=state.reason;return;}
    if(Date.now()-T.lastSend<1800){T.blocking=true;T.reason='request_cooldown';return;}
    T.pending={before:state.signature,at:Date.now(),choice:state.choice};T.lastSend=T.pending.at;T.blocking=true;T.reason='waiting_server_ack';S.sent++;
    try{W._Ba._Ol._C0n.ins.anmlSptStrth(state.choice.animalId);}
    catch(e){T.blocked={before:state.signature,at:T.pending.at};T.pending=null;T.blocking=false;T.reason='send_error_no_retry';S.lastError=String(e);}
  }
  function moshenState(redId) {
    const model=W._Ba?._u3?._YQ?.ins,rpc=W._Ba?._u3?._ern?.ins;
    const bag=W._Ba?._Ic?._aQ?.ins;
    if(!model||typeof bag?.getItemCountById!=='function'||!rpc)return {ready:false,reason:'waiting_moshen_model'};
    if(redId===657){
      const level=Number(model.bloodLineage),exp=Number(model.bloodLineageExp),item=Number(model._NOi);
      const cfg=W._ft?._nXn?.ins;
      if(!Number.isSafeInteger(level)||level<0||!Number.isFinite(exp)||!Number.isSafeInteger(item)||item<=0||
        typeof cfg?.getCfgByLv!=='function'||typeof rpc.SpiritEquipBloodLineage!=='function')return {ready:false,reason:'waiting_bloodline_data'};
      const next=cfg.getCfgByLv(level+1),have=Number(bag.getItemCountById(item));
      return {ready:api.isActive(657)&&!!next&&have>=1,reason:have<1?'waiting_bloodline_material':'no_bloodline_upgrade',
        signature:JSON.stringify([level,exp,have]),level,exp,item,have};
    }
    const exp=Number(model.soulEatingexp?.()),showId=Number(model.msShowid);
    const showCfg=W._ft?._sSn?.ins?.getInfoByShowid?.(showId),itemType=Number(showCfg?.[1]??1);
    if(!Number.isFinite(exp)||typeof model.checkSHRP!=='function'||typeof model.checkQHPartRP!=='function'||
      typeof model.soulEatingpartlvdic!=='function'||typeof model.getQHItemByPart!=='function'||
      typeof rpc.SpiritEquipOneKeySoulEatingUP!=='function')return {ready:false,reason:'waiting_soul_force_data'};
    const parts=Array.from({length:6},(_,i)=>{
      const id=i+1,level=Number(model.soulEatingpartlvdic(id))||0;
      return {id,level,equipped:!!model.getQHItemByPart(itemType,id),ready:model.checkQHPartRP(itemType,id)===true};
    });
    const readyParts=parts.filter(part=>part.ready).map(part=>part.id),nativeReady=model.checkSHRP()===true;
    const signature=JSON.stringify([exp,showId,itemType,parts.map(part=>[part.id,part.level,part.equipped,part.ready])]);
    return {ready:api.isActive(656)&&exp>0&&nativeReady&&readyParts.length>0,
      reason:exp<=0?'waiting_soul_force':readyParts.length?'ready':'no_soul_eating_upgrade',signature,exp,showId,itemType,parts,readyParts};
  }
  function runMoshen(redId) {
    const T=redId===657?S.bloodline:S.soulEating;T.blocking=false;
    if(!S.enabled||!api.isActive(redId)){T.reason='red_dot_clear';T.pending=null;T.blocked=null;return;}
    if(!owned()||!svipContext()||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)||W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true){T.reason='waiting_safe_context';return;}
    if(T.pending){
      const p=moshenState(redId);
      if(p.signature&&p.signature!==T.pending.before){T.pending=null;T.blocked=null;T.reason='server_acknowledged';S.confirmed++;return;}
      if(Date.now()-T.pending.at>25000){T.blocked={before:T.pending.before,at:T.pending.at};T.pending=null;T.reason='ack_timeout_no_retry';}
      else{T.blocking=true;T.reason='waiting_server_ack';return;}
    }
    const p=moshenState(redId);
    if(T.blocked){if(!p.signature||p.signature===T.blocked.before){T.reason='ack_timeout_no_retry';return;}T.blocked=null;}
    if(!p.ready){T.reason=p.reason;return;}
    if(Date.now()-T.lastSend<1800){T.blocking=true;T.reason='request_cooldown';return;}
    T.pending={before:p.signature,at:Date.now()};T.lastSend=T.pending.at;T.blocking=true;T.reason='waiting_server_ack';S.sent++;
    try{
      const rpc=W._Ba._u3._ern.ins;
      if(redId===657)rpc.SpiritEquipBloodLineage();
      else rpc.SpiritEquipOneKeySoulEatingUP();
    }catch(e){T.blocked={before:p.signature,at:T.pending.at};T.pending=null;T.blocking=false;T.reason='send_error_no_retry';S.lastError=String(e);}
  }
  function maThanEntryState() {
    const m=W._Ba?._Dvt?._Hvt?.ins,team=W._Ba?._MT?.the_secret_of_the_stars?._Gvt?.instance,cfg=W._ft?._xUt?.ins,blood=W._Ba?._u3?._YQ?.ins;
    const scene=Number(W._Ba?._$a?.SceneUtil?.curScene),into=W._Ba?._$a?._yo?.ins?.intoSce;
    if(!m||!cfg||typeof cfg.getBossFloorInfo!=='function'||typeof cfg.getCopyInfo!=='function'||
      typeof cfg.getBloodFloor!=='function'||typeof team?.getLineInfos!=='function'||typeof m.checkLineRp!=='function')
      return {ready:false,reason:'waiting_ma_than_native_data'};
    const challenge=Number(m.challengePhyStren),unlock=Number(m.unLockLv),bloodFloor=Number(cfg.getBloodFloor(blood?.bloodLineage));
    const active=scene===55&&Number(into?.[0])===2711;
    const floors=Array.isArray(cfg.floors)?cfg.floors.map(Number).filter(Number.isSafeInteger):[];
    let selected=null;
    if(Number.isFinite(unlock)&&Number.isFinite(bloodFloor)){
      const maxFloor=Math.min(Math.max(0,Math.trunc(unlock)),Math.max(0,...floors));
      for(let floor=maxFloor;floor>=1&&!selected;floor--){
        for(let difficulty=3;difficulty>=1&&!selected;difficulty--){
          const row=cfg.getBossFloorInfo(floor,difficulty),level=Number(row?.[1]),copy=Number.isSafeInteger(level)?cfg.getCopyInfo(2711,level):null;
          if(!row||!Number.isSafeInteger(level)||level<=0||!copy||bloodFloor<Number(copy?.[2])-1)continue;
          const lines=team.getLineInfos(2711,level),options=[];
          if(Array.isArray(lines))for(const item of lines){
            const line=Number(item?.[0]),state=Number(item?.[1]);
            if(!Number.isSafeInteger(line)||line<0||state===2||m.checkLineRp(2711,level,line,false)!==true)continue;
            options.push({line,occupancy:Number(item?.[2])||0});
          }
          options.sort((a,b)=>b.occupancy-a.occupancy);
          if(options.length)selected={floor,difficulty,level,line:options[0].line,occupancy:options[0].occupancy};
        }
      }
    }
    const signature=JSON.stringify([scene,Number(into?.[0]),Number(into?.[3]),challenge,Number(m.curFloor),Number(m.curDif)]);
    return {ready:api.isActive(682)&&challenge>0&&!active&&!!selected,reason:active?'already_in_ma_than':challenge<=0?'no_free_challenge_stamina':!selected?'no_open_highest_floor_line':'ready',
      active,scene,map:Number(into?.[0]),challenge,bloodFloor,unlock,selected,signature};
  }
  function runMaThan() {
    const T=S.maThan,now=Date.now(),rpc=W._Ba?._sst?._Cht?.inst;
    T.blocking=false;
    if(T.pending){
      const state=maThanEntryState(),p=T.pending;
      if(state.active&&Number(state.map)===2711&&Number(W._Ba?._MT?.the_secret_of_the_stars?._Gvt?.instance?.curMapLvScene)===p.level){
        T.pending=null;T.blocked=null;T.blocking=false;T.reason='highest_floor_entry_acknowledged';T.confirmed++;S.confirmed++;return;
      }
      if(now-p.at>90000){T.blocked={...p};T.pending=null;T.blocking=false;T.reason='entry_ack_timeout_no_retry';return;}
      T.blocking=true;T.reason='waiting_ma_than_entry_ack';return;
    }
    if(T.blocked){T.reason='entry_ack_timeout_no_retry';return;}
    if(!S.enabled||!owned()||!api.isActive(682)){T.reason='red_dot_clear';return;}
    if(W._Ba?._$a?.SceneUtil?.isCommonScene!==true||W._Ba?._$a?._yo?.ins?.isInMission===true||
      now<Number(W.__KVPV_USER_UI_UNTIL||0)||W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true||
      W.KVPV?.core?.scene?.status?.()?.owner||W.KVPV_EVENT_PRIORITY?.hold?.()) {T.reason='waiting_safe_common_scene';return;}
    const state=maThanEntryState();
    if(!state.ready){T.reason=state.reason;return;}
    const clone=String(W.KVPV_DAILY?.config?.tinhThanCloneId||'10228867268941').trim();
    if(!/^[1-9]\d{4,24}$/.test(clone)||clone===String(W.__KVPV_OWN_ACTOR_ID||'')){T.reason='waiting_configured_clone_id';return;}
    if(typeof rpc?.rqEtScene!=='function'){T.reason='native_ma_than_entry_unavailable';return;}
    if(now-T.lastSend<1800){T.blocking=true;T.reason='request_cooldown';return;}
    const choice=state.selected;
    T.pending={at:now,floor:choice.floor,difficulty:choice.difficulty,level:choice.level,line:choice.line,before:state.signature};
    T.selected={...choice};T.lastSend=now;T.blocking=true;T.reason='waiting_ma_than_entry_ack';S.sent++;
    try{rpc.rqEtScene(2711,choice.level,[],choice.line);}
    catch(e){T.blocked={...T.pending};T.pending=null;T.blocking=false;T.reason='entry_send_error_no_retry';S.lastError=String(e);}
  }
  function magicQuickState() {
    const model=W._Ba?._Jtt?._ant?.ins,rpc=W._Ba?._Jtt?._unt?.ins;
    const moneyModel=W._Ba?._rJ?._O$?.ins,cfg=W._ft?._JW?.ins;
    if(!Array.isArray(model?.spcialSkills)||!model.spcialSkills.length||typeof model.checkLvUp!=='function'||
      typeof model.getKdgeInfoById!=='function'||typeof cfg?.zq!=='function'||typeof moneyModel?.getMoneyById!=='function'||
      typeof rpc?.addSkillLevelOfAll!=='function')return {ready:false,reason:'waiting_magic_skill_model'};
    const max=Number(model.maxlv),money=Number(moneyModel.getMoneyById(90530001));
    if(!Number.isFinite(max)||!Number.isFinite(money)||money<0)return {ready:false,reason:'waiting_magic_currency'};
    const skills=model.spcialSkills.map((row,index)=>({id:Number(row?.[0]),level:Number(row?.[1]),index}));
    const signature=JSON.stringify([Number(model.power),skills.map(({id,level})=>[id,level])]);
    const canRaise=skills.some(skill=>{
      if(!Number.isSafeInteger(skill.id)||skill.id<=0||!Number.isSafeInteger(skill.level)||skill.level<0||
        skill.level>=max||model.checkLvUp(skill.index)!==true)return false;
      const cfgId=10000*skill.id+skill.level,info=model.getKdgeInfoById(cfgId);
      const cost=Number(cfg.zq(info,cfgId));
      return !!info&&Number.isFinite(cost)&&cost>=0&&cost<=money;
    });
    return {ready:api.isActive(19)&&canRaise,reason:canRaise?'ready':'no_eligible_magic_skill',signature,money,skills,max};
  }
  function runMagicQuick() {
    const T=S.magicQuick;T.blocking=false;
    if(!S.enabled||!api.isActive(19)){T.reason='red_dot_clear';T.pending=null;T.blocked=null;return;}
    if(!owned()||!svipContext()||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)||W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true){T.reason='waiting_safe_context';return;}
    if(T.pending){
      const p=magicQuickState();
      if(p.signature&&p.signature!==T.pending.before){T.pending=null;T.blocked=null;T.reason='server_acknowledged';S.confirmed++;return;}
      if(Date.now()-T.pending.at>25000){T.blocked={before:T.pending.before,at:T.pending.at};T.pending=null;T.reason='ack_timeout_no_retry';}
      else{T.blocking=true;T.reason='waiting_server_ack';return;}
    }
    const p=magicQuickState();
    if(T.blocked){if(!p.signature||p.signature===T.blocked.before){T.reason='ack_timeout_no_retry';return;}T.blocked=null;}
    if(!p.ready){T.reason=p.reason;return;}
    if(Date.now()-T.lastSend<1800){T.blocking=true;T.reason='request_cooldown';return;}
    T.pending={before:p.signature,at:Date.now()};T.lastSend=T.pending.at;T.blocking=true;T.reason='waiting_server_ack';S.sent++;
    try{W._Ba._Jtt._unt.ins.addSkillLevelOfAll();}
    catch(e){T.blocked={before:p.signature,at:T.pending.at};T.pending=null;T.blocking=false;T.reason='send_error_no_retry';S.lastError=String(e);}
  }
  function faBaoQuickState() {
    const model=W._Ba?._rnt?._vnt?.ins,cfg=W._ft?._s$?.ins,bag=W._Ba?._Ic?._aQ?.ins;
    const network=typeof _v!=='undefined'?_v:W._v;
    if(typeof model?.getRedDot!=='function'||typeof model?.getAmuletRefineQuaArr!=='function'||
      typeof model?.getFaBaoLv!=='function'||typeof cfg?.getMaxLvById!=='function'||
      typeof bag?.getItemCountById!=='function'||typeof network?.ins?.send!=='function')
      return {ready:false,reason:'waiting_fabao_model'};
    const red=model.getRedDot();
    if(!Array.isArray(red))return {ready:false,reason:'waiting_fabao_red_data'};
    const choices=[];
    for(let group=0;group<red.length;group++){
      if(red[group]!==true&&red[group]!==1)continue;
      const rows=model.getAmuletRefineQuaArr(group);
      if(!Array.isArray(rows))continue;
      for(const row of rows){
        const id=Number(row?.[0]),level=Number(model.getFaBaoLv(id)),max=Number(cfg.getMaxLvById(id));
        const required=Number(row?.[3]?.[1]),alt=Number(row?.[4]);
        const have=Number(bag.getItemCountById(id))+(Number.isSafeInteger(alt)&&alt>0?Number(bag.getItemCountById(alt)):0);
        if(Number.isSafeInteger(id)&&id>0&&Number.isSafeInteger(level)&&level>0&&Number.isFinite(max)&&level<max&&
          Number.isFinite(required)&&required>0&&Number.isFinite(have)&&have>=required)choices.push([id,level,have,required]);
      }
    }
    const rise=model.getAmuletRise?.(),refine=model.getAmuletRefine?.();
    const signature=JSON.stringify([rise,refine,choices.map(row=>row.slice(0,2))]);
    return {ready:api.isActive(14)&&choices.length>0,reason:choices.length?'ready':'no_eligible_fabao_upgrade',signature,choices};
  }
  function runFaBaoQuick() {
    const T=S.faBaoQuick;T.blocking=false;
    if(!S.enabled||!api.isActive(14)){T.reason='red_dot_clear';T.pending=null;T.blocked=null;return;}
    if(!owned()||!svipContext()||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)||W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true){T.reason='waiting_safe_context';return;}
    if(T.pending){
      const p=faBaoQuickState();
      if(p.signature&&p.signature!==T.pending.before){T.pending=null;T.blocked=null;T.reason='server_acknowledged';S.confirmed++;return;}
      if(Date.now()-T.pending.at>25000){T.blocked={before:T.pending.before,at:T.pending.at};T.pending=null;T.reason='ack_timeout_no_retry';}
      else{T.blocking=true;T.reason='waiting_server_ack';return;}
    }
    const p=faBaoQuickState();
    if(T.blocked){if(!p.signature||p.signature===T.blocked.before){T.reason='ack_timeout_no_retry';return;}T.blocked=null;}
    if(!p.ready){T.reason=p.reason;return;}
    if(Date.now()-T.lastSend<1800){T.blocking=true;T.reason='request_cooldown';return;}
    T.pending={before:p.signature,at:Date.now()};T.lastSend=T.pending.at;T.blocking=true;T.reason='waiting_server_ack';S.sent++;
    try{(typeof _v!=='undefined'?_v:W._v).ins.send('TXio',[0]);}
    catch(e){T.blocked={before:p.signature,at:T.pending.at};T.pending=null;T.blocking=false;T.reason='send_error_no_retry';S.lastError=String(e);}
  }
  function observeSvip() {
    if (!svipPending) return;
    try {
      const after = svipProbe()?.signature;
      if (after !== null && after !== undefined && String(after) !== svipPending.before) {
        svipPending = null; S.confirmed++;
      } else if (Date.now() - svipPending.at > 30000) svipPending.reason = 'waiting_ack_no_retry';
    } catch (e) { svipPending.reason = 'probe_error_no_retry'; svipPending.error = String(e); }
  }
  function runSvip() {
    observeSvip();
    if (svipPending || !owned()) return;
    if (Date.now() < Number(W.__KVPV_USER_UI_UNTIL || 0)) { S.reason = 'user_using_ui'; return; }
    if (W.KVPV_CONFIRM_POPUPS?.beforeTask?.() === true) { S.reason = 'priority_popup'; return; }
    if (!svipContext()) return;
    const state = svipProbe();
    if (state?.ready !== true || state.signature == null) return;
    const rpc = svipRpc();
    svipPending = { before: String(state.signature), at: Date.now(), reason: 'waiting_server' };
    S.sent++;
    try {
      const result = state.level ? rpc.getSvipAward(state.level) : rpc.getSvipDayAward();
      if (result && typeof result.catch === 'function') result.catch(e => { svipPending.reason = 'send_error_no_retry'; svipPending.error = String(e); });
    } catch (e) { svipPending.reason = 'send_error_no_retry'; svipPending.error = String(e); S.lastError = String(e); }
  }
  function runExpGroup(){
    const T=S.expGroup;T.blocking=false;
    if(!S.enabled||!api.isActive(53)){T.reason='red_dot_clear';return;}
    if(!owned()||!svipContext()||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)||W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true){T.reason='waiting_safe_context';return;}
    const coordinator=W.KVPV_TEAM_COORDINATOR,state=coordinator?.status?.();
    if(state?.session?.type===2){const main=String(W.KVPV_DAILY?.config?.tinhThanMainId||'10228867268946'),pair=[main,String(W.KVPV_DAILY?.config?.tinhThanCloneId||'10228867268941')].sort();if(state.session.leader===main&&state.session.ids?.length===2&&pair.every(id=>state.session.ids.includes(id))){T.blocking=true;T.reason=String(state.reason||'waiting_group_dungeon_team');return;}T.reason='other_exp_team_preserved';return;}
    const result=coordinator?.startExpGroup?.();
    T.blocking=result?.started===true&&result?.session?.type===2;
    T.reason=String(result?.reason||state?.reason||'waiting_team_coordinator');
  }
  function redActionInFlight(){
    const keys=['tienThe','xianwei','tienDan','runeResolve','weaponSoul','wingSoul','fashionSoul','armSoul','cloakSoul','bloodline','soulEating','maThan','magicQuick','faBaoQuick','transform','mount','linhThu','thanThuStrength','gearStrength','soulStone','soulForge','tombGear','tombBoss','treasureFree','inventoryUse','dailyCheckin','loginAwards','onlineReward','dailyMonster','payTurntableReward','happyFrenzy','mail','weekendConsume','jiuXiaoLing','thanhVanMeditation','adventure'];
    if(W.KVPV_DAILY_TRIAL?.status?.()?.inFlight===true)return true;
    if(svipPending||S.expGroup.blocking||!!S.weeklyWelfare.pending||S.adventure.blocking||api.isActive(110)||S.frontline.pending||S.frontline.reason==='fighting_frontline'||S.tombBoss.blocking||!!S.compose.pending||!!S.xianfu.pending||!!S.xianfuAppearance.pending||!!S.weaponIllusion.pending||!!S.appearanceIllusion.pending||Object.values(S.smelt).some(task=>task.pending&&task.blocking)||keys.some(key=>!!S[key]?.pending&&S[key]?.blocking===true))return true;
    const nav=W.KVPV_RED_NAVIGATOR?.status?.();
    if(nav?.pending===true||/^(opening_|waiting_.*panel|select_|waiting_native_)/.test(String(nav?.reason||'')))return true;
    const daily=W.KVPV_DAILY?.quickState?.();
    return !!daily?.running&&!['rảnh','ranh'].includes(String(daily.job||''));
  }
  function tick() {
    if (!S.enabled) return;
    const tickAt=Date.now();
    if(tickAt-lastTickAt<15)return;
    lastTickAt=tickAt;
    try {
      const tienTon=W.KVPV_TIEN_TON_AUTO?.status?.(),daily=W.KVPV_DAILY;
      try { daily?.tuVuotProgressTick?.(); }
      catch(e) { S.lastError=String(e?.stack??e);S.reason='tuvuot_observer_error';return; }
      if(tienTon?.enabled===true&&tienTon.withinHours===true&&Number(tienTon.challengeLeft)>0&&
        daily?.quickState?.()?.running===true&&daily?.config?.enableTienTonAuto!==false&&W.KVPV?.events?.config?.enabled!==false){
        S.reason='event_priority_tien_ton';return;
      }
      const dailyProgress=W.KVPV_DAILY?.redDotTick?.();
      if(dailyProgress?.eventPriority){S.reason='event_priority_'+String(dailyProgress.job||'scheduled');return;}
      const eventHold=W.KVPV_EVENT_PRIORITY?.hold?.();
      if(eventHold){S.reason='event_priority_'+(eventHold.mode||'auto')+'_'+String(eventHold.key||'scheduled');return;}
      const dailyTrial=W.KVPV_DAILY_TRIAL;
      if(dailyTrial){
        const trial=dailyTrial.sync?.()??dailyTrial.status?.();
        if(trial?.inFlight===true||dailyTrial.hasPriority?.()===true){
          S.reason='daily_trial_priority_'+String(trial?.phase||'ready');return;
        }
      }
      const expTeamState=W.KVPV_TEAM_COORDINATOR?.status?.();
      const expMainId=String(W.KVPV_DAILY?.config?.tinhThanMainId||'10228867268946'),expPair=[expMainId,String(W.KVPV_DAILY?.config?.tinhThanCloneId||'10228867268941')].sort(),expSession=expTeamState?.session;
      S.expGroup.blocking=expSession?.type===2&&expSession.leader===expMainId&&expSession.ids?.length===2&&expPair.every(id=>expSession.ids.includes(id));
      if(S.expGroup.blocking){S.expGroup.reason=String(expTeamState.reason||'group_dungeon_active');S.reason='group_exp_priority_'+S.expGroup.reason;return;}
      else if(!api.isActive(53))S.expGroup.reason='red_dot_clear';
      refreshThanhVanRedDots();
      refreshCloakRedDots();
      inspectRed();
      syncBuiltInHandlers();
      if(S.tombGear.pending)runTombGear();
      if(S.xianwei.pending)runXianwei();
      if(S.gearStrength.pending)runGearStrength();
      if(S.soulStone.pending)runSoulStone();
      if(S.soulForge.pending)runSoulForge();
      if(S.inventoryUse.pending)runInventoryUse();
      for(const key of Object.keys(S.smelt))if(S.smelt[key].pending)runSmelt(key);
      if(S.compose.pending)runCompose(S.compose.pending.kind);
      if(S.frontline.pending||[21,68].includes(frontlineScene()))runFrontline();
      if(S.tombBoss.pending||S.tombBoss.blocking)runTombBoss();
      if(S.treasureFree.pending)runTreasureFree(S.treasureFree.pending.redId);
      if(S.weeklyWelfare.pending)runWeekWelfare();
      if(S.jiuXiaoLing.pending)runJiuXiaoLing(S.jiuXiaoLing.pending.redId);
      if(S.weekendConsume.pending)runWeekendConsume();
      if(S.dailyCheckin.pending)runDailyCheckin();
      if(S.loginAwards.pending)runLoginAwards(S.loginAwards.pending.redId);
      if(S.marriage.pending)runMarriage(S.marriage.pending.redId);
      if(S.phucOa.pending)runPhucOa(S.phucOa.pending.redId);
      if(S.coBao.pending)runCoBao(S.coBao.pending.redId);
      else if(S.coBao.chainPlacement)runCoBao(159);
      if(S.onlineReward.pending)runOnlineReward();
      if(S.dailyMonster.pending)runDailyMonster();
      if(S.adventure.blocking)runAdventure();
      if(S.payTurntableReward.pending)runPayTurntableReward();
      if(S.happyFrenzy.pending)runHappyFrenzy();
      if(S.mail.pending||mailModel()?.hasEml)runMail();
      if(S.mail.pending){S.reason='red_dot_priority_mail';return;}
      if(S.maThan.pending)runMaThan();
      if(S.xianfu.pending?.redId===84)runXianfuTasks();
      else if(S.xianfu.pending)runXianfu(S.xianfu.pending.redId);
      if(S.xianfuAppearance.pending)runXianfuAppearance(S.xianfuAppearance.pending.redId);
      if(S.weaponIllusion.pending)runWeaponIllusion(S.weaponIllusion.pending.redId);
      if(S.appearanceIllusion.pending)runAppearanceIllusion(S.appearanceIllusion.pending.kind,S.appearanceIllusion.pending.redId);
      if(S.thanhVanMeditation.pending)runThanhVanMeditation(S.thanhVanMeditation.pending.redId);
      if(S.mount.pending||S.mount.bulkBless)runMount(S.mount.pending?.redId??12);
      if(S.linhThu.pending||S.linhThu.bulkBless)runLinhThu(S.linhThu.pending?.redId??3);
      try { W.KVPV_RED_NAVIGATOR?.sync?.(); } catch (e) { S.lastError = String(e); }
      try { W.KVPV_RED_DOT_TASKS?.tick?.(); } catch (e) { S.lastError = String(e?.stack ?? e); }
      const userBusy = Date.now() < Number(W.__KVPV_USER_UI_UNTIL || 0);
      const popup = W.KVPV_CONFIRM_POPUPS?.beforeTask?.() === true;
      if (!userBusy && !popup) {
        const extraIds=[...redActive].filter(id=>extras.has(id)&&!navigatorIds.has(id)&&redCatalog.get(id)?.automatic===true)
          .sort((a,b)=>{
            if(a===53||b===53)return a===53?-1:1;
            const ah=W.KVPV_RED_NAVIGATOR?.hierarchyFor?.(a)?.order,bh=W.KVPV_RED_NAVIGATOR?.hierarchyFor?.(b)?.order;
            return (Number.isFinite(ah)?ah:Number.MAX_SAFE_INTEGER)-(Number.isFinite(bh)?bh:Number.MAX_SAFE_INTEGER)||a-b;
          });
        for(const id of extraIds){extras.get(id)?.(id);if(id===53&&api.isActive(53)){S.reason='red_dot_priority_53_'+String(S.expGroup.reason||'waiting');return;}}
        if(!redActionInFlight()){
          const petBless=linhThuState(3);
          if(petBless.ready)runLinhThu(3);
          if(!S.linhThu.pending&&!S.linhThu.bulkBless&&mountState(12).ready)runMount(12);
        }
      }
      if(tickAt-auditAt>=250){
        redAudit = [...redActive].slice(0, 256).map(id => ({ id, handlers: handlersFor(id) }));
        auditAt=tickAt;
      }
      const pending = blockingRedIds();
      if (pending.length) {
        const scene = W._Ba?._$a, stage = W._Ba?._Co?._Mo?.ins;
        if (scene?.SceneUtil?.isCommonScene === true && scene?._yo?.ins?.isInMission !== true && stage?.auto === true) stage.auto = false;
        S.reason = 'red_dot_priority_' + pending.slice(0, 8).join('_'); return;
      }
      if(S.mail.pending){const stage=W._Ba?._Co?._Mo?.ins;if(stage?.auto===true)stage.auto=false;S.reason='red_dot_priority_mail';return;}
      if (userBusy) { S.reason = 'user_using_ui'; return; }
      if (popup) { S.reason = 'priority_popup'; return; }
      const scene = W._Ba?._$a, stage = W._Ba?._Co?._Mo?.ins;
      if (scene?.SceneUtil?.isCommonScene !== true || scene?._yo?.ins?.isInMission === true ||
          W._Ba?._rJ?._O$?.ins?.isDead === true || W.KVPV?.core?.scene?.status?.()?.owner ||
          W.KVPV?.stageGuard?.isLocked?.() === true || W.KVPV_EVENT_PRIORITY?.hold?.()) {
        S.reason = 'red_clear_waiting_safe_stage_context'; return;
      }
      if (!stage) { S.reason = 'red_clear_waiting_stage_module'; return; }
      if (daily?.tuVuotCanRun?.() !== true) {
        if(stage.auto===true)stage.auto=false;
        S.reason='red_clear_tuvuot_disabled_or_locked';return;
      }
      if (stage.auto !== true && daily?.tuVuotIdle?.() !== true && stage.auto !== true) {
        S.reason='red_clear_tuvuot_controller_not_ready';return;
      }
      S.reason = 'red_clear_auto_stage';
    } catch (e) { S.lastError = String(e?.stack ?? e); S.reason = 'error'; }
  }
  function stop() {
    S.enabled = false; S.reason = 'stopped';stopAdventure();
    restoreBulkBless(S.mount);restoreBulkBless(S.linhThu);
    if (S.timer !== null) (W.KVPV_V1?.timers?.clearInterval ?? W.clearInterval)(S.timer);
    if(S.xianfu.watcher){try{W._Sa?.notify?.off?.(5410,S.xianfu,S.xianfu.ackOk);W._Sa?.notify?.off?.(5411,S.xianfu,S.xianfu.ackErr);}catch{}S.xianfu.watcher=false;S.xianfu.ackOk=S.xianfu.ackErr=null;}
    if(smeltAckEventsReady){for(const [key,spec]of Object.entries(smeltSpecs)){try{W._Sa?.notify?.off?.(spec.event,smeltAckOwner,smeltAckCallbacks[key]);}catch{}}smeltAckEventsReady=false;}
    if(composeAckCallback){try{W._Sa?.notify?.off?.(5225,composeAckOwner,composeAckCallback);}catch{}composeAckCallback=null;composeAckOwner=null;}
    S.timer = null;
  }
  function start() {
    if (S.timer !== null) { S.enabled = true; S.adventure.enabled=true; return; }
    try { const m=W._Ba?._YJ?._WJ?.ins;if(m)m.bollZiDong=false; } catch {}
    try { const m=W._Ba?._OJ?._GJ?.inst;if(m)m._bolZD=false; } catch {}
    S.enabled = true; S.adventure.enabled=true; S.startedAt = Date.now(); redScanReady = false;
    const schedule = W.KVPV_V1?.timers?.setInterval ?? W.setInterval;
    if (typeof schedule === 'function') S.timer = schedule(tick, 15);
    tick();
  }
  function register(id, meta = {}) {
    const n = Number(id);
    const handler = typeof meta.handler === 'function' ? meta.handler : null;
    const automatic = handler ? meta.automatic === true : false;
    let route = meta.route || '';
    if (!handler && meta.automatic === true && !route.includes('thiếu handler')) route = route ? route + '; thiếu handler' : 'thiếu handler';
    redCatalog.set(n, { name: meta.name || 'Chưa ánh xạ', module: meta.module || (handler ? 'KVPV_RED_DOT_MODULE' : ''), route, automatic });
    if (handler && !navigatorIds.has(n)) extras.set(n, handler);
  }
  function syncBuiltInHandlers(){
    const tasks=W.KVPV_RED_DOT_TASKS,daily=W.KVPV_DAILY;
    const dispatch=typeof tasks?.dispatch==='function'?tasks.dispatch:
      typeof daily?.redDotDispatch==='function'?daily.redDotDispatch:null;
    const dispatchOwner=tasks?.dispatch===dispatch?tasks:daily,now=Date.now();
    if(dispatch===builtinDispatch&&dispatchOwner===builtinDispatchOwner&&now-builtinSyncAt<500)return;
    builtinDispatch=dispatch;builtinDispatchOwner=dispatchOwner;builtinSyncAt=now;
    register(141,{name:'Kỳ Ngộ – Thám Hiểm',module:'src/01-red-dot-module.js',route:'red dot 141; dispatch the verified adventure event-list workflow only while active; free native claims/exploration, wait for event-state ACK; no purchases',automatic:true,handler:runAdventure});
    for(let type=1;type<=4;type++){
      const id=202+type,name=['Thiên','Địa','Huyền','Hoàng'][type-1];
      register(id,{name:`Thánh Văn ${name} – Lĩnh Ngộ`,module:'src/01-red-dot-module.js',
        route:'native mediaCanUpByType red dot; require open feature, current level/material and remaining count; ComprehendStarBoard(type), wait for model ACK; no purchases',
        automatic:true,handler:()=>runThanhVanMeditation(id)});
    }
    if(dispatch)for(const id of [36,37,44,377])register(id,{
      name:({36:'Boss Nhóm',37:'Yêu Vương',44:'Boss Mãn Hoang',53:'Phó bản EXP',377:'Phó Bản Tiên Duyên'})[id],
      module:'src/03-daily-core.js',route:id===44?'red dot 44; game getMaxCCEnter() chọn tầng cao nhất đã mở, chỉ dùng thể lực sẵn có, đánh boss còn sống rồi thoát; không mua lượt/KNB':id===377?'red dot 377; tối đa hai lượt server đang cấp, không gộp và không mua lượt; chờ xác nhận mỗi lượt':'red-dot dispatch through verified task handler',automatic:true,
      handler:()=>dispatch.call(tasks?.dispatch===dispatch?tasks:daily,id)
    });
    register(53,{name:'Phó Bản Nhóm – EXP',module:'src/01-red-dot-module.js',route:'main red dot 53 → create EXP map 2091 room → invite configured clone → clone auto-accepts → start matchmaking once both configured accounts are present, even below 4 players; auto-start when the roster fills; no purchases or KNB',automatic:true,handler:runExpGroup});
    register(825,{name:'Boss Liên Server – Chúa Tể Thiên Mộ',module:'src/01-red-dot-module.js',route:'chỉ vào boss mà native checkOneRDByBossid xác nhận đang đỏ; tối đa 2 lượt/ngày, chỉ leftnum hiện có; không mua lượt hoặc tiêu KNB',automatic:true,handler:runTombBoss});
    register(325,{name:'Quà SVIP đủ điều kiện',module:'src/01-red-dot-module.js',route:'nhận tuần tự quà mốc SVIP hoặc Quà Ngày bằng RPC gốc; không nạp; chờ server ACK',automatic:true,handler:runSvip});
    register(21,{name:'Tiên Vị – Nhận nhiệm vụ hoàn thành',module:'src/01-red-dot-module.js',route:'red dot 21; native getTaskAward(id) for task rows in state 1; wait for Xianwei task ACK',automatic:true,handler:runXianwei});
    register(606,{name:'Thẻ Tuần Phúc Lợi – Nhận thưởng đã tích lũy',module:'src/01-red-dot-module.js',route:'native GetWeekCardReward() only while red dot 606 is active, card is valid, and accumulated reward count is positive; wait for card-state ACK; do not open or buy',automatic:true,handler:runWeekWelfare});
    register(375,{name:'Tiên Duyên – Nhiệm vụ cả đời',module:'src/01-red-dot-module.js',route:'nhận từng nhiệm vụ loại 2 ở trạng thái hoàn thành; chờ task-list ACK',automatic:true,handler:()=>runMarriage(375)});
    register(376,{name:'Tiên Duyên – Nhiệm vụ ngày',module:'src/01-red-dot-module.js',route:'nhận từng nhiệm vụ loại 1 ở trạng thái hoàn thành; chờ task-list ACK',automatic:true,handler:()=>runMarriage(376)});
    register(46,{name:'Thiên Kiếp – Nhận mảnh Cổ Bảo',module:'src/01-red-dot-module.js',route:'chỉ gọi getCpAward(mapId, level) khi panel Thiên Kiếp báo Nhấp Nhận; chờ awardLvs server ACK',automatic:true,handler:()=>runCoBao(46)});
    register(159,{name:'Cổ Bảo – Đặt mảnh đang sở hữu',module:'src/01-red-dot-module.js',route:'mở action 189 rồi gọi epFragment([id]) cho mảnh chưa đặt thuộc Cổ Bảo kế tiếp; chờ epFrgmtsDic server ACK',automatic:true,handler:()=>runCoBao(159)});
    register(377,{name:'Tiên Duyên – Phó Bản (tối đa 2 lượt)',module:'src/03-daily-core.js',route:'mở Phó Bản qua Nhẫn Cưới, dùng lượt miễn phí còn lại từng lượt và xác nhận server trước lượt tiếp theo; không mua lượt hoặc KNB',automatic:true,handler:()=>dispatch?.call(tasks?.dispatch===dispatch?tasks:daily,377)});
    register(378,{name:'Tiên Duyên – Bồi dưỡng Nhẫn Cưới',module:'src/01-red-dot-module.js',route:'AddMarryRingExp only when checkRingUPRP and owned item 81016 are available; wait for level/exp/inventory ACK',automatic:true,handler:()=>runMarriage(378)});
    register(379,{name:'Tiên Duyên – Bồi dưỡng thân mật',module:'src/01-red-dot-module.js',route:'AddMarryIntimacyExp only while native eligibility and owned item 81015 are confirmed; never purchase',automatic:true,handler:()=>runMarriage(379)});
    register(380,{name:'Tiên Duyên – Nhận thưởng thân mật',module:'src/01-red-dot-module.js',route:'GetMarryIntimacyLevelReward only for reached levels; wait for reward-level ACK',automatic:true,handler:()=>runMarriage(380)});
    register(382,{name:'Tiên Duyên – Kỹ năng Nhẫn Cưới',module:'src/01-red-dot-module.js',route:'LevelUpMarryRingSkill/OpenMarryRingSpecialSkill after owned-material or character-level checks; wait for skill ACK',automatic:true,handler:()=>runMarriage(382)});
    register(383,{name:'Tiên Duyên – Quà Cây Tiền',module:'src/01-red-dot-module.js',route:'GetMarryRewardCardReward only for already activated claimable rewards; never buy a card',automatic:true,handler:()=>runMarriage(383)});
    register(384,{name:'Tặng Quà – Tăng cấp vật phẩm hôn nhân',module:'src/01-red-dot-module.js',route:'promoteKeepsakeRank([id]) only when every configured cost is already owned and no KNB item is required; wait for rank ACK',automatic:true,handler:()=>runMarriage(384)});
    register(385,{name:'Tặng Quà – Tăng cấp vật phẩm hôn nhân',module:'src/01-red-dot-module.js',route:'promoteKeepsakeRank([id]) only when every configured cost is already owned and no KNB item is required; wait for rank ACK',automatic:true,handler:()=>runMarriage(385)});
    register(387,{name:'Phúc Oa – Bồi Dưỡng Tiên Linh',module:'src/01-red-dot-module.js',route:'onFuwaBaseInfoUpReq only after native next-level and owned-material checks; wait for child-level ACK',automatic:true,handler:()=>runPhucOa(387)});
    register(388,{name:'Phúc Oa – Bổ Sung',module:'src/01-red-dot-module.js',route:'onFuwaFeedReq for owned feed items only; wait for feedTimes ACK',automatic:true,handler:()=>runPhucOa(388)});
    register(370,{name:'Cửu Tiêu Lệnh – Thưởng cấp miễn phí',module:'src/01-red-dot-module.js',route:'native getJiuXiaoLingReward only for claimable free level rewards while goldenState is zero; wait for free-reward-level ACK; no purchase',automatic:true,handler:runJiuXiaoLing});
    register(371,{name:'Cửu Tiêu Lệnh – Nhiệm vụ giai đoạn hoàn thành',module:'src/01-red-dot-module.js',route:'native getStageTaskReward(id) for completed state-1 tasks only; wait for task-list ACK; no target navigation',automatic:true,handler:()=>runJiuXiaoLing(371)});
    register(372,{name:'Cửu Tiêu Lệnh – Nhiệm vụ mùa hoàn thành',module:'src/01-red-dot-module.js',route:'native getSeasonTaskReward(id) for completed state-1 tasks only; wait for task-list ACK; no target navigation',automatic:true,handler:()=>runJiuXiaoLing(372)});
    register(321,{name:'Cuối Tuần Vui Vẻ – Nhận quà tiêu phí',module:'src/01-red-dot-module.js',route:'native _Ba._dCi._wCi.instance.getAward(id) for claimable rows only while weekend consume is active; wait for arr state ACK; no purchases',automatic:true,handler:runWeekendConsume});
    register(257,{name:'Phúc lợi – Điểm danh ngày',module:'src/01-red-dot-module.js',route:'native TocT only while signState allows today attendance; wait for sign-state ACK; do not claim cumulative milestones',automatic:true,handler:runDailyCheckin});
    for(const id of loginAwardIds)register(id,{name:id===389?'Phúc Oa Tiên Kỹ / Quà Đăng Nhập':'Quà Đăng Nhập – Nhận thưởng tương ứng',module:'src/01-red-dot-module.js',route:'native getFestivalLoginReward(id) only for active login-event rows in state 1; one reward per ACK; no recharge or purchases',automatic:true,handler:id===389?runRed389:()=>runLoginAwards(id)});
    register(259,{name:'Phúc lợi – Quà Online',module:'src/01-red-dot-module.js',route:'native TBhT([id]) for one elapsed online reward at a time; wait for updateRewardReply ACK; no UI opening',automatic:true,handler:runOnlineReward});
    register(57,{name:'Hằng Ngày – Treo Máy Hằng Yêu và Boss Hằng Ngày',module:'src/01-red-dot-module.js',route:'native getXiangyaoReward([0]) after the daily monster kill threshold or ([1]) after the Boss Yêu Ma threshold; require remaining receive count and wait for receivedTimes server ACK; no purchase',automatic:true,handler:runDailyMonster});
    register(306,{name:'Vòng Quay Nạp – Nhận mốc thưởng miễn phí',module:'src/01-red-dot-module.js',route:'native getPayRewardReward() only for rewardList rows in claimable state; never call paid payRewardRun()',automatic:true,handler:runPayTurntableReward});
    register(346,{name:'Vui Vẻ Cuồng Nhiệt – Nhận nhiệm vụ và mốc điểm',module:'src/01-red-dot-module.js',route:'native getKuanghaiTaskAward(id) for completed tasks first; then getKuanghaiAward(id) for point milestones with state 1; wait for model ACK; no spending',automatic:true,handler:runHappyFrenzy});
    register(84,{name:'Nhiệm vụ Tiên Phủ – nhận hoàn thành/mốc năng động',module:'src/01-red-dot-module.js',route:'native getXianFuTaskAward([id]) or getXianFuActivaAward([index]); only completed tasks and reached milestones; await model ACK; no task teleport',automatic:true,handler:runXianfuTasks});
    for(const [id,tier] of weaponIllusionTiers)register(id,{name:`Ảo Hóa Thần Binh – ${weaponIllusionNames[tier]}${id>=642?'':' (ID cũ)'}`,module:'src/01-red-dot-module.js',route:`native Thần Binh mgcLv([showId]); use the matching ${weaponIllusionNames[tier]} tier red dot, validate native unlock/material gates, wait for model ACK`,automatic:true,handler:()=>runWeaponIllusion(id)});
    for(const kind of Object.keys(appearanceIllusionDefs)){const d=appearanceIllusionDefs[kind];for(let i=0;i<d.ids.length;i++){const id=d.ids[i],tier=d.tiers[i];register(id,{name:`Ảo Hóa ${appearanceIllusionName[kind]} – ${weaponIllusionNames[tier]}`,module:'src/01-red-dot-module.js',route:`native ${d.method}; tier ${weaponIllusionNames[tier]}, native eligibility and owned material check, wait for model ACK; no purchases`,automatic:true,handler:()=>runAppearanceIllusion(kind,id)});}}
    for(const [id,name] of [[635,'Ngoại Hình Tiên Phủ – Tăng cấp'],[636,'Ngoại Hình Tiên Phủ – Kỹ năng feed'],[637,'Ngoại Hình Tiên Phủ – Ảo Hóa'],[638,'Ngoại Hình Tiên Phủ – Tu Luyện Phụ Hồn'],[817,'Ngoại Hình Tiên Phủ – Kỹ năng Ảo Hóa']])register(id,{name,module:'src/01-red-dot-module.js',route:({635:'native FeedXianFuShow; only owned material and wait for feed-level ACK',636:'native AddXianFuShowSkillLevel(skillId); require feed-level gate and wait for skill ACK',637:'native AddXianFuMagicShow(id); require owned material and SVIP gate; wait for show-level ACK',638:'native AddXianFuShowRefine(type,flag); use only owned material and wait for refine-level ACK',817:'native ActiveXianFuSkill(showId); require activated illusion, native level gate, and wait for skill ACK'})[id],automatic:true,handler:()=>runXianfuAppearance(id)});
    for(const [id,name] of [[76,'Tiên Phủ – Nhận Tụ Linh Trận'],[77,'Tiên Phủ – Nhận Tụ Bảo Bồn'],[78,'Tiên Phủ – Lò Luyện Đơn'],[85,'Đồ Giám Dị Thú – Lam'],[86,'Đồ Giám Dị Thú – Tím'],[87,'Đồ Giám Dị Thú – Cam'],[88,'Đồ Giám Dị Thú – Đỏ']])register(id,{name,module:'src/01-red-dot-module.js',route:id===76||id===77?'native getBuildProduceAward and wait for building-state update':id===78?'claim finished furnace output, then makeItem max affordable quantity in recipe order; no purchase or instant-finish':`native PromoteIllustratedHandbook for quality ${id-85}; require next level and owned material`,automatic:true,handler:()=>runXianfu(id)});
    register(559,{name:'Thần Thú – Cường hóa nhanh',module:'src/01-red-dot-module.js',route:'native anmlSptStrth(animalId); chỉ khi canStrength xác nhận đủ Tinh Thạch Thú Linh cho một lượt; không tự đổi hoặc trang bị; chờ server ACK',automatic:true,handler:runThanThuStrength});
    register(110,{name:'Boss Chiến Tuyến Lv.1300',module:'src/01-red-dot-module.js',route:'red dot 110; only during 12:00-12:30/21:30-22:00, native rqEtScene(2151/2152), select live Lv.1300 Boss, exit when event closes; no attempt purchase',automatic:true,handler:runFrontline});
    register(842,{name:'Trang Bị Thiên Mộ – Rã nhanh',module:'src/01-red-dot-module.js',route:'use the game-selected getSplitRewards list and native Tmei packet; wait for inventory ACK before strengthening',automatic:true,handler:runTombGear});
    register(828,{name:'Trang Bị Thiên Mộ – Cường hóa nhanh',module:'src/01-red-dot-module.js',route:'native oneKeyUp after dismantle ACK; verify owned material; never purchase currency',automatic:true,handler:runTombGear});
    register(15,{name:'Luyện Khí – Cường Hóa nhanh',module:'src/01-red-dot-module.js',route:'repeat native oneKeyUp while the game confirms owned material and copper; process ready rank promotions; no purchase RPC',automatic:true,handler:runGearStrength});
    register(16,{name:'Luyện Khí – Đá Hồn',module:'src/01-red-dot-module.js',route:'native quick socket owned stones into empty positions, upgrade equipped stones when owned material is sufficient, then promote master rank only when ready; no replacement or purchase',automatic:true,handler:runSoulStone});
    register(156,{name:'Luyện Khí – Thôn Phệ và Đúc Hồn nhanh',module:'src/01-red-dot-module.js',route:'native ShOperOneKey for parts 1–6 first when getCanUpSh confirms eligibility, then ZhOperOneKey with selected owned material; verify server ACK; no purchase',automatic:true,handler:runSoulForge});
    register(119,{name:'Trang Bị – Dung Luyện',module:'src/01-red-dot-module.js',route:'native eligible getCanFusionItems list and c2sOneKeyFusion; wait for server ACK; no inventory replacement or purchase',automatic:true,handler:()=>runSmelt('equip')});
    register(195,{name:'Thánh Trang – Dung Luyện',module:'src/01-red-dot-module.js',route:'native getSmeltRank list and oneKeySmelt; keep gold-protected items and wait for server ACK',automatic:true,handler:()=>runSmelt('holy')});
    register(850,{name:'Thần Thú – Dung Luyện',module:'src/01-red-dot-module.js',route:'native eligible getAnmlFusions list and oneKeyResolve; wait for server ACK; no purchase',automatic:true,handler:()=>runSmelt('pet')});
    register(48,{name:'Ghép Đá Hồn',module:'src/01-red-dot-module.js',route:'native item_compose type 1; validate owned stacks, send TdKp one recipe at a time and wait for ComposeReply ACK; no purchases',automatic:true,handler:()=>runCompose(1)});
    register(49,{name:'Ghép Đạo Cụ',module:'src/01-red-dot-module.js',route:'native item_compose type 2; validate owned stacks, send TdKp one recipe at a time and wait for ComposeReply ACK; no purchases',automatic:true,handler:()=>runCompose(2)});
    register(2,{name:'Túi – Đạo Cụ dùng vật phẩm an toàn',module:'src/01-red-dot-module.js',route:'use only prop items whose row red-dot flag and native checkItemCanUseOrNotice both allow use; exclude tickets, Ma Tủy Đơn, Nguyên Lực Đơn, and upgrade stones; skip items that open a UI flow; wait for inventory ACK; no purchases',automatic:true,handler:runInventoryUse});
    for(const [id,name] of [[12,'Tiến cấp Thú Cưỡi – Chúc Phúc'],[8,'Ảo Hóa Thú Cưỡi tăng bậc'],[13,'Tu Luyện Thú Cưỡi'],[105,'Pháp Trận Thú Cưỡi – Trận'],[106,'Pháp Trận Thú Cưỡi – Cục'],[107,'Pháp Trận Thú Cưỡi – Tuyệt']])register(id,{name,module:'src/01-red-dot-module.js',route:id===12?'rankRide với bollZiDong=false gửi [0]; chỉ dùng vật liệu sẵn có, không mua tự động':'native riseRideRefine([type,0]); kiểm tra vật phẩm, cấp nhân vật và chờ ACK',automatic:true,handler:()=>runMount(id)});
    for(const [id,name] of [[3,'Linh Thú – Chúc Phúc tiến cấp'],[4,'Linh Thú – Ảo Hóa tăng bậc'],[5,'Linh Thú – Tu Luyện'],[102,'Linh Thú – Pháp Trận Trận'],[103,'Linh Thú – Pháp Trận Cục'],[104,'Linh Thú – Pháp Trận Tuyệt']])register(id,{name,module:'src/01-red-dot-module.js',route:id===3?'rankPet với _bolZD=false gửi [0]; chỉ dùng vật liệu sẵn có, không mua tự động':id===5?'native riseRefet([type,0]); kiểm tra vật phẩm/cấp và chờ ACK':'native riseMgcShow([id]) hoặc mgcLv(id) trên mục đã mở, đủ vật liệu/SVIP và chờ ACK',automatic:true,handler:()=>runLinhThu(id)});
    for(const id of [260,261,262,263,264,265,266,267,680])register(id,{name:redCatalog.get(id)?.name||'Tầm Bảo miễn phí hằng ngày',module:'src/01-red-dot-module.js',route:'chỉ gửi một lượt đầu miễn phí khi isFirst(type) và tính năng đang mở; native c_sendXunBao(0,true,false,type,false); chờ server ACK; không dùng vật phẩm hoặc tiền',automatic:true,handler:runTreasureFree});
    for(const id of [234,235,230,231,232,233,238])register(id,{name:({234:'Nâng cấp Biến Thân',235:'Kỹ năng Biến Thân',230:'Ảo Hóa Biến Thân loại 4',231:'Ảo Hóa Biến Thân loại 3',232:'Ảo Hóa Biến Thân loại 5',233:'Ảo Hóa Biến Thân loại 6',238:'Tăng cấp Lôi Đình'})[id],module:'src/01-red-dot-module.js',route:id===238?'native ThunderEquipUpgrade(id, pos); kiểm tra vật phẩm, điều kiện vị trí và chờ ACK':'native transformation level/skill/illusion; kiểm tra nguyên liệu và chờ server ACK',automatic:true,handler:runTransform});
    register(20,{name:'Tiên Thể',module:'src/01-red-dot-module.js',route:'native rfSoul; tuần tự ưu tiên bậc thấp; chờ ACK và vàng; không mua',automatic:true,handler:runTienThe});
    register(167,{name:'Tiên Đơn',module:'src/01-red-dot-module.js',route:'native oneKUseXD theo nhóm, giới hạn ngày và từng loại thuốc; chờ server ACK',automatic:true,handler:runTienDan});
    register(657,{name:'Ma Thần – Huyết Mạch',module:'src/01-red-dot-module.js',route:'native SpiritEquipBloodLineage; chỉ tăng khi đủ vật phẩm, còn cấp kế và chờ server ACK',automatic:true,handler:()=>runMoshen(657)});
    register(656,{name:'Ma Thần – Phệ Hồn',module:'src/01-red-dot-module.js',route:'chờ Hồn Lực được server cập nhật và red dot đủ điều kiện, sau đó gọi native SpiritEquipOneKeySoulEatingUP; chờ ACK',automatic:true,handler:()=>runMoshen(656)});
    register(682,{name:'Boss Ma Thần – tầng cao nhất và lập đội clone',module:'src/01-red-dot-module.js',route:'red dot 682; chọn tầng cao nhất mở được bằng cấu hình gốc, chỉ dùng thể lực khiêu chiến miễn phí; vào rồi src/47-boss-team.js tạo đội riêng/mời clone và clone tự nhận lời mời map 2711; không dùng KNB hay vật phẩm hồi thể lực',automatic:true,handler:runMaThan});
    register(19,{name:'Pháp Thuật – Tuyệt Học tăng nhanh',module:'src/01-red-dot-module.js',route:'native addSkillLevelOfAll; kiểm tra red dot, giới hạn cấp, điều kiện nhân vật và tiền theo chi phí gốc; chờ server ACK',automatic:true,handler:runMagicQuick});
    register(14,{name:'Pháp Bảo tăng nhanh',module:'src/01-red-dot-module.js',route:'native TXio [0] quick-up; chỉ khi red dot 14 báo có Pháp Bảo đã kích hoạt, còn cấp và đủ mảnh; chờ dữ liệu server xác nhận',automatic:true,handler:runFaBaoQuick});
    register(646,{name:'Phụ Hồn Phi Phong',module:'src/01-red-dot-module.js',route:'native refLv theo từng loại; kiểm tra vật phẩm và cấp; chờ server ACK',automatic:true,handler:runCloakSoul});
    register(27,{name:'Phụ Hồn Thần Binh',module:'src/01-red-dot-module.js',route:'native refLv theo từng loại; kiểm tra vật phẩm và cấp; chờ server ACK',automatic:true,handler:runWeaponSoul});
    register(33,{name:'Phụ Hồn Linh Dực',module:'src/01-red-dot-module.js',route:'native refineLev theo từng loại; kiểm tra vật phẩm và cấp; chờ server ACK',automatic:true,handler:runWingSoul});
    register(148,{name:'Phụ Hồn Thời Trang',module:'src/01-red-dot-module.js',route:'native addFashRefine theo từng loại; kiểm tra vật phẩm và cấp; chờ server ACK',automatic:true,handler:()=>runAppearanceSoul('fashion')});
    register(155,{name:'Phụ Hồn Linh Tí',module:'src/01-red-dot-module.js',route:'native addHandRefine theo từng loại; kiểm tra vật phẩm và cấp; chờ server ACK',automatic:true,handler:()=>runAppearanceSoul('arm')});
    register(63,{name:'Rã Phù Văn',module:'src/01-red-dot-module.js',route:'native resolveRune theo rflags; giữ phù văn cần xác nhận; chờ cập nhật túi xác nhận',automatic:true,handler:runRuneResolve});
  }
  function runAdventure(){
    const T=S.adventure;
    if(!S.enabled||!T.enabled||(!api.isActive(141)&&!T.blocking)){T.blocking=false;T.reason='red_dot_clear';return;}
    const now=Date.now();if(now<T.nextAt)return;T.nextAt=now+500;
    if(!T.legacyStopped){try{W.KVPV_V871?.stop?.();}catch{}T.legacyStopped=true;}
    try{
      adventureTick();T.dispatched++;
    }catch(e){T.blocking=false;T.reason='dispatch_error';T.error=String(e?.stack??e);S.lastError=T.error;}
  }
  function adventureTick(){
    const T=S.adventure,model=()=>W._Ba?._Ab?._mat?.inst,rpc=()=>W._Ba?._Ab?._VIt?.inst,ui=()=>W._j?.ins;
    const rows=()=>Array.isArray(model()?.evtLst)?model().evtLst.slice(0,4).filter(r=>Array.isArray(r)&&Number.isSafeInteger(Number(r[0]))&&Number(r[0])>0):[];
    const signature=r=>JSON.stringify(r),panel=()=>ui()?.isOpened?.(247)?(ui().getPanelById?.(247)||ui().getDialogById?.(247)):null;
    function send(row,kind,fn){const key=String(row[0]);T.pending.set(key,{kind,before:signature(row),at:Date.now()});T.requests++;T.reason='waiting_'+kind+'_ack';fn();}
    T._onEvent??=function(data){const id=String(data?.[0]?.[0]??''),pending=T.pending.get(id);if(pending?.kind==='mini')pending.acked=true;};
    try{if(!T.notifyReady&&typeof W._Sa?.notify?.on==='function'&&typeof W._Sa?.notify?.off==='function'){W._Sa.notify.on(5475,T,T._onEvent);T.notifyReady=true;}}catch{}
    if(!T.enabled||!owned()){T.blocking=false;T.reason='waiting_actor';return;}
    const m=model(),r=rpc();if(!m||!Array.isArray(m.evtLst)){T.blocking=false;T.reason='waiting_model';return;}
    const list=rows();
    for(const [id,pending] of T.pending){const row=list.find(row=>String(row[0])===id);if(!row||signature(row)!==pending.before){T.pending.delete(id);T.confirmed++;S.confirmed++;}}
    const unresolved=[...T.pending].filter(([,pending])=>Date.now()-pending.at>=10000).map(([id,pending])=>id+'/'+pending.kind+'/'+pending.at).sort().join('|');
    if(unresolved&&!T.refreshed.has(unresolved)&&Date.now()-T.lastRefresh>=30000&&typeof r?._IIt==='function'){T.lastRefresh=Date.now();T.refreshed.add(unresolved);r._IIt();}
    if(api.isActive(141)!==true){T.blocking=T.pending.size>0;T.reason=T.pending.size?'waiting_event_ack_after_red_dot_clear':'red_dot_clear';return;}
    if(Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)){T.blocking=T.pending.size>0;T.reason='user_using_ui';return;}
    if(W.KVPV_BOSS_TEAM?.priority?.()){T.blocking=T.pending.size>0;T.reason='team_invitation_priority';return;}
    if(!r){T.blocking=T.pending.size>0;T.reason='waiting_model';return;}
    const ready=list.find(row=>!T.pending.has(String(row[0]))&&(Number(row[1])===1&&Number(row[4])===1||Number(row[1])===5&&Number(row[3])>0&&Number(row[3])<Number(W._Sa?.svrTime)));
    if(ready&&typeof r.getAdreAward==='function'){send(ready,'claim',()=>r.getAdreAward(ready[0]));T.blocking=true;return;}
    const mini=panel();
    if(mini){
      const row=list.find(row=>String(row[0])===String(mini._myi?.[0]));if(!row||Number(row[1])!==0){T.blocking=false;T.reason='unknown_minigame_preserved';return;}
      const id=String(row[0]),out=mini._yTt;
      if((out===0||out===1)&&!T.pending.has(id)&&typeof mini.close==='function'){send(row,'mini_close',()=>mini.close());T.blocking=true;return;}
      const pending=T.pending.get(id);
      if(pending?.kind==='mini'&&pending.acked===true&&(out===0||out===1||out===2&&mini.sp_0?.mouseEnabled===true)){T.pending.delete(id);T.confirmed++;S.confirmed++;}
      if((out===0||out===1)&&!T.pending.has(id)&&typeof mini.close==='function'){send(row,'mini_close',()=>mini.close());T.blocking=true;return;}
      if(Number(m.yL)>0&&!T.pending.has(id)&&mini.sp_0?.mouseEnabled===true&&typeof mini._GAn==='function'&&(T.mini.get(id)||0)<3){T.mini.set(id,(T.mini.get(id)||0)+1);send(row,'mini',()=>mini._GAn(mini.sp_0));T.blocking=true;return;}
      T.blocking=true;T.reason='waiting_minigame_result';return;
    }
    if(!(Number(m.yL)>0)){T.blocking=false;T.reason='no_free_event_points';return;}
    const idle=()=>W._Ba?._$a?.SceneUtil?.isCommonScene===true&&W._Ba?._$a?._yo?.ins?.isInMission!==true&&W._Ba?._$a?._yo?.ins?.isInArena!==true&&W._Ba?._cm?._q3t?.ins?.getHasTeams?.()!==true&&W._Ba?._cm?._vJ?.ins?.isHaveRoom!==true&&W._Ba?._of?._x_t?.ins?.haveTeam!==true&&!W.KVPV?.core?.scene?.status?.()?.owner&&W.KVPV_DAILY?.quickState?.()?.job==='rảnh';
    if(!idle()){T.blocking=false;T.reason=T.pending.size?'waiting_idle_scene_with_unconfirmed_events':'waiting_idle_scene';return;}
    const accept=list.find(row=>!T.pending.has(String(row[0]))&&Number(row[1])===1&&Number(row[4])!==1&&Number(row[7])===0);
    if(accept&&typeof r.chg==='function'){send(accept,'accept',()=>r.chg(accept));T.blocking=true;return;}
    if([...T.pending.values()].some(pending=>pending.kind==='explore')){T.blocking=true;T.reason='waiting_exploration_ack';return;}
    const start=list.find(row=>!T.pending.has(String(row[0]))&&([2,3,4].includes(Number(row[1]))||Number(row[1])===5&&Number(row[3])===0));
    if(!W.KVPV_ENTRY_POLICY?.manual&&start&&typeof r.chg==='function'){send(start,'explore',()=>r.chg(start));T.blocking=true;return;}
    const game=list.find(row=>!T.pending.has(String(row[0]))&&Number(row[1])===0&&(T.mini.get(String(row[0]))||0)<3);
    if(game&&typeof ui()?.open==='function'){const key='mini/'+game[0];if(!T.navigated.has(key)){T.navigated.add(key);ui().open(247,game);T.blocking=true;T.reason='opened_minigame';return;}}
    for(const row of list)if(Number(row[1])===1&&Number(row[4])!==1&&Number(row[7])>0){
      const cfg=W._ft?._$Ah?.ins?.getCfgById?.(row[7]),fc=Number(cfg?.[3]),win=fc>0?W._Sa?.getWindowCfgByFcId?.(fc):null,id=Number(win?.[0]),key=row[0]+'/'+row[7];
      if(Number.isSafeInteger(id)&&id>0&&typeof ui()?.open==='function'&&!T.navigated.has(key)){T.navigated.add(key);if(W._Ba?._iB?.ChatTool?.isChatPanel?.(id)){if(W._Ba?._iB?._C$?.instance)W._Ba._iB._C$.instance.openPanelId=246;ui().open(id,Number(row[7])===23?2:0);}else ui().open(id);T.blocking=false;T.reason='opened_objective_wait_server_progress';return;}
    }
    T.blocking=T.pending.size>0;T.reason=T.pending.size?'waiting_event_ack_no_retry':'waiting_objective_or_event';
  }
  function stopAdventure(){const T=S.adventure;T.enabled=false;T.blocking=false;if(T.notifyReady){try{W._Sa?.notify?.off?.(5475,T,T._onEvent);}catch{}T.notifyReady=false;}}
  function adventureStatus(){const T=S.adventure,m=W._Ba?._Ab?._mat?.inst,rows=Array.isArray(m?.evtLst)?m.evtLst.slice(0,4).filter(row=>Array.isArray(row)&&Number(row[0])>0):[];return {enabled:T.enabled,reason:T.reason,lastError:T.error,requests:T.requests,confirmed:T.confirmed,freePoints:Number(m?.yL)||0,pending:[...T.pending].map(([id,p])=>({id,kind:p.kind,at:p.at,ageMs:Date.now()-p.at,unconfirmed:Date.now()-p.at>=10000})),refreshQueries:T.refreshed.size,events:rows.map(row=>({id:row[0],type:row[1],progress:row[3],rewardReady:row[4],objective:row[7]})),allowKNB:false};}
  W.KVPV_ADVENTURE=Object.freeze({sync:runAdventure,stop:stopAdventure,status:adventureStatus,_handoff:()=>{const T=S.adventure;return {actor:adventureActor,lastRefresh:T.lastRefresh,refreshed:[...T.refreshed],pending:[...T.pending],navigated:[...T.navigated],mini:[...T.mini],requests:T.requests,confirmed:T.confirmed};}});
  function redDots() {
    inspectRed();
    syncPluginMappings();
    return [...redActive].slice(0,256).map(id=>catalogView(id,redCatalog.get(id)??{name:'Chưa ánh xạ',automatic:false},true)).sort((a,b)=>{
      const ah=a.hierarchy?.order,bh=b.hierarchy?.order;
      return (Number.isFinite(ah)?ah:Number.MAX_SAFE_INTEGER)-(Number.isFinite(bh)?bh:Number.MAX_SAFE_INTEGER)||a.id-b.id;
    });
  }
  const api = Object.freeze({
    isActive(id) { if (!S.enabled) return false; inspectRed(); return redActive.has(Number(id)); },
    activeIds() { if (!S.enabled) return []; inspectRed(); return [...redActive]; },
    catalog() { if (!S.enabled) return []; inspectRed(); syncPluginMappings(); return [...redCatalog].map(([id, meta]) => catalogView(id,meta,redActive.has(id))); }
  });
  W.KVPV_RED_DOT = api;
  W.KVPV_RED_DOT_MODULE = Object.freeze({
    start, stop, sync: tick, register,
    blockingRedIds,
    blocksProgression() { return blockingRedIds().length > 0; },
    ownsProgression() { return S.enabled; },
    status: () => ({
      enabled: S.enabled, pollMs: 15, workCadenceMs:15,redDotSnapshotMs:20,catalogSyncMs:500,auditRefreshMs:250,
      reason: S.reason, sent: S.sent, confirmed: S.confirmed, lastError: S.lastError,
      personalDungeon:W.KVPV_DAILY_TRIAL?.status?.()??null,
      expGroup:{reason:S.expGroup.reason,blocking:S.expGroup.blocking,red53:api.isActive(53),coordinator:W.KVPV_TEAM_COORDINATOR?.status?.()??null},
      pending: [...(svipPending ? [{ id: 'svipRewards325', at: svipPending.at, reason: svipPending.reason, error: svipPending.error ?? '' }] : []),
        ...(S.weeklyWelfare.pending ? [{id:'weeklyWelfare606',at:S.weeklyWelfare.pending.at,probedAt:S.weeklyWelfare.pending.probedAt}] : []),
        ...(S.jiuXiaoLing.pending ? [{id:'jiuXiaoLing',redId:S.jiuXiaoLing.pending.redId,kind:S.jiuXiaoLing.pending.kind,taskId:S.jiuXiaoLing.pending.id,at:S.jiuXiaoLing.pending.at,probedAt:S.jiuXiaoLing.pending.probedAt}] : []),
        ...(S.weekendConsume.pending ? [{id:'weekendConsume321',rewardId:S.weekendConsume.pending.id,at:S.weekendConsume.pending.at,probedAt:S.weekendConsume.pending.probedAt}] : []),
        ...(S.dailyCheckin.pending ? [{id:'dailyCheckin257',at:S.dailyCheckin.pending.at}] : []),
        ...(S.loginAwards.pending ? [{id:'loginAward',redId:S.loginAwards.pending.redId,act:S.loginAwards.pending.act,rewardId:S.loginAwards.pending.id,at:S.loginAwards.pending.at}] : []),
        ...(S.onlineReward.pending ? [{id:'onlineReward259',rewardId:S.onlineReward.pending.id,at:S.onlineReward.pending.at}] : []),
        ...(S.dailyMonster.pending ? [{id:'dailyMonster57',type:S.dailyMonster.pending.type,at:S.dailyMonster.pending.at}] : []),
        ...(S.payTurntableReward.pending ? [{id:'payTurntableReward306',rewardId:S.payTurntableReward.pending.id,at:S.payTurntableReward.pending.at,probedAt:S.payTurntableReward.pending.probedAt}] : []),
        ...(S.happyFrenzy.pending ? [{id:'happyFrenzy346',kind:S.happyFrenzy.pending.kind,rewardId:S.happyFrenzy.pending.id,at:S.happyFrenzy.pending.at,probedAt:S.happyFrenzy.pending.probedAt}] : []),
        ...(S.mail.pending ? [{id:'mail',phase:S.mail.pending.phase,ids:S.mail.pending.ids?.length??0,at:S.mail.pending.at}] : []),
        ...(S.tienThe.pending ? [{id:'tienTheCultivation',at:S.tienThe.pending.at,choice:S.tienThe.pending.choice}] : []),
        ...(S.runeResolve.pending ? [{id:'runeResolve',at:S.runeResolve.pending.at,items:S.runeResolve.pending.items}] : []),
        ...(S.weaponSoul.pending ? [{id:'weaponSoul',at:S.weaponSoul.pending.at,choice:S.weaponSoul.pending.choice}] : []),
        ...(S.wingSoul.pending ? [{id:'wingSoul',at:S.wingSoul.pending.at,choice:S.wingSoul.pending.choice}] : []),
        ...(S.fashionSoul.pending ? [{id:'fashionSoul',at:S.fashionSoul.pending.at,choice:S.fashionSoul.pending.choice}] : []),
        ...(S.armSoul.pending ? [{id:'armSoul',at:S.armSoul.pending.at,choice:S.armSoul.pending.choice}] : []),
        ...(S.maThan.pending ? [{id:'maThanHighestFloor',at:S.maThan.pending.at,...S.maThan.pending}] : []),
        ...(S.thanThuStrength.pending ? [{id:'thanThuStrength',at:S.thanThuStrength.pending.at,choice:S.thanThuStrength.pending.choice}] : []),
        ...(S.tombGear.pending ? [{id:'tombGear',redId:S.tombGear.pending.redId,stage:S.tombGear.pending.stage,choice:S.tombGear.pending.choice,at:S.tombGear.pending.at}] : []),
        ...(S.cloakSoul.pending ? [{id:'cloakSoul',at:S.cloakSoul.pending.at,choice:S.cloakSoul.pending.choice}] : []),
        ...(S.mount.pending ? [{id:'mount',redId:S.mount.pending.redId,choice:S.mount.pending.choice,at:S.mount.pending.at}] : []),
        ...(S.linhThu.pending ? [{id:'linhThu',redId:S.linhThu.pending.redId,choice:S.linhThu.pending.choice,at:S.linhThu.pending.at}] : []),
        ...(S.treasureFree.pending ? [{id:'treasureFree',redId:S.treasureFree.pending.redId,type:S.treasureFree.pending.type,at:S.treasureFree.pending.at}] : []),
        ...(S.transform.pending ? [{id:'transform',at:S.transform.pending.at,kind:S.transform.pending.kind,redId:S.transform.pending.redId}] : [])],
      tienThe: { reason:S.tienThe.reason, pending:!!S.tienThe.pending, blocked:!!S.tienThe.blocked },
      weeklyWelfare:{reason:S.weeklyWelfare.reason,pending:!!S.weeklyWelfare.pending,blocked:!!S.weeklyWelfare.blocked,probe:(()=>{const p=weekWelfareState();return {ready:p.ready,reason:p.reason,active:p.active,count:p.count};})()},
      jiuXiaoLing:{reason:S.jiuXiaoLing.reason,pending:!!S.jiuXiaoLing.pending,blocked:!!S.jiuXiaoLing.blocked,probe:Object.fromEntries([370,371,372].map(id=>{const p=jiuXiaoState(id);return [id,{ready:p.ready,reason:p.reason,kind:p.kind,taskId:p.id,level:p.level,claimed:p.claimed,rewardLevel:p.rewardLevel}];}))},
      weekendConsume:{reason:S.weekendConsume.reason,pending:!!S.weekendConsume.pending,blocked:!!S.weekendConsume.blocked,probe:(()=>{const p=weekendConsumeState();return {ready:p.ready,reason:p.reason,id:p.id,active:p.active,endTime:p.endTime};})()},
      dailyCheckin:{reason:S.dailyCheckin.reason,pending:!!S.dailyCheckin.pending,blocked:!!S.dailyCheckin.blocked,probe:(()=>{const p=dailyCheckinState();return {ready:p.ready,reason:p.reason,signState:p.signState,signNum:p.signNum,dayNum:p.dayNum};})()},
      loginAwards:{reason:S.loginAwards.reason,pending:S.loginAwards.pending?{...S.loginAwards.pending}:null,blocking:S.loginAwards.blocking,blocked:!!S.loginAwards.blocked,claimed:S.loginAwards.claimed,probes:[...loginAwardIds].map(id=>{const p=loginAwardState(id);return {redId:id,ready:p.ready,reason:p.reason,act:p.act,kind:p.kind,claimable:p.claimable?.map(row=>row.id)??[]};})},
      onlineReward:{reason:S.onlineReward.reason,pending:!!S.onlineReward.pending,blocked:!!S.onlineReward.blocked,probe:(()=>{const p=onlineRewardState();return {ready:p.ready,reason:p.reason,id:p.id};})()},
      dailyMonster:{reason:S.dailyMonster.reason,pending:S.dailyMonster.pending?{...S.dailyMonster.pending}:null,blocking:S.dailyMonster.blocking,blocked:!!S.dailyMonster.blocked,claimed:S.dailyMonster.claimed,probe:[dailyMonsterState(0),dailyMonsterState(1)].map(p=>({type:p.type,ready:p.ready,reason:p.reason,kills:p.kills,need:p.need,received:p.received,max:p.max,born:p.born,grade:p.grade}))},
      adventure:{reason:S.adventure.reason,blocking:S.adventure.blocking,dispatched:S.adventure.dispatched,native:W.KVPV_ADVENTURE?.status?.()??null},
      payTurntableReward:{reason:S.payTurntableReward.reason,pending:!!S.payTurntableReward.pending,blocking:S.payTurntableReward.blocking,blocked:!!S.payTurntableReward.blocked,lastRefresh:S.payTurntableReward.lastRefresh,probe:(()=>{const p=payTurntableRewardState();return {ready:p.ready,reason:p.reason,id:p.id,rewardCount:p.rewardCount,modelReady:p.modelReady,rpcReady:p.rpcReady,rewards:p.rewards};})()},
      happyFrenzy:{reason:S.happyFrenzy.reason,pending:!!S.happyFrenzy.pending,blocking:S.happyFrenzy.blocking,blocked:!!S.happyFrenzy.blocked,probe:(()=>{const p=happyFrenzyState();return {ready:p.ready,reason:p.reason,kind:p.kind,id:p.id,points:p.points,taskCount:p.taskCount,milestoneCount:p.milestoneCount};})()},
      mail:{reason:S.mail.reason,pending:S.mail.pending?.phase??null,blocking:S.mail.blocking,blocked:!!S.mail.blocked,claimed:S.mail.claimed,deleted:S.mail.deleted,probe:(()=>{const p=mailState();return {available:p.available,hasMail:p.hasMail,loaded:p.loaded,rowCount:p.rowCount,claimIds:p.claimIds,deleteIds:p.deleteIds,receiving:p.receiving,delPending:p.delPending,modelReady:p.modelReady,rpcReady:p.rpcReady};})()},
      xianwei:{reason:S.xianwei.reason,pending:!!S.xianwei.pending,blocking:S.xianwei.blocking,blocked:!!S.xianwei.blocked,claimed:S.xianwei.claimed,probe:(()=>{const p=xianweiSnapshot();return {ready:p.ready,reason:p.reason,poslv:p.poslv,eligible:p.eligible,modelReady:p.modelReady,rpcReady:p.rpcReady};})()},
      tienDan: { reason:S.tienDan.reason, pending:!!S.tienDan.pending, blocked:!!S.tienDan.blocked },
      marriage: {
        reason:S.marriage.reason,pending:S.marriage.pending?{...S.marriage.pending}:null,
        blocking:S.marriage.blocking,blocked:!!S.marriage.blocked,claimed:S.marriage.claimed,upgraded:S.marriage.upgraded,
        probes:Object.fromEntries([375,376,378,379,380,382,383,384,385].map(id=>[id,(()=>{
          if(id===375||id===376){const rows=marryTaskRows(id===376?1:2);return {ready:rows.some(row=>Number(row[3])===1),rows:rows.length};}
          if(id===378){const p=marryRingModel();return {ready:!!p?.checkRingUPRP?.(),level:Number(p?._level||0),exp:Number(p?._exp||0)};}
          if(id===379){const p=W._Ba?._Yo?.marryFate?._jUt?.ins;return {ready:p?.checkLVUPRP?.()===true,material:ringMaterial().count};}
          if(id===380){const p=marryRelation();return {ready:Number(p?.getIntimacyRewardLevel?.()||0)<Number(p?.getIntimateLevel?.()||0),level:Number(p?.getIntimateLevel?.()||0),rewardLevel:Number(p?.getIntimacyRewardLevel?.()||0)};}
          if(id===382){const p=ringSkillChoice();return {ready:!!p,choice:p};}
          if(id===383){const p=marryCardModel();return {ready:Number(p?.marryRewardItemState)===1&&Number(p?.marryRewardState)===1};}
          if(id===384||id===385){const p=marryTokenRankChoice();return {ready:!!p,choice:p};}
          return {ready:api.isActive(id)};
        })()]))
      },
      phucOa:{
        reason:S.phucOa.reason,pending:S.phucOa.pending?{...S.phucOa.pending}:null,
        blocking:S.phucOa.blocking,blocked:!!S.phucOa.blocked,upgraded:S.phucOa.upgraded,
        probes:{
          nurture:(()=>{const p=phucOaLevelChoice();return {ready:!!p,choice:p};})(),
          supplement:(()=>{const p=phucOaFeedChoice();return {ready:!!p,choice:p};})(),
          immortalSkill:(()=>{const p=phucOaSkillChoice();return {ready:!!p,choice:p};})()
        }
      },
      coBao:{reason:S.coBao.reason,pending:S.coBao.pending?{...S.coBao.pending}:null,blocking:S.coBao.blocking,
        blocked:!!S.coBao.blocked,chainPlacement:S.coBao.chainPlacement,claimed:S.coBao.claimed,placed:S.coBao.placed,
        stageReward:(()=>{const p=coBaoStageReward();return {ready:!!p,level:p?.level??null,mapId:p?.mapId??null,panel:coBaoThienKiepPanel().open};})(),
        fragments:(()=>{const p=coBaoFragments();return {ready:p.ready,reason:p.reason,count:p.count,owned:p.own,rows:p.rows};})()},
      runeResolve: { reason:S.runeResolve.reason, pending:!!S.runeResolve.pending, blocked:!!S.runeResolve.blocked },
      weaponSoul: { reason:S.weaponSoul.reason, pending:!!S.weaponSoul.pending, blocked:!!S.weaponSoul.blocked },
      wingSoul: { reason:S.wingSoul.reason, pending:!!S.wingSoul.pending, blocked:!!S.wingSoul.blocked },
      fashionSoul: { reason:S.fashionSoul.reason, pending:!!S.fashionSoul.pending, blocked:!!S.fashionSoul.blocked },
      armSoul: { reason:S.armSoul.reason, pending:!!S.armSoul.pending, blocked:!!S.armSoul.blocked },
      maThan: { reason:S.maThan.reason, pending:!!S.maThan.pending, blocked:!!S.maThan.blocked, selected:S.maThan.selected, confirmed:S.maThan.confirmed, probe:(()=>{const p=maThanEntryState();return {ready:p.ready,reason:p.reason,active:p.active,challenge:p.challenge,bloodFloor:p.bloodFloor,unlock:p.unlock,selected:p.selected};})() },
      soulEating: { reason:S.soulEating.reason, pending:!!S.soulEating.pending, blocked:!!S.soulEating.blocked, probe:(()=>{const p=moshenState(656);return {ready:p.ready,reason:p.reason,exp:p.exp,showId:p.showId,itemType:p.itemType,parts:p.parts,readyParts:p.readyParts};})() },
      thanThuStrength: { reason:S.thanThuStrength.reason, pending:!!S.thanThuStrength.pending, blocked:!!S.thanThuStrength.blocked, probe:(()=>{const p=thanThuStrengthState();return {ready:p.ready,reason:p.reason,choice:p.choice};})() },
      gearStrength: { reason:S.gearStrength.reason, pending:!!S.gearStrength.pending, blocked:!!S.gearStrength.blocked, probe:(()=>{const p=gearStrengthState();return {ready:p.ready,reason:p.reason,choice:p.choice};})() },
      soulStone: { reason:S.soulStone.reason, pending:!!S.soulStone.pending, blocked:!!S.soulStone.blocked, probe:(()=>{const p=soulStoneState();return {ready:p.ready,reason:p.reason,choice:p.choice};})() },
      soulForge: { reason:S.soulForge.reason, pending:!!S.soulForge.pending, blocked:!!S.soulForge.blocked, probe:(()=>{const p=soulForgeState();return {ready:p.ready,reason:p.reason,choice:p.choice};})() },
      inventoryUse: { reason:S.inventoryUse.reason,pending:!!S.inventoryUse.pending,blocking:S.inventoryUse.blocking,used:S.inventoryUse.used,skipped:S.inventoryUse.skipped,probe:S.inventoryUse.probe??null },
      smelt:Object.fromEntries(Object.entries(S.smelt).map(([key,task])=>[key,{reason:task.reason,pending:!!task.pending,blocking:task.blocking,ack:task.ack,items:task.pending?.ids?.length??0}])),
      compose:{reason:S.compose.reason,pending:!!S.compose.pending,blocking:S.compose.blocking,ack:S.compose.ack,confirmed:S.compose.confirmed,failed:S.compose.failed,blockedUntil:S.compose.blockedUntil,probe:S.compose.probe},
      tombGear: { reason:S.tombGear.reason, pending:!!S.tombGear.pending, blocked:!!S.tombGear.blocked, probe:(()=>{const p=tombGearState();return {ready:p.ready,reason:p.reason,stage:p.stage,choice:p.choice};})() },
      cloakSoul: { reason:S.cloakSoul.reason, pending:!!S.cloakSoul.pending, blocked:!!S.cloakSoul.blocked },
      transform: { reason:S.transform.reason, pending:!!S.transform.pending, blocked:!!S.transform.blocked },
      mount: { reason:S.mount.reason, pending:!!S.mount.pending, blocked:!!S.mount.blocked, bulkBless:!!S.mount.bulkBless, probe:(()=>{const p=mountState(12);return {ready:p.ready,reason:p.reason,choice:p.choice};})() },
      linhThu: { reason:S.linhThu.reason, pending:!!S.linhThu.pending, blocked:!!S.linhThu.blocked, bulkBless:!!S.linhThu.bulkBless, probe:(()=>{const p=linhThuState(3);return {ready:p.ready,reason:p.reason,choice:p.choice};})() },
      treasureFree: { reason:S.treasureFree.reason, pending:!!S.treasureFree.pending, blocked:!!S.treasureFree.blocked },
      xianfu:{reason:S.xianfu.reason,pending:S.xianfu.pending?{...S.xianfu.pending}:null,blocked:!!S.xianfu.blocked,ack:S.xianfu.ack,
        furnace:(()=>{const m=xianfuModel();return {energy:Number(m?.typeInfos?.(0)),buildings:[0,1,2].map(id=>{const b=xianfuBuild(id);return {id,level:Number(b?.[1]),status:Number(b?.[3])};})};})(),
        tasks:(()=>{const p=xianfuTaskSnapshot();return {ready:p.ready,reason:p.reason,eligible:p.eligible,rows:p.rows,milestoneValue:p.milestoneValue,claimed:p.claimed};})(),
        handbook:Object.fromEntries([85,86,87,88].map(id=>[id,(()=>{const p=xianfuHandbookState(id);return {ready:p.ready,reason:p.reason,choices:p.choices?.slice(0,12)};})()]))},
      weaponIllusion:{reason:S.weaponIllusion.reason,pending:S.weaponIllusion.pending?{...S.weaponIllusion.pending}:null,blocked:!!S.weaponIllusion.blocked,
        tiers:Object.fromEntries([...weaponIllusionTiers].map(([id,tier])=>[id,(()=>{const p=weaponIllusionState(id);return {tier:weaponIllusionNames[tier],ready:p.ready,reason:p.reason,choices:p.choices?.slice(0,8)};})()]))},
      appearanceIllusion:{reason:S.appearanceIllusion.reason,pending:S.appearanceIllusion.pending?{...S.appearanceIllusion.pending}:null,blocked:!!S.appearanceIllusion.blocked,
        tiers:Object.fromEntries(Object.entries(appearanceIllusionDefs).map(([kind,d])=>[kind,Object.fromEntries(d.ids.map(id=>[id,(()=>{const p=appearanceIllusionState(kind,id);return {tier:weaponIllusionNames[p.tier]||'',ready:p.ready,reason:p.reason,choices:p.choices?.slice(0,8)};})()]))]))},
      thanhVanMeditation:{reason:S.thanhVanMeditation.reason,pending:S.thanhVanMeditation.pending?{...S.thanhVanMeditation.pending}:null,blocked:!!S.thanhVanMeditation.blocked,confirmed:S.thanhVanMeditation.confirmed,
        types:Object.fromEntries([1,2,3,4].map(type=>[type,(()=>{const p=thanhVanMeditationState(202+type);return {name:['','Thiên','Địa','Huyền','Hoàng'][type],ready:p.ready,reason:p.reason,level:p.level,count:p.count,maxLevel:p.maxLevel,maxCount:p.maxCount,item:p.item,need:p.need,owned:p.owned,redActive:p.redActive};})()]))},
      xianfuAppearance:{reason:S.xianfuAppearance.reason,pending:S.xianfuAppearance.pending?{...S.xianfuAppearance.pending}:null,blocked:!!S.xianfuAppearance.blocked,
        actions:Object.fromEntries([635,636,637,638,817].map(id=>[id,(()=>{const p=xianfuAppearanceState(id);return {ready:p.ready,reason:p.reason,level:p.level,cost:p.cost,need:p.need,owned:p.owned,choices:p.choices?.slice(0,8)};})()]))},
      frontline: { reason:S.frontline.reason, pending:S.frontline.pending?{...S.frontline.pending}:null, attempted:S.frontline.attempted, scene:frontlineScene(), window:frontlineClock().slot, targetLevel:1300 },
      tombBoss:{reason:S.tombBoss.reason,pending:S.tombBoss.pending?{bossId:S.tombBoss.pending.bossId,layer:S.tombBoss.pending.layer}:null,blocking:S.tombBoss.blocking,attempts:S.tombBoss.attempts,dayKey:S.tombBoss.dayKey,activeBoss:S.tombBoss.activeBoss,red825:api.isActive(825),leftnum:Number(W._Ba?._vf?._lf?.instance?.leftnum??0)},
      redDots: redDots(),
      missingHandlers: [...redCatalog].filter(([, meta]) => meta.automatic !== true && /thiếu handler/.test(meta.route)).map(([id, meta]) => ({ id, name: meta.name, route: meta.route }))
    })
  });
})();
