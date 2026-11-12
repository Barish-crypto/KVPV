import {getKVPV_BOSS_LOG as __getKVPV0,getKVPV_CHECK as __getKVPV1,getKVPV_COMBAT_ENGINE as __getKVPV2,getKVPV_RED_DOT_MODULE as __getKVPV3,getKVPV_V1 as __getKVPV4} from '../api.mjs';
import {call_KVPV_COMBAT_ENGINE_status as __callKVPV0} from "./09-combat-engine.mjs";
export function call_KVPV_CHECK(...args){const target=globalThis;const fn=globalThis;if(typeof fn!=='function')throw Error("KVPV_CHECK is not available");return Reflect.apply(fn,target,args);}
function __captureESMFunction(fn,name){
  if(fn.name!==name)Object.defineProperty(fn,"name",{value:name,configurable:true});
  return fn;
}
let __esmLocal0;
let __esmLocal1;
let __esmLocal2;
let __esmLocal3;
let __esmLocal4;
let __esmLocal5;
let __esmLocal6;
let __esmLocal7;
let __esmLocal8;
export {__esmLocal0 as local_anonymous_8_1_0};
export {__esmLocal1 as local_KVPV_CHECK_1};
export {__esmLocal2 as local_check_2};
export {__esmLocal3 as local_anonymous_20_20_3};
export {__esmLocal4 as local_anonymous_22_27_4};
export {__esmLocal5 as local_anonymous_23_37_5};
export {__esmLocal6 as local_anonymous_24_31_6};
export {__esmLocal7 as local_anonymous_25_23_7};
export {__esmLocal8 as local_anonymous_29_34_8};
export function initialize(){





/* Read-only readiness check for this bundle. Does not start combat. */

(__captureESMFunction((__esmLocal0=(() => {

  'use strict';

  window.KVPV_CHECK=__captureESMFunction((__esmLocal1=(function KVPV_CHECK(){

    const W=window,checks=[];

    function check(name,fn){try{checks.push({name,ok:fn()===true});}

      catch(error){checks.push({name,ok:false,error:String(error?.message??error)});}}
__esmLocal2=check;


    check('session',__captureESMFunction((__esmLocal3=(()=>!!__getKVPV4()&&!W.__KVPV_UNIVERSAL_HALTED)),""));

    check('actor identity',__captureESMFunction((__esmLocal4=(()=>String(W.__KVPV_OWN_ACTOR_ID||'')!==''&&String(W.__KVPV_OWN_ACTOR_ID)===String(W._Ba?._rJ?._O$?.ins?.actorId??''))),""));
    check('Red-dot progression core',__captureESMFunction((__esmLocal5=(()=>typeof __getKVPV3()?.start==='function'&&typeof __getKVPV3()?.register==='function')),""));
    check('single Boss combat',__captureESMFunction((__esmLocal6=(()=>typeof __getKVPV2()?.status==='function'&&__callKVPV0()?.singleSender===true)),""));
    check('combat log',__captureESMFunction((__esmLocal7=(()=>typeof __getKVPV0()?.start==='function')),""));
    const rustCore=W.__KVPV_RUST_CORE;
    if(typeof rustCore?.preflightReady!=='function')throw Error('Rust/WASM preflight core unavailable');
    if(checks.length>32)throw Error('Rust/WASM preflight supports at most 32 checks');
    const checkMask=checks.reduce(__captureESMFunction((__esmLocal8=((mask,item,index)=>item.ok?mask|(1<<index):mask)),""),0);
    const requiredMask=checks.length===32?0xFFFF_FFFF:(1<<checks.length)-1;
    return {ready:rustCore.preflightReady(checkMask,requiredMask)===1,build:__getKVPV4()?.build??null,checks,diagnostics:__getKVPV4()?.diagnostics?.status?.()??null,

      note:'Readiness only; game movement, healing and server reach still require an observed fight.'};

  })),"KVPV_CHECK");

})),""))();


}
export {getKVPV_CHECK} from '../api.mjs';
export const api=Object.freeze({
  get KVPV_CHECK(){return globalThis.KVPV_CHECK;},
});