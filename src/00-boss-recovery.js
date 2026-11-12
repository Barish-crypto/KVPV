


 
(() => {
  'use strict';
  const W=window,policy=Object.freeze({leavePct:35,returnPct:100,margin:80,minRing:360,fallbackRange:350});
  const rustCore=W.__KVPV_RUST_CORE;
  if(typeof rustCore?.bossRecoveryRange!=='function'||typeof rustCore?.bossRecoveryRangeKnown!=='function'||
     typeof rustCore?.bossRecoveryRing!=='function'||typeof rustCore?.bossRecoveryFullHP!=='function')
    throw Error('Rust/WASM boss recovery policy unavailable');
  
  function geometry(nativeRange) {
    const value=Number(nativeRange);
    const range=rustCore.bossRecoveryRange(value,policy.fallbackRange);
    return {range,known:rustCore.bossRecoveryRangeKnown(value)===1,
      ring:rustCore.bossRecoveryRing(value,policy.fallbackRange,policy.margin,policy.minRing)};
  }
  
  function fullHP(hp) {
    if(!hp)return false;
    const current=Number.isFinite(hp.current)?hp.current:Number.NaN;
    const maximum=Number.isFinite(hp.max)?hp.max:Number.NaN;
    return rustCore.bossRecoveryFullHP(current,maximum)===1;
  }
  W.KVPV_BOSS_RECOVERY=Object.freeze({version:'1.0.0',policy,geometry,fullHP});
})();
