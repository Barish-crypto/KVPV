# KVPV — cập nhật ngày 24/10/2026

## Dọn mã và khởi động lại theo yêu cầu mới

- Chính sách vào phó bản đã chuyển sang tự động; module 99 khởi động lại API được hỗ trợ một lần mỗi phiên cho mọi actor hợp lệ, không còn danh sách clone cố định.
- Giữ pending/ACK và các khóa chưa xác nhận. Không gọi hàm reset yêu cầu đang chờ.
- `39-executor-report.js` chỉ còn chẩn đoán đọc dữ liệu; mã thử payload/nhận thưởng và hook bắt gói cũ đã đưa vào `archive/2026-10-24-cleanup` cùng các script kiểm thử liên quan.
- Combat hiện tại: chỉ 8001; đủ 7 hit sát thương ghép khớp mới cho 1 Tuyệt Học. Bộ đếm giữ qua đổi Boss, chỉ reset khi nhận tín hiệu tung TH native (1039); tính cả basic pha áp sát 2%. Không tính số lần gọi hoặc sát thương phụ; loại các đòn thường khác trong ba phó bản, kể cả pha áp sát; giữ khoảng cách 302, hồi máu 35/100; Linh Lung/Phù Văn áp sát khi Boss còn tối đa 2%.
- Mốc chờ do script thêm cho các chiêu: 0 ms. Để giảm tải bốn acc, timer quét combat 8 ms; trợ chiến chạy native; giảm đọc model xuống mỗi 25 ms khi mất focus, 50 ms khi tab ẩn. Vẫn tự đánh nền, không giả focus. Cắt đuôi hoạt ảnh 8001 chỉ sau hit ghép khớp; giữ cổng native còn lại, không coi 0 ms cấu hình là khoảng cách thời gian thực giữa hai đòn.
- Đo cắt đuôi trên 8941: baseline 7 hit/8,052 giây; trim 9 hit/8,004 giây. Mẫu ngắn, không suy ra trần server hoặc bảo đảm 10–20 đòn/giây. Kết quả ở `references/confirmed-tail-study-live-2026-10-24.json`.
- Phúc Oa, Linh Thú và Ngự Thú dùng kỹ năng native mặc định: module 10 không hook pet/fuwa/ride; module 50 chỉ gỡ pacing cũ, không tạo timer hay tự gọi combat. Thiết lập di chuyển và Phi Phong không đổi trong yêu cầu này.
- Toàn bộ kiểm thử: `.kvpv-live/cleanup-restart-all-tests.log`.

## Quyền chi tiêu và vận hành

- Không tự tiêu KNB nói chung. Ngoại lệ đã được người dùng cho phép: Cổ Vũ native trong Thí Luyện Ngày, map 2051 và 2061. Càn quét KNB vẫn tắt.
- Mỗi yêu cầu gửi đi phải chờ trạng thái server xác nhận; không xóa pending để thử lại khi timeout hoặc hot reload.
- Không ghi đè hook lạ. Nhường UI khi người dùng thao tác.
- Trước sửa: tạo `.kvpv-live/maintenance.lock`. Chỉ phát bản sau khi `KVPV_VERIFY_MAINTENANCE=1 node test.cjs` trả exit code 0; sau đó gỡ lock và chạm mtime `test.cjs`.

## Mã đã ghép

- `src/28-appearance-auto.js`: tăng cấp, kỹ năng, Phụ Hồn, Ảo Hóa cho các nhóm trang bị; năm nhánh Thú Cưỡi/Linh Thú, giữ pending qua reload.
- `src/46-team-coordinator.js`: lấy acc chạy tool qua BroadcastChannel, chọn lực chiến cao nhất, phó bản tổ đội thường và Thủ Hộ Thủy Tinh chờ đúng 4 acc.
- `src/47-boss-team.js`: Ma Thần/Tinh Thần tạo đội và mời riêng clone; clone ưu tiên thoát hoạt động, chờ ACK rồi gia nhập. Boss không đợi đủ đội trước khi vào map.
- `src/20-daily-trial.js`: Cổ Vũ vàng rồi KNB theo phạm vi được phép, xác nhận theo đúng loại tiền, nhường sender auto native.

## Kiểm tra tiếp trên game

- Kênh tổ đội hỗ trợ profile/Edge–Chrome trên cùng máy qua native host đọc báo cáo mới, chỉ chuyển dữ liệu roster/quota/session có giới hạn. Sau đổi background/core/native host phải tải lại extension KVPV và gắn lại các tab game trên từng profile; không cần F5 game. Android không dùng native host nên chưa chia sẻ roster với PC.
- Đọc báo cáo mới có đúng build triển khai: `bossTeam`, `teamCoordinator`, `dailyTrial`, `combat`.
- Kiểm thử mô phỏng không chứng minh RPC đã thành công trong game. Chưa có xác nhận trận thật cho các thay đổi tổ đội/Cổ Vũ mới nhất.
- Cần theo dõi điều kiện native khi clone khác tầng Ma Thần/huyết mạch, thiếu thể lực và lời nhắc native; không tự bỏ qua điều kiện chưa xác minh.

Người dùng yêu cầu dừng bảo trì tự động sau lượt dọn code này, mai tiếp tục khi có yêu cầu.

- Kiểm thử combo 30 hit: `.kvpv-live/30-hit-combo-tests.log`; cả ba map và pha áp sát, không tính hit lặp/nguồn khác, TH gọi im lặng không reset.

- Sửa đứng chờ combo 30 hit: bản ghi basic chưa ghép vẫn giữ 3,5 giây; sau tối thiểu 500 ms hoặc chu kỳ native dài hơn, chỉ cho đòn kế nếu hết animation và isCooldown=false. Không cộng hit cho timeout. Kiểm thử: .kvpv-live/30-hit-no-stall-tests.log.

