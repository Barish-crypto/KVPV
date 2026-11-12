import {getKVPV_EIGHT_FLOOR as __getKVPV0,getKVPV_EVENTS13 as __getKVPV1,getKVPV_EXPERIMENTAL_BOOST as __getKVPV2,getKVPV_V1 as __getKVPV3} from '../api.mjs';
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
export {__esmLocal0 as local_anonymous_1_1_0};
export {__esmLocal1 as local_isBasic_1};
export {__esmLocal2 as local_own_2};
export {__esmLocal3 as local_map_3};
export {__esmLocal4 as local_entryMap_4};
export {__esmLocal5 as local_peakInside_5};
export {__esmLocal6 as local_honorInside_6};
export {__esmLocal7 as local_territoryInside_7};
export {__esmLocal8 as local_eightInside_8};
export {__esmLocal9 as local_siegeInside_9};
export {__esmLocal10 as local_anonymous_19_118_10};
export {__esmLocal11 as local_inside_11};
export {__esmLocal12 as local_role_12};
export {__esmLocal13 as local_component_13};
export {__esmLocal14 as local_restoreHook_14};
export {__esmLocal15 as local_restoreMove_15};
export {__esmLocal16 as local_movement_16};
export {__esmLocal17 as local_attachSelector_17};
export {__esmLocal18 as local_fn_18};
export {__esmLocal19 as local_anonymous_36_55_19};
export {__esmLocal20 as local_anonymous_36_136_20};
export {__esmLocal21 as local_attachCombat_21};
export {__esmLocal22 as local_fn_22};
export {__esmLocal23 as local_approach_23};
export {__esmLocal24 as local_tick_24};
export {__esmLocal25 as local_anonymous_76_152_25};
export {__esmLocal26 as local_start_26};
export {__esmLocal27 as local_stop_27};
export {__esmLocal28 as local_status_28};
export function initialize(){
(__captureESMFunction((__esmLocal0=(() => {
 'use strict';
 const W=window,KEY='KVPV_DINH_CAO_BASIC_COMBO',old=W[KEY];
 try{old?.stop?.('reload');}catch(_){}
 const actor=String(W.__KVPV_OWN_ACTOR_ID||''),isBasic=__captureESMFunction((__esmLocal1=(id=>Number.isSafeInteger(Number(id))&&Number(id)>=8001&&Number(id)<=8005)),"isBasic");
 const C={enabled:true,pollMs:16,moveGapMs:80,castGapMs:80,moveFactor:99,stopDistance:180,maxChaseDistance:2000};
 const S={timer:null,reason:'outside_combo_scope',lastError:'',blockedNonBasic:0,filteredSelections:0,casts:0,moves:0,lastSkill:null,lastMoveAt:0,lastCastAt:0,movement:'waiting'};
 let siegeCheckAt=0,siegeReady=false;
 const H={selector:null,selectorFn:null,selectorDescriptor:null,combat:null,combatFn:null,combatDescriptor:null};
 const MOVE={obj:null,base:null,applied:null};
 const adaptive={enabled:true,minHits:2,exploreEvery:7,ttlMs:3500,maxPending:64,maxContexts:12,
  owner:{},target:null,key:'',pending:[],contexts:new Map(),matchedHits:0,ambiguousHits:0,lastError:''};
 const own=__captureESMFunction((__esmLocal2=(()=>!!actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED)),"own");
 const map=__captureESMFunction((__esmLocal3=(()=>Number(W._C?._Mn?._Cn?.currentID))),"map"),entryMap=__captureESMFunction((__esmLocal4=(()=>Number(W._Ba?._$a?._yo?.ins?.intoSce?.[0]))),"entryMap");
 const peakInside=__captureESMFunction((__esmLocal5=(()=>own()&&map()===2161&&entryMap()===2161&&Number(W._Ba?._$a?.SceneUtil?.curScene)===14&&W._Ba?._$a?.SceneUtil?.isCommonScene===false)),"peakInside");
 const honorInside=__captureESMFunction((__esmLocal6=(()=>own()&&map()===2162&&entryMap()===2162&&Number(W._Ba?._$a?.SceneUtil?.curScene)===42&&W._Ba?._$a?.SceneUtil?.isCommonScene===false)),"honorInside");
 const territoryInside=__captureESMFunction((__esmLocal7=(()=>own()&&map()===2164&&entryMap()===2164&&Number(W._Ba?._$a?.SceneUtil?.curScene)===44&&W._Ba?._$a?.SceneUtil?.isCommonScene===false)),"territoryInside");
 const eightInside=__captureESMFunction((__esmLocal8=(()=>{if(!own()||map()!==7101||entryMap()!==7101||Number(W._Ba?._$a?.SceneUtil?.curScene)!==71||W._Ba?._$a?.SceneUtil?.isCommonScene!==false)return false;
  const event=__getKVPV0()?.status?.(),lease=W.KVPV?.core?.scene?.status?.();return event?.enabled===true&&event?.phase==='FIGHTING'&&event?.inside===true&&lease?.owner==='combat'&&lease?.tag==='thien-the-8-tang';})),"eightInside");
 const siegeInside=__captureESMFunction((__esmLocal9=(()=>{const m=map();if(!own()||![3101,3102].includes(m)||entryMap()!==m||W._Ba?._$a?.SceneUtil?.isCommonScene!==false)return false;
  if(Date.now()>=siegeCheckAt){siegeCheckAt=Date.now()+500;try{const row=__getKVPV1()?.status?.(false)?.rows?.find(__captureESMFunction((__esmLocal10=(x=>x.key==='sa_thanh')),""));siegeReady=row?.ready===true&&row?.active===true&&[1,2].includes(Number(row?.phase));}catch(_){siegeReady=false;}}
  return siegeReady;})),"siegeInside");
 const inside=__captureESMFunction((__esmLocal11=(()=>peakInside()||eightInside()||siegeInside()||honorInside())),"inside");
 const role=__captureESMFunction((__esmLocal12=(()=>W._C?._Ba?.instance?.getRole?.(Number(actor))??W._C?._Ba?.instance?.getRole?.(actor))),"role");
 const component=__captureESMFunction((__esmLocal13=((r,k)=>{const t=W._d?._Yct?.[k];return t?r?.getComponent?.(t):null;})),"component");
 const prop=(o,k)=>o?.property?.get?.(k),entityId=o=>String(prop(o,'id')??o?.id??'');
 function adaptiveKey(target){return map()+'/'+Number(W._Ba?._$a?.SceneUtil?.curScene)+'/'+entityId(target);}
 function adaptiveProfile(target){
  if(!adaptive.enabled||!inside()||Number(prop(target,'type'))!==1||!entityId(target))return null;
  const key=adaptiveKey(target);let profile=adaptive.contexts.get(key);
  if(!profile)profile={key,map:map(),scene:Number(W._Ba?._$a?.SceneUtil?.curScene),targetId:entityId(target),casts:0,hits:0,explorations:0,skills:new Map()};
  adaptive.contexts.delete(key);adaptive.contexts.set(key,profile);
  while(adaptive.contexts.size>adaptive.maxContexts)adaptive.contexts.delete(adaptive.contexts.keys().next().value);
  return profile;
 }
 function adaptiveHit(source,marker,damage,flags,receiver){
  if(!adaptive.enabled||!own()||!inside()||!adaptive.target||String(source)!==actor||
   String(receiver)!==entityId(adaptive.target)||adaptive.key!==adaptiveKey(adaptive.target)||!(Number(damage)>0))return;
  const raw=Number(marker),id=raw/10000,fl=Number(flags)||0;
  if(!Number.isSafeInteger(raw)||raw%10000!==0||!isBasic(id)||(fl&(4|16|32|64|128|256)))return;
  const now=Date.now();adaptive.pending=adaptive.pending.filter(c=>now-c.at<=adaptive.ttlMs);
  const matches=[];for(let i=0;i<adaptive.pending.length;i++)if(adaptive.pending[i].key===adaptive.key&&adaptive.pending[i].id===id)matches.push(i);
  if(matches.length!==1){if(matches.length>1)adaptive.ambiguousHits++;return;}
  adaptive.pending.splice(matches[0],1);const profile=adaptive.contexts.get(adaptive.key);if(!profile)return;
  let sample=profile.skills.get(id);if(!sample){sample={id,attempts:0,hits:0,damage:0};profile.skills.set(id,sample);}
  sample.hits++;sample.damage+=Number(damage);profile.hits++;adaptive.matchedHits++;
 }
 function detachAdaptiveTarget(){
  const key=adaptive.key;if(adaptive.target){try{adaptive.target.off?.(1012,adaptive.owner,adaptiveHit);}catch(e){adaptive.lastError=String(e?.message||e);}}
  adaptive.target=null;adaptive.key='';if(key)adaptive.pending=adaptive.pending.filter(c=>c.key!==key);
 }
 function syncAdaptiveTarget(target){
  const valid=adaptive.enabled&&C.enabled&&own()&&inside()&&Number(prop(target,'type'))===1&&entityId(target)!=='';
  const key=valid?adaptiveKey(target):'';if(target===adaptive.target&&key===adaptive.key)return;
  detachAdaptiveTarget();if(!valid)return;
  if(typeof target?.on!=='function'||typeof target?.off!=='function'){adaptive.lastError='target_hit_listener_unavailable';return;}
  adaptive.target=target;adaptive.key=key;adaptiveProfile(target);
  try{target.on(1012,adaptive.owner,adaptiveHit);adaptive.lastError='';}catch(e){adaptive.lastError=String(e?.message||e);adaptive.target=null;adaptive.key='';}
 }
 function recordAdaptiveCast(id,target){
  const profile=adaptiveProfile(target);if(!profile)return;
  const now=Date.now();profile.casts++;
  let sample=profile.skills.get(id);if(!sample){sample={id,attempts:0,hits:0,damage:0};profile.skills.set(id,sample);}
  sample.attempts++;adaptive.pending=adaptive.pending.filter(c=>now-c.at<=adaptive.ttlMs);
  adaptive.pending.push({key:profile.key,id,at:now});if(adaptive.pending.length>adaptive.maxPending)adaptive.pending.shift();
 }
 function rankAdaptive(rows,fallback,target){
  const profile=adaptiveProfile(target);if(!profile)return rows.sort(fallback);
  const explore=profile.casts>0&&profile.casts%adaptive.exploreEvery===0;if(explore)profile.explorations++;
  return rows.sort((a,b)=>{
   const aid=Number(a?.[0]),bid=Number(b?.[0]),ah=profile.skills.get(aid)?.hits||0,bh=profile.skills.get(bid)?.hits||0;
   if(explore&&ah!==bh)return ah-bh;
   const as=ah>=adaptive.minHits?profile.skills.get(aid).damage/ah:null,bs=bh>=adaptive.minHits?profile.skills.get(bid).damage/bh:null;
   if(as!==null||bs!==null){if(as===null)return 1;if(bs===null)return -1;if(as!==bs)return bs-as;}
   return fallback(a,b);
  });
 }
 function adaptiveStatus(){
  const profile=adaptive.contexts.get(adaptive.key);
  adaptive.pending=adaptive.pending.filter(c=>Date.now()-c.at<=adaptive.ttlMs);
  return {enabled:adaptive.enabled,active:!!profile&&adaptive.target!==null,context:adaptive.key||null,
   contexts:adaptive.contexts.size,matchedHits:adaptive.matchedHits,ambiguousHits:adaptive.ambiguousHits,pending:adaptive.pending.length,explorationChecks:profile?.explorations??0,
   minimumMatchedHits:adaptive.minHits,exploreEvery:adaptive.exploreEvery,lastError:adaptive.lastError,
   skills:profile?[...profile.skills.values()].map(s=>({id:s.id,attempts:s.attempts,matchedHits:s.hits,matchedDamage:s.damage,meanDamage:s.hits?s.damage/s.hits:null})):[],
   note:'Only matched direct damage ranks skills; an unconfirmed cast is not treated as a miss.'};
 }
 function restoreHook(key){const obj=H[key],fn=H[key+'Fn'],descriptor=H[key+'Descriptor'],prop=key==='selector'?'_f7t':'combat';if(obj&&fn&&obj[prop]===fn){if(descriptor)Object.defineProperty(obj,prop,descriptor);else delete obj[prop];}H[key]=null;H[key+'Fn']=null;H[key+'Descriptor']=null;}
__esmLocal14=restoreHook;

 function restoreMove(){if(MOVE.obj&&MOVE.obj.speed===MOVE.applied)MOVE.obj.speed=MOVE.base;MOVE.obj=null;MOVE.base=null;MOVE.applied=null;}
__esmLocal15=restoreMove;

 function movement(self){const mover=component(self,'_zet'),boost=__getKVPV2()?.status?.();
  if(boost?.enabled===true&&Number(boost.moveFactor)>=9){restoreMove();return 'shared_fast_boost';}
  if(MOVE.obj!==mover)restoreMove();if(!mover||!Number.isFinite(Number(mover.speed))||Number(mover.speed)<=0)return 'waiting_movement_component';
  if(!MOVE.obj){MOVE.obj=mover;MOVE.base=Number(mover.speed);MOVE.applied=MOVE.base*C.moveFactor;}
  else if(mover.speed!==MOVE.applied){MOVE.base=Number(mover.speed);MOVE.applied=MOVE.base*C.moveFactor;}
  mover.speed=MOVE.applied;return 'local_fast_boost';}
__esmLocal16=movement;

 function attachSelector(selector){if(H.selector===selector&&selector?._f7t===H.selectorFn)return;restoreHook('selector');if(typeof selector?._f7t!=='function')return;
  const descriptor=Object.getOwnPropertyDescriptor(selector,'_f7t');if(descriptor&&!descriptor.configurable)return;const native=selector._f7t;
  const fn=__captureESMFunction((__esmLocal18=(function(activeRows,commonRows,mode,...rest){
   if(!C.enabled||!inside()||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)||this!==selector)return native.call(this,activeRows,commonRows,mode,...rest);
   const a=Array.isArray(activeRows)?activeRows.filter(__captureESMFunction((__esmLocal19=(row=>isBasic(row?.[0]))),"")):activeRows,b=Array.isArray(commonRows)?commonRows.filter(__captureESMFunction((__esmLocal20=(row=>isBasic(row?.[0]))),"")):commonRows;
   if(Array.isArray(activeRows)&&Array.isArray(commonRows)&&!a.length&&!b.length){S.filteredSelections++;S.reason='waiting_ready_basic';return -1;}
   const target=H.combat?.target,rankRows=rows=>{
    const order=new Map(rows.map((row,index)=>[Number(row?.[0]),index]));
    return rankAdaptive(rows,(x,y)=>(order.get(Number(x?.[0]))??0)-(order.get(Number(y?.[0]))??0),target);
   };
   const rankedA=Array.isArray(a)?rankRows(a):a,rankedB=Array.isArray(b)?rankRows(b):b;
   const selected=native.call(this,rankedA,rankedB,mode,...rest);if(isBasic(selected)){S.lastSkill=Number(selected);S.filteredSelections++;return selected;}S.blockedNonBasic++;return -1;
  })),"fn");
  Object.defineProperty(selector,'_f7t',{value:fn,writable:true,configurable:true,enumerable:!!descriptor?.enumerable});H.selector=selector;H.selectorFn=fn;H.selectorDescriptor=descriptor;}
__esmLocal17=attachSelector;

 function attachCombat(combat){if(H.combat===combat&&combat?.combat===H.combatFn)return;restoreHook('combat');if(typeof combat?.combat!=='function')return;
  const descriptor=Object.getOwnPropertyDescriptor(combat,'combat');if(descriptor&&!descriptor.configurable)return;const native=combat.combat;
  const fn=__captureESMFunction((__esmLocal22=(function(skill,...args){
   if(C.enabled&&inside()&&Date.now()>=Number(W.__KVPV_USER_UI_UNTIL||0)&&this===combat&&!isBasic(skill)){S.blockedNonBasic++;S.reason='blocked_non_basic_skill';return false;}
   const result=native.call(this,skill,...args);
   if(this===combat&&C.enabled&&inside()&&Date.now()>=Number(W.__KVPV_USER_UI_UNTIL||0)&&Number(prop(this.target,'type'))===1&&isBasic(skill))recordAdaptiveCast(Number(skill),this.target);
   return result;
  })),"fn");
  Object.defineProperty(combat,'combat',{value:fn,writable:true,configurable:true,enumerable:!!descriptor?.enumerable});H.combat=combat;H.combatFn=fn;H.combatDescriptor=descriptor;}
__esmLocal21=attachCombat;

 function approach(self,combat,target){if(!target||target.isValid===false||combat?.isValidTarget?.()!==true||combat?.isValidRange?.()===true)return;
  const p=self?.property?.get?.('position'),q=target?.property?.get?.('position'),mover=component(self,'_zet');
  if(!p||!q||![p.x,p.y,q.x,q.y].every(Number.isFinite)||typeof mover?.moveTo!=='function'||Date.now()-S.lastMoveAt<C.moveGapMs)return;
  const dx=q.x-p.x,dy=q.y-p.y,d=Math.hypot(dx,dy);if(d<=C.stopDistance||d>C.maxChaseDistance)return;
  const travel=d-C.stopDistance;mover.moveTo(Math.round(p.x+dx/d*travel),Math.round(p.y+dy/d*travel));S.lastMoveAt=Date.now();S.moves++;S.reason='moving_toward_native_target';}
__esmLocal23=approach;

 function tick(){try{
  const territory=territoryInside();
  if(!C.enabled||(!inside()&&!territory)||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)){detachAdaptiveTarget();restoreHook('selector');restoreHook('combat');restoreMove();if(C.enabled)S.reason=inside()||territory?'user_interaction':'outside_combo_scope';return;}
  const self=role();if(!self){restoreMove();S.reason='waiting_player_component';return;}const combat=component(self,'_Het'),selector=component(self,'_Eet'),target=combat?.target;
  if(territory){
   restoreHook('selector');restoreHook('combat');
   if(W._Ba?._rJ?._O$?.ins?.isDead===true){restoreMove();S.movement='waiting';S.reason='dead';return;}
   if(!target||target.isValid===false||Number(target?.property?.get?.('type'))!==1){restoreMove();S.movement='waiting_boss_target';S.reason='waiting_native_boss_target';return;}
   if(combat?.isValidTarget?.()!==true){restoreMove();S.movement='waiting_boss_target';S.reason='native_boss_target_invalid';return;}
   const inRange=combat?.isValidRange?.();
   if(inRange===true){restoreMove();S.movement='native_range';S.reason='boss_in_native_range';return;}
   if(inRange!==false){restoreMove();S.movement='waiting_native_range';S.reason='waiting_native_boss_range';return;}
   if(W.KVPV?.core?.scene?.combat?.claim?.('86-dinh-cao-basic-combo',90)!==true){restoreMove();S.reason='combat_dispatch_wait';return;}
   S.reason='moving_to_native_boss';
   S.movement=movement(self);approach(self,combat,target);
   if(S.reason!=='moving_toward_native_target'&&S.movement==='waiting_movement_component')S.reason='waiting_movement_component';
   return;
  }
  if(W._Ba?._rJ?._O$?.ins?.isDead===true){S.reason='dead';return;}
  const targetType=Number(target?.property?.get?.('type'));
  if(!target||target.isValid===false||!(eightInside()?targetType===1:siegeInside()||honorInside()?targetType===4:[1,4].includes(targetType))){syncAdaptiveTarget(null);S.reason='waiting_native_valid_target';return;}
  if(W.KVPV?.core?.scene?.combat?.claim?.('86-dinh-cao-basic-combo',90)!==true){detachAdaptiveTarget();restoreHook('selector');restoreHook('combat');restoreMove();S.reason='combat_dispatch_wait';return;}
  attachSelector(selector);attachCombat(combat);S.movement=movement(self);
  syncAdaptiveTarget(targetType===1?target:null);
  if(!honorInside())approach(self,combat,target);
  if(Date.now()-S.lastCastAt<C.castGapMs){S.reason='local_cast_pacing';return;}
  if(combat?.isCooldown?.()!==false){S.reason='native_cooldown';return;}
  if(combat?.isValidTarget?.()!==true){S.reason='native_target_invalid';return;}
  if(combat?.isValidRange?.()!==true){if(S.reason!=='moving_toward_native_target')S.reason='waiting_native_basic_range';return;}
  const now=Date.now(),rows=[...(Array.isArray(selector?._rtt)?selector._rtt:[]),...(Array.isArray(selector?._wet)?selector._wet:[])],ready=rows.filter(__captureESMFunction((__esmLocal25=(row=>isBasic(row?.[0])&&Number(row?.[1])<now)),""));
  if(!ready.length||typeof selector?._f7t!=='function'||typeof combat?.combat!=='function'){S.reason='waiting_ready_basic';return;}
  const skill=Number(selector._f7t(ready,[],1));if(!isBasic(skill)||combat.target!==target||!inside()||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)){S.reason='basic_selector_rejected';return;}
  combat.combat(skill);S.casts++;S.lastSkill=skill;S.lastCastAt=Date.now();S.reason='cast_basic_'+skill;
  }catch(e){S.lastError=String(e?.message??e);S.reason='error';}}
__esmLocal24=tick;

 function start(){if(!own()){S.reason='waiting_actor';return status();}C.enabled=true;if(S.timer===null)S.timer=(__getKVPV3()?.timers?.setInterval??W.setInterval)(tick,C.pollMs);tick();return status();}
__esmLocal26=start;

 function setAdaptiveRanking(enabled=true){adaptive.enabled=!!enabled;if(!adaptive.enabled)detachAdaptiveTarget();else syncAdaptiveTarget(component(role(),'_Het')?.target);return adaptiveStatus();}
 function stop(reason='manual'){C.enabled=false;detachAdaptiveTarget();if(S.timer!==null)(__getKVPV3()?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;restoreHook('selector');restoreHook('combat');restoreMove();S.reason=reason;return status();}
__esmLocal27=stop;

 function status(){const self=role(),combat=component(self,'_Het'),target=combat?.target;return {enabled:C.enabled,inside:inside()||territoryInside(),scope:territoryInside()?'LANH_DIA':honorInside()?'VINH_DU':siegeInside()?'SA_THANH':eightInside()?'THIEN_THE_8_TANG':peakInside()?'TRANH_BA_DINH_CAO':'OTHER',movementOnly:territoryInside(),map:map(),scene:Number(W._Ba?._$a?.SceneUtil?.curScene),skills:[8001,8002,8003,8004,8005],tuyetHoc:false,normalOnlyHook:!!H.combat&&H.combat.combat===H.combatFn,filteredSelections:S.filteredSelections,blockedNonBasic:S.blockedNonBasic,casts:S.casts,lastSkill:S.lastSkill,adaptiveCombo:adaptiveStatus(),moves:S.moves,moveFactor:C.moveFactor,stopDistance:C.stopDistance,maxChaseDistance:C.maxChaseDistance,castGapMs:C.castGapMs,movement:S.movement,targetType:target?.property?.get?.('type')??null,targetId:String(target?.id??''),nativeCooldownPreserved:true,nativeRangePreserved:true,reason:S.reason,lastError:S.lastError};}
__esmLocal28=status;

 W[KEY]=Object.freeze({start,stop,sync:tick,status,setAdaptiveRanking});
})),""))();

}
export const api=Object.freeze({
});