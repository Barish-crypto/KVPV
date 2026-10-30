**Mới:** Có `git-sync/` để tự lấy mã nguồn GitHub về Windows sau khi thiết lập một lần. Xem `git-sync/HUONG_DAN.md`. Không tự đẩy commit từ cuộc trò chuyện này nếu chưa kết nối quyền GitHub.

Chính sách hiện tại: **không tự tiêu KNB**. Quyền càn quét/cổ vũ bằng KNB trước đây đã được thu hồi theo yêu cầu mới nhất. Thí Luyện chỉ khiêu chiến còn lượt, cổ vũ bằng vàng đến giới hạn vàng. Popup Đồng ý có phí hoặc callback chưa xác minh miễn phí giữ thủ công; không suy ra miễn phí chỉ vì nội dung không nhắc KNB.

# KVPV V1

## Tự đồng bộ vào trình duyệt, không Snippet / F5

**Dùng tab Edge đã đăng nhập:** chạy `CAI_DONG_BO_EDGE.bat`, tải thư mục `edge-addon` ở `edge://extensions`, rồi bấm tiện ích → **Bật đồng bộ tab này**.
Xem [DONG_BO_TAB_EDGE.md](DONG_BO_TAB_EDGE.md). Cách này không cần chuyển cửa sổ hoặc đăng nhập lại.

Phương án khác: chạy `BAT_TU_CAP_NHAT.bat`, đăng nhập game ở cửa sổ Edge riêng được mở.
Khi lưu nguồn `src/`, bộ theo dõi tự build + kiểm thử rồi nạp bản mới vào game-frame đang mở.
Không cần cài tiện ích hoặc copy/paste. Xem [TU_CAP_NHAT.md](TU_CAP_NHAT.md) để bật, dừng và xem log.

## Hành vi hiện tại

DPS thụ động: `KVPV_TH300.dps()` in bảng, `KVPV_TH300.dps(false)` lấy báo cáo để xuất JSON. Ghi riêng 8001–8005, Tuyệt Học 1001–1008 và nhóm khác; có DPS toàn trận, đóng góp trong thời gian FIGHT đánh/chờ chiêu và cửa sổ 10 giây gần nhất. Chỉ cộng damage đã ghép được với cast, không coi số lần gọi là hit, không tính được đầy đủ DOT/nhiều hit/trợ chiến. Báo cáo không tự đổi combo hay tạo timer; giữ tối đa 20 trận, 64 chiêu và 1024 mẫu damage cho cửa sổ gần nhất. Các số DPS là phần damage đã xác nhận ghép cặp, không phải tổng DPS server.

Riêng Thiên Quan: năm chiêu tay 8001–8005 đã học (gồm 8002) xen Tuyệt Học native đã hồi; wait client 10 ms, vẫn giữ cổng cooldown/hoạt ảnh native và timestamp gốc của Tuyệt Học. TH đang hồi thì tiếp tục vòng tay. Đo tầm chủ động tạm ngưng TH để chỉ đo năm chiêu tay; kết thúc tự bật lại. Tắt/bật TH riêng bằng `KVPV_TH300.setTianQuanTuyetHoc(false/true)`. `KVPV_TH300.rangeReport()` ghi riêng số lần thử, cặp cast–damage và khoảng cách xác nhận từng chiêu; không coi gọi chiêu là trúng và không suy ra tầm tối đa từ một mốc đo.

Giữ focus engine là Snippet riêng `KVPV_GIU_FOCUS.js`: khóa cờ `_isFocused`/`_isVisibility`, không phát sự kiện focus/focuschange giả; khôi phục bằng `KVPV_FOCUS_HOLD.stop()`. Không đổi focus thật của tài liệu, input, cấu hình combat, frame rate hay lịch Daily. Đây là cờ engine, không bảo đảm trình duyệt giữ nguyên nhịp timer khi tab nền.

Giảm tải: ba vòng quét phụ Cổ Bảo, Đá Hồn, trợ chiến dùng 50 ms thay vì 1 ms. Trợ chiến vẫn phản ứng theo sự kiện tung chiêu của chủ; lượt quét nền không dựng báo cáo trạng thái. Combo chính Thiên Quan vẫn wait 10 ms. `KVPV_DO_LAG_10S.js` đo nhịp rAF, độ trễ timer và long task (nếu có), không sửa gameplay. Sau thay đổi tải, F5 rồi chỉ nạp FULL mới để so sánh trước khi thử focus riêng.

Đo chủ động: chạy `KVPV_DO_TAM_5_CHIEU_THIEN_QUAN.js` trong pha FIGHT với HP ≥70%. Đo từ 302 xuống 80, tối đa hai lần thử mỗi mốc/chiêu, cần hai hit khớp để xác nhận; tối đa năm phút. Có thể trúng đòn khi áp sát. Tạm dừng đo/áp sát lúc HP <70% hoặc né/hồi máu; đổi Boss/map thì hủy đo. Kết thúc quay về mốc xa cũ. Dừng bằng `KVPV_TH300.stopTianQuanBasicRangeTest()`; xem bằng `KVPV_TH300.rangeReport()`.

Lãnh Địa Boss (luồng Daily, map 2164): các Boss mở tầng ban đầu vẫn đánh chết để đi tiếp. Chỉ tên chứa Thần Binh, Thời Trang, Linh Ti/Tỉ hoặc Linh Dực mới áp dụng chuyển Boss ở HP ≤11% để lấy thưởng rơi, không chờ giết. Không suy ra nhóm rơi đồ theo số tầng/thứ tự danh sách; thiếu tên/HP thì tiếp tục luồng đánh bình thường. Chỉ thoát sớm khi đã nhận diện đủ bốn nhóm và mọi Boss trong danh sách đã tới ngưỡng hoặc có trạng thái chết native. Ngưỡng chỉnh bằng `KVPV_TERRITORY_LOOT.setCutoff(11)`; đây là ngưỡng người dùng cung cấp, chưa xác nhận phần thưởng từ server.

Tinh Thần mặc định chọn tầng 6, kể cả khi bật lại FAST927; vẫn kiểm tra mở tầng bằng UI native. Bản vá riêng `KVPV_TINH_THAN_TANG_6.js` chỉ đổi cấu hình cho lượt chọn tiếp theo, không ép chuyển tầng đang đánh.

Đánh–né dự báo và các bản thử áp sát hiện chỉ dành cho Boss Thiên Quan. Nhận diện theo phạm vi native và đúng Boss tầng; phần mở rộng Boss mọi map đã tắt, kể cả gọi lại API cũ `setAllBosses(true)`. Linh Lung/Phù Văn/Tru Tiên giữ combat riêng hiện có. Bản áp sát trực tiếp tự dừng khi rời Thiên Quan; dự báo vẫn cần đủ mẫu. Lần cập nhật này sửa engine lõi: cần F5 rồi nạp FULL mới; nạp nóng giữ engine cũ nên chưa đủ.

