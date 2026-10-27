// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: User-requested finite opening session, only actor 10158939833447 and observed stacks. [đóng chú thích]
/* User-requested finite opening session, only actor 10158939833447 and observed stacks. */
// [VI dòng gốc 2] chạy ngay hàm bao để tạo phạm vi và khởi tạo phần chức năng bên trong
(() => {
// [VI dòng gốc 3] "use strict"
  'use strict';
// [VI dòng gốc 4] Khai báo biến không gán lại bằng const: W = window; actor = "10158939833447"
  const W=window,actor='10158939833447';
// [VI dòng gốc 5] Kiểm tra String(W._Ba?._rJ?._O$?.ins?.actorId)!==actor: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  if(String(W._Ba?._rJ?._O$?.ins?.actorId)!==actor)return;
// [VI dòng gốc 6] Khai báo biến không gán lại bằng const: S = gán khi giá trị hiện tại là null/undefined W.__KVPV_BAG_OPEN_SESSION_20261025 bằng {pending:null,confirmed:0,requests:0,history:[],done:[],reason:'starting'}
  const S=W.__KVPV_BAG_OPEN_SESSION_20261025??={pending:null,confirmed:0,requests:0,history:[],done:[],reason:'starting'};
// [VI dòng gốc 7] gọi W.KVPV_BAG_OPEN_SESSION?.stop() để dừng bộ điều khiển và dọn tài nguyên (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  W.KVPV_BAG_OPEN_SESSION?.stop?.();
// [VI dòng gốc 8] Khai báo biến không gán lại bằng const: targets = tạo mảng gồm 8 vị trí: [ [30910001,'10139231968102',1],[30910002,'10139231968101',1], [30920003,'10139231968100',2],[30230002,'10139231968099',10], [30850010,'10139231968105',1],[30350008,'10139231968103…
  const targets=[
// [VI dòng gốc 9] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng [. Đọc cùng dòng mở phía trên: [30910001,'10139231968102',1],[30910002,'10139231968101',1],
    [30910001,'10139231968102',1],[30910002,'10139231968101',1],
// [VI dòng gốc 10] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng [. Đọc cùng dòng mở phía trên: [30920003,'10139231968100',2],[30230002,'10139231968099',10],
    [30920003,'10139231968100',2],[30230002,'10139231968099',10],
// [VI dòng gốc 11] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng [. Đọc cùng dòng mở phía trên: [30850010,'10139231968105',1],[30350008,'10139231968103',2],
    [30850010,'10139231968105',1],[30350008,'10139231968103',2],
// [VI dòng gốc 12] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng [. Đọc cùng dòng mở phía trên: [30450008,'10139231968104',2],[31040002,'10139231970411',1]
    [30450008,'10139231968104',2],[31040002,'10139231970411',1]
// [VI dòng gốc 13] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  ];
// [VI dòng gốc 14] Khai báo biến có thể gán lại bằng let: timer = null
  let timer=null;
// [VI dòng gốc 15] Định nghĩa hàm tick; tham số: không có. Mục đích: xử lý một nhịp kiểm tra | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài.
  function tick(){try{
// [VI dòng gốc 16] Kiểm tra S.paused: đúng thì chạy nhánh sau if. | gọi stop() để dừng bộ điều khiển và dọn tài nguyên | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(S.paused){stop();return;}
// [VI dòng gốc 17] Kiểm tra String(W._Ba?._rJ?._O$?.ins?.actorId)!==actor||W.__KVPV_UNIVERSAL_HALTED: đúng thì chạy nhánh sau if. | gọi stop() để dừng bộ điều khiển và dọn tài nguyên | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(String(W._Ba?._rJ?._O$?.ins?.actorId)!==actor||W.__KVPV_UNIVERSAL_HALTED){stop();return;}
// [VI dòng gốc 18] Khai báo biến không gán lại bằng const: bag = đọc W._Ba?._Ic?._aQ?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); rows = gọi bag?.getItemsByBagType(0) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const bag=W._Ba?._Ic?._aQ?.ins,rows=bag?.getItemsByBagType?.(0);
// [VI dòng gốc 19] Kiểm tra bag?.isBagInited!==true||!Array.isArray(rows): đúng thì chạy nhánh sau if. | gán S.reason bằng 'waiting_bag' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(bag?.isBagInited!==true||!Array.isArray(rows)){S.reason='waiting_bag';return;}
// [VI dòng gốc 20] Khai báo biến không gán lại bằng const: find = tạo hàm với tham số id, uid; mỗi lần gọi trả về gọi rows.find(r=>r[0]===id&&String(r[2])===uid) để tìm phần tử đầu tiên thỏa điều kiện
    const find=(id,uid)=>rows.find(r=>r[0]===id&&String(r[2])===uid);
// [VI dòng gốc 21] Kiểm tra S.pending: đúng thì chạy nhánh sau if.
    if(S.pending){
// [VI dòng gốc 22] Khai báo biến không gán lại bằng const: p = đọc S.pending; item = gọi find(p.id, p.uid) để tìm phần tử đầu tiên thỏa điều kiện; count = nếu item thì lấy item[1], ngược lại lấy 0
      const p=S.pending,item=find(p.id,p.uid),count=item?item[1]:0;
// [VI dòng gốc 23] Kiểm tra count<p.before: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | cập nhật bằng toán tử += S.confirmed bằng p.before-count | gọi S.history.push({...p,after:count,confirmedAt:Date.now()}) để thêm phần tử vào cuối mảng | gán S.pending bằng null
      if(count<p.before){S.confirmed+=p.before-count;S.history.push({...p,after:count,confirmedAt:Date.now()});S.pending=null;}
// [VI dòng gốc 24] Nhánh else được chạy khi điều kiện if tương ứng không đúng.
      else {
// [VI dòng gốc 25] gán S.reason bằng Date.now()-p.at>10000?'no_inventory_ack_no_retry':'waiting_inventory_ack'
        S.reason=Date.now()-p.at>10000?'no_inventory_ack_no_retry':'waiting_inventory_ack';
// [VI dòng gốc 26] Kiểm tra S.reason==='no_inventory_ack_no_retry': đúng thì chạy nhánh sau if. | gán S.paused bằng true | gọi stop() để dừng bộ điều khiển và dọn tài nguyên
        if(S.reason==='no_inventory_ack_no_retry'){S.paused=true;stop();}
// [VI dòng gốc 27] Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
        return;
// [VI dòng gốc 28] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
      }
// [VI dòng gốc 29] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 30] Kiểm tra W._Ba?._$a?.SceneUtil?.isCommonScene!==true||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0): đúng thì chạy nhánh sau if.
    if(W._Ba?._$a?.SceneUtil?.isCommonScene!==true||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)){
// [VI dòng gốc 31] gán S.reason bằng 'waiting_idle' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      S.reason='waiting_idle';return;
// [VI dòng gốc 32] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 33] Khai báo biến không gán lại bằng const: rpc = đọc W._Ba?._Ic?._oJ?.instance nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); tool = đọc W._Ba?._Ic?.BeiBaoTool nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const rpc=W._Ba?._Ic?._oJ?.instance,tool=W._Ba?._Ic?.BeiBaoTool;
// [VI dòng gốc 34] Kiểm tra typeof rpc?.c2sUseBagItem!=='function'||typeof tool?.checkItemCanUseOrNotice!=='function': đúng thì chạy nhánh sau if. | gán S.reason bằng 'missing_native_api' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(typeof rpc?.c2sUseBagItem!=='function'||typeof tool?.checkItemCanUseOrNotice!=='function'){S.reason='missing_native_api';return;}
// [VI dòng gốc 35] Duyệt từng giá trị trong targets bằng const [id,uid,initial]. | Khai báo biến không gán lại bằng const: [id,uid,initial] (chưa gán giá trị)
    for(const [id,uid,initial] of targets){
// [VI dòng gốc 36] Khai báo biến không gán lại bằng const: key = tính biểu thức id+'/'+uid | Kiểm tra S.done.includes(key): đúng thì chạy nhánh sau if. | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
      const key=id+'/'+uid;if(S.done.includes(key))continue;
// [VI dòng gốc 37] Khai báo biến không gán lại bằng const: item = gọi find(id, uid) để tìm phần tử đầu tiên thỏa điều kiện
      const item=find(id,uid);
// [VI dòng gốc 38] Kiểm tra !item||item[1]<=0: đúng thì chạy nhánh sau if. | gọi S.done.push(key) để thêm phần tử vào cuối mảng | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
      if(!item||item[1]<=0){S.done.push(key);continue;}
// [VI dòng gốc 39] Khai báo biến không gán lại bằng const: spent = gọi S.history.filter(h=>h.id===id&&h.uid===uid).reduce((n,h)=>n+h.before-h.after, 0) để gộp các phần tử thành một kết quả
      const spent=S.history.filter(h=>h.id===id&&h.uid===uid).reduce((n,h)=>n+h.before-h.after,0);
// [VI dòng gốc 40] Kiểm tra spent>=initial: đúng thì chạy nhánh sau if. | gọi S.done.push(key) để thêm phần tử vào cuối mảng | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
      if(spent>=initial){S.done.push(key);continue;}
// [VI dòng gốc 41] Kiểm tra tool.checkItemCanUseOrNotice(item,false)!==true: đúng thì chạy nhánh sau if. | gọi S.done.push(key) để thêm phần tử vào cuối mảng | gọi S.history.push({id,uid,before:item[1],after:item[1],skipped:'native_not_usable'}) để thêm phần tử vào cuối mảng | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
      if(tool.checkItemCanUseOrNotice(item,false)!==true){S.done.push(key);S.history.push({id,uid,before:item[1],after:item[1],skipped:'native_not_usable'});continue;}
// [VI dòng gốc 42] gán S.pending bằng {id,uid,before:item[1],at:Date.now()} | tăng S.requests một đơn vị sau khi lấy giá trị | gán S.reason bằng 'use_requested'
      S.pending={id,uid,before:item[1],at:Date.now()};S.requests++;S.reason='use_requested';
// [VI dòng gốc 43] gọi rpc.c2sUseBagItem(Number(uid), id, 1) | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      rpc.c2sUseBagItem(Number(uid),id,1);return;
// [VI dòng gốc 44] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 45] gán S.reason bằng 'finished' | gọi stop() để dừng bộ điều khiển và dọn tài nguyên
    S.reason='finished';stop();
// [VI dòng gốc 46] Nhận lỗi bằng e và chạy phần xử lý lỗi. | gán S.reason bằng 'error_no_retry' | gán S.error bằng String(e.message) | gọi stop() để dừng bộ điều khiển và dọn tài nguyên
  }catch(e){S.reason='error_no_retry';S.error=String(e.message);stop();}}
// [VI dòng gốc 47] Định nghĩa hàm stop; tham số: không có. Mục đích: dừng bộ điều khiển và dọn tài nguyên | Kiểm tra timer!==null: đúng thì chạy nhánh sau if. | gọi W.clearInterval(timer) để hủy tác vụ lặp | gán timer bằng null
  function stop(){if(timer!==null){W.clearInterval(timer);timer=null;}}
// [VI dòng gốc 48] gán W.KVPV_BAG_OPEN_SESSION bằng Object.freeze({stop,status:()=>({...S,history:S.history.slice(-30)})})
  W.KVPV_BAG_OPEN_SESSION=Object.freeze({stop,status:()=>({...S,history:S.history.slice(-30)})});
// [VI dòng gốc 49] gán timer bằng W.setInterval(tick,1000)
  timer=W.setInterval(tick,1000);
// [VI dòng gốc 50] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: })();
})();
// [VI dòng gốc 51] Dòng trống để tách các phần, không có lệnh thực thi.
