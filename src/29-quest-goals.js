





(() => {

  'use strict';

  const W=window,old=W.KVPV_QUEST_GOALS,carry=old?._handoff?.();old?.stop?.('reload');

  const actor=String(W.__KVPV_OWN_ACTOR_ID||''),same=carry?.actor===actor;

  const S={enabled:true,timer:null,route:null,reason:'waiting_task',lastError:'',

    towerOwned:same?carry.towerOwned:false,startedKey:same?carry.startedKey:null,

    savedCo:same?carry.savedCo:null,stageWork:same?carry.stageWork:null,dependency:null,history:[]};

  const owned=()=>actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;

  function mainTask(){const row=W._Ba?._zIt?._FIt?.ins?.taskInfo;

    if(!Array.isArray(row)||row[0]==null)return null;

    const cfg=W._ft?.__Z?.ins?.getTaskCfgById?.(row[0]);if(!cfg)return null;

    return {id:String(row[0]),state:Number(row[1]),name:String(cfg[1]||''),action:Number(cfg[6]),progress:row[2]??null};

  }

  function task(){const main=mainTask();return recognize(main)&&main.state!==2?main:(W.KVPV_REBORN_GOALS?.towerGoal?.()??W.KVPV_TIENVI_GOALS?.goal?.()??main);}

  const normalize=x=>String(x).replace(/<[^>]*>/g,'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/gi,'d').toLowerCase().replace(/\s+/g,' ').trim();

  function recognize(q){if(!q)return null;const name=normalize(q.name);let kind,match;

    if(q.action===189&&/co bao/.test(name)&&/kich hoat/.test(name)){

      kind='CO_BAO';match=/kich hoat\s*(\d+)\s*co bao/.exec(name);

    }else if(q.action===21&&/linh lung thap/.test(name)){

      kind='LINH_LUNG';match=/linh lung thap\s*(?:tang)?\s*(\d+)/.exec(name);

    }

    const target=Number(['TIEN_VI','REBORN'].includes(q.source)?q.target:match?.[1]);return kind&&Number.isSafeInteger(target)&&target>0&&target<=10000?{kind,target,key:q.id+'/'+kind+'/'+target}:null;

  }

  function restoreCo(){restoreStage();const cfg=W.KVPV_V864?.config;if(S.savedCo&&cfg){Object.assign(cfg,S.savedCo);S.savedCo=null;}}

  function note(reason){if(S.reason!==reason){S.history.push({at:Date.now(),reason});if(S.history.length>40)S.history.shift();}S.reason=reason;}

  function tower(){return W.KVPV_LINHLUNG922;}

  function stopOwnedTower(){

    if(!S.towerOwned)return true;

    const s=tower()?.status?.(false);

    if(s?.pendingFloor||s?.pendingClaim){note('waiting_owned_tower_finish');return false;}

    if(s?.active)tower()?.stop?.('Nhiệm vụ đã đổi hoặc đủ mục tiêu');S.towerOwned=false;return true;

  }

  function idle(){if(Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0))return false;const q=W.KVPV_DAILY?.quickState?.(),lease=W.KVPV?.core?.scene?.status?.();

    return W._Ba?._$a?.SceneUtil?.isCommonScene===true&&W._Ba?._$a?._yo?.ins?.isInMission!==true&&

      W._Ba?._rJ?._O$?.ins?.isDead!==true&&q?.running===true&&['rảnh','ranh'].includes(q.job)&&

      !lease?.owner&&!W.KVPV_HITRUN1?.status?.(false)?.running&&!W.KVPV_UPGRADES?.busy?.()&&

      !W.KVPV_DAILY_TRIAL?.hasPriority?.();

  }

  

  function prerequisites(p){

    const f=p?.fragments,stage=W._Ba?._Co?._Mo?.ins,level=Number(stage?.curLv);

    const missing=(f?.rows??[]).filter(x=>!x.owned&&!x.placed).map((x,index)=>{

      const required=Number(x.stage??f?.config?.[7]?.[x.index??index]);

      const cfg=Number.isSafeInteger(required)&&required>0?W._ft?._h$?.ins?.getCfgByLv?.(required):null;

      return {id:x.id,name:String(W._ft?._mY?.ins?.getItemCfgById?.(x.id)?.[1]||''),

        stage:cfg&&Number(cfg[0])>0?required:null,

        source:'shenqi[7]',step:cfg&&Number(cfg[0])>0&&Number.isSafeInteger(level)?

          level<=required?'clear_stage':Array.isArray(stage?.awardLvs)&&stage.awardLvs.map(Number).includes(required)?'claim_reward':'waiting_fragment_state':'unknown_source'};

    });

    return {artifactNumber:Number(f?.count)+1,name:String(f?.config?.[1]||''),currentStage:Number.isSafeInteger(level)?level:null,missing};

  }

  function restoreStage(){const w=S.stageWork;if(!w)return;

    const cfg=W.KVPV_V864?.config,stage=W._Ba?._Co?._Mo?.ins,daily=W.KVPV_DAILY;

    if(cfg)cfg.suspendTuVuotDuringCoBao=w.suspend;

    if(W.KVPV_V866?.config&&typeof w.questFirst==='boolean')W.KVPV_V866.config.questFirst=w.questFirst;

    if(owned()){

      

      if(stage?.auto===true)stage.auto=false;

      if(daily?.config)daily.config.enableTuVuot=w.dailyEnabled;

    }

    S.stageWork=null;

  }

  function acquireFragment(p){

    S.dependency=prerequisites(p);

    if(p?.step!=='missing'){restoreStage();return false;}

    const goals=S.dependency.missing.filter(x=>x.step==='clear_stage').map(x=>x.stage);

    const target=goals.length?Math.min(...goals):null;

    if(S.stageWork&&(target===null||S.stageWork.goal!==target))restoreStage();

    if(target===null)return false;

    const cfg=W.KVPV_V864?.config,daily=W.KVPV_DAILY;

    if(!cfg||typeof daily?.tuVuotStart!=='function')return false;

    if(W.KVPV?.stageGuard?.isLocked?.()===true){note('cobao_prerequisite_stage_manually_paused');return true;}

    if(S.stageWork){cfg.suspendTuVuotDuringCoBao=false;note('cobao_farming_stage_'+target);return true;}

    if(!idle()){note('waiting_idle_for_cobao_fragment_stage');return true;}

    S.stageWork={goal:target,suspend:cfg.suspendTuVuotDuringCoBao,dailyEnabled:daily.config?.enableTuVuot===true,questFirst:W.KVPV_V866?.config?.questFirst};

    cfg.suspendTuVuotDuringCoBao=false;

    try{

      

      

      if(W.KVPV_V866?.config){W.KVPV_V866.config.questFirst=false;W.KVPV_V866.tick?.();}

      daily.tuVuotStart();note('cobao_farming_stage_'+target);}

    catch(e){restoreStage();throw e;}

    return true;

  }

  function tick(){try{

    if(!S.enabled)return;if(!owned()){stop();return;}

    if(W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true){note('priority_popup');return;}

    const q=task(),route=recognize(q);S.route=route?{...route,task:q}:null;

    if(!route||q.state===2){restoreCo();if(!stopOwnedTower())return;note(q?.state===2?'waiting_native_quest_reward':'no_supported_goal');return;}

    if(route.kind==='CO_BAO'){

      if(!stopOwnedTower())return;

      const api=W.KVPV_V864,cfg=api?.config;if(!cfg){note('waiting_cobao_executor');return;}

      if(!S.savedCo)S.savedCo={coBaoTaskId:cfg.coBaoTaskId,requiredCoBao:cfg.requiredCoBao};

      cfg.coBaoTaskId=q.id;cfg.requiredCoBao=route.target;

      const p=api.plan?.();

      if(acquireFragment(p))return;

      note(p?.fragments?.count>=route.target?'waiting_cobao_quest_ack':

        p?.step==='missing'?'missing_cobao_fragments':p?.step?'cobao_'+p.step:'cobao_executor_ready');return;

    }

    restoreCo();const t=tower(),state=t?.status?.(false),finished=Number(W._Ba?._tQ?._$Y?.ins?.finishLevel);

    if(!Number.isSafeInteger(finished)||finished<0){note('waiting_tower_server_progress');return;}

    if(finished>=route.target){if(!stopOwnedTower())return;note('waiting_tower_quest_ack');return;}

    if(state?.active){

      if(S.towerOwned&&state.targetFloor!==route.target)t.setTargetFloor(route.target);

      note(S.towerOwned?'tower_goal_running':'manual_tower_already_running');return;

    }

    if(S.startedKey===route.key){note('tower_goal_already_started_no_replay');return;}

    if(!idle()){note('waiting_idle_for_tower_goal');return;}

    if(!W.KVPV_LINHLUNG_TH?.start){note('waiting_tower_executor');return;}

    S.startedKey=route.key;S.towerOwned=true;note('starting_tower_goal');

    W.KVPV_LINHLUNG_TH.start({targetFloor:route.target,exclusiveDaily:true});

  }catch(e){S.lastError=String(e);note('error');W.KVPV_V1?.diagnostics?.record?.(e);}}

  function stop(reason='manual'){S.enabled=false;

    if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;

    if(reason!=='reload'){restoreCo();stopOwnedTower();}}

  function start(){if(S.timer!==null)return;S.enabled=true;

    S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,1000);tick();}

  W.KVPV_QUEST_GOALS=Object.freeze({start,stop,sync:tick,recognize,

    status:()=>({enabled:S.enabled,actor,route:S.route,dependency:S.dependency,reason:S.reason,lastError:S.lastError,history:S.history.map(x=>({...x})),allowKNB:false}),

    _handoff:()=>({actor,towerOwned:S.towerOwned,startedKey:S.startedKey,savedCo:S.savedCo,stageWork:S.stageWork})});

  start();

})();

