/* Auto-claim only Cross Server Copy achievements whose native row is ready.
 * The game UI exposes its claim button only for state 1 and sends that row's ID.
 * This module never enters PvP, occupies a stronghold, or builds a tower. */
(() => {
  'use strict';
  const W=window,old=W.KVPV_CROSSSERVER_ACHIEVEMENTS,carry=old?._handoff?.();old?.stop?.('reload');
  const actor=String(W.__KVPV_OWN_ACTOR_ID||''),storageKey='KVPV_CROSSSERVER_ACHIEVEMENTS_V1_'+actor;
  const S={enabled:true,timer:null,lastQuery:0,lastClaim:0,claims:new Map(),sentAt:[],acked:0,
    reason:'waiting_model',lastError:''};
  const model=()=>W._Ba?._gg?._Z5t?.inst;
  const api=()=>W._Ba?._gg?._Rhn?.ins;
  const now=()=>Date.now();
  function owned(){return !!actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&
    !W.__KVPV_UNIVERSAL_HALTED&&W.KVPV_ENTRY_POLICY?.manual!==true;}
  function readyGate(){return W._Ba?._Xo?._Ko?.instance?.getRpKeyState?.(471)===true;}
  function persist(){try{sessionStorage.setItem(storageKey,JSON.stringify({sentAt:S.sentAt,claims:[...S.claims]}));}catch(_){}}
  function restore(){
    if(carry?.actor===actor){S.sentAt=carry.sentAt||[];S.claims=new Map(carry.claims||[]);S.acked=carry.acked||0;return;}
    try{const x=JSON.parse(sessionStorage.getItem(storageKey)||'null');
      if(x&&Array.isArray(x.sentAt)&&Array.isArray(x.claims)){S.sentAt=x.sentAt;S.claims=new Map(x.claims);}}
    catch(_){}
  }
  function tick(){
    if(!S.enabled)return;
    if(!owned()){S.reason=actor?'actor_or_manual_guard':'waiting_actor';return;}
    try{
      const t=now(),m=model(),r=api(),rows=m?.crossServerCopyAchievement;
      if(!m||!r){S.reason='waiting_crossserver_model';return;}
      if(t-S.lastQuery>=10*60*1000&&typeof r.GetCrossServerCopyAchievementInfo==='function'){
        S.lastQuery=t;r.GetCrossServerCopyAchievementInfo();
      }
      if(!Array.isArray(rows)){S.reason='waiting_achievement_data';return;}
      const sent=S.sentAt.filter(x=>Number.isFinite(x)&&t-x<60*60*1000);S.sentAt=sent;
      if(sent.length>=12){S.reason='hourly_claim_limit';return;}
      if(t-S.lastClaim<5000){S.reason='claim_cooldown';return;}
      for(const row of rows){
        if(!Array.isArray(row)||row.length<3)continue;
        const id=Number(row[0]),state=Number(row[2]);
        if(!Number.isSafeInteger(id)||id<=0)continue;
        const lock=S.claims.get(id);
        if(state===2&&lock){S.claims.delete(id);S.acked++;persist();continue;}
        if(state!==1)continue;
        if(lock||!readyGate())continue;
        if(typeof r.GetCrossServerCopyAchievementReward!=='function'){S.reason='waiting_native_reward_api';return;}
        const record={status:'waiting_server_ack',at:t};
        S.claims.set(id,record);S.sentAt.push(t);S.lastClaim=t;persist();
        try{const result=r.GetCrossServerCopyAchievementReward(id);
          if(result===false)throw Error('native_reward_api_returned_false');
          S.reason='reward_requested_waiting_ack';
        }catch(e){record.error=String(e?.message||e);S.reason='reward_request_uncertain';
          S.lastError=record.error;persist();}
        return;
      }
      S.reason=readyGate()?'no_ready_achievement':'feature_or_reward_not_open';
    }catch(e){S.lastError=String(e?.message||e);S.reason='error';}
  }
  function start(){if(S.timer!==null)return status();S.enabled=true;
    S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,5000);tick();return status();}
  function stop(reason='manual'){S.enabled=false;S.reason=reason;
    if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;}
  function status(){return {enabled:S.enabled,actor,reason:S.reason,trackedClaims:[...S.claims.entries()],
    sentLastHour:S.sentAt.filter(x=>now()-x<60*60*1000).length,acked:S.acked,lastError:S.lastError};}
  restore();
  W.KVPV_CROSSSERVER_ACHIEVEMENTS=Object.freeze({start,stop,tick,status,
    _handoff:()=>({actor,sentAt:S.sentAt,claims:[...S.claims.entries()],acked:S.acked})});
  start();
})();
