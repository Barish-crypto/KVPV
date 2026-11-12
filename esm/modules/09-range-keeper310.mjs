import {getKVPV_BOSS_TEAM as __getKVPV0,getKVPV_ENTRY_POLICY as __getKVPV1,getKVPV_EVENT_PRIORITY as __getKVPV2,getKVPV_FAR_SCOPE as __getKVPV3,getKVPV_HITRUN1 as __getKVPV4,getKVPV_RANGE_KEEP310 as __getKVPV5,getKVPV_V1 as __getKVPV6} from '../api.mjs';
export function call_KVPV_RANGE_KEEP310_tick(...args){const target=globalThis["KVPV_RANGE_KEEP310"];const fn=globalThis["KVPV_RANGE_KEEP310"]?.["tick"];if(typeof fn!=='function')throw Error("KVPV_RANGE_KEEP310.tick is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_RANGE_KEEP310_start(...args){const target=globalThis["KVPV_RANGE_KEEP310"];const fn=globalThis["KVPV_RANGE_KEEP310"]?.["start"];if(typeof fn!=='function')throw Error("KVPV_RANGE_KEEP310.start is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_RANGE_KEEP310_stop(...args){const target=globalThis["KVPV_RANGE_KEEP310"];const fn=globalThis["KVPV_RANGE_KEEP310"]?.["stop"];if(typeof fn!=='function')throw Error("KVPV_RANGE_KEEP310.stop is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_RANGE_KEEP310_status(...args){const target=globalThis["KVPV_RANGE_KEEP310"];const fn=globalThis["KVPV_RANGE_KEEP310"]?.["status"];if(typeof fn!=='function')throw Error("KVPV_RANGE_KEEP310.status is not available");return Reflect.apply(fn,target,args);}
function __captureESMFunction(fn,name){
  if(fn.name!==name)Object.defineProperty(fn,"name",{value:name,configurable:true});
  return fn;
}
let __esmLocal0;
let __esmLocal1;
let __esmLocal2;
let __esmLocal3;
let __esmLocal4;
let __esmLocal5;
let __esmLocal6;
let __esmLocal7;
let __esmLocal8;
let __esmLocal9;
export {__esmLocal0 as local_anonymous_2_1_0};
export {__esmLocal1 as local_owned_1};
export {__esmLocal2 as local_pos_2};
export {__esmLocal3 as local_releaseHook_3};
export {__esmLocal4 as local_guardApproach_4};
export {__esmLocal5 as local_fn_5};
export {__esmLocal6 as local_tick_6};
export {__esmLocal7 as local_status_7};
export {__esmLocal8 as local_stop_8};
export {__esmLocal9 as local_start_9};
export function initialize(){
/* Keep the selected PvE target at the native 310 ring on regular maps and verified scopes. */
(__captureESMFunction((__esmLocal0=(()=>{
'use strict';
const W=window,actor=String(W.__KVPV_OWN_ACTOR_ID||''),prev=__getKVPV5();
prev?.stop?.();
const C={distance:310,tolerance:2,pollMs:250,minMoveMs:800};
const S={enabled:false,timer:null,lastMoveAt:0,moves:0,distance:null,scope:'OUTSIDE',reason:'off',error:'',lastScopeAt:0,phase:'FIGHT',hpPct:null,retreats:0,ownMovePending:false,arrivalStops:0,dispatchOwner:false};
const owned=__captureESMFunction((__esmLocal1=(()=>actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED)),"owned");
const pos=__captureESMFunction((__esmLocal2=(o=>{const p=o?.property?.get?.('position');return Number.isFinite(Number(p?.x))&&Number.isFinite(Number(p?.y))?{x:Number(p.x),y:Number(p.y)}:null;})),"pos");
function crystalMap(){const id=Number(W._C?._Mn?._Cn?.currentID??W._Ba?._$a?._yo?.ins?.intoSce?.[0]);return id===2992&&Number(W._ft?._po?.ins?.getCfgById?.(id)?.[7])===35&&Number(W._Ba?._$a?._yo?.ins?.intoSce?.[0])===id;}
function keeperScope(scope){
 if(crystalMap())return false;
 if(scope?.inside===true)return ['THIEN_QUAN','LINH_LUNG','PHU_VAN','EXPEDITION','ALL_BOSS'].includes(scope.kind);
 const live=Number(W._C?._Mn?._Cn?.currentID),entry=Number(W._Ba?._$a?._yo?.ins?.intoSce?.[0]);
 return scope?.kind==='OUTSIDE'&&W._Ba?._$a?.SceneUtil?.isCommonScene===true&&
  Number.isSafeInteger(live)&&live>0&&live===entry&&W._Ba?._$a?._yo?.ins?.isInMission!==true;
}
function targetEligible(scope,target){
 if(!target||target.isValid===false||Number(target.property?.get?.('type'))!==1)return false;
 const hp=target.property?.get?.('hp');
 if(Array.isArray(hp)&&Number(hp[0])<=0)return false;
 return scope?.inside===true?__getKVPV3()?.eligible?.(target)===true:keeperScope(scope);
}
function ownsDispatch(){if(!S.dispatchOwner)return false;const owner=W.KVPV?.core?.scene?.combat?.status?.()?.lanes?.player?.owner;return owner===undefined||owner==='09-range-keeper310';}
function withdrawDispatch(){try{W.KVPV?.core?.scene?.combat?.withdraw?.('09-range-keeper310');}catch(e){S.error=String(e?.message??e);}S.dispatchOwner=false;}
function stopOwnPath(){if(!ownPath)return;try{if(ownPath.mover.running?.()===true)ownPath.mover.stop?.();}catch(e){S.error=String(e?.message??e);}ownPath=null;S.ownMovePending=false;}
// Intercept only native auto-approach toward the selected PvE target at the 310 ring.
// Preserve manual input and recovery movement; never fake movement or skill reach.
let hook=null,blockedApproaches=0,ownPath=null;
function releaseHook(){if(!hook)return;const h=hook;hook=null;if(h.m.moveTo!==h.fn)return;
 try{if(h.own)Object.defineProperty(h.m,'moveTo',h.own);else delete h.m.moveTo;}catch(_){}
}
__esmLocal3=releaseHook;

function guardApproach(mover,role,target){
 if(hook?.m===mover)return;
 releaseHook();
 const own=Object.getOwnPropertyDescriptor(mover,'moveTo'),native=mover.moveTo;
 if(typeof native!=='function'||own?.configurable===false||(Object.isExtensible(mover)===false&&!own))return;
 const fn=__captureESMFunction((__esmLocal5=(function(x,y,...rest){
  const scope=__getKVPV3()?.status?.(),a=pos(role),b=pos(target);
  const boss=role?.getComponent?.(W._d?._Yct?._Het)?.target;
  const rec=__getKVPV4()?.status?.(false);
  const safe=S.enabled&&ownsDispatch()&&owned()&&keeperScope(scope)&&
   boss===target&&targetEligible(scope,target)&&
   __getKVPV1()?.manual!==true&&!__getKVPV2()?.hold?.()&&
   W._Ba?._rJ?._O$?.ins?.isDead!==true&&
   !(rec?.running===true&&rec.phase!=='FIGHT')&&
   a&&b&&Number.isFinite(Number(x))&&Number.isFinite(Number(y));
  if(safe){const d=Math.hypot(a.x-b.x,a.y-b.y),next=Math.hypot(Number(x)-b.x,Number(y)-b.y);
   if(Math.abs(d-C.distance)<=C.tolerance&&next<C.distance-C.tolerance){blockedApproaches++;S.reason='blocked_native_approach_for_close_skill';return;}
  }
  return native.apply(this,[x,y,...rest]);
 })),"fn");
 try{Object.defineProperty(mover,'moveTo',{configurable:true,writable:true,enumerable:own?.enumerable??false,value:fn});hook={m:mover,own,fn};}catch(_){}
}
__esmLocal4=guardApproach;

function tick(){
 if(!S.enabled||!owned()){releaseHook();stopOwnPath();withdrawDispatch();return;}
 try{
 const scope=__getKVPV3()?.status?.(),kind=scope?.kind;
 S.scope=kind||'OUTSIDE';S.lastScopeAt=Date.now();
 if(!keeperScope(scope)){releaseHook();stopOwnPath();withdrawDispatch();S.reason=crystalMap()?'crystal_no_standoff':'outside_scope';return;}
 if(W._Ba?._rJ?._O$?.ins?.isDead===true||__getKVPV1()?.manual===true||__getKVPV2()?.hold?.()||__getKVPV0()?.priority?.()===true||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)){S.reason='yield_priority';releaseHook();stopOwnPath();withdrawDispatch();return;}
 const recovery=__getKVPV4()?.status?.(false);
 if(recovery?.running===true&&recovery.phase!=='FIGHT'){S.reason='yield_recovery';releaseHook();stopOwnPath();withdrawDispatch();return;}
 const role=W._C?._Ba?.instance?.getRole?.(Number(actor)),types=W._d?._Yct;
 const mover=role?.getComponent?.(types?._zet),combat=role?.getComponent?.(types?._Het),target=combat?.target;
 if(!mover||typeof mover.moveTo!=='function'||!targetEligible(scope,target)){S.reason='waiting_native_target_or_mover';releaseHook();stopOwnPath();withdrawDispatch();return;}
 if(W.KVPV?.core?.scene?.combat?.claim?.('09-range-keeper310',50)!==true){S.reason='combat_dispatch_wait';releaseHook();stopOwnPath();withdrawDispatch();return;}
 S.dispatchOwner=true;
 guardApproach(mover,role,target);
 if(ownPath&&(ownPath.mover!==mover||ownPath.target!==target))stopOwnPath();
 const hp=role?.property?.get?.('hp');
 if(Array.isArray(hp)&&Number(hp[1])>0){
  S.hpPct=Number(hp[0])*100/Number(hp[1]);
  if(S.phase==='FIGHT'&&S.hpPct<=35){S.phase='RETREAT';S.retreats++;}
  if(S.phase==='RETREAT'&&S.hpPct>=100)S.phase='FIGHT';
 }
 const a=pos(role),b=pos(target);
 if(!a||!b){S.reason='waiting_positions';releaseHook();stopOwnPath();withdrawDispatch();return;}
 const d=Math.hypot(a.x-b.x,a.y-b.y);S.distance=Math.round(d*100)/100;
 if(S.phase==='FIGHT'&&Math.abs(d-C.distance)<=C.tolerance){
  // Old Hit & Run handoff: stop only the remaining path started by our keeper.
  if(ownPath&&ownPath.mover===mover&&ownPath.target===target){
   if(typeof mover.stop==='function'){mover.stop();S.arrivalStops++;}
   ownPath=null;S.ownMovePending=false;
  }
  S.reason='holding_far';return;
 }
 if(S.phase==='RETREAT'&&d>=400){S.reason='healing_at_safe_range';return;}
 if(Date.now()-S.lastMoveAt<C.minMoveMs||mover.running?.()===true){S.reason='moving_or_throttled';return;}
 if(d<1){S.reason='overlapping_positions';return;}
 const goal=S.phase==='RETREAT'?400:C.distance;
 const x=b.x+(a.x-b.x)/d*goal,y=b.y+(a.y-b.y)/d*goal;
 if(!Number.isFinite(x)||!Number.isFinite(y)){S.reason='invalid_waypoint';return;}
 mover.moveTo(x,y);ownPath={mover,target};S.ownMovePending=true;S.lastMoveAt=Date.now();S.moves++;S.reason=S.phase==='RETREAT'?'retreating_for_heal':'moving_to_310';
 }catch(e){S.error=String(e?.message??e);S.reason='error';releaseHook();stopOwnPath();withdrawDispatch();}
}
__esmLocal6=tick;

function status(){const scope=__getKVPV3()?.status?.();return {...S,actor,goal:C.distance,tolerance:C.tolerance,timer:S.timer!==null,liveScope:scope?.kind??'UNKNOWN',liveInside:scope?.inside===true,liveMap:scope?.current??null,scopeSampleAgeMs:S.lastScopeAt?Date.now()-S.lastScopeAt:null,blockedApproaches,moveGuard:!!hook};}
__esmLocal7=status;

function stop(){releaseHook();stopOwnPath();withdrawDispatch();S.enabled=false;if(S.timer!==null){(__getKVPV6()?.timers??W).clearInterval?.(S.timer);S.timer=null;}S.reason='stopped';return status();}
__esmLocal8=stop;

function start(){if(!owned()){S.reason='waiting_actor';return status();}S.enabled=true;if(S.timer===null&&typeof W.setInterval==='function'){S.timer=(__getKVPV6()?.timers??W).setInterval(tick,C.pollMs);}return status();}
__esmLocal9=start;

W.KVPV_RANGE_KEEP310=Object.freeze({tick,start,stop,status});
start();
})),""))();

}
export {getKVPV_RANGE_KEEP310} from '../api.mjs';
export const api=Object.freeze({
  get KVPV_RANGE_KEEP310(){return globalThis.KVPV_RANGE_KEEP310;},
});