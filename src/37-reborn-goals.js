
/* Native era task graph: root main quest -> era nodes -> existing executors.
 * Claim/breakthrough stay in V868 (native guard + premium gate). No fastEra,
 * arbitrary Go click, item purchase or replacement of the game's task model. */

(() => {

  'use strict';

  const W=window,old=W.KVPV_REBORN_GOALS,carry=old?._handoff?.();old?.stop?.();

  const actor=String(W.__KVPV_OWN_ACTOR_ID||'');

  const S={enabled:true,timer:null,openedKey:carry?.actor===actor?carry.openedKey:null,reason:'waiting_root',plan:null,lastError:''};

  const norm=x=>String(x||'').replace(/<[^>]*>/g,'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/gi,'d').toLowerCase().replace(/\s+/g,' ').trim();

  const owned=()=>actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;

  function root(){const r=W._Ba?._zIt?._FIt?.ins?.taskInfo;if(!Array.isArray(r))return null;

    const cfg=W._ft?.__Z?.ins?.getTaskCfgById?.(r[0]);if(!cfg||!/chuyen\s*sinh/.test(norm(cfg[1])))return null;

    return {id:String(r[0]),state:Number(r[1]),name:String(cfg[1])};

  }

  function classify(q){const n=norm(q.name);

    if(q.action===-1||/nap|svip|mua|nguyen bao/.test(n))return 'manual_paid_or_item_source';

    if(q.action===189&&/co bao/.test(n)&&/kich hoat/.test(n))return 'CO_BAO';

    if(q.action===165&&/ke thang lam vua|dau truong/.test(n))return 'ARENA';

    if(q.action===21&&/linh lung thap/.test(n))return 'LINH_LUNG';

    if(/phap bao/.test(n)&&/tu vi/.test(n))return 'FABAO';

    if(q.action===46&&/vuot ai|vuot thien kiep|thien quan|tu vuot/.test(n))return 'STAGE';

    if(!/trang bi|ky nang|phap bao|phu van|tu vi/.test(n)&&/dat cap|len cap|cap nhan vat|nhan vat.{0,20}cap/.test(n))return 'LEVEL';

    if(/phu van|trang bi|dinh cao|chi ton/.test(n))return 'EQUIPMENT';

    return 'unverified_executor';

  }

  function inspect(){const r=root();if(!r)return {root:null,tasks:[],selected:null,reason:'no_reborn_main_quest'};

    if(r.state===2)return {root:r,tasks:[],selected:null,reason:'waiting_main_reward_queue'};

    if(![0,1,3].includes(r.state))return {root:r,tasks:[],selected:null,reason:'unknown_main_state'};

    const m=W._Ba?.n_zS?._Aht?.instance,ids=m?.ids,tasks=[];

    for(const id of Array.isArray(ids)?[...new Set(ids)]:[]){

      const node=m?.getEraNode?.(id),cfg=W._ft?._Pht?.ins?.getCfgById?.(id);

      if(!Array.isArray(node)||!cfg){tasks.push({id:String(id),kind:'waiting_native_task_data',state:null});continue;}

      const a=cfg[2],target=Number(a?.[1]),rawAction=Number(a?.[2]),mode=Number(a?.[0]);

      const action=mode===0?Number(W._et?.hdleLckExoActId?.(rawAction)):rawAction;

      const q={id:'REBORN/'+Number(m.lv)+'/'+id,nodeId:Number(id),source:'REBORN',state:Number(node[1]),progress:Number(node[2]),

        target:Number.isFinite(target)&&target>0?target:null,name:String(cfg[1]||''),action,rawAction,mode,claimState:1};

      q.kind=Number.isFinite(action)?classify(q):'waiting_native_route';

      if(q.target===null||!Number.isFinite(q.progress))q.kind='waiting_verified_requirement';tasks.push(q);

    }

    const supported=['LEVEL','STAGE','LINH_LUNG','FABAO','EQUIPMENT','CO_BAO','ARENA'];
    const stageClaim=tasks.find(q=>q.state===1&&q.kind==='STAGE'),claim=stageClaim??tasks.find(q=>q.state===1);
    const stageTask=tasks.find(q=>q.state===0&&q.kind==='STAGE');
    const selected=claim??stageTask??tasks.find(q=>q.state===0&&supported.includes(q.kind))??null;

    return {root:r,eraLevel:Number(m?.lv),tasks,selected,

      reason:!tasks.length?'waiting_era_info':claim?'waiting_existing_era_reward_queue':selected?'doing_'+selected.kind.toLowerCase():

        tasks.length===4&&tasks.every(q=>q.state===2)?Number(m?.lv)>=406&&Number(W._Ba?._ke?._Le?.instance?.curSvipLv??0)<1?'premium_gate_blocked':'waiting_existing_breakthrough':'unmet_requirements_need_executor'};

  }

  function selected(kind){if(!S.enabled||!owned())return null;const p=inspect(),q=p.selected;return q?.state===0&&q.kind===kind?q:null;}

  function levelGoal(){const q=selected('LEVEL')??selected('STAGE');if(!q)return W.KVPV_REBORN_EXECUTORS?.cobaoStageGoal?.()??null;

    const current=q.kind==='LEVEL'?Number(W._Ba?._rJ?._O$?.ins?.level):q.progress;

    return Number.isFinite(current)&&current>=0?{...q,current}:null;

  }

  function idle(){if(Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0))return false;const d=W.KVPV_DAILY?.quickState?.();return d?.running===true&&['rảnh','ranh'].includes(d.job)&&

    W._Ba?._$a?.SceneUtil?.isCommonScene===true&&W._Ba?._$a?._yo?.ins?.isInMission!==true&&

    W._Ba?._rJ?._O$?.ins?.isDead!==true&&!W.KVPV?.core?.scene?.status?.()?.owner;}

  function sync(){try{if(!S.enabled)return;if(!owned()){stop();return;}

    S.plan=inspect();S.reason=S.plan.reason;if(!S.plan.root)return;

    if(W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true){S.reason='priority_popup';return;}

    const api=W.KVPV_V868,c=api?.config;

    if(c){if(!c.enabled)api.start?.();c.autoClaimEraTasks=true;c.autoBreakthrough=true;c.autoNavigateUnfinished=false;}

    if(S.plan.reason==='waiting_era_info')api?.inspect?.();

    // Show the actual requirement panel once per root/era level. Leave the

    // native claim/breakthrough sender in charge; never click its paid bypass.

    const key=S.plan.root.id+'/'+S.plan.eraLevel,ui=W._ft?._Y4n?.ins,isOpen=typeof ui?.isOpened==='function'?ui.isOpened(41):null;
    if(S.plan.root.state!==2&&idle()&&ui?.open&&(S.openedKey!==key||isOpen===false)){S.openedKey=key;ui.open(41);}

    W.KVPV_QUEST_PRIORITY?.sync?.();W.KVPV_QUEST_GOALS?.sync?.();W.KVPV_PROGRESS_PLANNER?.sync?.();

  }catch(e){S.lastError=String(e);S.reason='error';}}

  function stop(){S.enabled=false;if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;}

  W.KVPV_REBORN_GOALS=Object.freeze({sync,stop,inspect,levelGoal,cobaoGoal:()=>selected('CO_BAO'),arenaGoal:()=>selected('ARENA'),towerGoal:()=>selected('LINH_LUNG'),fabaoGoal:()=>selected('FABAO'),equipmentGoal:()=>selected('EQUIPMENT'),

    status:()=>({enabled:S.enabled,actor,reason:S.reason,plan:S.plan,lastError:S.lastError,allowKNB:false}),

    _handoff:()=>({actor,openedKey:S.openedKey})});

  S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(sync,500);sync();

})();

