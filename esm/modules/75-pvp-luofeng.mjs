import {getKVPV_BASIC10 as __getKVPV0,getKVPV_BOSS_TEAM as __getKVPV1,getKVPV_DAILY as __getKVPV2,getKVPV_ENTRY_POLICY as __getKVPV3,getKVPV_FAR_SCOPE as __getKVPV4,getKVPV_HITRUN1 as __getKVPV5,getKVPV_MODE as __getKVPV6,getKVPV_STRONGEST_TEAM as __getKVPV7,getKVPV_TH300 as __getKVPV8,getKVPV_V1 as __getKVPV9} from '../api.mjs';
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
let __esmLocal16;
let __esmLocal17;
let __esmLocal18;
let __esmLocal19;
let __esmLocal20;
let __esmLocal21;
let __esmLocal22;
let __esmLocal23;
let __esmLocal24;
let __esmLocal25;
let __esmLocal26;
let __esmLocal27;
let __esmLocal28;
let __esmLocal29;
export {__esmLocal0 as local_anonymous_5_1_0};
export {__esmLocal1 as local_prop_1};
export {__esmLocal2 as local_id_2};
export {__esmLocal3 as local_types_3};
export {__esmLocal4 as local_me_4};
export {__esmLocal5 as local_component_5};
export {__esmLocal6 as local_scene_6};
export {__esmLocal7 as local_owned_7};
export {__esmLocal8 as local_pos_8};
export {__esmLocal9 as local_inTruTien_9};
export {__esmLocal10 as local_inTuLa_10};
export {__esmLocal11 as local_inStrongest_11};
export {__esmLocal12 as local_opposingStrongest_12};
export {__esmLocal13 as local_anonymous_45_13_13};
export {__esmLocal14 as local_isEnemy_14};
export {__esmLocal15 as local_selected_15};
export {__esmLocal16 as local_log_16};
export {__esmLocal17 as local_unlinkNearby_17};
export {__esmLocal18 as local_verifiedNearby_18};
export {__esmLocal19 as local_anonymous_65_39_19};
export {__esmLocal20 as local_refreshNearby_20};
export {__esmLocal21 as local_fn_21};
export {__esmLocal22 as local_unlink_22};
export {__esmLocal23 as local_blocked_23};
export {__esmLocal24 as local_enemyCast_24};
export {__esmLocal25 as local_status_25};
export {__esmLocal26 as local_sync_26};
export {__esmLocal27 as local_start_27};
export {__esmLocal28 as local_stop_28};
export {__esmLocal29 as local_hongHoang_29};
export function initialize(){
/* La Phong PVP: remote TH(1001..1008) observer + optional native sideways evade.
 * Event 1039 on remote players is unverified: not guaranteed to replicate.
 * No native cooldown change, combat hook override, packet injection or auto-start.
 */
(__captureESMFunction((__esmLocal0=(() => {
'use strict';
const W=window,KEY='KVPV_PVP_LUOFENG',actorId=String(W.__KVPV_OWN_ACTOR_ID||W._Ba?._rJ?._O$?.ins?.actorId||'');
try{W[KEY]?.stop?.();}catch(e){__getKVPV9()?.diagnostics?.record?.(e);}
const cfg=Object.freeze({event:1039,maxDistance:450,step:115,interval:120,minGap:1250,maxHistory:30,maxNearbyEnemies:4});
const S={on:false,auto:false,timer:null,target:null,targetId:'',scene:'',signals:0,threats:0,
 dodgeAttempts:0,blocked:0,lastDodge:-Infinity,side:1,lastSkill:null,lastSignal:null,
 reason:'off',error:'',history:[],nearby:new Map(),nearbyMode:false,nearbyThreats:0};
const prop=__captureESMFunction((__esmLocal1=((r,k)=>r?.property?.get?.(k))),"prop");
const id=__captureESMFunction((__esmLocal2=(r=>String(r?.id??prop(r,'id')??''))),"id");
const types=__captureESMFunction((__esmLocal3=(()=>W._d?._Yct??{})),"types");
const me=__captureESMFunction((__esmLocal4=(()=>W._C?._Ba?.instance?.getRole?.(Number(actorId))??null)),"me");
const component=__captureESMFunction((__esmLocal5=((r,k)=>{const c=types()[k];return c?r?.getComponent?.(c):null;})),"component");
const scene=__captureESMFunction((__esmLocal6=(()=>String(W._C?._Mn?._Cn?.currentID??W._Ba?._$a?._yo?.ins?.intoSce?.[0]??''))),"scene");
const hongHoang=__captureESMFunction((__esmLocal29=(()=>{
 const map=Number(scene());
 return Number(W._Ba?._$a?.SceneUtil?.curScene)===17||
  Number(W._ft?._po?.ins?.getCfgById?.(map)?.[7])===17;
})),"hongHoang");
const owned=__captureESMFunction((__esmLocal7=(()=>!!actorId&&String(W._Ba?._rJ?._O$?.ins?.actorId??'')===actorId&&!W.__KVPV_UNIVERSAL_HALTED)),"owned");
const pos=__captureESMFunction((__esmLocal8=(r=>{const p=prop(r,'position')??r?.coords??r?.position;const x=Number(p?.x),y=Number(p?.y);return p&&Number.isFinite(x)&&Number.isFinite(y)?{x,y}:null;})),"pos");
const inTruTien=__captureESMFunction((__esmLocal9=(()=>{const s=__getKVPV4()?.status?.();return s?.inside===true&&s.kind==='TRU_TIEN';})),"inTruTien");
// Native Tu La model + the existing Daily scene observer must agree. Never
// infer arena membership from map number alone.
const inTuLa=__captureESMFunction((__esmLocal10=(()=>{
 const q=__getKVPV2()?.tuLaStatus?.(false);
 const native=W._Ba?._hE?._olt?.inst;
 const sceneType=Number(W._Ba?._$a?.SceneUtil?.curScene);
 const foreign=__getKVPV4()?.status?.();
 if(foreign?.inside===true&&foreign.kind!=='TU_LA')return false;
 const job=__getKVPV2()?.quickState?.()?.job;
 return q?.dangTrongTran===true&&[58,61].includes(Number(q.canh))&&
   [58,61].includes(sceneType)&&Number(q.giaiDoan)>=1&&
   native?.funIsOpen===true&&(!job||['tula','rảnh','ranh','idle'].includes(String(job).toLowerCase()));
})),"inTuLa");
const inStrongest=__captureESMFunction((__esmLocal11=(()=>{
 const st=__getKVPV7()?.status?.();
 return st?.enabled===true&&st?.inside===true&&st?.open===true&&st?.phase==='ACTIVE';
})),"inStrongest");
// A Strongest Team opponent must be a real player, be selected by the native
// event selector, and be explicitly marked as not on our team.
const opposingStrongest=__captureESMFunction((__esmLocal12=(enemy=>{
 if(!inStrongest()||Number(prop(enemy,'type'))!==4)return false;
 const m=W._Ba?._T3?._G_t?.instance,rank=m?.getNearPlayerRank?.();
 return !!m&&String(m.selectTagetId)===id(enemy)&&Array.isArray(rank)&&
   rank.some(__captureESMFunction((__esmLocal13=(e=>e&&String(e.objId)===id(enemy)&&m.isMyTeam?.(e.color)===false)),""));
})),"opposingStrongest");
const isEnemy=__captureESMFunction((__esmLocal14=((enemy,actor)=>{if(!enemy||enemy===actor||enemy.isValid===false||!id(enemy)||id(enemy)===actorId)return false;
 const type=Number(prop(enemy,'type'));
 const pvpScene=inTruTien()||inTuLa()||inStrongest();
 // Real player roles use type 4. Strongest Team additionally checks native enemy-team membership.
 return (inStrongest()?opposingStrongest(enemy):pvpScene?type===4:[0,2].includes(type))&&
   typeof enemy.on==='function'&&typeof enemy.off==='function';})),"isEnemy");
const selected=__captureESMFunction((__esmLocal15=(()=>{const a=me(),t=component(a,'_Het')?.target;return owned()&&isEnemy(t,a)?{actor:a,enemy:t}:null;})),"selected");
function log(kind,extra={}){S.history.push({at:Date.now(),kind,...extra});if(S.history.length>cfg.maxHistory)S.history.shift();}
__esmLocal16=log;

function unlinkNearby(){
 for(const v of S.nearby.values()){
  try{v.role?.off?.(cfg.event,S,v.fn);}catch(e){S.error=String(e);}
 }
 S.nearby.clear();
}
__esmLocal17=unlinkNearby;

function verifiedNearby(role,actor){
 if(!inStrongest()||!role||role===actor||role.isValid===false||
    Number(prop(role,'type'))!==4||!id(role)||id(role)===actorId)return false;
 const m=W._Ba?._T3?._G_t?.instance;
 const list=m?.getNearPlayerRank?.();
 return Array.isArray(list)&&list.some(__captureESMFunction((__esmLocal19=(row=>row&&String(row.objId)===id(role)&&m.isMyTeam?.(row.color)===false)),""));
}
__esmLocal18=verifiedNearby;

function refreshNearby(cur){
 if(!S.nearbyMode||!cur||!inStrongest()){unlinkNearby();return;}
 const m=W._Ba?._T3?._G_t?.instance,world=W._C?._Ba?.instance;
 const rank=m?.getNearPlayerRank?.(),wanted=new Map(),a=pos(cur.actor);
 if(Array.isArray(rank)&&a){
  for(const row of rank){
   if(wanted.size>=cfg.maxNearbyEnemies)break;
   if(!row||m.isMyTeam?.(row.color)!==false)continue;
   const role=world?.getRole?.(row.objId),b=pos(role),key=id(role);
   if(!role||role===cur.enemy||!b||key!==String(row.objId)||wanted.has(key)||
      !verifiedNearby(role,cur.actor)||typeof role.on!=='function'||typeof role.off!=='function')continue;
   const distance=Math.hypot(a.x-b.x,a.y-b.y);
   if(distance>=1&&distance<=cfg.maxDistance)wanted.set(key,role);
  }
 }
 for(const [key,v] of S.nearby){
  if(wanted.get(key)===v.role)continue;
  try{v.role.off(cfg.event,S,v.fn);}catch(e){S.error=String(e);}
  S.nearby.delete(key);
 }
 for(const [key,role] of wanted){
  if(S.nearby.has(key))continue;
  const fn=__captureESMFunction((__esmLocal21=((targetId,skillId)=>enemyCast(targetId,skillId,role))),"fn");
  try{role.on(cfg.event,S,fn);S.nearby.set(key,{role,fn});}
  catch(e){S.error=String(e);}
 }
}
__esmLocal20=refreshNearby;

function unlink(){unlinkNearby();const old=S.target;S.target=null;S.targetId='';S.scene='';
 try{old?.off?.(cfg.event,S,enemyCast);}catch(e){S.error=String(e);}}
__esmLocal22=unlink;

function blocked(actor,enemy){
 if(hongHoang())return 'honghoang_combat_paused';
 if(!S.auto)return 'observe_only';
 if(!owned())return 'actor_changed';
 if(W.document?.hidden===true||W.document?.hasFocus?.()===false)return 'unfocused';
 if(Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0))return 'manual_ui';
 if(__getKVPV3()?.manual===true)return 'manual_entry_policy';
 if(__getKVPV4()?.status?.()?.inside===true&&!inTruTien()&&!inStrongest()&&!inTuLa())return 'dungeon_priority';
 if(inStrongest()&&W._Ba?._T3?._G_t?.instance?.collecting===true)return 'native_collecting';
 if(__getKVPV8()?.status?.(false)?.running===true||__getKVPV5()?.status?.(false)?.running===true)return 'boss_owner';
 const mode=__getKVPV6()?.status?.(false)?.mode;if(mode&&mode!=='OFF'&&!inStrongest()&&!inTuLa())return 'combat_mode_owner';
 if(__getKVPV1()?.priority?.()===true||__getKVPV0()?.status?.()?.roadMelee?.active===true)return 'higher_priority';
 const job=__getKVPV2()?.quickState?.()?.job;
 if(job&&!['rảnh','ranh','idle'].includes(String(job).toLowerCase())&&!inStrongest()&&!(inTuLa()&&String(job).toLowerCase()==='tula'))return 'daily_job';
 const hp=prop(actor,'hp');if(Array.isArray(hp)&&Number(hp[0])<=0)return 'dead';
 const move=component(actor,'_zet');if(!move||typeof move?.moveTo!=='function')return 'move_unavailable';
 if(move.running?.()===true||[3,4].includes(Number(move._fut)))return 'movement_busy';
 const a=pos(actor),b=pos(enemy);if(!a||!b)return 'position_unknown';
 const distance=Math.hypot(a.x-b.x,a.y-b.y);
 if(distance<1||distance>cfg.maxDistance)return 'outside_threat_band';
 if(Date.now()-S.lastDodge<cfg.minGap)return 'dodge_cooldown';
 return null;
}
__esmLocal23=blocked;

function enemyCast(targetId,skillId,source=S.target){
 if(!S.on||!S.target||!owned())return;
 const skill=Number(skillId);if(!Number.isSafeInteger(skill))return;
 S.signals++;S.lastSignal=Date.now();S.lastSkill=skill;
 if(skill<1001||skill>1008||String(targetId)!==actorId)return;
 const cur=selected();if(!cur||cur.enemy!==S.target||S.scene!==scene())return;
 const secondary=source!==S.target;
 if(secondary&&(!S.nearbyMode||!inStrongest()||
   S.nearby.get(id(source))?.role!==source||!verifiedNearby(source,cur.actor)))return;
 S.threats++;if(secondary)S.nearbyThreats++;
 const threat=secondary?source:cur.enemy,why=blocked(cur.actor,threat);
 if(why){S.blocked++;S.reason=why;log('TH_OBSERVED',{skill,reason:why});return;}
 const a=pos(cur.actor),b=pos(threat);if(!a||!b)return;
 const dx=a.x-b.x,dy=a.y-b.y,d=Math.hypot(dx,dy);
 if(!(d>=1&&d<=cfg.maxDistance)){S.blocked++;S.reason='outside_threat_band';return;}
 const side=S.side,vx=dx/d*.3-dy/d*side,vy=dy/d*.3+dx/d*side,n=Math.hypot(vx,vy);
 const x=a.x+cfg.step*vx/n,y=a.y+cfg.step*vy/n;
 try{const issued=component(cur.actor,'_zet').moveTo(x,y);
   if(issued===false){S.blocked++;S.reason='native_move_rejected';log('MOVE_REJECTED',{skill});return;}
   S.lastDodge=Date.now();S.side=-side;S.dodgeAttempts++;S.reason='native_move_issued';
   log('DODGE_ATTEMPT',{skill,source:id(threat),x,y});
 }catch(e){S.error=String(e);S.blocked++;S.reason='movement_failed';log('MOVE_ERROR',{skill});}
}
__esmLocal24=enemyCast;

function status(){const candidate=component(me(),'_Het')?.target;return {enabled:S.on,autoDodge:S.auto,attached:!!S.target,enemyId:S.targetId,
 selectedTargetId:id(candidate),selectedTargetType:prop(candidate,'type')??null,
 scene:S.scene,pausedByHongHoang:hongHoang(),scope:inTruTien()?'TRU_TIEN':inStrongest()?'STRONGEST_TEAM':inTuLa()?'TU_LA':'OTHER',
 observedSignals:S.signals,observedTH:S.threats,nearbyTH:S.nearbyThreats,
 nearbyMode:S.nearbyMode,monitoredNearby:[...S.nearby.keys()],lastDodgeAt:Number.isFinite(S.lastDodge)?S.lastDodge:null,
 nativeDodgeAttempts:S.dodgeAttempts,
 blocked:S.blocked,lastSkill:S.lastSkill,lastSignalAt:S.lastSignal,lastReason:S.reason,error:S.error,
 config:{...cfg},recent:S.history.slice(),
 note:'Remote 1039 may not fire for opponents; dodge is a bounded native lateral move, not guaranteed evasion. Tu La only observes selected native player targets in scene 58/61; no unverified nearby roster scan.'};}
__esmLocal25=status;

function sync(){
 if(!S.on)return status();
 if(!owned()){stop('actor_changed');return status();}
 if(hongHoang()){unlink();S.reason='honghoang_combat_paused';return status();}
 const cur=selected(),enemy=cur?.enemy??null,currentScene=scene(),enemyId=id(enemy);
 if(S.target===enemy&&S.scene===currentScene&&S.targetId===enemyId){refreshNearby(cur);return status();}
 unlink();if(!enemy){S.reason='select_pvp_target';return status();}
 try{enemy.on(cfg.event,S,enemyCast);S.target=enemy;S.targetId=enemyId;S.scene=currentScene;
   S.reason='listening_if_remote_event_exists';log('LISTEN',{enemyId,scene:currentScene});refreshNearby(cur);
 }catch(e){S.error=String(e);S.reason='remote_event_unavailable';}
 return status();
}
__esmLocal26=sync;

function start(opts={}){
 if(!opts||typeof opts!=='object')throw Error('Use start({autoDodge:true|false})');
 if(!owned()){S.reason='wrong_actor';return status();}
 S.on=true;S.auto=opts.autoDodge===true;S.nearbyMode=opts.nearby===true;
 if(S.timer==null)S.timer=(__getKVPV9()?.timers?.setInterval??W.setInterval)(sync,cfg.interval);
 return sync();
}
__esmLocal27=start;

function stop(reason='manual_stop'){
 S.on=false;S.auto=false;S.nearbyMode=false;
 if(S.timer!=null)(__getKVPV9()?.timers?.clearInterval??W.clearInterval)?.(S.timer);
 S.timer=null;unlink();S.reason=reason;return status();
}
__esmLocal28=stop;

W[KEY]=Object.freeze({start,stop,sync,status});
})),""))();
}
export const api=Object.freeze({
});