
/* Read-only, bounded diagnostics for the local debugger bridge. */

(() => {

  'use strict';

  const W=window,actor=String(W.__KVPV_OWN_ACTOR_ID||'');let at=-Infinity,cached=null;

  // Retire manual experiment APIs in already-open tabs; preserve any pending state.

  delete W.KVPV_TOWER_SKILLS;delete W.KVPV_BUFF_INSPECT;

  const str=x=>String(x??'').slice(0,300);

  function economySnapshot(){
    const ids=[20320001,20330001,20330002,20340001,20340002,20340003,20340004,20340005];
    const amounts=[20000,250000,500000,1000000,2000000,5000000,10000000,20000000];
    const integer=x=>typeof x==='number'&&Number.isSafeInteger(x)&&x>=0?x:null;
    try{
      const user=W._Ba?._rJ?._O$?.ins,bag=W._Ba?._Ic?._aQ?.ins;
      if(String(user?.actorId??'')!==actor)return null;
      const items=bag?.isBagInited===true?bag.getItemsByBagType?.(0):null;
      const inventoryReady=Array.isArray(items),counts=new Map(ids.map(id=>[id,0]));
      if(inventoryReady)for(const item of items){
        if(!Array.isArray(item)||!counts.has(item[0]))continue;
        const count=integer(item[1]),previous=counts.get(item[0]);
        counts.set(item[0],count===null||previous===null?null:integer(previous+count));
      }
      return {actor,at:Date.now(),source:'client_state_only',
        moneyReady:user.isInitedMoney===true,
        gold:user.isInitedMoney===true?integer(user.copper):null,
        ingot:user.isInitedMoney===true?integer(user.ingot):null,
        inventoryReady,
        goldChests:ids.map((id,i)=>({id,count:inventoryReady?counts.get(id):null,goldPerChest:amounts[i]}))};
    }catch(e){return {actor,at:Date.now(),source:'client_state_only',error:str(e.message)};}
  }
  function snapshot(){

    if(!actor||actor!==String(W._Ba?._rJ?._O$?.ins?.actorId??'')||W.__KVPV_UNIVERSAL_HALTED)return null;

    if(Date.now()-at<5000)return cached;

    const era=W.KVPV_REBORN_GOALS?.inspect?.(),rows=W.KVPV_TIENVI_GOALS?.inspect?.()??[],mainRow=W._Ba?._zIt?._FIt?.ins?.taskInfo,

      cfg=Array.isArray(mainRow)?W._ft?.__Z?.ins?.getTaskCfgById?.(mainRow[0]):null;

    const main=cfg?{id:str(mainRow[0]),name:str(cfg[1]),action:Number(cfg[6]),state:Number(mainRow[1])}:null;

    const tasks=(era?.tasks??[]).slice(0,20).map(q=>({id:str(q.id),nodeId:q.nodeId,name:str(q.name),state:q.state,progress:q.progress,target:q.target,

      action:q.action,rawAction:q.rawAction,mode:q.mode,kind:str(q.kind)}));

    const missing=tasks.filter(q=>q.state!==2&&!['LEVEL','STAGE','LINH_LUNG','FABAO','EQUIPMENT','CO_BAO','ARENA'].includes(q.kind));

    const mainRoute=W.KVPV_V866?.status?.(false)?.route;

    if(main&&main.state!==2&&mainRoute==='unknown'&&!era?.root)missing.push({source:'MAIN',...main,kind:'unverified_executor'});

    const tv=rows.slice(0,80).map(q=>({id:str(q.id),name:str(q.name),state:q.state,progress:q.progress,target:q.target,action:q.action,executor:str(q.executor),reason:str(q.reason)}));

    for(const q of tv)if(q.state===0&&['unverified_requirement','waiting_config'].includes(q.executor))missing.push({source:'TIEN_VI',...q});

    const exec=W.KVPV_REBORN_EXECUTORS?.status?.(),planner=W.KVPV_PROGRESS_PLANNER?.status?.();

    const windows=[],manager=W._ft?._Y4n?.ins;

    for(const id of [41,46,289,93,113,114,115,116,393])if(manager?.isOpened?.(id)){

      const p=manager.getPanelById?.(id),buttons=[];

      for(const key of ['btn','getBtn','oneBtn','tenBtn','fiftyBtn','allupBtn','upBtn','getAllBtn']){

        const b=p?.[key];if(b)buttons.push({key,label:str(b.label),visible:b.visible!==false,disabled:b.disabled===true,gray:b.gray===true});

      }windows.push({id,className:str(p?.constructor?.name),visible:p?.visible!==false,buttons});

    }

    const far=W.KVPV_TH300?.report?.(),auto=W.KVPV_HITRUN_AUTO?.status?.(false),hit=auto?.hitrun,basic=W.KVPV_BASIC10?.status?.();

    const liveRole=W._C?._Ba?.instance?.getRole?.(Number(actor)),liveTarget=liveRole?.getComponent?.(W._d?._Yct?._Het)?.target,targetHP=liveTarget?.property?.get?.('hp');

    const truTienEnemies=W.KVPV_FAR_SCOPE?.status?.().kind==='TRU_TIEN'?Object.values(W._C?._Ba?.instance?.getRoles?.()??{}).filter(r=>r?.isValid!==false&&Number(r?.property?.get?.('type'))===1&&Number(r?.property?.get?.('hp')?.[0])>0).length:null;

    const combat={truTienEnemies,targetType:liveTarget?.property?.get?.('type'),targetHP:Array.isArray(targetHP)?targetHP.slice(0,2):null,matchedHits:far?.confirmedCastHitPairs,castSignals:far?.nativeCombat?.dispatch?.signals,silentCasts:far?.nativeCombat?.dispatch?.silent,targetOcc:liveTarget?.property?.get?.('occ'),autoMode:str(auto?.lastMode),autoBlocked:str(auto?.lastBlocked),hitReason:str(hit?.reason),hitError:str(hit?.lastError),hitRunning:hit?.running,enabled:auto?.enabled,phase:hit?.phase,hpPct:hit?.hpPct,bossId:str(hit?.bossId),

      reason:str(far?.lastReason),distance:far?.currentDistance,positioning:far?.positioning,

      hidden:W.document?.hidden??null,lastTickAt:far?.lastTickAt,tickAgeMs:far?.tickAgeMs,timerActive:far?.timerActive,timerRepairs:far?.timerRepairs,

      documentFocused:typeof W.document?.hasFocus==='function'?W.document.hasFocus():null,nativeFrameRate:str(W.Laya?.stage?.frameRate),nativePowerPanelOpen:W._ft?._Y4n?.ins?.isOpened?.(480)??null,pollingGapMs:W.KVPV_ACCOUNT_POLICY?.pollingGap?.()??null,

      activeController:far?.scope?.inside===true&&far?.running===true?'far':basic?.active===true?'outside':'native',

      activeAttempts:far?.scope?.inside===true&&far?.running===true?far?.castAttempts:basic?.attempts,

      roadMelee:basic?.roadMelee,outsideAttempts:basic?.attempts,outsideBasicAttempts:basic?.basicAttempts,outsideSkillAttempts:basic?.tuyetHocAttempts,

      basicAnimationSpeed:far?.basicAnimationSpeed,scaledBasicAnimations:far?.scaledBasicAnimations,basicSpeedTrial:far?.basicSpeedTrial,basicOnly:far?.basicOnly,playerSkillIds:far?.playerSkillIds,primaryBasicEnabled:far?.primaryBasicEnabled,primaryBasicSkillId:far?.primaryBasicSkillId,basicAttempts:far?.interleaved?.basicAttempts,basicHits:far?.interleaved?.basicConfirmedHits,basicSuspended:far?.interleaved?.basicSuspended,

      primaryBasicClientWaitMs:far?.primaryBasicClientWaitMs,

      clientPaceMs:far?.paceMs,clientScanMs:far?.interleaved?.scanMs,

      afterTHWaitMs:far?.afterTHWaitMs,basicHitQuota:far?.basicHitQuota,confirmedSinceTH:far?.confirmedSinceTH,thCycles:far?.thCycles,

      primaryBasicBurstBeforeSkill:far?.primaryBasicBurstBeforeSkill,

      basicRotation:far?.basicRotation,

      confirmedBasicTailCut:far?.confirmedBasicTailCut,confirmedBasicTailCuts:far?.confirmedBasicTailCuts,

      recentNativeCasts:far?.nativeCombat?.dispatch?.recent?.slice(-16).map(c=>({at:c.at,id:c.id,targetId:c.targetId,signaled:c.signaled})),

      excludedBasicSkillIds:far?.excludedBasicSkillIds,

      attempts:far?.castAttempts,dispatch:far?.nativeCombat?.dispatch?.calls,farRunning:far?.running,

      selectorOwned:far?.nativeCombat?.selectorOwned,combatOwned:far?.nativeCombat?.combatOwned,

      scope:str(far?.scope?.kind),scopeInside:far?.scope?.inside,scopeEvidence:W.KVPV_TQ_SCOPE?.status?.(),targetName:str(liveTarget?.property?.get?.('name')),basicActive:basic?.active,basicReason:str(basic?.reason),basicError:str(basic?.lastError),

      cooldown:far?.nativeCombat?.cooldown,animationPlaying:far?.nativeCombat?.animationPlaying,nativeGate:far?.nativeGate,
      burstEnabled:far?.burst?.enabled,burstMinBatchGapMs:far?.burst?.minBatchGapMs,burstNativeRows:far?.burst?.nativeRows,burstLastPass:far?.burst?.lastPass,burstBatches:far?.burst?.batches?.slice(-2),

      state:str(far?.performance?.current?.state),error:str(far?.lastError),movementCommands:far?.movementCommands};

    const priority=W.KVPV_QUEST_PRIORITY?.status?.(),daily=W.KVPV_DAILY?.quickState?.(),scene=W.KVPV?.core?.scene?.status?.(),parallel=W.KVPV_PARALLEL_ACTIONS?.status?.();

    const nativeMap=Number(W._C?._Mn?._Cn?.currentID??W._Ba?._$a?._yo?.ins?.intoSce?.[0]),bossModel=W._Ba?._sst?._ist?.inst;

    const demonRows=(W._ft?._$st?.ins?.cfgs??[]).filter(r=>Array.isArray(r)&&Number(W._ft?._po?.ins?.getCfgById?.(r[0])?.[7])===10).slice(0,80);

    const hongModel=W._Ba?._OBt?._WBt?.inst;

    const hongHoang={enabled:W.KVPV_DAILY?.config?.enableHongHoang,serverState:bossModel?.getCpSceneStateByType?.(17)?.slice(0,5),count:hongModel?.gathCount,max:hongModel?.maxNum,full:hongModel?.getGathCountIsMax?.(),xianFa:hongModel?.xFId};

    const bossRoutine={entryLevel:W._Ba?._$a?._yo?.ins?.intoSce?.[3],instanceBoss:W._ft?._$st?.ins?.getCfgByMapIdAndLv?.(nativeMap,W._Ba?._$a?._yo?.ins?.intoSce?.[3])?.[2],map:nativeMap,scene:Number(W._Ba?._$a?.SceneUtil?.curScene),mapType:Number(W._ft?._po?.ins?.getCfgById?.(nativeMap)?.[7]),common:daily?.common,mission:W._Ba?._$a?._yo?.ins?.isInMission,era:Number(W._Ba?._rJ?._O$?.ins?.eraLevel),demonEnabled:W.KVPV_DAILY?.config?.enableYeuVuong,demonQuota:bossModel?.getBsTimesBySceneType?.(10)?.[2],demonRows:demonRows.map(r=>({map:r[0],boss:r[2],era:r[3],flag:bossModel?.getBsInfoById?.(r[2])?.[2]?.[0]}))};

    const stage={priority:str(priority?.reason),error:str(priority?.lastError),goal:priority?.levelGoal?{id:str(priority.levelGoal.id),current:priority.levelGoal.current,target:priority.levelGoal.target}:null,

      job:str(daily?.job),step:str(daily?.step),running:daily?.running,owner:str(scene?.owner),tag:str(scene?.tag),

      auto:W._Ba?._Co?._Mo?.ins?.auto,current:W._Ba?._Co?._Mo?.ins?.curLv,

      pending:(parallel?.pending??[]).slice(0,16).map(p=>({id:str(p.id),reason:str(p.reason),at:p.at})),parallelReason:str(parallel?.reason),parallelError:str(parallel?.lastError)};

    const upgradeReports={};for(const [key,api]of [['redNavigator',W.KVPV_RED_NAVIGATOR],['appearance',W.KVPV_APPEARANCE_AUTO],['soulStone',W.KVPV_SOUL_STONE_FAST],['seasonRewards',W.KVPV_SEASON_REWARDS]]){

      const r=api?.status?.();if(r)upgradeReports[key]={reason:str(r.reason),requests:r.requests,confirmed:r.confirmed,pending:!!r.pending,error:str(r.error??r.lastError),

        groups:r.groups?.slice(0,20).map(g=>({key:str(g.key),ready:g.ready,level:g.level,have:g.have,need:g.need}))};

    }

    const eye=W.KVPV_WORLD_EYE?.status?.();

    const worldEye=eye?{enabled:eye.enabled,map:eye.map,scans:eye.scans,changes:eye.changes,errors:eye.errors,actions:eye.actions?.slice(0,40)}:null;

    const trial=W.KVPV_DAILY_TRIAL?.status?.();

    const dailyTrial=trial?{entries:trial.entries,returns:trial.returns,dungeons:trial.dungeons?.map(d=>({id:d.id,level:d.level,remaining:d.remaining,known:d.known,unlocked:d.unlocked,taskAllowed:d.taskAllowed})),phase:trial.phase,reason:trial.reason,map:trial.pending?.id,cheer:trial.pending?.cheer,knbInspireAllowed:trial.knbInspireAllowed,lastError:trial.lastError}:null;

    const party=W._Ba?._cm?._q3t?.ins;

    const nativeRoom=party?{id:party.roomId,map:party.roomMapId,tier:party.mapLve??party.roomMapLv,leader:party.isLeader,

      types:[1,2,6].filter(t=>party.getHasTeamByType?.(t)===true),members:(party.getTeamAllMembers?.()??[]).slice(0,8).map(r=>r.slice(0,5))}:null;

    const tg=W._ft?._h$?.ins,tgRows=Array.isArray(tg?._QW)?tg._QW.filter(r=>Number(r?.[0])===Number(tg._Ait)):[],tgMax=tgRows.length?Math.max(...tgRows.map(r=>Number(r[1])).filter(Number.isFinite)):null;

    const tianguanConfig={source:'scene_copy_tianguan',activeMap:tg?._Ait??null,rangeRows:tgRows.length,maxConfiguredFloor:tgMax,lastRanges:tgRows.slice(-4).map(r=>({map:r[0],through:r[1],requiredKills:r[2],bossFormula:String(r[5]??'').slice(0,200)})),probes:[14000,15000,20000,...(Number.isFinite(tgMax)?[tgMax,tgMax+1]:[])].map(level=>({level,exists:!!tg?.getCfgByLv?.(level)}))};

    const cobaoConfig=(()=>{

      const all=W._ft?._WNn?.ins?.arr??[],base={},bonuses={},complete=[],partial=[];let fragments=0;

      for(const r of all){const stages=r[7]??[];let n=0;

        for(let i=0;i<stages.length;i++)if(Number(stages[i])<=14000){n++;fragments++;const pairs=r[4]?.[i]??[];

          for(let j=0;j<pairs.length;j+=2)base[pairs[j]]=(base[pairs[j]]??0)+Number(pairs[j+1]);}

        const description=W._ft?._nY?.ins?.des?.(W._ft?._nY?.ins?.getCfgById?.(r[3]),r[3])??'';

        if(n===stages.length&&n){complete.push({name:r[1],lastStage:Math.max(...stages),description});

          const m=description.match(/^(.*?) tăng ([0-9.]+)$/);if(m)bonuses[m[1]]=(bonuses[m[1]]??0)+Number(m[2]);else partial.push({unparsed:description});

        }else if(n)partial.push({name:r[1],unlocked:n,total:stages.length,stages});

      }

      return {target:14000,totalRows:all.length,fragments,completed:complete.length,base,bonuses,partial,lastComplete:complete.slice(-3),sample:all.filter(r=>String(r[1]).includes('Dao Trì')).map(r=>({row:r,description:W._ft?._nY?.ins?.des?.(W._ft?._nY?.ins?.getCfgById?.(r[3]),r[3])}))};

    })();

    cached={tienTon:W.KVPV_TIEN_TON_AUTO?.status?.()??null,desktopControl:W.KVPV_DESKTOP_CONTROL?.status?.()??null,kiemKhieu:W.KVPV_KIEM_KHIEU?.status?.()??null,cobaoConfig,tianguanConfig,transformSkills:W.KVPV_TRANSFORM10?.status?.()??null,fourWorship:W.KVPV_FOUR_WORSHIP?.status?.()??null,marryRewards:W.KVPV_MARRY_REWARDS?.status?.()??null,festivalFree:W.KVPV_FESTIVAL_FREE?.status?.()??null,loginStreak:W.KVPV_LOGIN_STREAK?.status?.()??null,petTravel:W.KVPV_PET_TRAVEL?.status?.()??null,marryArena:W.KVPV_MARRY_ARENA?.status?.()??null,eightChest:W.KVPV_EIGHT_CHEST?.status?.()??null,peakCompletion:W.KVPV_PEAK_COMPLETION?.status?.()??null,stageResume:W.__KVPV_STAGE_RESUME_20261024_USER??null,stageRequested:W.KVPV_DAILY?.config?.enableTuVuot===true,peakChest:W.KVPV_PEAK_CHEST?.status?.()??null,quizAuto:W.KVPV_QUIZ_AUTO?.status?.()??null,roadCadence:W.KVPV_ROAD_CADENCE?.status?.()??null,nativeRoom,hongHoang,idleDaily:W.KVPV_IDLE_DAILY?.status?.()??null,freeDailyBag:W.KVPV_FREE_DAILY_BAG?.status?.()??null,freeTreasure:W.KVPV_FREE_TREASURE?.status?.()??null,crystalCapture:W.KVPV_CRYSTAL_CAPTURE?.status?.()??null,itemTrace:W.KVPV_ITEM_TRACE?.status?.()??null,manualEntry:W.KVPV_MANUAL_ENTRY?.status?.()??null,demonKingRecovery:W.KVPV_DEMON_KING_RECOVERY?.status?.()??null,bossRoutine,companionCombat:W.KVPV_COMPANION_COMBAT?.status?.()??null,adventure:W.KVPV_ADVENTURE?.status?.()??null,activityDay:W.KVPV_DAILY_CLOCK?.status?.()??null,guildBoss:W.KVPV_GUILD_BOSS?.status?.()??null,dailyTrial,bossTeam:W.KVPV_BOSS_TEAM?.status?.()??null,teamCoordinator:W.KVPV_TEAM_COORDINATOR?.status?.()??null,contextPlan:W.KVPV_CONTEXT_BRAIN?.plan?.()??null,worldEye,schema:1,actor,build:str(W.__KVPV_LIVE_BUILD||W.KVPV_V1?.build?.id),at:Date.now(),main,combat,stage,upgradeReports,redDots:(parallel?.redDots??[]).slice(0,128),

      reborn:{reason:str(era?.reason),eraLevel:era?.eraLevel??null,selected:era?.selected?.id??null,tasks},tienVi:tv,missing:missing.slice(0,80),windows,

      executors:{cobao:exec?{reason:str(exec.cobao?.reason),pending:exec.cobao?.pending?.step??null,confirmed:exec.cobao?.confirmed}:null,

        arena:exec?{reason:str(exec.arena?.reason),pending:!!exec.arena?.pending,confirmed:exec.arena?.confirmed,freeAttempts:exec.arena?.plan?.attempts??null}:null,

        materials:{reason:str(planner?.reason),missing:planner?.plan?.upgrades?.filter(x=>x.missing>0).slice(0,8).map(x=>({id:x.id,fragment:x.fragment,missing:x.missing}))??[]}},

      modulePresence:(typeof __KVPV_V1_BUILD==='undefined'?[]:__KVPV_V1_BUILD.modules??[]).slice(0,160).map(m=>({file:m.file,present:m.apis.filter(name=>W[name]!=null)})),

      economy:economySnapshot(),
      bagOpenSession:W.KVPV_BAG_OPEN_SESSION?.status?.()??null,

      bagInspection:actor==='10158939833447'?(()=>{

        try {

          const bag=W._Ba?._Ic?._aQ?.ins,items=bag?.getItemsByBagType?.(0);

          return {at:Date.now(),ready:bag?.isBagInited===true,used:items?.length??null,

            free:bag?.getBagLeftNumById?.(0)??null,

            items:(items??[]).slice(0,240).map(item=>{

              const cfg=W._ft?._mY?.ins?.getItemCfgById?.(item[0]);

              return {id:item[0],count:item[1],uid:String(item[2]),name:str(cfg?.[1])};

            })};

        }catch(e){return {error:str(e.message)};}

      })():null,

      hamsterAward:(()=>{try{
        const ns=W._Ba?.__1?.hamster_award,m=ns?._Z1?.instance,map=ns?.FitActIdToDatas??{};
        const active=Object.keys(map).map(Number).filter(id=>W._Ba?._IY?._BY?.ins?.getActIsOpen?.(id)===true).slice(0,16);
        const act=Number(m?.curActId),self=m?.getSelAwardInfo?.(act)??[],all=m?.getAllAwardInfo?.(act)??[];
        const probeKey='__KVPV_HAMSTER_AWARD_READ_DIAG',probe=W[probeKey]??(W[probeKey]={actor,at:null,reply:null});
        const socket=W._v?.ins??W._y?.Socket?.ins;
        
        if(probe.transport?.finished&&Object.hasOwn(m??{},'initAllAwardInfo')&&typeof Object.getPrototypeOf(m)?.initAllAwardInfo==='function'&&String(m.initAllAwardInfo).includes('probe.reply='))delete m.initAllAwardInfo;
        const protocol=W._ngr??(typeof _ngr==='object'?_ngr:null);
        const schemas={};for(const code of ['TXHy','TBkK','TqgA','TusK','T0Jj']){const type=protocol?.get_pbtype?.(code);schemas[code]={exists:!!type,fields:Array.isArray(type?.fieldsArray)?type.fieldsArray.map(f=>({name:f.name,id:f.id,type:f.type,rule:f.rule})).slice(0,8):[]};}
        const eventModel=W._Ba?._IY?._BY?.ins,parent=Number(map[act]?.[2]);
        const eventTiming=[act,parent,act-100,parent-100].filter(id=>id>0).map(id=>({id,open:eventModel?.getActIsOpen?.(id),openByTime:eventModel?.getActIsOpenByEndTime?.(id),calOpen:eventModel?.getActIsOpenByCalTime?.(id),raw:Array.isArray(eventModel?._NYi?.[id])?eventModel._NYi[id].slice(0,7):null,round:eventModel?.getActRound?.(id),serverDay:eventModel?.getActSerDay?.(id)}));
        const configRows=W._ft?.FestHamsterAllAward?.ins?.originCfg??[];
        const configGroups={};for(const row of configRows){const group=String(Math.floor(Number(row?.[0])/100000));configGroups[group]=(configGroups[group]??0)+1;}
        const cfg=(api,list)=>({count:api?.originCfg?.length??null,missing:list.filter(r=>!api?.getCfgById?.(Number(r?.[0]))).map(r=>Number(r?.[0])).slice(0,20)});
        return {act,active,serverTime:Number(W._Sa?.svrTime),eventTiming,parentMapping:W._Ba?.__1?.hamster?.FitActIdToDatas?.[parent]??null,schemas,configGroups,configSample:configRows.filter(r=>Math.floor(Number(r?.[0])/100000)===Math.floor(Number(self[0]?.[0])/100000)).slice(0,3),queryAt:probe.at,allReply:probe.reply,queueTrace:probe.queueTrace??null,transport:probe.transport??null,socketAvailable:!!socket,handlers:{self:typeof socket?._P?.TBkK==='function',all:typeof socket?._P?.TusK==='function'},allEventKeys:Object.keys(m?._zZh??{}).slice(0,20),mapping:map[act]??null,self:self.slice(0,25),all:all.slice(0,25),selfCfg:cfg(W._ft?.FestHamsterSelfAward?.ins,self),allCfg:cfg(W._ft?.FestHamsterAllAward?.ins,all)};
      }catch(e){return {error:str(e.message)};}})(),
      dailyPbBoss:W.KVPV_PB_BOSS_DAILY?.status?.()??null,allowKNB:false};at=Date.now();return cached;

  }

  W.KVPV_EXECUTOR_REPORT=Object.freeze({snapshot});

})();

