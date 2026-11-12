/* Recovered native Daily core from verified historical V11.5 user file. No legacy timer/upgrade controller auto-start. */
(() => {
 'use strict';
 const W=window,actor=String(W.__KVPV_OWN_ACTOR_ID||'');
 if(!W.KVPV_V1||!actor||actor!==String(W._Ba?._rJ?._O$?.ins?.actorId??'')||W.__KVPV_UNIVERSAL_HALTED)return;
 if(W.KVPV_DAILY?.config)return; // preserve active jobs, ACK and pending on live reload
 const timers=W.KVPV_V1.timers;
 const __KVPV29={
  every(fn,ms){return timers.setInterval(fn,Math.max(250,Number(ms)||600));},
  cancel(id){if(id!=null)timers.clearInterval(id);},
  tag(){return true;}
 };




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
  // Preserve active FULL workers and pending server actions on hot update.
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
    tinhThanCloneId: '10228867268941', // duy nhat clone1
    tinhThanMainId: '10228867268946', // verified main actor for private Ma Than invitations
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
    smeltEnabled: {equip:false, holy:false, pet:false}, // V3.4 explicit: equip only; respect native game eligible filter
    
    
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
    enableTuyetHoc: false,
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
    stoppedAt:0, noticed:false,lastObservedAt:0
  };
  function tvData() {
    const m=_Ba?._Co?._Mo?.ins;
    let cfg=null;
    try {cfg=_ft?._h$?.ins?.getCfgByLv?.(m?.curLv);}catch(_){}
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
    const t=now();
    if(t-tuVuot.lastObservedAt<500)return;
    tuVuot.lastObservedAt=t;
    const d=tvData(),r=tuVuot.run;
    if(!d.m) return;
    if(Number.isFinite(d.level))tuVuot.lastLevel=d.level;
    if(d.m.auto===true)window.KVPV?.core?.scene?.renew?.('stage');
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
      progressOwner:window.KVPV_RED_DOT_MODULE?.ownsProgression?.()?'red-dot':timer?'daily':'stopped',
      currentJob:job?.type||'ranh',
      blockedReason:!C.enableTuVuot?'Da tat thu cong':
        tuVuot.stopped?(tuVuot.reason||'Da khoa'):
        !timer&&!window.KVPV_RED_DOT_MODULE?.ownsProgression?.()?'Auto Daily dang dung':job?('Dang lam '+job.type):
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
    try{window.KVPV?.eventAudit?.recordProof?.({key:'dinhcao',kind:'reward-context-confirmed',source:'native 5038 while floor 9 and claim pending'});}catch(_){}
    log('🎁 ĐỈNH CAO TẦNG 9: ĐÃ NHẬN RƯƠNG (ACK 5038)');
  }
  function dcWatchClaim(){
    if(dcClaimListening||typeof _Sa==='undefined'||typeof _Sa.notify?.on!=='function')return;
    _Sa.notify.on(5038,dcClaimListener,dcOnGatherSuccess);dcClaimListening=true;
  }
  function dcUnwatchClaim(){
    if(!dcClaimListening)return;
    try{_Sa.notify.off(5038,dcClaimListener,dcOnGatherSuccess);}catch(_){}
    dcClaimListening=false;
  }
  function dcTopNpcId(){
    
    
    let steps=null;
    try{steps=_ft?._wHt?.ins?.getCfgByLevel?.(9)?.[8];}catch(_){}
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
    try{cfg=_ft?._gZ?.inst?.getCfgById?.(120)||null;}catch(_){}
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
      claims:Array.from(tuLaClaims.entries())}));}catch(_){}
  }
  function loadTuLaLocks(){
    try{const x=JSON.parse(sessionStorage.getItem(TU_LA_LOCK_KEY)||'null');
      if(x?.day!==tuLaDate||!Array.isArray(x.claims))return;
      for(const [id,row] of x.claims){
        if(Number.isInteger(id)&&id>0&&row&&['waiting','unconfirmed','acked'].includes(row.status))
          tuLaClaims.set(id,row);
      }
    }catch(_){}
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
        try{window.KVPV?.eventAudit?.recordProof?.({key:'daotri',kind:'reward-requested',source:'native GetInCopyAward called'});}catch(_){}
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
    {key:'tien_ton', name:'Tiên Tôn Đấu Kỹ', slots:['19:30-19:45'], action:'trace'},
    {key:'diet_tho_hao', name:'Diệt Thổ Hào', slots:['20:00-20:30'], days:[2,4,6]},
    {key:'vinh_du', name:'Chiến Trường Vinh Dự', slots:['19:45-20:00'],action:'auto'},
    {key:'tranh_ba_tu_phuong', name:'Tranh Bá Tứ Phương', slots:['20:30-20:45'],days:[6]},
    {key:'tranh_ba_dinh_cao', name:'Tranh Bá Đỉnh Cao', slots:['21:00-21:30'], action:'auto'},
    {key:'tien_ma', name:'Tiên Ma Quyết Chiến', slots:['20:30-20:45'], days:[5]},
    {key:'tu_la', name:'Tu La Lôi Đài', slots:['20:30-20:45'], days:[0,1,2,3,4], action:'auto'},
    {key:'tien_duyen_tac_chien', name:'Tiên Duyên Tác Chiến', slots:['20:00-20:25'], days:[1]},
    {key:'chien_doi', name:'Chiến Đội Mạnh Nhất', slots:['20:00-20:27'], days:[3]},
    {key:'sa_thanh', name:'Quyết Chiến Sa Thành', slots:['20:00-20:30'], days:[2], unlock:'Liên server đủ 45 ngày'},
    {key:'tam_tien', name:'Tầm Tiên Vấn Đạo', slots:['19:00-19:30'], days:[2,6], unlock:'Liên server đủ 30 ngày'},
    {key:'thien_the', name:'Thiên Thể 8 Tầng', slots:['21:00-21:30'], days:[0,1,3,5], unlock:'Liên server đủ 30 ngày'},
    {key:'honghoang', name:'Hồng Hoang Bí Bảo', slots:['11:30-12:00','20:45-21:00'], action:'auto', priority:1},
    {key:'tientuyen', name:'BOSS Chiến Tuyến Lv.1300', slots:['12:00-12:30','21:30-22:00'], action:'auto'},
    {key:'lanhdia', name:'Lãnh Địa BOSS', slots:['12:30-12:45'], action:'auto'},
    {key:'dua_thuyen', name:'Đua Thuyền Rồng', slots:['15:00-15:30']},
    {key:'ho_tong', name:'Hộ Tống x2', slots:['15:15-17:00','21:45-22:45']},
    {key:'trieu_hoi', name:'Triệu Hồi Hỗ Trợ', slots:['12:40-13:45']}
  ];
  const SCHEDULE_BY_KEY = Object.fromEntries(EVENT_SCHEDULE.map(x => [x.key,x]));
  let configuredTimeline=null;
  const timelineReadiness=key=>{
    switch(key){
      case 'honghoang': {
        const h=hongData();return !!(C.enableHongHoang&&h.m&&!h.full&&h.map&&h.xianFa>0);
      }
      case 'vinh_du':return !!(C.enableVinhDu&&vinhData().hasTeam);
      case 'tranh_ba_dinh_cao': {
        const d=dcData();return !!(C.enableDinhCao&&d.configMatch&&d.eventTimeMatch&&d.unlocked);
      }
      case 'tu_la':return !!(C.enableTuLa && tuLaDay());
      case 'dao_nguyen':return !!C.enableDaoTri;
      default:return true;
    }
  };
  function configureTimeline(){
    const timeline=window.KVPV?.timeline;
    if(!timeline||timeline===configuredTimeline)return false;
    timeline.setSchedule?.(EVENT_SCHEDULE);
    timeline.setReadiness?.(timelineReadiness);
    configuredTimeline=timeline;
    return true;
  }
  // V10.2: use the same verified schedule in the pure reservation planner.
  configureTimeline();
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
        try {n.off(x.event,smeltHandlers,smeltHandlers[x.key]);} catch(e){}
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
      map:h.map, baseline:h.count, lastProgress:now(), lastRetargetCount:h.count, exitAttempts:0
    });
    enterApi.rqEtScene(h.map); // existing native call; return is NOT server ACK
    try{window.KVPV?.actions?.recordCall?.({kind:'hong-enter',targetMap:h.map,baseline:h.count});}catch(_){}
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
          try{window.KVPV?.actions?.recordCall?.({kind:'hong-exit'});}catch(_){}
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
      try{window.KVPV?.actions?.recordCall?.({kind:'hong-exit'});}catch(_){}
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
      try{window.KVPV?.actions?.recordCall?.({kind:'hong-exit'});}catch(_){}
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
      try{window.KVPV?.actions?.recordCall?.({kind:'hong-target',baseline:h.count});}catch(_){}
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
    enableRewards:false, enableRingUpgrade:false, enableCardDaily:false,
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
    if(!C.autoTeam || !C.enableTinhThan || scene()!==34)return;
    if(window.KVPV_BOSS_TEAM?.ownsBossTeams?.()===true){team.mode='private_team_module';return;}
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
    const wantedTier=Number(j.target?.tier)||Number(C.tinhThanTang);
    const valid=type===wantedTier && line>0 && rows.length>0 &&
      rows.every(x=>alive(x.flag)||dead(x.flag));
    begin('tinhthan',valid?'fighting':'team_only',{
      type,layer,line,rows:valid?rows.map(x=>x.raw):[],selected:null,lastSelect:0
    });teamReset();
    log('🌟 Tiếp quản Tinh Thần (tổ đội tự động)');return true;
  }
  function starHighestUnlocked(p) {
    const list=p?._wWn;
    if (!list || !Array.isArray(list.arrs) || typeof p._CJ!=='function') return Number(C.tinhThanTang)||0;
    for (let tier=list.arrs.length; tier>=1; tier--) {
      try { const unlocked=p._CJ(tier); if (unlocked===true || unlocked===1) return tier; } catch (_) {}
    }
    return Number(C.tinhThanTang)||0;
  }
  function followStar(j,t) {
    const r=starRefs();
    if (!r) return finish(false,'Không tải được Tinh Thần',8000);
    if (j.step==='opening') {
      if (t-j.at>20000) return finish(false,'Mở Tinh Thần quá giờ',8000);
      const p=r.ui.isOpened?.(605)?r.ui.getPanelById?.(605):null;
      if (!p || p.destroyed || !p.parent) return;
      const type=Number(p._bvt),layer=Number(p._wvt),line=Number(p._Tvt);
      const targetTier=starHighestUnlocked(p);
      j.target.tier=targetTier;
      if (type!==targetTier) {
        
        
        const idx=targetTier-1, list=p._wWn;
        if (!j.target.tierChangeAttempted && list && Array.isArray(list.arrs) &&
            idx>=0 && idx<list.arrs.length && typeof p._CJ==='function' &&
            typeof p._gRn==='function') {
          let unlocked=false;
          try{unlocked=p._CJ(targetTier)===true;}catch(e){
            log('🌟 Chưa đọc được điều kiện mở Tinh Thần: '+String(e));
          }
          if(unlocked){
            j.target.tierChangeAttempted=true;
            try{
              list.selIdx=idx;p._gRn.call(p);
              log('🌟 Tinh Thần: chọn tầng cao nhất đã mở ('+targetTier+') bằng nút native');
              return; 
            }catch(e){
              r.ui.close?.(605);
              return finish(false,'Lỗi chuyển loại Tinh Thần: '+String(e),15000);
            }
          }
        }
        if (t-j.started<8000)return;
        r.ui.close?.(605);
        return finish(false,'Không chọn được tầng Tinh Thần cao nhất đã mở ('+targetTier+')',15000);
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
    }catch(e){}
    composeState.watcher=false;composeState.onAck=null;
  }
  function startCompose() {
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
    
    if(refresh && typeof m.checkRP==='function')try{m.checkRP();}catch(e){}
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
    }catch(e){}
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

  
  // starting the general daily scheduler.
  const redDotNextAt={36:0,37:0,44:0,53:0,377:0};
  function redDotDispatch(id) {
    id=Number(id);
    if(![36,37,44,377].includes(id)||!red(id))return {handled:false,reason:'red_dot_inactive'};
    if(now()<redDotNextAt[id])return {handled:false,reason:'red_dot_dispatch_cooldown'};
    if(job)return {handled:job.redDotId===id,reason:job.redDotId===id?'job_running':'another_job_running'};
    if(!common()||inTeam()||inMission()||_Ba?._rJ?._O$?.ins?.isDead===true)
      return {handled:false,reason:'unsafe_scene_context'};
    const stage=_Ba?._Co?._Mo?.ins;
    if(stage?.auto===true)return {handled:false,reason:'waiting_stage_stop'};
    if(id!==53&&id!==377&&typeof api()?.rqEtScene!=='function')return {handled:false,reason:'native_scene_rpc_unavailable'};
    if(id===36){
      const s=nhomData();
      if(!s?.yes||s.n<=0||!s.t)return {handled:false,reason:'group_boss_not_eligible'};
      enter('bossnhom',{map:Number(s.t[0]),id:s.t[2]},()=>api()?.rqEtScene?.(s.t[0],s.t[1],[],0,s.t[2]));
      job.redDotId=36;redDotNextAt[36]=now()+10000;
      return {handled:true,reason:'group_boss_entry_requested'};
    }
    if(id===37){
      const s=yeuData();
      if(!s?.n||!s.t)return {handled:false,reason:'demon_boss_not_eligible'};
      enter('yeuvuong',{map:Number(s.t[0]),id:s.t[2]},()=>api()?.rqEtScene?.(s.t[0],s.t[1],[],0,s.t[2]));
      job.redDotId=37;redDotNextAt[37]=now()+10000;
      return {handled:true,reason:'demon_boss_entry_requested'};
    }
    if(id===377){
      const s=tienDuyenData();
      if(!s?.yes)return {handled:false,reason:'marriage_copy_red_dot_clear'};
      if(!s.readied){startTienDuyen(s);return {handled:false,reason:'waiting_marriage_copy_times'};}
      if(!s.married)return {handled:false,reason:'not_married_no_entry'};
      if(!(s.remaining>0))return {handled:false,reason:'no_free_marriage_copy_attempts'};
      if(C.tienDuyenNoMerge&&s.merge)return {handled:false,reason:'merged_attempts_disabled'};
      if(!startTienDuyen(s))return {handled:false,reason:'marriage_copy_not_started'};
      job.redDotId=377;redDotNextAt[377]=now()+10000;
      return {handled:true,reason:'marriage_copy_entry_requested',remaining:s.remaining};
    }
    const s=manData();
    if(!s?.yes||!(s.strength>0)||s.autoItem||![31,54].includes(s.type)||!num(s.map)||!num(s.layer)||
       !s.ids.length||!s.ids.every(x=>alive(bossFlag(x))||dead(bossFlag(x)))||!s.ids.some(x=>alive(bossFlag(x))))
      return {handled:false,reason:'manhuang_not_eligible'};
    const free=Number(_Ba?._Ic?._aQ?.ins?.getBagLeftNumById?.(1));
    const threshold=Number(_ft?._gY?.ins?.getCfgById?.(10007)?.[2]?.[0]);
    if(!Number.isFinite(free)||!Number.isFinite(threshold)||free<=threshold)
      return {handled:false,reason:'manhuang_bag_space_guard'};
    enter('manhoang',{map:s.map,layer:s.layer,grade:s.grade,ids:s.ids},()=>api()?.rqEtScene?.(s.map,s.layer));
    log(`👹 Mãn Hoang: vào tầng cao nhất đã mở (grade ${s.grade}, layer ${s.layer}); chỉ dùng thể lực sẵn có`);
    job.redDotId=44;redDotNextAt[44]=now()+10000;
    return {handled:true,reason:'manhuang_highest_unlocked_floor_entry_requested',grade:s.grade,layer:s.layer};
  }
  const priorityEventJobs=new Set(['honghoang','vinhdu','daotri','tula','dinhcao','tientuyen','lanhdia']);
  let redDotEventCheckAt=0;
  let deferredRedDotJob=null;
  function resumeDeferredRedDotJob(){
    if(job||!deferredRedDotJob)return false;
    if(window.KVPV_EVENT_PRIORITY?.hold?.())return false;
    job=deferredRedDotJob;deferredRedDotJob=null;
    window.KVPV?.core?.scene?.acquire?.('daily',job.type);
    return true;
  }
  function redDotTick(){
    configureTimeline();
    const t=now();
    if(t>=redDotEventCheckAt){
      redDotEventCheckAt=t+250;
      try{
        eventScheduleTick();
        if(job&&!priorityEventJobs.has(job.type)){
          const suspended=job;job=null;
          try{dispatchFixedWindowV102(t,vnTime());}
          catch(e){job=suspended;throw e;}
          if(job&&priorityEventJobs.has(job.type))deferredRedDotJob=suspended;
          else job=suspended;
        }else dispatchFixedWindowV102(t,vnTime());
      }catch(e){console.warn('[LỊCH KVPV] Lỗi ưu tiên event:',e);}
    }
    if(job){const id=job.redDotId;follow();if(id&&!job)redDotNextAt[id]=now()+10000;
      if(!job&&deferredRedDotJob)resumeDeferredRedDotJob();
      if(deferredRedDotJob&&!job&&window.KVPV_EVENT_PRIORITY?.hold?.())
        return {active:true,eventPriority:true,job:'event_hold',step:'waiting_event_window_end'};
      return {active:!!job,eventPriority:!!job&&priorityEventJobs.has(job.type),job:job?.type||'idle',step:job?.step||'-'};}
    resumeDeferredRedDotJob();
    return {active:!!job,eventPriority:!!job&&priorityEventJobs.has(job.type),job:job?.type||'idle',step:job?.step||'-'};
  }

  // V10.2: eligibility callbacks contain only read-only model checks.
  // The timeline remains standalone and can be unit-tested without the game.
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
    
    if (t >= due.thanthu && !blocked('thanthu') && !W.KVPV_BEAST_ISLAND?.handlesInfinite?.()) {
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
    if (j.type==='thanthu' && W.KVPV_BEAST_ISLAND?.handlesInfinite?.())
      return finish(true,'Thần Thú chuyển cho bộ điều khiển Vô Hạn → tầng 2');
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
          const id=ids.includes(final) && alive(m?.getBsInfoById?.(final)?.[2]?.[0]) ? final :
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
    if(window.KVPV_RED_DOT_MODULE?.ownsProgression?.()){
      // The red-dot main loop owns progression and calls redDotTick for any handoff job.
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
    console.log('↻ Đã reset trạng thái tác vụ; chỉ red-dot điều phối tiếp.');
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
      TienTonDauKy:`19:30-19:45; ghi thao tác=${tienTonState.active}; số lệnh=${tienTonState.calls.length}; chưa auto tham chiến`
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
    delegateThanThu:()=>{if(job?.type!=='thanthu')return false;finish(true,'Thần Thú chuyển cho bộ điều khiển Vô Hạn → tầng 2');return true;},
    configureTimeline,
    redDotDispatch,redDotTick,
    smelt25Status:()=>{const d=smeltData(),ids=smeltEligible(d,'equip').map(x=>Number(x[2]));const r={enabled:C.smeltEnabled.equip,eligible:ids.length,threshold:25,draining:smeltDrainEquip,currentJob:job?.type||'rảnh',lastAck:smeltAck.equip,backoffUntil:smeltBackoff.equip||0,firstIds:ids.slice(0,25)};console.log('[SMELT25]',r);return r;},
    smelt25Stop:()=>{C.smeltEnabled.equip=false;smeltDrainEquip=false;return C.smeltEnabled.equip;},
    smelt25Start:()=>{C.smeltEnabled.equip=true;due.smelt=0;return C.smeltEnabled.equip;},
    tuVuotCanRun:()=>C.enableTuVuot&&!tuVuot.stopped,
    tuVuotIdle,
    tuVuotProgressTick:tuVuotObserve,
    stop,reset,check,status,config:C,teamStatus:()=>({...team,cloneId:C.tinhThanCloneId,enabled:C.enableTinhThan,members:Number(starRefs()?.model?.teamLength)||0}),lich,lichDay,lichData:()=>eventScheduleStatus(),lichEvents:()=>EVENT_SCHEDULE.map(x=>({...x})),tienTonTrace,tuVuotStatus,tuVuotReset,tuVuotStart,tuVuotStop,composeStatus,composePreview,tuyetHocStatus,tuLaStatus,dinhCaoStatus,vinhDu:()=>{const d=vinhData();const x={gioVN:new Date().toLocaleString('vi-VN',{timeZone:'Asia/Ho_Chi_Minh'}),trongGio:vinhWindow(),coChienDoi:d.hasTeam,serverMo:d.open,hetCho:d.ready,dangTrongTran:d.inside,soLanThu:vinhEnterAttempts,soLanDaVao:vinhConfirmed};console.table([x]);return x;}};
  window.KVPV_RED_DOT_TASKS=Object.freeze({dispatch:redDotDispatch,tick:redDotTick});
  for(const id of [36,37,44])window.KVPV_RED_DOT_MODULE?.register?.(id,{name:({36:'Boss Nhóm',37:'Yêu Vương',44:'Boss Mãn Hoang'})[id],module:'src/03-daily-core.js',route:'red-dot targeted dispatcher using verified existing handler',automatic:true,handler:()=>redDotDispatch(id)});
  window.KVPV_TD925=Object.freeze({installed:true,version:'9.2.5',config:td925Cfg,
    status:td925Status,history:()=>td925.history.slice(),
    diag:()=>({run:td925Status(),pending:job?.type==='tienduyen'?job.target:null}),
    
    enable:()=>{C.enableTienDuyen=true;return true;},
    disable:()=>{C.enableTienDuyen=false;return true;}});
  console.log('✅ Red-dot task handlers đã nạp; bộ điều phối daily đã tắt.');
})();

 if(W.KVPV_DAILY?.config){
  const c=W.KVPV_DAILY.config;
  c.enableCompose=false;c.enableTuyetHoc=false;c.enableRingUpgrade=false;
  if(c.smeltEnabled)Object.assign(c.smeltEnabled,{equip:false,holy:false,pet:false});
  W.__KVPV_DAILY_MIGRATION={actor,source:'historical-v11.5',safety:'no-upgrade',at:Date.now()};
 }
})();
