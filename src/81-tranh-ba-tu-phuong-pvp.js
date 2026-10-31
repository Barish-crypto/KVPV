/* Tranh Ba Tu Phuong cross-server PvP. Selected native enemy only.
 * Requires verified event calendar and explicitly calibrated non-common map.
 * No fabricated RPC, target selection, rewards, cooldown overrides or auto entry.
 */
(() => {
  'use strict';
  const W=window,KEY='KVPV_TRANH_BA_TU_PHUONG',old=W[KEY];
  try{old?.stop?.('reload');}catch(_){}
  const actor=String(W.__KVPV_OWN_ACTOR_ID||'');
  const C={pollMs:150,mapId:null,enabled:true,moveGapMs:700,step:90,stopDistance:220,maxChaseDistance:500};
  const S={timer:null,casts:0,th:0,basic:0,blocked:0,reason:'map_not_calibrated',error:'',lastSkill:null,moves:0,lastMoveAt:0};
  const prop=(r,k)=>r?.property?.get?.(k);
  const id=r=>String(r?.id??prop(r,'id')??'');
  const own=()=>!!actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;
  const map=()=>Number(W._C?._Mn?._Cn?.currentID);
  const entryMap=()=>Number(W._Ba?._$a?._yo?.ins?.intoSce?.[0]);
  const liveEvent=()=>{
    const calendar=W.KVPV_DAILY?.lichData?.();
    return Array.isArray(calendar?.active)&&calendar.active.some(e=>e?.key==='tranh_ba_tu_phuong');
  };
  const inside=()=>own()&&Number.isSafeInteger(C.mapId)&&C.mapId>0&&
    map()===C.mapId&&entryMap()===C.mapId&&
    W._Ba?._$a?.SceneUtil?.isCommonScene===false&&liveEvent();
  const comp=(r,k)=>{const t=W._d?._Yct?.[k];return t?r?.getComponent?.(t):null;};
  const me=()=>W._C?._Ba?.instance?.getRole?.(Number(actor));
  const enemy=(r,self)=>{
    const a=Number(prop(self,'campType')),b=Number(prop(r,'campType'));
    const hp=prop(r,'hp');
    return !!r&&r.isValid!==false&&id(r)!==actor&&!!id(r)&&
      Number(prop(r,'type'))===4&&Number.isInteger(a)&&Number.isInteger(b)&&
      a>=0&&b>=0&&a!==b&&
      (!Array.isArray(hp)||Number(hp[0])>0);
  };
  const ready=(selector,now)=>[...(selector?._rtt??[]),...(selector?._wet??[])].filter(x=>{
    const skill=Number(x?.[0]),time=Number(x?.[1]);
    return Number.isInteger(skill)&&(skill>=8001&&skill<=8005)&&
      Number.isFinite(time)&&time<now;
  });
  // Throttled native walking; never alter player movement speed.
  function approach(self,target){
    const p=prop(self,'position'),q=prop(target,'position');
    if(!p||!q||![p.x,p.y,q.x,q.y].every(Number.isFinite))return false;
    const dx=q.x-p.x,dy=q.y-p.y,d=Math.hypot(dx,dy);
    if(d<=C.stopDistance||d>C.maxChaseDistance)return false;
    const now=Date.now();
    if(now-S.lastMoveAt<C.moveGapMs)return false;
    const mover=comp(self,'_zet');
    if(typeof mover?.moveTo!=='function')return false;
    const step=Math.min(C.step,d-C.stopDistance);
    mover.moveTo(Math.round(p.x+dx/d*step),Math.round(p.y+dy/d*step));
    S.lastMoveAt=now;S.moves++;S.reason='native_walk_toward_enemy';
    return true;
  }
  function tick(){
    if(!C.enabled){S.reason='disabled';return;}
    if(!inside()){S.reason=C.mapId===null?'map_not_calibrated':'outside_verified_event';return;}
    if(W.KVPV_ENTRY_POLICY?.manual===true||W.document?.hidden===true||
       W.document?.hasFocus?.()===false||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)){
      S.reason='manual_or_unfocused';return;
    }
    if(W.KVPV_HITRUN1?.status?.(false)?.running||
       W.KVPV_TH300?.status?.(false)?.running||
       W.KVPV_BOSS_TEAM?.priority?.()){
      S.reason='other_combat_owner';return;
    }
    const self=me(),combat=comp(self,'_Het'),selector=comp(self,'_Eet'),target=combat?.target;
    if(W._Ba?._rJ?._O$?.ins?.isDead===true){S.reason='dead';return;}
    if(!enemy(target,self)){S.reason='waiting_verified_selected_enemy';return;}
    if(typeof combat?.combat!=='function'||typeof combat?.isCooldown!=='function'||
       typeof combat?.isValidTarget!=='function'||typeof combat?.isValidRange!=='function'||
       typeof selector?._f7t!=='function'){S.reason='native_combat_missing';return;}
    if(combat.isValidRange()!==true){approach(self,target);S.reason=S.reason==='native_walk_toward_enemy'?S.reason:'target_out_of_range';return;}
    if(combat.isCooldown()!==false||combat.isValidTarget()!==true){
      S.blocked++;S.reason='native_cooldown_range_or_target';return;
    }
    const pool=ready(selector,Date.now());
    if(!pool.length){S.reason='skills_not_ready';return;}
    const skill=Number(selector._f7t(pool,[],1));
    if(!pool.some(x=>Number(x[0])===skill)){S.reason='native_selector_rejected';return;}
    if(!inside()||combat.target!==target||!enemy(target,self))return;
    combat.combat(skill);S.casts++;S.lastSkill=skill;
    S.basic++;
    S.reason='native_pvp_cast';
  }
  function safeTick(){try{tick();}catch(e){S.error=String(e);S.reason='error';}}
  function start(){if(!own())throw Error('Actor not ready');C.enabled=true;
    if(S.timer===null)S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(safeTick,C.pollMs);
    safeTick();return status();}
  function stop(reason='manual'){C.enabled=false;
    if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)?.(S.timer);
    S.timer=null;S.reason=reason;return status();}
  function calibrateHere(){
    if(!own()||!liveEvent()||W._Ba?._$a?.SceneUtil?.isCommonScene!==false||
       map()!==entryMap()||!(map()>0))throw Error('Enter verified event map first');
    C.mapId=map();return status();
  }
  function status(){return {actor,enabled:C.enabled,eventActive:liveEvent(),inside:inside(),
    map:map(),verifiedMap:C.mapId,casts:S.casts,thCasts:S.th,basicCasts:S.basic,
    blocked:S.blocked,moves:S.moves,lastSkill:S.lastSkill,reason:S.reason,error:S.error};}
  W[KEY]=Object.freeze({start,stop,status,tick:safeTick,calibrateHere});
  if(own())start();
})();
