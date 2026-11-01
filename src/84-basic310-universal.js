/* Generic idle combat: single native basic 8001 and standoff 310.
 * No range/cooldown spoof, no effect on special event owners or resource gathering. */
(()=>{'use strict';
const W=window,old=W.KVPV_BASIC310_UNIVERSAL;old?.stop?.('reload');
const actor=String(W.__KVPV_OWN_ACTOR_ID??'');
const S={enabled:true,timer:null,casts:0,moves:0,lastMoveAt:0,lastCastAt:0,distance:null,reason:'waiting',error:'',skill:8001};
const own=()=>!!actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;
const pos=r=>{const p=r?.property?.get?.('position'),x=Number(p?.x),y=Number(p?.y);return Number.isFinite(x)&&Number.isFinite(y)?{x,y}:null;};
const get=(r,k)=>{const t=W._d?._Yct?.[k];return t?r?.getComponent?.(t):null;};
function excluded(){const e=W.KVPV_TRANH_BA_TU_PHUONG?.status?.();return e?.inside===true||(e?.eventActive===true&&W._Ba?._$a?.SceneUtil?.isCommonScene===false&&(e?.verifiedMap==null||Number(e.map)===Number(e.verifiedMap)));}
function priority(){
 if(W.KVPV_ENTRY_POLICY?.manual===true||W.KVPV_EVENT_PRIORITY?.hold?.()||W.KVPV_BOSS_TEAM?.priority?.())return 'priority_owner';
 const q=W.KVPV_DAILY?.quickState?.();
 if(q?.running===true&&!['idle','rảnh','ranh',''].includes(String(q?.job??'').toLowerCase()))return 'daily_job';
 if(W.KVPV_TH300?.status?.(false)?.running===true||W.KVPV_HITRUN1?.status?.(false)?.running===true)return 'boss_owner';
 const mode=W.KVPV_MODE?.status?.(false)?.mode;
 if(mode&&mode!=='OFF')return 'mode_owner';
 const lease=W.KVPV?.core?.scene?.status?.();
 if(lease?.owner)return 'scene_lease';
 const beast=W.KVPV_BEAST_ISLAND?.status?.();
 if(beast?.phase==='ACTIVE'||beast?.phase==='ENTERING')return 'beast_task';
 if(W._Ba?._K_t?._Z7t?.ins?.gathering===true)return 'gathering';
 return null;
}
function tick(){try{
 if(!S.enabled||!own()){S.reason='actor_unavailable';return;}
 if(excluded()){S.reason='excluded_tranh_ba_tu_phuong';return;}
 if(W._Ba?._rJ?._O$?.ins?.isDead===true){S.reason='dead';return;}
 if(Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)){S.reason='manual_ui';return;}
 const blocked=priority();if(blocked){S.reason=blocked;return;}
 const role=W._C?._Ba?.instance?.getRole?.(Number(actor)),combat=get(role,'_Het'),selector=get(role,'_Eet'),mover=get(role,'_zet'),target=combat?.target;
 const kind=Number(target?.property?.get?.('type'));
 if(!target||target.isValid===false||kind!==1){S.reason='waiting_monster_target';return;}
 const hp=target.property?.get?.('hp');
 if(Array.isArray(hp)&&Number(hp[0])<=0){S.reason='target_dead';return;}
 const a=pos(role),b=pos(target);if(!a||!b){S.reason='waiting_positions';return;}
 const d=Math.hypot(a.x-b.x,a.y-b.y);S.distance=Math.round(d*100)/100;
 if(d<1){S.reason='overlap';return;}
 if(Math.abs(d-310)>5){
  if(typeof mover?.moveTo==='function'&&Date.now()-S.lastMoveAt>=800&&mover.running?.()!==true){
   const x=b.x+(a.x-b.x)*310/d,y=b.y+(a.y-b.y)*310/d;
   if(Number.isFinite(x)&&Number.isFinite(y)){mover.moveTo(x,y);S.moves++;S.lastMoveAt=Date.now();}
  }
  S.reason='moving_to_310';return;
 }
 if(typeof combat?.isCooldown!=='function'||combat.isCooldown()!==false){S.reason='native_cooldown';return;}
 if(combat.isValidTarget?.()!==true||combat.isValidRange?.()!==true){S.reason='native_range_or_target';return;}
 const rows=[...(Array.isArray(selector?._rtt)?selector._rtt:[]),...(Array.isArray(selector?._wet)?selector._wet:[])];
 const ready=rows.filter(r=>Number(r?.[0])===8001&&Number(r?.[1])<Date.now());
 if(!ready.length||typeof selector?._f7t!=='function'||typeof combat?.combat!=='function'){S.reason='waiting_basic8001';return;}
 if(Number(selector._f7t(ready,[],1))!==8001){S.reason='selector_rejected';return;}
 if(combat.target!==target||excluded()||priority()){S.reason='owner_changed';return;}
 combat.combat(8001);S.casts++;S.lastCastAt=Date.now();S.reason='cast_8001';
 }catch(e){S.error=String(e?.message??e);S.reason='error';}}
function stop(reason='stop'){S.enabled=false;const clear=W.KVPV_V1?.timers?.clearInterval??W.clearInterval;if(S.timer!==null&&typeof clear==='function')clear(S.timer);S.timer=null;S.reason=reason;}
function status(){return {enabled:S.enabled,skill:8001,goal:310,tolerance:5,pollMs:1,insideExcludedEvent:excluded(),distance:S.distance,casts:S.casts,moves:S.moves,lastCastAt:S.lastCastAt,reason:S.reason,error:S.error,nativeCooldown:true,nativeRange:true};}
W.KVPV_BASIC310_UNIVERSAL=Object.freeze({status,tick,stop});
const schedule=W.KVPV_V1?.timers?.setInterval??W.setInterval;
if(typeof W.setInterval==='function'&&typeof schedule==='function')S.timer=schedule(tick,1);
tick();
})();