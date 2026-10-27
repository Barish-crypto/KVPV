// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: Named transformation skills: experimental 10ms CLIENT selection cooldown. [đóng chú thích]
/* Named transformation skills: experimental 10ms CLIENT selection cooldown. */
// [VI dòng gốc 2] chạy ngay hàm bao để tạo phạm vi và khởi tạo phần chức năng bên trong
(() => {
// [VI dòng gốc 3] "use strict"
  'use strict';
// [VI dòng gốc 4] Khai báo biến không gán lại bằng const: W = window; actor = gọi String(W.__KVPV_OWN_ACTOR_ID||'') để chuyển sang chuỗi; old = đọc W.KVPV_TRANSFORM10; carry = gọi old?._handoff(); chức năng nội bộ chưa xác minh từ tên hàm (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gọi old?.stop() để dừng bộ điều khiển và dọn tài nguyên (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Khai báo biến có thể gán lại bằng let: activation = nếu carry?.actor===actor thì lấy carry.activation, ngược lại lấy null; activationReason = "waiting_native_combat"
  const W=window,actor=String(W.__KVPV_OWN_ACTOR_ID||''),old=W.KVPV_TRANSFORM10,carry=old?._handoff?.();old?.stop?.();let activation=carry?.actor===actor?carry.activation:null,activationReason='waiting_native_combat';
// [VI dòng gốc 5] Khai báo biến không gán lại bằng const: kits = gọi Object.freeze({ 'U Tuyền Huyết Ma':['Huyết Ma Đại Pháp','Huyết Ngục Quỷ Thủ','Huyết Khế Tổ Chú','Huyết Ma Hình Phạt'], 'Minh Hà Long V…) để khóa thay đổi trực tiếp các thuộc tính của đối tượng ở mức ngoài cùng
  const kits=Object.freeze({
// [VI dòng gốc 6] Thuộc tính "U Tuyền Huyết Ma": tạo mảng gồm 4 vị trí: ['Huyết Ma Đại Pháp','Huyết Ngục Quỷ Thủ','Huyết Khế Tổ Chú','Huyết Ma Hình Phạt']
    'U Tuyền Huyết Ma':['Huyết Ma Đại Pháp','Huyết Ngục Quỷ Thủ','Huyết Khế Tổ Chú','Huyết Ma Hình Phạt'],
// [VI dòng gốc 7] Thuộc tính "Minh Hà Long Vương": tạo mảng gồm 4 vị trí: ['Ma Long Quyết','Minh Hà Long Trảm','Huyết Lục Trảm','Ma Long Nghịch Lân']
    'Minh Hà Long Vương':['Ma Long Quyết','Minh Hà Long Trảm','Huyết Lục Trảm','Ma Long Nghịch Lân']
// [VI dòng gốc 8] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  });
// [VI dòng gốc 9] Khai báo biến không gán lại bằng const: names = gọi Object.values(kits).flat()
  const names=Object.values(kits).flat();
// [VI dòng gốc 10] Khai báo biến không gán lại bằng const: normalize = tạo hàm với tham số s; mỗi lần gọi trả về gọi String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/Đ/g,'D').toLowerCase().replace(/[^a-z0-9]/g, '')
  const normalize=s=>String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/Đ/g,'D').toLowerCase().replace(/[^a-z0-9]/g,'');
// [VI dòng gốc 11] Khai báo biến không gán lại bằng const: wanted = gọi names.map(normalize) để biến đổi từng phần tử; ready = tạo đối tượng bằng Map() | Khai báo biến có thể gán lại bằng let: enabled = true; cursor = 0; selections = 0; lastError = ""; timer = null; lastForm = ""
  const wanted=names.map(normalize),ready=new Map();let enabled=true,cursor=0,selections=0,lastError='',timer=null,lastForm='';
// [VI dòng gốc 12] Khai báo biến không gán lại bằng const: transformed = tạo hàm với tham số (không có); mỗi lần gọi trả về String(W._Ba?._rJ?._O$?.ins?.actorId??'')===actor&&!W.__KVPV_UNIVERSAL_HALTED và chỉ đánh giá vế phải khi vế trái truthy: Number(W._Ba?._s3?._ZJ?.ins?.curShowId)>0
  const transformed=()=>String(W._Ba?._rJ?._O$?.ins?.actorId??'')===actor&&!W.__KVPV_UNIVERSAL_HALTED&&Number(W._Ba?._s3?._ZJ?.ins?.curShowId)>0;
// [VI dòng gốc 13] Chú thích gốc của tác giả; không được thực thi. Nội dung: Đọc bộ biến thân hiện tại, khớp tên thuộc hai bộ được cho phép và giữ ID native tương ứng.
  // Đọc bộ biến thân hiện tại, khớp tên thuộc hai bộ được cho phép và giữ ID native tương ứng.
// [VI dòng gốc 14] Định nghĩa hàm skills; tham số: không có | Kiểm tra !transformed(): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: tạo mảng gồm 0 vị trí: []. | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài.
  function skills(){if(!transformed())return [];try{
// [VI dòng gốc 15] Chú thích gốc của tác giả; không được thực thi. Nội dung: Đổi hình tượng thì bỏ nhịp chờ và vị trí xoay lượt của bộ trước.
    // Đổi hình tượng thì bỏ nhịp chờ và vị trí xoay lượt của bộ trước.
// [VI dòng gốc 16] Khai báo biến không gán lại bằng const: form = gọi String(W._Ba._s3._ZJ.ins.curShowId) để chuyển sang chuỗi
    const form=String(W._Ba._s3._ZJ.ins.curShowId);
// [VI dòng gốc 17] Kiểm tra form!==lastForm: đúng thì chạy nhánh sau if. | gán lastForm bằng form | gọi ready.clear() | gán cursor bằng 0
    if(form!==lastForm){lastForm=form;ready.clear();cursor=0;}
// [VI dòng gốc 18] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 19] Khai báo biến không gán lại bằng const: model = gọi W._Ba._s3._ZJ.ins.getTransformingSkills() (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const model=W._Ba._s3._ZJ.ins.getTransformingSkills?.();
// [VI dòng gốc 20] Kết thúc hàm hiện tại và trả về: gọi [...(model?.skills||[]),...(model?.comSkills||[])].map(row=>{ const id=Number(row?.[0]);const cfg=W._ft?._nY?.ins?.getCfgBySkillIdAndLv?.(id,1)??W._ft?._nY?.ins?.getCfgById?.(id*10…(x=>Number.isSafeInteger(x.id)&&x.id>0) để giữ phần tử thỏa điều kiện.
    return [...(model?.skills||[]),...(model?.comSkills||[])].map(row=>{
// [VI dòng gốc 21] Khai báo biến không gán lại bằng const: id = gọi Number(row?.[0]) để chuyển sang số | Khai báo biến không gán lại bằng const: cfg = W._ft?._nY?.ins?.getCfgBySkillIdAndLv?.(id,1) hoặc dùng vế phải khi vế trái là null/undefined: W._ft?._nY?.ins?.getCfgById?.(id*10000+1)
      const id=Number(row?.[0]);const cfg=W._ft?._nY?.ins?.getCfgBySkillIdAndLv?.(id,1)??W._ft?._nY?.ins?.getCfgById?.(id*10000+1);
// [VI dòng gốc 22] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm id, name, row.
      return {id,name:String(cfg?.[2]||''),row};
// [VI dòng gốc 23] Định nghĩa hàm hàm không đặt tên; tham số: x
    }).filter(x=>Number.isSafeInteger(x.id)&&x.id>0);
// [VI dòng gốc 24] Nhận lỗi bằng e và chạy phần xử lý lỗi. | gán lastError bằng String(e) | Kết thúc hàm hiện tại và trả về: tạo mảng gồm 0 vị trí: [].
  }catch(e){lastError=String(e);return [];}}
// [VI dòng gốc 25] Khai báo biến không gán lại bằng const: has = tạo hàm với tham số id; mỗi lần gọi trả về gọi skills().some(x=>x.id===Number(id)) để kiểm tra có ít nhất một phần tử thỏa điều kiện
  const has=id=>skills().some(x=>x.id===Number(id));
// [VI dòng gốc 26] Chú thích gốc của tác giả; không được thực thi. Nội dung: Lọc các hàng biến thân được phép, sao chép dữ liệu và xoay lượt chọn trước khi gọi bộ chọn native.
  // Lọc các hàng biến thân được phép, sao chép dữ liệu và xoay lượt chọn trước khi gọi bộ chọn native.
// [VI dòng gốc 27] Định nghĩa hàm select; tham số: native, selector, active, common, mode
  function select(native,selector,active,common,mode){
// [VI dòng gốc 28] Kiểm tra !enabled||mode!==2||!transformed(): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: gọi native.call(selector, active, common, mode).
    if(!enabled||mode!==2||!transformed())return native.call(selector,active,common,mode);
// [VI dòng gốc 29] Khai báo biến không gán lại bằng const: kit = gọi skills(); ids = gọi kit.map(x=>x.id) để biến đổi từng phần tử; offset = nếu ids.length thì lấy cursor%ids.length, ngược lại lấy 0; order = gọi ids.slice(offset).concat(ids.slice(0,offset))
    const kit=skills(),ids=kit.map(x=>x.id),offset=ids.length?cursor%ids.length:0,order=ids.slice(offset).concat(ids.slice(0,offset));
// [VI dòng gốc 30] Chú thích gốc của tác giả; không được thực thi. Nội dung: Chỉ sửa bản sao của hàng kỹ năng; giữ nguyên dữ liệu hồi chiêu native để có thể dừng/khôi phục.
    // Chỉ sửa bản sao của hàng kỹ năng; giữ nguyên dữ liệu hồi chiêu native để có thể dừng/khôi phục.
// [VI dòng gốc 31] Khai báo biến không gán lại bằng const: clone = tạo hàm với tham số rows; mỗi lần gọi trả về gọi (Array.isArray(rows)?rows:[]).filter(row=>ids.includes(Number(row?.[0]))).map(row=>{ const copy=row.slice();copy[1]=ready.get(Number(row[0]))??0;copy[2]=10;return copy; }).sort((a,b)=>order.indexOf(Number(a[0]))-order.indexOf(Number(b[0]))) để sắp xếp mảng tại chỗ
    const clone=rows=>(Array.isArray(rows)?rows:[]).filter(row=>ids.includes(Number(row?.[0]))).map(row=>{
// [VI dòng gốc 32] Khai báo biến không gán lại bằng const: copy = gọi row.slice() để lấy một đoạn dữ liệu | gán copy[1] bằng ready.get(Number(row[0]))??0 | gán copy[2] bằng 10 | Kết thúc hàm hiện tại và trả về: copy.
      const copy=row.slice();copy[1]=ready.get(Number(row[0]))??0;copy[2]=10;return copy;
// [VI dòng gốc 33] Định nghĩa hàm hàm không đặt tên; tham số: a, b
    }).sort((a,b)=>order.indexOf(Number(a[0]))-order.indexOf(Number(b[0])));
// [VI dòng gốc 34] Khai báo biến không gán lại bằng const: a = gọi clone(active); b = gọi clone(common); id = gọi Number(native.call(selector,a,b,mode)) để chuyển sang số
    const a=clone(active),b=clone(common),id=Number(native.call(selector,a,b,mode));
// [VI dòng gốc 35] Kiểm tra ids.includes(id): đúng thì chạy nhánh sau if. | gọi ready.set(id, Date.now()+10) | gán cursor bằng ids.indexOf(id)+1 | tăng selections một đơn vị sau khi lấy giá trị
    if(ids.includes(id)){ready.set(id,Date.now()+10);cursor=ids.indexOf(id)+1;selections++;}
// [VI dòng gốc 36] Kết thúc hàm hiện tại và trả về: id.
    return id;
// [VI dòng gốc 37] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 38] Chú thích gốc của tác giả; không được thực thi. Nội dung: Chỉ tạo một lịch đồng bộ cho bộ biến thân; việc đánh vẫn do bộ combat đang sở hữu quyết định.
  // Chỉ tạo một lịch đồng bộ cho bộ biến thân; việc đánh vẫn do bộ combat đang sở hữu quyết định.
// [VI dòng gốc 39] Định nghĩa hàm activate; tham số: không có | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài.
  function activate(){try{
// [VI dòng gốc 40] Kiểm tra String(W._Ba?._rJ?._O$?.ins?.actorId??'')!==actor||W.__KVPV_UNIVERSAL_HALTED||!enabled: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      if(String(W._Ba?._rJ?._O$?.ins?.actorId??'')!==actor||W.__KVPV_UNIVERSAL_HALTED||!enabled)return;
// [VI dòng gốc 41] Kiểm tra ['THIEN_QUAN','LINH_LUNG','PHU_VAN'].includes(W.KVPV_FAR_SCOPE?.status?.()?.kind)||(W.KVPV_FAR_SCOPE?.inside?.()===true&&W.KVPV_TH300?.isBasicOnly?.()===true): đúng thì chạy nhánh sau if. | gán activationReason bằng 'player_basic8001_only' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      if(['THIEN_QUAN','LINH_LUNG','PHU_VAN'].includes(W.KVPV_FAR_SCOPE?.status?.()?.kind)||(W.KVPV_FAR_SCOPE?.inside?.()===true&&W.KVPV_TH300?.isBasicOnly?.()===true)){activationReason='player_basic8001_only';return;}
// [VI dòng gốc 42] Khai báo biến không gán lại bằng const: m = đọc W._Ba?._s3?._ZJ?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Kiểm tra transformed(): đúng thì chạy nhánh sau if. | gán activation bằng null | gán activationReason bằng 'native_form_active'
      const m=W._Ba?._s3?._ZJ?.ins;if(transformed()){activation=null;activationReason='native_form_active';return;}
// [VI dòng gốc 43] Kiểm tra activation: đúng thì chạy nhánh sau if. | gán activationReason bằng 'waiting_transform_ack_no_retry' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      if(activation){activationReason='waiting_transform_ack_no_retry';return;}
// [VI dòng gốc 44] Khai báo biến không gán lại bằng const: who = đọc W._Ba?._rJ?._O$?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); role = gọi W._C?._Ba?.instance?.getRole(Number(actor)) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); combat = gọi role?.getComponent(W._d?._Yct?._Het) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); id = gọi Number(W._C?._Mn?._Cn?.currentID) để chuyển sang số; type = gọi Number(W._ft?._po?.ins?.…
      const who=W._Ba?._rJ?._O$?.ins,role=W._C?._Ba?.instance?.getRole?.(Number(actor)),combat=role?.getComponent?.(W._d?._Yct?._Het),id=Number(W._C?._Mn?._Cn?.currentID),type=Number(W._ft?._po?.ins?.getCfgById?.(id)?.[7]);
// [VI dòng gốc 45] Kiểm tra [69].includes(type)||([14,71].includes(type)&&Number(W._Ba?._$a?._yo?.ins?.intoSce?.[3])===9)||who?.isDead!==false||combat?.isValidTarget?.()!==true||combat?.isCooldown?.()!==false…: đúng thì chạy nhánh sau if. | gán activationReason bằng 'waiting_native_combat' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      if([69].includes(type)||([14,71].includes(type)&&Number(W._Ba?._$a?._yo?.ins?.intoSce?.[3])===9)||who?.isDead!==false||combat?.isValidTarget?.()!==true||combat?.isCooldown?.()!==false||W.KVPV_DAILY?.quickState?.()?.running!==true||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)){activationReason='waiting_native_combat';return;}
// [VI dòng gốc 46] Kiểm tra W._d?._Yct?._uft?.isFlying===true||role?.getComponent?.(W._d?._Yct?._oft)?.running?.()===true: đúng thì chạy nhánh sau if. | gán activationReason bằng 'waiting_native_movement' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      if(W._d?._Yct?._uft?.isFlying===true||role?.getComponent?.(W._d?._Yct?._oft)?.running?.()===true){activationReason='waiting_native_movement';return;}
// [VI dòng gốc 47] Khai báo biến không gán lại bằng const: need = gọi Number(W._ft?._gY?.ins?.getCfgById?.(92001)?.[2]?.[0]) để chuyển sang số; strength = gọi Number(m?.curStrength) để chuyển sang số; form = gọi Number(m?.curFightShowId) để chuyển sang số
      const need=Number(W._ft?._gY?.ins?.getCfgById?.(92001)?.[2]?.[0]),strength=Number(m?.curStrength),form=Number(m?.curFightShowId);
// [VI dòng gốc 48] Kiểm tra !Number.isFinite(need)||need<=0||!Number.isFinite(strength)||strength<need||!Number.isSafeInteger(form)||form<=0||!m?.huanhuaList?.()?.[form]||m?.sendTrans||W._Ba?._Do?._Ho?.inst?.…: đúng thì chạy nhánh sau if. | gán activationReason bằng 'waiting_owned_form_and_free_strength' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      if(!Number.isFinite(need)||need<=0||!Number.isFinite(strength)||strength<need||!Number.isSafeInteger(form)||form<=0||!m?.huanhuaList?.()?.[form]||m?.sendTrans||W._Ba?._Do?._Ho?.inst?.getFcIsOpen?.(327)!==true){activationReason='waiting_owned_form_and_free_strength';return;}
// [VI dòng gốc 49] Khai báo biến không gán lại bằng const: rpc = đọc W._Ba?._s3?._Kyt?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Kiểm tra typeof rpc?.Transforming!=='function': đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      const rpc=W._Ba?._s3?._Kyt?.ins;if(typeof rpc?.Transforming!=='function')return;
// [VI dòng gốc 50] gán activation bằng {at:Date.now(),form,strength} | gán activationReason bằng 'native_transform_requested' | gọi rpc.Transforming()
      activation={at:Date.now(),form,strength};activationReason='native_transform_requested';rpc.Transforming();
// [VI dòng gốc 51] Nhận lỗi bằng e và chạy phần xử lý lỗi. | gán lastError bằng String(e.message||e) | gán activationReason bằng 'error_no_retry'
    }catch(e){lastError=String(e.message||e);activationReason='error_no_retry';}}
// [VI dòng gốc 52] Định nghĩa hàm schedule; tham số: không có | Khai báo biến không gán lại bằng const: every = W.KVPV_V1?.timers?.setInterval hoặc dùng vế phải khi vế trái là null/undefined: W.setInterval
  function schedule(){const every=W.KVPV_V1?.timers?.setInterval??W.setInterval;
// [VI dòng gốc 53] Kiểm tra timer==null&&typeof every==='function': đúng thì chạy nhánh sau if. | gán timer bằng every(()=>{ activate(); if(enabled&&transformed()&&(W.KVPV_FAR_SCOPE??W.KVPV_TQ_SCOPE)?.inside?.()===true&&W.KVPV_TH300?.status?.(false)?.running)W.KVPV_TH300.sync(); },100)
    if(timer==null&&typeof every==='function')timer=every(()=>{
// [VI dòng gốc 54] gọi activate()
      activate();
// [VI dòng gốc 55] Kiểm tra enabled&&transformed()&&(W.KVPV_FAR_SCOPE??W.KVPV_TQ_SCOPE)?.inside?.()===true&&W.KVPV_TH300?.status?.(false)?.running: đúng thì chạy nhánh sau if. | gọi W.KVPV_TH300.sync()
      if(enabled&&transformed()&&(W.KVPV_FAR_SCOPE??W.KVPV_TQ_SCOPE)?.inside?.()===true&&W.KVPV_TH300?.status?.(false)?.running)W.KVPV_TH300.sync();
// [VI dòng gốc 56] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: },100);
    },100);
// [VI dòng gốc 57] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 58] gán W.KVPV_TRANSFORM10 bằng Object.freeze({has,skills:()=>skills().map(({id,name})=>({id,name})),select,transformed, _handoff:()=>({actor,activation}),start(){enabled=true;schedule();return this.status();},st…
  W.KVPV_TRANSFORM10=Object.freeze({has,skills:()=>skills().map(({id,name})=>({id,name})),select,transformed,
// [VI dòng gốc 59] gán enabled bằng true | gọi schedule() | Kết thúc hàm hiện tại và trả về: gọi this.status() để trả trạng thái để kiểm tra. | gán enabled bằng false
    _handoff:()=>({actor,activation}),start(){enabled=true;schedule();return this.status();},stop(){enabled=false;ready.clear();if(timer!=null){(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(timer);timer=null;}return this.status();},
// [VI dòng gốc 60] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm enabled, activation, activationReason, nativeKitOnly, transformed, clientCooldownMs, selections, skillSource, matchedSkills, lastError, note.
    status(){return {enabled,activation,activationReason,nativeKitOnly:true,transformed:transformed(),clientCooldownMs:10,selections,skillSource:'current_native_model',matchedSkills:this.skills(),lastError,
// [VI dòng gốc 61] Thuộc tính note: "Current native transformation kit only; free strength activation, no purchases. Client cooldown trial; server acceptance unverified. Missing/passive skills are not invented."
      note:'Current native transformation kit only; free strength activation, no purchases. Client cooldown trial; server acceptance unverified. Missing/passive skills are not invented.'};}});
// [VI dòng gốc 62] gọi schedule()
  schedule();
// [VI dòng gốc 63] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: })();
})();
// [VI dòng gốc 64] Dòng trống để tách các phần, không có lệnh thực thi.
