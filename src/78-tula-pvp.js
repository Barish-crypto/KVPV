/* Tu La Loi Dai: opt-in-like auto arm of the existing native La Phong TH observer.
 * Valid native scene 58/61, existing Daily status and native player target ONLY.
 * Do not compete with Tu La's own updAttack() target/fight AI, send RPC, or touch rewards.
 */
(() => {
'use strict';
const W=window,KEY='KVPV_TULA_PVP',old=W[KEY],actor=String(W.__KVPV_OWN_ACTOR_ID||'');
try{old?.stop?.('reload');}catch(e){W.KVPV_V1?.diagnostics?.record?.(e);}
const C={enabled:old?.config?.enabled!==false,dodgeTH:old?.config?.dodgeTH!==false,pollMs:120};
const S={timer:null,armed:false,enemyId:'',reason:'waiting_tula',lastError:'',armedCount:0,disarmedCount:0};
const prop=(r,k)=>r?.property?.get?.(k);
const identity=r=>String(r?.id??prop(r,'id')??'');
const own=()=>!!actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;
const role=()=>W._C?._Ba?.instance?.getRole?.(Number(actor));
const nativeTarget=r=>{
 const Cmp=W._d?._Yct?._Het;
 return Cmp?r?.getComponent?.(Cmp)?.target:null;
};
function active(){
 const d=W.KVPV_DAILY?.tuLaStatus?.(false),m=W._Ba?._hE?._olt?.inst;
 const scene=Number(W._Ba?._$a?.SceneUtil?.curScene);
 const job=W.KVPV_DAILY?.quickState?.()?.job;
 return own()&&W.KVPV_DAILY?.config?.enableTuLa!==false&&
   d?.dangTrongTran===true&&[58,61].includes(Number(d.canh))&&
   [58,61].includes(scene)&&Number(d.giaiDoan)>=1&&m?.funIsOpen===true&&
   (!job||['tula','rảnh','ranh','idle'].includes(String(job).toLowerCase()));
}
function validTarget(t,r){
 if(!t||t===r||t.isValid===false||identity(t)===''||identity(t)===actor||
    Number(prop(t,'type'))!==4)return false;
 const Cmp=W._d?._Yct?._Het,c=Cmp?r?.getComponent?.(Cmp):null;
 return c?.target===t&&typeof c?.isValidTarget==='function'&&c.isValidTarget()===true;
}
function release(reason){
 if(S.armed){
  try{W.KVPV_PVP_LUOFENG?.stop?.('tula_'+reason);}catch(e){S.lastError=String(e);}
  S.armed=false;S.disarmedCount++;
 }
 S.enemyId='';
}
function tick(){
 if(!C.enabled||!C.dodgeTH||!active()){release('inactive');S.reason='waiting_tula';return;}
 if(W.KVPV_ENTRY_POLICY?.manual===true||W.document?.hidden===true||
    W.document?.hasFocus?.()===false||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)){
  release('manual_or_unfocused');S.reason='manual_or_unfocused';return;
 }
 if(W._Ba?._rJ?._O$?.ins?.isDead===true||W.KVPV_BOSS_TEAM?.priority?.()===true||
    W.KVPV_TH300?.status?.(false)?.running===true||
    W.KVPV_HITRUN1?.status?.(false)?.running===true){
  release('foreign_owner_or_dead');S.reason='foreign_owner_or_dead';return;
 }
 const r=role(),target=nativeTarget(r),observer=W.KVPV_PVP_LUOFENG;
 if(!validTarget(target,r)){release('waiting_player');S.reason='waiting_player_target';return;}
 if(!observer?.start||!observer?.status){release('no_observer');S.reason='observer_missing';return;}
 S.enemyId=identity(target);
 if(!S.armed){
  if(observer.status().enabled===true){S.reason='other_dodge_owner';return;}
  observer.start({autoDodge:true,nearby:false});
  if(observer.status().enabled===true){S.armed=true;S.armedCount++;}
 }else if(observer.status().enabled!==true){
  S.armed=false;S.reason='observer_stopped_elsewhere';return;
 }
 if(S.armed){observer.sync?.();S.reason=observer.status().attached?'observing_native_target':'waiting_observer_attach';}
}
function safeTick(){try{tick();}catch(e){S.lastError=String(e?.message??e);S.reason='error';release('error');}}
function status(){
 const d=W.KVPV_PVP_LUOFENG?.status?.();
 return {enabled:C.enabled,inside:active(),actor,enemyId:S.enemyId,autoDodgeOwned:S.armed,
   armedCount:S.armedCount,disarmedCount:S.disarmedCount,reason:S.reason,lastError:S.lastError,
   observedTH:S.armed?(d?.observedTH??0):0,nearbyTH:0,
   nativeDodgeAttempts:S.armed?(d?.nativeDodgeAttempts??0):0,dodge:S.armed?d:null,
   config:{...C},attackMode:'native_tula_updAttack_unchanged',
   note:'Tu La scene 58/61 only; direct selected type-4 player signals 1039. No verified nearby opponent roster, no auto-attack duplication, no guarantee TH cast signals are replicated.'};
}
function start(){C.enabled=true;if(S.timer===null)S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(safeTick,C.pollMs);safeTick();return status();}
function stop(reason='manual_stop'){C.enabled=false;if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)?.(S.timer);
 S.timer=null;release(reason);S.reason=reason;return status();}
W[KEY]=Object.freeze({start,stop,status,tick:safeTick,config:C});start();
})();
