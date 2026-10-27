(() => {
  window.KVPV_SKILL1008_TRIAL=Object.freeze({create(env){
    let trial=null;const history=[];
    const clone=x=>JSON.parse(JSON.stringify(x));
    function totals(){const s=env.metrics()?.current;return s?{key:s.key,damage:s.summary.matchedDamage,attempts:s.skills.reduce((n,r)=>n+r.attempts,0),hits:s.skills.reduce((n,r)=>n+r.hits,0),recovery:s.timeMs.recovery||0,animation:s.timeMs.waiting_native_animation||0}:null;}
    function finish(reason){if(!trial)return;const end=totals(),now=env.now(),t=trial;trial=null;const compatible=end?.key===t.baseline?.key,ms=Math.max(0,now-t.sampleAt);history.push({mode:t.mode,context:t.context,startedAt:t.startedAt,endedAt:now,reason,complete:reason==='complete'&&compatible,sampleMs:ms,matchedDamage:compatible?end.damage-t.baseline.damage:null,matchedDps:compatible&&ms>0?(end.damage-t.baseline.damage)*1000/ms:null,attempts:compatible?end.attempts-t.baseline.attempts:null,hits:compatible?end.hits-t.baseline.hits:null,recoveryMs:compatible?end.recovery-t.baseline.recovery:null,animationMs:compatible?end.animation-t.baseline.animation:null,config:t.config});if(history.length>8)history.shift();}
    function sync(){if(!trial)return;const context=env.context();if(!context||context.key!==trial.context.key||context.settings!==trial.context.settings){finish('context_or_settings_changed');return;}const now=env.now();if(!trial.baseline){if(now<trial.sampleAt)return;trial.baseline=totals();trial.sampleAt=now;if(!trial.baseline){finish('metrics_unavailable');return;}}if(now-trial.sampleAt>=trial.durationMs)finish('complete');}
    return Object.freeze({
      start(mode='on',seconds=60){if(!['on','off'].includes(mode))throw Error('Use on or off');if(!Number.isFinite(seconds)||seconds<30||seconds>180)throw Error('Sample must be 30–180 seconds');const context=env.context();if(!context)throw Error('Chọn Boss Thiên Quan đang đánh, bật 5 chiêu tay + TH và dừng đo tầm trước.');if(!env.metrics()?.current)throw Error('Chưa có trận DPS đang chạy.');finish('restarted');const now=env.now();trial={mode,context:clone(context),startedAt:now,sampleAt:now+15000,durationMs:seconds*1000,baseline:null,config:env.config()};return this.report();},
      blocks(id){sync();return Number(id)===1008&&trial?.mode==='off';},sync,
      stop(){finish('manual_stop');return this.report();},
      report(){sync();return clone({active:trial?{mode:trial.mode,context:trial.context,warmupMsRemaining:Math.max(0,trial.sampleAt-env.now()),sampleMs:trial.baseline?Math.max(0,env.now()-trial.sampleAt):0,durationMs:trial.durationMs}:null,history,default1008Enabled:!trial||trial.mode==='on',limits:'Manual on/off samples; restores native selection on finish/stop/context change. Matched direct-hit DPS only. 15s warmup does not prove buffs have expired. Compare equal-duration complete samples on the same Boss type, map and settings; HP phases, buffs and random damage can confound results. No automatic winner or permanent exclusion.'});}
    });
  }});
})();