Thí Luyện: bỏ chọn/xả skill 1 ms, giao chọn chiêu cho native, giữ hồi chiêu gốc; kiểm tra hỗ trợ mỗi 100 ms và giới hạn hai lần tung đòn cách nhau ít nhất 100 ms (cấu hình cũ thấp hơn cũng được nâng lên 100). Lệnh áp sát cách nhau ít nhất 1000 ms, không phát lại khi nhân vật đang chạy. Chưa xác nhận mức DPS hoặc nguyên nhân server đóng kết nối. Bộ đếm `rejected` là bộ lọc bằng chứng, không phải server từ chối chiêu.

FULL tự bật các module sau khi nạp đúng game-frame:

- Thiên Quan, Linh Lung, Phù Văn và Tru Tiên: mặc định đứng khoảng 302, ưu tiên skill sẵn sàng trước đòn thường; bỏ khóa chỉ đánh 8001 và quota chờ hit thường. Xếp hạng chiêu theo sát thương trực tiếp khi có ít nhất hai hit xác nhận, mỗi bốn lượt vẫn quay vòng để lấy mẫu. Đánh thường 8001 lấp lúc skill chưa sẵn sàng.
- Chỉ Thiên Quan: HP <=35% rút ra vòng ngoài Boss, chờ đủ 100% rồi mới đánh lại.
- Linh Lung: tiếp tục đánh khi còn sống trong cửa sổ 30s, không dùng chu kỳ hồi máu 35/100.
- Ngoài phạm vi chiến đấu tầm xa: ưu tiên Tuyệt Học đã hồi chiêu, đánh thường lấp thời gian hồi; kiểm tra mỗi 16 ms. Áp dụng với mục tiêu native hiện tại ở cả PVE và PVP. Thí Luyện vẫn dùng bộ chọn native riêng.
- Mọi map: tốc di chuyển client x99; thời gian chờ chọn chiêu client Linh Thú/Phúc Oa 1 ms, Ngự Thú/Phi Phong còn 1/10.

75 ms và 10 ms là nhịp kiểm tra phía client, không bảo đảm số đòn trên server.
Tăng tốc trợ chiến/di chuyển là thử nghiệm client; chưa xác minh server chấp nhận.
Daily và các tác vụ nền vẫn độc lập. Không có module PK tự chọn mục tiêu.

## Nạp và cập nhật

- Lần đầu: dùng KVPV_V1_FULL.js. Hai tệp BAT mở/chép đúng tệp này.
- Phiên đã chạy V1: dán KVPV_SCAN_LIVE_PATCH.js để cập nhật tại chỗ, không F5.
  Bản vá tháo các controller cũ rồi nạp lại và tự bật; dữ liệu đo SCAN được khởi tạo lại.
- Không nạp tệp trong archive/. FULL hiện hỗ trợ chạy lại cùng Snippet: tự chuyển sang cập nhật combat tại chỗ.
  Engine/Daily đang chạy được giữ lại để tránh nhân đôi timer; thay đổi engine lõi chưa được nạp nóng.

## Điều khiển

```js
KVPV_MODE.status(false)              // map, mode và lý do chờ
KVPV_TH300.report()                  // khoảng cách, lần gọi chiêu và hit xác nhận
KVPV_TQ_SCOPE.status()               // dữ liệu nhận diện map
KVPV_MODE.stop()                     // dừng Thiên Quan và tự bật lại
KVPV_MODE.armTianQuan()              // bật lại theo dõi Thiên Quan
KVPV_BASIC10.stop()                  // dừng combo đánh tay + Tuyệt Học ngoài map
KVPV_BASIC10.start()                 // bật lại combo ngoài map
KVPV_EXPERIMENTAL_BOOST.stop()       // tắt boost, khôi phục giá trị gốc
KVPV_EXPERIMENTAL_BOOST.start()      // bật lại boost
```

MODE.stop() không dừng BASIC10 hoặc boost toàn map; dùng lệnh dừng riêng ở trên.
Ngoài phạm vi chiến đấu tầm xa, MODE OFF là bình thường; BASIC10 vẫn chạy với nhịp kiểm tra 16 ms. Tuyệt Học sẵn sàng được dùng liên tiếp theo vòng, không bắt buộc xen đòn thường. Hồi chiêu Tuyệt Học, cổng combat và tầm đánh vẫn do native kiểm tra. Chưa đo mức tăng DPS thực tế; thứ tự này chưa xét hiệu ứng khống chế, buff hoặc nhiều hit của từng chiêu.

Đổi thứ tự để so sánh trong cùng điều kiện:

```js
KVPV_BASIC10.setSkillPriority('interleaved')     // combo xen kẽ cũ
KVPV_BASIC10.setSkillPriority('tuyet_hoc_first') // mặc định mới
```

Thiên Quan/Linh Lung/Phù Văn/Tru Tiên dùng combo Boss mới khi khởi động. Cấu hình riêng trong app (`basic8001` hoặc `towerBasicOnly`) vẫn được ưu tiên nếu bạn đã bật. Thí Luyện giữ bộ chọn riêng. Có thể dùng `KVPV_TH300.setSkillPriority('interleaved')` để so sánh combo xen kẽ. Sát thương trực tiếp đã ghép hit chưa phản ánh đầy đủ DOT/nhiều hit hoặc DPS toàn bộ chiêu.

## Tổ chức nguồn

Sửa src/ hoặc runtime-v1.js; chạy `node test.cjs` để build và kiểm thử.
Build tạo FULL, bản vá và MANIFEST.json chứa SHA-256.
Kiểm thử giả lập không thay thế kiểm tra chiến đấu thực tế.

- 06-range.js: giữ RANGE281 làm API tương thích cho phép đo tầm client.
- 08-range-evidence.js: giữ khoảng cách và đo cặp gọi chiêu/sát thương trực tiếp.
- 09-modes.js: chuyển quyền điều khiển theo map.
- 10/11/12: boost thử nghiệm, tự bật Thiên Quan, đánh tay ngoài map.
- STAND281 đã chuyển sang archive/stand281-unused.js, không còn tạo timer trong FULL.
- BOSS_TH cũ còn giữ để tương thích; mặc định dùng BOSS_TH300_SCAN ở 302.

Tên TH300/RANGE281 và một số nhãn phiên bản nội bộ là API lịch sử, không phải
khoảng cách mặc định hiện tại. Engine 04 vẫn là khối lớn; chưa tách hết nội bộ.

