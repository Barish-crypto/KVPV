




(() => {

  'use strict';

  const W=window,old=W.KVPV_PROGRESS_PLANNER,carry=old?._handoff?.();old?.stop?.('reload');

  const actor=String(W.__KVPV_OWN_ACTOR_ID||'');

  const same=carry?.actor===actor;

  const S={enabled:true,timer:null,plan:null,reason:'waiting_goal',lastError:'',towerOwned:same?carry.towerOwned:false,lastTowerKey:same?carry.lastTowerKey:null};

  const norm=x=>String(x||'').replace(/<[^>]*>/g,'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/gi,'d').toLowerCase();

  const matches=n=>/phap bao/.test(norm(n))&&/tu vi/.test(norm(n));

  const good=x=>Number.isFinite(x)&&x>=0;

  const owned=()=>actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;

  function goals(){

    const dependency=W.KVPV_REBORN_GOALS?.fabaoGoal?.();if(dependency)return [dependency];

    const result=[],row=W._Ba?._zIt?._FIt?.ins?.taskInfo;

    if(Array.isArray(row)){

      const cfg=W._ft?.__Z?.ins?.getTaskCfgById?.(row[0]),name=String(cfg?.[1]||'');

      if(matches(name)){

        const text=norm(name),m=/(?:tu vi\s*(?:phap bao)?\s*(?:dat|den)?\s*[:：]?\s*)(\d[\d.,]*)|(?:dat\s*)(\d[\d.,]*)\s*(?:diem\s*)?tu vi/.exec(text);

        const target=Number((m?.[1]||m?.[2]||'').replace(/[.,]/g,''));

        result.push({source:'MAIN',id:String(row[0]),state:Number(row[1]),name,target:target>0?target:null,progress:null,claimState:2});

      }else if(cfg&&[0,1,2,3].includes(Number(row[1])))return [];

    }

    const tasks=W._Ba?._G_n?._U_n?.ins?.tasks;

    for(const r of Array.isArray(tasks)?tasks:[]){const cfg=W._ft?._mei?.ins?.getXianweiTaskDataById?.(Number(r?.[0]));

      if(matches(cfg?.[3])&&[0,1].includes(Number(r?.[1])))result.push({source:'TIEN_VI',id:String(r[0]),state:Number(r[1]),name:String(cfg[3]),

        target:Number(cfg[12])>0?Number(cfg[12]):null,progress:good(Number(r[2]))?Number(r[2]):null,claimState:1});

    }return result;

  }

  function sources(itemId){

    const item=W._ft?._mY?.ins?.getItemCfgById?.(itemId),ids=item?.[14];

    if(!Array.isArray(ids))return [];

    const dungeons=W.KVPV_DAILY_TRIAL?.status?.()?.dungeons??[];

    return ids.filter(Number.isSafeInteger).map(id=>{

      const cfg=W._ft?._Bwt?.ins?.getCfgById?.(id),action=Number(cfg?.[3]?.[0]),map=Number(cfg?.[5]);

      // Native getWayJump1 prefers action, then panel, then map; do not treat a

      // map field as executable if the actual native route chooses something else.

      const direct=cfg&&!(cfg[3]?.length)&&!(cfg[4]?.length);

      const d=dungeons.find(d=>direct?d.id===map:d.feature===action);

      const ready=!!d&&d.known&&d.unlocked&&d.taskAllowed&&d.remaining>0&&Number.isSafeInteger(d.level)&&d.level>0;

      return {id,itemId,action,map,executor:d?'daily_trial':null,dungeon:d?.id??null,

        reason:ready?'free_material_challenge':d?'source_locked_or_no_free_turn':'unverified_source',ready};

    });

  }

  function inspect(){

    const goal=goals()[0];if(!goal)return {reason:'no_fabao_cultivation_goal',goal:null,upgrades:[]};

    if(goal.state===goal.claimState)return {reason:'waiting_existing_reward_queue',goal,upgrades:[]};

    const rise=W._Ba?._rnt?._vnt?.ins?.getAmuletRise?.(),nativeTuVi=Number(rise?.[1]);

    const current=goal.source!=='MAIN'?goal.progress:good(nativeTuVi)?nativeTuVi:null;

    const remaining=current!==null&&goal.target!==null?Math.max(0,goal.target-current):null;

    if(remaining===0)return {reason:'waiting_server_goal_ack',goal,current,nativeTuVi,remaining,upgrades:[]};

    if(remaining===null)return {reason:'waiting_verified_goal_progress',goal,current,nativeTuVi,remaining,upgrades:[]};

    const cfg=W._ft?._s$?.ins,bag=W._Ba?._Ic?._aQ?.ins;

    const upgrades=(W.KVPV_FABAO_FAST?.inspect?.()??[]).filter(x=>x.level>0&&x.level<x.max).map(x=>{

      const a=cfg?.getCfgByIdLevel?.(x.id,x.level),b=cfg?.getCfgByIdLevel?.(x.id,x.level+1),gain=Number(b?.[5])-Number(a?.[5]);

      const fragment=Number(a?.[4]),cost=Number(a?.[3]?.[1]),ownedItem=Number(bag?.getItemCountById?.(x.id)),ownedFragment=Number(bag?.getItemCountById?.(fragment));

      const known=Number.isSafeInteger(cost)&&cost>0&&good(ownedItem)&&good(ownedFragment)&&good(gain)&&gain>0;

      const missing=known?Math.max(0,cost-ownedItem-ownedFragment):null;

      return {id:x.id,level:x.level,gain:known?gain:null,cost,fragment,ownedItem,ownedFragment,missing,

        ready:known&&missing===0,reason:!known?'unknown_upgrade_cost_or_gain':missing?'missing_materials':'upgrade_owned_materials',

        sources:known&&missing?sources(fragment):[]};

    }).filter(x=>x.gain!==null);

    const ready=upgrades.find(x=>x.ready),exact=upgrades.flatMap(x=>x.sources).find(x=>x.ready);

    const tower=W.KVPV_LINHLUNG922?.status?.(false);

    const towerSource=upgrades.some(x=>x.missing>0)&&Number.isSafeInteger(tower?.highestFloor)&&Number.isSafeInteger(tower?.nextFloor)&&tower.nextFloor>tower.highestFloor&&typeof W.KVPV_LINHLUNG_TH?.start==='function'?

      {executor:'linh_lung',targetFloor:tower.nextFloor,currentFloor:tower.highestFloor,ready:true,reason:'user_confirmed_free_treasure_key_source',reward:'treasure_key',next:'fabao_treasure_type4',specificDropVerified:false}:null;

    const source=towerSource??exact;

    return {goal,current,nativeTuVi,remaining,upgrades,selected:ready?.id??null,source:ready?null:source??null,

      reason:ready?'upgrade_owned_materials':source?'farm_verified_material_source':upgrades.length?'missing_materials_no_verified_free_source':'no_verified_positive_upgrade'};

  }

  function materialDungeon(){if(!S.enabled||!owned()||W.KVPV_FABAO_TREASURE?.hasWork?.())return null;

    // Recompute from native state so a newly obtained item stops further farming.

    return inspect().source?.dungeon??null;

  }

  function stopOwnedTower(){

    if(!S.towerOwned)return true;

    const t=W.KVPV_LINHLUNG922,s=t?.status?.(false);

    if(s?.pendingFloor||s?.pendingClaim||s?.active&&(s.unclaimedNormal>0||s.unclaimedLarge>0)){S.reason='waiting_tower_battle_or_reward_ack';return false;}

    if(s?.active)t.stop?.('Pháp Bảo: kiểm tra lại vật phẩm và nhiệm vụ');S.towerOwned=false;return true;

  }

  function farmTower(source){

    const t=W.KVPV_LINHLUNG922,s=t?.status?.(false);

    if(s?.active){

      if(!S.towerOwned){S.reason='existing_tower_run_preserved';return;}

      if(s.highestFloor>=s.targetFloor){if(!stopOwnedTower())return;}

      else {S.reason='tower_for_fabao_materials';return;}

    }else if(S.towerOwned)S.towerOwned=false;

    const key=S.plan.goal.source+'/'+S.plan.goal.id+'/'+source.targetFloor;

    if(S.lastTowerKey===key){S.reason='tower_floor_already_attempted_no_restart';return;}

    const d=W.KVPV_DAILY?.quickState?.();

    if(W._Ba?._$a?.SceneUtil?.isCommonScene!==true||W._Ba?._$a?._yo?.ins?.isInMission===true||

      W._Ba?._rJ?._O$?.ins?.isDead===true||d?.running!==true||!['rảnh','ranh'].includes(d.job)||

      W.KVPV?.core?.scene?.status?.()?.owner||W.KVPV_UPGRADES?.busy?.()||W.KVPV_HITRUN1?.status?.(false)?.running){S.reason='waiting_idle_for_material_tower';return;}

    S.lastTowerKey=key;S.towerOwned=true;

    W.KVPV_LINHLUNG_TH.start({targetFloor:source.targetFloor,exclusiveDaily:true,autoClaim:true});S.reason='tower_for_fabao_materials';

  }

  function sync(){try{if(!S.enabled)return;if(!owned()){stop();return;}

    S.plan=inspect();S.reason=S.plan.reason;

    if(W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true){S.reason='priority_popup';return;}

    if(W.KVPV_FABAO_TREASURE?.hasWork?.()){

      if(!stopOwnedTower())return;S.reason='use_treasure_keys_then_collect_fabao';W.KVPV_FABAO_TREASURE.sync?.();return;

    }

    if(S.plan.source?.executor==='linh_lung'){farmTower(S.plan.source);return;}

    if(!stopOwnedTower())return;

    if(S.plan.selected)W.KVPV_FABAO_FAST?.sync?.();

    // Daily Trial's own scheduler consumes materialDungeon(), preserves pending

    // requests, scene ownership, free quotas and native lock checks.

  }catch(e){S.lastError=String(e);S.reason='error';}}

  function stop(reason='manual'){S.enabled=false;if(reason!=='reload')stopOwnedTower();if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;}

  W.KVPV_PROGRESS_PLANNER=Object.freeze({sync,stop,inspect,materialDungeon,

    status:()=>({enabled:S.enabled,actor,reason:S.reason,plan:S.plan,towerOwned:S.towerOwned,lastError:S.lastError,allowKNB:false}),

    _handoff:()=>({actor,towerOwned:S.towerOwned,lastTowerKey:S.lastTowerKey})});

  S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(sync,1000);sync();

})();

