/* Consolidated skill-related source modules. Each section retains its original standalone source. */

function __KVPV_SKILL_SOURCE_00_combat_metrics_js() {
/* KVPV_SKILL_SOURCE_BEGIN 00-combat-metrics.js */



(() => {
  window.KVPV_COMBAT_METRICS=Object.freeze({create(){
    let active=null;const completed=[];
    const at=()=>Date.now();
    const combatStates=new Set(['fighting','native_cooldown','skill_readiness','waiting_pace','waiting_burst_gap','dungeon_native_finish_2pct']);
    const group=id=>id>=8001&&id<=8005?'basic':id>=1001&&id<=1008?'tuyetHoc':'other';
    const rate=(damage,ms)=>ms>0?damage*100/ms:null;
    function finishAnimation(now,interrupted=false){if(!active?.animation)return;const wait=active.animation,r=row(wait.id),duration=Math.max(0,now-wait.startedAt);if(r){r.animationWaitMs+=duration;r.animationWaitEpisodes++;r.animationWaitMaxMs=Math.max(r.animationWaitMaxMs,duration);}if(interrupted)active.animationCensored++;active.animation=null;}
    function charge(now){if(active){const delta=Math.max(0,now-active.updatedAt);active.timeMs[active.state]=(active.timeMs[active.state]||0)+delta;if(active.eligible)active.attackWindowMs+=delta;active.updatedAt=now;}}
    function row(id){if(!active)return null;if(!active.skills.has(id)&&active.skills.size<64)active.skills.set(id,{id,attempts:0,hits:0,matchedDamage:0,unconfirmed:0,interrupted:0,lastPaceMs:null,animationWaitMs:0,animationWaitEpisodes:0,animationWaitMaxMs:0});return active.skills.get(id);}
    function snapshot(s,now){const timeMs={...s.timeMs};if(s===active)timeMs[s.state]=(timeMs[s.state]||0)+Math.max(0,now-s.updatedAt);
      const elapsedMs=Math.max(0,(s.endedAt??now)-s.startedAt),attackWindowMs=s.attackWindowMs+(s===active&&s.eligible?Math.max(0,now-s.updatedAt):0),end=s.endedAt??now,windowMs=Math.min(10000,elapsedMs);
      const recent=s.damageEvents.filter(e=>e.at>end-10000&&e.at<=end),pending=new Map(),rolling=new Map();for(const id of s.pending.values())pending.set(id,(pending.get(id)||0)+1);for(const e of recent)rolling.set(e.id,(rolling.get(e.id)||0)+e.damage);
      const skills=[...s.skills.values()].map(r=>({...r,animationWaitMs:r.animationWaitMs+(s===active&&s.animation?.id===r.id?Math.max(0,now-s.animation.startedAt):0),animationWaitOngoingMs:s===active&&s.animation?.id===r.id?Math.max(0,now-s.animation.startedAt):0,animationWaitAverageMs:r.animationWaitEpisodes?r.animationWaitMs/r.animationWaitEpisodes:null,group:group(r.id),pending:pending.get(r.id)||0,matchedDps:rate(r.matchedDamage,elapsedMs),attackWindowContributionDps:rate(r.matchedDamage,attackWindowMs),rolling10sMatchedDps:rate(rolling.get(r.id)||0,windowMs),averageMatchedDamage:r.hits?r.matchedDamage/r.hits:null,confirmationRate:r.hits+r.unconfirmed>0?r.hits/(r.hits+r.unconfirmed):null}));
      const groups=Object.fromEntries(['basic','tuyetHoc','other'].map(key=>{const selected=skills.filter(r=>r.group===key),damage=selected.reduce((n,r)=>n+r.matchedDamage,0),rollingDamage=recent.filter(e=>group(e.id)===key).reduce((n,e)=>n+e.damage,0);return [key,{matchedDamage:damage,hits:selected.reduce((n,r)=>n+r.hits,0),attempts:selected.reduce((n,r)=>n+r.attempts,0),matchedDps:rate(damage,elapsedMs),attackWindowContributionDps:rate(damage,attackWindowMs),rolling10sMatchedDps:rate(rollingDamage,windowMs)}];}));
      const matchedDamage=skills.reduce((n,r)=>n+r.matchedDamage,0);
      return {key:s.key,bossId:s.bossId,occ:s.occ,scene:s.scene,startedAt:s.startedAt,endedAt:s.endedAt,reason:s.reason,
        bossName:s.bossName??'',actor:s.actor??null,elapsedMs,attackWindowMs,state:s.state,timeMs,recoveryResumes:s.resumes,
        summary:{matchedDamage,matchedDps:rate(matchedDamage,elapsedMs),attackWindowContributionDps:rate(matchedDamage,attackWindowMs),rolling10sMatchedDps:rate(recent.reduce((n,e)=>n+e.damage,0),windowMs),rollingWindowMs:windowMs,rollingBufferTruncated:s.rollingTruncated},groups,
        animationAttribution:'FIGHT animation-blocked time attributed to the latest observed controller cast, not proven skill duration or server lock. In-progress waits are included in total only; waits ended by a cast or encounter close are censored.',animationCensored:s.animationCensored,paceMs:s.paceMs,paceReason:s.paceReason,paceHistory:s.paceHistory.map(x=>({...x})),skills};}
    function close(reason='target_changed'){if(!active)return;const now=at();charge(now);finishAnimation(now,true);
      for(const id of active.pending.values()){const r=row(id);if(r)r.interrupted++;}active.pending.clear();
      active.endedAt=now;active.reason=reason;completed.push(snapshot(active,now));if(completed.length>20)completed.shift();active=null;}
    return Object.freeze({
      open(info){if(active?.key===info.key)return;close();const now=at();active={...info,startedAt:now,endedAt:null,reason:'active',
        lastCastId:null,animation:null,animationCensored:0,updatedAt:now,state:'initializing',timeMs:{},attackWindowMs:0,eligible:false,damageEvents:[],rollingTruncated:false,skills:new Map(),pending:new Map(),resumes:0,paceMs:null,paceReason:null,paceHistory:[]};},
      close,
      state(reason,phase,pace,paceReason){if(!active)return;charge(at());
        active.state=phase==='RETREAT'?'recovery':phase==='DODGE'?'dodge':phase==='KITE'?'kite':
          /position|move_wait|unknown_position/.test(reason)?'positioning':reason==='waiting_native_cooldown'?'native_cooldown':
          reason==='waiting_ready_tuyet_hoc'?'skill_readiness':reason==='hidden_tab'?'hidden':
          reason==='casting_native_skill'||reason==='holding_far'?'fighting':reason;
        const animationId=phase==='FIGHT'&&active.state==='waiting_native_animation'?active.lastCastId:null;
        if(active.animation&&active.animation.id!==animationId)finishAnimation(at(),phase!=='FIGHT');
        if(animationId!==null&&!active.animation)active.animation={id:animationId,startedAt:at()};
        active.eligible=phase==='FIGHT'&&combatStates.has(active.state);
        if(active.paceMs!==pace||active.paceReason!==(paceReason??null)){active.paceHistory.push({at:at(),paceMs:pace,reason:paceReason??null});if(active.paceHistory.length>60)active.paceHistory.shift();}
        active.paceMs=pace;active.paceReason=paceReason??null;},
      cast(serial,id,pace){const r=row(id);if(!r)return;finishAnimation(at(),true);active.lastCastId=id;r.attempts++;r.lastPaceMs=pace;
        if(active.pending.size>=250){const [old,oldId]=active.pending.entries().next().value;row(oldId).interrupted++;active.pending.delete(old);}active.pending.set(serial,id);},
      result(serial,hit,damage=0,interrupted=false){if(!active?.pending.has(serial))return;const id=active.pending.get(serial),r=row(id);active.pending.delete(serial);
        if(hit){const amount=Number.isFinite(Number(damage))&&Number(damage)>0?Number(damage):0;r.hits++;r.matchedDamage+=amount;const now=at();active.damageEvents.push({id,damage:amount,at:now});while(active.damageEvents.length&&active.damageEvents[0].at<=now-10000)active.damageEvents.shift();if(active.damageEvents.length>1024){active.damageEvents.shift();active.rollingTruncated=true;}}else if(interrupted)r.interrupted++;else r.unconfirmed++;},
      resume(){if(active)active.resumes++;},
      report(){return {current:active?snapshot(active,at()):null,completed:JSON.parse(JSON.stringify(completed)),
        limits:{completedBosses:20,skillsPerBoss:64,pendingCasts:250,rollingDamageEvents:1024},
        interpretation:'Matched direct-hit DPS only; may omit DOT/later multi-hit/companion damage. Encounter DPS includes positioning/dodge/recovery. Attack-window contribution divides by controller FIGHT attack/readiness time, not individual skill duration. Unconfirmed is not a proven miss. Rolling DPS uses at most 10 seconds and a bounded event buffer. No automatic combo changes.'};}
    });
  }});
})();
/* KVPV_SKILL_SOURCE_END 00-combat-metrics.js */
}

function __KVPV_SKILL_SOURCE_00_skill_async_observer_js() {
/* KVPV_SKILL_SOURCE_BEGIN 00-skill-async-observer.js */
/* Async skill readiness observer: never casts or overrides cooldown/animation.
 * Combat remains the sole native sender. */
(() => {
 'use strict';
 const W=window,old=W.KVPV_SKILL_ASYNC_OBSERVER;old?.stop?.();
 const actor=String(W.__KVPV_OWN_ACTOR_ID??'');
 const ids=[8001,8002,8003,8004,8005,1001,1002,1003,1004,1005,1006,1007,1008];
 const S={timer:null,enabled:true,busy:false,checks:0,updatedAt:0,reason:'waiting_role',skills:[],error:''};
 const pollMs=10; // Read-only TH readiness sampling, never a casting interval.
 const owned=()=>!!actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;
 const role=()=>{const world=W._C?._Ba?.instance;return world?.getRole?.(Number(actor))??world?.getRole?.(actor);};
 async function scan(){
   if(!S.enabled||S.busy)return;
   if(!owned()){S.reason='waiting_actor';return;}
   S.busy=true;
   try{
     // Never call selectSkill/combat/isCooldown here: native decisions are authoritative.
     const a=role(),components=a?Object.values(a._components??{}):[];
     const skills=components.find(c=>Array.isArray(c?._rtt)||Array.isArray(c?._wet));
     if(!skills){S.reason='waiting_skill_component';return;}
     const rows=[...(skills._rtt??[]),...(skills._wet??[])];
     const known=new Map(rows.filter(Array.isArray).map(row=>[Number(row[0]),row]));
     await Promise.resolve();
     if(!S.enabled||!owned())return;
     const now=Date.now();
     S.skills=ids.map(id=>{const row=known.get(id),readyAt=Number(row?.[1]);
       return {id,learned:!!row,nativeRowPresent:!!row,
         nativeReadyAt:row&&Number.isFinite(readyAt)?readyAt:null,
         estimatedRemainingMs:row&&Number.isFinite(readyAt)?Math.max(0,readyAt-now):null};
     });
     S.checks++;S.updatedAt=Date.now();S.reason='observed_native_skill_inventory';S.error='';
   }catch(e){S.error=String(e?.message??e);S.reason='observer_error';}
   finally{S.busy=false;}
 }
 function stop(){S.enabled=false;if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)?.(S.timer);S.timer=null;}
 function start(){S.enabled=true;if(S.timer===null){const owner=W.KVPV_V1?.timers?.setInterval?W.KVPV_V1.timers:W;const set=owner?.setInterval;if(typeof W.setInterval==='function'&&typeof set==='function')S.timer=set.call(owner,()=>{void scan();},pollMs);else S.reason='waiting_timer_api';}void scan();return status();}
 function status(){return {enabled:S.enabled,actor,observerOnly:true,castsByObserver:0,pollMs,checks:S.checks,updatedAt:S.updatedAt,reason:S.reason,error:S.error,skills:S.skills.slice()};}
 W.KVPV_SKILL_ASYNC_OBSERVER=Object.freeze({scan,start,stop,status});
 start();
})();/* KVPV_SKILL_SOURCE_END 00-skill-async-observer.js */
}

function __KVPV_SKILL_SOURCE_00_skill_pacing_js() {
/* KVPV_SKILL_SOURCE_BEGIN 00-skill-pacing.js */





/* Bounded pacing based on completed direct-hit observations, not send counts. */

(() => {

  window.KVPV_SKILL_PACING=Object.freeze({create(){



    const steps=[1,5,10,25,50,75,125,200,350,500];let pace=1,context='',batch=[],changes=0,accepted=0,ignored=0,lastAction='learning';

    return Object.freeze({



      context(key){if(key!==context){context=key;pace=1;batch=[];accepted=0;ignored=0;lastAction='new_boss_baseline';}},



      observe(hit,qualified){if(!qualified){ignored++;return;}accepted++;batch.push(hit===true);

        if(batch.length<8)return;

        const hits=batch.filter(Boolean).length,index=steps.indexOf(pace);batch=[];



        if(hits>=7&&index>0){pace=steps[index-1];changes++;lastAction='faster_after_observed_hits';}

        else if(hits<=4&&index<steps.length-1){pace=steps[index+1];changes++;lastAction='slower_after_missing_confirmations';}

        else lastAction='hold_inconclusive';

      },

      pace:()=>pace,

      status:()=>({enabled:true,context,paceMs:pace,minMs:1,maxMs:500,batchSize:8,pendingSamples:batch.length,

        acceptedSamples:accepted,ignoredSamples:ignored,changes,lastAction,

        note:'Only skills already proven by two direct cast-hit pairs affect tuning. Missing confirmation is not proof of a server rejection.'})

    });

  }});

})();

/* KVPV_SKILL_SOURCE_END 00-skill-pacing.js */
}



function __KVPV_SKILL_SOURCE_00_tq_basic_profile_js() {
/* KVPV_SKILL_SOURCE_BEGIN 00-tq-basic-profile.js */
(() => {
  'use strict';
  window.KVPV_TQ_BASIC_PROFILE=Object.freeze({create(env){
    const allIds=[8001,8002,8003,8004,8005];let ids=allIds.slice();
    let enabled=false,waitMs=10,tuyetHoc=false;
    const active=()=>enabled&&['THIEN_QUAN','LINH_LUNG','PHU_VAN'].includes(env.scope());
    const learned=()=>ids.filter(id=>env.learned().includes(id));
    function report(){return {enabled,active:active(),tuyetHocEnabled:tuyetHoc,tuyetHocActive:active()&&tuyetHoc,waitClientMs:waitMs,ids,learned:learned()};}
    return Object.freeze({active,allowsTuyetHoc:()=>active()&&tuyetHoc,setTuyetHoc(value=true){tuyetHoc=!!value;return report();},wait:()=>waitMs,goal:()=>null,ids:()=>ids.slice(),canAttempt:()=>true,tick(){},cast(){},hit(){},report,
      configure(on=true,wait=10,skillIds=null){if(!Number.isFinite(wait)||wait<0||wait>1000)throw Error('Wait must be 0..1000ms');if(skillIds!==null&&(!Array.isArray(skillIds)||!skillIds.length||skillIds.some(id=>!allIds.includes(Number(id)))))throw Error('Basic profile requires native IDs 8001..8005');enabled=!!on;waitMs=wait;ids=skillIds===null?allIds.slice():[...new Set(skillIds.map(Number))];return report();}});
  }});
})();
/* KVPV_SKILL_SOURCE_END 00-tq-basic-profile.js */
}

function __KVPV_SKILL_SOURCE_07_th300_hitrun_compat_js() {
/* KVPV_SKILL_SOURCE_BEGIN 07-th300-hitrun-compat.js */
/* Minimal compatibility for old TH300 SCAN coordinator.
 * Only one native TH300 sender; no client cooldown or server changes.
 * TH300 retains its own native movement and 310 positioning.
 */
(()=>{
'use strict';
const W=window;
if(W.KVPV_HITRUN1&&W.KVPV_HITRUN_AUTO)return;
const actor=String(W.__KVPV_OWN_ACTOR_ID??'');
const S={enabled:false,running:false,phase:'FIGHT',reason:'off'};
const own=()=>actor&&String(W._Ba?._rJ?._O$?.ins?.actorId??'')===actor&&!W.__KVPV_UNIVERSAL_HALTED;
function hp(){
 const role=W._C?._Ba?.instance?.getRole?.(Number(actor));
 const v=role?.property?.get?.('hp');
 return Array.isArray(v)&&Number(v[1])>0?100*Number(v[0])/Number(v[1]):null;
}
function status(){
 const pct=hp();
 if(S.running&&pct!==null){if(pct<=35)S.phase='RETREAT';else if(pct>=100)S.phase='FIGHT';}
 return {...S,phase:S.phase,hpPct:pct,compatibility:true,combatRunning:S.running&&S.phase==='FIGHT'};
}
function start(){
 if(!own())return {...status(),reason:'waiting_actor'};
 S.enabled=true;S.running=true;S.reason='th300_scan_compat';return status();
}
function stop(reason='stop'){S.enabled=false;S.running=false;S.reason=String(reason);return status();}
function rearm(){start();return autoStatus();}
function autoStatus(){return {enabled:S.enabled,timerActive:S.running,compatibility:true};}
if(!W.KVPV_HITRUN1)W.KVPV_HITRUN1=Object.freeze({start,stop,status});
if(!W.KVPV_HITRUN_AUTO)W.KVPV_HITRUN_AUTO=Object.freeze({rearm,status:autoStatus,stop,repairPolling:rearm});
})();
/* KVPV_SKILL_SOURCE_END 07-th300-hitrun-compat.js */
}

function __KVPV_SKILL_SOURCE_07_tuyet_hoc_js() {
/* KVPV_SKILL_SOURCE_BEGIN 07-tuyet-hoc.js */





/* ===========================================================================
 * KVPV V12.9.5 — BOSS TH ONLY / FAR STANCE (client side, experimental)
 * Uses native selector and NATIVE cooldown; never invents a ready skill.
 * 1001..1008 = assumed Tuyet Hoc family in the existing FULL's combat module.
 * Main actor only, current Tian Quan Boss only, no combat RPC, no skill reach hack.
 * Only active after KVPV_MODE.start('BOSS_TH'); no default auto activation.
 * =========================================================================== */

(() => {

  'use strict';

  const W=window, NAME='KVPV_TH_FAR', TAG='[TH-FAR V12.9.5]';

  try {W[NAME]?.stop?.('reload');}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

  const actorId=String(W.__KVPV_OWN_ACTOR_ID||'');

  const Comp=W._d?._Yct?._Het, Sel=W._d?._Yct?._Eet,

    Mov=W._d?._Yct?._zet;

  if(!actorId||!Comp||!Sel||!Mov||!W.KVPV_HITRUN1?.status){

    console?.warn?.(TAG,'Chưa sẵn sàng trong game-frame');return;

  }

  const TH=new Set([1001,1002,1003,1004,1005,1006,1007,1008]);

  const CFG={goal:280.4,tolerance:0.45,moveIntervalMs:1500,

    scanMs:500,closeGuard:330,warnNoHitMs:25000};

  const S={running:false,stopped:false,selector:null,combat:null,target:null,

    owner:{},bossId:'',bossName:'',lastTarget:'',selectorChoices:0,

    blockedBasics:0,blockedOther:0,allowedTH:0,confirmedTH:0,

    noReady:0,moves:0,skips:0,lastMoveAt:0,lastHitAt:0,

    startedAt:0,lastDistance:null,lastHitDistance:null,lastReason:'off',lastError:'',

    hookChanges:0,interval:null,seenIds:new Set(),history:[]};

  function prop(o,k){try{return o?.property?.get?.(k)??null;}catch(_){return null;}}

  const rid=o=>String(prop(o,'id')??o?.id??'');

  function point(o){const p=prop(o,'position');if(!p)return null;

    const x=Number(p.x),y=Number(p.y);

    return Number.isFinite(x)&&Number.isFinite(y)?{x,y}:null;}

  function current(){const w=W._C?._Ba?.instance;

    const a=w?.getRole?.(Number(actorId))||w?.getRole?.(actorId)||null;

    return {a,selector:a?.getComponent?.(Sel),combat:a?.getComponent?.(Comp),

      mover:a?.getComponent?.(Mov)};}

  function stageOcc(){try{const lv=Number(W._Ba?._Co?._Mo?.ins?.curLv);

    const t=W._ft?._h$?.ins;const c=t?.getCfgByLv?.(lv);

    const n=c?Number(t.occ(c,lv)):NaN;

    return Number.isSafeInteger(n)&&n>0?n:null;}catch(_){return null;}}

  function sceneOk(c){const t=c?.combat?.target;

    if(!t||t.isValid===false||Number(prop(t,'type'))!==1)return false;

    const stage=stageOcc();return stage!==null&&Number(prop(t,'occ'))===stage;}



  function log(type,detail=''){S.history.push({at:Date.now(),type,detail});

    if(S.history.length>35)S.history.shift();}

  function restore(link){if(!link)return;

    const {obj,key,wrapper,own}=link;

    if(obj[key]!==wrapper){S.lastError='Another hook replaced '+key+'; not overwriting';return;}

    try{if(own)Object.defineProperty(obj,key,own);else delete obj[key];}

    catch(e){S.lastError='Cannot restore '+key+': '+String(e);}}

  function hook(obj,key,fn){if(typeof obj?.[key]!=='function')return null;

    const own=Object.getOwnPropertyDescriptor(obj,key);

    if(own&&own.configurable===false)return null;

    const before=obj[key];const wrapper=fn(before);

    Object.defineProperty(obj,key,{configurable:true,writable:true,

      enumerable:own?.enumerable??false,value:wrapper});

    return {obj,key,own,wrapper};}

  function unbind(){restore(S.selector);restore(S.combat);

    S.selector=null;S.combat=null;}

  function bind(c){

    if(S.selector?.obj===c.selector && S.combat?.obj===c.combat &&

       S.selector?.obj?._f7t===S.selector?.wrapper &&

       S.combat?.obj?.combat===S.combat?.wrapper)return true;

    unbind();

    const sh=hook(c.selector,'_f7t',native=>function(active,common,mode){

      if(!S.running||this!==c.selector||mode!==1||

         !sceneOk(current())||!Array.isArray(active))

        return native.apply(this,arguments);

      // Pass only genuine Tuyet Hoc rows to the ORIGINAL selector.

      // Empty native lists yield -1: wait, never fall back to basic attacks.

      const a=active.filter(r=>TH.has(Number(r?.[0])));

      const b=Array.isArray(common)?common.filter(r=>TH.has(Number(r?.[0]))):[];

      const chosen=native.call(this,a,b,mode);

      if(TH.has(Number(chosen))){S.selectorChoices++;S.seenIds.add(Number(chosen));}

      else S.noReady++;

      return TH.has(Number(chosen))?chosen:-1;

    });

    if(!sh){S.lastError='Cannot hook native skill selector';return false;}

    const ch=hook(c.combat,'combat',native=>function(skillId){

      if(S.running&&this===c.combat&&sceneOk(current())){

        const id=Number(skillId);

        if(id===-1)return undefined;

        if(!TH.has(id)){

          if(id>=8001&&id<=8009)S.blockedBasics++;

          else S.blockedOther++;

          return undefined; // no basic attacks, no other actor attack skills

        }

        S.allowedTH++;

      }

      return native.apply(this,arguments);

    });

    if(!ch){restore(sh);S.lastError='Cannot hook native combat';return false;}

    S.selector=sh;S.combat=ch;S.hookChanges++;

    log('HOOK', 'actor main combat + main selector');

    return true;

  }

  function detachTarget(){if(S.target){try{S.target.off?.(1012,S.owner,onHit);}catch(_){window.KVPV_V1?.diagnostics?.record(_);}}

    S.target=null;S.bossId='';S.bossName='';}

  function onHit(source,marker,damage,flags,receiver){

    if(!S.running||String(source)!==actorId||String(receiver)!==S.bossId)return;

    const raw=Number(marker),id=raw/10000,f=Number(flags)||0;

    if(!Number.isSafeInteger(raw)||raw%10000!==0||!TH.has(id)||

       !(Number(damage)>0)||(f&(4|16|32|128|256)))return;

    S.confirmedTH++;S.lastHitAt=Date.now();

    const c=current(),a=point(c.a),b=point(S.target);

    S.lastHitDistance=a&&b?+Math.hypot(a.x-b.x,a.y-b.y).toFixed(1):null;

    log('HIT',{skillId:id,distance:S.lastHitDistance});

  }

  function attachTarget(t){if(S.target===t)return;

    detachTarget();if(!t||!rid(t))return;

    S.target=t;S.bossId=rid(t);S.bossName=String(prop(t,'name')||'Boss');

    try{t.on?.(1012,S.owner,onHit);}catch(e){S.lastError='Hit listener: '+String(e);}

  }



  function tick(){if(!S.running)return;

    try{

      if(String(W._Ba?._rJ?._O$?.ins?.actorId??'')!==actorId||

         W.__KVPV_UNIVERSAL_HALTED){stop('actor/session change');return;}

      const c=current();

      if(!c.a||!c.combat||!c.selector||!c.mover){S.lastReason='no_live_components';return;}

      if(!bind(c)){S.lastReason='hook_failed';return;}

      if(!sceneOk(c)){detachTarget();S.lastReason='not_tianquan';return;}

      attachTarget(c.combat.target);

      if(W.KVPV_MODE?.status?.(false)?.mode!=='BOSS_TH'){

        S.lastReason='mode_not_boss_th';return;

      }

      const hr=W.KVPV_HITRUN1?.status?.(false);

      if(!hr?.running||hr.phase!=='FIGHT'){

        S.lastReason='hitrun_'+(hr?.phase||'off');return;}

      if(Number(hr.hpPct)<Math.max(48,Number(hr.leavePct||35)+10)){

        S.lastReason='low_hp';return;}

      if(W.document?.hidden){S.lastReason='tab_background';return;}

      const next=W.KVPV_V127_BASIC?.status?.(false)?.nextImpactInMs;

      if(Number.isFinite(next)&&next>=-100&&next<=1350){S.lastReason='dodge_soon';return;}

      const a=point(c.a),b=point(c.combat.target);

      if(!a||!b){S.lastReason='position_missing';return;}

      const dx=a.x-b.x,dy=a.y-b.y,d=Math.hypot(dx,dy);

      S.lastDistance=+d.toFixed(2);

      if(!Number.isFinite(d)||d<1){S.lastReason='overlap';return;}

      if(Math.abs(d-CFG.goal)<=CFG.tolerance){S.lastReason='holding_far';return;}

      // From far away, let native auto approach the Boss first to avoid ping-pong.

      if(d>CFG.closeGuard){S.lastReason='native_approach';return;}

      if(Date.now()-S.lastMoveAt<CFG.moveIntervalMs){S.lastReason='move_cooldown';return;}

      if(typeof c.mover.moveTo!=='function'){S.lastReason='no_mover';return;}

      // A bounded client waypoint, no server-range or cooldown changes.

      const x=b.x+dx/d*CFG.goal,y=b.y+dy/d*CFG.goal;

      if(!Number.isFinite(x)||!Number.isFinite(y))return;

      c.mover.moveTo(x,y);S.lastMoveAt=Date.now();S.moves++;

      S.lastReason=d<CFG.goal?'move_out':'move_in';

    }catch(e){S.lastError=String(e?.message||e);S.lastReason='error';}

  }



  function status(show=true){

    const c=current();const ids=[];

    for(const rows of [c.selector?._rtt,c.selector?._wet])if(Array.isArray(rows))

      for(const row of rows)if(TH.has(Number(row?.[0])))ids.push(Number(row[0]));

    const out={version:'12.9.5',enabled:S.running,

      modeControl:'KVPV_MODE',

      goalDistance:CFG.goal,measuredDistance:S.lastDistance,

      availableTuyetHoc:[...new Set(ids)].sort((a,b)=>a-b),

      selectedTuyetHoc:[...S.seenIds].sort((a,b)=>a-b),

      allowedTH:S.allowedTH,confirmedTH:S.confirmedTH,

      blockedBasics:S.blockedBasics,blockedOther:S.blockedOther,

      cooldownNoReady:S.noReady,moves:S.moves,boss:S.bossName||null,

      lastHitDistance:S.lastHitDistance,lastReason:S.lastReason,lastError:S.lastError,

      selectorHooked:!!S.selector&&S.selector.obj._f7t===S.selector.wrapper,

      combatHooked:!!S.combat&&S.combat.obj.combat===S.combat.wrapper,

      note:ids.length?'Only 1001..1008 from native selector; when cooling down NO basic fallback. Server hit range unchanged.':'No native Tuyet Hoc 1001..1008 in current selector; waits without basic attacks. Check game skill configuration.'};

    if(show)console.table([out]);return out;

  }



  function start(){

    if(S.stopped)throw Error('Bản này đã stop vĩnh viễn, cần F5 nạp lại');

    if(S.running)return status(false);

    if(String(W._Ba?._rJ?._O$?.ins?.actorId??'')!==actorId)throw Error('Sai nhân vật');

    S.running=true;S.startedAt=Date.now();S.lastReason='starting';

    S.interval=(W.KVPV_V1?.timers?.setInterval ?? W.setInterval)(tick,CFG.scanMs);tick();

    return status(false);

  }



  function stop(reason='user stop'){

    S.running=false;

    if(S.interval!==null){(W.KVPV_V1?.timers?.clearInterval ?? W.clearInterval)(S.interval);S.interval=null;}

    unbind();detachTarget();S.lastReason=reason;log('STOP',reason);

    return status(false);

  }

  const api={start,stop,status,history:()=>S.history.slice()};

  W[NAME]=api;

  console?.info?.(TAG,'READY/OFF. Chạy KVPV_MODE.start("BOSS_TH") để chỉ xả Tuyệt Học ở xa.');

})();

/* KVPV_SKILL_SOURCE_END 07-tuyet-hoc.js */
}

function __KVPV_SKILL_SOURCE_08_range_evidence_js() {
/* KVPV_SKILL_SOURCE_BEGIN 08-range-evidence.js */
(() => {
  'use strict';
  window.KVPV_TQ_BASIC_PROFILE=Object.freeze({create(env){
    const allIds=[8001,8002,8003,8004,8005];let ids=allIds.slice();
    let enabled=false,waitMs=10,tuyetHoc=false;
    const active=()=>enabled&&['THIEN_QUAN','LINH_LUNG','PHU_VAN'].includes(env.scope());
    const learned=()=>ids.filter(id=>env.learned().includes(id));
    function report(){return {enabled,active:active(),tuyetHocEnabled:tuyetHoc,tuyetHocActive:active()&&tuyetHoc,waitClientMs:waitMs,ids,learned:learned()};}
    return Object.freeze({active,allowsTuyetHoc:()=>active()&&tuyetHoc,setTuyetHoc(value=true){tuyetHoc=!!value;return report();},wait:()=>waitMs,goal:()=>null,ids:()=>ids.slice(),canAttempt:()=>true,tick(){},cast(){},hit(){},report,
      configure(on=true,wait=10,skillIds=null){if(!Number.isFinite(wait)||wait<0||wait>1000)throw Error('Wait must be 0..1000ms');if(skillIds!==null&&(!Array.isArray(skillIds)||!skillIds.length||skillIds.some(id=>!allIds.includes(Number(id)))))throw Error('Basic profile requires native IDs 8001..8005');enabled=!!on;waitMs=wait;ids=skillIds===null?allIds.slice():[...new Set(skillIds.map(Number))];return report();}});
  }});
})();

/* ===========================================================================
 * KVPV V12.9.6 — 300+ TUYET HOC RANGE VERIFICATION
 * Distinguishes cast-start range from damage callback range. STRICT only uses
 * skills with >=2 independent matching cast->hit pairs, both observed >300.
 * SCAN observes native non-basic active skills at a configurable distance.
 * No radius in static skill config has been confirmed; measured =/= guaranteed.
 * =========================================================================== */

(() => {

  'use strict';

  const W=window,TAG='[TH300 V12.9.6]',actorId=String(W.__KVPV_OWN_ACTOR_ID||'');

  W.KVPV_BASIC10?.release?.();

  try{W.KVPV_TH300?.stop?.('reload');}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

  const Skill=W._d?._Yct?._Eet,Combat=W._d?._Yct?._Het,Move=W._d?._Yct?._zet;

  if(!actorId||!Skill||!Combat||!Move){console?.warn?.(TAG,'Chưa vào game-frame');return;}



  const CFG={min:300,max:312,goal:302,tolerance:5,scanMs:100,basicOnly:false,basicAnimationSpeed:1,tqBasicVisualSpeed:1,tqTuyetHocVisualSpeed:99,clientPaceMs:null,afterTHWaitMs:0,moveWaitMs:150,castTtlMs:3500,minCastConfirmations:2,paceMs:75};
  let statusReentrant=false;

  const scopedCombat=()=>W.KVPV_DESKTOP_CONTROL?.scopeProfile?.(W.KVPV_FAR_SCOPE?.status?.()?.kind)??null;
  const tqDistanceOnly=()=>W.KVPV_TQ_POSITION_ONLY?.enabled===true&&W.KVPV_FAR_SCOPE?.status?.()?.kind==='THIEN_QUAN';
  // Honor the explicitly configured Tian Quan goal even when an older desktop
  // combat profile still supplies distance 302; leave its mode/pace settings alone.
  const tqConfiguredGoal=()=>{const p=W.KVPV_TQ_POSITION_ONLY,d=Number(p?.distance);return p?.enabled===false&&W.KVPV_FAR_SCOPE?.status?.()?.kind==='THIEN_QUAN'&&Number.isFinite(d)&&d>280&&d<=600?d:null;};

  for(const key of ['goal','min','max','basicOnly']){let base=CFG[key];Object.defineProperty(CFG,key,{enumerable:true,configurable:true,get(){if(tqDistanceOnly()){if(key==='goal')return 310;if(key==='min')return 300;if(key==='max')return 320;}const fixed=tqConfiguredGoal();if(fixed!==null&&key!=='basicOnly'){if(key==='goal')return fixed;if(key==='max')return fixed+10;return fixed===300?295:fixed>300?300:280;}const p=scopedCombat();if(!p)return base;if(key==='basicOnly')return p.mode==='basic8001';if(key==='goal')return p.distance;if(key==='max')return p.distance+10;return p.distance===300?295:p.distance>300?300:280;},set(value){base=value;}});}

  const metrics=W.KVPV_COMBAT_METRICS?.create?.()??null;

  const pacer=W.KVPV_SKILL_PACING?.create?.()??null;

  const transforming=()=>W.KVPV_TRANSFORM10?.transformed?.()&&W.KVPV_TRANSFORM10.status().enabled;
  const isTransformSkill=id=>transforming()&&W.KVPV_TRANSFORM10?.has?.(Number(id))===true;

  const currentPace=()=>mixed.enabled&&skillPriority==='interleaved'&&
    ['THIEN_QUAN','LINH_LUNG','PHU_VAN'].includes(W.KVPV_FAR_SCOPE?.status?.()?.kind)?0:
    (tqFive?.active()?tqFive.wait():scopedCombat()?.intervalMs??CFG.clientPaceMs??
      (transforming()?10:(mixed.enabled&&mixed.wantBasic&&mixed.basicPaceMs!==null?mixed.basicPaceMs:(pacer?.pace()??CFG.paceMs))));

  function setClientPace(value=1){if(value===null){CFG.clientPaceMs=null;return {clientPaceMs:null};}const n=Number(value);if(!Number.isFinite(n)||n<0||n>1000)throw Error('Client pace must be 0..1000 ms');CFG.clientPaceMs=n;return {clientPaceMs:n};}
  function setScanInterval(value=100){const n=Number(value);if(!Number.isInteger(n)||n<1||n>100)throw Error('Scan interval must be 1..100 ms');CFG.scanMs=n;if(ST.timer!==null){(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(ST.timer);const schedule=W.KVPV_V1?.timers?.setInterval??W.setInterval;ST.timer=typeof schedule==='function'?schedule(tick,CFG.scanMs):null;}return {scanMs:CFG.scanMs,running:ST.running,nativeCooldownPreserved:true};}

  const ST={running:false,mode:'OFF',s:null,c:null,target:null,targetOcc:null,owner:{},lastMove:0,

    timer:null,lastTickAt:null,timerRepairs:0,casts:[],proofs:new Map(),evidence:new Map(),stats:new Map(),seen:new Set(),blocked:0,skillWaits:0,

    moves:0,castAttempts:0,confirmedPairs:0,basicImpactSerial:null,basicTailReleases:0,lastDistance:null,lastHitDistance:null,

    arrivalSample:null,arrivalSnap:false,positionSample:null,positionRetries:0,positionOffset:0,positionCommands:0,positionPause:null,positionRecovery:0,movement:[],positioning:true,ownMove:false,moveGoal:null,lastInvocation:-Infinity,lastTHAt:-Infinity,fastCasts:0,blockedSteering:0,

    finishTarget:null,finishCursor:0,finishLastMove:-Infinity,finishMoveAttempts:0,lastBackgroundTick:-Infinity,skillCursor:0,lastOwnerPhase:null,resumes:0,lastReason:'off',lastError:'',tqSelectedBasic:null,scaledTowerSkillAnimations:0,scaledTowerBasicAnimations:0,history:[]};
  const thCalibration={autoLocked:false,skillId:null,completedAt:null,reason:'not_started',minHitsPerSkill:3,maxUnconfirmedPerSkill:3};

  const mixed={enabled:false,primary:false,primaryStreak:0,hitQuota:null,confirmedSinceTH:0,thCycles:0,rotation:[],rotationCursor:0,wantBasic:false,suspended:false,unconfirmed:0,basicPaceMs:null,ready:new Map(),attempts:0,hits:0,damage:0,examples:[]};
  let skillPriority='interleaved';
  // The 3.5s hit-correlation TTL is not a server cooldown. In verified
  // Tian Quan SCAN only, permit one bounded native-ready TH retry while a
  // previous cast still awaits damage. Ambiguous overlaps never create STRICT
  // range proofs. No cooldown rewrite, native selector hook override or RPC.
  const tqIdleFill={enabled:true,minRepeatMs:180,maxPendingPerTH:2,
    repeatCalls:0,deniedPending:0,ambiguousHits:0};
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
    basicSolo4100.enabled=enabled===true;
    if(basicSolo4100.enabled){pilot4100.enabled=false;resetPilot4100();}
    return basicSolo4100Status();
  }
  function basicSolo4100Status(){
    return {enabled:basicSolo4100.enabled,active:basicSolo4100Active(),
      stage:Number(W._Ba?._Co?._Mo?.ins?.curLv)||null,
      skillIds:[8001,8002,8003,8004,8005],startupPreference:basicSolo4100Prior.slice(),blockedTH:basicSolo4100.blockedTH,
      configuredDistance:CFG.goal,nativeCooldownPreserved:true,
      note:'Basic attacks only while stage 4100 Tian Quan is active. Native cooldown is preserved; range/hits still require confirmation.'};
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
    if(!cosmicActive()||thGap.picking)return rows.sort(fallback);
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
    for(const key of ['goal','min','max','scanMs']){const descriptor=Object.getOwnPropertyDescriptor(CFG,key);let base=CFG[key];Object.defineProperty(CFG,key,{enumerable:true,configurable:true,get(){if(tqDistanceOnly()&&key!=='scanMs')return key==='goal'?310:key==='min'?300:320;const d=tqFive?.goal();if(key==='scanMs'&&tqFive?.active())return Math.max(1,tqFive.wait());if(d!==null&&d!==undefined)return key==='goal'?d:key==='min'?Math.max(0,d-15):key==='max'?d+10:base;return descriptor.get?descriptor.get():base;},set(value){if(descriptor.set)descriptor.set(value);else base=value;}});}


  const isBasic=id=>Number.isSafeInteger(Number(id))&&Number(id)>=8001&&Number(id)<=8009;

  const excludedBasics=new Set([8002]);

  const selectedBasic=id=>tqFive?.active()?tqFive.ids().includes(Number(id)):!excludedBasics.has(Number(id))&&(!mixed.primary||!mixed.rotation.length||mixed.rotation.includes(Number(id)));


  function learnedBasics(){const s=role().s;return [...new Set([...(s?._rtt??[]),...(s?._wet??[])].map(r=>Number(r?.[0])).filter(id=>isBasic(id)&&(tqFive?.active()||!excludedBasics.has(id))))].sort((a,b)=>a-b);}

  function ensureTianQuanRotation(){
    if(W.KVPV_FAR_SCOPE?.status?.()?.kind!=='THIEN_QUAN'||!tqFive)return;
    const ids=[8001,8002,8003,8004,8005],p=tqFive.report();
    // A configured Tuyet Hoc burst owns its selection policy. Do not replace
    // its chosen basic roster or re-enable mixed basic-first rotation per tick.
    if(burst.enabled&&p.enabled&&p.tuyetHocEnabled&&p.waitClientMs===0){
      mixed.enabled=false;mixed.wantBasic=false;return;
    }
    if(p.enabled&&p.waitClientMs===0&&p.tuyetHocEnabled&&ids.every(id=>p.ids.includes(id))&&
       mixed.enabled&&mixed.primary&&mixed.basicPaceMs===0&&mixed.rotation.length===ids.length&&
       ids.every(id=>mixed.rotation.includes(id)))return;
    tqFive.configure(true,0,ids);tqFive.setTuyetHoc(true);
    mixed.enabled=true;mixed.primary=true;mixed.primaryStreak=0;mixed.rotation=ids.slice();
    mixed.rotationCursor=0;mixed.wantBasic=true;mixed.suspended=false;mixed.basicPaceMs=0;mixed.ready.clear();
    CFG.clientPaceMs=0;CFG.afterTHWaitMs=0;
  }
  function basicRotation(){const learned=learnedBasics();return (tqFive?.active()?tqFive.ids():mixed.rotation).filter(id=>learned.includes(id));}

  function basicQuota(){return basicRotation().length||3;}

  function primaryBasicId(){const order=basicRotation();return order.length?order[mixed.rotationCursor%order.length]:learnedBasics()[0]??null;}




  const burst={enabled:false,dispatch:false,desired:null,nextAt:0,serial:0,active:null,lastPass:null,history:[]};

  const hitDiagnostics={received:0,accepted:0,rejected:{},recent:[]};

  let confirmedTailCut=false,confirmedTailCuts=0;

  function setConfirmedTailCut(enabled=true){confirmedTailCut=!!enabled;return {enabled:confirmedTailCut,onlyAfterMatchedHit:true};}






  const dispatch={actor:null,pending:null,calls:0,signals:0,silent:0,recent:[]};


  const speedClips=new Map();
  let thVisualCalls=0,thVisualScaled=0,thVisualUnavailable=0,thVisualLastSkill=null;
  let tqBasicVisualCalls=0,tqBasicVisualScaled=0,tqBasicVisualUnavailable=0,tqBasicVisualLastSkill=null;

  function restoreSpeedClips(){for(const [clip,s]of speedClips)try{if(clip?._nt===s.applied||clip?.timeScale===s.applied)clip.timeScale=s.before;}catch(e){ST.lastError=String(e);}speedClips.clear();}









  // Native getActionTween(action,reset,timeScale): shorten VISIBLE animation only.
  // No native cooldown, hit events or RPC behavior is rewritten.
  // Speed up only the currently dispatched native action. The hook is transient;
  // neither native skill rows, RPC, hit callbacks nor server cooldown are changed.
  function animationSpeedCall(native,self,args){
    const id=Number(args[0]),avatar=self?._Qrt,
      scope=W.KVPV_FAR_SCOPE?.status?.()?.kind,inTower=['THIEN_QUAN','LINH_LUNG','PHU_VAN'].includes(scope),
      inTQ=scope==='THIEN_QUAN'&&tqFive?.active()&&ST.running,
      thVisual=id>=1001&&id<=1008&&inTQ&&tqFive.allowsTuyetHoc()===true&&CFG.tqTuyetHocVisualSpeed>1,
      tqBasicVisual=inTQ&&id>=8001&&id<=8005&&CFG.tqBasicVisualSpeed>1,
      towerSkillVisual=inTower&&!isBasic(id)&&candidate(id)&&CFG.basicAnimationSpeed>1,
      towerBasicVisual=inTower&&id>=8001&&id<=8005&&CFG.basicAnimationSpeed>1,
      basicVisual=id===8001&&CFG.basicOnly,
      factor=thVisual?CFG.tqTuyetHocVisualSpeed:tqBasicVisual?CFG.tqBasicVisualSpeed:CFG.basicAnimationSpeed;
    if(factor<=1||(!thVisual&&!tqBasicVisual&&!towerSkillVisual&&!towerBasicVisual&&!basicVisual)||self.owner!==dispatch.actor||
       !canFight()||typeof avatar?.getActionTween!=='function')return native.apply(self,args);
    let action;try{action=self._mvt?.(id)?.[5];}catch(_){action=null;}
    if(thVisual){thVisualCalls++;thVisualLastSkill=id;}
    if(tqBasicVisual){tqBasicVisualCalls++;tqBasicVisualLastSkill=id;}
    // For the Tian Quan 13-skill roster, never guess which action belongs to the skill.
    if((thVisual||tqBasicVisual||towerSkillVisual||towerBasicVisual)&&(typeof action!=='string'||!action.trim())){
      if(thVisual)thVisualUnavailable++;
      if(tqBasicVisual)tqBasicVisualUnavailable++;
      return native.apply(self,args);
    }
    const original=avatar.getActionTween,expectedAction=String(action||'attack');
    const wrapped=function(...a){
      if(a[0]!==expectedAction)return original.apply(this,a);
      const before=Number(a[2]??1);if(!Number.isFinite(before)||before<=0)return original.apply(this,a);
      a[2]=Math.min(factor,before*factor);
      const tween=original.apply(this,a),clip=this.getCurAction;
      if(clip&&typeof clip==='object'&&speedClips.size<32)speedClips.set(clip,{before,applied:a[2]});
      if(thVisual)thVisualScaled++;
      else if(tqBasicVisual)tqBasicVisualScaled++;
      else if(towerSkillVisual)ST.scaledTowerSkillAnimations++;
      else if(towerBasicVisual)ST.scaledTowerBasicAnimations++;
      else ST.scaledBasicAnimations=(ST.scaledBasicAnimations??0)+1;
      return tween;
    };
    // Avoid overwriting unexpected non-writable instance hooks.
    const own=Object.getOwnPropertyDescriptor(avatar,'getActionTween');
    if(own&&own.writable===false&&own.configurable===false){
      if(thVisual)thVisualUnavailable++;if(tqBasicVisual)tqBasicVisualUnavailable++;
      return native.apply(self,args);
    }
    try{avatar.getActionTween=wrapped;}catch(_){
      if(thVisual)thVisualUnavailable++;if(tqBasicVisual)tqBasicVisualUnavailable++;
      return native.apply(self,args);
    }
    if(avatar.getActionTween!==wrapped){
      if(thVisual)thVisualUnavailable++;if(tqBasicVisual)tqBasicVisualUnavailable++;
      return native.apply(self,args);
    }
    try{return native.apply(self,args);}
    finally{if(avatar.getActionTween===wrapped){
      if(own&&'value' in own&&own.writable===true){
        avatar.getActionTween=original;
        Object.defineProperty(avatar,'getActionTween',own);
      }else if(own)Object.defineProperty(avatar,'getActionTween',own);
      else delete avatar.getActionTween;
    }}
  }
  function onNativeCast(targetId,skillId){const p=dispatch.pending;if(p){if(p.events.length<4)p.events.push({targetId:String(targetId),id:Number(skillId)});if(String(targetId)===p.targetId&&Number(skillId)===p.id)p.signaled=true;}}

  function detachDispatch(){if(dispatch.actor){dispatch.actor.off?.(1039,ST.owner,onNativeCast);dispatch.actor=null;}}

  function attachDispatch(a){if(dispatch.actor===a)return;detachDispatch();if(typeof a?.on==='function'&&typeof a?.off==='function'){a.on(1039,ST.owner,onNativeCast);dispatch.actor=a;}}

  function invokeNative(native,self,args){

    if(!ST.running||!dispatch.actor)return native.apply(self,args);





    dispatch.actor.off(1039,ST.owner,onNativeCast);dispatch.actor.on(1039,ST.owner,onNativeCast);

    const pending={id:Number(args[0]),targetId:identity(self.target),signaled:false,events:[]};dispatch.pending=pending;dispatch.calls++;

    try{return animationSpeedCall(native,self,args);}finally{

      if(pending.signaled){dispatch.signals++;
        if(ST.targetKey===identity(self.target)+'/'+String(prop(self.target,'occ'))+'/'+scene()){
          cosmic.lastNativeAt=Date.now();cosmic.lastNativeSkill=pending.id;
          if(isBasic(pending.id))cosmic.basicCasts++;
          else if(pending.id>=1001&&pending.id<=1008)cosmic.thCasts++;
        }
        if(thGap.picking&&isBasic(pending.id)){thGap.accepted++;thGap.lastBasic=pending.id;}
        if(pending.id>=1001&&pending.id<=1008){ST.lastTHAt=Date.now();thGap.lastAt=ST.lastTHAt;
          thGap.lastTarget=ST.targetKey;thGap.lastSerial=ST.castAttempts;}if(mixed.hitQuota!==null&&pending.id>=1001&&pending.id<=1008){mixed.confirmedSinceTH=0;mixed.thCycles++;mixed.wantBasic=true;}}else dispatch.silent++;

      let silentDetail=null;

      if(!pending.signaled){

        let effect=null,effectError='';try{if(typeof self._mvt==='function')effect=!!self._mvt(pending.id);}catch(e){effectError=String(e?.message||e);}

        silentDetail={ownerId:identity(self.owner),ownerType:prop(self.owner,'type'),ownerMatchesActor:self.owner===dispatch.actor,

          validTarget:self.isValidTarget?.()??null,effectAvailable:effect,effectError,

          nativeFunction:Function.prototype.toString.call(native).slice(0,240)};

      }

      dispatch.recent.push({at:Date.now(),id:pending.id,targetId:pending.targetId,signaled:pending.signaled,events:pending.events,silentDetail});if(dispatch.recent.length>16)dispatch.recent.shift();

      dispatch.pending=null;

    }

  }

  const prop=(o,k)=>{try{return o?.property?.get?.(k)??null;}catch(_){return null;}};

  const identity=o=>String(prop(o,'id')??o?.id??'');

  const loc=o=>{const p=prop(o,'position');const x=Number(p?.x),y=Number(p?.y);return Number.isFinite(x)&&Number.isFinite(y)?{x,y}:null;};

  const radius=(a,b)=>{const p=loc(a),q=loc(b);return p&&q?Math.hypot(p.x-q.x,p.y-q.y):null;};



  function role(){const world=W._C?._Ba?.instance;const a=world?.getRole?.(Number(actorId))??world?.getRole?.(actorId);return {a,s:a?.getComponent?.(Skill),c:a?.getComponent?.(Combat),m:a?.getComponent?.(Move)};}



  function stageOcc(){if(['LINH_LUNG','PHU_VAN','TRU_TIEN'].includes(W.KVPV_FAR_SCOPE?.status?.().kind)){const t=role().c?.target;return W.KVPV_FAR_SCOPE.eligible(t)?Number(prop(t,'occ')):null;}try{const lv=Number(W._Ba?._Co?._Mo?.ins?.curLv),c=W._ft?._h$?.ins?.getCfgByLv?.(lv);const n=c?Number(W._ft._h$.ins.occ(c,lv)):NaN;return Number.isSafeInteger(n)&&n>0?n:null;}catch(_){return null;}}

  function eligible(t){if(!t||t.isValid===false)return false;const scope=W.KVPV_FAR_SCOPE?.status?.();const type=Number(prop(t,'type'));if(type!==1&&!(scope?.inside&&scope.kind==='TRU_TIEN'&&type===3))return false;return stageOcc()!==null&&Number(prop(t,'occ'))===stageOcc();}

  function key(occ,id){return String(occ)+'/'+String(id);}

  const scene=()=>String(W._Ba?._$a?._yo?.ins?.intoSce?.[0]??'');



  function skill1008Info(show=true){
    const read=fn=>{try{return fn()??null;}catch{return null;}};
    const pack=(v,depth=0)=>{if(v===null||['number','string','boolean'].includes(typeof v))return v;if(depth>=3)return null;if(Array.isArray(v))return v.slice(0,96).map(x=>pack(x,depth+1));return null;};
    const r=read(()=>role()),learned=read(()=>W._Ba?._rJ?._O$?.ins?.skills),row=Array.isArray(learned)?learned.find(x=>Number(x?.[0])===1008):null,level=Number(row?.[1]);
    const native=read(()=>r?.c?._mvt?.(1008)),table=Number.isFinite(level)&&level>0?read(()=>W._ft?._nY?.ins?.getCfgBySkillIdAndLv?.(1008,level)):null;
    const result={skillId:1008,at:Date.now(),level:Number.isFinite(level)?level:null,name:typeof (native??table)?.[2]==='string'?(native??table)[2]:null,nativeConfigRaw:pack(native),learnedLevelConfigRaw:pack(table),selectorRows:[r?.s?._rtt,r?.s?._wet].flatMap(x=>Array.isArray(x)?x:[]).filter(x=>Number(x?.[0])===1008).map(x=>pack(x)),observed:metrics?.report()?.current?.skills?.find(x=>x.id===1008)??null,effectInterpretation:'Raw native/learned-level config only. Unmapped columns are not interpreted as buffs, duration, range or damage. No confirmed buff-effect mapping available.'};
    if(show)console.log('[Skill 1008]',result);return result;
  }
  function candidate(id){

    if(W.KVPV_TRANSFORM10?.transformed?.())return W.KVPV_TRANSFORM10.has(id);

    if(!Number.isSafeInteger(id)||id<=0||(id>=8001&&id<=8009))return false;

    const r=role();return [r.s?._rtt,r.s?._wet].some(rows=>Array.isArray(rows)&&rows.some(row=>Number(row?.[0])===id));

  }
  const isTuyetHocSkill=id=>Number.isSafeInteger(Number(id))&&Number(id)>=1001&&Number(id)<=1008;
  const tianQuanThMode=()=>['SCAN','STRICT'].includes(ST.mode)&&
    W.KVPV_TQ_SINGLE_STRONGEST_TH===true&&
    ['BOSS_TH300_SCAN','BOSS_TH300'].includes(W.KVPV_MODE?.status?.(false)?.mode)&&
    W.KVPV_FAR_SCOPE?.status?.()?.kind==='THIEN_QUAN';
  function tuyetHocCalibration(occ=ST.targetOcc){
    const roster=skillNames().map(x=>Number(x.id)).filter(isTuyetHocSkill);
    const rows=roster.map(id=>{const m=stats(occ,id);return {id,hits:m.hits,attempts:m.attempts,unconfirmed:m.unconfirmed,
      averageDamage:m.hits?m.damage/m.hits:0,verified:verified(occ,id),verifiedDistance:supportedDistance(occ,id)};});
    const complete=rows.length>0&&rows.every(x=>x.hits>=thCalibration.minHitsPerSkill||x.unconfirmed>=thCalibration.maxUnconfirmedPerSkill);
    const eligible=rows.filter(x=>x.hits>=thCalibration.minHitsPerSkill&&x.verified&&x.verifiedDistance>=300)
      .sort((a,b)=>b.averageDamage-a.averageDamage||a.id-b.id);
    return {complete,locked:thCalibration.autoLocked,selectedSkillId:thCalibration.skillId,
      minHitsPerSkill:thCalibration.minHitsPerSkill,rows,best:eligible[0]??null,
      reason:thCalibration.reason};
  }
  function updateTuyetHocCalibration(){
    if(!tianQuanThMode()||ST.mode!=='SCAN'||thCalibration.autoLocked)return;
    const result=tuyetHocCalibration();if(!result.complete)return;
    thCalibration.autoLocked=true;thCalibration.skillId=result.best?.id??null;
    thCalibration.completedAt=Date.now();thCalibration.reason=result.best?
      'locked_highest_confirmed_average_damage':'no_skill_confirmed_at_scan_range';
    ST.mode='STRICT';ST.skillCursor=0;
    note('TUYET_HOC_LOCKED',{skillId:thCalibration.skillId,averageDamage:result.best?.averageDamage??null,
      measured:result.rows.map(x=>({id:x.id,hits:x.hits,unconfirmed:x.unconfirmed,averageDamage:x.averageDamage,verifiedDistance:x.verifiedDistance}))});
  }



  // MPACK is a game-wide database, NOT a list of equippable player skills.
  // Only select learned player active skills already offered by native selector.
  // Passive 3021/3031 and their proc-generated 3022/3032 are not manual casts.
  const tqMpack={enabled:true};
  const hangMaSkillName=id=>{
    const learned=(W._Ba?._rJ?._O$?.ins?.skills??[]),level=Number(learned.find(row=>Number(row?.[0])===Number(id))?.[1]);
    if(!Number.isSafeInteger(level)||level<1)return false;
    let name='';try{name=String(W._ft?._nY?.ins?.getCfgBySkillIdAndLv?.(Number(id),level)?.[2]??'');}catch(_){}
    const normalized=name.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
    return normalized.includes('hang ma chan quyet');
  };
  function tqMpackExtraAllowed(value){
    const id=Number(value);
    if(!tqMpack.enabled||!tqFive?.active()||!tqFive.allowsTuyetHoc()||
       basicSolo4100Active()||transforming()||
       W.KVPV_FAR_SCOPE?.status?.()?.kind!=='THIEN_QUAN'||
       !Number.isSafeInteger(id)||id<1||isBasic(id)||id>=1001&&id<=1008)return false;
    if(!candidate(id)||!hangMaSkillName(id))return false;
    // Real native _c7t() builds selector rows from _vX.ins.skills, not
    // the parallel player model which can be incomplete or stale.
    const nativeList=(typeof _vX!=='undefined'?_vX?.ins?.skills:null)??W._vX?.ins?.skills;
    const playerList=W._Ba?._rJ?._O$?.ins?.skills;
    const learned=Array.isArray(nativeList)?nativeList:playerList;
    const entry=Array.isArray(learned)?learned.find(row=>Number(row?.[0])===id):null;
    const lv=Number(entry?.[1]);
    if(!entry||!Number.isSafeInteger(lv)||lv<1)return false;
    let cfg;
    try{cfg=W._ft?._nY?.ins?.getCfgBySkillIdAndLv?.(id,lv);}catch(_){return false;}
    if(!Array.isArray(cfg)||Number(cfg[1])!==id||Number(cfg[4])!==1||
       /chủ động\s*$/i.test(String(cfg[2]??'')))return false;
    const maps=cfg[17];
    if(Array.isArray(maps)&&maps.length&&
       !maps.some(m=>Number(m)===Number(scene())))return false;
    return true;
  }
  function tqActiveExtraIds(){
    if(!tqMpack.enabled||!tqFive?.active()||!tqFive.allowsTuyetHoc()||
       W.KVPV_FAR_SCOPE?.status?.()?.kind!=='THIEN_QUAN')return [];
    const r=role();
    const ids=[...new Set([r.s?._rtt,r.s?._wet].flatMap(rows=>
       Array.isArray(rows)?rows.map(row=>Number(row?.[0])):[]))];
    return ids.filter(tqMpackExtraAllowed).sort((a,b)=>a-b);
  }
  // The native Tuyet Hoc roster is the complete 1001..1008 group. Do not
  // filter that roster by the name of one specific skill (1007); native row
  // presence is the eligibility check. Extra MPACK rows remain name/config gated.
  const tqSelectableNative=id=>{
    const skillId=Number(id);
    return isTuyetHocSkill(skillId)?candidate(skillId):tqMpackExtraAllowed(skillId)&&hangMaSkillName(skillId);
  };
  function setTianQuanMpackExtras(enabled=true){
    tqMpack.enabled=enabled===true;
    return {enabled:tqMpack.enabled,extraIds:tqActiveExtraIds(),nativeOnly:true};
  }
  function bossRange(){const cfg=Number(W._ft?._tY?.ins?.getCfgById?.(Number(prop(role().c?.target,'occ')))?.[3])||0;

    const observed=Number(W.KVPV_HITRUN1?.status?.(false)?.observedDangerRadius)||0;return Math.max(cfg,observed);}



  function outside(d){return Number.isFinite(d)&&d>CFG.min&&d<=CFG.max;}





  function combatOwner(){

    return tqDistanceOnly()?{running:true,phase:'FIGHT',owner:'TQ_DISTANCE_ONLY',leavePct:0}:
      W.KVPV_HITRUN1?.status?.(false);

  }



  function towerFinish(){

    const threshold=null;

    if(threshold===null)return false;

    const t=role().c?.target,h=prop(t,'hp'),current=Number(h?.[0]),max=Number(h?.[1]);

    return eligible(t)&&Array.isArray(h)&&Number.isFinite(current)&&Number.isFinite(max)&&max>0&&current>0&&current/max<=threshold;

  }

  function canFight(){if(W._Ba?._rJ?._O$?.ins?.isDead===true||(W.KVPV_FAR_SCOPE??W.KVPV_TQ_SCOPE)?.inside?.()===false)return false;const hr=combatOwner(),r=role(),hp=prop(r.a,'hp');

    const pct=Array.isArray(hp)&&Number(hp[1])>0?Number(hp[0])/Number(hp[1])*100:hr?.hpPct;

    return hr?.running===true&&hr.phase==='FIGHT'&&Number.isFinite(pct)&&pct>Number(hr.leavePct??35)&&r.m?._fut!==3&&r.m?._fut!==4;}

  function stats(occ,id){const k=key(occ,id);if(!ST.stats.has(k))ST.stats.set(k,{attempts:0,hits:0,damage:0,unconfirmed:0});return ST.stats.get(k);}



  function settle(c,hit){pacer?.observe(hit,c.tuningEligible===true&&canFight()&&atPosition(role())&&c.targetId===identity(role().c?.target)&&c.scene===scene());}



  function expire(){const t=Date.now();for(const c of ST.casts)if(!c.used&&t-c.time>CFG.castTtlMs){c.used=true;stats(c.occ,c.id).unconfirmed++;metrics?.result(c.serial,false,0,c.metricsInterrupted===true);

      if(c.mixedBasic&&!c.metricsInterrupted&&c.targetId===identity(ST.target)&&!tqFive?.active()){mixed.unconfirmed++;if(mixed.hits===0&&mixed.unconfirmed>=3&&!mixed.suspended){mixed.suspended=true;mixed.wantBasic=false;note('BASIC-SUSPENDED',{reason:'three_unconfirmed_basic_results',bossId:c.targetId});}}

      settle(c,false);}}



  function supportedDistance(occ,id){const a=(ST.evidence.get(key(occ,id))||[]).map(x=>Math.min(x.castDistance,x.hitDistance)).sort((a,b)=>b-a);return a[CFG.minCastConfirmations-1]??0;}



  function verified(occ,id){return (ST.proofs.get(key(occ,id))?.size||0)>=CFG.minCastConfirmations;}




  // Keep unresolved hit records; after a completed native cycle they need not stall the next basic.

  function basicPendingBlocks(c){const combat=role().c;if(tqFive?.active())return animationPlaying(combat);if(CFG.basicOnly)return animationPlaying(combat)||combat?.isCooldown?.()!==false;if(mixed.hitQuota===null)return true;const rows=[...(role().s?._rtt||[]),...(role().s?._wet||[])];const row=rows.find(r=>Number(r[0])===c.id);const wait=Math.max(500,Number(row?.[2])||0);return Date.now()-c.time<wait||animationPlaying(combat)||combat?.isCooldown?.()!==false;}


  const basicQuotaSatisfied=id=>mixed.suspended||mixed.hitQuota===null||Number(id)<1001||Number(id)>1008||mixed.confirmedSinceTH>=mixed.hitQuota;
  function allowed(id,occ,d){const transformSkill=isTransformSkill(id);if(!transformSkill&&tianQuanThMode()&&(!isTuyetHocSkill(Number(id))||ST.mode==='STRICT'&&thCalibration.autoLocked&&Number(id)!==thCalibration.skillId))return false;if(!transformSkill&&tqFive?.active()&&(isBasic(id)?!tqFive.ids().includes(Number(id)):!tqFive.allowsTuyetHoc()||!tqSelectableNative(id)))return false;if(isBasic(id))return selectedBasic(id)&&(tqFive?.active()||mixed.enabled&&!mixed.suspended)&&[role().s?._rtt,role().s?._wet].some(rows=>Array.isArray(rows)&&rows.some(row=>Number(row?.[0])===Number(id)))&&

    !ST.casts.some(c=>!c.used&&c.basicTrial&&basicPendingBlocks(c)&&c.id===Number(id)&&c.targetId===identity(role().c?.target)&&c.scene===scene()&&Date.now()-c.time<=CFG.castTtlMs);

    return (isTransformSkill(id)||basicQuotaSatisfied(id))&&candidate(Number(id))&&

    !((burst.enabled||pacer)&&!transforming()&&(()=>{
      const pending=ST.casts.filter(c=>!c.used&&c.id===Number(id)&&
        c.targetId===identity(role().c?.target)&&c.scene===scene()&&
        Date.now()-c.time<=CFG.castTtlMs);
      if(!pending.length)return false;
      const allowedRetry=tqNativeReadyRepeat(Number(id),pending);
      if(!allowedRetry&&tqIdleFill.enabled&&tqFive?.active()&&tqDistanceOnly()&&
        Number(id)>=1001&&Number(id)<=1008)tqIdleFill.deniedPending++;
      return !allowedRetry;
    })())&&

    (ST.mode==='SCAN'||(verified(occ,id)&&Number.isFinite(d)&&d<=supportedDistance(occ,id)+0.01));}

  // Native skill readiness wins over delayed damage observation only in TQ SCAN.
  // Limit overlapping pending records to avoid a 1ms flood when the browser
  // exposes a ready row but the server has not confirmed any of the attempts.
  function tqNativeReadyRepeat(id,pending){
    if(!tqIdleFill.enabled||ST.mode!=='SCAN'||!tqFive?.active()||
      !tqDistanceOnly()||!Number.isSafeInteger(id)||id<1001||id>1008)return false;
    if(pending.length>=tqIdleFill.maxPendingPerTH)return false;
    const r=role(),now=Date.now(),c=r.c;
    if(typeof c?.isCooldown!=='function'||c.isCooldown()!==false||
       animationPlaying(c)||!castReady())return false;
    const row=[...(r.s?._rtt??[]),...(r.s?._wet??[])].find(x=>Number(x?.[0])===id);
    // Native selector may advance row[1] before combat(id) executes. A one-shot
    // selection token carries proof it chose this exact ID from a ready row.
    const token=ST.tqSelectedNative;
    const selectedNow=token?.id===id&&token.targetId===identity(c?.target)&&
      token.scene===scene()&&now-token.at>=0&&now-token.at<=40;
    if(!row||!Number.isFinite(Number(row[1]))||
      (Number(row[1])>=now&&!selectedNow))return false;
    const duration=Number(row[2]);
    const minGap=Math.max(tqIdleFill.minRepeatMs,
      Number.isFinite(duration)&&duration>0?Math.min(1000,duration):0);
    return now-Math.max(...pending.map(x=>x.time))>=minGap;
  }


  function targetDistance(){
    if(tqDistanceOnly())return 310;
    if(tqFive?.active())return CFG.goal;

    if(ST.mode!=='STRICT')return CFG.goal;

    const occ=stageOcc(),distances=skillNames().filter(x=>verified(occ,x.id)).map(x=>supportedDistance(occ,x.id));

    if(!distances.length)return null;

    return Math.min(CFG.goal,Math.max(...distances)-0.2);

  }



  function note(type,data){ST.history.push({time:Date.now(),type,data});if(ST.history.length>60)ST.history.shift();}



  function restore(h){if(!h)return;const {obj,k,fn,own}=h;if(obj[k]!==fn){ST.lastError='Hook replaced externally: '+k;return;}try{if(own)Object.defineProperty(obj,k,own);else delete obj[k];}catch(e){ST.lastError=String(e);}}



  function hook(obj,k,mk){

    if(typeof obj?.[k]!=='function')return null;

    let own=Object.getOwnPropertyDescriptor(obj,k);if(own&&!own.configurable)return null;

    let base=obj[k];const seen=new Set();



    while(typeof base?.__KVPV_TH300_PARENT==='function'&&!seen.has(base)){seen.add(base);base=base.__KVPV_TH300_PARENT;}

    const legacy=fn=>{const text=Function.prototype.toString.call(fn);

      return k==='combat'?text.startsWith('function(skillId){')&&text.includes('ST.running&&this===r.c')&&text.includes('ST.lastInvocation=Date.now()'):

        k==='_f7t'&&text.startsWith('function(active,common,mode){')&&text.includes('ST.running&&this===r.s')&&text.includes('ST.skillWaits');};





    if(legacy(base)){

      let proto=Object.getPrototypeOf(obj),candidate;

      while(proto){const d=Object.getOwnPropertyDescriptor(proto,k);if(typeof d?.value==='function'){candidate=d.value;break;}proto=Object.getPrototypeOf(proto);}

      if(!candidate||legacy(candidate)){ST.lastError='Cannot safely unwrap legacy TH300 '+k;return null;}

      base=candidate;

    }

    if(base!==obj[k]){

      const inherited=Object.getPrototypeOf(obj)?.[k];

      own=base===inherited?undefined:{value:base,writable:true,configurable:true,enumerable:!!own?.enumerable};

      note('HOOK-DEDUP',{method:k});

    }

    const wrapped=mk(base);Object.defineProperty(wrapped,'__KVPV_TH300_PARENT',{value:base});

    Object.defineProperty(obj,k,{value:wrapped,writable:true,configurable:true,enumerable:!!own?.enumerable});return {obj,k,fn:wrapped,own};

  }



  function unbind(){ST.basicImpactSerial=null;detachDispatch();for(const h of ST.movement.slice().reverse())restore(h);ST.movement=[];restore(ST.s);restore(ST.c);ST.s=null;ST.c=null;ST.positioning=false;}



  function atPosition(r){if(W.KVPV_FAR_SCOPE?.status?.()?.kind==='TRU_TIEN')return r.c?.target?.isValidRange?.()===true;const d=radius(r.a,r.c?.target),goal=targetDistance();return goal!==null&&outside(d)&&Math.abs(d-goal)<=CFG.tolerance+(ST.mode==='SCAN'&&ST.arrivalSnap?1:0)&&(ST.mode!=='STRICT'||d<=goal+0.2);}



  function castReady(){const r=role();return canFight()&&!ST.positioning&&atPosition(r);}



  function guardMovement(r){





    const entryGuard=()=>{const hr=combatOwner(),hp=prop(r.a,'hp');return ST.running&&

      W.KVPV_FAR_SCOPE?.status?.()?.kind==='THIEN_QUAN'&&!hr?.running&&

      W._Ba?._rJ?._O$?.ins?.isDead!==true&&Array.isArray(hp)&&Number(hp[1])>0&&Number(hp[0])/Number(hp[1])*100>35;};

    for(const method of ['moveTo','moveToCoordinate','moveByPath']){

    if(typeof r.m[method]!=='function')continue;

    const move=hook(r.m,method,native=>function(...args){

      // Keep ownership while holding the firing position too: native AI otherwise

      // immediately chases back into its original attack radius after arrival.

      if(ST.running&&W.KVPV_FAR_SCOPE?.status?.()?.kind!=='TRU_TIEN'&&(canFight()||entryGuard())&&eligible(r.c?.target)&&!towerFinish()&&!ST.ownMove){ST.blockedSteering++;return undefined;}

      return native.apply(this,args);

    });

    if(!move){for(const h of ST.movement.slice().reverse())restore(h);ST.movement=[];return false;}ST.movement.push(move);

    }

    if(!ST.movement.length)return false;

    if(typeof r.m.stop==='function'){

      const stopHook=hook(r.m,'stop',native=>function(...args){

        if(ST.running&&W.KVPV_FAR_SCOPE?.status?.()?.kind!=='TRU_TIEN'&&ST.positioning&&canFight()&&!towerFinish()&&!ST.ownMove&&!atPosition(r)){ST.blockedSteering++;return undefined;}

        return native.apply(this,args);

      });

      if(!stopHook){for(const h of ST.movement.slice().reverse())restore(h);ST.movement=[];return false;}ST.movement.push(stopHook);

    }

    return true;

  }





  const animationPlaying=c=>c?._jh?.isPlaying===true;





  const basicTailReady=()=>mixed.enabled&&ST.basicImpactSerial===ST.castAttempts&&ST.basicImpactSerial!==null;
  // TQ: only matched damage may release the tails of 8001..8005; other maps keep 8001/8005.
  const confirmedTailSkill=id=>tqFive?.active()?tqFive.ids().includes(Number(id)):[8001,8005].includes(Number(id));

  function nativeReady(c){

    const cutEnabled=confirmedTailCut;

    if(cutEnabled&&basicTailReady()&&canFight()){

      const cast=ST.casts.findLast?.(x=>x.serial===ST.basicImpactSerial),tween=c?._jh;

      if(cast?.used&&!cast.tailCut&&confirmedTailSkill(cast.id)&&cast.targetId===identity(c.target)&&cast.scene===scene()&&tween?.isPlaying===true&&typeof tween.stop==='function'){

        cast.tailCut=true;try{tween.stop();if(c._jh===tween)c._jh=null;confirmedTailCuts++;}

        catch(e){confirmedTailCut=false;ST.lastError=String(e?.message||e);}

      }

    }

    return (!animationPlaying(c)||basicTailReady())&&(typeof c?.isCooldown!=='function'||c.isCooldown()===false);

  }

  // In Tian Quan, let a basic skill with a native-ready selector row through
  // the extension's component-wide cooldown gate. Tuyet Hoc keeps native gating.
  function tqBasicDispatchReady(id,c){
    const token=ST.tqSelectedBasic,now=Date.now();
    return tqFive?.active()&&isBasic(id)&&token?.id===Number(id)&&
      token.targetId===identity(c?.target)&&token.scene===scene()&&
      now-token.at>=0&&now-token.at<=80&&(!animationPlaying(c)||basicTailReady());
  }




  function burstCast(r){

    const now=Date.now(),batchGap=Math.max(100,CFG.scanMs);if(now<burst.nextAt){ST.lastReason='waiting_burst_gap';return;}

    if(!nativeReady(r.c)){ST.lastReason='waiting_native_cooldown';return;}



    if(r.c.isValidTarget?.()!==true){ST.lastReason='native_target_invalid';return;}

    const selectorRows=[r.s?._rtt,r.s?._wet].flatMap(rows=>Array.isArray(rows)?rows:[]),
      readyIds=[...new Set(selectorRows.filter(row=>isTuyetHocSkill(Number(row?.[0]))&&
        Number.isFinite(Number(row?.[1]))&&Number(row[1])<now&&tqSelectableNative(Number(row[0])))
        .map(row=>Number(row[0])))],
      roster=skillNames().map(x=>x.id).filter(id=>readyIds.includes(id)),
      offset=roster.length?ST.skillCursor%roster.length:0,
      ids=roster.slice(offset).concat(roster.slice(0,offset));
    if(!ids.length){ST.lastReason='waiting_ready_tuyet_hoc';burst.lastPass={at:now,readyIds:[],attempted:[],selectorRejected:[],blockedBy:'no_native_ready_rows'};burst.nextAt=now+batchGap;return;}

    const group={serial:burst.serial+1,at:now,bossId:identity(r.c.target),scene:scene(),readyIds:ids.slice(),attempted:[],selectorRejected:[],confirmed:[],matchedDamage:0};

    burst.history.push(group);burst.active=group;

    burst.dispatch=true;burst.nextAt=now+batchGap;burst.lastPass=group;

    try{

      for(const id of ids){

        if(!castReady()||!eligible(r.c.target)||identity(r.c.target)!==group.bossId||scene()!==group.scene)break;

        burst.desired=id;const selected=Number(r.s.selectSkill?.());

        if(selected!==id){group.selectorRejected.push({id,selected:Number.isFinite(selected)?selected:null});continue;}

        const before=ST.castAttempts;r.c.combat(id);

        if(ST.castAttempts>before){group.attempted.push(id);ST.fastCasts++;}

      }

    }finally{burst.dispatch=false;burst.desired=null;burst.active=null;

      if(!group.attempted.length)burst.history.pop();
      else{burst.serial++;if(burst.history.length>30)burst.history.shift();}}

    ST.lastReason=group.attempted.length?'burst_dispatched':ST.casts.some(c=>!c.used&&c.targetId===identity(r.c.target)&&c.scene===scene())?'burst_waiting_results':'waiting_ready_tuyet_hoc';

  }




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

    const pace=currentPace();

    if(!castReady())return;


    if(burst.enabled&&!transforming())return burstCast(r);

    if(Date.now()-ST.lastInvocation<pace){ST.lastReason='waiting_pace';return;}
    if(thGapCast(r))return;

    if(typeof r.c.isCooldown!=='function'){ST.lastReason='native_cooldown_unavailable';return;}

    if(!nativeReady(r.c)){ST.lastReason=animationPlaying(r.c)?'waiting_native_animation':'waiting_native_cooldown';return;}

    if(typeof r.c.isValidTarget!=='function'||r.c.isValidTarget()!==true){ST.lastReason='native_target_invalid';return;}

    const skill=Number(r.s.selectSkill?.());

    if(allowed(skill,Number(prop(r.c.target,'occ')),radius(r.a,r.c.target))){r.c.combat(skill);ST.fastCasts++;ST.lastReason='casting_native_skill';}

    else ST.lastReason=CFG.basicOnly?'waiting_ready_basic_'+String(basicRotation()[0]??mixed.rotation[0]??8001):basicSolo4100Active()?'waiting_ready_basic':'waiting_ready_tuyet_hoc';

  }

  // At the last 2% HP of a native dungeon Boss, the far-ring selector
  // cannot run. Cast learned native basics in melee through the owned combat
  // method, without changing native cooldown rows or sending custom RPCs.
  function dungeonFinishBasic(r){
    if(!towerFinish()||!canFight()||!eligible(r.c?.target))return false;
    if(typeof r.c?.isValidTarget==='function'&&r.c.isValidTarget()!==true){
      ST.lastReason='dungeon_finish_invalid_target';return false;
    }
    if(typeof r.c?.isValidRange==='function'&&r.c.isValidRange()!==true){
      ST.lastReason='dungeon_finish_out_of_native_range';return false;
    }
    const now=Date.now();
    if(now-ST.lastInvocation<Math.max(1,currentPace())){
      ST.lastReason='dungeon_finish_waiting_pace';return false;
    }
    if(!nativeReady(r.c)){
      ST.lastReason='dungeon_finish_waiting_native_ready';return false;
    }
    const learned=[...(r.s?._rtt??[]),...(r.s?._wet??[])].filter(row=>
      Array.isArray(row)&&Number.isSafeInteger(Number(row[0]))&&
      Number(row[0])>=8001&&Number(row[0])<=8005&&
      selectedBasic(Number(row[0]))&&
      Number.isFinite(Number(row[1]))&&Number(row[1])<now);
    if(!learned.length){
      ST.lastReason='dungeon_finish_waiting_basic_ready';return false;
    }
    const id=Number(learned[ST.finishCursor%learned.length][0]);
    ST.finishCursor=(ST.finishCursor+1)%5;
    r.c.combat(id); // through the existing native finish combat wrapper
    ST.lastInvocation=now;ST.fastCasts++;
    ST.lastReason='dungeon_finish_basic_cast';
    return true;
  }


  function onHit(source,marker,damage,flags,receiver){

    if(!ST.running)return;hitDiagnostics.received++;

    const reject=reason=>{hitDiagnostics.rejected[reason]=(hitDiagnostics.rejected[reason]||0)+1;

      if(String(source)===actorId){hitDiagnostics.recent.push({at:Date.now(),reason,source:String(source),receiver:String(receiver),marker:Number(marker),damage:Number(damage),flags:Number(flags)});if(hitDiagnostics.recent.length>16)hitDiagnostics.recent.shift();}};

    if(String(source)!==actorId){reject('foreign_source');return;}

    if(String(receiver)!==identity(ST.target)){reject('wrong_receiver');return;}

    if(!(Number(damage)>0)){reject('nonpositive_damage');return;}

    const raw=Number(marker),id=raw/10000,fl=Number(flags)||0;



    if(!Number.isSafeInteger(raw)||raw%10000){reject('unsupported_marker');return;}

    if(!candidate(id)&&!isBasic(id)){reject('unsupported_skill');return;}

    if(fl&(4|16|32|64|128|256)){reject('auxiliary_flags');return;}

    const d=radius(role().a,ST.target);ST.lastHitDistance=d==null?null:+d.toFixed(2);

    const closeBasic=id===8001&&mixed.hitQuota!==null&&towerFinish()&&canFight();if(!outside(d)&&!closeBasic){reject('hit_outside_trial_band');return;}

    const t=Date.now();const cast=ST.casts.findLast?.(c=>!c.used&&c.targetId===identity(ST.target)&&c.scene===scene()&&c.occ===ST.targetOcc&&c.id===id&&t-c.time>=0&&t-c.time<=CFG.castTtlMs&&(outside(c.distance)||closeBasic&&c.finishBasic));

    if(!cast){reject('no_matching_pending_cast');return;}hitDiagnostics.accepted++;

    if(cast.basicTrial){
      if(tqFive?.active()&&isBasic(id)){const sample=thGap.measured.get(id)||{hits:0,damage:0};sample.hits++;sample.damage+=Number(damage);keepRecentHit(sample,damage);thGap.measured.set(id,sample);}
      tqFive?.hit?.(cast.serial,cast.distance,d,Number(damage));if(cast.mixedBasic&&id===8001&&mixed.hitQuota!==null){mixed.confirmedSinceTH++;mixed.wantBasic=mixed.confirmedSinceTH<mixed.hitQuota;}cast.used=true;if(cast.mixedBasic&&cast.serial===ST.castAttempts)ST.basicImpactSerial=cast.serial;const metric=stats(cast.occ,id);metric.hits++;metric.damage+=Number(damage);



      metrics?.result(cast.serial,true,damage);const result=mixed;result.hits++;result.damage+=Number(damage);if(cast.mixedBasic)mixed.suspended=false;

      result.examples.push({id,bossId:cast.targetId,scene:cast.scene,castDistance:cast.distance,hitDistance:d,damage:Number(damage)});

      if(result.examples.length>30)result.examples.shift();note('BASIC-CONFIRMED',result.examples.at(-1));return;}

    cast.used=true;
    if(cast.ambiguousTH){
      // Correlate damage for DPS only, not to any single unique TH cast.
      tqIdleFill.ambiguousHits++;
      metrics?.result(cast.serial,true,damage);
      const metric=stats(cast.occ,id);metric.hits++;metric.damage+=Number(damage);
      note('TH-OVERLAP-HIT-AMBIGUOUS',{id,damage:Number(damage)});
      return;
    }
    ST.confirmedPairs++;

    if(cast.burstSerial!=null){const g=burst.history.find(x=>x.serial===cast.burstSerial);if(g){g.confirmed.push(id);g.matchedDamage+=Number(damage);}}

    metrics?.result(cast.serial,true,damage);settle(cast,true);

    const k=key(cast.occ,id),set=ST.proofs.get(k)||new Set();set.add(cast.serial);ST.proofs.set(k,set);

    const observations=ST.evidence.get(k)||[];observations.push({castDistance:cast.distance,hitDistance:d});if(observations.length>100)observations.shift();ST.evidence.set(k,observations);

    const metric=stats(cast.occ,id);metric.hits++;metric.damage+=Number(damage);
    if(tqFive?.active()&&id>=1001&&id<=1008){const row=cosmic.thMeasured.get(id)||{hits:0,damage:0};
      row.hits++;row.damage+=Number(damage);keepRecentHit(row,damage);cosmic.thMeasured.set(id,row);}

    note('CONFIRMED',{id,castDistance:cast.distance,hitDistance:+d.toFixed(2),pairs:set.size});

  }



  function unlisten(){ST.tqSelectedNative=null;resetThGap();cosmicReset();metrics?.close(ST.running?'target_changed':'stopped');if(ST.target){try{ST.target.off?.(1012,ST.owner,onHit);}catch(_){window.KVPV_V1?.diagnostics?.record(_);}}ST.target=null;ST.targetOcc=null;ST.targetKey=null;ST.casts=[];}



  function listen(t){const targetKey=identity(t)+'/'+String(prop(t,'occ'))+'/'+scene();if(t===ST.target&&targetKey===ST.targetKey)return;unlisten();if(!eligible(t))return;if(ST.targetKey&&targetKey!==ST.targetKey&&thCalibration.autoLocked){thCalibration.autoLocked=false;thCalibration.skillId=null;thCalibration.completedAt=null;thCalibration.reason='new_boss_recalibration';ST.mode='SCAN';}ST.target=t;ST.targetKey=targetKey;ST.positionSample=null;ST.positionRetries=0;ST.positionOffset=0;ST.positionCommands=0;ST.positionPause=null;ST.positionRecovery=0;ST.arrivalSample=null;ST.arrivalSnap=false;ST.basicImpactSerial=null;ST.lastInvocation=-Infinity;ST.skillCursor=0;ST.moveGoal=null;ST.lastMove=-Infinity;ST.positioning=true;ST.lastOwnerPhase=null;burst.nextAt=0;{mixed.primaryStreak=0;mixed.rotationCursor=0;mixed.wantBasic=mixed.primary&&(mixed.hitQuota===null||mixed.confirmedSinceTH<mixed.hitQuota);mixed.suspended=false;mixed.unconfirmed=0;mixed.ready.clear();hitDiagnostics.received=0;hitDiagnostics.accepted=0;hitDiagnostics.rejected={};hitDiagnostics.recent=[];mixed.attempts=0;mixed.hits=0;mixed.damage=0;mixed.examples=[];}ST.targetOcc=Number(prop(t,'occ'));metrics?.open({key:targetKey,bossId:identity(t),bossName:String(prop(t,'name')??''),actor:actorId,occ:ST.targetOcc,scene:scene()});try{t.on?.(1012,ST.owner,onHit);}catch(e){ST.lastError='listen: '+String(e);}}





  function selectBasic(native,selector,all,mode,occ,d){

    const basicWait=tqFive?.active()?tqFive.wait():mixed.basicPaceMs,now=Date.now(),paced=(tqFive?.active()||mixed.enabled)&&basicWait!==null;

    const rotation=basicRotation(),order=rotation.slice(mixed.rotationCursor).concat(rotation.slice(0,mixed.rotationCursor));
    const basicFallback=(a,b)=>{
      if(basicSolo4100Active()){
        const ai=basicSolo4100Prior.indexOf(Number(a[0])),bi=basicSolo4100Prior.indexOf(Number(b[0]));
        if(ai!==bi&&ai>=0&&bi>=0)return ai-bi;
      }
      return rotation.length?order.indexOf(Number(a[0]))-order.indexOf(Number(b[0])):Number(a[0])-Number(b[0]);
    };

    const rows=all.filter(row=>isBasic(row?.[0])&&(!mixed.primary||(rotation.length?rotation.includes(Number(row[0])):Number(row[0])===primaryBasicId()))&&allowed(Number(row[0]),occ,d)&&Number.isFinite(Number(row[1]))&&(!basicSolo4100Active()||Number(row[1])<now))

      .map(row=>{if(!paced)return row;const id=Number(row[0]),copy=row.slice();

        if(!mixed.ready.has(id))mixed.ready.set(id,Number(row[1])<now?0:now+Math.min(basicWait,Math.max(0,Number(row[1])-now)));

        copy[1]=mixed.ready.get(id);copy[2]=basicWait;return copy;})

      .filter(row=>Number(row[1])<now)

      .sort((a,b)=>{
        if(thGap.picking){const best=strongestThGapBasic();if(best!==null){const ap=Number(a[0])===best,bp=Number(b[0])===best;if(ap!==bp)return ap?-1:1;}}
        return basicSolo4100Active()?basicFallback(a,b):rotation.length?order.indexOf(Number(a[0]))-order.indexOf(Number(b[0])):Number(stats(occ,Number(b[0])).hits>0)-Number(stats(occ,Number(a[0])).hits>0);
      });
    if(cosmicActive()&&!thGap.picking)cosmicRank(rows,'basic',basicFallback);

    const nativeBasicReady=new Set(all.filter(row=>isBasic(row?.[0])&&Number.isFinite(Number(row?.[1]))&&Number(row[1])<now).map(row=>Number(row[0])));
    const id=Number(native.call(selector,rows,[],mode));
    ST.tqSelectedBasic=isBasic(id)&&nativeBasicReady.has(id)?{id,at:Date.now(),targetId:identity(role().c?.target),scene:scene()}:null;

    if(paced&&isBasic(id)){const picked=rows.find(row=>Number(row[0])===id);if(picked)mixed.ready.set(id,Math.max(now+basicWait,Number(picked[1])||0));}

    return id;

  }

  function bind(r){W.KVPV_BASIC10?.release?.();if(ST.s?.obj===r.s&&ST.c?.obj===r.c&&r.s?._f7t===ST.s.fn&&r.c?.combat===ST.c.fn)return true;

    if(ST.s?.obj===r.s&&ST.c?.obj===r.c){

      // HitRun temporarily wraps our function while dodging/healing. Keep that

      // exact chain intact; rewrapping it would multiply attempts each scan.

      if(r.s?._f7t===ST.s.fn&&r.c?.combat?.__KVPV_GUARD_PARENT===ST.c.fn)return true;

      ST.lastError='Unexpected external skill/combat hook; refresh before resuming';return false;

    }

    unbind();

    attachDispatch(r.a);

    const s=hook(r.s,'_f7t',native=>function(active,common,mode){
      if(tqFive?.active()&&ST.running&&this===r.s&&!transforming()){
        const all=[...(Array.isArray(active)?active:[]),...(Array.isArray(common)?common:[])],occ=Number(prop(r.c.target,'occ')),d=radius(r.a,r.c.target);
        const pickBasic=()=>selectBasic(native,this,all,mode,occ,d);
        const cooldownReady=thGap.picking?thGapNativeReady(r.c):nativeReady(r.c);
        const readyBasic=all.some(row=>isBasic(row?.[0])&&Number.isFinite(Number(row?.[1]))&&Number(row[1])<Date.now());
        if(mode!==1||!eligible(r.c?.target)||!castReady()||(!cooldownReady&&(!readyBasic||animationPlaying(r.c)))||Date.now()-ST.lastInvocation<currentPace())return -1;
        // A component cooldown can reflect a different skill. When the native
        // basic row is ready, pick only that basic until the component is clear.
        if(!cooldownReady)return pickBasic();
        if(basicSolo4100Active()||!tqFive.allowsTuyetHoc()||thGap.picking)return pickBasic();
        const roster=skillNames().map(x=>x.id).filter(tqSelectableNative),offset=roster.length?ST.skillCursor%roster.length:0,order=roster.slice(offset).concat(roster.slice(0,offset));
        const pickTH=()=>{
          ST.tqSelectedNative=null;
          const rows=cosmicRank(all.filter(row=>tqSelectableNative(Number(row?.[0]))&&Number.isFinite(Number(row[1]))&&Number(row[1])<Date.now()&&allowed(Number(row[0]),occ,d)),'th',(a,b)=>order.indexOf(Number(a[0]))-order.indexOf(Number(b[0])));
          const id=Number(native.call(this,rows,[],mode));
          if(rows.some(row=>Number(row?.[0])===id))
            ST.tqSelectedNative={id,at:Date.now(),targetId:identity(r.c?.target),scene:scene()};
          return id;
        };
        if(pilot4100THOnly())return pickTH();
        const first=mixed.wantBasic?pickBasic:pickTH,second=mixed.wantBasic?pickTH:pickBasic,id=first();return isBasic(id)||tqSelectableNative(id)?id:second();
      }

      if(CFG.basicOnly&&ST.running&&this===r.s&&(W.KVPV_FAR_SCOPE??W.KVPV_TQ_SCOPE)?.inside?.()!==false){

        if(W.KVPV_FAR_SCOPE?.status?.()?.kind==='TRU_TIEN'&&!eligible(r.c?.target))return native.call(this,active,common,mode); // Let native acquire a target; no forced casting.
        if(!eligible(r.c?.target)||!(towerFinish()?canFight():castReady())||!nativeReady(r.c))return -1;

        const rows=[...(Array.isArray(active)?active:[]),...(Array.isArray(common)?common:[])].filter(row=>Number(row?.[0])===(basicRotation()[0]??mixed.rotation[0]??8001));

        return selectBasic(native,this,rows,mode,Number(prop(r.c.target,'occ')),radius(r.a,r.c.target));

      }

      if(ST.running&&this===r.s&&!transforming()&&!burst.dispatch&&(W.KVPV_FAR_SCOPE??W.KVPV_TQ_SCOPE)?.inside?.()!==false&&Date.now()-ST.lastTHAt<CFG.afterTHWaitMs)return -1;

      if(ST.running&&this===r.s&&towerFinish()&&canFight()&&!transforming()){

        const filter=rows=>Array.isArray(rows)?rows.filter(row=>isBasic(row?.[0])?selectedBasic(row[0]):mixed.hitQuota===null||Number(row[0])<1001||Number(row[0])>1008||mixed.confirmedSinceTH>=mixed.hitQuota):rows;

        return native.call(this,filter(active),filter(common),mode);

      }

      if(ST.running&&this===r.s&&mode===2&&transforming()&&(W.KVPV_FAR_SCOPE??W.KVPV_TQ_SCOPE)?.inside?.()!==false){

        if(!eligible(r.c?.target)||!castReady()||!nativeReady(r.c)||((pacer||scopedCombat()||tqFive?.active())&&Date.now()-ST.lastInvocation<currentPace()))return -1;

        const occ=Number(prop(r.c.target,'occ')),dist=radius(r.a,r.c.target);

        const filter=rows=>(Array.isArray(rows)?rows:[]).filter(row=>allowed(Number(row?.[0]),occ,dist));

        return W.KVPV_TRANSFORM10.select(native,this,filter(active),filter(common),mode);

      }

      if(!ST.running||this!==r.s||mode!==1||(W.KVPV_FAR_SCOPE??W.KVPV_TQ_SCOPE)?.inside?.()===false)return native.apply(this,arguments);

      if(!eligible(r.c?.target)||!Array.isArray(active))return -1;



      if(mixed.enabled&&!mixed.suspended&&mixed.wantBasic&&skillPriority==='interleaved'){

        if(!castReady()||!nativeReady(r.c))return -1;

        const occ=Number(prop(r.c.target,'occ')),d=radius(r.a,r.c.target);

        const picked=selectBasic(native,this,[...active,...(Array.isArray(common)?common:[])],mode,occ,d);

        if(isBasic(picked))return picked;



      }

      const dist=radius(r.a,r.c.target),occ=Number(prop(r.c.target,'occ'));

      if(!castReady()||(!burst.dispatch&&!nativeReady(r.c))||!outside(dist)||((pacer||scopedCombat()||tqFive?.active())&&!burst.dispatch&&Date.now()-ST.lastInvocation<currentPace())){ST.skillWaits++;return -1;}

    const filter=rows=>Array.isArray(rows)?rows.filter(x=>!isBasic(x?.[0])&&(!tianQuanThMode()||isTuyetHocSkill(Number(x?.[0]))&&!(ST.mode==='STRICT'&&thCalibration.autoLocked&&(thCalibration.skillId===null||Number(x?.[0])!==thCalibration.skillId)))&&allowed(Number(x?.[0]),occ,dist)&&(!burst.dispatch||(Number(x[0])===burst.desired&&Number.isFinite(Number(x[1]))&&Number(x[1])<Date.now()))):[];

      // Rotate the original native rows so SCAN exercises the whole ready kit.

      // Rows and their cooldown timestamps are never copied or rewritten.

      const roster=skillNames().map(x=>x.id).filter(id=>!tianQuanThMode()||isTuyetHocSkill(Number(id))),offset=roster.length?ST.skillCursor%roster.length:0;

      const order=roster.slice(offset).concat(roster.slice(0,offset));

      const tower=['LINH_LUNG','PHU_VAN','TRU_TIEN'].includes(W.KVPV_FAR_SCOPE?.status?.().kind),fairTurn=ST.castAttempts%4===0;

      const score=id=>{const m=stats(occ,Number(id));return m.hits>=2?m.damage/m.hits:0;};

      const ranked=rows=>filter(rows).sort((a,b)=>{

        if((skillPriority==='tuyet_hoc_first'||tower&&!mixed.enabled)&&!fairTurn){const delta=score(b[0])-score(a[0]);if(delta)return delta;}

        return order.indexOf(Number(a[0]))-order.indexOf(Number(b[0]));

      });

      const picked=Number(native.call(this,ranked(active),ranked(common),mode));

      if(allowed(picked,occ,dist)){ST.seen.add(picked);return picked;}

      if(mixed.enabled&&!mixed.suspended&&nativeReady(r.c)){

        const basic=selectBasic(native,this,[...active,...(Array.isArray(common)?common:[])],mode,occ,dist);if(isBasic(basic))return basic;

      }

      ST.skillWaits++;return -1;

    });

    if(!s){ST.lastError='Selector hook unavailable';return false;}

    const c=hook(r.c,'combat',native=>function(skillId){
      if(ST.running&&this===r.c&&basicSolo4100Active()&&Number(skillId)>=1001&&Number(skillId)<=1008){basicSolo4100.blockedTH++;ST.blocked++;return undefined;}

      if(CFG.basicOnly&&!tqFive?.active()&&ST.running&&this===r.c&&(W.KVPV_FAR_SCOPE??W.KVPV_TQ_SCOPE)?.inside?.()!==false&&Number(skillId)!==(basicRotation()[0]??8001)){ST.blocked++;return undefined;}

      if(ST.running&&this===r.c&&!transforming()&&!burst.dispatch&&(W.KVPV_FAR_SCOPE??W.KVPV_TQ_SCOPE)?.inside?.()!==false&&Date.now()-ST.lastTHAt<CFG.afterTHWaitMs){ST.blocked++;return;}

      if(ST.running&&this===r.c&&(W.KVPV_FAR_SCOPE??W.KVPV_TQ_SCOPE)?.inside?.()!==false&&isBasic(skillId)&&!selectedBasic(skillId)){ST.blocked++;return undefined;}

      if(ST.running&&this===r.c&&towerFinish()&&canFight()&&!transforming()){

        const id=Number(skillId);

        if(mixed.hitQuota!==null){

          if(id>=1001&&id<=1008&&!isTransformSkill(id)&&mixed.confirmedSinceTH<mixed.hitQuota){ST.blocked++;return;}

          if(id===8001){expire();if(ST.casts.some(c=>!c.used&&basicPendingBlocks(c)&&c.id===id&&c.targetId===identity(this.target)&&Date.now()-c.time<=CFG.castTtlMs)){ST.blocked++;return;}

            ST.castAttempts++;mixed.attempts++;ST.casts.push({serial:ST.castAttempts,id,occ:Number(prop(this.target,'occ')),targetId:identity(this.target),scene:scene(),time:Date.now(),distance:radius(r.a,this.target),used:false,basicTrial:true,mixedBasic:true,finishBasic:true});}

        }

        return invokeNative(native,this,arguments);

      }

      if(ST.running&&this===r.c&&(W.KVPV_FAR_SCOPE??W.KVPV_TQ_SCOPE)?.inside?.()!==false){

        const id=Number(skillId),occ=Number(prop(this.target,'occ')),d=radius(r.a,this.target);
        const gapBasic=thGap.picking&&isBasic(id)&&id<=8005&&thGapActive(this)&&thGapNativeReady(this);

        const basicCooldownReady=tqBasicDispatchReady(id,this);
        if(!eligible(this.target)||!castReady()||(!burst.dispatch&&!gapBasic&&!basicCooldownReady&&!nativeReady(this))||!allowed(id,occ,d)||!outside(d)||((pacer||scopedCombat()||tqFive?.active())&&!burst.dispatch&&Date.now()-ST.lastInvocation<currentPace())){ST.blocked++;return undefined;}

        if(animationPlaying(this)&&basicTailReady())ST.basicTailReleases++;

        ST.lastInvocation=Date.now();

        const roster=skillNames().map(x=>x.id);if(!isBasic(id))ST.skillCursor=Math.max(0,roster.indexOf(id)+1);

        if(mixed.enabled){const order=basicRotation();if(order.includes(id))mixed.rotationCursor=(order.indexOf(id)+1)%order.length;mixed.primaryStreak=isBasic(id)?mixed.primaryStreak+1:0;mixed.wantBasic=(mixed.primary?(mixed.hitQuota!==null?mixed.confirmedSinceTH<mixed.hitQuota:mixed.primaryStreak<basicQuota()):!isBasic(id))&&!mixed.suspended;if(isBasic(id))mixed.attempts++;}

        expire();stats(occ,id).attempts++;

        // Overlapping same-ID pending casts have ambiguous cast-to-hit identity.
        // They can count toward observed damage but never independent TH range proof.
        const overlap=tqIdleFill.enabled&&ST.tqSelectedNative?.id===id&&
          ST.tqSelectedNative.targetId===identity(this.target)&&
          !isBasic(id)&&tqFive?.active()&&tqDistanceOnly()&&
          ST.casts.filter(c=>!c.used&&c.id===id&&c.targetId===identity(this.target)&&
            c.scene===scene()&&Date.now()-c.time<=CFG.castTtlMs)||[];
        if(overlap.length){for(const previous of overlap)previous.ambiguousTH=true;tqIdleFill.repeatCalls++;}
        ST.castAttempts++;ST.casts.push({serial:ST.castAttempts,id,occ,targetId:identity(this.target),scene:scene(),time:Date.now(),distance:d,used:false,ambiguousTH:overlap.length>0,basicTrial:mixed.enabled&&isBasic(id),mixedBasic:mixed.enabled&&isBasic(id),burstSerial:burst.active?.serial??null,tuningEligible:!isBasic(id)&&!burst.dispatch&&!transforming()&&verified(occ,id)});

        ST.tqSelectedNative=null;ST.tqSelectedBasic=null;
        if(tqFive?.active()&&isBasic(id)){ST.casts.at(-1).basicTrial=true;ST.casts.at(-1).mixedBasic=true;tqFive.cast(ST.castAttempts,id,d);mixed.rotationCursor=(tqFive.ids().indexOf(id)+1)%tqFive.ids().length;}


        metrics?.cast(ST.castAttempts,id,currentPace());

        if(ST.casts.length>250)ST.casts.splice(0,ST.casts.length-250);

      }

      return invokeNative(native,this,arguments);

    });

    if(!c){restore(s);ST.lastError='Combat hook unavailable';return false;}

    ST.s=s;ST.c=c;

    if(!guardMovement(r)){unbind();ST.lastError='Movement ownership unavailable';return false;}

    return true;

  }



  function tick(){if(!ST.running)return;W.KVPV_TQ_BASIC_FORCE?.sync?.();localLogCleanupSync();
    tqFive?.tick();ensureTianQuanRotation();


    ST.lastTickAt=Date.now();


    // User-requested: no extension-side polling gap. Native cooldown gates remain intact.
    ST.lastBackgroundTick=Date.now();


    try{

      if(!canFight()||!atPosition(role()))for(const c of ST.casts)if(!c.used){c.tuningEligible=false;c.metricsInterrupted=true;}

        expire();updateTuyetHocCalibration();

      if(String(W._Ba?._rJ?._O$?.ins?.actorId??'')!==actorId||W.__KVPV_UNIVERSAL_HALTED){stop('actor changed');return;}

      if((W.KVPV_FAR_SCOPE??W.KVPV_TQ_SCOPE)?.inside?.()===false){releaseOutsideScope();ST.lastReason='outside_tianquan_native_combat';return;}

      const r=role();if(!r.a||!r.s||!r.c||!r.m){ST.lastReason='missing_components';return;}

      const owner=combatOwner(),previousPhase=ST.lastOwnerPhase;

      ST.lastOwnerPhase=owner?.phase??'OFF';

      if(!bind(r)){ST.lastReason='hook_failed';return;}

      if(!eligible(r.c.target)){unlisten();ST.lastReason=W.KVPV_FAR_SCOPE?.status?.()?.kind==='TRU_TIEN'?'trutien_waiting_native_monster_target':'not_tianquan_boss';return;}



      pacer?.context(identity(r.c.target)+'/'+String(prop(r.c.target,'occ'))+'/'+scene()+'/'+(transforming()?'transform':'native'));

      const newPositionTarget=ST.target!==r.c.target||ST.targetKey!==identity(r.c.target)+'/'+String(prop(r.c.target,'occ'))+'/'+scene();

      listen(r.c.target);
      observeApexRhythm(ST.targetKey,prop(r.a,'hp')?.[0]);
      observePilot4100();





      if(newPositionTarget&&W.KVPV_FAR_SCOPE?.status?.()?.kind!=='TRU_TIEN'&&((owner?.running&&owner.phase==='FIGHT'&&canFight())||

        (!owner?.running&&W.KVPV_FAR_SCOPE?.status?.()?.kind==='THIEN_QUAN'&&W._Ba?._rJ?._O$?.ins?.isDead!==true))){

        ST.ownMove=true;try{r.m.stop?.();}finally{ST.ownMove=false;}

      }

      if(towerFinish()&&canFight()){
        ST.positioning=false;ST.moveGoal=null;
        const kind=W.KVPV_FAR_SCOPE?.status?.()?.kind,
          targetKey=kind+'/'+scene()+'/'+identity(r.c.target),
          a=loc(r.a),b=loc(r.c.target),d=radius(r.a,r.c.target);
        const nativeRange=Number(W._ft?._tY?.ins?.getCfgById?.(Number(prop(r.c.target,'occ')))?.[3]);
        if(ST.finishTarget!==targetKey){
          ST.finishTarget=targetKey;ST.finishCursor=0;
          ST.finishLastMove=-Infinity;ST.finishMoveAttempts=0;
        }
        if(!a||!b||!Number.isFinite(d)||!(Number.isFinite(nativeRange)&&nativeRange>0)){
          ST.lastReason='dungeon_finish_waiting_position_or_native_range';return;
        }
        ST.lastDistance=+d.toFixed(2);
        const validRange=typeof r.c.isValidRange==='function'?r.c.isValidRange()===true:true;
        const goal=nativeRange*.8;
        // Re-approach if the Boss moves, but never fight over HitRun recovery.
        if(d>goal+CFG.tolerance||!validRange){
          const now=Date.now(),moving=r.m.running?.()===true;
          if(moving||now-ST.finishLastMove<600||ST.finishMoveAttempts>=6){
            ST.lastReason=moving?'dungeon_finish_approaching':ST.finishMoveAttempts>=6?
              'dungeon_finish_approach_paused':'dungeon_finish_move_wait';
            return;
          }
          const nextGoal=!validRange&&d<=goal+CFG.tolerance?Math.max(1,d-20):goal;
          if(typeof r.m.moveTo!=='function'){ST.lastReason='dungeon_finish_no_mover';return;}
          ST.ownMove=true;
          try{
            r.m.stop?.();
            r.m.moveTo(b.x+(a.x-b.x)/Math.max(d,1)*nextGoal,
                       b.y+(a.y-b.y)/Math.max(d,1)*nextGoal);
            ST.moves++;ST.finishMoveAttempts++;ST.finishLastMove=now;
          }finally{ST.ownMove=false;}
          ST.lastReason='dungeon_finish_approaching';return;
        }
        dungeonFinishBasic(r);return;
      }
// Finish phase ends only when native Boss HP rises above 2% or Boss changes.
      ST.finishTarget=null;ST.finishCursor=0;ST.finishMoveAttempts=0;ST.finishLastMove=-Infinity;

      // Tru Tien uses native chase/range, not the Tian Quan 310-position controller.
      if(W.KVPV_FAR_SCOPE?.status?.()?.kind==='TRU_TIEN'){
        ST.positioning=false;ST.moveGoal=null;ST.lastDistance=radius(r.a,r.c.target);
        if(!canFight()){ST.lastReason='trutien_hitrun_wait';return;}
        if(atPosition(r)){ST.lastReason='trutien_native_range';fastCast(r);}
        else {
          // HitRun may enter FIGHT without requesting a native chase.
          // Issue a bounded waypoint only when idle; never override user UI or recovery.
          const a=loc(r.a),b=loc(r.c.target),d=radius(r.a,r.c.target);
          const nativeRange=Number(W._ft?._tY?.ins?.getCfgById?.(Number(prop(r.c.target,'occ')))?.[3]);
          const goal=Number.isFinite(nativeRange)&&nativeRange>0?Math.min(80,nativeRange*.7):40;
          const now=Date.now();
          if(a&&b&&Number.isFinite(d)&&d>goal+5&&
             now-ST.lastMove>=1000&&
             r.m.running?.()!==true&&
             now>=Number(W.__KVPV_USER_UI_UNTIL||0)&&
             !W._Ba?._K_t?._Z7t?.ins?.gathering&&
             typeof r.m.moveTo==='function'){
            ST.ownMove=true;
            try{r.m.moveTo(b.x+(a.x-b.x)/Math.max(d,1)*goal,
                           b.y+(a.y-b.y)/Math.max(d,1)*goal);
                ST.lastMove=now;ST.moves++;ST.lastReason='trutien_chase_commanded';}
            finally{ST.ownMove=false;}
          }else ST.lastReason='trutien_native_approach';
        }
        return;
      }
      const goal=targetDistance();

      if(goal===null){ST.lastReason='waiting_verified_skill';return;}

      if(goal<=CFG.min){ST.lastReason='goal_inside_boss_range';return;}

      const hr=owner;



      if(!hr?.running||hr.phase!=='FIGHT'){ST.basicImpactSerial=null;ST.positioning=false;ST.lastReason='hitrun_'+(hr?.phase||'off');return;}

      if(!canFight()){ST.positioning=false;ST.lastReason='low_hp_or_disabled';return;}



      if(previousPhase&&previousPhase!=='FIGHT'){

        // HitRun releases guards at full HP but its last orbit path may still

        // be running. Cancel it and discard pre-recovery positioning state.

        ST.ownMove=true;try{r.m.stop?.();}finally{ST.ownMove=false;}

        ST.positionSample=null;ST.positionRetries=0;ST.positionOffset=0;ST.positionCommands=0;ST.positionPause=null;ST.positionRecovery=0;ST.arrivalSample=null;ST.arrivalSnap=false;ST.moveGoal=null;ST.lastMove=-Infinity;ST.positioning=true;if(previousPhase==='RETREAT')ST.resumes++;

        if(previousPhase==='RETREAT')metrics?.resume();

        note('RESUME',{from:previousPhase,bossId:identity(r.c.target),goal});

      }

      if(W.document?.hidden&&W.KVPV_ACCOUNT_POLICY?.config?.pauseWhenHidden===true){ST.lastReason='hidden_tab';return;}

      const a=loc(r.a),b=loc(r.c.target),d=radius(r.a,r.c.target);

      ST.lastDistance=d==null?null:+d.toFixed(2);

      if(!a||!b||d==null){ST.lastReason='unknown_position';return;}







      const snapCandidate=ST.mode==='SCAN'&&(ST.moveGoal||ST.arrivalSnap)&&outside(d)&&Math.abs(d-goal)<=CFG.tolerance+1;

      if(!snapCandidate){ST.arrivalSample=null;ST.arrivalSnap=false;}

      else{

        const sample=ST.arrivalSample;

        if(!sample||Math.hypot(a.x-sample.ax,a.y-sample.ay)>.25||Math.hypot(b.x-sample.bx,b.y-sample.by)>.25){

          ST.arrivalSample={ax:a.x,ay:a.y,bx:b.x,by:b.y,at:Date.now()};ST.arrivalSnap=false;

        }else if(!ST.arrivalSnap&&Date.now()-sample.at>=1000){

          ST.arrivalSnap=true;note('NATIVE-ARRIVAL-SNAP',{distance:d,goal,extraTolerance:1});

        }

      }

      if(atPosition(r)){

        // Arrival is measured from the moving Boss, not from path completion.

        // Stop our remaining path before casting so it cannot carry us past it.

        if(ST.positioning&&ST.moveGoal){ST.ownMove=true;try{r.m.stop?.();}finally{ST.ownMove=false;}}

        ST.positioning=false;ST.moveGoal=null;ST.positionSample=null;ST.positionRetries=0;ST.positionOffset=0;ST.positionCommands=0;ST.positionPause=null;ST.positionRecovery=0;ST.lastReason='holding_far';fastCast(r);return;

      }

      ST.positioning=true;

      if(ST.positionPause){

        if(Math.hypot(b.x-ST.positionPause.x,b.y-ST.positionPause.y)<20&&Date.now()-ST.positionPause.at<8000){ST.lastReason=ST.positionPause.reason;return;}

        ST.positionPause=null;ST.positionCommands=0;ST.positionRetries=0;ST.positionOffset=0;

        ST.positionSample=null;ST.moveGoal=null;ST.lastMove=-Infinity;ST.positionRecovery++;

        note('POSITION-RECOVERY',{cycle:ST.positionRecovery,distance:d});

      }

      if(ST.positionCommands>=24){

        ST.ownMove=true;try{r.m.stop?.();}finally{ST.ownMove=false;}

        ST.positionPause={x:b.x,y:b.y,at:Date.now(),reason:'position_oscillation_bounded'};ST.lastReason='position_oscillation_bounded';

        note('POSITION-OSCILLATION-PAUSED',{distance:d,goal,commands:ST.positionCommands});return;

      }







      const progress=ST.positionSample;

      if(!progress||Math.hypot(a.x-progress.ax,a.y-progress.ay)>.75||Math.hypot(b.x-progress.bx,b.y-progress.by)>.75)

        ST.positionSample={ax:a.x,ay:a.y,bx:b.x,by:b.y,at:Date.now()};

      else if(ST.moveGoal&&Date.now()-progress.at>=1800&&ST.positionRetries<6){

        ST.positionRetries++;
        // Native path may stop short on either side of the 310-radius ring.
        // For a too-distant actor, request a slightly *closer* waypoint; do not widen attack range.
        ST.positionOffset=d<goal?Math.min(32,ST.positionRetries*8):d>goal+CFG.tolerance?-Math.min(24,ST.positionRetries*8):0;

        ST.ownMove=true;try{r.m.stop?.();}finally{ST.ownMove=false;}

        ST.lastMove=-Infinity;ST.moveGoal=null;ST.positionSample.at=Date.now();

        note('POSITION-RETRY',{distance:d,goal,attempt:ST.positionRetries,waypointExtra:ST.positionOffset});

      }

      if(ST.positionRetries>=6&&ST.positionSample&&Date.now()-ST.positionSample.at>=1800){

        if(ST.lastReason!=='position_stalled_bounded'){

          ST.ownMove=true;try{r.m.stop?.();}finally{ST.ownMove=false;}

          note('POSITION-PAUSED',{distance:d,goal,attempts:ST.positionRetries});

        }

        ST.positionPause={x:b.x,y:b.y,at:Date.now(),reason:'position_stalled_bounded'};ST.lastReason='position_stalled_bounded';return;

      }



      const ux=d>=1?(a.x-b.x)/d:1,uy=d>=1?(a.y-b.y)/d:0;

      const recoveryAngle=ST.positionRecovery?(ST.positionRecovery%2?1:-1)*Math.min(90,Math.ceil(ST.positionRecovery/2)*30)*Math.PI/180:0;

      const angle=recoveryAngle+(ST.positionRetries>=3?(ST.positionRetries%2?1:-1)*Math.min(30,(ST.positionRetries-2)*15)*Math.PI/180:0);

      const waypointRadius=goal+ST.positionOffset;

      const x=b.x+(ux*Math.cos(angle)-uy*Math.sin(angle))*waypointRadius,

        y=b.y+(ux*Math.sin(angle)+uy*Math.cos(angle))*waypointRadius;



      if(typeof r.m.running==='function'&&r.m.running()&&ST.moveGoal&&Date.now()-ST.lastMove<4500&&

         Math.hypot(ST.moveGoal.x-x,ST.moveGoal.y-y)<15){ST.lastReason='positioning_in_progress';return;}

      if(Date.now()-ST.lastMove<CFG.moveWaitMs){ST.lastReason='move_wait';return;}

      if(typeof r.m.moveTo!=='function'){ST.lastReason='no_mover';return;}

      ST.ownMove=true;try{r.m.moveTo(x,y);}finally{ST.ownMove=false;}

      ST.moveGoal={x,y};ST.positionCommands++;ST.moves++;ST.lastMove=Date.now();ST.lastReason='positioning_far';

    }catch(e){ST.lastError=String(e?.message||e);ST.lastReason='error';}

    finally{metrics?.state(ST.lastReason,ST.lastOwnerPhase,currentPace(),pacer?.status()?.lastAction);}

  }



  function skillNames(){if(W.KVPV_TRANSFORM10?.transformed?.())return W.KVPV_TRANSFORM10.skills();const r=role();const rows=[r.s?._rtt,r.s?._wet].flatMap(x=>Array.isArray(x)?x:[]),ids=[...new Set(rows.map(x=>Number(x?.[0])).filter(candidate))];

    return ids.map(id=>{let name='';try{const arr=W._Ba?._rJ?._O$?.ins?.skills||[];const level=Number(arr.find(x=>Number(x?.[0])===id)?.[1])||1;name=String(W._ft?._nY?.ins?.getCfgBySkillIdAndLv?.(id,level)?.[2]||'');}catch(_){window.KVPV_V1?.diagnostics?.record(_);}return {id,name};});}



  function status(show=true){
    if(statusReentrant)return {version:'1.0.0',running:ST.running,operation:ST.mode,statusReentrant:true,modeStatus:null};
    statusReentrant=true;try{return statusImpl(show);}finally{statusReentrant=false;}
  }
  function statusImpl(show=true){const occ=stageOcc(),ready=skillNames(),proved=ready.filter(x=>verified(occ,x.id)).map(x=>({...x,confirmations:ST.proofs.get(key(occ,x.id))?.size||0}));

    const tqIds=tqFive?.active()?[...basicRotation(),...(!basicSolo4100Active()&&tqFive.allowsTuyetHoc()?ready.filter(x=>tqSelectableNative(x.id)).map(x=>x.id):[])]:null;
    const ret={basicAnimationSpeed:CFG.basicAnimationSpeed,
       tqTuyetHocVisualSpeed:CFG.tqTuyetHocVisualSpeed,
        tqBasicVisualSpeed:CFG.tqBasicVisualSpeed,tqBasicVisualCalls,tqBasicVisualScaled,tqBasicVisualUnavailable,tqBasicVisualLastSkill,
       tqTuyetHocVisualCalls:thVisualCalls,tqTuyetHocVisualScaled:thVisualScaled,
       tqTuyetHocVisualUnavailable:thVisualUnavailable,tqTuyetHocVisualLastSkill:thVisualLastSkill,
       modeStatus:null, // Avoid calling KVPV_MODE.status(): its inspect path reads this status again.
       scaledBasicAnimations:ST.scaledBasicAnimations??0,scaledTowerSkillAnimations:ST.scaledTowerSkillAnimations,scaledTowerBasicAnimations:ST.scaledTowerBasicAnimations,basicOnly:tqFive?.active()?(basicSolo4100Active()||!tqFive.allowsTuyetHoc()):CFG.basicOnly,playerSkillIds:tqFive?.active()?tqIds:CFG.basicOnly?[basicRotation()[0]??8001]:null,interleavedBasic:tqFive?.active()||mixed.enabled,version:'1.0.0',running:ST.running,operation:ST.mode,goalDistance:targetDistance()??CFG.goal,requestedDistance:CFG.goal,

      requireDistanceGreaterThan:CFG.min,clientTrialRadius:CFG.max,

      nativeTuyetHoc:ready,tuyetHocCalibration:tuyetHocCalibration(occ),tianQuanMpackExtras:{enabled:tqMpack.enabled,ids:tqActiveExtraIds(),source:'native _vX.ins.skills (fallback player model) + native selector + MPACK active category; no passive/proc/scene bypass',learnedSource:Array.isArray((typeof _vX!=='undefined'?_vX?.ins?.skills:null)??W._vX?.ins?.skills)?'native_vX':'player_model_fallback'},confirmedSkills:proved,confirmedOver300:proved.filter(x=>supportedDistance(occ,x.id)>300),

      bossClientRange:bossRange(),minimumDistance:CFG.min,

      skills:ready.map(x=>({...x,...stats(occ,x.id),verifiedDistance:supportedDistance(occ,x.id),verified:verified(occ,x.id)})),

      afterTHWaitMs:CFG.afterTHWaitMs,basicHitQuota:mixed.hitQuota,confirmedSinceTH:mixed.confirmedSinceTH,thCycles:mixed.thCycles,primaryBasicEnabled:tqFive?.active()||mixed.primary,primaryBasicSkillId:primaryBasicId(),primaryBasicClientWaitMs:tqFive?.active()?tqFive.wait():mixed.basicPaceMs,primaryBasicNativeCooldown:!tqFive?.active()&&mixed.basicPaceMs===null,primaryBasicBurstBeforeSkill:basicQuota(),basicRotation:basicRotation(),

      excludedBasicSkillIds:tqFive?.active()?[]:[...excludedBasics],tianQuanFiveBasics:tqFive?.report()??null,


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
      tqIdleFill:{...tqIdleFill,scope:'THIEN_QUAN_SCAN',nativeReadyOnly:true,strictProofProtected:true},
      thGapBasics:{enabled:thGap.enabled,windowMs:thGap.windowMs,active:thGapActive(),strongestVerifiedBasic:strongestThGapBasic(),
        attempts:thGap.attempts,nativeAccepted:thGap.accepted,blockedCooldown:thGap.blockedCooldown,lastBasic:thGap.lastBasic,
        measured:[...thGap.measured].map(([id,x])=>({id,hits:x.hits,meanDamage:x.hits?x.damage/x.hits:null}))},
      confirmedBasicTailCut:confirmedTailCut,confirmedBasicTailCuts:confirmedTailCuts,confirmedTailSkillIds:tqFive?.active()?tqFive.ids():[8001,8005],


      skillPriority:tqFive?.active()?(basicSolo4100Active()?'4100_native_basics_only':tqFive.allowsTuyetHoc()?'five_basics_plus_tuyet_hoc_10ms':'five_basics_10ms'):CFG.basicOnly?'basic8001':skillPriority==='tuyet_hoc_first'?'ready_tuyet_hoc_observed_damage_then_basic':mixed.enabled?(mixed.primary?(basicRotation().length?'native_basic_rotation_then_tuyet_hoc':'three_primary_basics_then_tuyet_hoc'):'alternating_native_rotation'):['LINH_LUNG','PHU_VAN','TRU_TIEN'].includes(W.KVPV_FAR_SCOPE?.status?.().kind)?'observed_damage_with_fair_rotation':'native_rotation',

      eligibleSkillIds:tqFive?.active()?tqIds:ST.mode==='SCAN'?ready.map(x=>x.id):proved.map(x=>x.id),

      lastDistance:ST.lastDistance,currentDistance:radius(role().a,role().c?.target),lastHitDistance:ST.lastHitDistance,

      combatRunning:ST.running&&combatOwner()?.running===true,combatPhase:ST.running?combatOwner()?.phase:'OFF',

      recoveryEnabled:!tqDistanceOnly(),distanceOnly310:tqDistanceOnly(),finishBossHpPct:['LINH_LUNG','PHU_VAN','TRU_TIEN'].includes(W.KVPV_FAR_SCOPE?.status?.().kind)?2:null,combatOwner:combatOwner()?.owner??'HITRUN',

      positionTolerance:CFG.tolerance,positionRetries:ST.positionRetries,positionWaypointExtra:ST.positionOffset,nativeArrivalSnap:ST.arrivalSnap,nativeArrivalExtraTolerance:ST.arrivalSnap?1:0,movementCommands:ST.moves,recoveryResumes:ST.resumes,hitrunPhase:ST.lastOwnerPhase,

      positioning:ST.positioning,paceMs:currentPace(),adaptivePacing:pacer?.status()??null,fastCasts:ST.fastCasts,blockedNativeSteering:ST.blockedSteering,

      castAttempts:ST.castAttempts,confirmedCastHitPairs:ST.confirmedPairs,blockedOtherSkills:ST.blocked,

      lastReason:ST.lastReason,lastError:ST.lastError,localLogCleanup:localLogCleanupStatus(),

      timerActive:ST.timer!=null,lastTickAt:ST.lastTickAt,tickAgeMs:ST.lastTickAt===null?null:Math.max(0,Date.now()-ST.lastTickAt),timerRepairs:ST.timerRepairs,

      warning:proved.length===0?'No independently verified skill at this distance yet. STRICT will wait; use SCAN to observe combat.':'Observed matching skill damage at tested distance; this does not guarantee safety from Boss attacks.'};

    if(show){console.table(ready.map(x=>({...x,verified:verified(occ,x.id),pairs:ST.proofs.get(key(occ,x.id))?.size||0})));console.log(TAG,ret);}return ret;

  }



  function start(mode='STRICT'){if(mode!=='STRICT'&&mode!=='SCAN')throw Error('Use STRICT or SCAN');

    if(String(W._Ba?._rJ?._O$?.ins?.actorId??'')!==actorId)throw Error('wrong actor');

    if(CFG.goal>600)throw Error('Boss danger range exceeds the bounded far-skill trial');

    W.KVPV_RANGE281?.setTrialRange?.(CFG.max);

    ST.positionSample=null;ST.positionRetries=0;ST.positionOffset=0;ST.positionCommands=0;ST.positionPause=null;ST.positionRecovery=0;if(mode==='SCAN'){thCalibration.autoLocked=false;thCalibration.skillId=null;thCalibration.completedAt=null;thCalibration.reason='measuring_confirmed_damage';}ST.mode=mode;ST.running=true;ST.positioning=true;ST.moveGoal=null;ST.lastMove=-Infinity;ST.lastOwnerPhase=null;ST.lastReason='starting';ST.lastError='';

    if(ST.timer==null){const schedule=W.KVPV_V1?.timers?.setInterval??W.setInterval;if(typeof schedule==='function')ST.timer=schedule(tick,CFG.scanMs);}tick();return status(false);

  }





  function repairPolling(){

    if(!ST.running||W.document?.hidden===true||W.__KVPV_UNIVERSAL_HALTED||

      String(W._Ba?._rJ?._O$?.ins?.actorId??'')!==actorId)return false;

    if(ST.timer!=null&&ST.lastTickAt!==null&&Date.now()-ST.lastTickAt<2500)return false;

    if(ST.timer!=null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(ST.timer);

    ST.timer=typeof (W.KVPV_V1?.timers?.setInterval??W.setInterval)==='function'?(W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,CFG.scanMs):null;

    ST.timerRepairs++;tick();return true;

  }

  function stop(reason='user'){if(reason==='user'||String(reason).startsWith('Người dùng dừng'))W.KVPV_TQ_BASIC_FORCE?.stop?.('th300_manual_stop');else W.KVPV_TQ_BASIC_FORCE?.suspend?.('th300_paused');localLogCleanup.enabled=false;tqFive?.stop(reason);const ownPositioning=ST.positioning&&ST.moveGoal,r=role();ST.running=false;ST.mode='OFF';if(ST.timer!=null){(W.KVPV_V1?.timers?.clearInterval ?? W.clearInterval)(ST.timer);ST.timer=null;}


    restoreSpeedClips();

    if(!/^(Chuyển Boss|Đổi phạm vi|Chuyển combat mode|Chết: chờ|Rời Thiên Quan)/.test(reason)){}

    if(ST.c && ST.c.obj?.combat?.__KVPV_GUARD_PARENT===ST.c.fn)W.KVPV_HITRUN1?.stop?.('Release guarded far-skill hook');

    unbind();unlisten();if(ownPositioning)r.m?.stop?.();ST.moveGoal=null;ST.lastReason=reason;return status(false);}



  function report(){expire();const combat=role().c,cooldown=typeof combat?.isCooldown==='function'?combat.isCooldown():null,animating=animationPlaying(combat),tuyetHocRows=[role().s?._rtt,role().s?._wet].flatMap(rows=>Array.isArray(rows)?rows:[]).filter(row=>isTuyetHocSkill(Number(row?.[0]))).slice(0,16).map(row=>({id:Number(row[0]),readyAt:Number(row[1]),ready:Number.isFinite(Number(row[1]))&&Number(row[1])<Date.now()}));return {hitDiagnostics:JSON.parse(JSON.stringify(hitDiagnostics)),nativeCombat:{dispatch:{observed:!!dispatch.actor,calls:dispatch.calls,signals:dispatch.signals,silent:dispatch.silent,recent:dispatch.recent.slice()},targetId:identity(combat?.target),trackedTargetId:identity(ST.target),internalTargetId:identity(combat?._wft),selectorOwned:role().s?._f7t===ST.s?.fn,combatOwned:combat?.combat===ST.c?.fn||combat?.combat?.__KVPV_GUARD_PARENT===ST.c?.fn,cooldown,animationPlaying:animating},nativeGate:{blockedBy:[...(cooldown===true?['cooldown']:[]),...(animating?['animation']:[])],cooldown,animationPlaying:animating,lastReason:ST.lastReason},interleaved:{enabled:tqFive?.active()||mixed.enabled,basicClientWaitMs:tqFive?.active()?tqFive.wait():mixed.basicPaceMs,basicSuspended:mixed.suspended,basicUnconfirmed:mixed.unconfirmed,nativeAnimationGate:true,scanMs:CFG.scanMs,nextPreferred:mixed.wantBasic?'basic':'tuyet_hoc',basicAttempts:mixed.attempts,basicConfirmedHits:mixed.hits,confirmedHitTailRelease:true,basicTailReleases:ST.basicTailReleases,basicMatchedDamage:mixed.damage,examples:mixed.examples.map(x=>({...x}))},burst:{enabled:burst.enabled,experimental:true,minBatchGapMs:Math.max(100,CFG.scanMs),maxSkillsPerBatch:8,resultWaitScope:'per_skill',nativeRows:tuyetHocRows,

    lastPass:JSON.parse(JSON.stringify(burst.lastPass)),batches:JSON.parse(JSON.stringify(burst.history)),note:'Client calls in one JS turn; matched damage is required for each skill. Not guaranteed simultaneous server execution. Native per-skill readiness is preserved.'},performance:metrics?.report()??null,build:W.KVPV_V1?.build??null,controllerBuild:typeof __KVPV_V1_BUILD==='undefined'?null:__KVPV_V1_BUILD,...status(false),history:ST.history.slice(),

    scope:W.KVPV_FAR_SCOPE?.status?.()??null,interpretation:'attempts are client combat calls; only matched damage confirms a hit. Unconfirmed does not prove a server range limit.'};}



  function setDistance(value){const d=tqDistanceOnly()?310:Number(value);if(!Number.isFinite(d)||d<=280||d>600)throw Error('Distance must be in (280,600]');

    W.KVPV_RANGE281?.setTrialRange?.(d+10);CFG.goal=d;CFG.min=d===300?295:d>300?300:280;CFG.max=d+10;

    ST.lastMove=-Infinity;ST.moveGoal=null;ST.positioning=true;if(ST.running)tick();return status(false);}



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
  function dps(show=true){const p=metrics?.report()??null;if(p){const boss=bossInfo(false);p.bossInfo=boss;p.skill1008=skill1008Info(false);p.bossMatchesEncounter=!!boss.available&&String(p.current?.bossId??'')===boss.bossId;}if(show){if(p?.current){console.table(Object.entries(p.current.groups).map(([group,values])=>({group,...values})));console.table(p.current.skills.map(r=>({id:r.id,group:r.group,hits:r.hits,matchedDamage:r.matchedDamage,matchedDps:r.matchedDps,rolling10sMatchedDps:r.rolling10sMatchedDps,averageMatchedDamage:r.averageMatchedDamage,animationWaitMs:r.animationWaitMs,animationWaitAverageMs:r.animationWaitAverageMs,animationWaitMaxMs:r.animationWaitMaxMs,unconfirmed:r.unconfirmed})));}console.log('[DPS matched]',p);}return p;}

  function setBurst(enabled=true){burst.enabled=!!enabled;if(burst.enabled){mixed.enabled=false;mixed.wantBasic=false;}burst.nextAt=0;return {enabled:burst.enabled,experimental:true,maps:['THIEN_QUAN','LINH_LUNG','PHU_VAN','TRU_TIEN']};}




  function setInterleaved(enabled=true,distance=302){mixed.enabled=!!enabled;mixed.wantBasic=false;mixed.suspended=false;mixed.unconfirmed=0;

    if(mixed.enabled){burst.enabled=false;setDistance(distance);}

    return {enabled:mixed.enabled,distance:CFG.goal,burst:burst.enabled};}

  function setBasicPace(value=1){if(value===null){mixed.basicPaceMs=null;mixed.ready.clear();return {enabled:false};}

    const n=Number(value);if(!Number.isFinite(n)||n<0||n>1000)throw Error('Basic client wait must be 0..1000 ms');

    mixed.basicPaceMs=n;mixed.ready.clear();return {enabled:true,clientWaitMs:n,nativeAnimationGate:true};}

  function setPrimaryBasic(enabled=true){mixed.primary=!!enabled;mixed.primaryStreak=0;mixed.wantBasic=mixed.primary&&!mixed.suspended;mixed.ready.clear();return {enabled:mixed.primary,skillId:primaryBasicId(),clientWaitMs:mixed.basicPaceMs,nativeCombatGate:true};}

  function setAfterTHWait(value=1){if(!Number.isFinite(value)||value<0||value>1000)throw Error('TH wait must be 0..1000 ms');CFG.afterTHWaitMs=value;return value;}

  function setBasicHitQuota(value=null){if(value!==null&&(!Number.isSafeInteger(value)||value<1))throw Error('Hit quota must be a positive integer');mixed.hitQuota=value;mixed.confirmedSinceTH=0;mixed.thCycles=0;mixed.wantBasic=mixed.primary;return value;}

  function setBasicRotation(ids=[]){const solo8002=Array.isArray(ids)&&ids.length===1&&Number(ids[0])===8002&&W.KVPV_FAR_SCOPE?.status?.()?.kind==='THIEN_QUAN';if(!Array.isArray(ids)||ids.some(id=>!isBasic(id)||(excludedBasics.has(Number(id))&&!tqFive?.report()?.enabled&&!solo8002)))throw Error('Rotation requires allowed native basic IDs');if(solo8002)excludedBasics.delete(8002);else excludedBasics.add(8002);mixed.rotation=[...new Set(ids.map(Number))];mixed.rotationCursor=0;mixed.primaryStreak=0;mixed.wantBasic=mixed.primary&&!mixed.suspended;return basicRotation();}

  function releaseOutsideScope(){if((W.KVPV_FAR_SCOPE??W.KVPV_TQ_SCOPE)?.inside?.()!==false)return false;

    if(!ST.s&&!ST.c&&!ST.target&&!ST.movement.length)return true;

    if(ST.c&&ST.c.obj?.combat?.__KVPV_GUARD_PARENT===ST.c.fn)W.KVPV_HITRUN1?.stop?.('Leave far-map hook ownership');

    unbind();unlisten();ST.moveGoal=null;return true;

  }

  function setBasicOnly(enabled=true){CFG.basicOnly=!!enabled;CFG.scanMs=100;

    if(enabled){mixed.enabled=true;mixed.primary=true;mixed.rotation=[8001];mixed.rotationCursor=0;mixed.wantBasic=true;mixed.basicPaceMs=0;mixed.ready.clear();burst.enabled=false;CFG.clientPaceMs=0;}

    if(ST.timer!==null){(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(ST.timer);ST.timer=typeof (W.KVPV_V1?.timers?.setInterval??W.setInterval)==='function'?(W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,CFG.scanMs):null;}

    return {enabled:CFG.basicOnly,skillId:8001,scanMs:CFG.scanMs,addedClientWaitMs:CFG.clientPaceMs,serverMultiplierVerified:false};}

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
  function setTianQuanIdleFill(enabled=true){
    tqIdleFill.enabled=enabled===true;
    return {enabled:tqIdleFill.enabled,minRepeatMs:tqIdleFill.minRepeatMs,
      maxPendingPerTH:tqIdleFill.maxPendingPerTH,scope:'THIEN_QUAN_SCAN',nativeOnly:true};
  }
  function setTianQuanTHGapBasics(enabled=true,windowMs=1200){
    if(!Number.isInteger(windowMs)||windowMs<100||windowMs>2000)throw Error('TH gap window must be 100..2000ms');
    thGap.enabled=!!enabled;thGap.windowMs=windowMs;if(!thGap.enabled)resetThGap();
    return {enabled:thGap.enabled,windowMs:thGap.windowMs,nativeReadyOnly:true,perTHLimit:1};
  }
  function setTianQuanTuyetHocVisualSpeed(factor=99){
    if(![1,9,30,99,99999].includes(factor))throw Error('TH visual speed must be 1, 9, 30, 99 or 99999');
    CFG.tqTuyetHocVisualSpeed=factor;
    if(factor===1)restoreSpeedClips();
    return {factor,scope:'THIEN_QUAN',ids:[1001,1002,1003,1004,1005,1006,1007,1008],visualOnly:true,serverCooldownUnchanged:true};
  }
  function setTianQuanBasicVisualSpeed(factor=1){
    if(![1,9,30,99,9999,99999].includes(factor))throw Error('TQ basic visual speed must be 1, 9, 30, 99, 9999 or 99999');
    CFG.tqBasicVisualSpeed=factor;
    if(factor===1)restoreSpeedClips();
    return {factor,scope:'THIEN_QUAN',ids:[8001,8002,8003,8004,8005],visualOnly:true,serverCooldownUnchanged:true};
  }
  function setTianQuanVisualSpeed(factor=9999){
    if(![1,9,30,99,9999,99999].includes(factor))throw Error('Unsupported visual speed');
    if(factor===9999||factor===99999){
      CFG.tqTuyetHocVisualSpeed=factor;
    }else setTianQuanTuyetHocVisualSpeed(factor);
    setTianQuanBasicVisualSpeed(factor);
    return {factor,scope:'THIEN_QUAN',basic:[8001,8002,8003,8004,8005],tuyetHoc:[1001,1002,1003,1004,1005,1006,1007,1008],visualOnly:true,serverCooldownUnchanged:true};
  }
  function setBasicAnimationSpeed(factor=1){if(![1,9,99,99999].includes(factor))throw Error('Native animation factor must be 1, 9, 99 or 99999');restoreSpeedClips();CFG.basicAnimationSpeed=factor;return {factor,scope:['THIEN_QUAN','LINH_LUNG','PHU_VAN','TRU_TIEN'],playerSkillId:8001,serverDamageMultiplierVerified:false};}

  function setTianQuanFiveBasics(enabled=true,wait=10){if(!tqFive)return {enabled:false,available:false,reason:'five_basics_profile_not_loaded'};const out=tqFive.configure(enabled,wait);mixed.ready.clear();mixed.rotationCursor=0;if(ST.timer!==null){(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(ST.timer);ST.timer=typeof (W.KVPV_V1?.timers?.setInterval??W.setInterval)==='function'?(W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,CFG.scanMs):null;}return out;}
  function setTianQuanFourBasics(enabled=true,wait=1){if(!tqFive)return {enabled:false,available:false,reason:'four_basics_profile_not_loaded'};const out=tqFive.configure(enabled,wait,enabled?[8001,8002,8003,8004]:null);mixed.ready.clear();mixed.rotationCursor=0;if(ST.timer!==null){(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(ST.timer);ST.timer=typeof (W.KVPV_V1?.timers?.setInterval??W.setInterval)==='function'?(W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,CFG.scanMs):null;}return out;}
  function setTianQuanThreeBasics(enabled=true,wait=1){if(!tqFive)return {enabled:false,available:false,reason:'three_basics_profile_not_loaded'};const out=tqFive.configure(enabled,wait,enabled?[8001,8002,8003]:null);mixed.ready.clear();mixed.rotationCursor=0;if(ST.timer!==null){(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(ST.timer);ST.timer=typeof (W.KVPV_V1?.timers?.setInterval??W.setInterval)==='function'?(W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,CFG.scanMs):null;}return out;}
  function setTianQuanTuyetHoc(enabled=true){if(!tqFive)return {enabled:false,available:false,reason:'five_basics_profile_not_loaded'};return tqFive.setTuyetHoc(enabled);}
      function setSkillPriority(value='tuyet_hoc_first'){
    if(!['tuyet_hoc_first','interleaved'].includes(value))throw Error('Skill priority must be tuyet_hoc_first or interleaved');
    skillPriority=value;return {skillPriority};
  }
  const api={setLocalLogAutoClear,tianQuan4100CooldownEligible:c=>ST.running&&basicSolo4100Active()&&ST.target===c?.target&&eligible(c?.target)&&role().c===c,tianQuan4100Diagnosis,setTianQuan4100BasicSolo,setTianQuan4100Pilot,setTianQuanLuoFeng,setTianQuanCosmic,setTianQuanIdleFill,setTianQuanTHGapBasics,setTianQuanTuyetHocVisualSpeed,setTianQuanBasicVisualSpeed,setTianQuanVisualSpeed,setTianQuanTuyetHoc,setTianQuanMpackExtras,setTianQuanFiveBasics,setTianQuanFourBasics,setTianQuanThreeBasics,setSkillPriority,setBasicAnimationSpeed,setBasicOnly,isBasicOnly:()=>tqFive?.active()?(basicSolo4100Active()||!tqFive.allowsTuyetHoc()):CFG.basicOnly,releaseOutsideScope,setClientPace,setScanInterval,setConfirmedTailCut,setAfterTHWait,setBasicHitQuota,setBasicRotation,setPrimaryBasic,setBasicPace,setInterleaved,setBurst,performance,dps,bossInfo,skill1008Info,version:'1.0.0',start,stop,status,report,setDistance,repairPolling,sync:tick,export:()=>JSON.stringify(report(),null,2),history:()=>ST.history.slice()};

  W.KVPV_TH300=api;

  console?.info?.(TAG,'READY/OFF. START: KVPV_MODE.start("BOSS_TH300_SCAN") then KVPV_MODE.start("BOSS_TH300")');

})();

/* KVPV_SKILL_SOURCE_END 08-range-evidence.js */
}

function __KVPV_SKILL_SOURCE_09_boss_unified_js() {
/* KVPV_SKILL_SOURCE_BEGIN 09-boss-unified.js */
/* Unified boss-combat entry point, staged migration.
 * One dispatcher, legacy compatibility is explicitly controlled, no second sender.
 * Default remains passive until validated, preserving active game instances. */
(() => {
 'use strict';
 const W=window,previous=W.KVPV_BOSS_UNIFIED;previous?.stop?.();
 const actor=String(W.__KVPV_OWN_ACTOR_ID??'');
 const S={enabled:false,mode:'OFF',reason:'awaiting_explicit_activation',timer:null,cycles:0,lastError:''};
 const valid=()=>!!actor&&String(W._Ba?._rJ?._O$?.ins?.actorId??'')===actor&&W.__KVPV_UNIVERSAL_HALTED!==true;
 const modes=Object.freeze({BOSS:'BOSS'});
 function status(){return {...S,timer:S.timer!==null,actor,singleSender:true,observer:W.KVPV_SKILL_ASYNC_OBSERVER?.status?.()??null};}
 function stop(){
   S.enabled=false;S.mode='OFF';
   if(S.timer!==null){const owner=W.KVPV_V1?.timers?.clearInterval?W.KVPV_V1.timers:W;owner?.clearInterval?.(S.timer);S.timer=null;}
   S.reason='stopped';return status();
 }
 function tick(){
   if(!S.enabled||!valid())return;
   S.cycles++;
   // All native casts remain under exactly one existing combat coordinator.
   // Never call native combat() from an observer or secondary module.
   const mode=W.KVPV_MODE?.status?.(false);
   if(mode?.mode==='OFF')S.reason='waiting_native_mode';
   else S.reason='native_single_owner_'+String(mode?.mode??'unknown');
 }
 function start(mode='BOSS'){
   if(!Object.hasOwn(modes,mode))throw Error('Unknown unified boss combat mode');
   if(!valid())throw Error('Actor not ready');
   if(typeof W.KVPV_MODE?.start!=='function')throw Error('Native combat coordinator missing');
   // A single transition, never activate multiple mode senders.
   W.KVPV_MODE.start(modes[mode]);
   S.mode=mode;S.enabled=true;S.reason='native_single_owner_'+mode;
   if(S.timer===null){const owner=W.KVPV_V1?.timers?.setInterval?W.KVPV_V1.timers:W;
     if(typeof W.setInterval==='function'&&typeof owner?.setInterval==='function')S.timer=owner.setInterval(()=>tick(),250);
   }
   return status();
 }
 W.KVPV_BOSS_UNIFIED=Object.freeze({start,stop,tick,status,legacyModes:modes});
})();
/* KVPV_SKILL_SOURCE_END 09-boss-unified.js */
}

function __KVPV_SKILL_SOURCE_09_combat_engine_js() {
/* KVPV_SKILL_SOURCE_BEGIN 09-combat-engine.js */
/* KVPV single native boss combat engine.
 * Replaces TH300/legacy modes in executable FULL. Single serialized sender.
 * Never overrides native cooldown, never sends RPC, respects recovery and actor.
 */
(()=>{
 'use strict';
 const W=window,old=W.KVPV_COMBAT_ENGINE;old?.stop?.();
 const actor=String(W.__KVPV_OWN_ACTOR_ID??'');
 const ids=[8001,8002,8003,8004,8005,1001,1002,1003,1004,1005,1006,1007,1008];
 // User-confirmed ranged Tuyet Hoc group 1001..1008; exclude basic 8001..8005 at the 310 ring.
 // Still require native selected skill, readiness, range and cooldown checks.
 const confirmedRanged=new Set([1001,1002,1003,1004,1005,1006,1007,1008]);
 const rangedKinds=new Set(['THIEN_QUAN','LINH_LUNG','PHU_VAN']);
 const ringGoal=310,ringTolerance=2;
 const position=o=>{const p=o?.property?.get?.('position'),x=Number(p?.x),y=Number(p?.y);return p&&Number.isFinite(x)&&Number.isFinite(y)?{x,y}:null;};
 function ring(target){const scope=W.KVPV_FAR_SCOPE?.status?.(),kind=scope?.kind;
  if(!rangedKinds.has(kind))return {needed:false,ok:true,distance:null};
  const a=position(components().a),b=position(target);
  if(!scope?.inside||!a||!b)return {needed:true,ok:false,distance:null};
  const distance=Math.hypot(a.x-b.x,a.y-b.y);
  return {needed:true,ok:Math.abs(distance-ringGoal)<=ringTolerance,distance};
 }
 const S={enabled:false,armed:false,busy:false,timer:null,casts:0,checks:0,lastSkill:null,reason:'off',error:'',cursor:0,lastTargetSearchAt:0,targetSearches:0,reasonCounts:Object.create(null),lastCastAt:0,lastCooldown:null,lastCooldownAt:0,lastTargetType:null,knownSkillIds:[],filteredCloseSkillIds:[],lastNativeSelectedSkill:null,confirmedRangedAvailable:[],ringDistance:null,ringReady:false,lastRange:null};
 const valid=()=>actor!==''&&String(W._Ba?._rJ?._O$?.ins?.actorId??'')===actor&&W.__KVPV_UNIVERSAL_HALTED!==true;
 const far=()=>{const x=(W.KVPV_FAR_SCOPE??W.KVPV_TQ_SCOPE);return x?.inside?.()===true&&x?.status?.()?.kind!=='TRU_TIEN';};
 const components=()=>{
  const a=W._C?._Ba?.instance?.getRole?.(Number(actor));
  const c=W._d?._Yct;
  return {a,skill:a?.getComponent?.(c?._Eet),combat:a?.getComponent?.(c?._Het)};
 };
 function state(){return {enabled:S.enabled,armed:S.armed,busy:S.busy,actor,casts:S.casts,checks:S.checks,lastSkill:S.lastSkill,reason:S.reason,error:S.error,singleSender:true,legacyModes:false,targetSearches:S.targetSearches,lastCastAt:S.lastCastAt,lastCooldown:S.lastCooldown,lastCooldownAt:S.lastCooldownAt,lastTargetType:S.lastTargetType,knownSkillIds:S.knownSkillIds.slice(),filteredCloseSkillIds:S.filteredCloseSkillIds.slice(),lastNativeSelectedSkill:S.lastNativeSelectedSkill,confirmedRangedAvailable:S.confirmedRangedAvailable.slice(),ringDistance:S.ringDistance,ringReady:S.ringReady,ringGoal,ringTolerance,lastRange:S.lastRange,reasonCounts:{...S.reasonCounts}};}
 function recordReason(){S.reasonCounts[S.reason]=(S.reasonCounts[S.reason]||0)+1;}
 async function tick(){
  if(S.busy||!S.enabled||!valid())return;
  S.busy=true;
  try{
   if(!far()){
    const daily=W.KVPV_DAILY?.quickState?.();
    // Daily scene 10 (Yeu Vuong) uses native encounter combat; do not steal its skill sender.
    S.reason=daily?.running===true&&daily?.job==='yeuvuong'&&daily?.step==='fighting'&&Number(daily?.scene)===10
      ? 'daily_yeuvuong_native_combat' : 'outside_boss_scope';
    return;
   }
   if(W.KVPV_ENTRY_POLICY?.manual===true||W.KVPV_EVENT_PRIORITY?.hold?.()||W.KVPV_BOSS_TEAM?.priority?.()===true){S.reason='yield_priority';return;}
   if(W._Ba?._rJ?._O$?.ins?.isDead===true){S.reason='dead';return;}
   if(W.KVPV_RANGE_KEEP310?.status?.()?.phase==='RETREAT'){S.reason='yield_recovery';return;}
   const recovery=W.KVPV_HITRUN1?.status?.(false);
   if(recovery?.running===true&&recovery.phase!=='FIGHT'){S.reason='yield_recovery';return;}
   const {a,skill,combat}=components();
   if(!a||!skill||typeof combat?.combat!=='function'){S.reason='waiting_native_components';return;}
   const nativeTarget=combat.target;
   const rawType=nativeTarget?.property?.get?.('type');
   const type=rawType==null?NaN:Number(rawType);
   S.lastTargetType=Number.isFinite(type)?type:null;
   const hpNow=nativeTarget?.property?.get?.('hp');
   const stale=!nativeTarget||type===4||(Array.isArray(hpNow)&&Number(hpNow[0])<=0);
   if(stale){
     const now=Date.now();
     if(now-S.lastTargetSearchAt>=1000&&typeof W._Ba?._rJ?._O$?.ins?.selectTar==='function'){
       S.lastTargetSearchAt=now;W._Ba._rJ._O$.ins.selectTar(1,-1);S.targetSearches++;
     }
     S.reason='waiting_native_boss_target';return;
   }
   if(!Number.isFinite(type)||(type!==1&&type!==0)){S.reason='non_monster_target';return;}
   const firstRing=ring(nativeTarget);
   S.ringDistance=firstRing.distance;S.ringReady=firstRing.ok;
   if(firstRing.needed&&!firstRing.ok){S.reason='waiting_distance_310';return;}
   // Inspect native selection before interpreting the shared range gate.
   // isValidRange() has no skill-id parameter; false may concern selected melee skill 1001.
   const rowsBefore=[...(skill._rtt??[]),...(skill._wet??[])];
   const knownBefore=new Set(rowsBefore.filter(Array.isArray).map(x=>Number(x[0])));
   S.knownSkillIds=ids.filter(id=>knownBefore.has(id));
   S.confirmedRangedAvailable=S.knownSkillIds.filter(id=>confirmedRanged.has(id));
   S.lastNativeSelectedSkill=Number(skill.selectSkill?.())||null;
   const initialKind=W.KVPV_FAR_SCOPE?.status?.()?.kind;
   if(rangedKinds.has(initialKind)&&!confirmedRanged.has(S.lastNativeSelectedSkill)){
    S.filteredCloseSkillIds=S.knownSkillIds.filter(id=>!confirmedRanged.has(id));
    S.reason='filtered_close_range_skill';return;
   }
   const rangeResult=typeof combat.isValidRange==='function'?combat.isValidRange():null;
   S.lastRange=rangeResult;
   if(rangeResult===false){S.reason='native_out_of_range';return;}
   const cooldownResult=typeof combat.isCooldown==='function'?combat.isCooldown():null;
   S.lastCooldown=cooldownResult;S.lastCooldownAt=Date.now();
   // Do not cast if the native cooldown API is missing or reports anything but false.
   if(cooldownResult!==false){S.reason=cooldownResult===true?'native_cooldown':'native_cooldown_unknown';return;}
   const target=combat.target;
   const hp=target?.property?.get?.('hp');
   if(Array.isArray(hp)&&Number(hp[0])<=0){S.reason='target_dead';return;}
   const rows=[...(skill._rtt??[]),...(skill._wet??[])];
   const known=new Set(rows.filter(Array.isArray).map(x=>Number(x[0])));
   S.knownSkillIds=ids.filter(id=>known.has(id));
   // No bypass of target range; use native selection when its result is learned.
   const nativeId=Number(skill.selectSkill?.());
   const ordered=ids.filter(id=>known.has(id));
   const chosen=ordered.includes(nativeId)?nativeId:(!Number.isFinite(nativeId)?null:nativeId);
   const kind=W.KVPV_FAR_SCOPE?.status?.()?.kind;
   const strictlyRanged=rangedKinds.has(kind);
   S.filteredCloseSkillIds=strictlyRanged?ordered.filter(id=>!confirmedRanged.has(id)):[];
   if(!chosen||!ordered.includes(chosen)){S.reason='no_native_ready_skill';return;}
   if(strictlyRanged&&!confirmedRanged.has(chosen)){S.reason='filtered_close_range_skill';return;}
   S.checks++;
   await Promise.resolve();
   if(!S.enabled||!valid()||combat.target!==target)return;
   // Scene, event and recovery may change during the async skill-readiness boundary.
   if(!far()||W.KVPV_ENTRY_POLICY?.manual===true||W.KVPV_EVENT_PRIORITY?.hold?.()||
      W.KVPV_BOSS_TEAM?.priority?.()===true){
     S.reason='yield_changed_priority';return;
   }
   if(W._Ba?._rJ?._O$?.ins?.isDead===true){S.reason='dead';return;}
   if(W.KVPV_RANGE_KEEP310?.status?.()?.phase==='RETREAT'){S.reason='yield_recovery';return;}
   const recoveryNow=W.KVPV_HITRUN1?.status?.(false);
   if(recoveryNow?.running===true&&recoveryNow.phase!=='FIGHT'){S.reason='yield_recovery';return;}
   const rawTypeNow=target?.property?.get?.('type');
   const typeNow=rawTypeNow==null?NaN:Number(rawTypeNow);
   const hpNowFinal=target?.property?.get?.('hp');
   if(!Number.isFinite(typeNow)||(typeNow!==0&&typeNow!==1)||
     (Array.isArray(hpNowFinal)&&Number(hpNowFinal[0])<=0)){S.reason='target_changed_or_dead';return;}
   const finalRing=ring(target);
   S.ringDistance=finalRing.distance;S.ringReady=finalRing.ok;
   if(finalRing.needed&&!finalRing.ok){S.reason='waiting_distance_310';return;}
   if(typeof combat.isValidRange==='function'&&combat.isValidRange()===false){S.reason='native_out_of_range';return;}
   const cooldownFinal=typeof combat.isCooldown==='function'?combat.isCooldown():null;
   S.lastCooldown=cooldownFinal;S.lastCooldownAt=Date.now();
   if(cooldownFinal!==false){S.reason=cooldownFinal===true?'native_cooldown':'native_cooldown_unknown';return;}
   combat.combat(chosen);S.lastSkill=chosen;S.casts++;S.lastCastAt=Date.now();S.reason='native_cast_requested';
  }catch(e){S.reason='error';S.error=String(e?.message??e);}
  finally{recordReason();S.busy=false;}
 }
 function stop(){S.enabled=false;S.armed=false;
  if(S.timer!==null){const owner=W.KVPV_V1?.timers?.clearInterval?W.KVPV_V1.timers:W;owner?.clearInterval?.(S.timer);S.timer=null;}
  S.reason='stopped';return state();}
 function start(){S.armed=true;if(!valid()){S.reason='waiting_actor';return state();}
  if(typeof W.setInterval!=='function'){S.reason='waiting_timer_api';return state();}
  S.enabled=true;
  if(S.timer===null){const owner=W.KVPV_V1?.timers?.setInterval?W.KVPV_V1.timers:W;
   S.timer=owner.setInterval(()=>{void tick();},1);}
  S.reason='armed';return state();}
 W.KVPV_COMBAT_ENGINE=Object.freeze({start,stop,tick,status:state,skillIds:ids.slice()});
 // Startup is timerless in preflight; in the real game, arm once and wait for boss scope.
 start();
})();/* KVPV_SKILL_SOURCE_END 09-combat-engine.js */
}

function __KVPV_SKILL_SOURCE_09_modes_js() {
/* KVPV_SKILL_SOURCE_BEGIN 09-modes.js */





/* ================================================================
 * KVPV V12.9.4 — MANUAL COMBAT MODES / CLIENT-ONLY COORDINATOR
 * start('BOSS') -> native Boss combo and 35/100 recovery, no range experiment.
 * start('BOSS_TH') -> only native Tuyet Hoc 1001..1008, far 280.4; no basic fallback.
 * stop() -> no active owner. Auto Daily jobs remain independent.
 * No RPC. All mode switching is explicit; only one combat owner.
 * ================================================================ */

(() => {

  'use strict';

  const W=window, TAG='[KVPV V12.9.4 MODES]';

  const MODE=Object.freeze({OFF:'OFF',BOSS:'BOSS',BOSS_TH:'BOSS_TH',BOSS_TH300:'BOSS_TH300',BOSS_TH300_SCAN:'BOSS_TH300_SCAN'});

  const initialActor=String(W.__KVPV_OWN_ACTOR_ID || W._Ba?._rJ?._O$?.ins?.actorId || '');

  const S={mode:'OFF',reason:'Chưa chọn mode',switches:0,errors:0,lastError:'',lastChangedAt:null,

    history:[]};

  let scopedMode=null,mapTimer=null,towerAttempt=null,lastScopeKey=null,lastMaintenanceAt=-Infinity,lastTianQuanKey=null,lastTruAcquire=-Infinity,lastTowerRetryAt=-Infinity;

  const inFarMap=()=>(W.KVPV_FAR_SCOPE??W.KVPV_TQ_SCOPE)?.inside?.()!==false;
  const tqNoHeal=()=>W.KVPV_TQ_POSITION_ONLY?.enabled===true&&W.KVPV_FAR_SCOPE?.status?.()?.kind==='THIEN_QUAN';
  const tqDistance=()=>Number(W.KVPV_TQ_POSITION_ONLY?.distance??310);

  let entryMoveHook=null;

  function releaseEntryMove(){const h=entryMoveHook;if(h&&h.m.moveTo===h.fn){if(h.own)Object.defineProperty(h.m,'moveTo',h.own);else delete h.m.moveTo;}entryMoveHook=null;}

  function guardEntryMove(){

    const me=W._C?._Ba?.instance?.getRole?.(Number(initialActor)),m=me?.getComponent?.(W._d?._Yct?._zet);

    if(!m||typeof m.moveTo!=='function'||entryMoveHook?.m===m)return;

    releaseEntryMove();const own=Object.getOwnPropertyDescriptor(m,'moveTo'),native=m.moveTo;

    if(own&&!own.configurable)return;

    const fn=function(x,y,...args){

      const scope=W.KVPV_FAR_SCOPE?.status?.(),hr=W.KVPV_HITRUN1?.status?.(false);

      const target=me?.getComponent?.(W._d?._Yct?._Het)?.target,hp=me?.property?.get?.('hp');

      const a=me?.property?.get?.('position'),b=target?.property?.get?.('position'),entryGoal=tqDistance();

      if(scopedMode&&valid()&&scope?.inside&&scope.kind==='THIEN_QUAN'&&

        Array.isArray(hp)&&Number(hp[1])>0&&Number(hp[0])>0&&
        (tqNoHeal()||(!hr?.running||hr.phase==='FIGHT')&&Number(hp[0])/Number(hp[1])*100>35)&&

        W.KVPV_FAR_SCOPE?.eligible?.(target)&&a&&b&&Number.isFinite(x)&&Number.isFinite(y)&&Math.hypot(x-b.x,y-b.y)<Math.max(280,entryGoal-2)){

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

    };

    Object.defineProperty(m,'moveTo',{configurable:true,writable:true,enumerable:own?.enumerable??false,value:fn});entryMoveHook={m,own,fn};

  }



  function syncTowerBoss(){

    const scope=W.KVPV_FAR_SCOPE?.status?.();if(!['LINH_LUNG','PHU_VAN','TRU_TIEN'].includes(scope?.kind))return;

    if(!valid()||W._Ba?._rJ?._O$?.ins?.isDead===true)return;

    const me=W._C?._Ba?.instance?.getRole?.(Number(initialActor));

    const combat=me?.getComponent?.(W._d?._Yct?._Het);let target=combat?.target;

    if(scope.kind==='TRU_TIEN'&&!W.KVPV_FAR_SCOPE.eligible(target)){





      const currentHitrun=W.KVPV_HITRUN1?.status?.(false);

      if(currentHitrun?.running&&currentHitrun.phase!=='FIGHT'||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)||W._Ba?._K_t?._Z7t?.ins?.gathering)return;

      towerAttempt=null;S.reason='Tru Tiên: chờ mục tiêu quái';

      const user=W._Ba?._rJ?._O$?.ins;

      if(typeof user?.selectTar==='function'&&Date.now()-lastTruAcquire>=1000){

        lastTruAcquire=Date.now();user.selectTar(1,-1);target=combat?.target;log('TRU-TARGET-SEARCH','native monsters only');

      }

    }

    if(!W.KVPV_FAR_SCOPE.eligible(target))return;
    if(scope.kind==='ALL_BOSS'&&(Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)||W.KVPV?.core?.scene?.can?.('combat','hitrun')===false))return;

    const id=String(target.property?.get?.('id')??target.id??'');if(!id)return;

    const key=scope.current+'/'+scope.floor+'/'+id;
    // A native boss/HitRun controller may stop while the same monster stays
    // selected. Previous code treated this as completed forever and froze PvE.
    // Re-arm only after a bounded delay, never every 75ms scheduler tick.
    const existing=W.KVPV_HITRUN1?.status?.(false);
    if(towerAttempt===key&&existing?.running===true)return;
    if(towerAttempt===key&&Date.now()-lastTowerRetryAt<3000)return;

    const hr=W.KVPV_HITRUN1?.status?.(false);

    towerAttempt=key;lastTowerRetryAt=Date.now();S.lastError='';

    try{

      if(hr?.running)W.KVPV_HITRUN1.stop('Chuyển Boss phó bản: '+id);
      if(scope.kind==='ALL_BOSS')W.KVPV_TH300.setDistance(scope.goal);

      W.KVPV_HITRUN1.start();W.KVPV_TH300.sync?.();log('TOWER-HITRUN',key);

    }catch(e){S.lastError=String(e?.message||e);log('TOWER-HANDOFF-BLOCKED',S.lastError);}

  }





  function syncTianQuanBoss(){

    const scope=W.KVPV_FAR_SCOPE?.status?.();if(scope?.kind!=='THIEN_QUAN'||!scope.inside)return;

    if(!valid()||W._Ba?._rJ?._O$?.ins?.isDead===true)return;

    const me=W._C?._Ba?.instance?.getRole?.(Number(initialActor));

    const target=me?.getComponent?.(W._d?._Yct?._Het)?.target;

    if(!W.KVPV_FAR_SCOPE.eligible(target))return;

    const id=String(target.property?.get?.('id')??target.id??''),occ=Number(target.property?.get?.('occ'));

    const key=scope.current+'/'+String(W._Ba?._Co?._Mo?.ins?.curLv??'')+'/'+occ+'/'+id;if(!id||lastTianQuanKey===key)return;

    const hr=W.KVPV_HITRUN1?.status?.(false);

    if(!tqNoHeal()&&lastTianQuanKey===null&&hr?.running&&String(hr.bossId)===id){lastTianQuanKey=key;return;}

    lastTianQuanKey=key;

    try{



      stopOwners('Chuyển Boss Thiên Quan: '+id);

      W.KVPV_RANGE281.setTrialRange(Number(W.KVPV_TH300.status(false).requestedDistance??302)+10);W.KVPV_RANGE281.enable(true);

      W.KVPV_TH300.start('SCAN');S.mode=MODE.BOSS_TH300_SCAN;scopedMode=MODE.BOSS_TH300_SCAN;

      if(W.KVPV?.combat?.config)W.KVPV.combat.config.autoArm=!tqNoHeal();

      if(tqNoHeal())stopTqHealing('TQ 310 distance only');
      else W.KVPV_HITRUN_AUTO.rearm();



      if(!tqNoHeal()&&W.KVPV_HITRUN1.status(false)?.running!==true)W.KVPV_HITRUN1.start();

      W.KVPV_TH300.sync?.();S.lastError='';S.switches++;S.lastChangedAt=new Date().toISOString();log('TQ-BOSS-HANDOFF',key);

    }catch(e){S.lastError=String(e?.message||e);log('TQ-HANDOFF-BLOCKED',S.lastError);}

  }



  function syncMap(){

    if(!scopedMode)return;

    if(!valid()){stop('Actor/session changed');return;}

    guardEntryMove();

    const scope=W.KVPV_FAR_SCOPE?.status?.();
    // TH300 SCAN is the active skill sender. Its restored mixed profile is
    // configured at activation, not overwritten on every map poll.
    // In particular, forcing basic 8005 alone at distance 310 can leave the
    // character stationary without any ranged skill available to cast.
    // A PvP observer waits for player targets; dungeon auto must own monsters.
    // Disable only when actually in Tru Tien, never on other maps.
    if(scope?.inside===true&&scope.kind==='TRU_TIEN'){
      // Native recovery trial: release all TH300/HitRun owners and leave
      // selection, combat and movement entirely to the game in Tru Tien.
      if(W.KVPV_TRUTIEN_PVP?.status?.()?.enabled===true)
        W.KVPV_TRUTIEN_PVP.stop('trutien_native_recovery');
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
      W.KVPV_TH300?.setClientPace?.(1); // restore original default for other modes
    if(scope){const key=scope.kind+'/'+scope.current+'/'+(scope.floor??'');

      if(lastScopeKey!==null&&lastScopeKey!==key){stopOwners('Đổi phạm vi/map/tầng');S.mode=MODE.OFF;towerAttempt=null;lastTianQuanKey=null;}

      if(lastScopeKey!==key&&scope.kind==='THIEN_QUAN'&&scope.inside)W.KVPV_TH300?.setDistance?.(tqDistance());

      lastScopeKey=key;}

    if(!inFarMap()){

      if(S.mode!==MODE.OFF||W.KVPV_TH300?.status?.(false)?.running||W.KVPV_HITRUN1?.status?.(false)?.running){stopOwners('Rời Thiên Quan: trả combat mặc định');S.mode=MODE.OFF;towerAttempt=null;log('MAP-EXIT','native combat');}

      W.KVPV_EXPERIMENTAL_BOOST?.sync?.();

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

      if(!tower&&z.auto?.enabled===true&&z.auto?.timerActive===false)W.KVPV_HITRUN_AUTO?.repairPolling?.();

      W.KVPV_TH300?.repairPolling?.();

    }



    if(S.mode===MODE.BOSS_TH300){

      const evidence=W.KVPV_TH300?.status?.(false);

      if(evidence?.running&&(evidence.confirmedSkills??evidence.confirmedOver300??[]).length===0){

        log('RESCAN','Boss hiện tại chưa có chiêu xác nhận');start(MODE.BOSS_TH300_SCAN);return;

      }

    }

    if(S.mode===MODE.OFF&&W._Ba?._rJ?._O$?.ins?.isDead!==true)start(scopedMode);

    if(S.mode!==MODE.OFF){syncTowerBoss();syncTianQuanBoss();}

  }



  function watchMap(mode){scopedMode=mode;

    const schedule=W.KVPV_V1?.timers?.setInterval??W.setInterval;

    if(mapTimer==null&&typeof schedule==='function')mapTimer=schedule(syncMap,75);

  }

  const actorNow=()=>String(W._Ba?._rJ?._O$?.ins?.actorId??'');

  const valid=()=>!!initialActor && actorNow()===initialActor && !W.__KVPV_UNIVERSAL_HALTED;

  const log=(event,detail='')=>{S.history.push({at:new Date().toISOString(),event,detail});

    if(S.history.length>40)S.history.shift();};

  const inspect=()=>({boss:W.KVPV_HITRUN1?.status?.(false),

    auto:W.KVPV_HITRUN_AUTO?.status?.(false),

    range:W.KVPV_RANGE281?.status?.(false),

    th:W.KVPV_TH_FAR?.status?.(false),

    long:W.KVPV_TH300?.status?.(false)});



  function stopTqHealing(reason){
    if(!tqNoHeal())return;
    // Stop only the HP-retreat owner; the far-range controller remains running.
    try{if(W.KVPV_HITRUN_AUTO?.status?.(false)?.enabled===true)W.KVPV_HITRUN_AUTO.stop(true);}catch(e){log('tq-auto-stop-error',String(e));}
    try{if(W.KVPV_HITRUN1?.status?.(false)?.running===true)W.KVPV_HITRUN1.stop(reason);}catch(e){log('tq-hitrun-stop-error',String(e));}
    try{if(W.KVPV?.combat?.config)W.KVPV.combat.config.autoArm=false;}catch(e){log('tq-autoarm-error',String(e));}
  }
  function stopOwners(reason){

    // Release temporary HitRun wrappers before removing the skill hook beneath.

    try{W.KVPV_HITRUN_AUTO?.stop?.(true);}catch(e){log('auto-stop-error',String(e));}

    try{if(W.KVPV_HITRUN1?.status?.(false)?.running)W.KVPV_HITRUN1.stop(reason);}catch(e){log('boss-stop-error',String(e));}

    try{W.KVPV_TH300?.stop?.(reason);}catch(e){log('long-stop-error',String(e));}

    try{W.KVPV_TH_FAR?.stop?.(reason);}catch(e){log('th-stop-error',String(e));}

    // Do not attempt to stop a controller that has not been installed.

    try{W.KVPV_RANGE281?.enable?.(false);}catch(e){log('range-stop-error',String(e));}

    // Disable any other auto-arm repair watcher until manual BOSS start.

    try{if(W.KVPV?.combat?.config)W.KVPV.combat.config.autoArm=false;}catch(e){log('flag-stop-error',String(e));}

  }



  function cleanState(){

    const z=inspect();

    if(([MODE.BOSS,MODE.BOSS_TH,MODE.BOSS_TH300,MODE.BOSS_TH300_SCAN].includes(S.mode)) && z.boss?.running!==true)

      return ['LINH_LUNG','PHU_VAN','TRU_TIEN'].includes(W.KVPV_FAR_SCOPE?.status?.().kind)?(S.lastError||'Phó bản: chờ mục tiêu hợp lệ để bật HitRun 35/100'):z.auto?.enabled===true?'Boss chưa chạy: '+String(z.auto.lastError||z.auto.lastBlocked||z.auto.lastMode||'chờ game chọn Boss'):'Boss auto OFF / awaiting explicit BOSS start';

    return S.reason;

  }



  function status(show=true){

    const z=inspect();

    const out={version:'1.0.0',mode:S.mode,actorId:initialActor,actorValid:valid(),

      tianQuanOnly:!!scopedMode&&!W.KVPV_FAR_SCOPE,farMapsOnly:!!scopedMode,insideTianQuan:W.KVPV_TQ_SCOPE?.inside?.()??false,farScope:W.KVPV_FAR_SCOPE?.status?.()??null,pendingTianQuanMode:scopedMode,mapScope:W.KVPV_TQ_SCOPE?.status?.()??null,

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



  function stop(reason='Người dùng dừng combat mode'){

    releaseEntryMove();

    scopedMode=null;lastTianQuanKey=null;if(mapTimer!=null){(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)?.(mapTimer);mapTimer=null;}

    stopOwners(reason);S.mode=MODE.OFF;S.reason=reason;S.switches++;

    S.lastChangedAt=new Date().toISOString();log('STOP',reason);return status(false);

  }



  function start(modeName){

    let target=choose(modeName);

    if(target===MODE.OFF)return stop();

    if(W._Ba?._rJ?._O$?.ins?.isDead===true)throw Error('Nhân vật đã chết; hồi sinh rồi START lại');

    if(!valid())throw Error('Sai game-frame hoặc nhân vật chưa sẵn sàng');

    if(!W.KVPV_HITRUN_AUTO || !W.KVPV_HITRUN1)

      throw Error('Thiếu module combat trong V1');

    if(target===MODE.BOSS_TH && (!W.KVPV_RANGE281?.enable||!W.KVPV_RANGE281?.setTrialRange))

      throw Error('Thiếu RANGE281 cho mode Tuyệt Học thử nghiệm');

    if(target===MODE.BOSS_TH && !W.KVPV_TH_FAR?.start)throw Error('Thiếu TUYET HOC FAR');

    if(([MODE.BOSS_TH300,MODE.BOSS_TH300_SCAN].includes(target)) && !W.KVPV_TH300?.start)throw Error('Thiếu bộ điều khiển TH300');

    if(target===MODE.BOSS_TH300){

      const evidence=W.KVPV_TH300.status(false);

      if((evidence.confirmedSkills??evidence.confirmedOver300??[]).length===0){

        target=MODE.BOSS_TH300_SCAN;log('RESCAN','STRICT chưa có bằng chứng cho Boss hiện tại');

      }

    }

    if([MODE.BOSS_TH300,MODE.BOSS_TH300_SCAN].includes(target)){

      watchMap(target);

      if(!inFarMap()){stopOwners('Chờ map Thiên Quan/Linh Lung');S.mode=MODE.OFF;S.reason='Ngoài Thiên Quan/Linh Lung: combat mặc định; chờ vào map';return status(false);}

    }else{scopedMode=null;if(mapTimer!=null){(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)?.(mapTimer);mapTimer=null;}}

    const previous=S.mode;

    // Release the outside-map basic selector before installing stage hooks.

    W.KVPV_BASIC10?.release?.();

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

        if(target!==MODE.BOSS&&W.KVPV_RANGE281?.enable){

          if(typeof W.KVPV_RANGE281.setTrialRange==='function')W.KVPV_RANGE281.setTrialRange([MODE.BOSS_TH300,MODE.BOSS_TH300_SCAN].includes(target)?Number(W.KVPV_TH300.status(false).requestedDistance??W.KVPV_TH300.status(false).goalDistance??302)+10:281);

          W.KVPV_RANGE281.enable(true);

        }

        if(target===MODE.BOSS_TH)W.KVPV_TH_FAR.start();

        if(target===MODE.BOSS_TH300_SCAN)W.KVPV_TH300.start('SCAN');

        if(target===MODE.BOSS_TH300)W.KVPV_TH300.start('STRICT');

        if(W.KVPV?.combat?.config)W.KVPV.combat.config.autoArm=!tqNoHeal();

        if(['LINH_LUNG','PHU_VAN','TRU_TIEN'].includes(W.KVPV_FAR_SCOPE?.status?.().kind)){syncTowerBoss();}

        else if(tqNoHeal())stopTqHealing('TQ 310 distance only');
        else{W.KVPV_HITRUN_AUTO.rearm();const ar=W.KVPV_HITRUN_AUTO.status(false);

          if(ar?.enabled!==true)throw Error('Boss auto-arm chưa bật');}

        if([MODE.BOSS_TH300,MODE.BOSS_TH300_SCAN].includes(target))W.KVPV_TH300.sync?.();

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



  function armTianQuan(){lastTianQuanKey=null;watchMap(MODE.BOSS_TH300_SCAN);syncMap();return status(false);}

  const api=Object.freeze({version:'1.0.0',start,stop,status,syncMap,armTianQuan,

    modes:MODE,history:()=>S.history.slice()});

  try{W.KVPV_MODE?.stop?.('Reload integrated FULL');}catch(_){window.KVPV_V1?.diagnostics?.record(_);}

  W.KVPV_MODE=api;

  // The base FULL used to auto-start Boss. V12.9.4 requires explicit selection.

  stopOwners('Khởi tạo: chờ chọn mode');

  console?.info?.(TAG,'READY/OFF. Chạy KVPV_MODE.start("BOSS") | .start("BOSS_TH") | .start("BOSS_TH300_SCAN") | .start("BOSS_TH300") | .stop()');

})();

/* KVPV_SKILL_SOURCE_END 09-modes.js */
}

function __KVPV_SKILL_SOURCE_09_range_keeper310_js() {
/* KVPV_SKILL_SOURCE_BEGIN 09-range-keeper310.js */
/* Conservative range keeper: native movement, one owner, 310 target. */
(()=>{
'use strict';
const W=window,actor=String(W.__KVPV_OWN_ACTOR_ID||''),prev=W.KVPV_RANGE_KEEP310;
prev?.stop?.();
const C={distance:310,tolerance:2,pollMs:250,minMoveMs:800};
const S={enabled:false,timer:null,lastMoveAt:0,moves:0,distance:null,scope:'OUTSIDE',reason:'off',error:'',lastScopeAt:0,phase:'FIGHT',hpPct:null,retreats:0,ownMovePending:false,arrivalStops:0};
const owned=()=>actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;
const pos=o=>{const p=o?.property?.get?.('position');return Number.isFinite(Number(p?.x))&&Number.isFinite(Number(p?.y))?{x:Number(p.x),y:Number(p.y)}:null;};
// Intercept only native auto-approach toward a verified dungeon Boss while already at the 310 ring.
// Preserve manual input and recovery movement; never fake movement or skill reach.
let hook=null,blockedApproaches=0,ownPath=null;
function releaseHook(){if(!hook)return;const h=hook;hook=null;if(h.m.moveTo!==h.fn)return;
 try{if(h.own)Object.defineProperty(h.m,'moveTo',h.own);else delete h.m.moveTo;}catch(_){}
}
function guardApproach(mover,role,target){
 if(hook?.m===mover)return;
 releaseHook();
 const own=Object.getOwnPropertyDescriptor(mover,'moveTo'),native=mover.moveTo;
 if(typeof native!=='function'||own?.configurable===false||(Object.isExtensible(mover)===false&&!own))return;
 const fn=function(x,y,...rest){
  const scope=W.KVPV_FAR_SCOPE?.status?.(),a=pos(role),b=pos(target);
  const boss=role?.getComponent?.(W._d?._Yct?._Het)?.target;
  const rec=W.KVPV_HITRUN1?.status?.(false);
  const safe=S.enabled&&owned()&&scope?.inside===true&&
   ['THIEN_QUAN','LINH_LUNG','PHU_VAN'].includes(scope.kind)&&
   boss===target&&W.KVPV_FAR_SCOPE?.eligible?.(target)===true&&
   W.KVPV_ENTRY_POLICY?.manual!==true&&!W.KVPV_EVENT_PRIORITY?.hold?.()&&
   W._Ba?._rJ?._O$?.ins?.isDead!==true&&
   !(rec?.running===true&&rec.phase!=='FIGHT')&&
   a&&b&&Number.isFinite(Number(x))&&Number.isFinite(Number(y));
  if(safe){const d=Math.hypot(a.x-b.x,a.y-b.y),next=Math.hypot(Number(x)-b.x,Number(y)-b.y);
   if(Math.abs(d-C.distance)<=C.tolerance&&next<C.distance-C.tolerance){blockedApproaches++;S.reason='blocked_native_approach_for_close_skill';return;}
  }
  return native.apply(this,[x,y,...rest]);
 };
 try{Object.defineProperty(mover,'moveTo',{configurable:true,writable:true,enumerable:own?.enumerable??false,value:fn});hook={m:mover,own,fn};}catch(_){}
}
function tick(){
 if(!S.enabled||!owned())return;
 try{
 const scope=W.KVPV_FAR_SCOPE?.status?.(),kind=scope?.kind;
 S.scope=kind||'OUTSIDE';S.lastScopeAt=Date.now();
 if(!scope?.inside||!['THIEN_QUAN','LINH_LUNG','PHU_VAN'].includes(kind)){ownPath=null;S.ownMovePending=false;releaseHook();S.reason='outside_scope';return;}
 if(W._Ba?._rJ?._O$?.ins?.isDead===true||W.KVPV_ENTRY_POLICY?.manual===true||W.KVPV_EVENT_PRIORITY?.hold?.()||W.KVPV_BOSS_TEAM?.priority?.()===true){S.reason='yield_priority';return;}
 const recovery=W.KVPV_HITRUN1?.status?.(false);
 if(recovery?.running===true&&recovery.phase!=='FIGHT'){S.reason='yield_recovery';return;}
 const role=W._C?._Ba?.instance?.getRole?.(Number(actor)),types=W._d?._Yct;
 const mover=role?.getComponent?.(types?._zet),combat=role?.getComponent?.(types?._Het),target=combat?.target;
 if(!mover||typeof mover.moveTo!=='function'||!target||Number(target.property?.get?.('type'))!==1||target.isValid===false){S.reason='waiting_native_target_or_mover';return;}
 if(W.KVPV_FAR_SCOPE?.eligible?.(target)!==true){S.reason='target_not_eligible';return;}
 guardApproach(mover,role,target);
 if(ownPath&&(ownPath.mover!==mover||ownPath.target!==target)){ownPath=null;S.ownMovePending=false;}
 const hp=role?.property?.get?.('hp');
 if(Array.isArray(hp)&&Number(hp[1])>0){
  S.hpPct=Number(hp[0])*100/Number(hp[1]);
  if(S.phase==='FIGHT'&&S.hpPct<=35){S.phase='RETREAT';S.retreats++;}
  if(S.phase==='RETREAT'&&S.hpPct>=100)S.phase='FIGHT';
 }
 const a=pos(role),b=pos(target);
 if(!a||!b){S.reason='waiting_positions';return;}
 const d=Math.hypot(a.x-b.x,a.y-b.y);S.distance=Math.round(d*100)/100;
 if(S.phase==='FIGHT'&&Math.abs(d-C.distance)<=C.tolerance){
  // Old Hit & Run handoff: stop only the remaining path started by our keeper.
  if(ownPath&&ownPath.mover===mover&&ownPath.target===target){
   if(typeof mover.stop==='function'){mover.stop();S.arrivalStops++;}
   ownPath=null;S.ownMovePending=false;
  }
  S.reason='holding_far';return;
 }
 if(S.phase==='RETREAT'&&d>=400){S.reason='healing_at_safe_range';return;}
 if(Date.now()-S.lastMoveAt<C.minMoveMs||mover.running?.()===true){S.reason='moving_or_throttled';return;}
 if(d<1){S.reason='overlapping_positions';return;}
 const goal=S.phase==='RETREAT'?400:C.distance;
 const x=b.x+(a.x-b.x)/d*goal,y=b.y+(a.y-b.y)/d*goal;
 if(!Number.isFinite(x)||!Number.isFinite(y)){S.reason='invalid_waypoint';return;}
 mover.moveTo(x,y);ownPath={mover,target};S.ownMovePending=true;S.lastMoveAt=Date.now();S.moves++;S.reason=S.phase==='RETREAT'?'retreating_for_heal':'moving_to_310';
 }catch(e){S.error=String(e?.message??e);S.reason='error';}
}
function status(){const scope=W.KVPV_FAR_SCOPE?.status?.();return {...S,actor,goal:C.distance,tolerance:C.tolerance,timer:S.timer!==null,liveScope:scope?.kind??'UNKNOWN',liveInside:scope?.inside===true,liveMap:scope?.current??null,scopeSampleAgeMs:S.lastScopeAt?Date.now()-S.lastScopeAt:null,blockedApproaches,moveGuard:!!hook};}
function stop(){releaseHook();ownPath=null;S.ownMovePending=false;S.enabled=false;if(S.timer!==null){(W.KVPV_V1?.timers??W).clearInterval?.(S.timer);S.timer=null;}S.reason='stopped';return status();}
function start(){if(!owned()){S.reason='waiting_actor';return status();}S.enabled=true;if(S.timer===null&&typeof W.setInterval==='function'){S.timer=(W.KVPV_V1?.timers??W).setInterval(tick,C.pollMs);}return status();}
W.KVPV_RANGE_KEEP310=Object.freeze({tick,start,stop,status});
start();
})();
/* KVPV_SKILL_SOURCE_END 09-range-keeper310.js */
}

function __KVPV_SKILL_SOURCE_09_th300_scan_default_js() {
/* KVPV_SKILL_SOURCE_BEGIN 09-th300-scan-default.js */
/* Restore historical TH300 SCAN as the active far-Boss owner. */
(()=>{
'use strict';
const W=window;
function activate(){
 const legacy=W.KVPV_TH300,mode=W.KVPV_MODE;
 if(!legacy?.start||!mode?.start)return {ready:false,reason:'legacy_dependencies_missing'};
 try{
  W.KVPV_COMBAT_ENGINE?.stop?.();
  W.KVPV_RANGE_KEEP310?.stop?.();
  // Explicit no-heal 310 profile for live TH300.
  W.KVPV_TQ_POSITION_ONLY={...(W.KVPV_TQ_POSITION_ONLY??{}),enabled:true,distance:310};
  legacy.setDistance?.(310);
  // Configure the native mixed selector BEFORE entering SCAN. Mode.start
  // can defer activation outside Tian Quan; its handoff must inherit basics.
  // Only the original TH300 controller dispatches combat.
  // Tian Quan: all five native basics at 310, without Tuyet Hoc.
  // Five-basic profile must be enabled before setting rotation (8002 is otherwise excluded).
  legacy.setBasicOnly?.(false); // BasicOnly's legacy path hardcodes 8001.
  const five=legacy.setTianQuanFiveBasics?.(true,1);
  if(five?.available===false||five?.enabled===false)throw Error('Tian Quan five-basics profile unavailable');
  legacy.setTianQuanTuyetHoc?.(false);
  legacy.setBasicRotation?.([8001,8002,8003,8004,8005]);

  // Mixed selector dispatches native basics even while Tuyet Hoc is disabled.
  legacy.setInterleaved?.(true,310);
  legacy.setPrimaryBasic?.(true);
  legacy.setSkillPriority?.('interleaved');
  // Visual playback only; native cooldown and server damage stay unchanged.
  legacy.setBasicAnimationSpeed?.(99999);
  legacy.setTianQuanBasicVisualSpeed?.(9999);
  legacy.setClientPace?.(1);
  mode.start('BOSS_TH300_SCAN');
  // Enforce five basics after mode startup/handoff; TH must remain disabled.
  legacy.setTianQuanTuyetHoc?.(false);
  W.KVPV_TH_FAR?.stop?.('tianquan_five_basics_only');
  // Mode owns the TH300 sender and map handoff. Explicitly remove newer senders afterwards.
  W.KVPV_COMBAT_ENGINE?.stop?.();
  W.KVPV_RANGE_KEEP310?.stop?.();
  const th=legacy.status?.(false);
  return {ready:true,mode:mode.status?.(),th,requestedBasicIds:[8001,8002,8003,8004,8005],tuyetHocEnabled:false};
 }catch(e){return {ready:false,reason:String(e?.message??e)};}
}
// Persistent scoped client-only cooldown FALSE override in Tian Quan.
// It cannot modify server-side cooldowns; restore the original on scope exit.
W.KVPV_TQ_8001_CD?.stop?.('reload');
const CD={hook:null,timer:null,enabled:true,forced:0,reason:'armed'};
function cdScope(){
 const s=W.KVPV_FAR_SCOPE?.status?.();
 return CD.enabled&&s?.inside===true&&
  (s.kind==='THIEN_QUAN'&&W.KVPV_TH300?.status?.(false)?.running===true)&&
  String(W._Ba?._rJ?._O$?.ins?.actorId??'')===String(W.__KVPV_OWN_ACTOR_ID??'');
}
function cdRelease(reason){
 const h=CD.hook;CD.hook=null;
 if(h&&h.obj.isCooldown===h.fn){
  try{if(h.own)Object.defineProperty(h.obj,'isCooldown',h.own);else delete h.obj.isCooldown;}
  catch(e){CD.reason='restore_error:'+String(e);return;}
 }
 CD.reason=reason;
}
function cdSync(){
 if(!cdScope()){cdRelease('outside_combat_scope');return;}
 const id=String(W.__KVPV_OWN_ACTOR_ID??'');
 const world=W._C?._Ba?.instance;
 const actor=world?.getRole?.(Number(id))??world?.getRole?.(id);
 const c=actor?.getComponent?.(W._d?._Yct?._Het);
 if(!c||typeof c.isCooldown!=='function')return;
 if(CD.hook){
  if(CD.hook.obj===c&&c.isCooldown===CD.hook.fn)return;
  cdRelease('combat_component_changed');
 }
 const own=Object.getOwnPropertyDescriptor(c,'isCooldown');
 if(own&&!own.configurable)return;
 const original=c.isCooldown;
 const fn=function(...args){
  if(this===c&&cdScope()){CD.forced++;return false;}
  return original.apply(this,args);
 };
 try{Object.defineProperty(c,'isCooldown',{value:fn,writable:true,configurable:true,enumerable:!!own?.enumerable});
  CD.hook={obj:c,fn,own};CD.reason='active';
 }catch(e){CD.reason='hook_error:'+String(e);}
}
function cdStop(reason='manual'){
 CD.enabled=false;
 if(CD.timer!==null){W.clearInterval?.(CD.timer);CD.timer=null;}
 cdRelease(reason);return cdStatus();
}
function cdStatus(){return {enabled:CD.enabled,active:!!CD.hook&&CD.hook.obj.isCooldown===CD.hook.fn&&cdScope(),
 forcedTrue:0,forcedFalse:CD.forced,returnValueWhenActive:false,reason:CD.reason,serverCooldownModified:false};}
W.KVPV_TQ_8001_CD=Object.freeze({status:cdStatus,stop:cdStop});
if(typeof W.setInterval==='function')CD.timer=W.setInterval(cdSync,1);
cdSync();
W.KVPV_TH300_RESTORE=Object.freeze({activate,status:()=>({mode:W.KVPV_MODE?.status?.(),th:W.KVPV_TH300?.status?.(false),newEngine:W.KVPV_COMBAT_ENGINE?.status?.()})});
activate();
})();
/* KVPV_SKILL_SOURCE_END 09-th300-scan-default.js */
}

function __KVPV_SKILL_SOURCE_10_experimental_boost_js() {
/* KVPV_SKILL_SOURCE_BEGIN 10-experimental-boost.js */

/* Experimental CLIENT settings. Server cooldown and movement acceptance unverified. */

(() => {

  'use strict';

  const W=window;W.KVPV_EXPERIMENTAL_BOOST?.stop?.();

  const actor=String(W.__KVPV_OWN_ACTOR_ID||'');

  const defs={phiPhong:'cloakContext'};

  const state={enabled:true,timer:null,move:null,hooks:new Map(),nextCompanionScan:0,lastError:''};

  const config={companionFactor:10,moveFactor:99,movementSyncMs:16,companionScanMs:100,clientWaitMs:{}};

  const ownActor=()=>actor&&String(W._Ba?._rJ?._O$?.ins?.actorId??'')===actor&&!W.__KVPV_UNIVERSAL_HALTED;

  // User-approved global boost: independent of map and main-character mode.

  const active=()=>state.enabled&&ownActor()&&W._Ba?._rJ?._O$?.ins?.isDead!==true;



  function restoreMove(){const h=state.move;if(!h)return;

    if(h.obj.speed===h.applied)h.obj.speed=h.base;state.move=null;

  }

  function detach(key){const h=state.hooks.get(key);if(!h)return;

    if(h.obj._f7t===h.fn){if(h.descriptor)Object.defineProperty(h.obj,'_f7t',h.descriptor);else delete h.obj._f7t;}

    state.hooks.delete(key);

  }

  function attach(key,selector){

    const previous=state.hooks.get(key);if(previous?.obj===selector)return;

    detach(key);if(typeof selector?._f7t!=='function')return;

    const descriptor=Object.getOwnPropertyDescriptor(selector,'_f7t');if(descriptor&&!descriptor.configurable)return;

    const native=selector._f7t,h={obj:selector,descriptor,fn:null,ready:new Map(),selections:0,context:null,combat:null,lastAttempt:-Infinity,attempts:0,lastReason:'waiting_components'};

    h.fn=function(activeRows,commonRows,mode){

      if(!active()||this!==selector)return native.apply(this,arguments);

      const now=Date.now();

      const clone=rows=>!Array.isArray(rows)?rows:rows.map(row=>{

        if(!Array.isArray(row)||!Number.isSafeInteger(Number(row[0]))||!(Number(row[2])>0))return row;

        const id=Number(row[0]),copy=row.slice(),fixed=config.clientWaitMs[key];



        if(!h.ready.has(id))h.ready.set(id,Number(row[1])<=now?0:now+(fixed??((Number(row[1])-now)/config.companionFactor)));

        copy[1]=h.ready.get(id);copy[2]=fixed??Math.max(1,Number(row[2])/config.companionFactor);return copy;

      });

      const a=clone(activeRows),b=clone(commonRows),id=native.call(this,a,b,mode);

      const row=[...(Array.isArray(a)?a:[]),...(Array.isArray(b)?b:[])].find(x=>Number(x?.[0])===Number(id));

      if(Number(id)>0&&row){h.ready.set(Number(id),Math.max(now+1,Number(row[1])||now+Number(row[2])));h.selections++;}

      return id;

    };

    Object.defineProperty(selector,'_f7t',{value:h.fn,configurable:true,writable:true,enumerable:!!descriptor?.enumerable});state.hooks.set(key,h);

  }



  function tick(forceCompanions=false){try{

    if(!active()){state.nextCompanionScan=0;restoreMove();for(const k of [...state.hooks.keys()])detach(k);return;}

    const world=W._C?._Ba?.instance,role=world?.getRole?.(Number(actor))??world?.getRole?.(actor);

    if(!role){state.nextCompanionScan=0;restoreMove();for(const k of [...state.hooks.keys()])detach(k);return;}

    const mover=role.getComponent?.(W._d?._Yct?._zet);

    if(state.move?.obj!==mover)restoreMove();

    if(mover){

      const h=state.move;

      if(!h||mover.speed!==h.applied){const base=Number(mover.speed);if(Number.isFinite(base)&&base>0)state.move={obj:mover,base,applied:base*config.moveFactor};}

      if(state.move)mover.speed=state.move.applied;

    }



    if(!forceCompanions&&Date.now()<state.nextCompanionScan)return;

    state.nextCompanionScan=Date.now()+config.companionScanMs;

    for(const [key,property] of Object.entries(defs)){

      const context=role.property?.get?.(property);

      const selector=context&&context!==role?context.getComponent?.(W._d?._Yct?._Eet):null;

      attach(key,selector===role.getComponent?.(W._d?._Yct?._Eet)?null:selector);

      const h=state.hooks.get(key);if(h){h.context=context;h.combat=context?.getComponent?.(W._d?._Yct?._Het);}

    }



  }catch(e){state.lastError=String(e?.message||e);}}



  function status(){return {experimental:true,enabled:state.enabled,active:!!active(),...config,clientWaitMs:{...config.clientWaitMs},

    movementApplied:!!state.move,companions:Object.fromEntries(Object.keys(defs).map(k=>[k,{hooked:state.hooks.has(k),selections:state.hooks.get(k)?.selections||0,combatAttempts:state.hooks.get(k)?.attempts||0,lastReason:state.hooks.get(k)?.lastReason??'not_attached'}])),lastError:state.lastError,

    note:'Linh Thu, Phuc Oa and Ngu Thu use native skills; only cloak selector and movement retain existing experimental settings.'};}



  function stop(){state.enabled=false;if(state.timer!=null){(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(state.timer);state.timer=null;}

    restoreMove();for(const k of [...state.hooks.keys()])detach(k);return status();}



  function start(){state.enabled=true;if(state.timer==null)state.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,config.movementSyncMs);tick(true);return status();}

  W.KVPV_EXPERIMENTAL_BOOST=Object.freeze({start,stop,status,sync:()=>tick(true)});start();

})();

/* KVPV_SKILL_SOURCE_END 10-experimental-boost.js */
}

function __KVPV_SKILL_SOURCE_10_tq_basic_force_js() {
/* KVPV_SKILL_SOURCE_BEGIN 10-tq-basic-force.js */
/* Explicit opt-in, persistent client-only basic force for Tian Quan.
 * No timer and no server protocol edits. One owned hook per component/tween;
 * native fallback outside the owned BASIC ONLY context and manual OFF. */
(() => {
  'use strict';
  const W=window;
  W.KVPV_TQ_BASIC_FORCE?.stop?.('module_reload');
  const actorId=String(W.__KVPV_OWN_ACTOR_ID??W._Ba?._rJ?._O$?.ins?.actorId??'');
  const S={enabled:false,live:false,hook:null,tween:null,target:null,scene:'',
    cooldownFalse:0,animationFalse:0,animationPatched:0,restores:0,
    error:'',reason:'off'};
  const scene=()=>String(W._Ba?._$a?._yo?.ins?.intoSce?.[0]??'');
  const combat=()=>{
    const world=W._C?._Ba?.instance;
    const a=world?.getRole?.(Number(actorId))??world?.getRole?.(actorId);
    return a?.getComponent?.(W._d?._Yct?._Het);
  };
  // PURE primitive checks in wrappers: never call KVPV_TH300.status(),
  // scope.status(), nativeReady() or the module's own sync() from a wrapper.
  function liveFor(c){
    return S.enabled&&S.live&&W.document?.hidden!==true&&
      !W.__KVPV_UNIVERSAL_HALTED&&
      String(W._Ba?._rJ?._O$?.ins?.actorId??'')===actorId&&
      S.hook?.obj===c&&c?.target===S.target&&scene()===S.scene;
  }
  function restoreTween(){
    const t=S.tween;S.tween=null;if(!t)return;
    try{
      const now=Object.getOwnPropertyDescriptor(t.obj,'isPlaying');
      if(now?.get!==t.get||now?.set!==t.set){
        S.error='Foreign animation hook retained (not overwritten)';return;
      }
      if(t.own){
        const restore={...t.own};
        if(Object.prototype.hasOwnProperty.call(restore,'value'))restore.value=t.value;
        Object.defineProperty(t.obj,'isPlaying',restore);
      }else{
        delete t.obj.isPlaying;
        // Native assignment to an inherited data property normally creates an
        // own data property. Keep that last native value if one was assigned.
        if(t.wrote&&(!t.parent||Object.prototype.hasOwnProperty.call(t.parent,'value')))
          Object.defineProperty(t.obj,'isPlaying',{configurable:true,writable:true,
            enumerable:true,value:t.value});
      }
      S.restores++;
    }catch(e){S.error=String(e?.message||e);}
  }
  function restoreCooldown(){
    const h=S.hook;S.hook=null;if(!h)return;
    try{
      if(h.obj.isCooldown!==h.fn){
        S.error='Foreign cooldown hook retained (not overwritten)';return;
      }
      if(h.own)Object.defineProperty(h.obj,'isCooldown',h.own);
      else delete h.obj.isCooldown;
      S.restores++;
    }catch(e){S.error=String(e?.message||e);}
  }
  function release(reason='manual',disable=true){
    S.live=false;
    restoreTween();
    restoreCooldown();
    if(disable){S.enabled=false;S.blocked=false;}
    S.target=null;S.scene='';S.reason=reason;
    return status();
  }
  function parentDescriptor(obj,key){
    let p=Object.getPrototypeOf(obj);
    while(p){const d=Object.getOwnPropertyDescriptor(p,key);if(d)return d;p=Object.getPrototypeOf(p);}
    return null;
  }
  function ensureTween(c){
    const obj=c?._jh;
    if(S.tween&&S.tween.obj===obj){
      const desc=Object.getOwnPropertyDescriptor(obj,'isPlaying');
      if(desc?.get===S.tween.get&&desc?.set===S.tween.set)return;
      S.error='Animation property externally replaced; not overwriting';
      S.tween=null;return;
    }
    restoreTween();
    if(!obj||typeof obj!=='object')return;
    const own=Object.getOwnPropertyDescriptor(obj,'isPlaying');
    if(own&&!own.configurable){S.error='Animation has non-configurable own property';return;}
    if(!own&&!Object.isExtensible(obj)){S.error='Animation object cannot be extended';return;}
    const parent=own?null:parentDescriptor(obj,'isPlaying');
    let value;
    try{value=obj.isPlaying;}catch(_){return;}
    let wrote=false;
    const readNative=()=>{
      try{
        if(own?.get)return own.get.call(obj);
        if(!own&&parent?.get)return parent.get.call(obj);
      }catch(_){}
      return value;
    };
    const writeNative=v=>{
      wrote=true;value=v;
      try{
        if(own?.set)own.set.call(obj,v);
        else if(!own&&parent?.set)parent.set.call(obj,v);
      }catch(e){S.error=String(e?.message||e);}
    };
    const get=function(){if(liveFor(c)){S.animationFalse++;return false;}return readNative();};
    const set=function(v){writeNative(v);};
    try{
      Object.defineProperty(obj,'isPlaying',{configurable:true,
        enumerable:own?.enumerable??parent?.enumerable??true,get,set});
      S.tween={obj,own,parent,get,set,get value(){return value;},get wrote(){return wrote;}};
      S.animationPatched++;
    }catch(e){S.error=String(e?.message||e);}
  }
  function available(c){
    if(String(W._Ba?._rJ?._O$?.ins?.actorId??'')!==actorId){
      S.blocker='actor_changed';return false;
    }
    if(W.__KVPV_UNIVERSAL_HALTED){S.blocker='universal_halt';return false;}
    if(W.document?.hidden===true){S.blocker='background_tab';return false;}
    const kind=W.KVPV_FAR_SCOPE?.status?.()?.kind;
    if(!['THIEN_QUAN','LINH_LUNG','PHU_VAN'].includes(kind)){
      S.blocker='outside_supported_boss_scene';return false;
    }
    if(kind!=='THIEN_QUAN'&&W.KVPV_FAR_SCOPE?.eligible?.(c?.target)!==true){
      S.blocker='waiting_verified_dungeon_monster';return false;
    }
    if(!c){S.blocker='combat_component_missing';return false;}
    const m=W.KVPV_TH300?.status?.(false);
    if(m?.running!==true){S.blocker='th300_not_running';return false;}
    if(m?.basicOnly!==true){S.blocker='basic_only_disabled';return false;}
    if(!c.target){S.blocker='waiting_for_boss_target';return false;}
    S.blocker='';return true;
  }
  function configureBasicOnly(){
    const k=W.KVPV_TH300;
    if(typeof k?.setTianQuanFiveBasics!=='function'||typeof k?.setTianQuanTuyetHoc!=='function')
      throw Error('TH300 basic-mode configuration is unavailable');
    k.setTianQuanFiveBasics(true,1);
    k.setTianQuanTuyetHoc(false);
    k.setTianQuanTHGapBasics?.(false);
    k.setTianQuanIdleFill?.(false);
    k.setConfirmedTailCut?.(true);
  }
  function sync(){
    if(!S.enabled)return status();
    const c=combat();
    // When the user armed outside the map, auto-enable BASIC ONLY once the
    // existing Tian Quan watcher starts TH300. No explicit F5/retry needed.
    if(['THIEN_QUAN','LINH_LUNG','PHU_VAN'].includes(W.KVPV_FAR_SCOPE?.status?.()?.kind)&&
       W.KVPV_TH300?.isBasicOnly?.()===false){
      try{
        if(W.KVPV_TH300.status(false)?.running===true)configureBasicOnly();
      }catch(e){S.error=String(e?.message||e);}
    }
    let ok=false;
    try{ok=available(c);}catch(e){S.error=String(e?.message||e);}
    if(!ok){
      if(S.hook||S.tween)release('suspended_outside_basic_tq',false);
      S.reason=S.blocker||'waiting_for_basic_tq';
      return status();
    }
    if(S.hook&&(S.hook.obj!==c||c.isCooldown!==S.hook.fn)){
      const foreign=S.hook.obj===c&&c.isCooldown!==S.hook.fn;
      release('combat_component_changed_or_foreign_hook',false);
      if(foreign){S.error='Foreign cooldown hook retained; turn OFF before re-enabling';S.blocked=true;return status();}
    }
    if(S.blocked)return status();
    if(!S.hook){
      const own=Object.getOwnPropertyDescriptor(c,'isCooldown');
      if(typeof c.isCooldown!=='function'||own&&!own.configurable){
        S.error='Cooldown method cannot be wrapped';return status();
      }
      const original=c.isCooldown;
      const wrapped=function(...args){
        if(this===c&&liveFor(c)){S.cooldownFalse++;return false;}
        return original.apply(this,args);
      };
      try{
        Object.defineProperty(c,'isCooldown',{configurable:true,writable:true,
          enumerable:own?.enumerable??true,value:wrapped});
        S.hook={obj:c,own,fn:wrapped};
      }catch(e){S.error=String(e?.message||e);return status();}
    }
    S.target=c.target;S.scene=scene();S.live=true;S.reason='active';
    ensureTween(c);
    return status();
  }
  function setEnabled(enabled=true){
    if(enabled!==true)return release('manual_off');
    if(String(W._Ba?._rJ?._O$?.ins?.actorId??'')!==actorId||W.__KVPV_UNIVERSAL_HALTED)
      throw Error('Wrong actor or paused session; no hooks installed');
    // Explicit one-click intent: configure BASIC ONLY rather than requiring
    // the user to remember commands from a previous browser session.
    const inside=['THIEN_QUAN','LINH_LUNG','PHU_VAN'].includes(W.KVPV_FAR_SCOPE?.status?.()?.kind);
    if(inside){
      // Re-arm through the existing map coordinator. Do not call TH300.start()
      // directly or overwrite the native movement/HitRun owner.
      if(W.KVPV_TH300?.status?.(false)?.running!==true)
        W.KVPV_MODE?.armTianQuan?.();
      configureBasicOnly();
    }
    // If Boss selection/scene transition is pending, keep the explicit
    // user choice armed. The next TH300 tick applies it in verified scope.
    S.enabled=true;S.blocked=false;S.error='';S.reason='armed';
    return sync();
  }
  function status(){
    return {enabled:S.enabled,active:S.enabled&&S.live&&!!S.hook,
      animationForced:!!S.tween,cooldownFalseReturns:S.cooldownFalse,
      animationFalseReads:S.animationFalse,animationPatched:S.animationPatched,
      restores:S.restores,reason:S.reason,blocker:S.blocker??'',error:S.error,
      autoTimeout:false,serverCooldownModified:false};
  }
  W.KVPV_TQ_BASIC_FORCE=Object.freeze({setEnabled,status,sync,
    suspend:reason=>release(reason??'th300_paused',false),
    stop:reason=>release(reason??'manual_off')});
})();
/* KVPV_SKILL_SOURCE_END 10-tq-basic-force.js */
}

function __KVPV_SKILL_SOURCE_11_auto_tianquan_js() {
/* KVPV_SKILL_SOURCE_BEGIN 11-auto-tianquan.js */



/* User-requested startup: arm map watcher, leave other maps to native combat. */
(() => {
  const W=window;
  // Mixed rotation must keep native basics eligible between Tuyet Hoc casts.
  W.KVPV_TQ_SINGLE_STRONGEST_TH=false;

  // User requested a hard 310 ring in Tian Quan without waiting for HP retreat.
  W.KVPV_TQ_POSITION_ONLY=Object.freeze({enabled:true,distance:310,heal:false});
  try{
    W.KVPV_BOSS_LOG?.start?.();
    // Unified native Boss mode is the only auto-combat entry.
    W.KVPV_FAR_SCOPE?.setAllBosses?.(false);
    W.KVPV_TQ115?.stop?.();
    const th=W.KVPV_TH300;
    th?.setDistance?.(310);
    th?.setBasicOnly?.(false);
    const profile=th?.setTianQuanThreeBasics?.(true,0);
    if(profile?.available===false||profile?.enabled===false)throw Error('Thiên Quan three-basic profile unavailable');
    th?.setScanInterval?.(1);
    th?.setBasicRotation?.([8001,8002,8003,8004,8005,8006,8007,8008,8009,8010,8011,8012,8013,8014,8015,8016,8017,8018,8019,8020]);
    th?.setTianQuanMpackExtras?.(true);
    th?.setTianQuanTuyetHoc?.(true);
    th?.setInterleaved?.(true,310);
    th?.setPrimaryBasic?.(false);
    th?.setSkillPriority?.('interleaved');
    // Keep interleaved mode: after each ready Tuyet Hoc, cast a ready native
    // basic immediately, then return to Tuyet Hoc. No extra client-side wait.
    th?.setBurst?.(false);
    th?.setClientPace?.(0);
    th?.setAfterTHWait?.(100);
    // Use the maximum finite TQ visual factor. The hook
    // changes client animation duration only; native cooldown/ready gates stay.
    th?.setTianQuanVisualSpeed?.(99999);

      th?.setTianQuanTuyetHoc?.(true);
      // Keep the native skill kit enabled; retain native cooldown and range gates.
      th?.setBasicOnly?.(false);
      th?.setInterleaved?.(true,310);
      th?.setSkillPriority?.('interleaved');
    W.KVPV_MODE.armTianQuan();
    th?.setTianQuanMpackExtras?.(true);
    th?.setTianQuanTuyetHoc?.(true);
      W.KVPV_TH_FAR?.stop?.('native skill system owns TH combat');
    W.KVPV_TQ_BASIC_FORCE?.setEnabled?.(false);
    console?.info?.('[KVPV V1] Tian Quan interleaved: Tuyet Hoc then immediate ready native basic; native cooldown/range gates preserved.');
  }catch(e){W.KVPV_V1?.diagnostics?.record?.(e);console?.warn?.('[KVPV V1] Auto Thiên Quan:',String(e));}
})();
/* KVPV_SKILL_SOURCE_END 11-auto-tianquan.js */
}

function __KVPV_SKILL_SOURCE_12_basic_outside_js() {
/* KVPV_SKILL_SOURCE_BEGIN 12-basic-outside.js */

/* Outside far-map combo: 4ms active poll, 16ms idle, Road-native cadence preserved. */

(() => {

  'use strict';

  const W=window;W.KVPV_BASIC10?.stop?.();
  let skillPriority='interleaved';
  let forcedTween=null;
  const pveBasic=id=>Number.isInteger(Number(id))&&Number(id)>=8001&&Number(id)<=8005;

  const actor=String(W.__KVPV_OWN_ACTOR_ID||'');

  const S={enabled:true,timer:null,timerMs:16,rapidPoll:false,hooks:[],role:null,lastCast:-Infinity,attempts:0,blocked:0,reason:'starting',lastError:'',prefer:'basic',cursor:0,basicCursor:0,basicReady:new Map(),targetSearches:0,normalMapSearches:0,lastNormalMapSearch:-Infinity,lastNormalApproach:-Infinity,normalMapMoves:0,basicAttempts:0,tuyetHocAttempts:0,forceActive:false,forceCombat:null,forceTarget:null,forceScene:null,forceCooldownReads:0,forceAnimationReads:0,forceAnimationPatched:0};

  const basic=id=>Number.isSafeInteger(Number(id))&&Number(id)>=8001&&Number(id)<=8009;

  const tuyetHoc=id=>Number.isSafeInteger(Number(id))&&Number(id)>=1001&&Number(id)<=1008;

  const allowed=id=>basic(id)||tuyetHoc(id)||W.KVPV_TRANSFORM10?.has?.(id);

  const outside=()=>(W.KVPV_FAR_SCOPE??W.KVPV_TQ_SCOPE)?.inside?.()===false;

  const sceneType=()=>Number(W._ft?._po?.ins?.getCfgById?.(Number(W._C?._Mn?._Cn?.currentID))?.[7]);
  const normalMapClear=()=>{
    const map=Number(W._C?._Mn?._Cn?.currentID),daily=W.KVPV_DAILY?.quickState?.();
    return W._Ba?._$a?.SceneUtil?.isCommonScene===true&&Number.isSafeInteger(map)&&map>0&&
      Number(W._Ba?._$a?._yo?.ins?.intoSce?.[0])===map&&W._Ba?._$a?._yo?.ins?.isInMission!==true&&
      !W.KVPV_EVENT_PRIORITY?.hold?.()&&W.KVPV_BOSS_TEAM?.priority?.()!==true&&
      (daily?.running!==true||['rảnh','ranh'].includes(String(daily?.job??'').toLowerCase()));
  };
  const beastScene=()=>sceneType()===49;
  const beastReady=c=>!beastScene()||W.KVPV_BEAST_ISLAND?.basicCombatReady?.(c?.target)===true;
  const road=()=>sceneType()===41&&W._Ba?._cm?._q3t?.ins?.getHasTeamByType?.(1)===true;

  const roadForce=()=>road()&&skillPriority==='basic_force_default'&&W.KVPV_ROAD_CADENCE?.enabled===true&&W.KVPV_ROAD_CADENCE?.combatMode!=='basic8001';
  const castGap=()=>200; // Conservative native-respecting 200ms client cast spacing.
  // Poll faster only for an actionable target, never multiply native cast calls.
  const pollInterval=()=>road()&&!roadForce()?100:Math.max(16,Number(W.KVPV_ACCOUNT_POLICY?.pollingGap?.()??0)||0);

  let roadSelector=null;

  let roadCast=null,lastRoadCast=-Infinity;

  const roadWait=()=>{const n=W.KVPV_ROAD_CADENCE?.minCastIntervalMs;return Number.isSafeInteger(n)&&n>=0&&n<=5000?n:0;};

  const roadSpeedClips=new Map();
  const roadAnimationSpeed=()=>Number(W.KVPV_TH300?.status?.(false)?.basicAnimationSpeed??1);
  function restoreRoadSpeed(){for(const [clip,state] of roadSpeedClips)try{if(clip._nt===state.applied)clip.timeScale=state.before;}catch(e){S.lastError=String(e);}roadSpeedClips.clear();}
  function roadAnimationCall(native,self,args){const factor=roadAnimationSpeed(),avatar=self?._Qrt,me=W._C?._Ba?.instance?.getRole?.(Number(actor));if(factor<=1||Number(args[0])!==8001||!road()||!owner()||W.KVPV_ROAD_CADENCE?.enabled===false||(W.KVPV_ROAD_CADENCE?.combatMode!=='basic8001'&&!W.KVPV_ROAD_CADENCE?.fast1ms)||self.owner!==me||typeof avatar?.getActionTween!=='function')return native.apply(self,args);const original=avatar.getActionTween,action=String(self._mvt?.(8001)?.[5]||'attack');const wrapped=function(...a){if(a[0]!==action)return original.apply(this,a);const before=Number(a[2]??1);if(!Number.isFinite(before)||before<=0)return original.apply(this,a);a[2]=Math.min(factor,before*factor);const tween=original.apply(this,a),clip=this.getCurAction;if(clip&&typeof clip==='object'&&roadSpeedClips.size<32)roadSpeedClips.set(clip,{before,applied:a[2]});return tween;};avatar.getActionTween=wrapped;try{return native.apply(self,args);}finally{if(avatar.getActionTween===wrapped)avatar.getActionTween=original;}}
  function releaseRoadCast(){restoreRoadSpeed();if(!roadCast)return;const h=roadCast;if(h.obj.combat===h.fn){if(h.descriptor)Object.defineProperty(h.obj,'combat',h.descriptor);else delete h.obj.combat;}roadCast=null;lastRoadCast=-Infinity;}

  function syncRoadCast(combat){if(roadAnimationSpeed()<=1)restoreRoadSpeed();if(!roadWait()&&roadAnimationSpeed()<=1){releaseRoadCast();return;}if(roadCast?.obj===combat)return;releaseRoadCast();const descriptor=Object.getOwnPropertyDescriptor(combat,'combat'),native=combat.combat;if(descriptor?.configurable===false)return;const fn=function(...args){if(road()&&owner()&&W.KVPV_ROAD_CADENCE?.enabled!==false&&roadWait()>0){const now=Date.now();if(now-lastRoadCast<roadWait())return;lastRoadCast=now;}return roadAnimationCall(native,this,args);};Object.defineProperty(combat,'combat',{value:fn,writable:true,configurable:true});roadCast={obj:combat,fn,descriptor};}

  function releaseRoadSelector(){if(!roadSelector)return;const h=roadSelector;if(h.obj._f7t===h.fn){if(h.descriptor)Object.defineProperty(h.obj,'_f7t',h.descriptor);else delete h.obj._f7t;}roadSelector=null;}

  function syncRoadSelector(selector){

    if(W.KVPV_ROAD_CADENCE?.fast1ms||W.KVPV_ROAD_CADENCE?.combatMode!=='basic8001'&&!roadWait()){releaseRoadSelector();return;}

    if(roadSelector?.obj===selector)return;

    releaseRoadSelector();const descriptor=Object.getOwnPropertyDescriptor(selector,'_f7t'),native=selector._f7t;

    if(descriptor?.configurable===false)return;

    const fn=function(active,common,mode,...rest){if(!road()||!owner()||W.KVPV_ROAD_CADENCE?.enabled===false)return native.call(this,active,common,mode,...rest);if(roadWait()>0&&Date.now()-lastRoadCast<roadWait())return -1;if(W.KVPV_ROAD_CADENCE?.combatMode!=='basic8001'){
      const plan=W.KVPV_ROAD_CADENCE?.planNativeSelection?.(active,common,mode);
      if(plan?.rows?.length){const picked=Number(native.call(this,plan.rows,[],mode,...rest));
        if(Number.isSafeInteger(picked)&&picked>0)return picked;}
      return native.call(this,active,common,mode,...rest);
    }if(mode!==1)return -1;return native.call(this,(active??[]).filter(r=>Number(r?.[0])===8001),(common??[]).filter(r=>Number(r?.[0])===8001),mode,...rest);};

    Object.defineProperty(selector,'_f7t',{value:fn,writable:true,configurable:true});roadSelector={obj:selector,fn,descriptor};

  }

  const position=o=>o?.property?.get?.('position');

  function roadDistance(role,combat){const a=position(role),b=position(combat?.target);return a&&b&&[a.x,a.y,b.x,b.y].every(Number.isFinite)?Math.hypot(a.x-b.x,a.y-b.y):null;}

  function roadClose(role,combat){const d=roadDistance(role,combat);return d!==null&&d<=(W.KVPV_ROAD_CADENCE?.approachDistance??80);}

  function approachRoad(role,combat){if(!road())return false;

    if(roadClose(role,combat))return false;

    S.reason='road_closing_to_melee';const p=position(combat.target),m=role.getComponent?.(W._d?._Yct?._zet);

    if(W.KVPV_BOSS_TEAM?.priority?.()||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)||(!roadForce()&&combat.isCooldown?.()!==false)||[3,4].includes(m?._fut))return true;

    if(!p||![p.x,p.y].every(Number.isFinite)||typeof m?.moveTo!=='function')return true;

    if(m?.running?.()===true)return true;
    if(Date.now()-(S.lastApproach??-Infinity)>=1000){S.lastApproach=Date.now();m.moveTo(p.x,p.y);}

    return true;

  }

  function approachNormalMap(role,combat){
    if(!normalMapClear()||combat?.isValidTarget?.()!==true||combat?.isValidRange?.()!==false||
       Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)||W._Ba?._rJ?._O$?.ins?.isDead===true)return false;
    const p=position(combat.target),m=role?.getComponent?.(W._d?._Yct?._zet);
    if(!p||![p.x,p.y].every(Number.isFinite)||typeof m?.moveTo!=='function')return false;
    if(m.running?.()===true){S.reason='normal_map_approaching';return true;}
    if(Date.now()-S.lastNormalApproach>=800){
      S.lastNormalApproach=Date.now();m.moveTo(p.x,p.y);S.normalMapMoves++;
    }
    S.reason='normal_map_approaching';return true;
  }

  const owner=()=>actor&&String(W._Ba?._rJ?._O$?.ins?.actorId??'')===actor&&!W.__KVPV_UNIVERSAL_HALTED;
  const liveScene=()=>String(W._Ba?._$a?._yo?.ins?.intoSce?.[0]??'');
  // Wrapper callbacks only read cached primitive eligibility. Never call
  // isCooldown/status/sync or scope.status from the forced getters.
  const forceReady=c=>false&&S.forceActive&&S.forceCombat===c&&c?.target===S.forceTarget&&
    skillPriority==='basic_force_default'&&
    String(W._Ba?._rJ?._O$?.ins?.actorId??'')===actor&&
    !W.__KVPV_UNIVERSAL_HALTED&&W.document?.hidden!==true&&
    W._Ba?._rJ?._O$?.ins?.isDead!==true&&liveScene()===S.forceScene&&
    Date.now()>=Number(W.__KVPV_USER_UI_UNTIL||0);
  function restoreForcedTween(){
    const h=forcedTween;forcedTween=null;if(!h)return;
    try{
      const cur=Object.getOwnPropertyDescriptor(h.obj,'isPlaying');
      if(cur?.get!==h.get||cur?.set!==h.set){
        S.lastError='Foreign animation hook retained; not overwritten';return;
      }
      if(h.own)Object.defineProperty(h.obj,'isPlaying',{
        ...h.own,...(Object.prototype.hasOwnProperty.call(h.own,'value')?{value:h.value}:{})
      });
      else{
        delete h.obj.isPlaying;
        if(h.wrote&&(!h.parent||Object.prototype.hasOwnProperty.call(h.parent,'value')))
          Object.defineProperty(h.obj,'isPlaying',{configurable:true,writable:true,enumerable:true,value:h.value});
      }
    }catch(e){S.lastError=String(e?.message||e);}
  }
  function parentDescriptor(obj,key){
    for(let p=Object.getPrototypeOf(obj);p;p=Object.getPrototypeOf(p)){
      const d=Object.getOwnPropertyDescriptor(p,key);if(d)return d;
    }return null;
  }
  function syncForcedTween(c){
    const obj=forceReady(c)?c?._jh:null;
    if(forcedTween&&forcedTween.obj===obj){
      const d=Object.getOwnPropertyDescriptor(obj,'isPlaying');
      if(d?.get===forcedTween.get&&d?.set===forcedTween.set)return;
      S.lastError='Foreign animation hook changed; not overwritten';
      forcedTween=null;return;
    }
    restoreForcedTween();
    if(!obj||typeof obj!=='object')return;
    const own=Object.getOwnPropertyDescriptor(obj,'isPlaying');
    if((own&&!own.configurable)||(!own&&!Object.isExtensible(obj)))return;
    const parent=own?null:parentDescriptor(obj,'isPlaying');
    let value;try{value=obj.isPlaying;}catch(_){return;}
    let wrote=false;
    const readNative=()=>{try{
      if(own?.get)return own.get.call(obj);
      if(!own&&parent?.get)return parent.get.call(obj);
    }catch(_){}return value;};
    const writeNative=v=>{wrote=true;value=v;try{
      if(own?.set)own.set.call(obj,v);
      else if(!own&&parent?.set)parent.set.call(obj,v);
    }catch(e){S.lastError=String(e?.message||e);}};
    const get=function(){
      if(this===obj&&forceReady(c)){S.forceAnimationReads++;return false;}
      return readNative();
    };
    const set=function(v){writeNative(v);};
    try{
      Object.defineProperty(obj,'isPlaying',{configurable:true,
        enumerable:own?.enumerable??parent?.enumerable??true,get,set});
      forcedTween={obj,own,parent,get,set,get value(){return value;},get wrote(){return wrote;}};
      S.forceAnimationPatched++;
    }catch(e){S.lastError=String(e?.message||e);}
  }
  function syncForceContext(c){
    const t=c?.target;
    // Force only native PvE monsters, never players (type 4), Road,
    // hidden tabs, UI interaction, recovery or another combat owner.
    const can=false&&S.enabled&&skillPriority==='basic_force_default'&&owner()&&outside()&&beastReady(c)&&(!road()||roadForce()&&roadClose(S.role,c))&&
      W.document?.hidden!==true&&W._Ba?._rJ?._O$?.ins?.isDead!==true&&
      !W.KVPV_BOSS_TEAM?.priority?.()&&
      Date.now()>=Number(W.__KVPV_USER_UI_UNTIL||0)&&
      !W.KVPV_TERRITORY_LOOT?.shouldBlock?.(t)&&
      Number(t?.property?.get?.('type'))===1&&
      c?.isValidTarget?.()===true&&c?.isValidRange?.()===true;
    S.forceCombat=can?c:null;S.forceTarget=can?t:null;
    S.forceScene=can?liveScene():null;S.forceActive=!!can;
    syncForcedTween(c);
  }


  function release(){S.forceActive=false;S.forceCombat=null;S.forceTarget=null;restoreForcedTween();S.rapidPoll=false;releaseRoadCast();releaseRoadSelector();W.KVPV_ROAD_CADENCE?.release?.();if(!S.hooks.length&&S.role===null)return;for(const h of S.hooks.slice().reverse()){

    if(h.obj[h.key]!==h.fn)continue;

    if(h.descriptor)Object.defineProperty(h.obj,h.key,h.descriptor);else delete h.obj[h.key];

  }S.hooks=[];S.role=null;S.basicReady.clear();S.prefer='basic';S.cursor=0;S.basicCursor=0;}

  function hook(obj,key,wrap){const descriptor=Object.getOwnPropertyDescriptor(obj,key);

    if(descriptor&&!descriptor.configurable)throw Error('Cannot hook '+key);

    const fn=wrap(obj[key]);Object.defineProperty(obj,key,{value:fn,writable:true,configurable:true,enumerable:!!descriptor?.enumerable});

    S.hooks.push({obj,key,fn,descriptor});

  }

  function bind(role,selector,combat){

    if(S.role===role){if(S.hooks.every(h=>h.obj[h.key]===h.fn))return true;

      S.reason='another_controller_owns_hooks';return false;}

    release();

    try{

      hook(combat,'isCooldown',native=>function(){
        if(this===combat&&forceReady(combat)){S.forceCooldownReads++;return false;}



        return native.apply(this,arguments);

      });

      hook(selector,'_f7t',native=>function(active,common,mode){

        if(!S.enabled||!outside()||!owner()||!beastReady(combat))return native.apply(this,arguments);

        if(W.KVPV_BOSS_TEAM?.priority?.())return -1;
        if(W.KVPV_TERRITORY_LOOT?.shouldBlock?.(combat.target))return -1;

        if(road()&&mode!==1&&!(mode===2&&W.KVPV_TRANSFORM10?.status?.()?.enabled===true&&W.KVPV_TRANSFORM10?.transformed?.()))return -1;

        if(mode===2&&W.KVPV_TRANSFORM10)return W.KVPV_TRANSFORM10.select(native,this,active,common,mode);

        if(mode!==1)return native.apply(this,arguments);

        if(road()&&!roadClose(role,combat))return -1;

        if(W._Ba?._rJ?._O$?.ins?.isDead===true||combat.isCooldown?.()!==false||combat.isValidTarget?.()!==true||combat.isValidRange?.()!==true||Date.now()-S.lastCast<castGap())return -1;

        const all=[...(Array.isArray(active)?active:[]),...(Array.isArray(common)?common:[])],now=Date.now();



        const pickBasic=()=>{

          const rows=all.filter(r=>basic(r?.[0])&&(skillPriority!=='basic_force_default'||pveBasic(r[0]))&&(!road()||roadForce()||Number(r[0])===8001)).map(row=>{const id=Number(row[0]),copy=row.slice();

            if(!S.basicReady.has(id))S.basicReady.set(id,road()&&!roadForce()?0:Number(row[1])<now?0:now+1);

            if(skillPriority==='basic_force_default'&&(!road()||roadForce())){copy[1]=S.basicReady.get(id);copy[2]=castGap();}return copy;

          }).filter(row=>Number(row[1])<now)

            .sort((a,b)=>(Number(a[0])-8001-S.basicCursor+9)%9-(Number(b[0])-8001-S.basicCursor+9)%9);

          const id=Number(native.call(this,rows,[],mode));if(basic(id))S.basicReady.set(id,now+castGap());return id;

        };

        if(road()||skillPriority==='basic_force_default')return pickBasic();

        const pickTH=()=>{

          const rows=all.filter(r=>tuyetHoc(r?.[0])&&Number.isFinite(Number(r[1]))&&Number(r[1])<now)

            .sort((a,b)=>(Number(a[0])-1001-S.cursor+8)%8-(Number(b[0])-1001-S.cursor+8)%8);

          return Number(native.call(this,rows,[],mode));

        };

        const preferBasic=skillPriority==='interleaved'&&S.prefer==='basic';
        const first=preferBasic?pickBasic:pickTH,second=preferBasic?pickTH:pickBasic;

        const id=first();return basic(id)||tuyetHoc(id)?id:second();

      });

      hook(combat,'combat',native=>function(id){

        if(S.enabled&&outside()&&owner()){

          if(W.KVPV_BOSS_TEAM?.priority?.())return undefined;
          if(W.KVPV_TERRITORY_LOOT?.shouldBlock?.(this.target))return undefined;

          if(road()&&!roadClose(role,combat))return undefined;

          if(road()&&!roadForce()&&Number(id)!==8001&&!(W.KVPV_TRANSFORM10?.status?.()?.enabled===true&&W.KVPV_TRANSFORM10?.transformed?.()&&W.KVPV_TRANSFORM10?.has?.(id))){S.blocked++;return undefined;}

          if(!allowed(Number(id))||(skillPriority==='basic_force_default'&&(!road()||roadForce())&&!pveBasic(id))){S.blocked++;return undefined;}

          if(Date.now()-S.lastCast<castGap()||W._Ba?._rJ?._O$?.ins?.isDead===true||combat.isCooldown?.()!==false||combat.isValidTarget?.()!==true||combat.isValidRange?.()!==true)return undefined;

          S.lastCast=Date.now();S.attempts++;

          if(basic(id)){S.basicAttempts++;S.prefer=road()||skillPriority==='basic_force_default'?'basic':'tuyet_hoc';S.basicCursor=(Number(id)-8001+1)%9;}else if(tuyetHoc(id)){S.tuyetHocAttempts++;S.prefer='basic';S.cursor=(Number(id)-1001+1)%8;}

        }

        return native.apply(this,arguments);

      });

      S.role=role;return true;

    }catch(e){release();throw e;}

  }



  function tick(){try{

    if(S.enabled&&S.timer!==null)schedule(pollInterval());

    const gap=W.KVPV_ACCOUNT_POLICY?.pollingGap?.()??0,now=Date.now();if(gap>0&&now-(S.lastPoll??-Infinity)<gap)return;S.lastPoll=now;

    if(W.KVPV_PEAK_CHEST?.status?.()?.inside===true||W.KVPV_EIGHT_CHEST?.status?.()?.inside===true){release();S.reason='peak_floor9_gather_no_combat';return;}

    if(Number(W._ft?._po?.ins?.getCfgById?.(Number(W._C?._Mn?._Cn?.currentID))?.[7])===69){release();S.reason='quiz_scene_no_combat';return;}

    if(!S.enabled||!owner()||!outside()){release();S.reason=outside()?'disabled_or_actor_changed':'tianquan_yield';return;}

    W.KVPV_TH300?.releaseOutsideScope?.();

    const role=W._C?._Ba?.instance?.getRole?.(Number(actor));

    const selector=role?.getComponent?.(W._d?._Yct?._Eet),combat=role?.getComponent?.(W._d?._Yct?._Het);

    if(!role||typeof selector?._f7t!=='function'||typeof combat?.combat!=='function'){release();S.reason='waiting_components';return;}
    if(Number(combat?.target?.property?.get?.('type'))===4){release();S.reason='player_target_yield_pvp';return;}
    if(!beastReady(combat)){release();S.reason='beast_collect_or_unverified_boss';return;}

    // Road BASIC FORCE: preserve the Road module's approach/target acquisition;
    // only take native combat ownership in verified melee range of a monster.
    if(roadForce()){
      releaseRoadCast();releaseRoadSelector();
      if(W.KVPV_BOSS_TEAM?.priority?.()||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)){
        release();S.reason='road_yield_to_owner_or_ui';return;
      }
      if(W.document?.hidden===true||W._Ba?._rJ?._O$?.ins?.isDead===true){
        release();S.reason='road_paused';return;
      }
      const hp=combat.target?.property?.get?.('hp'),
        lost=combat.isValidTarget?.()!==true||Array.isArray(hp)&&Number(hp[0])<=0;
      if(lost){
        release();
        const user=W._Ba?._rJ?._O$?.ins;
        if(typeof user?.selectTar==='function'&&Date.now()-(S.lastAcquire??-Infinity)>=400){
          S.lastAcquire=Date.now();S.targetSearches++;user.selectTar(1,-1);
        }
        S.reason='road_waiting_native_target';return;
      }
      if(Number(combat.target?.property?.get?.('type'))!==1){
        release();S.reason='road_not_monster';return;
      }
      if(approachRoad(role,combat)){release();return;}
      // Avoid learning false ready times from a forced cooldown observation.
      W.KVPV_ROAD_CADENCE?.observe?.(role,combat);
    }


    if(road()&&!roadForce()){
      S.rapidPoll=false;

      if(W.KVPV_ROAD_CADENCE?.enabled===false){releaseRoadCast();releaseRoadSelector();if(S.hooks.length||S.role!==null)release();S.reason='road_support_disabled';return;}

      if(S.hooks.length||S.role!==null)release();syncRoadCast(combat);syncRoadSelector(selector);W.KVPV_ROAD_CADENCE?.observe?.(role,combat);

      if(W._Ba?._rJ?._O$?.ins?.isDead===true){S.forceActive=false;restoreForcedTween();S.reason='dead';return;}

      if(W.document?.hidden&&W.KVPV_ACCOUNT_POLICY?.config?.pauseWhenHidden===true){S.forceActive=false;restoreForcedTween();S.reason='hidden_tab';return;}

      if(W.KVPV_BOSS_TEAM?.priority?.()||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)){S.reason='road_yield_native';return;}

      const hp=combat.target?.property?.get?.('hp'),lost=combat.isValidTarget?.()!==true||Array.isArray(hp)&&Number(hp[0])<=0;

      if(lost){const user=W._Ba?._rJ?._O$?.ins;if(typeof user?.selectTar==='function'&&Date.now()-(S.lastAcquire??-Infinity)>=400){S.lastAcquire=Date.now();S.targetSearches++;user.selectTar(1,-1);}S.reason='waiting_native_target';return;}

      if(approachRoad(role,combat))return;


      S.reason='road_native_combat';return;

    }

    releaseRoadCast();releaseRoadSelector();if(!bind(role,selector,combat))return;
    syncForceContext(combat);

    W.KVPV_ROAD_CADENCE?.observe?.(role,combat);

    if(W._Ba?._rJ?._O$?.ins?.isDead===true){S.reason='dead';return;}

    if(W.document?.hidden&&W.KVPV_ACCOUNT_POLICY?.config?.pauseWhenHidden===true){S.reason='hidden_tab';return;}

    S.rapidPoll=W.document?.hidden!==true&&combat.isValidTarget?.()===true&&combat.isValidRange?.()===true&&
      W.KVPV_BOSS_TEAM?.priority?.()!==true&&Date.now()>=Number(W.__KVPV_USER_UI_UNTIL||0);
    if(S.timer!==null)schedule(pollInterval());
    if(Date.now()-S.lastCast<castGap())return;

    if(road()&&!W.KVPV_BOSS_TEAM?.priority?.()&&Date.now()>=Number(W.__KVPV_USER_UI_UNTIL||0)){

      const hp=combat.target?.property?.get?.('hp'),lost=combat.isValidTarget?.()!==true||Array.isArray(hp)&&Number(hp[0])<=0;

      const user=W._Ba?._rJ?._O$?.ins;

      if(lost&&typeof user?.selectTar==='function'&&Date.now()-(S.lastAcquire??-Infinity)>=400){S.lastAcquire=Date.now();S.targetSearches++;user.selectTar(1,-1);}

    }

    const targetHp=combat.target?.property?.get?.('hp'),
      lostTarget=combat.isValidTarget?.()!==true||Array.isArray(targetHp)&&Number(targetHp[0])<=0;
    if(lostTarget){
      if(normalMapClear()&&Date.now()>=Number(W.__KVPV_USER_UI_UNTIL||0)&&
         W.document?.hidden!==true&&Date.now()-S.lastNormalMapSearch>=800){
        const user=W._Ba?._rJ?._O$?.ins;
        if(typeof user?.selectTar==='function'){
          S.lastNormalMapSearch=Date.now();S.normalMapSearches++;S.targetSearches++;
          user.selectTar(1,-1);
        }
      }
      S.reason=normalMapClear()?'normal_map_searching_native_monster':'waiting_native_target';return;
    }

    if(approachNormalMap(role,combat))return;

    if(approachRoad(role,combat))return;

    if(combat.isValidRange?.()!==true){S.reason='waiting_native_range';return;}

    if(combat.isCooldown?.()!==false){S.reason='waiting_native_cooldown';return;}

    const id=Number(selector.selectSkill?.());

    if(!allowed(Number(id))||(skillPriority==='basic_force_default'&&!pveBasic(id))){S.reason='waiting_ready_combo';return;}

    combat.combat(id);S.reason=basic(id)?'basic_native_called':'skill_native_called';

  }catch(e){S.lastError=String(e?.message||e);S.reason='error';}}



  function status(){return {enabled:S.enabled,active:S.hooks.length>0&&outside(),intervalMs:S.timerMs,activePollMs:skillPriority==='basic_force_default'?1:4,idlePollMs:16,roadPollMs:100,rapidPoll:S.rapidPoll,skillClientWaitMs:null,combo:road()?'native_combat':skillPriority,skillPriority,nextPreferred:skillPriority==='basic_force_default'?'basic':skillPriority==='interleaved'?S.prefer:'tuyet_hoc',
    defaultBasicForce:{enabled:skillPriority==='basic_force_default',active:S.forceActive,skillIds:[8001,8002,8003,8004,8005],cooldownFalseReturns:S.forceCooldownReads,animationFalseReads:S.forceAnimationReads,animationPatched:S.forceAnimationPatched,animationForced:!!forcedTween,serverCooldownModified:false},basicClientWaitMs:road()?null:castGap(),basicAttempts:S.basicAttempts,tuyetHocAttempts:S.tuyetHocAttempts,

    roadMelee:{active:road(),targetSearches:S.targetSearches,basicOnly:roadForce(),basicSkill:roadForce()?[8001,8002,8003,8004,8005]:null,nativeCooldownBypass:roadForce()&&S.forceActive,aoePriority:false,radius:W.KVPV_ROAD_CADENCE?.approachDistance??80,distance:S.role?roadDistance(S.role,S.role.getComponent?.(W._d?._Yct?._Het)):null,fullBasicRotation:true,nativeCombat:road()},normalMapClear:{eligible:normalMapClear(),targetSearches:S.normalMapSearches,targetType:1,nativeSelection:true,moves:S.normalMapMoves},attempts:S.attempts,blockedSkills:S.blocked,reason:S.reason,lastError:S.lastError,

    note:roadForce()?'Road Trial BASIC FORCE runs only against native in-range monsters; approach and target selection stay native.':'Road native combat stays available when BASIC FORCE is disabled.'};}



  function stop(){S.enabled=false;if(S.timer!=null){(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;}release();S.reason='stopped';return status();}



  function schedule(ms){if(S.timer!==null&&S.timerMs===ms)return;if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);S.timerMs=ms;S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,ms);}

  function start(){S.enabled=true;schedule(pollInterval());tick();return status();}

  function setSkillPriority(value='tuyet_hoc_first'){
    if(!['basic_force_default','tuyet_hoc_first','interleaved'].includes(value))throw Error('Skill priority must be basic_force_default, tuyet_hoc_first or interleaved');
    if(value!==skillPriority){S.forceActive=false;restoreForcedTween();S.basicReady.clear();S.basicCursor=0;}skillPriority=value;return status();
  }
  W.KVPV_BASIC10=Object.freeze({start,stop,status,release,sync:tick,setSkillPriority,isForceActive:()=>S.forceActive&&roadForce()});start();

})();

/* KVPV_SKILL_SOURCE_END 12-basic-outside.js */
}

function __KVPV_SKILL_SOURCE_13_transform_skills_js() {
/* KVPV_SKILL_SOURCE_BEGIN 13-transform-skills.js */

/* Native transformation skills: use native selection, timing and animation. */

(() => {

  'use strict';

  const W=window,actor=String(W.__KVPV_OWN_ACTOR_ID||''),old=W.KVPV_TRANSFORM10,carry=old?._handoff?.();old?.stop?.();let activation=carry?.actor===actor?carry.activation:null,activationReason='waiting_native_combat';
  let chargedConsumed=carry?.actor===actor&&carry?.chargedConsumed===true,
    lastRequestAt=carry?.actor===actor?(carry?.lastRequestAt??-Infinity):-Infinity,
    nativeRequests=carry?.actor===actor?(carry?.nativeRequests||0):0;

  const kits=Object.freeze({

    'U Tuyền Huyết Ma':['Huyết Ma Đại Pháp','Huyết Ngục Quỷ Thủ','Huyết Khế Tổ Chú','Huyết Ma Hình Phạt'],

    'Minh Hà Long Vương':['Ma Long Quyết','Minh Hà Long Trảm','Huyết Lục Trảm','Ma Long Nghịch Lân']

  });

  const names=Object.values(kits).flat();

  const normalize=s=>String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/Đ/g,'D').toLowerCase().replace(/[^a-z0-9]/g,'');

  const wanted=names.map(normalize),ready=new Map();let enabled=true,cursor=0,selections=0,lastError='',timer=null,lastForm='';

  const transformed=()=>String(W._Ba?._rJ?._O$?.ins?.actorId??'')===actor&&!W.__KVPV_UNIVERSAL_HALTED&&Number(W._Ba?._s3?._ZJ?.ins?.curShowId)>0;
  const basicOnlyCombat=()=>{
    const far=W.KVPV_FAR_SCOPE?.status?.();
    if(['THIEN_QUAN','LINH_LUNG','PHU_VAN','TRU_TIEN'].includes(far?.kind)||
       far?.inside===true&&W.KVPV_TH300?.isBasicOnly?.()===true)return true;
    try{const s=W.KVPV_TRUTIEN_PVP?.status?.();if(s?.enabled===true&&s?.inside===true)return true;}catch(_){}
    try{const s=W.KVPV_DINH_CAO_BASIC_COMBO?.status?.();if(s?.enabled===true&&s?.inside===true&&s?.scope==='TRANH_BA_DINH_CAO')return true;}catch(_){}
    return false;
  };
  const skillCoordinators=()=>{
    const modules=[W.KVPV_KIEM_KHIEU_BASIC,W.KVPV_TULA_PVP,W.KVPV_STRONGEST_PVP,
      W.KVPV_TIENMA_PVP,W.KVPV_TRANH_BA_TU_PHUONG],active=[];
    for(const module of modules){try{const s=module?.status?.();if(s?.enabled===true&&s?.inside===true)active.push(s);}catch(_){}}
    return active;
  };
  const coordinatedPvp=()=>skillCoordinators()[0]??null;


  function skills(){if(!transformed())return [];try{



    const form=String(W._Ba._s3._ZJ.ins.curShowId);

    if(form!==lastForm){lastForm=form;ready.clear();cursor=0;}



    const model=W._Ba._s3._ZJ.ins.getTransformingSkills?.();

    return [...(model?.skills||[]),...(model?.comSkills||[])].map(row=>{

      const id=Number(row?.[0]);const cfg=W._ft?._nY?.ins?.getCfgBySkillIdAndLv?.(id,1)??W._ft?._nY?.ins?.getCfgById?.(id*10000+1);

      return {id,name:String(cfg?.[2]||''),row};

    }).filter(x=>Number.isSafeInteger(x.id)&&x.id>0);

  }catch(e){lastError=String(e);return [];}}

  const has=id=>skills().some(x=>x.id===Number(id));


  // Do not rewrite timestamps, cooldown duration, or skill order.
  function select(native,selector,active,common,mode){
    if(typeof native!=='function')return -1;
    const id=native.call(selector,active,common,mode);
    if(enabled&&mode===2&&transformed()&&Number(id)>0)selections++;
    return id;
  }

  function cast(combat,id,...args){
    const native=combat?.combat;if(typeof native!=='function')return false;
    return native.apply(combat,[id,...args]);
  }


  function activate(){try{

      if(String(W._Ba?._rJ?._O$?.ins?.actorId??'')!==actor||W.__KVPV_UNIVERSAL_HALTED||!enabled)return;

      if(basicOnlyCombat()){activationReason='player_basic8001_only';return;}

      const m=W._Ba?._s3?._ZJ?.ins;if(transformed()||m?.isTransforming?.()===true){activation=null;chargedConsumed=true;activationReason='native_form_active';return;}

      const energyNeed=Number(W._ft?._gY?.ins?.getCfgById?.(92001)?.[2]?.[0]);
      const energyNow=Number(m?.curStrength);
      if(Number.isFinite(energyNeed)&&energyNeed>0&&Number.isFinite(energyNow)&&energyNow<energyNeed){
        // A new charge cycle unlocks the next native attempt.
        activation=null;chargedConsumed=false;
      }
      if(activation){
        if(Date.now()-activation.at>15000){activationReason='native_ack_timeout_no_retry_until_recharge';return;}
        activationReason=m?.sendTrans===true?'waiting_native_ack_no_retry':'native_ack_settling_no_retry';return;
      }
      if(chargedConsumed){activationReason='already_requested_this_charge';return;}

      const who=W._Ba?._rJ?._O$?.ins,role=W._C?._Ba?.instance?.getRole?.(Number(actor)),combat=role?.getComponent?.(W._d?._Yct?._Het),id=Number(W._C?._Mn?._Cn?.currentID),type=Number(W._ft?._po?.ins?.getCfgById?.(id)?.[7]),pvp=coordinatedPvp();

      const roadBoss=type===41&&W._Ba?._cm?._q3t?.ins?.getHasTeamByType?.(1)===true&&
        Number(combat?.target?.property?.get?.('type'))===1&&combat?.isValidRange?.()===true;
      if((([69].includes(type)||(!roadBoss&&W.KVPV_DAILY?.quickState?.()?.running!==true))&&!pvp)||([14,71].includes(type)&&Number(W._Ba?._$a?._yo?.ins?.intoSce?.[3])===9)||who?.isDead!==false||combat?.isValidTarget?.()!==true||combat?.isCooldown?.()!==false||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)||W.KVPV_BOSS_TEAM?.priority?.()===true){activationReason='waiting_native_combat';return;}
      if(pvp&&(Number(combat?.target?.property?.get?.('type'))!==4||combat?.target?.isValid===false||combat?.isValidRange?.()!==true)){activationReason='waiting_coordinated_pvp_target';return;}

      if(W._d?._Yct?._uft?.isFlying===true||role?.getComponent?.(W._d?._Yct?._oft)?.running?.()===true){activationReason='waiting_native_movement';return;}

      const need=Number(W._ft?._gY?.ins?.getCfgById?.(92001)?.[2]?.[0]),strength=Number(m?.curStrength),form=Number(m?.curFightShowId);

      if(!Number.isFinite(need)||need<=0||!Number.isFinite(strength)||strength<need||!Number.isSafeInteger(form)||form<=0||!m?.huanhuaList?.()?.[form]||m?.sendTrans||W._Ba?._Do?._Ho?.inst?.getFcIsOpen?.(327)!==true){activationReason='waiting_owned_form_and_free_strength';return;}

      const rpc=W._Ba?._s3?._Kyt?.ins;if(typeof rpc?.Transforming!=='function')return;

      if(Date.now()-lastRequestAt<3000){activationReason='local_native_retry_guard';return;}
      lastRequestAt=Date.now();nativeRequests++;
      // Only call the original FREE-strength native button, never buy strength or use KNB.
      try{
        rpc.Transforming();
        if(m?.sendTrans===true){
          activation={at:lastRequestAt,form,strength};chargedConsumed=true;
          activationReason='native_transform_requested';
        }else activationReason='native_locally_blocked_retry_after_3s';
      }catch(e){
        // The RPC may have dispatched before throwing: do not resend on the same charge.
        chargedConsumed=true;activation={at:lastRequestAt,form,strength};
        lastError=String(e?.message||e);activationReason='native_error_no_retry';
      }

    }catch(e){lastError=String(e.message||e);activationReason='error_no_retry';}}

  function schedule(){const every=W.KVPV_V1?.timers?.setInterval??W.setInterval;

    if(timer==null&&typeof every==='function')timer=every(()=>{

      activate();

      if(enabled&&transformed()&&(W.KVPV_FAR_SCOPE??W.KVPV_TQ_SCOPE)?.inside?.()===true&&W.KVPV_TH300?.status?.(false)?.running)W.KVPV_TH300.sync();

    },100);

  }

  W.KVPV_TRANSFORM10=Object.freeze({has,skills:()=>skills().map(({id,name})=>({id,name})),select,cast,transformed,

    _handoff:()=>({actor,activation,chargedConsumed,lastRequestAt,nativeRequests}),start(){enabled=true;schedule();return this.status();},stop(){enabled=false;ready.clear();if(timer!=null){(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(timer);timer=null;}return this.status();},

    status(){return {enabled,activation,activationReason,chargedConsumed,nativeRequests,lastRequestAt,nativeKitOnly:true,transformed:transformed(),clientCooldownMs:null,selections,skillSource:'current_native_model',matchedSkills:this.skills(),skillCoordinators:skillCoordinators().map(s=>s.mode||s.scope||'pvp'),visual:{factor:null,calls:0,applied:0,unavailable:0,visualOnly:false,nativeSpeedPreserved:true},lastError,
      note:'Uses the game native transformation skill selection, cooldown, range and animation speed. No client-side skill-speed override or purchases.'};}});

  schedule();

})();

/* KVPV_SKILL_SOURCE_END 13-transform-skills.js */
}

function __KVPV_SKILL_SOURCE_23_beast_island_js() {
/* KVPV_SKILL_SOURCE_BEGIN 23-beast-island.js */








(() => {

  'use strict';

  const W=window,carry=W.KVPV_BEAST_ISLAND?._handoff?.();W.KVPV_BEAST_ISLAND?.stop?.();

  const actor=String(W.__KVPV_OWN_ACTOR_ID||'');

  const tag='beast-island-2';

  const limits=Object.freeze({phoenix:20,dragon:2,boss:3});

  const mainActor=actor==='10228867268946',cloneActor=actor==='10228867268941';

  const bossOrder=mainActor?[800,850,900]:cloneActor?[700,750,750]:[750,750,750];

  const infiniteKey='KVPV_BEAST_INFINITE_DONE_'+actor;

  const dayKey=()=>W.KVPV_DAILY_CLOCK?.key?.()||new Date(Date.now()+2*3600000).toISOString().slice(0,10);

  const bossLayer=()=>bossLevel===500?1:2;

  let bossLevel=bossOrder[0],manualBossLevel=null;

  try{const saved=Number(W.localStorage?.getItem('KVPV_BEAST_BOSS_OVERRIDE_'+actor));if([500,700,750,800,850,900].includes(saved))manualBossLevel=saved;}catch(_){}

  if(carry?.actor===actor&&Number.isFinite(carry.manualBossLevel))manualBossLevel=carry.manualBossLevel;

  const S={enabled:true,timer:null,lease:false,phase:'WAITING',reason:'starting',lastError:'',

    lastRefresh:-Infinity,lastEntry:-Infinity,lastAction:-Infinity,idleSince:null,action:'',bossCombatOcc:null,stageAuto:null,hooks:[],bossTrialAt:0,bossQuotaSeen:null,bossFailures:0,bossCandidates:[],manualInside:false,
    infinite:{witnessed:{},defeated:{},diedAt:{},selected:null,lastSelectAt:0,donePending:false}};

  if(carry?.actor===actor&&Number.isFinite(carry.lastEntry))S.lastEntry=carry.lastEntry;

  if(carry?.actor===actor&&carry.infinite&&typeof carry.infinite==='object')S.infinite=carry.infinite;

  const model=()=>W._Ba?._dP?._P5t?.ins, cfg=()=>W._ft?._gci?.ins;

  const user=()=>W._Ba?._rJ?._O$?.ins, rpc=()=>W._Ba?._sst?._Cht?.inst;

  const arb=()=>W.KVPV?.core?.scene;

  const owned=()=>!!actor&&actor===String(user()?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;

  const norm=x=>String(x||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();

  function snapshot(){

    const m=model(),c=cfg(),rows=c?.getMABosss?.(2)||[];

    const map=Number(W._C?._Mn?._Cn?.currentID??W._Ba?._$a?._yo?.ins?.intoSce?.[0]);

    const type=Number(W._ft?._po?.ins?.getCfgById?.(map)?.[7]??W._Ba?._$a?.SceneUtil?.curScene);

    const bossRows=[...(c?.getMABosss?.(1)||[]),...rows];

    const candidates=bossRows.filter(r=>Number(r?.[3])===1).map(row=>({
      row,level:Number(W._ft?._tY?.ins?.getCfgById?.(row[4])?.[6])
    })).filter(x=>Number.isFinite(x.level)&&x.level>0).sort((a,b)=>a.level-b.level);
    S.bossCandidates=[...new Set(candidates.map(x=>x.level))];
    const pool=candidates.filter(x=>Number(x.row[1])===bossLayer());
    const used=Number(m?.getMACurPsNum?.())||0;
    const wanted=manualBossLevel??bossOrder[Math.min(used,bossOrder.length-1)];
    const preferred=pool.find(x=>x.level===wanted)||pool.find(x=>x.level>wanted)||pool[0];
    const boss=preferred?.row;
    if(preferred)bossLevel=preferred.level;

    // Scene ID and native configured map IDs are authoritative even if
    // the floor model has not synchronized after a manual teleport.
    const inside=type===49&&bossRows.some(r=>Number(r?.[0])===map&&[1,2].includes(Number(r?.[1])));

    const nodes=rows.filter(r=>r[3]===2);

    const phoenix=nodes.find(r=>norm(W._ft?._Xpt?.ins?.getCfgById?.(r[4])?.[4]).includes('phuong huyet'));

    const dragon=nodes.find(r=>Number(r[4])===Number(m?.dragonOcc));

    const known=Array.isArray(m?._c_a)&&Number.isFinite(Number(m._c_a[0]))&&Array.isArray(m._c_a[1]);

    const quota=(row,cap,kind)=>{

      const used=known&&row?Number(kind===1?m?.getMACurPsNum?.():m?.getNpcCollectionNum?.(row[4])):NaN;

      const max=row?Number(kind===1?m?.getMAMaxPsNum?.():m?.getNpcCollectionMaxNum?.(row[4])):NaN;

      const valid=known&&!!row&&Number.isFinite(used)&&used>=0&&Number.isFinite(max)&&max>0;

      return {row,used,max,limit:Math.min(cap,max),remaining:valid?Math.max(0,Math.min(cap,max)-used):null};

    };

    return {map,type,inside,known,phoenix:quota(phoenix,limits.phoenix,2),dragon:quota(dragon,limits.dragon,2),boss:quota(boss,limits.boss,1)};

  }





  function infiniteData(){

    const m=model(),c=cfg(),rows=m?.getSingleBossInfoArr?.()||[],tab=c?.getTabs?.().find(x=>Number(x.type)===48);

    const map=Number(W._C?._Mn?._Cn?.currentID??W._Ba?._$a?._yo?.ins?.intoSce?.[0]);

    const type=Number(W._ft?._po?.ins?.getCfgById?.(map)?.[7]??W._Ba?._$a?.SceneUtil?.curScene);

    const all=Array.isArray(rows)?rows.map(x=>({area:x?.[0],id:x?.[1],rawState:x?.[2]})).filter(x=>x.area!=null&&x.id!=null):[];

    const inside=type===48||Number(W._Ba?._$a?.SceneUtil?.curScene)===48;

    return {m,c,tab,all,map,inside,valid:all.length===3&&new Set(all.map(x=>String(x.area))).size===3};

  }

  function infiniteDoneToday(){try{return W.localStorage?.getItem(infiniteKey)===dayKey();}catch(_){return false;}}

  function completeInfinite(){

    S.infinite.donePending=true;S.reason='three_infinite_bosses_dead_waiting_exit';

    if(S.phase!=='EXITING')exit('infinite_three_bosses_dead');

  }

  function handleInfinite(now){

    const q=infiniteData(),state=S.infinite;

    if(!q.m||!q.c)return false;

    if(W.KVPV_DAILY?.quickState?.()?.job==='thanthu')W.KVPV_DAILY?.delegateThanThu?.();

    if(!q.inside&&state.donePending){

      if(W._Ba?._$a?.SceneUtil?.isCommonScene===true){

        try{W.localStorage?.setItem(infiniteKey,dayKey());}catch(_){ }

        state.donePending=false;release();S.phase='WAITING';S.reason='infinite_complete_server_exit_confirmed';

      }

      return true;

    }

    if(q.inside){

      if(!q.valid){S.reason='infinite_waiting_three_boss_rows';return true;}

      if(S.phase==='ENTERING'||S.phase==='WAITING')S.phase='ACTIVE';

      if(!S.lease&&!reserve()){S.reason='infinite_scene_reserved';return true;}

      if(arb()?.renew?.('combat')!==true){release();S.reason='infinite_lease_lost';return true;}

      const byArea=new Map(q.all.map(x=>[String(x.area),x]));

      for(const b of q.all){const key=String(b.area),row=byArea.get(key),raw=Number(row?.rawState);

        if(raw===0){state.witnessed[key]=true;delete state.diedAt[key];}

        else if(Number.isFinite(raw)&&raw>0&&state.witnessed[key]&&!state.defeated[key]){

          if(!state.diedAt[key])state.diedAt[key]=now;

          if(now-state.diedAt[key]>=5000){state.defeated[key]=true;delete state.diedAt[key];}

        }

      }

      if(Object.keys(state.defeated).length>=3){completeInfinite();return true;}

      const next=q.all.find(b=>!state.defeated[String(b.area)]&&Number(byArea.get(String(b.area))?.rawState)===0);

      if(next&&typeof q.m.setTarget==='function'&&(state.selected!==next.id||now-state.lastSelectAt>=15000)){

        q.m.setTarget(next.id,1,48);state.selected=next.id;state.lastSelectAt=now;

      }

      S.reason='infinite_bosses_'+Object.keys(state.defeated).length+'_of_3';

      return true;

    }

    if(infiniteDoneToday())return false;

    if(W.KVPV_RED_DOT?.isActive?.(561)!==true)return false;

    const job=W.KVPV_DAILY?.quickState?.()?.job;

    if(W._Ba?._$a?.SceneUtil?.isCommonScene!==true||job&&!['rảnh','ranh'].includes(job)||W.KVPV_RED_DOT_MODULE?.blocksProgression?.()===true){

      S.reason=W.KVPV_RED_DOT_MODULE?.blocksProgression?.()===true?'infinite_waiting_red_dot_priority':'infinite_waiting_safe_common_scene';return true;

    }

    if(!q.valid||!q.tab){S.reason='infinite_waiting_native_config';return true;}

    const live=q.all.find(x=>q.m.getSingleLiveAndFollow?.(x.area)&&Number(q.c.getSingleInfo?.(x.id)?.[0])>0);

    if(!live){S.reason='infinite_waiting_followed_live_boss';return true;}

    if(typeof rpc()?.rqEtScene!=='function'||!reserve()){S.reason='infinite_scene_reserved';return true;}

    state.witnessed=Object.fromEntries(q.all.map(x=>[String(x.area),Number(x.rawState)===0]));

    state.defeated={};state.diedAt={};state.selected=live.id;state.lastSelectAt=now;state.donePending=false;

    q.m.setTempTargetOcc?.(live.id,1);S.phase='ENTERING';S.lastEntry=now;

    rpc().rqEtScene(Number(q.c.getSingleInfo(live.id)[0]),Number(q.tab.lv)||0);

    S.reason='infinite_entry_requested';return true;

  }

  function hook(key,filter){const m=model(),original=m?.[key];if(typeof original!=='function')return;

    const wrapped=function(...args){if(S.lease&&!filter(...args))return false;return original.apply(this,args);};

    m[key]=wrapped;S.hooks.push({m,key,original,wrapped});}

  function installGuards(){if(S.hooks.length)return;

    hook('MASequenceAutoFight',()=>false);

    hook('setNpcMovePoint',(point,occ)=>{if(point===null)return true;const d=snapshot();

      return d.inside&&[d.phoenix,d.dragon].some(q=>q.remaining>0&&Number(q.row?.[0])===d.map&&Number(q.row?.[4])===Number(occ));});

    hook('setTarget',(occ,kind,scene)=>{if(scene!==49)return true;const d=snapshot();

      if(!d.inside)return false;

      return kind===1?d.boss.remaining>0&&Number(d.boss.row?.[0])===d.map&&Number(occ)===Number(d.boss.row?.[4]):

        kind===3&&[d.phoenix,d.dragon].some(q=>q.remaining>0&&Number(q.row?.[0])===d.map&&Number(q.row?.[4])===Number(occ));});

  }

  function release(){if(S.lease&&arb()?.status?.().tag===tag)arb()?.release?.('combat');S.lease=false;

    const stage=W._Ba?._Co?._Mo?.ins;if(owned()&&S.stageAuto===true&&stage?.auto===false&&!W.KVPV_EVENT_PRIORITY?.hold?.())stage.auto=true;

    S.stageAuto=null;S.action='';S.bossCombatOcc=null;S.idleSince=null;

    for(const h of S.hooks)if(h.m[h.key]===h.wrapped)h.m[h.key]=h.original;S.hooks=[];}

  function reserve(){const a=arb(),l=a?.status?.();

    if(!a||l?.owner&&l.tag!==tag||W.KVPV_HITRUN1?.status?.(false)?.running)return false;

    const stage=W._Ba?._Co?._Mo?.ins;

    if(S.stageAuto===null)S.stageAuto=stage?.auto===true;if(stage?.auto===true)stage.auto=false;

    if(a.acquire('combat',tag)!==true){release();return false;}S.lease=true;installGuards();return true;}

  function refresh(){if(Date.now()-S.lastRefresh<30000)return;S.lastRefresh=Date.now();

    const n=W._Ba?._dP?._l0n?.ins;n?.GetMythicalAnimalCopyInfo?.();n?.GetMythicalAnimalNpcRefreshInfo?.();}

  function exit(reason){S.reason=reason;S.phase='EXITING';S.lastEntry=Date.now();rpc()?.rqEtScene?.(0);}

  function tick(){if(W.KVPV_ENTRY_POLICY?.manual===true)return;S.bossCombatOcc=null;try{

    if(W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true){S.reason='priority_agree_popup';return;}

    if(!S.enabled||!owned()){stop();return;}

    const d=snapshot(),now=Date.now();refresh();
    if(handleInfinite(now))return;
    if(d.inside&&!S.lease&&S.phase!=='ENTERING')S.manualInside=true;
    if(!d.inside)S.manualInside=false;
    if(d.known&&d.boss.remaining!==null){
      const count=d.boss.used;
      if(S.bossQuotaSeen===null)S.bossQuotaSeen=count;
      if(count>S.bossQuotaSeen){
        S.bossQuotaSeen=count;S.bossFailures=0;S.bossTrialAt=0;
        S.lastRefresh=-Infinity;refresh();
      }else if(count<S.bossQuotaSeen){
        S.bossQuotaSeen=count;S.bossFailures=0;S.bossTrialAt=0;
      }
      if(d.inside&&d.boss.remaining>0&&S.phase==='ACTIVE'&&S.action.startsWith('1/')){
        if(S.bossTrialAt===0)S.bossTrialAt=now;
        if((user()?.isDead===true&&now-S.bossTrialAt>10000)||now-S.bossTrialAt>90000){
          S.bossFailures++;S.bossTrialAt=now;
          if(S.bossFailures>=3){
            S.manualInside=false;
            exit('boss_stall_max_retries');
            return;
          }
        }
      }else if(!d.inside)S.bossTrialAt=0;
    }

    if(!d.inside&&S.phase==='EXITING'){
      release();S.phase='WAITING';
    }
    if(!d.inside&&S.lease){

      if(S.phase==='ENTERING'&&now-S.lastEntry<25000){arb()?.renew?.('combat');return;}

      release();S.phase='WAITING';

    }
    if(!d.inside&&W.KVPV_RED_DOT_MODULE?.blocksProgression?.()){S.reason='red_dot_first_then_native_stage';return;}

    if(!d.known||[d.phoenix,d.dragon,d.boss].some(q=>q.remaining===null)){

      S.reason='waiting_native_config_and_server_quotas';return;

    }

    const collections=[d.phoenix,d.dragon].filter(q=>q.remaining>0);
    // Main account: only a server-confirmed 3/3 boss quota completes this objective.
    // Exit once, then release the scene so the remaining Daily queue can proceed.
    if(actor==='10228867268946'&&d.boss.used>=3&&d.boss.remaining===0&&collections.length===0){
      if(d.inside){
        S.manualInside=false;
        if(S.phase!=='EXITING')exit('three_server_confirmed_boss_kills');
        else S.reason='waiting_exit_confirmation';
      }else{
        if(S.lease)release();
        S.phase='DONE';S.reason='three_server_confirmed_boss_kills_daily_continue';
      }
      return;
    }



    const todo=(bossLevel===500&&collections.length?collections:[d.phoenix,d.dragon,d.boss]).filter(q=>q.remaining>0);

    if(!d.inside){

      if(W.KVPV_QUEST_PRIORITY?.blocks?.('beast_island')){S.reason='priority_quest';release();return;}

      if(!todo.length){S.phase='DONE';S.reason='server_daily_quotas_completed';return;}

      if(now-S.lastEntry<60000){S.reason='entry_backoff';return;}

      const job=W.KVPV_DAILY?.quickState?.()?.job;

      if(job&&job!=='rảnh'&&job!=='ranh'||W._Ba?._$a?.SceneUtil?.isCommonScene!==true){S.reason='other_activity';return;}

            const next=todo.find(q=>model()?.getMABossIsLive?.(q.row[4],q===d.boss?1:2,q.row[1])===true);

      if(!next){S.reason='waiting_respawn';return;}

      const tab=cfg()?.getTabs?.().find(r=>r.type===49&&Number(r.lv)===Number(next.row[1]));

      if(!tab||W._Ba?._Do?._Ho?.inst?.getFcIsOpen?.(tab.actionOpenId)!==true){S.reason='target_layer_locked';return;}

      if(typeof rpc()?.rqEtScene!=='function'||!reserve()){S.reason='scene_reserved';return;}

      S.phase='ENTERING';S.lastEntry=now;

      model().setTempTargetOcc(next.row[4],next===d.boss?1:3);rpc().rqEtScene(next.row[0],next.row[1]);return;

    }

    if(S.phase==='EXITING'){S.reason='waiting_exit_confirmation';return;}

    if(!S.lease&&!reserve()){S.reason='scene_reserved';return;}

    if(arb()?.renew?.('combat')!==true){release();S.reason='lease_lost';return;}

    S.phase='ACTIVE';

    if(!todo.length){if(S.manualInside){S.reason='manual_floor2_complete_no_auto_exit';return;}exit('daily_quotas_completed');return;}

    if(user()?.isDead===true){S.reason='waiting_native_revive';return;}

    if(W._Ba?._K_t?._Z7t?.ins?.gathering){S.reason='native_gathering';return;}

    const m=model();

    const next=todo.find(q=>Number(q.row[0])===d.map&&m.getMABossIsLive?.(q.row[4],q===d.boss?1:2,q.row[1])===true);

    if(!next){if(todo.every(q=>Number(q.row[0])!==d.map)){if(S.manualInside){S.reason='manual_floor2_keep_scene';return;}exit('switch_to_target_layer');return;}S.reason='waiting_respawn';S.idleSince??=now;const dragonPending=d.dragon.remaining>0&&Number(d.dragon.row?.[0])===d.map;if(dragonPending&&now-S.idleSince>60000){S.manualInside=false;exit('long_phach_wait_over_60s');return;}if(now-S.idleSince>45000&&!S.manualInside)exit('respawn_wait_release_map');return;}

    S.idleSince=null;

    const occ=next.row[4];

    const kind=next===d.boss?1:3;
    if(kind===3&&next===d.dragon){S.dragonTrialAt??=now;if(now-S.dragonTrialAt>60000){S.manualInside=false;exit('long_phach_wait_over_60s');return;}}
    else S.dragonTrialAt=0;

    const key=kind+'/'+occ+'/'+next.used;



    const target=user()?.selectTarget;

    if(S.action===key&&(now-S.lastAction<8000||m.getMovePoint?.()||target?.isValid===true)){

      S.bossCombatOcc=kind===1?Number(occ):null;
      S.reason=kind===1?'native_boss_'+bossLevel:'native_collect_path';return;

    }

    if(kind===3){

      let point=m.getNpcPos?.(occ);const nc=cfg()?.getNpcInfo?.(occ);

      if(!point&&nc?.[5]===1&&Array.isArray(nc[4])&&W.Laya?.Point)point=new W.Laya.Point(nc[4][0],nc[4][1]);

      if(!point){S.reason='waiting_crystal_position';return;}

      m.setNpcMovePoint(point,occ);

    }else m.setTarget(occ,1,49);

    S.action=key;S.bossCombatOcc=kind===1?Number(occ):null;S.lastAction=now;S.reason=kind===1?'native_boss_'+bossLevel:'native_collect_path';

  }catch(e){S.lastError=String(e?.message||e);S.reason='error';}}



  function setBossLevel(level){

    level=Number(level);

    if(![500,700,750,800,850,900].includes(level))throw Error('Boss level: 500, 700, 750, 800, 850, or 900');

    bossLevel=level;manualBossLevel=level;

    S.action='';

    try{W.localStorage?.setItem('KVPV_BEAST_BOSS_OVERRIDE_'+actor,String(level));}catch(_){}

    return status();

  }



  function basicCombatReady(target){
    if(!owned()||!S.enabled||!S.lease||S.phase!=='ACTIVE'||S.bossCombatOcc===null||
       user()?.isDead===true||W._Ba?._K_t?._Z7t?.ins?.gathering===true||
       arb()?.status?.()?.tag!==tag||!target||target.isValid===false)return false;
    const occ=Number(target.property?.get?.('occ'));
    if(occ!==S.bossCombatOcc||Number(target.property?.get?.('type'))!==1)return false;
    const hp=target.property?.get?.('hp');if(Array.isArray(hp)&&Number(hp[0])<=0)return false;
    const map=Number(W._C?._Mn?._Cn?.currentID??W._Ba?._$a?._yo?.ins?.intoSce?.[0]);
    return Number(W._ft?._po?.ins?.getCfgById?.(map)?.[7])===49;
  }
  const B={guard:null,casts:0,moves:0,distance:null,reason:'waiting_boss',filtered:0,lastMove:0,lastMainTick:0};
  const component=(role,key)=>{const id=W._d?._Yct?.[key];return id?role?.getComponent?.(id):null;};
  const rolePos=r=>{const p=r?.property?.get?.('position');return Number.isFinite(Number(p?.x))&&Number.isFinite(Number(p?.y))?{x:Number(p.x),y:Number(p.y)}:null;};
  function releaseBasicGuard(){const g=B.guard;if(!g)return;try{if(g.combat.combat===g.wrap){if(g.descriptor)Object.defineProperty(g.combat,'combat',g.descriptor);else delete g.combat.combat;}}catch(e){S.lastError=String(e?.message||e);}B.guard=null;}
  function installBasicGuard(c){
    if(B.guard?.combat===c&&c.combat===B.guard.wrap)return true;
    releaseBasicGuard();if(typeof c?.combat!=='function')return false;
    const original=c.combat,descriptor=Object.getOwnPropertyDescriptor(c,'combat');
    if(descriptor&&descriptor.configurable===false)return false;
    const wrap=function(skill,...args){if(S.enabled&&owned()&&S.lease&&S.phase==='ACTIVE'&&S.bossCombatOcc!==null&&Number(skill)!==8001){B.filtered++;return;}return original.call(this,skill,...args);};
    try{Object.defineProperty(c,'combat',{configurable:true,writable:true,enumerable:descriptor?.enumerable??false,value:wrap});B.guard={combat:c,wrap,descriptor};return true;}catch(e){S.lastError=String(e?.message||e);return false;}
  }
  function basicBossTick(){
    try{
      if(!owned()||!S.enabled||!S.lease||S.phase!=='ACTIVE'||S.bossCombatOcc===null){releaseBasicGuard();B.reason='boss_not_active';return;}
      const target=user()?.selectTarget,role=W._C?._Ba?.instance?.getRole?.(Number(actor)),combat=component(role,'_Het'),selector=component(role,'_Eet'),mover=component(role,'_zet');
      if(!basicCombatReady(target)||combat?.target!==target){B.reason='waiting_native_boss_target';return;}
      if(!installBasicGuard(combat)){B.reason='basic_guard_unavailable';return;}
      const a=rolePos(role),b=rolePos(target);if(!a||!b){B.reason='waiting_position';return;}
      const d=Math.hypot(a.x-b.x,a.y-b.y);B.distance=Math.round(d*100)/100;
      if(d<1){B.reason='invalid_distance';return;}
      if(Math.abs(d-310)>5){
        if(typeof mover?.moveTo==='function'&&Date.now()-B.lastMove>=800&&mover.running?.()!==true){mover.moveTo(b.x+(a.x-b.x)*310/d,b.y+(a.y-b.y)*310/d);B.moves++;B.lastMove=Date.now();}
        B.reason='moving_to_310';return;
      }
      if(combat.isCooldown?.()!==false){B.reason='native_cooldown';return;}
      if(combat.isValidTarget?.()!==true||combat.isValidRange?.()!==true){B.reason='native_range';return;}
      const now=Date.now(),rows=[...(Array.isArray(selector?._rtt)?selector._rtt:[]),...(Array.isArray(selector?._wet)?selector._wet:[])].filter(x=>Number(x?.[0])===8001&&Number(x?.[1])<now);
      if(!rows.length||typeof selector?._f7t!=='function'){B.reason='waiting_basic_8001';return;}
      if(Number(selector._f7t(rows,[],1))!==8001||combat.target!==target||!basicCombatReady(target)){B.reason='selector_changed';return;}
      combat.combat(8001);B.casts++;B.reason='cast_8001';
    }catch(e){S.lastError=String(e?.message||e);B.reason='error';}
  }
  function status(){

    return {

      enabled:S.enabled,

      phase:S.phase,

      reason:S.reason,

      collectionLayer:2,

      bossLevel,
      bossSelection:manualBossLevel!==null?'manual_override':mainActor?'main_800_850_900_by_ack':cloneActor?'clone_700_750_750_by_ack':'default_750',
      bossOrder:bossOrder.slice(),infiniteFirst:true,infiniteDoneToday:infiniteDoneToday(),infiniteProgress:Object.keys(S.infinite.defeated||{}).length+'/3',
      availableBossLevels:[...S.bossCandidates],bossFailures:S.bossFailures,

      bossLayer:bossLayer(),manualInside:S.manualInside,

      quota:snapshot(),

      lastError:S.lastError,

      allowKNB:false,
      basicCombat:{enabled:true,active:S.bossCombatOcc!==null&&S.lease,skillIds:[8001],goal:310,pollMs:1,casts:B.casts,moves:B.moves,distance:B.distance,reason:B.reason,filteredNon8001:B.filtered}

    };

  }



  function stop(){

    S.enabled=false;

    if(S.timer!==null){

      (W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);

      S.timer=null;

    }

    release();releaseBasicGuard();

    S.phase='OFF';

  }



  function start(){

    if(S.timer!==null)return;

    S.enabled=true;

    const schedule=W.KVPV_V1?.timers?.setInterval??W.setInterval;
    if(typeof W.setInterval==='function'&&typeof schedule==='function')S.timer=schedule(()=>{basicBossTick();const now=Date.now();if(now-B.lastMainTick>=1000){B.lastMainTick=now;tick();}},1);
    else S.timer=schedule(tick,1000);

    tick();

  }



  W.KVPV_BEAST_ISLAND=Object.freeze({

    start,

    stop,

    sync:tick,
    basicCombatReady,

    setBossLevel,
    handlesInfinite:()=>true,

    status,

    _handoff:()=>({actor,bossLevel,manualBossLevel,lastEntry:S.lastEntry,infinite:S.infinite})

  });

  start();

})();

/* KVPV_SKILL_SOURCE_END 23-beast-island.js */
}

function __KVPV_SKILL_SOURCE_32_combat_stall_js() {
/* KVPV_SKILL_SOURCE_BEGIN 32-combat-stall.js */




(() => {
 'use strict';
 const W=window,KEY='KVPV_COMBAT_STALL';
 const actor=String(W.__KVPV_OWN_ACTOR_ID??'');
 const safe=fn=>{try{return fn();}catch(e){return {error:String(e?.message||e)};}};
 const state=(obj,...args)=>safe(()=>obj?.status?.(...args)??null);
 function snapshot(){
   const own=String(W._Ba?._rJ?._O$?.ins?.actorId??'')===actor&&
     !!actor&&!W.__KVPV_UNIVERSAL_HALTED;
   const scene=Number(W._C?._Mn?._Cn?.currentID??W._Ba?._$a?._yo?.ins?.intoSce?.[0]);
   const far=state(W.KVPV_FAR_SCOPE),mode=state(W.KVPV_MODE,false),
     th=state(W.KVPV_TH300,false),basics=state(W.KVPV_BASIC10),
     hr=state(W.KVPV_HITRUN1,false),force=state(W.KVPV_TQ_BASIC_FORCE),
     thac=state(W.KVPV_THAC_AN_CD0),xa=state(W.KVPV_XA_MENH_LV2);
   const me=safe(()=>{
     const world=W._C?._Ba?.instance;
     return world?.getRole?.(Number(actor))??world?.getRole?.(actor);
   });
   const comp=safe(()=>me?.getComponent?.(W._d?._Yct?._Het));
   const selector=safe(()=>me?.getComponent?.(W._d?._Yct?._Eet));
   const target=comp?.target;
   const targetType=safe(()=>target?.property?.get?.('type')??null);
   const targetHp=safe(()=>target?.property?.get?.('hp')??null);
   const hints=[];
   if(!own)hints.push('game_frame_actor_or_session_not_ready');
   if(thac?.unresolved?.length)hints.push('thac_an_client_cooldowns_still_zero');
   if(xa?.unresolved===true)hints.push('xa_menh_client_cooldown_still_zero');
   if(!comp||typeof comp?.combat!=='function')hints.push('native_combat_component_missing');
   if(!selector||typeof selector?._f7t!=='function')hints.push('native_skill_selector_missing');
   if(target==null)hints.push('native_target_missing');
   if(mode?.mode==='OFF'&&far?.inside===true)hints.push('far_combat_mode_off_or_waiting');
   if(far?.inside===false&&basics?.enabled===false)hints.push('outside_basic_controller_off');
   if(typeof th?.reason==='string'&&/animation|cooldown|skill_readiness/.test(th.reason))
     hints.push('long_range_controller_waiting_'+th.reason);
   if(typeof basics?.reason==='string'&&/cooldown|ready|target|range/.test(basics.reason))
     hints.push('outside_controller_waiting_'+basics.reason);
   return {version:1,actorMatches:own,map:scene,scene:far?.kind??'unknown',
     native:{combatPresent:typeof comp?.combat==='function',selectorPresent:typeof selector?._f7t==='function',
       cooldownMethodPresent:typeof comp?.isCooldown==='function',
       targetType,targetHp},hints,
     mode:{mode:mode?.mode??null,reason:mode?.reason??null,lastError:mode?.lastError??null,
       running:mode?.combatRunning??null},
     outside:{enabled:basics?.enabled??null,reason:basics?.reason??null,
       attempts:basics?.attempts??null,lastError:basics?.lastError??null},
     long:{running:th?.running??null,reason:th?.reason??th?.lastReason??null,
       phase:th?.phase??th?.combatPhase??null,lastError:th?.lastError??null},
     hitrun:{running:hr?.running??null,phase:hr?.phase??null},
     hooks:{tqBasicForce:force?.enabled??null},
     thac:{enabled:thac?.enabled??null,unresolved:thac?.unresolved??[],rollbackCount:thac?.rollbackCount??null},
     xa:{enabled:xa?.enabled??null,ms:xa?.configCooldownMs??null,rollbackCount:xa?.rollbackCount??null},
     note:'Read-only snapshot; no server skill outcome proven. Do not infer reason from a still image alone.'};
 }
 function recover(){

   // combat ownership/animation or forcibly restart a manually stopped mode.
   safe(()=>W.KVPV_XA_MENH_LV2?.recover?.());
   safe(()=>W.KVPV_THAC_AN_CD0?.recover?.());
   return snapshot();
 }
 W[KEY]=Object.freeze({snapshot,status:snapshot,recover});
})();
/* KVPV_SKILL_SOURCE_END 32-combat-stall.js */
}



function __KVPV_SKILL_SOURCE_32_thac_an_cd0_js() {
/* KVPV_SKILL_SOURCE_BEGIN 32-thac-an-cd0.js */






(() => {
  'use strict';
  const W=window,KEY='KVPV_THAC_AN_CD0',old=W[KEY];
  try {old?.stop?.();} catch(e){
    console.warn('[Thác Ấn] Previous module cleanup failed:',String(e?.message||e));
  }
  const SPECS=Object.freeze([
    [3021,1,30210001,30000,'Bát Hoang Phá Thế Lv1'],
    [3021,2,30210002,30000,'Bát Hoang Phá Thế Lv2'],
    [3021,3,30210003,25000,'Bát Hoang Phá Thế Lv3'],
    [3031,2,30310002,30000,'Xá Mệnh Nhất Kích Lv2'],
    [3041,2,30410002,30000,'Quẻ Thượng Lv2'],
    [3121,2,31210002,0,'Ma Hóa Lv2']
  ]);
  let repairs=0,lastError='';
  function lookup([id,level,record]){
    const v=W._ft?._nY?.ins?.getCfgBySkillIdAndLv?.(id,level);
    return Array.isArray(v)&&Number(v[0])===record&&
      Number(v[1])===id&&Number(v[3])===level&&
      Number.isFinite(v[6])?v:null;
  }
  function status(){
    const skills=SPECS.map(spec=>{
      const [id,level,record,originalMs,name]=spec;
      try{
        const r=lookup(spec);
        return {name,id,level,record,originalMs,
          clientMs:r?.[6]??null,available:!!r,
          unresolved:!!r&&originalMs>0&&r[6]===0};
      }catch(e){return {name,record,originalMs,error:String(e?.message||e)};}
    });
    return {enabled:false,suspended:true,rollbackCount:repairs,
      unresolved:skills.filter(s=>s.unresolved).map(s=>s.record),skills,
      lastError,serverCooldownBypassed:false,lockedSlotsOpened:false,
      reason:'safe_config_rollback',note:'0ms disabled. Restores only exact known positive cooldowns; no packets or combat hooks.'};
  }
  function recover(){
    lastError='';
    // Use Xa Menh's own recovery when available to maintain compatibility.
    try{W.KVPV_XA_MENH_LV2?.recover?.();}catch(e){
      lastError='xa_recovery:'+String(e?.message||e);
    }
    for(const spec of SPECS){
      const [,,record,originalMs]=spec;
      if(originalMs===0||record===30310002)continue;
      try{
        const r=lookup(spec);
        if(r&&r[6]===0){r[6]=originalMs;repairs++;}
      }catch(e){lastError=String(e?.message||e);}
    }
    return status();
  }
  function disabled(){
    console.warn('[Thác Ấn] Client 0ms remains disabled after combat freeze.');
    return status();
  }
  W[KEY]=Object.freeze({version:3,status,recover,restore:recover,
    stop:recover,enable:disabled,start:disabled});
  recover();
})();
/* KVPV_SKILL_SOURCE_END 32-thac-an-cd0.js */
}

function __KVPV_SKILL_SOURCE_32_xa_menh_lv2_cd0_js() {
/* KVPV_SKILL_SOURCE_BEGIN 32-xa-menh-lv2-cd0.js */





(() => {
  'use strict';
  const W=window, KEY='KVPV_XA_MENH_LV2', REC=30310002, NATIVE_MS=30000;
  const old=W[KEY];
  try { old?.restore?.(); } catch(e) {
    console.warn('[Xá Mệnh] Old module cleanup failed:',String(e?.message||e));
  }
  let repairs=0,lastError='';
  function row(){
    const r=W._ft?._nY?.ins?.getCfgBySkillIdAndLv?.(3031,2);
    return Array.isArray(r)&&Number(r[0])===REC&&
      Number(r[1])===3031&&Number(r[3])===2&&
      Number.isFinite(r[6])?r:null;
  }
  function recover(){
    try {
      const r=row();
      if(!r) { lastError='verified_skill_row_unavailable'; return status(); }
      if(r[6]===0) {r[6]=NATIVE_MS;repairs++;lastError='';}
      else if(r[6]!==NATIVE_MS)lastError='unexpected_current_ms:'+r[6];
      else lastError='';
    }catch(e){lastError=String(e?.message||e);}
    return status();
  }
  function status(){
    let r=null;try{r=row();}catch(e){lastError=String(e?.message||e);}
    return {enabled:false,suspended:true,skillId:3031,level:2,
      recordId:r?.[0]??null,configCooldownMs:r?.[6]??null,
      originalMs:NATIVE_MS,rollbackCount:repairs,unresolved:r?.[6]===0,
      lastError,serverBypassConfirmed:false,
      note:'0ms disabled. Auto-restores only verified 30310002 when still at 0ms.'};
  }
  function disabled(){
    console.warn('[Xá Mệnh] Client 0ms disabled after combat freeze. No change.');
    return status();
  }
  W[KEY]=Object.freeze({version:4,status,recover,restore:recover,stop:recover,
    enable:disabled,start:disabled});
  recover();
})();
/* KVPV_SKILL_SOURCE_END 32-xa-menh-lv2-cd0.js */
}

function __KVPV_SKILL_SOURCE_50_companion_combat_js() {
/* KVPV_SKILL_SOURCE_BEGIN 50-companion-combat.js */







(() => {

  'use strict';

  const W=window,old=W.KVPV_COMPANION_COMBAT,carry=old?._handoff?.();

  try{old?.stop?.();}catch(e){W.KVPV_V1?.diagnostics?.record?.(e);}

  const actor=String(W.__KVPV_OWN_ACTOR_ID??''),allowed=new Set(['THIEN_QUAN','LINH_LUNG','PHU_VAN','TRU_TIEN']),scanMs=50;

  const S={enabled:true,timer:null,role:null,ride:null,mansion:null,mansionAttempts:0,dispatching:false,reason:'starting',lastError:'',

    attempts:carry?.actor===actor?Number(carry.attempts)||0:0,nativeCastSignals:carry?.actor===actor?Number(carry.nativeCastSignals)||0:0,lastSkill:null,lastTarget:null,nativeAutoAttempts:0,perCompanion:{pet:0,fuwa:0,ride:0},lastCompanion:null};

  const prop=(r,k)=>r?.property?.get?.(k),types=()=>W._d?._Yct;

  const component=(r,k)=>types()?.[k]?r?.getComponent?.(types()[k]):null;

  const identity=r=>String(r?.id??prop(r,'id')??'');

  const owned=()=>!!actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;

  const inRoad=()=>Number(W._ft?._po?.ins?.getCfgById?.(Number(W._C?._Mn?._Cn?.currentID))?.[7])===41&&W._Ba?._cm?._q3t?.ins?.getHasTeamByType?.(1)===true&&W.KVPV_ROAD_CADENCE?.enabled!==false;
  const scope=()=>{if(inRoad())return true;const s=W.KVPV_FAR_SCOPE?.status?.();return s?.inside===true&&allowed.has(s.kind);};

  const settings=()=>W.KVPV_DESKTOP_CONTROL?.scopeProfile?.(W.KVPV_FAR_SCOPE?.status?.()?.kind)??{};

  const live=r=>{const hp=prop(r,'hp');return !!r&&r.isValid!==false&&Number(prop(r,'status'))!==1024&&(!Array.isArray(hp)||Number(hp[0])>0);};

  function playerSkill(role,id){const s=component(role,'_Eet');return Number.isSafeInteger(id)&&id>0&&[...(s?._rtt??[]),...(s?._wet??[])].some(r=>Number(r?.[0])===id);}

  function rideSignal(){if(S.enabled)S.nativeCastSignals++;}

  function setRide(ride){if(ride===S.ride)return;S.ride?.off?.(1039,S,rideSignal);S.ride=ride;ride?.on?.(1039,S,rideSignal);}

  function setMansion(context){if(context===S.mansion)return;S.mansion?.off?.(1039,S,rideSignal);S.mansion=context;context?.on?.(1039,S,rideSignal);}

  function onPlayerCast(targetId,skillId){try{

    if(!S.enabled||S.dispatching||!owned()||!scope())return;

    const role=S.role,master=component(role,'_Het'),target=master?.target,id=Number(skillId);



    if(!live(role)||Number(prop(role,'type'))!==4||!playerSkill(role,id)||!live(target)||identity(target)!==String(targetId)||

      W.KVPV_FAR_SCOPE?.eligible?.(target)!==true||master?.isValidTarget?.()!==true)return;

    if(inRoad()){dispatchRoad(role,target);return;}
    const p=settings();S.dispatching=true;try{for(const [key,type,on] of [['pet',2,true],['fuwa',9,true],['ride',7,p.rideFollow!==false],['mansion',12,p.mansionFollow===true]])if(on){try{follow(key,type,role,target);}catch(e){S.lastError=String(e?.message??e);S.reason='error';}}}finally{S.dispatching=false;}

  }catch(e){S.lastError=String(e?.message??e);S.reason='error';}}

  // Pet / Fuwa / Ride native selector autonomously chooses normal attacks
  // and special skills; only native readiness, animation and range admit casts.
  function dispatchNativeCompanions(role,target){
    const master=component(role,'_Het');
    if(!S.enabled||S.dispatching||!owned()||!scope()||inRoad()||
      W._Ba?._rJ?._O$?.ins?.isDead===true||!live(role)||Number(prop(role,'type'))!==4||
      !live(target)||Number(prop(target,'type'))!==1||
      W.KVPV_FAR_SCOPE?.eligible?.(target)!==true||
      typeof master?.isValidTarget!=='function'||master.isValidTarget()!==true)return;
    const p=settings();S.dispatching=true;
    try{
      for(const [key,type,on] of [['pet',2,true],['fuwa',9,true],['ride',7,p.rideFollow!==false]]){
        if(!on)continue;
        try{
          const before=S.attempts;follow(key,type,role,target);
          if(S.attempts>before)S.nativeAutoAttempts++;
        }
        catch(e){S.lastError=String(e?.message??e);S.reason='error';}
      }
    }finally{S.dispatching=false;}
  }
  let lastRoadDispatch=-Infinity;
  function dispatchRoad(role,target){if(W._Ba?._rJ?._O$?.ins?.isDead===true||S.dispatching||Date.now()-lastRoadDispatch<1||!live(role)||Number(prop(role,'type'))!==4||!live(target)||Number(prop(target,'type'))!==1||component(role,'_Het')?.isValidTarget?.()!==true)return;lastRoadDispatch=Date.now();S.dispatching=true;try{const p=settings();for(const [key,type,on] of [['pet',2,true],['fuwa',9,true],['ride',7,p.rideFollow!==false]])if(on)try{follow(key,type,role,target);}catch(e){S.lastError=String(e?.message??e);S.reason='error';}}finally{S.dispatching=false;}}
  function follow(key,type,role,target){

    const ride=prop(role,key+'Context');if(key==='ride')setRide(ride);else if(key==='mansion')setMansion(ride);

    if(!live(ride)||Number(prop(ride,'type'))!==type){S.reason='waiting_native_'+key;return;}

    const combat=component(ride,'_Het'),selector=component(ride,'_Eet');

    if(typeof combat?.combat!=='function'||typeof combat?.setTarget!=='function'||typeof selector?.selectSkill!=='function'){S.reason='waiting_native_components';return;}

    if(combat._jh?.isPlaying===true||typeof combat.isCooldown!=='function'||combat.isCooldown()!==false){S.reason='native_companion_cooldown';return;}



      const selected=Number(selector.selectSkill());

      if(!Number.isSafeInteger(selected)||selected<=0){S.reason='no_ready_native_skill';return;}

      const cfg=W._Ba?._Jtt?._ant?.ins?.getCfgById?.(10000*selected+1);

      if(!cfg){S.reason='waiting_native_skill_config';return;}

      const targetKind=Number(cfg[15])||0,destination=targetKind===1?role:target;

      combat.setTarget(destination,targetKind);

      if(combat.target!==destination||combat.isValidTarget?.(targetKind)!==true){S.reason='native_target_rejected';return;}

      if(typeof combat.isValidRange==='function'&&combat.isValidRange()!==true){S.reason='native_companion_range';return;}

      if(key==='mansion')S.mansionAttempts++;S.attempts++;S.lastSkill=selected;S.lastTarget=identity(destination);

      if(key in S.perCompanion){S.perCompanion[key]++;S.lastCompanion=key;}
      combat.combat(selected,0,targetKind);S.reason=key+'_native_cast';



  }

  function unbind(){S.role?.off?.(1039,S,onPlayerCast);S.role=null;setRide(null);setMansion(null);}



  function sync(withStatus=true){try{

    if(!S.enabled)return withStatus?status():undefined;

    if(!owned()){unbind();S.reason='wrong_actor_or_halted';return withStatus?status():undefined;}

    const role=W._C?._Ba?.instance?.getRole?.(Number(actor));

    if(role!==S.role){unbind();S.role=role;role?.on?.(1039,S,onPlayerCast);}

    setRide(prop(role,'rideContext')??null);setMansion(prop(role,'mansionContext')??null);
    if(inRoad()&&owned()&&W._Ba?._rJ?._O$?.ins?.isDead!==true)dispatchRoad(role,component(role,'_Het')?.target);
    else if(!withStatus&&scope()&&owned())dispatchNativeCompanions(role,component(role,'_Het')?.target);

    if(!role)S.reason='waiting_player';else if(!scope())S.reason='outside_supported_dungeons';

    else if(!S.ride)S.reason='waiting_native_ride';

    else if(['starting','outside_supported_dungeons','waiting_player','waiting_native_ride'].includes(S.reason))S.reason='waiting_player_cast';

  }catch(e){S.lastError=String(e?.message??e);S.reason='error';}return withStatus?status():undefined;}

  function status(){const combat=component(S.ride,'_Het'),selector=component(S.ride,'_Eet');return {

    mansionAttempts:S.mansionAttempts,rideFollow:settings().rideFollow!==false,mansionFollow:settings().mansionFollow===true,mansionPresent:!!S.mansion,mansionNativeRangeGate:true,enabled:S.enabled,mode:'pet_fuwa_ride_native_basic_and_skills',reason:S.reason,lastError:S.lastError,scanMs,clientSkillCooldownMs:null,nativeAutoAttempts:S.nativeAutoAttempts,perCompanion:{...S.perCompanion},lastCompanion:S.lastCompanion,

    attempts:S.attempts,nativeCastSignals:S.nativeCastSignals,lastSkill:S.lastSkill,lastTarget:S.lastTarget,

    nativeRangeGate:true,rangePolicy:'same_verified_master_target',nativeAnimationGate:true,clientSkillWaitMs:null,

    contexts:['pet','fuwa','ride'].map(key=>{const ctx=prop(S.role,key+'Context'),sel=component(ctx,'_Eet'),cc=component(ctx,'_Het');return {kind:key,present:live(ctx),target:identity(cc?.target),skills:[...(sel?._rtt??[]),...(sel?._wet??[])].slice(0,12).map(r=>r.slice(0,3))};}),otherCompanions:'independent_native_basics_and_skills'};}

  function stop(){S.enabled=false;if(S.timer!==null){(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;}unbind();S.reason='stopped';return status();}

  W.KVPV_COMPANION_COMBAT=Object.freeze({sync,status,stop,_handoff:()=>({actor,attempts:S.attempts,nativeCastSignals:S.nativeCastSignals})});

  sync();if(owned())S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(()=>sync(false),scanMs);

})();

/* KVPV_SKILL_SOURCE_END 50-companion-combat.js */
}

function __KVPV_SKILL_SOURCE_71_kiem_khieu_basic_js() {
/* KVPV_SKILL_SOURCE_BEGIN 71-kiem-khieu-basic.js */
/* Kiem Khieu Quan Hung: native Tian Quan Tuyet Hoc-first combo and local movement boost.
 * Isolated to client scene type 84. Native target, cooldown, range and selector retained. */
(()=>{'use strict';
const W=window,actor=String(W.__KVPV_OWN_ACTOR_ID||''),old=W.KVPV_KIEM_KHIEU_BASIC;
old?.stop?.('reload');
const C={tuyetHoc:[1001,1002,1003,1004,1005,1006,1007,1008],skills:[8001,8002,8003,8004,8005],moveFactor:99};
const S={enabled:true,timer:null,casts:0,transformCasts:0,thCasts:0,basicCasts:0,lastSkill:null,reason:'waiting_scene',error:'',blocked:0,lastOwnerRecoveryAt:0,filtered:0,guard:null,moveBase:null,moveApplied:null,movement:'waiting',visual:{factor:9999,calls:0,applied:0,unavailable:0,conflicts:0}};
const MOVE={obj:null,base:null,applied:null};
const type=()=>Number(W._ft?._po?.ins?.getCfgById?.(Number(W._C?._Mn?._Cn?.currentID))?.[7]);
const own=()=>actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;
const comp=(r,n)=>{const key=W._d?._Yct?.[n];return key?r?.getComponent?.(key):null;};
const transformSkill=id=>W.KVPV_TRANSFORM10?.transformed?.()===true&&W.KVPV_TRANSFORM10?.has?.(Number(id))===true;
const allowed=id=>C.skills.includes(Number(id))||C.tuyetHoc.includes(Number(id))||transformSkill(id);
// Visual-only acceleration for one native cast; restore the original tween method immediately.
function castSkill(combat,skill){
 const avatar=combat?._Qrt,original=avatar?.getActionTween;
 const descriptor=avatar&&Object.getOwnPropertyDescriptor(avatar,'getActionTween');
 if(typeof original!=='function'||(descriptor&&descriptor.configurable===false)){
  S.visual.unavailable++;return combat.combat(skill);
 }
 let action;try{action=combat?._mvt?.(skill)?.[5];}catch(_){}
 const expected=typeof action==='string'&&action.trim()?action:'attack';
 const wrapped=function(...args){
  if(args[0]===expected){
   const speed=Number(args[2]??1);
   if(Number.isFinite(speed)&&speed>0){args[2]=Math.min(9999,speed*9999);S.visual.applied++;}
  }
  return original.apply(this,args);
 };
 try{Object.defineProperty(avatar,'getActionTween',{configurable:true,writable:true,enumerable:descriptor?.enumerable??false,value:wrapped});}
 catch(_){S.visual.unavailable++;return combat.combat(skill);}
 S.visual.calls++;
 try{return combat.combat(skill);}
 finally{
  if(avatar.getActionTween===wrapped){
   try{if(descriptor)Object.defineProperty(avatar,'getActionTween',descriptor);else delete avatar.getActionTween;}
   catch(e){S.visual.conflicts++;S.error=String(e?.message??e);}
  }else S.visual.conflicts++;
 }
}
function restoreMove(){if(MOVE.obj&&MOVE.obj.speed===MOVE.applied)MOVE.obj.speed=MOVE.base;
 MOVE.obj=null;MOVE.base=null;MOVE.applied=null;S.moveBase=null;S.moveApplied=null;}
function applyMove(role){const mover=comp(role,'_zet'),shared=W.KVPV_EXPERIMENTAL_BOOST?.status?.();
 if(shared?.enabled===true&&Number(shared.moveFactor)>=9){restoreMove();return 'shared_fast_boost';}
 if(!mover||!Number.isFinite(Number(mover.speed))||Number(mover.speed)<=0){restoreMove();return 'movement_unavailable';}
 if(MOVE.obj!==mover){restoreMove();MOVE.obj=mover;MOVE.base=Number(mover.speed);MOVE.applied=MOVE.base*C.moveFactor;}
 else if(mover.speed!==MOVE.applied){MOVE.base=Number(mover.speed);MOVE.applied=MOVE.base*C.moveFactor;}
 mover.speed=MOVE.applied;S.moveBase=MOVE.base;S.moveApplied=MOVE.applied;return 'local_x99';}
function releaseGuard(){
 const g=S.guard;if(!g)return;
 try{if(g.combat.combat===g.wrap){if(g.descriptor)Object.defineProperty(g.combat,'combat',g.descriptor);else delete g.combat.combat;}}catch(e){S.error=String(e?.message??e);}
 S.guard=null;
}
function ensureGuard(c){
 if(S.guard?.combat===c&&c.combat===S.guard.wrap)return true;
 releaseGuard();
 if(typeof c?.combat!=='function')return false;
 const original=c.combat,descriptor=Object.getOwnPropertyDescriptor(c,'combat');
 if(descriptor&&descriptor.configurable===false)return false;
 const wrap=function(skill,...args){
  if(S.enabled&&own()&&type()===84&&this===c&&!allowed(skill)){S.filtered++;return;}
  return original.call(this,skill,...args);
 };
 try{Object.defineProperty(c,'combat',{configurable:true,writable:true,enumerable:descriptor?.enumerable??false,value:wrap});S.guard={combat:c,wrap,descriptor};return true;}
 catch(e){S.error=String(e?.message??e);return false;}
}
function tick(){if(!S.enabled)return;
 try{
  if(!own()||type()!==84){releaseGuard();restoreMove();S.reason='outside_kiem_khieu';return;}
  const role=W._C?._Ba?.instance?.getRole?.(Number(actor)),combat=comp(role,'_Het'),sel=comp(role,'_Eet'),target=combat?.target;
  if(combat&&!ensureGuard(combat)){S.reason='native_filter_unavailable';return;}
  if(!role||W._Ba?._rJ?._O$?.ins?.isDead===true){restoreMove();S.reason='waiting_valid_target';return;}
  if(Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)){restoreMove();S.reason='manual_ui';return;}
  if(![1,4].includes(Number(target?.property?.get?.('type')))||target?.isValid===false){restoreMove();S.reason='waiting_valid_target';return;}
  S.movement=applyMove(role);
  const mode=W.KVPV_MODE?.status?.(false)?.mode;
  if(mode&&mode!=='OFF'){
   if(Date.now()-S.lastOwnerRecoveryAt>=5000&&typeof W.KVPV_MODE?.stop==='function'){
    S.lastOwnerRecoveryAt=Date.now();
    W.KVPV_MODE.stop('Kiem Khieu scene84: handoff player combat to native Tian Quan combo');
   }
   const current=W.KVPV_MODE?.status?.(false)?.mode;
   if(current&&current!=='OFF'){restoreMove();S.reason='other_combat_owner';return;}
  }
  if(typeof combat?.isCooldown!=='function'||combat.isCooldown()!==false){S.blocked++;S.reason='native_cooldown';return;}
  if(combat.isValidTarget?.()!==true||combat.isValidRange?.()!==true){S.reason='native_target_or_range';return;}
  if(typeof sel?._f7t!=='function'||typeof combat?.combat!=='function'){S.reason='native_combat_unavailable';return;}
  const now=Date.now(),list=[...(Array.isArray(sel._rtt)?sel._rtt:[]),...(Array.isArray(sel._wet)?sel._wet:[])];
  const ready=list.filter(x=>allowed(x?.[0])&&Number.isFinite(Number(x?.[1]))&&Number(x[1])<now);
  const transformed=ready.filter(x=>transformSkill(x[0])),th=ready.filter(x=>C.tuyetHoc.includes(Number(x[0]))),basics=ready.filter(x=>C.skills.includes(Number(x[0]))),pool=transformed.length?transformed:th.length?th:basics;
  if(!pool.length){S.reason='waiting_tian_quan_skill_ready';return;}
  const id=Number(sel._f7t(pool,[],1));
  if(!allowed(id)||!pool.some(x=>Number(x[0])===id)){S.reason='native_tian_quan_skill_rejected';return;}
  if(combat.target!==target||type()!==84)return;
  castSkill(combat,id);S.casts++;S.lastSkill=id;
  if(transformSkill(id)){S.transformCasts++;S.reason='native_transform_skill_cast';}
  else if(C.tuyetHoc.includes(id)){S.thCasts++;S.reason='native_tian_quan_tuyet_hoc_cast';}
  else{S.basicCasts++;S.reason='native_tian_quan_basic_cast';}
 }catch(e){S.error=String(e?.message??e);S.reason='error';}
}
function stop(reason='stopped'){S.enabled=false;releaseGuard();restoreMove();const clear=W.KVPV_V1?.timers?.clearInterval??W.clearInterval;if(S.timer!=null&&typeof clear==='function')clear(S.timer);S.timer=null;S.reason=reason;}
function status(){return {enabled:S.enabled,inside:type()===84,skills:[...C.tuyetHoc,...C.skills,...(W.KVPV_TRANSFORM10?.skills?.().map(x=>x.id)||[])],combo:'native transformed skills, then Tuyet Hoc, then basics',pollMs:1,nativeCooldownPreserved:true,tuyetHoc:true,casts:S.casts,transformCasts:S.transformCasts,thCasts:S.thCasts,basicCasts:S.basicCasts,lastSkill:S.lastSkill,blockedCooldown:S.blocked,filteredNonCombo:S.filtered,filterActive:!!S.guard,sceneId:W._C?._Mn?._Cn?.currentID??null,sceneType:type(),actorMatch:!!own(),targetType:(()=>{const r=W._C?._Ba?.instance?.getRole?.(Number(actor));return comp(r,'_Het')?.target?.property?.get?.('type')??null;})(),combatMode:W.KVPV_MODE?.status?.(false)?.mode??null,timerActive:S.timer!==null,moveFactor:C.moveFactor,movement:S.movement,moveBase:S.moveBase,moveApplied:S.moveApplied,moveActive:!!MOVE.obj,visual:{...S.visual,transformVisualFactor:null,visualOnly:false,nativeSkillSpeed:true},reason:S.reason,error:S.error};}
W.KVPV_KIEM_KHIEU_BASIC=Object.freeze({tick,status,stop});
const schedule=W.KVPV_V1?.timers?.setInterval??W.setInterval;
if(typeof W.setInterval==='function'&&typeof schedule==='function')S.timer=schedule(tick,1);
tick();
})();/* KVPV_SKILL_SOURCE_END 71-kiem-khieu-basic.js */
}

function __KVPV_SKILL_SOURCE_76_trutien_pvp_js() {
/* KVPV_SKILL_SOURCE_BEGIN 76-trutien-pvp.js */
/* Tru Tien PvP mode: native basic attacks 8001-8005 only; no outgoing Tuyet Hoc.
 * No HP retreat, healing, auto target switching, invented RPC or native cooldown rewrite.
 * Optional remote-player TH dodge delegates to KVPV_PVP_LUOFENG.
 */
(() => {
'use strict';
const W=window,KEY='KVPV_TRUTIEN_PVP',actorId=String(W.__KVPV_OWN_ACTOR_ID||'');
try{W[KEY]?.stop?.('reload');}catch(e){W.KVPV_V1?.diagnostics?.record?.(e);}
const S={enabled:false,timer:null,role:null,target:null,scene:null,attacks:0,signals:0,hits:0,matchedDamage:0,blockedCooldown:0,
  thAttempts:0,basicAttempts:0,lastGroup:null,perSkill:new Map(),focusLock:true,focusTarget:null,focusId:'',focusBlocked:0,focusSwitches:0,
  visual:{factor:9999,calls:0,applied:0,unavailable:0,conflicts:0,lastAction:null,lastTimeScale:null},
  companions:true,lastCompanionPoll:-Infinity,companionAttempts:{pet:0,fuwa:0,ride:0},companionRetryAfter:{pet:0,fuwa:0,ride:0},
  companionLastSkill:null,companionLastTarget:null,companionBlocked:0,companionErrors:0,
  reason:'off',error:'',lastSkill:null,lastCastAt:null,lastOwnerRecoveryAt:-Infinity,autoDodge:false};
const prop=(r,k)=>r?.property?.get?.(k);
const id=r=>String(r?.id??prop(r,'id')??'');
const components=()=>W._d?._Yct??{};
const me=()=>W._C?._Ba?.instance?.getRole?.(Number(actorId))??null;
const component=(r,key)=>components()[key]?r?.getComponent?.(components()[key]):null;
const scene=()=>String(W._C?._Mn?._Cn?.currentID??'');
const scope=()=>{const s=W.KVPV_FAR_SCOPE?.status?.();return s?.inside===true&&s.kind==='TRU_TIEN';};
const own=()=>!!actorId&&actorId===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;
const live=r=>{const hp=prop(r,'hp');return !!r&&r.isValid!==false&&(!Array.isArray(hp)||Number(hp[0])>0);};
const enemy=(t,actor)=>live(t)&&t!==actor&&id(t)!==actorId&&Number(prop(t,'type'))===4&&!!id(t);
const isBasic=x=>Number.isSafeInteger(Number(x))&&Number(x)>=8001&&Number(x)<=8005;
const priorityBasic=[8005,8004,8002,8003,8001];
// Borrow ONLY native basics from Tian Quan. Do not import its boss targeting/movement hooks.
const tqRoster=Object.freeze([8001,8002,8003,8004,8005]);
const companionTypes=Object.freeze([['pet',2],['fuwa',9],['ride',7]]);
const learned=selector=>new Set([...(selector?._rtt??[]),...(selector?._wet??[])].map(row=>Number(row?.[0])).filter(Number.isSafeInteger));
function companionTick(role,target,now){
 if(!S.companions||now-S.lastCompanionPoll<50)return;
 S.lastCompanionPoll=now;
 if(!enemy(target,role)||!live(role)||S.focusLock&&S.focusId!==id(target))return;
 for(const [name,type] of companionTypes){
   if(now<S.companionRetryAfter[name])continue;
   try{
     const ctx=prop(role,name+'Context');
     if(!live(ctx)||Number(prop(ctx,'type'))!==type)continue;
     const cc=component(ctx,'_Het'),sel=component(ctx,'_Eet');
     if(typeof cc?.setTarget!=='function'||typeof cc?.combat!=='function'||
        typeof cc?.isCooldown!=='function'||cc.isCooldown()!==false||
        typeof sel?.selectSkill!=='function')continue;
     // Copy Tian Quan companion's native skill selection, no guessed cooldown or RPC.
     // Per-skill native config says whether the destination is the owner or PvP opponent.
     const skill=Number(sel.selectSkill());
     if(!Number.isSafeInteger(skill)||skill<=0)continue;
     const cfg=W._Ba?._Jtt?._ant?.ins?.getCfgById?.(10000*skill+1);
     if(!cfg){S.companionBlocked++;S.companionRetryAfter[name]=now+1000;continue;}
     const targetKind=Number(cfg[15])||0,dest=targetKind===1?role:target;
     cc.setTarget(dest,targetKind);
     if(cc.target!==dest||typeof cc.isValidTarget!=='function'||cc.isValidTarget(targetKind)!==true||
        typeof cc.isValidRange!=='function'||cc.isValidRange()!==true){
       S.companionBlocked++;S.companionRetryAfter[name]=now+1000;continue;
     }
     if(!scope()||!own()||!enemy(target,role))return;
     cc.combat(skill,0,targetKind);
     S.companionAttempts[name]++;
     S.companionLastSkill=skill;S.companionLastTarget=id(dest);
   }catch(e){S.companionErrors++;S.error=String(e?.message??e);}
 }
}
function resetFocus(target){S.focusTarget=target;S.focusId=id(target);S.focusSwitches++;S.lastGroup=null;S.perSkill.clear();}
function setFocusToSelected(){
 if(!S.enabled||!scope()||!own())throw Error('Start PvP in verified Tru Tien first');
 const r=me(),t=component(r,'_Het')?.target;
 if(!enemy(t,r))throw Error('Select an alive enemy player first');
 resetFocus(t);link(r,t);return status();
}
function ranked(rows){
 const order=priorityBasic;
 const score=n=>{const sample=S.perSkill.get(n);return sample&&sample.hits>=2?sample.damage/sample.hits:null;};
 return rows.slice().sort((a,b)=>{
   const ai=Number(a[0]),bi=Number(b[0]),as=score(ai),bs=score(bi);
   if(as!==null||bs!==null){
     if(as===null)return 1;if(bs===null)return -1;
     if(as!==bs)return bs-as;
   }
   return order.indexOf(ai)-order.indexOf(bi);
 });
}
const occupied=()=>{
 const daily=W.KVPV_DAILY?.quickState?.();
 // Daily must be tested before PvE ownership, or PvP may stop Daily's combat.
 if(daily?.running===true)return 'daily_priority';
 const job=daily?.job;
 if(job&&!['rảnh','ranh','idle'].includes(String(job).toLowerCase()))return 'daily_job';
 const mode=W.KVPV_MODE?.status?.(false)?.mode;
 if(mode&&mode!=='OFF')return 'combat_mode_owner';
 if(W.KVPV_TH300?.status?.(false)?.running===true||W.KVPV_HITRUN1?.status?.(false)?.running===true)
   return 'boss_owner';
 return null;
};
function castSignal(targetId,skill){if(S.enabled&&S.target&&String(targetId)===id(S.target)&&isBasic(skill))S.signals++;}
function hitSignal(source,marker,damage,flags,receiver){
 if(!S.enabled||String(source)!==actorId||String(receiver)!==id(S.target)||Number(damage)<=0||
   Number(flags)&(4|16|32|64|128|256))return;
 const m=Number(marker);if(!Number.isSafeInteger(m)||m%10000!==0)return;
 const skill=m/10000;if(isBasic(skill)){
   S.hits++;S.matchedDamage+=Number(damage);
   const row=S.perSkill.get(skill)??{id:skill,hits:0,damage:0};
   row.hits++;row.damage+=Number(damage);S.perSkill.set(skill,row);
 }
}
function setVisualSpeed(factor=9999){
 if(![1,9,99,9999].includes(factor))throw Error('Tru Tien basic visual speed must be 1, 9, 99 or 9999');
 S.visual.factor=factor;
 return {factor,scope:'TRU_TIEN',skills:tqRoster.slice(),visualOnly:true,nativeCooldownPreserved:true};
}
// Adjust only one synchronous native basic cast's visual tween; restore the original
// method descriptor immediately. No persistent hooks or native cooldown changes.
function castBasicWithVisual(combat,skill){
 const factor=S.visual.factor;
 if(factor===1)return combat.combat(skill);
 S.visual.calls++;
 const avatar=combat?._Qrt,original=avatar?.getActionTween,descriptor=avatar&&Object.getOwnPropertyDescriptor(avatar,'getActionTween');
 if(typeof original!=='function'||descriptor&&descriptor.configurable===false){
   S.visual.unavailable++;return combat.combat(skill);
 }
 let action;try{action=combat?._mvt?.(skill)?.[5];}catch(_){}
 const expected=typeof action==='string'&&action.trim()?action:'attack';
 S.visual.lastAction=expected;
 const wrapped=function(...args){
   if(args[0]===expected){
     const before=Number(args[2]??1);
     if(Number.isFinite(before)&&before>0){
       args[2]=Math.min(9999,before*factor);
       S.visual.applied++;S.visual.lastTimeScale=args[2];
     }
   }
   return original.apply(this,args);
 };
 try{
   Object.defineProperty(avatar,'getActionTween',{configurable:true,writable:true,
     enumerable:descriptor?.enumerable??false,value:wrapped});
 }catch(e){S.visual.unavailable++;return combat.combat(skill);}
 try{return combat.combat(skill);}
 finally{
   if(avatar.getActionTween===wrapped){
     try{if(descriptor)Object.defineProperty(avatar,'getActionTween',descriptor);
       else delete avatar.getActionTween;}catch(e){S.visual.conflicts++;S.error=String(e);}
   }else S.visual.conflicts++;
 }
}
function unlink(){
 try{S.role?.off?.(1039,S,castSignal);}catch(e){S.error=String(e);}
 try{S.target?.off?.(1012,S,hitSignal);}catch(e){S.error=String(e);}
 S.role=null;S.target=null;
}
function link(role,target){
 if(role===S.role&&target===S.target)return;
 unlink();S.role=role;S.target=target;
 role?.on?.(1039,S,castSignal);target?.on?.(1012,S,hitSignal);
}
function stop(reason='manual_stop'){
 S.enabled=false;
 if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);
 S.timer=null;unlink();S.focusTarget=null;S.focusId='';S.lastGroup=null;S.reason=reason;
 W.KVPV_PVP_LUOFENG?.stop?.('trutien_pvp_'+reason);
 return status();
}
function status(){
 const r=me(),t=component(r,'_Het')?.target;
 return {enabled:S.enabled,mode:'TRU_TIEN_PVP_BASIC_SPAM',scene:S.scene,inside:scope(),actor:actorId,
  targetId:id(t),targetType:prop(t,'type')??null,selectedPlayer:enemy(t,r),attacks:S.attacks,castSignals:S.signals,
  observedDirectHits:S.hits,confirmedHits:S.hits,matchedDamage:S.matchedDamage,blockedCooldown:S.blockedCooldown,
  thAttempts:S.thAttempts,basicAttempts:S.basicAttempts,lastGroup:S.lastGroup,
  focusLocked:S.focusLock,focusTargetId:S.focusId,focusBlocked:S.focusBlocked,focusSwitches:S.focusSwitches,
  lastSkill:S.lastSkill,lastCastAt:S.lastCastAt,paceMs:10,armed:S.enabled,
  visual:{...S.visual,scope:'TRU_TIEN',visualOnly:true},
  tqSkillProfile:{requested:tqRoster.slice(),learned:[...learned(component(r,'_Eet'))].filter(x=>tqRoster.includes(x)),
    missing:tqRoster.filter(x=>!learned(component(r,'_Eet')).has(x)),source:'Tian Quan five native basics; no Tuyet Hoc or boss hooks'},
  companions:{enabled:S.companions,scanMs:50,attempts:{...S.companionAttempts},lastSkill:S.companionLastSkill,lastTarget:S.companionLastTarget,
    blocked:S.companionBlocked,retryAfter:{...S.companionRetryAfter},errors:S.companionErrors,nativePvPTargetAcceptanceRequired:true},
  skillIds:{th:[],basic:tqRoster.slice()},
  observedSkills:[...S.perSkill.values()].map(row=>({...row,averageDamage:row.hits?row.damage/row.hits:null})),
  autoDodge:S.autoDodge,dodge:W.KVPV_PVP_LUOFENG?.status?.()??null,
  allIn:true,autoRetreat:false,autoHeal:false,autoApproach:false,autoTarget:false,
  reason:S.reason,error:S.error,
  note:'TRU_TIEN only native 8001-8005, no outgoing TH. 9999 is visual-only and may not affect native cast gating. A player must be selected for attacks; arm may wait without one. Native cooldown/range/target still required.'};
}
function tick(){
 try{
  if(!S.enabled)return;
  if(!scope()||scene()!==S.scene||!own()){stop('left_trutien_or_actor_changed');return;}
  const r=me(),c=component(r,'_Het'),s=component(r,'_Eet'),t=c?.target;
  if(!enemy(t,r)){link(null,null);S.reason='waiting_player_target';return;}
  // Concentrate attacks on one selected opponent until observed dead/invalid.
  // Switching to a still-alive target requires explicit setFocusToSelected().
  if(S.focusLock&&S.focusId&&live(S.focusTarget)&&id(t)!==S.focusId){
    S.focusBlocked++;S.reason='focus_locked_switch_manual';return;
  }
  if(!S.focusLock&&S.focusId!==id(t))resetFocus(t);
  if(!S.focusId||!live(S.focusTarget))resetFocus(t);
  link(r,t);
  // PvP observer polls its selected target independently every 120ms.
  if(!live(r)||W._Ba?._rJ?._O$?.ins?.isDead===true){S.reason='player_dead';return;}
  if(W.document?.hidden===true||W.document?.hasFocus?.()===false){S.reason='unfocused';return;}
  if(Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)){S.reason='manual_ui';return;}
  // Recover a rearmed PvE owner at most once per 5 seconds, only when
  // Auto Daily is idle. Never spin-stop the owner on the 10ms attack timer.
  let owner=occupied();
  if((owner==='combat_mode_owner'||owner==='boss_owner')&&
     Date.now()-S.lastOwnerRecoveryAt>=5000&&typeof W.KVPV_MODE?.stop==='function'){
    S.lastOwnerRecoveryAt=Date.now();
    W.KVPV_MODE.stop('Tru Tien PvP selected player; transfer combat ownership');
    owner=occupied();
  }
  if(owner){
    S.reason=owner==='combat_mode_owner'||owner==='boss_owner'?'pvp_wait_owner_release':owner;
    return;
  }
  companionTick(r,t,Date.now()); // independent of master's native cooldown
  if(typeof c?.isCooldown!=='function'||c.isCooldown()!==false){S.blockedCooldown++;S.reason='native_cooldown';return;}
  if(typeof c?.isValidTarget!=='function'||c.isValidTarget()!==true){S.reason='native_target_invalid';return;}
  if(typeof c?.isValidRange!=='function'||c.isValidRange()!==true){S.reason='outside_native_range';return;}
  if(typeof s?._f7t!=='function'||typeof c?.combat!=='function'){S.reason='native_selector_unavailable';return;}
  const now=Date.now(),list=[...(Array.isArray(s._rtt)?s._rtt:[]),...(Array.isArray(s._wet)?s._wet:[])];
  const ready=list.filter(row=>Number.isFinite(Number(row?.[1]))&&Number(row[1])<now);
  const basic=ranked(ready.filter(row=>isBasic(row?.[0])));
  if(!basic.length){S.reason='no_ready_basic';return;}
  // Try ranked basics first. If the native selector declines that ordering,
  // retry the original ready basic order; never synthesize or force a cast.
  let skill=Number(s._f7t(basic,[],1));
  if(!isBasic(skill)||!basic.some(row=>Number(row?.[0])===skill)){
    const original=ready.filter(row=>isBasic(row?.[0]));
    if(original.length>1)skill=Number(s._f7t(original,[],1));
  }
  if(!isBasic(skill)||!basic.some(row=>Number(row?.[0])===skill)){
    S.reason='native_basic_selector_rejected';return;
  }
  if(c.target!==t||!enemy(t,r)){S.reason='target_changed';return;}
  if(S.focusLock&&S.focusId!==id(t)){S.reason='focus_changed';return;}
  // Dispatch immediately when native gates admit, keeping original per-skill cooldown.
  castBasicWithVisual(c,skill);S.attacks++;S.basicAttempts++;
  S.lastSkill=skill;S.lastCastAt=now;S.lastGroup='BASIC';S.reason='native_basic_cast';
 }catch(e){S.error=String(e?.message??e);S.reason='error';}
}
function start(opts={}){
 if(!opts||typeof opts!=='object')throw Error('Use start({autoDodge:true|false})');
 if(!own()||!scope())throw Error('Must be inside verified Tru Tien (native scene type 52)');
 const r=me(),c=component(r,'_Het'),s=component(r,'_Eet'),t=c?.target;
 // Allow arming with no selected player: wait rather than throwing or auto-targeting.
 if(typeof c?.combat!=='function'||typeof s?._f7t!=='function'||typeof c?.isCooldown!=='function')
   throw Error('Native player combat/selector/cooldown unavailable');
 if(!W.KVPV_PVP_LUOFENG?.start)throw Error('La Phong PvP observer from PR #2 is not loaded');
 const owner=occupied();
 if(owner==='daily_priority'||owner==='daily_job')throw Error('Auto Daily has priority; PvP will not interrupt it');
 if(owner){
   if(typeof W.KVPV_MODE?.stop!=='function')throw Error('Cannot release Boss combat owner; use KVPV_MODE.stop() first');
   W.KVPV_MODE.stop(); // Explicit PvP start takes over, disables auto reacquire monsters.
 }
 if(occupied())throw Error('Combat owner or Daily is still active; not taking over');
 if(S.enabled)stop('restart');
 S.enabled=true;S.scene=scene();S.autoDodge=opts.autoDodge===true;S.lastOwnerRecoveryAt=Date.now();
 S.focusLock=opts.focusLock!==false;S.companions=opts.companions!==false;S.lastCompanionPoll=-Infinity;S.companionRetryAfter={pet:0,fuwa:0,ride:0};
 if(enemy(t,r))resetFocus(t);else{S.focusTarget=null;S.focusId='';S.lastGroup=null;}
 try{
   if(enemy(t,r))link(r,t);else link(null,null);
   W.KVPV_PVP_LUOFENG.start({autoDodge:S.autoDodge});
   S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,10);
   S.reason=enemy(t,r)?'active':'waiting_player_target';return status();
 }catch(e){stop('start_failed');S.error=String(e?.message??e);throw e;}
}
W[KEY]=Object.freeze({start,stop,status,tick,setFocusToSelected,setVisualSpeed});
})();
/* KVPV_SKILL_SOURCE_END 76-trutien-pvp.js */
}

function __KVPV_SKILL_SOURCE_77_strongest_team_pvp_js() {
/* KVPV_SKILL_SOURCE_BEGIN 77-strongest-team-pvp.js */
/* Strongest Team PvP: native cast priority and selected-enemy TH dodge.
 * Scope is verified native scene 82 and the existing Strongest Team owner.
 * No synthetic RPC, cooldown rewrites, team-target switching or rewards.
 */
(() => {
'use strict';
const W=window,KEY='KVPV_STRONGEST_PVP',old=W[KEY];
try{old?.stop?.('reload');}catch(e){W.KVPV_V1?.diagnostics?.record?.(e);}
const actor=String(W.__KVPV_OWN_ACTOR_ID||'');
const C={enabled:true,nativeAttack:true,dodgeTH:true,pollMs:120};
const S={timer:null,armedDodge:false,casts:0,blocked:0,thCasts:0,basicCasts:0,transformCasts:0,
 lastSkill:null,lastCastAt:null,reason:'waiting_scene_82',lastError:'',enemyId:''};
const prop=(o,k)=>o?.property?.get?.(k);
const identity=o=>String(o?.id??prop(o,'id')??'');
const types=()=>W._d?._Yct??{};
const component=(role,key)=>types()[key]?role?.getComponent?.(types()[key]):null;
const me=()=>W._C?._Ba?.instance?.getRole?.(Number(actor))??null;
const owned=()=>!!actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;
const transformSkill=id=>W.KVPV_TRANSFORM10?.transformed?.()===true&&W.KVPV_TRANSFORM10?.has?.(Number(id))===true;
function castSkill(combat,id){if(transformSkill(id))return W.KVPV_TRANSFORM10.cast(combat,id);return combat.combat(id);}
const inEvent=()=>{
 const s=W.KVPV_STRONGEST_TEAM?.status?.();
 return s?.enabled===true&&s?.phase==='ACTIVE'&&s?.inside===true&&s?.open===true;
};
function enemyValid(target){
 if(!target||target.isValid===false||identity(target)===''||identity(target)===actor||Number(prop(target,'type'))!==4)return false;
 const m=W._Ba?._T3?._G_t?.instance;
 if(!m||String(m.selectTagetId)!==identity(target))return false;
 const opponents=m.getNearPlayerRank?.();
 return Array.isArray(opponents)&&opponents.some(x=>x&&String(x.objId)===identity(target)&&m.isMyTeam?.(x.color)===false);
}
function releaseDodge(reason){
 if(!S.armedDodge)return;
 try{W.KVPV_PVP_LUOFENG?.stop?.('strongest_team_'+reason);}catch(e){S.lastError=String(e);}
 S.armedDodge=false;
}
function dodge(target){
 if(!C.dodgeTH){releaseDodge('disabled');return;}
 const observer=W.KVPV_PVP_LUOFENG;
 if(!observer?.start||!observer?.status){S.reason='dodge_module_missing';return;}
 if(!S.armedDodge){
  if(observer.status().enabled){S.reason='other_dodge_owner';return;}
  observer.start({autoDodge:true,nearby:true});S.armedDodge=true;
 }else if(observer.status().enabled!==true){S.armedDodge=false;S.reason='dodge_stopped_elsewhere';return;}
 observer.sync?.();
}
const readySkills=(selector,at)=>{
 const rows=[...(Array.isArray(selector?._rtt)?selector._rtt:[]),
             ...(Array.isArray(selector?._wet)?selector._wet:[])];
 return rows.filter(row=>{
  const k=Number(row?.[0]),until=Number(row?.[1]);
   return Number.isSafeInteger(k)&&(k>=1001&&k<=1008||k>=8001&&k<=8005||transformSkill(k))&&
         Number.isFinite(until)&&until<at;
 });
};
function tick(){
 if(!C.enabled||!owned()){releaseDodge('inactive');S.reason='disabled_or_actor_changed';return;}
 if(!inEvent()){releaseDodge('scene_left');S.reason='waiting_scene_82';S.enemyId='';return;}
 if(W.KVPV_ENTRY_POLICY?.manual===true){releaseDodge('manual_policy');S.reason='manual_policy';return;}
 const role=me(),combat=component(role,'_Het'),selector=component(role,'_Eet'),target=combat?.target;
 if(!enemyValid(target)){releaseDodge('no_enemy');S.reason='waiting_verified_enemy';S.enemyId='';return;}
 S.enemyId=identity(target);
 if(W._Ba?._rJ?._O$?.ins?.isDead===true){releaseDodge('dead');S.reason='dead';return;}
 try{dodge(target);}catch(e){S.lastError=String(e);S.reason='dodge_error';}
 // A native lateral dodge gets a short exclusive movement window. Avoid
 // sending an attack in the same instant as an observed enemy TH.
 const d=S.armedDodge?W.KVPV_PVP_LUOFENG?.status?.():null;
 if(d?.lastDodgeAt!=null&&Date.now()-d.lastDodgeAt<180){
   S.reason='dodge_movement_priority';return;
 }
 if(!C.nativeAttack){S.reason='dodge_only';return;}
 if(W.document?.hidden===true||W.document?.hasFocus?.()===false||
    Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)){S.reason='manual_or_unfocused';return;}
 if(W.KVPV_BOSS_TEAM?.priority?.()===true||
    W.KVPV_TH300?.status?.(false)?.running===true||
    W.KVPV_HITRUN1?.status?.(false)?.running===true){S.reason='foreign_combat_owner';return;}
 if(typeof combat?.combat!=='function'||typeof combat?.isCooldown!=='function'||
    typeof combat?.isValidTarget!=='function'||typeof combat?.isValidRange!=='function'||
    typeof selector?._f7t!=='function'){S.reason='native_combat_unavailable';return;}
 if(combat.isCooldown()!==false||combat.isValidTarget()!==true||combat.isValidRange()!==true){
   S.blocked++;S.reason='native_cooldown_target_or_range';return;
 }
 const now=Date.now(),rows=readySkills(selector,now);
 // Native selectors decide within the ready group, TH before basic. Never forge a ready timestamp.
  const transformed=rows.filter(r=>transformSkill(r[0]));
  const th=rows.filter(r=>Number(r[0])>=1001&&Number(r[0])<=1008);
  const basic=rows.filter(r=>Number(r[0])>=8001&&Number(r[0])<=8005);
  const pool=transformed.length?transformed:th.length?th:basic;
 if(!pool.length){S.reason='no_native_ready_skills';return;}
 const skill=Number(selector._f7t(pool,[],1));
 if(!Number.isSafeInteger(skill)||!pool.some(r=>Number(r[0])===skill)){S.reason='selector_rejected';return;}
 if(!inEvent()||!enemyValid(combat.target)||combat.target!==target){S.reason='event_target_changed';return;}
  castSkill(combat,skill);
 S.casts++;S.lastCastAt=now;S.lastSkill=skill;
  if(transformSkill(skill)){S.transformCasts++;S.reason='native_transform_skill_cast';}
  else if(skill>=1001&&skill<=1008){S.thCasts++;S.reason='native_tian_quan_cast';}
  else{S.basicCasts++;S.reason='native_basic_cast';}
}
function safeTick(){try{tick();}catch(e){S.lastError=String(e?.message??e);S.reason='error';}}
function start(){
 C.enabled=true;
 if(S.timer===null)S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(safeTick,C.pollMs);
 safeTick();return status();
}
function stop(reason='manual_stop'){
 C.enabled=false;
 if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)?.(S.timer);
 S.timer=null;releaseDodge(reason);S.reason=reason;return status();
}
function status(){return {enabled:C.enabled,inside:inEvent(),actor,enemyId:S.enemyId,
  nativeCasts:S.casts,transformCasts:S.transformCasts,thCasts:S.thCasts,basicCasts:S.basicCasts,blocked:S.blocked,
 lastSkill:S.lastSkill,lastCastAt:S.lastCastAt,reason:S.reason,lastError:S.lastError,
 autoDodgeOwned:S.armedDodge,nearbyTH:W.KVPV_PVP_LUOFENG?.status?.()?.nearbyTH??0,
 dodge:W.KVPV_PVP_LUOFENG?.status?.()??null,
  combo:'native transformed skills, then Tuyet Hoc, then basics',config:{...C},note:'Only scene 82 and native non-teammate type-4 target. TH dodge requires observable remote 1039; cast and move attempts cannot guarantee server hits or successful evasion.'};}
W[KEY]=Object.freeze({start,stop,status,tick:safeTick,config:C});start();
})();/* KVPV_SKILL_SOURCE_END 77-strongest-team-pvp.js */
}

function __KVPV_SKILL_SOURCE_80_tienma_quyetchien_pvp_js() {
/* KVPV_SKILL_SOURCE_BEGIN 80-tienma-quyetchien-pvp.js */
/* Tien Ma Quyet Chien: Tian Quan Tuyet Hoc-first combo, with basic fallback.
 * Auto-arms. Active ONLY in native Camp War battle maps 2191..2194.
 * No fabricated packets, cooldown bypass, auto entry or target switching.
 */
(() => {
'use strict';
const W=window,KEY='KVPV_TIENMA_PVP',old=W[KEY];
let resume=true;
try{if(old)resume=old.status?.().enabled===true;}catch(e){W.KVPV_V1?.diagnostics?.record?.(e);}
try{old?.stop?.('reload');}catch(e){W.KVPV_V1?.diagnostics?.record?.(e);}
const actor=String(W.__KVPV_OWN_ACTOR_ID||'');
const C=Object.freeze({skills:[8001,8002,8003,8004,8005],tuyetHoc:[1001,1002,1003,1004,1005,1006,1007,1008],
 hpRetreat:0.10,hpResume:0.15,distance:600,fleeBelow:580,step:260,
 pollMs:150,idleMs:800,moveGapMs:450,maxScan:300,moveFactor:5});
const S={enabled:false,timer:null,timerMs:null,retreat:false,casts:0,moves:0,blocked:0,
 lastCast:null,lastMove:-Infinity,lastDestination:null,enemyId:'',nearDistance:null,
 thCasts:0,basicCasts:0,moveBase:null,moveApplied:null,reason:'off',lastError:''};
const MOVE={obj:null,base:null,applied:null};
const transformSkill=id=>W.KVPV_TRANSFORM10?.transformed?.()===true&&W.KVPV_TRANSFORM10?.has?.(Number(id))===true;
function castSkill(combat,id){if(transformSkill(id))return W.KVPV_TRANSFORM10.cast(combat,id);return combat.combat(id);}
const prop=(r,k)=>r?.property?.get?.(k);
const id=r=>String(r?.id??prop(r,'id')??'');
const comp=(r,k)=>{const type=W._d?._Yct?.[k];return type?r?.getComponent?.(type):null;};
const me=()=>W._C?._Ba?.instance?.getRole?.(Number(actor))??null;
const owned=()=>!!actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;
const map=()=>Number(W._C?._Mn?._Cn?.currentID);
const war=()=>W._Ba?._W8t?.main?._mWt?.ins;
const camp=()=>W._Ba?._W8t?._O8t?.ins;
function inside(){
 const m=map(),entry=Number(W._Ba?._$a?._yo?.ins?.intoSce?.[0]);
 const w=war(),c=camp();
 return [2191,2192,2193,2194].includes(m)&&entry===m&&
  Number(w?.status)===3&&Number(w?.fightTime)>0&&
  [0,1].includes(Number(c?.myCampType));
}
function alive(r){
 const hp=prop(r,'hp');
 return !!r&&r.isValid!==false&&Number(prop(r,'status'))!==1024&&
  (!Array.isArray(hp)||Number(hp[0])>0);
}
const pos=r=>{
 const p=prop(r,'position'),x=Number(p?.x),y=Number(p?.y);
 return p&&Number.isFinite(x)&&Number.isFinite(y)?{x,y}:null;
};
function enemy(r,self){
 const side=Number(prop(r,'campType'));
 return alive(r)&&r!==self&&id(r)!==actor&&!!id(r)&&
  Number(prop(r,'type'))===4&&[0,1].includes(side)&&
  side!==Number(camp()?.myCampType)&&
  Number(prop(self,'campType'))===Number(camp()?.myCampType);
}
function restoreMove(){if(MOVE.obj&&MOVE.obj.speed===MOVE.applied)MOVE.obj.speed=MOVE.base;MOVE.obj=null;MOVE.base=null;MOVE.applied=null;S.moveBase=null;S.moveApplied=null;}
function applyMove(self){const mover=comp(self,'_zet');if(!mover||!Number.isFinite(Number(mover.speed))||Number(mover.speed)<=0){restoreMove();return false;}
 if(MOVE.obj!==mover){restoreMove();MOVE.obj=mover;MOVE.base=Number(mover.speed);MOVE.applied=MOVE.base*C.moveFactor;}
 else if(mover.speed!==MOVE.applied){MOVE.base=Number(mover.speed);MOVE.applied=MOVE.base*C.moveFactor;}
 mover.speed=MOVE.applied;S.moveBase=MOVE.base;S.moveApplied=MOVE.applied;return true;}
function nearest(self,selected){
 const p=pos(self);if(!p)return null;
 let best=null,bestD=Infinity;
 const inspect=r=>{
  if(!enemy(r,self))return;
  const q=pos(r);if(!q)return;
  const d=Math.hypot(q.x-p.x,q.y-p.y);
  if(d<bestD){bestD=d;best={id:id(r),distance:d,ownPos:p,enemyPos:q};}
 };
 inspect(selected);
 const roles=W._C?._Ba?.instance?.getRoles?.();
 if(roles&&typeof roles==='object'){
  let n=0;for(const r of Object.values(roles)){if(++n>C.maxScan)break;inspect(r);}
 }
 return best;
}
const canRun=()=>W.document?.hidden!==true&&W.document?.hasFocus?.()!==false&&
 Date.now()>=Number(W.__KVPV_USER_UI_UNTIL||0)&&
 W.KVPV_ENTRY_POLICY?.manual!==true&&
 W.KVPV_BOSS_TEAM?.priority?.()!==true&&
 W.KVPV_HITRUN1?.status?.(false)?.running!==true;
function flee(self,selected){
 const threat=nearest(self,selected);
 if(!threat){S.enemyId='';S.nearDistance=null;S.reason='retreat_no_verified_enemy';return;}
 S.enemyId=threat.id;S.nearDistance=Number(threat.distance.toFixed(1));
 if(threat.distance>=C.fleeBelow){S.reason='distance_safe';return;}
 const move=comp(self,'_zet');
 if(typeof move?.moveTo!=='function'){S.reason='native_movement_unavailable';return;}
 const now=Date.now();
 if(now-S.lastMove<C.moveGapMs){S.reason='retreat_move_throttled';return;}
 let dx=threat.ownPos.x-threat.enemyPos.x,dy=threat.ownPos.y-threat.enemyPos.y;
 const norm=Math.hypot(dx,dy);
 if(norm<0.001){dx=1;dy=0;}else{dx/=norm;dy/=norm;}
 const step=Math.min(C.step,Math.max(0,C.distance+20-threat.distance));
 const dest={x:Math.round(threat.ownPos.x+dx*step),y:Math.round(threat.ownPos.y+dy*step)};
 if(move.running?.()===true&&S.lastDestination&&
  Math.hypot(dest.x-S.lastDestination.x,dest.y-S.lastDestination.y)<50){
  S.reason='retreat_moving';return;
 }
 move.moveTo(dest.x,dest.y);
 S.lastMove=now;S.lastDestination=dest;S.moves++;S.reason='retreat_kiting_600';
}
function attack(self,combat,selector,selected){
 if(!enemy(selected,self)){S.reason='waiting_selected_enemy';return;}
 S.enemyId=id(selected);
 if(typeof combat?.combat!=='function'||typeof combat?.isCooldown!=='function'||
  typeof combat?.isValidTarget!=='function'||typeof combat?.isValidRange!=='function'||
  typeof selector?._f7t!=='function'){S.reason='native_skill_components_missing';return;}
 if(combat.isCooldown()!==false||combat.isValidTarget()!==true||combat.isValidRange()!==true){
  S.blocked++;S.reason='native_cooldown_target_or_range';return;
 }
 const now=Date.now(),rows=[
  ...(Array.isArray(selector?._rtt)?selector._rtt:[]),
  ...(Array.isArray(selector?._wet)?selector._wet:[])
  ].filter(r=>(C.tuyetHoc.includes(Number(r?.[0]))||C.skills.includes(Number(r?.[0]))||transformSkill(r?.[0]))&&Number.isFinite(Number(r?.[1]))&&Number(r[1])<now);
  const transformed=rows.filter(r=>transformSkill(r[0])),th=rows.filter(r=>C.tuyetHoc.includes(Number(r[0]))),basic=rows.filter(r=>C.skills.includes(Number(r[0]))),pool=transformed.length?transformed:th.length?th:basic;
 if(!pool.length){S.reason='no_native_ready_tian_quan_skills';return;}
 const picked=Number(selector._f7t(pool,[],1));
 if(!pool.some(r=>Number(r[0])===picked)){S.reason='native_selector_rejected';return;}
 if(!inside()||!enemy(combat.target,self)||combat.target!==selected)return;
  castSkill(combat,picked);
 S.casts++;S.lastCast=now;S.lastSkill=picked;
  if(transformSkill(picked)){S.transformCasts=(S.transformCasts||0)+1;S.reason='native_transform_skill_cast';}
  else if(C.tuyetHoc.includes(picked)){S.thCasts++;S.reason='native_tian_quan_tuyet_hoc_cast';}
 else{S.basicCasts++;S.reason='native_tian_quan_basic_cast';}
}
function tick(){
 if(!S.enabled)return;
 if(!owned()||!inside()){restoreMove();S.reason='outside_verified_tien_ma';S.retreat=false;return;}
 if(!canRun()){restoreMove();S.reason='manual_or_foreign_owner';return;}
 const mode=W.KVPV_MODE?.status?.(false)?.mode;
 if(mode&&mode!=='OFF'){
  if(typeof W.KVPV_MODE?.stop==='function')W.KVPV_MODE.stop('yield_to_tien_ma_quyet_chien');
  restoreMove();S.reason='yield_previous_combat_owner';return;
 }
 if(W.KVPV_TH300?.status?.(false)?.running===true){restoreMove();S.reason='boss_combat_owner';return;}
 const self=me();
 if(!alive(self)||W._Ba?._rJ?._O$?.ins?.isDead===true){restoreMove();S.reason='player_dead';return;}
 applyMove(self);
 const hp=prop(self,'hp'),h=Number(hp?.[0]),max=Number(hp?.[1]);
 if(!Array.isArray(hp)||!Number.isFinite(h)||!Number.isFinite(max)||max<=0){
  S.reason='hp_unavailable';return;
 }
 const ratio=h/max;
 if(ratio<=C.hpRetreat)S.retreat=true;
 else if(ratio>C.hpResume)S.retreat=false;
 const combat=comp(self,'_Het'),selected=combat?.target;
 if(S.retreat){flee(self,selected);return;}
 S.nearDistance=null;attack(self,combat,comp(self,'_Eet'),selected);
}
function safeTick(){
 try{tick();}catch(e){S.lastError=String(e?.message??e);S.reason='error';}
 finally{if(S.enabled)schedule();}
}
function schedule(){
 const interval=inside()?C.pollMs:C.idleMs;
 if(S.timer!==null&&S.timerMs===interval)return;
 if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)?.(S.timer);
 S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(safeTick,interval);
 S.timerMs=interval;
}
function status(){
 const self=me(),hp=prop(self,'hp');
 return {enabled:S.enabled,inside:inside(),map:map(),actor,skills:[...C.tuyetHoc,...C.skills,...(W.KVPV_TRANSFORM10?.skills?.().map(x=>x.id)||[])],combo:'native transformed skills, Tuyet Hoc, then basics',
  hpPercent:Array.isArray(hp)&&Number(hp[1])>0?Number((100*hp[0]/hp[1]).toFixed(1)):null,
  retreat:S.retreat,enemyId:S.enemyId,lastSkill:S.lastSkill,transformCasts:S.transformCasts||0,thCasts:S.thCasts,basicCasts:S.basicCasts,moveSpeed:{factor:C.moveFactor,active:!!MOVE.obj,base:S.moveBase,applied:S.moveApplied},nearestEnemyDistance:S.nearDistance,
  targetDistance:C.distance,casts:S.casts,moves:S.moves,blocked:S.blocked,
  lastDestination:S.lastDestination,reason:S.reason,lastError:S.lastError,
  config:{...C},note:'Native Tian Quan skill rotation, verified rival camp, 3x local movement speed. Retreat at 10%, resume above 15%; range 600 is a movement goal, not a server guarantee.'};
}
function stop(reason='manual_stop'){
 S.enabled=false;if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)?.(S.timer);
 S.timer=null;S.timerMs=null;S.retreat=false;restoreMove();S.reason=reason;return status();
}
function start(){
 if(!owned())throw Error('Game actor not ready; cannot arm Tien Ma PvP');
 S.enabled=true;safeTick();return status();
}
W[KEY]=Object.freeze({start,stop,status,tick:safeTick,config:C});
if(resume&&owned())start();
})();
/* KVPV_SKILL_SOURCE_END 80-tienma-quyetchien-pvp.js */
}

function __KVPV_SKILL_SOURCE_81_tranh_ba_tu_phuong_pvp_js() {
/* KVPV_SKILL_SOURCE_BEGIN 81-tranh-ba-tu-phuong-pvp.js */
/* Tranh Ba Tu Phuong cross-server PvP. Native Tuyet Hoc-first combo against the selected enemy.
 * Requires verified event calendar and explicitly calibrated non-common map.
 * No fabricated RPC, target selection, rewards, cooldown overrides or auto entry.
 */
(() => {
  'use strict';
  const W=window,KEY='KVPV_TRANH_BA_TU_PHUONG',old=W[KEY];
  try{old?.stop?.('reload');}catch(_){}
  const actor=String(W.__KVPV_OWN_ACTOR_ID||'');
  const C={pollMs:1,mapId:null,enabled:true,moveGapMs:80,stopDistance:180,maxChaseDistance:2000,visualSpeed:99999};
   const S={timer:null,casts:0,th:0,basic:0,transform:0,blocked:0,reason:'map_not_calibrated',error:'',lastSkill:null,readyTH:0,readyBasic:0,moves:0,lastMoveAt:0,visualScaled:0,visualUnavailable:0};
  const MOVE={obj:null,base:null,applied:null,factor:99};
  const prop=(r,k)=>r?.property?.get?.(k);
  const id=r=>String(r?.id??prop(r,'id')??'');
  const own=()=>!!actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;
  const map=()=>Number(W._C?._Mn?._Cn?.currentID);
  const entryMap=()=>Number(W._Ba?._$a?._yo?.ins?.intoSce?.[0]);
  const liveEvent=()=>{
    const calendar=W.KVPV_DAILY?.lichData?.();
    return Array.isArray(calendar?.active)&&calendar.active.some(e=>e?.key==='tranh_ba_tu_phuong');
  };
  const inside=()=>own()&&Number.isSafeInteger(C.mapId)&&C.mapId>0&&
    map()===C.mapId&&entryMap()===C.mapId&&
    W._Ba?._$a?.SceneUtil?.isCommonScene===false&&liveEvent();
  const comp=(r,k)=>{const t=W._d?._Yct?.[k];return t?r?.getComponent?.(t):null;};
   const transformSkill=skill=>W.KVPV_TRANSFORM10?.transformed?.()===true&&W.KVPV_TRANSFORM10?.has?.(Number(skill))===true;
  const me=()=>W._C?._Ba?.instance?.getRole?.(Number(actor));
  function releaseMoveBoost(){if(MOVE.obj&&MOVE.obj.speed===MOVE.applied)MOVE.obj.speed=MOVE.base;MOVE.obj=null;MOVE.base=null;MOVE.applied=null;}
  function applyMoveBoost(self){
    const mover=comp(self,'_zet');if(!mover||!Number.isFinite(Number(mover.speed))||Number(mover.speed)<=0){releaseMoveBoost();return false;}
    if(MOVE.obj!==mover){releaseMoveBoost();MOVE.obj=mover;MOVE.base=Number(mover.speed);MOVE.applied=MOVE.base*MOVE.factor;}
    else if(mover.speed!==MOVE.applied){MOVE.base=Number(mover.speed);MOVE.applied=MOVE.base*MOVE.factor;}
    mover.speed=MOVE.applied;return true;
  }
  const enemy=(r,self)=>{
    const a=Number(prop(self,'campType')),b=Number(prop(r,'campType'));
    const hp=prop(r,'hp');
    return !!r&&r.isValid!==false&&id(r)!==actor&&!!id(r)&&
      Number(prop(r,'type'))===4&&Number.isInteger(a)&&Number.isInteger(b)&&
      a>=0&&b>=0&&a!==b&&
      (!Array.isArray(hp)||Number(hp[0])>0);
  };
  const ready=(selector,now)=>[...(Array.isArray(selector?._rtt)?selector._rtt:[]),
    ...(Array.isArray(selector?._wet)?selector._wet:[])].filter(x=>{
      const skill=Number(x?.[0]),time=Number(x?.[1]);
       return Number.isInteger(skill)&&(skill>=1001&&skill<=1008||skill>=8001&&skill<=8005||transformSkill(skill))&&
        Number.isFinite(time)&&time<now;
    });
  // Native walking at the game's default speed; avoid repeated path resets.
  function approach(self,target){
    const p=prop(self,'position'),q=prop(target,'position');
    if(!p||!q||![p.x,p.y,q.x,q.y].every(Number.isFinite))return false;
    const dx=q.x-p.x,dy=q.y-p.y,d=Math.hypot(dx,dy);
    if(d<=C.stopDistance||d>C.maxChaseDistance)return false;
    const now=Date.now();
    if(now-S.lastMoveAt<C.moveGapMs)return false;
    const mover=comp(self,'_zet');
    if(typeof mover?.moveTo!=='function')return false;
    const travel=d-C.stopDistance;
    mover.moveTo(Math.round(p.x+dx/d*travel),Math.round(p.y+dy/d*travel));
    S.lastMoveAt=now;S.moves++;S.reason='native_walk_toward_enemy';
    return true;
  }
  function tick(){
    if(!C.enabled){S.reason='disabled';return;}
    if(!inside()){releaseMoveBoost();S.reason=C.mapId===null?'map_not_calibrated':'outside_verified_event';return;}
    if(W.KVPV_ENTRY_POLICY?.manual===true||W.document?.hidden===true||
       W.document?.hasFocus?.()===false||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)){
      releaseMoveBoost();S.reason='manual_or_unfocused';return;
    }
    if(W.KVPV_HITRUN1?.status?.(false)?.running||
       W.KVPV_TH300?.status?.(false)?.running||
       W.KVPV_BOSS_TEAM?.priority?.()){
      releaseMoveBoost();S.reason='other_combat_owner';return;
    }
    const self=me(),combat=comp(self,'_Het'),selector=comp(self,'_Eet'),target=combat?.target;
    if(W._Ba?._rJ?._O$?.ins?.isDead===true){releaseMoveBoost();S.reason='dead';return;}
    applyMoveBoost(self);
    if(!enemy(target,self)){S.reason='waiting_verified_selected_enemy';return;}
    if(typeof combat?.combat!=='function'||typeof combat?.isCooldown!=='function'||
       typeof combat?.isValidTarget!=='function'||typeof combat?.isValidRange!=='function'||
       typeof selector?._f7t!=='function'){S.reason='native_combat_missing';return;}
    if(combat.isValidRange()!==true){approach(self,target);S.reason=S.reason==='native_walk_toward_enemy'?S.reason:'target_out_of_range';return;}
    if(combat.isCooldown()!==false||combat.isValidTarget()!==true){
      S.blocked++;S.reason='native_cooldown_range_or_target';return;
    }
     const rows=ready(selector,Date.now()),transformed=rows.filter(x=>transformSkill(x[0])),
       th=rows.filter(x=>Number(x[0])>=1001&&Number(x[0])<=1008),
       basic=rows.filter(x=>Number(x[0])>=8001&&Number(x[0])<=8005),pool=transformed.length?transformed:th.length?th:basic;
    S.readyTH=th.length;S.readyBasic=basic.length;
    if(!pool.length){S.reason='no_native_ready_combo_skills';return;}
    const skill=Number(selector._f7t(pool,[],1));
    if(!pool.some(x=>Number(x[0])===skill)){S.reason='native_selector_rejected';return;}
    if(!inside()||combat.target!==target||!enemy(target,self))return;
     if(transformSkill(skill)){W.KVPV_TRANSFORM10.cast(combat,skill);S.casts++;S.transform++;S.lastSkill=skill;S.reason='native_transform_skill_cast';return;}
     const avatar=combat?._Qrt,original=avatar?.getActionTween,own=avatar&&Object.getOwnPropertyDescriptor(avatar,'getActionTween');
    let wrapped=null,visual=false;
    try{
      let action=null;try{action=combat?._mvt?.(skill)?.[5];}catch(_){}
      if(typeof original==='function'&&typeof action==='string'&&action.trim()){
        wrapped=function(...args){
          if(args[0]!==action)return original.apply(this,args);
          const before=Number(args[2]??1);if(!Number.isFinite(before)||before<=0)return original.apply(this,args);
          args[2]=Math.min(C.visualSpeed,before*C.visualSpeed);
          return original.apply(this,args);
        };
        try{
          Object.defineProperty(avatar,'getActionTween',{configurable:true,writable:true,enumerable:!!own?.enumerable,value:wrapped});
          visual=avatar.getActionTween===wrapped;
        }catch(_){S.visualUnavailable++;}
      }else S.visualUnavailable++;
      combat.combat(skill);S.casts++;S.lastSkill=skill;if(visual)S.visualScaled++;
    }finally{
      if(visual&&avatar.getActionTween===wrapped){
        if(own)Object.defineProperty(avatar,'getActionTween',own);else delete avatar.getActionTween;
      }
    }
    if(skill>=1001&&skill<=1008){S.th++;S.reason='native_tuyet_hoc_combo_cast';}
    else{S.basic++;S.reason='native_basic_combo_fallback';}
  }
  function safeTick(){try{tick();}catch(e){S.error=String(e);S.reason='error';}}
  function start(){if(!own())throw Error('Actor not ready');C.enabled=true;
    if(S.timer===null)S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(safeTick,C.pollMs);
    safeTick();return status();}
  function stop(reason='manual'){C.enabled=false;
    if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)?.(S.timer);
    S.timer=null;releaseMoveBoost();S.reason=reason;return status();}
  function calibrateHere(){
    if(!own()||!liveEvent()||W._Ba?._$a?.SceneUtil?.isCommonScene!==false||
       map()!==entryMap()||!(map()>0))throw Error('Enter verified event map first');
    C.mapId=map();return status();
  }
   function status(){return {actor,enabled:C.enabled,eventActive:liveEvent(),inside:inside(),
     map:map(),verifiedMap:C.mapId,casts:S.casts,transformCasts:S.transform,thCasts:S.th,basicCasts:S.basic,
     combo:{priority:'native transformed skills, Tuyet Hoc 1001-1008, then native basics 8001-8005',readyTuyetHoc:S.readyTH,readyBasic:S.readyBasic,pollMs:C.pollMs,moveGapMs:C.moveGapMs,visualSpeed:C.visualSpeed,transformVisualSpeed:null,visualOnly:false,nativeSkillSpeed:true},
    blocked:S.blocked,moves:S.moves,movementSpeedBoost:{factor:MOVE.factor,active:!!MOVE.obj,base:MOVE.base,applied:MOVE.applied,clientSide:true,serverAcceptedUnverified:true},visualScaled:S.visualScaled,visualUnavailable:S.visualUnavailable,lastSkill:S.lastSkill,reason:S.reason,error:S.error};}
  W[KEY]=Object.freeze({start,stop,status,tick:safeTick,calibrateHere});
  if(own())start();
})();
/* KVPV_SKILL_SOURCE_END 81-tranh-ba-tu-phuong-pvp.js */
}

function __KVPV_SKILL_SOURCE_84_basic310_universal_js() {
/* KVPV_SKILL_SOURCE_BEGIN 84-basic310-universal.js */
/* Generic idle combat: native basic 8001 at standoff 310.
 * Crystal map 2992/type 35 uses native basics 8001..8005 without a standoff goal. */
(()=>{'use strict';
const W=window,old=W.KVPV_BASIC310_UNIVERSAL;old?.stop?.('reload');
const actor=String(W.__KVPV_OWN_ACTOR_ID??'');
const S={enabled:true,timer:null,casts:0,moves:0,lastMoveAt:0,lastCastAt:0,crystalCasts:0,crystalBlocked:0,distance:null,reason:'waiting',error:'',skill:8001};
const BASIC_IDS=Object.freeze([8001,8002,8003,8004,8005]),CRYSTAL_MAP=2992,CRYSTAL_SCENE=35;
const G={combat:null,wrapper:null,descriptor:null};
const own=()=>!!actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;
const pos=r=>{const p=r?.property?.get?.('position'),x=Number(p?.x),y=Number(p?.y);return Number.isFinite(x)&&Number.isFinite(y)?{x,y}:null;};
const get=(r,k)=>{const t=W._d?._Yct?.[k];return t?r?.getComponent?.(t):null;};
function excluded(){const e=W.KVPV_TRANH_BA_TU_PHUONG?.status?.();return e?.inside===true||(e?.eventActive===true&&W._Ba?._$a?.SceneUtil?.isCommonScene===false&&(e?.verifiedMap==null||Number(e.map)===Number(e.verifiedMap)));}
function crystalScope(){const id=Number(W._C?._Mn?._Cn?.currentID??W._Ba?._$a?._yo?.ins?.intoSce?.[0]);return id===CRYSTAL_MAP&&Number(W._ft?._po?.ins?.getCfgById?.(id)?.[7])===CRYSTAL_SCENE&&Number(W._Ba?._$a?._yo?.ins?.intoSce?.[0])===CRYSTAL_MAP;}
function releaseCrystalGuard(){const g=G;if(!g.combat)return;try{if(g.combat.combat===g.wrapper){if(g.descriptor)Object.defineProperty(g.combat,'combat',g.descriptor);else delete g.combat.combat;}}catch(e){S.error=String(e?.message??e);}G.combat=G.wrapper=G.descriptor=null;}
function installCrystalGuard(c){if(G.combat===c&&c?.combat===G.wrapper)return true;releaseCrystalGuard();if(typeof c?.combat!=='function')return false;const original=c.combat,descriptor=Object.getOwnPropertyDescriptor(c,'combat');if(descriptor?.configurable===false&&descriptor.writable!==true)return false;const wrapper=function(skill,...args){if(crystalScope()&&!BASIC_IDS.includes(Number(skill))){S.crystalBlocked++;return;}return original.apply(this,[skill,...args]);};try{Object.defineProperty(c,'combat',{configurable:descriptor?.configurable??true,writable:descriptor?.writable??true,enumerable:descriptor?.enumerable??false,value:wrapper});G.combat=c;G.wrapper=wrapper;G.descriptor=descriptor;return true;}catch(e){S.error=String(e?.message??e);return false;}}
function priority(){
 if(W.KVPV_ENTRY_POLICY?.manual===true||W.KVPV_EVENT_PRIORITY?.hold?.()||W.KVPV_BOSS_TEAM?.priority?.())return 'priority_owner';
 const q=W.KVPV_DAILY?.quickState?.();
 if(q?.running===true&&!['idle','rảnh','ranh',''].includes(String(q?.job??'').toLowerCase()))return 'daily_job';
 if(W.KVPV_TH300?.status?.(false)?.running===true||W.KVPV_HITRUN1?.status?.(false)?.running===true)return 'boss_owner';
 const mode=W.KVPV_MODE?.status?.(false)?.mode;
 if(mode&&mode!=='OFF')return 'mode_owner';
 const lease=W.KVPV?.core?.scene?.status?.();
 if(lease?.owner)return 'scene_lease';
 const beast=W.KVPV_BEAST_ISLAND?.status?.();
 if(beast?.phase==='ACTIVE'||beast?.phase==='ENTERING')return 'beast_task';
 if(W._Ba?._K_t?._Z7t?.ins?.gathering===true)return 'gathering';
 return null;
}
function tick(){try{
 if(!S.enabled||!own()){releaseCrystalGuard();S.reason='actor_unavailable';return;}
 if(excluded()){releaseCrystalGuard();S.reason='excluded_tranh_ba_tu_phuong';return;}
 const crystal=crystalScope();
 if(!crystal)releaseCrystalGuard();
 if(W._Ba?._rJ?._O$?.ins?.isDead===true){releaseCrystalGuard();S.reason='dead';return;}
 if(Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)){releaseCrystalGuard();S.reason='manual_ui';return;}
 const blocked=priority();if(blocked){releaseCrystalGuard();S.reason=blocked;return;}
 const role=W._C?._Ba?.instance?.getRole?.(Number(actor)),combat=get(role,'_Het'),selector=get(role,'_Eet'),mover=get(role,'_zet'),target=combat?.target;
 if(crystal&&!installCrystalGuard(combat)){S.reason='crystal_guard_unavailable';return;}
 const kind=Number(target?.property?.get?.('type'));
 if(!target||target.isValid===false||kind!==1){S.reason='waiting_monster_target';return;}
 const hp=target.property?.get?.('hp');
 if(Array.isArray(hp)&&Number(hp[0])<=0){S.reason='target_dead';return;}
 if(crystal){
  if(combat.target!==target||typeof combat?.isCooldown!=='function'||combat.isCooldown()!==false){S.reason='crystal_native_cooldown';return;}
  if(combat.isValidTarget?.()!==true||combat.isValidRange?.()!==true){S.reason='crystal_native_range_or_target';return;}
  const rows=[...(Array.isArray(selector?._rtt)?selector._rtt:[]),...(Array.isArray(selector?._wet)?selector._wet:[])],now=Date.now();
  const ready=rows.filter(r=>BASIC_IDS.includes(Number(r?.[0]))&&Number(r?.[1])<now);
  if(!ready.length||typeof selector?._f7t!=='function'||typeof combat?.combat!=='function'){S.reason='crystal_waiting_basic';return;}
  const skill=Number(selector._f7t(ready,[],1));
  if(!BASIC_IDS.includes(skill)||combat.target!==target||!crystalScope()||priority()){S.reason='crystal_selector_changed';return;}
  combat.combat(skill);S.crystalCasts++;S.lastCastAt=now;S.reason='crystal_cast_'+skill;return;
 }
 const a=pos(role),b=pos(target);if(!a||!b){S.reason='waiting_positions';return;}
 const d=Math.hypot(a.x-b.x,a.y-b.y);S.distance=Math.round(d*100)/100;
 if(d<1){S.reason='overlap';return;}
 if(Math.abs(d-310)>5){
  if(typeof mover?.moveTo==='function'&&Date.now()-S.lastMoveAt>=800&&mover.running?.()!==true){
   const x=b.x+(a.x-b.x)*310/d,y=b.y+(a.y-b.y)*310/d;
   if(Number.isFinite(x)&&Number.isFinite(y)){mover.moveTo(x,y);S.moves++;S.lastMoveAt=Date.now();}
  }
  S.reason='moving_to_310';return;
 }
 if(typeof combat?.isCooldown!=='function'||combat.isCooldown()!==false){S.reason='native_cooldown';return;}
 if(combat.isValidTarget?.()!==true||combat.isValidRange?.()!==true){S.reason='native_range_or_target';return;}
 const rows=[...(Array.isArray(selector?._rtt)?selector._rtt:[]),...(Array.isArray(selector?._wet)?selector._wet:[])];
 const ready=rows.filter(r=>Number(r?.[0])===8001&&Number(r?.[1])<Date.now());
 if(!ready.length||typeof selector?._f7t!=='function'||typeof combat?.combat!=='function'){S.reason='waiting_basic8001';return;}
 if(Number(selector._f7t(ready,[],1))!==8001){S.reason='selector_rejected';return;}
 if(combat.target!==target||excluded()||priority()){S.reason='owner_changed';return;}
 combat.combat(8001);S.casts++;S.lastCastAt=Date.now();S.reason='cast_8001';
 }catch(e){S.error=String(e?.message??e);S.reason='error';}}
function stop(reason='stop'){S.enabled=false;releaseCrystalGuard();const clear=W.KVPV_V1?.timers?.clearInterval??W.clearInterval;if(S.timer!==null&&typeof clear==='function')clear(S.timer);S.timer=null;S.reason=reason;}
function status(){return {enabled:S.enabled,skill:8001,crystalMap:CRYSTAL_MAP,crystalScene:CRYSTAL_SCENE,crystalSkills:BASIC_IDS.slice(),crystalMode:'native range, no standoff',crystalCasts:S.crystalCasts,crystalBlockedNonBasic:S.crystalBlocked,goal:crystalScope()?null:310,tolerance:crystalScope()?null:5,pollMs:1,insideExcludedEvent:excluded(),distance:S.distance,casts:S.casts,moves:S.moves,lastCastAt:S.lastCastAt,reason:S.reason,error:S.error,nativeCooldown:true,nativeRange:true};}
W.KVPV_BASIC310_UNIVERSAL=Object.freeze({status,tick,stop});
const schedule=W.KVPV_V1?.timers?.setInterval??W.setInterval;
if(typeof W.setInterval==='function'&&typeof schedule==='function')S.timer=schedule(tick,1);
tick();
})();/* KVPV_SKILL_SOURCE_END 84-basic310-universal.js */
}

function __KVPV_SKILL_SOURCE_85_le_hoi_khu_thu_boss_js() {
/* KVPV_SKILL_SOURCE_BEGIN 85-le-hoi-khu-thu-boss.js */
/* Le Hoi Khu Thu boss combat, map-calibrated only.
 * No invented entry RPC, no auto-purchase, no server range overrides. */
(()=>{'use strict';
const W=window,KEY='KVPV_LE_HOI_KHU_THU',prior=W[KEY],actor=String(W.__KVPV_OWN_ACTOR_ID??'');
try{prior?.stop?.('reload');}catch(_){}
const S={enabled:true,timer:null,mapId:null,sceneType:null,casts:0,moves:0,filtered:0,lastMove:0,distance:null,reason:'requires_event_map_calibration',error:''};
const G={combat:null,wrapper:null,descriptor:null};
const own=()=>!!actor&&String(W._Ba?._rJ?._O$?.ins?.actorId??'')===actor&&!W.__KVPV_UNIVERSAL_HALTED;
const map=()=>Number(W._C?._Mn?._Cn?.currentID);
const type=()=>Number(W._ft?._po?.ins?.getCfgById?.(map())?.[7]);
const get=(r,k)=>{const id=W._d?._Yct?.[k];return id?r?.getComponent?.(id):null;};
const pos=r=>{const p=r?.property?.get?.('position');return Number.isFinite(Number(p?.x))&&Number.isFinite(Number(p?.y))?{x:Number(p.x),y:Number(p.y)}:null;};
const excluded=()=>W.KVPV_TRANH_BA_TU_PHUONG?.status?.()?.inside===true;
function releaseGuard(){const g=G;if(!g.combat)return;try{if(g.combat.combat===g.wrapper){if(g.descriptor)Object.defineProperty(g.combat,'combat',g.descriptor);else delete g.combat.combat;}}catch(e){S.error=String(e?.message??e);}G.combat=G.wrapper=G.descriptor=null;}
function installGuard(c){if(G.combat===c&&c?.combat===G.wrapper)return true;releaseGuard();if(typeof c?.combat!=='function')return false;const original=c.combat,descriptor=Object.getOwnPropertyDescriptor(c,'combat');if(descriptor?.configurable===false&&descriptor.writable!==true)return false;const wrapper=function(skill,...args){if(S.enabled&&own()&&inside()&&Number(skill)!==8001){S.filtered++;return;}return original.call(this,skill,...args);};try{Object.defineProperty(c,'combat',{configurable:descriptor?.configurable??true,writable:descriptor?.writable??true,enumerable:descriptor?.enumerable??false,value:wrapper});G.combat=c;G.wrapper=wrapper;G.descriptor=descriptor;return true;}catch(e){S.error=String(e?.message??e);return false;}}
const inside=()=>own()&&S.mapId>0&&map()===S.mapId&&type()===S.sceneType&&
 Number(W._Ba?._$a?._yo?.ins?.intoSce?.[0])===S.mapId&&!excluded();
function tick(){try{
 if(!S.enabled||!own()){releaseGuard();S.reason='disabled_or_actor';return;}
 if(!inside()){releaseGuard();S.reason='outside_calibrated_event';return;}
 const role=W._C?._Ba?.instance?.getRole?.(Number(actor)),combat=get(role,'_Het');
 if(!installGuard(combat)){S.reason='combat_guard_unavailable';return;}
 if(W.KVPV_ENTRY_POLICY?.manual===true||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)||
 W._Ba?._rJ?._O$?.ins?.isDead===true){S.reason='manual_or_dead';return;}
 const lease=W.KVPV?.core?.scene?.status?.();
 if(lease?.owner||W.KVPV_HITRUN1?.status?.(false)?.running===true||
 W.KVPV_TH300?.status?.(false)?.running===true||W.KVPV_EVENT_PRIORITY?.hold?.()){
 S.reason='other_owner';return;}
 const selector=get(role,'_Eet'),mover=get(role,'_zet');
 const target=combat?.target;
 if(!target||target.isValid===false||Number(target.property?.get?.('type'))!==1){S.reason='waiting_selected_boss';return;}
 const hp=target.property?.get?.('hp');if(Array.isArray(hp)&&Number(hp[0])<=0){S.reason='target_dead';return;}
 const a=pos(role),b=pos(target);if(!a||!b){S.reason='waiting_positions';return;}
 const d=Math.hypot(a.x-b.x,a.y-b.y);S.distance=Math.round(d*100)/100;
 if(Math.abs(d-310)>5){
  if(d>1&&typeof mover?.moveTo==='function'&&Date.now()-S.lastMove>=800&&mover.running?.()!==true){
   mover.moveTo(b.x+(a.x-b.x)*310/d,b.y+(a.y-b.y)*310/d);S.moves++;S.lastMove=Date.now();
  }
  S.reason='moving_to_310';return;
 }
 if(combat?.isCooldown?.()!==false){S.reason='native_cooldown';return;}
 if(combat?.isValidTarget?.()!==true||combat?.isValidRange?.()!==true){S.reason='native_range_invalid';return;}
 const now=Date.now(),list=[...(Array.isArray(selector?._rtt)?selector._rtt:[]),...(Array.isArray(selector?._wet)?selector._wet:[])].filter(x=>Number(x?.[0])===8001&&Number(x?.[1])<now);
 if(!list.length||typeof selector?._f7t!=='function'||typeof combat?.combat!=='function'){S.reason='waiting_8001';return;}
 if(Number(selector._f7t(list,[],1))!==8001||combat.target!==target||!inside()){S.reason='selector_changed';return;}
 combat.combat(8001);S.casts++;S.reason='cast_8001';
 }catch(e){S.error=String(e?.message??e);S.reason='error';}}
function calibrateHere(){if(!own()||!(map()>0)||!Number.isFinite(type())||
 W._Ba?._$a?.SceneUtil?.isCommonScene!==false||excluded()||
 Number(W._Ba?._$a?._yo?.ins?.intoSce?.[0])!==map())throw Error('Enter the verified Le Hoi Khu Thu event map first');
 S.mapId=map();S.sceneType=type();S.reason='calibrated';tick();return status();}
function stop(reason='stopped'){S.enabled=false;releaseGuard();const clear=W.KVPV_V1?.timers?.clearInterval??W.clearInterval;if(S.timer!=null&&typeof clear==='function')clear(S.timer);S.timer=null;S.reason=reason;}
function status(){return {enabled:S.enabled,calibratedMap:S.mapId,sceneType:S.sceneType,inside:inside(),skill:8001,goal:310,pollMs:1,casts:S.casts,moves:S.moves,distance:S.distance,reason:S.reason,error:S.error,filteredNon8001:S.filtered,nativeCooldown:true,allowKNB:false};}
W[KEY]=Object.freeze({calibrateHere,status,tick,stop});
const schedule=W.KVPV_V1?.timers?.setInterval??W.setInterval;
if(typeof W.setInterval==='function'&&typeof schedule==='function')S.timer=schedule(tick,1);
})();/* KVPV_SKILL_SOURCE_END 85-le-hoi-khu-thu-boss.js */
}

function __KVPV_SKILL_SOURCE_86_dinh_cao_basic_combo_js() {
/* KVPV_SKILL_SOURCE_BEGIN 86-dinh-cao-basic-combo.js */
(() => {
 'use strict';
 const W=window,KEY='KVPV_DINH_CAO_BASIC_COMBO',old=W[KEY];
 try{old?.stop?.('reload');}catch(_){}
 const actor=String(W.__KVPV_OWN_ACTOR_ID||''),isBasic=id=>Number.isSafeInteger(Number(id))&&Number(id)>=8001&&Number(id)<=8005;
 const C={enabled:true,pollMs:16,moveGapMs:80,castGapMs:80,moveFactor:99,stopDistance:180,maxChaseDistance:2000};
 const S={timer:null,reason:'outside_combo_scope',lastError:'',blockedNonBasic:0,filteredSelections:0,casts:0,moves:0,lastSkill:null,lastMoveAt:0,lastCastAt:0,movement:'waiting'};
 let siegeCheckAt=0,siegeReady=false;
 const H={selector:null,selectorFn:null,selectorDescriptor:null,combat:null,combatFn:null,combatDescriptor:null};
 const MOVE={obj:null,base:null,applied:null};
 const own=()=>!!actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;
 const map=()=>Number(W._C?._Mn?._Cn?.currentID),entryMap=()=>Number(W._Ba?._$a?._yo?.ins?.intoSce?.[0]);
 const peakInside=()=>own()&&map()===2161&&entryMap()===2161&&Number(W._Ba?._$a?.SceneUtil?.curScene)===14&&W._Ba?._$a?.SceneUtil?.isCommonScene===false;
 const honorInside=()=>own()&&map()===2162&&entryMap()===2162&&Number(W._Ba?._$a?.SceneUtil?.curScene)===42&&W._Ba?._$a?.SceneUtil?.isCommonScene===false;
 const territoryInside=()=>own()&&map()===2164&&entryMap()===2164&&Number(W._Ba?._$a?.SceneUtil?.curScene)===44&&W._Ba?._$a?.SceneUtil?.isCommonScene===false;
 const eightInside=()=>{if(!own()||map()!==7101||entryMap()!==7101||Number(W._Ba?._$a?.SceneUtil?.curScene)!==71||W._Ba?._$a?.SceneUtil?.isCommonScene!==false)return false;
  const event=W.KVPV_EIGHT_FLOOR?.status?.(),lease=W.KVPV?.core?.scene?.status?.();return event?.enabled===true&&event?.phase==='FIGHTING'&&event?.inside===true&&lease?.owner==='combat'&&lease?.tag==='thien-the-8-tang';};
 const siegeInside=()=>{const m=map();if(!own()||![3101,3102].includes(m)||entryMap()!==m||W._Ba?._$a?.SceneUtil?.isCommonScene!==false)return false;
  if(Date.now()>=siegeCheckAt){siegeCheckAt=Date.now()+500;try{const row=W.KVPV_EVENTS13?.status?.(false)?.rows?.find(x=>x.key==='sa_thanh');siegeReady=row?.ready===true&&row?.active===true&&[1,2].includes(Number(row?.phase));}catch(_){siegeReady=false;}}
  return siegeReady;};
 const inside=()=>peakInside()||eightInside()||siegeInside()||honorInside();
 const role=()=>W._C?._Ba?.instance?.getRole?.(Number(actor))??W._C?._Ba?.instance?.getRole?.(actor);
 const component=(r,k)=>{const t=W._d?._Yct?.[k];return t?r?.getComponent?.(t):null;};
 function restoreHook(key){const obj=H[key],fn=H[key+'Fn'],descriptor=H[key+'Descriptor'],prop=key==='selector'?'_f7t':'combat';if(obj&&fn&&obj[prop]===fn){if(descriptor)Object.defineProperty(obj,prop,descriptor);else delete obj[prop];}H[key]=null;H[key+'Fn']=null;H[key+'Descriptor']=null;}
 function restoreMove(){if(MOVE.obj&&MOVE.obj.speed===MOVE.applied)MOVE.obj.speed=MOVE.base;MOVE.obj=null;MOVE.base=null;MOVE.applied=null;}
 function movement(self){const mover=component(self,'_zet'),boost=W.KVPV_EXPERIMENTAL_BOOST?.status?.();
  if(boost?.enabled===true&&Number(boost.moveFactor)>=9){restoreMove();return 'shared_fast_boost';}
  if(MOVE.obj!==mover)restoreMove();if(!mover||!Number.isFinite(Number(mover.speed))||Number(mover.speed)<=0)return 'waiting_movement_component';
  if(!MOVE.obj){MOVE.obj=mover;MOVE.base=Number(mover.speed);MOVE.applied=MOVE.base*C.moveFactor;}
  else if(mover.speed!==MOVE.applied){MOVE.base=Number(mover.speed);MOVE.applied=MOVE.base*C.moveFactor;}
  mover.speed=MOVE.applied;return 'local_fast_boost';}
 function attachSelector(selector){if(H.selector===selector&&selector?._f7t===H.selectorFn)return;restoreHook('selector');if(typeof selector?._f7t!=='function')return;
  const descriptor=Object.getOwnPropertyDescriptor(selector,'_f7t');if(descriptor&&!descriptor.configurable)return;const native=selector._f7t;
  const fn=function(activeRows,commonRows,mode,...rest){
   if(!C.enabled||!inside()||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)||this!==selector)return native.call(this,activeRows,commonRows,mode,...rest);
   const a=Array.isArray(activeRows)?activeRows.filter(row=>isBasic(row?.[0])):activeRows,b=Array.isArray(commonRows)?commonRows.filter(row=>isBasic(row?.[0])):commonRows;
   if(Array.isArray(activeRows)&&Array.isArray(commonRows)&&!a.length&&!b.length){S.filteredSelections++;S.reason='waiting_ready_basic';return -1;}
   const selected=native.call(this,a,b,mode,...rest);if(isBasic(selected)){S.lastSkill=Number(selected);S.filteredSelections++;return selected;}S.blockedNonBasic++;return -1;
  };
  Object.defineProperty(selector,'_f7t',{value:fn,writable:true,configurable:true,enumerable:!!descriptor?.enumerable});H.selector=selector;H.selectorFn=fn;H.selectorDescriptor=descriptor;}
 function attachCombat(combat){if(H.combat===combat&&combat?.combat===H.combatFn)return;restoreHook('combat');if(typeof combat?.combat!=='function')return;
  const descriptor=Object.getOwnPropertyDescriptor(combat,'combat');if(descriptor&&!descriptor.configurable)return;const native=combat.combat;
  const fn=function(skill,...args){if(C.enabled&&inside()&&Date.now()>=Number(W.__KVPV_USER_UI_UNTIL||0)&&this===combat&&!isBasic(skill)){S.blockedNonBasic++;S.reason='blocked_non_basic_skill';return false;}return native.call(this,skill,...args);};
  Object.defineProperty(combat,'combat',{value:fn,writable:true,configurable:true,enumerable:!!descriptor?.enumerable});H.combat=combat;H.combatFn=fn;H.combatDescriptor=descriptor;}
 function approach(self,combat,target){if(!target||target.isValid===false||combat?.isValidTarget?.()!==true||combat?.isValidRange?.()===true)return;
  const p=self?.property?.get?.('position'),q=target?.property?.get?.('position'),mover=component(self,'_zet');
  if(!p||!q||![p.x,p.y,q.x,q.y].every(Number.isFinite)||typeof mover?.moveTo!=='function'||Date.now()-S.lastMoveAt<C.moveGapMs)return;
  const dx=q.x-p.x,dy=q.y-p.y,d=Math.hypot(dx,dy);if(d<=C.stopDistance||d>C.maxChaseDistance)return;
  const travel=d-C.stopDistance;mover.moveTo(Math.round(p.x+dx/d*travel),Math.round(p.y+dy/d*travel));S.lastMoveAt=Date.now();S.moves++;S.reason='moving_toward_native_target';}
 function tick(){try{
  const territory=territoryInside();
  if(!C.enabled||(!inside()&&!territory)||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)){restoreHook('selector');restoreHook('combat');restoreMove();if(C.enabled)S.reason=inside()||territory?'user_interaction':'outside_combo_scope';return;}
  const self=role();if(!self){restoreMove();S.reason='waiting_player_component';return;}const combat=component(self,'_Het'),selector=component(self,'_Eet'),target=combat?.target;
  if(territory){
   restoreHook('selector');restoreHook('combat');
   if(W._Ba?._rJ?._O$?.ins?.isDead===true){restoreMove();S.movement='waiting';S.reason='dead';return;}
   if(!target||target.isValid===false||Number(target?.property?.get?.('type'))!==1){restoreMove();S.movement='waiting_boss_target';S.reason='waiting_native_boss_target';return;}
   if(combat?.isValidTarget?.()!==true){restoreMove();S.movement='waiting_boss_target';S.reason='native_boss_target_invalid';return;}
   const inRange=combat?.isValidRange?.();
   if(inRange===true){restoreMove();S.movement='native_range';S.reason='boss_in_native_range';return;}
   if(inRange!==false){restoreMove();S.movement='waiting_native_range';S.reason='waiting_native_boss_range';return;}
   S.reason='moving_to_native_boss';
   S.movement=movement(self);approach(self,combat,target);
   if(S.reason!=='moving_toward_native_target'&&S.movement==='waiting_movement_component')S.reason='waiting_movement_component';
   return;
  }
  attachSelector(selector);attachCombat(combat);S.movement=movement(self);
  if(W._Ba?._rJ?._O$?.ins?.isDead===true){S.reason='dead';return;}
  const targetType=Number(target?.property?.get?.('type'));
  if(!target||target.isValid===false||!(eightInside()?targetType===1:siegeInside()||honorInside()?targetType===4:[1,4].includes(targetType))){S.reason='waiting_native_valid_target';return;}
  if(!honorInside())approach(self,combat,target);
  if(Date.now()-S.lastCastAt<C.castGapMs){S.reason='local_cast_pacing';return;}
  if(combat?.isCooldown?.()!==false){S.reason='native_cooldown';return;}
  if(combat?.isValidTarget?.()!==true){S.reason='native_target_invalid';return;}
  if(combat?.isValidRange?.()!==true){if(S.reason!=='moving_toward_native_target')S.reason='waiting_native_basic_range';return;}
  const now=Date.now(),rows=[...(Array.isArray(selector?._rtt)?selector._rtt:[]),...(Array.isArray(selector?._wet)?selector._wet:[])],ready=rows.filter(row=>isBasic(row?.[0])&&Number(row?.[1])<now);
  if(!ready.length||typeof selector?._f7t!=='function'||typeof combat?.combat!=='function'){S.reason='waiting_ready_basic';return;}
  const skill=Number(selector._f7t(ready,[],1));if(!isBasic(skill)||combat.target!==target||!inside()||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)){S.reason='basic_selector_rejected';return;}
  combat.combat(skill);S.casts++;S.lastSkill=skill;S.lastCastAt=Date.now();S.reason='cast_basic_'+skill;
  }catch(e){S.lastError=String(e?.message??e);S.reason='error';}}
 function start(){if(!own()){S.reason='waiting_actor';return status();}C.enabled=true;if(S.timer===null)S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,C.pollMs);tick();return status();}
 function stop(reason='manual'){C.enabled=false;if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;restoreHook('selector');restoreHook('combat');restoreMove();S.reason=reason;return status();}
 function status(){const self=role(),combat=component(self,'_Het'),target=combat?.target;return {enabled:C.enabled,inside:inside()||territoryInside(),scope:territoryInside()?'LANH_DIA':honorInside()?'VINH_DU':siegeInside()?'SA_THANH':eightInside()?'THIEN_THE_8_TANG':peakInside()?'TRANH_BA_DINH_CAO':'OTHER',movementOnly:territoryInside(),map:map(),scene:Number(W._Ba?._$a?.SceneUtil?.curScene),skills:[8001,8002,8003,8004,8005],tuyetHoc:false,normalOnlyHook:!!H.combat&&H.combat.combat===H.combatFn,filteredSelections:S.filteredSelections,blockedNonBasic:S.blockedNonBasic,casts:S.casts,lastSkill:S.lastSkill,moves:S.moves,moveFactor:C.moveFactor,stopDistance:C.stopDistance,maxChaseDistance:C.maxChaseDistance,castGapMs:C.castGapMs,movement:S.movement,targetType:target?.property?.get?.('type')??null,targetId:String(target?.id??''),nativeCooldownPreserved:true,nativeRangePreserved:true,reason:S.reason,lastError:S.lastError};}
 W[KEY]=Object.freeze({start,stop,sync:tick,status});if(own())start();
})();
/* KVPV_SKILL_SOURCE_END 86-dinh-cao-basic-combo.js */
}
