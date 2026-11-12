
/* Private Ma Than / Tinh Than teams; clones yield their activity only for a verified leader invitation. */

(() => {

 'use strict';const W=window,old=W.KVPV_BOSS_TEAM,carry=old?._handoff?.();old?.stop?.('reload');

 const actor=String(W.__KVPV_OWN_ACTOR_ID||''),same=carry?.actor===actor;

 const S={enabled:true,timer:null,locks:new Set(same?carry.locks:[]),pending:same?carry.pending:null,leader:same?carry.leader:null,roster:same?carry.roster:[],saved:same?carry.saved:null,inviteAt:same&&carry.inviteAt?carry.inviteAt:{},createKey:'',createAttempts:0,createAt:0,reason:'waiting_boss',error:'',refreshAt:0};

 const user=()=>W._Ba?._rJ?._O$?.ins,model=()=>W._Ba?._MT?.the_secret_of_the_stars?._Gvt?.instance,rpc=()=>W._Ba?._MT?.the_secret_of_the_stars?._jvt?.ins;

 const scene=()=>Number(W._Ba?._$a?.SceneUtil?.curScene),common=()=>W._Ba?._$a?.SceneUtil?.isCommonScene===true&&W._Ba?._$a?._yo?.ins?.isInMission!==true;

 const owned=()=>actor&&actor===String(user()?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;

 const rows=()=>Array.isArray(model()?.teamPlayerData)?model().teamPlayerData.filter(row=>/^[1-9]\d{4,24}$/.test(String(row?.[0]??''))):[];

 function call(key,method,...args){if(S.locks.has(key)||typeof rpc()?.[method]!=='function')return false;S.locks.add(key);rpc()[method](...args);return true;}

 function refresh(){if(Date.now()<S.refreshAt)return;S.refreshAt=Date.now()+10000;rpc()?.GetSelfStarsSecretTeamInfo?.();}

 function eligible(map){if(map===2711)return Number(W._Ba?._Dvt?._Hvt?.ins?.challengePhyStren)>0;

  return map===2371&&Number(model()?.strengthvalue)>0&&model()?.auto!==true&&model()?.auto!==1;}

 function hold(){

  if(!S.saved)S.saved={stage:W._Ba?._Co?._Mo?.ins?.auto===true,armed:W.KVPV_MODE?.status?.(false)?.autoMaintain===true};

  const st=W._Ba?._Co?._Mo?.ins;if(st)st.auto=false;

  if(W.KVPV_HITRUN1?.status?.(false)?.running||W.KVPV_MODE?.status?.(false)?.autoMaintain)W.KVPV_MODE?.stop?.('priority_private_boss_invitation');

  W.KVPV?.core?.scene?.acquire?.('combat','boss-private-invite');

 }

 function restore(){if(!S.saved||!common()||S.pending)return;const saved=S.saved;S.saved=null;

  if(saved.stage&&W._Ba?._Co?._Mo?.ins&&!W.KVPV_EVENT_PRIORITY?.hold?.())W._Ba._Co._Mo.ins.auto=true;if(saved.armed)W.KVPV_MODE?.armTianQuan?.();

 }

 function tick(){if(W.KVPV_ENTRY_POLICY?.manual===true)return;try{

  if(!S.enabled||!owned())return;if(W.KVPV_GUILD_BOSS?.active?.()){S.reason='guild_boss_priority';return;}restore();const peers=W.KVPV_TEAM_COORDINATOR?.status?.()?.accounts??[];

  const clone=String(W.KVPV_DAILY?.config?.tinhThanCloneId||'10228867268941').trim(),main=String(W.KVPV_DAILY?.config?.tinhThanMainId||'10228867268946').trim();
  const peerIds=peers.map(p=>String(p.actor)),configuredPair=/^[1-9]\d{4,24}$/.test(clone)&&clone!==actor&&peers.length===2&&peerIds.includes(actor)&&peerIds.includes(clone),configuredLeader=/^[1-9]\d{4,24}$/.test(main)&&/^[1-9]\d{4,24}$/.test(clone)&&main!==clone&&actor===main;
  let incoming=null;
  for(const feature of [657,307])for(const row of model()?.getInvitedList?.(feature)??[]){
   const map=Number(row?.[2]),inviter=String(row?.[0]??'');
   const trustedInviter=peerIds.includes(inviter)||(actor===clone&&inviter===main);
   if(inviter!==actor&&trustedInviter&&((feature===657&&map===2711)||(feature===307&&map===2371))){incoming=row;break;}
  }
  if(configuredLeader||configuredPair){S.leader=actor;S.roster=[actor,clone];}
  else if(incoming){S.leader=String(incoming[0]);S.roster=[S.leader,actor];}
  else if(peers.length===4){if(!S.leader){S.leader=peerIds[0];S.roster=peerIds;}}
  else {S.leader=null;S.roster=[];S.reason='waiting_verified_main_clone_invitation';return;}

  const m=model(),r=rpc();if(!m||!r){S.reason='waiting_native_boss_team_model';return;}

  const data=rows(),ids=data.map(row=>String(row?.[0]));

  if(actor===S.leader){

   if(![34,55].includes(scene())){if(!data.length){S.leader=null;S.roster=[];}S.reason='leader_waiting_boss_map';return;}

   if(Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)){S.reason='user_interaction';return;}

   const key=[scene(),m.curmapidScene,m.curMapLvScene,m.curlineScene].join('/');

   if(!data.length){
    if(S.createKey!==key){S.createKey=key;S.createAttempts=0;S.createAt=0;}
    if(S.createAttempts>=4){refresh();S.reason='create_ack_timeout_no_retry';return;}
    if(S.createAttempts===0||Date.now()-S.createAt>=15000){
     const attempt=S.createAttempts+1;
     if(call(key+'/create/'+attempt,'CreateStarsSecretTeam')){S.createAttempts=attempt;S.createAt=Date.now();}
    }
    refresh();S.reason='waiting_boss_team_create_ack';return;
   }
   if(ids.includes(actor)&&data.some(row=>String(row?.[0])===actor&&Number(row?.[7])===1)){S.createKey='';S.createAttempts=0;S.createAt=0;}

   if(!data.some(row=>String(row?.[0])===actor&&Number(row?.[7])===1)){S.reason='foreign_boss_leader_preserved';return;}

   if(Number(m.autoAgreeApplyStarsSecretTeam)===1){call(key+'/private','setAutoAgreeApplyStarsSecretTeam',0);S.reason='waiting_private_team_setting';return;}

   for(const id of S.roster.filter(id=>id!==actor&&!ids.includes(id))){
    if(Date.now()-Number(S.inviteAt[id]||0)<15000||typeof r.InviteOutMapUserJoinTeam!=='function')continue;
    S.inviteAt[id]=Date.now();r.InviteOutMapUserJoinTeam(Number(id));
   }

   S.reason=S.roster.every(id=>ids.includes(id))?'private_boss_team_complete':'private_clone_invitations_sent';return;

  }

  if(S.pending){

   const p=S.pending,atBoss=scene()===(p.map===2711?55:34),joined=atBoss&&ids.includes(actor)&&ids.includes(p.leader)&&Number(m.curmapidScene)===p.map&&Number(m.curMapLvScene)===p.level&&Number(m.curlineScene)===p.line;

   if(joined){S.pending=null;if(W.KVPV?.core?.scene?.status?.()?.tag==='boss-private-invite')W.KVPV.core.scene.release?.('combat');S.reason='private_boss_team_join_confirmed';return;}

   hold();if(data.length&&!ids.includes(p.leader)){

    if(!p.oldTeamLeaveSent&&typeof r.ExitStarsSecretTeam==='function'){p.oldTeamLeaveSent=true;r.ExitStarsSecretTeam();}S.reason='waiting_old_boss_team_exit_ack';return;

   }

   if(user()?.isDead===true){S.reason='waiting_revive_for_boss_invitation';return;}

   if(!common()&&!(atBoss&&Number(m.curmapidScene)===p.map&&Number(m.curMapLvScene)===p.level&&Number(m.curlineScene)===p.line)){

    if(!p.exitSent&&typeof W._Ba?._sst?._Cht?.inst?.rqEtScene==='function'){p.exitSent=true;W._Ba._sst._Cht.inst.rqEtScene(0);}

    S.reason='waiting_current_activity_exit_ack';return;

   }

   const ordinary=W._Ba?._cm?._q3t?.ins;

   if(ordinary?.getHasTeams?.()===true){const type=Number(ordinary.teamtype),leave=W._Ba?._cm?._u3t?.ins;

    if(!p.roomLeaveSent&&Number.isSafeInteger(type)&&type>0&&typeof leave?.exitSerAreRoom==='function'){p.roomLeaveSent=true;leave.exitSerAreRoom([type]);}

    S.reason='waiting_old_dungeon_team_exit_ack';return;

   }

   if(eligible(p.map)&&typeof r.checkCanEnterSenceTeam==='function'&&(!p.joinSent||Date.now()-Number(p.joinAt||0)>=15000)){
    p.joinSent=true;p.joinAt=Date.now();r.checkCanEnterSenceTeam([p.map,p.level,p.line,p.team]);
   }

   refresh();S.reason='waiting_native_boss_join_ack';return;

  }

  // Native inviter row: [actor,name,map,level,line,teamId,...]. Only accept the elected main.

  for(const feature of [657,307])for(const row of m.getInvitedList?.(feature)??[]){

   if(String(row?.[0])!==S.leader||![2371,2711].includes(Number(row?.[2])))continue;

   const map=Number(row[2]),level=Number(row[3]),line=Number(row[4]),team=String(row[5]??'').trim();

   if(!Number.isSafeInteger(level)||level<=0||!Number.isSafeInteger(line)||line<0||!team||team==='0'||team.length>128||!eligible(map))continue;

   const key='accept/'+map+'/'+level+'/'+line+'/'+team;

   if(S.locks.has(key))continue;S.locks.add(key);S.pending={leader:S.leader,map,level,line,team,exitSent:false,joinSent:false};

   hold();S.reason='private_boss_invitation_priority';return;

  }

  if(![34,55].includes(scene())&&!data.length){S.leader=null;S.roster=[];}S.reason='waiting_private_main_invitation';

 }catch(e){S.error=String(e);S.reason='error_no_retry';}}

 function stop(reason='manual'){S.enabled=false;if(reason!=='reload'&&W.KVPV?.core?.scene?.status?.()?.tag==='boss-private-invite')W.KVPV.core.scene.release?.('combat');if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);if(reason!=='reload')restore();}

 W.KVPV_BOSS_TEAM=Object.freeze({sync:tick,stop,ownsBossTeams:()=>S.enabled,priority:()=>S.enabled&&(!!S.pending||W.KVPV_GUILD_BOSS?.priority?.()===true),status:()=>({enabled:S.enabled,leader:S.leader,roster:S.roster,pending:S.pending,createAttempts:S.createAttempts,reason:S.reason,lastError:S.error,allowKNB:false}),

  _handoff:()=>({actor,locks:[...S.locks],pending:S.pending,leader:S.leader,roster:S.roster,saved:S.saved,inviteAt:S.inviteAt})});

 S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,500);tick();

})();

