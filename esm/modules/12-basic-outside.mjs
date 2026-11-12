import {getKVPV_ACCOUNT_POLICY as __getKVPV0,getKVPV_BASIC10 as __getKVPV1,getKVPV_BEAST_ISLAND as __getKVPV2,getKVPV_BOSS_TEAM as __getKVPV3,getKVPV_DAILY as __getKVPV4,getKVPV_EIGHT_CHEST as __getKVPV5,getKVPV_EVENT_PRIORITY as __getKVPV6,getKVPV_FAR_SCOPE as __getKVPV7,getKVPV_PEAK_CHEST as __getKVPV8,getKVPV_ROAD_CADENCE as __getKVPV9,getKVPV_TERRITORY_LOOT as __getKVPV10,getKVPV_TH300 as __getKVPV11,getKVPV_TQ_SCOPE as __getKVPV12,getKVPV_TRANSFORM10 as __getKVPV13,getKVPV_V1 as __getKVPV14} from '../api.mjs';
import {call_KVPV_TRANSFORM10_select as __callKVPV0} from "./13-transform-skills.mjs";
export function estimateRecentDamage(recent,lifetimeMean){
  const fallback=Number.isFinite(lifetimeMean)?lifetimeMean:null;
  const values=Array.isArray(recent)?recent.slice(-12).map(Number).filter(value=>Number.isFinite(value)&&value>0):[];
  if(!values.length)return fallback;
  const alpha=2/13;
  let estimate=values[0];
  for(let i=1;i<values.length;i++)estimate+=alpha*(values[i]-estimate);
  return estimate;
}
export function call_KVPV_BASIC10_start(...args){const target=globalThis["KVPV_BASIC10"];const fn=globalThis["KVPV_BASIC10"]?.["start"];if(typeof fn!=='function')throw Error("KVPV_BASIC10.start is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_BASIC10_stop(...args){const target=globalThis["KVPV_BASIC10"];const fn=globalThis["KVPV_BASIC10"]?.["stop"];if(typeof fn!=='function')throw Error("KVPV_BASIC10.stop is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_BASIC10_status(...args){const target=globalThis["KVPV_BASIC10"];const fn=globalThis["KVPV_BASIC10"]?.["status"];if(typeof fn!=='function')throw Error("KVPV_BASIC10.status is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_BASIC10_release(...args){const target=globalThis["KVPV_BASIC10"];const fn=globalThis["KVPV_BASIC10"]?.["release"];if(typeof fn!=='function')throw Error("KVPV_BASIC10.release is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_BASIC10_sync(...args){const target=globalThis["KVPV_BASIC10"];const fn=globalThis["KVPV_BASIC10"]?.["sync"];if(typeof fn!=='function')throw Error("KVPV_BASIC10.sync is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_BASIC10_setSkillPriority(...args){const target=globalThis["KVPV_BASIC10"];const fn=globalThis["KVPV_BASIC10"]?.["setSkillPriority"];if(typeof fn!=='function')throw Error("KVPV_BASIC10.setSkillPriority is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_BASIC10_isForceActive(...args){const target=globalThis["KVPV_BASIC10"];const fn=globalThis["KVPV_BASIC10"]?.["isForceActive"];if(typeof fn!=='function')throw Error("KVPV_BASIC10.isForceActive is not available");return Reflect.apply(fn,target,args);}
function __captureESMFunction(fn,name){
  if(fn.name!==name)Object.defineProperty(fn,"name",{value:name,configurable:true});
  return fn;
}
function __captureESMMethod(receiver,key,kind){
  let owner=receiver;
  while(owner!==null&&(typeof owner==="object"||typeof owner==="function")&&!Object.prototype.hasOwnProperty.call(owner,key))owner=Object.getPrototypeOf(owner);
  if(owner===null)return undefined;
  const descriptor=Object.getOwnPropertyDescriptor(owner,key);
  return kind==="get"?descriptor.get:kind==="set"?descriptor.set:descriptor.value;
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
let __esmLocal30;
let __esmLocal31;
let __esmLocal32;
let __esmLocal33;
let __esmLocal34;
let __esmLocal35;
let __esmLocal36;
let __esmLocal37;
let __esmLocal38;
let __esmLocal39;
let __esmLocal40;
let __esmLocal41;
let __esmLocal42;
let __esmLocal43;
let __esmLocal44;
let __esmLocal45;
let __esmLocal46;
let __esmLocal47;
let __esmLocal48;
let __esmLocal49;
let __esmLocal50;
let __esmLocal51;
let __esmLocal52;
let __esmLocal53;
let __esmLocal54;
let __esmLocal55;
let __esmLocal56;
let __esmLocal57;
let __esmLocal58;
let __esmLocal59;
let __esmLocal60;
let __esmLocal61;
let __esmLocal62;
let __esmLocal63;
let __esmLocal64;
let __esmLocal65;
let __esmLocal66;
let __esmLocal67;
let __esmLocal68;
let __esmLocal69;
let __esmLocal70;
let __esmLocal71;
export {__esmLocal0 as local_anonymous_4_1_0};
export {__esmLocal1 as local_pveBasic_1};
export {__esmLocal2 as local_basic_2};
export {__esmLocal3 as local_tuyetHoc_3};
export {__esmLocal4 as local_allowed_4};
export {__esmLocal5 as local_outside_5};
export {__esmLocal6 as local_sceneType_6};
export {__esmLocal7 as local_normalMapClear_7};
export {__esmLocal8 as local_beastScene_8};
export {__esmLocal9 as local_beastReady_9};
export {__esmLocal10 as local_road_10};
export {__esmLocal11 as local_roadForce_11};
export {__esmLocal12 as local_castGap_12};
export {__esmLocal13 as local_pollInterval_13};
export {__esmLocal14 as local_roadWait_14};
export {__esmLocal15 as local_roadAnimationSpeed_15};
export {__esmLocal16 as local_restoreRoadSpeed_16};
export {__esmLocal17 as local_roadAnimationCall_17};
export {__esmLocal18 as local_wrapped_18};
export {__esmLocal19 as local_releaseRoadCast_19};
export {__esmLocal20 as local_syncRoadCast_20};
export {__esmLocal21 as local_fn_21};
export {__esmLocal22 as local_releaseRoadSelector_22};
export {__esmLocal23 as local_syncRoadSelector_23};
export {__esmLocal24 as local_fn_24};
export {__esmLocal25 as local_anonymous_73_71_25};
export {__esmLocal26 as local_anonymous_73_117_26};
export {__esmLocal27 as local_position_27};
export {__esmLocal28 as local_roadDistance_28};
export {__esmLocal29 as local_roadClose_29};
export {__esmLocal30 as local_approachRoad_30};
export {__esmLocal31 as local_approachNormalMap_31};
export {__esmLocal32 as local_owner_32};
export {__esmLocal33 as local_liveScene_33};
export {__esmLocal34 as local_forceReady_34};
export {__esmLocal35 as local_restoreForcedTween_35};
export {__esmLocal36 as local_parentDescriptor_36};
export {__esmLocal37 as local_syncForcedTween_37};
export {__esmLocal38 as local_readNative_38};
export {__esmLocal39 as local_writeNative_39};
export {__esmLocal40 as local_get_40};
export {__esmLocal41 as local_set_41};
export {__esmLocal42 as local_get_value_42};
export {__esmLocal43 as local_get_wrote_43};
export {__esmLocal44 as local_syncForceContext_44};
export {__esmLocal45 as local_release_45};
export {__esmLocal46 as local_hook_46};
export {__esmLocal47 as local_bind_47};
export {__esmLocal48 as local_anonymous_218_39_48};
export {__esmLocal49 as local_anonymous_226_31_49};
export {__esmLocal50 as local_anonymous_226_39_50};
export {__esmLocal51 as local_anonymous_235_27_51};
export {__esmLocal52 as local_anonymous_235_35_52};
export {__esmLocal53 as local_pickBasic_53};
export {__esmLocal54 as local_anonymous_258_32_54};
export {__esmLocal55 as local_anonymous_258_156_55};
export {__esmLocal56 as local_anonymous_264_20_56};
export {__esmLocal57 as local_anonymous_266_18_57};
export {__esmLocal58 as local_pickTH_58};
export {__esmLocal59 as local_anonymous_276_32_59};
export {__esmLocal60 as local_anonymous_278_18_60};
export {__esmLocal61 as local_anonymous_291_27_61};
export {__esmLocal62 as local_anonymous_291_35_62};
export {__esmLocal63 as local_tick_63};
export {__esmLocal64 as local_status_64};
export {__esmLocal65 as local_stop_65};
export {__esmLocal66 as local_schedule_66};
export {__esmLocal67 as local_start_67};
export {__esmLocal68 as local_setSkillPriority_68};
export {__esmLocal69 as local_isForceActive_69};
export function initialize(){

/* Outside far-map combo: 4ms active poll, 16ms idle, Road-native cadence preserved. */

(__captureESMFunction((__esmLocal0=(() => {

  'use strict';

  const W=window;__getKVPV1()?.stop?.();
  let skillPriority='basic_force_default';
  let forcedTween=null;
  const pveBasic=__captureESMFunction((__esmLocal1=(id=>Number.isInteger(Number(id))&&Number(id)>=8001&&Number(id)<=8005)),"pveBasic");

  const actor=String(W.__KVPV_OWN_ACTOR_ID||'');

  const S={enabled:true,timer:null,timerMs:16,rapidPoll:false,hooks:[],role:null,lastCast:-Infinity,attempts:0,blocked:0,reason:'starting',lastError:'',prefer:'basic',cursor:0,basicCursor:0,basicReady:new Map(),targetSearches:0,normalMapSearches:0,lastNormalMapSearch:-Infinity,lastNormalApproach:-Infinity,normalMapMoves:0,basicAttempts:0,tuyetHocAttempts:0,forceActive:false,forceCombat:null,forceTarget:null,forceScene:null,forceCooldownReads:0,forceAnimationReads:0,forceAnimationPatched:0,hongHoangStage:null};

  const basic=__captureESMFunction((__esmLocal2=(id=>Number.isSafeInteger(Number(id))&&Number(id)>=8001&&Number(id)<=8009)),"basic");

  const tuyetHoc=__captureESMFunction((__esmLocal3=(id=>Number.isSafeInteger(Number(id))&&Number(id)>=1001&&Number(id)<=1008)),"tuyetHoc");

  const allowed=__captureESMFunction((__esmLocal4=(id=>basic(id)||tuyetHoc(id)||__getKVPV13()?.has?.(id))),"allowed");

  const outside=__captureESMFunction((__esmLocal5=(()=>(__getKVPV7()??__getKVPV12())?.inside?.()===false)),"outside");

  const sceneType=__captureESMFunction((__esmLocal6=(()=>Number(W._ft?._po?.ins?.getCfgById?.(Number(W._C?._Mn?._Cn?.currentID))?.[7]))),"sceneType");
  const normalMapClear=__captureESMFunction((__esmLocal7=(()=>{
    const map=Number(W._C?._Mn?._Cn?.currentID),daily=__getKVPV4()?.quickState?.();
    return W._Ba?._$a?.SceneUtil?.isCommonScene===true&&Number.isSafeInteger(map)&&map>0&&
      Number(W._Ba?._$a?._yo?.ins?.intoSce?.[0])===map&&W._Ba?._$a?._yo?.ins?.isInMission!==true&&
      !__getKVPV6()?.hold?.()&&__getKVPV3()?.priority?.()!==true&&
      (daily?.running!==true||['rảnh','ranh'].includes(String(daily?.job??'').toLowerCase()));
  })),"normalMapClear");
  const beastScene=__captureESMFunction((__esmLocal8=(()=>sceneType()===49)),"beastScene");
  const beastReady=__captureESMFunction((__esmLocal9=(c=>!beastScene()||__getKVPV2()?.basicCombatReady?.(c?.target)===true)),"beastReady");
  const road=__captureESMFunction((__esmLocal10=(()=>sceneType()===41&&W._Ba?._cm?._q3t?.ins?.getHasTeamByType?.(1)===true)),"road");

  const roadForce=__captureESMFunction((__esmLocal11=(()=>road()&&skillPriority==='basic_force_default'&&__getKVPV9()?.enabled===true&&__getKVPV9()?.combatMode!=='basic8001')),"roadForce");
  const castGap=__captureESMFunction((__esmLocal12=(()=>skillPriority==='basic_force_default'?1:200)),"castGap");
  // Poll faster only for an actionable target, never multiply native cast calls.
  const pollInterval=__captureESMFunction((__esmLocal13=(()=>road()&&!roadForce()?100:S.rapidPoll?(skillPriority==='basic_force_default'?1:4):Math.max(16,Number(__getKVPV0()?.pollingGap?.()??0)||0))),"pollInterval");

  let roadSelector=null;

  let roadCast=null,lastRoadCast=-Infinity;

  const roadWait=__captureESMFunction((__esmLocal14=(()=>{const n=__getKVPV9()?.minCastIntervalMs;return Number.isSafeInteger(n)&&n>=0&&n<=5000?n:0;})),"roadWait");

  const roadSpeedClips=new Map();
  const roadAnimationSpeed=__captureESMFunction((__esmLocal15=(()=>Number(__getKVPV11()?.status?.(false)?.basicAnimationSpeed??1))),"roadAnimationSpeed");
  function restoreRoadSpeed(){for(const [clip,state] of roadSpeedClips)try{if(clip._nt===state.applied)clip.timeScale=state.before;}catch(e){S.lastError=String(e);}roadSpeedClips.clear();}
__esmLocal16=restoreRoadSpeed;

  function roadAnimationCall(native,self,args){const factor=roadAnimationSpeed(),avatar=self?._Qrt,me=W._C?._Ba?.instance?.getRole?.(Number(actor));if(factor<=1||Number(args[0])!==8001||!road()||!owner()||__getKVPV9()?.enabled===false||(__getKVPV9()?.combatMode!=='basic8001'&&!__getKVPV9()?.fast1ms)||self.owner!==me||typeof avatar?.getActionTween!=='function')return native.apply(self,args);const original=avatar.getActionTween,action=String(self._mvt?.(8001)?.[5]||'attack');const wrapped=__captureESMFunction((__esmLocal18=(function(...a){if(a[0]!==action)return original.apply(this,a);const before=Number(a[2]??1);if(!Number.isFinite(before)||before<=0)return original.apply(this,a);a[2]=Math.min(factor,before*factor);const tween=original.apply(this,a),clip=this.getCurAction;if(clip&&typeof clip==='object'&&roadSpeedClips.size<32)roadSpeedClips.set(clip,{before,applied:a[2]});return tween;})),"wrapped");avatar.getActionTween=wrapped;try{return native.apply(self,args);}finally{if(avatar.getActionTween===wrapped)avatar.getActionTween=original;}}
__esmLocal17=roadAnimationCall;

  function releaseRoadCast(){restoreRoadSpeed();if(!roadCast)return;const h=roadCast;if(h.obj.combat===h.fn){if(h.descriptor)Object.defineProperty(h.obj,'combat',h.descriptor);else delete h.obj.combat;}roadCast=null;lastRoadCast=-Infinity;}
__esmLocal19=releaseRoadCast;


  function syncRoadCast(combat){if(roadAnimationSpeed()<=1)restoreRoadSpeed();if(!roadWait()&&roadAnimationSpeed()<=1){releaseRoadCast();return;}if(roadCast?.obj===combat)return;releaseRoadCast();const descriptor=Object.getOwnPropertyDescriptor(combat,'combat'),native=combat.combat;if(descriptor?.configurable===false)return;const fn=__captureESMFunction((__esmLocal21=(function(...args){if(road()&&owner()&&__getKVPV9()?.enabled!==false&&roadWait()>0){const now=Date.now();if(now-lastRoadCast<roadWait())return;lastRoadCast=now;}return roadAnimationCall(native,this,args);})),"fn");Object.defineProperty(combat,'combat',{value:fn,writable:true,configurable:true});roadCast={obj:combat,fn,descriptor};}
__esmLocal20=syncRoadCast;


  function releaseRoadSelector(){if(!roadSelector)return;const h=roadSelector;if(h.obj._f7t===h.fn){if(h.descriptor)Object.defineProperty(h.obj,'_f7t',h.descriptor);else delete h.obj._f7t;}roadSelector=null;}
__esmLocal22=releaseRoadSelector;


  function syncRoadSelector(selector){

    if(__getKVPV9()?.fast1ms||__getKVPV9()?.combatMode!=='basic8001'&&!roadWait()){releaseRoadSelector();return;}

    if(roadSelector?.obj===selector)return;

    releaseRoadSelector();const descriptor=Object.getOwnPropertyDescriptor(selector,'_f7t'),native=selector._f7t;

    if(descriptor?.configurable===false)return;

    const fn=__captureESMFunction((__esmLocal24=(function(active,common,mode,...rest){if(!road()||!owner()||__getKVPV9()?.enabled===false)return native.call(this,active,common,mode,...rest);if(roadWait()>0&&Date.now()-lastRoadCast<roadWait())return -1;if(__getKVPV9()?.combatMode!=='basic8001'){
      const plan=__getKVPV9()?.planNativeSelection?.(active,common,mode);
      if(plan?.rows?.length){const picked=Number(native.call(this,plan.rows,[],mode,...rest));
        if(Number.isSafeInteger(picked)&&picked>0)return picked;}
      return native.call(this,active,common,mode,...rest);
    }if(mode!==1)return -1;return native.call(this,(active??[]).filter(__captureESMFunction((__esmLocal25=(r=>Number(r?.[0])===8001)),"")),(common??[]).filter(__captureESMFunction((__esmLocal26=(r=>Number(r?.[0])===8001)),"")),mode,...rest);})),"fn");

    Object.defineProperty(selector,'_f7t',{value:fn,writable:true,configurable:true});roadSelector={obj:selector,fn,descriptor};

  }
__esmLocal23=syncRoadSelector;


  const position=__captureESMFunction((__esmLocal27=(o=>o?.property?.get?.('position'))),"position");

  function roadDistance(role,combat){const a=position(role),b=position(combat?.target);return a&&b&&[a.x,a.y,b.x,b.y].every(Number.isFinite)?Math.hypot(a.x-b.x,a.y-b.y):null;}
__esmLocal28=roadDistance;


  function roadClose(role,combat){const d=roadDistance(role,combat);return d!==null&&d<=(__getKVPV9()?.approachDistance??80);}
__esmLocal29=roadClose;


  function approachRoad(role,combat){if(!road())return false;

    if(roadClose(role,combat))return false;

    S.reason='road_closing_to_melee';const p=position(combat.target),m=role.getComponent?.(W._d?._Yct?._zet);

    if(__getKVPV3()?.priority?.()||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)||(!roadForce()&&combat.isCooldown?.()!==false)||[3,4].includes(m?._fut))return true;

    if(!p||![p.x,p.y].every(Number.isFinite)||typeof m?.moveTo!=='function')return true;

    if(m?.running?.()===true)return true;
    if(Date.now()-(S.lastApproach??-Infinity)>=1000){S.lastApproach=Date.now();m.moveTo(p.x,p.y);}

    return true;

  }
__esmLocal30=approachRoad;


  function approachNormalMap(role,combat){
    if(!normalMapClear()||combat?.isValidTarget?.()!==true||combat?.isValidRange?.()!==false||
       Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)||W._Ba?._rJ?._O$?.ins?.isDead===true)return false;
    const p=position(combat.target),m=role?.getComponent?.(W._d?._Yct?._zet);
    if(!p||![p.x,p.y].every(Number.isFinite)||typeof m?.moveTo!=='function')return false;
    if(m.running?.()===true){S.reason='normal_map_approaching';return true;}
    if(Date.now()-S.lastNormalApproach>=800){
      S.lastNormalApproach=Date.now();m.moveTo(p.x,p.y);S.normalMapMoves++;
    }
    S.reason='normal_map_approaching';return true;
  }
__esmLocal31=approachNormalMap;


  const owner=__captureESMFunction((__esmLocal32=(()=>actor&&String(W._Ba?._rJ?._O$?.ins?.actorId??'')===actor&&!W.__KVPV_UNIVERSAL_HALTED)),"owner");
  const liveScene=__captureESMFunction((__esmLocal33=(()=>String(W._Ba?._$a?._yo?.ins?.intoSce?.[0]??''))),"liveScene");
  const prop=__captureESMFunction((__esmLocal70=((o,k)=>o?.property?.get?.(k))),"prop");
  const entityId=__captureESMFunction((__esmLocal71=(o=>String(prop(o,'id')??o?.id??''))),"entityId");
  const adaptive={enabled:true,minHits:2,exploreEvery:7,ttlMs:3500,maxPending:64,maxContexts:16,maxSkillsPerContext:32,
    storageKey:'KVPV_ADAPTIVE_COMBO_V1:'+encodeURIComponent(actor),storageLoaded:false,storageStatus:'not_loaded',
    storageError:'',persistTimer:null,owner:{},target:null,key:'',pending:[],contexts:new Map(),matchedHits:0,ambiguousHits:0,lastError:''};
  function adaptiveKey(target){return liveScene()+'/'+sceneType()+'/'+entityId(target);}
  function adaptiveStorageError(status,error){
    adaptive.storageStatus=status;adaptive.storageError=String(error?.message??error??status).slice(0,200);
    console.warn('[KVPV BASIC10] adaptive profile storage '+status+': '+adaptive.storageError);
  }
  function validAdaptiveProfile(value){
    if(!value||typeof value!=='object'||Array.isArray(value)||value.version!==1||value.actor!==actor||
      !Array.isArray(value.contexts)||value.contexts.length>adaptive.maxContexts)return false;
    return value.contexts.every(c=>{
      if(!c||typeof c!=='object'||Array.isArray(c)||typeof c.map!=='string'||
        !Number.isSafeInteger(Number(c.map))||Number(c.map)<=0||!Number.isSafeInteger(c.sceneType)||
        typeof c.targetId!=='string'||!c.targetId||c.targetId.length>80||
        c.key!==c.map+'/'+c.sceneType+'/'+c.targetId||
        !Number.isSafeInteger(c.casts)||c.casts<0||!Number.isSafeInteger(c.hits)||c.hits<0||c.hits>c.casts||
        !Number.isSafeInteger(c.explorations)||c.explorations<0||
        !Array.isArray(c.skills)||c.skills.length>adaptive.maxSkillsPerContext)return false;
      const seen=new Set();
      return c.skills.every(s=>{
        const id=Number(s?.id);
        if(!Number.isSafeInteger(id)||!(basic(id)||tuyetHoc(id))||seen.has(id)||
          !Number.isSafeInteger(s.attempts)||s.attempts<0||!Number.isSafeInteger(s.hits)||s.hits<0||
          s.hits>s.attempts||!Number.isFinite(s.damage)||s.damage<0)return false;
        seen.add(id);return true;
      });
    });
  }
  function loadAdaptiveProfiles(){
    if(adaptive.storageLoaded)return;
    adaptive.storageLoaded=true;
    if(!actor){adaptiveStorageError('unavailable','actor identity is unavailable');return;}
    try{
      const storage=W.localStorage;
      if(typeof storage?.getItem!=='function')throw Error('localStorage.getItem is not available');
      const raw=storage.getItem(adaptive.storageKey);
      if(raw===null){adaptive.storageStatus='ready';return;}
      if(typeof raw!=='string'||raw.length>262144)throw Error('stored profile exceeds its size limit');
      const parsed=JSON.parse(raw);
      if(!validAdaptiveProfile(parsed)){adaptiveStorageError('corrupt','stored profile failed validation');return;}
      for(const row of parsed.contexts){
        adaptive.contexts.set(row.key,{...row,explorations:row.explorations,skills:new Map(row.skills.map(s=>[s.id,{...s,recent:[]}]))});
      }
      adaptive.storageStatus='ready';adaptive.storageError='';
    }catch(error){adaptiveStorageError('error',error);}
  }
  function persistAdaptiveProfiles(){
    loadAdaptiveProfiles();
    if(adaptive.storageStatus!=='ready')return false;
    try{
      const contexts=[...adaptive.contexts.values()].map(profile=>({...profile,
        skills:[...profile.skills.values()].slice(0,adaptive.maxSkillsPerContext).map(({id,attempts,hits,damage})=>({id,attempts,hits,damage}))
      }));
      const raw=JSON.stringify({version:1,actor,contexts});
      if(raw.length>262144)throw Error('adaptive profile exceeds its size limit');
      const storage=W.localStorage;
      if(typeof storage?.setItem!=='function')throw Error('localStorage.setItem is not available');
      storage.setItem(adaptive.storageKey,raw);adaptive.storageError='';return true;
    }catch(error){adaptiveStorageError('error',error);return false;}
  }
  function scheduleAdaptivePersistence(){
    loadAdaptiveProfiles();
    if(adaptive.storageStatus!=='ready'||adaptive.persistTimer!==null)return;
    if(typeof W.setTimeout!=='function'){persistAdaptiveProfiles();return;}
    adaptive.persistTimer=W.setTimeout(()=>{adaptive.persistTimer=null;persistAdaptiveProfiles();},1500);
  }
  function flushAdaptivePersistence(){
    if(adaptive.persistTimer!==null){W.clearTimeout?.(adaptive.persistTimer);adaptive.persistTimer=null;}
    return persistAdaptiveProfiles();
  }
  function clearAdaptiveProfile(){
    try{
      if(!actor)throw Error('actor identity is unavailable');
      W.clearTimeout?.(adaptive.persistTimer);adaptive.persistTimer=null;
      const storage=W.localStorage;
      if(typeof storage?.removeItem!=='function')throw Error('localStorage.removeItem is not available');
      storage.removeItem(adaptive.storageKey);adaptive.contexts.clear();adaptive.pending=[];
      adaptive.matchedHits=0;adaptive.ambiguousHits=0;adaptive.storageLoaded=true;
      adaptive.storageStatus='ready';adaptive.storageError='';
      return {ok:true,status:adaptive.storageStatus};
    }catch(error){adaptiveStorageError('error',error);return {ok:false,status:adaptive.storageStatus,error:adaptive.storageError};}
  }
  function adaptiveProfile(target){
    if(!target||!adaptive.enabled||road()||!outside()||Number(prop(target,'type'))!==1)return null;
    loadAdaptiveProfiles();
    const map=liveScene(),type=sceneType(),targetId=entityId(target);
    if(!Number.isSafeInteger(Number(map))||Number(map)<=0||!Number.isSafeInteger(type)||!targetId||targetId.length>80)return null;
    const key=adaptiveKey(target);
    let profile=adaptive.contexts.get(key);
    if(!profile){profile={key,map:liveScene(),sceneType:sceneType(),targetId,casts:0,hits:0,explorations:0,skills:new Map()};}
    adaptive.contexts.delete(key);adaptive.contexts.set(key,profile);
    while(adaptive.contexts.size>adaptive.maxContexts)adaptive.contexts.delete(adaptive.contexts.keys().next().value);
    return profile;
  }
  function detachAdaptiveTarget(){
    const oldKey=adaptive.key;
    if(adaptive.target){try{adaptive.target.off?.(1012,adaptive.owner,adaptiveHit);}catch(e){adaptive.lastError=String(e?.message||e);}}
    adaptive.target=null;adaptive.key='';
    if(oldKey)adaptive.pending=adaptive.pending.filter(c=>c.key!==oldKey);
  }
  function syncAdaptiveTarget(target){
    const valid=adaptive.enabled&&S.enabled&&owner()&&outside()&&!road()&&
      Number(prop(target,'type'))===1&&entityId(target)!=='';
    const key=valid?adaptiveKey(target):'';
    if(target===adaptive.target&&key===adaptive.key)return;
    detachAdaptiveTarget();
    if(!valid)return;
    if(typeof target?.on!=='function'||typeof target?.off!=='function'){adaptive.lastError='target_hit_listener_unavailable';return;}
    adaptive.target=target;adaptive.key=key;adaptiveProfile(target);
    try{target.on(1012,adaptive.owner,adaptiveHit);adaptive.lastError='';}
    catch(e){adaptive.lastError=String(e?.message||e);adaptive.target=null;adaptive.key='';}
  }
  function adaptiveHit(source,marker,damage,flags,receiver){
    if(!adaptive.enabled||!owner()||!outside()||!adaptive.target||
      String(source)!==actor||String(receiver)!==entityId(adaptive.target)||
      adaptive.key!==adaptiveKey(adaptive.target)||!Number.isFinite(Number(damage))||!(Number(damage)>0))return;
    const raw=Number(marker),id=raw/10000,fl=Number(flags)||0;
    if(!Number.isSafeInteger(raw)||raw%10000!==0||!(basic(id)||tuyetHoc(id))||
      (fl&(4|16|32|64|128|256)))return;
    const now=Date.now();
    adaptive.pending=adaptive.pending.filter(c=>now-c.at<=adaptive.ttlMs);
    const matches=[];for(let i=0;i<adaptive.pending.length;i++)
      if(adaptive.pending[i].key===adaptive.key&&adaptive.pending[i].id===id)matches.push(i);
    if(matches.length!==1){if(matches.length>1)adaptive.ambiguousHits++;return;}
    adaptive.pending.splice(matches[0],1);
    const profile=adaptive.contexts.get(adaptive.key);if(!profile)return;
    let sample=profile.skills.get(id);
    if(!sample){sample={id,attempts:0,hits:0,damage:0,recent:[]};profile.skills.set(id,sample);}
    if(!Number.isFinite(sample.damage+Number(damage)))return;
    sample.hits++;sample.damage+=Number(damage);sample.recent.push(Number(damage));
    if(sample.recent.length>12)sample.recent.shift();
    profile.hits++;adaptive.matchedHits++;
    scheduleAdaptivePersistence();
  }
  function recordAdaptiveCast(id,target){
    const profile=adaptiveProfile(target);if(!profile)return;
    const now=Date.now();profile.casts++;
    let sample=profile.skills.get(id);
    if(!sample){sample={id,attempts:0,hits:0,damage:0,recent:[]};profile.skills.set(id,sample);}
    sample.attempts++;
    adaptive.pending=adaptive.pending.filter(c=>now-c.at<=adaptive.ttlMs);
    adaptive.pending.push({key:profile.key,id,at:now});
    if(adaptive.pending.length>adaptive.maxPending)adaptive.pending.shift();
  }
  function rankAdaptive(rows,fallback,target){
    const profile=adaptiveProfile(target);if(!profile)return rows.sort(fallback);
    const explore=profile.casts>0&&profile.casts%adaptive.exploreEvery===0;
    if(explore)profile.explorations++;
    return rows.sort((a,b)=>{
      const aid=Number(a?.[0]),bid=Number(b?.[0]),
        ah=profile.skills.get(aid)?.hits||0,bh=profile.skills.get(bid)?.hits||0;
      if(explore&&ah!==bh)return ah-bh;
      const as=ah>=adaptive.minHits?estimateRecentDamage(profile.skills.get(aid).recent,profile.skills.get(aid).damage/ah):null,
        bs=bh>=adaptive.minHits?estimateRecentDamage(profile.skills.get(bid).recent,profile.skills.get(bid).damage/bh):null;
      if(as!==null||bs!==null){
        if(as===null)return 1;if(bs===null)return -1;
        if(as!==bs)return bs-as;
      }
      return fallback(a,b);
    });
  }
  function adaptiveStatus(){
    const profile=adaptive.contexts.get(adaptive.key);
    adaptive.pending=adaptive.pending.filter(c=>Date.now()-c.at<=adaptive.ttlMs);
    return {enabled:adaptive.enabled,active:!!profile&&adaptive.target!==null,scope:'PvE controller-owned combos',
      minimumMatchedHits:adaptive.minHits,exploreEvery:adaptive.exploreEvery,explorationChecks:profile?.explorations??0,context:adaptive.key||null,
      contexts:adaptive.contexts.size,matchedHits:adaptive.matchedHits,ambiguousHits:adaptive.ambiguousHits,pending:adaptive.pending.length,
      persistence:{status:adaptive.storageStatus,error:adaptive.storageError,actorScoped:true,maxContexts:adaptive.maxContexts},
      lastError:adaptive.lastError,skills:profile?[...profile.skills.values()].map(s=>({
        id:s.id,attempts:s.attempts,matchedHits:s.hits,matchedDamage:s.damage,
        meanDamage:s.hits?s.damage/s.hits:null,
        rankingDamageEstimate:estimateRecentDamage(s.recent,s.hits?s.damage/s.hits:null)
      })):[],ranking:'EWMA of at most 12 recent matched hits (alpha=2/13), lifetime mean fallback',
      note:'Only matched direct damage ranks skills. No matched hit is not treated as a miss; native order remains the fallback.'};
  }
  // Wrapper callbacks only read cached primitive eligibility. Never call
  // isCooldown/status/sync or scope.status from the forced getters.
  const forceReady=__captureESMFunction((__esmLocal34=(c=>false)),"forceReady");
  function restoreForcedTween(){
    const h=forcedTween;forcedTween=null;if(!h)return;
    try{
      const cur=Object.getOwnPropertyDescriptor(h.obj,'isPlaying');
      if(cur?.get!==h.get||cur?.set!==h.set){
        S.lastError='Foreign animation hook retained; not overwritten';return;
      }
      if(h.own)Object.defineProperty(h.obj,'isPlaying',{
        ...h.own,...(Object.prototype.hasOwnProperty.call(h.own,'value')?{value:h.value}:{})
      });
      else{
        delete h.obj.isPlaying;
        if(h.wrote&&(!h.parent||Object.prototype.hasOwnProperty.call(h.parent,'value')))
          Object.defineProperty(h.obj,'isPlaying',{configurable:true,writable:true,enumerable:true,value:h.value});
      }
    }catch(e){S.lastError=String(e?.message||e);}
  }
__esmLocal35=restoreForcedTween;

  function parentDescriptor(obj,key){
    for(let p=Object.getPrototypeOf(obj);p;p=Object.getPrototypeOf(p)){
      const d=Object.getOwnPropertyDescriptor(p,key);if(d)return d;
    }return null;
  }
__esmLocal36=parentDescriptor;

  function syncForcedTween(c){
    const obj=forceReady(c)?c?._jh:null;
    if(forcedTween&&forcedTween.obj===obj){
      const d=Object.getOwnPropertyDescriptor(obj,'isPlaying');
      if(d?.get===forcedTween.get&&d?.set===forcedTween.set)return;
      S.lastError='Foreign animation hook changed; not overwritten';
      forcedTween=null;return;
    }
    restoreForcedTween();
    if(!obj||typeof obj!=='object')return;
    const own=Object.getOwnPropertyDescriptor(obj,'isPlaying');
    if((own&&!own.configurable)||(!own&&!Object.isExtensible(obj)))return;
    const parent=own?null:parentDescriptor(obj,'isPlaying');
    let value;try{value=obj.isPlaying;}catch(_){return;}
    let wrote=false;
    const readNative=__captureESMFunction((__esmLocal38=(()=>{try{
      if(own?.get)return own.get.call(obj);
      if(!own&&parent?.get)return parent.get.call(obj);
    }catch(_){}return value;})),"readNative");
    const writeNative=__captureESMFunction((__esmLocal39=(v=>{wrote=true;value=v;try{
      if(own?.set)own.set.call(obj,v);
      else if(!own&&parent?.set)parent.set.call(obj,v);
    }catch(e){S.lastError=String(e?.message||e);}})),"writeNative");
    const get=__captureESMFunction((__esmLocal40=(function(){
      if(this===obj&&forceReady(c)){S.forceAnimationReads++;return false;}
      return readNative();
    })),"get");
    const set=__captureESMFunction((__esmLocal41=(function(v){writeNative(v);})),"set");
    try{
      Object.defineProperty(obj,'isPlaying',{configurable:true,
        enumerable:own?.enumerable??parent?.enumerable??true,get,set});
      forcedTween={obj,own,parent,get,set,get value(){
__esmLocal42=__captureESMMethod(this,"value","get");
return value;},get wrote(){
__esmLocal43=__captureESMMethod(this,"wrote","get");
return wrote;}};
      S.forceAnimationPatched++;
    }catch(e){S.lastError=String(e?.message||e);}
  }
__esmLocal37=syncForcedTween;

  function syncForceContext(c){
    const t=c?.target;
    // Force only native PvE monsters, never players (type 4), Road,
    // hidden tabs, UI interaction, recovery or another combat owner.
    const can=false&&S.enabled&&skillPriority==='basic_force_default'&&owner()&&outside()&&beastReady(c)&&(!road()||roadForce()&&roadClose(S.role,c))&&
      W.document?.hidden!==true&&W._Ba?._rJ?._O$?.ins?.isDead!==true&&
      !__getKVPV3()?.priority?.()&&
      Date.now()>=Number(W.__KVPV_USER_UI_UNTIL||0)&&
      !__getKVPV10()?.shouldBlock?.(t)&&
      Number(t?.property?.get?.('type'))===1&&
      c?.isValidTarget?.()===true&&c?.isValidRange?.()===true;
    S.forceCombat=can?c:null;S.forceTarget=can?t:null;
    S.forceScene=can?liveScene():null;S.forceActive=!!can;
    syncForcedTween(c);
  }
__esmLocal44=syncForceContext;



  function release(){S.forceActive=false;S.forceCombat=null;S.forceTarget=null;restoreForcedTween();S.rapidPoll=false;detachAdaptiveTarget();releaseRoadCast();releaseRoadSelector();__getKVPV9()?.release?.();if(!S.hooks.length&&S.role===null)return;for(const h of S.hooks.slice().reverse()){

    if(h.obj[h.key]!==h.fn)continue;

    if(h.descriptor)Object.defineProperty(h.obj,h.key,h.descriptor);else delete h.obj[h.key];

  }S.hooks=[];S.role=null;S.basicReady.clear();S.prefer='basic';S.cursor=0;S.basicCursor=0;}
__esmLocal45=release;


  function hook(obj,key,wrap){const descriptor=Object.getOwnPropertyDescriptor(obj,key);

    if(descriptor&&!descriptor.configurable)throw Error('Cannot hook '+key);

    const fn=wrap(obj[key]);Object.defineProperty(obj,key,{value:fn,writable:true,configurable:true,enumerable:!!descriptor?.enumerable});

    S.hooks.push({obj,key,fn,descriptor});

  }
__esmLocal46=hook;


  function bind(role,selector,combat){

    if(S.role===role){if(S.hooks.every(__captureESMFunction((__esmLocal48=(h=>h.obj[h.key]===h.fn)),"")))return true;

      S.reason='another_controller_owns_hooks';return false;}

    release();

    try{

      hook(combat,'isCooldown',__captureESMFunction((__esmLocal49=(native=>__captureESMFunction((__esmLocal50=(function(){
        if(this===combat&&forceReady(combat)){S.forceCooldownReads++;return false;}

        

        return native.apply(this,arguments);

      })),""))),""));

      hook(selector,'_f7t',__captureESMFunction((__esmLocal51=(native=>__captureESMFunction((__esmLocal52=(function(active,common,mode){

        if(!S.enabled||!outside()||!owner()||!beastReady(combat))return native.apply(this,arguments);

        if(__getKVPV3()?.priority?.())return -1;
        if(__getKVPV10()?.shouldBlock?.(combat.target))return -1;

        if(road()&&mode!==1&&!(mode===2&&__getKVPV13()?.status?.()?.enabled===true&&__getKVPV13()?.transformed?.()))return -1;

        if(mode===2&&__getKVPV13())return __callKVPV0(native,this,active,common,mode);

        if(mode!==1)return native.apply(this,arguments);

        if(road()&&!roadClose(role,combat))return -1;

        if(W._Ba?._rJ?._O$?.ins?.isDead===true||combat.isCooldown?.()!==false||combat.isValidTarget?.()!==true||combat.isValidRange?.()!==true||Date.now()-S.lastCast<castGap())return -1;

        const all=[...(Array.isArray(active)?active:[]),...(Array.isArray(common)?common:[])],now=Date.now();

        

        const pickBasic=__captureESMFunction((__esmLocal53=(()=>{

          const basicRows=all.filter(__captureESMFunction((__esmLocal54=(r=>basic(r?.[0])&&(skillPriority!=='basic_force_default'||pveBasic(r[0]))&&(!road()||roadForce()||Number(r[0])===8001))),"")).map(__captureESMFunction((__esmLocal55=(row=>{const id=Number(row[0]),copy=row.slice();

            if(!S.basicReady.has(id))S.basicReady.set(id,road()&&!roadForce()?0:Number(row[1])<now?0:now+1);

            if(skillPriority==='basic_force_default'&&(!road()||roadForce())){copy[1]=S.basicReady.get(id);copy[2]=castGap();}return copy;

          })),"")).filter(__captureESMFunction((__esmLocal56=(row=>Number(row[1])<now)),""))

            .sort(__captureESMFunction((__esmLocal57=((a,b)=>(Number(a[0])-8001-S.basicCursor+9)%9-(Number(b[0])-8001-S.basicCursor+9)%9)),""));
          const rows=road()?basicRows:rankAdaptive(basicRows,__captureESMFunction((__esmLocal57=((a,b)=>(Number(a[0])-8001-S.basicCursor+9)%9-(Number(b[0])-8001-S.basicCursor+9)%9)),""),combat.target);

          const id=Number(native.call(this,rows,[],mode));if(basic(id))S.basicReady.set(id,now+castGap());return id;

        })),"pickBasic");

        if(road()||skillPriority==='basic_force_default')return pickBasic();

        const pickTH=__captureESMFunction((__esmLocal58=(()=>{

          const rows=all.filter(__captureESMFunction((__esmLocal59=(r=>tuyetHoc(r?.[0])&&Number.isFinite(Number(r[1]))&&Number(r[1])<now)),""))

            .sort(__captureESMFunction((__esmLocal60=((a,b)=>(Number(a[0])-1001-S.cursor+8)%8-(Number(b[0])-1001-S.cursor+8)%8)),""));

          const ranked=rankAdaptive(rows,__captureESMFunction((__esmLocal60=((a,b)=>(Number(a[0])-1001-S.cursor+8)%8-(Number(b[0])-1001-S.cursor+8)%8)),""),combat.target);
          return Number(native.call(this,ranked,[],mode));

        })),"pickTH");

        const preferBasic=skillPriority==='interleaved'&&S.prefer==='basic';
        const first=preferBasic?pickBasic:pickTH,second=preferBasic?pickTH:pickBasic;

        const id=first();return basic(id)||tuyetHoc(id)?id:second();

      })),""))),""));

      hook(combat,'combat',__captureESMFunction((__esmLocal61=(native=>__captureESMFunction((__esmLocal62=(function(id){

        if(S.enabled&&outside()&&owner()){

          if(__getKVPV3()?.priority?.())return undefined;
          if(__getKVPV10()?.shouldBlock?.(this.target))return undefined;

          if(road()&&!roadClose(role,combat))return undefined;

          if(road()&&!roadForce()&&Number(id)!==8001&&!(__getKVPV13()?.status?.()?.enabled===true&&__getKVPV13()?.transformed?.()&&__getKVPV13()?.has?.(id))){S.blocked++;return undefined;}

          if(!allowed(Number(id))||(skillPriority==='basic_force_default'&&(!road()||roadForce())&&!pveBasic(id))){S.blocked++;return undefined;}

          if(Date.now()-S.lastCast<castGap()||W._Ba?._rJ?._O$?.ins?.isDead===true||combat.isCooldown?.()!==false||combat.isValidTarget?.()!==true||combat.isValidRange?.()!==true)return undefined;

          S.lastCast=Date.now();S.attempts++;

          if(basic(id)){S.basicAttempts++;S.prefer=road()||skillPriority==='basic_force_default'?'basic':'tuyet_hoc';S.basicCursor=(Number(id)-8001+1)%9;}else if(tuyetHoc(id)){S.tuyetHocAttempts++;S.prefer='basic';S.cursor=(Number(id)-1001+1)%8;}

        }

        const result=native.apply(this,arguments);
        if(S.enabled&&outside()&&owner()&&!road()&&Number(prop(this.target,'type'))===1&&
          (basic(Number(id))||tuyetHoc(Number(id))))recordAdaptiveCast(Number(id),this.target);
        return result;

      })),""))),""));

      S.role=role;return true;

    }catch(e){release();throw e;}

  }
__esmLocal47=bind;


  

  function tick(){try{

    if(S.enabled&&S.timer!==null)schedule(pollInterval());

    const hongHoang=sceneType()===17&&owner();
    if(hongHoang){
      const stage=W._Ba?._Co?._Mo?.ins;
      if(stage&&S.hongHoangStage?.model!==stage)
        S.hongHoangStage={model:stage,auto:stage.auto===true};
      if(stage?.auto===true)stage.auto=false;
      release();S.reason='honghoang_chest_collection_no_combat';return;
    }
    if(S.hongHoangStage){
      const previous=S.hongHoangStage;
      if(previous.auto&&previous.model?.auto===false)previous.model.auto=true;
      S.hongHoangStage=null;
    }

    const gap=__getKVPV0()?.pollingGap?.()??0,now=Date.now();if(gap>0&&now-(S.lastPoll??-Infinity)<gap)return;S.lastPoll=now;

    if(__getKVPV8()?.status?.()?.inside===true||__getKVPV5()?.status?.()?.inside===true){release();S.reason='peak_floor9_gather_no_combat';return;}

    if(Number(W._ft?._po?.ins?.getCfgById?.(Number(W._C?._Mn?._Cn?.currentID))?.[7])===69){release();S.reason='quiz_scene_no_combat';return;}

    if(!S.enabled||!owner()||!outside()){release();S.reason=outside()?'disabled_or_actor_changed':'tianquan_yield';return;}

    __getKVPV11()?.releaseOutsideScope?.();

    const role=W._C?._Ba?.instance?.getRole?.(Number(actor));

    const selector=role?.getComponent?.(W._d?._Yct?._Eet),combat=role?.getComponent?.(W._d?._Yct?._Het);

    if(!role||typeof selector?._f7t!=='function'||typeof combat?.combat!=='function'){release();S.reason='waiting_components';return;}
    if(Number(combat?.target?.property?.get?.('type'))===4){release();S.reason='player_target_yield_pvp';return;}
    syncAdaptiveTarget(combat.target);
    if(!beastReady(combat)){release();S.reason='beast_collect_or_unverified_boss';return;}

    // Road BASIC FORCE: preserve the Road module's approach/target acquisition;
    // only take native combat ownership in verified melee range of a monster.
    if(roadForce()){
      releaseRoadCast();releaseRoadSelector();
      if(__getKVPV3()?.priority?.()||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)){
        release();S.reason='road_yield_to_owner_or_ui';return;
      }
      if(W.document?.hidden===true||W._Ba?._rJ?._O$?.ins?.isDead===true){
        release();S.reason='road_paused';return;
      }
      const hp=combat.target?.property?.get?.('hp'),
        lost=combat.isValidTarget?.()!==true||Array.isArray(hp)&&Number(hp[0])<=0;
      if(lost){
        release();
        const user=W._Ba?._rJ?._O$?.ins;
        if(typeof user?.selectTar==='function'&&Date.now()-(S.lastAcquire??-Infinity)>=400){
          S.lastAcquire=Date.now();S.targetSearches++;user.selectTar(1,-1);
        }
        S.reason='road_waiting_native_target';return;
      }
      if(Number(combat.target?.property?.get?.('type'))!==1){
        release();S.reason='road_not_monster';return;
      }
      if(approachRoad(role,combat)){release();return;}
      // Avoid learning false ready times from a forced cooldown observation.
      __getKVPV9()?.observe?.(role,combat);
    }
    

    if(road()&&!roadForce()){
      S.rapidPoll=false;

      if(__getKVPV9()?.enabled===false){releaseRoadCast();releaseRoadSelector();if(S.hooks.length||S.role!==null)release();S.reason='road_support_disabled';return;}

      if(S.hooks.length||S.role!==null)release();syncRoadCast(combat);syncRoadSelector(selector);__getKVPV9()?.observe?.(role,combat);

      if(W._Ba?._rJ?._O$?.ins?.isDead===true){S.forceActive=false;restoreForcedTween();S.reason='dead';return;}

      if(W.document?.hidden&&__getKVPV0()?.config?.pauseWhenHidden===true){S.forceActive=false;restoreForcedTween();S.reason='hidden_tab';return;}

      if(__getKVPV3()?.priority?.()||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)){S.reason='road_yield_native';return;}

      const hp=combat.target?.property?.get?.('hp'),lost=combat.isValidTarget?.()!==true||Array.isArray(hp)&&Number(hp[0])<=0;

      if(lost){const user=W._Ba?._rJ?._O$?.ins;if(typeof user?.selectTar==='function'&&Date.now()-(S.lastAcquire??-Infinity)>=400){S.lastAcquire=Date.now();S.targetSearches++;user.selectTar(1,-1);}S.reason='waiting_native_target';return;}

      if(approachRoad(role,combat))return;


      S.reason='road_native_combat';return;

    }

    releaseRoadCast();releaseRoadSelector();if(!bind(role,selector,combat))return;
    syncForceContext(combat);

    __getKVPV9()?.observe?.(role,combat);

    if(W._Ba?._rJ?._O$?.ins?.isDead===true){S.reason='dead';return;}

    if(W.document?.hidden&&__getKVPV0()?.config?.pauseWhenHidden===true){S.reason='hidden_tab';return;}

    S.rapidPoll=W.document?.hidden!==true&&combat.isValidTarget?.()===true&&combat.isValidRange?.()===true&&
      __getKVPV3()?.priority?.()!==true&&Date.now()>=Number(W.__KVPV_USER_UI_UNTIL||0);
    if(S.timer!==null)schedule(pollInterval());
    if(Date.now()-S.lastCast<castGap())return;

    if(road()&&!__getKVPV3()?.priority?.()&&Date.now()>=Number(W.__KVPV_USER_UI_UNTIL||0)){

      const hp=combat.target?.property?.get?.('hp'),lost=combat.isValidTarget?.()!==true||Array.isArray(hp)&&Number(hp[0])<=0;

      const user=W._Ba?._rJ?._O$?.ins;

      if(lost&&typeof user?.selectTar==='function'&&Date.now()-(S.lastAcquire??-Infinity)>=400){S.lastAcquire=Date.now();S.targetSearches++;user.selectTar(1,-1);}

    }

    const targetHp=combat.target?.property?.get?.('hp'),
      lostTarget=combat.isValidTarget?.()!==true||Array.isArray(targetHp)&&Number(targetHp[0])<=0;
    if(lostTarget){
      if(normalMapClear()&&Date.now()>=Number(W.__KVPV_USER_UI_UNTIL||0)&&
         W.document?.hidden!==true&&Date.now()-S.lastNormalMapSearch>=800){
        const user=W._Ba?._rJ?._O$?.ins;
        if(typeof user?.selectTar==='function'){
          S.lastNormalMapSearch=Date.now();S.normalMapSearches++;S.targetSearches++;
          user.selectTar(1,-1);
        }
      }
      S.reason=normalMapClear()?'normal_map_searching_native_monster':'waiting_native_target';return;
    }

    if(approachNormalMap(role,combat))return;

    if(approachRoad(role,combat))return;

    if(combat.isValidRange?.()!==true){S.reason='waiting_native_range';return;}

    if(combat.isCooldown?.()!==false){S.reason='waiting_native_cooldown';return;}

    if(W.KVPV?.core?.scene?.combat?.claim?.('12-basic-outside',30)!==true){release();S.reason='combat_dispatch_wait';return;}

    const id=Number(selector.selectSkill?.());

    if(!allowed(Number(id))||(skillPriority==='basic_force_default'&&!pveBasic(id))){S.reason='waiting_ready_combo';return;}

    combat.combat(id);S.reason=basic(id)?'basic_native_called':'skill_native_called';

  }catch(e){S.lastError=String(e?.message||e);S.reason='error';}}
__esmLocal63=tick;


  

  function status(){return {enabled:S.enabled,active:S.hooks.length>0&&outside(),intervalMs:S.timerMs,activePollMs:skillPriority==='basic_force_default'?1:4,idlePollMs:16,roadPollMs:100,rapidPoll:S.rapidPoll,skillClientWaitMs:null,combo:road()?'native_combat':skillPriority,skillPriority,nextPreferred:skillPriority==='basic_force_default'?'basic':skillPriority==='interleaved'?S.prefer:'tuyet_hoc',
    defaultBasicForce:{enabled:skillPriority==='basic_force_default',active:S.forceActive,skillIds:[8001,8002,8003,8004,8005],cooldownFalseReturns:S.forceCooldownReads,animationFalseReads:S.forceAnimationReads,animationPatched:S.forceAnimationPatched,animationForced:!!forcedTween,serverCooldownModified:false},basicClientWaitMs:road()?null:castGap(),basicAttempts:S.basicAttempts,tuyetHocAttempts:S.tuyetHocAttempts,

    roadMelee:{active:road(),targetSearches:S.targetSearches,basicOnly:roadForce(),basicSkill:roadForce()?[8001,8002,8003,8004,8005]:null,nativeCooldownBypass:roadForce()&&S.forceActive,aoePriority:false,radius:__getKVPV9()?.approachDistance??80,distance:S.role?roadDistance(S.role,S.role.getComponent?.(W._d?._Yct?._Het)):null,fullBasicRotation:true,nativeCombat:road()},normalMapClear:{eligible:normalMapClear(),targetSearches:S.normalMapSearches,targetType:1,nativeSelection:true,moves:S.normalMapMoves},adaptiveCombo:adaptiveStatus(),attempts:S.attempts,blockedSkills:S.blocked,reason:S.reason,lastError:S.lastError,

    note:roadForce()?'Road Trial BASIC FORCE runs only against native in-range monsters; approach and target selection stay native.':'Road native combat stays available when BASIC FORCE is disabled.'};}
__esmLocal64=status;


  

  function stop(){S.enabled=false;if(S.timer!=null){(__getKVPV14()?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;}flushAdaptivePersistence();release();S.reason='stopped';return status();}
__esmLocal65=stop;


  

  function schedule(ms){if(S.timer!==null&&S.timerMs===ms)return;if(S.timer!==null)(__getKVPV14()?.timers?.clearInterval??W.clearInterval)(S.timer);S.timerMs=ms;S.timer=(__getKVPV14()?.timers?.setInterval??W.setInterval)(tick,ms);}
__esmLocal66=schedule;


  function start(){S.enabled=true;schedule(pollInterval());tick();return status();}
__esmLocal67=start;


  function setSkillPriority(value='basic_force_default'){
    if(!['basic_force_default','tuyet_hoc_first','interleaved'].includes(value))throw Error('Skill priority must be basic_force_default, tuyet_hoc_first or interleaved');
    if(value!==skillPriority){S.forceActive=false;restoreForcedTween();S.basicReady.clear();S.basicCursor=0;}skillPriority=value;return status();
  }
__esmLocal68=setSkillPriority;

  function setAdaptiveRanking(enabled=true){adaptive.enabled=!!enabled;if(!adaptive.enabled){detachAdaptiveTarget();flushAdaptivePersistence();}else syncAdaptiveTarget(S.role?.getComponent?.(W._d?._Yct?._Het)?.target);return adaptiveStatus();}
  W.KVPV_BASIC10=Object.freeze({start,stop,status,release,sync:tick,setSkillPriority,setAdaptiveRanking,clearAdaptiveProfile,isForceActive:__captureESMFunction((__esmLocal69=(()=>S.forceActive&&roadForce())),"isForceActive")});start();

})),""))();


}
export {getKVPV_BASIC10} from '../api.mjs';
export const api=Object.freeze({
  get KVPV_BASIC10(){return globalThis.KVPV_BASIC10;},
});