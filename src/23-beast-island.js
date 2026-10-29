// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: CHÚ THÍCH V1 — Thần Thú Đảo tầng 2.
/* CHÚ THÍCH V1 — Thần Thú Đảo tầng 2.
 * Mỗi ngày dùng số đã tiêu hao do server trả về: Phượng Huyết 20, Long Phách 2,
 * Boss 3: mặc định 750, clone cấp 500 ở tầng 1; acc chính cấp 800 ở tầng 2.
 * Thu thập vẫn tầng 2. Không mua lượt hoặc đánh người.
 * Đi và thu thập bằng luồng native; không ngắt thanh thu thập mỗi lần kiểm tra.
 * Sửa src/ rồi chạy node build.cjs; chạy lại FULL không cần F5. */
// [VI dòng gốc 7] chạy ngay hàm bao để tạo phạm vi và khởi tạo phần chức năng bên trong
(() => {
// [VI dòng gốc 8] "use strict"
  'use strict';
// [VI dòng gốc 9] Khai báo biến không gán lại bằng const: W = window; carry = gọi W.KVPV_BEAST_ISLAND?._handoff(); chức năng nội bộ chưa xác minh từ tên hàm (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gọi W.KVPV_BEAST_ISLAND?.stop() để dừng bộ điều khiển và dọn tài nguyên (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  const W=window,carry=W.KVPV_BEAST_ISLAND?._handoff?.();W.KVPV_BEAST_ISLAND?.stop?.();
// [VI dòng gốc 10] Khai báo biến không gán lại bằng const: actor = gọi String(W.__KVPV_OWN_ACTOR_ID||'') để chuyển sang chuỗi
  const actor=String(W.__KVPV_OWN_ACTOR_ID||'');
// [VI dòng gốc 11] Khai báo biến không gán lại bằng const: tag = "beast-island-2"
  const tag='beast-island-2';
// [VI dòng gốc 12] Khai báo biến không gán lại bằng const: limits = gọi Object.freeze({phoenix:20,dragon:2,boss:3}) để khóa thay đổi trực tiếp các thuộc tính của đối tượng ở mức ngoài cùng
  const limits=Object.freeze({phoenix:20,dragon:2,boss:3});
// [VI dòng gốc 13] Khai báo biến không gán lại bằng const: bossLayer = tạo hàm với tham số (không có); mỗi lần gọi trả về nếu bossLevel===500 thì lấy 1, ngược lại lấy 2
  const bossLayer=()=>bossLevel===500?1:2;
// [VI dòng gốc 14] Khai báo biến có thể gán lại bằng let: bossLevel = 750
  let bossLevel=750;
// [VI dòng gốc 15] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | Khai báo biến không gán lại bằng const: saved = gọi Number(W.localStorage?.getItem('KVPV_BEAST_BOSS_'+actor)) để chuyển sang số | Kiểm tra saved===500||saved===600||saved===750: đúng thì chạy nhánh sau if. | gán bossLevel bằng saved===600?500:saved
  try{const saved=Number(W.localStorage?.getItem('KVPV_BEAST_BOSS_'+actor));if(saved===500||saved===600||saved===750)bossLevel=saved===600?500:saved;}catch(_){}
// [VI dòng gốc 16] Kiểm tra carry?.actor===actor&&(carry.bossLevel===500||carry.bossLevel===600||carry.bossLevel===750): đúng thì chạy nhánh sau if. | gán bossLevel bằng carry.bossLevel===600?500:carry.bossLevel
  if(carry?.actor===actor&&(carry.bossLevel===500||carry.bossLevel===600||carry.bossLevel===750))bossLevel=carry.bossLevel===600?500:carry.bossLevel;
// [VI dòng gốc 17] Kiểm tra actor==='10228867268946': đúng thì chạy nhánh sau if. | gán bossLevel bằng 800
  const adaptive=actor==='10228867268946';
  if(adaptive)bossLevel=800;
// [VI dòng gốc 18] Khai báo biến không gán lại bằng const: S = tạo đối tượng gồm enabled, timer, lease, phase, reason, lastError, lastRefresh, lastEntry, lastAction, idleSince, action, stageAuto, hooks
  const S={enabled:true,timer:null,lease:false,phase:'WAITING',reason:'starting',lastError:'',
// [VI dòng gốc 19] Thuộc tính lastRefresh: áp dụng toán tử - lên Infinity | Thuộc tính lastEntry: áp dụng toán tử - lên Infinity | Thuộc tính lastAction: áp dụng toán tử - lên Infinity | Thuộc tính idleSince: null
    lastRefresh:-Infinity,lastEntry:-Infinity,lastAction:-Infinity,idleSince:null,action:'',bossCombatOcc:null,stageAuto:null,hooks:[],bossTrialAt:0,bossQuotaSeen:null,bossFailures:0,bossCandidates:[]};
// [VI dòng gốc 20] Kiểm tra carry?.actor===actor&&Number.isFinite(carry.lastEntry): đúng thì chạy nhánh sau if. | gán S.lastEntry bằng carry.lastEntry
  if(carry?.actor===actor&&Number.isFinite(carry.lastEntry))S.lastEntry=carry.lastEntry;
// [VI dòng gốc 21] Khai báo biến không gán lại bằng const: model = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._Ba?._dP?._P5t?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); cfg = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._ft?._gci?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  const model=()=>W._Ba?._dP?._P5t?.ins, cfg=()=>W._ft?._gci?.ins;
// [VI dòng gốc 22] Khai báo biến không gán lại bằng const: user = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._Ba?._rJ?._O$?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); rpc = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W._Ba?._sst?._Cht?.inst nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  const user=()=>W._Ba?._rJ?._O$?.ins, rpc=()=>W._Ba?._sst?._Cht?.inst;
// [VI dòng gốc 23] Khai báo biến không gán lại bằng const: arb = tạo hàm với tham số (không có); mỗi lần gọi trả về đọc W.KVPV?.core?.scene nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  const arb=()=>W.KVPV?.core?.scene;
// [VI dòng gốc 24] Khai báo biến không gán lại bằng const: owned = tạo hàm với tham số (không có); mỗi lần gọi trả về !!actor&&actor===String(user()?.actorId??'') và chỉ đánh giá vế phải khi vế trái truthy: !W.__KVPV_UNIVERSAL_HALTED
  const owned=()=>!!actor&&actor===String(user()?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;
// [VI dòng gốc 25] Khai báo biến không gán lại bằng const: norm = tạo hàm với tham số x; mỗi lần gọi trả về gọi String(x||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase()
  const norm=x=>String(x||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
// [VI dòng gốc 26] Định nghĩa hàm snapshot; tham số: không có. Mục đích: đọc ảnh chụp trạng thái hiện tại
  function snapshot(){
// [VI dòng gốc 27] Khai báo biến không gán lại bằng const: m = gọi model(); c = gọi cfg(); rows = c?.getMABosss?.(2) hoặc dùng vế phải khi vế trái falsy: []
    const m=model(),c=cfg(),rows=c?.getMABosss?.(2)||[];
// [VI dòng gốc 28] Khai báo biến không gán lại bằng const: map = gọi Number(W._C?._Mn?._Cn?.currentID??W._Ba?._$a?._yo?.ins?.intoSce?.[0]) để chuyển sang số
    const map=Number(W._C?._Mn?._Cn?.currentID??W._Ba?._$a?._yo?.ins?.intoSce?.[0]);
// [VI dòng gốc 29] Khai báo biến không gán lại bằng const: type = gọi Number(W._ft?._po?.ins?.getCfgById?.(map)?.[7]??W._Ba?._$a?.SceneUtil?.curScene) để chuyển sang số
    const type=Number(W._ft?._po?.ins?.getCfgById?.(map)?.[7]??W._Ba?._$a?.SceneUtil?.curScene);
// [VI dòng gốc 30] Khai báo biến không gán lại bằng const: bossRows = tạo mảng gồm 2 vị trí: [...(c?.getMABosss?.(1)||[]),...rows]
    const bossRows=[...(c?.getMABosss?.(1)||[]),...rows];
// [VI dòng gốc 31] Khai báo biến không gán lại bằng const: boss = gọi bossRows.find(r=>Number(r[1])===bossLayer()&&r[3]===1&&Number(W._ft?._tY?.ins?.getCfgById?.(r[4])?.[6])===bossLevel) để tìm phần tử đầu tiên thỏa điều kiện
    const candidates=bossRows.filter(r=>Number(r?.[3])===1).map(row=>({
      row,level:Number(W._ft?._tY?.ins?.getCfgById?.(row[4])?.[6])
    })).filter(x=>Number.isFinite(x.level)&&x.level>0).sort((a,b)=>a.level-b.level);
    S.bossCandidates=[...new Set(candidates.map(x=>x.level))];
    const pool=adaptive?candidates.filter(x=>Number(x.row[1])===2):candidates.filter(x=>Number(x.row[1])===bossLayer());
    const preferred=pool.find(x=>x.level===bossLevel)||[...pool].reverse().find(x=>x.level<bossLevel)||pool[0];
    const boss=preferred?.row;
    if(adaptive&&preferred)bossLevel=preferred.level;
// [VI dòng gốc 32] Khai báo biến không gán lại bằng const: inside = type===49 và chỉ đánh giá vế phải khi vế trái truthy: (Number(m?.getCurMapLevel?.())===2&&rows.some(r=>Number(r[0])===map))|| !!boss&&Number(m?.getCurMapLevel?.())===Number(boss[1])&&Number(boss[0])===map
    // Scene ID and native configured map IDs are authoritative even if
    // the floor model has not synchronized after a manual teleport.
    const inside=type===49&&bossRows.some(r=>Number(r?.[0])===map&&[1,2].includes(Number(r?.[1])));
// [VI dòng gốc 34] Khai báo biến không gán lại bằng const: nodes = gọi rows.filter(r=>r[3]===2) để giữ phần tử thỏa điều kiện
    const nodes=rows.filter(r=>r[3]===2);
// [VI dòng gốc 35] Khai báo biến không gán lại bằng const: phoenix = gọi nodes.find(r=>norm(W._ft?._Xpt?.ins?.getCfgById?.(r[4])?.[4]).includes('phuong huyet')) để tìm phần tử đầu tiên thỏa điều kiện
    const phoenix=nodes.find(r=>norm(W._ft?._Xpt?.ins?.getCfgById?.(r[4])?.[4]).includes('phuong huyet'));
// [VI dòng gốc 36] Khai báo biến không gán lại bằng const: dragon = gọi nodes.find(r=>Number(r[4])===Number(m?.dragonOcc)) để tìm phần tử đầu tiên thỏa điều kiện
    const dragon=nodes.find(r=>Number(r[4])===Number(m?.dragonOcc));
// [VI dòng gốc 37] Khai báo biến không gán lại bằng const: known = Array.isArray(m?._c_a)&&Number.isFinite(Number(m._c_a[0])) và chỉ đánh giá vế phải khi vế trái truthy: Array.isArray(m._c_a[1])
    const known=Array.isArray(m?._c_a)&&Number.isFinite(Number(m._c_a[0]))&&Array.isArray(m._c_a[1]);
// [VI dòng gốc 38] Khai báo biến không gán lại bằng const: quota = tạo hàm với tham số row, cap, kind
    const quota=(row,cap,kind)=>{
// [VI dòng gốc 39] Khai báo biến không gán lại bằng const: used = nếu known&&row thì lấy Number(kind===1?m?.getMACurPsNum?.():m?.getNpcCollectionNum?.(row[4])), ngược lại lấy NaN
      const used=known&&row?Number(kind===1?m?.getMACurPsNum?.():m?.getNpcCollectionNum?.(row[4])):NaN;
// [VI dòng gốc 40] Khai báo biến không gán lại bằng const: max = nếu row thì lấy Number(kind===1?m?.getMAMaxPsNum?.():m?.getNpcCollectionMaxNum?.(row[4])), ngược lại lấy NaN
      const max=row?Number(kind===1?m?.getMAMaxPsNum?.():m?.getNpcCollectionMaxNum?.(row[4])):NaN;
// [VI dòng gốc 41] Khai báo biến không gán lại bằng const: valid = known&&!!row&&Number.isFinite(used)&&used>=0&&Number.isFinite(max) và chỉ đánh giá vế phải khi vế trái truthy: max>0
      const valid=known&&!!row&&Number.isFinite(used)&&used>=0&&Number.isFinite(max)&&max>0;
// [VI dòng gốc 42] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm row, used, max, limit, remaining.
      return {row,used,max,limit:Math.min(cap,max),remaining:valid?Math.max(0,Math.min(cap,max)-used):null};
// [VI dòng gốc 43] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    };
// [VI dòng gốc 44] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm map, type, inside, known, phoenix, dragon, boss.
    return {map,type,inside,known,phoenix:quota(phoenix,limits.phoenix,2),dragon:quota(dragon,limits.dragon,2),boss:quota(boss,limits.boss,1)};
// [VI dòng gốc 45] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 46] Chú thích gốc của tác giả; không được thực thi. Nội dung: Chỉ khóa auto chọn mục tiêu của đảo trong thời gian module giữ map.
  // Chỉ khóa auto chọn mục tiêu của đảo trong thời gian module giữ map.
// [VI dòng gốc 47] Chú thích gốc của tác giả; không được thực thi. Nội dung: Hook được tháo đúng hàm của mình khi stop/hot reload, không ghi đè add-on khác.
  // Hook được tháo đúng hàm của mình khi stop/hot reload, không ghi đè add-on khác.
// [VI dòng gốc 48] Định nghĩa hàm hook; tham số: key, filter | Khai báo biến không gán lại bằng const: m = gọi model(); original = đọc m?.[key] nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Kiểm tra typeof original!=='function': đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  function hook(key,filter){const m=model(),original=m?.[key];if(typeof original!=='function')return;
// [VI dòng gốc 49] Khai báo biến không gán lại bằng const: wrapped = tạo hàm với tham số ...args | Kiểm tra S.lease&&!filter(...args): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: false. | Kết thúc hàm hiện tại và trả về: gọi original.apply(this, args).
    const wrapped=function(...args){if(S.lease&&!filter(...args))return false;return original.apply(this,args);};
// [VI dòng gốc 50] gán m[key] bằng wrapped | gọi S.hooks.push({m,key,original,wrapped}) để thêm phần tử vào cuối mảng
    m[key]=wrapped;S.hooks.push({m,key,original,wrapped});}
// [VI dòng gốc 51] Định nghĩa hàm installGuards; tham số: không có | Kiểm tra S.hooks.length: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  function installGuards(){if(S.hooks.length)return;
// [VI dòng gốc 52] gọi hook('MASequenceAutoFight', ()=>false)
    hook('MASequenceAutoFight',()=>false);
// [VI dòng gốc 53] gọi hook('setNpcMovePoint', (point,occ)=>{if(point===null)return true;const d=snapshot(); return d.inside&&[d.phoenix,d.dragon].s…) | Kiểm tra point===null: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: true. | Khai báo biến không gán lại bằng const: d = gọi snapshot() để đọc ảnh chụp trạng thái hiện tại
    hook('setNpcMovePoint',(point,occ)=>{if(point===null)return true;const d=snapshot();
// [VI dòng gốc 54] Kết thúc hàm hiện tại và trả về: d.inside và chỉ đánh giá vế phải khi vế trái truthy: [d.phoenix,d.dragon].some(q=>q.remaining>0&&Number(q.row?.[0])===d.map&&Number(q.row?.[4])===Number(occ)).
      return d.inside&&[d.phoenix,d.dragon].some(q=>q.remaining>0&&Number(q.row?.[0])===d.map&&Number(q.row?.[4])===Number(occ));});
// [VI dòng gốc 55] gọi hook('setTarget', (occ,kind,scene)=>{if(scene!==49)return true;const d=snapshot(); if(!d.inside)return false; return kind===1…) | Kiểm tra scene!==49: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: true. | Khai báo biến không gán lại bằng const: d = gọi snapshot() để đọc ảnh chụp trạng thái hiện tại
    hook('setTarget',(occ,kind,scene)=>{if(scene!==49)return true;const d=snapshot();
// [VI dòng gốc 56] Kiểm tra !d.inside: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: false.
      if(!d.inside)return false;
// [VI dòng gốc 57] Kết thúc hàm hiện tại và trả về: nếu kind===1 thì lấy d.boss.remaining>0&&Number(d.boss.row?.[0])===d.map&&Number(occ)===Number(d.boss.row?.[4]), ngược lại lấy kind===3&&[d.phoenix,d.dragon].some(q=>q.remaining>0&&Number(q.row?.[0])===d.map&&Number(q.row?.[4])===Number(occ)).
      return kind===1?d.boss.remaining>0&&Number(d.boss.row?.[0])===d.map&&Number(occ)===Number(d.boss.row?.[4]):
// [VI dòng gốc 58] Định nghĩa hàm hàm không đặt tên; tham số: q
        kind===3&&[d.phoenix,d.dragon].some(q=>q.remaining>0&&Number(q.row?.[0])===d.map&&Number(q.row?.[4])===Number(occ));});
// [VI dòng gốc 59] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 60] Định nghĩa hàm release; tham số: không có. Mục đích: nhả quyền điều khiển đang giữ | Kiểm tra S.lease&&arb()?.status?.().tag===tag: đúng thì chạy nhánh sau if. | gọi arb()?.release('combat') để nhả quyền điều khiển đang giữ (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gán S.lease bằng false
  function release(){if(S.lease&&arb()?.status?.().tag===tag)arb()?.release?.('combat');S.lease=false;
// [VI dòng gốc 61] Khai báo biến không gán lại bằng const: stage = đọc W._Ba?._Co?._Mo?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Kiểm tra owned()&&S.stageAuto===true&&stage?.auto===false: đúng thì chạy nhánh sau if. | gán stage.auto bằng true
    const stage=W._Ba?._Co?._Mo?.ins;if(owned()&&S.stageAuto===true&&stage?.auto===false&&!W.KVPV_EVENT_PRIORITY?.hold?.())stage.auto=true;
// [VI dòng gốc 62] gán S.stageAuto bằng null | gán S.action bằng '' | gán S.idleSince bằng null
    S.stageAuto=null;S.action='';S.bossCombatOcc=null;S.idleSince=null;
// [VI dòng gốc 63] Duyệt từng giá trị trong S.hooks bằng const h. | Khai báo biến không gán lại bằng const: h (chưa gán giá trị) | Kiểm tra h.m[h.key]===h.wrapped: đúng thì chạy nhánh sau if. | gán h.m[h.key] bằng h.original
    for(const h of S.hooks)if(h.m[h.key]===h.wrapped)h.m[h.key]=h.original;S.hooks=[];}
// [VI dòng gốc 64] Định nghĩa hàm reserve; tham số: không có. Mục đích: xin giữ quyền điều khiển cảnh | Khai báo biến không gán lại bằng const: a = gọi arb(); l = gọi a?.status() để trả trạng thái để kiểm tra (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  function reserve(){const a=arb(),l=a?.status?.();
// [VI dòng gốc 65] Kiểm tra !a||l?.owner&&l.tag!==tag||W.KVPV_HITRUN1?.status?.(false)?.running: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: false.
    if(!a||l?.owner&&l.tag!==tag||W.KVPV_HITRUN1?.status?.(false)?.running)return false;
// [VI dòng gốc 66] Khai báo biến không gán lại bằng const: stage = đọc W._Ba?._Co?._Mo?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const stage=W._Ba?._Co?._Mo?.ins;
// [VI dòng gốc 67] Kiểm tra S.stageAuto===null: đúng thì chạy nhánh sau if. | gán S.stageAuto bằng stage?.auto===true | Kiểm tra stage?.auto===true: đúng thì chạy nhánh sau if. | gán stage.auto bằng false
    if(S.stageAuto===null)S.stageAuto=stage?.auto===true;if(stage?.auto===true)stage.auto=false;
// [VI dòng gốc 68] Kiểm tra a.acquire('combat',tag)!==true: đúng thì chạy nhánh sau if. | gọi release() để nhả quyền điều khiển đang giữ | Kết thúc hàm hiện tại và trả về: false. | gán S.lease bằng true
    if(a.acquire('combat',tag)!==true){release();return false;}S.lease=true;installGuards();return true;}
// [VI dòng gốc 69] Định nghĩa hàm refresh; tham số: không có. Mục đích: làm mới dữ liệu theo điều kiện của hàm | Kiểm tra Date.now()-S.lastRefresh<30000: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể. | gán S.lastRefresh bằng Date.now()
  function refresh(){if(Date.now()-S.lastRefresh<30000)return;S.lastRefresh=Date.now();
// [VI dòng gốc 70] Khai báo biến không gán lại bằng const: n = đọc W._Ba?._dP?._l0n?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gọi n?.GetMythicalAnimalCopyInfo() để yêu cầu dữ liệu phó bản Thần Thú (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gọi n?.GetMythicalAnimalNpcRefreshInfo() để yêu cầu dữ liệu hồi sinh mục tiêu Thần Thú (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const n=W._Ba?._dP?._l0n?.ins;n?.GetMythicalAnimalCopyInfo?.();n?.GetMythicalAnimalNpcRefreshInfo?.();}
// [VI dòng gốc 71] Định nghĩa hàm exit; tham số: reason | gán S.reason bằng reason | gán S.phase bằng 'EXITING' | gán S.lastEntry bằng Date.now()
  function exit(reason){S.reason=reason;S.phase='EXITING';S.lastEntry=Date.now();rpc()?.rqEtScene?.(0);}
// [VI dòng gốc 72] Định nghĩa hàm tick; tham số: không có. Mục đích: xử lý một nhịp kiểm tra | Kiểm tra W.KVPV_ENTRY_POLICY?.manual===true: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể. | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài.
  function tick(){if(W.KVPV_ENTRY_POLICY?.manual===true)return;S.bossCombatOcc=null;try{
// [VI dòng gốc 73] Kiểm tra W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true: đúng thì chạy nhánh sau if. | gán S.reason bằng 'priority_agree_popup' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true){S.reason='priority_agree_popup';return;}
// [VI dòng gốc 74] Kiểm tra !S.enabled||!owned(): đúng thì chạy nhánh sau if. | gọi stop() để dừng bộ điều khiển và dọn tài nguyên | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(!S.enabled||!owned()){stop();return;}
// [VI dòng gốc 75] Khai báo biến không gán lại bằng const: d = gọi snapshot() để đọc ảnh chụp trạng thái hiện tại; now = gọi Date.now() | gọi refresh() để làm mới dữ liệu theo điều kiện của hàm
    const d=snapshot(),now=Date.now();refresh();
    if(adaptive&&d.known&&d.boss.remaining!==null){
      const count=d.boss.used;
      if(S.bossQuotaSeen===null)S.bossQuotaSeen=count;
      if(count>S.bossQuotaSeen){
        S.bossQuotaSeen=count;S.bossFailures=0;S.bossTrialAt=0;
        const higher=S.bossCandidates.find(level=>level>bossLevel);
        if(higher)bossLevel=higher;
      }else if(count<S.bossQuotaSeen){
        S.bossQuotaSeen=count;S.bossFailures=0;S.bossTrialAt=0;
      }
      if(d.inside&&d.boss.remaining>0&&S.phase==='ACTIVE'&&S.action.startsWith('1/')){
        if(S.bossTrialAt===0)S.bossTrialAt=now;
        if((user()?.isDead===true&&now-S.bossTrialAt>10000)||now-S.bossTrialAt>90000){
          S.bossFailures++;S.bossTrialAt=now;
          const lower=[...S.bossCandidates].reverse().find(level=>level<bossLevel);
          if(lower)bossLevel=lower;
        }
      }else if(!d.inside)S.bossTrialAt=0;
    }
// [VI dòng gốc 76] Kiểm tra !d.inside&&S.lease: đúng thì chạy nhánh sau if.
    if(!d.inside&&S.lease){
// [VI dòng gốc 77] Kiểm tra S.phase==='ENTERING'&&now-S.lastEntry<25000: đúng thì chạy nhánh sau if. | gọi arb()?.renew('combat') để gia hạn quyền đang giữ (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      if(S.phase==='ENTERING'&&now-S.lastEntry<25000){arb()?.renew?.('combat');return;}
// [VI dòng gốc 78] gọi release() để nhả quyền điều khiển đang giữ | gán S.phase bằng 'WAITING'
      release();S.phase='WAITING';
// [VI dòng gốc 79] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 80] Kiểm tra !d.known||[d.phoenix,d.dragon,d.boss].some(q=>q.remaining===null): đúng thì chạy nhánh sau if.
    if(!d.known||[d.phoenix,d.dragon,d.boss].some(q=>q.remaining===null)){
// [VI dòng gốc 81] gán S.reason bằng 'waiting_native_config_and_server_quotas' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      S.reason='waiting_native_config_and_server_quotas';return;
// [VI dòng gốc 82] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 83] Khai báo biến không gán lại bằng const: collections = gọi [d.phoenix,d.dragon].filter(q=>q.remaining>0) để giữ phần tử thỏa điều kiện
    const collections=[d.phoenix,d.dragon].filter(q=>q.remaining>0);
    // Main account: only a server-confirmed 3/3 boss quota completes this objective.
    // Exit once, then release the scene so the remaining Daily queue can proceed.
    if(actor==='10228867268946'&&d.boss.used>=3&&d.boss.remaining===0){
      if(d.inside){
        if(S.phase!=='EXITING')exit('three_server_confirmed_boss_kills');
        else S.reason='waiting_exit_confirmation';
      }else{
        if(S.lease)release();
        S.phase='DONE';S.reason='three_server_confirmed_boss_kills_daily_continue';
      }
      return;
    }
// [VI dòng gốc 84] Chú thích gốc của tác giả; không được thực thi. Nội dung: Clone hoàn thành thu thập tầng 2 trước, rồi ra map và vào tầng 1.
    // Clone hoàn thành thu thập tầng 2 trước, rồi ra map và vào tầng 1.
// [VI dòng gốc 85] Khai báo biến không gán lại bằng const: todo = gọi (bossLevel===500&&collections.length?collections:[d.phoenix,d.dragon,d.boss]).filter(q=>q.remaining>0) để giữ phần tử thỏa điều kiện
    const todo=(bossLevel===500&&collections.length?collections:[d.phoenix,d.dragon,d.boss]).filter(q=>q.remaining>0);
// [VI dòng gốc 86] Kiểm tra !d.inside: đúng thì chạy nhánh sau if.
    if(!d.inside){
// [VI dòng gốc 87] Kiểm tra W.KVPV_QUEST_PRIORITY?.blocks?.('beast_island'): đúng thì chạy nhánh sau if. | gán S.reason bằng 'priority_quest' | gọi release() để nhả quyền điều khiển đang giữ | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      if(W.KVPV_QUEST_PRIORITY?.blocks?.('beast_island')){S.reason='priority_quest';release();return;}
// [VI dòng gốc 88] Kiểm tra !todo.length: đúng thì chạy nhánh sau if. | gán S.phase bằng 'DONE' | gán S.reason bằng 'server_daily_quotas_completed' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      if(!todo.length){S.phase='DONE';S.reason='server_daily_quotas_completed';return;}
// [VI dòng gốc 89] Kiểm tra now-S.lastEntry<60000: đúng thì chạy nhánh sau if. | gán S.reason bằng 'entry_backoff' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      if(now-S.lastEntry<60000){S.reason='entry_backoff';return;}
// [VI dòng gốc 90] Khai báo biến không gán lại bằng const: job = đọc W.KVPV_DAILY?.quickState?.()?.job nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
      const job=W.KVPV_DAILY?.quickState?.()?.job;
// [VI dòng gốc 91] Kiểm tra job&&job!=='rảnh'&&job!=='ranh'||W._Ba?._$a?.SceneUtil?.isCommonScene!==true: đúng thì chạy nhánh sau if. | gán S.reason bằng 'other_activity' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      if(job&&job!=='rảnh'&&job!=='ranh'||W._Ba?._$a?.SceneUtil?.isCommonScene!==true){S.reason='other_activity';return;}
// [VI dòng gốc 92] Khai báo biến không gán lại bằng const: next = gọi todo.find(q=>model()?.getMABossIsLive?.(q.row[4],q===d.boss?1:2,q.row[1])===true) để tìm phần tử đầu tiên thỏa điều kiện
            const next=todo.find(q=>model()?.getMABossIsLive?.(q.row[4],q===d.boss?1:2,q.row[1])===true);
// [VI dòng gốc 93] Kiểm tra !next: đúng thì chạy nhánh sau if. | gán S.reason bằng 'waiting_respawn' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      if(!next){S.reason='waiting_respawn';return;}
// [VI dòng gốc 94] Khai báo biến không gán lại bằng const: tab = gọi cfg()?.getTabs?.().find(r=>r.type===49&&Number(r.lv)===Number(next.row[1])) để tìm phần tử đầu tiên thỏa điều kiện (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
      const tab=cfg()?.getTabs?.().find(r=>r.type===49&&Number(r.lv)===Number(next.row[1]));
// [VI dòng gốc 95] Kiểm tra !tab||W._Ba?._Do?._Ho?.inst?.getFcIsOpen?.(tab.actionOpenId)!==true: đúng thì chạy nhánh sau if. | gán S.reason bằng 'target_layer_locked' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      if(!tab||W._Ba?._Do?._Ho?.inst?.getFcIsOpen?.(tab.actionOpenId)!==true){S.reason='target_layer_locked';return;}
// [VI dòng gốc 96] Kiểm tra typeof rpc()?.rqEtScene!=='function'||!reserve(): đúng thì chạy nhánh sau if. | gán S.reason bằng 'scene_reserved' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      if(typeof rpc()?.rqEtScene!=='function'||!reserve()){S.reason='scene_reserved';return;}
// [VI dòng gốc 97] gán S.phase bằng 'ENTERING' | gán S.lastEntry bằng now
      S.phase='ENTERING';S.lastEntry=now;
// [VI dòng gốc 98] gọi model().setTempTargetOcc(next.row[4], next===d.boss?1:3) để đặt mục tiêu dự kiến trước khi chuyển cảnh | gọi rpc().rqEtScene(next.row[0], next.row[1]) để gửi yêu cầu vào/ra cảnh qua luồng native | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      model().setTempTargetOcc(next.row[4],next===d.boss?1:3);rpc().rqEtScene(next.row[0],next.row[1]);return;
// [VI dòng gốc 99] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 100] Kiểm tra S.phase==='EXITING': đúng thì chạy nhánh sau if. | gán S.reason bằng 'waiting_exit_confirmation' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(S.phase==='EXITING'){S.reason='waiting_exit_confirmation';return;}
// [VI dòng gốc 101] Kiểm tra !S.lease&&!reserve(): đúng thì chạy nhánh sau if. | gán S.reason bằng 'scene_reserved' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(!S.lease&&!reserve()){S.reason='scene_reserved';return;}
// [VI dòng gốc 102] Kiểm tra arb()?.renew?.('combat')!==true: đúng thì chạy nhánh sau if. | gọi release() để nhả quyền điều khiển đang giữ | gán S.reason bằng 'lease_lost' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(arb()?.renew?.('combat')!==true){release();S.reason='lease_lost';return;}
// [VI dòng gốc 103] gán S.phase bằng 'ACTIVE'
    S.phase='ACTIVE';
// [VI dòng gốc 104] Kiểm tra !todo.length: đúng thì chạy nhánh sau if. | gọi exit('daily_quotas_completed') | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(!todo.length){exit('daily_quotas_completed');return;}
// [VI dòng gốc 105] Kiểm tra user()?.isDead===true: đúng thì chạy nhánh sau if. | gán S.reason bằng 'waiting_native_revive' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(user()?.isDead===true){S.reason='waiting_native_revive';return;}
// [VI dòng gốc 106] Kiểm tra W._Ba?._K_t?._Z7t?.ins?.gathering: đúng thì chạy nhánh sau if. | gán S.reason bằng 'native_gathering' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(W._Ba?._K_t?._Z7t?.ins?.gathering){S.reason='native_gathering';return;}
// [VI dòng gốc 107] Khai báo biến không gán lại bằng const: m = gọi model()
    const m=model();
// [VI dòng gốc 108] Khai báo biến không gán lại bằng const: next = gọi todo.find(q=>Number(q.row[0])===d.map&&m.getMABossIsLive?.(q.row[4],q===d.boss?1:2,q.row[1])===true) để tìm phần tử đầu tiên thỏa điều kiện
    const next=todo.find(q=>Number(q.row[0])===d.map&&m.getMABossIsLive?.(q.row[4],q===d.boss?1:2,q.row[1])===true);
// [VI dòng gốc 109] Kiểm tra !next: đúng thì chạy nhánh sau if. | Kiểm tra todo.every(q=>Number(q.row[0])!==d.map): đúng thì chạy nhánh sau if. | gọi exit('switch_to_target_layer') | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(!next){if(todo.every(q=>Number(q.row[0])!==d.map)){exit('switch_to_target_layer');return;}S.reason='waiting_respawn';S.idleSince??=now;if(now-S.idleSince>45000)exit('respawn_wait_release_map');return;}
// [VI dòng gốc 110] gán S.idleSince bằng null
    S.idleSince=null;
// [VI dòng gốc 111] Khai báo biến không gán lại bằng const: occ = đọc next.row[4]
    const occ=next.row[4];
// [VI dòng gốc 112] Khai báo biến không gán lại bằng const: kind = nếu next===d.boss thì lấy 1, ngược lại lấy 3
    const kind=next===d.boss?1:3;
// [VI dòng gốc 113] Khai báo biến không gán lại bằng const: key = tính biểu thức kind+'/'+occ+'/'+next.used
    const key=kind+'/'+occ+'/'+next.used;
// [VI dòng gốc 114] Chú thích gốc của tác giả; không được thực thi. Nội dung: Native path/gather controls arrival. Không phát lại lệnh khi đang đi hoặc đã có mục tiêu sống.
    // Native path/gather controls arrival. Không phát lại lệnh khi đang đi hoặc đã có mục tiêu sống.
// [VI dòng gốc 115] Khai báo biến không gán lại bằng const: target = đọc user()?.selectTarget nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const target=user()?.selectTarget;
// [VI dòng gốc 116] Kiểm tra S.action===key&&(now-S.lastAction<8000||m.getMovePoint?.()||target?.isValid===true): đúng thì chạy nhánh sau if.
    if(S.action===key&&(now-S.lastAction<8000||m.getMovePoint?.()||target?.isValid===true)){
// [VI dòng gốc 117] gán S.reason bằng kind===1?'native_boss_'+bossLevel:'native_collect_path' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      S.bossCombatOcc=kind===1?Number(occ):null;
      S.reason=kind===1?'native_boss_'+bossLevel:'native_collect_path';return;
// [VI dòng gốc 118] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 119] Kiểm tra kind===3: đúng thì chạy nhánh sau if, sai thì chạy nhánh else.
    if(kind===3){
// [VI dòng gốc 120] Khai báo biến có thể gán lại bằng let: point = gọi m.getNpcPos(occ) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Khai báo biến không gán lại bằng const: nc = gọi cfg()?.getNpcInfo(occ) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
      let point=m.getNpcPos?.(occ);const nc=cfg()?.getNpcInfo?.(occ);
// [VI dòng gốc 121] Kiểm tra !point&&nc?.[5]===1&&Array.isArray(nc[4])&&W.Laya?.Point: đúng thì chạy nhánh sau if. | gán point bằng new W.Laya.Point(nc[4][0],nc[4][1])
      if(!point&&nc?.[5]===1&&Array.isArray(nc[4])&&W.Laya?.Point)point=new W.Laya.Point(nc[4][0],nc[4][1]);
// [VI dòng gốc 122] Kiểm tra !point: đúng thì chạy nhánh sau if. | gán S.reason bằng 'waiting_crystal_position' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      if(!point){S.reason='waiting_crystal_position';return;}
// [VI dòng gốc 123] gọi m.setNpcMovePoint(point, occ) để giao điểm đi đến NPC cho bộ di chuyển native
      m.setNpcMovePoint(point,occ);
// [VI dòng gốc 124] gọi m.setTarget(occ, 1, 49) để đặt mục tiêu qua đối tượng đang gọi
    }else m.setTarget(occ,1,49);
// [VI dòng gốc 125] gán S.action bằng key | gán S.lastAction bằng now | gán S.reason bằng kind===1?'native_boss_'+bossLevel:'native_collect_path'
    S.action=key;S.bossCombatOcc=kind===1?Number(occ):null;S.lastAction=now;S.reason=kind===1?'native_boss_'+bossLevel:'native_collect_path';
// [VI dòng gốc 126] Nhận lỗi bằng e và chạy phần xử lý lỗi. | gán S.lastError bằng String(e?.message||e) | gán S.reason bằng 'error'
  }catch(e){S.lastError=String(e?.message||e);S.reason='error';}}
// [VI dòng gốc 127] Chú thích gốc của tác giả; không được thực thi. Nội dung: Boss 800 chỉ dành cho acc chính theo lựa chọn của người dùng.
  // Boss 800 chỉ dành cho acc chính theo lựa chọn của người dùng.
// [VI dòng gốc 128] Định nghĩa hàm setBossLevel; tham số: level. Mục đích: đổi lựa chọn cấp boss cho nhân vật hiện tại
  function setBossLevel(level){
// [VI dòng gốc 129] gán level bằng Number(level)
    level=Number(level);
// [VI dòng gốc 130] Kiểm tra level!==500&&level!==750&&!(level===800&&actor==='10228867268946'): đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('Boss level: 500, 750; main account also supports 800')
    if(level!==500&&level!==750&&!(level===800&&actor==='10228867268946'))throw Error('Boss level: 500, 750; main account also supports 800');
// [VI dòng gốc 131] gán bossLevel bằng level
    bossLevel=level;
// [VI dòng gốc 132] gán S.action bằng ''
    S.action='';
// [VI dòng gốc 133] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | gọi W.localStorage?.setItem('KVPV_BEAST_BOSS_'+actor, String(level)) để ghi giá trị vào bộ lưu trữ (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Nhận lỗi bằng _ và chạy phần xử lý lỗi.
    try{W.localStorage?.setItem('KVPV_BEAST_BOSS_'+actor,String(level));}catch(_){}
// [VI dòng gốc 134] Kết thúc hàm hiện tại và trả về: gọi status() để trả trạng thái để kiểm tra.
    return status();
// [VI dòng gốc 135] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 136] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 137] Định nghĩa hàm status; tham số: không có. Mục đích: trả trạng thái để kiểm tra
  function basicCombatReady(target){
    if(!owned()||!S.enabled||!S.lease||S.phase!=='ACTIVE'||S.bossCombatOcc===null||
       user()?.isDead===true||W._Ba?._K_t?._Z7t?.ins?.gathering===true||
       arb()?.status?.()?.tag!==tag||!target||target.isValid===false)return false;
    const occ=Number(target.property?.get?.('occ'));
    if(occ!==S.bossCombatOcc||Number(target.property?.get?.('type'))!==1)return false;
    const hp=target.property?.get?.('hp');if(Array.isArray(hp)&&Number(hp[0])<=0)return false;
    const map=Number(W._C?._Mn?._Cn?.currentID??W._Ba?._$a?._yo?.ins?.intoSce?.[0]);
    return Number(W._ft?._po?.ins?.getCfgById?.(map)?.[7])===49;
  }
  function status(){
// [VI dòng gốc 138] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm enabled, phase, reason, collectionLayer, bossLevel, bossLayer, quota, lastError, allowKNB.
    return {
// [VI dòng gốc 139] Thuộc tính enabled: đọc S.enabled
      enabled:S.enabled,
// [VI dòng gốc 140] Thuộc tính phase: đọc S.phase
      phase:S.phase,
// [VI dòng gốc 141] Thuộc tính reason: đọc S.reason
      reason:S.reason,
// [VI dòng gốc 142] Thuộc tính collectionLayer: 2
      collectionLayer:2,
// [VI dòng gốc 143] Thuộc tính bossLevel: dùng biến cùng tên
      bossLevel,
      bossSelection:adaptive?'adaptive_server_outcome':'manual_level',
      availableBossLevels:[...S.bossCandidates],bossFailures:S.bossFailures,
// [VI dòng gốc 144] Thuộc tính bossLayer: gọi bossLayer() để tầng chứa boss được chọn
      bossLayer:bossLayer(),
// [VI dòng gốc 145] Thuộc tính quota: gọi snapshot() để đọc ảnh chụp trạng thái hiện tại
      quota:snapshot(),
// [VI dòng gốc 146] Thuộc tính lastError: đọc S.lastError
      lastError:S.lastError,
// [VI dòng gốc 147] Thuộc tính allowKNB: false
      allowKNB:false,
      basicCombat:{enabled:true,active:S.bossCombatOcc!==null&&S.lease,skillIds:[8001,8002,8003,8004,8005]}
// [VI dòng gốc 148] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    };
// [VI dòng gốc 149] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 150] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 151] Định nghĩa hàm stop; tham số: không có. Mục đích: dừng bộ điều khiển và dọn tài nguyên
  function stop(){
// [VI dòng gốc 152] gán S.enabled bằng false
    S.enabled=false;
// [VI dòng gốc 153] Kiểm tra S.timer!==null: đúng thì chạy nhánh sau if.
    if(S.timer!==null){
// [VI dòng gốc 154] gọi W.KVPV_V1?.timers?.clearInterval??W.clearInterval(S.timer)
      (W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);
// [VI dòng gốc 155] gán S.timer bằng null
      S.timer=null;
// [VI dòng gốc 156] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 157] gọi release() để nhả quyền điều khiển đang giữ
    release();
// [VI dòng gốc 158] gán S.phase bằng 'OFF'
    S.phase='OFF';
// [VI dòng gốc 159] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 160] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 161] Định nghĩa hàm start; tham số: không có. Mục đích: khởi động bộ điều khiển
  function start(){
// [VI dòng gốc 162] Kiểm tra S.timer!==null: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(S.timer!==null)return;
// [VI dòng gốc 163] gán S.enabled bằng true
    S.enabled=true;
// [VI dòng gốc 164] gán S.timer bằng (W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,1000)
    S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,1000);
// [VI dòng gốc 165] gọi tick() để xử lý một nhịp kiểm tra
    tick();
// [VI dòng gốc 166] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 167] Dòng trống để tách các phần, không có lệnh thực thi.

// [VI dòng gốc 168] gán W.KVPV_BEAST_ISLAND bằng Object.freeze({ start, stop, sync:tick, setBossLevel, status, _handoff:()=>({actor,bossLevel,lastEntry:S.lastEntry}) })
  W.KVPV_BEAST_ISLAND=Object.freeze({
// [VI dòng gốc 169] Thuộc tính start: dùng biến cùng tên
    start,
// [VI dòng gốc 170] Thuộc tính stop: dùng biến cùng tên
    stop,
// [VI dòng gốc 171] Thuộc tính sync: tick (xử lý một nhịp kiểm tra)
    sync:tick,
    basicCombatReady,
// [VI dòng gốc 172] Thuộc tính setBossLevel: dùng biến cùng tên
    setBossLevel,
// [VI dòng gốc 173] Thuộc tính status: dùng biến cùng tên
    status,
// [VI dòng gốc 174] Thuộc tính _handoff: tạo hàm với tham số (không có); mỗi lần gọi trả về tạo đối tượng gồm actor, bossLevel, lastEntry | Thuộc tính actor: dùng biến cùng tên | Thuộc tính bossLevel: dùng biến cùng tên | Thuộc tính lastEntry: đọc S.lastEntry
    _handoff:()=>({actor,bossLevel,lastEntry:S.lastEntry})
// [VI dòng gốc 175] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  });
// [VI dòng gốc 176] gọi start() để khởi động bộ điều khiển
  start();
// [VI dòng gốc 177] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: })();
})();
// [VI dòng gốc 178] Dòng trống để tách các phần, không có lệnh thực thi.