- Combo hiện tại: 7 hit 8001 → 1 TH; chờ script sau tín hiệu TH 1 ms, áp dụng cả pha áp sát. Giữ hồi chiêu/animation native, scan 8 ms; không bảo đảm khoảng cách thực tế 1 ms. Kiểm thử đầy đủ: .kvpv-live/7-hit-th-1ms-tests.log.

- Trấn Yêu Tháp: module 53 đọc catalog/owned và API useExisting chủ động, chỉ map 8301, không mua/không auto-use. Pending giữ qua reload/timeout. Hướng dẫn: references/tower-owned-skills.md. Kiểm thử đầy đủ: .kvpv-live/tower-owned-skills-tests.log.

- Theo yêu cầu viết code thử: thêm tryOwnedOutside(id), chỉ chủ động gọi, cần kỹ năng đã sở hữu, không mua; chưa gửi thực tế. Kiểm thử đầy đủ: .kvpv-live/tower-outside-code-tests.log.

## Cleanup buff experiments
- Đưa module 53/54, kiểm thử và demo buff vào archive/2026-10-24-buff-cleanup; không còn đóng gói vào FULL/live patch.
- Bỏ quét cấu hình buff/kỹ năng, chẩn đoán login/online/treasure thử nghiệm khỏi báo cáo 5 giây; vẫn giữ trạng thái combat, quest, nâng cấp, đội và hoạt động cần vận hành.
- Hot update gỡ hai API thử nghiệm khỏi window; trạng thái pending cũ giữ nguyên, không gửi yêu cầu hoặc tự mở khóa.
- Giữ combo 7 hit 8001 → TH, chờ sau TH 1 ms do script, trợ chiến native, hồi máu và các bộ cày khác.
- Toàn bộ kiểm thử qua: .kvpv-live/buff-cleanup-tests.log. Số đo dung lượng: archive/2026-10-24-buff-cleanup/sizes-after.json.

## Người dùng chuyển sang tự làm phó bản
- ENTRY_POLICY.manual=true: chặn tự vào phó bản/Boss/tổ đội và dừng các controller vào map/chuỗi nhiệm vụ. Khi chuyển từ auto sang manual, tắt native Tự Vượt do tool bật; các lần cập nhật sau giữ lựa chọn native người dùng chủ động bật.
- Combat hỗ trợ trong map đã vào và nâng cấp vẫn giữ; không thoát trận/không reset pending.
- Kiểm thử đầy đủ: .kvpv-live/manual-dungeons-off-tests.log.

## Tầm Bảo miễn phí trong extension
- Module 56 tự xử lý type 0/1/2/3/4 và Vinh Quang 9/10/11/15: chỉ khi native isFirst=true/1, chức năng đã mở và acc rảnh ở map thường. Không dùng chìa trong module mới, không gọi mua, không bật phó bản.
- Một pending chung, chờ xbRep đúng type/code 0 và cờ miễn phí mất. Timeout/lỗi/reject giữ khóa qua hot reload, không gửi lại. Nhường sender cũ nếu pending; sender cũ nhường khi module miễn phí có việc.
- Chạy dù Daily đã dừng để giữ lựa chọn manual dungeon của người dùng. Nhường UI người dùng và popup. Kiểm thử đầy đủ: .kvpv-live/free-treasure-extension-tests.log.

- Module 57 nhận Túi Phúc Mệnh/Mạnh·Tuyệt từ mall khi đúng tên, giá hiện tại 0, hạn ngày 1/1 chưa dùng, đủ SVIP/Đạo Hạnh và hoạt động mở. Không dùng mức giá gốc gạch ngang, không mở túi. Chờ getCurBuyNum tăng; lỗi/timeout giữ pending qua reload. Cache ID món mục tiêu để không quét toàn mall mỗi giây. Kiểm thử: .kvpv-live/free-daily-bag-tests.log.

## Idle Auto Daily
- Chính sách manual=true, idleDaily=true: tự khởi động Daily khi đúng actor, còn sống, map thường rảnh, không nhiệm vụ/đội/lease khác và không có thao tác UI gần đây.
- Ở chế độ này Daily chỉ dispatch dung luyện; bộ nhận thưởng/nâng cấp song song hoạt động khi Daily running. Không chạy lịch sự kiện/tiếp quản phó bản/Tự Vượt. Nhường UI và hoạt động; không stop/reset pending khi nhường.
- Kiểm thử đầy đủ: .kvpv-live/idle-daily-tests.log.

## Bật lại toàn bộ Auto Daily
- Theo yêu cầu mới nhất: manual=false, idleDaily=false. Khôi phục lịch Daily, Tự Vượt, các bộ phó bản/Boss và tổ đội. Khởi động lại một lần theo khóa phiên FULL_RESUME2 để không bị khóa restart cũ bỏ qua.
- Giữ pending/ACK, không mua thêm hoặc reset giao dịch. Kiểm thử: .kvpv-live/full-daily-resume-tests.log.

- Sửa ưu tiên Hồng Hoang: bộ quest thiếu EXP không còn tắt enableHongHoang; migrate cờ đã lưu trong phiên cũ. Khi server báo scene17 mở và chưa đủ rương, nhường Tự Vượt sau trận hiện tại. Không ép thoát giữa trận. Thêm báo cáo trạng thái Hồng Hoang để xác minh. Kiểm thử: .kvpv-live/honghoang-priority-tests.log.

- Sửa Đường Thí Luyện: guard startTeamBossCopy của coordinator EXP chỉ giữ cổng cho đúng type/map/tier mà coordinator sở hữu. Phòng native loại 1 và phòng thủ công khác được chuyển nguyên lời gọi về native, không áp roster/quota EXP lên chúng. Không tự tạo hay mời thêm người. Thêm nativeRoom trong báo cáo. Kiểm thử: .kvpv-live/road-trial-room-fix-tests.log.

