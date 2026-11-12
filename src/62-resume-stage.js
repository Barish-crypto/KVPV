
 

(() => {

'use strict';const W=window,actor=String(W.__KVPV_OWN_ACTOR_ID||''),key='__KVPV_STAGE_RESUME_20261024_USER_V2';

if(!actor||actor!==String(W._Ba?._rJ?._O$?.ins?.actorId??'')||W.__KVPV_UNIVERSAL_HALTED||W[key]?.actor===actor)return;

if(typeof W.KVPV_DAILY?.tuVuotStart!=='function')return;

const pendingEvent=W.KVPV_EVENT_PRIORITY?.hold?.();
if(pendingEvent)return; 
const work=W.KVPV_QUEST_PRIORITY?._handoff?.()?.work;if(work)work.dailyEnabled=true;

W.KVPV_DAILY.tuVuotStart();W[key]={actor,at:Date.now()};W.__KVPV_STAGE_RESUME_20261024_USER=W[key];

})();

