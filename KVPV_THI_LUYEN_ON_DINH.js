(() => {
if(!window.KVPV_BASIC10||!window.KVPV_ROAD_CADENCE||String(window.__KVPV_OWN_ACTOR_ID)!==String(window._Ba?._rJ?._O$?.ins?.actorId))throw Error('Chạy trong đúng game-frame đã nạp FULL.');
 
 
 
(() => {
 
 'use strict';const W=window,old=W.KVPV_ROAD_CADENCE,carry=old?._handoff?.();old?.stop?.();
 
 const actor=String(W.__KVPV_OWN_ACTOR_ID||''),samples=carry?.actor===actor?carry.samples:[];
 
 let enabled=carry?.actor===actor?carry.enabled!==false:true;
 
 let combatMode=carry?.actor===actor&&carry.combatMode==='basic8001'?'basic8001':'native';
 
 let minCastIntervalMs=carry?.actor===actor&&Number.isSafeInteger(carry.minCastIntervalMs)&&carry.minCastIntervalMs>=0&&carry.minCastIntervalMs<=5000?carry.minCastIntervalMs:0;
 
 const effectiveWait=()=>Math.max(100,scopedCombat()?.intervalMs??minCastIntervalMs);
 const scopedCombat=()=>W.KVPV_DESKTOP_CONTROL?.scopeProfile?.('ROAD_TRIAL')??null;
 
  
 
 for(let i=0;i<samples.length-1;i++){const a=samples[i],b=samples[i+1];if(a.readyAt===null&&a.targetId===b.targetId&&a.map===b.map&&b.at>a.at){a.readyAt=b.at;a.recoverySource='next_native_cast_upper_bound';}}
 
 const owner={},S={role:null,combat:null,target:null,rejected:0,error:'',cache:null,cacheAt:-Infinity};
 
 const prop=(o,k)=>o?.property?.get?.(k),id=o=>String(prop(o,'id')??o?.id??'');
 
 const own=()=>actor&&String(W._Ba?._rJ?._O$?.ins?.actorId)===actor&&!W.__KVPV_UNIVERSAL_HALTED;
 
 function scope(){const map=Number(W._C?._Mn?._Cn?.currentID??W._Ba?._$a?._yo?.ins?.intoSce?.[0]);
 
  return own()&&Number(W._ft?._po?.ins?.getCfgById?.(map)?.[7])===41&&W._Ba?._cm?._q3t?.ins?.getHasTeamByType?.(1)===true;}
 
 function target(t){if(S.target===t)return;if(S.target)S.target.off?.(1012,owner,hit);S.target=null;
 
  if(t&&typeof t.on==='function'&&typeof t.off==='function'){S.target=t;t.on(1012,owner,hit);}}
 
 function cast(targetId,skillId){try{
 
  if(!scope()||String(targetId)!==id(S.combat?.target)||Number(prop(S.combat?.target,'type'))!==1)return;
 
  const skill=Number(skillId);if(!((skill>=8001&&skill<=8009)||(skill>=1001&&skill<=1008)))return;
 
  target(S.combat.target);const previous=samples.at(-1);if(previous&&previous.readyAt===null&&previous.targetId===String(targetId)&&Date.now()>previous.at){previous.readyAt=Date.now();previous.recoverySource='next_native_cast_upper_bound';}samples.push({at:Date.now(),id:skill,targetId:String(targetId),occ:Number(prop(S.target,'occ')),map:Number(W._C?._Mn?._Cn?.currentID),hitAt:null,readyAt:null,damage:0});
 
  if(samples.length>240)samples.splice(0,samples.length-240);S.cacheAt=-Infinity;
 
 }catch(e){S.error=String(e);}}
 
 function hit(source,marker,damage,flags,receiver){try{
 
  if(!scope()||String(source)!==actor||String(receiver)!==id(S.target)||!(Number(damage)>0)||(Number(flags)&(4|16|32|64|128|256)))return;
 
  const raw=Number(marker);if(!Number.isSafeInteger(raw)||raw%10000)return;const skill=raw/10000,now=Date.now();
 
  const row=samples.find(r=>r.hitAt===null&&r.targetId===String(receiver)&&r.id===skill&&now-r.at>=0&&now-r.at<=3500);
 
  if(!row){S.rejected++;return;}row.hitAt=now;row.damage=Number(damage);S.cacheAt=-Infinity;
 
 }catch(e){S.error=String(e);}}
 
 function release(){target(null);if(S.role)S.role.off?.(1039,owner,cast);S.role=null;S.combat=null;}
 
 function observe(role,combat){try{
 
  if(!enabled||!scope()){release();return;}
 
  if(S.role!==role){release();if(typeof role?.on!=='function'||typeof role?.off!=='function')return;S.role=role;role.on(1039,owner,cast);}
 
  S.combat=combat;target(combat?.target);
 
  const last=samples.at(-1),now=Date.now();
 
  if(last&&last.readyAt===null&&now>last.at&&id(combat?.target)===last.targetId&&combat?.isCooldown?.()===false&&combat?._jh?.isPlaying!==true){last.readyAt=now;last.recoverySource='polled_native_ready';S.cacheAt=-Infinity;}
 
 }catch(e){S.error=String(e);}}
 
 function report(){const now=Date.now();if(S.cache&&now-S.cacheAt<1000)return S.cache;S.cacheAt=now;
 
  const groups=new Map();for(const r of samples){const key=r.occ+'/'+r.id;let g=groups.get(key);if(!g){g={id:r.id,occ:r.occ,casts:0,hits:0,damage:0,cycleDamage:0,cycles:[],latencies:[]};groups.set(key,g);}
 
   g.casts++;if(r.hitAt!==null){g.hits++;g.damage+=r.damage;g.latencies.push(r.hitAt-r.at);if(r.readyAt!==null&&r.readyAt>=r.hitAt){g.cycles.push(r.readyAt-r.at);g.cycleDamage+=r.damage;}}}
 
  const rows=[...groups.values()].map(g=>({id:g.id,occ:g.occ,casts:g.casts,hits:g.hits,meanHitMs:g.latencies.length?Math.round(g.latencies.reduce((a,b)=>a+b,0)/g.latencies.length):null,
 
   measuredCycles:g.cycles.length,meanCycleMs:g.cycles.length?Math.round(g.cycles.reduce((a,b)=>a+b,0)/g.cycles.length):null,
 
   damagePerCycleMs:g.cycles.length?g.cycleDamage/Math.max(1,g.cycles.reduce((a,b)=>a+b,0)):null}));
 
  const occ=Number(prop(S.combat?.target,'occ')),candidates=rows.filter(r=>r.occ===occ&&r.id>=8001&&r.id<=8009&&r.hits>=8&&r.measuredCycles>=8&&r.hits/r.casts>=.8);
 
  candidates.sort((a,b)=>b.damagePerCycleMs-a.damagePerCycleMs);
 
  S.cache={enabled,combatMode:scopedCombat()?.mode??combatMode,minCastIntervalMs:effectiveWait(),approachDistance:scopedCombat()?.distance??80,nativeCombat:true,clientSkillWaitMs:null,pollIntervalMs:100,inside:scope(),active:enabled&&scope()&&!!S.role,casts:samples.length,matchedHits:samples.filter(r=>r.hitAt!==null).length,
 
   preferredBasic:candidates.length>=2?candidates[0].id:null,reason:!enabled?'disabled':!scope()?'waiting_road_scene':candidates.length>=2?'measured_basic_preferred':'collecting_8_hits_and_cycles_per_basic',rows,rejected:S.rejected,lastError:S.error,
 
   note:'One direct damage confirmation per cast; Recovery uses native-ready polling or next native cast as an upper bound, not a server throughput limit. Native skill selection; 100ms minimum cast spacing; original skill rows remain unchanged. Server cooldown is not modified.'};return S.cache;
 
 }
 
 function selectSkill1ms(){return -1;}
 function start(){enabled=true;S.cacheAt=-Infinity;return report();}
 
 function stop(){enabled=false;release();S.cacheAt=-Infinity;return report();}
 
 function setCombatMode(mode){if(!['native','basic8001'].includes(mode))throw Error('Invalid Road combat mode');combatMode=mode;S.cacheAt=-Infinity;return report();}
 
 function setMinCastInterval(ms){if(!Number.isSafeInteger(ms)||ms<0||ms>5000)throw Error('Road interval must be 0..5000ms');minCastIntervalMs=ms;S.cacheAt=-Infinity;return report();}
 
 W.KVPV_ROAD_CADENCE=Object.freeze({fast1ms:false,selectSkill1ms,get enabled(){return enabled;},get combatMode(){return scopedCombat()?.mode??combatMode;},get minCastIntervalMs(){return effectiveWait();},get approachDistance(){return scopedCombat()?.distance??80;},setMinCastInterval,setCombatMode,start,observe,release,stop,status:report,preferredBasic:()=>enabled&&scope()?report().preferredBasic:null,_handoff:()=>({actor,samples,enabled,combatMode,minCastIntervalMs})});
 
})();
 

 
 
 
(() => {
 
  'use strict';
 
  const W=window;W.KVPV_BASIC10?.stop?.();
  let skillPriority='tuyet_hoc_first';
 
  const actor=String(W.__KVPV_OWN_ACTOR_ID||'');
 
  const S={enabled:true,timer:null,timerMs:16,hooks:[],role:null,lastCast:-Infinity,attempts:0,blocked:0,reason:'starting',lastError:'',prefer:'basic',cursor:0,basicCursor:0,basicReady:new Map(),targetSearches:0,basicAttempts:0,tuyetHocAttempts:0};
 
  const basic=id=>Number.isSafeInteger(Number(id))&&Number(id)>=8001&&Number(id)<=8009;
 
  const tuyetHoc=id=>Number.isSafeInteger(Number(id))&&Number(id)>=1001&&Number(id)<=1008;
 
  const allowed=id=>basic(id)||tuyetHoc(id)||W.KVPV_TRANSFORM10?.has?.(id);
 
  const outside=()=>(W.KVPV_FAR_SCOPE??W.KVPV_TQ_SCOPE)?.inside?.()===false;
 
  const road=()=>Number(W._ft?._po?.ins?.getCfgById?.(Number(W._C?._Mn?._Cn?.currentID))?.[7])===41&&W._Ba?._cm?._q3t?.ins?.getHasTeamByType?.(1)===true;
 
  const castGap=()=>road()?250:1;
 
  let roadSelector=null;
 
  let roadCast=null,lastRoadCast=-Infinity;
 
  const roadWait=()=>{const n=W.KVPV_ROAD_CADENCE?.minCastIntervalMs;return Number.isSafeInteger(n)&&n>=0&&n<=5000?n:0;};
 
  const roadSpeedClips=new Map();
  const roadAnimationSpeed=()=>Number(W.KVPV_TH300?.status?.(false)?.basicAnimationSpeed??1);
  function restoreRoadSpeed(){for(const [clip,state] of roadSpeedClips)try{if(clip._nt===state.applied)clip.timeScale=state.before;}catch(e){S.lastError=String(e);}roadSpeedClips.clear();}
  function roadAnimationCall(native,self,args){const factor=roadAnimationSpeed(),avatar=self?._Qrt,me=W._C?._Ba?.instance?.getRole?.(Number(actor));if(factor<=1||Number(args[0])!==8001||!road()||!owner()||W.KVPV_ROAD_CADENCE?.enabled===false||(W.KVPV_ROAD_CADENCE?.combatMode!=='basic8001'&&!W.KVPV_ROAD_CADENCE?.fast1ms)||self.owner!==me||typeof avatar?.getActionTween!=='function')return native.apply(self,args);const original=avatar.getActionTween,action=String(self._mvt?.(8001)?.[5]||'attack');const wrapped=function(...a){if(a[0]!==action)return original.apply(this,a);const before=Number(a[2]??1);if(!Number.isFinite(before)||before<=0)return original.apply(this,a);a[2]=Math.min(factor,before*factor);const tween=original.apply(this,a),clip=this.getCurAction;if(clip&&typeof clip==='object'&&roadSpeedClips.size<32)roadSpeedClips.set(clip,{before,applied:a[2]});return tween;};avatar.getActionTween=wrapped;try{return native.apply(self,args);}finally{if(avatar.getActionTween===wrapped)avatar.getActionTween=original;}}
  function releaseRoadCast(){restoreRoadSpeed();if(!roadCast)return;const h=roadCast;if(h.obj.combat===h.fn){if(h.descriptor)Object.defineProperty(h.obj,'combat',h.descriptor);else delete h.obj.combat;}roadCast=null;lastRoadCast=-Infinity;}
 
  function syncRoadCast(combat){if(roadAnimationSpeed()<=1)restoreRoadSpeed();if(!roadWait()&&roadAnimationSpeed()<=1){releaseRoadCast();return;}if(roadCast?.obj===combat)return;releaseRoadCast();const descriptor=Object.getOwnPropertyDescriptor(combat,'combat'),native=combat.combat;if(descriptor?.configurable===false)return;const fn=function(...args){if(road()&&owner()&&W.KVPV_ROAD_CADENCE?.enabled!==false&&roadWait()>0){const now=Date.now();if(now-lastRoadCast<roadWait())return;lastRoadCast=now;}return roadAnimationCall(native,this,args);};Object.defineProperty(combat,'combat',{value:fn,writable:true,configurable:true});roadCast={obj:combat,fn,descriptor};}
 
  function releaseRoadSelector(){if(!roadSelector)return;const h=roadSelector;if(h.obj._f7t===h.fn){if(h.descriptor)Object.defineProperty(h.obj,'_f7t',h.descriptor);else delete h.obj._f7t;}roadSelector=null;}
 
  function syncRoadSelector(selector){
 
    if(W.KVPV_ROAD_CADENCE?.fast1ms||W.KVPV_ROAD_CADENCE?.combatMode!=='basic8001'&&!roadWait()){releaseRoadSelector();return;}
 
    if(roadSelector?.obj===selector)return;
 
    releaseRoadSelector();const descriptor=Object.getOwnPropertyDescriptor(selector,'_f7t'),native=selector._f7t;
 
    if(descriptor?.configurable===false)return;
 
    const fn=function(active,common,mode,...rest){if(!road()||!owner()||W.KVPV_ROAD_CADENCE?.enabled===false)return native.call(this,active,common,mode,...rest);if(roadWait()>0&&Date.now()-lastRoadCast<roadWait())return -1;if(W.KVPV_ROAD_CADENCE?.combatMode!=='basic8001')return native.call(this,active,common,mode,...rest);if(mode!==1)return -1;return native.call(this,(active??[]).filter(r=>Number(r?.[0])===8001),(common??[]).filter(r=>Number(r?.[0])===8001),mode,...rest);};
 
    Object.defineProperty(selector,'_f7t',{value:fn,writable:true,configurable:true});roadSelector={obj:selector,fn,descriptor};
 
  }
 
  const position=o=>o?.property?.get?.('position');
 
  function roadDistance(role,combat){const a=position(role),b=position(combat?.target);return a&&b&&[a.x,a.y,b.x,b.y].every(Number.isFinite)?Math.hypot(a.x-b.x,a.y-b.y):null;}
 
  function roadClose(role,combat){const d=roadDistance(role,combat);return d!==null&&d<=(W.KVPV_ROAD_CADENCE?.approachDistance??80);}
 
  function approachRoad(role,combat){if(!road())return false;
 
    if(roadClose(role,combat))return false;
 
    S.reason='road_closing_to_melee';const p=position(combat.target),m=role.getComponent?.(W._d?._Yct?._zet);
 
    if(W.KVPV_BOSS_TEAM?.priority?.()||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)||combat.isCooldown?.()!==false||[3,4].includes(m?._fut))return true;
 
    if(!p||![p.x,p.y].every(Number.isFinite)||typeof m?.moveTo!=='function')return true;
 
    if(m?.running?.()===true)return true;
    if(Date.now()-(S.lastApproach??-Infinity)>=1000){S.lastApproach=Date.now();m.moveTo(p.x,p.y);}
 
    return true;
 
  }
 
  const owner=()=>actor&&String(W._Ba?._rJ?._O$?.ins?.actorId??'')===actor&&!W.__KVPV_UNIVERSAL_HALTED;
 
  function release(){releaseRoadCast();releaseRoadSelector();W.KVPV_ROAD_CADENCE?.release?.();if(!S.hooks.length&&S.role===null)return;for(const h of S.hooks.slice().reverse()){
 
    if(h.obj[h.key]!==h.fn)continue;
 
    if(h.descriptor)Object.defineProperty(h.obj,h.key,h.descriptor);else delete h.obj[h.key];
 
  }S.hooks=[];S.role=null;S.basicReady.clear();S.prefer='basic';S.cursor=0;S.basicCursor=0;}
 
  function hook(obj,key,wrap){const descriptor=Object.getOwnPropertyDescriptor(obj,key);
 
    if(descriptor&&!descriptor.configurable)throw Error('Cannot hook '+key);
 
    const fn=wrap(obj[key]);Object.defineProperty(obj,key,{value:fn,writable:true,configurable:true,enumerable:!!descriptor?.enumerable});
 
    S.hooks.push({obj,key,fn,descriptor});
 
  }
 
  function bind(role,selector,combat){
 
    if(S.role===role){if(S.hooks.every(h=>h.obj[h.key]===h.fn))return true;
 
      S.reason='another_controller_owns_hooks';return false;}
 
    release();
 
    try{
 
      hook(combat,'isCooldown',native=>function(){
 
         
 
        return native.apply(this,arguments);
 
      });
 
      hook(selector,'_f7t',native=>function(active,common,mode){
 
        if(!S.enabled||!outside()||!owner())return native.apply(this,arguments);
 
        if(W.KVPV_BOSS_TEAM?.priority?.())return -1;
        if(W.KVPV_TERRITORY_LOOT?.shouldBlock?.(combat.target))return -1;
 
        if(road()&&mode!==1&&!(mode===2&&W.KVPV_TRANSFORM10?.status?.()?.enabled===true&&W.KVPV_TRANSFORM10?.transformed?.()))return -1;
 
        if(mode===2&&W.KVPV_TRANSFORM10)return W.KVPV_TRANSFORM10.select(native,this,active,common,mode);
 
        if(mode!==1)return native.apply(this,arguments);
 
        if(road()&&!roadClose(role,combat))return -1;
 
        if(W._Ba?._rJ?._O$?.ins?.isDead===true||combat.isCooldown?.()!==false||combat.isValidTarget?.()!==true||combat.isValidRange?.()!==true||Date.now()-S.lastCast<castGap())return -1;
 
        const all=[...(Array.isArray(active)?active:[]),...(Array.isArray(common)?common:[])],now=Date.now();
 
         
 
        const pickBasic=()=>{
 
          const rows=all.filter(r=>basic(r?.[0])&&(!road()||Number(r[0])===8001)).map(row=>{const id=Number(row[0]),copy=row.slice();
 
            if(!S.basicReady.has(id))S.basicReady.set(id,road()?0:Number(row[1])<now?0:now+1);
 
            if(!road()){copy[1]=S.basicReady.get(id);copy[2]=castGap();}return copy;
 
          }).filter(row=>Number(row[1])<now)
 
            .sort((a,b)=>(Number(a[0])-8001-S.basicCursor+9)%9-(Number(b[0])-8001-S.basicCursor+9)%9);
 
          const id=Number(native.call(this,rows,[],mode));if(basic(id))S.basicReady.set(id,now+castGap());return id;
 
        };
 
        if(road())return pickBasic();
 
        const pickTH=()=>{
 
          const rows=all.filter(r=>tuyetHoc(r?.[0])&&Number.isFinite(Number(r[1]))&&Number(r[1])<now)
 
            .sort((a,b)=>(Number(a[0])-1001-S.cursor+8)%8-(Number(b[0])-1001-S.cursor+8)%8);
 
          return Number(native.call(this,rows,[],mode));
 
        };
 
        const preferBasic=skillPriority==='interleaved'&&S.prefer==='basic';
        const first=preferBasic?pickBasic:pickTH,second=preferBasic?pickTH:pickBasic;
 
        const id=first();return basic(id)||tuyetHoc(id)?id:second();
 
      });
 
      hook(combat,'combat',native=>function(id){
 
        if(S.enabled&&outside()&&owner()){
 
          if(W.KVPV_BOSS_TEAM?.priority?.())return undefined;
          if(W.KVPV_TERRITORY_LOOT?.shouldBlock?.(this.target))return undefined;
 
          if(road()&&!roadClose(role,combat))return undefined;
 
          if(road()&&Number(id)!==8001&&!(W.KVPV_TRANSFORM10?.status?.()?.enabled===true&&W.KVPV_TRANSFORM10?.transformed?.()&&W.KVPV_TRANSFORM10?.has?.(id))){S.blocked++;return undefined;}
 
          if(!allowed(Number(id))){S.blocked++;return undefined;}
 
          if(Date.now()-S.lastCast<castGap()||W._Ba?._rJ?._O$?.ins?.isDead===true||combat.isCooldown?.()!==false||combat.isValidTarget?.()!==true||combat.isValidRange?.()!==true)return undefined;
 
          S.lastCast=Date.now();S.attempts++;
 
          if(basic(id)){S.basicAttempts++;S.prefer=road()?'basic':'tuyet_hoc';S.basicCursor=(Number(id)-8001+1)%9;}else if(tuyetHoc(id)){S.tuyetHocAttempts++;S.prefer='basic';S.cursor=(Number(id)-1001+1)%8;}
 
        }
 
        return native.apply(this,arguments);
 
      });
 
      S.role=role;return true;
 
    }catch(e){release();throw e;}
 
  }
 
   
 
  function tick(){try{
 
    if(S.enabled&&S.timer!==null)schedule(road()?100:16);
 
    const gap=W.KVPV_ACCOUNT_POLICY?.pollingGap?.()??0,now=Date.now();if(gap>0&&now-(S.lastPoll??-Infinity)<gap)return;S.lastPoll=now;
 
    if(W.KVPV_PEAK_CHEST?.status?.()?.inside===true||W.KVPV_EIGHT_CHEST?.status?.()?.inside===true){release();S.reason='peak_floor9_gather_no_combat';return;}
 
    if(Number(W._ft?._po?.ins?.getCfgById?.(Number(W._C?._Mn?._Cn?.currentID))?.[7])===69){release();S.reason='quiz_scene_no_combat';return;}
 
    if(!S.enabled||!owner()||!outside()){release();S.reason=outside()?'disabled_or_actor_changed':'tianquan_yield';return;}
 
    W.KVPV_TH300?.releaseOutsideScope?.();
 
    const role=W._C?._Ba?.instance?.getRole?.(Number(actor));
 
    const selector=role?.getComponent?.(W._d?._Yct?._Eet),combat=role?.getComponent?.(W._d?._Yct?._Het);
 
    if(!role||typeof selector?._f7t!=='function'||typeof combat?.combat!=='function'){release();S.reason='waiting_components';return;}
 
     
 
    if(road()){
 
      if(W.KVPV_ROAD_CADENCE?.enabled===false){releaseRoadCast();releaseRoadSelector();if(S.hooks.length||S.role!==null)release();S.reason='road_support_disabled';return;}
 
      if(S.hooks.length||S.role!==null)release();syncRoadCast(combat);syncRoadSelector(selector);W.KVPV_ROAD_CADENCE?.observe?.(role,combat);
 
      if(W._Ba?._rJ?._O$?.ins?.isDead===true){S.reason='dead';return;}
 
      if(W.document?.hidden&&W.KVPV_ACCOUNT_POLICY?.config?.pauseWhenHidden===true){S.reason='hidden_tab';return;}
 
      if(W.KVPV_BOSS_TEAM?.priority?.()||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)){S.reason='road_yield_native';return;}
 
      const hp=combat.target?.property?.get?.('hp'),lost=combat.isValidTarget?.()!==true||Array.isArray(hp)&&Number(hp[0])<=0;
 
      if(lost){const user=W._Ba?._rJ?._O$?.ins;if(typeof user?.selectTar==='function'&&Date.now()-(S.lastAcquire??-Infinity)>=400){S.lastAcquire=Date.now();S.targetSearches++;user.selectTar(1,-1);}S.reason='waiting_native_target';return;}
 
      if(approachRoad(role,combat))return;
 

      S.reason='road_native_combat';return;
 
    }
 
    releaseRoadCast();releaseRoadSelector();if(!bind(role,selector,combat))return;
 
    W.KVPV_ROAD_CADENCE?.observe?.(role,combat);
 
    if(W._Ba?._rJ?._O$?.ins?.isDead===true){S.reason='dead';return;}
 
    if(W.document?.hidden&&W.KVPV_ACCOUNT_POLICY?.config?.pauseWhenHidden===true){S.reason='hidden_tab';return;}
 
    if(Date.now()-S.lastCast<castGap())return;
 
    if(road()&&!W.KVPV_BOSS_TEAM?.priority?.()&&Date.now()>=Number(W.__KVPV_USER_UI_UNTIL||0)){
 
      const hp=combat.target?.property?.get?.('hp'),lost=combat.isValidTarget?.()!==true||Array.isArray(hp)&&Number(hp[0])<=0;
 
      const user=W._Ba?._rJ?._O$?.ins;
 
      if(lost&&typeof user?.selectTar==='function'&&Date.now()-(S.lastAcquire??-Infinity)>=400){S.lastAcquire=Date.now();S.targetSearches++;user.selectTar(1,-1);}
 
    }
 
    if(combat.isValidTarget?.()!==true){S.reason='waiting_native_target';return;}
 
    if(approachRoad(role,combat))return;
 
    if(combat.isValidRange?.()!==true){S.reason='waiting_native_range';return;}
 
    if(combat.isCooldown?.()!==false){S.reason='waiting_native_cooldown';return;}
 
    const id=Number(selector.selectSkill?.());
 
    if(!allowed(Number(id))){S.reason='waiting_ready_combo';return;}
 
    combat.combat(id);S.reason=basic(id)?'basic_native_called':'skill_native_called';
 
  }catch(e){S.lastError=String(e?.message||e);S.reason='error';}}
 
   
 
  function status(){return {enabled:S.enabled,active:S.hooks.length>0&&outside(),intervalMs:S.timerMs,skillClientWaitMs:null,combo:road()?'native_combat':skillPriority,skillPriority,nextPreferred:skillPriority==='interleaved'?S.prefer:'tuyet_hoc',basicClientWaitMs:road()?null:castGap(),basicAttempts:S.basicAttempts,tuyetHocAttempts:S.tuyetHocAttempts,
 
    roadMelee:{active:road(),targetSearches:S.targetSearches,basicOnly:false,basicSkill:null,nativeCooldownBypass:false,aoePriority:false,radius:W.KVPV_ROAD_CADENCE?.approachDistance??80,distance:S.role?roadDistance(S.role,S.role.getComponent?.(W._d?._Yct?._Het)):null,fullBasicRotation:true,nativeCombat:road()},attempts:S.attempts,blockedSkills:S.blocked,reason:S.reason,lastError:S.lastError,
 
    note:'Road Trial delegates skill selection and casting to native combat; script only supports bounded target acquisition and melee approach.'};}
 
   
 
  function stop(){S.enabled=false;if(S.timer!=null){(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;}release();S.reason='stopped';return status();}
 
   
 
  function schedule(ms){if(S.timer!==null&&S.timerMs===ms)return;if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);S.timerMs=ms;S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,ms);}
 
  function start(){S.enabled=true;schedule(road()?100:16);tick();return status();}
 
  function setSkillPriority(value='tuyet_hoc_first'){
    if(!['tuyet_hoc_first','interleaved'].includes(value))throw Error('Skill priority must be tuyet_hoc_first or interleaved');
    skillPriority=value;return status();
  }
  W.KVPV_BASIC10=Object.freeze({start,stop,status,release,sync:tick,setSkillPriority});start();
 
})();
 

window.KVPV_ROAD_CADENCE.setMinCastInterval(100);window.KVPV_ROAD_CADENCE.start();window.KVPV_BASIC10.sync();console.info('[KVPV] Thí Luyện: native, tối thiểu 100ms, hỗ trợ mỗi 100ms, áp sát tối đa 1 lần/giây.');
})();
