// [VI dòng gốc 1] Chú thích gốc của tác giả; không được thực thi. Nội dung: CHÚ THÍCH V1 — Tuyệt Học xa và bằng chứng sát thương.
/* CHÚ THÍCH V1 — Tuyệt Học xa và bằng chứng sát thương.
 * Khoảng cách tính từ vị trí Boss đến nhân vật; FULL hiện đặt 302 và xen đánh thường trong module 11. SCAN thử chiêu native; STRICT cần ít nhất hai cặp tung chiêu và sát thương khớp. Quyền hồi máu của HitRun được ưu tiên hơn việc giữ vị trí bắn.
 * Sửa nguồn tại đây rồi chạy node build.cjs; FULL và bản vá được sinh tự động. */
// [VI dòng gốc 4] Chú thích gốc của tác giả; không được thực thi. Nội dung: ===========================================================================
/* ===========================================================================
 * KVPV V12.9.6 — 300+ TUYET HOC RANGE VERIFICATION
 * Distinguishes cast-start range from damage callback range. STRICT only uses
 * skills with >=2 independent matching cast->hit pairs, both observed >300.
 * SCAN tests native non-basic active skills at a configurable distance.
 * No radius in static skill config has been confirmed; measured =/= guaranteed.
 * =========================================================================== */
