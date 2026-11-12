
/* Native Fight Team Boss rally: event 6763 + server inspireEndTime, map 3301.
 * Entry is the free manual challenge action; this module never purchases inspiration. */

(() => {

 'use strict';const W=window,old=W.KVPV_GUILD_BOSS,carry=old?._handoff?.();old?.stop?.('reload');

 const actor=String(W.__KVPV_OWN_ACTOR_ID||''),same=carry?.actor===actor;

 const S={enabled:true,timer:null,busy:false,pending:same?carry.pending:null,saved:same?carry.saved:null,seen:new Set(same?carry.seen:[]),reason:'waiting_team_inspiration',error:'',refreshAt:0,listener:null};

 const model=()=>W._Ba?._a1?._Rvn?.ins,team=()=>W._Ba?._a1?._h1?.inst,user=()=>W._Ba?._rJ?._O$?.ins;

 const scene=()=>W.KVPV?.core?.scene,map=()=>Number(W._C?._Mn?._Cn?.currentID??W._Ba?._$a?._yo?.ins?.intoSce?.[0]);

 const common=()=>W._Ba?._$a?.SceneUtil?.isCommonScene===true&&W._Ba?._$a?._yo?.ins?.isInMission!==true;

 const owned=()=>actor&&actor===String(user()?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;

 function data(){const m=model(),t=team(),id=String(t?.getMyFightTeamId?.()??''),until=Number(m?.inspireEndTime),now=Number(W._Sa?.svrTime),left=Number(m?.leftFightTm),layer=Number(m?.curTeamPassLayer),max=Number(W._ft?._uph?.ins?.getMaxLayer?.());

  return {team:id,key:id+'/'+until+'/'+layer,until,hasTeam:t?.hasFightTeam?.()===true&&id!==''&&id!=='0',live:Number.isFinite(now)&&Number.isFinite(until)&&until>now,

    canFight:Number.isFinite(left)&&left>0&&Number.isFinite(layer)&&Number.isFinite(max)&&layer<max,finished:Number.isFinite(left)&&left<=0||Number.isFinite(layer)&&Number.isFinite(max)&&layer>=max};}

 function release(){if(scene()?.status?.()?.tag==='guild-boss-priority')scene()?.release?.('combat');}

 function hold(){if(!S.saved)S.saved={stage:W._Ba?._Co?._Mo?.ins?.auto===true,armed:W.KVPV_MODE?.status?.(false)?.autoMaintain===true};

  if(W._Ba?._Co?._Mo?.ins)W._Ba._Co._Mo.ins.auto=false;

  if(W.KVPV_MODE?.status?.(false)?.autoMaintain||W.KVPV_HITRUN1?.status?.(false)?.running)W.KVPV_MODE?.stop?.('fight_team_boss_inspiration_priority');

  scene()?.acquire?.('combat','guild-boss-priority');scene()?.renew?.('combat');

 }

 function restore(){if(S.pending||!S.saved||!common())return;const saved=S.saved;S.saved=null;release();

  if(saved.stage&&W._Ba?._Co?._Mo?.ins&&!W.KVPV_EVENT_PRIORITY?.hold?.())W._Ba._Co._Mo.ins.auto=true;if(saved.armed)W.KVPV_MODE?.armTianQuan?.();}

 function tick(){if(W.KVPV_ENTRY_POLICY?.manual===true)return;if(S.busy||!S.enabled)return;S.busy=true;try{

  if(!owned())return;restore();const d=data(),m=model(),rpc=W._Ba?._sst?._Cht?.inst;

  if(!S.pending){

   if(!d.hasTeam){S.reason='not_in_fight_team';return;}

   if(Date.now()>=S.refreshAt){S.refreshAt=Date.now()+30000;W._Ba?._a1?._qvn?.inst?.getFTBossInfo?.();}

   if(!d.live||!d.canFight||S.seen.has(d.key)){S.reason='waiting_team_inspiration';return;}

   S.seen.add(d.key);S.pending={key:d.key,team:d.team,until:d.until,at:Date.now(),entered:map()===3301,exitSent:false,enterSent:false,nativeAuto:m?.c_isAutoIn===true};

   // Native auto-entry already reacts to 6763; do not become a second sender.

   if(S.pending.nativeAuto)S.pending.enterSent=true;

  }

  const p=S.pending;

  if(!d.hasTeam||d.team!==p.team){S.reason='fight_team_changed_no_entry';if(common()&&!p.enterSent){S.pending=null;restore();}return;}

  if(map()===3301){p.entered=true;scene()?.renew?.('combat');S.reason='fighting_team_boss';

   if((d.finished||p.battleEnded)&&!p.endExitSent&&typeof rpc?.rqEtScene==='function'){p.endExitSent=true;rpc.rqEtScene(0);S.reason='waiting_team_boss_return_ack';}return;

  }

  if(p.entered){if(common()){S.pending=null;restore();release();S.reason='team_boss_completed_resume';}else S.reason='waiting_team_boss_return_ack';return;}

  if(p.nativeAuto){S.reason='waiting_native_auto_entry_ack';return;}

  hold();

  if(user()?.isDead===true){S.reason='waiting_revive_for_team_boss';return;}

  if(!common()){

   if(!p.exitSent&&typeof rpc?.rqEtScene==='function'){p.exitSent=true;rpc.rqEtScene(0);}S.reason='waiting_current_activity_exit_ack';return;

  }

  if(!d.live||!d.canFight){S.pending=null;restore();S.reason='team_inspiration_expired_no_entry';return;}

  const ordinary=W._Ba?._cm?._q3t?.ins;

  if(ordinary?.getHasTeams?.()===true){const type=Number(ordinary.teamtype),rooms=W._Ba?._cm?._u3t?.ins;

   if(!p.roomLeaveSent&&Number.isSafeInteger(type)&&type>0&&typeof rooms?.exitSerAreRoom==='function'){p.roomLeaveSent=true;rooms.exitSerAreRoom([type]);}

   S.reason='waiting_old_room_exit_ack';return;

  }

  if(!p.enterSent&&typeof rpc?.rqEtScene==='function'){p.enterSent=true;rpc.rqEtScene(3301);}

  S.reason=Date.now()-p.at>30000?'team_boss_entry_timeout_no_retry':'waiting_team_boss_entry_ack';

 }catch(e){S.error=String(e);S.reason='error_no_retry';}finally{S.busy=false;}}

 function stop(reason='manual'){S.enabled=false;if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);

  for(const id of [6763,6762,6765])W._Sa?.notify?.off?.(id,S,S.listener);W._Sa?.notify?.off?.(5112,S,S.endListener);if(reason!=='reload'){release();restore();}}

 S.listener=()=>tick();for(const id of [6763,6762,6765])W._Sa?.notify?.on?.(id,S,S.listener);

 // Native battle end is only evidence for the current Fight Team Boss scene.

 const ended=()=>{if(map()===3301&&S.pending)S.pending.battleEnded=true;tick();};

 W._Sa?.notify?.on?.(5112,S,ended);

 W.KVPV_GUILD_BOSS=Object.freeze({sync:tick,stop,active:()=>S.enabled&&!!S.pending,priority:()=>S.enabled&&!!S.pending&&!S.pending.entered,

  status:()=>({enabled:S.enabled,reason:S.reason,pending:S.pending,lastError:S.error,allowKNB:false}),_handoff:()=>({actor,pending:S.pending,saved:S.saved,seen:[...S.seen]})});

 // Keep the exact native battle-end listener for teardown.

 S.endListener=ended;

 S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,500);tick();

})();

