import {getKVPV_CONFIRM_POPUPS as __getKVPV0,getKVPV_DAILY as __getKVPV1,getKVPV_DAILY_TRIAL as __getKVPV2,getKVPV_EIGHT_FLOOR as __getKVPV3,getKVPV_FAR_SCOPE as __getKVPV4,getKVPV_HITRUN1 as __getKVPV5,getKVPV_MODE as __getKVPV6,getKVPV_TQ_SCOPE as __getKVPV7} from '../api.mjs';
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
export {__esmLocal0 as local_anonymous_8_1_0};
export {__esmLocal1 as local_now_1};
export {__esmLocal2 as local_actorValid_2};
export {__esmLocal3 as local_dailyJob_3};
export {__esmLocal4 as local_hitrunRunning_4};
export {__esmLocal5 as local_stageState_5};
export {__esmLocal6 as local_lease_6};
export {__esmLocal7 as local_yieldStageForCombat_7};
export {__esmLocal8 as local_log_8};
export {__esmLocal9 as local_eightEntryReady_9};
export {__esmLocal10 as local_conflict_10};
export {__esmLocal11 as local_can_11};
export {__esmLocal12 as local_reason_12};
export {__esmLocal13 as local_acquire_13};
export {__esmLocal14 as local_renew_14};
export {__esmLocal15 as local_release_15};
export {__esmLocal16 as local_status_16};
export {__esmLocal17 as local_history_17};
export {__esmLocal18 as local_start_18};
export {__esmLocal19 as local_stop_19};
export {__esmLocal20 as local_status_20};

export function createCombatDispatcher({now=Date.now,context=()=>'',settleMs=250,ttlMs=1200}={}){
  if(typeof now!=='function'||typeof context!=='function'||
     !Number.isFinite(settleMs)||settleMs<0||
     !Number.isFinite(ttlMs)||ttlMs<settleMs)
    throw new TypeError('Invalid combat dispatcher options');

  let contextKey=null;
  const lanes=new Map();

  function laneFor(name){
    let lane=lanes.get(name);
    if(!lane){lane={candidates:new Map(),owner:null,ownerSince:0};lanes.set(name,lane);}
    return lane;
  }

  function refreshContext(){
    const next=String(context());
    if(next!==contextKey){contextKey=next;lanes.clear();}
  }

  function select(lane,at){
    for(const [sender,candidate]of lane.candidates)
      if(candidate.expiresAt<=at)lane.candidates.delete(sender);
    const winner=[...lane.candidates.entries()].sort((a,b)=>
      b[1].priority-a[1].priority||a[1].firstSeen-b[1].firstSeen||
      (a[0]<b[0]?-1:a[0]>b[0]?1:0))[0]?.[0]??null;
    if(winner!==lane.owner){lane.owner=winner;lane.ownerSince=at;}
    return winner;
  }

  function claim(sender,priority,channel='player'){
    if(typeof sender!=='string'||!/^[a-z0-9._-]{1,64}$/i.test(sender)||
       !Number.isSafeInteger(priority)||priority<0||priority>100||
       !['player','companion'].includes(channel))
      throw new TypeError('Invalid combat sender claim');
    refreshContext();
    const at=now(),lane=laneFor(channel),previous=lane.candidates.get(sender);
    lane.candidates.set(sender,{priority,firstSeen:previous?.priority===priority?previous.firstSeen:at,expiresAt:at+ttlMs});
    return select(lane,at)===sender&&at-lane.ownerSince>=settleMs;
  }

  function withdraw(sender,channel='player'){
    if(typeof sender!=='string'||!['player','companion'].includes(channel))
      throw new TypeError('Invalid combat sender withdrawal');
    refreshContext();
    const lane=lanes.get(channel);
    if(!lane)return false;
    const removed=lane.candidates.delete(sender);
    select(lane,now());
    return removed;
  }

  function status(){
    refreshContext();
    const at=now(),result={context:contextKey,lanes:{}};
    for(const [name,lane]of lanes){
      select(lane,at);
      result.lanes[name]={
        owner:lane.owner,
        settlingMs:lane.owner===null?0:Math.max(0,settleMs-(at-lane.ownerSince)),
        candidates:[...lane.candidates.entries()].map(([sender,value])=>({
          sender,priority:value.priority,expiresInMs:Math.max(0,value.expiresAt-at)
        }))
      };
    }
    return result;
  }

  function reset(){contextKey=null;lanes.clear();}

  return Object.freeze({claim,withdraw,status,reset});
}

