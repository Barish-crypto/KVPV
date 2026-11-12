import {getKVPV_BASIC10 as __getKVPV0,getKVPV_EXPERIMENTAL_BOOST as __getKVPV1,getKVPV_FAR_SCOPE as __getKVPV2,getKVPV_HITRUN1 as __getKVPV3,getKVPV_HITRUN_AUTO as __getKVPV4,getKVPV_MODE as __getKVPV5,getKVPV_RANGE281 as __getKVPV6,getKVPV_TH300 as __getKVPV7,getKVPV_TH_FAR as __getKVPV8,getKVPV_TQ_POSITION_ONLY as __getKVPV9,getKVPV_TQ_SCOPE as __getKVPV10,getKVPV_TRUTIEN_PVP as __getKVPV11,getKVPV_V1 as __getKVPV12} from '../api.mjs';
import {call_KVPV_FAR_SCOPE_eligible as __callKVPV0} from "./00-far-scope.mjs";
import {call_KVPV_FAR_SCOPE_eligible as __callKVPV1} from "./00-far-scope.mjs";
import {call_KVPV_HITRUN1_stop as __callKVPV2} from "./07-th300-hitrun-compat.mjs";
import {call_KVPV_HITRUN1_start as __callKVPV3} from "./07-th300-hitrun-compat.mjs";
import {call_KVPV_FAR_SCOPE_eligible as __callKVPV4} from "./00-far-scope.mjs";
import {call_KVPV_HITRUN_AUTO_rearm as __callKVPV5} from "./07-th300-hitrun-compat.mjs";
import {call_KVPV_HITRUN1_status as __callKVPV6} from "./07-th300-hitrun-compat.mjs";
import {call_KVPV_HITRUN1_start as __callKVPV7} from "./07-th300-hitrun-compat.mjs";
import {call_KVPV_HITRUN_AUTO_stop as __callKVPV8} from "./07-th300-hitrun-compat.mjs";
import {call_KVPV_HITRUN1_stop as __callKVPV9} from "./07-th300-hitrun-compat.mjs";
import {call_KVPV_HITRUN1_stop as __callKVPV10} from "./07-th300-hitrun-compat.mjs";
import {call_KVPV_HITRUN_AUTO_rearm as __callKVPV11} from "./07-th300-hitrun-compat.mjs";
import {call_KVPV_HITRUN_AUTO_status as __callKVPV12} from "./07-th300-hitrun-compat.mjs";
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
export {__esmLocal0 as local_anonymous_14_1_0};
export {__esmLocal1 as local_inFarMap_1};
export {__esmLocal2 as local_tqNoHeal_2};
export {__esmLocal3 as local_tqDistance_3};
export {__esmLocal4 as local_releaseEntryMove_4};
export {__esmLocal5 as local_guardEntryMove_5};
export {__esmLocal6 as local_fn_6};
export {__esmLocal7 as local_syncTowerBoss_7};
export {__esmLocal8 as local_syncTianQuanBoss_8};
export {__esmLocal9 as local_syncMap_9};
export {__esmLocal10 as local_watchMap_10};
export {__esmLocal11 as local_actorNow_11};
export {__esmLocal12 as local_valid_12};
export {__esmLocal13 as local_log_13};
export {__esmLocal14 as local_inspect_14};
export {__esmLocal15 as local_stopTqHealing_15};
export {__esmLocal16 as local_stopOwners_16};
export {__esmLocal17 as local_cleanState_17};
export {__esmLocal18 as local_status_18};
export {__esmLocal19 as local_choose_19};
export {__esmLocal20 as local_stop_20};
export {__esmLocal21 as local_start_21};
export {__esmLocal22 as local_armTianQuan_22};
export {__esmLocal23 as local_history_23};
export function initialize(){





/* ================================================================
 * KVPV V12.9.4 — MANUAL COMBAT MODES / CLIENT-ONLY COORDINATOR
 * start('BOSS') -> native Boss combo and 35/100 recovery, no range experiment.
 * start('BOSS_TH') -> only native Tuyet Hoc 1001..1008, far 280.4; no basic fallback.
 * stop() -> no active owner. Auto Daily jobs remain independent.
 * No RPC. All mode switching is explicit; only one combat owner.
 * ================================================================ */

(__captureESMFunction((__esmLocal0=(() => {

  'use strict';

  const W=window, TAG='[KVPV V12.9.4 MODES]';

  const MODE=Object.freeze({OFF:'OFF',BOSS:'BOSS',BOSS_TH:'BOSS_TH',BOSS_TH300:'BOSS_TH300',BOSS_TH300_SCAN:'BOSS_TH300_SCAN'});

  const initialActor=String(W.__KVPV_OWN_ACTOR_ID || W._Ba?._rJ?._O$?.ins?.actorId || '');

  const S={mode:'OFF',reason:'Chưa chọn mode',switches:0,errors:0,lastError:'',lastChangedAt:null,

    history:[],statusErrors:{}};

  let scopedMode=null,mapTimer=null,towerAttempt=null,lastScopeKey=null,lastMaintenanceAt=-Infinity,lastTianQuanKey=null,lastTruAcquire=-Infinity,lastTowerRetryAt=-Infinity;

  const inFarMap=__captureESMFunction((__esmLocal1=(()=>(__getKVPV2()??__getKVPV10())?.inside?.()!==false)),"inFarMap");
  const tqNoHeal=__captureESMFunction((__esmLocal2=(()=>__getKVPV9()?.enabled===true&&__getKVPV2()?.status?.()?.kind==='THIEN_QUAN')),"tqNoHeal");
  const tqDistance=__captureESMFunction((__esmLocal3=(()=>Number(__getKVPV9()?.distance??310))),"tqDistance");

  let entryMoveHook=null;

  function releaseEntryMove(){const h=entryMoveHook;if(h&&h.m.moveTo===h.fn){if(h.own)Object.defineProperty(h.m,'moveTo',h.own);else delete h.m.moveTo;}entryMoveHook=null;}
__esmLocal4=releaseEntryMove;


  function guardEntryMove(){

    const me=W._C?._Ba?.instance?.getRole?.(Number(initialActor)),m=me?.getComponent?.(W._d?._Yct?._zet);

    if(!m||typeof m.moveTo!=='function'||entryMoveHook?.m===m)return;

    releaseEntryMove();const own=Object.getOwnPropertyDescriptor(m,'moveTo'),native=m.moveTo;

    if(own&&!own.configurable)return;

    const fn=__captureESMFunction((__esmLocal6=(function(x,y,...args){

      const scope=__getKVPV2()?.status?.(),hr=__getKVPV3()?.status?.(false);

      const target=me?.getComponent?.(W._d?._Yct?._Het)?.target,hp=me?.property?.get?.('hp');

      const a=me?.property?.get?.('position'),b=target?.property?.get?.('position'),entryGoal=tqDistance();

      if(scopedMode&&valid()&&scope?.inside&&scope.kind==='THIEN_QUAN'&&__getKVPV7()?.basicRangeProbeGoal?.()==null&&

        Array.isArray(hp)&&Number(hp[1])>0&&Number(hp[0])>0&&
        (tqNoHeal()||(!hr?.running||hr.phase==='FIGHT')&&Number(hp[0])/Number(hp[1])*100>35)&&

        __getKVPV2()?.eligible?.(target)&&a&&b&&Number.isFinite(x)&&Number.isFinite(y)&&Math.hypot(x-b.x,y-b.y)<Math.max(280,entryGoal-2)){

        const d=Math.hypot(a.x-b.x,a.y-b.y);

        if(d>0){
          // At the established 310 ring, an attempted basic melee approach
          // must not start a path. Keep the already-working position.
          if(Math.abs(d-entryGoal)<=2){log('ENTRY-310','blocked native close-range approach');return;}
          x=b.x+(a.x-b.x)/d*entryGoal;
          y=b.y+(a.y-b.y)/d*entryGoal;
          log('ENTRY-310','redirect native inward path');
        }

      }

      return native.call(this,x,y,...args);

    })),"fn");

    Object.defineProperty(m,'moveTo',{configurable:true,writable:true,enumerable:own?.enumerable??false,value:fn});entryMoveHook={m,own,fn};

  }
__esmLocal5=guardEntryMove;


  

  function syncTowerBoss(){

    const scope=__getKVPV2()?.status?.();if(!['LINH_LUNG','PHU_VAN','TRU_TIEN'].includes(scope?.kind))return;

    if(!valid()||W._Ba?._rJ?._O$?.ins?.isDead===true)return;

    const me=W._C?._Ba?.instance?.getRole?.(Number(initialActor));

    const combat=me?.getComponent?.(W._d?._Yct?._Het);let target=combat?.target;

    if(scope.kind==='TRU_TIEN'&&!__callKVPV0(target)){

      

      

      const currentHitrun=__getKVPV3()?.status?.(false);

      if(currentHitrun?.running&&currentHitrun.phase!=='FIGHT'||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)||W._Ba?._K_t?._Z7t?.ins?.gathering)return;

      towerAttempt=null;S.reason='Tru Tiên: chờ mục tiêu quái';

      const user=W._Ba?._rJ?._O$?.ins;

      if(typeof user?.selectTar==='function'&&Date.now()-lastTruAcquire>=1000){

        lastTruAcquire=Date.now();user.selectTar(1,-1);target=combat?.target;log('TRU-TARGET-SEARCH','native monsters only');

      }

    }

    if(!__callKVPV1(target))return;
    if(scope.kind==='ALL_BOSS'&&(Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)||W.KVPV?.core?.scene?.can?.('combat','hitrun')===false))return;
    const playerPosition=me?.property?.get?.('position'),targetPosition=target?.property?.get?.('position');
    if(!playerPosition||!targetPosition||
       ![playerPosition.x,playerPosition.y,targetPosition.x,targetPosition.y].every(value=>Number.isFinite(Number(value)))){
      towerAttempt=null;S.reason='HitRun: chờ tọa độ nhân vật và Boss';return;
    }

    const id=String(target.property?.get?.('id')??target.id??'');if(!id)return;

    const key=scope.current+'/'+scope.floor+'/'+id;
    // A native boss/HitRun controller may stop while the same monster stays
    // selected. Previous code treated this as completed forever and froze PvE.
    // Re-arm only after a bounded delay, never every 75ms scheduler tick.
    const existing=__getKVPV3()?.status?.(false);
    if(towerAttempt===key&&existing?.running===true)return;
    if(towerAttempt===key&&Date.now()-lastTowerRetryAt<3000)return;

    const hr=__getKVPV3()?.status?.(false);

    towerAttempt=key;lastTowerRetryAt=Date.now();S.lastError='';

    try{

      if(hr?.running)__callKVPV2('Chuyển Boss phó bản: '+id);
      if(scope.kind==='ALL_BOSS')__getKVPV7().setDistance(scope.goal);

      __callKVPV3();__getKVPV7().sync?.();log('TOWER-HITRUN',key);

    }catch(e){S.lastError=String(e?.message||e);log('TOWER-HANDOFF-BLOCKED',S.lastError);}

  }
__esmLocal7=syncTowerBoss;


  

  

  function syncTianQuanBoss(){

    const scope=__getKVPV2()?.status?.();if(scope?.kind!=='THIEN_QUAN'||!scope.inside)return;

    if(!valid()||W._Ba?._rJ?._O$?.ins?.isDead===true)return;

    const me=W._C?._Ba?.instance?.getRole?.(Number(initialActor));

    const target=me?.getComponent?.(W._d?._Yct?._Het)?.target;

    if(!__callKVPV4(target))return;

    const id=String(target.property?.get?.('id')??target.id??''),occ=Number(target.property?.get?.('occ'));

    const key=scope.current+'/'+String(W._Ba?._Co?._Mo?.ins?.curLv??'')+'/'+occ+'/'+id;if(!id||lastTianQuanKey===key)return;

    const hr=__getKVPV3()?.status?.(false);

    if(!tqNoHeal()&&lastTianQuanKey===null&&hr?.running&&String(hr.bossId)===id){lastTianQuanKey=key;return;}

    lastTianQuanKey=key;

    try{

      

      stopOwners('Chuyển Boss Thiên Quan: '+id);

      __getKVPV6().setTrialRange(Number(__getKVPV7().status(false).requestedDistance??302)+10);__getKVPV6().enable(true);

      __getKVPV7().start('SCAN');S.mode=MODE.BOSS_TH300_SCAN;scopedMode=MODE.BOSS_TH300_SCAN;

      if(W.KVPV?.combat?.config)W.KVPV.combat.config.autoArm=!tqNoHeal();

      if(tqNoHeal())stopTqHealing('TQ 310 distance only');
      else __callKVPV5();

      

      if(!tqNoHeal()&&__callKVPV6(false)?.running!==true)__callKVPV7();

      __getKVPV7().sync?.();S.lastError='';S.switches++;S.lastChangedAt=new Date().toISOString();log('TQ-BOSS-HANDOFF',key);

    }catch(e){S.lastError=String(e?.message||e);log('TQ-HANDOFF-BLOCKED',S.lastError);}

  }
__esmLocal8=syncTianQuanBoss;


  

  function syncMap(){

    if(!scopedMode)return;

    if(!valid()){stop('Actor/session changed');return;}

    guardEntryMove();

    const scope=__getKVPV2()?.status?.();
    // TH300 SCAN is the active skill sender. Its restored mixed profile is
    // configured at activation, not overwritten on every map poll.
    // In particular, forcing basic 8005 alone at distance 310 can leave the
    // character stationary without any ranged skill available to cast.
    // A PvP observer waits for player targets; dungeon auto must own monsters.
    // Keep an explicitly armed Tru Tien PvP module independent from PvE owners.
    if(scope?.inside===true&&scope.kind==='TRU_TIEN'){
      // Release only dungeon owners; the dedicated PvP mode owns player combat.
      const z=inspect();
      if(S.mode!==MODE.OFF||z.long?.running||z.boss?.running||z.auto?.enabled){
        stopOwners('Tru Tien: restore native combat');
        S.mode=MODE.OFF;towerAttempt=null;
      }
      releaseEntryMove();
      S.reason='Tru Tien: native combat only';
      lastScopeKey=scope.kind+'/'+scope.current+'/'+(scope.floor??'');
      return;
    }


    if(lastScopeKey?.startsWith('TRU_TIEN/')&&scope?.kind!=='TRU_TIEN')
      __getKVPV7()?.setClientPace?.(1); // restore original default for other modes
    if(scope){const key=scope.kind+'/'+scope.current+'/'+(scope.floor??'');

      if(lastScopeKey!==null&&lastScopeKey!==key){stopOwners('Đổi phạm vi/map/tầng');S.mode=MODE.OFF;towerAttempt=null;lastTianQuanKey=null;}

      if(lastScopeKey!==key&&scope.kind==='THIEN_QUAN'&&scope.inside)__getKVPV7()?.setDistance?.(tqDistance());

      lastScopeKey=key;}

    if(!inFarMap()){

      if(S.mode!==MODE.OFF||__getKVPV7()?.status?.(false)?.running||__getKVPV3()?.status?.(false)?.running){stopOwners('Rời Thiên Quan: trả combat mặc định');S.mode=MODE.OFF;towerAttempt=null;log('MAP-EXIT','native combat');}

      __getKVPV1()?.sync?.();

      S.reason='Ngoài Thiên Quan/Linh Lung: chờ vào map';return;

    }

    if(tqNoHeal())stopTqHealing('Thiên Quan giữ 310, không hồi máu');
    

    const me=W._C?._Ba?.instance?.getRole?.(Number(initialActor));

    const hp=me?.property?.get?.('hp');

    const dead=W._Ba?._rJ?._O$?.ins?.isDead===true||(Array.isArray(hp)&&Number(hp[0])<=0);

    if(dead){

      const z=inspect();if(S.mode!==MODE.OFF||z.auto?.enabled||z.boss?.running||z.long?.running)stopOwners('Chết: chờ hồi sinh, giữ chế độ tự động');

      S.mode=MODE.OFF;lastTianQuanKey=null;towerAttempt=null;S.reason='Chờ hồi sinh; vẫn giữ tự động Thiên Quan/Linh Lung';return;

    }

    

    if(S.mode!==MODE.OFF&&Date.now()-lastMaintenanceAt>=2000){

      lastMaintenanceAt=Date.now();const z=inspect(),tower=['LINH_LUNG','PHU_VAN','TRU_TIEN'].includes(scope?.kind);

      if(z.long?.running!==true||(!tower&&z.auto?.enabled===false&&z.auto?.lastMode==='session-unavailable'&&!z.boss?.running)){

        log('AUTO-RESUME','Khôi phục bộ đánh trong map sau khi gián đoạn');start(scopedMode);return;

      }

      if(!tower&&z.auto?.enabled===true&&z.auto?.timerActive===false)__getKVPV4()?.repairPolling?.();

      __getKVPV7()?.repairPolling?.();

    }

    

    if(S.mode===MODE.BOSS_TH300){

      const evidence=__getKVPV7()?.status?.(false);

      if(evidence?.running&&(evidence.confirmedSkills??evidence.confirmedOver300??[]).length===0){

        log('RESCAN','Boss hiện tại chưa có chiêu xác nhận');start(MODE.BOSS_TH300_SCAN);return;

      }

    }

    if(S.mode===MODE.OFF&&W._Ba?._rJ?._O$?.ins?.isDead!==true)start(scopedMode);

    if(S.mode!==MODE.OFF){syncTowerBoss();syncTianQuanBoss();}

  }
__esmLocal9=syncMap;


  

  function watchMap(mode){scopedMode=mode;

    const schedule=__getKVPV12()?.timers?.setInterval??W.setInterval;

    if(mapTimer==null&&typeof schedule==='function')mapTimer=schedule(syncMap,75);

  }
__esmLocal10=watchMap;


  const actorNow=__captureESMFunction((__esmLocal11=(()=>String(W._Ba?._rJ?._O$?.ins?.actorId??''))),"actorNow");

  const valid=__captureESMFunction((__esmLocal12=(()=>!!initialActor && actorNow()===initialActor && !W.__KVPV_UNIVERSAL_HALTED)),"valid");

  const log=__captureESMFunction((__esmLocal13=((event,detail='')=>{S.history.push({at:new Date().toISOString(),event,detail});

    if(S.history.length>40)S.history.shift();})),"log");

  const readStatus=__captureESMFunction((controller,name)=>{try{

    const result=controller()?.status?.(false);delete S.statusErrors[name];return result??null;

  }catch(e){const error=String(e?.message||e);if(S.statusErrors[name]!==error)log('STATUS-READ-ERROR',name+': '+error);

    S.statusErrors[name]=error;return null;

  }},"readStatus");

  const inspect=__captureESMFunction((__esmLocal14=(()=>({boss:readStatus(__getKVPV3,'boss'),

    auto:readStatus(__getKVPV4,'auto'),

    range:readStatus(__getKVPV6,'range'),

    th:readStatus(__getKVPV8,'th'),

    long:readStatus(__getKVPV7,'long'),

    farScope:readStatus(__getKVPV2,'farScope'),

    mapScope:readStatus(__getKVPV10,'mapScope')}))),"inspect");
  

  function stopTqHealing(reason){
    if(!tqNoHeal())return;
    // Stop only the HP-retreat owner; the far-range controller remains running.
    try{if(__getKVPV4()?.status?.(false)?.enabled===true)__callKVPV8(true);}catch(e){log('tq-auto-stop-error',String(e));}
    try{if(__getKVPV3()?.status?.(false)?.running===true)__callKVPV9(reason);}catch(e){log('tq-hitrun-stop-error',String(e));}
    try{if(W.KVPV?.combat?.config)W.KVPV.combat.config.autoArm=false;}catch(e){log('tq-autoarm-error',String(e));}
  }
__esmLocal15=stopTqHealing;

  function stopOwners(reason){

    // Release temporary HitRun wrappers before removing the skill hook beneath.

    try{__getKVPV4()?.stop?.(true);}catch(e){log('auto-stop-error',String(e));}

    try{if(__getKVPV3()?.status?.(false)?.running)__callKVPV10(reason);}catch(e){log('boss-stop-error',String(e));}

    try{__getKVPV7()?.stop?.(reason);}catch(e){log('long-stop-error',String(e));}

    try{__getKVPV8()?.stop?.(reason);}catch(e){log('th-stop-error',String(e));}

    // Do not attempt to stop a controller that has not been installed.

    try{__getKVPV6()?.enable?.(false);}catch(e){log('range-stop-error',String(e));}

    // Disable any other auto-arm repair watcher until manual BOSS start.

    try{if(W.KVPV?.combat?.config)W.KVPV.combat.config.autoArm=false;}catch(e){log('flag-stop-error',String(e));}

  }
__esmLocal16=stopOwners;


  

  function cleanState(){

    const z=inspect();

    if(([MODE.BOSS,MODE.BOSS_TH,MODE.BOSS_TH300,MODE.BOSS_TH300_SCAN].includes(S.mode)) && z.boss?.running!==true)

      return ['LINH_LUNG','PHU_VAN','TRU_TIEN'].includes(z.farScope?.kind)?(S.lastError||'Phó bản: chờ mục tiêu hợp lệ để bật HitRun 35/100'):z.auto?.enabled===true?'Boss chưa chạy: '+String(z.auto.lastError||z.auto.lastBlocked||z.auto.lastMode||'chờ game chọn Boss'):'Boss auto OFF / awaiting explicit BOSS start';

    return S.reason;

  }
__esmLocal17=cleanState;


  

  function status(show=true){

    const z=inspect();

    const out={version:'1.0.0',mode:S.mode,actorId:initialActor,actorValid:valid(),

      tianQuanOnly:!!scopedMode&&!__getKVPV2(),farMapsOnly:!!scopedMode,insideTianQuan:__getKVPV10()?.inside?.()??false,farScope:z.farScope,pendingTianQuanMode:scopedMode,mapScope:z.mapScope,statusErrors:{...S.statusErrors},

      tianQuanBossKey:lastTianQuanKey,autoMaintain:!!scopedMode,manualStopCommand:'KVPV_MODE.stop()',reason:cleanState(),switched:S.switches,lastChangedAt:S.lastChangedAt,

      combatOwner:z.long?.combatOwner??'HITRUN',combatRunning:z.long?.running?z.long?.combatRunning===true:z.boss?.running===true,combatPhase:z.long?.running?z.long?.combatPhase:z.boss?.phase,

      distanceOnly310:tqNoHeal(),healingEnabled:!tqNoHeal(),
      bossRunning:z.boss?.running===true,bossPhase:z.boss?.phase??null,

      bossAutoEnabled:z.auto?.enabled===true,stand281Enabled:false,

      bossAutoState:z.auto?.lastMode??null,bossAutoBlocked:z.auto?.lastBlocked??null,bossAutoError:z.auto?.lastError??'',

      bossDistanceTarget:[MODE.BOSS_TH300,MODE.BOSS_TH300_SCAN].includes(S.mode)?z.long?.goalDistance??null:S.mode===MODE.BOSS_TH?z.th?.goalDistance??null:null,

      tuyetHocOnly:S.mode===MODE.BOSS_TH&&z.th?.enabled===true||(z.long?.running===true&&!z.long?.interleavedBasic&&!z.long?.basicOnly&&!z.long?.tianQuanFiveBasics?.enabled),tuyetHocConfirmed:z.th?.confirmedTH??0,

      longRangeProof:z.long?.confirmedSkills||z.long?.confirmedOver300||[],longScan:z.long?.operation==='SCAN',

      range281Enabled:z.range?.enabled===true && z.range?.hookAttached===true,

      errors:S.errors,lastError:S.lastError,history:S.history.slice(-8),

      note:'BOSS_TH300_SCAN probes native Tuyet Hoc at the configured distance (default 302) to measure cast+hit; BOSS_TH300 only uses independently confirmed skills at the configured distance. If none verified, it waits. Range override never guarantees server reach.'};

    if(show){console.table([{mode:out.mode,valid:out.actorValid,boss:out.bossRunning,

      phase:out.bossPhase,stand281:out.stand281Enabled,

      distance:out.bossDistanceTarget,thOnly:out.tuyetHocOnly,lastError:out.lastError}]);}

    return out;

  }
__esmLocal18=status;


  

  function choose(input){

    const name=String(input??'').trim().toUpperCase();

    const aliases={BOSS:'BOSS',BOSS_281:'BOSS',THIENQUAN:'BOSS',THIEN_QUAN:'BOSS',

      BOSS_TH:'BOSS_TH',TH:'BOSS_TH',TUYETHOC:'BOSS_TH',TUYET_HOC:'BOSS_TH',

      BOSS_TH300:'BOSS_TH300',BOSS_TH300_SCAN:'BOSS_TH300_SCAN',

      OFF:'OFF',STOP:'OFF'};

    if(!Object.prototype.hasOwnProperty.call(aliases,name))

      throw Error('Chọn BOSS | BOSS_TH | BOSS_TH300_SCAN | BOSS_TH300 | OFF');

    return aliases[name];

  }
__esmLocal19=choose;


  

  function stop(reason='Người dùng dừng combat mode'){

    releaseEntryMove();

    scopedMode=null;lastTianQuanKey=null;if(mapTimer!=null){(__getKVPV12()?.timers?.clearInterval??W.clearInterval)?.(mapTimer);mapTimer=null;}

    stopOwners(reason);S.mode=MODE.OFF;S.reason=reason;S.switches++;

    S.lastChangedAt=new Date().toISOString();log('STOP',reason);
    try{return status(false);}catch(reportError){
      S.errors++;S.lastError=String(reportError?.message||reportError);
      S.reason='Đã dừng mode; lỗi khi đọc trạng thái: '+S.lastError;
      log('STOP-REPORT-ERROR',S.lastError);
      return {mode:S.mode,reason:S.reason,lastError:S.lastError};
    }

  }
__esmLocal20=stop;


  

  function start(modeName){

    let target=choose(modeName);

    if(target===MODE.OFF)return stop();

    if(W._Ba?._rJ?._O$?.ins?.isDead===true)throw Error('Nhân vật đã chết; hồi sinh rồi START lại');

    if(!valid())throw Error('Sai game-frame hoặc nhân vật chưa sẵn sàng');

    if(!__getKVPV4() || !__getKVPV3())

      throw Error('Thiếu module combat trong V1');

    if(target===MODE.BOSS_TH && (!__getKVPV6()?.enable||!__getKVPV6()?.setTrialRange))

      throw Error('Thiếu RANGE281 cho mode Tuyệt Học thử nghiệm');

    if(target===MODE.BOSS_TH && !__getKVPV8()?.start)throw Error('Thiếu TUYET HOC FAR');

    if(([MODE.BOSS_TH300,MODE.BOSS_TH300_SCAN].includes(target)) && !__getKVPV7()?.start)throw Error('Thiếu bộ điều khiển TH300');

    if(target===MODE.BOSS_TH300){

      const evidence=__getKVPV7().status(false);

      if((evidence.confirmedSkills??evidence.confirmedOver300??[]).length===0){

        target=MODE.BOSS_TH300_SCAN;log('RESCAN','STRICT chưa có bằng chứng cho Boss hiện tại');

      }

    }

    if([MODE.BOSS_TH300,MODE.BOSS_TH300_SCAN].includes(target)){

      watchMap(target);

      if(!inFarMap()){stopOwners('Chờ map Thiên Quan/Linh Lung');S.mode=MODE.OFF;S.reason='Ngoài Thiên Quan/Linh Lung: combat mặc định; chờ vào map';return status(false);}

    }else{scopedMode=null;if(mapTimer!=null){(__getKVPV12()?.timers?.clearInterval??W.clearInterval)?.(mapTimer);mapTimer=null;}}

    const previous=S.mode;

    // Release the outside-map basic selector before installing stage hooks.

    __getKVPV0()?.release?.();

    // An idempotent command never destroys an active session.

    const z=inspect();

    if(previous===target &&

       (target===MODE.BOSS || (target===MODE.BOSS_TH && z.th?.enabled===true) ||

        ([MODE.BOSS_TH300,MODE.BOSS_TH300_SCAN].includes(target)&&z.long?.running===true)) &&

       (z.auto?.enabled||z.boss?.running||tqNoHeal()&&z.long?.running===true))return status(false);

    stopOwners('Chuyển combat mode '+previous+' → '+target);

    S.mode=MODE.OFF;

    try{

      if([MODE.BOSS,MODE.BOSS_TH,MODE.BOSS_TH300,MODE.BOSS_TH300_SCAN].includes(target)){

        // All Boss safety decisions remain with the original HitRun controller.

        if(target!==MODE.BOSS&&__getKVPV6()?.enable){

          if(typeof __getKVPV6().setTrialRange==='function')__getKVPV6().setTrialRange([MODE.BOSS_TH300,MODE.BOSS_TH300_SCAN].includes(target)?Number(__getKVPV7().status(false).requestedDistance??__getKVPV7().status(false).goalDistance??302)+10:281);

          __getKVPV6().enable(true);

        }

        if(target===MODE.BOSS_TH)__getKVPV8().start();

        if(target===MODE.BOSS_TH300_SCAN)__getKVPV7().start('SCAN');

        if(target===MODE.BOSS_TH300)__getKVPV7().start('STRICT');

        if(W.KVPV?.combat?.config)W.KVPV.combat.config.autoArm=!tqNoHeal();

        if(['LINH_LUNG','PHU_VAN','TRU_TIEN'].includes(__getKVPV2()?.status?.().kind)){syncTowerBoss();}

        else if(tqNoHeal())stopTqHealing('TQ 310 distance only');
        else{__callKVPV11();const ar=__callKVPV12(false);

          if(ar?.enabled!==true)throw Error('Boss auto-arm chưa bật');}

        if([MODE.BOSS_TH300,MODE.BOSS_TH300_SCAN].includes(target))__getKVPV7().sync?.();

        S.reason=target===MODE.BOSS_TH300_SCAN?'TH300 SCAN: thử kỹ năng native ở khoảng cách cấu hình, ghi nhận sát thương':target===MODE.BOSS_TH300?'TH300 STRICT: chỉ dùng chiêu có >=2 hit xác nhận ở khoảng cách đã đo, không có thì chờ':target===MODE.BOSS_TH?'Boss chỉ dùng Tuyệt Học 1001..1008, đứng xa 280.4 khi FIGHT':'Boss combo gốc; HP <=35% chạy vòng ngoài tầm, đầy 100% mới đánh tiếp';

      }

      S.mode=target;S.switches++;S.lastChangedAt=new Date().toISOString();

      S.lastError='';log('START',target);
      // Startup has succeeded at this point. A status/report walk may inspect
      // native game objects and must never tear down the active combat owner.
      try{return status(true);}catch(reportError){
        S.errors++;S.lastError=String(reportError?.message||reportError);
        S.reason='Đã bật '+target+'; lỗi khi đọc trạng thái: '+S.lastError;
        log('START-REPORT-ERROR',S.lastError);
        return {mode:S.mode,reason:S.reason,lastError:S.lastError};
      }

    }catch(e){

      S.errors++;S.lastError=String(e?.message||e);log('START-ERROR',S.lastError);

      stopOwners('Start '+target+' thất bại: '+S.lastError);S.mode=MODE.OFF;S.reason='Không khởi động được '+target+': '+S.lastError;

      console?.warn?.(TAG,S.lastError);return status(true);

    }

  }
__esmLocal21=start;


  

  function armTianQuan(){lastTianQuanKey=null;watchMap(MODE.BOSS_TH300_SCAN);syncMap();return status(false);}
__esmLocal22=armTianQuan;


  const api=Object.freeze({version:'1.0.0',start,stop,status,syncMap,armTianQuan,

    modes:MODE,history:__captureESMFunction((__esmLocal23=(()=>S.history.slice())),"history")});

  try{__getKVPV5()?.stop?.('Reload integrated FULL');}catch(_){__getKVPV12()?.diagnostics?.record(_);}

  W.KVPV_MODE=api;

  // The base FULL used to auto-start Boss. V12.9.4 requires explicit selection.

  stopOwners('Khởi tạo: chờ chọn mode');

  console?.info?.(TAG,'READY/OFF. Chạy KVPV_MODE.start("BOSS") | .start("BOSS_TH") | .start("BOSS_TH300_SCAN") | .start("BOSS_TH300") | .stop()');

})),""))();


}
export {getKVPV_MODE} from '../api.mjs';
export const api=Object.freeze({
  get KVPV_MODE(){return globalThis.KVPV_MODE;},
});