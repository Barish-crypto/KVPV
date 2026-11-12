import {getKVPV_CONTEXT_BRAIN as __getKVPV0,getKVPV_DAILY as __getKVPV1,getKVPV_ENTRY_POLICY as __getKVPV2,getKVPV_EVENT_PRIORITY as __getKVPV3,getKVPV_RED_DOT_MODULE as __getKVPV4,getKVPV_V1 as __getKVPV5,getKVPV_WORLD_EYE as __getKVPV6} from '../api.mjs';
export function call_KVPV_CONTEXT_BRAIN_activity(...args){const target=globalThis["KVPV_CONTEXT_BRAIN"];const fn=globalThis["KVPV_CONTEXT_BRAIN"]?.["activity"];if(typeof fn!=='function')throw Error("KVPV_CONTEXT_BRAIN.activity is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_CONTEXT_BRAIN_plan(...args){const target=globalThis["KVPV_CONTEXT_BRAIN"];const fn=globalThis["KVPV_CONTEXT_BRAIN"]?.["plan"];if(typeof fn!=='function')throw Error("KVPV_CONTEXT_BRAIN.plan is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_CONTEXT_BRAIN_status(...args){const target=globalThis["KVPV_CONTEXT_BRAIN"];const fn=globalThis["KVPV_CONTEXT_BRAIN"]?.["status"];if(typeof fn!=='function')throw Error("KVPV_CONTEXT_BRAIN.status is not available");return Reflect.apply(fn,target,args);}
function __captureESMFunction(fn,name){
  if(fn.name!==name)Object.defineProperty(fn,"name",{value:name,configurable:true});
  return fn;
}
let __esmLocal0;
let __esmLocal1;
let __esmLocal2;
export {__esmLocal0 as local_anonymous_4_1_0};
export {__esmLocal1 as local_activity_1};
export {__esmLocal2 as local_plan_2};
export function initialize(){

/* Context decisions use native state; only the existing stage controller executes PvE. */

(__captureESMFunction((__esmLocal0=(() => {

  'use strict';

  const W=window,actor=String(W.__KVPV_OWN_ACTOR_ID||'');
  const profileKey='KVPV_CONTEXT_BRAIN_PROFILE_V1:'+encodeURIComponent(actor);
  const maxContexts=1000,maxActionsPerContext=30,maxProfileChars=2000000;
  const profileState={status:'not_loaded',error:''};
  let savedProfile=null,profileLoaded=false;
  const autoPve={enabled:false,timer:null,startedAt:0,ownedStage:false,attempts:0,reason:'starting',lastError:''};
  const stageProgress={key:'',map:null,level:null,samples:0,lastChangeAt:0,completed:0,mapChanges:0};

  function observeStageProgress(now=Date.now()){
    const stage=W._Ba?._Co?._Mo?.ins;
    if(stage?.auto!==true){stageProgress.key='';stageProgress.samples=0;return;}
    const map=Number(W._Ba?._$a?._yo?.ins?.intoSce?.[0]),level=Number(stage.curLv);
    if(!Number.isSafeInteger(map)||map<1||!Number.isSafeInteger(level)||level<1)return;
    const key=map+':'+level;
    if(!stageProgress.key){
      stageProgress.key=key;stageProgress.map=map;stageProgress.level=level;
      stageProgress.samples=1;stageProgress.lastChangeAt=now;return;
    }
    if(key!==stageProgress.key){
      if(map===stageProgress.map&&level>stageProgress.level)stageProgress.completed+=level-stageProgress.level;
      if(map!==stageProgress.map)stageProgress.mapChanges++;
      stageProgress.key=key;stageProgress.map=map;stageProgress.level=level;
      stageProgress.samples=1;stageProgress.lastChangeAt=now;return;
    }
    stageProgress.samples=Math.min(1000000,stageProgress.samples+1);
  }

  function progressSnapshot(now=Date.now()){
    const stage=W._Ba?._Co?._Mo?.ins,active=stage?.auto===true&&!!stageProgress.key;
    const unchangedMs=active?Math.max(0,now-stageProgress.lastChangeAt):0;
    return {active,map:active?stageProgress.map:null,level:active?stageProgress.level:null,
      samples:active?stageProgress.samples:0,unchangedMs,
      possibleStall:active&&stageProgress.samples>=4&&unchangedMs>=60000,
      confidence:'low',completedStages:stageProgress.completed,mapChanges:stageProgress.mapChanges};
  }

  function autoPveStatus(){
    const daily=__getKVPV1(),stage=W._Ba?._Co?._Mo?.ins;
    return {enabled:autoPve.enabled,scope:'native_stage_progression_only',executor:'KVPV_DAILY.tuVuotIdle',
      ownedStage:autoPve.ownedStage,gameAuto:stage?.auto===true,attempts:autoPve.attempts,
      startedAt:autoPve.startedAt||null,reason:autoPve.reason,lastError:autoPve.lastError,
      controllerEnabled:daily?.tuVuotCanRun?.()===true,progress:progressSnapshot()};
  }

  function autoPveTick(){
    if(!autoPve.enabled)return autoPveStatus();
    const daily=__getKVPV1();
    try{
      if(!actor||actor!==String(W._Ba?._rJ?._O$?.ins?.actorId??'')||W.__KVPV_UNIVERSAL_HALTED){
        autoPve.reason='actor_or_session';return autoPveStatus();
      }
      if(W._Ba?._rJ?._O$?.ins?.isDead===true){autoPve.reason='actor_dead';return autoPveStatus();}
      observeStageProgress();
      if(__getKVPV2()?.manual===true){autoPve.reason='manual_entry_policy';return autoPveStatus();}
      if(Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)){autoPve.reason='user_ui_active';return autoPveStatus();}
      if(W.KVPV?.stageGuard?.isLocked?.()===true){autoPve.reason='stage_manually_paused';return autoPveStatus();}
      if(__getKVPV4()?.ownsProgression?.()===true){autoPve.reason='red_dot_progression_owner';return autoPveStatus();}
      const eventHold=__getKVPV3()?.hold?.();
      if(eventHold){autoPve.reason='event_reservation_'+String(eventHold.key??'active');return autoPveStatus();}
      const scene=W.KVPV?.core?.scene;
      if(typeof scene?.can!=='function'||typeof scene?.acquire!=='function'){
        autoPve.reason='scene_arbiter_unavailable';return autoPveStatus();
      }
      if(scene.can('stage')!==true){
        autoPve.reason=String(scene.reason?.('stage')??'scene_reserved');return autoPveStatus();
      }
      if(daily?.tuVuotCanRun?.()!==true){autoPve.reason='stage_controller_disabled';return autoPveStatus();}
      if(typeof daily?.tuVuotIdle!=='function')throw Error('KVPV_DAILY.tuVuotIdle is unavailable');
      if(autoPve.ownedStage){
        if(typeof daily.tuVuotProgressTick==='function')daily.tuVuotProgressTick();
        if(W._Ba?._Co?._Mo?.ins?.auto===true){
          autoPve.reason='native_stage_running';autoPve.lastError='';return autoPveStatus();
        }
        autoPve.ownedStage=false;
      }
      if(daily.tuVuotIdle()===true){
        autoPve.ownedStage=true;autoPve.attempts++;autoPve.reason='native_stage_started';
      }else autoPve.reason='waiting_native_stage_condition';
      autoPve.lastError='';
    }catch(error){
      autoPve.lastError=String(error?.message??error).slice(0,200);
      autoPve.reason='executor_error';
      console.error('[KVPV CONTEXT BRAIN] PvE executor tick failed:',error);
    }
    return autoPveStatus();
  }

  function startAutoPve({resumeController=false}={}){
    if(autoPve.enabled)return autoPveStatus();
    if(!actor||actor!==String(W._Ba?._rJ?._O$?.ins?.actorId??'')||W.__KVPV_UNIVERSAL_HALTED)
      return { ...autoPveStatus(), enabled:false, reason:'actor_or_session' };
    const daily=__getKVPV1();
    if(resumeController&&daily?.tuVuotCanRun?.()!==true){
      if(typeof daily?.tuVuotStart!=='function')return { ...autoPveStatus(), reason:'stage_controller_unavailable' };
      daily.tuVuotStart();
    }
    const schedule=__getKVPV5()?.timers?.setInterval??W.setInterval;
    if(typeof schedule!=='function')return { ...autoPveStatus(), reason:'timer_unavailable' };
    autoPve.enabled=true;autoPve.startedAt=Date.now();autoPve.reason='starting';autoPve.lastError='';
    try{autoPve.timer=schedule(autoPveTick,1000);}
    catch(error){
      autoPve.enabled=false;autoPve.startedAt=0;autoPve.reason='timer_error';
      autoPve.lastError=String(error?.message??error).slice(0,200);
      console.error('[KVPV CONTEXT BRAIN] Cannot start PvE scheduler:',error);
      return autoPveStatus();
    }
    autoPveTick();
    return autoPveStatus();
  }

  function stopAutoPve(){
    if(autoPve.timer!==null){
      const cancel=__getKVPV5()?.timers?.clearInterval??W.clearInterval;
      if(typeof cancel!=='function')throw Error('PvE brain timer cannot be cancelled');
      cancel(autoPve.timer);autoPve.timer=null;
    }
    if(autoPve.ownedStage){
      const daily=__getKVPV1();
      if(typeof daily?.tuVuotStop!=='function')throw Error('Owned native stage controller cannot be stopped');
      daily.tuVuotStop();autoPve.ownedStage=false;
    }
    autoPve.enabled=false;autoPve.startedAt=0;autoPve.reason='stopped';
    return autoPveStatus();
  }

  function initializeAutoPve(){
    if(!actor||actor!==String(W._Ba?._rJ?._O$?.ins?.actorId??'')||W.__KVPV_UNIVERSAL_HALTED)return;
    startAutoPve();
  }

  function blankProfile(){return {version:1,actor,updatedAt:0,contexts:[]};}

  function storageError(status,error){
    profileState.status=status;
    profileState.error=String(error?.message??error??status).slice(0,200);
    console.warn('[KVPV CONTEXT BRAIN] profile storage '+status+': '+profileState.error);
  }

  function validProfile(value){
    if(!value||typeof value!=='object'||Array.isArray(value)||value.version!==1||value.actor!==actor||
      !Array.isArray(value.contexts)||value.contexts.length>maxContexts)return false;
    return value.contexts.every(c=>c&&typeof c==='object'&&!Array.isArray(c)&&
      Number.isSafeInteger(c.map)&&c.map>0&&typeof c.target==='string'&&c.target.length<=80&&
      typeof c.activity==='string'&&c.activity.length<=40&&
      typeof c.job==='string'&&c.job.length<=40&&Number.isSafeInteger(c.observations)&&c.observations>=0&&
      Number.isFinite(c.lastObservedAt)&&Array.isArray(c.actions)&&c.actions.length<=maxActionsPerContext&&
      c.actions.every(a=>a&&typeof a==='object'&&Number.isSafeInteger(a.panel)&&a.panel>=0&&
        typeof a.kind==='string'&&a.kind.length<=32&&Number.isSafeInteger(a.seen)&&a.seen>=0&&
        Number.isSafeInteger(a.ready)&&a.ready>=0&&a.ready<=a.seen&&Number.isFinite(a.lastSeen)));
  }

  function loadProfile(){
    if(profileLoaded)return savedProfile;
    if(!actor){storageError('unavailable','actor identity is unavailable');profileLoaded=true;return null;}
    try{
      const storage=W.localStorage;
      if(typeof storage?.getItem!=='function'){storageError('unavailable','localStorage.getItem is not available');profileLoaded=true;return null;}
      const raw=storage.getItem(profileKey);
      if(raw===null){savedProfile=blankProfile();profileState.status='ready';profileState.error='';profileLoaded=true;return savedProfile;}
      if(typeof raw!=='string'||raw.length>maxProfileChars){storageError('corrupt','stored profile exceeds its size limit');profileLoaded=true;return null;}
      const parsed=JSON.parse(raw);
      if(!validProfile(parsed)){storageError('corrupt','stored profile failed validation');profileLoaded=true;return null;}
      savedProfile=parsed;profileState.status='ready';profileState.error='';profileLoaded=true;
      return savedProfile;
    }catch(error){storageError('error',error);profileLoaded=true;return null;}
  }

  function persistProfile(){
    if(!savedProfile||profileState.status==='corrupt'||profileState.status==='error'||profileState.status==='unavailable')return false;
    try{
      const storage=W.localStorage;
      if(typeof storage?.setItem!=='function')throw Error('localStorage.setItem is not available');
      storage.setItem(profileKey,JSON.stringify(savedProfile));
      profileState.status='ready';profileState.error='';return true;
    }catch(error){storageError('error',error);return false;}
  }

  function profileSnapshot(){
    const data=loadProfile();
    return {enabled:true,status:profileState.status,error:profileState.error,actorScoped:true,
      maxContexts,maxActionsPerContext,contexts:data?data.contexts.map(c=>({...c,actions:c.actions.map(a=>({...a}))})):[]};
  }

  function clearProfile(){
    try{
      if(!actor)throw Error('actor identity is unavailable');
      const storage=W.localStorage;
      if(typeof storage?.removeItem!=='function')throw Error('localStorage.removeItem is not available');
      storage.removeItem(profileKey);
      savedProfile=blankProfile();profileLoaded=true;profileState.status='ready';profileState.error='';
      return {ok:true,profile:profileSnapshot()};
    }catch(error){storageError('error',error);return {ok:false,status:profileState.status,error:profileState.error};}
  }

  function activity(){

    if(!actor||actor!==String(W._Ba?._rJ?._O$?.ins?.actorId??'')||W.__KVPV_UNIVERSAL_HALTED)return {kind:'UNAVAILABLE',direct:false,reason:'actor_or_session'};

    if(W._Ba?._rJ?._O$?.ins?.isDead===true)return {kind:'DEAD',direct:false,reason:'wait_revive'};

    const q=__getKVPV1()?.quickState?.();

    if(['entering','exiting','matching','result'].includes(q?.step))return {kind:'TRANSITION',direct:false,reason:q.step};

    const ui=W._ft?._Y4n?.ins,Type=W._Ba?._We?._p9i,p=ui?.getPanelById?.(297),m=W._Ba?._We?._eJ?.inst;

    const mission=W._Ba?._$a?._yo?.ins?.isInMission===true;

    if(mission&&typeof Type==='function'&&p instanceof Type&&p.parent&&p.visible!==false&&ui?.isOpened?.(297)===true&&Number(m?.cpInfo?.[0])>0)

      return {kind:'TRAN_MA',direct:q?.running===true,reason:'native_panel_and_active_timer',remainingMs:Number(m.cpInfo[0]),damage:String(m.ht??'').slice(0,80)};

    if(q?.running===true&&q.step==='fighting')return {kind:'DAILY_FIGHT',direct:true,reason:String(q.job??'').slice(0,80)};

    if(!mission&&W._Ba?._$a?.SceneUtil?.isCommonScene===true)return {kind:'COMMON',direct:false,reason:'idle_rules_apply'};

    return {kind:'OTHER_MAP',direct:false,reason:'use_existing_combat_scope_rules'};

  }
__esmLocal1=activity;


  function buildPlan(record){
    const context=activity(),eye=__getKVPV6()?.status?.(),actions=[],profile=loadProfile();

    for(const a of (eye?.actions??[]).slice(0,80))actions.push({panel:a.panel,key:a.key,kind:a.kind,

      decision:a.kind==='manual_control'?'manual_only':a.kind==='paid_or_currency'?'blocked_currency':a.kind==='unknown'?'inspect_only':!a.ready?'wait_native_condition':

        a.kind==='navigate'&&context.kind!=='COMMON'?'defer_until_activity_finishes':'ready_for_review'});

    const learned=new Map();
    const map=Number(W._C?._Mn?._Cn?.currentID??W._Ba?._$a?._yo?.ins?.intoSce?.[0]);
    const job=String(__getKVPV1()?.quickState?.()?.job??'').slice(0,40);
    const role=W._C?._Ba?.instance?.getRole?.(Number(actor));
    const target=role?.getComponent?.(W._d?._Yct?._Het)?.target;
    const targetType=Number(target?.property?.get?.('type'));
    const targetId=targetType===1?String(target?.property?.get?.('id')??target?.id??'').slice(0,80):'';
    const stableContext=Number.isSafeInteger(map)&&map>0&&targetType!==4&&context.kind!=='UNAVAILABLE'&&context.kind!=='TRANSITION'&&context.kind!=='DEAD';
    const currentProfile=profile&&stableContext?profile.contexts.find(c=>c.map===map&&c.target===targetId&&c.activity===context.kind&&c.job===job):null;
    for(const a of currentProfile?.actions??[])learned.set(a.panel+':'+a.kind,a);
    for(const a of actions){
      const panel=Number(a.panel),history=Number.isSafeInteger(panel)?learned.get(panel+':'+String(a.kind)):null;
      a.history={observations:history?.seen??0,readyRate:history?.seen?history.ready/history.seen:null};
    }

    const priority={ready_for_review:4,wait_native_condition:3,defer_until_activity_finishes:2,inspect_only:1,manual_only:0,blocked_currency:0};
    actions.sort((a,b)=>(priority[b.decision]??1)-(priority[a.decision]??1)||
      (b.history.observations>=3?(b.history.readyRate??0):-1)-(a.history.observations>=3?(a.history.readyRate??0):-1));

    if(record&&profile&&stableContext){
      let entry=profile.contexts.find(c=>c.map===map&&c.target===targetId&&c.activity===context.kind&&c.job===job);
      if(!entry){entry={map,target:targetId,activity:context.kind,job,observations:0,lastObservedAt:0,actions:[]};profile.contexts.push(entry);}
      entry.observations=Math.min(1000000,entry.observations+1);entry.lastObservedAt=Date.now();
      for(const a of (eye?.actions??[]).slice(0,80)){
        const panel=Number(a.panel),kind=String(a.kind??'').slice(0,32);
        if(!Number.isSafeInteger(panel)||panel<0||!kind)continue;
        let seen=entry.actions.find(x=>x.panel===panel&&x.kind===kind);
        if(!seen){seen={panel,kind,seen:0,ready:0,lastSeen:0};entry.actions.push(seen);}
        seen.seen=Math.min(1000000,seen.seen+1);
        if(a.ready===true)seen.ready=Math.min(seen.seen,seen.ready+1);
        seen.lastSeen=entry.lastObservedAt;
      }
      entry.actions.sort((a,b)=>b.lastSeen-a.lastSeen);
      entry.actions=entry.actions.slice(0,maxActionsPerContext);
      profile.contexts=profile.contexts.filter(c=>c!==entry);
      profile.contexts.unshift(entry);
      profile.contexts=profile.contexts.slice(0,maxContexts);
      profile.updatedAt=entry.lastObservedAt;
      persistProfile();
    }

    return {context,profile:profileSnapshot(),autoPve:autoPveStatus(),policy:{automation:'auto_existing_pve',executorCalls:'verified_native_stage_controller_only',
      gameCommands:'existing_native_controller_only',automaticNavigation:false,
      keepCurrentActivity:context.kind!=='COMMON',directRewardsAndUpgrades:context.direct,

      noKNB:true,unknownActions:'inspect_only',sceneChanges:'recommend_only'},actions};

  }
  function plan(){return buildPlan(true);}
  function status(){return buildPlan(false);}
__esmLocal2=plan;


  W.KVPV_CONTEXT_BRAIN=Object.freeze({activity,plan,status,profile:profileSnapshot,clearProfile,
    startAutoPve:()=>startAutoPve({resumeController:true}),
    stopAutoPve,autoPveStatus});
  initializeAutoPve();

})),""))();


}
export {getKVPV_CONTEXT_BRAIN} from '../api.mjs';
export const api=Object.freeze({
  get KVPV_CONTEXT_BRAIN(){return globalThis.KVPV_CONTEXT_BRAIN;},
});