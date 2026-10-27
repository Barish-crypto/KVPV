// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: Native progression for character equipment, mounts and pets.
/* Native progression for character equipment, mounts and pets.
 * Shared parallel dispatcher; a single module pending latch prevents duplicate sends.
 * Server level/EXP acknowledges progress; pending survives hot reload.
 * Illusions activate or upgrade with owned materials; timed renewals remain manual.
 * Legacy feed senders are suspended only after their pending work drains. */
// [VI dòng gốc 6] chạy ngay hàm bao để tạo phạm vi và khởi tạo phần chức năng bên trong
(() => {
// [VI dòng gốc 7] "use strict"
  'use strict';
// [VI dòng gốc 8] Khai báo biến không gán lại bằng const: W = window; old = đọc W.KVPV_APPEARANCE_AUTO; carry = gọi old?._handoff(); chức năng nội bộ chưa xác minh từ tên hàm (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gọi old?.stop('reload') để dừng bộ điều khiển và dọn tài nguyên (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  const W=window,old=W.KVPV_APPEARANCE_AUTO,carry=old?._handoff?.();old?.stop?.('reload');
// [VI dòng gốc 9] Khai báo biến không gán lại bằng const: actor = gọi String(W.__KVPV_OWN_ACTOR_ID||'') để chuyển sang chuỗi; same = tính biểu thức carry?.actor===actor
  const actor=String(W.__KVPV_OWN_ACTOR_ID||''),same=carry?.actor===actor;
// [VI dòng gốc 10] Khai báo biến không gán lại bằng const: S = tạo đối tượng gồm enabled, timer, pending, saved, savedPet, savedMount, requests, confirmed, reason, lastError, registered, lastMountRefresh
  const S={enabled:true,timer:null,pending:same?carry.pending:null,saved:same?carry.saved:null,savedPet:same?(carry.savedPet??null):null,savedMount:same?(carry.savedMount??null):null,
// [VI dòng gốc 11] Thuộc tính requests: nếu same thì lấy carry.requests, ngược lại lấy 0 | Thuộc tính confirmed: nếu same thì lấy carry.confirmed, ngược lại lấy 0 | Thuộc tính reason: "waiting" | Thuộc tính lastError: ""
    requests:same?carry.requests:0,confirmed:same?carry.confirmed:0,reason:'waiting',lastError:'',registered:false,lastMountRefresh:-Infinity};
// [VI dòng gốc 12] Khai báo biến không gán lại bằng const: definitions = tạo mảng gồm 8 vị trí: [ {key:'weapon',label:'Thần Binh',level:()=>W._Ba?._M4?._HJ?.inst?.otherValue?.['Tăng cấp'], cfg:n=>W._ft?._r$?.ins?.getShengjiCfgByLv?.(n),rpc:()=>W._Ba?._M4?._j6t?.inst,method:'f…
  const definitions=[
// [VI dòng gốc 13] Thuộc tính key: "weapon" | Thuộc tính label: "Thần Binh" | Thuộc tính level: tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._Ba?._M4?._HJ?.inst?.otherValue?.['Tăng cấp'] nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    {key:'weapon',label:'Thần Binh',level:()=>W._Ba?._M4?._HJ?.inst?.otherValue?.['Tăng cấp'],
// [VI dòng gốc 14] Thuộc tính cfg: tạo hàm với tham số n; mỗi lần gọi trả về gọi W._ft?._r$?.ins?.getShengjiCfgByLv(n) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Thuộc tính rpc: tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._Ba?._M4?._j6t?.inst nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Thuộc tính method: "fdShbing"
      cfg:n=>W._ft?._r$?.ins?.getShengjiCfgByLv?.(n),rpc:()=>W._Ba?._M4?._j6t?.inst,method:'fdShbing'},
// [VI dòng gốc 15] Thuộc tính key: "wing" | Thuộc tính label: "Linh Dực" | Thuộc tính level: tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._Ba?._RJ?._DJ?.ins?.otherValue?.['Tăng cấp'] nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    {key:'wing',label:'Linh Dực',level:()=>W._Ba?._RJ?._DJ?.ins?.otherValue?.['Tăng cấp'],
// [VI dòng gốc 16] Thuộc tính cfg: tạo hàm với tham số n; mỗi lần gọi trả về gọi W._ft?._PZ?.ins?.getShengjiCfgByLv(n) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Thuộc tính rpc: tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._Ba?._RJ?._R6t?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Thuộc tính method: "feedSb"
      cfg:n=>W._ft?._PZ?.ins?.getShengjiCfgByLv?.(n),rpc:()=>W._Ba?._RJ?._R6t?.ins,method:'feedSb'},
// [VI dòng gốc 17] Thuộc tính key: "fashion" | Thuộc tính label: "Thời Trang" | Thuộc tính level: tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._Ba?._KJ?._qJ?.inst?.fashInfo?.[0] nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    {key:'fashion',label:'Thời Trang',level:()=>W._Ba?._KJ?._qJ?.inst?.fashInfo?.[0],
// [VI dòng gốc 18] Thuộc tính cfg: tạo hàm với tham số n; mỗi lần gọi trả về gọi W._ft?._Iqt?.ins?.getCfgByLevel(n) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Thuộc tính rpc: tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._Ba?._KJ?._Ejt?.inst nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Thuộc tính method: "fdFash"
      cfg:n=>W._ft?._Iqt?.ins?.getCfgByLevel?.(n),rpc:()=>W._Ba?._KJ?._Ejt?.inst,method:'fdFash'},
// [VI dòng gốc 19] Thuộc tính key: "arm" | Thuộc tính label: "Linh Tí" | Thuộc tính level: tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._Ba?._UJ?._XJ?.ins?.handInfo?.[0] nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    {key:'arm',label:'Linh Tí',level:()=>W._Ba?._UJ?._XJ?.ins?.handInfo?.[0],
// [VI dòng gốc 20] Thuộc tính cfg: tạo hàm với tham số n; mỗi lần gọi trả về gọi W._ft?._BKt?.ins?.getCfgByLevel(n) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Thuộc tính rpc: tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._Ba?._UJ?._Ujt?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Thuộc tính method: "feedHand"
      cfg:n=>W._ft?._BKt?.ins?.getCfgByLevel?.(n),rpc:()=>W._Ba?._UJ?._Ujt?.ins,method:'feedHand'},
// [VI dòng gốc 21] Thuộc tính key: "cloak" | Thuộc tính label: "Tăng cấp Phi Phong" | Thuộc tính level: tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._Ba?._JJ?._QJ?.inst?.otherValue?.['Tăng cấp'] nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    {key:'cloak',label:'Tăng cấp Phi Phong',level:()=>W._Ba?._JJ?._QJ?.inst?.otherValue?.['Tăng cấp'],
// [VI dòng gốc 22] Thuộc tính cfg: tạo hàm với tham số n; mỗi lần gọi trả về gọi W._ft?._o$?.ins?.getShengjiCfgByLv(n) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Thuộc tính rpc: tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._Ba?._JJ?._Oun?.inst nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Thuộc tính method: "fdShbing"
      cfg:n=>W._ft?._o$?.ins?.getShengjiCfgByLv?.(n),rpc:()=>W._Ba?._JJ?._Oun?.inst,method:'fdShbing'},
// [VI dòng gốc 23] Thuộc tính key: "jewelry" | Thuộc tính label: "Tăng cấp Trang Sức" | Thuộc tính level: tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._Ba?.__W?._$J?.inst?.hlInfo?.[0] nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Thuộc tính exp: tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._Ba?.__W?._$J?.inst?.hlInfo?.[1] nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    {key:'jewelry',label:'Tăng cấp Trang Sức',level:()=>W._Ba?.__W?._$J?.inst?.hlInfo?.[0],exp:()=>W._Ba?.__W?._$J?.inst?.hlInfo?.[1],
// [VI dòng gốc 24] Khai báo biến không gán lại bằng const: c = đọc W._ft?._gY?.ins?.getCfgById?.(242001)?.[2] nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Kết thúc hàm hiện tại và trả về: nếu c thì lấy [c[0],1,c[1]], ngược lại lấy null.
      cfg:n=>W._ft?._CBn?.ins?.getCfgByLevel?.(n),cost:()=>{const c=W._ft?._gY?.ins?.getCfgById?.(242001)?.[2];return c?[c[0],1,c[1]]:null;},
// [VI dòng gốc 25] Thuộc tính rpc: tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._Ba?.__W?._Kon?.inst nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Thuộc tính method: "fdHl"
      rpc:()=>W._Ba?.__W?._Kon?.inst,method:'fdHl'},
// [VI dòng gốc 26] Thuộc tính key: "transform" | Thuộc tính label: "Tăng cấp Biến Thân" | Thuộc tính level: tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._Ba?._s3?._ZJ?.ins?.feed?.[0] nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    {key:'transform',label:'Tăng cấp Biến Thân',level:()=>W._Ba?._s3?._ZJ?.ins?.feed?.[0],
// [VI dòng gốc 27] Thuộc tính exp: tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._Ba?._s3?._ZJ?.ins?.feed?.[1] nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Thuộc tính costIndex: 2 | Thuộc tính typeZero: true
      exp:()=>W._Ba?._s3?._ZJ?.ins?.feed?.[1],costIndex:2,typeZero:true,
// [VI dòng gốc 28] Thuộc tính cfg: tạo hàm với tham số n; mỗi lần gọi trả về gọi W._ft?._Tyt?.ins?.getFeedCfgByLv(n) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Thuộc tính rpc: tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._Ba?._s3?._Kyt?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Thuộc tính method: "onTransformingUpgradeReq"
      cfg:n=>W._ft?._Tyt?.ins?.getFeedCfgByLv?.(n),rpc:()=>W._Ba?._s3?._Kyt?.ins,method:'onTransformingUpgradeReq'},