## Biến Thân 10 ms

KVPV_TRANSFORM10 nhận đúng tên trong danh sách Biến Thân native (mode 2):
Huyết Ma Đại Pháp, Huyết Ngục Quỷ Thủ, Huyết Khế Tổ Chú, Huyết Ma Hình Phạt.
Chỉ khi đang Biến Thân mới áp dụng thời gian chờ chọn chiêu client 10 ms.
Không tự Biến Thân, không phát chiêu không có trong danh sách native, không sửa hàng CD gốc.
Ngoài Thiên Quan phối hợp BASIC10; trong Thiên Quan giữ gate vị trí 302 và hồi máu 35/100.
Kiểm tra: KVPV_TRANSFORM10.status(); dừng thử nghiệm: KVPV_TRANSFORM10.stop().
Hồi chiêu/hoạt ảnh combat và việc server chấp nhận vẫn là giới hạn thực tế.

## Thiên Thê 8 Tầng

`KVPV_EIGHT_FLOOR` tự bật: 21:00–21:30 (giờ Việt Nam), Thứ 2/4/6/Chủ nhật.
Chỉ yêu cầu vào map 7101 khi server mở cảnh 71, chức năng 903 mở, hết cooldown,
nhân vật rảnh/không đội và ngoài Thiên Quan. Tạm dừng Tự Vượt native khi giữ cảnh,
khôi phục khi rời sự kiện. Không chen vào Daily đang làm việc hoặc HitRun đang chạy.
Theo dõi tầng/điểm và dùng auto-target native; game tự chuyển tầng khi đủ điểm.
Có Boss đặc biệt thì chọn quái; nếu không có sẽ giữ lựa chọn native 1/2 hoặc chọn người chơi.
Nhận thưởng BXH khi rankInfo[2]=1; mỗi trạng thái chỉ gửi một lần, đợi state=2 xác nhận.
Hết giờ và server đóng thì đợi 35 giây trước khi yêu cầu thoát.
Trạng thái: `KVPV_EIGHT_FLOOR.status()`; dừng: `.stop()`; bật lại: `.start()`.
Chưa xác nhận trận sự kiện live. Đối chiếu nguồn: references/eight-floor-source-notes.md.

## Chiến Trường Vinh Dự — ưu tiên người

`KVPV_HONOR_TARGET` chỉ hoạt động trong cảnh loại 42; dùng lại luồng vào/ra Vinh Dự hiện có.
Vào cảnh gọi nút Tìm người native (selectTar(2,-1)); nếu có người giữ Hỏa Thần khác đội,
dùng getPlayerPos/setPlayerTarget hoặc reqSearchObj(1,id) và phản hồi native 5978.
Giữ mục tiêu địch hợp lệ. Sau 1,5 giây chưa có người thì tìm quái; thử tìm người lại mỗi 8 giây.
Chết thì chờ hồi sinh; ngoài cảnh 42 không chọn mục tiêu.
Trạng thái: KVPV_HONOR_TARGET.status(); dừng: .stop(); bật lại: .start().
Kiểm thử giả lập đã qua, chưa xác nhận một trận Vinh Dự live.

## Chiến Đội Mạnh Nhất

`KVPV_STRONGEST_TEAM` tự bật. Vào qua native _T3._E2n.ins.enterScene() (8201,1)
chỉ khi server mở scene82, có Chiến Đội, đội chưa bị loại/chưa có người thắng,
hết thời gian chờ và không có Daily/Thiên Quan/HitRun đang chiếm cảnh.
Server open là điều kiện chính; không ép vào theo lịch cứng cũ 20:00–20:27.
Sau khi cảnh82 được xác nhận: đọc vòng đấu, BXH/điểm; chọn địch từ danh sách native,
không có địch thì chọn Boss đang có, nếu chưa có Boss thì đến điểm thu thập phe mình.
Giữ tiến trình thu thập đang diễn ra. Không ép đổi vòng; server tự quyết định.
Nhận từng mốc thưởng state=1 đúng ID; đợi state=2 xác nhận, không lặp yêu cầu chưa ACK.
Server đóng thì đợi 90 giây (150 giây nếu còn thưởng pending) trước khi yêu cầu thoát.
Dự đoán/ủng hộ đội và hành lễ không được tự động hóa.
Trạng thái: KVPV_STRONGEST_TEAM.status(); tắt: .stop(); bật lại: .start().
Đã kiểm thử giả lập; chưa xác nhận một trận live đầy đủ.

## Nhịp Tuyệt Học tự chỉnh, bắt đầu 1 ms

`00-skill-pacing.js` dùng cặp gọi chiêu–sát thương trực tiếp đúng Boss để điều chỉnh.
Bắt đầu 1 ms, giới hạn 1–500 ms; mỗi lô 8 kết quả đủ điều kiện mới xét đổi nhịp.
Có >=7/8 hit xác nhận thì nhanh hơn một bậc; <=4/8 thì chậm hơn; còn lại giữ nguyên.
Chỉ các chiêu đã có hai cặp sát thương độc lập trước lúc gọi mới ảnh hưởng việc chỉnh nhịp.
Chiêu chưa chứng minh gây sát thương, hồi máu/né, rời vị trí và đổi Boss không bị coi là đánh hụt.
Không gọi lại cùng chiêu khi còn chờ hit của lần trước (Tuyệt Học thường), tránh ghép nhầm hit.
Đổi Boss đặt lại mức 1 ms và mẫu học. Luân phiên chiêu còn sẵn sàng, tôn trọng isCooldown native.
Biến Thân giữ cấu hình riêng 10 ms; đánh tay ngoài map giữ nhịp 10 ms.
Xem `KVPV_TH300.report().adaptivePacing`. Timer 1 ms có thể bị trình duyệt giới hạn;
không có bảo đảm 1000 đòn/giây, phạm vi server hoặc mức tăng sát thương thực tế.
# Thống kê hiệu quả Tuyệt Học theo từng Boss

Bản FULL tự ghi số liệu khi TH300 theo dõi Boss Thiên Quan, không cần bật thêm timer hoặc gọi lệnh đánh. Xem bảng chiêu của Boss hiện tại:

```js
KVPV_TH300.performance()
```

Lấy báo cáo cả Boss hiện tại và tối đa 20 trận trước để so sánh sau khi thử 3 Boss liên tiếp:

```js
copy(JSON.stringify(KVPV_TH300.report()))
```

Trong `performance.current` và `performance.completed`:

