
/* Free consecutive-login reward milestones: native ready state -> single claim -> state2 ACK. */

(() => {

'use strict';const W=window,old=W.KVPV_LOGIN_STREAK,c=old?._handoff?.();old?.stop?.();const actor=String(W.__KVPV_OWN_ACTOR_ID||''),same=c?.actor===actor;

const S={timer:null,pending:new Map(same?c.pending:[]),sent:new Set(same?c.sent:[]),confirmed:same?c.confirmed:0,requests:same?c.requests:0,queried:false,last:-Infinity,reason:'waiting_model',error:''};

const ns=()=>W._Ba?.__1?.sea_contue_login,m=()=>ns()?._k1?.instance,r=()=>W._Ba?._IY?._WRt?.ins;

const own=()=>actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;

function tick(){try{

if(!own()||!m()||!r())return;

for(const [key,p]of S.pending)if(m().getAwardState?.(p.act,p.id)===2){S.pending.delete(key);S.confirmed++;}

if(W.KVPV_DAILY?.quickState?.()?.running!==true||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)){S.reason='yield_user_or_disabled_daily';return;}

if(Date.now()-S.last<2000)return;

if(!S.queried&&typeof r().getFestivalContinuityLoginInfo==='function'){S.queried=true;S.last=Date.now();r().getFestivalContinuityLoginInfo();S.reason='querying_login_state';return;}

const maps=[ns()?.FitActIdToDatas,ns()?.FitActIdToDatasHQ],acts=[...new Set(maps.flatMap(x=>Object.keys(x??{})).map(Number))],time=Number(W._Sa?.svrTime);

for(const act of acts){const end=Number(m().getEndTime?.(act));if(W._Ba?._IY?._BY?.ins?.getActIsOpen?.(act)!==true||!Number.isFinite(time)||!Number.isFinite(end)||end<=time)continue;

for(const row of m().getStateList?.(act)??[]){const id=Number(row?.[0]),key=act+'/'+end+'/'+id;if(!Number.isSafeInteger(id)||id<=0||row?.[1]!==1||m().getAwardState?.(act,id)!==1||S.sent.has(key))continue;

if(typeof r().getFestivalContinuityLoginReward!=='function')return;S.sent.add(key);S.pending.set(key,{act,id,at:Date.now()});S.requests++;S.last=Date.now();r().getFestivalContinuityLoginReward(id);S.reason='claim_ready_milestone';return;

}}

S.reason=S.pending.size?'waiting_server_state2_no_retry':'no_ready_milestone';

}catch(e){S.error=String(e.message||e);S.reason='error_no_retry';}}

function stop(){if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;}

W.KVPV_LOGIN_STREAK=Object.freeze({sync:tick,stop,status:()=>({enabled:true,reason:S.reason,lastError:S.error,requests:S.requests,confirmed:S.confirmed,pending:[...S.pending.values()],allowKNB:false}),_handoff:()=>({actor,pending:[...S.pending],sent:[...S.sent].slice(-200),requests:S.requests,confirmed:S.confirmed})});

S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,2000);tick();

})();

