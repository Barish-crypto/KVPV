import {getKVPV_COMPANION_COMBAT as __getKVPV0,getKVPV_DESKTOP_CONTROL as __getKVPV1,getKVPV_FAR_SCOPE as __getKVPV2,getKVPV_ROAD_CADENCE as __getKVPV3,getKVPV_V1 as __getKVPV4} from '../api.mjs';
export function call_KVPV_COMPANION_COMBAT_sync(...args){const target=globalThis["KVPV_COMPANION_COMBAT"];const fn=globalThis["KVPV_COMPANION_COMBAT"]?.["sync"];if(typeof fn!=='function')throw Error("KVPV_COMPANION_COMBAT.sync is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_COMPANION_COMBAT_status(...args){const target=globalThis["KVPV_COMPANION_COMBAT"];const fn=globalThis["KVPV_COMPANION_COMBAT"]?.["status"];if(typeof fn!=='function')throw Error("KVPV_COMPANION_COMBAT.status is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_COMPANION_COMBAT_stop(...args){const target=globalThis["KVPV_COMPANION_COMBAT"];const fn=globalThis["KVPV_COMPANION_COMBAT"]?.["stop"];if(typeof fn!=='function')throw Error("KVPV_COMPANION_COMBAT.stop is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_COMPANION_COMBAT__handoff(...args){const target=globalThis["KVPV_COMPANION_COMBAT"];const fn=globalThis["KVPV_COMPANION_COMBAT"]?.["_handoff"];if(typeof fn!=='function')throw Error("KVPV_COMPANION_COMBAT._handoff is not available");return Reflect.apply(fn,target,args);}
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
export {__esmLocal0 as local_anonymous_8_1_0};
export {__esmLocal1 as local_prop_1};
export {__esmLocal2 as local_types_2};
export {__esmLocal3 as local_component_3};
export {__esmLocal4 as local_identity_4};
export {__esmLocal5 as local_owned_5};
export {__esmLocal6 as local_inRoad_6};
export {__esmLocal7 as local_scope_7};
export {__esmLocal8 as local_settings_8};
export {__esmLocal9 as local_live_9};
export {__esmLocal10 as local_playerSkill_10};
export {__esmLocal11 as local_anonymous_37_143_11};
export {__esmLocal12 as local_rideSignal_12};
export {__esmLocal13 as local_setRide_13};
export {__esmLocal14 as local_setMansion_14};
export {__esmLocal15 as local_onPlayerCast_15};
export {__esmLocal16 as local_dispatchNativeCompanions_16};
export {__esmLocal17 as local_dispatchRoad_17};
export {__esmLocal18 as local_follow_18};
export {__esmLocal19 as local_unbind_19};
export {__esmLocal20 as local_sync_20};
export {__esmLocal21 as local_status_21};
export {__esmLocal22 as local_anonymous_158_39_22};
export {__esmLocal23 as local_anonymous_158_259_23};
export {__esmLocal24 as local_stop_24};
export {__esmLocal25 as local__handoff_25};
export {__esmLocal26 as local_anonymous_164_76_26};
export function initialize(){







(__captureESMFunction((__esmLocal0=(() => {

  'use strict';

  const W=window,old=__getKVPV0(),carry=old?._handoff?.();

  try{old?.stop?.();}catch(e){__getKVPV4()?.diagnostics?.record?.(e);}

  const actor=String(W.__KVPV_OWN_ACTOR_ID??''),allowed=new Set(['THIEN_QUAN','LINH_LUNG','PHU_VAN','TRU_TIEN']),scanMs=8;

  const S={enabled:true,timer:null,timerMs:scanMs,role:null,ride:null,mansion:null,mansionAttempts:0,dispatching:false,reason:'starting',lastError:'',

    attempts:carry?.actor===actor?Number(carry.attempts)||0:0,nativeCastSignals:carry?.actor===actor?Number(carry.nativeCastSignals)||0:0,lastSkill:null,lastTarget:null,nativeAutoAttempts:0,perCompanion:{pet:0,fuwa:0,ride:0},lastCompanion:null};

  const prop=__captureESMFunction((__esmLocal1=((r,k)=>r?.property?.get?.(k))),"prop"),types=__captureESMFunction((__esmLocal2=(()=>W._d?._Yct)),"types");

  const component=__captureESMFunction((__esmLocal3=((r,k)=>types()?.[k]?r?.getComponent?.(types()[k]):null)),"component");

  const identity=__captureESMFunction((__esmLocal4=(r=>String(r?.id??prop(r,'id')??''))),"identity");

  const owned=__captureESMFunction((__esmLocal5=(()=>!!actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED)),"owned");

  const inRoad=__captureESMFunction((__esmLocal6=(()=>Number(W._ft?._po?.ins?.getCfgById?.(Number(W._C?._Mn?._Cn?.currentID))?.[7])===41&&W._Ba?._cm?._q3t?.ins?.getHasTeamByType?.(1)===true&&__getKVPV3()?.enabled!==false)),"inRoad");
  const scope=__captureESMFunction((__esmLocal7=(()=>{if(inRoad())return true;const s=__getKVPV2()?.status?.();return s?.inside===true&&allowed.has(s.kind);})),"scope");

  const settings=__captureESMFunction((__esmLocal8=(()=>__getKVPV1()?.scopeProfile?.(__getKVPV2()?.status?.()?.kind)??{})),"settings");

  const live=__captureESMFunction((__esmLocal9=(r=>{const hp=prop(r,'hp');return !!r&&r.isValid!==false&&Number(prop(r,'status'))!==1024&&(!Array.isArray(hp)||Number(hp[0])>0);})),"live");

  function playerSkill(role,id){const s=component(role,'_Eet');return Number.isSafeInteger(id)&&id>0&&[...(s?._rtt??[]),...(s?._wet??[])].some(__captureESMFunction((__esmLocal11=(r=>Number(r?.[0])===id)),""));}
__esmLocal10=playerSkill;

  function previewNativeSkill(selector){
    if(Number(prop(selector,'type'))===4){
      const forced=Number(W._Ba?._rJ?._O$?.ins?.skillIdIsPlayBySer);
      if(forced)return {id:forced,boundary:false,forced:true};
    }
    let ready=selector?._rtt??[],common=selector?._wet??[],mode=1;
    const transform=W._Ba?._s3?._ZJ?.ins;
    if(transform&&transform.curShowId!=0&&selector?._Net===0){
      const skills=transform.getTransformingSkills();
      ready=skills?.skills??[];common=skills?.comSkills??[];mode=2;
    }else if(selector?._Net===3)mode=3;
    else if(selector?._Net===4)mode=4;
    else if(selector?._Net===7)mode=5;
    const now=Date.now();
    let id=-1,nextReady=null,nextReadyAt=null;
    if(!selector?._Cet)for(const row of ready){
      const readyAt=Number(row?.[1]);
      if(readyAt<now){id=Number(row?.[0]);break;}
      if(nextReady===null&&Number.isFinite(readyAt)&&readyAt<=now+25){nextReady=Number(row?.[0]);nextReadyAt=readyAt;}
    }
    if(id===-1&&common.length){
      let index;
      if(selector?._Tet===-1){
        const exterior=prop(selector,'exterior');
        index=mode!==1||Number(exterior?.[5])>0?0:1;
        const row=common[index],readyAt=Number(row?.[1]);
        if(row&&readyAt<now)id=Number(row[0]);
        else if(Number.isFinite(readyAt)&&readyAt<=now+25)return {id:Number(row?.[0]??-1),boundary:true,waitMs:Math.max(0,readyAt-now)};
      }else{
        index=(Number(selector?._Tet)+1)%common.length;
        if(mode===1&&index===0)index=Number(prop(selector,'exterior')?.[5])>0?0:1;
        id=Number(common[index]?.[0]??-1);
      }
    }
    if(id===-1&&nextReady!==null)return {id:nextReady,boundary:true,waitMs:Math.max(0,nextReadyAt-now)};
    const row=[...ready,...common].find(r=>Number(r?.[0])===id);
    const readyAt=Number(row?.[1]);
    const boundary=Number.isFinite(readyAt)&&readyAt>now&&readyAt<=now+25;
    return {id,boundary,waitMs:boundary?readyAt-now:null,forced:false};
  }

  function nextScanInterval(){
    const now=Date.now();
    let nearestReadyMs=Infinity;
    for(const key of ['pet','fuwa','ride','mansion']){
      const selector=component(prop(S.role,key+'Context'),'_Eet');
      if(!selector)continue;
      const preview=previewNativeSkill(selector);
      if(preview?.boundary&&Number.isFinite(preview.waitMs)&&preview.waitMs>=0)
        nearestReadyMs=Math.min(nearestReadyMs,preview.waitMs);
    }
    return nearestReadyMs<=scanMs
      ?Math.max(1,Math.min(scanMs,Math.ceil(nearestReadyMs*0.75)))
      :scanMs;
  }

  function scheduleScan(ms){
    if(!S.enabled)return;
    if(S.timer!==null)(__getKVPV4()?.timers?.clearInterval??W.clearInterval)(S.timer);
    S.timerMs=ms;
    S.timer=(__getKVPV4()?.timers?.setInterval??W.setInterval)(()=>{
      sync(false);
      if(S.enabled&&S.timer!==null)scheduleScan(nextScanInterval());
    },ms);
  }

  function rideSignal(){if(S.enabled)S.nativeCastSignals++;}
__esmLocal12=rideSignal;


  function setRide(ride){if(ride===S.ride)return;S.ride?.off?.(1039,S,rideSignal);S.ride=ride;ride?.on?.(1039,S,rideSignal);}
__esmLocal13=setRide;


  function setMansion(context){if(context===S.mansion)return;S.mansion?.off?.(1039,S,rideSignal);S.mansion=context;context?.on?.(1039,S,rideSignal);}
__esmLocal14=setMansion;


  function onPlayerCast(targetId,skillId){try{

    if(!S.enabled||S.dispatching||!owned()||!scope())return;

    const role=S.role,master=component(role,'_Het'),target=master?.target,id=Number(skillId);

    if(!live(role)||Number(prop(role,'type'))!==4||!playerSkill(role,id)||!live(target)||identity(target)!==String(targetId)||
      __getKVPV2()?.eligible?.(target)!==true||master?.isValidTarget?.()!==true)return;

    if(inRoad()){dispatchRoad(role,target);return;}
    const p=settings();
    const companionOrder=[['pet',2,true],['fuwa',9,true],['ride',7,p.rideFollow!==false],['mansion',12,p.mansionFollow===true]];
    S.dispatching=true;try{for(const [key,type,on] of companionOrder)if(on){try{follow(key,type,role,target);}catch(e){S.lastError=String(e?.message??e);S.reason='error';}}}finally{S.dispatching=false;}

  }catch(e){S.lastError=String(e?.message??e);S.reason='error';}}
__esmLocal15=onPlayerCast;


  // Pet / Fuwa / Ride native selector autonomously chooses normal attacks
  // and special skills; only native readiness, animation and range admit casts.
  function dispatchNativeCompanions(role,target){
    const master=component(role,'_Het');
    if(!S.enabled||S.dispatching||!owned()||!scope()||inRoad()||
      W._Ba?._rJ?._O$?.ins?.isDead===true||!live(role)||Number(prop(role,'type'))!==4||
      !live(target)||Number(prop(target,'type'))!==1||
      __getKVPV2()?.eligible?.(target)!==true||
      typeof master?.isValidTarget!=='function'||master.isValidTarget()!==true)return;
    const p=settings();
    const companionOrder=[['pet',2,true],['fuwa',9,true],['ride',7,p.rideFollow!==false],['mansion',12,p.mansionFollow===true]];
    S.dispatching=true;
    try{
      for(const [key,type,on] of companionOrder){
        if(!on)continue;
        try{
          const before=S.attempts;follow(key,type,role,target);
          if(S.attempts>before)S.nativeAutoAttempts++;
        }
        catch(e){S.lastError=String(e?.message??e);S.reason='error';}
      }
    }finally{S.dispatching=false;}
  }
__esmLocal16=dispatchNativeCompanions;

  let lastRoadDispatch=-Infinity;
  function dispatchRoad(role,target){if(W._Ba?._rJ?._O$?.ins?.isDead===true||S.dispatching||Date.now()-lastRoadDispatch<1||!live(role)||Number(prop(role,'type'))!==4||!live(target)||Number(prop(target,'type'))!==1||component(role,'_Het')?.isValidTarget?.()!==true)return;lastRoadDispatch=Date.now();S.dispatching=true;try{const p=settings();for(const [key,type,on] of [['pet',2,true],['fuwa',9,true],['ride',7,p.rideFollow!==false],['mansion',12,p.mansionFollow===true]])if(on)try{follow(key,type,role,target);}catch(e){S.lastError=String(e?.message??e);S.reason='error';}}finally{S.dispatching=false;}}
__esmLocal17=dispatchRoad;

  function follow(key,type,role,target){

    const context=key==='ride'?prop(role,'rideContext'):(key==='mansion'?prop(role,'mansionContext'):prop(role,key+'Context'));
    if(key==='ride')setRide(context);else if(key==='mansion')setMansion(context);

    if(!context||!live(context)||Number(prop(context,'type'))!==type){S.reason='waiting_native_'+key;return;}

    const combat=component(context,'_Het'),selector=component(context,'_Eet');

    if(typeof combat?.combat!=='function'||typeof combat?.setTarget!=='function'||typeof selector?.selectSkill!=='function'){S.reason='waiting_native_components';return;}

    if(combat._jh?.isPlaying===true||typeof combat.isCooldown!=='function'||combat.isCooldown()!==false){S.reason='native_companion_cooldown';return;}

    if(W.KVPV?.core?.scene?.combat?.claim?.('50-companion-combat',10,'companion')!==true){S.reason='combat_dispatch_wait';return;}

    const preview=previewNativeSkill(selector);
    if(preview?.boundary){S.reason='native_selection_boundary';return;}
    if(!Number.isSafeInteger(preview?.id)||preview.id<=0){S.reason='no_ready_native_skill';return;}
    const cfg=W._Ba?._Jtt?._ant?.ins?.getCfgById?.(10000*preview.id+1);
    if(!cfg){S.reason='waiting_native_skill_config';return;}
    const targetKind=Number(cfg[15]);
    if(!Number.isFinite(targetKind)){S.reason='waiting_native_skill_target_config';return;}
    const destination=targetKind===1?role:target;

      combat.setTarget(destination,targetKind);

      if(combat.target!==destination||combat.isValidTarget?.(targetKind)!==true){S.reason='native_target_rejected';return;}

      if(typeof combat.isValidRange==='function'&&combat.isValidRange()!==true){S.reason='native_companion_range';return;}

    if(!owned()||!scope()||!live(role)||!live(target)||identity(component(role,'_Het')?.target)!==identity(target)){
      S.reason='combat_context_changed';return;
    }
    const selected=Number(selector.selectSkill());
    if(selected!==preview.id){S.reason='native_selection_changed';return;}
    combat.combat(selected,0,targetKind);

      if(key==='mansion')S.mansionAttempts++;S.attempts++;S.lastSkill=selected;S.lastTarget=identity(destination);

      if(key in S.perCompanion){S.perCompanion[key]++;S.lastCompanion=key;}
      S.reason=key+'_native_cast';



  }
__esmLocal18=follow;


  function unbind(){S.role?.off?.(1039,S,onPlayerCast);S.role=null;setRide(null);setMansion(null);}
__esmLocal19=unbind;


  

  function sync(withStatus=true){try{

    if(!S.enabled)return withStatus?status():undefined;

    if(!owned()){unbind();S.reason='wrong_actor_or_halted';return withStatus?status():undefined;}

    const role=W._C?._Ba?.instance?.getRole?.(Number(actor));

    if(role!==S.role){unbind();S.role=role;role?.on?.(1039,S,onPlayerCast);}

    setRide(prop(role,'rideContext')??null);setMansion(prop(role,'mansionContext')??null);
    if(inRoad()&&owned()&&W._Ba?._rJ?._O$?.ins?.isDead!==true)dispatchRoad(role,component(role,'_Het')?.target);
    else if(!withStatus&&scope()&&owned())dispatchNativeCompanions(role,component(role,'_Het')?.target);

    if(!role)S.reason='waiting_player';else if(!scope())S.reason='outside_supported_dungeons';

    else if(!S.ride)S.reason='waiting_native_ride';

    else if(['starting','outside_supported_dungeons','waiting_player','waiting_native_ride'].includes(S.reason))S.reason='waiting_player_cast';

  }catch(e){S.lastError=String(e?.message??e);S.reason='error';}return withStatus?status():undefined;}
__esmLocal20=sync;


  function status(){const combat=component(S.ride,'_Het'),selector=component(S.ride,'_Eet');return {

    mansionAttempts:S.mansionAttempts,rideFollow:settings().rideFollow!==false,mansionFollow:settings().mansionFollow===true,mansionPresent:!!S.mansion,mansionNativeRangeGate:true,enabled:S.enabled,mode:'pet_fuwa_ride_mansion_native_basic_and_skills',reason:S.reason,lastError:S.lastError,scanMs,pollIntervalMs:S.timerMs,clientSkillCooldownMs:null,nativeAutoAttempts:S.nativeAutoAttempts,perCompanion:{...S.perCompanion},lastCompanion:S.lastCompanion,

    attempts:S.attempts,nativeCastSignals:S.nativeCastSignals,lastSkill:S.lastSkill,lastTarget:S.lastTarget,

    nativeRangeGate:true,rangePolicy:'same_verified_master_target',nativeAnimationGate:true,clientSkillWaitMs:null,

    contexts:['pet','fuwa','ride'].map(__captureESMFunction((__esmLocal22=(key=>{const ctx=prop(S.role,key+'Context'),sel=component(ctx,'_Eet'),cc=component(ctx,'_Het');return {kind:key,present:live(ctx),target:identity(cc?.target),skills:[...(sel?._rtt??[]),...(sel?._wet??[])].slice(0,12).map(__captureESMFunction((__esmLocal23=(r=>r.slice(0,3))),""))};})),"")),otherCompanions:'independent_native_basics_and_skills'};}
__esmLocal21=status;


  function stop(){S.enabled=false;if(S.timer!==null){(__getKVPV4()?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;}unbind();S.reason='stopped';return status();}
__esmLocal24=stop;


  W.KVPV_COMPANION_COMBAT=Object.freeze({sync,status,stop,_handoff:__captureESMFunction((__esmLocal25=(()=>({actor,attempts:S.attempts,nativeCastSignals:S.nativeCastSignals}))),"_handoff")});

  sync();if(owned())scheduleScan(nextScanInterval());

})),""))();


}
export {getKVPV_COMPANION_COMBAT} from '../api.mjs';
export const api=Object.freeze({
  get KVPV_COMPANION_COMBAT(){return globalThis.KVPV_COMPANION_COMBAT;},
});