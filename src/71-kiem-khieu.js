
 

(() => {

 'use strict';const W=window,old=W.KVPV_KIEM_KHIEU,c=old?._handoff?.();old?.stop?.();

 const actor=String(W.__KVPV_OWN_ACTOR_ID||''),storage='kvpv.kiem-khieu.v1.'+actor;

 let attempts=c?.actor===actor?c.attempts:{};

 try{const saved=JSON.parse(W.localStorage?.getItem(storage)||'{}');if(saved&&typeof saved==='object'&&!Array.isArray(saved))attempts={...saved,...attempts};}catch(_){}

 const S={enabled:true,timer:null,reason:'waiting_server_window',error:'',pending:null,window:null,registered:false,inside:false,claimed:0};

 const own=()=>actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;

 const model=()=>W._Ba?._T_t?._k_t?.ins;

 function once(key,fn){if(attempts[key])return false;attempts[key]=Date.now();const rows=Object.entries(attempts).slice(-150);attempts=Object.fromEntries(rows);try{W.localStorage?.setItem(storage,JSON.stringify(attempts));}catch(_){}S.pending=key;fn();return true;}

 function idle(){const q=W.KVPV_DAILY?.quickState?.(),s=W.KVPV?.core?.scene?.status?.();return q?.running===true&&['rảnh','ranh'].includes(q.job)&&!s?.owner&&W.KVPV_HITRUN1?.status?.(false)?.running!==true&&

  W._Ba?._$a?.SceneUtil?.isCommonScene===true&&W._Ba?._$a?._yo?.ins?.isInMission===false&&W._Ba?._cm?._q3t?.ins?.getHasTeams?.()!==true;}

 function tick(){try{

  if(!S.enabled||!own())return;

  const m=model(),rpc=W._Ba?._T_t?._O3n?.ins,now=Number(W._Sa?.svrTime),state=m?.getSceneState1?.();

  S.inside=Number(W._ft?._po?.ins?.getCfgById?.(Number(W._C?._Mn?._Cn?.currentID))?.[7])===84;

  if(!m||!Array.isArray(state)||!Number.isFinite(now)||now<=0){S.reason='waiting_native_event_state';return;}

  const end=Number(state[4]);if(!Number.isFinite(end)||end<=0){S.reason='unknown_window';return;}

  const day=W.KVPV_DAILY_CLOCK?.key?.()??new Date().toISOString().slice(0,10),key=day+'/'+end;

  S.window=key;const info=m.enterInfo;S.registered=Array.isArray(info)&&Number(info[1])>0;

  if(!Array.isArray(info)){if(state[7]&&typeof m.reqInfo==='function')once(key+'/query',()=>m.reqInfo(0,0));S.reason='waiting_enter_info';return;}

  if(W._Ba?._rJ?._O$?.ins?.isDead!==false||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)){S.reason='yield_user_or_dead';return;}

  

  const rewards=W._ft?._UAh?.ins?.getRewardCfgByType?.(1),damage=Number(info[2]),received=info[3];

  if(Array.isArray(rewards)&&Number.isFinite(damage)&&Array.isArray(received)&&typeof rpc?.reqHurtReward==='function'){

   const row=rewards.find(r=>Array.isArray(r)&&Number.isSafeInteger(r[0])&&Number.isFinite(r[2])&&r[2]<=damage&&!received.includes(r[0])&&!attempts[key+'/reward/'+r[0]]);

   if(row){once(key+'/reward/'+row[0],()=>rpc.reqHurtReward(row[0]));S.reason='reward_requested_wait_server';return;}

   S.claimed=received.length;

  }

  if(S.inside){S.reason='inside_native_combat';return;}

  

  if(m.isChampion===true&&[1,2,3].includes(Number(m.stageStat))){

   if(idle()&&m.keepOutSize===false&&typeof rpc?.reqKeepOutSize==='function')once(day+'/keep-champion',()=>rpc.reqKeepOutSize(1));

   S.reason='champion_wait_native_round';return;

  }

  if(!state[7]||Number(m.stageStat)!==0){S.reason='waiting_open_elimination';return;}

  if(!idle()){S.reason='yield_current_activity';return;}

  if(end>now){

   if(Number(info[1])===0&&typeof W._Ba?._a2t?._P3n?.ins?.c2sName==='function'){

    once(key+'/register',()=>W._Ba._a2t._P3n.ins.c2sName(1581));

    

    if(typeof m.reqInfo==='function')once(key+'/register-query',()=>m.reqInfo(0,0));

    S.reason='registration_requested_wait_server';

   }else S.reason='registered_wait_entry_time';

   return;

  }

  if(Number(state[2])===2&&S.registered&&Number(m.matchCd)>0&&typeof W._Ba?._sst?._Cht?.inst?.rqEtScene==='function'){

   once(key+'/enter',()=>W._Ba._sst._Cht.inst.rqEtScene(8501,1));S.reason='entry_requested_wait_server';

  }else S.reason='waiting_native_match';

 }catch(e){S.error=String(e.message||e);S.reason='error_no_replay';}}

 function stop(){S.enabled=false;if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;}

 W.KVPV_KIEM_KHIEU=Object.freeze({sync:tick,stop,status:()=>({enabled:S.enabled,reason:S.reason,lastError:S.error,window:S.window,registered:S.registered,inside:S.inside,claimed:S.claimed,pending:S.pending,nativeCombat:true}),_handoff:()=>({actor,attempts:{...attempts}})});

 {const schedule=W.KVPV_V1?.timers?.setInterval??W.setInterval;if(typeof schedule==='function')S.timer=schedule(tick,1000);}tick();

})();

