# Tru Tiên PvP — chỉ spam đòn tay native, hoạt ảnh x9999 (thử nghiệm)

**Thay đổi mới chỉ cho Tru Tiên:** nhân vật KHÔNG còn tự tung Tuyệt Học 1001–1008. Chỉ xoay vòng **8001–8005** ở nhịp quét client 10ms, miễn là native cooldown, native target, range và selector hợp lệ. Tham chiếu đòn tay từ Thiên Quan nhưng không mang hook Boss sang PvP. 10ms không phải tốc độ hit server.

**Khởi động có thể không có mục tiêu:** đang trong Tru Tiên có thể chạy `KVPV_TRUTIEN_PVP.start({autoDodge:false, companions:true})`; hệ thống sẽ `enabled:true`, `reason:'waiting_player_target'` cho tới khi người dùng chọn người chơi hợp lệ (type 4). Không tự chọn hay tấn công quái/đồng đội. Lệnh start nhả Boss mode đang giữ quyền, nên chỉ bật khi muốn chuyển hẳn từ PvE sang PvP.

```js
// Sau khi build và cập nhật FULL từ PR mới:
KVPV_TRUTIEN_PVP.start({autoDodge:false,companions:true});
KVPV_TRUTIEN_PVP.setVisualSpeed(9999);
console.log(KVPV_TRUTIEN_PVP.status().visual);
console.log(KVPV_TRUTIEN_PVP.status().skillIds); // th:[], basic:[8001..8005]

// Nếu hình ảnh lỗi/khựng, trả clip về tốc độ native (không chạm cooldown):
KVPV_TRUTIEN_PVP.setVisualSpeed(1);

// Ngừng mode:
KVPV_TRUTIEN_PVP.stop();
```

**Giới hạn x9999:** chỉ nhân hệ số timeScale của clip trong một lần gọi `combat(8001..8005)` đồng bộ, tạm wrap `_Qrt.getActionTween` khi action native khớp rồi khôi phục descriptor trong `finally`. Không chỉnh FPS, cooldown server, damage hoặc RPC. Nếu cấu trúc avatar/animation không tồn tại hoặc clip được tạo bất đồng bộ, `visual.unavailable` tăng hoặc `visual.applied` không tăng; x9999 khi đó **không có hiệu quả**. x9999 có thể khiến hoạt ảnh gần như không nhìn thấy hoặc gặp lỗi visual. Bật 1 để so sánh.

Lệnh `status()` có `basicAttempts`, `attacks`, `visual.applied`, `visual.unavailable`, `reason`, `observedSkills`. Attempts không chứng minh server nhận đòn. Bộ trợ chiến pet/fuwa/ride vẫn dùng native như cũ; `companions:false` nếu muốn chỉ còn chủ đánh tay. Theo dõi/né Tuyệt Học **đối thủ** là tùy chọn riêng, không làm nhân vật chính tung Tuyệt Học.

**Chưa live test PK hoặc full suite Windows.** Giữ bản đang chạy cho tới khi kiểm thử và chủ động merge.

---

# Tài liệu chế độ cũ (TH + tay), chỉ để tham khảo

## Kích hoạt
- Vào Tru Tiên; KVPV_FAR_SCOPE.status() phải có inside=true và kind=TRU_TIEN (native scene type 52, entry khớp map).
- Chọn thủ công một người chơi đối phương: role native type 4. Không tự chọn quái / đồng đội, không bấm request ngoài game.
- Hai API cần có sau khi build branch PR #8: KVPV_PVP_LUOFENG và KVPV_TRUTIEN_PVP.

Quan sát TH đối phương, không tự né:
```js
KVPV_TRUTIEN_PVP.start({autoDodge:false,companions:true});
KVPV_TRUTIEN_PVP.status();
KVPV_TRUTIEN_PVP.status().tqSkillProfile; // 13 chiêu Thiên Quan được học
KVPV_TRUTIEN_PVP.status().companions; // pet, fuwa, ride
KVPV_TRUTIEN_PVP.setFocusToSelected(); // chỉ khi muốn chuyển mục tiêu đang sống
```
Chỉ thử tự né khi đã thấy remote TH 1039 được nhận thật:
```js
KVPV_TRUTIEN_PVP.start({autoDodge:true});
KVPV_TRUTIEN_PVP.status().dodge;
```
Dừng ngay:
```js
KVPV_TRUTIEN_PVP.stop();
```

