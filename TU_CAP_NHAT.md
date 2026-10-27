# Tự cập nhật code vào game

1. Chạy `BAT_TU_CAP_NHAT.bat` trong thư mục dự án.
2. Đăng nhập game trong cửa sổ Chrome riêng vừa mở. Acc chính và clone dùng tab/cửa sổ game riêng.
3. Giữ bộ theo dõi chạy nền. Mỗi lần sửa và lưu nguồn trong `src/`, nó tự build, chạy bộ kiểm thử và nạp FULL mới vào các game-frame đang đăng nhập. Không copy/paste, Snippet, F5 hay reload extension.

Việc cập nhật diễn ra sau vài giây khi kiểm thử qua và game sẵn sàng. Lỗi cú pháp/build/kiểm thử không thay bản đang chạy; sửa lỗi và lưu nguồn sẽ tự thử lại. Nhân vật chết sẽ chờ hồi sinh trước khi cập nhật. Đừng sửa trực tiếp file FULL được sinh tự động.

Cửa sổ riêng dùng profile `.kvpv-live/browser-profile` và cổng debugging chỉ trên máy (127.0.0.1). Không sao chép cookie từ Chrome thường. Chrome yêu cầu profile riêng cho remote debugging. Đăng nhập được giữ trong profile này cho những lần mở sau. Không cần mở DevTools.

Xem kết quả nạp trong `.kvpv-live/watcher.log`: `BUILD READY` rồi `LOADED … actor …`.

Muốn dừng đồng bộ, chạy `TAT_TU_CAP_NHAT.bat`. Chỉ tắt bộ theo dõi; code đã nạp và game vẫn tiếp tục chạy. Để mở lại cửa sổ chuyên dụng sau khi đã đóng, dừng rồi bật bộ theo dõi lại.

Chuyển hẳn nhân vật trong cùng một game-frame vẫn bị khóa như FULL; mở tab game mới cho account khác. Không cần cài tiện ích trình duyệt.

Mọi mã chạy từ thư mục máy này; không cần thuê server hoặc API AI để duy trì đồng bộ. Chỉ thay đổi file đã lưu ở đúng dự án này mới được đồng bộ.
