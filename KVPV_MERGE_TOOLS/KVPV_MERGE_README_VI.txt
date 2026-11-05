KVPV - FULL MERGE x9999 + PRIORITY YIELD / 2026-10-28

Nội dung:
1) KVPV_V1_FULL_MERGED_CANDIDATE.js: FULL gộp từ bản V1 user tải lên, đã kiểm tra Node syntax và selftest cục bộ. Đây là bản ứng viên, KHÔNG phải build lại qua build.cjs và MANIFEST.json của máy user.
2) KVPV_MERGE_PATCH.cjs: chỉnh đúng 3 file src/ của PROJECT HIỆN TẠI, không thay TEST_*.cjs.
3) KVPV_MERGE_SAFE.ps1: sao chép project hiện tại sang KVPV_MERGE_STAGING_<date>, patch, chạy build.cjs, selftest, TEST_COMBO_DEFAULT.cjs, TEST_TQ_TH_VISUAL99.cjs, test.cjs (nếu có). Giữ nguyên project cũ và phiên trình duyệt.
4) KVPV_MERGE_SELFTEST.cjs: kiểm tra một số điều kiện chiến đấu, x99/x9999, nhường hoạt động và guard khởi tạo. Không thay thế toàn bộ test tại Windows.
5) src/: 3 file nguồn đã gộp tương ứng với bản V1 user tải lên; để tham khảo/so sánh, đừng chép đè src/ hiện tại nếu dự án đã thay đổi.

Cách dùng an toàn:
- Giải nén ZIP ở thư mục riêng, không đè project đang chạy.
- Mở PowerShell tại thư mục vừa giải nén:
  powershell -NoProfile -ExecutionPolicy Bypass -File .\KVPV_MERGE_SAFE.ps1
- Script tự tạo thư mục KVPV_MERGE_STAGING_... bên cạnh project gốc, chạy build và test trên bản sao.
- Chỉ dùng bản mới sau khi kết quả đạt ALL AVAILABLE TESTS PASSED, rồi chuyển extension trỏ sang thư mục staging khi chủ động muốn cập nhật. Trước đó không F5 hay reload extension đang chạy.

Cách gộp:
- thVisual ID 1001..1008 đứng trước inTQ nhưng inTQ và native readiness vẫn giữ nguyên.
- setTianQuanTuyetHocVisualSpeed: API TH riêng chỉ hỗ trợ 1/9/30/99 (tương thích TEST_COMBO_DEFAULT).
- setTianQuanVisualSpeed(9999): cho phép 5 đòn thường + 8 Tuyệt Học bằng nhánh tổng hợp, chỉ hoạt ảnh client.
- getActionTween: restore qua phép gán cho own writable data descriptor, descriptor/accessor khác thì restore nguyên descriptor, inherited thì delete.
- Ưu tiên sự kiện đúng giờ, job đang chạy, boss tổ đội, quyền scene, ACK trang bị; Tự Vượt chỉ chạy khi rảnh, yield không tính thua, sau đó scheduler tự cho chạy lại nếu đủ điều kiện.
- x9999 được đặt trong module Tru Tiên khi khởi tạo và khi LIVE_UPDATE cài lại module.

LƯU Ý: Không sửa native cooldown, không tuyên bố tăng DPS server. Các hệ số hoạt ảnh rất cao có thể giảm FPS/mất mượt. Bài test Windows chưa chạy được trong container vì chưa có project src/test.cjs/build.cjs/MANIFEST.json tại đây.
