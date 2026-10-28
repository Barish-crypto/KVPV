// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: Outside far-map combo: sequential basic / Tuyet Hoc, 16ms client polling. [đóng chú thích]
/* Outside far-map combo: 4ms active poll, 16ms idle, Road-native cadence preserved. */
// [VI dòng gốc 2] chạy ngay hàm bao để tạo phạm vi và khởi tạo phần chức năng bên trong
(() => {
// [VI dòng gốc 3] "use strict"
  'use strict';
// [VI dòng gốc 4] Khai báo biến không gán lại bằng const: W = window | gọi W.KVPV_BASIC10?.stop() để dừng bộ điều khiển và dọn tài nguyên (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  const W=window;W.KVPV_BASIC10?.stop?.();
  let skillPriority='basic_force_default';
  let forcedTween=null;
  const pveBasic=id=>Number.isInteger(Number(id))&&Number(id)>=8001&&Number(id)<=8005;
// [VI dòng gốc 5] Khai báo biến không gán lại bằng const: actor = gọi String(W.__KVPV_OWN_ACTOR_ID||'') để chuyển sang chuỗi
  const actor=String(W.__KVPV_OWN_ACTOR_ID||'');
// [VI dòng gốc 6] Khai báo biến không gán lại bằng const: S = tạo đối tượng gồm enabled, timer, timerMs, hooks, role, lastCast, attempts, blocked, reason, lastError, prefer, cursor, basicCursor, basicReady, targetSearches, basicAttempts, tuyetHocAttempts
  const S={enabled:true,timer:null,timerMs:16,rapidPoll:false,hooks:[],role:null,lastCast:-Infinity,attempts:0,blocked:0,reason:'starting',lastError:'',prefer:'basic',cursor:0,basicCursor:0,basicReady:new Map(),targetSearches:0,basicAttempts:0,tuyetHocAttempts:0,forceActive:false,forceCombat:null,forceTarget:null,forceScene:null,forceCooldownReads:0,forceAnimationReads:0,forceAnimationPatched:0};
// [VI dòng gốc 7] Khai báo biến không gán lại bằng const: basic = tạo hàm với tham số id; mỗi lần gọi trả về Number.isSafeInteger(Number(id))&&Number(id)>=8001 và chỉ đánh giá vế phải khi vế trái truthy: Number(id)<=8009
  const basic=id=>Number.isSafeInteger(Number(id))&&Number(id)>=8001&&Number(id)<=8009;
// [VI dòng gốc 8] Khai báo biến không gán lại bằng const: tuyetHoc = tạo hàm với tham số id; mỗi lần gọi trả về Number.isSafeInteger(Number(id))&&Number(id)>=1001 và chỉ đánh giá vế phải khi vế trái truthy: Number(id)<=1008
  const tuyetHoc=id=>Number.isSafeInteger(Number(id))&&Number(id)>=1001&&Number(id)<=1008;
// [VI dòng gốc 9] Khai báo biến không gán lại bằng const: allowed = tạo hàm với tham số id; mỗi lần gọi trả về basic(id)||tuyetHoc(id) hoặc dùng vế phải khi vế trái falsy: W.KVPV_TRANSFORM10?.has?.(id)
  const allowed=id=>basic(id)||tuyetHoc(id)||W.KVPV_TRANSFORM10?.has?.(id);
// [VI dòng gốc 10] Khai báo biến không gán lại bằng const: outside = tạo hàm với tham số (không có); mỗi lần gọi trả về tính biểu thức (W.KVPV_FAR_SCOPE??W.KVPV_TQ_SCOPE)?.inside?.()===false
  const outside=()=>(W.KVPV_FAR_SCOPE??W.KVPV_TQ_SCOPE)?.inside?.()===false;
// [VI dòng gốc 11] Khai báo biến không gán lại bằng const: road = tạo hàm với tham số (không có); mỗi lần gọi trả về Number(W._ft?._po?.ins?.getCfgById?.(Number(W._C?._Mn?._Cn?.currentID))?.[7])===41 và chỉ đánh giá vế phải khi vế trái truthy: W._Ba?._cm?._q3t?.ins?.getHasTeamByType?.(1)===true
  const road=()=>Number(W._ft?._po?.ins?.getCfgById?.(Number(W._C?._Mn?._Cn?.currentID))?.[7])===41&&W._Ba?._cm?._q3t?.ins?.getHasTeamByType?.(1)===true;
// [VI dòng gốc 12] Khai báo biến không gán lại bằng const: castGap = tạo hàm với tham số (không có); mỗi lần gọi trả về nếu road() thì lấy 250, ngược lại lấy 1
  const castGap=()=>road()?250:1;
  // Poll faster only for an actionable target, never multiply native cast calls.
  const pollInterval=()=>road()?100:Math.max(S.rapidPoll&&skillPriority==='basic_force_default'?1:S.rapidPoll?4:16,Number(W.KVPV_ACCOUNT_POLICY?.pollingGap?.()??0)||0);
// [VI dòng gốc 13] Khai báo biến có thể gán lại bằng let: roadSelector = null
  let roadSelector=null;
// [VI dòng gốc 14] Khai báo biến có thể gán lại bằng let: roadCast = null; lastRoadCast = áp dụng toán tử - lên Infinity
  let roadCast=null,lastRoadCast=-Infinity;
// [VI dòng gốc 15] Khai báo biến không gán lại bằng const: roadWait = tạo hàm với tham số (không có) | Khai báo biến không gán lại bằng const: n = đọc W.KVPV_ROAD_CADENCE?.minCastIntervalMs nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Kết thúc hàm hiện tại và trả về: nếu Number.isSafeInteger(n)&&n>=0&&n<=5000 thì lấy n, ngược lại lấy 0.
  const roadWait=()=>{const n=W.KVPV_ROAD_CADENCE?.minCastIntervalMs;return Number.isSafeInteger(n)&&n>=0&&n<=5000?n:0;};
// [VI dòng gốc 16] Định nghĩa hàm releaseRoadCast; tham số: không có | Kiểm tra !roadCast: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể. | Khai báo biến không gán lại bằng const: h = roadCast
  const roadSpeedClips=new Map();
  const roadAnimationSpeed=()=>Number(W.KVPV_TH300?.status?.(false)?.basicAnimationSpeed??1);
  function restoreRoadSpeed(){for(const [clip,state] of roadSpeedClips)try{if(clip._nt===state.applied)clip.timeScale=state.before;}catch(e){S.lastError=String(e);}roadSpeedClips.clear();}
  function roadAnimationCall(native,self,args){const factor=roadAnimationSpeed(),avatar=self?._Qrt,me=W._C?._Ba?.instance?.getRole?.(Number(actor));if(factor<=1||Number(args[0])!==8001||!road()||!owner()||W.KVPV_ROAD_CADENCE?.enabled===false||(W.KVPV_ROAD_CADENCE?.combatMode!=='basic8001'&&!W.KVPV_ROAD_CADENCE?.fast1ms)||self.owner!==me||typeof avatar?.getActionTween!=='function')return native.apply(self,args);const original=avatar.getActionTween,action=String(self._mvt?.(8001)?.[5]||'attack');const wrapped=function(...a){if(a[0]!==action)return original.apply(this,a);const before=Number(a[2]??1);if(!Number.isFinite(before)||before<=0)return original.apply(this,a);a[2]=Math.min(factor,before*factor);const tween=original.apply(this,a),clip=this.getCurAction;if(clip&&typeof clip==='object'&&roadSpeedClips.size<32)roadSpeedClips.set(clip,{before,applied:a[2]});return tween;};avatar.getActionTween=wrapped;try{return native.apply(self,args);}finally{if(avatar.getActionTween===wrapped)avatar.getActionTween=original;}}
  function releaseRoadCast(){restoreRoadSpeed();if(!roadCast)return;const h=roadCast;if(h.obj.combat===h.fn){if(h.descriptor)Object.defineProperty(h.obj,'combat',h.descriptor);else delete h.obj.combat;}roadCast=null;lastRoadCast=-Infinity;}
// [VI dòng gốc 17] Định nghĩa hàm syncRoadCast; tham số: combat | Kiểm tra !roadWait(): đúng thì chạy nhánh sau if. | gọi releaseRoadCast() | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  function syncRoadCast(combat){if(roadAnimationSpeed()<=1)restoreRoadSpeed();if(!roadWait()&&roadAnimationSpeed()<=1){releaseRoadCast();return;}if(roadCast?.obj===combat)return;releaseRoadCast();const descriptor=Object.getOwnPropertyDescriptor(combat,'combat'),native=combat.combat;if(descriptor?.configurable===false)return;const fn=function(...args){if(road()&&owner()&&W.KVPV_ROAD_CADENCE?.enabled!==false&&roadWait()>0){const now=Date.now();if(now-lastRoadCast<roadWait())return;lastRoadCast=now;}return roadAnimationCall(native,this,args);};Object.defineProperty(combat,'combat',{value:fn,writable:true,configurable:true});roadCast={obj:combat,fn,descriptor};}
// [VI dòng gốc 18] Định nghĩa hàm releaseRoadSelector; tham số: không có | Kiểm tra !roadSelector: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể. | Khai báo biến không gán lại bằng const: h = roadSelector
  function releaseRoadSelector(){if(!roadSelector)return;const h=roadSelector;if(h.obj._f7t===h.fn){if(h.descriptor)Object.defineProperty(h.obj,'_f7t',h.descriptor);else delete h.obj._f7t;}roadSelector=null;}
// [VI dòng gốc 19] Định nghĩa hàm syncRoadSelector; tham số: selector
  function syncRoadSelector(selector){
// [VI dòng gốc 20] Kiểm tra W.KVPV_ROAD_CADENCE?.combatMode!=='basic8001'&&!roadWait(): đúng thì chạy nhánh sau if. | gọi releaseRoadSelector() | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(W.KVPV_ROAD_CADENCE?.fast1ms||W.KVPV_ROAD_CADENCE?.combatMode!=='basic8001'&&!roadWait()){releaseRoadSelector();return;}
// [VI dòng gốc 21] Kiểm tra roadSelector?.obj===selector: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(roadSelector?.obj===selector)return;
// [VI dòng gốc 22] gọi releaseRoadSelector() | Khai báo biến không gán lại bằng const: descriptor = gọi Object.getOwnPropertyDescriptor(selector, '_f7t'); native = đọc selector._f7t
    releaseRoadSelector();const descriptor=Object.getOwnPropertyDescriptor(selector,'_f7t'),native=selector._f7t;
// [VI dòng gốc 23] Kiểm tra descriptor?.configurable===false: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(descriptor?.configurable===false)return;
// [VI dòng gốc 24] Khai báo biến không gán lại bằng const: fn = tạo hàm với tham số active, common, mode, ...rest | Kiểm tra !road()||!owner()||W.KVPV_ROAD_CADENCE?.enabled===false: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: gọi native.call(this, active, common, mode, ...rest). | Kiểm tra roadWait()>0&&Date.now()-lastRoadCast<roadWait(): đúng thì chạy nhánh sau if.
    const fn=function(active,common,mode,...rest){if(!road()||!owner()||W.KVPV_ROAD_CADENCE?.enabled===false)return native.call(this,active,common,mode,...rest);if(roadWait()>0&&Date.now()-lastRoadCast<roadWait())return -1;if(W.KVPV_ROAD_CADENCE?.combatMode!=='basic8001'){
      const plan=W.KVPV_ROAD_CADENCE?.planNativeSelection?.(active,common,mode);
      if(plan?.rows?.length){const picked=Number(native.call(this,plan.rows,[],mode,...rest));
        if(Number.isSafeInteger(picked)&&picked>0)return picked;}
      return native.call(this,active,common,mode,...rest);
    }if(mode!==1)return -1;return native.call(this,(active??[]).filter(r=>Number(r?.[0])===8001),(common??[]).filter(r=>Number(r?.[0])===8001),mode,...rest);};
// [VI dòng gốc 25] gọi Object.defineProperty(selector, '_f7t', {value:fn,writable:true,configurable:true}) | gán roadSelector bằng {obj:selector,fn,descriptor}
    Object.defineProperty(selector,'_f7t',{value:fn,writable:true,configurable:true});roadSelector={obj:selector,fn,descriptor};
// [VI dòng gốc 26] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 27] Khai báo biến không gán lại bằng const: position = tạo hàm với tham số o; mỗi lần gọi trả về gọi o?.property?.get('position') (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  const position=o=>o?.property?.get?.('position');
// [VI dòng gốc 28] Định nghĩa hàm roadDistance; tham số: role, combat | Khai báo biến không gán lại bằng const: a = gọi position(role); b = gọi position(combat?.target) | Kết thúc hàm hiện tại và trả về: nếu a&&b&&[a.x,a.y,b.x,b.y].every(Number.isFinite) thì lấy Math.hypot(a.x-b.x,a.y-b.y), ngược lại lấy null.
  function roadDistance(role,combat){const a=position(role),b=position(combat?.target);return a&&b&&[a.x,a.y,b.x,b.y].every(Number.isFinite)?Math.hypot(a.x-b.x,a.y-b.y):null;}
// [VI dòng gốc 29] Định nghĩa hàm roadClose; tham số: role, combat | Khai báo biến không gán lại bằng const: d = gọi roadDistance(role, combat) | Kết thúc hàm hiện tại và trả về: d!==null và chỉ đánh giá vế phải khi vế trái truthy: d<=(W.KVPV_ROAD_CADENCE?.approachDistance??80).
  function roadClose(role,combat){const d=roadDistance(role,combat);return d!==null&&d<=(W.KVPV_ROAD_CADENCE?.approachDistance??80);}
// [VI dòng gốc 30] Định nghĩa hàm approachRoad; tham số: role, combat | Kiểm tra !road(): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: false.
  function approachRoad(role,combat){if(!road())return false;
// [VI dòng gốc 31] Kiểm tra roadClose(role,combat): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: false.
    if(roadClose(role,combat))return false;
// [VI dòng gốc 32] gán S.reason bằng 'road_closing_to_melee' | Khai báo biến không gán lại bằng const: p = gọi position(combat.target); m = gọi role.getComponent(W._d?._Yct?._zet) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    S.reason='road_closing_to_melee';const p=position(combat.target),m=role.getComponent?.(W._d?._Yct?._zet);
// [VI dòng gốc 33] Kiểm tra W.KVPV_BOSS_TEAM?.priority?.()||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)||(combat.isCooldown?.()!==false&&!W.KVPV_ROAD_CADENCE?.fast1ms)||[3,4].includes(m?._fut): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: true.
    if(W.KVPV_BOSS_TEAM?.priority?.()||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)||combat.isCooldown?.()!==false||[3,4].includes(m?._fut))return true;
// [VI dòng gốc 34] Kiểm tra !p||![p.x,p.y].every(Number.isFinite)||typeof m?.moveTo!=='function': đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: true.
    if(!p||![p.x,p.y].every(Number.isFinite)||typeof m?.moveTo!=='function')return true;
// [VI dòng gốc 35] Kiểm tra Date.now()-(S.lastApproach??-Infinity)>=500: đúng thì chạy nhánh sau if. | gán S.lastApproach bằng Date.now() | gọi m.moveTo(p.x, p.y)
    if(m?.running?.()===true)return true;
    if(Date.now()-(S.lastApproach??-Infinity)>=1000){S.lastApproach=Date.now();m.moveTo(p.x,p.y);}
// [VI dòng gốc 36] Kết thúc hàm hiện tại và trả về: true.
    return true;
// [VI dòng gốc 37] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 38] Khai báo biến không gán lại bằng const: owner = tạo hàm với tham số (không có); mỗi lần gọi trả về actor&&String(W._Ba?._rJ?._O$?.ins?.actorId??'')===actor và chỉ đánh giá vế phải khi vế trái truthy: !W.__KVPV_UNIVERSAL_HALTED
  const owner=()=>actor&&String(W._Ba?._rJ?._O$?.ins?.actorId??'')===actor&&!W.__KVPV_UNIVERSAL_HALTED;
  const liveScene=()=>String(W._Ba?._$a?._yo?.ins?.intoSce?.[0]??'');
  // Wrapper callbacks only read cached primitive eligibility. Never call
  // isCooldown/status/sync or scope.status from the forced getters.
  const forceReady=c=>S.forceActive&&S.forceCombat===c&&c?.target===S.forceTarget&&
    skillPriority==='basic_force_default'&&
    String(W._Ba?._rJ?._O$?.ins?.actorId??'')===actor&&
    !W.__KVPV_UNIVERSAL_HALTED&&W.document?.hidden!==true&&
    W._Ba?._rJ?._O$?.ins?.isDead!==true&&liveScene()===S.forceScene&&
    Date.now()>=Number(W.__KVPV_USER_UI_UNTIL||0);
  function restoreForcedTween(){
    const h=forcedTween;forcedTween=null;if(!h)return;
    try{
      const cur=Object.getOwnPropertyDescriptor(h.obj,'isPlaying');
      if(cur?.get!==h.get||cur?.set!==h.set){
        S.lastError='Foreign animation hook retained; not overwritten';return;
      }
      if(h.own)Object.defineProperty(h.obj,'isPlaying',{
        ...h.own,...(Object.prototype.hasOwnProperty.call(h.own,'value')?{value:h.value}:{})
      });
      else{
        delete h.obj.isPlaying;
        if(h.wrote&&(!h.parent||Object.prototype.hasOwnProperty.call(h.parent,'value')))
          Object.defineProperty(h.obj,'isPlaying',{configurable:true,writable:true,enumerable:true,value:h.value});
      }
    }catch(e){S.lastError=String(e?.message||e);}
  }
  function parentDescriptor(obj,key){
    for(let p=Object.getPrototypeOf(obj);p;p=Object.getPrototypeOf(p)){
      const d=Object.getOwnPropertyDescriptor(p,key);if(d)return d;
    }return null;
  }
  function syncForcedTween(c){
    const obj=forceReady(c)?c?._jh:null;
    if(forcedTween&&forcedTween.obj===obj){
      const d=Object.getOwnPropertyDescriptor(obj,'isPlaying');
      if(d?.get===forcedTween.get&&d?.set===forcedTween.set)return;
      S.lastError='Foreign animation hook changed; not overwritten';
      forcedTween=null;return;
    }
    restoreForcedTween();
    if(!obj||typeof obj!=='object')return;
    const own=Object.getOwnPropertyDescriptor(obj,'isPlaying');
    if((own&&!own.configurable)||(!own&&!Object.isExtensible(obj)))return;
    const parent=own?null:parentDescriptor(obj,'isPlaying');
    let value;try{value=obj.isPlaying;}catch(_){return;}
    let wrote=false;
    const readNative=()=>{try{
      if(own?.get)return own.get.call(obj);
      if(!own&&parent?.get)return parent.get.call(obj);
    }catch(_){}return value;};
    const writeNative=v=>{wrote=true;value=v;try{
      if(own?.set)own.set.call(obj,v);
      else if(!own&&parent?.set)parent.set.call(obj,v);
    }catch(e){S.lastError=String(e?.message||e);}};
    const get=function(){
      if(this===obj&&forceReady(c)){S.forceAnimationReads++;return false;}
      return readNative();
    };
    const set=function(v){writeNative(v);};
    try{
      Object.defineProperty(obj,'isPlaying',{configurable:true,
        enumerable:own?.enumerable??parent?.enumerable??true,get,set});
      forcedTween={obj,own,parent,get,set,get value(){return value;},get wrote(){return wrote;}};
      S.forceAnimationPatched++;
    }catch(e){S.lastError=String(e?.message||e);}
  }
  function syncForceContext(c){
    const t=c?.target;
    // Force only native PvE monsters, never players (type 4), Road,
    // hidden tabs, UI interaction, recovery or another combat owner.
    const can=S.enabled&&skillPriority==='basic_force_default'&&owner()&&outside()&&!road()&&
      W.document?.hidden!==true&&W._Ba?._rJ?._O$?.ins?.isDead!==true&&
      !W.KVPV_BOSS_TEAM?.priority?.()&&
      Date.now()>=Number(W.__KVPV_USER_UI_UNTIL||0)&&
      !W.KVPV_TERRITORY_LOOT?.shouldBlock?.(t)&&
      Number(t?.property?.get?.('type'))===1&&
      c?.isValidTarget?.()===true&&c?.isValidRange?.()===true;
    S.forceCombat=can?c:null;S.forceTarget=can?t:null;
    S.forceScene=can?liveScene():null;S.forceActive=!!can;
    syncForcedTween(c);
  }

// [VI dòng gốc 39] Định nghĩa hàm release; tham số: không có. Mục đích: nhả quyền điều khiển đang giữ | gọi releaseRoadCast() | gọi releaseRoadSelector() | gọi W.KVPV_ROAD_CADENCE?.release() để nhả quyền điều khiển đang giữ (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  function release(){S.forceActive=false;S.forceCombat=null;S.forceTarget=null;restoreForcedTween();S.rapidPoll=false;releaseRoadCast();releaseRoadSelector();W.KVPV_ROAD_CADENCE?.release?.();if(!S.hooks.length&&S.role===null)return;for(const h of S.hooks.slice().reverse()){
// [VI dòng gốc 40] Kiểm tra h.obj[h.key]!==h.fn: đúng thì chạy nhánh sau if. | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
    if(h.obj[h.key]!==h.fn)continue;
// [VI dòng gốc 41] Kiểm tra h.descriptor: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gọi Object.defineProperty(h.obj, h.key, h.descriptor) | xóa thuộc tính h.obj[h.key]
    if(h.descriptor)Object.defineProperty(h.obj,h.key,h.descriptor);else delete h.obj[h.key];
// [VI dòng gốc 42] gán S.hooks bằng [] | gán S.role bằng null | gọi S.basicReady.clear() | gán S.prefer bằng 'basic'
  }S.hooks=[];S.role=null;S.basicReady.clear();S.prefer='basic';S.cursor=0;S.basicCursor=0;}
// [VI dòng gốc 43] Định nghĩa hàm hook; tham số: obj, key, wrap | Khai báo biến không gán lại bằng const: descriptor = gọi Object.getOwnPropertyDescriptor(obj, key)
  function hook(obj,key,wrap){const descriptor=Object.getOwnPropertyDescriptor(obj,key);
// [VI dòng gốc 44] Kiểm tra descriptor&&!descriptor.configurable: đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('Cannot hook '+key)
    if(descriptor&&!descriptor.configurable)throw Error('Cannot hook '+key);
// [VI dòng gốc 45] Khai báo biến không gán lại bằng const: fn = gọi wrap(obj[key]) | gọi Object.defineProperty(obj, key, {value:fn,writable:true,configurable:true,enumerable:!!descriptor?.enumerable})
    const fn=wrap(obj[key]);Object.defineProperty(obj,key,{value:fn,writable:true,configurable:true,enumerable:!!descriptor?.enumerable});
// [VI dòng gốc 46] gọi S.hooks.push({obj,key,fn,descriptor}) để thêm phần tử vào cuối mảng
    S.hooks.push({obj,key,fn,descriptor});
// [VI dòng gốc 47] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 48] Định nghĩa hàm bind; tham số: role, selector, combat
  function bind(role,selector,combat){
// [VI dòng gốc 49] Kiểm tra S.role===role: đúng thì chạy nhánh sau if. | Kiểm tra S.hooks.every(h=>h.obj[h.key]===h.fn): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: true.
    if(S.role===role){if(S.hooks.every(h=>h.obj[h.key]===h.fn))return true;
// [VI dòng gốc 50] gán S.reason bằng 'another_controller_owns_hooks' | Kết thúc hàm hiện tại và trả về: false.
      S.reason='another_controller_owns_hooks';return false;}
// [VI dòng gốc 51] gọi release() để nhả quyền điều khiển đang giữ
    release();
// [VI dòng gốc 52] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài.
    try{
// [VI dòng gốc 53] gọi hook(combat, 'isCooldown', native=>function(){ // Giữ nguyên hồi chiêu native, không ép sẵn sàng khi đang Thí Luyện. return n…)
      hook(combat,'isCooldown',native=>function(){
        if(this===combat&&forceReady(combat)){S.forceCooldownReads++;return false;}
// [VI dòng gốc 54] Chú thích gốc của tác giả; không được thực thi. Nội dung: Giữ nguyên hồi chiêu native, không ép sẵn sàng khi đang Thí Luyện.
        // Giữ nguyên hồi chiêu native, không ép sẵn sàng khi đang Thí Luyện.
// [VI dòng gốc 55] Kết thúc hàm hiện tại và trả về: gọi native.apply(this, arguments).
        return native.apply(this,arguments);
// [VI dòng gốc 56] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
      });
// [VI dòng gốc 57] gọi hook(selector, '_f7t', native=>function(active,common,mode){ if(!S.enabled||!outside()||!owner())return native.apply(this,arg…)
      hook(selector,'_f7t',native=>function(active,common,mode){
// [VI dòng gốc 58] Kiểm tra !S.enabled||!outside()||!owner(): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: gọi native.apply(this, arguments).
        if(!S.enabled||!outside()||!owner())return native.apply(this,arguments);
// [VI dòng gốc 59] Kiểm tra W.KVPV_BOSS_TEAM?.priority?.(): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: áp dụng toán tử - lên 1.
        if(W.KVPV_BOSS_TEAM?.priority?.())return -1;
        if(W.KVPV_TERRITORY_LOOT?.shouldBlock?.(combat.target))return -1;
// [VI dòng gốc 60] Kiểm tra road()&&mode!==1&&!(mode===2&&W.KVPV_TRANSFORM10?.status?.()?.enabled===true&&W.KVPV_TRANSFORM10?.transformed?.()): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: áp dụng toán tử - lên 1.
        if(road()&&mode!==1&&!(mode===2&&W.KVPV_TRANSFORM10?.status?.()?.enabled===true&&W.KVPV_TRANSFORM10?.transformed?.()))return -1;
// [VI dòng gốc 61] Kiểm tra mode===2&&W.KVPV_TRANSFORM10: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: gọi W.KVPV_TRANSFORM10.select(native, this, active, common, mode).
        if(mode===2&&W.KVPV_TRANSFORM10)return W.KVPV_TRANSFORM10.select(native,this,active,common,mode);
// [VI dòng gốc 62] Kiểm tra mode!==1: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: gọi native.apply(this, arguments).
        if(mode!==1)return native.apply(this,arguments);
// [VI dòng gốc 63] Kiểm tra road()&&!roadClose(role,combat): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: áp dụng toán tử - lên 1.
        if(road()&&!roadClose(role,combat))return -1;
// [VI dòng gốc 64] Kiểm tra W._Ba?._rJ?._O$?.ins?.isDead===true||combat.isCooldown?.()!==false||combat.isValidTarget?.()!==true||combat.isValidRange?.()!==true||Date.now()-S.lastCast<castGap(): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: áp dụng toán tử - lên 1.
        if(W._Ba?._rJ?._O$?.ins?.isDead===true||combat.isCooldown?.()!==false||combat.isValidTarget?.()!==true||combat.isValidRange?.()!==true||Date.now()-S.lastCast<castGap())return -1;
// [VI dòng gốc 65] Khai báo biến không gán lại bằng const: all = tạo mảng gồm 2 vị trí: [...(Array.isArray(active)?active:[]),...(Array.isArray(common)?common:[])]; now = gọi Date.now()
        const all=[...(Array.isArray(active)?active:[]),...(Array.isArray(common)?common:[])],now=Date.now();
// [VI dòng gốc 66] Chú thích gốc của tác giả; không được thực thi. Nội dung: Bản sao đòn thường có nhịp 1ms; hàng TH gốc giữ nguyên hồi chiêu native.
        // Bản sao đòn thường có nhịp 1ms; hàng TH gốc giữ nguyên hồi chiêu native.
// [VI dòng gốc 67] Khai báo biến không gán lại bằng const: pickBasic = tạo hàm với tham số (không có)
        const pickBasic=()=>{
// [VI dòng gốc 68] Khai báo biến không gán lại bằng const: rows = gọi all.filter(r=>basic(r?.[0])&&(!road()||Number(r[0])===8001)).map(row=>{const id=Number(row[0]),copy=row.slice(); if(!S.basicReady.has(id))S.basicReady.set(id,road()?0:Number(row[1]…((a,b)=>(Number(a[0])-8001-S.basicCursor+9)%9-(Number(b[0])-8001-S.basicCursor+9)%9) để sắp xếp mảng tại chỗ | Khai báo biến không gán lại bằng const: id = gọi Number(row[0]) để chuyển sang số; copy = gọi row.slice() để lấy một đoạn dữ liệu
          const rows=all.filter(r=>basic(r?.[0])&&(skillPriority!=='basic_force_default'||pveBasic(r[0]))&&(!road()||Number(r[0])===8001)).map(row=>{const id=Number(row[0]),copy=row.slice();
// [VI dòng gốc 69] Kiểm tra !S.basicReady.has(id): đúng thì chạy nhánh sau if. | gọi S.basicReady.set(id, road()?0:Number(row[1])<now?0:now+1)
            if(!S.basicReady.has(id))S.basicReady.set(id,road()?0:Number(row[1])<now?0:now+1);
// [VI dòng gốc 70] Kiểm tra !road(): đúng thì chạy nhánh sau if. | gán copy[1] bằng S.basicReady.get(id) | gán copy[2] bằng castGap() | Kết thúc hàm hiện tại và trả về: copy.
            if(!road()){copy[1]=S.basicReady.get(id);copy[2]=castGap();}return copy;
// [VI dòng gốc 71] Định nghĩa hàm hàm không đặt tên; tham số: row
          }).filter(row=>Number(row[1])<now)
// [VI dòng gốc 72] Định nghĩa hàm hàm không đặt tên; tham số: a, b
            .sort((a,b)=>(Number(a[0])-8001-S.basicCursor+9)%9-(Number(b[0])-8001-S.basicCursor+9)%9);
// [VI dòng gốc 73] Khai báo biến không gán lại bằng const: id = gọi Number(native.call(this,rows,[],mode)) để chuyển sang số | Kiểm tra basic(id): đúng thì chạy nhánh sau if. | gọi S.basicReady.set(id, now+castGap()) | Kết thúc hàm hiện tại và trả về: id.
          const id=Number(native.call(this,rows,[],mode));if(basic(id))S.basicReady.set(id,now+castGap());return id;
// [VI dòng gốc 74] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
        };
// [VI dòng gốc 75] Kiểm tra road(): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: gọi pickBasic().
        if(road()||skillPriority==='basic_force_default')return pickBasic();
// [VI dòng gốc 76] Khai báo biến không gán lại bằng const: pickTH = tạo hàm với tham số (không có)
        const pickTH=()=>{
// [VI dòng gốc 77] Khai báo biến không gán lại bằng const: rows = gọi all.filter(r=>tuyetHoc(r?.[0])&&Number.isFinite(Number(r[1]))&&Number(r[1])<now) .sort((a,b)=>(Number(a[0])-1001-S.cursor+8)%8-(Number(b[0])-1001-S.cursor+8)%8) để sắp xếp mảng tại chỗ
          const rows=all.filter(r=>tuyetHoc(r?.[0])&&Number.isFinite(Number(r[1]))&&Number(r[1])<now)
// [VI dòng gốc 78] Định nghĩa hàm hàm không đặt tên; tham số: a, b
            .sort((a,b)=>(Number(a[0])-1001-S.cursor+8)%8-(Number(b[0])-1001-S.cursor+8)%8);
// [VI dòng gốc 79] Kết thúc hàm hiện tại và trả về: gọi Number(native.call(this,rows,[],mode)) để chuyển sang số.
          return Number(native.call(this,rows,[],mode));
// [VI dòng gốc 80] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
        };
// [VI dòng gốc 81] Khai báo biến không gán lại bằng const: first = nếu S.prefer==='basic' thì lấy pickBasic, ngược lại lấy pickTH; second = nếu S.prefer==='basic' thì lấy pickTH, ngược lại lấy pickBasic
        const preferBasic=skillPriority==='interleaved'&&S.prefer==='basic';
        const first=preferBasic?pickBasic:pickTH,second=preferBasic?pickTH:pickBasic;
// [VI dòng gốc 82] Khai báo biến không gán lại bằng const: id = gọi first() | Kết thúc hàm hiện tại và trả về: nếu basic(id)||tuyetHoc(id) thì lấy id, ngược lại lấy second().
        const id=first();return basic(id)||tuyetHoc(id)?id:second();
// [VI dòng gốc 83] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
      });
// [VI dòng gốc 84] gọi hook(combat, 'combat', native=>function(id){ if(S.enabled&&outside()&&owner()){ if(W.KVPV_BOSS_TEAM?.priority?.())return unde…)
      hook(combat,'combat',native=>function(id){
// [VI dòng gốc 85] Kiểm tra S.enabled&&outside()&&owner(): đúng thì chạy nhánh sau if.
        if(S.enabled&&outside()&&owner()){
// [VI dòng gốc 86] Kiểm tra W.KVPV_BOSS_TEAM?.priority?.(): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: undefined.
          if(W.KVPV_BOSS_TEAM?.priority?.())return undefined;
          if(W.KVPV_TERRITORY_LOOT?.shouldBlock?.(this.target))return undefined;
// [VI dòng gốc 87] Kiểm tra road()&&!roadClose(role,combat): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: undefined.
          if(road()&&!roadClose(role,combat))return undefined;
// [VI dòng gốc 88] Kiểm tra road()&&Number(id)!==8001&&!(W.KVPV_TRANSFORM10?.status?.()?.enabled===true&&W.KVPV_TRANSFORM10?.transformed?.()&&W.KVPV_TRANSFORM10?.has?.(id)): đúng thì chạy nhánh sau if. | tăng S.blocked một đơn vị sau khi lấy giá trị | Kết thúc hàm hiện tại và trả về: undefined.
          if(road()&&Number(id)!==8001&&!(W.KVPV_TRANSFORM10?.status?.()?.enabled===true&&W.KVPV_TRANSFORM10?.transformed?.()&&W.KVPV_TRANSFORM10?.has?.(id))){S.blocked++;return undefined;}
// [VI dòng gốc 89] Kiểm tra !allowed(Number(id)): đúng thì chạy nhánh sau if. | tăng S.blocked một đơn vị sau khi lấy giá trị | Kết thúc hàm hiện tại và trả về: undefined.
          if(!allowed(Number(id))||(skillPriority==='basic_force_default'&&!road()&&!pveBasic(id))){S.blocked++;return undefined;}
// [VI dòng gốc 90] Kiểm tra Date.now()-S.lastCast<castGap()||W._Ba?._rJ?._O$?.ins?.isDead===true||combat.isCooldown?.()!==false||combat.isValidTarget?.()!==true||combat.isValidRange?.()!==true: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: undefined.
          if(Date.now()-S.lastCast<castGap()||W._Ba?._rJ?._O$?.ins?.isDead===true||combat.isCooldown?.()!==false||combat.isValidTarget?.()!==true||combat.isValidRange?.()!==true)return undefined;
// [VI dòng gốc 91] gán S.lastCast bằng Date.now() | tăng S.attempts một đơn vị sau khi lấy giá trị
          S.lastCast=Date.now();S.attempts++;
// [VI dòng gốc 92] Kiểm tra basic(id): đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | tăng S.basicAttempts một đơn vị sau khi lấy giá trị | gán S.prefer bằng road()?'basic':'tuyet_hoc' | gán S.basicCursor bằng (Number(id)-8001+1)%9
          if(basic(id)){S.basicAttempts++;S.prefer=road()||skillPriority==='basic_force_default'?'basic':'tuyet_hoc';S.basicCursor=(Number(id)-8001+1)%9;}else if(tuyetHoc(id)){S.tuyetHocAttempts++;S.prefer='basic';S.cursor=(Number(id)-1001+1)%8;}
// [VI dòng gốc 93] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
        }
// [VI dòng gốc 94] Kết thúc hàm hiện tại và trả về: gọi native.apply(this, arguments).
        return native.apply(this,arguments);
// [VI dòng gốc 95] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
      });
// [VI dòng gốc 96] gán S.role bằng role | Kết thúc hàm hiện tại và trả về: true.
      S.role=role;return true;
// [VI dòng gốc 97] Nhận lỗi bằng e và chạy phần xử lý lỗi. | gọi release() để nhả quyền điều khiển đang giữ | Ném lỗi và chuyển luồng tới catch gần nhất: e
    }catch(e){release();throw e;}
// [VI dòng gốc 98] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 99] Chú thích gốc của tác giả; không được thực thi. Nội dung: Thực hiện một lượt kiểm tra của module; các nhánh bên dưới quyết định có đủ điều kiện để hành động hay phải chờ.
  // Thực hiện một lượt kiểm tra của module; các nhánh bên dưới quyết định có đủ điều kiện để hành động hay phải chờ.
// [VI dòng gốc 100] Định nghĩa hàm tick; tham số: không có. Mục đích: xử lý một nhịp kiểm tra | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài.
  function tick(){try{
// [VI dòng gốc 101] Kiểm tra S.enabled&&S.timer!==null: đúng thì chạy nhánh sau if. | gọi schedule(road()?100:16)
    if(S.enabled&&S.timer!==null)schedule(pollInterval());
// [VI dòng gốc 102] Khai báo biến không gán lại bằng const: gap = W.KVPV_ACCOUNT_POLICY?.pollingGap?.() hoặc dùng vế phải khi vế trái là null/undefined: 0; now = gọi Date.now() | Kiểm tra gap>0&&now-(S.lastPoll??-Infinity)<gap: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể. | gán S.lastPoll bằng now
    const gap=W.KVPV_ACCOUNT_POLICY?.pollingGap?.()??0,now=Date.now();if(gap>0&&now-(S.lastPoll??-Infinity)<gap)return;S.lastPoll=now;
// [VI dòng gốc 103] Kiểm tra W.KVPV_PEAK_CHEST?.status?.()?.inside===true||W.KVPV_EIGHT_CHEST?.status?.()?.inside===true: đúng thì chạy nhánh sau if. | gọi release() để nhả quyền điều khiển đang giữ | gán S.reason bằng 'peak_floor9_gather_no_combat' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(W.KVPV_PEAK_CHEST?.status?.()?.inside===true||W.KVPV_EIGHT_CHEST?.status?.()?.inside===true){release();S.reason='peak_floor9_gather_no_combat';return;}
// [VI dòng gốc 104] Kiểm tra Number(W._ft?._po?.ins?.getCfgById?.(Number(W._C?._Mn?._Cn?.currentID))?.[7])===69: đúng thì chạy nhánh sau if. | gọi release() để nhả quyền điều khiển đang giữ | gán S.reason bằng 'quiz_scene_no_combat' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(Number(W._ft?._po?.ins?.getCfgById?.(Number(W._C?._Mn?._Cn?.currentID))?.[7])===69){release();S.reason='quiz_scene_no_combat';return;}
// [VI dòng gốc 105] Kiểm tra !S.enabled||!owner()||!outside(): đúng thì chạy nhánh sau if. | gọi release() để nhả quyền điều khiển đang giữ | gán S.reason bằng outside()?'disabled_or_actor_changed':'tianquan_yield' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(!S.enabled||!owner()||!outside()){release();S.reason=outside()?'disabled_or_actor_changed':'tianquan_yield';return;}
// [VI dòng gốc 106] gọi W.KVPV_TH300?.releaseOutsideScope() (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    W.KVPV_TH300?.releaseOutsideScope?.();
// [VI dòng gốc 107] Khai báo biến không gán lại bằng const: role = gọi W._C?._Ba?.instance?.getRole(Number(actor)) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const role=W._C?._Ba?.instance?.getRole?.(Number(actor));
// [VI dòng gốc 108] Khai báo biến không gán lại bằng const: selector = gọi role?.getComponent(W._d?._Yct?._Eet) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); combat = gọi role?.getComponent(W._d?._Yct?._Het) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const selector=role?.getComponent?.(W._d?._Yct?._Eet),combat=role?.getComponent?.(W._d?._Yct?._Het);
// [VI dòng gốc 109] Kiểm tra !role||typeof selector?._f7t!=='function'||typeof combat?.combat!=='function': đúng thì chạy nhánh sau if. | gọi release() để nhả quyền điều khiển đang giữ | gán S.reason bằng 'waiting_components' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(!role||typeof selector?._f7t!=='function'||typeof combat?.combat!=='function'){release();S.reason='waiting_components';return;}
// [VI dòng gốc 110] Chú thích gốc của tác giả; không được thực thi. Nội dung: Thí Luyện chỉ hỗ trợ di chuyển; giao chọn skill và tung đòn cho bộ native.
    // Thí Luyện chỉ hỗ trợ di chuyển; giao chọn skill và tung đòn cho bộ native.
// [VI dòng gốc 111] Kiểm tra road(): đúng thì chạy nhánh sau if.
    if(road()){
      S.rapidPoll=false;
// [VI dòng gốc 112] Kiểm tra W.KVPV_ROAD_CADENCE?.enabled===false: đúng thì chạy nhánh sau if. | gọi releaseRoadCast() | gọi releaseRoadSelector() | Kiểm tra S.hooks.length||S.role!==null: đúng thì chạy nhánh sau if.
      if(W.KVPV_ROAD_CADENCE?.enabled===false){releaseRoadCast();releaseRoadSelector();if(S.hooks.length||S.role!==null)release();S.reason='road_support_disabled';return;}
// [VI dòng gốc 113] Kiểm tra S.hooks.length||S.role!==null: đúng thì chạy nhánh sau if. | gọi release() để nhả quyền điều khiển đang giữ | gọi syncRoadCast(combat) | gọi syncRoadSelector(selector)
      if(S.hooks.length||S.role!==null)release();syncRoadCast(combat);syncRoadSelector(selector);W.KVPV_ROAD_CADENCE?.observe?.(role,combat);
// [VI dòng gốc 114] Kiểm tra W._Ba?._rJ?._O$?.ins?.isDead===true: đúng thì chạy nhánh sau if. | gán S.reason bằng 'dead' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      if(W._Ba?._rJ?._O$?.ins?.isDead===true){S.forceActive=false;restoreForcedTween();S.reason='dead';return;}
// [VI dòng gốc 115] Kiểm tra W.document?.hidden&&W.KVPV_ACCOUNT_POLICY?.config?.pauseWhenHidden===true: đúng thì chạy nhánh sau if. | gán S.reason bằng 'hidden_tab' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      if(W.document?.hidden&&W.KVPV_ACCOUNT_POLICY?.config?.pauseWhenHidden===true){S.forceActive=false;restoreForcedTween();S.reason='hidden_tab';return;}
// [VI dòng gốc 116] Kiểm tra W.KVPV_BOSS_TEAM?.priority?.()||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0): đúng thì chạy nhánh sau if. | gán S.reason bằng 'road_yield_native' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      if(W.KVPV_BOSS_TEAM?.priority?.()||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)){S.reason='road_yield_native';return;}
// [VI dòng gốc 117] Khai báo biến không gán lại bằng const: hp = gọi combat.target?.property?.get('hp') (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); lost = combat.isValidTarget?.()!==true hoặc dùng vế phải khi vế trái falsy: Array.isArray(hp)&&Number(hp[0])<=0
      const hp=combat.target?.property?.get?.('hp'),lost=combat.isValidTarget?.()!==true||Array.isArray(hp)&&Number(hp[0])<=0;
// [VI dòng gốc 118] Kiểm tra lost: đúng thì chạy nhánh sau if. | Khai báo biến không gán lại bằng const: user = đọc W._Ba?._rJ?._O$?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Kiểm tra typeof user?.selectTar==='function'&&Date.now()-(S.lastAcquire??-Infinity)>=400: đúng thì chạy nhánh sau if. | gán S.lastAcquire bằng Date.now()
      if(lost){const user=W._Ba?._rJ?._O$?.ins;if(typeof user?.selectTar==='function'&&Date.now()-(S.lastAcquire??-Infinity)>=400){S.lastAcquire=Date.now();S.targetSearches++;user.selectTar(1,-1);}S.reason='waiting_native_target';return;}
// [VI dòng gốc 119] Kiểm tra approachRoad(role,combat): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      if(approachRoad(role,combat))return;
// [VI dòng gốc 120] gán S.reason bằng 'road_native_combat' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.

      S.reason='road_native_combat';return;
// [VI dòng gốc 121] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 122] gọi releaseRoadCast() | gọi releaseRoadSelector() | Kiểm tra !bind(role,selector,combat): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    releaseRoadCast();releaseRoadSelector();if(!bind(role,selector,combat))return;
    syncForceContext(combat);
// [VI dòng gốc 123] gọi W.KVPV_ROAD_CADENCE?.observe(role, combat) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    W.KVPV_ROAD_CADENCE?.observe?.(role,combat);
// [VI dòng gốc 124] Kiểm tra W._Ba?._rJ?._O$?.ins?.isDead===true: đúng thì chạy nhánh sau if. | gán S.reason bằng 'dead' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(W._Ba?._rJ?._O$?.ins?.isDead===true){S.reason='dead';return;}
// [VI dòng gốc 125] Kiểm tra W.document?.hidden&&W.KVPV_ACCOUNT_POLICY?.config?.pauseWhenHidden===true: đúng thì chạy nhánh sau if. | gán S.reason bằng 'hidden_tab' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(W.document?.hidden&&W.KVPV_ACCOUNT_POLICY?.config?.pauseWhenHidden===true){S.reason='hidden_tab';return;}
// [VI dòng gốc 126] Kiểm tra Date.now()-S.lastCast<castGap(): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    S.rapidPoll=W.document?.hidden!==true&&combat.isValidTarget?.()===true&&combat.isValidRange?.()===true&&
      W.KVPV_BOSS_TEAM?.priority?.()!==true&&Date.now()>=Number(W.__KVPV_USER_UI_UNTIL||0);
    if(S.timer!==null)schedule(pollInterval());
    if(Date.now()-S.lastCast<castGap())return;
// [VI dòng gốc 127] Kiểm tra road()&&!W.KVPV_BOSS_TEAM?.priority?.()&&Date.now()>=Number(W.__KVPV_USER_UI_UNTIL||0): đúng thì chạy nhánh sau if.
    if(road()&&!W.KVPV_BOSS_TEAM?.priority?.()&&Date.now()>=Number(W.__KVPV_USER_UI_UNTIL||0)){
// [VI dòng gốc 128] Khai báo biến không gán lại bằng const: hp = gọi combat.target?.property?.get('hp') (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); lost = combat.isValidTarget?.()!==true hoặc dùng vế phải khi vế trái falsy: Array.isArray(hp)&&Number(hp[0])<=0
      const hp=combat.target?.property?.get?.('hp'),lost=combat.isValidTarget?.()!==true||Array.isArray(hp)&&Number(hp[0])<=0;
// [VI dòng gốc 129] Khai báo biến không gán lại bằng const: user = đọc W._Ba?._rJ?._O$?.ins nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
      const user=W._Ba?._rJ?._O$?.ins;
// [VI dòng gốc 130] Kiểm tra lost&&typeof user?.selectTar==='function'&&Date.now()-(S.lastAcquire??-Infinity)>=400: đúng thì chạy nhánh sau if. | gán S.lastAcquire bằng Date.now() | tăng S.targetSearches một đơn vị sau khi lấy giá trị | gọi user.selectTar(1, -1)
      if(lost&&typeof user?.selectTar==='function'&&Date.now()-(S.lastAcquire??-Infinity)>=400){S.lastAcquire=Date.now();S.targetSearches++;user.selectTar(1,-1);}
// [VI dòng gốc 131] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 132] Kiểm tra combat.isValidTarget?.()!==true: đúng thì chạy nhánh sau if. | gán S.reason bằng 'waiting_native_target' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(combat.isValidTarget?.()!==true){S.reason='waiting_native_target';return;}
// [VI dòng gốc 133] Kiểm tra approachRoad(role,combat): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(approachRoad(role,combat))return;
// [VI dòng gốc 134] Kiểm tra combat.isValidRange?.()!==true: đúng thì chạy nhánh sau if. | gán S.reason bằng 'waiting_native_range' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(combat.isValidRange?.()!==true){S.reason='waiting_native_range';return;}
// [VI dòng gốc 135] Kiểm tra combat.isCooldown?.()!==false: đúng thì chạy nhánh sau if. | gán S.reason bằng 'waiting_native_cooldown' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(combat.isCooldown?.()!==false){S.reason='waiting_native_cooldown';return;}
// [VI dòng gốc 136] Khai báo biến không gán lại bằng const: id = gọi Number(selector.selectSkill?.()) để chuyển sang số
    const id=Number(selector.selectSkill?.());
// [VI dòng gốc 137] Kiểm tra !allowed(Number(id)): đúng thì chạy nhánh sau if. | gán S.reason bằng 'waiting_ready_combo' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(!allowed(Number(id))){S.reason='waiting_ready_combo';return;}
// [VI dòng gốc 138] gọi combat.combat(id) | gán S.reason bằng basic(id)?'basic_native_called':'skill_native_called'
    combat.combat(id);S.reason=basic(id)?'basic_native_called':'skill_native_called';
// [VI dòng gốc 139] Nhận lỗi bằng e và chạy phần xử lý lỗi. | gán S.lastError bằng String(e?.message||e) | gán S.reason bằng 'error'
  }catch(e){S.lastError=String(e?.message||e);S.reason='error';}}
// [VI dòng gốc 140] Chú thích gốc của tác giả; không được thực thi. Nội dung: Trả trạng thái hiện tại để kiểm tra; ý nghĩa từng bộ đếm thuộc phạm vi module này.
  // Trả trạng thái hiện tại để kiểm tra; ý nghĩa từng bộ đếm thuộc phạm vi module này.
// [VI dòng gốc 141] Định nghĩa hàm status; tham số: không có. Mục đích: trả trạng thái để kiểm tra | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm enabled, active, intervalMs, skillClientWaitMs, combo, nextPreferred, basicClientWaitMs, basicAttempts, tuyetHocAttempts, roadMelee, attempts, blockedSkills, reason, lastError, note.
  function status(){return {enabled:S.enabled,active:S.hooks.length>0&&outside(),intervalMs:S.timerMs,activePollMs:skillPriority==='basic_force_default'?1:4,idlePollMs:16,roadPollMs:100,rapidPoll:S.rapidPoll,skillClientWaitMs:null,combo:road()?'native_combat':skillPriority,skillPriority,nextPreferred:skillPriority==='basic_force_default'?'basic':skillPriority==='interleaved'?S.prefer:'tuyet_hoc',
    defaultBasicForce:{enabled:skillPriority==='basic_force_default',active:S.forceActive,skillIds:[8001,8002,8003,8004,8005],cooldownFalseReturns:S.forceCooldownReads,animationFalseReads:S.forceAnimationReads,animationPatched:S.forceAnimationPatched,animationForced:!!forcedTween,serverCooldownModified:false},basicClientWaitMs:road()?null:castGap(),basicAttempts:S.basicAttempts,tuyetHocAttempts:S.tuyetHocAttempts,
// [VI dòng gốc 142] Thuộc tính roadMelee: tạo đối tượng gồm active, targetSearches, basicOnly, basicSkill, nativeCooldownBypass, aoePriority, radius, distance, fullBasicRotation, nativeCombat | Thuộc tính active: gọi road() | Thuộc tính targetSearches: đọc S.targetSearches | Thuộc tính basicOnly: false
    roadMelee:{active:road(),targetSearches:S.targetSearches,basicOnly:false,basicSkill:null,nativeCooldownBypass:false,aoePriority:false,radius:W.KVPV_ROAD_CADENCE?.approachDistance??80,distance:S.role?roadDistance(S.role,S.role.getComponent?.(W._d?._Yct?._Het)):null,fullBasicRotation:true,nativeCombat:road()},attempts:S.attempts,blockedSkills:S.blocked,reason:S.reason,lastError:S.lastError,
// [VI dòng gốc 143] Thuộc tính note: "Road Trial delegates skill selection and casting to native combat; script only supports bounded target acquisition and melee approach."
    note:'Road Trial delegates skill selection and casting to native combat; script only supports bounded target acquisition and melee approach.'};}
// [VI dòng gốc 144] Chú thích gốc của tác giả; không được thực thi. Nội dung: Dừng bộ điều khiển, hủy lịch và giải phóng tài nguyên do module này sở hữu.
  // Dừng bộ điều khiển, hủy lịch và giải phóng tài nguyên do module này sở hữu.
// [VI dòng gốc 145] Định nghĩa hàm stop; tham số: không có. Mục đích: dừng bộ điều khiển và dọn tài nguyên | gán S.enabled bằng false | Kiểm tra S.timer!=null: đúng thì chạy nhánh sau if. | gọi W.KVPV_V1?.timers?.clearInterval??W.clearInterval(S.timer)
  function stop(){S.enabled=false;if(S.timer!=null){(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;}release();S.reason='stopped';return status();}
// [VI dòng gốc 146] Chú thích gốc của tác giả; không được thực thi. Nội dung: Bật bộ điều khiển và lịch kiểm tra của module; trả trạng thái sau khi khởi động.
  // Bật bộ điều khiển và lịch kiểm tra của module; trả trạng thái sau khi khởi động.
// [VI dòng gốc 147] Định nghĩa hàm schedule; tham số: ms | Kiểm tra S.timer!==null&&S.timerMs===ms: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể. | Kiểm tra S.timer!==null: đúng thì chạy nhánh sau if.
  function schedule(ms){if(S.timer!==null&&S.timerMs===ms)return;if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);S.timerMs=ms;S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,ms);}
// [VI dòng gốc 148] Định nghĩa hàm start; tham số: không có. Mục đích: khởi động bộ điều khiển | gán S.enabled bằng true | gọi schedule(road()?100:16) | gọi tick() để xử lý một nhịp kiểm tra
  function start(){S.enabled=true;schedule(pollInterval());tick();return status();}
// [VI dòng gốc 149] gán W.KVPV_BASIC10 bằng Object.freeze({start,stop,status,release,sync:tick}) | gọi start() để khởi động bộ điều khiển
  function setSkillPriority(value='tuyet_hoc_first'){
    if(!['basic_force_default','tuyet_hoc_first','interleaved'].includes(value))throw Error('Skill priority must be basic_force_default, tuyet_hoc_first or interleaved');
    if(value!==skillPriority){S.forceActive=false;restoreForcedTween();S.basicReady.clear();S.basicCursor=0;}skillPriority=value;return status();
  }
  W.KVPV_BASIC10=Object.freeze({start,stop,status,release,sync:tick,setSkillPriority});start();
// [VI dòng gốc 150] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: })();
})();
// [VI dòng gốc 151] Dòng trống để tách các phần, không có lệnh thực thi.