- `skills`: ID chiêu, số lần gọi client (`attempts`), cặp tung chiêu/trúng đã ghép (`hits`), sát thương đã ghép (`matchedDamage`), mẫu hết hạn chưa xác nhận (`unconfirmed`), mẫu gián đoạn (`interrupted`) và mẫu đang chờ (`pending`).
- `confirmationRate`: hits / (hits + unconfirmed); loại mẫu gián đoạn và đang chờ. Đây là tỷ lệ xác nhận trong phép đo, không phải tỷ lệ trúng thật của máy chủ. Mẫu số bằng 0 trả `null`.
- `timeMs`: thời gian quan sát từng trạng thái, gồm `native_cooldown`, `waiting_pace`, `skill_readiness`, `positioning`, `recovery`, `dodge`, `fighting` và các lý do chờ khác. Thời gian `fighting` không chứng minh đang liên tục gây sát thương.
- `paceMs`, `paceReason`, `paceHistory`: nhịp yêu cầu, lý do gần nhất và tối đa 60 thay đổi nhịp/lý do trong trận.
- `recoveryResumes`: số lần bộ đánh xa nhận lại quyền từ pha khác về FIGHT. Đối chiếu với các hit sau đó để kiểm tra đánh lại sau hồi máu.

Sát thương được ghép dùng bộ lọc trực tiếp của TH300; có thể không tính các hit tiếp theo của kỹ năng nhiều hit. Không cộng sát thương linh thú/phản lại vào chỉ số này. Đổi mục tiêu, dừng module hoặc cập nhật FULL sẽ kết thúc hoặc thay bộ nhớ thống kê; xuất báo cáo trước khi cập nhật nếu cần giữ kết quả.

# Linh Lung Tháp: Tuyệt Học xa như Thiên Quan

FULL tự bật hỗ trợ đánh xa khi nhận diện đang trong map Linh Lung theo cấu hình tầng native. Khoảng cách mặc định **302 từ Boss/quái đang chọn đến nhân vật**; SCAN thử bộ kỹ năng native, giữ cơ chế nhịp thích nghi và bằng chứng sát thương hiện có.

Để bắt đầu vượt các tầng liên tiếp bằng bộ vào tầng/nhận thưởng đã có:

```js
KVPV_LINHLUNG_TH.start()
```

Có thể giới hạn tầng đích, ví dụ `KVPV_LINHLUNG_TH.start({targetFloor:450})`. Nếu chỉ tự vào tháp bằng giao diện game, hỗ trợ combat vẫn tự bật mà không cần gọi start. Bộ này không tự chọn người chơi làm mục tiêu.

- Linh Lung không chạy HitRun hồi máu: dù còn dưới 35% vẫn giữ vị trí đánh khi HP >0; chết, mất mục tiêu hoặc rời map thì không phát thêm đòn. Thiên Quan giữ chính sách 35/100.
- Đổi mục tiêu/tầng: dừng quyền combat cũ, theo dõi quái mới và ghi thống kê riêng. Nhận diện quái không phụ thuộc tên có chữ Boss.
- Rời tháp: bỏ bộ đánh xa của tháp và trả lại chế độ phù hợp với map; Thiên Quan tiếp tục dùng luồng riêng đã có.
- Chuyển tầng, nhận thưởng và xác nhận thắng vẫn do bộ Linh Lung hiện có xử lý. Không bỏ qua giới hạn thời gian trận của game.

Kiểm tra hoặc dừng:

```js
KVPV_LINHLUNG_TH.status()
KVPV_TH300.performance()
KVPV_LINHLUNG_TH.stop()
```

`stop()` dừng vượt liên tiếp và tắt hỗ trợ Tuyệt Học cho tháp; gọi `start()` để bật lại. Cập nhật FULL dùng được ngay trên Snippet, giữ nguyên lõi vượt tầng đang có; chưa xác nhận thực tế máy chủ chấp nhận Tuyệt Học của mọi tầng ở 302.

# Sửa cảnh báo và giảm lãng phí chiêu trong vòng tháp 30 giây

- Khi RANGE nhận quyền, dừng hẳn `BOSSPOS38` và watchdog cũ trước khi cài hook. Không chỉ tắt cờ enable để watchdog tiếp tục báo nhầm `isValidRange overridden`.
- Bộ chọn chiêu không được gọi native khi combat native còn bận. Bộ chọn native cập nhật mốc hồi chiêu ngay khi chọn; gọi sớm có thể tiêu hao lượt sẵn sàng trước khi có lệnh đánh. Giữ nguyên kiểm tra hồi chiêu/animation của game.
- Trong Linh Lung, ưu tiên sát thương trung bình của chiêu có ít nhất hai hit đã ghép đúng trên cùng loại Boss; mỗi bốn lần gọi lại dùng thứ tự xoay vòng. Không bỏ chiêu không có sát thương trực tiếp vì có thể là buff. Thiên Quan giữ cách xoay chiêu trước đó.
- Hai bộ giám sát được tách thành module reload được. STABLE tiếp tục ghi đồng hồ, COMBAT phát thông tin còn dưới 5s/hết 30s mỗi mốc một lần. Lỗi thật vẫn cảnh báo; không thay console toàn cục hoặc kéo dài thời gian máy chủ.
- Bộ đếm quay lại sau hồi máu chỉ tăng khi RETREAT chuyển về FIGHT, không còn tính lúc mới bật từ OFF.

Báo cáo tầng 479 đã lưu ở `references/linh-lung-floor479-performance.json`. Có vòng dành hơn 18–20 giây ở trạng thái native cooldown, 9–11 giây chờ kỹ năng; một vòng không có chiêu nào và khoảng 20 giây hồi máu. Chưa thể kết luận từ báo cáo rằng mọi thời gian chờ đều là lỗi hoặc các chiêu không có hit là vô dụng. Các thay đổi cần đo lại trong game để xác nhận hiệu quả sát thương.

# Thử burst 8 Tuyệt Học: Thiên Quan và Linh Lung

Thử nghiệm burst vẫn có API cho cả hai map; FULL hiện tắt burst để dùng chế độ xen đánh thường ở 302. Khi đã đúng vị trí và combat native sẵn sàng lúc bắt đầu, một lượt JS thử tối đa các ID native 1001–1008 hiện có. Mỗi chiêu vẫn phải sẵn sàng theo hàng hồi chiêu native; không tạo chiêu chưa mở hay sửa thời gian chờ.

Trong chính lượt burst này, bộ điều khiển bỏ bước chờ animation giữa các chiêu để thử gọi dồn. Các lời gọi vẫn tuần tự trong JS, không phải bằng chứng máy chủ thi triển đồng thời. Có thể chỉ một phần chiêu được chấp nhận hoặc chiêu trước bị ngắt; kết luận dựa trên sát thương khớp, không dựa hiệu ứng.

