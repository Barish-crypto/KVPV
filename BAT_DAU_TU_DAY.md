## TỰ ĐỘNG ĐỒNG BỘ TỪ CHATGPT QUA GITHUB (bổ sung)

Bộ này có thêm `git-sync/` và `CAI_GITHUB_AUTO_SYNC.bat`. Nếu muốn yêu cầu sửa code trong ChatGPT và để extension nhận bản mới **không cần tải ZIP lần sau**, hãy làm bước kết nối GitHub **một lần** theo [`git-sync/HUONG_DAN.md`](git-sync/HUONG_DAN.md).

- ChatGPT Work/GitHub connector được cấp quyền đẩy commit lên repo riêng; cuộc trò chuyện thông thường không tự ghi file lên máy.
- Windows kiểm tra `origin` mỗi 60 giây, chỉ `merge --ff-only` khi file local sạch; kiểm thử/build bằng `live/verify.cjs`.
- Extension đã gắn vào tab game sẽ tự lấy bản FULL nếu hợp lệ. Bản cần reload engine hoặc cập nhật chính extension có thể vẫn cần thao tác thủ công.

---

# KVPV TRỌNG TÂM + EXTENSION EDGE/CHROME

**Bản lọc từ KVPV.rar, bổ sung hai tính năng đã làm trong phiên làm việc hiện tại.**

## 1. Giữ lại những phần nào?

| Ưu tiên | Nội dung | Mã nguồn chính |
| --- | --- | --- |
| 1 | Sự kiện lớn theo lịch, ngắt và nhường Tự Vượt Thiên Quan | `src/03-timeline.js`, `src/02-scene.js`, `src/04-engine.js`, `src/62-event-priority.js` |
| 2 | Tầm Tiên Vấn Đạo tự học đáp án server; IndexedDB không giới hạn 2.000 câu; xuất JSON/CSV, tự lưu JSONL khi cấp quyền | `src/60-quiz-auto.js` |
| 3 | Tiên Tôn Đấu Kỹ, Chiến Đội Mạnh Nhất, Hồng Hoang, Boss/team, acc chính/clone | `src/74-tien-ton-native-auto.js`, `src/16-strongest-team.js`, `src/46-team-coordinator.js`, `src/47-boss-team.js` |
| 4 | Thiên Quan/Boss, Hit & Run, né, hồi máu, 5 chiêu tay/Tuyệt Học, đo DPS | `src/00-boss-recovery.js`, `src/08-range-evidence.js`, `src/09-modes.js`, `src/11-auto-tianquan.js`, `src/00-combat-metrics.js` |
| 5 | Nhiệm vụ, trang bị, nhận thưởng, giới hạn chi tiêu KNB | `src/19-account-features.js`, `src/27-craft-low.js`, `src/40-soul-stone-fast.js`, `src/00-spending-policy.js` |
| 6 | Đồng bộ tự động nhiều tab Edge/Chrome bằng extension và Native Host | `edge-addon/`, `edge-addon/native/`, `live/project.cjs`, `live/verify.cjs` |

**Vì có phụ thuộc chéo, giữ nguyên đầy đủ các module `src/*.js` còn hoạt động**, không cắt tùy tiện một nửa `src/04-engine.js`. Đã loại dữ liệu cá nhân/cache trình duyệt, log `.kvpv-live`, lịch sử backup và tài liệu tham khảo nặng. Không kèm profile đăng nhập; phiên đăng nhập cũ vẫn nằm ở thư mục trước đó nếu máy còn giữ.

## 2. Cài lại extension (QUAN TRỌNG)

1. **Giải nén ZIP vào thư mục MỚI trên Windows**, không ghi đè dự án cũ trước khi kiểm thử.
2. Cài Node.js nếu máy chưa có. Vào thư mục vừa giải nén, mở PowerShell và chạy `node test.cjs`. Phải thành công mới cho Native Host tự cập nhật game.
3. **Chạy `CAI_DONG_BO_EDGE.bat`** hoặc `CAI_DONG_BO_CHROME.bat`. Bước này đăng ký lại `com.kvpv.localwatch` trỏ tới **thư mục mới**. `host-manifest.json` trong ZIP có thể vẫn ghi địa chỉ cũ cho tới khi chạy bước này.
4. Mở `edge://extensions` hoặc `chrome://extensions`, bật Developer mode. Đảm bảo chỉ dùng **một** bản tiện ích KVPV phù hợp; nếu tiện ích cũ đang trỏ đến thư mục cũ, gỡ/tắt bản cũ trước. Chọn **Load unpacked** và trỏ đến `edge-addon` của thư mục mới (không chọn `native`).
5. Mở game KVPV, bấm tiện ích và chọn **Bật đồng bộ tab này** hoặc đồng bộ tất cả tab mong muốn. Extension phát hiện game-frame, chờ nhân vật sẵn sàng, xác thực build và nạp mã. Đóng DevTools nếu bị xung đột debugger.

