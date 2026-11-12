import {getKVPV_ACCOUNT_POLICY as __getKVPV0} from '../api.mjs';
export function call_KVPV_ACCOUNT_POLICY_pollingGap(...args){const target=globalThis["KVPV_ACCOUNT_POLICY"];const fn=globalThis["KVPV_ACCOUNT_POLICY"]?.["pollingGap"];if(typeof fn!=='function')throw Error("KVPV_ACCOUNT_POLICY.pollingGap is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_ACCOUNT_POLICY_status(...args){const target=globalThis["KVPV_ACCOUNT_POLICY"];const fn=globalThis["KVPV_ACCOUNT_POLICY"]?.["status"];if(typeof fn!=='function')throw Error("KVPV_ACCOUNT_POLICY.status is not available");return Reflect.apply(fn,target,args);}
function __captureESMFunction(fn,name){
  if(fn.name!==name)Object.defineProperty(fn,"name",{value:name,configurable:true});
  return fn;
}
function __captureESMMethod(receiver,key,kind){
  let owner=receiver;
  while(owner!==null&&(typeof owner==="object"||typeof owner==="function")&&!Object.prototype.hasOwnProperty.call(owner,key))owner=Object.getPrototypeOf(owner);
  if(owner===null)return undefined;
  const descriptor=Object.getOwnPropertyDescriptor(owner,key);
  return kind==="get"?descriptor.get:kind==="set"?descriptor.set:descriptor.value;
}
let __esmLocal0;
let __esmLocal1;
let __esmLocal2;
let __esmLocal3;
let __esmLocal4;
export {__esmLocal0 as local_anonymous_6_1_0};
export {__esmLocal1 as local_focused_1};
export {__esmLocal2 as local_pollingGap_2};
export {__esmLocal3 as local_status_3};
export {__esmLocal4 as local_anonymous_39_87_4};
export function initialize(){





(__captureESMFunction((__esmLocal0=(() => {

  const W=window,config={pauseWhenHidden:false,backgroundTickMs:1,unfocusedTickMs:1};

  const focused=__captureESMFunction((__esmLocal1=(()=>typeof W.document?.hasFocus==='function'?W.document.hasFocus():null)),"focused");

  const pollingGap=__captureESMFunction((__esmLocal2=(()=>{
    const rustCore=W.__KVPV_RUST_CORE;
    if(typeof rustCore?.accountPollingMode!=='function')throw Error('Rust/WASM account policy unavailable');
    const focus=focused(),focusState=focus===false?0:focus===true?1:-1;
    const mode=rustCore.accountPollingMode(W.document?.hidden?1:0,focusState);
    if(mode===1)return config.backgroundTickMs;
    if(mode===2)return config.unfocusedTickMs;
    if(mode===0)return 0;
    throw Error('Rust/WASM returned an invalid account polling mode: '+mode);
  })),"pollingGap");

  W.KVPV_ACCOUNT_POLICY=Object.freeze({config,pollingGap,status(){
__esmLocal3=__captureESMMethod(this,"status","init");


    const actor=String(W._Ba?._rJ?._O$?.ins?.actorId??''),owner=String(W.__KVPV_OWN_ACTOR_ID??'');

    const me=W._C?._Ba?.instance?.getRole?.(Number(actor))??W._C?._Ba?.instance?.getRole?.(actor);

    const types=W._d?._Yct,selector=me?.getComponent?.(types?._Eet);

    return {actorId:actor,ownerId:owner,actorMatches:!!actor&&actor===owner,playerLoaded:!!me,

      hidden:W.document?.hidden??null,pauseWhenHidden:config.pauseWhenHidden,backgroundTickMs:config.backgroundTickMs,

      focused:focused(),pollingGapMs:pollingGap(),

      components:{selector:!!selector,combat:!!me?.getComponent?.(types?._Het),mover:!!me?.getComponent?.(types?._zet)},

      nativeSkillIds:[...new Set([...(selector?._rtt??[]),...(selector?._wet??[])].map(__captureESMFunction((__esmLocal4=(row=>Number(row?.[0]))),"")).filter(Number.isSafeInteger))],

      note:'Per-frame session; no fixed main/clone identity. Background browser/game throttling is not bypassed.'};

  }});

})),""))();


}
export {getKVPV_ACCOUNT_POLICY} from '../api.mjs';
export const api=Object.freeze({
  get KVPV_ACCOUNT_POLICY(){return globalThis.KVPV_ACCOUNT_POLICY;},
});