- Thiên Quan vẫn nhường HitRun ở 35% và đợi đủ 100%; Linh Lung không dùng chu kỳ này.
- Tối thiểu 1 giây giữa các lượt thử. Chờ kết quả hoặc hết hạn 3,5 giây riêng cho từng ID chiêu; chiêu khác đã sẵn sàng vẫn được tung, không bị chặn bởi một buff chưa có hit.
- Khi biến thân, bộ bốn chiêu biến thân giữ cách chạy hiện có, không ép thành tám chiêu Tuyệt Học.
- Mỗi báo cáo giữ tối đa 30 nhóm trong `burst.batches`: `attempted` là lời gọi client, `confirmed` là chiêu có cặp sát thương khớp, `matchedDamage` là sát thương đã ghép. Buff có thể không tạo hit trực tiếp.

```js
// Xem kết quả cả các lượt thử và số liệu từng Boss:
copy(JSON.stringify(KVPV_TH300.report()))

// Nếu kết quả hit kém hơn, trở lại gọi từng chiêu theo native:
KVPV_TH300.setBurst(false)

// Bật lại thử nghiệm cho cả hai map:
KVPV_TH300.setBurst(true)
```


## Kết quả thử burst Thiên Quan và sửa chờ theo nhóm

Log `references/thien-quan-burst-observed.json` là Thiên Quan, không phải vòng tháp 30 giây: 49 lời gọi, 37 cặp sát thương khớp; các nhóm còn lưu có 1–2 chiêu, có nhóm hai chiêu cùng được xác nhận. Chưa có bằng chứng trong phần lịch sử này rằng cả tám chiêu cùng trúng. Chiêu 1008 chưa có hit trực tiếp, chưa đủ kết luận vô dụng hay đánh hụt.

Sửa bộ burst chờ theo từng chiêu thay vì khóa cả nhóm: một chiêu chưa có kết quả không chặn chiêu khác đang sẵn sàng. Vẫn tránh gọi trùng cùng ID khi kết quả trước chưa đóng. Ghi riêng trạng thái `waiting_burst_gap` thay vì để thời gian chờ lẫn vào `fighting`; số thứ tự nhóm chỉ tăng khi thực sự có lời gọi, không tăng khi quét mà không có chiêu sẵn sàng. Giữ tối đa 30 nhóm thật trong báo cáo. Cần thử lại để đo tác động sát thương, không suy ra tăng DPS từ kiểm thử mô phỏng.
# Thử đánh thường ở 302

Phép thử đánh thường riêng vẫn có API cho Thiên Quan/Linh Lung; FULL hiện tắt phép thử riêng để dùng chế độ xen đánh thường ở 302. Khi đúng vị trí và combat native sẵn sàng, thử các ID đánh thường 8001–8009 thực sự có trong bộ chọn của nhân vật. Đo riêng tối đa **8 lần gọi hoặc 15 giây mỗi mục tiêu**, sau đó tiếp tục Tuyệt Học/burst hiện có. Không sửa thời gian hồi chiêu, không kéo nhân vật vào gần để tạo bằng chứng giả ở 302.

```js
copy(JSON.stringify(KVPV_TH300.report()))
```

Mục `basicProbe` ghi `attempts`, `confirmedHits`, `matchedDamage` và ví dụ có khoảng cách lúc gọi/lúc trúng, Boss và map. Chỉ ghép sát thương đúng nhân vật, đúng Boss, đúng ID đánh thường và thời gian hợp lệ; bỏ cờ sát thương trợ chiến/phản lại. Bằng chứng đánh thường không được cộng vào bằng chứng xác nhận Tuyệt Học. Không có hit chưa đủ chứng minh giới hạn máy chủ.

Thiên Quan vẫn nhường hồi máu 35/100, Linh Lung vẫn đánh khi còn sống. Để bỏ phép thử ngay và trở về Tuyệt Học:

```js
KVPV_TH300.setBasicProbe(false)
```

Bật lại bằng `KVPV_TH300.setBasicProbe(true)`. Phép thử không bảo đảm sát thương đánh thường được máy chủ nhận ở 302; cần kết quả trong game thật.


## Mặc định hiện tại: Tuyệt Học từng chiêu xen đánh thường ở 302

FULL gọi `KVPV_TH300.setInterleaved(true,302)` trước khi bật theo dõi map. Ưu tiên chuỗi Tuyệt Học → đánh thường → Tuyệt Học kế tiếp, dùng bộ chọn native và mốc hồi chiêu nguyên gốc. Nếu loại ưu tiên chưa sẵn sàng thì thử loại còn lại; không dừng chờ hoặc bỏ kiểm tra combat native. Giữ vòng xoay Tuyệt Học, không để mỗi đòn thường đặt lại vị trí trong danh sách.

Khoảng cách 302 tính từ Boss đến nhân vật, sai số 5; dải quan sát phía client lớn hơn 300, tối đa 312. Rút lui 35/100 chỉ áp dụng Thiên Quan, không áp dụng Linh Lung. Cần xác nhận sát thương đánh thường ở 302 trong game thật.

`report().interleaved` ghi số đòn thường đã gọi, hit khớp, sát thương và khoảng cách. Các hit đánh thường không cộng vào bằng chứng Tuyệt Học. Burst, phép thử basic riêng và chế độ xen đòn là ba lựa chọn loại trừ nhau; bật một lựa chọn sẽ tắt các lựa chọn xung đột.

```js
copy(JSON.stringify(KVPV_TH300.report()))
KVPV_TH300.setInterleaved(true,302)
```
# Thử nhịp đánh thường 1 ms tại 302

FULL gọi `setBasicPace(1)` trước khi bật chế độ Tuyệt Học xen đánh thường ở 302. Bộ chọn đòn thường dùng bản sao hàng dữ liệu với thời gian chờ client 1 ms, giữ nguyên hàng gốc. Các ID có hit trực tiếp đã ghép trên cùng loại Boss được ưu tiên khi chọn đòn thường.

Đây là nhịp thử phía client: cổng combat/animation native, giới hạn trình duyệt và việc chờ kết quả của cùng ID vẫn áp dụng. Không bảo đảm 1000 đòn hoặc 1000 hit mỗi giây. Thiên Quan vẫn giữ hồi máu 35/100, Linh Lung không chờ hồi máu.

```js
copy(JSON.stringify(KVPV_TH300.report()))
// interleaved.basicClientWaitMs = 1, kèm số đòn/hit/sát thương để đối chiếu.

// Trả thời gian chọn đòn thường về native:
KVPV_TH300.setBasicPace(null)
```


## Linh Thú và Phúc Oa: thời gian chọn chiêu client 1 ms

