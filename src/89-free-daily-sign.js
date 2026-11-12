/* Claim only the current free daily sign-in reward when the native game model
 * says it is available. The paid sign-in API is never called. */
(() => {
  'use strict';
  const W=window,old=W.KVPV_FREE_DAILY_SIGN,carry=old?._handoff?.();old?.stop?.('reload');
  const actor=String(W.__KVPV_OWN_ACTOR_ID||''),key='KVPV_FREE_DAILY_SIGN_V1_'+actor;
  const S={enabled:true,timer:null,lastQuery:0,lastClaim:0,locks:new Map(),sentAt:[],acked:0,reason:'waiting_model',lastError:''};
  const model=()=>W._Ba?._R1a?.ins,api=()=>W._Ba?._S5n?.ins,now=()=>Date.now();
  function owned(){return !!actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED&&W.KVPV_ENTRY_POLICY?.manual!==true;}
  function persist(){try{sessionStorage.setItem(key,JSON.stringify({sentAt:S.sentAt,locks:[...S.locks]}));}catch(_){}}
  function restore(){if(carry?.actor===actor){S.sentAt=carry.sentAt||[];S.locks=new Map(carry.locks||[]);S.acked=carry.acked||0;return;}try{const x=JSON.parse(sessionStorage.getItem(key)||'null');if(Array.isArray(x?.sentAt)&&Array.isArray(x?.locks)){S.sentAt=x.sentAt;S.locks=new Map(x.locks);}}catch(_){}}
  function tick(){
    if(!S.enabled)return;if(!owned()){S.reason=actor?'actor_or_manual_guard':'waiting_actor';return;}
    try{
      const t=now(),m=model(),r=api();if(!m||!r){S.reason='waiting_sign_model';return;}
      if(t-S.lastQuery>=10*60*1000&&typeof r.reqWelfareInfo==='function'){S.lastQuery=t;r.reqWelfareInfo();}
      const day=Number(m.curSignDay),info=Number.isSafeInteger(day)&&day>0?m.getSignInfo?.(day):null;
      if(!info||!Array.isArray(info)){S.reason='waiting_sign_info';return;}
      const free=typeof m.checkSignFreeAwdRp==='function'&&m.checkSignFreeAwdRp(day)===true;
      if(Number(info[1])===1){if(S.locks.delete(day)){S.acked++;persist();}S.reason='free_reward_already_claimed';return;}
      if(!free){S.reason='no_verified_free_reward';return;}
      S.sentAt=S.sentAt.filter(x=>Number.isFinite(x)&&t-x<3600000);
      if(S.locks.has(day)){S.reason='waiting_server_ack';return;}
      if(S.sentAt.length>=12){S.reason='hourly_claim_limit';return;}
      if(t-S.lastClaim<10000){S.reason='claim_cooldown';return;}
      if(typeof r.reqSignAwd!=='function'){S.reason='waiting_native_claim_api';return;}
      S.locks.set(day,{status:'waiting_server_ack',at:t});S.sentAt.push(t);S.lastClaim=t;persist();
      try{const result=r.reqSignAwd([day]);if(result===false)throw Error('native_reward_api_returned_false');S.reason='claim_requested_waiting_ack';}
      catch(e){S.lastError=String(e?.message||e);S.reason='reward_request_uncertain';persist();}
    }catch(e){S.lastError=String(e?.message||e);S.reason='error';}
  }
  function start(){if(S.timer!==null)return status();S.enabled=true;S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,5000);tick();return status();}
  function stop(reason='manual'){S.enabled=false;S.reason=reason;if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;}
  function status(){return {enabled:S.enabled,actor,reason:S.reason,locks:[...S.locks],sentLastHour:S.sentAt.filter(x=>now()-x<3600000).length,acked:S.acked,lastError:S.lastError};}
  restore();W.KVPV_FREE_DAILY_SIGN=Object.freeze({start,stop,tick,status,_handoff:()=>({actor,sentAt:S.sentAt,locks:[...S.locks],acked:S.acked})});start();
})();
