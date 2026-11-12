
/* Logical activity day begins at 05:00 Asia/Saigon (UTC+7).
 * Calendar event schedules keep their actual wall-clock dates. */
// HOT_RELOAD_SMOKE_20261027: comment-only probe; runtime logic unchanged.

(() => {

 'use strict';const W=window,DAY=86400000,OFFSET=2*3600000;

 const key=(at=Date.now())=>new Date(Number(at)+OFFSET).toISOString().slice(0,10);

 const nextResetAt=(at=Date.now())=>(Math.floor((Number(at)+OFFSET)/DAY)+1)*DAY-OFFSET;

 W.KVPV_DAILY_CLOCK=Object.freeze({key,nextResetAt,status:()=>({timezone:'Asia/Saigon',resetHour:5,day:key(),nextResetAt:new Date(nextResetAt()).toISOString()})});

})();

