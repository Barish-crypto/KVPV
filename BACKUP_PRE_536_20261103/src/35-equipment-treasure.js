// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: Native regular treasure categories only. Shares the type4 sender/ACK lock;
/* Native regular treasure categories only. Shares the type4 sender/ACK lock;
 * no duplicate RPC worker, no glory/event currency categories (9+).
 * Reward membership comes from native getItemShow pools, not guessed ID types. */
// [VI dòng gốc 4] chạy ngay hàm bao để tạo phạm vi và khởi tạo phần chức năng bên trong
(() => {
// [VI dòng gốc 5] "use strict"
  'use strict';
// [VI dòng gốc 6] Khai báo biến không gán lại bằng const: W = window | gọi W.KVPV_EQUIPMENT_TREASURE?.stop() để dừng bộ điều khiển và dọn tài nguyên (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  const W=window;W.KVPV_EQUIPMENT_TREASURE?.stop?.();
// [VI dòng gốc 7] Khai báo biến không gán lại bằng const: actor = gọi String(W.__KVPV_OWN_ACTOR_ID||'') để chuyển sang chuỗi; S = tạo đối tượng gồm enabled, timer, lastError; rewardCache = tạo đối tượng bằng Map()
  const actor=String(W.__KVPV_OWN_ACTOR_ID||''),S={enabled:true,timer:null,lastError:''},rewardCache=new Map();
// [VI dòng gốc 8] Chú thích gốc của tác giả; không được thực thi. Nội dung: Native _Rti routes: type0 ->93, type1 ->115, type2 ->116, type3 ->393.
  // Native _Rti routes: type0 ->93, type1 ->115, type2 ->116, type3 ->393.
// [VI dòng gốc 9] Khai báo biến không gán lại bằng const: categories = tạo mảng gồm 4 vị trí: [{type:0,panel:93,name:'Trang Bị'},{type:3,panel:393,name:'Phù Văn'}, {type:1,panel:115,name:'Đỉnh Cao'},{type:2,panel:116,name:'Chí Tôn'}]
  const categories=[{type:0,panel:93,name:'Trang Bị'},{type:3,panel:393,name:'Phù Văn'},
// [VI dòng gốc 10] Thuộc tính type: 1 | Thuộc tính panel: 115 | Thuộc tính name: "Đỉnh Cao" | Thuộc tính type: 2
    {type:1,panel:115,name:'Đỉnh Cao'},{type:2,panel:116,name:'Chí Tôn'}];
// [VI dòng gốc 11] Khai báo biến không gán lại bằng const: norm = tạo hàm với tham số x; mỗi lần gọi trả về gọi String(x||'').replace(/<[^>]*>/g,'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/gi,'d').toLowerCase()
  const norm=x=>String(x||'').replace(/<[^>]*>/g,'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/gi,'d').toLowerCase();
// [VI dòng gốc 12] Khai báo biến không gán lại bằng const: owned = tạo hàm với tham số (không có); mỗi lần gọi trả về actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'') và chỉ đánh giá vế phải khi vế trái truthy: !W.__KVPV_UNIVERSAL_HALTED
  const owned=()=>actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;
// [VI dòng gốc 13] Định nghĩa hàm classify; tham số: name | Khai báo biến không gán lại bằng const: n = gọi norm(name) | Kiểm tra /phap bao/.test(n): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: 4.
  function classify(name){const n=norm(name);if(/phap bao/.test(n))return 4;if(/phu van/.test(n))return 3;
// [VI dòng gốc 14] Kiểm tra /dinh cao/.test(n): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: 1. | Kiểm tra /chi ton/.test(n): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: 2.
    if(/dinh cao/.test(n))return 1;if(/chi ton/.test(n))return 2;if(/trang bi|vu khi|non|bao tay|day chuyen|vong tay/.test(n))return 0;return null;
// [VI dòng gốc 15] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 16] Định nghĩa hàm task; tham số: không có | Khai báo biến không gán lại bằng const: r = đọc W._Ba?._zIt?._FIt?.ins?.taskInfo nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Kiểm tra !Array.isArray(r): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: null.
  function task(){const r=W._Ba?._zIt?._FIt?.ins?.taskInfo;if(!Array.isArray(r))return null;
// [VI dòng gốc 17] Khai báo biến không gán lại bằng const: cfg = gọi W._ft?.__Z?.ins?.getTaskCfgById(r[0]) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Kết thúc hàm hiện tại và trả về: nếu cfg thì lấy {id:String(r[0]),state:Number(r[1]),name:String(cfg[1]||''),type:classify(cfg[1])}, ngược lại lấy null.
    const cfg=W._ft?.__Z?.ins?.getTaskCfgById?.(r[0]);return cfg?{id:String(r[0]),state:Number(r[1]),name:String(cfg[1]||''),type:classify(cfg[1])}:null;
// [VI dòng gốc 18] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 19] Định nghĩa hàm objective; tham số: không có | Khai báo biến không gán lại bằng const: dependency = gọi W.KVPV_REBORN_GOALS?.equipmentGoal() (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Kiểm tra dependency: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm các thuộc tính của dependency, type.
  function objective(){const dependency=W.KVPV_REBORN_GOALS?.equipmentGoal?.();if(dependency)return {...dependency,type:classify(dependency.name)};const q=task();if(q&&[0,1,2,3].includes(q.state))return [0,1,3].includes(q.state)&&q.type!==null?q:null;
// [VI dòng gốc 20] Khai báo biến không gán lại bằng const: rows = đọc W._Ba?._G_n?._U_n?.ins?.tasks nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const rows=W._Ba?._G_n?._U_n?.ins?.tasks;
// [VI dòng gốc 21] Duyệt từng giá trị trong Array.isArray(rows)?rows:[] bằng const r. | Khai báo biến không gán lại bằng const: r (chưa gán giá trị) | Kiểm tra Number(r?.[1])!==0: đúng thì chạy nhánh sau if. | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
    for(const r of Array.isArray(rows)?rows:[]){if(Number(r?.[1])!==0)continue;
// [VI dòng gốc 22] Khai báo biến không gán lại bằng const: cfg = gọi W._ft?._mei?.ins?.getXianweiTaskDataById(Number(r[0])) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); type = gọi classify(cfg?.[3])
      const cfg=W._ft?._mei?.ins?.getXianweiTaskDataById?.(Number(r[0])),type=classify(cfg?.[3]);
// [VI dòng gốc 23] Kiểm tra type!==null: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm id, state, type, name.
      if(type!==null)return {id:String(r[0]),state:0,type,name:String(cfg[3])};
// [VI dòng gốc 24] Kết thúc hàm hiện tại và trả về: null.
    }return null;
// [VI dòng gốc 25] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 26] Định nghĩa hàm allowed; tham số: type | Kiểm tra !S.enabled||!owned(): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: false. | Khai báo biến không gán lại bằng const: dependency = gọi W.KVPV_REBORN_GOALS?.equipmentGoal() (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  function allowed(type){if(!S.enabled||!owned())return false;const dependency=W.KVPV_REBORN_GOALS?.equipmentGoal?.();if(dependency)return classify(dependency.name)===type;const q=task();
// [VI dòng gốc 27] Kiểm tra q&&[0,1,2,3].includes(q.state): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: [0,1,3].includes(q.state) và chỉ đánh giá vế phải khi vế trái truthy: q.type===type.
    if(q&&[0,1,2,3].includes(q.state))return [0,1,3].includes(q.state)&&q.type===type;
// [VI dòng gốc 28] Khai báo biến không gán lại bằng const: goal = gọi objective() | Kết thúc hàm hiện tại và trả về: nếu goal thì lấy goal.type===type, ngược lại lấy !W.KVPV_QUEST_PRIORITY?.hasPriority?.().
    const goal=objective();return goal?goal.type===type:!W.KVPV_QUEST_PRIORITY?.hasPriority?.();
// [VI dòng gốc 29] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 30] Định nghĩa hàm itemKnown; tham số: type, id
  function itemKnown(type,id){
// [VI dòng gốc 31] Kiểm tra !rewardCache.has(type): đúng thì chạy nhánh sau if.
    if(!rewardCache.has(type)){
// [VI dòng gốc 32] Khai báo biến không gán lại bằng const: rows = gọi W._ft?._oZ?.ins?.getItemShow(type) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); ids = tạo đối tượng bằng Set()
      const rows=W._ft?._oZ?.ins?.getItemShow?.(type),ids=new Set();
// [VI dòng gốc 33] Kiểm tra Array.isArray(rows): đúng thì chạy nhánh sau if. | Duyệt từng giá trị trong rows bằng const r. | Khai báo biến không gán lại bằng const: r (chưa gán giá trị)
      if(Array.isArray(rows))for(const r of rows){
// [VI dòng gốc 34] Duyệt từng giá trị trong Array.isArray(r?.[3])?r[3]:[] bằng const entry. | Khai báo biến không gán lại bằng const: entry (chưa gán giá trị) | Kiểm tra Number.isSafeInteger(Number(entry?.[0])): đúng thì chạy nhánh sau if. | gọi ids.add(Number(entry[0]))
        for(const entry of Array.isArray(r?.[3])?r[3]:[])if(Number.isSafeInteger(Number(entry?.[0])))ids.add(Number(entry[0]));
// [VI dòng gốc 35] Duyệt từng giá trị trong Array.isArray(r?.[4])?r[4]:[] bằng const item. | Khai báo biến không gán lại bằng const: item (chưa gán giá trị) | Kiểm tra Number.isSafeInteger(Number(item)): đúng thì chạy nhánh sau if. | gọi ids.add(Number(item))
        for(const item of Array.isArray(r?.[4])?r[4]:[])if(Number.isSafeInteger(Number(item)))ids.add(Number(item));
// [VI dòng gốc 36] Kiểm tra ids.size: đúng thì chạy nhánh sau if. | gọi rewardCache.set(type, ids)
      }if(ids.size)rewardCache.set(type,ids);
// [VI dòng gốc 37] Kết thúc hàm hiện tại và trả về: tính biểu thức rewardCache.get(type)?.has(id)===true.
    }return rewardCache.get(type)?.has(id)===true;
// [VI dòng gốc 38] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 39] Định nghĩa hàm materialPlan; tham số: không có
  function materialPlan(){
// [VI dòng gốc 40] Kiểm tra !S.enabled||!owned(): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: null. | Khai báo biến không gán lại bằng const: goal = gọi objective() | Kiểm tra !goal||!categories.some(x=>x.type===goal.type): đúng thì chạy nhánh sau if.
    if(!S.enabled||!owned())return null;const goal=objective();if(!goal||!categories.some(x=>x.type===goal.type))return null;
// [VI dòng gốc 41] Khai báo biến không gán lại bằng const: info = gọi W.KVPV_FABAO_TREASURE?.inspectType(goal.type) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Kiểm tra !info||info.draw.ready||info.warehouse: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: null.
    const info=W.KVPV_FABAO_TREASURE?.inspectType?.(goal.type);if(!info||info.draw.ready||info.warehouse)return null;
// [VI dòng gốc 42] Khai báo biến không gán lại bằng const: key = đọc info.draw.key; item = gọi W._ft?._mY?.ins?.getItemCfgById(key) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); ways = đọc item?.[14] nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); dungeons = W.KVPV_DAILY_TRIAL?.status?.()?.dungeons hoặc dùng vế phải khi vế trái là null/undefined: []
    const key=info.draw.key,item=W._ft?._mY?.ins?.getItemCfgById?.(key),ways=item?.[14],dungeons=W.KVPV_DAILY_TRIAL?.status?.()?.dungeons??[];
// [VI dòng gốc 43] Khai báo biến không gán lại bằng const: sources = tạo mảng gồm 0 vị trí: []
    const sources=[];
// [VI dòng gốc 44] Duyệt từng giá trị trong Array.isArray(ways)?ways:[] bằng const id. | Khai báo biến không gán lại bằng const: id (chưa gán giá trị) | Khai báo biến không gán lại bằng const: cfg = gọi W._ft?._Bwt?.ins?.getCfgById(id) để tra cấu hình theo ID bằng API client (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Kiểm tra !cfg: đúng thì chạy nhánh sau if.
    for(const id of Array.isArray(ways)?ways:[]){const cfg=W._ft?._Bwt?.ins?.getCfgById?.(id);if(!cfg)continue;
// [VI dòng gốc 45] Khai báo biến không gán lại bằng const: action = gọi Number(cfg[3]?.[0]) để chuyển sang số; map = gọi Number(cfg[5]) để chuyển sang số; direct = !cfg[3]?.length và chỉ đánh giá vế phải khi vế trái truthy: !cfg[4]?.length
      const action=Number(cfg[3]?.[0]),map=Number(cfg[5]),direct=!cfg[3]?.length&&!cfg[4]?.length;
// [VI dòng gốc 46] Khai báo biến không gán lại bằng const: d = gọi dungeons.find(d=>direct?d.id===map:d.feature===action) để tìm phần tử đầu tiên thỏa điều kiện
      const d=dungeons.find(d=>direct?d.id===map:d.feature===action);
// [VI dòng gốc 47] Kiểm tra d?.known&&d.unlocked&&d.taskAllowed&&d.remaining>0&&Number.isSafeInteger(d.level)&&d.level>0: đúng thì chạy nhánh sau if. | gọi sources.push({id,dungeon:d.id,key}) để thêm phần tử vào cuối mảng
      if(d?.known&&d.unlocked&&d.taskAllowed&&d.remaining>0&&Number.isSafeInteger(d.level)&&d.level>0)sources.push({id,dungeon:d.id,key});
// [VI dòng gốc 48] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 49] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm goal, key, sources, reason.
    return {goal,key,sources,reason:sources.length?'farm_verified_key_source':'missing_key_source_not_supported'};
// [VI dòng gốc 50] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 51] Định nghĩa hàm materialDungeon; tham số: không có | Kết thúc hàm hiện tại và trả về: materialPlan()?.sources?.[0]?.dungeon hoặc dùng vế phải khi vế trái là null/undefined: null.
  function materialDungeon(){return materialPlan()?.sources?.[0]?.dungeon??null;}
// [VI dòng gốc 52] Định nghĩa hàm sync; tham số: không có | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | Kiểm tra !S.enabled: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  function sync(){try{if(!S.enabled)return;if(!owned()){stop();return;}
// [VI dòng gốc 53] Khai báo biến không gán lại bằng const: api = đọc W.KVPV_FABAO_TREASURE | Kiểm tra !api?.registerType: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    const api=W.KVPV_FABAO_TREASURE;if(!api?.registerType)return;
// [VI dòng gốc 54] Duyệt từng giá trị trong categories bằng const d. | Khai báo biến không gán lại bằng const: d (chưa gán giá trị) | gọi api.registerType({...d,allowed:()=>allowed(d.type),itemKnown:id=>itemKnown(d.type,id)})
    for(const d of categories)api.registerType({...d,allowed:()=>allowed(d.type),itemKnown:id=>itemKnown(d.type,id)});
// [VI dòng gốc 55] gọi api.sync()
    api.sync();
// [VI dòng gốc 56] Nhận lỗi bằng e và chạy phần xử lý lỗi. | gán S.lastError bằng String(e)
  }catch(e){S.lastError=String(e);}}
// [VI dòng gốc 57] Định nghĩa hàm stop; tham số: không có. Mục đích: dừng bộ điều khiển và dọn tài nguyên | gán S.enabled bằng false | Kiểm tra S.timer!==null: đúng thì chạy nhánh sau if. | gọi W.KVPV_V1?.timers?.clearInterval??W.clearInterval(S.timer)
  function stop(){S.enabled=false;if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;}
// [VI dòng gốc 58] gán W.KVPV_EQUIPMENT_TREASURE bằng Object.freeze({sync,stop,materialDungeon, status:()=>({enabled:S.enabled,actor,objective:objective(),categories:categories.map(d=>({...d,allowed:allowed(d.type),...W.KVPV_FABAO_TRE…
  W.KVPV_EQUIPMENT_TREASURE=Object.freeze({sync,stop,materialDungeon,
// [VI dòng gốc 59] Thuộc tính status: tạo hàm với tham số (không có); mỗi lần gọi trả về tạo đối tượng gồm enabled, actor, objective, categories, materials, lastError, allowKNB | Thuộc tính enabled: đọc S.enabled | Thuộc tính actor: dùng biến cùng tên | Thuộc tính objective: gọi objective()
    status:()=>({enabled:S.enabled,actor,objective:objective(),categories:categories.map(d=>({...d,allowed:allowed(d.type),...W.KVPV_FABAO_TREASURE?.inspectType?.(d.type)})),
// [VI dòng gốc 60] Thuộc tính materials: gọi materialPlan() | Thuộc tính lastError: đọc S.lastError | Thuộc tính allowKNB: false
      materials:materialPlan(),lastError:S.lastError,allowKNB:false})});
// [VI dòng gốc 61] gán S.timer bằng (W.KVPV_V1?.timers?.setInterval??W.setInterval)(sync,1000) | gọi sync()
  S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(sync,1000);sync();
// [VI dòng gốc 62] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: })();
})();
// [VI dòng gốc 63] Dòng trống để tách các phần, không có lệnh thực thi.
