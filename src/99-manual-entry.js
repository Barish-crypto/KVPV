/* The sole progression entry point: start the red-dot dispatcher after handlers load. */
(() => {
  'use strict';
  const W=window;
  let result={started:false,reason:'not_started'};
  function main(){
    const actor=String(W._Ba?._rJ?._O$?.ins?.actorId??'');
    if(!actor||actor!==String(W.__KVPV_OWN_ACTOR_ID??'')||W.__KVPV_UNIVERSAL_HALTED)
      return result={started:false,reason:'invalid_actor_or_halted'};
    if(typeof W.KVPV_RED_DOT_MODULE?.start!=='function')
      return result={started:false,reason:'red_dot_module_unavailable'};
    W.KVPV_RED_DOT_MODULE.start();
    return result={started:true,reason:'red_dot_main_started'};
  }
  main();
  W.KVPV_MANUAL_ENTRY=Object.freeze({main,status:()=>({...result,mode:'red-dot-only',at:Date.now()})});
})();
