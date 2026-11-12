
/* Jiu Xiao Ling completed tasks: native state 1, never visits paid task targets. */

(() => {

  'use strict';

  const W=window,old=W.KVPV_SEASON_REWARDS,c=old?._handoff?.();old?.stop?.();

  const actor=String(W.__KVPV_OWN_ACTOR_ID||''),same=c?.actor===actor;

  const S={pending:same?c.pending:null,requests:same?c.requests:0,confirmed:same?c.confirmed:0};

  const id='season_completed_tasks',model=()=>W._Ba?._Je?._bJ?.ins;

  const owned=()=>actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&actor&&!W.__KVPV_UNIVERSAL_HALTED;

  const rows=kind=>model()?.[kind==='stage'?'stageTaskList':'seasonTaskList']??[];

  function probe(){if(!owned())return {ready:false};

    if(S.pending){const p=S.pending,r=rows(p.kind).find(r=>Number(r._id)===p.id),m=model();

      if(p.kind==='level'?(Number(m?.jiuxiaolingHaveRewardLV)>p.free||Number(m?.jiuxiaolingHaveGoldenRewardLV)>p.gold):r&&(Number(r._state)===2||Number(r._curtimes)>p.times)){S.pending=null;S.confirmed++;}else return {ready:false};

    }

    if(W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true)return {ready:false};

    for(const kind of ['stage','season'])for(const r of rows(kind).slice(0,200)){

      const taskId=Number(r._id),method=kind==='stage'?'getStageTaskReward':'getSeasonTaskReward';

      if(Number(r._state)!==1||!Number.isSafeInteger(taskId)||taskId<=0||typeof W._Ba?._Je?._Qe?.ins?.[method]!=='function')continue;

      return {ready:true,id:taskId,kind,method,times:Number(r._curtimes)||0,signature:kind+'/'+taskId+'/'+r._curtimes+'/'+r._state};

    }

    const m=model(),level=Number(m?.jiuxiaolingMyLevel),free=Number(m?.jiuxiaolingHaveRewardLV),gold=Number(m?.jiuxiaolingHaveGoldenRewardLV);

    if(Number.isSafeInteger(level)&&level>0&&Number.isSafeInteger(free)&&free>=0&&Number.isSafeInteger(gold)&&gold>=0&&

      (free<level||Number(m?.goldenState)>0&&gold<level)&&typeof W._Ba?._Je?._Qe?.ins?.getJiuXiaoLingReward==='function')

      return {ready:true,kind:'level',free,gold,signature:'level/'+level+'/'+free+'/'+gold};

    return {ready:false};

  }

  function run(before){const p=probe();if(!p.ready||p.signature!==before.signature)throw Error('Task reward state changed');

    S.pending={id:p.id,kind:p.kind,times:p.times,free:p.free,gold:p.gold};S.requests++;

    if(p.kind==='level')W._Ba._Je._Qe.ins.getJiuXiaoLingReward();else W._Ba._Je._Qe.ins[p.method](p.id);

  }

  function stop(){W.KVPV_V8?.toggle?.(id,false);}

  W.KVPV_SEASON_REWARDS=Object.freeze({_probe:probe,_run:run,stop,status:()=>({...S}),_handoff:()=>({actor,...S})});

  W.KVPV_V8?.toggle?.(id,false);

})();