- Đường Thí Luyện scene41: module 59 đo tín hiệu cast1039, direct hit1012 cùng actor/target/skill, thời gian native cooldown/animation hồi. Không tạo sender/timer mới. Lưu tối đa240 mẫu qua hot reload, gỡ listener khi đổi phạm vi.
- Chỉ ưu tiên basic có mẫu đo tốt hơn sau >=8 hit và >=8 chu kỳ cho ít nhất hai basic cùng loại mục tiêu, tỉ lệ khớp >=80%; TH vẫn xen và giữ cooldown native. Không bảo đảm9 hit/giây. Kiểm thử: .kvpv-live/road-cadence-tests.log.

- Theo yêu cầu mới: Đường Thí Luyện scene41 + phòng loại1 áp sát <=80 trước khi combo; điều hướng bằng moveTo native, tối đa một lần/500ms và không di chuyển khi đang hồi/khóa di chuyển. Quay đủ basic đã học xen TH, bỏ ưu tiên một basic theo đo trong bộ chọn. Module59 chỉ còn cung cấp dữ liệu/candidate, không điều khiển chọn skill. Ba map đánh xa giữ cấu hình cũ. Kiểm thử đầy đủ: .kvpv-live/road-melee-full-kit-tests.log.

- Theo yêu cầu nhịp1ms: riêng Đường Thí Luyện, bộ BASIC10 quét1ms và dùng bản sao hàng TH với chờclient1ms; quay đủ basic+TH, áp sát80. Hàng hồi skill gốc giữ nguyên; cổng combat native isCooldown/target/range vẫn giữ. Không khẳng định1ms là nhịp sát thương server. Ngoài scope quay timer16ms. Kiểm thử: .kvpv-live/road-client-1ms-tests.log.

- Tối ưu quét lính Đường Thí Luyện: khi target mất/chết gọi selectTar(1,-1) native tối đa1 lần/400ms, nhường UI và boss-team; không đổi target còn sống. Ưu tiên AoE theo mô tả cấu hình có phạm vi/lân cận/xung quanh/nhiều mục tiêu, trong từng vòng đủ basic và TH để không bỏ skill. Cache metadata theo ID/level, không tăng số cast mỗi tick. Chưa khẳng định9 hit/giây hoặc tốc độ vượt ải tăng khi chưa đo đủ. Kiểm thử: .kvpv-live/road-wave-clear-tests.log.

2026-10-24: Road trial basic-only 8001; zero added client wait and polling interval. Native cooldown/range/target gates and companions preserved. Full test.cjs passed; log .kvpv-live/road-basic-only-0ms-tests.log.

2026-10-24: Road-only 8001 client isCooldown override; no added wait. Native method restored on release; other maps unchanged. Full tests passed (.kvpv-live/road-native-bypass-tests.log). Server acceptance not verified by tests.

2026-10-24: 60-quiz-auto: exact known-answer selection via native movement in scene69, server-result learning, localStorage memory, no guesses/chat broadcasts, reward quota stop. Auto-entry unverified and not implemented. Full tests passed .kvpv-live/quiz-auto-tests.log. See references/quiz-auto-notes.md.

2026-10-24: Honor scene42 entry always invokes native selectTar(2,-1) once before valid-target retention / fireGod lookup / monster fallback. Waits for revive and native API readiness. Full tests passed .kvpv-live/honor-entry-player-first-tests.log.

2026-10-24: Peak floor9 chest module61 uses config NPC type for selectTar(3,type), then verified panel166._lhi / actual tNpcId / role.occ before native _tci click. Suppresses old Daily chest sender while installed and outside combat on floor9. Pending preserved on hot reload, no click retries, success only context-matching5038. Full tests passed .kvpv-live/peak-chest-tests.log.

USER PREFERENCE — 2026-10-24: Keep Auto Daily enabled on all four accounts. Never disable Auto Daily during fixes, cleanup or updates unless the user explicitly requests it. Preserve pending jobs/ACKs. Native Tu Vuot (stage.auto) is separate from Auto Daily (quickState.running); do not report Daily off merely because stage.auto is false. Verified all four quickState.running=true on this request.

2026-10-24 user requested Tu Vuot resumed: module62 invokes Daily.tuVuotStart once per actor/window, without stopping Daily or forcing entry into ongoing activities. Report stageRequested and stageResume. Full tests passed .kvpv-live/resume-stage-user-tests.log.

USER PREFERENCE 2026-10-24: Events that are completed and rewarded must not be reentered merely because their opening window remains active. Peak: user confirms today's runs done. Module63 persists completion per actor/activity day, suppresses Peak reentry today, native exit once, resumes Tu Vuot only common+idle, leaves Daily running. New day restores prior event setting; future completion from confirmed chest ACK. Full tests passed .kvpv-live/peak-completion-tests.log.

2026-10-24 USER: Eight Floor same as Peak: finish and reward once, then leave without waiting for event close. Module14 requires native isPass and rank reward state2, persists per actor/day, no reentry after completed, pending claims carried on hot reload, restores prior stage on exit; Daily remains running. Full tests passed .kvpv-live/eight-floor-completion-tests.log.

2026-10-24 USER clarified Eight Floor also has ninth-layer chest. Module64 scene71/floor9 selects nearest native NPC, requires matching panel166 actual object and name containing ruong/Rương before native click, waits context-matching5038; module14 waits chest ACK on ninth floor and yields combat. Unknown NPC names wait rather than click. Full tests passed .kvpv-live/eight-floor9-chest-tests.log; live ninth-layer verification still pending next event.

