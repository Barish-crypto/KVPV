import {getKVPV_DAILY as __getKVPV0,getKVPV_HITRUN1 as __getKVPV1,getKVPV_HITRUN_AUTO as __getKVPV2,getKVPV_LINHLUNG922 as __getKVPV3,getKVPV_V1 as __getKVPV4,getKVPV_V111_COMBAT as __getKVPV5,getKVPV_V11_STABLE as __getKVPV6} from '../api.mjs';
import {call_KVPV_HITRUN_AUTO_repairPolling as __callKVPV0} from "./07-th300-hitrun-compat.mjs";
import {call_KVPV_HITRUN_AUTO_scan as __callKVPV1} from "./04-engine.mjs";
export function call_KVPV_V111_COMBAT_start(...args){const target=globalThis["KVPV_V111_COMBAT"];const fn=globalThis["KVPV_V111_COMBAT"]?.["start"];if(typeof fn!=='function')throw Error("KVPV_V111_COMBAT.start is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_V111_COMBAT_stop(...args){const target=globalThis["KVPV_V111_COMBAT"];const fn=globalThis["KVPV_V111_COMBAT"]?.["stop"];if(typeof fn!=='function')throw Error("KVPV_V111_COMBAT.stop is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_V111_COMBAT_scan(...args){const target=globalThis["KVPV_V111_COMBAT"];const fn=globalThis["KVPV_V111_COMBAT"]?.["scan"];if(typeof fn!=='function')throw Error("KVPV_V111_COMBAT.scan is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_V111_COMBAT_status(...args){const target=globalThis["KVPV_V111_COMBAT"];const fn=globalThis["KVPV_V111_COMBAT"]?.["status"];if(typeof fn!=='function')throw Error("KVPV_V111_COMBAT.status is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_V111_COMBAT_history(...args){const target=globalThis["KVPV_V111_COMBAT"];const fn=globalThis["KVPV_V111_COMBAT"]?.["history"];if(typeof fn!=='function')throw Error("KVPV_V111_COMBAT.history is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_V11_STABLE_start(...args){const target=globalThis["KVPV_V11_STABLE"];const fn=globalThis["KVPV_V11_STABLE"]?.["start"];if(typeof fn!=='function')throw Error("KVPV_V11_STABLE.start is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_V11_STABLE_stop(...args){const target=globalThis["KVPV_V11_STABLE"];const fn=globalThis["KVPV_V11_STABLE"]?.["stop"];if(typeof fn!=='function')throw Error("KVPV_V11_STABLE.stop is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_V11_STABLE_scan(...args){const target=globalThis["KVPV_V11_STABLE"];const fn=globalThis["KVPV_V11_STABLE"]?.["scan"];if(typeof fn!=='function')throw Error("KVPV_V11_STABLE.scan is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_V11_STABLE_status(...args){const target=globalThis["KVPV_V11_STABLE"];const fn=globalThis["KVPV_V11_STABLE"]?.["status"];if(typeof fn!=='function')throw Error("KVPV_V11_STABLE.status is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_V11_STABLE_history(...args){const target=globalThis["KVPV_V11_STABLE"];const fn=globalThis["KVPV_V11_STABLE"]?.["history"];if(typeof fn!=='function')throw Error("KVPV_V11_STABLE.history is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_V11_STABLE_eventPlan(...args){const target=globalThis["KVPV_V11_STABLE"];const fn=globalThis["KVPV_V11_STABLE"]?.["eventPlan"];if(typeof fn!=='function')throw Error("KVPV_V11_STABLE.eventPlan is not available");return Reflect.apply(fn,target,args);}
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
export {__esmLocal0 as local_anonymous_11_1_0};
export {__esmLocal1 as local_actor_1};
export {__esmLocal2 as local_now_2};
export {__esmLocal3 as local_log_3};
export {__esmLocal4 as local_valid_4};
export {__esmLocal5 as local_oneNotice_5};
export {__esmLocal6 as local_check_6};
export {__esmLocal7 as local_hhmm_7};
export {__esmLocal8 as local_stamp_8};
export {__esmLocal9 as local_occurrence_9};
export {__esmLocal10 as local_add_10};
export {__esmLocal11 as local_eventScan_11};
export {__esmLocal12 as local_anonymous_175_17_12};
export {__esmLocal13 as local_anonymous_177_32_13};
export {__esmLocal14 as local_anonymous_177_78_14};
export {__esmLocal15 as local_anonymous_183_32_15};
export {__esmLocal16 as local_anonymous_191_34_16};
export {__esmLocal17 as local_anonymous_213_21_17};
export {__esmLocal18 as local_combatScan_18};
export {__esmLocal19 as local_towerScan_19};
export {__esmLocal20 as local_scan_20};
export {__esmLocal21 as local_anonymous_321_19_21};
export {__esmLocal22 as local_anonymous_323_19_22};
export {__esmLocal23 as local_anonymous_325_18_23};
export {__esmLocal24 as local_nextDelay_24};
export {__esmLocal25 as local_loop_25};
export {__esmLocal26 as local_onWake_26};
export {__esmLocal27 as local_status_27};
export {__esmLocal28 as local_stop_28};
export {__esmLocal29 as local_start_29};
export {__esmLocal30 as local_history_30};
export {__esmLocal31 as local_eventPlan_31};
export {__esmLocal32 as local_anonymous_436_1_32};
export {__esmLocal33 as local_readActor_33};
export {__esmLocal34 as local_at_34};
export {__esmLocal35 as local_valid_35};
export {__esmLocal36 as local_note_36};
export {__esmLocal37 as local_obtain_37};
export {__esmLocal38 as local_scan_38};
export {__esmLocal39 as local_anonymous_508_20_39};
export {__esmLocal40 as local_anonymous_514_23_40};
export {__esmLocal41 as local_anonymous_584_24_41};
export {__esmLocal42 as local_anonymous_596_15_42};
export {__esmLocal43 as local_loop_43};
export {__esmLocal44 as local_status_44};
export {__esmLocal45 as local_stop_45};
export {__esmLocal46 as local_start_46};
export {__esmLocal47 as local_history_47};
export function initialize(){

 

/* KVPV V11.0 STABLE: timed-events monitor + non-invasive watchdog + combat/tower guard.
 * Appended after V10 components. Does NOT send RPC, manipulate game attributes,
 * change original game timers, restart stopped modules, or claim server results.
 */

 

(__captureESMFunction((__esmLocal0=(() => {

  'use strict';

  const W=window, TAG='[KVPV V11 STABLE]', VERSION='11.0.0';

  try { __getKVPV6()?.stop?.('reload'); } catch(_){__getKVPV4()?.diagnostics?.record(_);}

  const expected=String(W.__KVPV_OWN_ACTOR_ID??'');

  const actor=__captureESMFunction((__esmLocal1=(()=>String((typeof _Ba==='undefined'?null:_Ba?._rJ?._O$?.ins?.actorId)??''))),"actor");

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

  const now=__captureESMFunction((__esmLocal2=(()=>Date.now())),"now");

  const log=__captureESMFunction((__esmLocal3=((kind,message,extra={})=>{

    state.history.push({time:new Date().toISOString(),kind,message,...extra});

    if(state.history.length>C.maxHistory)state.history.splice(0,state.history.length-C.maxHistory);

    if(kind==='error' || (kind==='warn' && C.consoleWarnings)) console.warn(TAG,message);

  })),"log");

  const valid=__captureESMFunction((__esmLocal4=(()=>expected===actor() && !W.__KVPV_UNIVERSAL_HALTED)),"valid");

  function oneNotice(key,msg,kind='info'){

    if(state.notices[key])return false;

    state.notices[key]=now();log(kind,msg);return true;

  }
__esmLocal5=oneNotice;


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
__esmLocal6=check;


  const hhmm=__captureESMFunction((__esmLocal7=(v=>{

    const m=/^(\d\d?):([0-5]\d)$/.exec(String(v));

    if(!m||+m[1]>23)return null;

    return {h:+m[1],m:+m[2]};

  })),"hhmm");

  const DAY_MS=86400000, VN_MS=7*3600000;

  const stamp=__captureESMFunction((__esmLocal8=((vnMidnightUtc,offset,h,m)=>vnMidnightUtc+offset*DAY_MS+h*3600000+m*60000-VN_MS)),"stamp");

  function occurrence(event,t){

    const local=new Date(t+VN_MS);

    const vnMidnight=Date.UTC(local.getUTCFullYear(),local.getUTCMonth(),local.getUTCDate());

    const items=[];

    const add=__captureESMFunction((__esmLocal10=((start,end,day,kind)=>{

      if(!start)return;

      const target=new Date(vnMidnight+day*DAY_MS).getUTCDay();

      if(Array.isArray(event.days)&&!event.days.includes(target))return;

      const at=stamp(vnMidnight,day,start.h,start.m);

      const until=end?stamp(vnMidnight,day,end.h,end.m):at;

      if(until<t-(kind==='instant'?15000:1000))return;

      items.push({key:String(event.key??event.name),name:String(event.name??event.key),

        kind,at,until,auto:event.action==='auto',action:event.action||'notice',

        unlock:event.unlock||null});

    })),"add");

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
__esmLocal9=occurrence;


  function eventScan(t){

    const events=__getKVPV0()?.lichEvents?.();

    if(!Array.isArray(events))return;

    const options=[];

    for(const e of events){if(e && typeof e==='object')options.push(...occurrence(e,t));}

    options.sort(__captureESMFunction((__esmLocal12=((a,b)=>a.at-b.at)),""));

    state.active=options.filter(__captureESMFunction((__esmLocal13=(x=>x.kind==='window'&&x.at<=t&&t<x.until)),"")).map(__captureESMFunction((__esmLocal14=(x=>({

      key:x.key,name:x.name,endsAt:new Date(x.until).toISOString(),auto:x.auto

    }))),""));

    const upcoming=options.find(__captureESMFunction((__esmLocal15=(x=>x.at>t)),""))||null;

    state.nearest=upcoming?{key:upcoming.key,name:upcoming.name,

      startsAt:new Date(upcoming.at).toISOString(),startsInSeconds:Math.ceil((upcoming.at-t)/1000),

      action:upcoming.action,unlock:upcoming.unlock}:null;

    const relevant=options.filter(__captureESMFunction((__esmLocal16=(x=>Math.abs(x.at-t)<=Math.max(C.prepareBeforeMs,15000))),""));

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

    if(relevant.some(__captureESMFunction((__esmLocal17=(x=>x.at>t && x.at-t<15000)),""))){

      const job=__getKVPV0()?.quickState?.()?.job;

      if(job && job!=='rảnh')oneNotice('busy/'+localDay+'/'+relevant[0].key,

        'Event approaching while Daily is busy with '+job,'warn');

    }

  }
__esmLocal11=eventScan;


  function combatScan(t){

    const hit=__getKVPV1()?.status?.(false);

    const poll=__getKVPV2()?.status?.(false);

    state.combat={running:hit?.running===true,phase:hit?.phase||'off',

      pollEnabled:poll?.enabled??null,repairEligible:false};

    if(!C.autoRepairHitRunPolling||!poll||poll.enabled!==true ||poll.timerActive!==false||

       W.KVPV?.combat?.config?.autoArm===false||t-state.startedAt<C.pollingRepairCooldownMs||

       t-state.lastRepairAt<C.pollingRepairCooldownMs)return;

    if(typeof __getKVPV2()?.repairPolling!=='function')return;

    state.combat.repairEligible=true;

    // Existing native helper only repairs a LOST interval, and does not re-arm a Boss attempt.

    state.lastRepairAt=t;

    if(__callKVPV0()===true){state.repairs++;log('info','Repaired lost HitRun polling timer');}

  }
__esmLocal18=combatScan;


  function towerScan(t){

    const tower=__getKVPV3()?.status?.(false);

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
__esmLocal19=towerScan;


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

    check('events',__captureESMFunction((__esmLocal21=(()=>eventScan(t))),""));

    check('combat',__captureESMFunction((__esmLocal22=(()=>combatScan(t))),""));

    check('tower',__captureESMFunction((__esmLocal23=(()=>towerScan(t))),""));

    return status(false);

  }
__esmLocal20=scan;


  function nextDelay(){

    if(!state.nearest)return C.normalTickMs;

    const s=state.nearest.startsInSeconds;

    return s>=0&&s<=Math.ceil(C.prepareBeforeMs/1000)?C.nearEventTickMs:C.normalTickMs;

  }
__esmLocal24=nextDelay;


  function loop(){

    state.timer=null;

    if(!state.running)return;

    try{scan();}finally{if(state.running)state.timer=(__getKVPV4()?.timers?.setTimeout ?? W.setTimeout)(loop,nextDelay());}

  }
__esmLocal25=loop;


  function onWake(){

    if(!state.running||!valid())return;

    if(state.timer!==null){(__getKVPV4()?.timers?.clearTimeout ?? W.clearTimeout)(state.timer);state.timer=null;}

    loop();

  }
__esmLocal26=onWake;


  

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
__esmLocal27=status;


  

  function stop(reason='manual'){

    state.running=false;state.stoppedByUser=reason==='manual';

    if(state.timer!==null){(__getKVPV4()?.timers?.clearTimeout ?? W.clearTimeout)(state.timer);state.timer=null;}

    try{document.removeEventListener('visibilitychange',onWake);}catch(_){__getKVPV4()?.diagnostics?.record(_);}

    try{W.removeEventListener('focus',onWake);}catch(_){__getKVPV4()?.diagnostics?.record(_);}

    log('info','Supervisor stopped: '+reason);

    return status(false);

  }
__esmLocal28=stop;


  

  function start(){

    if(state.running)return status(false);

    if(!valid())throw Error('Wrong account/game-frame');

    state.running=true;state.stoppedByUser=false;

    try{document.addEventListener('visibilitychange',onWake);}catch(_){__getKVPV4()?.diagnostics?.record(_);}

    try{W.addEventListener('focus',onWake);}catch(_){__getKVPV4()?.diagnostics?.record(_);}

    loop();return status(false);

  }
__esmLocal29=start;


  W.KVPV_V11_STABLE=Object.freeze({version:VERSION,config:C,start,stop,scan,status,

    history:__captureESMFunction((__esmLocal30=(()=>state.history.slice())),"history"),eventPlan:__captureESMFunction((__esmLocal31=(()=>state.nearest)),"eventPlan")});

  start();

  console.info(TAG,'Loaded: read-only schedule and tower monitor + guarded HitRun polling repair.');

})),""))();

/* KVPV V11.1: Combat/tower supervisory helper.
 * Works with the existing native HitRun and Tower controllers. Does not forge
 * server results, write character stats, send additional RPC or bypass manual stop.
 */

 

(__captureESMFunction((__esmLocal32=(() => {

  'use strict';

  const W=window, TAG='[KVPV V11.1 COMBAT]', VERSION='11.1.0';

  try{__getKVPV5()?.stop?.('reload');}catch(_){__getKVPV4()?.diagnostics?.record(_);}

  const actor=String(W.__KVPV_OWN_ACTOR_ID??'');

  const readActor=__captureESMFunction((__esmLocal33=(()=>String((typeof _Ba!=='undefined'?_Ba?._rJ?._O$?.ins?.actorId:null)??''))),"readActor");

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

  const at=__captureESMFunction((__esmLocal34=(()=>Date.now())),"at");

  const valid=__captureESMFunction((__esmLocal35=(()=>actor===readActor()&&!W.__KVPV_UNIVERSAL_HALTED)),"valid");

  

  function note(level,msg){

    S.history.push({time:new Date().toISOString(),level,msg});

    if(S.history.length>C.maxHistory)S.history.splice(0,S.history.length-C.maxHistory);

    if(level==='warn')console.warn(TAG,msg);

    else if(level==='info'&&msg.startsWith('Linh Lung tầng '))console.info(TAG,msg);

  }
__esmLocal36=note;


  const obtain=__captureESMFunction((__esmLocal37=((fn)=>{try{return fn()||null;}catch(e){S.errors++;

    S.lastError=String(e?.message||e);return null;}})),"obtain");

  function scan(){

    if(!S.running)return status(false);

    if(!valid()){stop('actor switched / halted');return status(false);}

    S.scans++;

    const hr=obtain(__captureESMFunction((__esmLocal39=(()=>__getKVPV1()?.status?.(false))),""));

    S.combat={running:hr?.running===true,phase:hr?.phase||'off',

      stallRecoveries:hr?.stallRecoveries??0,stallsInRow:hr?.consecutiveStallCycles??0};

    const tower=obtain(__captureESMFunction((__esmLocal40=(()=>__getKVPV3()?.status?.(false))),""));

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

      const poll=obtain(__captureESMFunction((__esmLocal41=(()=>__getKVPV2()?.status?.(false))),""));

      if(poll?.enabled===true && poll?.timerActive===true &&

         ['waiting-for-boss','scene-busy'].includes(poll.lastMode) &&

         typeof __getKVPV2().scan==='function'){

        S.tower.bossScans++;

        S.lastBossScanAt=at();

        obtain(__captureESMFunction((__esmLocal42=(()=>__callKVPV1())),""));

      }

    }

    return status(false);

  }
__esmLocal38=scan;


  function loop(){

    S.timer=null;

    if(!S.running)return;

    try{scan();}catch(e){S.errors++;S.lastError=String(e);}

    finally{if(S.running)S.timer=(__getKVPV4()?.timers?.setTimeout ?? W.setTimeout)(loop,

      S.tower.active&&S.tower.phase==='fighting'?C.towerScanMs:C.regularScanMs);}

  }
__esmLocal43=loop;


  

  function status(print=false){

    const out={version:VERSION,running:S.running,actor,scans:S.scans,

      tower:{...S.tower},combat:{...S.combat},errors:S.errors,

      lastError:S.lastError,history:S.history.slice(-20)};

    if(print)console.log(TAG,out);

    return out;

  }
__esmLocal44=status;


  

  function stop(reason='manual'){

    S.running=false;

    if(S.timer!==null){(__getKVPV4()?.timers?.clearTimeout ?? W.clearTimeout)(S.timer);S.timer=null;}

    note('info','Stopped: '+reason);

    return status(false);

  }
__esmLocal45=stop;


  

  function start(){

    if(S.running)return status(false);

    if(!valid())throw Error('Actor changed: refuse to start');

    S.running=true;S.startedAt=at();loop();

    return status(false);

  }
__esmLocal46=start;


  W.KVPV_V111_COMBAT=Object.freeze({version:VERSION,config:C,

    start,stop,scan,status,history:__captureESMFunction((__esmLocal47=(()=>S.history.slice())),"history")});

  start();

  console.info(TAG,'Active: adaptive retreat diagnostics + 30s tower clock + Boss-only fast scan.');

})),""))();




}
export {getKVPV_V111_COMBAT} from '../api.mjs';
export {getKVPV_V11_STABLE} from '../api.mjs';
export const api=Object.freeze({
  get KVPV_V111_COMBAT(){return globalThis.KVPV_V111_COMBAT;},
  get KVPV_V11_STABLE(){return globalThis.KVPV_V11_STABLE;},
});