/* Daily free treasure is handled by src/01-red-dot-module.js. */
(() => {
  'use strict';
  const W=window,old=W.KVPV_FREE_TREASURE;
  old?.stop?.();
  const status=()=>({enabled:false,reason:'migrated_to_red_dot_module',pending:null,freeOnly:true,allowKNB:false});
  W.KVPV_FREE_TREASURE=Object.freeze({sync(){},busy(){return false;},stop(){},status,_handoff:()=>({actor:String(W.__KVPV_OWN_ACTOR_ID||''),pending:null,sent:[],confirmed:0})});
})();
