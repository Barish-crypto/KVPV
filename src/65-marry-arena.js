
 

(() => {

'use strict';const W=window,old=W.KVPV_MARRY_ARENA,c=old?._handoff?.();old?.stop?.('reload');const actor=String(W.__KVPV_OWN_ACTOR_ID||''),same=c?.actor===actor;

const S={timer:null,pending:same?c.pending:null,lastAction:same?c.lastAction:-Infinity,queried:false,entries:same?c.entries:0,refreshes:same?c.refreshes:0,confirmed:same?c.confirmed:0,lease:same?c.lease:false,stageAuto:same?c.stageAuto:null,reason:'waiting_idle',error:''};

const model=()=>W._Ba?._Yo?.marryFight?._Z9t?.ins,rpc=()=>W._Ba?._Yo?.marryFight?._qGt?.ins;

const own=()=>actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;

const map=()=>Number(W._C?._Mn?._Cn?.currentID);

function release(){if(S.lease)W.KVPV?.core?.scene?.release?.('daily');S.lease=false;const stage=W._Ba?._Co?._Mo?.ins;if(S.stageAuto===true&&stage?.auto===false&&!W.KVPV_EVENT_PRIORITY?.hold?.())stage.auto=true;S.stageAuto=null;}

function safe(){const q=W.KVPV_DAILY?.quickState?.(),b=W._Ba;return b?._rJ?._O$?.ins?.isDead===false&&b?._$a?.SceneUtil?.isCommonScene===true&&b?._$a?._yo?.ins?.isInMission===false&&q?.running===true&&['rảnh','ranh'].includes(q.job)&&!W.KVPV?.core?.scene?.status?.()?.owner&&!b?._cm?._q3t?.ins?.getHasTeams?.()&&!W.KVPV_HITRUN1?.status?.(false)?.running&&Date.now()>=Number(W.__KVPV_USER_UI_UNTIL||0)&&W.KVPV_CONFIRM_POPUPS?.beforeTask?.()!==true;}

function tick(){try{

if(!own())return;const m=model(),r=rpc();if(!m||!r){S.reason='waiting_native_model';return;}

if(S.pending){const p=S.pending;

 if(p.kind==='refresh'){if(m.getFightInfo?.()!==p.list&&m.getCanRef?.()===false){S.pending=null;S.confirmed++;S.reason='free_refresh_confirmed';}else{S.reason='waiting_refresh_ack_no_retry';return;}}

 else{if(map()===2391){p.entered=true;W.KVPV?.core?.scene?.renew?.('daily');S.reason='native_arena_battle';return;}

 const count=Number(m.getRemainCount?.()),list=m.getFightInfo?.(),won=Array.isArray(list)&&list.some(x=>Number(x?.[2])===p.tier&&Number(x?.[3])===1);

 if(W._Ba?._$a?.SceneUtil?.isCommonScene===true&&(p.entered||(count<p.count&&won&&list!==p.list))){release();S.pending=null;S.confirmed++;S.reason='battle_return_confirmed';}else{W.KVPV?.core?.scene?.renew?.('daily');S.reason='waiting_battle_ack_no_retry';return;}}

}

if(!['10228867268946','10228867268941'].includes(actor)){S.reason='account_not_selected_unmarried';return;}

if(!safe()){S.reason='yield_current_activity';return;}if(Date.now()-S.lastAction<5000)return;

if(!S.queried){S.queried=true;S.lastAction=Date.now();r.GetMarryArenaInfo?.();r.GetMarryArenaRankInfo?.();r.GetMarryArenaChallengeList?.();S.reason='refreshing_readonly_state';return;}

const count=Number(m.getRemainCount?.()),wife=m.getWifeInfo?.();if(!Number.isInteger(count)||count<1){S.reason='no_available_challenge_turns';return;}if(!Array.isArray(wife)||wife.length<2){S.reason='waiting_couple_data';return;}

const list=m.getFightInfo?.();if(!Array.isArray(list)||!list.length){S.reason='waiting_opponent_list';return;}
const teamPower=Number(m.getTotalFightVal?.());if(!Number.isFinite(teamPower)||teamPower<=0){S.reason='waiting_team_power';return;}
const available=list.filter(x=>Array.isArray(x)&&Number(x[3])===0&&Number.isInteger(x[2])&&x[2]>=1&&x[2]<=4&&Number.isFinite(Number(x[1])));
const candidates=available.filter(x=>teamPower>Number(x[1])).sort((a,b)=>Number(a[1])-Number(b[1]));

if(candidates.length){const tier=candidates[0][2],entry=W._Ba?._sst?._Cht?.inst;if(typeof entry?.rqEtScene!=='function'||W.KVPV?.core?.scene?.acquire?.('daily','marry-arena')!==true){S.reason='waiting_scene_permission';return;}

 S.lease=true;const stage=W._Ba?._Co?._Mo?.ins;S.stageAuto=stage?.auto===true;if(stage?.auto===true)stage.auto=false;

 S.pending={kind:'battle',tier,count,list,entered:false,at:Date.now()};S.lastAction=Date.now();S.entries++;entry.rqEtScene(2391,tier,[1]);S.reason='single_free_turn_battle_requested';return;

}

if(m.getCanRef?.()!==true){S.reason=available.length?'no_opponent_weaker_than_team':'waiting_free_refresh_no_purchase';return;}

if(typeof r.FlushMarryArenaChallengeList!=='function')return;

S.pending={kind:'refresh',list,at:Date.now()};S.lastAction=Date.now();S.refreshes++;r.FlushMarryArenaChallengeList();S.reason='free_refresh_requested';

}catch(e){S.error=String(e.message||e);S.reason='error_no_retry';}}

function stop(reason){if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;if(reason!=='reload')release();}

W.KVPV_MARRY_ARENA=Object.freeze({sync:tick,stop,status:()=>({enabled:true,reason:S.reason,lastError:S.error,entries:S.entries,freeRefreshes:S.refreshes,confirmed:S.confirmed,teamPower:model()?.getTotalFightVal?.()??null,remaining:model()?.getRemainCount?.()??null,freeRefresh:model()?.getCanRef?.()===true,pending:S.pending?{kind:S.pending.kind,tier:S.pending.tier,at:S.pending.at}:null,allowKNB:false,selectedAccount:['10228867268946','10228867268941'].includes(actor)}),_handoff:()=>({actor,pending:S.pending,lastAction:S.lastAction,entries:S.entries,refreshes:S.refreshes,confirmed:S.confirmed,lease:S.lease,stageAuto:S.stageAuto})});

S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,1000);tick();

})();

