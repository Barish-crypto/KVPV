/* Legacy So Tai material reservation removed by user request.
 * Keep a compatibility API so older callers do not crash after hot reload.
 * Existing lock timers are stopped and saved upgrade preferences restored.
 */
(() => {
  'use strict';
  const W=window,previous=W.KVPV_MATERIAL_RESERVE;
  const carry=previous?._handoff?.();
  previous?.stop?.();
  const groups={
    upgrades:W.KVPV_UPGRADES?.config,
    resources:W.KVPV_BG_RESOURCES?.config?.enabled,
    weaponWingArm:W.KVPV_V880?.config,
    pet:W.KVPV_V875?.config,
    mount:W.KVPV_V877?.config
  };
  const actor=String(W.__KVPV_OWN_ACTOR_ID||'');
  const sameActor=carry?.actor===actor;
  if(sameActor){
    for(const [name,flags] of Object.entries(carry.saved||{})){
      const target=groups[name];
      if(!target||typeof target!=='object')continue;
      for(const [key,value] of Object.entries(flags)){
        if(typeof value==='boolean'&&target[key]===false)target[key]=value;
      }
    }
  }
  const status=()=>({active:false,actor,reason:'so_tai_removed',timerActive:false});
  W.KVPV_MATERIAL_RESERVE=Object.freeze({
    active:false,apply:()=>false,start:status,stop:()=>{},status,
    _handoff:()=>({actor,saved:{}})
  });
})();
