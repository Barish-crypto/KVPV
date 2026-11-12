
/* Native Skill Handbook reward: _tYt._hYt._NCt rows [id,state,...].
 * UI _Kns claims only 0 < state <= 1 with GetSkillHandbookInfoReward(id).
 * Includes active/passive/holy categories; never opens a locked skill source. */

(() => {

  'use strict';

  const W=window,old=W.KVPV_SKILL_REWARDS,carry=old?._handoff?.();old?.stop?.('reload');

  const actor=String(W.__KVPV_OWN_ACTOR_ID||''),same=carry?.actor===actor,id='skill_handbook_rewards';

  const S={enabled:true,timer:null,registered:false,pending:same?carry.pending:null,

    requests:same?carry.requests:0,confirmed:same?carry.confirmed:0,reason:'waiting_model',lastError:''};

  const model=()=>W._Ba?._tYt?._hYt?.inst,rpc=()=>W._Ba?._tYt?._aYt?.inst;

  const owned=()=>actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;

  function ready(){

    const m=model(),keys=m?._NCt?.keys;if(!Array.isArray(keys))return [];

    return keys.map(key=>m.getInfoById?.(key)).filter(r=>Array.isArray(r)&&Number.isSafeInteger(Number(r[0]))&&Number(r[0])>0&&Number(r[1])>0&&Number(r[1])<=1)

      .map(r=>({id:Number(r[0]),state:Number(r[1])}));

  }

  function observe(){if(!S.pending)return;

    const row=model()?.getInfoById?.(S.pending.id);

    if(Array.isArray(row)&&Number(row[1])>=2){S.confirmed++;S.pending=null;S.reason='server_reward_claimed';}

    else S.reason=Date.now()-S.pending.at>30000?'waiting_reward_ack_no_retry':'waiting_reward_ack';

  }

  function probe(){

    if(!S.enabled||!owned())return {ready:false};observe();

    if(S.pending||W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true||typeof rpc()?.GetSkillHandbookInfoReward!=='function')return {ready:false};

    const q=ready()[0];return q?{ready:true,signature:q.id+':'+q.state,id:q.id}:{ready:false};

  }

  function run(before){const q=probe();if(!q.ready||q.signature!==before.signature)throw Error('Skill reward state changed');

    S.pending={id:q.id,at:Date.now()};S.requests++;S.reason='native_reward_sent';

    try{rpc().GetSkillHandbookInfoReward(q.id);}catch(e){S.lastError=String(e);throw e;}

  }

  function sync(){try{if(!S.enabled)return;if(!owned()){stop();return;}observe();

    if(!S.pending)S.reason=ready().length?'waiting_shared_claim_queue':'waiting_unclaimed_skill';

  }catch(e){S.lastError=String(e);}}

  function stop(){S.enabled=false;if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;

    if(S.registered)W.KVPV_V8?.toggle?.(id,false);}

  function start(){const queue=W.KVPV_V8;if(!queue?.register||!queue?.toggle){S.reason='waiting_shared_queue';return;}

    S.enabled=true;try{queue.register({id,name:'Nhận thưởng kích hoạt kỹ năng',kind:'claim',verified:true,enabled:true,

      spend:'none',background:true,directDuringPve:true,redIds:[],hourlyLimit:60,cooldownMs:2000,

      probe:()=>W.KVPV_SKILL_REWARDS?._probe()??{ready:false},run:p=>W.KVPV_SKILL_REWARDS?._run(p)});

    }catch(e){if(!/Trung module ID|already exists/i.test(String(e)))throw e;}

    queue.toggle(id,true);S.registered=true;

    if(S.timer===null)S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(sync,500);sync();

  }

  W.KVPV_SKILL_REWARDS=Object.freeze({start,stop,sync,_probe:probe,_run:run,

    status:()=>({enabled:S.enabled,actor,reason:S.reason,ready:ready(),pending:S.pending?{...S.pending}:null,

      requests:S.requests,confirmed:S.confirmed,lastError:S.lastError,allowKNB:false}),

    _handoff:()=>({actor,pending:S.pending?{...S.pending}:null,requests:S.requests,confirmed:S.confirmed})});

  start();

})();