2026-10-24 USER added Đấu Tiên Duyên. Module65 native marryFight._Z9t/_qGt, weak unbeaten opponent first, existing turns only, scene2391 tier qty[1] (native multi-fight UI price=0 at qty1), refresh only getCanRef===true -> FlushMarryArenaChallengeList; never BuyFlushTimes/BuyMarryArenaTimes. Shared scene lease, idle Daily only, pending carry and no retries, ACK via battle return or refresh list+free false. Full tests passed .kvpv-live/marry-arena-tests.log.

2026-10-24 USER: Đấu Tiên Duyên only on the two highest-power married accounts 10228867268946 and 10228867268941. Other two clones must not enter or refresh. Module66 native _Q9 pet travel: observe 4 pets, claim state2, restart state0 under native daily limit and existing home-resource affordability, first two ticket-free destinations, ticket0/speedupfalse, never buyTravelItem or travelFinish, premium currency excluded. Pending preserved across hot reload. Full tests passed .kvpv-live/pet-travel-tests.log.

2026-10-25: Login streak image ready day3. Module67 sea_contue_login native getAwardState1 and open/end validated -> getFestivalContinuityLoginReward(id) once per activity/end/id, state2 ACK, pending carry, no repeated attempts. Full tests passed .kvpv-live/login-streak-auto-tests.log. Daily stays enabled.

2026-10-25 images: Module68 free festival login/VIP ready state1 claims, activity_guide daily award state1 (appearance-card Nhan buttons are navigation, not grants), _EEt DbaoRun(0) only fTimes>0/open217/oState1/unexpired, sea_treasure existing consumable tickets only -> native runXunbao(type,0,false), positive token cost and sufficient count, currency IDs >=90000000 excluded. Serial ACK, no retries, shared treasure busy guards in34/56. Uses VN calendar day for 0h login reset. Full tests passed .kvpv-live/festival-free-tests.log.

2026-10-25: Module69 Marry Arena rank+daily rewards for married accounts8946/8941 only. Native getSegAwdState0 means ready (1 locked,2 claimed); GetMarryArenaSegAward(id), daily hasDailyAwd/state0 -> GetMarryArenaDailyAward(seg). Serial pending across reload, confirm state2, no retries/purchases. Full tests passed .kvpv-live/marry-rewards-tests.log.

2026-10-25: Module70 free Tứ Phương Bá Chủ worship native _Dd._Kpt.canThumbsUp/count and function1101 -> _C3n.ReqThumbsUpFighFourBest once per remaining-count state. Await decreasing native count, no retry/purchase, preserve pending across reload. Full tests passed .kvpv-live/four-worship-tests.log.

2026-10-25 USER CLARIFIED transformation image is SKILL USE only, not illusion upgrades or Phuc Oa skills. Unpublished family progression module remains excluded as src/family-progression-draft.js. Module13 now matches current native getTransformingSkills castable kit rather than two named old forms; native passive handling unchanged. Free-strength-only Transforming activation, owned selected form and threshold92001, live target/native cooldown/movement guards, no strength purchase or form switch; pending transformation ACK no retry. Road allows current transformation kit when enabled while ordinary Road remains8001-only. Full tests passed .kvpv-live/current-native-transform-skills-tests.log.

2026-10-25 read-only native Thiên Quan configuration audit: _ft._h$.ins active map2011, max configured floor16000. getCfgByLv14000/15000/16000 exists;16001/20000 absent. Source getter directly returns _gh[_Ait][level], no extrapolation. Native preload logs missing config beyond table. Evidence references/tianguan-client-limit-2026-10-25.json. Full checks passed .kvpv-live/tianguan-limit-read-tests.log. This is current client table, not proof of permanent server ceiling.

2026-10-25: Main account 10228867268946 Beast Island boss preference changed to level 800, layer 2; clone preferences preserved. Full test.cjs passed (.kvpv-live/main-beast800-tests.log).

2026-10-25: Ride companion follows verified owner cast event 1039 in THIEN_QUAN/LINH_LUNG/PHU_VAN. Uses native ride selector, skill target-kind config and cooldown/animation; does not require owner's basic melee range at far-combat position. Other companion AI unchanged. Scoped event filtering prevents forwarded-event recursion; listeners/timer cleaned on reload. Full tests passed: .kvpv-live/ride-follow-player-tests.log. Cast signals are not server-confirmed damage.

2026-10-25: User requested ride 1ms. Changed companion binding/state scan to 1ms; cast dispatch remains owner-event-driven with native selector cooldown/animation. This does not make actual attacks 1ms apart. Full tests passed: .kvpv-live/ride-1ms-tests.log. Vietnamese docs regenerated and verified.

2026-10-25: Three far-combat dungeons now select only player basic 8001, block TH/other basics/current transformation kit, and skip free transformation activation in that scope. Client scan 1ms, added wait 0ms; removed extra 500ms pending-basic barrier only after native combat/animation is ready. No 99x server multiplier claimed. Recovery, low-HP finish, native readiness and unmatched-hit suspension retained. Full tests passed: .kvpv-live/three-dungeons-basic-only-tests.log.

2026-10-25: Completed main-account bounded native animation x9 test (8001 native action attack_1_1). Baseline 17 matched hits / 5.051s = 3.366/s; accelerated 19 / 5.005s = 3.796/s, observed short-sample ratio 1.128, not x9 server damage. 22 scaled animations; restored native clip scales. Automatic trial startup removed after result; normal basic-only combat retained. Evidence references/basic-animation9-trial-2026-10-25.json; full final tests passed .kvpv-live/basic-animation9-final-tests.log.

