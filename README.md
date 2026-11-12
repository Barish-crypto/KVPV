**Mới:** Có `git-sync/` để tự lấy mã nguồn GitHub về Windows sau khi thiết lập một lần. Xem `git-sync/HUONG_DAN.md`. Không tự đẩy commit từ cuộc trò chuyện này nếu chưa kết nối quyền GitHub.

Chính sách hiện tại: **không tự tiêu KNB**. Quyền càn quét/cổ vũ bằng KNB trước đây đã được thu hồi theo yêu cầu mới nhất. Thí Luyện chỉ khiêu chiến còn lượt, cổ vũ bằng vàng đến giới hạn vàng. Popup Đồng ý có phí hoặc callback chưa xác minh miễn phí giữ thủ công; không suy ra miễn phí chỉ vì nội dung không nhắc KNB.

# KVPV V1

## Tự đồng bộ vào trình duyệt, không Snippet / F5

**Dùng tab Edge đã đăng nhập:** chạy `CAI_DONG_BO_EDGE.bat`, tải thư mục `edge-addon` ở `edge://extensions`, rồi bấm tiện ích → **Bật đồng bộ tab này**.
Xem [DONG_BO_TAB_EDGE.md](DONG_BO_TAB_EDGE.md). Cách này không cần chuyển cửa sổ hoặc đăng nhập lại.

**Dùng tab Chrome đã đăng nhập:** chạy `CAI_DONG_BO_CHROME.bat`, mở `chrome://extensions`, bật **Developer mode**, rồi chọn **Load unpacked** và thư mục `edge-addon`. Sau đó bấm biểu tượng tiện ích → **Bật đồng bộ tab này**.
Xem [DONG_BO_TAB_CHROME.md](DONG_BO_TAB_CHROME.md). Chrome 125 trở lên được hỗ trợ; Edge và Chrome dùng chung addon và bundle, nhưng mỗi trình duyệt phải được cài host riêng.

Phương án khác: chạy `BAT_TU_CAP_NHAT.bat`, đăng nhập game ở cửa sổ Edge riêng được mở.
Khi lưu module trong `esm/modules/`, bộ theo dõi tự build và xác thực hash artifact rồi nạp bản mới vào game-frame đang mở.
Không cần cài tiện ích hoặc copy/paste. Xem [TU_CAP_NHAT.md](TU_CAP_NHAT.md) để bật, dừng và xem log.

## Hành vi hiện tại

**Tự đánh Boss Thiên Quan dùng skill thường native `8001–8003` và Hàng Ma Chân Quyết nếu tên skill trong native config khớp.** Tuyệt Học khác và skill thường `8004–8005` không được chọn; giữ cooldown và điều kiện sẵn sàng native. Các map/hoạt động khác giữ cấu hình combat riêng của chúng.

Giữ focus engine là Snippet riêng `KVPV_GIU_FOCUS.js`: khóa cờ `_isFocused`/`_isVisibility`, không phát sự kiện focus/focuschange giả; khôi phục bằng `KVPV_FOCUS_HOLD.stop()`. Không đổi focus thật của tài liệu, input, cấu hình combat, frame rate hay lịch Daily. Đây là cờ engine, không bảo đảm trình duyệt giữ nguyên nhịp timer khi tab nền.

Giảm tải: các vòng quét phụ dùng nhịp giới hạn; không có vòng chọn/gửi skill riêng trong combat. `KVPV_DO_LAG_10S.js` chỉ đo nhịp rAF, độ trễ timer và long task (nếu có).

