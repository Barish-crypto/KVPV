




/* Read-only readiness check for this bundle. Does not start combat. */

(() => {

  'use strict';

  window.KVPV_CHECK=function KVPV_CHECK(){

    const W=window,checks=[];

    function check(name,fn){try{checks.push({name,ok:fn()===true});}

      catch(error){checks.push({name,ok:false,error:String(error?.message??error)});}}

    check('session',()=>!!W.KVPV_V1&&!W.__KVPV_UNIVERSAL_HALTED);

    check('actor identity',()=>String(W.__KVPV_OWN_ACTOR_ID||'')!==''&&String(W.__KVPV_OWN_ACTOR_ID)===String(W._Ba?._rJ?._O$?.ins?.actorId??''));
    check('Red-dot progression core',()=>typeof W.KVPV_RED_DOT_MODULE?.start==='function'&&typeof W.KVPV_RED_DOT_MODULE?.register==='function');
    check('single Boss combat',()=>typeof W.KVPV_COMBAT_ENGINE?.status==='function'&&W.KVPV_COMBAT_ENGINE.status()?.singleSender===true);
    check('combat log',()=>typeof W.KVPV_BOSS_LOG?.start==='function');
    const rustCore=W.__KVPV_RUST_CORE;
    if(typeof rustCore?.preflightReady!=='function')throw Error('Rust/WASM preflight core unavailable');
    if(checks.length>32)throw Error('Rust/WASM preflight supports at most 32 checks');
    const checkMask=checks.reduce((mask,item,index)=>item.ok?mask|(1<<index):mask,0);
    const requiredMask=checks.length===32?0xFFFF_FFFF:(1<<checks.length)-1;
    return {ready:rustCore.preflightReady(checkMask,requiredMask)===1,build:W.KVPV_V1?.build??null,checks,diagnostics:W.KVPV_V1?.diagnostics?.status?.()??null,

      note:'Readiness only; game movement, healing and server reach still require an observed fight.'};

  };

})();

