/* Optional Tian Quan 4100 cooldown experiment, isolated from the native combat controller.
 * Disabled on load. It only changes an owned local component wrapper when explicitly enabled.
 * No server cooldown, WebSocket, or skill timestamp is modified. */
(() => {
  'use strict';
  const W=window;
  W.KVPV_TQ4100_COOLDOWN_EXPERIMENT?.stop?.('reload');
  const actorId=String(W.__KVPV_OWN_ACTOR_ID||'');
  const state={enabled:false,hook:null,falseReturns:0,trials:0,restores:0,reason:'off',error:''};
  const role=()=>{const world=W._C?._Ba?.instance;
    return world?.getRole?.(Number(actorId))??world?.getRole?.(actorId);};
  const combat=()=>role()?.getComponent?.(W._d?._Yct?._Het);
  const eligible=c=>!!c&&String(W._Ba?._rJ?._O$?.ins?.actorId??'')===actorId&&
    !W.__KVPV_UNIVERSAL_HALTED&&W.KVPV_TH300?.tianQuan4100CooldownEligible?.(c)===true;
  function release(reason='manual'){
    const h=state.hook;state.hook=null;state.enabled=false;
    if(h){
      try{
        if(h.obj.isCooldown===h.fn){
          if(h.own)Object.defineProperty(h.obj,'isCooldown',h.own);
          else delete h.obj.isCooldown;
          state.restores++;
        }else state.error='Foreign isCooldown wrapper retained without overwrite';
      }catch(e){state.error=String(e?.message||e);}
    }
    state.reason=reason;
  }
  function status(){return {enabled:state.enabled,
    active:state.enabled&&!!state.hook&&state.hook.obj.isCooldown===state.hook.fn&&eligible(state.hook.obj),
    automaticExpiry:false,expiresInMs:null,minCastGapMs:80,
    falseReturns:state.falseReturns,trials:state.trials,restores:state.restores,
    reason:state.reason,error:state.error,serverCooldownModified:false,
    nativeAnimationGatePreserved:true,webSocketUnaffected:true,
    scope:'Tian Quan 4100 BASIC SOLO (experimental module)'};
  }
  function sync(){
    if(!state.enabled)return status();
    const c=combat();
    if(!eligible(c)){release('left_scope_or_changed_combat');return status();}
    if(state.hook){
      if(state.hook.obj!==c||c.isCooldown!==state.hook.fn)
        release('component_or_external_hook_changed');
      return status();
    }
    const own=Object.getOwnPropertyDescriptor(c,'isCooldown');
    if((own&&!own.configurable)||typeof c.isCooldown!=='function'){
      state.error='Cannot safely install local cooldown wrapper';release('hook_unavailable');return status();
    }
    const original=c.isCooldown;
    const wrapped=function(...args){
      if(this===c&&state.enabled&&eligible(c)){state.falseReturns++;return false;}
      return original.apply(this,args);
    };
    try{
      Object.defineProperty(c,'isCooldown',{value:wrapped,writable:true,configurable:true,enumerable:!!own?.enumerable});
      state.hook={obj:c,own,fn:wrapped};
      state.reason='active';
    }catch(e){state.error=String(e?.message||e);release('hook_error');}
    return status();
  }
  function setEnabled(enabled=true){
    if(enabled!==true){release('manual');return status();}
    const c=combat();
    if(!eligible(c))throw Error('Requires active TH300 Tian Quan 4100 basic solo and the current Boss');
    release('restart');state.enabled=true;state.error='';state.trials++;
    return sync();
  }
  W.KVPV_TQ4100_COOLDOWN_EXPERIMENT=Object.freeze({
    status,active:()=>status().active,sync,setEnabled,stop:release
  });
})();