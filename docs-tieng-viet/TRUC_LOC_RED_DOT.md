# Quần Hùng Trục Lộc qua Red-Dot

Handler nằm trong `esm/modules/01-red-dot-module.mjs` và chỉ được dispatch khi red dot `892` đang hoạt động. Chiếm giữ và đào mỏ không có red dot riêng trong client, nên chúng chỉ được xử lý trong cùng lượt dispatch `892`, không tạo tín hiệu red dot mới.

Thứ tự xử lý:

1. Dùng một lượt chiếm giữ còn sẵn để chọn ô trống thuộc phe mình, nếu đã hoàn tất hướng dẫn và state phe/ô đã được tải.
2. Bắt đầu đào ở thành chính/thành phụ của nhân vật nếu server còn thời gian đào, thành có hố trống và hiện không có mỏ đang đào.
3. Vào thành địch đủ điều kiện bằng native `rqEtScene(7401, mapId)` khi còn lượt khiêu chiến.

Mỗi thao tác chờ state server xác nhận trước khi tiếp tục. Nếu timeout hoặc lỗi gửi, handler không gửi lại trên cùng state. Lượt khiêu chiến chỉ dùng khi red dot `892` active; hồi lượt tự nhiên theo timer client, không mua/hồi lượt. Handler không thu hồi mỏ, không dùng hiệu ứng đào đôi, không gọi thao tác nhận thưởng `895/896`, và không điều khiển combat.
