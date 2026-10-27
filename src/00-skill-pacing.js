// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: CHÚ THÍCH V1 — Điều chỉnh nhịp kỹ năng.
/* CHÚ THÍCH V1 — Điều chỉnh nhịp kỹ năng.
 * Bắt đầu ở 1 ms; đánh giá mỗi 8 mẫu đủ điều kiện, giới hạn đến 500 ms. Chỉ chiêu đã có bằng chứng trúng mới được dùng để điều chỉnh. Đây là nhịp yêu cầu phía trình duyệt.
 * Sửa nguồn tại đây rồi chạy node build.cjs; FULL và bản vá được sinh tự động. */
// [VI dòng gốc 4] Chú thích gốc của tác giả; không được thực thi. Nội dung: Bounded pacing based on completed direct-hit observations, not send counts. [đóng chú thích]
/* Bounded pacing based on completed direct-hit observations, not send counts. */
// [VI dòng gốc 5] chạy ngay hàm bao để tạo phạm vi và khởi tạo phần chức năng bên trong
(() => {
// [VI dòng gốc 6] gán window.KVPV_SKILL_PACING bằng Object.freeze({create(){ // Các mức nhịp yêu cầu có giới hạn; trình duyệt và game vẫn có thể áp dụng thời gian chờ riêng. const steps=[1,5,10,25,50,75,125,200,350,500];let pace=1,c…
  window.KVPV_SKILL_PACING=Object.freeze({create(){
// [VI dòng gốc 7] Chú thích gốc của tác giả; không được thực thi. Nội dung: Các mức nhịp yêu cầu có giới hạn; trình duyệt và game vẫn có thể áp dụng thời gian chờ riêng.
    // Các mức nhịp yêu cầu có giới hạn; trình duyệt và game vẫn có thể áp dụng thời gian chờ riêng.
// [VI dòng gốc 8] Khai báo biến không gán lại bằng const: steps = tạo mảng gồm 10 vị trí: [1,5,10,25,50,75,125,200,350,500] | Khai báo biến có thể gán lại bằng let: pace = 1; context = ""; batch = tạo mảng gồm 0 vị trí: []; changes = 0; accepted = 0; ignored = 0; lastAction = "learning"
    const steps=[1,5,10,25,50,75,125,200,350,500];let pace=1,context='',batch=[],changes=0,accepted=0,ignored=0,lastAction='learning';
// [VI dòng gốc 9] Kết thúc hàm hiện tại và trả về: gọi Object.freeze({ // Đổi Boss/map/trạng thái biến thân thì học lại, không trộn chất lượng mẫu của hai bối cảnh. context(key){if(key!==co…) để khóa thay đổi trực tiếp các thuộc tính của đối tượng ở mức ngoài cùng.
    return Object.freeze({
// [VI dòng gốc 10] Chú thích gốc của tác giả; không được thực thi. Nội dung: Đổi Boss/map/trạng thái biến thân thì học lại, không trộn chất lượng mẫu của hai bối cảnh.
      // Đổi Boss/map/trạng thái biến thân thì học lại, không trộn chất lượng mẫu của hai bối cảnh.
// [VI dòng gốc 11] Kiểm tra key!==context: đúng thì chạy nhánh sau if. | gán context bằng key | gán pace bằng 1 | gán batch bằng []
      context(key){if(key!==context){context=key;pace=1;batch=[];accepted=0;ignored=0;lastAction='new_boss_baseline';}},
// [VI dòng gốc 12] Chú thích gốc của tác giả; không được thực thi. Nội dung: Mẫu chưa đủ điều kiện chỉ tăng bộ đếm bỏ qua; không dùng để kết luận đánh hụt.
      // Mẫu chưa đủ điều kiện chỉ tăng bộ đếm bỏ qua; không dùng để kết luận đánh hụt.
// [VI dòng gốc 13] Kiểm tra !qualified: đúng thì chạy nhánh sau if. | tăng ignored một đơn vị sau khi lấy giá trị | Kết thúc hàm hiện tại mà không trả giá trị cụ thể. | tăng accepted một đơn vị sau khi lấy giá trị
      observe(hit,qualified){if(!qualified){ignored++;return;}accepted++;batch.push(hit===true);
// [VI dòng gốc 14] Kiểm tra batch.length<8: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
        if(batch.length<8)return;
// [VI dòng gốc 15] Khai báo biến không gán lại bằng const: hits = đọc batch.filter(Boolean).length; index = gọi steps.indexOf(pace) | gán batch bằng []
        const hits=batch.filter(Boolean).length,index=steps.indexOf(pace);batch=[];
// [VI dòng gốc 16] Chú thích gốc của tác giả; không được thực thi. Nội dung: Ít nhất 7/8 xác nhận: thử nhanh hơn; tối đa 4/8: chậm lại; khoảng giữa: giữ nhịp.
        // Ít nhất 7/8 xác nhận: thử nhanh hơn; tối đa 4/8: chậm lại; khoảng giữa: giữ nhịp.
// [VI dòng gốc 17] Kiểm tra hits>=7&&index>0: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gán pace bằng steps[index-1] | tăng changes một đơn vị sau khi lấy giá trị | gán lastAction bằng 'faster_after_observed_hits'
        if(hits>=7&&index>0){pace=steps[index-1];changes++;lastAction='faster_after_observed_hits';}
// [VI dòng gốc 18] Kiểm tra hits<=4&&index<steps.length-1: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gán pace bằng steps[index+1] | tăng changes một đơn vị sau khi lấy giá trị | gán lastAction bằng 'slower_after_missing_confirmations'
        else if(hits<=4&&index<steps.length-1){pace=steps[index+1];changes++;lastAction='slower_after_missing_confirmations';}
// [VI dòng gốc 19] gán lastAction bằng 'hold_inconclusive'
        else lastAction='hold_inconclusive';
// [VI dòng gốc 20] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
      },
// [VI dòng gốc 21] Thuộc tính pace: tạo hàm với tham số (không có); mỗi lần gọi trả về pace
      pace:()=>pace,
// [VI dòng gốc 22] Thuộc tính status: tạo hàm với tham số (không có); mỗi lần gọi trả về tạo đối tượng gồm enabled, context, paceMs, minMs, maxMs, batchSize, pendingSamples, acceptedSamples, ignoredSamples, changes, lastAction, note | Thuộc tính enabled: true | Thuộc tính context: dùng biến cùng tên | Thuộc tính paceMs: pace
      status:()=>({enabled:true,context,paceMs:pace,minMs:1,maxMs:500,batchSize:8,pendingSamples:batch.length,
// [VI dòng gốc 23] Thuộc tính acceptedSamples: accepted | Thuộc tính ignoredSamples: ignored | Thuộc tính changes: dùng biến cùng tên | Thuộc tính lastAction: dùng biến cùng tên
        acceptedSamples:accepted,ignoredSamples:ignored,changes,lastAction,
// [VI dòng gốc 24] Thuộc tính note: "Only skills already proven by two direct cast-hit pairs affect tuning. Missing confirmation is not proof of a server rejection."
        note:'Only skills already proven by two direct cast-hit pairs affect tuning. Missing confirmation is not proof of a server rejection.'})
// [VI dòng gốc 25] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    });
// [VI dòng gốc 26] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }});
// [VI dòng gốc 27] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: })();
})();
// [VI dòng gốc 28] Dòng trống để tách các phần, không có lệnh thực thi.
