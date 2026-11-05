// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: Verified Quái Bàn strengthening: native materials only, one acknowledged operation at a time. [đóng chú thích]
/* Verified Quái Bàn strengthening: native materials only, one acknowledged operation at a time. */
// [VI dòng gốc 2] chạy ngay hàm bao để tạo phạm vi và khởi tạo phần chức năng bên trong
(() => {
// [VI dòng gốc 3] "use strict"
 'use strict';
// [VI dòng gốc 4] Khai báo biến không gán lại bằng const: W = window; old = đọc W.KVPV_MONSTER_PLATE; carry = gọi old?._handoff(); chức năng nội bộ chưa xác minh từ tên hàm (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gọi old?.stop() để dừng bộ điều khiển và dọn tài nguyên (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
 const W=window,old=W.KVPV_MONSTER_PLATE,carry=old?._handoff?.();old?.stop?.();
// [VI dòng gốc 5] Khai báo biến không gán lại bằng const: actor = gọi String(W.__KVPV_OWN_ACTOR_ID||'') để chuyển sang chuỗi; S = tạo đối tượng gồm enabled, pending, confirmed
 const actor=String(W.__KVPV_OWN_ACTOR_ID||''),S={enabled:true,pending:carry?.actor===actor?carry.pending:null,confirmed:carry?.actor===actor?carry.confirmed:0};
// [VI dòng gốc 6] Khai báo biến không gán lại bằng const: model = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._Ba?._Lk?._yQ?.instance nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
 const model=()=>W._Ba?._Lk?._yQ?.instance;
// [VI dòng gốc 7] Khai báo biến không gán lại bằng const: level = tạo hàm với tham số t, p | Khai báo biến không gán lại bằng const: n = đọc model()?.getEupByPart?.(t,p)?.[7]?.[3] nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Kết thúc hàm hiện tại và trả về: nếu Number.isSafeInteger(n)&&n>=0 thì lấy n, ngược lại lấy null.
 const level=(t,p)=>{const n=model()?.getEupByPart?.(t,p)?.[7]?.[3];return Number.isSafeInteger(n)&&n>=0?n:null;};
// [VI dòng gốc 8] Định nghĩa hàm plan; tham số: không có
 function plan(){
// [VI dòng gốc 9] Khai báo biến không gán lại bằng const: m = gọi model(); cfg = đọc W._ft?.trgStrongCfg?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); bag = đọc W._Ba?._Ic?._aQ?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); max = gọi Number(m?.openMaxIndex) để chuyển sang số
  const m=model(),cfg=W._ft?.trgStrongCfg?.ins,bag=W._Ba?._Ic?._aQ?.ins,max=Number(m?.openMaxIndex);
// [VI dòng gốc 10] Kiểm tra !Number.isInteger(max)||max<0||max>4: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: null.
  if(!Number.isInteger(max)||max<0||max>4)return null;
// [VI dòng gốc 11] Lặp for: khởi tạo let t=1; tiếp tục khi t<=max+1; sau mỗi vòng t++. | Khai báo biến có thể gán lại bằng let: t = 1 | Lặp for: khởi tạo let p=1; tiếp tục khi p<=8; sau mỗi vòng p++. | Khai báo biến có thể gán lại bằng let: p = 1
  for(let t=1;t<=max+1;t++)for(let p=1;p<=8;p++){
// [VI dòng gốc 12] Khai báo biến không gán lại bằng const: lv = gọi level(t, p) | Kiểm tra lv===null: đúng thì chạy nhánh sau if. | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
   const lv=level(t,p);if(lv===null)continue;
// [VI dòng gốc 13] Khai báo biến không gán lại bằng const: row = gọi cfg?.getCfg(t, p, lv) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); next = gọi cfg?.getCfg(t, p, lv+1) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); cost = gọi cfg?.items(row, lv) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
   const row=cfg?.getCfg?.(t,p,lv),next=cfg?.getCfg?.(t,p,lv+1),cost=cfg?.items?.(row,lv);
// [VI dòng gốc 14] Khai báo biến không gán lại bằng const: id = gọi Number(cost?.[0]) để chuyển sang số; need = gọi Number(cost?.[1]) để chuyển sang số; have = gọi Number(bag?.getItemCountById?.(id)) để chuyển sang số
   const id=Number(cost?.[0]),need=Number(cost?.[1]),have=Number(bag?.getItemCountById?.(id));
// [VI dòng gốc 15] Kiểm tra next&&Number.isSafeInteger(id)&&id>0&&Number.isSafeInteger(need)&&need>0&&have>=need&&m.partCanStrong?.(t,p)===true: đúng thì chạy nhánh sau if.
   if(next&&Number.isSafeInteger(id)&&id>0&&Number.isSafeInteger(need)&&need>0&&have>=need&&m.partCanStrong?.(t,p)===true)
// [VI dòng gốc 16] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm t, p, lv, id, need, signature.
    return {t,p,lv,id,need,signature:JSON.stringify([t,p,lv,id,need,have])};
// [VI dòng gốc 17] Kết thúc hàm hiện tại và trả về: null.
  }return null;
// [VI dòng gốc 18] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
 }
// [VI dòng gốc 19] Định nghĩa hàm probe; tham số: không có
 function probe(){
// [VI dòng gốc 20] Kiểm tra S.pending: đúng thì chạy nhánh sau if. | Khai báo biến không gán lại bằng const: lv = gọi level(S.pending.t, S.pending.p) | Kiểm tra lv!==null&&lv>S.pending.lv: đúng thì chạy nhánh sau if. | gán S.pending bằng null
  if(S.pending){const lv=level(S.pending.t,S.pending.p);if(lv!==null&&lv>S.pending.lv){S.pending=null;S.confirmed++;}}
// [VI dòng gốc 21] Kiểm tra !S.enabled||!actor||actor!==String(W._Ba?._rJ?._O$?.ins?.actorId??'')||W.__KVPV_UNIVERSAL_HALTED||S.pending||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm ready.
  if(!S.enabled||!actor||actor!==String(W._Ba?._rJ?._O$?.ins?.actorId??'')||W.__KVPV_UNIVERSAL_HALTED||S.pending||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0))return {ready:false};
// [VI dòng gốc 22] Khai báo biến không gán lại bằng const: p = gọi plan() | Kết thúc hàm hiện tại và trả về: nếu p thì lấy {ready:typeof W._Ba?._Lk?._Qan?.ins?.strongEquip==='function',...p}, ngược lại lấy {ready:false}.
  const p=plan();return p?{ready:typeof W._Ba?._Lk?._Qan?.ins?.strongEquip==='function',...p}:{ready:false};
// [VI dòng gốc 23] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
 }
// [VI dòng gốc 24] Định nghĩa hàm run; tham số: before | Khai báo biến không gán lại bằng const: p = gọi probe() | Kiểm tra !p.ready||p.signature!==before.signature: đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('Quai Ban native state changed')
 function run(before){const p=probe();if(!p.ready||p.signature!==before.signature)throw Error('Quai Ban native state changed');
// [VI dòng gốc 25] gán S.pending bằng {t:p.t,p:p.p,lv:p.lv} | gọi W._Ba._Lk._Qan.ins.strongEquip(p.t, p.p)
  S.pending={t:p.t,p:p.p,lv:p.lv};W._Ba._Lk._Qan.ins.strongEquip(p.t,p.p);
// [VI dòng gốc 26] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
 }
// [VI dòng gốc 27] Định nghĩa hàm stop; tham số: không có. Mục đích: dừng bộ điều khiển và dọn tài nguyên | gán S.enabled bằng false | gọi W.KVPV_V8?.toggle('monster_plate_strength', false) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
 function stop(){S.enabled=false;W.KVPV_V8?.toggle?.('monster_plate_strength',false);}
// [VI dòng gốc 28] gán W.KVPV_MONSTER_PLATE bằng Object.freeze({probe,run,stop,status:()=>({enabled:S.enabled,pending:S.pending,confirmed:S.confirmed,allowKNB:false}),_handoff:()=>({actor,...S})})
 W.KVPV_MONSTER_PLATE=Object.freeze({probe,run,stop,status:()=>({enabled:S.enabled,pending:S.pending,confirmed:S.confirmed,allowKNB:false}),_handoff:()=>({actor,...S})});
// [VI dòng gốc 29] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | gọi W.KVPV_V8?.register({id:'monster_plate_strength',name:'Cường hóa Quái Bàn',kind:'work',spend:'materials',verified:true,enabled:true,backgrou…) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
 try{W.KVPV_V8?.register?.({id:'monster_plate_strength',name:'Cường hóa Quái Bàn',kind:'work',spend:'materials',verified:true,enabled:true,background:true,directDuringPve:true,redIds:[217,218,219,220,221,228],
// [VI dòng gốc 30] Nhận lỗi bằng e và chạy phần xử lý lỗi. | Kiểm tra !/Trung module ID|already exists/i.test(String(e)): đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: e
  probe:()=>W.KVPV_MONSTER_PLATE.probe(),run:p=>W.KVPV_MONSTER_PLATE.run(p)});}catch(e){if(!/Trung module ID|already exists/i.test(String(e)))throw e;}
// [VI dòng gốc 31] gọi W.KVPV_V8?.toggle('monster_plate_strength', true) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
 W.KVPV_V8?.toggle?.('monster_plate_strength',true);
// [VI dòng gốc 32] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: })();
})();
// [VI dòng gốc 33] Dòng trống để tách các phần, không có lệnh thực thi.
