import {getKVPV_SPENDING_POLICY as __getKVPV0} from '../api.mjs';
export function call_KVPV_SPENDING_POLICY_canDailyInspireKNB(...args){const target=globalThis["KVPV_SPENDING_POLICY"];const fn=globalThis["KVPV_SPENDING_POLICY"]?.["canDailyInspireKNB"];if(typeof fn!=='function')throw Error("KVPV_SPENDING_POLICY.canDailyInspireKNB is not available");return Reflect.apply(fn,target,args);}
function __captureESMFunction(fn,name){
  if(fn.name!==name)Object.defineProperty(fn,"name",{value:name,configurable:true});
  return fn;
}
let __esmLocal0;
let __esmLocal1;
export {__esmLocal0 as local_anonymous_5_1_0};
export {__esmLocal1 as local_canDailyInspireKNB_1};
export function initialize(){

/* General KNB spending stays disabled. The user authorized only native
 * daily-trial inspiration in maps 2051 and 2061. Paid sweeps remain disabled. */

(__captureESMFunction((__esmLocal0=(() => {

  const inspireMaps=Object.freeze([2051,2061]);

  window.KVPV_SPENDING_POLICY=Object.freeze({allowKNB:false,

    dailyInspireKNBMaps:inspireMaps,

    canDailyInspireKNB:__captureESMFunction((__esmLocal1=(map=>inspireMaps.includes(Number(map)))),"canDailyInspireKNB"),

    reason:'No general KNB spending. User permits native inspiration only in daily trial maps 2051 and 2061.'});

})),""))();


}
export {getKVPV_SPENDING_POLICY} from '../api.mjs';
export const api=Object.freeze({
  get KVPV_SPENDING_POLICY(){return globalThis.KVPV_SPENDING_POLICY;},
});