Lãnh Địa Boss (luồng Daily, map 2164): các Boss mở tầng ban đầu vẫn đánh chết để đi tiếp. Chỉ tên chứa Thần Binh, Thời Trang, Linh Ti/Tỉ hoặc Linh Dực mới áp dụng chuyển Boss ở HP ≤11% để lấy thưởng rơi, không chờ giết. Không suy ra nhóm rơi đồ theo số tầng/thứ tự danh sách; thiếu tên/HP thì tiếp tục luồng đánh bình thường. Chỉ thoát sớm khi đã nhận diện đủ bốn nhóm và mọi Boss trong danh sách đã tới ngưỡng hoặc có trạng thái chết native. Ngưỡng chỉnh bằng `KVPV_TERRITORY_LOOT.setCutoff(11)`; đây là ngưỡng người dùng cung cấp, chưa xác nhận phần thưởng từ server.

Tinh Thần mặc định chọn tầng 6, kể cả khi bật lại FAST927; vẫn kiểm tra mở tầng bằng UI native. Bản vá riêng `KVPV_TINH_THAN_TANG_6.js` chỉ đổi cấu hình cho lượt chọn tiếp theo, không ép chuyển tầng đang đánh.

Các bộ điều khiển combat và áp sát cũ không còn trong FULL. Nạp lại tiện ích và đồng bộ FULL mới để dọn controller cũ đang chạy trong tab.

Thí Luyện: bỏ chọn/xả skill 1 ms, giao chọn chiêu cho native, giữ hồi chiêu gốc; kiểm tra hỗ trợ mỗi 100 ms và giới hạn hai lần tung đòn cách nhau ít nhất 100 ms (cấu hình cũ thấp hơn cũng được nâng lên 100). Lệnh áp sát cách nhau ít nhất 1000 ms, không phát lại khi nhân vật đang chạy. Chưa xác nhận mức DPS hoặc nguyên nhân server đóng kết nối. Bộ đếm `rejected` là bộ lọc bằng chứng, không phải server từ chối chiêu.

FULL vẫn chạy các tác vụ map/nhiệm vụ đã cấu hình, nhưng không còn thay bộ chọn skill, ép skill cụ thể, tự gửi đòn combat hay áp đặt combo lên người chơi và trợ chiến. Combat thuộc quyền xử lý của game client. Client hiện tại cập nhật thời điểm sẵn sàng của skill ngay trong `selectSkill()`. Engine đọc trước ứng viên native, chỉ gọi `selectSkill()` một lần nếu skill được phép và qua kiểm tra hợp lệ cuối cùng, rồi chuyển đúng kết quả vào `combat()`; nếu skill khác danh sách cho phép hoặc sắp hết cooldown thì chờ, không gọi để thăm dò. Chẩn đoán tách `lastNativeSelectionPreview` (ứng viên chỉ đọc) khỏi `lastNativeSelectedSkill` (kết quả gọi selector thực tế).

## Nạp và cập nhật

- Lần đầu: dùng KVPV_V1_FULL.js. Hai tệp BAT mở/chép đúng tệp này.
- Phiên đã chạy V1: dán KVPV_SCAN_LIVE_PATCH.js để cập nhật tại chỗ, không F5.
  Bản vá tháo các controller cũ rồi nạp lại và tự bật; dữ liệu đo SCAN được khởi tạo lại.
- Không nạp tệp trong archive/. FULL hiện hỗ trợ chạy lại cùng Snippet: tự chuyển sang cập nhật combat tại chỗ.
  Engine/Daily đang chạy được giữ lại để tránh nhân đôi timer; thay đổi engine lõi chưa được nạp nóng.

## Điều khiển

Combat không có lệnh chọn combo riêng trong bản này. Dùng trạng thái/autobattle native trong game để điều khiển việc đánh.

## Tổ chức nguồn

