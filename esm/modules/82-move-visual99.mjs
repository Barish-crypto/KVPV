import {getKVPV_MOVE_VISUAL99 as __getKVPV0,getKVPV_TRANH_BA_TU_PHUONG as __getKVPV1,getKVPV_V1 as __getKVPV2} from '../api.mjs';
export function call_KVPV_MOVE_VISUAL99_tick(...args){const target=globalThis["KVPV_MOVE_VISUAL99"];const fn=globalThis["KVPV_MOVE_VISUAL99"]?.["tick"];if(typeof fn!=='function')throw Error("KVPV_MOVE_VISUAL99.tick is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_MOVE_VISUAL99_stop(...args){const target=globalThis["KVPV_MOVE_VISUAL99"];const fn=globalThis["KVPV_MOVE_VISUAL99"]?.["stop"];if(typeof fn!=='function')throw Error("KVPV_MOVE_VISUAL99.stop is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_MOVE_VISUAL99_status(...args){const target=globalThis["KVPV_MOVE_VISUAL99"];const fn=globalThis["KVPV_MOVE_VISUAL99"]?.["status"];if(typeof fn!=='function')throw Error("KVPV_MOVE_VISUAL99.status is not available");return Reflect.apply(fn,target,args);}
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
export {__esmLocal0 as local_anonymous_2_1_0};
export {__esmLocal1 as local_owned_1};
export {__esmLocal2 as local_excluded_2};
export {__esmLocal3 as local_release_3};
export {__esmLocal4 as local_movement_4};
export {__esmLocal5 as local_tick_5};
export {__esmLocal6 as local_wrapper_6};
export {__esmLocal7 as local_stop_7};
export {__esmLocal8 as local_status_8};
export function initialize(){
/* Movement animation visuals only. Never modify world coordinates, walk speed, RPC or cooldown. */
(__captureESMFunction((__esmLocal0=(()=>{'use strict';
const W=window,old=__getKVPV0();old?.stop?.('reload');
const actor=String(W.__KVPV_OWN_ACTOR_ID??'');
const VISUAL_FACTOR=9999;
const S={enabled:true,timer:null,hook:null,applied:0,reason:'waiting_avatar',error:'',lastAction:null,observed:[],matched:0};
const owned=__captureESMFunction((__esmLocal1=(()=>!!actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED)),"owned");
const excluded=__captureESMFunction((__esmLocal2=(()=>{
 const e=__getKVPV1()?.status?.();
 // In the timed PK event, movement animation speed is allowed only after the
 // dedicated combo has confirmed the current map. Fail closed before that.
 if(e?.eventActive===true&&W._Ba?._$a?.SceneUtil?.isCommonScene===false&&e?.inside!==true)return true;
 return false;
})),"excluded");
function release(){const h=S.hook;if(!h)return;S.hook=null;
 try{if(h.avatar.getActionTween===h.wrapper){if(h.descriptor)Object.defineProperty(h.avatar,'getActionTween',h.descriptor);else delete h.avatar.getActionTween;}}
 catch(e){S.error=String(e?.message??e);}
}
__esmLocal3=release;

const movement=__captureESMFunction((__esmLocal4=(a=>typeof a==='string'&&/(?:run|walk|move|ride|mount|zou|pao|奔跑|跑步|行走|移动)/i.test(a)&&!/(?:attack|skill|hit|hurt|die|idle|cast)/i.test(a))),"movement");
function tick(){
 try{
  if(!S.enabled||!owned()){release();S.reason='actor_or_disabled';return;}
  if(excluded()){release();S.reason='excluded_tranh_ba_tu_phuong';return;}
  const role=W._C?._Ba?.instance?.getRole?.(Number(actor));
  const combat=role?.getComponent?.(W._d?._Yct?._Het);
  const avatar=role?.property?.get?.('avatar')??combat?._Qrt;
  if(!avatar||typeof avatar.getActionTween!=='function'){release();S.reason='waiting_avatar';return;}
  if(S.hook?.avatar===avatar&&avatar.getActionTween===S.hook.wrapper){S.reason='visual99_armed';return;}
  release();
  const original=avatar.getActionTween,descriptor=Object.getOwnPropertyDescriptor(avatar,'getActionTween');
  if(descriptor&&descriptor.configurable===false){S.reason='native_visual_nonconfigurable';return;}
  const wrapper=__captureESMFunction((__esmLocal6=(function(...args){
   if(S.enabled&&owned()&&!excluded()){
    const name=String(args[0]??'');if(name&&!S.observed.includes(name)){S.observed.push(name);if(S.observed.length>24)S.observed.shift();}
   }
   if(S.enabled&&owned()&&!excluded()&&movement(args[0])){
    const speed=Number(args[2]??1);
    if(Number.isFinite(speed)&&speed>0){args[2]=Math.min(9999,speed*VISUAL_FACTOR);S.applied++;S.matched++;S.lastAction=args[0];}
   }
   return original.apply(this,args);
  })),"wrapper");
  Object.defineProperty(avatar,'getActionTween',{configurable:true,writable:true,enumerable:descriptor?.enumerable??false,value:wrapper});
  S.hook={avatar,descriptor,wrapper};S.reason='visual99_armed';
 }catch(e){S.error=String(e?.message??e);S.reason='error';}
}
__esmLocal5=tick;

function stop(reason='stopped'){S.enabled=false;release();const clear=__getKVPV2()?.timers?.clearInterval??W.clearInterval;if(S.timer!=null&&typeof clear==='function')clear(S.timer);S.timer=null;S.reason=reason;}
__esmLocal7=stop;

function status(){return {enabled:S.enabled,actorMatch:!!owned(),excluded:excluded(),pollMs:1,visualFactor:VISUAL_FACTOR,hookActive:!!S.hook,applied:S.applied,observedActions:S.observed.slice(),matched:S.matched,lastAction:S.lastAction,reason:S.reason,error:S.error,visualOnly:true,nativeMovementPreserved:true};}
__esmLocal8=status;

W.KVPV_MOVE_VISUAL99=Object.freeze({tick,stop,status});
const schedule=__getKVPV2()?.timers?.setInterval??W.setInterval;
if(typeof W.setInterval==='function'&&typeof schedule==='function')S.timer=schedule(tick,1);
tick();
})),""))();

}
export {getKVPV_MOVE_VISUAL99} from '../api.mjs';
export const api=Object.freeze({
  get KVPV_MOVE_VISUAL99(){return globalThis.KVPV_MOVE_VISUAL99;},
});