2026-10-25: Main-account native 8001 animation x99 trial completed (attack_1_1, 30 scaled animations, 5 seconds each phase). Baseline 20 hits / 5.003s = 3.998/s, x99 19 hits / 5.004s = 3.797/s; short sample shows no real hit-rate gain. Restored native scale and removed auto trial startup. Evidence references/basic-animation99-trial-2026-10-25.json. Full final tests passed .kvpv-live/basic-animation99-final-tests.log.

2026-10-25: Vietnamese inline annotations installed directly in 180 original JS/CJS sources (32791 original lines), backup paths and AST/SHA proof in docs-tieng-viet/inline-source-manifest.json + verification.json. Generated documentation HTML removed; extension UI HTML preserved. User's manual factor99999 and API allowance retained, min corrected to300 with explicit consent, goal302 and moveWaitMs150 retained. Tru Tien Dai Chien native scene52 added to shared PvE far/basic8001 mode, scene lease, target eligibility and ride-follow scope. Tests cover stale/common/PvP scope rejection, 8001-only, factor persistence and companion follow. Full tests passed .kvpv-live/trutien-inline-final-tests.log.
2026-10-25: Fixed Tru Tien reacquisition after defeated/lost monster. Uses bounded native selectTar(1,-1) once per second, respects UI grace and retreat/recovery; re-arms reused monster identity. Added target type and alive monster count diagnostics. Full tests passed .kvpv-live/trutien-reacquire-tests.log. Live main acknowledged build763cdfab4503; current map2691 has zero eligible alive monsters, so waiting is expected.
2026-10-25: User requested reverting suspected factor99999 failure. Main startup now explicitly sets native animation speed1. Other combat settings and Daily preserved. Inline comments regenerated, AST/SHA verified; full tests passed restore-native-speed-tests.log.
2026-10-25: Three towers explicitly suppress both Transforming auto activators, independent of basicOnly. Basic8001 retained; separate Ma Than CallBackSpiritEquipShow remains enabled with native readiness/ACK. Full tests basic-and-mathan-tests.log passed; inline AST/SHA verified.
2026-10-25: Tian Quan pins requested distance302 once per entry/map/floor (not each tick). On new valid combat target, far controller cancels stale native movement only in FIGHT before positioning. Recovery remains authoritative. Entry/reentry/floor idempotence test added; full tests passed tianquan-entry302-tests.log; Vietnamese inline AST/SHA verified.
2026-10-25: Closed pre-HitRun Tian Quan chase gap: far movement wrapper now blocks native chase while waiting for HitRun readiness with valid monster/alive HP>35. Cancels inherited entry path once; active RETREAT remains authoritative. Full tests tianquan-entry-guard-tests.log passed; next live floor entry still requires observation.
2026-10-25: Added preinstalled current-player native moveTo guard in map coordinator; already present while armed outside. First inward destination in Tian Quan is projected to302 before native mover call, even before first entry sync. AliveHP>35, valid monster, actor and FIGHT/no-owner gates; retreat and other maps untouched, owned hook released on stop. New test covers pre-poll entry, native return, retreat, outside and cleanup. Full native-entry302-tests.log passed. Live transition still unverified.
2026-10-25: Added src/71-kiem-khieu.js using verified native _T_t._k_t / _O3n. Signup1581 before server window, idle common-scene entry8501 at elimination time, native scene84 combat, eligible unclaimed type1 damage rewards, champion keepOutSize native rounds. Persistent once keys across reload, no countdown-driven duplicate entry, no purchases/betting, yields active jobs/user/death/wrong actor. Added diagnostics and TEST_KIEM_KHIEU; full kiem-khieu-tests.log and inline AST/SHA passed. Native source evidence lines290842-291320; actual event completion pending live window.
2026-10-25: Added standalone Windows Forms KVPV Manager executable in windows-app (Framework compiler, no downloaded dependencies). Four fixed account diagnostics, stale>30s, event/combat details, bounded read-only log tail, existing Edge watcher launch, tray, optional HKCU startup set only via checkbox. Does not implement per-feature game toggles. Built and self-tested four actual reports; own-window rendering visually checked. Game runtime untouched.
2026-10-25: Windows Manager1.1 separate exe preserves running1.0. Vietnamese status + original codes, elapsed age, optional stale transition tray notification, log filter/error-only/pause, clipboard and user-selected JSON report export, bounded settings storage, optional watcher startup disabled by default, selected account and refresh interval persistence. Freshness parse invariant-culture fix covered by self-test. Build and four actual reports self-test passed; app window rendered for layout review. Runtime game controls unchanged.
2026-10-25: Windows Manager1.2 all81 module inventory with Vietnamese labels, per-account native API presence, mapped status where telemetry exists, report panel and search by title/file/API. Catalog matches build manifest; JSON export includes all module rows. Build metadata/cached diagnostics include bounded modulePresence; no module methods invoked for presence. Full module-inventory-tests.log passed; app81-count self-test and own-window screenshot passed. Live8946/8941/9023 confirmed81-module registry,9022 still stale old build. Running1.2 exe preserved; optional default-tab cosmetic edit reverted after file lock, source matches tested binary.
2026-10-25: Windows Manager1.3 adds per-actor buttons for19 audited module APIs (stop + whitelisted module reinstall/start), Daily-on only, stage on/off, bounded distance281..600 and native animation1/9/99. App writes atomic fixed JSON preferences and distinguishes saved/requested/applied ACK. Node reader validates schema, actor, types, bounds; existing bridge transports fixed data to src72 controller, no freeform JS/shell. Actor/death/UI gates; idempotent same revision and failure no replay. Preferences carry across client reload; explicit entry distance uses chosen value. Added TEST_DESKTOP_CONTROL; full desktop-control-final-tests.log passed, app isolated atomic write preserves two actors (File.Replace test outside sandbox passed),83 catalog rows/19 APIs verified and UI rendered. Restarted project watcher to load new core; regular Edge extension requires reload+reattach for new background. Live main confirmed desktopControl waiting state; actual button-to-game mutation not exercised on production accounts. Auto Daily preserved.
2026-10-25: Windows Manager1.4 discovers bounded digit-named schema1 diagnostics dynamically; no four fixed account IDs. Full actor IDs, scrollable cards, fresh-vs-cached labels, selection/settings by actor ID; new actor preserves selected actor, disappearing selected report clears selection. Fixed-source validation ignores reparse/oversized/mismatched/malformed files. Edge popup adds trusted attachAll for exact game URLs,32 tabs max, independent failure handling. TEST_EDGE_ATTACH_ALL and full account-discovery-tests.log passed; app test passed6 actual reports plus generated new actor/selection/malformed cases, UI rendered. Observed newly discovered10158939833447. Edge reload and user popup attach are required for normal browser tabs; no arbitrary Edge credential access.
2026-10-25: Windows Manager1.5 adds per-actor aliases with atomic settings and preserved unknown settings, account-card ID/name search and hide-stale filters without changing selected actor, explicit Edge-extension vs dedicated-profile connection guide, improved local/requested/applied/error messaging, and bounded200-entry control history. Only observed fresh client ACK/error is persisted; superseded unobserved revisions are not marked success. Explicit retry creates new revision, no automatic replay. App tests cover discovery, atomic actor preferences, alias persistence, matching filters, ACK persistence/error and retry in isolated fixture; actual6 diagnostics read. Main/control/history/connection windows rendered and reviewed. No game/runtime/extension code changed in1.5.

