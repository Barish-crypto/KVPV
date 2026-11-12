




/* Thien The 8 Tang: native map 7101 / scene type 71 / function 903.
 * Native references: copy_eight model _t8._w_t, controller _t8._Scn.
 * Entry ACK is the actual scene; reward ACK is rank state 2, never a send call.
 */

(() => {

  'use strict';

  const W=window,old=W.KVPV_EIGHT_FLOOR,carry=old?._handoff?.();old?.stop?.();

  const actor=String(W.__KVPV_OWN_ACTOR_ID||'');

  const C={enabled:true,pollMs:1000,entryRetryMs:30000,maxEntriesPerDay:15,entryTimeoutMs:25000,targetRefreshMs:10000};

  const same=carry?.actor===actor,storage='kvpv.eightfloor.completed.'+actor;let completedDay=same?carry.completedDay:'';try{completedDay=W.localStorage?.getItem(storage)||completedDay;}catch(_){}

  const S={timer:null,phase:same&&carry.phase==='EXITING'?'EXITING':'WAITING',reason:'starting',day:same?carry.day:'',attempts:same?carry.attempts:0,entries:0,enteredAt:0,lastEntry:-Infinity,

    lastTarget:-Infinity,session:false,lease:false,stageAuto:null,claimKeys:new Set(same?carry.claimKeys:[]),claimPending:same?carry.claimPending:null,rewardConfirmed:same?carry.rewardConfirmed:0,

    lastError:'',history:[],exitAt:0};

  const formatter=new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Ho_Chi_Minh',hourCycle:'h23',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit'});

  function clock(){const p=Object.fromEntries(formatter.formatToParts(new Date()).map(x=>[x.type,x.value]));

    return {day:p.year+'-'+p.month+'-'+p.day,weekday:new Date(Date.UTC(+p.year,+p.month-1,+p.day)).getUTCDay(),minute:+p.hour*60+(+p.minute)};}

  const model=()=>W._Ba?._t8?._w_t?.ins;

  const rpc=()=>W._Ba?._t8?._Scn?.ins;

  const sceneRpc=()=>W._Ba?._sst?._Cht?.inst;

  const owned=()=>actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;

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

  

  function note(kind){S.history.push({at:Date.now(),kind,phase:S.phase});if(S.history.length>50)S.history.shift();}

  function release(){if(S.lease)W.KVPV?.core?.scene?.release?.('combat');S.lease=false;const m=W._Ba?._Co?._Mo?.ins;

    if(owned()&&S.stageAuto===true&&m?.auto===false&&!W.KVPV_EVENT_PRIORITY?.hold?.())m.auto=true;S.stageAuto=null;S.session=false;S.exitAt=0;}

  function reserve(){

    const arbiter=W.KVPV?.core?.scene,m=W._Ba?._Co?._Mo?.ins;

    if(W.KVPV_HITRUN1?.status?.(false)?.running)return false;

    if(typeof arbiter?.acquire!=='function')return false;

    if(S.stageAuto===null)S.stageAuto=m?.auto===true;

    if(m?.auto===true)m.auto=false;

    if(arbiter.acquire('combat','thien-the-8-tang')!==true){release();return false;}S.lease=true;return true;

  }

  

  function claim(d){if(S.claimPending&&Number(d.rank?.[2])===2){S.rewardConfirmed++;S.claimPending=null;note('REWARD-CONFIRMED');}

    if(Number(d.rank?.[2])!==1||typeof rpc()?.getMyAwards!=='function')return;

    const key=d.day+'/'+String(d.rank?.[0])+'/'+String(d.rank?.[1]);if(S.claimKeys.has(key))return;

    S.claimKeys.add(key);S.claimPending=key;rpc().getMyAwards();note('REWARD-REQUEST');

  }

  

  function refreshTarget(){const m=model();if(!m||typeof m.setAutoTarget!=='function')return;

    const boss=m.getSpeBossInfo?.(),activeBoss=!!boss?.[1]&&!boss?.[3];

    const target=activeBoss?1:([1,2].includes(Number(m.getAutoTarget?.()))?Number(m.getAutoTarget()):2);

    if(target===1)m.setFirstBoss?.(false);m.setAutoTarget(target,true);S.lastTarget=Date.now();note('NATIVE-TARGET-'+target);

  }

  

  function tick(){if(W.KVPV_ENTRY_POLICY?.manual===true)return;try{

    if(!C.enabled)return;
    // Session may momentarily be unavailable while the game reconnects.
    // Wait without sending commands; never permanently disable scheduled entry.
    if(!owned()){S.reason='actor_session_unavailable';return;}

    const d=data(),time=Date.now();if(S.day!==d.day){S.day=d.day;S.attempts=0;S.claimKeys.clear();}

    const top=d.inside&&(Number(W._Ba?._$a?._yo?.ins?.intoSce?.[3])===9||d.floor===9),chestDone=W.KVPV_EIGHT_CHEST?.status?.()?.doneToday===true;

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

    const quick=W.KVPV_DAILY?.quickState?.(),job=quick?.job;

    // Daily reports idle in Vietnamese or English depending on its controller.
    const idle=job==null||['','rảnh','ranh','idle'].includes(String(job).trim().toLowerCase());

    if(!idle||W.KVPV_TQ_SCOPE?.inside?.()===true||W.KVPV_HITRUN1?.status?.(false)?.running){S.reason='other_job_active';return;}

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

  

  function status(){return {...data(),enabled:C.enabled,phase:S.phase,reason:S.reason,entryAttempts:S.attempts,
      actorMatches:!!owned(),timerActive:S.timer!==null,
      dailyJob:W.KVPV_DAILY?.quickState?.()?.job??null,
      commonScene:W._Ba?._$a?.SceneUtil?.isCommonScene===true,
      manualPolicy:W.KVPV_ENTRY_POLICY?.manual===true,
      inTeam:!!W._Ba?._cm?._q3t?.ins?.getHasTeams?.(),
      bossRunning:W.KVPV_HITRUN1?.status?.(false)?.running===true,

    completedDay,doneToday:completedDay===data().day,confirmedEntries:S.entries,rewardPending:!!S.claimPending,rewardConfirmed:S.rewardConfirmed,lastError:S.lastError,history:S.history.slice()};}

  

  function stop(){C.enabled=false;if(S.timer!=null){(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;}release();S.phase='OFF';S.reason='stopped';return {enabled:false};}

  

  function start(){C.enabled=true;if(S.timer==null){const schedule=W.KVPV_V1?.timers?.setInterval??W.setInterval;if(typeof schedule==='function')S.timer=schedule(tick,C.pollMs);}tick();return status();}

  W.KVPV_EIGHT_FLOOR=Object.freeze({start,stop,status,sync:tick,_handoff:()=>({actor,completedDay,day:S.day,attempts:S.attempts,phase:S.phase,claimKeys:[...S.claimKeys],claimPending:S.claimPending,rewardConfirmed:S.rewardConfirmed})});start();

})();

