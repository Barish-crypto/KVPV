





(() => {

  'use strict';

  const W=window,old=W.KVPV_RUNE_BOSS,carry=old?._handoff?.();old?.stop?.();

  const actor=String(W.__KVPV_OWN_ACTOR_ID||''),same=carry?.actor===actor,tag='rune-boss';

  const S={enabled:same?carry.enabled:true,timer:null,lease:false,stageAuto:null,

    pending:same?carry.pending:null,attempted:same?carry.attempted:null,reason:'waiting',lastError:'',requests:same?carry.requests:0};

  const model=()=>W._Ba?._IH?._ZY?.inst,arb=()=>W.KVPV?.core?.scene;

  const owned=()=>!!actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;

  const current=()=>Number(W._C?._Mn?._Cn?.currentID??W._Ba?._$a?._yo?.ins?.intoSce?.[0]);

  const common=()=>W._Ba?._$a?.SceneUtil?.isCommonScene===true&&W._Ba?._$a?._yo?.ins?.isInMission!==true;

  function release(){

    if(S.lease&&arb()?.status?.().tag===tag)arb()?.release?.('combat');S.lease=false;

    const stage=W._Ba?._Co?._Mo?.ins;if(owned()&&S.stageAuto===true&&stage?.auto===false&&!W.KVPV_EVENT_PRIORITY?.hold?.())stage.auto=true;

    S.stageAuto=null;

  }

  function reserve(){

    const a=arb(),l=a?.status?.(),job=W.KVPV_DAILY?.quickState?.()?.job;

    if(!a||l?.owner&&l.tag!==tag||job&&job!=='rảnh'&&job!=='ranh'||W.KVPV_HITRUN1?.status?.(false)?.running)return false;

    const stage=W._Ba?._Co?._Mo?.ins;

    if(S.stageAuto===null)S.stageAuto=stage?.auto===true;if(stage?.auto===true)stage.auto=false;

    if(!a.acquire('combat',tag)){release();return false;}S.lease=true;return true;

  }

  function tick(){if(W.KVPV_ENTRY_POLICY?.manual===true)return;try{

    if(!S.enabled)return;

    if(!owned()){stop();return;}

    if(W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true){S.reason='priority_popup';return;}

    const finished=Number(model()?.finishLv),floor=Number(model()?.currLv);

    if(!Number.isSafeInteger(finished)||finished<0||!Number.isSafeInteger(floor)||floor!==finished+1){S.reason='waiting_server_progress';return;}

    if(current()===2201&&!common()){

      if(S.pending)S.pending.entered=true;

      if(S.lease)arb()?.renew?.('combat');

      S.reason='hitrun_far_combat';return;

    }

    if(S.pending){

      if(common()&&finished>=S.pending.floor){S.pending=null;release();S.reason='floor_confirmed';}

      else if(common()&&S.pending.entered){S.pending=null;release();S.reason='floor_not_passed';return;}

      else {S.reason=Date.now()-S.pending.at>25000?'waiting_entry_ack_no_retry':'entering';

        if(Date.now()-S.pending.at>25000)release();else if(S.lease)arb()?.renew?.('combat');return;}

    }

    if(!common()){release();S.reason='other_activity';return;}

    if(W.KVPV_QUEST_PRIORITY?.blocks?.('rune_boss')){release();S.reason='priority_quest';return;}

    if(W._Ba?._rJ?._O$?.ins?.isDead===true){S.reason='waiting_revive';return;}

    const cfg=W._ft?._wZ?.ins?.getCfgByLv?.(floor);

    if(!cfg){release();S.reason='all_floors_completed_or_missing_config';return;}

    if(Number(cfg[0])!==floor){S.reason='invalid_floor_config';return;}

    if(S.attempted===floor){release();S.reason='floor_already_attempted';return;}

    const rpc=W._Ba?._sst?._Cht?.inst;

    if(typeof rpc?.rqEtScene!=='function'||rpc.checkEnterScene?.(2201,false)!==true){S.reason='native_entry_not_ready';return;}

    if(!reserve()){S.reason='scene_reserved';return;}

    S.pending={floor,at:Date.now(),entered:false};S.attempted=floor;S.requests++;

    S.reason='entering';rpc.rqEtScene(2201,floor);

  }catch(e){S.lastError=String(e);S.reason='error';release();W.KVPV_V1?.diagnostics?.record?.(e);}}

  function stop(){S.enabled=false;if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);

    S.timer=null;release();W.KVPV_MODE?.syncMap?.();}

  function start(){S.enabled=true;W.KVPV_MODE?.armTianQuan?.();

    if(S.timer===null)S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,1000);tick();}

  W.KVPV_RUNE_BOSS=Object.freeze({get enabled(){return S.enabled;},start,stop,sync:tick,

    status:()=>({enabled:S.enabled,actor,reason:S.reason,pending:S.pending?{...S.pending}:null,

      floor:Number(model()?.currLv),finished:Number(model()?.finishLv),requests:S.requests,lastError:S.lastError,

      goalDistance:302,recoveryEnabled:true,finishBossHpPct:2,allowKNB:false}),

    _handoff:()=>({actor,enabled:S.enabled,pending:S.pending?{...S.pending}:null,attempted:S.attempted,requests:S.requests})});

  if(S.enabled)start();

})();

