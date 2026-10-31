/* Async skill readiness observer: never casts or overrides cooldown/animation.
 * Combat remains the sole native sender. */
(() => {
 'use strict';
 const W=window,old=W.KVPV_SKILL_ASYNC_OBSERVER;old?.stop?.();
 const actor=String(W.__KVPV_OWN_ACTOR_ID??'');
 const ids=[8001,8002,8003,8004,8005,1001,1002,1003,1004,1005,1006,1007,1008];
 const S={timer:null,enabled:true,busy:false,checks:0,updatedAt:0,reason:'waiting_role',skills:[],error:''};
 const owned=()=>!!actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;
 const role=()=>{const world=W._C?._Ba?.instance;return world?.getRole?.(Number(actor))??world?.getRole?.(actor);};
 async function scan(){
   if(!S.enabled||S.busy)return;
   if(!owned()){S.reason='waiting_actor';return;}
   S.busy=true;
   try{
     // Never call selectSkill/combat/isCooldown here: native decisions are authoritative.
     const a=role(),components=a?Object.values(a._components??{}):[];
     const skills=components.find(c=>Array.isArray(c?._rtt)||Array.isArray(c?._wet));
     if(!skills){S.reason='waiting_skill_component';return;}
     const rows=[...(skills._rtt??[]),...(skills._wet??[])];
     const known=new Map(rows.filter(Array.isArray).map(row=>[Number(row[0]),row]));
     await Promise.resolve();
     if(!S.enabled||!owned())return;
     S.skills=ids.map(id=>({id,learned:known.has(id),nativeRowPresent:known.has(id)}));
     S.checks++;S.updatedAt=Date.now();S.reason='observed_native_skill_inventory';S.error='';
   }catch(e){S.error=String(e?.message??e);S.reason='observer_error';}
   finally{S.busy=false;}
 }
 function stop(){S.enabled=false;if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)?.(S.timer);S.timer=null;}
 function start(){S.enabled=true;if(S.timer===null){const set=W.KVPV_V1?.timers?.setInterval??W.setInterval;if(typeof set==='function')S.timer=set.call(W,()=>{void scan();},100);else S.reason='waiting_timer_api';}void scan();return status();}
 function status(){return {enabled:S.enabled,actor,observerOnly:true,castsByObserver:0,pollMs:100,checks:S.checks,updatedAt:S.updatedAt,reason:S.reason,error:S.error,skills:S.skills.slice()};}
 W.KVPV_SKILL_ASYNC_OBSERVER=Object.freeze({scan,start,stop,status});
 start();
})();