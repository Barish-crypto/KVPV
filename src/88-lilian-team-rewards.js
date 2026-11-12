/* Claim only completed Lian Lian and Fight Team rewards.
 * Reuses the game's claim RPCs and red-point/state gates from its own UI.
 * Does not enter activities, create/join teams, or spend currency. */
(() => {
  'use strict';
  const W=window,old=W.KVPV_LILIAN_TEAM_REWARDS,carry=old?._handoff?.();old?.stop?.('reload');
  const actor=String(W.__KVPV_OWN_ACTOR_ID||''),storageKey='KVPV_LILIAN_TEAM_REWARDS_V1_'+actor;
  const S={enabled:true,timer:null,lastClaim:0,sentAt:[],locks:new Map(),acked:0,reason:'waiting_models',lastError:''};
  const red=id=>W._Ba?._Xo?._Ko?.instance?.getRpKeyState?.(id)===true;
  const lian=()=>W._Ba?._$qt?._tKt?.ins;
  const lianRpc=()=>W._Ba?._$qt?.TemperCrtl?.ins;
  const team=()=>W._Ba?._Zpt?._Jpt?.inst;
  const teamRpc=()=>W._Ba?._Zpt?._nZt?.ins;
  const t=()=>Date.now();
  function owned(){return !!actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&
    !W.__KVPV_UNIVERSAL_HALTED&&W.KVPV_ENTRY_POLICY?.manual!==true;}
  function persist(){try{sessionStorage.setItem(storageKey,JSON.stringify({sentAt:S.sentAt,locks:[...S.locks]}));}catch(_){}}
  function restore(){
    if(carry?.actor===actor){S.sentAt=carry.sentAt||[];S.locks=new Map(carry.locks||[]);S.acked=carry.acked||0;return;}
    try{const x=JSON.parse(sessionStorage.getItem(storageKey)||'null');
      if(x&&Array.isArray(x.sentAt)&&Array.isArray(x.locks)){S.sentAt=x.sentAt;S.locks=new Map(x.locks);}}
    catch(_){}
  }
  function ack(key){if(S.locks.delete(key)){S.acked++;persist();}}
  function candidates(){
    const out=[],l=lian(),lr=lianRpc(),tm=team(),tr=teamRpc();
    if(l&&lr&&red(17)){
      if(Array.isArray(l.tasks))for(const row of l.tasks){
        const id=Number(row?.[0]);if(Array.isArray(row)&&Number.isSafeInteger(id)&&id>0&&Number(row[1])===2)ack('lian-task:'+id);
        if(typeof lr.getLiLianTaskAward==='function'&&Array.isArray(row)&&Number.isSafeInteger(id)&&id>0&&Number(row[1])===1)
          out.push({key:'lian-task:'+id,kind:'lian_task',id,ready:true,run:()=>lr.getLiLianTaskAward(id)});
      }
      const daily=Number(l.getOtherValue?.(3))===1;
      if(S.locks.has('lian-daily')&&!daily)ack('lian-daily');
      if(daily&&typeof lr.getLiLianDayAward==='function')out.push({key:'lian-daily',kind:'lian_daily',ready:true,run:()=>lr.getLiLianDayAward()});
    }
    if(tm&&tr&&red(408)&&Array.isArray(tm.fightTeamCopyAchievement))for(const row of tm.fightTeamCopyAchievement){
      const id=Number(row?.[0]);if(Array.isArray(row)&&Number.isSafeInteger(id)&&id>0&&Number(row[2])===2)ack('team-achievement:'+id);
      if(typeof tr.GetFightTeamCopyAchievementReward==='function'&&Array.isArray(row)&&Number.isSafeInteger(id)&&id>0&&Number(row[2])===1)
        out.push({key:'team-achievement:'+id,kind:'team_achievement',id,ready:true,run:()=>tr.GetFightTeamCopyAchievementReward(id)});
    }
    const taskRows=tm?._wzn&&typeof tm._wzn==='object'?Object.values(tm._wzn):[];
    if(tm&&tr&&red(407))for(const row of taskRows){
      const id=Number(row?.[0]);if(Array.isArray(row)&&Number.isSafeInteger(id)&&id>0&&Number(row[2])===2)ack('team-task:'+id);
      if(typeof tr.GetFightTeamCopyTaskReward==='function'&&Array.isArray(row)&&Number.isSafeInteger(id)&&id>0&&Number(row[2])===1)
        out.push({key:'team-task:'+id,kind:'team_task',id,ready:true,run:()=>tr.GetFightTeamCopyTaskReward(id)});
    }
    return out;
  }
  function tick(){
    if(!S.enabled)return;
    if(!owned()){S.reason=actor?'actor_or_manual_guard':'waiting_actor';return;}
    try{
      const now=t();S.sentAt=S.sentAt.filter(x=>Number.isFinite(x)&&now-x<60*60*1000);
      const ready=candidates().find(x=>x.ready&&!S.locks.has(x.key));
      if(!ready){S.reason='no_verified_ready_reward';return;}
      if(S.sentAt.length>=12){S.reason='hourly_claim_limit';return;}
      if(now-S.lastClaim<9000){S.reason='claim_cooldown';return;}
      const lock={kind:ready.kind,id:ready.id??null,at:now,status:'waiting_server_ack'};
      S.locks.set(ready.key,lock);S.sentAt.push(now);S.lastClaim=now;persist();
      try{const result=ready.run();if(result===false)throw Error('native_reward_api_returned_false');
        S.reason='reward_requested_waiting_ack';}
      catch(e){lock.error=String(e?.message||e);S.lastError=lock.error;S.reason='reward_request_uncertain';persist();}
    }catch(e){S.lastError=String(e?.message||e);S.reason='error';}
  }
  function start(){if(S.timer!==null)return status();S.enabled=true;
    S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,5000);tick();return status();}
  function stop(reason='manual'){S.enabled=false;S.reason=reason;
    if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;}
  function status(){return {enabled:S.enabled,actor,reason:S.reason,locks:[...S.locks.entries()],
    sentLastHour:S.sentAt.filter(x=>t()-x<60*60*1000).length,acked:S.acked,lastError:S.lastError};}
  restore();
  W.KVPV_LILIAN_TEAM_REWARDS=Object.freeze({start,stop,tick,status,
    _handoff:()=>({actor,sentAt:S.sentAt,locks:[...S.locks.entries()],acked:S.acked})});
  start();
})();
