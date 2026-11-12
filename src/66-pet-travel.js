
/* Native Linh Thu Du Ngoan: claim completed trips and restart without purchases. */

(() => {

'use strict';const W=window,old=W.KVPV_PET_TRAVEL,c=old?._handoff?.();old?.stop?.();const actor=String(W.__KVPV_OWN_ACTOR_ID||''),same=c?.actor===actor;

const S={timer:null,pending:new Map(same?c.pending:[]),queries:new Set(same?c.queries:[]),last:-Infinity,starts:same?c.starts:0,claims:same?c.claims:0,confirmed:same?c.confirmed:0,reason:'waiting',error:''};

const m=()=>W._Ba?._Q9?._ttt?.ins,r=()=>W._Ba?._Q9?._$dt?.ins;

const own=()=>actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;

const safe=()=>Date.now()>=Number(W.__KVPV_USER_UI_UNTIL||0)&&W.KVPV_DAILY?.quickState?.()?.running===true&&!W.KVPV_BOSS_TEAM?.priority?.();

function query(id,key){if(S.queries.has(key)||typeof r()?.getSpiritAnimalTravel!=='function')return;S.queries.add(key);if(S.queries.size>200)S.queries.delete(S.queries.values().next().value);r().getSpiritAnimalTravel([id]);}

function tick(){try{

if(!own()||!m()||!r())return;const ids=W._ft?._vZ?.ins?.ids;if(!Array.isArray(ids))return;

for(const [id,p]of S.pending){const row=m().getPetInfos?.(id);if(row&&((p.kind==='start'&&row[3]===1&&Number(row[4])>p.end)||(p.kind==='claim'&&row[3]===0))){S.pending.delete(id);S.confirmed++;}else if(Date.now()-p.at>=10000)query(id,'pending/'+id+'/'+p.at);}

if(!safe()){S.reason='yield_user_or_disabled_daily';return;}if(Date.now()-S.last<1500)return;

for(const id of ids.slice(0,4)){const row=m().getPetInfos?.(id);if(!row){query(id,'initial/'+id);continue;}if(S.pending.has(id))continue;

if(row[3]===1){const server=Number(W._Sa?.svrTime);if(Number.isFinite(server)&&Number(row[4])<=server)query(id,'finished/'+id+'/'+row[4]);continue;}

if(row[3]===2&&typeof r().getTravelAward==='function'){S.pending.set(id,{kind:'claim',at:Date.now()});S.last=Date.now();S.claims++;r().getTravelAward([id]);S.reason='claim_completed_trip';return;}

const max=Number(m().maxPetNum);if(row[3]!==0||!Number.isInteger(row[6])||!Number.isFinite(max)||row[6]>=max)continue;

const table=W._ft?._sbt?.ins,available=Number(m().typeInfos?.(1)),reduce=Number(m().travelConsumeReduceValue??0);

if(!Number.isFinite(available)||!Number.isFinite(reduce)||reduce<0||reduce>100)continue;

// First two native destinations need no ticket; choose the cheapest affordable resource cost.

const routes=(table?.ids??[]).slice(0,2).map(x=>table.getCfgById?.(x)).filter(x=>Array.isArray(x)&&Array.isArray(x[4])&&Number.isFinite(x[4][1])&&x[4][1]>=0&&![90140001,90140002].includes(Number(x[4][0]))).map(x=>({row:x,cost:Math.floor(x[4][1]*(1-.01*reduce))})).filter(x=>x.cost<=available).sort((a,b)=>a.cost-b.cost);

if(!routes.length||typeof r().travel!=='function')continue;

S.pending.set(id,{kind:'start',at:Date.now(),end:Number(row[4])||0});S.last=Date.now();S.starts++;r().travel([id,routes[0].row[0],0,false]);S.reason='start_without_ticket_or_speedup';return;

}

S.reason=S.pending.size?'waiting_ack_no_retry':'waiting_trip_completion_or_resources';

}catch(e){S.error=String(e.message||e);S.reason='error_no_retry';}}

function stop(){if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;}

W.KVPV_PET_TRAVEL=Object.freeze({sync:tick,stop,status:()=>({enabled:true,reason:S.reason,lastError:S.error,starts:S.starts,claims:S.claims,confirmed:S.confirmed,pending:[...S.pending].map(([id,p])=>({id,kind:p.kind,at:p.at})),allowKNB:false}),_handoff:()=>({actor,pending:[...S.pending],queries:[...S.queries].slice(-200),starts:S.starts,claims:S.claims,confirmed:S.confirmed})});

S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,1500);tick();

})();

