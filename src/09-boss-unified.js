/* Unified boss-combat entry point, staged migration.
 * One dispatcher, legacy compatibility is explicitly controlled, no second sender.
 * Default remains passive until validated, preserving active game instances. */
(() => {
 'use strict';
 const W=window,previous=W.KVPV_BOSS_UNIFIED;previous?.stop?.();
 const actor=String(W.__KVPV_OWN_ACTOR_ID??'');
 const S={enabled:false,mode:'OFF',reason:'awaiting_explicit_activation',timer:null,cycles:0,lastError:''};
 const valid=()=>!!actor&&String(W._Ba?._rJ?._O$?.ins?.actorId??'')===actor&&W.__KVPV_UNIVERSAL_HALTED!==true;
 const modes=Object.freeze({BOSS:'BOSS',BOSS_TH:'BOSS_TH',BOSS_TH300:'BOSS_TH300',BOSS_TH300_SCAN:'BOSS_TH300_SCAN'});
 function status(){return {...S,timer:S.timer!==null,actor,singleSender:true,observer:W.KVPV_SKILL_ASYNC_OBSERVER?.status?.()??null};}
 function stop(){
   S.enabled=false;S.mode='OFF';
   if(S.timer!==null){const owner=W.KVPV_V1?.timers?.clearInterval?W.KVPV_V1.timers:W;owner?.clearInterval?.(S.timer);S.timer=null;}
   S.reason='stopped';return status();
 }
 function tick(){
   if(!S.enabled||!valid())return;
   S.cycles++;
   // All native casts remain under exactly one existing combat coordinator.
   // Never call native combat() from an observer or secondary module.
   const mode=W.KVPV_MODE?.status?.(false);
   if(mode?.mode==='OFF')S.reason='waiting_native_mode';
   else S.reason='native_single_owner_'+String(mode?.mode??'unknown');
 }
 function start(mode='BOSS_TH300_SCAN'){
   if(!Object.hasOwn(modes,mode))throw Error('Unknown unified boss combat mode');
   if(!valid())throw Error('Actor not ready');
   if(typeof W.KVPV_MODE?.start!=='function')throw Error('Native combat coordinator missing');
   // A single transition, never activate multiple mode senders.
   W.KVPV_MODE.start(modes[mode]);
   S.mode=mode;S.enabled=true;S.reason='native_single_owner_'+mode;
   if(S.timer===null){const owner=W.KVPV_V1?.timers?.setInterval?W.KVPV_V1.timers:W;
     if(typeof owner?.setInterval==='function')S.timer=owner.setInterval(()=>tick(),250);
   }
   return status();
 }
 W.KVPV_BOSS_UNIFIED=Object.freeze({start,stop,tick,status,legacyModes:modes});
})();
