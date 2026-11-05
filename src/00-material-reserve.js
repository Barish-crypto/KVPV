/* User policy: disable ALL automatic upgrading; So Tai feature is removed.
 * Manual upgrades and free claims remain available. Never restore old auto flags.
 */
(() => {
 'use strict';
 const W=window,prev=W.KVPV_MATERIAL_RESERVE;
 prev?.stop?.();
 const actor=String(W.__KVPV_OWN_ACTOR_ID||'');
 const S={active:true,timer:null,applications:0};
 const owned=()=>!!actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;
 function disable(obj,keys){
   if(!obj||typeof obj!=='object')return;
   for(const key of keys??Object.keys(obj))if(typeof obj[key]==='boolean')obj[key]=false;
 }
 function apply(){
   if(!owned())return false;
   // User requested all automatic upgrading to remain off.
   W.KVPV_FABAO_FAST?.stop?.();
   W.KVPV_SOUL_STONE_FAST?.stop?.('user_upgrade_disabled');
   disable(W.KVPV_UPGRADES?.config);
   disable(W.KVPV_BG_RESOURCES?.config?.enabled);
   disable(W.KVPV_V880?.config,['autoWeapon','autoWing','autoArm']);
   disable(W.KVPV_V875?.config,['autoFeed']);
   disable(W.KVPV_V877?.config,['autoFeed']);
   S.applications++;return true;
 }
 function stop(){if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;}
 function status(){return {active:true,actor,reason:'automatic_upgrades_disabled_by_user',timerActive:S.timer!==null,applications:S.applications};}
 function start(){if(S.timer===null){const schedule=W.KVPV_V1?.timers?.setInterval??W.setInterval;if(typeof schedule==='function')S.timer=schedule(apply,1000);}apply();return status();}
 W.KVPV_MATERIAL_RESERVE=Object.freeze({active:true,apply,start,stop,status,_handoff:()=>({actor,saved:{}})});
 if(owned())start();
})();
