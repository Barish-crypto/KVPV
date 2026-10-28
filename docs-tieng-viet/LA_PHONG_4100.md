# La Phong — Thiên Quan ải 4100: ưu tiên đánh thường native

## Phán đoán chiến thuật
Theo quan sát của người chơi, các chiêu đánh thường gây sát thương tốt hơn lên một Boss, còn Tuyệt Học có thể phân tán tác dụng/sát thương qua nhiều mục tiêu. Vì vậy cấu hình ưu tiên **8001–8005**, không tự dùng Tuyệt Học 1001–1008 ở riêng ải 4100.

Điều này là **giả thuyết dựa trên quan sát của người chơi**; mức hiệu quả cần đo bằng log sát thương của Boss thật.

## Cấu hình mặc định của phiên bản này (khi được triển khai)
- `src/11-auto-tianquan.js` bật `setTianQuan4100BasicSolo(true)` sau khi khởi động La Phong.
- Chỉ áp dụng nếu `curLv=4100`, đúng phạm vi `THIEN_QUAN`, bộ TH300 đang chạy, cấu hình giữ khoảng cách riêng của Thiên Quan bật và La Phong đang active.
- Bộ chọn chỉ lấy 8001–8005 đang sẵn sàng; bộ combat chặn native 1001–1008 cho nhân vật sở hữu trong phạm vi đó.
- Giữ nguyên tầm mục tiêu 310 và cổng native animation/cooldown. Client chờ 1ms chỉ là polling; **không xác nhận có thể đánh mỗi 1ms trên server**, không tự nhân damage/hack cooldown.
- Tầng khác, map khác và PvP vẫn theo cấu hình trước. Bộ A/B `setTianQuan4100Pilot` cũ để tắt; nếu chủ động bật thử A/B, chế độ basic solo sẽ tắt để tránh mâu thuẫn.

## Điều khiển tại Console sau khi code mới đã được build và chạy

```js
// Bật lại hoặc kiểm tra riêng chế độ 4100:
KVPV_TH300.setTianQuan4100BasicSolo(true);
KVPV_TH300.status(false).luoFeng.basicSolo4100;

// Chẩn đoán nguyên nhân mất >4 phút:
KVPV_TH300.tianQuan4100Diagnosis();
KVPV_TH300.dps();

// Tắt riêng ưu tiên đòn thường của ải 4100:
KVPV_TH300.setTianQuan4100BasicSolo(false);
```

**Không chạy lệnh mới trên phiên bản cũ chưa có API.** Nếu mới dùng bản `main` cũ, có thể thử ngay chế độ 5 kỹ năng thường toàn Thiên Quan bằng:
```js
KVPV_TH300.setTianQuanFiveBasics(true,1);
KVPV_TH300.setTianQuanTuyetHoc(false);
KVPV_TH300.setTianQuanTHGapBasics(false);
```
Ba lệnh này có tác dụng rộng hơn chỉ ải 4100, và cần khôi phục Tuyệt Học thủ công nếu muốn bật lại.

## Kiểm chứng
- Bài `TEST_TQ4100_BASIC_SOLO.cjs`: native basic rotation, TH không qua selector hay combat dispatch, cooldown native còn nguyên, tầm 310, map/tầng khác không bị tác động, auto startup chỉ bật khi phù hợp.
- Các bài La Phong V3, Cosmic, TH Gap, TQ Five Basics, 4100 A/B cũng cần PASS.
- Trên Windows: tạo `.kvpv-live/maintenance.lock` rồi chạy `node TEST_TQ4100_BASIC_SOLO.cjs` và `$env:KVPV_VERIFY_MAINTENANCE='1'; node test.cjs`. Không merge `main` hay thay runtime khi chưa đủ kiểm thử.
- Tỉ lệ trúng ở khoảng cách 310 phải xác minh bằng các cặp cast–damage đúng Boss. Tầm Boss 280 từ quan sát/config **chưa bảo đảm server không thể đánh trúng ở 310**.

## Về Tuyệt Học
Không mặc định Tuyệt Học là vô dụng: nếu TH cấp buff tăng công kéo dài làm đòn thường về sau mạnh hơn, có thể nghiên cứu chế độ **TH buff đúng lúc + basics liên tục**, nhưng chỉ sau khi phân biệt được sát thương buff theo thời gian và chứng minh có lợi hơn basics thuần. Không bật thử tự động trong bản này.

## Phát hiện từ trận thật ngày 28/10/2026
- Trạng thái combat native ở 600/600 lần lấy mẫu 10ms đều hiện `animation=true` và `isCooldown=true`, nhưng trong một phép chẩn đoán tiếp theo, `castAttempts` vẫn tăng từ 3359 lên 3372 trong 3 giây. Tween animation cũng thay đối tượng và timer TH300 tick 3–6ms. Vì vậy không thể kết luận bị kẹt hoặc cứ cắt animation là tăng DPS; các khoảng đủ điều kiện đánh có thể ngắn hơn chu kỳ quan sát.
- Bộ đánh hiện tại có thể tung khoảng 13 lần/3 giây ở điều kiện đã đo; đây là *lần thử phía client*, không phải 13 đòn được server xác nhận.
- **Fix mới:** `cosmicActive()` không còn phụ thuộc `tqFive.allowsTuyetHoc()`. Khi tắt Tuyệt Học, Cosmic và La Phong vẫn học các đòn thường 8001–8005 bằng sát thương `cast → hit` đã xác nhận. Giữ nguyên native readiness, cooldown và movement. Bổ sung kiểm thử mẫu 8005 ~3,62 tỷ/đòn ưu tiên hơn 8001–8004 ~0,85–0,94 tỷ/đòn.
- `basicSolo4100` trả về `undefined` trong bản người dùng đang chạy là dấu hiệu phiên bản PR chưa được build/triển khai; bản nháp trên GitHub không tự thay đổi runtime hiện tại.
