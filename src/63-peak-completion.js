
/* Completion, not event opening hours, determines whether Peak needs another run. */

(() => {

'use strict';const W=window,old=W.KVPV_PEAK_COMPLETION,c=old?._handoff?.();old?.stop?.();

const actor=String(W.__KVPV_OWN_ACTOR_ID||''),same=c?.actor===actor,storage='kvpv.peak.completed.'+actor;

let completed=same?c.completed:'';try{completed=W.localStorage?.getItem(storage)||completed;}catch(_){}

const cfg=W.KVPV_DAILY?.config,prior=cfg?.enableDinhCao;

const S={timer:null,completed,exitKey:same?c.exitKey:'',resumeKey:same?c.resumeKey:'',blocked:false,reason:'waiting',error:''};

const own=()=>actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;

const day=()=>W.KVPV_DAILY_CLOCK?.key?.()??new Date(Date.now()+7200000).toISOString().slice(0,10);

function tick(){try{

if(!own())return;const today=day(),claimed=W.KVPV_PEAK_CHEST?._handoff?.()?.claimed??[];

// User explicitly confirmed today's Peak run and rewards are finished for these accounts.

if(today==='2026-10-24'||claimed.includes(today+'/peak-floor9')){S.completed=today;try{W.localStorage?.setItem(storage,today);}catch(_){} }

if(S.completed!==today){if(S.blocked&&cfg?.enableDinhCao===false)cfg.enableDinhCao=prior;S.blocked=false;S.reason='eligible_new_activity_day';return;}

if(cfg)cfg.enableDinhCao=false;S.blocked=true;

const type=Number(W._ft?._po?.ins?.getCfgById?.(Number(W._C?._Mn?._Cn?.currentID))?.[7]),rpc=W._Ba?._sst?._Cht?.inst;

if(type===14){if(S.exitKey!==today&&typeof rpc?.rqEtScene==='function'){S.exitKey=today;rpc.rqEtScene(0);}S.reason='completed_waiting_exit';return;}

const d=W.KVPV_DAILY,q=d?.quickState?.();

if(W._Ba?._$a?.SceneUtil?.isCommonScene!==true||q?.running!==true||!['rảnh','ranh'].includes(q.job)||W.KVPV?.core?.scene?.status?.()?.owner||W._Ba?._$a?._yo?.ins?.isInMission!==false||W._Ba?._cm?._q3t?.ins?.getHasTeams?.()===true||W._Ba?._rJ?._O$?.ins?.isDead!==false){S.reason='completed_waiting_current_job';return;}

if(S.resumeKey!==today&&typeof d.tuVuotStart==='function'){const work=W.KVPV_QUEST_PRIORITY?._handoff?.()?.work;if(work)work.dailyEnabled=true;d.tuVuotStart();S.resumeKey=today;}

S.reason='completed_daily_and_stage_resume';

}catch(e){S.error=String(e.message||e);S.reason='error_no_retry';}}

function stop(){if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;if(S.blocked&&cfg?.enableDinhCao===false)cfg.enableDinhCao=prior;}

W.KVPV_PEAK_COMPLETION=Object.freeze({sync:tick,stop,status:()=>({completedDay:S.completed,doneToday:S.completed===day(),reason:S.reason,lastError:S.error,exitRequested:S.exitKey===day(),stageResumeRequested:S.resumeKey===day()}),_handoff:()=>({actor,completed:S.completed,exitKey:S.exitKey,resumeKey:S.resumeKey})});

S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,1000);tick();

})();