FULL tăng hai bộ chọn `petContext` và `fuwaContext` lên thời gian chờ thử nghiệm 1 ms trên bản sao dữ liệu. Giữ thời gian gốc của game để dừng/khôi phục; không gọi thêm vòng combat độc lập. Ngự Thú/Phi Phong giữ cấu hình chia 10. AI/animation native và máy chủ vẫn có thể giới hạn tốc độ thực tế.

```js
KVPV_EXPERIMENTAL_BOOST.status()
```

Xem `clientWaitMs`, `companions.linhThu` và `companions.phucOa` để kiểm tra đã gắn hook và số lần bộ chọn trả ra chiêu. Số lần chọn không đồng nghĩa số hit được máy chủ xác nhận.
# Tự duy trì combo chỉ trong Thiên Quan và Linh Lung

FULL giữ bộ theo dõi map hoạt động liên tục trong phiên. Vào Thiên Quan/Linh Lung thì dùng combo 302, Tuyệt Học từng chiêu xen đánh thường, thời gian chọn basic client 1 ms. Rời hai map thì giải phóng combat đặc biệt; không áp dụng combo này lên Boss ở mọi map.

Nếu quan sát thấy nhân vật chết trong map, giữ chế độ chờ nhưng dừng bộ combat; khi sống lại mới khởi động lại. Nếu bộ quét Boss dừng vì `session-unavailable`, chỉ cho khôi phục khi nhân vật đã sống và không còn HitRun đang chạy. Lịch quét bị mất được sửa qua `repairPolling`, không đặt lại lượt Boss lỗi chỉ để lặp vô hạn. Giữ cơ chế hồi máu Thiên Quan 35/100, Linh Lung không chờ hồi máu.

Các dòng `armed`, `Loaded` và `Active` là thông báo cài bộ điều khiển/giám sát, không phải bằng chứng đang có hit. Xem `KVPV_MODE.status(false).autoMaintain` và trạng thái combat để kiểm tra. Không cần in lại ba dòng log liên tục.

```js
// Dừng chủ động cả tự duy trì combo; sẽ không tự bật lại sau hồi sinh:
KVPV_MODE.stop()

// Bật lại theo dõi riêng hai map:
KVPV_MODE.armTianQuan()
```

# Dùng cùng một bản FULL trên nhiều account

Mỗi cửa sổ/game-frame tự nhận actor đang đăng nhập và giữ cấu hình, timer, thống kê riêng. Các module cũ từng khóa ID acc chính đã chuyển sang `19-account-features.js` và lấy actor của phiên hiện tại. Không gắn sẵn ID clone để mời/điều khiển chéo; bộ phân vai hai acc cũ không tự khởi động khi chưa cấu hình.

Khi cập nhật trực tiếp, worker đang chạy, chờ phản hồi hoặc bị khóa do kết quả chưa rõ được giữ lại để không phát lại yêu cầu. Worker cũ chưa chạy trên clone có thể cài bằng actor hiện tại. Việc đổi hẳn nhân vật trong cùng một game-frame vẫn bị khóa để timer cũ không tác động sang nhân vật khác; mỗi account nên có tab/cửa sổ game riêng.

Combat không còn tự dừng chỉ vì tab bị ẩn. Riêng vòng đọc model của bộ đánh xa ở tab nền được giới hạn mặc định 50 ms để giảm tranh CPU giữa nhiều account; browser/game vẫn có thể giảm nhịp thêm. Không giả mạo focus hoặc bảo đảm game nền chạy đúng 1 ms. Nhân vật chỉ dùng các kỹ năng native thực sự đã mở của chính account đó.

```js
KVPV_ACCOUNT_POLICY.status()
KVPV_ACCOUNT_FEATURES.status()
```

Hai báo cáo cho biết actor/khóa phiên có khớp không, nhân vật và các thành phần đã tải chưa, danh sách kỹ năng native, trạng thái tab nền và các worker đã cài/được giữ. Nếu một account vẫn đứng, xuất kèm trạng thái combat:

```js
copy(JSON.stringify({account:KVPV_ACCOUNT_POLICY.status(),features:KVPV_ACCOUNT_FEATURES.status(),mode:KVPV_MODE.status(false),far:KVPV_TH300.report(),errors:KVPV_V1.diagnostics.status()}))
```

# Sửa trường hợp FIGHT nhưng không có hit khi xen đánh thường

Báo cáo thực tế cho thấy đủ máu, đúng map Thiên Quan, đứng cách Boss 304 và bộ điều khiển vẫn FIGHT; có 102 lần gọi nhưng không có cặp sát thương trực tiếp xác nhận, gồm 68 lần gọi đánh thường. Vì vậy không thể kết luận đang tắt mode hoặc sai account, cũng chưa thể khẳng định các lời gọi đã được máy chủ nhận.

Native `isCooldown()` có thể trả sẵn sàng khi hoạt ảnh đã tới điểm cho phép ngắt, trong khi `_jh.isPlaying` vẫn còn true. Chế độ đánh tuần tự giờ đợi hoạt ảnh đó kết thúc trước khi chọn/cast chiêu tiếp theo; không cho đòn thường 1 ms ngắt Tuyệt Học đang chạy. Thử nghiệm burst vẫn có hành vi gọi dồn riêng khi người dùng bật rõ ràng.

Nếu ba kết quả đánh thường trong trận hết hạn mà chưa có hit trực tiếp và không bị gián đoạn bởi hồi máu/di chuyển, tạm ngừng xen đánh thường cho mục tiêu đó và tiếp tục Tuyệt Học. `interleaved.basicSuspended`/`basicUnconfirmed` công bố trạng thái này. Không gọi đó là ba đòn chắc chắn hụt; mục đích là ngừng dùng lượt vào phép thử chưa có bằng chứng. Đổi mục tiêu sẽ thử lại; hit hợp lệ còn đang chờ cũng có thể mở lại xen đòn.

`report().nativeCombat` cho biết cổng hồi chiêu và hoạt ảnh. `hitDiagnostics` ghi tổng sự kiện nhận, số được ghép, bộ đếm lý do loại và tối đa 16 mẫu loại thuộc nguồn nhân vật hiện tại. Lý do có thể là nguồn khác, cờ sát thương phụ, marker không hỗ trợ, sai receiver, ngoài dải khoảng cách hoặc không có lần tung chiêu khớp. Không suy diễn rằng mọi mẫu bị loại đều là lỗi game hoặc hit thật của nhân vật.

Kiểm thử mô phỏng xác nhận bảo vệ hoạt ảnh, tạm ngừng basic chưa xác nhận, vẫn cho Tuyệt Học hoạt động và giữ bộ lọc bằng chứng. Cần kiểm tra lại trong game để xác định nguyên nhân chính xác của lần không có hit vừa báo.

