/* Save upgrade materials for daily So Tai competition. Only automatic progression is paused.
 * Manual game controls, free reward claims and combat routines are not modified.
 */
(() => {
  'use strict';
  const W=window,prev=W.KVPV_MATERIAL_RESERVE,carry=prev?._handoff?.();
  prev?.stop?.();
  const actor=String(W.__KVPV_OWN_ACTOR_ID||''),same=carry?.actor===actor;
  const S={active:true,actor,timer:null,applications:0,saved:same?carry.saved:{}};
  const owned=()=>!!actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;
  function lock(name,obj,keys){
    if(!obj||typeof obj!=='object')return;
    const saved=S.saved[name]||(S.saved[name]={});
    for(const k of keys??Object.keys(obj)){
      if(typeof obj[k]!=='boolean')continue;
      if(!Object.prototype.hasOwnProperty.call(saved,k))saved[k]=obj[k];
      obj[k]=false;
    }
  }
  function apply(){
    if(!S.active||!owned())return false;
    lock('upgrades',W.KVPV_UPGRADES?.config);
    lock('resources',W.KVPV_BG_RESOURCES?.config?.enabled);
    lock('weaponWingArm',W.KVPV_V880?.config,['autoWeapon','autoWing','autoArm']);
    lock('pet',W.KVPV_V875?.config,['autoFeed']);
    lock('mount',W.KVPV_V877?.config,['autoFeed']);
    S.applications++;return true;
  }
  function stop(){if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;}
  function status(){return {active:S.active,actor,reason:'reserve_upgrade_materials_for_so_tai',
    timerActive:S.timer!==null,applications:S.applications,legacyFlagsHeld:Object.keys(S.saved)};}
  function start(){if(S.timer===null)S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(apply,1000);apply();return status();}
  W.KVPV_MATERIAL_RESERVE=Object.freeze({get active(){return S.active;},apply,start,stop,status,
    _handoff:()=>({actor,saved:S.saved})});
  if(owned())start();
})();
