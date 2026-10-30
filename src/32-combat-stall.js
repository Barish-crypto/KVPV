/*
 * KVPV Combat Stall Inspector: read-only ownership/target diagnostics and
 * safe Thác Ấn config-only rollback. No combat restarts, hooks, or RPC.
 */
(() => {
 'use strict';
 const W=window,KEY='KVPV_COMBAT_STALL';
 const actor=String(W.__KVPV_OWN_ACTOR_ID??'');
 const safe=fn=>{try{return fn();}catch(e){return {error:String(e?.message||e)};}};
 const state=(obj,...args)=>safe(()=>obj?.status?.(...args)??null);
 function snapshot(){
   const own=String(W._Ba?._rJ?._O$?.ins?.actorId??'')===actor&&
     !!actor&&!W.__KVPV_UNIVERSAL_HALTED;
   const scene=Number(W._C?._Mn?._Cn?.currentID??W._Ba?._$a?._yo?.ins?.intoSce?.[0]);
   const far=state(W.KVPV_FAR_SCOPE),mode=state(W.KVPV_MODE,false),
     th=state(W.KVPV_TH300,false),basics=state(W.KVPV_BASIC10),
     hr=state(W.KVPV_HITRUN1,false),force=state(W.KVPV_TQ_BASIC_FORCE),
     force4100=state(W.KVPV_TQ4100_COOLDOWN_EXPERIMENT),
     thac=state(W.KVPV_THAC_AN_CD0),xa=state(W.KVPV_XA_MENH_LV2);
   const me=safe(()=>{
     const world=W._C?._Ba?.instance;
     return world?.getRole?.(Number(actor))??world?.getRole?.(actor);
   });
   const comp=safe(()=>me?.getComponent?.(W._d?._Yct?._Het));
   const selector=safe(()=>me?.getComponent?.(W._d?._Yct?._Eet));
   const target=comp?.target;
   const targetType=safe(()=>target?.property?.get?.('type')??null);
   const targetHp=safe(()=>target?.property?.get?.('hp')??null);
   const hints=[];
   if(!own)hints.push('game_frame_actor_or_session_not_ready');
   if(thac?.unresolved?.length)hints.push('thac_an_client_cooldowns_still_zero');
   if(xa?.unresolved===true)hints.push('xa_menh_client_cooldown_still_zero');
   if(!comp||typeof comp?.combat!=='function')hints.push('native_combat_component_missing');
   if(!selector||typeof selector?._f7t!=='function')hints.push('native_skill_selector_missing');
   if(target==null)hints.push('native_target_missing');
   if(mode?.mode==='OFF'&&far?.inside===true)hints.push('far_combat_mode_off_or_waiting');
   if(far?.inside===false&&basics?.enabled===false)hints.push('outside_basic_controller_off');
   if(typeof th?.reason==='string'&&/animation|cooldown|skill_readiness/.test(th.reason))
     hints.push('long_range_controller_waiting_'+th.reason);
   if(typeof basics?.reason==='string'&&/cooldown|ready|target|range/.test(basics.reason))
     hints.push('outside_controller_waiting_'+basics.reason);
   return {version:1,actorMatches:own,map:scene,scene:far?.kind??'unknown',
     native:{combatPresent:typeof comp?.combat==='function',selectorPresent:typeof selector?._f7t==='function',
       cooldownMethodPresent:typeof comp?.isCooldown==='function',
       targetType,targetHp},hints,
     mode:{mode:mode?.mode??null,reason:mode?.reason??null,lastError:mode?.lastError??null,
       running:mode?.combatRunning??null},
     outside:{enabled:basics?.enabled??null,reason:basics?.reason??null,
       attempts:basics?.attempts??null,lastError:basics?.lastError??null},
     long:{running:th?.running??null,reason:th?.reason??th?.lastReason??null,
       phase:th?.phase??th?.combatPhase??null,lastError:th?.lastError??null},
     hitrun:{running:hr?.running??null,phase:hr?.phase??null},
     hooks:{tqBasicForce:force?.enabled??null,tq4100Force:force4100?.enabled??null},
     thac:{enabled:thac?.enabled??null,unresolved:thac?.unresolved??[],rollbackCount:thac?.rollbackCount??null},
     xa:{enabled:xa?.enabled??null,ms:xa?.configCooldownMs??null,rollbackCount:xa?.rollbackCount??null},
     note:'Read-only snapshot; no server skill outcome proven. Do not infer reason from a still image alone.'};
 }
 function recover(){
   // Restore ONLY known Thác Ấn client configuration. Never modify active
   // combat ownership/animation or forcibly restart a manually stopped mode.
   safe(()=>W.KVPV_XA_MENH_LV2?.recover?.());
   safe(()=>W.KVPV_THAC_AN_CD0?.recover?.());
   return snapshot();
 }
 W[KEY]=Object.freeze({snapshot,status:snapshot,recover});
})();