# Thiên Quan: bàn giao Boss mới không cần chạy lại Snippet

Coordinator theo dõi khóa `map / tầng / loại Boss / ID` của mục tiêu đã khớp cấu hình Thiên Quan. Khi khóa thay đổi, dừng HitRun cũ trước, tháo hook kỹ năng cũ, gắn lại SCAN cho mục tiêu mới rồi khởi động lại quyền combat. Nếu bộ auto cũ không nhận ra Boss theo tên hoặc `isBoss()`, dùng trực tiếp HitRun.start cho quái tầng đã được xác minh.

Không gọi lặp start mỗi 75 ms cho cùng một Boss đã dừng vì lỗi; chuyển mục tiêu/tầng hoặc thao tác bật lại chủ động mới cấp lượt mới. Vẫn giữ khóa actor, dừng khi chết/rời map và cơ chế hồi máu Thiên Quan 35/100. Linh Lung giữ bộ đánh liên tục riêng.

Bộ đánh xa cũng xóa đích di chuyển, lượt xoay chiêu, nhịp gọi và pha sở hữu cũ khi gắn Boss mới, giữ nguyên dữ liệu hồi chiêu native. `KVPV_MODE.status(false).tianQuanBossKey` và lịch sử `TQ-BOSS-HANDOFF` giúp kiểm tra đã chuyển sang Boss nào.

Kiểm thử mô phỏng ba Boss cùng map, Boss không được bộ nhận dạng cũ nhận ra, object/ID được tái sử dụng, thứ tự gỡ hook và không tạo vòng retry cùng Boss đều qua. Cần xác nhận chuyển Boss thực tế trong game.



Thí Luyện Ngày được ưu tiên đầu hàng đợi khi rảnh, trước Daily/Tự Vượt/hoạt động mới; không ngắt trận đang chạy: dùng lượt khiêu chiến; càn quét KNB đã tắt theo chính sách mới. Càn quét kiểm tra giá native và số dư KNB, chờ số lượt server giảm sau từng yêu cầu. Không tính lời gọi gửi đi là đã nhận thưởng; không gửi lại cùng trạng thái chưa có ACK khi nạp lại FULL.

```js
KVPV_DAILY_TRIAL.status() // lượt còn lại, yêu cầu đang chờ, số càn quét đã xác nhận
KVPV_DAILY_TRIAL.stop()   // dừng tự khiêu chiến/càn quét; không ép thoát trận đang đánh
KVPV_DAILY_TRIAL.start()  // bật lại khiêu chiến không tiêu KNB
```

Trong trận Thí Luyện Ngày, tự cổ vũ đến giới hạn vàng theo cấu hình native (KNB bị tắt), chờ ACK từng lần; đạt mức trần thì dừng. Combo ngoài map luân phiên toàn bộ đòn thường 8001–8009 có trong bộ native và Tuyệt Học 1001–1008, kiểm tra 1 ms, giữ tầm và cổng hồi chiêu native. Đây là nhịp client, không phải cam kết số hit mỗi giây.


Popup Dùng nhanh tự xử lý riêng bằng `KVPV_QUICK_USE`: gọi nút Dùng native ở lượt event loop kế tiếp khi popup xuất hiện, không chờ Daily/Boss và không giành map. Món kế tiếp cũng được hẹn riêng để không đệ quy chặn combat. Không bấm Mua/Xem/Đổi; không chọn thay phần thưởng trong hộp lựa chọn. Chống gọi trùng theo ID/UID/số lượng qua các lần nạp FULL; `requests` là số lần gọi handler, không phải ACK tiêu thụ.

```js
KVPV_QUICK_USE.status()
KVPV_QUICK_USE.stop()
KVPV_QUICK_USE.start()
```


`KVPV_CONFIRM_POPUPS` tự Đồng ý bất đồng bộ cho thông báo không có callback hành động và kết quả trận nhận diện được; hỗ trợ nhãn đếm ngược. Popup có callback khác giữ nguyên khi chưa bật phạm vi `confirmAll`. Hook giữ nguyên hàm mở native; mỗi lần mở chỉ xử lý một lần, không chờ Daily. Xem/dừng: `KVPV_CONFIRM_POPUPS.status()` / `.stop()`.


## Thu nghiem Xa Menh Nhat Kich Lv2 (client only)

Module `src/32-xa-menh-lv2-cd0.js` duoc dong goi vao FULL va ban cap nhat nong,
**mac dinh tat**. Chi khi goi `enable()` moi doi `skill[6]` cua record
`30310002` tu `30000` thanh `0` trong bo nho client. Khong thay doi
WebSocket/server va khong khang dinh bo duoc hoi chieu server.

Trong Console cua **dung game frame**, sau khi nap FULL/build moi:

```js
KVPV_XA_MENH_LV2.status();  // xem gia tri hien tai
KVPV_XA_MENH_LV2.enable();  // thu 0ms tren client
KVPV_XA_MENH_LV2.restore(); // tra ve gia tri goc
```

Module chi thao tac neu row dung `30310002` va cooldown goc dung
`30000`. Neu config khac, module dung va khong ghi de. Khoi dong lai
module se giu trang thai bat/tat do nguoi dung chon. Kiem thu:
`node TEST_XA_MENH_LV2.cjs` (duoc goi tu `node test.cjs`).


## Tiên Ma Quyết Chiến PvP — 8005 / chạy xa ở HP 10%

Module `src/80-tienma-quyetchien-pvp.js` tự đăng ký khi FULL được nạp, nhưng **chỉ điều khiển** trong bản đồ Tiên Ma 2191–2194 và khi mô hình Camp War xác nhận trạng thái giao tranh (`status=3`, `fightTime>0`). Không vào sự kiện, không chọn đối thủ hay gửi gói mạng tự chế.

- Chỉ gửi kỹ năng **8005** qua bộ `combat.combat()` native nếu kỹ năng đã học, hết hồi chiêu, mục tiêu và tầm đánh hợp lệ.
- Chỉ đánh **người chơi phe đối địch**: dùng `campType` của cả hai bên đối chiếu với `myCampType`. Không đánh cùng phe/quái.
- HP **≤10%**: ngừng đánh và dùng `moveTo` native để rút ra xa **người địch gần nhất**, mục tiêu khoảng **600 đơn vị tọa độ**.
- Nếu địch đuổi và khoảng cách giảm dưới 580, sẽ tính lại điểm chạy, tối đa 260 đơn vị/lệnh và giãn cách 450ms; không thay đổi tốc độ server, không bảo đảm vượt vật cản.
- HP hồi **>15%**: thoát chế độ rút và trở lại chỉ dùng 8005 (tránh bật/tắt liên tục).
- Scan mỗi 150ms trong giao tranh; khi ngoài sự kiện mỗi 800ms. Nhường khi người dùng thao tác, game mất focus, hoặc controller khác đang giữ quyền.