Sửa `esm/modules/*.mjs`, `esm/index.mjs`, `esm/api.mjs`, `esm/manifest.json`, `runtime-v1.js` hoặc `rust-core/`; chạy `npm run build` để tạo FULL, bản vá, Edge core và manifest. Build kiểm tra bundle JavaScript và hash artifact. `rust-toolchain.toml` tự chọn target `wasm32-unknown-unknown`.
Build tạo FULL, bản vá, Edge core và MANIFEST.json chứa SHA-256. Android/Windows app không thuộc target hiện tại và không được build trong pipeline này.
Tốc độ di chuyển client-side x99 được bật toàn bản đồ; đây chỉ là chỉnh thuộc tính tốc độ tại client, server có thể không chấp nhận. Có thể kiểm tra bằng `KVPV_EXPERIMENTAL_BOOST.status()` và dừng/khôi phục bằng `KVPV_EXPERIMENTAL_BOOST.stop()`.
`embeddedModules` trong manifest liệt kê các module được khởi tạo tự động; `modules` là catalog ESM đầy đủ. Bundle có thể chứa mã module không tự khởi tạo để giữ API và khả năng điều khiển module.
`esm/` là nguồn JavaScript chính: các module ESM được chỉnh sửa trực tiếp, còn `esm/index.mjs` và `esm/manifest.json` khai báo thứ tự khởi tạo và catalog. Danh sách `initializedModules` cũng là thứ tự ưu tiên khởi động theo nhóm: an toàn/chính sách, core/map, red-dot/nhiệm vụ, combat, daily/phần thưởng, tiện ích, rồi PvP. `esm/index.mjs` phải giữ chính xác cùng thứ tự gọi initializer. `build.cjs` bundle entry này thành `KVPV_V1_FULL.js`, `KVPV_V1_ESM.js` cho Edge addon và bản vá live; không tái tạo ESM từ `src/`. Thư mục `src/` được giữ làm bản lưu tương thích cũ, không thuộc pipeline build/watch. ESM cung cấp `moduleApis`, `moduleFunctions`, các hàm truy cập `getKVPV_*()` dạng live và `moduleInitializers` để điều khiển module qua Windows app.
Phần Rust/WASM được nhúng vào FULL; JS bridge tiếp tục đọc API game và giữ nguyên giao diện tích hợp Edge. Rust core xử lý readiness, policy nhịp polling của account và phép tính hình học/điều kiện máu đầy cho hồi phục Boss; cấu hình ms, đọc trạng thái DOM và API game vẫn ở JavaScript.

- Các module skill, combat, sự kiện và PvP nằm riêng trong `esm/modules/`; thêm module cần cập nhật `esm/index.mjs` và `esm/manifest.json`.
- `06-range.js` giữ RANGE281 làm API tương thích cho phép đo tầm client.
- `86-xianfu-tasks.js` tự làm mới và nhận từng nhiệm vụ Tiên Phủ đã hoàn tất cùng mốc hoạt động đủ điểm, có giới hạn tần suất và chờ xác nhận từ trạng thái server; không tự nâng cấp, mua, xây tháp hoặc vào PvP.
- `87-crossserver-achievements.js` tự nhận từng thành tựu Liên Server ở trạng thái sẵn sàng bằng API gốc; không tự vào trận, chiếm cứ điểm hay dựng tháp.
- `88-lilian-team-rewards.js` tự nhận nhiệm vụ/thưởng ngày Lịch Luyện và nhiệm vụ/thành tựu Chiến Đội khi game xác nhận sẵn sàng; không tự vào hoạt động hoặc tạo đội.
- `89-free-daily-sign.js` tự nhận điểm danh miễn phí khi trạng thái gốc của game xác nhận có thưởng; không gọi API điểm danh có phí.
- `28-appearance-auto.js` tự nâng cấp/tiến cấp nhanh các nhóm đủ điều kiện bằng vật liệu đang sở hữu; loại trừ toàn bộ Thần Binh, Linh Dực, Thời Trang, Linh Tí, Phi Phong và đá bồi dưỡng Thú Cưỡi/Linh Thú. Không mua vật liệu hoặc dùng KNB.
- STAND281 đã chuyển sang archive/stand281-unused.js, không còn tạo timer trong FULL.
- BOSS_TH cũ còn giữ để tương thích; mặc định dùng BOSS_TH300_SCAN ở 302.

