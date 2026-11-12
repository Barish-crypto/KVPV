




(() => {

  const W=window,actor=String(W.__KVPV_OWN_ACTOR_ID||''),results=[];

  if(!actor||actor!==String(W._Ba?._rJ?._O$?.ins?.actorId??'')||W.__KVPV_UNIVERSAL_HALTED)return;

  

  for(const key of ['marryBattle','macLan']){try{const m=W.KVPV?.[key];if(m?.config?.cloneId){m.stop?.();m.config.enabled=false;m.config.cloneId='';m.config.mainId=actor;}}catch(e){W.KVPV_V1?.diagnostics?.record?.(e);}}

  // Preserve only a valid, distinct configured clone actor ID; reject stale placeholders.
  const dailyConfig=W.KVPV_DAILY?.config;
  if(dailyConfig){
    const clone=String(dailyConfig.tinhThanCloneId??'');
    if(clone && (!/^[1-9]\d{4,24}$/.test(clone)||clone===actor))
      dailyConfig.tinhThanCloneId='';
  }

  function install(name,fn){const old=W[name];

    if(old){try{const s=old.status?.(false);if(s?.running||s?.pending||s?.blocked){results.push({name,state:'preserved'});return;}}

      catch(e){results.push({name,state:'preserved_unknown',error:String(e)});return;}

      try{old.stopMonitor?.();old.stop?.();delete W[name];}catch(e){results.push({name,state:'cleanup_failed',error:String(e)});return;}}

    try{fn();results.push({name,state:W[name]?'ready':'dependencies_missing'});}catch(e){results.push({name,state:'error',error:String(e)});W.KVPV_V1?.diagnostics?.record?.(e);}

  }

  function sleep(ms,signal){
    return new Promise(resolve=>{
      if(signal.aborted){resolve(false);return;}
      let timer=null;
      const finish=()=>{clearTimeout(timer);signal.removeEventListener('abort',finish);resolve(!signal.aborted);};
      signal.addEventListener('abort',finish,{once:true});
      timer=setTimeout(finish,ms);
    });
  }
  install("KVPV_FAST927",()=>{

(() => {

 'use strict';

 const W=window, VERSION='9.2.7';

 try{W.KVPV_FAST927?.stopMonitor?.();}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

 const actor=()=>String(window._Ba?._rJ?._O$?.ins?.actorId??'');

 const main=String(window.__KVPV_OWN_ACTOR_ID||'');

 const copy=()=>typeof _Ba!=='undefined'?_Ba?._Yo?.marryCopy?._gOt?.ins:null;

 const couple=()=>typeof _Ba!=='undefined'?_Ba?._Yo?._tdt?.instance:null;

 const star=()=>typeof _Ba!=='undefined'?_Ba?._MT?.the_secret_of_the_stars?._Gvt?.instance:null;

 const pane=()=>typeof _ft!=='undefined'?_ft?._Y4n?.ins:null;

 const common=()=>typeof _Ba!=='undefined'&&_Ba?._$a?.SceneUtil?.isCommonScene===true;

 const scene=()=>typeof _Ba!=='undefined'?Number(_Ba?._$a?.SceneUtil?.curScene):null;

 const inQuest=()=>typeof _Ba!=='undefined'&&!!_Ba?._$a?._yo?.ins?.isInMission;

 const fixedTeam=()=>typeof _Ba!=='undefined'&&!!_Ba?._cm?._q3t?.ins?.getHasTeams?.();

 let timer=null;

 let note='initialized';

 

 function status(print=true){

   const D=W.KVPV_DAILY, q=D?.quickState?.()||{}, c=D?.config||{};

   const M=copy(), B=star(), C=couple();

   const copyReady=Array.isArray(M?.copyTime)&&M.copyTime.length>0;

   const total=Number(M?.maxCopyNum), used=Number(M?.copyFightNum);

   const remaining=copyReady&&Number.isFinite(total)&&Number.isFinite(used)?Math.max(0,total-used):null;

   const married=C?.isMarry?.()===true;

   const merged=M?.isCombin===true||M?.isCombin===1;

   const busy=q.job&&q.job!=='rảnh';

   const blockers=[];

   if(actor()!==main)blockers.push('Đang ở acc khác MAIN');

   if(!q.running)blockers.push('Auto Daily chưa chạy');

   if(busy)blockers.push('Auto đang xử lý: '+q.job+' / '+q.step);

   if(!common())blockers.push('Chưa ở bản đồ thường (scene '+scene()+')');

   if(fixedTeam())blockers.push('Đang ở tổ đội loại khác');

   if(common()&&inQuest())blockers.push('Game đang auto nhiệm vụ; ưu tiên Tiên Duyên/Tinh Thần được phép xét');

   let whyTD='Sẵn sàng, chờ lượt điều phối';

   if(!c.enableTienDuyen)whyTD='Đã tắt';

   else if(!M)whyTD='Model Tiên Duyên chưa tải';

   else if(!copyReady)whyTD='Dữ liệu lượt chưa tải; chỉ yêu cầu refresh có giới hạn';

   else if(!married)whyTD='Chưa kết duyên — không dùng Nguyên Bảo';

   else if(!(remaining>0))whyTD='Hết lượt';

   else if(merged)whyTD='Gộp lượt đang bật — không tự đánh';

   let whyStar='Sẵn sàng, chờ lượt điều phối';

   if(!c.enableTinhThan)whyStar='Đã tắt';

   else if(!B)whyStar='Model Tinh Thần chưa tải';

   else if(!Number.isFinite(Number(B.strengthvalue)))whyStar='Chưa tải Nguyên Lực';

   else if(Number(B.strengthvalue)<=0)whyStar='Hết Nguyên Lực';

   else if(B.auto===1||B.auto===true)whyStar='Bật tự dùng Nguyên Lực Đơn; tool không tiêu vật phẩm';

   const panel=pane();const u=panel?.isOpened?.(605)?panel.getPanelById?.(605):null;

   const out={version:VERSION,actor:actor(),running:!!q.running,job:q.job||'rảnh',step:q.step||'-',

     scene:scene(),common:common(),inQuest:inQuest(),fixedTeam:fixedTeam(),

     towerMode:W.KVPV_TOWER_MANUAL925?.status?.()?.mode??'unknown',

     tienDuyen:{enabled:!!c.enableTienDuyen,reason:whyTD,modelReady:!!M,

       copyReady,remaining,married,merged,api:!!W.KVPV_TD925?.status,

       coreBound:W.KVPV_TD925?.installed===true,last:W.KVPV_TD925?.config? 'Native TD925 available':'TD925 API may be missing',

       active:q.job==='tienduyen'},

     tinhThan:{enabled:!!c.enableTinhThan,reason:whyStar,power:B?.strengthvalue??null,

       teamMembers:B?.teamLength??null,wantedTier:c.tinhThanTang,tierUI:u?._bvt??null,

       active:q.job==='tinhthan',team:W.KVPV_V924_STAR?.team?.()??null},

     blockers, note};

   if(print){console.log('[V927 AUTO DIAGNOSTICS]',out);console.table([{

     running:out.running,job:out.job,scene:out.scene,Quest:out.inQuest,

     TienDuyen:whyTD,TinhThan:whyStar,Tower:out.towerMode,

     LyDoChung:blockers.join(' | ')||'không có'

   }]);}return out;

 }

 // Some earlier running snippets reported TD925 missing. Only give a read-only

 // compatibility shim when it is absent; this does NOT claim to install engine logic.

 if(typeof W.KVPV_TD925?.status!=='function'){

   W.KVPV_TD925=Object.freeze({installed:false,version:VERSION+'-diagnostic-only',

     status:()=>{const s=status(false);return {version:VERSION,engineAvailable:false,

       remaining:s.tienDuyen.remaining,married:s.tienDuyen.married,

       reason:'Missing underlying TD925 API; use full V9.2.7 source'};},

     enable:()=>{if(W.KVPV_DAILY?.config)W.KVPV_DAILY.config.enableTienDuyen=true;},

     disable:()=>{if(W.KVPV_DAILY?.config)W.KVPV_DAILY.config.enableTienDuyen=false;}});

   console.warn('[V927] TD925 export absent; installed a diagnostic-only shim, not a claim/upgrade engine.');

 }

 

 function start(){

   const D=W.KVPV_DAILY;

   if(actor()!==main)throw Error('ONLY run MAIN FULL on account '+main);

   if(!D?.config)throw Error('Auto Daily core missing; reload FULL into game-frame');

   D.config.enableTienDuyen=true;

   D.config.enableTinhThan=true;

   D.config.autoTeam=true;

   D.config.autoApproveTeam=true;

   D.config.tienDuyenMs=600;

   D.config.tinhThanMs=600;

   // Use the highest server-confirmed unlocked tier, never a fixed floor 6.
   const starModel=typeof _Ba!=='undefined'?_Ba?._MT?.the_secret_of_the_stars?._Gvt?.instance:null;
   const tierCandidates=[starModel?.maxPassTier,starModel?.maxOpenTier,starModel?.maxTier,starModel?.highestUnlockedTier]
     .map(Number).filter(v=>Number.isSafeInteger(v)&&v>0&&v<=10000);
   if(tierCandidates.length)D.config.tinhThanTang=Math.max(Number(D.config.tinhThanTang)||0,...tierCandidates);
   // If the native model has not published an unlocked tier yet, preserve user settings.
   D.config.autoTeam=true;
   D.config.autoApproveTeam=true;

   // Respect existing dedicated Tower manual controls; do not call tower.start.

   if(W.KVPV_V873?.config){W.KVPV_V873.config.autoChallenge=false;W.KVPV_V873.config.autoOpen=false;}

   D.start?.();

   note='Running; server conditions continue to apply';

   return status(false);

 }

 function stopMonitor(){clearInterval(timer);timer=null;return true;}

 function monitor(){

   if(actor()!==main){stopMonitor();return;}

   // No RPC from this timer. Never restart a stopped Daily automatically.

   const D=W.KVPV_DAILY;

   if(D?.config){

     if(W.KVPV_V873?.config){W.KVPV_V873.config.autoChallenge=false;W.KVPV_V873.config.autoOpen=false;}

     // No config overwrite for disabled user modules; only provide readout.

   }

 }

 W.KVPV_FAST927=Object.freeze({status,start,diagnostics:status,stopMonitor,

   version:VERSION,disableDungeons(){const c=W.KVPV_DAILY?.config;

     if(c){c.enableTienDuyen=false;c.enableTinhThan=false;}return status(false);},

   enableDungeons:start});

 try{start();}catch(e){console.warn('[V927] Main startup:',String(e));note=String(e);}

 timer=setInterval(monitor,10000);

 console.info('[V927] Tinh Than + Tien Duyen priority loaded. Tower remains manual. KVPV_FAST927.status()');

})();

  });

  install("KVPV_ASYNC928",()=>{

(() => {

  'use strict';

  const W=window, VERSION='9.2.8', MAIN=String(window.__KVPV_OWN_ACTOR_ID||'');

  try { W.KVPV_ASYNC928?.stop?.(); } catch(_){window.KVPV_V1?.diagnostics?.record(_);}

  const actor=()=>String(typeof _Ba==='undefined'?'':(_Ba?._rJ?._O$?.ins?.actorId??''));

  const daily=()=>W.KVPV_DAILY;

  const tower=()=>W.KVPV_TOWER_MANUAL925?.status?.();

  const stage=()=>typeof _Ba!=='undefined'?_Ba?._Co?._Mo?.ins:null;

  const scene=()=>typeof _Ba!=='undefined'?Number(_Ba?._$a?.SceneUtil?.curScene??-1):-1;

  const mission=()=>typeof _Ba!=='undefined'&&!!_Ba?._$a?._yo?.ins?.isInMission;

  const clock=()=>Date.now();

  const safeError=e=>String(e?.message??e).slice(0,250);

  const STATE={running:false, actor:actor(), epoch:0, startedAt:0, stoppedAt:0,

    errors:0, lastError:'', scene:{lastJob:'',lastStep:'',stuckAt:0, warnings:0},

    stage:{floor:null,gains:0,paused:false,auto:false,lastGain:0,lockWarned:false},

    background:{readyRewards:false,modules:[],scans:0},

    lanes:{scene:{runs:0,errors:0,lastAt:0,lagMaxMs:0},

           stage:{runs:0,errors:0,lastAt:0,lagMaxMs:0},

           background:{runs:0,errors:0,lastAt:0,lagMaxMs:0}},

    log:[], tasks:[], controller:null};

  

  function note(type,msg,detail){

    const record={at:new Date().toISOString(),type,msg,detail:detail??null};

    STATE.log.push(record);if(STATE.log.length>120)STATE.log.shift();

    if(type==='error'||type==='warning')console.warn('[KVPV ASYNC928]',msg,detail??'');

    return record;

  }

  function belongs(){return actor()===MAIN&&actor()===STATE.actor;}

  async function loop(name,delay,fn,signal){

    const m=STATE.lanes[name];

    let next=clock();

    while(!signal.aborted){

      if(!belongs()){

        note('warning','Tài khoản/game-frame đã thay đổi, dừng giám sát');

        stop();break;

      }

      const began=clock();

      try{await fn(signal);}

      catch(e){m.errors++;STATE.errors++;STATE.lastError=safeError(e);

        note('error',`Lỗi lane ${name}`,STATE.lastError);}

      m.runs++;m.lastAt=clock();

      next=Math.max(began+delay,clock()+100);

      m.lagMaxMs=Math.max(m.lagMaxMs,Math.max(0,m.lastAt-began-delay));

      if(!await sleep(Math.max(100,next-clock()),signal))break;

    }

  }

  function observeScene(){

    const q=daily()?.quickState?.()||{};

    const name=String(q.job||'rảnh'),step=String(q.step||'-');

    const s=STATE.scene;

    if(s.lastJob!==name||s.lastStep!==step){

      s.lastJob=name;s.lastStep=step;s.stuckAt=clock();s.warnedFor='';

      note('step',`Scene job: ${name}/${step}`);

    }

    if(name!=='rảnh'&&s.stuckAt&&clock()-s.stuckAt>120000 && s.warnedFor!==`${name}/${step}`){

      s.warnedFor=`${name}/${step}`;s.warnings++;

      note('warning',`Job ${name}/${step} giữ nguyên >120s, chờ server xác nhận`,{scene:scene()});

    }

    // Do not call dispatch directly or start a second scene job.

  }

  function observeStage(){

    const m=stage();if(!m)return;

    const lv=Number(m.curLv), s=STATE.stage;

    if(Number.isFinite(lv)&&lv>0){

      if(s.floor!==null&&lv>s.floor){

        s.gains+=lv-s.floor;s.lastGain=clock();

        note('progress',`Tự Vượt tăng cấp ải: ${s.floor} → ${lv}`);

      }

      s.floor=lv;

    }

    s.auto=!!m.auto;

    const C=daily()?.config;

    s.paused=!!C&&!C.enableTuVuot;

    // The optional legacy Tower MANUAL925 controller is not bundled in the curated FULL.
    // A missing controller is not a missing safety lock: this observer never starts Tower.
    // Preserve native manual entry; do not synthesize a fake MANUAL925 controller.

    

    // The engine never sends raw RPC or resets server state.

  }

  function observeBackground(){

    const up=W.KVPV_UPGRADES;

    let hasReady=false;

    try{hasReady=up?.hasReadyClaims?.()===true;}catch(e){

      note('warning','Không đọc được dấu đỏ đang chờ',safeError(e));

    }

    const b=STATE.background;

    if(hasReady!==b.readyRewards){b.readyRewards=hasReady;

      note('reward',hasReady?'Có quà/dấu đỏ sẵn sàng, module hiện có sẽ nhận':'Không còn quà sẵn sàng');}

    b.scans++;

    b.modules=['KVPV_V8','KVPV_UPGRADES','KVPV_TD925','KVPV_V924_STAR','KVPV_FAST927']

      .filter(key=>!!W[key]);

    // Native V8/Upgrades modules already run in background with ACK gating.

    // No duplicate claim requests or unverified automatic purchases here.

  }

  

  function status(){

    const q=daily()?.quickState?.()||{},C=daily()?.config||{},s=STATE.stage;

    return {version:VERSION,running:STATE.running,actor:STATE.actor,

      elapsedMs:STATE.running?clock()-STATE.startedAt:0,

      daily:{running:!!q.running,job:q.job||'rảnh',step:q.step||'-',scene:scene(),mission:mission()},

      stage:{...s,enabled:!!C.enableTuVuot,priority:!!C.asyncStagePriority,

        prioritySpacingMs:C.asyncStagePrioritySpacingMs||null,

        note:'Thien Quan native; choi khong gioi han; dung bang KVPV_DAILY.tuVuotStop()'},

      tinhThan:!!C.enableTinhThan,tienDuyen:!!C.enableTienDuyen,

      towerManual:tower()?.mode==='manual',

      background:{...STATE.background,modules:[...STATE.background.modules]},

      lanes:Object.fromEntries(Object.entries(STATE.lanes).map(([k,v])=>[k,{...v}])),

      errors:STATE.errors,lastError:STATE.lastError,lastEvents:STATE.log.slice(-8)};

  }

  

  function report(){const s=status();console.log('[KVPV ASYNC928]',s);

    console.table(Object.entries(s.lanes).map(([lane,v])=>({lane,...v})));

    return s;}

  function pauseStage(){

    const c=daily()?.config;if(!c)throw Error('KVPV_DAILY chưa khởi tạo');

    c.enableTuVuot=false;

    const m=stage();if(m?.auto===true)m.auto=false;

    STATE.stage.paused=true;note('control','Tạm dừng Thiên Quan (không ảnh hưởng Tinh Thần/Tiên Duyên)');

    return status().stage;

  }

  function resumeStage(){

    const d=daily();if(!d?.config)throw Error('KVPV_DAILY chưa khởi tạo');

    // Only resume a user-stopped stage after explicit action.

    d.tuVuotStart?.();

    d.config.enableTuVuot=true;STATE.stage.paused=false;

    note('control','Bật Thiên Quan; core sẽ xử lý khi rảnh, không gửi lệnh ngay');

    return {ok:true};

  }

  

  function stop(){

    const ctrl=STATE.controller;STATE.controller=null;

    STATE.running=false;STATE.stoppedAt=clock();STATE.epoch++;

    if(ctrl)ctrl.abort();

    return status();

  }

  

  function start(){

    if(STATE.running)return status();

    if(actor()!==MAIN)throw Error(`Bản MAIN chỉ chạy ở actor ${MAIN}; đang là ${actor()||'chưa tải'}`);

    STATE.actor=actor();STATE.startedAt=clock();STATE.controller=new AbortController();

    STATE.running=true;STATE.epoch++;

    const signal=STATE.controller.signal;

    // Promise loops are independent and non-blocking. Only one scene owner: Daily.

    STATE.tasks=[

      loop('scene',800,observeScene,signal),

      loop('stage',1200,observeStage,signal),

      loop('background',3000,observeBackground,signal)

    ];

    note('start','Đã bật 3 lane async; scene commands still serialized by existing Daily');

    return status();

  }

  W.KVPV_ASYNC928=Object.freeze({version:VERSION,start,stop,status,report,

    history:()=>STATE.log.slice(),pauseStage,resumeStage});

  try{start();}catch(e){console.warn('[KVPV ASYNC928] Chưa bật:',safeError(e));}

})();

  });

  install("KVPV_QUEST929",()=>{

(() => {

  'use strict';

  const W=window, VERSION='9.2.9', MAIN=String(window.__KVPV_OWN_ACTOR_ID||'');

  try { W.KVPV_QUEST929?.stop?.(); } catch(_){window.KVPV_V1?.diagnostics?.record(_);}

  const actor=()=>String(typeof _Ba==='undefined'?'':_Ba?._rJ?._O$?.ins?.actorId??'');

  const now=()=>Date.now();

  const D=()=>W.KVPV_DAILY;

  const F=()=>W.KVPV_V876;

  const Q=()=>W.KVPV_V866;

  const U=()=>W.KVPV_UPGRADES;

  const cfg=()=>D()?.config||{};

  const qtask=()=>{try{return Q()?.task?.()??null;}catch(_){return null;}};

  const qs=()=>{try{return D()?.quickState?.()||{};}catch(_){return {};}};

  const common=()=>typeof _Ba!=='undefined'&&_Ba?._$a?.SceneUtil?.isCommonScene===true;

  const scene=()=>Number(typeof _Ba==='undefined'?-1:_Ba?._$a?.SceneUtil?.curScene??-1);

  const cleanError=e=>String(e?.message??e).slice(0,240);

  const SETTINGS={enabled:true,enableQueueNudge:true,enableCatalogRecovery:true,

    claimNudgeCooldownMs:4000,stuckWarnMs:180000,maxLog:140,

    questPollMs:750,queuePollMs:1400,healthPollMs:3000};

  const state={running:false,controller:null,generation:0,startedAt:0,

    quest:null,questKey:'',progressAt:0,detected:0,confirmed:0,

    unknowns:new Map(),lastWarning:new Set(),latestExecutor:null,

    lastCatalogRecoveryAt:0,catalogRecoveries:0,

    lastQueueNudgeAt:0,queueNudgeKeys:new Set(),queueNudges:0,

    errors:0,lastError:'',warnings:0,redReady:false,

    lanes:{quest:{runs:0,errors:0,msMax:0},queue:{runs:0,errors:0,msMax:0},health:{runs:0,errors:0,msMax:0}},

    log:[]};

  function emit(kind,message,data){

    const row={at:new Date().toISOString(),kind,message,data:data??null};

    state.log.push(row);if(state.log.length>SETTINGS.maxLog)state.log.shift();

    if(kind==='warning'||kind==='error')console.warn('[KVPV QUEST929]',message,data??'');

    return row;

  }

  async function lane(name,interval,handler,signal,generation){

    const stat=state.lanes[name];

    while(!signal.aborted&&generation===state.generation){

      const began=now();

      if(actor()!==MAIN){emit('warning','Sai nhân vật/game-frame; dừng toàn bộ Quest929');stop();break;}

      try{await handler();}catch(e){state.errors++;stat.errors++;state.lastError=cleanError(e);

        emit('error','Lỗi lane '+name,state.lastError);}

      stat.runs++;stat.msMax=Math.max(stat.msMax,now()-began);

      let wait=interval;

      if(document?.hidden)wait=Math.max(wait,2500);

      if(!await sleep(Math.max(100,wait-(now()-began)),signal))break;

    }

  }

  const taskSignature=q=>JSON.stringify([q?.id??null,q?.state??null,q?.progress??null]);

  function executor(q){

    if(!q)return null;

    let info=null;

    try{info=F()?.status?.(false)||null;}catch(_){ /* diagnostic-only */ }

    if(!info||String(info.id)!==String(q.id))return {

      id:String(q.id),verified:false,executable:false,module:null,reason:'Factory chưa có dữ liệu đồng bộ'};

    const tower=/linh lung/i.test(String(q.name||''))||info.family==='linhlung';

    return {id:String(q.id),family:info.family||null,verified:!!info.verified,

      executable:!!info.executable&&!tower,module:info.module||null,

      reason:tower?'Linh Lung Tháp MANUAL: không tự chạy executor':info.reason||'',

      forcedManual:tower};

  }

  function taskLane(){

    const q=qtask();

    if(!q||q.id==null)return;

    const key=taskSignature(q),was=state.quest;

    if(key!==state.questKey){

      state.questKey=key;state.quest={id:String(q.id),name:String(q.name||''),

        state:Number(q.state),actionId:Number(q.actionId||0),progress:q.progress??null};

      state.progressAt=now();state.detected++;

      if(was?.id===String(q.id)&&state.quest.state===2&&was.state!==2){state.confirmed++;

        emit('confirmed','Server báo nhiệm vụ hoàn tất',{id:String(q.id)});

      }else emit('task','Server cập nhật nhiệm vụ',{

        id:String(q.id),state:q.state,actionId:q.actionId});

      // A changed server signature merits a fresh queue evaluation, but never

      // replay the exact request or bypass an existing ACK lock.

    }

    const ex=executor(q);state.latestExecutor=ex;

    if(Number(q.state)!==2&&!ex?.executable){

      const row={id:String(q.id),name:String(q.name||''),actionId:Number(q.actionId||0),

        family:ex?.family||'unknown',reason:ex?.reason||'Thiếu executor đã xác minh',at:now()};

      state.unknowns.set(row.id,row);

      if(state.unknowns.size>80)state.unknowns.delete(state.unknowns.keys().next().value);

      const warningKey='missing:'+row.id+':'+row.reason;

      if(!state.lastWarning.has(warningKey)){

        state.lastWarning.add(warningKey);state.warnings++;

        emit('warning','Nhiệm vụ chưa có executor được phép tự chạy',row);

      }

    }

    if(Number(q.state)!==2&&state.progressAt&&now()-state.progressAt>SETTINGS.stuckWarnMs){

      const key='idle:'+String(q.id)+':'+state.questKey;

      if(!state.lastWarning.has(key)){

        state.lastWarning.add(key);state.warnings++;

        emit('warning','Tiến độ nhiệm vụ đứng yên >3 phút, không tự phát lại RPC',{

          quest:q.id,job:qs().job,scene:scene(),executor:ex?.module});

      }

    }

  }

  function towerManual(){

    const c=W.KVPV_V873?.config;

    if(c){c.autoChallenge=false;c.autoOpen=false;}

    // Do not disable the explicit KVPV_TOWER_MANUAL925.start API.

  }

  function recoverCatalog(){

    if(!SETTINGS.enableCatalogRecovery||now()-state.lastCatalogRecoveryAt<60000)return;

    const f=F(),origin=typeof _ft!=='undefined'?_ft?.__Z?.ins?.originCfg:null;

    if(!f?.buildAll||!Array.isArray(origin)||!origin.length)return;

    const n=Array.isArray(f.executors?.())?f.executors().length:1;

    if(n>0)return;

    state.lastCatalogRecoveryAt=now();

    const result=f.buildAll();state.catalogRecoveries++;

    emit('recovered','Tải lại danh mục executor sau khi model game có dữ liệu',result);

  }

  function queueLane(){

    towerManual();

    const q=qtask(),u=U(),s=qs();

    // Exactly one acceleration of the native queue when a *new* server

    // snapshot reports the main quest in completed state. No direct reward RPC.

    if(!SETTINGS.enableQueueNudge||!state.running||!q||Number(q.state)!==2||

       !u||typeof u.run!=='function'||typeof u.busy!=='function'||u.busy()||

       !W.KVPV_V86?.config?.autoClaimMainQuest||

       W.KVPV_V86?.config?.enabled===false||!s.running||!common()||

       now()-state.lastQueueNudgeAt<SETTINGS.claimNudgeCooldownMs)return;

    const key=taskSignature(q);

    if(state.queueNudgeKeys.has(key))return;

    state.queueNudgeKeys.add(key);

    if(state.queueNudgeKeys.size>120)state.queueNudgeKeys.delete(state.queueNudgeKeys.values().next().value);

    state.lastQueueNudgeAt=now();state.queueNudges++;

    // The existing queue owns all eligibility, prioritization and server ACK.

    u.run();

    emit('queue','Yêu cầu hàng đợi native xét nhiệm vụ đã hoàn thành',{

      id:String(q.id),state:Number(q.state)});

  }

  function healthLane(){

    towerManual();recoverCatalog();

    try{state.redReady=U()?.hasReadyClaims?.()===true;}catch(_){state.redReady=false;}

  }

  

  function status(){

    const q=qs();

    return {version:VERSION,running:state.running,actor:actor(),

      elapsedMs:state.running?now()-state.startedAt:0,

      daily:{running:!!q.running,job:q.job||'rảnh',step:q.step||'-',scene:scene()},

      quest:state.quest?{...state.quest}:null,

      executor:state.latestExecutor?{...state.latestExecutor}:null,

      waitingMs:state.progressAt?now()-state.progressAt:null,

      tower:W.KVPV_TOWER_MANUAL925?.status?.()?.mode||'unknown',

      tier:cfg().tinhThanTang,enableTienDuyen:!!cfg().enableTienDuyen,

      enableTinhThan:!!cfg().enableTinhThan,redReady:state.redReady,

      detected:state.detected,serverCompleted:state.confirmed,

      missingCount:state.unknowns.size,catalogRecoveries:state.catalogRecoveries,

      queueNudges:state.queueNudges,queueBusy:!!U()?.busy?.(),

      errors:state.errors,warnings:state.warnings,lastError:state.lastError,

      lanes:Object.fromEntries(Object.entries(state.lanes).map(([k,v])=>[k,{...v}])),

      recent:state.log.slice(-8)};

  }

  

  function report(){const s=status();console.log('[KVPV QUEST929]',s);

    console.table([{

      Main:s.actor,Quest:s.quest?.id||'-',Name:s.quest?.name||'-',

      State:s.quest?.state??'-',Verified:!!s.executor?.verified,

      Executable:!!s.executor?.executable,Executor:s.executor?.module||'-',

      Job:s.daily.job,Tower:s.tower,Red:s.redReady,

      Queue:s.queueBusy?'BUSY':'FREE',Warnings:s.warnings

    }]);return s;

  }

  

  function stop(){state.running=false;state.generation++;

    const c=state.controller;state.controller=null;

    if(c)c.abort();return status();}

  

  function start(){

    if(state.running)return status();

    if(actor()!==MAIN)throw Error(`MAIN only (${MAIN}), actor now ${actor()||'not loaded'}`);

    if(!D()?.quickState||!Q()?.task)throw Error('V9.2.8 FULL is required in game-frame');

    state.startedAt=now();state.running=true;state.generation++;

    state.controller=new AbortController();

    const signal=state.controller.signal,generation=state.generation;

    towerManual();

    // Independent cooperative loops; no duplicate scene owner.

    lane('quest',SETTINGS.questPollMs,taskLane,signal,generation);

    lane('queue',SETTINGS.queuePollMs,queueLane,signal,generation);

    lane('health',SETTINGS.healthPollMs,healthLane,signal,generation);

    emit('start','Bật 3 lane bất đồng bộ: quest, queue và health');

    return status();

  }

  const api=Object.freeze({version:VERSION,start,stop,status,report,

    history:()=>state.log.slice(),

    missing:()=>[...state.unknowns.values()].map(x=>({...x})),

    config:SETTINGS,

    pause(){return stop();},resume(){return start();}});

  W.KVPV_QUEST929=api;

  try{start();}catch(e){console.warn('[KVPV QUEST929] Chưa bật:',cleanError(e));}

})();

  });

  install("KVPV_RUNES930",()=>{

(() => {

  'use strict';

  const W=window,MAIN=String(window.__KVPV_OWN_ACTOR_ID||'');

  if(W.KVPV_RUNES930?.installed){W.KVPV_RUNES930.start();return;}

  const F=W.KVPV_V876,Q=W.KVPV_V866,D=W.KVPV_DAILY;

  if(!F?.registerRecipe||!Q?.task||!D?.quickState||typeof _Ba==='undefined'||typeof _ft==='undefined'){

    console.warn('[KVPV RUNES930] Need V9.2.9 FULL and game-frame');return;

  }

  const C={enabled:true,autoRefine:true,pollMs:750,minGapMs:1500,

    ackTimeoutMs:30000,maxAttemptsPerQuest:40,maxItemPerUpgrade:10000,

    maxRuneExpPerUpgrade:1000000000,

    requireCommonScene:true,maxHistory:80};

  const S={running:false,timer:null,registered:false,pending:null,blocked:null,

    lastSendAt:0,attempts:new Map(),success:0,sent:0,errors:0,history:[],lastError:''};

  const now=()=>Date.now();

  const integer=x=>Number.isSafeInteger(Number(x))&&Number(x)>=0?Number(x):null;

  const norm=x=>String(x??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'')

    .replace(/[đĐ]/g,'d').toLowerCase().replace(/\s+/g,' ').trim();

  const actor=()=>String(_Ba?._rJ?._O$?.ins?.actorId??'');

  const rune=()=>_Ba?._QV?._Bri?.ins;

  const rpc=()=>_Ba?._QV?._Wri?.ins;

  const cfg=()=>_ft?._NY?.ins;

  const bag=()=>_Ba?._Ic?._aQ?.ins;

  const quest=()=>Q.task?.()??null;

  const common=()=>_Ba?._$a?.SceneUtil?.isCommonScene===true &&

    _Ba?._$a?._yo?.ins?.isInMission!==true && _Ba?._$a?._yo?.ins?.isInArena!==true;

  

  function history(kind,data){

    S.history.push({at:new Date().toISOString(),kind,data});

    if(S.history.length>C.maxHistory)S.history.shift();

  }

  function match(q){

    if(!q||Number(q.state)===2||!/^m\d+$/.test(String(q.id)))return null;

    const name=norm(q.name);

    if(!/\bphu van\b/.test(name)||!/(?:tang|nang) cap/.test(name))return null;

    if(/(?:phan giai|kham|thay the|che tao|thu thap|tang sao|cuong hoa trang bi|phu van cam dia)/.test(name))return null;

    const times=/\b(\d{1,3})\s*lan\b/.exec(name);

    if(!times)return null;

    const target=integer(times[1]);

    if(target===null||target<=0||target>100)return null;

    return {target,actionId:integer(q.actionId),name};

  }

  function materialCount(id){

    try{return id===91740001?integer(rune()?.exp):integer(bag()?.getItemCountById?.(id));}

    catch(_){return null;}

  }

  function baseData(q=quest()){

    const rule=match(q),r=rune(),c=cfg(),fn=rpc()?.runeRefine;

    const tab=r?.tab;

    if(!rule||!tab||typeof tab!=='object'||!c||typeof fn!=='function'){

      return {ready:false,reason:!rule?'Current quest not explicit rune-refine-times objective':

        !tab?'Server rune model not loaded':'Missing native client method/config',rule,questId:q?.id};

    }

    const options=[];

    for(let pos=1;pos<=11;pos++){

      const runeId=integer(tab[pos]);

      if(!runeId||runeId<=0)continue;

      let old=null,next=null;

      try{old=c.getCfgById?.(runeId);next=c.getCfgById?.(runeId+1);}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

      if(!Array.isArray(old)||!Array.isArray(next)||!Array.isArray(old[1]))continue;

      const itemId=integer(old[1][0]),need=integer(old[1][1]);

      if(!itemId||need===null||need<1||need>

         (itemId===91740001?C.maxRuneExpPerUpgrade:C.maxItemPerUpgrade))continue;

      if(itemId!==91740001 && itemId<10000)continue; // Unknown currency IDs are never spent

      const have=materialCount(itemId);

      if(have===null||have<need)continue;

      const reborn=integer(old[5]);

      if(reborn!==null&&reborn>0){

        const current=integer(_Ba?._rJ?._O$?.ins?.earLv?.());

        if(current===null||current<reborn)continue;

      }

      options.push({pos,runeId,itemId,need,have,reborn,

        isExp:itemId===91740001});

    }

    options.sort((a,b)=>{

      if(a.isExp!==b.isExp)return a.isExp?-1:1;

      return a.need-b.need||a.runeId-b.runeId||a.pos-b.pos;

    });

    const pick=options[0]||null;

    const runeSig=JSON.stringify(Array.from({length:11},(_,i)=>integer(tab[i+1])||0));

    const serverSig=JSON.stringify([String(q.id),q.state,q.progress??null,runeSig]);

    const sig=JSON.stringify([serverSig,pick?.pos,pick?.runeId,pick?.itemId,pick?.have]);

    return {ready:!!pick,reason:pick?'Eligible native refinement':'No equipped upgradeable rune with owned material',

      questId:String(q.id),rule,selected:pick,options:options.length,serverSig,signature:sig,

      runeSig,progressSig:JSON.stringify(q.progress??null)};

  }

  function ack(row,q=quest()){

    if(!q||String(q.id)!==row.questId||Number(q.state)===2)return true;

    const current=baseData(q);

    return (!!current.runeSig&&current.runeSig!==row.runeSig) ||

      JSON.stringify(q.progress??null)!==row.progressSig;

  }

  

  function watch(){

    const q=quest();

    for(const key of ['pending','blocked']){

      const p=S[key];if(!p)continue;

      if(ack(p,q)){

        if(key==='pending')S.success++;

        history(key==='pending'?'server-progress':'unblocked',

          {id:p.questId,position:p.pos,previousRune:p.runeId});

        S[key]=null;

      }else if(key==='pending'&&now()-p.at>C.ackTimeoutMs){

        S.blocked=p;S.pending=null;

        console.warn('[KVPV RUNES930] Refinement did not receive server state ACK; locked for this state',p.questId);

        history('ack-timeout',{questId:p.questId,position:p.pos});

      }

    }

  }

  

  function preview(q=quest()){

    const p=baseData(q),used=S.attempts.get(String(q?.id))||0;

    const waiting=now()-S.lastSendAt<C.minGapMs;

    const ready=C.enabled&&C.autoRefine&&actor()===MAIN&&p.ready&&!S.pending&&!S.blocked&&!waiting&&

      used<C.maxAttemptsPerQuest&&(!C.requireCommonScene||common());

    return {...p,ready,used,pending:!!S.pending,blocked:!!S.blocked,

      reason:actor()!==MAIN?'MAIN only':!C.enabled||!C.autoRefine?'Executor disabled':

      S.pending?'Awaiting server model ACK':S.blocked?'Locked: no ACK for unchanged server state':

      C.requireCommonScene&&!common()?'Not in safe common scene':

      waiting?'Native command minimum gap':used>=C.maxAttemptsPerQuest?'Quest safety limit':p.reason};

  }

  

  function probe(q){const p=preview(q);return {ready:p.ready,signature:p.signature||'no-rune-state'};}

  function run(q,snap){

    const current=quest(),p=preview(current);

    if(String(current?.id)!==String(q?.id)||Number(current?.state)===2||!p.ready||

       p.signature!==snap.signature||!p.selected||typeof rpc()?.runeRefine!=='function')

      throw Error('Rune quest/model changed since shared queue probe');

    const row={questId:String(q.id),pos:p.selected.pos,runeId:p.selected.runeId,

      runeSig:p.runeSig,progressSig:p.progressSig,serverSig:p.serverSig,at:now()};

    S.pending=row;S.lastSendAt=row.at;S.attempts.set(row.questId,p.used+1);

    try{rpc().runeRefine([row.pos]);S.sent++;history('sent',{questId:row.questId,pos:row.pos,

      itemId:p.selected.itemId,need:p.selected.need});}

    catch(e){S.errors++;S.lastError=String(e);S.pending=null;S.blocked=row;throw e;}

  }

  

  function status(){const p=preview();return {version:'9.3.0',running:S.running,

    actor:actor(),registered:S.registered,questId:p.questId??null,

    matched:!!p.rule,ready:p.ready,reason:p.reason,

    options:p.options??0,selected:p.selected||null,used:p.used||0,

    pending:!!S.pending,blocked:!!S.blocked,

    sent:S.sent,serverConfirmed:S.success,errors:S.errors,lastError:S.lastError,

    towerMode:'manual-only'};}

  

  function start(){

    C.enabled=true;

    if(!S.registered){

      F.registerRecipe({type:'rune-refine-times',verified:true,spend:'materials',

        match:q=>!!match(q),probe,run});

      S.registered=true;

    }

    if(F.config)F.config.allowMaterialRecipes=true;

    if(S.timer){if(typeof __KVPV29!=='undefined')__KVPV29.cancel(S.timer);else clearInterval(S.timer);}

    const callback=()=>{try{if(actor()!==MAIN){stop();return;}watch();}

      catch(e){S.errors++;S.lastError=String(e);}};

    S.timer=typeof __KVPV29!=='undefined'&&typeof __KVPV29.every==='function'?

      __KVPV29.every(callback,C.pollMs):setInterval(callback,C.pollMs);

    S.running=true;callback();return status();

  }

  

  function stop(){C.enabled=false;S.running=false;

    if(S.timer){if(typeof __KVPV29!=='undefined'&&__KVPV29.cancel)__KVPV29.cancel(S.timer);

      else clearInterval(S.timer);S.timer=null;}return status();}

  const api={installed:true,version:'9.3.0',config:C,start,stop,status,preview,

    history:()=>S.history.slice(),report(){const x=status();console.table([x]);return x;}};

  W.KVPV_RUNES930=api;

  try{start();}catch(e){S.errors++;S.lastError=String(e);

    console.warn('[KVPV RUNES930] Could not register executor',e);}

})();

  });

  install("KVPV_RUNE_INLAY931",()=>{

(() => {

  'use strict';

  const W=window, VERSION='9.3.1', MAIN=String(window.__KVPV_OWN_ACTOR_ID||'');

  if(W.KVPV_RUNE_INLAY931?.installed){W.KVPV_RUNE_INLAY931.start();return;}

  const F=W.KVPV_V876,Q=W.KVPV_V866,D=W.KVPV_DAILY;

  if(!F?.registerRecipe||!Q?.task||!D?.quickState||

     typeof _Ba==='undefined'||typeof _ft==='undefined'||typeof _et==='undefined'){

    console.warn('[KVPV INLAY931] Need V9.3.0 MAIN FULL + game-frame; no RPC sent');

    return;

  }

  const C={enabled:true,autoInlay:true,requireCommonScene:true,

    pollMs:750,minGapMs:1600,ackTimeoutMs:30000,maxRequestsPerQuest:8,

    slots:[1,2,3,4,5,6,7,8],maxHistory:80};

  const S={installed:true,registered:false,running:false,timer:null,pending:null,blocked:null,

    lastSendAt:0,attempts:new Map(),sent:0,acked:0,errors:0,lastError:'',history:[]};

  const time=()=>Date.now();

  const asInt=v=>{const n=Number(v);return Number.isSafeInteger(n)&&n>=0?n:null;};

  const norm=v=>String(v??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'')

    .replace(/[đĐ]/g,'d').toLowerCase().replace(/\s+/g,' ').trim();

  const actor=()=>String(_Ba?._rJ?._O$?.ins?.actorId??'');

  const model=()=>_Ba?._QV?._Bri?.ins;

  const rpc=()=>_Ba?._QV?._Wri?.ins;

  const bag=()=>_Ba?._Ic?._aQ?.ins;

  const runeInfo=()=>_ft?._CY?.ins;

  const quest=()=>Q.task?.()??null;

  const common=()=>_Ba?._$a?.SceneUtil?.isCommonScene===true&&

    _Ba?._$a?._yo?.ins?.isInMission!==true&&

    _Ba?._$a?._yo?.ins?.isInArena!==true;

  

  function log(kind,data){S.history.push({when:new Date().toISOString(),kind,...data});

    if(S.history.length>C.maxHistory)S.history.shift();}

  function match(q){

    if(!q||q.id==null||Number(q.state)===2||!/^m\d+$/.test(String(q.id)))return null;

    const n=norm(q.name);

    if(!/\bphu van\b/.test(n)||!/\bkham\b/.test(n))return null;

    if(/\b(?:thay|thao|phan giai|che tao|tang cap|nang cap|tang sao|ghep|doi|mua|doi tuong)\b/.test(n))return null;

    // Explicit N only. Refuse ambiguous goals, level targets and arbitrary rune actions.

    const m=/(?:\bkham\s+(\d{1,2})\s+phu van\b)|(?:\bphu van\b.{0,30}?\b(\d{1,2})\s*(?:lan|vien|cai)\b)/.exec(n);

    const count=asInt(m?.[1]??m?.[2]);

    if(count===null||count<1||count>8)return null;

    return {count,name:n};

  }

  

  function snapshot(q=quest()){

    const rule=match(q),m=model(),rp=rpc(),b=bag(),ri=runeInfo();

    if(!rule)return {ready:false,reason:'Not explicit rune-inlay quest',rule:null,questId:q?.id??null};

    if(!m||typeof m.tab!=='object'||!Array.isArray(m.tips)||

       !b||typeof b.getItemsByBagType!=='function'||!ri||

       typeof rp?.inlayRune!=='function'||typeof _et.getStnTypeById!=='function'){

      return {ready:false,reason:'Game rune/bag model or native inlay API not loaded',rule,questId:q?.id};

    }

    const finish=asInt(_Ba?._IH?._ZY?.inst?.finishLv);

    if(finish===null)return {ready:false,reason:'Rune dungeon unlock level not loaded',rule,questId:q?.id};

    const occupied=C.slots.map(pos=>[pos,asInt(m.tab[pos])||0]);

    const sigBase=JSON.stringify([String(q.id),Number(q.state),q.progress??null,occupied]);

    const source=Array.isArray(m.canIlyRunes?.(0))?m.canIlyRunes(0):null;

    if(!source)return {ready:false,reason:'Native bag rune list unavailable',rule,questId:q.id,

      serverSig:sigBase};

    const candidates=[];

    for(const pos of C.slots){

      if((asInt(m.tab[pos])||0)!==0)continue;

      const unlock=m.tips[pos-1];

      if(typeof unlock!=='string')continue;

      const required=asInt(unlock.split('#').pop());

      if(required===null||finish<required)continue;

      for(const entry of source){

        if(!Array.isArray(entry))continue;

        const id=asInt(entry[0]),count=asInt(entry[1]),uid=asInt(entry[2]);

        if(!id||!count||!uid)continue;

        let subtype=null,cfg=null,quality=null,used=false;

        try{

          subtype=asInt(_et.getStnTypeById(id));

          cfg=ri.getCfgById?.(Math.floor(id/10000)*10000);

          quality=asInt(_et.getQltyById?.(id));

          used=!!m.getIsHave?.(id,pos,0);

        }catch(_){continue;}

        if(subtype===null||subtype>=90||subtype===2||!Array.isArray(cfg)||

           finish<(asInt(cfg[5])??Infinity)||used)continue;

        if(m.pttab&&m.pttab[subtype])continue;

        // Re-validate UID is still present in the server-backed bag snapshot.

        const live=(b.getItemsByBagType(5)||[]).some(x=>Array.isArray(x)&&

          asInt(x[0])===id&&asInt(x[2])===uid&&Number(x[1])>0);

        if(live)candidates.push({pos,id,uid,quality:quality||0,required});

      }

    }

    candidates.sort((a,b)=>b.quality-a.quality||b.id-a.id||a.pos-b.pos);

    const chosen=candidates[0]||null;

    const signature=JSON.stringify([sigBase,chosen?.pos,chosen?.id,chosen?.uid]);

    return {ready:!!chosen,reason:chosen?'Eligible empty slot with owned rune':'No empty unlocked slot and suitable owned rune',

      rule,questId:String(q.id),chosen,candidates:candidates.length,

      serverSig:sigBase,signature,progressSig:JSON.stringify(q.progress??null)};

  }

  function acknowledged(p){

    const q=quest(),m=model();

    if(!q||String(q.id)!==p.questId||Number(q.state)===2)return true;

    if((asInt(m?.tab?.[p.pos])||0)!==0)return true;

    return JSON.stringify(q.progress??null)!==p.progressSig;

  }

  

  function watch(){

    for(const k of ['pending','blocked']){

      const p=S[k];if(!p)continue;

      if(acknowledged(p)){

        if(k==='pending')S.acked++;

        log(k==='pending'?'server-ack':'server-changed',{questId:p.questId,pos:p.pos});

        S[k]=null;

      }else if(k==='pending'&&time()-p.at>C.ackTimeoutMs){

        S.blocked=p;S.pending=null;

        log('timeout-locked',{questId:p.questId,pos:p.pos});

        console.warn('[KVPV INLAY931] No server ACK; locked without retry',p.questId);

      }

    }

  }

  

  function preview(q=quest()){

    const p=snapshot(q),used=S.attempts.get(String(q?.id))||0;

    let reason=p.reason;

    if(actor()!==MAIN)reason='MAIN account only';

    else if(!C.enabled||!C.autoInlay)reason='Disabled';

    else if(S.pending)reason='Waiting server ACK';

    else if(S.blocked)reason='Blocked until server state changes';

    else if(C.requireCommonScene&&!common())reason='In battle/instance or not a safe common scene';

    else if(used>=C.maxRequestsPerQuest)reason='Quest safety limit';

    else if(time()-S.lastSendAt<C.minGapMs)reason='Native command gap';

    const ready=p.ready&&actor()===MAIN&&C.enabled&&C.autoInlay&&

      !S.pending&&!S.blocked&&(!C.requireCommonScene||common())&&

      used<C.maxRequestsPerQuest&&time()-S.lastSendAt>=C.minGapMs;

    return {...p,ready,reason,used,pending:!!S.pending,blocked:!!S.blocked};

  }

  const probe=q=>{const p=preview(q);return {ready:p.ready,signature:p.signature||'missing-rune-snapshot'};};

  function run(q,previous){

    const current=quest(),p=preview(current);

    if(String(q?.id)!==String(current?.id)||!p.ready||!p.chosen||

       p.signature!==previous.signature||typeof rpc()?.inlayRune!=='function')

      throw Error('Server quest/rune snapshot changed before native action');

    const row={at:time(),questId:String(q.id),pos:p.chosen.pos,uid:p.chosen.uid,

      id:p.chosen.id,progressSig:p.progressSig};

    S.pending=row;S.lastSendAt=row.at;

    S.attempts.set(row.questId,p.used+1);

    try{

      rpc().inlayRune([row.pos,row.uid]);

      S.sent++;log('native-inlay',{questId:row.questId,pos:row.pos,itemId:row.id});

    }catch(e){S.errors++;S.lastError=String(e);S.pending=null;S.blocked=row;throw e;}

  }

  

  function status(){const p=preview();return {version:VERSION,running:S.running,actor:actor(),

    questId:p.questId??null,matched:!!p.rule,ready:p.ready,reason:p.reason,

    candidate:p.chosen||null,pending:p.pending,blocked:p.blocked,

    sent:S.sent,serverConfirmed:S.acked,errors:S.errors,lastError:S.lastError,

    tower:'manual-only'};}

  

  function stop(){C.enabled=false;S.running=false;

    if(S.timer){if(typeof __KVPV29!=='undefined'&&typeof __KVPV29.cancel==='function')

      __KVPV29.cancel(S.timer);else clearInterval(S.timer);S.timer=null;}

    return status();}

  

  function start(){

    C.enabled=true;

    if(!S.registered){

      F.registerRecipe({type:'rune-inlay-empty',verified:true,spend:'materials',

        match:q=>!!match(q),probe,run});S.registered=true;

    }

    if(F.config)F.config.allowMaterialRecipes=true;

    if(S.timer){if(typeof __KVPV29!=='undefined'&&typeof __KVPV29.cancel==='function')

      __KVPV29.cancel(S.timer);else clearInterval(S.timer);}

    const tick=()=>{try{if(actor()!==MAIN){stop();return;}watch();}

      catch(e){S.errors++;S.lastError=String(e);}};

    S.timer=typeof __KVPV29!=='undefined'&&typeof __KVPV29.every==='function'?

      __KVPV29.every(tick,C.pollMs):setInterval(tick,C.pollMs);

    S.running=true;tick();return status();

  }

  const api={installed:true,version:VERSION,config:C,start,stop,status,preview,

    history:()=>S.history.slice(),report(){const x=status();console.table([x]);return x;}};

  W.KVPV_RUNE_INLAY931=api;

  try{start();console.log('[KVPV INLAY931] Native rune inlay executor ready; tower manual');}

  catch(e){S.errors++;S.lastError=String(e);console.warn('[KVPV INLAY931] Install failed',e);}

})();

  });

  install("KVPV_STAR_REWARD932",()=>{

(() => {

  'use strict';

  const W = window;

  const MAIN_ID = String(window.__KVPV_OWN_ACTOR_ID||'');

  const existing = W.KVPV_STAR_REWARD932;

  if (existing?.installed) {

    console.info('[KVPV STAR932] Already installed, avoiding duplicate claim worker');

    return;

  }

  const config = {

    enabled: true,

    autoCollect: true,

    sceneId: 34,

    pollMs: 900,

    minGapMs: 2500,

    ackTimeoutMs: 30000,

    maxRequestsPerVisit: 12,

    maxHistory: 80

  };

  const state = {

    installed: true, running: false, timer: null, scheduler: null,

    pending: null, blocked: null,

    lastSendAt: 0, lastScene: null, visit: 0, sentThisVisit: 0,

    sent: 0, confirmed: 0, timedOut: 0, errors: 0, lastError: '',

    observed: 0, log: []

  };

  const now = () => Date.now();

  const game = () => typeof _Ba !== 'undefined' ? _Ba : null;

  const actor = () => String(game()?._rJ?._O$?.ins?.actorId ?? '');

  const scene = () => Number(game()?._$a?.SceneUtil?.curScene ?? -1);

  const model = () => game()?._MT?.the_secret_of_the_stars?._Gvt?.instance;

  const native = () => game()?._MT?.the_secret_of_the_stars?._jvt?.ins;

  const inventory = () => game()?._Ic?._aQ?.ins;

  const queueBusy = () => {

    try { return W.KVPV_UPGRADES?.busy?.() === true; }

    catch (_) { return true; }  // fail closed if shared queue status breaks

  };

  const log = (kind, details = {}) => {

    state.log.push({ time: new Date().toISOString(), kind, ...details });

    if (state.log.length > config.maxHistory) state.log.shift();

  };

  function bagSnapshot() {

    let rows;

    try { rows = inventory()?.getItemsByBagType?.(7); }

    catch (_) { return { available: false, count: 0, signature: null }; }

    if (!Array.isArray(rows)) return { available: false, count: 0, signature: null };

    // Only serializable primitive item fields. Never mutate the live bag array.

    const items = rows.filter(Array.isArray).map(r => [

      String(r[0] ?? ''), Number(r[1] ?? 0), String(r[2] ?? '')

    ]).sort((a,b) => JSON.stringify(a).localeCompare(JSON.stringify(b)));

    return { available: true, count: items.length,

      signature: JSON.stringify(items), items };

  }

  function rewardReady() {

    try { return model()?.getState?.() === true; }

    catch (_) { return false; }

  }

  function progress(bag) {

    // Require a *new inventory state* after a native request; scene changes,

    // timer expiry and UI animations are NOT proof of server confirmation.

    if (state.pending && bag.available && bag.signature !== state.pending.signature) {

      state.confirmed++;

      log('confirmed-server-bag-change', { previousCount: state.pending.count,

        nextCount: bag.count });

      state.pending = null;

    }

    if (state.blocked && bag.available && bag.signature !== state.blocked.signature) {

      log('unblocked-new-server-bag', { count: bag.count });

      state.blocked = null;

    }

    if (state.pending && now() - state.pending.sentAt >= config.ackTimeoutMs) {

      state.blocked = { ...state.pending };

      state.pending = null;

      state.timedOut++;

      log('timeout-locked', { count: state.blocked.count });

      console.warn('[KVPV STAR932] No confirmed server change after claim; locked until bag changes');

    }

  }

  

  function preview() {

    const bag = bagSnapshot();

    const currentScene = scene();

    let reason = 'Reward ready';

    if (actor() !== MAIN_ID) reason = 'MAIN account only';

    else if (!state.running || !config.enabled || !config.autoCollect) reason = 'Disabled';

    else if (currentScene !== config.sceneId) reason = 'Not in Tinh Than boss scene 34';

    else if (!bag.available) reason = 'Temporary bag data not loaded';

    else if (!bag.count) reason = 'No temporary rewards in bag';

    else if (typeof native()?.PickTempReward !== 'function') reason = 'Native claim API not loaded';

    else if (!rewardReady()) reason = 'Game has not enabled temporary reward claim';

    else if (state.pending) reason = 'Waiting server bag change';

    else if (state.blocked) reason = 'Server ACK timeout: waiting for new bag state';

    else if (state.sentThisVisit >= config.maxRequestsPerVisit) reason = 'Visit claim limit reached';

    else if (queueBusy()) reason = 'Shared queue busy';

    else if (now() - state.lastSendAt < config.minGapMs) reason = 'Minimum interval between native claims';

    return { ready: reason === 'Reward ready', reason, scene: currentScene,

      actor: actor(), bagAvailable: bag.available, bagCount: bag.count,

      bagSignature: bag.signature, pending: !!state.pending, blocked: !!state.blocked };

  }

  

  function tick() {

    if (!state.running) return;

    if (actor() !== MAIN_ID) { stop(); log('wrong-actor-stopped'); return; }

    const curScene = scene();

    if (state.lastScene !== curScene) {

      if (curScene === config.sceneId) {

        state.visit++;

        state.sentThisVisit = 0;

        log('entered-star-scene', { visit: state.visit });

      }

      state.lastScene = curScene;

    }

    const bag = bagSnapshot();

    if (bag.available) { state.observed++; progress(bag); }

    const p = preview();

    if (!p.ready) return;

    // Recheck all native eligibility immediately before sending.

    const before = bagSnapshot();

    if (!before.available || before.signature !== p.bagSignature ||

        !rewardReady() || queueBusy() || scene() !== config.sceneId) return;

    const req = { signature: before.signature, count: before.count, sentAt: now() };

    state.pending = req; state.lastSendAt = req.sentAt;

    state.sentThisVisit++;

    try {

      native().PickTempReward();

      state.sent++;

      log('sent-native-claim', { count: req.count, visit: state.visit });

    } catch (e) {

      state.errors++; state.lastError = String(e?.message ?? e);

      state.blocked = req; state.pending = null;

      log('native-error-locked', { error: state.lastError });

    }

  }

  

  function status() {

    const p = preview();

    return { version: '9.3.2', running: state.running, autoCollect: config.autoCollect,

      ...p, visit: state.visit, requestsThisVisit: state.sentThisVisit,

      sent: state.sent, serverConfirmed: state.confirmed, timeouts: state.timedOut,

      errors: state.errors, lastError: state.lastError,

      tower: 'manual-only' };

  }

  

  function stop() {

    state.running = false;

    if (state.timer !== null) {

      if (state.scheduler === 'shared' && typeof __KVPV29 !== 'undefined') __KVPV29.cancel(state.timer);

      else clearInterval(state.timer);

    }

    state.timer = null; state.scheduler = null;

    return status();

  }

  

  function start() {

    if (state.running) return status();

    if (actor() !== MAIN_ID) {

      console.warn('[KVPV STAR932] Refuse start: MAIN-only; wrong game-frame');

      return status();

    }

    state.running = true;

    const cb = () => {

      try { tick(); } catch (e) {

        state.errors++; state.lastError = String(e?.message ?? e);

        log('watch-error', { error: state.lastError });

      }

    };

    if (typeof __KVPV29 !== 'undefined' && typeof __KVPV29.every === 'function') {

      state.scheduler = 'shared';

      state.timer = __KVPV29.every(cb, config.pollMs);

    } else {

      state.scheduler = 'interval';

      state.timer = setInterval(cb, config.pollMs);

    }

    cb();

    return status();

  }

  const api = {

    installed: true, version: '9.3.2', config, start, stop, status, preview,

    scan: tick,

    history: () => state.log.slice(),

    report() { const data = status(); console.table([data]); return data; }

  };

  W.KVPV_STAR_REWARD932 = api;

  try { start(); }

  catch (e) { state.errors++; state.lastError = String(e); stop();

    console.warn('[KVPV STAR932] Unable to install', e); }

})();

  });

  install("KVPV_BEAUTY933",()=>{

(() => {

  'use strict';

  const W=window, MAIN=String(window.__KVPV_OWN_ACTOR_ID||''), NAME='KVPV_BEAUTY933';

  if(W[NAME]?.installed){console.info('[BEAUTY933] Already installed');return;}

  const C={enabled:true,autoActivate:true,pollMs:800,minGapMs:1000,

    ackTimeoutMs:30000,maxCommandsSession:90,maxHistory:100};

  const S={running:false,timer:null,scheduler:null,pending:null,blocked:null,

    lastSend:0,lastModelRequest:0,modelRequests:0,commands:0,confirmed:0,

    timeouts:0,errors:0,lastError:'',notes:[]};

  const now=()=>Date.now();

  const getGame=()=>typeof _Ba==='undefined'?null:_Ba;

  const getConfig=()=>typeof _ft==='undefined'?null:_ft._Ftt?.ins;

  const actor=()=>String(getGame()?._rJ?._O$?.ins?.actorId??'');

  const model=()=>getGame()?._Q9?._ttt?.ins;

  const api=()=>getGame()?._Q9?._$dt?.ins;

  const bag=()=>getGame()?._Ic?._aQ?.ins;

  const num=v=>{const n=Number(v);return Number.isSafeInteger(n)&&n>=0?n:null;};

  const record=(kind,extra={})=>{

    S.notes.push({at:new Date().toISOString(),kind,...extra});

    if(S.notes.length>C.maxHistory)S.notes.shift();

  };

  function getLevel(id){

    const book=model()?.BeautyInfodirc?.[1];

    if(!book||typeof book!=='object')return null;  // no server snapshot yet

    const lv=book[id]?.level;

    return lv==null?0:num(lv);

  }

  function material(id){

    try{return num(bag()?.getItemCountById?.(id));}catch(_){return null;}

  }

  function collect(){

    const book=model()?.BeautyInfodirc?.[1],cfg=getConfig();

    if(!book||typeof book!=='object')return {ready:false,reason:'Dang doi du lieu Nữ Bộc tu server',options:[]};

    if(!cfg||typeof cfg.getBeautyFairyIds!=='function'||typeof cfg.getCfgByIdAndLv!=='function')

      return {ready:false,reason:'Chua tai cau hinh Nữ Bộc',options:[]};

    const ids=cfg.getBeautyFairyIds();

    if(!Array.isArray(ids)||ids.length===0)

      return {ready:false,reason:'Danh sach Nữ Bộc chua tai',options:[]};

    const options=[];let activated=0,needed=0;

    for(const rawId of ids){

      const id=num(rawId),level=getLevel(id);

      if(!id||level===null)continue;

      if(level>=9){activated++;continue;}  // never auto promote to new tiers

      needed++;

      let row;

      try{row=cfg.getCfgByIdAndLv(id,level);}catch(_){continue;}

      if(!Array.isArray(row)||num(row[0])!==id||!Array.isArray(row[5]))continue;

      const itemId=num(row[5][0]),count=num(row[5][1]),kind=num(row[2]);

      // Reject costs that might be currency or malformed configuration.

      if(!itemId||itemId<10000||!count||count>10000||kind===null)continue;

      const have=material(itemId);

      if(have===null||have<count)continue;

      options.push({id,level,materialId:itemId,need:count,have,

        nativeKind:kind,nativeId:id});

    }

    options.sort((a,b)=>b.level-a.level||a.need-b.need||a.id-b.id);

    return {ready:options.length>0,

      reason:options.length?'Co Nữ Bộc du nguyen lieu kich hoat':

        needed===0?'Tat ca Nữ Bộc da duoc kich hoat':'Chua co Nữ Bộc du nguyen lieu kich hoat',

      options,activated,notActivated:needed,total:ids.length};

  }

  function reconcile(){

    const p=S.pending||S.blocked;

    if(!p)return;

    const lv=getLevel(p.id);

    if(lv!==null&&lv>p.level){

      if(S.pending)S.confirmed++;

      record(S.pending?'server-confirmed':'late-server-confirmed',{

        id:p.id,from:p.level,to:lv});

      S.pending=null;S.blocked=null;

      return;

    }

    if(S.pending&&now()-S.pending.sentAt>C.ackTimeoutMs){

      S.blocked=S.pending;S.pending=null;S.timeouts++;

      record('ack-timeout-locked',{id:S.blocked.id,level:S.blocked.level});

      console.warn('[BEAUTY933] Timeout: khong thay cap Nu Boc thay doi; dung gui lenh');

    }

  }

  

  function preview(){

    const scan=collect(),chosen=scan.options[0]||null;

    let reason=scan.reason;

    if(actor()!==MAIN)reason='Sai nhan vat MAIN';

    else if(!S.running||!C.enabled||!C.autoActivate)reason='Da tam dung';

    else if(W.__KVPV_UNIVERSAL_HALTED)reason='FULL da dung';

    else if(!scan.ready)reason=scan.reason;

    else if(typeof api()?.RiseBeauty!=='function')reason='Thieu native RiseBeauty';

    else if(S.pending)reason='Doi server ACK';

    else if(S.blocked)reason='ACK timeout: khoa de khong gui lap';

    else if(S.commands>=C.maxCommandsSession)reason='Dat gioi han hanh dong phien';

    else if(now()-S.lastSend<C.minGapMs)reason='Dang giãn cach lenh';

    else {

      try{if(W.KVPV_UPGRADES?.busy?.()===true)reason='Hang doi nang cap dang ban';}

      catch(_){reason='Khong doc duoc hang doi nang cap';}

    }

    return {ready:reason===scan.reason&&scan.ready,reason,selected:chosen,

      count:scan.options.length,activated:scan.activated,notActivated:scan.notActivated,

      total:scan.total};

  }

  

  function tick(){

    if(!S.running)return;

    if(actor()!==MAIN||W.__KVPV_UNIVERSAL_HALTED){stop();return;}

    if(!model()?.BeautyInfodirc?.[1]){

      // Native read-only model request; at most once per running session.

      if(!S.modelRequests&&typeof api()?.GetBeautyHandBookInfo==='function'){

        S.modelRequests++;S.lastModelRequest=now();

        try{api().GetBeautyHandBookInfo();record('requested-model-once');}

        catch(e){S.errors++;S.lastError=String(e);}

      }

      return;

    }

    reconcile();

    const p=preview();if(!p.ready||!p.selected)return;

    const before=collect().options.find(x=>x.id===p.selected.id);

    if(!before||before.level!==p.selected.level||before.have<before.need||

       S.pending||S.blocked||typeof api()?.RiseBeauty!=='function')return;

    const req={id:before.id,level:before.level,materialId:before.materialId,

      need:before.need,sentAt:now()};

    S.pending=req;S.lastSend=req.sentAt;

    try{

      api().RiseBeauty(before.nativeKind,before.nativeId);

      S.commands++;

      record('native-activation-sent',{id:req.id,level:req.level,

        materialId:req.materialId,need:req.need});

    }catch(e){

      S.errors++;S.lastError=String(e?.message??e);

      S.blocked=req;S.pending=null;

      record('native-error-locked',{error:S.lastError,id:req.id});

    }

  }

  

  function status(){const p=preview();return {version:'9.3.3',running:S.running,

    autoActivate:C.autoActivate,...p,pending:S.pending,blocked:S.blocked,

    sent:S.commands,serverConfirmed:S.confirmed,timeouts:S.timeouts,

    errors:S.errors,lastError:S.lastError,tower:'manual-only'};}

  

  function stop(){

    S.running=false;

    if(S.timer!=null){

      if(S.scheduler==='shared'&&typeof __KVPV29!=='undefined')__KVPV29.cancel(S.timer);

      else clearInterval(S.timer);

    }

    S.timer=null;S.scheduler=null;

    return status();

  }

  

  function start(){

    if(S.running)return status();

    if(actor()!==MAIN){console.warn('[BEAUTY933] MAIN-only');return status();}

    S.running=true;

    const cb=()=>{try{tick();}catch(e){S.errors++;S.lastError=String(e);record('worker-error',{error:S.lastError});}};

    if(typeof __KVPV29!=='undefined'&&typeof __KVPV29.every==='function'){

      S.scheduler='shared';S.timer=__KVPV29.every(cb,C.pollMs);

    }else{S.scheduler='interval';S.timer=setInterval(cb,C.pollMs);}

    cb();return status();

  }

  const ext={installed:true,version:'9.3.3',config:C,start,stop,status,preview,

    scan:tick,history:()=>S.notes.slice(),report(){const s=status();console.table([{

      running:s.running,reason:s.reason,ready:s.ready,selected:s.selected?.id,

      currentLevel:s.selected?.level,owned:s.selected?.have,required:s.selected?.need,

      sent:s.sent,serverConfirmed:s.serverConfirmed,blocked:!!s.blocked}]);return s;}};

  W[NAME]=ext;

  try{start();}catch(e){S.lastError=String(e);S.errors++;stop();console.warn('[BEAUTY933] Start failed',e);}

})();

  });

  install("KVPV_ESCORT934",()=>{

(() => {

  'use strict';

  const W=window, NAME='KVPV_ESCORT934', MAIN=String(window.__KVPV_OWN_ACTOR_ID||'');

  if(W[NAME]?.installed){console.info('[ESCORT934] Da nap san. status():',W[NAME].status());return;}

  const C={enabled:true,autoStart:true,autoClaim:true,onlyDouble:true,

    pollMs:900,minActionGapMs:1200,ackTimeoutMs:30000,

    refreshAfterMs:3000,readWhenNoModel:true,maxActionsPerSession:10,

    maxHistory:100};

  const S={running:false,timer:null,scheduler:null,listenerOn:false,

    pending:null,blocked:null,waitingLoad:false,modelReads:0,

    lastAction:0,sentStart:0,sentClaim:0,sentAssist:0,confirmedStart:0,confirmedClaim:0,confirmedAssist:0,lastAssistListRead:0,

    timeouts:0,errors:0,lastError:'',history:[],stoppedReason:''};

  const game=()=>typeof _Ba==='undefined'?null:_Ba;

  const actor=()=>String(game()?._rJ?._O$?.ins?.actorId??'');

  const model=()=>game()?._m8?._gmi?.ins;

  const api=()=>game()?._m8?._bmi?.ins;

  const now=()=>Date.now();

  const utcDayVN=()=>new Intl.DateTimeFormat('sv-SE',{timeZone:'Asia/Ho_Chi_Minh',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());

  const cacheKey=()=>`KVPV_ESCORT934_LOCK_${MAIN}_${utcDayVN()}`;

  const num=v=>(v===null||v===undefined||v==='')?null:(Number.isSafeInteger(Number(v))?Number(v):null);

  const note=(kind,detail={})=>{S.history.push({time:new Date().toISOString(),kind,...detail});if(S.history.length>C.maxHistory)S.history.shift();};

  function limit(){try{return num(_ft?._gY?.ins?.getCfgById?.(31005)?.[2]?.[0]);}catch(_){return null;}}
  function limitAssist(){try{return num(_ft?._gY?.ins?.getCfgById?.(31006)?.[2]?.[0]);}catch(_){return null;}}
  function limitAssistTarget(){try{return num(_ft?._gY?.ins?.getCfgById?.(31007)?.[2]?.[0]);}catch(_){return null;}}

  

  function snapshot(){

    const m=model(),a=api(),hasModel=!!m;

    const state=num(m?.sendState),used=num(m?.escort),max=limit(),intercept=num(m?.intercept),assistRows=Array.isArray(m?.esList)?m.esList:[];

    const fairy=num(m?.fairyId),endTime=num(m?.endTime),doubleRaw=m?.isDouble;

    const sceneDouble=(()=>{try{return Number(game()?._sst?._ist?.inst?.getCpSceneStateByType?.(23)?.[2])===2;}catch(_){return false;}})();

    // Only server-owned x2 flags; never use fixed guessed clock windows to spend attempts.

    const isDouble=doubleRaw===true||doubleRaw===1||doubleRaw==='1'||sceneDouble;

    return {modelReady:hasModel&&[0,1,2].includes(state)&&used!==null&&max!==null,

      apiReady:typeof a?.escortFairy==='function'&&typeof a?.getFairyAward==='function',
      assistReady:typeof a?.interceptFairy==='function'&&typeof a?.getFairyEscortList==='function',

      state,used,max,left:(used!==null&&max!==null)?Math.max(0,max-used):null,intercept,assistMax:limitAssist(),assistRows,

      fairy,endTime,isDouble,sceneDouble,rawDouble:doubleRaw??null,

      signature:`${state??'x'}|${used??'x'}|${fairy??'x'}|${endTime??'x'}`};

  }

  function assistTarget(s=snapshot()){

    const own=limitAssistTarget(),serverNow=Number(_Sa?.svrTime)||0;
    if(!s.assistReady||s.intercept===null||s.assistMax===null||s.intercept>=s.assistMax||own===null||!Array.isArray(s.assistRows))return null;
    return s.assistRows.filter(row=>Array.isArray(row)&&Number(row[1])>0&&String(row[1])!==MAIN&&
      Number(row[3])>serverNow&&Number(row[5])<own&&Array.isArray(row[7])&&!row[7].some(id=>String(id)===MAIN))
      .sort((a,b)=>Number(a[5])-Number(b[5])||Number(a[3])-Number(b[3]))[0]||null;
  }

  function saveLock(){

    try{

      if(S.pending||S.blocked)sessionStorage.setItem(cacheKey(),JSON.stringify({day:utcDayVN(),pending:S.pending,blocked:S.blocked}));

      else sessionStorage.removeItem(cacheKey());

    }catch(_){/* storage can be disabled */}

  }

  function restoreLock(){

    try{

      const value=JSON.parse(sessionStorage.getItem(cacheKey())||'null');

      if(value?.day===utcDayVN()){

        S.pending=value.pending||null;S.blocked=value.blocked||null;

        if(S.pending||S.blocked)note('restored-lock-after-reload');

      }

    }catch(_){/* no stored lock */}

  }

  function clearOnServerAck(s){

    const lock=S.pending||S.blocked;

    if(!lock||!s.modelReady)return;

    const changed=lock.kind==='start'
      ? (s.state===1||s.state===2||s.used>lock.used||s.endTime!==lock.endTime)
      : lock.kind==='assist'
        ? (s.intercept>lock.intercept||s.assistRows.some(row=>Array.isArray(row)&&String(row[1])===String(lock.target)&&Array.isArray(row[7])&&row[7].some(id=>String(id)===MAIN)))
        : (s.state!==2);

    if(changed){

      if(lock.kind==='start')S.confirmedStart++;
      else if(lock.kind==='assist')S.confirmedAssist++;
      else S.confirmedClaim++;

      note('server-confirmed',{action:lock.kind,from:lock.before,to:s.signature,late:!!S.blocked});

      S.pending=null;S.blocked=null;saveLock();

      return;

    }

    if(S.pending && now()-S.pending.at>=C.ackTimeoutMs){

      S.blocked={...S.pending,unconfirmedAt:now()};S.pending=null;S.timeouts++;

      note('ack-timeout-locked',{action:S.blocked.kind,before:S.blocked.before});

      saveLock();console.warn('[ESCORT934] Server chua xac nhan; khoa de tranh gui lap:',S.blocked.kind);

    }

  }

  function legacyDisable(){

    const V=W.KVPV_V8;if(typeof V?.toggle!=='function')return;

    // Old 8.6.25 reward plugin uses an over-broad daily lock;

    // old 8.6.23 start was intentionally disabled. This module owns escort only.

    for(const id of ['e23_escort_start','e23_escort_claim','e25_escort_reward_ack']){

      try{V.toggle(id,false);}catch(_){/* plugin may not exist */}

    }

  }

  function legacyPending(){

    try{return W.KVPV_EVENTS25?.status?.(false)?.actions?.some(x=>x.key==='escort'&&x.pending)===true;}

    catch(_){return false;}

  }

  function plan(s=snapshot()){

    let action='wait',reason='';

    if(actor()!==MAIN)reason='Sai tai khoan MAIN';

    else if(!S.running||!C.enabled)reason='Da tam dung';

    else if(W.__KVPV_UNIVERSAL_HALTED)reason='FULL da dung';

    else if(!s.modelReady)reason='Doi du lieu Ho Tong tu server';

    else if(!s.apiReady)reason='Thieu native Ho Tong';

    else if(S.pending)reason=`Dang doi server ACK: ${S.pending.kind}`;

    else if(S.blocked)reason=`Da khoa vi khong co ACK: ${S.blocked.kind}`;

    else if(now()-S.lastAction<C.minActionGapMs)reason='Gian cach toi thieu giua thao tac';

    else if(S.sentStart+S.sentClaim+S.sentAssist>=C.maxActionsPerSession)reason='Dat gioi han lenh trong phien';

    else if(s.state===2){

      if(!C.autoClaim)reason='Tu nhan thuong dang tat';

      else if(legacyPending())reason='Dang co lenh nhan thuong cu cho ACK';

      else action='claim';

    }else if(s.state===0){

      if(!C.autoStart)reason='Tu bat dau dang tat';

      else if(C.onlyDouble&&!s.isDouble)reason='Dang cho Ho Tong x2';

      else if(s.left===null||s.left<=0)reason='Het luot ho tong';

      else if(!(s.fairy>0))reason='Chua co Tien Nu mac dinh duoc server xac nhan';

      else action='start';

    }else if(s.state!==1)reason='Trang thai chua biet';

    if(action==='wait'&&['Dang ho tong (cho server ket thuc)','Dang cho Ho Tong x2','Het luot ho tong','Tu bat dau dang tat'].includes(reason)){
      const target=assistTarget(s);if(target){action='assist';reason='Co luot tro luc mien phi';}
    }
    if(action==='wait'&&s.state===1){const target=assistTarget(s);if(target){action='assist';reason='Co luot tro luc mien phi';}else reason='Dang ho tong (cho server ket thuc)';}

    return {ready:action!=='wait',action,reason:reason||'San sang',snapshot:s,target:action==='assist'?assistTarget(s):null};

  }

  function doNative(action,s){

    const a=api();const meth=action==='start'?'escortFairy':action==='assist'?'interceptFairy':'getFairyAward';

    if(typeof a?.[meth]!=='function')return;

    const recheck=plan();if(!recheck.ready||recheck.action!==action||recheck.snapshot.signature!==s.signature)return;

    const lock={kind:action,at:now(),before:s.signature,state:s.state,used:s.used,endTime:s.endTime,intercept:s.intercept,target:recheck.target?.[1]??null,refreshDone:false};

    S.pending=lock;S.lastAction=lock.at;saveLock();

    try{

      if(action==='assist')a[meth]([lock.target]);else a[meth]();

      if(action==='start')S.sentStart++;else if(action==='assist')S.sentAssist++;else S.sentClaim++;

      note('sent-native',{action,method:meth,before:s.signature,left:s.left,double:s.isDouble});

    }catch(e){

      // An exception does not prove that the network message was not sent.

      S.lastError=String(e?.message??e);S.errors++;

      S.blocked={...lock,error:S.lastError};S.pending=null;saveLock();

      note('native-error-locked',{action,error:S.lastError});

    }

  }

  

  function tick(){

    if(!S.running)return;

    if(actor()!==MAIN||W.__KVPV_UNIVERSAL_HALTED){S.stoppedReason='actor-mismatch-or-full-stopped';stop();return;}

    legacyDisable();

    let s=snapshot();clearOnServerAck(s);

    // A single read-only refresh if the initial server model is missing.

    if(!s.modelReady){

      if(C.readWhenNoModel&&S.modelReads===0&&typeof api()?.getFairyInfo==='function'){

        S.modelReads++;try{api().getFairyInfo();note('read-initial-fairy-info');}

        catch(e){S.errors++;S.lastError=String(e);}

      }

      return;

    }

    // One re-read after a sent action, but never issue the action again without server ACK.

    if(S.pending&&!S.pending.refreshDone&&now()-S.pending.at>=C.refreshAfterMs){

      S.pending.refreshDone=true;saveLock();

      const refreshAssist=S.pending.kind==='assist';

      if(typeof api()?.getFairyInfo==='function'){

        try{api().getFairyInfo();note('refresh-info-for-ack',{action:S.pending.kind});}

        catch(e){S.errors++;S.lastError=String(e);}

      }

      if(refreshAssist&&typeof api()?.getFairyEscortList==='function')try{api().getFairyEscortList();}catch(e){S.errors++;S.lastError=String(e);}

      return;

    }

    if(!S.pending&&!S.blocked&&s.assistReady&&now()-S.lastAssistListRead>=15000){
      S.lastAssistListRead=now();try{api().getFairyEscortList();}catch(e){S.errors++;S.lastError=String(e);}
    }

    if(S.pending||S.blocked)return;

    const p=plan(s);if(p.ready)doNative(p.action,p.snapshot);

  }

  const listener={onFairy(){try{tick();}catch(e){S.errors++;S.lastError=String(e);}}};

  function attach(){if(S.listenerOn||typeof _Sa==='undefined'||typeof _Sa.notify?.on!=='function')return;

    try{_Sa.notify.on(5464,listener,listener.onFairy);S.listenerOn=true;}catch(_){window.KVPV_V1?.diagnostics?.record(_);}}

  function detach(){if(!S.listenerOn)return;

    try{_Sa?.notify?.off?.(5464,listener,listener.onFairy);}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

    S.listenerOn=false;

  }

  

  function start(){

    if(S.running)return status();

    if(actor()!==MAIN){console.warn('[ESCORT934] Chi chay tai MAIN');return status();}

    S.running=true;S.stoppedReason='';legacyDisable();attach();

    const job=()=>{try{tick();}catch(e){S.errors++;S.lastError=String(e);note('tick-error',{error:S.lastError});}};

    if(typeof __KVPV29!=='undefined'&&typeof __KVPV29.every==='function'){

      S.scheduler='shared';S.timer=__KVPV29.every(job,C.pollMs);

    }else{S.scheduler='interval';S.timer=setInterval(job,C.pollMs);}

    job();return status();

  }

  

  function stop(){

    S.running=false;

    if(S.timer!=null){

      if(S.scheduler==='shared'&&typeof __KVPV29!=='undefined')__KVPV29.cancel(S.timer);

      else clearInterval(S.timer);

    }

    S.timer=null;S.scheduler=null;detach();return status();

  }

  

  function status(){const s=snapshot(),p=plan(s);return {

    version:'9.3.4',running:S.running,actor:actor(),onlyDouble:C.onlyDouble,

    state:s.state,stateLabel:{0:'CHO BAT DAU',1:'DANG HO TONG',2:'NHAN THUONG'}[s.state]||'CHUA TAI',

    used:s.used,left:s.left,dailyLimit:s.max,isDouble:s.isDouble,fairyId:s.fairy,

    action:p.action,reason:p.reason,pending:S.pending,blocked:S.blocked,

    sentStart:S.sentStart,sentClaim:S.sentClaim,sentAssist:S.sentAssist,assistUsed:s.intercept,assistLimit:s.assistMax,serverConfirmedStart:S.confirmedStart,serverConfirmedAssist:S.confirmedAssist,

    serverConfirmedClaim:S.confirmedClaim,timeouts:S.timeouts,errors:S.errors,

    lastError:S.lastError,stoppedReason:S.stoppedReason,tower:'manual-only'

  };}

  

  function report(){const s=status();console.table([{

    running:s.running,state:s.stateLabel,left:s.left,limit:s.dailyLimit,

    x2:s.isDouble,action:s.action,reason:s.reason,started:s.sentStart,

    claimed:s.sentClaim,ackStart:s.serverConfirmedStart,ackClaim:s.serverConfirmedClaim,

    pending:!!s.pending,blocked:!!s.blocked

  }]);return s;}

  // Locks persisted across page reload; never offer unsafe instant retry.

  restoreLock();

  W[NAME]={installed:true,version:'9.3.4',config:C,start,stop,status,report,

    history:()=>S.history.slice(),check:()=>plan(),

    /* A manual reset should be used only after the player verifies in-game state. */

    resetUnconfirmedAfterReview(){if(S.pending)throw Error('Dang doi ACK, khong xoa khoa');

      if(!S.blocked)return false;

      S.blocked=null;saveLock();note('lock-manually-cleared-after-review');return true;

    }};

  try{start();}catch(e){S.lastError=String(e);S.errors++;stop();console.warn('[ESCORT934] Khoi tao loi',e);}

})();

  });

  W.KVPV_ACCOUNT_FEATURES=Object.freeze({status:()=>({actorId:actor,modules:results.map(x=>({...x}))})});

})();

