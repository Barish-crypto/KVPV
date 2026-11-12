
/* Separate era-node executors. Reuse native CoBao data/validated fragment
 * discovery, never overwrite main taskInfo. Arena uses free native attempts. */

(() => {

  'use strict';

  const W=window,old=W.KVPV_REBORN_EXECUTORS,carry=old?._handoff?.();old?.stop?.('reload');

  const actor=String(W.__KVPV_OWN_ACTOR_ID||''),same=carry?.actor===actor;

  const S={enabled:true,timer:null,fastTimer:null,fastAt:0,fastKey:null,fastRows:[],lease:same?carry.lease:false,savedOld:same?carry.savedOld:{},nextFetch:0,opened:null,

    cobao:same?carry.cobao:{pending:null,confirmed:0,requests:0,reason:'waiting_goal'},

    arena:same?carry.arena:{pending:null,confirmed:0,requests:0,reason:'waiting_goal'}};

  const owned=()=>actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;

  const stage=()=>W._Ba?._Co?._Mo?.ins,co=()=>W._Ba?._kAt?._LAt?.inst;

  const arb=()=>W.KVPV?.core?.scene,ui=()=>W._ft?._Y4n?.ins;

  const common=()=>W._Ba?._$a?.SceneUtil?.isCommonScene===true&&W._Ba?._$a?._yo?.ins?.isInMission!==true;

  function idle(arena=false){if(Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0))return false;const d=W.KVPV_DAILY?.quickState?.(),lease=arb()?.status?.();

    return owned()&&common()&&W._Ba?._rJ?._O$?.ins?.isDead!==true&&d?.running===true&&['rảnh','ranh'].includes(d.job)&&

      (!lease?.owner||arena&&lease.tag==='reborn-arena')&&!W.KVPV_HITRUN1?.status?.(false)?.running;

  }

  function coPlan(){const eraGoal=W.KVPV_REBORN_GOALS?.cobaoGoal?.();

    const p=W.KVPV_V864?.plan?.(),f=p?.fragments;


    const goal=eraGoal||(p?.reward?{id:'COBAO/reward',target:Infinity,availableOnly:true}:null);if(!goal)return null;

    if(!f)return {goal,step:'waiting_cobao_model'};

    if(Number(f.count)>=goal.target)return {goal,step:'waiting_era_node_ack',f};

    const step=!f.ready?'fetch':p.item?'use':p.reward?'claimStage':f.allPlaced?'activate':f.owned?'put':'missing';

    return {goal,step,f,item:p.item,reward:p.reward};

  }

  function cobaoStageGoal(){if(!S.enabled||!owned())return null;const p=coPlan();if(p?.step!=='missing'||p.goal.availableOnly||S.cobao.pending)return null;

    const level=Number(stage()?.curLv),rows=p.f.rows?.filter(r=>!r.owned&&!r.placed)??[];

    const target=rows.map(r=>Number(r.stage)).filter(n=>Number.isSafeInteger(n)&&n>0&&Number(W._ft?._h$?.ins?.getCfgByLv?.(n)?.[0])>0&&level<=n).sort((a,b)=>a-b)[0];

    return target?{...p.goal,id:p.goal.id+'/fragment-stage/'+target,kind:'STAGE',target,current:level-1}:null;

  }

  function observeCo(){const p=S.cobao.pending;if(!p)return;

    const fresh=W.KVPV_V864?.plan?.(),f=fresh?.fragments,rows=W._Ba?._Ic?._aQ?.ins?.getItemsByBagType?.(0);

    const done=p.step==='fetch'?f?.ready===true:p.step==='activate'?Number(f?.count)>p.count:

      p.step==='put'?!!co()?.epFrgmtsDic?.get?.(p.id):p.step==='claimStage'?Array.isArray(stage()?.awardLvs)&&!stage().awardLvs.map(Number).includes(p.lv):

      p.step==='use'?Array.isArray(rows)&&!rows.some(r=>String(r?.[2])===p.uid&&Number(r?.[1])>=p.amount):false;

    if(done){S.cobao.pending=null;S.cobao.confirmed++;S.cobao.reason='server_confirmed';}

    else S.cobao.reason=Date.now()-p.at>30000?'waiting_ack_no_retry':'waiting_server';

  }

  function coProbe(){observeCo();const p=coPlan();if(!S.enabled||!owned()||S.cobao.pending||!p||!coAllowed()||W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true)return {ready:false};

    if(!['fetch','activate','put','use','claimStage'].includes(p.step))return {ready:false};

    return {ready:true,signature:JSON.stringify([p.goal.id,p.step,p.f?.count,p.f?.rows?.map(r=>[r.id,r.owned,r.placed]),p.item?.sig,p.reward?.sig]),step:p.step};

  }

  function coRun(before){const q=coProbe(),p=coPlan();if(!q.ready||q.signature!==before.signature)throw Error('CoBao era state changed');

    const pending={step:p.step,at:Date.now(),count:p.f?.count};let send;

    const rpc=W._Ba?._kAt?._IMi?.inst;

    if(p.step==='fetch'&&typeof rpc?.getShQiInfo==='function')send=()=>rpc.getShQiInfo();

    if(p.step==='activate'&&p.f.allPlaced&&typeof rpc?.actShenQi==='function')send=()=>rpc.actShenQi();

    if(p.step==='put'&&p.f.owned&&typeof rpc?.epFragment==='function'){pending.id=p.f.owned.id;send=()=>rpc.epFragment([pending.id]);}

    if(p.step==='use'&&p.item&&typeof W._Ba?._Ic?._oJ?.instance?.c2sUseBagItem==='function'){

      const rows=W._Ba?._Ic?._aQ?.ins?.getItemsByBagType?.(0),row=rows?.find(r=>String(r?.[2])===String(p.item.uid)&&Number(r?.[0])===p.item.id);

      if(row&&W._Ba?._Ic?.BeiBaoTool?.checkItemCanUseOrNotice?.(row,false)===true){pending.uid=String(p.item.uid);pending.amount=Number(row[1]);send=()=>W._Ba._Ic._oJ.instance.c2sUseBagItem(p.item.uid,p.item.id,1);}

    }

    if(p.step==='claimStage'&&Number(stage()?.awardLvs?.[0])===p.reward?.lv&&Number(stage()?.curLv)>p.reward.lv&&typeof W._Ba?._sst?._Cht?.inst?.getCpAward==='function'){

      pending.lv=p.reward.lv;send=()=>W._Ba._sst._Cht.inst.getCpAward(p.reward.mapId,p.reward.lv);

    }

    if(!send)throw Error('Native CoBao operation unavailable');if(W.KVPV_V864?.config){if(!('cobao' in S.savedOld))S.savedOld.cobao=W.KVPV_V864.config.enabled;W.KVPV_V864.config.enabled=false;}

    S.cobao.pending=pending;S.cobao.requests++;send();

  }

  function coAllowed(){

    if(!owned()||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)||W._Ba?._rJ?._O$?.ins?.isDead===true)return false;

    return W.KVPV_PARALLEL_ACTIONS?.canDirectDuringPve?.()===true||idle();

  }

  // One cheap native-state check per requested tick; bag discovery is bounded to 10 Hz.

  // All sends still use the same pending latch as the normal executor.

  function fastCo(){try{

    if(!S.enabled||!owned()||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0))return;

    const m=co(),st=stage(),now=Date.now();

    const key=JSON.stringify([W._C?._Mn?._Cn?.currentID,st?.curLv,st?.awardLvs,

      m?.shenqi?.length,S.fastRows.map(id=>[id,!!m?.frgmtsDic?.get?.(id),!!m?.epFrgmtsDic?.get?.(id)])]);

    if(key===S.fastKey&&now<S.fastAt)return;

    S.fastKey=key;S.fastAt=now+100;if(!coAllowed())return;

    const q=coProbe(),p=coPlan();S.fastRows=(p?.f?.rows||[]).map(r=>r.id);

    if(q.ready)coRun(q);

  }catch(e){S.cobao.reason='error';S.cobao.error=String(e);}}

  function arenaPlan(){const questGoal=W.KVPV_REBORN_GOALS?.arenaGoal?.(),m=W._Ba?._tjt?._ljt?.ins,t=m?.times,rows=m?.objs;

    const attempts=Number(t?.[2]),max=Number(t?.[1]),until=Number(t?.[0]),svr=Number(W._Sa?.svrTime),power=Number(W._Ba?._qo?._Ro?.ins?.fight),rank=Number(rows?.[3]?.[4]);

    const used=Number.isFinite(max)&&Number.isFinite(attempts)?Math.max(0,max-attempts):0;

    const dailyRemaining=Number.isFinite(attempts)?Math.max(0,Math.min(attempts,10-used)):0;

    const goal=questGoal||{id:'ARENA_DAILY_FREE',kind:'ARENA_DAILY',progress:used,target:10};

    const target=(Array.isArray(rows)?rows.slice(0,3):[]).map(r=>({id:Number(r?.[0]),power:Number(r?.[3]),rank:Number(r?.[4])}))

      .filter(r=>Number.isSafeInteger(r.id)&&r.id>0&&r.rank>0&&rank>r.rank&&r.power>0&&power>=r.power*1.08).sort((a,b)=>a.rank-b.rank)[0];

    const age=Number(W._Ba?._rJ?._O$?.ins?.creRoleDay??W._Ba?._rJ?._O$?.ins?.nDay),quickSelected=t?.[5]===true||t?.[5]===1,quick=quickSelected&&age>=2&&!!target&&attempts>0;

    const ready=Array.isArray(t)&&Number.isFinite(attempts)&&dailyRemaining>0&&Number.isFinite(until)&&Number.isFinite(svr)&&until<=svr&&!!target&&

      W._Ba?._Do?._Ho?.inst?.getFcIsOpen?.(165)===true;

    return {goal,questGoal,attempts,max,used,dailyRemaining,until,target,quickSelected,quick,age,ready,reason:!Array.isArray(t)?'waiting_native_arena_data':dailyRemaining<=0?'daily_10_attempt_limit_or_no_free_attempts':until>svr?'native_cooldown':!target?'no_safe_opponent':'ready',

      signature:JSON.stringify([goal.id,goal.progress,t?.slice(0,6),used,dailyRemaining,target?.id,target?.rank])};

  }

  function arenaYield(){return W.KVPV_RED_DOT_MODULE?.blocksProgression?.()===true||W.KVPV_EVENT_PRIORITY?.hold?.()===true||
    W.KVPV_BOSS_TEAM?.priority?.()===true||W.KVPV_ENTRY_POLICY?.manual===true;}

  function release(){if(S.lease&&arb()?.status?.()?.tag==='reborn-arena')arb()?.release?.('combat');S.lease=false;}

  function observeArena(){const p=S.arena.pending;if(!p)return;const current=Number(W._C?._Mn?._Cn?.currentID);

    if(current===2281||W._Ba?._$a?._yo?.ins?.isInArena===true)p.entered=true;

    const attempts=Number(W._Ba?._tjt?._ljt?.ins?.times?.[2]);

    if(Number.isFinite(attempts)&&attempts<p.attempts&&(p.quick||p.entered&&common())){S.arena.pending=null;S.arena.confirmed++;S.arena.reason='free_attempt_consumed_fight_returned';release();}

    else {S.arena.reason=Date.now()-p.at>120000?'waiting_arena_ack_no_retry':'waiting_arena_result';if(S.lease&&arb()?.status?.()?.tag==='reborn-arena')arb()?.renew?.('combat');else S.lease=false;}

  }

  function arenaProbe(){observeArena();const p=arenaPlan();return {ready:!!(S.enabled&&owned()&&!S.arena.pending&&p?.ready&&idle(true)&&!arenaYield()&&W.KVPV_CONFIRM_POPUPS?.beforeTask?.()!==true&&

      ![292,293,1708].some(id=>ui()?.isOpened?.(id)===true)&&typeof W._Ba?._tjt?._vjt?.ins?.challengeArena==='function'),signature:p?.signature};}

  function arenaRun(before){const q=arenaProbe(),p=arenaPlan();if(!q.ready||q.signature!==before.signature)throw Error('Arena era state changed');

    if(arb()?.acquire?.('combat','reborn-arena')!==true)throw Error('Arena scene busy');S.lease=true;

    S.arena.pending={at:Date.now(),attempts:p.attempts,quick:p.quick,entered:false};S.arena.requests++;

    W._Ba._tjt._vjt.ins.challengeArena(p.target.id,p.quick?1:-1);

  }

  function sync(){try{if(!S.enabled)return;if(!owned()){stop();return;}observeCo();observeArena();

    const c=coPlan();

    for(const [key,api,active]of [['cobao',W.KVPV_V864,!!c||!!S.cobao.pending],['arena',W.KVPV_V865,!!arenaPlan()||!!S.arena.pending]]){

      if(active&&api?.config){if(!(key in S.savedOld))S.savedOld[key]=api.config.enabled;api.config.enabled=false;}

      else if(key in S.savedOld&&api?.config){api.config.enabled=S.savedOld[key];delete S.savedOld[key];}

    }

    if(!S.cobao.pending)S.cobao.reason=c?.step??'waiting_goal';

    const a=arenaPlan();if(!S.arena.pending)S.arena.reason=a?.reason??'waiting_goal';

    if(a?.ready&&!S.arena.pending&&idle(true)&&!arenaYield()&&W.KVPV_CONFIRM_POPUPS?.beforeTask?.()!==true){

      arenaRun({signature:a.signature});

    }else if(a&&!S.arena.pending&&W._Ba?._Do?._Ho?.inst?.getFcIsOpen?.(165)===true&&idle()&&!arenaYield()&&W.KVPV_CONFIRM_POPUPS?.beforeTask?.()!==true){

      if(S.opened!==a.goal.id){S.opened=a.goal.id;ui()?.openByActionId?.(165);}

      if(Date.now()>=S.nextFetch&&typeof W._Ba?._tjt?._vjt?.ins?.getArena==='function'){S.nextFetch=Date.now()+30000;W._Ba._tjt._vjt.ins.getArena();}

    }

    W.KVPV_QUEST_PRIORITY?.sync?.();

  }catch(e){S.arena.reason='error';S.arena.error=String(e);}}

  const defs=[{id:'reborn_cobao_step',name:'Chuyển Sinh: Cổ Bảo',probe:coProbe,run:coRun},{id:'reborn_arena_fight',name:'Chuyển Sinh: Arena miễn phí',probe:arenaProbe,run:arenaRun}];

  function stop(reason='manual'){S.enabled=false;if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;if(S.fastTimer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.fastTimer);S.fastTimer=null;

    for(const d of defs)W.KVPV_V8?.toggle?.(d.id,false);

    if(reason!=='reload'&&owned())for(const [key,api,pending]of [['cobao',W.KVPV_V864,S.cobao.pending],['arena',W.KVPV_V865,S.arena.pending]]){

      if(!pending&&key in S.savedOld&&api?.config){api.config.enabled=S.savedOld[key];delete S.savedOld[key];}

    }

    if(reason!=='reload'&&!S.arena.pending)release();}

  W.KVPV_REBORN_EXECUTORS=Object.freeze({sync,stop,cobaoStageGoal,_coProbe:coProbe,_coRun:coRun,_arenaProbe:arenaProbe,_arenaRun:arenaRun,

    status:()=>({enabled:S.enabled,actor,cobao:{...S.cobao,pollMs:1,bagScanMs:100,plan:coPlan()},arena:{...S.arena,plan:arenaPlan()},allowKNB:false}),

    _handoff:()=>({actor,cobao:S.cobao,arena:S.arena,lease:S.lease,savedOld:S.savedOld})});

  for(const d of defs){try{W.KVPV_V8?.register?.({id:d.id,name:d.name,kind:'work',spend:d.id==='reborn_arena_fight'?'none':'materials',verified:true,enabled:true,background:false,redIds:[],hourlyLimit:60,cooldownMs:2000,

      probe:()=>W.KVPV_REBORN_EXECUTORS?.[d.id==='reborn_cobao_step'?'_coProbe':'_arenaProbe']()??{ready:false},

      run:p=>W.KVPV_REBORN_EXECUTORS?.[d.id==='reborn_cobao_step'?'_coRun':'_arenaRun'](p)});

    }catch(e){if(!/Trung module ID|already exists/i.test(String(e)))throw e;}W.KVPV_V8?.toggle?.(d.id,true);}

  S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(sync,500);S.fastTimer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(fastCo,50);sync();

})();

