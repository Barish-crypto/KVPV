import {getKVPV_BOSS_TEAM as __getKVPV0,getKVPV_CONFIRM_POPUPS as __getKVPV1,getKVPV_DAILY as __getKVPV2,getKVPV_ENTRY_POLICY as __getKVPV3,getKVPV_EVENT_PRIORITY as __getKVPV4,getKVPV_HITRUN1 as __getKVPV5,getKVPV_QUEST_PRIORITY as __getKVPV6,getKVPV_REBORN_GOALS as __getKVPV7,getKVPV_RED_DOT_MODULE as __getKVPV8,getKVPV_TIENVI_GOALS as __getKVPV9,getKVPV_UPGRADES as __getKVPV10,getKVPV_V1 as __getKVPV11,getKVPV_V866 as __getKVPV12} from '../api.mjs';
export function call_KVPV_QUEST_PRIORITY_start(...args){const target=globalThis["KVPV_QUEST_PRIORITY"];const fn=globalThis["KVPV_QUEST_PRIORITY"]?.["start"];if(typeof fn!=='function')throw Error("KVPV_QUEST_PRIORITY.start is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_QUEST_PRIORITY_stop(...args){const target=globalThis["KVPV_QUEST_PRIORITY"];const fn=globalThis["KVPV_QUEST_PRIORITY"]?.["stop"];if(typeof fn!=='function')throw Error("KVPV_QUEST_PRIORITY.stop is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_QUEST_PRIORITY_sync(...args){const target=globalThis["KVPV_QUEST_PRIORITY"];const fn=globalThis["KVPV_QUEST_PRIORITY"]?.["sync"];if(typeof fn!=='function')throw Error("KVPV_QUEST_PRIORITY.sync is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_QUEST_PRIORITY_hasPriority(...args){const target=globalThis["KVPV_QUEST_PRIORITY"];const fn=globalThis["KVPV_QUEST_PRIORITY"]?.["hasPriority"];if(typeof fn!=='function')throw Error("KVPV_QUEST_PRIORITY.hasPriority is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_QUEST_PRIORITY_blocks(...args){const target=globalThis["KVPV_QUEST_PRIORITY"];const fn=globalThis["KVPV_QUEST_PRIORITY"]?.["blocks"];if(typeof fn!=='function')throw Error("KVPV_QUEST_PRIORITY.blocks is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_QUEST_PRIORITY_status(...args){const target=globalThis["KVPV_QUEST_PRIORITY"];const fn=globalThis["KVPV_QUEST_PRIORITY"]?.["status"];if(typeof fn!=='function')throw Error("KVPV_QUEST_PRIORITY.status is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_QUEST_PRIORITY__handoff(...args){const target=globalThis["KVPV_QUEST_PRIORITY"];const fn=globalThis["KVPV_QUEST_PRIORITY"]?.["_handoff"];if(typeof fn!=='function')throw Error("KVPV_QUEST_PRIORITY._handoff is not available");return Reflect.apply(fn,target,args);}
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
export {__esmLocal0 as local_anonymous_3_1_0};
export {__esmLocal1 as local_norm_1};
export {__esmLocal2 as local_owned_2};
export {__esmLocal3 as local_task_3};
export {__esmLocal4 as local_levelGoal_4};
export {__esmLocal5 as local_hasPriority_5};
export {__esmLocal6 as local_blocks_6};
export {__esmLocal7 as local_pauseSides_7};
export {__esmLocal8 as local_restore_8};
export {__esmLocal9 as local_safe_9};
export {__esmLocal10 as local_hongOpen_10};
export {__esmLocal11 as local_sync_11};
export {__esmLocal12 as local_anonymous_76_59_12};
export {__esmLocal13 as local_stop_13};
export {__esmLocal14 as local_start_14};
export {__esmLocal15 as local_status_15};
export {__esmLocal16 as local__handoff_16};
export function initialize(){


(__captureESMFunction((__esmLocal0=(() => {
  'use strict';
  const W=window,old=__getKVPV6(),carry=old?._handoff?.();old?.stop?.('reload');
  const actor=String(W.__KVPV_OWN_ACTOR_ID||'');
  const S={enabled:true,timer:null,work:carry?.actor===actor?carry.work:null,reason:'waiting_task',lastError:''};
  const norm=__captureESMFunction((__esmLocal1=(x=>String(x||'').replace(/<[^>]*>/g,'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/gi,'d').toLowerCase())),"norm");
  const owned=__captureESMFunction((__esmLocal2=(()=>actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED)),"owned");
  function task(){const row=W._Ba?._zIt?._FIt?.ins?.taskInfo;if(!Array.isArray(row)||row[0]==null)return null;
    const cfg=W._ft?.__Z?.ins?.getTaskCfgById?.(row[0]);if(!cfg)return null;
    return {id:String(row[0]),state:Number(row[1]),name:String(cfg[1]||''),action:Number(cfg[6])};
  }
__esmLocal3=task;

  function levelGoal(){
    const dependency=__getKVPV7()?.levelGoal?.();if(dependency)return dependency;
    const q=task(),n=norm(q?.name);
    if(!q||![0,1,3].includes(q.state)||/phu van|co bao|trang bi|than khi|ky nang|pet|canh|tu vi|thien phu|ngoc|cuong hoa|tien vi|thoi trang|linh thu|phuc oa|bien than|nhan cuoi|than binh|linh duc|thu cuoi/.test(n))return null;
    if(!/(?:dat|len|tang)\s+cap\b|\bcap\s+(?:nhan vat|dat|den)|nhan vat.{0,22}cap|\b(?:level|lv)\s*\d/.test(n))return null;
    const target=Number(/(?:cap|level|lv)\s*(\d{1,4})\b/.exec(n)?.[1]),current=Number(W._Ba?._rJ?._O$?.ins?.level);
    return Number.isSafeInteger(target)&&target>0&&Number.isSafeInteger(current)&&current>0?{...q,target,current}:null;
  }
__esmLocal4=levelGoal;

  function hasPriority(){if(!S.enabled||!owned())return false;
    const q=task();return !!(q&&[0,1,2,3].includes(q.state))||!!__getKVPV9()?.goal?.();
  }
__esmLocal5=hasPriority;

  function blocks(activity){if(activity==='daily_trial')return hasPriority()&&task()?.state===2;
    if(!hasPriority())return false;
    const n=norm(__getKVPV7()?.equipmentGoal?.()?.name??task()?.name),patterns={daily_trial:/thi luyen|pho ban ngay/,beast_island:/than thu dao|phuong huyet|long phach/,summon_boss:/trieu hoi.*boss|boss.*trieu hoi/,rune_boss:/phu van/};
    return !patterns[activity]?.test(n);
  }
__esmLocal6=blocks;

  const sideKeys=['enableTienDuyen','enableCrystal','enableCompose','enableTuyetHoc','enableTinhThan','enableVinhDu','enableDaoTri'];
  const timedSideKeys=new Set(['enableVinhDu','enableDaoTri']);
  function pauseSides(){const c=__getKVPV2()?.config;
    // Upgrade from the old level-farming policy: return the user's saved Demon King setting once.
    if(c&&S.work?.sides&&'enableHongHoang' in S.work.sides){c.enableHongHoang=S.work.sides.enableHongHoang;delete S.work.sides.enableHongHoang;}
    if(c&&S.work?.sides&&'enableYeuVuong' in S.work.sides){c.enableYeuVuong=S.work.sides.enableYeuVuong;delete S.work.sides.enableYeuVuong;}
    if(c)for(const key of sideKeys){if(timedSideKeys.has(key))continue;if(S.work?.sides&&!(key in S.work.sides))S.work.sides[key]=c[key];c[key]=false;}}
__esmLocal7=pauseSides;

  function restore(){const w=S.work;if(!w)return;
    if(owned()){
      const stage=W._Ba?._Co?._Mo?.ins;if(stage?.auto===true)stage.auto=false;
      if(__getKVPV2()?.config){__getKVPV2().config.enableTuVuot=w.dailyEnabled;Object.assign(__getKVPV2().config,w.sides??{});}
      if(__getKVPV12()?.config)Object.assign(__getKVPV12().config,w.director);
    }S.work=null;
  }
__esmLocal8=restore;

  function safe(){const d=__getKVPV2()?.quickState?.(),scene=W._Ba?._$a,team=W._Ba?._cm?._q3t?.ins;
    const director=__getKVPV12()?.status?.(false);
    return scene?.SceneUtil?.isCommonScene===true&&scene?._yo?.ins?.isInMission!==true&&
      W._Ba?._rJ?._O$?.ins?.isDead!==true&&d?.running===true&&['rảnh','ranh'].includes(d.job)&&
      !W.KVPV?.core?.scene?.status?.()?.owner&&!__getKVPV10()?.busy?.()&&
      !__getKVPV5()?.status?.(false)?.running&&!team?.getHasTeams?.()&&!(Number(team?.roomId)>0)&&
      !/Da gui EXP MATCH/.test(String(director?.soloIdleReason||''));
  }
__esmLocal9=safe;

  function hongOpen(){
    const enabled=S.work?.sides?.enableHongHoang??__getKVPV2()?.config?.enableHongHoang;
    const state=W._Ba?._sst?._ist?.inst?.getCpSceneStateByType?.(17),m=W._Ba?._OBt?._WBt?.inst;
    return enabled===true&&Number(state?.[2])===2&&!!m&&m.getGathCountIsMax?.()===false;
  }
__esmLocal10=hongOpen;

  function sync(){if(__getKVPV3()?.manual===true)return;try{
    if(!S.enabled)return;if(__getKVPV0()?.priority?.()){S.reason='private_boss_invitation_priority';return;}if(!owned()){stop();return;}
    if(__getKVPV8()?.ownsProgression?.()){restore();S.reason='red_dot_first';return;}
    
    // Never re-enable stage while the authoritative planner reserves an event.
    const eventHold=__getKVPV4()?.hold?.();
    if(eventHold){
      const stage=W._Ba?._Co?._Mo?.ins;
      if(stage?.auto===true)__getKVPV4()?.yieldStage?.(eventHold);
      S.reason='yield_to_scheduled_event_'+eventHold.key;return;
    }
    if(hongOpen()){restore();S.reason='yield_to_open_honghoang';return;}
    const q=levelGoal();if(!q||q.current>=q.target){restore();S.reason=q?'level_met_waiting_quest_ack':'quest_first';return;}
    if(W.KVPV?.stageGuard?.isLocked?.()===true){restore();S.reason='tianquan_manually_paused';return;}
    if(__getKVPV1()?.beforeTask?.()===true){S.reason='priority_popup';return;}
    if(S.work&&S.work.key!==q.id)restore();
    if(S.work){pauseSides();if(__getKVPV2()?.config)__getKVPV2().config.enableTuVuot=true;S.reason='tianquan_for_missing_exp';return;}
    if(!safe()){S.reason='waiting_current_activity_before_tianquan';return;}
    const daily=__getKVPV2(),cfg=__getKVPV12()?.config;
    if(typeof daily?.tuVuotStart!=='function'||!cfg){S.reason='waiting_tianquan_executor';return;}
    S.work={key:q.id,sides:Object.fromEntries(sideKeys.map(__captureESMFunction((__esmLocal12=(key=>[key,daily.config?.[key]])),""))),dailyEnabled:daily.config?.enableTuVuot===true,director:{questFirst:cfg.questFirst,
      autoPublicExpMatching:cfg.autoPublicExpMatching,enableVerifiedExp4Account:cfg.enableVerifiedExp4Account}};
    cfg.questFirst=false;cfg.autoPublicExpMatching=false;cfg.enableVerifiedExp4Account=false;
    __getKVPV12().tick?.();pauseSides();
    daily.tuVuotStart();S.reason='tianquan_for_missing_exp';
  }catch(e){S.lastError=String(e);S.reason='error_no_entry_replay';}}
__esmLocal11=sync;

  function stop(reason='manual'){S.enabled=false;if(S.timer!==null)(__getKVPV11()?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;if(reason!=='reload')restore();}
__esmLocal13=stop;

  function start(){if(S.timer!==null)return;S.enabled=true;{const schedule=__getKVPV11()?.timers?.setInterval??W.setInterval;if(typeof schedule==='function')S.timer=schedule(sync,500);}sync();}
__esmLocal14=start;

  W.KVPV_QUEST_PRIORITY=Object.freeze({start,stop,sync,hasPriority,blocks,
    status:__captureESMFunction((__esmLocal15=(()=>({enabled:S.enabled,priority:hasPriority(),task:task(),levelGoal:levelGoal(),reason:S.reason,lastError:S.lastError,allowKNB:false}))),"status"),
    _handoff:__captureESMFunction((__esmLocal16=(()=>({actor,work:S.work}))),"_handoff")});if(__getKVPV2())start();
})),""))();

}
export {getKVPV_QUEST_PRIORITY} from '../api.mjs';
export const api=Object.freeze({
  get KVPV_QUEST_PRIORITY(){return globalThis.KVPV_QUEST_PRIORITY;},
});