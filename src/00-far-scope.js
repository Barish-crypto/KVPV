// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: Phạm vi đánh Tuyệt Học xa dùng chung cho Thiên Quan và Linh Lung Tháp.
/* Phạm vi đánh Tuyệt Học xa dùng chung cho Thiên Quan và Linh Lung Tháp.
 * Nhận diện tháp bằng map trong cấu hình tầng native và trạng thái đang ở phó bản;
 * không coi cờ nhiệm vụ đơn lẻ hoặc mục tiêu quái bất kỳ là bằng chứng đang ở tháp. */
// [VI dòng gốc 4] chạy ngay hàm bao để tạo phạm vi và khởi tạo phần chức năng bên trong
(() => {
// [VI dòng gốc 5] Khai báo biến không gán lại bằng const: W = window
  const W=window;
  function genericBoss(){return null;}
// [VI dòng gốc 6] Định nghĩa hàm tower; tham số: không có | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài.
  function tower(){try{
// [VI dòng gốc 7] Khai báo biến không gán lại bằng const: entry = đọc W._Ba?._$a?._yo?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); live = gọi Number(W._C?._Mn?._Cn?.currentID) để chuyển sang số
    const entry=W._Ba?._$a?._yo?.ins,live=Number(W._C?._Mn?._Cn?.currentID);
// [VI dòng gốc 8] Khai báo biến không gán lại bằng const: current = nếu Number.isFinite(live)&&live>0 thì lấy live, ngược lại lấy Number(entry?.intoSce?.[0])
    const current=Number.isFinite(live)&&live>0?live:Number(entry?.intoSce?.[0]);
// [VI dòng gốc 9] Khai báo biến không gán lại bằng const: model = đọc W._Ba?._tQ?._$Y?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); progress = gọi Number(model?.finishLevel) để chuyển sang số
    const model=W._Ba?._tQ?._$Y?.ins,progress=Number(model?.finishLevel);
// [VI dòng gốc 10] Khai báo biến không gán lại bằng const: run = gọi W.KVPV_LINHLUNG922?.status(false) để trả trạng thái để kiểm tra (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const run=W.KVPV_LINHLUNG922?.status?.(false);
// [VI dòng gốc 11] Khai báo biến không gán lại bằng const: floors = gọi [run?.pendingFloor,progress+1,progress].map(Number).filter(n=>Number.isSafeInteger(n)&&n>0) để giữ phần tử thỏa điều kiện
    const floors=[run?.pendingFloor,progress+1,progress].map(Number).filter(n=>Number.isSafeInteger(n)&&n>0);
// [VI dòng gốc 12] Khai báo biến có thể gán lại bằng let: floor = null
    let floor=null;
// [VI dòng gốc 13] Duyệt từng giá trị trong floors bằng const n. | Khai báo biến không gán lại bằng const: n (chưa gán giá trị) | Khai báo biến không gán lại bằng const: cfg = gọi W._ft?._u$?.ins?.getCfgByLv(n) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Kiểm tra Number(cfg?.[0])===current: đúng thì chạy nhánh sau if.
    for(const n of floors){const cfg=W._ft?._u$?.ins?.getCfgByLv?.(n);if(Number(cfg?.[0])===current){floor=n;break;}}
// [VI dòng gốc 14] Khai báo biến không gán lại bằng const: inside = floor!==null&&current>0 và chỉ đánh giá vế phải khi vế trái truthy: entry?.isInMission===true||W._Ba?._$a?.SceneUtil?.isCommonScene===false
    const inside=floor!==null&&current>0&&(entry?.isInMission===true||W._Ba?._$a?.SceneUtil?.isCommonScene===false);
// [VI dòng gốc 15] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm inside, current, floor, highestFloor.
    return {inside,current,floor,highestFloor:Number.isFinite(progress)?progress:null};
// [VI dòng gốc 16] Nhận lỗi bằng e và chạy phần xử lý lỗi. | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm inside, error.
  }catch(e){return {inside:false,error:String(e)};}}
// [VI dòng gốc 17] Chú thích gốc của tác giả; không được thực thi. Nội dung: Native RuneDungeon rqEtScene(2201, floor), khác bảng map Linh Lung.
  // Native RuneDungeon rqEtScene(2201, floor), khác bảng map Linh Lung.
// [VI dòng gốc 18] Định nghĩa hàm rune; tham số: không có | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài.
  function rune(){try{
// [VI dòng gốc 19] Khai báo biến không gán lại bằng const: entry = đọc W._Ba?._$a?._yo?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); live = gọi Number(W._C?._Mn?._Cn?.currentID) để chuyển sang số
    const entry=W._Ba?._$a?._yo?.ins,live=Number(W._C?._Mn?._Cn?.currentID);
// [VI dòng gốc 20] Khai báo biến không gán lại bằng const: current = nếu Number.isFinite(live)&&live>0 thì lấy live, ngược lại lấy Number(entry?.intoSce?.[0])
    const current=Number.isFinite(live)&&live>0?live:Number(entry?.intoSce?.[0]);
// [VI dòng gốc 21] Khai báo biến không gán lại bằng const: model = đọc W._Ba?._IH?._ZY?.inst nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const model=W._Ba?._IH?._ZY?.inst;
// [VI dòng gốc 22] Khai báo biến không gán lại bằng const: floor = gọi Number(W.KVPV_RUNE_BOSS?.status?.().pending?.floor??model?.currLv) để chuyển sang số
    const floor=Number(W.KVPV_RUNE_BOSS?.status?.().pending?.floor??model?.currLv);
// [VI dòng gốc 23] Khai báo biến không gán lại bằng const: cfg = gọi W._ft?._wZ?.ins?.getCfgByLv(floor) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const cfg=W._ft?._wZ?.ins?.getCfgByLv?.(floor);
// [VI dòng gốc 24] Chú thích gốc của tác giả; không được thực thi. Nội dung: Tắt bộ tự vào tầng không được tắt nhận diện combat của tầng đã vào thủ công.
    // Tắt bộ tự vào tầng không được tắt nhận diện combat của tầng đã vào thủ công.
// [VI dòng gốc 25] Khai báo biến không gán lại bằng const: inside = current===2201&&Number(entry?.intoSce?.[0])===2201&& Number.isSafeInteger(floor)&&floor>0&&Number(cfg?.[0])===floor và chỉ đánh giá vế phải khi vế trái truthy: entry?.isInMission===true||W._Ba?._$a?.SceneUtil?.isCommonScene===false
    const inside=current===2201&&Number(entry?.intoSce?.[0])===2201&&
// [VI dòng gốc 26] gọi Number.isSafeInteger(floor) | gọi Number(cfg?.[0]) để chuyển sang số
      Number.isSafeInteger(floor)&&floor>0&&Number(cfg?.[0])===floor&&
// [VI dòng gốc 27] Tiếp tục hàm rune; thành phần cú pháp bắt đầu bằng (. Đọc cùng dòng mở phía trên: (entry?.isInMission===true||W._Ba?._$a?.SceneUtil?.isCommonScene===false);
      (entry?.isInMission===true||W._Ba?._$a?.SceneUtil?.isCommonScene===false);
// [VI dòng gốc 28] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm inside, current, floor, highestFloor.
    return {inside,current,floor,highestFloor:Number(model?.finishLv)};
// [VI dòng gốc 29] Nhận lỗi bằng e và chạy phần xử lý lỗi. | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm inside, error.
  }catch(e){return {inside:false,error:String(e)};}}
// [VI dòng gốc 30] Chú thích gốc của tác giả; không được thực thi. Nội dung: Tru Tiên Đại Chiến được native xác định bằng loại cảnh 52, không đoán theo tên Boss.
  // Tru Tiên Đại Chiến được native xác định bằng loại cảnh 52, không đoán theo tên Boss.
// [VI dòng gốc 31] Định nghĩa hàm truTien; tham số: không có | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài.
  function truTien(){try{
// [VI dòng gốc 32] Khai báo biến không gán lại bằng const: entry = đọc W._Ba?._$a?._yo?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); live = gọi Number(W._C?._Mn?._Cn?.currentID) để chuyển sang số; current = nếu Number.isFinite(live)&&live>0 thì lấy live, ngược lại lấy Number(entry?.intoSce?.[0])
    const entry=W._Ba?._$a?._yo?.ins,live=Number(W._C?._Mn?._Cn?.currentID),current=Number.isFinite(live)&&live>0?live:Number(entry?.intoSce?.[0]);
// [VI dòng gốc 33] Khai báo biến không gán lại bằng const: cfg = gọi W._ft?._po?.ins?.getCfgById(current) để tra cấu hình theo ID bằng API client (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); type = gọi Number(cfg?.[7]) để chuyển sang số
    const cfg=W._ft?._po?.ins?.getCfgById?.(current),type=Number(cfg?.[7]);
// [VI dòng gốc 34] Khai báo biến không gán lại bằng const: inside = current>0&&Number(entry?.intoSce?.[0])===current&&type===52 và chỉ đánh giá vế phải khi vế trái truthy: W._Ba?._$a?.SceneUtil?.isCommonScene===false
    const inside=current>0&&Number(entry?.intoSce?.[0])===current&&type===52&&W._Ba?._$a?.SceneUtil?.isCommonScene===false;
// [VI dòng gốc 35] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm inside, current, floor, type.
    return {inside,current,floor:Number(entry?.intoSce?.[3])||null,type};
// [VI dòng gốc 36] Nhận lỗi bằng e và chạy phần xử lý lỗi. | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm inside, error.
  }catch(e){return {inside:false,error:String(e)};}}
// [VI dòng gốc 37] Định nghĩa hàm status; tham số: không có. Mục đích: trả trạng thái để kiểm tra | Khai báo biến không gán lại bằng const: ll = gọi tower()
  function status(){const ll=tower();
// [VI dòng gốc 38] Kiểm tra ll.inside&&W.KVPV_LINHLUNG_TH?.enabled!==false: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm các thuộc tính của ll, kind.
    if(ll.inside&&W.KVPV_LINHLUNG_TH?.enabled!==false)return {...ll,kind:'LINH_LUNG'};
// [VI dòng gốc 39] Khai báo biến không gán lại bằng const: rv = gọi rune() | Kiểm tra rv.inside: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm các thuộc tính của rv, kind.
    const rv=rune();if(rv.inside)return {...rv,kind:'PHU_VAN'};
// [VI dòng gốc 40] Khai báo biến không gán lại bằng const: tt = gọi truTien() | Kiểm tra tt.inside: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm các thuộc tính của tt, kind.
    const tt=truTien();if(tt.inside)return {...tt,kind:'TRU_TIEN'};
// [VI dòng gốc 41] Khai báo biến không gán lại bằng const: tq = gọi W.KVPV_TQ_SCOPE?.status() để trả trạng thái để kiểm tra (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm các thuộc tính của tq, inside, kind.
    const tq=W.KVPV_TQ_SCOPE?.status?.();if(tq?.inside)return {...tq,inside:true,kind:'THIEN_QUAN'};
    return genericBoss()??{...tq,inside:false,kind:'OUTSIDE'};
// [VI dòng gốc 42] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 43] Định nghĩa hàm eligible; tham số: target | Kiểm tra !target||target.isValid===false||Number(target.property?.get?.('type'))!==1: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: false.
  function eligible(target){if(!target||target.isValid===false||Number(target.property?.get?.('type'))!==1)return false;
// [VI dòng gốc 44] Khai báo biến không gán lại bằng const: hp = gọi target.property?.get('hp') (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Kiểm tra Array.isArray(hp)&&Number(hp[0])<=0: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: false.
    const hp=target.property?.get?.('hp');if(Array.isArray(hp)&&Number(hp[0])<=0)return false;
// [VI dòng gốc 45] Khai báo biến không gán lại bằng const: s = gọi status() để trả trạng thái để kiểm tra | Kiểm tra !s.inside: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: false.
    const s=status();if(!s.inside)return false;
    if(s.kind==='ALL_BOSS'){const candidate=genericBoss(target);return candidate!==null&&candidate.bossId===s.bossId&&candidate.occ===s.occ;}
// [VI dòng gốc 46] Chú thích gốc của tác giả; không được thực thi. Nội dung: Trong map tháp đã xác minh, dùng đúng quái native hiện được chọn; không đoán Boss bằng tên.
    // Trong map tháp đã xác minh, dùng đúng quái native hiện được chọn; không đoán Boss bằng tên.
// [VI dòng gốc 47] Kiểm tra ['LINH_LUNG','PHU_VAN','TRU_TIEN'].includes(s.kind): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: true.
    if(['LINH_LUNG','PHU_VAN','TRU_TIEN'].includes(s.kind))return true;
// [VI dòng gốc 48] Khai báo biến không gán lại bằng const: lv = đọc W._Ba?._Co?._Mo?.ins?.curLv nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); cfg = gọi W._ft?._h$?.ins?.getCfgByLv(lv) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const lv=W._Ba?._Co?._Mo?.ins?.curLv,cfg=W._ft?._h$?.ins?.getCfgByLv?.(lv);
// [VI dòng gốc 49] Khai báo biến không gán lại bằng const: expected = gọi Number(cfg&&W._ft?._h$?.ins?.occ?.(cfg,lv)) để chuyển sang số
    const expected=Number(cfg&&W._ft?._h$?.ins?.occ?.(cfg,lv));
// [VI dòng gốc 50] Kết thúc hàm hiện tại và trả về: expected>0 và chỉ đánh giá vế phải khi vế trái truthy: Number(target.property?.get?.('occ'))===expected.
    return expected>0&&Number(target.property?.get?.('occ'))===expected;
// [VI dòng gốc 51] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 52] gán W.KVPV_FAR_SCOPE bằng Object.freeze({status,tower,rune,truTien,inside:()=>status().inside,eligible})
  W.KVPV_FAR_SCOPE=Object.freeze({status,tower,rune,truTien,inside:()=>status().inside,eligible,genericBoss,setAllBosses(){return status();}});
// [VI dòng gốc 53] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: })();
})();
// [VI dòng gốc 54] Dòng trống để tách các phần, không có lệnh thực thi.
