
/* Active tool tabs elect the strongest actor; native room actions wait for the exact roster.
 * BroadcastChannel plus bounded native-host observations across profiles; no public invitations or commands. */

(() => {

 'use strict';const W=window,old=W.KVPV_TEAM_COORDINATOR,carry=old?._handoff?.();old?.stop?.();

 const actor=String(W.__KVPV_OWN_ACTOR_ID||''),same=carry?.actor===actor;

 const S={enabled:true,timer:null,channel:null,peers:new Map(),session:same?carry.session:null,boatSession:same?carry.boatSession:null,boatReason:'waiting_event',locks:new Set(same?carry.locks:[]),actionAt:{},actionAttempts:{},relayAt:0,reason:'discovering_accounts',error:'',born:Date.now(),seenBattle:same?carry.seenBattle:false,joinedRoom:same?carry.joinedRoom:null,hook:null,expFailUntil:same?Number(carry.expFailUntil)||0:0,expRequestAt:0,applyListAt:0};

 const user=()=>W._Ba?._rJ?._O$?.ins,party=()=>W._Ba?._cm?._q3t?.ins,rpc=()=>W._Ba?._cm?._u3t?.ins;

 const owned=()=>actor&&actor===String(user()?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;

 const day=()=>W.KVPV_DAILY_CLOCK?.key?.()??new Date(Date.now()+2*3600000).toISOString().slice(0,10);

 const defs=[{type:2,map:2091,model:()=>W._Ba?._cm?._vJ?.ins},{type:6,map:2702,model:()=>W._Ba?._n4t?._t4t?.ins}];

 const expMain=()=>String(W.KVPV_DAILY?.config?.tinhThanMainId||'10228867268946').trim();

 const expClone=()=>String(W.KVPV_DAILY?.config?.tinhThanCloneId||'10228867268941').trim();

 const boat=()=>W._Ba?._htt?._stt?.inst;

 function quota(d){const m=d.model(),n=Number(m?.remainTimes);return m&&Number.isFinite(n)&&n>0&&m.isCombin!==true&&m.isCombin!==1?n:0;}

 function idleReason(){const q=W.KVPV_DAILY?.quickState?.();
  if(W._Ba?._$a?.SceneUtil?.isCommonScene!==true)return 'not_common_scene';
  if(W._Ba?._$a?._yo?.ins?.isInMission===true)return 'in_mission';
  if(user()?.isDead===true)return 'actor_dead';
  if(Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0))return 'user_using_ui';
  if(q&&!['rảnh','ranh'].includes(String(q.job||'')))return 'daily_job_'+String(q.job||'unknown');
  const owner=W.KVPV?.core?.scene?.status?.()?.owner;if(owner)return 'scene_owned_'+String(owner);
  if(W.KVPV_HITRUN1?.status?.(false)?.running)return 'combat_controller_running';
  return 'idle';}
 function idle(){return idleReason()==='idle';}
 function sessionSafe(){const r=idleReason();return r==='idle'||r==='not_common_scene';}

 function members(){return [...new Set((party()?.getTeamAllMembers?.()||[]).map(r=>String(r?.[0]??'')).filter(id=>/^[1-9]\d{4,19}$/.test(id)))].sort();}

 function roomMapMatches(p,s){const map=Number(p?.roomMapId);return map===s.map||(s.type===2&&map===0);}

 function peers(){return [...S.peers.values()].filter(p=>Date.now()-p.at<15000).sort((a,b)=>b.power-a.power||a.actor.localeCompare(b.actor));}

 function send(key,method,args){if(S.locks.has(key)||typeof rpc()?.[method]!=='function')return false;S.locks.add(key);try{rpc()[method](args);return true;}catch(e){S.locks.delete(key);throw e;}}

 function sendRetry(key,method,args,interval=1200,max=10){const attempts=Number(S.actionAttempts[key]||0),last=Number(S.actionAt[key]||0);if(attempts>=max||Date.now()-last<interval)return false;if(!send(key+'/attempt/'+(attempts+1),method,args))return false;S.actionAttempts[key]=attempts+1;S.actionAt[key]=Date.now();return true;}

 function requestExpGroup(){
  if(!owned()||actor!==expMain())return {started:false,reason:'waiting_main_account'};
  if(W.KVPV_RED_DOT?.isActive?.(53)!==true)return {started:false,reason:'exp_red_dot_inactive'};
  if(Date.now()<S.expFailUntil){S.reason='exp_invite_timeout_cooldown';return {started:false,reason:S.reason};}
  if(S.session?.type===2){const pair=[expMain(),expClone()].sort();return S.session.leader===expMain()&&S.session.ids?.length===2&&pair.every(id=>S.session.ids.includes(id))?{started:true,reason:S.reason,session:S.session}:{started:false,reason:'other_exp_team_preserved'};}
  if(Date.now()-S.expRequestAt<900)return {started:false,reason:S.reason};S.expRequestAt=Date.now();
  announce();const live=peers(),pair=[expMain(),expClone()].sort();
  if(pair[0]===pair[1]||live.length<2||!pair.every(id=>live.some(p=>p.actor===id)))return {started:false,reason:'waiting_main_clone_profiles'};
  const busy=live.filter(p=>pair.includes(p.actor)&&p.idle!==true);
  if(busy.length){S.reason=busy.map(p=>(p.actor===expMain()?'main':'clone')+'_'+String(p.idleReason||'busy')).join('_');return {started:false,reason:S.reason};}
  const d=defs.find(x=>x.type===2);if(!d||!quota(d))return {started:false,reason:'no_main_exp_attempts'};
  S.session={leader:expMain(),ids:pair,type:2,map:2091,tier:1,key:day()+'/2/'+pair.join(',')+'/'+quota(d),createdAt:0,abortSent:false,matching:false};
  S.seenBattle=false;S.joinedRoom=null;S.actionAt={};S.actionAttempts={};announce();tick();
  return {started:true,reason:S.reason,session:S.session};
 }

 function announce(){const power=Number(W._Ba?._qo?._Ro?.ins?.fight);if(!Number.isFinite(power)||power<=0)return;

  const reason=idleReason(),p={actor,power,at:Date.now(),idle:reason==='idle',idleReason:reason,room:party()?.getHasTeams?.()===true?Number(party()?.roomId):null,

   quotas:defs.map(d=>[d.type,quota(d)]),session:S.session,boatSession:S.boatSession};S.peers.set(actor,p);S.channel?.postMessage(p);}

 function dragonBoatTick(live){
  const main=expMain(),clone=expClone(),pair=[main,clone].sort(),bm=boat(),mainPeer=live.find(p=>p.actor===main);
  if(actor===main&&bm?.isopen===true&&bm?.isHave!==true&&!S.boatSession){
   if(pair[0]===pair[1]){S.boatReason='invalid_main_clone_pair';return true;}
   if(!pair.every(id=>live.some(p=>p.actor===id))){S.boatReason='waiting_main_clone_profiles';return true;}
   if(live.some(p=>pair.includes(p.actor)&&p.idle!==true)){S.boatReason='waiting_main_clone_idle';return true;}
   const current=party();
   if(current?.getHasTeams?.()===true&&current?.getHasTeamByType?.(4)!==true){S.boatReason='other_team_preserved';return true;}
   S.boatSession={leader:main,ids:pair,type:4,map:2641,tier:1,key:day()+'/dragon-boat/'+pair.join(','),createdAt:Date.now()};announce();
  }
  if(!S.boatSession&&actor!==main&&mainPeer?.boatSession?.type===4&&mainPeer.boatSession.leader===main)S.boatSession=mainPeer.boatSession;
  const s=S.boatSession;if(!s)return false;
  if(!bm?.isopen){S.boatReason='event_closed';S.boatSession=null;return true;}
  if(bm?.isHave===true){S.boatReason='already_entered_today';S.boatSession=null;return true;}
  if(!pair.every(id=>live.some(p=>p.actor===id))||!live.filter(p=>pair.includes(p.actor)).every(p=>p.idle===true)){S.boatReason='waiting_main_clone_idle';return true;}
  const p=party(),inRoom=p?.getHasTeamByType?.(4)===true;
  if(p?.getHasTeams?.()===true&&!inRoom){S.boatReason='other_team_preserved';return true;}
  if(!inRoom){
   if(actor===main){const key=s.key+'/create';if(sendRetry(key,'creSerAreRoom',[4,'DRAGON BOAT MAIN CLONE',2641,1,0,0,0,1,false,false],1500,4))S.boatReason='waiting_party_create_ack';else S.boatReason=(S.actionAttempts[key]||0)>=4?'party_create_unconfirmed':'creating_party';}
   else{const inbox=p?.getAskLs?.(W._Ba?._cm?.TeamTypeToFuncId?.[4]);const invite=Array.isArray(inbox)?inbox.find(r=>Number(r?.[1])===4&&String(r?.[5])===main&&Number(r?.[4])===1):null;
    if(invite){const key=s.key+'/join/'+invite[2];if(sendRetry(key,'agrInviUSARoom',[4,invite[2],invite[4]],800,8))S.boatReason='waiting_clone_join_ack';else S.boatReason='clone_accepting_invitation';}else S.boatReason='waiting_main_invitation';}
   return true;
  }
  if(Number(p?.roomMapId)!==2641||Number(p?.mapLve??p?.roomMapLv)!==1){S.boatReason='party_scope_mismatch';return true;}
  const ids=members(),rid=String(p.roomId);if(ids.some(id=>!pair.includes(id))){S.boatReason='unexpected_party_member';return true;}
  if(actor===main&&p?.isLeader===true){
   if(!ids.includes(clone)){const key=s.key+'/invite/'+rid+'/'+clone;if(sendRetry(key,'inviUserSARoom',[4,1,[Number(clone)]],1000,10))S.boatReason='waiting_clone_invitation_ack';else S.boatReason='waiting_clone_join';return true;}
   if(ids.length!==2){S.boatReason='waiting_exact_party';return true;}
   if(typeof rpc()?.sendInviteChatInfo!=='function'){S.boatReason='entry_rpc_unavailable';return true;}
   const minLevel=Number(W._M?.ins?.getCfgById?.(10711)?.[2]?.[0]||0);if(Number(user()?.bornLev||0)<minLevel){S.boatReason='level_requirement_not_met';return true;}
   if(Number(bm?.getEnterCD?.()||0)>0){S.boatReason='waiting_entry_cooldown';return true;}
   send(s.key+'/enter/'+rid,'sendInviteChatInfo',[4,Number(p.roomId),2641,-1,0,0]);S.boatReason='waiting_event_entry_ack';return true;
  }
  S.boatReason=ids.includes(clone)?'party_ready_waiting_event_entry':'waiting_party_leader';return true;
 }

 function exact(){const s=S.session,p=party(),rows=members(),live=peers();return !!s&&p?.getHasTeamByType?.(s.type)===true&&roomMapMatches(p,s)&&Number(p?.mapLve??p?.roomMapLv)===s.tier&&s.ids.length>=2&&(s.matching===true?rows.length>=s.ids.length&&rows.length<=4&&s.ids.every(id=>rows.includes(id)):rows.length===s.ids.length&&s.ids.every(id=>rows.includes(id)))&&s.ids.every(id=>live.some(x=>x.actor===id))&&p?.isLeader===true;}

 function attach(){const r=rpc();if(S.hook?.r===r&&r?.startTeamBossCopy===S.hook.fn)return true;

  if(S.hook)return false;const proto=r&&Object.getPrototypeOf(r),native=proto?.startTeamBossCopy;

  if(typeof native!=='function'||r.startTeamBossCopy!==native){S.reason='waiting_verified_start_handler';return false;}

  const descriptor=Object.getOwnPropertyDescriptor(r,'startTeamBossCopy');

  const fn=function(args){

   // Guard only this coordinator's exact room category/map/tier. Other native rooms stay usable.

   const p=party(),session=S.session;

   if(!S.enabled||!owned()||!session||Number(args?.[0])!==session.type||

     p?.getHasTeamByType?.(session.type)!==true||!roomMapMatches(p,session)||

     Number(p.mapLve??p.roomMapLv)!==session.tier)return native.call(this,args);

   if(!exact()||!sessionSafe()||!quota(defs.find(d=>d.type===session.type))){S.reason='waiting_exact_tool_roster';return false;}

   const key=S.session.key+'/start/'+String(party()?.roomId);if(S.locks.has(key))return false;S.locks.add(key);return native.call(this,args);};

  Object.defineProperty(r,'startTeamBossCopy',{value:fn,writable:true,configurable:true});S.hook={r,fn,descriptor};return true;

 }

 function tick(){if(W.KVPV_ENTRY_POLICY?.manual===true)return;try{if(!S.enabled||!owned())return;const transport=!!S.channel||Date.now()-S.relayAt<15000;const hooked=transport?attach():false;announce();const live=peers();

  if(!transport){S.reason='account_channel_unavailable';return;}

  if(dragonBoatTick(live)){S.reason='dragon_boat_'+S.boatReason;return;}

  if(W.KVPV_BOSS_TEAM?.priority?.()){S.reason='private_boss_invitation_priority';return;}

  // The clone may receive the native invitation before the main's session
  // relay arrives. Adopt only the configured main's exact EXP invite so the
  // normal acceptance path can proceed without waiting for BroadcastChannel.
  if(!S.session&&actor===expClone()&&actor!==expMain()){
   const fid=W._Ba?._cm?.TeamTypeToFuncId?.[2],inbox=party()?.getAskLs?.(fid),main=expMain();
   const invite=Array.isArray(inbox)?inbox.find(r=>Array.isArray(r)&&Number(r[1])===2&&String(r[5])===main&&Number(r[4])===1):null;
   if(invite){const pair=[main,actor].sort();S.session={leader:main,ids:pair,type:2,map:2091,tier:1,key:day()+'/2/'+pair.join(',')+'/invite/'+String(invite[2]),createdAt:0,abortSent:false,matching:false};S.reason='clone_adopted_native_exp_invitation';announce();}
  }

  if(!S.session&&(Date.now()-S.born<5000||live.length<2)){S.reason='discovering_accounts';return;}

  // Recover a native EXP room created before this coordinator received the
  // red-dot request (or after a hot reload dropped its session). Only adopt
  // the configured main's own type-2, tier-1 room and only when the clone is
  // currently present in the trusted account relay.
  if(!S.session&&actor===expMain()){
   const p=party(),clone=expClone(),pair=[actor,clone].sort(),d=defs.find(x=>x.type===2);
   if(W._Ba?._$a?._yo?.ins?.isInMission!==true&&p?.getHasTeamByType?.(2)===true&&p?.isLeader===true&&roomMapMatches(p,{type:2,map:2091})&&
      Number(p?.mapLve??p?.roomMapLv)===1&&pair[0]!==pair[1]&&live.some(x=>x.actor===clone)&&quota(d)){
    S.session={leader:actor,ids:pair,type:2,map:2091,tier:1,key:day()+'/2/'+pair.join(',')+'/adopt/'+String(p.roomId),createdAt:Date.now(),abortSent:false,matching:false};
    S.seenBattle=false;S.joinedRoom=String(p.roomId);S.reason='adopted_existing_exp_room';announce();
   }
  }

  if(!S.session){

   const pair=[expMain(),expClone()].sort(),mainPeer=live.find(p=>p.actor===expMain());
   if(live.length===2&&pair[0]!==pair[1]&&pair.every(id=>live.some(p=>p.actor===id))){
    if(actor===expMain()){S.reason='waiting_main_red_dot_exp_request';return;}
    const session=mainPeer?.session;
    if(session?.type===2&&session.leader===expMain()&&session.ids.length===2&&pair.every(id=>session.ids.includes(id)))S.session=session;
    else {S.reason='waiting_main_exp_room_request';return;}
   }else{
   const active=live.filter(p=>p.idle);if(active.length!==live.length){S.reason='waiting_accounts_idle';return;}

   const lead=live[0];if(lead.actor!==actor){if(lead.session)S.session=lead.session;else S.reason='waiting_strongest_leader';return;}

   const d=defs.find(d=>live.every(p=>Number(p.quotas?.find(x=>x[0]===d.type)?.[1])>0));

   if(!d){S.reason='waiting_native_daily_attempts';return;}

   if(live.length!==4){S.reason='waiting_four_tool_accounts';return;}

   S.session={leader:actor,ids:live.map(p=>p.actor).sort(),type:d.type,map:d.map,tier:1,key:day()+'/'+d.type+'/'+live.map(p=>p.actor).sort().join(',')+'/'+quota(d)};announce();
   }

  }

  const s=S.session,d=defs.find(d=>d.type===s.type);if(!d){S.reason='unsupported_native_room';return;}

  const leader=live.find(p=>p.actor===s.leader);if(!leader){S.reason='leader_offline_keep_pending';return;}

  if(W._Ba?._$a?._yo?.ins?.isInMission===true&&S.joinedRoom!==null)S.seenBattle=true;

  if(S.seenBattle){

   if(party()?.getHasTeamByType?.(s.type)===true&&String(party()?.roomId)===S.joinedRoom){send(s.key+'/leave/'+S.joinedRoom,'exitSerAreRoom',[s.type]);S.reason='waiting_completed_room_exit';return;}

   if(party()?.getHasTeams?.()!==true){S.session=null;S.seenBattle=false;S.joinedRoom=null;S.born=Date.now();S.reason='completed_waiting_new_attempts';announce();return;}

  }

  if(s.type===2&&s.abortSent&&party()?.getHasTeamByType?.(2)!==true){S.session=null;S.seenBattle=false;S.joinedRoom=null;S.reason='exp_invitation_timeout_closed';announce();return;}

  const p=party(),inRoom=p?.getHasTeamByType?.(s.type)===true;

  if(p?.getHasTeams?.()===true&&!inRoom){S.reason='other_team_preserved';return;}

  if(!inRoom){

   if(!sessionSafe()){S.reason='waiting_safe_scene_'+idleReason();return;}

   if(actor===s.leader){if(!quota(d)){S.reason='no_daily_attempts';return;}if(s.type===2){s.createdAt=s.createdAt||Date.now();if(Date.now()-s.createdAt>12000){S.expFailUntil=Date.now()+30000;s.abortSent=true;if(typeof rpc()?.exitSerAreRoom==='function')rpc().exitSerAreRoom([2]);S.reason='exp_room_create_timeout';return;}if(sendRetry(s.key+'/create','creSerAreRoom',[s.type,'EXP MAIN CLONE',s.map,s.tier,0,0,0,1,false,false],2000,4)){S.reason='waiting_exp_room_create_ack';return;}S.reason=(S.actionAttempts[s.key+'/create']||0)>=4?'exp_room_create_ack_timeout_no_retry':'waiting_exp_room_create_ack';return;}send(s.key+'/create','creSerAreRoom',[s.type,'KVPV',s.map,s.tier,0,0,0,1,false,false]);S.reason='waiting_create_ack';}

   else {

    const inbox=p?.getAskLs?.(W._Ba?._cm?.TeamTypeToFuncId?.[s.type]);const invite=Array.isArray(inbox)?inbox.find(r=>Number(r?.[1])===s.type&&String(r?.[5])===s.leader&&Number(r?.[4])===s.tier):null;

    if(invite){const joinKey=s.key+'/join/'+invite[2];if(s.type===2)sendRetry(joinKey,'agrInviUSARoom',[s.type,invite[2],invite[4]],1000,10);else send(joinKey,'agrInviUSARoom',[s.type,invite[2],invite[4]]);S.reason='waiting_join_ack';}
    else if(s.type===2){
     // If the server accepted the main's quick-invite request but did not
     // publish an inbox row, use the game's native public-room list/apply
     // route as a fallback. Match only this configured main's exact EXP room.
     const rooms=Array.isArray(p?.roomList)?p.roomList:[];
     const row=rooms.find(r=>Array.isArray(r)&&Number(r[2])===2&&String(r[9])===s.leader&&Number(r[4])===s.tier&&Number(r[5])<4);
     if(row&&typeof rpc()?.applySerAreRoom==='function'){
      const roomId=String(row[1]),key=s.key+'/apply-room/'+roomId;
      if(sendRetry(key,'applySerAreRoom',[2,Number(s.leader),Number(row[1]),s.tier],2000,3))S.reason='waiting_main_room_apply_ack';
      else S.reason=(S.actionAttempts[key]||0)>=3?'room_apply_ack_timeout_no_retry':'waiting_main_room_apply_retry';
     }else{
      const key=s.key+'/room-list';
      if(typeof rpc()?.getRoomList==='function'&&sendRetry(key,'getRoomList',[2,0,20],2000,10))S.reason='waiting_exp_room_list';
      else S.reason=rooms.length?'waiting_main_exp_room_in_list':'waiting_exp_room_list';
     }
    }else S.reason='waiting_leader_invitation';

   }return;

  }

  S.joinedRoom=String(p.roomId);

  if(actor!==s.leader){S.reason='member_waiting_full_team';return;}

  // The party model can expose the new room before its leader flag is ACKed.
  // The elected main may still invite its configured clone in that exact EXP
  // room because this coordinator issued the create request; combat start below
  // continues to require the authoritative isLeader flag through exact().
  const ownExpRoom=s.type===2&&actor===s.leader&&Number(s.createdAt)>0;
  if(p.isLeader!==true&&!ownExpRoom){S.reason='foreign_leader_preserved';return;}

  if(!roomMapMatches(p,s)||Number(p.mapLve??p.roomMapLv)!==s.tier){S.reason='room_scope_mismatch';return;}

  const ids=members(),rid=String(p.roomId);

  if((s.matching!==true&&ids.some(id=>!s.ids.includes(id)))||ids.length>4){S.reason='unexpected_member_no_start';return;}

  if(!exact()){

    // Start the clone-join deadline only after the room is confirmed open.
    // Room creation latency must not consume the invitation window.
    if(s.type===2){s.inviteStartedAt=Number(s.inviteStartedAt)||Date.now();if(Date.now()-s.inviteStartedAt>12000){S.expFailUntil=Date.now()+30000;if(!s.abortSent&&typeof rpc()?.exitSerAreRoom==='function'){s.abortSent=true;rpc().exitSerAreRoom([2]);}S.reason='exp_clone_invitation_timeout_exit';return;}}
    if(s.type===2&&Date.now()-S.applyListAt>=2500&&typeof rpc()?.getApplyList==='function'){S.applyListAt=Date.now();rpc().getApplyList([2]);}
    const missing=s.ids.filter(id=>id!==actor&&!ids.includes(id));let inviteSent=false;
    if(missing.length&&typeof rpc()?.inviUserSARoom!=='function'){S.reason='missing_invite_rpc';return;}
    for(const id of missing)if(s.type===2){
     // Invite mode 0 is the native friends-list route. Mode 1 is the fixed
     // teammate route; it can return a generic success toast without adding
     // this arbitrary clone actor to the recipient inbox.
     if(sendRetry(s.key+'/invite/'+rid+'/'+id,'inviUserSARoom',[s.type,0,[Number(id)]],1000,10))inviteSent=true;
    }else inviteSent=send(s.key+'/invite/'+rid+'/'+id,'inviUserSARoom',[s.type,1,[Number(id)]])||inviteSent;

   for(const row of p.applyList||[])if(s.ids.includes(String(row?.[0])))send(s.key+'/approve/'+rid+'/'+row[0],'agreAplySARoom',[s.type,Number(row[0])]);

   S.reason=inviteSent?'waiting_clone_invitation_ack':missing.length?'waiting_clone_invitation_retry':'waiting_exact_tool_roster';return;

  }

  if(!quota(d)){S.reason='no_daily_attempts';return;}

  // Native EXP room UI uses creSerAreRoom as its "start matching" action
  // while the team has fewer than four members. startTeamBossCopy is only
  // the native start action for a full four-player team.
  if(s.type===2&&ids.length<4){
   const model=d.model();if(model&&model.autoStart!==true)model.autoStart=true;
   if(s.matching===true){S.reason='waiting_exp_match_roster';return;}
   if(typeof rpc()?.creSerAreRoom!=='function'){S.reason='waiting_exp_match_rpc';return;}
   const key=s.key+'/match/'+rid;
   if(S.locks.has(key)){s.matching=true;announce();S.reason='waiting_exp_match_roster';return;}
   if(send(key,'creSerAreRoom',[2,'Tên Phòng',2091,1,0,0,0,1,true,false])){s.matching=true;announce();S.reason='waiting_exp_match_ack';}
   else S.reason=S.locks.has(key)?'waiting_exp_match_ack':'waiting_exp_match_rpc';
   return;
  }

  if(!hooked){S.reason='waiting_verified_start_handler';return;}

  rpc()?.startTeamBossCopy?.([s.type]);S.reason='waiting_start_ack';

 }catch(e){S.error=String(e);S.reason='error_no_retry';}}

 function stop(){S.enabled=false;if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);S.channel?.close?.();

  const h=S.hook;if(h&&h.r.startTeamBossCopy===h.fn){if(h.descriptor)Object.defineProperty(h.r,'startTeamBossCopy',h.descriptor);else delete h.r.startTeamBossCopy;}}

 function observe(p){

  if(!p||!/^\d{5,20}$/.test(String(p.actor))||p.actor===actor||!Number.isFinite(p.power)||p.power<=0||!Array.isArray(p.quotas)||p.quotas.length>8)return;

  // Only bounded observations are accepted; no executable callback or method is read from messages.

  const session=p.session;if(session&&(!Array.isArray(session.ids)||![2,4].includes(session.ids.length)||session.ids.length===2&&session.type!==2||new Set(session.ids).size!==session.ids.length||!session.ids.every(id=>/^\d{5,20}$/.test(String(id)))||!session.ids.includes(session.leader)||![2,6].includes(session.type)||session.map!==(session.type===2?2091:2702)||session.tier!==1||typeof session.key!=='string'||session.key.length>200||session.matching!==undefined&&typeof session.matching!=='boolean'))return;

  const bs=p.boatSession;if(bs&&(!Array.isArray(bs.ids)||bs.ids.length!==2||new Set(bs.ids).size!==2||!bs.ids.every(id=>/^\d{5,20}$/.test(String(id)))||!bs.ids.includes(bs.leader)||bs.type!==4||bs.map!==2641||bs.tier!==1||typeof bs.key!=='string'||bs.key.length>200))return;
  S.peers.set(String(p.actor),{actor:String(p.actor),power:p.power,at:Date.now(),idle:p.idle===true,idleReason:String(p.idleReason||'unknown').slice(0,80),quotas:p.quotas.map(r=>[Number(r?.[0]),Number(r?.[1])]),session:session?{leader:session.leader,ids:[...session.ids],type:session.type,map:session.map,tier:session.tier,key:session.key,createdAt:Number(session.createdAt)||0,inviteStartedAt:Number(session.inviteStartedAt)||0,abortSent:session.abortSent===true,matching:session.matching===true}:null,boatSession:bs?{leader:bs.leader,ids:[...bs.ids],type:4,map:2641,tier:1,key:bs.key,createdAt:Number(bs.createdAt)||0}:null});if(S.peers.size>32)S.peers.delete(S.peers.keys().next().value);

 }

 if(typeof W.BroadcastChannel==='function'){S.channel=new W.BroadcastChannel('kvpv-active-party-v1');S.channel.onmessage=e=>observe(e?.data);}

 function receive(rows){if(!S.enabled||!owned()||!Array.isArray(rows)||rows.length>32)return;S.relayAt=Date.now();for(const p of rows){if(!Number.isFinite(p?.at)||Date.now()-p.at>15000||p.at>Date.now()+2000)continue;observe(p);}}

 W.KVPV_TEAM_COORDINATOR=Object.freeze({sync:tick,stop,receive,startExpGroup:requestExpGroup,status:()=>({enabled:S.enabled,reason:S.reason,lastError:S.error,session:S.session,dragonBoat:{reason:S.boatReason,session:S.boatSession},self:S.peers.get(actor)??null,accounts:peers().map(p=>({actor:p.actor,power:p.power,idle:p.idle,idleReason:p.idleReason})),startHandlerVerified:!!S.hook,expFailUntil:S.expFailUntil,expCooldownMs:Math.max(0,S.expFailUntil-Date.now()),allowKNB:false,scope:Date.now()-S.relayAt<15000?'local_machine_profiles':'same_origin_browser_profile'}),_handoff:()=>({actor,session:S.session,boatSession:S.boatSession,locks:[...S.locks],seenBattle:S.seenBattle,joinedRoom:S.joinedRoom,expFailUntil:S.expFailUntil})});

 S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,1000);tick();

})();