export function initialize(){





/* V10.1: scene arbitration / independent core API. No game RPC or timers. */

(__captureESMFunction((__esmLocal0=(() => {

  'use strict';

  const W=window, NS=W.KVPV||(W.KVPV={});

  const initialActor=String(W.__KVPV_OWN_ACTOR_ID||'');

  const opts={enabled:true, leaseMs:4000, maxHistory:60};

  const state={lease:null, denied:0, grants:0, history:[]};

  const now=__captureESMFunction((__esmLocal1=(()=>Date.now())),"now");

  const combatDispatcher=createCombatDispatcher({
    now,
    context:()=>[
      String(W._Ba?._rJ?._O$?.ins?.actorId??initialActor),
      Number(W._C?._Mn?._Cn?.currentID??W._Ba?._$a?._yo?.ins?.intoSce?.[0]),
      Number(W._Ba?._$a?._yo?.ins?.intoSce?.[0]),
      Number(W._Ba?._$a?.SceneUtil?.curScene)
    ].join(':')
  });

  

  function actorValid(){

    if(W.__KVPV_UNIVERSAL_HALTED)return false;

    if(!initialActor)return true; // permits offline isolated tests

    try{return String(_Ba?._rJ?._O$?.ins?.actorId??'')===initialActor;}

    catch(_){return false;}

  }
__esmLocal2=actorValid;


  

  function dailyJob(){

    try{const q=__getKVPV1()?.quickState?.();return q?.job&&q.job!=='rảnh'&&q.job!=='ranh'?String(q.job):null;}

    catch(_){return null;}

  }
__esmLocal3=dailyJob;


  

  function hitrunRunning(){

    try{return __getKVPV5()?.status?.(false)?.running===true;}

    catch(_){return false;}

  }
__esmLocal4=hitrunRunning;


  

  function stageState(){

    try{

      const m=_Ba?._Co?._Mo?.ins;

      const stageAuto=m?.auto===true;

      const current=Number(_Ba?._$a?._yo?.ins?.intoSce?.[0]);

      const stageMap=Number(_ft?._h$?.ins?.getCfgByLv?.(m?.curLv)?.[0]);

      const common=_Ba?._$a?.SceneUtil?.isCommonScene===true;

      return {auto:stageAuto,inside:!common&&Number.isFinite(stageMap)&&stageMap>0&&current===stageMap};

    }catch(_){return {auto:false,inside:false};}

  }
__esmLocal5=stageState;


  

  function lease(){if(state.lease&&state.lease.until<=now())state.lease=null;return state.lease;}
__esmLocal6=lease;


  function yieldStageForCombat(){

    const l=lease(),scope=__getKVPV4()?.status?.();

    if(l?.who==='stage'&&l.tag==='tu-vuot'&&actorValid()&&!dailyJob()&&scope?.kind==='THIEN_QUAN'&&scope.inside===true&&__getKVPV6()?.status?.(false)?.pendingTianQuanMode){

      state.lease=null;log('handoff','stage','verified Tian Quan combat');return true;

    }

    return false;

  }
__esmLocal7=yieldStageForCombat;


  

  function log(event,who,why){

    state.history.push({time:now(),event,who,why});

    if(state.history.length>opts.maxHistory)state.history.shift();

  }
__esmLocal8=log;


  

  // Only a real, open Eight Floor window may outrank the overlapping
  // Tranh Ba Dinh Cao timetable reservation. Do NOT bypass actual scene
  // owners, an active Daily job, native stage combat, or server entry gates.
  function eightEntryReady(who,tag){
    if(who!=='combat'||tag!=='thien-the-8-tang')return false;
    try{
      const d=__getKVPV3()?.status?.();
      return d?.enabled===true&&d?.scheduled===true&&d?.open===true&&
        d?.unlocked===true&&d?.cooldownReady===true&&
        d?.inside===false&&d?.doneToday!==true&&
        W._Ba?._$a?.SceneUtil?.isCommonScene===true&&
        __getKVPV2()?.status?.()?.inFlight!==true;
    }catch(_){return false;}
  }
__esmLocal9=eightEntryReady;

  function conflict(who,tag=''){

    if(!actorValid())return 'actor/session unavailable';

    if(!opts.enabled)return 'core stopped';

    if(who==='combat')yieldStageForCombat();

    const j=dailyJob(),s=stageState(),l=lease(),eight=eightEntryReady(who,tag);

    

    

    if(tag!=='daily-trial'&&!j&&!hitrunRunning()&&!s.inside&&

       (!l||l.who!=='combat'||l.tag==='daily-trial')&&__getKVPV2()?.hasPriority?.()===true)

      return 'priority: daily trial';

    // V10.2: a reservation prevents NEW scene work only; never kicks an active fight.

    if(tag!=='daily-trial'&&(who==='combat'||who==='stage') && !hitrunRunning() && !j && !s.inside && !['LINH_LUNG','PHU_VAN','TRU_TIEN'].includes(__getKVPV4()?.status?.().kind)){

      const hold=W.KVPV?.timeline?.reservation?.({

        atMs:now(),flags:__getKVPV1()?.config||null,forTask:who

      });

      if(hold&&!(eight&&hold.key==='tranh_ba_dinh_cao'))return 'upcoming event '+hold.key+' ('+hold.time+')';

    }

    if(who==='combat'){

      if(j)return 'daily job '+j;

      const controlledStage=(__getKVPV4()??__getKVPV7())?.inside?.()===true&&!!__getKVPV6()?.status?.(false)?.pendingTianQuanMode;

      if((s.auto||s.inside)&&!controlledStage)return 'native Tu Vuot';

      if(l&&l.who!==who)return 'reserved by '+l.who;

    }else if(who==='stage'){

      if(j)return 'daily job '+j;

      if(hitrunRunning())return 'HitRun active';

      if(l&&l.who!==who)return 'reserved by '+l.who;

    }else if(who==='daily'){

      if(hitrunRunning())return 'HitRun active';

      if(s.inside)return 'Tu Vuot scene';

      if(l&&l.who==='combat')return 'reserved by combat';

    }else return 'invalid owner';

    return null;

  }
__esmLocal10=conflict;


  const scene=Object.freeze({

    can:__captureESMFunction((__esmLocal11=((who)=>conflict(who)===null)),"can"),

    reason:__captureESMFunction((__esmLocal12=((who,tag='')=>conflict(who,tag))),"reason"),

    combat:Object.freeze({
      claim(sender,priority,channel='player'){
        return actorValid()&&opts.enabled&&combatDispatcher.claim(sender,priority,channel);
      },
      withdraw(sender,channel='player'){return combatDispatcher.withdraw(sender,channel);},
      status(){return combatDispatcher.status();}
    }),

    acquire(who,tag=''){
__esmLocal13=__captureESMMethod(this,"acquire","init");


      if(__getKVPV0()?.beforeTask?.()===true){state.denied++;log('denied',who,'priority: agree popup');return false;}

      const reason=conflict(who,tag);

      if(reason){state.denied++;log('denied',who,reason);return false;}

      state.lease={who,tag:String(tag),until:now()+opts.leaseMs};state.grants++;

      return true;

    },

    renew(who){
__esmLocal14=__captureESMMethod(this,"renew","init");
if(who==='stage'&&yieldStageForCombat())return false;const l=lease();if(!l||l.who!==who)return false;l.until=now()+opts.leaseMs;return true;},

    release(who){
__esmLocal15=__captureESMMethod(this,"release","init");
const l=lease();if(l?.who===who){state.lease=null;return true;}return false;},

    status(){
__esmLocal16=__captureESMMethod(this,"status","init");
const l=lease(),stage=stageState();return {

      owner:l?.who||null,tag:l?.tag||null,ttlMs:l?Math.max(0,l.until-now()):0,

      dailyJob:dailyJob(),combatRunning:hitrunRunning(),stage,

      denied:state.denied,grants:state.grants,

      canCombat:!conflict('combat'),canDaily:!conflict('daily'),canStage:!conflict('stage'),
      combatDispatch:combatDispatcher.status()};},

    history:__captureESMFunction((__esmLocal17=(()=>state.history.slice())),"history")

  });

  NS.core=Object.freeze({version:'10.1.0',config:opts,scene,

    start(){
__esmLocal18=__captureESMMethod(this,"start","init");
opts.enabled=true;return this.status();},

    stop(){
__esmLocal19=__captureESMMethod(this,"stop","init");
opts.enabled=false;state.lease=null;combatDispatcher.reset();return this.status();},

    status(){
__esmLocal20=__captureESMMethod(this,"status","init");
return {version:'10.1.0',enabled:opts.enabled,scene:scene.status()};}

  });

})),""))();


}
export const api=Object.freeze({
});