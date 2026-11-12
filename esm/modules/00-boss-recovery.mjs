import {getKVPV_BOSS_RECOVERY as __getKVPV0} from '../api.mjs';
export function call_KVPV_BOSS_RECOVERY_geometry(...args){const target=globalThis["KVPV_BOSS_RECOVERY"];const fn=globalThis["KVPV_BOSS_RECOVERY"]?.["geometry"];if(typeof fn!=='function')throw Error("KVPV_BOSS_RECOVERY.geometry is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_BOSS_RECOVERY_fullHP(...args){const target=globalThis["KVPV_BOSS_RECOVERY"];const fn=globalThis["KVPV_BOSS_RECOVERY"]?.["fullHP"];if(typeof fn!=='function')throw Error("KVPV_BOSS_RECOVERY.fullHP is not available");return Reflect.apply(fn,target,args);}
function __captureESMFunction(fn,name){
  if(fn.name!==name)Object.defineProperty(fn,"name",{value:name,configurable:true});
  return fn;
}
let __esmLocal0;
let __esmLocal1;
let __esmLocal2;
export {__esmLocal0 as local_anonymous_5_1_0};
export {__esmLocal1 as local_geometry_1};
export {__esmLocal2 as local_fullHP_2};
export function initialize(){



 
(__captureESMFunction((__esmLocal0=(() => {
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
__esmLocal1=geometry;

  
  function fullHP(hp) {
    if(!hp)return false;
    const current=Number.isFinite(hp.current)?hp.current:Number.NaN;
    const maximum=Number.isFinite(hp.max)?hp.max:Number.NaN;
    return rustCore.bossRecoveryFullHP(current,maximum)===1;
  }
__esmLocal2=fullHP;

  W.KVPV_BOSS_RECOVERY=Object.freeze({version:'1.0.0',policy,geometry,fullHP});
})),""))();

}
export {getKVPV_BOSS_RECOVERY} from '../api.mjs';
export const api=Object.freeze({
  get KVPV_BOSS_RECOVERY(){return globalThis.KVPV_BOSS_RECOVERY;},
});