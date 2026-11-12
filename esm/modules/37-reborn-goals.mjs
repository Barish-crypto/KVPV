import {getKVPV_CONFIRM_POPUPS as __getKVPV0,getKVPV_DAILY as __getKVPV1,getKVPV_PROGRESS_PLANNER as __getKVPV2,getKVPV_QUEST_GOALS as __getKVPV3,getKVPV_QUEST_PRIORITY as __getKVPV4,getKVPV_REBORN_EXECUTORS as __getKVPV5,getKVPV_REBORN_GOALS as __getKVPV6,getKVPV_V1 as __getKVPV7,getKVPV_V868 as __getKVPV8} from '../api.mjs';
export function call_KVPV_REBORN_GOALS_sync(...args){const target=globalThis["KVPV_REBORN_GOALS"];const fn=globalThis["KVPV_REBORN_GOALS"]?.["sync"];if(typeof fn!=='function')throw Error("KVPV_REBORN_GOALS.sync is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_REBORN_GOALS_stop(...args){const target=globalThis["KVPV_REBORN_GOALS"];const fn=globalThis["KVPV_REBORN_GOALS"]?.["stop"];if(typeof fn!=='function')throw Error("KVPV_REBORN_GOALS.stop is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_REBORN_GOALS_inspect(...args){const target=globalThis["KVPV_REBORN_GOALS"];const fn=globalThis["KVPV_REBORN_GOALS"]?.["inspect"];if(typeof fn!=='function')throw Error("KVPV_REBORN_GOALS.inspect is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_REBORN_GOALS_levelGoal(...args){const target=globalThis["KVPV_REBORN_GOALS"];const fn=globalThis["KVPV_REBORN_GOALS"]?.["levelGoal"];if(typeof fn!=='function')throw Error("KVPV_REBORN_GOALS.levelGoal is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_REBORN_GOALS_cobaoGoal(...args){const target=globalThis["KVPV_REBORN_GOALS"];const fn=globalThis["KVPV_REBORN_GOALS"]?.["cobaoGoal"];if(typeof fn!=='function')throw Error("KVPV_REBORN_GOALS.cobaoGoal is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_REBORN_GOALS_arenaGoal(...args){const target=globalThis["KVPV_REBORN_GOALS"];const fn=globalThis["KVPV_REBORN_GOALS"]?.["arenaGoal"];if(typeof fn!=='function')throw Error("KVPV_REBORN_GOALS.arenaGoal is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_REBORN_GOALS_towerGoal(...args){const target=globalThis["KVPV_REBORN_GOALS"];const fn=globalThis["KVPV_REBORN_GOALS"]?.["towerGoal"];if(typeof fn!=='function')throw Error("KVPV_REBORN_GOALS.towerGoal is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_REBORN_GOALS_fabaoGoal(...args){const target=globalThis["KVPV_REBORN_GOALS"];const fn=globalThis["KVPV_REBORN_GOALS"]?.["fabaoGoal"];if(typeof fn!=='function')throw Error("KVPV_REBORN_GOALS.fabaoGoal is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_REBORN_GOALS_equipmentGoal(...args){const target=globalThis["KVPV_REBORN_GOALS"];const fn=globalThis["KVPV_REBORN_GOALS"]?.["equipmentGoal"];if(typeof fn!=='function')throw Error("KVPV_REBORN_GOALS.equipmentGoal is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_REBORN_GOALS_status(...args){const target=globalThis["KVPV_REBORN_GOALS"];const fn=globalThis["KVPV_REBORN_GOALS"]?.["status"];if(typeof fn!=='function')throw Error("KVPV_REBORN_GOALS.status is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_REBORN_GOALS__handoff(...args){const target=globalThis["KVPV_REBORN_GOALS"];const fn=globalThis["KVPV_REBORN_GOALS"]?.["_handoff"];if(typeof fn!=='function')throw Error("KVPV_REBORN_GOALS._handoff is not available");return Reflect.apply(fn,target,args);}
function __captureESMFunction(fn,name){
  if(fn.name!==name)Object.defineProperty(fn,"name",{value:name,configurable:true});
  return fn;
}
let __esmLocal0;
let __esmLocal1;
let __esmLocal2;
let __esmLocal3;
let __esmLocal4;
let __esmLocal5;
let __esmLocal6;
let __esmLocal7;
let __esmLocal8;
let __esmLocal9;
let __esmLocal10;
let __esmLocal11;
let __esmLocal12;
let __esmLocal13;
let __esmLocal14;
let __esmLocal15;
let __esmLocal16;
let __esmLocal17;
let __esmLocal18;
let __esmLocal19;
let __esmLocal20;
let __esmLocal21;
let __esmLocal22;
export {__esmLocal0 as local_anonymous_6_1_0};
export {__esmLocal1 as local_norm_1};
export {__esmLocal2 as local_owned_2};
export {__esmLocal3 as local_root_3};
export {__esmLocal4 as local_classify_4};
export {__esmLocal5 as local_inspect_5};
export {__esmLocal6 as local_anonymous_79_32_6};
export {__esmLocal7 as local_anonymous_79_95_7};
export {__esmLocal8 as local_anonymous_80_31_8};
export {__esmLocal9 as local_anonymous_81_48_9};
export {__esmLocal10 as local_anonymous_87_38_10};
export {__esmLocal11 as local_selected_11};
export {__esmLocal12 as local_levelGoal_12};
export {__esmLocal13 as local_idle_13};
export {__esmLocal14 as local_sync_14};
export {__esmLocal15 as local_stop_15};
export {__esmLocal16 as local_cobaoGoal_16};
export {__esmLocal17 as local_arenaGoal_17};
export {__esmLocal18 as local_towerGoal_18};
export {__esmLocal19 as local_fabaoGoal_19};
export {__esmLocal20 as local_equipmentGoal_20};
export {__esmLocal21 as local_status_21};
export {__esmLocal22 as local__handoff_22};
export function initialize(){

/* Native era task graph: root main quest -> era nodes -> existing executors.
 * Claim/breakthrough stay in V868 (native guard + premium gate). No fastEra,
 * arbitrary Go click, item purchase or replacement of the game's task model. */

(__captureESMFunction((__esmLocal0=(() => {

  'use strict';

  const W=window,old=__getKVPV6(),carry=old?._handoff?.();old?.stop?.();

  const actor=String(W.__KVPV_OWN_ACTOR_ID||'');

  const S={enabled:true,timer:null,openedKey:carry?.actor===actor?carry.openedKey:null,reason:'waiting_root',plan:null,lastError:''};

  const norm=__captureESMFunction((__esmLocal1=(x=>String(x||'').replace(/<[^>]*>/g,'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/gi,'d').toLowerCase().replace(/\s+/g,' ').trim())),"norm");

  const owned=__captureESMFunction((__esmLocal2=(()=>actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED)),"owned");

  function root(){const r=W._Ba?._zIt?._FIt?.ins?.taskInfo;if(!Array.isArray(r))return null;

    const cfg=W._ft?.__Z?.ins?.getTaskCfgById?.(r[0]);if(!cfg||!/chuyen\s*sinh/.test(norm(cfg[1])))return null;

    return {id:String(r[0]),state:Number(r[1]),name:String(cfg[1])};

  }
__esmLocal3=root;


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
__esmLocal4=classify;


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
    const stageClaim=tasks.find(__captureESMFunction((__esmLocal6=(q=>q.state===1&&q.kind==='STAGE')),"")),claim=stageClaim??tasks.find(__captureESMFunction((__esmLocal7=(q=>q.state===1)),""));
    const stageTask=tasks.find(__captureESMFunction((__esmLocal8=(q=>q.state===0&&q.kind==='STAGE')),""));
    const selected=claim??stageTask??tasks.find(__captureESMFunction((__esmLocal9=(q=>q.state===0&&supported.includes(q.kind))),""))??null;

    return {root:r,eraLevel:Number(m?.lv),tasks,selected,

      reason:!tasks.length?'waiting_era_info':claim?'waiting_existing_era_reward_queue':selected?'doing_'+selected.kind.toLowerCase():

        tasks.length===4&&tasks.every(__captureESMFunction((__esmLocal10=(q=>q.state===2)),""))?Number(m?.lv)>=406&&Number(W._Ba?._ke?._Le?.instance?.curSvipLv??0)<1?'premium_gate_blocked':'waiting_existing_breakthrough':'unmet_requirements_need_executor'};

  }
__esmLocal5=inspect;


  function selected(kind){if(!S.enabled||!owned())return null;const p=inspect(),q=p.selected;return q?.state===0&&q.kind===kind?q:null;}
__esmLocal11=selected;


  function levelGoal(){const q=selected('LEVEL')??selected('STAGE');if(!q)return __getKVPV5()?.cobaoStageGoal?.()??null;

    const current=q.kind==='LEVEL'?Number(W._Ba?._rJ?._O$?.ins?.level):q.progress;

    return Number.isFinite(current)&&current>=0?{...q,current}:null;

  }
__esmLocal12=levelGoal;


  function idle(){if(Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0))return false;const d=__getKVPV1()?.quickState?.();return d?.running===true&&['rảnh','ranh'].includes(d.job)&&

    W._Ba?._$a?.SceneUtil?.isCommonScene===true&&W._Ba?._$a?._yo?.ins?.isInMission!==true&&

    W._Ba?._rJ?._O$?.ins?.isDead!==true&&!W.KVPV?.core?.scene?.status?.()?.owner;}
__esmLocal13=idle;


  function sync(){try{if(!S.enabled)return;if(!owned()){stop();return;}

    S.plan=inspect();S.reason=S.plan.reason;if(!S.plan.root)return;

    if(__getKVPV0()?.beforeTask?.()===true){S.reason='priority_popup';return;}

    const api=__getKVPV8(),c=api?.config;

    if(c){if(!c.enabled)api.start?.();c.autoClaimEraTasks=true;c.autoBreakthrough=true;c.autoNavigateUnfinished=false;}

    if(S.plan.reason==='waiting_era_info')api?.inspect?.();

    // Show the actual requirement panel once per root/era level. Leave the

    // native claim/breakthrough sender in charge; never click its paid bypass.

    const key=S.plan.root.id+'/'+S.plan.eraLevel,ui=W._ft?._Y4n?.ins,isOpen=typeof ui?.isOpened==='function'?ui.isOpened(41):null;
    if(S.plan.root.state!==2&&idle()&&ui?.open&&(S.openedKey!==key||isOpen===false)){S.openedKey=key;ui.open(41);}

    __getKVPV4()?.sync?.();__getKVPV3()?.sync?.();__getKVPV2()?.sync?.();

  }catch(e){S.lastError=String(e);S.reason='error';}}
__esmLocal14=sync;


  function stop(){S.enabled=false;if(S.timer!==null)(__getKVPV7()?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;}
__esmLocal15=stop;


  W.KVPV_REBORN_GOALS=Object.freeze({sync,stop,inspect,levelGoal,cobaoGoal:__captureESMFunction((__esmLocal16=(()=>selected('CO_BAO'))),"cobaoGoal"),arenaGoal:__captureESMFunction((__esmLocal17=(()=>selected('ARENA'))),"arenaGoal"),towerGoal:__captureESMFunction((__esmLocal18=(()=>selected('LINH_LUNG'))),"towerGoal"),fabaoGoal:__captureESMFunction((__esmLocal19=(()=>selected('FABAO'))),"fabaoGoal"),equipmentGoal:__captureESMFunction((__esmLocal20=(()=>selected('EQUIPMENT'))),"equipmentGoal"),

    status:__captureESMFunction((__esmLocal21=(()=>({enabled:S.enabled,actor,reason:S.reason,plan:S.plan,lastError:S.lastError,allowKNB:false}))),"status"),

    _handoff:__captureESMFunction((__esmLocal22=(()=>({actor,openedKey:S.openedKey}))),"_handoff")});

  S.timer=(__getKVPV7()?.timers?.setInterval??W.setInterval)(sync,500);sync();

})),""))();


}
export {getKVPV_REBORN_GOALS} from '../api.mjs';
export const api=Object.freeze({
  get KVPV_REBORN_GOALS(){return globalThis.KVPV_REBORN_GOALS;},
});