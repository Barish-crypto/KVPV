// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: Continuous observer, not a second sender. Wake existing guarded executors on change. [đóng chú thích]
/* Continuous observer, not a second sender. Wake existing guarded executors on change. */
// [VI dòng gốc 2] chạy ngay hàm bao để tạo phạm vi và khởi tạo phần chức năng bên trong
(() => {
// [VI dòng gốc 3] "use strict"
  'use strict';
// [VI dòng gốc 4] Khai báo biến không gán lại bằng const: W = window | gọi W.KVPV_WORLD_EYE?.stop() để dừng bộ điều khiển và dọn tài nguyên (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  const W=window;W.KVPV_WORLD_EYE?.stop?.();
// [VI dòng gốc 5] Khai báo biến không gán lại bằng const: actor = gọi String(W.__KVPV_OWN_ACTOR_ID||'') để chuyển sang chuỗi
  const actor=String(W.__KVPV_OWN_ACTOR_ID||'');
// [VI dòng gốc 6] Khai báo biến không gán lại bằng const: S = tạo đối tượng gồm enabled, timer, map, task, taskDirty, inventoryDirty, lastInventory, lastRead, scans, changes, groups, actions, errors, history
  const S={enabled:true,timer:null,map:null,task:null,taskDirty:false,inventoryDirty:false,lastInventory:-Infinity,lastRead:-Infinity,scans:0,changes:0,groups:{},actions:[],errors:{},history:[]};
// [VI dòng gốc 7] Khai báo biến không gán lại bằng const: listener = tạo đối tượng gồm ; notify = W._Sa?.notify hoặc dùng vế phải khi vế trái là null/undefined: typeof _Sa!=='undefined'?_Sa.notify:null
  const listener={},notify=W._Sa?.notify??(typeof _Sa!=='undefined'?_Sa.notify:null);
// [VI dòng gốc 8] Khai báo biến không gán lại bằng const: owned = tạo hàm với tham số (không có); mỗi lần gọi trả về actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'') và chỉ đánh giá vế phải khi vế trái truthy: !W.__KVPV_UNIVERSAL_HALTED
  const owned=()=>actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;
// [VI dòng gốc 9] Khai báo biến không gán lại bằng const: groups = tạo đối tượng gồm boss, dungeons, bagSmeltCraft, skillsCharacterPets, equipment, quests
  const groups={boss:['KVPV_BASIC10','KVPV_HITRUN_AUTO'],dungeons:['KVPV_DAILY_TRIAL','KVPV_RUNE_BOSS','KVPV_SUMMON_BOSS','KVPV_BEAST_ISLAND'],
// [VI dòng gốc 10] Thuộc tính bagSmeltCraft: tạo mảng gồm 3 vị trí: ['KVPV_BG_RESOURCES','KVPV_QUICK_USE','KVPV_CRAFT_LOW'] | Thuộc tính skillsCharacterPets: tạo mảng gồm 2 vị trí: ['KVPV_APPEARANCE_AUTO','KVPV_SKILL_REWARDS']
    bagSmeltCraft:['KVPV_BG_RESOURCES','KVPV_QUICK_USE','KVPV_CRAFT_LOW'],skillsCharacterPets:['KVPV_APPEARANCE_AUTO','KVPV_SKILL_REWARDS'],
// [VI dòng gốc 11] Thuộc tính equipment: tạo mảng gồm 2 vị trí: ['KVPV_FABAO_FAST','KVPV_SOUL_STONE_FAST'] | Thuộc tính quests: tạo mảng gồm 3 vị trí: ['KVPV_QUEST_PRIORITY','KVPV_REBORN_GOALS','KVPV_SEASON_REWARDS']
    equipment:['KVPV_FABAO_FAST','KVPV_SOUL_STONE_FAST'],quests:['KVPV_QUEST_PRIORITY','KVPV_REBORN_GOALS','KVPV_SEASON_REWARDS']};
// [VI dòng gốc 12] Định nghĩa hàm call; tham số: name, method | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | Khai báo biến không gán lại bằng const: api = đọc W[name] | Kiểm tra typeof api?.[method]==='function': đúng thì chạy nhánh sau if.
  function call(name,method){try{const api=W[name];if(typeof api?.[method]==='function')return api[method](false);}catch(e){S.errors[name]=String(e).slice(0,200);}return null;}
// [VI dòng gốc 13] Định nghĩa hàm note; tham số: kind, value | tăng S.changes một đơn vị sau khi lấy giá trị | gọi S.history.push({at:Date.now(),kind,value}) để thêm phần tử vào cuối mảng | Kiểm tra S.history.length>30: đúng thì chạy nhánh sau if.
  function note(kind,value){S.changes++;S.history.push({at:Date.now(),kind,value});if(S.history.length>30)S.history.shift();}
// [VI dòng gốc 14] Định nghĩa hàm discover; tham số: không có | Khai báo biến không gán lại bằng const: ui = đọc W._ft?._Y4n?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); out = tạo mảng gồm 0 vị trí: []
  function discover(){const ui=W._ft?._Y4n?.ins,out=[];
// [VI dòng gốc 15] Khai báo biến không gán lại bằng const: ids = gọi Object.keys(ui?.openTable??ui?._H$t??{}).slice(0, 80) để lấy một đoạn dữ liệu
    const ids=Object.keys(ui?.openTable??ui?._H$t??{}).slice(0,80);
// [VI dòng gốc 16] Duyệt từng giá trị trong ids bằng const raw. | Khai báo biến không gán lại bằng const: raw (chưa gán giá trị) | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | Khai báo biến không gán lại bằng const: id = gọi Number(raw) để chuyển sang số
    for(const raw of ids){try{const id=Number(raw);if(!Number.isSafeInteger(id)||ui?.isOpened?.(id)!==true)continue;
// [VI dòng gốc 17] Khai báo biến không gán lại bằng const: p = ui.getPanelById?.(id) hoặc dùng vế phải khi vế trái falsy: ui.getDialogById?.(id) | Kiểm tra !p?.parent||p.visible===false: đúng thì chạy nhánh sau if. | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
      const p=ui.getPanelById?.(id)||ui.getDialogById?.(id);if(!p?.parent||p.visible===false)continue;
// [VI dòng gốc 18] Khai báo biến không gán lại bằng const: queue = tạo mảng gồm 1 vị trí: [{node:p,path:'',depth:0}]; seen = tạo đối tượng bằng Set() | Khai báo biến có thể gán lại bằng let: visited = 0
      const queue=[{node:p,path:'',depth:0}],seen=new Set();let visited=0;
// [VI dòng gốc 19] Lặp khi điều kiện còn đúng: queue.length&&visited++<160 | Khai báo biến không gán lại bằng const: {node:b,path:key,depth} = gọi queue.shift()
      while(queue.length&&visited++<160){const {node:b,path:key,depth}=queue.shift();
// [VI dòng gốc 20] Kiểm tra !b||typeof b!=='object'||seen.has(b)||b.visible===false||b.destroyed===true: đúng thì chạy nhánh sau if. | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo. | gọi seen.add(b)
        if(!b||typeof b!=='object'||seen.has(b)||b.visible===false||b.destroyed===true)continue;seen.add(b);
// [VI dòng gốc 21] Kiểm tra depth<4: đúng thì chạy nhánh sau if.
        if(depth<4){
// [VI dòng gốc 22] Duyệt từng giá trị trong Object.keys(b).filter(k=>/btn|button|box|panel|item|list|view|tab/i.test(k)).slice(0,40) bằng const k. | Khai báo biến không gán lại bằng const: k (chưa gán giá trị)
          for(const k of Object.keys(b).filter(k=>/btn|button|box|panel|item|list|view|tab/i.test(k)).slice(0,40)){
// [VI dòng gốc 23] Khai báo biến không gán lại bằng const: child = đọc b[k] | Kiểm tra child&&typeof child==='object'&&!Array.isArray(child): đúng thì chạy nhánh sau if. | gọi queue.push({node:child,path:key?key+'.'+k:k,depth:depth+1}) để thêm phần tử vào cuối mảng
            const child=b[k];if(child&&typeof child==='object'&&!Array.isArray(child))queue.push({node:child,path:key?key+'.'+k:k,depth:depth+1});
// [VI dòng gốc 24] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
          }
// [VI dòng gốc 25] Khai báo biến không gán lại bằng const: children = b._children hoặc dùng vế phải khi vế trái là null/undefined: b._childs
          const children=b._children??b._childs;
// [VI dòng gốc 26] Kiểm tra Array.isArray(children): đúng thì chạy nhánh sau if. | Duyệt từng giá trị trong children.slice(0,40).entries() bằng const [i,child]. | Khai báo biến không gán lại bằng const: [i,child] (chưa gán giá trị) | gọi queue.push({node:child,path:key+'.children['+i+']',depth:depth+1}) để thêm phần tử vào cuối mảng
          if(Array.isArray(children))for(const [i,child]of children.slice(0,40).entries())queue.push({node:child,path:key+'.children['+i+']',depth:depth+1});
// [VI dòng gốc 27] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
        }
// [VI dòng gốc 28] Kiểm tra !key: đúng thì chạy nhánh sau if. | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
        if(!key)continue;
// [VI dòng gốc 29] Khai báo biến không gán lại bằng const: label = gọi String(b.label??'').slice(0, 100) để lấy một đoạn dữ liệu; n = gọi label.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/gi,'d').toLowerCase()
        const label=String(b.label??'').slice(0,100),n=label.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/gi,'d').toLowerCase();
// [VI dòng gốc 30] Kiểm tra !label||b.visible===false||b.destroyed===true: đúng thì chạy nhánh sau if. | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
        if(!label||b.visible===false||b.destroyed===true)continue;
// [VI dòng gốc 31] Khai báo biến không gán lại bằng const: kind = nếu /huy|cau cuu/.test(n) thì lấy 'manual_control', ngược lại lấy /mua|nap|knb|nguyen bao/.test(n)?'paid_or_currency':/nhan/.test(n)?'claim':/dung luyen/.test(n)?'smelt':/dung/.test(n)?'use':/tang cap|tang nhanh|tang bac|kich hoat/.test(n)?'upgra…
        const kind=/huy|cau cuu/.test(n)?'manual_control':/mua|nap|knb|nguyen bao/.test(n)?'paid_or_currency':/nhan/.test(n)?'claim':/dung luyen/.test(n)?'smelt':/dung/.test(n)?'use':/tang cap|tang nhanh|tang bac|kich hoat/.test(n)?'upgrade':/den|khieu chien/.test(n)?'navigate':'unknown';
// [VI dòng gốc 32] Khai báo biến không gán lại bằng const: ready = b.disabled!==true&&b.gray!==true và chỉ đánh giá vế phải khi vế trái truthy: b.mouseEnabled!==false
        const ready=b.disabled!==true&&b.gray!==true&&b.mouseEnabled!==false;
// [VI dòng gốc 33] gọi out.push({panel:id,className:String(p.constructor?.name??'').slice(0,80),key,label,kind,ready, decision:kind==='manual_control'?'…) để thêm phần tử vào cuối mảng
        out.push({panel:id,className:String(p.constructor?.name??'').slice(0,80),key,label,kind,ready,
// [VI dòng gốc 34] Thuộc tính decision: nếu kind==='manual_control' thì lấy 'manual_only', ngược lại lấy kind==='paid_or_currency'?'blocked_currency':!ready?'waiting_native_condition':'needs_verified_handler'
          decision:kind==='manual_control'?'manual_only':kind==='paid_or_currency'?'blocked_currency':!ready?'waiting_native_condition':'needs_verified_handler'});
// [VI dòng gốc 35] Kiểm tra out.length>=80: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: out.
        if(out.length>=80)return out;
// [VI dòng gốc 36] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
      }
// [VI dòng gốc 37] Nhận lỗi bằng e và chạy phần xử lý lỗi. | gán S.errors.ui bằng String(e).slice(0,160) | Kết thúc hàm hiện tại và trả về: out.
    }catch(e){S.errors.ui=String(e).slice(0,160);}}return out;
// [VI dòng gốc 38] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 39] Định nghĩa hàm read; tham số: không có | Khai báo biến không gán lại bằng const: cfg = đọc W.KVPV_UPGRADES?.config nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gán S.groups.homeForge bằng {available:!!cfg,managedBy:'KVPV_UPGRADES',claims:cfg?.tienPhu,upgrades:cfg?.phongThuy} | Duyệt từng giá trị trong Object.entries(groups) bằng const [group,names].
  function read(){const cfg=W.KVPV_UPGRADES?.config;S.groups.homeForge={available:!!cfg,managedBy:'KVPV_UPGRADES',claims:cfg?.tienPhu,upgrades:cfg?.phongThuy};for(const [group,names]of Object.entries(groups))S.groups[group]=names.map(name=>{
// [VI dòng gốc 40] Khai báo biến không gán lại bằng const: r = gọi call(name, 'status') | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm name, available, reason, enabled, pending, requests, confirmed, error.
    const r=call(name,'status');return {name,available:!!W[name],reason:String(r?.reason??r?.phase??'').slice(0,160),enabled:r?.enabled,
// [VI dòng gốc 41] Thuộc tính pending: đảo giá trị đúng/sai của !r?.pending | Thuộc tính requests: đọc r?.requests nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Thuộc tính confirmed: đọc r?.confirmed nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Thuộc tính error: gọi String(r?.lastError??r?.error??'').slice(0, 160) để lấy một đoạn dữ liệu
      pending:!!r?.pending,requests:r?.requests,confirmed:r?.confirmed,error:String(r?.lastError??r?.error??'').slice(0,160)};
// [VI dòng gốc 42] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  });}
// [VI dòng gốc 43] Định nghĩa hàm tick; tham số: không có. Mục đích: xử lý một nhịp kiểm tra | Kiểm tra !S.enabled: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể. | Kiểm tra !owned(): đúng thì chạy nhánh sau if.
  function tick(){if(!S.enabled)return;if(!owned()){stop();return;}S.scans++;
// [VI dòng gốc 44] Khai báo biến không gán lại bằng const: now = gọi Date.now(); map = gọi String(W._C?._Mn?._Cn?.currentID??'') để chuyển sang chuỗi; q = đọc W._Ba?._zIt?._FIt?.ins?.taskInfo nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const now=Date.now(),map=String(W._C?._Mn?._Cn?.currentID??''),q=W._Ba?._zIt?._FIt?.ins?.taskInfo;
// [VI dòng gốc 45] Khai báo biến không gán lại bằng const: task = gọi JSON.stringify(Array.isArray(q)?q.slice(0,3):null) để chuyển giá trị thành chuỗi JSON
    const task=JSON.stringify(Array.isArray(q)?q.slice(0,3):null);
// [VI dòng gốc 46] Kiểm tra map!==S.map: đúng thì chạy nhánh sau if. | gán S.map bằng map | gọi note('map', map) | gọi call('KVPV_MODE', 'syncMap')
    if(map!==S.map){S.map=map;note('map',map);call('KVPV_MODE','syncMap');}
// [VI dòng gốc 47] Khai báo biến không gán lại bằng const: changed = tính biểu thức task!==S.task | Kiểm tra changed: đúng thì chạy nhánh sau if. | gán S.task bằng task | gán S.taskDirty bằng true
    const changed=task!==S.task;if(changed){S.task=task;S.taskDirty=true;note('task',task);}
// [VI dòng gốc 48] Khai báo biến không gán lại bằng const: userBusy = tính biểu thức now<Number(W.__KVPV_USER_UI_UNTIL||0)
    const userBusy=now<Number(W.__KVPV_USER_UI_UNTIL||0);
// [VI dòng gốc 49] Kiểm tra !userBusy&&S.taskDirty: đúng thì chạy nhánh sau if. | gán S.taskDirty bằng false | gọi call('KVPV_QUEST_PRIORITY', 'sync') | gọi call('KVPV_REBORN_GOALS', 'sync')
    if(!userBusy&&S.taskDirty){S.taskDirty=false;call('KVPV_QUEST_PRIORITY','sync');call('KVPV_REBORN_GOALS','sync');}
// [VI dòng gốc 50] Kiểm tra !userBusy&&S.inventoryDirty&&now-S.lastInventory>=500: đúng thì chạy nhánh sau if. | gán S.inventoryDirty bằng false | gán S.lastInventory bằng now | gọi note('inventory', 'changed')
    if(!userBusy&&S.inventoryDirty&&now-S.lastInventory>=500){S.inventoryDirty=false;S.lastInventory=now;note('inventory','changed');
// [VI dòng gốc 51] Duyệt từng giá trị trong ['KVPV_APPEARANCE_AUTO','KVPV_SKILL_REWARDS','KVPV_FABAO_FAST','KVPV_SOUL_STONE_FAST','KVPV_PARALLEL_ACTIONS'] bằng const name. | Khai báo biến không gán lại bằng const: name (chưa gán giá trị) | gọi call(name, 'sync')
      for(const name of ['KVPV_APPEARANCE_AUTO','KVPV_SKILL_REWARDS','KVPV_FABAO_FAST','KVPV_SOUL_STONE_FAST','KVPV_PARALLEL_ACTIONS'])call(name,'sync');
// [VI dòng gốc 52] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 53] Kiểm tra now-S.lastRead>=2000: đúng thì chạy nhánh sau if. | gán S.lastRead bằng now | gọi read() | gán S.actions bằng discover()
    if(now-S.lastRead>=2000){S.lastRead=now;read();S.actions=discover();}
// [VI dòng gốc 54] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 55] gán listener.changed bằng ()=>{S.inventoryDirty=true;} | gán S.inventoryDirty bằng true
  listener.changed=()=>{S.inventoryDirty=true;};
// [VI dòng gốc 56] Kiểm tra typeof notify?.on==='function': đúng thì chạy nhánh sau if. | Duyệt từng giá trị trong [5074,5079] bằng const id. | Khai báo biến không gán lại bằng const: id (chưa gán giá trị) | gọi notify.on(id, listener, listener.changed)
  if(typeof notify?.on==='function')for(const id of [5074,5079])notify.on(id,listener,listener.changed);
// [VI dòng gốc 57] Định nghĩa hàm stop; tham số: không có. Mục đích: dừng bộ điều khiển và dọn tài nguyên | gán S.enabled bằng false | Kiểm tra S.timer!==null: đúng thì chạy nhánh sau if. | gọi W.KVPV_V1?.timers?.clearInterval??W.clearInterval(S.timer)
  function stop(){S.enabled=false;if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;
// [VI dòng gốc 58] Kiểm tra typeof notify?.off==='function': đúng thì chạy nhánh sau if. | Duyệt từng giá trị trong [5074,5079] bằng const id. | Khai báo biến không gán lại bằng const: id (chưa gán giá trị) | gọi notify.off(id, listener, listener.changed)
    if(typeof notify?.off==='function')for(const id of [5074,5079])notify.off(id,listener,listener.changed);
// [VI dòng gốc 59] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 60] gán W.KVPV_WORLD_EYE bằng Object.freeze({sync:tick,stop,status:()=>({enabled:S.enabled,mapPollMs:100,modelPollMs:2000,inventoryDebounceMs:500, map:S.map,scans:S.scans,changes:S.changes,groups:S.groups,actio…
  W.KVPV_WORLD_EYE=Object.freeze({sync:tick,stop,status:()=>({enabled:S.enabled,mapPollMs:100,modelPollMs:2000,inventoryDebounceMs:500,
// [VI dòng gốc 61] Thuộc tính map: đọc S.map | Thuộc tính scans: đọc S.scans | Thuộc tính changes: đọc S.changes | Thuộc tính groups: đọc S.groups
    map:S.map,scans:S.scans,changes:S.changes,groups:S.groups,actions:S.actions.map(a=>({...a})),errors:{...S.errors},history:S.history.slice()})});
// [VI dòng gốc 62] gán S.timer bằng (W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,100) | gọi tick() để xử lý một nhịp kiểm tra
  S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,100);tick();
// [VI dòng gốc 63] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: })();
})();
// [VI dòng gốc 64] Dòng trống để tách các phần, không có lệnh thực thi.
