# Tru Tiên PvP — đánh tay native 8001–8005, hoạt ảnh x9999

Chỉ áp dụng trong scene **TRU_TIEN** được nhận diện bằng native map type 52. Đây là chế độ thủ công thử nghiệm, không tự khởi động và không can thiệp Thiên Quan, Linh Lung, Phù Văn hoặc cooldown server.

## Thay đổi mới

- **Không gửi Tuyệt Học 1001–1008** từ nhân vật nữa. Chỉ gửi các đòn tay đã học trong nhóm **8001–8005**; ưu tiên khởi điểm 8005, 8004, 8002, 8003, 8001; dựa trên damage native 1012 thu được để điều chỉnh thứ tự khi đủ mẫu. Không phát đòn khi game từ chối native target/range/cooldown hay không có hàng skill ready.
- Quét nhịp client **10ms**, không có khoảng chờ client bổ sung cho hoạt ảnh. **10ms là nhịp kiểm tra, không phải 100 hit/s hay xóa cooldown server.**
- Hoạt ảnh mặc định **x9999**, chỉ nhân native timeScale của action lấy từ config native đòn tay khi gọi `combat(8001..8005)` đồng bộ. Dùng wrapper `_Qrt.getActionTween` ngay trong lúc cast, **trả nguyên descriptor sau khi cast kể cả lỗi**. Không đụng timeScale của Tuyệt Học, nhân vật khác, các map khác hoặc clip bên ngoài lần cast này.
- Có thể bật trước khi chọn đối thủ: `enabled:true`, `reason:'waiting_player_target'`. Khi chọn người chơi type 4 trong game, module tự sử dụng mục tiêu đang chọn; **không tự tìm/đánh ngẫu nhiên người khác**, và sẽ không phát skill lên quái.
- Khi đã khóa mục tiêu đầu, để chủ động chuyển sang đối thủ thứ hai còn sống dùng `setFocusToSelected()`. Khi mục tiêu trước chết, tự nhận người tiếp theo **nếu người dùng đã chọn**.
- Pet/Fuwa/Ride giữ đúng logic native riêng từ phiên trước, có thể tắt bằng `companions:false`; `autoDodge` chỉ liên quan né Tuyệt Học **đối phương** chứ không làm nhân vật tung Tuyệt Học.

## Cách sử dụng trong game-frame

Sau khi **merge + build + nạp bản mới**, vào Tru Tiên:

```js
// Có thể chạy trước khi click chọn đối thủ
KVPV_TRUTIEN_PVP.start({autoDodge:false, companions:true});

// Hoạt ảnh x9999 (mặc định phiên bản này)
KVPV_TRUTIEN_PVP.setVisualSpeed(9999);

// Theo dõi đánh tay, chặn/cooldown và clip thực sự đã tăng tốc
const s=KVPV_TRUTIEN_PVP.status();
console.log({enabled:s.enabled,reason:s.reason,attacks:s.attacks,basics:s.basicAttempts,
  th:s.thAttempts,skills:s.skillIds,visual:s.visual,companions:s.companions});
```

Nếu hoạt ảnh mất hình, lag hoặc đánh không cải thiện, trả tốc độ clip về native **không cần dừng module**:

```js
KVPV_TRUTIEN_PVP.setVisualSpeed(1);
```

Muốn chuyển mục tiêu khi đối thủ thứ nhất còn sống: click người thứ hai trong game rồi gọi:

```js
KVPV_TRUTIEN_PVP.setFocusToSelected();
```

Dừng toàn bộ module PvP này:

```js
KVPV_TRUTIEN_PVP.stop();
```

## Giới hạn kiểm thử

- Test mô phỏng: duy nhất 8001–8005, không có Tuyệt Học chủ; visual x9999; khôi phục wrapper khi native throw; map exit; native cooldown/target/range; target chưa chọn; tập trung một đối thủ và trợ chiến.
- **Chưa xác minh PK thật / full test Windows.** `visual.applied` tăng chỉ chứng minh client đã gọi đúng animation hook, không phải server chấp nhận nhiều đòn hoặc tăng DPS.
- Nếu `visual.unavailable` tăng, client đang dùng đường animation khác nên không có tăng tốc visual. Không ghi đè hook lạ và không xóa native cooldown.
