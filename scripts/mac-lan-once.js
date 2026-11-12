
/* Paste into game-frame Console. Defines an explicit one-shot starter; does not run it. */

(() => {

 'use strict';const W=window,actor='10228867268946';

 const key='__KVPV_MAC_LAN_ONCE';

 const S=W[key]??(W[key]={attempted:false,pending:null,error:''});

 const party=()=>W._Ba?._cm?._q3t?.ins;

 function inspect(){const p=party(),m=W._Ba?._n4t?._t4t?.ins;

  return {actor:String(W._Ba?._rJ?._O$?.ins?.actorId??''),remaining:Number(m?.remainTimes),

   roomId:p?.roomId,type6:p?.getHasTeamByType?.(6)===true,leader:p?.isLeader===true,

   map:Number(p?.roomMapId),tier:Number(p?.mapLve??p?.roomMapLv),attempted:S.attempted,pending:S.pending,error:S.error};

 }

 function start(){const r=inspect(),u=W._Ba?._rJ?._O$?.ins;

  const fail=reason=>({ok:false,reason});

  if(r.actor!==actor||String(W.__KVPV_OWN_ACTOR_ID)!==actor||W.__KVPV_UNIVERSAL_HALTED)return fail('wrong_account');

  if(S.attempted)return fail('already_attempted_no_retry');

  if(!Number.isFinite(r.remaining)||r.remaining<=0)return fail('no_free_attempt');

  if(!r.type6||!r.leader||!r.roomId||r.map!==2702||r.tier!==1)return fail('need_mac_lan_room_and_leader');

  if(u?.isDead!==false||W._Ba?._$a?.SceneUtil?.isCommonScene!==true||W._Ba?._$a?._yo?.ins?.isInMission!==false)return fail('not_idle_or_alive');

  const rpc=W._Ba?._cm?._u3t?.ins;if(typeof rpc?.startTeamBossCopy!=='function')return fail('native_handler_unavailable');

  S.attempted=true;S.pending={at:Date.now(),roomId:String(r.roomId),type:6,map:2702,tier:1};

  try{rpc.startTeamBossCopy([6]);return {ok:true,state:'native_called_wait_server'};}

  catch(e){S.error=String(e?.message||e);return fail('native_error_no_retry');}

 }

 W.KVPV_MAC_LAN=Object.freeze({inspect,start});

})();

