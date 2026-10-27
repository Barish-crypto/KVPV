/* KVPV STAND281 — native-only boss positioning experiment.
 * Uses the bundled combat engine and KVPV_RANGE281 client-range guard.
 * Moves the owned actor toward ~281 client units while FIGHT; NEVER when
 * HitRun is dodging, retreating, kiting, dead, in PvP, or outside Tian Guan.
 * Actual server hit range is unknown. Fall back on ABSENCE of own BASIC hits,
 * not HP of Boss or companion/reflection events. Does not generate attacks/RPCs.
 */
(() => {
  'use strict';
  const W=window, NAME='KVPV_STAND281';
  try { W[NAME]?.stop?.(); } catch(e) { console.warn('[STAND281] Old instance:',String(e)); }
  const actorId=String(W._Ba?._rJ?._O$?.ins?.actorId??'');
  const originalActor=actorId;
  if(!actorId || !W.KVPV_RANGE281?.status || !W.KVPV_HITRUN1?.status ||
     !W._d?._Yct?._Het || !W._d?._Yct?._zet) {
    console.error('[STAND281] Cần module combat và RANGE281 của V1 trong game-frame.');return;
  }
  const range=W.KVPV_RANGE281.status(false);
  if(!range.hookAttached) {
    console.error('[STAND281] RANGE281 chưa được cài.');return;
  }
  const CFG={standDistance:280.8,displayDistance:281,midDistance:235,nearDistance:185,
    tolerance:3.5,moveCooldownMs:1650,sampleMs:650,
    nearStandGraceMs:5500,stageWaitMs:6200,returnTo281OnNextBoss:true};
  let enabled=false,ended=false,timer=null,target=null,targetId='',targetName='',
      owner={},actor=null,scene=null,moveCount=0,ownBasicHits=0,near281BasicHits=0,
      stage=0,stageAt=0,stableSince=0,lastHitAt=0,lastMoveAt=-Infinity,
      lastDistance=null,lastReason='waiting',lastError='',fallbacks=0,changes=0,
      skipped=0,binds=0,events=[];
  const now=()=>Date.now();
  const prop=(r,k)=>{try{return r?.property?.get?.(k)??null;}catch(_){return null;}};
  const oid=r=>String(prop(r,'id')??r?.id??'');
  const position=r=>{
    const p=prop(r,'position');if(!p||p.x==null||p.y==null)return null;
    const x=Number(p.x),y=Number(p.y);
    return Number.isFinite(x)&&Number.isFinite(y)?{x,y}:null;
  };
  const getActor=()=>{
    const world=W._C?._Ba?.instance;
    return world?.getRole?.(Number(originalActor))||world?.getRole?.(originalActor)||null;
  };
  const getComponents=()=>{
    const a=getActor();return {actor:a,
      mover:a?.getComponent?.(W._d._Yct._zet),
      combat:a?.getComponent?.(W._d._Yct._Het)};
  };
  const currentScene=()=>String(W._Ba?._$a?._yo?.ins?.intoSce?.[0]??'?');
  const stageOcc=()=>{
    try{
      const level=Number(W._Ba?._Co?._Mo?.ins?.curLv);
      const table=W._ft?._h$?.ins;
      const cfg=table?.getCfgByLv?.(level);
      const occ=Number(cfg&&table?.occ?.(cfg,level));
      return Number.isSafeInteger(occ)&&occ>0?occ:null;
    }catch(_){return null;}
  };
  function record(type,meta){events.push({at:now(),type,...meta});if(events.length>35)events.shift();}
  function clearTarget(){
    if(target&&typeof target.off==='function')try{target.off(1012,owner,hit);}catch(e){lastError=String(e);}
    target=null;targetId='';targetName='';stableSince=0;stageAt=0;stage=0;
  }
  function hit(source,marker,damage,flags,receiver){
    if(!enabled||!target||String(source)!==actorId||String(receiver)!==targetId)return;
    const skill=Number(marker),f=Number(flags)||0;
    // Evidence of OWN direct 8001..8005 only, not pet or secondary/reflect/heal.
    if(!Number.isFinite(+damage)||Number(damage)<=0||skill%10000!==0 ||
       skill/10000<8001||skill/10000>8005 || (f&(4|32|128|256)))return;
    ownBasicHits++;lastHitAt=now();
    const p=position(actor),b=position(target);
    const d=p&&b?Math.hypot(p.x-b.x,p.y-b.y):null;
    if(stage===0 && d!==null && d>=CFG.standDistance-5 && d<=281.5)near281BasicHits++;
    record('BASIC_HIT',{skillId:skill/10000,stage,distance:d===null?null:+d.toFixed(1)});
  }
  function bind(t){
    if(target===t)return true;
    clearTarget();target=t;targetId=oid(t);targetName=String(prop(t,'name')??'');
    if(!targetId||typeof t.on!=='function'||typeof t.off!=='function'){clearTarget();return false;}
    try{t.on(1012,owner,hit);binds++;changes++;record('BOSS',{boss:targetName});return true;}
    catch(e){lastError='attach: '+String(e);clearTarget();return false;}
  }
  const desired=()=>[CFG.standDistance,CFG.midDistance,CFG.nearDistance][stage];
  function eligible(c,hr){
    if(!enabled||ended)return 'disabled';
    if(String(W._Ba?._rJ?._O$?.ins?.actorId??'')!==originalActor)return 'actor_changed';
    if(W.__KVPV_UNIVERSAL_HALTED===true)return 'halted';
    if(!hr?.running||hr.phase!=='FIGHT')return 'hitrun_not_fight';
    if(Number(hr.hpPct)<Math.max(Number(hr.leavePct||35)+10,48))return 'hp_not_ready';
    if(!c.actor||!c.mover||!c.combat||typeof c.mover.moveTo!=='function')return 'components_missing';
    if(Number(c.mover._fut)===3||Number(c.mover._fut)===4)return 'movement_disabled';
    if(W.document?.hidden===true)return 'background_tab';
    if(scene!==null&&currentScene()!==scene)return 'scene_changed';
    const t=c.combat.target;
    if(!t||t.isValid===false||Number(prop(t,'type'))!==1)return 'not_boss';
    if(stageOcc()===null||Number(prop(t,'occ'))!==stageOcc())return 'not_tianquan';
    if(Number(W._ft?._tY?.ins?.getCfgById?.(Number(prop(t,'occ')))?.[3])!==280)return 'not_cfg_280';
    if(!position(c.actor)||!position(t))return 'position_unavailable';
    if(W.KVPV_RANGE281?.status?.(false)?.hookAttached!==true)return 'range281_lost';
    const nextDodge=W.KVPV_V127_BASIC?.status?.(false)?.nextImpactInMs;
    if(Number.isFinite(nextDodge)&&nextDodge>=-100&&nextDodge<=1350)return 'dodge_soon';
    return null;
  }
  function activePosOff(){
    try{
      const ctrl=W.KVPV_BOSS_POSITION;
      if(ctrl?.status?.(false)?.active)ctrl.enable(false);
    }catch(e){lastError='position override: '+String(e);}
  }
  function advance(t,reason){
    if(stage>=2)return;
    stage++;stageAt=t;stableSince=0;fallbacks++;
    record('FALLBACK',{stage,distance:desired(),reason});
    console.warn('[STAND281] Chưa thấy đòn thường xác nhận ở mốc trước; thử đứng gần hơn:',desired());
  }
  function tick(){
    if(ended||!enabled)return;
    try{
      const hr=W.KVPV_HITRUN1?.status?.(false),c=getComponents(),bad=eligible(c,hr);
      if(bad){skipped++;lastReason=bad;
        if(['actor_changed','scene_changed','halted'].includes(bad))stop(bad);
        return;
      }
      if(actor!==c.actor){actor=c.actor;clearTarget();}
      if(scene===null)scene=currentScene();
      if(!bind(c.combat.target)){lastReason='boss_bind_failed';return;}
      activePosOff();
      const p=position(c.actor),b=position(target);
      const dx=p.x-b.x,dy=p.y-b.y,d=Math.hypot(dx,dy);
      lastDistance=+d.toFixed(2);
      if(!Number.isFinite(d)||d<1){lastReason='zero_distance';return;}
      // Do not fight with game's ordinary approach from beyond the native range.
      if(stage===0 && d>283){lastReason='native_approach';stableSince=0;return;}
      const goal=desired(),delta=d-goal;
      if(Math.abs(delta)<=CFG.tolerance){
        lastReason='at_distance_'+Math.round(goal);
        if(stableSince===0){stableSince=now();stageAt=stableSince;}
        if(stage<2 && now()-stableSince>=CFG.nearStandGraceMs &&
           (lastHitAt<stableSince || now()-lastHitAt>CFG.stageWaitMs))
          advance(now(),'no_recent_own_basic_hit');
        return;
      }
      stableSince=0;
      if(now()-lastMoveAt<CFG.moveCooldownMs){lastReason='move_cooldown';return;}
      // Only move towards a finite, bounded client waypoint in normal FIGHT.
      const ux=dx/d,uy=dy/d;
      const waypoint={x:b.x+ux*goal,y:b.y+uy*goal};
      if(!Number.isFinite(waypoint.x)||!Number.isFinite(waypoint.y))return;
      // A single native moveTo; no combat RPC, no cooldown or target rewriting.
      c.mover.moveTo(waypoint.x,waypoint.y);
      lastMoveAt=now();moveCount++;lastReason=delta<0?'reposition_out':'reposition_in';
      record('MOVE',{phase:'FIGHT',stage,goal,from:+d.toFixed(1),type:lastReason});
      W.KVPV?.core?.scene?.renew?.('combat');
    }catch(e){lastError=String(e);lastReason='error';}
  }
  function status(show=true){
    const hr=W.KVPV_HITRUN1?.status?.(false);
    const s={version:'281-position-1.0',enabled:enabled&&!ended,actorId,
      boss:targetName||null,bossId:targetId||null,phase:hr?.phase??null,
      targetDistance:CFG.displayDistance,activeGoal:+desired().toFixed(1),
      fallbackStage:stage,measuredDistance:lastDistance,
      basicHits:ownBasicHits,confirmedNear281:near281BasicHits,
      moves:moveCount,fallbacks,skipped,lastReason,lastError,
      range281Hook:W.KVPV_RANGE281?.status?.(false)?.hookAttached===true,
      note:'281 is a client-position TRIAL; game/server may refuse attack beyond 280. Auto-backoff toward 235 then 185 requires observed BASIC 8001..8005 damage.'};
    if(show)console.table([s]);return s;
  }
  function stop(reason='Manual stop'){
    if(ended)return;
    ended=true;enabled=false;
    if(timer!==null){(W.KVPV_V1?.timers?.clearInterval ?? W.clearInterval)(timer);timer=null;}
    clearTarget();if(W[NAME]===api)delete W[NAME];
    console.log('[STAND281] STOP:',reason);
    return status(false);
  }
  const api={version:'281-position-1.0',status,stop,
    enable(v=true){enabled=!!v;return status(false);},
    reset(){stage=0;stageAt=0;stableSince=0;lastHitAt=0;return status(false);},
    history(){return events.slice();}};
  W[NAME]=api;
  timer=(W.KVPV_V1?.timers?.setInterval ?? W.setInterval)(tick,CFG.sampleMs);
  console.info('[STAND281] Đã nạp, đang OFF; dùng KVPV_MODE.start(\"BOSS\") để bật giữ tầm 281.');
  status(true);
})();