// [VI dòng gốc 29] Thuộc tính key: "mount" | Thuộc tính label: "Bồi dưỡng Thú Cưỡi" | Thuộc tính level: tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._Ba?._YJ?._WJ?.ins?.feed?.[0] nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    {key:'mount',label:'Bồi dưỡng Thú Cưỡi',level:()=>W._Ba?._YJ?._WJ?.ins?.feed?.[0],
// [VI dòng gốc 30] Thuộc tính exp: tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._Ba?._YJ?._WJ?.ins?.feed?.[1] nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Thuộc tính costIndex: 2
      exp:()=>W._Ba?._YJ?._WJ?.ins?.feed?.[1],costIndex:2,
// [VI dòng gốc 31] Thuộc tính cfg: tạo hàm với tham số n; mỗi lần gọi trả về gọi W._ft?.__qt?.ins?.getPetFeedCfgByLv(n) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Thuộc tính rpc: tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._Ba?._YJ?._bgt?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Thuộc tính method: "feedRide"
      cfg:n=>W._ft?.__qt?.ins?.getPetFeedCfgByLv?.(n),rpc:()=>W._Ba?._YJ?._bgt?.ins,method:'feedRide'}
// [VI dòng gốc 32] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  ];
// [VI dòng gốc 33] gọi definitions.push({key:'weapon_illusion',label:'Ảo Hóa Thần Binh',illusion:true,model:()=>W._Ba?._M4?._HJ?.inst, list:m=>m?.hhuaLst,cfg:(i…) để thêm phần tử vào cuối mảng
  definitions.push(
// [VI dòng gốc 34] Thuộc tính key: "weapon_illusion" | Thuộc tính label: "Ảo Hóa Thần Binh" | Thuộc tính illusion: true | Thuộc tính model: tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._Ba?._M4?._HJ?.inst nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    {key:'weapon_illusion',label:'Ảo Hóa Thần Binh',illusion:true,model:()=>W._Ba?._M4?._HJ?.inst,
// [VI dòng gốc 35] Thuộc tính list: tạo hàm với tham số m; mỗi lần gọi trả về đọc m?.hhuaLst nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Thuộc tính cfg: tạo hàm với tham số id, lv; mỗi lần gọi trả về gọi W._ft?._r$?.ins?.getHuanhuaCfgByIdAndLev(id, lv) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Thuộc tính rpc: tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._Ba?._M4?._j6t?.inst nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Thuộc tính method: "mgcLv"
      list:m=>m?.hhuaLst,cfg:(id,lv)=>W._ft?._r$?.ins?.getHuanhuaCfgByIdAndLev?.(id,lv),rpc:()=>W._Ba?._M4?._j6t?.inst,method:'mgcLv'},
// [VI dòng gốc 36] Thuộc tính key: "wing_illusion" | Thuộc tính label: "Ảo Hóa Linh Dực" | Thuộc tính illusion: true | Thuộc tính model: tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._Ba?._RJ?._DJ?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    {key:'wing_illusion',label:'Ảo Hóa Linh Dực',illusion:true,model:()=>W._Ba?._RJ?._DJ?.ins,
// [VI dòng gốc 37] Thuộc tính list: tạo hàm với tham số m; mỗi lần gọi trả về đọc m?.huanhuaLs nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Thuộc tính cfg: tạo hàm với tham số id, lv; mỗi lần gọi trả về gọi W._ft?._PZ?.ins?.getHuanhuaCfgByIdAndLv(id, lv) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Thuộc tính rpc: tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._Ba?._RJ?._R6t?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Thuộc tính method: "magicLev"
      list:m=>m?.huanhuaLs,cfg:(id,lv)=>W._ft?._PZ?.ins?.getHuanhuaCfgByIdAndLv?.(id,lv),rpc:()=>W._Ba?._RJ?._R6t?.ins,method:'magicLev'},
// [VI dòng gốc 38] Thuộc tính key: "weapon_skill" | Thuộc tính label: "Kỹ năng Thần Binh" | Thuộc tính skill: true | Thuộc tính feed: true
    {key:'weapon_skill',label:'Kỹ năng Thần Binh',skill:true,feed:true,model:()=>W._Ba?._M4?._HJ?.inst,list:m=>m?.skillLst,rpc:()=>W._Ba?._M4?._j6t?.inst,method:'skillLv'},
// [VI dòng gốc 39] Thuộc tính key: "wing_skill" | Thuộc tính label: "Kỹ năng Linh Dực" | Thuộc tính skill: true | Thuộc tính feed: true
    {key:'wing_skill',label:'Kỹ năng Linh Dực',skill:true,feed:true,model:()=>W._Ba?._RJ?._DJ?.ins,list:m=>m?.skillLs,rpc:()=>W._Ba?._RJ?._R6t?.ins,method:'skillLev'},
// [VI dòng gốc 40] Thuộc tính key: "fashion_skill" | Thuộc tính label: "Kỹ năng Thời Trang" | Thuộc tính skill: true | Thuộc tính model: tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._Ba?._KJ?._qJ?.inst nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    {key:'fashion_skill',label:'Kỹ năng Thời Trang',skill:true,model:()=>W._Ba?._KJ?._qJ?.inst,list:m=>m?.fashInfo?.[1],rpc:()=>W._Ba?._KJ?._Ejt?.inst,method:'addFashSkillLvl',scalar:true},
// [VI dòng gốc 41] Thuộc tính key: "arm_skill" | Thuộc tính label: "Kỹ năng Linh Tí" | Thuộc tính skill: true | Thuộc tính model: tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._Ba?._UJ?._XJ?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    {key:'arm_skill',label:'Kỹ năng Linh Tí',skill:true,model:()=>W._Ba?._UJ?._XJ?.ins,list:m=>m?.handInfo?.[1],rpc:()=>W._Ba?._UJ?._Ujt?.ins,method:'addHandSkillLev',scalar:true},
// [VI dòng gốc 42] Thuộc tính key: "mount_skill" | Thuộc tính label: "Kỹ năng Thú Cưỡi" | Thuộc tính skill: true | Thuộc tính model: tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._Ba?._YJ?._WJ?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    {key:'mount_skill',label:'Kỹ năng Thú Cưỡi',skill:true,model:()=>W._Ba?._YJ?._WJ?.ins,list:m=>m?.feed?.[2],rpc:()=>W._Ba?._YJ?._bgt?.ins,method:'addRideSkillLevel',mountSkill:true},
// [VI dòng gốc 43] Thuộc tính key: "pet_skill" | Thuộc tính label: "Kỹ năng Linh Thú" | Thuộc tính skill: true | Thuộc tính model: tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._Ba?._OJ?._GJ?.inst nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    {key:'pet_skill',label:'Kỹ năng Linh Thú',skill:true,model:()=>W._Ba?._OJ?._GJ?.inst,list:m=>m?.fdSkills,rpc:()=>W._Ba?._OJ?._VBn?.inst,method:'skillUp',mountSkill:true},
// [VI dòng gốc 44] Thuộc tính key: "transform_skill" | Thuộc tính label: "Kỹ năng Biến Thân" | Thuộc tính skill: true | Thuộc tính model: tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._Ba?._s3?._ZJ?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    {key:'transform_skill',label:'Kỹ năng Biến Thân',skill:true,model:()=>W._Ba?._s3?._ZJ?.ins,list:m=>m?.feed?.[3],rpc:()=>W._Ba?._s3?._Kyt?.ins,method:'onTransformingUpgradeReq',typeFirst:true});
// [VI dòng gốc 45] Lặp for: khởi tạo let type=0; tiếp tục khi type<4; sau mỗi vòng type++. | Khai báo biến có thể gán lại bằng let: type = 0 | gọi definitions.push({key:'weapon_soul_'+type,label:'Phụ Hồn Thần Binh '+(type+1),soulType:type,requireActorLevel:true,costIndex:2, level:()=…) để thêm phần tử vào cuối mảng
  for(let type=0;type<4;type++)definitions.push({key:'weapon_soul_'+type,label:'Phụ Hồn Thần Binh '+(type+1),soulType:type,requireActorLevel:true,costIndex:2,
// [VI dòng gốc 46] Khai báo biến không gán lại bằng const: m = đọc W._Ba?._M4?._HJ?.inst nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Kết thúc hàm hiện tại và trả về: nếu typeof m?.getFhunLstByType==='function'&&m._kat thì lấy m.getFhunLstByType(type)?.[1]??0, ngược lại lấy undefined.
    level:()=>{const m=W._Ba?._M4?._HJ?.inst;return typeof m?.getFhunLstByType==='function'&&m._kat?m.getFhunLstByType(type)?.[1]??0:undefined;},
// [VI dòng gốc 47] Thuộc tính cfg: tạo hàm với tham số n; mỗi lần gọi trả về gọi W._ft?._r$?.ins?.getFuhunCfgByTypeAndLev(type, n) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Thuộc tính rpc: tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._Ba?._M4?._j6t?.inst nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Thuộc tính method: "refLv"
    cfg:n=>W._ft?._r$?.ins?.getFuhunCfgByTypeAndLev?.(type,n),rpc:()=>W._Ba?._M4?._j6t?.inst,method:'refLv'});
