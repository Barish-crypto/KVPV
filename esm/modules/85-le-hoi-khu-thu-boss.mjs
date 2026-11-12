import {getKVPV_ENTRY_POLICY as __getKVPV0,getKVPV_EVENT_PRIORITY as __getKVPV1,getKVPV_HITRUN1 as __getKVPV2,getKVPV_TH300 as __getKVPV3,getKVPV_TRANH_BA_TU_PHUONG as __getKVPV4,getKVPV_V1 as __getKVPV5} from '../api.mjs';
function __captureESMFunction(fn,name){
  if(fn.name!==name)Object.defineProperty(fn,"name",{value:name,configurable:true});
  return fn;
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
export {__esmLocal0 as local_anonymous_3_1_0};
export {__esmLocal1 as local_own_1};
export {__esmLocal2 as local_map_2};
export {__esmLocal3 as local_type_3};
export {__esmLocal4 as local_get_4};
export {__esmLocal5 as local_pos_5};
export {__esmLocal6 as local_excluded_6};
export {__esmLocal7 as local_releaseGuard_7};
export {__esmLocal8 as local_installGuard_8};
export {__esmLocal9 as local_wrapper_9};
export {__esmLocal10 as local_inside_10};
export {__esmLocal11 as local_tick_11};
export {__esmLocal12 as local_anonymous_43_140_12};
export {__esmLocal13 as local_calibrateHere_13};
export {__esmLocal14 as local_stop_14};
export {__esmLocal15 as local_status_15};
export function initialize(){
/* Le Hoi Khu Thu boss combat, map-calibrated only.
 * No invented entry RPC, no auto-purchase, no server range overrides. */
(__captureESMFunction((__esmLocal0=(()=>{'use strict';
const W=window,KEY='KVPV_LE_HOI_KHU_THU',prior=W[KEY],actor=String(W.__KVPV_OWN_ACTOR_ID??'');
try{prior?.stop?.('reload');}catch(_){}
const S={enabled:false,timer:null,mapId:null,sceneType:null,casts:0,moves:0,filtered:0,lastMove:0,distance:null,reason:'stopped',error:''};
const G={combat:null,wrapper:null,descriptor:null};
const own=__captureESMFunction((__esmLocal1=(()=>!!actor&&String(W._Ba?._rJ?._O$?.ins?.actorId??'')===actor&&!W.__KVPV_UNIVERSAL_HALTED)),"own");
const map=__captureESMFunction((__esmLocal2=(()=>Number(W._C?._Mn?._Cn?.currentID))),"map");
const type=__captureESMFunction((__esmLocal3=(()=>Number(W._ft?._po?.ins?.getCfgById?.(map())?.[7]))),"type");
const get=__captureESMFunction((__esmLocal4=((r,k)=>{const id=W._d?._Yct?.[k];return id?r?.getComponent?.(id):null;})),"get");
const pos=__captureESMFunction((__esmLocal5=(r=>{const p=r?.property?.get?.('position');return Number.isFinite(Number(p?.x))&&Number.isFinite(Number(p?.y))?{x:Number(p.x),y:Number(p.y)}:null;})),"pos");
const excluded=__captureESMFunction((__esmLocal6=(()=>__getKVPV4()?.status?.()?.inside===true)),"excluded");
function releaseGuard(){const g=G;if(!g.combat)return;try{if(g.combat.combat===g.wrapper){if(g.descriptor)Object.defineProperty(g.combat,'combat',g.descriptor);else delete g.combat.combat;}}catch(e){S.error=String(e?.message??e);}G.combat=G.wrapper=G.descriptor=null;}
__esmLocal7=releaseGuard;

function installGuard(c){if(G.combat===c&&c?.combat===G.wrapper)return true;releaseGuard();if(typeof c?.combat!=='function')return false;const original=c.combat,descriptor=Object.getOwnPropertyDescriptor(c,'combat');if(descriptor?.configurable===false&&descriptor.writable!==true)return false;const wrapper=__captureESMFunction((__esmLocal9=(function(skill,...args){if(S.enabled&&own()&&inside()&&Number(skill)!==8001){S.filtered++;return;}return original.call(this,skill,...args);})),"wrapper");try{Object.defineProperty(c,'combat',{configurable:descriptor?.configurable??true,writable:descriptor?.writable??true,enumerable:descriptor?.enumerable??false,value:wrapper});G.combat=c;G.wrapper=wrapper;G.descriptor=descriptor;return true;}catch(e){S.error=String(e?.message??e);return false;}}
__esmLocal8=installGuard;

const inside=__captureESMFunction((__esmLocal10=(()=>own()&&S.mapId>0&&map()===S.mapId&&type()===S.sceneType&&
 Number(W._Ba?._$a?._yo?.ins?.intoSce?.[0])===S.mapId&&!excluded())),"inside");
function tick(){try{
 if(!S.enabled||!own()){releaseGuard();S.reason='disabled_or_actor';return;}
 if(!inside()){releaseGuard();S.reason='outside_calibrated_event';return;}
 const role=W._C?._Ba?.instance?.getRole?.(Number(actor)),combat=get(role,'_Het');
 if(__getKVPV0()?.manual===true||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)||
 W._Ba?._rJ?._O$?.ins?.isDead===true){releaseGuard();S.reason='manual_or_dead';return;}
 const lease=W.KVPV?.core?.scene?.status?.();
 if(lease?.owner||__getKVPV2()?.status?.(false)?.running===true||
 __getKVPV3()?.status?.(false)?.running===true||__getKVPV1()?.hold?.()){
 releaseGuard();S.reason='other_owner';return;}
 const selector=get(role,'_Eet'),mover=get(role,'_zet');
 const target=combat?.target;
 if(!target||target.isValid===false||Number(target.property?.get?.('type'))!==1){releaseGuard();S.reason='waiting_selected_boss';return;}
 const hp=target.property?.get?.('hp');if(Array.isArray(hp)&&Number(hp[0])<=0){releaseGuard();S.reason='target_dead';return;}
 if(W.KVPV?.core?.scene?.combat?.claim?.('85-le-hoi-khu-thu-boss',85)!==true){releaseGuard();S.reason='combat_dispatch_wait';return;}
 if(!installGuard(combat)){S.reason='combat_guard_unavailable';return;}
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
 const now=Date.now(),list=[...(Array.isArray(selector?._rtt)?selector._rtt:[]),...(Array.isArray(selector?._wet)?selector._wet:[])].filter(__captureESMFunction((__esmLocal12=(x=>Number(x?.[0])===8001&&Number(x?.[1])<now)),""));
 if(!list.length||typeof selector?._f7t!=='function'||typeof combat?.combat!=='function'){S.reason='waiting_8001';return;}
 if(Number(selector._f7t(list,[],1))!==8001||combat.target!==target||!inside()){S.reason='selector_changed';return;}
 combat.combat(8001);S.casts++;S.reason='cast_8001';
 }catch(e){S.error=String(e?.message??e);S.reason='error';}}
__esmLocal11=tick;

function calibrateHere(){if(!own()||!(map()>0)||!Number.isFinite(type())||
 W._Ba?._$a?.SceneUtil?.isCommonScene!==false||excluded()||
 Number(W._Ba?._$a?._yo?.ins?.intoSce?.[0])!==map())throw Error('Enter the verified Le Hoi Khu Thu event map first');
 S.mapId=map();S.sceneType=type();S.reason='calibrated';tick();return status();}
__esmLocal13=calibrateHere;

function stop(reason='stopped'){S.enabled=false;releaseGuard();const clear=__getKVPV5()?.timers?.clearInterval??W.clearInterval;if(S.timer!=null&&typeof clear==='function')clear(S.timer);S.timer=null;S.reason=reason;}
__esmLocal14=stop;

function start(){S.enabled=true;const schedule=__getKVPV5()?.timers?.setInterval??W.setInterval;if(S.timer===null&&typeof schedule==='function')S.timer=schedule(tick,1);S.reason=S.mapId===null?'requires_event_map_calibration':'started';return status();}

function status(){return {enabled:S.enabled,calibratedMap:S.mapId,sceneType:S.sceneType,inside:inside(),skill:8001,goal:310,pollMs:1,casts:S.casts,moves:S.moves,distance:S.distance,reason:S.reason,error:S.error,filteredNon8001:S.filtered,nativeCooldown:true,allowKNB:false};}
__esmLocal15=status;

W[KEY]=Object.freeze({calibrateHere,status,tick,start,stop});
})),""))();
}
export const api=Object.freeze({
});