// [VI dòng gốc 11] chạy ngay hàm bao để tạo phạm vi và khởi tạo phần chức năng bên trong
(() => {
// [VI dòng gốc 12] "use strict"
  'use strict';
// [VI dòng gốc 13] Khai báo biến không gán lại bằng const: W = window; TAG = "[TH300 V12.9.6]"; actorId = gọi String(W.__KVPV_OWN_ACTOR_ID||'') để chuyển sang chuỗi
  const W=window,TAG='[TH300 V12.9.6]',actorId=String(W.__KVPV_OWN_ACTOR_ID||'');
// [VI dòng gốc 14] gọi W.KVPV_BASIC10?.release() để nhả quyền điều khiển đang giữ (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  W.KVPV_BASIC10?.release?.();
// [VI dòng gốc 15] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | gọi W.KVPV_TH300?.stop('reload') để dừng bộ điều khiển và dọn tài nguyên (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Nhận lỗi bằng _ và chạy phần xử lý lỗi. | gọi window.KVPV_V1?.diagnostics?.record(_) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  try{W.KVPV_TH300?.stop?.('reload');}catch(_){window.KVPV_V1?.diagnostics?.record(_);}
// [VI dòng gốc 16] Khai báo biến không gán lại bằng const: Skill = đọc W._d?._Yct?._Eet nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); Combat = đọc W._d?._Yct?._Het nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); Move = đọc W._d?._Yct?._zet nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  const Skill=W._d?._Yct?._Eet,Combat=W._d?._Yct?._Het,Move=W._d?._Yct?._zet;
// [VI dòng gốc 17] Kiểm tra !actorId||!Skill||!Combat||!Move: đúng thì chạy nhánh sau if. | gọi console.warn(TAG, 'Chưa vào game-frame') | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  if(!actorId||!Skill||!Combat||!Move){console.warn(TAG,'Chưa vào game-frame');return;}
// [VI dòng gốc 18] Chú thích gốc của tác giả; không được thực thi. Nội dung: Mặc định 302 đơn vị Boss → nhân vật, sai số 5; dải thử còn yêu cầu lớn hơn 300.
  // Mặc định 302 đơn vị Boss → nhân vật, sai số 5; dải thử còn yêu cầu lớn hơn 300.
// [VI dòng gốc 19] Khai báo biến không gán lại bằng const: CFG = tạo đối tượng gồm min, max, goal, tolerance, scanMs, basicOnly, basicAnimationSpeed, clientPaceMs, afterTHWaitMs, moveWaitMs, castTtlMs, minCastConfirmations, paceMs
  const CFG={min:300,max:312,goal:302,tolerance:5,scanMs:4,basicOnly:false,basicAnimationSpeed:1,tqTuyetHocVisualSpeed:99,clientPaceMs:null,afterTHWaitMs:0,moveWaitMs:150,castTtlMs:3500,minCastConfirmations:2,paceMs:75};
// [VI dòng gốc 20] Khai báo biến không gán lại bằng const: scopedCombat = tạo hàm với tham số (không có); mỗi lần gọi trả về W.KVPV_DESKTOP_CONTROL?.scopeProfile?.(W.KVPV_FAR_SCOPE?.status?.()?.kind) hoặc dùng vế phải khi vế trái là null/undefined: null
  const scopedCombat=()=>W.KVPV_DESKTOP_CONTROL?.scopeProfile?.(W.KVPV_FAR_SCOPE?.status?.()?.kind)??null;
  const tqDistanceOnly=()=>W.KVPV_TQ_POSITION_ONLY?.enabled===true&&W.KVPV_FAR_SCOPE?.status?.()?.kind==='THIEN_QUAN';
// [VI dòng gốc 21] Duyệt từng giá trị trong ['goal','min','max','basicOnly'] bằng const key. | Khai báo biến không gán lại bằng const: key (chưa gán giá trị) | Khai báo biến có thể gán lại bằng let: base = đọc CFG[key] | gọi Object.defineProperty(CFG, key, {enumerable:true,configurable:true,get(){const p=scopedCombat();if(!p)return base;if(key==='basicOnly')return …)
  for(const key of ['goal','min','max','basicOnly']){let base=CFG[key];Object.defineProperty(CFG,key,{enumerable:true,configurable:true,get(){if(tqDistanceOnly()){if(key==='goal')return 310;if(key==='min')return 300;if(key==='max')return 320;}const p=scopedCombat();if(!p)return base;if(key==='basicOnly')return p.mode==='basic8001';if(key==='goal')return p.distance;if(key==='max')return p.distance+10;return p.distance===300?295:p.distance>300?300:280;},set(value){base=value;}});}
// [VI dòng gốc 22] Khai báo biến không gán lại bằng const: metrics = W.KVPV_COMBAT_METRICS?.create?.() hoặc dùng vế phải khi vế trái là null/undefined: null
  const metrics=W.KVPV_COMBAT_METRICS?.create?.()??null;
// [VI dòng gốc 23] Khai báo biến không gán lại bằng const: pacer = W.KVPV_SKILL_PACING?.create?.() hoặc dùng vế phải khi vế trái là null/undefined: null
  const pacer=W.KVPV_SKILL_PACING?.create?.()??null;
// [VI dòng gốc 24] Khai báo biến không gán lại bằng const: transforming = tạo hàm với tham số (không có); mỗi lần gọi trả về W.KVPV_TRANSFORM10?.transformed?.() và chỉ đánh giá vế phải khi vế trái truthy: W.KVPV_TRANSFORM10.status().enabled
  const transforming=()=>W.KVPV_TRANSFORM10?.transformed?.()&&W.KVPV_TRANSFORM10.status().enabled;
// [VI dòng gốc 25] Khai báo biến không gán lại bằng const: currentPace = tạo hàm với tham số (không có); mỗi lần gọi trả về scopedCombat()?.intervalMs??CFG.clientPaceMs hoặc dùng vế phải khi vế trái là null/undefined: transforming()?10:(mixed.enabled&&mixed.wantBasic&&mixed.basicPaceMs!==null?mixed.basicPaceMs:(pacer?.pace()??CFG.paceMs))
  const currentPace=()=>Math.max(cooldown4100.enabled&&basicSolo4100Active()?80:0,
    tqFive?.active()?tqFive.wait():scopedCombat()?.intervalMs??CFG.clientPaceMs??(transforming()?10:(mixed.enabled&&mixed.wantBasic&&mixed.basicPaceMs!==null?mixed.basicPaceMs:(pacer?.pace()??CFG.paceMs))));
// [VI dòng gốc 26] Định nghĩa hàm setClientPace; tham số: value=1. Mục đích: đặt khoảng chờ thêm chung giữa các lần thử tung chiêu phía client | Kiểm tra value===null: đúng thì chạy nhánh sau if. | gán CFG.clientPaceMs bằng null | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm clientPaceMs.
  function setClientPace(value=1){if(value===null){CFG.clientPaceMs=null;return {clientPaceMs:null};}const n=Number(value);if(!Number.isFinite(n)||n<0||n>1000)throw Error('Client pace must be 0..1000 ms');CFG.clientPaceMs=n;return {clientPaceMs:n};}
// [VI dòng gốc 27] Khai báo biến không gán lại bằng const: ST = tạo đối tượng gồm running, mode, s, c, target, targetOcc, owner, lastMove, timer, lastTickAt, timerRepairs, casts, proofs, evidence, stats, seen, blocked, skillWaits, moves, castAttempts, confirmedPairs, basicImpactSerial, basicTailReleases, lastDistance, lastHitDistance, arrivalSample, arrivalSnap, positionSample, positionRetries, positionOffset, positionCommands, positionPause, positionRecovery, movement, posi…
  const ST={running:false,mode:'OFF',s:null,c:null,target:null,targetOcc:null,owner:{},lastMove:0,
// [VI dòng gốc 28] Thuộc tính timer: null | Thuộc tính lastTickAt: null | Thuộc tính timerRepairs: 0 | Thuộc tính casts: tạo mảng gồm 0 vị trí: []
    timer:null,lastTickAt:null,timerRepairs:0,casts:[],proofs:new Map(),evidence:new Map(),stats:new Map(),seen:new Set(),blocked:0,skillWaits:0,
// [VI dòng gốc 29] Thuộc tính moves: 0 | Thuộc tính castAttempts: 0 | Thuộc tính confirmedPairs: 0 | Thuộc tính basicImpactSerial: null
    moves:0,castAttempts:0,confirmedPairs:0,basicImpactSerial:null,basicTailReleases:0,lastDistance:null,lastHitDistance:null,
// [VI dòng gốc 30] Thuộc tính arrivalSample: null | Thuộc tính arrivalSnap: false | Thuộc tính positionSample: null | Thuộc tính positionRetries: 0
    arrivalSample:null,arrivalSnap:false,positionSample:null,positionRetries:0,positionOffset:0,positionCommands:0,positionPause:null,positionRecovery:0,movement:[],positioning:true,ownMove:false,moveGoal:null,lastInvocation:-Infinity,lastTHAt:-Infinity,fastCasts:0,blockedSteering:0,
// [VI dòng gốc 31] Thuộc tính finishTarget: null | Thuộc tính lastBackgroundTick: áp dụng toán tử - lên Infinity | Thuộc tính skillCursor: 0 | Thuộc tính lastOwnerPhase: null
    finishTarget:null,lastBackgroundTick:-Infinity,skillCursor:0,lastOwnerPhase:null,resumes:0,lastReason:'off',lastError:'',history:[]};
// [VI dòng gốc 32] Khai báo biến không gán lại bằng const: mixed = tạo đối tượng gồm enabled, primary, primaryStreak, hitQuota, confirmedSinceTH, thCycles, rotation, rotationCursor, wantBasic, suspended, unconfirmed, basicPaceMs, ready, attempts, hits, damage, examples
  const mixed={enabled:false,primary:false,primaryStreak:0,hitQuota:null,confirmedSinceTH:0,thCycles:0,rotation:[],rotationCursor:0,wantBasic:false,suspended:false,unconfirmed:0,basicPaceMs:null,ready:new Map(),attempts:0,hits:0,damage:0,examples:[]};
  let skillPriority='interleaved';
  // Cosmic learning uses only confirmed direct hits against the current Boss.
  const cosmic={enabled:false,thCasts:0,basicCasts:0,lastNativeAt:null,lastNativeSkill:null,
    thMeasured:new Map(),thRanked:0,basicRanked:0,exploration:0};
  // Luo Feng Apex: bounded recent-hit memory; never modifies native skill state.
  const luoFeng={enabled:false,sampleWindow:12,idleThresholdMs:650,
    robustMinHits:5,trimPerTail:1,lastExploreTH:-1,lastExploreBasic:-1};
  const luoFengActive=()=>luoFeng.enabled&&cosmicActive();
  function keepRecentHit(row,damage){
    if(!Array.isArray(row.recent))row.recent=[];
    const v=Number(damage);if(!Number.isFinite(v)||v<=0)return;
    row.recent.push(v);
    if(row.recent.length>luoFeng.sampleWindow)row.recent.splice(0,row.recent.length-luoFeng.sampleWindow);
  }
  const apexDamage=(sample)=>luoFengActive()&&Array.isArray(sample?.recent)&&sample.recent.length>=2
    ?sample.recent.reduce((n,v)=>n+v,0)/sample.recent.length
    :sample?.hits>=2&&sample.damage>0?sample.damage/sample.hits:null;
  // Apex V2: a single extreme critical hit must not dominate skill choice.
  // The displayed rolling mean remains untrimmed for transparent diagnostics.
  function apexRobustDamage(sample){
    const recent=sample?.recent;
    if(!luoFengActive()||!Array.isArray(recent)||recent.length<luoFeng.robustMinHits)
      return apexDamage(sample);
    const valid=recent.filter(v=>Number.isFinite(v)&&v>0).sort((a,b)=>a-b);
    const trim=luoFeng.trimPerTail;
    if(valid.length<luoFeng.robustMinHits||valid.length<=trim*2)return apexDamage(sample);
    const kept=valid.slice(trim,valid.length-trim);
    return kept.reduce((sum,v)=>sum+v,0)/kept.length;
  }
  // Apex V3 observer, read only. HP loss may be from a non-Boss source.
  const apexRhythm={key:null,hp:null,lossAt:null,sampleAt:-Infinity,losses:0,
    intervals:[],minMs:1200,maxMs:12000,debounceMs:700};
  function resetApexRhythm(){apexRhythm.key=null;apexRhythm.hp=null;
    apexRhythm.lossAt=null;apexRhythm.sampleAt=-Infinity;
    apexRhythm.losses=0;apexRhythm.intervals=[];}
  function observeApexRhythm(key,hp,now=Date.now()){
    if(!luoFengActive()||!key){resetApexRhythm();return;}
    if(apexRhythm.key!==key){resetApexRhythm();apexRhythm.key=key;}
    const v=Number(hp);
    if(!Number.isFinite(v)||v<0||!Number.isFinite(now)||now-apexRhythm.sampleAt<80)return;
    apexRhythm.sampleAt=now;
    if(apexRhythm.hp!==null&&v<apexRhythm.hp){
      const last=apexRhythm.lossAt,dt=last===null?null:now-last;
      if(dt===null||dt>=apexRhythm.debounceMs){
        apexRhythm.losses++;
        if(dt!==null){
          if(dt>=apexRhythm.minMs&&dt<=apexRhythm.maxMs){
            apexRhythm.intervals.push(dt);
            if(apexRhythm.intervals.length>8)apexRhythm.intervals.shift();
          }else apexRhythm.intervals=[];
        }
        apexRhythm.lossAt=now;
      }
    }
    apexRhythm.hp=v;
  }
  function apexRhythmReport(now=Date.now()){
    const a=apexRhythm.intervals.slice().sort((x,y)=>x-y);
    const median=arr=>arr.length?arr.length%2?arr[arr.length>>1]:
      (arr[arr.length/2-1]+arr[arr.length/2])/2:null;
    const cycle=median(a),jitter=cycle===null?null:Math.max(...a.map(x=>Math.abs(x-cycle)));
    const regular=luoFengActive()&&a.length>=3&&jitter<=Math.max(250,cycle*.15);
    const age=apexRhythm.lossAt===null?null:now-apexRhythm.lossAt;
    const predicted=regular&&age>=0&&age<=cycle?apexRhythm.lossAt+cycle:null;
    return {active:luoFengActive(),observedHpLosses:apexRhythm.losses,
      intervalSamples:a.length,estimatedCycleMs:cycle,jitterMs:jitter,
      confidence:regular?'tentative-rhythmic':'insufficient',
      predictedNextHpLossAt:predicted,msUntilPrediction:predicted===null?null:predicted-now,
      source:'player_hp_loss_unattributed',advisoryOnly:true};
  }
  // Apex V4: opt-in Boss-HP DPS A/B at stage 4100; does not modify native cooldown.
  const pilot4100={enabled:false,key:null,phase:'off',phaseMs:18000,
    elapsed:0,drop:0,lastHP:null,lastAt:null,combo:null,thOnly:null,
    choice:'combo',skipped:0,missing:0};
  const pilot4100Active=()=>pilot4100.enabled&&luoFengActive()&&
    Number(W._Ba?._Co?._Mo?.ins?.curLv)===4100&&
    W.KVPV_FAR_SCOPE?.status?.()?.kind==='THIEN_QUAN';
  function resetPilot4100(){
    pilot4100.key=null;pilot4100.phase=pilot4100.enabled?'waiting':'off';
    pilot4100.elapsed=0;pilot4100.drop=0;pilot4100.lastHP=null;pilot4100.lastAt=null;
    pilot4100.combo=null;pilot4100.thOnly=null;pilot4100.choice='combo';
    pilot4100.skipped=0;pilot4100.missing=0;
  }
  const pilot4100THOnly=()=>pilot4100Active()&&
    (pilot4100.phase==='thOnly'||pilot4100.phase==='chosen'&&pilot4100.choice==='thOnly');
  function observePilot4100(){
    if(!pilot4100Active()||!ST.targetKey){if(pilot4100.key!==null)resetPilot4100();return;}
    if(pilot4100.key!==ST.targetKey){resetPilot4100();pilot4100.key=ST.targetKey;pilot4100.phase='combo';}
    const hp=prop(ST.target,'hp'),now=Date.now(),
      cur=Array.isArray(hp)?Number(hp[0]):NaN,max=Array.isArray(hp)?Number(hp[1]):NaN;
    if(!Number.isFinite(cur)||!Number.isFinite(max)||max<=0||cur<0||cur>max){
      pilot4100.missing++;pilot4100.lastHP=null;pilot4100.lastAt=null;return;
    }
    const previous=pilot4100.lastHP,at=pilot4100.lastAt;
    pilot4100.lastHP=cur;pilot4100.lastAt=now;
    if(previous===null||at===null||pilot4100.phase==='chosen')return;
    const dt=now-at;
    if(dt<=0||dt>2500||!canFight()||!atPosition(role())){pilot4100.skipped++;return;}
    pilot4100.elapsed+=dt;pilot4100.drop+=Math.max(0,previous-cur);
    if(pilot4100.elapsed<pilot4100.phaseMs)return;
    const result={durationMs:pilot4100.elapsed,hpDrop:pilot4100.drop,
      observedHpDps:pilot4100.drop*1000/pilot4100.elapsed};
    if(pilot4100.phase==='combo'){
      pilot4100.combo=result;pilot4100.phase='thOnly';
      pilot4100.elapsed=0;pilot4100.drop=0;return;
    }
    if(pilot4100.phase==='thOnly'){
      pilot4100.thOnly=result;
      const a=pilot4100.combo?.observedHpDps??0,b=result.observedHpDps;
      pilot4100.choice=b>0&&b>a*1.12?'thOnly':'combo';
      pilot4100.phase='chosen';pilot4100.elapsed=0;pilot4100.drop=0;
    }
  }
  function pilot4100Status(){return {enabled:pilot4100.enabled,active:pilot4100Active(),
    phase:pilot4100.phase,bossKey:pilot4100.key,
    activeMode:pilot4100THOnly()?'thOnly':'combo',selectedMode:pilot4100.phase==='chosen'?pilot4100.choice:null,
    phaseElapsedMs:pilot4100.elapsed,phaseDurationMs:pilot4100.phaseMs,
    phaseHpDrop:pilot4100.drop,combo:pilot4100.combo,thOnly:pilot4100.thOnly,
    skippedSamples:pilot4100.skipped,missingHpSamples:pilot4100.missing,
    requirement:'TH-only must exceed combo observed HP DPS by 12% to be chosen',
    note:'Stage 4100 only; Boss HP can include other damage sources. No new casts, cooldown bypass, or range edits.'};}
  // Solo 4100: native basics first, without changing other Tian Quan stages.
  // No extra combat dispatch and no cooldown/skill timestamp mutation.
  const basicSolo4100={enabled:false,blockedTH:0};
  // Observed Boss 4100 single-target preference; real matched-hit ranking takes over.
  const basicSolo4100Prior=Object.freeze([8005,8004,8002,8003,8001]);
  const basicSolo4100Active=()=>basicSolo4100.enabled&&
    Number(W._Ba?._Co?._Mo?.ins?.curLv)===4100&&tqDistanceOnly()&&
    tqFive?.active()&&luoFengActive()&&!transforming();
  function setTianQuan4100BasicSolo(enabled=true){
    if(enabled!==true)cooldown4100Release('basic_solo_disabled');
    basicSolo4100.enabled=enabled===true;
    if(basicSolo4100.enabled){pilot4100.enabled=false;resetPilot4100();}
    return basicSolo4100Status();
  }
  function basicSolo4100Status(){
    return {enabled:basicSolo4100.enabled,active:basicSolo4100Active(),
      stage:Number(W._Ba?._Co?._Mo?.ins?.curLv)||null,
      skillIds:[8001,8002,8003,8004,8005],startupPreference:basicSolo4100Prior.slice(),blockedTH:basicSolo4100.blockedTH,
      configuredDistance:CFG.goal,nativeCooldownPreserved:true,
      note:'Basic attacks only while stage 4100 Tian Quan is active. Client pace 1ms is not server attack rate; confirmed range/hits still required.'};
  }
  // Reversible, short client-side trial; never enabled automatically at startup.
  const cooldown4100={enabled:false,hook:null,falseReturns:0,
    trials:0,restores:0,lastReason:'off',error:''};
  function cooldown4100Release(reason='manual'){
    const h=cooldown4100.hook;cooldown4100.hook=null;
    cooldown4100.enabled=false;
    if(h){restore(h);cooldown4100.restores++;}
    cooldown4100.lastReason=reason;
  }
  function cooldown4100Status(){return {
    enabled:cooldown4100.enabled,active:!!cooldown4100.hook&&cooldown4100.enabled&&basicSolo4100Active(),
    expiresInMs:null,automaticExpiry:false,minCastGapMs:80,
    falseReturns:cooldown4100.falseReturns,trials:cooldown4100.trials,
    restores:cooldown4100.restores,reason:cooldown4100.lastReason,error:cooldown4100.error,
    scope:'Tian Quan 4100 native basics',nativeAnimationGatePreserved:true,
    serverCooldownModified:false,webSocketUnaffected:true,
    warning:'Continuous opt-in client-only isCooldown=false at TQ 4100 with >=80ms cast pacing. Server may reject casts. Restore on stop, map exit, or manual disable.'};}
  function cooldown4100Sync(c){
    if(!cooldown4100.enabled)return;
    if(!basicSolo4100Active()||!ST.running||!c||c!==role().c||!eligible(c.target)){
      cooldown4100Release('left_4100_or_combat');return;
    }
    if(cooldown4100.hook){
      if(cooldown4100.hook.obj!==c||c.isCooldown!==cooldown4100.hook.fn)
        cooldown4100Release('component_or_external_hook_changed');
      return;
    }
    try{
      cooldown4100.hook=hook(c,'isCooldown',native=>function(...args){
        if(this===c&&cooldown4100.enabled&&basicSolo4100Active()&&ST.running&&ST.target===c.target){
          cooldown4100.falseReturns++;return false;
        }
        return native.apply(this,args);
      });
      if(!cooldown4100.hook)cooldown4100Release('hook_unavailable');
      else cooldown4100.lastReason='active';
    }catch(e){cooldown4100.error=String(e?.message||e);cooldown4100Release('hook_error');}
  }
  function setTianQuan4100CooldownOverride(enabled=true){
    if(enabled!==true){cooldown4100Release('manual');return cooldown4100Status();}
    if(!basicSolo4100Active()||!ST.running||!eligible(role().c?.target))
      throw Error('Start native basic solo on Tian Quan 4100 before enabling trial');
    cooldown4100Release('restart');
    cooldown4100.enabled=true;
    cooldown4100.trials++;cooldown4100.error='';
    cooldown4100Sync(role().c);
    return cooldown4100Status();
  }
  // Script-owned diagnostic buffers only. This cannot clear DevTools WS frames.
  const localLogCleanup={enabled:false,intervalMs:10000,nextAt:Infinity,clears:0};
  function localLogCleanupStatus(){return {enabled:localLogCleanup.enabled,
    intervalMs:localLogCleanup.intervalMs,clears:localLogCleanup.clears,
    nextInMs:localLogCleanup.enabled?Math.max(0,localLogCleanup.nextAt-Date.now()):null,
    onlyLocalDiagnostics:true,chromeDevToolsWebSocketFramesCleared:false,
    countersAndMatchedDpsPreserved:true};}
  function setLocalLogAutoClear(enabled=true,intervalMs=10000){
    if(!Number.isInteger(intervalMs)||intervalMs<1000||intervalMs>120000)
      throw Error('Local-log interval must be 1000..120000ms');
    localLogCleanup.enabled=enabled===true;localLogCleanup.intervalMs=intervalMs;
    localLogCleanup.nextAt=localLogCleanup.enabled?Date.now()+intervalMs:Infinity;
    return localLogCleanupStatus();
  }
  // One command enables both the short cooldown experiment and local debug pruning.
  function startTianQuan4100CooldownExperiment(logIntervalMs=2000){
    if(!Number.isInteger(logIntervalMs)||logIntervalMs<1000||logIntervalMs>120000)
      throw Error('Local-log interval must be 1000..120000ms');
    const trial=setTianQuan4100CooldownOverride(true);
    const cleanup=setLocalLogAutoClear(true,logIntervalMs);
    return {trial,cleanup,devToolsWsFramesCleared:false};
  }
  function localLogCleanupSync(){
    if(!localLogCleanup.enabled||Date.now()<localLogCleanup.nextAt)return;
    localLogCleanup.nextAt=Date.now()+localLogCleanup.intervalMs;
    ST.history.length=0;dispatch.recent.length=0;hitDiagnostics.recent.length=0;
    localLogCleanup.clears++;
  }
  const cosmicActive=()=>cosmic.enabled&&tqDistanceOnly()&&tqFive?.active()&&!transforming()&&ST.running;
  function cosmicReset(){cosmic.thCasts=0;cosmic.basicCasts=0;cosmic.lastNativeAt=null;cosmic.lastNativeSkill=null;
    cosmic.thMeasured.clear();cosmic.thRanked=0;cosmic.basicRanked=0;cosmic.exploration=0;
    luoFeng.lastExploreTH=-1;luoFeng.lastExploreBasic=-1;resetApexRhythm();resetPilot4100();}
  const cosmicScore=(map,id)=>apexRobustDamage(map.get(Number(id)));
  function cosmicRank(rows,kind,fallback){
    if(!cosmicActive()||rangeTest?.status==='running'||thGap.picking)return rows.sort(fallback);
    const samples=kind==='th'?cosmic.thMeasured:thGap.measured,
      casts=kind==='th'?cosmic.thCasts:cosmic.basicCasts,explore=casts>0&&casts%7===6;
    if(explore){
      const key=kind==='th'?'lastExploreTH':'lastExploreBasic';
      if(!luoFengActive()||luoFeng[key]!==casts){
        cosmic.exploration++;if(luoFengActive())luoFeng[key]=casts;
      }
    }else if(kind==='th')cosmic.thRanked++;else cosmic.basicRanked++;
    return rows.sort((a,b)=>{
      const aid=Number(a[0]),bid=Number(b[0]),ah=samples.get(aid)?.hits||0,bh=samples.get(bid)?.hits||0;
      if(explore&&ah!==bh)return ah-bh;
      if(!explore){const as=cosmicScore(samples,aid),bs=cosmicScore(samples,bid);
        if(as!==null||bs!==null){if(as===null)return 1;if(bs===null)return -1;if(as!==bs)return bs-as;}}
      return fallback(a,b);
    });
  }
  // One native-ready basic may fill the TH visual tail without touching server cooldown.
  const thGap={enabled:false,windowMs:1200,lastAt:-Infinity,lastTarget:'',lastSerial:0,picking:false,attempts:0,accepted:0,blockedCooldown:0,lastBasic:null,measured:new Map()};
  function resetThGap(){thGap.lastAt=-Infinity;thGap.lastTarget='';thGap.lastSerial=0;thGap.picking=false;thGap.lastBasic=null;thGap.measured.clear();}
  function thGapActive(c=role().c){return thGap.enabled&&tqDistanceOnly()&&ST.running&&tqFive?.active()&&tqFive.allowsTuyetHoc()&&!transforming()&&
    ST.targetKey===thGap.lastTarget&&thGap.lastSerial===ST.castAttempts&&Date.now()-thGap.lastAt>=0&&Date.now()-thGap.lastAt<=thGap.windowMs&&
    animationPlaying(c)&&canFight()&&castReady();}
  const thGapNativeReady=c=>typeof c?.isCooldown==='function'&&c.isCooldown()===false;
  function strongestThGapBasic(){const rows=basicRotation().map(id=>({id,...(thGap.measured.get(id)||{hits:0,damage:0})})).filter(r=>r.hits>=2);
    rows.sort((a,b)=>(apexRobustDamage(b)??0)-(apexRobustDamage(a)??0)||a.id-b.id);return rows[0]?.id??null;}

  const tqFive=W.KVPV_TQ_BASIC_PROFILE?.create?.({scope:()=>W.KVPV_FAR_SCOPE?.status?.()?.kind??(W.KVPV_TQ_SCOPE?.inside?.()===true?'THIEN_QUAN':'OUTSIDE'),context:()=>scene()+'/'+identity(role().c?.target),phase:()=>combatOwner()?.phase,hp:()=>{const h=prop(role().a,'hp');return Array.isArray(h)&&Number(h[1])>0?Number(h[0])/Number(h[1])*100:null;},learned:()=>[...(role().s?._rtt??[]),...(role().s?._wet??[])].map(r=>Number(r?.[0]))})??null;
  for(const key of ['goal','min','max','scanMs']){const descriptor=Object.getOwnPropertyDescriptor(CFG,key);let base=CFG[key];Object.defineProperty(CFG,key,{enumerable:true,configurable:true,get(){const d=tqFive?.goal();if(key==='scanMs'&&tqFive?.active())return tqFive.wait();if(d!==null&&d!==undefined)return key==='goal'?d:key==='min'?Math.max(0,d-15):key==='max'?d+10:base;return descriptor.get?descriptor.get():base;},set(value){if(descriptor.set)descriptor.set(value);else base=value;}});}
// [VI dòng gốc 33] Khai báo biến không gán lại bằng const: basicProbe = tạo đối tượng gồm enabled, dispatch, context, attempts, hits, damage, startedAt, nextAt, examples
  const basicProbe={enabled:false,dispatch:false,context:null,attempts:0,hits:0,damage:0,startedAt:null,nextAt:0,examples:[]};
// [VI dòng gốc 34] Khai báo biến không gán lại bằng const: isBasic = tạo hàm với tham số id; mỗi lần gọi trả về Number.isSafeInteger(Number(id))&&Number(id)>=8001 và chỉ đánh giá vế phải khi vế trái truthy: Number(id)<=8009
  const isBasic=id=>Number.isSafeInteger(Number(id))&&Number(id)>=8001&&Number(id)<=8009;
// [VI dòng gốc 35] Khai báo biến không gán lại bằng const: excludedBasics = tạo đối tượng bằng Set([8002])
  const excludedBasics=new Set([8002]);
// [VI dòng gốc 36] Khai báo biến không gán lại bằng const: selectedBasic = tạo hàm với tham số id; mỗi lần gọi trả về !excludedBasics.has(Number(id)) và chỉ đánh giá vế phải khi vế trái truthy: !mixed.primary||!mixed.rotation.length||mixed.rotation.includes(Number(id))
  const selectedBasic=id=>tqFive?.active()?tqFive.ids().includes(Number(id)):!excludedBasics.has(Number(id))&&(!mixed.primary||!mixed.rotation.length||mixed.rotation.includes(Number(id)));
// [VI dòng gốc 37] Khai báo biến không gán lại bằng const: rangeTestKey = "__KVPV_BASIC_RANGE_TEST_20261023" | Khai báo biến có thể gán lại bằng let: rangeTest = null; rangeTestTimer = null
  const rangeTestKey='__KVPV_BASIC_RANGE_TEST_20261023';let rangeTest=null,rangeTestTimer=null;
// [VI dòng gốc 38] Định nghĩa hàm learnedBasics; tham số: không có | Khai báo biến không gán lại bằng const: s = đọc role().s | Kết thúc hàm hiện tại và trả về: gọi [...new Set([...(s?._rtt??[]),...(s?._wet??[])].map(r=>Number(r?.[0])).filter(id=>isBasic(id)&&!excludedBasics.has(id)))].sort((a,b)=>a-b) để sắp xếp mảng tại chỗ.
  function learnedBasics(){const s=role().s;return [...new Set([...(s?._rtt??[]),...(s?._wet??[])].map(r=>Number(r?.[0])).filter(id=>isBasic(id)&&(tqFive?.active()||!excludedBasics.has(id))))].sort((a,b)=>a-b);}
// [VI dòng gốc 39] Định nghĩa hàm basicRotation; tham số: không có | Khai báo biến không gán lại bằng const: learned = gọi learnedBasics() | Kết thúc hàm hiện tại và trả về: gọi mixed.rotation.filter(id=>learned.includes(id)) để giữ phần tử thỏa điều kiện.
  function basicRotation(){const learned=learnedBasics();return (tqFive?.active()?tqFive.ids():mixed.rotation).filter(id=>learned.includes(id));}
// [VI dòng gốc 40] Định nghĩa hàm basicQuota; tham số: không có | Kết thúc hàm hiện tại và trả về: basicRotation().length hoặc dùng vế phải khi vế trái falsy: 3.
  function basicQuota(){return basicRotation().length||3;}
// [VI dòng gốc 41] Định nghĩa hàm primaryBasicId; tham số: không có | Khai báo biến không gán lại bằng const: order = gọi basicRotation() | Kết thúc hàm hiện tại và trả về: nếu rangeTest?.status==='running' thì lấy rangeTest.rows[rangeTest.index]?.id, ngược lại lấy order.length?order[mixed.rotationCursor%order.length]:learnedBasics()[0]??null.
  function primaryBasicId(){const order=basicRotation();return rangeTest?.status==='running'?rangeTest.rows[rangeTest.index]?.id:order.length?order[mixed.rotationCursor%order.length]:learnedBasics()[0]??null;}
// [VI dòng gốc 42] Định nghĩa hàm finishRangeTest; tham số: reason | Kiểm tra rangeTest?.status!=='running': đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể. | gán rangeTest.status bằng reason
  function finishRangeTest(reason){if(rangeTest?.status!=='running')return;rangeTest.status=reason;rangeTest.endedAt=Date.now();mixed.wantBasic=mixed.primary&&!mixed.suspended;
// [VI dòng gốc 43] Kiểm tra rangeTestTimer!=null: đúng thì chạy nhánh sau if. | gọi W.KVPV_V1?.timers?.clearTimeout??W.clearTimeout(rangeTestTimer) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gán rangeTestTimer bằng null
    if(rangeTestTimer!=null)(W.KVPV_V1?.timers?.clearTimeout??W.clearTimeout)?.(rangeTestTimer);rangeTestTimer=null;}
// [VI dòng gốc 44] Định nghĩa hàm startBasicRangeTest; tham số: skillIds=null
  function startBasicRangeTest(skillIds=null){
// [VI dòng gốc 45] Kiểm tra W[rangeTestKey]: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: đọc W[rangeTestKey].
    if(W[rangeTestKey])return W[rangeTestKey];
// [VI dòng gốc 46] Khai báo biến không gán lại bằng const: ids = gọi learnedBasics().filter(id=>id!==8001&&(!Array.isArray(skillIds)||skillIds.includes(id))).slice(0, 4) để lấy một đoạn dữ liệu
    const ids=learnedBasics().filter(id=>id!==8001&&(!Array.isArray(skillIds)||skillIds.includes(id))).slice(0,4);
// [VI dòng gốc 47] Kiểm tra !ids.length: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: null.
    if(!ids.length)return null;
// [VI dòng gốc 48] gán rangeTest bằng W[rangeTestKey]={status:'running',actor:actorId,startedAt:Date.now(),index:0,stepAt:Date.now(),maxDurationMs:60000,maxAttemptsPerSkill:2, rows:ids.map(id=>({id,attempts:[],hits:[]}…
    rangeTest=W[rangeTestKey]={status:'running',actor:actorId,startedAt:Date.now(),index:0,stepAt:Date.now(),maxDurationMs:60000,maxAttemptsPerSkill:2,
// [VI dòng gốc 49] gán mixed.wantBasic bằng true
      rows:ids.map(id=>({id,attempts:[],hits:[]}))};mixed.wantBasic=true;
// [VI dòng gốc 50] gán rangeTestTimer bằng (W.KVPV_V1?.timers?.setTimeout??W.setTimeout)?.(()=>finishRangeTest('timeout'),60000) | Kết thúc hàm hiện tại và trả về: rangeTest.
    rangeTestTimer=(W.KVPV_V1?.timers?.setTimeout??W.setTimeout)?.(()=>finishRangeTest('timeout'),60000);return rangeTest;
// [VI dòng gốc 51] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 52] Định nghĩa hàm advanceRangeTest; tham số: không có | Kiểm tra rangeTest?.status!=='running': đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  function advanceRangeTest(){if(rangeTest?.status!=='running')return;
// [VI dòng gốc 53] Khai báo biến không gán lại bằng const: now = gọi Date.now(); row = đọc rangeTest.rows[rangeTest.index]
    const now=Date.now(),row=rangeTest.rows[rangeTest.index];
// [VI dòng gốc 54] Kiểm tra now-rangeTest.startedAt>=rangeTest.maxDurationMs: đúng thì chạy nhánh sau if. | gọi finishRangeTest('timeout') | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(now-rangeTest.startedAt>=rangeTest.maxDurationMs){finishRangeTest('timeout');return;}
// [VI dòng gốc 55] Kiểm tra now-rangeTest.stepAt>=12000||(row.attempts.length>=2&&!ST.casts.some(c=>!c.used&&c.id===row.id&&now-c.time<=CFG.castTtlMs)): đúng thì chạy nhánh sau if.
    if(now-rangeTest.stepAt>=12000||(row.attempts.length>=2&&!ST.casts.some(c=>!c.used&&c.id===row.id&&now-c.time<=CFG.castTtlMs))){
// [VI dòng gốc 56] tăng rangeTest.index một đơn vị sau khi lấy giá trị | gán rangeTest.stepAt bằng now | gán mixed.suspended bằng false | gán mixed.unconfirmed bằng 0
      rangeTest.index++;rangeTest.stepAt=now;mixed.suspended=false;mixed.unconfirmed=0;mixed.wantBasic=true;
// [VI dòng gốc 57] Kiểm tra rangeTest.index>=rangeTest.rows.length: đúng thì chạy nhánh sau if. | gọi finishRangeTest('complete')
      if(rangeTest.index>=rangeTest.rows.length)finishRangeTest('complete');
// [VI dòng gốc 58] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 59] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 60] Khai báo biến không gán lại bằng const: burst = tạo đối tượng gồm enabled, dispatch, desired, nextAt, serial, active, history
  const burst={enabled:false,dispatch:false,desired:null,nextAt:0,serial:0,active:null,history:[]};
// [VI dòng gốc 61] Khai báo biến không gán lại bằng const: hitDiagnostics = tạo đối tượng gồm received, accepted, rejected, recent
  const hitDiagnostics={received:0,accepted:0,rejected:{},recent:[]};
// [VI dòng gốc 62] Khai báo biến không gán lại bằng const: tailStudyKey = "__KVPV_CONFIRMED_TAIL_STUDY_20261024" | Khai báo biến có thể gán lại bằng let: tailStudy = null; tailStudyTimer = null; confirmedTailCut = false; confirmedTailCuts = 0
  const tailStudyKey='__KVPV_CONFIRMED_TAIL_STUDY_20261024';let tailStudy=null,tailStudyTimer=null,confirmedTailCut=false,confirmedTailCuts=0;
// [VI dòng gốc 63] Định nghĩa hàm setConfirmedTailCut; tham số: enabled=true. Mục đích: bật/tắt cắt phần đuôi hoạt ảnh chỉ sau khi đã ghép được đòn trúng | gán confirmedTailCut bằng !!enabled | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm enabled, onlyAfterMatchedHit.
  function setConfirmedTailCut(enabled=true){confirmedTailCut=!!enabled;return {enabled:confirmedTailCut,onlyAfterMatchedHit:true};}
// [VI dòng gốc 64] Định nghĩa hàm finishTailStudy; tham số: status='complete' | Kiểm tra tailStudy?.status!=='running': đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể. | gán tailStudy.status bằng status
  function finishTailStudy(status='complete'){if(tailStudy?.status!=='running')return;tailStudy.status=status;tailStudy.endedAt=Date.now();
// [VI dòng gốc 65] Kiểm tra tailStudyTimer!=null: đúng thì chạy nhánh sau if. | gọi W.KVPV_V1?.timers?.clearTimeout??W.clearTimeout(tailStudyTimer) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gán tailStudyTimer bằng null
    if(tailStudyTimer!=null)(W.KVPV_V1?.timers?.clearTimeout??W.clearTimeout)?.(tailStudyTimer);tailStudyTimer=null;}
// [VI dòng gốc 66] Định nghĩa hàm startConfirmedTailStudy; tham số: không có | Kiểm tra W[tailStudyKey]: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: đọc W[tailStudyKey].
  function startConfirmedTailStudy(){if(W[tailStudyKey])return W[tailStudyKey];
// [VI dòng gốc 67] Khai báo biến không gán lại bằng const: row = tạo hàm với tham số (không có); mỗi lần gọi trả về tạo đối tượng gồm activeMs, casts, hits, damage, cuts
    const row=()=>({activeMs:0,casts:0,hits:0,damage:0,cuts:0});
// [VI dòng gốc 68] gán tailStudy bằng W[tailStudyKey]={actor:actorId,status:'running',phase:'baseline',startedAt:Date.now(),lastAt:Date.now(),wasActive:false,baseline:row(),trim:row(),error:''}
    tailStudy=W[tailStudyKey]={actor:actorId,status:'running',phase:'baseline',startedAt:Date.now(),lastAt:Date.now(),wasActive:false,baseline:row(),trim:row(),error:''};
// [VI dòng gốc 69] gán tailStudyTimer bằng (W.KVPV_V1?.timers?.setTimeout??W.setTimeout)?.(()=>finishTailStudy('timeout'),60000) | Kết thúc hàm hiện tại và trả về: tailStudy.
    tailStudyTimer=(W.KVPV_V1?.timers?.setTimeout??W.setTimeout)?.(()=>finishTailStudy('timeout'),60000);return tailStudy;
// [VI dòng gốc 70] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 71] Định nghĩa hàm advanceTailStudy; tham số: không có | Kiểm tra tailStudy?.status!=='running': đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể. | Khai báo biến không gán lại bằng const: now = gọi Date.now(); active = canFight() và chỉ đánh giá vế phải khi vế trái truthy: atPosition(role())
  function advanceTailStudy(){if(tailStudy?.status!=='running')return;const now=Date.now(),active=canFight()&&atPosition(role());
// [VI dòng gốc 72] Kiểm tra now-tailStudy.startedAt>=60000: đúng thì chạy nhánh sau if. | gọi finishTailStudy('timeout') | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(now-tailStudy.startedAt>=60000){finishTailStudy('timeout');return;}
// [VI dòng gốc 73] Kiểm tra active&&tailStudy.wasActive: đúng thì chạy nhánh sau if. | cập nhật bằng toán tử += tailStudy[tailStudy.phase].activeMs bằng Math.min(1000,Math.max(0,now-tailStudy.lastAt))
    if(active&&tailStudy.wasActive)tailStudy[tailStudy.phase].activeMs+=Math.min(1000,Math.max(0,now-tailStudy.lastAt));
// [VI dòng gốc 74] gán tailStudy.lastAt bằng now | gán tailStudy.wasActive bằng active
    tailStudy.lastAt=now;tailStudy.wasActive=active;
// [VI dòng gốc 75] Kiểm tra tailStudy[tailStudy.phase].activeMs>=8000: đúng thì chạy nhánh sau if. | Kiểm tra tailStudy.phase==='baseline': đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gán tailStudy.phase bằng 'trim' | gọi finishTailStudy()
    if(tailStudy[tailStudy.phase].activeMs>=8000){if(tailStudy.phase==='baseline')tailStudy.phase='trim';else finishTailStudy();}
// [VI dòng gốc 76] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 77] Chú thích gốc của tác giả; không được thực thi. Nội dung: 1039 chỉ xác nhận client thực sự phát động tác; vẫn phải có 1012 để xác nhận trúng.
  // 1039 chỉ xác nhận client thực sự phát động tác; vẫn phải có 1012 để xác nhận trúng.
// [VI dòng gốc 78] Khai báo biến không gán lại bằng const: dispatch = tạo đối tượng gồm actor, pending, calls, signals, silent, recent
  const dispatch={actor:null,pending:null,calls:0,signals:0,silent:0,recent:[]};
// [VI dòng gốc 79] Khai báo biến không gán lại bằng const: speedKey = "__KVPV_BASIC_SPEED_TRIAL_99_REPEAT1_20261025" | Khai báo biến có thể gán lại bằng let: speedTrial = null
  const speedKey='__KVPV_BASIC_SPEED_TRIAL_99_REPEAT1_20261025';let speedTrial=null;
// [VI dòng gốc 80] Khai báo biến không gán lại bằng const: speedClips = tạo đối tượng bằng Map()
  const speedClips=new Map();
  let thVisualCalls=0,thVisualScaled=0,thVisualUnavailable=0,thVisualLastSkill=null;
// [VI dòng gốc 81] Định nghĩa hàm restoreSpeedClips; tham số: không có | Duyệt từng giá trị trong speedClips bằng const [clip,s]. | Khai báo biến không gán lại bằng const: [clip,s] (chưa gán giá trị) | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài.
  function restoreSpeedClips(){for(const [clip,s]of speedClips)try{if(clip?._nt===s.applied||clip?.timeScale===s.applied)clip.timeScale=s.before;}catch(e){ST.lastError=String(e);}speedClips.clear();}
// [VI dòng gốc 82] Định nghĩa hàm finishSpeedTrial; tham số: reason='complete'
  function finishSpeedTrial(reason='complete'){
// [VI dòng gốc 83] Kiểm tra !speedTrial||['complete','interrupted','timeout','stopped'].includes(speedTrial.state): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(!speedTrial||['complete','interrupted','timeout','stopped'].includes(speedTrial.state))return;
// [VI dòng gốc 84] gọi restoreSpeedClips() | gán speedTrial.state bằng reason | gán speedTrial.endedAt bằng Date.now()
    restoreSpeedClips();speedTrial.state=reason;speedTrial.endedAt=Date.now();
// [VI dòng gốc 85] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 86] Định nghĩa hàm speedSample; tham số: không có | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm at, hits, signals, calls, damage.
  function speedSample(){return {at:Date.now(),hits:mixed.hits,signals:dispatch.signals,calls:dispatch.calls,damage:mixed.damage};}
// [VI dòng gốc 87] Định nghĩa hàm startBasicSpeedTrial; tham số: multiplier=99. Mục đích: bắt đầu phép so sánh hoạt ảnh có thời hạn và tự khôi phục
  function startBasicSpeedTrial(multiplier=99){
// [VI dòng gốc 88] Kiểm tra multiplier!==9&&multiplier!==99: đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('Bounded animation trial supports factor 9 or 99 only')
    if(multiplier!==9&&multiplier!==99)throw Error('Bounded animation trial supports factor 9 or 99 only');
// [VI dòng gốc 89] Kiểm tra CFG.basicAnimationSpeed!==1: đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('Disable persistent animation scaling before a comparison trial')
    if(CFG.basicAnimationSpeed!==1)throw Error('Disable persistent animation scaling before a comparison trial');
// [VI dòng gốc 90] Kiểm tra W[speedKey]: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: đọc W[speedKey].
    if(W[speedKey])return W[speedKey];
// [VI dòng gốc 91] gán speedTrial bằng W[speedKey]={actor:actorId,multiplier,state:'waiting',startedAt:Date.now(),deadline:Date.now()+60000,phaseMs:5000, baseline:null,accelerated:null,restored:false,note:'Client animat…
    speedTrial=W[speedKey]={actor:actorId,multiplier,state:'waiting',startedAt:Date.now(),deadline:Date.now()+60000,phaseMs:5000,
// [VI dòng gốc 92] Thuộc tính baseline: null | Thuộc tính accelerated: null | Thuộc tính restored: false | Thuộc tính note: "Client animation multiplier; not a server damage multiplier."
      baseline:null,accelerated:null,restored:false,note:'Client animation multiplier; not a server damage multiplier.'};
// [VI dòng gốc 93] Kết thúc hàm hiện tại và trả về: speedTrial.
    return speedTrial;
// [VI dòng gốc 94] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 95] Định nghĩa hàm advanceSpeedTrial; tham số: không có
  function advanceSpeedTrial(){
// [VI dòng gốc 96] Khai báo biến không gán lại bằng const: t = speedTrial | Kiểm tra !t||['complete','interrupted','timeout','stopped'].includes(t.state): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    const t=speedTrial;if(!t||['complete','interrupted','timeout','stopped'].includes(t.state))return;
// [VI dòng gốc 97] Kiểm tra Date.now()>=t.deadline: đúng thì chạy nhánh sau if. | gọi finishSpeedTrial('timeout') | gán t.restored bằng true | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(Date.now()>=t.deadline){finishSpeedTrial('timeout');t.restored=true;return;}
// [VI dòng gốc 98] Khai báo biến không gán lại bằng const: r = gọi role(); context = tính biểu thức identity(r.c?.target)+'/'+scene()
    const r=role(),context=identity(r.c?.target)+'/'+scene();
// [VI dòng gốc 99] Kiểm tra !CFG.basicOnly||!canFight()||!eligible(r.c?.target)||!atPosition(r): đúng thì chạy nhánh sau if.
    if(!CFG.basicOnly||!canFight()||!eligible(r.c?.target)||!atPosition(r)){
// [VI dòng gốc 100] Kiểm tra t.state!=='waiting': đúng thì chạy nhánh sau if. | gọi finishSpeedTrial('interrupted') | gán t.restored bằng true | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      if(t.state!=='waiting'){finishSpeedTrial('interrupted');t.restored=true;}return;
// [VI dòng gốc 101] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 102] Kiểm tra t.state==='waiting': đúng thì chạy nhánh sau if. | gán t.context bằng context | gán t.state bằng 'baseline' | gán t.sample bằng speedSample()
    if(t.state==='waiting'){t.context=context;t.state='baseline';t.sample=speedSample();t.deadline=Date.now()+15000;return;}
// [VI dòng gốc 103] Kiểm tra context!==t.context: đúng thì chạy nhánh sau if. | gọi finishSpeedTrial('interrupted') | gán t.restored bằng true | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(context!==t.context){finishSpeedTrial('interrupted');t.restored=true;return;}
// [VI dòng gốc 104] Khai báo biến không gán lại bằng const: elapsed = tính biểu thức Date.now()-t.sample.at | Kiểm tra elapsed<t.phaseMs: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    const elapsed=Date.now()-t.sample.at;if(elapsed<t.phaseMs)return;
// [VI dòng gốc 105] Khai báo biến không gán lại bằng const: end = gọi speedSample(); result = tạo đối tượng gồm seconds, hits, signals, calls, damage
    const end=speedSample(),result={seconds:elapsed/1000,hits:end.hits-t.sample.hits,signals:end.signals-t.sample.signals,calls:end.calls-t.sample.calls,damage:end.damage-t.sample.damage};
// [VI dòng gốc 106] gán result.hitsPerSecond bằng result.hits/result.seconds | gán result.castSignalsPerSecond bằng result.signals/result.seconds
    result.hitsPerSecond=result.hits/result.seconds;result.castSignalsPerSecond=result.signals/result.seconds;
// [VI dòng gốc 107] Kiểm tra t.state==='baseline': đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gán t.baseline bằng result | gán t.state bằng 'accelerated' | gán t.sample bằng end
    if(t.state==='baseline'){t.baseline=result;t.state='accelerated';t.sample=end;}
// [VI dòng gốc 108] gán t.accelerated bằng result | gán t.observedHitRatio bằng t.baseline.hitsPerSecond>0?result.hitsPerSecond/t.baseline.hitsPerSecond:null | gọi finishSpeedTrial('complete') | gán t.restored bằng true
    else {t.accelerated=result;t.observedHitRatio=t.baseline.hitsPerSecond>0?result.hitsPerSecond/t.baseline.hitsPerSecond:null;finishSpeedTrial('complete');t.restored=true;}
// [VI dòng gốc 109] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 110] Chú thích gốc của tác giả; không được thực thi. Nội dung: Native getActionTween(name, reset, timeScale) điều khiển tốc độ clip.
  // Native getActionTween(name, reset, timeScale) điều khiển tốc độ clip.
// [VI dòng gốc 111] Chú thích gốc của tác giả; không được thực thi. Nội dung: Chỉ thay tham số khi đang gọi đúng combat 8001 của chính nhân vật trong phép thử.
  // Chỉ thay tham số khi đang gọi đúng combat 8001 của chính nhân vật trong phép thử.
// [VI dòng gốc 112] Định nghĩa hàm animationTrialCall; tham số: native, self, args
  // Native getActionTween(action,reset,timeScale): shorten VISIBLE animation only.
  // No native cooldown, hit events or RPC behavior is rewritten.
  function animationTrialCall(native,self,args){
    const id=Number(args[0]),t=speedTrial,avatar=self?._Qrt,
      trialActive=t?.state==='accelerated'&&Date.now()<t.deadline,
      thVisual=id>=1001&&id<=1008&&CFG.tqTuyetHocVisualSpeed>1&&
        W.KVPV_FAR_SCOPE?.status?.()?.kind==='THIEN_QUAN'&&tqFive?.active()&&
        tqFive.allowsTuyetHoc()===true,
      basicVisual=id===8001&&CFG.basicOnly,
      factor=thVisual?CFG.tqTuyetHocVisualSpeed:trialActive?t.multiplier:CFG.basicAnimationSpeed;
    if(factor<=1||(!thVisual&&!basicVisual)||self.owner!==dispatch.actor||
       !canFight()||typeof avatar?.getActionTween!=='function')return native.apply(self,args);
    // TH requires its native skill action, not a guessed generic "attack" animation.
    let action;try{action=self._mvt?.(id)?.[5];}catch(_){action=null;}
    if(thVisual){thVisualCalls++;thVisualLastSkill=id;}
    if(thVisual&&(typeof action!=='string'||!action.trim())){
      thVisualUnavailable++;return native.apply(self,args);
    }
    const original=avatar.getActionTween,expectedAction=String(action||'attack');
    if(trialActive&&!thVisual)t.nativeAction=expectedAction;
    const wrapped=function(...a){
      if(a[0]!==expectedAction)return original.apply(this,a);
      const before=Number(a[2]??1);if(!Number.isFinite(before)||before<=0)return original.apply(this,a);
      a[2]=Math.min(factor,before*factor);
      const tween=original.apply(this,a),clip=this.getCurAction;
      if(clip&&typeof clip==='object'&&speedClips.size<32)speedClips.set(clip,{before,applied:a[2]});
      if(thVisual)thVisualScaled++;
      else{if(trialActive)t.scaledAnimations=(t.scaledAnimations??0)+1;ST.scaledBasicAnimations=(ST.scaledBasicAnimations??0)+1;}
      return tween;
    };
    avatar.getActionTween=wrapped;
    try{return native.apply(self,args);}finally{if(avatar.getActionTween===wrapped)avatar.getActionTween=original;}
  }
  function onNativeCast(targetId,skillId){const p=dispatch.pending;if(p){if(p.events.length<4)p.events.push({targetId:String(targetId),id:Number(skillId)});if(String(targetId)===p.targetId&&Number(skillId)===p.id)p.signaled=true;}}
// [VI dòng gốc 129] Định nghĩa hàm detachDispatch; tham số: không có | Kiểm tra dispatch.actor: đúng thì chạy nhánh sau if. | gọi dispatch.actor.off(1039, ST.owner, onNativeCast) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gán dispatch.actor bằng null
  function detachDispatch(){if(dispatch.actor){dispatch.actor.off?.(1039,ST.owner,onNativeCast);dispatch.actor=null;}}
// [VI dòng gốc 130] Định nghĩa hàm attachDispatch; tham số: a | Kiểm tra dispatch.actor===a: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể. | gọi detachDispatch()
  function attachDispatch(a){if(dispatch.actor===a)return;detachDispatch();if(typeof a?.on==='function'&&typeof a?.off==='function'){a.on(1039,ST.owner,onNativeCast);dispatch.actor=a;}}
// [VI dòng gốc 131] Định nghĩa hàm invokeNative; tham số: native, self, args
  function invokeNative(native,self,args){
// [VI dòng gốc 132] Kiểm tra !ST.running||!dispatch.actor: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: gọi native.apply(self, args).
    if(!ST.running||!dispatch.actor)return native.apply(self,args);
// [VI dòng gốc 133] Chú thích gốc của tác giả; không được thực thi. Nội dung: Scene transition có thể xóa listener trên actor còn được tái sử dụng.
    // Scene transition có thể xóa listener trên actor còn được tái sử dụng.
// [VI dòng gốc 134] Chú thích gốc của tác giả; không được thực thi. Nội dung: Đăng ký lại riêng listener của module; không đụng listener gửi lệnh của game.
    // Đăng ký lại riêng listener của module; không đụng listener gửi lệnh của game.
// [VI dòng gốc 135] gọi dispatch.actor.off(1039, ST.owner, onNativeCast) | gọi dispatch.actor.on(1039, ST.owner, onNativeCast)
    dispatch.actor.off(1039,ST.owner,onNativeCast);dispatch.actor.on(1039,ST.owner,onNativeCast);
// [VI dòng gốc 136] Khai báo biến không gán lại bằng const: pending = tạo đối tượng gồm id, targetId, signaled, events | gán dispatch.pending bằng pending | tăng dispatch.calls một đơn vị sau khi lấy giá trị
    const pending={id:Number(args[0]),targetId:identity(self.target),signaled:false,events:[]};dispatch.pending=pending;dispatch.calls++;
// [VI dòng gốc 137] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | Kết thúc hàm hiện tại và trả về: gọi animationTrialCall(native, self, args).
    try{return animationTrialCall(native,self,args);}finally{
// [VI dòng gốc 138] Kiểm tra pending.signaled: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | tăng dispatch.signals một đơn vị sau khi lấy giá trị | Kiểm tra pending.id>=1001&&pending.id<=1008: đúng thì chạy nhánh sau if. | gán ST.lastTHAt bằng Date.now()
      if(pending.signaled){dispatch.signals++;
        if(ST.targetKey===identity(self.target)+'/'+String(prop(self.target,'occ'))+'/'+scene()){
          cosmic.lastNativeAt=Date.now();cosmic.lastNativeSkill=pending.id;
          if(isBasic(pending.id))cosmic.basicCasts++;
          else if(pending.id>=1001&&pending.id<=1008)cosmic.thCasts++;
        }
        if(thGap.picking&&isBasic(pending.id)){thGap.accepted++;thGap.lastBasic=pending.id;}
        if(pending.id>=1001&&pending.id<=1008){ST.lastTHAt=Date.now();thGap.lastAt=ST.lastTHAt;
          thGap.lastTarget=ST.targetKey;thGap.lastSerial=ST.castAttempts;}if(mixed.hitQuota!==null&&pending.id>=1001&&pending.id<=1008){mixed.confirmedSinceTH=0;mixed.thCycles++;mixed.wantBasic=true;}}else dispatch.silent++;
// [VI dòng gốc 139] Khai báo biến có thể gán lại bằng let: silentDetail = null
      let silentDetail=null;
// [VI dòng gốc 140] Kiểm tra !pending.signaled: đúng thì chạy nhánh sau if.
      if(!pending.signaled){
// [VI dòng gốc 141] Khai báo biến có thể gán lại bằng let: effect = null; effectError = "" | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | Kiểm tra typeof self._mvt==='function': đúng thì chạy nhánh sau if. | gán effect bằng !!self._mvt(pending.id)
        let effect=null,effectError='';try{if(typeof self._mvt==='function')effect=!!self._mvt(pending.id);}catch(e){effectError=String(e?.message||e);}
// [VI dòng gốc 142] gán silentDetail bằng {ownerId:identity(self.owner),ownerType:prop(self.owner,'type'),ownerMatchesActor:self.owner===dispatch.actor, validTarget:self.isValidTarget?.()??null,effectAvailable:effect,effec…
        silentDetail={ownerId:identity(self.owner),ownerType:prop(self.owner,'type'),ownerMatchesActor:self.owner===dispatch.actor,
// [VI dòng gốc 143] Thuộc tính validTarget: self.isValidTarget?.() hoặc dùng vế phải khi vế trái là null/undefined: null | Thuộc tính effectAvailable: effect | Thuộc tính effectError: dùng biến cùng tên
          validTarget:self.isValidTarget?.()??null,effectAvailable:effect,effectError,
// [VI dòng gốc 144] Thuộc tính nativeFunction: gọi Function.prototype.toString.call(native).slice(0, 240) để lấy một đoạn dữ liệu
          nativeFunction:Function.prototype.toString.call(native).slice(0,240)};
// [VI dòng gốc 145] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
      }
// [VI dòng gốc 146] gọi dispatch.recent.push({at:Date.now(),id:pending.id,targetId:pending.targetId,signaled:pending.signaled,events:pending.events,silentDetail}) để thêm phần tử vào cuối mảng | Kiểm tra dispatch.recent.length>16: đúng thì chạy nhánh sau if. | gọi dispatch.recent.shift()
      dispatch.recent.push({at:Date.now(),id:pending.id,targetId:pending.targetId,signaled:pending.signaled,events:pending.events,silentDetail});if(dispatch.recent.length>16)dispatch.recent.shift();
// [VI dòng gốc 147] gán dispatch.pending bằng null
      dispatch.pending=null;
// [VI dòng gốc 148] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 149] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 150] Khai báo biến không gán lại bằng const: prop = tạo hàm với tham số o, k | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | Kết thúc hàm hiện tại và trả về: o?.property?.get?.(k) hoặc dùng vế phải khi vế trái là null/undefined: null. | Nhận lỗi bằng _ và chạy phần xử lý lỗi.
  const prop=(o,k)=>{try{return o?.property?.get?.(k)??null;}catch(_){return null;}};
// [VI dòng gốc 151] Khai báo biến không gán lại bằng const: identity = tạo hàm với tham số o; mỗi lần gọi trả về gọi String(prop(o,'id')??o?.id??'') để chuyển sang chuỗi
  const identity=o=>String(prop(o,'id')??o?.id??'');
// [VI dòng gốc 152] Khai báo biến không gán lại bằng const: loc = tạo hàm với tham số o | Khai báo biến không gán lại bằng const: p = gọi prop(o, 'position') | Khai báo biến không gán lại bằng const: x = gọi Number(p?.x) để chuyển sang số; y = gọi Number(p?.y) để chuyển sang số | Kết thúc hàm hiện tại và trả về: nếu Number.isFinite(x)&&Number.isFinite(y) thì lấy {x,y}, ngược lại lấy null.
  const loc=o=>{const p=prop(o,'position');const x=Number(p?.x),y=Number(p?.y);return Number.isFinite(x)&&Number.isFinite(y)?{x,y}:null;};
// [VI dòng gốc 153] Khai báo biến không gán lại bằng const: radius = tạo hàm với tham số a, b | Khai báo biến không gán lại bằng const: p = gọi loc(a); q = gọi loc(b) | Kết thúc hàm hiện tại và trả về: nếu p&&q thì lấy Math.hypot(p.x-q.x,p.y-q.y), ngược lại lấy null.
  const radius=(a,b)=>{const p=loc(a),q=loc(b);return p&&q?Math.hypot(p.x-q.x,p.y-q.y):null;};
// [VI dòng gốc 154] Chú thích gốc của tác giả; không được thực thi. Nội dung: Lấy nhân vật sở hữu cùng các thành phần chọn chiêu, combat và di chuyển hiện tại.
  // Lấy nhân vật sở hữu cùng các thành phần chọn chiêu, combat và di chuyển hiện tại.
// [VI dòng gốc 155] Định nghĩa hàm role; tham số: không có | Khai báo biến không gán lại bằng const: world = đọc W._C?._Ba?.instance nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Khai báo biến không gán lại bằng const: a = world?.getRole?.(Number(actorId)) hoặc dùng vế phải khi vế trái là null/undefined: world?.getRole?.(actorId) | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm a, s, c, m.
  function role(){const world=W._C?._Ba?.instance;const a=world?.getRole?.(Number(actorId))??world?.getRole?.(actorId);return {a,s:a?.getComponent?.(Skill),c:a?.getComponent?.(Combat),m:a?.getComponent?.(Move)};}
// [VI dòng gốc 156] Chú thích gốc của tác giả; không được thực thi. Nội dung: Đọc loại Boss mà cấu hình tầng Thiên Quan hiện tại yêu cầu.
  // Đọc loại Boss mà cấu hình tầng Thiên Quan hiện tại yêu cầu.
// [VI dòng gốc 157] Định nghĩa hàm stageOcc; tham số: không có | Kiểm tra ['LINH_LUNG','PHU_VAN','TRU_TIEN'].includes(W.KVPV_FAR_SCOPE?.status?.().kind): đúng thì chạy nhánh sau if. | Khai báo biến không gán lại bằng const: t = đọc role().c?.target nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Kết thúc hàm hiện tại và trả về: nếu W.KVPV_FAR_SCOPE.eligible(t) thì lấy Number(prop(t,'occ')), ngược lại lấy null.
  function stageOcc(){if(['LINH_LUNG','PHU_VAN','TRU_TIEN'].includes(W.KVPV_FAR_SCOPE?.status?.().kind)){const t=role().c?.target;return W.KVPV_FAR_SCOPE.eligible(t)?Number(prop(t,'occ')):null;}try{const lv=Number(W._Ba?._Co?._Mo?.ins?.curLv),c=W._ft?._h$?.ins?.getCfgByLv?.(lv);const n=c?Number(W._ft._h$.ins.occ(c,lv)):NaN;return Number.isSafeInteger(n)&&n>0?n:null;}catch(_){return null;}}
// [VI dòng gốc 158] Định nghĩa hàm eligible; tham số: t | Kết thúc hàm hiện tại và trả về: !!t&&t.isValid!==false&&Number(prop(t,'type'))===1&&stageOcc()!==null và chỉ đánh giá vế phải khi vế trái truthy: Number(prop(t,'occ'))===stageOcc().
  function eligible(t){return !!t&&t.isValid!==false&&Number(prop(t,'type'))===1&&stageOcc()!==null&&Number(prop(t,'occ'))===stageOcc();}
// [VI dòng gốc 159] Định nghĩa hàm key; tham số: occ, id | Kết thúc hàm hiện tại và trả về: tính biểu thức String(occ)+'/'+String(id).
  function key(occ,id){return String(occ)+'/'+String(id);}
// [VI dòng gốc 160] Khai báo biến không gán lại bằng const: scene = tạo hàm với tham số (không có); mỗi lần gọi trả về gọi String(W._Ba?._$a?._yo?.ins?.intoSce?.[0]??'') để chuyển sang chuỗi
  const scene=()=>String(W._Ba?._$a?._yo?.ins?.intoSce?.[0]??'');
// [VI dòng gốc 161] Chú thích gốc của tác giả; không được thực thi. Nội dung: Kiểm tra kỹ năng thuộc bộ native hiện có; loại đánh thường khỏi phép thử Tuyệt Học.
  // Kiểm tra kỹ năng thuộc bộ native hiện có; loại đánh thường khỏi phép thử Tuyệt Học.
// [VI dòng gốc 162] Định nghĩa hàm candidate; tham số: id
  function skill1008Info(show=true){
    const read=fn=>{try{return fn()??null;}catch{return null;}};
    const pack=(v,depth=0)=>{if(v===null||['number','string','boolean'].includes(typeof v))return v;if(depth>=3)return null;if(Array.isArray(v))return v.slice(0,96).map(x=>pack(x,depth+1));return null;};
    const r=read(()=>role()),learned=read(()=>W._Ba?._rJ?._O$?.ins?.skills),row=Array.isArray(learned)?learned.find(x=>Number(x?.[0])===1008):null,level=Number(row?.[1]);
    const native=read(()=>r?.c?._mvt?.(1008)),table=Number.isFinite(level)&&level>0?read(()=>W._ft?._nY?.ins?.getCfgBySkillIdAndLv?.(1008,level)):null;
    const result={skillId:1008,at:Date.now(),level:Number.isFinite(level)?level:null,name:typeof (native??table)?.[2]==='string'?(native??table)[2]:null,nativeConfigRaw:pack(native),learnedLevelConfigRaw:pack(table),selectorRows:[r?.s?._rtt,r?.s?._wet].flatMap(x=>Array.isArray(x)?x:[]).filter(x=>Number(x?.[0])===1008).map(x=>pack(x)),observed:metrics?.report()?.current?.skills?.find(x=>x.id===1008)??null,effectInterpretation:'Raw native/learned-level config only. Unmapped columns are not interpreted as buffs, duration, range or damage. No confirmed buff-effect mapping available.'};
    if(show)console.log('[Skill 1008]',result);return result;
  }
  const trial1008=W.KVPV_SKILL1008_TRIAL?.create({now:()=>Date.now(),metrics:()=>metrics?.report(),config:()=>skill1008Info(false),context:()=>{
    const t=role().c?.target,scope=W.KVPV_FAR_SCOPE?.status?.(),hp=prop(t,'hp');
    if(!ST.running||scope?.kind!=='THIEN_QUAN'||!eligible(t)||!tqFive?.active()||!tqFive.allowsTuyetHoc()||!Array.isArray(hp)||Number(hp[0])<=0)return null;
    return {key:identity(t)+'/'+String(prop(t,'occ'))+'/'+scene(),occ:Number(prop(t,'occ')),scene:scene(),settings:JSON.stringify({pace:currentPace(),distance:CFG.goal,min:CFG.min,max:CFG.max,animationSpeed:CFG.basicAnimationSpeed,transformed:!!transforming(),priority:skillPriority,basicOnly:CFG.basicOnly,ids:tqFive.ids()})};
  }});
  function start1008Trial(mode='on',seconds=60){if(!trial1008)throw Error('Nạp FULL mới trước.');return trial1008.start(mode,seconds);}
  function stop1008Trial(){return trial1008?.stop()??null;}
  function trial1008Report(){return trial1008?.report()??null;}
  function candidate(id){
// [VI dòng gốc 163] Kiểm tra W.KVPV_TRANSFORM10?.transformed?.(): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: gọi W.KVPV_TRANSFORM10.has(id).
    if(W.KVPV_TRANSFORM10?.transformed?.())return W.KVPV_TRANSFORM10.has(id);
// [VI dòng gốc 164] Kiểm tra !Number.isSafeInteger(id)||id<=0||(id>=8001&&id<=8009): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: false.
    if(!Number.isSafeInteger(id)||id<=0||(id>=8001&&id<=8009))return false;
// [VI dòng gốc 165] Khai báo biến không gán lại bằng const: r = gọi role() | Kết thúc hàm hiện tại và trả về: gọi [r.s?._rtt,r.s?._wet].some(rows=>Array.isArray(rows)&&rows.some(row=>Number(row?.[0])===id)) để kiểm tra có ít nhất một phần tử thỏa điều kiện.
    const r=role();return [r.s?._rtt,r.s?._wet].some(rows=>Array.isArray(rows)&&rows.some(row=>Number(row?.[0])===id));
// [VI dòng gốc 166] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 167] Chú thích gốc của tác giả; không được thực thi. Nội dung: Lấy tầm Boss từ cấu hình và bán kính nguy hiểm đã quan sát, chọn giá trị lớn hơn.
  // Lấy tầm Boss từ cấu hình và bán kính nguy hiểm đã quan sát, chọn giá trị lớn hơn.
// [VI dòng gốc 168] Định nghĩa hàm bossRange; tham số: không có | Khai báo biến không gán lại bằng const: cfg = Number(W._ft?._tY?.ins?.getCfgById?.(Number(prop(role().c?.target,'occ')))?.[3]) hoặc dùng vế phải khi vế trái falsy: 0
  function bossRange(){const cfg=Number(W._ft?._tY?.ins?.getCfgById?.(Number(prop(role().c?.target,'occ')))?.[3])||0;
// [VI dòng gốc 169] Khai báo biến không gán lại bằng const: observed = Number(W.KVPV_HITRUN1?.status?.(false)?.observedDangerRadius) hoặc dùng vế phải khi vế trái falsy: 0 | Kết thúc hàm hiện tại và trả về: gọi Math.max(cfg, observed).
    const observed=Number(W.KVPV_HITRUN1?.status?.(false)?.observedDangerRadius)||0;return Math.max(cfg,observed);}
// [VI dòng gốc 170] Chú thích gốc của tác giả; không được thực thi. Nội dung: Kiểm tra khoảng cách thuộc dải thử phía client; chưa phải chứng minh nằm ngoài tầm máy chủ.
  // Kiểm tra khoảng cách thuộc dải thử phía client; chưa phải chứng minh nằm ngoài tầm máy chủ.
// [VI dòng gốc 171] Định nghĩa hàm outside; tham số: d | Kết thúc hàm hiện tại và trả về: Number.isFinite(d)&&d>CFG.min và chỉ đánh giá vế phải khi vế trái truthy: d<=CFG.max.
  function outside(d){return Number.isFinite(d)&&d>CFG.min&&d<=CFG.max;}
// [VI dòng gốc 172] Chú thích gốc của tác giả; không được thực thi. Nội dung: Chỉ cho đánh khi HitRun ở FIGHT, còn trên ngưỡng rút lui và nhân vật không bị khóa di chuyển.
  // Chỉ cho đánh khi HitRun ở FIGHT, còn trên ngưỡng rút lui và nhân vật không bị khóa di chuyển.
// [VI dòng gốc 173] Chú thích gốc của tác giả; không được thực thi. Nội dung: Cả ba phó bản dùng chung pha và ngưỡng hồi máu 35/100 của HitRun.
  // Cả ba phó bản dùng chung pha và ngưỡng hồi máu 35/100 của HitRun.
// [VI dòng gốc 174] Định nghĩa hàm combatOwner; tham số: không có
  function combatOwner(){
// [VI dòng gốc 175] Kết thúc hàm hiện tại và trả về: gọi W.KVPV_HITRUN1?.status(false) để trả trạng thái để kiểm tra (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại).
    return tqDistanceOnly()?{running:true,phase:'FIGHT',owner:'TQ_DISTANCE_ONLY',leavePct:0}:
      W.KVPV_HITRUN1?.status?.(false);
// [VI dòng gốc 176] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 177] Chú thích gốc của tác giả; không được thực thi. Nội dung: Linh Lung và Phù Văn áp sát khi Boss còn tối đa 2%; vẫn nhường pha hồi máu.
  // Linh Lung và Phù Văn áp sát khi Boss còn tối đa 2%; vẫn nhường pha hồi máu.
// [VI dòng gốc 178] Định nghĩa hàm towerFinish; tham số: không có
  function towerFinish(){
// [VI dòng gốc 179] Khai báo biến không gán lại bằng const: kind = đọc W.KVPV_FAR_SCOPE?.status?.().kind (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); threshold = nếu ['LINH_LUNG','PHU_VAN','TRU_TIEN'].includes(kind) thì lấy .02, ngược lại lấy null
    const kind=W.KVPV_FAR_SCOPE?.status?.().kind,threshold=['LINH_LUNG','PHU_VAN','TRU_TIEN'].includes(kind)?.02:null;
// [VI dòng gốc 180] Kiểm tra threshold===null: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: false.
    if(threshold===null)return false;
// [VI dòng gốc 181] Khai báo biến không gán lại bằng const: t = đọc role().c?.target nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); h = gọi prop(t, 'hp'); current = gọi Number(h?.[0]) để chuyển sang số; max = gọi Number(h?.[1]) để chuyển sang số
    const t=role().c?.target,h=prop(t,'hp'),current=Number(h?.[0]),max=Number(h?.[1]);
// [VI dòng gốc 182] Kết thúc hàm hiện tại và trả về: eligible(t)&&Array.isArray(h)&&Number.isFinite(current)&&Number.isFinite(max)&&max>0&&current>0 và chỉ đánh giá vế phải khi vế trái truthy: current/max<=threshold.
    return eligible(t)&&Array.isArray(h)&&Number.isFinite(current)&&Number.isFinite(max)&&max>0&&current>0&&current/max<=threshold;
// [VI dòng gốc 183] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 184] Định nghĩa hàm canFight; tham số: không có | Kiểm tra W._Ba?._rJ?._O$?.ins?.isDead===true||(W.KVPV_FAR_SCOPE??W.KVPV_TQ_SCOPE)?.inside?.()===false: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: false. | Khai báo biến không gán lại bằng const: hr = gọi combatOwner(); r = gọi role(); hp = gọi prop(r.a, 'hp')
  function canFight(){if(W._Ba?._rJ?._O$?.ins?.isDead===true||(W.KVPV_FAR_SCOPE??W.KVPV_TQ_SCOPE)?.inside?.()===false)return false;const hr=combatOwner(),r=role(),hp=prop(r.a,'hp');
// [VI dòng gốc 185] Khai báo biến không gán lại bằng const: pct = nếu Array.isArray(hp)&&Number(hp[1])>0 thì lấy Number(hp[0])/Number(hp[1])*100, ngược lại lấy hr?.hpPct
    const pct=Array.isArray(hp)&&Number(hp[1])>0?Number(hp[0])/Number(hp[1])*100:hr?.hpPct;
// [VI dòng gốc 186] Kết thúc hàm hiện tại và trả về: hr?.running===true&&hr.phase==='FIGHT'&&Number.isFinite(pct)&&pct>Number(hr.leavePct??35)&&r.m?._fut!==3 và chỉ đánh giá vế phải khi vế trái truthy: r.m?._fut!==4.
    return hr?.running===true&&hr.phase==='FIGHT'&&Number.isFinite(pct)&&pct>Number(hr.leavePct??35)&&r.m?._fut!==3&&r.m?._fut!==4;}
// [VI dòng gốc 187] Định nghĩa hàm stats; tham số: occ, id | Khai báo biến không gán lại bằng const: k = gọi key(occ, id) | Kiểm tra !ST.stats.has(k): đúng thì chạy nhánh sau if. | gọi ST.stats.set(k, {attempts:0,hits:0,damage:0,unconfirmed:0})
  function stats(occ,id){const k=key(occ,id);if(!ST.stats.has(k))ST.stats.set(k,{attempts:0,hits:0,damage:0,unconfirmed:0});return ST.stats.get(k);}
// [VI dòng gốc 188] Chú thích gốc của tác giả; không được thực thi. Nội dung: Chuyển kết quả vào bộ chỉnh nhịp chỉ khi mẫu vẫn đủ điều kiện và đúng Boss/map/vị trí.
  // Chuyển kết quả vào bộ chỉnh nhịp chỉ khi mẫu vẫn đủ điều kiện và đúng Boss/map/vị trí.
// [VI dòng gốc 189] Định nghĩa hàm settle; tham số: c, hit | gọi pacer?.observe(hit, c.tuningEligible===true&&canFight()&&atPosition(role())&&c.targetId===identity(role().c?.target)&&c.scene===scene()) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
  function settle(c,hit){pacer?.observe(hit,c.tuningEligible===true&&canFight()&&atPosition(role())&&c.targetId===identity(role().c?.target)&&c.scene===scene());}
// [VI dòng gốc 190] Chú thích gốc của tác giả; không được thực thi. Nội dung: Đóng các lần tung chiêu hết hạn chưa ghép được sát thương; chưa xác nhận không đồng nghĩa máy chủ từ chối.
  // Đóng các lần tung chiêu hết hạn chưa ghép được sát thương; chưa xác nhận không đồng nghĩa máy chủ từ chối.
// [VI dòng gốc 191] Định nghĩa hàm expire; tham số: không có | Khai báo biến không gán lại bằng const: t = gọi Date.now() | Duyệt từng giá trị trong ST.casts bằng const c. | Khai báo biến không gán lại bằng const: c (chưa gán giá trị)
  function expire(){const t=Date.now();for(const c of ST.casts)if(!c.used&&t-c.time>CFG.castTtlMs){c.used=true;stats(c.occ,c.id).unconfirmed++;metrics?.result(c.serial,false,0,c.metricsInterrupted===true);
// [VI dòng gốc 192] Kiểm tra c.mixedBasic&&!c.metricsInterrupted&&c.targetId===identity(ST.target): đúng thì chạy nhánh sau if. | tăng mixed.unconfirmed một đơn vị sau khi lấy giá trị | Kiểm tra mixed.hits===0&&mixed.unconfirmed>=3&&!mixed.suspended: đúng thì chạy nhánh sau if. | gán mixed.suspended bằng true
      if(c.mixedBasic&&!c.metricsInterrupted&&c.targetId===identity(ST.target)&&!tqFive?.active()){mixed.unconfirmed++;if(mixed.hits===0&&mixed.unconfirmed>=3&&!mixed.suspended){mixed.suspended=true;mixed.wantBasic=false;note('BASIC-SUSPENDED',{reason:'three_unconfirmed_basic_results',bossId:c.targetId});}}
// [VI dòng gốc 193] gọi settle(c, false)
      settle(c,false);}}
// [VI dòng gốc 194] Chú thích gốc của tác giả; không được thực thi. Nội dung: Dùng khoảng cách nhỏ hơn của từng cặp tung chiêu/trúng; lấy mốc đủ số cặp xác nhận.
  // Dùng khoảng cách nhỏ hơn của từng cặp tung chiêu/trúng; lấy mốc đủ số cặp xác nhận.
// [VI dòng gốc 195] Định nghĩa hàm supportedDistance; tham số: occ, id | Khai báo biến không gán lại bằng const: a = gọi (ST.evidence.get(key(occ,id))||[]).map(x=>Math.min(x.castDistance,x.hitDistance)).sort((a,b)=>b-a) để sắp xếp mảng tại chỗ | Kết thúc hàm hiện tại và trả về: a[CFG.minCastConfirmations-1] hoặc dùng vế phải khi vế trái là null/undefined: 0.
  function supportedDistance(occ,id){const a=(ST.evidence.get(key(occ,id))||[]).map(x=>Math.min(x.castDistance,x.hitDistance)).sort((a,b)=>b-a);return a[CFG.minCastConfirmations-1]??0;}
// [VI dòng gốc 196] Chú thích gốc của tác giả; không được thực thi. Nội dung: Kiểm tra kỹ năng đã có đủ số bằng chứng độc lập theo loại Boss hay chưa.
  // Kiểm tra kỹ năng đã có đủ số bằng chứng độc lập theo loại Boss hay chưa.
// [VI dòng gốc 197] Định nghĩa hàm verified; tham số: occ, id | Kết thúc hàm hiện tại và trả về: tính biểu thức (ST.proofs.get(key(occ,id))?.size||0)>=CFG.minCastConfirmations.
  function verified(occ,id){return (ST.proofs.get(key(occ,id))?.size||0)>=CFG.minCastConfirmations;}
// [VI dòng gốc 198] Chú thích gốc của tác giả; không được thực thi. Nội dung: Lọc chiêu theo chế độ, bằng chứng tầm xa và lần tung chiêu còn đang chờ kết quả.
  // Lọc chiêu theo chế độ, bằng chứng tầm xa và lần tung chiêu còn đang chờ kết quả.
// [VI dòng gốc 199] Định nghĩa hàm probeActive; tham số: không có | Kết thúc hàm hiện tại và trả về: basicProbe.enabled&&!transforming()&&basicProbe.attempts<8 và chỉ đánh giá vế phải khi vế trái truthy: basicProbe.startedAt===null||Date.now()-basicProbe.startedAt<15000.
  function probeActive(){return basicProbe.enabled&&!transforming()&&basicProbe.attempts<8&&(basicProbe.startedAt===null||Date.now()-basicProbe.startedAt<15000);}
// [VI dòng gốc 200] Chú thích gốc của tác giả; không được thực thi. Nội dung: Keep unresolved hit records; after a completed native cycle they need not stall the next basic.
  // Keep unresolved hit records; after a completed native cycle they need not stall the next basic.
// [VI dòng gốc 201] Định nghĩa hàm basicPendingBlocks; tham số: c | Khai báo biến không gán lại bằng const: combat = đọc role().c | Kiểm tra CFG.basicOnly: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: animationPlaying(combat) hoặc dùng vế phải khi vế trái falsy: combat?.isCooldown?.()!==false.
  function basicPendingBlocks(c){const combat=role().c;if(CFG.basicOnly||tqFive?.active())return animationPlaying(combat)||combat?.isCooldown?.()!==false;if(mixed.hitQuota===null)return true;const rows=[...(role().s?._rtt||[]),...(role().s?._wet||[])];const row=rows.find(r=>Number(r[0])===c.id);const wait=Math.max(500,Number(row?.[2])||0);return Date.now()-c.time<wait||animationPlaying(combat)||combat?.isCooldown?.()!==false;}
// [VI dòng gốc 202] Định nghĩa hàm allowed; tham số: id, occ, d | Kiểm tra isBasic(id): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: selectedBasic(id)&&!(rangeTest?.status==='running'&&rangeTest.rows[rangeTest.index]?.id===Number(id)&&rangeTest.rows[rangeTest.index].attempts.length>=2)&&(basicProbe.dispatch||mix… và chỉ đánh giá vế phải khi vế trái truthy: !ST.casts.some(c=>!c.used&&c.basicTrial&&basicPendingBlocks(c)&&c.id===Number(id)&&c.targetId===identity(role().c?.target)&&c.scene===scene()&&Date.now()-c.time<=CFG.castTtlMs).
  // Khi đánh tay đã tạm ngưng vì thiếu xác nhận, không chặn Tuyệt Học bằng quota đánh tay.
  const basicQuotaSatisfied=id=>mixed.suspended||mixed.hitQuota===null||Number(id)<1001||Number(id)>1008||mixed.confirmedSinceTH>=mixed.hitQuota;
  function allowed(id,occ,d){if(trial1008?.blocks(id))return false;if(tqFive?.active()&&(isBasic(id)?!tqFive.ids().includes(Number(id))||!tqFive.canAttempt(Number(id)):!tqFive.allowsTuyetHoc()||Number(id)<1001||Number(id)>1008))return false;if(isBasic(id))return selectedBasic(id)&&!(rangeTest?.status==='running'&&rangeTest.rows[rangeTest.index]?.id===Number(id)&&rangeTest.rows[rangeTest.index].attempts.length>=2)&&(tqFive?.active()||basicProbe.dispatch||mixed.enabled&&!mixed.suspended)&&[role().s?._rtt,role().s?._wet].some(rows=>Array.isArray(rows)&&rows.some(row=>Number(row?.[0])===Number(id)))&&
// [VI dòng gốc 203] Định nghĩa hàm hàm không đặt tên; tham số: c
    !ST.casts.some(c=>!c.used&&c.basicTrial&&basicPendingBlocks(c)&&c.id===Number(id)&&c.targetId===identity(role().c?.target)&&c.scene===scene()&&Date.now()-c.time<=CFG.castTtlMs);
// [VI dòng gốc 204] Kết thúc hàm hiện tại và trả về: (mixed.hitQuota===null||Number(id)<1001||Number(id)>1008||mixed.confirmedSinceTH>=mixed.hitQuota)&&candidate(Number(id))&& !((burst.enabled||pacer)&&!transforming()&&ST.casts.some(… và chỉ đánh giá vế phải khi vế trái truthy: ST.mode==='SCAN'||(verified(occ,id)&&Number.isFinite(d)&&d<=supportedDistance(occ,id)+0.01).
    return basicQuotaSatisfied(id)&&candidate(Number(id))&&
// [VI dòng gốc 205] Định nghĩa hàm hàm không đặt tên; tham số: c
    !((burst.enabled||pacer)&&!transforming()&&ST.casts.some(c=>!c.used&&c.id===Number(id)&&c.targetId===identity(role().c?.target)&&c.scene===scene()&&Date.now()-c.time<=CFG.castTtlMs))&&
// [VI dòng gốc 206] gọi verified(occ, id) | gọi Number.isFinite(d) | gọi supportedDistance(occ, id)
    (ST.mode==='SCAN'||(verified(occ,id)&&Number.isFinite(d)&&d<=supportedDistance(occ,id)+0.01));}
// [VI dòng gốc 207] Chú thích gốc của tác giả; không được thực thi. Nội dung: Trong STRICT giới hạn vị trí theo tầm đã có bằng chứng; SCAN dùng khoảng cách cấu hình.
  // Trong STRICT giới hạn vị trí theo tầm đã có bằng chứng; SCAN dùng khoảng cách cấu hình.
// [VI dòng gốc 208] Định nghĩa hàm targetDistance; tham số: không có
  function targetDistance(){
    if(tqFive?.active())return CFG.goal;
// [VI dòng gốc 209] Kiểm tra ST.mode!=='STRICT': đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: đọc CFG.goal.
    if(ST.mode!=='STRICT')return CFG.goal;
// [VI dòng gốc 210] Khai báo biến không gán lại bằng const: occ = gọi stageOcc(); distances = gọi skillNames().filter(x=>verified(occ,x.id)).map(x=>supportedDistance(occ,x.id)) để biến đổi từng phần tử
    const occ=stageOcc(),distances=skillNames().filter(x=>verified(occ,x.id)).map(x=>supportedDistance(occ,x.id));
// [VI dòng gốc 211] Kiểm tra !distances.length: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: null.
    if(!distances.length)return null;
// [VI dòng gốc 212] Kết thúc hàm hiện tại và trả về: gọi Math.min(CFG.goal, Math.max(...distances)-0.2).
    return Math.min(CFG.goal,Math.max(...distances)-0.2);
// [VI dòng gốc 213] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 214] Chú thích gốc của tác giả; không được thực thi. Nội dung: Ghi diễn biến vào lịch sử nội bộ có giới hạn để truy vết quyết định.
  // Ghi diễn biến vào lịch sử nội bộ có giới hạn để truy vết quyết định.
// [VI dòng gốc 215] Định nghĩa hàm note; tham số: type, data | gọi ST.history.push({time:Date.now(),type,data}) để thêm phần tử vào cuối mảng | Kiểm tra ST.history.length>60: đúng thì chạy nhánh sau if. | gọi ST.history.shift()
  function note(type,data){ST.history.push({time:Date.now(),type,data});if(ST.history.length>60)ST.history.shift();}
// [VI dòng gốc 216] Chú thích gốc của tác giả; không được thực thi. Nội dung: Khôi phục hook chỉ khi quyền sở hữu còn hợp lệ, tránh ghi đè hook do bên khác thay sau đó.
  // Khôi phục hook chỉ khi quyền sở hữu còn hợp lệ, tránh ghi đè hook do bên khác thay sau đó.
// [VI dòng gốc 217] Định nghĩa hàm restore; tham số: h | Kiểm tra !h: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể. | Khai báo biến không gán lại bằng const: {obj,k,fn,own} = h
  function restore(h){if(!h)return;const {obj,k,fn,own}=h;if(obj[k]!==fn){ST.lastError='Hook replaced externally: '+k;return;}try{if(own)Object.defineProperty(obj,k,own);else delete obj[k];}catch(e){ST.lastError=String(e);}}
// [VI dòng gốc 218] Chú thích gốc của tác giả; không được thực thi. Nội dung: Lưu mô tả thuộc tính gốc rồi cài hàm bọc có thể gỡ lại.
  // Lưu mô tả thuộc tính gốc rồi cài hàm bọc có thể gỡ lại.
// [VI dòng gốc 219] Định nghĩa hàm hook; tham số: obj, k, mk
  function hook(obj,k,mk){
// [VI dòng gốc 220] Kiểm tra typeof obj?.[k]!=='function': đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: null.
    if(typeof obj?.[k]!=='function')return null;
// [VI dòng gốc 221] Khai báo biến có thể gán lại bằng let: own = gọi Object.getOwnPropertyDescriptor(obj, k) | Kiểm tra own&&!own.configurable: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: null.
    let own=Object.getOwnPropertyDescriptor(obj,k);if(own&&!own.configurable)return null;
// [VI dòng gốc 222] Khai báo biến có thể gán lại bằng let: base = đọc obj[k] | Khai báo biến không gán lại bằng const: seen = tạo đối tượng bằng Set()
    let base=obj[k];const seen=new Set();
// [VI dòng gốc 223] Chú thích gốc của tác giả; không được thực thi. Nội dung: Chỉ tháo lớp TH300 đã nhận diện; không tự bỏ các hook lạ hay guard HitRun.
    // Chỉ tháo lớp TH300 đã nhận diện; không tự bỏ các hook lạ hay guard HitRun.
// [VI dòng gốc 224] Lặp khi điều kiện còn đúng: typeof base?.__KVPV_TH300_PARENT==='function'&&!seen.has(base) | gọi seen.add(base) | gán base bằng base.__KVPV_TH300_PARENT
    while(typeof base?.__KVPV_TH300_PARENT==='function'&&!seen.has(base)){seen.add(base);base=base.__KVPV_TH300_PARENT;}
// [VI dòng gốc 225] Khai báo biến không gán lại bằng const: legacy = tạo hàm với tham số fn | Khai báo biến không gán lại bằng const: text = gọi Function.prototype.toString.call(fn)
    const legacy=fn=>{const text=Function.prototype.toString.call(fn);
// [VI dòng gốc 226] Kết thúc hàm hiện tại và trả về: nếu k==='combat' thì lấy text.startsWith('function(skillId){')&&text.includes('ST.running&&this===r.c')&&text.includes('ST.lastInvocation=Date.now()'), ngược lại lấy k==='_f7t'&&text.startsWith('function(active,common,mode){')&&text.includes('ST.running&&this===r.s')&&text.includes('ST.skillWaits').
      return k==='combat'?text.startsWith('function(skillId){')&&text.includes('ST.running&&this===r.c')&&text.includes('ST.lastInvocation=Date.now()'):
// [VI dòng gốc 227] gọi text.startsWith('function(active,common,mode){') | gọi text.includes('ST.running&&this===r.s') để kiểm tra dữ liệu có chứa giá trị | gọi text.includes('ST.skillWaits') để kiểm tra dữ liệu có chứa giá trị
        k==='_f7t'&&text.startsWith('function(active,common,mode){')&&text.includes('ST.running&&this===r.s')&&text.includes('ST.skillWaits');};
// [VI dòng gốc 228] Chú thích gốc của tác giả; không được thực thi. Nội dung: Migration cho FULL cũ chưa gắn metadata: chỉ dùng prototype khi cả chữ ký
    // Migration cho FULL cũ chưa gắn metadata: chỉ dùng prototype khi cả chữ ký
// [VI dòng gốc 229] Chú thích gốc của tác giả; không được thực thi. Nội dung: lẫn nội dung xác nhận đây là lớp TH300 cũ đang bị lưu như hàm native.
    // lẫn nội dung xác nhận đây là lớp TH300 cũ đang bị lưu như hàm native.
// [VI dòng gốc 230] Kiểm tra legacy(base): đúng thì chạy nhánh sau if.
    if(legacy(base)){
// [VI dòng gốc 231] Khai báo biến có thể gán lại bằng let: proto = gọi Object.getPrototypeOf(obj); candidate (chưa gán giá trị)
      let proto=Object.getPrototypeOf(obj),candidate;
// [VI dòng gốc 232] Lặp khi điều kiện còn đúng: proto | Khai báo biến không gán lại bằng const: d = gọi Object.getOwnPropertyDescriptor(proto, k) | Kiểm tra typeof d?.value==='function': đúng thì chạy nhánh sau if. | gán candidate bằng d.value
      while(proto){const d=Object.getOwnPropertyDescriptor(proto,k);if(typeof d?.value==='function'){candidate=d.value;break;}proto=Object.getPrototypeOf(proto);}
// [VI dòng gốc 233] Kiểm tra !candidate||legacy(candidate): đúng thì chạy nhánh sau if. | gán ST.lastError bằng 'Cannot safely unwrap legacy TH300 '+k | Kết thúc hàm hiện tại và trả về: null.
      if(!candidate||legacy(candidate)){ST.lastError='Cannot safely unwrap legacy TH300 '+k;return null;}
// [VI dòng gốc 234] gán base bằng candidate
      base=candidate;
// [VI dòng gốc 235] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 236] Kiểm tra base!==obj[k]: đúng thì chạy nhánh sau if.
    if(base!==obj[k]){
// [VI dòng gốc 237] Khai báo biến không gán lại bằng const: inherited = đọc Object.getPrototypeOf(obj)?.[k] nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
      const inherited=Object.getPrototypeOf(obj)?.[k];
// [VI dòng gốc 238] gán own bằng base===inherited?undefined:{value:base,writable:true,configurable:true,enumerable:!!own?.enumerable}
      own=base===inherited?undefined:{value:base,writable:true,configurable:true,enumerable:!!own?.enumerable};
// [VI dòng gốc 239] gọi note('HOOK-DEDUP', {method:k})
      note('HOOK-DEDUP',{method:k});
// [VI dòng gốc 240] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 241] Khai báo biến không gán lại bằng const: wrapped = gọi mk(base) | gọi Object.defineProperty(wrapped, '__KVPV_TH300_PARENT', {value:base})
    const wrapped=mk(base);Object.defineProperty(wrapped,'__KVPV_TH300_PARENT',{value:base});
// [VI dòng gốc 242] gọi Object.defineProperty(obj, k, {value:wrapped,writable:true,configurable:true,enumerable:!!own?.enumerable}) | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm obj, k, fn, own.
    Object.defineProperty(obj,k,{value:wrapped,writable:true,configurable:true,enumerable:!!own?.enumerable});return {obj,k,fn:wrapped,own};
// [VI dòng gốc 243] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 244] Chú thích gốc của tác giả; không được thực thi. Nội dung: Gỡ các hook do bộ kỹ năng cài đặt và giải phóng quyền giữ vị trí.
  // Gỡ các hook do bộ kỹ năng cài đặt và giải phóng quyền giữ vị trí.
// [VI dòng gốc 245] Định nghĩa hàm unbind; tham số: không có | gán ST.basicImpactSerial bằng null | gọi detachDispatch() | Duyệt từng giá trị trong ST.movement.slice().reverse() bằng const h.
  function unbind(){cooldown4100Release('unbind');ST.basicImpactSerial=null;detachDispatch();for(const h of ST.movement.slice().reverse())restore(h);ST.movement=[];restore(ST.s);restore(ST.c);ST.s=null;ST.c=null;ST.positioning=false;}
// [VI dòng gốc 246] Chú thích gốc của tác giả; không được thực thi. Nội dung: Đối chiếu khoảng cách Boss hiện tại với mục tiêu, sai số cho phép và điều kiện STRICT.
  // Đối chiếu khoảng cách Boss hiện tại với mục tiêu, sai số cho phép và điều kiện STRICT.
// [VI dòng gốc 247] Định nghĩa hàm atPosition; tham số: r | Khai báo biến không gán lại bằng const: d = gọi radius(r.a, r.c?.target); goal = gọi targetDistance() | Kết thúc hàm hiện tại và trả về: goal!==null&&outside(d)&&Math.abs(d-goal)<=CFG.tolerance+(ST.mode==='SCAN'&&ST.arrivalSnap?1:0) và chỉ đánh giá vế phải khi vế trái truthy: ST.mode!=='STRICT'||d<=goal+0.2.
  function atPosition(r){const d=radius(r.a,r.c?.target),goal=targetDistance();return goal!==null&&outside(d)&&Math.abs(d-goal)<=CFG.tolerance+(ST.mode==='SCAN'&&ST.arrivalSnap?1:0)&&(ST.mode!=='STRICT'||d<=goal+0.2);}
// [VI dòng gốc 248] Chú thích gốc của tác giả; không được thực thi. Nội dung: Gộp điều kiện sức khỏe, pha chiến đấu và vị trí trước khi tung chiêu.
  // Gộp điều kiện sức khỏe, pha chiến đấu và vị trí trước khi tung chiêu.
// [VI dòng gốc 249] Định nghĩa hàm castReady; tham số: không có | Khai báo biến không gán lại bằng const: r = gọi role() | Kết thúc hàm hiện tại và trả về: canFight()&&!ST.positioning và chỉ đánh giá vế phải khi vế trái truthy: atPosition(r).
  function castReady(){const r=role();return canFight()&&!ST.positioning&&atPosition(r);}
// [VI dòng gốc 250] Chú thích gốc của tác giả; không được thực thi. Nội dung: Chặn AI native kéo nhân vật vào gần khi bộ đánh xa đang giữ quyền; lệnh di chuyển của chính bộ này được đi qua.
  // Chặn AI native kéo nhân vật vào gần khi bộ đánh xa đang giữ quyền; lệnh di chuyển của chính bộ này được đi qua.
// [VI dòng gốc 251] Định nghĩa hàm guardMovement; tham số: r
  function guardMovement(r){
// [VI dòng gốc 252] Chú thích gốc của tác giả; không được thực thi. Nội dung: Giữ đường ngay cả trong khe khởi động trước khi HitRun chuyển sang FIGHT.
    // Giữ đường ngay cả trong khe khởi động trước khi HitRun chuyển sang FIGHT.
// [VI dòng gốc 253] Chú thích gốc của tác giả; không được thực thi. Nội dung: Pha RETREAT và nhân vật yếu máu vẫn nhường bộ hồi phục.
    // Pha RETREAT và nhân vật yếu máu vẫn nhường bộ hồi phục.
// [VI dòng gốc 254] Khai báo biến không gán lại bằng const: entryGuard = tạo hàm với tham số (không có) | Khai báo biến không gán lại bằng const: hr = gọi combatOwner(); hp = gọi prop(r.a, 'hp') | Kết thúc hàm hiện tại và trả về: ST.running&& W.KVPV_FAR_SCOPE?.status?.()?.kind==='THIEN_QUAN'&&!hr?.running&& W._Ba?._rJ?._O$?.ins?.isDead!==true&&Array.isArray(hp)&&Number(hp[1])>0 và chỉ đánh giá vế phải khi vế trái truthy: Number(hp[0])/Number(hp[1])*100>35.
    const entryGuard=()=>{const hr=combatOwner(),hp=prop(r.a,'hp');return ST.running&&
// [VI dòng gốc 255] gọi W.KVPV_FAR_SCOPE?.status() để trả trạng thái để kiểm tra
      W.KVPV_FAR_SCOPE?.status?.()?.kind==='THIEN_QUAN'&&!hr?.running&&
// [VI dòng gốc 256] gọi Array.isArray(hp) | gọi Number(hp[1]) để chuyển sang số | gọi Number(hp[0]) để chuyển sang số
      W._Ba?._rJ?._O$?.ins?.isDead!==true&&Array.isArray(hp)&&Number(hp[1])>0&&Number(hp[0])/Number(hp[1])*100>35;};
// [VI dòng gốc 257] Duyệt từng giá trị trong ['moveTo','moveToCoordinate','moveByPath'] bằng const method. | Khai báo biến không gán lại bằng const: method (chưa gán giá trị)
    for(const method of ['moveTo','moveToCoordinate','moveByPath']){
// [VI dòng gốc 258] Kiểm tra typeof r.m[method]!=='function': đúng thì chạy nhánh sau if. | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
    if(typeof r.m[method]!=='function')continue;
// [VI dòng gốc 259] Khai báo biến không gán lại bằng const: move = gọi hook(r.m, method, native=>function(...args){ // Keep ownership while holding the firing position too: native AI otherwise // …)
    const move=hook(r.m,method,native=>function(...args){
// [VI dòng gốc 260] Chú thích gốc của tác giả; không được thực thi. Nội dung: Keep ownership while holding the firing position too: native AI otherwise
      // Keep ownership while holding the firing position too: native AI otherwise
// [VI dòng gốc 261] Chú thích gốc của tác giả; không được thực thi. Nội dung: immediately chases back into its original attack radius after arrival.
      // immediately chases back into its original attack radius after arrival.
// [VI dòng gốc 262] Kiểm tra ST.running&&(canFight()||entryGuard())&&eligible(r.c?.target)&&!towerFinish()&&!ST.ownMove: đúng thì chạy nhánh sau if. | tăng ST.blockedSteering một đơn vị sau khi lấy giá trị | Kết thúc hàm hiện tại và trả về: undefined.
      if(ST.running&&(canFight()||entryGuard())&&eligible(r.c?.target)&&!towerFinish()&&!ST.ownMove){ST.blockedSteering++;return undefined;}
// [VI dòng gốc 263] Kết thúc hàm hiện tại và trả về: gọi native.apply(this, args).
      return native.apply(this,args);
// [VI dòng gốc 264] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    });
// [VI dòng gốc 265] Kiểm tra !move: đúng thì chạy nhánh sau if. | Duyệt từng giá trị trong ST.movement.slice().reverse() bằng const h. | Khai báo biến không gán lại bằng const: h (chưa gán giá trị) | gọi restore(h)
    if(!move){for(const h of ST.movement.slice().reverse())restore(h);ST.movement=[];return false;}ST.movement.push(move);
// [VI dòng gốc 266] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 267] Kiểm tra !ST.movement.length: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: false.
    if(!ST.movement.length)return false;
// [VI dòng gốc 268] Kiểm tra typeof r.m.stop==='function': đúng thì chạy nhánh sau if.
    if(typeof r.m.stop==='function'){
// [VI dòng gốc 269] Khai báo biến không gán lại bằng const: stopHook = gọi hook(r.m, 'stop', native=>function(...args){ if(ST.running&&ST.positioning&&canFight()&&!towerFinish()&&!ST.ownMove&&!atPosit…)
      const stopHook=hook(r.m,'stop',native=>function(...args){
// [VI dòng gốc 270] Kiểm tra ST.running&&ST.positioning&&canFight()&&!towerFinish()&&!ST.ownMove&&!atPosition(r): đúng thì chạy nhánh sau if. | tăng ST.blockedSteering một đơn vị sau khi lấy giá trị | Kết thúc hàm hiện tại và trả về: undefined.
        if(ST.running&&ST.positioning&&canFight()&&!towerFinish()&&!ST.ownMove&&!atPosition(r)){ST.blockedSteering++;return undefined;}
// [VI dòng gốc 271] Kết thúc hàm hiện tại và trả về: gọi native.apply(this, args).
        return native.apply(this,args);
// [VI dòng gốc 272] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
      });
// [VI dòng gốc 273] Kiểm tra !stopHook: đúng thì chạy nhánh sau if. | Duyệt từng giá trị trong ST.movement.slice().reverse() bằng const h. | Khai báo biến không gán lại bằng const: h (chưa gán giá trị) | gọi restore(h)
      if(!stopHook){for(const h of ST.movement.slice().reverse())restore(h);ST.movement=[];return false;}ST.movement.push(stopHook);
// [VI dòng gốc 274] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 275] Kết thúc hàm hiện tại và trả về: true.
    return true;
// [VI dòng gốc 276] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 277] Chú thích gốc của tác giả; không được thực thi. Nội dung: Thử chọn và tung chiêu khi đủ nhịp; vẫn kiểm tra hồi chiêu và mục tiêu bằng hàm native.
  // Thử chọn và tung chiêu khi đủ nhịp; vẫn kiểm tra hồi chiêu và mục tiêu bằng hàm native.
// [VI dòng gốc 278] Chú thích gốc của tác giả; không được thực thi. Nội dung: Không gọi bộ chọn native khi combat còn bận: chọn chiêu sẽ cập nhật mốc hồi chiêu ngay.
  // Không gọi bộ chọn native khi combat còn bận: chọn chiêu sẽ cập nhật mốc hồi chiêu ngay.
// [VI dòng gốc 279] Khai báo biến không gán lại bằng const: animationPlaying = tạo hàm với tham số c; mỗi lần gọi trả về tính biểu thức c?._jh?.isPlaying===true
  const animationPlaying=c=>c?._jh?.isPlaying===true;
// [VI dòng gốc 280] Chú thích gốc của tác giả; không được thực thi. Nội dung: Chỉ cắt phần chờ sau hit của đòn thường mới nhất; TH chưa trúng vẫn chờ
  // Chỉ cắt phần chờ sau hit của đòn thường mới nhất; TH chưa trúng vẫn chờ
// [VI dòng gốc 281] Chú thích gốc của tác giả; không được thực thi. Nội dung: hết animation. Luôn giữ cổng native, không ép tốc độ tween hay sửa server CD.
  // hết animation. Luôn giữ cổng native, không ép tốc độ tween hay sửa server CD.
// [VI dòng gốc 282] Khai báo biến không gán lại bằng const: basicTailReady = tạo hàm với tham số (không có); mỗi lần gọi trả về mixed.enabled&&ST.basicImpactSerial===ST.castAttempts và chỉ đánh giá vế phải khi vế trái truthy: ST.basicImpactSerial!==null
  const basicTailReady=()=>mixed.enabled&&ST.basicImpactSerial===ST.castAttempts&&ST.basicImpactSerial!==null;
  // TQ: only matched damage may release the tails of 8001..8005; other maps keep 8001/8005.
  const confirmedTailSkill=id=>tqFive?.active()?Number(id)>=8001&&Number(id)<=8005:[8001,8005].includes(Number(id));
// [VI dòng gốc 283] Định nghĩa hàm nativeReady; tham số: c
  function nativeReady(c){
// [VI dòng gốc 284] Khai báo biến không gán lại bằng const: studyRunning = tính biểu thức tailStudy?.status==='running'; cutEnabled = nếu studyRunning thì lấy tailStudy.phase==='trim', ngược lại lấy confirmedTailCut
    const studyRunning=tailStudy?.status==='running',cutEnabled=studyRunning?tailStudy.phase==='trim':confirmedTailCut;
// [VI dòng gốc 285] Kiểm tra cutEnabled&&basicTailReady()&&canFight(): đúng thì chạy nhánh sau if.
    if(cutEnabled&&basicTailReady()&&canFight()){
// [VI dòng gốc 286] Khai báo biến không gán lại bằng const: cast = gọi ST.casts.findLast(x=>x.serial===ST.basicImpactSerial) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại); tween = đọc c?._jh nếu đối tượng tồn tại (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
      const cast=ST.casts.findLast?.(x=>x.serial===ST.basicImpactSerial),tween=c?._jh;
// [VI dòng gốc 287] Kiểm tra cast?.used&&(!studyRunning||cast.tailPhase==='trim')&&!cast.tailCut&&[8001,8005].includes(cast.id)&&cast.targetId===identity(c.target)&&cast.scene===scene()&&tween?.isPlaying===tru…: đúng thì chạy nhánh sau if.
      if(cast?.used&&(!studyRunning||cast.tailPhase==='trim')&&!cast.tailCut&&confirmedTailSkill(cast.id)&&cast.targetId===identity(c.target)&&cast.scene===scene()&&tween?.isPlaying===true&&typeof tween.stop==='function'){
// [VI dòng gốc 288] gán cast.tailCut bằng true | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | gọi tween.stop() để dừng bộ điều khiển và dọn tài nguyên | Kiểm tra c._jh===tween: đúng thì chạy nhánh sau if.
        cast.tailCut=true;try{tween.stop();if(c._jh===tween)c._jh=null;confirmedTailCuts++;if(studyRunning)tailStudy.trim.cuts++;}
// [VI dòng gốc 289] Nhận lỗi bằng e và chạy phần xử lý lỗi. | gán confirmedTailCut bằng false | gán ST.lastError bằng String(e?.message||e) | Kiểm tra studyRunning: đúng thì chạy nhánh sau if.
        catch(e){confirmedTailCut=false;ST.lastError=String(e?.message||e);if(studyRunning){tailStudy.error=ST.lastError;finishTailStudy('error');}}
// [VI dòng gốc 290] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
      }
// [VI dòng gốc 291] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 292] Kết thúc hàm hiện tại và trả về: !animationPlaying(c)||basicTailReady() và chỉ đánh giá vế phải khi vế trái truthy: typeof c?.isCooldown!=='function'||c.isCooldown()===false.
    return (!animationPlaying(c)||basicTailReady())&&(typeof c?.isCooldown!=='function'||c.isCooldown()===false);
// [VI dòng gốc 293] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 294] Chú thích gốc của tác giả; không được thực thi. Nội dung: Burst thử nghiệm: tối đa tám ID Tuyệt Học native trong cùng lượt JS.
  // Burst thử nghiệm: tối đa tám ID Tuyệt Học native trong cùng lượt JS.
// [VI dòng gốc 295] Chú thích gốc của tác giả; không được thực thi. Nội dung: Chỉ bỏ chờ animation GIỮA các chiêu của lượt này; không sửa hàng hồi chiêu hay phạm vi/HP.
  // Chỉ bỏ chờ animation GIỮA các chiêu của lượt này; không sửa hàng hồi chiêu hay phạm vi/HP.
// [VI dòng gốc 296] Định nghĩa hàm burstCast; tham số: r
  function burstCast(r){
// [VI dòng gốc 297] Khai báo biến không gán lại bằng const: now = gọi Date.now() | Kiểm tra now<burst.nextAt: đúng thì chạy nhánh sau if. | gán ST.lastReason bằng 'waiting_burst_gap' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    const now=Date.now();if(now<burst.nextAt){ST.lastReason='waiting_burst_gap';return;}
// [VI dòng gốc 298] Kiểm tra !nativeReady(r.c): đúng thì chạy nhánh sau if. | gán ST.lastReason bằng 'waiting_native_cooldown' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(!nativeReady(r.c)){ST.lastReason='waiting_native_cooldown';return;}
// [VI dòng gốc 299] Chú thích gốc của tác giả; không được thực thi. Nội dung: Chờ bằng chứng riêng từng ID trong allowed(); không để một buff chặn cả bộ chiêu.
    // Chờ bằng chứng riêng từng ID trong allowed(); không để một buff chặn cả bộ chiêu.
// [VI dòng gốc 300] Kiểm tra r.c.isValidTarget?.()!==true: đúng thì chạy nhánh sau if. | gán ST.lastReason bằng 'native_target_invalid' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(r.c.isValidTarget?.()!==true){ST.lastReason='native_target_invalid';return;}
// [VI dòng gốc 301] Khai báo biến không gán lại bằng const: ids = gọi skillNames().map(x=>x.id).filter(id=>id>=1001&&id<=1008) để giữ phần tử thỏa điều kiện
    const ids=skillNames().map(x=>x.id).filter(id=>id>=1001&&id<=1008);
// [VI dòng gốc 302] Khai báo biến không gán lại bằng const: group = tạo đối tượng gồm serial, at, bossId, scene, attempted, confirmed, matchedDamage
    const group={serial:burst.serial+1,at:now,bossId:identity(r.c.target),scene:scene(),attempted:[],confirmed:[],matchedDamage:0};
// [VI dòng gốc 303] gọi burst.history.push(group) để thêm phần tử vào cuối mảng | gán burst.active bằng group
    burst.history.push(group);burst.active=group;
// [VI dòng gốc 304] gán burst.dispatch bằng true | gán burst.nextAt bằng now+1000
    burst.dispatch=true;burst.nextAt=now+1000;
// [VI dòng gốc 305] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài.
    try{
// [VI dòng gốc 306] Duyệt từng giá trị trong ids bằng const id. | Khai báo biến không gán lại bằng const: id (chưa gán giá trị)
      for(const id of ids){
// [VI dòng gốc 307] Kiểm tra !castReady()||!eligible(r.c.target)||identity(r.c.target)!==group.bossId||scene()!==group.scene: đúng thì chạy nhánh sau if. | Thoát vòng lặp/switch hiện tại.
        if(!castReady()||!eligible(r.c.target)||identity(r.c.target)!==group.bossId||scene()!==group.scene)break;
// [VI dòng gốc 308] gán burst.desired bằng id | Khai báo biến không gán lại bằng const: selected = gọi Number(r.s.selectSkill?.()) để chuyển sang số
        burst.desired=id;const selected=Number(r.s.selectSkill?.());
// [VI dòng gốc 309] Kiểm tra selected!==id: đúng thì chạy nhánh sau if. | Bỏ phần còn lại của vòng hiện tại và chuyển sang vòng tiếp theo.
        if(selected!==id)continue;
// [VI dòng gốc 310] Khai báo biến không gán lại bằng const: before = đọc ST.castAttempts | gọi r.c.combat(id)
        const before=ST.castAttempts;r.c.combat(id);
// [VI dòng gốc 311] Kiểm tra ST.castAttempts>before: đúng thì chạy nhánh sau if. | gọi group.attempted.push(id) để thêm phần tử vào cuối mảng | tăng ST.fastCasts một đơn vị sau khi lấy giá trị
        if(ST.castAttempts>before){group.attempted.push(id);ST.fastCasts++;}
// [VI dòng gốc 312] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
      }
// [VI dòng gốc 313] gán burst.dispatch bằng false | gán burst.desired bằng null | gán burst.active bằng null
    }finally{burst.dispatch=false;burst.desired=null;burst.active=null;
// [VI dòng gốc 314] Kiểm tra !group.attempted.length: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gọi burst.history.pop() | gán burst.nextAt bằng now+100
      if(!group.attempted.length){burst.history.pop();burst.nextAt=now+100;}
// [VI dòng gốc 315] tăng burst.serial một đơn vị sau khi lấy giá trị | Kiểm tra burst.history.length>30: đúng thì chạy nhánh sau if. | gọi burst.history.shift()
      else{burst.serial++;if(burst.history.length>30)burst.history.shift();}}
// [VI dòng gốc 316] gán ST.lastReason bằng group.attempted.length?'burst_dispatched':ST.casts.some(c=>!c.used&&c.targetId===identity(r.c.target)&&c.scene===scene())?'burst_waiting_results':'waiting_ready_tuyet_hoc'
    ST.lastReason=group.attempted.length?'burst_dispatched':ST.casts.some(c=>!c.used&&c.targetId===identity(r.c.target)&&c.scene===scene())?'burst_waiting_results':'waiting_ready_tuyet_hoc';
// [VI dòng gốc 317] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 318] Chú thích gốc của tác giả; không được thực thi. Nội dung: Thử tối đa 8 lời gọi/15 giây mỗi mục tiêu; ưu tiên phép đo riêng rồi trả lại Tuyệt Học.
  // Thử tối đa 8 lời gọi/15 giây mỗi mục tiêu; ưu tiên phép đo riêng rồi trả lại Tuyệt Học.
// [VI dòng gốc 319] Định nghĩa hàm probeCast; tham số: r | Khai báo biến không gán lại bằng const: now = gọi Date.now() | Kiểm tra basicProbe.startedAt===null: đúng thì chạy nhánh sau if. | gán basicProbe.startedAt bằng now
  function probeCast(r){const now=Date.now();if(basicProbe.startedAt===null)basicProbe.startedAt=now;
// [VI dòng gốc 320] Kiểm tra now<basicProbe.nextAt: đúng thì chạy nhánh sau if. | gán ST.lastReason bằng 'basic_probe_wait' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(now<basicProbe.nextAt){ST.lastReason='basic_probe_wait';return;}
// [VI dòng gốc 321] Kiểm tra !nativeReady(r.c): đúng thì chạy nhánh sau if. | gán ST.lastReason bằng 'waiting_native_cooldown' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(!nativeReady(r.c)){ST.lastReason='waiting_native_cooldown';return;}
// [VI dòng gốc 322] Kiểm tra r.c.isValidTarget?.()!==true: đúng thì chạy nhánh sau if. | gán ST.lastReason bằng 'native_target_invalid' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(r.c.isValidTarget?.()!==true){ST.lastReason='native_target_invalid';return;}
// [VI dòng gốc 323] gán basicProbe.dispatch bằng true | gán basicProbe.nextAt bằng now+500
    basicProbe.dispatch=true;basicProbe.nextAt=now+500;
// [VI dòng gốc 324] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | Khai báo biến không gán lại bằng const: id = gọi Number(r.s.selectSkill?.()) để chuyển sang số | Kiểm tra isBasic(id): đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gọi r.c.combat(id)
    try{const id=Number(r.s.selectSkill?.());if(isBasic(id))r.c.combat(id);else ST.lastReason='basic_probe_waiting_ready';}
// [VI dòng gốc 325] gán basicProbe.dispatch bằng false
    finally{basicProbe.dispatch=false;}
// [VI dòng gốc 326] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 327] Định nghĩa hàm fastCast; tham số: r
  function thGapCast(r){
    if(basicSolo4100Active()||pilot4100THOnly()||!thGapActive(r.c))return false;
    if(!thGapNativeReady(r.c)){thGap.blockedCooldown++;ST.lastReason='th_gap_native_cooldown';return true;}
    if(r.c.isValidTarget?.()!==true){ST.lastReason='native_target_invalid';return true;}
    thGap.picking=true;
    try{
      const id=Number(r.s.selectSkill?.()),occ=Number(prop(r.c.target,'occ')),d=radius(r.a,r.c.target);
      if(!isBasic(id)||id>8005||!allowed(id,occ,d)){ST.lastReason='th_gap_no_ready_basic';return true;}
      const before=ST.castAttempts;r.c.combat(id);
      if(ST.castAttempts>before){thGap.attempts++;ST.fastCasts++;ST.lastReason='th_gap_basic_native_attempt';}
      else ST.lastReason='th_gap_basic_blocked';
      return true;
    }finally{thGap.picking=false;}
  }
  function fastCast(r){
// [VI dòng gốc 328] Khai báo biến không gán lại bằng const: pace = gọi currentPace()
    const pace=currentPace();
// [VI dòng gốc 329] Kiểm tra !castReady(): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(!castReady())return;
// [VI dòng gốc 330] Kiểm tra probeActive(): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: gọi probeCast(r).
    if(probeActive())return probeCast(r);
// [VI dòng gốc 331] Kiểm tra burst.enabled&&!transforming(): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: gọi burstCast(r).
    if(burst.enabled&&!transforming())return burstCast(r);
// [VI dòng gốc 332] Kiểm tra Date.now()-ST.lastInvocation<pace: đúng thì chạy nhánh sau if. | gán ST.lastReason bằng 'waiting_pace' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(Date.now()-ST.lastInvocation<pace){ST.lastReason='waiting_pace';return;}
    if(thGapCast(r))return;
// [VI dòng gốc 333] Kiểm tra typeof r.c.isCooldown!=='function': đúng thì chạy nhánh sau if. | gán ST.lastReason bằng 'native_cooldown_unavailable' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(typeof r.c.isCooldown!=='function'){ST.lastReason='native_cooldown_unavailable';return;}
// [VI dòng gốc 334] Kiểm tra !nativeReady(r.c): đúng thì chạy nhánh sau if. | gán ST.lastReason bằng animationPlaying(r.c)?'waiting_native_animation':'waiting_native_cooldown' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(!nativeReady(r.c)){ST.lastReason=animationPlaying(r.c)?'waiting_native_animation':'waiting_native_cooldown';return;}
// [VI dòng gốc 335] Kiểm tra typeof r.c.isValidTarget!=='function'||r.c.isValidTarget()!==true: đúng thì chạy nhánh sau if. | gán ST.lastReason bằng 'native_target_invalid' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(typeof r.c.isValidTarget!=='function'||r.c.isValidTarget()!==true){ST.lastReason='native_target_invalid';return;}
// [VI dòng gốc 336] Khai báo biến không gán lại bằng const: skill = gọi Number(r.s.selectSkill?.()) để chuyển sang số
    const skill=Number(r.s.selectSkill?.());
// [VI dòng gốc 337] Kiểm tra allowed(skill,Number(prop(r.c.target,'occ')),radius(r.a,r.c.target)): đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gọi r.c.combat(skill) | tăng ST.fastCasts một đơn vị sau khi lấy giá trị | gán ST.lastReason bằng 'casting_native_skill'
    if(allowed(skill,Number(prop(r.c.target,'occ')),radius(r.a,r.c.target))){r.c.combat(skill);ST.fastCasts++;ST.lastReason='casting_native_skill';}
// [VI dòng gốc 338] gán ST.lastReason bằng 'waiting_ready_tuyet_hoc'
    else ST.lastReason=basicSolo4100Active()?'waiting_ready_basic':'waiting_ready_tuyet_hoc';
// [VI dòng gốc 339] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 340] Chú thích gốc của tác giả; không được thực thi. Nội dung: Xử lý sự kiện sát thương để cập nhật bằng chứng; bộ lọc trong hàm quyết định mẫu nào thực sự phù hợp.
  // Xử lý sự kiện sát thương để cập nhật bằng chứng; bộ lọc trong hàm quyết định mẫu nào thực sự phù hợp.
// [VI dòng gốc 341] Định nghĩa hàm onHit; tham số: source, marker, damage, flags, receiver
  function onHit(source,marker,damage,flags,receiver){
// [VI dòng gốc 342] Kiểm tra !ST.running: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể. | tăng hitDiagnostics.received một đơn vị sau khi lấy giá trị
    if(!ST.running)return;hitDiagnostics.received++;
// [VI dòng gốc 343] Khai báo biến không gán lại bằng const: reject = tạo hàm với tham số reason | gán hitDiagnostics.rejected[reason] bằng (hitDiagnostics.rejected[reason]||0)+1
    const reject=reason=>{hitDiagnostics.rejected[reason]=(hitDiagnostics.rejected[reason]||0)+1;
// [VI dòng gốc 344] Kiểm tra String(source)===actorId: đúng thì chạy nhánh sau if. | gọi hitDiagnostics.recent.push({at:Date.now(),reason,source:String(source),receiver:String(receiver),marker:Number(marker),damage:Number(damage),flags:…) để thêm phần tử vào cuối mảng | Kiểm tra hitDiagnostics.recent.length>16: đúng thì chạy nhánh sau if. | gọi hitDiagnostics.recent.shift()
      if(String(source)===actorId){hitDiagnostics.recent.push({at:Date.now(),reason,source:String(source),receiver:String(receiver),marker:Number(marker),damage:Number(damage),flags:Number(flags)});if(hitDiagnostics.recent.length>16)hitDiagnostics.recent.shift();}};
// [VI dòng gốc 345] Kiểm tra String(source)!==actorId: đúng thì chạy nhánh sau if. | gọi reject('foreign_source') | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(String(source)!==actorId){reject('foreign_source');return;}
// [VI dòng gốc 346] Kiểm tra String(receiver)!==identity(ST.target): đúng thì chạy nhánh sau if. | gọi reject('wrong_receiver') | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(String(receiver)!==identity(ST.target)){reject('wrong_receiver');return;}
// [VI dòng gốc 347] Kiểm tra !(Number(damage)>0): đúng thì chạy nhánh sau if. | gọi reject('nonpositive_damage') | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(!(Number(damage)>0)){reject('nonpositive_damage');return;}
// [VI dòng gốc 348] Khai báo biến không gán lại bằng const: raw = gọi Number(marker) để chuyển sang số; id = tính biểu thức raw/10000; fl = Number(flags) hoặc dùng vế phải khi vế trái falsy: 0
    const raw=Number(marker),id=raw/10000,fl=Number(flags)||0;
// [VI dòng gốc 349] Chú thích gốc của tác giả; không được thực thi. Nội dung: Loại marker không khớp và cờ sát thương phụ/phản lại; không lấy chúng làm bằng chứng chiêu trực tiếp.
    // Loại marker không khớp và cờ sát thương phụ/phản lại; không lấy chúng làm bằng chứng chiêu trực tiếp.
// [VI dòng gốc 350] Kiểm tra !Number.isSafeInteger(raw)||raw%10000: đúng thì chạy nhánh sau if. | gọi reject('unsupported_marker') | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(!Number.isSafeInteger(raw)||raw%10000){reject('unsupported_marker');return;}
// [VI dòng gốc 351] Kiểm tra !candidate(id)&&!isBasic(id): đúng thì chạy nhánh sau if. | gọi reject('unsupported_skill') | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(!candidate(id)&&!isBasic(id)){reject('unsupported_skill');return;}
// [VI dòng gốc 352] Kiểm tra fl&(4|16|32|64|128|256): đúng thì chạy nhánh sau if. | gọi reject('auxiliary_flags') | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    if(fl&(4|16|32|64|128|256)){reject('auxiliary_flags');return;}
// [VI dòng gốc 353] Khai báo biến không gán lại bằng const: d = gọi radius(role().a, ST.target) | gán ST.lastHitDistance bằng d==null?null:+d.toFixed(2)
    const d=radius(role().a,ST.target);ST.lastHitDistance=d==null?null:+d.toFixed(2);
// [VI dòng gốc 354] Khai báo biến không gán lại bằng const: closeBasic = id===8001&&mixed.hitQuota!==null&&towerFinish() và chỉ đánh giá vế phải khi vế trái truthy: canFight() | Kiểm tra !outside(d)&&!closeBasic: đúng thì chạy nhánh sau if. | gọi reject('hit_outside_trial_band') | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
    const closeBasic=id===8001&&mixed.hitQuota!==null&&towerFinish()&&canFight();if(!outside(d)&&!closeBasic){reject('hit_outside_trial_band');return;}
// [VI dòng gốc 355] Khai báo biến không gán lại bằng const: t = gọi Date.now() | Khai báo biến không gán lại bằng const: cast = gọi ST.casts.findLast(c=>!c.used&&c.targetId===identity(ST.target)&&c.scene===scene()&&c.occ===ST.targetOcc&&c.id===id&&t-c.time>=0&&t-c.time<…) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    const t=Date.now();const cast=ST.casts.findLast?.(c=>!c.used&&c.targetId===identity(ST.target)&&c.scene===scene()&&c.occ===ST.targetOcc&&c.id===id&&t-c.time>=0&&t-c.time<=CFG.castTtlMs&&(outside(c.distance)||closeBasic&&c.finishBasic));
// [VI dòng gốc 356] Kiểm tra !cast: đúng thì chạy nhánh sau if. | gọi reject('no_matching_pending_cast') | Kết thúc hàm hiện tại mà không trả giá trị cụ thể. | tăng hitDiagnostics.accepted một đơn vị sau khi lấy giá trị
    if(!cast){reject('no_matching_pending_cast');return;}hitDiagnostics.accepted++;
// [VI dòng gốc 357] Kiểm tra cast.basicTrial: đúng thì chạy nhánh sau if. | Kiểm tra cast.mixedBasic&&id===8001&&mixed.hitQuota!==null: đúng thì chạy nhánh sau if. | tăng mixed.confirmedSinceTH một đơn vị sau khi lấy giá trị | gán mixed.wantBasic bằng mixed.confirmedSinceTH<mixed.hitQuota
    if(cast.basicTrial){
      if(tqFive?.active()&&isBasic(id)){const sample=thGap.measured.get(id)||{hits:0,damage:0};sample.hits++;sample.damage+=Number(damage);keepRecentHit(sample,damage);thGap.measured.set(id,sample);}
      tqFive?.hit?.(cast.serial,cast.distance,d,Number(damage));if(cast.mixedBasic&&id===8001&&mixed.hitQuota!==null){mixed.confirmedSinceTH++;mixed.wantBasic=mixed.confirmedSinceTH<mixed.hitQuota;}cast.used=true;if(cast.mixedBasic&&cast.serial===ST.castAttempts)ST.basicImpactSerial=cast.serial;const metric=stats(cast.occ,id);metric.hits++;metric.damage+=Number(damage);
// [VI dòng gốc 358] Kiểm tra cast.tailPhase&&tailStudy?.[cast.tailPhase]: đúng thì chạy nhánh sau if. | tăng tailStudy[cast.tailPhase].hits một đơn vị sau khi lấy giá trị | cập nhật bằng toán tử += tailStudy[cast.tailPhase].damage bằng Number(damage)
      if(cast.tailPhase&&tailStudy?.[cast.tailPhase]){tailStudy[cast.tailPhase].hits++;tailStudy[cast.tailPhase].damage+=Number(damage);}
// [VI dòng gốc 359] Khai báo biến không gán lại bằng const: testRow = gọi rangeTest?.rows.find(row=>row.id===id) để tìm phần tử đầu tiên thỏa điều kiện (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
      const testRow=rangeTest?.rows.find(row=>row.id===id);
// [VI dòng gốc 360] Kiểm tra testRow&&testRow.attempts.some(a=>a.serial===cast.serial&&a.bossId===cast.targetId): đúng thì chạy nhánh sau if. | gọi testRow.hits.push({serial:cast.serial,bossId:cast.targetId,castDistance:cast.distance,hitDistance:d,damage:Number(damage)}) để thêm phần tử vào cuối mảng
      if(testRow&&testRow.attempts.some(a=>a.serial===cast.serial&&a.bossId===cast.targetId))testRow.hits.push({serial:cast.serial,bossId:cast.targetId,castDistance:cast.distance,hitDistance:d,damage:Number(damage)});
// [VI dòng gốc 361] gọi metrics?.result(cast.serial, true, damage) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Khai báo biến không gán lại bằng const: result = nếu cast.mixedBasic thì lấy mixed, ngược lại lấy basicProbe | tăng result.hits một đơn vị sau khi lấy giá trị | cập nhật bằng toán tử += result.damage bằng Number(damage)
      metrics?.result(cast.serial,true,damage);const result=cast.mixedBasic?mixed:basicProbe;result.hits++;result.damage+=Number(damage);if(cast.mixedBasic)mixed.suspended=false;
// [VI dòng gốc 362] gọi result.examples.push({id,bossId:cast.targetId,scene:cast.scene,castDistance:cast.distance,hitDistance:d,damage:Number(damage)}) để thêm phần tử vào cuối mảng
      result.examples.push({id,bossId:cast.targetId,scene:cast.scene,castDistance:cast.distance,hitDistance:d,damage:Number(damage)});
// [VI dòng gốc 363] Kiểm tra result.examples.length>30: đúng thì chạy nhánh sau if. | gọi result.examples.shift() | gọi note('BASIC-CONFIRMED', result.examples.at(-1)) | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      if(result.examples.length>30)result.examples.shift();note('BASIC-CONFIRMED',result.examples.at(-1));return;}
// [VI dòng gốc 364] gán cast.used bằng true | tăng ST.confirmedPairs một đơn vị sau khi lấy giá trị
    cast.used=true;ST.confirmedPairs++;
// [VI dòng gốc 365] Kiểm tra cast.burstSerial!=null: đúng thì chạy nhánh sau if. | Khai báo biến không gán lại bằng const: g = gọi burst.history.find(x=>x.serial===cast.burstSerial) để tìm phần tử đầu tiên thỏa điều kiện | Kiểm tra g: đúng thì chạy nhánh sau if. | gọi g.confirmed.push(id) để thêm phần tử vào cuối mảng
    if(cast.burstSerial!=null){const g=burst.history.find(x=>x.serial===cast.burstSerial);if(g){g.confirmed.push(id);g.matchedDamage+=Number(damage);}}
// [VI dòng gốc 366] gọi metrics?.result(cast.serial, true, damage) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gọi settle(cast, true)
    metrics?.result(cast.serial,true,damage);settle(cast,true);
// [VI dòng gốc 367] Khai báo biến không gán lại bằng const: k = gọi key(cast.occ, id); set = ST.proofs.get(k) hoặc dùng vế phải khi vế trái falsy: new Set() | gọi set.add(cast.serial) | gọi ST.proofs.set(k, set)
    const k=key(cast.occ,id),set=ST.proofs.get(k)||new Set();set.add(cast.serial);ST.proofs.set(k,set);
// [VI dòng gốc 368] Khai báo biến không gán lại bằng const: observations = ST.evidence.get(k) hoặc dùng vế phải khi vế trái falsy: [] | gọi observations.push({castDistance:cast.distance,hitDistance:d}) để thêm phần tử vào cuối mảng | Kiểm tra observations.length>100: đúng thì chạy nhánh sau if. | gọi observations.shift()
    const observations=ST.evidence.get(k)||[];observations.push({castDistance:cast.distance,hitDistance:d});if(observations.length>100)observations.shift();ST.evidence.set(k,observations);
// [VI dòng gốc 369] Khai báo biến không gán lại bằng const: metric = gọi stats(cast.occ, id) | tăng metric.hits một đơn vị sau khi lấy giá trị | cập nhật bằng toán tử += metric.damage bằng Number(damage)
    const metric=stats(cast.occ,id);metric.hits++;metric.damage+=Number(damage);
    if(tqFive?.active()&&id>=1001&&id<=1008){const row=cosmic.thMeasured.get(id)||{hits:0,damage:0};
      row.hits++;row.damage+=Number(damage);keepRecentHit(row,damage);cosmic.thMeasured.set(id,row);}
// [VI dòng gốc 370] gọi note('CONFIRMED', {id,castDistance:cast.distance,hitDistance:+d.toFixed(2),pairs:set.size})
    note('CONFIRMED',{id,castDistance:cast.distance,hitDistance:+d.toFixed(2),pairs:set.size});
// [VI dòng gốc 371] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 372] Chú thích gốc của tác giả; không được thực thi. Nội dung: Hủy theo dõi Boss cũ và bỏ các lần tung chiêu đang chờ để không ghép sang Boss mới.
  // Hủy theo dõi Boss cũ và bỏ các lần tung chiêu đang chờ để không ghép sang Boss mới.
// [VI dòng gốc 373] Định nghĩa hàm unlisten; tham số: không có | gọi metrics?.close(ST.running?'target_changed':'stopped') (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Kiểm tra ST.target: đúng thì chạy nhánh sau if. | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài.
  function unlisten(){resetThGap();cosmicReset();trial1008?.stop();metrics?.close(ST.running?'target_changed':'stopped');if(ST.target){try{ST.target.off?.(1012,ST.owner,onHit);}catch(_){window.KVPV_V1?.diagnostics?.record(_);}}ST.target=null;ST.targetOcc=null;ST.targetKey=null;ST.casts=[];}
// [VI dòng gốc 374] Chú thích gốc của tác giả; không được thực thi. Nội dung: Đổi đối tượng theo dõi theo ID, loại Boss và map, kể cả khi game tái sử dụng cùng object.
  // Đổi đối tượng theo dõi theo ID, loại Boss và map, kể cả khi game tái sử dụng cùng object.
// [VI dòng gốc 375] Định nghĩa hàm listen; tham số: t | Khai báo biến không gán lại bằng const: targetKey = tính biểu thức identity(t)+'/'+String(prop(t,'occ'))+'/'+scene() | Kiểm tra t===ST.target&&targetKey===ST.targetKey: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  function listen(t){const targetKey=identity(t)+'/'+String(prop(t,'occ'))+'/'+scene();if(t===ST.target&&targetKey===ST.targetKey)return;unlisten();if(!eligible(t))return;ST.target=t;ST.targetKey=targetKey;ST.positionSample=null;ST.positionRetries=0;ST.positionOffset=0;ST.positionCommands=0;ST.positionPause=null;ST.positionRecovery=0;ST.arrivalSample=null;ST.arrivalSnap=false;ST.basicImpactSerial=null;ST.lastInvocation=-Infinity;ST.skillCursor=0;ST.moveGoal=null;ST.lastMove=-Infinity;ST.positioning=true;ST.lastOwnerPhase=null;burst.nextAt=0;if(basicProbe.context!==targetKey){mixed.primaryStreak=0;mixed.rotationCursor=0;mixed.wantBasic=mixed.primary&&(mixed.hitQuota===null||mixed.confirmedSinceTH<mixed.hitQuota);mixed.suspended=false;mixed.unconfirmed=0;mixed.ready.clear();hitDiagnostics.received=0;hitDiagnostics.accepted=0;hitDiagnostics.rejected={};hitDiagnostics.recent=[];mixed.attempts=0;mixed.hits=0;mixed.damage=0;mixed.examples=[];basicProbe.context=targetKey;basicProbe.attempts=0;basicProbe.hits=0;basicProbe.damage=0;basicProbe.startedAt=null;basicProbe.nextAt=0;}ST.targetOcc=Number(prop(t,'occ'));metrics?.open({key:targetKey,bossId:identity(t),bossName:String(prop(t,'name')??''),actor:actorId,occ:ST.targetOcc,scene:scene()});try{t.on?.(1012,ST.owner,onHit);}catch(e){ST.lastError='listen: '+String(e);}}
// [VI dòng gốc 376] Chú thích gốc của tác giả; không được thực thi. Nội dung: Gắn các hook vào thành phần hiện tại; giữ thông tin sở hữu để nhận diện thay đổi từ bên ngoài.
  // Gắn các hook vào thành phần hiện tại; giữ thông tin sở hữu để nhận diện thay đổi từ bên ngoài.
// [VI dòng gốc 377] Chú thích gốc của tác giả; không được thực thi. Nội dung: Thử nhịp chọn đòn thường trên bản sao; dữ liệu native gốc và cổng animation vẫn giữ nguyên.
  // Thử nhịp chọn đòn thường trên bản sao; dữ liệu native gốc và cổng animation vẫn giữ nguyên.
// [VI dòng gốc 378] Định nghĩa hàm selectBasic; tham số: native, selector, all, mode, occ, d
  function selectBasic(native,selector,all,mode,occ,d){
// [VI dòng gốc 379] Khai báo biến không gán lại bằng const: now = gọi Date.now(); trial = mixed.enabled và chỉ đánh giá vế phải khi vế trái truthy: mixed.basicPaceMs!==null
    const basicWait=tqFive?.active()?tqFive.wait():mixed.basicPaceMs,now=Date.now(),trial=(tqFive?.active()||mixed.enabled)&&basicWait!==null;
// [VI dòng gốc 380] Khai báo biến không gán lại bằng const: rotation = nếu rangeTest?.status==='running' thì lấy [], ngược lại lấy basicRotation(); order = gọi rotation.slice(mixed.rotationCursor).concat(rotation.slice(0,mixed.rotationCursor))
    const rotation=rangeTest?.status==='running'?[]:basicRotation(),order=rotation.slice(mixed.rotationCursor).concat(rotation.slice(0,mixed.rotationCursor));
    const basicFallback=(a,b)=>{
      if(basicSolo4100Active()&&rangeTest?.status!=='running'){
        const ai=basicSolo4100Prior.indexOf(Number(a[0])),bi=basicSolo4100Prior.indexOf(Number(b[0]));
        if(ai!==bi&&ai>=0&&bi>=0)return ai-bi;
      }
      return rotation.length?order.indexOf(Number(a[0]))-order.indexOf(Number(b[0])):Number(a[0])-Number(b[0]);
    };
// [VI dòng gốc 381] Khai báo biến không gán lại bằng const: rows = gọi all.filter(row=>isBasic(row?.[0])&&(!mixed.primary||(rotation.length?rotation.includes(Number(row[0])):Number(row[0])===primaryBasicId()))&&allowed(Number(row[0]),occ,d)&&Number.is…((a,b)=>rotation.length?order.indexOf(Number(a[0]))-order.indexOf(Number(b[0])):Number(stats(occ,Number(b[0])).hits>0)-Nu…) để sắp xếp mảng tại chỗ
    const rows=all.filter(row=>isBasic(row?.[0])&&(!mixed.primary||(rotation.length?rotation.includes(Number(row[0])):Number(row[0])===primaryBasicId()))&&allowed(Number(row[0]),occ,d)&&Number.isFinite(Number(row[1]))&&(!basicSolo4100Active()||Number(row[1])<now))
// [VI dòng gốc 382] Kiểm tra !trial: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: row. | Khai báo biến không gán lại bằng const: id = gọi Number(row[0]) để chuyển sang số; copy = gọi row.slice() để lấy một đoạn dữ liệu
      .map(row=>{if(!trial)return row;const id=Number(row[0]),copy=row.slice();
// [VI dòng gốc 383] Kiểm tra !mixed.ready.has(id): đúng thì chạy nhánh sau if. | gọi mixed.ready.set(id, Number(row[1])<now?0:now+Math.min(mixed.basicPaceMs,Math.max(0,Number(row[1])-now)))
        if(!mixed.ready.has(id))mixed.ready.set(id,Number(row[1])<now?0:now+Math.min(basicWait,Math.max(0,Number(row[1])-now)));
// [VI dòng gốc 384] gán copy[1] bằng mixed.ready.get(id) | gán copy[2] bằng mixed.basicPaceMs | Kết thúc hàm hiện tại và trả về: copy.
        copy[1]=mixed.ready.get(id);copy[2]=basicWait;return copy;})
// [VI dòng gốc 385] Định nghĩa hàm hàm không đặt tên; tham số: row
      .filter(row=>Number(row[1])<now)
// [VI dòng gốc 386] Định nghĩa hàm hàm không đặt tên; tham số: a, b
      .sort((a,b)=>{
        if(thGap.picking){const best=strongestThGapBasic();if(best!==null){const ap=Number(a[0])===best,bp=Number(b[0])===best;if(ap!==bp)return ap?-1:1;}}
        return basicSolo4100Active()?basicFallback(a,b):rotation.length?order.indexOf(Number(a[0]))-order.indexOf(Number(b[0])):Number(stats(occ,Number(b[0])).hits>0)-Number(stats(occ,Number(a[0])).hits>0);
      });
    if(cosmicActive()&&!thGap.picking)cosmicRank(rows,'basic',basicFallback);
// [VI dòng gốc 387] Khai báo biến không gán lại bằng const: id = gọi Number(native.call(selector,rows,[],mode)) để chuyển sang số
    const id=Number(native.call(selector,rows,[],mode));
// [VI dòng gốc 388] Kiểm tra trial&&isBasic(id): đúng thì chạy nhánh sau if. | Khai báo biến không gán lại bằng const: picked = gọi rows.find(row=>Number(row[0])===id) để tìm phần tử đầu tiên thỏa điều kiện | Kiểm tra picked: đúng thì chạy nhánh sau if. | gọi mixed.ready.set(id, Math.max(now+mixed.basicPaceMs,Number(picked[1])||0))
    if(trial&&isBasic(id)){const picked=rows.find(row=>Number(row[0])===id);if(picked)mixed.ready.set(id,Math.max(now+basicWait,Number(picked[1])||0));}
// [VI dòng gốc 389] Kết thúc hàm hiện tại và trả về: id.
    return id;
// [VI dòng gốc 390] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 391] Định nghĩa hàm bind; tham số: r | gọi W.KVPV_BASIC10?.release() để nhả quyền điều khiển đang giữ (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | Kiểm tra ST.s?.obj===r.s&&ST.c?.obj===r.c&&r.s?._f7t===ST.s.fn&&r.c?.combat===ST.c.fn: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: true.
  function bind(r){W.KVPV_BASIC10?.release?.();if(ST.s?.obj===r.s&&ST.c?.obj===r.c&&r.s?._f7t===ST.s.fn&&r.c?.combat===ST.c.fn)return true;
// [VI dòng gốc 392] Kiểm tra ST.s?.obj===r.s&&ST.c?.obj===r.c: đúng thì chạy nhánh sau if.
    if(ST.s?.obj===r.s&&ST.c?.obj===r.c){
// [VI dòng gốc 393] Chú thích gốc của tác giả; không được thực thi. Nội dung: HitRun temporarily wraps our function while dodging/healing. Keep that
      // HitRun temporarily wraps our function while dodging/healing. Keep that
// [VI dòng gốc 394] Chú thích gốc của tác giả; không được thực thi. Nội dung: exact chain intact; rewrapping it would multiply attempts each scan.
      // exact chain intact; rewrapping it would multiply attempts each scan.
// [VI dòng gốc 395] Kiểm tra r.s?._f7t===ST.s.fn&&r.c?.combat?.__KVPV_GUARD_PARENT===ST.c.fn: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: true.
      if(r.s?._f7t===ST.s.fn&&r.c?.combat?.__KVPV_GUARD_PARENT===ST.c.fn)return true;
// [VI dòng gốc 396] gán ST.lastError bằng 'Unexpected external skill/combat hook; refresh before resuming' | Kết thúc hàm hiện tại và trả về: false.
      ST.lastError='Unexpected external skill/combat hook; refresh before resuming';return false;
// [VI dòng gốc 397] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 398] gọi unbind()
    unbind();
// [VI dòng gốc 399] gọi attachDispatch(r.a)
    attachDispatch(r.a);
// [VI dòng gốc 400] Khai báo biến không gán lại bằng const: s = gọi hook(r.s, '_f7t', native=>function(active,common,mode){ if(CFG.basicOnly&&ST.running&&this===r.s&&(W.KVPV_FAR_SCOPE??W.KVPV_T…)
    const s=hook(r.s,'_f7t',native=>function(active,common,mode){
      if(tqFive?.active()&&ST.running&&this===r.s){
        if(mode!==1||!eligible(r.c?.target)||!castReady()||!(thGap.picking?thGapNativeReady(r.c):nativeReady(r.c))||Date.now()-ST.lastInvocation<currentPace())return -1;
        const all=[...(Array.isArray(active)?active:[]),...(Array.isArray(common)?common:[])],occ=Number(prop(r.c.target,'occ')),d=radius(r.a,r.c.target);
        const pickBasic=()=>selectBasic(native,this,all,mode,occ,d);
        if(basicSolo4100Active()||!tqFive.allowsTuyetHoc()||thGap.picking)return pickBasic();
        const roster=skillNames().map(x=>x.id).filter(id=>id>=1001&&id<=1008),offset=roster.length?ST.skillCursor%roster.length:0,order=roster.slice(offset).concat(roster.slice(0,offset));
        const pickTH=()=>Number(native.call(this,cosmicRank(all.filter(row=>Number(row?.[0])>=1001&&Number(row?.[0])<=1008&&Number.isFinite(Number(row[1]))&&Number(row[1])<Date.now()&&allowed(Number(row[0]),occ,d)),'th',(a,b)=>order.indexOf(Number(a[0]))-order.indexOf(Number(b[0]))),[],mode));
        if(pilot4100THOnly())return pickTH();
        const first=mixed.wantBasic?pickBasic:pickTH,second=mixed.wantBasic?pickTH:pickBasic,id=first();return isBasic(id)||id>=1001&&id<=1008?id:second();
      }
// [VI dòng gốc 401] Kiểm tra CFG.basicOnly&&ST.running&&this===r.s&&(W.KVPV_FAR_SCOPE??W.KVPV_TQ_SCOPE)?.inside?.()!==false: đúng thì chạy nhánh sau if.
      if(CFG.basicOnly&&ST.running&&this===r.s&&(W.KVPV_FAR_SCOPE??W.KVPV_TQ_SCOPE)?.inside?.()!==false){
// [VI dòng gốc 402] Kiểm tra !eligible(r.c?.target)||!(towerFinish()?canFight():castReady())||!nativeReady(r.c): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: áp dụng toán tử - lên 1.
        if(!eligible(r.c?.target)||!(towerFinish()?canFight():castReady())||!nativeReady(r.c))return -1;
// [VI dòng gốc 403] Khai báo biến không gán lại bằng const: rows = gọi [...(Array.isArray(active)?active:[]),...(Array.isArray(common)?common:[])].filter(row=>Number(row?.[0])===8001) để giữ phần tử thỏa điều kiện
        const rows=[...(Array.isArray(active)?active:[]),...(Array.isArray(common)?common:[])].filter(row=>Number(row?.[0])===8001);
// [VI dòng gốc 404] Kết thúc hàm hiện tại và trả về: gọi selectBasic(native, this, rows, mode, Number(prop(r.c.target,'occ')), radius(r.a,r.c.target)).
        return selectBasic(native,this,rows,mode,Number(prop(r.c.target,'occ')),radius(r.a,r.c.target));
// [VI dòng gốc 405] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
      }
// [VI dòng gốc 406] Kiểm tra ST.running&&this===r.s&&(W.KVPV_FAR_SCOPE??W.KVPV_TQ_SCOPE)?.inside?.()!==false&&Date.now()-ST.lastTHAt<CFG.afterTHWaitMs: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: áp dụng toán tử - lên 1.
      if(ST.running&&this===r.s&&(W.KVPV_FAR_SCOPE??W.KVPV_TQ_SCOPE)?.inside?.()!==false&&Date.now()-ST.lastTHAt<CFG.afterTHWaitMs)return -1;
// [VI dòng gốc 407] Kiểm tra ST.running&&this===r.s&&towerFinish()&&canFight(): đúng thì chạy nhánh sau if.
      if(ST.running&&this===r.s&&towerFinish()&&canFight()){
// [VI dòng gốc 408] Khai báo biến không gán lại bằng const: filter = tạo hàm với tham số rows; mỗi lần gọi trả về nếu Array.isArray(rows) thì lấy rows.filter(row=>isBasic(row?.[0])?selectedBasic(row[0]):basicQuotaSatisfied(row[0])), ngược lại lấy rows
        const filter=rows=>Array.isArray(rows)?rows.filter(row=>isBasic(row?.[0])?selectedBasic(row[0]):mixed.hitQuota===null||Number(row[0])<1001||Number(row[0])>1008||mixed.confirmedSinceTH>=mixed.hitQuota):rows;
// [VI dòng gốc 409] Kết thúc hàm hiện tại và trả về: gọi native.call(this, filter(active), filter(common), mode).
        return native.call(this,filter(active),filter(common),mode);
// [VI dòng gốc 410] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
      }
// [VI dòng gốc 411] Kiểm tra ST.running&&this===r.s&&mode===2&&W.KVPV_TRANSFORM10&&(W.KVPV_FAR_SCOPE??W.KVPV_TQ_SCOPE)?.inside?.()!==false: đúng thì chạy nhánh sau if.
      if(ST.running&&this===r.s&&mode===2&&W.KVPV_TRANSFORM10&&(W.KVPV_FAR_SCOPE??W.KVPV_TQ_SCOPE)?.inside?.()!==false){
// [VI dòng gốc 412] Kiểm tra !eligible(r.c?.target)||!castReady()||!nativeReady(r.c)||((pacer||scopedCombat()||tqFive?.active())&&Date.now()-ST.lastInvocation<currentPace()): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: áp dụng toán tử - lên 1.
        if(!eligible(r.c?.target)||!castReady()||!nativeReady(r.c)||((pacer||scopedCombat()||tqFive?.active())&&Date.now()-ST.lastInvocation<currentPace()))return -1;
// [VI dòng gốc 413] Khai báo biến không gán lại bằng const: occ = gọi Number(prop(r.c.target,'occ')) để chuyển sang số; dist = gọi radius(r.a, r.c.target)
        const occ=Number(prop(r.c.target,'occ')),dist=radius(r.a,r.c.target);
// [VI dòng gốc 414] Khai báo biến không gán lại bằng const: filter = tạo hàm với tham số rows; mỗi lần gọi trả về gọi (Array.isArray(rows)?rows:[]).filter(row=>allowed(Number(row?.[0]),occ,dist)) để giữ phần tử thỏa điều kiện
        const filter=rows=>(Array.isArray(rows)?rows:[]).filter(row=>allowed(Number(row?.[0]),occ,dist));
// [VI dòng gốc 415] Kết thúc hàm hiện tại và trả về: gọi W.KVPV_TRANSFORM10.select(native, this, filter(active), filter(common), mode).
        return W.KVPV_TRANSFORM10.select(native,this,filter(active),filter(common),mode);
// [VI dòng gốc 416] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
      }
// [VI dòng gốc 417] Kiểm tra !ST.running||this!==r.s||mode!==1||(W.KVPV_FAR_SCOPE??W.KVPV_TQ_SCOPE)?.inside?.()===false: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: gọi native.apply(this, arguments).
      if(!ST.running||this!==r.s||mode!==1||(W.KVPV_FAR_SCOPE??W.KVPV_TQ_SCOPE)?.inside?.()===false)return native.apply(this,arguments);
// [VI dòng gốc 418] Kiểm tra !eligible(r.c?.target)||!Array.isArray(active): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: áp dụng toán tử - lên 1.
      if(!eligible(r.c?.target)||!Array.isArray(active))return -1;
// [VI dòng gốc 419] Kiểm tra probeActive()&&!basicProbe.dispatch: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: áp dụng toán tử - lên 1.
      if(probeActive()&&!basicProbe.dispatch)return -1;
// [VI dòng gốc 420] Kiểm tra basicProbe.dispatch||mixed.enabled&&!mixed.suspended&&mixed.wantBasic: đúng thì chạy nhánh sau if.
      if(basicProbe.dispatch||mixed.enabled&&!mixed.suspended&&mixed.wantBasic&&(skillPriority==='interleaved'||rangeTest?.status==='running')){
// [VI dòng gốc 421] Kiểm tra !castReady()||!nativeReady(r.c): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: áp dụng toán tử - lên 1.
        if(!castReady()||!nativeReady(r.c))return -1;
// [VI dòng gốc 422] Khai báo biến không gán lại bằng const: occ = gọi Number(prop(r.c.target,'occ')) để chuyển sang số; d = gọi radius(r.a, r.c.target)
        const occ=Number(prop(r.c.target,'occ')),d=radius(r.a,r.c.target);
// [VI dòng gốc 423] Khai báo biến không gán lại bằng const: picked = gọi selectBasic(native, this, [...active,...(Array.isArray(common)?common:[])], mode, occ, d)
        const picked=selectBasic(native,this,[...active,...(Array.isArray(common)?common:[])],mode,occ,d);
// [VI dòng gốc 424] Kiểm tra basicProbe.dispatch||isBasic(picked): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: picked.
        if(basicProbe.dispatch||isBasic(picked))return picked;
// [VI dòng gốc 425] Chú thích gốc của tác giả; không được thực thi. Nội dung: Đánh thường chưa sẵn sàng: vẫn cho Tuyệt Học tiếp tục, không đứng chờ.
        // Đánh thường chưa sẵn sàng: vẫn cho Tuyệt Học tiếp tục, không đứng chờ.
// [VI dòng gốc 426] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
      }
// [VI dòng gốc 427] Khai báo biến không gán lại bằng const: dist = gọi radius(r.a, r.c.target); occ = gọi Number(prop(r.c.target,'occ')) để chuyển sang số
      const dist=radius(r.a,r.c.target),occ=Number(prop(r.c.target,'occ'));
// [VI dòng gốc 428] Kiểm tra !castReady()||(!burst.dispatch&&!nativeReady(r.c))||!outside(dist)||((pacer||scopedCombat()||tqFive?.active())&&!burst.dispatch&&Date.now()-ST.lastInvocation<currentPace()): đúng thì chạy nhánh sau if. | tăng ST.skillWaits một đơn vị sau khi lấy giá trị | Kết thúc hàm hiện tại và trả về: áp dụng toán tử - lên 1.
      if(!castReady()||(!burst.dispatch&&!nativeReady(r.c))||!outside(dist)||((pacer||scopedCombat()||tqFive?.active())&&!burst.dispatch&&Date.now()-ST.lastInvocation<currentPace())){ST.skillWaits++;return -1;}
// [VI dòng gốc 429] Khai báo biến không gán lại bằng const: filter = tạo hàm với tham số rows; mỗi lần gọi trả về nếu Array.isArray(rows) thì lấy rows.filter(x=>!isBasic(x?.[0])&&allowed(Number(x?.[0]),occ,dist)&&(!burst.dispatch||(Number(x[0])===burst.desired&&Number.isFinite(Number(x[1]))&&Number(x[1])<Date.now()))), ngược lại lấy []
      const filter=rows=>Array.isArray(rows)?rows.filter(x=>!isBasic(x?.[0])&&allowed(Number(x?.[0]),occ,dist)&&(!burst.dispatch||(Number(x[0])===burst.desired&&Number.isFinite(Number(x[1]))&&Number(x[1])<Date.now()))):[];
// [VI dòng gốc 430] Chú thích gốc của tác giả; không được thực thi. Nội dung: Rotate the original native rows so SCAN exercises the whole ready kit.
      // Rotate the original native rows so SCAN exercises the whole ready kit.
// [VI dòng gốc 431] Chú thích gốc của tác giả; không được thực thi. Nội dung: Rows and their cooldown timestamps are never copied or rewritten.
      // Rows and their cooldown timestamps are never copied or rewritten.
// [VI dòng gốc 432] Khai báo biến không gán lại bằng const: roster = gọi skillNames().map(x=>x.id) để biến đổi từng phần tử; offset = nếu roster.length thì lấy ST.skillCursor%roster.length, ngược lại lấy 0
      const roster=skillNames().map(x=>x.id),offset=roster.length?ST.skillCursor%roster.length:0;
// [VI dòng gốc 433] Khai báo biến không gán lại bằng const: order = gọi roster.slice(offset).concat(roster.slice(0,offset))
      const order=roster.slice(offset).concat(roster.slice(0,offset));
// [VI dòng gốc 434] Khai báo biến không gán lại bằng const: tower = gọi ['LINH_LUNG','PHU_VAN','TRU_TIEN'].includes(W.KVPV_FAR_SCOPE?.status?.().kind) để kiểm tra dữ liệu có chứa giá trị; fairTurn = tính biểu thức ST.castAttempts%4===0
      const tower=['LINH_LUNG','PHU_VAN','TRU_TIEN'].includes(W.KVPV_FAR_SCOPE?.status?.().kind),fairTurn=ST.castAttempts%4===0;
// [VI dòng gốc 435] Khai báo biến không gán lại bằng const: score = tạo hàm với tham số id | Khai báo biến không gán lại bằng const: m = gọi stats(occ, Number(id)) | Kết thúc hàm hiện tại và trả về: nếu m.hits>=2 thì lấy m.damage/m.hits, ngược lại lấy 0.
      const score=id=>{const m=stats(occ,Number(id));return m.hits>=2?m.damage/m.hits:0;};
// [VI dòng gốc 436] Khai báo biến không gán lại bằng const: ranked = tạo hàm với tham số rows; mỗi lần gọi trả về gọi filter(rows).sort((a,b)=>{ if(tower&&!mixed.enabled&&!fairTurn){const delta=score(b[0])-score(a[0]);if(delta)return delta;} return order.i…) để sắp xếp mảng tại chỗ
      const ranked=rows=>filter(rows).sort((a,b)=>{
// [VI dòng gốc 437] Kiểm tra tower&&!mixed.enabled&&!fairTurn: đúng thì chạy nhánh sau if. | Khai báo biến không gán lại bằng const: delta = tính biểu thức score(b[0])-score(a[0]) | Kiểm tra delta: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: delta.
        if((skillPriority==='tuyet_hoc_first'||tower&&!mixed.enabled)&&!fairTurn){const delta=score(b[0])-score(a[0]);if(delta)return delta;}
// [VI dòng gốc 438] Kết thúc hàm hiện tại và trả về: tính biểu thức order.indexOf(Number(a[0]))-order.indexOf(Number(b[0])).
        return order.indexOf(Number(a[0]))-order.indexOf(Number(b[0]));
// [VI dòng gốc 439] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
      });
// [VI dòng gốc 440] Khai báo biến không gán lại bằng const: picked = gọi Number(native.call(this,ranked(active),ranked(common),mode)) để chuyển sang số
      const picked=Number(native.call(this,ranked(active),ranked(common),mode));
// [VI dòng gốc 441] Kiểm tra allowed(picked,occ,dist): đúng thì chạy nhánh sau if. | gọi ST.seen.add(picked) | Kết thúc hàm hiện tại và trả về: picked.
      if(allowed(picked,occ,dist)){ST.seen.add(picked);return picked;}
// [VI dòng gốc 442] Kiểm tra mixed.enabled&&!mixed.suspended&&nativeReady(r.c): đúng thì chạy nhánh sau if.
      if(mixed.enabled&&!mixed.suspended&&nativeReady(r.c)){
// [VI dòng gốc 443] Khai báo biến không gán lại bằng const: basic = gọi selectBasic(native, this, [...active,...(Array.isArray(common)?common:[])], mode, occ, dist) | Kiểm tra isBasic(basic): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: basic.
        const basic=selectBasic(native,this,[...active,...(Array.isArray(common)?common:[])],mode,occ,dist);if(isBasic(basic))return basic;
// [VI dòng gốc 444] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
      }
// [VI dòng gốc 445] tăng ST.skillWaits một đơn vị sau khi lấy giá trị | Kết thúc hàm hiện tại và trả về: áp dụng toán tử - lên 1.
      ST.skillWaits++;return -1;
// [VI dòng gốc 446] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    });
// [VI dòng gốc 447] Kiểm tra !s: đúng thì chạy nhánh sau if. | gán ST.lastError bằng 'Selector hook unavailable' | Kết thúc hàm hiện tại và trả về: false.
    if(!s){ST.lastError='Selector hook unavailable';return false;}
// [VI dòng gốc 448] Khai báo biến không gán lại bằng const: c = gọi hook(r.c, 'combat', native=>function(skillId){ if(CFG.basicOnly&&ST.running&&this===r.c&&(W.KVPV_FAR_SCOPE??W.KVPV_TQ_SCOPE)?…)
    const c=hook(r.c,'combat',native=>function(skillId){
      if(ST.running&&this===r.c&&basicSolo4100Active()&&Number(skillId)>=1001&&Number(skillId)<=1008){basicSolo4100.blockedTH++;ST.blocked++;return undefined;}
      if(ST.running&&this===r.c&&Number(skillId)===1008&&trial1008?.blocks(skillId))return undefined;
// [VI dòng gốc 449] Kiểm tra CFG.basicOnly&&ST.running&&this===r.c&&(W.KVPV_FAR_SCOPE??W.KVPV_TQ_SCOPE)?.inside?.()!==false&&Number(skillId)!==8001: đúng thì chạy nhánh sau if. | tăng ST.blocked một đơn vị sau khi lấy giá trị | Kết thúc hàm hiện tại và trả về: undefined.
      if(CFG.basicOnly&&!tqFive?.active()&&ST.running&&this===r.c&&(W.KVPV_FAR_SCOPE??W.KVPV_TQ_SCOPE)?.inside?.()!==false&&Number(skillId)!==8001){ST.blocked++;return undefined;}
// [VI dòng gốc 450] Kiểm tra ST.running&&this===r.c&&(W.KVPV_FAR_SCOPE??W.KVPV_TQ_SCOPE)?.inside?.()!==false&&Date.now()-ST.lastTHAt<CFG.afterTHWaitMs: đúng thì chạy nhánh sau if. | tăng ST.blocked một đơn vị sau khi lấy giá trị | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      if(ST.running&&this===r.c&&(W.KVPV_FAR_SCOPE??W.KVPV_TQ_SCOPE)?.inside?.()!==false&&Date.now()-ST.lastTHAt<CFG.afterTHWaitMs){ST.blocked++;return;}
// [VI dòng gốc 451] Kiểm tra ST.running&&this===r.c&&(W.KVPV_FAR_SCOPE??W.KVPV_TQ_SCOPE)?.inside?.()!==false&&isBasic(skillId)&&!selectedBasic(skillId): đúng thì chạy nhánh sau if. | tăng ST.blocked một đơn vị sau khi lấy giá trị | Kết thúc hàm hiện tại và trả về: undefined.
      if(ST.running&&this===r.c&&(W.KVPV_FAR_SCOPE??W.KVPV_TQ_SCOPE)?.inside?.()!==false&&isBasic(skillId)&&!selectedBasic(skillId)){ST.blocked++;return undefined;}
// [VI dòng gốc 452] Kiểm tra ST.running&&this===r.c&&towerFinish()&&canFight(): đúng thì chạy nhánh sau if.
      if(ST.running&&this===r.c&&towerFinish()&&canFight()){
// [VI dòng gốc 453] Khai báo biến không gán lại bằng const: id = gọi Number(skillId) để chuyển sang số
        const id=Number(skillId);
// [VI dòng gốc 454] Kiểm tra mixed.hitQuota!==null: đúng thì chạy nhánh sau if.
        if(mixed.hitQuota!==null){
// [VI dòng gốc 455] Kiểm tra id>=1001&&id<=1008&&mixed.confirmedSinceTH<mixed.hitQuota: đúng thì chạy nhánh sau if. | tăng ST.blocked một đơn vị sau khi lấy giá trị | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
          if(id>=1001&&id<=1008&&mixed.confirmedSinceTH<mixed.hitQuota){ST.blocked++;return;}
// [VI dòng gốc 456] Kiểm tra id===8001: đúng thì chạy nhánh sau if. | gọi expire() | Kiểm tra ST.casts.some(c=>!c.used&&basicPendingBlocks(c)&&c.id===id&&c.targetId===identity(this.target)&&Date.now()-c.time<=CFG.castTtlMs): đúng thì chạy nhánh sau if. | tăng ST.blocked một đơn vị sau khi lấy giá trị
          if(id===8001){expire();if(ST.casts.some(c=>!c.used&&basicPendingBlocks(c)&&c.id===id&&c.targetId===identity(this.target)&&Date.now()-c.time<=CFG.castTtlMs)){ST.blocked++;return;}
// [VI dòng gốc 457] tăng ST.castAttempts một đơn vị sau khi lấy giá trị | tăng mixed.attempts một đơn vị sau khi lấy giá trị | gọi ST.casts.push({serial:ST.castAttempts,id,occ:Number(prop(this.target,'occ')),targetId:identity(this.target),scene:scene(),time:Date.no…) để thêm phần tử vào cuối mảng
            ST.castAttempts++;mixed.attempts++;ST.casts.push({serial:ST.castAttempts,id,occ:Number(prop(this.target,'occ')),targetId:identity(this.target),scene:scene(),time:Date.now(),distance:radius(r.a,this.target),used:false,basicTrial:true,mixedBasic:true,finishBasic:true});}
// [VI dòng gốc 458] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
        }
// [VI dòng gốc 459] Kết thúc hàm hiện tại và trả về: gọi invokeNative(native, this, arguments).
        return invokeNative(native,this,arguments);
// [VI dòng gốc 460] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
      }
// [VI dòng gốc 461] Kiểm tra ST.running&&this===r.c&&(W.KVPV_FAR_SCOPE??W.KVPV_TQ_SCOPE)?.inside?.()!==false: đúng thì chạy nhánh sau if.
      if(ST.running&&this===r.c&&(W.KVPV_FAR_SCOPE??W.KVPV_TQ_SCOPE)?.inside?.()!==false){
// [VI dòng gốc 462] Khai báo biến không gán lại bằng const: id = gọi Number(skillId) để chuyển sang số; occ = gọi Number(prop(this.target,'occ')) để chuyển sang số; d = gọi radius(r.a, this.target)
        const id=Number(skillId),occ=Number(prop(this.target,'occ')),d=radius(r.a,this.target);
        const gapBasic=thGap.picking&&isBasic(id)&&id<=8005&&thGapActive(this)&&thGapNativeReady(this);
// [VI dòng gốc 463] Kiểm tra (probeActive()&&!basicProbe.dispatch)||!eligible(this.target)||!castReady()||(!burst.dispatch&&!nativeReady(this))||!allowed(id,occ,d)||!outside(d)||((pacer||scopedCombat()||tqFive?.active())&&!burs…: đúng thì chạy nhánh sau if. | tăng ST.blocked một đơn vị sau khi lấy giá trị | Kết thúc hàm hiện tại và trả về: undefined.
        if((probeActive()&&!basicProbe.dispatch)||!eligible(this.target)||!castReady()||(!burst.dispatch&&!gapBasic&&!nativeReady(this))||!allowed(id,occ,d)||!outside(d)||((pacer||scopedCombat()||tqFive?.active())&&!burst.dispatch&&Date.now()-ST.lastInvocation<currentPace())){ST.blocked++;return undefined;}
// [VI dòng gốc 464] Kiểm tra animationPlaying(this)&&basicTailReady(): đúng thì chạy nhánh sau if. | tăng ST.basicTailReleases một đơn vị sau khi lấy giá trị
        if(animationPlaying(this)&&basicTailReady())ST.basicTailReleases++;
// [VI dòng gốc 465] gán ST.lastInvocation bằng Date.now()
        ST.lastInvocation=Date.now();
// [VI dòng gốc 466] Khai báo biến không gán lại bằng const: roster = gọi skillNames().map(x=>x.id) để biến đổi từng phần tử | Kiểm tra !isBasic(id): đúng thì chạy nhánh sau if. | gán ST.skillCursor bằng Math.max(0,roster.indexOf(id)+1)
        const roster=skillNames().map(x=>x.id);if(!isBasic(id))ST.skillCursor=Math.max(0,roster.indexOf(id)+1);
// [VI dòng gốc 467] Kiểm tra mixed.enabled: đúng thì chạy nhánh sau if. | Khai báo biến không gán lại bằng const: order = gọi basicRotation() | Kiểm tra order.includes(id): đúng thì chạy nhánh sau if. | gán mixed.rotationCursor bằng (order.indexOf(id)+1)%order.length
        if(mixed.enabled){const order=basicRotation();if(order.includes(id))mixed.rotationCursor=(order.indexOf(id)+1)%order.length;mixed.primaryStreak=isBasic(id)?mixed.primaryStreak+1:0;mixed.wantBasic=(mixed.primary?(rangeTest?.status==='running'||(mixed.hitQuota!==null?mixed.confirmedSinceTH<mixed.hitQuota:mixed.primaryStreak<basicQuota())):!isBasic(id))&&!mixed.suspended;if(isBasic(id))mixed.attempts++;}
// [VI dòng gốc 468] gọi expire() | tăng stats(occ,id).attempts một đơn vị sau khi lấy giá trị | Kiểm tra basicProbe.dispatch: đúng thì chạy nhánh sau if. | tăng basicProbe.attempts một đơn vị sau khi lấy giá trị
        expire();stats(occ,id).attempts++;if(basicProbe.dispatch){basicProbe.attempts++;ST.lastReason='basic_probe_cast';}
// [VI dòng gốc 469] tăng ST.castAttempts một đơn vị sau khi lấy giá trị | gọi ST.casts.push({serial:ST.castAttempts,id,occ,targetId:identity(this.target),scene:scene(),time:Date.now(),distance:d,used:false,basicT…) để thêm phần tử vào cuối mảng
        ST.castAttempts++;ST.casts.push({serial:ST.castAttempts,id,occ,targetId:identity(this.target),scene:scene(),time:Date.now(),distance:d,used:false,basicTrial:basicProbe.dispatch||mixed.enabled&&isBasic(id),mixedBasic:mixed.enabled&&isBasic(id),burstSerial:burst.active?.serial??null,tuningEligible:!isBasic(id)&&!basicProbe.dispatch&&!burst.dispatch&&!transforming()&&verified(occ,id)});
// [VI dòng gốc 470] Kiểm tra tailStudy?.status==='running'&&[8001,8005].includes(id): đúng thì chạy nhánh sau if. | gán ST.casts.at(-1).tailPhase bằng tailStudy.phase | tăng tailStudy[tailStudy.phase].casts một đơn vị sau khi lấy giá trị
        if(tqFive?.active()&&isBasic(id)){ST.casts.at(-1).basicTrial=true;ST.casts.at(-1).mixedBasic=true;tqFive.cast(ST.castAttempts,id,d);mixed.rotationCursor=(tqFive.ids().indexOf(id)+1)%tqFive.ids().length;}
        if(tailStudy?.status==='running'&&[8001,8005].includes(id)){ST.casts.at(-1).tailPhase=tailStudy.phase;tailStudy[tailStudy.phase].casts++;}
// [VI dòng gốc 471] Kiểm tra rangeTest?.status==='running'&&rangeTest.rows[rangeTest.index]?.id===id: đúng thì chạy nhánh sau if. | gọi rangeTest.rows[rangeTest.index].attempts.push({serial:ST.castAttempts,bossId:identity(this.target),scene:scene(),occ,distance:d,at:Date.now()}) để thêm phần tử vào cuối mảng
        if(rangeTest?.status==='running'&&rangeTest.rows[rangeTest.index]?.id===id)rangeTest.rows[rangeTest.index].attempts.push({serial:ST.castAttempts,bossId:identity(this.target),scene:scene(),occ,distance:d,at:Date.now()});
// [VI dòng gốc 472] gọi metrics?.cast(ST.castAttempts, id, currentPace()) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
        metrics?.cast(ST.castAttempts,id,currentPace());
// [VI dòng gốc 473] Kiểm tra ST.casts.length>250: đúng thì chạy nhánh sau if. | gọi ST.casts.splice(0, ST.casts.length-250)
        if(ST.casts.length>250)ST.casts.splice(0,ST.casts.length-250);
// [VI dòng gốc 474] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
      }
// [VI dòng gốc 475] Kết thúc hàm hiện tại và trả về: gọi invokeNative(native, this, arguments).
      return invokeNative(native,this,arguments);
// [VI dòng gốc 476] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    });
// [VI dòng gốc 477] Kiểm tra !c: đúng thì chạy nhánh sau if. | gọi restore(s) | gán ST.lastError bằng 'Combat hook unavailable' | Kết thúc hàm hiện tại và trả về: false.
    if(!c){restore(s);ST.lastError='Combat hook unavailable';return false;}
// [VI dòng gốc 478] gán ST.s bằng s | gán ST.c bằng c
    ST.s=s;ST.c=c;
// [VI dòng gốc 479] Kiểm tra !guardMovement(r): đúng thì chạy nhánh sau if. | gọi unbind() | gán ST.lastError bằng 'Movement ownership unavailable' | Kết thúc hàm hiện tại và trả về: false.
    if(!guardMovement(r)){unbind();ST.lastError='Movement ownership unavailable';return false;}
// [VI dòng gốc 480] Kết thúc hàm hiện tại và trả về: true.
    return true;
// [VI dòng gốc 481] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 482] Chú thích gốc của tác giả; không được thực thi. Nội dung: Thực hiện một lượt kiểm tra của module; các nhánh bên dưới quyết định có đủ điều kiện để hành động hay phải chờ.
  // Thực hiện một lượt kiểm tra của module; các nhánh bên dưới quyết định có đủ điều kiện để hành động hay phải chờ.
// [VI dòng gốc 483] Định nghĩa hàm tick; tham số: không có. Mục đích: xử lý một nhịp kiểm tra | Kiểm tra !ST.running: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
  function tick(){if(!ST.running)return;cooldown4100Sync(role().c);localLogCleanupSync();trial1008?.sync();
    tqFive?.tick();
// [VI dòng gốc 484] gọi advanceSpeedTrial()
    advanceSpeedTrial();
// [VI dòng gốc 485] gán ST.lastTickAt bằng Date.now()
    ST.lastTickAt=Date.now();
// [VI dòng gốc 486] Chú thích gốc của tác giả; không được thực thi. Nội dung: Tab nền vẫn đánh, nhưng hạn chế đọc toàn bộ model ở mỗi callback để nhiều account đỡ tranh CPU.
    // Tab nền vẫn đánh, nhưng hạn chế đọc toàn bộ model ở mỗi callback để nhiều account đỡ tranh CPU.
// [VI dòng gốc 487] Khai báo biến không gán lại bằng const: gap = W.KVPV_ACCOUNT_POLICY?.pollingGap?.() hoặc dùng vế phải khi vế trái là null/undefined: W.document?.hidden?Number(W.KVPV_ACCOUNT_POLICY?.config?.backgroundTickMs)||50:0
    const gap=W.KVPV_ACCOUNT_POLICY?.pollingGap?.()??(W.document?.hidden?Number(W.KVPV_ACCOUNT_POLICY?.config?.backgroundTickMs)||50:0);
// [VI dòng gốc 488] Kiểm tra gap>0: đúng thì chạy nhánh sau if.
    if(gap>0){
// [VI dòng gốc 489] Khai báo biến không gán lại bằng const: now = gọi Date.now()
      const now=Date.now();
// [VI dòng gốc 490] Kiểm tra now-ST.lastBackgroundTick<gap: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại mà không trả giá trị cụ thể. | gán ST.lastBackgroundTick bằng now
      if(now-ST.lastBackgroundTick<gap)return;ST.lastBackgroundTick=now;
// [VI dòng gốc 491] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
    }
// [VI dòng gốc 492] gọi advanceTailStudy()
    advanceTailStudy();
// [VI dòng gốc 493] gọi advanceRangeTest()
    advanceRangeTest();
// [VI dòng gốc 494] Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài.
    try{
// [VI dòng gốc 495] Kiểm tra !canFight()||!atPosition(role()): đúng thì chạy nhánh sau if. | Duyệt từng giá trị trong ST.casts bằng const c. | Khai báo biến không gán lại bằng const: c (chưa gán giá trị) | Kiểm tra !c.used: đúng thì chạy nhánh sau if.
      if(!canFight()||!atPosition(role()))for(const c of ST.casts)if(!c.used){c.tuningEligible=false;c.metricsInterrupted=true;}
// [VI dòng gốc 496] gọi expire()
      expire();
// [VI dòng gốc 497] Kiểm tra String(W._Ba?._rJ?._O$?.ins?.actorId??'')!==actorId||W.__KVPV_UNIVERSAL_HALTED: đúng thì chạy nhánh sau if. | gọi stop('actor changed') để dừng bộ điều khiển và dọn tài nguyên | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      if(String(W._Ba?._rJ?._O$?.ins?.actorId??'')!==actorId||W.__KVPV_UNIVERSAL_HALTED){stop('actor changed');return;}
// [VI dòng gốc 498] Kiểm tra (W.KVPV_FAR_SCOPE??W.KVPV_TQ_SCOPE)?.inside?.()===false: đúng thì chạy nhánh sau if. | gọi releaseOutsideScope() | gán ST.lastReason bằng 'outside_tianquan_native_combat' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      if((W.KVPV_FAR_SCOPE??W.KVPV_TQ_SCOPE)?.inside?.()===false){releaseOutsideScope();ST.lastReason='outside_tianquan_native_combat';return;}
// [VI dòng gốc 499] Khai báo biến không gán lại bằng const: r = gọi role() | Kiểm tra !r.a||!r.s||!r.c||!r.m: đúng thì chạy nhánh sau if. | gán ST.lastReason bằng 'missing_components' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      const r=role();if(!r.a||!r.s||!r.c||!r.m){ST.lastReason='missing_components';return;}
// [VI dòng gốc 500] Khai báo biến không gán lại bằng const: owner = gọi combatOwner(); previousPhase = đọc ST.lastOwnerPhase
      const owner=combatOwner(),previousPhase=ST.lastOwnerPhase;
// [VI dòng gốc 501] gán ST.lastOwnerPhase bằng owner?.phase??'OFF'
      ST.lastOwnerPhase=owner?.phase??'OFF';
// [VI dòng gốc 502] Kiểm tra !bind(r): đúng thì chạy nhánh sau if. | gán ST.lastReason bằng 'hook_failed' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      if(!bind(r)){ST.lastReason='hook_failed';return;}
// [VI dòng gốc 503] Kiểm tra !eligible(r.c.target): đúng thì chạy nhánh sau if. | gọi unlisten() | gán ST.lastReason bằng 'not_tianquan_boss' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      if(!eligible(r.c.target)){unlisten();ST.lastReason='not_tianquan_boss';return;}
// [VI dòng gốc 504] Chú thích gốc của tác giả; không được thực thi. Nội dung: Khóa bối cảnh theo Boss thật, loại Boss, map và biến thân để không trộn nhịp học.
      // Khóa bối cảnh theo Boss thật, loại Boss, map và biến thân để không trộn nhịp học.
// [VI dòng gốc 505] gọi pacer?.context(identity(r.c.target)+'/'+String(prop(r.c.target,'occ'))+'/'+scene()+'/'+(transforming()?'transform':'native')) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
      pacer?.context(identity(r.c.target)+'/'+String(prop(r.c.target,'occ'))+'/'+scene()+'/'+(transforming()?'transform':'native'));
// [VI dòng gốc 506] Khai báo biến không gán lại bằng const: newPositionTarget = ST.target!==r.c.target hoặc dùng vế phải khi vế trái falsy: ST.targetKey!==identity(r.c.target)+'/'+String(prop(r.c.target,'occ'))+'/'+scene()
      const newPositionTarget=ST.target!==r.c.target||ST.targetKey!==identity(r.c.target)+'/'+String(prop(r.c.target,'occ'))+'/'+scene();
// [VI dòng gốc 507] gọi listen(r.c.target)
      listen(r.c.target);
      observeApexRhythm(ST.targetKey,prop(r.a,'hp')?.[0]);
      observePilot4100();
// [VI dòng gốc 508] Chú thích gốc của tác giả; không được thực thi. Nội dung: Khi nhận boss mới, bỏ đường áp sát còn sót; bộ giữ khoảng cách sẽ tự chọn đích 302.
      // Khi nhận boss mới, bỏ đường áp sát còn sót; bộ giữ khoảng cách sẽ tự chọn đích 302.
// [VI dòng gốc 509] Chú thích gốc của tác giả; không được thực thi. Nội dung: Chỉ nhận quyền di chuyển trong pha đánh, không can thiệp đường rút lui hồi máu.
      // Chỉ nhận quyền di chuyển trong pha đánh, không can thiệp đường rút lui hồi máu.
// [VI dòng gốc 510] Kiểm tra newPositionTarget&&((owner?.running&&owner.phase==='FIGHT'&&canFight())|| (!owner?.running&&W.KVPV_FAR_SCOPE?.status?.()?.kind==='THIEN_QUAN'&&W._Ba?._rJ?._O$?.ins?.isDead!==true)): đúng thì chạy nhánh sau if.
      if(newPositionTarget&&((owner?.running&&owner.phase==='FIGHT'&&canFight())||
// [VI dòng gốc 511] gọi W.KVPV_FAR_SCOPE?.status() để trả trạng thái để kiểm tra
        (!owner?.running&&W.KVPV_FAR_SCOPE?.status?.()?.kind==='THIEN_QUAN'&&W._Ba?._rJ?._O$?.ins?.isDead!==true))){
// [VI dòng gốc 512] gán ST.ownMove bằng true | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | gọi r.m.stop() để dừng bộ điều khiển và dọn tài nguyên (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gán ST.ownMove bằng false
        ST.ownMove=true;try{r.m.stop?.();}finally{ST.ownMove=false;}
// [VI dòng gốc 513] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
      }
// [VI dòng gốc 514] Kiểm tra towerFinish()&&canFight(): đúng thì chạy nhánh sau if.
      if(towerFinish()&&canFight()){
// [VI dòng gốc 515] gán ST.positioning bằng false | gán ST.moveGoal bằng null | gán ST.lastReason bằng 'dungeon_native_finish_2pct'
        ST.positioning=false;ST.moveGoal=null;ST.lastReason='dungeon_native_finish_2pct';
// [VI dòng gốc 516] Khai báo biến không gán lại bằng const: targetKey = tính biểu thức scene()+'/'+identity(r.c.target); a = gọi loc(r.a); b = gọi loc(r.c.target); d = gọi radius(r.a, r.c.target)
        const targetKey=scene()+'/'+identity(r.c.target),a=loc(r.a),b=loc(r.c.target),d=radius(r.a,r.c.target);
// [VI dòng gốc 517] Khai báo biến không gán lại bằng const: nativeRange = gọi Number(W._ft?._tY?.ins?.getCfgById?.(Number(prop(r.c.target,'occ')))?.[3]) để chuyển sang số
        const nativeRange=Number(W._ft?._tY?.ins?.getCfgById?.(Number(prop(r.c.target,'occ')))?.[3]);
// [VI dòng gốc 518] Kiểm tra ST.finishTarget!==targetKey&&a&&b&&d>0&&Number.isFinite(nativeRange)&&nativeRange>0: đúng thì chạy nhánh sau if.
        if(ST.finishTarget!==targetKey&&a&&b&&d>0&&Number.isFinite(nativeRange)&&nativeRange>0){
// [VI dòng gốc 519] gán ST.finishTarget bằng targetKey
          ST.finishTarget=targetKey;
// [VI dòng gốc 520] Kiểm tra d>nativeRange*.8: đúng thì chạy nhánh sau if.
          if(d>nativeRange*.8){
// [VI dòng gốc 521] Khai báo biến không gán lại bằng const: goal = tính biểu thức nativeRange*.8
            const goal=nativeRange*.8;
// [VI dòng gốc 522] gán ST.ownMove bằng true | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | gọi r.m.stop() để dừng bộ điều khiển và dọn tài nguyên (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gọi r.m.moveTo(b.x+(a.x-b.x)/d*goal, b.y+(a.y-b.y)/d*goal)
            ST.ownMove=true;try{r.m.stop?.();r.m.moveTo(b.x+(a.x-b.x)/d*goal,b.y+(a.y-b.y)/d*goal);ST.moves++;}
// [VI dòng gốc 523] gán ST.ownMove bằng false
            finally{ST.ownMove=false;}
// [VI dòng gốc 524] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
          }
// [VI dòng gốc 525] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
        }
// [VI dòng gốc 526] Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
        return;
// [VI dòng gốc 527] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
      }
// [VI dòng gốc 528] gán ST.finishTarget bằng null
      ST.finishTarget=null;
// [VI dòng gốc 529] Khai báo biến không gán lại bằng const: goal = gọi targetDistance()
      const goal=targetDistance();
// [VI dòng gốc 530] Kiểm tra goal===null: đúng thì chạy nhánh sau if. | gán ST.lastReason bằng 'waiting_verified_skill' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      if(goal===null){ST.lastReason='waiting_verified_skill';return;}
// [VI dòng gốc 531] Kiểm tra goal<=CFG.min: đúng thì chạy nhánh sau if. | gán ST.lastReason bằng 'goal_inside_boss_range' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      if(goal<=CFG.min){ST.lastReason='goal_inside_boss_range';return;}
// [VI dòng gốc 532] Khai báo biến không gán lại bằng const: hr = owner
      const hr=owner;
// [VI dòng gốc 533] Chú thích gốc của tác giả; không được thực thi. Nội dung: HitRun nắm quyền trong pha hồi máu/né: bộ giữ 302 không được phát lệnh tranh đường.
      // HitRun nắm quyền trong pha hồi máu/né: bộ giữ 302 không được phát lệnh tranh đường.
// [VI dòng gốc 534] Kiểm tra !hr?.running||hr.phase!=='FIGHT': đúng thì chạy nhánh sau if. | gán ST.basicImpactSerial bằng null | gán ST.positioning bằng false | gán ST.lastReason bằng 'hitrun_'+(hr?.phase||'off')
      if(!hr?.running||hr.phase!=='FIGHT'){ST.basicImpactSerial=null;ST.positioning=false;ST.lastReason='hitrun_'+(hr?.phase||'off');return;}
// [VI dòng gốc 535] Kiểm tra !canFight(): đúng thì chạy nhánh sau if. | gán ST.positioning bằng false | gán ST.lastReason bằng 'low_hp_or_disabled' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      if(!canFight()){ST.positioning=false;ST.lastReason='low_hp_or_disabled';return;}
// [VI dòng gốc 536] Chú thích gốc của tác giả; không được thực thi. Nội dung: Vừa hồi đầy: hủy đường chạy vòng còn sót, xóa đích cũ rồi bố trí lại trước khi đánh.
      // Vừa hồi đầy: hủy đường chạy vòng còn sót, xóa đích cũ rồi bố trí lại trước khi đánh.
// [VI dòng gốc 537] Kiểm tra previousPhase&&previousPhase!=='FIGHT': đúng thì chạy nhánh sau if.
      if(previousPhase&&previousPhase!=='FIGHT'){
// [VI dòng gốc 538] Chú thích gốc của tác giả; không được thực thi. Nội dung: HitRun releases guards at full HP but its last orbit path may still
        // HitRun releases guards at full HP but its last orbit path may still
// [VI dòng gốc 539] Chú thích gốc của tác giả; không được thực thi. Nội dung: be running. Cancel it and discard pre-recovery positioning state.
        // be running. Cancel it and discard pre-recovery positioning state.
// [VI dòng gốc 540] gán ST.ownMove bằng true | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | gọi r.m.stop() để dừng bộ điều khiển và dọn tài nguyên (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gán ST.ownMove bằng false
        ST.ownMove=true;try{r.m.stop?.();}finally{ST.ownMove=false;}
// [VI dòng gốc 541] gán ST.positionSample bằng null | gán ST.positionRetries bằng 0 | gán ST.positionOffset bằng 0 | gán ST.positionCommands bằng 0
        ST.positionSample=null;ST.positionRetries=0;ST.positionOffset=0;ST.positionCommands=0;ST.positionPause=null;ST.positionRecovery=0;ST.arrivalSample=null;ST.arrivalSnap=false;ST.moveGoal=null;ST.lastMove=-Infinity;ST.positioning=true;if(previousPhase==='RETREAT')ST.resumes++;
// [VI dòng gốc 542] Kiểm tra previousPhase==='RETREAT': đúng thì chạy nhánh sau if. | gọi metrics?.resume() (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
        if(previousPhase==='RETREAT')metrics?.resume();
// [VI dòng gốc 543] gọi note('RESUME', {from:previousPhase,bossId:identity(r.c.target),goal})
        note('RESUME',{from:previousPhase,bossId:identity(r.c.target),goal});
// [VI dòng gốc 544] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
      }
// [VI dòng gốc 545] Kiểm tra W.document?.hidden&&W.KVPV_ACCOUNT_POLICY?.config?.pauseWhenHidden===true: đúng thì chạy nhánh sau if. | gán ST.lastReason bằng 'hidden_tab' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      if(W.document?.hidden&&W.KVPV_ACCOUNT_POLICY?.config?.pauseWhenHidden===true){ST.lastReason='hidden_tab';return;}
// [VI dòng gốc 546] Khai báo biến không gán lại bằng const: a = gọi loc(r.a); b = gọi loc(r.c.target); d = gọi radius(r.a, r.c.target)
      const a=loc(r.a),b=loc(r.c.target),d=radius(r.a,r.c.target);
// [VI dòng gốc 547] gán ST.lastDistance bằng d==null?null:+d.toFixed(2)
      ST.lastDistance=d==null?null:+d.toFixed(2);
// [VI dòng gốc 548] Kiểm tra !a||!b||d==null: đúng thì chạy nhánh sau if. | gán ST.lastReason bằng 'unknown_position' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      if(!a||!b||d==null){ST.lastReason='unknown_position';return;}
// [VI dòng gốc 549] Chú thích gốc của tác giả; không được thực thi. Nội dung: Native path có thể dừng sát đích do làm tròn tọa độ. Chỉ nới 1 đơn vị
      // Native path có thể dừng sát đích do làm tròn tọa độ. Chỉ nới 1 đơn vị
// [VI dòng gốc 550] Chú thích gốc của tác giả; không được thực thi. Nội dung: khi đã có đường do module phát, actor/Boss đứng ổn định >=1s và vẫn >300.
      // khi đã có đường do module phát, actor/Boss đứng ổn định >=1s và vẫn >300.
// [VI dòng gốc 551] Chú thích gốc của tác giả; không được thực thi. Nội dung: Không nới STRICT vì tầm đó cần bằng chứng sát thương riêng.
      // Không nới STRICT vì tầm đó cần bằng chứng sát thương riêng.
// [VI dòng gốc 552] Khai báo biến không gán lại bằng const: snapCandidate = ST.mode==='SCAN'&&(ST.moveGoal||ST.arrivalSnap)&&outside(d) và chỉ đánh giá vế phải khi vế trái truthy: Math.abs(d-goal)<=CFG.tolerance+1
      const snapCandidate=ST.mode==='SCAN'&&(ST.moveGoal||ST.arrivalSnap)&&outside(d)&&Math.abs(d-goal)<=CFG.tolerance+1;
// [VI dòng gốc 553] Kiểm tra !snapCandidate: đúng thì chạy nhánh sau if, sai thì chạy nhánh else. | gán ST.arrivalSample bằng null | gán ST.arrivalSnap bằng false
      if(!snapCandidate){ST.arrivalSample=null;ST.arrivalSnap=false;}
// [VI dòng gốc 554] Nhánh else được chạy khi điều kiện if tương ứng không đúng.
      else{
// [VI dòng gốc 555] Khai báo biến không gán lại bằng const: sample = đọc ST.arrivalSample
        const sample=ST.arrivalSample;
// [VI dòng gốc 556] Kiểm tra !sample||Math.hypot(a.x-sample.ax,a.y-sample.ay)>.25||Math.hypot(b.x-sample.bx,b.y-sample.by)>.25: đúng thì chạy nhánh sau if, sai thì chạy nhánh else.
        if(!sample||Math.hypot(a.x-sample.ax,a.y-sample.ay)>.25||Math.hypot(b.x-sample.bx,b.y-sample.by)>.25){
// [VI dòng gốc 557] gán ST.arrivalSample bằng {ax:a.x,ay:a.y,bx:b.x,by:b.y,at:Date.now()} | gán ST.arrivalSnap bằng false
          ST.arrivalSample={ax:a.x,ay:a.y,bx:b.x,by:b.y,at:Date.now()};ST.arrivalSnap=false;
// [VI dòng gốc 558] Kiểm tra !ST.arrivalSnap&&Date.now()-sample.at>=1000: đúng thì chạy nhánh sau if.
        }else if(!ST.arrivalSnap&&Date.now()-sample.at>=1000){
// [VI dòng gốc 559] gán ST.arrivalSnap bằng true | gọi note('NATIVE-ARRIVAL-SNAP', {distance:d,goal,extraTolerance:1})
          ST.arrivalSnap=true;note('NATIVE-ARRIVAL-SNAP',{distance:d,goal,extraTolerance:1});
// [VI dòng gốc 560] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
        }
// [VI dòng gốc 561] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
      }
// [VI dòng gốc 562] Kiểm tra atPosition(r): đúng thì chạy nhánh sau if.
      if(atPosition(r)){
// [VI dòng gốc 563] Chú thích gốc của tác giả; không được thực thi. Nội dung: Arrival is measured from the moving Boss, not from path completion.
        // Arrival is measured from the moving Boss, not from path completion.
// [VI dòng gốc 564] Chú thích gốc của tác giả; không được thực thi. Nội dung: Stop our remaining path before casting so it cannot carry us past it.
        // Stop our remaining path before casting so it cannot carry us past it.
// [VI dòng gốc 565] Kiểm tra ST.positioning&&ST.moveGoal: đúng thì chạy nhánh sau if. | gán ST.ownMove bằng true | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | gọi r.m.stop() để dừng bộ điều khiển và dọn tài nguyên (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
        if(ST.positioning&&ST.moveGoal){ST.ownMove=true;try{r.m.stop?.();}finally{ST.ownMove=false;}}
// [VI dòng gốc 566] gán ST.positioning bằng false | gán ST.moveGoal bằng null | gán ST.positionSample bằng null | gán ST.positionRetries bằng 0
        ST.positioning=false;ST.moveGoal=null;ST.positionSample=null;ST.positionRetries=0;ST.positionOffset=0;ST.positionCommands=0;ST.positionPause=null;ST.positionRecovery=0;ST.lastReason='holding_far';fastCast(r);return;
// [VI dòng gốc 567] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
      }
// [VI dòng gốc 568] gán ST.positioning bằng true
      ST.positioning=true;
// [VI dòng gốc 569] Kiểm tra ST.positionPause: đúng thì chạy nhánh sau if.
      if(ST.positionPause){
// [VI dòng gốc 570] Kiểm tra Math.hypot(b.x-ST.positionPause.x,b.y-ST.positionPause.y)<20&&Date.now()-ST.positionPause.at<8000: đúng thì chạy nhánh sau if. | gán ST.lastReason bằng ST.positionPause.reason | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
        if(Math.hypot(b.x-ST.positionPause.x,b.y-ST.positionPause.y)<20&&Date.now()-ST.positionPause.at<8000){ST.lastReason=ST.positionPause.reason;return;}
// [VI dòng gốc 571] gán ST.positionPause bằng null | gán ST.positionCommands bằng 0 | gán ST.positionRetries bằng 0 | gán ST.positionOffset bằng 0
        ST.positionPause=null;ST.positionCommands=0;ST.positionRetries=0;ST.positionOffset=0;
// [VI dòng gốc 572] gán ST.positionSample bằng null | gán ST.moveGoal bằng null | gán ST.lastMove bằng -Infinity | tăng ST.positionRecovery một đơn vị sau khi lấy giá trị
        ST.positionSample=null;ST.moveGoal=null;ST.lastMove=-Infinity;ST.positionRecovery++;
// [VI dòng gốc 573] gọi note('POSITION-RECOVERY', {cycle:ST.positionRecovery,distance:d})
        note('POSITION-RECOVERY',{cycle:ST.positionRecovery,distance:d});
// [VI dòng gốc 574] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
      }
// [VI dòng gốc 575] Kiểm tra ST.positionCommands>=24: đúng thì chạy nhánh sau if.
      if(ST.positionCommands>=24){
// [VI dòng gốc 576] gán ST.ownMove bằng true | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | gọi r.m.stop() để dừng bộ điều khiển và dọn tài nguyên (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gán ST.ownMove bằng false
        ST.ownMove=true;try{r.m.stop?.();}finally{ST.ownMove=false;}
// [VI dòng gốc 577] gán ST.positionPause bằng {x:b.x,y:b.y,at:Date.now(),reason:'position_oscillation_bounded'} | gán ST.lastReason bằng 'position_oscillation_bounded'
        ST.positionPause={x:b.x,y:b.y,at:Date.now(),reason:'position_oscillation_bounded'};ST.lastReason='position_oscillation_bounded';
// [VI dòng gốc 578] gọi note('POSITION-OSCILLATION-PAUSED', {distance:d,goal,commands:ST.positionCommands}) | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
        note('POSITION-OSCILLATION-PAUSED',{distance:d,goal,commands:ST.positionCommands});return;
// [VI dòng gốc 579] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
      }
// [VI dòng gốc 580] Chú thích gốc của tác giả; không được thực thi. Nội dung: running() không chứng minh có tiến triển: native có thể dừng trước đích
      // running() không chứng minh có tiến triển: native có thể dừng trước đích
// [VI dòng gốc 581] Chú thích gốc của tác giả; không được thực thi. Nội dung: khoảng vài đơn vị nhưng vẫn giữ cờ chạy. Sau 1.8s đứng yên, kéo dài
      // khoảng vài đơn vị nhưng vẫn giữ cờ chạy. Sau 1.8s đứng yên, kéo dài
// [VI dòng gốc 582] Chú thích gốc của tác giả; không được thực thi. Nội dung: waypoint ra ngoài để vượt ngưỡng dừng; vẫn chỉ xả khi đo đúng dải 302.
      // waypoint ra ngoài để vượt ngưỡng dừng; vẫn chỉ xả khi đo đúng dải 302.
// [VI dòng gốc 583] Khai báo biến không gán lại bằng const: progress = đọc ST.positionSample
      const progress=ST.positionSample;
// [VI dòng gốc 584] Kiểm tra !progress||Math.hypot(a.x-progress.ax,a.y-progress.ay)>.75||Math.hypot(b.x-progress.bx,b.y-progress.by)>.75: đúng thì chạy nhánh sau if, sai thì chạy nhánh else.
      if(!progress||Math.hypot(a.x-progress.ax,a.y-progress.ay)>.75||Math.hypot(b.x-progress.bx,b.y-progress.by)>.75)
// [VI dòng gốc 585] gán ST.positionSample bằng {ax:a.x,ay:a.y,bx:b.x,by:b.y,at:Date.now()}
        ST.positionSample={ax:a.x,ay:a.y,bx:b.x,by:b.y,at:Date.now()};
// [VI dòng gốc 586] Kiểm tra ST.moveGoal&&Date.now()-progress.at>=1800&&ST.positionRetries<6: đúng thì chạy nhánh sau if.
      else if(ST.moveGoal&&Date.now()-progress.at>=1800&&ST.positionRetries<6){
// [VI dòng gốc 587] tăng ST.positionRetries một đơn vị sau khi lấy giá trị | gán ST.positionOffset bằng d<goal?Math.min(32,ST.positionRetries*8):0
        ST.positionRetries++;ST.positionOffset=d<goal?Math.min(32,ST.positionRetries*8):0;
// [VI dòng gốc 588] gán ST.ownMove bằng true | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | gọi r.m.stop() để dừng bộ điều khiển và dọn tài nguyên (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gán ST.ownMove bằng false
        ST.ownMove=true;try{r.m.stop?.();}finally{ST.ownMove=false;}
// [VI dòng gốc 589] gán ST.lastMove bằng -Infinity | gán ST.moveGoal bằng null | gán ST.positionSample.at bằng Date.now()
        ST.lastMove=-Infinity;ST.moveGoal=null;ST.positionSample.at=Date.now();
// [VI dòng gốc 590] gọi note('POSITION-RETRY', {distance:d,goal,attempt:ST.positionRetries,waypointExtra:ST.positionOffset})
        note('POSITION-RETRY',{distance:d,goal,attempt:ST.positionRetries,waypointExtra:ST.positionOffset});
// [VI dòng gốc 591] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
      }
// [VI dòng gốc 592] Kiểm tra ST.positionRetries>=6&&ST.positionSample&&Date.now()-ST.positionSample.at>=1800: đúng thì chạy nhánh sau if.
      if(ST.positionRetries>=6&&ST.positionSample&&Date.now()-ST.positionSample.at>=1800){
// [VI dòng gốc 593] Kiểm tra ST.lastReason!=='position_stalled_bounded': đúng thì chạy nhánh sau if.
        if(ST.lastReason!=='position_stalled_bounded'){
// [VI dòng gốc 594] gán ST.ownMove bằng true | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | gọi r.m.stop() để dừng bộ điều khiển và dọn tài nguyên (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gán ST.ownMove bằng false
          ST.ownMove=true;try{r.m.stop?.();}finally{ST.ownMove=false;}
// [VI dòng gốc 595] gọi note('POSITION-PAUSED', {distance:d,goal,attempts:ST.positionRetries})
          note('POSITION-PAUSED',{distance:d,goal,attempts:ST.positionRetries});
// [VI dòng gốc 596] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
        }
// [VI dòng gốc 597] gán ST.positionPause bằng {x:b.x,y:b.y,at:Date.now(),reason:'position_stalled_bounded'} | gán ST.lastReason bằng 'position_stalled_bounded' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
        ST.positionPause={x:b.x,y:b.y,at:Date.now(),reason:'position_stalled_bounded'};ST.lastReason='position_stalled_bounded';return;
// [VI dòng gốc 598] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
      }
// [VI dòng gốc 599] Chú thích gốc của tác giả; không được thực thi. Nội dung: Vector hướng từ Boss ra nhân vật; cộng bán kính vào tọa độ Boss, không cộng vào vị trí nhân vật.
      // Vector hướng từ Boss ra nhân vật; cộng bán kính vào tọa độ Boss, không cộng vào vị trí nhân vật.
// [VI dòng gốc 600] Khai báo biến không gán lại bằng const: ux = nếu d>=1 thì lấy (a.x-b.x)/d, ngược lại lấy 1; uy = nếu d>=1 thì lấy (a.y-b.y)/d, ngược lại lấy 0
      const ux=d>=1?(a.x-b.x)/d:1,uy=d>=1?(a.y-b.y)/d:0;
// [VI dòng gốc 601] Khai báo biến không gán lại bằng const: recoveryAngle = nếu ST.positionRecovery thì lấy (ST.positionRecovery%2?1:-1)*Math.min(90,Math.ceil(ST.positionRecovery/2)*30)*Math.PI/180, ngược lại lấy 0
      const recoveryAngle=ST.positionRecovery?(ST.positionRecovery%2?1:-1)*Math.min(90,Math.ceil(ST.positionRecovery/2)*30)*Math.PI/180:0;
// [VI dòng gốc 602] Khai báo biến không gán lại bằng const: angle = tính biểu thức recoveryAngle+(ST.positionRetries>=3?(ST.positionRetries%2?1:-1)*Math.min(30,(ST.positionRetries-2)*15)*Math.PI/180:0)
      const angle=recoveryAngle+(ST.positionRetries>=3?(ST.positionRetries%2?1:-1)*Math.min(30,(ST.positionRetries-2)*15)*Math.PI/180:0);
// [VI dòng gốc 603] Khai báo biến không gán lại bằng const: waypointRadius = tính biểu thức goal+ST.positionOffset
      const waypointRadius=goal+ST.positionOffset;
// [VI dòng gốc 604] Khai báo biến không gán lại bằng const: x = tính biểu thức b.x+(ux*Math.cos(angle)-uy*Math.sin(angle))*waypointRadius; y = tính biểu thức b.y+(ux*Math.sin(angle)+uy*Math.cos(angle))*waypointRadius
      const x=b.x+(ux*Math.cos(angle)-uy*Math.sin(angle))*waypointRadius,
// [VI dòng gốc 605] gọi Math.sin(angle) | gọi Math.cos(angle)
        y=b.y+(ux*Math.sin(angle)+uy*Math.cos(angle))*waypointRadius;
// [VI dòng gốc 606] Chú thích gốc của tác giả; không được thực thi. Nội dung: Giữ đường đang chạy nếu đích chưa đổi đáng kể; tránh lặp lệnh làm nhân vật nhích từng chút.
      // Giữ đường đang chạy nếu đích chưa đổi đáng kể; tránh lặp lệnh làm nhân vật nhích từng chút.
// [VI dòng gốc 607] Kiểm tra typeof r.m.running==='function'&&r.m.running()&&ST.moveGoal&&Date.now()-ST.lastMove<4500&& Math.hypot(ST.moveGoal.x-x,ST.moveGoal.y-y)<15: đúng thì chạy nhánh sau if.
      if(typeof r.m.running==='function'&&r.m.running()&&ST.moveGoal&&Date.now()-ST.lastMove<4500&&
// [VI dòng gốc 608] gán ST.lastReason bằng 'positioning_in_progress' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
         Math.hypot(ST.moveGoal.x-x,ST.moveGoal.y-y)<15){ST.lastReason='positioning_in_progress';return;}
// [VI dòng gốc 609] Kiểm tra Date.now()-ST.lastMove<CFG.moveWaitMs: đúng thì chạy nhánh sau if. | gán ST.lastReason bằng 'move_wait' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      if(Date.now()-ST.lastMove<CFG.moveWaitMs){ST.lastReason='move_wait';return;}
// [VI dòng gốc 610] Kiểm tra typeof r.m.moveTo!=='function': đúng thì chạy nhánh sau if. | gán ST.lastReason bằng 'no_mover' | Kết thúc hàm hiện tại mà không trả giá trị cụ thể.
      if(typeof r.m.moveTo!=='function'){ST.lastReason='no_mover';return;}
// [VI dòng gốc 611] gán ST.ownMove bằng true | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | gọi r.m.moveTo(x, y) | gán ST.ownMove bằng false
      ST.ownMove=true;try{r.m.moveTo(x,y);}finally{ST.ownMove=false;}
// [VI dòng gốc 612] gán ST.moveGoal bằng {x,y} | tăng ST.positionCommands một đơn vị sau khi lấy giá trị | tăng ST.moves một đơn vị sau khi lấy giá trị | gán ST.lastMove bằng Date.now()
      ST.moveGoal={x,y};ST.positionCommands++;ST.moves++;ST.lastMove=Date.now();ST.lastReason='positioning_far';
// [VI dòng gốc 613] Nhận lỗi bằng e và chạy phần xử lý lỗi. | gán ST.lastError bằng String(e?.message||e) | gán ST.lastReason bằng 'error'
    }catch(e){ST.lastError=String(e?.message||e);ST.lastReason='error';}
// [VI dòng gốc 614] gọi metrics?.state(ST.lastReason, ST.lastOwnerPhase, currentPace(), pacer?.status()?.lastAction) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    finally{metrics?.state(ST.lastReason,ST.lastOwnerPhase,currentPace(),pacer?.status()?.lastAction);}
// [VI dòng gốc 615] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 616] Chú thích gốc của tác giả; không được thực thi. Nội dung: Đọc danh sách kỹ năng native hiện có cùng tên hiển thị để báo cáo.
  // Đọc danh sách kỹ năng native hiện có cùng tên hiển thị để báo cáo.
// [VI dòng gốc 617] Định nghĩa hàm skillNames; tham số: không có | Kiểm tra W.KVPV_TRANSFORM10?.transformed?.(): đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: gọi W.KVPV_TRANSFORM10.skills(). | Khai báo biến không gán lại bằng const: r = gọi role()
  function skillNames(){if(W.KVPV_TRANSFORM10?.transformed?.())return W.KVPV_TRANSFORM10.skills();const r=role();const rows=[r.s?._rtt,r.s?._wet].flatMap(x=>Array.isArray(x)?x:[]),ids=[...new Set(rows.map(x=>Number(x?.[0])).filter(candidate))];
// [VI dòng gốc 618] Kết thúc hàm hiện tại và trả về: gọi ids.map(id=>{let name='';try{const arr=W._Ba?._rJ?._O$?.ins?.skills||[];const level=Number(arr.find(x=>Number(x?.[0])===id)?.[1]…) để biến đổi từng phần tử. | Khai báo biến có thể gán lại bằng let: name = "" | Bắt đầu khối try; lỗi phát sinh sẽ được xử lý ở catch hoặc chuyển ra ngoài. | Khai báo biến không gán lại bằng const: arr = W._Ba?._rJ?._O$?.ins?.skills hoặc dùng vế phải khi vế trái falsy: []
    return ids.map(id=>{let name='';try{const arr=W._Ba?._rJ?._O$?.ins?.skills||[];const level=Number(arr.find(x=>Number(x?.[0])===id)?.[1])||1;name=String(W._ft?._nY?.ins?.getCfgBySkillIdAndLv?.(id,level)?.[2]||'');}catch(_){window.KVPV_V1?.diagnostics?.record(_);}return {id,name};});}
// [VI dòng gốc 619] Chú thích gốc của tác giả; không được thực thi. Nội dung: Trả trạng thái hiện tại để kiểm tra; ý nghĩa từng bộ đếm thuộc phạm vi module này.
  // Trả trạng thái hiện tại để kiểm tra; ý nghĩa từng bộ đếm thuộc phạm vi module này.
// [VI dòng gốc 620] Định nghĩa hàm status; tham số: show=true. Mục đích: trả trạng thái để kiểm tra | Khai báo biến không gán lại bằng const: occ = gọi stageOcc(); ready = gọi skillNames(); proved = gọi ready.filter(x=>verified(occ,x.id)).map(x=>({...x,confirmations:ST.proofs.get(key(occ,x.id))?.size||0})) để biến đổi từng phần tử
  function status(show=true){const occ=stageOcc(),ready=skillNames(),proved=ready.filter(x=>verified(occ,x.id)).map(x=>({...x,confirmations:ST.proofs.get(key(occ,x.id))?.size||0}));
// [VI dòng gốc 621] Khai báo biến không gán lại bằng const: ret = tạo đối tượng gồm basicAnimationSpeed, scaledBasicAnimations, basicSpeedTrial, basicOnly, playerSkillIds, interleavedBasic, basicProbeActive, version, running, operation, goalDistance, requestedDistance, requireDistanceGreaterThan, clientTrialRadius, nativeTuyetHoc, confirmedSkills, confirmedOver300, bossClientRange, minimumDistance, skills, afterTHWaitMs, basicHitQuota, confirmedSinceTH, thCycles, primaryBasic…
    const tqIds=tqFive?.active()?[...basicRotation(),...(!basicSolo4100Active()&&tqFive.allowsTuyetHoc()?ready.filter(x=>x.id>=1001&&x.id<=1008).map(x=>x.id):[])]:null;
    const ret={basicAnimationSpeed:CFG.basicAnimationSpeed,
       tqTuyetHocVisualSpeed:CFG.tqTuyetHocVisualSpeed,
       tqTuyetHocVisualCalls:thVisualCalls,tqTuyetHocVisualScaled:thVisualScaled,
       tqTuyetHocVisualUnavailable:thVisualUnavailable,tqTuyetHocVisualLastSkill:thVisualLastSkill,
       scaledBasicAnimations:ST.scaledBasicAnimations??0,basicSpeedTrial:speedTrial??W[speedKey]??null,basicOnly:tqFive?.active()?(basicSolo4100Active()||!tqFive.allowsTuyetHoc()):CFG.basicOnly,playerSkillIds:tqFive?.active()?tqIds:CFG.basicOnly?[8001]:null,interleavedBasic:tqFive?.active()||mixed.enabled,basicProbeActive:ST.running&&probeActive(),version:'1.0.0',running:ST.running,operation:ST.mode,goalDistance:targetDistance()??CFG.goal,requestedDistance:CFG.goal,
// [VI dòng gốc 622] Thuộc tính requireDistanceGreaterThan: đọc CFG.min | Thuộc tính clientTrialRadius: đọc CFG.max
      requireDistanceGreaterThan:CFG.min,clientTrialRadius:CFG.max,
// [VI dòng gốc 623] Thuộc tính nativeTuyetHoc: ready | Thuộc tính confirmedSkills: proved | Thuộc tính confirmedOver300: gọi proved.filter(x=>supportedDistance(occ,x.id)>300) để giữ phần tử thỏa điều kiện
      nativeTuyetHoc:ready,confirmedSkills:proved,confirmedOver300:proved.filter(x=>supportedDistance(occ,x.id)>300),
// [VI dòng gốc 624] Thuộc tính bossClientRange: gọi bossRange() | Thuộc tính minimumDistance: đọc CFG.min
      bossClientRange:bossRange(),minimumDistance:CFG.min,
// [VI dòng gốc 625] Thuộc tính skills: gọi ready.map(x=>({...x,...stats(occ,x.id),verifiedDistance:supportedDistance(occ,x.id),verified:verified(occ,x.id)})) để biến đổi từng phần tử | Thuộc tính verifiedDistance: gọi supportedDistance(occ, x.id) | Thuộc tính verified: gọi verified(occ, x.id)
      skills:ready.map(x=>({...x,...stats(occ,x.id),verifiedDistance:supportedDistance(occ,x.id),verified:verified(occ,x.id)})),
// [VI dòng gốc 626] Thuộc tính afterTHWaitMs: đọc CFG.afterTHWaitMs | Thuộc tính basicHitQuota: đọc mixed.hitQuota | Thuộc tính confirmedSinceTH: đọc mixed.confirmedSinceTH | Thuộc tính thCycles: đọc mixed.thCycles
      afterTHWaitMs:CFG.afterTHWaitMs,basicHitQuota:mixed.hitQuota,confirmedSinceTH:mixed.confirmedSinceTH,thCycles:mixed.thCycles,primaryBasicEnabled:tqFive?.active()||mixed.primary,primaryBasicSkillId:primaryBasicId(),primaryBasicClientWaitMs:tqFive?.active()?tqFive.wait():mixed.basicPaceMs,primaryBasicNativeCooldown:!tqFive?.active()&&mixed.basicPaceMs===null,primaryBasicBurstBeforeSkill:basicQuota(),basicRotation:basicRotation(),
// [VI dòng gốc 627] Thuộc tính excludedBasicSkillIds: tạo mảng gồm 1 vị trí: [...excludedBasics]
      excludedBasicSkillIds:tqFive?.active()?[]:[...excludedBasics],tianQuanFiveBasics:tqFive?.report()??null,
// [VI dòng gốc 628] Thuộc tính confirmedTailStudy: W[tailStudyKey] hoặc dùng vế phải khi vế trái là null/undefined: null
      confirmedTailStudy:W[tailStudyKey]??null,
// [VI dòng gốc 629] Thuộc tính confirmedBasicTailCut: confirmedTailCut | Thuộc tính confirmedBasicTailCuts: confirmedTailCuts
      cosmic:{enabled:cosmic.enabled,active:cosmicActive(),thCasts:cosmic.thCasts,basicCasts:cosmic.basicCasts,
        lastNativeSkill:cosmic.lastNativeSkill,
        sinceNativeCastMs:cosmic.lastNativeAt===null?null:Math.max(0,Date.now()-cosmic.lastNativeAt),
        waitingReason:ST.lastReason,animationPlaying:animationPlaying(role().c),
        rankedTH:cosmic.thRanked,rankedBasic:cosmic.basicRanked,explorationChecks:cosmic.exploration,
        strongestTH:[...cosmic.thMeasured].filter(([,x])=>x.hits>=2).sort((a,b)=>b[1].damage/b[1].hits-a[1].damage/a[1].hits)[0]?.[0]??null,
        skillObservations:[...cosmic.thMeasured].map(([id,x])=>({id,hits:x.hits,meanDamage:x.hits?x.damage/x.hits:null})),
        note:'Confirmed direct hits on current Boss; explores less-observed native-ready skills periodically. No cooldown modification.'},
      luoFeng:{enabled:luoFeng.enabled,active:luoFengActive(),profile:'LA_PHONG_DINH_PHONG',
        sampleWindow:luoFeng.sampleWindow,idleThresholdMs:luoFeng.idleThresholdMs,
        robustMinHits:luoFeng.robustMinHits,trimPerTail:luoFeng.trimPerTail,
        lastNativeSkill:cosmic.lastNativeSkill,
        idleMs:cosmic.lastNativeAt==null?null:Math.max(0,Date.now()-cosmic.lastNativeAt),
        possibleIdle:luoFengActive()&&cosmic.lastNativeAt!==null&&Date.now()-cosmic.lastNativeAt>=luoFeng.idleThresholdMs,
        lastReason:ST.lastReason,rhythm:apexRhythmReport(),dpsPilot4100:pilot4100Status(),basicSolo4100:basicSolo4100Status(),
        recentTH:[...cosmic.thMeasured].map(([id,x])=>({id,hits:x.hits,recentHits:x.recent?.length??0,recentMeanDamage:apexDamage(x),robustScore:apexRobustDamage(x)})),
        recentBasics:[...thGap.measured].map(([id,x])=>({id,hits:x.hits,recentHits:x.recent?.length??0,recentMeanDamage:apexDamage(x),robustScore:apexRobustDamage(x)})),
        note:'Apex V3: robust damage ranking and HP-loss rhythm observation only; not confirmed Boss attacks. No auto-dodge, native cooldown or movement changes.'},
      thGapBasics:{enabled:thGap.enabled,windowMs:thGap.windowMs,active:thGapActive(),strongestVerifiedBasic:strongestThGapBasic(),
        attempts:thGap.attempts,nativeAccepted:thGap.accepted,blockedCooldown:thGap.blockedCooldown,lastBasic:thGap.lastBasic,
        measured:[...thGap.measured].map(([id,x])=>({id,hits:x.hits,meanDamage:x.hits?x.damage/x.hits:null}))},
      confirmedBasicTailCut:confirmedTailCut,confirmedBasicTailCuts:confirmedTailCuts,confirmedTailSkillIds:tqFive?.active()?[8001,8002,8003,8004,8005]:[8001,8005],
// [VI dòng gốc 630] Thuộc tính basicRangeTest: W[rangeTestKey] hoặc dùng vế phải khi vế trái là null/undefined: null
      basicRangeTest:W[rangeTestKey]??null,
// [VI dòng gốc 631] Thuộc tính skillPriority: nếu mixed.enabled thì lấy mixed.primary?(basicRotation().length?'native_basic_rotation_then_tuyet_hoc':'three_primary_basics_then_tuyet_hoc'):'alternating_native_rotation', ngược lại lấy ['LINH_LUNG','PHU_VAN','TRU_TIEN'].includes(W.KVPV_FAR_SCOPE?.status?.().kind)?'observed_damage_with_fair_rotation':'native_rotation'
      skillPriority:tqFive?.active()?(basicSolo4100Active()?'4100_native_basics_only':tqFive.allowsTuyetHoc()?'five_basics_plus_tuyet_hoc_10ms':'five_basics_10ms'):CFG.basicOnly?'basic8001':skillPriority==='tuyet_hoc_first'?'ready_tuyet_hoc_observed_damage_then_basic':mixed.enabled?(mixed.primary?(basicRotation().length?'native_basic_rotation_then_tuyet_hoc':'three_primary_basics_then_tuyet_hoc'):'alternating_native_rotation'):['LINH_LUNG','PHU_VAN','TRU_TIEN'].includes(W.KVPV_FAR_SCOPE?.status?.().kind)?'observed_damage_with_fair_rotation':'native_rotation',
// [VI dòng gốc 632] Thuộc tính eligibleSkillIds: nếu ST.mode==='SCAN' thì lấy ready.map(x=>x.id), ngược lại lấy proved.map(x=>x.id)
      eligibleSkillIds:tqFive?.active()?tqIds:ST.mode==='SCAN'?ready.map(x=>x.id):proved.map(x=>x.id),
// [VI dòng gốc 633] Thuộc tính lastDistance: đọc ST.lastDistance | Thuộc tính currentDistance: gọi radius(role().a, role().c?.target) | Thuộc tính lastHitDistance: đọc ST.lastHitDistance
      lastDistance:ST.lastDistance,currentDistance:radius(role().a,role().c?.target),lastHitDistance:ST.lastHitDistance,
// [VI dòng gốc 634] Thuộc tính combatRunning: ST.running và chỉ đánh giá vế phải khi vế trái truthy: combatOwner()?.running===true | Thuộc tính combatPhase: nếu ST.running thì lấy combatOwner()?.phase, ngược lại lấy 'OFF'
      combatRunning:ST.running&&combatOwner()?.running===true,combatPhase:ST.running?combatOwner()?.phase:'OFF',
// [VI dòng gốc 635] Thuộc tính recoveryEnabled: true | Thuộc tính finishBossHpPct: nếu ['LINH_LUNG','PHU_VAN','TRU_TIEN'].includes(W.KVPV_FAR_SCOPE?.status?.().kind) thì lấy 2, ngược lại lấy null | Thuộc tính combatOwner: combatOwner()?.owner hoặc dùng vế phải khi vế trái là null/undefined: 'HITRUN'
      recoveryEnabled:!tqDistanceOnly(),distanceOnly310:tqDistanceOnly(),finishBossHpPct:['LINH_LUNG','PHU_VAN','TRU_TIEN'].includes(W.KVPV_FAR_SCOPE?.status?.().kind)?2:null,combatOwner:combatOwner()?.owner??'HITRUN',
// [VI dòng gốc 636] Thuộc tính positionTolerance: đọc CFG.tolerance | Thuộc tính positionRetries: đọc ST.positionRetries | Thuộc tính positionWaypointExtra: đọc ST.positionOffset | Thuộc tính nativeArrivalSnap: đọc ST.arrivalSnap
      positionTolerance:CFG.tolerance,positionRetries:ST.positionRetries,positionWaypointExtra:ST.positionOffset,nativeArrivalSnap:ST.arrivalSnap,nativeArrivalExtraTolerance:ST.arrivalSnap?1:0,movementCommands:ST.moves,recoveryResumes:ST.resumes,hitrunPhase:ST.lastOwnerPhase,
// [VI dòng gốc 637] Thuộc tính positioning: đọc ST.positioning | Thuộc tính paceMs: gọi currentPace() | Thuộc tính adaptivePacing: pacer?.status() hoặc dùng vế phải khi vế trái là null/undefined: null | Thuộc tính fastCasts: đọc ST.fastCasts
      positioning:ST.positioning,paceMs:currentPace(),adaptivePacing:pacer?.status()??null,fastCasts:ST.fastCasts,blockedNativeSteering:ST.blockedSteering,
// [VI dòng gốc 638] Thuộc tính castAttempts: đọc ST.castAttempts | Thuộc tính confirmedCastHitPairs: đọc ST.confirmedPairs | Thuộc tính blockedOtherSkills: đọc ST.blocked
      castAttempts:ST.castAttempts,confirmedCastHitPairs:ST.confirmedPairs,blockedOtherSkills:ST.blocked,
// [VI dòng gốc 639] Thuộc tính lastReason: đọc ST.lastReason | Thuộc tính lastError: đọc ST.lastError
      lastReason:ST.lastReason,lastError:ST.lastError,cooldown4100Trial:cooldown4100Status(),localLogCleanup:localLogCleanupStatus(),
// [VI dòng gốc 640] Thuộc tính timerActive: tính biểu thức ST.timer!=null | Thuộc tính lastTickAt: đọc ST.lastTickAt | Thuộc tính tickAgeMs: nếu ST.lastTickAt===null thì lấy null, ngược lại lấy Math.max(0,Date.now()-ST.lastTickAt) | Thuộc tính timerRepairs: đọc ST.timerRepairs
      timerActive:ST.timer!=null,lastTickAt:ST.lastTickAt,tickAgeMs:ST.lastTickAt===null?null:Math.max(0,Date.now()-ST.lastTickAt),timerRepairs:ST.timerRepairs,
// [VI dòng gốc 641] Thuộc tính warning: nếu proved.length===0 thì lấy 'No independently verified skill at this distance yet. STRICT will wait; use SCAN for real-game testing.', ngược lại lấy 'Observed matching skill damage at tested distance; this does not guarantee safety from Boss attacks.'
      warning:proved.length===0?'No independently verified skill at this distance yet. STRICT will wait; use SCAN for real-game testing.':'Observed matching skill damage at tested distance; this does not guarantee safety from Boss attacks.'};
// [VI dòng gốc 642] Kiểm tra show: đúng thì chạy nhánh sau if. | gọi console.table(ready.map(x=>({...x,verified:verified(occ,x.id),pairs:ST.proofs.get(key(occ,x.id))?.size||0}))) | gọi console.log(TAG, ret) | Kết thúc hàm hiện tại và trả về: ret.
    if(show){console.table(ready.map(x=>({...x,verified:verified(occ,x.id),pairs:ST.proofs.get(key(occ,x.id))?.size||0})));console.log(TAG,ret);}return ret;
// [VI dòng gốc 643] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 644] Chú thích gốc của tác giả; không được thực thi. Nội dung: Bật bộ điều khiển và lịch kiểm tra của module; trả trạng thái sau khi khởi động.
  // Bật bộ điều khiển và lịch kiểm tra của module; trả trạng thái sau khi khởi động.
// [VI dòng gốc 645] Định nghĩa hàm start; tham số: mode='STRICT'. Mục đích: khởi động bộ điều khiển | Kiểm tra mode!=='STRICT'&&mode!=='SCAN': đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('Use STRICT or SCAN')
  function start(mode='STRICT'){if(mode!=='STRICT'&&mode!=='SCAN')throw Error('Use STRICT or SCAN');
// [VI dòng gốc 646] Kiểm tra String(W._Ba?._rJ?._O$?.ins?.actorId??'')!==actorId: đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('wrong actor')
    if(String(W._Ba?._rJ?._O$?.ins?.actorId??'')!==actorId)throw Error('wrong actor');
// [VI dòng gốc 647] Kiểm tra CFG.goal>600: đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('Boss danger range exceeds the bounded far-skill trial')
    if(CFG.goal>600)throw Error('Boss danger range exceeds the bounded far-skill trial');
// [VI dòng gốc 648] gọi W.KVPV_RANGE281?.setTrialRange(CFG.max) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    W.KVPV_RANGE281?.setTrialRange?.(CFG.max);
// [VI dòng gốc 649] gán ST.positionSample bằng null | gán ST.positionRetries bằng 0 | gán ST.positionOffset bằng 0 | gán ST.positionCommands bằng 0
    ST.positionSample=null;ST.positionRetries=0;ST.positionOffset=0;ST.positionCommands=0;ST.positionPause=null;ST.positionRecovery=0;ST.mode=mode;ST.running=true;ST.positioning=true;ST.moveGoal=null;ST.lastMove=-Infinity;ST.lastOwnerPhase=null;ST.lastReason='starting';ST.lastError='';
// [VI dòng gốc 650] Kiểm tra ST.timer==null: đúng thì chạy nhánh sau if. | gán ST.timer bằng (W.KVPV_V1?.timers?.setInterval ?? W.setInterval)(tick,CFG.scanMs) | gọi tick() để xử lý một nhịp kiểm tra | Kết thúc hàm hiện tại và trả về: gọi status(false) để trả trạng thái để kiểm tra.
    if(ST.timer==null)ST.timer=(W.KVPV_V1?.timers?.setInterval ?? W.setInterval)(tick,CFG.scanMs);tick();return status(false);
// [VI dòng gốc 651] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 652] Chú thích gốc của tác giả; không được thực thi. Nội dung: Dừng bộ điều khiển, hủy lịch và giải phóng tài nguyên do module này sở hữu.
  // Dừng bộ điều khiển, hủy lịch và giải phóng tài nguyên do module này sở hữu.
// [VI dòng gốc 653] Chú thích gốc của tác giả; không được thực thi. Nội dung: Sửa lịch mất khi trang đang hiện; không khởi động lại phiên Boss hoặc cắt animation.
  // Sửa lịch mất khi trang đang hiện; không khởi động lại phiên Boss hoặc cắt animation.
// [VI dòng gốc 654] Định nghĩa hàm repairPolling; tham số: không có
  function repairPolling(){
// [VI dòng gốc 655] Kiểm tra !ST.running||W.document?.hidden===true||W.__KVPV_UNIVERSAL_HALTED|| String(W._Ba?._rJ?._O$?.ins?.actorId??'')!==actorId: đúng thì chạy nhánh sau if.
    if(!ST.running||W.document?.hidden===true||W.__KVPV_UNIVERSAL_HALTED||
// [VI dòng gốc 656] Kết thúc hàm hiện tại và trả về: false.
      String(W._Ba?._rJ?._O$?.ins?.actorId??'')!==actorId)return false;
// [VI dòng gốc 657] Kiểm tra ST.timer!=null&&ST.lastTickAt!==null&&Date.now()-ST.lastTickAt<2500: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: false.
    if(ST.timer!=null&&ST.lastTickAt!==null&&Date.now()-ST.lastTickAt<2500)return false;
// [VI dòng gốc 658] Kiểm tra ST.timer!=null: đúng thì chạy nhánh sau if. | gọi W.KVPV_V1?.timers?.clearInterval??W.clearInterval(ST.timer)
    if(ST.timer!=null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(ST.timer);
// [VI dòng gốc 659] gán ST.timer bằng (W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,CFG.scanMs)
    ST.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,CFG.scanMs);
// [VI dòng gốc 660] tăng ST.timerRepairs một đơn vị sau khi lấy giá trị | gọi tick() để xử lý một nhịp kiểm tra | Kết thúc hàm hiện tại và trả về: true.
    ST.timerRepairs++;tick();return true;
// [VI dòng gốc 661] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 662] Định nghĩa hàm stop; tham số: reason='user'. Mục đích: dừng bộ điều khiển và dọn tài nguyên | Khai báo biến không gán lại bằng const: ownPositioning = ST.positioning và chỉ đánh giá vế phải khi vế trái truthy: ST.moveGoal; r = gọi role() | gán ST.running bằng false | gán ST.mode bằng 'OFF'
  function stop(reason='user'){cooldown4100Release('stop');localLogCleanup.enabled=false;trial1008?.stop();tqFive?.stop(reason);const ownPositioning=ST.positioning&&ST.moveGoal,r=role();ST.running=false;ST.mode='OFF';if(ST.timer!=null){(W.KVPV_V1?.timers?.clearInterval ?? W.clearInterval)(ST.timer);ST.timer=null;}
// [VI dòng gốc 663] gọi finishSpeedTrial('stopped') | Kiểm tra speedTrial: đúng thì chạy nhánh sau if. | gán speedTrial.restored bằng true
    finishSpeedTrial('stopped');if(speedTrial)speedTrial.restored=true;
// [VI dòng gốc 664] gọi restoreSpeedClips()
    restoreSpeedClips();
// [VI dòng gốc 665] Kiểm tra !/^(Chuyển Boss|Đổi phạm vi|Chuyển combat mode|Chết: chờ|Rời Thiên Quan)/.test(reason): đúng thì chạy nhánh sau if. | gọi finishRangeTest('stopped: '+reason) | gọi finishTailStudy('stopped: '+reason)
    if(!/^(Chuyển Boss|Đổi phạm vi|Chuyển combat mode|Chết: chờ|Rời Thiên Quan)/.test(reason)){finishRangeTest('stopped: '+reason);finishTailStudy('stopped: '+reason);}
// [VI dòng gốc 666] Kiểm tra ST.c && ST.c.obj?.combat?.__KVPV_GUARD_PARENT===ST.c.fn: đúng thì chạy nhánh sau if. | gọi W.KVPV_HITRUN1?.stop('Release guarded far-skill hook') để dừng bộ điều khiển và dọn tài nguyên (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    if(ST.c && ST.c.obj?.combat?.__KVPV_GUARD_PARENT===ST.c.fn)W.KVPV_HITRUN1?.stop?.('Release guarded far-skill hook');
// [VI dòng gốc 667] gọi unbind() | gọi unlisten() | Kiểm tra ownPositioning: đúng thì chạy nhánh sau if. | gọi r.m?.stop() để dừng bộ điều khiển và dọn tài nguyên (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    unbind();unlisten();if(ownPositioning)r.m?.stop?.();ST.moveGoal=null;ST.lastReason=reason;return status(false);}
// [VI dòng gốc 668] Chú thích gốc của tác giả; không được thực thi. Nội dung: Tổng hợp số liệu và lịch sử cho việc chẩn đoán; phân biệt quan sát với xác nhận từ game.
  // Tổng hợp số liệu và lịch sử cho việc chẩn đoán; phân biệt quan sát với xác nhận từ game.
// [VI dòng gốc 669] Định nghĩa hàm report; tham số: không có | gọi expire() | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm hitDiagnostics, nativeCombat, interleaved, basicProbe, burst, performance, build, controllerBuild, các thuộc tính của status(false), history, scope, interpretation.
  function report(){expire();return {hitDiagnostics:JSON.parse(JSON.stringify(hitDiagnostics)),nativeCombat:{dispatch:{observed:!!dispatch.actor,calls:dispatch.calls,signals:dispatch.signals,silent:dispatch.silent,recent:dispatch.recent.slice()},targetId:identity(role().c?.target),trackedTargetId:identity(ST.target),internalTargetId:identity(role().c?._wft),selectorOwned:role().s?._f7t===ST.s?.fn,combatOwned:role().c?.combat===ST.c?.fn||role().c?.combat?.__KVPV_GUARD_PARENT===ST.c?.fn,cooldown:role().c?.isCooldown?.()??null,animationPlaying:animationPlaying(role().c)},interleaved:{enabled:tqFive?.active()||mixed.enabled,basicClientWaitMs:tqFive?.active()?tqFive.wait():mixed.basicPaceMs,basicSuspended:mixed.suspended,basicUnconfirmed:mixed.unconfirmed,nativeAnimationGate:true,scanMs:CFG.scanMs,nextPreferred:mixed.wantBasic?'basic':'tuyet_hoc',basicAttempts:mixed.attempts,basicConfirmedHits:mixed.hits,confirmedHitTailRelease:true,basicTailReleases:ST.basicTailReleases,basicMatchedDamage:mixed.damage,examples:mixed.examples.map(x=>({...x}))},basicProbe:{enabled:basicProbe.enabled,active:probeActive(),context:basicProbe.context,attempts:basicProbe.attempts,confirmedHits:basicProbe.hits,matchedDamage:basicProbe.damage,maxAttempts:8,maxDurationMs:15000,examples:basicProbe.examples.map(x=>({...x})),note:'Direct basic cast-hit pairs only at the measured distance. No hit confirmation does not prove a server range limit.'},burst:{enabled:burst.enabled,experimental:true,minBatchGapMs:1000,maxSkillsPerBatch:8,resultWaitScope:'per_skill',
// [VI dòng gốc 670] Thuộc tính batches: gọi JSON.parse(JSON.stringify(burst.history)) để phân tích dữ liệu đầu vào theo API đang gọi | Thuộc tính note: "Client calls in one JS turn; matched damage is required for each skill. Not guaranteed simultaneous server execution. Native per-skill readiness is preserved." | Thuộc tính performance: metrics?.report() hoặc dùng vế phải khi vế trái là null/undefined: null | Thuộc tính build: W.KVPV_V1?.build hoặc dùng vế phải khi vế trái là null/undefined: null
    batches:JSON.parse(JSON.stringify(burst.history)),note:'Client calls in one JS turn; matched damage is required for each skill. Not guaranteed simultaneous server execution. Native per-skill readiness is preserved.'},performance:metrics?.report()??null,build:W.KVPV_V1?.build??null,controllerBuild:typeof __KVPV_V1_BUILD==='undefined'?null:__KVPV_V1_BUILD,...status(false),history:ST.history.slice(),
// [VI dòng gốc 671] Thuộc tính scope: W.KVPV_FAR_SCOPE?.status?.() hoặc dùng vế phải khi vế trái là null/undefined: null | Thuộc tính interpretation: "attempts are client combat calls; only matched damage confirms a hit. Unconfirmed does not prove a server range limit."
    scope:W.KVPV_FAR_SCOPE?.status?.()??null,interpretation:'attempts are client combat calls; only matched damage confirms a hit. Unconfirmed does not prove a server range limit.'};}
// [VI dòng gốc 672] Chú thích gốc của tác giả; không được thực thi. Nội dung: Cập nhật khoảng cách tính từ tâm Boss, xóa đích di chuyển cũ rồi kiểm tra lại ngay.
  // Cập nhật khoảng cách tính từ tâm Boss, xóa đích di chuyển cũ rồi kiểm tra lại ngay.
// [VI dòng gốc 673] Định nghĩa hàm setDistance; tham số: value | Khai báo biến không gán lại bằng const: d = gọi Number(value) để chuyển sang số | Kiểm tra !Number.isFinite(d)||d<=280||d>600: đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('Distance must be in (280,600]')
  function setDistance(value){const d=tqDistanceOnly()?310:Number(value);if(!Number.isFinite(d)||d<=280||d>600)throw Error('Distance must be in (280,600]');
// [VI dòng gốc 674] gọi W.KVPV_RANGE281?.setTrialRange(d+10) (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại) | gán CFG.goal bằng d | gán CFG.min bằng d===300?295:d>300?300:280 | gán CFG.max bằng d+10
    W.KVPV_RANGE281?.setTrialRange?.(d+10);CFG.goal=d;CFG.min=d===300?295:d>300?300:280;CFG.max=d+10;
// [VI dòng gốc 675] gán ST.lastMove bằng -Infinity | gán ST.moveGoal bằng null | gán ST.positioning bằng true | Kiểm tra ST.running: đúng thì chạy nhánh sau if.
    ST.lastMove=-Infinity;ST.moveGoal=null;ST.positioning=true;if(ST.running)tick();return status(false);}
// [VI dòng gốc 676] Chú thích gốc của tác giả; không được thực thi. Nội dung: Bảng quan sát từng chiêu của Boss hiện tại; dữ liệu các Boss trước nằm trong report().performance.completed.
  // Bảng quan sát từng chiêu của Boss hiện tại; dữ liệu các Boss trước nằm trong report().performance.completed.
// [VI dòng gốc 677] Định nghĩa hàm performance; tham số: không có | Khai báo biến không gán lại bằng const: p = metrics?.report() hoặc dùng vế phải khi vế trái là null/undefined: null | gọi console.table(p?.current?.skills??[]) | gọi console.log(TAG, p)
  function performance(){const p=metrics?.report()??null;console.table(p?.current?.skills??[]);console.log(TAG,p);return p;}
  function bossInfo(show=true){
    const read=fn=>{try{return fn()??null;}catch{return null;}};
    const snapshot=value=>read(()=>JSON.parse(JSON.stringify(value)));
    const raw=row=>Array.isArray(row)?row.slice(0,24).map(v=>v===null||['string','number','boolean'].includes(typeof v)?v:null):null;
    const r=read(()=>role()),boss=r?.c?.target,bossId=identity(boss),occ=Number(prop(boss,'occ'));
    const nativeBoss=read(()=>W._ft?._tY?.ins?.isBoss?.(occ));
    if(!boss||boss.isValid===false||!bossId||Number(prop(boss,'type'))!==1||![true,1].includes(nativeBoss)){
      const result={at:Date.now(),available:false,reason:'no_selected_native_boss'};
      if(show)console.log('[Boss]',result);return result;
    }
    const cfg=read(()=>W._ft?._tY?.ins?.getCfgById?.(occ));
    const bc=read(()=>boss.getComponent?.(Combat)),selector=read(()=>boss.getComponent?.(Skill));
    const cast=read(()=>W.KVPV_TQ113?.status?.(false)),impact=read(()=>W.KVPV_TQ112?.status?.(false));
    const castModel=String(cast?.bossId??'')===bossId?cast:null;
    const impactModel=String(impact?.selectedBoss??'')===bossId?impact:null;
    const rows=[...(Array.isArray(selector?._rtt)?selector._rtt:[]),...(Array.isArray(selector?._wet)?selector._wet:[])].slice(0,64);
    const trained=Array.isArray(castModel?.trained)?castModel.trained:[];
    const ids=[...new Set([...rows.map(row=>Number(row?.[0])),...trained.map(row=>Number(row.skillId)),Number(castModel?.pending?.skillId)].filter(id=>Number.isSafeInteger(id)&&id>0))].slice(0,32);
    const skills=ids.map(skillId=>{
      const live=read(()=>bc?._mvt?.(skillId)),fallback=live?null:read(()=>W._ft?._nY?.ins?.getCfgBySkillIdAndLv?.(skillId,1)),config=live??fallback;
      return {skillId,name:typeof config?.[2]==='string'?config[2]:null,configSource:live?'boss_native_config':fallback?'level_1_fallback_not_confirmed_boss_level':'unavailable',nativeRows:rows.filter(row=>Number(row?.[0])===skillId).map(raw),configRaw:raw(config),observedCastToDamageMs:snapshot(trained.find(row=>Number(row.skillId)===skillId)?.castToImpactMs??[])};
    });
    const hp=snapshot(prop(boss,'hp')),hpNow=Array.isArray(hp)?Number(hp[0]):NaN,hpMax=Array.isArray(hp)?Number(hp[1]):NaN;
    const result=snapshot({version:1,at:Date.now(),available:true,actor:actorId,bossId,occ,name:prop(boss,'name'),scene:scene(),hp,hpPct:Number.isFinite(hpNow)&&Number.isFinite(hpMax)&&hpMax>0?100*hpNow/hpMax:null,distance:radius(r.a,boss),nativeBossRange:Number.isFinite(Number(cfg?.[3]))&&Number(cfg?.[3])>0?Number(cfg[3]):null,bossConfigRaw:raw(cfg),bossAnimationPlaying:read(()=>bc?._jh?.isPlaying),skills,existingCastModel:castModel,existingImpactModel:impactModel,limits:'Read-only snapshot using existing observations. No new timers or combat hooks. Configured range is not a guaranteed dodge boundary; static config is not cast windup. Missing skills/signals remain unknown.'});
    if(show){console.table([{name:result.name,bossId,occ,hpPct:result.hpPct,distance:result.distance,nativeBossRange:result.nativeBossRange}]);console.table(result.skills);console.log('[Boss]',result);}return result;
  }
  function dps(show=true){const p=metrics?.report()??null;if(p){const boss=bossInfo(false);p.bossInfo=boss;p.skill1008=skill1008Info(false);p.trial1008=trial1008Report();p.bossMatchesEncounter=!!boss.available&&String(p.current?.bossId??'')===boss.bossId;}if(show){if(p?.current){console.table(Object.entries(p.current.groups).map(([group,values])=>({group,...values})));console.table(p.current.skills.map(r=>({id:r.id,group:r.group,hits:r.hits,matchedDamage:r.matchedDamage,matchedDps:r.matchedDps,rolling10sMatchedDps:r.rolling10sMatchedDps,averageMatchedDamage:r.averageMatchedDamage,animationWaitMs:r.animationWaitMs,animationWaitAverageMs:r.animationWaitAverageMs,animationWaitMaxMs:r.animationWaitMaxMs,unconfirmed:r.unconfirmed})));}console.log('[DPS matched]',p);}return p;}
// [VI dòng gốc 678] Định nghĩa hàm setBurst; tham số: enabled=true. Mục đích: bật/tắt chế độ thử tung nhóm chiêu; false là tắt | gán burst.enabled bằng !!enabled | Kiểm tra burst.enabled: đúng thì chạy nhánh sau if. | gán mixed.enabled bằng false
  function setBurst(enabled=true){burst.enabled=!!enabled;if(burst.enabled){mixed.enabled=false;basicProbe.enabled=false;}burst.nextAt=0;return {enabled:burst.enabled,experimental:true,maps:['THIEN_QUAN','LINH_LUNG','PHU_VAN','TRU_TIEN']};}
// [VI dòng gốc 679] Định nghĩa hàm setBasicProbe; tham số: enabled=true. Mục đích: bật/tắt phép thử đòn thường có giới hạn | gán basicProbe.enabled bằng !!enabled | Kiểm tra basicProbe.enabled: đúng thì chạy nhánh sau if. | gán mixed.enabled bằng false
  function setBasicProbe(enabled=true){basicProbe.enabled=!!enabled;if(basicProbe.enabled){mixed.enabled=false;burst.enabled=false;}basicProbe.attempts=0;basicProbe.hits=0;basicProbe.damage=0;basicProbe.startedAt=null;basicProbe.nextAt=0;return {enabled:basicProbe.enabled,maxAttempts:8,maxDurationMs:15000};}
// [VI dòng gốc 680] Chú thích gốc của tác giả; không được thực thi. Nội dung: Tuyệt Học → đánh thường → Tuyệt Học; không sửa hồi chiêu, không chờ nếu loại chiêu ưu tiên chưa sẵn sàng.
  // Tuyệt Học → đánh thường → Tuyệt Học; không sửa hồi chiêu, không chờ nếu loại chiêu ưu tiên chưa sẵn sàng.
// [VI dòng gốc 681] Định nghĩa hàm setInterleaved; tham số: enabled=true, distance=302. Mục đích: bật/tắt bộ chọn xen đòn thường và đặt khoảng cách mục tiêu | gán mixed.enabled bằng !!enabled | gán mixed.wantBasic bằng false | gán mixed.suspended bằng false
  function setInterleaved(enabled=true,distance=302){mixed.enabled=!!enabled;mixed.wantBasic=false;mixed.suspended=false;mixed.unconfirmed=0;
// [VI dòng gốc 682] Kiểm tra mixed.enabled: đúng thì chạy nhánh sau if. | gán burst.enabled bằng false | gán basicProbe.enabled bằng false | gọi setDistance(distance)
    if(mixed.enabled){burst.enabled=false;basicProbe.enabled=false;setDistance(distance);}
// [VI dòng gốc 683] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm enabled, distance, burst, basicProbe.
    return {enabled:mixed.enabled,distance:CFG.goal,burst:burst.enabled,basicProbe:basicProbe.enabled};}
// [VI dòng gốc 684] Định nghĩa hàm setBasicPace; tham số: value=1. Mục đích: đặt khoảng chờ thêm phía client cho đòn tay; 0 nghĩa là không thêm thời gian chờ | Kiểm tra value===null: đúng thì chạy nhánh sau if. | gán mixed.basicPaceMs bằng null | gọi mixed.ready.clear()
  function setBasicPace(value=1){if(value===null){mixed.basicPaceMs=null;mixed.ready.clear();return {enabled:false};}
// [VI dòng gốc 685] Khai báo biến không gán lại bằng const: n = gọi Number(value) để chuyển sang số | Kiểm tra !Number.isFinite(n)||n<0||n>1000: đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('Basic client wait must be 0..1000 ms')
    const n=Number(value);if(!Number.isFinite(n)||n<0||n>1000)throw Error('Basic client wait must be 0..1000 ms');
// [VI dòng gốc 686] gán mixed.basicPaceMs bằng n | gọi mixed.ready.clear() | Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm enabled, clientWaitMs, nativeAnimationGate.
    mixed.basicPaceMs=n;mixed.ready.clear();return {enabled:true,clientWaitMs:n,nativeAnimationGate:true};}
// [VI dòng gốc 687] Định nghĩa hàm setPrimaryBasic; tham số: enabled=true. Mục đích: bật/tắt ưu tiên kỹ năng đánh thường đã chọn | gán mixed.primary bằng !!enabled | gán mixed.primaryStreak bằng 0 | gán mixed.wantBasic bằng mixed.primary&&!mixed.suspended
  function setPrimaryBasic(enabled=true){mixed.primary=!!enabled;mixed.primaryStreak=0;mixed.wantBasic=mixed.primary&&!mixed.suspended;mixed.ready.clear();return {enabled:mixed.primary,skillId:primaryBasicId(),clientWaitMs:mixed.basicPaceMs,nativeCombatGate:true};}
// [VI dòng gốc 688] Định nghĩa hàm setAfterTHWait; tham số: value=1. Mục đích: đặt thời gian chờ thêm sau Tuyệt Học theo mili giây | Kiểm tra !Number.isFinite(value)||value<0||value>1000: đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('TH wait must be 0..1000 ms') | gán CFG.afterTHWaitMs bằng value
  function setAfterTHWait(value=1){if(!Number.isFinite(value)||value<0||value>1000)throw Error('TH wait must be 0..1000 ms');CFG.afterTHWaitMs=value;return value;}
// [VI dòng gốc 689] Định nghĩa hàm setBasicHitQuota; tham số: value=null. Mục đích: đặt số đòn thường đã xác nhận trước khi cho Tuyệt Học; chế độ basicOnly vẫn chặn Tuyệt Học | Kiểm tra value!==null&&(!Number.isSafeInteger(value)||value<1): đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('Hit quota must be a positive integer') | gán mixed.hitQuota bằng value
  function setBasicHitQuota(value=null){if(value!==null&&(!Number.isSafeInteger(value)||value<1))throw Error('Hit quota must be a positive integer');mixed.hitQuota=value;mixed.confirmedSinceTH=0;mixed.thCycles=0;mixed.wantBasic=mixed.primary;return value;}
// [VI dòng gốc 690] Định nghĩa hàm setBasicRotation; tham số: ids=[]. Mục đích: chọn danh sách ID đòn thường được phép luân phiên | Kiểm tra !Array.isArray(ids)||ids.some(id=>!isBasic(id)||excludedBasics.has(id)): đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('Rotation requires allowed native basic IDs') | gán mixed.rotation bằng [...new Set(ids)]
  function setBasicRotation(ids=[]){if(!Array.isArray(ids)||ids.some(id=>!isBasic(id)||excludedBasics.has(id)))throw Error('Rotation requires allowed native basic IDs');mixed.rotation=[...new Set(ids)];mixed.rotationCursor=0;mixed.primaryStreak=0;mixed.wantBasic=mixed.primary&&!mixed.suspended;return basicRotation();}
// [VI dòng gốc 691] Định nghĩa hàm releaseOutsideScope; tham số: không có | Kiểm tra (W.KVPV_FAR_SCOPE??W.KVPV_TQ_SCOPE)?.inside?.()!==false: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: false.
  function releaseOutsideScope(){if((W.KVPV_FAR_SCOPE??W.KVPV_TQ_SCOPE)?.inside?.()!==false)return false;
// [VI dòng gốc 692] Kiểm tra !ST.s&&!ST.c&&!ST.target&&!ST.movement.length: đúng thì chạy nhánh sau if. | Kết thúc hàm hiện tại và trả về: true.
    if(!ST.s&&!ST.c&&!ST.target&&!ST.movement.length)return true;
// [VI dòng gốc 693] Kiểm tra ST.c&&ST.c.obj?.combat?.__KVPV_GUARD_PARENT===ST.c.fn: đúng thì chạy nhánh sau if. | gọi W.KVPV_HITRUN1?.stop('Leave far-map hook ownership') để dừng bộ điều khiển và dọn tài nguyên (bỏ qua truy cập/gọi khi phần tùy chọn không tồn tại)
    if(ST.c&&ST.c.obj?.combat?.__KVPV_GUARD_PARENT===ST.c.fn)W.KVPV_HITRUN1?.stop?.('Leave far-map hook ownership');
// [VI dòng gốc 694] gọi unbind() | gọi unlisten() | gán ST.moveGoal bằng null | Kết thúc hàm hiện tại và trả về: true.
    unbind();unlisten();ST.moveGoal=null;return true;
// [VI dòng gốc 695] Đóng khối/hàm/mảng/lời gọi đã mở; dấu phẩy hoặc chấm phẩy kết thúc phần tương ứng.
  }
// [VI dòng gốc 696] Định nghĩa hàm setBasicOnly; tham số: enabled=true. Mục đích: bật/tắt chế độ nhân vật chỉ dùng đòn tay 8001 trong Thiên Quan, Linh Lung, Phù Văn và Tru Tiên | gán CFG.basicOnly bằng !!enabled | gán CFG.scanMs bằng enabled?1:8
  function setBasicOnly(enabled=true){CFG.basicOnly=!!enabled;CFG.scanMs=enabled?1:4;
// [VI dòng gốc 697] Kiểm tra enabled: đúng thì chạy nhánh sau if. | gán mixed.enabled bằng true | gán mixed.primary bằng true | gán mixed.rotation bằng [8001]
    if(enabled){mixed.enabled=true;mixed.primary=true;mixed.rotation=[8001];mixed.rotationCursor=0;mixed.wantBasic=true;mixed.basicPaceMs=0;mixed.ready.clear();burst.enabled=false;basicProbe.enabled=false;CFG.clientPaceMs=0;}
// [VI dòng gốc 698] Kiểm tra ST.timer!==null: đúng thì chạy nhánh sau if. | gọi W.KVPV_V1?.timers?.clearInterval??W.clearInterval(ST.timer) | gán ST.timer bằng (W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,CFG.scanMs)
    if(ST.timer!==null){(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(ST.timer);ST.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,CFG.scanMs);}
// [VI dòng gốc 699] Kết thúc hàm hiện tại và trả về: tạo đối tượng gồm enabled, skillId, scanMs, addedClientWaitMs, serverMultiplierVerified.
    return {enabled:CFG.basicOnly,skillId:8001,scanMs:CFG.scanMs,addedClientWaitMs:CFG.clientPaceMs,serverMultiplierVerified:false};}
// [VI dòng gốc 700] Định nghĩa hàm setBasicAnimationSpeed; tham số: factor=1. Mục đích: đặt hệ số phát hoạt ảnh 8001 phía client; không phải hệ số sát thương server | Kiểm tra ![1,9,99,99999].includes(factor): đúng thì chạy nhánh sau if. | Ném lỗi và chuyển luồng tới catch gần nhất: gọi Error('Native animation factor must be 1, 9 or 99') | gọi finishSpeedTrial('stopped')
  // 1 restores native visuals. 9/30/99 reduce only Tuyet Hoc visual duration.
  // On-demand intelligence report only; never called on the 1ms combat loop.
  function tianQuan4100Diagnosis(show=true){
    const current=metrics?.report()?.current??null,pilot=pilot4100Status(),
      states=current?.timeMs??{},elapsedMs=current?.elapsedMs??null;
    const rows=Object.entries(states).map(([reason,ms])=>({reason,ms,
      pct:elapsedMs>0?+(ms/elapsedMs*100).toFixed(1):null})).sort((a,b)=>b.ms-a.ms);
    const relevant=current?.skills??[],basic=relevant.filter(r=>r.group==='basic'),
      th=relevant.filter(r=>r.group==='tuyetHoc');
    const groupInfo=rows=>({casts:rows.reduce((n,r)=>n+r.attempts,0),
      directHits:rows.reduce((n,r)=>n+r.hits,0),unconfirmed:rows.reduce((n,r)=>n+r.unconfirmed,0),
      directDamage:rows.reduce((n,r)=>n+r.matchedDamage,0)});
    const recommendations=[];
    const spent=key=>Number(states[key]||0);
    if(spent('positioning')>0.2*Number(elapsedMs||0))
      recommendations.push('Positioning is costly: inspect moving Boss/orbit/retries before changing damage rotation.');
    if(spent('waiting_native_animation')>0.2*Number(elapsedMs||0))
      recommendations.push('Native animation gate dominates: inspect animationWaitMs, never assume client visual speed reduces server cooldown.');
    if(spent('native_cooldown')+spent('waiting_native_cooldown')>0.2*Number(elapsedMs||0))
      recommendations.push('Native cooldown dominates: prioritize higher confirmed damage on ready skills; 1ms polling cannot shorten server cooldown.');
    if(spent('skill_readiness')+spent('waiting_ready_tuyet_hoc')>0.2*Number(elapsedMs||0))
      recommendations.push('Skill readiness dominates: inspect verified TH range and client/native pending casts.');
    if(pilot.phase==='chosen')
      recommendations.push('Boss HP A/B selected '+pilot.selectedMode+'; improvement is observed, not guaranteed on the next Boss.');
    if(!recommendations.length)
      recommendations.push('Need more confirmed Boss-HP and cast-hit observations before choosing a safe acceleration.');
    const out={stage:Number(W._Ba?._Co?._Mo?.ins?.curLv)||null,scope:W.KVPV_FAR_SCOPE?.status?.()?.kind??null,
      distance:radius(role().a,role().c?.target),configuredBossRange:bossRange(),
      elapsedMs,topTimeCosts:rows.slice(0,8),directMatchedDps:current?.summary?.matchedDps??null,
      rolling10sMatchedDps:current?.summary?.rolling10sMatchedDps??null,
      skillGroups:{basic:groupInfo(basic),tuyetHoc:groupInfo(th)},
      dpsPilot:pilot,recommendations,
      warning:'Client matched-hit DPS omits some damage sources; Boss HP drops can include companions/other players. No server speed guarantee.'};
    if(show){console.table(out.topTimeCosts);console.table(out.skillGroups);console.log('[La Phong 4100]',out);}return out;
  }
  function setTianQuan4100Pilot(enabled=true){pilot4100.enabled=enabled===true;
    if(pilot4100.enabled)basicSolo4100.enabled=false;
    resetPilot4100();return pilot4100Status();}
  function setTianQuanLuoFeng(enabled=true){
    luoFeng.enabled=!!enabled;
    if(enabled)cosmic.enabled=true;else resetApexRhythm();
    return {enabled:luoFeng.enabled,scope:'THIEN_QUAN',sampleWindow:luoFeng.sampleWindow,
      inheritedCosmic:cosmic.enabled,nativeCooldownUnchanged:true};
  }
  function setTianQuanCosmic(enabled=true){cosmic.enabled=!!enabled;
    return {enabled:cosmic.enabled,scope:'THIEN_QUAN',nativeOnly:true,requiresMatchedHits:2,exploreEvery:7};}
  function setTianQuanTHGapBasics(enabled=true,windowMs=1200){
    if(!Number.isInteger(windowMs)||windowMs<100||windowMs>2000)throw Error('TH gap window must be 100..2000ms');
    thGap.enabled=!!enabled;thGap.windowMs=windowMs;if(!thGap.enabled)resetThGap();
    return {enabled:thGap.enabled,windowMs:thGap.windowMs,nativeReadyOnly:true,perTHLimit:1};
  }
  function setTianQuanTuyetHocVisualSpeed(factor=99){
    if(![1,9,30,99].includes(factor))throw Error('TH visual speed must be 1, 9, 30 or 99');
    CFG.tqTuyetHocVisualSpeed=factor;
    if(factor===1)restoreSpeedClips();
    return {factor,scope:'THIEN_QUAN',ids:[1001,1002,1003,1004,1005,1006,1007,1008],visualOnly:true,serverCooldownUnchanged:true};
  }
  function setBasicAnimationSpeed(factor=1){if(![1,9,99,99999].includes(factor))throw Error('Native animation factor must be 1, 9 or 99');finishSpeedTrial('stopped');restoreSpeedClips();CFG.basicAnimationSpeed=factor;return {factor,scope:['THIEN_QUAN','LINH_LUNG','PHU_VAN','TRU_TIEN'],playerSkillId:8001,serverDamageMultiplierVerified:false};}
// [VI dòng gốc 701] Khai báo biến không gán lại bằng const: api = tạo đối tượng gồm setBasicAnimationSpeed, startBasicSpeedTrial, setBasicOnly, isBasicOnly, releaseOutsideScope, setClientPace, setConfirmedTailCut, startConfirmedTailStudy, startBasicRangeTest, setAfterTHWait, setBasicHitQuota, setBasicRotation, setPrimaryBasic, setBasicPace, setInterleaved, setBasicProbe, setBurst, performance, version, start, stop, status, report, setDistance, repairPolling, sync, export, his…
  function setTianQuanFiveBasics(enabled=true,wait=10){if(!tqFive)throw Error('Thiếu module đo năm chiêu tay.');const out=tqFive.configure(enabled,wait);mixed.ready.clear();mixed.rotationCursor=0;if(ST.timer!==null){(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(ST.timer);ST.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,CFG.scanMs);}return out;}
  function setTianQuanTuyetHoc(enabled=true){if(!tqFive)throw Error('Thiếu module combo Thiên Quan.');return tqFive.setTuyetHoc(enabled);}
  function startTianQuanBasicRangeTest(distances){if(!ST.running)throw Error('Chờ bộ đánh Thiên Quan chạy trước.');if(!tqFive)throw Error('Thiếu module đo tầm.');const out=tqFive.start(distances);ST.moveGoal=null;ST.positioning=true;ST.lastMove=-Infinity;mixed.ready.clear();mixed.rotationCursor=0;return out;}
  function stopTianQuanBasicRangeTest(){const out=tqFive?.stop('manual stop');ST.moveGoal=null;ST.positioning=true;ST.lastMove=-Infinity;return out;}
  function setSkillPriority(value='tuyet_hoc_first'){
    if(!['tuyet_hoc_first','interleaved'].includes(value))throw Error('Skill priority must be tuyet_hoc_first or interleaved');
    skillPriority=value;return {skillPriority};
  }
  const api={basicRangeProbeGoal:()=>tqFive?.goal()??null,startTianQuan4100CooldownExperiment,setTianQuan4100CooldownOverride,setLocalLogAutoClear,tianQuan4100Diagnosis,setTianQuan4100BasicSolo,setTianQuan4100Pilot,setTianQuanLuoFeng,setTianQuanCosmic,setTianQuanTHGapBasics,setTianQuanTuyetHocVisualSpeed,setTianQuanTuyetHoc,setTianQuanFiveBasics,startTianQuanBasicRangeTest,stopTianQuanBasicRangeTest,rangeReport:()=>tqFive?.report()??null,setSkillPriority,setBasicAnimationSpeed,startBasicSpeedTrial,setBasicOnly,isBasicOnly:()=>tqFive?.active()?(basicSolo4100Active()||!tqFive.allowsTuyetHoc()):CFG.basicOnly,releaseOutsideScope,setClientPace,setConfirmedTailCut,startConfirmedTailStudy,startBasicRangeTest,setAfterTHWait,setBasicHitQuota,setBasicRotation,setPrimaryBasic,setBasicPace,setInterleaved,setBasicProbe,setBurst,performance,dps,bossInfo,skill1008Info,start1008Trial,stop1008Trial,trial1008Report,version:'1.0.0',start,stop,status,report,setDistance,repairPolling,sync:tick,export:()=>JSON.stringify(report(),null,2),history:()=>ST.history.slice()};
// [VI dòng gốc 702] gán W.KVPV_TH300 bằng api
  W.KVPV_TH300=api;
// [VI dòng gốc 703] gọi console.info(TAG, 'READY/OFF. START: KVPV_MODE.start("BOSS_TH300_SCAN") then KVPV_MODE.start("BOSS_TH300")')
  console.info(TAG,'READY/OFF. START: KVPV_MODE.start("BOSS_TH300_SCAN") then KVPV_MODE.start("BOSS_TH300")');
// [VI dòng gốc 704] Tiếp tục hàm hàm không đặt tên; thành phần cú pháp bắt đầu bằng }. Đọc cùng dòng mở phía trên: })();
})();
// [VI dòng gốc 705] Dòng trống để tách các phần, không có lệnh thực thi.
