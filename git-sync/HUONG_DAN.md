# KVPV: ChatGPT → GitHub → Windows → Extension

Mục đích: sau khi người dùng **thiết lập một lần**, mỗi bản sửa mã nguồn được **commit/push lên repository GitHub** sẽ tự được tải về Windows sau khoảng 60 giây; Native Host hiện có kiểm thử/build rồi nạp vào game. Không cần tải ZIP hoặc copy FULL mỗi lần.

## Giới hạn quan trọng

ChatGPT trong cuộc trò chuyện thông thường **không có quyền sửa ổ C hay push GitHub** nếu người dùng chưa kết nối/cho phép. Với GitHub connector (hoặc ChatGPT Work có quyền repo), yêu cầu sửa nguồn và push commit vào nhánh đã chọn. Không thể tự động chuyển các file chỉ xuất hiện dưới dạng link `sandbox:` vào Windows.

## Thiết lập MỘT LẦN

1. Giải nén bộ KVPV vào một thư mục riêng trên Windows, chạy `CAI_DONG_BO_EDGE.bat` / `CAI_DONG_BO_CHROME.bat` như trước. Gắn tab game bằng popup extension.
2. Tạo một **GitHub repository PRIVATE** và đẩy bộ nguồn lên đó. Kiểm tra không chứa cookie, token, `.kvpv-live`, profile trình duyệt hoặc tài khoản. `.gitignore` trong gói đã loại các dữ liệu phổ biến, nhưng cần tự kiểm tra trước khi push.
3. Mở PowerShell tại thư mục dự án (thay `YOUR_PRIVATE_REPO_URL` bằng URL thật):

   ```powershell
   git init -b main
   git remote add origin YOUR_PRIVATE_REPO_URL
   git add .
   git commit -m "Initial KVPV source and extension"
   git push -u origin main
   ```

   Nếu thư mục đã có `.git` thì bỏ `git init`; nếu có `origin` rồi thì bỏ `remote add`. Không dùng `--force` với repo đã có dữ liệu. Phải xác nhận bạn đang đẩy lên đúng repo riêng và đã xem danh sách file bằng `git status`.
4. Chạy `CAI_GITHUB_AUTO_SYNC.bat` một lần. Nó tạo lối khởi động cùng Windows (Startup folder) và chạy bộ đồng bộ nền ngay lập tức.
5. Trong ChatGPT Work/GitHub connector, cho phép cập nhật đúng repo/nhánh này. Sau này chỉ cần yêu cầu sửa `src/...` và **push commit**; máy tự pull, Native Host tự kiểm thử rồi cập nhật bản FULL trong game nếu hợp lệ.

## Xem trạng thái

- `.kvpv-live/git-auto-sync-status.json`: lỗi/commit mới nhất.
- `.kvpv-live/git-auto-sync.log`: lịch sử đồng bộ.
- `MANIFEST.json`: build hiện tại.
- Popup extension: thông báo Native Host.

## Bảo vệ an toàn

- Chỉ `git fetch` rồi `merge --ff-only` nhánh đang track `origin/*`; không push, không `git reset --hard`, không ghi đè file local đang sửa.
- Nếu Git chưa được cấu hình hoặc không có mạng, ghi lỗi rồi thử lại sau.
- Nếu `maintenance.lock` tồn tại, tạm hoãn. Nếu phát hiện source local đã sửa, không tự kéo bản mới.
- Nếu kiểm thử thất bại, Native Host giữ bản đã nạp trong game; mã lỗi ghi vào trạng thái. Không đảm bảo code mới được áp dụng nóng nếu game yêu cầu reload hoặc engine không hỗ trợ hot reload.
- Nhánh GitHub cần được giới hạn quyền ghi; tuyệt đối không để repo public chứa mã/dữ liệu tài khoản.
- Để tắt tự đồng bộ chạy `TAT_GITHUB_AUTO_SYNC.bat`; extension hiện có vẫn nguyên vẹn.

## Nếu muốn không dùng GitHub

ChatGPT Work trên desktop có thể sửa trực tiếp mã nguồn `src` nếu Work có quyền truy cập thư mục Windows đó; lúc này Native Host/extension hiện có tự cập nhật, không cần cài bộ Git auto-sync. Khả năng này tùy môi trường Work và quyền truy cập file thực tế.
