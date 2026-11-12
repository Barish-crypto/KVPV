
 

/* KVPV V11.0 STABLE: timed-events monitor + non-invasive watchdog + combat/tower guard.
 * Appended after V10 components. Does NOT send RPC, manipulate game attributes,
 * change original game timers, restart stopped modules, or claim server results.
 */

 

(() => {

  'use strict';

  const W=window, TAG='[KVPV V11 STABLE]', VERSION='11.0.0';

  try { W.KVPV_V11_STABLE?.stop?.('reload'); } catch(_){window.KVPV_V1?.diagnostics?.record(_);}

  const expected=String(W.__KVPV_OWN_ACTOR_ID??'');

  const actor=()=>String((typeof _Ba==='undefined'?null:_Ba?._rJ?._O$?.ins?.actorId)??'');

  if (!expected || actor()!==expected || W.__KVPV_UNIVERSAL_HALTED) {

    console.warn(TAG,'Only install in the original game-frame with the expected actor.');

    return;

  }

  const C={

    enabled:true, normalTickMs:4000, nearEventTickMs:1000,

    prepareBeforeMs:60000, warnLateMs:4000,

    towerDeadlineMs:30000, towerWarnBeforeMs:5000,

    autoRepairHitRunPolling:true, pollingRepairCooldownMs:30000,

    errorThreshold:3, errorCooldownMs:120000, maxHistory:100,

    consoleWarnings:true

  };

  const state={timer:null, running:false, stoppedByUser:false, scans:0, startedAt:Date.now(),

    lastScanAt:0, lastGapMs:0, longestGapMs:0, delayedWakeups:0,

    errors:Object.create(null), lastError:'', lastEvent:null, nearest:null, active:[],

    notices:Object.create(null), history:[], repairs:0, lastRepairAt:0,

    tower:{active:false,phase:'',floor:null,phaseSince:0,secondsRemaining:null,warning:false},

    combat:{running:false,phase:'off',pollEnabled:null,repairEligible:false}};

  const now=()=>Date.now();

  const log=(kind,message,extra={})=>{

    state.history.push({time:new Date().toISOString(),kind,message,...extra});

    if(state.history.length>C.maxHistory)state.history.splice(0,state.history.length-C.maxHistory);

    if(kind==='error' || (kind==='warn' && C.consoleWarnings)) console.warn(TAG,message);

  };

  const valid=()=>expected===actor() && !W.__KVPV_UNIVERSAL_HALTED;

  function oneNotice(key,msg,kind='info'){

    if(state.notices[key])return false;

    state.notices[key]=now();log(kind,msg);return true;

  }

  function check(name,fn){

    const t=now(),s=state.errors[name]||(state.errors[name]={count:0,until:0,total:0});

    if(t<s.until)return null;

    try{const value=fn();s.count=0;return value;}

    catch(e){s.total++;s.count++;state.lastError=name+': '+String(e?.message||e);

      if(s.count>=C.errorThreshold){s.until=t+C.errorCooldownMs;s.count=0;log('warn',name+' temporarily disabled after failures');}

      else log('error',state.lastError);

      return null;

    }

  }

  const hhmm=v=>{

    const m=/^(\d\d?):([0-5]\d)$/.exec(String(v));

    if(!m||+m[1]>23)return null;

    return {h:+m[1],m:+m[2]};

  };

  const DAY_MS=86400000, VN_MS=7*3600000;

  const stamp=(vnMidnightUtc,offset,h,m)=>vnMidnightUtc+offset*DAY_MS+h*3600000+m*60000-VN_MS;

  function occurrence(event,t){

    const local=new Date(t+VN_MS);

    const vnMidnight=Date.UTC(local.getUTCFullYear(),local.getUTCMonth(),local.getUTCDate());

    const items=[];

    const add=(start,end,day,kind)=>{

      if(!start)return;

      const target=new Date(vnMidnight+day*DAY_MS).getUTCDay();

      if(Array.isArray(event.days)&&!event.days.includes(target))return;

      const at=stamp(vnMidnight,day,start.h,start.m);

      const until=end?stamp(vnMidnight,day,end.h,end.m):at;

      if(until<t-(kind==='instant'?15000:1000))return;

      items.push({key:String(event.key??event.name),name:String(event.name??event.key),

        kind,at,until,auto:event.action==='auto',action:event.action||'notice',

        unlock:event.unlock||null});

    };

    for(let day=-1;day<=8;day++){

      for(const spec of event.slots||[]){

        const [a,b]=String(spec).split('-');

        const begin=hhmm(a),end=hhmm(b);

        if(begin&&end)add(begin,end,day,'window');

      }

      for(const p of event.instants||[])add(hhmm(p),null,day,'instant');

    }

    return items;

  }

  function eventScan(t){

    const events=W.KVPV_DAILY?.lichEvents?.();

    if(!Array.isArray(events))return;

    const options=[];

    for(const e of events){if(e && typeof e==='object')options.push(...occurrence(e,t));}

    options.sort((a,b)=>a.at-b.at);

    state.active=options.filter(x=>x.kind==='window'&&x.at<=t&&t<x.until).map(x=>({

      key:x.key,name:x.name,endsAt:new Date(x.until).toISOString(),auto:x.auto

    }));

    const upcoming=options.find(x=>x.at>t)||null;

    state.nearest=upcoming?{key:upcoming.key,name:upcoming.name,

      startsAt:new Date(upcoming.at).toISOString(),startsInSeconds:Math.ceil((upcoming.at-t)/1000),

      action:upcoming.action,unlock:upcoming.unlock}:null;

    const relevant=options.filter(x=>Math.abs(x.at-t)<=Math.max(C.prepareBeforeMs,15000));

    const localDay=new Date(t+VN_MS).toISOString().slice(0,10);

    for(const e of relevant){

      const key=localDay+'/'+e.key+'/'+e.at;

      if(t>=e.at && t-e.at<=15000){

        state.lastEvent=e.name;oneNotice('open/'+key,'Event window: '+e.name+' (check server open state)');

      }else if(t<e.at && e.at-t<=C.prepareBeforeMs){

        oneNotice('prepare/'+key,'Upcoming '+e.name+' in '+Math.ceil((e.at-t)/1000)+'s');

      }

    }

    // Only diagnostics: an event can be blocked when another job holds the scene.

    if(relevant.some(x=>x.at>t && x.at-t<15000)){

      const job=W.KVPV_DAILY?.quickState?.()?.job;

      if(job && job!=='rảnh')oneNotice('busy/'+localDay+'/'+relevant[0].key,

        'Event approaching while Daily is busy with '+job,'warn');

    }

  }

  function combatScan(t){

    const hit=W.KVPV_HITRUN1?.status?.(false);

    const poll=W.KVPV_HITRUN_AUTO?.status?.(false);

    state.combat={running:hit?.running===true,phase:hit?.phase||'off',

      pollEnabled:poll?.enabled??null,repairEligible:false};

    if(!C.autoRepairHitRunPolling||!poll||poll.enabled!==true ||poll.timerActive!==false||

       W.KVPV?.combat?.config?.autoArm===false||t-state.startedAt<C.pollingRepairCooldownMs||

       t-state.lastRepairAt<C.pollingRepairCooldownMs)return;

    if(typeof W.KVPV_HITRUN_AUTO?.repairPolling!=='function')return;

    state.combat.repairEligible=true;

    // Existing native helper only repairs a LOST interval, and does not re-arm a Boss attempt.

    state.lastRepairAt=t;

    if(W.KVPV_HITRUN_AUTO.repairPolling()===true){state.repairs++;log('info','Repaired lost HitRun polling timer');}

  }

  function towerScan(t){

    const tower=W.KVPV_LINHLUNG922?.status?.(false);

    if(!tower?.active){state.tower={active:false,phase:'',floor:null,phaseSince:0,

      secondsRemaining:null,warning:false};return;}

    const floor=tower.pendingFloor??tower.nextFloor??null,phase=tower.phase||'unknown';

    if(state.tower.phase!==phase||state.tower.floor!==floor||!state.tower.active){

      state.tower={active:true,phase,floor,phaseSince:t,secondsRemaining:null,warning:false};

    }

    if(phase==='fighting'){

      const elapsed=t-state.tower.phaseSince;

      state.tower.secondsRemaining=Math.max(0,Math.ceil((C.towerDeadlineMs-elapsed)/1000));

      if(!state.tower.warning&&elapsed>=C.towerDeadlineMs-C.towerWarnBeforeMs){

        state.tower.warning=true;

        

        

      }

    }else state.tower.secondsRemaining=null;

  }

  function scan(){

    if(!state.running)return status(false);

    if(!valid()){

      log('warn','Game-frame actor changed; supervisor stopped');stop('actor switched');return status(false);

    }

    const t=now();state.scans++;

    if(state.lastScanAt){

      state.lastGapMs=t-state.lastScanAt;

      state.longestGapMs=Math.max(state.longestGapMs,state.lastGapMs);

      if(state.lastGapMs>Math.max(10000,C.normalTickMs*3)){

        state.delayedWakeups++;

        oneNotice('throttle/'+Math.floor(t/DAY_MS),

          'Timer delay detected; browser background throttling can miss event windows','warn');

      }

    }

    state.lastScanAt=t;

    check('events',()=>eventScan(t));

    check('combat',()=>combatScan(t));

    check('tower',()=>towerScan(t));

    return status(false);

  }

  function nextDelay(){

    if(!state.nearest)return C.normalTickMs;

    const s=state.nearest.startsInSeconds;

    return s>=0&&s<=Math.ceil(C.prepareBeforeMs/1000)?C.nearEventTickMs:C.normalTickMs;

  }

  function loop(){

    state.timer=null;

    if(!state.running)return;

    try{scan();}finally{if(state.running)state.timer=(W.KVPV_V1?.timers?.setTimeout ?? W.setTimeout)(loop,nextDelay());}

  }

  function onWake(){

    if(!state.running||!valid())return;

    if(state.timer!==null){(W.KVPV_V1?.timers?.clearTimeout ?? W.clearTimeout)(state.timer);state.timer=null;}

    loop();

  }

  

  function status(print=false){

    const out={version:VERSION,running:state.running,actor:expected,scans:state.scans,

      nextEvent:state.nearest,activeEvents:state.active.slice(),

      delayedWakeups:state.delayedWakeups,lastGapMs:state.lastGapMs,

      longestGapMs:state.longestGapMs,repairs:state.repairs,combat:{...state.combat},

      tower:{...state.tower},errors:JSON.parse(JSON.stringify(state.errors)),

      lastError:state.lastError,history:state.history.slice(-20)};

    if(print){console.log(TAG,out);if(console.table)console.table(out.activeEvents);}

    return out;

  }

  

  function stop(reason='manual'){

    state.running=false;state.stoppedByUser=reason==='manual';

    if(state.timer!==null){(W.KVPV_V1?.timers?.clearTimeout ?? W.clearTimeout)(state.timer);state.timer=null;}

    try{document.removeEventListener('visibilitychange',onWake);}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

    try{W.removeEventListener('focus',onWake);}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

    log('info','Supervisor stopped: '+reason);

    return status(false);

  }

  

  function start(){

    if(state.running)return status(false);

    if(!valid())throw Error('Wrong account/game-frame');

    state.running=true;state.stoppedByUser=false;

    try{document.addEventListener('visibilitychange',onWake);}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

    try{W.addEventListener('focus',onWake);}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

    loop();return status(false);

  }

  W.KVPV_V11_STABLE=Object.freeze({version:VERSION,config:C,start,stop,scan,status,

    history:()=>state.history.slice(),eventPlan:()=>state.nearest});

  start();

  console.info(TAG,'Loaded: read-only schedule and tower monitor + guarded HitRun polling repair.');

})();

