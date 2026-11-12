
 

(() => {

'use strict';const W=window,old=W.KVPV_FOUR_WORSHIP,c=old?._handoff?.();old?.stop?.();const actor=String(W.__KVPV_OWN_ACTOR_ID||''),same=c?.actor===actor;

const S={timer:null,pending:same?c.pending:null,sent:new Set(same?c.sent:[]),queried:false,last:-Infinity,requests:same?c.requests:0,confirmed:same?c.confirmed:0,reason:'waiting',error:''};

const m=()=>W._Ba?._Dd?._Kpt?.inst,r=()=>W._Ba?._Dd?._C3n?.ins;

const own=()=>actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;

const day=()=>new Date(Date.now()+7*3600000).toISOString().slice(0,10);

function tick(){try{

if(!own()||!m()||!r())return;const count=Number(m().getThumbsCount?.());

if(S.pending){if(Number.isInteger(count)&&count<S.pending.count){S.pending=null;S.confirmed++;}else{S.reason='waiting_count_ack_no_retry';return;}}

if(W.KVPV_DAILY?.quickState?.()?.running!==true||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)){S.reason='yield_user_or_disabled_daily';return;}if(Date.now()-S.last<2000)return;

if(!S.queried){S.queried=true;S.last=Date.now();r().ReqFightFourLeaderActorInfo?.();S.reason='querying_native_worship_state';return;}

const key=day()+'/'+count;if(!Number.isInteger(count)||count<=0||m().canThumbsUp?.()!==true||W._Ba?._Do?._Ho?.inst?.getFcIsOpen?.(1101)!==true||S.sent.has(key)||typeof r().ReqThumbsUpFighFourBest!=='function'){S.reason='no_free_worship_remaining';return;}

S.sent.add(key);S.pending={count,at:Date.now()};S.last=Date.now();S.requests++;r().ReqThumbsUpFighFourBest();S.reason='free_worship_requested';

}catch(e){S.error=String(e.message||e);S.reason='error_no_retry';}}

function stop(){if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;}

W.KVPV_FOUR_WORSHIP=Object.freeze({sync:tick,stop,status:()=>({enabled:true,reason:S.reason,lastError:S.error,remaining:m()?.getThumbsCount?.()??null,requests:S.requests,confirmed:S.confirmed,pending:S.pending,allowKNB:false}),_handoff:()=>({actor,pending:S.pending,sent:[...S.sent].slice(-100),requests:S.requests,confirmed:S.confirmed})});

S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,2000);tick();

})();

