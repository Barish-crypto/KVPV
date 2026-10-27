# Đồng bộ vào tab Edge đã đăng nhập

## Cài một lần

1. Chạy `CAI_DONG_BO_EDGE.bat`. File này tạo bộ nối cục bộ và đăng ký với Edge cho Windows user hiện tại; không cần quyền Administrator. Nó dừng watcher kiểu cửa sổ riêng nếu còn chạy, giữ nguyên các cửa sổ game.
2. Mở `edge://extensions`, bật **Developer mode / Chế độ nhà phát triển**.
3. Chọn **Load unpacked / Tải tiện ích đã giải nén**, chọn đúng thư mục `edge-addon` trong dự án này. Không chọn thư mục `native` bên trong.
4. Ghim tiện ích **KVPV — Đồng bộ tab game** lên thanh công cụ nếu muốn.

## Dùng trên tab hiện tại

1. Chọn tab game đã vào nhân vật. Đóng DevTools/Console nếu đang mở để tránh tranh kết nối debugger.
2. Bấm biểu tượng tiện ích → **Bật đồng bộ tab này**.
3. Chờ thông báo `Đã kiểm thử · FULL …` cùng `LOADED …` hoặc `READY …`. Không F5, không dán Snippet, không đăng nhập lại.

Với acc chính/clone, bật một lần trên từng tab muốn đồng bộ. Từ đó, khi file nguồn `src/` được lưu, bộ nối tự build + chạy kiểm thử, rồi nạp bản mới vào đúng những tab đã bật. Lỗi kiểm thử giữ bản game đang chạy. Chờ hồi sinh nếu nhân vật đã chết khi tới lượt cập nhật.

Edge có thể hiện thanh thông báo tiện ích đang gỡ lỗi tab. Nếu bấm hủy thanh đó hoặc ngắt trong tiện ích, đồng bộ dừng; code đã nạp vẫn chạy. Mở lại Edge hoặc đóng/mở lại tab thì bật lại cho tab cần dùng.

## Nếu chưa kết nối

- `Specified native messaging host not found`: chạy `CAI_DONG_BO_EDGE.bat` rồi bấm bật lại. Cài trong đúng Windows user đang dùng Edge.
- Debugger bị tranh quyền: đóng DevTools rồi bật lại.
- Không có nhân vật sẵn sàng: đợi vào game; game-frame mới được phát hiện tự động.
- Di chuyển thư mục dự án: chạy lại file cài để cập nhật đường dẫn.

Không bật đồng thời watcher kiểu cửa sổ riêng trên cùng game-frame. Tiện ích không mở cổng mạng, không tải code từ website; code đọc từ đúng dự án này. Quyền `debugger` dùng để nạp code vào tab đang mở và `nativeMessaging` nối với file trên máy. Không cấp một bridge lệnh cho website.

## Gỡ

Ngắt/loại bỏ tiện ích tại `edge://extensions`. Có thể chạy `edge-addon/native/uninstall.ps1` để gỡ đăng ký bộ nối của dự án này khỏi Windows user. Không xóa dữ liệu đăng nhập game.

## Cập nhật bộ đồng bộ

Khi thay đổi mã tiện ích hoặc native host: mở `edge://extensions`, bấm **Tải lại** trên KVPV, rồi bật đồng bộ lại ở từng tab game. Không F5 trang game. Mã tiện ích đang chạy chỉ đổi sau lần tải lại này.

Bản tối ưu dùng chung kết quả kiểm thử theo hash toàn bộ đầu vào giữa Edge/Chrome; nguồn đổi hoặc FULL sai hash sẽ phải kiểm tra lại. Lưu liên tiếp được gom trong 150 ms. Các tab đồng bộ song song và bản mới đến lúc đang xử lý sẽ chạy tiếp ngay. File sinh tự động không kích hoạt vòng build. Bộ theo dõi cũ dùng BAT cần dừng rồi bật lại để nhận mã theo dõi mới.

Báo cáo nhiệm vụ tự động: `.kvpv-live/diagnostics/<actor>.json`, cập nhật tối đa mỗi 5 giây khi tab game đã gắn và mã nền tiện ích mới đã nạp. Sau bản cập nhật chức năng báo cáo, tải lại tiện ích một lần và bật lại đồng bộ từng tab; không F5 game. Báo cáo chỉ là dữ liệu đọc, không tự chạy mã hoặc tự gọi Codex.
