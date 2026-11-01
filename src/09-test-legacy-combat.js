/* Opt-in legacy-style native mixed combat test. Never runs alongside current engine. */
(()=>{
'use strict';
const W=window,old=W.KVPV_LEGACY_COMBAT_TEST;old?.stop?.();
const actor=String(W.__KVPV_OWN_ACTOR_ID??'');
const S={enabled:false,timer:null,casts:0,lastSkill:null,reason:'off',error:'',ticks:0};
const eligible=()=>actor!==''&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;
function status(){return {...S,timer:S.timer!==null,mode:'LEGACY_MIXED_TEST',actor};}
function tick(){
 if(!S.enabled||!eligible())return;
 S.ticks++;
 try{
  const scope=W.KVPV_FAR_SCOPE?.status?.();
  if(scope?.inside!==true||!['THIEN_QUAN','LINH_LUNG','PHU_VAN'].includes(scope.kind)){S.reason='outside_scope';return;}
  if(W.KVPV_ENTRY_POLICY?.manual===true||W.KVPV_EVENT_PRIORITY?.hold?.()||
   W.KVPV_BOSS_TEAM?.priority?.()===true||W._Ba?._rJ?._O$?.ins?.isDead===true){S.reason='yield_priority';return;}
  const retreat=W.KVPV_RANGE_KEEP310?.status?.();
  if(retreat?.phase==='RETREAT'||(W.KVPV_HITRUN1?.status?.(false)?.phase==='RETREAT')){S.reason='retreat';return;}
  const role=W._C?._Ba?.instance?.getRole?.(Number(actor)),types=W._d?._Yct;
  const skill=role?.getComponent?.(types?._Eet),combat=role?.getComponent?.(types?._Het),target=combat?.target;
  if(!skill||typeof combat?.combat!=='function'||W.KVPV_FAR_SCOPE?.eligible?.(target)!==true){S.reason='waiting_boss';return;}
  const p=role?.property?.get?.('position'),q=target?.property?.get?.('position');
  const d=p&&q?Math.hypot(Number(p.x)-Number(q.x),Number(p.y)-Number(q.y)):NaN;
  if(!Number.isFinite(d)||Math.abs(d-310)>2){S.reason='waiting_310';return;}
  const nativeId=Number(skill.selectSkill?.());
  const known=new Set([...(skill._rtt??[]),...(skill._wet??[])].filter(Array.isArray).map(row=>Number(row[0])));
  if(!known.has(nativeId)||!([...Array(8)].some((_,i)=>nativeId===1001+i)||[8001,8002,8003,8004,8005].includes(nativeId))){S.reason='unknown_skill';return;}
  if(combat.isValidRange?.()!==true||combat.isCooldown?.()!==false){S.reason='native_range_or_cooldown';return;}
  // Old mixed-skill selection, but keep today's verified ring, target and recovery guards.
  combat.combat(nativeId);S.casts++;S.lastSkill=nativeId;S.reason='native_cast_requested';
 }catch(e){S.error=String(e?.message??e);S.reason='error';}
}
function stop(){S.enabled=false;if(S.timer!==null){(W.KVPV_V1?.timers??W).clearInterval?.(S.timer);S.timer=null;}W.KVPV_COMBAT_ENGINE?.start?.();S.reason='stopped';return status();}
function start(){if(!eligible()){S.reason='waiting_actor';return status();}
 W.KVPV_COMBAT_ENGINE?.stop?.();
 S.enabled=true;
 if(S.timer===null){const t=W.KVPV_V1?.timers?.setInterval?W.KVPV_V1.timers:W;if(typeof t?.setInterval==='function')S.timer=t.setInterval(tick,100);}
 S.reason='started';return status();}
W.KVPV_LEGACY_COMBAT_TEST=Object.freeze({start,stop,tick,status});
})();