### Windows Manager 1.6 (2026-10-25)
Thêm cấu hình mẫu: lưu cấu hình đã gửi, xem trước theo acc đích, áp dụng tường minh, nhập/xuất JSON và xóa. Giới hạn 20 mẫu/64 KB; kiểm tra trường, kiểu và danh sách module. Không mang actor/revision vào mẫu; áp dụng tạo revision mới và dùng lịch sử ACK hiện có. Thêm xuất lịch sử theo bộ lọc. Auto Daily chỉ cho phép bật. Kiểm thử fixture độc lập xác nhận nhập/lưu không gửi lệnh, từ chối dữ liệu sai và áp dụng đúng acc, giữ cấu hình acc khác. Không sửa runtime game.

### Manager 1.7 — stage stop (2026-10-25)
Phát hiện báo cáo actor 10158939833447 vẫn waiting_desktop dù file local đã stageAuto=false; cần gắn lại tab nếu extension cũ. Sửa desktop-control xử lý dừng trước gate chết/UI và module khác, kiểm tra lại khi native tự bật hoặc API được thay. stageAllowed chặn tuVuotStart/Reset của task qua stage guard khi Manager giữ false; chỉ profile true mới gỡ. UI hiển thị desired/client/native riêng, không báo đã dừng khi native còn bật. Auto Daily được giữ nguyên. TEST_DESKTOP_CONTROL thêm regression chết/UI, drift và chặn scheduler start/reset. Manager 1.7 fixture PASS; full test và inline verification PASS.

### Manager 1.8 — batch account controls (2026-10-25)
Thêm tab Nhiều acc: checkbox theo actor ID, chọn acc mới cập nhật, bỏ chọn, bật Daily và bật/dừng tự vượt. Ghi toàn bộ batch atomically một lần, revision riêng từng acc; giữ profile không chọn và các trường khác. Không mặc định chọn acc mới; acc mất khỏi discovery không giữ dấu tích. Theo dõi ACK/error và native auto riêng, stale đánh dấu rõ. Giới hạn 8 actor, loại rỗng/trùng/không còn trong danh sách, không cho Daily-off. Self-test fixture PASS kiểm tra bảo toàn acc không chọn, dấu tích, reject không ghi file và phân biệt ACK/native. Kiểm tra ảnh batch-preview.png. Không thay runtime game hoặc gửi lệnh nhóm thật trong lúc kiểm thử.

### Manager 1.9 — batch presets (2026-10-25)
Tab Nhiều acc thêm selector mẫu và xem trước diff từng actor trong cửa sổ riêng. Preview tạo bản kế hoạch độc lập không sửa file; áp dụng tường minh ghi atomically, kiểm tra snapshot để tránh ghi đè thay đổi sau preview. Gộp module/field có trong mẫu, giữ field khác, revision từng actor và history ACK. Danh sách mẫu đồng bộ khi thêm/xóa/nhập. Self-test PASS cho preview không ghi, deep-copy, merge, bảo toàn acc không chọn và reject snapshot cũ. GUI batch-preview.png đã kiểm tra. Không gửi lệnh thật hoặc thay runtime game.

### Manager 1.10 — batch module controls (2026-10-25)
Thêm selector 19 module từ control-schema, hai nút xem trước bật/tắt, trạng thái module riêng từng actor. Dùng chung PreviewBatchConfig cho mẫu và module; tạo payload chỉ chứa một modules entry rồi merge giữ trường khác. Không cung cấp module hạ tầng/Daily-off. Regression fixture kiểm tra whitelist, merge không đổi module khác/combat/acc không chọn và preview không ghi. Bản đóng gói 1.10 self-test PASS; giao diện batch-preview.png đã xem. Chưa gửi lệnh thật, không thay runtime game.

