/* Thống kê thụ động từng trận Boss. Không phát lệnh, tạo timer hoặc điều chỉnh nhịp.
 * Giữ tối đa 20 trận, 64 chiêu/trận và 250 lần tung chiêu đang chờ/trận.
 * Hit ở đây là cặp tung chiêu/sát thương đã qua bộ lọc TH300, không phải toàn bộ sát thương của chiêu. */
(() => {
  window.KVPV_COMBAT_METRICS=Object.freeze({create(){
    let active=null;const completed=[];
    const at=()=>Date.now();
    const combatStates=new Set(['fighting','native_cooldown','skill_readiness','waiting_pace','basic_probe_cast','basic_probe_wait','basic_probe_waiting_ready','waiting_burst_gap','dungeon_native_finish_2pct']);
    const group=id=>id>=8001&&id<=8005?'basic':id>=1001&&id<=1008?'tuyetHoc':'other';
    const rate=(damage,ms)=>ms>0?damage*1000/ms:null;
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