**Chỉ chỉnh trong `src/`**. Khi lưu nguồn mới, Native Host sẽ gọi `live/verify.cjs` để build + kiểm thử và tự đồng bộ nếu hợp lệ. `KVPV_V1_FULL.js` và `MANIFEST.json` là file do `build.cjs` tạo, **không sửa trực tiếp** vì SHA-256 phải trùng.

## 3. Các lệnh kiểm tra trong Console game (đúng game-frame)

```javascript
KVPV_EVENT_PRIORITY.status() // Sự kiện lớn đang giữ quyền; Tự Vượt đã nhường chưa
KVPV_DAILY.tuVuotStatus()     // Tình trạng Tự Vượt Thiên Quan
KVPV.timeline.status()        // Lịch và thời gian đặt chỗ
KVPV_QUIZ_AUTO.status()       // Số câu đã được xác nhận từ server
KVPV_QUIZ_AUTO.panel()        // Bảng lưu đáp án: kết nối file trên máy, JSON/CSV
```

Nếu môi trường game-frame không hỗ trợ File System Access, dùng `KVPV_QUIZ_AUTO.exportJSON()`; chế độ ghi trực tiếp ra file cần cấp quyền thao tác đầu tiên. Câu hỏi chỉ được xác nhận đúng khi game báo pha kết quả, không đoán.

## 4. Lịch sử cải tiến quan trọng

- Giữ lệnh chi tiêu KNB mặc định **không tự chi**; ngoại lệ cũ chỉ dành cho Cổ Vũ native ở map 2051 và 2061.
- `src/62-event-priority.js` là module bổ sung, được thêm vào **FULL và danh sách hot reload** để extension cập nhật được. Bộ quan sát Tự Vượt xóa lượt đang chạy khi phải nhường lịch, không tính nhường lịch là một lần thua ải trong bộ đếm client. Thoát ải sử dụng API native đã xác định, có thể bị server tính lượt theo luật game.
- `src/60-quiz-auto.js` dùng IndexedDB, không còn cắt 2.000 câu, giữ legacy từ localStorage dưới dạng dữ liệu chưa xác nhận server và lưu câu đã xác nhận riêng. Dữ liệu trên từng origin/profile không tự đồng bộ giữa các profile khác nhau.
- `KVPV_THIEN_QUAN_CHI_DANH_TAY.js` là script rời để thử chế độ năm chiêu tay trong Thiên Quan; **không phải module tự nạp mặc định**. Khôi phục script vì bài kiểm thử gốc `TEST_TQ_FIVE_BASICS.cjs` cần đến nó.

## 5. Kiểm thử và giới hạn

Đã chạy `node test.cjs` và kiểm tra `node live/verify.cjs` trong môi trường Node.js (các kiểm thử mô phỏng hoàn thành thành công). Có kiểm thử riêng >2.300 câu, nhường sự kiện, cú pháp FULL, build/hash, extension, đồng bộ nhiều tab. **Chưa cài thử trên Windows thực tế hoặc thực chiến trong game**, nên cần theo dõi lần đầu tham gia sự kiện. Tệp Native Host `.exe` vẫn được giữ từ RAR; `install.ps1` có thể biên dịch lại từ `Launcher.cs` trên Windows.

## 6. Không xóa những phần này

`build.cjs`, `test.cjs`, mọi `TEST_*.cjs`, `runtime-v1.js`, `src/`, `live/`, `windows-app/`, `edge-addon/`, `KVPV_V1_FULL.js`, `MANIFEST.json`, `android/loader.js` và các file Android do build tạo. Chuỗi kiểm thử và xác thực nguồn phụ thuộc các đường dẫn này.