Tên TH300/RANGE281 và một số nhãn phiên bản nội bộ là API lịch sử, không phải
khoảng cách mặc định hiện tại. Engine 04 vẫn được giữ trong nguồn nhưng không
được nhúng vào FULL vì không thuộc danh sách module đang chạy.

## Biến Thân 10 ms

KVPV_TRANSFORM10 nhận đúng tên trong danh sách Biến Thân native (mode 2):
Huyết Ma Đại Pháp, Huyết Ngục Quỷ Thủ, Huyết Khế Tổ Chú, Huyết Ma Hình Phạt.
Chỉ khi đang Biến Thân mới áp dụng thời gian chờ chọn chiêu client 10 ms.
Không tự Biến Thân, không phát chiêu không có trong danh sách native, không sửa hàng CD gốc.
Ngoài Thiên Quan phối hợp BASIC10; trong Thiên Quan giữ gate vị trí 302 và hồi máu 35/100.
Trạng thái: KVPV_TRANSFORM10.status(); dừng chế độ: KVPV_TRANSFORM10.stop().
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

Chế độ burst vẫn có API cho cả hai map; FULL hiện tắt burst để dùng chế độ xen đánh thường ở 302. Khi đã đúng vị trí và combat native sẵn sàng lúc bắt đầu, một lượt JS thử tối đa các ID native 1001–1008 hiện có. Mỗi chiêu vẫn phải sẵn sàng theo hàng hồi chiêu native; không tạo chiêu chưa mở hay sửa thời gian chờ.

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

