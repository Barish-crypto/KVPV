# La Phong Apex V4 — Tối ưu Thiên Quan ải 4100 (thử nghiệm)

Đầu ra: tối ưu tốc độ hạ Boss **dựa trên HP quan sát**, KHÔNG giả định game chấp nhận đòn nhanh hơn chỉ vì client quét 1ms. Giữ tầm mục tiêu 310 theo profile Thiên Quan hiện có; không tự đưa nhân vật tới gần Boss tầm 280.

## Thực nghiệm A/B (chủ động bật)
- Chỉ chạy khi curLv của Thiên Quan = 4100, đang có Boss đúng và profile La Phong/Cosmic đang hoạt động.
- Trong 18 giây đủ điều kiện đứng đúng vị trí, đo mức HP Boss giảm với combo Tuyệt Học + đòn thường.
- Trong 18 giây tiếp theo, thử chỉ chọn Tuyệt Học native sẵn sàng, không xen đòn thường.
- Chỉ giữ chế độ Tuyệt Học thuần nếu HP Boss giảm mỗi giây cao hơn combo ít nhất 12%. Nếu không, quay về combo.
- Không dùng thêm RPC/combat cast, không sửa cooldown/animation native, không thay cơ chế di chuyển, không tự bật khi chưa có lệnh.
- Tự reset đo lường khi đổi Boss hoặc tắt tính năng. Dữ liệu HP Boss có thể bao gồm sát thương đồng đội/ngự thú/nguồn khác; kết quả chỉ có tính thử nghiệm.

## Lệnh Console sau khi PR được build và triển khai vào game
```javascript
// Sau khi vào Thiên Quan 4100 và bộ La Phong đã chạy
KVPV_TH300.setTianQuan4100Pilot(true);
// Xem A/B, HP DPS và chế độ đang được chọn
KVPV_TH300.status(false).luoFeng.dpsPilot4100;
// Báo cáo tìm chỗ tiêu thời gian (hồi chiêu / hoạt ảnh / chỉnh vị trí)
KVPV_TH300.tianQuan4100Diagnosis();
// Trả về combo mặc định và dừng đo
KVPV_TH300.setTianQuan4100Pilot(false);
```

## Phân tích một lượt hơn 4 phút
1. Ghi thời gian thật, đứng ở khoảng cách nào, Boss có đi sát hay không.
2. Đọc `KVPV_TH300.dps(false)` để xem `timeMs`, từng kỹ năng, `matchedDps`, `rolling10sMatchedDps`, `animationWaitMs`.
3. So sánh `dpsPilot4100.combo.observedHpDps` và `thOnly.observedHpDps`. Nếu combo mạnh hơn, không tiếp tục cưỡng ép TH-only.
4. Đừng coi `unconfirmed` là miss chắc chắn: có thể do animation, cast trễ, lọc marker hoặc thiếu dữ liệu.
5. Không hứa giảm thời gian nếu Boss có giới hạn DPS từ server, phải có đo thực tế.

## Kiểm thử
```powershell
node TEST_TQ4100_PILOT.cjs
$env:KVPV_VERIFY_MAINTENANCE='1'
node test.cjs
Remove-Item Env:KVPV_VERIFY_MAINTENANCE
```

Chỉ chạy trong checkout thử nghiệm có maintenance.lock. Không tự merge `main` hoặc kích hoạt Auto Sync khi chưa chạy full suite trên máy. PR base là nhánh V3 để không tách khỏi code La Phong trước.
