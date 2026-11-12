# Viễn Chinh qua red dot

Dispatcher trung tâm trong `esm/modules/01-red-dot-module.mjs` xử lý:

- `977`: nhận từng nhiệm vụ ngày đã hoàn thành.
- `978`: nhận từng nhiệm vụ giới hạn tuần đã hoàn thành.

Hai luồng chỉ chạy khi red dot tương ứng đang hoạt động, mùa Viễn Chinh còn hạn,
và client có dữ liệu nhiệm vụ cùng RPC native. Claim dùng
`FinishExpeditionTask(id, false)`, không tiêu điểm để hoàn thành nhiệm vụ.
Mỗi lượt chờ trạng thái nhiệm vụ từ server đổi trước khi gửi lượt kế tiếp; quá
thời hạn xác nhận thì không tự gửi lại.

Các plugin Viễn Chinh legacy trong V8 bị tắt để tránh gửi trùng. Red dot `979`
(mốc điểm) hiện chưa được chuyển sang dispatcher trung tâm và không nằm trong
phạm vi tự động hóa này. Red dot không tự vào trận hay phát lệnh chiến đấu.

## Combat Boss có xác nhận thủ công

Trong trận Viễn Chinh, chỉ mở scope combat khi scene native là `74`, map live
khớp map entry, cấu hình map xác nhận type `74`, scene không phải common-scene,
và actor hiện tại khớp actor sở hữu. Dùng `KVPV_BOSS_UNIFIED.start('BOSS')`
để đi qua đúng combat mode BOSS hiện có; không thêm sender hoặc RPC chiến đấu.
PvP controller đang hoạt động giữ quyền sở hữu và sẽ chặn việc bật BOSS.

Chỉ mục tiêu quái/Boss native hợp lệ có thể được HitRun nhận; đòn đánh vẫn do
combat native quyết định bằng target, cooldown và valid-range hiện có. PvP và
Expedition dùng chung phép tính khoảng cách Euclid theo tọa độ; trong Expedition
phép tính này cấp khoảng cách cho spacing/rút lui, không đặt ngưỡng tầm đánh
mới. Khi HP xuống `35%`, HitRun hiện hữu rút lui;
chỉ tiếp tục khi HP hồi đủ `100%` và được xác nhận ổn định. `stop()` dừng mode.
