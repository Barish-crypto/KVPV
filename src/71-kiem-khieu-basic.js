/* Kiem Khieu Quan Hung: native player basic 8001 only, no Tuyet Hoc.
 * Isolated to client scene type 84. Native target, cooldown, range and selector retained. */
(()=>{'use strict';
const W=window,actor=String(W.__KVPV_OWN_ACTOR_ID||''),old=W.KVPV_KIEM_KHIEU_BASIC;
old?.stop?.('reload');
const S={enabled:true,timer:null,casts:0,lastSkill:null,reason:'waiting_scene',error:'',blocked:0,lastOwnerRecoveryAt:0,filtered:0,guard:null,visual:{factor:9999,calls:0,applied:0,unavailable:0,conflicts:0}};
const type=()=>Number(W._ft?._po?.ins?.getCfgById?.(Number(W._C?._Mn?._Cn?.currentID))?.[7]);
const own=()=>actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;
const comp=(r,n)=>{const key=W._d?._Yct?.[n];return key?r?.getComponent?.(key):null;};
const basic=id=>Number(id)===8001;
// Visual-only acceleration for one native 8001 cast; restore the original tween method immediately.
function cast8001(combat){
 const avatar=combat?._Qrt,original=avatar?.getActionTween;
 const descriptor=avatar&&Object.getOwnPropertyDescriptor(avatar,'getActionTween');
 if(typeof original!=='function'||(descriptor&&descriptor.configurable===false)){
  S.visual.unavailable++;return combat.combat(8001);
 }
 let action;try{action=combat?._mvt?.(8001)?.[5];}catch(_){}
 const expected=typeof action==='string'&&action.trim()?action:'attack';
 const wrapped=function(...args){
  if(args[0]===expected){
   const speed=Number(args[2]??1);
   if(Number.isFinite(speed)&&speed>0){args[2]=Math.min(9999,speed*9999);S.visual.applied++;}
  }
  return original.apply(this,args);
 };
 try{Object.defineProperty(avatar,'getActionTween',{configurable:true,writable:true,enumerable:descriptor?.enumerable??false,value:wrapped});}
 catch(_){S.visual.unavailable++;return combat.combat(8001);}
 S.visual.calls++;
 try{return combat.combat(8001);}
 finally{
  if(avatar.getActionTween===wrapped){
   try{if(descriptor)Object.defineProperty(avatar,'getActionTween',descriptor);else delete avatar.getActionTween;}
   catch(e){S.visual.conflicts++;S.error=String(e?.message??e);}
  }else S.visual.conflicts++;
 }
}
function releaseGuard(){
 const g=S.guard;if(!g)return;
 try{if(g.combat.combat===g.wrap){if(g.descriptor)Object.defineProperty(g.combat,'combat',g.descriptor);else delete g.combat.combat;}}catch(e){S.error=String(e?.message??e);}
 S.guard=null;
}
function ensureGuard(c){
 if(S.guard?.combat===c&&c.combat===S.guard.wrap)return true;
 releaseGuard();
 if(typeof c?.combat!=='function')return false;
 const original=c.combat,descriptor=Object.getOwnPropertyDescriptor(c,'combat');
 if(descriptor&&descriptor.configurable===false)return false;
 const wrap=function(skill,...args){
  if(S.enabled&&own()&&type()===84&&this===c&&Number(skill)!==8001){S.filtered++;return;}
  return original.call(this,skill,...args);
 };
 try{Object.defineProperty(c,'combat',{configurable:true,writable:true,enumerable:descriptor?.enumerable??false,value:wrap});S.guard={combat:c,wrap,descriptor};return true;}
 catch(e){S.error=String(e?.message??e);return false;}
}
function tick(){if(!S.enabled)return;
 try{
  if(!own()||type()!==84){releaseGuard();S.reason='outside_kiem_khieu';return;}
  const role=W._C?._Ba?.instance?.getRole?.(Number(actor)),combat=comp(role,'_Het'),sel=comp(role,'_Eet'),target=combat?.target;
  if(combat&&!ensureGuard(combat)){S.reason='native_filter_unavailable';return;}
  if(!role||W._Ba?._rJ?._O$?.ins?.isDead===true||![1,4].includes(Number(target?.property?.get?.('type')))||target?.isValid===false){S.reason='waiting_valid_target';return;}
  if(Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)){S.reason='manual_ui';return;}
  const mode=W.KVPV_MODE?.status?.(false)?.mode;
  if(mode&&mode!=='OFF'){
   if(Date.now()-S.lastOwnerRecoveryAt>=5000&&typeof W.KVPV_MODE?.stop==='function'){
    S.lastOwnerRecoveryAt=Date.now();
    W.KVPV_MODE.stop('Kiem Khieu scene84: handoff player combat to native basic 8001');
   }
   const current=W.KVPV_MODE?.status?.(false)?.mode;
   if(current&&current!=='OFF'){S.reason='other_combat_owner';return;}
  }
  if(typeof combat?.isCooldown!=='function'||combat.isCooldown()!==false){S.blocked++;S.reason='native_cooldown';return;}
  if(combat.isValidTarget?.()!==true||combat.isValidRange?.()!==true){S.reason='native_target_or_range';return;}
  if(typeof sel?._f7t!=='function'||typeof combat?.combat!=='function'){S.reason='native_combat_unavailable';return;}
  const now=Date.now(),list=[...(Array.isArray(sel._rtt)?sel._rtt:[]),...(Array.isArray(sel._wet)?sel._wet:[])];
  const ready=list.filter(x=>basic(x?.[0])&&Number.isFinite(Number(x?.[1]))&&Number(x[1])<now);
  if(!ready.length){S.reason='waiting_basic_ready';return;}
  const id=Number(sel._f7t(ready,[],1));
  if(!basic(id)||!ready.some(x=>Number(x[0])===id)){S.reason='native_basic_rejected';return;}
  if(combat.target!==target||type()!==84)return;
  cast8001(combat);S.casts++;S.lastSkill=id;S.reason='native_basic_cast';
 }catch(e){S.error=String(e?.message??e);S.reason='error';}
}
function stop(reason='stopped'){S.enabled=false;releaseGuard();const clear=W.KVPV_V1?.timers?.clearInterval??W.clearInterval;if(S.timer!=null&&typeof clear==='function')clear(S.timer);S.timer=null;S.reason=reason;}
function status(){return {enabled:S.enabled,inside:type()===84,skills:[8001],pollMs:1,nativeCooldownPreserved:true,tuyetHoc:false,casts:S.casts,lastSkill:S.lastSkill,blockedCooldown:S.blocked,filteredNon8001:S.filtered,filterActive:!!S.guard,sceneId:W._C?._Mn?._Cn?.currentID??null,sceneType:type(),actorMatch:!!own(),targetType:(()=>{const r=W._C?._Ba?.instance?.getRole?.(Number(actor));return comp(r,'_Het')?.target?.property?.get?.('type')??null;})(),combatMode:W.KVPV_MODE?.status?.(false)?.mode??null,timerActive:S.timer!==null,visual:{...S.visual,visualOnly:true},reason:S.reason,error:S.error};}
W.KVPV_KIEM_KHIEU_BASIC=Object.freeze({tick,status,stop});
const schedule=W.KVPV_V1?.timers?.setInterval??W.setInterval;
if(typeof W.setInterval==='function'&&typeof schedule==='function')S.timer=schedule(tick,1);
tick();
})();