### Manager 2.0 (2026-10-25)
Release v2: giao diện 1240x940/min1000x820, tab multiline, header gọn nhưng giữ thẻ acc đủ chiều cao. Batch search theo tên/ID và 5 bộ lọc; đổi bộ lọc bỏ checked, actor ẩn không nằm trong payload. Thêm chẩn đoán đọc-only từng actor: freshness/build/revisions/desired/native, chỉ dẫn theo từng trạng thái, xuất text. Dùng file settings/presets/history/control hiện có, không migration phá dữ liệu. Self-test packaged PASS bao gồm filter/count/clear checked và diagnostics không ghi control; GUI batch/diagnosis đã xem. Không đổi runtime game hoặc gửi lệnh vào acc thật. MO_APP_WINDOWS.bat và build mặc định chuyển sang KVPV-Manager-2.0.exe.

### Manager 3.0 (2026-10-25)
Thêm Nhóm acc: file manager-account-groups.json schema1, max20 nhóm x8 actor, giới hạn32KB, kiểm tra ID/name/duplicate, chọn bằng ID không tự thêm acc mới. Chọn nhóm reset filter và checked rồi chỉ tích actor hiện có; không gửi control. Save/delete atomic có rollback danh sách nếu ghi lỗi. Nhớ tab theo tên trong settings; không dùng index dễ lệch khi thêm tab. Sao lưu JSON danh sách cố định 5 file Manager, bỏ reparse/oversize, không đọc profile browser hoặc mã thực thi; chưa có restore. Preview không ghi settings thật khi chuyển tab. Packaged self-test PASS nhóm/select/delete, tab restore, backup whitelist và preservation; nhóm-preview đã kiểm tra. Không thay runtime game hoặc gửi lệnh vào acc thật. Launcher/build mặc định 3.0.

### Manager 4.0 (2026-10-25)
Thêm sửa tên/thành viên nhóm có rollback in-memory nếu persist lỗi. Thêm restore mẫu hoặc nhóm từ bundle v3/v4: whitelist fields/type/IDs/count/size, preview danh sách và chọn loại thay. Không import controls/settings/history, không gửi game command. Snapshot file hiện tại chống stale preview; giữ dữ liệu cũ ở .before-restore.json rồi atomic replace file đã chọn, refresh UI. Mỗi lần chỉ restore một loại nên không có transaction đa file dang dở. Self-test packaged PASS: sửa nhóm, restore cả hai loại, bảo toàn controls, backup-before, bad IDs/duplicates/unknown fields và stale rejection. Nhóm-preview đã kiểm tra. Launcher/build mặc định KVPV-Manager-4.0.exe.

### Manager 5.0 (2026-10-25)
History nâng cấp: search alias/actor/summary/revision/error, status modes applied/error/current pending/superseded unconfirmed, kết hợp selected-only. Export dùng chung HistoryMatches. Chi tiết read-only qua button/double-click; row Tag chứa bản ghi, selection giữ theo revision qua refresh. Không replay lịch sử. Self-test packaged PASS các mode/search và toàn bộ regression cũ; history-preview đã xem. Không thay runtime hoặc gửi lệnh thật. Launcher/build mặc định Manager-5.0.exe.

### Manager 6.0 (2026-10-25)
Thêm tab Cần xử lý với ActorIssue: ưu tiên stale, error đúng current requested revision, stage mismatch sau ACK, rồi pending quá ngưỡng theo history revision. Thiếu createdAt hiển thị unknown_wait, không đoán tuổi lệnh; fresh chưa có profile hoặc applied không tạo overdue. Ngưỡng30–3600 mặc định60 lưu settings. Search/hide stale/export JSON, giữ selected actor qua refresh, mở đúng actor vào control. Không auto replay/restart. Packaged self-test PASS branches timing/offline/error/mismatch/no-write/filter và regression cũ; issues-preview đã xem. Launcher/build mặc định6.0.

### Road Trial disconnect pacing fix (2026-10-25)
Người dùng báo Đường Thí Luyện ngắt server. Source12 còn scene41 poll0ms + isCooldown false + rewrite basic readiness; chưa có server close reason để kết luận nguyên nhân. Đổi riêng road: poll100ms, cast spacing tối thiểu250ms, giữ native isCooldown và readiness row, vẫn melee80 và chỉ8001. Ngoài road giữ nguyên. Regression TEST_BASIC10 kiểm tra không phát thêm khi cooldown hoặc trong100 lần poll dồn, cho lại sau spacing, status bypassfalse; full test.cjs PASS và inline verify PASS. Không tự đăng nhập lại hoặc gửi thử combat lên server.

### Activity-first Manager 7.0 (2026-10-25)
Theo yêu cầu chọn nơi đi → nhân vật → bắt đầu: thêm Hoạt động với nested tabs cho Thiên Quan và19 control-schema modules. Mỗi page actor combo độc lập, không auto-select actor đầu tiên, giữ ID qua refresh và clear khi mất actor. Start/Stop merge profile đúng actor qua helper batch hiện có, stageAuto cho TQ hoặc single modules entry; dailyEnabledtrue, không stop module khác. Block stale actor; mô tả rõ native scheduler/giờ/lượt và module hỗ trợ không phải chuyển map. Card click chọn actor cho activity active. Ẩn selector nâng cao khi activities để tránh hai lựa chọn khác nhau. Packaged self-test PASS actor isolation/global selection unchanged, offline reject/no-write, tower start-stop preserving fields, disappearing actor; GUI activities-preview đã xem. Preview không persist ACK history. Chưa gửi lệnh thật. Launcher/build mặc định7.0.

### Manager7.1 — simplify primary navigation
Theo ảnh user gạch bớt tab: giữ hai primary tabs Hoạt động/Nâng cao, reparent TabControl cũ vào Nâng cao để giữ dữ liệu và command handlers. NavigateAdvanced mở cả parent và subtab kể cả khi child vốn đang selected; restore/save tab theo tên tương thích; activity card selection dùng mainTabs. Global actor selector chỉ hiện Advanced. Fixture PASS toàn regression + main two-tab parenting và repeated navigation; activities-preview đã xem. Không gửi game commands. Launcher7.1.

