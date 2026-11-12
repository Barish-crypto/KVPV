# Combo skill PvE theo bằng chứng từng map

## Cách xếp hạng

- Combo chỉ được xếp hạng trong controller KVPV đang sở hữu lựa chọn skill; PvP, map dùng native selector thuần và các controller đường riêng không bị chiếm quyền.
- Mẫu được tách theo map và mục tiêu. Chỉ damage trực tiếp ghép được với cast cùng skill mới được dùng; không ghép được hit không bị xem là miss.
- Cần ít nhất hai matched hit để dùng damage trung bình xếp hạng. Mỗi bảy cast, controller có thể ưu tiên skill ít mẫu hơn để thu thập thêm bằng chứng; nếu chưa có dữ liệu, thứ tự gốc vẫn là fallback.
- Nếu cùng skill có nhiều cast đang chờ trên cùng mục tiêu nên một hit không thể ghép duy nhất, hit đó bị loại khỏi ranking và được đếm riêng trong `ambiguousHits`.
- Chỉ đổi thứ tự giữa các skill native đang sẵn sàng. Không sửa cooldown/timestamp, tầm đánh, animation hay gửi RPC.
- Profile map/đối thủ của combo ngoài tháp được lưu cục bộ theo actor, tối đa 16 context gần nhất; dữ liệu damage chỉ được ghi sau matched hit xác nhận và được gộp ghi trễ để tránh chặn nhịp đánh. Đổi mục tiêu không trộn damage giữa hai mục tiêu.
- Có thể xem trạng thái lưu tại `KVPV_BASIC10.status().adaptiveCombo.persistence`; xóa profile bằng `KVPV_BASIC10.clearAdaptiveProfile()`. Profile lưu lỗi hoặc sai schema sẽ được báo trạng thái và không tự ghi đè.

## Phạm vi và chẩn đoán

- [08-range-evidence.mjs](../esm/modules/08-range-evidence.mjs): Cosmic ranking hoạt động khi TQ Five Basics đang bật trong các scope PvE tháp được hỗ trợ: `THIEN_QUAN`, `LINH_LUNG`, `PHU_VAN`. Dữ liệu được reset khi đổi mục tiêu.
- [12-basic-outside.mjs](../esm/modules/12-basic-outside.mjs): combo PvE ngoài các scope tháp ghi nhận matched hit theo map/đối thủ và xếp hạng cơ bản/Tuyệt Học trong selector hook do controller này sở hữu.
- [86-dinh-cao-basic-combo.mjs](../esm/modules/86-dinh-cao-basic-combo.mjs): các event PvE có combo nhiều đòn thường được xếp hạng riêng theo đối thủ; event chỉ có mục tiêu người chơi không bật ranking.
- [71-kiem-khieu-basic.mjs](../esm/modules/71-kiem-khieu-basic.mjs): ranking chỉ áp dụng ở scene 84 khi mục tiêu là quái PvE, bên trong từng nhóm skill mà controller đã ưu tiên.
- Xem trạng thái/tắt ranking ngoài tháp: `KVPV_BASIC10.status().adaptiveCombo` / `KVPV_BASIC10.setAdaptiveRanking(false)`. Xóa dữ liệu học lưu cục bộ: `KVPV_BASIC10.clearAdaptiveProfile()`.
- Xem/tắt ranking event: `KVPV_DINH_CAO_BASIC_COMBO.status().adaptiveCombo` / `KVPV_DINH_CAO_BASIC_COMBO.setAdaptiveRanking(false)`; scene 84 dùng `KVPV_KIEM_KHIEU_BASIC.status().adaptiveCombo` / `KVPV_KIEM_KHIEU_BASIC.setAdaptiveRanking(false)`.
- Xem trạng thái/tắt Cosmic ở các scope tháp: `KVPV_TH300.status(false).cosmic` / `KVPV_TH300.setTianQuanCosmic(false)`.
- Controller chỉ dùng một skill cố định, companion combat và chế độ chỉ preview rồi gọi selector native đúng một lần tiếp tục giữ nguyên chính sách hiện có. Không có bằng chứng cục bộ thì không áp dữ liệu từ map khác.