// Bật lại chế độ burst cho cả hai map:
KVPV_TH300.setBurst(true)
```


## Mặc định hiện tại: Tuyệt Học từng chiêu xen đánh thường ở 302

FULL gọi `KVPV_TH300.setInterleaved(true,302)` trước khi bật theo dõi map. Ưu tiên chuỗi Tuyệt Học → đánh thường → Tuyệt Học kế tiếp, dùng bộ chọn native và mốc hồi chiêu nguyên gốc. Nếu loại ưu tiên chưa sẵn sàng thì thử loại còn lại; không dừng chờ hoặc bỏ kiểm tra combat native. Giữ vòng xoay Tuyệt Học, không để mỗi đòn thường đặt lại vị trí trong danh sách.

Khoảng cách 302 tính từ Boss đến nhân vật, sai số 5; dải quan sát phía client lớn hơn 300, tối đa 312. Rút lui 35/100 chỉ áp dụng Thiên Quan, không áp dụng Linh Lung. Cần xác nhận sát thương đánh thường ở 302 trong game thật.

`report().interleaved` ghi số đòn thường đã gọi, hit khớp, sát thương và khoảng cách. Các hit đánh thường không cộng vào bằng chứng Tuyệt Học. Burst và chế độ xen đòn là hai lựa chọn loại trừ nhau; bật một lựa chọn sẽ tắt lựa chọn còn lại.

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

FULL tăng hai bộ chọn `petContext` và `fuwaContext` lên thời gian chờ 1 ms trên bản sao dữ liệu. Giữ thời gian gốc của game để dừng/khôi phục; không gọi thêm vòng combat độc lập. Ngự Thú/Phi Phong giữ cấu hình chia 10. AI/animation native và máy chủ vẫn có thể giới hạn tốc độ thực tế.

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

Runtime diagnostics also include `combatStall.progress`: a read-only trend from repeated target-HP samples. An unchanged target for 60 seconds is only a low-confidence possible stall, not proof; compare the accompanying evidence before taking action. The monitor never triggers recovery or game commands.

`nativeSkillRotation` records the actor's native cast signal by map and skill, with bounded recent history and skill inventory. It is passive across maps, including PvP, and does not choose, reorder, or send skills; a cast signal is not proof of server damage.

# Sửa trường hợp FIGHT nhưng không có hit khi xen đánh thường

Báo cáo thực tế cho thấy đủ máu, đúng map Thiên Quan, đứng cách Boss 304 và bộ điều khiển vẫn FIGHT; có 102 lần gọi nhưng không có cặp sát thương trực tiếp xác nhận, gồm 68 lần gọi đánh thường. Vì vậy không thể kết luận đang tắt mode hoặc sai account, cũng chưa thể khẳng định các lời gọi đã được máy chủ nhận.

Native `isCooldown()` có thể trả sẵn sàng khi hoạt ảnh đã tới điểm cho phép ngắt, trong khi `_jh.isPlaying` vẫn còn true. Chế độ đánh tuần tự giờ đợi hoạt ảnh đó kết thúc trước khi chọn/cast chiêu tiếp theo; không cho đòn thường 1 ms ngắt Tuyệt Học đang chạy. Chế độ burst vẫn có hành vi gọi dồn riêng khi người dùng bật rõ ràng.

Nếu ba kết quả đánh thường trong trận hết hạn mà chưa có hit trực tiếp và không bị gián đoạn bởi hồi máu/di chuyển, tạm ngừng xen đánh thường cho mục tiêu đó và tiếp tục Tuyệt Học. `interleaved.basicSuspended`/`basicUnconfirmed` công bố trạng thái này. Không gọi đó là ba đòn chắc chắn hụt; mục đích là ngừng dùng lượt vào lượt chưa được xác nhận. Đổi mục tiêu sẽ thử lại; hit hợp lệ còn đang chờ cũng có thể mở lại xen đòn.

`report().nativeCombat` cho biết cổng hồi chiêu và hoạt ảnh. `hitDiagnostics` ghi tổng sự kiện nhận, số được ghép, bộ đếm lý do loại và tối đa 16 mẫu loại thuộc nguồn nhân vật hiện tại. Lý do có thể là nguồn khác, cờ sát thương phụ, marker không hỗ trợ, sai receiver, ngoài dải khoảng cách hoặc không có lần tung chiêu khớp. Không suy diễn rằng mọi mẫu bị loại đều là lỗi game hoặc hit thật của nhân vật.

# Thiên Quan: bàn giao Boss mới không cần chạy lại Snippet

Coordinator theo dõi khóa `map / tầng / loại Boss / ID` của mục tiêu đã khớp cấu hình Thiên Quan. Khi khóa thay đổi, dừng HitRun cũ trước, tháo hook kỹ năng cũ, gắn lại SCAN cho mục tiêu mới rồi khởi động lại quyền combat. Nếu bộ auto cũ không nhận ra Boss theo tên hoặc `isBoss()`, dùng trực tiếp HitRun.start cho quái tầng đã được xác minh.

Không gọi lặp start mỗi 75 ms cho cùng một Boss đã dừng vì lỗi; chuyển mục tiêu/tầng hoặc thao tác bật lại chủ động mới cấp lượt mới. Vẫn giữ khóa actor, dừng khi chết/rời map và cơ chế hồi máu Thiên Quan 35/100. Linh Lung giữ bộ đánh liên tục riêng.

Bộ đánh xa cũng xóa đích di chuyển, lượt xoay chiêu, nhịp gọi và pha sở hữu cũ khi gắn Boss mới, giữ nguyên dữ liệu hồi chiêu native. `KVPV_MODE.status(false).tianQuanBossKey` và lịch sử `TQ-BOSS-HANDOFF` giúp kiểm tra đã chuyển sang Boss nào.

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

Module `32-xa-menh-lv2-cd0.js` trong `esm/modules/32-xa-menh-lv2-cd0.mjs` duoc dong goi vao FULL va ban cap nhat nong,
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


## Tiên Ma Quyết Chiến PvP — 8005 / chạy xa ở HP 10%

Module `80-tienma-quyetchien-pvp.js` trong `esm/modules/80-tienma-quyetchien-pvp.mjs` tự đăng ký khi FULL được nạp, nhưng **chỉ điều khiển** trong bản đồ Tiên Ma 2191–2194 và khi mô hình Camp War xác nhận trạng thái giao tranh (`status=3`, `fightTime>0`). Không vào sự kiện, không chọn đối thủ hay gửi gói mạng tự chế.

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

**Giới hạn:** Mốc 600 là khoảng cách mục tiêu, không bảo đảm đường đi hay mức sát thương server. Những module khác không thuộc bộ này có thể có hành vi riêng.


## Khôi phục an toàn Thiên Quan (2026-10-30)

Phát hiện thiết lập `KVPV_TQ_POSITION_ONLY={enabled:true,distance:310,heal:false}` đã vô hiệu hoá bộ HitRun chạy ra ngoài khi HP thấp. Bản sửa thay bằng `enabled:false,heal:true,distance:310`, **bật lại HitRun hồi máu 35% → 100%**, đồng thời cố định mục tiêu 310 cho Thiên Quan, không lấy nhầm khoảng cách của các map khác.

- Tại Thiên Quan: thử giữ khoảng cách 310 với Boss; đường di chuyển native vào gần Boss được chặn/định hướng lại trong pha FIGHT khi đủ điều kiện.
- Khi HP ≤35%: bộ HitRun native có quyền rút lui, không chặn đường rút; quay lại sau khi HP đạt 100%.
- Không sửa PvP Tiên Ma, Tu La, Tru Tiên hoặc Đường Thí Luyện.
- Không thay tầm đánh phía server. Khoảng cách 310 có thể không trúng nếu server giới hạn; ưu tiên sinh tồn, không ép tiếp cận.
- Nếu còn áp sát, dừng an toàn bằng `KVPV_MODE.stop()` và xuất `KVPV_MODE.status(false)`, `KVPV_HITRUN1.status(false)`, `KVPV_TH300.status(false)` để kiểm tra.



## Thiên Thê 8 Tầng vs Tranh Bá Đỉnh Cao (2026-10-30)

Khi cả hai lịch trùng 21:00–21:30, `KVPV.core.scene.acquire('combat','thien-the-8-tang')` từng bị `upcoming event tranh_ba_dinh_cao` từ chối dù `KVPV_EIGHT_FLOOR.status()` cho thấy server mở, đã mở khóa, hết cooldown, Daily rảnh và nhân vật không ở trong đội. Đây là lỗi lịch giữ chỗ, **không phải lỗi API native**.

Bản sửa chỉ cho yêu cầu Thiên Thê có tag `thien-the-8-tang` đi qua reservation `tranh_ba_dinh_cao` **khi chính Thiên Thê đang bật, đúng lịch, server mở, mở khóa, cooldown hợp lệ, chưa hoàn tất và đang ở map thường**, không có yêu cầu Thí Luyện Ngày chưa được xác nhận. Nó không vượt quyền các tác vụ đã có owner, Daily đang làm việc, combat đang chạy, Tự Vượt trong cảnh, hay các lịch sự kiện khác. Không gọi gói mạng mới.

`KVPV_EIGHT_FLOOR.status().reason` giờ phân biệt `native_entry_api_unavailable` với `scene_denied:<reason>`. Để kiểm tra **đúng tag** của Thiên Thê:
```js
KVPV.core.scene.reason('combat', 'thien-the-8-tang')
KVPV_EIGHT_FLOOR.status()
```
Nếu sau cập nhật hiện `waiting_scene_71` cùng `entryAttempts > 0`, yêu cầu vào 7101 đã được phát, còn phải đợi xác nhận cảnh từ server.


## Thác Ấn — ĐÃ TẮT cấu hình hồi chiêu 0ms (2026-10-31)

**Cảnh báo:** Có phản hồi game thực tế rằng sau khi gọi `KVPV_THAC_AN_CD0.start()`, nhân vật đứng đơ và không xả skill. Chưa xác nhận được hàm client hay server nào gây hiện tượng này. **Không sử dụng 0ms** cho kỹ năng Thác Ấn cho tới khi có cơ chế kiểm chứng an toàn.

Các module `32-thac-an-cd0.js` và `32-xa-menh-lv2-cd0.js` trong `esm/modules/` từ bản hotfix đã **vô hiệu hóa start/enable** và chỉ cho đọc dữ liệu. Khi hot-update từ module cũ, chúng cố gắng khôi phục các giá trị `skill[6]` mà chính phiên cũ đã sửa. Không có lệnh tự gửi RPC, auto cast, hay mở khóa SVIP.

**Khôi phục ngay với phiên FULL cũ còn chạy trong game-frame:**
```js
KVPV_THAC_AN_CD0?.stop?.();
KVPV_XA_MENH_LV2?.restore?.();
```
Nếu game vẫn kẹt, F5 và để bộ tự đồng bộ nạp FULL mới. Không gọi `.start()` / `.enable()` của cấu hình 0ms. Khi đã cập nhật hotfix mới:
```js
KVPV_THAC_AN_CD0.status(); // enabled=false, suspended=true, đọc các cooldown
KVPV_XA_MENH_LV2.status(); // enabled=false, suspended=true
```
Giá trị MPACK gốc: Bát Hoang Phá Thế Lv1/Lv2 30000ms, Lv3 25000ms; Xá Mệnh Nhất Kích Lv2 30000ms; Quẻ Thượng Lv2 30000ms; Ma Hóa Lv2 vốn 0ms. Các điều kiện mở khóa vẫn giữ nguyên. **Không khẳng định 0ms client bỏ qua cooldown server; lần thử đã gây mất chiến đấu.**


## Khôi phục Thác Ấn sau khi 0ms gây ngưng skill (2026-10-31)

Trên một phiên game, người dùng báo nhân vật đứng yên và ngừng tung skill sau khi bật Thác Ấn client 0ms. Chưa xác định được đó là đợi hoạt ảnh, hồi chiêu server, bộ tự đánh mất quyền hay lỗi khác. Cấu hình 0ms vẫn **bị khóa**.

**Bản sửa bổ sung:** Ngay cả khi closure của module 0ms cũ đã mất, module mới cố gắng khôi phục các hàng `skill[6]` còn 0ms về MPACK gốc (khi ID, level, record khớp hoàn toàn):
- Bát Hoang Phá Thế Lv1/2: `30000`, Lv3: `25000` ms.
- Xá Mệnh Nhất Kích Lv2: `30000` ms.
- Quẻ Thượng Lv2: `30000` ms.
- Ma Hóa Lv2 vốn `0` ms nên **không thay đổi**.
- Hàng không khớp record hoặc có giá trị khác 0 sẽ **không bị ghi đè**.

Mọi thao tác đều chỉ trên dữ liệu cấu hình client của **đúng skill**, không ép skill, không tạo packet, không thao tác phó bản, không mở khóa hoặc tiêu KNB.

Sau khi đồng bộ và nạp FULL mới, kiểm tra/khôi phục bằng:
```js
KVPV_COMBAT_STALL.recover();  // khôi phục đúng cooldown client nếu còn 0ms
KVPV_COMBAT_STALL.status();   // snapshot lý do tự đánh chờ, chỉ đọc
```
Trường `thac.unresolved` phải là `[]`. Nếu đã là `[]` mà nhân vật vẫn không tung skill, 0ms cấu hình còn sót **không phải nguyên nhân hiện tại đã chứng minh được**. Đọc `outside.reason`, `long.reason`, `mode.reason`, `native.targetType` và `hints` để xác định bước kiểm tra tiếp theo. Bản sửa **không** tự khởi động lại combat mode mà người dùng đã dừng, và **không** can thiệp `isCooldown`/hoạt ảnh.

## Thiên Quan: bốn skill thường

Thiên Quan tự đánh Boss xoay đúng `8001`, `8002`, `8003`, `8004`; profile chặn `8005` và Tuyệt Học. Selector vẫn tôn trọng hàng skill đã học và cooldown native. Báo cáo `KVPV_TH300.status(false).playerSkillIds` để xem danh sách skill đang được phép.


## Sửa trường hợp skill native đánh mặc định được nhưng bộ Thiên Quan không chọn (2026-10-31)

Client gốc 17MB đoạn `_Bkh._c7t` (37131–37138) lấy các kỹ năng đã học từ `_vX.ins.skills`, lọc `skill[17]` theo cảnh rồi nạp vào native selector `_rtt/_wet` ở `_$tt` (37140–37161). Bản mở rộng MPACK trước đó lại xác minh lần nữa bằng `_Ba._rJ._O$.ins.skills` — đây là một mô hình song song, chưa được chứng minh đồng bộ. Nếu danh sách thứ hai thiếu/muộn, chiêu đánh mặc định được nhưng bộ TQ từ chối.

Bản sửa: **ưu tiên đúng `_vX.ins.skills` như client gốc**, chỉ fallback sang `_Ba._rJ._O$.ins.skills` khi nguồn gốc không sẵn có. Vẫn bắt buộc ID hiện diện trong native selector, cấu hình MPACK chủ động, cấp kỹ năng và cảnh hợp lệ; không gọi nội tại/skill child, không bỏ native cooldown.

Kiểm tra sau khi nạp bản FULL mới trong Thiên Quan:
```js
KVPV_TH300.status(false).tianQuanMpackExtras
KVPV_TH300.status(false).playerSkillIds
```
Trường `learnedSource` là `native_vX` khi tìm được danh sách gốc, hoặc `player_model_fallback` khi chưa thấy. Kết quả `ids` chỉ là các skill **đủ điều kiện được chọn**, chưa chứng minh đã tung và gây sát thương trên server.

**Khác với kích hoạt nội tại Thánh Trang**: Bát Hoang 3021, Xá Mệnh 3031, Cuồng Long 3061 do server/native gameplay kích hoạt theo điều kiện riêng; không nằm trong danh sách chiêu đánh tay.

## Thiên Quan: hồi phục xong không cần 100% HP (2026-10-31)

The old HitRun core required **100% HP in all scenes** to return from `RETREAT`. For a confirmed `THIEN_QUAN` scene (`KVPV_FAR_SCOPE.status().inside===true`), it now allows early release of its native attack/movement guard when all are true: HP is **at least 45%**, HP has **actually risen at least 5 percentage points** since retreat minimum, the original `minRetreatMs=1200` has elapsed, actor is a finite distance at least `max(300, Boss native range+20)` away from the Boss, and the actor has not changed or died (preexisting safety guards). `TH300` then repositions to its goal **310** and dispatches skills through existing native cooldown/range gates. This **does not attack while HitRun is RETREAT** and does not force client/server hit chance.

For all other maps, the 100% HP release policy stays unchanged. HP at or below 35% still triggers RETREAT; if HP does not recover enough, retreat remains active. No item upgrades, KNB spending, new network requests, cooldown or animation bypass.

Inspect after syncing:
```js
KVPV_HITRUN1.status(false)
KVPV_V127_HEAL.status(false)
KVPV_TH300.status(false)
```

For the previous positioning pause, check `KVPV_TH300.status(false).goalDistance` and `positioning` alongside `hitrunPhase`; `position_stalled_bounded` can be stale when the HitRun owner is in RETREAT, since TH300's position-correction loop does not own movement in that phase. This update releases ownership earlier when healthy enough, allowing TH300 to reposition rather than overriding the native movement gate.
