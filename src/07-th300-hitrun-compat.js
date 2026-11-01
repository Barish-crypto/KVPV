/* Minimal compatibility for old TH300 SCAN coordinator.
 * Only one native TH300 sender; no client cooldown or server changes.
 * TH300 retains its own native movement and 310 positioning.
 */
(()=>{
'use strict';
const W=window;
if(W.KVPV_HITRUN1&&W.KVPV_HITRUN_AUTO)return;
const actor=String(W.__KVPV_OWN_ACTOR_ID??'');
const S={enabled:false,running:false,phase:'FIGHT',reason:'off'};
const own=()=>actor&&String(W._Ba?._rJ?._O$?.ins?.actorId??'')===actor&&!W.__KVPV_UNIVERSAL_HALTED;
function hp(){
 const role=W._C?._Ba?.instance?.getRole?.(Number(actor));
 const v=role?.property?.get?.('hp');
 return Array.isArray(v)&&Number(v[1])>0?100*Number(v[0])/Number(v[1]):null;
}
function status(){
 const pct=hp();
 if(S.running&&pct!==null){if(pct<=35)S.phase='RETREAT';else if(pct>=100)S.phase='FIGHT';}
 return {...S,phase:S.phase,hpPct:pct,compatibility:true,combatRunning:S.running&&S.phase==='FIGHT'};
}
function start(){
 if(!own())return {...status(),reason:'waiting_actor'};
 S.enabled=true;S.running=true;S.reason='th300_scan_compat';return status();
}
function stop(reason='stop'){S.enabled=false;S.running=false;S.reason=String(reason);return status();}
function rearm(){start();return autoStatus();}
function autoStatus(){return {enabled:S.enabled,timerActive:S.running,compatibility:true};}
if(!W.KVPV_HITRUN1)W.KVPV_HITRUN1=Object.freeze({start,stop,status});
if(!W.KVPV_HITRUN_AUTO)W.KVPV_HITRUN_AUTO=Object.freeze({rearm,status:autoStatus,stop,repairPolling:rearm});
})();
