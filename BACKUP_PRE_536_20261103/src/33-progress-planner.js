// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: Explicit dependency graph, initially Pháp Bảo cultivation goals.
/* Explicit dependency graph, initially Pháp Bảo cultivation goals.
 * Goal -> positive cultivation upgrade -> owned materials or native item source.
 * Source routing is restricted to existing free Daily Trial executors. */
// [VI dòng gốc 4] chạy ngay hàm bao để tạo phạm vi và khởi tạo phần chức năng bên trong
(() => {
// [VI dòng gốc 5] "use strict"
  'use strict';
// [VI dòng gốc 6] Khai báo biến không gán lại bằng const: W = window; old = đọc W.KVPV_PROGRESS_PLANNER; carry = gọi old?._handoff(); chức năng nội bộ chưa xác minh từ tên hàm (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gọi old?.stop('reload') để dừng bộ điều khiển và dọn tài nguyên (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  const W=window,old=W.KVPV_PROGRESS_PLANNER,carry=old?._handoff?.();old?.stop?.('reload');
// [VI dòng gốc 7] Khai báo biến không gán lại bằng const: actor = gọi String(W.__KVPV_OWN_ACTOR_ID||'') để chuyển sang chuỗi
  const actor=String(W.__KVPV_OWN_ACTOR_ID||'');
// [VI dòng gốc 8] Khai báo biến không gán lại bằng const: same = tính biểu thức carry?.actor===actor
  const same=carry?.actor===actor;
// [VI dòng gốc 9] Khai báo biến không gán lại bằng const: S = tạo đối tượng gồm enabled, timer, plan, reason, lastError, towerOwned, lastTowerKey
  const S={enabled:true,timer:null,plan:null,reason:'waiting_goal',lastError:'',towerOwned:same?carry.towerOwned:false,lastTowerKey:same?carry.lastTowerKey:null};
// [VI dòng gốc 10] Khai báo biến không gán lại bằng const: norm = tạo hàm với tham số x; mỗi lần gọi trả về gọi String(x||'').replace(/<[^>]*>/g,'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/gi,'d').toLowerCase()
  const norm=x=>String(x||'').replace(/<[^>]*>/g,'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/gi,'d').toLowerCase();
// [VI dòng gốc 11] Khai báo biến không gán lại bằng const: matches = tạo hàm với tham số n; mỗi lần gọi trả về /phap bao/.test(norm(n)) và chỉ đánh giá vế phải khi vế trái truthy: /tu vi/.test(norm(n))
  const matches=n=>/phap bao/.test(norm(n))&&/tu vi/.test(norm(n));
// [VI dòng gốc 12] Khai báo biến không gán lại bằng const: good = tạo hàm với tham số x; mỗi lần gọi trả về Number.isFinite(x) và chỉ đánh giá vế phải khi vế trái truthy: x>=0
  const good=x=>Number.isFinite(x)&&x>=0;
// [VI dòng gốc 13] Khai báo biến không gán lại bằng const: owned = tạo hàm với tham số (không có); mỗi lần gọi trả về actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'') và chỉ đánh giá vế phải khi vế trái truthy: !W.__KVPV_UNIVERSAL_HALTED
  const owned=()=>actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;
// [VI dòng gốc 14] Định nghĩa hàm goals; tham số: không có
  function goals(){
// [VI dòng gốc 15] Khai báo biến không gán lại bằng const: dependency = gọi W.KVPV_REBORN_GOALS?.fabaoGoal() (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Kiểm tra dependency: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: tạo mảng gồm 1 vị trí: [dependency].
    const dependency=W.KVPV_REBORN_GOALS?.fabaoGoal?.();if(dependency)return [dependency];
// [VI dòng gốc 16] Khai báo biến không gán lại bằng const: result = tạo mảng gồm 0 vị trí: []; row = đọc W._Ba?._zIt?._FIt?.ins?.taskInfo nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const result=[],row=W._Ba?._zIt?._FIt?.ins?.taskInfo;
// [VI dòng gốc 17] Kiểm tra Array.isArray(row): đúng thì chạy nhánh sau if.
    if(Array.isArray(row)){
// [VI dòng gốc 18] Khai báo biến không gán lại bằng const: cfg = gọi W._ft?.__Z?.ins?.getTaskCfgById(row[0]) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); name = gọi String(cfg?.[1]||'') để chuyển sang chuỗi
      const cfg=W._ft?.__Z?.ins?.getTaskCfgById?.(row[0]),name=String(cfg?.[1]||'');
// [VI dòng gốc 19] Kiểm tra matches(name): đúng thì chạy nhánh sau if, sai thì chạy nhánh else.
      if(matches(name)){
// [VI dòng gốc 20] Khai báo biến không gán lại bằng const: text = gọi norm(name); m = gọi /(?:tu vi\s*(?:phap bao)?\s*(?:dat|den)?\s*[:：]?\s*)(\d[\d.,]*)|(?:dat\s*)(\d[\d.,]*)\s*(?:diem\s*)?tu vi/.exec(text)
        const text=norm(name),m=/(?:tu vi\s*(?:phap bao)?\s*(?:dat|den)?\s*[:：]?\s*)(\d[\d.,]*)|(?:dat\s*)(\d[\d.,]*)\s*(?:diem\s*)?tu vi/.exec(text);
// [VI dòng gốc 21] Khai báo biến không gán lại bằng const: target = gọi Number((m?.[1]||m?.[2]||'').replace(/[.,]/g,'')) để chuyển sang số
        const target=Number((m?.[1]||m?.[2]||'').replace(/[.,]/g,''));
// [VI dòng gốc 22] gọi result.push({source:'MAIN',id:String(row[0]),state:Number(row[1]),name,target:target>0?target:null,progress:null,claimState:2}) để thêm phần tử vào cuối mảng
        result.push({source:'MAIN',id:String(row[0]),state:Number(row[1]),name,target:target>0?target:null,progress:null,claimState:2});
// [VI dòng gốc 23] Kiểm tra cfg&&[0,1,2,3].includes(Number(row[1])): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: tạo mảng gồm 0 vị trí: [].
      }else if(cfg&&[0,1,2,3].includes(Number(row[1])))return [];
// [VI dòng gốc 24] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 25] Khai báo biến không gán lại bằng const: tasks = đọc W._Ba?._G_n?._U_n?.ins?.tasks nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const tasks=W._Ba?._G_n?._U_n?.ins?.tasks;
// [VI dòng gốc 26] Duyệt từng giá trị trong Array.isArray(tasks)?tasks:[] bằng const r. | Khai báo biến không gán lại bằng const: r (chưa gán giá trị) | Khai báo biến không gán lại bằng const: cfg = gọi W._ft?._mei?.ins?.getXianweiTaskDataById(Number(r?.[0])) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    for(const r of Array.isArray(tasks)?tasks:[]){const cfg=W._ft?._mei?.ins?.getXianweiTaskDataById?.(Number(r?.[0]));
// [VI dòng gốc 27] Kiểm tra matches(cfg?.[3])&&[0,1].includes(Number(r?.[1])): đúng thì chạy nhánh sau if. | gọi result.push({source:'TIEN_VI',id:String(r[0]),state:Number(r[1]),name:String(cfg[3]), target:Number(cfg[12])>0?Number(cfg[12]):null,…) để thêm phần tử vào cuối mảng
      if(matches(cfg?.[3])&&[0,1].includes(Number(r?.[1])))result.push({source:'TIEN_VI',id:String(r[0]),state:Number(r[1]),name:String(cfg[3]),
// [VI dòng gốc 28] Thuộc tính target: nếu Number(cfg[12])>0 thì lấy Number(cfg[12]), ngược lại lấy null | Thuộc tính progress: nếu good(Number(r[2])) thì lấy Number(r[2]), ngược lại lấy null | Thuộc tính claimState: 1
        target:Number(cfg[12])>0?Number(cfg[12]):null,progress:good(Number(r[2]))?Number(r[2]):null,claimState:1});
// [VI dòng gốc 29] Kết thúc hàm hiện tại và trả về: result.
    }return result;
// [VI dòng gốc 30] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 31] Định nghĩa hàm sources; tham số: itemId
  function sources(itemId){
// [VI dòng gốc 32] Khai báo biến không gán lại bằng const: item = gọi W._ft?._mY?.ins?.getItemCfgById(itemId) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); ids = đọc item?.[14] nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const item=W._ft?._mY?.ins?.getItemCfgById?.(itemId),ids=item?.[14];
// [VI dòng gốc 33] Kiểm tra !Array.isArray(ids): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: tạo mảng gồm 0 vị trí: [].
    if(!Array.isArray(ids))return [];
// [VI dòng gốc 34] Khai báo biến không gán lại bằng const: dungeons = W.KVPV_DAILY_TRIAL?.status?.()?.dungeons hoặc dùng vế phải khi vế trái là null/undefined: []
    const dungeons=W.KVPV_DAILY_TRIAL?.status?.()?.dungeons??[];
// [VI dòng gốc 35] Kết thúc hàm hiện tại và trả về: gọi ids.filter(Number.isSafeInteger).map(id=>{ const cfg=W._ft?._Bwt?.ins?.getCfgById?.(id),action=Number(cfg?.[3]?.[0]),map=Number(cfg?.[5]); // Native getWayJu…) để biến đổi từng phần tử.
    return ids.filter(Number.isSafeInteger).map(id=>{
// [VI dòng gốc 36] Khai báo biến không gán lại bằng const: cfg = gọi W._ft?._Bwt?.ins?.getCfgById(id) để tra cấu hình theo ID bằng API client (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); action = gọi Number(cfg?.[3]?.[0]) để chuyển sang số; map = gọi Number(cfg?.[5]) để chuyển sang số
      const cfg=W._ft?._Bwt?.ins?.getCfgById?.(id),action=Number(cfg?.[3]?.[0]),map=Number(cfg?.[5]);
// [VI dòng gốc 37] Chú thích gốc của tác giả; không được thực thi. Nội dung: Native getWayJump1 prefers action, then panel, then map; do not treat a
      // Native getWayJump1 prefers action, then panel, then map; do not treat a
// [VI dòng gốc 38] Chú thích gốc của tác giả; không được thực thi. Nội dung: map field as executable if the actual native route chooses something else.
      // map field as executable if the actual native route chooses something else.
// [VI dòng gốc 39] Khai báo biến không gán lại bằng const: direct = cfg&&!(cfg[3]?.length) và chỉ đánh giá vế phải khi vế trái truthy: !(cfg[4]?.length)
      const direct=cfg&&!(cfg[3]?.length)&&!(cfg[4]?.length);
// [VI dòng gốc 40] Khai báo biến không gán lại bằng const: d = gọi dungeons.find(d=>direct?d.id===map:d.feature===action) để tìm phần tử đầu tiên thỏa điều kiện
      const d=dungeons.find(d=>direct?d.id===map:d.feature===action);
// [VI dòng gốc 41] Khai báo biến không gán lại bằng const: ready = !!d&&d.known&&d.unlocked&&d.taskAllowed&&d.remaining>0&&Number.isSafeInteger(d.level) và chỉ đánh giá vế phải khi vế trái truthy: d.level>0
      const ready=!!d&&d.known&&d.unlocked&&d.taskAllowed&&d.remaining>0&&Number.isSafeInteger(d.level)&&d.level>0;
// [VI dòng gốc 42] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm id, itemId, action, map, executor, dungeon, reason, ready.
      return {id,itemId,action,map,executor:d?'daily_trial':null,dungeon:d?.id??null,
// [VI dòng gốc 43] Thuộc tính reason: nếu ready thì lấy 'free_material_challenge', ngược lại lấy d?'source_locked_or_no_free_turn':'unverified_source' | Thuộc tính ready: dùng biến cùng tên
        reason:ready?'free_material_challenge':d?'source_locked_or_no_free_turn':'unverified_source',ready};
// [VI dòng gốc 44] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    });
// [VI dòng gốc 45] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 46] Định nghĩa hàm inspect; tham số: không có
  function inspect(){
// [VI dòng gốc 47] Khai báo biến không gán lại bằng const: goal = đọc goals()[0] | Kiểm tra !goal: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm reason, goal, upgrades.
    const goal=goals()[0];if(!goal)return {reason:'no_fabao_cultivation_goal',goal:null,upgrades:[]};
// [VI dòng gốc 48] Kiểm tra goal.state===goal.claimState: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm reason, goal, upgrades.
    if(goal.state===goal.claimState)return {reason:'waiting_existing_reward_queue',goal,upgrades:[]};
// [VI dòng gốc 49] Khai báo biến không gán lại bằng const: rise = gọi W._Ba?._rnt?._vnt?.ins?.getAmuletRise() (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); nativeTuVi = gọi Number(rise?.[1]) để chuyển sang số
    const rise=W._Ba?._rnt?._vnt?.ins?.getAmuletRise?.(),nativeTuVi=Number(rise?.[1]);
// [VI dòng gốc 50] Khai báo biến không gán lại bằng const: current = nếu goal.source!=='MAIN' thì lấy goal.progress, ngược lại lấy good(nativeTuVi)?nativeTuVi:null
    const current=goal.source!=='MAIN'?goal.progress:good(nativeTuVi)?nativeTuVi:null;
// [VI dòng gốc 51] Khai báo biến không gán lại bằng const: remaining = nếu current!==null&&goal.target!==null thì lấy Math.max(0,goal.target-current), ngược lại lấy null
    const remaining=current!==null&&goal.target!==null?Math.max(0,goal.target-current):null;
// [VI dòng gốc 52] Kiểm tra remaining===0: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm reason, goal, current, nativeTuVi, remaining, upgrades.
    if(remaining===0)return {reason:'waiting_server_goal_ack',goal,current,nativeTuVi,remaining,upgrades:[]};
// [VI dòng gốc 53] Kiểm tra remaining===null: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm reason, goal, current, nativeTuVi, remaining, upgrades.
    if(remaining===null)return {reason:'waiting_verified_goal_progress',goal,current,nativeTuVi,remaining,upgrades:[]};
// [VI dòng gốc 54] Khai báo biến không gán lại bằng const: cfg = đọc W._ft?._s$?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); bag = đọc W._Ba?._Ic?._aQ?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const cfg=W._ft?._s$?.ins,bag=W._Ba?._Ic?._aQ?.ins;
// [VI dòng gốc 55] Khai báo biến không gán lại bằng const: upgrades = gọi (W.KVPV_FABAO_FAST?.inspect?.()??[]).filter(x=>x.level>0&&x.level<x.max).map(x=>{ const a=cfg?.getCfgByIdLevel?.(x.id,x.level),b=cfg?.getCfgByIdLevel?.(x.id,x.level+1),gain=Number(…(x=>x.gain!==null) để giữ phần tử thỏa điều kiện
    const upgrades=(W.KVPV_FABAO_FAST?.inspect?.()??[]).filter(x=>x.level>0&&x.level<x.max).map(x=>{
// [VI dòng gốc 56] Khai báo biến không gán lại bằng const: a = gọi cfg?.getCfgByIdLevel(x.id, x.level) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); b = gọi cfg?.getCfgByIdLevel(x.id, x.level+1) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); gain = tính biểu thức Number(b?.[5])-Number(a?.[5])
      const a=cfg?.getCfgByIdLevel?.(x.id,x.level),b=cfg?.getCfgByIdLevel?.(x.id,x.level+1),gain=Number(b?.[5])-Number(a?.[5]);
// [VI dòng gốc 57] Khai báo biến không gán lại bằng const: fragment = gọi Number(a?.[4]) để chuyển sang số; cost = gọi Number(a?.[3]?.[1]) để chuyển sang số; ownedItem = gọi Number(bag?.getItemCountById?.(x.id)) để chuyển sang số; ownedFragment = gọi Number(bag?.getItemCountById?.(fragment)) để chuyển sang số
      const fragment=Number(a?.[4]),cost=Number(a?.[3]?.[1]),ownedItem=Number(bag?.getItemCountById?.(x.id)),ownedFragment=Number(bag?.getItemCountById?.(fragment));
// [VI dòng gốc 58] Khai báo biến không gán lại bằng const: known = Number.isSafeInteger(cost)&&cost>0&&good(ownedItem)&&good(ownedFragment)&&good(gain) và chỉ đánh giá vế phải khi vế trái truthy: gain>0
      const known=Number.isSafeInteger(cost)&&cost>0&&good(ownedItem)&&good(ownedFragment)&&good(gain)&&gain>0;
// [VI dòng gốc 59] Khai báo biến không gán lại bằng const: missing = nếu known thì lấy Math.max(0,cost-ownedItem-ownedFragment), ngược lại lấy null
      const missing=known?Math.max(0,cost-ownedItem-ownedFragment):null;
// [VI dòng gốc 60] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm id, level, gain, cost, fragment, ownedItem, ownedFragment, missing, ready, reason, sources.
      return {id:x.id,level:x.level,gain:known?gain:null,cost,fragment,ownedItem,ownedFragment,missing,
// [VI dòng gốc 61] Thuộc tính ready: known và chỉ đánh giá vế phải khi vế trái truthy: missing===0 | Thuộc tính reason: nếu !known thì lấy 'unknown_upgrade_cost_or_gain', ngược lại lấy missing?'missing_materials':'upgrade_owned_materials'
        ready:known&&missing===0,reason:!known?'unknown_upgrade_cost_or_gain':missing?'missing_materials':'upgrade_owned_materials',
// [VI dòng gốc 62] Thuộc tính sources: nếu known&&missing thì lấy sources(fragment), ngược lại lấy []
        sources:known&&missing?sources(fragment):[]};
// [VI dòng gốc 63] Định nghĩa hàm hàm không đặt tên; tham số: x
    }).filter(x=>x.gain!==null);
// [VI dòng gốc 64] Khai báo biến không gán lại bằng const: ready = gọi upgrades.find(x=>x.ready) để tìm phần tử đầu tiên thỏa điều kiện; exact = gọi upgrades.flatMap(x=>x.sources).find(x=>x.ready) để tìm phần tử đầu tiên thỏa điều kiện
    const ready=upgrades.find(x=>x.ready),exact=upgrades.flatMap(x=>x.sources).find(x=>x.ready);
// [VI dòng gốc 65] Khai báo biến không gán lại bằng const: tower = gọi W.KVPV_LINHLUNG922?.status(false) để trả trạng thái để kiểm tra (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const tower=W.KVPV_LINHLUNG922?.status?.(false);
// [VI dòng gốc 66] Khai báo biến không gán lại bằng const: towerSource = nếu upgrades.some(x=>x.missing>0)&&Number.isSafeInteger(tower?.highestFloor)&&Number.isSafeInteger(tower?.nextFloor)&&tower.nextFloor>tower.highestFloor&&typeof W.KVPV_LINHLUNG_TH?.sta… thì lấy {executor:'linh_lung',targetFloor:tower.nextFloor,currentFloor:tower.highestFloor,ready:true,reason:'user_confirmed_free_treasure_key_source',reward:'treasure_key',next:'fabao_trea…, ngược lại lấy null
    const towerSource=upgrades.some(x=>x.missing>0)&&Number.isSafeInteger(tower?.highestFloor)&&Number.isSafeInteger(tower?.nextFloor)&&tower.nextFloor>tower.highestFloor&&typeof W.KVPV_LINHLUNG_TH?.start==='function'?
// [VI dòng gốc 67] Thuộc tính executor: "linh_lung" | Thuộc tính targetFloor: đọc tower.nextFloor | Thuộc tính currentFloor: đọc tower.highestFloor | Thuộc tính ready: true
      {executor:'linh_lung',targetFloor:tower.nextFloor,currentFloor:tower.highestFloor,ready:true,reason:'user_confirmed_free_treasure_key_source',reward:'treasure_key',next:'fabao_treasure_type4',specificDropVerified:false}:null;
// [VI dòng gốc 68] Khai báo biến không gán lại bằng const: source = towerSource hoặc dùng vế phải khi vế trái là null/undefined: exact
    const source=towerSource??exact;
// [VI dòng gốc 69] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm goal, current, nativeTuVi, remaining, upgrades, selected, source, reason.
    return {goal,current,nativeTuVi,remaining,upgrades,selected:ready?.id??null,source:ready?null:source??null,
// [VI dòng gốc 70] Thuộc tính reason: nếu ready thì lấy 'upgrade_owned_materials', ngược lại lấy source?'farm_verified_material_source':upgrades.length?'missing_materials_no_verified_free_source':'no_verified_positive_upgrade'
      reason:ready?'upgrade_owned_materials':source?'farm_verified_material_source':upgrades.length?'missing_materials_no_verified_free_source':'no_verified_positive_upgrade'};
// [VI dòng gốc 71] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 72] Định nghĩa hàm materialDungeon; tham số: không có | Kiểm tra !S.enabled||!owned()||W.KVPV_FABAO_TREASURE?.hasWork?.(): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: null.
  function materialDungeon(){if(!S.enabled||!owned()||W.KVPV_FABAO_TREASURE?.hasWork?.())return null;
// [VI dòng gốc 73] Chú thích gốc của tác giả; không được thực thi. Nội dung: Recompute from native state so a newly obtained item stops further farming.
    // Recompute from native state so a newly obtained item stops further farming.
// [VI dòng gốc 74] Kết thúc hàm hiện tại và trả về: inspect().source?.dungeon hoặc dùng vế phải khi vế trái là null/undefined: null.
    return inspect().source?.dungeon??null;
// [VI dòng gốc 75] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 76] Định nghĩa hàm stopOwnedTower; tham số: không có
  function stopOwnedTower(){
// [VI dòng gốc 77] Kiểm tra !S.towerOwned: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: true.
    if(!S.towerOwned)return true;
// [VI dòng gốc 78] Khai báo biến không gán lại bằng const: t = đọc W.KVPV_LINHLUNG922; s = gọi t?.status(false) để trả trạng thái để kiểm tra (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const t=W.KVPV_LINHLUNG922,s=t?.status?.(false);
// [VI dòng gốc 79] Kiểm tra s?.pendingFloor||s?.pendingClaim||s?.active&&(s.unclaimedNormal>0||s.unclaimedLarge>0): đúng thì chạy nhánh sau if. | gán S.reason bằng 'waiting_tower_battle_or_reward_ack' | Kết thúc hàm hiện tại và trả về: false.
    if(s?.pendingFloor||s?.pendingClaim||s?.active&&(s.unclaimedNormal>0||s.unclaimedLarge>0)){S.reason='waiting_tower_battle_or_reward_ack';return false;}
// [VI dòng gốc 80] Kiểm tra s?.active: đúng thì chạy nhánh sau if. | gọi t.stop('Pháp Bảo: kiểm tra lại vật phẩm và nhiệm vụ') để dừng bộ điều khiển và dọn tài nguyên (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gán S.towerOwned bằng false | Kết thúc hàm hiện tại và trả về: true.
    if(s?.active)t.stop?.('Pháp Bảo: kiểm tra lại vật phẩm và nhiệm vụ');S.towerOwned=false;return true;
// [VI dòng gốc 81] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 82] Định nghĩa hàm farmTower; tham số: source
  function farmTower(source){
// [VI dòng gốc 83] Khai báo biến không gán lại bằng const: t = đọc W.KVPV_LINHLUNG922; s = gọi t?.status(false) để trả trạng thái để kiểm tra (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const t=W.KVPV_LINHLUNG922,s=t?.status?.(false);
// [VI dòng gốc 84] Kiểm tra s?.active: đúng thì chạy nhánh sau if, sai thì chạy nhánh else.
    if(s?.active){
// [VI dòng gốc 85] Kiểm tra !S.towerOwned: đúng thì chạy nhánh sau if. | gán S.reason bằng 'existing_tower_run_preserved' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      if(!S.towerOwned){S.reason='existing_tower_run_preserved';return;}
// [VI dòng gốc 86] Kiểm tra s.highestFloor>=s.targetFloor: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | Kiểm tra !stopOwnedTower(): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      if(s.highestFloor>=s.targetFloor){if(!stopOwnedTower())return;}
// [VI dòng gốc 87] gán S.reason bằng 'tower_for_fabao_materials' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      else {S.reason='tower_for_fabao_materials';return;}
// [VI dòng gốc 88] Kiểm tra S.towerOwned: đúng thì chạy nhánh sau if. | gán S.towerOwned bằng false
    }else if(S.towerOwned)S.towerOwned=false;
// [VI dòng gốc 89] Khai báo biến không gán lại bằng const: key = tính biểu thức S.plan.goal.source+'/'+S.plan.goal.id+'/'+source.targetFloor
    const key=S.plan.goal.source+'/'+S.plan.goal.id+'/'+source.targetFloor;
// [VI dòng gốc 90] Kiểm tra S.lastTowerKey===key: đúng thì chạy nhánh sau if. | gán S.reason bằng 'tower_floor_already_attempted_no_restart' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(S.lastTowerKey===key){S.reason='tower_floor_already_attempted_no_restart';return;}
// [VI dòng gốc 91] Khai báo biến không gán lại bằng const: d = gọi W.KVPV_DAILY?.quickState() (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const d=W.KVPV_DAILY?.quickState?.();
// [VI dòng gốc 92] Kiểm tra W._Ba?._$a?.SceneUtil?.isCommonScene!==true||W._Ba?._$a?._yo?.ins?.isInMission===true|| W._Ba?._rJ?._O$?.ins?.isDead===true||d?.running!==true||!['rảnh','ranh'].includes(d.job)|| W…: đúng thì chạy nhánh sau if.
    if(W._Ba?._$a?.SceneUtil?.isCommonScene!==true||W._Ba?._$a?._yo?.ins?.isInMission===true||
// [VI dòng gốc 93] gọi ['rảnh','ranh'].includes(d.job) để kiểm tra dữ liệu có chứa giá trị
      W._Ba?._rJ?._O$?.ins?.isDead===true||d?.running!==true||!['rảnh','ranh'].includes(d.job)||
// [VI dòng gốc 94] gán S.reason bằng 'waiting_idle_for_material_tower' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      W.KVPV?.core?.scene?.status?.()?.owner||W.KVPV_UPGRADES?.busy?.()||W.KVPV_HITRUN1?.status?.(false)?.running){S.reason='waiting_idle_for_material_tower';return;}
// [VI dòng gốc 95] gán S.lastTowerKey bằng key | gán S.towerOwned bằng true
    S.lastTowerKey=key;S.towerOwned=true;
// [VI dòng gốc 96] gọi W.KVPV_LINHLUNG_TH.start({targetFloor:source.targetFloor,exclusiveDaily:true,autoClaim:true}) để khởi động bộ điều khiển | gán S.reason bằng 'tower_for_fabao_materials'
    W.KVPV_LINHLUNG_TH.start({targetFloor:source.targetFloor,exclusiveDaily:true,autoClaim:true});S.reason='tower_for_fabao_materials';
// [VI dòng gốc 97] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 98] Định nghĩa hàm sync; tham số: không có | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | Kiểm tra !S.enabled: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  function sync(){try{if(!S.enabled)return;if(!owned()){stop();return;}
// [VI dòng gốc 99] gán S.plan bằng inspect() | gán S.reason bằng S.plan.reason
    S.plan=inspect();S.reason=S.plan.reason;
// [VI dòng gốc 100] Kiểm tra W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true: đúng thì chạy nhánh sau if. | gán S.reason bằng 'priority_popup' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true){S.reason='priority_popup';return;}
// [VI dòng gốc 101] Kiểm tra W.KVPV_FABAO_TREASURE?.hasWork?.(): đúng thì chạy nhánh sau if.
    if(W.KVPV_FABAO_TREASURE?.hasWork?.()){
// [VI dòng gốc 102] Kiểm tra !stopOwnedTower(): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể. | gán S.reason bằng 'use_treasure_keys_then_collect_fabao' | gọi W.KVPV_FABAO_TREASURE.sync() (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
      if(!stopOwnedTower())return;S.reason='use_treasure_keys_then_collect_fabao';W.KVPV_FABAO_TREASURE.sync?.();return;
// [VI dòng gốc 103] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 104] Kiểm tra S.plan.source?.executor==='linh_lung': đúng thì chạy nhánh sau if. | gọi farmTower(S.plan.source) | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(S.plan.source?.executor==='linh_lung'){farmTower(S.plan.source);return;}
// [VI dòng gốc 105] Kiểm tra !stopOwnedTower(): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(!stopOwnedTower())return;
// [VI dòng gốc 106] Kiểm tra S.plan.selected: đúng thì chạy nhánh sau if. | gọi W.KVPV_FABAO_FAST?.sync() (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    if(S.plan.selected)W.KVPV_FABAO_FAST?.sync?.();
// [VI dòng gốc 107] Chú thích gốc của tác giả; không được thực thi. Nội dung: Daily Trial's own scheduler consumes materialDungeon(), preserves pending
    // Daily Trial's own scheduler consumes materialDungeon(), preserves pending
// [VI dòng gốc 108] Chú thích gốc của tác giả; không được thực thi. Nội dung: requests, scene ownership, free quotas and native lock checks.
    // requests, scene ownership, free quotas and native lock checks.
// [VI dòng gốc 109] Nhận lỗi bằng e và chạy phần xử lý lỗi. | gán S.lastError bằng String(e) | gán S.reason bằng 'error'
  }catch(e){S.lastError=String(e);S.reason='error';}}
// [VI dòng gốc 110] Định nghĩa hàm stop; tham số: reason='manual'. Mục đích: dừng bộ điều khiển và dọn tài nguyên | gán S.enabled bằng false | Kiểm tra reason!=='reload': đúng thì chạy nhánh sau if. | gọi stopOwnedTower()
  function stop(reason='manual'){S.enabled=false;if(reason!=='reload')stopOwnedTower();if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;}
// [VI dòng gốc 111] gán W.KVPV_PROGRESS_PLANNER bằng Object.freeze({sync,stop,inspect,materialDungeon, status:()=>({enabled:S.enabled,actor,reason:S.reason,plan:S.plan,towerOwned:S.towerOwned,lastError:S.lastError,allowKNB:false}), _…
  W.KVPV_PROGRESS_PLANNER=Object.freeze({sync,stop,inspect,materialDungeon,
// [VI dòng gốc 112] Thuộc tính status: tạo hàm với tham số (không có); mỗi lần gọi trả về tạo đối tượng gồm enabled, actor, reason, plan, towerOwned, lastError, allowKNB | Thuộc tính enabled: đọc S.enabled | Thuộc tính actor: dùng biến cùng tên | Thuộc tính reason: đọc S.reason
    status:()=>({enabled:S.enabled,actor,reason:S.reason,plan:S.plan,towerOwned:S.towerOwned,lastError:S.lastError,allowKNB:false}),
// [VI dòng gốc 113] Thuộc tính _handoff: tạo hàm với tham số (không có); mỗi lần gọi trả về tạo đối tượng gồm actor, towerOwned, lastTowerKey | Thuộc tính actor: dùng biến cùng tên | Thuộc tính towerOwned: đọc S.towerOwned | Thuộc tính lastTowerKey: đọc S.lastTowerKey
    _handoff:()=>({actor,towerOwned:S.towerOwned,lastTowerKey:S.lastTowerKey})});
// [VI dòng gốc 114] gán S.timer bằng (W.KVPV_V1?.timers?.setInterval??W.setInterval)(sync,1000) | gọi sync()
  S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(sync,1000);sync();
// [VI dòng gốc 115] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: })();
})();
// [VI dòng gốc 116] Dòng trống để tách các phần, không có lệnh thực thi.
