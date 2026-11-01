/* Kiem Khieu Quan Hung: native player basics 8001..8005 only, no Tuyet Hoc.
 * Isolated to client scene type 84. Native target, cooldown, range and selector retained. */
(()=>{'use strict';
const W=window,actor=String(W.__KVPV_OWN_ACTOR_ID||''),old=W.KVPV_KIEM_KHIEU_BASIC;
old?.stop?.('reload');
const S={enabled:true,timer:null,casts:0,lastSkill:null,reason:'waiting_scene',error:'',blocked:0};
const type=()=>Number(W._ft?._po?.ins?.getCfgById?.(Number(W._C?._Mn?._Cn?.currentID))?.[7]);
const own=()=>actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;
const comp=(r,n)=>{const key=W._d?._Yct?.[n];return key?r?.getComponent?.(key):null;};
const basic=id=>Number.isSafeInteger(Number(id))&&Number(id)>=8001&&Number(id)<=8005;
function tick(){if(!S.enabled)return;
 try{
  if(!own()||type()!==84){S.reason='outside_kiem_khieu';return;}
  const role=W._C?._Ba?.instance?.getRole?.(Number(actor)),combat=comp(role,'_Het'),sel=comp(role,'_Eet'),target=combat?.target;
  if(!role||W._Ba?._rJ?._O$?.ins?.isDead!==false||Number(target?.property?.get?.('type'))!==4||target?.isValid===false){S.reason='waiting_enemy_player';return;}
  if(Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)){S.reason='manual_ui';return;}
  if(W.KVPV_MODE?.status?.(false)?.mode!=='OFF'&&W.KVPV_MODE?.status?.(false)?.mode!=null){S.reason='other_combat_owner';return;}
  if(typeof combat?.isCooldown!=='function'||combat.isCooldown()!==false){S.blocked++;S.reason='native_cooldown';return;}
  if(combat.isValidTarget?.()!==true||combat.isValidRange?.()!==true){S.reason='native_target_or_range';return;}
  if(typeof sel?._f7t!=='function'||typeof combat?.combat!=='function'){S.reason='native_combat_unavailable';return;}
  const now=Date.now(),list=[...(Array.isArray(sel._rtt)?sel._rtt:[]),...(Array.isArray(sel._wet)?sel._wet:[])];
  const ready=list.filter(x=>basic(x?.[0])&&Number.isFinite(Number(x?.[1]))&&Number(x[1])<now);
  if(!ready.length){S.reason='waiting_basic_ready';return;}
  const id=Number(sel._f7t(ready,[],1));
  if(!basic(id)||!ready.some(x=>Number(x[0])===id)){S.reason='native_basic_rejected';return;}
  if(combat.target!==target||type()!==84)return;
  combat.combat(id);S.casts++;S.lastSkill=id;S.reason='native_basic_cast';
 }catch(e){S.error=String(e?.message??e);S.reason='error';}
}
function stop(reason='stopped'){S.enabled=false;const clear=W.KVPV_V1?.timers?.clearInterval??W.clearInterval;if(S.timer!=null&&typeof clear==='function')clear(S.timer);S.timer=null;S.reason=reason;}
function status(){return {enabled:S.enabled,inside:type()===84,skills:[8001,8002,8003,8004,8005],tuyetHoc:false,casts:S.casts,lastSkill:S.lastSkill,blockedCooldown:S.blocked,reason:S.reason,error:S.error};}
W.KVPV_KIEM_KHIEU_BASIC=Object.freeze({tick,status,stop});
const schedule=W.KVPV_V1?.timers?.setInterval??W.setInterval;
if(typeof W.setInterval==='function'&&typeof schedule==='function')S.timer=schedule(tick,100);
tick();
})();