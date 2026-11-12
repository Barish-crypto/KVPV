import {getKVPV_DAILY as __getKVPV0,getKVPV_EIGHT_CHEST as __getKVPV1,getKVPV_EIGHT_FLOOR as __getKVPV2,getKVPV_ENTRY_POLICY as __getKVPV3,getKVPV_EVENT_PRIORITY as __getKVPV4,getKVPV_HITRUN1 as __getKVPV5,getKVPV_TQ_SCOPE as __getKVPV6,getKVPV_V1 as __getKVPV7} from '../api.mjs';
export function call_KVPV_EIGHT_FLOOR_start(...args){const target=globalThis["KVPV_EIGHT_FLOOR"];const fn=globalThis["KVPV_EIGHT_FLOOR"]?.["start"];if(typeof fn!=='function')throw Error("KVPV_EIGHT_FLOOR.start is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_EIGHT_FLOOR_stop(...args){const target=globalThis["KVPV_EIGHT_FLOOR"];const fn=globalThis["KVPV_EIGHT_FLOOR"]?.["stop"];if(typeof fn!=='function')throw Error("KVPV_EIGHT_FLOOR.stop is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_EIGHT_FLOOR_status(...args){const target=globalThis["KVPV_EIGHT_FLOOR"];const fn=globalThis["KVPV_EIGHT_FLOOR"]?.["status"];if(typeof fn!=='function')throw Error("KVPV_EIGHT_FLOOR.status is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_EIGHT_FLOOR_sync(...args){const target=globalThis["KVPV_EIGHT_FLOOR"];const fn=globalThis["KVPV_EIGHT_FLOOR"]?.["sync"];if(typeof fn!=='function')throw Error("KVPV_EIGHT_FLOOR.sync is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_EIGHT_FLOOR__handoff(...args){const target=globalThis["KVPV_EIGHT_FLOOR"];const fn=globalThis["KVPV_EIGHT_FLOOR"]?.["_handoff"];if(typeof fn!=='function')throw Error("KVPV_EIGHT_FLOOR._handoff is not available");return Reflect.apply(fn,target,args);}
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
export {__esmLocal0 as local_anonymous_11_1_0};
export {__esmLocal1 as local_clock_1};
export {__esmLocal2 as local_anonymous_31_86_2};
export {__esmLocal3 as local_model_3};
export {__esmLocal4 as local_rpc_4};
export {__esmLocal5 as local_sceneRpc_5};
export {__esmLocal6 as local_owned_6};
export {__esmLocal7 as local_data_7};
export {__esmLocal8 as local_note_8};
export {__esmLocal9 as local_release_9};
export {__esmLocal10 as local_reserve_10};
export {__esmLocal11 as local_claim_11};
export {__esmLocal12 as local_refreshTarget_12};
export {__esmLocal13 as local_tick_13};
export {__esmLocal14 as local_status_14};
export {__esmLocal15 as local_stop_15};
export {__esmLocal16 as local_start_16};
export {__esmLocal17 as local__handoff_17};
export function initialize(){





/* Thien The 8 Tang: native map 7101 / scene type 71 / function 903.
 * Native references: copy_eight model _t8._w_t, controller _t8._Scn.
 * Entry ACK is the actual scene; reward ACK is rank state 2, never a send call.
 */

(__captureESMFunction((__esmLocal0=(() => {

  'use strict';

  const W=window,old=__getKVPV2(),carry=old?._handoff?.();old?.stop?.();

  const actor=String(W.__KVPV_OWN_ACTOR_ID||'');

  const C={enabled:true,pollMs:1000,entryRetryMs:30000,maxEntriesPerDay:15,entryTimeoutMs:25000,targetRefreshMs:10000};

  const same=carry?.actor===actor,storage='kvpv.eightfloor.completed.'+actor;let completedDay=same?carry.completedDay:'';try{completedDay=W.localStorage?.getItem(storage)||completedDay;}catch(_){}

  const S={timer:null,phase:same&&carry.phase==='EXITING'?'EXITING':'WAITING',reason:'starting',day:same?carry.day:'',attempts:same?carry.attempts:0,entries:0,enteredAt:0,lastEntry:-Infinity,

    lastTarget:-Infinity,session:false,lease:false,stageAuto:null,claimKeys:new Set(same?carry.claimKeys:[]),claimPending:same?carry.claimPending:null,rewardConfirmed:same?carry.rewardConfirmed:0,

    lastError:'',history:[],exitAt:0};

  const formatter=new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Ho_Chi_Minh',hourCycle:'h23',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit'});

  function clock(){const p=Object.fromEntries(formatter.formatToParts(new Date()).map(__captureESMFunction((__esmLocal2=(x=>[x.type,x.value])),"")));

    return {day:p.year+'-'+p.month+'-'+p.day,weekday:new Date(Date.UTC(+p.year,+p.month-1,+p.day)).getUTCDay(),minute:+p.hour*60+(+p.minute)};}
__esmLocal1=clock;


  const model=__captureESMFunction((__esmLocal3=(()=>W._Ba?._t8?._w_t?.ins)),"model");

  const rpc=__captureESMFunction((__esmLocal4=(()=>W._Ba?._t8?._Scn?.ins)),"rpc");

  const sceneRpc=__captureESMFunction((__esmLocal5=(()=>W._Ba?._sst?._Cht?.inst)),"sceneRpc");

  const owned=__captureESMFunction((__esmLocal6=(()=>actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED)),"owned");

  function data(){const c=clock(),m=model(),id=Number(W._C?._Mn?._Cn?.currentID??W._Ba?._$a?._yo?.ins?.intoSce?.[0]);

    const type=Number(W._ft?._po?.ins?.getCfgById?.(id)?.[7]??W._Ba?._$a?.SceneUtil?.curScene);

    const event=W._Ba?._sst?._ist?.inst?.getCpSceneStateByType?.(71);

    const serverTime=Number(W._Sa?.svrTime),next=Number(m?.nxtEnterTime);

    return {day:c.day,scheduled:[0,1,3,5].includes(c.weekday)&&c.minute>=1260&&c.minute<1290,

      ended:c.minute>=1290,map:id,type,inside:type===71,open:Number(event?.[2])===2,

      unlocked:W._Ba?._Do?._Ho?.inst?.getFcIsOpen?.(903)===true,

      cooldownReady:Number.isFinite(serverTime)&&Number.isFinite(next)&&next<=serverTime,
      serverTime:Number.isFinite(serverTime)?serverTime:null,nextEnterTime:Number.isFinite(next)?next:null,

      floor:Number(m?.curLayer)||null,score:m?.score??null,passed:m?.isPass===true,rank:m?.getRankInfo?.()??null};}
__esmLocal7=data;


  

  function note(kind){S.history.push({at:Date.now(),kind,phase:S.phase});if(S.history.length>50)S.history.shift();}
__esmLocal8=note;


  function release(){if(S.lease)W.KVPV?.core?.scene?.release?.('combat');S.lease=false;const m=W._Ba?._Co?._Mo?.ins;

    if(owned()&&S.stageAuto===true&&m?.auto===false&&!__getKVPV4()?.hold?.())m.auto=true;S.stageAuto=null;S.session=false;S.exitAt=0;}
__esmLocal9=release;


  function reserve(){

    const arbiter=W.KVPV?.core?.scene,m=W._Ba?._Co?._Mo?.ins;

    if(__getKVPV5()?.status?.(false)?.running)return false;

    if(typeof arbiter?.acquire!=='function')return false;

    if(S.stageAuto===null)S.stageAuto=m?.auto===true;

    if(m?.auto===true)m.auto=false;

    if(arbiter.acquire('combat','thien-the-8-tang')!==true){release();return false;}S.lease=true;return true;

  }
__esmLocal10=reserve;


  

  function claim(d){if(S.claimPending&&Number(d.rank?.[2])===2){S.rewardConfirmed++;S.claimPending=null;note('REWARD-CONFIRMED');}

    if(Number(d.rank?.[2])!==1||typeof rpc()?.getMyAwards!=='function')return;

    const key=d.day+'/'+String(d.rank?.[0])+'/'+String(d.rank?.[1]);if(S.claimKeys.has(key))return;

    S.claimKeys.add(key);S.claimPending=key;rpc().getMyAwards();note('REWARD-REQUEST');

  }
__esmLocal11=claim;


  

  function refreshTarget(){const m=model();if(!m||typeof m.setAutoTarget!=='function')return;

    const boss=m.getSpeBossInfo?.(),activeBoss=!!boss?.[1]&&!boss?.[3];

    const target=activeBoss?1:([1,2].includes(Number(m.getAutoTarget?.()))?Number(m.getAutoTarget()):2);

    if(target===1)m.setFirstBoss?.(false);m.setAutoTarget(target,true);S.lastTarget=Date.now();note('NATIVE-TARGET-'+target);

  }
__esmLocal12=refreshTarget;


  

  function tick(){if(__getKVPV3()?.manual===true)return;try{

    if(!C.enabled)return;
    // Session may momentarily be unavailable while the game reconnects.
    // Wait without sending commands; never permanently disable scheduled entry.
    if(!owned()){S.reason='actor_session_unavailable';return;}

    const d=data(),time=Date.now();if(S.day!==d.day){S.day=d.day;S.attempts=0;S.claimKeys.clear();}

    const top=d.inside&&(Number(W._Ba?._$a?._yo?.ins?.intoSce?.[3])===9||d.floor===9),chestDone=__getKVPV1()?.status?.()?.doneToday===true;

    const floorCompletion=!top&&d.passed&&Number(d.floor)>=8&&Number(d.rank?.[2])===2;
    if(chestDone||floorCompletion){completedDay=d.day;try{W.localStorage?.setItem(storage,completedDay);}catch(_){}}

    if(d.inside){

      if(!S.session){if(!reserve()){S.reason='scene_reserved_by_other_job';return;}S.session=true;S.entries++;S.enteredAt=time;S.lastTarget=-Infinity;rpc()?.getRankInfo?.();note('ENTRY-CONFIRMED');}

      W.KVPV?.core?.scene?.renew?.('combat');claim(d);
      // A stale local completion marker must not eject an unfinished run.
      if(!top&&completedDay===d.day&&Number(d.rank?.[2])!==2){completedDay='';try{W.localStorage?.removeItem(storage);}catch(_){}note('STALE-COMPLETION-CLEARED');}

      if(S.phase==='EXITING'){S.reason='waiting_exit_confirmation';return;}

      if(completedDay===d.day&&!S.claimPending&&(!top||chestDone)){S.reason='completed_and_rewarded_exit';if(typeof sceneRpc()?.rqEtScene==='function'){S.phase='EXITING';sceneRpc().rqEtScene(0);note('COMPLETED-EXIT-REQUEST');}return;}

      if(top&&!chestDone){S.phase='CLAIMING_CHEST';S.reason='floor9_waiting_native_chest_ack';return;}

      S.phase=d.passed?'COMPLETED':'FIGHTING';S.reason=d.passed?'server_passed_8_floors':'native_event_combat';

      if(W._Ba?._rJ?._O$?.ins?.isDead!==true&&!d.passed&&time-S.lastTarget>=C.targetRefreshMs)refreshTarget();

      if(d.ended&&!d.open){if(!S.exitAt)S.exitAt=time;if(time-S.exitAt>=35000&&typeof sceneRpc()?.rqEtScene==='function'){

        S.phase='EXITING';sceneRpc().rqEtScene(0);note('EXIT-REQUEST');}}

      return;

    }

    if(S.session){release();S.phase='WAITING';rpc()?.getRankInfo?.();note('LEFT-EVENT');}

    if(S.phase==='ENTERING'){

      if(time-S.lastEntry<C.entryTimeoutMs){S.reason='waiting_scene_71';return;}

      release();S.phase='WAITING';S.reason='entry_not_confirmed';note('ENTRY-TIMEOUT');

    }

    const quick=__getKVPV0()?.quickState?.(),job=quick?.job;

    // Daily reports idle in Vietnamese or English depending on its controller.
    const idle=job==null||['','rảnh','ranh','idle'].includes(String(job).trim().toLowerCase());

    if(!idle||__getKVPV6()?.inside?.()===true||__getKVPV5()?.status?.(false)?.running){S.reason='other_job_active';return;}

    if(W._Ba?._$a?.SceneUtil?.isCommonScene!==true){S.reason='outside_common_scene';return;}

    claim(d);

    if(completedDay===d.day&&Number(d.rank?.[2])!==2&&!chestDone){completedDay='';try{W.localStorage?.removeItem(storage);}catch(_){}note('STALE-COMPLETION-CLEARED');}
    if(completedDay===d.day){S.reason='completed_and_rewarded_today';return;}

    if(!d.scheduled||!d.open||!d.unlocked){S.reason='waiting_schedule_server_open_unlock';return;}

    if(d.passed){S.reason='already_passed';return;}

    if(W._Ba?._rJ?._O$?.ins?.isDead===true){S.reason='dead';return;}

    if(W._Ba?._cm?._q3t?.ins?.getHasTeams?.()){S.reason='in_team';return;}

    if(!d.cooldownReady||time-S.lastEntry<C.entryRetryMs||S.attempts>=C.maxEntriesPerDay){S.reason='entry_cooldown_or_limit';return;}

    if(typeof sceneRpc()?.rqEtScene!=='function'){
      S.reason='native_entry_api_unavailable';return;
    }
    if(!reserve()){
      S.reason='scene_denied:'+String(W.KVPV?.core?.scene?.reason?.('combat','thien-the-8-tang')??'arbiter_unavailable');
      return;
    }

    S.lastEntry=time;S.attempts++;S.phase='ENTERING';S.reason='waiting_scene_71';note('ENTRY-REQUEST');sceneRpc().rqEtScene(7101);

  }catch(e){S.lastError=String(e?.message||e);S.reason='error';}}
__esmLocal13=tick;


  

  function status(){return {...data(),enabled:C.enabled,phase:S.phase,reason:S.reason,entryAttempts:S.attempts,
      actorMatches:!!owned(),timerActive:S.timer!==null,
      dailyJob:__getKVPV0()?.quickState?.()?.job??null,
      commonScene:W._Ba?._$a?.SceneUtil?.isCommonScene===true,
      manualPolicy:__getKVPV3()?.manual===true,
      inTeam:!!W._Ba?._cm?._q3t?.ins?.getHasTeams?.(),
      bossRunning:__getKVPV5()?.status?.(false)?.running===true,

    completedDay,doneToday:completedDay===data().day,confirmedEntries:S.entries,rewardPending:!!S.claimPending,rewardConfirmed:S.rewardConfirmed,lastError:S.lastError,history:S.history.slice()};}
__esmLocal14=status;


  

  function stop(){C.enabled=false;if(S.timer!=null){(__getKVPV7()?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;}release();S.phase='OFF';S.reason='stopped';return {enabled:false};}
__esmLocal15=stop;


  

  function start(){C.enabled=true;if(S.timer==null){const schedule=__getKVPV7()?.timers?.setInterval??W.setInterval;if(typeof schedule==='function')S.timer=schedule(tick,C.pollMs);}tick();return status();}
__esmLocal16=start;


  W.KVPV_EIGHT_FLOOR=Object.freeze({start,stop,status,sync:tick,_handoff:__captureESMFunction((__esmLocal17=(()=>({actor,completedDay,day:S.day,attempts:S.attempts,phase:S.phase,claimKeys:[...S.claimKeys],claimPending:S.claimPending,rewardConfirmed:S.rewardConfirmed}))),"_handoff")});start();

})),""))();


}
export {getKVPV_EIGHT_FLOOR} from '../api.mjs';
export const api=Object.freeze({
  get KVPV_EIGHT_FLOOR(){return globalThis.KVPV_EIGHT_FLOOR;},
});