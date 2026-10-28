# La Phong PvP — né Tuyệt Học native (thử nghiệm)

**Cập nhật Tru Tiên:** PR này bổ sung `KVPV_TRUTIEN_PVP.start({autoDodge:false|true})` để đánh Tuyệt Học 1001–1008 **chỉ** lên người chơi được chọn ở scene Tru Tiên native type 52. Role người chơi thực được nhận diện type **4** trong Tru Tiên; không mở rộng type này ra map thường. Xem `docs-tieng-viet/TRU_TIEN_PVP_LA_PHONG.md`. Khi mode mới bật, Boss watcher được nhả bằng `KVPV_MODE.stop()` để không tự giành lại mục tiêu quái. Bản này chưa live-test.

## Nguyên tắc
Bộ này chỉ theo dõi đối thủ đang được chọn làm mục tiêu. Có thể đọc tín hiệu 1039 trên role của đối thủ nếu client thực sự phát tín hiệu này; chỉ coi ID 1001..1008 là Tuyệt Học ứng viên. Tín hiệu phải nhắm vào nhân vật của mình.

**Giới hạn:** Chưa chứng minh game đồng bộ event 1039 của đối thủ sang client. Đây là điều kiện phải kiểm tra bằng trận PK thật. Không nhìn thấy event thì không thể phản ứng tự né. Ngay khi thấy event, không bảo đảm còn đủ thời gian tránh sát thương server; AoE có thể vẫn trúng.

## Lệnh Console khi module đã được build / triển khai
1. Chọn đối thủ trong game, bật quan sát KHÔNG tự di chuyển:
    KVPV_PVP_LUOFENG.start({autoDodge:false})
    KVPV_PVP_LUOFENG.status()
2. Để đối phương dùng Tuyệt Học nhắm vào mình. Kiểm tra observedSignals, observedTH và attached.
3. Chỉ khi nhận được tín hiệu đúng mới thử bật né tự động:
    KVPV_PVP_LUOFENG.start({autoDodge:true})
    KVPV_PVP_LUOFENG.status()
4. Khi kết thúc PK, dừng và tháo event listener:
    KVPV_PVP_LUOFENG.stop()

## Quy tắc an toàn
- Chỉ nghe một người chơi đang được chọn; loại mục tiêu quái type=1 và loại cùng ID nhân vật.
- Xem selectedTargetType để xác nhận mã player thực tế; hiện chỉ nhận type 0/2, chưa biết mọi role của game.
- Tối đa một lệnh né mỗi 1.250ms; thử di chuyển native chéo ngang ra ngoài 115 đơn vị.
- Nhường Boss/TH300/HitRun/Mode, Daily, tác vụ ưu tiên, thao tác UI, game nền, lúc đang di chuyển hoặc đã chết.
- Không sửa cooldown, skill native, WebSocket/RPC; không tự đánh, không tự lên lịch khi chưa gọi start.

## Kiểm thử Windows trước khi merge
- Tạo .kvpv-live/maintenance.lock tại checkout repo.
- node TEST_PVP_LUOFENG.cjs
- PowerShell: $env:KVPV_VERIFY_MAINTENANCE='1'; node test.cjs; Remove-Item Env:KVPV_VERIFY_MAINTENANCE
- Chỉ deploy khi full suite PASS, không có xung đột hook và tín hiệu opponent TH được xác minh.
