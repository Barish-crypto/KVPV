
/* Native festival claims / free Dbao / existing seasonal tokens. No purchase paths. */

(() => {

'use strict';const W=window,old=W.KVPV_FESTIVAL_FREE,c=old?._handoff?.();old?.stop?.();const actor=String(W.__KVPV_OWN_ACTOR_ID||''),same=c?.actor===actor;

const S={timer:null,pending:same?c.pending:null,sent:new Set(same?c.sent:[]),queries:new Set(),last:-Infinity,requests:same?c.requests:0,confirmed:same?c.confirmed:0,reason:'waiting',error:''};

const ns=()=>W._Ba?.__1,rpc=()=>W._Ba?._IY?._WRt?.ins,actModel=()=>W._Ba?._IY?._BY?.ins;

const own=()=>actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;

const day=()=>new Date(Date.now()+7*3600000).toISOString().slice(0,10);

const active=a=>actModel()?.getActIsOpen?.(a)===true;

const state=(act,id)=>ns()?.sea_login_award?._m1?.instance?.getStateList?.(act)?.find(x=>Number(x?.[0])===id)?.[1];

const bag=id=>Number(W._Ba?._Ic?._aQ?.ins?.getItemCountById?.(id));

function send(key,p,fn){S.sent.add(key);if(S.sent.size>200)S.sent.delete(S.sent.values().next().value);S.pending={...p,at:Date.now()};S.last=Date.now();S.requests++;fn();S.reason='sent_'+p.kind;}

function tick(){try{

if(!own())return;const dbao=W._Ba?._EEt?._GEt?.inst,guide=ns()?.activity_guide?._ue?.instance,treasure=W._Ba?._ze?._Ve?.ins;

if(S.pending){const p=S.pending;let ok=false;

if(p.kind==='login')ok=state(p.act,p.id)===2;

if(p.kind==='guide')ok=guide?.getAwardState?.(p.act)===2;

if(p.kind==='dbao')ok=Number(dbao?.fTimes)<p.count&&dbao?.noteLst!==p.reply;

if(p.kind==='token')ok=treasure?.xbRep!==p.reply&&Number(treasure?.xbRep?.[0])===p.type&&Number(treasure?.xbRep?.[1])===0&&bag(p.item)<p.count;

if(ok){S.pending=null;S.confirmed++;}else{S.reason='waiting_'+p.kind+'_ack_no_retry';return;}}

if(W.KVPV_DAILY?.quickState?.()?.running!==true||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)){S.reason='yield_user_or_disabled_daily';return;}if(Date.now()-S.last<3000)return;

const login=ns()?.sea_login_award,m=login?._m1?.instance;

for(const a of Object.keys({...login?.FitActIdToDatas,...login?.FitActIdToDatasHQ}).map(Number)){if(!active(a))continue;

for(const row of m?.getStateList?.(a)??[]){const id=Number(row?.[0]),key=day()+'/login/'+a+'/'+id;if(Number.isSafeInteger(id)&&id>0&&row[1]===1&&!S.sent.has(key)&&typeof rpc()?.getFestivalLoginReward==='function'){send(key,{kind:'login',act:a,id},()=>rpc().getFestivalLoginReward(id));return;}}}

const a=Number(guide?.curActId),gkey=day()+'/guide/'+a;

if(a>0&&active(a)&&guide.getAwardState?.(a)===1&&!S.sent.has(gkey)&&typeof ns()?.activity_guide?._lin?.instance?.c2sGetAward==='function'){send(gkey,{kind:'guide',act:a},()=>ns().activity_guide._lin.instance.c2sGetAward(a));return;}

// Refresh read-only state once per calendar day, independent of whether its panel is open.

if(!S.queries.has(day())){S.queries.add(day());S.last=Date.now();rpc()?.getFestivalLoginRewardInfo?.();W._Ba?._EEt?._OEt?.inst?.GetDbaoInfo?.();ns()?.activity_guide?._lin?.instance?.c2sGetInfo?.();S.reason='querying_free_event_state';return;}

const server=Number(W._Sa?.svrTime),count=Number(dbao?.fTimes),dkey=day()+'/dbao/'+dbao?.restTm+'/'+count;

if(Number.isInteger(count)&&count>0&&dbao?.oState===1&&Number(dbao.restTm)>server&&W._Ba?._Do?._Ho?.inst?.getFcIsOpen?.(217)===true&&!S.sent.has(dkey)&&typeof W._Ba?._EEt?._OEt?.inst?.DbaoRun==='function'){send(dkey,{kind:'dbao',count,reply:dbao.noteLst},()=>W._Ba._EEt._OEt.inst.DbaoRun(0));return;}

if(W.KVPV_FREE_TREASURE?.busy?.()||W.KVPV_FABAO_TREASURE?.status?.()?.pending){S.reason='waiting_other_treasure';return;}

const season=ns()?.sea_treasure,sm=season?._v1?.instance;

for(const [id,meta]of Object.entries(season?.FitActIdToDatas??{})){const act=Number(id);const end=Number(sm?.getEndTm?.(act));if(!active(act)||!Number.isFinite(server)||!Number.isFinite(end)||end<=server)continue;

const type=W._ft?._gY?.ins?.getCfgById?.(66068)?.[2]?.[meta[0]];if(!Number.isSafeInteger(type))continue;

const cost=W._ft?._oZ?.ins?.getQDXBCostNumList?.(type)?.[0];if(!Array.isArray(cost))continue;const item=Number(cost[0]),qty=Number(cost[1]),have=bag(item),key=day()+'/token/'+act+'/'+type+'/'+have;

if(!Number.isSafeInteger(item)||item<=0||item>=90000000||!Number.isSafeInteger(qty)||qty<=0||!Number.isInteger(have)||have<qty||S.sent.has(key)||typeof W._Ba?._ze?._pmt?.ins?.runXunbao!=='function')continue;

send(key,{kind:'token',type,item,count:have,reply:treasure?.xbRep},()=>W._Ba._ze._pmt.ins.runXunbao(type,0,false));return;}

S.reason='no_eligible_free_rewards_or_tokens';

}catch(e){S.error=String(e.message||e);S.reason='error_no_retry';}}

function stop(){if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;}

W.KVPV_FESTIVAL_FREE=Object.freeze({sync:tick,busy:()=>!!S.pending,stop,status:()=>({enabled:true,reason:S.reason,lastError:S.error,requests:S.requests,confirmed:S.confirmed,pending:S.pending?{kind:S.pending.kind,act:S.pending.act,type:S.pending.type,at:S.pending.at}:null,allowKNB:false}),_handoff:()=>({actor,pending:S.pending,sent:[...S.sent],requests:S.requests,confirmed:S.confirmed})});

S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,2000);tick();

})();

