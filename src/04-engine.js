




/* KVPV UNIVERSAL V8.6.35 — FULL: V8.6.33 plus low-noise health + visibility telemetry. */

/* KVPV MAIN SOLO V8.6.30 - SOLO PUBLIC EXP + UNIFIED SCHEDULER
 * Bundle-local scheduler. Never monkeypatches global (window.KVPV_V1?.timers?.setInterval ?? window.setInterval)/clearInterval.
 * No new game RPC, no retry of unacknowledged commands, one current character per session.
 * If any previous FULL is live, refresh before running this bundle. */

 

(() => {

  'use strict';

  const __KVPV29_ACCOUNT=window.__KVPV_OWN_ACTOR_ID;

  const __KVPV29_ACTOR=(typeof _Ba==='undefined')?'':String(_Ba?._rJ?._O$?.ins?.actorId??'');

  if(__KVPV29_ACTOR!==__KVPV29_ACCOUNT || typeof _ft==='undefined'){

    console.error('[KVPV 8.6.29] Sai acc/game-frame, chua nap auto.');

    return;

  }

  if(window.KVPV_MAIN_SOLO?.installed || window.KVPV_V881?.installed){

    console.error('[KVPV 8.6.29] Dang co FULL cu. Hay F5 va chi nap V8.6.29.');

    return;

  }

  const __KVPV29=(()=>{

    const realSetTimeout=(window.KVPV_V1?.timers?.setTimeout ?? window.setTimeout).bind(window);

    const realClearTimeout=(window.KVPV_V1?.timers?.clearTimeout ?? window.clearTimeout).bind(window);

    const slots=new Map();

    let nextId=1, alarm=null, waking=false, created=0, fired=0, failures=0,

      largestWakeGap=0, lastWake=0, maxCallbackMs=0, slowCalls=0, skips=0,

      lastFailure=null, overdue=0;

    const history=[];

    const wakeViews=Object.create(null);

    const tnow=()=>Date.now();

    const safePeriod=v=>{

      const n=Number(v);

      return Number.isFinite(n)?Math.max(16,Math.min(2147483647,Math.round(n))):1000;

    };

    

    function noteError(err,slot){

      failures++;lastFailure=String(err);

      if(history.length>=40)history.shift();

      history.push({at:new Date().toISOString(),slot:slot?.name||slot?.id,error:lastFailure});

      if(slot){slot.errors++;slot.lastError=lastFailure;}

      console.warn('[KVPV 8.6.29 SCHED]',slot?.name||slot?.id,lastFailure);

    }

    

    function rearm(){

      if(waking)return;

      if(alarm!==null){realClearTimeout(alarm);alarm=null;}

      if(!slots.size)return;

      let earliest=Infinity;

      for(const s of slots.values())if(s.nextAt<earliest)earliest=s.nextAt;

      const delay=Math.max(1,Math.min(60000,earliest-tnow()));

      alarm=realSetTimeout(pump,delay);

    }

    

    function pump(){

      alarm=null;

      if(waking)return;

      const sessionActor=(typeof _Ba==='undefined')?'':String(_Ba?._rJ?._O$?.ins?.actorId??'');

      if(sessionActor!==window.__KVPV_OWN_ACTOR_ID){

        slots.clear();

        window.__KVPV_UNIVERSAL_HALTED=true;

        try{window.KVPV_MAIN_SOLO?.pause?.();}catch(_){try{window.KVPV_DAILY?.stop?.();}catch(__){window.KVPV_V1?.diagnostics?.record(__);}}

        console.error('[KVPV UNIVERSAL35] Nhân vật đã thay đổi hoặc game-frame bị mất. Auto đã dừng, hãy F5 và nạp lại Snippet.');

        return;

      }

      waking=true;

      const now=tnow();

      if(lastWake){

        const gap=now-lastWake;

        largestWakeGap=Math.max(largestWakeGap,gap);

        const view=typeof document==='undefined'?'unknown':

          `${document.visibilityState}/${typeof document.hasFocus==='function' && document.hasFocus()?'FOCUS':'BLUR'}`;

        const b=wakeViews[view]||(wakeViews[view]={samples:0,totalMs:0,maxMs:0});

        b.samples++;b.totalMs+=gap;b.maxMs=Math.max(b.maxMs,gap);

      }

      lastWake=now;

      const due=[...slots.values()].filter(s=>s.nextAt<=now).sort((a,b)=>

        a.priority-b.priority || a.nextAt-b.nextAt || a.id-b.id);

      if(due.length>12)skips+=due.length-12;

      // A bounded batch prevents a crowded wake from monopolizing the game UI.

      for(const slot of due.slice(0,12)){

        if(slots.get(slot.id)!==slot)continue;

        overdue=Math.max(overdue,Math.max(0,now-slot.nextAt));

        slot.nextAt=tnow()+slot.period;

        const began=tnow();

        try{slot.callback(...slot.args);}

        catch(e){noteError(e,slot);}

        const ms=tnow()-began;

        slot.fired++;fired++;

        slot.maxMs=Math.max(ms,slot.maxMs);

        maxCallbackMs=Math.max(ms,maxCallbackMs);

        if(ms>=150){slowCalls++;slot.slow++;}

        slot.lastAt=tnow();

      }

      waking=false;

      rearm();

    }

    

    function every(callback,period,...args){

      if(window.__KVPV_UNIVERSAL_HALTED || (typeof _Ba==='undefined') ||

        String(_Ba?._rJ?._O$?.ins?.actorId??'')!==window.__KVPV_OWN_ACTOR_ID){

        throw new Error('[UNIVERSAL35] Không tạo thêm timer khi khác nhân vật');

      }

      if(typeof callback!=='function')throw new TypeError('setInterval callback must be function');

      const id=nextId++;

      const name=(callback.name||'anonymous')+' #'+id;

      const stack=(new Error()).stack;

      slots.set(id,{id,name,period:safePeriod(period),callback,args,

        nextAt:tnow()+safePeriod(period),priority:50,createdAt:tnow(),

        fired:0,lastAt:0,errors:0,lastError:null,slow:0,maxMs:0,

        callsite:typeof stack==='string'?stack.split('\n').slice(2,4).map(s=>s.trim()).join(' / '):''});

      created++;rearm();return id;

    }

    

    function cancel(id){

      if(id==null)return;

      if(slots.delete(id))rearm();

    }

    function tag(id,name,priority=50){

      const s=slots.get(id);

      if(!s)return false;

      if(typeof name==='string'&&name.length)s.name=name.slice(0,80);

      if(Number.isFinite(priority))s.priority=Math.max(0,Math.min(99,Number(priority)));

      rearm();return true;

    }

    

    function status(show=false){

      const now=tnow();

      const tasks=[...slots.values()].sort((a,b)=>a.nextAt-b.nextAt).map(s=>({

        id:s.id,name:s.name,priority:s.priority,periodMs:s.period,

        nextInMs:Math.max(0,s.nextAt-now),runs:s.fired,errors:s.errors,

        slow:s.slow,maxRunMs:s.maxMs,callsite:s.callsite}));

      const out={version:'8.6.29',mode:'single-native-timeout',activeTimers:tasks.length,

        hasNativeAlarm:alarm!==null,registrations:created,callbackRuns:fired,

        callbackErrors:failures,slowCallbacks:slowCalls,maxCallbackMs,

        maxWakeGapMs:largestWakeGap,maxOverdueMs:overdue,

        deferredDueCallbacks:skips,lastFailure,fishFastActive:tasks.some(x=>x.periodMs<=100),

        wakeByVisibility:Object.fromEntries(Object.entries(wakeViews).map(([view,b])=>

          [view,{samples:b.samples,avgWakeMs:b.samples?Math.round(b.totalMs/b.samples):0,maxWakeMs:b.maxMs}])),tasks};

      if(show)console.table(tasks);return out;

    }

    // Reschedule callbacks that are already due as soon as the tab becomes visible.

    // This never circumvents Chromium background throttling or adds gameplay RPC.

    const wake=()=>{if(!waking)rearm();return true;};

    return Object.freeze({every,cancel,tag,status,wake,errors:()=>history.slice()});

  })();

  if(typeof document!=='undefined' && typeof document.addEventListener==='function'){

    const resumeDue=()=>{if(!document.hidden)__KVPV29.wake();};

    document.addEventListener('visibilitychange',resumeDue,{passive:true});

    window.addEventListener('focus',resumeDue,{passive:true});

  }






(() => {

  // SOLO ACCOUNT HARD LOCK: check BEFORE stopping/reconfiguring any other script.

  const MAIN_CHARACTER_ID = window.__KVPV_OWN_ACTOR_ID;

  const charId = (typeof _Ba === 'undefined') ? '' :

    String(_Ba?._rJ?._O$?.ins?.actorId ?? '');

  if (charId !== MAIN_CHARACTER_ID || typeof _ft === 'undefined') {

    console.error('[V8.6.22 SOLO] Dung lai: sai game-frame, chua tai nhan vat hoac khong phai acc chinh.',

      {expected:MAIN_CHARACTER_ID,actual:charId || '(unavailable)'});

    return;

  }

  if (window.KVPV_MAIN_SOLO?.installed) {

    console.info('[V8.6.22 SOLO] Da cai; dung KVPV_MAIN_SOLO.status()');

    return;

  }

  if (window.KVPV_V881?.installed) {

    console.error('[V8.6.22 SOLO] Phien cu dang ton tai. F5 trang game roi nap lai FULL de khong trung provider/timer.');

    return;

  }

  

  for (const fn of [

    () => window.KVPV_CRYSTAL_CLONES?.stop?.(), // stop legacy if present

    () => window.KVPV_V866?.stop?.(),

    () => window.KVPV_V865?.stop?.(),

    () => window.KVPV_V864?.stop?.(),

    () => window.KVPV_V863?.stop?.(),

    () => window.KVPV_V862?.stop?.(),

    () => window.KVPV_V861?.stop?.(),

    () => window.KVPV_V8?.stop?.(),

    () => window.KVPV_UPGRADES?.stop?.(),

    () => window.KVPV_TIENVI_AUTO?.stop?.(),

    () => window.KVPV_EXP_4ACC?.stop?.(true), // stop legacy if present

    () => window.KVPV_CUONG_HOA?.stop?.(),

    () => window.KVPV_KHAM_DA_HON?.stop?.(),

    () => window.KVPV_DUC_HON?.stop?.(),

    () => window.KVPV_TIEN_PHU?.stop?.(),

    () => window.KVPV_TUYET_HOC?.stop?.(),

    () => window.KVPV_GHEP?.stop?.(),

    () => window.KVPV_DINH_CAO_CLAIM?.remove?.(),

    () => window.KVPV_DINH_CAO_AUTO?.stop?.(),

    () => window.KVPV_TU_LA_AUTO?.stop?.(),

    () => window.KVPV_VINH_DU_AUTO?.stop?.(),

    () => window.KVPV_TT_ADDON?.remove?.(),

    () => window.KVPV_DAILY?.stop?.(),

    () => window.KVPV_DAO_FISH?.stop?.(),

    () => window.KVPV_TIEN_TON_TRACE?.stop?.(),

    () => window.KVPV_VINH_DU_TRACE?.stop?.(),

    () => window.KVPV_AUTO_MO_LUYEN?.stop?.(),

    () => window.KVPV_DUNG_LUYEN_UI?.stop?.(),

    () => window.KVPV_BATCH_FIX?.remove?.(),

    () => window.KVPV_AUTO_DUNG_LUYEN?.stop?.(),

    () => window.KVPV_MAN_HOANG?.stop?.(),

    () => window.KVPV_EXP?.stop?.(),

    () => window.KVPV_BOSS_NHOM?.stop?.(),

    () => window.KVPV_THAN_THU_ONLY?.stop?.(),

    () => window.KVPV_YEU_VUONG?.stop?.(),

    () => window.KVPV_TIEN_TUYEN?.stop?.(),

    () => window.KVPV_LANH_DIA?.stop?.(),

    () => window.KVPV_HONG_HOANG?.stop?.(),

    () => window.KVPV_AUTO_VUOT?.stop?.(),

    () => window.KVPV_TINH_THAN?.stop?.(),

    () => window.KVPV_TEAM_AUTO_OK?.stop?.(),

    () => window.KVPV_TD_ROUTE_FIX?.stop?.(),

    () => window.KVPV_TIENDUYEN_FIX?.undo?.(),

    () => window.gameAuto?.stop?.()

  ]) { try { fn(); } catch (e) { console.warn('Dừng auto cũ:', e); } }



  if (typeof _Ba === 'undefined' || typeof _ft === 'undefined') {

    console.error('❌ Chọn đúng game-frame trong F12 Console trước!');

    return;

  }



  const C = {

    tickMs: 600, 

    // V8.6.28: only shorten cooldown after confirmed completion in common scene.

    postJobSuccessCooldownMs: 0,

    smeltMs: 8000, // V3.4: check every 8 seconds when idle

    expMs: 20000,

    enableExp: false, // SOLO: no 4-account expedition

    tienDuyenMs: 600,  

    enableTienDuyen: true,

    tienDuyenNoMerge: true, 

    tienDuyenBattleTimeoutMs: 20 * 60000,

    thanThuMs: 190 * 60000,  

    bossNhomMs: 5 * 60000,   

    manHoangMs: 30000,

    yeuVuongMs: 60000,

    tinhThanMs: 600, 

    tinhThanTang: 6,

    enableTinhThan: true, 

    autoTeam: true, 

    autoApproveTeam: true, 

    tinhThanCloneId: '', 

    tinhThanInviteCloneMs: 30 * 1000, 

    tinhThanFirstPublicDelayMs: 0, 

    tinhThanPublicInviteMs: 30 * 1000, 

    tinhThanPublicMaxPerVisit: 3,

    tinhThanWaitTeamMs: 0, 

    

    smeltAckTimeoutMs: 18000,

    smeltHardLimitMs: 120000, // yield to other tasks every 2 minutes; resume draining

    smeltMaxBatchesPerTab: 100,

    smeltMaxTotalBatches: 100,

    smeltBackoffMs: 180000,

    smeltEnabled: {equip:true, holy:true, pet:true},

    

    

    enableCompose: false, // preserve scarce materials while unattended

    composeStone: true,              

    composeProps: true,              

    composeCheckMs: 3 * 60000,

    composeMaxBatchesPerRun: 6,

    composeMaxPerRecipe: 10,

    composeRunTimeoutMs: 80000,

    composeAckTimeoutMs: 15000,

    composeNoAckBackoffMs: 15 * 60000,

    composeFailedRecipeBackoffMs: 30 * 60000,

    composeExcludedRecipes: [],     

    composeProtectedItems: [],      

    composeKeepByItemId: {},        

    

    redFirst: true, 

    enableTuyetHoc: true,

    tuyetHocCheckMs: 30000,

    tuyetHocAckTimeoutMs: 18000,

    tuyetHocMaxRequestsPerRun: 12,

    tuyetHocMaxRunMs: 90000,

    tuyetHocBetweenRequestsMs: 3000,

    tuyetHocNoAckBackoffMs: 15 * 60000,



    fightTimeoutMs: 20 * 60000,

    enterTimeoutMs: 45000,

    deadConfirmMs: 5000,

    enableYeuVuong: true,

    

    enableHongHoang: true,

    hongHoangMs: 20000,

    hongHoangMap: 0, 

    hongHoangEnterTimeoutMs: 45000,

    hongHoangNoProgressMs: 120000,

    hongHoangRetargetMs: 4000,

    hongHoangRetryMs: 120000,

    

    enableCrystal: false, // SOLO: requires a real 4-player team

    crystalCheckMs: 60000,

    crystalDifficulty: 0, 

    crystalMinPlayers: 4, 

    crystalLeaderId: window.__KVPV_OWN_ACTOR_ID,

    crystalCloneIds: [], // SOLO: no clone accounts

    crystalRequireExactTeam: true,

    crystalTeamWaitMs: 180000,

    crystalStartTimeoutMs: 65000,

    crystalCooldownMs: 300000,

    crystalAutoTower: true, 

    crystalNoMerge: true,

    crystalBattleWarnMs: 30 * 60000,

    

    enableEventSchedule: true,

    eventNoticeMinutes: 5,

    reserveHongHoangBeforeMs: 10 * 60000,

    reserveHongHoang: true,

    eventConsoleNotices: true,

    

    

    enableTienTonTrace: true,
    enableTienTonAuto: true,

    tienTonTraceConsole: true,

    tienTonTraceMaxCalls: 150,

    tienTonTraceStacks: false,

    

    enableVinhDu: true,

    vinhDuPrepareMinutes: 20, 

    vinhDuCheckMs: 2000,

    vinhDuRefreshMs: 20000,

    vinhDuRetryMs: 15000,

    vinhDuEnterTimeoutMs: 20000,

    vinhDuMaxEnterAttempts: 35,

    vinhDuExitGraceMs: 90000, 

    

    

    enableDinhCao: true,

    dinhCaoPrepareMinutes: 5,

    dinhCaoRetryMs: 20000,

    dinhCaoEnterTimeoutMs: 25000,

    dinhCaoMaxAttempts: 15,

    dinhCaoTargetRefreshMs: 12000,

    dinhCaoExitGraceMs: 35000,

    

    dinhCaoClaimTop: true,

    dinhCaoClaimRetryMs: 18000,

    dinhCaoClaimMaxAttempts: 8,

    dinhCaoClaimWaitAfterEndMs: 150000, 

    dinhCaoRequireConfigMatch: true,  

    // TU LA LOI DAI: 20:30-20:45 (CN, T2, T3, T4, T5)

    enableTuLa: true,

    tuLaPrepareMinutes: 15,   

    tuLaRetryMs: 45000, // wait before another scene-entry request

    tuLaEnterTimeoutMs: 28000, // give server time to acknowledge scene change

    tuLaMaxEntries: 3, // no repeated scene-entry loop during a 15-minute event

    tuLaRewardAckWarnMs: 90000, // no blind reward retry even after this timeout

    tuLaAutoTarget: false,      

    tuLaTargetRefreshMs: 12000,

    tuLaClaimReward: true,    

    tuLaRewardRetryMs: 30000,

    

    enableDaoTri: true,

    daoTriMap: 2141,

    daoTriCheckMs: 15000,

    daoTriFishScanMs: 60, 

    daoTriFishMarginPx: 15, 

    daoTriCatchCooldownMs: 900,

    daoTriAckTimeoutMs: 18000,

    daoTriEnterTimeoutMs: 45000,

    daoTriAutoClaimAfterEvent: true,

    enableTuVuot: true,

    

    // interrupting reserved events, Tien Duyen, Tinh Than or an owned scene.

    asyncStagePriority: true,

    asyncStagePrioritySpacingMs: 30000, 

    asyncStageNativeGraceMs: 30000,

    tuVuotMaxConsecutiveFailures: Infinity, 

    tuVuotMaxRejectedEntries: Infinity, 

    tuVuotExitConfirmMs: 5000, 

    tuVuotRetryPauseMs: 8000, // khoang nghi sau khi thua

    tuVuotEnterRetryMs: 30000 

  };



  const due = {honghoang:0, daotri:0, vinhdu:0, tula:0, dinhcao:0, smelt:0, compose:0, tuyethoc:0, exp:0, tienduyen:0, crystal:0, thanthu:0, bossnhom:0, manhoang:0, yeuvuong:0, tinhthan:0};

  const blocks = {};                    

  const attempts = {tientuyen:'', lanhdia:''};

  const completed = {};

  let timer = null, daoFishTimer = null, fishTimerInterval = 0,

      job = null, idleUntil = 0, lastMsg = '';

  const redGate = {holdFrom:0, retryAfter:0, cachedUntil:0, active:false};

  let asyncStagePriorityAt = 0; 

  const now = () => Date.now();

  const num = x => x !== undefined && x !== null && x !== '' && Number.isFinite(Number(x));

  const alive = x => x === 0 || x === false;

  const dead = x => x === 1 || x === true;

  const common = () => _Ba?._$a?.SceneUtil?.isCommonScene === true;

  const scene = () => Number(_Ba?._$a?.SceneUtil?.curScene);

  const mapNow = () => Number(_Ba?._$a?._yo?.ins?.intoSce?.[0]);

  const inMission = () => Boolean(_Ba?._$a?._yo?.ins?.isInMission);

  const inTeam = () => Boolean(_Ba?._cm?._q3t?.ins?.getHasTeams?.());

  const red = id => _Ba?._Xo?._Ko?.instance?.getRpKeyState?.(id) === true;

  const api = () => _Ba?._sst?._Cht?.inst;

  const boss = () => _Ba?._sst?._ist?.inst;

  const bossFlag = id => boss()?.getBsInfoById?.(id)?.[2]?.[0];

  const exitDungeon = () => _Ba?._$a?._Gr?.ins?.exitDungeon?.();

  const log = msg => { if (msg !== lastMsg) console.log('[KVPV V7.5.16]', msg); lastMsg = msg; };



  function vnTime() {

    const p = Object.fromEntries(Intl.DateTimeFormat('en-GB', {

      timeZone:'Asia/Ho_Chi_Minh', year:'numeric', month:'2-digit', day:'2-digit',

      hour:'2-digit', minute:'2-digit', hourCycle:'h23'

    }).formatToParts(new Date()).map(x => [x.type, x.value]));

    const m = Number(p.hour) * 60 + Number(p.minute);

    return {

      hour:p.hour, minute:p.minute, key:`${p.year}-${p.month}-${p.day}`,

      frontline: m >= 720 && m < 750 ? '12:00' : m >= 1290 && m < 1320 ? '21:30' : null,

      territory: m >= 750 && m < 765

    };

  }



  // =============================================================

  

  

  // _ft._h$.ins.getCfgByLv(m.curLv)[0] la map ai, [2] la so quai can diet.

  

  

  

  // =============================================================

  const tuVuot = {

    failures:0, rejected:0, stopped:false, reason:'',

    run:null, lastLevel:null, nextTryAt:0, totalWins:0,

    stoppedAt:0, noticed:false

  };

  function tvData() {

    const m=_Ba?._Co?._Mo?.ins;

    let cfg=null;

    try {cfg=_ft?._h$?.ins?.getCfgByLv?.(m?.curLv);}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

    const level=Number(m?.curLv);

    const targetMap=Number(cfg?.[0]);

    const needed=Number(cfg?.[2]);

    return {m,cfg,level,targetMap,needed,

      valid:!!m&&!!cfg&&Number.isFinite(level)&&

        Number.isFinite(targetMap)&&targetMap>0};

  }

  function tvDisable() {

    const m=_Ba?._Co?._Mo?.ins;

    if(m?.auto) m.auto=false;

    window.KVPV?.core?.scene?.release?.('stage');

  }

  function tvLock(reason) {

    tuVuot.stopped=true;

    tuVuot.reason=reason;

    tuVuot.stoppedAt=now();

    tuVuot.run=null;

    tvDisable();

    console.warn('[TỰ VƯỢT] 🛑 '+reason+

      '. Khóa Tự Vượt, vẫn train và chạy các sự kiện khác. '+

      'Muốn mở lại: KVPV_DAILY.tuVuotReset()');

  }

  function tvWin(level) {

    const stageBeforeWin=tuVuot.run?.level ?? tuVuot.lastLevel;

    try{window.KVPV_GEAR36?.onStageResult?.({outcome:'win',level:stageBeforeWin,to:level});}catch(e){console.warn('[GEAR36] win-hook',e);}

    tuVuot.totalWins++;

    tuVuot.failures=0;

    tuVuot.rejected=0;

    tuVuot.run=null;

    tuVuot.nextTryAt=0;

    console.log('[TỰ VƯỢT] ✅ Qua ải, lên '+level+'. Đặt lại chuỗi thua = 0');

  }

  function tvFail(reason, reject=false) {

    const stageBeforeFail=tuVuot.run?.level ?? tuVuot.lastLevel;

    try{window.KVPV_GEAR36?.onStageResult?.({outcome:reject?'reject':'lose',level:stageBeforeFail,reject,reason});}catch(e){console.warn('[GEAR36] fail-hook',e);}

    const x=reject?'rejected':'failures';

    tuVuot[x]++;

    tuVuot.run=null;

    tuVuot.nextTryAt=now()+Math.max(5000,Number(C.tuVuotRetryPauseMs)||8000);

    tvDisable();

    const configured=Number(reject ? C.tuVuotMaxRejectedEntries : C.tuVuotMaxConsecutiveFailures);

    const unlimited=!Number.isFinite(configured);

    const max=unlimited ? Infinity : Math.max(1,Math.floor(configured||10));

    console.warn('[TỰ VƯỢT] '+(reject?'⚠️ Không vào được ải':'❌ Không qua ải')+

      ' ('+tuVuot[x]+'/'+(unlimited?'∞':max)+'): '+reason);

    if(!unlimited && tuVuot[x]>=max) {

      tvLock(reject?'Thử vào ải không thành công '+max+' lần':

        'Thất bại liên tiếp '+max+' lần');

    }

  }

  function tuVuotObserve() {

    const d=tvData(),t=now(),r=tuVuot.run;

    if(!d.m) return;

    if(Number.isFinite(d.level))tuVuot.lastLevel=d.level;
    
    if(window.KVPV_EVENT_PRIORITY?.hold?.()) {
      if(tuVuot.run)tuVuot.run=null;
      tvDisable();
      return;
    }

    if(d.m.auto===true){

      const scope=window.KVPV_FAR_SCOPE?.status?.(),gate=window.KVPV?.core?.scene;

      // Stage owns training/entry, combat owns fighting in a verified Tian Quan map.

      // Keep native auto and its entry/ACK state; never release a foreign activity lease.

      if(scope?.kind==='THIEN_QUAN'&&scope.inside===true){

        const lease=gate?.status?.();if(lease?.owner==='stage'&&lease.tag==='tu-vuot')gate.release?.('stage');

      }else gate?.renew?.('stage');

    }

    if(!C.enableTuVuot||tuVuot.stopped || window.KVPV_GEAR36?.blocking?.()) {tvDisable();return;}



    

    // CRITICAL: any assigned job owns navigation, including non-common PvP scenes.

    

    if(job) {

      if(r && !r.entered)tuVuot.run=null;

      tvDisable();

      return;

    }

    // V8.6.28: a foreign event scene exclusively owns movement even in the

    // small interval BEFORE its scheduler has assigned `job`.

    if(!common() && mapNow()!==d.targetMap) {

      if(tuVuot.run)tuVuot.run=null; // do not count server relocation as stage defeat

      tvDisable();

      return;

    }

    if(!d.valid) {if(!common())tvDisable();return;}



    

    if(r && d.level>r.level) {tvWin(d.level);return;}



    

    const inStage=!common()&&mapNow()===d.targetMap;

    if(inStage && !tuVuot.run) {

      tuVuot.run={level:d.level,map:d.targetMap,requestedAt:t,

        entered:true,enteredAt:t,leftAt:0,auto:d.m.auto};

      return;

    }

    if(!tuVuot.run)return;

    const a=tuVuot.run;

    if(!a.entered) {

      if(!common()&&mapNow()===a.map) {

        a.entered=true;a.enteredAt=t;a.leftAt=0;

        return;

      }

      

      

      if(common()&&!job&&!d.m.auto&&t-a.requestedAt>=

        Math.max(8000,Number(C.tuVuotEnterRetryMs)||30000)) {

        tvFail('Game tu tat Tu Vuot truoc khi vao map '+a.map,true);

      }

      return;

    }

    if(!common()&&mapNow()===a.map) {a.leftAt=0;return;}



    

    if(!a.leftAt) {a.leftAt=t;return;}

    if(t-a.leftAt<Math.max(2500,Number(C.tuVuotExitConfirmMs)||5000))return;

    if(d.level>a.level) {tvWin(d.level);return;}

    if(d.level===a.level) {

      tvFail('Rời ải '+a.level+' mà server chưa tăng cấp ải');

    } else {

      

      tuVuot.run=null;

    }

  }

  function tuVuotIdle() {

    if (window.KVPV_EVENT_PRIORITY?.hold?.()) return false; 
    if (window.KVPV?.core?.scene?.can?.('stage')===false) return false;

    if(window.KVPV_GEAR36?.blocking?.())return false; // wait for safe equipment ACK

    if(!C.enableTuVuot||tuVuot.stopped)return false;

    if(now()<tuVuot.nextTryAt)return false;

    const d=tvData();

    if(!d.valid||!common()||job||inTeam()||inMission())return false;

    if(d.m.auto)return false;

    

    

    if(d.needed>=0 && Number(d.m.curWare)>=d.needed) {

      tuVuot.run={level:d.level,map:d.targetMap,requestedAt:now(),

        entered:false,enteredAt:0,leftAt:0};

    }

    if(window.KVPV?.core?.scene?.acquire?.('stage','tu-vuot')===false)return false;

    try {d.m.auto=true;}

    catch(e){window.KVPV?.core?.scene?.release?.('stage');throw e;}

    log('✅ Tự Vượt bật (thua '+tuVuot.failures+' / không giới hạn)');

    return true;

  }

  function tuVuotStop() {

    

    C.enableTuVuot=false;

    tuVuot.stopped=true;

    tuVuot.reason='Dung thu cong';

    tuVuot.stoppedAt=now();

    tuVuot.run=null;

    asyncStagePriorityAt=0;

    tvDisable();

    console.log('[TỰ VƯỢT] Da dung thu cong; Auto Daily van chay.');

    return tuVuotStatus();

  }

  function tuVuotStart() {

    

    C.tuVuotMaxConsecutiveFailures=Infinity;

    C.tuVuotMaxRejectedEntries=Infinity;

    C.enableTuVuot=true;

    tuVuot.stopped=false;

    tuVuot.reason='';

    tuVuot.stoppedAt=0;

    tuVuot.run=null;

    tuVuot.nextTryAt=0;

    asyncStagePriorityAt=0;

    console.log('[TỰ VƯỢT] Da bat khong gioi han; se tiep tuc khi ranh.');

    return tuVuotStatus();

  }

  function tuVuotReset() {

    

    tvDisable();

    tuVuot.failures=0;

    tuVuot.rejected=0;

    tuVuot.noticed=false;

    return tuVuotStart();

  }

  function tuVuotStatus() {

    const d=tvData();

    const ret={level:d.level,map:d.targetMap,gameAuto:!!d.m?.auto,

      failures:tuVuot.failures,maxFailures:C.tuVuotMaxConsecutiveFailures,

      rejected:tuVuot.rejected,maxRejected:C.tuVuotMaxRejectedEntries,

      locked:tuVuot.stopped,reason:tuVuot.reason,

      inStage:!!tuVuot.run?.entered,

      totalWins:tuVuot.totalWins,enabled:C.enableTuVuot,

      nextRetrySeconds:Math.ceil(Math.max(0,tuVuot.nextTryAt-now())/1000),

      unlimitedFailures:!Number.isFinite(Number(C.tuVuotMaxConsecutiveFailures)),

      unlimitedRejected:!Number.isFinite(Number(C.tuVuotMaxRejectedEntries)),

      dailyRunning:!!timer,

      currentJob:job?.type||'ranh',

      blockedReason:!C.enableTuVuot?'Da tat thu cong':

        tuVuot.stopped?(tuVuot.reason||'Da khoa'):

        !timer?'Auto Daily dang dung':job?('Dang lam '+job.type):

        inMission()?'Dang lam nhiem vu':inTeam()?'Dang trong doi':

        !common()?'Dang o canh khac':

        now()<tuVuot.nextTryAt?'Cho retry':

        window.KVPV_GEAR36?.blocking?.()?'Dang cho ACK trang bi':'San sang khi scheduler ranh'};

    console.table([ret]);return ret;

  }



  // =============================================================

  

  

  //   _Ba._Zpt._Jpt.inst.enterTime, _Ba._a1._h1.inst.hasFightTeam(),

  //   _Ba._sst._Cht.inst.rqEtScene(2162), scene type 42.

  

  

  // =============================================================

  let vinhDate='', vinhEnterAttempts=0, vinhLastRefresh=0, vinhLastTry=0;

  let vinhLastNotice='', vinhConfirmed=0;

  const vinhMinute=()=>{const c=vnClock();return c.h*60+c.min+c.sec/60;};

  const vinhWindow=()=>{const m=vinhMinute();return m>=1185 && m<1200;};

  const vinhPrep=()=>{

    if(!C.enableVinhDu)return false;

    const m=vinhMinute(), lead=Math.max(0,Math.min(40,Number(C.vinhDuPrepareMinutes)||0));

    return m>=1185-lead && m<1200;

  };

  function vinhData(){

    const model=_Ba?._Zpt?._Jpt?.inst;

    const rpc=_Ba?._Zpt?._nZt?.ins;

    const ft=_Ba?._a1?._h1?.inst;

    const server=boss()?.getCpSceneStateByType?.(42);

    const serverNow=Number(typeof _Sa!=='undefined'?_Sa.svrTime:NaN);

    const enterTime=Number(model?.enterTime);

    return {

      model,rpc,ft,server,serverNow,enterTime,

      hasTeam:typeof ft?.hasFightTeam==='function' && ft.hasFightTeam()===true,

      open:Number(server?.[2])===2,

      inside:scene()===42,

      map:mapNow(),

      ready:Number.isFinite(serverNow)&&Number.isFinite(enterTime)&&

        (enterTime<=0||serverNow>=enterTime)

    };

  }

  function vinhSyncDay(){

    const key=vnClock().dateKey;

    if(key!==vinhDate){

      vinhDate=key;vinhEnterAttempts=0;vinhLastRefresh=0;

      vinhLastTry=0;vinhLastNotice='';vinhConfirmed=0;

    }

  }

  function vinhNotice(sig,msg){

    if(vinhLastNotice!==vinhDate+'/'+sig){

      vinhLastNotice=vinhDate+'/'+sig;

      console.warn('[KVPV VINH DỰ]',msg);

    }

  }

  function vinhRefresh(t){

    const d=vinhData();

    if(typeof d.rpc?.GetFightTeamCopyEnterTime==='function' &&

       t-vinhLastRefresh>Math.max(5000,C.vinhDuRefreshMs)){

      vinhLastRefresh=t;

      d.rpc.GetFightTeamCopyEnterTime();

    }

  }

  function startVinhDu(adopt=false){

    if(!C.enableVinhDu||blocked('vinhdu'))return false;

    vinhSyncDay();

    const d=vinhData(),t=now();

    if(d.inside){

      begin('vinhdu','fighting',{insideAt:t,adopted:true});

      vinhConfirmed++;

      log('🏅 Đã tiếp quản Chiến Trường Vinh Dự (scene 42)');

      return true;

    }

    if(adopt||!vinhWindow()||!common()||inTeam()||inMission())return false;

    if(!d.hasTeam){

      vinhNotice('no-team','Chưa gia nhập Chiến Đội. Game bắt buộc có Chiến Đội trước khi vào Vinh Dự.');

      return false;

    }

    if(!d.open){

      vinhNotice('not-open','Server chưa xác nhận mở Chiến Trường Vinh Dự (scene 42).');

      return false;

    }

    vinhRefresh(t);

    if(!d.ready){

      vinhNotice('cooldown','Server đang đặt thời gian chờ vào lại Chiến Trường Vinh Dự.');

      return false;

    }

    if(vinhEnterAttempts>=C.vinhDuMaxEnterAttempts){

      vinhNotice('limit','Đã đạt giới hạn thử vào trận hôm nay.');

      return false;

    }

    if(t-vinhLastTry<C.vinhDuRetryMs)return false;

    const rq=api()?.rqEtScene;

    if(typeof rq!=='function'){

      vinhNotice('no-rpc','Chưa có hàm vào trận gốc của game.');

      return false;

    }

    vinhLastTry=t;vinhEnterAttempts++;

    begin('vinhdu','entering',{attempt:vinhEnterAttempts,lastTry:t});

    rq.call(api(),2162);

    log(`🏅 Vinh Dự 19:45: yêu cầu vào map 2162, lần ${vinhEnterAttempts}`);

    return true;

  }

  function followVinhDu(j,t){

    const d=vinhData();

    if(j.step==='entering'){

      if(d.inside){

        j.step='fighting';j.at=t;j.target.insideAt=t;

        vinhConfirmed++;

        log('✅ Server xác nhận: đã vào Chiến Trường Vinh Dự (scene 42)');

        return;

      }

      if(!vinhWindow() && t-j.at>2500)

        return finish(false,'Vinh Dự hết khung giờ trước khi xác nhận vào',60000);

      if(t-j.at>=C.vinhDuEnterTimeoutMs){

        due.vinhdu=t+C.vinhDuRetryMs;

        return finish(false,'Chưa chuyển sang scene 42, sẽ thử lại nếu server còn mở',3000);

      }

      return;

    }

    if(j.step==='fighting'){

      if(d.inside){

        

        const sinceEnd=vinhMinute()-1200;

        if(sinceEnd>0 && !d.open && sinceEnd*60000>C.vinhDuExitGraceMs){

          j.step='exiting';j.at=t;

          exitDungeon();

          log('🏅 Sự kiện đóng hơn thời gian chờ thưởng; yêu cầu Thoát');

        }

        return;

      }

      if(common()){

        due.vinhdu=t+C.vinhDuRetryMs;

        return finish(true,'Đã ra Chiến Trường Vinh Dự; Auto tiếp tục theo lịch');

      }

      // V9: a foreign scene after the battle is not proof of success.

      // Release the scheduler after a bounded grace period without navigating.

      if(!d.inside){

        j.target.foreignAt=j.target.foreignAt||t;

        if(t-j.target.foreignAt>30000)

          return finish(false,'Vinh Dự: server chuyển qua cảnh lạ, không tự thoát',60000);

      }

      return;

    }

    if(j.step==='exiting'){

      if(common())return finish(true,'Vinh Dự đã Thoát, chuyển việc tiếp theo');

      if(t-j.at>30000 && !j.target.fallback){

        j.target.fallback=true;api()?.rqEtScene?.(0);

      }

      if(t-j.at>60000)return finish(false,'Chưa xác nhận Thoát Vinh Dự',60000);

    }

  }



  // =============================================================

  // TRANH BA DINH CAO (21:00-21:30): Peak Arena activity id 120.

  // Source client: _Ba._CP._K1i._E1i() -> rqEtScene(2161).

  // Actual map 2161 = scene 14; model topPkData[2] cooldown server.

  // Before entering, require scene state(type 14)==2, plus activity

  // configuration agrees with map/type and game opens its function.

  // Not Peak Duel tournament (panels 421/425, type32).

  // =============================================================

  let dcDate='',dcTries=0,dcEntries=0,dcLastTry=0,dcLastAttack=0,dcLastNotice='';

  

  

  const dcTop={claimed:false,tries:0,npcId:0,lastSelect:0,lastRequest:0,

    pending:false,ackTime:0,reason:'',endAt:0};

  const dcClaimListener={};

  let dcClaimListening=false;

  const dcFloor=()=>Number(_Ba?._$a?._yo?.ins?.intoSce?.[3]);

  const dcOnTop=()=>scene()===14&&dcFloor()===9;

  function dcOnGatherSuccess(){

    if(!dcOnTop()||!dcTop.pending||now()-dcTop.lastRequest>60000)return;

    dcTop.claimed=true;dcTop.pending=false;dcTop.ackTime=now();

    dcTop.reason='Server da xac nhan gather thanh cong (notify 5038)';

    // Notification is generic; only this UI's pending+on-top gate narrows its context.

    try{window.KVPV?.eventAudit?.recordProof?.({key:'dinhcao',kind:'reward-context-confirmed',source:'native 5038 while floor 9 and claim pending'});}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

    log('🎁 ĐỈNH CAO TẦNG 9: ĐÃ NHẬN RƯƠNG (ACK 5038)');

  }

  function dcWatchClaim(){

    if(dcClaimListening||typeof _Sa==='undefined'||typeof _Sa.notify?.on!=='function')return;

    _Sa.notify.on(5038,dcClaimListener,dcOnGatherSuccess);dcClaimListening=true;

  }

  function dcUnwatchClaim(){

    if(!dcClaimListening)return;

    try{_Sa.notify.off(5038,dcClaimListener,dcOnGatherSuccess);}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

    dcClaimListening=false;

  }

  function dcTopNpcId(){

    

    

    let steps=null;

    try{steps=_ft?._wHt?.ins?.getCfgByLevel?.(9)?.[8];}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

    const rank=Number(_Ba?._CP?._n2t?.ins?.scenePromote?.[2]);

    if(!Array.isArray(steps)||!Number.isFinite(rank))return 0;

    for(let i=steps.length-1;i>=0;i--){

      const pair=steps[i];

      if(Array.isArray(pair)&&rank>=Number(pair[0])){

        const id=Number(pair[1]);

        return Number.isSafeInteger(id)&&id>0?id:0;

      }

    }

    return 0;

  }

  function dcClaimTopReward(t){

    if(!C.dinhCaoClaimTop||!dcOnTop()||dcTop.claimed)return;

    dcWatchClaim();

    const id=dcTopNpcId();

    if(!id){dcTop.reason='Chua co hang scenePromote[2] hoac ID ruong tu cfg level9[8]';return;}

    if(dcTop.npcId!==id){dcTop.npcId=id;dcTop.pending=false;dcTop.lastSelect=0;}

    

    

    

    const world=typeof _C!=='undefined'? _C?._Ba?.instance:null;

    if(typeof world?.getRole==='function'&&!world.getRole(id)){

      dcTop.reason='Dang cho NPC ruong #'+id+' xuat hien';return;

    }

    if(t-dcTop.lastSelect>=7000){

      dcTop.lastSelect=t;

      _Ba?._rJ?._O$?.ins?.selectTar?.(3,id); 

    }

    

    if(t-dcTop.lastSelect<3000)return;

    if(_Ba?._K_t?._Z7t?.ins?.gathering===true){

      dcTop.reason='Dang thu thap, cho server xac nhan';return;

    }

    if(dcTop.tries>=Math.max(1,Number(C.dinhCaoClaimMaxAttempts)||8)){

      dcTop.reason='Da dat gioi han '+dcTop.tries+' lan gui thu thap';return;

    }

    if(t-dcTop.lastRequest<Math.max(10000,Number(C.dinhCaoClaimRetryMs)||18000))return;

    const rpc=_Ba?._K_t?._q_t?.ins;

    if(typeof rpc?.gather!=='function'){

      dcTop.reason='Thieu ham gather native';return;

    }

    dcTop.lastRequest=t;dcTop.tries++;dcTop.pending=true;

    dcTop.reason='Da gui gather, dang cho ACK 5038';

    rpc.gather(id,0); // native: TAQx [tNpcId, mode=0]

    log('🎁 Đỉnh Cao tầng 9: thu thập Rương #'+id+'; lần '+dcTop.tries+'/8');

  }



  const dcMinute=()=>{const c=vnClock();return c.h*60+c.min+c.sec/60;};

  const dcWindow=()=>{const m=dcMinute();return m>=1260&&m<1290;};

  const dcPrepare=()=>{const m=dcMinute();return C.enableDinhCao&&

    m>=1260-Math.max(0,Math.min(15,Number(C.dinhCaoPrepareMinutes)||0))&&m<1290;};

  const dcInside=()=>scene()===14;

  function dcData(){

    let cfg=null;

    try{cfg=_ft?._gZ?.inst?.getCfgById?.(120)||null;}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

    const m=_Ba?._CP?._n2t?.ins;

    const state=boss()?.getCpSceneStateByType?.(14);

    const gate=_Ba?._Do?._Ho?.inst;

    const targetFromCfg=Number(cfg?.[9]);

    const sceneFromCfg=Number(cfg?.[7]);

    // Avoid assuming which navigation style the activity server uses.

    const configMatch=!!cfg && (sceneFromCfg===14||targetFromCfg===2161);

    const eventTimeMatch=!!cfg && String(cfg[2]??'').includes('21:00') &&

      String(cfg[2]??'').includes('21:30');

    const unlockId=Number(cfg?.[11]);

    const unlocked=Number.isInteger(unlockId)&&unlockId>0&&

      typeof gate?.getFcIsOpen==='function'?gate.getFcIsOpen(unlockId)===true:false;

    const time=Number(typeof _Sa==='undefined'?NaN:_Sa.svrTime);

    const cooldown=Number(m?.topPkData?.[2]);

    const ready=Number.isFinite(time)&&Number.isFinite(cooldown)&&cooldown<=time;

    return {cfg,m,state,configMatch,eventTimeMatch,unlocked,inside:dcInside(),

      open:Number(state?.[2])===2,ready,cooldown,time,map:mapNow(),

      attemptsRemaining:Number(m?.topPkData?.[0])};

  }

  function dcSyncDay(){const d=vnClock().dateKey;

    if(d!==dcDate){dcDate=d;dcTries=0;dcEntries=0;dcLastTry=0;

      dcLastAttack=0;dcLastNotice='';

      Object.assign(dcTop,{claimed:false,tries:0,npcId:0,lastSelect:0,

        lastRequest:0,pending:false,ackTime:0,reason:'',endAt:0});}



  }

  function dcWarn(k,msg){if(dcLastNotice===k)return;dcLastNotice=k;

    console.warn('[ĐỈNH CAO]',msg);}

  function startDinhCao(adopt=false){

    if(!C.enableDinhCao||blocked('dinhcao'))return false;

    dcSyncDay();const d=dcData(),t=now();

    if(d.inside){begin('dinhcao','fighting',{map:2161,lastAttack:0,exitTry:0});

      dcEntries++;log('🏔️ Tiếp quản Tranh Bá Đỉnh Cao scene 14');return true;}

    if(adopt||!dcWindow()||!common()||inTeam()||inMission())return false;

    if(C.dinhCaoRequireConfigMatch&&(!d.configMatch||!d.eventTimeMatch)){

      dcWarn('config','Config ID120 chưa khớp scene14/map2161 và lịch 21:00-21:30; KHÔNG vào nhầm. Xem KVPV_DAILY.dinhCaoStatus()');

      return false;

    }

    if(!d.unlocked){dcWarn('unlock','Game chưa xác nhận mở chức năng Peak Arena ID120');return false;}

    if(!d.open){dcWarn('open','Server chưa xác nhận mở scene 14');return false;}

    if(!d.ready){dcWarn('cooldown','Server đang chờ hết thời gian được vào lại');return false;}

    if(dcTries>=Math.max(1,Number(C.dinhCaoMaxAttempts)||15)){

      dcWarn('limit','Đã chạm giới hạn thử vào Đỉnh Cao hôm nay');return false;}

    if(t-dcLastTry<Math.max(10000,Number(C.dinhCaoRetryMs)||20000))return false;

    if(typeof api()?.rqEtScene!=='function'){

      dcWarn('api','Chưa tìm được hàm vào bản đồ');return false;}

    dcLastTry=t;dcTries++;

    begin('dinhcao','entering',{map:2161,exitTry:0,lastAttack:0});

    api().rqEtScene(2161);

    log('🏔️ Tranh Bá Đỉnh Cao: yêu cầu vào map2161 lần '+dcTries);

    return true;

  }

  function dcAutoTarget(j,t){

    if(t-(j.target.lastAttack||0)<Math.max(5000,Number(C.dinhCaoTargetRefreshMs)||12000))return;

    j.target.lastAttack=t;

    if(_Ba?._rJ?._O$?.ins?.isDead===true)return;

    const m=dcData().m;

    if(typeof m?.getAutoTarget!=='function'||typeof m?.setAutoTarget!=='function')return;

    const id=Number(m.getAutoTarget());

    if(Number.isInteger(id)&&id>0)m.setAutoTarget(id,true);

  }

  function followDinhCao(j,t){

    const d=dcData();

    if(j.step==='entering'){

      if(d.inside){dcEntries++;j.step='fighting';j.at=t;

        log('✅ Đỉnh Cao: server chuyển đến scene 14');return;}

      if(!dcWindow()&&t-j.at>3000)return finish(false,'Đỉnh Cao hết giờ trước khi vào',30000);

      if(t-j.at>Math.max(12000,Number(C.dinhCaoEnterTimeoutMs)||25000)){

        due.dinhcao=t+Math.max(10000,Number(C.dinhCaoRetryMs)||20000);

        return finish(false,'Chưa được server chuyển cảnh, sẽ thử lại có giới hạn');}

      return;

    }

    if(j.step==='fighting'){

      if(d.inside){

        

        

        if(dcOnTop()) dcClaimTopReward(t);

        if(dcMinute()>=1290){

          if(!j.target.afterEnd)j.target.afterEnd=t;

          

          

          if(dcOnTop()&&!dcTop.claimed){

            const maxWait=Math.max(35000,Number(C.dinhCaoClaimWaitAfterEndMs)||150000);

            if(t-j.target.afterEnd<maxWait)return;

            dcWarn('claimTimeout','Tầng 9 chưa xác nhận nhận rương sau '+Math.round(maxWait/1000)+' giây; sẽ thoát để tránh kẹt Auto. '+dcTop.reason);

          } else if(t-j.target.afterEnd<=Math.max(10000,Number(C.dinhCaoExitGraceMs)||35000)){

            return;

          }

          j.step='exiting';j.at=t;j.target.exitTry=1;

          exitDungeon();log('🚪 Đỉnh Cao hết giờ, yêu cầu thoát (Rương='+

            (dcTop.claimed?'đã nhận':dcOnTop()?'chưa xác nhận':'chưa tới tầng 9')+')');

          return;

        }

        if(!dcOnTop())dcAutoTarget(j,t);

        return;

      }

      if(common())return finish(true,'Rời Đỉnh Cao; tiếp tục train/hoạt động khác');

      if(t-j.at>30000)return finish(false,'Server chuyển đến cảnh khác; không can thiệp',30000);

      return;

    }

    if(j.step==='exiting'){

      if(common())return finish(true,'Đã thoát Đỉnh Cao');

      if(t-j.at>12000&&j.target.exitTry===1){

        j.target.exitTry=2;api()?.rqEtScene?.(0);

        log('🚪 Đỉnh Cao: yêu cầu thoát dự phòng');}

      if(t-j.at>50000)return finish(false,'Chưa thoát được Đỉnh Cao',60000);

    }

  }

  function dinhCaoStatus(){

    const d=dcData();const o={

      gioVN:new Date().toLocaleString('vi-VN',{timeZone:'Asia/Ho_Chi_Minh'}),

      trongGio:dcWindow(),dangGiuCho:dcPrepare(),

      cfgId:120,cfgScene:d.cfg?.[7],cfgMap:d.cfg?.[9],

      cfgTime:d.cfg?.[2],cfgMatch:d.configMatch,gioKhopp:d.eventTimeMatch,

      chucNangMo:d.unlocked,serverMo:d.open,hetHoiVao:d.ready,

      scene:scene(),dangTrongTran:d.inside,soLanThu:dcTries,soLanVao:dcEntries,

      soLanHoiSinh:d.attemptsRemaining,

      tang:dcFloor(),daClaimRuong:dcTop.claimed,ruongNpcId:dcTop.npcId,

      soLanThuClaim:dcTop.tries,dangChoClaim:dcTop.pending,

      lyDoClaim:dcTop.reason,daGanListenClaim:dcClaimListening};

    console.table([o]);return o;

  }



  // =============================================================

  

  

  // UI._EQi(): if(model.funIsOpen) rqEtScene(model.mapId);

  // funIsOpen = getFcIsOpen(818) + state(type 58 OR 61)==2.

  // model.mapId = server getCpSceneStateByType(58/61)[8].

  

  

  // =============================================================

  let tuLaDate='',tuLaTries=0,tuLaLastEnter=0,tuLaLastNotice='',tuLaLastTarget=0;

  let tuLaJoined=0,tuLaLastClaimQuery=0;

  const tuLaClaims=new Map(); // id -> {status, at, note}; one RPC until server state changes

  const TU_LA_LOCK_KEY='KVPV_TULA27_REWARDS_'+window.__KVPV_OWN_ACTOR_ID;

  let tuLaAcked=0,tuLaUnconfirmed=0;

  function saveTuLaLocks(){

    try{sessionStorage.setItem(TU_LA_LOCK_KEY,JSON.stringify({day:tuLaDate,

      claims:Array.from(tuLaClaims.entries())}));}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

  }

  function loadTuLaLocks(){

    try{const x=JSON.parse(sessionStorage.getItem(TU_LA_LOCK_KEY)||'null');

      if(x?.day!==tuLaDate||!Array.isArray(x.claims))return;

      for(const [id,row] of x.claims){

        if(Number.isInteger(id)&&id>0&&row&&['waiting','unconfirmed','acked'].includes(row.status))

          tuLaClaims.set(id,row);

      }

    }catch(_){window.KVPV_V1?.diagnostics?.record(_);}

  }

  function tuLaClock(){const c=vnClock();return {c,m:c.h*60+c.min+c.sec/60};}

  const tuLaDay=()=>[0,1,2,3,4].includes(vnClock().day);

  const tuLaWindow=()=>{const {m}=tuLaClock();return tuLaDay()&&m>=1230&&m<1245;};

  const tuLaPrepare=()=>{const {m}=tuLaClock();return C.enableTuLa&&tuLaDay()&&

    m>=1230-Math.max(0,Math.min(30,Number(C.tuLaPrepareMinutes)||0))&&m<1245;};

  const tuLaInside=()=>[58,61].includes(scene());

  function tuLaData(){

    const m=_Ba?._hE?._olt?.inst;

    const r=_Ba?._hE?._D1n?.inst;

    const st58=boss()?.getCpSceneStateByType?.(58);

    const st61=boss()?.getCpSceneStateByType?.(61);

    const st=Number(st58?.[2])===2?st58:Number(st61?.[2])===2?st61:null;

    const map=Number(st?.[8]);

    const opened=!!m && m.funIsOpen===true && st!==null;

    const ownMap=Number(m?.mapId);

    return {m,r,st58,st61,inside:tuLaInside(),opened,

      map:opened&&Number.isInteger(map)&&map>0&&map===ownMap?map:0,

      stage:Number(m?.stage),score:Number(m?.score),

      currentMap:mapNow()};

  }

  function tuLaNewDay(){

    const key=vnClock().dateKey;

    if(key!==tuLaDate){tuLaDate=key;tuLaTries=0;tuLaLastEnter=0;

      tuLaJoined=0;tuLaLastTarget=0;tuLaLastNotice='';

      tuLaLastClaimQuery=0;tuLaClaims.clear();tuLaAcked=0;tuLaUnconfirmed=0;

      loadTuLaLocks();}

  }

  function tuLaNotice(key,msg){

    if(tuLaLastNotice===key)return;

    tuLaLastNotice=key;

    console.warn('[KVPV TU LA]',msg);

  }

  function tuLaRefreshRewards(t){

    const d=tuLaData();

    if(!C.tuLaClaimReward||!d.inside||!d.r||!d.m)return;

    // Read-only refresh every minute; gameplay stays under the native combat AI.

    if(t-tuLaLastClaimQuery>60000&&typeof d.r.getShuraArenaTaskInfo==='function'){

      tuLaLastClaimQuery=t;d.r.getShuraArenaTaskInfo();

    }

    const ls=d.m._Sui;

    if(!Array.isArray(ls)||!ls.length||typeof d.r.getShuraArenaTaskReward!=='function')return;

    for(const item of ls){

      if(!Array.isArray(item)||item.length<3)continue;

      const id=Number(item[0]),state=Number(item[2]);

      if(!Number.isSafeInteger(id)||id<=0)continue;

      const lock=tuLaClaims.get(id);

      // Only the authoritative task state can confirm that a reward was handled.

      if(lock&&state===2){

        if(lock.status!=='acked'){tuLaAcked++;lock.status='acked';

          lock.note='Server confirmed claimed state=2';lock.ackAt=t;saveTuLaLocks();}

        continue;

      }

      // Other server states are not proof of claim; never claim a false ACK.

      if(state!==1)continue;

      if(lock){

        if(lock.status==='waiting'&&t-lock.at>=Math.max(30000,Number(C.tuLaRewardAckWarnMs)||90000)){

          lock.status='unconfirmed';lock.note='No server ACK; requires inspection';

          tuLaUnconfirmed++;saveTuLaLocks();

          console.warn('[TU LA V8.6.27] Phan thuong '+id+' chua co ACK: khoa gui lai, khong spam RPC.');

        }

        continue; // NEVER automatically replay the same uncertain reward RPC

      }

      const row={status:'waiting',at:t,note:'Reward request sent once'};

      tuLaClaims.set(id,row);saveTuLaLocks(); // lock before calling native RPC

      try{

        const result=d.r.getShuraArenaTaskReward(id);

        if(result===false)throw Error('Native reward function returned false');

        log('🏆 Tu La: đã yêu cầu nhận thưởng đủ điều kiện '+id+', chờ server');

      }catch(e){

        // An exception after a transport send is also uncertain: retain the lock.

        row.note='Native call raised: '+String(e);saveTuLaLocks();

        console.warn('[TU LA V8.6.27] Reward request uncertain; locked',id,e);

      }

      return; // at most one reward RPC per tick

    }

  }

  function tuLaTarget(t){

    const d=tuLaData();

    if(!C.tuLaAutoTarget||!d.inside||!d.m||

      !Number.isFinite(d.stage)||d.stage<1||

      typeof d.m.updAttack!=='function'||

      t-tuLaLastTarget<Math.max(5000,Number(C.tuLaTargetRefreshMs)||12000))return;

    if(_Ba?._rJ?._O$?.ins?.isDead === true)return;

    tuLaLastTarget=t;

    d.m.updAttack(); 

  }

  function startTuLa(adopt=false){

    if(!C.enableTuLa||blocked('tula'))return false;

    tuLaNewDay();

    const d=tuLaData(),t=now();

    if(d.inside){

      begin('tula','fighting',{adopted:true,lastInside:t,exitTry:0});

      tuLaJoined++;

      log('⚔️ Đã tiếp quản Tu La Lôi Đài scene '+scene());

      return true;

    }

    if(adopt||!tuLaWindow()||!common()||inTeam()||inMission())return false;

    if(!d.opened||!d.map){tuLaNotice('closed','Tu La chưa mở trên server hoặc mapId chưa hợp lệ');return false;}

    if(tuLaTries>=Math.max(1,Number(C.tuLaMaxEntries)||12)){

      tuLaNotice('limit','Đã hết số lần thử vào Tu La hôm nay');return false;

    }

    if(t-tuLaLastEnter<Math.max(10000,Number(C.tuLaRetryMs)||18000))return false;

    const f=api()?.rqEtScene;

    if(typeof f!=='function'){tuLaNotice('api','Thiếu hàm vào bản đồ');return false;}

    tuLaLastEnter=t;tuLaTries++;

    begin('tula','entering',{map:d.map,exitTry:0});

    f.call(api(),d.map);

    log('⚔️ Tu La: tự yêu cầu vào map server '+d.map+' (lần '+tuLaTries+')');

    return true;

  }

  function followTuLa(j,t){

    const d=tuLaData();

    if(j.step==='entering'){

      if(d.inside){

        j.step='fighting';j.at=t;j.target.lastInside=t;

        tuLaJoined++;

        log('✅ Tu La: server đã chuyển đến scene '+scene());return;

      }

      if(!tuLaWindow()&&t-j.at>3000)

        return finish(false,'Tu La đã hết giờ trước khi vào',30000);

      if(t-j.at>Math.max(10000,Number(C.tuLaEnterTimeoutMs)||22000)){

        due.tula=t+Math.max(10000,Number(C.tuLaRetryMs)||18000);

        return finish(false,'Tu La chưa chuyển cảnh, thử lại có giới hạn');

      }

      return;

    }

    if(j.step==='fighting'){

      if(d.inside){

        

        const minute=tuLaClock().m;

        if(!tuLaWindow()&&minute>=1245){

          j.step='exiting';j.at=t;j.target.exitTry=1;

          exitDungeon();

          log('⏰ Tu La hết 20:45, yêu cầu Thoát để vào Hồng Hoang');return;

        }

        tuLaTarget(t);

        tuLaRefreshRewards(t);

        return;

      }

      if(common()){

        due.tula=t+Math.max(10000,Number(C.tuLaRetryMs)||18000);

        return finish(true,'Rời Tu La; xét tiếp lịch hoạt động');

      }

      

      if(t-j.at>15000)return finish(false,'Đã chuyển khỏi scene Tu La, không can thiệp cảnh lạ',30000);

      return;

    }

    if(j.step==='exiting'){

      if(common())return finish(true,'Thoát Tu La thành công; ưu tiên Hồng Hoang');

      if(t-j.at>12000&&j.target.exitTry===1){

        j.target.exitTry=2;api()?.rqEtScene?.(0);

        log('🚪 Tu La: thử lệnh thoát dự phòng');

      }

      if(t-j.at>45000)return finish(false,'Tu La chưa xác nhận Thoát, cần kiểm tra game',60000);

    }

  }

  function tuLaStatus(print=true){

    const d=tuLaData();

    const o={gioVN:new Date().toLocaleString('vi-VN',{timeZone:'Asia/Ho_Chi_Minh'}),

      thuHopLe:tuLaDay(),trongGio:tuLaWindow(),dangGiuCho:tuLaPrepare(),

      serverMo:d.opened,banDoServer:d.map,canh:scene(),dangTrongTran:d.inside,

      giaiDoan:d.stage,diem:d.score,soLanThuVao:tuLaTries,soLanDaVao:tuLaJoined,

      choNhanThuong:Array.isArray(d.m?._Sui)?d.m._Sui.filter(x=>Number(x?.[2])===1).length:0,

      scriptRetarget:C.tuLaAutoTarget===true,

      tuVuotNativeAuto:_Ba?._Co?._Mo?.ins?.auto===true,

      pendingRewards:Array.from(tuLaClaims.values()).filter(x=>x.status==='waiting').length,

      unconfirmedRewards:Array.from(tuLaClaims.values()).filter(x=>x.status==='unconfirmed').length,

      ackedRewards:tuLaAcked,

      nativeCombatMode:d.m?.autoSelType??null};

    if(print)console.table([o]);return o;

  }

  function tuLaDiagnostics(){

    const st=tuLaStatus(false);

    return {version:'8.6.27',status:st,

      rewardClaims:Array.from(tuLaClaims.entries()).map(([id,row])=>({id,...row})),

      tuLaEntry:{tries:tuLaTries,joined:tuLaJoined,lastAttempt:tuLaLastEnter},

      note:'No forced movement. No blind reward RPC retry. Native Tu La AI remains in control.'};

  }



  // ==========================================================

  

  

  

  

  // ==========================================================

  function daoWindow() {

    const c=vnClock();

    const minute=c.h*60+c.min;

    return minute>=19*60 && minute<19*60+30;

  }

  function daoData() {

    const m=_Ba?._d_t?._p_t?.ins;

    const rpc=_Ba?._d_t?._aIt?.ins;

    const ui=_ft?._Y4n?.ins;

    const st=boss()?.getCpSceneStateByType?.(22);

    const cfg=_ft?._po?.ins?.getCfgById?.(C.daoTriMap);

    const remaining=m && num(m.maxCount) && num(m.count)

      ? Math.max(0,Number(m.maxCount)-Number(m.count)) : null;

    return {m,rpc,ui,st,remaining,

      map:C.daoTriMap,

      mapValid:Number(cfg?.[7])===22,

      inside:scene()===22 && mapNow()===C.daoTriMap,

      open:Number(st?.[2])===2,

      serverSeconds:typeof _Sa!=='undefined'?Number(_Sa.svrTime):NaN};

  }

  function startDaoTri(adopt=false) {

    if(!C.enableDaoTri || blocked('daotri'))return false;

    const d=daoData();

    if(!d.m || !d.ui || !d.rpc)return false;

    if(d.inside) {

      begin('daotri','collecting',{

        firstCount:Number(d.m.count)||0, catches:0,

        lastCatch:0, lastResponse:now(), awaiting:false,

        rewardSent:false, exitSent:false, uiRecovered:false

      });

      log('🌸 Đã tiếp quản Đào Nguyên Dao Trì; canh vùng bắt cá');

      return true;

    }

    if(adopt || !common() || inTeam() || inMission() || !daoWindow() ||

       !d.open || !d.mapValid)return false;

    const enterApi=api();

    if(typeof enterApi?.rqEtScene!=='function'){

      log('⚠️ Dao Trì: chưa có API vào map, chưa nhận quyền điều khiển cảnh');

      return false;

    }

    begin('daotri','entering',{

      firstCount:Number(d.m.count)||0, catches:0,

      lastCatch:0,lastResponse:now(),awaiting:false,

      rewardSent:false,exitSent:false,uiRecovered:false

    });

    enterApi.rqEtScene(d.map); // Existing native call. Return is NOT per-request ACK.

    log('🌸 Đã yêu cầu vào Đào Nguyên Dao Trì (2141)');

    return true;

  }

  function daoFishTick() {

    if(!timer || !C.enableDaoTri || job?.type!=='daotri' ||

       job.step!=='collecting' || scene()!==22 || !daoWindow())return;

    const d=daoData(), p=d.ui?.isOpened?.(219)

      ? d.ui.getPanelById?.(219):null;

    if(!p || p.destroyed || !p.parent ||

       !d.remaining || d.remaining<=0 || !p._qui || p._Kui ||

       typeof p._sjn!=='function')return;

    const f=p.curfish, range=p.effectiveRangeImg;

    if(!f || f.destroyed || !f.visible || f.ISzhua || !range)return;

    const x=Number(f.x), left=Number(range.x), width=Number(range.width);

    if(![x,left,width].every(Number.isFinite) || width<=0)return;

    const margin=Math.min(Math.max(0,Number(C.daoTriFishMarginPx)||0),width*0.25);

    if(x<left+margin || x>left+width-margin)return;

    const t=now();

    // V8.6.28: never click twice while the previous catch lacks a server ACK.

    // The old code only rate-limited to 900ms and could double-consume a turn.

    if(job.target.awaiting===true)return;

    if(t-(job.target.lastCatch||0)<C.daoTriCatchCooldownMs)return;

    job.target.lastCatch=t;

    job.target.catches=(job.target.catches||0)+1;

    job.target.awaiting=true;

    job.target.uiRecovered=false;

    p._sjn.call(p); 

    log(`🐟 Tự Bắt: cá x=${x.toFixed(1)}, vùng=${left.toFixed(1)}-${(left+width).toFixed(1)}, còn ${d.remaining} lượt`);

  }

  function followDaoTri(j,t) {

    const d=daoData();

    if(j.step==='entering') {

      if(d.inside) {

        j.step='collecting';j.at=t;

        log('✅ Vào Dao Trì; đứng nhận EXP và bắt cá tự động');

      } else if(t-j.at>C.daoTriEnterTimeoutMs) {

        return finish(false,'Đảo Nguyên Dao Trì không vào được',120000);

      }

      return;

    }

    if(j.step==='exiting') {

      if(common()) {due.daotri=t+C.daoTriCheckMs;

        return finish(true,'Đã rời Dao Trì; chuyển nhiệm vụ tiếp');}

      if(t-j.at>45000)return finish(false,'Dao Trì chưa thoát; chờ game tự ra',120000);

      return;

    }

    if(!d.inside) {

      if(common()) {due.daotri=t+C.daoTriCheckMs;

        return finish(true,'Đảo Nguyên Dao Trì đã kết thúc');}

      return;

    }

    

    const cnt=Number(d.m?.count);

    if(Number.isFinite(cnt) && cnt!==j.target.firstCount) {

      j.target.firstCount=cnt;

      j.target.awaiting=false;

      j.target.lastResponse=t;

      log(`🐟 Dao Trì còn ${d.remaining}/${d.m.maxCount} lượt bắt`);

    }

    

    

    if(j.target.awaiting && t-j.target.lastCatch>C.daoTriAckTimeoutMs &&

       !j.target.uiRecovered) {

      j.target.uiRecovered=true;

      // Keep awaiting=true until the authoritative remaining-count changes.

      // A UI refresh is NOT proof that the previous GrabSoap request failed.

      try {d.ui?.close?.(219);d.ui?.open?.(219);}

      catch(e) {console.warn('[ĐÀO TRÌ] Làm mới màn hình bắt cá:',e);}

      log('⏳ Chờ cá/server quá lâu, làm mới giao diện 219 một lần');

    }

    

    

    const ended=!daoWindow() || (d.st && !d.open);

    if(ended) {

      const awardAt=Number(d.m?.time);

      const canClaim=C.daoTriAutoClaimAfterEvent && Number.isFinite(awardAt) &&

        awardAt>1000000000 && Number.isFinite(d.serverSeconds) &&

        d.serverSeconds>=awardAt;

      if(canClaim && !j.target.rewardSent &&

         typeof d.rpc?.GetInCopyAward==='function') {

        j.target.rewardSent=true;

        d.rpc.GetInCopyAward();

        // Sent/attempted is NOT confirmed reward. Never trigger a second request here.

        try{window.KVPV?.eventAudit?.recordProof?.({key:'daotri',kind:'reward-requested',source:'native GetInCopyAward called'});}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

        log('🎁 Dao Trì: yêu cầu nhận thưởng sau khi đã hết thời gian (chưa xác nhận ACK)');

      }

      if(!j.target.exitSent && (!Number.isFinite(awardAt) ||

         !Number.isFinite(d.serverSeconds) || d.serverSeconds>=awardAt)) {

        j.target.exitSent=true;

        j.step='exiting';j.at=t;

        exitDungeon();

        log('🚪 Dao Trì hết giờ, yêu cầu Thoát');

      }

    }

  }



  // ==========================================================

  

  

  

  

  

  

  

  

  // ==========================================================

  const EVENT_SCHEDULE = [

    {key:'dao_nguyen', name:'Đảo Nguyên Dao Trì', slots:['19:00-19:30'], action:'auto'},

    {key:'tien_phuc', name:'Sự Kiện Tiên Phúc', instants:['15:00','15:30','18:00','18:30','23:00']},

    {key:'tien_ton', name:'Tiên Tôn Đấu Kỹ', slots:['19:30-19:45'], action:'auto'},

    {key:'diet_tho_hao', name:'Diệt Thổ Hào', slots:['20:00-20:30'], days:[2,4,6]},

    {key:'vinh_du', name:'Chiến Trường Vinh Dự', slots:['19:45-20:00'],action:'auto'},

    {key:'tranh_ba_tu_phuong', name:'Tranh Bá Tứ Phương', slots:['20:30-20:45'],days:[6]},

    {key:'tranh_ba_dinh_cao', name:'Tranh Bá Đỉnh Cao', slots:['21:00-21:30'], action:'auto'},

    {key:'tien_ma', name:'Tiên Ma Quyết Chiến', slots:['20:30-20:45'], days:[5]},

    {key:'tu_la', name:'Tu La Lôi Đài', slots:['20:30-20:45'], days:[0,1,2,3,4], action:'auto'},

    {key:'tien_duyen_tac_chien', name:'Tiên Duyên Tác Chiến', slots:['20:00-20:25'], days:[1]},

    {key:'chien_doi', name:'Chiến Đội Mạnh Nhất', slots:['20:00-20:27'], days:[3]},

    {key:'sa_thanh', name:'Quyết Chiến Sa Thành', slots:['20:00-20:30'], days:[2], unlock:'Liên server đủ 45 ngày'},

    {key:'tam_tien', name:'Tầm Tiên Vấn Đạo', action:'auto', priority:1, slots:['19:00-19:30'], days:[2,6], unlock:'Liên server đủ 30 ngày'},

    {key:'thien_the', name:'Thiên Thể 8 Tầng', slots:['21:00-21:30'], days:[0,1,3,5], unlock:'Liên server đủ 30 ngày'},

    {key:'honghoang', name:'Hồng Hoang Bí Bảo', slots:['11:30-12:00','20:45-21:00'], action:'auto', priority:1},

    {key:'tientuyen', name:'BOSS Chiến Tuyến Lv.1300', slots:['12:00-12:30','21:30-22:00'], action:'auto'},

    {key:'lanhdia', name:'Lãnh Địa BOSS', slots:['12:30-12:45'], action:'auto'},

    {key:'dua_thuyen', name:'Đua Thuyền Rồng', slots:['15:00-15:30']},

    {key:'ho_tong', name:'Hộ Tống x2', slots:['15:15-17:00','21:45-22:45']},

    {key:'trieu_hoi', name:'Triệu Hồi Hỗ Trợ', slots:['12:40-13:45']}

  ];

  const SCHEDULE_BY_KEY = Object.fromEntries(EVENT_SCHEDULE.map(x => [x.key,x]));

  // V10.2: use the same verified schedule in the pure reservation planner.

  window.KVPV?.timeline?.setSchedule?.(EVENT_SCHEDULE);

  const eventAnnouncements = new Set();



  function vnClock() {

    const parts=Object.fromEntries(Intl.DateTimeFormat('en-GB',{

      timeZone:'Asia/Ho_Chi_Minh',year:'numeric',month:'2-digit',day:'2-digit',

      hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'

    }).formatToParts(new Date()).map(x=>[x.type,x.value]));

    const y=+parts.year, m=+parts.month, d=+parts.day;

    return {

      y,m,d,h:+parts.hour,min:+parts.minute,sec:+parts.second,

      day:new Date(Date.UTC(y,m-1,d)).getUTCDay(),

      localMinute:Date.UTC(y,m-1,d,+parts.hour,+parts.minute)/60000,

      dateKey:`${parts.year}-${parts.month}-${parts.day}`

    };

  }

  const atMinute = text => {

    const v=String(text).split(':').map(Number);

    return v[0]*60+v[1];

  };

  const hhmm = n => `${String(Math.floor(n/60)).padStart(2,'0')}:${String(n%60).padStart(2,'0')}`;



  function eventOccurrences(daysForward=7) {

    const clock=vnClock();

    const today=Date.UTC(clock.y,clock.m-1,clock.d)/60000;

    const entries=[];

    for(let offset=0;offset<=daysForward;offset++) {

      const d=new Date((today+offset*1440)*60000);

      const weekday=d.getUTCDay();

      const dateKey=d.toISOString().slice(0,10);

      for(const ev of EVENT_SCHEDULE) {

        if(Array.isArray(ev.days) && !ev.days.includes(weekday))continue;

        for(const slot of ev.slots||[]) {

          const [a,b]=slot.split('-');

          const start=today+offset*1440+atMinute(a);

          const end=today+offset*1440+atMinute(b);

          entries.push({key:ev.key,name:ev.name,start,end,dateKey,

            time:slot,action:ev.action||'nhắc lịch',unlock:ev.unlock||'',priority:ev.priority||10});

        }

        for(const tm of ev.instants||[]) {

          const start=today+offset*1440+atMinute(tm);

          

          entries.push({key:ev.key,name:ev.name,start,end:start+1,dateKey,

            time:tm+' (mốc)',instant:true,action:'nhắc lịch',unlock:ev.unlock||'',priority:ev.priority||10});

        }

      }

    }

    entries.sort((a,b)=>a.start-b.start || a.priority-b.priority);

    return {nowMinute:clock.localMinute+clock.sec/60,entries};

  }



  function eventScheduleStatus() {

    const {nowMinute,entries}=eventOccurrences();

    const active=entries.filter(x=>nowMinute>=x.start&&nowMinute<x.end);

    const upcoming=entries.filter(x=>x.start>nowMinute).slice(0,10);

    return {

      tz:'Asia/Ho_Chi_Minh',

      localTime:new Date().toLocaleString('vi-VN',{timeZone:'Asia/Ho_Chi_Minh'}),

      active,upcoming

    };

  }

  function eventScheduleTick() {

    if(!C.enableEventSchedule || !C.eventConsoleNotices)return;

    const {nowMinute,entries}=eventOccurrences(1);

    const lead=Math.max(0,Number(C.eventNoticeMinutes)||0);

    for(const ev of entries) {

      const delta=ev.start-nowMinute;

      if(delta > lead || nowMinute >= ev.end)continue;

      const phase=delta>0?'soon':'start';

      const sig=`${ev.dateKey}/${ev.key}/${ev.time}/${phase}`;

      if(eventAnnouncements.has(sig))continue;

      eventAnnouncements.add(sig);

      const hint=ev.action==='auto'?'đã có module tự chạy':ev.action==='trace'?'ghi thao tác để hoàn thiện Auto, chưa tự vào':'theo dõi lịch, chưa tự vào';

      const prefix=delta>0?`⏳ Còn ${Math.ceil(delta)} phút`:'🕒 ĐANG TRONG GIỜ';

      console.log(`[LỊCH KVPV] ${prefix}: ${ev.name} ${ev.time} (${hint})${ev.unlock?' | '+ev.unlock:''}`);

    }

    

    if(eventAnnouncements.size>500)eventAnnouncements.clear();

  }

  function preparingHongHoang() {

    if(!C.enableEventSchedule || !C.reserveHongHoang || !C.enableHongHoang)return null;

    const {nowMinute,entries}=eventOccurrences(1);

    const hh=entries.find(x=>x.key==='honghoang' &&

      x.start>nowMinute &&

      (x.start-nowMinute)*60000<=Math.max(0,Number(C.reserveHongHoangBeforeMs)||0));

    if(!hh)return null;

    const h=hongData();

    

    if(!h?.m || h.full || !h.map || !(h.xianFa>0))return null;

    return hh;

  }



  // ==========================================================

  

  

  

  

  // ==========================================================

  const tienTonState = {

    active:false, manual:false, paused:false,

    startedAt:0, stoppedAt:0, hooks:[], calls:[]

  };



  function tienTonWindow() {

    const c=vnClock();

    const minutes=c.h*60+c.min;

    return minutes>=19*60+30 && minutes<19*60+45;

  }



  function tienTonCompact(value,depth=0) {

    try {

      if (value===null || value===undefined) return value??null;

      if (['string','number','boolean'].includes(typeof value)) return value;

      if (typeof value==='function') return '[function]';

      if (depth>=2) return '[object]';

      if (Array.isArray(value)) {

        const a=value.slice(0,20).map(x=>tienTonCompact(x,depth+1));

        if (value.length>20) a.push('...');

        return a;

      }

      if (typeof value==='object') {

        const o={};

        for (const key of Object.keys(value).slice(0,8)) {

          o[key]=tienTonCompact(value[key],depth+1);

        }

        return o;

      }

      return String(value);

    } catch {return '[unreadable]';}

  }



  function tienTonRecord(name,args) {

    const c=vnClock();

    const entry={

      time:`${String(c.h).padStart(2,'0')}:${String(c.min).padStart(2,'0')}:${String(c.sec).padStart(2,'0')}`,

      method:name,

      args:args.map(x=>tienTonCompact(x)),

      scene:scene(),map:mapNow(),

      job:job?.type||'rảnh'

    };

    if (C.tienTonTraceStacks) {

      entry.stack=new Error().stack?.split('\n').slice(2,6).join('\n')||'';

    }

    tienTonState.calls.push(entry);

    const cap=Math.max(10,Math.min(1000,Number(C.tienTonTraceMaxCalls)||150));

    if (tienTonState.calls.length>cap) {

      tienTonState.calls.splice(0,tienTonState.calls.length-cap);

    }

    if (C.tienTonTraceConsole) {

      console.log('[TIÊN TÔN TRACE]',entry.time,name,entry.args,'scene='+entry.scene,'job='+entry.job);

    }

  }



  function tienTonHook(obj,key,label) {

    if (!obj || typeof obj[key]!=='function')return;

    const original=obj[key];

    function wrapped(...args) {

      try {tienTonRecord(label,args);} catch(e) {

        console.warn('[TIÊN TÔN] Không ghi được thao tác:',e);

      }

      return original.apply(this,args);

    }

    try {

      obj[key]=wrapped;

      if (obj[key]===wrapped) {

        tienTonState.hooks.push({obj,key,original,wrapped});

      }

    } catch(e) {

      console.warn('[TIÊN TÔN] Không theo dõi được '+label,e);

    }

  }



  function tienTonTraceInstall() {

    if (tienTonState.active)return true;

    const ui=_ft?._Y4n?.ins;

    const nav=_Ba?._xf?._Kf?.instance;

    const mapApi=api();

    const matcher=_Ba?._cm?._u3t?.ins;

    tienTonHook(ui,'open','UI.open');

    tienTonHook(nav,'openPanelByEnterId','Khác / mở chức năng');

    tienTonHook(nav,'openPanelByPanelId','Mở giao diện chức năng');

    tienTonHook(mapApi,'rqEtScene','Vào bản đồ');

    tienTonHook(matcher,'creSerAreRoom','Ghép tổ đội');

    tienTonState.active=tienTonState.hooks.length>0;

    if (tienTonState.active) {

      tienTonState.startedAt=now();

      console.log('[TIÊN TÔN] 🔎 Đã bật ghi thao tác (chưa tự đánh).');

    }

    return tienTonState.active;

  }



  function tienTonTraceUninstall() {

    if (!tienTonState.active && !tienTonState.hooks.length)return;

    for (const h of tienTonState.hooks.reverse()) {

      try {

        if (h.obj[h.key]===h.wrapped)h.obj[h.key]=h.original;

      } catch(e) {console.warn('[TIÊN TÔN] Lỗi hoàn tác:',e);}

    }

    tienTonState.hooks=[];

    tienTonState.active=false;

    tienTonState.stoppedAt=now();

    console.log('[TIÊN TÔN] Đã dừng ghi thao tác. Dữ liệu vẫn giữ trong tienTonTrace.calls().');

  }



  function tienTonTraceSync() {

    const shouldRun=C.enableTienTonTrace && !tienTonState.paused &&

      (tienTonState.manual || tienTonWindow());

    if (shouldRun && !tienTonState.active) tienTonTraceInstall();

    else if (!shouldRun && tienTonState.active) tienTonTraceUninstall();

  }



  const tienTonTrace={

    start() {

      tienTonState.manual=true;

      tienTonState.paused=false;

      return tienTonTraceInstall();

    },

    stop() {

      tienTonState.manual=false;

      tienTonState.paused=true;

      tienTonTraceUninstall();

    },

    resumeAuto() {

      tienTonState.manual=false;

      tienTonState.paused=false;

      tienTonTraceSync();

    },

    clear() {tienTonState.calls.length=0;},

    calls() {return tienTonState.calls.map(x=>({...x,args:[...x.args]}));},

    status() {

      const s={

        dangGhi:tienTonState.active,

        trongGio:tienTonWindow(),

        cheDoThuCong:tienTonState.manual,

        tamDung:tienTonState.paused,

        soLenh:tienTonState.calls.length,

        phuongThuc:tienTonState.hooks.map(x=>x.key),

        scene:scene(),map:mapNow(),job:job?.type||'rảnh'

      };

      console.table([s]);return s;

    }

  };



    

  

  

  

  

  

  const SMELTS = [

    {key:'equip', name:'Trang Bị', event:5081, batchSize:25},

    {key:'holy', name:'Thánh Trang', event:5765, batchSize:15},

    {key:'pet', name:'Thần Thú', event:6297, batchSize:30}

  ];

  const smeltBackoff={equip:0,holy:0,pet:0};

  const smeltAck={equip:0,holy:0,pet:0};

  const smeltHandlers={};

  let smeltListenersInstalled=false;

  let holyRefreshAt=0;

  let smeltDrainEquip=false; // once >=25 native-eligible items, drain the remainder to zero



  function smeltData() {

    const b=_Ba?._Ic?._aQ?.ins;

    const ui=_ft?._Y4n?.ins;

    const im=_Ba?._MT?.immortalsEquipSb?._Mtt?.ins;

    if (!b || !ui || typeof b.getCanFusionItems!=='function' ||

        typeof b.getAnmlFusions!=='function') return null;

    if (job?.type!=='smelt' && now()>=holyRefreshAt &&

        !ui.isOpened?.(528) && typeof im?._wtt==='function') {

      im._wtt();holyRefreshAt=now()+60000;

    }

    const getList=key=>{

      try {

        const arr=key==='equip'?b.getCanFusionItems():

          key==='pet'?b.getAnmlFusions():im?.getSmeltRank?.();

        return Array.isArray(arr)?arr:null;

      } catch(e) { console.warn('Đọc danh sách dung luyện',key,e);return null; }

    };

    const e=getList('equip'), h=getList('holy'), p=getList('pet');

    return {b,ui,im,equip:e,holy:h,pet:p,

      counts:{equip:e?.length??null,holy:h?.length??null,pet:p?.length??null},

      free:Number(b.getBagLeftNumById?.(1)),

      threshold:Number(_ft?._gY?.ins?.getCfgById?.(10007)?.[2]?.[0])};

  }

  function holyHasGold(x) {

    return Array.isArray(x?.[4]?.[1]) && x[4][1].length>0;

  }

  function smeltEligible(s,key) {

    const list=s?.[key];

    if (!Array.isArray(list)) return [];

    return list.filter(x=>Array.isArray(x) && x[2]!=null &&

      (key!=='holy' || !holyHasGold(x)));

  }

  function smeltCandidate(s,j) {

    if (!s) return null;

    return SMELTS.find(x=>C.smeltEnabled[x.key] &&

      !blocked('smelt_'+x.key) && now()>=smeltBackoff[x.key] &&

      !(j?.target?.skipped?.[x.key]) &&

      (j?.target?.batchesByTab?.[x.key]??0)<C.smeltMaxBatchesPerTab &&

      (x.key!=='equip' || smeltDrainEquip) &&

      smeltEligible(s,x.key).length>0);

  }

  function watchSmeltAcks() {

    if (smeltListenersInstalled) return true;

    const n=typeof _Sa!=='undefined'?_Sa?.notify:null;

    if (!n || typeof n.on!=='function' || typeof n.off!=='function') {

      log('⚠️ Không có notify từ game; tạm bỏ qua dung luyện');

      return false;

    }

    try {

      for (const x of SMELTS) {

        const callback=()=>{smeltAck[x.key]++;};

        smeltHandlers[x.key]=callback;

        n.on(x.event,smeltHandlers,callback);

      }

      smeltListenersInstalled=true;

      return true;

    } catch(e) {

      console.warn('Không đăng ký được tín hiệu dung luyện',e);

      unwatchSmeltAcks();return false;

    }

  }

  function unwatchSmeltAcks() {

    const n=typeof _Sa!=='undefined'?_Sa?.notify:null;

    if (n?.off) for(const x of SMELTS) {

      if(smeltHandlers[x.key]) {

        try {n.off(x.event,smeltHandlers,smeltHandlers[x.key]);} catch(e){window.KVPV_V1?.diagnostics?.record(e);}

      }

    }

    for(const k of Object.keys(smeltHandlers)) delete smeltHandlers[k];

    smeltListenersInstalled=false;

  }

  function smeltRequest(key,ids) {

    if (!ids.length) return false;

    if (key==='equip') {

      const rpc=_Ba?._Ic?._oJ?.instance;

      if (typeof rpc?.c2sOneKeyFusion!=='function') return false;

      rpc.c2sOneKeyFusion(ids);

    } else if (key==='holy') {

      const rpc=_Ba?._MT?.immortalsEquipSb?._xtt?.ins;

      if(typeof rpc?.oneKeySmelt!=='function') return false;

      rpc.oneKeySmelt(ids);

    } else if (key==='pet') {

      const rpc=_Ba?._Ol?._C0n?.ins;

      if(typeof rpc?.oneKeyResolve!=='function') return false;

      rpc.oneKeyResolve([ids]);

    } else return false;

    return true;

  }

  function smeltSkipTab(j,key,msg,delay=C.smeltBackoffMs) {

    smeltBackoff[key]=now()+delay;

    j.target.skipped[key]=true;

    j.step='choosePart';j.at=now();

    j.target.sent=null;

    log('⚠️ '+key+': '+msg+'; hoãn tab, Auto Daily vẫn chạy');

  }



  // ==========================================================

  

  

  // ==========================================================

  function hongMaps() {

    const table = _ft?._po?.ins?._gh;

    if (!table) return [];

    return [...new Set(Object.values(table)

      .filter(row => Array.isArray(row) && Number(row[7]) === 17 && Number(row[0]) > 0)

      .map(row => Number(row[0])))];

  }

  function hongData() {

    const m = _Ba?._OBt?._WBt?.inst;

    const ui = _ft?._Y4n?.ins;

    const state = boss()?.getCpSceneStateByType?.(17);

    const maps = hongMaps();

    const preset = Number(C.hongHoangMap);

    const map = preset > 0 && maps.includes(preset)

      ? preset : preset === 0 && maps.length === 1 ? maps[0] : null;

    const count = Number(m?.gathCount);

    const max = Number(m?.maxNum);

    return {

      m, ui, state, maps, map, count, max,

      eventOpen: Number(state?.[2]) === 2,

      full: Boolean(m?.getGathCountIsMax?.()),

      xianFa: Number(m?.xFId),

      isInside: scene() === 17

    };

  }

  function startHong() {

    const h = hongData();

    if (!C.enableHongHoang || blocked('honghoang') || !h.m ||

        !(Number.isFinite(h.xianFa) && h.xianFa > 0)) return false;

    if (h.isInside) {

      begin('honghoang','collecting', {
        baseline:h.count, lastProgress:now(), lastRetargetCount:h.count, exitAttempts:0

      });

      log('🎁 Hồng Hoang ưu tiên số 1: chỉ Rương Tiên Pháp');

      return true;

    }

    if (!common() || inTeam() || inMission() || !h.eventOpen || h.full || !h.map) return false;

    // Do not claim ownership of a job until the verified native entry API exists.

    const enterApi=api();

    if(typeof enterApi?.rqEtScene!=='function'){

      log('⚠️ Hồng Hoang: chưa có API vào map; giữ Auto Daily rảnh để thử ở lần sau');

      return false;

    }

    begin('honghoang','entering', {
      map:h.map, baseline:h.count, lastRetargetCount:h.count, exitAttempts:0

    });

    enterApi.rqEtScene(h.map); // existing native call; return is NOT server ACK

    try{window.KVPV?.actions?.recordCall?.({kind:'hong-enter',targetMap:h.map,baseline:h.count});}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

    log('🚀 Hồng Hoang: gửi yêu cầu vào map ' + h.map);

    return true;

  }

  function followHong(j,t) {

    const h=hongData();

    if (j.step==='entering') {

      if (h.isInside) {

        j.step='collecting'; j.at=t;

        j.target.lastProgress=t;

        log('✅ Đã vào Hồng Hoang');

      } else if (t-j.at > C.hongHoangEnterTimeoutMs) {

        return finish(false,'Hồng Hoang không chuyển cảnh',C.hongHoangRetryMs);

      }

      return;

    }

    if (j.step==='exiting') {

      if (common()) {

        due.honghoang=t+C.hongHoangMs;

        return finish(true,'Đã thoát Hồng Hoang');

      }

      if (t-j.at > 16000 && !j.target.exitAttempts) {

        j.target.exitAttempts=1;

        const exitApi=api();

        if(typeof exitApi?.rqEtScene==='function'){

          exitApi.rqEtScene(0); // existing fallback native call

          try{window.KVPV?.actions?.recordCall?.({kind:'hong-exit'});}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

        }

        log('🚪 Hồng Hoang: thử yêu cầu Thoát dự phòng');

      }

      if (t-j.at > 45000)

        return finish(false,'Chưa xác nhận thoát Hồng Hoang',C.hongHoangRetryMs);

      return;

    }

    if (!h.isInside) {

      if (common()) return finish(false,'Rời Hồng Hoang trước khi hoàn tất',C.hongHoangRetryMs);

      return;

    }

    

    if (h.full || (h.state && !h.eventOpen)) {

      j.step='exiting'; j.at=t;

      exitDungeon();

      try{window.KVPV?.actions?.recordCall?.({kind:'hong-exit'});}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

      log(h.full?'🎁 Hồng Hoang đã đủ lượt; Thoát':'⏰ Hết giờ Hồng Hoang; Thoát');

      return;

    }

    if (Number.isFinite(h.count) && h.count!==j.target.baseline) {

      j.target.baseline=h.count; j.target.lastProgress=t;

      log(`🎁 Hồng Hoang ${h.count}/${h.max}`);

    }

    if (t-j.target.lastProgress>C.hongHoangNoProgressMs) {

      j.step='exiting'; j.at=t;

      due.honghoang=t+C.hongHoangRetryMs;

      exitDungeon();

      try{window.KVPV?.actions?.recordCall?.({kind:'hong-exit'});}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

      log('⚠️ Hồng Hoang không tiến triển 2 phút; Thoát để tránh kẹt');

      return;

    }

    const gathering=_Ba?._K_t?._Z7t?.ins?.gathering===true;

    const p=h.ui?.isOpened?.(215)?h.ui.getPanelById?.(215):null;

    if (!gathering && Number.isFinite(h.count) &&

        h.count!==j.target.lastRetargetCount &&

        t-j.target.lastProgress>=C.hongHoangRetargetMs &&

        p && !p.destroyed && p.parent && typeof p._Igi==='function') {

      p._Igi.call(p);

      j.target.lastRetargetCount=h.count;

      try{window.KVPV?.actions?.recordCall?.({kind:'hong-target',baseline:h.count});}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

      log(`🎯 Hồng Hoang: thử tìm rương tiếp theo (${h.count}/${h.max})`);

    }

  }



  function expData() {

    const m = _Ba?._cm?._vJ?.ins, matcher = _Ba?._cm?._u3t?.ins;

    return m && num(m.remainTimes) && typeof matcher?.creSerAreRoom === 'function'

      ? {n:Number(m.remainTimes), yes:red(53), matcher} : null;

  }

  

  

  

  function tienDuyenData() {

    const m=_Ba?._Yo?.marryCopy?._gOt?.ins;

    const rpc=_Ba?._Yo?.marryCopy?._mOt?.ins;

    const marriage=_Ba?._Yo?._tdt?.instance;

    const ui=_ft?._Y4n?.ins;

    if (!m || !ui || !marriage || typeof marriage.isMarry!=='function') return null;

    const copyTime=m.copyTime;

    const readied=Array.isArray(copyTime) && copyTime.length>0;

    const total=Number(m.maxCopyNum);

    const spent=Number(m.copyFightNum);

    return {

      m,rpc,marriage,ui,readied,

      married:marriage.isMarry()===true,

      total,spent,

      remaining:readied && Number.isFinite(total) && Number.isFinite(spent)

        ? Math.max(0,total-spent) : null,

      merge:m.isCombin===true || m.isCombin===1,

      yes:red(377)

    };

  }

  let tienDuyenRefreshAt=0;

  

  

  const td925 = {runs:0, confirmedRuns:0, unverified:0, taskClaims:0, cardClaims:0,

    ringRequests:0, ringConfirmed:0, last:'Chưa chạy', history:[], taskSeen:new Set()};

  const td925Cfg = {

    enableRewards:true, enableRingUpgrade:true, enableCardDaily:true,

    maxRingRequestsPerRun:25, maxTaskClaimsPerRun:8,

    verificationTimeoutMs:23000, ackTimeoutMs:10000

  };

  function td925Log(note){

    td925.last=note;

    td925.history.push({at:new Date().toISOString(),note});

    if(td925.history.length>40)td925.history.shift();

    log('💞 V9.2.5 '+note);

  }

  function td925Ring(){

    const model=_Ba?._Yo?.marryRing?._Wo?.ins;

    const rpc=_Ba?._Yo?.marryRing?._gGt?.ins;

    const bag=_Ba?._Ic?._aQ?.ins;

    const cfg=_ft?._gY?.ins?.getCfgById?.(81016);

    const itemId=Number(cfg?.[2]?.[0]);

    const qty=Number(bag?.getItemCountById?.(itemId));

    const lv=Number(model?._level), exp=Number(model?._exp);

    const type=Number(model?._type);

    const feed=_ft?._MWi?.ins;

    const max=Number(feed?.getMaxLvByType?.(type));

    return {model,rpc,itemId,qty,lv,exp,type,max,

      ready:Number.isInteger(itemId)&&itemId>0&&Number.isFinite(qty)&&

       Number.isFinite(lv)&&Number.isFinite(exp)&&Number.isFinite(max)&&max>0&&

       !!model&&typeof rpc?.AddMarryRingExp==='function',

      can:!!model?.checkRingUPRP?.()};

  }

  function td925Tasks(){

    const model=_Ba?._Yo?.marryTask?._eOt?.ins;

    const rpc=_Ba?._Yo?.marryTask?._fOt?.ins;

    const rows=[...(model?.getTask?.(1)||[]),...(model?.getTask?.(2)||[])];

    return {model,rpc,ready:!!model&&Array.isArray(model?.getTask?.(1))&&Array.isArray(model?.getTask?.(2)),

      eligible:rows.filter(r=>Array.isArray(r)&&r[3]===1&&Number.isInteger(Number(r[0])))

        .map(r=>Number(r[0]))};

  }

  function td925Card(){

    const m=_Ba?._Yo?.marryCard?._YGt?.ins;

    const rpc=_Ba?._Yo?.marryCard?._QGt?.ins;

    return {m,rpc,available:Number(m?.marryRewardItemState)===1&&

      Number(m?.marryRewardState)===1};

  }

  function td925Status(){

    const s=tienDuyenData(),r=td925Ring(),ts=td925Tasks(),c=td925Card();

    const out={version:'9.2.5',actor:String(_Ba?._rJ?._O$?.ins?.actorId||''),

      inDungeon:scene()===36||mapNow()===2381,

      copyUsed:s?.spent??null,copyRemaining:s?.remaining??null,married:s?.married??null,

      activeJob:job?.type==='tienduyen'?job.step:null,

      confirmedRuns:td925.confirmedRuns,unverifiedRuns:td925.unverified,

      taskClaims:td925.taskClaims,cardClaims:td925.cardClaims,

      ringRequests:td925.ringRequests,ringConfirmed:td925.ringConfirmed,

      ringLevel:r.lv,ringExp:r.exp,ringItems:r.qty,

      readyMarriageTasks:ts.eligible,cardRewardReady:c.available,

      last:td925.last};

    console.table([out]);return out;

  }

  function startTienDuyen(s) {

    if (!s) {

      if(td925.last==='Chưa chạy')td925.last='Chờ dữ liệu Tiên Duyên từ client';

      return false;

    }

    if (!s.readied) {

      if (now()>=tienDuyenRefreshAt) {

        s.rpc?.GetMarryCopyTimes?.();

        tienDuyenRefreshAt=now()+8000; 

      }

      return false;

    }

    if (!(s.remaining>0) || !s.married) {

      if(td925.last==='Chưa chạy')td925.last=!s.married?'Chưa Kết Duyên':'Không còn lượt Tiên Duyên';

      return false;

    }

    if (C.tienDuyenNoMerge && s.merge) {

      log('⚠️ Tiên Duyên đang bật Gộp lượt, không dùng cả hai lượt');

      return false;

    }

    const nav=_Ba?._xf?._Kf?.instance;

    const direct = typeof nav?.openPanelByPanelId==='function';

    const viaEntry = typeof nav?.openPanelByEnterId==='function';

    const viaUI = typeof s.ui.open==='function';

    // Use the first confirmed native path; don't demand unrelated UI methods.

    if (!direct && !viaEntry && !viaUI) {

      td925Log('Không tìm thấy đường mở Nhẫn Cưới (616/316)');

      return false;

    }

    begin('tienduyen',viaEntry&&!direct&&!viaUI?'routeMenu':'routeRing',{

      before:s.spent,route:'Nhẫn Cưới → Phó Bản → Khiêu chiến',routeFallback:false,

      entryOnly:viaEntry&&!direct&&!viaUI

    });

    if(direct) nav.openPanelByPanelId(616);

    else if(viaUI) s.ui.open(616);

    else nav.openPanelByEnterId(316);

    td925Log(`Còn ${s.remaining}/${s.total} lượt; đang mở Nhẫn Cưới qua đường native`);

    return true;

  }

  function followTienDuyen(j,t) {

    const s=tienDuyenData();

    if (!s) return finish(false,'Không đọc được Tiên Duyên',8000);

    const nav=_Ba?._xf?._Kf?.instance;

    const dialog=()=>s.ui.isOpened?.(628) ? s.ui.getDialogById?.(628) : null;



    

    

    if (['routeMenu','routeRing','routeDungeon','routeChallenge'].includes(j.step) &&

        dialog()?.parent && typeof dialog()?._tYi==='function') {

      j.step='routeChallenge'; j.at=t;

    }



    if (j.step==='routeMenu') {

      if (t-j.at>15000) return finish(false,'Không mở được mục Tiên Duyên',8000);

      // Wait for the native menu to expose Ring; avoid repeatedly reopening it.

      if (typeof nav?.openPanelByPanelId==='function') nav.openPanelByPanelId(616);

      else if (typeof s.ui.open==='function') s.ui.open(616);

      else if (!s.ui.getPanelById?.(616)?.parent) return;

      j.step='routeRing';j.at=t;

      log('💞 Tiên Duyên → Nhẫn Cưới (616)');

      return;

    }

    if (j.step==='routeRing') {

      if (t-j.at>15000) return finish(false,'Không tải được Nhẫn Cưới (616)',8000);

      const ring=s.ui.getPanelById?.(616);

      if (!ring || ring.destroyed || !ring.parent || typeof ring._jWi!=='function') {

        

        if (!j.target.routeFallback && t-j.at>1000) {

          j.target.routeFallback=true;

          if(typeof nav?.openPanelByEnterId==='function')nav.openPanelByEnterId(316);

          if(typeof nav?.openPanelByPanelId==='function')nav.openPanelByPanelId(616);

          else s.ui.open?.(616);

          td925Log('Thử đường dự phòng mở Nhẫn Cưới');

        }

        return;

      }

      

      ring._jWi.call(ring);

      j.step='routeDungeon';j.at=t;

      log('💞 Nhẫn Cưới → Phó Bản Tiên Duyên (628)');

      return;

    }

    if (j.step==='routeDungeon') {

      if (t-j.at>15000) return finish(false,'Dialog Tiên Duyên không xuất hiện',8000);

      const p=dialog();

      if (!p || p.destroyed || !p.parent || typeof p._tYi!=='function') return;

      j.step='routeChallenge';j.at=t;

      return;

    }

    if (j.step==='routeChallenge') {

      const p=dialog();

      if (!p || p.destroyed || !p.parent || typeof p._tYi!=='function') {

        if (t-j.at>12000) return finish(false,'Nút Khiêu chiến không tải',8000);

        return;

      }

      if (!(s.remaining>0)) return finish(false,'Tiên Duyên hết lượt',300000);

      if (!s.married) return finish(false,'Chưa Kết Duyên - tránh phí Nguyên Bảo',600000);

      if (C.tienDuyenNoMerge && (s.merge || p.ckBox?.selected===true))

        return finish(false,'Đang bật gộp lượt, không tự khiêu chiến',300000);

      

      

      j.step='entering';j.at=t;

      p._tYi.call(p);

      log(`💞 Đã bấm Khiêu chiến Tiên Duyên, còn ${s.remaining} lượt trước khi vào`);

      return;

    }

    if (j.step==='entering') {

      if (!common()) {

        if (scene()===36 || mapNow()===2381) {

          j.step='fighting';j.at=t;

          log('✅ Đã vào phó bản Tiên Duyên, để game tự chiến đấu');

          return;

        }

        return finish(false,'Chuyển sang bản đồ khác, không can thiệp',180000);

      }

      if (t-j.at>C.enterTimeoutMs)

        return finish(false,'Khiêu chiến không chuyển cảnh sau 45 giây',180000);

      return;

    }

    if (j.step==='fighting') {

      if (common()) {

        j.step='verifyServer';j.at=t;

        j.target.verifyReqAt=0;j.target.verifyN=0;

        td925.runs++;

        td925Log('Đã về bản đồ thường; cần server xác nhận lượt phó bản.');

        return;

      }

      if (t-j.at>C.tienDuyenBattleTimeoutMs)

        return finish(false,'Tiên Duyên quá 20 phút, không tự Thoát để tránh mất thưởng',300000);

      return;

    }

    if(j.step==='verifyServer'){

      if(!common())return;

      const before=j.target.before==null ? NaN : Number(j.target.before);

      

      if(Number.isFinite(before)&&s.readied&&s.spent>before){

        td925.confirmedRuns++;

        td925Log('Server đã trừ '+(s.spent-before)+' lượt. Quà trận đấu do game phân phối.');

        j.step='rewardRefresh';j.at=t;j.target.post={

          taskSent:new Set(),tasksClaimed:0,ringSent:0,cardSent:false,

          taskFetch:false,cardFetch:false,ringFetch:false};

        return;

      }

      if(!j.target.verifyReqAt || t-j.target.verifyReqAt>=1500){

        if(j.target.verifyN<3 && typeof s.rpc?.GetMarryCopyTimes==='function'){

          s.rpc.GetMarryCopyTimes();j.target.verifyN++;j.target.verifyReqAt=t;

        }

      }

      if(t-j.at>td925Cfg.verificationTimeoutMs){

        td925.unverified++;

        td925Log('Không xác nhận được lượt server; KHÔNG coi là thắng hoặc nâng cấp theo trận.');

        return finish(false,'Chưa xác nhận phó bản hoàn thành trên server',300000);

      }

      return;

    }

    

    if(['rewardRefresh','rewardTasks','rewardTaskWait','rewardCard','rewardCardWait',

        'ringReady','ringWait'].includes(j.step) && !common())return;

    if(j.step==='rewardRefresh'){

      if(!td925Cfg.enableRewards){j.step='ringReady';j.at=t;return;}

      const ts=td925Tasks(),card=td925Card();

      if(!j.target.post.taskFetch && typeof ts.rpc?.GetMarryTaskInfo==='function'){

        ts.rpc.GetMarryTaskInfo();j.target.post.taskFetch=true;

      }

      if(!j.target.post.cardFetch && typeof card.rpc?.GetMarryRewardCardInfo==='function'){

        card.rpc.GetMarryRewardCardInfo();j.target.post.cardFetch=true;

      }

      j.step='rewardTasks';j.at=t;return;

    }

    if(j.step==='rewardTasks'){

      const p=j.target.post;

      const ts=td925Tasks();

      const next=ts.eligible.find(id=>!p.taskSent.has(id)&&!td925.taskSeen.has(vnTime().key+':'+id));

      if(next!==undefined && p.tasksClaimed<td925Cfg.maxTaskClaimsPerRun &&

         typeof ts.rpc?.GetMarryTaskReward==='function'){

        p.taskSent.add(next);td925.taskSeen.add(vnTime().key+':'+next);p.tasksClaimed++;

        p.taskRefreshAt=0;

        p.pendingTaskId=next;p.pendingTaskAt=t;

        ts.rpc.GetMarryTaskReward(next);

        td925Log('Đã gửi yêu cầu nhận quà nhiệm vụ Tiên Duyên '+next+', đang đợi server.');

        j.step='rewardTaskWait';j.at=t;return;

      }

      j.step='rewardCard';j.at=t;return;

    }

    if(j.step==='rewardTaskWait'){

      const p=j.target.post,ts=td925Tasks();

      if(ts.ready&&!ts.eligible.includes(p.pendingTaskId)){

        td925.taskClaims++;

        td925Log('Server đã cập nhật trạng thái quà nhiệm vụ '+p.pendingTaskId+'.');

        j.step='rewardTasks';j.at=t;return;

      }

      if(t-j.at>2200 && !p.taskRefreshAt &&

         typeof ts.rpc?.GetMarryTaskInfo==='function'){

        ts.rpc.GetMarryTaskInfo();p.taskRefreshAt=t;

      }

      if(t-j.at>td925Cfg.ackTimeoutMs){

        td925Log('Chưa xác nhận quà '+p.pendingTaskId+'; không gửi lại, sang bước kế tiếp.');

        j.step='rewardCard';j.at=t;

      }

      return;

    }

    if(j.step==='rewardCard'){

      const p=j.target.post,card=td925Card();

      if(td925Cfg.enableCardDaily && !p.cardSent&&card.available &&

         typeof card.rpc?.GetMarryRewardCardReward==='function'){

        p.cardSent=true;

        card.rpc.GetMarryRewardCardReward();

        td925Log('Gửi yêu cầu quà Cây Tiền ĐÃ KÍCH HOẠT (không mua thẻ).');

        j.step='rewardCardWait';j.at=t;return;

      }

      j.step='ringReady';j.at=t;return;

    }

    if(j.step==='rewardCardWait'){

      if(Number(td925Card().m?.marryRewardItemState)===2){

        td925.cardClaims++;

        td925Log('Server xác nhận đã nhận quà Cây Tiền.');

        j.step='ringReady';j.at=t;return;

      }

      if(t-j.at>td925Cfg.ackTimeoutMs){

        td925Log('Chưa thấy xác nhận Cây Tiền; không yêu cầu lần hai.');

        j.step='ringReady';j.at=t;

      }

      return;

    }

    if(j.step==='ringReady'){

      if(!td925Cfg.enableRingUpgrade){

        due.tienduyen=t;

        return finish(true,'Phó bản được ghi nhận, đã quét quà; tắt nâng Nhẫn',0);

      }

      const p=j.target.post,r=td925Ring();

      if(!s.married || !r.ready || !r.can || r.qty<=0 || r.lv>=r.max ||

          p.ringSent>=td925Cfg.maxRingRequestsPerRun){

        td925Log('Kết thúc: quà đã quét, Nhẫn Cưới Lv'+(r.lv??'?')+

          ', nguyên liệu '+(Number.isFinite(r.qty)?r.qty:'?')+'.');

        due.tienduyen=t;

        return finish(true,'Tiên Duyên có xác nhận lượt; hậu kỳ Nhẫn Cưới hoàn tất',0);

      }

      

      if(!p.ringFetch){

        p.ringFetch=true;

        r.rpc.GetMarryRingInfo?.();j.at=t;return;

      }

      const latest=td925Ring();

      if(!latest.ready||!latest.can||latest.qty<=0||latest.lv>=latest.max){

        j.at=t;return;

      }

      p.ringBefore={lv:latest.lv,exp:latest.exp,qty:latest.qty};

      p.ringSent++;td925.ringRequests++;

      latest.rpc.AddMarryRingExp();

      td925Log('Nâng Nhẫn Cưới lần '+p.ringSent+' bằng vật liệu '+latest.itemId+'.');

      j.step='ringWait';j.at=t;return;

    }

    if(j.step==='ringWait'){

      const p=j.target.post,r=td925Ring(),b=p.ringBefore;

      if(r.ready && (r.qty<b.qty || r.lv>b.lv || r.exp!==b.exp)){

        td925.ringConfirmed++;

        td925Log('Nâng Nhẫn được xác nhận: Lv'+b.lv+' → '+r.lv+', vật liệu '+b.qty+' → '+r.qty+'.');

        j.step='ringReady';j.at=t;p.ringFetch=true;return;

      }

      if(t-j.at>1500 && !p.ringVerifyAt && typeof r.rpc?.GetMarryRingInfo==='function'){

        r.rpc.GetMarryRingInfo();p.ringVerifyAt=t;

      }

      if(t-j.at>td925Cfg.ackTimeoutMs){

        td925Log('Không thấy phản hồi nâng Nhẫn; dừng KHÔNG gửi trùng.');

        due.tienduyen=t+300000;

        return finish(false,'Nâng Nhẫn không có ACK; giữ nguyên an toàn',300000);

      }

    }

  }

  

  

  

  

  function crystalData() {

    const m=_Ba?._n4t?._t4t?.ins;

    const rpc=_Ba?._n4t?._oun?.ins;

    const party=_Ba?._cm?._q3t?.ins;

    const rooms=_Ba?._cm?._u3t?.ins;

    const ui=_ft?._Y4n?.ins;

    if (!m || !rpc || !party || !rooms || !ui) return null;

    const pane=ui.isOpened?.(1291) ? ui.getPanelById?.(1291) : null;

    const raw=Number(pane?._Qh);

    const tabIndex=Number(pane?._FSn?.selIdx);

    const selected=Number.isInteger(raw)&&raw>=1&&raw<=5 ? raw :

      Number.isInteger(tabIndex)&&tabIndex>=0&&tabIndex<5 ? tabIndex+1 : null;

    const maxIndex=Number(_Ba?._Lk?._yQ?.instance?.openMaxIndex);

    const unlocked=Number.isInteger(maxIndex) && maxIndex>=0 && maxIndex<5 ? maxIndex+1 : null;

    const configured=Number(C.crystalDifficulty);

    const difficulty=configured>=1 && configured<=5 ? configured : selected;

    const members=party.getHasTeamByType?.(6) ? (party.getTeamAllMembers?.()||[]).length : 0;

    return {

      m,rpc,party,rooms,ui,pane,

      remaining:Number(m.remainTimes),

      mark:red(627),

      merge:m.isCombin===true || m.isCombin===1,

      autoTower:m.autoTower===1 || m.autoTower===true,

      difficulty,unlocked,

      team6:!!party.getHasTeamByType?.(6),

      otherTeam:!!party.getHasTeams?.()&&!party.getHasTeamByType?.(6),

      members,

      memberIds:party.getHasTeamByType?.(6)

        ? (party.getTeamAllMembers?.()||[]).map(x=>String(x?.[0]??'')):[],

      leader:party.isLeader===true,

      inBattle:scene()===53

    };

  }



  function startCrystal(inside=false) {

    if (!C.enableCrystal || blocked('crystal')) return false;

    const r=crystalData();

    if (!r) return false;

    if (inside && r.inBattle) {

      begin('crystal','fighting',{ownTeam:false, fromInside:true, result:null,

        lastWave:0, warned:false});

      log('💎 Tiếp quản trận Thủ Hộ Thủy Tinh đang diễn ra');

      return true;

    }

    if (inside && r.team6) {

      begin('crystal','waitingTeam',{ownTeam:false, fromInside:true,

        difficulty:Number(r.party.roomMapLv)||null, startSent:false});

      log('👥 Tiếp quản phòng Thủ Hộ Thủy Tinh hiện có');

      return true;

    }

    if (C.crystalRequireExactTeam &&

        String(_Ba?._rJ?._O$?.ins?.actorId??'')!==String(C.crystalLeaderId)) return false;

    if (!common() || r.otherTeam || r.team6 ||

        !Number.isFinite(r.remaining) || r.remaining<=0 ||

        !r.mark || (C.crystalNoMerge && r.merge)) return false;

    

    

    if (_Ba?._cm?._vJ?.ins) _Ba._cm._vJ.ins.autoStart=false;

    begin('crystal','opening',{ownTeam:false, startSent:false, lastWave:0, result:null});

    if (!r.ui.isOpened?.(1291)) r.ui.open(1291);

    log('💎 Mở Thủ Hộ Thủy Tinh, kiểm tra tầng và số lượt');

    return true;

  }



  function crystalLeaveOwnTeam(j,r) {

    

    if (!j.target.ownTeam || !r.team6) return;

    if (typeof r.rooms.exitSerAreRoom==='function') {

      r.rooms.exitSerAreRoom([6]);

      log('👥 Rời phòng Auto tự tạo để không khóa các nhiệm vụ khác');

    }

  }



  function followCrystal(j,t) {

    const r=crystalData();

    if (!r) return finish(false,'Thiếu dữ liệu Thủ Hộ Thủy Tinh',C.crystalCooldownMs);

    const k=j.target;



    if (j.step==='opening') {

      if (t-j.at>18000) return finish(false,'Mở phó bản quá 18 giây',C.crystalCooldownMs);

      if (!r.ui.isOpened?.(1291)||!r.pane||r.pane.destroyed||!r.pane.parent) return;

      if (!Number.isFinite(r.remaining)||r.remaining<=0) return finish(false,'Thủ Hộ Thủy Tinh hết lượt',C.crystalCooldownMs);

      if (C.crystalNoMerge && (r.merge || r.pane.ckBox?.selected===true))

        return finish(false,'Đang gộp lượt; không tự tiêu nhiều lượt',C.crystalCooldownMs);

      if (!r.difficulty || (r.unlocked && r.difficulty>r.unlocked))

        return finish(false,'Chưa xác nhận độ khó đã mở',C.crystalCooldownMs);

      if (typeof r.rooms.creSerAreRoom!=='function') return finish(false,'Thiếu lệnh tạo phòng',C.crystalCooldownMs);

      k.difficulty=r.difficulty;

      j.step='creating';j.at=t;

      

      r.rooms.creSerAreRoom([6,'Tên Phòng',2702,k.difficulty,0,0,0,1,false,false]);

      log('👥 Tạo phòng Thủ Hộ Thủy Tinh tầng '+k.difficulty);

      return;

    }

    if (j.step==='creating') {

      if (r.inBattle) {j.step='fighting';j.at=t;return;}

      if (r.team6) {

        k.ownTeam=true;j.step='waitingTeam';j.at=t;

        log('👥 Đã có phòng, đang chờ đủ '+C.crystalMinPlayers+' người');

        return;

      }

      if (t-j.at>25000) return finish(false,'Server chưa xác nhận tạo phòng',C.crystalCooldownMs);

      return;

    }

    if (j.step==='waitingTeam') {

      if (r.inBattle) {j.step='fighting';j.at=t;return;}

      if (!r.team6) return finish(false,'Đã rời phòng Thủ Hộ Thủy Tinh',C.crystalCooldownMs);

      if (r.remaining<=0) {crystalLeaveOwnTeam(j,r);return finish(false,'Đã hết lượt',C.crystalCooldownMs);}

      const requiredIds=[String(C.crystalLeaderId),...(C.crystalCloneIds||[]).map(String)];

      const currentIds=r.memberIds||[];

      const exactTeam=requiredIds.length===4 && new Set(requiredIds).size===4 &&

        currentIds.length===4 && new Set(currentIds).size===4 &&

        requiredIds.every(id=>currentIds.includes(id)) &&

        currentIds.every(id=>requiredIds.includes(id));

      

      if (r.members>=Math.max(1,Math.min(4,Number(C.crystalMinPlayers)||4)) &&

          r.leader && (!C.crystalRequireExactTeam || exactTeam)) {

        if (!k.startSent && typeof r.rooms.startTeamBossCopy==='function') {

          k.startSent=true;

          j.step='entering';j.at=t;

          r.rooms.startTeamBossCopy([6]);

          log('🚀 Thủ Hộ Thủy Tinh đủ '+r.members+' người → Bắt đầu ngay');

        }

        return;

      }

      if (t-j.at>C.crystalTeamWaitMs) {

        const missing=(C.crystalCloneIds||[]).map(String).filter(id=>!(r.memberIds||[]).includes(id));

        crystalLeaveOwnTeam(j,r);

        return finish(false,'Chua du 4 clone; thieu '+missing.join(', ')+

          '; doi acc clone du cap roi thu lai',C.crystalCooldownMs);

      }

      return;

    }

    if (j.step==='entering') {

      if (r.inBattle) {j.step='fighting';j.at=t;log('💎 Đã vào trận, ưu tiên bảo vệ thủy tinh');return;}

      if (t-j.at>C.crystalStartTimeoutMs) {

        crystalLeaveOwnTeam(j,r);

        return finish(false,'Bắt đầu trận quá thời gian',C.crystalCooldownMs);

      }

      return;

    }

    if (j.step==='fighting') {

      if (r.inBattle) {

        if (C.crystalAutoTower && !r.autoTower &&

            t-(k.lastAutoTowerAt||0)>=30000 &&

            typeof r.rpc.setTrigramCopyAutoTower==='function') {

          k.lastAutoTowerAt=t;

          r.rpc.setTrigramCopyAutoTower(1);

          log('🏰 Bật tự đặt tháp của game');

        }

        const wave=Number(r.m.curWare);

        if (Number.isFinite(wave) && wave!==k.lastWave) {

          k.lastWave=wave;

          log('🌊 Thủ Hộ Thủy Tinh đợt '+wave);

        }

        const resultPanel=r.ui.isOpened?.(1293) ? r.ui.getDialogById?.(1293) : null;

        if (resultPanel && !resultPanel.destroyed) {

          k.result=resultPanel.winImg?.visible===true?'win':

            resultPanel.loseImg?.visible===true?'lose':'unknown';

          j.step='result';j.at=t;

          log('🏁 Thủ Hộ Thủy Tinh: '+k.result+', chuẩn bị đóng kết quả');

          return;

        }

        if (!k.warned && t-j.started>C.crystalBattleWarnMs) {

          k.warned=true;log('⚠️ Trận quá 30 phút; không cưỡng bức Thoát để tránh mất thưởng');

        }

        return;

      }

      if (common()) {

        due.crystal=t+C.crystalCooldownMs;

        return finish(k.result==='win',k.result==='win'?'Đã thắng Thủ Hộ Thủy Tinh':'Đã rời trận (chưa thấy kết quả thắng)',C.crystalCooldownMs);

      }

      return;

    }

    if (j.step==='result') {

      if (common()) {

        due.crystal=t+C.crystalCooldownMs;

        return finish(k.result==='win','Thủ Hộ Thủy Tinh '+(k.result||'unknown'),C.crystalCooldownMs);

      }

      const p=r.ui.isOpened?.(1293) ? r.ui.getDialogById?.(1293) : null;

      if (p && t-j.at>=3500 && typeof p.close==='function') {

        j.step='exiting';j.at=t;

        p.close(); 

        log('🚪 Đã đóng bảng kết quả, chờ về cảnh thường');

      } else if (!p && t-j.at>=12000) {

        j.step='exiting';j.at=t;

      }

      return;

    }

    if (j.step==='exiting') {

      if (common()) {

        due.crystal=t+C.crystalCooldownMs;

        return finish(k.result==='win','Thủ Hộ Thủy Tinh xong; '+(k.result||'chưa xác nhận'),C.crystalCooldownMs);

      }

      if (t-j.at>50000) return finish(false,'Chưa thấy về cảnh thường; không gửi lệnh Thoát trùng',C.crystalCooldownMs);

    }

  }



  function thanThuData() {

    const m = _Ba?._dP?._P5t?.ins, cf = _ft?._gci?.ins;

    if (!m || typeof m.getSingleLiveAndFollow !== 'function' ||

        typeof cf?.getSingleInfo !== 'function') return null;

    const tab = m.getTabData?.()?.find(x => Number(x.type) === 48);

    const rows = m.getSingleBossInfoArr?.() || [];

    

    

    const all = Array.isArray(rows) ? rows.map(x => ({

      area:x?.[0], id:x?.[1], rawState:x?.[2]

    })).filter(x => x.area != null && x.id != null) : [];

    const valid3 = all.length === 3 &&

      new Set(all.map(x => String(x.area))).size === 3;

    const t = all.find(x =>

      m.getSingleLiveAndFollow(x.area) &&

      num(cf.getSingleInfo(x.id)?.[0]));

    return {m, tab, t, cf, all, valid3, yes:red(561)};

  }

  function nhomData() {

    const m = boss(), cfgs = _ft?._pat?.ins?.cfgs, role = _Ba?._rJ?._O$?.ins;

    const n = m?.getBsTimesBySceneType?.(4)?.[2];

    if (!m || !Array.isArray(cfgs) || !role || !num(n)) return null;

    const t = cfgs.slice(1).find(x => Array.isArray(x) &&

      num(x[0]) && num(x[1]) && num(x[2]) &&

      Number(role.level) >= Number(x[4]) && Number(role.eraLevel) >= Number(x[3]) &&

      m.getFlowBsById?.(x[2])?.[1] && alive(bossFlag(x[2])));

    return {n:Number(n), t, yes:red(36)};

  }

  function manData() {

    const m = _Ba?._Fvt?._Evt?.inst, cf = _ft?._TZ?.ins;

    if (!m || typeof m.getMaxCCEnter !== 'function' || !cf) return null;

    const grade = m.getMaxCCEnter();

    const row = grade >= 0 ? cf.getCfgsByGrade?.(grade, 0) : null;

    const rows = grade >= 0 ? cf.getBossInfoByGrade?.(grade) : null;

    if (!row || !Array.isArray(rows)) return null;

    const map = Number(row[0]), layer = Number(row[1]);

    const ids = rows.map(x => x?.[3]).filter(x => x != null);

    return {m, grade, map, layer, ids,

      type:Number(_ft?._po?.ins?.getCfgById?.(map)?.[7]),

      strength:Number(m.stength), autoItem:m._bollZD === true || m._bollZD === 1,

      yes:red(44)};

  }

  function yeuData() {

    const m = boss(), role = _Ba?._rJ?._O$?.ins, cf = _ft?._$st?.ins?.cfgs;

    if (!m || !role || !Array.isArray(cf)) return null;

    const remain = m.getBsTimesBySceneType?.(10)?.[2];

    if (!num(remain)) return null;

    const era = Number(role.eraLevel);

    const ts = cf.filter(x => Array.isArray(x) && Array.isArray(x[3]) &&

      era >= Number(x[3][0]) && era <= Number(x[3][1]) &&

      Number(_ft?._po?.ins?.getCfgById?.(x[0])?.[7]) === 10 && alive(bossFlag(x[2])));

    return {n:Number(remain), t:ts.at(-1)};

  }

  function timedData(kind) {

    const m = boss();

    const type = kind === 'tientuyen' ? [21,68] : [44];

    const states = type.map(x => m?.getCpSceneStateByType?.(x));

    const open = states.find(x => x && Number(x[2]) === 2);

    const ready = states.find(x => x && Number(x[2]) === 2 && Boolean(x[7]));

    return {open:!!open, ready:!!ready,

      map:kind === 'tientuyen' ? (ready === states[1] ? 2152 : 2151) : 2164};

  }



  

  const team={mode:'idle',pending:null,nextList:0,readyAt:0,created:false,approved:false,handled:null,

    cloneAt:0,shareAt:0,firstAt:0,publicCount:0,cloneSeen:false,leaderConfirmed:false,

    cloneInvites:0,lastTeamId:null,notice:''};

  let oldAlert=null, newAlert=null;

  function starRefs() {

    const star=_Ba?._MT?.the_secret_of_the_stars;

    const model=star?._Gvt?.instance, party=star?._jvt?.ins;

    const ui=_ft?._Y4n?.ins, cfg=_ft?._xat?.ins;

    return model && party && ui && cfg ? {model,party,ui,cfg} : null;

  }

  function starRows(r,type,layer,line) {

    if (!num(type) || !num(layer) || !num(line)) return [];

    const rows=r.cfg.getBossInfosByTypeAndLayer?.(type,layer);

    return Array.isArray(rows) ? rows.filter(x=>Array.isArray(x) && x[5] && x[4]!=null).map(x=>({

      raw:x,id:x[4], flag:r.model.getBossInfo?.(x[0],x[2],line,x[4])?.[2]?.[0]

    })) : [];

  }

  function teamReset() {

    team.mode='idle';team.pending=null;team.nextList=0;team.readyAt=0;

    team.created=false;team.approved=false;team.handled=null;

    team.cloneAt=0;team.shareAt=0;team.firstAt=0;team.publicCount=0;

    team.cloneSeen=false;team.leaderConfirmed=false;team.cloneInvites=0;

    team.lastTeamId=null;team.notice='';

  }

  const normalize=x=>String(x??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').toLowerCase();

  function isTeamPrompt(txt) {

    const s=normalize(txt);

    return s.includes('to doi khieu chien') &&

      (s.includes('dong y xin vao') || s.includes('co moi nguoi khac vao'));

  }

  function hookTeamAlerts() {

    const a=_ft?._iZ;

    if (!a || newAlert || typeof a.alert!=='function') return;

    oldAlert=a.alert;

    newAlert=function(title,content,handlers) {

      const eligible=job?.type==='tinhthan' && scene()===34 && !C.autoTeam && isTeamPrompt(content);

      if (eligible) {

        const h=handlers?.[0];

        const members=Number(starRefs()?.model?.teamLength)||0;

        if (members===0 && typeof h?.run==='function') {

          h.run();log('👥 Đã Đồng ý lời mời Tinh Thần');return;

        }

      }

      return oldAlert.apply(this,arguments);

    };

    a.alert=newAlert;

  }

  function unhookTeamAlerts() {

    const a=_ft?._iZ;

    if (a && newAlert && a.alert===newAlert) a.alert=oldAlert;

    newAlert=null;oldAlert=null;

  }

  function existingTeamPrompt(r) {

    const ui=r.ui,p=ui.isOpened?.(12)?ui.getPanelById?.(12):null;

    if (!p || p.destroyed || p===team.handled) return;

    const txt=p.contentTxt?.innerHTML||p.contentTxt?.text||p.content||'';

    if (!isTeamPrompt(txt) || C.autoTeam) return;

    const count=Number(r.model.teamLength)||0;

    if (count>0) return; 

    if (typeof p._aBn==='function') {

      team.handled=p;

      p._aBn();

      log('👥 Đã bấm Đồng ý tổ đội đang hiện');

    }

  }

  function teamMembers(r) {

    const ids=new Set();

    for(const x of r?.model?.teamPlayerData||[]) {

      if(Array.isArray(x)&&x[0]!=null&&String(x[0])!=='0')ids.add(String(x[0]));

    }

    return ids;

  }

  function teamLeader(r) {

    

    const mine=String(_ot?.ins?.actorId||'');

    const a=r?.model?.teamPlayerData;

    if(!Array.isArray(a))return false;

    return a.some(x=>Array.isArray(x)&&String(x[0])===mine&&Number(x[7])===1);

  }

  function teamTick(r,t) {

    if(W.KVPV_BOSS_TEAM?.ownsBossTeams?.())return;

    if(!C.autoTeam || !C.enableTinhThan || scene()!==34)return;

    const party=r.party;

    const n=Number(r.model.teamLength)||0;

    const ids=teamMembers(r);

    const clone=String(C.tinhThanCloneId||'').trim();

    team.cloneSeen=clone!==''&&ids.has(clone);

    const leader=teamLeader(r);

    team.leaderConfirmed=leader;

    if(!team.firstAt)team.firstAt=t;

    if(n>0) {

      team.mode=leader?'leader_team':'member_team';

      team.pending=null;

      if(!leader)return; 

      

      if(C.autoApproveTeam && !team.approved &&

          Number(r.model.autoAgreeApplyStarsSecretTeam)!==1 &&

          typeof party.setAutoAgreeApplyStarsSecretTeam==='function') {

        party.setAutoAgreeApplyStarsSecretTeam(1);

        team.approved=true;

        log('👥 Tinh Than: bat duyet nguoi xin vao doi');

        return;

      }

      if(n>=4)return;

      

      if(clone && !team.cloneSeen && t-team.cloneAt>=C.tinhThanInviteCloneMs &&

          typeof party.InvitePlayerStarsSecretTeam==='function') {

        party.InvitePlayerStarsSecretTeam([clone]);

        team.cloneAt=t;

        team.cloneInvites++;

        log('👥 Tinh Than: moi clone '+clone+' (#'+team.cloneInvites+')');

        return;

      }

      

      

      const publicReady=team.cloneSeen || t-team.firstAt>=C.tinhThanFirstPublicDelayMs;

      if(publicReady && C.tinhThanPublicMaxPerVisit>team.publicCount &&

          t-team.shareAt>=C.tinhThanPublicInviteMs &&

          typeof party.sendInviteChatInfo==='function') {

        

        if(Number(r.model.coolTime)===30) {

          party.sendInviteChatInfo();

          r.model.clearLoop?.();

          r.model.startCoolLoop?.();

          team.shareAt=t; team.publicCount++;

          log('📣 Tinh Than: da gui loi moi qua Tam Gioi (#'+team.publicCount+')');

        }

      }

      return;

    }

    if(team.pending) {

      const since=t-team.pending.at;

      if(since<120000)return;

      

      team.notice='Tao doi chua co ACK sau 120s';

      team.pending=null;team.mode='cooldown';team.nextList=t+120000;

      return;

    }

    if(t<team.nextList)return;

    

    if(typeof party.CreateStarsSecretTeam==='function') {

      party.CreateStarsSecretTeam();

      team.created=true;

      team.pending={action:'create',at:t};team.mode='creating';

      team.nextList=t+120000;

      log('👥 Tinh Than: tao doi rieng cho main + 1 clone + Tam Gioi');

    }

  }

  function startStar() {

    const r=starRefs();

    if (!r || !num(r.model.strengthvalue) || Number(r.model.strengthvalue)<=0 ||

       r.model.auto===true || r.model.auto===1) return false;

    begin('tinhthan','opening',{});teamReset();

    if (!r.ui.isOpened?.(605)) r.ui.open(605);

    log('🌟 Mở Tinh Thần tầng 5');return true;

  }

  function adoptStar() {

    if (!C.enableTinhThan || scene()!==34) return false;

    const r=starRefs();if (!r) return false;

    const type=Number(r.model.curBossTypeScene),layer=Number(r.model.curBosslayerScene),

      line=Number(r.model.curlineScene);

    const rows=starRows(r,type,layer,line);

    const valid=type===C.tinhThanTang && line>0 && rows.length>0 &&

      rows.every(x=>alive(x.flag)||dead(x.flag));

    begin('tinhthan',valid?'fighting':'team_only',{

      type,layer,line,rows:valid?rows.map(x=>x.raw):[],selected:null,lastSelect:0

    });teamReset();

    log('🌟 Tiếp quản Tinh Thần (tổ đội tự động)');return true;

  }

  function followStar(j,t) {

    const r=starRefs();

    if (!r) return finish(false,'Không tải được Tinh Thần',8000);

    if (j.step==='opening') {

      if (t-j.at>20000) return finish(false,'Mở Tinh Thần quá giờ',8000);

      const p=r.ui.isOpened?.(605)?r.ui.getPanelById?.(605):null;

      if (!p || p.destroyed || !p.parent) return;

      const type=Number(p._bvt),layer=Number(p._wvt),line=Number(p._Tvt);

      if (type!==C.tinhThanTang) {

        

        

        const idx=C.tinhThanTang-1, list=p._wWn;

        if (!j.target.tierChangeAttempted && list && Array.isArray(list.arrs) &&

            idx>=0 && idx<list.arrs.length && typeof p._CJ==='function' &&

            typeof p._gRn==='function') {

          let unlocked=false;

          try{unlocked=p._CJ(C.tinhThanTang)===true;}catch(e){

            log('🌟 Chưa đọc được điều kiện mở Tinh Thần: '+String(e));

          }

          if(unlocked){

            j.target.tierChangeAttempted=true;

            try{

              list.selIdx=idx;p._gRn.call(p);

              log('🌟 Tinh Thần: chọn loại/tầng '+C.tinhThanTang+' bằng nút native');

              return; 

            }catch(e){

              r.ui.close?.(605);

              return finish(false,'Lỗi chuyển loại Tinh Thần: '+String(e),15000);

            }

          }

        }

        if (t-j.started<8000)return;

        r.ui.close?.(605);

        return finish(false,'Không chọn được loại Tinh Thần '+C.tinhThanTang+' (chưa mở hoặc UI chưa tải)',15000);

      }

      if (!num(line) || line<1) {

        if (!j.target.lineRefreshAttempted && typeof p._GQn==='function') {

          j.target.lineRefreshAttempted=true;p._GQn.call(p);

        }

        if(t-j.started<8000)return;

        r.ui.close?.(605);return finish(false,'Không có kênh Tinh Thần hợp lệ',15000);

      }

      if (Number(r.model.strengthvalue)<=0 || r.model.auto===1 || r.model.auto===true) {

        r.ui.close?.(605);return finish(false,'Hết Nguyên Lực hoặc bật tự dùng thuốc',8000);

      }

      const rows=starRows(r,type,layer,line);

      if (!rows.length || !rows.some(x=>alive(x.flag)) ||

          rows.some(x=>!alive(x.flag)&&!dead(x.flag))) {

        

        if(t-j.started<8000)return;

        r.ui.close?.(605);return finish(false,'Tinh Thần không có boss sống/đã đồng bộ',15000);

      }

      if (typeof p._SKi!=='function') return finish(false,'Không tìm thấy nút Đến',8000);

      j.target={type,layer,line,rows:rows.map(x=>x.raw),selected:null,lastSelect:0};

      p._SKi();j.step='entering';j.at=t;log('🌟 Đang vào Tinh Thần');return;

    }

    if (j.step==='entering') {

      if (scene()===34) {j.step='fighting';j.at=t;teamReset();}

      else if (t-j.at>C.enterTimeoutMs) return finish(false,'Không vào được Tinh Thần',15000);

      return;

    }

    if (common()) {

      teamReset();due.tinhthan=t+C.tinhThanMs;

      return finish(j.step==='exiting','Đã rời Tinh Thần');

    }

    if (scene()!==34) return;

    teamTick(r,t);

    if (j.step==='team_only') return;

    if (j.step==='exiting') {

      if (t-j.at>45000) return finish(false,'Thoát Tinh Thần quá thời gian',300000);

      return;

    }

    const bs=(j.target.rows||[]).map(x=>({

      id:x[4],flag:r.model.getBossInfo?.(x[0],x[2],j.target.line,x[4])?.[2]?.[0]

    }));

    if (!bs.length || bs.some(x=>!alive(x.flag)&&!dead(x.flag))) return;

    const live=bs.find(x=>alive(x.flag));

    if (live) {

      

      

      j.deadAt=0;

      const m=_Ba?._Fvt?._Evt?.inst;

      if ((j.target.selected!==live.id || t-j.target.lastSelect>=15000) &&

          typeof m?.setSelTarget==='function') {

        m.setSelTarget(live.id,true);j.target.selected=live.id;j.target.lastSelect=t;

        log('🌟 Tinh Thần đánh boss '+live.id+' | Đội '+(r.model.teamLength||0));

      }

      return;

    }

    if (!j.deadAt) {j.deadAt=t;return;}

    if (t-j.deadAt<C.deadConfirmMs) return;

    exitDungeon();j.step='exiting';j.at=t;log('🚪 Thoát Tinh Thần sau khi hết boss');

  }



  // =============================================================

  

  // Client: _ft._NZ.ins (item_compose), bag _Ba._Ic._aQ.ins.

  

  

  

  const composeState = {

    watcher: false, ack:0, lastResult:null,

    success:{stone:0, props:0}, fail:0,

    blockedRecipes:new Map(), lastRecipe:0, lastReason:'',

    onAck:null

  };

  function composeBag() {

    const b=_Ba?._Ic?._aQ?.ins;

    return !!b?.isBagInited &&

      typeof b.getItemCountById==='function' &&

      typeof b.getItemsById==='function' ? b:null;

  }

  function composeRecipes() {

    let rows=null;

    try {

      const cfg=_ft?._NZ?.ins;

      if (typeof cfg?.getComposeCfgByTclass==='function') {

        rows=[...(cfg.getComposeCfgByTclass(1)||[]),

              ...(cfg.getComposeCfgByTclass(2)||[])];

      }

    } catch(e){console.warn('[GHÉP] Không đọc được cfg model:',e);}

    if (!Array.isArray(rows) || !rows.length) {

      try { rows=_Sa?.getCfg?.('item_compose'); } catch(e) {return [];}

    }

    return Array.isArray(rows)?rows.filter(x=>Array.isArray(x)):[];

  }

  function composeCandidates() {

    const b=composeBag();

    if(!b) return [];

    const t=now(),out=[];

    const protectedIds=new Set(C.composeProtectedItems.map(Number));

    const excluded=new Set(C.composeExcludedRecipes.map(Number));

    const seen=new Set();

    for (const r of composeRecipes()) {

      const id=Number(r?.[0]),result=Number(r?.[1]);

      const kind=Number(r?.[3]?.[0]);

      if (!Number.isSafeInteger(id) || id<=0 || seen.has(id) ||

          ![1,2].includes(kind) ||

          (kind===1&&!C.composeStone) || (kind===2&&!C.composeProps) ||

          !Number.isSafeInteger(result) || result<=0 ||

          excluded.has(id) || (composeState.blockedRecipes.get(id)||0)>t) continue;

      seen.add(id);

      const materials=r[6];

      if (!Array.isArray(materials) || materials.length<1 ||

          materials.length>4) continue;

      let possible=Infinity,good=true;

      const uidList=[],matIds=[];

      for (const mat of materials) {

        const itemId=Number(mat?.[0]),need=Number(mat?.[1]);

        if(!Number.isSafeInteger(itemId)||itemId<=0||

           !Number.isSafeInteger(need)||need<=0||

           protectedIds.has(itemId)||matIds.includes(itemId)) {

          good=false;break;

        }

        const reserve=Math.max(0,Number(C.composeKeepByItemId[itemId])||0);

        const have=Number(b.getItemCountById(itemId));

        const entries=b.getItemsById(itemId);

        if(!Number.isFinite(have)||have-reserve<need ||

           !Array.isArray(entries)||!entries.length ||

           entries[0]?.[2]==null) {good=false;break;}

        const firstStack=Number(entries[0]?.[1]);

        const amount=Math.min(Math.floor((have-reserve)/need),

          Math.floor(firstStack/need));

        if(amount<1){good=false;break;}

        possible=Math.min(possible,amount);

        uidList.push(entries[0][2]);

        matIds.push(itemId);

      }

      if(!good || !Number.isFinite(possible)||possible<1)continue;

      out.push({id,result,kind,qty:Math.min(possible,

        Math.max(1,Math.floor(Number(C.composeMaxPerRecipe)||1))),

        uidList,matIds});

    }

    

    return out.sort((a,b)=>a.kind-b.kind || a.id-b.id);

  }

  function composeAckHandler() {

    const val=_Ba?._Zgt?._n6t?.ins?.ComposeReply;

    composeState.ack++;

    composeState.lastResult=Array.isArray(val)?Number(val[0]):null;

  }

  function watchComposeAcks() {

    if(composeState.watcher)return true;

    const n=typeof _Sa!=='undefined'?_Sa?.notify:null;

    if(!n?.on||!n?.off)return false;

    try {

      composeState.onAck=composeAckHandler;

      n.on(5225,composeState,composeAckHandler);

      composeState.watcher=true;return true;

    }catch(e){console.warn('[GHÉP] Không cài được nhận phản hồi:',e);return false;}

  }

  function unwatchComposeAcks() {

    if(composeState.watcher)try{

      _Sa.notify.off(5225,composeState,composeState.onAck);

    }catch(e){window.KVPV_V1?.diagnostics?.record(e);}

    composeState.watcher=false;composeState.onAck=null;

  }

  function startCompose() {
    if (window.KVPV_RED_DOT_MODULE?.ownsProgression?.()) return false;

    if(!composeState.watcher || !composeBag())return false;

    if(!_Ba?._$a?.SceneUtil?.isCommonScene || inTeam() || inMission())return false;

    const ui=_ft?._Y4n?.ins;

    

    if([76,108,528,1688].some(id=>ui?.isOpened?.(id)))return false;

    if(!composeCandidates().length)return false;

    begin('compose','select',{count:0, sent:null, tried:new Set()});

    log('💎 Bắt đầu ghép Đá Hồn và Đạo Cụ khi đang rảnh');

    return true;

  }

  function followCompose(j,t) {

    if(t-j.started>C.composeRunTimeoutMs ||

       j.target.count>=C.composeMaxBatchesPerRun) {

      due.compose=t+C.composeCheckMs;

      return finish(true,'Kết thúc đợt ghép, tiếp tục công việc khác');

    }

    if(j.step==='select') {

      

      if(!common()||inTeam()||inMission())return finish(false,'Không còn ở cảnh rảnh');

      const r=composeCandidates().find(x=>!j.target.tried.has(x.id));

      if(!r) {

        due.compose=t+C.composeCheckMs;

        return finish(true,'Đã ghép hết công thức đủ nguyên liệu trong đợt này');

      }

      if(typeof _v==='undefined' || typeof _v?.ins?.send!=='function') {

        return finish(false,'Không tìm thấy hàm gửi gốc của game',C.composeNoAckBackoffMs);

      }

      const before=composeState.ack;

      j.target.sent={...r,before,at:t};

      j.target.tried.add(r.id);

      j.step='waiting';j.at=t;

      composeState.lastRecipe=r.id;

      

      _v.ins.send('TdKp',[r.id,r.uidList,r.qty,0]);

      log('💎 Ghép '+(r.kind===1?'Đá Hồn':'Đạo Cụ')+' recipe '+r.id+' x'+r.qty);

      return;

    }

    if(j.step==='waiting') {

      const s=j.target.sent;

      if(composeState.ack>s.before) {

        if(composeState.lastResult===0) {

          composeState.success[s.kind===1?'stone':'props']+=s.qty;

          j.target.count++;

          

          j.step='select'; j.at=t;

          due.compose=t+C.composeCheckMs;

          log('✅ Ghép '+(s.kind===1?'Đá Hồn':'Đạo Cụ')+' thành công x'+s.qty);

          return;

        }

        composeState.fail++;

        composeState.blockedRecipes.set(s.id,t+C.composeFailedRecipeBackoffMs);

        composeState.lastReason='Server trả mã lỗi '+String(composeState.lastResult);

        j.step='select';j.at=t;

        log('⚠️ Bỏ qua công thức '+s.id+': '+composeState.lastReason);

        return;

      }

      if(t-s.at>=C.composeAckTimeoutMs) {

        composeState.fail++;

        composeState.lastReason='Không có ACK 5225; KHÔNG gửi trùng';

        composeState.blockedRecipes.set(s.id,t+C.composeNoAckBackoffMs);

        due.compose=t+C.composeNoAckBackoffMs;

        return finish(false,'Ghép không có phản hồi, hoãn 15 phút',C.composeNoAckBackoffMs);

      }

    }

  }

  function composeStatus() {

    const ready=composeCandidates();

    const out={dangChay:job?.type==='compose',

      daGhepDa:composeState.success.stone,daGhepDaoCu:composeState.success.props,

      soLoi:composeState.fail,choPhanHoi:composeState.watcher,

      congThucCoTheGhep:ready.length,

      daCon:ready.filter(x=>x.kind===1).length,

      daoCuCon:ready.filter(x=>x.kind===2).length,

      congThucCuoi:composeState.lastRecipe,loiCuoi:composeState.lastReason,

      sapKiemTra:new Date(Math.max(now(),due.compose)).toLocaleTimeString('vi-VN')};

    console.table([out]);return out;

  }

  function composePreview(limit=20) {

    const rows=composeCandidates().slice(0,Math.min(100,Math.max(1,Number(limit)||20)))

      .map(x=>({Nhom:x.kind===1?'Đá Hồn':'Đạo Cụ',congThuc:x.id,

        sanPham:x.result,soLuong:x.qty,nguyenLieu:x.matIds.join(',')}));

    console.table(rows);return rows;

  }



  // =============================================================

  // TUYET HOC / PHAP THUAT - GOC GAME: P_SpellsView (panel 43)

  // UI "Tang nhanh" => _Ba._Jtt._unt.ins.addSkillLevelOfAll()

  // Server: TdKP; model up => TqNo => notify 5213.

  // Redpoint 19, chi chi tai nguyen 90530001 co san.

  // =============================================================

  const tuyetHocState={requests:0,success:0,failed:0,acks:0,last:'-',lastAt:0,watching:false,onAck:null};

  const tuyetHocModel=()=>_Ba?._Jtt?._ant?.ins;

  const tuyetHocRpc=()=>_Ba?._Jtt?._unt?.ins;

  function tuyetHocData(refresh=false) {

    const m=tuyetHocModel(), list=m?.spcialSkills;

    const max=Number(m?.maxlv);

    if(!Array.isArray(list)||!list.length||!Number.isFinite(max)||max<1 ||

       typeof m?.checkLvUp!=='function')return null;

    

    if(refresh && typeof m.checkRP==='function')try{m.checkRP();}catch(e){window.KVPV_V1?.diagnostics?.record(e);}

    let can=false;

    for(let i=0;i<list.length;i++){

      const lv=Number(list[i]?.[1]);

      if(Number.isFinite(lv) && lv<max && m.checkLvUp(i)===true){can=true;break;}

    }

    const sig=JSON.stringify(list.map(a=>[a?.[0],a?.[1]]));

    return {m,can,max,red:red(19),sig,count:list.length,

      currency:Number(_Ba?._rJ?._O$?.ins?.getMoneyById?.(90530001))};

  }

  function tuyetHocAck() {tuyetHocState.acks++;}

  function watchTuyetHocAcks() {

    if(tuyetHocState.watching)return true;

    if(typeof _Sa==='undefined'||!_Sa?.notify?.on)return false;

    try {

      tuyetHocState.onAck=tuyetHocAck;

      _Sa.notify.on(5213,tuyetHocState,tuyetHocAck);

      tuyetHocState.watching=true;

      return true;

    }catch(e){console.warn('[TUYỆT HỌC] Không thể theo dõi cập nhật kỹ năng:',e);return false;}

  }

  function unwatchTuyetHocAcks() {

    if(tuyetHocState.watching)try{

      _Sa.notify.off(5213,tuyetHocState,tuyetHocState.onAck);

    }catch(e){window.KVPV_V1?.diagnostics?.record(e);}

    tuyetHocState.watching=false;

    tuyetHocState.onAck=null;

  }

  function startTuyetHoc() {

    if(!C.enableTuyetHoc || !common() || inTeam() || inMission())return false;

    const d=tuyetHocData(true);

    

    if(!d||!d.red||!d.can||typeof tuyetHocRpc()?.addSkillLevelOfAll!=='function')return false;

    begin('tuyethoc','send',{sent:0,pending:null});

    log('📘 Có dấu đỏ Tuyệt Học: Tăng nhanh bằng tài nguyên có sẵn');

    return true;

  }

  function followTuyetHoc(j,t) {

    if(!C.enableTuyetHoc || !common() || inTeam() || inMission()) {

      due.tuyethoc=t+C.tuyetHocCheckMs;

      return finish(false,'Tuyệt Học: tạm dừng vì bận hoạt động khác');

    }

    if(t-j.started>=C.tuyetHocMaxRunMs ||

       j.target.sent>=C.tuyetHocMaxRequestsPerRun && j.step!=='waiting') {

      due.tuyethoc=t+C.tuyetHocCheckMs;

      return finish(true,'Hết hạn đợt Tăng nhanh; quay lại train / nhiệm vụ');

    }

    if(j.step==='send') {

      if(t-j.at<C.tuyetHocBetweenRequestsMs)return;

      const d=tuyetHocData(true);

      if(!d||!d.red||!d.can){

        due.tuyethoc=t+C.tuyetHocCheckMs;

        return finish(true,'Không còn dấu đỏ / hết điều kiện nâng Tuyệt Học');

      }

      const rpc=tuyetHocRpc();

      if(typeof rpc?.addSkillLevelOfAll!=='function'){

        due.tuyethoc=t+C.tuyetHocNoAckBackoffMs;

        return finish(false,'Không tìm thấy lệnh gốc Tăng nhanh',C.tuyetHocNoAckBackoffMs);

      }

      j.target.pending={sig:d.sig,at:t,ack:tuyetHocState.acks};

      j.target.sent++;

      j.step='waiting';j.at=t;

      tuyetHocState.requests++;

      tuyetHocState.lastAt=t;

      

      

      rpc.addSkillLevelOfAll();

      log('📘 Tuyệt Học Tăng nhanh '+j.target.sent+'/'+C.tuyetHocMaxRequestsPerRun+'; chờ server cập nhật cấp');

      return;

    }

    if(j.step==='waiting'){

      const d=tuyetHocData(false), p=j.target.pending;

      if(d && d.sig!==p.sig){

        tuyetHocState.success++;

        tuyetHocState.last='Server cập nhật cấp Tuyệt Học';

        j.target.pending=null;

        j.step='send';j.at=t;

        return;

      }

      if(t-p.at>=C.tuyetHocAckTimeoutMs){

        tuyetHocState.failed++;

        tuyetHocState.last='Hết thời gian chờ cấp cập nhật; tạm hoãn, KHÔNG gửi lặp';

        due.tuyethoc=t+C.tuyetHocNoAckBackoffMs;

        return finish(false,tuyetHocState.last,C.tuyetHocNoAckBackoffMs);

      }

    }

  }

  function tuyetHocStatus(){

    const d=tuyetHocData(false);

    const v={bat:C.enableTuyetHoc,red19:d?.red??false,

      duDieuKien:d?.can??false,soKyNang:d?.count??0,giaiHan:d?.max??null,

      taiNguyen:d?.currency??null,daGui:tuyetHocState.requests,

      daCapNhat:tuyetHocState.success,loi:tuyetHocState.failed,

      dangNang:job?.type==='tuyethoc',lanTrongDot:job?.type==='tuyethoc'?job.target.sent:0,

      ghiChu:tuyetHocState.last};

    console.table([v]);return v;

  }



  function begin(type, step, target={}) {

    job = {type, step, target, at:now(), started:now(), deadAt:0};

    window.KVPV?.core?.scene?.acquire?.('daily',type);

  }

  function finish(ok, msg, blockFor=0) {

    const k = job?.type || '?';

    if (ok) completed[k] = (completed[k] || 0) + 1;

    if (blockFor) blocks[k] = now() + blockFor;

    log(`${ok ? '✅' : '⚠️'} ${k}: ${msg}`);

    job = null;

    window.KVPV?.core?.scene?.release?.('daily');

    const safelyBackInTown = ok && common() && !inMission() && !inTeam();

    // V8.6.28: fast next task ONLY when server scene is already confirmed safe.

    // Failure or uncertain scene transitions retain the previous 4s barrier.

    idleUntil = now() + (safelyBackInTown ?

      Math.max(0,Number(C.postJobSuccessCooldownMs)||0) : 600);

    

  }

  function blocked(k) { return now() < (blocks[k] || 0); }

  function startSmelt(s) {
    if (window.KVPV_RED_DOT_MODULE?.ownsProgression?.()) return false;

    if (!s || !smeltListenersInstalled) return false;

    

    

    if ([76,108,528,1688].some(id=>s.ui.isOpened?.(id))) return false;

    // Do not start for 1..24 items. Once started, finish even the last partial batch.

    const eligibleCount=smeltEligible(s,'equip').length;

    if (!smeltDrainEquip && eligibleCount>=25 && C.smeltEnabled.equip) smeltDrainEquip=true;

    if (!smeltCandidate(s)) {

      if (eligibleCount===0) smeltDrainEquip=false;

      return false;

    }

    begin('smelt','choosePart',{

      sent:null,batches:0,batchesByTab:{equip:0,holy:0,pet:0},

      skipped:{equip:false,holy:false,pet:false}

    });

    log('🔥 Dung luyện trang bị: >=25 món hợp lệ bắt đầu, sau đó xử lý hết món còn lại; ACK từng lô');

    return true;

  }

  function enter(type, target, call) {

    begin(type,'entering',target);

    call();

    log(`⚔️ Gửi yêu cầu vào ${type}`);

  }



  // V10.2: eligibility callbacks contain only read-only model checks.

  // The timeline remains standalone and can be unit-tested without the game.

  window.KVPV?.timeline?.setReadiness?.(key=>{

    switch(key){

      case 'honghoang': {

        const h=hongData();return !!(C.enableHongHoang&&h.m&&!h.full&&h.map&&h.xianFa>0);

      }

      case 'tien_ton':{const rest=Number(window._Ba?._Xit?._nst?.inst?.ttiScore?.[3]);return C.enableTienTonAuto!==false&&(!Number.isFinite(rest)||rest>0)&&window.KVPV_TIEN_TON_AUTO?.config?.enabled!==false;}
      case 'vinh_du':return !!(C.enableVinhDu&&vinhData().hasTeam);

      case 'tranh_ba_dinh_cao': {

        const d=dcData();return !!(C.enableDinhCao&&d.configMatch&&d.eventTimeMatch&&d.unlocked);

      }

      case 'tu_la':return !!(C.enableTuLa && tuLaDay());

      case 'tam_tien':return C.enableQuizAuto!==false&&Number(boss()?.getCpSceneStateByType?.(69)?.[2])===2;
      case 'dao_nguyen':return !!C.enableDaoTri&&!(C.enableQuizAuto!==false&&Number(boss()?.getCpSceneStateByType?.(69)?.[2])===2);

      default:return true;

    }

  });



  function dispatchFixedWindowV102(t,c){

    const planner=window.KVPV?.timeline;

    if(!planner?.config?.enabled)return false;

    const active=planner.activeAuto({atMs:t,flags:C});

    for(const e of active){

      switch(e.key){

        case 'dao_nguyen':

          if(C.enableDaoTri&&!blocked('daotri') &&

             (scene()===22||(common()&&t>=due.daotri&&daoWindow()))){

            if(startDaoTri(scene()===22))return true;

            due.daotri=t+C.daoTriCheckMs;

          }

          break;

        case 'vinh_du':

          if(C.enableVinhDu&&!blocked('vinhdu') &&

             (scene()===42||(common()&&t>=due.vinhdu&&vinhWindow()))){

            if(startVinhDu(scene()===42))return true;

            due.vinhdu=t+C.vinhDuCheckMs;

          }

          break;

        case 'tu_la':

          if(C.enableTuLa&&!blocked('tula') &&

             (tuLaInside()||(common()&&t>=due.tula&&tuLaWindow()))){

            if(startTuLa(tuLaInside()))return true;

            due.tula=t+6000;

          }

          break;

        case 'tranh_ba_dinh_cao':

          if(C.enableDinhCao&&!blocked('dinhcao') &&

             (dcInside()||(common()&&t>=due.dinhcao&&dcWindow()))){

            if(startDinhCao(dcInside()))return true;

            due.dinhcao=t+6000;

          }

          break;

        case 'honghoang': {

          

          const hold=scene()===17?null:planner.reservation({atMs:t,flags:C,forTask:'honghoang',

            excludeKeys:['honghoang']});

          if(!hold&&C.enableHongHoang&&!blocked('honghoang')&&

             (scene()===17||(common()&&t>=due.honghoang))){

            if(startHong())return true;

            due.honghoang=t+C.hongHoangMs;

          }

          break;

        }

        case 'tientuyen':

          if(common()&&c.frontline&&attempts.tientuyen!==`${c.key}/${c.frontline}`&&

             !blocked('tientuyen')){

            const d=timedData('tientuyen'),reward=_Ba?._XLt?._YLt?.inst;

            if(d.open&&d.ready&&num(reward?.remainTimes)&&Number(reward.remainTimes)>0){

              attempts.tientuyen=`${c.key}/${c.frontline}`;

              enter('tientuyen',{map:d.map,slot:c.frontline},()=>api()?.rqEtScene?.(d.map));

              return true;

            }

          }

          break;

        case 'lanhdia':

          if(common()&&c.territory&&attempts.lanhdia!==c.key&&!blocked('lanhdia')){

            const d=timedData('lanhdia'),m=_Ba?._zLt?._VLt?.ins;

            if(d.open&&m?.actionActIsOpen?.()===true&&

              Number(m?.enterTime||0)<=Number(typeof _Sa!=='undefined'?_Sa.svrTime:t)){

              attempts.lanhdia=c.key;

              enter('lanhdia',{map:2164},()=>api()?.rqEtScene?.(2164));return true;

            }

          }

          break;

      }

    }

    return false;

  }



  

  function dispatch() {

    if(window.KVPV_ENTRY_POLICY?.manual===true){

      // Idle Daily may process inventory; all dungeon/event entry below stays disabled.

      if(window.KVPV_ENTRY_POLICY?.idleDaily!==true||!common()||inMission()||inTeam()||

        now()<Number(window.__KVPV_USER_UI_UNTIL||0)||window.KVPV?.core?.scene?.status?.()?.owner||

        window.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true)return;

      const t=now();if(t>=idleUntil&&t>=due.smelt&&!blocked('smelt')){due.smelt=t+C.smeltMs;startSmelt(smeltData());}

      return;

    }

    const t = now(), c = vnTime();

    if (window.KVPV?.core?.scene?.can?.('daily')===false) return;

    vinhSyncDay();

    if (t < idleUntil) return;

    // V10.2: time-critical existing native entry points run before untimed HH.

    if(dispatchFixedWindowV102(t,c))return;

    

    

    const hhHold=scene()===17?null:window.KVPV?.timeline?.reservation?.({

      atMs:t,flags:C,forTask:'honghoang',excludeKeys:['honghoang']

    });

    if (!hhHold && C.enableHongHoang && !blocked('honghoang') &&

        (scene()===17 || (common() && t>=due.honghoang))) {

      if (startHong()) return;

      due.honghoang=t+C.hongHoangMs;

    }



    

    if(C.enableDinhCao && !blocked('dinhcao') &&

      (dcInside() || (common() && t>=due.dinhcao && dcWindow()))){

      if(startDinhCao(dcInside()))return;

      due.dinhcao=t+6000;

    }



    

    

    if(C.enableDaoTri && !blocked('daotri') &&

      (scene()===22 || (common() && t>=due.daotri))) {

      if(startDaoTri(scene()===22))return;

      due.daotri=t+C.daoTriCheckMs;

    }



    

    if(C.enableVinhDu && !blocked('vinhdu') &&

      (scene()===42 || (common() && t>=due.vinhdu && vinhWindow()))) {

      if(startVinhDu(scene()===42))return;

      due.vinhdu=t+C.vinhDuCheckMs;

    }



    // TU LA LOI DAI: scene 58/61; 20:30-20:45 CN,T2-T5.

    if(C.enableTuLa && !blocked('tula') &&

      (tuLaInside() || (common() && t>=due.tula && tuLaWindow()))){

      if(startTuLa(tuLaInside()))return;

      due.tula=t+6000;

    }



    

    if (C.enableTienDuyen && !common() && (scene()===36 || mapNow()===2381)) {

      begin('tienduyen','fighting',{before:null,adopted:true});

      log('💞 Tiếp quản Phó Bản Tiên Duyên đang đánh');

      return;

    }

    if (scene()===34 && adoptStar()) return;

    

    if (C.enableCrystal && !blocked('crystal') &&

        (scene()===53 || _Ba?._cm?._q3t?.ins?.getHasTeamByType?.(6))) {

      if (startCrystal(true)) return;

    }



    // 'isInMission' also covers ordinary AFK quest auto-fighting in a common map.

    // User explicitly prioritizes the two dungeons. Do not abort an owned job,

    // leave a special scene, or leave another team. Other normal jobs still wait.

    if (!common() || inTeam()) return;



    

    

    if(vinhPrep() && vinhData().hasTeam) {

      vinhSyncDay();vinhRefresh(t);

      if(!vinhWindow()) log('🏅 Đang giữ chỗ để 19:45 vào Chiến Trường Vinh Dự');

      return;

    }



    

    

    if(tuLaPrepare()){

      const d=tuLaData();

      // V9: a loaded model does not mean the event will open.

      if(tuLaWindow() || d.opened===true){

        log(tuLaWindow()?'⚔️ Đang chờ server mở Tu La Lôi Đài':'⚔️ Giữ chỗ Tu La 20:30');

        return;

      }

    }



    

    

    if(dcPrepare() && dcData().configMatch && dcData().eventTimeMatch && dcData().unlocked){

      log(dcWindow()?'🏔️ Chờ server xác nhận mở Tranh Bá Đỉnh Cao':'🏔️ Giữ chỗ Tranh Bá Đỉnh Cao 21:00');

      return;

    }



    

    

    const hhSoon=preparingHongHoang();

    if (hhSoon) {

      log('🎁 Giữ chỗ ưu tiên Hồng Hoang '+hhSoon.time+'; không bắt đầu phó bản mới');

      return;

    }



    if (c.territory && attempts.lanhdia !== c.key && !blocked('lanhdia')) {

      const s = timedData('lanhdia');

      const model = _Ba?._zLt?._VLt?.ins;

      if (s.open && model?.actionActIsOpen?.() === true &&

          Number(model?.enterTime || 0) <= Number(typeof _Sa !== 'undefined' ? _Sa.svrTime : t)) {

        attempts.lanhdia = c.key;

        enter('lanhdia',{map:2164},() => api()?.rqEtScene?.(2164)); return;

      }

    }

    if (c.frontline && attempts.tientuyen !== `${c.key}/${c.frontline}` && !blocked('tientuyen')) {

      const s = timedData('tientuyen'), reward = _Ba?._XLt?._YLt?.inst;

      if (s.open && s.ready && num(reward?.remainTimes) && Number(reward.remainTimes) > 0) {

        attempts.tientuyen = `${c.key}/${c.frontline}`;

        enter('tientuyen',{map:s.map,slot:c.frontline},() => api()?.rqEtScene?.(s.map)); return;

      }

    }



    // V10.2: keep the actor idle during a RESERVED imminent event.

    // RED FIRST background consumers still run on their separate registered lanes.

    const timedHold=window.KVPV?.timeline?.reservation?.({

      atMs:t,flags:C,forTask:'long'

    });

    if(timedHold){

      log('⏳ Giữ chỗ '+timedHold.name+' '+timedHold.time+' ('+timedHold.phase+')');

      return;

    }



    

    

    if (C.enableTienDuyen && t>=due.tienduyen && !blocked('tienduyen')) {

      due.tienduyen=t+C.tienDuyenMs;

      if (startTienDuyen(tienDuyenData())) return;

    }

    if (C.enableTinhThan && t>=due.tinhthan && !blocked('tinhthan')) {

      due.tinhthan=t+C.tinhThanMs;

      if (startStar()) return;

    }

    // Never let the remaining daily executors interrupt an active ordinary quest.

    if(inMission())return;

    

    

    if (C.redFirst && t >= redGate.retryAfter) {

      if (t>=redGate.cachedUntil) {

        redGate.active=window.KVPV_UPGRADES?.hasReadyClaims?.() === true;

        redGate.cachedUntil=t+5000;

      }

      if (redGate.active) {

        if (!redGate.holdFrom) redGate.holdFrom = t;

        if (t - redGate.holdFrom < 90000) {

          log('🎁 Ưu tiên nhận thưởng có sẵn (Tiên Vị/Tiên Phủ)');

          return;

        }

        redGate.holdFrom = 0;

        redGate.retryAfter = t + 60000;

      } else redGate.holdFrom = 0;

    }



    

    // event reservations, Tien Duyen, Tinh Than, BEFORE slow routine jobs.

    // Uses EXISTING tuVuotIdle(): no raw RPC, no extra attempts and retains

    // unlimited by default, both still use native ACK/retry pacing.

    if (C.asyncStagePriority && C.enableTuVuot && !tuVuot.stopped && !inMission()) {

      const spacing=Math.max(30000, Number(C.asyncStagePrioritySpacingMs)||90000);

      const grace=Math.min(45000, Math.max(5000, Number(C.asyncStageNativeGraceMs)||30000));

      if (asyncStagePriorityAt && t-asyncStagePriorityAt < grace) {

        const nativeStage=tvData();

        if (nativeStage?.valid && nativeStage.m?.auto===true) return;

      }

      if (!asyncStagePriorityAt || t-asyncStagePriorityAt>=spacing) {

        if(tuVuotIdle()) {

          asyncStagePriorityAt=t;

          log('🏯 Async 928: nhường lượt Tự Vượt Thiên Quan (native auto)');

          return;

        }

      }

    }



    

    if(C.enableTuyetHoc && t>=due.tuyethoc && !blocked('tuyethoc')) {

      due.tuyethoc=t+C.tuyetHocCheckMs;

      if(startTuyetHoc())return;

    }



    

    const b = smeltData();

    if (t >= due.smelt && !blocked('smelt')) {

      due.smelt = t + C.smeltMs;

      if (startSmelt(b)) return;

    }

    // 2. EXP

    if (C.enableExp && t >= due.exp && !blocked('exp')) {

      due.exp = t + C.expMs;

      const s = expData();

      

      

      if (s?.yes && s.n > 0 && window.KVPV_EXP_4ACC?.role === 'leader') {

        begin('exp','matching',{before:s.n, seen:false, readyAt:0});

        

        if (_Ba?._cm?._vJ?.ins) _Ba._cm._vJ.ins.autoStart=false;

        

        

        s.matcher.creSerAreRoom([2,'EXP 4 ACC',2091,1,0,0,0,1,false,false]);

        log(`⚡ EXP 4 ACC tao phong; con ${s.n} luot, cho 3 clone`); return;

      }

    }

    

    

    if (C.enableCrystal && t>=due.crystal && !blocked('crystal')) {

      due.crystal=t+C.crystalCheckMs;

      if (startCrystal()) return;

    }

    

    if (t >= due.thanthu && !blocked('thanthu')) {

      due.thanthu = t + C.thanThuMs;

      const s = thanThuData();

      if (s?.yes && s.tab && s.t && s.valid3) {

        const map = Number(s.cf.getSingleInfo(s.t.id)[0]);

        

        const witnessed = Object.fromEntries(s.all.map(x => [

          String(x.area), x.rawState != null && Number(x.rawState) === 0

        ]));

        enter('thanthu', {

          map, area:s.t.area, id:s.t.id,

          all:s.all.map(x => ({area:x.area, id:x.id})),

          witnessed, defeated:{}, diedAt:{},

          selected:null, lastSelectAt:0

        }, () => {

          api()?.rqEtScene?.(map,s.tab.lv);

          s.m.setTempTargetOcc?.(s.t.id,1);

        });

        log('🐉 Thần Thú: phải hạ đủ 3/3 mới Thoát');

        return;

      }

      if (s?.yes && !s.valid3) {

        due.thanthu = t + 30000;

        log('⏳ Thần Thú chưa đồng bộ đủ 3 boss; thử lại sau 30 giây');

      }

    }

    

    if (t >= due.bossnhom && !blocked('bossnhom')) {

      due.bossnhom = t + C.bossNhomMs;

      const s = nhomData();

      if (s?.yes && s.n > 0 && s.t) {

        enter('bossnhom',{map:Number(s.t[0]),id:s.t[2]},() =>

          api()?.rqEtScene?.(s.t[0],s.t[1],[],0,s.t[2])); return;

      }

    }

    

    

    if (t >= due.manhoang && !blocked('manhoang')) {

      due.manhoang = t + C.manHoangMs;

      const s = manData();

      if (s?.yes && s.strength > 0 && !s.autoItem &&

          [31,54].includes(s.type) && num(s.map) && num(s.layer) &&

          s.ids.length && s.ids.every(id => alive(bossFlag(id)) || dead(bossFlag(id))) &&

          s.ids.some(id => alive(bossFlag(id)))) {

        if (b && num(b.free) && num(b.threshold) && b.free <= b.threshold) {

          if (!blocked('smelt') && startSmelt(b)) return;

          log('⚠️ Túi đầy, chưa dung luyện được; BỎ QUA Mãn Hoang, Auto vẫn chạy');

        } else {

          enter('manhoang',{map:s.map,ids:s.ids},() => api()?.rqEtScene?.(s.map,s.layer)); return;

        }

      }

    }

    

    if (C.enableYeuVuong && t >= due.yeuvuong && !blocked('yeuvuong')) {

      due.yeuvuong = t + C.yeuVuongMs;

      const s = yeuData();

      if (s?.n > 0 && s.t) {

        enter('yeuvuong',{map:Number(s.t[0]),id:s.t[2]},() =>

          api()?.rqEtScene?.(s.t[0],s.t[1],[],0,s.t[2])); return;

      }

    }

    

    if (C.enableCompose && t >= due.compose && !blocked('compose')) {

      due.compose=t+C.composeCheckMs;

      if(startCompose())return;

    }

    

    if (tuVuotIdle()) return;

    log('💤 Rảnh, Auto Daily vẫn chạy và chờ lịch tiếp theo');

  }



  function follow() {

    const j = job, t = now(); if (!j) return;

    if (j.type==='crystal') return followCrystal(j,t);

    if (j.type==='vinhdu') return followVinhDu(j,t);

    if (j.type==='tula') return followTuLa(j,t);

    if (j.type==='dinhcao') return followDinhCao(j,t);

    if (j.type === 'compose') return followCompose(j,t);

    if (j.type === 'tuyethoc') return followTuyetHoc(j,t);

    if (j.type === 'smelt') {

      const s=smeltData();

      if (!s || !smeltListenersInstalled) return finish(false,'Thiếu dữ liệu / phản hồi dung luyện',C.smeltBackoffMs);

      const k=j.target;

      

      if (t-j.started>C.smeltHardLimitMs || k.batches>=C.smeltMaxTotalBatches) {

        due.smelt=t+C.smeltMs;

        return finish(true,'Dừng đợt dung luyện theo giới hạn an toàn; hoạt động khác tiếp tục');

      }

      if (j.step==='choosePart') {

        

        if ([76,108,528,1688].some(id=>s.ui.isOpened?.(id))) {

          due.smelt=t+C.smeltMs;

          return finish(false,'Có giao diện dung luyện hoặc kết quả đang mở; chờ đóng thủ công');

        }

        const x=smeltCandidate(s,j);

        if(!x) {

          due.smelt=t+C.smeltMs;

          if (!smeltEligible(s,'equip').length) smeltDrainEquip=false;

          return finish(true,'Đã xử lý các tab có đồ hợp lệ');

        }

        const ids=[...new Set(smeltEligible(s,x.key)

          .slice(0,x.batchSize).map(a=>a[2]))];

        if(!ids.length){k.skipped[x.key]=true;return;}

        const before=smeltAck[x.key];

        if(!smeltRequest(x.key,ids)) {

          return smeltSkipTab(j,x.key,'Không tìm được RPC gốc');

        }

        k.batches++;

        k.batchesByTab[x.key]++;

        k.sent={key:x.key,name:x.name,ids,at:t,ackBefore:before,ackAt:0};

        j.step='waitingAck';j.at=t;

        log('🔥 '+x.name+': gửi '+ids.length+' món, chờ server xác nhận');

        return;

      }

      if (j.step==='waitingAck') {

        const a=k.sent;

        if(!a){j.step='choosePart';return;}

        if(smeltAck[a.key]>a.ackBefore) {

          a.ackAt=t;

          j.step='verifying';

          log('✅ '+a.name+': server đã phản hồi; đang xác nhận túi đồ');

          return;

        }

        if(t-a.at>C.smeltAckTimeoutMs) {

          return smeltSkipTab(j,a.key,'Server không phản hồi trong '+C.smeltAckTimeoutMs/1000+' giây; không gửi trùng');

        }

        return;

      }

      if(j.step==='verifying') {

        const a=k.sent;

        if(!a){j.step='choosePart';return;}

        const current=new Set(smeltEligible(s,a.key).map(x=>x[2]));

        const remaining=a.ids.filter(id=>current.has(id));

        if(remaining.length===0) {

          log('📦 '+a.name+': '+a.ids.length+' món đã ra khỏi danh sách dung luyện');

          k.sent=null;j.step='choosePart';j.at=t;

          return;

        }

        if(t-a.ackAt>7000) {

          return smeltSkipTab(j,a.key,'Server có phản hồi nhưng '+remaining.length+' món chưa cập nhật, không gửi lại');

        }

        return;

      }

      return;

    }

    if (j.type==='tienduyen') return followTienDuyen(j,t);

    if (j.type==='tinhthan') return followStar(j,t);

    if (j.type === 'daotri') return followDaoTri(j,t);

    if (j.type === 'honghoang') return followHong(j,t);

    if (j.type === 'exp') {

      const s=expData(), ready=common() && !inTeam() && !inMission();

      if (!ready) j.target.seen=true;

      if (j.target.seen && ready) {

        if (!j.target.readyAt) j.target.readyAt=t;

        if (t-j.target.readyAt >= 5000) {due.exp=t+5000; return finish(true,'đã trở về, xét lượt tiếp');}

      } else j.target.readyAt=0;

      if (!j.target.seen && t-j.at > 90000) return finish(false,'không ghép được đội, hoãn 10 phút',600000);

      if (t-j.started > C.fightTimeoutMs) return finish(false,'quá 20 phút; chờ kiểm tra',600000);

      return;

    }



    const s=scene();

    if (j.step === 'entering') {

      if (!common()) {

        const valid= j.type==='thanthu' ? s===48 :

          j.type==='bossnhom' ? s===4 :

          j.type==='manhoang' ? [31,54].includes(s) && mapNow()===j.target.map :

          j.type==='yeuvuong' ? s===10 :

          j.type==='tientuyen' ? [21,68].includes(s) :

          j.type==='lanhdia' ? s===44 && mapNow()===2164 : false;

        if (!valid) return finish(false,'đang ở bản đồ khác; không can thiệp',120000);

        j.step='fighting';j.at=t; log('✅ Đã vào '+j.type); return;

      }

      if (t-j.at > C.enterTimeoutMs) return finish(false,'vào bản đồ quá 45 giây',120000);

      return;

    }

    if (j.step === 'fighting') {

      if (common()) return finish(true,'đã ra cảnh thường');

      if (t-j.at > C.fightTimeoutMs && !['lanhdia','tientuyen','thanthu'].includes(j.type)) return finish(false,'đánh quá 20 phút',600000);

      if (j.type==='tientuyen' || j.type==='lanhdia') {

        const c=vnTime(), stillOpen=j.type==='lanhdia'?c.territory:!!c.frontline;

        if (!stillOpen) {

          exitDungeon(); j.step='exiting';j.at=t;log('🚪 Hết ca '+j.type+', đang Thoát');return;

        }

        if (j.type==='tientuyen') {

          

          const r=_Ba?._XLt?._YLt?.inst, state=boss()?.getCpSceneStateByType?.(s);

          const ids=_ft?._q6i?.ins?.getOccAll?.(state?.[8]) || [];

          const id=ids.find(x=>Number(r?.getCfgByid?.(x)?.[6])===1300 && alive(bossFlag(x)));

          if (id!=null && j.target.selected!==id && typeof r?.setSelTarget==='function') {

            r.setSelTarget(id);j.target.selected=id;log('🎯 Chiến Tuyến chỉ chọn Boss Lv1300');

          }

        } else {

          const m=_Ba?._zLt?._VLt?.ins, ids=m?.getBsList?.() || [];

          const final=m?.getShowBsOcc?.();

          const role=_C?._Ba?.instance?.getRole?.(Number(window.__KVPV_OWN_ACTOR_ID)),combat=role?.getComponent?.(_d?._Yct?._Het);
          const loot=window.KVPV_TERRITORY_LOOT?.decide?.({ids,final,selected:j.target.selected,target:combat?.target,state:j.target,alive:id=>alive(m?.getBsInfoById?.(id)?.[2]?.[0]),dead:id=>dead(m?.getBsInfoById?.(id)?.[2]?.[0])});
          if(loot?.done){exitDungeon();j.step='exiting';j.at=t;log('🎁 Lãnh Địa: tất cả Boss đã tới mốc hết thưởng, Thoát không chờ hạ Boss');return;}
          const id=loot?loot.next:ids.includes(final) && alive(m?.getBsInfoById?.(final)?.[2]?.[0]) ? final :

            ids.find(x=>alive(m?.getBsInfoById?.(x)?.[2]?.[0]));

          if (id!=null && j.target.selected!==id && typeof m?.setSelTarget==='function') {

            m.setSelTarget(id,true);j.target.selected=id;log('🎯 Lãnh Địa chọn Boss '+id);

          }

        }

        return;

      }

      let isDead=false;

      if (j.type==='thanthu') {

        if (s!==48) return finish(false,'không còn trong Thần Thú',120000);

        const model = _Ba?._dP?._P5t?.ins;

        const rows = model?.getSingleBossInfoArr?.();

        if (!Array.isArray(rows) || rows.length !== 3 ||

            !Array.isArray(j.target.all) || j.target.all.length !== 3) return;

        const byArea = new Map(rows.map(r => [String(r?.[0]), r]));

        

        for (const b of j.target.all) {

          const key = String(b.area), row = byArea.get(key);

          if (!row || String(row[1]) !== String(b.id)) return;

          const raw = row[2];

          const st = raw == null ? NaN : Number(raw);

          if (st === 0) {

            j.target.witnessed[key] = true;

            delete j.target.diedAt[key];

          } else if (Number.isFinite(st) && st > 0 &&

                     j.target.witnessed[key] && !j.target.defeated[key]) {

            if (!j.target.diedAt[key]) j.target.diedAt[key] = t;

            if (t - j.target.diedAt[key] >= C.deadConfirmMs) {

              j.target.defeated[key] = true;

              log('🐉 Đã hạ boss '+b.id+' | '+

                Object.keys(j.target.defeated).length+'/3');

            }

          }

        }

        const killed = Object.keys(j.target.defeated).length;

        if (killed !== 3) {

          

          

          const next = j.target.all.find(b =>

            !j.target.defeated[String(b.area)] &&

            Number(byArea.get(String(b.area))?.[2]) === 0

          );

          if (next && typeof model.setTarget === 'function' &&

              (j.target.selected !== next.id ||

               t - j.target.lastSelectAt >= 15000)) {

            model.setTarget(next.id, 1, 48);

            j.target.selected = next.id;

            j.target.lastSelectAt = t;

            log('🎯 Thần Thú '+killed+'/3 → đánh boss '+next.id);

          }

          return; 

        }

        isDead = true;

      } else if (j.type==='bossnhom' || j.type==='yeuvuong') {

        isDead=dead(bossFlag(j.target.id));

      } else if (j.type==='manhoang') {

        if (![31,54].includes(s) || mapNow()!==j.target.map) return finish(false,'khác bản đồ Mãn Hoang',120000);

        const live=j.target.ids.find(x=>alive(bossFlag(x)));

        const m=_Ba?._Fvt?._Evt?.inst;

        if (live!=null && j.target.selected!==live && typeof m?.setSelTarget==='function') {

          m.setSelTarget(live,true);j.target.selected=live;

        }

        isDead=j.target.ids.length>0 && j.target.ids.every(x=>dead(bossFlag(x)));

      }

      if (!isDead) {j.deadAt=0;return;}

      if (!j.deadAt) {j.deadAt=t;log('💀 Boss chết, xác nhận...');return;}

      if (t-j.deadAt<C.deadConfirmMs || t-j.at<8000) return;

      if (j.type==='bossnhom') api()?.rqEtScene?.(0);

      else exitDungeon();

      j.step='exiting';j.at=t; log('🚪 Đã yêu cầu Thoát '+j.type);return;

    }

    if (j.step==='exiting') {

      if (common()) return finish(true,'đã Thoát, chuyển việc tiếp theo');

      if (t-j.at>45000) return finish(false,'chưa xác nhận Thoát; tự kiểm tra lại sau',120000);

    }

  }



  function updateFishTimer(){

    // V8.6.28: don't keep an idle 500ms polling interval running all day.

    // Enable the high-frequency fish loop ONLY in the fishing stage.

    const fishing=!!timer&&C.enableDaoTri&&job?.type==='daotri'&&

      job?.step==='collecting'&&scene()===22&&daoWindow();

    if(!fishing){

      if(daoFishTimer!==null){__KVPV29.cancel(daoFishTimer);daoFishTimer=null;}

      fishTimerInterval=0;

      return;

    }

    const delay=Math.max(40,Number(C.daoTriFishScanMs)||60);

    if(daoFishTimer!==null&&fishTimerInterval===delay)return;

    if(daoFishTimer!==null)__KVPV29.cancel(daoFishTimer);

    fishTimerInterval=delay;

    daoFishTimer=__KVPV29.every(()=>{

      try{daoFishTick();}catch(e){console.warn('[ĐÀO TRÌ] Lỗi bắt cá:',e);}

    },delay);

  }

  

  function tick() {

    if (!timer) return;

    if(window.KVPV_ENTRY_POLICY?.manual===true&&window.KVPV_ENTRY_POLICY?.idleDaily===true){

      const owner=window.KVPV?.core?.scene?.status?.()?.owner;

      if(!common()||inMission()||inTeam()||now()<Number(window.__KVPV_USER_UI_UNTIL||0)||

        owner&&owner!=='daily'||_Ba?._rJ?._O$?.ins?.isDead!==false)return;

      // No event scheduling, stage takeover, dungeon adoption or exit in manual mode.

      try{if(job){if(job.type==='smelt')follow();}else dispatch();}

      catch(e){console.warn('[IDLE DAILY] Giữ trạng thái chờ:',e);}

      return;

    }

    

    try { tienTonTraceSync(); }

    catch(e) { console.warn('[TIÊN TÔN] Lỗi ghi thao tác, Auto Daily vẫn chạy:',e); }

    try {

      if(C.enableVinhDu && vinhPrep()) {

        vinhSyncDay();vinhRefresh(now());

      }

    } catch(e){console.warn('[VINH DỰ] Lỗi cập nhật thời gian vào trận:',e);}

    try { eventScheduleTick(); }

    catch(e) { console.warn('[LỊCH KVPV] Lỗi lịch sự kiện (Auto Daily vẫn chạy):',e); }

    try { tuVuotObserve(); }

    catch(e) {console.warn('[TỰ VƯỢT] Lỗi theo dõi; Auto Daily vẫn chạy:',e);}

    try { if (job) follow(); else dispatch(); }

    catch (e) {

      console.error('[KVPV V7.5.16] Lỗi module:', job?.type, e);

      

      if (job) finish(false,'gặp lỗi; bỏ qua tạm 2 phút',120000);

      else idleUntil=now()+10000;

    }

    try{updateFishTimer();}catch(e){console.warn('[DAO TRI] Timer update failed',e);}

  }

  

  function start() {

    if (timer) return;

    hookTeamAlerts();

    watchSmeltAcks();

    watchComposeAcks();

    watchTuyetHocAcks();

    timer=__KVPV29.every(tick,C.tickMs);

    __KVPV29.tag(timer,'auto-daily-main',0);

    updateFishTimer(); // no idle interval; fast fish scan only during collection

    dcWatchClaim();

    log('🚀 Auto Daily V7.5.16 CHẠY LIÊN TỤC (kể cả lúc dung luyện)');

    tick();

  }

  

  function stop() {

    __KVPV29.cancel(timer);timer=null;

    dcUnwatchClaim();

    __KVPV29.cancel(daoFishTimer);daoFishTimer=null;fishTimerInterval=0;

    unhookTeamAlerts();

    unwatchSmeltAcks();

    unwatchComposeAcks();

    unwatchTuyetHocAcks();

    tienTonState.manual=false;

    tienTonTraceUninstall();

    log('🛑 Đã dừng Auto Daily theo yêu cầu');

  }

  function reset() {

    if (timer) stop();

    job=null;idleUntil=0;lastMsg='';

    Object.keys(due).forEach(k=>due[k]=0);

    console.log('↻ Đã reset; gõ KVPV_DAILY.start()');

  }

  

  function status() {

    const out={running:!!timer,job:job?.type||'rảnh',step:job?.step||'-',

      hongHoangJob:job?.type==='honghoang'?{step:job.step,count:hongData().count,max:hongData().max}:null,

      daoTri:job?.type==='daotri'?{step:job.step,luotCon:daoData().remaining,soLanBam:job.target?.catches||0,choServer:job.target?.awaiting}:null,

      dinhCao:{khungGio:dcWindow(),daVao:dcEntries,thuVao:dcTries,serverMo:dcData().open,

        cfgMatch:dcData().configMatch,scene:scene(),tang:dcFloor(),ruong:{daNhan:dcTop.claimed,

        soLanThu:dcTop.tries,npcId:dcTop.npcId,lyDo:dcTop.reason}},

      tuLa:{khungGio:tuLaWindow(),daVao:tuLaJoined,thuVao:tuLaTries,serverMo:tuLaData().opened,scene:scene()},

      vinhDu:{khungGio:vinhWindow(),daVao:vinhConfirmed,thuVao:vinhEnterAttempts,coChienDoi:vinhData().hasTeam,serverMo:vinhData().open,scene:scene()},

      smelt:!!timer && job?.type==='smelt'?'Auto vẫn BẬT':'-',

      smeltTab:job?.type==='smelt' ? job.target?.sent?.name || '-' : '-',

      tuyetHoc:{red19:tuyetHocData(false)?.red??false,duNang:tuyetHocData(false)?.can??false,gui:tuyetHocState.requests,capNhat:tuyetHocState.success,loi:tuyetHocState.failed,dangXuLy:job?.type==='tuyethoc'},

      ghep:{da:composeState.success.stone,daoCu:composeState.success.props,loi:composeState.fail,dangGhep:job?.type==='compose',ack:composeState.watcher},

      smeltBatches:job?.type==='smelt' ? job.target?.batches : 0,

      smeltAckReady:smeltListenersInstalled,

      done:{...completed},

      team:job?.type==='tinhthan'?{...team,members:Number(starRefs()?.model?.teamLength)||0}:null,

      tienDuyen:job?.type==='tienduyen' ? {step:job.step,before:job.target?.before} : null,

      thuHoThuyTinhJob:job?.type==='crystal'?{step:job.step,doKho:job.target?.difficulty,soNguoi:crystalData()?.members,lanDanh:crystalData()?.m?.curWare,ketQua:job.target?.result}:null,

      thanThuProgress:job?.type==='thanthu' ? Object.keys(job.target?.defeated||{}).length+'/3' : '-',

      thanThuCheck:new Date(Math.max(now(),due.thanthu)).toLocaleString('vi-VN'),

      bossNhomCheck:new Date(Math.max(now(),due.bossnhom)).toLocaleString('vi-VN'),

      tuVuot:{fails:tuVuot.failures,max:C.tuVuotMaxConsecutiveFailures,

        loiVao:tuVuot.rejected,daKhoa:tuVuot.stopped,lyDo:tuVuot.reason},

      lichDangMo:C.enableEventSchedule?eventScheduleStatus().active.map(x=>x.name):[],

      tienTonTrace:{dangGhi:tienTonState.active,soLenh:tienTonState.calls.length,trongGio:tienTonWindow()},

      hongHoangSapMo:preparingHongHoang()?.time||'-'};

    console.log(out);return out;

  }

  function check() {

    const cry=crystalData();

    const a=smeltData(), e=expData(),td=tienDuyenData(),th=thanThuData(),bn=nhomData(),mh=manData(),yv=yeuData(),star=starRefs();

    const c=vnTime();

    const hong=hongData();

    const out={

      TranhBaDinhCao:C.enableDinhCao?`21:00-21:30; cfg=${dcData().configMatch}; server mở=${dcData().open}; vào=${dcEntries}; thử=${dcTries}`:'đã tắt',

      TuLaLoiDai:C.enableTuLa?`CN,T2-T5 20:30-20:45; server mở=${tuLaData().opened}; map=${tuLaData().map}; đã thử=${tuLaTries}; đã vào=${tuLaJoined}`:'đã tắt',

      ChienTruongVinhDu:C.enableVinhDu?`19:45-20:00; cảnh=${scene()}; server mở=${vinhData().open}; Chiến Đội=${vinhData().hasTeam}; đã thử=${vinhEnterAttempts}; đã vào=${vinhConfirmed}`:'đã tắt',

      DaoNguyenDaoTri:C.enableDaoTri?`19:00-19:30; scene=${scene()}; map=${mapNow()}; trong cảnh=${daoData().inside}; còn bắt=${daoData().remaining}; server mở=${daoData().open}`:'đã tắt',

      HongHoang:C.enableHongHoang ? `ƯU TIÊN 1; mở=${hong.eventOpen}; lượt=${hong.count}/${hong.max}; map=${hong.map??'?'}; ứng viên=${hong.maps.join(',')||'?'}; Rương Tiên Pháp` : 'đã tắt',

      DungLuyen:a ? `Trang Bị=${a.counts.equip}; Thánh Trang hợp lệ=${smeltEligible(a,'holy').length}; Thần Thú=${a.counts.pet}; phản hồi=${smeltListenersInstalled}` : '?',

      TuyetHoc:C.enableTuyetHoc?`dấu19=${tuyetHocData(false)?.red??false}; đủ nâng=${tuyetHocData(false)?.can??false}; đã nâng=${tuyetHocState.success}; lỗi=${tuyetHocState.failed}`:'đã tắt',

      GhepDaHon_DaoCu:C.enableCompose?`Đá=${composeState.success.stone}; đạo cụ=${composeState.success.props}; có công thức=${composeCandidates().length}`:'đã tắt',EXP:e?`${e.n} lượt; dấu53=${e.yes}`:'?',

      ThuHoThuyTinh:cry ? `lượt=${cry.remaining}; dấu627=${cry.mark}; độ khó=${cry.difficulty??'?'}; tầng cao nhất=${cry.unlocked??'?'}; đội=${cry.members}/4; tự dựng tháp=${cry.autoTower}` : '?',

      TienDuyen:td?(td.readied ? `${td.remaining}/${td.total} lượt; dấu377=${td.yes}; kết duyên=${td.married}; gộp=${td.merge}` : 'đang tải số lượt'):'?',

      ThanThu:th?`dấu561=${th.yes}; boss=${th.all?.length??0}/3; theo dõi=${th.t?.id??'-'}`:'?',

      TinhThan:star?`Nguyên Lực=${star.model.strengthvalue}; Đội=${star.model.teamLength||0}`:'?',

      BossNhom:bn?`${bn.n} lượt; dấu36=${bn.yes}; boss=${bn.t?.[2]??'-'}`:'?',

      ManHoang:mh?`dấu44=${mh.yes}; thể lực=${mh.strength}`:'?',

      YeuVuong:yv?`${yv.n} lượt; boss=${yv.t?.[2]??'-'}`:'?',

      TienTuyen:c.frontline||'ngoài giờ',LanhDia:c.territory?'đang trong giờ':'ngoài giờ',

      HongHoangMode:C.enableHongHoang?'Ưu tiên 1: chỉ Rương Tiên Pháp':'đã tắt',

      TuVuot:`Thua ${tuVuot.failures} lần (không giới hạn); lỗi vào ${tuVuot.rejected} lần (không giới hạn); dừng=${tuVuot.stopped||!C.enableTuVuot}` ,

      LichSuKien:C.enableEventSchedule?`Bật; ${EVENT_SCHEDULE.length} loại sự kiện, KVPV_DAILY.lich()`:'tắt',

      TienTonDauKy:`19:30-19:45; ghi thao tác=${tienTonState.active}; số lệnh=${tienTonState.calls.length}; auto native=${window.KVPV_TIEN_TON_AUTO?.status?.()?.autoNative===true}`

    };

    console.table([out]);return out;

  }

  function lich() {

    const ss=eventScheduleStatus();

    console.log('[LỊCH KVPV] Giờ VN:',ss.localTime);

    if(ss.active.length)console.table(ss.active.map(x=>({Sự_kiện:x.name,Giờ:x.time,Chế_độ:x.action,Điều_kiện:x.unlock||'-'})));

    else console.log('[LỊCH KVPV] Hiện không có sự kiện trong giờ.');

    console.table(ss.upcoming.map(x=>({Ngày:x.dateKey,Sự_kiện:x.name,Giờ:x.time,Chế_độ:x.action,Điều_kiện:x.unlock||'-'})));

    return ss;

  }

  function lichDay() {

    const wd=['CN','T2','T3','T4','T5','T6','T7'];

    const table=EVENT_SCHEDULE.map(e=>({

      Sự_kiện:e.name, Giờ:[...(e.slots||[]),...(e.instants||[]).map(x=>x+' (mốc)')].join('; '),

      Thứ:e.days?e.days.map(d=>wd[d]).join(', '):'Mỗi ngày',

      Chế_độ:e.action==='auto'?'Đã có auto':e.action==='trace'?'Ghi thao tác (chưa tự vào)':'Nhắc lịch', Điều_kiện:e.unlock||'-'

    }));

    console.table(table);return table;

  }

  window.KVPV_TULA27=Object.freeze({version:'8.6.27',

    status:tuLaStatus,diagnostics:tuLaDiagnostics,

    // Read-only: uncertain reward locks can only clear on server state change/new day.

    rewards:()=>Array.from(tuLaClaims.entries()).map(([id,row])=>({id,...row}))});

  window.KVPV_DAILY={quickState:()=>({running:!!timer,job:job?.type||'rảnh',step:job?.step||'-',scene:scene(),common:common(),jobStartedAt:job?.started??null,jobUpdatedAt:job?.at??null}),

    smelt25Status:()=>{const d=smeltData(),ids=smeltEligible(d,'equip').map(x=>Number(x[2]));const r={enabled:C.smeltEnabled.equip,eligible:ids.length,threshold:25,draining:smeltDrainEquip,currentJob:job?.type||'rảnh',lastAck:smeltAck.equip,backoffUntil:smeltBackoff.equip||0,firstIds:ids.slice(0,25)};console.log('[SMELT25]',r);return r;},

    smelt25Stop:()=>{C.smeltEnabled.equip=false;smeltDrainEquip=false;return C.smeltEnabled.equip;},

    smelt25Start:()=>{C.smeltEnabled.equip=true;due.smelt=0;return C.smeltEnabled.equip;},

    start,stop,reset,check,status,config:C,teamStatus:()=>({...team,cloneId:C.tinhThanCloneId,enabled:C.enableTinhThan,members:Number(starRefs()?.model?.teamLength)||0}),lich,lichDay,lichData:()=>eventScheduleStatus(),lichEvents:()=>EVENT_SCHEDULE.map(x=>({...x})),tienTonTrace,tuVuotStatus,tuVuotReset,tuVuotStart,tuVuotStop,composeStatus,composePreview,tuyetHocStatus,tuLaStatus,dinhCaoStatus,vinhDu:()=>{const d=vinhData();const x={gioVN:new Date().toLocaleString('vi-VN',{timeZone:'Asia/Ho_Chi_Minh'}),trongGio:vinhWindow(),coChienDoi:d.hasTeam,serverMo:d.open,hetCho:d.ready,dangTrongTran:d.inside,soLanThu:vinhEnterAttempts,soLanDaVao:vinhConfirmed};console.table([x]);return x;}};

  window.KVPV_TD925=Object.freeze({installed:true,version:'9.2.5',config:td925Cfg,

    status:td925Status,history:()=>td925.history.slice(),

    diag:()=>({run:td925Status(),pending:job?.type==='tienduyen'?job.target:null}),

    

    enable:()=>{C.enableTienDuyen=true;return true;},

    disable:()=>{C.enableTienDuyen=false;return true;}});

  console.log('✅ KVPV Auto Daily V7.5.19 RED FIRST đã nạp. Gõ KVPV_DAILY.check(); rồi KVPV_DAILY.start()');

})();/* V10.5.1 — Stage manual pause guard, NO timers / scene RPC.
 * Mounted immediately after KVPV_DAILY public API, BEFORE addon auto-start.
 * Only explicit native daily tuVuotStop/Start or KVPV.daily.stop/start sets the lock.
 * Other modules may set config.enableTuVuot=true; the lock blocks those writes.
 */

(() => {

  'use strict';

  const W=window,NS=W.KVPV||(W.KVPV={}),D=W.KVPV_DAILY;

  if(!D?.config||typeof D.tuVuotStop!=='function'||typeof D.tuVuotStart!=='function'){

    console.warn('[STAGE GUARD] Auto Daily API unavailable');return;

  }

  if(NS.stageGuard?.installed)return;

  const actor=String(W.__KVPV_OWN_ACTOR_ID||'');

  const storageKey='kvpv.v1051.stage.paused.'+actor;

  let storage=null;

  try {storage=W.sessionStorage||null;} catch(_){window.KVPV_V1?.diagnostics?.record(_);}

  let locked=false,reason='',blockedWrites=0,changes=0;

  try {locked=storage?.getItem(storageKey)==='1';} catch(_){window.KVPV_V1?.diagnostics?.record(_);}

  if(locked)reason='Manual pause saved in this tab';

  const cfg=D.config;

  let enabled=cfg.enableTuVuot===true;

  const descriptor=Object.getOwnPropertyDescriptor(cfg,'enableTuVuot');

  if(descriptor?.configurable===false){

    console.warn('[STAGE GUARD] Config property is not configurable');return;

  }

  Object.defineProperty(cfg,'enableTuVuot',{

    configurable:true,enumerable:descriptor?.enumerable!==false,

    get(){return !locked&&enabled;},

    set(value){

      if(locked&&value===true){blockedWrites++;return;}

      enabled=value===true;

    }

  });

  function storePaused(v){try{if(v)storage?.setItem(storageKey,'1');else storage?.removeItem(storageKey);}catch(_){window.KVPV_V1?.diagnostics?.record(_);}}

  function pause(why='Manual stage stop'){

    locked=true;reason=String(why);enabled=false;changes++;

    storePaused(true);

    NS.core?.scene?.release?.('stage');

    return status();

  }

  function resume(why='Manual stage start'){

    locked=false;reason=String(why);changes++;

    storePaused(false);

    // Do NOT force enable here: native tuVuotStart controls actual state.

    return status();

  }

  

  function status(){return {version:'10.5.1',installed:true,locked,enabled:cfg.enableTuVuot===true,

    reason,blockedWrites,changes,persistsInTab:!!storage};}

  const nativeStop=D.tuVuotStop,nativeStart=D.tuVuotStart;

  D.tuVuotStop=function(...args){pause('KVPV_DAILY.tuVuotStop');return nativeStop.apply(this,args);};

  D.tuVuotStart=function(...args){if(W.KVPV_DESKTOP_CONTROL?.stageAllowed?.()===false){pause('Manager giữ dừng tự vượt');return nativeStop.apply(this,[]);}resume('KVPV_DAILY.tuVuotStart');return nativeStart.apply(this,args);};

  // tuVuotReset also reenables the native auto; it is an explicit manual command.

  if(typeof D.tuVuotReset==='function'){

    const reset=D.tuVuotReset;

    D.tuVuotReset=function(...args){if(W.KVPV_DESKTOP_CONTROL?.stageAllowed?.()===false){pause('Manager giữ dừng tự vượt');return nativeStop.apply(this,[]);}resume('KVPV_DAILY.tuVuotReset');return reset.apply(this,args);};

  }

  NS.stageGuard=Object.freeze({version:'10.5.1',installed:true,isLocked:()=>locked,

    status});

  console.info('[STAGE GUARD] loaded',locked?'manual stop preserved':'ready');

})();



/* V8.6.31: SOLO idle fallback + silent siege diagnosis; see changelog. */







(() => {

  try { window.KVPV_UPGRADES?.stop?.(); } catch(_){window.KVPV_V1?.diagnostics?.record(_);}

  for (const x of ['KVPV_CUONG_HOA','KVPV_KHAM_DA_HON','KVPV_DUC_HON','KVPV_TIEN_PHU']) {

    try { window[x]?.stop?.(); } catch(_){window.KVPV_V1?.diagnostics?.record(_);}

  }

  if (!window.KVPV_DAILY || typeof _Ba === 'undefined' || typeof _ft === 'undefined') {

    console.error('[NANG CAP] Phai nap Auto Daily trong game-frame truoc.'); return;

  }

  const D = window.KVPV_DAILY;

  const C = {

    enabled:true, checkMs:15000, ackTimeoutMs:25000, noAckBackoffMs:15*60000,

    noActivityNearEvents:true,

    cuongHoa:true, daHon:true, ducHon:true, tienPhu:true,

    

    backgroundDuringBattle:true,

    backgroundGapMs:12000,

    backgroundJobs:['exp','tienduyen','crystal','thanthu','bossnhom','manhoang','yeuvuong','tientuyen','lanhdia','tinhthan'],

    backgroundKinds:['tienVi','nhiemVuTienPhu','tienPhu','cuongHoa','daHon','ducHon','phongThuy','tuyetHoc','smelt','compose','moduleClaim','moduleWork'],

    tuyetHoc:true,

    daHonInsert:true, daHonReplace:true, daHonUpgrade:true,

    ducHonMaterialIndex:0, pillRandom:false, // avoid random resource selection overnight

    claimLinh:true, claimBao:true, claimFinishedPill:true, brewPill:false, // claim prepared rewards; do not brew at random

    maxRequestsPerHour:{cuongHoa:12,daHon:30,ducHon:12,tienPhu:24,tuyetHoc:12,smelt:8,compose:12}

  };

  const S = {pending:null,last:'Cho du lieu',nextAt:0,stop:false,cycle:0,

    hour:'', bgLastAt:0, used:{cuongHoa:0,daHon:0,ducHon:0,tienPhu:0,tuyetHoc:0,smelt:0,compose:0},

    sent:{cuongHoa:0,daHon:0,ducHon:0,tienPhu:0,tuyetHoc:0,smelt:0,compose:0},

    success:{cuongHoa:0,daHon:0,ducHon:0,tienPhu:0,tuyetHoc:0,smelt:0,compose:0},

    errors:{cuongHoa:0,daHon:0,ducHon:0,tienPhu:0,tuyetHoc:0,smelt:0,compose:0},

    blocked:{},lastRecipe:-1,lastClaim:{0:0,1:0},lastRefresh:0};

  

  for(const k of ['moduleClaim','moduleWork']){

    S.used[k]=0;S.sent[k]=0;S.success[k]=0;S.errors[k]=0;

    C.maxRequestsPerHour[k]=30;

  }

  const now=()=>Date.now();

  const common=()=>_Ba?._$a?.SceneUtil?.isCommonScene===true;

  const bag=()=>_Ba?._Ic?._aQ?.ins;

  const count=(item)=>Number(bag()?.getItemCountById?.(Number(item)) || 0);

  const safeNum=(v,d=0)=>Number.isFinite(Number(v))?Number(v):d;

  const same=(a,b)=>a!==null && b!==null && a!==b;

  function vnMinute(){

    const p=Object.fromEntries(Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Ho_Chi_Minh',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(new Date()).map(x=>[x.type,x.value]));

    return Number(p.hour)*60+Number(p.minute);

  }

  function isBackgroundBattle(st){

    return C.backgroundDuringBattle && st?.running &&

      st.job!=='rảnh' && st.step==='fighting' &&

      C.backgroundJobs.includes(st.job) && !common();

  }

  function canWork(){

    const st=D.quickState?.();

    if(!C.enabled || !st?.running)return false;

    

    

    if(st.job!=='rảnh')return isBackgroundBattle(st);

    if(!common() || _Ba?._cm?._q3t?.ins?.getHasTeams?.() ||

      _Ba?._$a?._yo?.ins?.isInMission)return false;

    if(C.noActivityNearEvents){

      const t=vnMinute();

      if((t>=680&&t<780)||(t>=1130&&t<1300))return false;

    }

    return true;

  }

  function limit(k){

    const hour=new Date().toLocaleString('sv-SE',{timeZone:'Asia/Ho_Chi_Minh'}).slice(0,13);

    if(S.hour!==hour){S.hour=hour;Object.keys(S.used).forEach(k=>S.used[k]=0);}

    return S.used[k] < C.maxRequestsPerHour[k] && now()>=(S.blocked[k]||0);

  }

  function cuongData(){

    const m=_Ba?._Agt?._Rgt?.ins, lv=m?.partLev;

    if(!lv?.keys?.length || typeof _Ba?._Agt?._qgt?.ins?.oneKeyUp!=='function')return null;

    let sig;

    try{sig=lv.keys.map(p=>`${p}:${lv.get(p)}`).join('|');}catch(_){return null;}

    return {red:!!_Ba?._Xo?._Ko?.instance?.getRpKeyState?.(15),

      can:m?.isCanUpEquip===true,sig};

  }

  function cuongTask(){

    if(!C.cuongHoa || !limit('cuongHoa'))return null;

    const d=cuongData(); if(!d?.red||!d.can)return null;

    

    return {k:'cuongHoa',what:'Cuong hoa nhanh',before:d.sig,

      probe:()=>cuongData()?.sig??null,

      run:()=>_Ba._Agt._qgt.ins.oneKeyUp()};

  }

  

  

  D.config.enableTuyetHoc=false;

  function tuyetHocTask(){

    if(!C.tuyetHoc || !limit('tuyetHoc'))return null;

    const m=_Ba?._Jtt?._ant?.ins, arr=m?.spcialSkills;

    const api=_Ba?._Jtt?._unt?.ins, max=Number(m?.maxlv);

    if(!Array.isArray(arr)||!arr.length||!Number.isFinite(max)||max<=0||

       typeof m?.checkLvUp!=='function'||typeof api?.addSkillLevelOfAll!=='function')return null;

    if(_Ba?._Xo?._Ko?.instance?.getRpKeyState?.(19)!==true)return null;

    const can=arr.some((a,i)=>Number(a?.[1])<max && m.checkLvUp(i)===true);

    if(!can)return null;

    const probe=()=>JSON.stringify(_Ba?._Jtt?._ant?.ins?.spcialSkills?.map(x=>[x?.[0],x?.[1]])??null);

    return {k:'tuyetHoc',what:'Tang nhanh Tuyet Hoc (nen)',

      before:probe(),probe,run:()=>api.addSkillLevelOfAll()};

  }

  function stoneSignature(){

    const slots=_Ba?._ZE?._Qgt?.ins?.getValueByPos?.();

    if(!slots?.keys)return null;

    try{return slots.keys.map(p=>`${p}:${JSON.stringify(slots.get(p))}`).sort().join('|');}catch(_){return null;}

  }

  function daHonChoices(){

    const m=_Ba?._ZE?._Qgt?.ins, g=_ft?._Qyn?.ins;

    const slots=m?.getValueByPos?.(), positions=_Ba?._rJ?._O$?.ins?.equipsDic?.keys;

    const source=bag()?.getItemsByBagType?.(2);

    if(!slots || !Array.isArray(positions) || !Array.isArray(source) || typeof g?.getCfgById!=='function')return [];

    const stones=source.map(it=>{

      const id=Number(it?.[0]), cfg=g.getCfgById(id);

      return cfg?{type:Number(cfg[3]),lv:Number(cfg[5]),id}:null;

    }).filter(Boolean);

    const out=[];

    for(const raw of positions){

      const part=Number(raw);if(!Number.isInteger(part)||part<1||part>10)continue;

      let action=-1,total=0;

      for(let slot=0;slot<5;slot++){

        const id=slots.get(part*10+slot),cfg=id==null?null:g.getCfgById(id);

        if(cfg)total+=safeNum(cfg[5]);

        if(action!==-1)continue;

        if(id==null){

          if(C.daHonInsert && (slot!==0||m.vipIsOpen) &&

            stones.some(s=>slot===0||s.type===slot))action=0;

        }else if(cfg){

          const lv=Number(cfg[5]),type=Number(cfg[3]);

          if(C.daHonReplace&&stones.some(s=>s.type===type&&s.lv>lv))action=1;

          else if(C.daHonUpgrade&& lv<Number(g.stoneMaxLv) &&

            Number(cfg[6])>1 && count(id)+1>=Number(cfg[6]))action=2;

        }

      }

      if(action>=0)out.push({part,action,total});

    }

    return out.sort((a,b)=>a.total-b.total||a.part-b.part);

  }

  function daHonTask(){

    if(!C.daHon||!limit('daHon'))return null;

    if(!_Ba?._Xo?._Ko?.instance?.getRpKeyState?.(16))return null;

    const r=daHonChoices()[0], before=stoneSignature();

    if(!r||before==null||typeof _Ba?._ZE?._Jgt?.ins?.oneKeyHandler!=='function')return null;

    return {k:'daHon',what:`Da Hon vi tri ${r.part} thao tac ${r.action}`,

      before,probe:stoneSignature,run:()=>_Ba._ZE._Jgt.ins.oneKeyHandler([r.part,r.action])};

  }

  function ducData(){

    const m=_Ba?._eW?._pEt?.inst,rows=m?.zhList;

    if(!Array.isArray(rows)||!rows.length|| !Array.isArray(m?._csptMtlItem)||

      typeof m?.getCanUpZH!=='function')return null;

    const material=Number(m._csptMtlItem[C.ducHonMaterialIndex]?.[0]);

    const sig=rows.map((x,i)=>x?`${i}:${x[1]}:${x[2]}`:'').join('|');

    let can=false;

    try{

      const parts=_Ba?._rJ?._O$?.ins?.equipsDic?.keys;

      if(Array.isArray(parts))can=parts.some(p=>{

        const pos=Number(p);return pos>=1&&pos<=10&&m.getCanUpZH(pos)===true;

      });

    }catch(_){can=false;}

    return {material,have:count(material),can,

      red:!!_Ba?._Xo?._Ko?.instance?.getRpKeyState?.(156),sig};

  }

  function ducTask(){

    if(!C.ducHon||!limit('ducHon'))return null;

    const d=ducData();

    if(!d?.red||!d.can||!Number.isSafeInteger(d.material)||d.material<=0||d.have<=0||

       typeof _Ba?._eW?._dEt?.inst?.ZhOperOneKey!=='function')return null;

    return {k:'ducHon',what:`Duc Hon nhanh; vat lieu ${d.material}`,

      before:d.sig,probe:()=>ducData()?.sig??null,

      run:()=>_Ba._eW._dEt.inst.ZhOperOneKey(d.material)};

  }

  const h=()=>_Ba?._Q9?._ttt?.ins;

  const r=()=>_Ba?._Q9?._$dt?.ins;

  const build=id=>h()?.getBuildData?.(id);

  const energy=()=>Number(h()?.typeInfos?.(0));

  function refreshHome(){

    if(now()-S.lastRefresh<45000)return;

    S.lastRefresh=now();

    [0,1,2].forEach(id=>{try{r()?.getBuildingInfo?.([id]);}catch(_){window.KVPV_V1?.diagnostics?.record(_);}});

    try{r()?.GetXianFuInfo?.();}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

  }

  function homeSig(id){

    const b=build(id);if(!Array.isArray(b))return null;

    return `${b[1]}:${b[2]}:${b[3]}:${JSON.stringify(b[8]??null)}:${h()?.typeInfos?.(id)}`;

  }

  function recipes(){

    const b=build(2),g=_ft?._Jdt?.ins;

    if(!b||Number(b[3])!==0)return [];

    const e=energy(),lvl=Number(b[1]);

    const rows=g?.getCfgByIdAndLv?.(2,lvl)?.[5];

    const max=Number(h()?.getSmeltMaxNum?.());

    if(!Array.isArray(rows)||!Number.isFinite(e)||e<=0||!Number.isSafeInteger(max)||max<1)return [];

    const reduce=Math.min(99,Math.max(0,safeNum(h()?.smeltConsumeReduceValue)));

    return rows.flatMap((item,index)=>{

      const id=Number(item?.[0]),base=Number(item?.[3]);

      const unit=base*(1-reduce/100);

      if(!Number.isSafeInteger(id)||id<=0||!Number.isFinite(unit)||unit<=0)return [];

      

      const qty=Math.min(max,Math.floor(e/unit));

      if(qty<1)return [];

      return [{index,id,qty,cost:Math.floor(qty*unit),remain:e-Math.floor(qty*unit)}];

    }).sort((a,b)=>a.remain-b.remain);

  }

  function tienPhuTask(){

    if(window.KVPV_RED_DOT_MODULE?.ownsProgression?.())return null;

    if(!C.tienPhu||!limit('tienPhu')||typeof r()?.getBuildProduceAward!=='function')return null;

    if(![0,1,2].every(id=>Array.isArray(build(id)))){refreshHome();return null;}

    

    const pick=[

      {id:0,on:C.claimLinh}, {id:1,on:C.claimBao},

      {id:2,on:C.claimFinishedPill}

    ].find(x=>x.on&&{

      0:()=>Number(build(0)?.[3])===3||(Number(build(0)?.[3])===2&&safeNum(build(0)?.[2])>=60000 &&now()-S.lastClaim[0]>=20*60000),

      1:()=>Number(build(1)?.[3])===3||(Number(build(1)?.[3])===2&&safeNum(build(1)?.[2])>=60000 &&now()-S.lastClaim[1]>=20*60000),

      2:()=>Number(build(2)?.[3])===2

    }[x.id]());

    if(pick){

      const id=pick.id;

      return {k:'tienPhu',what:`Nhan cong trinh Tien Phu ${id}`,

        before:homeSig(id),probe:()=>homeSig(id),

        run:()=>{r().getBuildProduceAward([id]);if(id<2)S.lastClaim[id]=now();},

        done:()=>{refreshHome();}};

    }

    if(!C.brewPill||Number(build(2)?.[3])!==0||typeof r()?.makeItem!=='function')return null;

    let possible=recipes();if(!possible.length)return null;

    const best=possible[0].remain;

    possible=possible.filter(x=>x.remain<=best+Math.max(1,energy()*0.02));

    let alternatives=possible.filter(x=>x.index!==S.lastRecipe);

    if(alternatives.length)possible=alternatives;

    const chosen=C.pillRandom?possible[Math.floor(Math.random()*possible.length)]:possible[0];

    if(!chosen)return null;

    return {k:'tienPhu',what:`Luyen linh don ${chosen.id} x${chosen.qty}`,

      before:homeSig(2),probe:()=>homeSig(2),

      run:()=>{r().makeItem([2,[[chosen.index,chosen.qty]]]);S.lastRecipe=chosen.index;},

      done:()=>refreshHome()};

  }

  

  

  C.tienVi = true;

  C.tienViDaily = true;

  C.maxRequestsPerHour.tienVi = 12;

  for (const k of ['used','sent','success','errors']) S[k].tienVi = 0;



  const tvModel=()=>_Ba?._G_n?._U_n?.ins;

  const tvRpc=()=>_Ba?._G_n?.__Yn?.ins;

  function tienViTask(){

    if(!C.tienVi || !limit('tienVi'))return null;

    const m=tvModel(), api=tvRpc();

    if(!m || !api || !Array.isArray(m.tasks))return null;



    

    const ready=m.tasks.find(row=>Array.isArray(row) &&

      Number.isSafeInteger(Number(row[0])) && Number(row[0])>0 &&

      Number(row[1])===1);

    if(ready && typeof api.getTaskAward==='function'){

      const id=Number(ready[0]);

      const state=()=>{

        const row=tvModel()?.tasks?.find(x=>Number(x?.[0])===id);

        return row ? String(row[1]) : 'da-xoa';

      };

      return {k:'tienVi',what:`Nhan nhiem vu Tien Vi #${id}`,

        before:state(),probe:state,

        run:()=>api.getTaskAward(id)};

    }



    // Thuong moc Tien Vi chi khi server danh dau san sang (status=1).

    

    if(C.tienViDaily && typeof api.getDailyAward==='function' &&

       Array.isArray(m._yei)){

      const award=m._yei.find(x=>Array.isArray(x) &&

        Number(x[1])===1 && Number.isSafeInteger(Number(x[0])) &&

        Number(x[0])>=0 && Number(x[0])<=Number(m.poslv));

      if(award){

        const lv=Number(award[0]);

        const state=()=>{

          const row=tvModel()?._yei?.find(x=>Number(x?.[0])===lv);

          return row ? String(row[1]) : 'da-xoa';

        };

        return {k:'tienVi',what:`Nhan thuong moc Tien Vi ${lv}`,

          before:state(),probe:state,

          run:()=>api.getDailyAward(lv)};

      }

    }

    return null;

  }

  








  C.autoTienViNhiemVu = true;

  C.autoNhanNhiemVuTienPhu = true;

  C.autoPhongThuyTienPhu = true;

  C.phongThuyMaxPerHour = 4;

  C.phongThuyProtectItems = [];

  C.phongThuyKeepByItem = {};

  C.maxRequestsPerHour.nhiemVuTienPhu = 15;

  C.maxRequestsPerHour.phongThuy = 4;

  for(const k of ['used','sent','success','errors']) {

    S[k].nhiemVuTienPhu=0;

    S[k].phongThuy=0;

  }

  let lastHomeQuestFetch=0;

  const nfd=v=>String(v??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();

  const tvCfg=id=>{try{return _ft?._mei?.ins?.getXianweiTaskDataById?.(id)??null;}catch(_){return null;}};

  const homeQuests=()=>_Ba?._Q9?._ttt?.ins?.taskList;

  const homeQuestRpc=()=>_Ba?._Q9?._$dt?.ins;

  const fengHome=()=>_Ba?._Q9?._ttt?.ins;

  const fengCfg=()=>_ft?._qZ?.ins;

  function tvUnfinished(){

    const x=tvModel()?.tasks;

    if(!Array.isArray(x))return [];

    return x.filter(r=>Array.isArray(r)&&Number(r[1])===0).map(r=>{

      const cfg=tvCfg(Number(r[0]));

      const target=Number(cfg?.[12]);

      return {id:Number(r[0]),name:String(cfg?.[3]??'Chua co ten'),

        current:Number(r[2])||0,target:Number.isFinite(target)&&target>0?target:null,

        actionId:Number(cfg?.[11]?.[0]),row:r};

    });

  }

  function tvPlan(){

    const rows=tvUnfinished().map(q=>{

      const n=nfd(q.name);

      let support='Chua co module tu lam', method='Chua xac minh';

      if(n.includes('phong thuy')&&n.includes('tien phu')){

        support='Tu nang neu du vat lieu';method='Phong Thuy Tien Phu';

      }else if(n.includes('nhiem vu')&&n.includes('tien phu')){

        support='Tu nhan nhiem vu da hoan thanh';method='Nhiem vu Tien Phu';

      }else if(n.includes('tuyet hoc')){

        support='Auto Tang nhanh Tuyet Hoc hien co';method='Tuyet Hoc';

      }else if(n.includes('cuong hoa')){

        support='Auto Cuong Hoa nhanh hien co';method='Cuong Hoa';

      }else if(n.includes('linh don')||n.includes('luyen don')){

        support='Auto Lo Luyen Don hien co';method='Luyen Don';

      }else if(n.includes('da hon')){

        support='Auto Kham/Thay/Tang Da Hon hien co';method='Da Hon';

      }

      return {ID:q.id,NhiemVu:q.name,TienDo:q.current,MucTieu:q.target,

        ConLai:q.target===null?null:Math.max(0,q.target-q.current),Auto:support,Nhom:method,

        MaChucNang:q.actionId};

    });

    return rows.sort((a,b)=>{

      const pa=a.MucTieu? a.ConLai/a.MucTieu:999;

      const pb=b.MucTieu? b.ConLai/b.MucTieu:999;

      return pa-pb;

    });

  }

  function refreshHomeQuest(){

    if(now()-lastHomeQuestFetch<10*60000)return;

    const api=homeQuestRpc();

    if(typeof api?.getXianfuTaskList==='function'){

      lastHomeQuestFetch=now();

      api.getXianfuTaskList();

    }

  }

  function tienPhuQuestTask(){

    if(!C.autoTienViNhiemVu||!C.autoNhanNhiemVuTienPhu||!limit('nhiemVuTienPhu'))return null;

    const rows=homeQuests();

    if(!Array.isArray(rows)){refreshHomeQuest();return null;}

    const api=homeQuestRpc(),g=_ft?._ubt?.ins;

    if(typeof api?.getXianFuTaskAward!=='function'||typeof g?.getCfgById!=='function')return null;

    const row=rows.find(x=>{

      if(!Array.isArray(x)||Number(x[2])!==1)return false;

      const conf=g.getCfgById(Number(x[0]));

      

      const type=Number(conf?.[6]);

      if(type===1)return true;

      if(type===2)return fengHome()?.CheckEventIsOpen?.(conf?.[3]?.[0])===true;

      return false;

    });

    if(!row)return null;

    const id=Number(row[0]);

    const state=()=>{

      const x=homeQuests()?.find(y=>Number(y?.[0])===id);

      return x ? JSON.stringify(x) : 'da-xoa';

    };

    return {k:'nhiemVuTienPhu',what:`Nhan nhiem vu Tien Phu #${id}`,

      before:state(),probe:state,

      run:()=>api.getXianFuTaskAward([id]),

      done:()=>{lastHomeQuestFetch=0;refreshHomeQuest();}};

  }

  function phongThuyCandidates(){

    const active=tvUnfinished().filter(x=>{

      const n=nfd(x.name);

      return n.includes('phong thuy')&&n.includes('tien phu')&&

        (x.target===null||x.current<x.target);

    });

    if(!active.length)return [];

    const m=fengHome(),cfg=fengCfg(),li=m?.fsList;

    if(!Array.isArray(li)||typeof cfg?.getCfgById!=='function'||typeof cfg?.items!=='function')return [];

    const out=[];

    for(const v of li){

      const current=Number(v);

      if(!Number.isSafeInteger(current)||current<=0)continue;

      const c=cfg.getCfgById(current),next=cfg.getCfgById(current+1);

      if(!c||!next)continue;

      const item=cfg.items(c,current);

      const itemId=Number(item?.[0]),need=Number(item?.[1]);

      if(!Number.isSafeInteger(itemId)||itemId<=0||!Number.isSafeInteger(need)||need<=0)continue;

      if(C.phongThuyProtectItems.map(Number).includes(itemId))continue;

      const have=count(itemId),reserve=Math.max(0,Number(C.phongThuyKeepByItem[itemId])||0);

      if(have-reserve<need)continue;

      out.push({current,itemId,need,have,remain:have-need});

    }

    

    return out.sort((a,b)=>a.need-b.need||a.current-b.current);

  }

  function phongThuyTask(){

    if(!C.autoTienViNhiemVu||!C.autoPhongThuyTienPhu||!limit('phongThuy'))return null;

    const choice=phongThuyCandidates()[0];

    const api=homeQuestRpc(),m=fengHome();

    if(!choice||typeof api?.upgradeFengShuiDecorate!=='function'||!Array.isArray(m?.fsList))return null;

    const sig=()=>{

      const arr=fengHome()?.fsList;

      return Array.isArray(arr)?arr.join('|'):null;

    };

    return {k:'phongThuy',what:`Nang Phong Thuy ${choice.current} (${choice.need}x ${choice.itemId})`,

      before:sig(),probe:sig,

      run:()=>api.upgradeFengShuiDecorate([choice.current])};

  }

  

  const tienPhuClaim=()=>{

    const p=tienPhuTask();

    return p?.what?.startsWith('Nhan cong trinh')?p:null;

  };

  const tienPhuBrew=()=>{

    const p=tienPhuTask();

    return p?.what?.startsWith('Luyen linh don')?p:null;

  };
  function backgroundSmeltTask(){
    if(!C.backgroundDuringBattle||!isBackgroundBattle(D.quickState())||!limit('smelt')||job?.type==='smelt')return null;
    if(!watchSmeltAcks())return null;
    const data=smeltData(),cursor={target:{skipped:{},batchesByTab:{}}},pick=smeltCandidate(data,cursor);
    if(!pick)return null;
    const ids=[...new Set(smeltEligible(data,pick.key).slice(0,pick.batchSize).map(x=>x[2]))];
    if(!ids.length)return null;
    const before=smeltAck[pick.key];
    return {k:'smelt',what:`Dung luyen nen ${pick.key} (${ids.length})`,before:String(before),
      probe:()=>String(smeltAck[pick.key]),run:()=>{
        if(!isBackgroundBattle(D.quickState())||!smeltRequest(pick.key,ids))throw Error('Smelt lane no longer safe or RPC unavailable');
      },done:()=>{if(smeltAck[pick.key]===before)throw Error('Smelt ACK did not advance');},
      failed:()=>{smeltBackoff[pick.key]=now()+C.noAckBackoffMs;}};
  }
  function backgroundComposeTask(){
    if(window.KVPV_RED_DOT_MODULE?.ownsProgression?.())return null;
    if(!C.backgroundDuringBattle||!isBackgroundBattle(D.quickState())||!limit('compose')||job?.type==='compose')return null;
    if(!watchComposeAcks()||[76,108,528,1688].some(id=>_ft?._Y4n?.ins?.isOpened?.(id)))return null;
    const recipe=composeCandidates()[0];if(!recipe||typeof _v?.ins?.send!=='function')return null;
    const before=composeState.ack;
    return {k:'compose',what:`Ghep nen ${recipe.kind===1?'da hon':'dao cu'} recipe ${recipe.id} x${recipe.qty}`,
      before:String(before),probe:()=>String(composeState.ack),run:()=>{
        if(!isBackgroundBattle(D.quickState()))throw Error('Compose lane no longer safe');
        composeState.lastRecipe=recipe.id;composeState.lastResult=null;
        _v.ins.send('TdKp',[recipe.id,recipe.uidList,recipe.qty,0]);
      },done:()=>{
        if(composeState.lastResult===0){composeState.success[recipe.kind===1?'stone':'props']+=recipe.qty;return;}
        composeState.fail++;composeState.blockedRecipes.set(recipe.id,now()+C.composeFailedRecipeBackoffMs);
        composeState.lastReason='Server trả mã lỗi '+String(composeState.lastResult);
      },failed:()=>{composeState.blockedRecipes.set(recipe.id,now()+C.composeFailedRecipeBackoffMs);}};
  }

  

  const providers=[tienViTask,tienPhuQuestTask,tienPhuClaim,

    ()=>window.KVPV_V8?.provide?.('claim')||null,

    tuyetHocTask,cuongTask,daHonTask,ducTask,phongThuyTask,tienPhuBrew,
    backgroundSmeltTask,backgroundComposeTask,

    ()=>window.KVPV_V8?.provide?.('work')||null];

  C.redFirst = true;



  function hasReadyClaims(){

    if(!C.enabled || S.stop || !canWork())return false;

    if(S.pending && /^(tienVi|nhiemVuTienPhu)$/.test(S.pending.k))return true;

    if(S.pending?.k==='tienPhu' && S.pending.what?.startsWith('Nhan cong trinh'))return true;

    try{

      if(tienViTask() || tienPhuQuestTask())return true;

      return !!tienPhuClaim() || !!window.KVPV_V8?.hasClaim?.();

    }catch(e){console.warn('[DAU DO] Loi kiem tra claim:',e);return false;}

  }



  function redCheck(){

    const rp=_Ba?._Xo?._Ko?.instance;

    const active=Object.keys(rp?._Uu||{}).filter(k=>

      /^\d+$/.test(k) && rp.getRpKeyState(Number(k))===true

    ).map(Number).sort((a,b)=>a-b);

    const names={15:'Cuong hoa',16:'Da Hon',19:'Tuyet Hoc',36:'Boss nhom',

      44:'Man Hoang',53:'Pho ban EXP',156:'Duc Hon',377:'Tien Duyen',

      561:'Than Thu',627:'Thu Ho Thuy Tinh',

    977:'Nhiem Vu Ngay',978:'Nhiem Vu Gioi Han',979:'Thuong Moc Diem Nhiem Vu'};

    const tv=(tvModel()?.tasks||[]).filter(x=>Number(x?.[1])===1).length;

    const tq=(homeQuests()||[]).filter(x=>Number(x?.[2])===1).length;

    const daily=(tvModel()?._yei||[]).filter(x=>Number(x?.[1])===1).length;

    const b=[0,1,2].filter(id=>{

      const st=Number(build(id)?.[3]);

      return id===2?st===2:st===3;

    });

    const rows=active.map(id=>({ID:id,ChucNang:names[id]||'Can xac minh',

      PhanLoai:[15,16,19,156].includes(id)?'Nang cap':

        [36,44,53,377,561,627].includes(id)?'Hoat dong':'Chua phan loai'}));

    const ready={tienVi:tv,mocTienVi:daily,nhiemVuTienPhu:tq,

      congTrinhChoNhan:b,conBaoNhieuDauDo:active.length};

    console.table(rows);

    console.log('[DAU DO] Thuong cho nhan:',ready);

    return {active,rows,ready};

  }



  

  function tick(){

    if(S.stop||!C.enabled)return;

    const t=now();

    if(S.pending){

      const p=S.pending;

      let updated=false;

      try{updated=same(p.before,p.probe());}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

      if(updated){

        S.success[p.k]++;S.last=`OK ${p.what}`;S.pending=null;S.nextAt=t+C.checkMs;

        try{p.done?.();}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

        console.log('[KVPV NANG CAP]',S.last);

      }else if(t-p.at>C.ackTimeoutMs){

        S.errors[p.k]++;S.pending=null;S.blocked[p.k]=t+C.noAckBackoffMs;

        try{p.failed?.('no-ack');}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

        S.last=`Khong xac nhan ${p.what}; hoan 15 phut`;

        console.warn('[KVPV NANG CAP]',S.last);

      }

      return;

    }

    if(t<S.nextAt||!canWork())return;

    const fg=D.quickState?.();

    const background=fg?.job!=='rảnh';

    if(background && t-S.bgLastAt<C.backgroundGapMs)return;

    S.nextAt=t+C.checkMs;

    for(let i=0;i<providers.length;i++){

      const index=(C.redFirst ? i : (S.cycle+i)%providers.length);

      let p=null;

      try{p=providers[index]();}catch(e){console.warn('[NANG CAP] Kiem tra:',e);continue;}

      if(!p)continue;

      if(background && !C.backgroundKinds.includes(p.k))continue;

      try{

        S.pending={...p,at:t};

        p.run();

        S.sent[p.k]++;S.used[p.k]++;

        if(background)S.bgLastAt=t;

        S.cycle=(index+1)%providers.length;

        S.last=`Da gui ${p.what}`;

        console.log('[KVPV NANG CAP]',S.last);

      }catch(e){

        S.pending=null;S.errors[p.k]++;S.blocked[p.k]=t+C.noAckBackoffMs;

        try{p.failed?.('exception');}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

        console.warn('[NANG CAP] Khong gui duoc:',e);

      }

      break;

    }

  }

  const timer=__KVPV29.every(()=>{try{tick();}catch(e){console.warn('[KVPV NANG CAP]',e);}},2000);

  window.KVPV_UPGRADES={config:C,hasReadyClaims,redCheck,

    status(){const st=D.quickState?.()||{},v={lanes:{combat:{job:st.job||'rảnh',step:st.step||'-'},
      background:{active:isBackgroundBattle(st),intervalMs:C.backgroundGapMs,
        pending:S.pending?.what||'-',allowed:[...C.backgroundKinds]}},
      dangCho:S.pending?.what||'-',trangThai:S.last,daGui:{...S.sent},thanhCong:{...S.success},loi:{...S.errors}};console.log(v);return v;},

    busy:()=>!!S.pending, 

    preview(){const x={daHon:daHonChoices(),linhDon:recipes(),cuongHoa:cuongData(),ducHon:ducData(),linhKhi:energy()};console.log(x);return x;},

    tienViPlan(){const x=tvPlan();console.table(x);return x;},

    tienPhuNhiemVu(){const x=(homeQuests()||[]).map(r=>({ID:r?.[0],TienDo:r?.[1],TrangThai:r?.[2]}));console.table(x);return x;},

    phongThuyCanNang(){const x=phongThuyCandidates();console.table(x);return x;},

    stop(){S.stop=true;__KVPV29.cancel(timer);},run:tick};

  window.KVPV_TIENVI_AUTO={config:C,

    plan:()=>window.KVPV_UPGRADES.tienViPlan(),

    homeTasks:()=>window.KVPV_UPGRADES.tienPhuNhiemVu(),

    fengShui:()=>window.KVPV_UPGRADES.phongThuyCanNang(),

    status:()=>window.KVPV_UPGRADES.status(),

    stop(){C.autoTienViNhiemVu=false;}};

  D.redCheck = redCheck;

  

  const alias=(key,preview)=>({config:C,status:()=>window.KVPV_UPGRADES.status(),preview:preview||(()=>window.KVPV_UPGRADES.preview()),stop:()=>{C[key]=false;}});

  window.KVPV_CUONG_HOA=alias('cuongHoa');

  window.KVPV_KHAM_DA_HON=alias('daHon',daHonChoices);

  window.KVPV_DUC_HON=alias('ducHon',ducData);

  window.KVPV_TIEN_PHU=alias('tienPhu',()=>({linhKhi:energy(),lo:build(2),congThuc:recipes()}));

  refreshHome();

  console.log('✅ KVPV V7.5.19: Red First + Nang Cap + Tien Phu + Tien Vi da nap (mot hang doi, khong gui dong thoi).');

})();



/* V8.6.22 SOLO: disabled legacy 4-account EXP process; no clone timer. */










(() => {

  try{window.KVPV_V8?.stop?.();}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

  const D=window.KVPV_DAILY,U=window.KVPV_UPGRADES;

  if(!D?.quickState||!U?.busy||typeof _Ba==='undefined'){

    console.error('[V8] Phai nap dung file V8 FULL trong game-frame.');return;

  }

  const CFG={

    enabled:true, scanMs:30000, notifyUnknown:true, unknownNoticeMs:1800000,

    allowPremium:false, allowUnknown:false, allowUnverified:false,

    autoExecuteVerified:true, maxActionWaitMs:30000,

    quietBeforeImportantEventsMin:3,

    stuckWatchMinutes:25, 

    backgroundDuringPVE:true

  };

  const KNOWN_RED={15:'Cuong Hoa',16:'Da Hon',19:'Tuyet Hoc',36:'Boss Nhom',

    44:'Man Hoang',53:'Pho ban EXP',156:'Duc Hon',377:'Tien Duyen',

    561:'Than Thu',627:'Thu Ho Thuy Tinh',

    977:'Nhiem Vu Ngay',978:'Nhiem Vu Gioi Han',979:'Thuong Moc Diem Nhiem Vu'};

  

  const BUILT_IN=[

    ['hongHoang','Hong Hoang Bi Bao','event','enableHongHoang'],

    ['daoTri','Dao Nguyen Dao Tri / bat ca','event','enableDaoTri'],

    ['tienTuyen','Boss Tien Tuyen','event',null],

    ['lanhDia','Boss Lanh Dia','event',null],

    ['vinhDu','Chien Truong Vinh Du','event','enableVinhDu'],

    ['tuLa','Tu La Loi Dai','event','enableTuLa'],

    ['dinhCao','Tranh Ba Dinh Cao / nhan ruong tang 9','event','enableDinhCao'],

    ['tienTon','Tien Ton Dau Ky (moi theo doi)','trace','enableTienTonTrace'],

    ['thanThu','Vo Han Than Thu 3/3','combat',null],

    ['bossNhom','Boss Nhom','combat',null],

    ['manHoang','Man Hoang','combat',null],

    ['yeuVuong','Yeu Vuong','combat','enableYeuVuong'],

    ['crystal','Thu Ho Thuy Tinh','dungeon','enableCrystal'],

    ['tienDuyen','Tien Duyen','dungeon','enableTienDuyen'],

    ['exp4','EXP to doi 4 tai khoan (tam tat)','dungeon','enableExp'],

    ['tinhThan','Tinh Than (main + clone1 + Tam Gioi)','dungeon','enableTinhThan'],

    ['tuVuot','Tu Vuot khong gioi han','train','enableTuVuot'],

    ['dungLuyen','Dung Luyen 3 nhom','resource',null],

    ['ghepDaDaoCu','Ghep Da Hon va Dao Cu','resource','enableCompose'],

    ['tuyetHoc','Tang Nhanh Tuyet Hoc','upgrade','tuyetHoc'],

    ['cuongHoa','Cuong Hoa Nhanh','upgrade','cuongHoa'],

    ['daHon','Kham / thay / tang cap Da Hon','upgrade','daHon'],

    ['ducHon','Duc Hon Nhanh','upgrade','ducHon'],

    ['tienPhu','Tu Linh/ Tu Bao/ Lo Luyen Don','claim','tienPhu'],

    ['tienVi','Nhan Nhiem Vu / thuong Tien Vi','claim','tienVi'],

    ['tienPhuQuest','Nhan Nhiem Vu Tien Phu','claim','autoNhanNhiemVuTienPhu'],

    ['phongThuy','Nang Phong Thuy Tien Phu','upgrade','autoPhongThuyTienPhu']

  ];

  const plugins=new Map(), counts={scans:0,unknown:0,success:0,fail:0};

  const alerted=new Map();

  const traces=[];

  let timer=null,lastJob='',lastStep='',lastJobAt=Date.now(),lastScan=null;

  const now=()=>Date.now();

  const num=v=>Number.isSafeInteger(Number(v))?Number(v):null;

  const conf=()=>D.config;

  const bg=()=>U.config;

  const context=()=>D.quickState()||{};

  const vnDate=()=>W.KVPV_DAILY_CLOCK?.key?.()??new Date(Date.now()+2*3600000).toISOString().slice(0,10);

  const getRP=()=>_Ba?._Xo?._Ko?.instance;

  function rpState(id){try{return getRP()?.getRpKeyState?.(id)===true;}catch(_){return false;}}

  function redIds(){

    const rp=getRP(),u=rp?._Uu;

    let keys=[];

    if(u instanceof Map)keys=Array.from(u.keys());

    else if(u&&typeof u==='object')keys=Object.keys(u);

    const ret=[];

    for(const key of keys){const id=num(key);if(id!==null&&id>=0&&rpState(id))ret.push(id);}

    return [...new Set(ret)].sort((a,b)=>a-b);

  }

  function scheduled(){

    try{return (D.lichEvents?.()||[]).map(x=>({

      name:x.name,mode:x.action==='auto'?'auto':x.action==='trace'?'trace':'schedule-only',

      days:x.days||'daily', slots:[...(x.slots||[]),...(x.instants||[])]

    }));}catch(_){return [];}

  }

  function featureEnabled(row){

    const [id,name,type,flag]=row;

    if(type==='trace')return 'chi ghi thao tac';

    if(!flag)return 'module san co';

    if(Object.prototype.hasOwnProperty.call(conf(),flag))return conf()[flag]?'bat':'tat';

    if(Object.prototype.hasOwnProperty.call(bg(),flag))return bg()[flag]?'bat':'tat';

    return 'kiem tra';

  }

  

  function report(){

    const live=context(),ids=redIds();

    const known=new Set([...Object.keys(KNOWN_RED).map(Number),

      ...[...plugins.values()].flatMap(p=>p.redIds)]);

    const unknown=ids.filter(id=>!known.has(id));

    const ev=scheduled(),autoEvent=ev.filter(x=>x.mode==='auto');

    return {at:new Date().toISOString(),actorId:String(_Ba?._rJ?._O$?.ins?.actorId??''),

      context:live,red:ids,unmappedRed:unknown,

      readyClaims:U.hasReadyClaims?.()??false,

      upgradesBusy:U.busy(),

      features:BUILT_IN.map(x=>({id:x[0],name:x[1],type:x[2],state:featureEnabled(x)})),

      events:{total:ev.length,auto:autoEvent.length,trace:ev.filter(x=>x.mode==='trace').length,

        scheduleOnly:ev.filter(x=>x.mode==='schedule-only').length,items:ev},

      plugins:[...plugins.values()].map(p=>({id:p.id,name:p.name,kind:p.kind,

        enabled:p.enabled,verified:p.verified,spend:p.spend,

        sent:p.sent,confirmed:p.confirmed,errors:p.errors,

        lastError:p.lastError||''})),stats:{...counts}};

  }

  

  function note(txt,extra){

    traces.push({at:new Date().toISOString(),msg:txt,extra:extra??null});

    if(traces.length>200)traces.shift();

    console.log('[KVPV V8]',txt,extra??'');

  }

  function scan(quiet=false){

    const r=report();counts.scans++;counts.unknown=r.unmappedRed.length;

    lastScan=r;

    if(CFG.notifyUnknown){

      for(const id of r.unmappedRed){

        if(now()-(alerted.get(id)||0)>CFG.unknownNoticeMs){

          alerted.set(id,now());

          if(!quiet)console.warn('[V8] Dau do CHUA CO XU LY: ID',id,

            '- khong tu click khi chua xac minh.');

        }

      }

    }

    return r;

  }

  function validate(plugin){

    if(!plugin||typeof plugin!=='object')throw Error('Module phai la object');

    if(!/^[a-zA-Z0-9_-]{3,64}$/.test(String(plugin.id??'')))throw Error('Module ID khong hop le');

    if(plugins.has(plugin.id))throw Error('Trung module ID '+plugin.id);

    if(!['claim','work'].includes(plugin.kind))throw Error('kind: claim/work');

    if(typeof plugin.probe!=='function'||typeof plugin.run!=='function')

      throw Error('Thieu probe/run goc client');

    if(plugin.redIds!==undefined&&!Array.isArray(plugin.redIds))throw Error('redIds phai la array');

    if(!['none','materials','premium'].includes(plugin.spend||'none'))

      throw Error('spend khong hop le');

    return {id:String(plugin.id),name:String(plugin.name||plugin.id),

      kind:plugin.kind,redIds:(plugin.redIds||[]).map(Number).filter(Number.isSafeInteger),

      verified:plugin.verified===true,enabled:plugin.enabled===true,

      spend:plugin.spend||'none',background:plugin.background===true,

      hourlyLimit:Math.max(1,Math.min(60,Number(plugin.hourlyLimit)||10)),

      cooldownMs:Math.max(2000,Number(plugin.cooldownMs)||15000),

      probe:plugin.probe,run:plugin.run,

      sent:0,confirmed:0,errors:0,lastError:'',

      lastAt:0,blockUntil:0,hour:'',hourCount:0};

  }

  function register(x){const p=validate(x);plugins.set(p.id,p);note('Da dang ky module '+p.id+' (chua tu kich hoat neu khong verified)');return p.id;}

  function toggle(id,on){

    const p=plugins.get(id);if(!p)throw Error('Khong tim thay module');

    if(on && !p.verified && !CFG.allowUnverified)throw Error('Module chua xac minh - khong cho bat');

    if(on && p.spend==='premium' && !CFG.allowPremium)throw Error('Chan tieu Nguyen Bao/premium');

    p.enabled=!!on;return p.enabled;

  }

  function inSensitiveWindow(){

    const t=Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Ho_Chi_Minh',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).format(new Date());

    const [h,m]=t.split(':').map(Number),v=h*60+m;

    const gap=CFG.quietBeforeImportantEventsMin;

    return (v>=690-gap&&v<720) || (v>=1245-gap&&v<1260);

  }

  function pluginReady(p,mode){

    if(!CFG.enabled||!CFG.autoExecuteVerified||!p.enabled||!p.verified||p.kind!==mode)return null;

    if(p.spend==='premium'&&!CFG.allowPremium)return null;

    if(p.spend==='materials'&&p.kind==='claim')return null;

    const t=now();if(t<p.blockUntil||t-p.lastAt<p.cooldownMs)return null;

    const hour=new Date().toLocaleString('sv-SE',{timeZone:'Asia/Ho_Chi_Minh'}).slice(0,13);

    if(p.hour!==hour){p.hour=hour;p.hourCount=0;}

    if(p.hourCount>=p.hourlyLimit)return null;

    const st=context();

    if(!st.running)return null;

    const background=st.job!=='rảnh';

    if(background&&!(CFG.backgroundDuringPVE&&p.background&&st.step==='fighting'&&

       bg().backgroundJobs.includes(st.job)))return null;

    if(inSensitiveWindow()||st.step==='entering'||st.step==='exiting')return null;

    if(p.redIds.length&&!p.redIds.some(rpState))return null;

    let state;

    try{state=p.probe();}catch(e){p.errors++;p.lastError=String(e);p.blockUntil=t+120000;return null;}

    if(!state || state.ready!==true || state.signature===undefined || state.signature===null)return null;

    return {p,state};

  }

  function provide(mode){

    const set=[...plugins.values()].filter(p=>p.kind===mode);

    set.sort((a,b)=>a.lastAt-b.lastAt);

    for(const p of set){

      const item=pluginReady(p,mode);if(!item)continue;

      const before=String(item.state.signature);

      let emitted=false;

      return {k:mode==='claim'?'moduleClaim':'moduleWork',

        what:`V8 ${p.name}`,before,

        probe:()=>{try{return String(p.probe()?.signature??before);}catch(_){return before;}},

        run:()=>{

          

          p.lastAt=now();p.hourCount++;p.sent++;

          p.run(item.state);emitted=true;

        },

        done:()=>{p.confirmed++;counts.success++;note('Xac nhan '+p.id);},

        failed:why=>{p.errors++;counts.fail++;p.lastError=why;

          p.blockUntil=now()+Math.max(300000,CFG.maxActionWaitMs);

          note('Loi module '+p.id+': '+why);}};

    }

    return null;

  }

  function hasClaim(){

    

    return [...plugins.values()].some(p=>!!pluginReady(p,'claim'));

  }

  function watchdog(){

    const s=context();const key=`${s.job??''}/${s.step??''}/${s.scene??''}`;

    if(key!==lastJob){lastJob=key;lastJobAt=now();}

    if(s.running&&s.job!=='rảnh'&&now()-lastJobAt>CFG.stuckWatchMinutes*60000){

      const warningKey='stuck:'+key;

      if(now()-(alerted.get(warningKey)||0)>1800000){

        alerted.set(warningKey,now());

        console.warn('[V8] Canh bao co the bi ket:',key,

          '- khong tu thoat khi chua chac tran da ket thuc.');

      }

    }

  }

  

  function tick(){try{scan(false);watchdog();}catch(e){console.warn('[V8] Scan error:',e);}}

  function coverage(){

    const r=report();

    console.table(r.features);

    console.table(r.events.items);

    console.table(r.plugins);

    console.log('[V8] Chua tu dong tat ca tinh nang game. Module chua map khong duoc tu thuc thi.');

    return r;

  }

  

  function status(){

    const r=scan(true);const view={account:r.actorId,job:r.context.job,step:r.context.step,

      red:r.red.length,unknown:r.unmappedRed.length,readyClaims:r.readyClaims,

      backgroundBusy:r.upgradesBusy,knownModules:r.features.length,

      plugins:r.plugins.length,eventsOnly:r.events.scheduleOnly,expEnabled:D.config.enableExp,

      tinhThanEnabled:D.config.enableTinhThan};

    console.table([view]);return view;

  }

  window.KVPV_V8={config:CFG,register,toggle,provide,hasClaim,

    status,scan,coverage,report,

    unknown:()=>scan(true).unmappedRed,

    jobs:()=>[...plugins.values()].map(p=>({id:p.id,enabled:p.enabled,verified:p.verified,

      claim:p.kind==='claim',lastError:p.lastError})),

    exportJSON:()=>JSON.stringify(report(),null,2),

    history:()=>traces.slice(),

    stop(){if(timer!==null)__KVPV29.cancel(timer);timer=null;CFG.enabled=false;},

    start(){CFG.enabled=true;if(timer===null)timer=__KVPV29.every(tick,CFG.scanMs);tick();}

  };

  window.KVPV_V8.start();

  console.log('✅ KVPV V8 SUPER CORE: status(), coverage(), scan(), register()');

})();










(() => {

  const V = window.KVPV_V8, U = window.KVPV_UPGRADES;

  if (!V?.register || !U?.busy || typeof _Ba==='undefined' || typeof _ft==='undefined') {

    console.error('[V8.1] Nap V8 SUPER CORE va chon game-frame truoc!');return;

  }

  const model=()=>_Ba?._n1?._Pln?._Fln?.ins;

  const rpc=()=>_Ba?._n1?._Pln?._Hln?.ins;

  const scoreCfg=()=>_ft?._ryh?.ins;

  const tNow=()=>Date.now();

  const nowServer=()=>typeof _Sa==='undefined'?NaN:Number(_Sa.svrTime);

  const active=()=>{

    const m=model(),sv=nowServer();

    return !!m&&Number.isFinite(sv)&&sv>0&&

      Number.isFinite(Number(m.nextWeekUpdateTime))&&

      Number(m.nextWeekUpdateTime)>sv;

  };

  const safeRows=(which)=>{

    try {

      const m=model();

      if (!active()) return [];

      const f=which==='daily'?m?.getDailyTasks:m?.getLimitTasks;

      if (typeof f!=='function')return [];

      const a=f.call(m);

      return Array.isArray(a)?a.filter(Array.isArray):[];

    }catch(e){return [];}

  };

  function taskScan(which){

    const rows=safeRows(which);

    

    const ready=rows.filter(x=>Number(x[1])===1&&Number.isSafeInteger(Number(x[0]))&&Number(x[0])>0);

    

    const signature=active()?JSON.stringify(rows.map(x=>[x[0],x[1]])):'inactive';

    return {ready:ready.length>0,signature,id:ready.length?Number(ready[0][0]):0,

      count:ready.length,section:which};

  }

  const cfgLevels=()=>{

    try {

      const c=scoreCfg(),v=c?.getLvs?.();

      return Array.isArray(v)?v.filter(x=>Number.isSafeInteger(Number(x))&&Number(x)>0):[];

    }catch(_){return [];}

  };

  function scoreScan(){

    const m=model(),c=scoreCfg();

    const lvs=cfgLevels();

    const score=Number(m?.score);

    const claimed=[];

    let next=0;

    if(active()&&lvs.length&&Number.isFinite(score)&&typeof m?.getRewardState==='function'){

      for(const raw of lvs){

        const lv=Number(raw);

        let taken=true;

        try{taken=m.getRewardState(lv)===true;}catch(_){continue;}

        claimed.push([lv,taken]);

        const cfg=c?.getCfgByLv?.(lv),need=Number(cfg?.[1]);

        if(!next&&!taken&&Number.isFinite(need)&&need>=0&&score>=need)next=lv;

      }

    }

    return {ready:next>0,signature:active()?JSON.stringify(claimed):'inactive',

      id:next,score:Number.isFinite(score)?score:null,

      total:lvs.length};

  }

  const addons=[

    {id:'dailyExpedition',name:'Nhan nhiem vu ngay da xong',redIds:[977],hourlyLimit:25,

      probe:()=>taskScan('daily'),

      run:(x)=>{

        if(!x.ready||!x.id||!active())throw Error('Nhiem vu ngay khong con san sang');

        if(typeof rpc()?.FinishExpeditionTask!=='function')throw Error('Khong co RPC nhan nhiem vu');

        rpc().FinishExpeditionTask(x.id,false); 

      }},

    {id:'limitedExpedition',name:'Nhan nhiem vu gioi han da xong',redIds:[978],hourlyLimit:20,

      probe:()=>taskScan('limit'),

      run:(x)=>{

        if(!x.ready||!x.id||!active())throw Error('Nhiem vu gioi han khong con san sang');

        if(typeof rpc()?.FinishExpeditionTask!=='function')throw Error('Khong co RPC nhan nhiem vu');

        rpc().FinishExpeditionTask(x.id,false); 

      }},

    {id:'expeditionMilestone',name:'Nhan thuong moc diem nhiem vu',redIds:[979],hourlyLimit:20,

      probe:scoreScan,

      run:(x)=>{

        if(!x.ready||!x.id||!active())throw Error('Moc diem khong con san sang');

        if(typeof rpc()?.GetExpeditionscoreReward!=='function')throw Error('Khong co RPC nhan moc');

        rpc().GetExpeditionscoreReward(x.id);

      }}

  ];

  for(const x of addons){

    try{V.register({...x,kind:'claim',verified:true,enabled:true,

      spend:'none',background:true,cooldownMs:6000});}

    catch(e){console.warn('[V8.1] Khong dang ky duoc '+x.id,e);}

  }

  const api={

    preview(){

      const m=model();const rows=[

        {Loai:'Nhiem vu ngay',SanSang:taskScan('daily').count},

        {Loai:'Nhiem vu gioi han',SanSang:taskScan('limit').count},

        {Loai:'Thuong moc diem',SanSang:scoreScan().ready?1:0},

      ];

      console.table(rows);

      return {active:active(),score:Number(m?.score)||0,

        expireAt:m?.nextWeekUpdateTime,rows};

    },

    status(){

      const all=V.report?.().plugins||[];

      const names=new Set(addons.map(x=>x.id));

      const rows=all.filter(x=>names.has(x.id));

      console.table(rows);return rows;

    },

    stop(){for(const x of addons){try{V.toggle(x.id,false);}catch(_){window.KVPV_V1?.diagnostics?.record(_);}}},

    start(){for(const x of addons){try{V.toggle(x.id,true);}catch(_){window.KVPV_V1?.diagnostics?.record(_);}}}

  };

  window.KVPV_V81=api;

  console.log('[V8.1] 3 nhom nhiem vu da duoc noi vao hang doi chung. KHONG tieu diem hoan thanh ngay.');

})();










(() => {

  const V=window.KVPV_V8, D=window.KVPV_DAILY;

  if (!V?.register || !V?.report || !D?.quickState || typeof _Ba==='undefined') {

    console.error('[V8.2] Phai nap V8.1 FULL trong game-frame truoc.');return;

  }

  

  if (window.KVPV_V82) {

    console.log('[V8.2] Da co module. Su dung KVPV_V82.status()/start()/stop().');return;

  }

  const C={

    normal:true, immortal:true,

    minScoreGain:1,              // chi trang bi co diem lon hon trang bi dang mac

    protectedSlots:[],          

    protectedEquippedItemIds:[],

    protectedCandidateItemIds:[],

    maxRequestsPerHourNormal:12,

    maxRequestsPerHourImmortal:8

  };

  const bag=()=>_Ba?._Ic?._aQ?.ins;

  const actor=()=>_Ba?._rJ?._O$?.ins;

  const immortal=()=>_Ba?._MT?.immortalsEquip?._mQ?.ins;

  const normalRPC=()=>_Ba?._Ic?._oJ?.instance;

  const immortalRPC=()=>_Ba?._MT?.immortalsEquip?._ptt?.ins;

  const configs=[

    {kind:'normal',enabled:()=>C.normal,bagType:1,redId:47,

      getWorn:p=>actor()?.getEupByPart?.(p),score:a=>Number(a?.[3]?.[7]),

      rpc:normalRPC,method:'c2sWearEquip'},

    {kind:'immortal',enabled:()=>C.immortal,bagType:8,redId:198,

      getWorn:p=>immortal()?.getImmortalsEquipByPart?.(p),score:a=>Number(a?.[4]?.[3]),

      rpc:immortalRPC,method:'wearImmortalEquip'}

  ];

  const toId=v=>Number.isSafeInteger(Number(v))&&Number(v)>0?Number(v):0;

  function available(o){

    const b=bag();

    

    if(o.kind==='normal' && typeof actor()?.getEupByPart!=='function')return [];

    if(o.kind==='immortal' && !immortal()?.immortalsEquipsDic)return [];

    if(!o.enabled() || !b || b.isBagInited===false ||

       typeof b.getBestEquips!=='function' ||

       typeof o.rpc()?.[o.method]!=='function')return [];

    let dic;

    try{dic=b.getBestEquips(o.bagType);}catch(_){return [];}

    if(!Array.isArray(dic?.values)||!Array.isArray(dic?.keys))return [];

    const out=[];

    for(let i=0;i<dic.values.length;i++){

      const a=dic.values[i];

      const pos=Number(dic.keys[i]);

      const uid=toId(a?.[2]),itemId=toId(a?.[0]);

      if(!Number.isInteger(pos)||pos<1||pos>10||!uid||!itemId)continue;

      if(C.protectedSlots.includes(pos) || C.protectedCandidateItemIds.includes(itemId))continue;

      let worn;try{worn=o.getWorn(pos);}catch(_){continue;}

      const oldId=toId(worn?.[0]);

      if(oldId && C.protectedEquippedItemIds.includes(oldId))continue;

      const newScore=o.score(a),oldScore=worn?o.score(worn):0;

      if(!Number.isFinite(newScore)||newScore<=0 ||

        (worn && !Number.isFinite(oldScore)))continue;

      const gain=newScore-oldScore;

      if(!(gain>=C.minScoreGain))continue;

      out.push({kind:o.kind,pos,uid,itemId,newScore,oldScore,gain});

    }

    return out.sort((a,b)=>b.gain-a.gain||a.pos-b.pos);

  }

  

  function wornSignature(o){

    try{

      return JSON.stringify(Array.from({length:10},(_,i)=>{

        const p=i+1,a=o.getWorn(p);

        return [p,toId(a?.[0]),toId(a?.[2]),o.score(a)||0];

      }));

    }catch(_){return null;}

  }

  

  function probe(o){

    const sig=wornSignature(o);

    const items=available(o);

    return {ready:sig!==null&&items.length>0,

      signature:sig,chosen:items[0]||null,count:items.length};

  }

  const ids=[];

  for(const o of configs){

    const id=o.kind==='normal'?'autoWearNormal':'autoWearImmortal';

    try{

      V.register({id,name:o.kind==='normal'?'Mac trang bi thuong tot hon':'Mac Tien Trang tot hon',

        kind:'work',verified:true,enabled:true,spend:'none',

        redIds:[], 

        background:false, 

        hourlyLimit:o.kind==='normal'?C.maxRequestsPerHourNormal:C.maxRequestsPerHourImmortal,

        cooldownMs:15000,

        probe:()=>probe(o),

        run:state=>{

          const old=state.chosen;

          const fresh=probe(o).chosen;

          if(!fresh||!old||fresh.uid!==old.uid||fresh.pos!==old.pos)

            throw Error('Do da thay doi truoc luc mac; huy yeu cau cu');

          const r=o.rpc();

          if(typeof r?.[o.method]!=='function')throw Error('Khong co RPC '+o.method);

          r[o.method](fresh.uid); 

          console.log('[V8.2] Yeu cau mac',o.kind,'vi tri',fresh.pos,

            'uid',fresh.uid,'diem +',fresh.gain);

        }

      });

      ids.push(id);

    }catch(e){console.warn('[V8.2] Khong the dang ky '+id,e);}

  }

  window.KVPV_V82={config:C,

    preview(){

      const rows=configs.flatMap(available);

      console.table(rows);

      return rows;

    },

    status(){

      const plugins=(V.report()?.plugins||[]).filter(x=>ids.includes(x.id));

      console.table(plugins);

      return {plugins,ready:configs.map(o=>({type:o.kind,count:available(o).length,

        red:!!_Ba?._Xo?._Ko?.instance?.getRpKeyState?.(o.redId)}))};

    },

    stop(){for(const id of ids){try{V.toggle(id,false);}catch(_){window.KVPV_V1?.diagnostics?.record(_);}}},

    start(){for(const id of ids){try{V.toggle(id,true);}catch(_){window.KVPV_V1?.diagnostics?.record(_);}}}

  };

  console.log('[V8.2] Da nap 2 plugin AUTO MAC TRANG BI TOT HON; khong dung luyen/ban, khong doi do khi danh.');

})();














(() => {

  const V=window.KVPV_V8;

  if(!V?.register || !V?.report || typeof _Ba==='undefined'){

    console.error('[V8.3] Nap ban FULL V8.3 vao game-frame truoc.');return;

  }

  if(window.KVPV_V83){

    console.log('[V8.3] Da cai. KVPV_V83.status()/preview().');return;

  }

  const C={

    temperTasks:true,temperDaily:true,

    fightTeamAchievements:true,fightTeamTasks:true,crossAchievements:true,

    

    maxPerHour:12,

    allowDuringPVE:true

  };

  const red=(id)=>{

    try{return _Ba?._Xo?._Ko?.instance?.getRpKeyState?.(id)===true;}catch(_){return false;}

  };

  const temper=()=>_Ba?._$qt?._tKt?.ins;

  const temperRpc=()=>_Ba?._$qt?.TemperCrtl?.ins;

  const team=()=>_Ba?._Zpt?._Jpt?.inst;

  const teamRpc=()=>_Ba?._Zpt?._nZt?.ins;

  const cross=()=>_Ba?._gg?._Z5t?.inst;

  const crossRpc=()=>_Ba?._gg?._Rhn?.ins;

  const idOf=v=>Number.isSafeInteger(Number(v))&&Number(v)>0?Number(v):0;

  const arr=x=>Array.isArray(x)?x.filter(Array.isArray):[];

  const statusRows=rows=>rows.map(x=>[idOf(x?.[0]),Number(x?.[2])]);

  function taskScan(rows,stateIndex=1){

    const items=arr(rows).filter(x=>idOf(x[0]));

    const sig=JSON.stringify(items.map(x=>[idOf(x[0]),Number(x[stateIndex])]));

    const ready=items.find(x=>Number(x[stateIndex])===1);

    return {ready:!!ready,id:ready?idOf(ready[0]):0,

      signature:sig,count:items.filter(x=>Number(x[stateIndex])===1).length};

  }

  function temperTaskProbe(){

    if(!C.temperTasks||!red(17))return {ready:false,signature:'off'};

    return taskScan(temper()?.tasks,1);

  }

  function temperDailyProbe(){

    if(!C.temperDaily||!red(17))return {ready:false,signature:'off'};

    const v=Number(temper()?.getOtherValue?.(3));

    return {ready:v===1,signature:Number.isFinite(v)?String(v):'no-data',value:v};

  }

  function teamAchievementProbe(){

    if(!C.fightTeamAchievements||!red(408))return {ready:false,signature:'off'};

    return taskScan(team()?.fightTeamCopyAchievement,2);

  }

  function teamTaskProbe(){

    if(!C.fightTeamTasks||!red(407))return {ready:false,signature:'off'};

    

    const index=team()?._wzn;

    return taskScan(index&&typeof index==='object'?Object.values(index):[],2);

  }

  function crossAchievementProbe(){

    if(!C.crossAchievements||!red(471))return {ready:false,signature:'off'};

    return taskScan(cross()?.crossServerCopyAchievement,2);

  }

  const defs=[

    {id:'claimTemperTask',name:'Nhan nhiem vu Lich Luyen',redIds:[17],probe:temperTaskProbe,

      rpc:temperRpc,method:'getLiLianTaskAward',arg:true},

    {id:'claimTemperDaily',name:'Nhan thuong ngay Lich Luyen',redIds:[17],probe:temperDailyProbe,

      rpc:temperRpc,method:'getLiLianDayAward',arg:false},

    {id:'claimFightTeamAchievement',name:'Nhan thanh tuu Chien Doi',redIds:[408],probe:teamAchievementProbe,

      rpc:teamRpc,method:'GetFightTeamCopyAchievementReward',arg:true},

    {id:'claimFightTeamTask',name:'Nhan nhiem vu Chien Doi',redIds:[407],probe:teamTaskProbe,

      rpc:teamRpc,method:'GetFightTeamCopyTaskReward',arg:true},

    {id:'claimCrossAchievement',name:'Nhan thanh tuu Lien Server',redIds:[471],probe:crossAchievementProbe,

      rpc:crossRpc,method:'GetCrossServerCopyAchievementReward',arg:true}

  ];

  const ids=[];

  for(const d of defs){

    try{

      V.register({id:d.id,name:d.name,kind:'claim',verified:true,enabled:true,

        spend:'none',redIds:d.redIds,background:C.allowDuringPVE,

        hourlyLimit:C.maxPerHour,cooldownMs:9000,

        probe:()=>{

          const r=d.probe();

          return r?.ready&&typeof d.rpc()?.[d.method]==='function'?r:

            {ready:false,signature:String(r?.signature??'missing')};

        },

        run:state=>{

          const cur=d.probe();

          if(!cur?.ready||String(cur.signature)!==String(state.signature)||

             (d.arg&&cur.id!==state.id)){

            throw Error('Trang thai da doi truoc khi nhan');

          }

          const api=d.rpc();

          if(typeof api?.[d.method]!=='function')throw Error('RPC chua san sang '+d.method);

          if(d.arg)api[d.method](cur.id);

          else api[d.method]();

          console.log('[V8.3] Gui nhan thuong',d.id,d.arg?cur.id:'');

        }});

      ids.push(d.id);

    }catch(e){console.warn('[V8.3] Khong the dang ky '+d.id,e);}

  }

  window.KVPV_V83={config:C,

    preview(){

      const rows=defs.map(d=>{

        const p=d.probe();

        return {Nhom:d.name,DauDo:d.redIds[0],Bat:red(d.redIds[0]),

          SanSang:p?.ready===true,SoLuong:p?.count??(p?.ready?1:0),

          ID:p?.id??'-',CoRPC:typeof d.rpc()?.[d.method]==='function'};

      });

      console.table(rows);return rows;

    },

    status(){const rows=(V.report()?.plugins||[]).filter(x=>ids.includes(x.id));console.table(rows);return rows;},

    stop(){for(const id of ids)try{V.toggle(id,false);}catch(_){window.KVPV_V1?.diagnostics?.record(_);}}

    ,start(){for(const id of ids)try{V.toggle(id,true);}catch(_){window.KVPV_V1?.diagnostics?.record(_);}}

  };

  console.log('[V8.3] Da them 5 nhom NHAN THUONG MIEN PHI. Chi goi RPC khi trang thai == 1.');

})();









(() => {

  const V=window.KVPV_V8;

  if(!V?.register||!V?.report||typeof _Ba==='undefined'||typeof _ft==='undefined'){

    console.error('[V8.4] Nap file V8.4 FULL vao game-frame truoc');return;

  }

  if(window.KVPV_V84){console.log('[V8.4] Da nap truoc do');return;}

  const C={freeLogin:true,rankDaily:true,maxPerHour:8};

  const model=()=>_Ba?._ZEt?._$Et?.instance;

  const rpc=()=>_Ba?._ZEt?._hFt?.instance;

  const cfg=()=>_ft?._JEt?.ins;

  const red=id=>{

    try{return _Ba?._Xo?._Ko?.instance?.getRpKeyState?.(id)===true;}catch(_){return false;}

  };

  const safeId=n=>Number.isSafeInteger(Number(n))&&Number(n)>0?Number(n):0;

  function loginProbe(){

    const m=model(), rows=m?.nodeLit;

    if(!C.freeLogin||!red(316)||!m?.state||!Array.isArray(rows))

      return {ready:false,signature:'not-ready'};

    const eligible=[];

    const signature=[];

    for(const row of rows){

      const id=safeId(row?.[0]),status=Number(row?.[1]);

      if(!id)continue;

      signature.push([id,status]);

      

      const c=cfg()?.getCfgById?.(id);

      if(status===1&&Number(c?.[1])===0)eligible.push(id);

    }

    return {ready:eligible.length>0,signature:JSON.stringify(signature),

      id:eligible[0]||0,count:eligible.length};

  }

  function rankProbe(){

    const m=model();

    const state=Number(m?.fsRankDailyRwdState);

    const type=Number(m?.rankType);

    if(!C.rankDaily||![0,1].includes(type)||!(red(1551)||red(1552)))

      return {ready:false,signature:'not-ready'};

    return {ready:state===1,signature:String(type)+':'+String(state),type,state};

  }

  const defs=[

    {id:'claimFreeLogin',name:'Nhan thuong dang nhap MIEN PHI',redIds:[316],

      probe:loginProbe,method:'getLoginAward',arg:true},

    {id:'claimFsRankDaily',name:'Nhan thuong BXH ngay da du dieu kien',redIds:[1551,1552],

      probe:rankProbe,method:'getFsRankDailyRwd',arg:false}

  ];

  const ids=[];

  for(const d of defs){

    try{

      V.register({id:d.id,name:d.name,kind:'claim',verified:true,enabled:true,

        spend:'none',redIds:d.redIds,background:true,

        hourlyLimit:C.maxPerHour,cooldownMs:12000,

        probe:()=>{

          const x=d.probe();

          return x.ready&&typeof rpc()?.[d.method]==='function'?x:

            {ready:false,signature:String(x?.signature??'missing')};

        },

        run:old=>{

          const fresh=d.probe();

          if(!fresh.ready||String(fresh.signature)!==String(old.signature)||

             (d.arg&&fresh.id!==old.id))throw Error('Qua dang nhap da thay doi, bo qua');

          const fn=rpc()?.[d.method];

          if(typeof fn!=='function')throw Error('Khong tim thay RPC');

          if(d.arg)fn.call(rpc(),fresh.id);

          else fn.call(rpc());

          console.log('[V8.4] Da gui nhan',d.id, d.arg?fresh.id:'');

        }});

      ids.push(d.id);

    }catch(e){console.warn('[V8.4] Khong dang ky duoc',d.id,e);}

  }

  window.KVPV_V84={config:C,

    preview(){const rows=defs.map(d=>{const x=d.probe();return {Loai:d.name,SanSang:x.ready,

      ID:x.id||'-',SoLuong:x.count??(x.ready?1:0),CoRPC:typeof rpc()?.[d.method]==='function'};});

      console.table(rows);return rows;},

    status(){const rows=(V.report()?.plugins||[]).filter(x=>ids.includes(x.id));console.table(rows);return rows;},

    start(){ids.forEach(id=>{try{V.toggle(id,true);}catch(_){window.KVPV_V1?.diagnostics?.record(_);}});},

    stop(){ids.forEach(id=>{try{V.toggle(id,false);}catch(_){window.KVPV_V1?.diagnostics?.record(_);}});}

  };

  console.log('[V8.4] Da them thuong DANG NHAP MIEN PHI va BXH ngay; 2 plugin an toan');

})();








(() => {

  const V=window.KVPV_V8;

  if(!V?.register||!V?.report||typeof _Ba==='undefined'){

    console.error('[V8.5] Nap V8.5 FULL vao game-frame truoc');return;

  }

  if(window.KVPV_V85){console.log('[V8.5] Da cai san');return;}

  const C={accumulatedRewards:true,maxPerHour:12};

  const red=id=>{try{return _Ba?._Xo?._Ko?.instance?.getRpKeyState?.(id)===true;}catch(_){return false;}};

  const sale=()=>_Ba?._af?._qwt?.instance;

  const saleRpc=()=>_Ba?._af?._hf?.instance;

  const id=n=>Number.isSafeInteger(Number(n))&&Number(n)>0?Number(n):0;

  function accumulatedProbe(){

    if(!C.accumulatedRewards||!red(663))return {ready:false,signature:'off'};

    const m=sale();

    if(!m||m.isEnd===true)return {ready:false,signature:'ended'};

    

    const obj=m._Pvn;

    if(!obj||typeof obj!=='object')return {ready:false,signature:'no-data'};

    const rows=Object.values(obj).filter(x=>Array.isArray(x)&&id(x[0]));

    const ready=rows.find(x=>Number(x[1])===1);

    return {ready:!!ready,id:ready?id(ready[0]):0,

      signature:JSON.stringify(rows.map(x=>[id(x[0]),Number(x[1])])),

      count:rows.filter(x=>Number(x[1])===1).length};

  }

  const defs=[

    {id:'claimAccumulatedAward',name:'Nhan moc tich luy da du dieu kien',redIds:[663],

      probe:accumulatedProbe,available:()=>typeof saleRpc()?.getRechargeReward==='function',

      run:id=>saleRpc().getRechargeReward(id)}

  ];

  const ids=[];

  for(const d of defs){

    try{

      V.register({id:d.id,name:d.name,kind:'claim',verified:true,enabled:true,

        spend:'none',redIds:d.redIds,background:true,hourlyLimit:C.maxPerHour,cooldownMs:12000,

        probe:()=>{const state=d.probe();return state.ready&&d.available()?state:

          {ready:false,signature:String(state?.signature??'no-data')};},

        run:old=>{

          const fresh=d.probe();

          if(!fresh.ready||fresh.id!==old.id||

             String(fresh.signature)!==String(old.signature)||!d.available())

            throw Error('Thuong da thay doi / khong co ket noi');

          d.run(fresh.id);

          console.log('[V8.5] Gui nhan thuong co san',d.id,fresh.id);

        }});

      ids.push(d.id);

    }catch(e){console.warn('[V8.5] Module loi',d.id,e);}

  }

  window.KVPV_V85={config:C,

    preview(){const rows=defs.map(d=>{const p=d.probe();return {Nhom:d.name,SanSang:p.ready,ID:p.id??0,

      SoLuong:p.count??0,CoRPC:d.available()};});console.table(rows);return rows;},

    status(){const rows=(V.report()?.plugins||[]).filter(x=>ids.includes(x.id));console.table(rows);return rows;},

    stop(){ids.forEach(id=>{try{V.toggle(id,false);}catch(_){window.KVPV_V1?.diagnostics?.record(_);}});},

    start(){ids.forEach(id=>{try{V.toggle(id,true);}catch(_){window.KVPV_V1?.diagnostics?.record(_);}});}

  };

  console.log('[V8.5] Auto nhan 2 nhom qua da du dieu kien; KHONG nap/mua.');

})();




(() => {

  'use strict';

  const W=window;

  if(W.KVPV_QUEST_GUARD?.version==='11.5.0')return;

  const actor=String(W.__KVPV_OWN_ACTOR_ID??'');

  const C={timeoutMs:30000,maxHistory:160};

  const records=new Map(),events=[];

  const now=()=>Date.now();

  const actorOk=()=>actor && !W.__KVPV_UNIVERSAL_HALTED &&

    typeof _Ba!=='undefined' && String(_Ba?._rJ?._O$?.ins?.actorId??'')===actor;

  const str=x=>String(x??'');

  

  function log(type,rec){

    events.push({at:now(),type,group:rec.group,identity:rec.identity,

      signature:rec.signature,status:rec.status});

    if(events.length>C.maxHistory)events.shift();

  }

  function pending(group){

    if(!actorOk())return null;

    const r=records.get(group);

    return r && r.status==='WAITING_UNVERIFIED'?{...r}:null;

  }

  function observe(group,identity,signature){

    if(!actorOk() || identity==null || signature==null)return false;

    const r=records.get(str(group));

    if(!r || r.status!=='WAITING_UNVERIFIED')return false;

    if(r.identity!==str(identity) || r.signature!==str(signature)){

      r.status='STATE_CHANGED_UNVERIFIED';r.observedAt=now();

      r.observedIdentity=str(identity);r.observedSignature=str(signature);

      log('STATE_CHANGED_UNVERIFIED',r);return true;

    }

    return false;

  }

  function canSend(group,identity,signature){

    if(!actorOk() || identity==null || signature==null)return false;

    const r=records.get(str(group));

    return !r || r.status!=='WAITING_UNVERIFIED';

  }

  function sent(group,identity,signature){

    if(!canSend(group,identity,signature))return false;

    const r={group:str(group),identity:str(identity),signature:str(signature),

      status:'WAITING_UNVERIFIED',sentAt:now(),observedAt:0};

    records.set(r.group,r);log('CLIENT_CALL_RECORDED',r);return true;

  }

  function publicRow(r){

    const age=Math.max(0,now()-r.sentAt);

    return {...r,ageMs:age,displayStatus:r.status==='WAITING_UNVERIFIED'&&

      age>=C.timeoutMs?'TIMED_OUT_UNKNOWN':r.status};

  }

  

  function status(){return {version:'11.5.0',actorValid:!!actorOk(),

    noNewRPC:true,autoRetry:false,pending:[...records.values()]

      .filter(x=>x.status==='WAITING_UNVERIFIED').map(publicRow),

    rows:[...records.values()].map(publicRow)};}

  

  function history(){return events.slice();}

  function clear(group){

    

    if(!actorOk())return false;

    const r=records.get(str(group));if(!r)return false;

    log('MANUALLY_CLEARED',r);return records.delete(str(group));

  }

  const api=Object.freeze({version:'11.5.0',config:C,pending,observe,canSend,sent,status,history,clear});

  W.KVPV_QUEST_GUARD=api;

  if(W.KVPV){W.KVPV.quests=W.KVPV.quests||{};W.KVPV.quests.guard=api;}

})();









(() => {

  try { window.KVPV_V86?.stop?.(); } catch(_){window.KVPV_V1?.diagnostics?.record(_);}

  const D=window.KVPV_DAILY,V=window.KVPV_V8,U=window.KVPV_UPGRADES,G=window.KVPV_QUEST_GUARD;

  if (!G?.canSend || !D?.status || !V?.register || !U?.busy || typeof _Ba==='undefined' || typeof _ft==='undefined') {

    console.error('[V8.6] Can nap FULL V8.5 trong Console game-frame');return;

  }

  const C={

    enabled:true,

    autoClaimMainQuest:true,

    autoOpenSafeChest:true,

    

    namePattern:'(?:rương|hộp quà|túi quà|lễ bao|quà đăng nhập|quà online)',

    excludePattern:'(?:tùy chọn|tự chọn|tự lựa|chọn một|chọn 1|chọn quà|lựa chọn|sử dụng để đổi|nguyên lực|thể lực|hồi phục|exp đơn|tiềm năng)',

    excludedItemIds:[],

    allowItemIds:[],   

    onePerRequest:1,

    maxChestPerHour:30,

    questCheckMs:12000,

    notifyUnfinishedEveryMs:300000

  };

  const T=()=>Date.now();

  const taskM=()=>_Ba?._zIt?._FIt?.ins;

  const taskR=()=>_Ba?._zIt?._tLh?.ins;

  const taskCfg=()=>_ft?.__Z?.ins;

  const bag=()=>_Ba?._Ic?._aQ?.ins;

  const bagRpc=()=>_Ba?._Ic?._oJ?.instance;

  const goodsCfg=()=>_ft?._mY?.ins;

  const itemTool=()=>_Ba?._Ic?.BeiBaoTool;

  const norm=x=>String(x??'').toLowerCase();

  const positive=n=>Number.isSafeInteger(Number(n))&&Number(n)>0;

  let timer=null,prevMission='',lastNotice=0;

  const pluginIds=[];

  function mainQuest(){

    const m=taskM(), t=m?.taskInfo;

    if(!Array.isArray(t)||!t.length)return {available:false,ready:false,signature:'no-task'};

    const id=t[0],state=Number(t[1]);

    if(id==null||id==='')return {available:false,ready:false,signature:'no-id'};

    const claimed=Array.isArray(m?._TTt)&&m._TTt.some(x=>String(x)===String(id));

    let conf=null;

    try { conf=taskCfg()?.getTaskCfgById?.(id); } catch(_){window.KVPV_V1?.diagnostics?.record(_);}

    const actionId=conf?.[6]??null;

    const progress=Array.isArray(t[2])?t[2].map(x=>Array.isArray(x)?[x[1],x[2]]:x):null;

    return {available:true,ready:state===2&&!claimed,

      id,state,claimed,name:String(conf?.[1]??id),actionId,progress,

      signature:`${id}|${state}|${claimed?1:0}`};

  }

  function safeChestCandidates(){

    if(!C.enabled||!C.autoOpenSafeChest)return [];

    const b=bag(),data=b?.getItemsByBagType?.(0);

    if(!b?.isBagInited||!Array.isArray(data)||!goodsCfg()?.getItemCfgById)return [];

    let allow,exclude,protect;

    try{allow=new RegExp(C.namePattern,'iu');exclude=new RegExp(C.excludePattern,'iu');}

    catch(e){console.warn('[V8.6] Regex khong hop le',e);return [];}

    protect=new Set(C.excludedItemIds.map(Number));

    const forced=new Set(C.allowItemIds.map(Number));

    const out=[];

    for(const row of data){

      if(!Array.isArray(row))continue;

      const id=Number(row[0]),qty=Number(row[1]),uid=Number(row[2]);

      if(!positive(id)||!positive(uid)||!Number.isSafeInteger(qty)||qty<1||protect.has(id))continue;

      let item=null;

      try{item=goodsCfg().getItemCfgById(id);}catch(_){continue;}

      if(!Array.isArray(item)||!item[5])continue;

      const name=String(item[1]??'');

      if(!forced.has(id)&&(!allow.test(name)||exclude.test(name)))continue;

      

      if(Number(item[11])>0)continue;

      if(itemTool()?.isManualGift?.(id)===true)continue;

      if(itemTool()?.isManualGift2?.(id)===true)continue;

      if(!Array.isArray(row[5])||row[5][2]!==1&&row[5][2]!==true)continue;

      

      if(itemTool()?.checkItemCanUseOrNotice?.(row,false)!==true)continue;

      out.push({id,uid,name,qty,signature:`${uid}|${id}|${qty}`});

    }

    return out.sort((a,b)=>a.id-b.id||a.uid-b.uid);

  }

  function observeMainQuest(){

    const q=mainQuest();

    if(q.available)G.observe('mainQuest',q.id,q.signature);

    return q;

  }

  function observeChest(){

    const r=G.pending('safeChest');if(!r)return;

    const b=bag(),rows=b?.getItemsByBagType?.(0);

    if(!b?.isBagInited||!Array.isArray(rows))return;

    const match=rows.find(row=>Array.isArray(row)&&

      String(row[2])===r.identity);

    const sig=match?`${match[2]}|${match[0]}|${match[1]}`:'removed-from-bag';

    G.observe('safeChest',r.identity,sig);

  }

  function inspectUnfinished(){

    const q=mainQuest();

    if(!q.available)return {status:'Chua co du lieu nhiem vu'};

    if(q.state===2)return {id:q.id,name:q.name,status:'DA XONG - CHO NHAN',handled:'Tu nhan qua RPC khi du dieu kien'};

    const isStage=Number(q.actionId)===46;

    return {id:q.id,name:q.name,status:'CHUA HOAN THANH',progress:q.progress,

      actionId:q.actionId,handler:isStage?'Auto Tu Vuot (khong gioi han)':'Chua co hanh dong duoc xac minh',

      tuVuotEnabled:D.config?.enableTuVuot===true};

  }

  const mainId='v86_main_quest_reward',chestId='v86_safe_open_chest';

  try{

    V.register({id:mainId,name:'Nhan nhiem vu chinh tuyen Da xong',kind:'claim',

      verified:true,enabled:true,spend:'none',background:true,

      redIds:[],hourlyLimit:60,cooldownMs:3000,

      probe:()=>{

        const q=observeMainQuest();return {ready:C.enabled&&C.autoClaimMainQuest&&q.ready===true&&G.canSend('mainQuest',q.id,q.signature),

          signature:q.signature,id:q.id};

      },

      run:before=>{

        const cur=mainQuest();

        if(!cur.ready||String(cur.id)!==String(before.id)||cur.signature!==before.signature ||

           !G.canSend('mainQuest',cur.id,cur.signature))

          throw Error('Nhiem vu da thay doi hoac dang cho ket qua');

        if(typeof taskR()?.getTaskAward!=='function')throw Error('Thieu getTaskAward');

        taskR().getTaskAward(cur.id);

        G.sent('mainQuest',cur.id,cur.signature);

        console.log('[V8.6] Nhan nhiem vu Da xong:',cur.id,cur.name);

      }});pluginIds.push(mainId);

    V.register({id:chestId,name:'Mo ruong/qua mien phi trong tui',kind:'work',

      verified:true,enabled:true,spend:'none',background:false,

      redIds:[],hourlyLimit:C.maxChestPerHour,cooldownMs:7000,

      probe:()=>{

        observeChest();

        const x=safeChestCandidates().find(x=>G.canSend('safeChest',String(x.uid),x.signature));

        return x?{ready:true,...x}:

          {ready:false,signature:'none'};

      },

      run:old=>{

        const x=safeChestCandidates().find(r=>r.uid===old.uid&&r.id===old.id);

        observeChest();

        if(!x||x.signature!==old.signature ||

           !G.canSend('safeChest',String(x.uid),x.signature))

          throw Error('Vat pham da thay doi hoac dang cho ket qua');

        if(typeof bagRpc()?.c2sUseBagItem!=='function')throw Error('Thieu useBagItem');

        bagRpc().c2sUseBagItem(x.uid,x.id,1);

        G.sent('safeChest',String(x.uid),x.signature);

        console.log('[V8.6] Mo 1 ruong/qua:',x.name,'ID',x.id,'UID',x.uid);

      }});pluginIds.push(chestId);

  }catch(e){console.error('[V8.6] Khong dang ky duoc module:',e);return;}

  function poll(){

    if(!C.enabled)return;

    const q=observeMainQuest(),key=q.id+'|'+q.state;

    observeChest();

    if(q.available&&q.state!==2&&(key!==prevMission||T()-lastNotice>C.notifyUnfinishedEveryMs)){

      prevMission=key;lastNotice=T();

      const p=inspectUnfinished();

      console.log('[V8.6] Nhiem vu chua xong:',p);

    }

  }

  timer=__KVPV29.every(()=>{try{poll();}catch(e){console.warn('[V8.6]',e);}},C.questCheckMs);

  const publicApi={config:C,

    task(){const q=inspectUnfinished();console.table([q]);return q;},

    chests(){const a=safeChestCandidates();console.table(a);return a;},

    status(){const rows=(V.report()?.plugins||[]).filter(x=>pluginIds.includes(x.id));console.table(rows);return rows;},

    pending(){return G.status().rows.filter(x=>['mainQuest','safeChest'].includes(x.group));},

    stop(){C.enabled=false;if(timer!==null)__KVPV29.cancel(timer);timer=null;

      for(const id of pluginIds){try{V.toggle(id,false);}catch(_){window.KVPV_V1?.diagnostics?.record(_);}}},

    start(){C.enabled=true;for(const id of pluginIds){try{V.toggle(id,true);}catch(_){window.KVPV_V1?.diagnostics?.record(_);}}

      if(timer===null)timer=__KVPV29.every(poll,C.questCheckMs);poll();}

  };

  window.KVPV_V86=publicApi;

  poll();

  console.log('[V8.6] Da bat: nhan nhiem vu chinh tuyen, mo ruong an toan, nhan dien nhiem vu chua xong.');

})();









(() => {

  const W=window,V=W.KVPV_V8,D=W.KVPV_DAILY,U=W.KVPV_UPGRADES;

  if (!V?.register || !V?.toggle || !D?.quickState || !D?.config ||

      typeof _Ba==='undefined' || typeof _ft==='undefined') {

    console.error('[V8.6.3] Phai nap ban V8.6 FULL trong game-frame truoc.');return;

  }

  try{W.KVPV_V863?.stop?.();}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

  try{W.KVPV_V862?.stop?.();}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

  try{W.KVPV_V861?.stop?.();}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

  

  try{if(W.KVPV_V862?.config)W.KVPV_V862.config.autoOpenFarmGuide=false;}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

  try{if(W.KVPV_V861?.config)W.KVPV_V861.config.autoOpenFarmingGuide=false;}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

  const C={enabled:false,questId:'m1094',actionId:189,targetCount:2,

    autoOpenCoBao:true,autoEquipOwned:true,autoActivate:true,

    preventAutoTuVuot:true,resumeTuVuotAfterQuest:true,

    openIntervalMs:60000,ackTimeoutMs:60000,watchMs:1000};

  const life={paused:false,savedTuVuot:null,last:null,lastOpen:0,timer:null,

    ids:[],lastPrint:'',lastPrintAt:0};

  const tick=()=>Date.now();

  const model=()=>_Ba?._kAt?._LAt?.inst;

  const rpc=()=>_Ba?._kAt?._IMi?.inst;

  const cfg=id=>_ft?._WNn?.ins?.getCfgById?.(id);

  const taskCfg=id=>_ft?.__Z?.ins?.getTaskCfgById?.(id);

  const mgr=()=> (typeof _j!=='undefined'&&_j?.ins) || W.window_WinMgr || null;

  function task(){

    const t=_Ba?._zIt?._FIt?.ins?.taskInfo;

    if(!Array.isArray(t)||t[0]==null)return null;

    const c=taskCfg(t[0]);

    return {id:String(t[0]),state:Number(t[1]),name:String(c?.[1]??t[0]),

      actionId:Number(c?.[6]??0),progress:t[2]??null};

  }

  function activeQuest(q=task()) {return !!q&&q.id===C.questId&&q.state!==2;}

  function nativeAuto(){return _Ba?._Co?._Mo?.ins;}

  function pauseTuVuot(q=task()){

    if(!C.enabled||!C.preventAutoTuVuot)return;

    if(activeQuest(q)){

      if(!life.paused){

        life.savedTuVuot=D.config.enableTuVuot===true;

        life.paused=true;

        console.warn('[V8.6.3] Tam dung TU VUOT de uu tien Co Bao m1094');

      }

      D.config.enableTuVuot=false;

      const m=nativeAuto();if(m?.auto===true)m.auto=false;

    }else if(q&&life.paused){

      const prev=life.savedTuVuot;

      if(C.resumeTuVuotAfterQuest&&prev===true)D.config.enableTuVuot=true;

      life.paused=false;life.savedTuVuot=null;

      console.log('[V8.6.3] Co Bao da chuyen nhiem vu/hoan thanh; Tu Vuot=',D.config.enableTuVuot);

    }

  }

  function panel(){

    const m=mgr();let r=null;

    try{r=typeof _Sa!=='undefined'? _Sa.getWindowCfgByFcId?.(C.actionId):null;}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

    const panelId=Number(r?.[0]);

    if(!m||!Number.isSafeInteger(panelId)||panelId<=0)

      return {open:false,panelId:null,ui:null};

    const opened=m.isOpened?.(panelId)===true;

    const ui=opened ? m.getPanelById?.(panelId)||m.getDialogById?.(panelId)||null:null;

    return {open:opened,panelId,ui};

  }

  function exists(dic,id){try{return !!dic?.get?.(id);}catch(_){return false;}}

  function idle(){

    const s=D.quickState();

    return !!s?.running && s.job==='rảnh' &&

      !['entering','exiting','fighting'].includes(String(s.step)) &&

      _Ba?._$a?.SceneUtil?.isCommonScene===true &&

      !(typeof U?.busy==='function' && U.busy());

  }

  function plan(){

    const q=task(),p=panel(),m=model();

    if(!activeQuest(q))return {step:q?.state===2?'claim':'other',task:q,active:false};

    

    const count=Array.isArray(m?.shenqi)?m.shenqi.length:null;

    if(Number.isSafeInteger(count)&&count>=C.targetCount)

      return {step:'waitQuest',task:q,active:true,count,ui:p.open};

    

    let currentUI=false;

    try{currentUI=!!p.ui&&count!==null&&Number(p.ui.idx)===count;}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

    if(currentUI&&p.ui.activateBtn?.visible===true&&p.ui.activateBtn?.gray!==true&&

       p.ui.activateBtn?.disabled!==true)

      return {step:'activate',source:'ui',task:q,active:true,count,ui:true,

        sig:`ui:activate:${q.id}:${q.state}:${count}`};

    const c=count===null?null:cfg(count);

    if(!Number.isSafeInteger(count)||m?.__gn!==true||

       typeof m.frgmtsDic?.get!=='function'||typeof m.epFrgmtsDic?.get!=='function')

      return {step:'fetch',task:q,active:true,count,ui:p.open,

        reason:'Chua doc duoc du lieu manh Co Bao tu server'};

    if(!Array.isArray(c?.[2])||!c[2].length)

      return {step:'config',task:q,active:true,count,ui:p.open,

        reason:'Chua tim thay cau hinh manh'};

    const fragments=c[2].map((item,i)=>({id:Number(item),index:i,

      owned:exists(m.frgmtsDic,item),placed:exists(m.epFrgmtsDic,item),stage:c?.[7]?.[i]??null}));

    if(fragments.some(x=>!Number.isSafeInteger(x.id)||x.id<=0))

      return {step:'config',task:q,active:true,count,reason:'ID manh Co Bao khong hop le'};

    const missing=fragments.filter(x=>!x.owned&&!x.placed);

    const own=fragments.find(x=>x.owned&&!x.placed);

    const allPlaced=fragments.every(x=>x.placed);

    const sig=JSON.stringify([q.id,q.state,count,fragments.map(x=>[x.id,x.owned,x.placed])]);

    if(allPlaced)return {step:'activate',source:currentUI?'ui-or-rpc':'rpc',task:q,active:true,

      count,ui:p.open,fragments,missing,sig,allPlaced};

    if(own)return {step:'put',task:q,active:true,count,ui:p.open,

      fragments,missing,own,sig};

    

    

    return {step:'needFragments',task:q,active:true,count,ui:p.open,

      missing,fragments,sig,reason:'Thieu manh - khong tu nhay qua Tu Vuot'};

  }

  function click(btn){

    if(!btn||btn.visible!==true||btn.gray===true||btn.disabled===true)return false;

    if(typeof btn.event!=='function')return false;

    btn.event(typeof Laya!=='undefined'&&Laya.Event?.CLICK ? Laya.Event.CLICK : 'click');

    return true;

  }

  function guard(a,p){return !life.last || life.last.action!==a || life.last.sig!==p.sig ||

    tick()-life.last.at>=C.ackTimeoutMs;}

  function run(a,old){

    pauseTuVuot();

    if(!C.enabled||!idle())throw Error('Dang ban; chua the thao tac Co Bao');

    const p=plan();

    if(p.step!==a||p.sig!==(old.sig??old.signature)||!guard(a,p))throw Error('Trang thai thay doi hoac dang doi server');

    const u=panel().ui;

    if(a==='activate'){

      if(u&&p.count!==null){

        if(Number(u.idx)!==p.count){u.idx=p.count;u._PMi?.();}

        if(Number(u.idx)===p.count && click(u.activateBtn)){

          life.last={action:a,sig:p.sig,at:tick(),via:'ui'};

          console.log('[V8.6.3] DA BAM NUT KICH HOAT/NHAN TREN MAN HINH Co Bao',p.count+1);

          return true;

        }

      }

      if(p.allPlaced&&typeof rpc()?.actShenQi==='function'){

        rpc().actShenQi();life.last={action:a,sig:p.sig,at:tick(),via:'rpc'};

        console.log('[V8.6.3] Da gui kich hoat Co Bao tuong duong nut game; cho server');

        return true;

      }

      throw Error('Nut Kich hoat chua hien/du lieu server chua du');

    }

    if(a==='put'){

      const id=p.own?.id,idx=p.own?.index;

      if(!id)throw Error('Khong co manh hop le');

      if(u&&p.count!==null){

        if(Number(u.idx)!==p.count){u.idx=p.count;u._PMi?.();}

        if(u._dMi){u._dMi.selIdx=idx;u._xMi?.();}

        if(Number(u.idx)===p.count&&Number(u._dMi?.selIdx)===idx&&click(u.fragmentCtrlBtn)){

          life.last={action:a,sig:p.sig,at:tick(),via:'ui'};

          console.log('[V8.6.3] DA BAM DAT MANH tren UI',id);

          return true;

        }

      }

      if(typeof rpc()?.epFragment!=='function')throw Error('Thieu RPC epFragment');

      rpc().epFragment([id]);life.last={action:a,sig:p.sig,at:tick(),via:'rpc'};

      console.log('[V8.6.3] Da dat manh',id,'- cho server');

      return true;

    }

    throw Error('Khong ho tro loai hanh dong');

  }

  const plugins=[

    {id:'v863_activate',kind:'claim',name:'Co Bao: bam Nhan/Kich hoat truoc',spend:'none',

      hourlyLimit:8,cooldownMs:5000,

      probe:()=>{const p=plan();return {ready:C.enabled&&C.autoActivate&&idle()&&p.step==='activate'&&guard('activate',p),signature:p.sig??'not-ready'};},

      run:old=>run('activate',old)},

    {id:'v863_put',kind:'work',name:'Co Bao: bam dat manh da co',spend:'materials',

      hourlyLimit:30,cooldownMs:5000,

      probe:()=>{const p=plan();return {ready:C.enabled&&C.autoEquipOwned&&idle()&&p.step==='put'&&guard('put',p),signature:p.sig??'not-ready'};},

      run:old=>run('put',old)},

    {id:'v863_open',kind:'work',name:'Co Bao: chi mo huong dan action 189',spend:'none',

      hourlyLimit:10,cooldownMs:10000,

      probe:()=>{const q=task(),p=panel();return {ready:C.enabled&&C.autoOpenCoBao&&activeQuest(q)&&

        !p.open&&idle()&&tick()-life.lastOpen>=C.openIntervalMs&&typeof mgr()?.openByActionId==='function',

        signature:`${q?.id??'-'}:${q?.state??'-'}:${life.lastOpen}`};},

      run:()=>{

        if(!activeQuest()||!idle()||panel().open)throw Error('Khong can mo lai');

        mgr().openByActionId(C.actionId);life.lastOpen=tick();

        console.log('[V8.6.3] Da mo Co Bao actionId 189, KHONG mo Tu Vuot 46');

      }},

    {id:'v863_fetch',kind:'claim',name:'Co Bao: dong bo thong tin manh',spend:'none',

      hourlyLimit:5,cooldownMs:30000,

      probe:()=>{const p=plan();return {ready:C.enabled&&p.step==='fetch'&&

        typeof rpc()?.getShQiInfo==='function',signature:String(p.task?.id)+':'+String(p.task?.state)};},

      run:()=>{if(plan().step!=='fetch')throw Error('Du lieu da du');rpc().getShQiInfo();}}

  ];

  for(const p of plugins){

    try{V.register({...p,verified:true,enabled:false,background:false,redIds:[]});life.ids.push(p.id);}

    catch(e){console.warn('[V8.6.3] Khong dang ky:',p.id,e);}

  }

  

  function status(print=true){

    const p=plan(),q=task(),g=panel();

    const r={task:q,step:p.step,coBao:p.count??null,uiOpen:g.open,

      activateBtnVisible:g.ui?.activateBtn?.visible===true,

      putBtnVisible:g.ui?.fragmentCtrlBtn?.visible===true,

      missing:p.missing??[],fragments:p.fragments??[],

      autoTuVuot:D.config.enableTuVuot,gameTuVuot:nativeAuto()?.auto,

      lastAction:life.last,pausedByFix:life.paused};

    if(print){console.table([{task:q?.id??'-',questState:q?.state,step:r.step,

      soCoBao:r.coBao,uiOpen:r.uiOpen,nutKichHoat:r.activateBtnVisible,

      nutDatManh:r.putBtnVisible,tuVuot:r.autoTuVuot}]);

      if(r.fragments.length)console.table(r.fragments);

      if(r.missing.length)console.warn('[V8.6.3] Co Bao thieu manh:',r.missing);

    }

    return r;

  }

  function observe(){

    if(!C.enabled)return;

    pauseTuVuot();

    const p=plan(), key=String(p.task?.id)+'|'+p.step+'|'+String(p.sig??'');

    if(key!==life.lastPrint||tick()-life.lastPrintAt>300000){

      life.lastPrint=key;life.lastPrintAt=tick();

      if(activeQuest())console.log('[V8.6.3] Co Bao:',p.step,

        p.step==='needFragments'?'THIEU MANH - KHONG TU VUOT':'',p.missing??[]);

    }

  }

  const api={config:C,plan,status,preview:()=>status(true),task,

    nhan(){const p=plan();return p.step==='activate'&&idle()?run('activate',{sig:p.sig}):false;},

    datManh(){const p=plan();return p.step==='put'&&idle()?run('put',{sig:p.sig}):false;},

    diDen(){if(!activeQuest()||!idle()||typeof mgr()?.openByActionId!=='function')return false;

      mgr().openByActionId(C.actionId);life.lastOpen=tick();return true;},

    start(){C.enabled=true;for(const id of life.ids){try{V.toggle(id,true);}catch(_){window.KVPV_V1?.diagnostics?.record(_);}}

      if(life.timer===null)life.timer=__KVPV29.every(observe,C.watchMs);observe();},

    stop(){C.enabled=false;for(const id of life.ids){try{V.toggle(id,false);}catch(_){window.KVPV_V1?.diagnostics?.record(_);}}

      if(life.timer!==null)__KVPV29.cancel(life.timer);life.timer=null;

      if(life.paused&&life.savedTuVuot===true&&C.resumeTuVuotAfterQuest)D.config.enableTuVuot=true;

      life.paused=false;life.savedTuVuot=null;}

  };

  // V8.6.4 owns the ordered Co Bao flow; keep this legacy controller manual-only.
  W.KVPV_V863=api;

  console.log('[V8.6.3] FIX: Tu Vuot tam dung khi m1094; chi mo Co Bao 189; bam Nhan/Kich hoat neu game bao du. KVPV_V863.status()');

})();















(() => {

  'use strict';

  const W=window,V=W.KVPV_V8,D=W.KVPV_DAILY,U=W.KVPV_UPGRADES;

  if (!V?.register || !V?.toggle || !D?.config || !D?.quickState ||

      typeof _Ba==='undefined' || typeof _ft==='undefined') {

    console.error('[V8.6.4] Nap V8.6 FULL trong dung game-frame truoc.');return;

  }

  

  for(const api of ['KVPV_V864','KVPV_V863','KVPV_V862','KVPV_V861']){

    try{W[api]?.stop?.();}catch(e){console.warn('[V8.6.4] stop',api,e);}

  }

  const OLD=['v863_activate','v863_put','v863_open','v863_fetch','v862_activate','v862_put','v862_open','v862_fetch','v861_guidedOpen','v861_guidedPut','v861_guidedActivate'];

  for(const id of OLD){try{V.toggle(id,false);}catch(_){window.KVPV_V1?.diagnostics?.record(_);}}

  try{if(W.KVPV_V862?.config)W.KVPV_V862.config.autoOpenFarmGuide=false;}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

  try{if(W.KVPV_V861?.config)W.KVPV_V861.config.autoOpenFarmingGuide=false;}catch(_){window.KVPV_V1?.diagnostics?.record(_);}



  const C={enabled:true,coBaoTaskId:'m1094',coBaoActionId:189,thienKiepActionId:46,requiredCoBao:2,

    claimStageReward:true,useFragmentItem:true,putFragments:true,activateCoBao:true,

    openCoBaoUI:true,openEveryMs:60000,

    

    suspendTuVuotDuringCoBao:true,restoreTuVuotAfterCoBao:true,

    

    continueNextQuests:true,openNextQuestOnce:true,

    autoNavigateToTuVuotForOtherQuests:false,

    retryLimitPerState:3,ackWaitMs:30000,watchMs:250,

    allowPremiumSpend:false};

  const S={ids:[],timer:null,disabled:false,last:new Map(),attempts:new Map(),

    paused:false,oldTuVuot:null,questKey:null,navKey:null,navAt:0,coBaoOpenKey:null,

    lastMessage:'',lastMessageAt:0,stageClaims:0,uses:0,places:0,activations:0};

  const time=()=>Date.now();

  const qModel=()=>_Ba?._zIt?._FIt?.ins;

  const qCfg=id=>_ft?.__Z?.ins?.getTaskCfgById?.(id);

  const m=()=>_Ba?._kAt?._LAt?.inst;

  const rpc=()=>_Ba?._kAt?._IMi?.inst;

  const coCfg=id=>_ft?._WNn?.ins?.getCfgById?.(id);

  const stage=()=>_Ba?._Co?._Mo?.ins;

  const stageCfg=lv=>_ft?._h$?.ins?.getCfgByLv?.(lv);

  const stageRpc=()=>_Ba?._sst?._Cht?.inst;

  const bag=()=>_Ba?._Ic?._aQ?.ins;

  const bagRpc=()=>_Ba?._Ic?._oJ?.instance;

  const itemCfg=id=>_ft?._mY?.ins?.getItemCfgById?.(id);

  const itemTool=()=>_Ba?._Ic?.BeiBaoTool;

  const mgr=()=> (typeof _j!=='undefined'&&_j?.ins)||W.window_WinMgr||null;

  const log=(...x)=>console.log('[V8.6.4]',...x);

  const goodInt=x=>Number.isSafeInteger(Number(x))&&Number(x)>0;

  const eq=(a,b)=>String(a)===String(b);

  function task(){

    const t=qModel()?.taskInfo;if(!Array.isArray(t)||t[0]==null)return null;

    const c=qCfg(t[0]);return {id:String(t[0]),state:Number(t[1]),name:String(c?.[1]??t[0]),

      actionId:Number(c?.[6]??0),progress:t[2]??null};

  }

  const isCoBao=q=>!!q&&q.id===C.coBaoTaskId&&q.state!==2;

  function eligible(){

    try{

      const s=D.quickState();

      return !!s?.running && s.job==='rảnh' && !['entering','exiting','fighting'].includes(String(s.step))&&

        _Ba?._$a?.SceneUtil?.isCommonScene===true && !(typeof U?.busy==='function'&&U.busy());

    }catch(_){return false;}

  }

  function blockTuVuot(q=task()){

    if(!C.suspendTuVuotDuringCoBao||!C.enabled)return;

    if(isCoBao(q)){

      if(!S.paused){S.oldTuVuot=D.config.enableTuVuot===true;S.paused=true;log('Tam khoa Tu Vuot khi xu ly Co Bao');}

      D.config.enableTuVuot=false;

      const native=stage();if(native?.auto===true)native.auto=false;

    }else if(S.paused && q){

      if(C.restoreTuVuotAfterCoBao && S.oldTuVuot===true)D.config.enableTuVuot=true;

      S.paused=false;S.oldTuVuot=null;log('Chuyen sang nhiem vu ke tiep:',q.id,q.name);

    }

  }

  function panel(){

    const j=mgr();let a=null;

    try{a=typeof _Sa!=='undefined'?_Sa.getWindowCfgByFcId?.(C.coBaoActionId):null;}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

    const id=Number(a?.[0]);

    const open=!!j&&goodInt(id)&&j.isOpened?.(id)===true;

    const ui=open?(j.getPanelById?.(id)||j.getDialogById?.(id)||null):null;

    return {open,id:goodInt(id)?id:0,ui};

  }

  function value(dic,id){try{return dic?.get?.(id);}catch(_){return null;}}

  function fragments(){

    const x=m();const count=Array.isArray(x?.shenqi)?x.shenqi.length:null;

    const c=count===null?null:coCfg(count);

    const rows=Array.isArray(c?.[2])?c[2].map((id,index)=>({id:Number(id),index,

      owned:!!value(x?.frgmtsDic,id),placed:!!value(x?.epFrgmtsDic,id),

      stage: c?.[7]?.[index]??null})):[];

    return {count,config:c,rows,missing:rows.filter(r=>!r.owned&&!r.placed),

      ready:Array.isArray(x?.shenqi)&&x?.__gn===true&&rows.length>0&&rows.every(r=>goodInt(r.id)),

      owned:rows.find(r=>r.owned&&!r.placed)||null,

      allPlaced:rows.length>0&&rows.every(r=>r.placed)};

  }

  function reward(){

    const s=stage();const levels=s?.awardLvs;

    if(!Array.isArray(levels)||levels.length===0)return null;

    const lv=Number(levels[0]);

    if(!goodInt(lv)||!goodInt(s?.curLv)||Number(s.curLv)<=lv)return null;

    const c=stageCfg(lv);if(!Array.isArray(c)||!goodInt(c[0]))return null;

    

    let list=[];try{list=_ft?._h$?.ins?.award?.(c,lv)||[];}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

    return {lv,mapId:Number(c[0]),list:Array.isArray(list)?list:[],

      sig:`${s.curLv}:${lv}:${levels.join(',')}`};

  }

  function bagFragment(f,rewardData){

    const all=bag()?.getItemsByBagType?.(0);

    if(!bag()?.isBagInited||!Array.isArray(all))return null;

    const targets=new Set(f.rows.filter(x=>!x.owned&&!x.placed).map(x=>x.id));

    if(rewardData?.list)for(const a of rewardData.list){if(goodInt(a?.[0]))targets.add(Number(a[0]));}

    for(const row of all){

      if(!Array.isArray(row))continue;

      const id=Number(row[0]),num=Number(row[1]),uid=Number(row[2]);

      if(!goodInt(id)||!goodInt(uid)||num<1)continue;

      const meta=itemCfg(id),name=String(meta?.[1]??'');

      

      const norm=s=>String(s??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase();
      const itemName=norm(name),artifactName=norm(f.config?.[1]);
      const exactArtifact=targets.has(id)&&!!artifactName&&itemName.includes(artifactName);
      const namedFragment=/manh/.test(itemName)&&((artifactName&&itemName.includes(artifactName))||/co bao|huyen thien thanh lien/.test(itemName));
      const isTarget=(targets.has(id)&&(/manh/.test(itemName)||exactArtifact))||namedFragment||(/mảnh/i.test(name)&&

        ((f.config?.[1]&&name.toLocaleLowerCase().includes(String(f.config[1]).toLocaleLowerCase())) ||

        /cổ bảo|huyền thiên thanh liên/i.test(name)));

      if(!isTarget||(!/manh/.test(itemName)&&!exactArtifact))continue;

      if(typeof _et==='undefined'||![2,3].includes(Number(_et.getTypeById?.(id))))continue;

      if(itemTool()?.isManualGift?.(id)===true||itemTool()?.isManualGift2?.(id)===true)continue;

      if(itemTool()?.checkItemCanUseOrNotice?.(row,false)!==true)continue;

      return {id,uid,num,name,sig:`${uid}:${id}:${num}`};

    }

    return null;

  }

  function thienKiepPanel(){
    let cfg=null;try{cfg=typeof _Sa!=='undefined'?_Sa.getWindowCfgByFcId?.(C.thienKiepActionId):null;}catch(_){window.KVPV_V1?.diagnostics?.record(_);}
    const id=Number(cfg?.[0]),j=mgr(),open=goodInt(id)&&j?.isOpened?.(id)===true;
    return {id:goodInt(id)?id:0,open,ui:open?(j.getPanelById?.(id)||j.getDialogById?.(id)||null):null};
  }
  function thienKiepRedDotVisible(){return thienKiepPanel().ui?._uPn?.item?.rpImg?.visible===true;}
  function statusCore(){

    const q=task(),f=fragments(),r=reward(),i=bagFragment(f,r),p=panel();

    let step='other';

    if(q?.state===2)step='claimQuest';

    else if(isCoBao(q)){

      if(f.count!==null&&f.count>=C.requiredCoBao)step='waitQuest';

      else if(f.ready){

        if(r)step=!thienKiepPanel().open?'openStage':thienKiepRedDotVisible()?'claimStage':'waitStageRedDot';
        else if(i)step='use';
        else if(f.owned)step='put';
        else if(f.allPlaced)step='activate';

        else step='missing';

      }else step='fetch';

    }else if(q)step='nextQuest';

    const sig=step==='activate'||step==='put'?JSON.stringify([q?.id,q?.state,f.count,f.rows.map(x=>[x.id,x.owned,x.placed])]):

       step==='use'?i?.sig:step==='claimStage'?r?.sig:step==='fetch'?`${q?.id}:${f.count}:${!!m()?.__gn}`:

       `${q?.id}:${q?.state}:${q?.actionId}`;

    return {task:q,step,fragments:f,reward:r,item:i,panel:p,sig};

  }

  function permitted(action,state){

    const k=action+'|'+state.sig;const old=S.last.get(action);

    if(old?.sig===state.sig && time()-old.at<C.ackWaitMs)return false;

    if((S.attempts.get(k)||0)>=C.retryLimitPerState)return false;

    return true;

  }

  function mark(action,state){

    const k=action+'|'+state.sig;

    S.last.set(action,{sig:state.sig,at:time()});

    S.attempts.set(k,(S.attempts.get(k)||0)+1);

  }

  function once(action,state,perform){

    blockTuVuot();

    if(!C.enabled||!eligible())throw Error('Dang ban, chua the thao tac an toan');

    const fresh=statusCore();

    if(fresh.step!==action||fresh.sig!==state.sig||!permitted(action,fresh))throw Error('State chua san sang/cho server');

    perform(fresh);mark(action,fresh);return true;

  }

  function click(btn){

    if(!btn||btn.visible!==true||btn.gray===true||btn.disabled===true||typeof btn.event!=='function')return false;

    btn.event(typeof Laya!=='undefined'&&Laya.Event?.CLICK?Laya.Event.CLICK:'click');return true;

  }

  const actions=[
    {id:'v864_open_thien_kiep',kind:'work',name:'Co Bao: Mo Thien Kiep khi co red dot',spend:'none',hourlyLimit:30,step:'openStage',
      allow:()=>true,perform:()=>{
        if(thienKiepPanel().open)return;
        if(typeof mgr()?.openByActionId!=='function')throw Error('Khong co native openByActionId');
        mgr().openByActionId(C.thienKiepActionId);log('MO THIEN KIEP (46), red dot=',stage()?.awardLvs?.[0]);}},

    {id:'v864_activate',kind:'claim',name:'Co Bao: Kich hoat khi du manh',spend:'none',hourlyLimit:12,step:'activate',

      allow:()=>C.activateCoBao,perform:p=>{

        if(!p.fragments.allPlaced)throw Error('Chua du so manh da dat');

        const x=p.panel.ui;

        if(x){if(Number(x.idx)!==p.fragments.count){x.idx=p.fragments.count;x._PMi?.();}

          if(Number(x.idx)===p.fragments.count&&click(x.activateBtn)){S.activations++;log('BAM KICH HOAT qua UI');return;}}

        if(typeof rpc()?.actShenQi!=='function')throw Error('Thieu RPC actShenQi');

        rpc().actShenQi();S.activations++;log('KICH HOAT qua client RPC, doi server');}},

    {id:'v864_put',kind:'work',name:'Co Bao: Dat manh',spend:'materials',hourlyLimit:30,step:'put',

      allow:()=>C.putFragments,perform:p=>{

        const frag=p.fragments.owned; if(!frag||!frag.owned||frag.placed)throw Error('Khong co manh co the dat');

        const x=p.panel.ui;

        if(x){if(Number(x.idx)!==p.fragments.count){x.idx=p.fragments.count;x._PMi?.();}

          if(x._dMi){x._dMi.selIdx=frag.index;x._xMi?.();}

          if(Number(x.idx)===p.fragments.count&&Number(x._dMi?.selIdx)===frag.index&&click(x.fragmentCtrlBtn)){

            S.places++;log('BAM DAT MANH qua UI',frag.id);return;

          }}

        if(typeof rpc()?.epFragment!=='function')throw Error('Thieu epFragment');

        rpc().epFragment([frag.id]);S.places++;log('DAT MANH qua RPC',frag.id);}},

    {id:'v864_use',kind:'work',name:'Co Bao: Dung manh trong tui',spend:'materials',hourlyLimit:25,step:'use',

      allow:()=>C.useFragmentItem,perform:p=>{

        const x=p.item;if(!x)throw Error('Khong co manh chua dung');

        const rows=bag()?.getItemsByBagType?.(0)||[];

        const row=rows.find(a=>Array.isArray(a)&&eq(a[2],x.uid)&&eq(a[0],x.id));

        if(!row||!goodInt(row[1])||itemTool()?.checkItemCanUseOrNotice?.(row,false)!==true)throw Error('Vat pham da thay doi');

        

        if(typeof bagRpc()?.c2sUseBagItem!=='function')throw Error('Thieu RPC dung vat pham');

        bagRpc().c2sUseBagItem(x.uid,x.id,1);S.uses++;log('DUNG MANH',x.name,x.id);}},

    {id:'v864_claim_stage',kind:'claim',name:'Co Bao: Nhap Nhan thuong ai',spend:'none',hourlyLimit:25,step:'claimStage',

      allow:()=>C.claimStageReward,perform:p=>{

        const r=p.reward;if(!r||!goodInt(r.mapId)||!goodInt(r.lv))throw Error('Khong co thuong ai');
        if(!thienKiepRedDotVisible())throw Error('Red dot Nhap Nhan chua hien');

        const levels=stage()?.awardLvs||[];

        if(Number(levels[0])!==r.lv||Number(stage()?.curLv)<=r.lv)throw Error('Thuong ai da thay doi');

        if(typeof stageRpc()?.getCpAward!=='function')throw Error('Khong co client getCpAward');

        stageRpc().getCpAward(r.mapId,r.lv);S.stageClaims++;

        log('NHAP NHAN thuong ai',r.lv,'map',r.mapId,'cho server');}},

    {id:'v864_fetch',kind:'claim',name:'Co Bao: Doc thong tin manh',spend:'none',hourlyLimit:6,step:'fetch',

      allow:()=>true,perform:()=>{if(typeof rpc()?.getShQiInfo!=='function')throw Error('Thieu getShQiInfo');rpc().getShQiInfo();log('Dong bo manh Co Bao');}}

  ];

  for(const x of actions){

    try{

      V.register({id:x.id,name:x.name,kind:x.kind,spend:x.spend,verified:true,enabled:true,

        redIds:[],background:false,cooldownMs:2000,hourlyLimit:x.hourlyLimit,

        probe:()=>{const p=statusCore();return {ready:C.enabled&&x.allow()&&eligible()&&isCoBao(p.task)&&p.step===x.step&&permitted(x.step,p),signature:p.sig??'no-data'};},

        run:old=>once(x.step,{sig:old.signature},x.perform)});S.ids.push(x.id);

    }catch(e){console.warn('[V8.6.4] Khong dang ky',x.id,e);}

  }

  

  function openCoBao(){

    const p=statusCore(),openKey=`${p.task?.id}:${p.task?.state}:${p.step}:${p.sig}`;
    if(!isCoBao(p.task)||!eligible()||p.panel.open||S.coBaoOpenKey===openKey)return false;

    if(typeof mgr()?.openByActionId!=='function')return false;

    if(time()-S.navAt<C.openEveryMs)return false;

    mgr().openByActionId(C.coBaoActionId);S.navAt=time();S.coBaoOpenKey=openKey;log('Di den Co Bao (189), KHONG mo Tu Vuot');return true;

  }

  

  

  function followNextQuest(p){

    if(!C.continueNextQuests||!C.openNextQuestOnce||!eligible()||!p.task||p.task.state===2)return false;

    if(isCoBao(p.task))return false;

    const q=p.task,key=`${q.id}:${q.state}:${q.actionId}`;

    if(!goodInt(q.actionId)||S.navKey===key)return false;

    if(q.actionId===46&&!C.autoNavigateToTuVuotForOtherQuests){

      S.navKey=key;console.warn('[V8.6.4] Nhiem vu tiep theo can Tu Vuot, da de nghi dung rieng:',q);return false;

    }

    if(typeof mgr()?.openByActionId!=='function')return false;

    

    mgr().openByActionId(q.actionId);S.navKey=key;

    log('Da mo DI DEN nhiem vu ke tiep',q.id,q.name,'actionId',q.actionId);

    return true;

  }

  function loop(){

    if(!C.enabled)return;

    const p=statusCore();blockTuVuot(p.task);

    const key=p.task?.id+':'+p.task?.state;

    if(S.questKey!==key){S.questKey=key;log('NHIEM VU:',p.task?.id,p.task?.name,'state',p.task?.state);}

    const note=`${key}|${p.step}|${p.sig}`;

    if(note!==S.lastMessage||time()-S.lastMessageAt>300000){

      S.lastMessage=note;S.lastMessageAt=time();

      log('BUOC',p.step,p.step==='missing'?'Thieu manh: dung lai, KHONG tu farm':'' ,

        p.step==='missing'?p.fragments.missing:'');

    }

    if(isCoBao(p.task)){

      

      if(C.openCoBaoUI&&['put','activate'].includes(p.step)&&

         time()-S.navAt>=C.openEveryMs)openCoBao();

    }else if(p.task){followNextQuest(p);}

  }

  

  function report(print=true){

    const p=statusCore(),out={task:p.task,step:p.step,coBaoActivated:p.fragments.count,

      fragments:p.fragments.rows,missing:p.fragments.missing,readyStage:p.reward,

      readyItem:p.item,uiOpen:p.panel.open,thienKiepPanelOpen:thienKiepPanel().open,
      thienKiepRedDot:thienKiepRedDotVisible(),autoTuVuot:D.config.enableTuVuot,

      attempts:[...S.attempts.entries()],stats:{stage:S.stageClaims,use:S.uses,put:S.places,activate:S.activations},

      nextQuestNavigation:S.navKey};

    if(print){console.table([{task:p.task?.id,status:p.task?.state,step:p.step,

       coBao:p.fragments.count,thuongAi:p.reward?.lv??'-',manhTui:p.item?.name??'-',

       missing:p.fragments.missing.length,tuVuot:D.config.enableTuVuot}]);

       if(p.fragments.rows.length)console.table(p.fragments.rows);

       if(p.item)console.log('[V8.6.4] Manh co the DUNG',p.item);}

    return out;

  }

  function manual(action){

    const def=actions.find(a=>a.step===action);if(!def)return false;

    const p=statusCore();if(!isCoBao(p.task)||p.step!==action)return false;

    return once(action,{sig:p.sig},def.perform);

  }

  const api={config:C,task,plan:statusCore,preview:()=>report(true),status:()=>report(true),

    nhapNhan:()=>manual('claimStage'),dung:()=>manual('use'),datManh:()=>manual('put'),

    kichHoat:()=>manual('activate'),diDen:openCoBao,

    next:()=>followNextQuest(statusCore()),

    start(){C.enabled=true;for(const id of S.ids){try{V.toggle(id,true);}catch(_){window.KVPV_V1?.diagnostics?.record(_);}}

      if(!S.timer)S.timer=__KVPV29.every(()=>{try{loop();}catch(e){console.warn('[V8.6.4]',e);}},C.watchMs);

      loop();return true;},

    stop(){C.enabled=false;if(S.timer)__KVPV29.cancel(S.timer);S.timer=null;

      for(const id of S.ids){try{V.toggle(id,false);}catch(_){window.KVPV_V1?.diagnostics?.record(_);}}

      if(S.paused&&C.restoreTuVuotAfterCoBao&&S.oldTuVuot===true)D.config.enableTuVuot=true;

      S.paused=false;S.oldTuVuot=null;return true;}

  };

  W.KVPV_V864=api;api.start();

  log('DA BAT: NhapNhan ải -> Dung manh -> Dat manh -> Kich hoat -> tiep tuc nhiem vu. KVPV_V864.status()');

})();



/* KVPV V8.6.5 - KE THANG LAM VUA / DAU TRUONG (FC 165; PANEL 289)
 * Based on verified game-client logic:
 * _Ba._tjt._ljt.ins.times = [cooldownUntil, max, remaining, ..., bestRank, quickMode]
 * _Ba._tjt._ljt.ins.objs = three opponents [playerId,...,power,rank,...] + current user at [3].
 * _Ba._tjt._vjt.ins.challengeArena(opponentId, -1) : normal fight
 * _Ba._tjt._vjt.ins.challengeArena(opponentId, 1) : one existing QUICK fight attempt
 * Quick mode only allowed by game's UI when quick toggle=true, creRoleDay >=2,
 * opponent rank is better and remaining>0. Never buys attempts or resets cooldown.
 * Only runs for active main quest whose actionId=165 or title matches Ke Thang Lam Vua.
 */

(() => {

  'use strict';

  const W=window, V=W.KVPV_V8, D=W.KVPV_DAILY, U=W.KVPV_UPGRADES;

  if(!V?.register||!V?.toggle||!D?.quickState||typeof _Ba==='undefined'||typeof _ft==='undefined'){

    console.error('[V8.6.5] Hay nap V8.6.4 FULL (hoac V8.6.5 FULL) dung game-frame truoc.');return;

  }

  try{W.KVPV_V865?.stop?.();}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

  // Do not register a duplicate plugin when user pastes the addon twice.

  if(W.KVPV_V865?.installed){console.log('[V8.6.5] Da cai - goi KVPV_V865.start()');W.KVPV_V865.start();return;}



  const C={enabled:true,actionId:165,panelId:289,scanMs:1500,

    openPanel:true,navCooldownMs:45000,infoCooldownMs:25000,

    onlyWhileQuest:true,allowQuick:true,quickCount:1,

    minPowerAdvantage:1.08, // refuse opponents stronger than the player's power safety margin

    cooldownAfterRequestMs:65000,maxRequestsSameState:2,

    maxChallengesPerQuest:10, // never buy extra daily attempts

    allowBuyAttempts:false,allowResetCooldown:false};

  const S={timer:null,pluginId:'v865_kingArenaFight',enabled:true,

    navAt:0,infoAt:0,lastSig:'',lastRequestAt:0,attempts:new Map(),

    questId:'',quests:new Map(),day:'',totalSent:0,step:'init',lastInfo:'',lastInfoAt:0};

  const now=()=>Date.now();

  const l=(...a)=>console.log('[V8.6.5]',...a);

  const num=x=>Number(x);

  const obj=()=>_Ba?._tjt?._ljt?.ins;

  const api=()=>_Ba?._tjt?._vjt?.ins;

  const qm=()=>_Ba?._zIt?._FIt?.ins;

  const taskCfg=id=>_ft?.__Z?.ins?.getTaskCfgById?.(id);

  const manager=()=> (typeof _j!=='undefined'&&_j?.ins)||W.window_WinMgr||null;

  const dateVN=()=>W.KVPV_DAILY_CLOCK?.key?.()??new Date(Date.now()+2*3600000).toISOString().slice(0,10);

  const timeSV=()=> typeof _Sa!=='undefined'?num(_Sa.svrTime):Date.now();

  function task(){

    const r=qm()?.taskInfo;if(!Array.isArray(r)||r[0]==null)return null;

    const cfg=taskCfg(r[0]);return {id:String(r[0]),state:num(r[1]),

      name:String(cfg?.[1]??r[0]),actionId:num(cfg?.[6]??0),progress:r[2]??null};

  }

  const match=q=>!!q&&q.state!==2&&(q.actionId===C.actionId||/k[eẻ] ?th[aắ]ng ?l[aà]m ?vua|ke ?thang ?lam ?vua/i.test(q.name));

  function idle(){

    try{const s=D.quickState();return !!s?.running&&s.job==='rảnh'&&

      !['entering','exiting','fighting'].includes(String(s.step))&&

      _Ba?._$a?.SceneUtil?.isCommonScene===true&&

      !(typeof U?.busy==='function'&&U.busy())&&

      !(typeof _x!=='undefined'&&Number(_x.currentID)===2281)&&

      // The game's victory/defeat dialogs handle award display and return automatically.

      ![292,293,1708].some(id=>manager()?.isOpened?.(id)===true);

    }catch(_){return false;}

  }

  

  function snapshot(){

    const q=task(),m=obj(),t=m?.times,opps=m?.objs;

    const attempts=Array.isArray(t)?num(t[2]):NaN;

    const until=Array.isArray(t)?num(t[0]):NaN;

    const current=Array.isArray(opps)&&Array.isArray(opps[3])?opps[3]:null;

    const myRank=num(current?.[4]);

    const myPower=num(_Ba?._qo?._Ro?.ins?.fight);

    const candidates=Array.isArray(opps)?opps.slice(0,3).map((p,i)=>({

      index:i,id:num(p?.[0]),name:String(p?.[2]??''),power:num(p?.[3]),rank:num(p?.[4])

    })).filter(p=>Number.isSafeInteger(p.id)&&p.id>0&&Number.isFinite(p.rank)&&p.rank>0):[];

    // Match the UI: fight someone who outranks the player. Avoid much stronger opponents.

    const viable=candidates.filter(p=>Number.isFinite(myRank)&&myRank>p.rank&&

      Number.isFinite(myPower)&&myPower>0&&Number.isFinite(p.power)&&p.power>0&&

      myPower >= p.power*C.minPowerAdvantage).sort((a,b)=>a.rank-b.rank);

    const target=viable[0]??null;

    const cd=Number.isFinite(until)&&until>timeSV();

    const quick=!!(C.allowQuick&&Array.isArray(t)&&t[5]===true||

      C.allowQuick&&Array.isArray(t)&&t[5]===1);

    const age=num(_Ba?._rJ?._O$?.ins?.creRoleDay ?? _Ba?._rJ?._O$?.ins?.nDay);

    const quickAllowed=quick&&age>=2&&!!target&&attempts>0;

    const sig=JSON.stringify([q?.id,q?.state,q?.progress,Array.isArray(t)?t.slice(0,6):null,

      current?.[4],candidates.map(p=>[p.id,p.power,p.rank])]);

    const day=dateVN();

    if(S.day!==day){S.day=day;S.quests.clear();S.attempts.clear();S.lastSig='';S.totalSent=0;}

    if(q?.id!==S.questId){S.questId=q?.id??'';S.lastSig='';S.lastRequestAt=0;S.attempts.clear();}

    const questCount=S.quests.get(q?.id)??0;

    let step='not-a-quest';

    if(!C.enabled)step='disabled';

    else if(match(q)){

      step=!Array.isArray(t)||!Array.isArray(opps)?'need-data':

        !Number.isFinite(attempts)?'need-data':

        attempts<=0?'no-attempts':cd?'cooldown':

        !target?'no-safe-opponent':

        questCount>=C.maxChallengesPerQuest?'quest-limit':

        'ready';

    }

    return {task:q,step,attempts,until,cd,myRank,myPower,candidates,target,

      quick,quickAllowed,age,questCount,sig};

  }

  function permit(p){

    if(!match(p.task)||!idle()||p.step!=='ready'||!C.enabled)return false;

    const prev=S.attempts.get(p.sig)||0;

    if(prev>=C.maxRequestsSameState)return false;

    if(S.lastSig===p.sig&&now()-S.lastRequestAt<C.cooldownAfterRequestMs)return false;

    if(S.lastRequestAt&&now()-S.lastRequestAt<15000)return false;

    return typeof api()?.challengeArena==='function';

  }

  function runFight(p){

    const fresh=snapshot();if(fresh.sig!==p.sig||!permit(fresh))throw Error('Dau truong: trang thai da thay doi/cho server');

    const cur=obj();if(!Array.isArray(cur?.times)||cur.times[2]<=0||!fresh.target)throw Error('Dau truong: khong co luot');

    // Honor quick-mode toggle. The official dialog ultimately calls challengeArena(id,n).

    const times=fresh.quickAllowed?Math.min(Math.max(1,Math.floor(C.quickCount)),fresh.attempts): -1;

    if(times!==-1&&(!fresh.quickAllowed||times<=0))throw Error('Quick mode chua mo');

    S.lastSig=fresh.sig;S.lastRequestAt=now();S.attempts.set(fresh.sig,(S.attempts.get(fresh.sig)||0)+1);

    S.quests.set(fresh.task.id,(S.quests.get(fresh.task.id)||0)+(times>0?times:1));S.totalSent++;

    // This is the same method the real arena UI uses on opponent click / quick confirmation.

    api().challengeArena(fresh.target.id,times);

    l('DA GUI KHIEU CHIEN',fresh.target.name,'rank',fresh.target.rank,

      'method',times>0?'QUICK':'NORMAL','luot truoc',fresh.attempts,

      'Task',fresh.task.id,'- cho server xac nhan');

  }

  try{V.register({id:S.pluginId,name:'Ke Thang Lam Vua: khieu chien mien phi',

    kind:'work',verified:true,enabled:true,spend:'none',background:false,redIds:[],

    hourlyLimit:35,cooldownMs:14000,

    probe:()=>{const p=snapshot();return {ready:permit(p),signature:p.sig};},

    run:old=>{const p=snapshot();if(p.sig!==String(old.signature))throw Error('Arena signature stale');runFight(p);}

  });}catch(e){

    console.warn('[V8.6.5] Dang ky module that bai',e);

    // If duplicate after hot-reload, don't create another timer with competing logic.

    return;

  }

  function maybeOpen(p){

    if(!C.enabled||!C.openPanel||!match(p.task)||!idle())return;

    const w=manager();if(!w)return;

    if(w.isOpened?.(C.panelId)!==true&&now()-S.navAt>=C.navCooldownMs){

      if(typeof w.openByActionId==='function'){

        S.navAt=now();w.openByActionId(C.actionId);l('MO giao dien KE THANG LAM VUA 165');

      }

      return;

    }

    if(p.step==='need-data'&&now()-S.infoAt>=C.infoCooldownMs&&typeof api()?.getArena==='function'){

      S.infoAt=now();api().getArena();l('Yeu cau du lieu luot danh Arena');

    }

  }

  function scan(){

    const p=snapshot();maybeOpen(p);

    const note=`${p.task?.id??'-'}|${p.task?.state??'-'}|${p.step}`;

    if(note!==S.lastInfo||now()-S.lastInfoAt>240000){

      S.lastInfo=note;S.lastInfoAt=now();

      if(match(p.task))l('NHIEM VU',p.task?.id,p.task?.name,'buoc',p.step,

        'luot',Number.isFinite(p.attempts)?p.attempts:'chua co du lieu',

        'rank',p.myRank,'doi thu',p.target?.name??'-');

      else if(S.totalSent>0)l('Nhiem vu Arena da roi bo / da hoan thanh; tra luong cho V8.6.4:',p.task?.id,p.task?.name);

    }

  }

  

  function status(){const p=snapshot();const result={task:p.task,step:p.step,remaining:p.attempts,

    cooldownUntil:p.until,myRank:p.myRank,myPower:p.myPower,opponents:p.candidates,

    chosen:p.target,quickSelected:p.quick,quickAllowed:p.quickAllowed,roleDay:p.age,

    attemptedForQuest:p.questCount,canFight:permit(p),totalSent:S.totalSent,

    autoNextQuest:typeof W.KVPV_V864?.next==='function'};

    console.table([{nhiemVu:p.task?.name,id:p.task?.id,actionId:p.task?.actionId,

      buoc:p.step,luot:p.attempts,hang:p.myRank,doiThu:p.target?.name??'-',

      nhanh:p.quickAllowed,daGui:p.questCount}]);

    if(p.candidates.length)console.table(p.candidates);

    return result;

  }

  const service={installed:true,config:C,task,preview:status,status,snapshot,

    start(){C.enabled=true;try{V.toggle(S.pluginId,true);}catch(e){console.warn(e);}

      if(!S.timer)S.timer=__KVPV29.every(()=>{try{scan();}catch(e){console.warn('[V8.6.5] scan',e);}},C.scanMs);

      scan();return true;},

    stop(){C.enabled=false;try{V.toggle(S.pluginId,false);}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

      if(S.timer)__KVPV29.cancel(S.timer);S.timer=null;return true;},

    tick:scan};

  W.KVPV_V865=service;service.start();

  l('DA BAT: Tu khieu chien KE THANG LAM VUA, tu dung luot MIEN PHI, khong mua/reset CD. Dung KVPV_V865.status()');

})();









(() => {

  'use strict';

  const W=window, D=W.KVPV_DAILY, Q=W.KVPV_V86, C64=W.KVPV_V864, A65=W.KVPV_V865;

  if (!D?.config || !D?.quickState || typeof _Ba==='undefined' || typeof _ft==='undefined') {

    console.error('[V8.6.6] Nap FULL V8.6.5 vao dung game-frame truoc.'); return;

  }

  if(W.KVPV_V866?.installed){W.KVPV_V866.start?.();console.log('[V8.6.6] Da co, tiep tuc chay');return;}

  try { W.KVPV_V866?.stop?.(); } catch (e) { console.warn('[V8.6.6] Old director stop',e); }

  const config = {

    enabled:true, scanMs:2000,

    questFirst:true,

    suspendSideJobs:true, // Only ordinary optional jobs; do not disable timed events.

    preferExpForLevel:true,

    enableVerifiedExp4Account:false, // SOLO: 4-account EXP disabled

    autoPublicExpMatching:false, // Enabled by MAIN SOLO supervisor only for verified character-level quests.

    publicMatchCooldownMs:240000,

    maxPublicMatchRequestsPerQuest:1, // Unknown ACK: do not automatically replay a matching request.

    allowStageAutoWhenQuestNeedsIt:true,

    allowSoloIdleActivitiesWhenExpUnavailable:true, // Stage/Yeu Vuong only if no EXP match can be sent or is pending

    openUnknownQuestOnce:true, // Navigation only. Unknown quests are NOT completed.

    openCooldownMs:90000,

    infoEveryMs:120000,

    neverBuyTurns:true,

    manualExpActionId:0, // Do NOT assume red-point 53 equals an actionId.

  };

  const S={timer:null,stopped:false,questKey:'',lastQuest:null,opened:new Map(),

    lastNotice:'',lastNoticeAt:0,history:[],saved:new Map(),

    lastProgressSig:'',progressAt:0,changeCount:0,lastRoute:null,

    publicAttempts:new Map(),publicSentEvidence:new Map(),lastPublicMatch:0,publicSent:0};

  const custom=new Map();

  const now=()=>Date.now();

  const positive=x=>Number.isSafeInteger(Number(x))&&Number(x)>0;

  const strip=s=>String(s??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[đĐ]/g,'d').toLowerCase();

  const qm=()=>_Ba?._zIt?._FIt?.ins;

  const getCfg=id=>_ft?.__Z?.ins?.getTaskCfgById?.(id);

  const role=()=>_Ba?._rJ?._O$?.ins;

  const mgr=()=> (typeof _j!=='undefined'&&_j?.ins)||W.window_WinMgr||null;

  const expModel=()=>_Ba?._cm?._vJ?.ins;

  const expTeam=()=>_Ba?._cm?._q3t?.ins;

  const expRpc=()=>_Ba?._cm?._u3t?.ins;

  const expMatchArgs=()=>[2,'Tên Phòng',2091,1,0,0,0,1,true,false];

  const gameScene=()=>_Ba?._$a?.SceneUtil;

  const log=(...a)=>console.log('[V8.6.6]',...a);

  function task(){

    const m=qm(),t=m?.taskInfo;

    if(!Array.isArray(t)||t[0]===undefined||t[0]===null)return null;

    const cfg=getCfg(t[0]);

    return {id:String(t[0]),name:String(cfg?.[1]??t[0]),state:Number(t[1]),

      actionId:Number(cfg?.[6]??0),progress:t[2]??null,

      characterLevel:Number(role()?.level),characterId:String(role()?.actorId??'')};

  }

  function routeName(q){

    if(!q)return 'no-data';

    if(q.state===2)return 'claim';

    if(q.state!==0&&q.state!==1&&q.state!==3&&Number.isFinite(q.state))return 'wait-state';

    if(q.id==='m1094'||(q.actionId===189&&/co bao|shenqi/.test(strip(q.name))))return 'cobao';

    if(q.actionId===165||/ke thang lam vua/.test(strip(q.name)))return 'arena';

    if(q.actionId===46)return 'stage';

    const name=strip(q.name);

    const bad=/(phu van|co bao|trang bi|than khi|ky nang|pet|canh|tu vi|thien phu|ngoc|cuong hoa|tien vi)/;

    const isLevel=/(?:\b(?:dat|len|tang)\s+cap\b|\bcap\s+(?:nhan vat|dat|den)\b|\bnhan vat\b.{0,22}\bcap\b|\b(?:level|lv)\s*\d+\b)/.test(name);

    if(!bad.test(name)&&isLevel)return 'level-exp';

    if(/pho ban exp|(?:^|\W)exp(?:\W|$)|kinh nghiem/.test(name))return 'level-exp';

    return 'unknown';

  }

  function levelRequirement(q){

    const s=strip(q?.name);

    if(!/(?:dat|len|tang|nhan vat|level|lv|cap)/.test(s))return null;

    const m=/(?:cap|level|lv)\s*(\d{1,4})\b/.exec(s);

    return m?Number(m[1]):null;

  }

  function expStatus(q){

    const E=expModel(), exp=W.KVPV_EXP_4ACC;

    const remaining=Number(E?.remainTimes);

    const red=(()=>{try{return _Ba?._Xo?._Ko?.instance?.getRpKeyState?.(53)===true;}catch(_){return false;}})();

    const target=levelRequirement(q),current=Number(role()?.level), leader=exp?.role==='leader';

    const hasModel=!!E&&Number.isFinite(remaining),

      ready=leader && hasModel && remaining>0 && red && !!D.quickState()?.running;

    const team=expTeam();

    const teamKnown=typeof team?.getHasTeams==='function';

    const hasTeam=teamKnown?!!team.getHasTeams():true;

    const inOtherMission=_Ba?._$a?._yo?.ins?.isInMission===true;

    // The original game EXP button checks remainTimes > 0, not red point 53.

    // The red indicator may be absent even though a free matchmaking turn exists.

    const publicReady=!leader && config.autoPublicExpMatching && hasModel &&

      remaining>0 && !!D.quickState()?.running && teamKnown && !hasTeam &&

      !positive(team?.roomId) && !inOtherMission &&

      typeof expRpc()?.creSerAreRoom==='function';

    let reason='';

    if(Number.isFinite(current)&&target!==null&&current>=target)reason='Da du cap; doi server cap nhat task';

    else if(!hasModel)reason='Chua dong bo du lieu phu ban EXP';

    else if(remaining<=0)reason='Het luot EXP mien phi';

    else if(!leader&&publicReady)reason='San sang ghep doi EXP cong khai bang nut MATCH cua game';

    else if(!leader)reason='EXP 4 acc chi ho tro leader; ghep doi cong khai chua san sang (doi/room/scene)';

    else if(!red)reason='Chua co dau EXP san sang';

    else reason='EXP 4 acc san sang; cho hang doi chung';

    return {currentLevel:Number.isFinite(current)?current:null,targetLevel:target,

      remaining:Number.isFinite(remaining)?remaining:null,red,role:exp?.role??'missing',

      ready,publicReady,teamKnown,hasTeam,reason,job:D.quickState()?.job??null};

  }

  function busy(ownQueue=false){

    const p=D.quickState();

    return !p?.running||p.job!=='rảnh'||

      p.step==='entering'||p.step==='exiting'||p.step==='fighting'||

      gameScene()?.isCommonScene!==true||

      // While executing its OWN queue job, pending is necessarily true.

      // Only skip that single queue test in run(), never in probe().

      (!ownQueue && typeof W.KVPV_UPGRADES?.busy==='function' && W.KVPV_UPGRADES.busy());

  }

  // Safely manage only values this addon itself changed.

  function forceSetting(key,want){

    if(!Object.prototype.hasOwnProperty.call(D.config,key))return;

    if(!S.saved.has(key))S.saved.set(key,{original:D.config[key],forced:want});

    else S.saved.get(key).forced=want;

    if(D.config[key]!==want)D.config[key]=want;

  }

  function restoreSetting(key){

    const rec=S.saved.get(key);if(!rec)return;

    if(D.config[key]===rec.forced)D.config[key]=rec.original;

    S.saved.delete(key);

  }

  function restoreAll(){for(const key of [...S.saved.keys()])restoreSetting(key);}

  function policy(q,route){

    if(!config.questFirst||!q){restoreAll();return;}

    // V8.6.4 Co Bao logic is preserved, but its old generic Di Den is superseded.

    if(C64?.config)C64.config.continueNextQuests=false;

    // V8.6.31: do not starve the SOLO account when its quest is character EXP

    // but no verified/free public MATCH is available. Never start a stage or

    // Yeu Vuong while an EXP MATCH is unconfirmed, a team exists, or combat runs.

    const ds=D.quickState?.()||{};

    const team=expTeam();

    const stageModel=_Ba?._Co?._Mo?.ins;

    let stageMap=0;

    try{stageMap=Number(_ft?._h$?.ins?.getCfgByLv?.(stageModel?.curLv)?.[0]||0);}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

    const nativeStageBusy=route==='level-exp' && stageModel?.auto===true &&

      stageMap>0 && Number(_Ba?._$a?._yo?.ins?.intoSce?.[0])===stageMap;

    const safeSolo=(ds.running===true && ds.job==='rảnh' &&

      !_Ba?._$a?._yo?.ins?.isInMission && !_Ba?._$a?._yo?.ins?.isInArena &&

      !team?.getHasTeams?.() && !positive(team?.roomId) &&

      !W.KVPV_UPGRADES?.busy?.());

    const x=route==='level-exp'?expStatus(q):null;

    const publicCanMatch=!!x?.publicReady && config.autoPublicExpMatching===true &&

      (S.publicAttempts.get(q.id)||0)<config.maxPublicMatchRequestsPerQuest;

    const unknownMatch=S.publicSentEvidence.has(q.id);

    const idleFallback=route==='level-exp' &&

      config.allowSoloIdleActivitiesWhenExpUnavailable===true &&

      safeSolo && !publicCanMatch && !unknownMatch &&

      (gameScene()?.isCommonScene===true || nativeStageBusy);

    S.soloFallbackActive=idleFallback;

    S.soloFallbackReason=route!=='level-exp'?'Quest khong phai cap nhan vat':

      unknownMatch?'Da gui EXP MATCH; cho server xac nhan, khong chen BOSS/ai':

      publicCanMatch?'EXP MATCH san sang, uu tien ghep doi':

      !safeSolo?'Nhan vat dang trong team/tran/queue':

      idleFallback?'EXP khong ghep duoc, cho phep Tu Vuot va Yeu Vuong':

      'Khong du dieu kien fallback';

    if(route==='stage'&&config.allowStageAutoWhenQuestNeedsIt){

      restoreSetting('enableTuVuot');

    }else if(idleFallback){

      restoreSetting('enableTuVuot');

      // User opted into normal SOLO background progression, only while no

      

      D.config.enableTuVuot=true;

    }else if(!nativeStageBusy)forceSetting('enableTuVuot',false);

    // Keep EXP enabled THROUGH a running EXP instance, even when the remaining

    // attempts/red indicator disappears as the battle starts. Otherwise the

    // existing 4-account helper would stop while members are gathering.

    const inExp=D.quickState()?.job==='exp'||

      _Ba?._cm?._q3t?.ins?.getHasTeamByType?.(2)===true;

    if(route==='level-exp'&&config.preferExpForLevel&&config.enableVerifiedExp4Account &&

       (expStatus(q).ready || (W.KVPV_EXP_4ACC?.role==='leader'&&inExp))){

      forceSetting('enableExp',true);

    }else if(inExp && S.saved.has('enableExp') && D.config.enableExp===true){

      // Let active EXP complete instead of aborting another quest's run.

    }else forceSetting('enableExp',false);

    // Stop regular unrelated jobs from taking turns away from the current main quest.

    const keys=['enableTienDuyen','enableCrystal','enableYeuVuong','enableCompose','enableTuyetHoc','enableTinhThan'];

    for(const key of keys){

      if(key==='enableYeuVuong' && idleFallback){

        restoreSetting(key);

        D.config.enableYeuVuong=true; // Use free/verified native boss routine only

      }else if(config.suspendSideJobs)forceSetting(key,false);

      else restoreSetting(key);

    }

    // Timed special events retain their own schedule, do not automatically shut them off.

  }

  

  function note(key,message,meta){

    if(S.lastNotice===key&&now()-S.lastNoticeAt<config.infoEveryMs)return;

    S.lastNotice=key;S.lastNoticeAt=now();

    const ev={time:new Date().toISOString(),message,...meta};

    S.history.push(ev);if(S.history.length>150)S.history.shift();

    log(message,meta??'');

  }

  function open(id,q,tag){

    if(!positive(id)||busy()||typeof mgr()?.openByActionId!=='function')return false;

    const key=`${q.id}|${tag}|${id}`;

    if(S.opened.has(key) && (tag==='CHUA CO HANDLER'||tag==='CAP:quest-action'||tag==='EXP:manual-config'))return false;

    if(now()-(S.opened.get(key)||0)<config.openCooldownMs)return false;

    mgr().openByActionId(Number(id));S.opened.set(key,now());

    log('DI DEN',tag,'task',q.id,'actionId',id,'(CHUA xem la hoan thanh)');

    return true;

  }

  function assign(q,route){

    switch(route){

      case 'claim':

        // The existing V8.6 handler independently claims only when state===2.

        note(q.id+'|claim','Nhiem vu da xong: cho V8.6 nhan thuong',{id:q.id});

        return 'wait-claim-server';

      case 'cobao':

        if(C64?.config&&!C64.config.enabled)C64.start?.();

        note(q.id+'|cobao','Chuyen Co Bao cho V8.6.4',{id:q.id,step:C64?.plan?.()?.step??'unknown'});

        return C64?.config?.enabled?'waiting-cobao-server':'missing-cobao-module';

      case 'arena':

        if(A65?.config&&!A65.config.enabled)A65.start?.();

        note(q.id+'|arena','Giao nhiem vu Arena cho V8.6.5; chi doi khi state=2 / doi task ID',{id:q.id,arena:A65?.snapshot?.()?.step??'missing'});

        return A65?.config?.enabled?'waiting-arena-server':'missing-arena-module';

      case 'stage':

        note(q.id+'|stage','Nhiem vu Vuot Ai: mo module Tu Vuot neu dang bat',{id:q.id,enabled:D.config.enableTuVuot});

        return D.config.enableTuVuot?'waiting-stage':'stage-disabled';

      case 'level-exp': {

        const x=expStatus(q);

        note(q.id+'|level-exp|'+x.reason,'Nhiem vu CAP nhan vat: Uu tien EXP',{id:q.id,exp:x});

        if(x.ready&&config.preferExpForLevel)return 'waiting-exp-4acc';

        if(x.publicReady&&config.preferExpForLevel)return 'waiting-public-exp-match';

        if(positive(config.manualExpActionId))open(config.manualExpActionId,q,'EXP:manual-config');

        // If the quest action itself is configured, it is navigation ONLY, no spending.

        else if(positive(q.actionId)&&q.actionId!==46&&q.actionId!==165&&q.actionId!==189)open(q.actionId,q,'CAP:quest-action');

        return x.reason==='Da du cap; doi server cap nhat task'?'waiting-level-ack':'exp-needs-setup';

      }

      case 'unknown': {

        if(config.openUnknownQuestOnce)open(q.actionId,q,'CHUA CO HANDLER');

        note(q.id+'|unknown','Nhiem vu CHUA CO HANDLER, giu nguyen, khong nhay sang nhiem vu khac',

          {id:q.id,name:q.name,actionId:q.actionId,progress:q.progress});

        return 'need-handler';

      }

      default:return 'waiting-server';

    }

  }

  

  function tick(){

    if(!config.enabled)return null;

    const q=task();if(!q){restoreAll();return {route:'no-data'};}

    const key=q.id+'|'+q.state;

    if(S.questKey!==key){

      S.questKey=key;S.changeCount++;

      // Task IDs change only after authoritative server update; no local task advance.

      S.progressAt=now();S.lastProgressSig='';

      note('new|'+key,'SERVER TASK hien tai',{id:q.id,name:q.name,state:q.state,actionId:q.actionId});

    }

    const route=routeName(q);

    policy(q,route);

    const pSig=JSON.stringify(q.progress);

    if(pSig!==S.lastProgressSig){S.lastProgressSig=pSig;S.progressAt=now();

      note('progress|'+key+'|'+pSig,'SERVER PROGRESS thay doi',{id:q.id,state:q.state,progress:q.progress});}

    let state;

    const handler=custom.get(q.id);

    if(route==='unknown'&&handler){

      try {state=handler({quest:q,open:(id,tag)=>open(id,q,tag||'CUSTOM'),busy:busy()})||'custom-waiting';}

      catch(e){state='handler-error';note('err|'+key,String(e),{id:q.id});}

    }else state=assign(q,route);

    S.lastRoute={task:q,route,state,exp:route==='level-exp'?expStatus(q):null};

    return S.lastRoute;

  }

  // Use the existing V8 shared queue, never issue the EXP RPC from a timer.

  

  function publicProbe(ownQueue=false){

    const q=task(),x=expStatus(q);

    let count=S.publicAttempts.get(q?.id)||0;

    // Re-arm only after server confirms character level up or a free turn consumed.

    // Never repeat an uncertain MATCH merely because a local timeout elapsed.

    const evidence=S.publicSentEvidence.get(q?.id);

    if(evidence && ((Number.isFinite(evidence.level)&&Number.isFinite(x.currentLevel)&&

          x.currentLevel>evidence.level) ||

         (Number.isFinite(evidence.remaining)&&Number.isFinite(x.remaining)&&

          x.remaining<evidence.remaining)) &&

        !x.hasTeam && !positive(expTeam()?.roomId)){

      S.publicAttempts.set(q.id,0);count=0;

      S.publicSentEvidence.delete(q.id);

    }

    const goalAlreadyMet=x.targetLevel!==null&&Number.isFinite(x.currentLevel)&&

      x.currentLevel>=x.targetLevel;

    const eligible=config.enabled&&routeName(q)==='level-exp'&&x.publicReady&&

      !goalAlreadyMet&&config.preferExpForLevel&&!busy(ownQueue)&&

      count<config.maxPublicMatchRequestsPerQuest&&

      now()-S.lastPublicMatch>=config.publicMatchCooldownMs;

    const team=expTeam();

    // Room / team updates are server evidence even if EXP has not changed yet.

    return {ready:!!eligible,signature:JSON.stringify([q?.id,q?.state,q?.progress,

      x.remaining,x.red,x.hasTeam,team?.roomId??null,

      team?.getHasTeamByType?.(2)??null]),id:q?.id};

  }

  const PUBLIC_PLUGIN='v866_public_exp_match';

  let publicRegistered=false;

  try{

    if(W.KVPV_V8?.register){

      W.KVPV_V8.register({id:PUBLIC_PLUGIN,name:'Quest level -> Ghép đội EXP miễn phí',

        kind:'work',verified:true,enabled:true,spend:'none',background:false,

        redIds:[],hourlyLimit:4,cooldownMs:30000,

        probe:publicProbe,

        run:old=>{

          // U.pending is already owned by this queued action. Ignore ONLY that

          // self-lock while revalidating, keeping every other scene/task guard.

          const p=publicProbe(true);

          if(!p.ready||p.id!==old.id||p.signature!==old.signature)

            throw Error('EXP public state changed; wait server');

          const q=task(),team=expTeam();

          if(!team||team.getHasTeams?.()||positive(team.roomId)||

             _Ba?._$a?._yo?.ins?.isInMission===true||gameScene()?.isCommonScene!==true)

            throw Error('Already in team/mission or non-common scene');

          // Lock before sending; an exception may occur after the request has left.

          const baseline=expStatus(q);

          S.publicSentEvidence.set(q.id,{level:baseline.currentLevel,remaining:baseline.remaining});

          S.publicAttempts.set(q.id,(S.publicAttempts.get(q.id)||0)+1);

          S.lastPublicMatch=now();S.publicSent++;

          expRpc().creSerAreRoom(expMatchArgs());

          log('EXP: DA GUI GHEP DOI CONG KHAI, task',q.id,

            'luot con',expModel()?.remainTimes,'- doi server/xep doi');

        }});

      publicRegistered=true;

    }

  }catch(e){console.warn('[V8.6.6] Khong dang ky duoc public EXP queue',e);}

  

  function status(print=true){

    const q=task(),route=routeName(q),x=route==='level-exp'?expStatus(q):null;

    const out={task:q,route,state:S.lastRoute?.state??'not-scanned',

      currentJob:D.quickState(),exp:x,tuVuotEnabled:D.config.enableTuVuot,

      expEnabled:D.config.enableExp,publicExpQueue:publicRegistered,publicMatchSent:S.publicSent,

      publicAttempts:S.publicAttempts.get(q?.id)||0,

      soloIdleFallback:S.soloFallbackActive??false,

      soloIdleReason:S.soloFallbackReason??'not scanned',

      yeuVuongEnabled:D.config.enableYeuVuong===true,

      oldGenericNavigation:C64?.config?.continueNextQuests,

      arena:A65?.snapshot?.()?.step??null,handledExtra:[...custom.keys()],

      progressUnchangedMs:now()-S.progressAt};

    if(print)console.table([{ID:q?.id,Task:q?.name,state:q?.state,actionId:q?.actionId,

      handler:route,buoc:out.state,level:q?.characterLevel,EXP:x?.remaining??'-',

      expRole:x?.role??'-',daily:out.currentJob?.job,tuVuot:out.tuVuotEnabled}]);

    return out;

  }

  

  function stop(){config.enabled=false;if(S.timer)__KVPV29.cancel(S.timer);S.timer=null;

    try{W.KVPV_V8?.toggle?.(PUBLIC_PLUGIN,false);}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

    restoreAll();if(C64?.config)C64.config.continueNextQuests=S.originalGenericNavigation;

    S.stopped=true;log('Director stopped. Configs restored.');return true;}

  const api={installed:true,config,task,routeName,levelRequirement,exp:()=>expStatus(task()),

    publicExp:()=>({probe:publicProbe(),sent:S.publicSent,registered:publicRegistered}),

    preview:status,status,history:()=>S.history.slice(),tick,

    registerHandler(id,fn){if(!/^m?\d+$/.test(String(id))||typeof fn!=='function')

        throw Error('registerHandler(taskId, handlerFunction)');custom.set(String(id),fn);return true;},

    unregisterHandler(id){return custom.delete(String(id));},

    start(){if(S.timer)__KVPV29.cancel(S.timer);config.enabled=true;S.stopped=false;

      if(publicRegistered)try{W.KVPV_V8?.toggle?.(PUBLIC_PLUGIN,true);}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

      if(C64?.config)C64.config.continueNextQuests=false;

      S.timer=__KVPV29.every(()=>{try{tick();}catch(e){console.warn('[V8.6.6] tick',e);}},config.scanMs);

      tick();return true;},stop};

  S.originalGenericNavigation=C64?.config?.continueNextQuests;

  W.KVPV_V866=api;api.start();

  log('AUTO QUEST DIRECTOR da bat. KVPV_V866.status() / KVPV_V866.exp()');

})();



/* V8.6.22 SOLO: disabled 4-account Crystal invite/accept module. */



/* KVPV V8.6.8 - ERA / CHUYEN SINH QUEST ENGINE
 * Based on original client 17,606,388-byte .devtools source:
 * - _Ba.n_zS._Aht.instance.getEraNode(id): [id,state,progress]
 * - _ft._Pht.ins.getCfgById(id): era_task row, [1]=description, [2][1]=target, [2][2]=action ID
 * - _Ba.n_zS._dFn.ins.drawEraTask(id) => original claim button (state === 1)
 * - _Ba.n_zS._dFn.ins.era() => original breakthrough button (ALL tasks state === 2)
 * - main quest model _Ba._zIt._FIt.ins.taskInfo is DIFFERENT from Era nodes.
 * Integrates into existing V8 shared queue. Never guesses undocumented RPCs.
 * Does not buy turns, spend premium, use instant-rebirth pill or modify server state.
 */

(() => {

  'use strict';

  const W=window;

  const V=W.KVPV_V8;

  const D=W.KVPV_DAILY,G=W.KVPV_QUEST_GUARD;

  if (!G?.canSend || !V?.register || !V?.toggle || !D?.quickState || typeof _Ba==='undefined' || typeof _ft==='undefined') {

    console.error('[V8.6.8] Nap FULL V8.6.7 vao DUNG game-frame truoc.');return;

  }

  if (W.KVPV_V868?.installed) {

    console.log('[V8.6.8] Da cai. Dung KVPV_V868.report() hoac .start()');return;

  }

  const C={

    enabled:true,

    autoClaimEraTasks:true,

    autoBreakthrough:true,

    autoNavigateUnfinished:false, // Explicitly off: navigation is NOT completion.

    navigateOnlyWhenIdle:true,

    onlyNavigateWhenMainQuestUnassigned:true,

    navigationCooldownMs:120000,

    maxNavigationPerState:1,

    requireExactlyFourEraTasks:true,

    disableIfPremiumGate:true,

    logEveryMs:180000,

    autoInspectEveryMs:12000,

    eraInfoRetryMs:180000,

  };

  const S={ids:['v868_claim_era_task','v868_breakthrough'],timer:null,

    lastFetch:0,lastNavigate:0,navAttempts:new Map(),lastLog:new Map(),

    claimCalls:0,eraCalls:0,navigations:0,stopped:false};

  const now=()=>Date.now();

  const normalize=x=>String(x??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[đĐ]/g,'d').toLowerCase();

  const era=()=>_Ba?.n_zS?._Aht?.instance;

  const eraApi=()=>_Ba?.n_zS?._dFn?.ins;

  const eraCfg=()=>_ft?._Pht?.ins;

  const levelCfg=()=>_ft?._kZ?.ins;

  const mainModel=()=>_Ba?._zIt?._FIt?.ins;

  const mainCfg=()=>_ft?.__Z?.ins;

  const role=()=>_Ba?._rJ?._O$?.ins;

  const paidLevel=()=>_Ba?._ke?._Le?.instance?.curSvipLv;

  const busy=()=>{const q=D?.quickState?.();return !q?.running || q?.job!=='rảnh' ||

    _Ba?._$a?.SceneUtil?.isCommonScene!==true || _Ba?._$a?._yo?.ins?.isInMission===true;};

  const log=(...a)=>console.log('[V8.6.8]',...a);

  const validId=x=>typeof x==='number'&&Number.isSafeInteger(x)&&x>0 ||

    typeof x==='string'&&/^\d+$/.test(x)&&Number.isSafeInteger(Number(x))&&Number(x)>0;

  function mainQuest(){

    const t=mainModel()?.taskInfo;

    if(!Array.isArray(t)||!t[0])return null;

    const cfg=mainCfg()?.getTaskCfgById?.(t[0]);

    return {id:String(t[0]),name:String(cfg?.[1]??t[0]),state:Number(t[1]),

      actionId:Number(cfg?.[6]??0),progress:t[2]??null};

  }

  function listEra(){

    const m=era(),raw=m?.ids;

    if(!Array.isArray(raw)||!raw.length)return [];

    const out=[];

    for(const id of [...new Set(raw)].filter(validId)){

      const n=m?.getEraNode?.(id);

      const c=eraCfg()?.getCfgById?.(id);

      const arr=Array.isArray(c?.[2])?c[2]:[];

      const state=Array.isArray(n)?Number(n[1]):null;

      out.push({id:Number(id),state:Number.isInteger(state)?state:null,

        status:state===0?'CHUA XONG':state===1?'CO THE NHAN':state===2?'DA NHAN':'CHUA DONG BO',

        progress: Array.isArray(n)?Number(n[2]??0):null,

        target:Number.isFinite(Number(arr[1]))?Number(arr[1]):null,

        name:String(c?.[1]??'Nhiem vu #'+id),

        actionId:Number.isInteger(Number(arr[2]))?Number(arr[2]):-1,

        actionMode:Number(arr[0]),hasConfig:!!c});

    }

    return out;

  }

  function signature(){

    const e=era();

    return JSON.stringify([Number(e?.lv??-1),listEra().map(x=>[x.id,x.state,x.progress])]);

  }

  function fullSnapshot(){

    const e=era(),rows=listEra();

    return {characterId:String(role()?.actorId??''),characterLevel:Number(role()?.level)||0,

      mainQuest:mainQuest(),rebornLevel:Number(e?.lv??-1),rebornTasks:rows,

      completed:rows.filter(x=>x.state===2).length,

      claimable:rows.filter(x=>x.state===1).length,

      unfinished:rows.filter(x=>x.state===0).length,

      canReborn:canReborn(),sharedQueue:!!V?.provide};

  }

  function canReborn(){

    const m=era(),rows=listEra(),lv=Number(m?.lv);

    if(!C.enabled||!C.autoBreakthrough||!Number.isSafeInteger(lv)||!rows.length)return false;

    if(C.requireExactlyFourEraTasks&&rows.length!==4)return false;

    if(rows.some(x=>x.state!==2))return false;

    if(C.disableIfPremiumGate&&lv>=406&&Number(paidLevel()??0)<1)return false;

    const lc=levelCfg();

    if(typeof lc?.getNextLv!=='function'||typeof lc?.getCfgByLv!=='function')return false;

    const next=lc.getNextLv(lv);

    return Number.isInteger(Number(next))&&Number(next)>lv&&!!lc.getCfgByLv(next)&&

      typeof eraApi()?.era==='function';

  }

  function claimProbe(){

    const rows=listEra(),prior=G.pending('eraClaim');

    

    if(prior&&rows.length){

      const r=rows.find(x=>String(x.id)===prior.identity);

      G.observe('eraClaim',prior.identity,r?String(r.state):'era-node-removed');

    }

    const pick=rows.find(x=>x.state===1);

    return {ready:!!(C.enabled&&C.autoClaimEraTasks&&pick&&

      typeof eraApi()?.drawEraTask==='function'&&

      G.canSend('eraClaim',pick.id,String(pick.state))),

      id:pick?.id??0,guardSig:pick?String(pick.state):'',signature:signature()};

  }

  function rebornProbe(){

    const lv=Number(era()?.lv),prior=G.pending('eraBreakthrough');

    if(prior&&Number.isSafeInteger(lv)&&lv>=0)

      G.observe('eraBreakthrough',lv,String(lv));

    return {ready:canReborn()&&G.canSend('eraBreakthrough',lv,String(lv)),

      signature:signature(),lv};

  }

  function registerPlugins(){

    try{

      V.register({id:S.ids[0],name:'Nhan thuong cac moc Chuyen Sinh da du dieu kien',

        kind:'claim',verified:true,enabled:true,spend:'none',redIds:[],

        background:false,cooldownMs:7000,hourlyLimit:50,

        probe:claimProbe,run:st=>{

          const check=claimProbe();

          if(!check.ready||check.id!==st.id||check.signature!==st.signature||

             check.guardSig!==st.guardSig)throw Error('Era claim da thay doi hoac dang cho');

          eraApi().drawEraTask(check.id);

          G.sent('eraClaim',check.id,check.guardSig);S.claimCalls++;log('Gui nhan thuong moc',check.id,'(doi server ACK)');

        }});

    }catch(err){console.warn('[V8.6.8] Khong the dang ky claim:',err);}

    try{

      V.register({id:S.ids[1],name:'Chuyen Sinh khi 4 moc da nhan xong',

        kind:'work',verified:true,enabled:true,spend:'none',redIds:[],

        background:false,cooldownMs:10000,hourlyLimit:10,

        probe:rebornProbe,run:st=>{

          const check=rebornProbe();

          if(!check.ready||check.signature!==st.signature||check.lv!==st.lv)

            throw Error('Trang thai Chuyen Sinh da thay doi');

          eraApi().era();

          G.sent('eraBreakthrough',check.lv,String(check.lv));S.eraCalls++;log('Gui Dot Pha Chuyen Sinh',check.lv,'(doi server ACK)');

        }});

    }catch(err){console.warn('[V8.6.8] Khong the dang ky breakthrough:',err);}

  }

  function classify(row){

    const s=normalize(row?.name),a=row?.actionId;

    if(/ke thang lam vua|dau truong/.test(s)||a===165)return 'arena';

    if(/co bao|than khi/.test(s)||a===189)return 'cobao';

    if(/pho ban exp|kinh nghiem|\bdat cap\b|\blen cap\b/.test(s))return 'exp';

    if(/vuot ai|tu vuot/.test(s)||a===46)return 'stage';

    if(a===-1)return 'special-or-shop';

    if(a===43)return 'exp (Quest Director xu ly; kiem tra module V866)';

    if(a>0)return 'navigate-only (thieu handler trong module Chuyen Sinh)';

    return 'unknown';

  }

  

  function report(){

    const o=fullSnapshot();

    console.table(o.rebornTasks.map(r=>({ID:r.id,TrangThai:r.status,Ten:r.name,

      TienDo:r.progress,MucTieu:r.target,ActionID:r.actionId,

      XuLy:classify(r)})));

    log('Main task',o.mainQuest,'Chuyen Sinh Lv',o.rebornLevel,

      'Co the dot pha:',o.canReborn,

      'Ghi chu: nut Di Den KHONG dong nghia da hoan thanh');

    return o;

  }

  function navEligibility(row){

    if(!row||row.state!==0)return 'task-not-incomplete';

    if(C.navigateOnlyWhenIdle && busy())return 'busy';

    const m=mainQuest();

    if(C.onlyNavigateWhenMainQuestUnassigned && m && m.state!==2){

      let route=null;

      try{route=W.KVPV_V866?.status?.()?.route}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

      if(route && !['unknown','no-data','wait-state','claim'].includes(route))return 'main-quest-priority';

    }

    if(row.actionId<=0 || row.actionId===-1)return 'no-safe-action';

    if(classify(row)==='special-or-shop')return 'premium-route-block';

    if(typeof _j==='undefined'||typeof _j?.ins?.openByActionId!=='function')return 'no-window-manager';

    const key=row.id+'|'+row.progress+'|'+row.state;

    if(now()-S.lastNavigate<C.navigationCooldownMs)return 'cooldown';

    if((S.navAttempts.get(key)||0)>=C.maxNavigationPerState)return 'already-opened';

    return 'ok';

  }

  function go(id){

    const rows=listEra();const row=(id===undefined||id===null)?rows.find(x=>x.state===0):rows.find(x=>String(x.id)===String(id));

    const reason=navEligibility(row);

    if(reason!=='ok'){log('Khong DI DEN',reason,row?.id);return {ok:false,reason,row};}

    const raw=eraCfg()?.getCfgById?.(row.id);

    let action=row.actionId;

    // Original client: when [2][0] === 0, pass through hdleLckExoActId before openByActionId.

    if(Number(raw?.[2]?.[0])===0){

      if(typeof _et==='undefined'||typeof _et.hdleLckExoActId!=='function')return {ok:false,reason:'missing-native-route'};

      action=_et.hdleLckExoActId(action);

    }

    if(!validId(action))return {ok:false,reason:'invalid-action',row};

    const key=row.id+'|'+row.progress+'|'+row.state;

    _j.ins.openByActionId(Number(action));

    S.navAttempts.set(key,(S.navAttempts.get(key)||0)+1);

    S.lastNavigate=now();S.navigations++;

    log('Da mo DI DEN era task',row.id,'action',action,'CHI LA MO, CHUA HOAN THANH');

    return {ok:true,id:row.id,action};

  }

  function inspect(){

    if(!C.enabled)return;

    const e=era(),rows=listEra();

    if((!e||!rows.length) && now()-S.lastFetch>C.eraInfoRetryMs && typeof eraApi()?.getEraInfo==='function'){

      S.lastFetch=now();eraApi().getEraInfo();return;

    }

    if(!rows.length)return;

    for(const r of rows.filter(x=>x.state===0)){

      const k=r.id+'|'+r.progress+'/'+r.target;

      if(now()-(S.lastLog.get(k)||0)>C.logEveryMs){

        S.lastLog.set(k,now());log('Chua xong',r.id,r.name,'tien do',r.progress,'/',r.target,

          'loai:',classify(r),'actionId:',r.actionId);

      }

    }

    if(C.autoNavigateUnfinished){

      const unfinished=rows.find(x=>x.state===0);

      if(unfinished)go(unfinished.id);

    }

  }

  

  function start(){

    C.enabled=true;S.stopped=false;

    for(const id of S.ids)try{V.toggle(id,true)}catch(e){console.warn('[V8.6.8]',e)}

    if(!S.timer)S.timer=__KVPV29.every(inspect,C.autoInspectEveryMs);

    inspect(); log('Dang chay; tu nhan moc va dot pha khi du dieu kien. Di Den chua duoc bat mac dinh.');

  }

  

  function stop(){

    C.enabled=false;S.stopped=true;

    if(S.timer)__KVPV29.cancel(S.timer);S.timer=null;

    for(const id of S.ids)try{V.toggle(id,false)}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

    log('Da dung module Chuyen Sinh');

  }

  W.KVPV_V868={installed:true,config:C,report,preview:report,

    task:mainQuest,eraTasks:listEra,classify,go,inspect,start,stop,

    status(){return {enabled:C.enabled,reborn:fullSnapshot(),

      pending:G.status().rows.filter(x=>['eraClaim','eraBreakthrough'].includes(x.group)),

      counters:{claimsSent:S.claimCalls,breakthroughSent:S.eraCalls,navigations:S.navigations},

      moduleStatus:(V.report()?.plugins||[]).filter(x=>S.ids.includes(x.id))};}};

  registerPlugins();start();

})();



/* V8.6.10 - FIX BUG SELF-PENDING DURING ARENA CLICK; BASED ON USER VM72625 */

/* V8.6.10 - HOTFIX ARENA CLICK PRIORITY */












(() => {

  'use strict';

  const W=window, V=W.KVPV_V8, D=W.KVPV_DAILY, U=W.KVPV_UPGRADES;

  if (!V?.provide || !V?.toggle || !D?.quickState || !U?.busy ||

      typeof _Ba==='undefined' || typeof _ft==='undefined') {

    console.error('[V8.6.10] Can V8.6.6+ FULL, chon dung game-frame.');return;

  }

  // Disable the previous buggy provider wrapper before installing replacement.

  try { W.KVPV_V869?.stop?.(); } catch (e) {

    console.warn('[V8.6.10] Khong dung duoc addon V8.6.9',e);

  }

  // Duplicate install: use the installed instance; do not chain provider patches.

  if (W.KVPV_V870?.installed) {

    W.KVPV_V870.start();console.log('[V8.6.10] Da cai, tiep tuc chay.');return;

  }

  const C={enabled:true,autoOpenPanel:true,scanMs:2000,openEveryMs:45000,

    requireQuest:true,requireSafeOpponent:true,powerMargin:1.05,

    waitForServerMs:90000,maximumFightsPerQuest:10,

    prioritizeViaSharedQueue:true,autoStartDaily:false};

  const S={timer:null,attemptAt:0,openAt:0,questKey:'',lastProgress:'',triedProgress:'',

    totalSent:0,confirmed:0,errors:0,history:[],perQuest:new Map(),

    lastError:'',lastTarget:null,lastOutcome:'-',lastAck:'-',suspendedPlugin:false};

  const now=()=>Date.now();

  const manager=()=> (typeof _j!=='undefined' && _j?.ins)||W.window_WinMgr||null;

  const qm=()=>_Ba?._zIt?._FIt?.ins;

  const arena=()=>_Ba?._tjt?._ljt?.ins;

  const taskCfg=id=>_ft?.__Z?.ins?.getTaskCfgById?.(id);

  const official=()=>_Ba?._tjt?._vjt?.ins;

  const svTime=()=>typeof _Sa!=='undefined' ? Number(_Sa.svrTime) : Date.now();

  const log=(...args)=>console.log('[V8.6.10]',...args);

  function task(){

    const t=qm()?.taskInfo;

    if(!Array.isArray(t)||t[0]==null)return null;

    const cfg=taskCfg(t[0]);

    return {id:String(t[0]),state:Number(t[1]),actionId:Number(cfg?.[6]??0),

      name:String(cfg?.[1]??t[0]),progress:t[2]??null};

  }

  function arenaQuest(q){

    return !!q && q.state!==2 && (q.actionId===165||

      /k[eẻ]\s*th[aắ]ng\s*l[aà]m\s*vua|ke\s*thang\s*lam\s*vua/i.test(q.name));

  }

  function panel(){

    const m=manager();

    if(!m?.isOpened?.(289))return null;

    const p=m.getDialogById?.(289)||m.getPanelById?.(289);

    return p && typeof p._Xbi==='function' ? p : null;

  }

  // `fromOwnQueue` is TRUE only within the selected queue task's run callback.

  // U.busy() is then naturally true because the queue sets S.pending first.

  // Ignore ONLY that self-owned pending flag; retain all other game preconditions.

  

  function snapshot(fromOwnQueue=false){

    const q=task(), m=arena(), t=m?.times, objects=m?.objs;

    const self=Array.isArray(objects?.[3])?objects[3]:null;

    const myRank=Number(self?.[4]);

    const myPower=Number(_Ba?._qo?._Ro?.ins?.fight);

    const attempts=Array.isArray(t)?Number(t[2]):NaN;

    const cdUntil=Array.isArray(t)?Number(t[0]):NaN;

    const busy=!!U?.busy?.() && !fromOwnQueue;

    const daily=D.quickState?.();

    const sceneOk=_Ba?._$a?.SceneUtil?.isCommonScene===true;

    const inMission=_Ba?._$a?._yo?.ins?.isInMission===true;

    const inArena=_Ba?._$a?._yo?.ins?.isInArena===true;

    const hasTeam=!!_Ba?._cm?._q3t?.ins?.getHasTeams?.();

    const candidates=Array.isArray(objects)?objects.slice(0,3).map((x,index)=>({

      index,id:Number(x?.[0]),name:String(x?.[2]||''),power:Number(x?.[3]),rank:Number(x?.[4])

    })).filter(x=>Number.isSafeInteger(x.id)&&x.id>0&&Number.isFinite(x.power)&&x.power>0):[];

    // Prefer the weakest viable target: m2002 asks for ONE challenge, not highest rank.

    const suitable=candidates.filter(x=>(!C.requireSafeOpponent||

      (Number.isFinite(myPower)&&myPower>=x.power*C.powerMargin)) &&

      Number.isFinite(myRank) && myRank>x.rank).sort((a,b)=>a.power-b.power);

    const target=suitable[0]||null;

    const p=panel(),prog=JSON.stringify(q?.progress??null);

    const ready=!!C.enabled&&arenaQuest(q)&&daily?.running===true&&

      daily.job==='rảnh'&&!['entering','exiting','fighting'].includes(String(daily.step))&&

      sceneOk&&!inMission&&!inArena&&!hasTeam&&!busy&&!!p&&

      Number.isFinite(attempts)&&attempts>0&&

      (!Number.isFinite(cdUntil)||cdUntil<=svTime())&&!!target&&

      typeof official()?.challengeArena==='function';

    const requestCount=S.perQuest.get(q?.id)||0;

    // Server ACK signature MUST NOT change merely because this addon sent a call.

    

    // Require actual Arena state, free-attempt change, or quest state/progress.

    const ackSig=JSON.stringify([q?.id,q?.state,prog,attempts,inArena]);

    return {task:q,progress:prog,attempts,cdUntil,myRank,myPower,

      candidates,target,panelReady:!!p,ready,requestCount,

      inMission,inArena,busy,sceneOk,daily,ackSig};

  }

  function eligible(s){

    if(!s.ready)return false;

    if(s.requestCount>=C.maximumFightsPerQuest)return false;

    if(now()-S.attemptAt<C.waitForServerMs)return false;

    // Do NOT resend while the quest progress hasn't changed after a request.

    if(S.questKey===s.task.id && S.triedProgress===s.progress)return false;

    return true;

  }

  function refreshQuest(s){

    const key=s.task?.id||'';

    if(key!==S.questKey){

      S.questKey=key;S.triedProgress='';S.lastProgress=s.progress;

      if(key)log('NHIEM VU',key,s.task?.name);

    }

    if(s.progress!==S.lastProgress){

      S.lastProgress=s.progress;S.triedProgress='';

      log('SERVER doi tien do',key,s.progress);

    }

  }

  function clickOpponent(expected){

    // Called synchronously from the SAME Upgrade queue entry selected earlier.

    // That queue sets itself busy before `run()`: do not self-veto here.

    const s=snapshot(true);

    if(!eligible(s)||s.task.id!==expected.task.id||s.ackSig!==expected.ackSig||

       s.target?.id!==expected.target?.id)throw Error('Arena state stale, bo qua click');

    const p=panel();

    if(!p)throw Error('Arena panel 289 da dong');

    const i=s.target.index;

    if(i<0||i>2||Number(arena()?.objs?.[i]?.[0])!==s.target.id)

      throw Error('Arena target changed');

    // Record before calling native handler; never replay unknown requests.

    S.attemptAt=now();S.triedProgress=s.progress;

    S.perQuest.set(s.task.id,(S.perQuest.get(s.task.id)||0)+1);

    S.totalSent++;S.lastTarget=s.target;

    // The game's Laya click handler for each portrait delegates to _Xbi(index).

    // Invoke it directly once to avoid ambiguity in synthetic click dispatch.

    p._Xbi(i);

    log('DA NHAP DOI THU',i,s.target.name,'ID',s.target.id,

        'luc chien',s.target.power,'luot truoc',s.attempts,

        'task',s.task.id,'; cho server cap nhat');

  }

  const nativeProvide=V.provide;

  function priorityProvide(mode){

    if(mode==='claim'&&C.enabled&&C.prioritizeViaSharedQueue){

      const s=snapshot();refreshQuest(s);

      if(eligible(s)){

        return {k:'moduleWork',what:'QUEST PRIORITY: Click Ke Thang Lam Vua',

          before:s.ackSig,

          probe:()=>snapshot().ackSig,

          run:()=>{clickOpponent(s);},

          done:()=>{S.confirmed++;S.lastAck='Server scene/quest/turn changed';

            log('DA NHAN THAY DOI SERVER / TRAN: cho task moi');},

          failed:why=>{S.errors++;S.lastError=String(why);

            log('Khong co ACK Arena:',why,'(tam khong thu lai khi task chua thay doi)');}};

      }

    }

    return nativeProvide.call(V,mode);

  }

  let installedShim=false;

  if(C.prioritizeViaSharedQueue){V.provide=priorityProvide;installedShim=true;}

  // Old arena module has the same click target but lower priority. Disable ONLY

  // its V8 work plugin; retain V865.config.enabled for V866 director compatibility.

  try{V.toggle('v865_kingArenaFight',false);S.suspendedPlugin=true;}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

  function scan(){

    if(!C.enabled)return;

    const s=snapshot();refreshQuest(s);

    if(!arenaQuest(s.task))return;

    

    // Do not start a stage while this Arena quest is still unfinished.

    if(D.config?.enableTuVuot===true)D.config.enableTuVuot=false;

    if(!s.daily?.running){

      if(C.autoStartDaily){D.start?.();}

      else {S.lastOutcome='Auto Daily dang tat';return;}

    }

    if(C.autoOpenPanel && !s.panelReady && s.sceneOk &&

       !s.inMission&&!s.inArena&&!s.busy &&s.daily?.job==='rảnh'&&

       now()-S.openAt>=C.openEveryMs && manager()?.openByActionId){

      S.openAt=now();manager().openByActionId(165);

      log('Da mo Arena 165; doi UI va hang doi click doi thu');

    }

    S.lastOutcome=eligible(s)?'CHO HANG DOI CHINH':

      !s.panelReady?'CHO MO BANG DAU TRUONG':

      S.triedProgress===s.progress?'CHO SERVER CAP NHAT NHIEM VU':

      s.busy?'CHO MODULE NANG CAP ACK':

      !s.ready?'CHUA DU DIEU KIEN':'DANG CHO';

  }

  const service={installed:true,config:C,

    snapshot,status(){const s=snapshot();const out={

      task:s.task?.id,name:s.task?.name,progress:s.progress,

      running:s.daily?.running,job:s.daily?.job,ui:s.panelReady,

      hasQueueShim:installedShim,ownQueuePendingFix:true,upgradesBusy:s.busy,

      remaining:s.attempts,myRank:s.myRank,target:s.target,

      ready:s.ready,eligible:eligible(s),lastOutcome:S.lastOutcome,

      sent:S.totalSent,serverAck:S.confirmed,errors:S.errors,lastError:S.lastError,

      triedProgress:S.triedProgress,lastTarget:S.lastTarget};

      console.table([out]);return out;},

    start(){C.enabled=true;

      if(!installedShim){V.provide=priorityProvide;installedShim=true;}

      try{V.toggle('v865_kingArenaFight',false);S.suspendedPlugin=true;}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

      if(!S.timer)S.timer=__KVPV29.every(()=>{try{scan();}catch(e){S.errors++;S.lastError=String(e);console.warn('[V8.6.10]',e);}},C.scanMs);

      scan();return true;},

    stop(){C.enabled=false;if(S.timer)__KVPV29.cancel(S.timer);S.timer=null;

      if(installedShim && V.provide===priorityProvide){V.provide=nativeProvide;installedShim=false;}

      // Never re-enable old module automatically: user can opt in manually.

      return true;},

    tick:scan,

    // Manual diagnostic: same checks, intentionally DOES NOT click outside queue.

    diagnose(){const s=snapshot();console.log('Arena DEBUG',s);return s;}

  };

  W.KVPV_V870=service;service.start();

  log('ARENA FIX: queue-own-pending khong con chan click; quest actionId=165, cho ACK server.');

})();



/* KVPV V8.6.11 — QUEST TYPE DIRECTOR + KY NGO HANDLER
 * Based on inspected client (17,606,388 byte .devtools):
 *   Adventure model: _Ba._Ab._mat.inst.evtLst/yL
 *   RPC: _Ba._Ab._VIt.inst.chg(row), getAdreAward(eventId)
 *   Native UI: _j.ins.open(247,row) for type-0 minigame; panel._GAn(panel.sp_0)
 *   Quest: _Ba._zIt._FIt.ins.taskInfo; config _ft.__Z.ins.getTaskCfgById
 * Works as addon AFTER V8.6.10 FULL, sharing existing V8 UPGRADES queue.
 * No purchases, auto-complete, time skips, or fake server progress.
 */

(() => {

  'use strict';

  const W=window, V=W.KVPV_V8, D=W.KVPV_DAILY, U=W.KVPV_UPGRADES;

  const Director=W.KVPV_V866;

  if (!V?.provide || !D?.quickState || !U?.busy || !Director?.registerHandler ||

      typeof _Ba==='undefined' || typeof _ft==='undefined') {

    console.error('[V8.6.11] Can nap V8.6.10 FULL vao dung game-frame truoc');

    return;

  }

  if(W.KVPV_V871?.installed){ W.KVPV_V871.start();return; }

  const C={enabled:true,autoStartDaily:true,autoOpenAdventure:true,

    openCooldownMs:60000,scanMs:2500,actionGapMs:5000,

    maxActionsPerTask:12,maxMiniAttempts:3,allowFreeMiniGame:true,

    allowAcceptFreeChallenge:true,allowFreeExplore:true,

    allowObjectiveNavigation:true,claimCompletedAdventure:true,

    autoChooseMiniGesture:0, // 0-3; ket qua thang/thua la cua server

    requireQuest:true,preventExtraFights:true};

  const S={timer:null,openedAt:0,lastActionAt:0,taskId:'',tracked:new Set(),

    actionsByTask:new Map(),miniCount:new Map(),handledRows:new Map(),

    sent:0,acks:0,failures:0,lastError:'',lastStatus:'-',lastChoice:null,

    history:[],lastQuestProgress:'',lastEventSignature:'',savedUnknown:null};

  const now=()=>Date.now(),log=(...x)=>console.log('[V8.6.11]',...x);

  const strip=x=>String(x||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[đĐ]/g,'d').toLowerCase();

  const manager=()=>typeof _j!=='undefined'?_j?.ins:null;

  const eventModel=()=>_Ba?._Ab?._mat?.inst;

  const eventRPC=()=>_Ba?._Ab?._VIt?.inst;

  const qm=()=>_Ba?._zIt?._FIt?.ins;

  const cfg=id=>_ft?.__Z?.ins?.getTaskCfgById?.(id);

  const valid=x=>Number.isSafeInteger(Number(x))&&Number(x)>0;

  const common=()=>_Ba?._$a?.SceneUtil?.isCommonScene===true;

  const sceneBusy=()=>_Ba?._$a?._yo?.ins?.isInMission===true||

    _Ba?._$a?._yo?.ins?.isInArena===true;

  const teamBusy=()=>!!_Ba?._cm?._q3t?.ins?.getHasTeams?.();

  const serverTime=()=>typeof _Sa!=='undefined'?Number(_Sa.svrTime):Date.now();

  function quest(){

    const t=qm()?.taskInfo;if(!Array.isArray(t)||t[0]==null)return null;

    const c=cfg(t[0]);return {id:String(t[0]),name:String(c?.[1]||t[0]),

      actionId:Number(c?.[6]||0),state:Number(t[1]),progress:t[2]??null};

  }

  const rules=new Map();

  function match(q){

    if(!q||q.state===2)return null;

    for(const r of rules.values()){try{if(r.match(q))return r;}catch(_){window.KVPV_V1?.diagnostics?.record(_);}}

    return null;

  }

  const room=()=>{const d=D.quickState();return !!d?.running&&d.job==='rảnh'&&

    !['entering','exiting','fighting'].includes(String(d.step))&&common()&&!sceneBusy()&&!teamBusy();};

  function dialog(id){

    const m=manager();if(!m?.isOpened?.(id))return null;

    return m.getDialogById?.(id)||m.getPanelById?.(id)||m.getViewById?.(id)||null;

  }

  function events(){

    const m=eventModel(), a=m?.evtLst;

    if(!Array.isArray(a))return [];

    const limit=Math.min(a.length,4,Math.max(0,Number(m?.yL)||0));

    return a.slice(0,limit).filter(r=>Array.isArray(r)&&valid(r[0])&&Number.isInteger(Number(r[1])));

  }

  const eventSig=()=>JSON.stringify(events().map(r=>[r[0],r[1],r[3],r[4],r[7]]));

  function miniPanel(){const p=dialog(247);return p&&typeof p._GAn==='function'?p:null;}

  function miniForEvent(p,r){return !!p && Array.isArray(p._myi)&&String(p._myi[0])===String(r[0]);}

  function candidate(q){

    const rows=events(),rpc=eventRPC(),p=miniPanel();

    if(q?.state===2||!rpc)return null;

    // Finish the current minigame in UI before starting another event.

    if(p){

      const r=rows.find(x=>miniForEvent(p,x));

      if(!r)return {type:'wait-mini-panel',reason:'Mini-game dang mo, khong ro event'};

      const outcome=Number(p._yTt),hasOutcome=p._yTt!==null&&p._yTt!==undefined;

      if(hasOutcome&&(outcome===0||outcome===1))

        return {type:'finish-mini',r,done:outcome===0};

      if(!C.allowFreeMiniGame)return {type:'wait-mini-disabled'};

      const count=S.miniCount.get(String(r[0]))||0;

      if(count>=C.maxMiniAttempts)return {type:'wait-mini-limit',r};

      if(p.sp_0?.mouseEnabled===true)

        return {type:'play-mini',r};

      return {type:'wait-mini-result',r};

    }

    // First: grab genuinely completed rewards, before spending free event points.

    if(C.claimCompletedAdventure){

      const ready=rows.find(r=>Number(r[1])===1 && Number(r[4])===1);

      if(ready&&typeof rpc.getAdreAward==='function')return {type:'claim',r:ready};

      const seal=rows.find(r=>Number(r[1])===5 && Number(r[3])>0 && Number(r[3])<=serverTime());

      if(seal&&typeof rpc.getAdreAward==='function')return {type:'claim',r:seal};

    }

    // Easiest free one-step event: official rock-paper-scissors minigame.

    const mini=rows.find(r=>Number(r[1])===0 &&

      (S.miniCount.get(String(r[0]))||0)<C.maxMiniAttempts);

    if(C.allowFreeMiniGame&&mini&&manager()?.open)return {type:'open-mini',r:mini};

    // Challenge with no objective yet: native accept button sends chg(row).

    const accept=rows.find(r=>Number(r[1])===1 && Number(r[4])!==1&&Number(r[7])===0);

    if(C.allowAcceptFreeChallenge&&accept&&typeof rpc.chg==='function')return {type:'accept',r:accept};

    // Challenge objective already assigned: open its native feature, do NOT count as finished.

    const objective=rows.find(r=>Number(r[1])===1&&valid(r[7])&&Number(r[4])!==1);

    if(objective)return {type:'objective',r:objective,fcId:Number(objective[7])};

    const explore=rows.find(r=>[2,3,4].includes(Number(r[1])));

    if(C.allowFreeExplore&&explore&&typeof rpc.chg==='function')return {type:'explore',r:explore};

    return null;

  }

  function ackSignature(){

    const q=quest(),p=miniPanel();

    return JSON.stringify([q?.id,q?.state,q?.progress,eventSig(),

      !!manager()?.isOpened?.(247),p? (p._yTt??'waiting'):null]);

  }

  function quota(q,act){

    const k=q?.id||'';if((S.actionsByTask.get(k)||0)>=C.maxActionsPerTask)return false;

    if(now()-S.lastActionAt<C.actionGapMs)return false;

    // Objective navigation is handled by scanner with per-state dedupe.

    if(act?.type?.startsWith('wait')||act?.type==='objective')return false;

    return true;

  }

  function perform(exp){

    const q=quest(),r=exp.action.r;

    if(!C.enabled||!q||q.id!==exp.qid||!match(q)||!room())throw Error('Quest/scene changed');

    const a=candidate(q);

    if(!a||a.type!==exp.action.type||String(a.r?.[0])!==String(r?.[0]))

      throw Error('Ky Ngo state stale; wait refresh');

    // Own shared queue is pending here; do not inspect U.busy() in callback.

    if(!quota(q,a))throw Error('Ky Ngo limit/cooldown');

    const rpc=eventRPC(),p=miniPanel();

    S.lastActionAt=now();S.sent++;

    S.actionsByTask.set(q.id,(S.actionsByTask.get(q.id)||0)+1);

    S.lastChoice={type:a.type,eventId:r[0],eventType:r[1],quest:q.id};

    switch(a.type){

      case 'claim':rpc.getAdreAward(r[0]);break;

      case 'accept':rpc.chg(r);break;

      case 'explore':rpc.chg(r);break;

      case 'open-mini':manager().open(247,r);break;

      case 'play-mini': {

        const i=Math.max(0,Math.min(3,C.autoChooseMiniGesture|0));

        const btn=p?.['sp_'+i];if(!btn?.mouseEnabled)throw Error('Mini-game button not ready');

        S.miniCount.set(String(r[0]),(S.miniCount.get(String(r[0]))||0)+1);

        p._GAn(btn);break;

      }

      case 'finish-mini':p.close();break;

      default:throw Error('Unknown action '+a.type);

    }

    S.lastStatus='Sent '+a.type+' event '+r[0]+' - awaiting game/server';

    log(S.lastStatus);

  }

  // Support dynamic routes: actionId/name -> handler, never assume all actions are equivalent.

  rules.set('kyngo',{id:'kyngo',name:'Ky Ngo / Su Kien Tham Hiem',

    match:q=>q.actionId===141&&/ky ngo/.test(strip(q.name))});

  function attachDirector(q){

    if(!q||!match(q)||S.tracked.has(q.id))return;

    Director.registerHandler(q.id,()=> 'kyngo: monitored - do not advance before server completion');

    S.tracked.add(q.id);

  }

  function objectiveNavigation(q,a){

    if(!C.allowObjectiveNavigation||!room()||U.busy())return false;

    const id=a.fcId, c=_ft?._$Ah?.ins?.getCfgById?.(id);

    const signature=JSON.stringify([q.id,id,a.r[3],a.r[4],a.r[7]]);

    if(S.handledRows.has(signature))return false;

    const fct=Number(c?.[3]);

    if(!valid(fct)||typeof _Sa?.getWindowCfgByFcId!=='function'){

      S.lastStatus='Ky Ngo can thao tac thu cong, objective='+id;

      return false;

    }

    const win=_Sa.getWindowCfgByFcId(fct),winId=Number(win?.[0]);

    if(!valid(winId)||!manager()?.open){S.lastStatus='Missing objective window '+fct;return false;}

    S.handledRows.set(signature,now());manager().open(winId);

    S.lastStatus='Ky Ngo objective UI opened: '+id+' -> '+fct;

    log(S.lastStatus,'YEU CAU',c?.[4],'TIEN DO',a.r[3],

      'DU MO GIAO DIEN KHONG CO NGHIA LA HOAN THANH');

    return true;

  }

  function scan(){

    if(!C.enabled)return;

    const q=quest(),r=match(q);

    if(!r)return;

    attachDirector(q);

    if(C.autoStartDaily&&!D.quickState()?.running)D.start?.();

    if(D.config?.enableTuVuot===true)D.config.enableTuVuot=false;

    const a=candidate(q);

    if(a?.type==='objective')objectiveNavigation(q,a);

    else if(a?.type?.startsWith('wait'))S.lastStatus=a.type;

    else if(!a)S.lastStatus='No verified Ky Ngo action; waiting for server/task';

    const m=eventModel();

    if(!a&&C.autoOpenAdventure&&room()&&!U.busy()&&

       now()-S.openedAt>C.openCooldownMs&&manager()?.openByActionId){

      S.openedAt=now();manager().openByActionId(141);

    }

  }

  const parent=V.provide;

  let wrapped=false;

  function provide(mode){

    if(mode==='claim'&&C.enabled){

      const q=quest(),rule=match(q);

      if(rule&&room()&&!U.busy()){

        attachDirector(q);

        const a=candidate(q);

        if(a&&quota(q,a)){

          const before=ackSignature(),expected={qid:q.id,action:a};

          return {k:'moduleWork',what:'QUEST: Ky Ngo '+a.type,

            before,probe:ackSignature,

            run:()=>perform(expected),

            done:()=>{S.acks++;S.lastStatus='Game state updated, recheck quest';},

            failed:why=>{S.failures++;S.lastError=String(why);

              S.lastStatus='No ACK for '+a.type+' - pause for diagnosis';

              log('NO ACK',why,a.type,a.r?.[0]);}};

        }

      }

    }

    return parent.call(V,mode);

  }

  

  function status(){

    const q=quest(),rule=match(q),a=rule?candidate(q):null,m=eventModel();

    const out={enabled:C.enabled,quest:q,recognized:rule?.id||null,

      nextAction:a?.type||'none',eventId:a?.r?.[0]??null,

      freeEventPoints:m?.yL??null,events:events().map(r=>({id:r[0],type:r[1],

        progressOrEnd:r[3],rewardReady:r[4],objective:r[7]})),

      queueShim:wrapped,coreRunning:D.quickState()?.running,

      currentJob:D.quickState()?.job,sent:S.sent,serverAcks:S.acks,

      errors:S.failures,lastError:S.lastError,lastStatus:S.lastStatus,

      lastChoice:S.lastChoice,

      coveredKinds:['Ky Ngo actionId 141','Arena actionId 165 (V870)',

        'Co Bao actionId 189 (V864)','Vuot ai actionId 46 (V866)',

        'Len cap -> EXP (V866)']};

    console.log('[V8.6.11] Quest engine',out);

    console.table(out.events);

    return out;

  }

  

  function start(){

    C.enabled=true;

    if(!wrapped){V.provide=provide;wrapped=true;}

    if(S.timer)__KVPV29.cancel(S.timer);

    S.timer=__KVPV29.every(()=>{try{scan();}catch(e){S.failures++;S.lastError=String(e);console.warn('[V8.6.11]',e);}},C.scanMs);

    scan();return true;

  }

  

  function stop(){

    C.enabled=false;

    if(S.timer)__KVPV29.cancel(S.timer);S.timer=null;

    if(wrapped&&V.provide===provide){V.provide=parent;wrapped=false;}

    for(const id of S.tracked){try{Director.unregisterHandler(id);}catch(_){window.KVPV_V1?.diagnostics?.record(_);}}

    S.tracked.clear();return true;

  }

  function classify(q){

    if(!q)return 'no-data';

    const n=strip(q.name),a=Number(q.actionId);

    if(a===141&&/ky ngo/.test(n))return 'kyngo';

    if(a===165||/ke thang lam vua/.test(n))return 'arena';

    if(a===189||/kich hoat.*co bao/.test(n))return 'cobao';

    if(a===46||/vuot.*ai/.test(n))return 'stage';

    if(/(?:len|tang|dat) cap(?: nhan vat)?|cap nhan vat dat|pho ban exp/.test(n))return 'level-exp';

    return 'unknown';

  }

  function coverage(){

    const all=_ft?.__Z?.ins?.originCfg;

    if(!Array.isArray(all)){log('No game quest config');return null;}

    const groups=new Map();let total=0,known=0;

    for(const c of all){

      if(!Array.isArray(c)||!/^m\d+$/.test(String(c[0])))continue;

      const q={id:String(c[0]),name:String(c[1]||''),actionId:Number(c[6]||0)};

      const type=classify(q);total++;if(type!=='unknown')known++;

      const k=String(q.actionId)+' | '+type;

      if(!groups.has(k))groups.set(k,{actionId:q.actionId,type,count:0,samples:[]});

      const g=groups.get(k);g.count++;if(g.samples.length<3)g.samples.push(q.id+' '+q.name);

    }

    const rows=[...groups.values()].sort((a,b)=>b.count-a.count).map(x=>({...x,samples:x.samples.join(' / ')}));

    console.table(rows);log('Covered quest templates',known,'/',total,'(unknown needs verified handler)');

    return {total,known,unknown:total-known,groups:rows};

  }

  W.KVPV_V871={installed:true,config:C,start,stop,status,preview:status,

    quest,classify,coverage,rules:()=>[...rules.keys()],registerRule(id,matchFn){

      if(!id||typeof matchFn!=='function')throw Error('registerRule(id, matchFunction)');

      // Only use custom matcher for real Adventure/Ky Ngo variants; executor remains Adventure-specific.

      rules.set(String(id),{id:String(id),match:matchFn});return true;

    },tick:scan};

  start();log('AUTO QUEST TYPE: KY NGO - nhan dien 141, xu ly theo event type, khong mua luot');

})();



/* === KVPV QUEST ATLAS READ-ONLY INVENTORY === */

/* KVPV QUEST ATLAS V1 - one-shot inventory of ALL LOCAL game task configs
 * Load in the same game-frame as the game. READ ONLY: no RPC, clicks, purchases.
 * Sources verified in 17 MB client:
 *  _Sa.getCfg('task') / _ft.__Z.ins.originCfg
 *  _Sa.getCfg('era_task') / _ft._Pht.ins.p_tb
 *  _Ba._zIt._FIt.ins.taskInfo, _Ba.n_zS._Aht.instance.ids
 */

(()=>{

  'use strict';

  const W=window;

  if(W.KVPV_QUEST_ATLAS?.installed){

    console.log('[ATLAS] Da cai. KVPV_QUEST_ATLAS.summary() / .export()');

    return;

  }

  const norm=x=>String(x??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[đĐ]/g,'d').toLowerCase();

  const number=x=>Number.isFinite(Number(x))?Number(x):null;

  const name=x=>String(x??'').replace(/[\u0000-\u001f]/g,' ').trim();

  const source={

    cfg(key){try{const a=(typeof _Sa!=='undefined'&&_Sa?.getCfg?.(key));return Array.isArray(a)?a:null;}catch(_){return null;}},

    main(){try{return _ft?.__Z?.ins?.originCfg || this.cfg('task');}catch(_){return this.cfg('task');}},

    era(){try{return this.cfg('era_task') || Object.values(_ft?._Pht?.ins?.p_tb||{});}catch(_){return this.cfg('era_task');}},

    current(){try{return _Ba?._zIt?._FIt?.ins?.taskInfo;}catch(_){return null;}},

    eraLive(){try{return _Ba?.n_zS?._Aht?.instance;}catch(_){return null;}}

  };

  // Naming rules suggest task categories, NOT permissions to perform actions.

  // actionId exact matches below come from inspecting the user's game client.

  const rules=[

    {type:'linhlung',label:'Linh Lung Thap / Vuot tang',actions:[21],rx:/linh lung thap.*(?:tang|lau)\s*\d+/},

    {type:'arena',label:'Dau truong / Ke Thang Lam Vua',actions:[165],rx:/ke thang lam vua|dau truong|khieu chien dau truong/},

    {type:'kyngo',label:'Ky Ngo / Tham Hiem',actions:[141],rx:/ky ngo|tham hiem/},

    {type:'cobao',label:'Co Bao',actions:[189],rx:/co bao/},

    {type:'stage',label:'Vuot ai / Tu Vuot',actions:[46],rx:/vuot (?:ai|thien kiep)|vuot tuyen|vuot tang ai/},

    {type:'exp',label:'Nhan vat len cap / EXP',actions:[],rx:/\b(?:len|dat|tang) cap\s*(?:nhan vat|\d)|\bcap nhan vat\b|pho ban exp|kinh nghiem|level\s*\d/},

    {type:'reborn',label:'Chuyen sinh / Dot pha',actions:[],rx:/chuyen sinh|dot pha|cai menh/},

    {type:'enhance',label:'Cuong hoa / Tang cap trang bi',actions:[],rx:/cuong hoa|tang cap trang bi|ren trang bi|trang bi den/},

    {type:'rune',label:'Phu van / Ngoc / Kham da',actions:[],rx:/phu van|kh[aă]m da|ngoc|rune/},

    {type:'pet',label:'Thu cung / Than thu / Toa ky',actions:[],rx:/than thu|thu cung|toa ky|linh thu/},

    {type:'equipment',label:'Trang bi / Tien trang',actions:[],rx:/trang bi|tien trang|do than|canh/},

    {type:'dungeon',label:'Pho ban / Danh quai',actions:[],rx:/pho ban|boss|yeu vuong|quai|phong an/},

    {type:'daily',label:'Hang ngay / Phuc loi / Thuong',actions:[],rx:/hang ngay|nhiem vu ngay|nhan thuong|phuc loi|diem danh/},

    {type:'social',label:'Doi / Bang / Giao luu',actions:[],rx:/chien doi|bang hoi|hao huu|doi nhom/},

    {type:'other-progress',label:'Hanh dong / Tien do khac',actions:[],rx:/kich hoat|su dung|hoan thanh|tham gia|thu thap|mo khoa/}

  ];

  const actionMap=new Map();for(const rule of rules)for(const a of rule.actions)actionMap.set(a,rule);

  function category(task){

    const actionId=Number(task.actionId)||0, n=norm(task.name);

    const byAction=actionMap.get(actionId);if(byAction)return {type:byAction.type,label:byAction.label,method:'verified-actionId'};

    for(const r of rules)if(r.rx.test(n))return {type:r.type,label:r.label,method:'name-heuristic'};

    return {type:'unknown',label:'Chua phan loai',method:'unknown'};

  }

  function capability(type){

    const api={linhlung:'KVPV_V873',arena:'KVPV_V870',kyngo:'KVPV_V871',cobao:'KVPV_V864',stage:'KVPV_DAILY',exp:'KVPV_V866',reborn:'KVPV_V868'}[type];

    if(!api)return {module:null,loaded:false,mode:'need-verified-handler'};

    return {module:api,loaded:!!W[api],mode:'existing-module-check-live'};

  }

  const validRows=a=>Array.isArray(a)?a.filter(x=>Array.isArray(x)&&x[0]!=null):[];

  function allTasks(){

    const rows=validRows(source.main());

    return rows.map(c=>{

      const task={system:'main',id:String(c[0]),name:name(c[1]),actionId:number(c[6])||0,

        configKind:c[2]??null};

      return {...task,...category(task),...capability(category(task).type)};

    });

  }

  function allEraTasks(){

    const rows=validRows(source.era());

    return rows.map(c=>{

      const x=Array.isArray(c[2])?c[2]:[];

      const task={system:'era',id:String(c[0]),name:name(c[1]),actionId:number(x[2])??0,

        configKind:number(x[0]),target:number(x[1])};

      return {...task,...category(task),...capability(category(task).type)};

    });

  }

  function live(){

    const c=source.current(),e=source.eraLive(),tasks=[];

    try{

      for(const id of (Array.isArray(e?.ids)?e.ids:[])){

        const r=e?.getEraNode?.(id);

        if(Array.isArray(r))tasks.push({id:String(id),state:number(r[1]),progress:r[2]??null});

      }

    }catch(_){window.KVPV_V1?.diagnostics?.record(_);}

    return {main:Array.isArray(c)&&c.length?{id:String(c[0]),state:number(c[1]),progress:c[2]??null}:null,

      eraLevel:number(e?.lv),eraNodes:tasks};

  }

  function byAction(tasks){

    const groups=new Map();

    for(const t of tasks){

      const k=t.system+'|'+t.actionId+'|'+t.type;

      if(!groups.has(k))groups.set(k,{system:t.system,actionId:t.actionId,type:t.type,label:t.label,

        recognition:t.method,count:0,loaded:t.loaded,mode:t.mode,module:t.module,examples:[]});

      const g=groups.get(k);g.count++;if(g.examples.length<3)g.examples.push({id:t.id,name:t.name});

    }

    return [...groups.values()].sort((a,b)=>b.count-a.count);

  }

  function byType(tasks){

    const groups=new Map();

    for(const t of tasks){

      const k=t.type;if(!groups.has(k))groups.set(k,{type:k,label:t.label,count:0,actionIds:new Set(),examples:[],module:t.module,loaded:t.loaded,mode:t.mode});

      const g=groups.get(k);g.count++;g.actionIds.add(t.actionId);if(g.examples.length<3)g.examples.push({id:t.id,name:t.name});

    }

    return [...groups.values()].map(g=>({...g,actionIds:[...g.actionIds].sort((a,b)=>a-b)})).sort((a,b)=>b.count-a.count);

  }

  

  function snapshot(){

    const tasks=allTasks(),era=allEraTasks(),all=[...tasks,...era],pending=live();

    const mainRow=tasks.find(r=>r.id===pending.main?.id);

    const current=mainRow?{...mainRow,state:pending.main.state,progress:pending.main.progress}:pending.main;

    return {version:'KVPV_QUEST_ATLAS_V1',generatedAt:new Date().toISOString(),

      limitations:['Client config describes available tasks, not live completion of all tasks',

        'Classification by name is a hint, not a validated gameplay executor',

        'Unknown actionIDs need a verified handler; no guessed RPCs'],

      totals:{main:tasks.length,era:era.length,all:all.length,types:new Set(all.map(x=>x.type)).size,

        exactActionMapping:all.filter(x=>x.method==='verified-actionId').length,

        nameHeuristics:all.filter(x=>x.method==='name-heuristic').length,

        unknown:all.filter(x=>x.type==='unknown').length},

      loadedSources:{main:!!(validRows(source.main()).length),era:!!validRows(source.era()).length},

      live:{main:current,eraLevel:pending.eraLevel,eraNodes:pending.eraNodes},

      typeSummary:byType(all),actionSummary:byAction(all),tasks,eraTasks:era};

  }

  function summary(){

    const s=snapshot();console.log('[ATLAS] Toan bo nhiem vu (chi doc):',s.totals,' | Sources:',s.loadedSources);

    console.table(s.typeSummary.map(x=>({Loai:x.label,SoNhiemVu:x.count,SoActionID:x.actionIds.length,

      Module:x.module||'-',DaNap:x.loaded?'Co':'Khong',ViDu:x.examples?.[0]?.name||''})));

    console.log('[ATLAS] Dang lam',s.live.main,'| Moc Chuyen Sinh',s.live.eraNodes);

    if(!s.loadedSources.main || !s.loadedSources.era)

      console.warn('[ATLAS] Chua dong bo du 2 bang task/era_task. Mo man Chuyen Sinh roi kiem tra lai neu can.');

    return s;

  }

  function missing(){

    const s=snapshot(),rows=s.actionSummary.filter(x=>x.mode==='need-verified-handler'||!x.loaded);

    console.table(rows.slice(0,120).map(x=>({system:x.system,actionId:x.actionId,loai:x.label,soNhiemVu:x.count,

      canBoSung:x.mode==='need-verified-handler'?'Chua co handler':'Can nap module',viDu:x.examples[0]?.name||''})));

    return rows;

  }

  const safeCSV=x=>{

    let s=String(x??'').replace(/\r|\n/g,' ');

    if(/^[=+\-@\t]/.test(s))s="'"+s;

    return '"'+s.replace(/"/g,'""')+'"';
  };
  function csv(s){
    const cols=['system','id','name','actionId','configKind','target','type','method','module','loaded','mode'];
    return '\uFEFF'+cols.join(',')+'\r\n'+[...s.tasks,...s.eraTasks].map(row=>cols.map(c=>safeCSV(row[c])).join(',')).join('\r\n');
  }
  function textSummary(s){
    const out=['KVPV QUEST ATLAS — TOAN BO NHIEM VU (CHI DOC)',
      'Ngay: '+s.generatedAt, 'Nguon: client config task / era_task',
      'Tong: '+s.totals.all+' | main: '+s.totals.main+' | era: '+s.totals.era,
      'Phan loai bang actionId xac minh: '+s.totals.exactActionMapping,
      'Phan loai theo ten (can kiem chung): '+s.totals.nameHeuristics,
      'Chua phan loai: '+s.totals.unknown,'', 'CAC NHOM NHIEM VU'];
    for(const g of s.typeSummary)out.push(g.count+' | '+g.type+' | '+g.label+' | Module '+(g.module||'CHUA CO')+' | '+(g.loaded?'loaded':'missing')+' | example: '+g.examples?.[0]?.name);
    out.push('','NHOM HANH DONG CHUA CO HANDLER / MODULE');
    for(const g of s.actionSummary.filter(x=>x.mode==='need-verified-handler'||!x.loaded))
      out.push(g.system+' | actionId '+g.actionId+' | '+g.type+' | '+g.count+' NV | '+g.examples?.map(x=>x.id+': '+x.name).join('; '));
    out.push('','LUU Y: chi xuat du lieu. Chua the tu xac nhan moi quest co the auto hoan thanh.');
    return out.join('\n');
  }
  function file(kind='json'){
    const s=snapshot(),k=String(kind).toLowerCase();
    if(!['json','csv','txt'].includes(k))throw Error('Dung export("json" | "csv" | "txt")');
    const content=k==='json'?JSON.stringify(s,null,2):k==='csv'?csv(s):textSummary(s);
    const mime=k==='json'?'application/json;charset=utf-8':k==='csv'?'text/csv;charset=utf-8':'text/plain;charset=utf-8';
    const fn='KVPV_QUAN_LY_NHIEM_VU_'+new Date().toISOString().slice(0,10)+'.'+k;
    // User-initiated download only, no outbound data or upload to third parties.
    if(typeof document==='undefined'||typeof Blob==='undefined'||typeof URL==='undefined')
      return {filename:fn,content};
    const url=URL.createObjectURL(new Blob([content],{type:mime}));
    try{const a=document.createElement('a');a.href=url;a.download=fn;a.style.display='none';
      document.body.appendChild(a);a.click();a.remove();}
    finally{setTimeout(()=>URL.revokeObjectURL(url),15000);}
    console.log('[ATLAS] Da yeu cau tai file',fn,'|',s.totals,'(trinh duyet co the chan download trong iframe)');
    return {filename:fn,bytes:content.length,totals:s.totals};
  }
  function copyReport(){
    const s=JSON.stringify(snapshot(),null,2);
    if(typeof W.copy==='function'){W.copy(s);return 'Da copy qua DevTools';}
    if(typeof navigator!=='undefined'&&navigator.clipboard?.writeText)
      return navigator.clipboard.writeText(s).then(()=> 'Da copy vao clipboard');
    console.warn('[ATLAS] Clipboard API khong ho tro trong game-frame; dung .export("json")');
    return s;
  }
  let watchTimer=null,last='';
  function watch(on=true){
    if(watchTimer){__KVPV29.cancel(watchTimer);watchTimer=null;}
    if(on){
      last='';watchTimer=__KVPV29.every(()=>{
        const p=live(),sig=JSON.stringify(p.main);if(p.main&&sig!==last){last=sig;
          const row=allTasks().find(x=>x.id===p.main.id);
          console.log('[ATLAS][TASK]',{...p.main,name:row?.name||'',type:row?.type||'unknown',
            module:row?.module||'missing-handler'});
        }
      },4000);
    }
    return !!watchTimer;
  }
  W.KVPV_QUEST_ATLAS={installed:true,summary,snapshot,missing,export:file,copy:copyReport,watch,category,
    stop(){watch(false);return true;},version:'V1'};
  console.log('[ATLAS] San sang. 1 LENH: KVPV_QUEST_ATLAS.export("json") | Tong hop: .summary() | Missing: .missing()');
})();

/* KVPV V8.6.13 - QUEST FAMILY ENGINE / LINH LUNG THAP
 * Client verified: actionId=21 -> Pagoda/Linh Lung Thap;
 * model _Ba._tQ._$Y.ins.copyData[0] / finishLevel;
 * cfg _ft._u$.ins.getCfgByLv(next)[0] = scene ID;
 * official challenge button _Ba._tQ._kRn.prototype._vRn()
 *   -> _Ba._sst._Cht.inst.rqEtScene(sceneId, nextLevel).
 * NEVER buys turns / sweeps / sends arbitrary RPC / marks quest done locally.
 * Install AFTER V8.6.12 FULL or V8.6.6+ addons inside game-frame.
 */
(()=>{
 'use strict';
 const W=window, D=W.KVPV_DAILY, V=W.KVPV_V8, Q=W.KVPV_V866;
 if(!D?.quickState||!V?.provide||!Q?.registerHandler||typeof _Ba==='undefined'||typeof _ft==='undefined'){
   console.error('[V8.6.13] Can KVPV_V866, KVPV_V8, KVPV_DAILY trong game-frame');return;
 }
 if(W.KVPV_V873?.installed){W.KVPV_V873.start();return;}
 const C={enabled:true,autoChallenge:false,autoOpen:false,openCooldownMs:60000,
   autoStartDaily:false,scanMs:2500,openOnUnknown:false,
   waitServerMs:90000,maxActionsPerQuest:40, maxRetriesPerFloor:1};
 const S={timer:null,oldProvide:null,wrapper:null,registered:new Set(),lastOpen:0,
   lastFetch:0,sent:0,confirmed:0,errors:0,lastError:'',history:[],
   attempts:new Map(),claimed:new Set(),firstSeen:new Map(),lastQuest:'',lastFloor:null,
   pending:null,seenInScene:false,route:'idle'};
 const now=()=>Date.now();
 const norm=t=>String(t??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[đĐ]/g,'d').toLowerCase();
 const integer=x=>Number.isSafeInteger(Number(x))?Number(x):null;
 const floorFromName=n=>{const m=/linh\s*lung\s*thap\s*(?:tang|lau)\s*(\d{1,4})/.exec(norm(n));return m?Number(m[1]):null;};
 const actor=()=>_Ba?._rJ?._O$?.ins?.actorId;
 const model=()=>_Ba?._tQ?._$Y?.ins;
 const cfg=lv=>_ft?._u$?.ins?.getCfgByLv?.(lv);
 const rpc=()=>_Ba?._sst?._Cht?.inst;
 const mgr=()=> (typeof _j!=='undefined'&&_j?.ins)||null;
 const common=()=>_Ba?._$a?.SceneUtil?.isCommonScene===true;
 const inBattle=()=>_Ba?._$a?._yo?.ins?.isInMission===true;
 function mainTask(){
   const v=Q.task?.();return v&&v.id?{id:String(v.id),name:String(v.name),
     actionId:Number(v.actionId),state:Number(v.state),progress:v.progress}:null;
 }
 const families=[];
 function registerFamily(rule){
   if(!rule||!/^[a-z][a-z0-9_-]{2,30}$/.test(rule.type)||typeof rule.match!=='function'||
      typeof rule.plan!=='function')throw Error('registerFamily({type,match,plan})');
   if(families.some(x=>x.type===rule.type))throw Error('Duplicate family '+rule.type);
   families.push(rule);return rule.type;
 }
 // Every new ID matching the same type is automatically assigned one verified handler.
 function recognize(q){
   if(!q)return null;
   for(const rule of families){
     try{const m=rule.match(q);if(m)return {rule,meta:m};}
     catch(e){console.warn('[V8.6.13] Matcher',rule.type,e);}
   }
   return null;
 }
 function log(what,detail){
   S.history.push({time:new Date().toISOString(),what,detail});
   if(S.history.length>100)S.history.shift();
   console.log('[V8.6.13]',what,detail||'');
 }
 function towerPlan(q,meta){
   const target=meta.target,m=model(),stateReady=Array.isArray(m?.copyData)&&
     Number.isSafeInteger(integer(m?.finishLevel))&&Number(m?.finishLevel)>=0;
   const current=stateReady?Number(m.finishLevel):null;
   const max=integer(_ft?._u$?.ins?.maxLv);
   const next=current===null?null:current+1;
   const row=next!==null?cfg(next):null;
   const sceneId=integer(row?.[0]);
   const daily=D.quickState?.();
   const inArena=_Ba?._$a?._yo?.ins?.isInArena===true;
   const total=[...S.attempts.keys()].filter(k=>k.startsWith(q.id+'|')).reduce((sum,k)=>sum+(S.attempts.get(k)||0),0);
   const attemptKey=q.id+'|'+next;
   const attempts=S.attempts.get(attemptKey)||0;
   const busy=typeof W.KVPV_UPGRADES?.busy==='function' && W.KVPV_UPGRADES.busy();
   const ready=!!C.enabled&&!!C.autoChallenge&&q.state!==2&&stateReady&&

     current<target&&Number.isSafeInteger(sceneId)&&sceneId>0&&

     (max===null||next<=max)&&daily?.running===true&&daily?.job==='rảnh'&&

     common()&&!inBattle()&&!inArena&&!busy&&typeof rpc()?.rqEtScene==='function'&&

     attempts<C.maxRetriesPerFloor&&total<C.maxActionsPerQuest;

   let reason= !stateReady?'Chua co du lieu finishLevel/copyData tu server':

     current>=target?'Da dat tang muc tieu, cho server cap nhat quest':

     next!==null&&(max!==null&&next>max)?'Da toi tang toi da':

     !row||!sceneId?'Khong tim thay sceneID cho tang tiep':

     !daily?.running?'KVPV_DAILY chua chay':

     daily.job!=='rảnh'?'Auto Daily dang ban: '+daily.job:

     !common()||inBattle()||inArena?'Dang o trong phu ban / khong o ban do thuong':

     busy?'Hang doi nang cap dang ban':

     attempts>=C.maxRetriesPerFloor?'Da thu tang '+next+', cho server cap nhat / xem loi':

     total>=C.maxActionsPerQuest?'Da cham gioi han so luot quest':

     typeof rpc()?.rqEtScene!=='function'?'Thieu native rqEtScene':

     ready?'Da san sang vao tang '+next:'Chua du dieu kien';

   // Server task state=2 means completed even if tower finishLevel appears stale.

   if(q.state===2)reason='Nhiem vu da xong, doi nhan thuong';

   const signature=JSON.stringify([q.id,q.state,q.progress,current,next,sceneId]);

   return {type:'linhlung',task:q,actorId:String(actor()??''),target,current,next,sceneId,

     stateReady,attempts,total,ready,reason,signature,daily};

 }

 registerFamily({type:'linhlung',match:q=>{

   if(q.actionId!==21)return false;

   const target=floorFromName(q.name);

   return target!==null&&target>=1&&target<=10000?{target}:false;

 },plan:towerPlan});

 

 function snapshot(){const q=mainTask(),m=recognize(q);

   return m?m.rule.plan(q,m.meta):{type:null,task:q,ready:false,

     reason:q?'Chua co mau handler phu hop':'Chua dong bo nhiem vu'};

 }

 function registerForCurrent(p){

   if(!p?.task?.id||!p.type||S.registered.has(p.task.id))return;

   const id=p.task.id;

   try{

     Q.registerHandler(id,({quest})=>{

       if(!C.enabled||!quest)return 'family-off';

       const recognized=recognize(quest);

       if(!recognized)return 'family-unknown';

       const plan=recognized.rule.plan(quest,recognized.meta);

       return plan.ready?'family-'+plan.type+'-ready':'family-'+plan.type+': '+plan.reason;

     });

     S.registered.add(id);log('Da tao HANDLER cho '+id,{type:p.type,target:p.target,actionId:p.task.actionId});

   }catch(e){S.lastError=String(e);console.warn('[V8.6.13] registerHandler',e);}

 }

 function refresh(){

   if(now()-S.lastFetch<60000)return;

   const m=model();if(m?.copyData)return;

   const f=_Ba?._tQ?._vJt?.ins?._lJt;

   if(typeof f==='function'){S.lastFetch=now();try{f.call(_Ba._tQ._vJt.ins);}catch(e){S.lastError=String(e);}}

 }

 function open(p){

   if(!C.enabled||!C.autoOpen||!p?.task||p?.task?.state===2||!common()||inBattle()||

      D.quickState?.()?.job!=='rảnh'||now()-S.lastOpen<C.openCooldownMs)return;

   if(typeof mgr()?.openByActionId!=='function')return;

   S.lastOpen=now();try{mgr().openByActionId(p.task.actionId);log('Mo LINH LUNG THAP (chi dieu huong)',p.task.id);}

   catch(e){S.lastError=String(e);}

 }

 function runFloor(expected){

   // Upgrade queue is marked busy already: don't call upgrades.busy() here.

   // Independently revalidate scene, task, server floor and the intended map.

   const p=snapshot(),q=p.task;

   const day=D.quickState?.();

   if(!q||!p.type||!p.stateReady||q.state===2||p.current>=p.target||

      q.id!==expected.task.id||p.next!==expected.next||p.sceneId!==expected.sceneId||

      p.signature!==expected.signature||day?.running!==true||!common()||inBattle()||

      _Ba?._$a?._yo?.ins?.isInArena===true||typeof rpc()?.rqEtScene!=='function')

      throw Error('Tower changed or server quest stale');

   const key=q.id+'|'+p.next, n=S.attempts.get(key)||0;

   if(n>=C.maxRetriesPerFloor)throw Error('Tower floor already attempted; wait server');

   S.attempts.set(key,n+1);

   S.pending={id:q.id,floor:p.next,at:now(),signature:p.signature};

   S.sent++;

   rpc().rqEtScene(p.sceneId,p.next);

   log('VAO LINH LUNG THAP',{task:q.id,tang:p.next,dich:p.target,map:p.sceneId});

 }

 function offer(mode){

   if(mode==='claim'){

     const p=snapshot();

     if(p.type==='linhlung'&&p.ready){

       const frozen={...p};

       return {k:'moduleWork',what:`Quest auto Linh Lung ${p.next}/${p.target}`,

         before:p.signature,

         probe:()=>snapshot().signature??p.signature,

         run:()=>runFloor(frozen),

         done:()=>{S.confirmed++;log('Scene/quest update sau khi vao thap',p.next);},

         failed:why=>{S.errors++;S.lastError=String(why);log('Tower: khong co ACK',why);}};

     }

   }

   return S.oldProvide.call(V,mode);

 }

 function scan(){

   if(!C.enabled)return;

   const p=snapshot();

   if(!p.type){S.route=p.reason;return;}

   S.route=p.reason;registerForCurrent(p);

   if(p.task?.id!==S.lastQuest){S.lastQuest=p.task.id;log('NHIEM VU',{

     id:p.task.id,name:p.task.name,type:p.type,target:p.target,current:p.current});}

   if(p.task.state!==2&&!p.stateReady)refresh();

   if(p.type==='linhlung'&&p.task.state!==2&&p.current<p.target)open(p);

   // Only the server's own finishLevel change counts as authoritative progress.

   if(p.current!==null && S.lastFloor!==p.current){

     if(S.lastFloor!==null && p.current>S.lastFloor)log('SERVER XAC NHAN QUA TANG',p.current);

     S.lastFloor=p.current;

   }

   if(p.task.state===2||p.current>=p.target){

     if(!S.claimed.has(p.task.id)){S.claimed.add(p.task.id);log('Hoan thanh dieu kien: cho V8 nhan thuong',p.task.id);}

   }

   if(!D.quickState?.()?.running&&C.autoStartDaily)D.start?.();

 }

 

 function start(){if(S.timer)__KVPV29.cancel(S.timer);

   if(V.provide!==S.wrapper){S.oldProvide=V.provide;S.wrapper=offer;V.provide=offer;}

   C.enabled=true;S.timer=__KVPV29.every(()=>{try{scan();}catch(e){S.errors++;S.lastError=String(e);}},C.scanMs);

   scan();return true;

 }

 

 function stop(){C.enabled=false;if(S.timer)__KVPV29.cancel(S.timer);S.timer=null;

   if(V.provide===S.wrapper&&S.oldProvide)V.provide=S.oldProvide;

   for(const id of S.registered){try{Q.unregisterHandler?.(id);}catch(_){window.KVPV_V1?.diagnostics?.record(_);}}

   S.registered.clear();return true;

 }

 

 function status(print=true){const p=snapshot();const s={...p,sent:S.sent,confirmed:S.confirmed,

   errors:S.errors,lastError:S.lastError,registered:[...S.registered],pending:S.pending,

   canAuto:!!C.enabled,route:S.route};if(print)console.table([{

     ID:p.task?.id,loai:p.type,tangHienTai:p.current,mucTieu:p.target,tangTiep:p.next,

     auto:p.ready,'lyDo':p.reason,daGui:S.sent,loi:S.lastError||'-'}]);return s;

 }

 W.KVPV_V873={installed:true,config:C,recognize,snapshot,status,history:()=>S.history.slice(),

   families:()=>families.map(x=>x.type),registerFamily,

   start,stop,retryFloor(){const p=snapshot();if(!p.type||p.next===null)return false;

     // User explicitly requests retry for a known floor; never automatic repeated requests.

     S.attempts.delete(p.task.id+'|'+p.next);S.pending=null;return true;}};

 start();console.log('[V8.6.13] QUEST FAMILY ENGINE bat. KVPV_V873.status()');

})();



/* KVPV V8.6.14 - UNIVERSAL QUEST REGISTRY / AUTO-ROUTER
 * Compatible with KVPV V8.6.13 FULL (V866 + Atlas + V873).
 * Registers a handler for every MAIN quest whose V866 route is unknown,
 * using config-defined action and name families. Hooks are safe/read-only
 * unless delegated to an already verified game module. Unknown tasks are
 * guided to their configured screen at most once; not marked completed.
 * It DOES NOT synthesize network messages or invent gameplay actions.
 */

(()=>{

 'use strict';

 const W=window, Q=W.KVPV_V866, D=W.KVPV_DAILY;

 if(!Q?.registerHandler||!Q?.task||!Q?.routeName||!D?.quickState||typeof _ft==='undefined'){

   console.error('[V8.6.14] Nap V8.6.13 FULL trong game-frame truoc');return;

 }

 if(W.KVPV_V874?.installed){W.KVPV_V874.start();console.log('[V8.6.14] Engine da ton tai');return;}

 const C={enabled:true,scanMs:2500,autoScanAll:true,autoActivateVerified:true,

   autoNavigateUnknownOnce:true,autoStartDaily:false,logUnknownEveryMs:180000,

   maximumCatalog:20000,maxHistory:200};

 const S={timer:null,rows:new Map(),attached:new Set(),preserved:new Set(),

   navAttempt:new Set(),moduleStarted:new Set(),history:[],newQuests:0,

   lastTask:null,lastProgress:null,lastState:null,serverUpdates:0,

   lastMsg:new Map(),lastError:'',errors:0,loaded:0,created:0,delegated:0,lastCatalogRefresh:0};

 const now=()=>Date.now();

 const norm=x=>String(x??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[đĐ]/g,'d').toLowerCase().trim();

 const validQuestId=x=>/^m\d+$/.test(String(x));

 const int=x=>Number.isSafeInteger(Number(x))?Number(x):0;

 const log=(kind,detail)=>{

   S.history.push({at:new Date().toISOString(),kind,detail});

   if(S.history.length>C.maxHistory)S.history.shift();

   console.log('[V8.6.14]',kind,detail||'');

 };

 const specs=[

  {type:'cobao',actionIds:[189],module:'KVPV_V864',rx:/co bao|shenqi/,kind:'verified'},

  {type:'arena',actionIds:[165],module:'KVPV_V870',rx:/ke thang lam vua|dau truong/,kind:'verified'},

  {type:'kyngo',actionIds:[141],module:'KVPV_V871',rx:/ky ngo|tham hiem/,kind:'verified'},

  {type:'linhlung',actionIds:[21],module:'KVPV_V873',rx:/linh lung thap/,kind:'verified'},

  {type:'stage',actionIds:[46],module:'KVPV_DAILY',rx:/vuot ai|vuot thien kiep|vuot tang/,kind:'verified'},

  {type:'exp',actionIds:[],module:'KVPV_V866',rx:/\b(?:len|tang|dat) cap\s*(?:nhan vat|\d)|cap nhan vat|pho ban exp|kinh nghiem|\blevel\s*\d+/,kind:'module'},

  {type:'reborn',actionIds:[],module:'KVPV_V868',rx:/chuyen sinh|dot pha|cai menh/,kind:'module'},

  {type:'enhance',actionIds:[],module:null,rx:/cuong hoa|tang cap trang bi|ren trang bi/,kind:'guided'},

  {type:'rune',actionIds:[],module:null,rx:/phu van|kh[aă]m da|duc hon|ngoc/,kind:'guided'},

  {type:'pet',actionIds:[],module:null,rx:/than thu|thu cung|toa ky|linh thu/,kind:'guided'},

  {type:'equipment',actionIds:[],module:null,rx:/tien trang|trang bi|thien phu|canh/,kind:'guided'},

  {type:'dungeon',actionIds:[],module:null,rx:/pho ban|boss|yeu vuong|phong an/,kind:'guided'},

  {type:'daily',actionIds:[],module:null,rx:/nhiem vu ngay|nhan thuong|phuc loi|diem danh|lich luyen/,kind:'guided'},

  {type:'social',actionIds:[],module:null,rx:/chien doi|bang hoi|hao huu|doi nhom/,kind:'guided'},

  {type:'progress',actionIds:[],module:null,rx:/kich hoat|su dung|thu thap|hoan thanh|mo khoa/,kind:'guided'}

 ];

 const manualActions=new Map();

 function detect(row){

   const a=int(row.actionId),n=norm(row.name);

   // Every native action mapping is bounded by an accompanying semantic check.

   for(const r of specs){if(r.actionIds.includes(a)&&r.rx.test(n))

     return {type:r.type,certainty:'verified-action+name',module:r.module,mode:r.kind};}

   if(manualActions.has(a)){

     const r=specs.find(x=>x.type===manualActions.get(a));

     if(r)return {type:r.type,certainty:'user-alias',module:r.module,mode:'needs-action-verification'};

   }

   for(const r of specs){if(r.rx.test(n))

     return {type:r.type,certainty:'name-only',module:r.module,mode:r.kind==='verified'?'needs-action-verification':r.kind};}

   return {type:'unknown',certainty:'unclassified',module:null,mode:'guided'};

 }

 function sourceRows(){

   let raw=null;

   try{raw=_ft?.__Z?.ins?.originCfg;}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

   if(!Array.isArray(raw)&&typeof _Sa!=='undefined')try{raw=_Sa?.getCfg?.('task');}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

   return Array.isArray(raw)?raw:[];

 }

 function build(row){

   const r={id:String(row.id),name:String(row.name??row.id),actionId:int(row.actionId),system:row.system||'main'};

   return {...r,...detect(r)};

 }

 function current(){

   const q=Q.task();return q&&validQuestId(q.id)?{...build(q),state:q.state,progress:q.progress}:null;

 }

 function collectCatalog(){

   const raw=sourceRows();let count=0;

   for(const c of raw){

     if(count>=C.maximumCatalog)break;

     if(!Array.isArray(c)||!validQuestId(c[0]))continue;

     const row=build({id:c[0],name:c[1],actionId:c[6]});

     S.rows.set(row.id,row);count++;

   }

   S.loaded=S.rows.size;

   return count;

 }

 function alreadyAttached(){

   try{return new Set(Q.status(false)?.handledExtra||[]);}catch(_){return new Set();}

 }

 function createHandler(row,existing){

   if(!row||!validQuestId(row.id)||S.attached.has(row.id)||S.preserved.has(row.id))return false;

   // Leave verified external addons (V873/V871/...) in control of their own handlers.

   if(existing.has(row.id)){S.preserved.add(row.id);return false;}

   let route='unknown';

   try{route=Q.routeName({...row,state:0,progress:[]});}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

   if(route!=='unknown')return false; // Native director already owns this family.

   const id=row.id;

   try{Q.registerHandler(id,({quest,open,busy})=>{

     if(!C.enabled||!quest||String(quest.id)!==id)return 'universal-inactive';

     if(Number(quest.state)===2)return 'wait-native-claim';

     const d=build(quest);let outcome='';

     if(d.module&&d.mode!=='needs-action-verification'&&W[d.module]){

       outcome='delegate-'+d.type;

       activate(d);

     }else if(d.module&&d.mode==='needs-action-verification'){

       outcome='actionId-unverified-'+d.type;

     }else outcome='guide-'+d.type;

     // Open only native quest actionId; this is navigation, NOT gameplay completion.

     if(C.autoNavigateUnknownOnce&&d.actionId>0&&!S.navAttempt.has(id)&&!busy){

       S.navAttempt.add(id);

       try{open(d.actionId,'AUTO_ROUTE');}

       catch(e){S.errors++;S.lastError=String(e);}

     }

     return outcome;

   });

     S.attached.add(id);S.created++;return true;

   }catch(e){S.errors++;S.lastError=String(e);return false;}

 }

 function activate(row){

   if(!C.autoActivateVerified||!row||!row.module||row.mode==='needs-action-verification')return;

   if(!W[row.module]||S.moduleStarted.has(row.type))return;

   // Only start an existing reviewed module; NEVER infer unknown RPCs from function names.

   if(!['arena','kyngo','cobao','linhlung','reborn'].includes(row.type))return;

   const m=W[row.module];

   if(typeof m.start==='function'){

     try{m.start();S.moduleStarted.add(row.type);S.delegated++;}

     catch(e){S.errors++;S.lastError=String(e);}

   }

 }

 function attachAll(){

   S.lastCatalogRefresh=now();collectCatalog();const existing=alreadyAttached();let n=0;

   for(const row of S.rows.values())if(createHandler(row,existing))n++;

   return n;

 }

 

 function watch(){

   if(!C.enabled)return;

   if(C.autoScanAll&&S.loaded===0&&now()-S.lastCatalogRefresh>60000)attachAll();

   const c=current();if(!c)return;

   if(!S.rows.has(c.id)){S.rows.set(c.id,c);S.loaded=S.rows.size;}

   createHandler(c,alreadyAttached());

   const sig=JSON.stringify([c.id,c.state,c.progress]);

   if(c.id!==S.lastTask){

     S.newQuests++;S.lastTask=c.id;S.lastProgress=sig;S.lastState=c.state;

     log('QUEST MOI: DA PHAN LOAI',{

       id:c.id,name:c.name,actionId:c.actionId,type:c.type,

       mode:c.mode,module:c.module||'-'});

   } else if(S.lastProgress!==sig){

     S.lastProgress=sig;S.lastState=c.state;S.serverUpdates++;

     log('SERVER CAP NHAT NHIEM VU',{id:c.id,state:c.state,progress:c.progress});

   }

   if(c.state===2)return; // Existing V8 claim path owns server completion.

   if(c.module&&c.mode!=='needs-action-verification')activate(c);

   if(!c.module||!W[c.module]||c.mode==='needs-action-verification'){

     const key=c.id+'|'+c.type,prev=S.lastMsg.get(key)||0;

     if(now()-prev>C.logUnknownEveryMs){S.lastMsg.set(key,now());

       log('CHUA CO EXECUTOR DA XAC MINH',{id:c.id,type:c.type,

         actionId:c.actionId,meaning:'Da co handler nhan dien/theo doi; can xac minh thao tac game de tu hoan thanh'});

     }

   }

   if(C.autoStartDaily&&!D.quickState()?.running)try{D.start?.();}catch(e){S.lastError=String(e);}

 }

 

 function start(){

   C.enabled=true;if(S.timer)__KVPV29.cancel(S.timer);

   if(C.autoScanAll)attachAll();

   S.timer=__KVPV29.every(()=>{try{watch();}catch(e){S.errors++;S.lastError=String(e);}},C.scanMs);

   watch();return true;

 }

 

 function stop(){

   C.enabled=false;if(S.timer)__KVPV29.cancel(S.timer);S.timer=null;

   for(const id of S.attached)try{Q.unregisterHandler(id);}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

   S.attached.clear();return true;

 }

 function summary(print=true){

   collectCatalog();const groups=new Map();

   for(const r of S.rows.values()){

     const k=r.type+'|'+r.mode,grp=groups.get(k)||{type:r.type,mode:r.mode,count:0,module:r.module||'-',samples:[]};

     grp.count++;if(grp.samples.length<2)grp.samples.push(r.id+': '+r.name);

     groups.set(k,grp);

   }

   const list=[...groups.values()].sort((a,b)=>b.count-a.count);

   if(print)console.table(list.map(r=>({Nhom:r.type,CapDo:r.mode,SoNhiemVu:r.count,

     Module:r.module,ViDu:r.samples[0]||''})));

   return {total:S.rows.size,created:S.created,currentlyAttached:S.attached.size,

     preservedFromOtherModules:S.preserved.size,groups:list};

 }

 

 function status(print=true){const c=current(),m=c?.module&&W[c.module],

   out={running:!!S.timer,quest:c,questRoute:c?Q.routeName(c):'none',

     executorModuleLoaded:!!m,verifiedRoute:!!m&&c.mode==='verified',

     handlerCreated:c?S.attached.has(c.id)||S.preserved.has(c.id)||Q.routeName(c)!=='unknown':false,

     scriptModule:c?.module||null,serverUpdates:S.serverUpdates,

     visitedNewQuests:S.newQuests,configured:S.rows.size,attached:S.attached.size,

     attachedExternally:S.preserved.size,errors:S.errors,lastError:S.lastError,

     autoDaily:D.quickState?.()?.running};

   if(print)console.table([{ID:c?.id,Task:c?.name,Loai:c?.type,

     Handler:out.handlerCreated,ModuleDaNap:out.executorModuleLoaded,

     TrangThai:c?.state,Action:c?.actionId,AutoDaily:out.autoDaily}]);return out;

 }

 function missing(){const rows=summary(false).groups.filter(x=>x.module==='-'||!W[x.module]||x.mode==='needs-action-verification');

   console.table(rows.map(x=>({Loai:x.type,SoNhiemVu:x.count,MucDo:x.mode,ViDu:x.samples[0]})));return rows;

 }

 // Explicit, session-only mappings to an EXISTING reviewed family; no user-supplied source execution.

 function aliasAction(actionId,family){

   const id=int(actionId),f=specs.find(x=>x.type===family&&x.module);

   if(id<=0||!f)throw Error('Dung aliasAction(actionId, hoHandlerDaCo)');

   manualActions.set(id,f.type);

   S.rows.clear();S.preserved.clear();

   collectCatalog();return {actionId:id,family:f.type,warning:'Yeu cau doi chieu ten va trang thai; khong tao RPC moi'};

 }

 

 function exportReport(){

   const data={version:'V8.6.14',generatedAt:new Date().toISOString(),status:status(false),

     summary:summary(false),unresolved:missing().map(x=>({type:x.type,count:x.count,examples:x.samples})),

     recent:S.history.slice(-60)};

   const txt=JSON.stringify(data,null,2),filename='KVPV_QUEST_REPORT_'+new Date().toISOString().slice(0,10)+'.json';

   if(typeof document==='undefined'||typeof Blob==='undefined'||typeof URL==='undefined')return {filename,content:txt};

   const u=URL.createObjectURL(new Blob([txt],{type:'application/json'}));

   try{const a=document.createElement('a');a.href=u;a.download=filename;document.body.appendChild(a);a.click();a.remove();}

   finally{setTimeout(()=>URL.revokeObjectURL(u),15000);}

   return {filename,length:txt.length};

 }

 W.KVPV_V874={installed:true,config:C,start,stop,detect,attachAll,

   status,summary,missing,exportReport,aliasAction,history:()=>S.history.slice(),

   task:current};

 start();log('UNIVERSAL QUEST ENGINE DA BAT',{known:S.loaded,attached:S.attached.size,

   use:'KVPV_V874.status() / .summary() / .missing()'});

})();



/* V8.6.15 - AUTO PET/LINH THU QUEST EXECUTOR
 * Client-derived official button: _Ba._OJ._VBn.inst.fdPet()
 * Server model: _Ba._OJ._GJ.inst._curLv/_curExp
 * Material config: _ft._XZ.ins.getPetFeedCfgByLv(level)[2] = [itemId,quantity,expGain]
 * No shop actions, no premium purchases, no synthesized packets, no local fake completion.
 * Install AFTER KVPV V8.6.14 FULL in the actual game-frame console.
 */

(() => {

  'use strict';

  const W=window, Q=W.KVPV_V866, V=W.KVPV_V8, D=W.KVPV_DAILY;

  if (!Q?.task || !Q?.registerHandler || !V?.provide || !D?.quickState ||

      typeof _Ba==='undefined' || typeof _ft==='undefined') {

    console.error('[V8.6.15 PET] Need V8.6.14 FULL and correct game-frame.');

    return;

  }

  if (W.KVPV_V875?.installed) {

    W.KVPV_V875.start(); console.log('[V8.6.15 PET] Already installed.'); return;

  }

  const C={enabled:true,autoFeed:true,autoOpen:false,autoStartDaily:false,

    scanMs:2500,minimumIntervalMs:1800,maxFeedsPerQuest:90,

    requireCommonScene:true};

  const S={timer:null,wrapped:null,previous:null,registered:new Set(),opened:new Set(),

    attempts:new Map(),sent:0,ack:0,errors:0,lastError:'',lastActionAt:0,lastTask:'',

    noAckAt:0,history:[]};

  const now=()=>Date.now();

  const normalize=x=>String(x??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'')

    .replace(/[đĐ]/g,'d').toLowerCase();

  const model=()=>_Ba?._OJ?._GJ?.inst;

  const rpc=()=>_Ba?._OJ?._VBn?.inst;

  const feedCfg=lv=>_ft?._XZ?.ins?.getPetFeedCfgByLv?.(lv);

  const bag=()=>_Ba?._Ic?._aQ?.ins;

  function matches(q) {

    if(!q || Number(q.actionId)!==2 || !/linh\s*thu|than\s*thu|thu\s*cung/.test(normalize(q.name)))return null;

    const n=normalize(q.name);

    if(!/boi\s*duong|tang\s*(?:cap|den|lv)|dat\s*(?:cap|lv)|len\s*(?:lv|cap)/.test(n))return null;

    const m=/(?:lv\.?|level|cap)\s*(\d{1,4})\b/.exec(n);

    if(!m)return null;

    const target=Number(m[1]);

    return target>=1&&target<=10000?{target}:null;

  }

  const task=()=>Q.task?.();

  function plan(forOwnQueue=false) {

    const q=task(),matched=matches(q),m=model(),d=D.quickState?.(),

      level=Number(m?._curLv),exp=Number(m?._curExp);

    const validLevel=!!m?.fd&&Number.isSafeInteger(level)&&level>=0&&Number.isFinite(exp)&&exp>=0;

    const row=validLevel?feedCfg(level):null;

    const feed=Array.isArray(row?.[2])?row[2]:null;

    const itemId=Number(feed?.[0]),required=Number(feed?.[1]),gain=Number(feed?.[2]);

    const cfgOK=Number.isSafeInteger(itemId)&&itemId>0&&Number.isSafeInteger(required)&&required>0&&gain>0;

    const owned=cfgOK?Number(bag()?.getItemCountById?.(itemId)):NaN;

    const remaining=matched?Math.max(0,matched.target-level):null;

    const attempt=S.attempts.get(q?.id)||0;

    const common=_Ba?._$a?.SceneUtil?.isCommonScene===true;

    const inMission=_Ba?._$a?._yo?.ins?.isInMission===true;

    const inArena=_Ba?._$a?._yo?.ins?.isInArena===true;

    const externalBusy=!forOwnQueue&&W.KVPV_UPGRADES?.busy?.()===true;

    const signature=JSON.stringify([q?.id,q?.state,q?.progress,validLevel?level:null,validLevel?exp:null]);

    const reason=!matched?'Current quest is not a verified pet-feed family':

      q?.state===2?'Quest done, waiting native claim':

      !validLevel?'Pet model not synchronized':

      level>=matched.target?'Target level reached; waiting quest server update':

      !feed||!cfgOK?'Missing/invalid material config':

      !Number.isFinite(owned)?'Inventory not synchronized':

      owned<required?`Missing material ${itemId}: owned ${owned}/${required}`:

      !rpc()||typeof rpc().fdPet!=='function'?'Official feedPet RPC not available':

      d?.running!==true?'Auto Daily not running':

      d?.job!=='rảnh'?'Daily busy: '+d?.job:

      C.requireCommonScene&&(!common||inMission||inArena)?'In battle or outside common scene':

      externalBusy?'Upgrade queue occupied':

      attempt>=C.maxFeedsPerQuest?'Safety limit reached':

      now()-S.lastActionAt<C.minimumIntervalMs?'Feed cooldown':

      'ready';

    return {task:q,target:matched?.target??null,level:validLevel?level:null,exp:validLevel?exp:null,

      itemId:cfgOK?itemId:null,required:cfgOK?required:null,owned:Number.isFinite(owned)?owned:null,

      gain:cfgOK?gain:null,attempt,signature,ready:C.enabled&&C.autoFeed&&reason==='ready',reason};

  }

  function registerCurrent() {

    const q=task();if(!matches(q)||S.registered.has(q.id))return false;

    try{

      Q.registerHandler(q.id,({quest})=>{

        if(!C.enabled)return 'pet-executor-paused';

        if(!matches(quest))return 'pet-executor-other-task';

        const p=plan();

        return p.ready?'pet-feed-ready':p.reason;

      });

      S.registered.add(q.id);

      console.log('[V8.6.15 PET] Created actual executor for',q.id,q.name);

      return true;

    }catch(e){S.errors++;S.lastError=String(e);return false;}

  }

  function run(expected) {

    // The shared queue already marked itself busy. Do NOT check U.busy() in run().

    const p=plan(true),q=p.task;

    if(!C.enabled||!C.autoFeed||!q||q.id!==expected.task.id||

       p.signature!==expected.signature||p.level>=p.target||

       !p.itemId||p.owned<p.required||D.quickState?.()?.running!==true||

       D.quickState?.()?.job!=='rảnh'||

       (C.requireCommonScene&&_Ba?._$a?.SceneUtil?.isCommonScene!==true)||

       _Ba?._$a?._yo?.ins?.isInMission===true||

       _Ba?._$a?._yo?.ins?.isInArena===true||

       typeof rpc()?.fdPet!=='function')throw Error('Pet state changed; wait server');

    const attempts=S.attempts.get(q.id)||0;

    if(attempts>=C.maxFeedsPerQuest)throw Error('Pet feed limit reached');

    S.attempts.set(q.id,attempts+1);S.lastActionAt=now();S.sent++;

    // Exact official button action, only after inventory & quest guard.

    rpc().fdPet();

    console.log('[V8.6.15 PET] Sent Boi duong Linh Thu', {id:q.id,lv:p.level,target:p.target,item:p.itemId,quantity:p.required});

  }

  function provide(mode) {

    if(mode==='claim'){

      const p=plan();

      if(p.ready){

        const expected=p;

        return {k:'moduleWork',what:`Quest Linh Thu Lv${p.level}->${p.target}`,

          before:p.signature, probe:()=>plan(true).signature,

          run:()=>run(expected),

          done:()=>{S.ack++;console.log('[V8.6.15 PET] Server updated pet level/EXP',plan(true).level);},

          failed:why=>{S.errors++;S.lastError=String(why);

            console.warn('[V8.6.15 PET] Queue failed; no blind retry:',why);}};

      }

    }

    return S.previous?.call(V,mode)??null;

  }

  

  function watch() {

    if(!C.enabled)return;

    const q=task();

    if(!matches(q))return;

    registerCurrent();

    if(q.id!==S.lastTask){S.lastTask=q.id;

      console.log('[V8.6.15 PET] Pet quest detected',q.id,q.name,plan(true));}

    if(C.autoOpen&&!S.opened.has(q.id)&&D.quickState?.()?.job==='rảnh'&&

       _Ba?._$a?.SceneUtil?.isCommonScene===true){

      try{((typeof _j!=='undefined'&&_j?.ins)||W.window_WinMgr)?.openByActionId?.(2);

        S.opened.add(q.id);}catch(e){S.lastError=String(e);}

    }

    if(C.autoStartDaily&&D.quickState?.()?.running!==true)D.start?.();

  }

  

  function start(){

    C.enabled=true;

    if(V.provide!==S.wrapped){S.previous=V.provide;S.wrapped=provide;V.provide=provide;}

    if(S.timer)__KVPV29.cancel(S.timer);

    S.timer=__KVPV29.every(()=>{try{watch();}catch(e){S.errors++;S.lastError=String(e);}},C.scanMs);

    watch();return true;

  }

  

  function stop(){C.enabled=false;

    if(S.timer)__KVPV29.cancel(S.timer);S.timer=null;

    if(V.provide===S.wrapped&&S.previous)V.provide=S.previous;

    // Leave the safely paused handlers installed to avoid deleting unrelated handlers.

    return true;

  }

  

  function status(){const p=plan();console.table([{

    ID:p.task?.id,Task:p.task?.name,Level:p.level,MucTieu:p.target,

    Item:p.itemId,Co:p.owned,Can:p.required,Ready:p.ready,LyDo:p.reason,

    Sent:S.sent,Ack:S.ack,Errors:S.errors,LastError:S.lastError||'-'}]);

    return {...p,sent:S.sent,ack:S.ack,errors:S.errors,lastError:S.lastError};}

  W.KVPV_V875={installed:true,config:C,start,stop,status,plan,

    registered:()=>[...S.registered]};

  start();

  console.log('[V8.6.15 PET] Auto executor installed. KVPV_V875.status()');

})();



/* KVPV V8.6.16 - EXECUTOR FACTORY FOR ALL QUEST IDS
 * Generates a typed executor for every quest in the local client catalog.
 * VERIFIED recipe => delegates to existing executable game module, or executes a
 * separately registered, audited recipe via the V8 shared queue.
 * UNKNOWN recipe => diagnostic executor, no guessed clicks/RPCs/purchases.
 * Load AFTER the other V8.6.15 FULL modules, in the same game frame.
 */

(() => {

 'use strict';

 const W=window, Q=W.KVPV_V866, D=W.KVPV_DAILY, V=W.KVPV_V8;

 if(!Q?.task||!D?.quickState||!V?.provide||typeof _ft==='undefined'){

   console.error('[V8.6.16] Requires V8.6.15 FULL in the game-frame');return;

 }

 if(W.KVPV_V876?.installed){W.KVPV_V876.start();return;}

 const C={enabled:true,autoStartDaily:true,scanMs:2500,

   maxCatalog:20000,diagnosticLogEveryMs:180000,

   allowMaterialRecipes:false,

   maxAttemptsPerUnchangedState:1,historyMax:300};

 const S={timer:null,provider:null,previous:null,recipes:[],executors:new Map(),

   attempts:new Map(),lastNotice:new Map(),history:[],latest:null,

   sent:0,confirmed:0,failed:0,generated:0,unknown:0,errors:0,

   lastError:'',startupAt:Date.now(),savedPublicExp:undefined,savedPreferExp:undefined,

   lastId:null, lastSig:null};

 const now=()=>Date.now();

 const norm=x=>String(x??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'')

   .replace(/[đĐ]/g,'d').toLowerCase().replace(/\s+/g,' ').trim();

 const valid=x=>/^m\d+$/.test(String(x));

 const idnum=x=>Number.isSafeInteger(Number(x))?Number(x):0;

 const emit=(msg,value)=>{const r={at:new Date().toISOString(),msg,value};

   S.history.push(r);if(S.history.length>C.historyMax)S.history.shift();

   console.log('[V8.6.16]',msg,value??'');};

 const mstate=()=>D.quickState?.()||{};

 const qstate=()=>Q.task?.();

 const fromCfg=raw=>({id:String(raw[0]),name:String(raw[1]||''),actionId:idnum(raw[6]),state:0,progress:null});

 const nativeMods={

   pet:'KVPV_V875',linhlung:'KVPV_V873',arena:'KVPV_V870',kyngo:'KVPV_V871',

   cobao:'KVPV_V864',stage:'KVPV_DAILY',exp:'KVPV_V866',reborn:'KVPV_V868'

 };

 function recipe(p){

   const n=norm(p?.name),a=idnum(p?.actionId);

   // Only pair observed action IDs with matching semantics. NEVER treat every

   // actionId 2 (pet) or every Lv N as character EXP.

   if(a===2&&/\b(linh thu|than thu|thu cung)\b/.test(n)&&

       /(boi duong|nang cap|tang cap|len lv|dat lv)/.test(n)&&

       /(?:lv\.?|level|cap)\s*\d+/.test(n))return {type:'pet',verified:true};

   if(a===21&&/linh lung thap/.test(n)&&/tang\s*\d+/.test(n))return {type:'linhlung',verified:true};

   if(a===165&&/(ke thang lam vua|dau truong)/.test(n))return {type:'arena',verified:true};

   if(a===141&&/ky ngo/.test(n))return {type:'kyngo',verified:true};

   if(a===189&&/co bao/.test(n))return {type:'cobao',verified:true};

   if(a===46&&/(vuot ai|vuot thien kiep|vuot tang)/.test(n))return {type:'stage',verified:true};

   if(/(?:cap nhan vat|nhan vat dat cap|nhan vat len cap|pho ban exp|\bexp\b)/.test(n)&&

      !/(linh thu|than thu|thu cung|co bao|trang bi|phu van)/.test(n))

     return {type:'exp',verified:true};

   if(/(?:chuyen sinh|dot pha canh gioi)/.test(n)&&a!==2)return {type:'reborn',verified:false};

   // Custom validated recipes are evaluated last (never override built-ins).

   for(const r of S.recipes){let ok=false;try{ok===false&&(ok=!!r.match(p));}catch(e){S.errors++;S.lastError=String(e);}

     if(ok)return {type:r.type,verified:true,custom:r};}

   // Broad classification is still useful for diagnostics; no arbitrary run.

   const kind=/(linh thu|than thu|thu cung)/.test(n)?'pet-unverified':

     /cuong hoa|trang bi|phu van|duc hon/.test(n)?'upgrade-unverified':

     /vuot|thap|pho ban/.test(n)?'dungeon-unverified':

     /hoan thanh|kich hoat|nang cap|nhan thuong/.test(n)?'progress-unverified':'unknown';

   return {type:kind,verified:false};

 }

 function make(q){

   if(!q||!valid(q.id))return null;

   const r=recipe(q),module=nativeMods[r.type]||null;

   const old=S.executors.get(q.id);

   if(old&&old.type===r.type&&old.actionId===idnum(q.actionId)&&old.name===String(q.name))return old;

   const ex={id:String(q.id),name:String(q.name),actionId:idnum(q.actionId),type:r.type,

     verified:r.verified,module,custom:r.custom||null,

     state:'generated',createdAt:new Date().toISOString(),activated:false};

   S.executors.set(ex.id,ex);S.generated++;

   return ex;

 }

 function buildAll(){

   let raw=_ft?.__Z?.ins?.originCfg;

   if(!Array.isArray(raw)&&typeof _Sa!=='undefined')raw=_Sa?.getCfg?.('task');

   if(!Array.isArray(raw))return {seen:0,generated:S.executors.size,reason:'No local task catalog'};

   let seen=0;

   for(const c of raw){if(seen>=C.maxCatalog)break;

     if(!Array.isArray(c)||!valid(c[0]))continue;

     make(fromCfg(c));seen++;

   }

   return {seen,generated:S.executors.size};

 }

 function activate(ex){

   if(!ex?.verified||!ex.module||!W[ex.module])return false;

   const mod=W[ex.module];

   // Built-in V8 addons start at installation; calling start() repeatedly can

   // create overlapping V.provide wrappers and break the shared queue.

   if(mod.config?.enabled!==false){ex.activated=true;return true;}

   // Start only the one relevant native executor, never start other side jobs.

   if(ex.type==='stage'){

     if(D.config&&'enableTuVuot'in D.config)D.config.enableTuVuot=true;

     ex.activated=true;return true;

   }

   if(ex.type==='exp'){

     if(Q.config){Q.config.preferExpForLevel=true;}

     ex.activated=true;return true;

   }

   if(typeof mod.start==='function'){

     try{mod.start();ex.activated=true;return true;}

     catch(e){S.errors++;S.lastError=String(e);ex.state='start-error';return false;}

   }

   return false;

 }

 function expPolicy(ex){

   // V8.6.6's routeName may misinterpret Pet LvN as character EXP. Disable

   // EXP public matching while an unambiguous pet/tower/etc task is active.

   if(!Q.config)return;

   if(ex?.type==='exp'||!ex){

     if(S.savedPublicExp!==undefined && Q.config.autoPublicExpMatching===false)

       Q.config.autoPublicExpMatching=S.savedPublicExp;

     if(S.savedPreferExp!==undefined && Q.config.preferExpForLevel===false)

       Q.config.preferExpForLevel=S.savedPreferExp;

     S.savedPublicExp=undefined;S.savedPreferExp=undefined;return;

   }

   if(S.savedPublicExp===undefined)S.savedPublicExp=Q.config.autoPublicExpMatching;

   if(S.savedPreferExp===undefined)S.savedPreferExp=Q.config.preferExpForLevel;

   Q.config.autoPublicExpMatching=false;

   Q.config.preferExpForLevel=false;

   // Do not modify a running EXP mission; if idle, prevent new EXP jobs.

   if(D.config?.enableExp===true && mstate().job==='rảnh')D.config.enableExp=false;

 }

 function current(){const q=qstate();if(!q||!valid(q.id))return null;

   const ex=make(q);if(!ex)return null;

   ex.latestTask=q;return ex;

 }

 function payload(ex){

   const mod=ex?.module?W[ex.module]:null;

   const task=qstate();let nativeState=null;

   if(ex?.type==='pet'&&typeof mod?.plan==='function'){

     try{nativeState=mod.plan();}catch(e){S.lastError=String(e);}

   } else if(ex?.type==='linhlung'&&typeof mod?.snapshot==='function'){

     try{nativeState=mod.snapshot();}catch(e){S.lastError=String(e);}

   }

   return {id:ex?.id,name:ex?.name,actionId:ex?.actionId,

     family:ex?.type,executorCreated:!!ex,verified:!!ex?.verified,

     module:ex?.module||null,moduleLoaded:!!mod,

     executable:!!ex?.verified&&(!!ex?.custom||!!mod),

     engine:ex?.custom?'factory-queue':(mod?'existing-native-module':'diagnostic-only'),

     serverTaskState:task?.state,serverProgress:task?.progress,

     nativeState,readyNow:typeof nativeState?.ready==='boolean'?nativeState.ready:null,

     autoDaily:mstate().running===true,

     serverDone:task?.state===2,

     reason:!ex?'No task':!ex.verified?'Unknown game action; verification needed':

        !ex.custom&&!mod?'Verified family but module not loaded':

        task?.state===2?'Done: awaiting official server claim':

        'Executor available / monitor server'};

 }

 

 function watch(){

   if(!C.enabled)return;

   const ex=current();if(!ex)return;

   expPolicy(ex);

   const q=qstate();

   if(C.autoStartDaily&&mstate().running!==true)try{D.start?.();}catch(e){S.lastError=String(e);}

   if(q?.state!==2&&ex.verified&&!ex.custom)activate(ex);

   const sig=JSON.stringify([q?.id,q?.state,q?.progress]);

   if(q?.id!==S.lastId||sig!==S.lastSig){

     S.lastId=q?.id;S.lastSig=sig;

     ex.state=q?.state===2?'await-native-claim':ex.verified?'executor-ready':'diagnostic';

     emit('SERVER TASK / EXECUTOR',{id:ex.id,name:ex.name,family:ex.type,

       executor:ex.module||ex.custom?.type||'diagnostic',verified:ex.verified,state:q?.state});

   }

   S.latest=payload(ex);

   if(!ex.verified){

     const prev=S.lastNotice.get(ex.id)||0;

     if(now()-prev>C.diagnosticLogEveryMs){S.lastNotice.set(ex.id,now());

       console.warn('[V8.6.16] DA TAO HANDLER; CHUA CO LENH THUC THI DA KIEM CHUNG:',{

         id:ex.id,name:ex.name,actionId:ex.actionId,family:ex.type});}

   }

 }

 function customProbe(ex){

   const q=qstate();if(!q||q.id!==ex.id||q.state===2)return null;

   const r=ex.custom;if(!r)return null;

   // Probe only. It may inspect game state; must not make side effects.

   const snap=r.probe(q);if(!snap||snap.ready!==true||typeof snap.signature!=='string')return null;

   if(r.spend==='materials'&&!C.allowMaterialRecipes)return null;

   const key=q.id+'|'+r.type+'|'+snap.signature;

   if((S.attempts.get(key)||0)>=C.maxAttemptsPerUnchangedState)return null;

   return {task:q,snap,key};

 }

 function offer(mode){

   if(mode==='claim'&&C.enabled){

     const ex=current(),q=qstate();

     if(ex?.custom && q?.state!==2 && mstate().running===true &&

        mstate().job==='rảnh' && _Ba?._$a?.SceneUtil?.isCommonScene===true &&

        _Ba?._$a?._yo?.ins?.isInMission!==true &&

        _Ba?._$a?._yo?.ins?.isInArena!==true){

       let entry;

       try{entry=customProbe(ex);}catch(e){S.errors++;S.lastError=String(e);}

       if(entry){const r=ex.custom,old=entry.snap;

         return {k:'moduleWork',what:'Quest executor '+r.type+' '+ex.id,

           before:old.signature,

           probe:()=>{const q2=qstate();return q2?.id===ex.id?

             String(r.probe(q2)?.signature??old.signature):'quest-changed';},

           run:()=>{

             const q2=qstate();if(q2?.id!==ex.id||q2.state===2)

               throw Error('Quest changed; executor aborted');

             const fresh=r.probe(q2);

             if(!fresh?.ready||fresh.signature!==old.signature)

               throw Error('Server snapshot changed; executor aborted');

             // The queue is already pending; DO NOT inspect UPGRADES.busy() here.

             S.attempts.set(entry.key,(S.attempts.get(entry.key)||0)+1);

             S.sent++;r.run(q2,fresh);

           },

           done:()=>{S.confirmed++;emit('CUSTOM EXECUTOR ACK',{quest:ex.id,type:r.type});},

           failed:why=>{S.failed++;S.lastError=String(why);

             console.warn('[V8.6.16] Custom executor failed',ex.id,why);}};

       }

     }

   }

   return S.previous?.call(V,mode)??null;

 }

 function registerRecipe(def){

   if(!def||!(/^[a-z][a-z0-9_-]{2,40}$/.test(def.type))||

      typeof def.match!=='function'||typeof def.probe!=='function'||typeof def.run!=='function')

     throw Error('registerRecipe({type,match,probe,run,spend,verified:true})');

   if(def.verified!==true)throw Error('Recipe needs verified native game action');

   if(!['none','materials'].includes(def.spend||'none'))throw Error('Premium/unknown spending forbidden');

   if(S.recipes.some(x=>x.type===def.type))throw Error('Recipe family already exists');

   S.recipes.push({type:def.type,match:def.match,probe:def.probe,run:def.run,spend:def.spend||'none'});

   S.executors.clear();buildAll();watch();return def.type;

 }

 

 function status(print=true){const ex=current(),out=ex?payload(ex):{reason:'No current quest'};

   if(print)console.table([{ID:out.id||'-',Name:out.name||'-',Loai:out.family||'-',

     TaoExecutor:out.executorCreated,DaXacMinh:out.verified,

     Module:out.module||'-',DaNap:out.moduleLoaded,ThucThiDuoc:out.executable,

     TrangThai:out.serverTaskState,AutoRunning:out.autoDaily,LyDo:out.reason}]);return out;

 }

 function summary(){const all=[...S.executors.values()],group=new Map();

   for(const x of all){const k=x.type,g=group.get(k)||{type:k,count:0,verified:x.verified,module:x.module||'-'};

     g.count++;group.set(k,g);}

   const rows=[...group.values()].sort((a,b)=>b.count-a.count);

   console.table(rows);return {total:all.length,groups:rows,verifiedExecutors:all.filter(x=>x.verified).length,

     diagnosticExecutors:all.filter(x=>!x.verified).length};

 }

 function missing(){const a=[...S.executors.values()].filter(x=>!x.verified||(!x.custom&&x.module&&!W[x.module]));

   const rows=a.slice(0,100).map(x=>({id:x.id,name:x.name,actionId:x.actionId,family:x.type,

     reason:!x.verified?'unverified-native-action':'module-not-loaded'}));

   console.table(rows);return {total:a.length,sample:rows};}

 

 function exportReport(){const data={version:'8.6.16',at:new Date().toISOString(),

   status:status(false),summary:summaryNoPrint(),missing:missingNoPrint(),history:S.history.slice(-50)};

   const content=JSON.stringify(data,null,2),filename='KVPV_EXECUTOR_REPORT_'+new Date().toISOString().slice(0,10)+'.json';

   if(typeof document==='undefined'||typeof Blob==='undefined'||typeof URL==='undefined')return {filename,content};

   const u=URL.createObjectURL(new Blob([content],{type:'application/json'}));

   try{const a=document.createElement('a');a.href=u;a.download=filename;document.body.appendChild(a);a.click();a.remove();}

   finally{setTimeout(()=>URL.revokeObjectURL(u),15000);}return {filename};

 }

 function summaryNoPrint(){const a=[...S.executors.values()],types={};

   for(const x of a)types[x.type]=(types[x.type]||0)+1;

   return {total:a.length,types,verified:a.filter(x=>x.verified).length};}

 function missingNoPrint(){return [...S.executors.values()].filter(x=>!x.verified)

   .map(x=>({id:x.id,name:x.name,actionId:x.actionId,family:x.type}));}

 

 function start(){

   C.enabled=true;

   if(S.provider&&V.provide!==S.provider){

     // Another addon inserted its own provider after us; don't create cycles.

     console.warn('[V8.6.16] Provider changed: load Executor Factory LAST to enable custom recipes');

   }

   if(!S.provider){S.previous=V.provide;S.provider=offer;V.provide=offer;}

   else if(V.provide===S.previous){V.provide=S.provider;} // restarted after stop()

   if(S.timer)__KVPV29.cancel(S.timer);buildAll();

   S.timer=__KVPV29.every(()=>{try{watch();}catch(e){S.errors++;S.lastError=String(e);}},C.scanMs);

   watch();return true;

 }

 

 function stop(){C.enabled=false;if(S.timer)__KVPV29.cancel(S.timer);S.timer=null;

   if(V.provide===S.provider&&S.previous)V.provide=S.previous;

   expPolicy(null);return true;

 }

 W.KVPV_V876={installed:true,config:C,start,stop,recipe,registerRecipe,

   buildAll,status,summary,missing,exportReport,executors:()=>[...S.executors.values()],

   task:()=>qstate(),history:()=>S.history.slice(),counters:()=>({sent:S.sent,acked:S.confirmed,

     failed:S.failed,errors:S.errors}),explain:(id)=>{

       const ex=S.executors.get(id)||current();return ex?payload(ex):null;}};

 start();emit('EXECUTOR FACTORY READY',{taskCount:S.executors.size,

   existingModules:Object.values(nativeMods).filter(m=>!!W[m])});

})();



/* V8.6.17 MOUNT-FEED EXECUTOR: VERIFIED RECIPE */

/* KVPV V8.6.17 - THU CUOI EXECUTOR RECIPE / V8.6.16 FACTORY
 * Official client mappings (17 MB source):
 *   _Ba._YJ._WJ.ins.feed -> [level, exp, skills, power]
 *   _ft.__qt.ins.getPetFeedCfgByLv(level)[2] -> [itemId, count, expGain]
 *   _Ba._Ic._aQ.ins.getItemCountById(itemId)
 *   _Ba._YJ._bgt.ins.feedRide() -> original 'Boi duong' button
 *   feedRideReply updates model only on successful server response.
 * This script does not modify client levels, packets, premium currency or shops.
 */

(() => {

 'use strict';

 const W=window, F=W.KVPV_V876, Q=W.KVPV_V866, D=W.KVPV_DAILY;

 if (!F?.registerRecipe || !Q?.task || !D?.quickState || typeof _Ba==='undefined' || typeof _ft==='undefined') {

   console.error('[V8.6.17] Nap V8.6.16 FULL trong dung game-frame truoc');return;

 }

 if(W.KVPV_V877?.installed){W.KVPV_V877.start();return;}

 const C={enabled:true,autoFeed:true,enableOnceQuests:true,requireCommonScene:true,

   minDelayMs:2400,maxFeedsPerQuest:180,modelRefreshMs:30000,ackWaitMs:30000};

 const S={timer:null,lastSentAt:0,lastSyncAt:0,totalSent:0,completed:0,errors:0,lastError:'',

   attempts:new Map(),onceSent:new Set(),pending:null,prevProgress:null,lastId:null,history:[]};

 const now=()=>Date.now();

 const normalize=x=>String(x??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'')

   .replace(/[đĐ]/g,'d').toLowerCase().replace(/\s+/g,' ').trim();

 const ride=()=>_Ba?._YJ?._WJ?.ins;

 const rpc=()=>_Ba?._YJ?._bgt?.ins;

 const cfg=level=>_ft?.__qt?.ins?.getPetFeedCfgByLv?.(level);

 const bag=()=>_Ba?._Ic?._aQ?.ins;

 const task=()=>Q.task?.();

 const hasScene=()=>_Ba?._$a?.SceneUtil?.isCommonScene===true &&

   _Ba?._$a?._yo?.ins?.isInMission!==true &&

   _Ba?._$a?._yo?.ins?.isInArena!==true;

 function match(q){

   if(!q || Number(q.actionId)!==12)return null;

   const name=normalize(q.name);

   if(!/boi duong thu cuoi/.test(name))return null;

   const target=/(?:lv\.?|level|cap)\s*(\d{1,4})\b/.exec(name);

   if(target&&/(tang|dat|den|len)/.test(name))return {mode:'level',target:Number(target[1])};

   if(C.enableOnceQuests && /(?:\d+|mot)\s*lan/.test(name))return {mode:'once',target:1};

   return null;

 }

 function plan(q=task()){

   const m=match(q), r=ride(),lv=Number(r?.feed?.[0]),exp=Number(r?.feed?.[1]);

   const valid=Array.isArray(r?.feed)&&Number.isSafeInteger(lv)&&lv>=0&&Number.isFinite(exp)&&exp>=0;

   const row=valid?cfg(lv):null;

   const material=Array.isArray(row?.[2])?row[2]:null;

   const itemId=Number(material?.[0]),required=Number(material?.[1]),gain=Number(material?.[2]);

   const hasCfg=Number.isSafeInteger(itemId)&&itemId>0&&Number.isSafeInteger(required)&&required>0&&Number.isFinite(gain)&&gain>0;

   const owned=hasCfg?Number(bag()?.getItemCountById?.(itemId)):NaN;

   const attempts=S.attempts.get(q?.id)||0;

   const signature=JSON.stringify([q?.id,q?.state,q?.progress,valid?lv:null,valid?exp:null]);

   const ready=Boolean(m)&&C.enabled&&C.autoFeed&&q?.state!==2&&valid&&hasCfg&&

     Number.isFinite(owned)&&owned>=required&&typeof rpc()?.feedRide==='function'&&

     (m.mode==='once'?!S.onceSent.has(q.id):lv<m.target)&&

     attempts<C.maxFeedsPerQuest&&now()-S.lastSentAt>=C.minDelayMs&&

     (!C.requireCommonScene||hasScene());

   const reason=!m?'Khong phai nhiem vu Boi duong Thu Cuoi':

     q?.state===2?'Da hoan thanh: doi nhan thuong':

     !valid?'Chua co du lieu Thu Cuoi tu server':

     m.mode==='level'&&lv>=m.target?'Da dat cap, doi server cap nhat task':

     m.mode==='once'&&S.onceSent.has(q.id)?'Da gui 1 lan, doi server xac nhan':

     !hasCfg?'Chua co cau hinh nguyen lieu biet chac':

     !Number.isFinite(owned)?'Chua dong bo tui':

     owned<required?`Thieu nguyen lieu ${itemId}: ${owned}/${required}`:

     typeof rpc()?.feedRide!=='function'?'Thieu native feedRide()':

     attempts>=C.maxFeedsPerQuest?'Da cham gioi han boi duong':

     C.requireCommonScene&&!hasScene()?'Nhan vat dang o tran/pho ban':

     now()-S.lastSentAt<C.minDelayMs?'Dang cho cooldown':'San sang';

   return {task:q,id:q?.id,name:q?.name,mode:m?.mode,target:m?.target??null,

     level:valid?lv:null,exp:valid?exp:null,itemId:hasCfg?itemId:null,

     need:hasCfg?required:null,owned:Number.isFinite(owned)?owned:null,

     gain:hasCfg?gain:null,signature,ready,reason,attempts};

 }

 

 function probe(q){

   const p=plan(q);

   return {ready:p.ready,signature:p.signature};

 }

 function run(q,fresh){

   const p=plan(q);

   // Shared queue already owns this turn: do not inspect UPGRADES.busy().

   if(!p.ready || p.signature!==fresh.signature || q?.id!==task()?.id ||

      !C.enabled || !C.autoFeed || !Number.isFinite(p.level) ||

      p.owned<p.need || !hasScene() || typeof rpc()?.feedRide!=='function')

     throw Error('Trang thai Thu Cuoi da thay doi, doi dong bo server');

   S.attempts.set(q.id,(S.attempts.get(q.id)||0)+1);

   if(p.mode==='once')S.onceSent.add(q.id);

   S.lastSentAt=now();S.totalSent++;

   S.pending={id:q.id,signature:p.signature,at:S.lastSentAt};

   try{rpc().feedRide();}

   catch(e){S.errors++;S.lastError=String(e);throw e;}

   console.log('[V8.6.17] GUI BOI DUONG THU CUOI',{task:q.id,lv:p.level,target:p.target,item:p.itemId,need:p.need});

 }

 

 function start(){

   C.enabled=true;

   if(F.config)F.config.allowMaterialRecipes=true; // Verified recipe consumes only owned feed items.

   if(S.timer)__KVPV29.cancel(S.timer);

   S.timer=__KVPV29.every(()=>{

     try{

       const q=task(), m=match(q);

       if(!m)return;

       // Read-only resync, not a feed/purchase. Needed when mount panel has never opened.

       if(!Array.isArray(ride()?.feed) && now()-S.lastSyncAt>C.modelRefreshMs && typeof rpc()?.getRideInfo==='function'){

         S.lastSyncAt=now();rpc().getRideInfo();console.log('[V8.6.17] Dong bo Thu Cuoi');

       }

       const p=plan(q);

       if(S.lastId!==q.id){S.lastId=q.id;console.log('[V8.6.17] NHAN DIEN NHIEM VU',q.id,q.name,p.reason);}

       if(S.pending&&S.pending.id===q.id&&S.pending.signature!==p.signature){

         S.completed++;S.pending=null;

       }

       if(S.pending && now()-S.pending.at>C.ackWaitMs){

         console.warn('[V8.6.17] Chua thay phan hoi Thu Cuoi - khong gui lap lai neu server chua doi');

         S.pending=null;

       }

     }catch(e){S.errors++;S.lastError=String(e);}

   },2500);

   return true;

 }

 

 function stop(){C.enabled=false;if(S.timer)__KVPV29.cancel(S.timer);S.timer=null;return true;}

 

 function status(){const p=plan();console.table([{ID:p.id,Task:p.name,Mode:p.mode,

   Current:p.level,Target:p.target,Material:p.itemId,Owned:p.owned,Need:p.need,

   Ready:p.ready,Reason:p.reason,Sent:S.totalSent,ProgressACK:S.completed,

   Errors:S.errors,LastError:S.lastError||'-'}]);return {...p,sent:S.totalSent,ack:S.completed,errors:S.errors,lastError:S.lastError};}

 let registered=false;

 try{

   // Registration occurs once. Factory immediately rescans all 606 quest configs.

   F.registerRecipe({type:'mount-feed',verified:true,spend:'materials',

     match:q=>Boolean(match(q)),probe,run});

   registered=true;

 }catch(e){

   if(!/already exists/i.test(String(e))){console.error('[V8.6.17] Dang ky executor that bai',e);return;}

   registered=true;

 }

 W.KVPV_V877={installed:true,config:C,registered,start,stop,plan,status,

   counters:()=>({sent:S.totalSent,ack:S.completed,errors:S.errors})};

 start();console.log('[V8.6.17] Executor factory: da them nhom THU CUOI. KVPV_V877.status()');

})();



/* KVPV V8.6.18 - PHAP THUAT QUEST EXECUTOR, shared V8.6.16 factory.
 * Mappings checked against original 17,606,388-byte JS client:
 * _Ba._Jtt._ant.ins.spcialSkills: [[skillId, level],...]
 * _Ba._Jtt._ant.ins.maxlv, ._pnt[i], .checkLvUp(i)
 * _Ba._rJ._O$.ins.playerBaseAttr[9]: level-up resource
 * _Ba._Jtt._unt.ins.addSkillLevel(skillId): original single-level button
 * _Ba._Jtt._unt.ins.getActorSkillInfo(): request resync
 * Does not buy, auto-spend premium currency, fake progress or auto max-up.
 */

(() => {

  'use strict';

  const W=window, F=W.KVPV_V876, Q=W.KVPV_V866, D=W.KVPV_DAILY;

  if(!F?.registerRecipe||!Q?.task||!D?.quickState||typeof _Ba==='undefined'){

    console.error('[V8.6.18] Can V8.6.17 FULL trong game-frame'); return;

  }

  if(W.KVPV_V878?.installed){W.KVPV_V878.start();return;}

  const C={enabled:true,autoUpgrade:true,allowOnceQuests:true,requireCommonScene:true,

    minDelayMs:3000,maxUpgradesPerTask:300,ackWaitMs:45000,

    autoRequestInfo:true,infoRefreshMs:30000};

  const S={timer:null,sent:0,ack:0,errors:0,lastError:'',lastSentAt:0,

    lastInfoAt:0,pending:null,attempts:new Map(),onceSent:new Set(),lastTask:'',

    lastSignature:'',history:[],savedAuto:null};

  const now=()=>Date.now();

  const normalize=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'')

    .replace(/[đĐ]/g,'d').toLowerCase().replace(/\s+/g,' ').trim();

  const quest=()=>Q.task?.();

  const model=()=>_Ba?._Jtt?._ant?.ins;

  const native=()=>_Ba?._Jtt?._unt?.ins;

  const points=()=>Number(_Ba?._rJ?._O$?.ins?.playerBaseAttr?.[9]);

  function parse(q){

    if(!q||Number(q.actionId)!==11)return null;

    const n=normalize(q.name);

    if(!/phap thuat/.test(n))return null;

    const sum=/(?:tong cap|tong lv|tong level).*?phap thuat.*?(?:lv\.?|level|cap)\s*(\d{1,5})\b/.exec(n);

    if(sum)return {mode:'total',target:Number(sum[1])};

    if(C.allowOnceQuests&&/tang cap.*?phap thuat.*?(?:\d+|mot)\s*lan/.test(n))

      return {mode:'once',target:1};

    return null;

  }

  const safeScene=()=>_Ba?._$a?.SceneUtil?.isCommonScene===true &&

    _Ba?._$a?._yo?.ins?.isInMission!==true &&

    _Ba?._$a?._yo?.ins?.isInArena!==true;

  function plan(q=quest()){

    const pattern=parse(q),m=model();

    const rows=Array.isArray(m?.spcialSkills)?m.spcialSkills:null;

    const max=Number(m?.maxlv),money=points();

    const modelOK=Array.isArray(rows)&&rows.length>0&&Number.isSafeInteger(max)&&max>0;

    const usable=[];

    if(modelOK){

      for(let i=0;i<rows.length;i++){

        const pair=rows[i];if(!Array.isArray(pair))continue;

        const skillId=Number(pair[0]),level=Number(pair[1]),cost=Number(m?._pnt?.[i]);

        if(!Number.isSafeInteger(skillId)||skillId<=0||!Number.isSafeInteger(level)||level<1||level>=max)

          continue;

        // Use same check as the game's upgrade button AND read-only resource guard.

        let canLevel=false;try{canLevel=m.checkLvUp?.(i)===true;}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

        if(Number.isFinite(cost)&&cost>=0&&Number.isFinite(money)&&money>=cost&&canLevel)

          usable.push({skillId,level,cost,index:i});

      }

    }

    usable.sort((a,b)=>a.cost-b.cost||a.level-b.level||a.skillId-b.skillId);

    const total=modelOK?rows.reduce((sum,r)=>sum+(Number.isSafeInteger(Number(r?.[1]))?Number(r[1]):0),0):null;

    const spent=S.attempts.get(q?.id)||0;

    const pending=S.pending?.id===q?.id&&S.pending?.signature===

      JSON.stringify([q?.id,q?.state,q?.progress,rows]);

    const signature=JSON.stringify([q?.id,q?.state,q?.progress,rows]);

    const reached=pattern?.mode==='total'&&total!==null&&total>=pattern.target;

    const onceDone=pattern?.mode==='once'&&S.onceSent.has(q?.id);

    const ready=!!pattern&&C.enabled&&C.autoUpgrade&&q?.state!==2&&modelOK&&

      !reached&&!onceDone&&usable.length>0&&typeof native()?.addSkillLevel==='function'&&

      spent<C.maxUpgradesPerTask&&now()-S.lastSentAt>=C.minDelayMs&&

      (!C.requireCommonScene||safeScene())&&!pending;

    const reason=!pattern?'Khong phai nhiem vu Phap Thuat':

      q?.state===2?'Quest da xong; doi nhan thuong':

      !modelOK?'Chua dong bo danh sach Phap Thuat/maxlv':

      reached?'Tong cap da dat; doi server cap nhat quest':

      onceDone?'Da nang 1 lan; doi quest server':

      usable.length===0?'Chua du diem/ky nang da toi gioi han hoac thieu du lieu gia':

      typeof native()?.addSkillLevel!=='function'?'Thieu nut native addSkillLevel':

      spent>=C.maxUpgradesPerTask?'Vuot gioi han 1 quest':

      C.requireCommonScene&&!safeScene()?'Dang o trong tran/pho ban':

      pending?'Dang cho server dong bo':'San sang';

    return {id:q?.id,name:q?.name,mode:pattern?.mode,target:pattern?.target??null,

      total,skillCount:rows?.length??0,points:Number.isFinite(money)?money:null,

      maxlv:Number.isSafeInteger(max)?max:null,choice:usable[0]||null,

      ready,reason,signature,spent,pending};

  }

  

  function probe(q){const p=plan(q);return {ready:p.ready,signature:p.signature};}

  function run(q,previous){

    // Called with shared queue ownership; NEVER call UPGRADES.busy here.

    const p=plan(q),selected=p.choice;

    if(!p.ready||p.signature!==previous.signature||q?.id!==quest()?.id||

      !selected||(!safeScene()&&C.requireCommonScene)||

      typeof native()?.addSkillLevel!=='function')

      throw Error('Snapshot Phap Thuat da thay doi; doi server');

    S.lastSentAt=now();S.attempts.set(q.id,(S.attempts.get(q.id)||0)+1);

    S.sent++;if(p.mode==='once')S.onceSent.add(q.id);

    S.pending={id:q.id,signature:p.signature,at:now(),skillId:selected.skillId,level:selected.level};

    try{native().addSkillLevel(selected.skillId);}catch(e){S.errors++;S.lastError=String(e);throw e;}

    console.log('[V8.6.18] NANG PHAP THUAT',{task:q.id,skillId:selected.skillId,

      level:selected.level,cost:selected.cost,total:p.total,target:p.target});

  }

  

  function watch(){

    const q=quest(),p=parse(q),upgrade=W.KVPV_UPGRADES;

    if(!p||!C.enabled){

      if(S.savedAuto!==null&&upgrade?.config?.tuyetHoc===false)

        upgrade.config.tuyetHoc=S.savedAuto;

      S.savedAuto=null;return;

    }

    // Avoid two independent skill-up senders for the same quest.

    if(upgrade?.config){

      if(S.savedAuto===null)S.savedAuto=upgrade.config.tuyetHoc;

      upgrade.config.tuyetHoc=false;

    }

    if(q.id!==S.lastTask){S.lastTask=q.id;console.log('[V8.6.18] Quest Phap Thuat',q.id,q.name);}

    const x=plan(q);

    if(S.pending?.id===q.id){

      const row=model()?.spcialSkills?.find(r=>Number(r?.[0])===S.pending.skillId);

      if(Number(row?.[1])>S.pending.level || q.state===2){S.ack++;S.pending=null;}

    }

    if(S.pending&&now()-S.pending.at>C.ackWaitMs){

      // Deliberately NOT resending unchanged state. Factory limits one attempt per state.

      console.warn('[V8.6.18] Chua co ACK nang Phap Thuat, can kiem tra server',S.pending);

      S.pending=null;

    }

    if(C.autoRequestInfo&&(!model()?.spcialSkills||!(Number(model()?.maxlv)>0))&&

       now()-S.lastInfoAt>C.infoRefreshMs&&typeof native()?.getActorSkillInfo==='function'){

      S.lastInfoAt=now();native().getActorSkillInfo();

    }

  }

  

  function start(){C.enabled=true;if(F.config)F.config.allowMaterialRecipes=true;

    if(S.timer)__KVPV29.cancel(S.timer);

    S.timer=__KVPV29.every(()=>{try{watch();}catch(e){S.errors++;S.lastError=String(e);}},2500);

    watch();return true;}

  

  function stop(){C.enabled=false;if(S.timer)__KVPV29.cancel(S.timer);S.timer=null;

    const u=W.KVPV_UPGRADES;

    if(S.savedAuto!==null&&u?.config?.tuyetHoc===false)u.config.tuyetHoc=S.savedAuto;

    S.savedAuto=null;return true;}

  

  function status(){const p=plan();console.table([{Task:p.id,Mode:p.mode,Total:p.total,

    Target:p.target,SkillCount:p.skillCount,Points:p.points,Chosen:p.choice?.skillId,

    Cost:p.choice?.cost,Ready:p.ready,Reason:p.reason,Sent:S.sent,ACK:S.ack,

    Error:S.lastError||'-'}]);return {...p,sent:S.sent,ack:S.ack,errors:S.errors,lastError:S.lastError};}

  try{F.registerRecipe({type:'spell-training',verified:true,spend:'materials',

    match:q=>!!parse(q),probe,run});}

  catch(e){if(!/already exists/i.test(String(e))){console.error('[V8.6.18] Khong dang ky duoc',e);return;}}

  W.KVPV_V878={installed:true,config:C,start,stop,plan,status};

  start();console.log('[V8.6.18] Da dang ky executor Phap Thuat; KVPV_V878.status()');

})();










(() => {

'use strict';

const W=window,F=W.KVPV_V876,Q=W.KVPV_V866,D=W.KVPV_DAILY,U=W.KVPV_UPGRADES;

if(!F?.registerRecipe||!Q?.task||!D?.quickState||!U?.config||typeof _Ba==='undefined'){

  console.error('[V8.6.18] Can nap V8.6.17 FULL');return;

}

if(W.KVPV_V878_STRENGTH?.installed){W.KVPV_V878_STRENGTH.start();return;}

const C={enabled:true,autoStrengthen:true,requireCommonScene:true,

  maxRequestsPerTask:120,cooldownMs:4000,ackWaitMs:45000};

const S={timer:null,at:0,attempts:new Map(),onceSent:new Set(),sent:0,ack:0,

  pending:null,lastId:null,errors:0,lastError:'',savedAuto:null};

const now=()=>Date.now(),q=()=>Q.task?.();

const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'')

  .replace(/[đĐ]/g,'d').toLowerCase().replace(/\s+/g,' ').trim();

const m=()=>_Ba?._Agt?._Rgt?.ins;

const api=()=>_Ba?._Agt?._qgt?.ins;

const safeScene=()=>_Ba?._$a?.SceneUtil?.isCommonScene===true&&

  _Ba?._$a?._yo?.ins?.isInMission!==true&&_Ba?._$a?._yo?.ins?.isInArena!==true;

function parse(x){

  if(!x||Number(x.actionId)!==17)return null;

  const n=norm(x.name);

  if(!/cuong hoa/.test(n))return null;

  const total=/(?:tong cap|tong lv|tong level).*?cuong hoa.*?(?:lv\.?|level|cap)\s*(\d{1,5})\b/.exec(n);

  if(total)return {mode:'total',target:Number(total[1])};

  if(/cuong hoa.*?(?:\d+|mot)\s*lan/.test(n))return {mode:'once',target:1};

  return null;

}

function state(){

  const vals=m()?.partLev,keys=vals?.keys;

  if(!Array.isArray(keys)||!keys.length||typeof vals.get!=='function')return null;

  const levels=keys.map(k=>[String(k),Number(vals.get(k))]);

  if(levels.some(x=>!Number.isFinite(x[1])||x[1]<0))return null;

  return {levels,total:levels.reduce((s,x)=>s+x[1],0)};

}

function plan(task=q()){

  const rule=parse(task),s=state(),spent=S.attempts.get(task?.id)||0;

  const signature=JSON.stringify([task?.id,task?.state,task?.progress,s?.levels]);

  const finished=rule?.mode==='total'&&s&&s.total>=rule.target;

  const once=rule?.mode==='once'&&S.onceSent.has(task?.id);

  const pending=S.pending?.id===task?.id&&S.pending?.signature===signature;

  const red=_Ba?._Xo?._Ko?.instance?.getRpKeyState?.(15)===true;

  const mayUpgrade=m()?.isCanUpEquip===true;

  const ready=!!rule&&C.enabled&&C.autoStrengthen&&task?.state!==2&&

    !!s&&!finished&&!once&&red&&mayUpgrade&&typeof api()?.oneKeyUp==='function'&&

    spent<C.maxRequestsPerTask&&now()-S.at>=C.cooldownMs&&!pending&&

    (!C.requireCommonScene||safeScene());

  const reason=!rule?'Khong phai nhiem vu Cuong Hoa':

    task?.state===2?'Da xong, doi nhan thuong':

    !s?'Chua co du lieu cap trang bi':

    finished?'Da dat tong cap, doi server cap nhat':

    once?'Da gui 1 lan, doi server':

    !red||!mayUpgrade?'Khong co dau do/khong du nguyen lieu':

    typeof api()?.oneKeyUp!=='function'?'Khong co ham Cuong hoa nhanh':

    spent>=C.maxRequestsPerTask?'Gioi han an toan':

    C.requireCommonScene&&!safeScene()?'Dang o trong tran/pho ban':

    pending?'Dang doi ACK':'San sang';

  return {id:task?.id,name:task?.name,mode:rule?.mode,target:rule?.target||null,

    current:s?.total??null,ready,reason,signature,attempts:spent,red,mayUpgrade};

}



function probe(task){const p=plan(task);return {ready:p.ready,signature:p.signature};}

function run(task,previous){

  // The queue has already marked itself pending. Do not check U.busy() here.

  const p=plan(task);

  if(!p.ready||p.signature!==previous.signature||task?.id!==q()?.id||

     (C.requireCommonScene&&!safeScene())||typeof api()?.oneKeyUp!=='function')

    throw Error('Trang thai Cuong Hoa thay doi');

  S.at=now();S.sent++;S.attempts.set(task.id,(S.attempts.get(task.id)||0)+1);

  if(p.mode==='once')S.onceSent.add(task.id);

  S.pending={id:task.id,signature:p.signature,at:now()};

  try{api().oneKeyUp();}catch(e){S.errors++;S.lastError=String(e);throw e;}

  console.log('[V8.6.18] DA GUI CUONG HOA NHANH',{quest:task.id,total:p.current,target:p.target});

}



function tick(){

  if(!C.enabled)return;

  const task=q(),isOurQuest=!!parse(task);

  if(isOurQuest){

    

    if(S.savedAuto===null)S.savedAuto=U.config.cuongHoa;

    U.config.cuongHoa=false;

    if(S.lastId!==task.id){S.lastId=task.id;console.log('[V8.6.18] Quest Cuong Hoa',task.id);}

    if(S.pending?.id===task.id){

      const p=plan(task);

      if(p.signature!==S.pending.signature){S.ack++;S.pending=null;}

      else if(now()-S.pending.at>C.ackWaitMs){

        console.warn('[V8.6.18] Chua thay server doi cap Cuong Hoa, khong spam');S.pending=null;

      }

    }

  }else if(S.savedAuto!==null){

    // Respect a config change made by the user while the quest was active.

    if(U.config.cuongHoa===false)U.config.cuongHoa=S.savedAuto;

    S.savedAuto=null;

  }

}



function start(){C.enabled=true;if(F.config)F.config.allowMaterialRecipes=true;

  if(S.timer)__KVPV29.cancel(S.timer);

  S.timer=__KVPV29.every(()=>{try{tick();}catch(e){S.errors++;S.lastError=String(e);}},2500);

  tick();return true;}



function stop(){C.enabled=false;if(S.timer)__KVPV29.cancel(S.timer);S.timer=null;

  if(S.savedAuto!==null&&U.config.cuongHoa===false)U.config.cuongHoa=S.savedAuto;

  S.savedAuto=null;return true;}



function status(){const p=plan();console.table([{ID:p.id,Mode:p.mode,Total:p.current,Target:p.target,

  Ready:p.ready,Reason:p.reason,Sent:S.sent,ACK:S.ack,LastError:S.lastError||'-'}]);

  return {...p,sent:S.sent,ack:S.ack,errors:S.errors,lastError:S.lastError};}

try{F.registerRecipe({type:'equipment-strengthen',verified:true,spend:'materials',

  match:task=>!!parse(task),probe,run});}

catch(e){if(!/already exists/i.test(String(e))){console.error('[V8.6.18] Dang ky that bai',e);return;}}

W.KVPV_V878_STRENGTH={installed:true,config:C,start,stop,plan,status};

if(W.KVPV_V878)W.KVPV_V878.allStatus=()=>({phapThuat:W.KVPV_V878.status(),cuongHoa:status(),factory:W.KVPV_V876?.status?.(false)});

start();console.log('[V8.6.18] Executor Cuong Hoa da san sang; KVPV_V878_STRENGTH.status()');

})();









(() => {

'use strict';

const W=window,F=W.KVPV_V876,Q=W.KVPV_V866,D=W.KVPV_DAILY;

if(!F?.registerRecipe||!Q?.task||!D?.quickState||typeof _Ba==='undefined'||typeof _ft==='undefined'){

  console.error('[V8.6.19] Need V8.6.18 FULL in the game frame');return;

}

if(W.KVPV_V879_STONE?.installed){W.KVPV_V879_STONE.start();return;}

const C={enabled:true,autoStone:true,requireCommonScene:true,

  checkMs:1000,minGapMs:1600,ackTimeoutMs:25000,

  maxRequestsPerQuest:150,allowInlay:true,allowReplace:true,allowUpgrade:true};

const S={timer:null,pending:null,sent:0,confirmed:0,errors:0,lastError:'',lastAt:0,

  attempts:new Map(),lastTask:'',history:[],lastStateSig:null};

const now=()=>Date.now(),norm=x=>String(x||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'')

  .replace(/[đĐ]/g,'d').toLowerCase().replace(/\s+/g,' ').trim();

const q=()=>Q.task?.();

const model=()=>_Ba?._ZE?._Qgt?.ins;

const rpc=()=>_Ba?._ZE?._Jgt?.ins;

const cfg=()=>_ft?._Qyn?.ins;

const bag=()=>_Ba?._Ic?._aQ?.ins;

const safe=()=>_Ba?._$a?.SceneUtil?.isCommonScene===true&&

  _Ba?._$a?._yo?.ins?.isInMission!==true&&_Ba?._$a?._yo?.ins?.isInArena!==true;

function rule(task){

  if(!task||Number(task.actionId)!==18)return null;

  const n=norm(task.name);

  if(!/da hon/.test(n))return null;

  const total=/(?:tong cap|tong lv|tong level).*?da hon.*?(?:lv\.?|level|cap)\s*(\d{1,5})\b/.exec(n);

  if(total)return {mode:'total',target:Number(total[1])};

  return null;

}

function stone(itemId){

  if(!Number.isSafeInteger(Number(itemId))||Number(itemId)<=0)return null;

  const row=cfg()?.getCfgById?.(Number(itemId));

  const level=Number(row?.[5]),kind=Number(row?.[3]),need=Number(row?.[6]);

  return row&&Number.isFinite(level)&&level>=0?{id:Number(itemId),level,kind,need}:null;

}

function owned(id){let n=0;try{n=Number(bag()?.getItemCountById?.(id));}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

  return Number.isFinite(n)&&n>=0?n:0;

}

function slots(){

  const m=model(),d=m?.getValueByPos?.(),pos=m?.getHavePos?.();

  if(!d||typeof d.get!=='function'||!Array.isArray(pos))return null;

  const records=[],parts=[...new Set(pos.map(Number).filter(x=>Number.isInteger(x)&&x>0))];

  for(const part of parts)for(let k=0;k<5;k++){

    const key=10*part+k,id=d.get(key),entry=id===null||id===undefined?null:stone(Number(id));

    if(id!==null&&id!==undefined&&!entry)return null; // do not trust incomplete cfg

    records.push({part,slot:k,id:entry?.id||0,level:entry?.level||0,kind:entry?.kind||k,

      need:entry?.need||0});

  }

  return records;

}

function bagByType(kind){

  try{return (model()?.getStByType?.(kind)||[]).filter(a=>Array.isArray(a)&&stone(Number(a[0]))&&Number(a[1])>0);}catch(_){return [];}

}

function actionFor(records){

  const m=model(),actions=[];

  if(!records)return actions;

  const vip=m?.vipIsOpen===true;

  const byPart=new Map();

  for(const r of records){if(!byPart.has(r.part))byPart.set(r.part,[]);byPart.get(r.part).push(r);}

  for(const [part,ss] of byPart){

    // Match P_SoulStoneView._rEn precedence per part: insert / replace / level-up.

    let candidate=null;

    for(const s of ss){

      if(s.slot===0&&!vip)continue; // VIP-only socket, cannot unlock by auto

      if(s.id===0&&C.allowInlay){

        const kind=s.slot===0?null:s.slot;

        let list=kind===null?[]:bagByType(kind);

        if(s.slot===0){try{list=(bag()?.getItemsByBagType?.(2)||[]).filter(a=>Array.isArray(a)&&stone(Number(a[0]))&&Number(a[1])>0);}catch(_){window.KVPV_V1?.diagnostics?.record(_);}}

        if(list.length){candidate={part,mode:0,reason:'inlay',slot:s.slot,gain:Math.max(...list.map(a=>stone(Number(a[0]))?.level||0))};break;}

      }

      if(s.id){

        if(C.allowReplace){

          const better=bagByType(s.kind).map(a=>stone(Number(a[0]))).filter(v=>v&&v.level>s.level);

          if(better.length){candidate={part,mode:1,reason:'replace',slot:s.slot,gain:Math.max(...better.map(v=>v.level))-s.level};break;}

        }

        if(C.allowUpgrade){

          const st=stone(s.id),cap=Number(cfg()?.stoneMaxLv);

          if(st&&Number.isFinite(st.need)&&st.need>=2&&owned(st.id)+1>=st.need&&

            (!Number.isFinite(cap)||st.level<cap)){

            candidate={part,mode:2,reason:'upgrade',slot:s.slot,gain:1};break;

          }

        }

      }

    }

    if(candidate)actions.push(candidate);

  }

  return actions.sort((a,b)=>b.gain-a.gain||a.part-b.part);

}

function plan(task=q()){

  const pat=rule(task),rs=slots();

  const signature=JSON.stringify([task?.id,task?.state,task?.progress,

    rs?.map(x=>[x.part,x.slot,x.id,x.level])]);

  const sum=rs?rs.reduce((n,x)=>n+x.level,0):null;

  const actions=rs?actionFor(rs):[];

  const chosen=actions[0]||null;

  const spent=S.attempts.get(task?.id)||0;

  const reached=pat&&sum!==null&&sum>=pat.target;

  const pending=!!S.pending&&S.pending.task===task?.id&&S.pending.sig===signature;

  const ready=!!pat&&C.enabled&&C.autoStone&&task?.state!==2&&rs!==null&&!reached&&!!chosen&&

    typeof rpc()?.oneKeyHandler==='function'&&spent<C.maxRequestsPerQuest&&

    now()-S.lastAt>=C.minGapMs&&!pending&&(!C.requireCommonScene||safe());

  const reason=!pat?'Khong phai quest Tong cap Da Hon':task?.state===2?'Server quest da xong':

    rs===null?'Chua co du lieu da hon/trang bi':reached?'Da du tong cap, doi server':

    !chosen?'Chua co da de kham/thay/nang; khong mua them':

    typeof rpc()?.oneKeyHandler!=='function'?'Khong co nut native Da Hon':

    spent>=C.maxRequestsPerQuest?'Vuot gioi han quest':pending?'Dang doi cap nhat server':

    C.requireCommonScene&&!safe()?'Dang trong tran/phong':'San sang';

  return {id:task?.id,name:task?.name,mode:pat?.mode||null,target:pat?.target||null,

    total:sum,ready,reason,choice:chosen,signature,spent,actions:actions.length,pending};

}

const probe=task=>{const p=plan(task);return {ready:p.ready,signature:p.signature};};

function run(task,old){

  // The factory queue already owns the current work slot. Never check U.busy() here.

  const p=plan(task);

  if(!p.ready||p.signature!==old.signature||q()?.id!==task?.id||

     (C.requireCommonScene&&!safe())||typeof rpc()?.oneKeyHandler!=='function')

    throw Error('Stone snapshot changed, skip this attempt');

  S.lastAt=now();S.attempts.set(task.id,(S.attempts.get(task.id)||0)+1);

  // Set pending BEFORE RPC, preventing duplicate sends on synchronous callbacks.

  S.pending={task:task.id,sig:p.signature,at:now(),total:p.total,choice:p.choice};

  try{rpc().oneKeyHandler([p.choice.part,p.choice.mode]);S.sent++;}

  catch(e){S.errors++;S.lastError=String(e);throw e;}

  console.log('[V8.6.19] DA GUI DA HON',{task:task.id,total:p.total,target:p.target,choice:p.choice});

}



function tick(){

  if(!C.enabled||!S.pending)return;

  const task=q(),p=plan(task);

  if(task?.id!==S.pending.task||task?.state===2||p.signature!==S.pending.sig){

    S.confirmed++;S.history.push({at:new Date().toISOString(),id:S.pending.task,previous:S.pending.total,current:p.total});

    S.pending=null;

  }else if(now()-S.pending.at>=C.ackTimeoutMs){

    console.warn('[V8.6.19] Da Hon chua co ACK; khong gui lai cung trang thai');

    S.pending=null; // factory maxAttemptsPerUnchangedState=1 remains the protection

  }

}



function start(){C.enabled=true;if(F.config)F.config.allowMaterialRecipes=true;

  if(S.timer)__KVPV29.cancel(S.timer);

  S.timer=__KVPV29.every(()=>{try{tick();}catch(e){S.errors++;S.lastError=String(e);}},C.checkMs);

  tick();return true;}



function stop(){C.enabled=false;if(S.timer)__KVPV29.cancel(S.timer);S.timer=null;return true;}



function status(){const p=plan();console.table([{ID:p.id,Total:p.total,Target:p.target,

  Ready:p.ready,Reason:p.reason,Mode:p.choice?.reason||'-',Slot:p.choice?.slot||0,

  Sent:S.sent,ACK:S.confirmed,Error:S.lastError||'-'}]);

  return {...p,sent:S.sent,ack:S.confirmed,errors:S.errors,lastError:S.lastError};}

try{F.registerRecipe({type:'soul-stone-total',verified:true,spend:'materials',match:t=>!!rule(t),probe,run});}

catch(e){if(!/already exists/i.test(String(e))){console.error('[V8.6.19] Factory rejected stone recipe',e);return;}}

W.KVPV_V879_STONE={installed:true,config:C,start,stop,plan,status};

start();console.log('[V8.6.19] Da Hon executor installed, use KVPV_V879_STONE.status()');

})();



/* KVPV V8.6.19 - FAST SAFE timing preset
 * Speeds up POLLING for quests; does not bypass server ACK/battle/cooldowns.
 * Does not restart an active combat job; no repeated unverified RPC.
 */

(() => {

'use strict';

const W=window;

if(W.KVPV_V879_FAST?.installed){W.KVPV_V879_FAST.apply();return;}

const S={saved:[],applied:[],notes:[]};

function put(obj,key,val,name){

  if(!obj||!(key in obj)||!Number.isFinite(Number(obj[key])))return;

  const old=Number(obj[key]);if(old<=val)return;

  S.saved.push({obj,key,old,name});obj[key]=val;S.applied.push({name,field:key,from:old,to:val});

}

function apply(){

  // Idempotent: keep original values for reliable restore().

  if(S.saved.length)return status(false);

  S.applied=[];S.notes=[];

  // Never touch timed event schedule, premium actions, matchmaking minimums.

  put(W.KVPV_V866?.config,'scanMs',1000,'Quest Director');

  put(W.KVPV_V876?.config,'scanMs',1000,'Executor Factory');

  put(W.KVPV_V874?.config,'scanMs',1200,'Universal Router');

  put(W.KVPV_V873?.config,'scanMs',1200,'Linh Lung Tower');

  put(W.KVPV_V8?.config,'scanMs',8000,'V8 coverage scan');

  put(W.KVPV_DAILY?.config,'tickMs',1200,'Auto Daily');

  put(W.KVPV_V878?.config,'minDelayMs',1600,'Spell quest requests');

  put(W.KVPV_V878_STRENGTH?.config,'cooldownMs',2200,'Strength quest requests');

  put(W.KVPV_V877?.config,'minDelayMs',1600,'Mount quest requests');

  put(W.KVPV_V875?.config,'minimumIntervalMs',1600,'Pet quest requests');

  put(W.KVPV_V879_STONE?.config,'minGapMs',1600,'Soul stone quest requests');

  // Timer restart for polling-only loops that support it safely.

  for(const name of ['KVPV_V866','KVPV_V876','KVPV_V874']){

    const api=W[name];if(api?.config?.enabled===true && typeof api?.start==='function'){

      try{api.start();}catch(e){S.notes.push(name+': '+String(e));}

    }

  }

  // V8 monitor is restartable and does not alter battle state.

  if(W.KVPV_V8?.config?.enabled===true){try{W.KVPV_V8.stop();W.KVPV_V8.start();}catch(e){S.notes.push('V8 scanner: '+e);}}

  // Auto Daily's timer is created by start(). NEVER stop a running fight/dungeon.

  const job=W.KVPV_DAILY?.quickState?.();

  if(job?.running===true&&job?.job==='rảnh'){

    try{W.KVPV_DAILY.stop();W.KVPV_DAILY.start();}

    catch(e){S.notes.push('Auto Daily: '+String(e));}

  }else if(job?.running){S.notes.push('Auto Daily dang ban: tickMs moi se dung sau lan khoi dong ke tiep');}

  console.table(S.applied);return status(false);

}

function restore(){for(const x of S.saved.reverse())if(x.obj?.[x.key]===undefined||Number(x.obj[x.key])<=x.old)x.obj[x.key]=x.old;

  S.saved=[];S.applied=[];return true;}



function status(print=true){const out={applied:S.applied.slice(),notes:S.notes.slice(),

  daily:W.KVPV_DAILY?.quickState?.(),factory:W.KVPV_V876?.status?.(false)};

  if(print)console.table(out.applied);return out;}

W.KVPV_V879_FAST={installed:true,apply,restore,status};

apply();console.log('[V8.6.19] Fast polling, no blind re-send: KVPV_V879_FAST.status()');

})();












(() => {

'use strict';

const W=window,F=W.KVPV_V876,Q=W.KVPV_V866,D=W.KVPV_DAILY;

if(!F?.registerRecipe||!Q?.task||!D?.quickState||typeof _Ba==='undefined'||typeof _ft==='undefined'){

  console.error('[V8.6.20] Load V8.6.19 FULL into the game-frame first');return;

}

if(W.KVPV_V880?.installed){W.KVPV_V880.start();return;}

const C={enabled:true,scanMs:850,minGapMs:1500,ackWarnMs:30000,

  maxAttemptsPerQuest:180,autoWeapon:true,autoWing:true,autoArm:true,requireCommonScene:true};

const S={timer:null,pending:new Map(),failedStates:new Map(),sent:0,acked:0,

  errors:0,lastError:'',lastSend:new Map(),used:new Map(),notice:new Map(),history:[]};

const now=()=>Date.now();

const normalize=x=>String(x??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'')

 .replace(/[đĐ]/g,'d').toLowerCase().replace(/\s+/g,' ').trim();

const task=()=>Q.task?.();

const bag=()=>_Ba?._Ic?._aQ?.ins;

const safeScene=()=>_Ba?._$a?.SceneUtil?.isCommonScene===true&&

  _Ba?._$a?._yo?.ins?.isInMission!==true&&_Ba?._$a?._yo?.ins?.isInArena!==true;

const int=x=>Number.isSafeInteger(Number(x))&&Number(x)>=0?Number(x):null;

const defs=[

 {key:'weapon',label:'Than Binh',action:29,pattern:/\bthan binh\b/,

  enabled:()=>C.autoWeapon,

  level:()=>_Ba?._M4?._HJ?.inst?.otherValue?.['Tăng cấp'],

  cfg:lv=>_ft?._r$?.ins?.getShengjiCfgByLv?.(lv),

  rpc:()=>_Ba?._M4?._j6t?.inst?.fdShbing},

 {key:'wing',label:'Linh Duc',action:32,pattern:/\blinh duc\b/,

  enabled:()=>C.autoWing,

  level:()=>_Ba?._RJ?._DJ?.ins?.otherValue?.['Tăng cấp'],

  cfg:lv=>_ft?._PZ?.ins?.getShengjiCfgByLv?.(lv),

  rpc:()=>_Ba?._RJ?._R6t?.ins?.feedSb},

 {key:'arm',label:'Linh Ti',action:177,pattern:/\blinh ti\b/,

  enabled:()=>C.autoArm,

  level:()=>_Ba?._UJ?._XJ?.ins?.handInfo?.[0],

  cfg:lv=>_ft?._BKt?.ins?.getCfgByLevel?.(lv),

  rpc:()=>_Ba?._UJ?._Ujt?.ins?.feedHand}

];

function match(q,d){

 if(!q||Number(q.actionId)!==d.action)return null;

 const n=normalize(q.name);

 if(!d.pattern.test(n))return null;

 // Current native-feed action applies to level milestones, not rank/skin/skills.

 const found=/(?:lv\.?|level)\s*(\d{1,5})\b/.exec(n);

 const expected=/(?:cap|tang|dat|boi duong|len)/.test(n);

 if(!found||!expected||/(tien cap|bat|sao|ao hoa|phu hon|ky nang)/.test(n))return null;

 const target=int(found[1]);return target!==null&&target>0?{target}:null;

}

function owned(id){

 let x=null;try{x=int(bag()?.getItemCountById?.(id));}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

 return x;

}



function snapshot(d,q=task()){

 const rule=match(q,d),lv=int(d.level()),cost=lv!==null?d.cfg(lv):null;

 const next=lv!==null?d.cfg(lv+1):null;

 // In each of these three config tables current row [1] = [item ID, quantity].

 const materialId=Array.isArray(cost?.[1])?int(cost[1][0]):null;

 const need=Array.isArray(cost?.[1])?int(cost[1][1]):null;

 const have=materialId!==null&&materialId>0?owned(materialId):null;

 const signature=JSON.stringify([q?.id,q?.state,q?.progress,lv,materialId,need,have]);

 const pending=S.pending.get(d.key),blocked=S.failedStates.get(d.key);

 const hit=rule&&lv!==null&&lv>=rule.target;

 const enough=materialId!==null&&materialId>0&&need!==null&&need>0&&have!==null&&have>=need;

 const valid=!!rule&&lv!==null&&!!cost&&!!next&&enough&&typeof d.rpc()==='function';

 const since=now()-(S.lastSend.get(d.key)||0);

 const attempts=S.used.get(q?.id+'|'+d.key)||0;

 const ready=C.enabled&&d.enabled()&&q?.state!==2&&!!rule&&!hit&&valid&&

  !pending&&!blocked&&since>=C.minGapMs&&attempts<C.maxAttemptsPerQuest&&

  (!C.requireCommonScene||safeScene());

 const reason=!rule?'Quest khong thuoc nhom':q?.state===2?'Server task da xong':

  !d.enabled()?'Da tat executor':lv===null?'Chua dong bo level':

  hit?'Da dat Lv muc tieu, doi task server':!cost||!next?'Thieu cau hinh cap hien tai/tiep theo':

  !enough?'Khong du vat pham (khong tu mua)':typeof d.rpc()!=='function'?'Native method khong co':

  pending?'Da gui lenh, doi ACK':blocked?'Khong co ACK, khoa den khi server cap nhat':

  attempts>=C.maxAttemptsPerQuest?'Dat gioi han lenh quest':

  C.requireCommonScene&&!safeScene()?'Dang trong tran hoac phu ban':

  since<C.minGapMs?'Cho khoang cach gui lenh':'San sang';

 return {group:d.key,label:d.label,id:q?.id,name:q?.name,level:lv,target:rule?.target??null,

   materialId,need,have,signature,ready,reason,attempts,

   pending:!!pending,blocked:!!blocked};

}



function probe(d,q){const p=snapshot(d,q);return {ready:p.ready,signature:p.signature};}

function run(d,q,old){

 const p=snapshot(d,q),fn=d.rpc(),current=task();

 if(!p.ready||p.signature!==old.signature||current?.id!==q?.id||current?.state===2||

  typeof fn!=='function')throw Error('Native '+d.label+' state changed; skip');

 // We are ALREADY inside the shared V8 queue, do not check UPGRADES.busy().

 const previous=S.pending.get(d.key);

 if(previous)throw Error('Waiting for '+d.label+' ACK');

 const row={id:q.id,signature:p.signature,at:now(),level:p.level,progress:JSON.stringify(q.progress)};

 S.pending.set(d.key,row);S.lastSend.set(d.key,now());

 S.used.set(q.id+'|'+d.key,p.attempts+1);

 try{fn.call(d.key==='weapon'?_Ba._M4._j6t.inst:

   d.key==='wing'?_Ba._RJ._R6t.ins:_Ba._UJ._Ujt.ins);S.sent++;}

 catch(e){S.errors++;S.lastError=String(e);S.pending.delete(d.key);S.failedStates.set(d.key,row);throw e;}

 console.log('[V8.6.20] DA GUI BOI DUONG '+d.label,{task:q.id,level:p.level,target:p.target,item:p.materialId,need:p.need});

}



function watch(){

 for(const d of defs){

  const pending=S.pending.get(d.key),blocked=S.failedStates.get(d.key),q=task();

  const p=snapshot(d,q);

  function ack(row){

   return (!!q && q.id!==row.id) || (!!q && q.state===2) ||

     (p.level!==null&&p.level>row.level)||

     (!!q && q.id===row.id && JSON.stringify(q.progress)!==row.progress);

  }

  if(pending){

   if(ack(pending)){

    S.acked++;S.pending.delete(d.key);S.failedStates.delete(d.key);

    S.history.push({at:new Date().toISOString(),group:d.key,quest:pending.id,before:pending.level,after:p.level});

   }else if(now()-pending.at>C.ackWarnMs&&!pending.warned){

    pending.warned=true;console.warn('[V8.6.20] '+d.label+' khong co ACK; KHONG tu gui lai',{task:pending.id,lv:pending.level});

    S.failedStates.set(d.key,pending);S.pending.delete(d.key);

   }

  }

  if(blocked&&ack(blocked))S.failedStates.delete(d.key);

 }

}



function start(){C.enabled=true;

 if(F.config)F.config.allowMaterialRecipes=true;

 if(S.timer)__KVPV29.cancel(S.timer);

 S.timer=__KVPV29.every(()=>{try{watch();}catch(e){S.errors++;S.lastError=String(e);}},C.scanMs);

 watch();return true;}



function stop(){C.enabled=false;if(S.timer)__KVPV29.cancel(S.timer);S.timer=null;return true;}



function status(print=true){let out=defs.map(d=>snapshot(d));

 if(print)console.table(out.map(x=>({Nhom:x.label,Task:x.id,Level:x.level,MucTieu:x.target,

  VatPham:x.materialId,Co:x.have,Can:x.need,SanSang:x.ready,

  ChoACK:x.pending,BiKhoa:x.blocked,LyDo:x.reason})));

 return {groups:out,sent:S.sent,ack:S.acked,errors:S.errors,lastError:S.lastError,history:S.history.slice(-20)};

}

function clearBlockForTesting(){ // Manual repair after user validates live state externally

 const state=status(false);console.warn('[V8.6.20] No automatic reset; reload/recheck current game state first',state.groups);

 return state;

}

for(const d of defs){

 try{F.registerRecipe({type:'feed-'+d.key,verified:true,spend:'materials',

  match:q=>!!match(q,d),probe:q=>probe(d,q),run:(q,old)=>run(d,q,old)});}

 catch(e){console.error('[V8.6.20] Register '+d.label+' failed:',e);return;}

}

W.KVPV_V880={installed:true,config:C,start,stop,status,plan:(key)=>{

 const d=defs.find(x=>x.key===key);return d?snapshot(d):status(false);

},clearBlockForTesting};

start();console.log('[V8.6.20] Registered 3 native quest executors. KVPV_V880.status()');

})();



/* === ADDON V8.6.21 === */

/* KVPV V8.6.21 - TIEN THE + DUC HON / QUEST EXECUTORS
 * Verified against user-supplied 17,606,388-byte game client:
 * - Tien The (actionId 16): _Ba._wAt._XEn.inst.rfSoul(line)
 *   model _Ba._wAt._bAt.inst (_ref, _KIn, getInfoById, ck* methods)
 * - Duc Hon (actionId 192): _Ba._eW._dEt.inst.ZhOper(part,materialId)
 *   model _Ba._eW._pEt.inst (zhList, _mtItemID, getCanUpZH)
 * A single client-native command per confirmed state; no shopping/premium,
 * no rank shortcut, no concurrent RPCs. Server ACK required before next turn.
 */

(() => {

'use strict';

const W=window,F=W.KVPV_V876,Q=W.KVPV_V866,D=W.KVPV_DAILY;

if (!F?.registerRecipe||!Q?.task||!D?.quickState||typeof _Ba==='undefined') {

 console.error('[V8.6.21] Nap FULL V8.6.20 vao game-frame truoc');return;

}

if (W.KVPV_V881?.installed) {W.KVPV_V881.start();return;}

const C={enabled:true,pollMs:850,minGapMs:1500,ackTimeoutMs:35000,

 maxActionsPerQuest:180,maxCopperPerTrain:2000000,requireCommonScene:true,

 autoTienThe:true,autoDucHon:true,preferLowestStoneLevel:true};

const S={timer:null,pending:new Map(),blocked:new Map(),used:new Map(),lastSend:new Map(),

 sent:0,confirmed:0,errors:0,lastError:'',history:[],priorDucHon:null};

const at=()=>Date.now();

const plain=x=>String(x??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'')

 .replace(/[đĐ]/g,'d').toLowerCase().replace(/\s+/g,' ').trim();

const number=x=>Number.isSafeInteger(Number(x))&&Number(x)>=0?Number(x):null;

const quest=()=>Q.task?.();

const safeScene=()=>_Ba?._$a?.SceneUtil?.isCommonScene===true&&

 _Ba?._$a?._yo?.ins?.isInMission!==true&&_Ba?._$a?._yo?.ins?.isInArena!==true;

const bag=()=>_Ba?._Ic?._aQ?.ins;

const have=id=>{try{return number(bag()?.getItemCountById?.(id));}catch(_){return null;}};

function family(q){

 if(!q||q.state===2)return null;

 const n=plain(q.name),a=Number(q.actionId);

 if(a===16&&/tien the/.test(n)){

  if(/tu luyen\s*1\s*lan/.test(n))return {key:'tienthe',mode:'once'};

  const m=/(\d+)\s*(?:dong|loai)\s*tien the.*?bac\s*(\d+)/.exec(n);

  if(m)return {key:'tienthe',mode:'rank',count:number(m[1]),rank:number(m[2])};

 }

 if(a===192&&/duc hon/.test(n)){

  const m=/(?:tong cap|tong lv).*duc hon.*(?:lv\.?|level)\s*(\d+)/.exec(n);

  if(m)return {key:'duchon',mode:'total',target:number(m[1])};

 }

 return null;

}

function tnModel(){return _Ba?._wAt?._bAt?.inst;}

function tnRpc(){return _Ba?._wAt?._XEn?.inst;}

function dhModel(){return _Ba?._eW?._pEt?.inst;}

function dhRpc(){return _Ba?._eW?._dEt?.inst;}

function stateOf(key,q=quest()){

 const rule=family(q);if(!rule||rule.key!==key)return null;

 if(key==='tienthe'){

  const m=tnModel(),r=tnRpc(),data=m?._ref?.[0], names=m?._KIn;

  if(!Array.isArray(data)||!Array.isArray(names)||typeof r?.rfSoul!=='function')

   return {key,rule,q,ready:false,reason:'Chua co data hoac native rfSoul'};

  const levels=names.map((_,i)=>number(m.getNwLvById?.(i)));

  const ranks=names.map((_,i)=>number(m.getInfoById?.(i)));

  const totalRanked=rule.mode==='rank'?ranks.filter(x=>x!==null&&x>=rule.rank).length:null;

  const done=rule.mode==='rank'&&totalRanked>=rule.count;

  const copper=number(_Ba?._rJ?._O$?.ins?.copper);

  const choices=[];

  if(!done&&copper!==null)for(let i=0;i<names.length;i++){

   if(rule.mode==='rank'&&(ranks[i]===null||ranks[i]>=rule.rank))continue;

   try{

    if(m.ckOpById(i,false)!==true||m.ckIsFitCd(i)!==true||

       m.ckCanTrById(i)!==true||m.ckCanTrByLv(i)!==true)continue;

    const cost=number(m._n$n?.[i]);

    if(cost===null||cost<=0||cost>copper||cost>C.maxCopperPerTrain)continue;

    choices.push({index:i,name:names[i],lv:levels[i],rank:ranks[i],cost});

   }catch(_){window.KVPV_V1?.diagnostics?.record(_);}

  }

  // Keep every soul line at the same rank before advancing the next rank.
  choices.sort((a,b)=>rule.mode==='rank'?((a.rank??0)-(b.rank??0)||a.cost-b.cost):a.cost-b.cost);

  const choice=choices[0]??null;

  const progress=JSON.stringify(data.map(x=>[x?.[0],x?.[1]]));

  return {key,rule,q,levels,ranks,totalRanked,copper,choice,done,

    stateSig:progress,signature:JSON.stringify([q.id,q.state,q.progress,progress,copper,choice?.index]),

    ready:!!choice,reason:done?'Da du so dong/bac, doi server':choice?'San sang':

    copper===0?'Het vang; cho co vang roi thu lai':
    'Chua du dong dieu kien/tien dong hoac bi khoa cap'};

 }

 const m=dhModel(),r=dhRpc(),rows=m?.zhList;

 if(!Array.isArray(rows)||!Array.isArray(m?._mtItemID)||typeof r?.ZhOper!=='function')

  return {key,rule,q,ready:false,reason:'Chua dong bo Duc Hon/native ZhOper'};

 const itemId=number(m._mtItemID[0]);

 const owned=itemId!==null&&itemId>0?have(itemId):null;

 const slots=_Ba?._rJ?._O$?.ins?.equipsDic?.keys;

 const active=Array.isArray(slots)?slots.map(Number).filter(x=>Number.isInteger(x)&&x>=1&&x<=10):[];

 const levels=active.map(part=>({part,lv:number(rows[part]?.[1]),xp:number(rows[part]?.[2])})).filter(x=>x.lv!==null);

 const total=levels.reduce((s,x)=>s+x.lv,0),done=total>=rule.target;

 const maxCfg=_ft?._EZ?.ins;

 const choices=levels.filter(x=>{

  try{return x.lv<Number(maxCfg?.getMaxLevelByPart?.(x.part))&&

    !!maxCfg?.getDateByPartAndLevel?.(x.part,x.lv);}catch(_){return false;}

 }).sort((a,b)=>a.lv-b.lv||a.part-b.part);

 const choice=C.preferLowestStoneLevel?choices[0]:choices.find(x=>m.getCanUpZH?.(x.part)===true)||choices[0];

 const stateSig=JSON.stringify(levels);

 return {key,rule,q,levels,total,owned,itemId,choice,done,stateSig,

   signature:JSON.stringify([q.id,q.state,q.progress,stateSig,owned,itemId,choice?.part]),

   ready:!done&&!!choice&&itemId>0&&owned>0,

   reason:done?'Da du tong cap, doi server':!choice?'Khong co o Duc Hon chua dat cap toi da':

    !(owned>0)?'Het nguyen lieu Duc Hon, khong mua': 'San sang'};

}



function preview(key,q=quest()){

 const p=stateOf(key,q);if(!p)return {ready:false,signature:'not-this-family'};

 const blocked=S.blocked.get(key),pending=S.pending.get(key);

 const uses=S.used.get(q?.id+'|'+key)||0;

 const wait=at()-(S.lastSend.get(key)||0)<C.minGapMs;

 const ready=C.enabled&&((key==='tienthe'&&C.autoTienThe)||(key==='duchon'&&C.autoDucHon))&&

 p.ready&&!blocked&&!pending&&!wait&&uses<C.maxActionsPerQuest&&

 (!C.requireCommonScene||safeScene());

 return {...p,ready,pending:!!pending,blocked:!!blocked,uses,

  reason:!C.enabled?'Da tat':pending?'Dang doi server':blocked?'Khong co ACK, khoa':

   C.requireCommonScene&&!safeScene()?'Dang danh/ngoai ban do thuong':

   wait?'Cho khoang cach lenh':uses>=C.maxActionsPerQuest?'Dat gioi han hanh dong':p.reason};

}



function probe(key,q){const p=preview(key,q);return {ready:p.ready,signature:p.signature||'missing'};}

function run(key,q,old){

 const current=quest(),p=preview(key,current);

 if(!p.ready||current?.id!==q?.id||old.signature!==p.signature)throw Error('Nhiem vu/data '+key+' thay doi');

 // At this point the SHARED V8 queue already owns its pending slot.

 // Never check KVPV_UPGRADES.busy() here (self-pending false positive).

 const row={id:q.id,at:at(),before:p.stateSig,progress:JSON.stringify(q.progress),

  total:key==='duchon'?p.total:null,level:key==='tienthe'?p.levels?.[p.choice.index]:null};

 S.pending.set(key,row);S.lastSend.set(key,row.at);

 S.used.set(q.id+'|'+key,p.uses+1);

 try{

  if(key==='tienthe')tnRpc().rfSoul(p.choice.index);

  else dhRpc().ZhOper(p.choice.part,p.itemId);

  S.sent++;console.log('[V8.6.21] GUI LENH '+key,{id:q.id,choice:p.choice,target:p.rule});

 }catch(e){S.errors++;S.lastError=String(e);S.pending.delete(key);S.blocked.set(key,row);throw e;}

}

function backgroundPolicy(){

 const u=W.KVPV_UPGRADES?.config;

 if(!u||!('ducHon' in u))return;

 const active=C.enabled&&family(quest())?.key==='duchon';

 if(active&&S.priorDucHon===null){S.priorDucHon={value:u.ducHon};u.ducHon=false;}

 else if(!active&&S.priorDucHon){

  if(u.ducHon===false)u.ducHon=S.priorDucHon.value;

  S.priorDucHon=null;

 }

}



function watch(){

 backgroundPolicy();

 const q=quest();for(const key of ['tienthe','duchon']){

  const p=stateOf(key,q),pending=S.pending.get(key),blocked=S.blocked.get(key);

  function ack(r){return !!q&&(q.id!==r.id||q.state===2||

   (!!p&&p.stateSig!==r.before)||JSON.stringify(q.progress)!==r.progress);}

  if(pending){

   if(ack(pending)){

    S.confirmed++;S.pending.delete(key);S.blocked.delete(key);

    S.history.push({at:new Date().toISOString(),key,task:pending.id,before:pending.before,after:p?.stateSig});

    if(S.history.length>60)S.history.shift();

   }else if(at()-pending.at>C.ackTimeoutMs){

    console.warn('[V8.6.21] Het thoi gian cho ACK; KHONG tu gui lai',{key,task:pending.id});

    S.pending.delete(key);S.blocked.set(key,pending);

   }

  }

  if(blocked&&ack(blocked))S.blocked.delete(key);

 }

}



function start(){C.enabled=true;F.config.allowMaterialRecipes=true;

 if(S.timer)__KVPV29.cancel(S.timer);

 S.timer=__KVPV29.every(()=>{try{watch();}catch(e){S.errors++;S.lastError=String(e);}},C.pollMs);

 watch();return true;}



function stop(){C.enabled=false;if(S.timer)__KVPV29.cancel(S.timer);S.timer=null;backgroundPolicy();return true;}



function status(print=true){const all=['tienthe','duchon'].map(k=>{

 const p=preview(k);return {family:k,quest:p.q?.id??null,task:p.q?.name??null,

 mode:p.rule?.mode??null,progress:k==='tienthe'?p.ranks:p.total,

 target:p.rule?.rank??p.rule?.target??null,chosen:p.choice?.index??p.choice?.part??null,

 ready:p.ready,reason:p.reason,pending:p.pending||false,blocked:p.blocked||false};});

 if(print)console.table(all);

 return {executors:all,sent:S.sent,acked:S.confirmed,errors:S.errors,

 lastError:S.lastError,history:S.history.slice(-15)};

}

for(const key of ['duchon']){

 try{F.registerRecipe({type:key==='tienthe'?'train-tienthe':'train-duchon',

  verified:true,spend:'materials',match:q=>family(q)?.key===key,

  probe:q=>probe(key,q),run:(q,old)=>run(key,q,old)});

 }catch(e){console.error('[V8.6.21] Khong dang ky duoc '+key,e);return;}

}

W.KVPV_V881={installed:true,config:C,start,stop,status,

 plan:key=>stateOf(key),preview:key=>preview(key),history:()=>S.history.slice()};

start();console.log('[V8.6.21] Duc Hon executor ready; Tien The is owned by red-dot module; KVPV_V881.status()');

})();



/* ================= SOLO MAIN ACCOUNT SUPERVISOR V8.6.22 ================= */

/* KVPV MAIN SOLO V8.6.22 - SAFE UNATTENDED RUNTIME
 * One main character, bounded logs, health diagnostics and conservative restart.
 * Never guesses RPCs or bypasses server ACK. No clone/4-account matchmaking.
 */

(() => {

  'use strict';

  const W = window;

  const MAIN = window.__KVPV_OWN_ACTOR_ID;

  const actor = () => String(_Ba?._rJ?._O$?.ins?.actorId ?? '');

  const D = W.KVPV_DAILY;

  if (!D?.config || !D.quickState || actor() !== MAIN) {

    console.error('[MAIN SOLO] Wrong character/frame or Auto Daily not loaded');

    return;

  }

  if (W.KVPV_MAIN_SOLO?.installed) {

    console.info('[MAIN SOLO] Already installed');

    return;

  }

  const C = {

    enabled: true,

    checkMs: 15000,

    restartWhenIdle: true,

    stalledWarnMs: 25 * 60000,

    logLimit: 120,

    preserveEquipment: true,

    preserveMaterials: true,

    noTeams: true, // Block OLD EXP4/Crystal clone flows; Tinh Than 1 clone allowed.

    allowSoloPublicExp: true // User approved public EXP matchmaking on the main account.

  };

  const S = {timer:null,at:Date.now(),lastJob:'',lastChangeAt:Date.now(),

    warnings:[],events:[],lastWarning:new Map(),lastSync:0,restarts:0,paused:false,

    heartbeat:0,lastFailure:'',questId:'',questSig:'',lastQuestAt:0,pausedModules:[]};

  const now = () => Date.now();

  const nativeBusy = () => !!W.KVPV_UPGRADES?.busy?.();

  const safeScene = () => _Ba?._$a?.SceneUtil?.isCommonScene === true;

  const inCombat = () => _Ba?._$a?._yo?.ins?.isInMission === true ||

    _Ba?._$a?._yo?.ins?.isInArena === true;

  function push(type,detail){

    const x={at:new Date().toISOString(),type,detail};

    S.events.push(x);

    if(S.events.length>C.logLimit)S.events.splice(0,S.events.length-C.logLimit);

    if(type==='warning')S.warnings.push(x);

    if(S.warnings.length>40)S.warnings.shift();

    return x;

  }

  function once(key,detail,gap=600000){

    const t=now(),prev=S.lastWarning.get(key)||0;

    if(t-prev<gap)return;

    S.lastWarning.set(key,t);push('warning',detail);

    console.warn('[MAIN SOLO]',detail);

  }

  function enforce(){

    const c=D.config;

    c.enableExp=false;

    c.enableCrystal=false;

    // Ngoai EXP/Crystal legacy, cho phep duy nhat team Boss Tinh Than.

    c.autoTeam=!!c.enableTinhThan;

    c.autoApproveTeam=!!c.enableTinhThan;

    if(C.preserveEquipment && c.smeltEnabled){

      // V3.4: opt-in safe native equip fusion only. Never enable holy or pet auto-smelt.

      c.smeltEnabled.holy=false;

      c.smeltEnabled.pet=false;

    }

    if(C.preserveMaterials)c.enableCompose=false;

    // Supervisor exclusively owns Auto Daily start/stop; child addons must not restart it.

    for(const key of ['KVPV_V871','KVPV_V876','KVPV_V875','KVPV_V873']){

      if(W[key]?.config && 'autoStartDaily' in W[key].config)

        W[key].config.autoStartDaily=false;

    }

    if(C.noTeams){

      const v=W.KVPV_V866?.config;

      if(v){

        v.enableVerifiedExp4Account=false;

        // Cross-check the factory family to avoid misclassifying Pet LvN as character EXP.

        const q=W.KVPV_V866?.task?.();

        const ex=W.KVPV_V876?.status?.(false);

        const characterExp=q&&ex&&ex.id===q.id&&ex.family==='exp'&&

          W.KVPV_V866?.routeName?.(q)==='level-exp'&&q.state!==2;

        v.autoPublicExpMatching=C.allowSoloPublicExp===true&&!!characterExp;

      }

      const clone=W.KVPV_CRYSTAL_CLONES;

      if(clone?.config?.enabled)try{clone.stop?.();}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

      const four=W.KVPV_EXP_4ACC;

      if(four?.role && four.role!=='off')try{four.stop?.(true);}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

    }

  }

  function quest(){

    try{

      const task=W.KVPV_V866?.task?.() || W.KVPV_V876?.task?.();

      if(!task)return null;

      return {id:String(task.id),name:String(task.name),state:Number(task.state),

        actionId:Number(task.actionId),progress:task.progress??null};

    }catch(_){return null;}

  }

  

  function tick(){

    if(!C.enabled||S.paused)return;

    if(actor()!==MAIN){

      once('actor-changed','Account switched: supervisor halted.');

      pause();return;

    }

    enforce();

    const t=now();S.heartbeat=t;

    const d=D.quickState?.() || {running:false,job:'unknown',step:'unknown'};

    const key=[d.job,d.step,d.scene].join('|');

    if(key!==S.lastJob){S.lastJob=key;S.lastChangeAt=t;push('job',key);}

    const q=quest();

    if(q){

      const sig=JSON.stringify([q.id,q.state,q.progress]);

      if(sig!==S.questSig){

        S.questId=q.id;S.questSig=sig;S.lastQuestAt=t;

        push('quest',{id:q.id,name:q.name,state:q.state,progress:q.progress});

      }

    }

    if(!d.running){

      // No forced restart inside battle, during queue pending, or while user paused.

      if(C.restartWhenIdle && safeScene() && !inCombat() && !nativeBusy()){

        try{D.start();S.restarts++;push('restart','Auto Daily restarted in common scene');}

        catch(e){S.lastFailure=String(e);once('restart-error','Restart failed: '+S.lastFailure);}

      }else once('not-running','Auto Daily stopped; restart deferred until idle/common scene');

    }else if(d.job!=='rảnh' && t-S.lastChangeAt>C.stalledWarnMs){

      // DO NOT reset an active fight, abandon a dungeon, or repeat an uncertain RPC.

      once('stalled:'+key,'Possible stuck job '+key+'; no forced reset of battle',1800000);

    }

    if(t-S.lastSync>120000){

      S.lastSync=t;

      try{

        const snap={at:new Date().toISOString(),actor:MAIN,running:!!d.running,

          job:d.job,step:d.step,quest:q?.id||null,lastFailure:S.lastFailure};

        W.localStorage?.setItem?.('KVPV_MAIN_SOLO_LAST_'+MAIN,JSON.stringify(snap));

      }catch(_){/* Some embedded game frames disallow storage. */}

    }

  }

  

  function status(print=true){

    const d=D.quickState?.()||{},q=quest(), f=W.KVPV_V876;

    let executor=null;

    try{executor=f?.status?.(false)||null;}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

    const out={version:'8.6.22',actor:actor(),mainOnly:actor()===MAIN,

      running:!!d.running,job:d.job||'-',step:d.step||'-',scene:d.scene,

      quest:q,executor:{family:executor?.family||null,verified:executor?.verified??null,

        executable:executor?.executable??null,module:executor?.module??null},

      queueBusy:nativeBusy(),lastProgressAt:S.lastQuestAt?new Date(S.lastQuestAt).toISOString():null,

      supervisor:C.enabled&&!S.paused,paused:S.paused,heartbeat:S.heartbeat?new Date(S.heartbeat).toISOString():null,

      restarts:S.restarts,lastError:S.lastFailure,

      hidden:typeof document!=='undefined'?!!document.hidden:null,

      crystal:false,exp4:false,publicMatch:!!W.KVPV_V866?.config?.autoPublicExpMatching,

      publicMatchApproved:C.allowSoloPublicExp===true,

      publicMatchSent:W.KVPV_V866?.publicExp?.()?.sent??0,

      smelt:false,compose:false,

      warnings:S.warnings.length};

    if(print)console.table([{Acc:out.actor,Auto:out.running,Job:out.job,Step:out.step,

      Quest:q?.id||'-',Name:q?.name||'-',Executor:out.executor.module||'-',

      Executable:out.executor.executable,QueueBusy:out.queueBusy,

      Hidden:out.hidden,Warnings:out.warnings}]);

    return out;

  }

  function diagnostics(){const s=status(false);

    const issues=[];

    if(!s.mainOnly)issues.push('Wrong character');

    if(!s.running)issues.push('Auto Daily not running');

    if(!s.executor.executable && s.quest?.state!==2)

      issues.push('Current quest may lack verified executor');

    if(s.queueBusy)issues.push('Shared RPC queue is currently busy (may be normal)');

    if(s.hidden)issues.push('Browser may throttle background timers');

    if(!safeScene())issues.push('Not in common scene: avoid forced restarts');

    if(s.job!=='rảnh' && S.lastChangeAt && now()-S.lastChangeAt>C.stalledWarnMs)

      issues.push('Job appears stuck; not resetting automatically');

    console.table(issues.map((message,i)=>({i:i+1,message})));

    return {status:s,issues,warnings:S.warnings.slice(-12)};

  }

  function pause(){S.paused=true;C.enabled=false;

    if(S.timer!==null){__KVPV29.cancel(S.timer);S.timer=null;}

    S.pausedModules=[];

    for(const name of ['KVPV_UPGRADES','KVPV_V8','KVPV_V866','KVPV_V874',

      'KVPV_V876','KVPV_V870','KVPV_V871','KVPV_V875','KVPV_V877',

      'KVPV_V878','KVPV_V878_STRENGTH','KVPV_V879_STONE','KVPV_V880',

      'KVPV_V881','KVPV_V868','KVPV_V873','KVPV_V864','KVPV_V865']){

      const config=W[name]?.config;

      if(config && config.enabled===true){S.pausedModules.push(config);config.enabled=false;}

    }

    try{D.stop?.();}catch(e){S.lastFailure=String(e);}

    push('manual','Stopped by user; child executors and supervisor paused');

    return true;

  }

  function resume(){if(actor()!==MAIN){console.error('[MAIN SOLO] Wrong account');return false;}

    for(const cfg of S.pausedModules)if(cfg.enabled===false)cfg.enabled=true;

    S.pausedModules=[];

    C.enabled=true;S.paused=false;enforce();

    if(S.timer!==null)__KVPV29.cancel(S.timer);

    S.timer=__KVPV29.every(()=>{try{tick();}catch(e){S.lastFailure=String(e);once('supervisor-error',S.lastFailure);}},C.checkMs);

    __KVPV29.tag(S.timer,'main-solo-supervisor',10);

    try{D.start?.();}catch(e){S.lastFailure=String(e);}

    tick();return true;

  }

  

  function report(){return {generatedAt:new Date().toISOString(),status:status(false),

    recentEvents:S.events.slice(),warnings:S.warnings.slice(),

    nativeQueue:W.KVPV_UPGRADES?.status?.()??null,

    factoryCounters:W.KVPV_V876?.counters?.()??null};}

  

  function exportReport(){const data=JSON.stringify(report(),null,2);

    const fn='KVPV_MAIN_SOLO_REPORT_'+new Date().toISOString().slice(0,10)+'.json';

    if(typeof document==='undefined'||typeof Blob==='undefined'||typeof URL==='undefined')return data;

    const u=URL.createObjectURL(new Blob([data],{type:'application/json'}));

    try{const a=document.createElement('a');a.href=u;a.download=fn;document.body.appendChild(a);a.click();a.remove();}

    finally{setTimeout(()=>URL.revokeObjectURL(u),15000);}

    return fn;

  }

  const api={installed:true,config:C,status,diagnostics,report,exportReport,

    pause,resume,stop:pause,start:resume,logs:()=>S.events.slice(),

    lastSaved:()=>{try{return JSON.parse(W.localStorage?.getItem?.('KVPV_MAIN_SOLO_LAST_'+MAIN)||'null');}catch(_){return null;}}};

  W.KVPV_MAIN_SOLO=api;

  enforce();resume();

  console.log('[MAIN SOLO V8.6.22] ONE MAIN ACCOUNT READY. Commands: KVPV_MAIN_SOLO.status(), .diagnostics(), .pause(), .resume(), .exportReport()');

})();



/* V8.6.30 - MAIN SOLO PUBLIC EXP OBSERVABILITY (read-only; no extra timers)
 * The native request remains owned by V8 shared upgrade queue.
 */

(() => {

  'use strict';

  const W=window, MAIN=window.__KVPV_OWN_ACTOR_ID;

  const who=()=>String(_Ba?._rJ?._O$?.ins?.actorId??'');

  

  function status(print=true){

    const q=W.KVPV_V866?.task?.()??null;

    const d=W.KVPV_DAILY?.quickState?.()??{};

    const e=W.KVPV_V866?.exp?.()??null;

    const pub=W.KVPV_V866?.publicExp?.()??null;

    const ex=W.KVPV_V876?.status?.(false)??null;

    const solo=W.KVPV_MAIN_SOLO?.status?.(false)??{};

    const act=q&&ex&&String(q.id)===String(ex.id)&&ex.family==='exp'&&

      W.KVPV_V866?.routeName?.(q)==='level-exp';

    let reason='';

    if(who()!==MAIN)reason='Sai acc';

    else if(!d.running)reason='Auto Daily khong chay';

    else if(!act)reason='Nhiem vu hien tai khong phai tang cap nhan vat';

    else if(q.state===2)reason='Doi server nhan thuong nhiem vu';

    else if(!solo.publicMatchApproved)reason='Chua duoc phep ghep EXP cong khai';

    else if(!(Number(e?.remaining)>0))reason='Khong con luot EXP mien phi/du lieu chua dong bo';

    else if(e?.hasTeam===true)reason='Da o trong doi - doi game xep tran';

    else if(d.job!=='rảnh')reason='Dang lam hoat dong khac: '+String(d.job);

    else if(e?.publicReady && pub?.probe?.ready)reason='San sang: doi hang doi gui MATCH';

    else if(pub?.probe && !pub.probe.ready)reason='Cho hang doi/cooldown/da gui yeu cau truoc do';

    else reason=e?.reason||'Doi game cap nhat trang thai';

    const out={version:'8.6.30',mainOnly:who()===MAIN,

      enabled:!!W.KVPV_V866?.config?.autoPublicExpMatching,

      approved:!!solo.publicMatchApproved,

      quest:q?.id??null,questName:q?.name??null,questState:q?.state??null,

      route:q?W.KVPV_V866?.routeName?.(q):null,

      family:ex?.family??null,job:d.job??null,scene:d.scene??null,

      remaining:e?.remaining??null,redPoint:e?.red??null,

      teamKnown:e?.teamKnown??null,hasTeam:e?.hasTeam??null,

      ready:e?.publicReady??false,queueReady:pub?.probe?.ready??false,

      alreadySent:pub?.sent??0,registered:pub?.registered??false,

      reason};

    if(print)console.table([out]);

    return out;

  }

  W.KVPV_SOLO_EXP30={installed:true,status,diagnostics:()=>({

    soloExp:status(false),queue:W.KVPV_UPGRADES?.status?.()??null,

    director:W.KVPV_V866?.status?.(false)??null

  })};

  console.log('[EXP V8.6.30] Public EXP for main account is enabled only for verified character-level quests. Check KVPV_SOLO_EXP30.status()');

})();



/* KVPV MAIN SOLO V8.6.26 - TU LA TARGET HOTFIX
 * Original Tu La UI invokes updAttack() on panel open, mode change and phase/flag change.
 * The V8.6.25 automation ALSO invokes updAttack() repeatedly every ~12 seconds.
 * This addon disables only the EXTRA periodic retarget imposed by Auto Daily.
 * Does not alter native UI auto-combat, event entrance, reward or exit logic.
 */

(() => {

  'use strict';

  const ID = window.__KVPV_OWN_ACTOR_ID;

  const actor = () => (typeof _Ba === 'undefined') ? '' : String(_Ba?._rJ?._O$?.ins?.actorId ?? '');

  const current = actor();

  const D = window.KVPV_DAILY;

  if (current !== ID || !D?.config) {

    console.warn('[TuLa V8.6.26] Chua dung acc chinh/game-frame hoac chua nap FULL.',

      {expected: ID, current: current || 'unavailable'});

    return;

  }

  function apply() {

    if (actor() !== ID || !window.KVPV_DAILY?.config) return false;

    window.KVPV_DAILY.config.tuLaAutoTarget = false;

    return true;

  }

  

  function status() {

    const m = (typeof _Ba === 'undefined') ? undefined : _Ba?._hE?._olt?.inst;

    const d = window.KVPV_DAILY;

    const obj = {

      version: '8.6.26',

      actorId: actor(),

      soloAuthorized: actor() === ID,

      eventAutoEnabled: d?.config?.enableTuLa === true,

      periodicTargetOverrideEnabled: d?.config?.tuLaAutoTarget === true,

      dailyJob: d?.quickState?.()?.job ?? null,

      scene: d?.quickState?.()?.scene ?? null,

      tuLaStage: Number.isFinite(Number(m?.stage)) ? Number(m.stage) : null,

      nativeAutoSelectType: Number.isInteger(Number(m?.autoSelType)) ? Number(m.autoSelType) : null,

      nativeMode: ({0:'Quai',1:'Nguoi choi',2:'Ky thu / Co'})[Number(m?.autoSelType)] ?? 'Khong ro',

      hasNativeTargetSelector: typeof m?.updAttack === 'function',

      note: 'Tat periodic retarget cua script; game van co the tu doi muc tieu theo giai doan.'

    };

    console.table([obj]);

    return obj;

  }

  apply();

  window.KVPV_TULA26 = Object.freeze({apply,status});

  console.info('[TuLa V8.6.26] Da tat script retarget 12 giay. Tu La auto van bat.',

    {tuLaEnabled:D.config.enableTuLa, retargetEnabled:D.config.tuLaAutoTarget});

})();



 



/* KVPV V8.6.28 - SOURCE AUDIT / READ-ONLY RUNTIME DIAGNOSTICS
 * No new gameplay RPC, no duplicate timer, no auto purchase. */

(() => {

  'use strict';

  const W=window;

  const ID=window.__KVPV_OWN_ACTOR_ID;

  const actor=()=>typeof _Ba==='undefined'?'':String(_Ba?._rJ?._O$?.ins?.actorId??'');

  if(actor()!==ID||!W.KVPV_MAIN_SOLO?.installed||!W.KVPV_DAILY?.config){

    console.warn('[KVPV V8.6.28] Wrong main account/game-frame; diagnostic not installed');

    return;

  }

  const D=W.KVPV_DAILY, M=W.KVPV_MAIN_SOLO;

  

  function status(print=true){

    const state=D.quickState?.()||{};

    const solo=M.status?.(false)||{};

    const fishActive=state.job==='daotri'&&state.step==='collecting'&&state.scene===22;

    const out={version:'8.6.28',actor:actor(),mainOnly:actor()===ID,

      autoDaily:!!state.running,job:state.job,step:state.step,scene:state.scene,

      fishFastPollingExpected:fishActive,

      confirmedJobCooldownMs:D.config.postJobSuccessCooldownMs,

      nativeTuLaRetargetDisabled:D.config.tuLaAutoTarget===false,

      cloneExpDisabled:D.config.enableExp===false,

      crystal4Disabled:D.config.enableCrystal===false,

      currentQuestExecutor:solo.executor||null,

      eventScheduleCount:D.lichEvents?.()?.length??null,

      events13:!!W.KVPV_EVENTS13,

      events24:!!W.KVPV_EVENTS24,

      events25:!!W.KVPV_EVENTS25,

      noPremiumSpendGuarantee:'Policy-only; verify all modules before unattended use',

      sourceClientBytes:17606388,vm72625:'Legacy 307217-byte Auto Daily source inspected; not a separate game client'};

    if(print)console.table([out]);return out;

  }

  

  function report(){

    const events=D.lichEvents?.()||[];

    const rows=events.map(e=>({key:e.key,name:e.name,declaredMode:e.action||'schedule-only',

      needsLiveVerification:e.action!=='auto',schedule:e.slots||e.instants||[]}));

    const output={at:new Date().toISOString(),status:status(false),events:rows,

      missingEvents25:typeof W.KVPV_EVENTS25?.missing==='function' ? null : 'No events25 reporter',

      questStats:W.KVPV_V876?.summary?.(false)||null};

    return output;

  }

  W.KVPV_AUDIT28=Object.freeze({version:'8.6.28',status,report,

    events:()=>{const r=report().events;console.table(r);return r;},

    diagnostics:()=>({current:status(false),solo:M.diagnostics?.(),events25:W.KVPV_EVENTS25?.diagnostics?.()})});

  console.info('[KVPV MAIN SOLO V8.6.28] Verified-source guardrails and diagnostics ready');

})();



  /* V8.6.29 – coordinator observability. All commands remain owned by original modules. */

  (()=>{

    const W=window;

    const D=W.KVPV_DAILY, M=W.KVPV_MAIN_SOLO;

    if(!D?.quickState||!M?.installed){

      console.error('[KVPV 8.6.29] Bundled core did not install; unified report unavailable');

      return;

    }

    function eventState(){

      const d=D.lichData?.()||{};

      const e=W.KVPV_EVENTS24?.status?.(false)?.rows||[];

      return {vnTime:d.localTime??null,

        active:(d.active||[]).map(x=>({name:x.name,mode:x.action||'schedule-only',time:x.time||null})),

        upcoming:(d.upcoming||[]).slice(0,12).map(x=>({name:x.name,time:x.time||null})),

        declared:(D.lichEvents?.()||[]).length,

        missingExecutors:e.filter(x=>!['auto','partial-auto','auto-reward-only'].includes(x.mode))

          .map(x=>({event:x.event,mode:x.mode,missing:x.details}))};

    }

    

    function status(print=true){

      const daily=D.quickState(),main=M.status?.(false)||{};

      const clock=__KVPV29.status(false);

      const out={version:'8.6.29',actorId:main.actor,mainOnly:main.mainOnly,

        autoRunning:daily?.running===true,job:daily?.job,step:daily?.step,

        quest:main.quest?.id||null,scene:daily?.scene,supervisor:main.supervisor,

        liveNativeTimers:clock.hasNativeAlarm?1:0,scheduledModuleLoops:clock.activeTimers,

        schedulerErrors:clock.callbackErrors,slowCallbacks:clock.slowCallbacks,

        overdueMs:clock.maxOverdueMs,maxWakeGapMs:clock.maxWakeGapMs,

        eventCount:(D.lichEvents?.()||[]).length,

        currentExecutorVerified:main.executor?.verified??null,

        currentExecutorExecutable:main.executor?.executable??null,

        note:'Scheduler is unified; RPC queue and server-ACK guards remain from 8.6.28'};

      if(print)console.table([out]);return out;

    }

    function diagnostics(){

      const data={status:status(false),scheduler:__KVPV29.status(false),

        schedulerErrors:__KVPV29.errors(),

        main:M.diagnostics?.(),events:eventState(),

        eventACK:W.KVPV_EVENTS25?.status?.(false)||null};

      if(data.scheduler.maxWakeGapMs>20000)

        console.warn('[KVPV 8.6.29] Browser throttling/sleep possible; check tab and Windows power mode');

      return data;

    }

    

    function exportReport(){

      const payload=JSON.stringify({generatedAt:new Date().toISOString(),

        ...diagnostics()},null,2);

      if(!document?.createElement||!window.Blob||!window.URL?.createObjectURL)return payload;

      const blob=new Blob([payload],{type:'application/json;charset=utf-8'}),

        url=URL.createObjectURL(blob),a=document.createElement('a');

      try{a.href=url;a.download='KVPV_V8629_UNIFIED_'+new Date().toISOString().slice(0,10)+'.json';

        document.body.appendChild(a);a.click();a.remove();}

      finally{(window.KVPV_V1?.timers?.setTimeout ?? window.setTimeout)(()=>URL.revokeObjectURL(url),15000);}

      return a.download;

    }

    W.KVPV_UNIFIED29=Object.freeze({installed:true,version:'8.6.29',

      status,diagnostics,eventState,exportReport,timers:()=>__KVPV29.status(true),

      schedulerErrors:__KVPV29.errors,main:M});

    console.info('[KVPV 8.6.29] One native timer manager active; game-native ACK and queues preserved. Use KVPV_UNIFIED29.status()');

  })();









(() => {

  'use strict';

  const W = window;

  const EXPECTED = window.__KVPV_OWN_ACTOR_ID;

  const actor = () => String((typeof _Ba === 'undefined' ? undefined : _Ba?._rJ?._O$?.ins?.actorId) ?? '');

  if (actor() !== EXPECTED || !W.KVPV_MAIN_SOLO?.installed ||

      typeof _Ba === 'undefined' || typeof _ft === 'undefined') {

    console.error('[BIEN THAN33] Khong phai acc chinh/game-frame, hoac chua nap MAIN SOLO FULL');

    return;

  }

  if (W.KVPV_BIENTHAN33?.installed) {

    console.info('[BIEN THAN33] Da cai; dung KVPV_BIENTHAN33.status()');

    return;

  }



  const scheduler = typeof __KVPV29 !== 'undefined' ? __KVPV29 : null;

  const C = {

    enabled: true,

    scanMs: 1000,

    requireAutoRunning: true,

    // False = click once energy is full even while in the common scene.

    // Set true to reserve transformation for battles/events only.

    combatOnly: false,

    nativeRejectCooldownMs: 3000,

    ackGraceMs: 15000,

    silent: true

  };

  const S = {

    timer: null, sent: 0, successes: 0, failed: 0,

    nativeBlocked: 0, errors: 0, lastError: '',

    lastAttempt: 0, lastResult: '', lastReason: 'initializing',

    pending: null, chargedConsumed: false, lastStatus: null,

    history: []

  };

  const now = () => Date.now();

  const numeric = v => {

    const n = Number(v); return Number.isFinite(n) ? n : NaN;

  };

  const model = () => _Ba?._s3?._ZJ?.ins;

  const rpc = () => _Ba?._s3?._Kyt?.ins;

  const maximum = () => numeric(_ft?._gY?.ins?.getCfgById?.(92001)?.[2]?.[0]);

  const full = (strength,max) => Number.isFinite(strength) && Number.isFinite(max) &&

    max > 0 && strength >= max;

  function record(event, detail = {}) {

    const item = { at: new Date().toISOString(), event, ...detail };

    S.history.push(item);

    if (S.history.length > 32) S.history.shift();

    if (!C.silent || ['sent','confirmed','rejected','error'].includes(event))

      console.info('[BIEN THAN33]', event, detail);

  }

  

  function probe() {

    const m=model(),ctrl=rpc();

    const strength=numeric(m?.curStrength),limit=maximum();

    let transforming=false;

    try { transforming=m?.isTransforming?.()===true; } catch(_){window.KVPV_V1?.diagnostics?.record(_);}

    const scene=numeric(_Ba?._$a?.SceneUtil?.curScene);

    const d=W.KVPV_DAILY?.quickState?.() ?? {};

    const autoRunning = d.running === true && W.KVPV_MAIN_SOLO?.config?.enabled !== false;

    const inCombat = _Ba?._$a?._yo?.ins?.isInMission===true ||

      _Ba?._$a?._yo?.ins?.isInArena===true ||

      (Number.isFinite(scene) && scene!==0) ||

      ['fighting','entering'].includes(String(d.step ?? ''));

    return {

      energy: strength, maxEnergy:limit,

      full:full(strength,limit), transforming,

      nativeSending:m?.sendTrans===true, nativeReady:typeof ctrl?.Transforming==='function',

      dead:_Ba?._rJ?._O$?.ins?.isDead===true,

      autoRunning, inCombat, scene, job:d.job ?? null

    };

  }

  

  function tick() {

    if (!C.enabled) {S.lastReason='disabled';return;}

    if (actor() !== EXPECTED) { S.lastReason='wrong actor';stop();return;}

    let p;

    try {p=probe();S.lastStatus=p;}

    catch(e) {S.errors++;S.lastError=String(e);S.lastReason='read error';return;}

    if (!p.full) {

      // Only a genuine new charge cycle allows another request.

      S.chargedConsumed=false;

      if (S.pending) {

        S.lastResult='energy dropped below full after request';

        record('consumed',{energy:p.energy});

        S.pending=null;

      }

      S.lastReason='charging';return;

    }

    if (p.transforming) {

      if (S.pending) {

        S.successes++;S.lastResult='server transformation observed';

        record('confirmed',{energy:p.energy});S.pending=null;

      }

      S.chargedConsumed=true;

      S.lastReason='already transforming';return;

    }

    if (S.pending) {

      if (!p.nativeSending) {

        // Allow a brief delay for the client to apply the new curShowId after TqKA.

        if (!S.pending.ackClearedAt) S.pending.ackClearedAt=now();

        if (now()-S.pending.ackClearedAt < 2500) {

          S.lastReason='ACK arrived; waiting for transformation state';return;

        }

        // Native sendTrans resets upon the TqKA response; no blind retries.

        S.failed++;S.lastResult='ACK observed but no active transformation';

        record('rejected',{energy:p.energy});S.pending=null;S.chargedConsumed=true;

        S.lastReason='server did not confirm transformation (no resend this charge)';

      } else if (now() - S.pending.at > C.ackGraceMs) {

        S.lastReason='waiting for server ACK (timed out; no resend)';

        S.chargedConsumed=true; // Block the same full charge until it falls and refills.

        S.pending=null;

        record('timeout',{energy:p.energy});

      } else S.lastReason='waiting for server ACK';

      return;

    }

    if (['THIEN_QUAN','LINH_LUNG','PHU_VAN'].includes(W.KVPV_FAR_SCOPE?.status?.()?.kind)) {S.lastReason='basic_and_ma_than_only';return;}

    if (S.chargedConsumed) {S.lastReason='already attempted during this charge';return;}

    if (!p.nativeReady) {S.lastReason='native Transforming unavailable';return;}

    if (p.nativeSending) {S.lastReason='native request already in flight';return;}

    if (p.dead) {S.lastReason='character dead';return;}

    if (C.requireAutoRunning && !p.autoRunning) {S.lastReason='auto paused';return;}

    if (C.combatOnly && !p.inCombat) {S.lastReason='not in combat';return;}

    if (now()-S.lastAttempt < C.nativeRejectCooldownMs) {

      S.lastReason='local native cooldown';return;

    }

    S.lastAttempt=now();

    try {

      // Native controller validates jump/collision/death. No premium-purchase code path.

      rpc().Transforming();

      if (model()?.sendTrans === true) {

        S.pending={at:S.lastAttempt,energy:p.energy};

        S.sent++;S.lastResult='TWeV sent';S.lastReason='waiting for server ACK';

        record('sent',{energy:p.energy,threshold:p.maxEnergy});

      } else {

        // Native refused locally (e.g. jumping); try again after local cooldown.

        S.nativeBlocked++;S.lastReason='native blocked locally; will retry safely';

      }

    } catch (e) {

      S.errors++;S.lastError=String(e);S.lastReason='native exception';

      // Native call might send before throwing: preserve the pending lock.

      if (model()?.sendTrans===true) {

        S.pending={at:S.lastAttempt,energy:p.energy};S.chargedConsumed=true;

      }

      record('error',{message:S.lastError});

    }

  }

  

  function start() {

    if (S.timer!==null) return true;

    C.enabled=true;

    S.timer = scheduler ? scheduler.every(tick,C.scanMs) : (W.KVPV_V1?.timers?.setInterval ?? W.setInterval)(tick,C.scanMs);

    if (scheduler) scheduler.tag(S.timer,'auto-transform-full-energy',25);

    tick();return true;

  }

  

  function stop() {

    C.enabled=false;

    if (S.timer!==null) {

      if (scheduler) scheduler.cancel(S.timer);else (W.KVPV_V1?.timers?.clearInterval ?? W.clearInterval)(S.timer);

      S.timer=null;

    }

    return true;

  }

  

  function status() {

    const p=probe(), out={version:'8.6.33',enabled:C.enabled,

      ...p, sent:S.sent,confirmed:S.successes,serverRejected:S.failed,

      pending:!!S.pending,chargedConsumed:S.chargedConsumed,

      reason:S.lastReason,lastResult:S.lastResult,

      scheduler:scheduler?'unified':'addon-interval',errors:S.errors,lastError:S.lastError};

    console.table([out]);return out;

  }

  W.KVPV_BIENTHAN33={installed:true,version:'8.6.33',config:C,

    status,probe,start,stop,history:()=>S.history.slice(),

    tickOnce:tick};

  start();

  console.info('[BIEN THAN33] Auto Biến Thân khi đầy khí lực (không dùng Nguyên Bảo). KVPV_BIENTHAN33.status()');

})();









((SHARED_SCHEDULER) => {

  'use strict';

  const W = window;

  const ID = window.__KVPV_OWN_ACTOR_ID;

  const getActor = () => String((typeof _Ba === 'undefined' ? null : _Ba?._rJ?._O$?.ins?.actorId) ?? '');

  if (getActor() !== ID || !W.KVPV_MAIN_SOLO?.installed || !W.KVPV_DAILY?.quickState) {

    console.warn('[HEALTH34] Chua dung acc chinh/game-frame hoac chua nap MAIN SOLO FULL');

    return;

  }

  if (W.KVPV_HEALTH34?.installed) {

    console.info('[HEALTH34] Da nap. KVPV_HEALTH34.status()');

    return;

  }

  const C = {

    enabled: true,

    scanMs: 3000,

    maxHistory: 100,

    idleQuestWarningMs: 15*60000,

    warningRepeatMs: 20*60000,

    browserThrottledRatio: 3,

    consoleWarnings: true,

    // Does not start fights, override scheduler, or bypass unconfirmed ACK.

    recoveryActions: false

  };

  const S = {

    timer: null, ticks: 0, errors: 0, lastError: '', lastAt: 0,

    lastQuestKey: null, lastQuestChange: 0, lastJobKey: null,

    lastJobChange: 0, lastView: null, lastViewChange: 0,

    transitions: 0, progressChanges: 0, completedClaimsObserved: 0,

    maxTimerGapMs: 0, sleepSuspected: 0, warnings: 0,

    lastWarningByKey: Object.create(null),

    history: [], buckets: Object.create(null)

  };

  const now = () => Date.now();

  function bucketName() {

    const visible = typeof document !== 'undefined' && document.visibilityState === 'visible';

    const focused = typeof document !== 'undefined' && typeof document.hasFocus === 'function' ? document.hasFocus() : false;

    return (visible ? 'visible' : 'hidden') + '/' + (focused ? 'FOCUS' : 'BLUR');

  }

  function record(kind, details) {

    S.history.push({at:new Date().toISOString(),kind,...(details || {})});

    if (S.history.length > C.maxHistory) S.history.splice(0,S.history.length-C.maxHistory);

  }

  function warnOnce(key,message) {

    const t=now();

    if (S.lastWarningByKey[key]!==undefined && t-S.lastWarningByKey[key]<C.warningRepeatMs) return;

    S.lastWarningByKey[key]=t;S.warnings++;

    record('warning',{key,message});

    if (C.consoleWarnings)console.warn('[HEALTH34]',message);

  }

  function rawQuest() {

    const t=(typeof _Ba==='undefined')?null:_Ba?._zIt?._FIt?.ins?.taskInfo;

    if (!Array.isArray(t) || !t.length) return {id:null, state:null, raw:null, signature:null};

    // Limited signature to avoid serializing whole game models into DevTools.

    let signature='';

    try{signature=JSON.stringify(t).slice(0,350);}catch(_){signature=String(t[0]);}

    return {id:String(t[0]),state:Number(t[1]),signature};

  }

  function capture() {

    const state=W.KVPV_DAILY?.quickState?.()||{};

    const q=rawQuest();

    return {actor:getActor(),running:state.running===true,

      job:state.job??null,step:state.step??null,

      scene:state.scene??null,quest:q,

      view:bucketName(),visibility:typeof document!=='undefined'?document.visibilityState:null,

      queueBusy:W.KVPV_UPGRADES?.busy?.()??null};

  }

  

  function tick() {

    if(!C.enabled)return;

    if(getActor()!==ID){warnOnce('actor','Sai acc; Health Monitor da dung');stop();return;}

    const t=now(),view=bucketName();

    if (S.lastAt) {

      const gap=t-S.lastAt;

      const b=S.buckets[view]||(S.buckets[view]={samples:0,sumGapMs:0,maxGapMs:0,late:0});

      b.samples++;b.sumGapMs+=gap;b.maxGapMs=Math.max(b.maxGapMs,gap);

      S.maxTimerGapMs=Math.max(S.maxTimerGapMs,gap);

      if(gap>C.scanMs*C.browserThrottledRatio){b.late++;S.sleepSuspected++;

        if(view.startsWith('hidden/'))warnOnce('hidden-throttle',

          'Tab bi an, timer co the bi Chrome/Edge lam cham. Khong gia focus/khong gui RPC bu.');

      }

    }

    S.lastAt=t;S.ticks++;

    const p=capture();

    if(p.view!==S.lastView){S.lastView=p.view;S.lastViewChange=t;record('view-change',{view:p.view});}

    const q=p.quest, id=q.id, key=(id??'-')+'|'+(q.signature??'-');

    if(S.lastQuestKey!==key){

      const changed=S.lastQuestKey!==null;

      S.lastQuestKey=key;S.lastQuestChange=t;

      if(changed){S.progressChanges++;record('quest-progress',{id,serverState:q.state});}

    }

    const jobKey=String(p.job)+'|'+String(p.step)+'|'+String(p.scene);

    if(S.lastJobKey!==jobKey){

      if(S.lastJobKey!==null){S.transitions++;record('job-change',{job:p.job,step:p.step,scene:p.scene});}

      S.lastJobKey=jobKey;S.lastJobChange=t;

    }

    if(p.running && p.job==='rảnh' && id && q.state!==2 &&

      t-S.lastQuestChange>=C.idleQuestWarningMs) {

      warnOnce('quest-idle:'+id,`Nhiem vu ${id} chua tien trien khi auto dang ranh; kiem tra EXP / executor / luot phu ban. Khong tu gui lai RPC.`);

    }

  }

  

  function start() {

    if(S.timer!==null)return true;

    C.enabled=true;

    S.lastAt=0;

    S.timer=SHARED_SCHEDULER ? SHARED_SCHEDULER.every(safeTick,C.scanMs) : (W.KVPV_V1?.timers?.setInterval ?? W.setInterval)(safeTick,C.scanMs);

    if(SHARED_SCHEDULER)SHARED_SCHEDULER.tag(S.timer,'health34-low-noise-monitor',75);

    safeTick();return true;

  }

  

  function stop() {

    C.enabled=false;

    if(S.timer!==null){

      if(SHARED_SCHEDULER)SHARED_SCHEDULER.cancel(S.timer);else (W.KVPV_V1?.timers?.clearInterval ?? W.clearInterval)(S.timer);

      S.timer=null;

    }

    return true;

  }

  function safeTick() {

    try{tick();}catch(e){S.errors++;S.lastError=String(e);record('error',{message:S.lastError});}

  }

  function stats(){

    return Object.fromEntries(Object.entries(S.buckets).map(([k,b])=>[k,{

      samples:b.samples,avgGapMs:b.samples?Math.round(b.sumGapMs/b.samples):null,

      maxGapMs:b.maxGapMs,late:b.late

    }]));

  }

  

  function report(){

    const current=capture();

    return {version:'8.6.34',generatedAt:new Date().toISOString(),actor:getActor(),

      current,monitor:{enabled:C.enabled,scheduler:SHARED_SCHEDULER?'unified':'standalone-interval',

      ticks:S.ticks,jobTransitions:S.transitions,questProgressChanges:S.progressChanges,

      lastQuestChangeAt:S.lastQuestChange?new Date(S.lastQuestChange).toISOString():null,

      lastJobChangeAt:S.lastJobChange?new Date(S.lastJobChange).toISOString():null,

      maxTimerGapMs:S.maxTimerGapMs,suspectedThrottleGaps:S.sleepSuspected,

      warnings:S.warnings,errors:S.errors,lastError:S.lastError},

      timerByVisibility:stats(),

      schedulerWakeByVisibility:W.KVPV_UNIFIED29?.status?.(false)?.wakeByVisibility??null,

      scheduler:W.KVPV_UNIFIED29?.status?.(false)??null,

      main:W.KVPV_MAIN_SOLO?.status?.(false)??null,

      events:W.KVPV_EVENTS25?.status?.(false)??null,

      recentHistory:S.history.slice(-50),

      note:'Read-only telemetry. Hidden tab timer throttling cannot be bypassed by game JavaScript.'};

  }

  

  function status(print=true){

    const r=report();

    if(print){

      console.table([r.monitor]);

      console.table(Object.entries(r.timerByVisibility).map(([state,v])=>({state,...v})));

    }

    return r;

  }

  

  function exportReport(){

    const json=JSON.stringify(report(),null,2);

    if(typeof Blob==='undefined'||typeof document==='undefined'||typeof URL==='undefined'||typeof URL.createObjectURL!=='function')return json;

    const url=URL.createObjectURL(new Blob([json],{type:'application/json;charset=utf-8'}));

    const a=document.createElement('a');

    try{

      a.href=url;a.download='KVPV_HEALTH34_'+new Date().toISOString().slice(0,10)+'.json';

      (document.body||document.documentElement).appendChild(a);a.click();a.remove();

    }finally{(W.KVPV_V1?.timers?.setTimeout ?? W.setTimeout)(()=>URL.revokeObjectURL(url),5000);}

    return a.download;

  }

  W.KVPV_HEALTH34={installed:true,version:'8.6.34',config:C,

    start,stop,status,report,exportReport,history:()=>S.history.slice(),sampleOnce:safeTick};

  start();

  console.info('[HEALTH34] Giam sat Auto Daily + focus/blur voi log gon. Dung KVPV_HEALTH34.status()');

})(typeof __KVPV29!=='undefined' ? __KVPV29 : null);



})();



/* KVPV MAIN SOLO V8.6.32 - BOSS MA THAN (scene 55, map 2711)
 * Verified client 17,606,388 bytes: _ft._xUt.ins.getBossFloorInfo(floor,difficulty),
 * _Ba._Dvt._Hvt.ins.challengePhyStren; native _Ba._sst._Cht.inst.rqEtScene(2711,level,[],line).
 * Zero clone, zero premium, no item-use, no auto refill with Ma Tuy Don.
 * An actual server-game run is required to validate end-to-end behavior.
 */

 

(() => {

 'use strict';

 const W=window, ID=window.__KVPV_OWN_ACTOR_ID;

 const V=W.KVPV_V8,D=W.KVPV_DAILY,U=W.KVPV_UPGRADES;

 const actor=()=>String(_Ba?._rJ?._O$?.ins?.actorId??'');

 if(typeof _Ba==='undefined'||typeof _ft==='undefined'||actor()!==ID||

    !V?.register||!V?.toggle||!D?.quickState){

   console.error('[MA THAN32] Sai acc/frame hoac thieu MAIN SOLO FULL');return;

 }

 if(W.KVPV_MATHAN32?.installed){console.info('[MA THAN32] Da cai');return;}

 const C={enabled:true,autoEnter:true,maxRequestsPerDay:3, requireCommonScene:true,diagnosticLog:false};

 const S={day:'',todaySent:0,sent:0,confirmedEnter:0,confirmedReturn:0,errors:0,

   lastError:'',pending:null,haltReason:'',history:[],lastInfo:null,lastRefresh:0};

 const stamp=()=>W.KVPV_DAILY_CLOCK?.key?.()??new Date(Date.now()+2*3600000).toISOString().slice(0,10);

 const npc=()=>_Ba?._Dvt?._Hvt?.ins;

 const cfg=()=>_ft?._xUt?.ins;

 const team=()=>_Ba?._MT?.the_secret_of_the_stars?._Gvt?.instance;

 const blood=()=>_Ba?._u3?._YQ?.ins;

 const scene=()=>Number(_Ba?._$a?.SceneUtil?.curScene);

 const into=()=>_Ba?._$a?._yo?.ins?.intoSce;

 const q=()=>D?.quickState?.()||{};

 const number=v=>{const n=Number(v);return Number.isFinite(n)?n:NaN;};

 const positive=v=>Number.isSafeInteger(number(v))&&number(v)>0;

 const note=(kind,data)=>{

   const x={at:new Date().toISOString(),kind,...(data||{})};

   S.history.push(x);if(S.history.length>60)S.history.shift();

   if(C.diagnosticLog)console.info('[MA THAN32]',x);

 };

 function newDay(){const d=stamp();if(d!==S.day){S.day=d;S.todaySent=0;

   // Old pending may be unresolved. Never auto-resend it on a new day.

   if(S.pending){S.haltReason='Unconfirmed previous request; manual verification required';}

 }}

 function state(){

   newDay();

   const m=npc(),f=cfg(),t=team(),s=scene(),current=into();

   const challenge=number(m?.challengePhyStren);

   const floor=number(m?.curFloor), difficulty=number(m?.curDif);

   const row=(positive(floor)&&[1,2,3].includes(difficulty))?f?.getBossFloorInfo?.(floor,difficulty):null;

   const level=number(row?.[1]);

   const need=positive(level)?number(f?.getCopyInfo?.(2711,level)?.[2]):NaN;

   const bloodFloor=number(f?.getBloodFloor?.(blood()?.bloodLineage));

   const lines=positive(level)?t?.getLineInfos?.(2711,level):null;

   const options=[];

   if(Array.isArray(lines))for(const x of lines){

     const line=number(x?.[0]),state=number(x?.[1]);

     if(!Number.isSafeInteger(line)||line<0||state===2)continue;

     const allowed=typeof m?.checkLineRp==='function'?m.checkLineRp(2711,level,line,true):false;

     if(allowed)options.push({line,occupancy:number(x?.[2])});

   }

   const chosen=options.sort((a,b)=>(b.occupancy||0)-(a.occupancy||0))[0];

   const active=(s===55&&number(current?.[0])===2711)||s===55;

   const busy=!!(U?.busy?.()||q().job!=='rảnh'||

     _Ba?._$a?._yo?.ins?.isInMission===true);

   const check={challenge,floor,difficulty,level,need,bloodFloor,

     channel:chosen?.line??null,channels:options.length,scene:s,active,

     serverMap:number(current?.[0]),job:q().job,queueBusy:busy,

     currentTeamCount:number(t?.getTNum?.()),

     pending:!!S.pending,haltReason:S.haltReason};

   S.lastInfo=check;

   return check;

 }

 function settle(p){

   if(!S.pending)return;

   const was=S.pending;

   if(p.active){

     if(!was.entered){was.entered=true;S.confirmedEnter++;

       note('enter-confirmed',{level:was.level,line:was.line});}

     return;

   }

   if(was.entered && p.scene===0){

     // Exit alone is not proof a challenge was spent. Only server challenge change is.

     if(Number.isFinite(p.challenge) && p.challenge<was.challenge){

       S.confirmedReturn++;note('exit-and-challenge-spent',{level:was.level});S.pending=null;

       S.haltReason='';

     }else{

       S.haltReason='Returned from boss without challenge decrease: verify server before retry';

     }

   }else if(!was.entered && Number.isFinite(p.challenge) && p.challenge<was.challenge){

     S.confirmedReturn++;S.pending=null;S.haltReason='';

     note('server-challenge-spent',{level:was.level});

   }else if(!was.entered && Date.now()-was.at>90000){

     S.haltReason='Entry ACK timeout (90s): no automatic retry';

   }

 }

 function plan(){

   const p=state();settle(p);

   let reason='ready';

   const m=npc(),f=cfg();

   if(!C.enabled||!C.autoEnter)reason='disabled';

   else if(S.pending)reason=S.haltReason||'pending server ACK';

   else if(S.haltReason)reason=S.haltReason;

   else if(S.todaySent>=C.maxRequestsPerDay)reason='daily safety request cap';

   else if(p.active)reason='already in Ma Than BOSS';

   else if(C.requireCommonScene&&(p.scene!==0||!_Ba?._$a?.SceneUtil?.isCommonScene))reason='not common scene';

   else if(p.queueBusy)reason='another module or queue running';

   else if(!Number.isFinite(p.challenge)||p.challenge<1)reason='no free challenge stamina';

   else if(!positive(p.floor)||![1,2,3].includes(p.difficulty)||!positive(p.level))reason='floor/difficulty not available from server';

   else if(!Number.isFinite(p.bloodFloor)||!Number.isFinite(p.need)||p.bloodFloor<p.need-1)reason='bloodline level insufficient';

   else if(typeof m?.checkLineRp!=='function'||typeof f?.getBossFloorInfo!=='function')reason='missing verified game model';

   else if(p.channel===null)reason='no live/open eligible boss channel';

   else if(typeof _Ba?._sst?._Cht?.inst?.rqEtScene!=='function')reason='native scene RPC missing';

   const ready=reason==='ready';

   // Must change on server ACK (scene, stamina, floor) for shared queue to recognize success.

   const signature=JSON.stringify([p.scene,p.serverMap,p.challenge,p.floor,p.difficulty,p.level,p.channel]);

   return {ready,reason,signature,challenge:p.challenge,level:p.level,

     difficulty:p.difficulty,floor:p.floor,line:p.channel,scene:p.scene};

 }

 const PLUGIN='v8632_boss_ma_than';

 

 function probe(){return plan();}

 function run(old){

   // U.busy is true while the same shared queue provider is executing us.

   // Revalidate all other conditions without rejecting our own queue ownership.

   const p=state();settle(p);

   if(S.pending||S.haltReason||!C.enabled||!C.autoEnter||

     p.scene!==0||!_Ba?._$a?.SceneUtil?.isCommonScene||

     q().job!=='rảnh'||_Ba?._$a?._yo?.ins?.isInMission===true||

     !positive(p.challenge)||!positive(p.level)||

     p.challenge!==old.challenge||p.level!==old.level||p.channel!==old.line||

     p.floor!==old.floor||p.difficulty!==old.difficulty||

     p.bloodFloor<p.need-1||S.todaySent>=C.maxRequestsPerDay)

     throw Error('Ma Than server state changed or unsafe to enter');

   const rpc=_Ba?._sst?._Cht?.inst?.rqEtScene;

   if(typeof rpc!=='function')throw Error('No native rqEtScene');

   // Lock BEFORE sending: requests may leave even if native method throws.

   S.pending={at:Date.now(),level:p.level,line:p.channel,challenge:p.challenge,entered:false};

   S.todaySent++;S.sent++;S.haltReason='';

   note('request',{map:2711,level:p.level,line:p.channel});

   _Ba._sst._Cht.inst.rqEtScene(2711,p.level,[],p.channel);

 }

 try{V.register({id:PLUGIN,name:'BOSS Ma Than (free stamina, scene55)',kind:'work',

   verified:true,enabled:true,spend:'none',background:false,redIds:[],

   hourlyLimit:2,cooldownMs:120000,probe,run});}

 catch(e){console.error('[MA THAN32] Cannot register executor',e);return;}

 const api={installed:true,version:'8.6.32',config:C,

   start(){C.enabled=true;C.autoEnter=true;V.toggle(PLUGIN,true);return plan();},

   stop(){C.autoEnter=false;V.toggle(PLUGIN,false);return true;},

   status(){const p=plan(),out={...p,actor:actor(),todaySent:S.todaySent,

     sent:S.sent,confirmedEnter:S.confirmedEnter,confirmedReturn:S.confirmedReturn,

     pending:S.pending?{...S.pending}:null,haltReason:S.haltReason};

     console.table([out]);return out;},

   plan,history:()=>S.history.slice(),

   diagnostics(){return {plan:plan(),snapshot:S.lastInfo,history:S.history.slice(-12)};},

   refresh(){

     const p=state(),r=_Ba?._Dvt?._Hon?.ins;

     if(p.scene!==0||p.queueBusy||S.pending)return {ok:false,reason:'busy/inside/pending'};

     if(Date.now()-S.lastRefresh<120000)return {ok:false,reason:'refresh cooldown 120s'};

     if(typeof r?.getStrengthInfo!=='function'||

       typeof r?.c2sGetBranchAndBossInfo!=='function'||

       typeof r?.GetEnterLvInfo!=='function')return {ok:false,reason:'missing read-only model RPC'};

     S.lastRefresh=Date.now();

     r.getStrengthInfo();r.c2sGetBranchAndBossInfo();r.GetEnterLvInfo();

     note('request-readonly-refresh');

     return {ok:true,reason:'requested refreshed server boss data; wait a few seconds'};

   },

   // Diagnostic-only unlock, never automatically clear a pending or unknown server result.

   clearAfterManualVerification(){

     if(S.pending)throw Error('Still pending: do not clear without verified server result');

     S.haltReason='';return plan();

   }};

 W.KVPV_MATHAN32=api;

 console.info('[MA THAN32] Executor registered via shared queue; KVPV_MATHAN32.status()');

})();










 

(() => {

  'use strict';

  const W=window, V=W.KVPV_V8, D=W.KVPV_DAILY;

  if(W.KVPV_GEAR36?.installed){console.info('[GEAR36] Already loaded');return;}

  if(!V?.register||!V?.toggle||!D?.quickState||!W.__KVPV_OWN_ACTOR_ID || typeof _Ba==='undefined'||typeof _et==='undefined'){

    console.warn('[GEAR36] FULL V8.6.36/game-frame not ready');return;

  }

  const bound=W.__KVPV_OWN_ACTOR_ID;

  const C={enabled:true,autoTry:true,maxTrialsPerStage:3,maxScoreDropPercent:25,

    minScoreDropPercent:1,tryOnlyNormalGear:true,pollMs:1200,

    ackWarnMs:25000,holdMaxMs:75000,minRetryAfterChangeMs:2500,

    allowedParts:[1,2,3,4,5,6,7,8],protectedUids:[],protectedItemIds:[]};

  const S={stage:null,attempts:0,tried:new Set(),base:null,activePart:0,

    desired:null,pending:null,hold:false,holdStarted:0,disabledBest:false,

    hadBestEnabled:false, successes:0,losses:0,sent:0,acked:0,errors:0,

    haltReason:'',lastResult:null,logs:[],timer:null};

  const now=()=>Date.now();

  const actor=()=>String(_Ba?._rJ?._O$?.ins?.actorId??'');

  const safe=()=>actor()===bound && !W.__KVPV_UNIVERSAL_HALTED;

  const common=()=>_Ba?._$a?.SceneUtil?.isCommonScene===true;

  const bag=()=>_Ba?._Ic?._aQ?.ins;

  const worn=p=>_Ba?._rJ?._O$?.ins?.getEupByPart?.(p);

  const rpc=()=>_Ba?._Ic?._oJ?.instance;

  const uid=x=>Number.isSafeInteger(Number(x))&&Number(x)>0?Number(x):0;

  const score=x=>Number(x?.[3]?.[7]);

  const note=(event,data={})=>{

    S.logs.push({at:new Date().toISOString(),event,...data});

    if(S.logs.length>65)S.logs.shift();

    if(['sent','ack','stage-win','halt','begin','rollback'].includes(event))

      console.info('[GEAR36]',event,data);

  };

  function hasItem(u){

    return !!(u&&bag()?.getItemsByBagType?.(1)?.some(x=>uid(x?.[2])===u));

  }

  function wornUid(p){return uid(worn(p)?.[2]);}

  function signature(p){return JSON.stringify([p,wornUid(p)]);}

  function inventory(){

    const b=bag();return b?.isBagInited===true?b.getItemsByBagType?.(1):null;

  }

  function acceptable(x,p){

    if(!Array.isArray(x)||uid(x[2])===0||!uid(x[0])||!Number.isFinite(score(x))||score(x)<=0)return false;

    if(!C.allowedParts.includes(p)||C.protectedUids.includes(uid(x[2]))||C.protectedItemIds.includes(uid(x[0])))return false;

    try{

      if(Number(_et._cY(x[0]))!==p)return false;

      const cfg=_et.getCfgById(x[0]);

      const m=_Ba?._rJ?._O$?.ins;

      if(!Array.isArray(cfg)||!m||Number(m.eraLevel)<Number(cfg[4])||Number(m.level)<Number(cfg[5]))return false;

    }catch(_){return false;}

    return true;

  }

  function candidates(part=0){

    const inv=inventory();if(!Array.isArray(inv))return [];

    const slots=part?[part]:C.allowedParts;

    const rows=[];

    for(const p of slots){

      const a=worn(p),baseScore=score(a);

      if(!a||!uid(a[2])||!Number.isFinite(baseScore)||baseScore<=0)continue;

      for(const item of inv){

        if(!acceptable(item,p)||uid(item[2])===uid(a[2])||S.tried.has(uid(item[2])))continue;

        const ratio=100*(baseScore-score(item))/baseScore;

        if(ratio<C.minScoreDropPercent||ratio>C.maxScoreDropPercent)continue;

        rows.push({part:p,uid:uid(item[2]),itemId:uid(item[0]),

          currentUid:uid(a[2]),currentScore:baseScore,candidateScore:score(item),

          scoreDrop:Math.round(ratio*100)/100});

      }

    }

    // Try the smallest loss first. Rotate slots across new stages, not while

    // comparing one stage (so a trial only varies a single item slot).

    return rows.sort((a,b)=>a.scoreDrop-b.scoreDrop||a.part-b.part||a.uid-b.uid);

  }

  function isActive(){return !!S.hold||!!S.desired||!!S.pending;}

  function hold(on){

    S.hold=!!on;

    if(on&&!S.holdStarted)S.holdStarted=now();

    if(!on)S.holdStarted=0;

  }

  function stopBest(){

    if(S.disabledBest)return;

    const p=V.report?.()?.plugins?.find(p=>p.id==='autoWearNormal');

    S.hadBestEnabled=p?.enabled===true;

    if(S.hadBestEnabled){V.toggle('autoWearNormal',false);S.disabledBest=true;note('pause-best');}

  }

  function restoreBest(){

    if(S.disabledBest&&S.hadBestEnabled){

      try{V.toggle('autoWearNormal',true);}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

    }

    S.disabledBest=false;S.hadBestEnabled=false;

  }

  function newStage(level){

    S.stage=level;S.attempts=0;S.tried.clear();S.base=null;S.activePart=0;

    S.desired=null;S.pending=null;S.haltReason='';hold(false);

  }

  function enqueue(item,reason){

    if(!item||!safe()||!common()||S.pending||S.desired)return false;

    S.desired={...item,currentUid:item.currentUid??wornUid(item.part),reason,at:now()};hold(true);

    note('begin',{level:S.stage,part:item.part,scoreDrop:item.scoreDrop,reason});

    return true;

  }

  function abandon(reason,preserveHold=false){

    S.desired=null;S.pending=null;

    S.haltReason=reason;S.errors++;

    hold(preserveHold);

    note('halt',{reason});

  }

  function onStageResult(evt){

    if(!C.enabled||!safe()||!evt)return false;

    const stage=Number(evt.level);

    if(evt.outcome==='win'){

      S.successes++;S.lastResult={outcome:'win',stage,to:evt.to,at:now()};

      if(S.stage===stage && S.attempts>0){

        S.pending=null;S.desired=null;hold(false);

        // Keep winning configuration, so old best-gear plugin stays off.

        note('stage-win',{stage,attempts:S.attempts,retainedWeakerGear:true});

      }

      newStage(Number(evt.to));

      return true;

    }

    if(evt.outcome!=='lose'||evt.reject===true||!Number.isSafeInteger(stage)||stage<0)return false;

    S.losses++;S.lastResult={outcome:'lose',stage,at:now()};

    if(!common())return false;

    if(S.stage!==stage)newStage(stage);

    if(S.haltReason||S.pending||S.desired)return false;

    if(S.attempts>=C.maxTrialsPerStage){

      if(S.activePart&&S.base&&wornUid(S.activePart)!==S.base.uid&&hasItem(S.base.uid)){

        return enqueue({...S.base,part:S.activePart},'rollback-after-trials');

      }

      restoreBest();note('exhausted',{stage,trials:S.attempts});return false;

    }

    let picks=candidates(S.activePart);

    if(!picks.length&&S.activePart===0)picks=candidates();

    const choice=picks[0];

    if(!choice){

      if(S.base&&S.activePart&&wornUid(S.activePart)!==S.base.uid&&hasItem(S.base.uid)){

        return enqueue({...S.base,part:S.activePart},'rollback-no-alternatives');

      }

      restoreBest();note('no-candidate',{stage});return false;

    }

    stopBest();

    if(!S.base){S.activePart=choice.part;S.base={uid:choice.currentUid,

      part:choice.part,itemId:uid(worn(choice.part)?.[0]),score:choice.currentScore};}

    S.tried.add(choice.uid);

    S.attempts++;

    return enqueue(choice,'trial-after-confirmed-loss');

  }

  const PLUGIN='v8636_adaptive_gear';

  

  function probe(){

    const d=S.desired,ctx=D.quickState?.();

    if(!C.enabled||!C.autoTry||!d||!safe()||!common()||

      ctx?.job!=='rảnh'||!ctx?.running||

      _Ba?._$a?._yo?.ins?.isInMission===true)return {ready:false,signature:'idle'};

    const curr=wornUid(d.part);

    const stillInBag=hasItem(d.uid),stillWorn=curr===d.currentUid;

    return {ready:stillInBag&&stillWorn&&typeof rpc()?.c2sWearEquip==='function',

      signature:signature(d.part),item:{...d}};

  }

  function run(old){

    // The shared queue owns this job; never reject only because busy() is true.

    const d=S.desired,p=old.item;

    if(!d||!p||d.uid!==p.uid||d.part!==p.part||!safe()||!common()||

      D.quickState?.()?.job!=='rảnh'||wornUid(d.part)!==p.currentUid||

      !hasItem(d.uid)||typeof rpc()?.c2sWearEquip!=='function')

      throw Error('Equipment changed or no longer safe to wear');

    S.pending={...d,sentAt:now()};S.desired=null;S.sent++;

    note('sent',{stage:S.stage,part:d.part,uid:d.uid,reason:d.reason});

    rpc().c2sWearEquip(d.uid);

  }

  try{V.register({id:PLUGIN,name:'Adaptive weaker gear after Tu Vuot loss',kind:'work',

    verified:true,enabled:true,spend:'none',background:false,

    hourlyLimit:12,cooldownMs:2500,redIds:[],probe,run});}

  catch(e){console.warn('[GEAR36] Registration unavailable',e);return;}

  

  function watch(){

    if(!safe())return;

    if(S.pending){

      const p=S.pending;

      if(wornUid(p.part)===p.uid){

        S.pending=null;S.acked++;

        hold(false);S.haltReason='';

        note('ack',{part:p.part,uid:p.uid,reason:p.reason});

        if(p.reason.startsWith('rollback'))restoreBest();

      }else if(now()-p.sentAt>C.ackWarnMs){

        // Unknown wear result: NEVER resubmit and NEVER resume auto stages

        // unless the user explicitly verifies equipment state.

        abandon('Wear RPC has no confirmed inventory/slot ACK',true);

      }

    }

    if(S.desired&&now()-S.desired.at>C.holdMaxMs){

      abandon('Gear trial could not acquire shared queue',false);restoreBest();

    }

    if(S.hold&&S.holdStarted&&now()-S.holdStarted>Math.max(C.holdMaxMs,90000)

      &&!S.pending&&!S.desired){

      // Hold after unconfirmed RPC intentionally stays until manual review.

      if(!S.haltReason)hold(false);

    }

  }

  const shared=(typeof __KVPV29!=='undefined' && typeof __KVPV29.every==='function')?__KVPV29:null;

  S.timer=shared?shared.every(watch,C.pollMs):(W.KVPV_V1?.timers?.setInterval ?? W.setInterval)(watch,C.pollMs);

  if(shared)shared.tag(S.timer,'adaptive-gear-ack',18);

  

  function status(show=true){

    const ctx=D.quickState?.();const out={version:'8.6.36',enabled:C.enabled,

      actor:actor(),stage:S.stage,trials:S.attempts,maxTrials:C.maxTrialsPerStage,

      currentPart:S.activePart,currentUid:S.activePart?wornUid(S.activePart):null,

      baseUid:S.base?.uid||null,trialCandidate:S.desired?.uid||null,

      pendingUid:S.pending?.uid||null,stageHeld:isActive(),losses:S.losses,

      wins:S.successes,sent:S.sent,acks:S.acked,bestAutoDisabled:S.disabledBest,

      last:S.lastResult,halt:S.haltReason,scene:ctx?.scene};

    if(show)console.table([out]);return out;

  }

  const api={installed:true,version:'8.6.36',config:C,status,

    blocking:()=>isActive(),

    onStageResult,

    candidates:()=>{const x=candidates(S.activePart);console.table(x);return x;},

    history:()=>S.logs.slice(),

    restoreBaseline(){

      if(!safe()||!common()||S.pending||S.desired||!S.base||!hasItem(S.base.uid))

        return {ok:false,reason:'Cannot safely request restore'};

      if(wornUid(S.base.part)===S.base.uid){restoreBest();return {ok:true,already:true};}

      const item={...S.base,currentUid:wornUid(S.base.part)};

      return {ok:enqueue(item,'rollback-manual')};

    },

    manualResolve(verified=false){

      if(verified!==true||S.pending||S.desired)return {ok:false,reason:'Verify equipped gear in game first, then manualResolve(true)'};

      S.haltReason='';hold(false);return {ok:true};

    },

    stop(){C.enabled=false;C.autoTry=false;S.desired=null;

      // Do not silently lift hold after unconfirmed RPC or turn off protection.

      if(!S.pending&&!S.haltReason){hold(false);restoreBest();}

      V.toggle(PLUGIN,false);return status(false);},

    start(){C.enabled=true;C.autoTry=true;V.toggle(PLUGIN,true);return status(false);}

  };

  W.KVPV_GEAR36=api;

  console.info('[GEAR36] Adaptive equipment experiment ready: KVPV_GEAR36.status()');

})();



/* V8.6.35 multi-user status: no new game action, no new timer. */

 

(() => {

  'use strict';

  const W=window;

  const who=()=>typeof _Ba==='undefined'?'':String(_Ba?._rJ?._O$?.ins?.actorId??'');

  if(!W.KVPV_MAIN_SOLO?.installed || !W.__KVPV_OWN_ACTOR_ID || who()!==W.__KVPV_OWN_ACTOR_ID){

    console.warn('[UNIVERSAL35] Chưa khởi tạo FULL; kiểm tra game-frame và trạng thái nhân vật.');

    return;

  }

  const status=(show=true)=>{

    const id=who(), bound=W.__KVPV_OWN_ACTOR_ID;

    const main=W.KVPV_MAIN_SOLO?.status?.(false)||{};

    const sched=W.KVPV_UNIFIED29?.status?.(false)||{};

    const out={version:'8.6.35',userIndependent:true,actor:id,

      sessionLockedToActor:bound,actorMatchesSession:id===bound,

      halted:!!W.__KVPV_UNIVERSAL_HALTED,

      fullLoaded:!!W.KVPV_MAIN_SOLO?.installed,autoRunning:main.running??false,

      job:main.job??'-',scene:main.scene??null,quest:main.quest?.id??null,

      schedulerTasks:sched.scheduledModuleLoops??sched.activeTimers??null,

      schedulerErrors:sched.schedulerErrors??sched.callbackErrors??null,

      publicExpMatchingApproved:W.KVPV_MAIN_SOLO?.config?.allowSoloPublicExp===true,

      clone4Disabled:W.KVPV_DAILY?.config?.enableExp===false,

      crystal4Disabled:W.KVPV_DAILY?.config?.enableCrystal===false,

      premiumExplicitlyDisabled:W.KVPV_EVENTS25?.config?.allowPremium===false,

      modules:{transform:!!W.KVPV_BIENTHAN33?.installed,

        demonBoss:!!W.KVPV_MATHAN32?.installed,health:!!W.KVPV_HEALTH34?.installed,

        events13:!!W.KVPV_EVENTS13,quests:!!W.KVPV_V876}};

    if(show)console.table([out]);

    return out;

  };

  W.KVPV_UNIVERSAL35=Object.freeze({

    installed:true,version:'8.6.35',status,

    stop:()=>W.KVPV_MAIN_SOLO?.pause?.(),

    resume:()=>{

      if(who()!==W.__KVPV_OWN_ACTOR_ID||W.__KVPV_UNIVERSAL_HALTED)

        throw Error('Nhân vật đã đổi: F5 rồi chạy lại Snippet');

      return W.KVPV_MAIN_SOLO?.resume?.();

    },

    diagnostics:()=>({universal:status(false),main:W.KVPV_MAIN_SOLO?.diagnostics?.(),

      sched:W.KVPV_UNIFIED29?.status?.(false)}),

    exportReport:()=>W.KVPV_UNIFIED29?.exportReport?.()

  });

  console.info('[KVPV UNIVERSAL35] Snippet FULL đã sẵn sàng. Dùng KVPV_UNIVERSAL35.status()');

})();



/* V8.6.36 command facade; compatibility with UNIVERSAL35 preserved. */

 

(() => {

  'use strict';

  const W=window;

  if(!W.KVPV_UNIVERSAL35?.installed||!W.KVPV_GEAR36?.installed)return;

  const gear=W.KVPV_GEAR36,old=W.KVPV_UNIVERSAL35;

  W.KVPV_UNIVERSAL36=Object.freeze({

    installed:true,version:'8.6.36',

    status(show=true){const data={version:'8.6.36',universal:old.status(false),gear:gear.status(false)};

      if(show){console.table([data.universal]);console.table([data.gear]);}

      return data;},

    diagnostics(){return {full:old.diagnostics(),adaptive:gear.status(false),history:gear.history()};},

    gear:gear,

    stop:()=>old.stop(),resume:()=>old.resume(),

    exportReport(){

      const data=JSON.stringify({generatedAt:new Date().toISOString(),

        version:'8.6.36',universal:old.status(false),gear:gear.status(false),

        gearHistory:gear.history()},null,2);

      if(typeof Blob==='undefined'||!document?.createElement||!W.URL?.createObjectURL)return data;

      const url=W.URL.createObjectURL(new Blob([data],{type:'application/json'}));

      const a=document.createElement('a');

      a.href=url;a.download='KVPV_GEAR36_REPORT_'+new Date().toISOString().slice(0,10)+'.json';

      try{document.body.appendChild(a);a.click();a.remove();}

      finally{(W.KVPV_V1?.timers?.setTimeout ?? W.setTimeout)(()=>W.URL.revokeObjectURL(url),12000);}

      return a.download;

    }

  });

  console.info('[KVPV UNIVERSAL36] FULL Snippet ready. Use KVPV_UNIVERSAL36.status()');

})();












 

(() => {

  'use strict';

  const W=window;

  if(W.KVPV_TIANKIEP45?.installed){console.info('[TIANKIEP45] Da nap roi');return;}

  const TRACK=['challenge','_O_t','_W_t','_Y_t'];

  const TAG={challenge:'challenge',_O_t:'TXUH',_W_t:'TqVF',_Y_t:'TWTH'};

  const state={hooked:false,proto:null,wrappers:new Map(),records:[],attempts:0,retryTimer:null,

    actorAtInstall:'',lastReason:'',challengeCalls:0,ackEvents:0,errors:0};

  const limit=(x)=>{state.records.push(x);if(state.records.length>50)state.records.shift();};

  function actor(){

    try{return String(_Ba?._rJ?._O$?.ins?.actorId??'');}catch(_){return '';}

  }

  function authorized(){

    const now=actor(), base=W.__KVPV_OWN_ACTOR_ID;

    return !!now && now!=='0' && (!state.actorAtInstall || now===state.actorAtInstall)

      && (base==null || String(base)===now) && !W.__KVPV_UNIVERSAL_HALTED;

  }

  function manager(){try{return _Ba?._Co?._Dit?.ins??null;}catch(_){return null;}}

  function model(){try{return _Ba?._Co?._Mo?.ins??null;}catch(_){return null;}}

  function cfg(){

    try{const m=model();return m&&_ft?._h$?.ins?.getCfgByLv?.(m.curLv)||null;}catch(_){return null;}

  }

  

  function snapshot(){

    const m=model(),c=cfg();

    return {level:Number(m?.curLv??0),passed:Math.max(0,Number(m?.curLv??0)-1),

      wave:m?.curWare??null,nativeAuto:m?.auto??null,mapId:Array.isArray(c)?c[0]:null,

      requiredWave:Array.isArray(c)?c[2]:null,account:actor()};

  }

  function event(method,argv){

    const data={at:new Date().toISOString(),type:TAG[method],...snapshot()};

    if(method==='challenge')data.requestedMapId=argv[0];

    limit(data);

    if(method==='challenge')state.challengeCalls++;

    else state.ackEvents++;

  }

  function install(){

    if(state.hooked&&TRACK.every(k=>state.proto?.[k]===state.wrappers.get(k)?.wrapped))return true;

    if(state.hooked){state.lastReason='Hook bi thay doi boi script khac';return false;}

    state.attempts++;

    const klass=(typeof _Ba!=='undefined')?_Ba?._Co?._Dit:null;

    const proto=klass?.prototype;

    if(!proto || TRACK.some(k=>typeof proto[k]!=='function')){

      state.lastReason='Chua thay _Ba._Co._Dit.prototype.challenge / reply handlers';return false;

    }

    if(!actor()||actor()==='0'){

      state.lastReason='Chua doc duoc ID nhan vat; can dung game-frame';return false;

    }

    for(const key of TRACK){

      const desc=Object.getOwnPropertyDescriptor(proto,key);

      if(!desc||!desc.configurable||typeof desc.value!=='function'){

        state.lastReason='Khong the hook an toan '+key;return false;

      }

    }

    const patched=[];

    try{

      for(const key of TRACK){

        const desc=Object.getOwnPropertyDescriptor(proto,key);

        const original=desc.value;

        function wrapped(...args){

          if(!authorized())return original.apply(this,args);

          // Log ONLY after the original handler has executed successfully.

          let result;

          try{result=original.apply(this,args);}

          catch(e){state.errors++;throw e;}

          try{event(key,args);}catch(e){state.errors++;}

          return result;

        }

        Object.defineProperty(proto,key,{...desc,value:wrapped});

        patched.push([key,desc,wrapped]);

      }

    }catch(e){

      for(const [key,desc,wrapped] of patched.reverse()){

        if(proto[key]===wrapped)Object.defineProperty(proto,key,desc);

      }

      state.lastReason='Gan hook loi: '+String(e);state.errors++;return false;

    }

    for(const [key,desc,wrapped] of patched)state.wrappers.set(key,{desc,wrapped});

    state.proto=proto;state.actorAtInstall=actor();state.hooked=true;

    state.lastReason='Hook thuc da gan: '+TRACK.join(', ');

    if(state.retryTimer){clearTimeout(state.retryTimer);state.retryTimer=null;}

    console.info('[TIANKIEP45] HOOKED TRUE: challenge + TXUH/TqVF/TWTH. Server khong bi thay doi.');

    return true;

  }

  function retry(){

    if(state.hooked||state.retryTimer||state.attempts>=10)return;

    state.retryTimer=setTimeout(()=>{state.retryTimer=null;if(!install())retry();},4000);

  }

  

  function start(){const ok=install();if(!ok)retry();return ok;}

  

  function stop(){

    if(state.retryTimer){clearTimeout(state.retryTimer);state.retryTimer=null;}

    if(state.proto){

      for(const [key,{desc,wrapped}] of state.wrappers){

        if(state.proto[key]===wrapped){

          try{Object.defineProperty(state.proto,key,desc);}catch(e){state.errors++;}

        }

      }

    }

    state.wrappers.clear();state.hooked=false;state.proto=null;

    state.lastReason='Da go hook va phuc hoi ham goc';return true;

  }

  function enableNativeAuto(value){

    if(typeof value!=='boolean')throw new TypeError('Dung true hoac false');

    if(!authorized())throw new Error('Sai acc/frame hoac da doi nhan vat; khong bat native auto');

    const m=model();if(!m||!Number.isFinite(Number(m.curLv))||(value&&!cfg()))

      throw new Error('Chua co du lieu Tian Guan hop le, khong bat auto');

    // This is the game's existing local auto flag. It may trigger the built-in challenge.

    m.auto=value;

    limit({at:new Date().toISOString(),type:'native-auto-toggle',value,...snapshot()});

    return status(false);

  }

  function refreshProgress(){

    if(!authorized())throw new Error('Sai acc/frame');

    const p=refreshProgress;

    if(Date.now()-(p.last||0)<15000)throw new Error('Cho 15s giua 2 lan refresh');

    if(typeof manager()?.getCopyTianguan!=='function')throw new Error('Thieu native API getCopyTianguan');

    p.last=Date.now();

    manager().getCopyTianguan(); // native read request TApr; no change to server stats

    return 'Da gui native read request; doi TXUH va kiem tra status()';

  }

  

  function status(print=true){

    const isHooked=state.hooked&&!!state.proto&&TRACK.every(k=>state.proto[k]===state.wrappers.get(k)?.wrapped);

    const out={version:'8.6.45',hooked:isHooked,hookedMethods:TRACK.filter(k=>state.proto?.[k]===state.wrappers.get(k)?.wrapped),

      attempts:state.attempts,challengeCalls:state.challengeCalls,serverReplyCalls:state.ackEvents,

      actorAtInstall:state.actorAtInstall,accountChanged:!!state.actorAtInstall&&actor()!==state.actorAtInstall,

      ...snapshot(),errors:state.errors,lastReason:state.lastReason,lastEvents:state.records.slice(-10),

      serverStatsModified:false,serverPacketsRewritten:false};

    if(print)console.info('[TIANKIEP45]',out);

    return out;

  }

  const api=Object.freeze({installed:true,version:'8.6.45',start,stop,status,

    diagnose:()=>status(true),history:()=>state.records.slice(),refreshProgress,

    enableNativeAuto});

  W.KVPV_TIANKIEP45=api;

  start();

  if(!state.hooked)console.warn('[TIANKIEP45]',state.lastReason,'- se thu lai');

})();



 

(() => {

  'use strict';

  const W=window, D=W.KVPV_DAILY, V=W.KVPV_V8;

  const E13=W.KVPV_EVENTS13, E24=W.KVPV_EVENTS24, E25=W.KVPV_EVENTS25;

  const actor=()=>String((typeof _Ba==='undefined'?null:_Ba?._rJ?._O$?.ins?.actorId)??'');

  const originalActor=W.__KVPV_OWN_ACTOR_ID;

  if(!originalActor || actor()!==originalActor || !D?.quickState ||

     !V?.toggle || !E13?.status || !E24?.status || !E25?.status){

    console.error('[KVPV V9] Thieu V8.6.46 FULL dependencies / sai game-frame');

    return;

  }

  if(W.KVPV_EVENTS9?.installed){console.info('[KVPV V9] Already loaded');return;}

  const CFG={enabled:true,observeIntervalMs:5000,noticeStuckMs:180000,

    quiet:true, disableLegacyDoubleSend:true, allowPremium:false,

    // Event scenes are NEVER forcefully entered by this layer.

    autoForceEntry:false,autoClearUnconfirmed:false};

  const known=[

    ['honghoang','Hồng Hoang','auto-native'],

    ['dao_nguyen','Đào Nguyên Dao Trì','auto-native'],

    ['vinh_du','Chiến Trường Vinh Dự','auto-native'],

    ['tu_la','Tu La Lôi Đài','auto-native'],

    ['tranh_ba_dinh_cao','Tranh Bá Đỉnh Cao','auto-native'],

    ['tientuyen','BOSS Chiến Tuyến Lv1300','auto-native'],

    ['lanhdia','Lãnh Địa Boss','auto-native'],

    ['tien_ton','Tiên Tôn Đấu Kỹ','trace-only'],

    ['diet_tho_hao','Diệt Thổ Hào','auto-reward-only'],

    ['dua_thuyen','Đua Thuyền Rồng','auto-reward-only'],

    ['ho_tong','Hộ Tống x2','auto-reward-only'],

    ['sa_thanh','Quyết Chiến Sa Thành','partial-native']

  ];

  const capabilities=new Map(known.map(([id,label,mode])=>[id,{label,mode}]));

  const state={timer:null,startedAt:Date.now(),lastSignature:'',sameSince:0,

    warnings:0,lastWarning:0,log:[],lastError:'',scans:0,actorId:originalActor};

  const now=()=>Date.now();

  

  function log(type,details){state.log.push({at:new Date().toISOString(),type,...(details||{})});

    if(state.log.length>100)state.log.shift();}

  function ensureActor(){if(actor()!==originalActor){stop('Đổi nhân vật');return false;}return true;}

  const legacy=['e23_escort_claim','e23_boat_rank','e23_siege_enter','e23_escort_start'];

  function keepLegacyOff(){

    if(!CFG.disableLegacyDoubleSend)return;

    E13.config.autoEscortFree=false;

    E13.config.allowPremium=false;

    if(E24?.config)E24.config.allowPremium=false;

    if(E25?.config)E25.config.allowPremium=false;

    for(const id of legacy)try{V.toggle(id,false);}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

  }

  function schedule(){

    const data=D.lichData?.()||{};

    return {tz:'Asia/Ho_Chi_Minh',time:data.localTime||'',

      active:(data.active||[]).map(e=>({key:e.key,name:e.name,time:e.time,

        mode:capabilities.get(e.key)?.mode||(e.action==='auto'?'auto-native':e.action==='trace'?'trace-only':'schedule-only')})),

      upcoming:(data.upcoming||[]).slice(0,10).map(e=>({key:e.key,name:e.name,time:e.time,date:e.dateKey}))};

  }

  function modules(){

    const declared=D.lichEvents?.()||[];

    let e13=[];try{e13=E13.status(false)?.rows||[];}catch(e){state.lastError=String(e);}

    return declared.map(x=>{

      const runtime=e13.find(e=>e.key===x.key);

      const c=capabilities.get(x.key),mode=c?.mode||

        (runtime?.mode==='auto'?'partial-native':runtime?.mode==='trace'?'trace-only':'schedule-only');

      return {key:x.key,name:x.name,mode,active:runtime?.active??null,

        available:runtime?.executable===true,

        details:runtime?.blocked||null,windows:[...(x.slots||[]),...(x.instants||[])].join(', '),

        nativeExecutorPresent:['auto-native','auto-reward-only','partial-native'].includes(mode)};

    });

  }

  

  function status(print=true){

    const q=D.quickState?.()||{},s=schedule();

    const out={version:'9.0.0',actor:actor(),installed:true,

      enabled:CFG.enabled,mainAutoRunning:!!q.running,job:q.job||null,

      step:q.step||null,scene:q.scene??null,

      activeEvents:s.active,upcomingEvents:s.upcoming,

      totalScheduled:D.lichEvents?.()?.length||0,

      event25:E25.status(false)?.actions||[],

      event24Reward:E24.worldRewardStatus?.()||null,

      legacyDuplicateProtection:CFG.disableLegacyDoubleSend,

      manualSpendEnabled:false,serverCooldownModified:false,

      syntheticBuffsEnabled:false,stuckWarnings:state.warnings,scans:state.scans,

      lastError:state.lastError};

    if(print){console.table(modules());console.info('[KVPV V9]',{

      version:out.version,mainAutoRunning:out.mainAutoRunning,job:out.job,

      scene:out.scene,active:out.activeEvents,stuckWarnings:out.stuckWarnings});}

    return out;

  }

  

  function tick(){

    if(!CFG.enabled||!ensureActor())return;

    state.scans++;

    const q=D.quickState?.()||{};

    const signature=[q.job,q.step,q.scene].join('|');

    if(signature!==state.lastSignature){state.lastSignature=signature;state.sameSince=now();}

    else if(q.running&&q.job&&q.job!=='rảnh' && now()-state.sameSince>CFG.noticeStuckMs &&

       now()-state.lastWarning>CFG.noticeStuckMs){

      state.lastWarning=now();state.warnings++;

      const msg='Job '+signature+' không đổi >'+Math.round(CFG.noticeStuckMs/1000)+'s; kiểm tra ACK / server trước khi can thiệp';

      log('STUCK',{msg}); if(!CFG.quiet)console.warn('[KVPV V9]',msg);

    }

    // Do not alter game state in the observer; legacy entries are disabled once on start.

  }

  

  function start(){

    if(!ensureActor())return false;

    if(state.timer!==null)return true;

    CFG.enabled=true;

    keepLegacyOff();

    // The V9 event edition does not run companion visual-speed hooks.

    // Only the native verified event runners from V8.6.46 are kept active.

    state.timer=(W.KVPV_V1?.timers?.setInterval ?? W.setInterval)(tick,Math.max(1000,CFG.observeIntervalMs));

    tick();log('START');return true;

  }

  

  function stop(reason='User stopped V9 event observability'){

    CFG.enabled=false;

    if(state.timer!==null){(W.KVPV_V1?.timers?.clearInterval ?? W.clearInterval)(state.timer);state.timer=null;}

    log('STOP',{reason});return true;

  }

  function pauseEventActions(){

    E25.stop?.();E24.stop?.();E13.stop?.();

    log('PAUSE_EVENT_ACTIONS');return status(false);

  }

  function resumeEventActions(){

    if(!ensureActor())return null;

    E13.start?.();E24.start?.();E25.start?.();keepLegacyOff();

    start();log('RESUME_EVENT_ACTIONS');return status(false);

  }

  function audit(){

    const rows=modules(),modes={};for(const row of rows)modes[row.mode]=(modes[row.mode]||0)+1;

    const result={version:'9.0.0',at:new Date().toISOString(),actor:actor(),modes,rows,

      pending:E25.status(false)?.actions?.filter(x=>x.pending||x.lock)||[],

      note:'Only observed client modules and server state; schedule-only events are not auto-completed.'};

    console.table(rows);console.table([modes]);return result;

  }

  function diagnostics(){return {status:status(false),audit:audit(),

    legacyPluginsDisabled:legacy,errors:state.lastError,history:state.log.slice(-50),

    event25:E25.diagnostics?.(),event24:E24.worldRewardStatus?.(),

    core:D.quickState?.(),unified:W.KVPV_UNIFIED29?.status?.(false)||null};}

  

  function exportReport(){

    const data=JSON.stringify({generatedAt:new Date().toISOString(),

      status:status(false),schedule:schedule(),modules:modules(),

      event25:E25.status(false),history:state.log.slice()},null,2);

    if(typeof Blob==='undefined'||!document?.createElement||!W.URL?.createObjectURL)return data;

    const url=W.URL.createObjectURL(new Blob([data],{type:'application/json'}));

    const anchor=document.createElement('a');

    try{anchor.href=url;anchor.download='KVPV_V9_EVENTS_'+new Date().toISOString().slice(0,10)+'.json';

      document.body.appendChild(anchor);anchor.click();anchor.remove();}

    finally{(W.KVPV_V1?.timers?.setTimeout ?? W.setTimeout)(()=>W.URL.revokeObjectURL(url),5000);}

    return anchor.download;

  }

  const api=Object.freeze({installed:true,version:'9.0.0',config:CFG,status,

    start,stop,schedule,modules,audit,diagnostics,exportReport,

    pauseEventActions,resumeEventActions,history:()=>state.log.slice()});

  W.KVPV_EVENTS9=api;

  W.KVPV_V9=Object.freeze({installed:true,version:'9.0.0',events:api,

    status:()=>api.status(),audit:()=>api.audit(),

    diagnostics:()=>api.diagnostics(),exportReport:()=>api.exportReport(),

    stop:()=>{api.pauseEventActions();api.stop();},

    resume:()=>api.resumeEventActions()});

  start();

  console.info('[KVPV V9] Event stability edition loaded. KVPV_V9.status() | KVPV_V9.audit()');

})();



 

(() => {

  'use strict';

  const W=window;

  // Stop old observers before installing the new one; never run both.

  for(const obj of [W.KVPV_BOSS921,W.KVPV_BOSS92]){

    try{obj?.stop?.('upgrade to 9.2.1');}catch(e){console.warn('[BOSS921] old stop',e);}

  }

  const VERSION='9.2.1';

  const CFG={sampleMs:250,defaultSeconds:90,maxSeconds:600,

    deathSamples:2,bossLossGraceMs:1500,spawnWaitMs:60000,

    healDedupMs:6,maxEvents:7000,maxHpSamples:3500,maxTransitions:1500,

    maxStatSnapshots:250};

  const DEF_BUFFS=[2001005,2005006,1701001,1201006];

  const ALLOWED_STATS=new Set(['attack','defense','penetration','hp','accuracy',

    'dodge','crit','critResist','damageIncreasePct','damageReductionPct',

    'critDamageIncreasePct','critDamageReductionPct','armorPct',

    'armorPenPct','bossDamagePct','trueDamage','trueArmor','note']);

  const owner={};

  const S={active:false,actorId:'',stageLevel:null,stageOcc:null,

    startedAt:0,endedAt:0,timeoutAt:0,endedReason:'',

    me:null,boss:null,bossObjectId:null,bossName:'',

    bossSeen:false,bossLastSeenMs:null,bossGoneSince:null,

    playerDeadSamples:0,bossDeadSamples:0,deathAtMs:null,

    timer:null,timeoutTimer:null,

    events:[],hp:[],playerBuffChanges:[],bossBuffChanges:[],

    statsHistory:[],statVersion:0,liveStatVersion:0,manualStats:null,

    lastLiveStatKey:null,lastPlayerBuffKey:null,lastBossBuffKey:null,

    lastInstance:null,healKeys:new Map(),duplicateHealsFiltered:0,

    droppedEvents:0,droppedSamples:0,errors:[],lastError:null};

  const now=()=>Date.now();

  const numeric=v=>{if(v==null||v==='')return null;

    const n=Number(v);return Number.isFinite(n)?n:null;};

  const round=(n,d=2)=>Number.isFinite(n)?+n.toFixed(d):null;

  function safeGame(){

    if(typeof _ot==='undefined'||typeof _Ba==='undefined'||

       typeof _C==='undefined'||typeof _ft==='undefined'||

       !_ot?.ins||!_C?._Ba?.instance?.getRoles)

      throw new Error('Chon Console context game-frame, doi tai game.');

    return {id:String(_ot.ins.actorId),world:_C._Ba.instance};

  }

  function prop(r,k){try{return r?.property?.get?.(k)??null;}catch(_){return null;}}

  function readHp(r){const a=prop(r,'hp');return Array.isArray(a)&&a.length>=2

    ?{current:numeric(a[0]),max:numeric(a[1])}:{current:null,max:null};}

  function readBuffs(r){const a=prop(r,'buffs');return Array.isArray(a)

    ?[...new Set(a.map(Number).filter(Number.isSafeInteger))].sort((a,b)=>a-b):[];}

  const elapsed=()=>S.startedAt?Math.max(0,now()-S.startedAt):0;

  function add(list,row,max,drop){if(list.length>=max){list.shift();

    if(drop==='event')S.droppedEvents++;if(drop==='hp')S.droppedSamples++;}

    list.push(row);}

  

  function note(e){const message=String(e?.message||e);S.lastError=message;

    add(S.errors,{elapsedMs:elapsed(),message},60);console.warn('[BOSS921]',message);}

  function buffInfo(id){let row=null;try{row=_ft?._Q8t?.ins?.getCfgById?.(id);}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

    return {id,name:row?.[1]||null,description:row?.[4]||null};}

  function liveStats(){

    const m=S.me;

    return {

      attack:numeric(prop(m,'attack')),

      defense:numeric(prop(m,'defend')??prop(m,'defense')),

      penetration:numeric(prop(m,'penetration')),

      accuracy:numeric(prop(m,'accuracy')),

      playerMaxHp:readHp(m).max

    };

  }

  function captureLive(force=false){

    const data=liveStats(),key=JSON.stringify(data);

    if(!force && key===S.lastLiveStatKey)return;

    S.lastLiveStatKey=key;S.liveStatVersion++;

    add(S.statsHistory,{elapsedMs:elapsed(),version:S.statVersion,

      liveVersion:S.liveStatVersion,source:'client observed, missing fields are null',

      stats:data},CFG.maxStatSnapshots);

  }

  function setStats(stats,noteText='manual attributes panel'){

    if(!stats||typeof stats!=='object'||Array.isArray(stats))

      throw new TypeError('setStats({attack,defense,...}) expects an object');

    const cleaned={};

    for(const [k,v] of Object.entries(stats)){

      if(!ALLOWED_STATS.has(k))continue;

      if(k==='note'){cleaned[k]=String(v).slice(0,200);continue;}

      const n=numeric(v);if(n===null)throw new TypeError(k+' must be numeric');

      cleaned[k]=n;

    }

    if(!Object.keys(cleaned).length)throw Error('No valid attributes');

    S.manualStats={...(S.manualStats||{}),...cleaned};S.statVersion++;

    add(S.statsHistory,{elapsedMs:S.startedAt?elapsed():null,

      version:S.statVersion,source:'manual input, NOT independently verified',

      note:String(noteText).slice(0,200),stats:{...S.manualStats}},CFG.maxStatSnapshots);

    return {version:S.statVersion,stats:{...S.manualStats}};

  }

  function classify(e){

    if(e.heal)return 'heal';

    if(e.reflectFlag)return 'reflect';

    if(e.rideFlag)return 'ride';

    if(e.petFlag)return 'pet';

    if(e.specialFlag)return 'special';

    return 'direct_or_other';

  }

  function receive(source,marker,damage,flags,receiver,victim){

    if(!S.active)return;

    const f=Number(flags)||0,amount=numeric(damage),src=String(source),dst=String(receiver);

    if(amount==null||amount<0||dst!==victim)return;

    const skillMarker=String(marker),mark=numeric(marker),heal=!!(f&32);

    if(heal){

      const key=[src,dst,skillMarker,amount,f].join('|'),t=elapsed();

      const last=S.healKeys.get(key);

      if(last!=null && t-last<=CFG.healDedupMs){S.duplicateHealsFiltered++;return;}

      S.healKeys.set(key,t);

      if(S.healKeys.size>160){for(const [k,v] of S.healKeys){if(t-v>10000)S.healKeys.delete(k);}

        if(S.healKeys.size>160)S.healKeys.clear();}

    }

    let direction='other';

    if(dst===S.actorId&&src===S.bossObjectId)direction='boss_to_player';

    else if(dst===S.bossObjectId&&src===S.actorId)direction='player_to_boss';

    else if(dst===S.bossObjectId)direction='third_party_to_boss';

    else if(dst===S.actorId)direction='other_to_player';

    const e={elapsedMs:elapsed(),direction,sourceId:src,receiverId:dst,

      skillMarker,skillId:mark!=null&&mark%10000===0?mark/10000:null,

      damage:amount,flags:f,critical:!!(f&2),heal,auxiliary:!!(f&256),

      petFlag:!!(f&4),rideFlag:!!(f&16),reflectFlag:!!(f&128),specialFlag:!!(f&64),

      playerBuffs:readBuffs(S.me),bossBuffs:readBuffs(S.boss),

      statsVersion:S.statVersion,liveStatVersion:S.liveStatVersion};

    e.origin=classify(e);

    add(S.events,e,CFG.maxEvents,'event');

  }

  function playerEvent(...args){receive(...args,S.actorId);}

  function bossEvent(...args){receive(...args,S.bossObjectId);}

  function disconnect(){

    if(S.me){try{S.me.off(1012,owner,playerEvent);}catch(_){window.KVPV_V1?.diagnostics?.record(_);}S.me=null;}

    if(S.boss){try{S.boss.off(1012,owner,bossEvent);}catch(_){window.KVPV_V1?.diagnostics?.record(_);}S.boss=null;}

  }

  function discover(world){

    const me=world.getRole(Number(S.actorId))||world.getRole(S.actorId);

    if(me&&me!==S.me&&typeof me.on==='function'&&typeof me.off==='function'){

      if(S.me){try{S.me.off(1012,owner,playerEvent);}catch(_){window.KVPV_V1?.diagnostics?.record(_);}}

      S.me=me;S.me.on(1012,owner,playerEvent);captureLive(true);

    }

    const boss=Object.values(world.getRoles()||{}).find(r=>r?.property&&

      Number(prop(r,'type'))===1&&Number(prop(r,'occ'))===S.stageOcc);

    if(boss){

      const instance=String(prop(boss,'id')??boss.id);

      if(S.lastInstance && S.lastInstance!==instance){stop('different boss instance: start new measurement');return;}

      if(boss!==S.boss){

        if(S.boss){try{S.boss.off(1012,owner,bossEvent);}catch(_){window.KVPV_V1?.diagnostics?.record(_);}}

        S.boss=boss;S.bossObjectId=instance;S.lastInstance=instance;

        S.bossName=String(prop(boss,'name')||'Boss Thien Quan');

        if(typeof boss.on==='function'&&typeof boss.off==='function')boss.on(1012,owner,bossEvent);

      }

      S.bossSeen=true;S.bossLastSeenMs=elapsed();S.bossGoneSince=null;

    }else if(S.bossSeen){

      if(S.boss){try{S.boss.off(1012,owner,bossEvent);}catch(_){window.KVPV_V1?.diagnostics?.record(_);}S.boss=null;}

      if(S.bossGoneSince===null)S.bossGoneSince=elapsed();

    }

  }

  function trackBuffs(row){

    for(const [side,values,key] of [

      ['player',row.playerBuffs,'lastPlayerBuffKey'],

      ['boss',row.bossBuffs,'lastBossBuffKey']]){

      // Do not treat a despawned boss as losing all buffs.

      if(side==='boss'&&row.bossHP===null)continue;

      const sig=values.join(',');if(S[key]===sig)continue;

      const previous=S[key]?S[key].split(',').filter(Boolean).map(Number):[];

      const added=values.filter(x=>!previous.includes(x));

      const removed=previous.filter(x=>!values.includes(x));

      const changes=side==='boss'?S.bossBuffChanges:S.playerBuffChanges;

      add(changes,{elapsedMs:row.elapsedMs,side,buffs:values,

        added:added.map(buffInfo),removed:removed.map(buffInfo),

        trackedDefensive:side==='player'?DEF_BUFFS.filter(x=>values.includes(x)):[],

        instance:side==='boss'?S.lastInstance:null},CFG.maxTransitions);

      S[key]=sig;

    }

  }

  function sample(){

    const p=readHp(S.me),b=readHp(S.boss),buffs=readBuffs(S.me),bb=readBuffs(S.boss);

    const row={elapsedMs:elapsed(),bossObjectId:S.boss?.property?S.bossObjectId:null,

      playerHP:p.current,playerMaxHP:p.max,bossHP:b.current,bossMaxHP:b.max,

      bossHpPct:b.max>0?round(100*b.current/b.max,3):null,

      playerBuffs:buffs,bossBuffs:bb,statVersion:S.statVersion,

      liveStatVersion:S.liveStatVersion};

    add(S.hp,row,CFG.maxHpSamples,'hp');trackBuffs(row);

    if(S.me && p.current!==null && p.current<=0)S.playerDeadSamples++;

    else S.playerDeadSamples=0;

    if(S.boss && b.current!==null && b.current<=0)S.bossDeadSamples++;

    else S.bossDeadSamples=0;

    if(S.playerDeadSamples>=CFG.deathSamples){S.deathAtMs=elapsed();stop('player defeated (HP=0)');return;}

    if(S.bossDeadSamples>=CFG.deathSamples){stop('boss defeated (HP=0)');return;}

    if(S.bossSeen && S.bossGoneSince!==null &&

       elapsed()-S.bossGoneSince>=CFG.bossLossGraceMs){stop('boss disappeared');return;}

    if(!S.bossSeen && elapsed()>CFG.spawnWaitMs)stop('boss not found within 60s');

  }

  

  function tick(){if(!S.active)return;

    try{

      const g=safeGame();if(g.id!==S.actorId)return stop('actor changed');

      const level=numeric(_Ba?._Co?._Mo?.ins?.curLv);

      if(level!==null&&level!==S.stageLevel)return stop('Tian Guan level changed');

      discover(g.world);if(!S.active)return;

      captureLive();sample();if(S.active&&now()>=S.timeoutAt)stop('time limit');

    }catch(e){note(e);stop('probe error');}

  }

  

  function status(){return {version:VERSION,installed:true,readOnly:true,active:S.active,

    actorId:S.actorId,level:S.stageLevel,monsterId:S.stageOcc,bossName:S.bossName,

    bossObjectId:S.bossObjectId,bossAttached:!!S.boss,playerAttached:!!S.me,

    elapsedSeconds:S.startedAt?round(((S.endedAt||now())-S.startedAt)/1000,3):0,

    remainingSeconds:S.active?Math.max(0,Math.ceil((S.timeoutAt-now())/1000)):0,

    bossSeen:S.bossSeen,combatEvents:S.events.length,hpSamples:S.hp.length,

    bossBuffChanges:S.bossBuffChanges.length,playerBuffChanges:S.playerBuffChanges.length,

    statSnapshots:S.statsHistory.length,duplicateHealsFiltered:S.duplicateHealsFiltered,

    droppedEvents:S.droppedEvents,droppedHpSamples:S.droppedSamples,

    endedReason:S.endedReason,lastError:S.lastError,

    exactBossATK:null,exactBossDEF:null};}

  

  function stop(reason='manual stop'){

    if(!S.active)return status();

    S.endedAt=now();S.endedReason=reason;S.active=false;

    if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval ?? W.clearInterval)(S.timer);S.timer=null;

    if(S.timeoutTimer!==null)(W.KVPV_V1?.timers?.clearTimeout ?? W.clearTimeout)(S.timeoutTimer);S.timeoutTimer=null;

    disconnect();console.info('[BOSS921] Stopped:',reason);return status();

  }

  

  function start(seconds=CFG.defaultSeconds){

    if(S.active)stop('restart');

    const g=safeGame(),level=numeric(_Ba?._Co?._Mo?.ins?.curLv);

    const stage=_ft?._h$?.ins?.getCfgByLv?.(level),occ=stage?

      numeric(_ft._h$.ins.occ(stage,level)):null;

    if(!stage||occ===null||!Number.isSafeInteger(occ)||occ<=0)

      throw Error('Khong tim thay cau hinh Thien Quan; vao man Boss truoc.');

    const period=Math.max(10,Math.min(CFG.maxSeconds,Math.floor(Number(seconds)||CFG.defaultSeconds)));

    Object.assign(S,{active:true,actorId:g.id,stageLevel:level,stageOcc:occ,

      startedAt:now(),endedAt:0,timeoutAt:now()+period*1000,endedReason:'',

      me:null,boss:null,bossObjectId:null,bossName:'',bossSeen:false,

      bossLastSeenMs:null,bossGoneSince:null,playerDeadSamples:0,bossDeadSamples:0,

      deathAtMs:null,events:[],hp:[],playerBuffChanges:[],bossBuffChanges:[],

      // Keep manual stats after a restart; new run stores their source explicitly.

      statsHistory:[],statVersion:S.manualStats?1:0,liveStatVersion:0,

      lastLiveStatKey:null,lastPlayerBuffKey:null,lastBossBuffKey:null,

      lastInstance:null,healKeys:new Map(),duplicateHealsFiltered:0,

      droppedEvents:0,droppedSamples:0,errors:[],lastError:null});

    if(S.manualStats)add(S.statsHistory,{elapsedMs:0,version:S.statVersion,

      source:'manual input, NOT independently verified',stats:{...S.manualStats}},CFG.maxStatSnapshots);

    tick();

    if(S.active){S.timer=(W.KVPV_V1?.timers?.setInterval ?? W.setInterval)(tick,CFG.sampleMs);

      S.timeoutTimer=(W.KVPV_V1?.timers?.setTimeout ?? W.setTimeout)(()=>stop('time limit'),period*1000);}

    console.info('[BOSS921] Measuring up to',period,'seconds; stop on death / boss gone.');

    return status();

  }

  const isHit=e=>e.damage>0&&!e.heal&&!e.auxiliary;

  const combat=e=>isHit(e)&&['boss_to_player','player_to_boss','third_party_to_boss'].includes(e.direction);

  function engagement(){

    const events=S.events.filter(combat);

    const hp=S.hp.filter(x=>x.bossObjectId===S.lastInstance&&x.bossHP!==null);

    const first=Math.min(...[...events.map(e=>e.elapsedMs),...hp.map(x=>x.elapsedMs)]);

    if(!Number.isFinite(first))return {startMs:null,endMs:null,seconds:null,method:'no boss evidence'};

    const lastEvent=events.length?Math.max(...events.map(e=>e.elapsedMs)):null;

    const lastHp=hp.length?hp[hp.length-1].elapsedMs:null;

    const observedEnd=Math.max(lastEvent??0,lastHp??0,S.deathAtMs??0);

    const end=Math.max(first,Math.min(observedEnd,S.endedAt?S.endedAt-S.startedAt:elapsed()));

    return {startMs:first,endMs:end,seconds:Math.max(0.001,(end-first)/1000),

      method:'first combat/HP to last boss HP/combat/death; excludes post-combat time'};

  }

  function hpSummary(){

    const arr=S.hp.filter(x=>x.bossObjectId===S.lastInstance&&x.bossHP!==null);

    if(!arr.length)return {samples:0,warning:'No matching boss HP samples'};

    const first=arr[0],last=arr[arr.length-1],secs=(last.elapsedMs-first.elapsedMs)/1000;

    return {samples:arr.length,bossObjectId:S.lastInstance,fromMs:first.elapsedMs,

      toMs:last.elapsedMs,bossHpStart:first.bossHP,bossHpEnd:last.bossHP,

      bossMaxHp:last.bossMaxHP,netHpLoss:first.bossHP-last.bossHP,

      netHpLossPerSecond:secs>0?Math.round((first.bossHP-last.bossHP)/secs):null,

      playerHpStart:first.playerHP,playerHpEnd:last.playerHP,

      warning:'Net HP loss includes heals/other sources, not a player damage total.'};

  }

  function groups(){

    const map=new Map();

    for(const e of S.events){if(!isHit(e))continue;

      const flags=DEF_BUFFS.map(x=>e.playerBuffs.includes(x));

      const key=[e.direction,e.origin,e.skillId??e.skillMarker,e.critical,

        flags.join(','),e.statsVersion].join('|');

      let g=map.get(key);

      if(!g){g={direction:e.direction,origin:e.origin,skill:e.skillId??e.skillMarker,

        crit:e.critical,hoThe:flags[0],thanhLien:flags[1],hoGiap:flags[2],

        nguPhong:flags[3],statsVersion:e.statsVersion,count:0,sum:0,min:Infinity,

        max:-Infinity,values:[]};map.set(key,g);}

      g.count++;g.sum+=e.damage;g.min=Math.min(g.min,e.damage);

      g.max=Math.max(g.max,e.damage);g.values.push(e.damage);

    }

    return [...map.values()].map(({values,...g})=>{

      values.sort((a,b)=>a-b);const n=values.length;

      return {...g,avgDamage:Math.round(g.sum/n),medianDamage:n%2?values[(n-1)/2]

        :Math.round((values[n/2-1]+values[n/2])/2),

        caution:n<5?'LOW SAMPLE':'descriptive; not causal'};

    }).sort((a,b)=>b.count-a.count);

  }

  function comparisons(){

    const rows=groups().filter(g=>g.direction==='boss_to_player'&&!g.crit),out=[];

    const buffs=['hoThe','thanhLien','hoGiap','nguPhong'];

    for(const baseline of rows.filter(g=>buffs.every(k=>!g[k]))){

      for(const b of buffs){

        const yes=rows.find(g=>g.skill===baseline.skill&&g.statsVersion===baseline.statsVersion&&

          g[b]&&buffs.every(k=>k===b||!g[k]));

        if(!yes)continue;

        out.push({skill:baseline.skill,buff:b,nWithout:baseline.count,nWith:yes.count,

          avgWithout:baseline.avgDamage,avgWith:yes.avgDamage,

          observedLowerPct:baseline.avgDamage>0?

            round(100*(1-yes.avgDamage/baseline.avgDamage),2):null,

          confidence:Math.min(baseline.count,yes.count)>=5?'EXPLORATORY':'LOW SAMPLE',

          warning:'association only; not server formula'});

      }

    }

    return out;

  }

  

  function report(verbose=true){

    const all=S.events.filter(isHit),out=all.filter(e=>e.direction==='player_to_boss');

    const direct=out.filter(e=>e.origin==='direct_or_other'||e.origin==='special');

    const pet=out.filter(e=>e.origin==='pet');

    const ride=out.filter(e=>e.origin==='ride');

    const reflect=out.filter(e=>e.origin==='reflect');

    const incoming=all.filter(e=>e.direction==='boss_to_player');

    const other=all.filter(e=>e.direction==='third_party_to_boss');

    const sum=a=>a.reduce((n,e)=>n+e.damage,0);

    const span=engagement(),secs=span.seconds||null;

    const div=(amount)=>secs?Math.round(amount/secs):null;

    const overview={...status(),engagement:span,sessionSeconds:status().elapsedSeconds,

      hitsBossToPlayer:incoming.length,damageBossToPlayer:sum(incoming),

      hitsAllOwnSourcesToBoss:out.length,damageAllOwnSourcesToBoss:sum(out),

      hitsDirectToBoss:direct.length,damageDirectToBoss:sum(direct),

      hitsPetToBoss:pet.length,damagePetToBoss:sum(pet),

      hitsRideToBoss:ride.length,damageRideToBoss:sum(ride),

      hitsReflectToBoss:reflect.length,damageReflectToBoss:sum(reflect),

      hitsThirdPartyToBoss:other.length,damageThirdPartyToBoss:sum(other),

      bossDamagePerCombatSecond:div(sum(incoming)),

      allOwnSourcesDamagePerCombatSecond:div(sum(out)),

      directDamagePerCombatSecond:div(sum(direct)),

      rawHeals:S.events.filter(e=>e.heal).length+S.duplicateHealsFiltered,

      uniqueHeals:S.events.filter(e=>e.heal).length,

      duplicateHealsFiltered:S.duplicateHealsFiltered,

      note:'Client received server results; direct/companion flags depend on protocol interpretation; ATK/DEF unknown.'};

    const result={overview,bossHp:hpSummary(),groups:groups(),

      buffComparisons:comparisons(),bossBuffChanges:S.bossBuffChanges.slice(),

      playerBuffChanges:S.playerBuffChanges.slice(),statsHistory:S.statsHistory.slice(),

      warnings:[

        'Exact boss ATK and DEF cannot be inferred without a validated server formula.',

        'Death determined by 2 consecutive HP=0 samples, or Boss despawn after grace period.',

        'Heal dedup only for identical source/target/skill/amount/flags within 6 ms; this is heuristic.',

        'Direct/pet/ride classification uses client damage flags and may require independent verification.',

        'DPS denominator measures observed encounter window, excluding idle time after death.',

        'Manual stats are user input; missing live properties remain null.',

        'Buff comparisons observational; do not demonstrate buff causality.'

      ]};

    if(verbose){console.log('[BOSS921] Overview',overview);console.table(result.groups);

      console.log('[BOSS921] HP',result.bossHp);

      if(result.buffComparisons.length)console.table(result.buffComparisons);

      console.log('[BOSS921] Boss buffs',result.bossBuffChanges);}

    return result;

  }

  function data(){return {version:VERSION,report:report(false),events:S.events.slice(),

    hpSamples:S.hp.slice(),bossBuffChanges:S.bossBuffChanges.slice(),

    buffTransitions:S.playerBuffChanges.slice(),statsHistory:S.statsHistory.slice(),

    errors:S.errors.slice()};}

  function csv(which='events'){

    const items=which==='hp'?S.hp:which==='bossBuffs'?S.bossBuffChanges:

      which==='buffs'?S.playerBuffChanges:which==='stats'?S.statsHistory:S.events;

    if(!items.length)return '';

    const keys=[...new Set(items.flatMap(x=>Object.keys(x)))];

    const quote=v=>'"'+(typeof v==='object'?JSON.stringify(v):String(v??'')).replaceAll('"','""')+'"';

    return [keys.join(','),...items.map(x=>keys.map(k=>quote(x[k])).join(','))].join('\n');

  }

  

  function exportReport(){

    const json=JSON.stringify(data(),null,2);

    const name=`KVPV_BOSS_V9.2.1_${S.stageLevel||'unknown'}_${new Date().toISOString().slice(0,10)}.json`;

    if(typeof document==='undefined'||typeof Blob==='undefined'||!W.URL?.createObjectURL){

      console.log('Browser file export unavailable, copy(KVPV_V921.boss.data())');return json;}

    const uri=W.URL.createObjectURL(new Blob([json],{type:'application/json'}));

    try{const a=document.createElement('a');a.href=uri;a.download=name;

      document.body.appendChild(a);a.click();a.remove();}

    finally{(W.KVPV_V1?.timers?.setTimeout ?? W.setTimeout)(()=>W.URL.revokeObjectURL(uri),2000);}

    return name;

  }

  const boss=Object.freeze({installed:true,version:VERSION,config:CFG,

    start,stop,status,report,comparisons,setStats,observedStats:liveStats,

    data,events:()=>S.events.slice(),hpSamples:()=>S.hp.slice(),

    bossBuffChanges:()=>S.bossBuffChanges.slice(),

    buffTransitions:()=>S.playerBuffChanges.slice(),csv,exportReport});

  W.KVPV_BOSS921=boss;

  // Keep legacy public commands intact so V9.2 users can upgrade without F5.

  W.KVPV_BOSS92=boss;

  const v91=W.KVPV_V9;

  const facade=Object.freeze({installed:true,version:VERSION,boss,

    events:v91?.events,

    status(){return {version:VERSION,legacy:v91?.status?.(),boss:boss.status()};},

    audit(){return v91?.audit?.()||null;},

    diagnostics(){return {legacy:v91?.diagnostics?.(),boss:boss.report(false)};},

    exportReport(){return boss.exportReport();},

    stop(){boss.stop('V9.2.1 stop');return v91?.stop?.();},

    resume(){return v91?.resume?.();}});

  W.KVPV_V921=facade;W.KVPV_V92=facade;W.KVPV_V9=facade;

  console.info('[KVPV V9.2.1] READY. Run KVPV_V921.boss.start(90). Auto-stop on death. Read-only.');

})();



/* KVPV V9.2.3 — AUTO LINH LUNG (CONTINUOUS) THAP / PAGODA (actionId 21)
 * Grounded in 2026-10-15 game client:
 * _Ba._tQ._$Y.ins.copyData[0] / finishLevel = highest completed floor.
 * _ft._u$.ins.getCfgByLv(next)[0] = official dungeon scene ID.
 * _Ba._tQ._kRn.prototype._vRn() uses rqEtScene(sceneId,next).
 * _Ba._tQ._kRn.prototype._yRn/_pRn() use getCpAward(sceneId,floor,0/1)
 * for unclaimed awards in copyData[1] and [2].
 * No sweeping, purchases, client stat writes, bypassing floors or result fabrication.
 * Install once after V9.2.1 FULL. Manual mode: only starts when player explicitly invokes tower.start().
 * NEVER blindly replay a timed-out RPC or an unacknowledged reward request.
 * Continuous means while browser remains open and game frame executes JS. 
 */

 

(() => {

  'use strict';

  const W=window, old=W.KVPV_V921;

  if(W.KVPV_LINHLUNG922?.installed){

    console.info('[LINH LUNG 9.2.2] Already installed; use KVPV_V922.tower.status()');return;

  }

  const C={tickMs:1000,autoClaim:true,exclusiveDaily:true,

    maxFloorsPerRun:Number.MAX_SAFE_INTEGER,maxConsecutiveFailures:10,

    retryAfterTenFailuresMs:10*60*1000,

    enterTimeoutMs:25000,settleAfterReturnMs:9500,

    battleTimeoutMs:240000,estimatedFightWindowMs:30000,claimTimeoutMs:20000,

    retryDelayMs:9000,afterSuccessDelayMs:2000,

    autoExitAfterConfirmedWin:true,exitDelayMs:6000,exitTimeoutMs:22000,

    initialLoadTimeoutMs:30000,refreshEveryMs:10000,

    maxHistory:200};

  const S={enabled:false,actorId:'',startedAt:0,stoppedAt:0,

    timer:null,phase:'off',pending:null,claim:null,nextAt:0,

    lastModelFetch:0,invalidSince:0,lastFloor:null,completed:0,

    failed:0,consecutiveFailures:0,claims:0,history:[],

    reason:'Not started',lastError:'',floorAttempts:new Map(),

    previousDailyActive:false,previousV873:null,

    targetFloor:null,processedFloor:null,exitRequestedAt:0,

    startFloor:null,enteredInstance:false,pausedUntil:0,cooldownRounds:0,pauseReason:''};

  const now=()=>Date.now(),n=x=>{const v=Number(x);return Number.isSafeInteger(v)?v:null;};

  const model=()=>_Ba?._tQ?._$Y?.ins;

  const configFloor=f=>_ft?._u$?.ins?.getCfgByLv?.(f)||null;

  const native=()=>_Ba?._sst?._Cht?.inst;

  const readActor=()=>String(_ot?.ins?.actorId??'');

  const common=()=>_Ba?._$a?.SceneUtil?.isCommonScene===true;

  const mission=()=>_Ba?._$a?._yo?.ins?.isInMission===true;

  const arena=()=>_Ba?._$a?._yo?.ins?.isInArena===true;

  const inOtherJob=()=>{

    const d=W.KVPV_DAILY?.quickState?.();

    return d?.running===true&&d?.job!=='rảnh';

  };

  

  function log(msg,detail){

    const line={time:new Date(now()).toISOString(),phase:S.phase,message:msg,detail:detail??null};

    S.history.push(line);if(S.history.length>C.maxHistory)S.history.shift();

    console.log('[LINH LUNG 9.2.3]',msg,detail??'');

  }

  function floor(){

    const m=model(),d=m?.copyData;

    if(!Array.isArray(d)||d.length<3||!Array.isArray(d[1])||!Array.isArray(d[2]))

      return {ready:false,reason:'copyData not loaded yet'};

    const f=n(d[0]),confirm=n(m.finishLevel);

    if(f===null||f<0||confirm!==f)

      return {ready:false,reason:`Progress mismatch copyData[0]=${d[0]} finishLevel=${m.finishLevel}`};

    const next=f+1,config=configFloor(next),sceneId=n(config?.[0]),max=n(_ft?._u$?.ins?.maxLv);

    return {ready:true,current:f,next,sceneId,hasNext:!!config&&sceneId!==null&&sceneId>0&&

      (max===null||next<=max),maxFloor:max,

      pendingNormal:[...d[1]],pendingLarge:[...d[2]],

      copySignature:JSON.stringify([d[0],d[1],d[2]])};

  }

  function refresh(){

    if(now()-S.lastModelFetch<C.refreshEveryMs)return;

    const f=_Ba?._tQ?._vJt?.ins?._lJt;

    if(typeof f==='function'){

      S.lastModelFetch=now();try{f.call(_Ba._tQ._vJt.ins);}catch(e){log('Progress refresh failed',String(e));}

    }

  }

  function release(){

    if(S.previousV873){

      const {config:cfg,challenge,open}=S.previousV873;

      if(cfg){cfg.autoChallenge=challenge;cfg.autoOpen=open;}

      S.previousV873=null;

    }

    if(S.previousDailyActive){

      S.previousDailyActive=false;

      try{W.KVPV_DAILY?.start?.();log('Resumed Auto Daily');}catch(e){log('Auto Daily resume failed',String(e));}

    }

  }

  

  function stop(reason='Stopped by user'){

    if(S.timer!==null){clearInterval(S.timer);S.timer=null;}

    S.enabled=false;S.stoppedAt=now();S.phase='off';S.reason=String(reason);

    // No pending requests are replayed during stop/restart.

    release();log('Stopped: '+S.reason);

    return status(false);

  }

  function cooldown(reason){

    S.cooldownRounds++;

    S.pauseReason=String(reason);

    S.pausedUntil=now()+C.retryAfterTenFailuresMs;

    S.phase='cooldown';

    S.reason='Cooldown: '+S.pauseReason;

    log('Tam nghi '+Math.round(C.retryAfterTenFailuresMs/60000)+' phut sau 10 lan thua; se thu lai neu server xac nhan',

      {floor:S.lastFloor,nextAt:new Date(S.pausedUntil).toISOString(),round:S.cooldownRounds});

  }

  function error(reason){S.lastError=String(reason);log('STOP: '+reason);stop(reason);} 

  function actorOK(){if(!S.actorId||S.actorId!==readActor()){

    error('Account changed; stopped to protect other character');return false;

  }return true;}

  function safeToEnter(){

    if(!common()||mission()||arena())return false;

    if(inOtherJob())return false;

    if(W.KVPV_UPGRADES?.busy?.()===true)return false;

    return true;

  }

  function claimKey(kind,f){return `${kind}:${f}`;}

  function pendingReward(p){

    for(const [kind,array] of [[0,p.pendingNormal],[1,p.pendingLarge]]){

      for(const v of array){

        const f=n(v);

        if(f!==null&&f>0 && f<=p.current)return {kind,floor:f};

      }

    }

    return null;

  }

  function sendReward(p){

    const reward=pendingReward(p);

    if(!reward)return false;

    const c=configFloor(reward.floor),sceneId=n(c?.[0]);

    if(!c||!sceneId){return error(`Missing reward scene for floor ${reward.floor}`),true;}

    const rpc=native();if(typeof rpc?.getCpAward!=='function'){

      error('Native getCpAward not available');return true;

    }

    // Exactly one request; never auto-retry while result is ambiguous.

    const at=now();

    S.claim={...reward,at,key:claimKey(reward.kind,reward.floor)};

    S.phase='claim';

    try{rpc.getCpAward(sceneId,reward.floor,reward.kind);

      log(`Claim ${reward.kind?'large':'normal'} reward, floor ${reward.floor}`);

    }catch(e){error('Claim call failed: '+String(e));}

    return true;

  }

  function checkClaim(p){

    const q=S.claim;if(!q){S.phase='idle';return;}

    if(!p.ready){refresh();if(now()-q.at>C.claimTimeoutMs)error('Reward ACK timed out (missing model)');return;}

    const arr=q.kind===0?p.pendingNormal:p.pendingLarge;

    if(!arr.some(x=>n(x)===q.floor)){

      S.claims++;log(`Server ACK claimed ${q.kind?'large':'normal'} floor ${q.floor}`);

      S.claim=null;S.phase='idle';S.nextAt=now()+500;return;

    }

    if(now()-q.at>C.claimTimeoutMs)

      error(`Reward ${q.key} not confirmed; stopped without duplicate request`);

  }

  function sendFloor(p){

    if(!p.hasNext){S.phase='waiting-new-floor';S.reason='No higher floor configured; monitoring';S.nextAt=now()+60000;return;}

    if(S.targetFloor!==null&&p.current>=S.targetFloor){S.phase='target-reached';S.reason='Target reached; monitoring';S.nextAt=now()+30000;return;}

    // Continuous run: no 100-floor per-session limit.

    const attempts=S.floorAttempts.get(p.next)||0;

    if(attempts>=C.maxConsecutiveFailures){cooldown('Floor '+p.next+' has 10 confirmed failed attempts');return;}

    if(!safeToEnter())return;

    const rpc=native();if(typeof rpc?.rqEtScene!=='function')return error('Native rqEtScene unavailable');

    const current=floor();

    if(!current.ready||current.current!==p.current||current.sceneId!==p.sceneId)

      return error('Tower progress changed while preparing request; refresh needed');

    // Commit before the call, so even a synchronous scene event cannot duplicate it.

    S.floorAttempts.set(p.next,attempts+1);

    S.pending={floor:p.next,from:p.current,sceneId:p.sceneId,at:now(),

      enterAt:0,returnAt:0,successAt:0,success:false,

      exitSent:false,entered:false};

    S.phase='entering';

    try{rpc.rqEtScene(p.sceneId,p.next);

      log(`Challenge floor ${p.next} after server-confirmed ${p.current}`);

    }catch(e){error('Native challenge failed: '+String(e));}

  }

  function complete(){

    const a=S.pending;if(!a)return;

    if(a.success){S.completed++;S.consecutiveFailures=0;

      log(`Confirmed completion of floor ${a.floor} by finishLevel`);

    }else{

      S.failed++;S.consecutiveFailures++;

      log(`Floor ${a.floor} not cleared (${S.consecutiveFailures}/${C.maxConsecutiveFailures})`);

    }

    S.pending=null;S.phase='idle';S.nextAt=now()+(a.success?C.afterSuccessDelayMs:C.retryDelayMs);

    if(S.consecutiveFailures>=C.maxConsecutiveFailures)cooldown('10 consecutive unsuccessful attempts');

  }

  function followFloor(p){

    const a=S.pending;if(!a){S.phase='idle';return;}

    const t=now(),elapsed=t-a.at;

    if(p.ready&&p.current>=a.floor){a.success=true;if(!a.successAt)a.successAt=t;}

    const inside=!common()||mission();

    if(inside){a.entered=true;if(!a.enterAt)a.enterAt=t;}

    if(!a.entered&&elapsed>C.enterTimeoutMs){

      return error('No verified entrance after challenge; not retrying blindly');

    }

    if(a.entered&&!a.success&&!inside){

      if(!a.returnAt)a.returnAt=t;

      if(t-a.returnAt>=C.settleAfterReturnMs){

        if(!p.ready){refresh();return;}

        if(p.current>=a.floor)a.success=true;

        else return complete(); // confirmed no floor progress after return and wait

      }

    }else if(inside){a.returnAt=0;}

    if(a.success){

      S.phase='confirming';

      if(common()&&!mission())return complete();

      if(t-a.successAt>C.exitDelayMs&&C.autoExitAfterConfirmedWin&&!a.exitSent){

        const rpc=native();

        if(typeof rpc?.rqEtScene==='function'){

          a.exitSent=true;S.exitRequestedAt=t;

          try{rpc.rqEtScene(0);log('Exit confirmed-win dungeon through native exit');}

          catch(e){return error('Exit request failed: '+String(e));}

        }

      }

      if(a.exitSent && t-S.exitRequestedAt>C.exitTimeoutMs)

        return error('Win confirmed but dungeon exit timed out');

    }else if(a.entered){

      S.phase='fighting';

      if(t-a.enterAt>C.battleTimeoutMs)return error('Tower battle timed out, no duplicate requests');

    }else S.phase='entering';

  }

  

  function tick(){

    if(!S.enabled||!actorOK())return;

    if(!S.startedAt)return;

    if(S.pausedUntil){

      if(now()<S.pausedUntil)return;

      S.pausedUntil=0;S.pauseReason='';S.reason='Running';

      S.consecutiveFailures=0;S.floorAttempts.clear();

      S.nextAt=now()+1000;S.phase='idle';

      log('Da het nghi, tiep tuc thu sau khi cap nhat trang thai server');

      refresh();

    }

    const p=floor();

    if(p.ready){S.invalidSince=0;S.lastFloor=p.current;}

    else {if(!S.invalidSince)S.invalidSince=now();refresh();

      if(now()-S.invalidSince>C.initialLoadTimeoutMs)

        return error('No stable Tower model: '+p.reason);

    }

    if(S.claim){checkClaim(p);return;}

    if(S.pending){followFloor(p);return;}

    if(!p.ready||now()<S.nextAt)return;

    if(!safeToEnter()){S.phase='waiting-idle';return;}

    S.phase='idle';

    // Claim even if target floor or final floor was just reached.

    if(C.autoClaim&&pendingReward(p))return sendReward(p);

    if(S.targetFloor!==null&&p.current>=S.targetFloor){S.phase='target-reached';S.reason='Target reached; monitoring';S.nextAt=now()+30000;return;}

    if(!p.hasNext){S.phase='waiting-new-floor';S.reason='Waiting for server to unlock next floor';S.nextAt=now()+60000;return;}

    sendFloor(p);

  }

  

  function start(options={}){

    if(S.enabled)return status();

    if(!options||typeof options!=='object')options={targetFloor:options};

    if(typeof _Ba==='undefined'||typeof _ft==='undefined'||typeof _ot==='undefined')

      throw Error('Choose game-frame and wait for game to finish loading');

    const actor=readActor();if(!actor||actor==='undefined')throw Error('Missing actorId');

    const target=options.targetFloor==null?null:n(options.targetFloor);

    if(options.targetFloor!=null && (target===null||target<1))throw Error('Invalid targetFloor');

    if(options.autoClaim!==undefined)C.autoClaim=!!options.autoClaim;

    if(options.exclusiveDaily!==undefined)C.exclusiveDaily=!!options.exclusiveDaily;

    S.actorId=actor;S.startedAt=now();S.stoppedAt=0;S.phase='loading';

    S.reason='Running';S.lastError='';S.enabled=true;

    S.nextAt=now();S.pending=null;S.claim=null;S.lastFloor=null;

    S.completed=0;S.failed=0;S.claims=0;S.consecutiveFailures=0;

    S.floorAttempts.clear();S.history.length=0;S.lastModelFetch=0;

    S.invalidSince=0;S.targetFloor=target;S.exitRequestedAt=0;

    S.startFloor=floor().current??null;S.pausedUntil=0;S.cooldownRounds=0;S.pauseReason='';

    if(C.exclusiveDaily){

      const D=W.KVPV_DAILY;

      S.previousDailyActive=D?.quickState?.()?.running===true;

      if(S.previousDailyActive){try{D.stop?.();log('Paused Auto Daily during tower climb');}

        catch(e){S.previousDailyActive=false;error('Could not pause Auto Daily: '+String(e));return status();}}

    }

    const oldTower=W.KVPV_V873?.config;

    if(oldTower){S.previousV873={config:oldTower,

      challenge:oldTower.autoChallenge,open:oldTower.autoOpen};

      oldTower.autoChallenge=false;oldTower.autoOpen=false;

      log('Suspended old quest-specific Tower entry to prevent duplicates');

    }

    refresh();

    S.timer=setInterval(()=>{try{tick();}catch(e){error('Unexpected Tower error: '+String(e));}},C.tickMs);

    tick();return status();

  }

  

  function status(print=true){

    const p=(typeof _Ba!=='undefined'&&typeof _ft!=='undefined')?floor():{ready:false};

    const o={installed:true,version:'9.2.3',active:S.enabled,actorId:S.actorId,

      phase:S.phase,reason:S.reason,highestFloor:p.current??null,

      nextFloor:p.next??null,sceneId:p.sceneId??null,

      targetFloor:S.targetFloor,completedThisRun:S.completed,

      failuresThisRun:S.failed,consecutiveFailures:S.consecutiveFailures,

      cooldownRounds:S.cooldownRounds,pauseReason:S.pauseReason||null,

      retryInSeconds:S.pausedUntil?Math.max(0,Math.ceil((S.pausedUntil-now())/1000)):0,

      rewardClaimsConfirmed:S.claims,unclaimedNormal:p.pendingNormal?.length??null,

      unclaimedLarge:p.pendingLarge?.length??null,

      pendingFloor:S.pending?.floor??null,pendingClaim:S.claim?.key??null,

      battleStartedAt:S.pending?.enterAt||null,

      battleElapsedSeconds:S.pending?.enterAt&&S.phase==='fighting'

        ?Math.max(0,Math.floor((now()-S.pending.enterAt)/1000)):null,

      battleSecondsRemaining:S.pending?.enterAt&&S.phase==='fighting'

        ?Math.max(0,Math.ceil((C.estimatedFightWindowMs-(now()-S.pending.enterAt))/1000)):null,

      battleWindowEstimateOnly:true,

      lastError:S.lastError||null,allowedToEnter:safeToEnter(),

      currentScene:typeof _Ba!=='undefined'?_Ba?._$a?.SceneUtil?.curScene:null};

    if(print)console.table([o]);return o;

  }

  const tower=Object.freeze({installed:true,version:'9.2.3',config:C,

    start,stop,status,scan:()=>{const p=floor();console.log('[LINH LUNG] native model:',p);return p;},

    history:()=>S.history.slice(),tick,

    setTargetFloor(f){if(!S.enabled)throw Error('Start the Tower first');const v=n(f);

      if(v===null||v<1)throw Error('Invalid target floor');S.targetFloor=v;return status();}});

  W.KVPV_LINHLUNG922=tower;

  // Add to current V9.2.1 facade, preserving all previous APIs.

  const legacy=W.KVPV_V921||W.KVPV_V92||old;

  const facade=Object.freeze({...legacy,installed:true,version:'9.2.3',tower,

    status(){return {version:'9.2.3',tower:tower.status(false),previous:legacy?.status?.()};}});

  W.KVPV_V922=facade;W.KVPV_V9=facade;W.KVPV_V923=facade;

  console.info('[KVPV V9.2.2] Linh Lung Auto installed. Run KVPV_V922.tower.start({targetFloor:450}) or .start() to keep climbing.');

})();



/* KVPV V9.2.3 — Focus & Response Continuous Monitor (client-only)
 * Run in DevTools > Sources > Snippets, context: game-frame.
 * Purpose: keep screen awake when supported, watch actual page visibility and
 * timer throttling, optionally poll V9.2.2 Tower state more frequently.
 * It does not forge document.hidden/visibilityState, patch browser APIs,
 * send extra server requests or modify fight/HP/skills/buffs.
 * Faster client polling is NOT lower network RTT or faster server processing.
 */

 

(() => {

  'use strict';

  const W = window;

  try { W.KVPV_FOCUS922?.stop?.(); } catch(_){window.KVPV_V1?.diagnostics?.record(_);}

  const S = {

    installed: true, enabled: false, wakeLockEnabled: false, lastPulse: 0, pulses: 0,

    maxGapMs: 0, longGaps: 0, wakeLock: null, wakeLockError: null,

    wakeRequested: false, monitorTimer: null, quickTimer: null,

    visibilityEvents: 0, focusEvents: 0, focusSince: 0,

    phaseChanges: [], previousTowerPhase: null, lastWarning: 0,

    startedAt: 0, quickPollMs: 400

  };

  const ts = () => performance.now();

  const getTower = () => W.KVPV_V922?.tower || W.KVPV_LINHLUNG922 || null;

  const towerState = () => {

    const tower = getTower();

    if (!tower?.status) return null;

    try { return tower.status(false); }

    catch (_) { return null; }

  };

  

  function snapshot() {

    return {

      running: S.enabled,

      pageVisible: document.visibilityState === 'visible',

      documentHasFocus: document.hasFocus(),

      wakeLockActive: S.wakeLock?.released === false,

      wakeLockEnabled: S.wakeLockEnabled,

      wakeLockError: S.wakeLockError,

      monitorPulses: S.pulses,

      longTimerGaps: S.longGaps,

      maximumTimerGapMs: Math.round(S.maxGapMs),

      towerActive: !!towerState()?.active,

      towerPhase: towerState()?.phase || null,

      fastClientPollMs: S.quickPollMs,

      note: 'No synthetic focus. No extra RPC. No guaranteed server speedup.'

    };

  }

  async function requestWakeLock() {

    S.wakeLockError='Blocked game iframe: Wake Lock disabled by design';

    return false;

  }

  function onVisibility() {

    S.visibilityEvents++;

    if (document.visibilityState === 'visible') {

      S.lastPulse = ts(); // ignore foreground transition when measuring timer gaps

      // Wake Lock permanently disabled to avoid iframe Permissions Policy violation.

    }

  }

  function onFocus() { S.focusEvents++; S.focusSince = Date.now(); }

  function onBlur() { S.focusEvents++; }

  function pulse() {

    if (!S.enabled) return;

    const current = ts();

    if (S.lastPulse) {

      const delta = current - S.lastPulse;

      S.maxGapMs = Math.max(S.maxGapMs, delta);

      if (delta > 1300) {

        S.longGaps++;

        if (Date.now() - S.lastWarning > 60000) {

          S.lastWarning = Date.now();

          console.warn('[KVPV FOCUS] Timer gap:', Math.round(delta),

            'ms. Check sleeping tabs, Energy Saver, window occlusion.');

        }

      }

    }

    S.lastPulse = current;

    S.pulses++;

    const p = towerState();

    if (p?.phase && p.phase !== S.previousTowerPhase) {

      S.phaseChanges.push({at: Date.now(), phase: p.phase, floor: p.pendingFloor});

      if (S.phaseChanges.length > 200) S.phaseChanges.shift();

      S.previousTowerPhase = p.phase;

    }

  }

  function quickPoll() {

    if (!S.enabled) return;

    const tower = getTower();

    if (!tower?.tick || !towerState()?.active) return;

    try { tower.tick(); }

    catch (error) {

      console.warn('[KVPV FOCUS] Fast Tower polling encountered an error:', error);

      // Tower's own interval and status remain in charge of server acknowledgements.

    }

  }

  

  function stop() {

    S.enabled = false;

    clearInterval(S.monitorTimer); clearInterval(S.quickTimer);

    S.monitorTimer = S.quickTimer = null;

    document.removeEventListener('visibilitychange', onVisibility);

    W.removeEventListener('focus', onFocus);

    W.removeEventListener('blur', onBlur);

    const lock = S.wakeLock; S.wakeLock = null;

    try { lock?.release?.(); } catch(_){window.KVPV_V1?.diagnostics?.record(_);}

    return snapshot();

  }

  

  function start(opts = {}) {

    if (S.enabled) return snapshot();

    const opt = Number(opts.quickPollMs ?? 400);

    if (!Number.isFinite(opt) || opt < 250 || opt > 1000)

      throw Error('quickPollMs must be between 250 and 1000 ms');

    S.quickPollMs = Math.round(opt);

    // Disabled by default: game-frame iframe cannot request Screen Wake Lock.

    S.wakeLockEnabled = false; // iframe policy: never request Wake Lock

    S.wakeLockError = null;

    S.startedAt = Date.now(); S.enabled = true;

    S.pulses = 0; S.lastPulse = ts(); S.longGaps = 0; S.maxGapMs = 0;

    S.phaseChanges.length = 0; S.previousTowerPhase = null;

    document.addEventListener('visibilitychange', onVisibility);

    W.addEventListener('focus', onFocus);

    W.addEventListener('blur', onBlur);

    S.monitorTimer = setInterval(pulse, 500);

    S.quickTimer = setInterval(quickPoll, S.quickPollMs);

    // Do not modify V9.2.2's fixed loop, or send any standalone RPC.

    // Wake Lock permanently disabled to avoid iframe Permissions Policy violation.

    console.info('[KVPV FOCUS] Active: passive visibility monitoring and fast client polling.');

    console.info('[KVPV FOCUS] Focus cannot be forced when another window/tab is active.');

    return snapshot();

  }

  

  function report() {

    const s = snapshot();

    console.table([s]);

    console.table(S.phaseChanges);

    return {status: s, towerPhaseChanges: [...S.phaseChanges]};

  }

  W.KVPV_FOCUS922 = Object.freeze({start, stop, status: snapshot, report, requestWakeLock});

  console.info('[KVPV FOCUS] Ready (Wake Lock OFF). Run KVPV_FOCUS922.start({quickPollMs:400})');

})();



// Hot-swap the previous Focus module and start with Wake Lock disabled.

 

window.KVPV_FOCUS922.start({quickPollMs:400});



/* V9.2.3 CONTINUOUS SESSION MANAGER
 * Game browser context only. No focus spoofing, ACK forgery, or extra server RPC.
 * If native Tower rejects/times out an ambiguous request, Tower stops safely.
 * Restart requires explicit operator inspection, not automatic replay.
 */

 

(() => {

 'use strict';

 const W=window;

 try { W.KVPV_ALWAYS923?.stop?.(false); } catch(_){window.KVPV_V1?.diagnostics?.record(_);}

 const actor=()=>String((typeof _ot !== 'undefined' ? _ot?.ins?.actorId : null)??'');

 const state={enabled:false,actorId:actor(),checks:0,

   lastCheckAt:0,lastMessage:'Not started',startedAt:0,timer:null,

   autoTower:false,towerInitialized:false};

 const validActor=()=>actor()===state.actorId && !!state.actorId;

 

 function report(){

   const t=W.KVPV_V922?.tower?.status?.(false)||{};

   return {running:state.enabled,actorId:state.actorId,

     checks:state.checks,autoTower:state.autoTower,

     towerActive:!!t.active,towerPhase:t.phase||null,

     towerReason:t.reason||null,retryInSeconds:t.retryInSeconds||0,

     focusRunning:!!W.KVPV_FOCUS922?.status?.()?.running,

     pageVisible:document.visibilityState==='visible',

     lastMessage:state.lastMessage,

     note:'Runs while page is open and JS is executing; cannot force browser focus or reduce server latency.'};

 }

 function monitor(){

   if(!state.enabled)return;

   state.checks++;state.lastCheckAt=Date.now();

   if(!validActor()){

     state.lastMessage='Actor changed; supervisor stopped';

     stop(); return;

   }

   const f=W.KVPV_FOCUS922;

   if(f?.status && !f.status().running) {

     try{f.start({quickPollMs:400});}catch(e){state.lastMessage='Focus retry: '+e;}

   }

   const t=W.KVPV_V922?.tower;

   if(!state.autoTower||!t?.status)return;

   const s=t.status(false);

   if(s.active){state.towerInitialized=true;return;}

   if(state.towerInitialized)return; // Never silently restart an explicitly stopped / unacknowledged RPC

   if(!state.actorId)return;

   try {

     t.start({autoClaim:true,exclusiveDaily:true});

     state.towerInitialized=true;

     state.lastMessage='Tower started; monitoring continuously';

   }catch(e){state.lastMessage='Waiting for tower model: '+String(e);}

 }

 

 function start(options={}){

   if(state.enabled)return report();

   state.actorId=actor();

   if(!state.actorId)throw Error('Choose game-frame after entering character');

   state.autoTower=options.autoTower!==false;

   state.enabled=true;state.startedAt=Date.now();state.lastMessage='Starting';

   state.towerInitialized=false;

   state.timer=setInterval(monitor,5000);monitor();

   console.info('[KVPV ALWAYS923] Continuous monitor on; Linh Lung Tower MANUAL ONLY');

   return report();

 }

 

 function stop(stopTower=true){

   state.enabled=false;clearInterval(state.timer);state.timer=null;

   if(stopTower){

     try{W.KVPV_V922?.tower?.stop?.('Stopped by user');}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

     try{W.KVPV_FOCUS922?.stop?.();}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

   }

   state.lastMessage='Stopped by user';return report();

 }

 W.KVPV_ALWAYS923=Object.freeze({start,stop,status:report,report});

 try{start({autoTower:false});}

 catch(e){console.warn('[KVPV ALWAYS923] Autostart pending: '+String(e));}

})();



/* V9.2.4 - Focused Boss Tinh Than API: existing native model only. */

 

(() => {

  'use strict';

  const D=window.KVPV_DAILY;

  if(!D?.config){console.warn('[V924 TINH THAN] Main Daily not loaded');return;}

  const S=()=>{

    const m=typeof _Ba!=='undefined'?_Ba?._MT?.the_secret_of_the_stars?._Gvt?.instance:null;

    return {version:'9.2.4',enabled:!!D.config.enableTinhThan,

      cloneId:D.config.tinhThanCloneId,publicInvite:!!D.config.autoTeam,

      partySize:Number(m?.teamLength)||0,team:D.teamStatus?.(),

      job:D.quickState?.()};

  };

  window.KVPV_V924_STAR=Object.freeze({

    status:S,

    start(){D.config.enableTinhThan=true;D.config.autoTeam=true;D.config.autoApproveTeam=true;D.start?.();return S();},

    stop(){D.config.enableTinhThan=false;D.config.autoTeam=false;return S();},

    team:()=>D.teamStatus?.()

  });

  console.log('[V924] Tinh Than main + clone1 + Tam Gioi ready',S());

})();



/* V9.2.5 — Linh Lung manual controls (never auto-enter)
 * Existing V9.2.3 controller remains available for explicit player action.
 */

 

(() => {

  'use strict';

  const W=window;

  const tower=()=>W.KVPV_V922?.tower;

  const oldQuest=()=>W.KVPV_V873?.config;

  const ensureManual=()=>{

    const q=oldQuest();

    if(q){q.autoChallenge=false;q.autoOpen=false;}

  };

  ensureManual();

  const status=()=>({

    mode:'manual',

    towerActive:!!tower()?.status?.(false)?.active,

    legacyQuestAutoChallenge:oldQuest()?.autoChallenge??null,

    legacyQuestAutoOpen:oldQuest()?.autoOpen??null,

    continuousMonitor:W.KVPV_ALWAYS923?.status?.()?.running??false,

    continuousAutoTower:W.KVPV_ALWAYS923?.status?.()?.autoTower??null

  });

  W.KVPV_TOWER_MANUAL925=Object.freeze({

    status,

    start(options={}){

      ensureManual();

      if(!tower()?.start)throw Error('Tower unavailable in game-frame');

      return tower().start(options);

    },

    stop(){

      const result=tower()?.stop?.('Manual stop') ?? status();

      ensureManual(); // tower.stop() may restore legacy quest flags

      return result;

    }

  });

  console.info('[V9.2.5] Linh Lung Thap: MANUAL ONLY. KVPV_TOWER_MANUAL925.start() / .stop() / .status()');

})();



/* KVPV V9.2.6 — FAST TINH THAN + TIEN DUYEN DIAGNOSTICS; TOWER MANUAL */

 

(() => {

  'use strict';

  const W=window;

  const D=()=>W.KVPV_DAILY;

  const star=()=>W._Ba?._MT?.the_secret_of_the_stars || (typeof _Ba!=='undefined'? _Ba?._MT?.the_secret_of_the_stars : null);

  

  function status(){

    const d=D(), q=d?.quickState?.(), cfg=d?.config||{};

    const root=star(), model=root?._Gvt?.instance;

    const ui=typeof _ft!=='undefined'?_ft?._Y4n?.ins:null;

    const pane=ui?.isOpened?.(605)?ui.getPanelById?.(605):null;

    const marry=typeof _Ba!=='undefined'?_Ba?._Yo?.marryCopy?._gOt?.ins:null;

    const couple=typeof _Ba!=='undefined'?_Ba?._Yo?._tdt?.instance:null;

    const copyTimes=marry?.copyTime;

    const scene=typeof _Ba!=='undefined'?Number(_Ba?._$a?.SceneUtil?.curScene):null;

    const out={version:'9.2.6',actor:typeof _ot!=='undefined'?String(_ot?.ins?.actorId||''):null,

      running:!!q?.running,currentJob:q?.job,currentStep:q?.step,scene,

      towerMode:W.KVPV_TOWER_MANUAL925?.status?.()?.mode||'unknown',

      tinhThan:{enabled:!!cfg.enableTinhThan,checkMs:cfg.tinhThanMs,modelReady:!!model,

        power:model?.strengthvalue??null,autoConsumable:model?.auto??null,

        teamMembers:model?.teamLength??null,tierWanted:cfg.tinhThanTang,

        tierUI:pane?._bvt??null,layerUI:pane?._wvt??null,lineUI:pane?._Tvt??null,

        team:W.KVPV_V924_STAR?.team?.()},

      tienDuyen:{enabled:!!cfg.enableTienDuyen,checkMs:cfg.tienDuyenMs,

        modelReady:!!marry,copyTimesReady:Array.isArray(copyTimes)&&copyTimes.length>0,

        remaining:marry?Number(marry.maxCopyNum)-Number(marry.copyFightNum):null,

        married:couple?.isMarry?.()??null,merged:marry?.isCombin??null,

        postRewards:W.KVPV_TD925?.status?.()},

      note:'Không ép server cooldown, không tự mua lượt/thuốc, không chạy Linh Lung.'};

    console.log('[KVPV FAST 926]',out);return out;

  }

  W.KVPV_FAST926=Object.freeze({status,diagnostics:status,

    start(){ const d=D(); if(!d?.config)throw Error('KVPV_DAILY missing');

      d.config.enableTienDuyen=true;d.config.enableTinhThan=true;

      d.config.autoTeam=true;d.config.autoApproveTeam=true;

      d.start?.();return status(); },

    stop(){const d=D();if(d?.config){d.config.enableTienDuyen=false;d.config.enableTinhThan=false;}return status();}});

  console.info('[V9.2.6] Tiên Duyên + Tinh Thần FAST enabled; Linh Lung MANUAL. KVPV_FAST926.status()');

})();



/* KVPV V9.2.7 — TD + STAR PRIORITY SELF-CHECK, read-only decision reporting.
 * The real entry/claim/upgrade logic remains owned by KVPV_DAILY above.
 * Never send RPC from the monitor and never auto-run Linh Lung.
 */

 

 



/* KVPV 9.2.8 — nonblocking concurrent supervision.
 * This module DOES NOT issue network game commands. Existing native
 * Auto Daily/V8 modules own exclusive scene transitions and server ACK.
 * Running 3 async lanes does not mean entering 3 scenes simultaneously.
 */

 

 



/*
 * KVPV V9.2.9 — Async Quest Engine / server-state watchdog.
 * Native gameplay executors remain owned by the existing V8/V9 modules.
 * No invented RPC, reward, gold, level, or scene transitions.
 * Only proactive action: ONE guarded nudge of the existing ACK-protected
 * upgrade/reward queue on a newly observed officially completed main quest.
 * The normal queue still decides whether anything can be sent.
 * Linh Lung tower stays manual-only. Main account only.
 */

 

 



/* ===== NEW V9.3.0 RUNE QUEST EXECUTOR ===== */

/*
 * KVPV V9.3.0 - VERIFIED RUNE REFINEMENT QUEST EXECUTOR
 * Native client: _Ba._QV._Wri.ins.runeRefine([position]) sends TzAd;
 * _Ba._QV._Bri.ins.tab is updated from server TuYJ/Trqr.
 * _ft._NY.ins.getCfgById(runeID) provides level cost [1] and next ID.
 * Material 91740001 is rune experience; others must already be in bag.
 * No purchasing, auto-disassembly, free/premium replenishment or direct socket editing.
 * Only unambiguous quest names "Tang/Nang cap Phu Van ... N lan".
 * One native action per server-confirmed rune state, via the existing V8 queue.
 */

 

 













 

 



/* ================= V9.3.2 ASYNC STAR TEMP REWARD ================= */













 

 



/*
 * KVPV V9.3.3 | AUTO KICH HOAT KHUYNH THANH NU BOC | MAIN ONLY
 * Inspected client evidence:
 *   _Ba._Q9._ttt.ins.BeautyInfodirc[1][fairyId].level (server state)
 *   _ft._Ftt.ins.getBeautyFairyIds() and getCfgByIdAndLv(fairyId, level)
 *   cfg[5] -> [materialId, needed]; bag.getItemCountById(materialId)
 *   GUI btnup -> _Ba._Q9._$dt.ins.RiseBeauty(cfg[2], cfg[0])
 *   level 9 is fully activated; levels 0..8 are the picture pieces.
 * This additive background module never purchases materials or upgrades past level 9.
 */

 

 



/* ++++++++++++ KVPV 9.3.4 ESCORT FIX ++++++++++++ */

/*
 * KVPV V9.3.4 — AUTO HO TONG TIEN NU X2 — MAIN ONLY
 * Verified native client:
 *   _Ba._m8._gmi.ins.{sendState,escort,fairyId,isDouble,endTime}
 *   _Ba._m8._bmi.ins.{escortFairy,getFairyAward,getFairyInfo}
 *   sendState 0 = ready to choose/start; 1 = escort in progress; 2 = reward ready
 *   Client UI _Kmi: 0 -> open 229, 1 -> wait, 2 -> getFairyAward().
 *   31005[2][0] daily limit; notify 5464 server info updated.
 * No refreshFairy(), selectBestFairy() or currency-spending calls.
 */

 

 



/* === KVPV COMBAT UNIFIED V3.0 - Ma Than Auto === */



/*
 * KVPV COMBAT UNIFIED V3.0 - addon to load in game-frame.
 * Main attack, movement, ultimate selection, ride, cloak and automatic Ma Than; Boss DPS comparison.
 * CLIENT EXPERIMENT ONLY. No direct WebSocket, packets, fabricated responses or game RPCs.
 * 1 ms is a local threshold, NOT 1000 server-accepted attacks/second.
 * Does not modify shared skill configuration arrays, player attributes, or global timers.
 */

 

(() => {

  'use strict';

  const W = window;

  const daily = W.KVPV_DAILY;

  if (!daily?.config || typeof daily.tuVuotStatus !== 'function') {

    throw Error('[TU VUOT V3.3] Can chay FULL Auto Daily truoc trong game-frame');

  }

  const owner = String(_Ba?._rJ?._O$?.ins?.actorId ?? '');

  if (!owner) throw Error('[TU VUOT V3.3] Chua dang nhap game');

  if (W.__KVPV_OWN_ACTOR_ID && String(W.__KVPV_OWN_ACTOR_ID) !== owner) {

    throw Error('[TU VUOT V3.3] Sai nhan vat');

  }

  const cfg = daily.config;

  const native = () => _Ba?._Co?._Mo?.ins;

  const checkOwner = () => {

    if (String(_Ba?._rJ?._O$?.ins?.actorId ?? '') !== owner) {

      throw Error('[TU VUOT V3.3] Nhan vat da doi, F5 de lam moi');

    }

  };

  

  function status() {

    checkOwner();

    const stage = daily.tuVuotStatus();

    const result = {

      ...stage,

      manualControl: true,

      limitFailures: Number.isFinite(Number(cfg.tuVuotMaxConsecutiveFailures))

        ? cfg.tuVuotMaxConsecutiveFailures : 'vo han',

      limitRejected: Number.isFinite(Number(cfg.tuVuotMaxRejectedEntries))

        ? cfg.tuVuotMaxRejectedEntries : 'vo han',

      nativeAuto: !!native()?.auto,

      currentJob: daily.quickState?.().job ?? null

    };

    console.log('[TU VUOT V3.3]', result);

    return result;

  }

  

  function start() {

    checkOwner();

    cfg.tuVuotMaxConsecutiveFailures = Infinity;

    cfg.tuVuotMaxRejectedEntries = Infinity;

    cfg.asyncStagePriority = true;

    cfg.asyncStagePrioritySpacingMs = 30000;

    if (typeof daily.tuVuotStart === 'function') {

      daily.tuVuotStart();

    } else if (daily.tuVuotStatus()?.locked) {

      daily.tuVuotReset();

    }

    cfg.enableTuVuot = true;

    

    try { W.KVPV_ASYNC928?.resumeStage?.(); }

    catch (e) { console.warn('[TU VUOT V3.3] Async resume:', e); }

    console.log('[TU VUOT V3.3] Bat khong gioi han; doi scheduler khi ranh');

    return status();

  }

  

  function stop() {

    checkOwner();

    cfg.enableTuVuot = false;

    if (typeof daily.tuVuotStop === 'function') daily.tuVuotStop();

    const m = native();

    if (m?.auto === true) m.auto = false;

    try { W.KVPV_ASYNC928?.pauseStage?.(); }

    catch (e) { console.warn('[TU VUOT V3.3] Async pause:', e); }

    console.log('[TU VUOT V3.3] Da tat Tu Vuot, Auto Daily khong dung');

    return status();

  }

  const api = Object.freeze({version:'3.3.0',start,stop,status});

  W.KVPV_TU_VUOT = api;

  // Do not undo a manual pause saved in this tab by the stage guard.

  if(W.KVPV?.stageGuard?.isLocked?.()){

    console.info('[TU VUOT V3.3] Auto-start skipped: manually paused');

  }else start();

})();



/* KVPV WORKFLOWS ASYNC V3.5
 * Auto Daily extension: awaited native ACKs, single-flight jobs, AbortController.
 * IMPORTANT: Combat/skill selector methods MUST remain synchronous (game contract).
 * This extension NEVER changes native RPC methods or sends custom packets.
 * Smelting consumes items irreversibly: review eligible items first.
 */

 

(() => {

  'use strict';

  const W = window;

  const TAG = '[KVPV ASYNC V3.5]';

  const actor = String(_Ba?._rJ?._O$?.ins?.actorId ?? '');

  const daily = W.KVPV_DAILY;

  const world = _C?._Ba?.instance;

  const role = world?.getRole?.(Number(actor));

  if (!actor || !role || !daily?.config || !daily?.quickState ||

      (W.__KVPV_OWN_ACTOR_ID && String(W.__KVPV_OWN_ACTOR_ID) !== actor)) {

    throw Error(TAG + ' Chon game-frame, nap FULL/Auto Daily va nhan vat truoc.');

  }

  if (W.KVPV_ASYNC_V35?.status?.().running) {

    console.info(TAG, 'Already installed');

    return;

  }

  // Refuse hot upgrade if a previous irreversible RPC may still be unresolved.

  const olderSmelt = W.KVPV_SMELT25?.status?.();

  if (olderSmelt && (olderSmelt.pendingIds > 0 ||

      !['idle', undefined].includes(olderSmelt.phase))) {

    throw Error(TAG + ' Smelt V3.4 dang cho ACK/verify. Hay doi xong hoac F5; khong nang cap giua lo.');

  }

  const oldMa = W.KVPV_MATHAN_READY?.status?.();

  if (oldMa && oldMa.requests > oldMa.acks &&

      Date.now() - oldMa.lastAttempt < 30000) {

    throw Error(TAG + ' Ma Than V3.4 dang cho phan hoi. Doi 30s hoac F5 truoc nang cap.');

  }

  for (const name of ['KVPV_SMELT25', 'KVPV_MAIL_AUTO', 'KVPV_MATHAN_READY']) {

    try { W[name]?.stop?.(); } catch (e) { console.warn(TAG, 'Stop old', name, e); }

  }

  // Avoid parallel native/legacy smelt sender.

  if (daily.config.smeltEnabled) daily.config.smeltEnabled.equip = false;

  const groupAbort = new AbortController();

  const signal = groupAbort.signal;

  let running = true;

  const loops = new Map();

    const abortError = () => Object.assign(new Error('Aborted'), {name:'AbortError'});

  const valid = () => running && !signal.aborted &&

    String(_Ba?._rJ?._O$?.ins?.actorId ?? '') === actor &&

    !!world.getRole(Number(actor)) &&

    (!W.__KVPV_OWN_ACTOR_ID || String(W.__KVPV_OWN_ACTOR_ID) === actor);

  const reason = e => String(e?.message || e).slice(0,250);



  function sleep(ms, sig = signal) {

    return new Promise((resolve, reject) => {

      if (sig.aborted) return reject(abortError());

      let timer;

      const onAbort = () => { clearTimeout(timer); sig.removeEventListener('abort', onAbort); reject(abortError()); };

      timer = (W.KVPV_V1?.timers?.setTimeout ?? W.setTimeout)(() => { sig.removeEventListener('abort', onAbort); resolve(); }, Math.max(1,ms));

      sig.addEventListener('abort', onAbort, {once:true});

    });

  }

  function waitNotify(event, ms, sig=signal) {

    return new Promise((resolve, reject) => {

      const notify = _Sa?.notify;

      if (!notify?.on || !notify?.off) return reject(Error('Notify unavailable: '+event));

      if (sig.aborted) return reject(abortError());

      const owner = {};

      let done = false;

      let timer;

      const clean = () => {

        (W.KVPV_V1?.timers?.clearTimeout ?? W.clearTimeout)(timer);

        sig.removeEventListener('abort', onAbort);

        try { notify.off(event, owner, onEvent); } catch(_){window.KVPV_V1?.diagnostics?.record(_);}

      };

      const complete = (err) => {

        if (done) return;

        done = true; clean(); err ? reject(err) : resolve(true);

      };

      const onEvent = () => complete(null);

      const onAbort = () => complete(abortError());

      try { notify.on(event, owner, onEvent); }

      catch(e) { return complete(e); }

      sig.addEventListener('abort', onAbort, {once:true});

      timer = (W.KVPV_V1?.timers?.setTimeout ?? W.setTimeout)(() => complete(Error('ACK '+event+' timeout')), ms);

    });

  }

  // Register callback before sending to avoid missing an immediate ACK.

  async function sendAndWait(event, timeout, send, sig=signal) {

    const notify = _Sa?.notify;

    if (!notify?.on || !notify?.off) throw Error('Notify unavailable: '+event);

    if (sig.aborted) throw abortError();

    return new Promise((resolve,reject)=>{

      const owner={}; let done=false,timer=null;

      const cleanup=()=>{ (W.KVPV_V1?.timers?.clearTimeout ?? W.clearTimeout)(timer); sig.removeEventListener('abort',onAbort);

        try { notify.off(event,owner,onEvent); } catch(_){window.KVPV_V1?.diagnostics?.record(_);} };

      const finish=(error)=>{ if(done)return; done=true; cleanup(); error?reject(error):resolve(true); };

      const onEvent=()=>finish(null);

      const onAbort=()=>finish(abortError());

      try { notify.on(event,owner,onEvent); } catch(e) { finish(e); return; }

      sig.addEventListener('abort',onAbort,{once:true});

      timer=(W.KVPV_V1?.timers?.setTimeout ?? W.setTimeout)(()=>finish(Error('ACK '+event+' timeout')),timeout);

      try { send(); } catch(e) { finish(e); }

    });

  }

  function createLoop(name, interval, work) {

    async function run() {

      while (valid()) {

        try { await work(signal); }

        catch(e) {

          if(e?.name==='AbortError') break;

          console.warn(TAG, name, reason(e));

        }

        if (!valid()) break;

        try { await sleep(interval(), signal); }

        catch(e) { if(e?.name==='AbortError') break; throw e; }

      }

    }

    const task = run().catch(e=>console.warn(TAG,name,'loop failed',reason(e)));

    loops.set(name,task);

    return task;

  }

  function haltState(st, msg) {

    st.halted=true; st.enabled=false; st.reason=msg; st.lastError=msg;

    console.warn(TAG,msg,'Paused: inspect server/bag state before resuming');

  }



  // ---------- EQUIPMENT SMELT: >=25 then drain all, ACK + bag verification ----------

  const smCfg = {enabled:false, intervalMs:4000, threshold:25, batchSize:25,

    ackTimeoutMs:18000, verifyMs:9000};

  const sm = {draining:false,pending:null,running:false,halted:false,phase:'idle',

    sent:0,acked:0,verified:0,items:0,reason:'Disabled until reviewed',lastError:''};

  function eligible() {

    const rows = _Ba?._Ic?._aQ?.ins?.getCanFusionItems?.();

    if (!Array.isArray(rows)) return null;

    const out=[],seen=new Set();

    for (const item of rows) {

      const n = Number(item?.[2]);

      if (Number.isSafeInteger(n) && n>0 && !seen.has(n)) {seen.add(n);out.push(n);}

    }

    return out;

  }

  function idleScene() {

    const q = daily.quickState();

    if(!q?.running || q.job !== 'rảnh') return false;

    const ui = _ft?._Y4n?.ins;

    return ![76,108,528,1688].some(p=>ui?.isOpened?.(p));

  }

  async function smeltJob(sig) {

    if (!valid() || !smCfg.enabled || sm.halted || sm.running) return;

    if (daily.config.smeltEnabled?.equip) daily.config.smeltEnabled.equip=false;

    const before=eligible();

    if (!before) {sm.reason='Waiting for eligible equipment list';return;}

    if (!sm.draining && before.length < smCfg.threshold) {

      sm.reason=`Waiting ${before.length}/${smCfg.threshold}`; return;

    }

    sm.draining=true; sm.running=true;

    try {

      while (valid() && smCfg.enabled && !sm.halted) {

        const ids = eligible();

        if (!ids) {sm.reason='Bag unavailable';break;}

        if (!ids.length) {sm.draining=false;sm.reason='Drained eligible equipment';break;}

        if (!idleScene()) {sm.reason='Waiting Auto Daily idle';break;}

        const rpc = _Ba?._Ic?._oJ?.instance;

        if (typeof rpc?.c2sOneKeyFusion !== 'function') {

          haltState(sm,'Native c2sOneKeyFusion unavailable'); break;

        }

        const batch=ids.slice(0,smCfg.batchSize);

        sm.phase='awaitAck'; sm.pending={ids:batch.slice(),started:Date.now()};

        sm.sent++; sm.reason='Sent '+batch.length+' items; awaiting 5081';

        try {

          await sendAndWait(5081,smCfg.ackTimeoutMs,()=>rpc.c2sOneKeyFusion(batch),sig);

        } catch(e) {

          if (e?.name==='AbortError') throw e;

          haltState(sm,'Smelt ACK uncertain: '+reason(e)); break;

        }

        sm.acked++; sm.phase='verify';

        const until=Date.now()+smCfg.verifyMs;

        let confirmed=false;

        while (valid() && Date.now()<until) {

          const fresh=eligible();

          if(fresh && batch.every(x=>!fresh.includes(x))) {confirmed=true;break;}

          await sleep(300,sig);

        }

        if(!confirmed) {haltState(sm,'ACK 5081 received, but bag did not confirm removal');break;}

        sm.verified++; sm.items+=batch.length;

        sm.pending=null;sm.phase='idle';

        sm.reason='Confirmed '+batch.length+' removed';

        await sleep(250,sig); // Yield so Auto Daily/UI can progress.

      }

    } finally {

      sm.running=false;

      if(!sm.halted && !sm.pending)sm.phase='idle';

    }

  }

  function smStatus() { const list=eligible(); return {version:'3.5 async',enabled:smCfg.enabled,

    running:sm.running,halted:sm.halted,phase:sm.phase,eligible:list?.length??null,

    preview:list?.slice(0,25)??null,pending:sm.pending?.ids??[],draining:sm.draining,

    sent:sm.sent,acks:sm.acked,verified:sm.verified,confirmedItems:sm.items,

    reason:sm.reason,lastError:sm.lastError}; }

  async function smEnable(on=true) {

    if(on && (sm.halted || sm.pending)) throw Error('Uncertain smelt batch; inspect bag and call resetAfterReview()');

    smCfg.enabled=!!on;

    if (!on) sm.reason='Disabled by user';

    // The background loop processes the work; enabling never waits for all items.

    return smStatus();

  }

  async function smResetAfterReview() {

    if(sm.running) throw Error('Wait until running batch settles.');

    sm.pending=null;sm.halted=false;sm.phase='idle';sm.lastError='';sm.reason='Manually reset after review';

    smCfg.enabled=false; // Re-arm explicitly; no automatic destruction after a failure.

    return smStatus();

  }

  const smAPI={version:'3.5',status:smStatus,check:()=>smeltJob(signal),

    setEnabled:smEnable,resetAfterReview:smResetAfterReview,

    preview:()=>eligible()?.slice(0,25)??null,

    stop:()=>{smCfg.enabled=false;sm.reason='Disabled (async tasks may finish ACK)';return smStatus();}};

  W.KVPV_SMELT25=smAPI;



  // ---------- MA THAN: async summon and verify ----------

  const maCfg={enabled:true,onlyPvECombat:false,pollMs:200,ackTimeoutMs:15000};

  const ma={polls:0,requests:0,acks:0,confirmed:0,halted:false,inFlight:false,

    consecutiveReady:0,lastKey:'',reason:'Awaiting server state',lastError:''};

  function maSnapshot(){

    const m=_Ba?._u3?._YQ?.ins,now=Number(_Sa?.svrTime),

      end=Number(m?.endTimer),call=Number(m?.callEndTimer),selected=Number(m?.msShowid),

      summoned=Number(world.getRole(Number(actor))?.property?.get?.('warcraft')?.[0])>0;

    const validClock=Number.isFinite(now)&&now>0&&Number.isFinite(end)&&end>=0&&

      Number.isFinite(call)&&call>=0;

    return {serverNow:now,callEndTimer:call,endTimer:end,selectedMaThan:selected,

      summoned,summoning:validClock&&end>now,

      ready:validClock&&selected>0&&!summoned&&end<=now&&call<=now,

      validClock};

  }

  function pveCombat() {

    try {const c=world.getRole(Number(actor))?.getComponent(_d._Yct._Het), t=c?.target;

      return Number(t?.property?.get?.('type'))===1&&c?.isValidTarget?.()===true&&c?.isValidRange?.()===true;}

    catch(_){return false;}

  }

  async function summonJob(sig) {

    if(!valid() || !maCfg.enabled || ma.halted || ma.inFlight) return;

    ma.polls++;

    const s=maSnapshot();

    if (!s.validClock || !s.selectedMaThan) {ma.reason='Not ready/selected';return;}

    if(!s.ready || _Ba?._rJ?._O$?.ins?.isDead===true) {

      ma.consecutiveReady=0;ma.reason=s.summoned?'Summoned':'Not ready or dead';return;

    }

    if(maCfg.onlyPvECombat&&!pveCombat()) {ma.reason='Waiting PvE target';return;}

    const key=s.selectedMaThan+'/'+s.callEndTimer;

    if(ma.lastKey===key) {ma.reason='Cycle already attempted; no duplicate summon';return;}

    ma.consecutiveReady++;

    if(ma.consecutiveReady<2) {ma.reason='Confirming ready';return;}

    ma.consecutiveReady=0;ma.inFlight=true;ma.lastKey=key;ma.requests++;

    const native=_Ba?._u3?._ern?.ins;

    try {

      if(typeof native?.CallBackSpiritEquipShow!=='function')throw Error('Native summon missing');

      ma.reason='Waiting 6365 summon ACK';

      await sendAndWait(6365,maCfg.ackTimeoutMs,()=>native.CallBackSpiritEquipShow(),sig);

      ma.acks++;

      const until=Date.now()+4500;

      while(valid() && Date.now()<until) {

        const now=maSnapshot();

        if(now.summoned || now.summoning || now.callEndTimer!==s.callEndTimer) {

          ma.confirmed++;ma.reason='Server state confirms Ma Than';return;

        }

        await sleep(250,sig);

      }

      ma.reason='ACK received; transformation state unverified (will not resend this cycle)';

    } catch(e) {

      if(e?.name==='AbortError')throw e;

      ma.halted=true;ma.reason='Summon uncertain: '+reason(e);ma.lastError=ma.reason;

      console.warn(TAG,ma.reason);

    } finally {ma.inFlight=false;}

  }

  function maStatus(){return {version:'3.5 async',...maSnapshot(),...maCfg,...ma,

    note:'Native game combat; no speed overrides'};}

  async function maEnable(on=true) {

    if(on && ma.halted)throw Error('Summon uncertain: inspect before resetAfterReview()');

    maCfg.enabled=!!on;

    return maStatus();

  }

  async function maResetAfterReview() {

    if(ma.inFlight)throw Error('Summon request still in flight');

    ma.halted=false;ma.lastError='';maCfg.enabled=false;

    ma.reason='Reset after review; re-enable manually';return maStatus();

  }

  const maAPI={version:'3.5',status:maStatus,setEnabled:maEnable,

    setCombatOnly:async on=>{maCfg.onlyPvECombat=!!on;return maStatus();},

    setPollMs:async n=>{n=Number(n);if(!Number.isFinite(n)||n<100||n>5000)throw Error('100..5000ms');maCfg.pollMs=n;return maStatus();},

    check:()=>summonJob(signal),resetAfterReview:maResetAfterReview,

    stop:()=>{maCfg.enabled=false;return maStatus();}};

  W.KVPV_MATHAN_READY=maAPI;



  // ---------- MAIL: native receive, async confirmation from model ----------

  const mailModel=_Ba?._dYt?._rpn?.ins,mailRPC=_Ba?._dYt?._pYt?.ins;

  const mailCfg={enabled:true,pollMs:20000,refreshMs:120000,ackTimeoutMs:20000};

  const mail={running:false,halted:false,checks:0,requests:0,confirmed:0,refreshes:0,

    lastRefresh:0,lastSignature:'',pending:false,reason:'Waiting',lastError:''};

  function attachments(){

    const byId=new Map();

    for (const rows of [mailModel?.emlA1Data,mailModel?.emlA2Data]) {

      if(!Array.isArray(rows))continue;

      for(const m of rows) {

        if(!Array.isArray(m)||m.length<9||m[8]===249||Number(m[5])>=2||

           !Array.isArray(m[6])||!m[6].length)continue;

        byId.set(String(m[0]),m);

      }

    }

    return [...byId.values()];

  }

  const mailSignature=rows=>JSON.stringify(rows.map(m=>[String(m[0]),Number(m[5]),Number(m[8])]).sort((a,b)=>a[0].localeCompare(b[0])));

  function mailSafety(rows){

    const bag=_Ba?._Ic?._aQ?.ins,thresholds=_ft?._gY?.ins;

    if(typeof bag?.getBagLeftNumById!=='function')return {ok:false,reason:'Bag slots unavailable'};

    let c11=0,c8=0,c14=0;

    for(const r of rows)for(const item of r[6]){

      const id=Number(item?.[0]),n=Number(item?.[1]);

      if(!Number.isSafeInteger(id)||id<=0||!Number.isFinite(n)||n<=0)return {ok:false,reason:'Invalid attachment'};

      const t=Math.trunc(id/1e7);

      if(t===11)c11+=n;if(t===8)c8++;if(t===14)c14++;

    }

    if(c11 && bag.getBagLeftNumById(11)<c11)return {ok:false,reason:'Pet bag full'};

    for(const [type,count,limitId] of [[8,c8,10012],[14,c14,10020]]){

      if(!count)continue;

      const min=Number(thresholds?.getCfgById?.(limitId)?.[2]?.[0]);

      const left=Number(bag.getBagLeftNumById(type));

      if(!Number.isFinite(min)||!Number.isFinite(left)||left<=min||left<count)

        return {ok:false,reason:'Bag '+type+' lacks free slots'};

    }

    return {ok:true};

  }

  async function mailJob(sig) {

    if(!valid()||!mailCfg.enabled||mail.halted||mail.running||!mailModel||!mailRPC)return;

    mail.checks++; mail.running=true;

    try {

      if(!mailModel.getAttach && Date.now()-mail.lastRefresh>mailCfg.refreshMs &&

         typeof mailRPC.c_reqEmailCount==='function') {

        mail.lastRefresh=Date.now();mail.refreshes++;

        mailRPC.c_reqEmailCount();

      }

      if(!mailModel.hasEml || !Array.isArray(mailModel.emlDataShow) || mailModel.getAttach) {

        mail.reason='No loaded mail / pending native request';return;

      }

      const rows=attachments();

      if(!rows.length) {mail.reason='No claimable attachments';return;}

      const safe=mailSafety(rows);

      if(!safe.ok) {mail.reason=safe.reason;return;}

      if(typeof mailRPC.getAwardAll!=='function') {haltState(mail,'Native getAwardAll missing');return;}

      mail.pending=true;mail.lastSignature=mailSignature(rows);

      // Calls native once and observes mailbox state; never deletes mail.

      mailRPC.getAwardAll();mail.requests++;

      const until=Date.now()+mailCfg.ackTimeoutMs;

      while(valid()&&Date.now()<until) {

        const now=attachments();

        if(!now.length || mailSignature(now)!==mail.lastSignature) {

          mail.confirmed++;mail.reason='Mailbox confirmed changed';return;

        }

        await sleep(500,sig);

      }

      haltState(mail,'Mail claim result not confirmed; no automatic retry');

    } catch(e) {

      if(e?.name==='AbortError')throw e;

      haltState(mail,'Mail error: '+reason(e));

    } finally {mail.pending=false;mail.running=false;}

  }

  function mailStatus(){return {version:'3.5 async',...mailCfg,...mail,

    claimable:attachments().length,mailAvailable:!!mailModel};}

  const mailAPI={version:'3.5',status:mailStatus,check:()=>mailJob(signal),

    refresh:async()=>{mail.lastRefresh=0;await mailJob(signal);return mailStatus();},

    setPollMs:async n=>{n=Number(n);if(!Number.isFinite(n)||n<5000||n>300000)throw Error('5000..300000ms');mailCfg.pollMs=n;return mailStatus();},

    setEnabled:async on=>{if(on && mail.halted)throw Error('Review uncertain mail before resetAfterReview');mailCfg.enabled=!!on;return mailStatus();},

    resetAfterReview:async()=>{if(mail.running)throw Error('Mail pending');mail.halted=false;mailCfg.enabled=false;mail.reason='Review reset; enable manually';return mailStatus();},

    stop:()=>{mailCfg.enabled=false;return mailStatus();}};

  W.KVPV_MAIL_AUTO=mailAPI;



  

  // Switching native scene flags must remain synchronous inside Auto Daily's callbacks.

  // Async control facade gives callers an awaitable completion result without RPC spam.

  const stageAPI={

    async start(){

      if(!valid())throw Error('Actor changed');

      const d=daily.config;

      d.tuVuotMaxConsecutiveFailures=Infinity;

      d.tuVuotMaxRejectedEntries=Infinity;

      d.asyncStagePriority=true;

      d.asyncStagePrioritySpacingMs=30000;

      if(typeof daily.tuVuotStart==='function')daily.tuVuotStart();

      else if(daily.tuVuotStatus?.().locked)daily.tuVuotReset?.();

      d.enableTuVuot=true;

      W.KVPV_ASYNC928?.resumeStage?.();

      await Promise.resolve();

      return this.status();

    },

    async stop(){

      daily.config.enableTuVuot=false;

      daily.tuVuotStop?.();

      const native=_Ba?._Co?._Mo?.ins;

      if(native?.auto===true)native.auto=false;

      W.KVPV_ASYNC928?.pauseStage?.();

      await Promise.resolve();

      return this.status();

    },

    status(){return {version:'3.5 async',...daily.tuVuotStatus?.(),

      enabled:!!daily.config.enableTuVuot,

      currentJob:daily.quickState?.().job??null};}

  };

  W.KVPV_TU_VUOT_ASYNC=stageAPI;



  // ---------- ASYNC UI / CONTROL ----------

  async function stopAll(){

    if(!running)return;

    running=false;

    groupAbort.abort();

    smCfg.enabled=maCfg.enabled=mailCfg.enabled=false;

    await Promise.allSettled([...loops.values()]);

    for(const [name,obj] of [['KVPV_SMELT25',smAPI],['KVPV_MATHAN_READY',maAPI],

      ['KVPV_MAIL_AUTO',mailAPI],['KVPV_TU_VUOT_ASYNC',stageAPI]]) {

      if(W[name]===obj)delete W[name];

    }

    if(W.KVPV_ASYNC_V35===api)delete W.KVPV_ASYNC_V35;

    console.log(TAG,'Stopped; engine combat and original Auto Daily remain running');

  }

  

  function status(){ return {running:valid(),smelt:smStatus(),maThan:maStatus(),mail:mailStatus(),stage:stageAPI.status()}; }

  const api={version:'3.5.0',status,stop:stopAll,sleep,

    smelt:smAPI,maThan:maAPI,mail:mailAPI,stage:stageAPI,



  };

  W.KVPV_ASYNC_V35=api;

  createLoop('smelt',()=>smCfg.intervalMs,smeltJob);

  createLoop('maThan',()=>maCfg.pollMs,summonJob);

  createLoop('mail',()=>mailCfg.pollMs,mailJob);

  console.info(TAG,'Loaded; async loops live. Smelt is OFF until explicitly enabled after reviewing eligible items.');

  console.table([{smeltEnabled:smCfg.enabled,maThanEnabled:maCfg.enabled,

    mailEnabled:mailCfg.enabled,maThanPollMs:maCfg.pollMs}]);

})();



/* ===== V11.13 RESOURCE BACKGROUND BEGIN ===== */







 

(() => {

  'use strict';

  const W=window, TAG='[V11.13 TAI NGUYEN NEN]';

  const actor=String(typeof _Ba==='undefined'?'':_Ba?._rJ?._O$?.ins?.actorId??'');

  const D=W.KVPV_DAILY;

  if(!actor || !D?.config || (W.__KVPV_OWN_ACTOR_ID && actor!==String(W.__KVPV_OWN_ACTOR_ID))){

    console.warn(TAG,'Chua co nhan vat/Auto Daily phu hop'); return;

  }

  if(W.KVPV_BG_RESOURCES?.version==='11.15') {

    console.info(TAG,'Da cai, khong tao them timer');return;

  }

  // Do not replace an operation whose acknowledgement is still unresolved.

  const legacy=W.KVPV_SMELT25?.status?.();

  if(legacy && (legacy.running || legacy.pending?.length || legacy.phase==='awaitAck'||legacy.phase==='verify')){

    console.warn(TAG,'Dung luyen cu dang cho ket qua; khong nap chong. F5 sau khi xong.');return;

  }

  const now=()=>Date.now();

  const keys=['equip','holy','pet','stone','props','strength','mastery','soulStone','soulForge','devour','gearCraft'];

  const CFG={active:true, pollMs:4000, minBetweenMs:1100, ackMs:18000, verifyMs:6000,

    maxBatch:{equip:25,holy:15,pet:30,stone:1,props:1},

    enabled:{equip:true,holy:true,pet:true,stone:true,props:true,

      strength:true,mastery:true,soulStone:true,soulForge:true,devour:true,gearCraft:true},

    protectedUIDs:[], protectedItemIds:[], excludedRecipes:[], keepByItemId:{},

    // Background means no waiting for Auto Daily to become idle.

    runDuringCombat:true, forbidOpenPanels:[76,108,528,1688],

    

    skipGearTier4:true, preserveDivineStones:true,

    

    

    gearCraft:{approvedRecipeIds:[],approvedMaterialIds:[],maxComponents:8}};

  const ST={actor,running:true, timer:null, busy:false, pending:null,

    cursor:0,lastRequestAt:0,scans:0,requests:0,confirmed:0,

    halted:Object.fromEntries(keys.map(k=>[k,false])),

    reasons:Object.fromEntries(keys.map(k=>[k,'Chua quet'])),

    stats:Object.fromEntries(keys.map(k=>[k,{requests:0,acks:0,verified:0,errors:0}])),

    history:[],error:null};

  const history=(key,event,detail='')=>{

    ST.history.push({at:new Date().toISOString(),key,event,detail:String(detail).slice(0,260)});

    if(ST.history.length>120)ST.history.shift();

    if(event==='halted')console.warn(TAG,key,detail);

  };

  const valid=()=>ST.running && String(_Ba?._rJ?._O$?.ins?.actorId??'')===actor &&

    !W.__KVPV_UNIVERSAL_HALTED;

  const num=x=>Number.isSafeInteger(Number(x))&&Number(x)>0;

  const bag=()=>_Ba?._Ic?._aQ?.ins;

  const notify=()=>typeof _Sa==='undefined'?null:_Sa?.notify;

  const sleep=ms=>new Promise(resolve=>(W.KVPV_V1?.timers?.setTimeout ?? W.setTimeout)(resolve,ms));

  function protect(itemId,uid) {

    return CFG.protectedItemIds.map(String).includes(String(itemId)) ||

      CFG.protectedUIDs.map(String).includes(String(uid));

  }

  function nativeSmelt(kind){

    const b=bag();

    const holy=_Ba?._MT?.immortalsEquipSb?._Mtt?.ins;

    let rows=null;

    try {

      rows=kind==='equip'?b?.getCanFusionItems?.():

        kind==='pet'?b?.getAnmlFusions?.():holy?.getSmeltRank?.();

    }catch(e){ST.reasons[kind]='Danh sach chua san sang: '+e.message;return null;}

    if(!Array.isArray(rows))return null;

    const seen=new Set(); const out=[];

    for(const row of rows){

      if(!Array.isArray(row)||!num(row[2]))continue;

      if(kind==='holy'&&Array.isArray(row?.[4]?.[1])&&row[4][1].length)continue; // never destroy holy gear with gold stats

      const uid=Number(row[2]);

      if(seen.has(uid)||protect(row[0],uid))continue;

      seen.add(uid);out.push(uid);

    }

    return out;

  }

  function recipeRows(){

    const c=_ft?._NZ?.ins;

    try {

      if(typeof c?.getComposeCfgByTclass==='function'){

        const a=c.getComposeCfgByTclass(1),b=c.getComposeCfgByTclass(2);

        if(Array.isArray(a)&&Array.isArray(b))return [...a,...b];

      }

      const rows=_Sa?.getCfg?.('item_compose');

      return Array.isArray(rows)?rows:[];

    }catch(_){return [];}

  }

  function recipeCandidates(kind){

    const b=bag();

    if(!b?.isBagInited || typeof b.getItemCountById!=='function' ||

      typeof b.getItemsById!=='function')return [];

    const cfg=D.config||{};

    const excluded=new Set([...(cfg.composeExcludedRecipes||[]),...CFG.excludedRecipes].map(String));

    const protectedIds=new Set([...(cfg.composeProtectedItems||[]),...CFG.protectedItemIds].map(String));

    const seen=new Set(),out=[];

    const type=kind==='stone'?1:2;

    for(const r of recipeRows()){

      const id=Number(r?.[0]),result=Number(r?.[1]);

      if(!num(id)||!num(result)||seen.has(id)||excluded.has(String(id))||

        Number(r?.[3]?.[0])!==type)continue;

      seen.add(id);

      // Fail-closed for tier-4 equipment and divine-stone recipes.

      // Native getStageById returns equipment tier; other item kinds may be unknown.

      if(CFG.skipGearTier4 && typeof _et!=='undefined' &&

         typeof _et?.getStageById==='function' && Number(_et.getStageById(result))===4)continue;

      const mats=r[6];

      if(!Array.isArray(mats)||mats.length<1||mats.length>4)continue;

      const uidList=[],matIds=[],counts=[]; let ok=true;

      for(const m of mats){

        const itemId=Number(m?.[0]),need=Number(m?.[1]);

        if(!num(itemId)||!num(need)||protectedIds.has(String(itemId))||matIds.includes(itemId)) {ok=false;break;}

        if(CFG.preserveDivineStones && typeof _et!=='undefined' &&

           typeof _et?.getNameById==='function' &&

           /đá\s*thần\s*trang|da\s*than\s*trang/i.test(String(_et.getNameById(itemId)))){ok=false;break;}

        const remain=Math.max(0,Number(CFG.keepByItemId[itemId]??cfg.composeKeepByItemId?.[itemId]??0)||0);

        const count=Number(b.getItemCountById(itemId));

        const stacks=b.getItemsById(itemId);

        if(!Number.isFinite(count)||count-remain<need||!Array.isArray(stacks)||!stacks.length||

          !num(stacks[0]?.[2])||Number(stacks[0]?.[1])<need||

          protect(itemId,stacks[0][2])) {ok=false;break;}

        uidList.push(stacks[0][2]);matIds.push(itemId);counts.push(count);

      }

      if(ok)out.push({id,result,kind,uidList,matIds,counts,qty:1});

    }

    return out.sort((a,b)=>a.id-b.id);

  }

  

  const fmtDict=(d)=>d?.keys?.map(k=>`${k}:${JSON.stringify(d.get(k))}`).join('|')??null;

  const safeQty=id=>Number(bag()?.getItemCountById?.(Number(id))??0);

  function quickInfo(){

    const m=_Ba?._Agt?._Rgt?.ins,levels=m?.partLev,api=_Ba?._Agt?._qgt?.ins;

    if(typeof api?.oneKeyUp!=='function'||m?.isCanUpEquip!==true)return null;

    const sig=fmtDict(levels);

    return sig?{kind:'strength',before:sig,probe:()=>fmtDict(_Ba?._Agt?._Rgt?.ins?.partLev)}:null;

  }

  function masteryInfo(){

    const m=_Ba?._q7?._QQ?.inst,api=_Ba?._q7?._zen?.inst;

    if(typeof api?.onUpStrenghtSuit!=='function'||!m?.levState?.[1])return null;

    const probe=()=>JSON.stringify(_Ba?._q7?._QQ?.inst?.levState??null);

    return {kind:'mastery',before:probe(),probe};

  }

  function stoneInfo(){

    const m=_Ba?._ZE?._Qgt?.ins,cfg=_ft?._Qyn?.ins,

      rpc=_Ba?._ZE?._Jgt?.ins,slots=m?.getValueByPos?.(),

      parts=_Ba?._rJ?._O$?.ins?.equipsDic?.keys,rows=bag()?.getItemsByBagType?.(2);

    if(typeof rpc?.oneKeyHandler!=='function'||!slots?.get||!Array.isArray(parts)||

       !Array.isArray(rows)||typeof cfg?.getCfgById!=='function')return null;

    const gems=rows.map(r=>{const c=cfg.getCfgById(Number(r?.[0]));return c?

      {id:Number(r[0]),type:Number(c[3]),level:Number(c[5])}:null;}).filter(Boolean);

    for(const v of parts){

      const part=Number(v);if(!Number.isInteger(part)||part<1||part>10)continue;

      for(let slot=0;slot<5;slot++){

        const id=slots.get(part*10+slot),c=id==null?null:cfg.getCfgById(id);

        let action=null;

        if(id==null){if((slot!==0||m.vipIsOpen) && gems.some(x=>slot===0||x.type===slot))action=0;}

        else if(c){

          if(gems.some(x=>x.type===Number(c[3])&&x.level>Number(c[5])))action=1;

          else if(Number(c[5])<Number(cfg.stoneMaxLv)&&Number(c[6])>1&&

            safeQty(id)+1>=Number(c[6]))action=2;

        }

        if(action===null)continue;

        const probe=()=>fmtDict(_Ba?._ZE?._Qgt?.ins?.getValueByPos?.());

        const before=probe();if(before==null)continue;

        return {kind:'soulStone',part,action,before,probe};

      }

    }

    return null;

  }

  function forgeInfo(){

    const m=_Ba?._eW?._pEt?.inst,rpc=_Ba?._eW?._dEt?.inst,

      parts=_Ba?._rJ?._O$?.ins?.equipsDic?.keys;

    if(typeof rpc?.ZhOperOneKey!=='function'||!Array.isArray(m?.zhList)||

       !Array.isArray(parts)||typeof m?.getCanUpZH!=='function')return null;

    

    const material=Number(m?._mtItemID?.[0]);

    if(!Number.isSafeInteger(material)||material<=0||safeQty(material)<=0)return null;

    if(!material)return null;

    if(!parts.some(p=>{try{return Number(p)>0&&Number(p)<=10&&m.getCanUpZH(Number(p))===true;}catch(_){return false;}}))return null;

    const probe=()=>JSON.stringify(_Ba?._eW?._pEt?.inst?.zhList?.map(x=>x?[x[1],x[2]]:null)??null);

    return {kind:'soulForge',material,before:probe(),probe};

  }

  function devourInfo(){

    const m=_Ba?._u3?._YQ?.ins,rpc=_Ba?._u3?._ern?.ins;

    if(typeof rpc?.SpiritEquipOneKeySoulEatingUP!=='function'||

       typeof m?.checkSHRP!=='function'||typeof m?.soulEatingexp!=='function')return null;

    // Original native 'ready' check includes existing gear and enough soul-eating EXP.

    // Never smelt blood souls / buy stones to manufacture EXP automatically.

    if(!(Number(m.soulEatingexp())>0)||m.checkSHRP()!==true)return null;

    const probe=()=>JSON.stringify([m.soulEatingexp(),

      ...[1,2,3,4,5,6].map(p=>m.soulEatingpartlvdic?.(p))]);

    return {kind:'devour',before:probe(),probe};

  }



  

  

  

  function gearCraftInfo(){

    const c=_ft?._Cji?.ins, m=_Ba?._k6?._rRt?.ins, b=bag();

    if(!c?.getCfgById||!m||!b?.isBagInited||

      typeof b.getItemsById!=='function'||typeof b.getItemCountById!=='function'||

      typeof _et?.getStageById!=='function'||typeof _et?.getTypeById!=='function')return null;

    const approved=[...new Set(CFG.gearCraft.approvedRecipeIds.map(Number))].filter(num);

    const allowedMats=new Set(CFG.gearCraft.approvedMaterialIds.map(String));

    const special=_Ba?._MT?.immortalsEquip?._mQ?.ins;

    const gearTypes=new Set([5,8,10,11,12,13]);

    for(const recipeId of approved.slice(0,100)){

      let r;try{r=c.getCfgById(recipeId);}catch(_){continue;}

      if(!Array.isArray(r)||Number(r[0])!==recipeId ||

        ![807,808].includes(Number(r?.[3]?.[0])))continue;

      const result=Number(r[1]);

      const outTier=Number(_et.getStageById(result));

      const outType=Number(_et.getTypeById(result));

      if(!num(result)||!gearTypes.has(outType)||!Number.isInteger(outTier)||

        outTier<1||outTier>=4)continue;  // Tier 4 is *always* forbidden.

      // Native's first component list is core materials, second list supplements.

      const source=[...(Array.isArray(r[5])?r[5]:[]),

                    ...(Array.isArray(r[6])?r[6]:[])];

      if(!source.length||source.length>CFG.gearCraft.maxComponents)continue;

      const uidList=[],matIds=[],counts=[],chosen=[];

      const used=new Set();let safe=true;

      for(const pair of source){

        const itemId=Number(pair?.[0]),qty=Number(pair?.[1]);

        if(!num(itemId)||!Number.isInteger(qty)||qty<1||qty>8||

          protect(itemId,null)){safe=false;break;}

        const itemType=Number(_et.getTypeById(itemId));

        const itemTier=Number(_et.getStageById(itemId));

        const isGear=gearTypes.has(itemType);

        // Even approved recipes cannot consume a tier-4 gear ingredient.

        if(isGear&&(!Number.isInteger(itemTier)||itemTier<1||itemTier>=4)){

          safe=false;break;

        }

        if(!isGear&&!allowedMats.has(String(itemId))){safe=false;break;}

        const name=String(_et.getNameById?.(itemId)??'');

        if(!name||/đá\s*thần\s*trang|da\s*than\s*trang|thần\s*trang/i.test(name)){

          safe=false;break;

        }

        if(isGear&&typeof m.getPlayerIsChuanDai==='function'&&

          m.getPlayerIsChuanDai(itemId)){safe=false;break;}

        const count=Number(b.getItemCountById(itemId));

        const reserved=Math.max(0,Number(CFG.keepByItemId[itemId]??0)||0);

        if(!Number.isFinite(count)||count-reserved<qty){safe=false;break;}

        const rows=b.getItemsById(itemId);

        if(!Array.isArray(rows)){safe=false;break;}

        let found=0;

        for(const row of rows){

          const uid=Number(row?.[2]);

          if(!num(uid)||used.has(uid)||protect(itemId,uid))continue;

          // Do not use equipment carrying inherited/valuable traits.

          if(isGear){

            if(!special||typeof special.getAnJinQuality!=='function'||

              typeof special.getAnJinSkillAndLv!=='function')continue;

            try{if(Number(special.getAnJinQuality(row))!==0||

              special.getAnJinSkillAndLv(row))continue;}catch(_){continue;}

          }

          if(Number(row?.[1])!==1)continue; // Only unique 1x pieces; no ambiguous stacks.

          used.add(uid);uidList.push(uid);chosen.push(row);found++;

          if(found>=qty)break;

        }

        if(found!==qty){safe=false;break;}

        matIds.push(itemId);counts.push(count);

      }

      if(!safe||uidList.length>CFG.gearCraft.maxComponents)continue;

      // The native UI normally stops at skill inheritance / better equipped items.

      // A missing safety check means unknown, not permission to craft.

      if(typeof m.isUpMe!=='function')continue;

      try {const better=m.isUpMe(chosen);if(!Array.isArray(better)||better.length)continue;}

      catch(_){continue;}

      return {kind:'gearCraft',id:recipeId,result,outputTier:outTier,

        uidList,matIds,counts,qty:1};

    }

    return null;

  }

  const v1114Select={strength:quickInfo,mastery:masteryInfo,

    soulStone:stoneInfo,soulForge:forgeInfo,devour:devourInfo};



  function select(kind){

    if(['strength','soulStone','soulForge','stone','props'].includes(kind)&&W.KVPV_RED_DOT_MODULE?.ownsProgression?.())return null;

    if(['equip','holy','pet'].includes(kind)){

      const ids=nativeSmelt(kind);

      if(!ids)return null;

      return ids.length?{kind,ids:ids.slice(0,CFG.maxBatch[kind])}:null;

    }

    if(v1114Select[kind])return v1114Select[kind]();

    if(kind==='gearCraft')return gearCraftInfo();

    const c=recipeCandidates(kind);

    return c.length?{...c[0]}:null;

  }

  function sender(op){

    if(op.kind==='equip'){

      const o=_Ba?._Ic?._oJ?.instance;

      if(typeof o?.c2sOneKeyFusion!=='function')throw Error('c2sOneKeyFusion unavailable');

      o.c2sOneKeyFusion(op.ids);

    }else if(op.kind==='holy'){

      const o=_Ba?._MT?.immortalsEquipSb?._xtt?.ins;

      if(typeof o?.oneKeySmelt!=='function')throw Error('oneKeySmelt unavailable');

      o.oneKeySmelt(op.ids);

    }else if(op.kind==='pet'){

      const o=_Ba?._Ol?._C0n?.ins;

      if(typeof o?.oneKeyResolve!=='function')throw Error('oneKeyResolve unavailable');

      o.oneKeyResolve([op.ids]);

    }else if(op.kind==='strength'){

      _Ba._Agt._qgt.ins.oneKeyUp();

    }else if(op.kind==='mastery'){

      _Ba._q7._zen.inst.onUpStrenghtSuit();

    }else if(op.kind==='soulStone'){

      _Ba._ZE._Jgt.ins.oneKeyHandler([op.part,op.action]);

    }else if(op.kind==='soulForge'){

      _Ba._eW._dEt.inst.ZhOperOneKey(op.material);

    }else if(op.kind==='devour'){

      _Ba._u3._ern.ins.SpiritEquipOneKeySoulEatingUP();

    }else{

      if(typeof _v==='undefined'||typeof _v?.ins?.send!=='function')throw Error('Compose native socket unavailable');

      if(op.kind==='gearCraft'){

        const fresh=gearCraftInfo();

        if(!fresh||fresh.id!==op.id||fresh.outputTier>=4||

           fresh.uidList.join(',')!==op.uidList.join(','))

          throw Error('Nguyên liệu Chế Tạo đã thay đổi; hủy thao tác');

      }

      _v.ins.send('TdKp',[op.id,op.uidList,op.qty,0]); // native client recipe call; no new opcode

    }

  }

  const eventCode={equip:5081,holy:5765,pet:6297,stone:5225,props:5225,gearCraft:5225,

    strength:5221,mastery:6449,soulStone:5197,soulForge:5580,devour:6358};

  function sendWithAck(op,timeout){

    const n=notify(),event=eventCode[op.kind];

    if(!n?.on||!n?.off) return Promise.reject(Error('Native notify unavailable'));

    return new Promise((resolve,reject)=>{

      const owner={};let done=false;let timer=null;

      function clean(){(W.KVPV_V1?.timers?.clearTimeout ?? W.clearTimeout)(timer);try{n.off(event,owner,onAck);}catch(_){window.KVPV_V1?.diagnostics?.record(_);}}

      function finish(err,result){if(done)return;done=true;clean();err?reject(err):resolve(result);}

      function onAck(){

        // 5225 is shared; serial single-flight guarantees this sender is sole BG operation,

        // but other game UI may still issue a composition request; bag delta must verify.

        const reply=['stone','props','gearCraft'].includes(op.kind)

          ?_Ba?._Zgt?._n6t?.ins?.ComposeReply:null;

        finish(null,{code:Array.isArray(reply)?Number(reply[0]):null});

      }

      try {n.on(event,owner,onAck);}catch(e){finish(e);return;}

      timer=(W.KVPV_V1?.timers?.setTimeout ?? W.setTimeout)(()=>finish(Error('Het thoi gian cho native notify '+event)),timeout);

      try {sender(op);}catch(e){finish(e);}

    });

  }

  async function verify(op){

    const until=now()+CFG.verifyMs;

    while(valid()&&now()<until){

      if(['equip','holy','pet'].includes(op.kind)){

        const items=nativeSmelt(op.kind);

        if(items&&op.ids.every(id=>!items.includes(id)))return true;

      }else if(typeof op.probe==='function'){

        const after=op.probe();

        if(after!=null&&after!==op.before)return true;

      }else{

        const b=bag();

        if(b && op.matIds.some((id,i)=>Number(b.getItemCountById?.(id))<op.counts[i]))return true;

        if(b && Number(b.getItemCountById?.(op.result))>Number(op.beforeResult))return true;

      }

      await sleep(250);

    }

    return false;

  }

  function halt(kind,err){

    ST.halted[kind]=true; CFG.enabled[kind]=false;ST.stats[kind].errors++;

    ST.reasons[kind]='Tam dung: '+String(err?.message||err);

    ST.error=ST.reasons[kind]; history(kind,'halted',ST.reasons[kind]);

  }

  async function execute(op){

    const k=op.kind;

    if(!valid()||ST.busy)return;

    ST.busy=true;

    const b=bag();

    if(['stone','props','gearCraft'].includes(k)&&b)op.beforeResult=Number(b.getItemCountById?.(op.result))||0;

    ST.pending={kind:k,ids:op.ids??null,recipe:op.id??null,at:now(),phase:'waiting'};

    ST.stats[k].requests++;ST.requests++;ST.lastRequestAt=now();

    const detail=(['stone','props','gearCraft'].includes(k))?'recipe '+op.id:

      Array.isArray(op.ids)?'items '+op.ids.length:

      (k==='soulStone'?'position '+op.part+' action '+op.action:

       k==='soulForge'?'material '+op.material:k);

    history(k,'sent',detail);

    try{

      const ack=await sendWithAck(op,CFG.ackMs);

      ST.stats[k].acks++;

      ST.pending.phase='verifying';

      if(ack.code!==null && ack.code!==0)throw Error('Server result code '+ack.code);

      const okay=await verify(op);

      if(!okay)throw Error('Da co notify nhung tui/list khong thay doi; khong gui lai mu');

      ST.stats[k].verified++;ST.confirmed++;

      ST.reasons[k]='Da quan sat thay thay doi sau yeu cau';

      history(k,'verified',detail);

    }catch(e){halt(k,e);}

    finally{ST.pending=null;ST.busy=false;}

  }

  function precheck(){

    if(!valid()){stop('Doi nhan vat hoac dung chung');return false;}

    // A legacy resource batch already in progress has exclusive ownership until settled.

    const legacyJob=D.quickState?.()?.job;

    if(legacyJob==='smelt'||legacyJob==='compose')return false;

    if(!CFG.runDuringCombat && legacyJob!=='rảnh')return false;

    const oldSmelt=W.KVPV_SMELT25?.status?.();

    if(oldSmelt?.running || (Array.isArray(oldSmelt?.pending)&&oldSmelt.pending.length))return false;

    if(W.KVPV_UPGRADES?.busy?.()){return false;}

    const ui=_ft?._Y4n?.ins;

    if(CFG.forbidOpenPanels.some(id=>ui?.isOpened?.(id)))return false;

    return true;

  }

  

  function tick(){

    if(!ST.running||!CFG.active)return;

    ST.scans++;

    if(ST.busy||now()-ST.lastRequestAt<CFG.minBetweenMs||!precheck())return;

    // Disable all legacy resource senders. Auto Daily and SOLO supervisor can safely keep running.

    if(D.config.smeltEnabled)Object.assign(D.config.smeltEnabled,{equip:false,holy:false,pet:false});

    D.config.enableCompose=false;

    const old=W.KVPV_SMELT25;

    try{if(old?.status?.().enabled)old.setEnabled?.(false);}catch(e){console.warn(TAG,'Old smelt disable',e);}

    // One shared worker replaces old equipment upgrade senders to prevent duplicate RPCs.

    const u=W.KVPV_UPGRADES?.config;

    if(u){u.cuongHoa=false;u.daHon=false;u.ducHon=false;}

    for(let i=0;i<keys.length;i++){

      const idx=(ST.cursor+i)%keys.length,k=keys[idx];

      if(!CFG.enabled[k]||ST.halted[k])continue;

      let op=null;

      try{op=select(k);}catch(e){ST.reasons[k]='Danh sach chua san sang: '+e.message;continue;}

      if(!op){ST.reasons[k]='Chua co vat pham/cong thuc phu hop';continue;}

      ST.cursor=(idx+1)%keys.length;

      void execute(op);

      break;

    }

  }

  

  function status(){return {version:'11.15',actor,running:ST.running,active:CFG.active,

    busy:ST.busy,pending:ST.pending,scans:ST.scans,requests:ST.requests,

    confirmed:ST.confirmed,enabled:{...CFG.enabled},halted:{...ST.halted},

    reasons:{...ST.reasons},stats:JSON.parse(JSON.stringify(ST.stats))};}

  

  function preview(){const o={};for(const k of keys){try{const a=select(k);o[k]=a?(

    a.ids?{candidates:a.ids.length,firstUIDs:a.ids.slice(0,8)}:

      a.id?{recipe:a.id,materialIds:a.matIds,quantity:a.qty}:

      {type:a.kind,part:a.part??null,action:a.action??null,material:a.material??null}):null;

    }catch(e){o[k]={error:e.message};}}return o;}

  function gearRecipes(){

    const c=_ft?._Cji?.ins, all=[];

    const raw=typeof _Sa?.getCfg==='function'?_Sa.getCfg('item_compose'):[];

    if(!c?.getCfgById||!Array.isArray(raw))return [];

    for(const r of raw){

      if(![807,808].includes(Number(r?.[3]?.[0]))||!num(r?.[0]))continue;

      const id=Number(r[0]),type=Number(_et?.getTypeById?.(r[1])),tier=Number(_et?.getStageById?.(r[1]));

      all.push({id,result:Number(r[1]),type,tier,

        forbidden:!(Number.isInteger(tier)&&tier>=1&&tier<4),

        approved:CFG.gearCraft.approvedRecipeIds.map(Number).includes(id)});

      if(all.length>=200)break;

    }

    return all;

  }

  function setEnabled(kind,on=true){

    if(!keys.includes(kind))throw Error('Unknown category '+kind);

    if(on&&ST.halted[kind])throw Error('Dang khoa '+kind+'; can kiem tra tui, goi resetAfterReview');

    CFG.enabled[kind]=!!on;return status();

  }

  function resetAfterReview(kind){

    if(!keys.includes(kind)||ST.busy)throw Error('Khong duoc reset khi dang cho ACK');

    ST.halted[kind]=false;ST.reasons[kind]='Da xem lai tui; cho bat lai thu cong';CFG.enabled[kind]=false;

    history(kind,'review-reset');return status();

  }

  

  function stop(why='Dung thu cong'){

    ST.running=false;CFG.active=false;

    if(ST.timer!==null)(W.KVPV_V1?.timers?.clearInterval ?? W.clearInterval)(ST.timer);

    ST.timer=null;history('all','stopped',why);

    // Existing in-flight request may still be unresolved. Its listener owns its cleanup.

    return status();

  }

  const api={version:'11.15',config:CFG,status,preview,history:()=>ST.history.slice(),

    gearRecipes,setEnabled,resetAfterReview,stop,

    approveGearRecipe(recipeId){

      const id=Number(recipeId);if(!num(id))throw Error('Recipe ID không hợp lệ');

      if(!CFG.gearCraft.approvedRecipeIds.includes(id))CFG.gearCraft.approvedRecipeIds.push(id);

      return preview().gearCraft;

    },

    revokeGearRecipe(recipeId){

      CFG.gearCraft.approvedRecipeIds=CFG.gearCraft.approvedRecipeIds.filter(x=>Number(x)!==Number(recipeId));

      return status();

    },start(){

      if(ST.running){CFG.active=true;return status();}

      if(ST.busy)throw Error('Dang cho thao tac cu; khong khoi dong lai');

      ST.running=true;CFG.active=true;ST.timer=(W.KVPV_V1?.timers?.setInterval ?? W.setInterval)(tick,CFG.pollMs);tick();return status();

    },tick};

  W.KVPV_BG_RESOURCES=api;

  try{if(W.KVPV && typeof W.KVPV==='object')W.KVPV.resources=api;}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

  // Start after all older modules have been installed and their flags are known.

  if(D.config.smeltEnabled)Object.assign(D.config.smeltEnabled,{equip:false,holy:false,pet:false});

  D.config.enableCompose=false;

  const legacyUpgrades=W.KVPV_UPGRADES?.config;

  if(legacyUpgrades){legacyUpgrades.cuongHoa=false;legacyUpgrades.daHon=false;legacyUpgrades.ducHon=false;}

  try{W.KVPV_SMELT25?.setEnabled?.(false);}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

  ST.timer=(W.KVPV_V1?.timers?.setInterval ?? W.setInterval)(tick,CFG.pollMs);

  // Delay first destructive request until the next scan; users can inspect preview first.

  console.info(TAG,'V11.15: 11 nhom tai nguyen/luyẹn khi/che tao chay nen, 1 yeu cau cho moi lan; KVPV.resources.status()');

})();

/* ===== V11.13 RESOURCE BACKGROUND END ===== */



/* V3.8 BOSS POSITION */

/* KVPV V3.8 - BOSS POSITION (native movement integration)
 * Tighten ONLY local character's isValidRange() for eligible monster/boss targets.
 * The game's existing auto-combat decides whether and how to path to the target.
 * No direct moveTo calls, teleports, invented packets, or changes to accuracy stats.
 * Run this addon AFTER V3.7 in the game-frame console.
 */

 

(() => {

  'use strict';

  // V12.9.4: guard native references before evaluation in the wrong frame.

  // This block begins immediately after the old line-17498 comment.

  if (typeof _Ba === 'undefined' || typeof _C === 'undefined' ||

      typeof _d === 'undefined' || typeof _ft === 'undefined') {

    console.warn('[BOSSPOS38] Chọn game-frame và chờ game tải xong; bỏ qua Boss Position.');

    return;

  }

  const W = window;

  try { W.KVPV_BOSS_POSITION?.stop?.(); }

  catch (e) { console.warn('[BOSSPOS38] Previous instance stop failed:', e); }

  const id = String(_Ba?._rJ?._O$?.ins?.actorId ?? '');

  if (!id || !_C?._Ba?.instance?.getRole || !_d?._Yct?._Het?.prototype) {

    throw Error('[BOSSPOS38] Choose game-frame and wait for character load.');

  }

  if (W.__KVPV_OWN_ACTOR_ID && String(W.__KVPV_OWN_ACTOR_ID) !== id) {

    throw Error('[BOSSPOS38] Wrong actor ID.');

  }

  const config = {

    enabled: true,

    mode: 'boss',               // 'boss' (default) or 'selectedMonster'

    ratio: 0.68,              // proportion of game's own target attack radius

    maxRadius: 260,           // never keep an absurdly large radius for large target models

    minRadius: 65,            // avoid attempting to stand on top of the model

    hysteresis: 20,           // don't alternate move/attack around threshold

    watchdogMs: 1200

  };

  let running = true;

  let install = null;

  let lastWarning = 0;

  const state = new WeakMap();

  const stats = {rangeCalls:0, nativeOutOfRange:0, tightened:0,

    nearEnough:0, ignored:0, targetChanges:0, reinstalls:0,

    overwritten:0, skippedInvalidRange:0, lastTargetId:null,

    lastTargetName:null, lastNativeRadius:null, lastDesiredRadius:null,

    lastDistance:null, lastReason:'waiting_for_boss', lastSeenAt:null};



  const getRole = () => {

    const world = _C?._Ba?.instance;

    return world?.getRole?.(Number(id)) || world?.getRole?.(id) || null;

  };

  const prop = (x,k) => {try {return x?.property?.get?.(k);}catch(_){return null;}};

  const own = self => {

    const r = getRole();

    return !!r && !!self?.owner &&

      (self.owner === r || String(prop(self.owner,'id') ?? self.owner.id ?? '') === id);

  };

  const npos = obj => {

    const p = prop(obj,'position');

    return Number.isFinite(Number(p?.x)) && Number.isFinite(Number(p?.y))

      ? {x:Number(p.x),y:Number(p.y)} : null;

  };

  function stageOcc() {

    try {

      const level = Number(_Ba?._Co?._Mo?.ins?.curLv);

      const cfg = _ft?._h$?.ins?.getCfgByLv?.(level);

      const occ = cfg ? Number(_ft._h$.ins.occ(cfg, level)) : NaN;

      return Number.isSafeInteger(occ) && occ > 0 ? occ : null;

    } catch (_) {return null;}

  }

  const bossName = name => /boss|th[ií]ên\s*quan|th[uủ]\s*l[iĩ]nh|y[eê]u\s*v[uư]ơng|ma\s*th[aầ]n|th[aầ]n\s*th[uú]|v[uư]ơng\s*gi[aả]/i.test(name);

  function eligible(target) {

    if (!target || target.isValid === false || Number(prop(target,'type')) !== 1) return false;

    if (config.mode === 'selectedMonster') return true;

    const occ = Number(prop(target,'occ'));

    const name = String(prop(target,'name') || '');

    return bossName(name) || (Number.isSafeInteger(occ) && occ > 0 && occ === stageOcc());

  }

  function nativeRadius(combat, target) {

    try {

      const sceneId = Number(_C?._Mn?._Cn?.currentID);

      const land = typeof _BLa !== 'undefined' &&

        typeof _BLa?.isLandScapeScreen === 'function' && _BLa.isLandScapeScreen();

      if (land) return 250;

      const sceneCfg = _ft?._po?.ins?.getCfgById?.(sceneId);

      if (Number(sceneCfg?.[0]) === 8601) return 500;

      const occ = Number(prop(target,'occ'));

      const monsterCfg = _ft?._tY?.ins?.getCfgById?.(occ);

      const range = Number(monsterCfg?.[3]);

      if (Number.isFinite(range) && range > 0) return range;

    } catch(_){window.KVPV_V1?.diagnostics?.record(_);}

    const fallback = Number(combat?.validRadius);

    return Number.isFinite(fallback) && fallback > 0 ? fallback : null;

  }

  function targetId(t) {return String(prop(t,'id') ?? t?.id ?? '');}

  function installHook() {

    if (!running) return false;

    const p = _d?._Yct?._Het?.prototype;

    if (!p || typeof p.isValidRange !== 'function') return false;

    if (install?.proto === p && p.isValidRange === install.hook) return true;

    if (install && install.proto.isValidRange !== install.hook) {

      // Another add-on replaced our hook. Avoid stealing it and creating unsafe chains.

      stats.overwritten++;

      if (Date.now()-lastWarning > 15000) {

        lastWarning = Date.now();

        console.warn('[BOSSPOS38] isValidRange overridden by another add-on. Stop the newer add-on and reinstall V3.8.');

      }

      return false;

    }

    detach();

    const desc = Object.getOwnPropertyDescriptor(p,'isValidRange');

    if (desc && !desc.configurable) return false;

    const previous = p.isValidRange;

    function hookedRange() {

      // Native check first preserves blocked scenes, target validity, scene rules and range checks.

      const nativeResult = previous.apply(this, arguments);

      if (!running || !config.enabled || String(_Ba?._rJ?._O$?.ins?.actorId??'') !== id || !own(this)) return nativeResult;

      stats.rangeCalls++;

      const target = this.target;

      if (!eligible(target)) {

        stats.ignored++;

        stats.lastReason = target ? 'not_a_boss_target' : 'no_target';

        return nativeResult;

      }

      const tId = targetId(target);

      let m = state.get(this);

      if (!m || m.target !== tId) {

        m = {target:tId, closing:false}; state.set(this,m);stats.targetChanges++;

      }

      const pos = npos(getRole()) || (() => {

        const p = this._Ha;

        return Number.isFinite(Number(p?.x)) && Number.isFinite(Number(p?.y))

          ? {x:Number(p.x),y:Number(p.y)} : null;

      })();

      const goal = npos(target);

      const r = nativeRadius(this,target);

      if (!pos || !goal || !Number.isFinite(r) || r <= config.minRadius + 5) {

        stats.skippedInvalidRange++;stats.lastReason='unavailable_positions_or_radius';return nativeResult;

      }

      const distance = Math.hypot(pos.x-goal.x,pos.y-goal.y);

      const desired = Math.min(r - 5, Math.max(config.minRadius,

        Math.min(config.maxRadius, r*config.ratio)));

      stats.lastTargetId=tId;

      stats.lastTargetName=String(prop(target,'name')||'');

      stats.lastNativeRadius=+r.toFixed(1);

      stats.lastDesiredRadius=+desired.toFixed(1);

      stats.lastDistance=+distance.toFixed(1);

      stats.lastSeenAt=Date.now();

      if (nativeResult !== true) {

        // Let native AI approach. Never force true for native invalid situations.

        m.closing = true; stats.nativeOutOfRange++;stats.lastReason='native_out_of_range';

        return nativeResult;

      }

      // Hysteresis: begin closing beyond desired+20, continue until within desired.

      if (m.closing) {

        if (distance <= desired) m.closing = false;

      } else if (distance > desired+config.hysteresis) {

        m.closing = true;

      }

      if (m.closing && distance > desired) {

        stats.tightened++;stats.lastReason='approaching_via_native_ai';

        return false;

      }

      stats.nearEnough++;stats.lastReason='at_desired_range';

      return nativeResult;

    }

    Object.defineProperty(p, 'isValidRange', {

      configurable:true, enumerable:!!desc?.enumerable, writable:true, value:hookedRange

    });

    install={proto:p, descriptor:desc, hook:hookedRange, previous};

    stats.reinstalls++;

    return true;

  }

  function detach() {

    if (!install) return;

    const {proto,hook,descriptor}=install;

    if (proto.isValidRange === hook) {

      if (descriptor) Object.defineProperty(proto,'isValidRange',descriptor);

      else delete proto.isValidRange;

    }

    install=null;

  }

  

  function status(show=true) {

    const s={version:'3.8.0', active:running&&config.enabled,

      actorId:id,mode:config.mode,ratio:config.ratio,

      minRadius:config.minRadius,maxRadius:config.maxRadius,

      hysteresis:config.hysteresis,hookAttached:!!install&&install.proto.isValidRange===install.hook,

      ...stats};

    if (show) console.table([s]);

    return s;

  }

  function enable(value=true) {config.enabled=!!value;return status();}

  function setRatio(value=.68) {

    const v=Number(value);

    if (!Number.isFinite(v) || v<.35 || v>.95)throw Error('Ratio: 0.35..0.95');

    config.ratio=v;return status();

  }

  function setMode(value='boss') {

    if(!['boss','selectedMonster'].includes(value))throw Error('boss | selectedMonster');

    config.mode=value;return status();

  }

  function setLimits(min=65,max=260,hysteresis=20) {

    min=Number(min);max=Number(max);hysteresis=Number(hysteresis);

    if (![min,max,hysteresis].every(Number.isFinite) || min<25 || max<=min || max>2000 || hysteresis<0 || hysteresis>150)

      throw Error('25<=min<max<=2000; hysteresis 0..150');

    Object.assign(config,{minRadius:min,maxRadius:max,hysteresis});return status();

  }

  

  function stop() {

    if (!running) return;

    running=false;

    (W.KVPV_V1?.timers?.clearInterval ?? W.clearInterval)(timer);

    detach();

    if (W.KVPV_BOSS_POSITION===api) delete W.KVPV_BOSS_POSITION;

    console.log('[BOSSPOS38] Stopped; game range logic restored.');

  }

  installHook();

  const timer=(W.KVPV_V1?.timers?.setInterval ?? W.setInterval)(() => {

    try {installHook();}catch(e){console.warn('[BOSSPOS38] Watchdog:',e);}

  },config.watchdogMs);

  const api={version:'3.8.0',status,enable,setRatio,setMode,setLimits,scan:installHook,stop};

  W.KVPV_BOSS_POSITION=api;

  console.log('[BOSSPOS38] Ready. Boss-only closer native auto-combat range (68%).');

  status();

})();



/* V3.9 BOSS BASIC DAMAGE */



 

(() => {

  'use strict';

  const W=window, NS=W.KVPV||(W.KVPV={});

  const defaults=Object.freeze({

    hitMemoryMs:12000,minHitDetectPct:2,damageBufferPct:6,

    maxAdaptiveResumePct:100,resumeFightPct:100,returnPct:100,

    healRiseToFightPct:5,healConfirmMs:350,

    boss9022MinPeriodMs:2200,boss9022MaxPeriodMs:6500,

    boss9022LeadMs:850,boss9022AfterMs:400,boss9022RiskBufferPct:8,

    minRetreatMs:1200,minOrbitLaps:0,leavePct:35,bossSurvival:true

  });

  const numeric=(x,fallback)=>Number.isFinite(Number(x))?Number(x):fallback;

  const clamp=(x,min,max)=>Math.max(min,Math.min(max,x));

  function createTracker(config={}){

    const c={...defaults,...config};

    let hpPrev=null, hits=[], last9022=null, intervals=[], gateAt=null;

    function prune(t){hits=hits.filter(x=>t-x.at>=0&&t-x.at<=c.hitMemoryMs);}

    function observeHp({at,current,max}){

      if(!Number.isFinite(at)||!Number.isFinite(current)||!Number.isFinite(max)||max<=0) return 0;

      let loss=0;

      if(hpPrev&&hpPrev.max===max&&at>hpPrev.at&&at-hpPrev.at<=2500){

        loss=Math.max(0,(hpPrev.current-current)/max*100);

        if(loss>=c.minHitDetectPct)hits.push({at,pct:loss});

      }

      hpPrev={at,current,max};prune(at);return loss;

    }

    function strongest(t){prune(t);return hits.reduce((n,x)=>Math.max(n,x.pct),0);}

    function observe9022(at){

      if(!Number.isFinite(at))return {accepted:false,reason:'invalid time'};

      if(last9022!==null){

        const delta=at-last9022;

        if(delta<1000)return {accepted:false,reason:'duplicate event'};

        if(delta>=c.boss9022MinPeriodMs&&delta<=c.boss9022MaxPeriodMs){

          intervals.push(delta);if(intervals.length>6)intervals.shift();

        }else intervals=[];

      }

      last9022=at;

      return {accepted:true,samples:intervals.length};

    }

    function next9022(at){

      if(last9022===null||intervals.length<2||!Number.isFinite(at))return null;

      const period=intervals.reduce((sum,x)=>sum+x,0)/intervals.length;

      const maxDeviation=Math.max(...intervals.map(x=>Math.abs(x-period)));

      if(maxDeviation>period*0.25)return null; // unstable cycle; do not predict

      const elapsed=at-last9022;

      if(elapsed<0||elapsed>period+350)return null; // stale observation

      return Math.max(0,period-elapsed);

    }

    function riskHp(at){

      const hit=strongest(at);

      return c.bossSurvival===false ? c.resumeFightPct :

        Math.max(c.resumeFightPct,Math.min(c.maxAdaptiveResumePct,hit+c.damageBufferPct));

    }

    function fight({at,hpPct}){

      const eta=next9022(at),strong=strongest(at);

      const predicted=eta!==null&&eta<=c.boss9022LeadMs&&

        strong>=c.minHitDetectPct&&

        hpPct<=Math.max(c.leavePct,Math.min(c.maxAdaptiveResumePct,strong+c.boss9022RiskBufferPct));

      return {retreat:hpPct<=c.leavePct,predicted:false,forecastRisk:predicted,eta,strong};

    }

    function retreat({at,hpPct,minObservedPct,retreatAt,orbitLaps}){

      const healed=Math.max(0,hpPct-minObservedPct);

      const required=riskHp(at);

      const healReady=healed>=c.healRiseToFightPct&&hpPct>=required;

      const fullReady=hpPct>=Math.max(c.returnPct,required);

      const eta=next9022(at);

      const strikeSoon=eta!==null&&eta<=c.boss9022LeadMs;

      const justHit=last9022!==null&&at-last9022>=0&&at-last9022<=c.boss9022AfterMs;

      const eligible=hpPct>=100&&at-retreatAt>=c.minRetreatMs&&orbitLaps>=c.minOrbitLaps&&

        (healReady||fullReady)&&!strikeSoon&&!justHit;

      if(!eligible){gateAt=null;return {resume:false,healed,required,eta};}

      if(gateAt===null)gateAt=at;

      return {resume:at-gateAt>=c.healConfirmMs,healed,required,eta};

    }

    return Object.freeze({observeHp,observe9022,next9022,strongest,riskHp,fight,retreat,

      // V12.2: update only the recovery confirmation gate on the live tracker.

      // HP safety thresholds and boss forecast guards remain unchanged.

      setHealConfirmMs(value){

        const ms=Math.round(Number(value));

        if(!Number.isFinite(ms)||ms<250||ms>800)return false;

        if(ms!==c.healConfirmMs){c.healConfirmMs=ms;gateAt=null;}

        return true;

      },

      getHealConfirmMs(){return c.healConfirmMs;},

      resetGate(){gateAt=null;},

      status(at){return {strongestHitPct:strongest(at),eta9022:next9022(at),

        samples9022:intervals.length,intervals:intervals.slice(),last9022};}

    });

  }

  NS.bossSurvival=Object.freeze({version:'10.1.0',defaults,createTracker});

})();



/* ==== INTEGRATED HIT & RUN NGU THU V1.1 / 2 LAPS / AUTO BOSS ARM ==== */

/* KVPV HIT & RUN NGU THU V1.1 — two real orbits before resume, integrated in main FULL.
 * HP <=75%: suspend main combat, retreat to an OUTER orbit around selected Boss.
 * HP >=92%, >8s AND >=2 measured orbits: restore combat. All movement uses native moveTo.
 * Tested mechanics: ride regeneration while NOT hitting (reported by player),
 * native mover.moveTo confirmed in-game; 9022 avoidance NOT confirmed.
 * Does NOT fake damage, HP, cooldown, server events or network messages.
 * Usage: KVPV_HITRUN1.start(); KVPV_HITRUN1.status(); KVPV_HITRUN1.stop()
 */

 

(() => {

  'use strict';

  const W=window, TAG='[HITRUN-V11.5.2-CLEAN]';

  try { W.KVPV_HITRUN1?.stop?.('reload addon'); } catch(e) { console.warn(TAG,e); }

  const actor=String(_Ba?._rJ?._O$?.ins?.actorId??'');

  if (!actor || (W.__KVPV_OWN_ACTOR_ID && String(W.__KVPV_OWN_ACTOR_ID)!==actor)) {

    console.error(TAG,'Wrong game-frame / character');return;

  }

  

const C = {

  

  logRoutineInfo: false, // diagnostics kept in history; avoid console flood

  leavePct: 35,



  

  returnPct: 100,



  

  resumeFightPct: 100,



  

  healRiseToFightPct: 5,



  

  orbitRadius: 360,

  maxOrbitRadius: 430,

  stepDeg: 20,

  clockwise: true,

  minOrbitLaps: 0,



  

  minRetreatMs: 1200,

  noHealMs: 14500,

  maxRetreatMs: Infinity,



  

  tickMs: 140,

  repathMs: 950,

  waypointTimeoutMs: 4200,

  nearWaypoint: 26,



  

  // Keep native selection alive through brief UI/animation target gaps.

  // Permanent target loss remains a safety stop, not an uncontrolled retry.

  targetGraceMs: 4500,

  maxBossMove: 150,

  bossHealResetPct: 10,



  

  maxStallMs: 6500,

  minProgress: 8,



  

  maxHits9022: Infinity,

  maxChaseBlocks: 8000,

  maxGameStops: Infinity,



  // BOSS SURVIVAL V1.3

  bossSurvival: true,



  

  hitMemoryMs: 12000,

  minHitDetectPct: 2,



  

  damageBufferPct: 6,

  maxAdaptiveResumePct: 100,



  

  healConfirmMs: 350,



  

  boss9022MinPeriodMs:2200,

  boss9022MaxPeriodMs:6500,

  boss9022LeadMs:850,

  boss9022AfterMs:400,

  boss9022RiskBufferPct:8,



};



  // Keep the requested cycle fixed even when older adaptive code proposes changes.

  for(const [key,value] of Object.entries({leavePct:35,returnPct:100,resumeFightPct:100}))

    Object.defineProperty(C,key,{value,writable:false,configurable:false,enumerable:true});



  const S={running:false,phase:'OFF',reason:'OFF',timer:null,me:null,boss:null,

    mover:null,combat:null,bossId:'',scene:'', startedAt:0,retreatAt:0,

    startBossPos:null,startBossHP:null,healBasePct:null,bestHealPct:null,

    minObservedPct:null,healObserved:false,damage9022:0,

    lastHpPct:null,hpMax:null,orbitRadius:null,waypoint:null,

    waypointAt:0,lastMoveAt:0,lastProgressAt:0,progressPosition:null,

    blockedChases:0,gameStops:0,blockedNativeStops:0,moveAttempts:0,

    orbitArcDeg:0,orbitLastBearing:null,orbitLaps:0,waypointCount:0,

    restoring:false,insideOwnMove:false,hooks:[],combatHook:null,

    observedDangerRadius:0,lastError:'',events:[],missingSince:null,

    streakRecover:0,lastHpAt:0

  };

/* ==== V12.7.1: STRICT LOW-HP HEAL HOLD (inside native HitRun owner) ====
 * Health is authoritative client-observed [current,max]; no RPC or new timer.
 * Do not allow the 3.5s dodge to re-engage while HP has not recovered.
 */

const V1271HEALCFG={enabled:true,resumePct:100,stalledWarnEveryMs:30000};

function v1271Floor(){

  const scope=W.KVPV_FAR_SCOPE?.status?.();
  // TQ only: report effective 45%-HP gate; other maps retain 100%.
  return scope?.kind==='THIEN_QUAN'&&scope.inside===true?45:100;

}

function v1271PrepareRecovery(hpPct){

  // Full-health recovery cannot be disabled by a legacy toggle.

  const sufficient=Number.isFinite(hpPct)&&hpPct>=v1271Floor();

  // A momentary spike above the threshold is not enough; re-confirm stable HP.

  if(!sufficient||S._v1271HpReady!==true)S._bossSurvival?.resetGate?.();

  S._v1271HpReady=sufficient;

}



function v1271ReturnAllowed(hpPct,decision){

  if(!decision?.resume)return false;

  return Number.isFinite(hpPct)&&hpPct>=100&&S._v1271HpReady===true;

}



function v1271NoHealHold(t,spent){

  if(spent<=C.noHealMs||S.healObserved)return false;

  if(!S._v1271NoHealWarnAt||t-S._v1271NoHealWarnAt>=V1271HEALCFG.stalledWarnEveryMs){

    S._v1271NoHealWarnAt=t;

    note('warn','V12.7.1: HP not healing; HOLD RETREAT, do NOT resume attack. Check healing source.');

  }

  return true;

}

W.KVPV_V127_HEAL=Object.freeze({version:'12.7.1',config:V1271HEALCFG,

  enable(v=true){if(!v)return false;V1271HEALCFG.enabled=true;

    S._bossSurvival?.resetGate?.();S._v1271HpReady=false;return this.status(false);},

  setResumePct(v){const n=Number(v);

    if(n!==100)return false;

    V1271HEALCFG.resumePct=n;

    S._bossSurvival?.resetGate?.();S._v1271HpReady=false;return this.status(false);},

  status(print=false){const h=S.lastHpPct,goal=v1271Floor();

    const out={version:'12.7.1',enabled:V1271HEALCFG.enabled,

      phase:S.phase,hpPct:h==null?null:+h.toFixed(2),leavePct:C.leavePct,

      resumeHpPct:goal,waitingForHeal:S.phase==='RETREAT'&&S.running,

      missingHpPct:h==null?null:+Math.max(0,goal-h).toFixed(2),

      noHealWarning:!!S._v1271NoHealWarnAt,

      healObserved:!!S.healObserved,running:S.running,

      note:goal===45?'Thiên Quan: release after HP recovers at least 5 percentage points, is at least 45%, and outside native Boss range; TH300 then positions to 310. Other maps retain 100%.':
        'HP <=35%: orbit outside Boss client range; resume only at 100% HP after stable confirmation.'};

    if(print)console.table([out]);return out;}

});

/* ==== END V12.7.1 HEAL HOLD ==== */



  const clock=()=>performance.now();

  const getScene=()=>String(_Ba?._$a?._yo?.ins?.intoSce?.[0]??'?');

  const getActor=()=>String(_Ba?._rJ?._O$?.ins?.actorId??'');

  const prop=(o,k)=>{try{return o?.property?.get?.(k)??null;}catch(_){return null;}};

  const oid=o=>String(prop(o,'id')??o?.id??'');

  const pos=o=>{const p=prop(o,'position');const x=Number(p?.x),y=Number(p?.y);

    return p&&Number.isFinite(x)&&Number.isFinite(y)?{x,y}:null;};

  const gap=(a,b)=>a&&b?Math.hypot(a.x-b.x,a.y-b.y):null;

  function hp(role){const h=prop(role,'hp');if(!Array.isArray(h)||h.length<2)return null;

    const current=Number(h[0]),max=Number(h[1]);

    return Number.isFinite(current)&&Number.isFinite(max)&&max>0&&current>=0

      ?{current,max,pct:current/max*100}:null;}

  

  function recoveryGeometry(){

    const occ=Number(prop(S.boss,'occ'));

    const cfg=_ft?._tY?.ins?.getCfgById?.(occ);

    const geometry=W.KVPV_BOSS_RECOVERY.geometry(cfg?.[3]);

    geometry.configuredRange=geometry.range;

    const observed=Number(S.observedDangerRadius)||0;

    if(observed>geometry.range){geometry.range=observed;geometry.ring=Math.max(geometry.ring,observed+80);}

    return geometry;

  }

  

  function recoveryRadius(){return Math.max(C.orbitRadius,recoveryGeometry().ring);}

  function traceBoss(kind,detail=''){

    const log=W.KVPV_BOSS_LOG;if(!log?.status?.().recording)return;

    try{

      const h=hp(S.me),bh=hp(S.boss),p=pos(S.me),b=pos(S.boss),g=recoveryGeometry();

      log._record(kind,{tickMs:clock(),phase:S.phase,hp:h?.current,hpMax:h?.max,

        hpPct:h?.pct,bossId:S.bossId,bossHP:bh?.current,bossHPMax:bh?.max,

        distance:gap(p,b),bossRange:g.range,configuredRange:g.configuredRange,

        observedDangerRadius:S.observedDangerRadius,rangeKnown:g.known,ring:recoveryRadius(),

        player:p,boss:b,waypoint:S.waypoint,detail});

    }catch(error){W.KVPV_V1?.diagnostics?.record(error);}

  }

  

  function note(type,message=''){

    const e={time:new Date().toISOString(),type,message};

    S.events.push(e);if(S.events.length>70)S.events.shift();

    traceBoss(type,message);

    if(type==='warn')console.warn(TAG,message);

    else if(type==='info'&&C.logRoutineInfo)console.info(TAG,message);

  }

  function ctx(){

    const world=_C?._Ba?.instance;

    const me=world?.getRole?.(Number(actor))||world?.getRole?.(actor);

    const mover=me?.getComponent?.(_d?._Yct?._zet);

    const combat=me?.getComponent?.(_d?._Yct?._Het);

    if(!me||!mover||!combat||typeof mover.moveTo!=='function')

      throw Error('Main character mover/combat unavailable');

    return {me,mover,combat,boss:combat.target};

  }

  function safe(){

    if(getActor()!==actor||W.__KVPV_UNIVERSAL_HALTED)throw Error('Actor switched or halted');

    if(getScene()!==S.scene)throw Error('Scene changed');

    if(S.me!==ctx().me || S.mover!==ctx().mover)throw Error('Character object replaced');

    if(_Ba?._rJ?._O$?.ins?.isDead===true)throw Error('Character is dead');

    if(S.mover._fut===3||S.mover._fut===4)throw Error('Movement disabled by game');

  }

  

  function installGuard(){

    if(S.hooks.length)throw Error('Movement guard installed twice');

    const moved=['moveTo','moveToCoordinate','moveByPath'];

    for(const name of moved){

      if(typeof S.mover[name]!=='function')continue;

      const own=Object.getOwnPropertyDescriptor(S.mover,name);

      if(own && !own.configurable)throw Error('Cannot hook native '+name);

      const original=S.mover[name];

      const wrapped=function(...args){

        if((S.phase==='RETREAT'||S.phase==='DODGE'||S.phase==='KITE_OUT'||S.phase==='KITE_IN')&&!S.insideOwnMove&&!S.restoring && getActor()===actor){

          S.blockedChases++;return undefined;

        }

        return original.apply(this,args);

      };

      Object.defineProperty(S.mover,name,{configurable:true,writable:true,

        enumerable:own?.enumerable??false,value:wrapped});

      S.hooks.push({name,own,original,wrapped,mover:S.mover});

    }

    if(!S.hooks.some(h=>h.name==='moveTo'))throw Error('Cannot guard moveTo');

    // Native AI repeatedly stops its mover when in attack range. Preserve an

    // owned retreat path, but still allow death, immobilization and arrival.

    if(typeof S.mover.stop==='function'){

      const own=Object.getOwnPropertyDescriptor(S.mover,'stop');

      if(!own||own.configurable){

        const original=S.mover.stop;

        const wrapped=function(...args){

          if((S.phase==='RETREAT'||S.phase==='DODGE'||S.phase==='KITE_OUT'||S.phase==='KITE_IN'))S.gameStops++;

          const health=hp(S.me),alive=health?.current>0&&_Ba?._rJ?._O$?.ins?.isDead!==true;

          const distance=gap(pos(S.me),S.waypoint);

          if(S.running&&S.phase==='RETREAT'&&!S.insideOwnMove&&!S.restoring&&getActor()===actor&&

             alive&&S.mover._fut!==3&&S.mover._fut!==4&&Number.isFinite(distance)&&distance>C.nearWaypoint){

            S.blockedNativeStops++;return undefined;

          }

          return original.apply(this,args);

        };

        Object.defineProperty(S.mover,'stop',{configurable:true,writable:true,

          enumerable:own?.enumerable??false,value:wrapped});

        S.hooks.push({name:'stop',own,original,wrapped,mover:S.mover});

      }

    }

    // Pause ONLY main-character attack invocation while healing.

    if(typeof S.combat.combat==='function'){

      const own=Object.getOwnPropertyDescriptor(S.combat,'combat');

      if(own && !own.configurable)throw Error('Cannot pause main combat instance');

      const original=S.combat.combat;

      const wrapped=function(...args){

        if((S.phase==='RETREAT'||S.phase==='DODGE'||S.phase==='KITE_OUT'||S.phase==='KITE_IN')&&!S.restoring)return undefined;

        return original.apply(this,args);

      };

      Object.defineProperty(wrapped,'__KVPV_GUARD_PARENT',{value:original});

      Object.defineProperty(S.combat,'combat',{configurable:true,writable:true,

        enumerable:own?.enumerable??false,value:wrapped});

      S.hooks.push({name:'combat',own,original,wrapped,mover:S.combat});

    }

  }

  

  function restoreGuard(){

    S.restoring=true;

    for(const h of S.hooks.splice(0).reverse()){

      if(h.mover[h.name]!==h.wrapped)continue;

      try{if(h.own)Object.defineProperty(h.mover,h.name,h.own);

        else delete h.mover[h.name];}catch(e){console.warn(TAG,'Restore',h.name,e);}

    }

    S.restoring=false;

  }

function onBossDamage(source,marker,damage,flags,receiver){

  if(!S.running || String(source)!==S.bossId ||

     String(receiver)!==actor || (Number(flags)&32))return;

  traceBoss(Number(damage)>0?'boss-hit':'boss-signal','marker='+String(marker)+' damage='+String(damage));

  // A direct Boss hit on the outer ring shows the configured radius is insufficient.

  // Expand conservatively; this observation alone does not identify an AoE boundary.

  if(S.phase==='RETREAT'&&Number(damage)>0&&!(Number(flags)&(4|16|32|64|128|256))){

    const d=gap(pos(S.me),pos(S.boss));

    if(Number.isFinite(d)&&d>=recoveryRadius()-25&&d>recoveryGeometry().range){

      S.observedDangerRadius=Math.max(S.observedDangerRadius||0,d);

      S.orbitRadius=Math.max(S.orbitRadius||0,recoveryRadius());S.waypoint=null;

      note('warn','Boss hit on outer ring at '+d.toFixed(1)+'; expanding recovery ring to '+recoveryRadius().toFixed(1));

    }

  }

  const at=clock();

  // V12.7: REFLECT FILTER FIRST. Defer old skill predictors until the matching

  // outgoing player->Boss event has had time to arrive. Keeps V12.6 raw log.

  try{v127Basic.incoming(Number(marker),Number(damage),Number(flags),at);}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

  try{v126Observer.onHit(Number(marker),at,Number(damage),Number(flags));}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

  if(Number(marker)!==90220000)return;

  const sample=S._bossSurvival?.observe9022(at);

  if(sample && !sample.accepted)return; // same hit may emit multiple events

  S._9022LastAt=at;

  const metrics=S._bossSurvival?.status(at);

  S._9022Samples=metrics?.samples9022||0;

  S._9022PeriodMs=metrics?.intervals9022?.length ?

    metrics.intervals9022.reduce((a,b)=>a+b,0)/metrics.intervals9022.length : 0;

  if(S._9022Samples===2)note('info','9022 timing samples ready, cycle '+Math.round(S._9022PeriodMs)+'ms');



  if(S.phase==='RETREAT'){

    S.damage9022++;

    if(S.damage9022>=C.maxHits9022){

      (W.queueMicrotask||((fn)=>(W.KVPV_V1?.timers?.setTimeout ?? W.setTimeout)(fn,0)))(()=>{

        if(S.running)stop('9022 damage persists during retreat');

      });

    }

  }

}

function next9022Ms(at){return S._bossSurvival?.next9022(at)??null;}



/* ==== KVPV V12.5 SMART ORBIT - SINGLE MOVEMENT OWNER ====
 * Uses existing HitRun RETREAT mover only. No new timers/RPC/attacks.
 * Observed client coords only: neither collision-map nor server AoE is known.
 */

const V125CFG={enabled:true,arcStepDeg:20,maxArcStepDeg:32,

  outerSlack:30,innerTolerance:32,stallSidestepDeg:16,

  maxHistory:24};

const V125ST={direction:C.clockwise?1:-1,planned:0,radial:0,

  arcs:0,stalls:0,reversals:0,guardFallbacks:0,lastDistance:null,

  lastWaypoint:null,lastReason:'idle',history:[]};

function v125Status(print=false){

  const out={version:'12.5.0',enabled:V125CFG.enabled,

    hitRunRunning:S.running,phase:S.phase,bossId:S.bossId,

    direction:V125ST.direction===1?'CCW':'CW',

    planned:V125ST.planned,radial:V125ST.radial,

    arcWaypoints:V125ST.arcs,stalls:V125ST.stalls,

    reversals:V125ST.reversals,safetyFallbacks:V125ST.guardFallbacks,

    lastDistance:V125ST.lastDistance,lastWaypoint:V125ST.lastWaypoint,

    lastReason:V125ST.lastReason,history:V125ST.history.slice(-8),

    limits:'Client coordinates only; unknown walls/skill area; does not guarantee dodge.'};

  if(print)console.table([{phase:out.phase,planned:out.planned,

    arcs:out.arcWaypoints,radial:out.radial,stalls:out.stalls,

    reversals:out.reversals,lastReason:out.lastReason}]);

  return out;

}

function v125Note(mode,d,target,t){

  V125ST.planned++;

  V125ST.lastDistance=Math.round(d*10)/10;

  V125ST.lastWaypoint={x:Math.round(target.x*10)/10,y:Math.round(target.y*10)/10};

  V125ST.lastReason=mode;

  if(mode.startsWith('radial'))V125ST.radial++;else V125ST.arcs++;

  const row={at:Date.now(),mode,d:V125ST.lastDistance,...V125ST.lastWaypoint};

  V125ST.history.push(row);

  if(V125ST.history.length>V125CFG.maxHistory)V125ST.history.shift();

}

function v125ResetDirection(){V125ST.direction=C.clockwise?1:-1;}

function v125SegmentDistance(b,p,q){

  const vx=q.x-p.x,vy=q.y-p.y,den=vx*vx+vy*vy;

  if(den<1)return Math.hypot(p.x-b.x,p.y-b.y);

  const projection=Math.max(0,Math.min(1,((b.x-p.x)*vx+(b.y-p.y)*vy)/den));

  return Math.hypot(p.x+projection*vx-b.x,p.y+projection*vy-b.y);

}

function v125Plan(b,p,t,stalled=false,cycles=0){

  if(!V125CFG.enabled)return null;

  const dx=p.x-b.x,dy=p.y-b.y,d=Math.hypot(dx,dy);

  if(!Number.isFinite(d)||d<1)return null;

  const baseRadius=recoveryRadius(),maxRadius=Math.max(Number(C.maxOrbitRadius),baseRadius);

  const r=Math.min(maxRadius,Math.max(baseRadius,Number(S.orbitRadius)||0));

  if(!Number.isFinite(r)||r<80)return null;

  if(stalled){

    V125ST.stalls++;

    // Switch arc side on initial stall and after every second additional stall.

    if(cycles===1||(cycles>1&&cycles%2===1)){

      V125ST.direction*=-1;V125ST.reversals++;

    }

  }

  const angle=Math.atan2(dy,dx),outward=d<r-V125CFG.innerTolerance;

  const step=Math.max(8,Math.min(V125CFG.maxArcStepDeg,

    Number(V125CFG.arcStepDeg)||20))*Math.PI/180;

  const side=V125ST.direction;

  let radius,theta,mode;

  if(outward){

    radius=r;

    theta=angle+(stalled?side*V125CFG.stallSidestepDeg*Math.PI/180:0);

    mode=stalled?'radial-escape':'radial-to-ring';

  }else{

    // Short bounded circular chord, keep close to the existing outer ring.

    radius=Math.min(maxRadius,Math.max(r,Math.min(d,r+V125CFG.outerSlack)));

    theta=angle+side*step;

    mode=stalled?'arc-reverse':'arc-follow';

  }

  let target={x:b.x+radius*Math.cos(theta),y:b.y+radius*Math.sin(theta)};

  const minimum=v125SegmentDistance(b,p,target);

  const safeFloor=outward?Math.max(1,d-2):Math.max(recoveryGeometry().range+20,r-40);

  if(minimum<safeFloor){

    // Never submit a chord that visibly cuts deeper into the Boss ring.

    V125ST.guardFallbacks++;

    target={x:b.x+(dx/d)*Math.max(r,d),y:b.y+(dy/d)*Math.max(r,d)};

    mode='radial-safety-fallback';

  }

  if(!Number.isFinite(target.x)||!Number.isFinite(target.y))return null;

  v125Note(mode,d,target,t);

  return target;

}

W.KVPV_V125_ORBIT=Object.freeze({version:'12.5.0',config:V125CFG,

  status:v125Status,enable(v=true){V125CFG.enabled=!!v;

    return v125Status(false);},history(){return V125ST.history.slice();}});

/* ==== END V12.5 SMART ORBIT ==== */





function newWaypoint(b,p,t){

  const route=v125Plan(b,p,t);

  if(route){S.waypoint=route;S.waypointAt=t;S.waypointCount++;return route;}



  const r=Math.min(

    Math.max(C.maxOrbitRadius,recoveryRadius()),

    Math.max(recoveryRadius(),S.orbitRadius||0)

  );



  

  if(S._lineFor!==S.retreatAt){

    const dx=p.x-b.x,dy=p.y-b.y;

    const d=Math.hypot(dx,dy);

    S._ux=d>1?dx/d:1;

    S._uy=d>1?dy/d:0;

    S._side=-1;

    S._lineFor=S.retreatAt;

  }



  const ux=S._ux,uy=S._uy;

  const cx=b.x+ux*r,cy=b.y+uy*r;

  const d=Math.hypot(p.x-b.x,p.y-b.y);



  if(d<r-25){

    

    S.waypoint={x:cx,y:cy};

  }else{

    

    S._side*=-1;

    S.waypoint={

      x:cx-uy*120*S._side,

      y:cy+ux*120*S._side

    };

  }



  S.waypointAt=t;

  S.waypointCount++;

  return S.waypoint;

}



  

  function sendMove(t){

    S.insideOwnMove=true;

    try{S.mover.moveTo(S.waypoint.x,S.waypoint.y);S.moveAttempts++;S.lastMoveAt=t;traceBoss('move');}

    finally{S.insideOwnMove=false;}

  }

 



function enterRetreat(c,h,t){

  const p=pos(c.me);

  const b=pos(c.boss);



  if(!p||!b){

    note('warn','Missing player or Boss position');

    return;

  }



  const d=gap(p,b);



  if(d===null||!Number.isFinite(d)){

    note('warn','Invalid distance to Boss');

    return;

  }



  if(!c.boss||oid(c.boss)!==S.bossId)return;



  S.phase='RETREAT';

  S.retreatAt=t;

  S.healBasePct=h.pct;

  S.bestHealPct=h.pct;

  S.minObservedPct=h.pct;

  S.healObserved=false;

  S._v1271HpReady=false;

  S._v1271NoHealWarnAt=0;

  S.damage9022=0;



  S.startBossPos={...b};

  S.startBossHP=hp(c.boss);



  S.orbitRadius=Math.min(

    Math.max(C.maxOrbitRadius,recoveryRadius()),

    Math.max(recoveryRadius(),d+65)

  );



  S.waypoint=null;

  S.lastProgressAt=t;

  S.progressPosition={...p};

  S._stallCycles=0;

  S._retreatDistance=d;S._lastEmergencyEscapeAt=-Infinity;S._emergencyEscapes=0;



  S.blockedChases=0;

  S.gameStops=0;

  S.blockedNativeStops=0;

  S.moveAttempts=0;



  v125ResetDirection();

  S.orbitArcDeg=0;

  S.orbitLastBearing=null;

  S.orbitLaps=0;

  S.waypointCount=0;

  S._bossSurvival?.resetGate?.();



  try{

    installGuard();

  }catch(e){

    restoreGuard();

    

    S.phase='FIGHT';

    throw e;

  }



  note(

    'info',

    'HP '+h.pct.toFixed(1)+

    '% -> RETREAT, orbit R='+

    Math.round(S.orbitRadius)+

    ' min laps='+C.minOrbitLaps

  );



  try{W.KVPV_V122_RETURN?._enter?.({at:t,bossId:S.bossId,

    bossTypeId:prop(c.boss,'occ'),bossName:prop(c.boss,'name'),hpPct:h.pct});}

  catch(e){v122Log('advisor-error',{message:String(e)});V122S.errors++;}

  newWaypoint(b,p,t);

  sendMove(t);

}



  

  function leaveRetreat(reason){

    if(S.phase!=='RETREAT')return;

    try{W.KVPV_V122_RETURN?._exit?.({at:clock(),hpPct:S.lastHpPct,reason});}

    catch(e){v122Log('advisor-error',{message:String(e)});V122S.errors++;}

    S.phase='FIGHT';

    restoreGuard();

    

    S.waypoint=null;S.startBossPos=null;S.startBossHP=null;

    S.streakRecover++;

    note('info','Resume fight: '+reason);

  }

  // Count actual orbit travel. The boss-relative bearing advances only while

  // the character is outside the inner ring and moving in the chosen direction.

  // Teleports, path resets, and backwards motion do not count as completed laps.

  

  function measureOrbit(p,b){

    const d=gap(p,b);

    if(d==null || d<Math.max(50,S.orbitRadius-50)){

      S.orbitLastBearing=null;return;

    }

    const bearing=Math.atan2(p.y-b.y,p.x-b.x);

    if(S.orbitLastBearing!=null){

      const signed=Math.atan2(Math.sin(bearing-S.orbitLastBearing),

        Math.cos(bearing-S.orbitLastBearing))*(C.clockwise?1:-1);

      if(signed>0 && signed<=1.2){

        S.orbitArcDeg+=signed*180/Math.PI;

        S.orbitLaps=S.orbitArcDeg/360;

      }

    }

    S.orbitLastBearing=bearing;

  }/* KVPV V11.2 — THIEN QUAN SMART DODGE.
 * Predicts only from OBSERVED, repeated boss damage markers. No claims of
 * server skill-forecast access, cooldown overrides or guaranteed dodges.
 * Loaded INSIDE the already existing HitRun game-frame closure, before tick().
 */

const TQCFG={

  enabled:true,

  skillDamageMinPct:5,        // non-9022 markers must hurt >= 5% of max HP

  minSamples:4,              // 4 impacts => 3 real spacing intervals

  minPeriodMs:1200,

  maxPeriodMs:11500,

  maxJitterRatio:.18,

  predictionLeadMs:1050,

  dodgeRadial:95,

  dodgeSide:120,

  maxDodgeBossDistance:325,

  minDodgeMs:600,

  afterExpectedHitMs:400,

  maxDodgeMs:3000,

  dodgeCooldownMs:1600,

  moveRetryMs:950,

  maxMoveRetries:2,

  maxSkills:10

};

function tqModel(){

  const records=new Map();

  let lastDodge=-Infinity, lastImpact=null, lastForecast=null;

  let learned=0,dodges=0,returns=0,blocked=0,failures=0;

  let currentBoss=null,stageConfirmed=false,failReason='';

  const nameOf=b=>String(prop(b,'name')??'');

  function matchesNativeStage(b){
    if(!b||W.KVPV_TQ_SCOPE?.inside?.()!==true||W.KVPV_FAR_SCOPE?.eligible?.(b)===false)return false;

    if(!b)return false;

    const n=nameOf(b);

    if(/thi[eê]n\s*quan|thi[eê]n\s*ki[eê]p/i.test(n))return true;

    try{

      const level=Number(_Ba?._Co?._Mo?.ins?.curLv);

      if(!Number.isSafeInteger(level)||level<=0)return false;

      const cfg=_ft?._h$?.ins?.getCfgByLv?.(level);

      if(!cfg)return false;

      const stageOcc=Number(_ft?._h$?.ins?.occ?.(cfg,level));

      const targetOcc=Number(prop(b,'occ'));

      return Number.isSafeInteger(stageOcc)&&stageOcc>0&&stageOcc===targetOcc;

    }catch(_){return false;}

  }

  function reset(b){

    records.clear();lastDodge=-Infinity;lastImpact=null;lastForecast=null;

    learned=0;dodges=0;returns=0;blocked=0;failures=0;failReason='';

    currentBoss=b?oid(b):null;stageConfirmed=matchesNativeStage(b);

  }

  function observe({at,marker,damage}){

    if(!TQCFG.enabled || !stageConfirmed || !S.running ||

       currentBoss!==S.bossId || !Number.isFinite(at) ||

       !Number.isSafeInteger(marker) || marker<=0)return false;

    const health=hp(S.me);

    const magnitude=Number.isFinite(damage)&&damage>0&&health?.max>0?

      damage/health.max*100 : 0;

    if(marker!==90220000 && magnitude<TQCFG.skillDamageMinPct)return false;

    let r=records.get(marker);

    if(!r){

      if(records.size>=TQCFG.maxSkills){ // remove oldest observed marker

        let oldest=null;

        for(const [k,v] of records)if(!oldest||v.lastAt<oldest.v.lastAt)oldest={k,v};

        if(oldest)records.delete(oldest.k);

      }

      r={marker,lastAt:null,intervals:[],hits:0,highPct:0};records.set(marker,r);

    }

    if(r.lastAt!==null){

      const delta=at-r.lastAt;

      if(delta<700)return false; // ignore repeated packets/multi-hit cluster

      if(delta>=TQCFG.minPeriodMs && delta<=TQCFG.maxPeriodMs){

        r.intervals.push(delta);if(r.intervals.length>7)r.intervals.shift();

      }else{r.intervals=[];r.hits=0;}

    }

    r.hits++;r.lastAt=at;

    r.highPct=Math.max(r.highPct,magnitude);

    lastImpact={marker,at};learned++;

    return true;

  }

  function forecasts(at){

    if(!TQCFG.enabled||!stageConfirmed||!S.running)return [];

    const arr=[];

    for(const r of records.values()){

      if(r.hits<TQCFG.minSamples||r.intervals.length<TQCFG.minSamples-1)continue;

      const intervals=[...r.intervals].sort((a,b)=>a-b);

      const period=intervals[Math.floor(intervals.length/2)];

      const maxErr=Math.max(...intervals.map(v=>Math.abs(v-period)));

      const ratio=maxErr/Math.max(1,period);

      if(ratio>TQCFG.maxJitterRatio)continue;

      const expectedAt=r.lastAt+period;

      const eta=expectedAt-at;

      if(eta< -180||eta>period)continue;

      const confidence=Math.max(0,Math.min(1,1-ratio/TQCFG.maxJitterRatio));

      if(confidence<.40)continue;

      arr.push({marker:r.marker,at:expectedAt,eta,period,

        samples:r.hits,jitterMs:Math.round(maxErr),confidence:+confidence.toFixed(2),

        worstDamagePct:+r.highPct.toFixed(2)});

    }

    return arr.sort((a,b)=>a.eta-b.eta);

  }

  function predict(at){

    if(at-lastDodge<TQCFG.dodgeCooldownMs || S.phase!=='FIGHT')return null;

    const first=forecasts(at).find(x=>x.eta>=-50&&x.eta<=TQCFG.predictionLeadMs);

    if(!first)return null;

    lastDodge=at;lastForecast=first;dodges++;

    return first;

  }

  function markReturn(){returns++;}

  function markBlocked(reason){blocked++;failReason=String(reason);}

  function markFailure(reason){failures++;failReason=String(reason);}

  

  function status(at=clock()){

    return {version:'11.2.0',enabled:TQCFG.enabled,eligible:stageConfirmed,

      selectedBoss:currentBoss,observations:learned,trainedMarkers:[...records.values()]

        .filter(x=>x.intervals.length>=3).map(x=>x.marker),

      predicted:forecasts(at)[0]||null,

      dodge:S.phase==='DODGE'&&S._tqDodge?{

        marker:S._tqDodge.marker,expectedInMs:Math.round(S._tqDodge.impactAt-at),

        elapsedMs:Math.round(at-S._tqDodge.startedAt),moves:S._tqDodge.moves}:null,

      dodges,returns,blocked,failures,lastForecast,failReason,

      note:stageConfirmed?'Observed impact-cycle estimate; NO native skill-cast telegraph'

        :'Inactive: selected target is not confirmed Thiên Quan stage boss'};

  }

  return {reset,observe,predict,markReturn,markBlocked,markFailure,status};

}

S._tq112=tqModel();

S._tqDodge=null;

function startTqDodge(c,t,fore){
  if(W.KVPV_TQ_SCOPE?.inside?.()!==true){S._tq112.markBlocked('outside Tian Quan');return false;}

  const p=pos(c.me),b=pos(c.boss);

  if(!p||!b){S._tq112.markBlocked('position missing');return false;}

  // Do not override an existing retreat, target or scene.

  if(S.phase!=='FIGHT' || S.hooks.length){S._tq112.markBlocked('busy');return false;}

  const dx=p.x-b.x,dy=p.y-b.y,d=Math.hypot(dx,dy);

  const ux=d>1?dx/d:1,uy=d>1?dy/d:0;

  const side=S._tqSide===1?-1:1;S._tqSide=side;

  const dodgeLimit=Math.max(TQCFG.maxDodgeBossDistance,recoveryGeometry().range+80);
  const outside=Math.min(dodgeLimit,

    Math.max(d+Math.min(TQCFG.dodgeRadial,dodgeLimit-d),d));

  let qx=p.x+ux*(outside-d)-uy*TQCFG.dodgeSide*side;

  let qy=p.y+uy*(outside-d)+ux*TQCFG.dodgeSide*side;

  const qd=Math.hypot(qx-b.x,qy-b.y);

  if(qd>dodgeLimit){

    const factor=dodgeLimit/qd;

    qx=b.x+(qx-b.x)*factor;qy=b.y+(qy-b.y)*factor;

  }

  const basicCadence=String(fore?.source||'').startsWith('v127-basic');

  // V12.9: an unverified "safe-zone" short step can override the radial

  // basic-attack sidestep. Only bypass it when NO real hazard geometry exists.

  const knownHazard=Number(S._tq114?.status?.()?.activeThreats||0)>0;

  const smartWaypoint=(!basicCadence||knownHazard)

    ?S._tq114?.plan?.(c,t,fore):null;

  if(smartWaypoint){qx=smartWaypoint.x;qy=smartWaypoint.y;}

  S.phase='DODGE';

  S._tqDodge={startedAt:t,impactAt:fore.at,marker:fore.marker,source:fore.source||'legacy',

    returnsAfter:Math.max(t+TQCFG.minDodgeMs,fore.at+

      (String(fore.source||'').startsWith('v127-basic')?V127CFG.afterMs:TQCFG.afterExpectedHitMs)),

    lastMoveAt:0,moves:0,waypoint:{x:qx,y:qy}};

  

  try{

    installGuard();

    S.waypoint={x:qx,y:qy};

    sendMove(t);S._tqDodge.moves++;S._tqDodge.lastMoveAt=t;

    try{v129RecordDodge(fore,d,Math.hypot(qx-b.x,qy-b.y),!!smartWaypoint,t);}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

    S._tq114?.begin?.(fore);

    S._tq117?.begin?.(fore,t);

    note('info','TQ: dodging marker '+fore.marker+', ETA '+Math.round(fore.eta)+'ms (confidence '+fore.confidence+')');

    return true;

  }catch(e){

    S._tq112.markFailure('dodge start failed: '+String(e));

    S.phase='FIGHT';restoreGuard();S._tqDodge=null;

    return false;

  }

}

function finishTqDodge(reason){

  if(S.phase!=='DODGE')return;

  const timedBasic=String(S._tqDodge?.source||'').startsWith('v127-basic');

  S.phase='FIGHT';

  restoreGuard();

  // Stop any remaining V12.7 sidestep now; let native target acquisition

  // re-engage, rather than leaving the mover headed away after the hit window.

  if(timedBasic)try{S.mover?.stop?.();}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

  S._tqDodge=null;S.waypoint=null;

  S._tq114?.end?.();

  S._tq117?.end?.(reason,clock());

  S._tq112.markReturn();

  note('info','TQ: resume attacks ('+reason+')');

}

function tickTqDodge(c,t){

  const z=S._tqDodge;

  if(!z){finishTqDodge('no dodge state');return;}

  const elapsed=t-z.startedAt;

  if(t>=z.returnsAfter || elapsed>=TQCFG.maxDodgeMs){

    finishTqDodge(elapsed>=TQCFG.maxDodgeMs?'timeout':'impact window passed');

    return;

  }

  // A single retry is enough; do not flood native moveTo or 3rd party scripts.

  if(z.moves<=TQCFG.maxMoveRetries && t-z.lastMoveAt>=TQCFG.moveRetryMs &&

    S.mover.running?.()===false){

    S.waypoint=z.waypoint;sendMove(t);z.moves++;z.lastMoveAt=t;

  }

}

W.KVPV_TQ112=Object.freeze({version:'11.2.0',config:TQCFG,

  enable(value=true){TQCFG.enabled=!!value;return S._tq112.status();},

  stop(){TQCFG.enabled=false;

    if(S.phase==='DODGE')finishTqDodge('manual disable');return S._tq112.status();},

  status(show=true){const st=S._tq112.status();if(show)console.log('[TQ SMART112]',st);return st;}});








const TQCASTCFG={

  enabled:true,minPairs:2,minCastToImpactMs:320,maxCastToImpactMs:2800,

  minConfidence:.60,maxJitterRatio:.30,leadMs:330,

  castDuplicateMs:220,hitDuplicateMs:650,staleMs:3800

};

function createTqTelegraph(){

  const model=new Map();let recent=null,planned=null;

  let bound=null,seen=0,paired=0,qualified=0,dodges=0,rejected=0;

  let lastError='',bossId='';

  function disconnect(){

    if(bound){

      const {combat,original,wrapped,own}=bound;

      try{if(combat.combat===wrapped){

        if(own)Object.defineProperty(combat,'combat',own);

        else delete combat.combat;

      }}catch(e){lastError=String(e);}

      bound=null;

    }

  }

  function reset(boss){disconnect();model.clear();recent=null;planned=null;

    bossId=boss?oid(boss):'';seen=0;paired=0;qualified=0;dodges=0;rejected=0;lastError='';

  }

  function recordCast(id,at){

    if(!TQCASTCFG.enabled||!S.running||!S._tq112?.status?.(at)?.eligible ||

       String(S.bossId)!==bossId||!Number.isSafeInteger(id)||id<=0||id>1000000)return false;

    if(recent?.id===id&&at-recent.at<TQCASTCFG.castDuplicateMs)return false;

    seen++;recent={id,at};planned=null;

    const m=model.get(id);

    if(m?.delays.length>=TQCASTCFG.minPairs){

      const s=[...m.delays].sort((a,b)=>a-b),median=s[Math.floor(s.length/2)];

      const err=Math.max(...s.map(x=>Math.abs(x-median)));

      const confidence=Math.max(0,1-err/Math.max(1,median*TQCASTCFG.maxJitterRatio));

      if(confidence>=TQCASTCFG.minConfidence){

        planned={marker:id*10000,at:at+median,castAt:at,

          eta:median,skillId:id,source:'native-boss-cast',confidence:+confidence.toFixed(2),

          samples:m.delays.length};qualified++;

      }

    }

    return true;

  }

  function recordHit(marker,at){

    if(!TQCASTCFG.enabled || !S.running || String(S.bossId)!==bossId ||

       !Number.isSafeInteger(marker)||marker<=0||marker%10000!==0)return false;

    const id=marker/10000;

    if(!recent||recent.id!==id)return false;

    const delay=at-recent.at;

    if(delay<TQCASTCFG.minCastToImpactMs||delay>TQCASTCFG.maxCastToImpactMs)return false;

    let m=model.get(id);

    if(!m){m={id,delays:[],lastHit:-Infinity};model.set(id,m);}

    if(at-m.lastHit<TQCASTCFG.hitDuplicateMs)return false;

    m.lastHit=at;m.delays.push(delay);if(m.delays.length>6)m.delays.shift();

    paired++;return true;

  }

  function attach(boss){

    disconnect();

    if(!boss){lastError='Boss not selected';return false;}

    if(!S._tq112?.status?.()?.eligible){lastError='Not a confirmed Tian Guan boss';return false;}

    const component=boss.getComponent?.(_d?._Yct?._Het);

    if(!component||typeof component.combat!=='function'){

      lastError='Boss native combat() not exposed in current client';return false;

    }

    const own=Object.getOwnPropertyDescriptor(component,'combat');

    if(own&&!own.configurable){lastError='Boss combat method non-configurable';return false;}

    const original=component.combat;

    const wrapped=function(...args){

      // Observe BEFORE native call. Never swallow or duplicate native behavior.

      if(this===component){

        try{recordCast(Number(args[0]),clock());}catch(_){rejected++;}

      }

      return original.apply(this,args);

    };

    try{Object.defineProperty(component,'combat',{

      configurable:true,writable:true,enumerable:own?.enumerable??false,value:wrapped});

      bound={combat:component,own,original,wrapped};lastError='';return true;

    }catch(e){lastError=String(e);return false;}

  }

  function predict(at){

    const p=planned;

    if(!TQCASTCFG.enabled||!bound||!S.running||S.phase!=='FIGHT'||!p)return null;

    if(at-p.castAt>TQCASTCFG.staleMs||at>p.at+150){planned=null;return null;}

    const eta=p.at-at;

    if(eta<0||eta>TQCASTCFG.leadMs)return null;

    if(at-(S._tqCastLastDodge||-Infinity)<TQCFG.dodgeCooldownMs)return null;

    S._tqCastLastDodge=at;planned=null;dodges++;

    return {...p,eta};

  }

  function disable(){TQCASTCFG.enabled=false;planned=null;disconnect();}

  function enable(value=true){

    TQCASTCFG.enabled=!!value;

    if(!TQCASTCFG.enabled){planned=null;disconnect();}

    else if(S.running&&S.boss&&!bound)attach(S.boss);

    return status();

  }

  

  function status(){return {version:'11.3.0',enabled:TQCASTCFG.enabled,hooked:!!bound,

    bossId,castsObserved:seen,impactPairs:paired,qualifiedCasts:qualified,dodges,

    rejected,lastError,pending:planned?{skillId:planned.skillId,

      etaMs:Math.round(planned.at-clock()),confidence:planned.confidence}:null,

    trained:[...model.values()].map(x=>({skillId:x.id,pairs:x.delays.length,

      castToImpactMs:x.delays.slice()})),

    note:'Only observed boss native combat(skillId) + matching 1012 damage marker. No proof native combat hook fires on every server skill.'};}

  return {reset,attach,disconnect,recordCast,recordHit,predict,disable,enable,status};

}

S._tq113=createTqTelegraph();

W.KVPV_TQ113=Object.freeze({version:'11.3.0',config:TQCASTCFG,

  status(show=true){const s=S._tq113.status();if(show)console.log('[TQ TELEGRAPH V11.3]',s);return s;},

  stop(){S._tq113.disable();if(S.phase==='DODGE')finishTqDodge('telegraph disabled');return S._tq113.status();},

  enable(v=true){return S._tq113.enable(v);}});

/* KVPV V12.6 Signal Lab -- INSIDE existing HitRun controller.
 * Verified client path: Boss native combat() emits owner.publish(1039,targetId,skillId)
 * after its visual/action guards; server result emits victim.publish(1012,source,marker,damage,flags,receiver).
 * Passive measurements ONLY. No extra timer, RPC, movement, spell invocation or cooldown modifications.
 */

const V126CFG={enabled:true,minCastLagMs:100,maxCastLagMs:3000,

  castDedupMs:120,hitDedupMs:180,chainMinMs:600,chainMaxMs:3000,

  minChainSamples:3,maxChainJitterMs:400,maxEvents:300,maxSessions:6};

function v126CreateObserver(){

  const owner126={};

  let role=null,bossId='',bossOcc=null,stage=null,active=false,lastError='',session=null;

  let previousHit=null,last9005=null;

  const sessions=[];

  const counts={cast:0,hit:0,pairs:0,unpaired:0,duplicate:0,chain:0};

  const times=[];

  const finite=n=>Number.isFinite(n);

  const median=nums=>{

    if(!nums.length)return null;

    const x=[...nums].sort((a,b)=>a-b),h=Math.floor(x.length/2);

    return x.length%2?x[h]:(x[h-1]+x[h])/2;

  };

  function limited(a,item,max){a.push(item);if(a.length>max)a.shift();}

  function detach(){

    if(role && typeof role.off==='function'){

      try{role.off(1039,owner126,onCast);}catch(e){lastError='off 1039: '+String(e);}

    }

    role=null;active=false;

  }

  function cleanForJSON(x){return JSON.parse(JSON.stringify(x));}

  function summarize(){

    const groups={};

    for(const row of session?.pairs||[]){

      const k=String(row.skillId);(groups[k]??=[]).push(row.castToHitMs);

    }

    return Object.entries(groups).map(([skillId,delays])=>{

      const med=median(delays),maxDeviation=Math.max(...delays.map(x=>Math.abs(x-med)));

      return {skillId:+skillId,pairs:delays.length,medianCastToHitMs:med,

        maxDeviationMs:maxDeviation,validatedTiming:delays.length>=3&&maxDeviation<=350};

    }).sort((a,b)=>b.pairs-a.pairs);

  }

  function onCast(targetId,skillId){

    if(!active||!S.running||String(S.bossId)!==bossId)return;

    const id=Number(skillId),at=clock();

    if(!Number.isSafeInteger(id)||id<=0||id>1000000)return;

    const last=session.casts[session.casts.length-1];

    if(last && last.skillId===id && at-last.at<V126CFG.castDedupMs){counts.duplicate++;return;}

    const targeted=String(targetId)===actor;

    limited(session.casts,{at,skillId:id,targetId:String(targetId??''),targetsPlayer:targeted,

      basis:'native Boss role event 1039; client visual/action signal'},V126CFG.maxEvents);

    counts.cast++;

  }

  function onHit(marker,at,damage,flags){

    if(!active||!S.running||String(S.bossId)!==bossId)return;

    const m=Number(marker),d=Number(damage),f=Number(flags);

    if(!Number.isSafeInteger(m)||m<=0||m%10000!==0||!finite(at)||

       !finite(d)||d<=0 || (f&32) || (f&256))return;

    const skillId=m/10000;

    if(previousHit&&previousHit.skillId===skillId&&at-previousHit.at<V126CFG.hitDedupMs){

      counts.duplicate++;return;

    }

    previousHit={skillId,at};counts.hit++;

    let paired=null;

    for(let i=session.casts.length-1;i>=0;i--){

      const c=session.casts[i],lag=at-c.at;

      if(lag>V126CFG.maxCastLagMs)break;

      if(c.skillId!==skillId||c.matched||lag<V126CFG.minCastLagMs)continue;

      if(!(c.targetsPlayer||c.targetId==='0'||c.targetId===''))continue;

      c.matched=true;paired={at,skillId,castToHitMs:Math.round(lag),damage:d,flags:f};

      limited(session.pairs,paired,V126CFG.maxEvents);

      counts.pairs++;break;

    }

    if(!paired)counts.unpaired++;

    limited(session.hits,{at,skillId,damage:d,flags:f,castMatched:!!paired},V126CFG.maxEvents);

    if(skillId===9005){last9005=at;}

    else if(skillId===8011&&last9005!==null){

      const delay=at-last9005;

      if(delay>=V126CFG.chainMinMs&&delay<=V126CFG.chainMaxMs){

        limited(times,Math.round(delay),30);counts.chain++;

        limited(session.chains,{fromSkill:9005,toSkill:8011,impactGapMs:Math.round(delay),at},V126CFG.maxEvents);

      }

      last9005=null;

    }

  }

  

  function start(boss){

    detach();bossId='';bossOcc=null;stage=null;previousHit=null;last9005=null;times.length=0;

    for(const k of Object.keys(counts))counts[k]=0;

    session=null;lastError='';

    if(!V126CFG.enabled)return false;

    if(!boss||typeof boss.on!=='function'||typeof boss.off!=='function'){

      lastError='Selected Boss does not support on/off events';return false;

    }

    bossId=oid(boss);bossOcc=Number(prop(boss,'occ'))||null;

    try{stage=Number(_Ba?._Co?._Mo?.ins?.curLv)||null;}catch(_){stage=null;}

    session={bossId,bossOcc,stage,startedAt:new Date().toISOString(),

      client:'V12.6 observational instrumentation',casts:[],hits:[],pairs:[],chains:[]};

    limited(sessions,session,V126CFG.maxSessions);

    try{boss.on(1039,owner126,onCast);role=boss;active=true;return true;}

    catch(e){lastError='on 1039: '+String(e);detach();return false;}

  }

  

  function stop(){detach();if(session&&!session.endedAt)session.endedAt=new Date().toISOString();}

  

  function status(print=false){

    const m=median(times),jitter=m===null?null:Math.max(...times.map(x=>Math.abs(x-m)));

    const chainReady=times.length>=V126CFG.minChainSamples&&jitter<=V126CFG.maxChainJitterMs;

    const result={version:'12.6.0',enabled:V126CFG.enabled,active,

      bossId,bossOcc,stage,lastError,stats:{...counts},

      castHitModels:summarize(),

      chain9005to8011:{samples:times.length,medianImpactGapMs:m,maxDeviationMs:jitter,

        repeatedInSession:chainReady,

        caution:'Observed impact gaps only. Does not establish cast start, dodge window or server avoidance.'},

      recentCasts:session?.casts.slice(-6)||[],recentHits:session?.hits.slice(-6)||[],

      note:'Native event 1039 is client-side action evidence; 1012 is server-result evidence. No movement changes.'};

    if(print){console.log('[KVPV V12.6 SIGNAL]',result);console.table(result.castHitModels);}

    return result;

  }

  

  function report(){return cleanForJSON({version:'12.6.0',capturedAt:new Date().toISOString(),

    status:status(false),sessions,limitations:[

      'Event 1039 is a client-side native action signal, not a verified server precast.',

      'Event 1012 is damage received, not the exact server calculation timestamp.',

      'No guarantee of successful dodge or route safety without in-game controlled trials.',

      'Timestamps use performance.now() relative to current page session.']});}

  

  function exportJSON(){

    const data=JSON.stringify(report(),null,2),file='KVPV_V126_SIGNAL_'+(stage||'unknown')+'_'+

      new Date().toISOString().replace(/[:.]/g,'-')+'.json';

    if(typeof Blob==='undefined'||!W.URL?.createObjectURL||!W.document?.createElement)return data;

    const uri=W.URL.createObjectURL(new Blob([data],{type:'application/json'}));

    try{const link=W.document.createElement('a');link.href=uri;link.download=file;

      W.document.body.appendChild(link);link.click();link.remove();}

    finally{(W.KVPV_V1?.timers?.setTimeout ?? W.setTimeout)(()=>W.URL.revokeObjectURL(uri),1500);}

    return file;

  }

  function enable(v=true){V126CFG.enabled=!!v;

    if(!V126CFG.enabled)stop();

    else if(S.running&&S.boss)start(S.boss);

    return status(false);

  }

  return Object.freeze({start,stop,onHit,status,report,exportJSON,enable});

}

const v126Observer=v126CreateObserver();

W.KVPV_V126_SIGNAL=Object.freeze({version:'12.6.0',config:V126CFG,

  status:v126Observer.status,report:v126Observer.report,

  exportJSON:v126Observer.exportJSON,enable:v126Observer.enable,

  note:'Preview/measurement only. No automated dodge decision added in V12.6.'});



/* V11.4 - TQ smart zone planner (inside native HitRun closure).
 * No imaginary AoE fields, network calls, cooldown cheats or guaranteed immunity.
 * Geometry is used ONLY when a client-observed telegraph is explicitly supplied.
 * Without geometry, selects a low-exposure radial/tangent path, and native
 * V11.2/11.3 timing forecast remains the source of dodge decisions.
 */

const TQ114CFG={enabled:true,geometryEnabled:true,threatTtlMs:3500,

  minConfidence:0.65,clearance:22,maxDistanceFromBoss:325,

  maxStep:180,arrivalSpeed:0.55,marginMs:150,maxThreats:8};

function makeTq114(){

  let bossId='',threats=[],history=[],proposals=0,dodges=0,damageDuringDodge=0,

    lastPlan=null,lastError='',active=null;

  const N=x=>Number(x),ok=x=>Number.isFinite(N(x)),clamp=(x,a,b)=>Math.max(a,Math.min(b,x));

  const dist=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);

  function reset(boss){bossId=boss?oid(boss):'';threats=[];history=[];active=null;

    proposals=dodges=damageDuringDodge=0;lastPlan=null;lastError='';}

  

  function status(){return {version:'11.4.0',enabled:TQ114CFG.enabled,

    geometryEnabled:TQ114CFG.geometryEnabled,bossId,activeThreats:threats.length,

    plans:proposals,dodges,damageDuringDodge,history:history.slice(-12),

    lastPlan,lastError,

    note:'Zone geometry requires verified real client telegraph data; otherwise bounded directional dodge.'};}

  function ingest(x){

    if(!TQ114CFG.enabled||!TQ114CFG.geometryEnabled||!S.running||

       !S._tq112?.status?.()?.eligible||String(S.bossId)!==bossId)return false;

    // Input must explicitly come from a verified game-frame observer, not guesses.

    if(!x||x.source!=='native-observed'||!['circle','line','cone','ring'].includes(x.shape))return false;

    if(!ok(x.x)||!ok(x.y)||!ok(x.impactAt)||!ok(x.confidence)||

       x.confidence<TQ114CFG.minConfidence||x.confidence>1)return false;

    const t=clock(),end=N(x.impactAt),dur=ok(x.durationMs)?N(x.durationMs):200;

    if(end<t-100||end>t+4000||dur<0||dur>3000)return false;

    if(!ok(x.radius)||N(x.radius)<5||N(x.radius)>1000)return false;

    if(['line','cone'].includes(x.shape)&&(!ok(x.angle)||!ok(x.width)))return false;

    if(x.shape==='ring'&&(!ok(x.innerRadius)||N(x.innerRadius)<0||N(x.innerRadius)>=N(x.radius)))return false;

    const h={shape:x.shape,x:N(x.x),y:N(x.y),radius:N(x.radius),

      angle:ok(x.angle)?N(x.angle):0,width:ok(x.width)?N(x.width):0,

      innerRadius:ok(x.innerRadius)?N(x.innerRadius):0,

      impactAt:end,durationMs:dur,confidence:N(x.confidence),source:x.source};

    if(h.shape==='cone'&&(h.width<=0||h.width>Math.PI*2))return false;

    if(h.shape==='line'&&(h.width<=0||h.width>300))return false;

    threats=threats.filter(z=>z.impactAt+z.durationMs>=t-100);

    threats.push(h);if(threats.length>TQ114CFG.maxThreats)threats.shift();

    return true;

  }

  function inThreat(p,h){

    const dx=p.x-h.x,dy=p.y-h.y,d=Math.hypot(dx,dy),pad=TQ114CFG.clearance;

    if(h.shape==='circle')return d<=h.radius+pad;

    if(h.shape==='ring')return d>=Math.max(0,h.innerRadius-pad)&&d<=h.radius+pad;

    const da=Math.atan2(Math.sin(Math.atan2(dy,dx)-h.angle),Math.cos(Math.atan2(dy,dx)-h.angle));

    if(h.shape==='cone')return d<=h.radius+pad&&Math.abs(da)<=h.width/2+0.10;

    if(h.shape==='line')return Math.abs(Math.sin(da)*d)<=h.width/2+pad &&

      Math.cos(da)*d>=-pad&&Math.cos(da)*d<=h.radius+pad;

    return false;

  }

  function hazardsAt(p,arrive,t){return threats.filter(z=>

    arrive>=z.impactAt-TQ114CFG.marginMs && arrive<=z.impactAt+z.durationMs+TQ114CFG.marginMs&&inThreat(p,z));}

  function plan(c,t,forecast){

    if(!TQ114CFG.enabled||!S.running||!S._tq112?.status?.()?.eligible ||

       String(S.bossId)!==bossId||S.phase!=='FIGHT')return null;

    const p=pos(c.me),b=pos(c.boss);

    if(!p||!b||![p.x,p.y,b.x,b.y].every(Number.isFinite))return null;

    threats=threats.filter(z=>z.impactAt+z.durationMs>=t-100&&z.impactAt<=t+TQ114CFG.threatTtlMs);

    const dx=p.x-b.x,dy=p.y-b.y,d=Math.hypot(dx,dy),ux=d>1?dx/d:1,uy=d>1?dy/d:0;

    const directions=[{x:ux,y:uy,label:'OUT'}, {x:-uy,y:ux,label:'LEFT'},

      {x:uy,y:-ux,label:'RIGHT'}, {x:ux*.7-uy*.7,y:uy*.7+ux*.7,label:'OUT-LEFT'},

      {x:ux*.7+uy*.7,y:uy*.7-ux*.7,label:'OUT-RIGHT'}];

    const samples=[];

    for(const dir of directions)for(const step of [75,120,170]){

      let q={x:p.x+dir.x*step,y:p.y+dir.y*step};

      const db=dist(q,b);

      if(db>TQ114CFG.maxDistanceFromBoss){const f=TQ114CFG.maxDistanceFromBoss/db;

        q={x:b.x+(q.x-b.x)*f,y:b.y+(q.y-b.y)*f};}

      const delta=dist(p,q);if(delta<30||delta>TQ114CFG.maxStep+1)continue;

      const arrival=t+delta/Math.max(.1,TQ114CFG.arrivalSpeed);

      const holdTime=Math.max(arrival,Number.isFinite(forecast?.at)?forecast.at:arrival);

      const intersect=hazardsAt(q,holdTime,t);

      const geometry=threats.length>0;

      // Avoid crossing dangerous regions as well as choosing a dangerous endpoint.

      let crossed=0;

      if(geometry)for(const a of [.25,.50,.75]){

        const s={x:p.x+(q.x-p.x)*a,y:p.y+(q.y-p.y)*a};

        crossed+=hazardsAt(s,t+(arrival-t)*a,t).length;

      }

      // Conservative fallback: increase Boss separation but stay within leash.

      const safeDistance=dist(q,b);

      const score=intersect.length*10000+crossed*1600+

        delta*.9-Math.min(safeDistance,240)*.25+

        (dir.label==='OUT'?-15:0)+(history.slice(-3).filter(v=>v.dir===dir.label&&v.damaged).length*85)+

        (S._tq117?.penalty?.(forecast?.marker,dir.label)||0);

      samples.push({...q,dir:dir.label,score,risk:intersect.length,crossed,arrival:Math.round(arrival)});

    }

    samples.sort((a,b)=>a.score-b.score);

    const best=samples[0];if(!best){lastError='No traversable bounded waypoint';return null;}

    proposals++;lastPlan={direction:best.dir,risk:best.risk,trajectoryRisks:best.crossed,

      hasObservedGeometry:threats.length>0,candidates:samples.length,forecastSource:forecast?.source||'cycle',

      target:{x:+best.x.toFixed(1),y:+best.y.toFixed(1)}};

    return {x:best.x,y:best.y};

  }

  function begin(forecast){active={hp:hp(S.me)?.current??null,at:clock(),

    marker:forecast?.marker??null,dir:lastPlan?.direction||null};dodges++;}

  function damage(marker,value){if(!active||!Number.isFinite(Number(value))||Number(value)<=0)return;

    damageDuringDodge++;active.damaged=true;active.damage=(active.damage||0)+Number(value);}

  function end(){if(!active)return;history.push({dir:active.dir,damaged:!!active.damaged,

    marker:active.marker,durationMs:Math.max(0,clock()-active.at)});

    if(history.length>30)history.shift();active=null;}

  function disable(){TQ114CFG.enabled=false;threats=[];active=null;return status();}

  function enable(v=true){TQ114CFG.enabled=!!v;return status();}

  return {reset,ingest,plan,begin,damage,end,status,enable,disable,inThreat};

}

S._tq114=makeTq114();

W.KVPV_TQ114=Object.freeze({version:'11.4.0',config:TQ114CFG,

  status(show=true){const r=S._tq114.status();if(show)console.log('[TQ114 SAFE-ZONE]',r);return r;},

  stop(){return S._tq114.disable();},enable(v=true){return S._tq114.enable(v);},

  observeNativeTelegraph(value){return S._tq114.ingest(value);}});

/* KVPV V11.5 COMPANION KITE, inside the original HitRun closure.
 * Sends native moveTo only. Does NOT force pet/fuwa damage or bypass server range.
 * HITRUN RETREAT and telegraphed DODGE always take priority.
 */

const KITE115CFG={

  enabled:true, mode:'conservative', minHpPct:50, continueHpPct:40,

  // Hold the native main attack for several seconds to trigger pet/fuwa where supported.

  fightWindowMs:3600, minFightWindowMs:1800, minCycleGapMs:1800,

  outerDistance:285, innerDistance:160, outerHoldMs:1000,

  outTimeoutMs:2600, inTimeoutMs:3000,

  waypointTolerance:30, repathMs:900, maxMoveAttempts:3,

  maxFailedCycles:4, autoSuspendOnNoPetDamage:false,

  minStartDistance:50, maxStartDistance:250,

};

function createKite115(){

  let active=null, bossId='', beganFightAt=0, nextEligible=Infinity;

  let boundBoss=null, listener=null;

  let cycles=0, returns=0, aborts=0, stalls=0, exceptions=0, failedCycles=0;

  let counts={petNear:0,petFar:0,petTransit:0,unknownSpecialNear:0,

    unknownSpecialFar:0,unknownSpecialTransit:0,otherSources:0,unknownPosition:0};

  let range={peakClientDistance:0,outerThreshold:0,outerReachedCycles:0,

    petFarExamples:[],petTransitExamples:[]};

  let lastReason='',lastError='',lastSkipReason='not initialized',recent=[];

  const max=(v,min,max)=>Math.min(max,Math.max(min,v));

  // Start only above the native retreat threshold. Do not bypass native safety.

  function minStartHp(){

    return Math.max(Number(KITE115CFG.minHpPct)||50,

      Number(C.leavePct)+10,Number(C.resumeFightPct||40)+5);

  }

  // Hysteresis: allow small HP variations while moving, but never below native retreat safety.

  function minContinueHp(){

    return Math.max(Number(C.leavePct)+5,

      Math.min(minStartHp()-3,Number(KITE115CFG.continueHpPct)||40));

  }

  function companionAvailable(me){

    const p=me?.property;

    try{return !!(p?.get?.('petContext') || p?.get?.('fuwaContext'));}

    catch(_){return false;}

  }

  function cleanObserver(){

    if(boundBoss && listener){try{boundBoss.off?.(1012,S,listener);}catch(_){window.KVPV_V1?.diagnostics?.record(_);}}

    boundBoss=null;listener=null;

  }

  function observeBoss(boss){

    cleanObserver();

    if(!boss || typeof boss.on!=='function'||typeof boss.off!=='function')return false;

    listener=function(src,marker,damage,flags,receiver){

      if(!S.running||oid(boss)!==bossId || String(receiver)!==bossId)return;

      if(!Number.isFinite(Number(damage))||Number(damage)<=0||(Number(flags)&32))return;

      if(String(src)!==actor){counts.otherSources++;return;}

      // 11.6: movement PHASE is not distance. V11.5.2 labeled a hit as

      // 'far' immediately after OUT began, even when player remained near Boss.

      // Client coordinates are estimates, NOT verified server attack range.

      const moving=!!active&&['KITE_OUT','KITE_IN'].includes(S.phase);

      const a=pos(S.me),b=pos(boss),d=a&&b?gap(a,b):null;

      const finite=Number.isFinite(d);

      const outer=Math.max(0,KITE115CFG.outerDistance-KITE115CFG.waypointTolerance);

      const inner=KITE115CFG.innerDistance+KITE115CFG.waypointTolerance;

      const zone=!moving?'Near':!finite?'Transit':d>=outer?'Far':d<=inner?'Near':'Transit';

      if(moving){

        if(finite){

          range.peakClientDistance=Math.max(range.peakClientDistance,d);

          if(active)active.peakClientDistance=Math.max(active.peakClientDistance||0,d);

          if(d>=outer&&active)active.outerReached=true;

        }else counts.unknownPosition++;

      }

      if(Number(flags)&4){

        counts['pet'+zone]++;

        try{S._tq118?.observeHit?.({zone,damage:Number(damage),distance:finite?d:null,

          phase:S.phase,at:Date.now()});}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

        const examples=zone==='Far'?range.petFarExamples:zone==='Transit'?range.petTransitExamples:null;

        if(examples){examples.push({at:Date.now(),distance:finite?+d.toFixed(1):null,

          phase:S.phase,bossId});if(examples.length>8)examples.shift();}

      }else if(Number(flags)&64){

        counts['unknownSpecial'+zone]++;

        try{S._tq118?.observeHit?.({zone,damage:Number(damage),distance:finite?d:null,

          phase:S.phase,at:Date.now(),unknown:true});}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

      }

    };

    try{boss.on(1012,S,listener);boundBoss=boss;return true;}

    catch(e){lastError='damage observer unavailable: '+String(e);cleanObserver();return false;}

  }

  function reset(boss){

    cleanObserver();active=null;bossId=boss?oid(boss):'';beganFightAt=clock();

    nextEligible=beganFightAt+Math.max(KITE115CFG.fightWindowMs,KITE115CFG.minFightWindowMs);

    cycles=returns=aborts=stalls=exceptions=failedCycles=0;lastError='';lastReason='';lastSkipReason='warming up';recent=[];

    counts={petNear:0,petFar:0,petTransit:0,unknownSpecialNear:0,

      unknownSpecialFar:0,unknownSpecialTransit:0,otherSources:0,unknownPosition:0};

    range={peakClientDistance:0,outerThreshold:Math.max(0,KITE115CFG.outerDistance-KITE115CFG.waypointTolerance),

      outerReachedCycles:0,petFarExamples:[],petTransitExamples:[]};

    observeBoss(boss);

  }

  function pointAtDistance(p,b,target){

    const dx=p.x-b.x,dy=p.y-b.y,d=Math.hypot(dx,dy);

    const ux=d>1?dx/d:1,uy=d>1?dy/d:0;

    return {x:b.x+ux*target,y:b.y+uy*target};

  }

  function qualified(c,t,h){

    const deny=reason=>{lastSkipReason=reason;return false;};

    if(!KITE115CFG.enabled)return deny('disabled manually');

    if(!S.running)return deny('HitRun not running');

    if(S.phase!=='FIGHT')return deny('busy: '+S.phase);

    if(!S._tq112?.status?.()?.eligible)return deny('not a verified Thien Quan boss');

    if(oid(c.boss)!==bossId||S.bossId!==bossId)return deny('boss identity changed');

    if(h.pct<minStartHp())return deny('HP below kite start threshold ('+minStartHp()+'%)');

    const guard=S._tq118?.mayStart?.(t);

    if(guard?.ok===false)return deny(guard.reason);

    if(S.hooks.length)return deny('movement guard already active');

    if(!companionAvailable(c.me))return deny('petContext / fuwaContext missing');

    const p=pos(c.me),b=pos(c.boss),d=gap(p,b);

    if(!p||!b||d===null)return deny('character or boss coordinates missing');

    if(d<KITE115CFG.minStartDistance||d>KITE115CFG.maxStartDistance)

      return deny('outside safe activation distance');

    if(t<nextEligible||t-beganFightAt<KITE115CFG.minFightWindowMs)

      return deny('waiting for attack window');

    lastSkipReason='ready';return true;

  }

  function move(t){

    if(!active||!S.waypoint)return false;

    if(active.moves>=KITE115CFG.maxMoveAttempts)return false;

    sendMove(t);active.moves++;active.lastMoveAt=t;return true;

  }

  function begin(c,t,h){

    if(!qualified(c,t,h))return false;

    const p=pos(c.me),b=pos(c.boss),d=gap(p,b);

    const target=max(KITE115CFG.outerDistance,d+KITE115CFG.waypointTolerance+35,Math.min(C.maxOrbitRadius,380));

    if(target>=C.maxOrbitRadius || target<=d+KITE115CFG.waypointTolerance)return false;

    const waypoint=pointAtDistance(p,b,target);

    S.phase='KITE_OUT';

    active={startedAt:t,phaseAt:t,moves:0,lastMoveAt:0,point:waypoint,

      originDistance:d,peakClientDistance:d,outerReached:false,

      petFarAtStart:counts.petFar,petTransitAtStart:counts.petTransit,

      petNearAtStart:counts.petNear};

    

    try{

      installGuard();S.waypoint=waypoint;move(t);cycles++;

      try{S._tq118?.beginCycle?.(t,d);}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

      recent.push({at:Date.now(),event:'OUT',distance:Math.round(d)});

      if(recent.length>20)recent.shift();return true;

    }catch(e){

      exceptions++;lastError='kite start: '+String(e);

      end('start failed',t,true);return false;

    }

  }

  function end(reason,t=clock(),failed=false){

    if(!active && !['KITE_OUT','KITE_IN'].includes(S.phase))return false;

    const used=active;

    // Restore native movement and main attack first; do not send a synthetic skill.

    S.phase='FIGHT';restoreGuard();

    S.waypoint=null;active=null;beganFightAt=t;

    nextEligible=t+KITE115CFG.minCycleGapMs+KITE115CFG.fightWindowMs;

    lastReason=String(reason);

    // A completed return means the player reached the estimated inner attack range.

    // Previously even HP-triggered early exits counted as successful returns.

    if(failed){stalls++;failedCycles++;aborts++;}

    else if(reason==='back in native attack range (estimated)'){returns++;failedCycles=0;}

    else{aborts++;}

    if(used){

      try{S._tq118?.endCycle?.(reason,{outerReached:used.outerReached,

        peakClientDistance:used.peakClientDistance},t);}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

      if(used.outerReached)range.outerReachedCycles++;

      recent.push({at:Date.now(),event:'RETURN',reason,

      outerReached:!!used.outerReached,peakClientDistance:+(used.peakClientDistance||0).toFixed(1),

      petFarHits:counts.petFar-used.petFarAtStart,

      petTransitHits:counts.petTransit-used.petTransitAtStart,

      petNearHits:counts.petNear-used.petNearAtStart});

      if(recent.length>20)recent.shift();}

    if(failedCycles>=KITE115CFG.maxFailedCycles){

      KITE115CFG.enabled=false;lastReason+='; auto disabled after movement failures';

    }

    return true;

  }

  function tickKite(c,t,h){

    if(!active||!['KITE_OUT','KITE_IN'].includes(S.phase)){

      if(['KITE_OUT','KITE_IN'].includes(S.phase))end('state lost',t,true);

      return;

    }

    if(!KITE115CFG.enabled){end('disabled',t);return;}

    if(h.pct<=C.leavePct){end('low HP -> RETREAT',t);enterRetreat(c,h,t);return;}

    if(h.pct<minContinueHp()){end('HP under kite continue threshold ('+minContinueHp()+'%)',t);return;}

    const imminent=S._tq118?.shouldYield?.(t);

    if(imminent){end('yield to predicted Boss skill ('+imminent.source+')',t);return;}

    const p=pos(c.me),b=pos(c.boss);

    if(!p||!b){end('position missing',t,true);return;}

    const d=gap(p,b),inTime=t-active.phaseAt;

    if(Number.isFinite(d)){

      active.peakClientDistance=Math.max(active.peakClientDistance||0,d);

      range.peakClientDistance=Math.max(range.peakClientDistance,d);

      if(d>=KITE115CFG.outerDistance-KITE115CFG.waypointTolerance)active.outerReached=true;

    }

    if(S.phase==='KITE_OUT'){

      const reached=d>=KITE115CFG.outerDistance-KITE115CFG.waypointTolerance;

      const timing=S._tq113?.status?.()?.pending || S._tq112?.status?.(t)?.predicted;

      const dangerSoon=timing && Number.isFinite(timing.etaMs??timing.eta) &&

        (timing.etaMs??timing.eta)>=-200 && (timing.etaMs??timing.eta)<=900;

      if((reached && inTime>=KITE115CFG.outerHoldMs && !dangerSoon)|| inTime>=KITE115CFG.outTimeoutMs){

        S.phase='KITE_IN';active.phaseAt=t;active.moves=0;

        S.waypoint=pointAtDistance(p,b,KITE115CFG.innerDistance);

        active.point=S.waypoint;move(t);

        return;

      }

    }else if(d<=KITE115CFG.innerDistance+KITE115CFG.waypointTolerance){

      end('back in native attack range (estimated)',t);return;

    }else if(inTime>=KITE115CFG.inTimeoutMs){end('reengage timeout',t,true);return;}

    if(active.moves<KITE115CFG.maxMoveAttempts&&t-active.lastMoveAt>=KITE115CFG.repathMs&&

       S.mover?.running?.()===false)move(t);

    if(active.moves>=KITE115CFG.maxMoveAttempts &&

       t-active.lastMoveAt>=KITE115CFG.repathMs*2){

      end('path not progressing',t,true);

    }

  }

  function maybeStart(c,t,h){

    return begin(c,t,h);

  }

  

  function stop(){cleanObserver();active=null;}

  

  function status(){

    return {version:'11.6.0',enabled:KITE115CFG.enabled,mode:KITE115CFG.mode,

      phase:S.phase,bossId,lastSkipReason,active:!!active,cycles,returns,aborts,stalls,exceptions,failedCycles,

      currentHpPct:S.lastHpPct,minimumStartHpPct:minStartHp(),minimumContinueHpPct:minContinueHp(),

      damageFlags:{...counts},rangeEvidence:{...range,

        petFarExamples:range.petFarExamples.slice(-5),

        petTransitExamples:range.petTransitExamples.slice(-5),

        meaning:'Far means CLIENT measured distance >= outerDistance-tolerance while kite active; not verified server range.'},

      lastReason,lastError,recent:recent.slice(-8),

      config:{outerDistance:KITE115CFG.outerDistance,innerDistance:KITE115CFG.innerDistance,

        fightWindowMs:KITE115CFG.fightWindowMs},

      caveat:'CLIENT estimates only. Flag 4 suggests pet-related damage; flag 64 is NOT verified Phuc Oa. A hit at outer waypoint does NOT prove outside actual server attack range.'};

  }

  function enable(v=true){KITE115CFG.enabled=!!v;

    if(!v && ['KITE_OUT','KITE_IN'].includes(S.phase))end('manual disable');

    return status();

  }

  return {reset,maybeStart,tickKite,end,stop,status,enable};

}

S._tq115=createKite115();

W.KVPV_TQ115=Object.freeze({version:'11.6.0',config:KITE115CFG,

  enable(v=true){return S._tq115.enable(v);},

  stop(){return S._tq115.enable(false);},

  status(show=true){const v=S._tq115.status();if(show)console.log('[TQ115 Companion Kite]',v);return v;}});



/* KVPV V11.7 - THIEN QUAN ADAPTIVE SKILL ARBITER.
 * Combines established native-cast telegraph and observed impact cadence.
 * No new network RPC, no fake skill casts or damage, no timer or independent mover.
 * All movement still uses the ONE native HitRun guard and its HP retreat policy.
 */

const TQ117CFG={

  enabled:true,

  minNativeConfidence:0.60,

  minCycleConfidence:0.55,

  nativeLookaheadMs:330,

  cycleLookaheadMs:1050,

  reserveNativeMs:520, // if a qualified cast is coming, avoid an early cycle dodge

  minGapAfterDodgeMs:450,

  minGapSameMarkerMs:1100,

  maxSkillHistory:12,

  maxEvents:32,

  penaltyPerHit:100,

  maxDirectionPenalty:400

};

function createTq117(){

  let currentBoss='',active=null,lastEnded=-Infinity,lastSkill=new Map();

  let attempts=0,starts=0,observedHitEvents=0,interrupts=0;

  let completedWithoutObservedHit=0,damageWindows=0,skipped=0;

  let lastSkip='',lastForecast=null,events=[],skills=new Map();

  const finite=n=>typeof n==='number'&&Number.isFinite(n);

  

  function log(kind,data={}){

    events.push({at:Date.now(),kind,...data});

    if(events.length>TQ117CFG.maxEvents)events.shift();

  }

  function reset(b){

    currentBoss=b?oid(b):'';active=null;lastEnded=-Infinity;

    lastSkill.clear();skills.clear();attempts=starts=observedHitEvents=interrupts=0;

    completedWithoutObservedHit=damageWindows=skipped=0;lastSkip='';lastForecast=null;events=[];

  }

  function deny(reason){skipped++;lastSkip=reason;return null;}

  function select(t){

    if(!TQ117CFG.enabled)return null;

    if(!S.running||S.phase!=='FIGHT'||String(S.bossId)!==currentBoss)

      return deny('HitRun not fighting selected Boss');

    if(!S._tq112?.status?.(t)?.eligible)return deny('not a verified Thiên Quan Boss');

    if(t-lastEnded<TQ117CFG.minGapAfterDodgeMs)return deny('return cooldown');

    const native=S._tq113?.status?.()?.pending;

    const cycle=S._tq112?.status?.(t)?.predicted;

    const nativeEta=Number(native?.etaMs), cycleEta=Number(cycle?.eta);

    const nativeQualified=native&&finite(nativeEta)&&nativeEta>=-50&&nativeEta<=TQ117CFG.nativeLookaheadMs &&

      Number(native.confidence)>=TQ117CFG.minNativeConfidence;

    const cycleQualified=cycle&&finite(cycleEta)&&cycleEta>=-50&&cycleEta<=TQ117CFG.cycleLookaheadMs &&

      Number(cycle.confidence)>=TQ117CFG.minCycleConfidence && Number(cycle.samples)>=4;

    // Native cast and cycle have different error models; prioritize qualified cast signals.

    if(nativeQualified){

      const key=Number(native.skillId)*10000;

      if(t-(lastSkill.get(key)??-Infinity)<TQ117CFG.minGapSameMarkerMs)

        return deny('same-skill repeat cooldown');

      const forecast=S._tq113?.predict?.(t);

      if(forecast){attempts++;lastForecast=forecast;return forecast;}

    }

    if(native&&finite(nativeEta)&&nativeEta>0&&nativeEta<=TQ117CFG.reserveNativeMs&&

       Number(native.confidence)>=TQ117CFG.minNativeConfidence)

      return deny('waiting for observed cast signal');

    if(cycleQualified){

      if(t-(lastSkill.get(Number(cycle.marker))??-Infinity)<TQ117CFG.minGapSameMarkerMs)

        return deny('same-skill repeat cooldown');

      const forecast=S._tq112?.predict?.(t);

      if(forecast){attempts++;lastForecast=forecast;return forecast;}

    }

    return deny('no qualified imminent skill signal');

  }

  function begin(forecast,t){

    if(!TQ117CFG.enabled)return;

    const marker=Number(forecast?.marker);

    const direction=S._tq114?.status?.()?.lastPlan?.direction||'UNSPECIFIED';

    active={marker,skillId:Number(forecast?.skillId)||null,

      source:forecast?.source||'observed-cycle',direction,

      startedAt:t,impactAt:Number(forecast?.at)||t,hits:0,damage:0};

    lastSkill.set(marker,t);starts++;

    log('DODGE_START',{marker,source:active.source,direction});

  }

  function observeHit(marker,damage,t){

    if(!active||S.phase!=='DODGE'||!finite(damage)||damage<=0)return;

    active.hits++;active.damage+=damage;observedHitEvents++;

    log('DAMAGE_WHILE_DODGING',{marker,damage:Math.round(damage),atClient:t});

  }

  function end(reason,t){

    if(!active)return;

    const a=active;active=null;lastEnded=t;

    const completed=reason==='impact window passed';

    if(!completed)interrupts++;

    if(a.hits>0)damageWindows++;

    else if(completed)completedWithoutObservedHit++;

    const key=a.marker+'|'+a.direction;

    let r=skills.get(key);

    if(!r){r={marker:a.marker,direction:a.direction,trials:0,damageWindows:0,

      noObservedDamageWindows:0,interruptions:0,hitEvents:0};skills.set(key,r);}

    r.trials++;r.hitEvents+=a.hits;

    if(a.hits)r.damageWindows++;

    else if(completed)r.noObservedDamageWindows++;

    if(!completed)r.interruptions++;

    if(skills.size>TQ117CFG.maxSkillHistory*5)skills.delete(skills.keys().next().value);

    log('DODGE_END',{marker:a.marker,reason,hitEvents:a.hits,damage:a.damage,

      direction:a.direction,durationMs:Math.max(0,t-a.startedAt)});

  }

  function penalty(marker,direction){

    if(!TQ117CFG.enabled)return 0;

    const r=skills.get(Number(marker)+'|'+direction);

    // No-hit observations are not treated as proof of avoidance or invincibility.

    return r?Math.min(TQ117CFG.maxDirectionPenalty,

      TQ117CFG.penaltyPerHit*r.damageWindows):0;

  }

  function disable(){TQ117CFG.enabled=false;return status();}

  function enable(v=true){TQ117CFG.enabled=!!v;return status();}

  

  function status(){return {version:'11.7.0',enabled:TQ117CFG.enabled,bossId:currentBoss,

    active:active?{...active}:null,attempts,starts,observedHitEvents,

    damageWindows,completedWithoutObservedHit,interrupts,skipped,lastSkip,lastForecast,

    learnedDirections:[...skills.values()].map(x=>({...x})),recent:events.slice(-10),

    castHook:S._tq113?.status?.()?.hooked||false,

    note:'Only OBSERVED client attack signals and damage. No-hit in a dodge window does not prove a skill was dodged; server range is unknown.'};}

  return {reset,select,begin,observeHit,end,penalty,disable,enable,status};

}

S._tq117=createTq117();

W.KVPV_TQ117=Object.freeze({version:'11.7.0',config:TQ117CFG,

  enable(v=true){return S._tq117.enable(v);},

  stop(){S._tq117.disable();if(S.phase==='DODGE')finishTqDodge('V11.7 manually disabled');return S._tq117.status();},

  status(print=true){const result=S._tq117.status();if(print)console.log('[TQ117 SMART SKILL]',result);return result;}});



/* KVPV V11.8 - COMPANION COMBAT EVIDENCE & THREAT GATE.
 * Uses existing HitRun+Kite observable events. NO new game RPC, timer,
 * independent mover, pet/fuwa cast command, or unverified server-range claims.
 * A counted pet marker is not proof that the server permits independent attacks.
 */

const TQ118CFG={

  enabled:true,

  minSignalConfidence:.65,

  minCycleSamples:4,

  blockNewKiteWithinMs:1400,

  yieldActiveKiteWithinMs:650,

  maxSamples:32,

  maxCycles:24

};

function createTq118(){

  let bossId='',cycle=null,lastGate='',gates=0,yields=0,started=0,ended=0;

  let losses=0,successes=0,outerReached=0,hitSamples=[],cycleLog=[];

  const impacts={petNear:0,petTransit:0,petFar:0,

    flaggedPetDamageNear:0,flaggedPetDamageTransit:0,flaggedPetDamageFar:0,

    unknownSpecial:0};

  const valid=n=>typeof n==='number'&&Number.isFinite(n);

  function reset(b){

    bossId=b?oid(b):'';cycle=null;lastGate='';gates=yields=started=ended=losses=successes=outerReached=0;

    try{S._tq119?.onBoss?.(bossId);}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

    hitSamples=[];cycleLog=[];

    for(const key of Object.keys(impacts))impacts[key]=0;

  }

  function threat(t){

    if(!TQ118CFG.enabled)return null;

    const n=S._tq113?.status?.()?.pending;

    const nEta=Number(n?.etaMs),nConf=Number(n?.confidence);

    const c=S._tq112?.status?.(t)?.predicted;

    const cEta=Number(c?.eta),cConf=Number(c?.confidence);

    // Never trust a bare native cast: native timing must already have trained pairs.

    const native=n&&valid(nEta)&&nEta>=-80&&nEta<=TQ118CFG.blockNewKiteWithinMs &&

      valid(nConf)&&nConf>=TQ118CFG.minSignalConfidence;

    const cyclic=c&&valid(cEta)&&cEta>=-80&&cEta<=TQ118CFG.blockNewKiteWithinMs &&

      valid(cConf)&&cConf>=TQ118CFG.minSignalConfidence&&

      Number(c.samples)>=TQ118CFG.minCycleSamples;

    if(!native&&!cyclic)return null;

    const a=native?{source:'observed-cast',etaMs:nEta,confidence:nConf}:null;

    const b=cyclic?{source:'impact-cycle',etaMs:cEta,confidence:cConf}:null;

    return !a?b:!b?a:a.etaMs<=b.etaMs?a:b;

  }

  function mayStart(t){

    const p=threat(t);

    if(p){gates++;lastGate=`Boss skill predicted in ${Math.round(p.etaMs)}ms (${p.source})`;

      return {ok:false,reason:lastGate,threat:p};}

    return {ok:true,reason:'no qualified imminent threat'};

  }

  function shouldYield(t){

    const p=threat(t);

    if(p && p.etaMs<=TQ118CFG.yieldActiveKiteWithinMs){

      yields++;lastGate=`Yield Kite to ${p.source} (${Math.round(p.etaMs)}ms)`;

      return p;

    }

    return null;

  }

  function beginCycle(t,d){

    if(cycle)return;

    cycle={startedAt:t,startDistance:valid(d)?+d.toFixed(1):null,

      petNear:0,petTransit:0,petFar:0,

      flaggedPetDamageNear:0,flaggedPetDamageTransit:0,flaggedPetDamageFar:0};

    started++;

    try{S._tq119?.onStart?.({startedAt:t,startDistance:d,hpPct:S.lastHpPct});}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

  }

  function observeHit({zone,damage,distance,phase,at=Date.now(),unknown=false}){

    if(!['Near','Transit','Far'].includes(zone))return false;

    const n=Number(damage);

    if(!valid(n)||n<=0)return false;

    if(unknown){impacts.unknownSpecial++;return true;}

    const countKey='pet'+zone,damageKey='flaggedPetDamage'+zone;

    impacts[countKey]++;impacts[damageKey]+=n;

    if(cycle){cycle[countKey]++;cycle[damageKey]+=n;}

    hitSamples.push({at,zone,damage:Math.round(n),distance:valid(distance)?+distance.toFixed(1):null,

      phase:String(phase||''),duringKite:!!cycle});

    if(hitSamples.length>TQ118CFG.maxSamples)hitSamples.shift();

    return true;

  }

  function endCycle(reason,info={},t=Date.now()){

    if(!cycle)return;

    const c=cycle;cycle=null;ended++;

    const reached=!!info.outerReached;

    const successful=String(reason)==='back in native attack range (estimated)';

    if(reached)outerReached++;

    if(successful)successes++;else losses++;

    cycleLog.push({...c,endedAt:t,reason:String(reason),

      reachedClientOuterWaypoint:reached,returnWithinClientRange:successful,

      peakClientDistance:valid(info.peakClientDistance)?+info.peakClientDistance.toFixed(1):null});

    if(cycleLog.length>TQ118CFG.maxCycles)cycleLog.shift();

    try{S._tq119?.onCycle?.(cycleLog[cycleLog.length-1],{hpEnd:S.lastHpPct,now:Date.now()});}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

    try{W.KVPV_V124_EFFICIENCY?._cycle?.(cycleLog[cycleLog.length-1]);}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

  }

  

  function status(print=false){

    const r={version:'11.8.0',enabled:TQ118CFG.enabled,bossId,

      kiteCyclesStarted:started,kiteCyclesEnded:ended,

      clientReturns:successes,interruptions:losses,outerWaypointReached:outerReached,

      blockedKiteStarts:gates,urgentYields:yields,lastGate,

      activeCycle:cycle?{...cycle}:null,

      evidence:{...impacts},recentHits:hitSamples.slice(-8),recentCycles:cycleLog.slice(-8),

      interpretation:impacts.petFar>0?

        'Flag-4 damage observed at client outer waypoint; NOT proof of server attack-range independence.':

        'No flag-4 damage observed at verified client outer waypoint yet.',

      caution:'Flag 4 is suggestive of pet damage. Flag 64 does not verify Phuc Oa. No direct companion attack is sent.'};

    if(print)console.log('[TQ118 COMPANION COMBAT]',r);

    return r;

  }

  function enable(value=true){TQ118CFG.enabled=!!value;return status();}

  return {reset,threat,mayStart,shouldYield,beginCycle,observeHit,endCycle,status,enable};

}

S._tq118=createTq118();

W.KVPV_TQ118=Object.freeze({version:'11.8.0',config:TQ118CFG,

  enable(value=true){return S._tq118.enable(value);},

  stop(){return S._tq118.enable(false);},

  status(print=true){return S._tq118.status(print);}});



/* V11.9 COMBAT LEARNING: per-boss evidence-based Kite tuning.
 * Strictly client-observed data. No new timer, RPC, independent mover or casts.
 * Client-coordinate waypoint is NOT server attack range; pet flag 4 is suggestive.
 * Auto-apply is OFF by default; all current HP retreat rules take priority.
 */

const TQ119CFG={

  enabled:true,autoTune:false,minSamples:8,maxSamples:32,maxBossProfiles:8,

  minReturnRate:.8,minOuterReachRate:.75,minHealthyHpPct:65,

  maxHpAbortRate:.125,minFightWindowMs:2400,maxFightWindowMs:6200,

  fightWindowStepMs:200,minimumSecondsBetweenChanges:120

};

function createTq119(){

  const profiles=new Map();

  let currentBossId='',changeCount=0,lastAction='No changes',lastError='';

  const finite=n=>typeof n==='number'&&Number.isFinite(n);

  const clamp=(x,lo,hi)=>Math.min(hi,Math.max(lo,x));

  function profile(id){

    id=String(id||'');if(!id)return null;

    if(!profiles.has(id)){

      if(profiles.size>=TQ119CFG.maxBossProfiles)profiles.delete(profiles.keys().next().value);

      profiles.set(id,{id,cycles:[],pending:null,lastChanged:0,tunes:0});

    }

    return profiles.get(id);

  }

  function onBoss(id){currentBossId=String(id||'');if(currentBossId)profile(currentBossId);}

  function onStart(event){

    if(!TQ119CFG.enabled||!currentBossId)return;

    const p=profile(currentBossId);if(!p)return;

    p.pending={startedAt:event.startedAt,startDistance:event.startDistance,

      hpStart:finite(event.hpPct)?event.hpPct:null,

      outerAtStart:KITE115CFG.outerDistance,windowAtStart:KITE115CFG.fightWindowMs};

  }

  function summarize(p){

    const cycles=p?.cycles||[],n=cycles.length;

    const successes=cycles.filter(x=>x.returned).length;

    const outer=cycles.filter(x=>x.outer).length;

    const lowHp=cycles.filter(x=>x.hpAbort).length;

    const flaggedFar=cycles.reduce((v,x)=>v+x.petFar,0);

    const petTotal=cycles.reduce((v,x)=>v+x.petHits,0);

    const safe=cycles.filter(x=>finite(x.hpEnd)&&x.hpEnd>=TQ119CFG.minHealthyHpPct).length;

    const hpPairs=cycles.filter(x=>finite(x.hpDelta));

    const hpMean=hpPairs.length?hpPairs.reduce((v,x)=>v+x.hpDelta,0)/hpPairs.length:null;

    return {samples:n,returns:successes,outerReached:outer,hpAborts:lowHp,

      returnRate:n?successes/n:null,outerReachRate:n?outer/n:null,

      hpAbortRate:n?lowHp/n:null,healthyEndRate:n?safe/n:null,

      meanHpDeltaPct:hpMean===null?null:+hpMean.toFixed(2),

      flaggedPetHits:petTotal,flaggedPetFarHits:flaggedFar,

      farEvidenceVerified:false};

  }

  function propose(p=profile(currentBossId)){

    if(!p)return {type:'none',reason:'No Boss selected',confidence:'none'};

    const a=summarize(p);

    if(a.samples<TQ119CFG.minSamples)

      return {type:'observe',reason:`Need ${TQ119CFG.minSamples-a.samples} more completed Kite cycles`,confidence:'insufficient'};

    if(a.hpAbortRate>TQ119CFG.maxHpAbortRate)

      return {type:'protect',reason:'HP-related aborts too frequent; prioritize native HP retreat, no auto tuning',confidence:'observed'};

    if(a.outerReachRate<TQ119CFG.minOuterReachRate)

      return {type:'path',reason:'Too few Kite cycles reach outer waypoint; diagnose pathing before adjusting distance',confidence:'observed'};

    if(a.flaggedPetFarHits===0)

      return {type:'observe',reason:'No flagged pet hits at client outer waypoint; independent damage unconfirmed',confidence:'limited'};

    if(a.returnRate<TQ119CFG.minReturnRate)

      return {type:'path',reason:'Return success rate is low; keep current movement settings',confidence:'observed'};

    if(a.healthyEndRate<TQ119CFG.minReturnRate || a.meanHpDeltaPct===null || a.meanHpDeltaPct< -3)

      return {type:'protect',reason:'Insufficient healthy HP evidence to increase Kite frequency',confidence:'limited'};

    const old=Number(KITE115CFG.fightWindowMs);

    const next=clamp(old-TQ119CFG.fightWindowStepMs,TQ119CFG.minFightWindowMs,TQ119CFG.maxFightWindowMs);

    if(next>=old)return {type:'hold',reason:'Fight-window safety lower limit reached',confidence:'observed'};

    return {type:'fightWindowMs',from:old,to:next,reason:'Stable client returns and healthy HP; cautiously test a slightly shorter fight window',confidence:'observed',bossId:p.id};

  }

  function applySuggestion({automatic=false,now=Date.now()}={}){

    const p=profile(currentBossId),suggestion=propose(p);

    if(!TQ119CFG.enabled||!p||suggestion.type!=='fightWindowMs')return {applied:false,suggestion};

    if(automatic && !TQ119CFG.autoTune)return {applied:false,reason:'autoTune is disabled',suggestion};

    if(now-p.lastChanged<TQ119CFG.minimumSecondsBetweenChanges*1000)

      return {applied:false,reason:'change cooldown',suggestion};

    // Constrain against native combat window, never touch HP thresholds or outer distance.

    const original=Number(KITE115CFG.fightWindowMs);

    if(!finite(original)||original!==suggestion.from)return {applied:false,reason:'config changed',suggestion};

    KITE115CFG.fightWindowMs=suggestion.to;

    p.lastChanged=now;p.tunes++;changeCount++;

    lastAction=`Boss ${p.id}: fightWindowMs ${original} -> ${suggestion.to}`;

    // Baseline must restart after a parameter change to avoid learning from mixed configurations.

    p.cycles=[];

    return {applied:true,original,to:suggestion.to,reason:'bounded client-side tuning; no RPC'};

  }

  function onCycle(event,{hpEnd=null,now=Date.now()}={}){

    if(!TQ119CFG.enabled||!currentBossId)return;

    const p=profile(currentBossId),start=p?.pending;

    if(!p||!start||start.startedAt!==event.startedAt)return;

    p.pending=null;

    const reason=String(event.reason||'');

    const endHp=finite(hpEnd)?hpEnd:null;

    const sample={at:now,returned:event.returnWithinClientRange===true,

      outer:event.reachedClientOuterWaypoint===true,

      hpAbort:/\bHP\b|low hp|low HP/i.test(reason),

      hpEnd:endHp,hpDelta:finite(start.hpStart)&&finite(endHp)?+(endHp-start.hpStart).toFixed(2):null,

      petNear:Number(event.petNear)||0,petTransit:Number(event.petTransit)||0,

      petFar:Number(event.petFar)||0,

      petHits:(Number(event.petNear)||0)+(Number(event.petTransit)||0)+(Number(event.petFar)||0),

      durationMs:Math.max(0,Number(event.endedAt)-Number(event.startedAt)),

      peakClientDistance:event.peakClientDistance??null,

      reason:reason.slice(0,130),fightWindowMs:start.windowAtStart};

    p.cycles.push(sample);

    if(p.cycles.length>TQ119CFG.maxSamples)p.cycles.shift();

    if(TQ119CFG.autoTune){try{applySuggestion({automatic:true,now});}catch(e){lastError=String(e);}}

  }

  

  function status(print=false){

    const p=profile(currentBossId),r={version:'11.9.0',enabled:TQ119CFG.enabled,

      bossId:currentBossId,autoTune:TQ119CFG.autoTune,bossProfiles:profiles.size,

      stats:summarize(p),suggestion:propose(p),

      current:{fightWindowMs:KITE115CFG.fightWindowMs,outerDistance:KITE115CFG.outerDistance,

        innerDistance:KITE115CFG.innerDistance,

        startHpThreshold:KITE115CFG.minHpPct},

      changes:changeCount,lastAction,lastError,

      recentCycles:(p?.cycles||[]).slice(-8),

      notes:['Client coordinate distance is NOT verified server range',

        'Flag-4 is suggestive of pet damage; Phuc Oa is unverified',

        'No game commands or additional movement; autoTune is OFF by default']};

    if(print)console.log('[TQ119 COMBAT LEARNING]',r);

    return r;

  }

  function setAutoTune(value=true){TQ119CFG.autoTune=!!value;return status(false);}

  

  function stop(){TQ119CFG.enabled=false;TQ119CFG.autoTune=false;return status(false);}

  

  function start(){TQ119CFG.enabled=true;return status(false);}

  return {onBoss,onStart,onCycle,propose,applySuggestion,status,setAutoTune,stop,start};

}

S._tq119=createTq119();

W.KVPV_TQ119=Object.freeze({version:'11.9.0',config:TQ119CFG,

  status(print=true){return S._tq119.status(print);},

  propose(){return S._tq119.propose();},

  applySuggestion(){return S._tq119.applySuggestion();},

  setAutoTune(value=true){return S._tq119.setAutoTune(value);},

  stop(){return S._tq119.stop();},start(){return S._tq119.start();}});



/* ==== V12.2 ADAPTIVE RETURN: PASSIVE PER-BOSS RETREAT LEARNING ====
 * Uses HitRun's existing retreat enter/exit events. No timer, network calls,
 * forced attack or HP-threshold relaxation. Auto-tune defaults OFF.
 * Optional tuning modifies ONLY the confirmation delay of the existing
 * BossSurvival recovery tracker and only when a NEW retreat begins.
 */

const V122CFG={enabled:true,autoTune:false,minReturns:8,

  baselineConfirmMs:C.healConfirmMs,minConfirmMs:250,maxConfirmMs:650,

  quickRelapseMs:9000,maxBossProfiles:30,maxCyclesPerBoss:32};

const V122S={profiles:new Map(),active:null,currentKey:'',lastApply:null,

  recommendations:0,applied:0,aborted:0,errors:0,history:[]};

function v122Finite(v){return typeof v==='number'&&Number.isFinite(v);}

function v122Profile(key,name=''){

  let p=V122S.profiles.get(key);

  if(!p){

    if(V122S.profiles.size>=V122CFG.maxBossProfiles){

      const oldest=V122S.profiles.keys().next().value;

      V122S.profiles.delete(oldest);

    }

    p={key,name,cycles:[],lastReturnAt:null,lastSuccessful:null};

    V122S.profiles.set(key,p);

  }

  if(name)p.name=name;

  return p;

}

function v122Records(p){return p?p.cycles.filter(x=>x.success):[];}

function v122Suggest(p){

  const rows=v122Records(p),n=rows.length;

  const relapses=rows.filter(x=>x.quickRelapse).length;

  const avgHp=n?rows.reduce((a,x)=>a+x.returnHp,0)/n:null;

  const avgRetreatMs=n?rows.reduce((a,x)=>a+x.durationMs,0)/n:null;

  let candidate=V122CFG.baselineConfirmMs,reason='insufficient verified returns';

  if(n>=V122CFG.minReturns){

    if(relapses>=Math.max(2,Math.ceil(n*.25))){

      candidate=Math.min(V122CFG.maxConfirmMs,V122CFG.baselineConfirmMs+200);

      reason='frequent quick re-retreat; keep a longer recovery confirmation';

    }else if(relapses===0 && avgHp>=Math.max(55,C.resumeFightPct+12)){

      candidate=Math.max(V122CFG.minConfirmMs,V122CFG.baselineConfirmMs-100);

      reason='stable high-HP returns; cautiously shorten confirmation';

    }else reason='insufficient evidence for a faster, safe return';

  }

  return {bossKey:p?.key||null,completedReturns:n,quickRelapses:relapses,

    avgReturnHpPct:avgHp===null?null:+avgHp.toFixed(2),

    avgRetreatSeconds:avgRetreatMs===null?null:+(avgRetreatMs/1000).toFixed(2),

    proposedConfirmMs:candidate,baselineConfirmMs:V122CFG.baselineConfirmMs,

    eligible:n>=V122CFG.minReturns,reason};

}

function v122Log(event,details={}){

  V122S.history.push({at:Date.now(),event,...details});

  if(V122S.history.length>50)V122S.history.shift();

}

function v122Enter({at,bossId,bossTypeId,bossName,hpPct}){

  if(!V122CFG.enabled||!v122Finite(at)||!v122Finite(hpPct))return;

  const key=String(bossTypeId||bossId||'');

  if(!key)return;

  const p=v122Profile(key,String(bossName||''));V122S.currentKey=key;

  // A fresh retreat soon after a true return may mean the prior decision

  // was premature. Attribute it to that prior completed cycle, never a Kite.

  if(p.lastSuccessful && p.lastReturnAt!==null &&

     at>=p.lastReturnAt && at-p.lastReturnAt<=V122CFG.quickRelapseMs){

    if(!p.lastSuccessful.quickRelapse){

      p.lastSuccessful.quickRelapse=true;

      v122Log('quick-relapse',{bossKey:key,delayMs:Math.round(at-p.lastReturnAt)});

    }

  }

  const proposal=v122Suggest(p);V122S.recommendations++;

  const wanted=V122CFG.autoTune?proposal.proposedConfirmMs:V122CFG.baselineConfirmMs;

  const applied=S._bossSurvival?.setHealConfirmMs?.(wanted)===true;

  if(applied && V122CFG.autoTune && proposal.eligible){

    V122S.applied++;

    V122S.lastApply={bossKey:key,healConfirmMs:wanted,reason:proposal.reason,at:Date.now()};

  }

  V122S.active={key,at,startHp:hpPct,confirmMs:applied?wanted:null};

  v122Log('retreat-start',{bossKey:key,hpPct:+hpPct.toFixed(2),confirmMs:wanted});

}

function v122Exit({at,hpPct,reason}){

  const a=V122S.active;

  if(!a)return;

  V122S.active=null;

  const p=V122S.profiles.get(a.key);

  if(!p)return;

  const isReturn=String(reason||'').startsWith('BOSS SURVIVAL');

  const safeAt=v122Finite(at)&&at>=a.at?at:a.at;

  const retHp=v122Finite(hpPct)?hpPct:a.startHp;

  const row={success:isReturn,startedHp:a.startHp,returnHp:retHp,

    durationMs:safeAt-a.at,quickRelapse:false,reason:String(reason||'').slice(0,120)};

  p.cycles.push(row);

  if(p.cycles.length>V122CFG.maxCyclesPerBoss)p.cycles.shift();

  if(isReturn){p.lastReturnAt=safeAt;p.lastSuccessful=row;}

  else {p.lastReturnAt=null;p.lastSuccessful=null;V122S.aborted++;}

  v122Log(isReturn?'recovered':'retreat-ended',{bossKey:a.key,hpPct:+retHp.toFixed(2),reason:row.reason});

}

function v122Abort(reason='controller stopped'){

  if(V122S.active)v122Exit({at:clock(),hpPct:S.lastHpPct,reason});

}

function v122Status(show=false){

  const p=V122S.profiles.get(V122S.currentKey);

  const recommendation=v122Suggest(p);

  const ret={version:'12.2.0',enabled:V122CFG.enabled,autoTune:V122CFG.autoTune,

    bossKey:V122S.currentKey||null,bossProfiles:V122S.profiles.size,

    activeRetreat:V122S.active?{...V122S.active}:null,

    healConfirmMs:S._bossSurvival?.getHealConfirmMs?.()??null,

    hpLeavePct:C.leavePct,hpResumePct:C.resumeFightPct,

    recommendation,changesApplied:V122S.applied,aborted:V122S.aborted,

    lastApply:V122S.lastApply,recent:V122S.history.slice(-10),

    v121TelemetryAvailable:W.KVPV_V121_PERF?.version==='12.1.0',

    limitations:'Client-observed returns only; not a guarantee of survival or personal DPS. No extra timers/RPC.'};

  if(show){

    console.table([{boss:ret.bossKey,returns:recommendation.completedReturns,

      quickRelapses:recommendation.quickRelapses,avgHp:recommendation.avgReturnHpPct,

      confirmMs:ret.healConfirmMs,proposedMs:recommendation.proposedConfirmMs,

      autoTune:ret.autoTune}]);

    console.table(ret.recent);

  }

  return ret;

}

W.KVPV_V122_RETURN=Object.freeze({version:'12.2.0',config:V122CFG,

  status:v122Status,propose(){return v122Suggest(V122S.profiles.get(V122S.currentKey));},

  setAutoTune(v=true){

    V122CFG.autoTune=!!v;

    if(!V122CFG.autoTune)S._bossSurvival?.setHealConfirmMs?.(V122CFG.baselineConfirmMs);

    return v122Status(false);

  },

  stop(){

    V122CFG.enabled=false;V122CFG.autoTune=false;

    S._bossSurvival?.setHealConfirmMs?.(V122CFG.baselineConfirmMs);

    return v122Status(false);

  },

  start(){V122CFG.enabled=true;return v122Status(false);},

  _enter:v122Enter,_exit:v122Exit,_abort:v122Abort});

/* ==== END V12.2 RETURN ADVISOR ==== */



/* ==== V12 UNIFIED COMBAT - SINGLE NATIVE MOVEMENT OWNER ====
 * PRIORITY: emergency RETREAT > confirmed DODGE > optional KITE > FIGHT.
 * Uses the one existing HitRun tick/moveTo guard. Does not create any
 * movement timer, RPC, attack method, HP modification or server-side bypass.
 * Optional skill/kite observers cannot cause core combat to crash.
 */

const V120CFG={enabled:true,maxJournal:48,errorLogCooldownMs:30000,

  restoreStaleOwnGuard:true,allowKite:true,allowDodge:true};

const V120ST={decisions:0,retreats:0,dodges:0,kites:0,fights:0,

  safetyRecoveries:0,guardRecoveries:0,optionalErrors:0,lastOptionalError:'',

  lastErrorAt:-Infinity,lastDecision:'ready',lastReason:'',

  lastPhase:'OFF',journal:[]};

function v120Record(decision,reason='',t=clock()){

  V120ST.decisions++;

  if(decision==='RETREAT')V120ST.retreats++;

  else if(decision==='DODGE')V120ST.dodges++;

  else if(decision==='KITE')V120ST.kites++;

  else if(decision==='FIGHT')V120ST.fights++;

  const previous=V120ST.lastPhase;

  if(V120ST.lastDecision!==decision||previous!==S.phase){

    V120ST.journal.push({at:Date.now(),from:previous,phase:S.phase,

      decision,reason:String(reason).slice(0,160)});

    if(V120ST.journal.length>V120CFG.maxJournal)V120ST.journal.shift();

  }

  V120ST.lastPhase=S.phase;

  V120ST.lastDecision=decision;V120ST.lastReason=String(reason);

  return decision;

}

function v120Optional(fn,label,t){

  try{return fn();}catch(e){

    V120ST.optionalErrors++;

    V120ST.lastOptionalError=label+': '+String(e?.message||e);

    if(t-V120ST.lastErrorAt>=V120CFG.errorLogCooldownMs){

      V120ST.lastErrorAt=t;

      console.warn('[KVPV V12] Optional module skipped',V120ST.lastOptionalError);

    }

    return null;

  }

}

/* ==== KVPV V12.7: BASIC ATTACK CADENCE / REFLECT-AWARE TIMED DODGE ====
 * INSIDE the existing V12 HitRun closure. NO new timers, RPC, mover, cooldown edits.
 * Requires 3 stable client-observed clean intervals near 3500ms; otherwise idle.
 * A manual impact sync is allowed for a bounded diagnostic trial only.
 */

const V127CFG={enabled:true,periodHintMs:3500,minPeriodMs:2800,maxPeriodMs:4300,

  minIntervals:3,maxJitterMs:260,leadMs:880,afterMs:320,

  reflectWindowMs:170,reflectMinRatio:5.80,reflectMaxRatio:7.55,

  classifierWaitMs:200,outgoingKeepMs:2500,maxEvidence:48,

  maxAutoCyclesWithoutFreshHit:8,maxManualCycles:8,

  avoidKiteAheadMs:1800,minRetriggerMs:2400};

function v127CreateBasic(){

  const owner={};let boss=null,bossId='',lastError='',mode='observe',manualNext=null;

  let learned=null,nextAt=null,lastTriggered=-Infinity,cyclesWithoutHit=0,

    automaticDodges=0,manualDodges=0,lastClean=null,observed=0,reflections=0,ambiguous=0;

  let outgoing=[],pending=[],history=[],models=new Map();

  const finite=x=>Number.isFinite(Number(x));

  function record(type,detail={}){

    history.push({at:Date.now(),type,...detail});

    if(history.length>V127CFG.maxEvidence)history.shift();

  }

  function clear(){outgoing=[];pending=[];models=new Map();learned=null;nextAt=null;

    manualNext=null;lastTriggered=-Infinity;cyclesWithoutHit=0;mode='observe';

    lastClean=null;observed=0;reflections=0;ambiguous=0;automaticDodges=0;manualDodges=0;

    history=[];lastError='';}

  function detach(){if(boss?.off)try{boss.off(1012,owner,onOutgoing);}catch(e){lastError='detach: '+String(e);}

    boss=null;}

  function attach(role){detach();clear();bossId=role?oid(role):'';

    if(!role?.on||!role?.off){lastError='Boss 1012 emitter unavailable: classification disabled';return false;}

    try{role.on(1012,owner,onOutgoing);boss=role;return true;}

    catch(e){lastError='observe boss 1012: '+String(e);return false;}}

  

  function stop(){detach();bossId='';clear();}

  function onOutgoing(src,marker,damage,flags,receiver){

    if(!V127CFG.enabled||!S.running||!boss||String(S.bossId)!==bossId)return;

    if(String(src)!==actor||String(receiver)!==bossId||(Number(flags)&32)||(Number(flags)&256))return;

    const d=Number(damage),m=Number(marker),t=clock();

    if(!finite(d)||d<=0||!Number.isSafeInteger(m)||m<0)return;

    outgoing.push({at:t,marker:m,damage:d});

    if(outgoing.length>100)outgoing.shift();

  }

  function incoming(marker,damage,flags,at){

    if(!V127CFG.enabled||!S.running||String(S.bossId)!==bossId)return false;

    const m=Number(marker),d=Number(damage),f=Number(flags);

    if(!Number.isSafeInteger(m)||m<0||!finite(d)||d<=0||(f&32)||(f&256))return false;

    pending.push({at,marker:m,damage:d,flags:f});

    if(pending.length>70){pending.shift();ambiguous++;}

    return true;

  }

  function correlate(hit){

    let matching=null;

    for(let i=outgoing.length-1;i>=0;i--){

      const x=outgoing[i],lag=Math.abs(hit.at-x.at),ratio=hit.damage/x.damage;

      if(lag<=V127CFG.reflectWindowMs&&x.marker===hit.marker &&

         ratio>=V127CFG.reflectMinRatio&&ratio<=V127CFG.reflectMaxRatio){

        matching={lagMs:Math.round(lag),ratio:+ratio.toFixed(3)};break;

      }

    }

    return matching;

  }

  function median(values){const x=[...values].sort((a,b)=>a-b);const n=x.length;

    return n%2?x[(n-1)/2]:(x[n/2-1]+x[n/2])/2;}

  function learn(hit){

    observed++;lastClean=hit;

    const key=hit.marker,old=models.get(key);

    let r=old||{marker:key,hits:[],intervals:[],lastAt:null};

    if(r.lastAt!==null){

      const delta=hit.at-r.lastAt;

      if(delta<350)return;  // packet duplicate/secondary impact

      if(delta>=V127CFG.minPeriodMs&&delta<=V127CFG.maxPeriodMs){

        r.intervals.push(Math.round(delta));if(r.intervals.length>6)r.intervals.shift();

      }else{r.intervals=[];r.hits=[];}

    }

    r.hits.push(hit.at);if(r.hits.length>10)r.hits.shift();r.lastAt=hit.at;

    models.set(key,r);

    if(r.intervals.length>=V127CFG.minIntervals){

      const recent=r.intervals.slice(-4),period=median(recent);

      const jitter=Math.max(...recent.map(v=>Math.abs(v-period)));

      if(jitter<=V127CFG.maxJitterMs){

        const was=learned?.marker;

        learned={marker:key,periodMs:period,jitterMs:jitter,samples:recent.length+1,

          lastCleanAt:hit.at};

        nextAt=hit.at+period;manualNext=null;cyclesWithoutHit=0;mode='auto-learned';

        record('LEARNED_BASIC',{marker:key,periodMs:period,jitterMs:jitter,

          changed:was!==key});

      }else if(learned?.marker===key){

        // A drifting model must never keep steering indefinitely.

        learned=null;nextAt=null;mode='observe';

        record('TIMING_UNSTABLE',{marker:key,jitterMs:jitter});

      }

    }else if(learned?.marker===key){

      // Re-anchor if a clean impact is seen between forecasted evasions.

      nextAt=hit.at+learned.periodMs;cyclesWithoutHit=0;

    }

    record('CLEAN_HIT',{marker:key,damage:Math.round(hit.damage)});

  }

  function flush(t=clock()){

    // Shared V12 HitRun tick only. Defer classification to tolerate opposite

    // order of two native 1012 callbacks (~0ms observed in the user's log).

    if(!V127CFG.enabled){pending=[];return;}

    const ready=[],hold=[];

    for(const x of pending)((t-x.at>=V127CFG.classifierWaitMs)?ready:hold).push(x);

    pending=hold;

    for(const hit of ready){

      const pair=correlate(hit);

      if(pair||(hit.flags&128)){

        reflections++;record('POSSIBLE_REFLECT',{marker:hit.marker,...(pair||{flagged:true})});

        continue;

      }

      if(!boss || String(S.bossId)!==bossId){ambiguous++;continue;}

      // Send only a non-correlated impact into previous dodge predictors.

      try{S._tq114?.damage?.(hit.marker,hit.damage);}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

      try{S._tq117?.observeHit?.(hit.marker,hit.damage,hit.at);}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

      try{S._tq112?.observe?.({at:hit.at,marker:hit.marker,damage:hit.damage});}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

      try{S._tq113?.recordHit?.(hit.marker,hit.at);}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

      learn(hit);

    }

    outgoing=outgoing.filter(x=>t-x.at<=V127CFG.outgoingKeepMs);

    if(nextAt!==null && learned && t-learned.lastCleanAt>

       learned.periodMs*(V127CFG.maxAutoCyclesWithoutFreshHit+1)){

      learned=null;nextAt=null;mode='observe';record('STALE_CADENCE');

    }

  }

  function due(t=clock(),allowRecovery=true){

    if(!V127CFG.enabled||!S.running||!['FIGHT','KITE_OUT','KITE_IN'].includes(S.phase))return null;

    let at,period,source,marker;

    if(learned && nextAt!==null){

      if(cyclesWithoutHit>=V127CFG.maxAutoCyclesWithoutFreshHit)return null;

      at=nextAt;period=learned.periodMs;marker=learned.marker;source='v127-basic-auto';

    }else if(manualNext!==null && manualDodges<V127CFG.maxManualCycles){

      at=manualNext;period=V127CFG.periodHintMs;marker=0;source='v127-basic-manual';

    }else return null;

    if(!finite(at))return null;

    if(allowRecovery&&at-t< -220){  // missed native tick / tab sleep; never burst catch-up dodges

      const elapsed=Math.floor((t-at)/period)+1;

      if(elapsed>2){

        if(source==='v127-basic-auto'){nextAt=null;learned=null;mode='observe';}

        else manualNext=null;

        record('LOST_SYNC',{elapsed});return null;

      }

      if(source==='v127-basic-auto'){nextAt+=elapsed*period;cyclesWithoutHit+=elapsed;at=nextAt;}

      else{manualNext+=elapsed*period;at=manualNext;}

    }

    return {marker,source,at,eta:at-t,period,

      confidence:source==='v127-basic-auto'?0.8:0.25};

  }

  function predict(t=clock()){

    const candidate=due(t);

    if(S.phase!=='FIGHT'||!candidate||candidate.eta>V127CFG.leadMs||candidate.eta<-60 ||

       t-lastTriggered<V127CFG.minRetriggerMs)return null;

    return {...candidate,afterMs:V127CFG.afterMs};

  }

  function fired(fore,t=clock()){

    lastTriggered=t;

    if(fore.source==='v127-basic-auto'){

      automaticDodges++;cyclesWithoutHit++;nextAt=fore.at+fore.period;

    }else{manualDodges++;manualNext=fore.at+fore.period;

      if(manualDodges>=V127CFG.maxManualCycles){manualNext=null;mode='observe';}}

    record('TIMED_DODGE',{source:fore.source,marker:fore.marker,

      expectedMs:Math.round(fore.eta),periodMs:fore.period});

  }

  function cadenceActive(){return V127CFG.enabled&&!!((learned&&nextAt!==null)||manualNext!==null);}

  function imminent(t=clock(),windowMs=V127CFG.avoidKiteAheadMs){

    const p=due(t);return !!(p&&p.eta>=-50&&p.eta<=windowMs);

  }

  function sync(){

    if(!S.running||S.phase!=='FIGHT'||!boss)

      return {ok:false,reason:'Need an active HitRun FIGHT session with a selected Boss'};

    const t=clock();learned=null;nextAt=null;cyclesWithoutHit=0;

    manualDodges=0;manualNext=t+V127CFG.periodHintMs;mode='manual-trial';

    record('MANUAL_IMPACT_SYNC',{periodMs:V127CFG.periodHintMs,

      note:'Call at the actual visual BASIC HIT, not at reflected damage.'});

    return {ok:true,nextDodgeInMs:V127CFG.periodHintMs-V127CFG.leadMs,

      periodMs:V127CFG.periodHintMs,maxCycles:V127CFG.maxManualCycles};

  }

  function enable(v=true){V127CFG.enabled=!!v;

    if(!V127CFG.enabled){manualNext=null;nextAt=null;learned=null;pending=[];

      mode='observe';

      if(S.phase==='DODGE'&&S._tqDodge?.source?.startsWith('v127-basic'))

        finishTqDodge('V12.7 disabled');}

    return status(false);

  }

  

  function status(show=false){

    const t=clock(),p=due(t,false);

    const s={version:'12.7.0',enabled:V127CFG.enabled,active:S.running,

      bossId,phase:S.phase,observerAttached:!!boss,mode,

      periodHintMs:V127CFG.periodHintMs,model:learned?{...learned}:null,

      nextImpactInMs:p?Math.round(p.eta):null,manualCycles:manualDodges,

      automaticDodges,suspectedReflections:reflections,nonCorrelatedHits:observed,

      ambiguous,pending:p ?p.source:null,lastError,history:history.slice(-12),

      disclaimer:'Only probable cadence based on observed client impacts; no verified server basic attack animation/timing.'};

    if(show){console.table([{mode:s.mode,attached:s.observerAttached,period:s.model?.periodMs??null,

      nextMs:s.nextImpactInMs,reflects:reflections,clean:observed,

      dodges:s.automaticDodges+s.manualCycles}]);console.log('[V12.7]',s);}

    return s;

  }

  return {attach,stop,incoming,flush,predict,fired,imminent,cadenceActive,sync,enable,status};

}

const v127Basic=v127CreateBasic();

W.KVPV_V127_BASIC=Object.freeze({version:'12.7.0',config:V127CFG,

  status(show=true){return v127Basic.status(show);},

  sync(){return v127Basic.sync();},

  enable(v=true){return v127Basic.enable(v);},

  note:'Experimental synchronized evasion; does not guarantee dodge.'});

/* ==== END V12.7 BASIC ==== */



/* ==== KVPV V12.9 - BOSS RANGE PLUS / SINGLE HITRUN OWNER ==== */

const V129BASE=Object.freeze({retreatRadius:330,basicRadial:95,

  dodgeCap:325,basicLeadMs:880});

const V129CONFIG={enabled:true,extraDistance:40,maxExtra:65};

const V129STATE={dodges:0,knownGeometryKept:0,lastDodge:null,changes:0};

function v129Apply(){

  const ex=V129CONFIG.enabled?V129CONFIG.extraDistance:0;

  C.orbitRadius=Math.min(C.maxOrbitRadius-35,V129BASE.retreatRadius+ex);

  TQCFG.dodgeRadial=V129BASE.basicRadial+Math.round(ex*.75);

  TQCFG.maxDodgeBossDistance=Math.min(C.maxOrbitRadius-35,V129BASE.dodgeCap+ex);

  TQ114CFG.maxDistanceFromBoss=TQCFG.maxDodgeBossDistance;

  V127CFG.leadMs=V129BASE.basicLeadMs+Math.min(130,ex*2);

  return v129Status(false);

}

function v129RecordDodge(fore,d,to,geometry,t){

  V129STATE.dodges++;if(geometry)V129STATE.knownGeometryKept++;

  V129STATE.lastDodge={source:String(fore?.source||'unknown'),

    fromBoss:Math.round(d*10)/10,plannedFromBoss:Math.round(to*10)/10,

    knownGeometryPreserved:!!geometry,expectedImpactInMs:Math.round(fore?.at-t),

    at:new Date().toISOString()};

}

function v129Status(show=false){

  const data={version:'12.9.0',enabled:V129CONFIG.enabled,

    extraDistance:V129CONFIG.enabled?V129CONFIG.extraDistance:0,

    dodgeCap:TQCFG.maxDodgeBossDistance,radialStep:TQCFG.dodgeRadial,

    earlyDodgeLeadMs:V127CFG.leadMs,retreatRing:C.orbitRadius,

    activeRetreatRing:S.phase==='RETREAT'?S.orbitRadius:null,

    phase:S.phase,hitRunRunning:S.running,dodges:V129STATE.dodges,

    knownGeometryKept:V129STATE.knownGeometryKept,

    lastDodge:V129STATE.lastDodge,changes:V129STATE.changes,

    note:'Client waypoint distances only, no confirmation of server travel or immunity. Changes take effect on NEXT dodge/retreat; HP and PvP unchanged.'};

  if(show)console.table([{extra:data.extraDistance,dodgeCap:data.dodgeCap,

    retreatRing:data.retreatRing,activeRing:data.activeRetreatRing,

    leadMs:data.earlyDodgeLeadMs,phase:data.phase,dodges:data.dodges}]);

  return data;

}

W.KVPV_V129_RANGE=Object.freeze({version:'12.9.0',status:v129Status,

  setExtraDistance(n){

    const v=Number(n);if(!Number.isInteger(v)||v<0||v>V129CONFIG.maxExtra)

      return {ok:false,error:'Distance must be an integer 0..65',status:v129Status(false)};

    V129CONFIG.extraDistance=v;V129STATE.changes++;

    return {ok:true,status:v129Apply()};

  },

  enable(v=true){V129CONFIG.enabled=!!v;V129STATE.changes++;return v129Apply();},

  reset(){V129CONFIG.enabled=true;V129CONFIG.extraDistance=40;

    V129STATE.changes++;return v129Apply();}

});

v129Apply();

/* ==== END V12.9 BOSS RANGE PLUS ==== */



function v120Forecast(t){

  if(!V120CFG.allowDodge)return null;

  const basic=v120Optional(()=>v127Basic.predict(t),'basic-3500',t);

  if(basic)return basic;

  if(TQ117CFG.enabled){

    // V11.7 already prioritizes qualified native cast, then observed impact cycle.

    return v120Optional(()=>S._tq117?.select?.(t),'skill-arbiter',t);

  }

  return v120Optional(()=>S._tq113?.predict?.(t),'native-cast',t)||

    v120Optional(()=>S._tq112?.predict?.(t),'impact-cycle',t);

}

function v120Step(c,t,h){

  const phase=S.phase;

  // V12.3: the current HitRun controller owns any early survival retreat.

  // Optional observations can only RAISE caution; native low-HP safety remains.

  if(phase==='FIGHT'||phase==='DODGE'||phase==='KITE_OUT'||phase==='KITE_IN'){

    let survival=null;

    try{survival=W.KVPV_V123_SURVIVAL?._decision?.({at:t,hpPct:h.pct,

      leavePct:C.leavePct,bossId:S.bossId});}catch(_){/* optional guard never interrupts fight */}

    if(survival?.retreat===true&&h.pct<=C.leavePct){

      if(phase==='DODGE')try{finishTqDodge('V12.3 survival retreat');}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

      if(phase==='KITE_OUT'||phase==='KITE_IN')

        try{S._tq115?.end?.('V12.3 survival retreat',t);}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

      enterRetreat(c,h,t);

      return v120Record('RETREAT','V12.3 '+survival.reason+' at '+

        survival.hpPct+'% (trigger '+survival.thresholdPct+'%)',t);

    }

  }

  if(phase==='FIGHT'){

    // A guard must never silently survive into ordinary native combat.

    if(S.hooks.length&&V120CFG.restoreStaleOwnGuard){

      restoreGuard();V120ST.guardRecoveries++;

      v120Record('GUARD_RECOVERY','stale HitRun guard while FIGHT',t);

    }

    const decision=S._bossSurvival.fight({at:t,hpPct:h.pct});

    if(decision.retreat){

      if(decision.predicted)note('info','Predictive 9022: ETA '+Math.round(decision.eta)+

        'ms, HP '+h.pct.toFixed(1)+'%');

      enterRetreat(c,h,t);

      return v120Record('RETREAT',decision.predicted?'predicted 9022':'HP/observed damage',t);

    }

    if(V120CFG.enabled){

      const fore=v120Forecast(t);

      if(fore){

        const ok=startTqDodge(c,t,fore);

        if(ok){

          if(String(fore.source||'').startsWith('v127-basic'))

            try{v127Basic.fired(fore,t);}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

          return v120Record('DODGE','observed/timed skill '+String(fore.marker),t);

        }

        // If a qualified dodge was rejected, never start Kite on the same tick.

        return v120Record('FIGHT','dodge rejected: defer kite until next tick',t);

      }

      if(V120CFG.allowKite){

        // While a basic cadence is armed, keep ATTACKING between timed dodges.

        // Do not waste the safe gap by triggering an unrelated companion Kite.

        if(v127Basic.cadenceActive())

          return v120Record('FIGHT','V12.7 re-engage between basic strikes',t);

        const began=v120Optional(()=>S._tq115?.maybeStart?.(c,t,h),'companion-kite',t);

        if(began)return v120Record('KITE','kite activation',t);

      }

    }else{

      const fore=TQ117CFG.enabled?S._tq117?.select?.(t):

        (S._tq113?.predict?.(t)||S._tq112?.predict?.(t));

      if(fore)startTqDodge(c,t,fore);

      else S._tq115?.maybeStart?.(c,t,h);

    }

    return v120Record('FIGHT','native combat allowed',t);

  }

  if(phase==='DODGE'){

    // Emergency heal always supersedes an in-progress skill dodge.

    if(h.pct<=C.leavePct){

      finishTqDodge('V12 emergency HP -> RETREAT');

      enterRetreat(c,h,t);V120ST.safetyRecoveries++;

      return v120Record('RETREAT','emergency HP during DODGE',t);

    }

    tickTqDodge(c,t);

    return v120Record(S.phase==='DODGE'?'DODGE':'FIGHT','dodge lifecycle',t);

  }

  if(phase==='KITE_OUT'||phase==='KITE_IN'){

    // HP recovery always precedes timed combat optimization.

    if(h.pct<=C.leavePct){

      S._tq115?.end?.('V12 emergency HP during Kite',t);

      enterRetreat(c,h,t);V120ST.safetyRecoveries++;

      return v120Record('RETREAT','emergency HP during KITE',t);

    }

    // Return to FIGHT immediately once a real/temporary 3.5s cadence is armed.

    if(v127Basic.cadenceActive()){

      S._tq115?.end?.('V12.7 preserve attacks between timed dodges',t);

      return v120Record('FIGHT','release Kite for basic rhythm',t);

    }

    // Unlike V11, enforce heal priority even if the kite module is disabled

    // or throws. Fallback is a safe release, not another independent mover.

    const ok=v120Optional(()=>{S._tq115?.tickKite?.(c,t,h);return true;},'kite-tick',t);

    if(ok===null){

      S._tq115?.end?.('V12 kite error -> release',t,true);

      V120ST.safetyRecoveries++;

      return v120Record('FIGHT','kite module threw; native control released',t);

    }

    return v120Record(S.phase==='KITE_OUT'||S.phase==='KITE_IN'?'KITE':'FIGHT','kite lifecycle',t);

  }

  return v120Record(phase==='RETREAT'?'RETREAT':'IDLE','existing recovery owner',t);

}

W.KVPV_V12_COMBAT=Object.freeze({version:'12.0.0',config:V120CFG,

  status(print=false){

    const result={version:'12.0.0',enabled:V120CFG.enabled,

      hitRunRunning:S.running,phase:S.phase,bossId:S.bossId,hpPct:S.lastHpPct,

      priority:['RETREAT','DODGE','KITE','FIGHT'],

      decisions:V120ST.decisions,retreatDecisions:V120ST.retreats,

      dodgeDecisions:V120ST.dodges,kiteDecisions:V120ST.kites,

      fightDecisions:V120ST.fights,guardRecoveries:V120ST.guardRecoveries,

      safetyRecoveries:V120ST.safetyRecoveries,optionalErrors:V120ST.optionalErrors,

      lastOptionalError:V120ST.lastOptionalError,

      lastDecision:V120ST.lastDecision,lastReason:V120ST.lastReason,

      movementGuardHooks:S.hooks.length,

      autoBoss:W.KVPV_HITRUN_AUTO?.status?.(false)||null,

      recent:V120ST.journal.slice(-12),

      note:'Single existing native HitRun movement owner. Client-only observations; dodge and companion independence unverified in game.'};

    if(print){console.table([{phase:result.phase,HP:result.hpPct,

      controller:result.hitRunRunning,decision:result.lastDecision,

      hooks:result.movementGuardHooks,errors:result.optionalErrors}]);

      console.table(result.recent);}

    return result;

  },

  enable(v=true){V120CFG.enabled=!!v;return this.status(false);},

  history(){return V120ST.journal.slice();}

});

/* ==== END V12 UNIFIED COMBAT ==== */





function tick(){

  if(!S.running)return;

  try{

    safe();

    W.KVPV?.core?.scene?.renew?.('combat');

    const c=ctx(),t=clock(),h=hp(c.me);

    if(!h)throw Error('HP format unavailable');

    if(h.current<=0)throw Error('Character died');

    S.lastHpPct=h.pct;S.hpMax=h.max;S.lastHpAt=t;

    traceBoss('sample');

    try{v127Basic.flush(t);}catch(_){/* optional; never interrupt HitRun */}

    // Independent Boss Survival tracker. Model observes client HP only; never sends RPC.

    const hpLossV123=S._bossSurvival?.observeHp({at:t,current:h.current,max:h.max});

    try{W.KVPV_V123_SURVIVAL?._observe?.({at:t,bossId:S.bossId,

      lossPct:hpLossV123??0});}catch(_){/* telemetry must not stop combat */}

    const selected=c.boss;

    if(selected && oid(selected)!==S.bossId)throw Error('Target changed');

    if(!selected){

      S.missingSince??=t;

      if(t-S.missingSince>C.targetGraceMs)throw Error('Boss target lost');

    }else S.missingSince=null;

    const currentBossHP=hp(S.boss);

    if(currentBossHP&&currentBossHP.current<=0){stop('Boss defeated');return;}



    // V10.4: piggyback on the existing HitRun tick, max ~1 sample/second.

    // Read-only. Analytics must NEVER fail or interrupt native combat.

    const analytics=W.KVPV?.analytics;

    const every=Math.max(1000,Number(analytics?.config?.sampleMs)||1100);

    if((analytics?.config?.enabled===true || W.KVPV_V121_PERF?.config?.enabled===true) &&

       t-(S._analyticsSampleAt||0)>=every){

      S._analyticsSampleAt=t;

      try{

        const bh=hp(S.boss),timing=S._bossSurvival?.status?.(t);

        const sample={at:Date.now(),phase:S.phase,

          hpPct:h.pct,bossId:S.bossId,bossTypeId:prop(S.boss,'occ'),

          bossName:prop(S.boss,'name'),scene:S.scene,

          bossHpPct:bh?.pct??null,strongestHitPct:timing?.strongestHitPct??null,

          samples9022:timing?.samples9022??0,

          intervals9022:timing?.intervals??[]};

        analytics._observe?.(sample);

        // V12.1 shares the existing throttled sample, with no extra timer/RPC.

        W.KVPV_V121_PERF?._observe?.(sample);

        W.KVPV_V124_EFFICIENCY?._observe?.(sample);

      }catch(telemetryError){

        // Optional diagnostics never stop HitRun. No per-tick console spam.

        if(t-(S._analyticsWarnAt||-60000)>=60000){

          S._analyticsWarnAt=t;

          console.warn('[HITRUN ANALYTICS] Ignored telemetry error',String(telemetryError));

        }

      }

    }



    // V12 centralized arbitration: HP safety > dodge > kite > native fight.

    // Retreat waypoint/orbit logic below remains the existing native controller.

    if(S.phase==='FIGHT'||S.phase==='DODGE'||S.phase==='KITE_OUT'||S.phase==='KITE_IN'){

      v120Step(c,t,h);

      W.KVPV?.core?.scene?.renew?.('combat');

      return;

    }

    // A retreat with lost own movement hooks cannot continue safely.

    if(S.phase==='RETREAT' && S.hooks.length===0){

      throw Error('V12 movement guard lost during retreat');

    }

    if(S.phase!=='RETREAT')return;

    const b=pos(S.boss),p=pos(c.me);

    if(!b||!p)throw Error('Position disappeared');

    // Follow the current Boss center; discard paths that approach its range.

    const ring=recoveryRadius();

    const recoveryDistance=gap(p,b),previousDistance=S._retreatDistance;

    S._retreatDistance=recoveryDistance;

    S.orbitRadius=Math.max(ring,S.orbitRadius||0);

    // Keep a safe outward path alive while the native mover traverses it.

    // Reissuing moveTo every tick can continually restart pathfinding/animation.

    if(S.waypoint && gap(p,b)<ring-25 && gap(S.waypoint,b)<ring-10)S.waypoint=null;

    if(S.waypoint && v125SegmentDistance(b,p,S.waypoint)<

       Math.min(recoveryGeometry().range+20,Math.max(1,gap(p,b)-2)))S.waypoint=null;

    const bh=hp(S.boss);

    if(bh&&bh.current<=0){leaveRetreat('Boss defeated');stop('Boss defeated');return;}

    if(bh?.max&&S.startBossHP?.max&&

       (bh.current-S.startBossHP.current)/bh.max*100>C.bossHealResetPct)

      throw Error('Boss HP reset during retreat');



    // The current HP must have truly increased from the minimum; no stale 'best heal'.

    S.minObservedPct=Math.min(S.minObservedPct,h.pct);

    S.bestHealPct=Math.max(S.bestHealPct,h.pct);

    if(h.pct-S.minObservedPct>=1)S.healObserved=true;

    const spent=t-S.retreatAt;

    measureOrbit(p,b);

    // V12.7.1: The old BossSurvival could release combat at ~40% after a +5% heal.

    // Hold the native guard until current HP is truly full, never rounded to 100.

    // Tian Quan only: resume once safely outside Boss reach, without a full-HP gate.
    // Retain emergency retreat at 35% and the native controller on other maps.
    const tqEarlyScope=W.KVPV_FAR_SCOPE?.status?.();
    const tqEarlyResume=tqEarlyScope?.kind==='THIEN_QUAN'&&tqEarlyScope.inside===true&&
      Number.isFinite(h.pct)&&h.pct>=45&&spent>=C.minRetreatMs&&
      Number.isFinite(recoveryDistance)&&
      recoveryDistance>=Math.max(310,recoveryGeometry().range+20);
    if(tqEarlyResume){
      leaveRetreat('THIEN_QUAN resume at '+h.pct.toFixed(1)+
        '% HP: outside Boss reach; TH300 returns to far casting position');
      return;
    }
    v1271PrepareRecovery(h.pct);

    const decision=S._bossSurvival.retreat({

      at:t,hpPct:h.pct,minObservedPct:S.minObservedPct,

      retreatAt:S.retreatAt,orbitLaps:S.orbitLaps

    });

    if(W.KVPV_BOSS_RECOVERY.fullHP(h)&&v1271ReturnAllowed(h.pct,decision)){

      leaveRetreat('BOSS SURVIVAL | HP '+h.pct.toFixed(1)+'% | Heal +'+

        decision.healed.toFixed(1)+'% | Required '+decision.required.toFixed(1)+'%');

      return;

    }

    if(spent>C.noHealMs&&!S.healObserved && !v1271NoHealHold(t,spent))

      throw Error('No healing detected');

    if(spent>C.maxRetreatMs)throw Error('Retreat timeout');

    if(S.blockedChases>C.maxChaseBlocks||S.gameStops>C.maxGameStops)

      throw Error('Native Auto interfered with movement');



    const dangerEdge=recoveryGeometry().range+40;

    const slippedInside=Number.isFinite(previousDistance)&&previousDistance>=dangerEdge&&

      recoveryDistance<dangerEdge&&recoveryDistance<previousDistance-15;

    const trappedInside=recoveryDistance<dangerEdge&&t-S.lastProgressAt>=700;

    if((slippedInside||trappedInside)&&t-(S._lastEmergencyEscapeAt??-Infinity)>=900){

      S._lastEmergencyEscapeAt=t;S._emergencyEscapes=(S._emergencyEscapes||0)+1;

      const escape=v125Plan(b,p,t,true,S._emergencyEscapes);

      if(escape){S.waypoint=escape;S.waypointAt=t;S.waypointCount++;}

      else newWaypoint(b,p,t);

      S.lastProgressAt=t;S.progressPosition={...p};

      traceBoss('escape','Native path near Boss; change side at distance '+recoveryDistance.toFixed(1));

      sendMove(t);return;

    }



    if(S._stallAt!==S.retreatAt){

      S._stallAt=S.retreatAt;S.lastProgressAt=t;S.progressPosition={...p};

    }

    const moved=gap(p,S.progressPosition);

    if(moved!==null&&moved>=Math.max(5,Number(C.minProgress)||5)){

      S.progressPosition={...p};S.lastProgressAt=t;S._stallCycles=0;

    }

    // V11.1: bounded-rate, alternating radial/tangent escape when native pathing

    // stalls. Does not touch RPC, Boss target, native attack cooldown or manual stop.

    if(t-S.lastProgressAt>=2200){

      const cycles=(S._stallCycles||0)+1;

      S._stallCycles=cycles;

      S.stallRecoveries=(S.stallRecoveries||0)+1;

      const dx=p.x-b.x,dy=p.y-b.y;

      const dist=Math.hypot(dx,dy);

      const ux=dist>1?dx/dist:(S._ux??1);

      const uy=dist>1?dy/dist:(S._uy??0);

      // Switch sides on every attempt, broaden arc at most up to 150 units.

      const side=cycles%2===0?1:-1;

      const tangent=70+Math.min(80,Math.floor((cycles-1)/2)*20);

      const radial=dist<Math.max(100,S.orbitRadius-35)?115:35;

      // V12.5: one movement owner; short arc reversal before legacy escape.

      S.waypoint=v125Plan(b,p,t,true,cycles)||

        {x:p.x+ux*radial-uy*tangent*side,

         y:p.y+uy*radial+ux*tangent*side};

      S.waypointAt=t;S.waypointCount++;

      S.lastProgressAt=t;S.progressPosition={...p};

      if(cycles===3||cycles%8===0)

        note('warn','HitRun path stalled; alternate escape '+cycles+' (no forced restart)');

      sendMove(t);return;

    }

    if(!S.waypoint||gap(p,S.waypoint)<=C.nearWaypoint||t-S.waypointAt>=4500){

      newWaypoint(b,p,t);sendMove(t);return;

    }

    if(t-S.lastMoveAt>=900&&S.mover.running?.()===false)sendMove(t);

    W.KVPV?.core?.scene?.renew?.('combat');

  }catch(e){

    S.lastError=String(e?.message||e);

    console.error('[HITRUN] Error:',e.stack||e);

    stop('Safety stop: '+S.lastError);

  }

}



  

  function start(){

    if(S.running)return status();

    if(C.leavePct<30||C.leavePct>95||C.returnPct<=C.leavePct||C.returnPct>100)

      throw Error('Invalid HP thresholds');

    if(C.orbitRadius<80||C.orbitRadius>C.maxOrbitRadius||C.stepDeg<8||C.stepDeg>90||

       !Number.isInteger(C.minOrbitLaps)||C.minOrbitLaps<0||C.minOrbitLaps>6)

      throw Error('Invalid orbit parameters');

    const c=ctx(),h=hp(c.me);

    if(!h)throw Error('Cannot read character HP [current,max]');

    if(!c.boss || !pos(c.boss)||!pos(c.me))throw Error('Select Boss before start');

    if(!c.me?.on||!c.me?.off)throw Error('Cannot observe damage');

    if(!W.KVPV?.bossSurvival?.createTracker)throw Error('BossSurvival V10.1 engine missing');

    const arbiter=W.KVPV?.core?.scene;

    if(arbiter?.acquire?.('combat','hitrun')===false)

      throw Error('Scene busy: '+arbiter.reason('combat'));

    // Transactional startup: if anything fails, no orphan timer, handler or scene lease.

    let subscribed=false;

    try{

      W.KVPV_DODGE9022?.stop?.('replaced by Hit&Run');

      try{W.KVPV?.adaptive?.beforeStart?.({scene:getScene(),

        bossTypeId:prop(c.boss,'occ'),bossId:oid(c.boss),config:C});}

      catch(e){console.warn('[V10.5] Adaptive preview ignored:',String(e));}

      S._bossSurvival=W.KVPV.bossSurvival.createTracker(C);

      S.me=c.me;S.mover=c.mover;S.combat=c.combat;S.boss=c.boss;

      S._tq112?.reset?.(c.boss);

      S._tq113?.reset?.(c.boss);

      S._tq114?.reset?.(c.boss);

      S._tq115?.reset?.(c.boss);

      S._tq117?.reset?.(c.boss);

      S._tq118?.reset?.(c.boss);

      S.bossId=oid(c.boss);S.scene=getScene();S.startedAt=clock();

      try{W.KVPV_V123_SURVIVAL?.reset?.({bossId:S.bossId});}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

      try{W.KVPV_V124_EFFICIENCY?._reset?.(S.bossId);}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

      S.lastError='';S.missingSince=null;S.streakRecover=0;S.observedDangerRadius=0;

      S._v1271HpReady=false;S._v1271NoHealWarnAt=0;

      S._analyticsSampleAt=0;S._analyticsWarnAt=0;

      S._9022LastAt=0;S._9022PeriodMs=0;S._9022Samples=0;

      S.stallRecoveries=0;S._stallCycles=0;

      // Mark attempt before subscription; on() can throw after partial registration.

      subscribed=true;

      c.me.on(1012,S,onBossDamage);

      S.timer=(W.KVPV_V1?.timers?.setInterval ?? W.setInterval)(tick,C.tickMs);

      if(S.timer===null||S.timer===undefined)throw Error('HitRun interval not created');

      S.running=true;S.reason='RUNNING';S.phase='FIGHT';

      if(h.pct<=C.leavePct)enterRetreat(c,h,clock());

      try{S._tq113?.attach?.(c.boss);}catch(e){console.warn('[TQ113] Optional cast observation failed:',String(e));}

      try{v126Observer.start(c.boss);}catch(e){console.warn('[V126] Observer attach failed:',String(e));}

      try{v127Basic.attach(c.boss);}catch(e){console.warn('[V127] Mirror observer attach failed:',String(e));}

      try{W.KVPV?.adaptive?.afterStart?.();}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

      note('info','START HP '+h.pct.toFixed(1)+'%. Leave '+C.leavePct+'%, return '+C.returnPct+'%');

      return status();

    }catch(e){

      S.running=false;S.phase='OFF';S.reason='Start failed';

      try{v127Basic.stop();}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

      try{S._tq113?.disconnect?.();}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

      try{S._tq114?.end?.();}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

    try{S._tq115?.stop?.();}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

      if(S.timer!==null){try{(W.KVPV_V1?.timers?.clearInterval ?? W.clearInterval)(S.timer);}catch(_){window.KVPV_V1?.diagnostics?.record(_);}S.timer=null;}

      if(subscribed)try{c.me.off(1012,S,onBossDamage);}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

      // Restore any modified HP config and always release the acquired lease.

      try{W.KVPV?.adaptive?.abort?.();}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

      try{arbiter?.release?.('combat');}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

      throw e;

    }

  }

  

  function stop(reason='Manual stop'){

    // V12.2: close an incomplete retreat without counting it as a successful return.

    try{W.KVPV_V122_RETURN?._abort?.(reason);}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

    // End only telemetry session; no game state or RPC is changed.

    try{W.KVPV?.analytics?._end?.({at:Date.now(),reason});}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

    try{W.KVPV_V121_PERF?._end?.({at:Date.now(),reason});}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

    try{v126Observer.stop();}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

    try{v127Basic.stop();}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

    const hadSession=S.running;

    try{S._tq113?.disconnect?.();}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

    try{S._tq114?.end?.();}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

    try{S._tq117?.end?.('HitRun stopped',clock());}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

    try{S._tq115?.stop?.();}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

    S.running=false;S.reason=reason;

    if(S.timer!=null){try{(W.KVPV_V1?.timers?.clearInterval ?? W.clearInterval)(S.timer);}catch(_){window.KVPV_V1?.diagnostics?.record(_);}S.timer=null;}

    if(S.me)try{S.me.off(1012,S,onBossDamage);}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

    if(S.phase==='RETREAT'||S.phase==='DODGE'||S.phase==='KITE_OUT'||S.phase==='KITE_IN'){

      S.phase='OFF';restoreGuard();

      try{S.mover?.stop?.();}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

    }else S.phase='OFF';

    // Do not release scene control until native movement guards are restored.

    try{W.KVPV?.core?.scene?.release?.('combat');}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

    if(hadSession)try{W.KVPV?.adaptive?.afterStop?.(reason);}catch(e){

      console.warn('[V10.5] Adaptive cleanup warning',String(e));

    }

    note('warn','OFF: '+reason);

    return status();

  }

  

  function status(show=false){

    const t=clock();

    const s={version:'12.0.0',baseController:'10.1',running:S.running,phase:S.phase,reason:S.reason,

      hpPct:S.lastHpPct!=null?+S.lastHpPct.toFixed(1):null,

      leavePct:C.leavePct,returnPct:100,orbitRadius:S.orbitRadius,

      bossRange:recoveryGeometry().range,bossRangeKnown:recoveryGeometry().known,

      observedDangerRadius:S.observedDangerRadius,

      configuredBossRange:recoveryGeometry().configuredRange,

      recoveryRing:recoveryRadius(),

      targetLaps:C.minOrbitLaps,completedLaps:+S.orbitLaps.toFixed(2),

      orbitDegrees:+S.orbitArcDeg.toFixed(1),waypointsIssued:S.waypointCount,

      retreatSeconds:S.phase==='RETREAT'?+((t-S.retreatAt)/1000).toFixed(1):0,

      healedSinceMinimumPct:S.minObservedPct!=null&&S.bestHealPct!=null?

        +(S.bestHealPct-S.minObservedPct).toFixed(1):null,

      hits9022WhileRetreat:S.damage9022,

      blockedChases:S.blockedChases,gameStops:S.gameStops,blockedNativeStops:S.blockedNativeStops,

      moveAttempts:S.moveAttempts,completedRetreats:S.streakRecover,

      stallRecoveries:S.stallRecoveries||0,consecutiveStallCycles:S._stallCycles||0,

      lastError:S.lastError,bossId:S.bossId,

      bossSurvival:S._bossSurvival?.status(t)||null,

      thienQuan:S._tq112?.status?.(t)||null,

      nativeTelegraph:S._tq113?.status?.()||null,

      smartDodge114:S._tq114?.status?.()||null,

      companionKite115:S._tq115?.status?.()||null,

      smartSkill117:S._tq117?.status?.()||null,

      smartOrbit125:W.KVPV_V125_ORBIT?.status?.(false)||null,

      bossSignal126:W.KVPV_V126_SIGNAL?.status?.(false)||null,

      basicStrike127:W.KVPV_V127_BASIC?.status?.(false)||null,

      hpRecovery1271:W.KVPV_V127_HEAL?.status?.(false)||null,

      companionCombat118:S._tq118?.status?.()||null,

      combatLearning119:S._tq119?.status?.()||null,

      note:'Server hit range, boss leash, and healing beyond radius unverified'};

    if(show)console.table([s]);return s;

  }

  const api={version:'12.0.0',baseController:'10.1',config:C,start,stop,status,

    history(){console.table(S.events.slice(-25));return S.events.slice();}};

  W.KVPV_HITRUN1=api;

  console.info(TAG,'READY V12.0: one combat arbiter, unified dodge/kite/retreat.');

})();/* V10.3: Boss-only, scene-safe AUTO START for existing HitRun controller.
 * A previous version incorrectly checked addon.version === '1.1' during scan,
 * even though the V10.1 controller exports version '10.1'.
 * No additional RPC. The existing 1600ms timer is reused, and only while enabled.
 */

 

(() => {

  'use strict';

  const W=window,TAG='[HITRUN AUTO V12.0]';

  try{W.KVPV_HITRUN_AUTO?.stop?.();}catch(e){console.warn(TAG,'old auto-arm',String(e));}

  const actor=String(_Ba?._rJ?._O$?.ins?.actorId??'');

  const scanMs=1600;

  let enabled=false,timer=null,attemptedKey=null,starts=0,failures=0,scans=0;

  let lastError='',lastBoss='',lastMode='waiting',lastBlocked='',lastStartAt=0;

  let scanErrors=0,scanCooldownUntil=0,lastScanWarnAt=0,pollRepairs=0;

  // Only short-lived client observation failures can be retried automatically.

  // Manual stop, no healing, blocked scene, death and changed actor NEVER auto-retry.

  const RECOVERY_DELAY_MS=12000, MAX_RECOVERIES_PER_BOSS=2;

  const recoveryAttempts=new Map();

  let stopSeenKey='',stopSeenReason='',stopSeenAt=0;

  let recoveryStarts=0,lastRecoveryAt=0;

  const recoverableStop = reason =>

    /^Safety stop: (?:Boss target lost|Position disappeared|HP format unavailable|Movement disabled by game)$/.test(reason);

  

  function liveHpPct(){

    try{

      const world=(typeof _C==='undefined')?null:_C?._Ba?.instance;

      const me=world?.getRole?.(Number(actor))||world?.getRole?.(actor);

      const health=me?.property?.get?.('hp');

      if(!Array.isArray(health)||health.length<2)return null;

      const n=Number(health[0]),d=Number(health[1]);

      return Number.isFinite(n)&&Number.isFinite(d)&&d>0&&n>0?100*n/d:null;

    }catch(_){return null;}

  }

  const prop=(o,k)=>{try{return o?.property?.get?.(k);}catch(_){return null;}};

  const controller=()=>W.KVPV_HITRUN1;

  function controllerReady(addon){

    // Capability test, not the legacy incompatible version comparison.

    return !!addon && typeof addon.start==='function' &&

      typeof addon.stop==='function' && typeof addon.status==='function' &&

      /^(?:10|11|12)\./.test(String(addon.version||''));

  }

  

  function ownerValid(){

    return !!actor && !W.__KVPV_UNIVERSAL_HALTED &&

      String(_Ba?._rJ?._O$?.ins?.actorId??'')===actor &&

      _Ba?._rJ?._O$?.ins?.isDead!==true;

  }

  

  function currentBoss(){

    if(!ownerValid())return null;

    const world=(typeof _C==='undefined')?null:_C?._Ba?.instance;

    const me=world?.getRole?.(Number(actor))||world?.getRole?.(actor);

    const target=me?.getComponent?.(_d?._Yct?._Het)?.target;

    if(!target||Number(prop(target,'type'))!==1)return null;

    const occ=Number(prop(target,'occ'));

    let nativeBoss=false;

    try{nativeBoss=!!_ft?._tY?.ins?.isBoss?.(occ);}catch(_){/* fallback by name */}

    const name=String(prop(target,'name')??'');

    const nameBoss=/boss|thi[eê]n\s*quan|b[aạ]o\s*qu[aâ]n|ma\s*th[aầ]n|th[uủ]\s*l[iĩ]nh|y[eê]u\s*v[uư]ơng|th[aầ]n\s*th[uú]/i.test(name);

    if(!nativeBoss&&!nameBoss)return null;

    const id=String(prop(target,'id')??target.id??'');

    if(!id)return null;

    const scene=String(_Ba?._$a?._yo?.ins?.intoSce?.[0]??'');

    return {id,name,key:scene+'/'+id};

  }

  function scan(){

    if(!enabled)return status();

    // Keep unexpected native API errors from flooding the console/timer loop.

    // Do not clear attemptedKey, send a game RPC or retry a failed Boss start.

    const time=Date.now();

    if(time<scanCooldownUntil)return status();

    try{return scanImpl();}

    catch(e){

      scanErrors++;lastError=String(e?.message||e);

      lastMode='scan-error';lastBlocked='Native game state read failed; retrying after cooldown';

      scanCooldownUntil=time+Math.min(30000,2000*Math.pow(2,Math.min(4,scanErrors-1)));

      if(time-lastScanWarnAt>=30000){lastScanWarnAt=time;

        console.warn(TAG,'Polling exception (no RPC retry):',lastError);}

      return status();

    }

  }

  function scanImpl(){

    scans++;

    if(!ownerValid()){

      stop(false);lastMode='session-unavailable';lastBlocked='Character dead or actor invalid; revive and START again';return status();

    }

    const addon=controller();

    if(!controllerReady(addon)){

      lastMode='missing-addon';lastBlocked='HitRun 10/11/12 controller unavailable';return status();

    }

    if(W.KVPV?.combat?.config?.autoArm===false){

      lastMode='disabled-by-user';lastBlocked='KVPV.combat.config.autoArm=false';return status();

    }

    let run;

    try{run=addon.status(false);}catch(e){

      lastMode='status-error';lastError=String(e);return status();

    }

    if(run?.running){

      stopSeenKey='';stopSeenReason='';stopSeenAt=0;

      lastMode='active';lastBlocked='';return status();

    }

    

    if(Number(_Ba?._$a?._yo?.ins?.intoSce?.[0])===2812){

      lastMode='marry-battle';lastBlocked='Team Boss + chest pickup owns scene 2812';

      return status();

    }

    const boss=currentBoss();

    if(!boss){lastMode='waiting-for-boss';lastBlocked='';scanErrors=0;return status();}

    lastBoss=boss.name||boss.id;

    // Default: never restart a previously attempted Boss. Exception: short-lived,

    // narrowly classified client observation failure, after a long cooldown,

    // with recovered HP, same selected Boss, and a strict per-Boss retry cap.

    let isRecovery=false;

    if(attemptedKey===boss.key){

      const reason=String(run?.reason||'');

      if(!recoverableStop(reason)){

        lastMode='already-attempted';

        lastBlocked=reason ? 'Not auto-retrying after: '+reason : 'Call rearm() manually for this Boss';

        return status();

      }

      if(stopSeenKey!==boss.key||stopSeenReason!==reason){

        stopSeenKey=boss.key;stopSeenReason=reason;stopSeenAt=Date.now();

      }

      const count=recoveryAttempts.get(boss.key)||0;

      if(count>=MAX_RECOVERIES_PER_BOSS){

        lastMode='recovery-limit';lastBlocked='Transient stop retry cap reached; manually inspect Boss';return status();

      }

      if(Date.now()-stopSeenAt<RECOVERY_DELAY_MS){

        lastMode='recovery-cooldown';lastBlocked='Waiting for stable native Boss selection';return status();

      }

      const health=liveHpPct();

      const minimum=Math.max(45,Number(addon.config?.leavePct||35)+10);

      if(health===null || health<minimum){

        lastMode='recovery-wait-hp';lastBlocked='Live HP below safe restart threshold or unavailable';return status();

      }

      isRecovery=true;

    }

    const arbiter=W.KVPV?.core?.scene;

    if(typeof arbiter?.can!=='function'){

      lastMode='scene-unavailable';lastBlocked='Scene Manager not ready';return status();

    }

    if(arbiter.can('combat')===false){

      lastMode='scene-busy';lastBlocked=arbiter.reason?.('combat')||'Scene reserved';

      return status(); // IMPORTANT: do not consume the only attempt while blocked.

    }

    // Count before attempt; a failure consumes a retry slot to prevent storms.

    attemptedKey=boss.key;

    if(isRecovery){

      recoveryAttempts.set(boss.key,(recoveryAttempts.get(boss.key)||0)+1);

      lastRecoveryAt=Date.now();recoveryStarts++;

      stopSeenAt=Date.now();

    }

    try{

      addon.start();

      if(addon.status(false)?.running!==true)throw Error('HitRun start not confirmed');

      starts++;lastStartAt=Date.now();lastError='';scanErrors=0;lastMode='started';lastBlocked='';

      console.info(TAG,'Auto started for Boss',lastBoss);

    }catch(e){

      failures++;lastError=String(e?.message||e);lastMode='start-failed';

      console.warn(TAG,lastError);

    }

    return status();

  }

  

  function stop(stopController=true){

    enabled=false;

    if(timer!==null){(W.KVPV_V1?.timers?.clearInterval ?? W.clearInterval)(timer);timer=null;}

    if(stopController){

      try{if(controller()?.status?.(false)?.running)controller().stop('HitRun auto-arm disabled');}

      catch(e){console.warn(TAG,'stop failed',e);}

    }

    lastMode='stopped';lastBlocked='Disabled by user';return status();

  }

  

  function rearm(){

    // Explicit user command; does not override a manual combat OFF flag.

    attemptedKey=null;stopSeenKey='';stopSeenReason='';stopSeenAt=0;

    enabled=true;lastBlocked='';lastError='';

    if(timer===null)timer=(W.KVPV_V1?.timers?.setInterval ?? W.setInterval)(scan,scanMs);

    scan();return status();

  }

  

  function repairPolling(){

    // Only repair a lost LOCAL interval; never rearm a Boss already attempted.

    // Manual stop(), invalid actor or disabled combat means NO automatic restart.

    if(!enabled || timer!==null || !ownerValid() ||

       W.KVPV?.combat?.config?.autoArm===false ||

       lastMode==='stopped' || lastMode==='session-unavailable')return false;

    try{

      const handle=(W.KVPV_V1?.timers?.setInterval ?? W.setInterval)(scan,scanMs);

      if(handle===null||handle===undefined)throw Error('Interval unavailable');

      timer=handle;pollRepairs++;return true;

    }catch(e){lastError=String(e);return false;}

  }

  

  function status(show=false){

    let hitrun=null;try{hitrun=controller()?.status?.(false)||null;}catch(e){lastError=String(e);}

    const out={version:'12.0.0',enabled,timerActive:timer!==null,scanMs,

      lastMode,lastBlocked,lastBoss,starts,failures,scans,lastError,

      lastStartAt,attemptedKey,scanErrors,scanCooldownUntil,pollRepairs,

      recovery:{starts:recoveryStarts,lastRecoveryAt,maxPerBoss:MAX_RECOVERIES_PER_BOSS,

        attemptsForBoss:recoveryAttempts.get(attemptedKey)||0,

        stoppedFor:stopSeenReason,nextRetryAt:stopSeenAt?stopSeenAt+RECOVERY_DELAY_MS:null},

      hitrun};

    if(show)console.table([{enabled,lastMode,lastBlocked,lastBoss,starts,failures,

      hp:out.hitrun?.hpPct,phase:out.hitrun?.phase,reason:out.hitrun?.reason}]);

    return out;

  }

  W.KVPV_HITRUN_AUTO=Object.freeze({version:'12.0.0',status,scan,stop,rearm,start:rearm,repairPolling});

  // V1: polling starts only through explicit rearm().

  lastMode='stopped';lastBlocked='Awaiting manual combat mode';

  console.info(TAG,'Ready: waits for a native-selected Boss; respects scene ownership.');

})();

/* V10.1 unified public interfaces. Adapters do not issue game RPC. */

 

(() => {

  'use strict';

  const W=window,NS=W.KVPV||(W.KVPV={});

  const keys=['enableEventSchedule','enableHongHoang','enableDaoTri','enableVinhDu',

    'enableTuLa','enableDinhCao','enableYeuVuong','enableTienDuyen','enableTinhThan'];

  const cfg={enabled:true};let saved=null;

  const dailyConfig=()=>W.KVPV_DAILY?.config||null;

  NS.events=Object.freeze({version:'11.4.0',config:cfg,timeline:NS.timeline||null,

    get audit(){return NS.eventAudit||null;},

    start(){const c=dailyConfig();if(!c)return {ok:false,reason:'Auto Daily not ready'};

      if(saved){for(const k of keys)if(Object.hasOwn(saved,k))c[k]=saved[k];}

      else c.enableEventSchedule=true;

      cfg.enabled=true;return this.status();},

    stop(){const c=dailyConfig();if(!c)return {ok:false,reason:'Auto Daily not ready'};

      if(cfg.enabled||!saved){saved=Object.fromEntries(keys.map(k=>[k,c[k]]));}

      for(const k of keys)c[k]=false;

      cfg.enabled=false;return this.status();},

    status(){const c=dailyConfig();return {enabled:cfg.enabled,engineRunning:!!W.KVPV_DAILY?.quickState?.()?.running,

      redFirst:c?.redFirst??null,flags:c?Object.fromEntries(keys.map(k=>[k,c[k]])):null,

      note:'Does not stop currently running event/scene; changes only future eligibility.'};}

  });

})();





 

(() => {

  'use strict';

  const W=window,NS=W.KVPV||(W.KVPV={});

  const opts={tuVuotEnabled:null};

  const native=()=>{try{return _Ba?._Co?._Mo?.ins||null;}catch(_){return null;}};

  function safeStageStatus(){try{return W.KVPV_ASYNC928?.status?.()?.stage||null;}catch(_){return null;}}

  function diagnose(){

    const d=W.KVPV_DAILY,config=d?.config||null,quick=d?.quickState?.()||{};

    const m=native();

    let map=null;

    try{map=Number(_ft?._h$?.ins?.getCfgByLv?.(m?.curLv)?.[0]);}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

    let current=null,common=null,sceneReason=null;

    try{current=Number(_Ba?._$a?._yo?.ins?.intoSce?.[0]);

      common=_Ba?._$a?.SceneUtil?.isCommonScene===true;}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

    try{sceneReason=NS.core?.scene?.reason?.('stage')||null;}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

    const enabled=config?.enableTuVuot===true;

    const manualPause=NS.stageGuard?.isLocked?.()===true;

    const stageStatus=safeStageStatus();

    const loaded=Number.isFinite(Number(m?.curWare))?Number(m.curWare):null;

    let needed=null;

    try {const raw=_ft?._h$?.ins?.getCfgByLv?.(m?.curLv);needed=Number(raw?.[2]);

      if(!Number.isFinite(needed))needed=null;}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

    let reason='Ready when scheduler is idle';

    if(!d)reason='Auto Daily unavailable';

    else if(manualPause)reason='Manually paused in this tab; only explicit KVPV.daily.start() resumes';

    else if(!enabled)reason='Tự Vượt disabled by config/quest; inspect Quest Director';

    else if(!m)reason='Native Thiên Quan model unavailable';

    else if(quick.job && quick.job!=='rảnh' && quick.job!=='ranh')reason='Auto Daily job: '+quick.job;

    else if(sceneReason)reason='Scene Manager: '+sceneReason;

    else if(stageStatus?.paused)reason='Async stage lane paused';

    else if(m.auto===true)reason='Native Thiên Quan auto is enabled';

    return {enabled,manualPause,nativeAuto:m?.auto===true,stageLevel:m?.curLv??null,

      currentMap:current,stageMap:Number.isFinite(map)?map:null,

      inStage:!!Number.isFinite(map)&&!common&&current===map,

      monstersKilled:loaded,monstersRequired:needed,

      monstersRemaining:loaded!==null&&needed!==null?Math.max(0,needed-loaded):null,

      redFirst:config?.redFirst??null,dailyRunning:quick.running??null,

      stageLane:stageStatus||null,job:quick.job||null,sceneReason,reason};

  }

  NS.daily=Object.freeze({version:'10.3.0',config:opts,

    start(){const d=W.KVPV_DAILY;if(!d)return {ok:false,reason:'Auto Daily not ready'};

      d.tuVuotStart?.();opts.tuVuotEnabled=true;return this.status();},

    stop(){const d=W.KVPV_DAILY;if(!d)return {ok:false,reason:'Auto Daily not ready'};

      d.tuVuotStop?.();opts.tuVuotEnabled=false;return this.status();},

    status(){return {...diagnose(),tuVuot:diagnose()};},

    diagnose

  });

})();

/* V10.3 Combat facade: makes auto-arm ON by default, manual OFF stays OFF. */

 

(() => {

  'use strict';

  const W=window,NS=W.KVPV||(W.KVPV={});

  const cfg={autoArm:false};

  NS.combat=Object.freeze({version:'10.3.0',config:cfg,

    start(){const hit=W.KVPV_HITRUN1;

      if(!hit)return {ok:false,reason:'HitRun not ready'};

      return hit.start(); // explicit manual start still respects Scene Manager

    },

    stop(){cfg.autoArm=false;

      W.KVPV_HITRUN_AUTO?.stop?.();

      if(W.KVPV_HITRUN1?.status?.(false)?.running)

        W.KVPV_HITRUN1.stop('V10.3 manual combat stop');

      return this.status();},

    autoArm(){cfg.autoArm=true;

      return W.KVPV_HITRUN_AUTO?.rearm?.()||this.status();},

    status(){const auto=W.KVPV_HITRUN_AUTO?.status?.(false)||null;

      return {autoArm:cfg.autoArm,autoStartOnBoss:cfg.autoArm,

        scene:NS.core?.scene?.status?.()||null,

        hitrun:W.KVPV_HITRUN1?.status?.(false)||null,

        auto:auto?.lastMode||null,autoDetails:auto,model:NS.bossSurvival?.version||null};},

    model:NS.bossSurvival

  });

})();

/* V10.7 shared monitor sampling + recovery/decision observers.
 * One existing monitor timer; no game RPCs or character movement.
 */

 

(() => {

  'use strict';

  const W=window,NS=W.KVPV||(W.KVPV={});

  const c={sampleMs:2500,maxSamples:120,stuckJobMs:180000,stuckRetreatMs:90000};

  let timer=null,samples=[],lastJob='',jobSince=0,alerts=[],alertKey='';

  let readErrors=0,lastReadError='',lastReadErrorAt=0;

  const read=(label,fn)=>{try{return fn()||null;}catch(e){readErrors++;lastReadError=label+': '+String(e);lastReadErrorAt=now();return null;}};

  const now=()=>Date.now();

  

  function snapshot(){

    const errorsBefore=readErrors;

    const core=read('core',()=>NS.core?.status?.());

    const hit=read('hitrun',()=>W.KVPV_HITRUN1?.status?.(false));

    const auto=read('autoarm',()=>W.KVPV_HITRUN_AUTO?.status?.(false));

    const day=read('daily',()=>W.KVPV_DAILY?.quickState?.());

    const stage=read('stage',()=>NS.daily?.diagnose?.());

    const timeline=read('timeline',()=>NS.events?.timeline?.status?.());

    const config=W.KVPV_DAILY?.config||null;

    // Optional server-updated counters: only read, never call any gathering RPC.

    const hong=read('hongHoang',()=>typeof _Ba==='undefined'?null:_Ba?._OBt?._WBt?.inst)||null;

    const dao=read('daoTri',()=>typeof _Ba==='undefined'?null:_Ba?._d_t?._p_t?.ins)||null;

    const floor=read('dinhCaoFloor',()=>typeof _Ba==='undefined'?null:_Ba?._$a?._yo?.ins?.intoSce?.[3]);

    const actorKey=read('actorKey',()=>typeof _Ba==='undefined'?null:String(_Ba?._rJ?._O$?.ins?.actorId??''));

    const sceneType=read('sceneType',()=>typeof _Ba==='undefined'?null:Number(_Ba?._$a?.SceneUtil?.curScene));

    const mapId=read('mapId',()=>typeof _Ba==='undefined'?null:Number(_Ba?._$a?._yo?.ins?.intoSce?.[0]));

    const commonScene=read('commonScene',()=>typeof _Ba==='undefined'?null:_Ba?._$a?.SceneUtil?.isCommonScene===true);

    const combat=hit?.running===true;

    return {at:now(),owner:core?.scene?.owner||null,sceneJob:day?.job||null,

      phase:hit?.phase||null,hpPct:hit?.hpPct??null,bossId:hit?.bossId??null,

      eta9022:hit?.bossSurvival?.eta9022??null,

      strongestHitPct:hit?.bossSurvival?.strongestHitPct??null,

      hitrunRunning:combat,autoArm:auto?.enabled??null,

      autoMode:auto?.lastMode||null,autoBlocked:auto?.lastBlocked||null,

      autoTimerActive:auto?.timerActive??null,autoEnabled:auto?.enabled??null,

      autoAttemptedKey:auto?.attemptedKey??null,autoScanErrors:auto?.scanErrors||0,

      combatAutoArmAllowed:NS.combat?.config?.autoArm!==false,

      autoStarts:auto?.starts||0,autoFailures:auto?.failures||0,

      retreats:hit?.completedRetreats||0,shots9022:hit?.hits9022WhileRetreat||0,

      stageEnabled:stage?.enabled??null,stageReason:stage?.reason||null,

      stageManualPause:stage?.manualPause??null,

      stageInStage:stage?.inStage??null,stageNativeAuto:stage?.nativeAuto??null,

      stageLevel:stage?.stageLevel??null,stageMonstersKilled:stage?.monstersKilled??null,

      stageMonstersRemaining:stage?.monstersRemaining??null,

      hongHoangCount:typeof hong?.gathCount==='number'?hong.gathCount:null,

      daoTriCount:Number.isFinite(Number(dao?.count))?Number(dao.count):null,

      daoTriRemaining:Number.isFinite(Number(dao?.maxCount))&&Number.isFinite(Number(dao?.count))?

        Math.max(0,Number(dao.maxCount)-Number(dao.count)):null,

      dinhCaoFloor:Number.isFinite(Number(floor))?Number(floor):null,

      actorKey:actorKey||null,sceneType,mapId,commonScene,

      stageReasonScene:stage?.sceneReason??null,

      redFirst:config?.redFirst??null,

      activeEvents:timeline?.active?.map?.(e=>e.key)||[],

      reservation:timeline?.reservation||null,

      runningDaily:day?.running??null,dailyJobStep:day?.step||null,

      readErrors,readErrorsThisSample:readErrors-errorsBefore,lastReadError,lastReadErrorAt,

      actorValid:!W.__KVPV_UNIVERSAL_HALTED};

  }

  function check(s){

    const job=String(s.sceneJob||'rảnh');

    if(job!==lastJob){lastJob=job;jobSince=s.at;}

    let issue='',issueKey='';

    s.stuckJob=job!=='rảnh'&&job!=='ranh'&&s.at-jobSince>c.stuckJobMs;

    s.retreatTooLong=s.phase==='RETREAT'&&s.hitrunRunning &&

      (read('retreat',()=>W.KVPV_HITRUN1?.status?.(false))?.retreatSeconds||0)*1000>c.stuckRetreatMs;

    if(s.stuckJob){

      issueKey='job:'+job;

      issue='Job '+job+' unchanged for '+Math.round((s.at-jobSince)/1000)+'s';

    }else if(s.retreatTooLong){

      issueKey='hitrun-long-retreat';issue='HitRun retreat unusually long';

    }

    if(issueKey && issueKey!==alertKey){

      alertKey=issueKey;alerts.push({at:s.at,issue});

      if(alerts.length>40)alerts.shift();

      console.warn('[KVPV V10.3 MONITOR]',issue);

    }else if(!issueKey)alertKey='';

  }

  function sample(){

    // Instrumentation and recovery cannot terminate the monitoring interval.

    try{

      const s=snapshot();samples.push(s);

      if(samples.length>c.maxSamples)samples.shift();

      try{check(s);}catch(e){readErrors++;lastReadError='check: '+String(e);}

      try{s.nativeSignals=NS.nativeEvidence?.observe?.(s)||[];}

      catch(e){readErrors++;lastReadError='native-evidence: '+String(e);s.nativeSignals=[];}

      try{NS.decision?.observe?.(s);}catch(e){readErrors++;lastReadError='decision: '+String(e);}

      try{const wf=NS.workflow?.observe?.(s);

        if(wf){s.workflowProgressSeq=wf.seq??0;s.workflowState=wf.state||null;

          s.workflowStalled=wf.stalled===true;}

      }catch(e){readErrors++;lastReadError='workflow: '+String(e);}

      try{NS.actions?.observe?.(s);}catch(e){readErrors++;lastReadError='actions: '+String(e);}

      try{NS.responses?.observe?.(s);}catch(e){readErrors++;lastReadError='responses: '+String(e);}

      try{NS.eventAudit?.observe?.(s);}catch(e){readErrors++;lastReadError='event-audit: '+String(e);}

      try{NS.orchestrator?.observe?.(s);}catch(e){readErrors++;lastReadError='orchestrator: '+String(e);}

      try{NS.executor?.observe?.(s);}catch(e){readErrors++;lastReadError='executor: '+String(e);}

      try{NS.recovery?.observe?.(s);}catch(e){readErrors++;lastReadError='recovery: '+String(e);}

      return s;

    }catch(e){readErrors++;lastReadError='sample: '+String(e);lastReadErrorAt=now();return null;}

  }

  

  function report(){

    const s=snapshot();const recent=samples;

    const since=recent.length?recent[0].at:s.at;

    const fights=recent.filter(x=>x.phase==='FIGHT').length;

    const retreats=recent.filter(x=>x.phase==='RETREAT').length;

    const total=fights+retreats;

    return {at:new Date(s.at).toISOString(),...s,

      observedSeconds:Math.round((s.at-since)/1000),

      fightPercent:total?Math.round(fights/total*100):null,

      retreatPercent:total?Math.round(retreats/total*100):null,

      alerts:alerts.slice(-5)};

  }

  function dashboard(){const s=report();

    console.table([{state:s.phase,HP:s.hpPct,owner:s.owner,

      autoHitRun:s.autoMode,starts:s.autoStarts,

      'Thiên Quan':s.stageReason,combatPct:s.fightPercent,

      retreats:s.retreats,'9022 ETA':s.eta9022,

      job:s.sceneJob}]);return s;}

  NS.monitor=Object.freeze({version:'10.3.0',config:c,

    start(){if(timer===null){try{NS.nativeEvidence?.start?.();}catch(e){readErrors++;lastReadError='native-subscribe: '+String(e);}

      try{NS.actions?.start?.();}catch(e){readErrors++;lastReadError='actions-start: '+String(e);}

      sample();timer=(W.KVPV_V1?.timers?.setInterval ?? W.setInterval)(sample,Math.max(1000,c.sampleMs));}return this.status();},

    stop(){if(timer!==null){(W.KVPV_V1?.timers?.clearInterval ?? W.clearInterval)(timer);timer=null;}

      try{NS.nativeEvidence?.stop?.();}catch(e){readErrors++;lastReadError='native-unsubscribe: '+String(e);}

      try{NS.actions?.stop?.();}catch(e){readErrors++;lastReadError='actions-stop: '+String(e);}

      return this.status();},

    status(){return {running:timer!==null,samples:samples.length,last:samples.at(-1)||null,

      snapshot:snapshot(),alerts:alerts.slice(-5),readErrors,lastReadError,lastReadErrorAt};},

    history:()=>samples.slice(),alerts:()=>alerts.slice(),dashboard,report,

    analytics:()=>NS.analytics?.report?.()??null,

    recommendations:()=>NS.analytics?.recommendations?.()??[]

  });

})();

/* V10.4: game-independent, read-only combat analytics. No timers, scene APIs,
 * movement, combat calls, config mutation, or persistence. Input must be real
 * HP samples supplied by the HitRun controller. */

 

(() => {

  'use strict';

  const W=window,NS=W.KVPV||(W.KVPV={});

  const defaults=Object.freeze({maxProfiles:30,maxGapMs:5000,

    minSampleMs:300,minDamageDropPct:1,minimumSamples:10,

    minimumObserveMs:20000,minRetreatsForConfidence:2,damageBufferPct:6});

  const finite=n=>typeof n==='number'&&Number.isFinite(n);

  const pct=n=>finite(n)&&n>=0&&n<=100;

  const clamp=(n,a,b)=>Math.min(b,Math.max(a,n));

  const round=(n,d=1)=>Number(n.toFixed(d));

  function createRecorder(options={}){

    const C={...defaults,...options};

    const data=new Map();

    let current=null,errors=0,accepted=0,ignored=0,lastEnd=null;

    function bossKey(s){

      const scene=String(s.scene??'?').slice(0,40);

      const kind=s.bossTypeId===null||s.bossTypeId===undefined||s.bossTypeId===''?

        'instance:'+String(s.bossId).slice(0,64):'kind:'+String(s.bossTypeId).slice(0,64);

      return scene+'/'+kind;

    }

    function newProfile(s,key){

      return {key,scene:String(s.scene??'?'),bossTypeId:s.bossTypeId??null,

        bossName:String(s.bossName??'Unknown Boss').slice(0,90),encounters:0,

        samples:0,firstAt:s.at,lastAt:s.at,fightMs:0,retreatMs:0,

        fightBossHpLossPts:0,totalBossHpLossPts:0,

        hpLostPts:0,hpHealedRetreatPts:0,damageSamples:0,healSamples:0,

        maxObservedHpDropPts:0,maxSmartPkHitPts:0,retreats:0,

        samples9022:0,estimated9022PeriodMs:null,stable9022:false,

        last:null};

    }

    function observed(s){

      if(!s||!finite(s.at)||!pct(s.hpPct)||

         !['FIGHT','RETREAT'].includes(s.phase)||

         !s.bossId||s.scene===undefined||s.scene===null)return null;

      return {...s,

        bossHpPct:pct(s.bossHpPct)?s.bossHpPct:null,

        strongestHitPct:pct(s.strongestHitPct)?s.strongestHitPct:null,

        intervals9022:Array.isArray(s.intervals9022)?

          s.intervals9022.filter(x=>finite(x)&&x>0).slice(-6):[],

        samples9022:finite(s.samples9022)?Math.max(0,Math.floor(s.samples9022)):0};

    }

    function end({at,reason}={}){

      if(current){

        lastEnd={key:current.key,at:finite(at)?at:current.lastAt,

          reason:String(reason||'ended').slice(0,120)};

      }

      current=null;

      return lastEnd;

    }

    function observe(sample){

      const s=observed(sample);

      if(!s){ignored++;return false;}

      const key=bossKey(s);

      if(current && (current.key!==key || current.bossId!==String(s.bossId)))end({at:s.at,reason:'boss instance changed'});

      let p=data.get(key);

      if(!p){

        if(data.size>=C.maxProfiles)data.delete(data.keys().next().value);

        p=newProfile(s,key);data.set(key,p);

      }

      if(!current){current={key,bossId:String(s.bossId),lastAt:s.at};p.encounters++;p.last=null;}

      if(p.last && s.at<=p.last.at){ignored++;return false;}

      const prev=p.last;

      const dt=prev?s.at-prev.at:0;

      if(prev&&dt>=C.minSampleMs&&dt<=C.maxGapMs){

        // Don't assign a whole interval to a phase if it changed mid-interval.

        if(prev.phase===s.phase){

          if(s.phase==='FIGHT')p.fightMs+=dt;

          else p.retreatMs+=dt;

        }

        const delta=round(s.hpPct-prev.hpPct,4);

        if(delta<0){

          p.hpLostPts+=-delta;

          if(-delta>=C.minDamageDropPct){

            p.damageSamples++;

            p.maxObservedHpDropPts=Math.max(p.maxObservedHpDropPts,-delta);

          }

        }else if(delta>0 && prev.phase==='RETREAT' && s.phase==='RETREAT'){

          p.hpHealedRetreatPts+=delta;p.healSamples++;

        }

        if(prev.bossHpPct!==null && s.bossHpPct!==null){

          const loss=prev.bossHpPct-s.bossHpPct;

          if(loss>0 && loss<=100){

            p.totalBossHpLossPts+=loss;

            if(prev.phase==='FIGHT'&&s.phase==='FIGHT')p.fightBossHpLossPts+=loss;

          }

          // HP increased = healed/reset; never count it as negative damage.

        }

      }else if(prev && dt>C.maxGapMs){

        // Timer throttled/background tab: do not fabricate elapsed combat time.

        errors++;

      }

      if(prev?.phase==='FIGHT' && s.phase==='RETREAT')p.retreats++;

      if(s.strongestHitPct!==null)p.maxSmartPkHitPts=Math.max(p.maxSmartPkHitPts,s.strongestHitPct);

      if(s.samples9022>0){p.samples9022=Math.max(p.samples9022,s.samples9022);}

      if(s.intervals9022.length>=2){

        const mean=s.intervals9022.reduce((sum,n)=>sum+n,0)/s.intervals9022.length;

        const deviation=Math.max(...s.intervals9022.map(n=>Math.abs(n-mean)));

        p.stable9022=deviation<=mean*0.25;

        p.estimated9022PeriodMs=p.stable9022?Math.round(mean):null;

      }

      p.samples++;accepted++;p.lastAt=s.at;

      p.last={at:s.at,phase:s.phase,hpPct:s.hpPct,bossHpPct:s.bossHpPct};

      current.lastAt=s.at;

      return true;

    }

    function summarize(p){

      const observedMs=p.fightMs+p.retreatMs;

      const strong=Math.max(p.maxObservedHpDropPts,p.maxSmartPkHitPts);

      const sufficient=p.samples>=C.minimumSamples && observedMs>=C.minimumObserveMs &&

        p.damageSamples>0;

      const confident=sufficient&&observedMs>=60000&&p.retreats>=C.minRetreatsForConfidence;

      const leave=clamp(Math.ceil(Math.max(35,strong+C.damageBufferPct)),35,75);

      const resume=clamp(Math.ceil(Math.max(40,leave+10,strong+12)),45,90);

      return {key:p.key,name:p.bossName,scene:p.scene,bossTypeId:p.bossTypeId,

        encounters:p.encounters,samples:p.samples,observedSeconds:round(observedMs/1000),

        fightSeconds:round(p.fightMs/1000),retreatSeconds:round(p.retreatMs/1000),

        fightSharePct:observedMs?round(p.fightMs/observedMs*100):null,

        retreats:p.retreats,

        hpLostPts:round(p.hpLostPts),hpHealedRetreatPts:round(p.hpHealedRetreatPts),

        maxObservedHpDropPts:round(p.maxObservedHpDropPts),

        maxSmartPkHitPts:round(p.maxSmartPkHitPts),

        healingRatePtsPerSecond:p.retreatMs?round(p.hpHealedRetreatPts/p.retreatMs*1000,3):null,

        // Boss HP loss may come from OTHER PLAYERS. Never label this player DPS.

        bossHpLossPctPerFightSecond:p.fightMs?round(p.fightBossHpLossPts/p.fightMs*1000,3):null,

        personalDps:null,

        samples9022:p.samples9022,stable9022:p.stable9022,

        estimated9022PeriodMs:p.estimated9022PeriodMs,

        confidence:confident?'moderate':sufficient?'preliminary':'insufficient',

        suggestion:sufficient?{

          leavePct:leave,resumeFightPct:resume,

          reason:'Observed HP drops plus reserve; review manually before applying',

          applied:false

        }:null,

        lastAt:p.lastAt};

    }

    const all=()=>Array.from(data.values()).map(summarize);

    return Object.freeze({observe,end,

      report(key){

        const p=key?data.get(String(key)):current?data.get(current.key):

          Array.from(data.values()).at(-1);

        return p?summarize(p):null;

      },

      profiles:all,

      recommendations(){return all().filter(p=>p.suggestion!==null).map(p=>({

        key:p.key,name:p.name,confidence:p.confidence,...p.suggestion

      }));},

      status(){return {version:'10.4.0',active:current?.key||null,

        profiles:data.size,accepted,ignored,gapsSkipped:errors,lastEnd};},

      reset(){data.clear();current=null;lastEnd=null;accepted=0;ignored=0;errors=0;}

    });

  }

  NS.combatAnalyticsEngine=Object.freeze({version:'10.4.0',defaults,createRecorder});

})();

/* V10.4 passive analytics API. Does NOT change HitRun HP config.
 * Samples arrive from its existing tick timer (throttled to >=1 second). */

 

(() => {

  'use strict';

  const W=window,NS=W.KVPV||(W.KVPV={});

  const engine=NS.combatAnalyticsEngine;

  if(!engine?.createRecorder){console.warn('[V10.4] Analytics engine missing');return;}

  const tracker=engine.createRecorder();

  const config={enabled:true,sampleMs:1100,autoApply:false};

  let errors=0,lastError=null;

  const safe=(fn)=>{try{return fn();}catch(e){errors++;lastError=String(e);return null;}};

  const api={version:'10.4.0',config,

    _observe(sample){if(!config.enabled)return false;return safe(()=>tracker.observe(sample))===true;},

    _end(event){return safe(()=>tracker.end(event));},

    start(){config.enabled=true;return this.status();},

    stop(){config.enabled=false;tracker.end({reason:'analytics manually stopped'});return this.status();},

    status(){return {...tracker.status(),enabled:config.enabled,errors,lastError,

      activeProfile:tracker.report()};},

    report(key){return tracker.report(key);},

    profiles(){return tracker.profiles();},

    recommendations(){return tracker.recommendations();},

    reset(){tracker.reset();errors=0;lastError=null;return this.status();},

    dashboard(){const s=this.report();

      if(!s){console.info('[V10.4] Chưa đủ dữ liệu: đánh Boss có HitRun trước.');return this.status();}

      console.table([{

        boss:s.name,combatSeconds:s.fightSeconds,retreatSeconds:s.retreatSeconds,

        fightShare:s.fightSharePct,HPdrops:s.maxObservedHpDropPts,

        healedPts:s.hpHealedRetreatPts,retreats:s.retreats,

        bossHpLossRate:s.bossHpLossPctPerFightSecond,

        cycle9022:s.estimated9022PeriodMs,

        confidence:s.confidence,leaveSuggestion:s.suggestion?.leavePct??null,

        resumeSuggestion:s.suggestion?.resumeFightPct??null

      }]);return s;}

  };

  // Keep facade immutable, but its small config stays editable (enabled only).

  NS.analytics=Object.freeze(api);

  NS.combatAnalytics=NS.analytics;

  console.info('[V10.4] Passive analytics ready; no additional game timer, no auto HP changes.');

})();

/* V10.6 pure recovery policy: telemetry only, never native game RPC. */

 

(() => {

  'use strict';

  const W=window,NS=W.KVPV||(W.KVPV={});

  function evaluate(s,settings={}){

    const issues=[],actions=[];

    const add=(code,severity,detail,action=null)=>{

      issues.push({code,severity,detail});if(action)actions.push(action);

    };

    if(!s||!Number.isFinite(Number(s.at)))return {issues:[{code:'no-data',severity:'warn',detail:'Snapshot unavailable'}],actions};

    if(s.actorValid===false){add('session-invalid','critical','Actor/session lost. Do not recover.');return {issues,actions};}

    if(s.autoEnabled===true&&s.combatAutoArmAllowed===true&&

       s.autoTimerActive===false&&s.hitrunRunning!==true &&

       !['stopped','session-unavailable','start-failed','already-attempted'].includes(s.autoMode)&&

       !s.autoAttemptedKey){

      add('autoarm-poll-lost','recoverable','HitRun poll timer missing; repair without rearming Boss.',

        {kind:'repair-autoarm-poll'});

    }

    if(s.stageReason&&/manual|paused|disabled/i.test(String(s.stageReason)))

      add('stage-paused','info','Thiên Quan blocked intentionally; never auto-start.');

    if(s.owner==='combat'&&s.hitrunRunning!==true)

      add('combat-lease','info','Scene lease may be temporary; core will expire naturally.');

    if(s.phase==='RETREAT'&&s.hitrunRunning===true && s.retreatTooLong===true)

      add('retreat-review','warn','HitRun retreat unusually long; do not force scene change.');

    if(s.autoMode==='already-attempted'||s.autoMode==='start-failed')

      add('boss-attempt-guard','info','Boss already attempted or failed; no automatic retry.');

    if(s.readErrors>0)add('telemetry-errors','warn','Telemetry read failures '+s.readErrors+'.');

    if(s.sceneJob&&s.sceneJob!=='rảnh'&&s.sceneJob!=='ranh'&&s.stuckJob===true)

      add('daily-review','warn','Daily job unchanged unusually long; never resend ACK-pending RPC.');

    return {issues,actions};

  }

  NS.recoveryPolicy=Object.freeze({version:'10.6.0',evaluate});

})();

/* V10.6 recovery controller: only repairs LOCAL auto-arm polling.
 * No network messages, no scene transitions, no replay of pending RPC.
 */

 

(() => {

  'use strict';

  const W=window,NS=W.KVPV||(W.KVPV={}),policy=NS.recoveryPolicy;

  if(!policy?.evaluate){console.warn('[RECOVERY] Policy missing');return;}

  const config={enabled:true,autoRepairPolling:true,cooldownMs:30000,

    maxRepairsPerWindow:2,windowMs:10*60000,maxHistory:60};

  const state={observations:0,repairs:0,failures:0,lastActionAt:0,

    attemptedAt:[],issues:[],history:[],lastError:'',lastOutcome:'idle'};

  const record=(event,info)=>{state.history.push({at:Date.now(),event,...info});

    if(state.history.length>config.maxHistory)state.history.shift();};

  function inspect(s){return policy.evaluate(s,config);}

  // Recovery retains the original repair budget and fresh native validation.

  // Executor V10.8 delegates to this function ONLY after confirmed policy checks.

  function repairPollOnce(s){

    const result=inspect(s);

    // V10.9 fail closed if orchestration is present but has not confirmed idle.

    if(NS.orchestrator){

      const permit=NS.orchestrator.checkAction?.('repair-autoarm-poll',s);

      if(permit?.ok!==true)return {ok:false,reason:'orchestrator:'+String(permit?.reason||'unavailable')};

    }

    const action=result.actions.find(x=>x.kind==='repair-autoarm-poll');

    if(!config.enabled||!config.autoRepairPolling||!action)

      return {ok:false,reason:'not-eligible'};

    const at=Date.now();state.attemptedAt=state.attemptedAt.filter(x=>at-x<config.windowMs);

    if(at-state.lastActionAt<config.cooldownMs||

       state.attemptedAt.length>=config.maxRepairsPerWindow){

      state.lastOutcome='cooldown';return {ok:false,reason:'cooldown'};

    }

    const auto=W.KVPV_HITRUN_AUTO;

    let st;

    try{st=auto?.status?.(false);}catch(e){state.lastError=String(e);

      return {ok:false,reason:'live-read-error'};}

    if(!st||st.timerActive!==false||st.enabled!==true||st.attemptedKey||

       st.hitrun?.running===true||NS.combat?.config?.autoArm===false)

      return {ok:false,reason:'live-autoarm-block'};

    state.attemptedAt.push(at);state.lastActionAt=at;

    try{

      if(auto.repairPolling?.()===true){state.repairs++;state.lastOutcome='poll-repaired';

        record('poll-repaired',{reason:'Local timer restored; Boss attempt unchanged'});

        return {ok:true,reason:'poll-repaired'};

      }

      state.failures++;state.lastOutcome='repair-refused';record('repair-refused',{});

      return {ok:false,reason:'repair-refused'};

    }catch(e){state.failures++;state.lastError=String(e);state.lastOutcome='repair-error';

      record('repair-error',{message:state.lastError});return {ok:false,reason:'repair-error'};}

  }

  function observe(s){

    state.observations++;

    const result=inspect(s);state.issues=result.issues;

    if(!config.enabled)return result;

    // When V10.8 executor exists and is enabled, there is ONE authorized writer.

    // If disabled/unavailable, V10.6 behavior remains as the compatibility fallback.

    if(NS.executor?.config?.enabled===true){

      if(result.actions.some(x=>x.kind==='repair-autoarm-poll'))

        state.lastOutcome='delegated-v108';

      return result;

    }

    if(result.actions.some(x=>x.kind==='repair-autoarm-poll')&&config.autoRepairPolling)

      repairPollOnce(s);

    return result;

  }

  

  function status(){return {version:'10.6.0',enabled:config.enabled,

    observations:state.observations,repairs:state.repairs,failures:state.failures,

    lastOutcome:state.lastOutcome,lastError:state.lastError,

    issues:state.issues.slice(),recent:state.history.slice(-8)};}

  NS.recovery=Object.freeze({version:'10.8.0',config,inspect,observe,repairPollOnce,status,

    start(){config.enabled=true;return status();},

    stop(){config.enabled=false;return status();},

    history:()=>state.history.slice(),

    preview(){const snapshot=NS.monitor?.status?.()?.snapshot;

      return snapshot?inspect(snapshot):{issues:[{code:'no-monitor',severity:'warn'}],actions:[]};}

  });

})();

/* KVPV V10.7 decision policy: deterministic, read-only, no game API/RPC.
 * Priority is advisory; actual scene admission is owned by Core and Daily.
 */

 

(() => {

  'use strict';

  const W=window, NS=W.KVPV||(W.KVPV={});

  const VERSION='10.7.0';

  const BUSY=new Set(['rảnh','ranh','idle','']);

  const isBusy=v=>typeof v==='string'&&!BUSY.has(v.trim());

  const validSnap=s=>s&&Number.isFinite(Number(s.at))&&Number(s.at)>0;

  const decision=(id,priority,reason,scope='observe')=>({id,priority,reason,scope,mutatesGame:false});

  function evaluate(snapshot,options={}){

    const s=snapshot, now=Number.isFinite(Number(options.nowMs))?Number(options.nowMs):Date.now();

    const maxAge=Math.max(1000,Number(options.maxSnapshotAgeMs)||15000);

    const notes=[],blocked=[];

    const make=(primary,candidates=[])=>({version:VERSION,at:now,

      primary,candidates:[primary,...candidates].sort((a,b)=>b.priority-a.priority),

      blocked,notes,redFirstPreserved:s?.redFirst===true,

      advisoryOnly:true,requiresApprovalForGameActions:true});

    if(!validSnap(s)){

      blocked.push('Missing telemetry snapshot; never make gameplay assumptions');

      return make(decision('no-data',100,'Waiting for a valid monitor snapshot'));

    }

    const age=now-Number(s.at);

    if(age< -1000 || age>maxAge){

      blocked.push('Snapshot is stale or clock moved; do not take any gameplay action');

      return make(decision('stale-data',100,'Telemetry age outside permitted window'));

    }

    if(s.actorValid===false){

      blocked.push('Actor/session mismatch');

      return make(decision('session-invalid',110,'Actor/session invalid; do not resume modules'));

    }

    const candidates=[];

    const add=(id,p,reason,scope)=>candidates.push(decision(id,p,reason,scope));

    const ownJob=isBusy(s.sceneJob);

    const hasSceneLease=!!s.owner;

    const inStage=s.stageInStage===true;

    const stageActive=s.stageNativeAuto===true;

    const fight=s.hitrunRunning===true;

    const reservation=s.reservation && typeof s.reservation==='object' ? s.reservation:null;

    const events=Array.isArray(s.activeEvents)?s.activeEvents.filter(k=>typeof k==='string'):[];

    const redFirst=s.redFirst===true;



    if(fight){

      add('continue-combat',105,'Hit & Run owns an active fight; do not preempt it','combat');

      if(reservation)notes.push('Event reservation will apply to NEW work, not this fight');

    }

    if(ownJob){

      add('continue-daily',104,'Auto Daily already owns task '+s.sceneJob,'daily');

      if(reservation)notes.push('Never force-exit an existing Daily task for an event');

    }

    if(inStage){

      add('continue-stage',103,'Character is inside native Thiên Quan; let game resolve it','stage');

    }

    if(hasSceneLease && !fight && !ownJob && !inStage){

      add('respect-scene-lease',99,'Scene Manager lease currently held by '+s.owner,'core');

    }

    // No new work competes with an already owned scene or running activity.

    const busy=fight||ownJob||inStage||hasSceneLease;

    if(busy){

      if(reservation)blocked.push('Scheduled '+String(reservation.key||'event')+' awaits free scene');

    }else{

      if(events.length>0){

        add('event-open',96,'Event window open ('+events.slice(0,3).join(', ')+'); existing scheduler decides eligibility','events');

      }

      if(reservation){

        add('event-reserved',94,'Hold new long jobs for '+String(reservation.key||'event'),'events');

        blocked.push('Do not initiate new stage/combat/dungeon before reservation ends');

      }

      // Red point completion is not inferred from a redFirst config flag alone.

      if(redFirst && s.verifiedRedPending===true){

        add('red-first',97,'Verified red rewards pending; existing RED FIRST queue retains priority','daily');

      }else if(redFirst){

        notes.push('RED FIRST remains owned by the existing scheduler; pending red points unknown');

      }

      if(!reservation && events.length===0){

        if(s.stageManualPause===true)blocked.push('Thiên Quan manually paused; do not auto-enable');

        else if(s.stageEnabled===true){

          if(s.stageReasonScene){

            blocked.push('Stage unavailable: '+String(s.stageReasonScene));

          }else if(s.stageMonstersRemaining===0){

            add('stage-native-ready',64,'Native stage eligible; only existing scheduler may initiate it','stage');

          }else if(Number.isFinite(s.stageMonstersRemaining)){

            add('stage-train',52,'Native stage still needs '+s.stageMonstersRemaining+' monsters','stage');

          }else{

            notes.push('Unknown stage monster progress; do not infer readiness');

          }

        }

        if(s.combatAutoArmAllowed===false||s.autoEnabled===false){

          blocked.push('Auto Hit & Run stopped by user/configuration');

        }else if(s.autoAttemptedKey){

          blocked.push('Boss attempted before; do not rearm same Boss without user approval');

        }else if(s.autoEnabled===true && s.combatAutoArmAllowed===true){

          if(s.autoTimerActive===false){

            add('poller-recovery',63,'Local auto-arm poll missing; V10.6 Recovery owns bounded repair','recovery');

          }else if(s.autoTimerActive===true){

            add('combat-wait-boss',35,'Waiting for native-selected Boss; existing auto-arm controls startup','combat');

          }

        }

      }

    }

    if(s.readErrors>0)notes.push('Telemetry read failures: '+s.readErrors+'; ranking may be incomplete');

    if(candidates.length===0)add('idle-observe',0,'Wait for new native state or a scheduled event','monitor');

    candidates.sort((a,b)=>b.priority-a.priority || a.id.localeCompare(b.id));

    const primary=candidates.shift();

    return make(primary,candidates);

  }

  NS.decisionPolicy=Object.freeze({version:VERSION,evaluate});

})();

/* KVPV V10.7 bounded decision memory. No timers, no native actions, no RPC. */

 

(() => {

  'use strict';

  const W=window,NS=W.KVPV||(W.KVPV={}),policy=NS.decisionPolicy;

  if(typeof policy?.evaluate!=='function'){

    console.warn('[DECISION V10.7] Policy missing; controller disabled');return;

  }

  const VERSION='10.7.0';

  const config={enabled:true,confirmSamples:2,maxHistory:80,maxSnapshotAgeMs:15000};

  const state={observations:0,confirmed:null,latest:null,history:[],

    pendingId:null,pendingCount:0,errors:0,lastError:'',lastAt:0};

  const safeCopy=x=>x?JSON.parse(JSON.stringify(x)):null;

  

  function preview(s){return policy.evaluate(s,{maxSnapshotAgeMs:config.maxSnapshotAgeMs});}

  function observe(s){

    if(!config.enabled)return state.latest;

    try{

      const decision=preview(s);

      state.observations++;state.lastAt=Date.now();state.latest=decision;

      const key=decision.primary.id;

      if(key!==state.pendingId){state.pendingId=key;state.pendingCount=1;}

      else state.pendingCount++;

      // Session/stale telemetry halt is immediate, never delayed by hysteresis.

      const immediate=['session-invalid','stale-data','no-data'].includes(key);

      const enough=state.pendingCount>=Math.max(1,Math.floor(Number(config.confirmSamples)||2));

      if(immediate||enough){

        if(state.confirmed?.primary?.id!==key){

          const entry={at:state.lastAt,id:key,reason:decision.primary.reason,

            scope:decision.primary.scope};

          state.history.push(entry);

          if(state.history.length>config.maxHistory)state.history.shift();

        }

        state.confirmed=decision;

      }

      return decision;

    }catch(e){state.errors++;state.lastError=String(e);return null;}

  }

  

  function status(){return {version:VERSION,enabled:config.enabled,

    observations:state.observations,confirmed:safeCopy(state.confirmed),

    latest:safeCopy(state.latest),pendingId:state.pendingId,

    pendingCount:state.pendingCount,changes:state.history.length,

    errors:state.errors,lastError:state.lastError,advisoryOnly:true};}

  function explain(){const s=status(),o=s.confirmed||s.latest;

    const out=o?{priority:o.primary,blocked:o.blocked,notes:o.notes,

      candidates:o.candidates,redFirstPreserved:o.redFirstPreserved}:

      {priority:null,blocked:['No monitor observations yet'],notes:[],candidates:[]};

    console.info('[KVPV DECISION V10.7]',out);return out;

  }

  NS.decision=Object.freeze({version:VERSION,config,observe,preview,status,explain,

    history:()=>state.history.map(x=>({...x})),

    start(){config.enabled=true;return status();},

    stop(){config.enabled=false;return status();}});

})();

/* V10.8 pure execution policy: ONLY a lost local auto-arm polling timer is executable.
 * No movement, RPC, stage toggles, ACK replay, rewards, or scene changes.
 */

 

(() => {

  'use strict';

  const W=window, NS=W.KVPV||(W.KVPV={});

  const VERSION='10.8.0';

  const blocked=(reason,decision=null)=>({version:VERSION,permitted:false,

    action:null,reason,decisionId:decision,gameplayMutation:false});

  function evaluate(s,confirmed,settings={},nowMs=Date.now()){

    const id=confirmed?.primary?.id||null;

    const maxAge=Math.max(1000,Number(settings.maxSnapshotAgeMs)||6000);

    if(!s||!Number.isFinite(Number(s.at))||Number(s.at)<=0)return blocked('snapshot-missing',id);

    if(nowMs-Number(s.at)>maxAge||nowMs-Number(s.at)<-1000)return blocked('snapshot-stale',id);

    if(s.actorValid!==true)return blocked('actor-invalid',id);

    if(!confirmed||!Number.isFinite(Number(confirmed.at)) ||

       nowMs-Number(confirmed.at)>maxAge)return blocked('decision-stale',id);

    if(id!=='poller-recovery')return blocked('decision-not-executable',id);

    if((s.readErrorsThisSample??s.readErrors??0)>0)return blocked('telemetry-errors',id);

    if(s.owner||s.hitrunRunning===true||s.stageInStage===true||s.stageNativeAuto===true)return blocked('scene-owned',id);

    if(s.sceneJob&& !['rảnh','ranh','idle'].includes(String(s.sceneJob)))return blocked('daily-job',id);

    if(s.reservation||Array.isArray(s.activeEvents)&&s.activeEvents.length>0)return blocked('event-priority',id);

    if(s.verifiedRedPending===true)return blocked('red-first',id);

    if(s.stageManualPause===true && s.stageInStage===true)return blocked('stage-locked',id);

    if(s.combatAutoArmAllowed!==true||s.autoEnabled!==true)return blocked('combat-disabled',id);

    if(s.autoAttemptedKey)return blocked('boss-attempted',id);

    if(s.autoTimerActive!==false||

       ['stopped','session-unavailable','start-failed','already-attempted'].includes(s.autoMode))

      return blocked('poll-not-repairable',id);

    return {version:VERSION,permitted:true,action:'repair-autoarm-poll',

      reason:'Confirmed lost LOCAL timer; delegate to bounded V10.6 Recovery',

      decisionId:id,gameplayMutation:false};

  }

  NS.executionPolicy=Object.freeze({version:VERSION,evaluate});

})();

/* V10.8 controlled executor. No timer, no native RPC, no scene mutation.
 * It delegates ONE local timer repair to Recovery AFTER stable policy confirmation.
 */

 

(() => {

  'use strict';

  const W=window,NS=W.KVPV||(W.KVPV={}),policy=NS.executionPolicy;

  if(typeof policy?.evaluate!=='function'){

    console.warn('[EXECUTOR V10.8] Missing policy');return;

  }

  const config={enabled:true,allowLocalPollRepair:true,requiredSamples:2,

    maxSnapshotAgeMs:6000,cooldownMs:35000,maxHistory:60};

  const state={observations:0,actions:0,successes:0,refusals:0,errors:0,

    lastReason:'not-observed',lastError:'',lastAt:0,lastActionAt:0,

    pendingKey:null,pendingCount:0,history:[]};

  const history=(event,reason)=>{

    state.history.push({at:Date.now(),event,reason});

    if(state.history.length>config.maxHistory)state.history.shift();

  };

  const freshDecision=()=>NS.decision?.status?.()?.confirmed||null;

  

  function preview(s,decision=freshDecision(),at=Date.now()){

    return policy.evaluate(s,decision,config,at);

  }

  function observe(s){

    if(!config.enabled){state.lastReason='disabled';return {executed:false,reason:'disabled'};}

    state.observations++;state.lastAt=Date.now();

    try{

      const plan=preview(s);

      state.lastReason=plan.reason;

      if(!plan.permitted){state.pendingKey=null;state.pendingCount=0;

        return {executed:false,reason:plan.reason};}

      if(!config.allowLocalPollRepair){state.lastReason='action-disabled';return {executed:false,reason:state.lastReason};}

      if(state.pendingKey!==plan.action){state.pendingKey=plan.action;state.pendingCount=1;}

      else state.pendingCount++;

      if(state.pendingCount<Math.max(2,Number(config.requiredSamples)||2)){

        state.lastReason='awaiting-confirmation';return {executed:false,reason:state.lastReason};

      }

      const at=Date.now();

      if(at-state.lastActionAt<config.cooldownMs){state.lastReason='executor-cooldown';

        return {executed:false,reason:state.lastReason};}

      // Revalidate current scene, user settings and current local timer immediately before action.

      if(W.__KVPV_UNIVERSAL_HALTED){state.lastReason='session-halted';return {executed:false,reason:state.lastReason};}

      if(W.__KVPV_OWN_ACTOR_ID){

        let current='';try{current=String(_Ba?._rJ?._O$?.ins?.actorId??'');}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

        if(current!==String(W.__KVPV_OWN_ACTOR_ID)){

          state.lastReason='actor-switched';return {executed:false,reason:state.lastReason};

        }

      }

      const arbiter=NS.core?.scene;

      if(typeof arbiter?.can!=='function'||arbiter.can('combat')!==true){

        state.lastReason='live-scene-block';return {executed:false,reason:state.lastReason};

      }

      const auto=W.KVPV_HITRUN_AUTO;

      const live=auto?.status?.(false);

      if(!live||live.enabled!==true||live.timerActive!==false||live.attemptedKey||

        live.hitrun?.running===true||NS.combat?.config?.autoArm===false){

        state.lastReason='live-autoarm-block';return {executed:false,reason:state.lastReason};

      }

      // V10.9 task-level handoff gate: fresh idle state must be confirmed.

      if(NS.orchestrator){

        if(typeof NS.orchestrator.checkAction!=='function'){

          state.lastReason='orchestrator-missing-gate';return {executed:false,reason:state.lastReason};

        }

        const permit=NS.orchestrator.checkAction(plan.action,s,at);

        if(permit?.ok!==true){

          state.lastReason='orchestrator:'+String(permit?.reason||'refused');

          return {executed:false,reason:state.lastReason};

        }

      }

      // Recovery owns BOTH the rate-limit and repairPolling(). Never bypass it.

      if(typeof NS.recovery?.repairPollOnce!=='function'){

        state.lastReason='recovery-unavailable';return {executed:false,reason:state.lastReason};

      }

      state.lastActionAt=at;state.actions++;

      const result=NS.recovery.repairPollOnce(s);

      if(result?.ok===true){

        state.successes++;state.lastReason='local-poller-repaired';

        history('local-poller-repaired',plan.reason);

      }else{

        state.refusals++;state.lastReason='recovery-refused:'+String(result?.reason||'unknown');

        history('repair-refused',state.lastReason);

      }

      state.pendingKey=null;state.pendingCount=0;

      return {executed:result?.ok===true,reason:state.lastReason};

    }catch(e){state.errors++;state.lastError=String(e);state.lastReason='exception';

      state.pendingKey=null;state.pendingCount=0;history('exception',state.lastError);

      return {executed:false,reason:'exception'};

    }

  }

  

  function status(){return {version:'10.9.0',enabled:config.enabled,

    observations:state.observations,actions:state.actions,successes:state.successes,

    refusals:state.refusals,errors:state.errors,lastError:state.lastError,

    lastReason:state.lastReason,pendingCount:state.pendingCount,

    lastActionAt:state.lastActionAt,historyLength:state.history.length,

    allowedActions:['repair-autoarm-poll'],gameRPC:false};}

  NS.executor=Object.freeze({version:'10.8.0',config,preview,observe,status,

    history:()=>state.history.map(x=>({...x})),

    start(){config.enabled=true;return status();},

    stop(){config.enabled=false;state.pendingKey=null;state.pendingCount=0;return status();}});

})();

/* V10.9 deterministic task arbitration. No game calls, no RPC, no timer.
 * ACK, completion and eligibility are UNKNOWN unless native evidence is present.
 */

 

(() => {

  'use strict';

  const NS=window.KVPV||(window.KVPV={});

  const IDLE=new Set(['','rảnh','ranh','idle']);

  const busy=x=>!IDLE.has(String(x??'').trim());

  const block=(reason,now)=>({version:'10.9.0',at:now,valid:false,phase:'hold',reason,

    owner:'unknown',active:false,mayRepairLocalPoll:false,ackConfirmed:false,

    mutateGameplay:false});

  function evaluate(s,settings={},time=Date.now()){

    const maxAge=Math.max(1000,Number(settings.maxSnapshotAgeMs)||7000);

    if(!s||!Number.isFinite(s.at)||s.at<=0)return block('no-snapshot',time);

    if(time-s.at>maxAge||time-s.at < -1000)return block('stale-snapshot',time);

    if(s.actorValid!==true)return block('actor-invalid',time);

    if((s.readErrorsThisSample??s.readErrors??0)>0)return block('native-read-error',time);

    const job=busy(s.sceneJob),fight=s.hitrunRunning===true,stage=s.stageInStage===true;

    const nativeAuto=s.stageNativeAuto===true,lease=!!s.owner;

    const events=Array.isArray(s.activeEvents)?s.activeEvents.filter(x=>typeof x==='string'):[];

    const reserved=!!s.reservation,red=s.verifiedRedPending===true;

    const base={version:'10.9.0',at:time,valid:true,ackConfirmed:false,mutateGameplay:false,

      nativeAck:'unknown',reserved,eventCount:events.length,redVerified:red,

      active:job||fight||stage||nativeAuto||lease,mayRepairLocalPoll:false};

    // Existing scene jobs NEVER get interrupted for a later event.

    if(fight)return {...base,phase:'active-combat',owner:'combat',reason:'HitRun active: retain scene'};

    if(job)return {...base,phase:'active-daily',owner:'daily',reason:'Daily '+String(s.sceneJob)+' / '+String(s.dailyJobStep||'?')+'; completion/ACK unverified'};

    if(stage||nativeAuto)return {...base,phase:'active-stage',owner:'stage',reason:'Native Thiên Quan controls stage; preserve user pause choice'};

    if(lease)return {...base,phase:'scene-lease',owner:String(s.owner),reason:'Another module holds scene lease'};

    if(red)return {...base,phase:'red-first-pending',owner:'daily',reason:'Verified red reward: existing scheduler owns claim'};

    if(events.length)return {...base,phase:'event-window',owner:'events',reason:'Live event window: existing scheduler decides entry'};

    if(reserved)return {...base,phase:'event-reservation',owner:'events',reason:'Upcoming reserved event: no NEW long jobs'};

    // The only locally executable action is recovering a lost polling interval.

    const timerLost=s.autoEnabled===true&&s.combatAutoArmAllowed===true&&s.autoTimerActive===false;

    const notAttempted=!s.autoAttemptedKey;

    const notStopped=!['stopped','session-unavailable','start-failed','already-attempted'].includes(s.autoMode);

    const allow=timerLost&&notAttempted&&notStopped;

    return {...base,phase:allow?'idle-local-repair':'idle',owner:null,

      reason:allow?'Idle, unattempted Boss poll missing; LOCAL timer repair eligible':'Idle; no new orchestration action',

      mayRepairLocalPoll:allow};

  }

  NS.taskPolicy=Object.freeze({version:'10.9.0',evaluate});

})();

/* V10.9 coordinator: observe existing monitor ticks; no independent timer/RPC.
 * It NEVER declares a server ACK by watching a stationary job.
 */

 

(() => {

  'use strict';

  const W=window,NS=W.KVPV||(W.KVPV={}),policy=NS.taskPolicy;

  if(typeof policy?.evaluate!=='function'){console.warn('[TASK V10.9] Policy unavailable');return;}

  const config={enabled:true,requiredStableSamples:2,maxSnapshotAgeMs:7000,

    stuckJobMs:180000,stuckRetreatMs:90000,maxHistory:70};

  const state={observations:0,stableSamples:0,current:null,signature:'',since:0,

    progressSince:0,progressKey:'',lastAt:0,lastError:'',errors:0,

    suspectedStalls:0,blockedRepairs:0,history:[]};

  const log=(event,reason,at)=>{state.history.push({at,event,reason});

    if(state.history.length>Math.max(5,Number(config.maxHistory)||70))state.history.shift();};

  const clean=x=>String(x??'').slice(0,100);

  const progressKey=s=>[s.sceneJob,s.dailyJobStep,s.owner,s.phase,

    s.stageInStage,s.stageMonstersRemaining,s.hitrunRunning,s.retreats,

    s.workflowProgressSeq].map(clean).join('|');

  

  function preview(s,at=Date.now()){return policy.evaluate(s,config,at);}

  function observe(s){

    const at=Date.now();

    try{

      const plan=preview(s,at);

      state.observations++;state.lastAt=at;

      const sig=plan.phase+'|'+plan.owner;

      if(sig===state.signature)state.stableSamples++;

      else {state.signature=sig;state.stableSamples=1;state.since=at;

        log('transition',sig+' / '+plan.reason,at);}

      const pr=progressKey(s||{});

      if(pr!==state.progressKey){state.progressKey=pr;state.progressSince=at;}

      let stall=null;

      if(plan.valid&&plan.phase==='active-daily'&&at-state.progressSince>=config.stuckJobMs){

        stall={type:'daily-no-observed-progress',ms:at-state.progressSince,

          note:'No progress in exposed telemetry; server ACK still unknown'};

      }else if(plan.valid&&plan.phase==='active-combat'&&s?.phase==='RETREAT'&&

        at-state.progressSince>=config.stuckRetreatMs){

        stall={type:'combat-retreat-slow',ms:at-state.progressSince,

          note:'Review pathing and HP; no automatic scene reset'};

      }

      if(stall&&state.current?.stall?.type!==stall.type){state.suspectedStalls++;

        log('watchdog',stall.type,at);}

      state.current={...plan,stableSamples:state.stableSamples,

        observedAt:at,snapshotAt:s?.at??null,progressSince:state.progressSince,stall};

      return state.current;

    }catch(e){state.errors++;state.lastError=String(e);state.current=null;

      state.stableSamples=0;return null;}

  }

  function checkAction(action,s,at=Date.now()){

    if(!config.enabled){state.blockedRepairs++;return {ok:false,reason:'orchestrator-paused'};}

    const fresh=preview(s,at),stored=state.current;

    if(!fresh.valid){state.blockedRepairs++;return {ok:false,reason:fresh.reason};}

    if(action!=='repair-autoarm-poll'){state.blockedRepairs++;return {ok:false,reason:'unrecognized-action'};}

    if(!stored||stored.snapshotAt!==s.at||

      stored.phase!=='idle-local-repair'||fresh.phase!=='idle-local-repair'){

      state.blockedRepairs++;return {ok:false,reason:'transition-unconfirmed'};

    }

    if(state.stableSamples<Math.max(2,Number(config.requiredStableSamples)||2)){

      state.blockedRepairs++;return {ok:false,reason:'awaiting-stable-idle'};

    }

    if(!fresh.mayRepairLocalPoll||stored.stall){state.blockedRepairs++;

      return {ok:false,reason:'local-repair-not-eligible'};}

    return {ok:true,reason:'stable-idle-local-repair',gameRPC:false};

  }

  

  function status(){return {version:'10.9.0',enabled:config.enabled,

    observations:state.observations,stableSamples:state.stableSamples,

    phase:state.current?.phase??null,owner:state.current?.owner??null,

    reason:state.current?.reason??null,stall:state.current?.stall??null,

    ackConfirmed:false,blockedRepairs:state.blockedRepairs,

    suspectedStalls:state.suspectedStalls,errors:state.errors,

    lastError:state.lastError,historyLength:state.history.length,

    allowedActions:['repair-autoarm-poll'],gameRPC:false};}

  NS.orchestrator=Object.freeze({version:'10.9.0',config,preview,observe,checkAction,status,

    history:()=>state.history.map(x=>({...x})),

    start(){config.enabled=true;return status();},

    stop(){config.enabled=false;return status();}});

})();

/* V11.0 read-only workflow evidence policy. No game calls, RPC or timers.
 * An observed model change is NEVER a confirmed RPC ACK or personal DPS.
 */

 

(() => {

  'use strict';

  const NS=window.KVPV||(window.KVPV={});

  const idle=new Set(['','rảnh','ranh','idle']);

  const num=x=>typeof x==='number'&&Number.isFinite(x)?x:null;

  const clean=x=>String(x??'').slice(0,90);

  const active=x=>!idle.has(clean(x).trim());

  const diff=(a,b)=>a!==null&&b!==null?a-b:null;

  function identity(s){

    if(s?.hitrunRunning===true)return {kind:'combat',key:'combat:'+clean(s.bossId||'unknown')};

    if(active(s?.sceneJob))return {kind:'daily',key:'daily:'+clean(s.sceneJob)};

    if(s?.stageInStage===true||s?.stageNativeAuto===true)return {kind:'stage',key:'stage:native'};

    return {kind:'idle',key:'idle'};

  }

  function validate(s,now=Date.now(),opts={}){

    const ttl=Math.max(1000,Number(opts.maxSampleAgeMs)||7000);

    if(!s||typeof s!=='object'||!Number.isFinite(s.at)||s.at<=0)return 'no-sample';

    if(now-s.at>ttl||s.at-now>1000)return 'stale-sample';

    if(s.actorValid!==true)return 'invalid-actor';

    if((s.readErrorsThisSample??0)>0)return 'native-read-error';

    return null;

  }

  function evaluate(previous,current,opts={},now=Date.now()){

    const problem=validate(current,now,opts);

    if(problem)return {state:'UNVERIFIED',kind:'unknown',key:'unverified',valid:false,

      reason:problem,evidence:[],ack:'unknown',completion:'unknown',mayAct:false};

    const {kind,key}=identity(current);

    const evidence=[];

    const same=previous&&validate(previous,now,{maxSampleAgeMs:Math.max(7000,Number(opts.maxSampleGapMs)||12000)})===null&&

      identity(previous).key===key&&current.at>previous.at&&

      current.at-previous.at<=Math.max(2500,Number(opts.maxSampleGapMs)||12000)&&

      (!previous.actorKey||!current.actorKey||previous.actorKey===current.actorKey);

    if(same){

      if(kind==='daily'){

        if(clean(current.dailyJobStep)!==clean(previous.dailyJobStep))

          evidence.push({kind:'client-step-changed',from:clean(previous.dailyJobStep),to:clean(current.dailyJobStep),strength:'weak'});

        if(/honghoang|honghoang|hồng hoang/i.test(clean(current.sceneJob))){

          const a=num(current.hongHoangCount),b=num(previous.hongHoangCount),d=diff(a,b);

          if(d>0)evidence.push({kind:'server-counter-advanced',field:'hongHoangCount',delta:d,strength:'strong'});

          else if(d<0)evidence.push({kind:'counter-reset',field:'hongHoangCount',strength:'weak'});

        }

      }

      if(kind==='stage'){

        const level=diff(num(current.stageLevel),num(previous.stageLevel));

        if(level>0)evidence.push({kind:'stage-level-advanced',delta:level,strength:'strong'});

        const kills=diff(num(current.stageMonstersKilled),num(previous.stageMonstersKilled));

        if(kills>0)evidence.push({kind:'stage-monsters-advanced',delta:kills,strength:'strong'});

        const remain=diff(num(previous.stageMonstersRemaining),num(current.stageMonstersRemaining));

        if(remain>0&&!(kills>0))evidence.push({kind:'stage-remaining-decreased',delta:remain,strength:'strong'});

      }

      if(kind==='combat'&&current.phase==='RETREAT'){

        const rise=diff(num(current.hpPct),num(previous.hpPct));

        if(rise>0.5)evidence.push({kind:'hp-recovered',delta:+rise.toFixed(2),strength:'strong'});

        const retreats=diff(num(current.retreats),num(previous.retreats));

        if(retreats>0)evidence.push({kind:'retreat-finished',delta:retreats,strength:'strong'});

      }

      if(kind==='combat'&&clean(current.phase)!==clean(previous.phase))

        evidence.push({kind:'combat-phase-changed',from:clean(previous.phase),to:clean(current.phase),strength:'weak'});

    }

    const isWaiting=kind==='daily'&&/enter|exit|claim|gather|wait|ack|pending|nhận|thu thập/i.test(clean(current.dailyJobStep));

    const state=kind==='idle'?'IDLE':isWaiting?'WAITING_UNVERIFIED':'RUNNING';

    return {state,kind,key,valid:true,reason:isWaiting?'Job may be waiting for native response; no ACK evidence':

      kind==='idle'?'No active workflow':'Observed active workflow',evidence,

      ack:'unknown',completion:'unknown',mayAct:false};

  }

  NS.workflowPolicy=Object.freeze({version:'11.0.0',identity,validate,evaluate});

})();

/* V11.0 workflow tracker: state transitions + native-observed progress only.
 * Reuses Monitor's 2.5s sampler; no new game calls, timers or native hooks.
 */

 

(() => {

  'use strict';

  const W=window,NS=W.KVPV||(W.KVPV={}),policy=NS.workflowPolicy;

  if(!policy?.evaluate){console.warn('[KVPV V11] Workflow policy unavailable');return;}

  const config={enabled:true,maxSampleAgeMs:7000,maxSampleGapMs:12000,

    dailyWarnMs:180000,stageWarnMs:180000,retreatWarnMs:90000,

    pendingReviewMs:45000,maxHistory:75};

  let prev=null,current=null,seq=0,progressAt=0,since=0,lastEvent='',errors=0,lastError='';

  let history=[],observations=0;

  const limit=()=>Math.max(5,Math.min(250,Number(config.maxHistory)||75));

  function record(type,at,detail){history.push({type,at,detail});if(history.length>limit())history.shift();}

  

  function preview(s,previous=prev,now=Date.now()){

    return policy.evaluate(previous,s,config,now);

  }

  function observe(s){

    if(!config.enabled)return current;

    const at=Date.now();

    try{

      const result=preview(s,prev,at);observations++;

      if(!result.valid){

        // Never bridge a broken native frame to future samples as "progress".

        prev=null;progressAt=0;since=0;

        current={...result,seq,observedAt:at,stalled:false,elapsedWithoutEvidenceMs:null};

        if(lastEvent!=='invalid:'+result.reason){record('invalid',at,result.reason);lastEvent='invalid:'+result.reason;}

        return current;

      }

      if(prev&&s.at<=prev.at){return current;} // ignore duplicated/out-of-order frames

      // A throttled/hidden tab creates an observation gap, not evidence of

      // stalled server work. Restart timing without treating it as an ACK.

      const interrupted=prev&&s.at-prev.at>Math.max(2500,Number(config.maxSampleGapMs)||12000);

      if(interrupted){since=at;progressAt=at;

        record('observation-gap',at,'No inference across delayed timer samples');}

      if(!current||!current.valid||result.key!==current.key){

        since=at;progressAt=at;

        record('workflow-transition',at,result.key);lastEvent='workflow:'+result.key;

      }

      const strong=result.evidence.filter(e=>e.strength==='strong');

      const weak=result.evidence.filter(e=>e.strength==='weak');

      if(strong.length){seq++;progressAt=at;

        record('observed-progress',at,strong.map(e=>e.kind).join(','));lastEvent='progress:'+result.key;}

      else if(weak.length){ // a step change is evidence of activity, but not ACK

        progressAt=at;record('client-transition',at,weak.map(e=>e.kind).join(','));

      }

      const windowMs=result.kind==='combat'&&s.phase==='RETREAT'?config.retreatWarnMs:

        result.kind==='stage'?config.stageWarnMs:config.dailyWarnMs;

      const elapsed=Math.max(0,at-(progressAt||at));

      const stuck=result.kind!=='idle'&&elapsed>=Math.max(10000,Number(windowMs)||180000);

      if(stuck&&lastEvent!=='suspect:'+result.key){record('suspected-stall',at,result.key);

        lastEvent='suspect:'+result.key;}

      else if(!stuck&&lastEvent==='suspect:'+result.key)lastEvent='recovered:'+result.key;

      const signals=Array.isArray(s.nativeSignals)?s.nativeSignals.slice(0,20):[];

      // These are native NOTIFICATIONS, never correlated per-request ACKs.

      const pendingReview=result.state==='WAITING_UNVERIFIED'&&

        elapsed>=Math.max(10000,Number(config.pendingReviewMs)||45000)&&!strong.length;

      current={...result,state:stuck?'SUSPECTED_STALL':result.state,

        nativeSignals:signals,requestAckVerified:false,pendingReview,

        stalled:stuck,seq,progressAt,since,observedAt:at,

        elapsedWithoutEvidenceMs:elapsed,

        note:stuck?'No new progress in accessible indicators. Server ACK unknown.':result.reason};

      prev={...s};

      return current;

    }catch(e){errors++;lastError=String(e);prev=null;

      current={state:'UNVERIFIED',valid:false,reason:'internal-error',ack:'unknown',mayAct:false};

      return current;}

  }

  

  function status(){return {version:'11.0.0',enabled:config.enabled,observations,

    current:current?{...current,evidence:(current.evidence||[]).map(x=>({...x}))}:null,

    seq,progressAt,errors,lastError,historyLength:history.length,

    gameRPC:false,autoSceneChange:false,

    ackSource:'native-notifications-unattributed',mayAct:false};}

  const explain=()=>({current:status().current,

    caveat:'Counter/HP/stage changes are observational evidence, NOT a confirmed ACK or personal DPS.',

    next:'Notifications 5447/5038 are not per-request ACKs. If pendingReview: inspect client/server log; never resend blindly.'});

  NS.workflow=Object.freeze({version:'11.0.0',config,observe,preview,status,explain,

    current:()=>current?{...current,evidence:(current.evidence||[]).map(x=>({...x}))}:null,

    history:()=>history.map(x=>({...x})),start(){config.enabled=true;return status();},

    stop(){config.enabled=false;return status();}});

})();

/* V11.1 native-evidence policy. Passive signals are NOT correlated RPC ACKs.
 * Id 5447: Hong Hoang counter model changed; 5038: generic gathering success.
 * Both are client notifications, NOT unique request IDs or reward entitlement.
 */

 

(() => {

  'use strict';

  const NS=window.KVPV||(window.KVPV={});

  const allowed=Object.freeze({5447:'honghoang-counter-refresh',5038:'generic-gather-success'});

  const finite=x=>typeof x==='number'&&Number.isFinite(x);

  const clean=x=>String(x??'').slice(0,128);

  function validate(signal,snapshot,now=Date.now(),maxAgeMs=12000){

    if(!signal||!snapshot||snapshot.actorValid!==true||

      !finite(snapshot.at)||!finite(signal.at)||!finite(signal.seq))return 'invalid';

    if(!allowed[signal.id])return 'unknown-signal';

    if(!snapshot.actorKey||clean(snapshot.actorKey)!==clean(signal.actorKey))return 'actor-mismatch';

    if(signal.at>snapshot.at||signal.at>now+1000||snapshot.at-now>1000)return 'out-of-order';

    if(snapshot.at-signal.at>maxAgeMs||now-snapshot.at>7000)return 'stale';

    if(snapshot.readErrorsThisSample>0)return 'unreliable-snapshot';

    return null;

  }

  function classify(signal,snapshot,now=Date.now(),maxAgeMs=12000){

    const error=validate(signal,snapshot,now,maxAgeMs);

    if(error)return {accepted:false,reason:error,ack:'unknown'};

    const job=clean(snapshot.sceneJob).toLowerCase();

    const isHong=/honghoang|hồng hoang|hong hoang/.test(job);

    const related=signal.id===5447&&isHong&&/honghoang|hồng hoang|hong hoang/.test(clean(signal.job).toLowerCase());

    return {accepted:true,reason:related?'honghoang-model-notification':'unattributed-native-notification',

      id:signal.id,kind:allowed[signal.id],relatedToWorkflow:related,

      source:'game-client-notify',ack:'unknown',completion:'unknown'};

  }

  NS.nativeEvidencePolicy=Object.freeze({version:'11.1.0',classify,validate,allowed});

})();

/* V11.1 passive native notification monitor. No RPC, retry, scene switch,
 * monkeypatch or independent timer. Uses _Sa.notify.on/off, same as EVENTS25.
 */

 

(() => {

  'use strict';

  const W=window,NS=W.KVPV||(W.KVPV={}),policy=NS.nativeEvidencePolicy;

  if(!policy?.classify){console.warn('[NATIVE V11.1] Policy missing');return;}

  const config={enabled:true,maxHistory:70,maxSignalAgeMs:12000};

  const state={installed:false,seq:0,delivered:0,events:[],reads:0,invalid:0,

    installs:0,uninstalls:0,lastError:'',lastReason:'not-started'};

  const owner={};let emitter=null;

  const expected=()=>String(W.__KVPV_OWN_ACTOR_ID??'');

  function nativeActor(){

    try{return typeof _Ba==='undefined'?'':String(_Ba?._rJ?._O$?.ins?.actorId??'');}

    catch(_){return '';}

  }

  function nativeJob(){

    try{return String(W.KVPV_DAILY?.quickState?.()?.job??'').slice(0,90);}

    catch(_){return '';}

  }

  function capture(id){

    if(!config.enabled||W.__KVPV_UNIVERSAL_HALTED)return;

    try{

      const actorKey=nativeActor();

      if(!actorKey||!expected()||actorKey!==expected()){

        state.invalid++;return;

      }

      state.seq++;

      state.events.push({seq:state.seq,at:Date.now(),id,actorKey,job:nativeJob()});

      if(state.events.length>Math.max(5,Math.min(250,Number(config.maxHistory)||70)))state.events.shift();

    }catch(e){state.reads++;state.lastError=String(e);}

  }

  function onCounter(){capture(5447);}

  function onGatherSuccess(){capture(5038);}

  

  function start(){

    config.enabled=true;

    if(state.installed)return status();

    if(W.__KVPV_UNIVERSAL_HALTED||!expected()||nativeActor()!==expected()){

      state.lastReason='invalid-actor';return status();

    }

    const candidate=typeof _Sa==='undefined'?null:_Sa?.notify;

    if(typeof candidate?.on!=='function'||typeof candidate?.off!=='function'){

      state.lastReason='native-notifier-unavailable';return status();

    }

    try{

      candidate.on(5447,owner,onCounter);

      try{candidate.on(5038,owner,onGatherSuccess);}

      catch(e){candidate.off(5447,owner,onCounter);throw e;}

      emitter=candidate;state.installed=true;state.installs++;state.lastReason='subscribed';

    }catch(e){state.lastReason='subscription-failed';state.lastError=String(e);}

    return status();

  }

  

  function stop(){

    config.enabled=false;

    if(state.installed){

      try{emitter.off(5447,owner,onCounter);emitter.off(5038,owner,onGatherSuccess);}

      catch(e){state.lastError=String(e);}

      state.installed=false;emitter=null;state.uninstalls++;

    }

    state.lastReason='stopped';return status();

  }

  function observe(snapshot){

    if(!config.enabled||!state.installed||!snapshot)return [];

    // Delivery cursor advances even when discarded to avoid replay in later jobs.

    const incoming=state.events.filter(e=>e.seq>state.delivered);

    if(incoming.length)state.delivered=incoming[incoming.length-1].seq;

    const at=Date.now();

    return incoming.map(e=>policy.classify(e,snapshot,at,config.maxSignalAgeMs))

      .filter(x=>x.accepted).map(x=>({id:x.id,kind:x.kind,reason:x.reason,

        relatedToWorkflow:x.relatedToWorkflow,ack:'unknown',source:x.source}));

  }

  

  function status(){return {version:'11.1.0',installed:state.installed,enabled:config.enabled,

    seq:state.seq,events:state.events.length,installs:state.installs,

    uninstalls:state.uninstalls,invalid:state.invalid,errors:state.reads,

    lastReason:state.lastReason,lastError:state.lastError,readOnly:true,ackCorrelation:false};}

  NS.nativeEvidence=Object.freeze({version:'11.1.0',config,start,stop,observe,status,

    history:()=>state.events.map(x=>({...x}))});

})();

/* V11.2 action verification policy — pure observation, never server ACK.
 * Tracks consequences of already-invoked native UI/scene methods ONLY.
 * Neither counter movement nor generic notify 5038/5447 proves the call was ACKed.
 */

 

(() => {

  'use strict';

  const NS=window.KVPV||(window.KVPV={});

  const types=Object.freeze({

    'hong-enter':{timeoutMs:45000},

    'hong-exit':{timeoutMs:45000},

    'hong-target':{timeoutMs:18000}

  });

  const isNumber=n=>typeof n==='number'&&Number.isFinite(n);

  const text=v=>String(v??'').slice(0,100);

  function validateCall(call){

    if(!call||!types[call.kind])return 'unsupported-action';

    if(call.actorKey!==call.expectedActor || !call.actorKey)return 'actor-mismatch';

    if(!isNumber(call.at)||call.at<=0)return 'invalid-clock';

    if(call.kind==='hong-enter'&&(!Number.isInteger(call.targetMap)||call.targetMap<=0))return 'invalid-target-map';

    if(call.kind==='hong-target'&&!isNumber(call.baseline))return 'missing-count-baseline';

    return null;

  }

  function evaluate(action,snapshot,now=Date.now(),config={}){

    if(!action||!snapshot||!isNumber(snapshot.at))

      return {next:'WAITING_UNVERIFIED',reason:'no-sample',effect:false};

    if(snapshot.actorValid!==true||!text(snapshot.actorKey)||snapshot.actorKey!==action.actorKey)

      return {next:'SESSION_INVALID',reason:'actor-changed',effect:false};

    if(snapshot.readErrorsThisSample>0||now-snapshot.at>7000||snapshot.at-now>1000)

      return {next:'WAITING_UNVERIFIED',reason:'unreliable-snapshot',effect:false};

    if(snapshot.at<action.at||now<action.at)

      return {next:'WAITING_UNVERIFIED',reason:'sample-before-call',effect:false};

    const gap=action.lastObservedAt ? snapshot.at-action.lastObservedAt:0;

    if(gap>Math.max(3000,Number(config.maxSampleGapMs)||12000))

      return {next:'WAITING_UNVERIFIED',reason:'observation-gap',effect:false,resetClock:true};

    if(action.kind==='hong-enter'&&snapshot.sceneType===17&&

        snapshot.mapId===action.targetMap)

      return {next:'EFFECT_OBSERVED',reason:'entered-matching-map-observed',effect:true};

    if(action.kind==='hong-exit'&&snapshot.commonScene===true&&snapshot.sceneType!==17)

      return {next:'EFFECT_OBSERVED',reason:'common-scene-observed',effect:true};

    if(action.kind==='hong-target'&&snapshot.sceneType===17&&

        /honghoang|hồng hoang|hong hoang/i.test(text(snapshot.sceneJob))&&

        isNumber(snapshot.hongHoangCount)&&snapshot.hongHoangCount>action.baseline)

      return {next:'EFFECT_OBSERVED',reason:'honghoang-counter-increased',effect:true};

    const effectiveStart=isNumber(action.waitStartedAt)?action.waitStartedAt:action.at;

    const timeout=types[action.kind].timeoutMs;

    if(now-effectiveStart>Math.max(1000,Math.min(120000,timeout)))

      return {next:'TIMED_OUT_UNKNOWN',reason:'no-effect-within-window',effect:false};

    return {next:'WAITING_UNVERIFIED',reason:'awaiting-observed-effect',effect:false};

  }

  NS.actionVerificationPolicy=Object.freeze({version:'11.2.0',types,validateCall,evaluate});

})();

/* V11.2 action verification: bounded client-call journal and effect observations.
 * Caller invokes recordCall AFTER the existing native method returned. This
 * observes a LOCAL METHOD CALL — it does not prove an RPC was sent or ACKed.
 * No WebSocket hooks, no game action, no timer, no retries.
 */

 

(() => {

  'use strict';

  const W=window,NS=W.KVPV||(W.KVPV={}),policy=NS.actionVerificationPolicy;

  if(!policy?.evaluate){console.warn('[KVPV ACTIONS] Policy unavailable');return;}

  const config={enabled:true,maxHistory:70,maxActive:12,maxSampleGapMs:12000};

  const terminal=new Set(['EFFECT_OBSERVED','TIMED_OUT_UNKNOWN','SESSION_INVALID','CANCELLED']);

  let seq=0,active=[],history=[],seen=0,invalid=0,errors=0,lastError='',lastReason='';

  const actor=()=>{try{return typeof _Ba==='undefined'?'':String(_Ba?._rJ?._O$?.ins?.actorId??'');}

    catch(_){return '';} };

  const owner=()=>String(W.__KVPV_OWN_ACTOR_ID??'');

  const limit=()=>Math.max(10,Math.min(200,Number(config.maxHistory)||70));

  function keep(entry){history.push({...entry});while(history.length>limit())history.shift();}

  function safeCopy(a){if(!a)return null;const {kind,id,status,reason,at,actorKey,targetMap,

    baseline,observedAt,updatedAt,source,ack,requestId,repeatCount}=a;

    return {kind,id,status,reason,at,actorKey,targetMap,baseline,observedAt,

      updatedAt,source,ack,requestId,repeatCount};}

  function close(a,status,reason,at){

    a.status=status;a.reason=reason;a.updatedAt=at;

    keep(safeCopy(a));active=active.filter(x=>x!==a);

  }

  function recordCall(input){

    if(!config.enabled||W.__KVPV_UNIVERSAL_HALTED)return null;

    try{

      const at=Date.now();const kind=String(input?.kind??'');

      const a={kind,at,actorKey:actor(),expectedActor:owner(),

        source:'existing-native-method-returned',ack:'unknown',requestId:null,

        targetMap:Number(input?.targetMap)||null,

        baseline:input?.baseline,repeatCount:0,updatedAt:at,

        status:'WAITING_UNVERIFIED',reason:'native-method-returned-not-ack',

        lastObservedAt:0,waitStartedAt:at};

      const error=policy.validateCall(a);

      if(error){invalid++;lastReason=error;return null;}

      // Repeated native calls are recorded as repetitions, NOT a retry instruction.

      const prior=active.find(x=>x.kind===kind&&x.actorKey===a.actorKey&&

        x.targetMap===a.targetMap);

      if(prior){prior.repeatCount++;prior.updatedAt=at;lastReason='duplicate-observed';

        return safeCopy(prior);}

      if(active.length>=Math.max(1,Math.min(30,Number(config.maxActive)||12)))

        close(active[0],'CANCELLED','active-capacity',at);

      a.id=++seq;active.push(a);seen++;lastReason='recorded';return safeCopy(a);

    }catch(e){errors++;lastError=String(e);lastReason='record-error';return null;}

  }

  function observe(snapshot){

    if(!config.enabled||!snapshot)return status();

    try{

      const now=Date.now();

      for(const a of [...active]){

        const verdict=policy.evaluate(a,snapshot,now,config);

        if(verdict.next==='SESSION_INVALID'){

          close(a,'SESSION_INVALID',verdict.reason,now);continue;

        }

        if(verdict.resetClock){

          a.waitStartedAt=now;a.lastObservedAt=snapshot.at;a.reason=verdict.reason;

          continue;

        }

        if(verdict.reason!=='unreliable-snapshot'&&verdict.reason!=='no-sample'&&

          verdict.reason!=='sample-before-call')a.lastObservedAt=snapshot.at;

        if(terminal.has(verdict.next)){

          if(verdict.effect)a.observedAt=now;

          close(a,verdict.next,verdict.reason,now);

        }else{a.reason=verdict.reason;a.updatedAt=now;}

      }

    }catch(e){errors++;lastError=String(e);}

    return status();

  }

  

  function stop(){config.enabled=false;const at=Date.now();

    for(const a of [...active])close(a,'CANCELLED','observer-stopped',at);

    return status();}

  

  function status(){return {version:'11.2.0',enabled:config.enabled,seen,invalid,errors,

    lastError,lastReason,activeCount:active.length,historyLength:history.length,

    active:active.map(safeCopy),noGameCommands:true,

    ackCorrelation:false,canRetry:false};}

  function explain(){return {status:status(),

    caveat:'Native method returned is NOT server ACK. Observed scene/count effects are NOT request-correlated ACK.',

    next:'Unknown timeout is diagnostic only; never resend automatically.'};}

  NS.actions=Object.freeze({version:'11.2.0',config,recordCall,observe,status,explain,

    current:()=>active.map(safeCopy),history:()=>history.map(x=>({...x})),

    start(){config.enabled=true;return status();},stop});

})();

/* V11.3 verified-response evidence policy: pure classification, no network hooks.
 * Client's ReqEnterSceneReply failure log is a server rejection report but does
 * NOT include an RPC request ID; never correlate it to a particular request.
 */

 

(() => {

  'use strict';

  const NS=window.KVPV||(window.KVPV={});

  const finite=x=>typeof x==='number'&&Number.isFinite(x);

  const integer=x=>finite(x)&&Number.isSafeInteger(x);

  function parseSceneReply(args,now=Date.now()){

    if(!Array.isArray(args)||args.length<5)return null;

    if(typeof args[0]!=='string'||!args[0].includes('ReqEnterSceneReply'))return null;

    const [message,currentMap,errorCode,serverMap,logAt]=args;

    if(!integer(currentMap)||currentMap<0||!integer(errorCode)||errorCode<=0||

       !integer(serverMap)||serverMap<0||!finite(logAt)||

       logAt<=0||!finite(now)||Math.abs(now-logAt)>5000)return null;

    return {kind:'SCENE_ENTER_REJECTION',at:now,logAt,currentMap,errorCode,serverMap,

      source:'native-client-error-log',correlated:false,requestId:null,

      verdict:'REJECTION_REPORTED_UNCORRELATED',

      reason:'ReqEnterSceneReply contains server error but no per-request ID'};

  }

  function stageChange(prev,next,maxGapMs=12000){

    if(!next||next.actorValid!==true||!next.actorKey||!finite(next.at)||

       next.readErrorsThisSample>0)return null;

    if(!prev||prev.actorValid!==true||prev.actorKey!==next.actorKey||

       !finite(prev.at)||prev.readErrorsThisSample>0)return null;

    const deltaTime=next.at-prev.at;

    if(deltaTime<=0||deltaTime>Math.max(2000,Math.min(30000,Number(maxGapMs)||12000)))return null;

    const old=prev.stageLevel,now=next.stageLevel;

    if(!integer(old)||!integer(now)||old<1||now<=old||now-old>3)return null;

    return {kind:'STAGE_LEVEL_ADVANCED',at:next.at,fromLevel:old,toLevel:now,

      actorKey:next.actorKey,source:'native-stage-model',

      correlated:false,requestId:null,verdict:'PROGRESS_OBSERVED',

      reason:'Stage level increased in observed model; not request ACK'};

  }

  NS.responseEvidencePolicy=Object.freeze({version:'11.3.0',parseSceneReply,stageChange});

})();

/* V11.3 passive response evidence collector.
 * Optional, reversible console.info observation ONLY; disabled by default.
 * The native client already logs ReqEnterSceneReply. No WebSocket interception,
 * no replacement of native scene handlers, no game commands, no new timer.
 */

 

(() => {

  'use strict';

  const W=window,NS=W.KVPV||(W.KVPV={}),policy=NS.responseEvidencePolicy;

  if(!policy?.parseSceneReply){console.warn('[RESPONSE V11.3] Policy missing');return;}

  const config={enabled:true,maxHistory:60,maxStageSampleGapMs:12000,

    allowConsoleCapture:false};

  const state={events:[],lastStage:null,processed:0,rejections:0,stageAdvances:0,

    errors:0,lastError:'',lastReason:'ready'};

  let originalInfo=null,wrappedInfo=null,activeConsole=null;

  const actor=()=>{try{return typeof _Ba==='undefined'?'':String(_Ba?._rJ?._O$?.ins?.actorId??'');}

    catch(_){return '';} };

  const expected=()=>String(W.__KVPV_OWN_ACTOR_ID??'');

  const validActor=()=>!W.__KVPV_UNIVERSAL_HALTED&&!!expected()&&actor()===expected();

  function record(event){

    if(!config.enabled||!validActor()||!event)return null;

    const e={...event,actorKey:actor(),correlated:false,requestId:null};

    state.events.push(e);

    const max=Math.max(5,Math.min(200,Number(config.maxHistory)||60));

    while(state.events.length>max)state.events.shift();

    state.processed++;

    if(e.kind==='SCENE_ENTER_REJECTION')state.rejections++;

    if(e.kind==='STAGE_LEVEL_ADVANCED')state.stageAdvances++;

    return {...e};

  }

  function processNativeConsole(args,source='native-console'){

    if(!config.enabled||!validActor())return null;

    try{

      const e=policy.parseSceneReply(args,Date.now());

      if(!e)return null;

      // A console message lacks an RPC request ID, even when nearby requests exist.

      const pending=NS.actions?.current?.()||[];

      const candidates=pending.filter(a=>a.kind==='hong-enter'&&

        a.actorKey===actor()&&e.at>=a.at&&e.at-a.at<=15000);

      return record({...e,source,candidateLocalIds:candidates.map(x=>x.id).slice(0,8)});

    }catch(error){state.errors++;state.lastError=String(error);return null;}

  }

  function startCapture(){

    if(!config.enabled||!validActor()){state.lastReason='invalid-session';return status();}

    if(wrappedInfo){state.lastReason='already-installed';return status();}

    const candidate=typeof console==='undefined'?null:console;

    if(!candidate||typeof candidate.info!=='function'){

      state.lastReason='console-unavailable';return status();

    }

    const before=candidate.info;

    const wrapper=function(...args){

      // Do not change the original logging behavior; always forward once.

      const result=before.apply(this,args);

      if(typeof args[0]==='string'&&args[0].includes('ReqEnterSceneReply'))

        processNativeConsole(args);

      return result;

    };

    try{

      candidate.info=wrapper;

      if(candidate.info!==wrapper)throw Error('console-not-writable');

      originalInfo=before;wrappedInfo=wrapper;activeConsole=candidate;

      config.allowConsoleCapture=true;state.lastReason='capture-installed';

    }catch(e){

      try{if(candidate.info===wrapper)candidate.info=before;}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

      state.errors++;state.lastError=String(e);state.lastReason='capture-failed';

    }

    return status();

  }

  function stopCapture(){

    if(wrappedInfo&&activeConsole){

      if(activeConsole.info===wrappedInfo){

        try{activeConsole.info=originalInfo;state.lastReason='capture-restored';}

        catch(e){state.errors++;state.lastError=String(e);state.lastReason='restore-failed';}

      }else state.lastReason='capture-replaced-externally';

    }

    wrappedInfo=null;originalInfo=null;activeConsole=null;config.allowConsoleCapture=false;

    return status();

  }

  function observe(sample){

    if(!config.enabled||!sample)return status();

    try{

      if(sample.actorValid!==true||sample.actorKey!==expected()||!validActor()){

        state.lastStage=null;state.lastReason='invalid-session-snapshot';return status();

      }

      const prev=state.lastStage;

      const verdict=policy.stageChange(prev,sample,config.maxStageSampleGapMs);

      if(verdict)record(verdict);

      // Never infer through stale, missing, out-of-order or corrupted samples.

      const now=Date.now();

      const fresh=Number.isFinite(sample.at)&&now-sample.at<=7000&&

        sample.at-now<=1000&&sample.readErrorsThisSample===0;

      if(fresh)state.lastStage={at:sample.at,actorKey:sample.actorKey,

        actorValid:sample.actorValid,stageLevel:sample.stageLevel,

        readErrorsThisSample:sample.readErrorsThisSample};

      else state.lastStage=null;

    }catch(e){state.errors++;state.lastError=String(e);state.lastStage=null;}

    return status();

  }

  

  function status(){return {version:'11.3.0',enabled:config.enabled,

    consoleCapture:!!wrappedInfo&&activeConsole?.info===wrappedInfo,

    stageTracking:true,processed:state.processed,rejections:state.rejections,

    stageAdvances:state.stageAdvances,historyLength:state.events.length,

    errors:state.errors,lastError:state.lastError,lastReason:state.lastReason,

    readOnly:true,noGameCommands:true,requestCorrelation:false,autoRetry:false,

    latest:state.events.length?{...state.events[state.events.length-1]}:null};}

  NS.responses=Object.freeze({version:'11.3.0',config,status,

    observe,history:()=>state.events.map(x=>({...x})),

    // Import a manually copied native log, marked as user-supplied and unverified.

    fromLog(...args){return processNativeConsole(args,'user-supplied-client-log');},

    capture:Object.freeze({start:startCapture,stop:stopCapture,

      status:()=>({installed:status().consoleCapture,enabled:config.allowConsoleCapture})}),

    start(){config.enabled=true;return status();},

    stop(){stopCapture();config.enabled=false;state.lastStage=null;return status();}});

})();

/* V11.4 event journey policy: pure classification, no native calls. */

 

(() => {

  'use strict';

  const W=window, NS=W.KVPV||(W.KVPV={});

  const specs=Object.freeze({

    honghoang:{scene:17,counter:'hongHoangCount',progress:'increase'},

    daotri:{scene:22,counter:'daoTriCount',progress:'change'},

    dinhcao:{scene:14,counter:'dinhCaoFloor',progress:'increase'},

    vinhdu:{scene:42},tula:{scene:null},tientuyen:{scene:null},

    lanhdia:{scene:null},tienduyen:{scene:36},tinhthan:{scene:34},

    crystal:{scene:53},manhoang:{scene:null},yeuvuong:{scene:null},bossnhom:{scene:null}

  });

  const finite=n=>typeof n==='number'&&Number.isFinite(n);

  const allowed=(s,expected)=>!!s&&s.actorValid===true&&

    typeof s.actorKey==='string'&&s.actorKey===expected&&

    finite(s.at)&&s.readErrorsThisSample===0;

  function evaluate(previous,current,expected,limit=15000){

    if(!expected||!allowed(current,expected))return {valid:false,reason:'invalid-session-or-sample',proofs:[]};

    if(previous&&(current.at<=previous.at||current.at-previous.at>limit))

      return {valid:false,reason:'observation-gap',proofs:[]};

    const key=String(current.sceneJob||'');

    const prevKey=String(previous?.sceneJob||'');

    const kind=Object.hasOwn(specs,key)?key:null;

    const proofs=[];

    if(kind && kind!==prevKey)proofs.push({kind:'EVENT_STARTED',key,level:'local-observation'});

    if(!kind && Object.hasOwn(specs,prevKey))

      proofs.push({kind:'EVENT_LEFT',key:prevKey,level:'outcome-unverified'});

    const spec=specs[key];

    if(spec){

      if(spec.scene!==null&&current.sceneType===spec.scene&&

        (!previous||previous.sceneType!==spec.scene||prevKey!==key))

        proofs.push({kind:'SCENE_OBSERVED',key,level:'native-state'});

      const a=previous?.[spec.counter],b=current[spec.counter];

      if(spec.counter&&prevKey===key&&finite(a)&&finite(b)&&

         (spec.progress==='increase'?b>a:b!==a))

        proofs.push({kind:'PROGRESS_OBSERVED',key,level:'native-counter',counter:spec.counter,from:a,to:b});

    }

    return {valid:true,key:kind,proofs,reason:'No per-request ACK inferred',requestAckVerified:false};

  }

  NS.eventOutcomePolicy=Object.freeze({version:'11.4.0',specs,evaluate});

})();

/* V11.4 Event Journey: audit entered/progress/claim evidence without sending commands. */

 

(() => {

  'use strict';

  const W=window,NS=W.KVPV||(W.KVPV={}),policy=NS.eventOutcomePolicy;

  if(!policy?.evaluate){console.warn('[EVENT AUDIT] Policy unavailable');return;}

  const config={enabled:true,maxHistory:120,maxCases:40,maxGapMs:15000,alertAfterMs:180000};

  const state={history:[],cases:[],active:null,previous:null,observations:0,errors:0,lastError:'',invalid:0};

  const owner=String(W.__KVPV_OWN_ACTOR_ID??'');

  const finite=n=>typeof n==='number'&&Number.isFinite(n);

  function identityOK(){try{return !W.__KVPV_UNIVERSAL_HALTED&&!!owner&&

    String(_Ba?._rJ?._O$?.ins?.actorId??'')===owner;}

    catch(_){return false;}}

  function append(kind,key,detail={},at=Date.now()){

    const row={at,kind,key,...detail,requestAckVerified:false};

    state.history.push(row);

    while(state.history.length>Math.max(10,Math.min(300,Number(config.maxHistory)||120)))state.history.shift();

    return row;

  }

  function close(at,reason){

    const a=state.active;if(!a)return;

    a.endedAt=at;a.exitReason=reason;

    a.outcome=a.rewardVerified?'REWARD_CONTEXT_OBSERVED':

      a.rewardRequested?'REWARD_REQUEST_UNVERIFIED':

      a.progressCount>0?'PROGRESS_OBSERVED_EXIT_UNVERIFIED':'COMPLETION_UNVERIFIED';

    state.cases.push({...a});while(state.cases.length>Math.max(2,Math.min(100,Number(config.maxCases)||40)))state.cases.shift();

    append('JOURNEY_ENDED',a.key,{outcome:a.outcome,reason},at);

    // No new game command: a single advisory for events with an explicit claim step.

    if(['daotri','dinhcao'].includes(a.key)&&!a.rewardVerified)

      console.warn('[KVPV EVENT AUDIT] '+a.key+': đã rời quy trình, chưa có bằng chứng nhận thưởng theo ngữ cảnh. Xem KVPV.events.audit.cases()');

    state.active=null;

  }

  function observe(s){

    if(!config.enabled)return current();

    if(!identityOK()){state.previous=null;state.invalid++;close(Date.now(),'session-invalid');return current();}

    try{

      const r=policy.evaluate(state.previous,s,owner,Math.max(2500,Number(config.maxGapMs)||15000));

      if(!r.valid){state.invalid++;state.previous=null;

        if(r.reason==='observation-gap')append('OBSERVATION_GAP',state.active?.key||null,{},Date.now());

        return current();}

      if(state.previous&&s.at===state.previous.at)return current();

      state.observations++;

      const key=r.key;

      if(state.active&&state.active.key!==key)close(s.at,'job-or-scene-changed');

      if(key&&!state.active){state.active={key,startedAt:s.at,lastAt:s.at,

        sceneObserved:false,progressCount:0,rewardRequested:false,rewardVerified:false,

        lastProgressAt:s.at,phase:String(s.dailyJobStep||''),outcome:'IN_PROGRESS'};}

      const a=state.active;

      if(a){a.lastAt=s.at;a.phase=String(s.dailyJobStep||'');}

      for(const proof of r.proofs){

        append(proof.kind,proof.key,{source:proof.level,...(proof.counter?{counter:proof.counter,from:proof.from,to:proof.to}:{})},s.at);

        if(a&&a.key===proof.key){

          if(proof.kind==='SCENE_OBSERVED')a.sceneObserved=true;

          if(proof.kind==='PROGRESS_OBSERVED'){a.progressCount++;a.lastProgressAt=s.at;}

        }

      }

      state.previous={...s};

      return current();

    }catch(e){state.errors++;state.lastError=String(e);state.previous=null;return current();}

  }

  function recordProof(p){

    if(!config.enabled||!identityOK()||!p||typeof p!=='object')return null;

    const key=String(p.key||''),kind=String(p.kind||'');

    if(!Object.hasOwn(policy.specs,key)||!['reward-requested','reward-context-confirmed'].includes(kind))return null;

    if(!state.active||state.active.key!==key)return null;

    const a=state.active;

    if(kind==='reward-requested')a.rewardRequested=true;

    else a.rewardVerified=true; // only when source module already verified its own context

    return append(kind,key,{source:String(p.source||'native-module-context').slice(0,120)},Date.now());

  }

  function current(){const a=state.active;

    return a?{...a,suspectedStall:finite(a.lastProgressAt)&&

      Date.now()-a.lastProgressAt>=Math.max(30000,Number(config.alertAfterMs)||180000),

      note:'Native state change is not a per-request ACK.'}:null;}

  function summary(){return {version:'11.4.0',enabled:config.enabled,observations:state.observations,

    active:current(),finished:state.cases.length,invalid:state.invalid,errors:state.errors,

    lastError:state.lastError,newTimer:false,newGameRPC:false,automaticRetry:false};}

  const copy=o=>o?JSON.parse(JSON.stringify(o)):null;

  NS.eventAudit=Object.freeze({version:'11.4.0',config,observe,recordProof,

    status:()=>copy(summary()),current:()=>copy(current()),

    history:()=>copy(state.history),cases:()=>copy(state.cases),

    report(){const s=summary();console.table([{

      event:s.active?.key||'none',phase:s.active?.phase||'-',

      progress:s.active?.progressCount??0,scene:s.active?.sceneObserved??false,

      rewardRequested:s.active?.rewardRequested??false,rewardContext:s.active?.rewardVerified??false,

      outcome:s.active?.outcome||'-',suspectedStall:s.active?.suspectedStall??false}]);return s;},

    start(){config.enabled=true;return summary();},

    stop(){config.enabled=false;return summary();}});

})();

/* V10.6 bootstrap: reuse EXISTING monitor sampler, 2500ms. No second timer. */

 

(() => {

  'use strict';

  const W=window,NS=W.KVPV||(W.KVPV={});

  if(!NS.monitor?.start||!NS.recovery?.observe)return;

  if(W.__KVPV_UNIVERSAL_HALTED)return;

  try{NS.monitor.start();console.info('[RECOVERY V10.6] Monitor + recovery active (read-only except poll timer repair).');}

  catch(e){console.warn('[RECOVERY V10.6] Monitor unavailable:',String(e));}

})();










 

(() => {

  'use strict';

  const W=window, NS=W.KVPV||(W.KVPV={}), TAG='[BOSS CHIEN DOI]';

  if(NS.teamBoss?.version==='11.6.0')return;

  const ownActor=String(W.__KVPV_OWN_ACTOR_ID||'');

  const C={enabled:true,checkMs:8000,minLeftMs:1200,refreshCooldownMs:60000,

    initialRefreshLimit:1,waitSceneMs:35000,maxHistory:60};

  const S={timer:null,attemptKey:null,attemptAt:0,pending:false,refreshAt:0,

    refreshes:0,entryCalls:0,entriesObserved:0,blocked:'starting',errors:0,

    history:[],lastMap:null,lastError:'',startedAt:Date.now()};

  const log=(kind,detail='')=>{

    S.history.push({at:Date.now(),kind,detail:String(detail).slice(0,180)});

    while(S.history.length>C.maxHistory)S.history.shift();

    if(kind==='entry-requested')console.info(TAG,'Da goi nut Khieu chien, doi game chuyen canh');

    if(kind==='uncertain')console.warn(TAG,'Yeu cau vao canh chua co ket qua xac minh, khong tu gui lai');

  };

  const data=()=>_Ba?._a1?._Rvn?.ins;

  const battleMap=()=>Number(_Ba?._$a?._yo?.ins?.intoSce?.[0]);

  const ownerOK=()=>{

    try{return ownActor&& !W.__KVPV_UNIVERSAL_HALTED &&

      String(_Ba?._rJ?._O$?.ins?.actorId??'')===ownActor;}

    catch(_){return false;}

  };

  const hasTeam=()=>_Ba?._a1?._h1?.inst?.hasFightTeam?.()===true;

  const nowServer=()=>Number(_Sa?.svrTime);

  function attemptSignature(m,info){

    const reset=Number(m?.resetEndTm);

    const layer=Number(info?.[7]);

    const grade=Number(info?.[0]);

    return [Number.isFinite(reset)&&reset>0?reset:0,

      Number.isFinite(grade)?grade:'?',Number.isFinite(layer)?layer:'?'].join('/');

  }

  

  function probe(){

    const m=data(), info=m?.info, map=battleMap(),

      left=Number(info?.[4]), grade=Number(info?.[0]), passed=Number(info?.[7]);

    const s={map,scene3301:map===3301,hasTeam:false,leftMs:null,

      level:null,passed:null,challengeReady:false,blocked:'',signature:null,

      nativeAuto:!!m?.c_isAutoIn,modelLoaded:Array.isArray(info)};

    const deny=reason=>{s.blocked=reason;return s;};

    if(!C.enabled)return deny('Da tam dung');

    if(!ownerOK())return deny('Sai phien nhan vat / game-frame');

    if(!m)return deny('Chua co model Boss Chien Doi');

    s.hasTeam=hasTeam();

    if(!s.hasTeam)return deny('Chua gia nhap Chien Doi');

    if(s.scene3301)return deny('Dang o map Boss Chien Doi 3301');

    if(!Array.isArray(info))return deny('Chua co du lieu Boss (can dong bo)');

    s.leftMs=Number.isFinite(left)?left:null;

    s.level=Number.isFinite(grade)?grade:null;

    s.passed=Number.isFinite(passed)?passed:null;

    s.signature=attemptSignature(m,info);

    if(s.nativeAuto)return deny('Auto goc da bat; khong tranh lenh');

    if(info[6]===1)return deny('Co thuong vuot ai cho nhan');

    const max=Number(_ft?._uph?.ins?.getMaxLayer?.());

    if(Number.isFinite(max) && Number.isFinite(passed)&&max>0&&passed>=max)

      return deny('Da qua tang Boss cuoi');

    if(!Number.isFinite(left)||left<=C.minLeftMs)

      return deny('Khong con du thoi gian khieu chien');

    const q=W.KVPV_DAILY?.quickState?.();

    if(q?.running===false)return deny('Auto Daily da dung');

    if(q?.job && q.job!=='rảnh'&&q.job!=='ranh')return deny('Dang lam: '+q.job);

    if(_Ba?._Co?._Mo?.ins?.auto===true)return deny('Thien Quan dang auto');

    if(_Ba?._$a?.SceneUtil?.isCommonScene!==true)return deny('Dang trong canh khac');

    if(W.KVPV_HITRUN1?.status?.(false)?.running===true)return deny('Hit & Run dang hoat dong');

    if(NS.events?.config?.enabled===false)return deny('Event automation da tat');

    if(NS.core?.scene?.can?.('daily')===false)return deny('Scene Manager dang giu canh');

    const hold=NS.timeline?.reservation?.({atMs:Date.now(),flags:W.KVPV_DAILY?.config||null,forTask:'long'});

    if(hold)return deny('Giu canh cho su kien: '+hold.key);

    if(typeof _Ba?._sst?._Cht?.inst?.rqEtScene!=='function')

      return deny('Native rqEtScene chua san sang');

    if(S.attemptKey===s.signature)return deny('Da thu tang nay; doi server xac nhan / tang moi');

    s.blocked='READY';s.challengeReady=true;

    return s;

  }

  function refresh(force=false){

    if(!ownerOK()||!hasTeam())return false;

    const n=Date.now();

    if(!force&&S.refreshes>=C.initialRefreshLimit)return false;

    if(n-S.refreshAt<C.refreshCooldownMs)return false;

    const f=_Ba?._a1?._qvn?.inst?.getFTBossInfo;

    if(typeof f!=='function')return false;

    S.refreshAt=n;S.refreshes++;

    try{f.call(_Ba._a1._qvn.inst);log('native-info-refresh');return true;}

    catch(e){S.lastError=String(e);S.errors++;return false;}

  }

  function observe(){

    if(!ownerOK())return;

    const current=battleMap();

    if(S.pending&&current===3301){

      S.pending=false;S.entriesObserved++;log('entered-map-3301');

    }else if(S.pending&&Date.now()-S.attemptAt>C.waitSceneMs){

      S.pending=false;log('uncertain','Het thoi gian cho chuyen canh');

    }

    S.lastMap=current;

  }

  

  function tick(){

    if(!C.enabled)return;

    try{

      observe();

      const v=probe();S.blocked=v.blocked;

      if(v.blocked==='Chua co du lieu Boss (can dong bo)')refresh(false);

      if(!v.challengeReady||S.pending)return;

      const scene=NS.core?.scene;

      if(scene?.acquire && !scene.acquire('daily','fight-team-boss-3301')){

        S.blocked='Scene lease bi tu choi';return;

      }

      // Mark BEFORE calling native client. Do not issue again on exceptions/timeouts.

      S.attemptKey=v.signature;S.attemptAt=Date.now();S.pending=true;

      try{

        _Ba._sst._Cht.inst.rqEtScene(3301);

        S.entryCalls++;log('entry-requested',v.signature);

      }catch(e){S.lastError=String(e);S.errors++;log('uncertain','Native threw: '+S.lastError);}

      finally{scene?.release?.('daily');}

    }catch(e){S.errors++;S.lastError=String(e);S.blocked='Loi doc trang thai';}

  }

  

  function status(){const p=probe();return {

    version:'11.6.0',enabled:C.enabled,autoRunning:S.timer!==null,

    map:p.map,hasTeam:p.hasTeam,modelLoaded:p.modelLoaded,

    leftMs:p.leftMs,level:p.level,passed:p.passed,nativeAuto:p.nativeAuto,

    challengeReady:p.challengeReady,reason:p.blocked,attemptKey:S.attemptKey,

    pending:S.pending,entryCalls:S.entryCalls,entriesObserved:S.entriesObserved,

    refreshes:S.refreshes,errors:S.errors,lastError:S.lastError,

    noBlindRetry:true,rawRPC:false,noAutoClaim:true};}

  

  function start(){C.enabled=true;if(S.timer===null)S.timer=(W.KVPV_V1?.timers?.setInterval ?? W.setInterval)(tick,C.checkMs);tick();return status();}

  

  function stop(){C.enabled=false;if(S.timer!==null){(W.KVPV_V1?.timers?.clearInterval ?? W.clearInterval)(S.timer);S.timer=null;}

    // Intentional stop does not clear the attempt lock; prevents duplicate entry.

    return status();}

  function resetAttempt(){

    if(S.pending||battleMap()===3301)return {ok:false,reason:'Chua the reset trong luc cho / dang trong Boss'};

    S.attemptKey=null;log('manual-unlock');return {ok:true};

  }

  const api=Object.freeze({version:'11.6.0',config:C,probe,status,start,stop,

    tick,refresh:()=>refresh(true),resetAttempt,history:()=>S.history.slice()});

  NS.teamBoss=api;

  start();

})();








 

(() => {

  'use strict';

  const W=window, NS=W.KVPV||(W.KVPV={}), TAG='[TIEN TON DAU KY AUTO]';

  if(NS.tienTon?.version==='11.7.0'||W.KVPV_TIEN_TON_AUTO)return;

  const actor=String(W.__KVPV_OWN_ACTOR_ID||'');

  const C={enabled:true,pollMs:5000,minWindowLeftSec:20,

    waitingTimeoutMs:25000,initialSyncOnce:true,maxHistory:90};

  const S={timer:null,sentKey:null,sentAt:0,pending:false,

    confirmed:false,enteredFight:false,lastScore:null,lastMap:null,

    called:0,observed:0,errors:0,lastError:'',reason:'starting',

    refreshKey:null,log:[]};

  const emit=(kind,message='')=>{

    const row={time:new Date().toISOString(),kind,message:String(message).slice(0,200)};

    S.log.push(row);if(S.log.length>C.maxHistory)S.log.shift();

    if(['unknown','error'].includes(kind))console.warn(TAG,kind,message);

    if(kind==='requested')console.info(TAG,'Đã gọi Ghép, chờ client/server xác nhận');

  };

  const owner=()=>{

    try{return !!actor&&!W.__KVPV_UNIVERSAL_HALTED&&

      String(_Ba?._rJ?._O$?.ins?.actorId??'')===actor;}catch(_){return false;}

  };

  const model=()=>_Ba?._Xit?._nst?.inst;

  const native=()=>_Ba?._Xit?._hst?.inst;

  const scene=()=>_Ba?._$a?._yo?.ins;

  const map=()=>Number(scene()?.intoSce?.[0]);

  const matchState=()=>Number(_Ba?._cm?._vJ?.ins?.matState);

  const inArena=()=>scene()?.isInArena===true || map()===2171;

  const localVN=()=>{

    const p=Object.fromEntries(new Intl.DateTimeFormat('en-GB',{

      timeZone:'Asia/Ho_Chi_Minh',year:'numeric',month:'2-digit',day:'2-digit',

      hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'

    }).formatToParts(new Date()).map(x=>[x.type,x.value]));

    return {key:`${p.year}-${p.month}-${p.day}`,

      minute:Number(p.hour)*60+Number(p.minute),sec:Number(p.second)};

  };

  

  function probe(){

    const v=localVN(), m=model(), score=m?.ttiScore,

      rest=Number(score?.[3]), participated=Number(m?.times?.[0]),

      match=matchState(), currentMap=map(), remaining=19*60+45-v.minute;

    const x={enabled:C.enabled,withinHours:v.minute>=1170&&v.minute<1185,

      remainingSeconds:remaining*60-v.sec,date:v.key,map:currentMap,

      arena:inArena(),modelReady:Array.isArray(score),rest:Number.isFinite(rest)?rest:null,

      serverOpen:false,matchingState:match,autoNative:!!m?.atMatch,

      requestKey:null,ready:false,reason:'',participated:Number.isFinite(participated)?participated:null};

    const no=reason=>{x.reason=reason;return x;};

    if(!C.enabled)return no('Đã tắt Tiên Tôn Auto');

    if(!owner())return no('Sai nhân vật / thiếu game-frame');

    if(W.KVPV_DAILY?.quickState?.()?.running===false)return no('Auto Daily đã dừng');

    if(NS.events?.config?.enabled===false)return no('Events đã dừng thủ công');

    if(!x.withinHours || x.remainingSeconds<C.minWindowLeftSec)return no('Ngoài giờ 19:30–19:45 hoặc quá sát giờ đóng');

    const state=_Ba?._sst?._ist?.inst?.getCpSceneStateByType?.(16);

    x.serverOpen=Number(state?.[2])===2;

    if(!x.serverOpen)return no('Server chưa xác nhận mở Tiên Tôn (scene type 16)');

    if(x.arena)return no('Đang trong trận 2171');

    if(!Array.isArray(score))return no('Chưa có dữ liệu lượt từ server');

    if(!Number.isFinite(rest)||rest<=0)return no('Hết lượt khiêu chiến');

    if(x.autoNative)return no('Đã bật Ghép tự động gốc, không gửi trùng');

    if(match===1||match===2)return no('Native đang ghép / ghép thành công');

    const q=W.KVPV_DAILY?.quickState?.();

    if(q?.job&&!['rảnh','ranh','idle'].includes(String(q.job)))return no('Auto Daily đang làm '+q.job);

    if(_Ba?._Co?._Mo?.ins?.auto===true)return no('Thiên Quan đang chạy');

    if(_Ba?._$a?.SceneUtil?.isCommonScene!==true)return no('Nhân vật đang ở cảnh không phải map thường');

    if(W.KVPV_HITRUN1?.status?.(false)?.running===true)return no('Hit & Run đang chiến đấu');

    if(NS.teamBoss?.status?.()?.pending===true)return no('Boss Chiến Đội đang chờ chuyển cảnh');

    if(NS.core?.scene?.can?.('daily')===false)return no('Scene Manager đang khóa cảnh');

    const reserve=NS.timeline?.reservation?.({atMs:Date.now(),flags:W.KVPV_DAILY?.config||{},forTask:'long'});

    

    

    if(reserve && !(reserve.key==='vinh_du' && reserve.phase==='upcoming' && x.remainingSeconds>60))

      return no('Đang giữ cảnh cho '+String(reserve.key));

    const entry=_Ba?._sst?._Cht?.inst;

    if(typeof native()?.rqBeginMatch!=='function'||typeof entry?.checkEnterScene!=='function')

      return no('Thiếu hàm Ghép / kiểm tra vào cảnh gốc');

    x.requestKey=[v.key,rest,Number.isFinite(participated)?participated:'?'].join('/');

    if(S.sentKey===x.requestKey)return no(S.pending?'Đang chờ kết quả Ghép':'Đã gửi cùng trạng thái lượt, chờ server thay đổi');

    if(!entry.checkEnterScene(2171))return no('Game không cho vào map Tiên Tôn 2171');

    x.ready=true;x.reason='READY';return x;

  }

  function observe(){

    if(!S.pending)return;

    const b=map();

    if(b===2171||inArena()){

      S.pending=false;S.confirmed=true;S.enteredFight=true;S.observed++;

      emit('entered','Đã thấy map 2171');return;

    }

    const m=model();

    if(S.lastScore!=null && Number(m?.ttiScore?.[3])<S.lastScore){

      S.pending=false;S.confirmed=true;S.observed++;

      emit('effect','Server cập nhật số lượt đã sử dụng');return;

    }

    if(Date.now()-S.sentAt>C.waitingTimeoutMs){

      S.pending=false;emit('unknown','Hết thời gian chờ; không tự Ghép lại cùng trạng thái lượt');

    }

  }

  function refreshOnce(){

    const d=localVN(),id=d.key;

    if(S.refreshKey===id||!owner()||!C.initialSyncOnce)return false;

    const f=native()?.getTti;if(typeof f!=='function')return false;

    S.refreshKey=id;

    try{f.call(native());emit('refresh','Đọc thông tin Tiên Tôn qua hàm gốc');return true;}

    catch(e){S.lastError=String(e);S.errors++;return false;}

  }

  

  function tick(){

    if(!C.enabled)return;

    try{

      if(!owner())return;

      observe();

      const p=probe();S.reason=p.reason;S.lastMap=p.map;

      if(p.reason==='Chưa có dữ liệu lượt từ server')refreshOnce();

      if(!p.ready||S.pending)return;

      const gate=NS.core?.scene;

      if(gate?.acquire && !gate.acquire('daily','tien-ton-auto-match')){

        S.reason='Scene lease bị từ chối';return;

      }

      

      S.sentKey=p.requestKey;S.sentAt=Date.now();S.pending=true;

      S.lastScore=p.rest;S.enteredFight=false;S.confirmed=false;

      try{native().rqBeginMatch();S.called++;emit('requested',p.requestKey);}

      catch(e){S.pending=false;S.errors++;S.lastError=String(e);emit('unknown','Hàm Ghép báo lỗi: '+S.lastError);}

      finally{gate?.release?.('daily');}

    }catch(e){S.errors++;S.lastError=String(e);S.reason='Lỗi đọc trạng thái';emit('error',S.lastError);}

  }

  

  function status(){const p=probe();return {version:'11.7.0',enabled:C.enabled,

    timerActive:S.timer!=null,nowVN:localVN(),serverOpen:p.serverOpen,

    withinHours:p.withinHours,remainingSeconds:p.remainingSeconds,

    challengeLeft:p.rest,map:p.map,matchingState:p.matchingState,

    ready:p.ready,reason:p.reason,requestKey:S.sentKey,

    pending:S.pending,observed:S.observed,requests:S.called,

    errors:S.errors,lastError:S.lastError,noBlindRetry:true,nativeOnly:true};}

  

  function start(){C.enabled=true;if(S.timer==null)S.timer=(W.KVPV_V1?.timers?.setInterval ?? W.setInterval)(tick,C.pollMs);tick();return status();}

  

  function stop(){C.enabled=false;if(S.timer!=null){(W.KVPV_V1?.timers?.clearInterval ?? W.clearInterval)(S.timer);S.timer=null;}

    

    return status();}

  

  function history(){return S.log.slice();}

  NS.tienTon=Object.freeze({version:'11.7.0',config:C,start,stop,tick,probe,status,history});



})();

/* KVPV V11.8 — TIEN DUYEN DAI TAC CHIEN / 2 ACCOUNT ROLES.
 * SOURCE VERIFIED IN CLIENT (.devtools):
 *   scene stage I 2811 / 2813 (native gathering), Boss stage II 2812.
 *   model _Ba._B_._I_t.ins, getGatherInfoByPosIdx(0..4), autoAttack().
 *   Chest entry [objId, collectingOwner, expiry, gatheringDeadline, ...].
 *   Native game UI uses selectTar(3, chestOcc) and autoAttack() when no chest.
 *   ONLY MAIN attacks; CLONE attacks until an unclaimed chest appears, then gathers.
 * Does not change rewards, server messages, game time or pre-Boss 20/20 stage.
 */

 

(() => {

  'use strict';

  const W=window, K=W.KVPV||(W.KVPV={}), TAG='[TIEN DUYEN DAI TAC CHIEN]';

  if(K.marryBattle?.version==='11.8.0')return;

  const C={

    enabled:true,

    mainId:String(window.__KVPV_OWN_ACTOR_ID||''),cloneId:'',

    pollMs:1100,actionSpacingMs:1300,maxHistory:100,

    bossMap:2812,firstStageMaps:[2811,2813],

    // No guessed chest ID, only live entries the server handed to the native model.

    requireNativeChest:true

  };

  const S={timer:null,phase:'waiting',reason:'starting',lastActionAt:0,

    previousMap:null,pendingId:null,pendingSince:0,ackSeen:false,

    hits:0,chestTargets:0,observedLoot:0,errors:0,lastError:'',history:[]};

  const now=()=>Date.now();

  const actor=()=>String(_Ba?._rJ?._O$?.ins?.actorId??'');

  const owned=()=>!!W.__KVPV_OWN_ACTOR_ID &&

    String(W.__KVPV_OWN_ACTOR_ID)===actor() && !W.__KVPV_UNIVERSAL_HALTED;

  const role=()=>actor()===C.mainId?'main':actor()===C.cloneId?'clone':'none';

  const map=()=>Number(_Ba?._$a?._yo?.ins?.intoSce?.[0]);

  const model=()=>_Ba?._B_?._I_t?.ins;

  const gather=()=>_Ba?._K_t?._Z7t?.ins;

  const grab=()=>_Ba?._K_t?._q_t?.ins;

  const nativeSelector=()=>_Ba?._rJ?._O$?.ins;

  const world=()=>typeof _C==='undefined'?null:_C?._Ba?.instance;

  const note=(kind,message)=>{

    S.history.push({time:new Date().toISOString(),kind,message:String(message)});

    if(S.history.length>C.maxHistory)S.history.shift();

    if(kind==='error')console.warn(TAG,message);

    if(kind==='loot'||kind==='attack')console.info(TAG,message);

  };

  const inside=()=>map()===C.bossMap;

  function liveBoxes(){

    const m=model();

    if(!m||typeof m.getGatherInfoByPosIdx!=='function')return [];

    const out=[];

    for(let i=0;i<5;i++){

      const row=m.getGatherInfoByPosIdx(i);

      if(!Array.isArray(row)||row.length<3)continue;

      const id=Number(row[0]),owner=Number(row[1]),expiry=Number(row[2]);

      if(!Number.isSafeInteger(id)||id<=0||!Number.isFinite(owner))continue;

      out.push({index:i,id,owner,expiry,raw:row});

    }

    return out;

  }

  function available(){

    const items=liveBoxes().filter(x=>x.owner===0 || String(x.owner)===actor());

    // Prefer a chest expiring soon (same ordering as the native _Jpa._zgi).

    return items.sort((a,b)=>{

      const ea=Number.isFinite(a.expiry)?a.expiry:Infinity;

      const eb=Number.isFinite(b.expiry)?b.expiry:Infinity;

      return ea-eb;

    });

  }

  function pickChest(chest){

    if(S.pendingId===chest.id)return false;

    const nativeRole=world()?.getRole?.(chest.id);

    const occ=Number(nativeRole?.property?.get?.('occ'));

    if(!Number.isSafeInteger(occ)||occ<=0){S.reason='Chest object not loaded';return false;}

    if(C.requireNativeChest && !_ft?._mci?.ins?.getNpcInfo?.(occ)){

      S.reason='Chest config unavailable';return false;

    }

    const select=nativeSelector()?.selectTar;

    if(typeof select!=='function'){S.reason='Native selectTar unavailable';return false;}

    // Freeze before calling native selection: no duplicate send on event re-entry.

    S.pendingId=chest.id;S.pendingSince=now();S.ackSeen=false;

    S.lastActionAt=now();

    select.call(nativeSelector(),3,occ); // game-native path, NOT a forged RPC.

    S.chestTargets++;S.phase='collecting';

    S.reason='Clone gathering chest #'+chest.id;

    note('loot','Clone ưu tiên rương '+chest.id+' (ô '+chest.index+')');

    return true;

  }

  function attack(){

    if(gather()?.gathering===true)return false;

    if(Number(model()?.stating)===2){S.phase='attacking';S.reason='Native auto attacking';return false;}

    if(now()-S.lastActionAt<C.actionSpacingMs)return false;

    const fn=model()?.autoAttack;

    if(typeof fn!=='function'){S.reason='Native autoAttack unavailable';return false;}

    S.lastActionAt=now();

    fn.call(model());S.hits++;S.phase='attacking';S.reason='Native autoAttack started';

    note('attack',(role()==='main'?'MAIN':'CLONE')+' tự đánh Boss');return true;

  }

  

  function tick(){

    if(!C.enabled)return status();

    try{

      if(!owned()){S.reason='Sai game-frame / nhân vật đã đổi';return status();}

      if(role()==='none'){S.reason='Nhân vật chưa được gán vai trò';return status();}

      const current=map();

      if(S.previousMap!==current){

        S.previousMap=current;S.pendingId=null;S.ackSeen=false;

      }

      // Native 20/20 gathering on 2811/2813 must remain untouched.

      if(!inside()){

        S.phase=C.firstStageMaps.includes(current)?'native-first-stage':'waiting';

        S.reason=S.phase==='native-first-stage'?'Để game tự nhặt 20 rương giai đoạn đầu':'Không ở map Boss 2812';

        return status();

      }

      const m=model();

      if(!m||typeof m.autoAttack!=='function'){S.reason='Tiên Duyên native model unavailable';return status();}

      if(role()==='main'){

        S.phase='attacking';

        // Avoid forcibly cancelling a genuine gather by a different module.

        if(gather()?.gathering===true){S.reason='Main đang thu thập theo native, đợi kết thúc';return status();}

        attack();return status();

      }

      // Clone: if currently harvesting, NEVER interrupt it by attacking.

      if(gather()?.gathering===true){S.phase='collecting';S.reason='Đang thu thập, chờ server';return status();}

      const boxes=liveBoxes();

      if(S.pendingId!=null){

        const currentChest=boxes.find(x=>x.id===S.pendingId);

        if(!currentChest){

          S.observedLoot++;note('loot','Rương '+S.pendingId+' biến mất khỏi dữ liệu (không suy diễn ACK)');

          S.pendingId=null;S.ackSeen=false;

        }else if(currentChest.owner!==0 && String(currentChest.owner)!==actor()){

          // Someone else has started this chest. Let them finish, return to Boss.

          note('loot','Rương '+S.pendingId+' chuyển cho người khác, không tranh');

          S.pendingId=null;S.ackSeen=false;

        }

      }

      const choices=available();

      if(choices.length){

        const first=choices[0];

        // An earlier selection remains uncertain until its chest disappears or scene changes.

        if(S.pendingId!=null){

          S.phase='waiting-chest';

          S.reason=now()-S.pendingSince>12000?'Đang chờ kết quả rương, KHÔNG gửi lại':'Đã chọn rương, đang chờ client/server';

          return status();

        }

        if(now()-S.lastActionAt<C.actionSpacingMs)return status();

        pickChest(first);return status();

      }

      // All drops either gone or owned by someone else. Resume boss damage.

      if(S.pendingId!=null){

        // Pending object may be claim-locked by another player while server syncs.

        S.phase='waiting-chest';S.reason='Rương đang chờ cập nhật, chưa tự đánh chen';return status();

      }

      attack();return status();

    }catch(e){S.errors++;S.lastError=String(e?.message||e);S.reason='Lỗi đọc client';

      note('error',S.lastError);return status();}

  }

  

  function status(){return {version:'11.8.0',enabled:C.enabled,role:role(),actor:actor(),map:map(),

    phase:S.phase,reason:S.reason,chests:inside()?liveBoxes().map(x=>({slot:x.index,id:x.id,owner:x.owner,expiry:x.expiry})):[],

    pendingId:S.pendingId,chestTargets:S.chestTargets,observedLoot:S.observedLoot,

    attackStarts:S.hits,errors:S.errors,lastError:S.lastError,

    gameGathering:gather()?.gathering===true,gameState:model()?.stating,

    mainAlwaysAttack:true,cloneChestPriority:true,nativeOnly:true};}

  

  function start(){C.enabled=true;if(S.timer===null)S.timer=(W.KVPV_V1?.timers?.setInterval ?? W.setInterval)(tick,C.pollMs);tick();return status();}

  

  function stop(){C.enabled=false;if(S.timer!==null){(W.KVPV_V1?.timers?.clearInterval ?? W.clearInterval)(S.timer);S.timer=null;}

    S.reason='Đã dừng riêng module';return status();}

  

  function history(){return S.history.slice();}

  const api=Object.freeze({version:'11.8.0',config:C,start,stop,tick,status,history});

  K.marryBattle=api;

  C.enabled=false; 



})();











 

(() => {

  'use strict';

  const W=window,K=W.KVPV||(W.KVPV={}),TAG='[MAC LAN 2 ACC]';

  if(K.macLan?.fixVersion==='11.12.1')return;

  const C={enabled:true,mainId:String(window.__KVPV_OWN_ACTOR_ID||''),cloneId:'',

    teamType:6,tier:1,roomMap:2702,pollMs:2300,

    roomListIntervalMs:14000,applyListIntervalMs:12000,

    createLimit:1,joinLimit:1,inviteLimit:2,acceptLimit:1,approveLimit:1,

    inviteSpacingMs:18000,maxHistory:60,

    inviteTamGioi:true,publicInviteLimit:2,publicInviteSpacingMs:60000,

    autoStartWhenFull:true,teamStableMs:3000,startTimeoutMs:45000,

    battleSceneType:53,requireClone:true,requireRemaining:true,

    // V11.12: native Crystal defense actions; enabled by default.

    crystalDefenseEnabled:true,autoCrystalTower:true,autoCrazyMode:true,

    crazyStableMs:2300,crazyMaxRequestsPerBattle:3,

    crazyMinSpacingMs:30000,autoTowerMaxRequestsPerBattle:1};

  const S={timer:null,phase:'waiting',reason:'',lastRoomScanAt:0,lastApplyScanAt:0,

    lastInviteAt:0,createCount:0,joinCount:0,inviteCount:0,

    acceptCount:0,approveCount:0,publicInviteCount:0,lastPublicInviteAt:0,

    publicRoomId:null,selectedRoomId:null,selectedTier:null,

    errors:0,lastError:'',events:[],lastLog:'',

    readyKey:null,readySince:0,startKey:null,startSentAt:0,nativeAutoAt:0,

    battleSeen:false,battleAt:0,battleLeftAt:0,result:'unknown',

    resultSeenAt:0,rewardConfirmed:false,stageWave:null,

    startAttempts:0,completedBattles:0,lastStartedRoom:null,

    roomEpoch:null,leftRoomEpoch:null,joinTargetRoom:null,roomChanges:0};

  // V11.12: only observe the current game scene; no second timer or raw RPC.

  const D={inside:false,battleNumber:0,enteredAt:0,reason:'Not in scene 53',

    towerAttempts:0,towerPending:false,towerObserved:false,towerReason:'',

    crazyAttempts:0,crazyPending:false,crazyObserved:false,

    crazyEverOn:false,crazyLastOn:false,crazyLastRequestAt:0,

    crazyEligibleSince:0,crazyReason:'',crazyCooldownUntil:0,

    resultItems:[],lastWave:null};

  function crystalDefenseTick(){

    if(!inCrystal()){

      if(D.inside){

        D.inside=false;D.reason='Đã rời cảnh 53, không gửi thêm lệnh';

        audit('progress','Kết thúc giám sát Điên Cuồng / Tự đặt tháp của lượt '+D.battleNumber);

      }

      return;

    }

    if(!D.inside){

      D.inside=true;D.battleNumber++;D.enteredAt=now();

      Object.assign(D,{towerAttempts:0,towerPending:false,towerObserved:false,towerReason:'',

        crazyAttempts:0,crazyPending:false,crazyObserved:false,crazyEverOn:false,

        crazyLastOn:false,crazyLastRequestAt:0,crazyEligibleSince:0,

        crazyReason:'',crazyCooldownUntil:0,resultItems:[],lastWave:null});

      audit('progress','Bắt đầu giám sát phòng Thủ Hộ Thủy Tinh, lượt '+D.battleNumber);

    }

    if(!C.enabled||!C.crystalDefenseEnabled||!owned()){

      D.reason='Tắt điều khiển hoặc sai phiên nhân vật';return;

    }

    const ui=_ft?._Y4n?.ins;

    if(ui?.isOpened?.(1293)){

      const items=crystal()?.awardWareIds;

      if(Array.isArray(items)) D.resultItems=items.slice(0,30);

      D.reason='Đã mở kết quả; để game tự xử lý thưởng/thoát, không gửi lệnh';

      return;

    }

    const m=crystal(),api=_Ba?._n4t?._oun?.ins;

    if(!m||!Array.isArray(m._jsi)){

      D.reason='Chờ dữ liệu scene Thủ Hộ Thủy Tinh từ server';return;

    }

    const open=(id)=>_Ba?._Do?._Ho?.inst?.getFcIsOpen?.(id)===true;

    const towerEnabled=m.autoTower===true||m.autoTower===1;

    if(towerEnabled){

      D.towerObserved=true;

      D.towerReason='Client đang bật Tự đặt tháp (chưa đồng nghĩa ACK server)';

    }else if(C.autoCrystalTower&&!D.towerPending&&

      D.towerAttempts<C.autoTowerMaxRequestsPerBattle){

      if(!open(812))D.towerReason='Chưa mở chức năng tự tạo tháp 812';

      else if(typeof api?.setTrigramCopyAutoTower!=='function')

        D.towerReason='Thiếu API autoTower';

      else{

        D.towerPending=true;D.towerAttempts++;

        try{

          api.setTrigramCopyAutoTower(1);

          D.towerReason='Đã gọi nút Tự đặt tháp một lần, đang theo dõi client';

          audit('action','Bật Tự đặt tháp native (scene 53)');

        }catch(e){D.towerReason='Không rõ lệnh autoTower đã gửi: '+String(e);}

      }

    }

    if(!C.autoCrazyMode){D.crazyReason='Điên Cuồng đã tắt trong cấu hình';return;}

    const active=m.isShowCrazy===true||m.isShowCrazy===1;

    if(active){

      if(!D.crazyLastOn)audit('progress','Game đã xác nhận trạng thái Điên Cuồng bật');

      D.crazyLastOn=true;D.crazyObserved=true;D.crazyEverOn=true;

      D.crazyPending=false;D.crazyEligibleSince=0;

      D.crazyReason='Điên Cuồng đang bật (trạng thái native)';return;

    }

    D.crazyLastOn=false;

    if(D.crazyPending){

      D.crazyReason='Đã gọi nút Điên Cuồng, chưa thấy trạng thái xác nhận; không gửi trùng';return;

    }

    const flag=String(m.flagId??'');

    if(flag!==actor()){

      D.crazyReason='Người giữ quyền bật Điên Cuồng là '+(flag||'chưa xác định')+', không phải acc này';return;

    }

    if(!open(1061)||!open(651)){

      D.crazyReason='Chưa mở đủ chức năng Điên Cuồng (1061/651)';return;

    }

    const serverTime=Number(typeof _Sa==='undefined'?NaN:_Sa.svrTime);

    const cooldown=Number(m.crazyTime);

    if(!Number.isFinite(serverTime)||!Number.isFinite(cooldown)){

      D.crazyReason='Chưa có đồng hồ/cooldown native hợp lệ';return;

    }

    D.crazyCooldownUntil=cooldown;

    if(cooldown>serverTime){D.crazyReason='Điên Cuồng đang hồi chiêu đến '+cooldown;return;}

    if(D.crazyAttempts>=C.crazyMaxRequestsPerBattle){

      D.crazyReason='Đủ giới hạn kích hoạt Điên Cuồng trong trận';return;

    }

    if(D.crazyLastRequestAt&&now()-D.crazyLastRequestAt<C.crazyMinSpacingMs){

      D.crazyReason='Đang giữ khoảng cách giữa các lượt kích hoạt';return;

    }

    if(!D.crazyEligibleSince){D.crazyEligibleSince=now();

      D.crazyReason='Chờ xác nhận điều kiện Điên Cuồng ổn định';return;}

    if(now()-D.crazyEligibleSince<C.crazyStableMs)return;

    if(typeof api?._run!=='function'){

      D.crazyReason='Không tìm thấy nút Điên Cuồng gốc';return;

    }

    // Lock BEFORE the native call; on network ambiguity never blind resend.

    D.crazyPending=true;D.crazyAttempts++;D.crazyLastRequestAt=now();

    D.crazyEligibleSince=0;

    try{

      api._run(true);D.crazyReason='Đã gọi Vào dạng điên cuồng; chờ trạng thái game';

      audit('action','Tự bật Điên Cuồng native, lần '+D.crazyAttempts);

    }catch(e){D.crazyReason='Không rõ lệnh Điên Cuồng đã gửi: '+String(e);}

  }

  function crystalDefenseStatus(){

    return {enabled:C.enabled&&C.crystalDefenseEnabled,inScene:D.inside,

      battleNumber:D.battleNumber,reason:D.reason,autoTower:C.autoCrystalTower,

      towerAttempts:D.towerAttempts,towerPending:D.towerPending,

      towerObserved:D.towerObserved,towerReason:D.towerReason,

      autoCrazy:C.autoCrazyMode,crazyActive:crystal()?.isShowCrazy===true,

      crazyAttempts:D.crazyAttempts,crazyPending:D.crazyPending,

      crazyEverOn:D.crazyEverOn,crazyReason:D.crazyReason,

      crazyOwner:crystal()?.flagId??null,crazyCooldownUntil:D.crazyCooldownUntil,

      rewardWaveIds:D.resultItems.slice(),

      note:'Chỉ dùng API gốc; trạng thái client không đồng nghĩa xác nhận nhận thưởng'};

  }

  const now=()=>Date.now();

  const actor=()=>String(_Ba?._rJ?._O$?.ins?.actorId??'');

  const role=()=>actor()===C.mainId?'leader':actor()===C.cloneId?'clone':'none';

  const owned=()=>String(W.__KVPV_OWN_ACTOR_ID||'')===actor() && !W.__KVPV_UNIVERSAL_HALTED;

  const team=()=>_Ba?._cm?._q3t?.ins;

  const native=()=>_Ba?._cm?._u3t?.ins;

  const meInTeam=()=>team()?.getHasTeamByType?.(C.teamType)===true;

  const roomId=()=>team()?.roomId;

  

  

  function syncRoomEpoch(){

    const inRoom=meInTeam(),id=Number(roomId());

    const key=inRoom&&Number.isSafeInteger(id)&&id>=0?String(id):null;

    if(key===S.roomEpoch)return;

    if(key===null){

      if(S.roomEpoch!==null){

        S.leftRoomEpoch=S.roomEpoch;S.roomEpoch=null;

        audit('progress','Đã rời phòng '+S.leftRoomEpoch+'; không tự mời/xin vào phòng cũ');

      }

      return;

    }

    // Initial room and each confirmed new room get independent, bounded invite budgets.

    const prev=S.roomEpoch??S.leftRoomEpoch;

    S.roomEpoch=key;S.leftRoomEpoch=null;S.roomChanges++;

    S.inviteCount=0;S.approveCount=0;S.lastInviteAt=0;

    S.publicInviteCount=0;S.lastPublicInviteAt=0;S.publicRoomId=null;

    S.readyKey=null;S.readySince=0;S.nativeAutoAt=0;

    S.startKey=null;S.startSentAt=0;

    if(role()==='clone'){S.acceptCount=0;S.joinCount=0;S.joinTargetRoom=key;}

    audit('progress','Đã xác nhận '+(prev&&prev!==key?'phòng mới '+key+' (trước '+prev+')':'phòng '+key)+', đặt lại giới hạn mời theo phòng');

  }

  function nextCloneOpportunity(){

    if(role()!=='clone'||meInTeam())return null;

    try{

      const fid=_Ba?._cm?.TeamTypeToFuncId?.[6];

      const asks=typeof team()?.getAskLs==='function'?team().getAskLs(fid):[];

      const invited=Array.isArray(asks)?asks.find(v=>Array.isArray(v)&&

        Number(v[1])===6&&String(v[5])===C.mainId&&Number(v[4])===C.tier):null;

      if(invited)return String(invited[2]);

      const list=team()?.roomList;

      const room=Array.isArray(list)?list.find(v=>Array.isArray(v)&&Number(v[2])===6&&

        String(v[9])===C.mainId&&Number(v[4])===C.tier&&Number(v[5])<4):null;

      return room?String(room[1]):null;

    }catch(_){return null;}

  }

  function invitationEvidence(){

    

    try{

      const fid=_Ba?._cm?.TeamTypeToFuncId?.[6];

      const rows=team()?.getAskLs?.(fid);

      const received=Array.isArray(rows)?rows:[];

      const fromMain=received.filter(v=>Array.isArray(v)&&Number(v[1])===6&&

        String(v[5])===C.mainId&&Number(v[4])===C.tier);

      return {nativeInboxCount:received.length,fromMainCount:fromMain.length,

        fromMainRoomIds:fromMain.map(v=>String(v[2]))};

    }catch(e){return {readError:String(e?.message||e)};}

  }

  function syncCloneTarget(){

    if(role()!=='clone'||meInTeam())return;

    const key=nextCloneOpportunity();if(key===null)return;

    if(S.joinTargetRoom===null){S.joinTargetRoom=key;return;}

    if(key===S.joinTargetRoom)return;

    const previous=S.joinTargetRoom;S.joinTargetRoom=key;

    S.acceptCount=0;S.joinCount=0;S.selectedRoomId=null;S.selectedTier=null;

    S.lastRoomScanAt=0;

    audit('progress','CLONE thấy phòng MAIN đổi từ '+previous+' sang '+key+'; cho phép một yêu cầu nhận/xin phòng mới');

  }

  const members=()=>{

    const ids=new Set();

    for(const id of (team()?.getMemberIds?.()||[]))ids.add(String(id));

    for(const row of (team()?.getTeamAllMembers?.()||[]))if(Array.isArray(row))ids.add(String(row[0]));

    return [...ids];

  };

  const inCommon=()=>_Ba?._$a?.SceneUtil?.isCommonScene===true && !_Ba?._$a?._yo?.ins?.isInMission;

  const audit=(kind,message)=>{

    if(S.lastLog===kind+'|'+message)return;

    S.lastLog=kind+'|'+message;

    S.events.push({at:new Date().toISOString(),kind,message});

    if(S.events.length>C.maxHistory)S.events.shift();

    if(kind==='action'||kind==='warning')console.info(TAG,message);

  };

  function eligible(){

    if(!owned()||role()==='none')return 'Sai tài khoản/game-frame';

    if(!inCommon())return 'Nhân vật đang bận hoặc không ở bản đồ thường';

    // V11.12.1: Daily crystal WAITING TEAM is the SAME dungeon, not a competing job.

    // Any other job/phase retains the existing scene ownership guard.

    let daily=null;

    try{daily=W.KVPV_DAILY?.quickState?.()||null;}

    catch(e){return 'Không đọc được trạng thái Auto Daily: '+String(e?.message||e);}

    const job=String(daily?.job??'rảnh');

    const step=String(daily?.step??'');

    const sharingCrystal=job==='crystal' && step==='waitingTeam' && meInTeam();

    if(!['rảnh','ranh','-','idle'].includes(job) && !sharingCrystal)

      return 'Auto Daily đang xử lý '+job+(step?'/'+step:'');

    if(typeof native()?.creSerAreRoom!=='function' || !team())return 'Native team API chưa tải xong';

    const cfg=_ft?._Esi?.ins?.getCopyTrigramById?.(C.tier);

    if(!cfg)return 'Chưa tải cấu hình Mặc Lân Cảnh';

    if(team()?.getHasTeams?.() && !meInTeam())return 'Đang thuộc đội khác; không tự rời đội';

    return null;

  }

  function sameRoom(){

    if(!meInTeam())return false;

    const ids=members();

    return ids.includes(C.mainId)&&ids.includes(C.cloneId);

  }

  function createRoom(){

    if(S.createCount>=C.createLimit)return 'Đã thử tạo phòng, chờ server; không gửi lại';

    S.createCount++;

    // EXACT native client constructor used by its create-room button.

    native().creSerAreRoom([6,'Mặc Lân 2 acc',2702,C.tier,0,0,0,1,false,false]);

    audit('action','MAIN yêu cầu tạo phòng Mặc Lân (loại 6, tầng '+C.tier+')');

    return 'Đã yêu cầu tạo phòng';

  }

  function invite(){

    if(S.inviteCount>=C.inviteLimit || now()-S.lastInviteAt<C.inviteSpacingMs)return;

    if(typeof native()?.inviUserSARoom!=='function')return;

    if(members().includes(C.cloneId))return;

    S.lastInviteAt=now();S.inviteCount++;

    // Native invite, type=6, friends-list option=1, recipients=[clone actor].

    native().inviUserSARoom([6,1,[Number(C.cloneId)]]);

    audit('action','MAIN đã mời đúng clone '+C.cloneId);

  }

  function approveClone(){

    if(S.approveCount>=C.approveLimit)return;

    const list=team()?.applyList;

    if(!Array.isArray(list))return;

    // Applicant rows: [actorId, playerInfo, ...]; NEVER approve other IDs.

    if(!list.some(row=>Array.isArray(row)&&String(row[0])===C.cloneId))return;

    if(typeof native()?.agreAplySARoom!=='function')return;

    S.approveCount++;

    native().agreAplySARoom([6,Number(C.cloneId)]);

    audit('action','MAIN chấp nhận đơn xin đội của clone');

  }

  function inviteTamGioi(){

    if(!C.inviteTamGioi || !sameRoom() || members().length>=4)return;

    if(typeof native()?.sendInviteChatInfo!=='function')return;

    const id=Number(roomId()),tier=Number(team()?.mapLve);

    if(!Number.isSafeInteger(id)||id<0||tier!==C.tier)return;

    // New room = new native invite session; never carry cooldown between rooms.

    if(S.publicRoomId!==id){S.publicRoomId=id;S.publicInviteCount=0;S.lastPublicInviteAt=0;}

    if(S.publicInviteCount>=C.publicInviteLimit ||

       (S.lastPublicInviteAt&&now()-S.lastPublicInviteAt<C.publicInviteSpacingMs))return;

    

    const cfg=_ft?._gY?.ins?.getCfgById?.(10711)?.[2]?.[0];

    const born=Number(_Ba?._rJ?._O$?.ins?.bornLev);

    if(!Number.isFinite(born)||!Number.isFinite(Number(cfg))||born<Number(cfg))return;

    const tm=_Ba?._cm?._vJ?.ins;

    if(Number(tm?.coolTime)!==30)return;

    S.lastPublicInviteAt=now();S.publicInviteCount++;

    

    native().sendInviteChatInfo([6,id,C.roomMap,-1,0,tier]);

    tm.clearLoop?.();tm.startCoolLoop?.();

    audit('action','MAIN gọi thêm người qua Tam Giới ('+S.publicInviteCount+'/'+C.publicInviteLimit+')');

  }

  

  const scene=()=>Number(_Ba?._$a?.SceneUtil?.curScene);

  const crystal=()=>_Ba?._n4t?._t4t?.ins;

  const nativeAuto=()=>_Ba?._cm?._vJ?.ins?.autoStart===true;

  function fullRoster(){

    const raw=team()?.getTeamAllMembers?.();

    if(!Array.isArray(raw))return [];

    

    const ids=raw.map(row=>Array.isArray(row)?String(row[0]):'');

    return ids.some(id=>!/^[1-9]\d+$/.test(id))?[]:ids;

  }

  function pendingEvent(){

    try{

      const reservation=K.events?.timeline?.status?.()?.reservation || K.timeline?.status?.()?.reservation;

      return reservation && typeof reservation==='object' ? reservation : null;

    }catch(e){return {unavailable:true};}

  }

  function inCrystal(){return scene()===C.battleSceneType;}

  function captureResult(){

    try{

      const ui=_ft?._Y4n?.ins;

      if(!ui?.isOpened?.(1293))return;

      const panel=ui.getDialogById?.(1293);

      if(!panel||panel.destroyed)return;

      const result=panel.winImg?.visible===true?'win':panel.loseImg?.visible===true?'lose':'unknown';

      if(result!==S.result){

        S.result=result;S.resultSeenAt=now();

        audit('action','Đã thấy bảng kết quả native: '+result+' (chưa xác minh thưởng)');

      }

    }catch(e){S.lastError='Result observer: '+String(e);}

  }

  function followBattle(){

    crystalDefenseTick();

    if(inCrystal()){

      if(!S.battleSeen){

        S.battleSeen=true;S.battleAt=now();S.battleLeftAt=0;

        S.phase='in-dungeon';S.reason='Server đã chuyển sang cảnh Thủ Hộ Thủy Tinh (53)';

        audit('action','Đã xác nhận vào cảnh 53; không yêu cầu bắt đầu lại');

      }

      const wave=Number(crystal()?.curWare);

      if(Number.isFinite(wave)&&wave!==S.stageWave){

        S.stageWave=wave;

        audit('progress','Thủ Hộ Thủy Tinh: đợt '+wave);

      }

      captureResult();

      return true;

    }

    if(S.battleSeen){

      if(!S.battleLeftAt)S.battleLeftAt=now();

      S.phase='battle-ended';

      S.reason=S.result==='win'?'Đã quan sát bảng thắng; phần thưởng chưa có ACK riêng':

        'Đã rời cảnh 53; kết quả hoặc phần thưởng chưa xác minh';

      

      if(now()-S.battleLeftAt<4500)return true;

      return true; 

    }

    return false;

  }

  function startGuard(){

    if(!C.autoStartWhenFull)return 'Tự bắt đầu đã tắt';

    if(!sameRoom())return 'MAIN và CLONE chưa cùng đội';

    const rid=Number(roomId());

    if(!Number.isSafeInteger(rid)||rid<0)return 'Chưa có roomId hợp lệ';

    const roster=fullRoster();

    if(roster.length!==4||new Set(roster).size!==4)return 'Chưa đủ 4 thành viên duy nhất';

    if(C.requireClone && (!roster.includes(C.mainId)||!roster.includes(C.cloneId)))return 'Thiếu MAIN hoặc CLONE';

    const tier=Number(team()?.mapLve??team()?.roomInfo?.[0]?.[4]);

    if(!Number.isFinite(tier)||tier!==C.tier)return 'Bậc phòng không đúng Mặc Lân';

    const map=Number(team()?.roomMapId??team()?.roomInfo?.[0]?.[3]);

    if(Number.isFinite(map)&&map>0&&map!==C.roomMap)return 'Map phòng không đúng Mặc Lân';

    const remaining=Number(crystal()?.remainTimes);

    if(C.requireRemaining && (!Number.isFinite(remaining)||remaining<=0))return 'Chưa xác nhận lượt Thủ Hộ Thủy Tinh còn lại';

    if(crystal()?.isCombin===true || crystal()?.isCombin===1)return 'Đang gộp lượt, không tự bắt đầu';

    if(pendingEvent())return 'Có sự kiện đang được giữ chỗ; không mở trận mới';

    return null;

  }

  function maybeStartDungeon(){

    const key=String(roomId())+'|'+String(C.tier);

    const denied=startGuard();

    if(denied){S.readyKey=null;S.readySince=0;S.phase='waiting-start';S.reason=denied;return;}

    if(S.startKey===key){

      S.phase='start-pending';

      S.reason=now()-S.startSentAt>C.startTimeoutMs?

        'Lệnh Bắt đầu quá hạn, chưa xác minh; KHÔNG tự gửi lại':

        'Đã gửi Bắt đầu, đang chờ chuyển cảnh 53';

      return;

    }

    if(nativeAuto()){

      if(S.nativeAutoAt===0)S.nativeAutoAt=now();

      S.phase='native-auto-start';

      S.reason='Game đã bật tự bắt đầu phòng 4/4; nhường đường native để không gửi trùng';

      return;

    }

    if(S.readyKey!==key){S.readyKey=key;S.readySince=now();S.reason='Đang xác minh đội 4/4 ổn định';return;}

    if(now()-S.readySince<C.teamStableMs){S.phase='ready-4';S.reason='Chờ đủ '+C.teamStableMs+'ms ổn định';return;}

    if(typeof native()?.startTeamBossCopy!=='function'){

      S.phase='blocked';S.reason='Thiếu API Bắt đầu ngay gốc';return;

    }

    

    S.startKey=key;S.startSentAt=now();S.startAttempts++;

    S.lastStartedRoom=key;S.phase='start-pending';

    S.reason='Đã gọi nút Bắt đầu ngay đúng một lần; chờ chuyển cảnh';

    try{

      native().startTeamBossCopy([C.teamType]);

      audit('action','Đội 4/4 ổn định; MAIN yêu cầu Bắt đầu ngay [6], phòng '+key);

    }catch(e){

      S.lastError=String(e);S.phase='start-unknown';

      S.reason='Native start lỗi/không rõ đã gửi hay chưa; không tự thử lại';

      audit('warning',S.reason+': '+S.lastError);

    }

  }

  function leaderTick(){

    if(!meInTeam()){

      S.phase='creating';S.reason=createRoom();return;

    }

    if(team()?.isLeader!==true){S.phase='blocked';S.reason='Acc chính đang ở đội nhưng không làm đội trưởng';return;}

    if(sameRoom()){

      if(fullRoster().length===4){maybeStartDungeon();return;}

      S.phase='ready';S.reason='MAIN và CLONE cùng phòng, chờ đủ 4 người';

      inviteTamGioi();return;

    }

    S.phase='waiting-clone';S.reason='Đang chờ clone nhận lời mời/xin gia nhập';

    invite();approveClone();

    if(now()-S.lastApplyScanAt>C.applyListIntervalMs){

      S.lastApplyScanAt=now();native()?.getApplyList?.([6]);

    }

  }

  function acceptInvitation(){

    if(S.acceptCount>=C.acceptLimit)return false;

    const funcId=_Ba?._cm?.TeamTypeToFuncId?.[6];

    const invites=typeof team()?.getAskLs==='function'?team().getAskLs(funcId):[];

    const row=Array.isArray(invites)?invites.find(v=>Array.isArray(v)&&

      Number(v[1])===6&&String(v[5])===C.mainId&&Number(v[4])===C.tier):null;

    if(!row||typeof native()?.agrInviUSARoom!=='function')return false;

    // From native invitation dialog: [teamType, invitationRoomId, tier].

    S.acceptCount++;S.selectedRoomId=row[2];S.selectedTier=row[4];S.joinTargetRoom=String(row[2]);

    native().agrInviUSARoom([6,row[2],row[4]]);

    audit('action','CLONE nhận đúng lời mời từ MAIN (room '+row[2]+')');

    return true;

  }

  function applyFromRoomList(){

    if(S.joinCount>=C.joinLimit)return 'Đã gửi xin vào phòng, đang chờ chấp thuận';

    const list=team()?.roomList;

    if(!Array.isArray(list))return 'Đang chờ danh sách phòng';

    // Exact list format from client room item: [?, roomId, type, ?, tier, count, ..., ?, ?, leaderActorId, ...]

    const match=list.find(row=>Array.isArray(row)&&Number(row[2])===6&&

      String(row[9])===C.mainId&&Number(row[4])===C.tier&&Number(row[5])<4);

    if(!match)return 'Không thấy phòng của MAIN (không tự xin phòng người lạ)';

    if(typeof native()?.applySerAreRoom!=='function')return 'Native join API không có';

    S.joinCount++;S.selectedRoomId=match[1];S.selectedTier=match[4];S.joinTargetRoom=String(match[1]);

    native().applySerAreRoom([6,match[9],match[1],match[4]]);

    audit('action','CLONE xin vào phòng của MAIN '+match[1]);

    return 'Đã gửi yêu cầu xin vào MAIN room';

  }

  function cloneTick(){

    if(meInTeam()){

      S.phase=sameRoom()?'ready':'checking-team';

      S.reason=sameRoom()?'Đã cùng đội với MAIN':'CLONE đã ở đội loại 6; chờ xác minh MAIN';return;

    }

    if(S.acceptCount>0 || S.joinCount>0){

      S.phase='waiting-confirmation';S.reason='Đã gửi yêu cầu vào đội, chưa được server xác nhận';return;

    }

    if(acceptInvitation()){

      S.phase='joining';S.reason='Đã chấp nhận lời mời MAIN';return;

    }

    S.phase='searching-room';S.reason=applyFromRoomList();

    if(S.joinCount===0 && now()-S.lastRoomScanAt>C.roomListIntervalMs){

      S.lastRoomScanAt=now();native()?.getRoomList?.([6,0,20]);

    }

  }

  

  function tick(){

    if(!C.enabled)return;

    try{

      if(!owned()||role()==='none'){

        S.phase='blocked';S.reason='Sai tài khoản/game-frame';return;

      }

      syncRoomEpoch();syncCloneTarget();

      

      if(followBattle())return;

      const block=eligible();

      if(block){S.phase='blocked';S.reason=block;return;}

      if(role()==='leader')leaderTick();

      else if(role()==='clone'){

        cloneTick();

        if(sameRoom()&&fullRoster().length===4){

          S.phase='ready-4';S.reason='CLONE đã trong phòng 4/4; chờ đội trưởng bắt đầu';

        }

      }

    }catch(e){S.errors++;S.lastError=String(e?.message||e);S.phase='error';S.reason=S.lastError;

      audit('warning','Lỗi quan sát nhóm: '+S.lastError);}

  }

  function diagnose(){

    // Read-only report. NEVER starts room, queues a scene change or sends a game command.

    const roster=fullRoster();

    let daily=null, dailyError=null;

    try{daily=W.KVPV_DAILY?.quickState?.()||null;}

    catch(e){dailyError=String(e?.message||e);}

    let blocked=null;

    if(!C.enabled)blocked='Module Mặc Lân đã tắt';

    else if(!owned()||role()==='none')blocked='Sai nhân vật/game-frame';

    else if(inCrystal())blocked='Đã ở trong phó bản cảnh 53';

    else {

      blocked=eligible();

      if(!blocked){

        if(!meInTeam())blocked='Chưa có phòng loại 6';

        else if(role()==='clone')blocked='CLONE chờ MAIN bắt đầu';

        else if(team()?.isLeader!==true)blocked='MAIN không phải đội trưởng';

        else blocked=startGuard();

      }

    }

    return {fixVersion:'11.12.1',role:role(),actor:actor(),enabled:C.enabled,

      teamType:team()?.teamtype??null,roomId:roomId(),scene:scene(),common:inCommon(),

      leader:team()?.isLeader===true,members:roster,fullTeam:roster.length===4&&new Set(roster).size===4,

      mainAndClone:sameRoom(),remaining:crystal()?.remainTimes??null,

      job:daily?.job??null,step:daily?.step??null,dailyError,

      nativeAutoStart:nativeAuto(),startApiAvailable:typeof native()?.startTeamBossCopy==='function',

      invitation:{inviteCount:S.inviteCount,inviteLimit:C.inviteLimit,acceptCount:S.acceptCount,

        joinCount:S.joinCount,approveCount:S.approveCount,joinTargetRoom:S.joinTargetRoom,

        observedMainRoom:S.roomEpoch,roomChanges:S.roomChanges,candidateMainRoom:nextCloneOpportunity(),

        nativeInbox:invitationEvidence()},

      startAttempts:S.startAttempts,startKey:S.startKey,startSentAt:S.startSentAt,

      phase:S.phase,reason:S.reason,blockedBy:blocked||'Không bị chặn; chờ 3 giây ổn định hoặc phản hồi server'};

  }

  

  function status(){

    const roster=fullRoster(),id=roomId();

    return {version:'11.11.0',fixVersion:'11.12.1',enabled:C.enabled,role:role(),actor:actor(),

      phase:S.phase,reason:S.reason,teamType:team()?.teamtype,roomId:id,

      isLeader:team()?.isLeader===true,members:roster,bothPresent:sameRoom(),

      membersCount:roster.length,fullTeam:roster.length===4&&new Set(roster).size===4,

      difficulty:C.tier,remainingTimes:crystal()?.remainTimes??null,

      autoStartDungeon:C.autoStartWhenFull && roster.length===4,

      configuredAutoStart:C.autoStartWhenFull,gameAutoStart:nativeAuto(),

      startAttempts:S.startAttempts,startSentAt:S.startSentAt,startKey:S.startKey,

      battleScene:scene(),battleSeen:S.battleSeen,battleAt:S.battleAt,

      currentWave:S.stageWave,result:S.result,rewardConfirmed:S.rewardConfirmed,

      createCount:S.createCount,joinCount:S.joinCount,

      inviteCount:S.inviteCount,acceptCount:S.acceptCount,approveCount:S.approveCount,

      roomChanges:S.roomChanges,observedRoom:S.roomEpoch,joinTargetRoom:S.joinTargetRoom,

      tamGioiCount:S.publicInviteCount,tamGioiRoomId:S.publicRoomId,

      defense:crystalDefenseStatus(),

      selectedRoomId:S.selectedRoomId,inviteInbox:invitationEvidence(),errors:S.errors,lastError:S.lastError,

      note:'Một lệnh Bắt đầu/phòng; không tự retry, không suy đoán ACK nhận thưởng.'};

  }

  

  function start(){C.enabled=true;if(S.timer===null)S.timer=(W.KVPV_V1?.timers?.setInterval ?? W.setInterval)(tick,C.pollMs);tick();return status();}

  

  function stop(){C.enabled=false;if(S.timer!==null){(W.KVPV_V1?.timers?.clearInterval ?? W.clearInterval)(S.timer);S.timer=null;}

    S.phase='stopped';S.reason='Dừng thủ công; không rời phòng';return status();}

  function retry(){

    // Only explicit user action can clear request locks. No automatic blind resends.

    S.createCount=0;S.joinCount=0;S.inviteCount=0;S.acceptCount=0;S.approveCount=0;

    S.selectedRoomId=null;S.selectedTier=null;S.lastInviteAt=0;

    S.joinTargetRoom=null;

    S.publicInviteCount=0;S.lastPublicInviteAt=0;S.lastRoomScanAt=0;S.lastApplyScanAt=0;

    S.readyKey=null;S.readySince=0;S.startKey=null;S.startSentAt=0;

    S.nativeAutoAt=0;S.battleSeen=false;S.battleAt=0;S.battleLeftAt=0;

    S.result='unknown';S.resultSeenAt=0;S.rewardConfirmed=false;S.stageWave=null;

    audit('action','Người chơi đặt lại bộ đếm yêu cầu; sẽ kiểm tra lại trạng thái server');

    tick();return status();

  }

  const api=Object.freeze({version:'11.11.0',battleVersion:'11.12.0',fixVersion:'11.12.1',roomFixVersion:'11.12.2',config:C,status,diagnose,start,stop,retry,

    defenseStatus:crystalDefenseStatus,

    history:()=>S.events.slice(),tick});

  K.macLan=api;

  C.enabled=false; 



})();






 

(() => {

 'use strict';

 const W=window,K=W.KVPV||(W.KVPV={}),TAG='[BOSS CHIEN TUYEN 1300]';

 if(K.frontline1300?.version==='11.11.0')return;

 let owner=null,original=null,wrapped=null,blocks=0,attachments=0,conflicts=0;

 const scene=()=>Number(_Ba?._$a?.SceneUtil?.curScene);

 const active=()=>scene()===21||scene()===68;

 const model=()=>_Ba?._XLt?._YLt?.inst;

 const level=id=>Number(model()?.getCfgByid?.(id)?.[6]);

 const allow=id=>!active()||level(id)===1300;

 function refresh(){

   const cur=model();

   if(!cur||typeof cur.setSelTarget!=='function')return false;

   const previous=K.frontline900;

   const native=Object.getPrototypeOf(cur)?.setSelTarget;

   if(!owner&&previous?.version==='11.10.0'&&previous.status?.()?.protected===true&&typeof native==='function')cur.setSelTarget=native;

   if(owner===cur && cur.setSelTarget===wrapped)return true;

   if(owner===cur && cur.setSelTarget!==wrapped){conflicts++;return false;}

   // Clean old owner only if still holding OUR hook.

   if(owner && owner.setSelTarget===wrapped)owner.setSelTarget=original;

   owner=cur;original=cur.setSelTarget;

   wrapped=function(id,...args){

     if(!allow(id)){blocks++;return undefined;}

     return original.call(this,id,...args);

   };

   cur.setSelTarget=wrapped;attachments++;return true;

 }

 

 function status(){return {version:'11.11.0',enabled:active(),scene:scene(),

   selected:model()?.lstBsOcc??null,selectedLv:level(model()?.lstBsOcc),

   protected:!!owner&&owner.setSelTarget===wrapped,blocks,attachments,conflicts,

   note:'Main combat also refuses non-Lv1300 targets on scene types 21/68; no raw RPC.'};}

 const api=Object.freeze({version:'11.11.0',refresh,status,allow});

 K.frontline1300=api;K.frontline900=api;refresh();

 console.info(TAG,'Only native Lv1300 targets allowed in Boss Chien Tuyen scenes');

})();

/* V10.5 Pure adaptive policy. No window, timers, native game access, or RPC. */

 

(() => {

  'use strict';

  const W=window, NS=W.KVPV||(W.KVPV={});

  const isFiniteNumber=x=>typeof x==='number'&&Number.isFinite(x);

  const clamp=(n,a,b)=>Math.min(b,Math.max(a,n));

  function compute({base,profile,now=Date.now(),settings={}}={}){

    const deny=reason=>({ok:false,reason});

    if(!base||typeof base!=='object')return deny('missing combat configuration');

    if(!profile||profile.confidence!=='moderate'||!profile.suggestion)

      return deny('not enough reliable analytics');

    const minEncounters=clamp(Math.ceil(settings.minEncounters||2),2,10);

    if(!isFiniteNumber(profile.encounters)||profile.encounters<minEncounters)

      return deny('needs more Boss encounters');

    const age=now-profile.lastAt;

    if(!isFiniteNumber(now)||!isFiniteNumber(profile.lastAt)||age<0||

       age>Math.max(60000,settings.maxProfileAgeMs||30*60000))

      return deny('analytics profile is stale');

    for(const k of ['leavePct','resumeFightPct','returnPct'])

      if(!isFiniteNumber(base[k]))return deny('invalid baseline '+k);

    if(base.leavePct<30||base.leavePct>75||base.resumeFightPct<0||

       base.resumeFightPct>90||base.returnPct<=base.leavePct||

       base.returnPct>100||base.resumeFightPct>=base.returnPct)

      return deny('baseline outside conservative adjustment range');

    const suggestion=profile.suggestion;

    if(!isFiniteNumber(suggestion.leavePct)||!isFiniteNumber(suggestion.resumeFightPct))

      return deny('invalid recommendation');

    if(profile.samples<30||profile.observedSeconds<60||profile.retreats<2)

      return deny('not enough samples, time or retreats');

    // Conservative mode only raises thresholds; changes max 10 percentage points per Boss.

    const maxIncrease=clamp(Number(settings.maxIncreasePct)||10,1,10);

    const leave=clamp(Math.round(suggestion.leavePct),base.leavePct,

      Math.min(75,base.leavePct+maxIncrease));

    const resume=clamp(Math.round(suggestion.resumeFightPct),base.resumeFightPct,

      Math.min(90,base.resumeFightPct+maxIncrease));

    const returned=Math.max(base.returnPct,Math.ceil(resume+2),Math.ceil(leave+2));

    if(returned>100||leave>=returned||resume>=returned)

      return deny('cannot maintain valid HP threshold ordering');

    if(leave===base.leavePct&&resume===base.resumeFightPct&&returned===base.returnPct)

      return deny('no useful conservative adjustment');

    return {ok:true,reason:'conservative adjustment based on observed Boss encounters',

      proposed:{leavePct:leave,resumeFightPct:resume,returnPct:returned},

      baseline:{leavePct:base.leavePct,resumeFightPct:base.resumeFightPct,returnPct:base.returnPct},

      key:profile.key,confidence:profile.confidence};

  }

  NS.adaptivePolicy=Object.freeze({version:'10.5.0',compute});

})();

/* V10.5 guarded autonomous adapter. Affects LOCAL HitRun HP config only.
 * Never sends network messages, never changes game/native timers and never
 * mutates thresholds during an active fight. On stop, restore exact baseline.
 */

 

(() => {

  'use strict';

  const W=window,NS=W.KVPV||(W.KVPV={});

  const policy=NS.adaptivePolicy;

  if(!policy?.compute){console.warn('[V10.5] Adaptive policy unavailable');return;}

  const config={enabled:true,autoApply:true,maxIncreasePct:10,

    minEncounters:2,maxProfileAgeMs:30*60000,cooldownOnFailureMs:30*60000};

  let active=null,attempts=0,applied=0,rollbacks=0,skipped=0;

  const failures=new Map(),events=[];

  const log=(kind,details)=>{

    events.push({at:Date.now(),kind,...details});

    if(events.length>60)events.shift();

  };

  const keyFor=({scene,bossTypeId,bossId})=>

    String(scene)+'/'+(bossTypeId===null||bossTypeId===undefined||bossTypeId===''?

      'instance:'+String(bossId):'kind:'+String(bossTypeId));

  function profileFor(boss){

    const key=keyFor(boss);

    const p=NS.analytics?.report?.(key);

    return {key,profile:p};

  }

  

  function preview(boss,base){

    if(!boss||!base)return {ok:false,reason:'Boss and combat config required'};

    const {key,profile}=profileFor(boss);

    const failedUntil=failures.get(key)||0;

    if(failedUntil>Date.now())return {ok:false,key,reason:'cooldown after a combat safety stop',until:failedUntil};

    return policy.compute({base,profile,settings:config,now:Date.now()});

  }

  function beforeStart({scene,bossTypeId,bossId,config:hpConfig}={}){

    attempts++;

    if(active)return {ok:false,reason:'previous combat thresholds not yet restored'};

    if(!config.enabled||!config.autoApply){skipped++;return {ok:false,reason:'adaptive disabled'};}

    if(!hpConfig||typeof hpConfig!=='object')return {ok:false,reason:'missing HP config'};

    const boss={scene,bossTypeId,bossId},plan=preview(boss,hpConfig);

    if(!plan.ok){skipped++;return plan;}

    const saved=Object.fromEntries(Object.keys(plan.proposed).map(k=>[k,hpConfig[k]]));

    // All validation is complete before the first mutation. Changes are local to this fight.

    for(const [k,value] of Object.entries(plan.proposed))hpConfig[k]=value;

    active={key:plan.key,boss,baseline:saved,applied:{...plan.proposed},

      object:hpConfig,started:false,at:Date.now()};

    applied++;log('applied',{key:plan.key,from:saved,to:plan.proposed});

    return plan;

  }

  function restore(reason='fight ended'){

    if(!active)return false;

    const previous=active;active=null;

    for(const [k,value] of Object.entries(previous.baseline)){

      // Respect user edits made during the fight; only revert our own unchanged values.

      if(previous.object[k]===previous.applied[k])previous.object[k]=value;

    }

    rollbacks++;log('restored',{key:previous.key,reason});

    return previous;

  }

  function afterStart(){if(active)active.started=true;}

  function afterStop(reason='stopped'){

    const before=active;

    const info=restore(reason);

    const safety=/safety stop|character died|movement disabled|no healing|target lost|hp format|boss hp reset|repositioned|scene changed/i.test(String(reason));

    if(before&&safety){

      failures.set(before.key,Date.now()+Math.max(60000,config.cooldownOnFailureMs));

      log('cooldown',{key:before.key,reason:String(reason)});

    }

    return !!info;

  }

  

  function status(){

    const now=Date.now();

    for(const [k,t] of failures)if(t<=now)failures.delete(k);

    return {version:'10.5.0',enabled:config.enabled,autoApply:config.autoApply,

      active:active?{key:active.key,baseline:active.baseline,applied:active.applied}:null,

      attempted:attempts,applied,restored:rollbacks,skipped,failedBosses:failures.size};

  }

  NS.adaptive=Object.freeze({version:'10.5.0',config,

    beforeStart,afterStart,afterStop,abort:()=>afterStop('start failed'),

    preview,status,history:()=>events.slice(),

    start(){config.enabled=true;config.autoApply=true;return status();},

    stop(){config.autoApply=false;return status();},

    reset(){if(active)return {ok:false,reason:'Cannot reset during active adaptation'};

      failures.clear();events.length=0;attempts=0;applied=0;rollbacks=0;skipped=0;

      return status();}

  });

  console.info('[V10.5] Adaptive Boss Survival ready (conservative, reversible, between fights only).');

})();

/* V10.5 on-demand diagnosis, read-only. No background polling or game RPC. */

 

(() => {

  'use strict';

  const W=window,NS=W.KVPV||(W.KVPV={});

  let runs=0;

  function audit(){

    runs++;

    const out=[];

    const add=(component,severity,message,next='')=>out.push({component,severity,message,next});

    const safe=(fn)=>{try{return fn();}catch(e){return {error:String(e)};}};

    const core=safe(()=>NS.core?.scene?.status?.());

    const daily=safe(()=>NS.daily?.diagnose?.());

    const combat=safe(()=>NS.combat?.status?.());

    const analytics=safe(()=>NS.analytics?.status?.());

    const adaptive=safe(()=>NS.adaptive?.status?.());

    const recovery=safe(()=>NS.recovery?.status?.());

    const decision=safe(()=>NS.decision?.status?.());

    const executor=safe(()=>NS.executor?.status?.());

    const orchestrator=safe(()=>NS.orchestrator?.status?.());

    const workflow=safe(()=>NS.workflow?.status?.());

    const nativeEvidence=safe(()=>NS.nativeEvidence?.status?.());

    const actions=safe(()=>NS.actions?.status?.());

    const responses=safe(()=>NS.responses?.status?.());

    if(core?.error)add('Core','error',core.error,'Inspect KVPV.core.scene.status()');

    else if(!core)add('Core','error','Scene Manager unavailable','Verify FULL version');

    else if(core.canCombat===false)add('Core','info','Combat currently restricted by scene/event/stage','Inspect KVPV.core.scene.status()');

    if(daily?.error)add('Thiên Quan','error',daily.error,'Inspect KVPV.daily.diagnose()');

    else if(!daily)add('Thiên Quan','warn','Daily adapter unavailable','Check KVPV_DAILY');

    else if(daily.manualPause)add('Thiên Quan','info','User manually paused Thiên Quan; addons cannot reenable it','KVPV.daily.start() only when desired');

    else if(daily.enabled===false)add('Thiên Quan','info','Tự Vượt disabled by configuration or quest module','Check Quest Director and KVPV.daily.diagnose()');

    else if(daily.dailyRunning===false)add('Thiên Quan','warn','Auto Daily scheduler is not running','Inspect KVPV_DAILY.quickState()');

    else if(daily.sceneReason)add('Thiên Quan','info',String(daily.sceneReason),'Review current scene and event');

    else if(daily.stageLane?.paused)add('Thiên Quan','info','Stage async lane paused','Review KVPV_ASYNC928.status()');

    if(combat?.error)add('HitRun','error',combat.error,'Inspect KVPV.combat.status()');

    else if(!combat?.hitrun)add('HitRun','warn','HitRun controller unavailable','Reload the expected build');

    else if(!combat.autoArm)add('HitRun','info','Automatic Boss arming is disabled','KVPV.combat.autoArm()');

    else if(combat.auto==='already-attempted')add('HitRun','info','Same Boss was already attempted; no retry storm','Inspect last safety stop before rearming');

    else if(combat.auto==='scene-busy')add('HitRun','info','Waiting for scene or event','Check Scene Manager');

    if(analytics?.errors)add('Analytics','warn','Telemetry errors: '+analytics.errors,'KVPV.analytics.status()');

    if(adaptive?.active)add('Adaptive','info','Temporary HP thresholds active; restored on stop','KVPV.adaptive.status()');

    if(recovery?.failures)add('Recovery','warn','Poll repair failures: '+recovery.failures,'KVPV.recovery.status()');

    if(nativeEvidence?.lastReason==='subscription-failed')add('Native evidence','warn',

      nativeEvidence.lastError||'Native notification subscription failed','KVPV.nativeEvidence.status()');

    if(actions?.errors)add('Actions','warn','Action verification internal errors: '+actions.errors,'KVPV.actions.status()');

    if(actions?.historyLength>0 && NS.actions?.history?.().some(e=>e.status==='TIMED_OUT_UNKNOWN'))

      add('Actions','info','Some local calls had no observable effect; server ACK remains unknown','KVPV.actions.history()');

    if(responses?.errors)add('Responses','warn','Response observer errors: '+responses.errors,'KVPV.responses.status()');

    if(responses?.rejections)add('Responses','info',

      'Client reported '+responses.rejections+' scene-entry rejection(s); no request ID for direct correlation',

      'KVPV.responses.history()');

    if(workflow?.current?.pendingReview)add('Workflow','warn',

      'Waiting without a request-linked ACK; no automatic resend',

      'KVPV.workflow.explain()');

    if(workflow?.errors)add('Workflow','warn','Workflow observer exceptions: '+workflow.errors,'KVPV.workflow.status()');

    if(workflow?.current?.state==='SUSPECTED_STALL')

      add('Workflow','warn','No observed progress for '+workflow.current.kind+'; ACK not verified','KVPV.workflow.explain()');

    if(orchestrator?.errors)add('Orchestrator','warn','Task controller read errors: '+orchestrator.errors,'KVPV.orchestrator.status()');

    if(orchestrator?.stall)add('Orchestrator','warn',orchestrator.stall.note,'KVPV.orchestrator.history()');

    if(executor?.errors)add('Executor','warn','V10.8 executor exceptions: '+executor.errors,'KVPV.executor.status()');

    if(executor?.lastReason==='recovery-unavailable')add('Executor','warn','Recovery delegation missing','KVPV.recovery.status()');

    if(decision?.errors)add('Decision','warn','Decision telemetry failures: '+decision.errors,'KVPV.decision.status()');

    if(['session-invalid','stale-data','no-data'].includes(decision?.confirmed?.primary?.id))

      add('Decision','warn','Decision engine cannot rank fresh state: '+decision.confirmed.primary.id,'KVPV.decision.explain()');

    for(const issue of recovery?.issues||[])if(['warn','critical'].includes(issue.severity))

      add('Recovery',issue.severity,issue.detail,'KVPV.recovery.status()');

    if(!out.length)add('Overall','ok','No issue detected by available offline indicators','Live game behavior still unverified');

    return {version:'10.9.0',at:new Date().toISOString(),checks:out,

      scene:core||null,tuVuot:daily||null,combat:combat||null,

      analytics:analytics?{accepted:analytics.accepted,enabled:analytics.enabled}:null,

      adaptive:adaptive||null,recovery:recovery||null,

      workflow:workflow?{current:workflow.current,errors:workflow.errors}:null,

      nativeEvidence:nativeEvidence||null,

      actions:actions?{activeCount:actions.activeCount,seen:actions.seen,errors:actions.errors}:null,

      responses:responses?{rejections:responses.rejections,stageAdvances:responses.stageAdvances,consoleCapture:responses.consoleCapture}:null,

      orchestrator:orchestrator?{phase:orchestrator.phase,owner:orchestrator.owner,stall:orchestrator.stall,blockedRepairs:orchestrator.blockedRepairs}:null,

      executor:executor?{enabled:executor.enabled,lastReason:executor.lastReason,actions:executor.actions,successes:executor.successes}:null,

      decision:decision?{confirmed:decision.confirmed?.primary||null,

        latest:decision.latest?.primary||null,errors:decision.errors}:null};

  }

  NS.doctor=Object.freeze({version:'10.7.0',audit,

    report(){const result=audit();console.table(result.checks);return result;},

    status(){return {version:'10.7.0',readOnly:true,runs};}});

})();

 

/* V11.9 COMBAT LEARNING BUILD SELF-CHECK (passive; no RPC, interval, or game hook). */

 

(() => {

  'use strict';

  if(typeof window==='undefined')return;

  const W=window;

  

  function snapshot(show=false){

    const expected={

      core:!!W.KVPV?.core,

      hitRun:W.KVPV_HITRUN1?.version==='12.0.0',

      smartDodge112:typeof W.KVPV_TQ112?.status==='function',

      castObserver113:typeof W.KVPV_TQ113?.status==='function',

      smartDodge114:typeof W.KVPV_TQ114?.status==='function',

      companionKite115:W.KVPV_TQ115?.version==='11.6.0',

      smartSkill117:W.KVPV_TQ117?.version==='11.7.0',

      companionCombat118:W.KVPV_TQ118?.version==='11.8.0',

      combatLearning119:W.KVPV_TQ119?.version==='11.9.0',

      unifiedCombatV12:W.KVPV_V12_COMBAT?.version==='12.0.0',

      autoBoss:W.KVPV_HITRUN_AUTO?.version==='12.0.0'

    };

    const missing=Object.keys(expected).filter(k=>!expected[k]);

    const actor=String((typeof _Ba==='undefined'?null:_Ba?._rJ?._O$?.ins?.actorId)??'');

    const actorReady=!!actor&&actor===String(W.__KVPV_OWN_ACTOR_ID??'');

    const result={version:'12.0.0-unified-combat',actorReady,valid:actorReady&&!missing.length,

      modules:expected,missing,hitRun:W.KVPV_HITRUN1?.status?.(false)||null,

      kite:W.KVPV_TQ115?.status?.(false)||null,

      smartSkill:W.KVPV_TQ117?.status?.(false)||null,

      companionCombat:W.KVPV_TQ118?.status?.(false)||null,

      combatLearning:W.KVPV_TQ119?.status?.(false)||null,

      note:'A valid install does not prove that movement or companion damage works on the server.'};

    if(show)console.table([{version:result.version,actorReady,valid:result.valid,

      missing:missing.join(',')||'none',hitRunPhase:result.hitRun?.phase||'missing',

      kiteReason:result.kite?.lastSkipReason||'unknown'}]);

    return result;

  }

  W.KVPV_BUILD_CLEAN=Object.freeze({version:'12.0.0',status:snapshot});

  const boot=snapshot(false);

  if(boot.valid)console.info('[KVPV CLEAN] V12.0 ready. Diagnostics: KVPV_BUILD_CLEAN.status(true)');

  else console.warn('[KVPV CLEAN] Some modules were not loaded. Run KVPV_BUILD_CLEAN.status(true) after checking the game-frame.');

})();



/* V12.0 one-click diagnostics. Read-only: no auto-arm, RPC, timer, or hooks. */

 

(() => {

  'use strict';

  const W=window;

  

  function status(show=true){

    const a=W.KVPV_HITRUN_AUTO?.status?.(false)||{};

    const h=W.KVPV_HITRUN1?.status?.(false)||{};

    const result={version:'12.0.0',fullVerified:W.KVPV_BUILD_CLEAN?.status?.(false)?.valid===true,

      controller:h.version||null,controllerRunning:h.running===true,

      phase:h.phase||null,controllerReason:h.reason||null,lastError:h.lastError||a.lastError||'',

      autoVersion:a.version||null,autoEnabled:a.enabled===true,autoMode:a.lastMode||null,

      autoBlocked:a.lastBlocked||null,attemptedBoss:a.attemptedKey||null,

      recovery:a.recovery||null,

      note:'Manual stop and dangerous/no-healing errors never auto-restart; V11.15 REBUILT OFF may be from an independent snippet.'};

    if(show)console.table([result]);return result;

  }

  W.KVPV_HITRUN_FIX=Object.freeze({version:'12.0.0',status});

})();



/* ==== V12.1 COMBAT PERFORMANCE - PASSIVE PHASE METRICS ==== */

 

(() => {

  'use strict';

  const W=window;

  const EXIST=W.KVPV_V121_PERF;

  if(EXIST?.version==='12.1.0')return;

  const C={enabled:true, maxEncounters:25, maxRecent:12,

    minIntervalMs:250, maxIntervalMs:5000};

  let active=null, completed=[], nextId=1, skipped=0, faults=0, lastError='';

  const PHASES=['FIGHT','RETREAT','DODGE','KITE'];

  const finite=n=>typeof n==='number'&&Number.isFinite(n);

  const num=n=>finite(n)?n:null;

  const pct=n=>finite(n)&&n>=0&&n<=100?n:null;

  const rounded=(n,d=2)=>finite(n)?Number(n.toFixed(d)):null;

  const bucket=(p)=>p==='KITE_OUT'||p==='KITE_IN'?'KITE':PHASES.includes(p)?p:'OTHER';

  function safeText(v,limit=80){return String(v??'').slice(0,limit);}

  function empty(sample){

    return {id:nextId++, bossId:safeText(sample.bossId,64),

      bossName:safeText(sample.bossName||'Unknown',80),

      scene:safeText(sample.scene,40), bossTypeId:safeText(sample.bossTypeId,40),

      startedAt:sample.at,endedAt:null,endReason:'',

      samples:0,deltaSamples:0,phaseTransitions:0,

      phaseMs:{FIGHT:0,RETREAT:0,DODGE:0,KITE:0},

      transitionUncertainMs:0,unobservedGapMs:0,gaps:0,

      hpLostPctPts:0,hpHealedPctPts:0,

      observedBossHpLossPctPts:0,bossHpGainEvents:0,

      dangerousDrops:0,events:[],last:null};

  }

  function record(s,kind,from,to,detail=''){

    s.events.push({at:Date.now(),kind,from,to,detail:safeText(detail,100)});

    if(s.events.length>C.maxRecent)s.events.shift();

  }

  function totalMs(s){return PHASES.reduce((n,k)=>n+s.phaseMs[k],0);}

  

  function snapshot(s){

    if(!s)return null;

    const timed=totalMs(s);

    const phaseSeconds=Object.fromEntries(PHASES.map(p=>[p,rounded(s.phaseMs[p]/1000)]));

    const durationMs=(s.endedAt??s.last?.at??s.startedAt)-s.startedAt;

    return {id:s.id,bossId:s.bossId,bossName:s.bossName,scene:s.scene,

      bossTypeId:s.bossTypeId,active:s.endedAt===null,

      startedAt:s.startedAt,endedAt:s.endedAt,endReason:s.endReason,

      samples:s.samples,deltaSamples:s.deltaSamples,phaseTransitions:s.phaseTransitions,

      phaseSeconds,observedSeconds:rounded(timed/1000),

      fightSharePct:timed?rounded(100*s.phaseMs.FIGHT/timed,1):null,

      dodgeSharePct:timed?rounded(100*s.phaseMs.DODGE/timed,1):null,

      retreatSharePct:timed?rounded(100*s.phaseMs.RETREAT/timed,1):null,

      kiteSharePct:timed?rounded(100*s.phaseMs.KITE/timed,1):null,

      elapsedSeconds:rounded(Math.max(0,durationMs)/1000),

      transitionUncertainSeconds:rounded(s.transitionUncertainMs/1000),

      unobservedGapSeconds:rounded(s.unobservedGapMs/1000),

      gaps:s.gaps,hpLostPctPts:rounded(s.hpLostPctPts),

      hpHealedPctPts:rounded(s.hpHealedPctPts),

      observedBossHpLossPctPts:rounded(s.observedBossHpLossPctPts),

      bossHpGainEvents:s.bossHpGainEvents,dangerousDrops:s.dangerousDrops,

      // Other players, summons and DOT can damage this target. Never claim personal DPS.

      personalDps:null,

      bossHpLossPerObservedSecond:timed?rounded(s.observedBossHpLossPctPts/timed*1000,4):null,

      recent:s.events.slice(),note:'Client HP snapshots, not server-confirmed personal DPS. Background gaps and uncertain phase transitions are excluded from phase durations.'};

  }

  function finish({at=Date.now(),reason='stopped'}={}){

    if(!active)return null;

    const s=active;active=null;

    s.endedAt=finite(at)?Math.max(s.startedAt,at):Date.now();

    s.endReason=safeText(reason,120);s.last=null;

    completed.push(s);

    if(completed.length>C.maxEncounters)completed.shift();

    return snapshot(s);

  }

  function observe(raw){

    if(!C.enabled)return false;

    try{

      if(!raw||!finite(raw.at)||!raw.bossId||

         !finite(raw.hpPct)||pct(raw.hpPct)===null){skipped++;return false;}

      const sample={at:raw.at,bossId:safeText(raw.bossId,64),

        bossName:raw.bossName,bossTypeId:raw.bossTypeId,scene:raw.scene,

        phase:bucket(raw.phase),hpPct:raw.hpPct,bossHpPct:pct(raw.bossHpPct)};

      if(sample.phase==='OTHER'){skipped++;return false;}

      if(active&&(active.bossId!==sample.bossId||active.scene!==safeText(sample.scene,40)))

        finish({at:sample.at,reason:'boss/scene changed'});

      if(!active)active=empty(sample);

      const s=active,prev=s.last;

      if(prev){

        const dt=sample.at-prev.at;

        if(dt<C.minIntervalMs||!finite(dt)){skipped++;return false;}

        if(prev.phase!==sample.phase){s.phaseTransitions++;record(s,'phase',prev.phase,sample.phase);}

        if(dt>C.maxIntervalMs){s.gaps++;s.unobservedGapMs+=dt;

          record(s,'gap',prev.phase,sample.phase,'timer gap '+dt+'ms');}

        else {

          s.deltaSamples++;

          if(prev.phase===sample.phase)s.phaseMs[sample.phase]+=dt;

          else s.transitionUncertainMs+=dt;

          const hpDelta=sample.hpPct-prev.hpPct;

          if(hpDelta<0){s.hpLostPctPts+=-hpDelta;if(hpDelta<=-20)s.dangerousDrops++;}

          else if(hpDelta>0)s.hpHealedPctPts+=hpDelta;

          if(prev.bossHpPct!==null&&sample.bossHpPct!==null){

            const loss=prev.bossHpPct-sample.bossHpPct;

            if(loss>0)s.observedBossHpLossPctPts+=loss;

            else if(loss<0)s.bossHpGainEvents++;

          }

        }

      }

      s.samples++;s.last=sample;

      return true;

    }catch(e){faults++;lastError=String(e);return false;}

  }

  

  function status(print=false){

    const result={version:'12.1.0',enabled:C.enabled,active:active?snapshot(active):null,

      completedCount:completed.length,skipped,faults,lastError,

      completed:completed.slice(-10).map(snapshot)};

    if(print){

      const a=result.active;

      console.table([a?{boss:a.bossName,FIGHT:a.phaseSeconds.FIGHT,

        RETREAT:a.phaseSeconds.RETREAT,DODGE:a.phaseSeconds.DODGE,

        KITE:a.phaseSeconds.KITE,hpLost:a.hpLostPctPts,

        bossHpLoss:a.observedBossHpLossPctPts,gaps:a.gaps}:

        {boss:'No active Boss',FIGHT:0,RETREAT:0,DODGE:0,KITE:0}]);

      if(result.completed.length)console.table(result.completed.map(x=>({

        boss:x.bossName,elapsed:x.elapsedSeconds,fight:x.phaseSeconds.FIGHT,

        retreat:x.phaseSeconds.RETREAT,dodge:x.phaseSeconds.DODGE,

        kite:x.phaseSeconds.KITE,hpLost:x.hpLostPctPts})));

    }

    return result;

  }

  

  function report(){return {version:'12.1.0',generatedAt:new Date().toISOString(),

    active:active?snapshot(active):null,encounters:completed.map(snapshot),

    caveat:'HP Boss loss is not personal DPS; other players may contribute. No requests sent.'};}

  

  function exportJSON(){

    const output=JSON.stringify(report(),null,2);

    if(typeof Blob==='undefined'||typeof document==='undefined'||

       typeof URL==='undefined'||typeof URL.createObjectURL!=='function')return output;

    const url=URL.createObjectURL(new Blob([output],{type:'application/json;charset=utf-8'}));

    try{

      const a=document.createElement('a');a.href=url;

      a.download='KVPV_V121_COMBAT_'+new Date().toISOString().slice(0,10)+'.json';

      (document.body||document.documentElement).appendChild(a);a.click();a.remove();

    }finally{setTimeout(()=>URL.revokeObjectURL(url),1000);}

    return output;

  }

  W.KVPV_V121_PERF=Object.freeze({version:'12.1.0',config:C,

    status,report,exportJSON,

    reset(){active=null;completed=[];skipped=0;faults=0;lastError='';nextId=1;return status();},

    stop(){C.enabled=false;finish({reason:'telemetry disabled'});return status();},

    start(){C.enabled=true;return status();},

    _observe:observe,_end:finish});

  console.info('[KVPV V12.1] Combat Performance ready. KVPV_V121_PERF.status(true)');

})();

/* ==== END V12.1 COMBAT PERFORMANCE ==== */



/* ==== KVPV V12.3 - SMART BOSS SURVIVAL ====
 * Read-only HP damage observation and early retreat decision.
 * Shares the existing HitRun loop and movement owner. No extra timer or RPC.
 * Client damage observations do not identify individual Boss skills.
 */

 

(() => {

  'use strict';

  const W=window;

  const C={enabled:true,minDamagePct:3,largeHitPct:14,

    burstHits:2,burstDamagePct:10,windowMs:4200,

    maxDecisionAgeMs:1700,safetyBufferPct:5,

    maxEarlyHpPct:70,maxExtraPct:25,maxHistory:40};

  const S={bossId:'',events:[],recent:[],observations:0,ignored:0,

    earlyRetreats:0,lastDecision:null,lastError:'',errors:0};

  const ok=n=>typeof n==='number'&&Number.isFinite(n);

  const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));

  function trim(at){

    S.events=S.events.filter(x=>at>=x.at&&at-x.at<=C.windowMs);

  }

  function reset({bossId=''}={}){

    S.bossId=String(bossId);S.events=[];S.lastDecision=null;

    return true;

  }

  function observe({at,bossId,lossPct}={}){

    if(!C.enabled)return false;

    if(!ok(at)||!ok(lossPct)||lossPct<0||lossPct>100){S.ignored++;return false;}

    const id=String(bossId||'');

    if(!id)return false;

    if(S.bossId!==id)reset({bossId:id});

    trim(at);S.observations++;

    if(lossPct<C.minDamagePct)return false;

    S.events.push({at,lossPct});

    if(S.events.length>C.maxHistory)S.events.shift();

    return true;

  }

  function decision({at,hpPct,leavePct,bossId}={}){

    const no=reason=>({retreat:false,reason});

    if(!C.enabled)return no('disabled');

    if(!ok(at)||!ok(hpPct)||!ok(leavePct)||hpPct<0||hpPct>100||leavePct<0||leavePct>100)

      return no('invalid sample');

    if(!bossId||String(bossId)!==S.bossId)return no('boss/session not observed');

    trim(at);

    const e=S.events;

    if(!e.length||at-e[e.length-1].at>C.maxDecisionAgeMs)return no('no recent damage');

    const greatest=e.reduce((v,x)=>Math.max(v,x.lossPct),0);

    const total=e.reduce((v,x)=>v+x.lossPct,0);

    const strong=greatest>=C.largeHitPct;

    const burst=e.length>=C.burstHits&&total>=C.burstDamagePct;

    if(!strong&&!burst)return no('insufficient danger evidence');

    // Raise the retreat trigger only. NEVER lower native safety thresholds.

    const predicted=strong?greatest:total;

    const earlyTrigger=clamp(leavePct+Math.min(C.maxExtraPct,predicted+C.safetyBufferPct),

      leavePct,C.maxEarlyHpPct);

    if(hpPct<=leavePct)return no('native low HP retreat takes priority');

    if(hpPct>earlyTrigger)return no('HP above early risk threshold');

    const kind=strong?'large hit':'short burst';

    const value={retreat:true,reason:kind+' observed',

      hpPct:Number(hpPct.toFixed(2)),thresholdPct:Number(earlyTrigger.toFixed(2)),

      hitCount:e.length,observedLossPct:Number(total.toFixed(2)),at};

    S.earlyRetreats++;S.lastDecision=value;

    S.recent.push(value);if(S.recent.length>20)S.recent.shift();

    S.events=[]; // decision consumed; prevent duplicate action

    return value;

  }

  

  function status(print=false){

    const out={version:'12.3.0',enabled:C.enabled,bossId:S.bossId,

      observations:S.observations,ignored:S.ignored,recentHits:S.events.slice(),

      earlyRetreats:S.earlyRetreats,lastDecision:S.lastDecision,

      recent:S.recent.slice(-10),errors:S.errors,lastError:S.lastError,

      policy:'Earlier retreat on confirmed client HP losses only; no RPC, no new mover or timer. Server causality not proven.'};

    if(print){console.table([{enabled:out.enabled,bossId:out.bossId,

      earlyRetreats:out.earlyRetreats,observations:out.observations,

      recentHits:out.recentHits.length,errors:out.errors}]);

      if(out.recent.length)console.table(out.recent);}

    return out;

  }

  W.KVPV_V123_SURVIVAL=Object.freeze({version:'12.3.0',config:C,

    status,reset,enable(v=true){C.enabled=!!v;return status(false);},

    _observe:observe,_decision:decision});

  console.info('[KVPV V12.3] Smart Boss Survival ready: KVPV_V123_SURVIVAL.status(true)');

})();

/* ==== END V12.3 ==== */



/* ==== KVPV V12.4 - COMBAT EFFICIENCY ADVISOR ====
 * Measures fight / dodge / retreat / kite time using the EXISTING V12 sample.
 * Does not claim individual DPS from Boss HP. No new RPC, native mover or timer.
 * Manual outer-hold adjustment ONLY, and ONLY after sufficient safe observations.
 */

 

(() => {

  'use strict';

  const W=window;

  if(W.KVPV_V124_EFFICIENCY?.version==='12.4.0')return;

  const C={enabled:true, minSamples:12, minObservedSeconds:25,

    minCompletedKites:8, minOuterReached:5, minSafeReturnRate:.85,

    maxHpAbortRate:.12, maxRetreatShare:.35, lowFightShare:.58,

    maxIntervalMs:4000, deltaHoldMs:100, minOuterHoldMs:800,

    maxRecentCycles:32, maxHistory:20};

  const PHASES=['FIGHT','RETREAT','DODGE','KITE'];

  const S={bossId:'',samples:0,phaseMs:{FIGHT:0,RETREAT:0,DODGE:0,KITE:0},

    hpLost:0,bossHpLost:0,gaps:0,uncertain:0,last:null,cycles:[],

    changes:0,previousHold:null,appliedBoss:'',lastAction:'',errors:0,

    lastError:'',history:[]};

  const finite=x=>typeof x==='number'&&Number.isFinite(x);

  const r=(x,p=1)=>Math.round(x*10**p)/10**p;

  const phase=x=>x==='KITE_OUT'||x==='KITE_IN'?'KITE':PHASES.includes(x)?x:null;

  

  function note(what,detail){S.history.push({at:Date.now(),what,detail:String(detail).slice(0,120)});

    if(S.history.length>C.maxHistory)S.history.shift();}

  function reset(bossId){

    const next=String(bossId||'');

    if(next===S.bossId)return false;

    // Never let a Boss-specific trial silently carry into the next Boss.

    if(finite(S.previousHold)){

      const k=W.KVPV_TQ115?.config;

      const expected=Math.max(C.minOuterHoldMs,S.previousHold-C.deltaHoldMs);

      if(k?.outerHoldMs===expected){k.outerHoldMs=S.previousHold;

        note('restore','Boss changed, restored outer hold to '+S.previousHold+'ms');}

    }

    S.bossId=next;S.samples=0;S.phaseMs={FIGHT:0,RETREAT:0,DODGE:0,KITE:0};

    S.hpLost=0;S.bossHpLost=0;S.gaps=0;S.uncertain=0;S.last=null;

    S.cycles=[];S.changes=0;S.appliedBoss='';S.previousHold=null;

    note('boss','Tracking '+next);return true;

  }

  function observe(x){

    if(!C.enabled||!x||!x.bossId||!finite(x.at)||!finite(x.hpPct))return false;

    const p=phase(x.phase);if(!p)return false;

    const id=String(x.bossId);if(id!==S.bossId)reset(id);

    const sample={at:x.at,p,hp:x.hpPct,bhp:finite(x.bossHpPct)?x.bossHpPct:null};

    const prev=S.last;

    if(prev){

      const dt=sample.at-prev.at;

      if(dt<=0)return false;

      if(dt>C.maxIntervalMs){S.gaps++;}

      else if(prev.p===sample.p){

        S.phaseMs[p]+=dt;

        S.hpLost+=Math.max(0,prev.hp-sample.hp);

        if(prev.bhp!==null&&sample.bhp!==null)

          S.bossHpLost+=Math.max(0,prev.bhp-sample.bhp);

      } else S.uncertain+=dt;

    }

    S.last=sample;S.samples++;return true;

  }

  function cycle(x){

    if(!C.enabled||!x||!finite(x.startedAt)||!finite(x.endedAt)||x.endedAt<x.startedAt)

      return false;

    if(!S.bossId)return false;

    const reason=String(x.reason||'');

    const row={durationMs:Math.max(0,x.endedAt-x.startedAt),

      returned:x.returnWithinClientRange===true,

      outer:x.reachedClientOuterWaypoint===true,

      hpAbort:/\bhp\b|low hp/i.test(reason),

      petFar:Math.max(0,Number(x.petFar)||0),reason:reason.slice(0,80)};

    S.cycles.push(row);if(S.cycles.length>C.maxRecentCycles)S.cycles.shift();

    return true;

  }

  function propose(){

    const ms=Object.values(S.phaseMs).reduce((a,b)=>a+b,0);

    const n=S.cycles.length;

    const successful=S.cycles.filter(x=>x.returned).length;

    const outer=S.cycles.filter(x=>x.outer).length;

    const hpAborts=S.cycles.filter(x=>x.hpAbort).length;

    const farPetHits=S.cycles.reduce((a,x)=>a+x.petFar,0);

    const fightShare=ms?S.phaseMs.FIGHT/ms:null;

    const retreatShare=ms?S.phaseMs.RETREAT/ms:null;

    const summary={bossId:S.bossId,samples:S.samples,observedSeconds:r(ms/1000),

      completedKites:n,safeReturns:successful,outerReached:outer,hpAborts,

      petFarFlags:farPetHits,fightSharePct:fightShare===null?null:r(fightShare*100),

      retreatSharePct:retreatShare===null?null:r(retreatShare*100)};

    const no=reason=>({eligible:false,action:'none',reason,summary});

    if(!C.enabled)return no('Efficiency advisor disabled');

    if(!S.bossId)return no('No Boss tracked');

    if(S.samples<C.minSamples||ms<C.minObservedSeconds*1000)

      return no('Not enough continuous phase telemetry');

    if(n<C.minCompletedKites)return no('Not enough completed Kite cycles');

    if(outer<C.minOuterReached)return no('Too few confirmed outer waypoints');

    if(successful/n<C.minSafeReturnRate||hpAborts/n>C.maxHpAbortRate)

      return no('Unsafe or interrupted Kite returns; keep safety settings');

    if(retreatShare>C.maxRetreatShare)

      return no('Retreat time is high; optimize survival before attack uptime');

    if(farPetHits>0)return no('Observed flagged pet hits at outer waypoint: preserve hold for evaluation');

    if(fightShare===null||fightShare>=C.lowFightShare)

      return no('Fight-time share is adequate; no shortening proposed');

    const kite=W.KVPV_TQ115;

    const old=Number(kite?.config?.outerHoldMs);

    if(!kite?.config?.enabled||!finite(old))return no('Kite not available');

    const next=Math.max(C.minOuterHoldMs,old-C.deltaHoldMs);

    if(next>=old)return no('Outer hold already at conservative minimum');

    if(S.changes>0)return no('An adjustment has already been made for this Boss');

    return {eligible:true,action:'shorten_outer_hold',fromMs:old,toMs:next,

      reason:'After stable measured returns, trial a 100ms shorter outer hold; never adjust HP thresholds',

      summary,caution:'Client coords and flagged pet hits do not establish true server range.'};

  }

  function apply(){

    const p=propose();if(!p.eligible)return {applied:false,...p};

    const k=W.KVPV_TQ115?.config;

    const ctl=W.KVPV_V12_COMBAT?.status?.(false);

    const h=Number(ctl?.hpPct);

    if(ctl?.phase!=='FIGHT'||ctl?.hitRunRunning!==true||!finite(h)||h<65)

      return {applied:false,reason:'Apply only during safe native FIGHT at >=65% HP',proposal:p};

    if(k?.outerHoldMs!==p.fromMs)

      return {applied:false,reason:'Kite settings changed since proposal',proposal:p};

    S.previousHold=p.fromMs;k.outerHoldMs=p.toMs;

    S.changes++;S.appliedBoss=S.bossId;

    S.lastAction=`outerHoldMs ${p.fromMs} -> ${p.toMs} on Boss ${S.bossId}`;

    note('apply',S.lastAction);

    return {applied:true,fromMs:p.fromMs,toMs:p.toMs,bossId:S.bossId,

      note:'Manual in-memory trial. Restores on F5; no RPC.'};

  }

  function undo(){

    if(!finite(S.previousHold))return {restored:false,reason:'No trial adjustment to restore'};

    const kite=W.KVPV_TQ115?.config;

    if(!kite)return {restored:false,reason:'Kite config unavailable'};

    const previous=S.previousHold;

    // User may have made a manual change later; never blindly overwrite that change.

    const expected=Math.max(C.minOuterHoldMs,previous-C.deltaHoldMs);

    if(kite.outerHoldMs!==expected)

      return {restored:false,reason:'Outer hold was modified after V12.4 trial'};

    kite.outerHoldMs=previous;S.previousHold=null;note('undo','Restored '+previous+'ms');

    return {restored:true,outerHoldMs:previous};

  }

  

  function status(print=false){

    const out={version:'12.4.0',enabled:C.enabled,bossId:S.bossId,samples:S.samples,

      phaseSeconds:Object.fromEntries(PHASES.map(p=>[p,r(S.phaseMs[p]/1000)])),

      observedBossHpLossPctPts:r(S.bossHpLost),personalDps:null,

      observedHpLostPctPts:r(S.hpLost),gaps:S.gaps,uncertainSeconds:r(S.uncertain/1000),

      recentCycles:S.cycles.slice(-8),changes:S.changes,lastAction:S.lastAction,

      recommendation:propose(),history:S.history.slice(-8),

      limitations:'Client HP losses are not server-verified individual DPS; no guarantee that faster Kite improves survival.'};

    if(print){console.table([{boss:out.bossId,samples:out.samples,

      FIGHT:out.phaseSeconds.FIGHT,DODGE:out.phaseSeconds.DODGE,

      RETREAT:out.phaseSeconds.RETREAT,KITE:out.phaseSeconds.KITE,

      eligible:out.recommendation.eligible,reason:out.recommendation.reason}]);}

    return out;

  }

  W.KVPV_V124_EFFICIENCY=Object.freeze({version:'12.4.0',config:C,status,propose,apply,undo,

    enable(v=true){C.enabled=!!v;return status();},

    _observe:observe,_cycle:cycle,_reset:reset});

  console.info('[KVPV V12.4] Combat Efficiency Advisor loaded (manual-only): KVPV_V124_EFFICIENCY.status(true)');

})();

/* ==== END V12.4 ==== */



/* V12.6 appended build marker; base HitRun controller version remains 12.0 intentionally. */
