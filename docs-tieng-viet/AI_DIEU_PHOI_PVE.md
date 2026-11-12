# AI điều phối PvE

`KVPV_CONTEXT_BRAIN` điều phối tự động ở phạm vi **Tự Vượt PvE**: khi game rảnh, nó gọi duy nhất controller native hiện có `KVPV_DAILY.tuVuotIdle()`. Controller đó vẫn giữ quyền quyết định điều kiện vào ải và gửi hành động. Brain không tạo RPC/combat sender, không tự chọn nhiệm vụ khác, không chạy các hoạt động Daily tốn lượt, không PvP, không mua/tiêu KNB hoặc tài nguyên hiếm, và không bỏ qua cooldown hay điều kiện native.

Tác vụ chỉ bắt đầu khi actor/session hợp lệ, nhân vật sống, không có thao tác UI/manual, không bị stage guard khóa, không có lịch sự kiện giữ quyền, red-dot không sở hữu progression, và scene arbiter cho phép stage. Brain gọi observer ACK hiện có trong khi ải do nó bắt đầu đang chạy.

- `KVPV_CONTEXT_BRAIN.autoPveStatus()` xem trạng thái, lý do chờ, và liệu brain có sở hữu stage đang chạy hay không.
- `autoPveStatus().progress` ghi nhận cấp/map đã quan sát, số mẫu, số ải tăng cấp và số lần đổi map. Chỉ báo `possibleStall` xuất hiện sau ít nhất 4 mẫu cùng cấp/map và 60 giây không thay đổi; độ tin cậy thấp, không đồng nghĩa chắc chắn bị kẹt.
- `KVPV_CONTEXT_BRAIN.stopAutoPve()` dừng timer; nếu brain đã bắt đầu stage, nó cũng dừng controller stage đó.
- `KVPV_CONTEXT_BRAIN.startAutoPve()` bật lại controller stage đã có và tiếp tục điều phối.
- Chế độ Tự Vượt được khởi động tự động khi module nạp và actor đã xác thực; nếu controller native bị tắt, brain chờ và không tự bật lại.

## Profile cục bộ

Khi gọi `KVPV_CONTEXT_BRAIN.plan()`, hệ thống ghi nhận tối đa 1.000 ngữ cảnh gần nhất theo actor/map/activity và ID mục tiêu PvE chỉ khi native xác nhận mục tiêu loại 1. Mục tiêu PvP loại 4 không được học. Mỗi ngữ cảnh giữ tối đa 30 bộ đếm panel/loại hành động; dữ liệu profile được giới hạn tối đa 2 MB ký tự. Không ghi nhãn UI, tên nhân vật hay nội dung tài khoản. Profile nằm trong `localStorage` của trình duyệt với khóa `KVPV_CONTEXT_BRAIN_PROFILE_V1:<actor>`.

- `KVPV_CONTEXT_BRAIN.profile()` xem profile và trạng thái lưu.
- `KVPV_CONTEXT_BRAIN.clearProfile()` xóa profile của actor hiện tại.
- `KVPV_CONTEXT_BRAIN.plan()` trả hoạt động, trạng thái Tự Vượt, đề xuất và lịch sử quan sát; lịch sử chỉ dùng làm tiêu chí phụ khi xếp hạng.
- `KVPV_CONTEXT_BRAIN.status()` trả kế hoạch hiện tại mà không ghi thêm quan sát.

Chỉ báo tiến độ là quan sát trong phiên, không phát lệnh khôi phục, reset hay đổi map. Map/cấp thay đổi sẽ bắt đầu cửa sổ đo mới.

Dữ liệu lỗi/corrupt không bị tự ghi đè. Lỗi đọc/ghi được hiển thị trong `profile().status`/`error` và console; việc xóa profile vẫn là thao tác chủ động.