/* KVPV V11.1: Combat/tower supervisory helper.
 * Works with the existing native HitRun and Tower controllers. Does not forge
 * server results, write character stats, send additional RPC or bypass manual stop.
 */

 

(() => {

  'use strict';

  const W=window, TAG='[KVPV V11.1 COMBAT]', VERSION='11.1.0';

  try{W.KVPV_V111_COMBAT?.stop?.('reload');}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

  const actor=String(W.__KVPV_OWN_ACTOR_ID??'');

  const readActor=()=>String((typeof _Ba!=='undefined'?_Ba?._rJ?._O$?.ins?.actorId:null)??'');

  if(!actor||actor!==readActor()||W.__KVPV_UNIVERSAL_HALTED){

    console.warn(TAG,'Load FULL in original game-frame with matching actor');return;

  }

  const C={

    regularScanMs:2000, towerScanMs:750,

    deadlineEstimateMs:30000, warningBeforeMs:5000,

    fastTowerBossScan:true, maxBossScansPerFloor:12,

    minBossScanIntervalMs:700, maxHistory:80

  };

  const S={running:false,timer:null,scans:0,actor,startedAt:0,

    errors:0,lastError:'',lastWarnAt:0,history:[],

    tower:{active:false,phase:'off',floor:null,battleStartedAt:null,

      remainingSeconds:null,late:false,bossScans:0},

    combat:{running:false,phase:'off',stallRecoveries:0,stallsInRow:0},

    lastFloorKey:'',lastBossScanAt:0,warnedKey:'',lateKey:''};

  const at=()=>Date.now();

  const valid=()=>actor===readActor()&&!W.__KVPV_UNIVERSAL_HALTED;

  

  function note(level,msg){

    S.history.push({time:new Date().toISOString(),level,msg});

    if(S.history.length>C.maxHistory)S.history.splice(0,S.history.length-C.maxHistory);

    if(level==='warn')console.warn(TAG,msg);

    else if(level==='info'&&msg.startsWith('Linh Lung tầng '))console.info(TAG,msg);

  }

  const obtain=(fn)=>{try{return fn()||null;}catch(e){S.errors++;

    S.lastError=String(e?.message||e);return null;}};

  function scan(){

    if(!S.running)return status(false);

    if(!valid()){stop('actor switched / halted');return status(false);}

    S.scans++;

    const hr=obtain(()=>W.KVPV_HITRUN1?.status?.(false));

    S.combat={running:hr?.running===true,phase:hr?.phase||'off',

      stallRecoveries:hr?.stallRecoveries??0,stallsInRow:hr?.consecutiveStallCycles??0};

    const tower=obtain(()=>W.KVPV_LINHLUNG922?.status?.(false));

    if(!tower?.active){

      S.tower={active:false,phase:'off',floor:null,battleStartedAt:null,

        remainingSeconds:null,late:false,bossScans:0};

      S.lastFloorKey='';return status(false);

    }

    const fighting=tower.phase==='fighting';

    const floor=tower.pendingFloor??null;

    const started=Number(tower.battleStartedAt)||null;

    const floorKey=String(floor)+'@'+String(started);

    if(S.lastFloorKey!==floorKey){

      S.lastFloorKey=floorKey;S.lastBossScanAt=0;S.warnedKey='';S.lateKey='';

      S.tower.bossScans=0;

    }

    const elapsed=fighting&&started?Math.max(0,at()-started):null;

    const remain=elapsed===null?null:Math.max(0,Math.ceil((C.deadlineEstimateMs-elapsed)/1000));

    S.tower={active:true,phase:tower.phase||'unknown',floor,

      battleStartedAt:started,remainingSeconds:remain,

      late:elapsed!==null&&elapsed>=C.deadlineEstimateMs,

      bossScans:S.tower.bossScans};

    if(fighting&&elapsed!==null){

      if(elapsed>=C.deadlineEstimateMs && S.lateKey!==floorKey){

        S.lateKey=floorKey;

        note('info','Linh Lung tầng '+floor+': hết cửa sổ 30s cục bộ; chờ kết quả native');

      }else if(elapsed>=C.deadlineEstimateMs-C.warningBeforeMs&&S.warnedKey!==floorKey){

        S.warnedKey=floorKey;

        note('info','Linh Lung tầng '+floor+': còn dưới 5s theo đồng hồ cục bộ');

      }

    }

    // Assist only when the original Boss-only auto-arm was already enabled.

    // Its own attemptedKey prevents duplicate boss starts; never calls rearm().

    if(fighting && started && C.fastTowerBossScan &&

       S.tower.bossScans<C.maxBossScansPerFloor &&

       at()-S.lastBossScanAt>=C.minBossScanIntervalMs &&

       W.KVPV?.combat?.config?.autoArm!==false && !S.combat.running){

      const poll=obtain(()=>W.KVPV_HITRUN_AUTO?.status?.(false));

      if(poll?.enabled===true && poll?.timerActive===true &&

         ['waiting-for-boss','scene-busy'].includes(poll.lastMode) &&

         typeof W.KVPV_HITRUN_AUTO.scan==='function'){

        S.tower.bossScans++;

        S.lastBossScanAt=at();

        obtain(()=>W.KVPV_HITRUN_AUTO.scan());

      }

    }

    return status(false);

  }

  function loop(){

    S.timer=null;

    if(!S.running)return;

    try{scan();}catch(e){S.errors++;S.lastError=String(e);}

    finally{if(S.running)S.timer=(W.KVPV_V1?.timers?.setTimeout ?? W.setTimeout)(loop,

      S.tower.active&&S.tower.phase==='fighting'?C.towerScanMs:C.regularScanMs);}

  }

  

  function status(print=false){

    const out={version:VERSION,running:S.running,actor,scans:S.scans,

      tower:{...S.tower},combat:{...S.combat},errors:S.errors,

      lastError:S.lastError,history:S.history.slice(-20)};

    if(print)console.log(TAG,out);

    return out;

  }

  

  function stop(reason='manual'){

    S.running=false;

    if(S.timer!==null){(W.KVPV_V1?.timers?.clearTimeout ?? W.clearTimeout)(S.timer);S.timer=null;}

    note('info','Stopped: '+reason);

    return status(false);

  }

  

  function start(){

    if(S.running)return status(false);

    if(!valid())throw Error('Actor changed: refuse to start');

    S.running=true;S.startedAt=at();loop();

    return status(false);

  }

  W.KVPV_V111_COMBAT=Object.freeze({version:VERSION,config:C,

    start,stop,scan,status,history:()=>S.history.slice()});

  start();

  console.info(TAG,'Active: adaptive retreat diagnostics + 30s tower clock + Boss-only fast scan.');

})();