Lệnh trong **game frame**:
```js
KVPV_TIENMA_PVP.status(); // kiểm tra scene, HP, khoảng cách, số lần cast/move
KVPV_TIENMA_PVP.start();  // bật thủ công nếu trước đó đã stop
KVPV_TIENMA_PVP.stop();   // tắt cho tới khi bật lại (kể cả qua live reload)
```

`node TEST_TIENMA_PVP.cjs` kiểm thử logic mô phỏng và được gọi trong `node test.cjs`.
**Giới hạn:** Mốc 600 là khoảng cách mục tiêu, không bảo đảm đường đi hay mức sát thương server. Những module khác không thuộc bộ này có thể có hành vi riêng.


## Khôi phục an toàn Thiên Quan (2026-10-30)

Phát hiện thiết lập `KVPV_TQ_POSITION_ONLY={enabled:true,distance:310,heal:false}` đã vô hiệu hoá bộ HitRun chạy ra ngoài khi HP thấp. Bản sửa thay bằng `enabled:false,heal:true,distance:310`, **bật lại HitRun hồi máu 35% → 100%**, đồng thời cố định mục tiêu 310 cho Thiên Quan, không lấy nhầm khoảng cách của các map khác.

- Tại Thiên Quan: thử giữ khoảng cách 310 với Boss; đường di chuyển native vào gần Boss được chặn/định hướng lại trong pha FIGHT khi đủ điều kiện.
- Khi HP ≤35%: bộ HitRun native có quyền rút lui, không chặn đường rút; quay lại sau khi HP đạt 100%.
- Không sửa PvP Tiên Ma, Tu La, Tru Tiên hoặc Đường Thí Luyện.
- Không thay tầm đánh phía server. Khoảng cách 310 có thể không trúng nếu server giới hạn; ưu tiên sinh tồn, không ép tiếp cận.
- Nếu còn áp sát, dừng an toàn bằng `KVPV_MODE.stop()` và xuất `KVPV_MODE.status(false)`, `KVPV_HITRUN1.status(false)`, `KVPV_TH300.status(false)` để kiểm tra. Chỉ test trên boss có đủ máu, không nhận định kết quả PvE từ mock.

Kiểm thử `node TEST_TQ_SAFE_RANGE.cjs` được gọi trong `node test.cjs`.


## Thiên Thê 8 Tầng vs Tranh Bá Đỉnh Cao (2026-10-30)

Khi cả hai lịch trùng 21:00–21:30, `KVPV.core.scene.acquire('combat','thien-the-8-tang')` từng bị `upcoming event tranh_ba_dinh_cao` từ chối dù `KVPV_EIGHT_FLOOR.status()` cho thấy server mở, đã mở khóa, hết cooldown, Daily rảnh và nhân vật không ở trong đội. Đây là lỗi lịch giữ chỗ, **không phải lỗi API native**.

Bản sửa chỉ cho yêu cầu Thiên Thê có tag `thien-the-8-tang` đi qua reservation `tranh_ba_dinh_cao` **khi chính Thiên Thê đang bật, đúng lịch, server mở, mở khóa, cooldown hợp lệ, chưa hoàn tất và đang ở map thường**, không có yêu cầu Thí Luyện Ngày chưa được xác nhận. Nó không vượt quyền các tác vụ đã có owner, Daily đang làm việc, combat đang chạy, Tự Vượt trong cảnh, hay các lịch sự kiện khác. Không gọi gói mạng mới.

`KVPV_EIGHT_FLOOR.status().reason` giờ phân biệt `native_entry_api_unavailable` với `scene_denied:<reason>`. Để kiểm tra **đúng tag** của Thiên Thê:
```js
KVPV.core.scene.reason('combat', 'thien-the-8-tang')
KVPV_EIGHT_FLOOR.status()
```
Nếu sau cập nhật hiện `waiting_scene_71` cùng `entryAttempts > 0`, yêu cầu vào 7101 đã được phát, còn phải đợi xác nhận cảnh từ server.
Kiểm thử riêng `node TEST_EIGHT_SCENE_OVERLAP.cjs` và kiểm thử đầy đủ qua `node test.cjs`.


## Thác Ấn — thử nghiệm hồi chiêu client 0ms (2026-10-31)

Đối chiếu `configs_yuenan.mpacks` bản `20261014002` với ảnh màn hình Thác Ấn:
- **Bát Hoang Phá Thế** ID 3021: Lv1/Lv2 `30000ms`, Lv3 `25000ms`. Ảnh không hiện đủ cấp nên thử thay ba hàng Lv1–3, không tự nâng cấp.
- **Xá Mệnh Nhất Kích Lv2** ID 3031: `30000ms`, dùng lại module độc lập `KVPV_XA_MENH_LV2` để tránh tranh quyền.
- **Quẻ Thượng Lv2** ID 3041: `30000ms`.
- **Ma Hóa Lv2** ID 3121: `0ms` ngay từ cấu hình gốc; không sửa và **vẫn đòi HP<50%** để có cơ hội kích hoạt.
- Các ô khóa theo SVIP/bậc vật phẩm trong ảnh **không được mở khóa**; script cũng không trang bị hoặc học thêm kỹ năng.

Module `src/32-thac-an-cd0.js` được đưa vào FULL và hot reload, **mặc định TẮT** để tránh xung đột khi đang chơi. Chỉ sau khi người dùng bật trong đúng game-frame:
```js
KVPV_THAC_AN_CD0.status();  // tra cứu các hàng cấu hình và tình trạng
KVPV_THAC_AN_CD0.start();   // 30/25 giây -> 0ms chỉ trong bộ nhớ client
KVPV_THAC_AN_CD0.stop();    // khôi phục giá trị mà module thực sự đã sửa
```
Module tiền kiểm toàn bộ bản ghi và giá trị trước khi sửa, dừng nếu dữ liệu không khớp; giữ lựa chọn bật qua hot reload, không ghi đè thay đổi của module khác, và không khôi phục Xá Mệnh nếu người dùng đã bật Xá Mệnh độc lập từ trước.
**Không giả định sửa `skill[6]` sẽ bỏ hồi chiêu server hoặc tạo thêm sát thương.** Các phép thử chỉ xác minh giá trị client, không gửi packet mới, không ép nhận thưởng và không tự tiêu KNB.
Kiểm thử: `node TEST_THAC_AN_CD0.cjs` (đã đưa vào `node test.cjs`).