// [VI dòng gốc 48] Duyệt từng giá trị trong ['wing','fashion','arm'] bằng const group. | Khai báo biến không gán lại bằng const: group (chưa gán giá trị) | Lặp for: khởi tạo let type=0; tiếp tục khi type<4; sau mỗi vòng type++. | Khai báo biến có thể gán lại bằng let: type = 0
  for(const group of ['wing','fashion','arm'])for(let type=0;type<4;type++){
// [VI dòng gốc 49] Khai báo biến không gán lại bằng const: wing = tính biểu thức group==='wing'; fashion = tính biểu thức group==='fashion'
    const wing=group==='wing',fashion=group==='fashion';
// [VI dòng gốc 50] Khai báo biến không gán lại bằng const: model = tạo hàm với tham số (không có); mỗi lần gọi trả về nếu wing thì lấy W._Ba?._RJ?._DJ?.ins, ngược lại lấy fashion?W._Ba?._KJ?._qJ?.inst:W._Ba?._UJ?._XJ?.ins
    const model=()=>wing?W._Ba?._RJ?._DJ?.ins:fashion?W._Ba?._KJ?._qJ?.inst:W._Ba?._UJ?._XJ?.ins;
// [VI dòng gốc 51] gọi definitions.push({key:group+'_soul_'+type,label:'Phụ Hồn '+({wing:'Linh Dực',fashion:'Thời Trang',arm:'Linh Tí'}[group])+' '+(type+1), so…) để thêm phần tử vào cuối mảng
    definitions.push({key:group+'_soul_'+type,label:'Phụ Hồn '+({wing:'Linh Dực',fashion:'Thời Trang',arm:'Linh Tí'}[group])+' '+(type+1),
// [VI dòng gốc 52] Thuộc tính soulType: type | Thuộc tính requireActorLevel: true | Thuộc tính costIndex: 2
      soulType:type,requireActorLevel:true,costIndex:2,
// [VI dòng gốc 53] Khai báo biến không gán lại bằng const: m = gọi model() | Kiểm tra wing: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: nếu m?._kat&&typeof m.getFuhunLsByType==='function' thì lấy m.getFuhunLsByType(type)?.[1]??0, ngược lại lấy undefined.
      level:()=>{const m=model();if(wing)return m?._kat&&typeof m.getFuhunLsByType==='function'?m.getFuhunLsByType(type)?.[1]??0:undefined;
// [VI dòng gốc 54] Khai báo biến không gán lại bằng const: rows = đọc (fashion?m?.fashInfo:m?.handInfo)?.[7] nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Kết thúc hàm hiện tại và trả về: gọi soulLevel(rows, type).
        const rows=(fashion?m?.fashInfo:m?.handInfo)?.[7];return soulLevel(rows,type);},
// [VI dòng gốc 55] Thuộc tính cfg: tạo hàm với tham số n; mỗi lần gọi trả về nếu wing thì lấy W._ft?._PZ?.ins?.getFuhunCfgByTypeAndLev?.(type,n), ngược lại lấy (fashion?W._ft?._Hqt?.ins:W._ft?._IKt?.ins)?.getCfgByTypeAndLv?.(type,n)
      cfg:n=>wing?W._ft?._PZ?.ins?.getFuhunCfgByTypeAndLev?.(type,n):(fashion?W._ft?._Hqt?.ins:W._ft?._IKt?.ins)?.getCfgByTypeAndLv?.(type,n),
// [VI dòng gốc 56] Thuộc tính rpc: tạo hàm với tham số (không có); mỗi lần gọi trả về nếu wing thì lấy W._Ba?._RJ?._R6t?.ins, ngược lại lấy fashion?W._Ba?._KJ?._Ejt?.inst:W._Ba?._UJ?._Ujt?.ins
      rpc:()=>wing?W._Ba?._RJ?._R6t?.ins:fashion?W._Ba?._KJ?._Ejt?.inst:W._Ba?._UJ?._Ujt?.ins,
// [VI dòng gốc 57] Thuộc tính method: nếu wing thì lấy 'refineLev', ngược lại lấy fashion?'addFashRefine':'addHandRefine'
      method:wing?'refineLev':fashion?'addFashRefine':'addHandRefine'});
// [VI dòng gốc 58] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 59] Duyệt từng giá trị trong ['jewelry','cloak'] bằng const group. | Khai báo biến không gán lại bằng const: group (chưa gán giá trị) | Lặp for: khởi tạo let type=0; tiếp tục khi type<4; sau mỗi vòng type++. | Khai báo biến có thể gán lại bằng let: type = 0
  for(const group of ['jewelry','cloak'])for(let type=0;type<4;type++){
// [VI dòng gốc 60] Khai báo biến không gán lại bằng const: cloak = tính biểu thức group==='cloak'; model = tạo hàm với tham số (không có); mỗi lần gọi trả về nếu cloak thì lấy W._Ba?._JJ?._QJ?.inst, ngược lại lấy W._Ba?.__W?._$J?.inst
    const cloak=group==='cloak',model=()=>cloak?W._Ba?._JJ?._QJ?.inst:W._Ba?.__W?._$J?.inst;
// [VI dòng gốc 61] gọi definitions.push({key:group+'_soul_'+type,label:'Phụ Hồn '+(cloak?'Phi Phong':'Trang Sức')+' '+(type+1),soulType:type,requireActorLevel:t…) để thêm phần tử vào cuối mảng
    definitions.push({key:group+'_soul_'+type,label:'Phụ Hồn '+(cloak?'Phi Phong':'Trang Sức')+' '+(type+1),soulType:type,requireActorLevel:true,costIndex:2,
// [VI dòng gốc 62] Khai báo biến không gán lại bằng const: m = gọi model() | Kiểm tra cloak: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: nếu m?._kat&&typeof m.getFhunLstByType==='function' thì lấy m.getFhunLstByType(type)?.[1]??0, ngược lại lấy undefined.
      level:()=>{const m=model();if(cloak)return m?._kat&&typeof m.getFhunLstByType==='function'?m.getFhunLstByType(type)?.[1]??0:undefined;
// [VI dòng gốc 63] Khai báo biến không gán lại bằng const: rows = đọc m?.hlInfo?.[8] nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Kết thúc hàm hiện tại và trả về: gọi soulLevel(rows, type).
        const rows=m?.hlInfo?.[8];return soulLevel(rows,type);},
// [VI dòng gốc 64] Thuộc tính cfg: tạo hàm với tham số n; mỗi lần gọi trả về nếu cloak thì lấy W._ft?._o$?.ins?.getFuhunCfgByTypeAndLev?.(type,n), ngược lại lấy W._ft?._pLi?.ins?.getCfgByTypeAndLv?.(type,n)
      cfg:n=>cloak?W._ft?._o$?.ins?.getFuhunCfgByTypeAndLev?.(type,n):W._ft?._pLi?.ins?.getCfgByTypeAndLv?.(type,n),
// [VI dòng gốc 65] Thuộc tính rpc: tạo hàm với tham số (không có); mỗi lần gọi trả về nếu cloak thì lấy W._Ba?._JJ?._Oun?.inst, ngược lại lấy W._Ba?.__W?._Kon?.inst | Thuộc tính method: nếu cloak thì lấy 'refLv', ngược lại lấy 'addHlRefine'
      rpc:()=>cloak?W._Ba?._JJ?._Oun?.inst:W._Ba?.__W?._Kon?.inst,method:cloak?'refLv':'addHlRefine'});
// [VI dòng gốc 66] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 67] gọi definitions.push({key:'cloak_skill',label:'Kỹ năng Phi Phong',skill:true,model:()=>W._Ba?._JJ?._QJ?.inst,list:m=>m?.skillLst,rpc:()=>W._B…) để thêm phần tử vào cuối mảng
  definitions.push(
// [VI dòng gốc 68] Thuộc tính key: "cloak_skill" | Thuộc tính label: "Kỹ năng Phi Phong" | Thuộc tính skill: true | Thuộc tính model: tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._Ba?._JJ?._QJ?.inst nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    {key:'cloak_skill',label:'Kỹ năng Phi Phong',skill:true,model:()=>W._Ba?._JJ?._QJ?.inst,list:m=>m?.skillLst,rpc:()=>W._Ba?._JJ?._Oun?.inst,method:'skillLv'},
// [VI dòng gốc 69] Thuộc tính key: "jewelry_skill" | Thuộc tính label: "Kỹ năng Trang Sức" | Thuộc tính skill: true | Thuộc tính model: tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._Ba?.__W?._$J?.inst nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    {key:'jewelry_skill',label:'Kỹ năng Trang Sức',skill:true,model:()=>W._Ba?.__W?._$J?.inst,list:m=>m?.hlInfo?.[2],rpc:()=>W._Ba?.__W?._Kon?.inst,method:'addHlSkillLv',scalar:true});
// [VI dòng gốc 70] Định nghĩa hàm arrayIllusions; tham số: rows | Kết thúc hàm hiện tại và trả về: nếu Array.isArray(rows) thì lấy {keys:rows.map(r=>r[0]),get:id=>rows.find(r=>Number(r?.[0])===Number(id))}, ngược lại lấy null.
  function arrayIllusions(rows){return Array.isArray(rows)?{keys:rows.map(r=>r[0]),get:id=>rows.find(r=>Number(r?.[0])===Number(id))}:null;}
// [VI dòng gốc 71] Duyệt từng giá trị trong definitions.filter(d=>d.illusion) bằng const d. | Khai báo biến không gán lại bằng const: d (chưa gán giá trị)
  for(const d of definitions.filter(d=>d.illusion)){
// [VI dòng gốc 72] Khai báo biến không gán lại bằng const: wing = tính biểu thức d.key==='wing_illusion' | gán d.ids bằng ()=>{const c=wing?W._ft?._PZ?.ins:W._ft?._r$?.ins;return c?.getHuanhuaShowIds?.()??c?.getShowIds?.()??[];} | Khai báo biến không gán lại bằng const: c = nếu wing thì lấy W._ft?._PZ?.ins, ngược lại lấy W._ft?._r$?.ins | Kết thúc hàm hiện tại và trả về: c?.getHuanhuaShowIds?.()??c?.getShowIds?.() hoặc dùng vế phải khi vế trái là null/undefined: [].
    const wing=d.key==='wing_illusion';d.ids=()=>{const c=wing?W._ft?._PZ?.ins:W._ft?._r$?.ins;return c?.getHuanhuaShowIds?.()??c?.getShowIds?.()??[];};
// [VI dòng gốc 73] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 74] Duyệt từng giá trị trong ['fashion','arm','jewelry','cloak'] bằng const group. | Khai báo biến không gán lại bằng const: group (chưa gán giá trị)
  for(const group of ['fashion','arm','jewelry','cloak']){
// [VI dòng gốc 75] Khai báo biến không gán lại bằng const: fashion = tính biểu thức group==='fashion'; arm = tính biểu thức group==='arm'; jewelry = tính biểu thức group==='jewelry'
    const fashion=group==='fashion',arm=group==='arm',jewelry=group==='jewelry';
// [VI dòng gốc 76] Khai báo biến không gán lại bằng const: config = tạo hàm với tham số (không có); mỗi lần gọi trả về nếu fashion thì lấy W._ft?._Eqt?.ins, ngược lại lấy arm?W._ft?._VKt?.ins:jewelry?W._ft?._iSn?.ins:W._ft?._o$?.ins
    const config=()=>fashion?W._ft?._Eqt?.ins:arm?W._ft?._VKt?.ins:jewelry?W._ft?._iSn?.ins:W._ft?._o$?.ins;
// [VI dòng gốc 77] Khai báo biến không gán lại bằng const: model = tạo hàm với tham số (không có); mỗi lần gọi trả về nếu fashion thì lấy W._Ba?._KJ?._qJ?.inst, ngược lại lấy arm?W._Ba?._UJ?._XJ?.ins:jewelry?W._Ba?.__W?._$J?.inst:W._Ba?._JJ?._QJ?.inst
    const model=()=>fashion?W._Ba?._KJ?._qJ?.inst:arm?W._Ba?._UJ?._XJ?.ins:jewelry?W._Ba?.__W?._$J?.inst:W._Ba?._JJ?._QJ?.inst;
// [VI dòng gốc 78] gọi definitions.push({key:group+'_illusion',label:'Ảo Hóa '+({fashion:'Thời Trang',arm:'Linh Tí',jewelry:'Trang Sức',cloak:'Phi Phong'}[group…) để thêm phần tử vào cuối mảng
    definitions.push({key:group+'_illusion',label:'Ảo Hóa '+({fashion:'Thời Trang',arm:'Linh Tí',jewelry:'Trang Sức',cloak:'Phi Phong'}[group]),illusion:true,model,
// [VI dòng gốc 79] Thuộc tính list: tạo hàm với tham số m; mỗi lần gọi trả về nếu fashion thì lấy arrayIllusions(m?.fashInfo?.[4]), ngược lại lấy arm?arrayIllusions(m?.handInfo?.[4]):jewelry?arrayIllusions(m?.hlInfo?.[5]):m?.hhuaLst
      list:m=>fashion?arrayIllusions(m?.fashInfo?.[4]):arm?arrayIllusions(m?.handInfo?.[4]):jewelry?arrayIllusions(m?.hlInfo?.[5]):m?.hhuaLst,
// [VI dòng gốc 80] Thuộc tính ids: tạo hàm với tham số (không có); mỗi lần gọi trả về config()?.getShowIds?.()??config()?.getHuanhuaShowIds?.() hoặc dùng vế phải khi vế trái là null/undefined: []
      ids:()=>config()?.getShowIds?.()??config()?.getHuanhuaShowIds?.()??[],
// [VI dòng gốc 81] Thuộc tính cfg: tạo hàm với tham số id, lv; mỗi lần gọi trả về nếu jewelry thì lấy config()?.getCfgByIdAndLv?.(id,lv), ngược lại lấy fashion||arm?config()?.getCfgByShowIdAndLevel?.(id,lv):config()?.getHuanhuaCfgByIdAndLev?.(id,lv)
      cfg:(id,lv)=>jewelry?config()?.getCfgByIdAndLv?.(id,lv):fashion||arm?config()?.getCfgByShowIdAndLevel?.(id,lv):config()?.getHuanhuaCfgByIdAndLev?.(id,lv),
// [VI dòng gốc 82] Khai báo biến không gán lại bằng const: c = gọi model()?.getActLst(row) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Kết thúc hàm hiện tại và trả về: nếu c thì lấy [c], ngược lại lấy [].
      costs:fashion?row=>{const c=model()?.getActLst?.(row);return c?[c]:[];}:null,
// [VI dòng gốc 83] Thuộc tính rpc: tạo hàm với tham số (không có); mỗi lần gọi trả về nếu fashion thì lấy W._Ba?._KJ?._Ejt?.inst, ngược lại lấy arm?W._Ba?._UJ?._Ujt?.ins:jewelry?W._Ba?.__W?._Kon?.inst:W._Ba?._JJ?._Oun?.inst
      rpc:()=>fashion?W._Ba?._KJ?._Ejt?.inst:arm?W._Ba?._UJ?._Ujt?.ins:jewelry?W._Ba?.__W?._Kon?.inst:W._Ba?._JJ?._Oun?.inst,
// [VI dòng gốc 84] Thuộc tính method: nếu fashion thì lấy 'addFashMgcShow', ngược lại lấy arm?'addHandMagShow':jewelry?'addHlMgcShow':'mgcLv' | Thuộc tính scalar: fashion||arm hoặc dùng vế phải khi vế trái falsy: jewelry
      method:fashion?'addFashMgcShow':arm?'addHandMagShow':jewelry?'addHlMgcShow':'mgcLv',scalar:fashion||arm||jewelry});
// [VI dòng gốc 85] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 86] gọi definitions.push({key:'pet',label:'Bồi dưỡng Linh Thú',level:()=>W._Ba?._OJ?._GJ?.inst?.fd?.[0],exp:()=>W._Ba?._OJ?._GJ?.inst?.fd?.[1],co…) để thêm phần tử vào cuối mảng
  definitions.push({key:'pet',label:'Bồi dưỡng Linh Thú',level:()=>W._Ba?._OJ?._GJ?.inst?.fd?.[0],exp:()=>W._Ba?._OJ?._GJ?.inst?.fd?.[1],costIndex:2,
// [VI dòng gốc 87] Thuộc tính cfg: tạo hàm với tham số n; mỗi lần gọi trả về gọi W._ft?._XZ?.ins?.getPetFeedCfgByLv(n) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Thuộc tính rpc: tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._Ba?._OJ?._VBn?.inst nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Thuộc tính method: "fdPet"
    cfg:n=>W._ft?._XZ?.ins?.getPetFeedCfgByLv?.(n),rpc:()=>W._Ba?._OJ?._VBn?.inst,method:'fdPet'});
// [VI dòng gốc 88] Duyệt từng giá trị trong [false,true] bằng const pet. | Khai báo biến không gán lại bằng const: pet (chưa gán giá trị)
  for(const pet of [false,true]){
// [VI dòng gốc 89] Khai báo biến không gán lại bằng const: prefix = nếu pet thì lấy 'pet', ngược lại lấy 'mount'; model = tạo hàm với tham số (không có); mỗi lần gọi trả về nếu pet thì lấy W._Ba?._OJ?._GJ?.inst, ngược lại lấy W._Ba?._YJ?._WJ?.ins
    const prefix=pet?'pet':'mount',model=()=>pet?W._Ba?._OJ?._GJ?.inst:W._Ba?._YJ?._WJ?.ins;
// [VI dòng gốc 90] Khai báo biến không gán lại bằng const: rpc = tạo hàm với tham số (không có); mỗi lần gọi trả về nếu pet thì lấy W._Ba?._OJ?._VBn?.inst, ngược lại lấy W._Ba?._YJ?._bgt?.ins
    const rpc=()=>pet?W._Ba?._OJ?._VBn?.inst:W._Ba?._YJ?._bgt?.ins;
// [VI dòng gốc 91] gọi definitions.push({key:prefix+'_rank',label:'Tiến cấp '+(pet?'Linh Thú':'Thú Cưỡi'),level:()=>model()?.rank?.[0],exp:()=>model()?.rank?.[1…) để thêm phần tử vào cuối mảng
    definitions.push({key:prefix+'_rank',label:'Tiến cấp '+(pet?'Linh Thú':'Thú Cưỡi'),level:()=>model()?.rank?.[0],exp:()=>model()?.rank?.[1],costIndex:2,
// [VI dòng gốc 92] Thuộc tính allowed: tạo hàm với tham số (không có); mỗi lần gọi trả về nếu pet thì lấy model()?._bolZD===false, ngược lại lấy model()?.bollZiDong===false
      allowed:()=>pet?model()?._bolZD===false:model()?.bollZiDong===false,
// [VI dòng gốc 93] Thuộc tính cfg: tạo hàm với tham số n; mỗi lần gọi trả về gọi (pet?W._ft?._nqt?.ins:W._ft?._lDt?.ins)?.getPetRankCfgBySt(n) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Thuộc tính rpc: dùng biến cùng tên | Thuộc tính method: nếu pet thì lấy 'rankPet', ngược lại lấy 'rankRide'
      cfg:n=>(pet?W._ft?._nqt?.ins:W._ft?._lDt?.ins)?.getPetRankCfgBySt?.(n),rpc,method:pet?'rankPet':'rankRide'});
// [VI dòng gốc 94] Lặp for: khởi tạo let type=0; tiếp tục khi type<4; sau mỗi vòng type++. | Khai báo biến có thể gán lại bằng let: type = 0 | gọi definitions.push({key:prefix+'_refine_'+type,label:'Tu luyện '+(pet?'Linh Thú':'Thú Cưỡi')+' '+(type+1),soulType:type,requireActorLevel:t…) để thêm phần tử vào cuối mảng
    for(let type=0;type<4;type++)definitions.push({key:prefix+'_refine_'+type,label:'Tu luyện '+(pet?'Linh Thú':'Thú Cưỡi')+' '+(type+1),soulType:type,requireActorLevel:true,costIndex:2,
// [VI dòng gốc 95] Khai báo biến không gán lại bằng const: rows = đọc (pet?model()?._ref:model()?.refine)?.[0] nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Kết thúc hàm hiện tại và trả về: gọi soulLevel(rows, type).
      level:()=>{const rows=(pet?model()?._ref:model()?.refine)?.[0];return soulLevel(rows,type);},
// [VI dòng gốc 96] Thuộc tính cfg: tạo hàm với tham số n; mỗi lần gọi trả về gọi (pet?W._ft?._UZ?.ins:W._ft?._vqt?.ins)?.getCfgByTypeAndLv(type, n) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Thuộc tính rpc: dùng biến cùng tên | Thuộc tính method: nếu pet thì lấy 'riseRefet', ngược lại lấy 'riseRideRefine'
      cfg:n=>(pet?W._ft?._UZ?.ins:W._ft?._vqt?.ins)?.getCfgByTypeAndLv?.(type,n),rpc,method:pet?'riseRefet':'riseRideRefine'});
// [VI dòng gốc 97] Duyệt từng giá trị trong [false,true] bằng const formation. | Khai báo biến không gán lại bằng const: formation (chưa gán giá trị)
    for(const formation of [false,true]){
// [VI dòng gốc 98] Khai báo biến không gán lại bằng const: cfg = tạo hàm với tham số (không có); mỗi lần gọi trả về nếu formation thì lấy pet?W._ft?._FZ?.ins:W._ft?._RZ?.ins, ngược lại lấy pet?W._ft?._GZ?.ins:W._ft?._HZ?.ins
      const cfg=()=>formation?(pet?W._ft?._FZ?.ins:W._ft?._RZ?.ins):(pet?W._ft?._GZ?.ins:W._ft?._HZ?.ins);
// [VI dòng gốc 99] gọi definitions.push({key:prefix+(formation?'_formation':'_illusion'),label:(formation?'Pháp trận ':'Ảo Hóa ')+(pet?'Linh Thú':'Thú Cưỡi'),il…) để thêm phần tử vào cuối mảng
      definitions.push({key:prefix+(formation?'_formation':'_illusion'),label:(formation?'Pháp trận ':'Ảo Hóa ')+(pet?'Linh Thú':'Thú Cưỡi'),illusion:true,model,
// [VI dòng gốc 100] Thuộc tính list: tạo hàm với tham số m; mỗi lần gọi trả về nếu formation thì lấy pet?m?.hhuaLst:m?.huanhuaList, ngược lại lấy arrayIllusions((pet?m?.mgcShow:m?.magicShow)?.[0])
        list:m=>formation?(pet?m?.hhuaLst:m?.huanhuaList):arrayIllusions((pet?m?.mgcShow:m?.magicShow)?.[0]),
// [VI dòng gốc 101] Thuộc tính ids: tạo hàm với tham số (không có); mỗi lần gọi trả về cfg()?.getShowIds?.()??cfg()?.getHuanhuaShowIds?.() hoặc dùng vế phải khi vế trái là null/undefined: [] | Thuộc tính cfg: tạo hàm với tham số id, lv; mỗi lần gọi trả về nếu formation thì lấy cfg()?.getHuanhuaCfgByIdAndLev?.(id,lv), ngược lại lấy cfg()?.getCfgByIdAndLv?.(id,lv)
        ids:()=>cfg()?.getShowIds?.()??cfg()?.getHuanhuaShowIds?.()??[],cfg:(id,lv)=>formation?cfg()?.getHuanhuaCfgByIdAndLev?.(id,lv):cfg()?.getCfgByIdAndLv?.(id,lv),
// [VI dòng gốc 102] Thuộc tính rpc: tạo hàm với tham số (không có); mỗi lần gọi trả về nếu formation thì lấy rpc(), ngược lại lấy W._Ba?._ogt?._Cqt?.inst | Thuộc tính method: nếu formation thì lấy pet?'mgcLv':'magicLev', ngược lại lấy pet?'riseMgcShow':'riseRideMgcShow' | Thuộc tính scalar: formation
        rpc:()=>formation?rpc():W._Ba?._ogt?._Cqt?.inst,method:formation?(pet?'mgcLv':'magicLev'):(pet?'riseMgcShow':'riseRideMgcShow'),scalar:formation});
// [VI dòng gốc 103] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 104] gọi definitions.push({key:prefix+'_rank_skill',label:'Kỹ năng Tiến cấp '+(pet?'Linh Thú':'Thú Cưỡi'),skill:true,model,list:m=>pet?m?.upSkills…) để thêm phần tử vào cuối mảng
    definitions.push({key:prefix+'_rank_skill',label:'Kỹ năng Tiến cấp '+(pet?'Linh Thú':'Thú Cưỡi'),skill:true,model,list:m=>pet?m?.upSkills:m?.rank?.[3],rpc,
// [VI dòng gốc 105] Thuộc tính method: nếu pet thì lấy 'skillUp', ngược lại lấy 'addRideSkillLevel' | Thuộc tính mountSkill: true | Thuộc tính skillType: 2
      method:pet?'skillUp':'addRideSkillLevel',mountSkill:true,skillType:2});
// [VI dòng gốc 106] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 107] Định nghĩa hàm soulLevel; tham số: rows, type
  function soulLevel(rows,type){
// [VI dòng gốc 108] Kết thúc hàm hiện tại và trả về: nếu Array.isArray(rows) thì lấy rows.find(row=>row?.[0]===type)?.[1]??0, ngược lại lấy undefined.
    return Array.isArray(rows)?rows.find(row=>row?.[0]===type)?.[1]??0:undefined;
// [VI dòng gốc 109] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 110] Định nghĩa hàm skillRows; tham số: d | Khai báo biến không gán lại bằng const: m = gọi d.model(); list = gọi d.list(m); rows = nếu Array.isArray(list) thì lấy list, ngược lại lấy (list?.keys??[]).slice(0,100).map(id=>list.get(id)) | Kết thúc hàm hiện tại và trả về: gọi [...(d.feed&&Array.isArray(m?.feedSkills)?m.feedSkills:[]),...rows].slice(0, 100) để lấy một đoạn dữ liệu.
  function skillRows(d){const m=d.model(),list=d.list(m),rows=Array.isArray(list)?list:(list?.keys??[]).slice(0,100).map(id=>list.get(id));return [...(d.feed&&Array.isArray(m?.feedSkills)?m.feedSkills:[]),...rows].slice(0,100);}
// [VI dòng gốc 111] Định nghĩa hàm skillLevel; tham số: d, id | Khai báo biến không gán lại bằng const: base = đọc W._et?._KQ nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Kết thúc hàm hiện tại và trả về: đọc skillRows(d).find(r=>Number(r?.[0])===id||typeof base==='function'&&base(r?.[0])===base(id))?.[1] nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại).
  function skillLevel(d,id){const base=W._et?._KQ;return skillRows(d).find(r=>Number(r?.[0])===id||typeof base==='function'&&base(r?.[0])===base(id))?.[1];}
// [VI dòng gốc 112] Định nghĩa hàm skill; tham số: d
  function skill(d){
// [VI dòng gốc 113] Duyệt từng giá trị trong skillRows(d) bằng const row. | Khai báo biến không gán lại bằng const: row (chưa gán giá trị) | Khai báo biến không gán lại bằng const: id = gọi Number(row?.[0]) để chuyển sang số; level = gọi Number(row?.[1]) để chuyển sang số
    for(const row of skillRows(d)){const id=Number(row?.[0]),level=Number(row?.[1]);
// [VI dòng gốc 114] Kiểm tra !Number.isSafeInteger(Number(id))||Number(id)<=0||!Number.isSafeInteger(level)||level<0||Number(row?.[2])<=0||!Number.isFinite(Number(row?.[2]))||typeof d.rpc()?.[d.method]!=='func…: đúng thì chạy nhánh sau if. | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
      if(!Number.isSafeInteger(Number(id))||Number(id)<=0||!Number.isSafeInteger(level)||level<0||Number(row?.[2])<=0||!Number.isFinite(Number(row?.[2]))||typeof d.rpc()?.[d.method]!=='function')continue;
// [VI dòng gốc 115] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm key, label, id, level, ready, signature.
      return {key:d.key,label:d.label,id:Number(id),level,ready:true,signature:JSON.stringify([id,level,row[2]])};
// [VI dòng gốc 116] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm key, label, ready.
    }return {key:d.key,label:d.label,ready:false};
// [VI dòng gốc 117] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 118] Định nghĩa hàm illusion; tham số: d | Khai báo biến không gán lại bằng const: list = gọi d.list(d.model()); bag = đọc W._Ba?._Ic?._aQ?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  function illusion(d){const list=d.list(d.model()),bag=W._Ba?._Ic?._aQ?.ins;
// [VI dòng gốc 119] Kiểm tra !list: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm key, label, ready.
    if(!list)return {key:d.key,label:d.label,ready:false};
// [VI dòng gốc 120] Duyệt từng giá trị trong [...new Set([...(list.keys??[]),...(d.ids?.()??[])])].slice(0,200) bằng const raw. | Khai báo biến không gán lại bằng const: raw (chưa gán giá trị)
    for(const raw of [...new Set([...(list.keys??[]),...(d.ids?.()??[])])].slice(0,200)){
// [VI dòng gốc 121] Khai báo biến không gán lại bằng const: id = gọi Number(raw) để chuyển sang số; entry = gọi list.get(raw); level = nếu entry thì lấy Number(entry[1]), ngược lại lấy 0
      const id=Number(raw),entry=list.get(raw),level=entry?Number(entry[1]):0;
// [VI dòng gốc 122] Chú thích gốc của tác giả; không được thực thi. Nội dung: Timed forms have extra expiry fields; leave activation/renewal manual.
      // Timed forms have extra expiry fields; leave activation/renewal manual.
// [VI dòng gốc 123] Kiểm tra !Number.isSafeInteger(id)||id<=0||!Number.isSafeInteger(level)||level<0||entry?.[2]||Number(entry?.[3])>0: đúng thì chạy nhánh sau if. | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
      if(!Number.isSafeInteger(id)||id<=0||!Number.isSafeInteger(level)||level<0||entry?.[2]||Number(entry?.[3])>0)continue;
// [VI dòng gốc 124] Khai báo biến không gán lại bằng const: row = gọi d.cfg(id, level) | Kiểm tra !row||!d.cfg(id,level+1): đúng thì chạy nhánh sau if. | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
      const row=d.cfg(id,level);if(!row||!d.cfg(id,level+1))continue;
// [VI dòng gốc 125] Khai báo biến không gán lại bằng const: costs = nếu d.costs thì lấy d.costs(row), ngược lại lấy row[2] | Kiểm tra !Array.isArray(costs)||!costs.length: đúng thì chạy nhánh sau if. | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
      const costs=d.costs?d.costs(row):row[2];if(!Array.isArray(costs)||!costs.length)continue;
// [VI dòng gốc 126] Khai báo biến không gán lại bằng const: cost = costs.find(p=>Number(bag?.getItemCountById?.(p?.[0]))>0) hoặc dùng vế phải khi vế trái là null/undefined: costs[0]
      const cost=costs.find(p=>Number(bag?.getItemCountById?.(p?.[0]))>0)??costs[0];
// [VI dòng gốc 127] Khai báo biến không gán lại bằng const: item = gọi Number(cost?.[0]) để chuyển sang số; need = gọi Number(cost?.[1]) để chuyển sang số; have = gọi Number(bag?.getItemCountById?.(item)) để chuyển sang số
      const item=Number(cost?.[0]),need=Number(cost?.[1]),have=Number(bag?.getItemCountById?.(item));
// [VI dòng gốc 128] Khai báo biến không gán lại bằng const: limit = gọi W._et?.getSvipLimit(item) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); svip = gọi Number(W._Ba?._ke?._Le?.instance?.curSvipLv) để chuyển sang số
      const limit=W._et?.getSvipLimit?.(item),svip=Number(W._Ba?._ke?._Le?.instance?.curSvipLv);
// [VI dòng gốc 129] Kiểm tra !Number.isSafeInteger(item)||item<=0||!Number.isSafeInteger(need)||need<=0||!Number.isFinite(have)||have<need|| !Number.isFinite(limit)||!Number.isFinite(svip)||svip<limit||typeof …: đúng thì chạy nhánh sau if.
      if(!Number.isSafeInteger(item)||item<=0||!Number.isSafeInteger(need)||need<=0||!Number.isFinite(have)||have<need||
// [VI dòng gốc 130] Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
        !Number.isFinite(limit)||!Number.isFinite(svip)||svip<limit||typeof d.rpc()?.[d.method]!=='function')continue;
// [VI dòng gốc 131] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm key, label, id, level, item, need, have, ready, signature.
      return {key:d.key,label:d.label,id,level,item,need,have,ready:true,signature:JSON.stringify([id,level,item,need,have])};
// [VI dòng gốc 132] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm key, label, ready.
    }return {key:d.key,label:d.label,ready:false};
// [VI dòng gốc 133] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 134] Khai báo biến không gán lại bằng const: owned = tạo hàm với tham số (không có); mỗi lần gọi trả về actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'') và chỉ đánh giá vế phải khi vế trái truthy: !W.__KVPV_UNIVERSAL_HALTED
  const owned=()=>actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;
// [VI dòng gốc 135] Định nghĩa hàm snapshot; tham số: d. Mục đích: đọc ảnh chụp trạng thái hiện tại
  function snapshot(d){
// [VI dòng gốc 136] Kiểm tra d.skill: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: gọi skill(d).
    if(d.skill)return skill(d);
// [VI dòng gốc 137] Kiểm tra d.illusion: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: gọi illusion(d).
    if(d.illusion)return illusion(d);
// [VI dòng gốc 138] Khai báo biến không gán lại bằng const: raw = gọi d.level(); level = gọi Number(raw) để chuyển sang số; row = nếu raw==null thì lấy null, ngược lại lấy d.cfg(level); next = nếu raw==null thì lấy null, ngược lại lấy d.cfg(level+1)
    const raw=d.level(),level=Number(raw),row=raw==null?null:d.cfg(level),next=raw==null?null:d.cfg(level+1);
// [VI dòng gốc 139] Khai báo biến không gán lại bằng const: cost = nếu d.cost thì lấy d.cost(), ngược lại lấy row?.[d.costIndex??1]; item = gọi Number(cost?.[0]) để chuyển sang số; need = gọi Number(cost?.[1]) để chuyển sang số
    const cost=d.cost?d.cost():row?.[d.costIndex??1],item=Number(cost?.[0]),need=Number(cost?.[1]);
// [VI dòng gốc 140] Khai báo biến không gán lại bằng const: exp = nếu d.exp thì lấy Number(d.exp()), ngược lại lấy null
    const exp=d.exp?Number(d.exp()):null;
// [VI dòng gốc 141] Khai báo biến không gán lại bằng const: have = gọi Number(W._Ba?._Ic?._aQ?.ins?.getItemCountById?.(item)) để chuyển sang số
    const have=Number(W._Ba?._Ic?._aQ?.ins?.getItemCountById?.(item));
// [VI dòng gốc 142] Khai báo biến không gán lại bằng const: ready = raw!=null&&Number.isSafeInteger(level)&&level>=0&&!!row&&!!next&& Number.isSafeInteger(item)&&item>0&&Number.isSafeInteger(need)&&need>0&&Number.isFinite(have)&&have>=need&& typeof… và chỉ đánh giá vế phải khi vế trái truthy: !d.exp||Number.isFinite(exp)&&exp>=0&&Number(cost?.[2])>0
    const ready=raw!=null&&Number.isSafeInteger(level)&&level>=0&&!!row&&!!next&&
// [VI dòng gốc 143] gọi Number.isSafeInteger(item) | gọi Number.isSafeInteger(need) | gọi Number.isFinite(have)
      Number.isSafeInteger(item)&&item>0&&Number.isSafeInteger(need)&&need>0&&Number.isFinite(have)&&have>=need&&
// [VI dòng gốc 144] gọi d.rpc() | gọi d.allowed() | gọi Number.isFinite(Number(row?.[3])) | gọi Number(row?.[3]) để chuyển sang số
      typeof d.rpc()?.[d.method]==='function'&&(!d.allowed||d.allowed())&&(!d.requireActorLevel||(Number.isFinite(Number(row?.[3]))&&Number.isFinite(Number(W._Ba?._rJ?._O$?.ins?.level))&&Number(W._Ba._rJ._O$.ins.level)>=Number(row[3])))&&(!d.exp||Number.isFinite(exp)&&exp>=0&&Number(cost?.[2])>0);
// [VI dòng gốc 145] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm key, label, level, exp, item, need, have, ready, signature.
    return {key:d.key,label:d.label,level,exp,item,need,have,ready,signature:JSON.stringify([d.key,level,exp,item,need,have])};
// [VI dòng gốc 146] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 147] Định nghĩa hàm observe; tham số: không có | Kiểm tra !S.pending: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  function observe(){if(!S.pending)return;
// [VI dòng gốc 148] Khai báo biến không gán lại bằng const: d = gọi definitions.find(x=>x.key===S.pending.key) để tìm phần tử đầu tiên thỏa điều kiện; level = gọi Number(d?.skill?skillLevel(d,S.pending.id):d?.illusion?d.list(d.model())?.get(S.pending.id)?.[1]:d?.level()) để chuyển sang số
    const d=definitions.find(x=>x.key===S.pending.key),level=Number(d?.skill?skillLevel(d,S.pending.id):d?.illusion?d.list(d.model())?.get(S.pending.id)?.[1]:d?.level());
// [VI dòng gốc 149] Khai báo biến không gán lại bằng const: exp = nếu d?.exp thì lấy Number(d.exp()), ngược lại lấy null
    const exp=d?.exp?Number(d.exp()):null;
// [VI dòng gốc 150] Kiểm tra Number.isFinite(level)&&(level>S.pending.level||level===S.pending.level&&Number.isFinite(S.pending.exp)&&Number.isFinite(exp)&&exp>S.pending.exp): đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | tăng S.confirmed một đơn vị sau khi lấy giá trị | gán S.pending bằng null | gán S.reason bằng 'server_level_increased'
    if(Number.isFinite(level)&&(level>S.pending.level||level===S.pending.level&&Number.isFinite(S.pending.exp)&&Number.isFinite(exp)&&exp>S.pending.exp)){S.confirmed++;S.pending=null;S.reason='server_level_increased';}
// [VI dòng gốc 151] gán S.reason bằng Date.now()-S.pending.at>30000?'waiting_level_ack_no_retry':'waiting_level_ack'
    else S.reason=Date.now()-S.pending.at>30000?'waiting_level_ack_no_retry':'waiting_level_ack';
// [VI dòng gốc 152] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 153] Định nghĩa hàm takeover; tham số: không có
  function takeover(){
// [VI dòng gốc 154] Khai báo biến không gán lại bằng const: legacy = đọc W.KVPV_V880; groups = legacy?.status?.(false)?.groups hoặc dùng vế phải khi vế trái là null/undefined: []
    const legacy=W.KVPV_V880,groups=legacy?.status?.(false)?.groups??[];
// [VI dòng gốc 155] Kiểm tra groups.some(g=>g.pending||g.blocked): đúng thì chạy nhánh sau if. | gán S.reason bằng 'waiting_old_quest_executor_ack' | Kết thúc hàm hiện tại và trả về: false.
    if(groups.some(g=>g.pending||g.blocked)){S.reason='waiting_old_quest_executor_ack';return false;}
// [VI dòng gốc 156] Khai báo biến không gán lại bằng const: pet = đọc W.KVPV_V875?.config nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const pet=W.KVPV_V875?.config;
// [VI dòng gốc 157] Kiểm tra pet: đúng thì chạy nhánh sau if. | Kiểm tra S.savedPet===null: đúng thì chạy nhánh sau if. | Kiểm tra W.KVPV_PARALLEL_ACTIONS?.legacyBusy?.()===true||W.KVPV_UPGRADES?.busy?.()===true: đúng thì chạy nhánh sau if. | gán S.reason bằng 'waiting_old_pet_feed_ack'
    if(pet){if(S.savedPet===null){if(W.KVPV_PARALLEL_ACTIONS?.legacyBusy?.()===true||W.KVPV_UPGRADES?.busy?.()===true){S.reason='waiting_old_pet_feed_ack';return false;}S.savedPet={autoFeed:pet.autoFeed};}pet.autoFeed=false;}
// [VI dòng gốc 158] Khai báo biến không gán lại bằng const: mount = đọc W.KVPV_V877?.config nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const mount=W.KVPV_V877?.config;
// [VI dòng gốc 159] Kiểm tra mount: đúng thì chạy nhánh sau if.
    if(mount){
// [VI dòng gốc 160] Kiểm tra S.savedMount===null: đúng thì chạy nhánh sau if.
      if(S.savedMount===null){
// [VI dòng gốc 161] Kiểm tra W.KVPV_UPGRADES?.busy?.()===true: đúng thì chạy nhánh sau if. | gán S.reason bằng 'waiting_shared_upgrade_queue' | Kết thúc hàm hiện tại và trả về: false.
        if(W.KVPV_UPGRADES?.busy?.()===true){S.reason='waiting_shared_upgrade_queue';return false;}
// [VI dòng gốc 162] gán S.savedMount bằng {autoFeed:mount.autoFeed}
        S.savedMount={autoFeed:mount.autoFeed};
// [VI dòng gốc 163] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
      }
// [VI dòng gốc 164] gán mount.autoFeed bằng false
      mount.autoFeed=false;
// [VI dòng gốc 165] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 166] Khai báo biến không gán lại bằng const: cfg = đọc legacy?.config nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const cfg=legacy?.config;
// [VI dòng gốc 167] Kiểm tra cfg: đúng thì chạy nhánh sau if. | Kiểm tra S.saved===null: đúng thì chạy nhánh sau if. | gán S.saved bằng {autoWeapon:cfg.autoWeapon,autoWing:cfg.autoWing,autoArm:cfg.autoArm}
    if(cfg){if(S.saved===null)S.saved={autoWeapon:cfg.autoWeapon,autoWing:cfg.autoWing,autoArm:cfg.autoArm};
// [VI dòng gốc 168] gán cfg.autoWeapon bằng false | gán cfg.autoWing bằng false | gán cfg.autoArm bằng false
      cfg.autoWeapon=false;cfg.autoWing=false;cfg.autoArm=false;}
// [VI dòng gốc 169] Kết thúc hàm hiện tại và trả về: true.
    return true;
// [VI dòng gốc 170] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 171] Định nghĩa hàm safe; tham số: không có | Kiểm tra Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: false.
  function safe(){if(Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0))return false;
// [VI dòng gốc 172] Khai báo biến không gán lại bằng const: q = gọi W.KVPV_DAILY?.quickState() (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); lease = gọi W.KVPV?.core?.scene?.status() để trả trạng thái để kiểm tra (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const q=W.KVPV_DAILY?.quickState?.(),lease=W.KVPV?.core?.scene?.status?.();
// [VI dòng gốc 173] Kiểm tra owned()&&W._Ba?._rJ?._O$?.ins?.isDead!==true&&q?.running===true&&W.KVPV_PARALLEL_ACTIONS?.independent===true&& (q.step==='fighting'||W.KVPV_PARALLEL_ACTIONS.canDirectDuringPve?.(q)…: đúng thì chạy nhánh sau if.
    if(owned()&&W._Ba?._rJ?._O$?.ins?.isDead!==true&&q?.running===true&&W.KVPV_PARALLEL_ACTIONS?.independent===true&&
// [VI dòng gốc 174] Kết thúc hàm hiện tại và trả về: true.
      (q.step==='fighting'||W.KVPV_PARALLEL_ACTIONS.canDirectDuringPve?.(q)===true))return true;
// [VI dòng gốc 175] Kết thúc hàm hiện tại và trả về: owned()&&W._Ba?._rJ?._O$?.ins?.isDead!==true&&W._Ba?._$a?.SceneUtil?.isCommonScene===true&& W._Ba?._$a?._yo?.ins?.isInMission!==true&&(!q?.job||['rảnh','ranh'].includes(q.job))&&!l… và chỉ đánh giá vế phải khi vế trái truthy: W.KVPV_PARALLEL_ACTIONS?.independent===true|| !W.KVPV_BG_RESOURCES?.status?.()?.busy&&!W.KVPV_FABAO_FAST?.status?.()?.pending.
    return owned()&&W._Ba?._rJ?._O$?.ins?.isDead!==true&&W._Ba?._$a?.SceneUtil?.isCommonScene===true&&
// [VI dòng gốc 176] gọi ['rảnh','ranh'].includes(q.job) để kiểm tra dữ liệu có chứa giá trị
      W._Ba?._$a?._yo?.ins?.isInMission!==true&&(!q?.job||['rảnh','ranh'].includes(q.job))&&!lease?.owner&&
// [VI dòng gốc 177] gọi W.KVPV_HITRUN1?.status(false) để trả trạng thái để kiểm tra
      !W.KVPV_HITRUN1?.status?.(false)?.running&&(W.KVPV_PARALLEL_ACTIONS?.independent===true||
// [VI dòng gốc 178] gọi W.KVPV_BG_RESOURCES?.status() để trả trạng thái để kiểm tra | gọi W.KVPV_FABAO_FAST?.status() để trả trạng thái để kiểm tra
      !W.KVPV_BG_RESOURCES?.status?.()?.busy&&!W.KVPV_FABAO_FAST?.status?.()?.pending);
// [VI dòng gốc 179] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 180] Định nghĩa hàm probe; tham số: key
  function probe(key){
// [VI dòng gốc 181] Kiểm tra !S.enabled||!owned(): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm ready. | gọi observe()
    if(!S.enabled||!owned())return {ready:false};observe();
// [VI dòng gốc 182] Kiểm tra S.pending||!safe()||W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true||!takeover(): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm ready.
    if(S.pending||!safe()||W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true||!takeover())return {ready:false};
// [VI dòng gốc 183] Khai báo biến không gán lại bằng const: d = gọi definitions.find(x=>x.key===key) để tìm phần tử đầu tiên thỏa điều kiện | Kết thúc hàm hiện tại và trả về: nếu d thì lấy snapshot(d), ngược lại lấy {ready:false}.
    const d=definitions.find(x=>x.key===key);return d?snapshot(d):{ready:false};
// [VI dòng gốc 184] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 185] Định nghĩa hàm run; tham số: key, before
  function run(key,before){
// [VI dòng gốc 186] Khai báo biến không gán lại bằng const: current = gọi probe(key) | Kiểm tra !current.ready||current.signature!==before.signature: đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('Upgrade state changed')
    const current=probe(key);if(!current.ready||current.signature!==before.signature)throw Error('Upgrade state changed');
// [VI dòng gốc 187] Khai báo biến không gán lại bằng const: d = gọi definitions.find(x=>x.key===key) để tìm phần tử đầu tiên thỏa điều kiện; rpc = gọi d.rpc()
    const d=definitions.find(x=>x.key===key),rpc=d.rpc();
// [VI dòng gốc 188] gán S.pending bằng {key,id:current.id,level:current.level,exp:current.exp,at:Date.now()} | tăng S.requests một đơn vị sau khi lấy giá trị | gán S.reason bằng 'native_upgrade_sent'
    S.pending={key,id:current.id,level:current.level,exp:current.exp,at:Date.now()};S.requests++;S.reason='native_upgrade_sent';
// [VI dòng gốc 189] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | Kiểm tra d.soulType!=null: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gọi rpc[d.method]([d.soulType,0]) | Kiểm tra d.typeZero: đúng thì chạy nhánh sau if, sai thì chạy nhánh else.
    try{if(d.soulType!=null)rpc[d.method]([d.soulType,0]);else if(d.typeZero)rpc[d.method](0);else if(d.typeFirst)rpc[d.method](1,current.id);else if(d.mountSkill)rpc[d.method](current.id,d.skillType??1);else if(d.scalar)rpc[d.method](current.id);else if(d.illusion||d.skill)rpc[d.method]([current.id]);else rpc[d.method]();}catch(e){S.lastError=String(e);throw e;}
// [VI dòng gốc 190] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 191] Định nghĩa hàm tick; tham số: không có. Mục đích: xử lý một nhịp kiểm tra | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài.
  function tick(){try{
// [VI dòng gốc 192] Kiểm tra !S.enabled: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể. | Kiểm tra !owned(): đúng thì chạy nhánh sau if. | gọi stop() để dừng bộ điều khiển và dọn tài nguyên
    if(!S.enabled)return;if(!owned()){stop();return;}
// [VI dòng gốc 193] Chú thích gốc của tác giả; không được thực thi. Nội dung: Dữ liệu Thú Cưỡi có thể chưa tải nếu chưa mở bảng; chỉ yêu cầu đọc, tối đa30s/lần.
    // Dữ liệu Thú Cưỡi có thể chưa tải nếu chưa mở bảng; chỉ yêu cầu đọc, tối đa30s/lần.
// [VI dòng gốc 194] Khai báo biến không gán lại bằng const: mount = đọc W._Ba?._YJ?._bgt?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const mount=W._Ba?._YJ?._bgt?.ins;
// [VI dòng gốc 195] Kiểm tra !Array.isArray(W._Ba?._YJ?._WJ?.ins?.feed)&&typeof mount?.getRideInfo==='function'&&Date.now()-S.lastMountRefresh>=30000: đúng thì chạy nhánh sau if.
    if(!Array.isArray(W._Ba?._YJ?._WJ?.ins?.feed)&&typeof mount?.getRideInfo==='function'&&Date.now()-S.lastMountRefresh>=30000){
// [VI dòng gốc 196] gán S.lastMountRefresh bằng Date.now() | gọi mount.getRideInfo()
      S.lastMountRefresh=Date.now();mount.getRideInfo();
// [VI dòng gốc 197] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 198] gọi observe()
    observe();
// [VI dòng gốc 199] Kiểm tra !S.pending: đúng thì chạy nhánh sau if. | gọi takeover()
    if(!S.pending)takeover();
// [VI dòng gốc 200] Nhận lỗi bằng e và chạy phần xử lý lỗi. | gán S.lastError bằng String(e) | gọi W.KVPV_V1?.diagnostics?.record(e) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  }catch(e){S.lastError=String(e);W.KVPV_V1?.diagnostics?.record?.(e);}}
// [VI dòng gốc 201] Định nghĩa hàm stop; tham số: reason='manual'. Mục đích: dừng bộ điều khiển và dọn tài nguyên
  function stop(reason='manual'){
// [VI dòng gốc 202] gán S.enabled bằng false | Kiểm tra S.timer!==null: đúng thì chạy nhánh sau if. | gọi W.KVPV_V1?.timers?.clearInterval??W.clearInterval(S.timer) | gán S.timer bằng null
    S.enabled=false;if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;
// [VI dòng gốc 203] Duyệt từng giá trị trong definitions bằng const d. | Khai báo biến không gán lại bằng const: d (chưa gán giá trị) | gọi W.KVPV_V8?.toggle('appearance_auto_'+d.key, false) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    for(const d of definitions)W.KVPV_V8?.toggle?.('appearance_auto_'+d.key,false);
// [VI dòng gốc 204] Chú thích gốc của tác giả; không được thực thi. Nội dung: Không khởi động lại sender cũ khi yêu cầu mới còn chưa rõ kết quả.
    // Không khởi động lại sender cũ khi yêu cầu mới còn chưa rõ kết quả.
// [VI dòng gốc 205] Kiểm tra reason!=='reload'&&!S.pending: đúng thì chạy nhánh sau if.
    if(reason!=='reload'&&!S.pending){
// [VI dòng gốc 206] Kiểm tra S.saved&&W.KVPV_V880?.config: đúng thì chạy nhánh sau if. | gọi Object.assign(W.KVPV_V880.config, S.saved)
      if(S.saved&&W.KVPV_V880?.config)Object.assign(W.KVPV_V880.config,S.saved);
// [VI dòng gốc 207] Kiểm tra S.savedMount&&W.KVPV_V877?.config: đúng thì chạy nhánh sau if. | gọi Object.assign(W.KVPV_V877.config, S.savedMount)
      if(S.savedMount&&W.KVPV_V877?.config)Object.assign(W.KVPV_V877.config,S.savedMount);
// [VI dòng gốc 208] Kiểm tra S.savedPet&&W.KVPV_V875?.config: đúng thì chạy nhánh sau if. | gọi Object.assign(W.KVPV_V875.config, S.savedPet)
      if(S.savedPet&&W.KVPV_V875?.config)Object.assign(W.KVPV_V875.config,S.savedPet);
// [VI dòng gốc 209] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 210] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 211] Định nghĩa hàm start; tham số: không có. Mục đích: khởi động bộ điều khiển
  function start(){
// [VI dòng gốc 212] Khai báo biến không gán lại bằng const: queue = đọc W.KVPV_V8 | Kiểm tra !queue?.register||!queue?.toggle: đúng thì chạy nhánh sau if. | gán S.reason bằng 'waiting_shared_queue' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    const queue=W.KVPV_V8;if(!queue?.register||!queue?.toggle){S.reason='waiting_shared_queue';return;}
// [VI dòng gốc 213] gán S.enabled bằng true
    S.enabled=true;
// [VI dòng gốc 214] Duyệt từng giá trị trong definitions bằng const d. | Khai báo biến không gán lại bằng const: d (chưa gán giá trị) | Khai báo biến không gán lại bằng const: id = tính biểu thức 'appearance_auto_'+d.key
    for(const d of definitions){const id='appearance_auto_'+d.key;
// [VI dòng gốc 215] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | gọi queue.register({id,name:'Tự tăng cấp '+d.label,kind:'work',verified:true,enabled:true,spend:'materials', background:true,directDuringPv…)
      try{queue.register({id,name:'Tự tăng cấp '+d.label,kind:'work',verified:true,enabled:true,spend:'materials',
// [VI dòng gốc 216] Thuộc tính background: true | Thuộc tính directDuringPve: true | Thuộc tính redIds: tạo mảng gồm 0 vị trí: [] | Thuộc tính hourlyLimit: 60
        background:true,directDuringPve:true,redIds:[],hourlyLimit:60,cooldownMs:2000,
// [VI dòng gốc 217] Thuộc tính probe: tạo hàm với tham số (không có); mỗi lần gọi trả về W.KVPV_APPEARANCE_AUTO?._probe(d.key) hoặc dùng vế phải khi vế trái là null/undefined: {ready:false} | Thuộc tính ready: false
        probe:()=>W.KVPV_APPEARANCE_AUTO?._probe(d.key)??{ready:false},
// [VI dòng gốc 218] Thuộc tính run: tạo hàm với tham số before; mỗi lần gọi trả về gọi W.KVPV_APPEARANCE_AUTO?._run(d.key, before); chức năng nội bộ chưa xác minh từ tên hàm (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
        run:before=>W.KVPV_APPEARANCE_AUTO?._run(d.key,before)});
// [VI dòng gốc 219] Nhận lỗi bằng e và chạy phần xử lý lỗi. | Kiểm tra !/Trung module ID|already exists/i.test(String(e)): đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: e
      }catch(e){if(!/Trung module ID|already exists/i.test(String(e)))throw e;}
// [VI dòng gốc 220] gọi queue.toggle(id, true)
      queue.toggle(id,true);
// [VI dòng gốc 221] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 222] gán S.registered bằng true | Kiểm tra S.timer===null: đúng thì chạy nhánh sau if. | gán S.timer bằng (W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,1000) | gọi tick() để xử lý một nhịp kiểm tra
    S.registered=true;if(S.timer===null)S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,1000);tick();
// [VI dòng gốc 223] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 224] gán W.KVPV_APPEARANCE_AUTO bằng Object.freeze({start,stop,sync:tick,_probe:probe,_run:run, status:()=>({enabled:S.enabled,actor,registered:S.registered,reason:S.reason,requests:S.requests,confirmed:S.confirmed, p…
  W.KVPV_APPEARANCE_AUTO=Object.freeze({start,stop,sync:tick,_probe:probe,_run:run,
// [VI dòng gốc 225] Thuộc tính status: tạo hàm với tham số (không có); mỗi lần gọi trả về tạo đối tượng gồm enabled, actor, registered, reason, requests, confirmed, pending, groups, lastError, allowKNB | Thuộc tính enabled: đọc S.enabled | Thuộc tính actor: dùng biến cùng tên | Thuộc tính registered: đọc S.registered
    status:()=>({enabled:S.enabled,actor,registered:S.registered,reason:S.reason,requests:S.requests,confirmed:S.confirmed,
// [VI dòng gốc 226] Thuộc tính pending: nếu S.pending thì lấy {...S.pending}, ngược lại lấy null | Thuộc tính groups: gọi definitions.map(snapshot) để biến đổi từng phần tử | Thuộc tính lastError: đọc S.lastError | Thuộc tính allowKNB: false
      pending:S.pending?{...S.pending}:null,groups:definitions.map(snapshot),lastError:S.lastError,allowKNB:false}),
// [VI dòng gốc 227] Thuộc tính _handoff: tạo hàm với tham số (không có); mỗi lần gọi trả về tạo đối tượng gồm actor, pending, saved, savedMount, savedPet, requests, confirmed | Thuộc tính actor: dùng biến cùng tên | Thuộc tính pending: nếu S.pending thì lấy {...S.pending}, ngược lại lấy null | Thuộc tính saved: đọc S.saved
    _handoff:()=>({actor,pending:S.pending?{...S.pending}:null,saved:S.saved,savedMount:S.savedMount,savedPet:S.savedPet,requests:S.requests,confirmed:S.confirmed})});
// [VI dòng gốc 228] gọi start() để khởi động bộ điều khiển
  start();
// [VI dòng gốc 229] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: })();
})();
// [VI dòng gốc 230] Dòng trống để tách các phần, không có lệnh thực thi.
