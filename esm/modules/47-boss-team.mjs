import {getKVPV_BOSS_TEAM as __getKVPV0,getKVPV_DAILY as __getKVPV1,getKVPV_ENTRY_POLICY as __getKVPV2,getKVPV_EVENT_PRIORITY as __getKVPV3,getKVPV_GUILD_BOSS as __getKVPV4,getKVPV_HITRUN1 as __getKVPV5,getKVPV_MODE as __getKVPV6,getKVPV_TEAM_COORDINATOR as __getKVPV7,getKVPV_V1 as __getKVPV8} from '../api.mjs';
export function call_KVPV_BOSS_TEAM_sync(...args){const target=globalThis["KVPV_BOSS_TEAM"];const fn=globalThis["KVPV_BOSS_TEAM"]?.["sync"];if(typeof fn!=='function')throw Error("KVPV_BOSS_TEAM.sync is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_BOSS_TEAM_stop(...args){const target=globalThis["KVPV_BOSS_TEAM"];const fn=globalThis["KVPV_BOSS_TEAM"]?.["stop"];if(typeof fn!=='function')throw Error("KVPV_BOSS_TEAM.stop is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_BOSS_TEAM_ownsBossTeams(...args){const target=globalThis["KVPV_BOSS_TEAM"];const fn=globalThis["KVPV_BOSS_TEAM"]?.["ownsBossTeams"];if(typeof fn!=='function')throw Error("KVPV_BOSS_TEAM.ownsBossTeams is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_BOSS_TEAM_priority(...args){const target=globalThis["KVPV_BOSS_TEAM"];const fn=globalThis["KVPV_BOSS_TEAM"]?.["priority"];if(typeof fn!=='function')throw Error("KVPV_BOSS_TEAM.priority is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_BOSS_TEAM_status(...args){const target=globalThis["KVPV_BOSS_TEAM"];const fn=globalThis["KVPV_BOSS_TEAM"]?.["status"];if(typeof fn!=='function')throw Error("KVPV_BOSS_TEAM.status is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_BOSS_TEAM__handoff(...args){const target=globalThis["KVPV_BOSS_TEAM"];const fn=globalThis["KVPV_BOSS_TEAM"]?.["_handoff"];if(typeof fn!=='function')throw Error("KVPV_BOSS_TEAM._handoff is not available");return Reflect.apply(fn,target,args);}
function __captureESMFunction(fn,name){
  if(fn.name!==name)Object.defineProperty(fn,"name",{value:name,configurable:true});
  return fn;
}
let __esmLocal0;
let __esmLocal1;
let __esmLocal2;
let __esmLocal3;
let __esmLocal4;
let __esmLocal5;
let __esmLocal6;
let __esmLocal7;
let __esmLocal8;
let __esmLocal9;
let __esmLocal10;
let __esmLocal11;
let __esmLocal12;
let __esmLocal13;
let __esmLocal14;
let __esmLocal15;
let __esmLocal16;
let __esmLocal17;
let __esmLocal18;
let __esmLocal19;
let __esmLocal20;
let __esmLocal21;
let __esmLocal22;
let __esmLocal23;
let __esmLocal24;
let __esmLocal25;
export {__esmLocal0 as local_anonymous_4_1_0};
export {__esmLocal1 as local_user_1};
export {__esmLocal2 as local_model_2};
export {__esmLocal3 as local_rpc_3};
export {__esmLocal4 as local_scene_4};
export {__esmLocal5 as local_common_5};
export {__esmLocal6 as local_owned_6};
export {__esmLocal7 as local_rows_7};
export {__esmLocal8 as local_anonymous_18_85_8};
export {__esmLocal9 as local_call_9};
export {__esmLocal10 as local_refresh_10};
export {__esmLocal11 as local_eligible_11};
export {__esmLocal12 as local_hold_12};
export {__esmLocal13 as local_restore_13};
export {__esmLocal14 as local_tick_14};
export {__esmLocal15 as local_anonymous_51_26_15};
export {__esmLocal16 as local_anonymous_65_33_16};
export {__esmLocal17 as local_anonymous_84_37_17};
export {__esmLocal18 as local_anonymous_86_17_18};
export {__esmLocal19 as local_anonymous_90_35_19};
export {__esmLocal20 as local_anonymous_95_27_20};
export {__esmLocal21 as local_stop_21};
export {__esmLocal22 as local_ownsBossTeams_22};
export {__esmLocal23 as local_priority_23};
export {__esmLocal24 as local_status_24};
export {__esmLocal25 as local__handoff_25};
export function initialize(){

/* Private Ma Than / Tinh Than teams; clones yield their activity only for a verified leader invitation. */

(__captureESMFunction((__esmLocal0=(() => {

 'use strict';const W=window,old=__getKVPV0(),carry=old?._handoff?.();old?.stop?.('reload');

 const actor=String(W.__KVPV_OWN_ACTOR_ID||''),same=carry?.actor===actor;

 const S={enabled:true,timer:null,locks:new Set(same?carry.locks:[]),pending:same?carry.pending:null,leader:same?carry.leader:null,roster:same?carry.roster:[],saved:same?carry.saved:null,inviteAt:same&&carry.inviteAt?carry.inviteAt:{},createKey:'',createAttempts:0,createAt:0,reason:'waiting_boss',error:'',refreshAt:0};

 const user=__captureESMFunction((__esmLocal1=(()=>W._Ba?._rJ?._O$?.ins)),"user"),model=__captureESMFunction((__esmLocal2=(()=>W._Ba?._MT?.the_secret_of_the_stars?._Gvt?.instance)),"model"),rpc=__captureESMFunction((__esmLocal3=(()=>W._Ba?._MT?.the_secret_of_the_stars?._jvt?.ins)),"rpc");

 const scene=__captureESMFunction((__esmLocal4=(()=>Number(W._Ba?._$a?.SceneUtil?.curScene))),"scene"),common=__captureESMFunction((__esmLocal5=(()=>W._Ba?._$a?.SceneUtil?.isCommonScene===true&&W._Ba?._$a?._yo?.ins?.isInMission!==true)),"common");

 const owned=__captureESMFunction((__esmLocal6=(()=>actor&&actor===String(user()?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED)),"owned");

 const rows=__captureESMFunction((__esmLocal7=(()=>Array.isArray(model()?.teamPlayerData)?model().teamPlayerData.filter(__captureESMFunction((__esmLocal8=(row=>/^[1-9]\d{4,24}$/.test(String(row?.[0]??'')))),"")):[])),"rows");

 function call(key,method,...args){if(S.locks.has(key)||typeof rpc()?.[method]!=='function')return false;S.locks.add(key);rpc()[method](...args);return true;}
__esmLocal9=call;


 function refresh(){if(Date.now()<S.refreshAt)return;S.refreshAt=Date.now()+10000;rpc()?.GetSelfStarsSecretTeamInfo?.();}
__esmLocal10=refresh;


 function eligible(map){if(map===2711)return Number(W._Ba?._Dvt?._Hvt?.ins?.challengePhyStren)>0;

  return map===2371&&Number(model()?.strengthvalue)>0&&model()?.auto!==true&&model()?.auto!==1;}
__esmLocal11=eligible;


 function hold(){

  if(!S.saved)S.saved={stage:W._Ba?._Co?._Mo?.ins?.auto===true,armed:__getKVPV6()?.status?.(false)?.autoMaintain===true};

  const st=W._Ba?._Co?._Mo?.ins;if(st)st.auto=false;

  if(__getKVPV5()?.status?.(false)?.running||__getKVPV6()?.status?.(false)?.autoMaintain)__getKVPV6()?.stop?.('priority_private_boss_invitation');

  W.KVPV?.core?.scene?.acquire?.('combat','boss-private-invite');

 }
__esmLocal12=hold;


 function restore(){if(!S.saved||!common()||S.pending)return;const saved=S.saved;S.saved=null;

  if(saved.stage&&W._Ba?._Co?._Mo?.ins&&!__getKVPV3()?.hold?.())W._Ba._Co._Mo.ins.auto=true;if(saved.armed)__getKVPV6()?.armTianQuan?.();

 }
__esmLocal13=restore;


 function tick(){if(__getKVPV2()?.manual===true)return;try{

  if(!S.enabled||!owned())return;if(__getKVPV4()?.active?.()){S.reason='guild_boss_priority';return;}restore();const peers=__getKVPV7()?.status?.()?.accounts??[];

  const clone=String(__getKVPV1()?.config?.tinhThanCloneId||'10228867268941').trim(),main=String(__getKVPV1()?.config?.tinhThanMainId||'10228867268946').trim();
  const peerIds=peers.map(__captureESMFunction((__esmLocal15=(p=>String(p.actor))),"")),configuredPair=/^[1-9]\d{4,24}$/.test(clone)&&clone!==actor&&peers.length===2&&peerIds.includes(actor)&&peerIds.includes(clone),configuredLeader=/^[1-9]\d{4,24}$/.test(main)&&/^[1-9]\d{4,24}$/.test(clone)&&main!==clone&&actor===main;
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

  const data=rows(),ids=data.map(__captureESMFunction((__esmLocal16=(row=>String(row?.[0]))),""));

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
   if(ids.includes(actor)&&data.some(__captureESMFunction((__esmLocal17=(row=>String(row?.[0])===actor&&Number(row?.[7])===1)),""))){S.createKey='';S.createAttempts=0;S.createAt=0;}

   if(!data.some(__captureESMFunction((__esmLocal18=(row=>String(row?.[0])===actor&&Number(row?.[7])===1)),""))){S.reason='foreign_boss_leader_preserved';return;}

   if(Number(m.autoAgreeApplyStarsSecretTeam)===1){call(key+'/private','setAutoAgreeApplyStarsSecretTeam',0);S.reason='waiting_private_team_setting';return;}

   for(const id of S.roster.filter(__captureESMFunction((__esmLocal19=(id=>id!==actor&&!ids.includes(id))),""))){
    if(Date.now()-Number(S.inviteAt[id]||0)<15000||typeof r.InviteOutMapUserJoinTeam!=='function')continue;
    S.inviteAt[id]=Date.now();r.InviteOutMapUserJoinTeam(Number(id));
   }

   S.reason=S.roster.every(__captureESMFunction((__esmLocal20=(id=>ids.includes(id))),""))?'private_boss_team_complete':'private_clone_invitations_sent';return;

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
__esmLocal14=tick;


 function stop(reason='manual'){S.enabled=false;if(reason!=='reload'&&W.KVPV?.core?.scene?.status?.()?.tag==='boss-private-invite')W.KVPV.core.scene.release?.('combat');if(S.timer!==null)(__getKVPV8()?.timers?.clearInterval??W.clearInterval)(S.timer);if(reason!=='reload')restore();}
__esmLocal21=stop;


 W.KVPV_BOSS_TEAM=Object.freeze({sync:tick,stop,ownsBossTeams:__captureESMFunction((__esmLocal22=(()=>S.enabled)),"ownsBossTeams"),priority:__captureESMFunction((__esmLocal23=(()=>S.enabled&&(!!S.pending||__getKVPV4()?.priority?.()===true))),"priority"),status:__captureESMFunction((__esmLocal24=(()=>({enabled:S.enabled,leader:S.leader,roster:S.roster,pending:S.pending,createAttempts:S.createAttempts,reason:S.reason,lastError:S.error,allowKNB:false}))),"status"),

  _handoff:__captureESMFunction((__esmLocal25=(()=>({actor,locks:[...S.locks],pending:S.pending,leader:S.leader,roster:S.roster,saved:S.saved,inviteAt:S.inviteAt}))),"_handoff")});

 S.timer=(__getKVPV8()?.timers?.setInterval??W.setInterval)(tick,500);tick();

})),""))();


}
export {getKVPV_BOSS_TEAM} from '../api.mjs';
export const api=Object.freeze({
  get KVPV_BOSS_TEAM(){return globalThis.KVPV_BOSS_TEAM;},
});