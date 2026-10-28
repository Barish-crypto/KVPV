/* Explicit opt-in, persistent client-only basic force for Tian Quan.
 * No timer and no server protocol edits. One owned hook per component/tween;
 * native fallback outside the owned BASIC ONLY context and manual OFF. */
(() => {
  'use strict';
  const W=window;
  W.KVPV_TQ_BASIC_FORCE?.stop?.('module_reload');
  const actorId=String(W.__KVPV_OWN_ACTOR_ID??W._Ba?._rJ?._O$?.ins?.actorId??'');
  const S={enabled:false,live:false,hook:null,tween:null,target:null,scene:'',
    cooldownFalse:0,animationFalse:0,animationPatched:0,restores:0,
    error:'',reason:'off'};
  const scene=()=>String(W._Ba?._$a?._yo?.ins?.intoSce?.[0]??'');
  const combat=()=>{
    const world=W._C?._Ba?.instance;
    const a=world?.getRole?.(Number(actorId))??world?.getRole?.(actorId);
    return a?.getComponent?.(W._d?._Yct?._Het);
  };
  // PURE primitive checks in wrappers: never call KVPV_TH300.status(),
  // scope.status(), nativeReady() or the module's own sync() from a wrapper.
  function liveFor(c){
    return S.enabled&&S.live&&W.document?.hidden!==true&&
      !W.__KVPV_UNIVERSAL_HALTED&&
      String(W._Ba?._rJ?._O$?.ins?.actorId??'')===actorId&&
      S.hook?.obj===c&&c?.target===S.target&&scene()===S.scene;
  }
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
  function release(reason='manual',disable=true){
    S.live=false;
    restoreTween();
    restoreCooldown();
    if(disable){S.enabled=false;S.blocked=false;}
    S.target=null;S.scene='';S.reason=reason;
    return status();
  }
  function parentDescriptor(obj,key){
    let p=Object.getPrototypeOf(obj);
    while(p){const d=Object.getOwnPropertyDescriptor(p,key);if(d)return d;p=Object.getPrototypeOf(p);}
    return null;
  }
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
    const readNative=()=>{
      try{
        if(own?.get)return own.get.call(obj);
        if(!own&&parent?.get)return parent.get.call(obj);
      }catch(_){}
      return value;
    };
    const writeNative=v=>{
      wrote=true;value=v;
      try{
        if(own?.set)own.set.call(obj,v);
        else if(!own&&parent?.set)parent.set.call(obj,v);
      }catch(e){S.error=String(e?.message||e);}
    };
    const get=function(){if(liveFor(c)){S.animationFalse++;return false;}return readNative();};
    const set=function(v){writeNative(v);};
    try{
      Object.defineProperty(obj,'isPlaying',{configurable:true,
        enumerable:own?.enumerable??parent?.enumerable??true,get,set});
      S.tween={obj,own,parent,get,set,get value(){return value;},get wrote(){return wrote;}};
      S.animationPatched++;
    }catch(e){S.error=String(e?.message||e);}
  }
  function available(c){
    if(!c||String(W._Ba?._rJ?._O$?.ins?.actorId??'')!==actorId||
      W.__KVPV_UNIVERSAL_HALTED||W.document?.hidden===true)return false;
    const m=W.KVPV_TH300?.status?.(false);
    if(m?.running!==true||m?.basicOnly!==true)return false;
    if(W.KVPV_FAR_SCOPE?.status?.()?.kind!=='THIEN_QUAN')return false;
    if(W.KVPV_TQ4100_COOLDOWN_EXPERIMENT?.active?.()===true)return false;
    return !!c.target;
  }
  function sync(){
    if(!S.enabled)return status();
    const c=combat();
    let ok=false;
    try{ok=available(c);}catch(e){S.error=String(e?.message||e);}
    if(!ok){if(S.hook||S.tween)release('suspended_outside_basic_tq',false);return status();}
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
      const wrapped=function(...args){
        if(this===c&&liveFor(c)){S.cooldownFalse++;return false;}
        return original.apply(this,args);
      };
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
  function setEnabled(enabled=true){
    if(enabled!==true)return release('manual_off');
    if(!available(combat()))throw Error('Requires running BASIC ONLY in Tian Quan');
    S.enabled=true;S.blocked=false;S.error='';
    return sync();
  }
  function status(){
    return {enabled:S.enabled,active:S.enabled&&S.live&&!!S.hook,
      animationForced:!!S.tween,cooldownFalseReturns:S.cooldownFalse,
      animationFalseReads:S.animationFalse,animationPatched:S.animationPatched,
      restores:S.restores,reason:S.reason,error:S.error,
      autoTimeout:false,serverCooldownModified:false};
  }
  W.KVPV_TQ_BASIC_FORCE=Object.freeze({setEnabled,status,sync,stop:reason=>release(reason??'manual_off')});
})();
