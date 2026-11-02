/* Le Hoi Khu Thu boss combat, map-calibrated only.
 * No invented entry RPC, no auto-purchase, no server range overrides. */
(()=>{'use strict';
const W=window,KEY='KVPV_LE_HOI_KHU_THU',prior=W[KEY],actor=String(W.__KVPV_OWN_ACTOR_ID??'');
try{prior?.stop?.('reload');}catch(_){}
const S={enabled:true,timer:null,mapId:null,sceneType:null,casts:0,moves:0,lastMove:0,distance:null,reason:'requires_event_map_calibration',error:''};
const own=()=>!!actor&&String(W._Ba?._rJ?._O$?.ins?.actorId??'')===actor&&!W.__KVPV_UNIVERSAL_HALTED;
const map=()=>Number(W._C?._Mn?._Cn?.currentID);
const type=()=>Number(W._ft?._po?.ins?.getCfgById?.(map())?.[7]);
const get=(r,k)=>{const id=W._d?._Yct?.[k];return id?r?.getComponent?.(id):null;};
const pos=r=>{const p=r?.property?.get?.('position');return Number.isFinite(Number(p?.x))&&Number.isFinite(Number(p?.y))?{x:Number(p.x),y:Number(p.y)}:null;};
const excluded=()=>W.KVPV_TRANH_BA_TU_PHUONG?.status?.()?.inside===true;
const inside=()=>own()&&S.mapId>0&&map()===S.mapId&&type()===S.sceneType&&
 Number(W._Ba?._$a?._yo?.ins?.intoSce?.[0])===S.mapId&&!excluded();
function tick(){try{
 if(!S.enabled||!own()){S.reason='disabled_or_actor';return;}
 if(!inside()){S.reason='outside_calibrated_event';return;}
 if(W.KVPV_ENTRY_POLICY?.manual===true||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)||
 W._Ba?._rJ?._O$?.ins?.isDead===true){S.reason='manual_or_dead';return;}
 const lease=W.KVPV?.core?.scene?.status?.();
 if(lease?.owner||W.KVPV_HITRUN1?.status?.(false)?.running===true||
 W.KVPV_TH300?.status?.(false)?.running===true||W.KVPV_EVENT_PRIORITY?.hold?.()){
 S.reason='other_owner';return;}
 const role=W._C?._Ba?.instance?.getRole?.(Number(actor)),combat=get(role,'_Het'),selector=get(role,'_Eet'),mover=get(role,'_zet'),target=combat?.target;
 if(!target||target.isValid===false||Number(target.property?.get?.('type'))!==1){S.reason='waiting_selected_boss';return;}
 const hp=target.property?.get?.('hp');if(Array.isArray(hp)&&Number(hp[0])<=0){S.reason='target_dead';return;}
 const a=pos(role),b=pos(target);if(!a||!b){S.reason='waiting_positions';return;}
 const d=Math.hypot(a.x-b.x,a.y-b.y);S.distance=Math.round(d*100)/100;
 if(Math.abs(d-310)>5){
  if(d>1&&typeof mover?.moveTo==='function'&&Date.now()-S.lastMove>=800&&mover.running?.()!==true){
   mover.moveTo(b.x+(a.x-b.x)*310/d,b.y+(a.y-b.y)*310/d);S.moves++;S.lastMove=Date.now();
  }
  S.reason='moving_to_310';return;
 }
 if(combat?.isCooldown?.()!==false){S.reason='native_cooldown';return;}
 if(combat?.isValidTarget?.()!==true||combat?.isValidRange?.()!==true){S.reason='native_range_invalid';return;}
 const now=Date.now(),list=[...(Array.isArray(selector?._rtt)?selector._rtt:[]),...(Array.isArray(selector?._wet)?selector._wet:[])].filter(x=>Number(x?.[0])===8001&&Number(x?.[1])<now);
 if(!list.length||typeof selector?._f7t!=='function'||typeof combat?.combat!=='function'){S.reason='waiting_8001';return;}
 if(Number(selector._f7t(list,[],1))!==8001||combat.target!==target||!inside()){S.reason='selector_changed';return;}
 combat.combat(8001);S.casts++;S.reason='cast_8001';
 }catch(e){S.error=String(e?.message??e);S.reason='error';}}
function calibrateHere(){if(!own()||!(map()>0)||!Number.isFinite(type())||
 W._Ba?._$a?.SceneUtil?.isCommonScene!==false||excluded()||
 Number(W._Ba?._$a?._yo?.ins?.intoSce?.[0])!==map())throw Error('Enter the verified Le Hoi Khu Thu event map first');
 S.mapId=map();S.sceneType=type();S.reason='calibrated';tick();return status();}
function stop(reason='stopped'){S.enabled=false;const clear=W.KVPV_V1?.timers?.clearInterval??W.clearInterval;if(S.timer!=null&&typeof clear==='function')clear(S.timer);S.timer=null;S.reason=reason;}
function status(){return {enabled:S.enabled,calibratedMap:S.mapId,sceneType:S.sceneType,inside:inside(),skill:8001,goal:310,pollMs:1,casts:S.casts,moves:S.moves,distance:S.distance,reason:S.reason,error:S.error,nativeCooldown:true,allowKNB:false};}
W[KEY]=Object.freeze({calibrateHere,status,tick,stop});
const schedule=W.KVPV_V1?.timers?.setInterval??W.setInterval;
if(typeof W.setInterval==='function'&&typeof schedule==='function')S.timer=schedule(tick,1);
})();