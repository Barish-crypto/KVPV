// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: CHÚ THÍCH V1 — Nhận diện Thiên Quan.
/* CHÚ THÍCH V1 — Nhận diện Thiên Quan.
 * Đối chiếu nhiệm vụ, map và loại Boss của tầng. Map ngoài có thể vẫn báo loại 0 khi đang đánh Thiên Quan; không dùng riêng ID 2011 để kết luận.
 * Sửa nguồn tại đây rồi chạy node build.cjs; FULL và bản vá được sinh tự động. */
// [VI dòng gốc 4] Chú thích gốc của tác giả; không được thực thi. Nội dung: Determine the actual stage map, not just the currently selected monster. [đóng chú thích]
/* Determine the actual stage map, not just the currently selected monster. */
// [VI dòng gốc 5] chạy ngay hàm bao để tạo phạm vi và khởi tạo phần chức năng bên trong
(() => {
// [VI dòng gốc 6] Khai báo biến không gán lại bằng const: W = window
  const W=window;
// [VI dòng gốc 7] Khai báo biến có thể gán lại bằng let: confirmedMap = null
  let confirmedMap=null;
  let lastStageProof=null;
  const PROOF_GRACE_MS=5000;
// [VI dòng gốc 8] Chú thích gốc của tác giả; không được thực thi. Nội dung: Trả trạng thái hiện tại để kiểm tra; ý nghĩa từng bộ đếm thuộc phạm vi module này.
  // Trả trạng thái hiện tại để kiểm tra; ý nghĩa từng bộ đếm thuộc phạm vi module này.
// [VI dòng gốc 9] Định nghĩa hàm status; tham số: không có. Mục đích: trả trạng thái để kiểm tra | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài.
  function status(){try{
// [VI dòng gốc 10] Khai báo biến không gán lại bằng const: model = đọc W._Ba?._Co?._Mo?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const model=W._Ba?._Co?._Mo?.ins;
// [VI dòng gốc 11] Khai báo biến không gán lại bằng const: entry = gọi Number(W._Ba?._$a?._yo?.ins?.intoSce?.[0]) để chuyển sang số
    const entry=Number(W._Ba?._$a?._yo?.ins?.intoSce?.[0]);
// [VI dòng gốc 12] Khai báo biến không gán lại bằng const: live = gọi Number(W._C?._Mn?._Cn?.currentID) để chuyển sang số
    const live=Number(W._C?._Mn?._Cn?.currentID);
// [VI dòng gốc 13] Khai báo biến không gán lại bằng const: current = nếu Number.isFinite(live)&&live>0 thì lấy live, ngược lại lấy entry
    const current=Number.isFinite(live)&&live>0?live:entry;
// [VI dòng gốc 14] Khai báo biến không gán lại bằng const: stageCfg = gọi W._ft?._h$?.ins?.getCfgByLv(model?.curLv) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const stageCfg=W._ft?._h$?.ins?.getCfgByLv?.(model?.curLv);
// [VI dòng gốc 15] Khai báo biến không gán lại bằng const: expected = gọi Number(stageCfg?.[0]) để chuyển sang số
    const expected=Number(stageCfg?.[0]);
// [VI dòng gốc 16] Khai báo biến không gán lại bằng const: type = gọi Number(W._ft?._po?.ins?.getCfgById?.(current)?.[7]) để chuyển sang số
    const type=Number(W._ft?._po?.ins?.getCfgById?.(current)?.[7]);
// [VI dòng gốc 17] Khai báo biến không gán lại bằng const: mission = tính biểu thức W._Ba?._$a?._yo?.ins?.isInMission===true
    const mission=W._Ba?._$a?._yo?.ins?.isInMission===true;
// [VI dòng gốc 18] Chú thích gốc của tác giả; không được thực thi. Nội dung: Observed Tian Quan sessions use these type-35 combat maps even though
    // Observed Tian Quan sessions use these type-35 combat maps even though
// [VI dòng gốc 19] Chú thích gốc của tác giả; không được thực thi. Nội dung: SceneUtil classifies type 35 as common and the stage cfg points to 2011.
    // SceneUtil classifies type 35 as common and the stage cfg points to 2011.
// [VI dòng gốc 20] Chú thích gốc của tác giả; không được thực thi. Nội dung: Require the native mission flag; never treat every common type-35 map as a stage.
    // Require the native mission flag; never treat every common type-35 map as a stage.
// [VI dòng gốc 21] Khai báo biến không gán lại bằng const: observedStageMap = [2992,2995,2996].includes(current) và chỉ đánh giá vế phải khi vế trái truthy: type===35
    const observedStageMap=[2992,2995,2996].includes(current)&&type===35;
// [VI dòng gốc 22] Khai báo biến không gán lại bằng const: actor = gọi String(W.__KVPV_OWN_ACTOR_ID||W._Ba?._rJ?._O$?.ins?.actorId||'') để chuyển sang chuỗi
    const actor=String(W.__KVPV_OWN_ACTOR_ID||W._Ba?._rJ?._O$?.ins?.actorId||'');
// [VI dòng gốc 23] Khai báo biến không gán lại bằng const: world = đọc W._C?._Ba?.instance nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const world=W._C?._Ba?.instance;
// [VI dòng gốc 24] Khai báo biến không gán lại bằng const: role = world?.getRole?.(Number(actor)) hoặc dùng vế phải khi vế trái là null/undefined: world?.getRole?.(actor)
    const role=world?.getRole?.(Number(actor))??world?.getRole?.(actor);
// [VI dòng gốc 25] Khai báo biến không gán lại bằng const: target = đọc role?.getComponent?.(W._d?._Yct?._Het)?.target nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const target=role?.getComponent?.(W._d?._Yct?._Het)?.target;
// [VI dòng gốc 26] Khai báo biến không gán lại bằng const: expectedOcc = gọi Number(stageCfg&&W._ft?._h$?.ins?.occ?.(stageCfg,model?.curLv)) để chuyển sang số
    const expectedOcc=Number(stageCfg&&W._ft?._h$?.ins?.occ?.(stageCfg,model?.curLv));
// [VI dòng gốc 27] Khai báo biến không gán lại bằng const: targetOcc = gọi Number(target?.property?.get?.('occ')) để chuyển sang số
    const targetOcc=Number(target?.property?.get?.('occ'));
// [VI dòng gốc 28] Khai báo biến không gán lại bằng const: stageBossMatches = target?.isValid!==false&&Number(target?.property?.get?.('type'))===1&& expectedOcc>0 và chỉ đánh giá vế phải khi vế trái truthy: targetOcc===expectedOcc
    const stageBossMatches=target?.isValid!==false&&Number(target?.property?.get?.('type'))===1&&
// [VI dòng gốc 29] Tiếp tục hàm status; thành phần cú pháp bắt đầu bằng name. Đọc cùng dòng mở phía trên: expectedOcc>0&&targetOcc===expectedOcc;
      expectedOcc>0&&targetOcc===expectedOcc;
// [VI dòng gốc 30] Chú thích gốc của tác giả; không được thực thi. Nội dung: Chỉ lưu xác nhận trong chính map hiện tại, tránh mang bằng chứng sang map khác.
    // Chỉ lưu xác nhận trong chính map hiện tại, tránh mang bằng chứng sang map khác.
// [VI dòng gốc 31] Kiểm tra confirmedMap!==current: đúng thì chạy nhánh sau if. | gán confirmedMap bằng null
    if(confirmedMap!==current)confirmedMap=null;
    const actorNow=String(W._Ba?._rJ?._O$?.ins?.actorId??'');
    const owned=actorNow!==''&&actorNow===String(W.__KVPV_OWN_ACTOR_ID??'');
    if(lastStageProof&&(lastStageProof.map!==current||lastStageProof.actor!==actorNow||
       lastStageProof.occ!==expectedOcc||!mission))lastStageProof=null;
    if(mission&&owned&&stageBossMatches&&Number.isFinite(current)&&current>0){
      lastStageProof={map:current,actor:actorNow,occ:expectedOcc,at:Date.now()};
    }
    // An explicitly selected different Boss invalidates the proof immediately; only a null native target gets a brief grace.
    if(target&&(!stageBossMatches))lastStageProof=null;
    const briefNativeGap=!target&&!!lastStageProof&&mission&&owned&&Date.now()-lastStageProof.at<=PROOF_GRACE_MS;
// [VI dòng gốc 32] Kiểm tra type===35&&stageBossMatches: đúng thì chạy nhánh sau if. | gán confirmedMap bằng current
    if(type===35&&stageBossMatches)confirmedMap=current;
// [VI dòng gốc 33] Chú thích gốc của tác giả; không được thực thi. Nội dung: Mission battles can expose a type-0 outer map while the selected monster
    // Mission battles can expose a type-0 outer map while the selected monster
// [VI dòng gốc 34] Chú thích gốc của tác giả; không được thực thi. Nội dung: is exactly the stage Boss. Do not reject that native mission evidence.
    // is exactly the stage Boss. Do not reject that native mission evidence.
// [VI dòng gốc 35] Chú thích gốc của tác giả; không được thực thi. Nội dung: Unlike type 35, do not latch common maps after the Boss disappears:
    // Unlike type 35, do not latch common maps after the Boss disappears:
// [VI dòng gốc 36] Chú thích gốc của tác giả; không được thực thi. Nội dung: the native mission flag can remain true after returning to town.
    // the native mission flag can remain true after returning to town.
// [VI dòng gốc 37] Chú thích gốc của tác giả; không được thực thi. Nội dung: Map loại 0 có thể là vỏ ngoài của trận: chỉ nhận diện khi cờ nhiệm vụ và Boss tầng cùng khớp.
    // Map loại 0 có thể là vỏ ngoài của trận: chỉ nhận diện khi cờ nhiệm vụ và Boss tầng cùng khớp.
// [VI dòng gốc 38] Khai báo biến không gán lại bằng const: missionStageBoss = mission&&stageBossMatches và chỉ đánh giá vế phải khi vế trái truthy: type===0||type===1||type===35
    const missionStageBoss=mission&&stageBossMatches&&(type===0||type===1||type===35);
// [VI dòng gốc 39] Khai báo biến không gán lại bằng const: nativeStage = missionStageBoss||(type===35&&stageBossMatches) hoặc dùng vế phải khi vế trái falsy: mission&&confirmedMap===current
    const nativeStage=missionStageBoss||(type===35&&stageBossMatches)||(mission&&confirmedMap===current)||briefNativeGap;
// [VI dòng gốc 40] Khai báo biến không gán lại bằng const: inside = Number.isFinite(current)&&current>0 và chỉ đánh giá vế phải khi vế trái truthy: nativeStage||(mission&&(type===1||observedStageMap))|| (expected>0&&current===expected&&W._Ba?._$a?.SceneUtil?.isCommonScene!==true)
    const inside=Number.isFinite(current)&&current>0&&(nativeStage||(mission&&(type===1||observedStageMap))||
// [VI dòng gốc 41] Tiếp tục hàm status; thành phần cú pháp bắt đầu bằng (. Đọc cùng dòng mở phía trên: (expected>0&&current===expected&&W._Ba?._$a?.SceneUtil?.isCommonScene!==true));
      (expected>0&&current===expected&&W._Ba?._$a?.SceneUtil?.isCommonScene!==true));
// [VI dòng gốc 42] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm inside, current, entry, expected, type, mission, observedStageMap, stageBossMatches, targetOcc, expectedOcc.
    return {inside,current,entry,expected,type,mission,observedStageMap,stageBossMatches,targetOcc,expectedOcc,briefNativeGap,proofAgeMs:lastStageProof?Date.now()-lastStageProof.at:null};
// [VI dòng gốc 43] Nhận lỗi bằng e và chạy phần xử lý lỗi. | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm inside, error.
  }catch(e){return {inside:false,error:String(e)};}}
// [VI dòng gốc 44] gán W.KVPV_TQ_SCOPE bằng Object.freeze({inside:()=>status().inside,status})
  W.KVPV_TQ_SCOPE=Object.freeze({inside:()=>status().inside,status});
// [VI dòng gốc 45] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: })();
})();
// [VI dòng gốc 46] Dòng trống để tách các phần, không có lệnh thực thi.
