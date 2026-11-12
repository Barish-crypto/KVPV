




/* V10.1: scene arbitration / independent core API. No game RPC or timers. */

(() => {

  'use strict';

  const W=window, NS=W.KVPV||(W.KVPV={});

  const initialActor=String(W.__KVPV_OWN_ACTOR_ID||'');

  const opts={enabled:true, leaseMs:4000, maxHistory:60};

  const state={lease:null, denied:0, grants:0, history:[]};

  const now=()=>Date.now();

  

  function actorValid(){

    if(W.__KVPV_UNIVERSAL_HALTED)return false;

    if(!initialActor)return true; // permits offline isolated tests

    try{return String(_Ba?._rJ?._O$?.ins?.actorId??'')===initialActor;}

    catch(_){return false;}

  }

  

  function dailyJob(){

    try{const q=W.KVPV_DAILY?.quickState?.();return q?.job&&q.job!=='rảnh'&&q.job!=='ranh'?String(q.job):null;}

    catch(_){return null;}

  }

  

  function hitrunRunning(){

    try{return W.KVPV_HITRUN1?.status?.(false)?.running===true;}

    catch(_){return false;}

  }

  

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

  

  function lease(){if(state.lease&&state.lease.until<=now())state.lease=null;return state.lease;}

  function yieldStageForCombat(){

    const l=lease(),scope=W.KVPV_FAR_SCOPE?.status?.();

    if(l?.who==='stage'&&l.tag==='tu-vuot'&&actorValid()&&!dailyJob()&&scope?.kind==='THIEN_QUAN'&&scope.inside===true&&W.KVPV_MODE?.status?.(false)?.pendingTianQuanMode){

      state.lease=null;log('handoff','stage','verified Tian Quan combat');return true;

    }

    return false;

  }

  

  function log(event,who,why){

    state.history.push({time:now(),event,who,why});

    if(state.history.length>opts.maxHistory)state.history.shift();

  }

  

  // Only a real, open Eight Floor window may outrank the overlapping
  // Tranh Ba Dinh Cao timetable reservation. Do NOT bypass actual scene
  // owners, an active Daily job, native stage combat, or server entry gates.
  function eightEntryReady(who,tag){
    if(who!=='combat'||tag!=='thien-the-8-tang')return false;
    try{
      const d=W.KVPV_EIGHT_FLOOR?.status?.();
      return d?.enabled===true&&d?.scheduled===true&&d?.open===true&&
        d?.unlocked===true&&d?.cooldownReady===true&&
        d?.inside===false&&d?.doneToday!==true&&
        W._Ba?._$a?.SceneUtil?.isCommonScene===true&&
        W.KVPV_DAILY_TRIAL?.status?.()?.inFlight!==true;
    }catch(_){return false;}
  }
  function conflict(who,tag=''){

    if(!actorValid())return 'actor/session unavailable';

    if(!opts.enabled)return 'core stopped';

    if(who==='combat')yieldStageForCombat();

    const j=dailyJob(),s=stageState(),l=lease(),eight=eightEntryReady(who,tag);

    

    

    if(tag!=='daily-trial'&&!j&&!hitrunRunning()&&!s.inside&&

       (!l||l.who!=='combat'||l.tag==='daily-trial')&&W.KVPV_DAILY_TRIAL?.hasPriority?.()===true)

      return 'priority: daily trial';

    // V10.2: a reservation prevents NEW scene work only; never kicks an active fight.

    if(tag!=='daily-trial'&&(who==='combat'||who==='stage') && !hitrunRunning() && !j && !s.inside && !['LINH_LUNG','PHU_VAN','TRU_TIEN'].includes(W.KVPV_FAR_SCOPE?.status?.().kind)){

      const hold=W.KVPV?.timeline?.reservation?.({

        atMs:now(),flags:W.KVPV_DAILY?.config||null,forTask:who

      });

      if(hold&&!(eight&&hold.key==='tranh_ba_dinh_cao'))return 'upcoming event '+hold.key+' ('+hold.time+')';

    }

    if(who==='combat'){

      if(j)return 'daily job '+j;

      const controlledStage=(W.KVPV_FAR_SCOPE??W.KVPV_TQ_SCOPE)?.inside?.()===true&&!!W.KVPV_MODE?.status?.(false)?.pendingTianQuanMode;

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

  const scene=Object.freeze({

    can:(who)=>conflict(who)===null,

    reason:(who,tag='')=>conflict(who,tag),

    acquire(who,tag=''){

      if(W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true){state.denied++;log('denied',who,'priority: agree popup');return false;}

      const reason=conflict(who,tag);

      if(reason){state.denied++;log('denied',who,reason);return false;}

      state.lease={who,tag:String(tag),until:now()+opts.leaseMs};state.grants++;

      return true;

    },

    renew(who){if(who==='stage'&&yieldStageForCombat())return false;const l=lease();if(!l||l.who!==who)return false;l.until=now()+opts.leaseMs;return true;},

    release(who){const l=lease();if(l?.who===who){state.lease=null;return true;}return false;},

    status(){const l=lease(),stage=stageState();return {

      owner:l?.who||null,tag:l?.tag||null,ttlMs:l?Math.max(0,l.until-now()):0,

      dailyJob:dailyJob(),combatRunning:hitrunRunning(),stage,

      denied:state.denied,grants:state.grants,

      canCombat:!conflict('combat'),canDaily:!conflict('daily'),canStage:!conflict('stage')};},

    history:()=>state.history.slice()

  });

  NS.core=Object.freeze({version:'10.1.0',config:opts,scene,

    start(){opts.enabled=true;return this.status();},

    stop(){opts.enabled=false;state.lease=null;return this.status();},

    status(){return {version:'10.1.0',enabled:opts.enabled,scene:scene.status()};}

  });

})();

