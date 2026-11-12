import {getKVPV_FAR_SCOPE as __getKVPV0,getKVPV_MODE as __getKVPV1,getKVPV_TH300 as __getKVPV2,getKVPV_TQ_BASIC_FORCE as __getKVPV4} from '../api.mjs';
export function call_KVPV_TQ_BASIC_FORCE_setEnabled(...args){const target=globalThis["KVPV_TQ_BASIC_FORCE"];const fn=globalThis["KVPV_TQ_BASIC_FORCE"]?.["setEnabled"];if(typeof fn!=='function')throw Error("KVPV_TQ_BASIC_FORCE.setEnabled is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_TQ_BASIC_FORCE_status(...args){const target=globalThis["KVPV_TQ_BASIC_FORCE"];const fn=globalThis["KVPV_TQ_BASIC_FORCE"]?.["status"];if(typeof fn!=='function')throw Error("KVPV_TQ_BASIC_FORCE.status is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_TQ_BASIC_FORCE_sync(...args){const target=globalThis["KVPV_TQ_BASIC_FORCE"];const fn=globalThis["KVPV_TQ_BASIC_FORCE"]?.["sync"];if(typeof fn!=='function')throw Error("KVPV_TQ_BASIC_FORCE.sync is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_TQ_BASIC_FORCE_suspend(...args){const target=globalThis["KVPV_TQ_BASIC_FORCE"];const fn=globalThis["KVPV_TQ_BASIC_FORCE"]?.["suspend"];if(typeof fn!=='function')throw Error("KVPV_TQ_BASIC_FORCE.suspend is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_TQ_BASIC_FORCE_stop(...args){const target=globalThis["KVPV_TQ_BASIC_FORCE"];const fn=globalThis["KVPV_TQ_BASIC_FORCE"]?.["stop"];if(typeof fn!=='function')throw Error("KVPV_TQ_BASIC_FORCE.stop is not available");return Reflect.apply(fn,target,args);}
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
let __esmLocal5;
let __esmLocal6;
let __esmLocal7;
let __esmLocal8;
let __esmLocal9;
let __esmLocal10;
let __esmLocal11;
let __esmLocal12;
let __esmLocal13;
let __esmLocal14;
let __esmLocal15;
let __esmLocal16;
let __esmLocal17;
let __esmLocal18;
let __esmLocal19;
let __esmLocal20;
let __esmLocal21;
let __esmLocal22;
export {__esmLocal0 as local_anonymous_4_1_0};
export {__esmLocal1 as local_scene_1};
export {__esmLocal2 as local_combat_2};
export {__esmLocal3 as local_liveFor_3};
export {__esmLocal4 as local_restoreTween_4};
export {__esmLocal5 as local_restoreCooldown_5};
export {__esmLocal6 as local_release_6};
export {__esmLocal7 as local_parentDescriptor_7};
export {__esmLocal8 as local_ensureTween_8};
export {__esmLocal9 as local_readNative_9};
export {__esmLocal10 as local_writeNative_10};
export {__esmLocal11 as local_get_11};
export {__esmLocal12 as local_set_12};
export {__esmLocal13 as local_get_value_13};
export {__esmLocal14 as local_get_wrote_14};
export {__esmLocal15 as local_available_15};
export {__esmLocal16 as local_configureBasicOnly_16};
export {__esmLocal17 as local_sync_17};
export {__esmLocal18 as local_wrapped_18};
export {__esmLocal19 as local_setEnabled_19};
export {__esmLocal20 as local_status_20};
export {__esmLocal21 as local_suspend_21};
export {__esmLocal22 as local_stop_22};
export function initialize(){
/* Explicit opt-in, persistent client-only basic force for Tian Quan.
 * No timer and no server protocol edits. One owned hook per component/tween;
 * native fallback outside the owned BASIC ONLY context and manual OFF. */
(__captureESMFunction((__esmLocal0=(() => {
  'use strict';
  const W=window;
  __getKVPV4()?.stop?.('module_reload');
  const actorId=String(W.__KVPV_OWN_ACTOR_ID??W._Ba?._rJ?._O$?.ins?.actorId??'');
  const S={enabled:false,live:false,hook:null,tween:null,target:null,scene:'',
    cooldownFalse:0,animationFalse:0,animationPatched:0,restores:0,
    error:'',reason:'off'};
  const scene=__captureESMFunction((__esmLocal1=(()=>String(W._Ba?._$a?._yo?.ins?.intoSce?.[0]??''))),"scene");
  const combat=__captureESMFunction((__esmLocal2=(()=>{
    const world=W._C?._Ba?.instance;
    const a=world?.getRole?.(Number(actorId))??world?.getRole?.(actorId);
    return a?.getComponent?.(W._d?._Yct?._Het);
  })),"combat");
  // PURE primitive checks in wrappers: never call KVPV_TH300.status(),
  // scope.status(), nativeReady() or the module's own sync() from a wrapper.
  function liveFor(c){
    return S.enabled&&S.live&&W.document?.hidden!==true&&
      !W.__KVPV_UNIVERSAL_HALTED&&
      String(W._Ba?._rJ?._O$?.ins?.actorId??'')===actorId&&
      S.hook?.obj===c&&c?.target===S.target&&scene()===S.scene;
  }
__esmLocal3=liveFor;

  function restoreTween(){
    const t=S.tween;S.tween=null;if(!t)return;
    try{
      const now=Object.getOwnPropertyDescriptor(t.obj,'isPlaying');
      if(now?.get!==t.get||now?.set!==t.set){
        S.error='Foreign animation hook retained (not overwritten)';return;
      }
      if(t.own){
        const restore={...t.own};
        if(Object.prototype.hasOwnProperty.call(restore,'value'))restore.value=t.value;
        Object.defineProperty(t.obj,'isPlaying',restore);
      }else{
        delete t.obj.isPlaying;
        // Native assignment to an inherited data property normally creates an
        // own data property. Keep that last native value if one was assigned.
        if(t.wrote&&(!t.parent||Object.prototype.hasOwnProperty.call(t.parent,'value')))
          Object.defineProperty(t.obj,'isPlaying',{configurable:true,writable:true,
            enumerable:true,value:t.value});
      }
      S.restores++;
    }catch(e){S.error=String(e?.message||e);}
  }
__esmLocal4=restoreTween;

  function restoreCooldown(){
    const h=S.hook;S.hook=null;if(!h)return;
    try{
      if(h.obj.isCooldown!==h.fn){
        S.error='Foreign cooldown hook retained (not overwritten)';return;
      }
      if(h.own)Object.defineProperty(h.obj,'isCooldown',h.own);
      else delete h.obj.isCooldown;
      S.restores++;
    }catch(e){S.error=String(e?.message||e);}
  }
__esmLocal5=restoreCooldown;

  function release(reason='manual',disable=true){
    S.live=false;
    restoreTween();
    restoreCooldown();
    if(disable){S.enabled=false;S.blocked=false;}
    S.target=null;S.scene='';S.reason=reason;
    return status();
  }
__esmLocal6=release;

  function parentDescriptor(obj,key){
    let p=Object.getPrototypeOf(obj);
    while(p){const d=Object.getOwnPropertyDescriptor(p,key);if(d)return d;p=Object.getPrototypeOf(p);}
    return null;
  }
__esmLocal7=parentDescriptor;

  function ensureTween(c){
    const obj=c?._jh;
    if(S.tween&&S.tween.obj===obj){
      const desc=Object.getOwnPropertyDescriptor(obj,'isPlaying');
      if(desc?.get===S.tween.get&&desc?.set===S.tween.set)return;
      S.error='Animation property externally replaced; not overwriting';
      S.tween=null;return;
    }
    restoreTween();
    if(!obj||typeof obj!=='object')return;
    const own=Object.getOwnPropertyDescriptor(obj,'isPlaying');
    if(own&&!own.configurable){S.error='Animation has non-configurable own property';return;}
    if(!own&&!Object.isExtensible(obj)){S.error='Animation object cannot be extended';return;}
    const parent=own?null:parentDescriptor(obj,'isPlaying');
    let value;
    try{value=obj.isPlaying;}catch(_){return;}
    let wrote=false;
    const readNative=__captureESMFunction((__esmLocal9=(()=>{
      try{
        if(own?.get)return own.get.call(obj);
        if(!own&&parent?.get)return parent.get.call(obj);
      }catch(_){}
      return value;
    })),"readNative");
    const writeNative=__captureESMFunction((__esmLocal10=(v=>{
      wrote=true;value=v;
      try{
        if(own?.set)own.set.call(obj,v);
        else if(!own&&parent?.set)parent.set.call(obj,v);
      }catch(e){S.error=String(e?.message||e);}
    })),"writeNative");
    const get=__captureESMFunction((__esmLocal11=(function(){if(liveFor(c)){S.animationFalse++;return false;}return readNative();})),"get");
    const set=__captureESMFunction((__esmLocal12=(function(v){writeNative(v);})),"set");
    try{
      Object.defineProperty(obj,'isPlaying',{configurable:true,
        enumerable:own?.enumerable??parent?.enumerable??true,get,set});
      S.tween={obj,own,parent,get,set,get value(){
__esmLocal13=__captureESMMethod(this,"value","get");
return value;},get wrote(){
__esmLocal14=__captureESMMethod(this,"wrote","get");
return wrote;}};
      S.animationPatched++;
    }catch(e){S.error=String(e?.message||e);}
  }
__esmLocal8=ensureTween;

  function available(c){
    if(String(W._Ba?._rJ?._O$?.ins?.actorId??'')!==actorId){
      S.blocker='actor_changed';return false;
    }
    if(W.__KVPV_UNIVERSAL_HALTED){S.blocker='universal_halt';return false;}
    if(W.document?.hidden===true){S.blocker='background_tab';return false;}
    const kind=__getKVPV0()?.status?.()?.kind;
    if(!['THIEN_QUAN','LINH_LUNG','PHU_VAN'].includes(kind)){
      S.blocker='outside_supported_boss_scene';return false;
    }
    if(kind!=='THIEN_QUAN'&&__getKVPV0()?.eligible?.(c?.target)!==true){
      S.blocker='waiting_verified_dungeon_monster';return false;
    }
    if(!c){S.blocker='combat_component_missing';return false;}
    const m=__getKVPV2()?.status?.(false);
    if(m?.running!==true){S.blocker='th300_not_running';return false;}
    if(m?.basicOnly!==true){S.blocker='basic_only_disabled';return false;}
    if(!c.target){S.blocker='waiting_for_boss_target';return false;}
    S.blocker='';return true;
  }
__esmLocal15=available;

  function configureBasicOnly(){
    const k=__getKVPV2();
    if(typeof k?.setTianQuanFiveBasics!=='function'||typeof k?.setTianQuanTuyetHoc!=='function')
      throw Error('TH300 basic-mode configuration is unavailable');
    k.setTianQuanFiveBasics(true,1);
    k.setTianQuanTuyetHoc(false);
    k.setTianQuanTHGapBasics?.(false);
    k.setTianQuanIdleFill?.(false);
    k.setConfirmedTailCut?.(true);
  }
__esmLocal16=configureBasicOnly;

  function sync(){
    if(!S.enabled)return status();
    const c=combat();
    // When the user armed outside the map, auto-enable BASIC ONLY once the
    // existing Tian Quan watcher starts TH300. No explicit F5/retry needed.
    if(['THIEN_QUAN','LINH_LUNG','PHU_VAN'].includes(__getKVPV0()?.status?.()?.kind)&&
       __getKVPV2()?.isBasicOnly?.()===false){
      try{
        if(__getKVPV2().status(false)?.running===true)configureBasicOnly();
      }catch(e){S.error=String(e?.message||e);}
    }
    let ok=false;
    try{ok=available(c);}catch(e){S.error=String(e?.message||e);}
    if(!ok){
      if(S.hook||S.tween)release('suspended_outside_basic_tq',false);
      S.reason=S.blocker||'waiting_for_basic_tq';
      return status();
    }
    if(S.hook&&(S.hook.obj!==c||c.isCooldown!==S.hook.fn)){
      const foreign=S.hook.obj===c&&c.isCooldown!==S.hook.fn;
      release('combat_component_changed_or_foreign_hook',false);
      if(foreign){S.error='Foreign cooldown hook retained; turn OFF before re-enabling';S.blocked=true;return status();}
    }
    if(S.blocked)return status();
    if(!S.hook){
      const own=Object.getOwnPropertyDescriptor(c,'isCooldown');
      if(typeof c.isCooldown!=='function'||own&&!own.configurable){
        S.error='Cooldown method cannot be wrapped';return status();
      }
      const original=c.isCooldown;
      const wrapped=__captureESMFunction((__esmLocal18=(function(...args){
        if(this===c&&liveFor(c)){S.cooldownFalse++;return false;}
        return original.apply(this,args);
      })),"wrapped");
      try{
        Object.defineProperty(c,'isCooldown',{configurable:true,writable:true,
          enumerable:own?.enumerable??true,value:wrapped});
        S.hook={obj:c,own,fn:wrapped};
      }catch(e){S.error=String(e?.message||e);return status();}
    }
    S.target=c.target;S.scene=scene();S.live=true;S.reason='active';
    ensureTween(c);
    return status();
  }
__esmLocal17=sync;

  function setEnabled(enabled=true){
    if(enabled!==true)return release('manual_off');
    if(String(W._Ba?._rJ?._O$?.ins?.actorId??'')!==actorId||W.__KVPV_UNIVERSAL_HALTED)
      throw Error('Wrong actor or paused session; no hooks installed');
    // Explicit one-click intent: configure BASIC ONLY rather than requiring
    // the user to remember commands from a previous browser session.
    const inside=['THIEN_QUAN','LINH_LUNG','PHU_VAN'].includes(__getKVPV0()?.status?.()?.kind);
    if(inside){
      // Re-arm through the existing map coordinator. Do not call TH300.start()
      // directly or overwrite the native movement/HitRun owner.
      if(__getKVPV2()?.status?.(false)?.running!==true)
        __getKVPV1()?.armTianQuan?.();
      configureBasicOnly();
    }
    // If Boss selection/scene transition is pending, keep the explicit
    // user choice armed. The next TH300 tick applies it in verified scope.
    S.enabled=true;S.blocked=false;S.error='';S.reason='armed';
    return sync();
  }
__esmLocal19=setEnabled;

  function status(){
    return {enabled:S.enabled,active:S.enabled&&S.live&&!!S.hook,
      animationForced:!!S.tween,cooldownFalseReturns:S.cooldownFalse,
      animationFalseReads:S.animationFalse,animationPatched:S.animationPatched,
      restores:S.restores,reason:S.reason,blocker:S.blocker??'',error:S.error,
      autoTimeout:false,serverCooldownModified:false};
  }
__esmLocal20=status;

  W.KVPV_TQ_BASIC_FORCE=Object.freeze({setEnabled,status,sync,
    suspend:__captureESMFunction((__esmLocal21=(reason=>release(reason??'th300_paused',false))),"suspend"),
    stop:__captureESMFunction((__esmLocal22=(reason=>release(reason??'manual_off'))),"stop")});
})),""))();

}
export {getKVPV_TQ_BASIC_FORCE} from '../api.mjs';
export const api=Object.freeze({
  get KVPV_TQ_BASIC_FORCE(){return globalThis.KVPV_TQ_BASIC_FORCE;},
});