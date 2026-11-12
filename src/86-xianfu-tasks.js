/* Auto-claim only verified, completed Immortal Home tasks.
 * Read task state from the native model and use the game's reward API.
 * Never start upgrades, purchases, building, or activity entry. */
(() => {
  'use strict';
  const W=window,old=W.KVPV_XIANFU_TASKS,carry=old?._handoff?.();old?.stop?.('reload');
  const actor=String(W.__KVPV_OWN_ACTOR_ID||'');
  const dateKey=()=>new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Ho_Chi_Minh'}).format(new Date());
  let day=dateKey();
  const storageKey='KVPV_XIANFU_TASKS_V1_'+actor;
  const S={enabled:true,timer:null,lastQuery:0,lastClaim:0,claims:new Map(),sentAt:[],acked:0,
    reason:'waiting_model',lastError:''};
  const model=()=>W._Ba?._Q9?._ttt?.ins;
  const api=()=>W._Ba?._Q9?._$dt?.ins;
  const cfgApi=()=>W._ft?._ubt?.ins;
  function owned(){return !!actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&
    !W.__KVPV_UNIVERSAL_HALTED&&W.KVPV_ENTRY_POLICY?.manual!==true;}
  function persist(){try{sessionStorage.setItem(storageKey,JSON.stringify({day,sentAt:S.sentAt,claims:[...S.claims]}));}catch(_){}}
  function restore(){
    if(carry?.actor===actor){S.sentAt=carry.sentAt||[];S.claims=new Map(carry.claims||[]);S.acked=carry.acked||0;return;}
    try{const x=JSON.parse(sessionStorage.getItem(storageKey)||'null');
      if(x?.day===day&&Array.isArray(x.sentAt)&&Array.isArray(x.claims)){S.sentAt=x.sentAt;S.claims=new Map(x.claims);}}
    catch(_){}
  }
  function eventIsOpen(conf){
    const type=Number(conf?.[6]);
    if(type===1)return true;
    if(type===2){const eventId=Number(conf?.[3]?.[0]);
      return Number.isSafeInteger(eventId)&&eventId>0&&model()?.CheckEventIsOpen?.(eventId)===true;}
    return false;
  }
  function query(){
    const r=api();if(!r||typeof r.getXianfuTaskList!=='function')return false;
    S.lastQuery=Date.now();r.getXianfuTaskList();return true;
  }
  function tick(){
    if(!S.enabled)return;
    if(W.KVPV_RED_DOT_MODULE?.ownsProgression?.()){S.reason='delegated_to_red_dot_module';return;}
    if(!owned()){S.reason=actor?'actor_or_manual_guard':'waiting_actor';return;}
    try{
      const today=dateKey();if(today!==day){day=today;S.claims.clear();S.sentAt=[];persist();}
      const now=Date.now(),m=model(),r=api(),rows=m?.taskList;
      if(!m||!r){S.reason='waiting_xianfu_model';return;}
      if(now-S.lastQuery>=10*60*1000&&!query()){S.reason='waiting_task_api';return;}
      if(!Array.isArray(rows)){S.reason='waiting_task_list';return;}
      const sent=S.sentAt.filter(t=>Number.isFinite(t)&&now-t<60*60*1000);S.sentAt=sent;
      if(sent.length>=15){S.reason='hourly_claim_limit';return;}
      if(now-S.lastClaim<4000){S.reason='claim_cooldown';return;}
      const config=cfgApi();if(typeof config?.getCfgById!=='function'){S.reason='waiting_task_config';return;}
      const activeRows=m.taskActivesValue,claimedRows=m.getDcs,activeValue=Number(m.taskValue);
      if(Array.isArray(activeRows)&&Array.isArray(claimedRows)&&Number.isFinite(activeValue)&&
        typeof r.getXianFuActivaAward==='function'){
        for(let index=0;index<activeRows.length;index++){
          const key='activity:'+index,threshold=Number(activeRows[index]);
          if(claimedRows.includes(index)){if(S.claims.has(key)){S.claims.delete(key);S.acked++;persist();}continue;}
          if(Number.isFinite(threshold)&&threshold>0&&activeValue>=threshold&&!S.claims.has(key)){
            const record={status:'waiting_server_ack',at:now};
            S.claims.set(key,record);S.sentAt.push(now);S.lastClaim=now;persist();
            try{const result=r.getXianFuActivaAward([index]);
              if(result===false)throw Error('native_reward_api_returned_false');
              S.reason='activity_reward_requested_waiting_ack';}
            catch(e){record.error=String(e?.message||e);S.reason='activity_reward_uncertain';S.lastError=record.error;persist();}
            return; // One reward RPC at a time; wait for the native claimed-index list.
          }
        }
      }
      for(const row of rows){
        if(!Array.isArray(row)||row.length<3)continue;
        const id=Number(row[0]),state=Number(row[2]);
        if(!Number.isSafeInteger(id)||id<=0)continue;
        const lock=S.claims.get(id);
        if(state===2){if(lock){S.claims.delete(id);S.acked++;persist();}continue;}
        if(state===0)continue;
        if(state!==1||lock)continue;
        const conf=config.getCfgById(id);if(!conf||!eventIsOpen(conf))continue;
        if(typeof r.getXianFuTaskAward!=='function'){S.reason='waiting_reward_api';return;}
        const record={status:'waiting_server_ack',at:now};
        S.claims.set(id,record);S.sentAt.push(now);S.lastClaim=now;persist();
        try{const result=r.getXianFuTaskAward([id]);
          if(result===false)throw Error('native_reward_api_returned_false');
          S.reason='reward_requested_waiting_ack';
        }catch(e){record.error=String(e?.message||e);S.reason='reward_request_uncertain';S.lastError=record.error;persist();}
        return; // One claim at a time; never replay an uncertain request.
      }
      S.reason='no_verified_completed_task';
    }catch(e){S.lastError=String(e?.message||e);S.reason='error';}
  }
  function start(){if(S.timer!==null)return status();S.enabled=true;
    S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,5000);tick();return status();}
  function stop(reason='manual'){S.enabled=false;S.reason=reason;
    if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;}
  function status(){return {enabled:S.enabled,actor,reason:S.reason,trackedClaims:[...S.claims.entries()],
    sentLastHour:S.sentAt.filter(t=>Date.now()-t<60*60*1000).length,acked:S.acked,lastError:S.lastError};}
  restore();
  W.KVPV_XIANFU_TASKS=Object.freeze({start,stop,tick,status,_handoff:()=>({actor,sentAt:S.sentAt,
    claims:[...S.claims.entries()],acked:S.acked})});
  start();
})();
