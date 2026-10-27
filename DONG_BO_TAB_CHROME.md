# Đồng bộ tab Chrome đang đăng nhập (Windows PC)

1. Chạy `CAI_DONG_BO_CHROME.bat` một lần. Đăng ký host riêng cho Chrome, giữ đăng ký và tab Edge hiện có.
2. Mở `chrome://extensions`, bật **Chế độ nhà phát triển / Developer mode**.
3. Chọn **Tải tiện ích đã giải nén / Load unpacked**, chọn thư mục `edge-addon` của dự án.
4. Mở tab game đã đăng nhập, đóng DevTools để tránh tranh debugger.
5. Bấm tiện ích **KVPV — Đồng bộ tab game** → **Bật đồng bộ tab này**.

Không cần F5, Snippet hoặc đăng nhập lại. Bật trên từng tab chính/clone cần dùng.
Chrome và Edge dùng chung nguồn FULL; mỗi trình duyệt có kết nối native và danh sách tab riêng.
Khi sửa nguồn: build + kiểm thử thành công mới cập nhật, lỗi giữ bản cũ.
Tiện ích giữ ID cố định trong manifest; không xóa hoặc đổi trường key.

Nếu báo host not found, chạy lại BAT trong đúng Windows user đang dùng Chrome.
Nếu ngắt thanh debugger hoặc khởi động lại trình duyệt, bật lại trên các tab cần đồng bộ.
Gỡ riêng Chrome: chạy `edge-addon/native/uninstall.ps1 -Browser Chrome`, rồi gỡ tiện ích trong Chrome.

Thư mục vẫn tên edge-addon để cả hai trình duyệt dùng cùng một bản, tránh lệch code.
Đây là hỗ trợ Chrome PC. Bản điện thoại Android tiếp tục dùng Firefox + Tampermonkey.

## Cập nhật bộ đồng bộ

Khi thay đổi mã tiện ích hoặc native host: mở `chrome://extensions`, bấm **Tải lại** trên KVPV, rồi bật đồng bộ lại ở từng tab game. Không F5 trang game. Mã tiện ích đang chạy chỉ đổi sau lần tải lại này.

Bản tối ưu dùng chung kết quả kiểm thử theo hash toàn bộ đầu vào giữa Edge/Chrome; nguồn đổi hoặc FULL sai hash sẽ phải kiểm tra lại. Lưu liên tiếp được gom trong 150 ms. Các tab đồng bộ song song và bản mới đến lúc đang xử lý sẽ chạy tiếp ngay. File sinh tự động không kích hoạt vòng build. Bộ theo dõi cũ dùng BAT cần dừng rồi bật lại để nhận mã theo dõi mới.

Báo cáo nhiệm vụ tự động: `.kvpv-live/diagnostics/<actor>.json`, cập nhật tối đa mỗi 5 giây khi tab game đã gắn và mã nền tiện ích mới đã nạp. Sau bản cập nhật chức năng báo cáo, tải lại tiện ích một lần và bật lại đồng bộ từng tab; không F5 game. Báo cáo chỉ là dữ liệu đọc, không tự chạy mã hoặc tự gọi Codex.