### Road Trial skill stall — native handoff (2026-10-25)
User báo kẹt skill sau fix pacing. Báo cáo mới nhất ngoài scene41; lịch sử hai actor8941/8946 có239/240 và238/240 hit nên chưa chụp được trạng thái kẹt trực tiếp. Đổi BASIC10 riêng road: release các hook cũ trước khi bind, giữ selector/combat native, không gọi selectSkill/combat tự động và không sửa skill rows. Chỉ observe cadence, bounded target reacquire400ms và approach500ms có gates identity/dead/UI/boss-team/hidden. Observer giữ listener giữa ticks. Road100ms scan; không báo basicOnly/skillGap khi native sở hữu bộ skill. Ngoài road giữ custom combo và restore hooks khi chuyển scope. TEST_BASIC10 regression native functions unchanged, no dispatch/row mutation, true cooldown preserved, bounded movement/retarget và outside rebound; full test.cjs và inline verify PASS. Chưa xác nhận cảnh kẹt game thật vì các acc đã ra ngoài.

### Road support in Manager7.2
User xác nhận muốn quản lý bản hỗ trợ vừa sửa, không yêu cầu room entry. Thêm enabled/start/stop vào59-road-cadence, carry enabled qua reload, release observers khi stop; BASIC10 road branch kiểm tra enabledfalse để không áp sát/tìm mục tiêu. Native selector/combat vẫn nguyên. Thêm59 vào schema, catalog Road title/report đúng, tab Đường Thí Luyện ưu tiên sau Linh Lung, Bật/Dừng hỗ trợ và mô tả rõ tạo/vào phòng thủ công. Road/Basic/Desktop focused và full test.cjs PASS; Manager fixture20APIs PASS bao gồm per-actor road toggles. GUI road-activity-preview đã xem. Launcher7.2.

### Manager7.3 — remove advanced navigation
User yêu cầu bỏ hẳn Nâng cao, đưa chỉnh sửa lên tab hoạt động. Bỏ advancedPage khỏi mainTabs, chỉ Hoạt động hiển thị; Cài đặt app chuyển vào activityTabs. Legacy utility views không render thường trực, mở riêng bằng modal NavigateAdvanced với reparent/restore controls để không mất dữ liệu. ActivityPage có Distance/Speed/Alias editors + Save và DailyOn, load theo localactor selection, không dùng globalactor. Profile merge giữ lựa chọn khác và acc khác. Fixture PASS main single-tab layout, per-activity editor save/read and actor isolation; activities-preview đã xem. Launcher7.3, không thay game runtime.

### Manager7.4 — explicit combat mode controls
Theo yêu cầu đưa đánh tay Thí Luyện và tương tự lên Manager: UI mode cho Road(native/basic8001) và tower BasicOnly(bool shared scopes), tách hoạt ảnh. Add profile validation/relay/src72 setters, fail missingAPI, history/preset support. Road59 carry mode và APIset; Road12 chỉ lọc native selector rows8001 giữ row references/native readiness, không scriptcombat/cooldown bypass; restore đúng owner khi disabled/native/outside/stop. Full tests + inline verify PASS; focused confirms preserved native cooldown, no scriptcast, legitimate selector row update, switch restore, modecarry/invalidreject; Manager fixture confirms save mode targeted actor. GUI road-activity-preview đã xem. Launcher7.4; chưa send live mode commands.

### Manager7.5 — Road pacing UI
Thêm numeric0–5000ms + Apply trong tab Road, key roadMinCastMs integer validated qua C#/native relay/src72. Module59 setter/getter/status/carry. Module12 thêm native combat wrapper giới hạn khoảng cách và selector gate trước native selection để không consume cooldown row khi đang chờ. Không gọi combat chủ động hoặc override cooldown;0/native/default không hook combat; release guard tránh ghi đè hook foreign khi off/outside/stop. Tests timing499/500, burst bounded, row untouched when blocked, native cooldown unchanged, zero restore, carry/invalid, bridge setter and UI peractor500ms PASS; full test.cjs + inline verify PASS. Road UI preview đã xem. Launcher7.5. Chưa gửi live pace commands; reload extension required for updated profile schema.

2026-10-25: Manager 7.6 adds Thiết lập chiến đấu with actor/dungeon-specific mode, interval and distance. Fixed schema combatProfiles merges retain unrelated actors and dungeons. Runtime getters resolve current dungeon; Road uses approach threshold and native cooldowns. Added validation, UI persistence/selection tests and scope switching regression. No live gameplay commands sent during development.

2026-10-25 Manager 7.6.1: Investigated saved LINH_LUNG mixed profile versus client basicOnly=true and older acknowledged revision. Long-running native reader can retain old profile validator, dropping profiles containing combatProfiles. Native host and standalone watcher now reload desktop-controls reader per poll. Manager explicitly flags unacknowledged changes; existing old native sessions require extension reload/reattach once. Simulated actual cast transitions basic→mixed→basic pass across four dungeon scopes; full test suite and Manager fixture tests pass. Live game change remains unverified until reconnection.

2026-10-26 Manager 7.7: moved ride-follow page into central combat settings, added optional per-actor/per-dungeon rideFollow and mansionFollow flags with backward compatible strict validation. Mansion client evidence: references/614c28c7-24f7-458f-adcc-5d33082648bc.devtools around 43140–43165 creates mansionContext type 12 with native skill selector/combat. Follows player cast only, native cooldown/target/range required, no context creation or skill-row edits. Companion forwarding recursion guard and independent toggles tested; no live game commands sent. Nested profile validator now refreshes after updates, regression tests cover stale require cache. Manager fixture validates flag persistence, scope isolation and module activation; unsupported Road controls disabled.
