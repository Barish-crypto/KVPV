// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: Road Trial scene41: measure native cast/hit/recovery, prefer a proven basic only. [đóng chú thích]
/* Road Trial scene41: measure native cast/hit/recovery, prefer a proven basic only. */
// [VI dòng gốc 2] chạy ngay hàm bao để tạo phạm vi và khởi tạo phần chức năng bên trong
(() => {
// [VI dòng gốc 3] "use strict" | Khai báo biến không gán lại bằng const: W = window; old = đọc W.KVPV_ROAD_CADENCE; carry = gọi old?._handoff(); chức năng nội bộ chưa xác minh từ tên hàm (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gọi old?.stop() để dừng bộ điều khiển và dọn tài nguyên (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
 'use strict';const W=window,old=W.KVPV_ROAD_CADENCE,carry=old?._handoff?.();old?.stop?.();
// [VI dòng gốc 4] Khai báo biến không gán lại bằng const: actor = gọi String(W.__KVPV_OWN_ACTOR_ID||'') để chuyển sang chuỗi; samples = nếu carry?.actor===actor thì lấy carry.samples, ngược lại lấy []
 const actor=String(W.__KVPV_OWN_ACTOR_ID||''),samples=carry?.actor===actor?carry.samples:[];
// [VI dòng gốc 5] Khai báo biến có thể gán lại bằng let: enabled = nếu carry?.actor===actor thì lấy carry.enabled!==false, ngược lại lấy true
 let enabled=carry?.actor===actor?carry.enabled!==false:true;
// [VI dòng gốc 6] Khai báo biến có thể gán lại bằng let: combatMode = nếu carry?.actor===actor&&carry.combatMode==='basic8001' thì lấy 'basic8001', ngược lại lấy 'native'
 let combatMode=carry?.actor===actor&&carry.combatMode==='basic8001'?'basic8001':'native';
// [VI dòng gốc 7] Khai báo biến có thể gán lại bằng let: minCastIntervalMs = nếu carry?.actor===actor&&Number.isSafeInteger(carry.minCastIntervalMs)&&carry.minCastIntervalMs>=0&&carry.minCastIntervalMs<=5000 thì lấy carry.minCastIntervalMs, ngược lại lấy 0
 let minCastIntervalMs=carry?.actor===actor&&Number.isSafeInteger(carry.minCastIntervalMs)&&carry.minCastIntervalMs>=0&&carry.minCastIntervalMs<=5000?carry.minCastIntervalMs:0;
// [VI dòng gốc 8] Khai báo biến không gán lại bằng const: scopedCombat = tạo hàm với tham số (không có); mỗi lần gọi trả về W.KVPV_DESKTOP_CONTROL?.scopeProfile?.('ROAD_TRIAL') hoặc dùng vế phải khi vế trái là null/undefined: null
 const effectiveWait=()=>Math.max(100,scopedCombat()?.intervalMs??minCastIntervalMs);
 const scopedCombat=()=>W.KVPV_DESKTOP_CONTROL?.scopeProfile?.('ROAD_TRIAL')??null;
// [VI dòng gốc 9] Chú thích gốc của tác giả; không được thực thi. Nội dung: Backfill the same conservative recovery bound for samples carried from the first observer version.
 // Backfill the same conservative recovery bound for samples carried from the first observer version.
// [VI dòng gốc 10] Lặp for: khởi tạo let i=0; tiếp tục khi i<samples.length-1; sau mỗi vòng i++. | Khai báo biến có thể gán lại bằng let: i = 0 | Khai báo biến không gán lại bằng const: a = đọc samples[i]; b = đọc samples[i+1] | Kiểm tra a.readyAt===null&&a.targetId===b.targetId&&a.map===b.map&&b.at>a.at: đúng thì chạy nhánh sau if.
 for(let i=0;i<samples.length-1;i++){const a=samples[i],b=samples[i+1];if(a.readyAt===null&&a.targetId===b.targetId&&a.map===b.map&&b.at>a.at){a.readyAt=b.at;a.recoverySource='next_native_cast_upper_bound';}}
// [VI dòng gốc 11] Khai báo biến không gán lại bằng const: owner = tạo đối tượng gồm ; S = tạo đối tượng gồm role, combat, target, rejected, error, cache, cacheAt
 const owner={},S={role:null,combat:null,target:null,rejected:0,error:'',cache:null,cacheAt:-Infinity};
// [VI dòng gốc 12] Khai báo biến không gán lại bằng const: prop = tạo hàm với tham số o, k; mỗi lần gọi trả về gọi o?.property?.get(k) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); id = tạo hàm với tham số o; mỗi lần gọi trả về gọi String(prop(o,'id')??o?.id??'') để chuyển sang chuỗi
 const prop=(o,k)=>o?.property?.get?.(k),id=o=>String(prop(o,'id')??o?.id??'');
// [VI dòng gốc 13] Khai báo biến không gán lại bằng const: own = tạo hàm với tham số (không có); mỗi lần gọi trả về actor&&String(W._Ba?._rJ?._O$?.ins?.actorId)===actor và chỉ đánh giá vế phải khi vế trái truthy: !W.__KVPV_UNIVERSAL_HALTED
 const own=()=>actor&&String(W._Ba?._rJ?._O$?.ins?.actorId)===actor&&!W.__KVPV_UNIVERSAL_HALTED;
// [VI dòng gốc 14] Định nghĩa hàm scope; tham số: không có | Khai báo biến không gán lại bằng const: map = gọi Number(W._C?._Mn?._Cn?.currentID??W._Ba?._$a?._yo?.ins?.intoSce?.[0]) để chuyển sang số
 function scope(){const map=Number(W._C?._Mn?._Cn?.currentID??W._Ba?._$a?._yo?.ins?.intoSce?.[0]);
// [VI dòng gốc 15] Kết thúc hàm hiện tại và trả về: own()&&Number(W._ft?._po?.ins?.getCfgById?.(map)?.[7])===41 và chỉ đánh giá vế phải khi vế trái truthy: W._Ba?._cm?._q3t?.ins?.getHasTeamByType?.(1)===true.
  return own()&&Number(W._ft?._po?.ins?.getCfgById?.(map)?.[7])===41&&W._Ba?._cm?._q3t?.ins?.getHasTeamByType?.(1)===true;}
// [VI dòng gốc 16] Định nghĩa hàm target; tham số: t | Kiểm tra S.target===t: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể. | Kiểm tra S.target: đúng thì chạy nhánh sau if.
 function target(t){if(S.target===t)return;if(S.target)S.target.off?.(1012,owner,hit);S.target=null;
// [VI dòng gốc 17] Kiểm tra t&&typeof t.on==='function'&&typeof t.off==='function': đúng thì chạy nhánh sau if. | gán S.target bằng t | gọi t.on(1012, owner, hit)
  if(t&&typeof t.on==='function'&&typeof t.off==='function'){S.target=t;t.on(1012,owner,hit);}}
// [VI dòng gốc 18] Định nghĩa hàm cast; tham số: targetId, skillId | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài.
 function cast(targetId,skillId){try{
// [VI dòng gốc 19] Kiểm tra !scope()||String(targetId)!==id(S.combat?.target)||Number(prop(S.combat?.target,'type'))!==1: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  if(!scope()||String(targetId)!==id(S.combat?.target)||Number(prop(S.combat?.target,'type'))!==1)return;
// [VI dòng gốc 20] Khai báo biến không gán lại bằng const: skill = gọi Number(skillId) để chuyển sang số | Kiểm tra !((skill>=8001&&skill<=8009)||(skill>=1001&&skill<=1008)): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  const skill=Number(skillId);if(!((skill>=8001&&skill<=8009)||(skill>=1001&&skill<=1008)))return;
// [VI dòng gốc 21] gọi target(S.combat.target) | Khai báo biến không gán lại bằng const: previous = gọi samples.at(-1) | Kiểm tra previous&&previous.readyAt===null&&previous.targetId===String(targetId)&&Date.now()>previous.at: đúng thì chạy nhánh sau if. | gán previous.readyAt bằng Date.now()
  target(S.combat.target);const previous=samples.at(-1);if(previous&&previous.readyAt===null&&previous.targetId===String(targetId)&&Date.now()>previous.at){previous.readyAt=Date.now();previous.recoverySource='next_native_cast_upper_bound';}samples.push({at:Date.now(),id:skill,targetId:String(targetId),occ:Number(prop(S.target,'occ')),map:Number(W._C?._Mn?._Cn?.currentID),hitAt:null,readyAt:null,damage:0});
// [VI dòng gốc 22] Kiểm tra samples.length>240: đúng thì chạy nhánh sau if. | gọi samples.splice(0, samples.length-240) | gán S.cacheAt bằng -Infinity
  if(samples.length>240)samples.splice(0,samples.length-240);S.cacheAt=-Infinity;
// [VI dòng gốc 23] Nhận lỗi bằng e và chạy phần xử lý lỗi. | gán S.error bằng String(e)
 }catch(e){S.error=String(e);}}
// [VI dòng gốc 24] Định nghĩa hàm hit; tham số: source, marker, damage, flags, receiver | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài.
 function hit(source,marker,damage,flags,receiver){try{
// [VI dòng gốc 25] Kiểm tra !scope()||String(source)!==actor||String(receiver)!==id(S.target)||!(Number(damage)>0)||(Number(flags)&(4|16|32|64|128|256)): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  if(!scope()||String(source)!==actor||String(receiver)!==id(S.target)||!(Number(damage)>0)||(Number(flags)&(4|16|32|64|128|256)))return;
// [VI dòng gốc 26] Khai báo biến không gán lại bằng const: raw = gọi Number(marker) để chuyển sang số | Kiểm tra !Number.isSafeInteger(raw)||raw%10000: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể. | Khai báo biến không gán lại bằng const: skill = tính biểu thức raw/10000; now = gọi Date.now()
  const raw=Number(marker);if(!Number.isSafeInteger(raw)||raw%10000)return;const skill=raw/10000,now=Date.now();
// [VI dòng gốc 27] Khai báo biến không gán lại bằng const: row = gọi samples.find(r=>r.hitAt===null&&r.targetId===String(receiver)&&r.id===skill&&now-r.at>=0&&now-r.at<=3500) để tìm phần tử đầu tiên thỏa điều kiện
  const row=samples.find(r=>r.hitAt===null&&r.targetId===String(receiver)&&r.id===skill&&now-r.at>=0&&now-r.at<=3500);
// [VI dòng gốc 28] Kiểm tra !row: đúng thì chạy nhánh sau if. | tăng S.rejected một đơn vị sau khi lấy giá trị | Kết thúc hàm hiện tại mà không trả giá trị cụ thể. | gán row.hitAt bằng now
  if(!row){S.rejected++;return;}row.hitAt=now;row.damage=Number(damage);S.cacheAt=-Infinity;
// [VI dòng gốc 29] Nhận lỗi bằng e và chạy phần xử lý lỗi. | gán S.error bằng String(e)
 }catch(e){S.error=String(e);}}
// [VI dòng gốc 30] Định nghĩa hàm release; tham số: không có. Mục đích: nhả quyền điều khiển đang giữ | gọi target(null) | Kiểm tra S.role: đúng thì chạy nhánh sau if. | gọi S.role.off(1039, owner, cast) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
 function release(){target(null);if(S.role)S.role.off?.(1039,owner,cast);S.role=null;S.combat=null;}
// [VI dòng gốc 31] Định nghĩa hàm observe; tham số: role, combat | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài.
 function observe(role,combat){try{
// [VI dòng gốc 32] Kiểm tra !enabled||!scope(): đúng thì chạy nhánh sau if. | gọi release() để nhả quyền điều khiển đang giữ | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  if(!enabled||!scope()){release();return;}
// [VI dòng gốc 33] Kiểm tra S.role!==role: đúng thì chạy nhánh sau if. | gọi release() để nhả quyền điều khiển đang giữ | Kiểm tra typeof role?.on!=='function'||typeof role?.off!=='function': đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  if(S.role!==role){release();if(typeof role?.on!=='function'||typeof role?.off!=='function')return;S.role=role;role.on(1039,owner,cast);}
// [VI dòng gốc 34] gán S.combat bằng combat | gọi target(combat?.target)
  S.combat=combat;target(combat?.target);
// [VI dòng gốc 35] Khai báo biến không gán lại bằng const: last = gọi samples.at(-1); now = gọi Date.now()
  const last=samples.at(-1),now=Date.now();
// [VI dòng gốc 36] Kiểm tra last&&last.readyAt===null&&now>last.at&&id(combat?.target)===last.targetId&&combat?.isCooldown?.()===false&&combat?._jh?.isPlaying!==true: đúng thì chạy nhánh sau if. | gán last.readyAt bằng now | gán last.recoverySource bằng 'polled_native_ready' | gán S.cacheAt bằng -Infinity
  if(last&&last.readyAt===null&&now>last.at&&id(combat?.target)===last.targetId&&combat?.isCooldown?.()===false&&combat?._jh?.isPlaying!==true){last.readyAt=now;last.recoverySource='polled_native_ready';S.cacheAt=-Infinity;}
// [VI dòng gốc 37] Nhận lỗi bằng e và chạy phần xử lý lỗi. | gán S.error bằng String(e)
 }catch(e){S.error=String(e);}}
// [VI dòng gốc 38] Định nghĩa hàm report; tham số: không có | Khai báo biến không gán lại bằng const: now = gọi Date.now() | Kiểm tra S.cache&&now-S.cacheAt<1000: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: đọc S.cache.
 function report(){const now=Date.now();if(S.cache&&now-S.cacheAt<1000)return S.cache;S.cacheAt=now;
// [VI dòng gốc 39] Khai báo biến không gán lại bằng const: groups = tạo đối tượng bằng Map() | Duyệt từng giá trị trong samples bằng const r. | Khai báo biến không gán lại bằng const: r (chưa gán giá trị) | Khai báo biến không gán lại bằng const: key = tính biểu thức r.occ+'/'+r.id
  const groups=new Map();for(const r of samples){const key=r.occ+'/'+r.id;let g=groups.get(key);if(!g){g={id:r.id,occ:r.occ,casts:0,hits:0,damage:0,cycleDamage:0,cycles:[],latencies:[]};groups.set(key,g);}
// [VI dòng gốc 40] tăng g.casts một đơn vị sau khi lấy giá trị | Kiểm tra r.hitAt!==null: đúng thì chạy nhánh sau if. | tăng g.hits một đơn vị sau khi lấy giá trị | cập nhật bằng toán tử += g.damage bằng r.damage
   g.casts++;if(r.hitAt!==null){g.hits++;g.damage+=r.damage;g.latencies.push(r.hitAt-r.at);if(r.readyAt!==null&&r.readyAt>=r.hitAt){g.cycles.push(r.readyAt-r.at);g.cycleDamage+=r.damage;}}}
// [VI dòng gốc 41] Khai báo biến không gán lại bằng const: rows = gọi [...groups.values()].map(g=>({id:g.id,occ:g.occ,casts:g.casts,hits:g.hits,meanHitMs:g.latencies.length?Math.round(g.latencies.reduce((a,b)=>a+b,0…) để biến đổi từng phần tử
  const rows=[...groups.values()].map(g=>({id:g.id,occ:g.occ,casts:g.casts,hits:g.hits,meanHitMs:g.latencies.length?Math.round(g.latencies.reduce((a,b)=>a+b,0)/g.latencies.length):null,
// [VI dòng gốc 42] Thuộc tính measuredCycles: đọc g.cycles.length | Thuộc tính meanCycleMs: nếu g.cycles.length thì lấy Math.round(g.cycles.reduce((a,b)=>a+b,0)/g.cycles.length), ngược lại lấy null
   measuredCycles:g.cycles.length,meanCycleMs:g.cycles.length?Math.round(g.cycles.reduce((a,b)=>a+b,0)/g.cycles.length):null,
// [VI dòng gốc 43] Thuộc tính damagePerCycleMs: nếu g.cycles.length thì lấy g.cycleDamage/Math.max(1,g.cycles.reduce((a,b)=>a+b,0)), ngược lại lấy null
   damagePerCycleMs:g.cycles.length?g.cycleDamage/Math.max(1,g.cycles.reduce((a,b)=>a+b,0)):null}));
// [VI dòng gốc 44] Khai báo biến không gán lại bằng const: occ = gọi Number(prop(S.combat?.target,'occ')) để chuyển sang số; candidates = gọi rows.filter(r=>r.occ===occ&&r.id>=8001&&r.id<=8009&&r.hits>=8&&r.measuredCycles>=8&&r.hits/r.casts>=.8) để giữ phần tử thỏa điều kiện
  const occ=Number(prop(S.combat?.target,'occ')),candidates=rows.filter(r=>r.occ===occ&&r.id>=8001&&r.id<=8009&&r.hits>=8&&r.measuredCycles>=8&&r.hits/r.casts>=.8);
// [VI dòng gốc 45] gọi candidates.sort((a,b)=>b.damagePerCycleMs-a.damagePerCycleMs) để sắp xếp mảng tại chỗ
  candidates.sort((a,b)=>b.damagePerCycleMs-a.damagePerCycleMs);
// [VI dòng gốc 46] gán S.cache bằng {enabled,combatMode:scopedCombat()?.mode??combatMode,minCastIntervalMs:effectiveWait(),approachDistance:scopedCombat()?.distance??80,nativeCombat:true…
  S.cache={enabled,combatMode:scopedCombat()?.mode??combatMode,minCastIntervalMs:effectiveWait(),approachDistance:scopedCombat()?.distance??80,nativeCombat:true,clientSkillWaitMs:null,pollIntervalMs:100,inside:scope(),active:enabled&&scope()&&!!S.role,casts:samples.length,matchedHits:samples.filter(r=>r.hitAt!==null).length,
// [VI dòng gốc 47] Thuộc tính preferredBasic: nếu candidates.length>=2 thì lấy candidates[0].id, ngược lại lấy null | Thuộc tính reason: nếu !enabled thì lấy 'disabled', ngược lại lấy !scope()?'waiting_road_scene':candidates.length>=2?'measured_basic_preferred':'collecting_8_hits_and_cycles_per_basic' | Thuộc tính rows: dùng biến cùng tên | Thuộc tính rejected: đọc S.rejected
   preferredBasic:candidates.length>=2?candidates[0].id:null,reason:!enabled?'disabled':!scope()?'waiting_road_scene':candidates.length>=2?'measured_basic_preferred':'collecting_8_hits_and_cycles_per_basic',rows,rejected:S.rejected,lastError:S.error,
// [VI dòng gốc 48] Kết thúc hàm hiện tại và trả về: đọc S.cache.
   note:'One direct damage confirmation per cast; Recovery uses native-ready polling or next native cast as an upper bound, not a server throughput limit. Native skill selection; 100ms minimum cast spacing; original skill rows remain unchanged. Server cooldown is not modified.'};return S.cache;
// [VI dòng gốc 49] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
 }
// [VI dòng gốc 50] Định nghĩa hàm start; tham số: không có. Mục đích: khởi động bộ điều khiển | gán enabled bằng true | gán S.cacheAt bằng -Infinity | Kết thúc hàm hiện tại và trả về: gọi report().
 function selectSkill1ms(){return -1;}
 function start(){enabled=true;S.cacheAt=-Infinity;return report();}
// [VI dòng gốc 51] Định nghĩa hàm stop; tham số: không có. Mục đích: dừng bộ điều khiển và dọn tài nguyên | gán enabled bằng false | gọi release() để nhả quyền điều khiển đang giữ | gán S.cacheAt bằng -Infinity
 function stop(){enabled=false;release();S.cacheAt=-Infinity;return report();}
// [VI dòng gốc 52] Định nghĩa hàm setCombatMode; tham số: mode | Kiểm tra !['native','basic8001'].includes(mode): đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('Invalid Road combat mode') | gán combatMode bằng mode
 function setCombatMode(mode){if(!['native','basic8001'].includes(mode))throw Error('Invalid Road combat mode');combatMode=mode;S.cacheAt=-Infinity;return report();}
// [VI dòng gốc 53] Định nghĩa hàm setMinCastInterval; tham số: ms | Kiểm tra !Number.isSafeInteger(ms)||ms<0||ms>5000: đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('Road interval must be 0..5000ms') | gán minCastIntervalMs bằng ms
 function setMinCastInterval(ms){if(!Number.isSafeInteger(ms)||ms<0||ms>5000)throw Error('Road interval must be 0..5000ms');minCastIntervalMs=ms;S.cacheAt=-Infinity;return report();}
// [VI dòng gốc 54] gán W.KVPV_ROAD_CADENCE bằng Object.freeze({get fast1ms(){return enabled&&(scopedCombat()?.mode??combatMode)==='native';},selectSkill1ms,get enabled(){return enabled;},get combatMode(){return scopedCombat()?.mode??combatMode;},get minCastIntervalMs(){return scopedCombat()?.intervalMs??minCastIntervalM… | Kết thúc hàm hiện tại và trả về: enabled. | Kết thúc hàm hiện tại và trả về: scopedCombat()?.mode hoặc dùng vế phải khi vế trái là null/undefined: combatMode. | Kết thúc hàm hiện tại và trả về: scopedCombat()?.intervalMs hoặc dùng vế phải khi vế trái là null/undefined: minCastIntervalMs.
 W.KVPV_ROAD_CADENCE=Object.freeze({fast1ms:false,selectSkill1ms,get enabled(){return enabled;},get combatMode(){return scopedCombat()?.mode??combatMode;},get minCastIntervalMs(){return effectiveWait();},get approachDistance(){return scopedCombat()?.distance??80;},setMinCastInterval,setCombatMode,start,observe,release,stop,status:report,preferredBasic:()=>enabled&&scope()?report().preferredBasic:null,_handoff:()=>({actor,samples,enabled,combatMode,minCastIntervalMs})});
// [VI dòng gốc 55] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: })();
})();
// [VI dòng gốc 56] Dòng trống để tách các phần, không có lệnh thực thi.
