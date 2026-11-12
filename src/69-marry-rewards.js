
/* Married accounts only: native ready rank/daily awards, no purchases. */

(() => {

'use strict';const W=window,old=W.KVPV_MARRY_REWARDS,c=old?._handoff?.();old?.stop?.();const actor=String(W.__KVPV_OWN_ACTOR_ID||''),same=c?.actor===actor;

const S={timer:null,pending:same?c.pending:null,sent:new Set(same?c.sent:[]),requests:same?c.requests:0,confirmed:same?c.confirmed:0,last:-Infinity,reason:'waiting',error:''};

const m=()=>W._Ba?._Yo?.marryFight?._Z9t?.ins,r=()=>W._Ba?._Yo?.marryFight?._qGt?.ins;

const day=()=>new Date(Date.now()+7*3600000).toISOString().slice(0,10);

function tick(){try{

if(!['10228867268946','10228867268941'].includes(actor)||actor!==String(W._Ba?._rJ?._O$?.ins?.actorId??'')||W.__KVPV_UNIVERSAL_HALTED){S.reason='account_not_selected';return;}

const model=m(),rpc=r();if(!model||!rpc)return;

if(S.pending){const p=S.pending,d=model.getDailyState?.(),ok=p.kind==='rank'?model.getSegAwdState?.(p.id)===2:d?.seg===p.id&&d?.state===2;if(ok){S.pending=null;S.confirmed++;}else{S.reason='waiting_reward_ack_no_retry';return;}}

if(W.KVPV_DAILY?.quickState?.()?.running!==true||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)){S.reason='yield_user_or_disabled_daily';return;}if(Date.now()-S.last<2000)return;

const wife=model.getWifeInfo?.();if(!Array.isArray(wife)||wife.length<2){S.reason='waiting_couple_data';return;}

const rows=model.getSegAwdInfos?.()??W._ft?._KXh?.ins?.geArenatCfg?.()??[];

for(const row of rows){const id=Number(row?.[0]),key=day()+'/rank/'+id;if(!Number.isSafeInteger(id)||id<=0||model.getSegAwdState?.(id)!==0||S.sent.has(key)||typeof rpc.GetMarryArenaSegAward!=='function')continue;

S.sent.add(key);S.pending={kind:'rank',id,at:Date.now()};S.last=Date.now();S.requests++;rpc.GetMarryArenaSegAward(id);S.reason='claim_rank_reward';return;}

const d=model.getDailyState?.(),id=Number(d?.seg),key=day()+'/daily/'+id;

if(Number.isSafeInteger(id)&&id>0&&d?.state===0&&model.hasDailyAwd?.()===true&&!S.sent.has(key)&&typeof rpc.GetMarryArenaDailyAward==='function'){S.sent.add(key);S.pending={kind:'daily',id,at:Date.now()};S.last=Date.now();S.requests++;rpc.GetMarryArenaDailyAward(id);S.reason='claim_daily_reward';return;}

S.reason='no_ready_rank_or_daily_reward';

}catch(e){S.error=String(e.message||e);S.reason='error_no_retry';}}

function stop(){if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;}

W.KVPV_MARRY_REWARDS=Object.freeze({sync:tick,stop,status:()=>({enabled:true,reason:S.reason,lastError:S.error,requests:S.requests,confirmed:S.confirmed,pending:S.pending,allowKNB:false}),_handoff:()=>({actor,pending:S.pending,sent:[...S.sent].slice(-200),requests:S.requests,confirmed:S.confirmed})});

S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,2000);tick();

})();