## Hành vi và giới hạn
- ALL-IN: **kết hợp Tuyệt Học native 1001–1008 với 5 đòn tay native 8001–8005** (không bỏ đòn thường). TH → tay → TH nếu đều sẵn sàng; khi TH hồi chiêu, ưu tiên dùng tay còn sẵn sàng. Không rút theo HP, không tự hồi máu, không tự chạy áp sát; phải tự chọn mục tiêu và đứng trong tầm native của skill.
- Nhịp quét client 10ms, nhưng chỉ gọi combat khi native isCooldown()===false, isValidTarget()===true, isValidRange()===true, selector native _f7t chọn được hàng TH hoặc đòn tay đã học. Không chỉnh cooldown, WebSocket, damage hoặc vùng đánh. Không chờ cờ hoạt ảnh native riêng trong module PvP Tru Tiên.
- **Bộ ba trợ chiến Thiên Quan được thử trong Tru Tiên:** petContext (Linh Thú type 2), fuwaContext (Phúc Oa type 9), rideContext (Ngự Thú type 7), quét native 50ms độc lập với cooldown của nhân vật. Chỉ khi companion có selector native, skill id và config hợp lệ, c.isCooldown()===false, game chấp nhận `setTarget`/`isValidTarget`/`isValidRange` cho mục tiêu PvP, mới gọi `combat(skill,0,targetKind)`. Buff tự thân nhắm chủ khi config targetKind=1. Không ép game chấp nhận player; nếu không chấp nhận thì stats.companions.blocked tăng, không bảo đảm đồng hành gây sát thương. Có thể tắt riêng bằng `start({autoDodge:false,companions:false})`.
- Khi bắt đầu, module chỉ dừng KVPV_MODE nếu đã chọn đúng người chơi và Tru Tiên hợp lệ. Lệnh này giải phóng Boss mode/TH300/HitRun để không tự chọn lại quái. Nếu Daily đang bận hoặc chủ combat vẫn đang chạy thì từ chối bật. Muốn trở lại auto Boss phải kích hoạt mode cũ sau trận.
- Né tự động qua PR #8 chỉ nghe 1039 của mục tiêu đã chọn, TH 1001–1008 nhắm đúng actorID, rồi thử moveTo sang ngang 115 đơn vị tối đa 1 lần/1250ms. Nhường thao tác UI, cooldown né, movement busy, tab nền, Daily, mode Boss. Né ngang không phải rút lui để hồi máu.
- Map / actor đổi thì dừng và gỡ listener. Đổi mục tiêu sang quái thì không đánh và không tự tìm người khác. **Tập trung một địch**: mặc định khóa người đầu tiên đang được chọn; chọn nhầm người thứ hai khi người thứ nhất còn sống sẽ bị chặn (`reason=focus_locked_switch_manual`), tránh chia nhỏ sát thương. Khi đối thủ đầu đã chết và người dùng chọn địch mới, khóa đổi tự động. Nếu muốn đổi khi địch đầu còn sống: chọn mục tiêu mới trong game, chạy `KVPV_TRUTIEN_PVP.setFocusToSelected()`; hoặc ngay từ đầu `start({autoDodge:false,focusLock:false})` để tắt khóa.
- **Quan trọng**: chưa chứng minh remote 1039 tồn tại ở client hoặc né được server hit; có thể skill/AoE đã trúng trước khi thấy tín hiệu. CastAttempt không bảo đảm hit, 10ms không bảo đảm 100 đòn/giây.
- Danh sách `tqSkillProfile.requested` lấy đúng 13 ID của TQ_BASIC_PROFILE + TH300. `learned/missing` đối chiếu hàng native của nhân vật, không tự học/cấp kỹ năng thiếu. Trang bị bị động/phụ kiện khác chưa được xác nhận trong roster 13 ID, vẫn để native tự hoạt động chứ không giả làm chiêu trực tiếp.
- Chỉ có bằng chứng người chơi chính của KVPV dùng type 4; nếu một đối thủ có native type khác thì lấy status().targetType và log thật, không mở rộng bừa.
- Module combat đo sự kiện damage 1012 đã lọc source / receiver / marker nhưng không ghép từng hit vào lần cast của chính module. `status().observedSkills` thống kê từng đòn trong cùng một mục tiêu; sau ít nhất 2 hit quan sát của từng skill, bộ chọn ưu tiên mức trung bình cao hơn. Các ID tay khởi điểm ưu tiên [8005,8004,8002,8003,8001] dựa profile Boss, **chưa chứng minh mạnh nhất trong PvP**. Khi đổi mục tiêu, bảng học per-skill được xóa để không trộn dữ liệu.

## Kiểm thử
- TEST_PVP_LUOFENG.cjs; TEST_TRUTIEN_PVP.cjs — mô phỏng đã PASS, gồm TH+5 đòn tay xen kẽ, không sửa cooldown, khóa một địch, chuyển mục tiêu thủ công, 3 trợ chiến pet/fuwa/ride (50ms native + self buff), giới hạn PvP target, né skill đối phương, và cleanup.
- Chưa chạy full node test.cjs trong checkout Windows; chưa live test server PvP.
- Trước khi build/merge: tạo .kvpv-live/maintenance.lock, chạy full node test.cjs, và kiểm tra xung đột live. PR #8 vẫn là draft nên không ảnh hưởng main/extension hiện tại.