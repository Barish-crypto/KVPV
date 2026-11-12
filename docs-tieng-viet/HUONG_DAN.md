# Chú thích trực tiếp trong mã JavaScript

Các file `.js`/`.cjs` gốc đã có chú thích tiếng Việt ngay trước từng dòng có thể chèn comment an toàn. Dấu `// [VI dòng gốc …]` nhận diện phần giải thích tự sinh. Không còn cần mở tài liệu HTML.

Phần giải thích dựa trên cấu trúc JavaScript và các API đã xác định. Với tên native bị rút gọn chưa rõ nghĩa, tài liệu giữ nguyên tên. Đây không phải xác nhận hành vi hoặc quyền hạn của server.

Không chèn comment vào giữa chuỗi nhiều dòng, template hoặc block comment vì sẽ làm đổi dữ liệu. Một dòng có nhiều lệnh được giải thích ngay phía trên cùng dòng đó; đọc cả khối để hiểu đầy đủ luồng xử lý.

## Các chỗ thường sửa

| Chức năng | File gốc |
|---|---|
| Boss Thần Thú acc chính 800 | `src/23-beast-island.js`: tìm `bossLevel=800` |
| Khởi tạo chế độ Thiên Quan, Linh Lung, Phù Văn, Tru Tiên | `src/11-auto-tianquan.js` |
| Đánh thường 8001 và tốc độ hoạt ảnh | `src/08-range-evidence.js` |
| Cấu hình hoạt ảnh acc chính | `src/11-auto-tianquan.js`: tìm `setBasicAnimationSpeed` |
| Ngự Thú theo đòn nhân vật, gồm Tru Tiên | `src/50-companion-combat.js` |
| Lõi Auto Daily | `src/04-engine.js` |
| Daily khi rảnh | `src/58-idle-daily.js` |
| Nhận diện acc và nhịp khi tab ở nền | `src/00-account-policy.js` |
| Bộ đóng gói FULL | `build.cjs` |
| Đồng bộ bản mới | `live/core.cjs`, `edge-addon/native/host.cjs` |
| Extension | `edge-addon/background.js`, `edge-addon/popup.js` |

`setBasicAnimationSpeed(...)` đặt hệ số hoạt ảnh client cho đòn 8001, không đồng nghĩa số đòn trúng hoặc sát thương tăng cùng hệ số. API hiện nhận `1`, `9`, `99` và mức `99999` bạn vừa thêm. Cấu hình được đặt lại khi nạp module và không tự hết hạn sau 5 giây. Áp dụng trong Thiên Quan, Linh Lung Tháp, Phù Văn và Tru Tiên Đại Chiến khi nhân vật đang được phép đánh. Đặt `1` để tắt hệ số hoạt ảnh. Những cổng nhận diện nhân vật, hồi phục và chọn mục tiêu vẫn hoạt động.

Tru Tiên được nhận diện qua cấu hình map native có loại cảnh `52`, entry khớp map hiện tại và không phải cảnh thường. Không chỉ dựa vào tên mục tiêu, không áp dụng lên nhân vật người chơi.

Theo lựa chọn mới nhất của bạn, dòng gọi trên acc chính đang giữ nguyên `99999`, cùng thay đổi cho phép giá trị đó trong API. Chú thích ngay trên dòng gọi đã ghi rõ đây là thay đổi tốc độ phát hoạt ảnh. Bộ chú thích không tự đổi lại các giá trị bạn đã sửa.

## Sửa và đóng gói

Mở PowerShell tại thư mục gốc. Tạo khóa để bộ đồng bộ không nạp code đang sửa dở:

```powershell
Set-Content -LiteralPath '.kvpv-live/maintenance.lock' -Value 'Dang sua code'
```

Sửa file nguồn, sau đó tạo lại bundle:

```powershell
npm run build
```

Sau khi build hoàn tất, bỏ khóa:

```powershell
Remove-Item -LiteralPath '.kvpv-live/maintenance.lock'
```

Các bundle FULL, bản vá, Android userscript và `edge-addon/core.js` được sinh lại từ nguồn. Đừng sửa trực tiếp bundle vì build sẽ ghi đè. Các file HTML cần cho giao diện extension vẫn phải giữ; chỉ bản tài liệu HTML đã được bỏ.

## Cập nhật lại chú thích

Sau khi chỉnh code, muốn tạo lại chú thích trực tiếp:

```powershell
node docs-tieng-viet/generate.cjs --inline
```

Lệnh `--inline` yêu cầu khóa bảo trì, sao lưu từng file trước khi ghi, xác thực cấu trúc/token và chỉ thay phần chú thích tự sinh. Thông tin sao lưu được ghi trong `inline-source-manifest.json`.
