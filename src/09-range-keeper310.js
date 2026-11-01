/* Conservative range keeper: native movement, one owner, 310 target. */
(()=>{
'use strict';
const W=window,actor=String(W.__KVPV_OWN_ACTOR_ID||''),prev=W.KVPV_RANGE_KEEP310;
prev?.stop?.();
const C={distance:310,tolerance:12,pollMs:400,minMoveMs:1300};
const S={enabled:false,timer:null,lastMoveAt:0,moves:0,distance:null,scope:'OUTSIDE',reason:'off',error:'',lastScopeAt:0};
const owned=()=>actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;
const pos=o=>{const p=o?.property?.get?.('position');return Number.isFinite(Number(p?.x))&&Number.isFinite(Number(p?.y))?{x:Number(p.x),y:Number(p.y)}:null;};
// Intercept only native auto-approach toward a verified dungeon Boss while already at the 310 ring.
// Preserve manual input and recovery movement; never fake movement or skill reach.
let hook=null,blockedApproaches=0;
function releaseHook(){if(!hook)return;const h=hook;hook=null;if(h.m.moveTo!==h.fn)return;
 try{if(h.own)Object.defineProperty(h.m,'moveTo',h.own);else delete h.m.moveTo;}catch(_){}
}
function guardApproach(mover,role,target){
 if(hook?.m===mover)return;
 releaseHook();
 const own=Object.getOwnPropertyDescriptor(mover,'moveTo'),native=mover.moveTo;
 if(typeof native!=='function'||own?.configurable===false||(Object.isExtensible(mover)===false&&!own))return;
 const fn=function(x,y,...rest){
  const scope=W.KVPV_FAR_SCOPE?.status?.(),a=pos(role),b=pos(target);
  const boss=role?.getComponent?.(W._d?._Yct?._Het)?.target;
  const rec=W.KVPV_HITRUN1?.status?.(false);
  const safe=S.enabled&&owned()&&scope?.inside===true&&
   ['THIEN_QUAN','LINH_LUNG','PHU_VAN'].includes(scope.kind)&&
   boss===target&&W.KVPV_FAR_SCOPE?.eligible?.(target)===true&&
   W.KVPV_ENTRY_POLICY?.manual!==true&&!W.KVPV_EVENT_PRIORITY?.hold?.()&&
   W._Ba?._rJ?._O$?.ins?.isDead!==true&&
   !(rec?.running===true&&rec.phase!=='FIGHT')&&
   a&&b&&Number.isFinite(Number(x))&&Number.isFinite(Number(y));
  if(safe){const d=Math.hypot(a.x-b.x,a.y-b.y),next=Math.hypot(Number(x)-b.x,Number(y)-b.y);
   if(Math.abs(d-C.distance)<=C.tolerance&&next<C.distance-C.tolerance){blockedApproaches++;S.reason='blocked_native_approach_for_close_skill';return;}
  }
  return native.apply(this,[x,y,...rest]);
 };
 try{Object.defineProperty(mover,'moveTo',{configurable:true,writable:true,enumerable:own?.enumerable??false,value:fn});hook={m:mover,own,fn};}catch(_){}
}
function tick(){
 if(!S.enabled||!owned())return;
 try{
 const scope=W.KVPV_FAR_SCOPE?.status?.(),kind=scope?.kind;
 S.scope=kind||'OUTSIDE';S.lastScopeAt=Date.now();
 if(!scope?.inside||!['THIEN_QUAN','LINH_LUNG','PHU_VAN'].includes(kind)){releaseHook();S.reason='outside_scope';return;}
 if(W._Ba?._rJ?._O$?.ins?.isDead===true||W.KVPV_ENTRY_POLICY?.manual===true||W.KVPV_EVENT_PRIORITY?.hold?.()||W.KVPV_BOSS_TEAM?.priority?.()===true){S.reason='yield_priority';return;}
 const recovery=W.KVPV_HITRUN1?.status?.(false);
 if(recovery?.running===true&&recovery.phase!=='FIGHT'){S.reason='yield_recovery';return;}
 const role=W._C?._Ba?.instance?.getRole?.(Number(actor)),types=W._d?._Yct;
 const mover=role?.getComponent?.(types?._zet),combat=role?.getComponent?.(types?._Het),target=combat?.target;
 if(!mover||typeof mover.moveTo!=='function'||!target||Number(target.property?.get?.('type'))!==1||target.isValid===false){S.reason='waiting_native_target_or_mover';return;}
 if(W.KVPV_FAR_SCOPE?.eligible?.(target)!==true){S.reason='target_not_eligible';return;}
 guardApproach(mover,role,target);
 const a=pos(role),b=pos(target);
 if(!a||!b){S.reason='waiting_positions';return;}
 const d=Math.hypot(a.x-b.x,a.y-b.y);S.distance=Math.round(d*100)/100;
 if(Math.abs(d-C.distance)<=C.tolerance){S.reason='in_position';return;}
 if(Date.now()-S.lastMoveAt<C.minMoveMs||mover.running?.()===true){S.reason='moving_or_throttled';return;}
 if(d<1){S.reason='overlapping_positions';return;}
 const x=b.x+(a.x-b.x)/d*C.distance,y=b.y+(a.y-b.y)/d*C.distance;
 if(!Number.isFinite(x)||!Number.isFinite(y)){S.reason='invalid_waypoint';return;}
 mover.moveTo(x,y);S.lastMoveAt=Date.now();S.moves++;S.reason='moving_to_310';
 }catch(e){S.error=String(e?.message??e);S.reason='error';}
}
function status(){const scope=W.KVPV_FAR_SCOPE?.status?.();return {...S,actor,goal:C.distance,tolerance:C.tolerance,timer:S.timer!==null,liveScope:scope?.kind??'UNKNOWN',liveInside:scope?.inside===true,liveMap:scope?.current??null,scopeSampleAgeMs:S.lastScopeAt?Date.now()-S.lastScopeAt:null,blockedApproaches,moveGuard:!!hook};}
function stop(){releaseHook();S.enabled=false;if(S.timer!==null){(W.KVPV_V1?.timers??W).clearInterval?.(S.timer);S.timer=null;}S.reason='stopped';return status();}
function start(){if(!owned()){S.reason='waiting_actor';return status();}S.enabled=true;if(S.timer===null&&typeof W.setInterval==='function'){S.timer=(W.KVPV_V1?.timers??W).setInterval(tick,C.pollMs);}return status();}
W.KVPV_RANGE_KEEP310=Object.freeze({tick,start,stop,status});
start();
})();
