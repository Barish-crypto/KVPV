/* Quest first. Level requirements use the actual native character level;
 * Tian Quan uses the existing Tu Vuot controller, never a second entry RPC. */
(() => {
  'use strict';
  const W=window,old=W.KVPV_QUEST_PRIORITY,carry=old?._handoff?.();old?.stop?.('reload');
  const actor=String(W.__KVPV_OWN_ACTOR_ID||'');
  const S={enabled:true,timer:null,work:carry?.actor===actor?carry.work:null,reason:'waiting_task',lastError:''};
  const norm=x=>String(x||'').replace(/<[^>]*>/g,'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/gi,'d').toLowerCase();
  const owned=()=>actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;
  function task(){const row=W._Ba?._zIt?._FIt?.ins?.taskInfo;if(!Array.isArray(row)||row[0]==null)return null;
    const cfg=W._ft?.__Z?.ins?.getTaskCfgById?.(row[0]);if(!cfg)return null;
    return {id:String(row[0]),state:Number(row[1]),name:String(cfg[1]||''),action:Number(cfg[6])};
  }
  function levelGoal(){
    const dependency=W.KVPV_REBORN_GOALS?.levelGoal?.();if(dependency)return dependency;
    const q=task(),n=norm(q?.name);
    if(!q||![0,1,3].includes(q.state)||/phu van|co bao|trang bi|than khi|ky nang|pet|canh|tu vi|thien phu|ngoc|cuong hoa|tien vi|thoi trang|linh thu|phuc oa|bien than|nhan cuoi|than binh|linh duc|thu cuoi/.test(n))return null;
    if(!/(?:dat|len|tang)\s+cap\b|\bcap\s+(?:nhan vat|dat|den)|nhan vat.{0,22}cap|\b(?:level|lv)\s*\d/.test(n))return null;
    const target=Number(/(?:cap|level|lv)\s*(\d{1,4})\b/.exec(n)?.[1]),current=Number(W._Ba?._rJ?._O$?.ins?.level);
    return Number.isSafeInteger(target)&&target>0&&Number.isSafeInteger(current)&&current>0?{...q,target,current}:null;
  }
  function hasPriority(){if(!S.enabled||!owned())return false;
    const q=task();return !!(q&&[0,1,2,3].includes(q.state))||!!W.KVPV_TIENVI_GOALS?.goal?.();
  }
  function blocks(activity){if(activity==='daily_trial')return hasPriority()&&task()?.state===2;
    if(!hasPriority())return false;
    const n=norm(W.KVPV_REBORN_GOALS?.equipmentGoal?.()?.name??task()?.name),patterns={daily_trial:/thi luyen|pho ban ngay/,beast_island:/than thu dao|phuong huyet|long phach/,summon_boss:/trieu hoi.*boss|boss.*trieu hoi/,rune_boss:/phu van/};
    return !patterns[activity]?.test(n);
  }
  const sideKeys=['enableTienDuyen','enableCrystal','enableCompose','enableTuyetHoc','enableTinhThan','enableVinhDu','enableDaoTri'];
  function pauseSides(){const c=W.KVPV_DAILY?.config;
    // Upgrade from the old level-farming policy: return the user's saved Demon King setting once.
    if(c&&S.work?.sides&&'enableHongHoang' in S.work.sides){c.enableHongHoang=S.work.sides.enableHongHoang;delete S.work.sides.enableHongHoang;}
    if(c&&S.work?.sides&&'enableYeuVuong' in S.work.sides){c.enableYeuVuong=S.work.sides.enableYeuVuong;delete S.work.sides.enableYeuVuong;}
    if(c)for(const key of sideKeys){if(S.work?.sides&&!(key in S.work.sides))S.work.sides[key]=c[key];c[key]=false;}}
  function restore(){const w=S.work;if(!w)return;
    if(owned()){
      const stage=W._Ba?._Co?._Mo?.ins;if(stage?.auto===true)stage.auto=false;
      if(W.KVPV_DAILY?.config){W.KVPV_DAILY.config.enableTuVuot=w.dailyEnabled;Object.assign(W.KVPV_DAILY.config,w.sides??{});}
      if(W.KVPV_V866?.config)Object.assign(W.KVPV_V866.config,w.director);
    }S.work=null;
  }
  function safe(){const d=W.KVPV_DAILY?.quickState?.(),scene=W._Ba?._$a,team=W._Ba?._cm?._q3t?.ins;
    const director=W.KVPV_V866?.status?.(false);
    return scene?.SceneUtil?.isCommonScene===true&&scene?._yo?.ins?.isInMission!==true&&
      W._Ba?._rJ?._O$?.ins?.isDead!==true&&d?.running===true&&['rảnh','ranh'].includes(d.job)&&
      !W.KVPV?.core?.scene?.status?.()?.owner&&!W.KVPV_UPGRADES?.busy?.()&&
      !W.KVPV_HITRUN1?.status?.(false)?.running&&!team?.getHasTeams?.()&&!(Number(team?.roomId)>0)&&
      !/Da gui EXP MATCH/.test(String(director?.soloIdleReason||''));
  }
  function hongOpen(){
    const enabled=S.work?.sides?.enableHongHoang??W.KVPV_DAILY?.config?.enableHongHoang;
    const state=W._Ba?._sst?._ist?.inst?.getCpSceneStateByType?.(17),m=W._Ba?._OBt?._WBt?.inst;
    return enabled===true&&Number(state?.[2])===2&&!!m&&m.getGathCountIsMax?.()===false;
  }
  function sync(){if(W.KVPV_ENTRY_POLICY?.manual===true)return;try{
    if(!S.enabled)return;if(W.KVPV_BOSS_TEAM?.priority?.()){S.reason='private_boss_invitation_priority';return;}if(!owned()){stop();return;}
    // Timed large events outrank the quest EXP/Tu Vuot controller.
    // Never re-enable stage while the authoritative planner reserves an event.
    const eventHold=W.KVPV_EVENT_PRIORITY?.hold?.();
    if(eventHold){
      const stage=W._Ba?._Co?._Mo?.ins;
      if(stage?.auto===true)W.KVPV_EVENT_PRIORITY?.yieldStage?.(eventHold);
      S.reason='yield_to_scheduled_event_'+eventHold.key;return;
    }
    if(hongOpen()){restore();S.reason='yield_to_open_honghoang';return;}
    const q=levelGoal();if(!q||q.current>=q.target){restore();S.reason=q?'level_met_waiting_quest_ack':'quest_first';return;}
    if(W.KVPV?.stageGuard?.isLocked?.()===true){restore();S.reason='tianquan_manually_paused';return;}
    if(W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true){S.reason='priority_popup';return;}
    if(S.work&&S.work.key!==q.id)restore();
    if(S.work){pauseSides();if(W.KVPV_DAILY?.config)W.KVPV_DAILY.config.enableTuVuot=true;S.reason='tianquan_for_missing_exp';return;}
    if(!safe()){S.reason='waiting_current_activity_before_tianquan';return;}
    const daily=W.KVPV_DAILY,cfg=W.KVPV_V866?.config;
    if(typeof daily?.tuVuotStart!=='function'||!cfg){S.reason='waiting_tianquan_executor';return;}
    S.work={key:q.id,sides:Object.fromEntries(sideKeys.map(key=>[key,daily.config?.[key]])),dailyEnabled:daily.config?.enableTuVuot===true,director:{questFirst:cfg.questFirst,
      autoPublicExpMatching:cfg.autoPublicExpMatching,enableVerifiedExp4Account:cfg.enableVerifiedExp4Account}};
    cfg.questFirst=false;cfg.autoPublicExpMatching=false;cfg.enableVerifiedExp4Account=false;
    W.KVPV_V866.tick?.();pauseSides();
    daily.tuVuotStart();S.reason='tianquan_for_missing_exp';
  }catch(e){S.lastError=String(e);S.reason='error_no_entry_replay';}}
  function stop(reason='manual'){S.enabled=false;if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;if(reason!=='reload')restore();}
  function start(){if(S.timer!==null)return;S.enabled=true;{const schedule=W.KVPV_V1?.timers?.setInterval??W.setInterval;if(typeof schedule==='function')S.timer=schedule(sync,500);}sync();}
  W.KVPV_QUEST_PRIORITY=Object.freeze({start,stop,sync,hasPriority,blocks,
    status:()=>({enabled:S.enabled,priority:hasPriority(),task:task(),levelGoal:levelGoal(),reason:S.reason,lastError:S.lastError,allowKNB:false}),
    _handoff:()=>({actor,work:S.work})});if(W.KVPV_DAILY)start();
})();
