import {getKVPV_CONFIRM_POPUPS as __getKVPV0,getKVPV_DAILY as __getKVPV1,getKVPV_DAILY_TRIAL as __getKVPV2,getKVPV_HITRUN1 as __getKVPV3,getKVPV_LINHLUNG922 as __getKVPV4,getKVPV_LINHLUNG_TH as __getKVPV5,getKVPV_QUEST_GOALS as __getKVPV6,getKVPV_REBORN_GOALS as __getKVPV7,getKVPV_TIENVI_GOALS as __getKVPV8,getKVPV_UPGRADES as __getKVPV9,getKVPV_V1 as __getKVPV10,getKVPV_V864 as __getKVPV11,getKVPV_V866 as __getKVPV12} from '../api.mjs';
import {call_KVPV_LINHLUNG_TH_start as __callKVPV0} from "./17-linh-lung-th.mjs";
export function call_KVPV_QUEST_GOALS_start(...args){const target=globalThis["KVPV_QUEST_GOALS"];const fn=globalThis["KVPV_QUEST_GOALS"]?.["start"];if(typeof fn!=='function')throw Error("KVPV_QUEST_GOALS.start is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_QUEST_GOALS_stop(...args){const target=globalThis["KVPV_QUEST_GOALS"];const fn=globalThis["KVPV_QUEST_GOALS"]?.["stop"];if(typeof fn!=='function')throw Error("KVPV_QUEST_GOALS.stop is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_QUEST_GOALS_sync(...args){const target=globalThis["KVPV_QUEST_GOALS"];const fn=globalThis["KVPV_QUEST_GOALS"]?.["sync"];if(typeof fn!=='function')throw Error("KVPV_QUEST_GOALS.sync is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_QUEST_GOALS_recognize(...args){const target=globalThis["KVPV_QUEST_GOALS"];const fn=globalThis["KVPV_QUEST_GOALS"]?.["recognize"];if(typeof fn!=='function')throw Error("KVPV_QUEST_GOALS.recognize is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_QUEST_GOALS_status(...args){const target=globalThis["KVPV_QUEST_GOALS"];const fn=globalThis["KVPV_QUEST_GOALS"]?.["status"];if(typeof fn!=='function')throw Error("KVPV_QUEST_GOALS.status is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_QUEST_GOALS__handoff(...args){const target=globalThis["KVPV_QUEST_GOALS"];const fn=globalThis["KVPV_QUEST_GOALS"]?.["_handoff"];if(typeof fn!=='function')throw Error("KVPV_QUEST_GOALS._handoff is not available");return Reflect.apply(fn,target,args);}
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
let __esmLocal23;
export {__esmLocal0 as local_anonymous_7_1_0};
export {__esmLocal1 as local_owned_1};
export {__esmLocal2 as local_mainTask_2};
export {__esmLocal3 as local_task_3};
export {__esmLocal4 as local_normalize_4};
export {__esmLocal5 as local_recognize_5};
export {__esmLocal6 as local_restoreCo_6};
export {__esmLocal7 as local_note_7};
export {__esmLocal8 as local_tower_8};
export {__esmLocal9 as local_stopOwnedTower_9};
export {__esmLocal10 as local_idle_10};
export {__esmLocal11 as local_prerequisites_11};
export {__esmLocal12 as local_anonymous_89_39_12};
export {__esmLocal13 as local_anonymous_89_67_13};
export {__esmLocal14 as local_restoreStage_14};
export {__esmLocal15 as local_acquireFragment_15};
export {__esmLocal16 as local_anonymous_137_44_16};
export {__esmLocal17 as local_anonymous_137_75_17};
export {__esmLocal18 as local_tick_18};
export {__esmLocal19 as local_stop_19};
export {__esmLocal20 as local_start_20};
export {__esmLocal21 as local_status_21};
export {__esmLocal22 as local_anonymous_243_139_22};
export {__esmLocal23 as local__handoff_23};
export function initialize(){






(__captureESMFunction((__esmLocal0=(() => {

  'use strict';

  const W=window,old=__getKVPV6(),carry=old?._handoff?.();old?.stop?.('reload');

  const actor=String(W.__KVPV_OWN_ACTOR_ID||''),same=carry?.actor===actor;

  const S={enabled:true,timer:null,route:null,reason:'waiting_task',lastError:'',

    towerOwned:same?carry.towerOwned:false,startedKey:same?carry.startedKey:null,

    savedCo:same?carry.savedCo:null,stageWork:same?carry.stageWork:null,dependency:null,history:[]};

  const owned=__captureESMFunction((__esmLocal1=(()=>actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED)),"owned");

  function mainTask(){const row=W._Ba?._zIt?._FIt?.ins?.taskInfo;

    if(!Array.isArray(row)||row[0]==null)return null;

    const cfg=W._ft?.__Z?.ins?.getTaskCfgById?.(row[0]);if(!cfg)return null;

    return {id:String(row[0]),state:Number(row[1]),name:String(cfg[1]||''),action:Number(cfg[6]),progress:row[2]??null};

  }
__esmLocal2=mainTask;


  function task(){const main=mainTask();return recognize(main)&&main.state!==2?main:(__getKVPV7()?.towerGoal?.()??__getKVPV8()?.goal?.()??main);}
__esmLocal3=task;


  const normalize=__captureESMFunction((__esmLocal4=(x=>String(x).replace(/<[^>]*>/g,'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/gi,'d').toLowerCase().replace(/\s+/g,' ').trim())),"normalize");

  function recognize(q){if(!q)return null;const name=normalize(q.name);let kind,match;

    if(q.action===189&&/co bao/.test(name)&&/kich hoat/.test(name)){

      kind='CO_BAO';match=/kich hoat\s*(\d+)\s*co bao/.exec(name);

    }else if(q.action===21&&/linh lung thap/.test(name)){

      kind='LINH_LUNG';match=/linh lung thap\s*(?:tang)?\s*(\d+)/.exec(name);

    }

    const target=Number(['TIEN_VI','REBORN'].includes(q.source)?q.target:match?.[1]);return kind&&Number.isSafeInteger(target)&&target>0&&target<=10000?{kind,target,key:q.id+'/'+kind+'/'+target}:null;

  }
__esmLocal5=recognize;


  function restoreCo(){restoreStage();const cfg=__getKVPV11()?.config;if(S.savedCo&&cfg){Object.assign(cfg,S.savedCo);S.savedCo=null;}}
__esmLocal6=restoreCo;


  function note(reason){if(S.reason!==reason){S.history.push({at:Date.now(),reason});if(S.history.length>40)S.history.shift();}S.reason=reason;}
__esmLocal7=note;


  function tower(){return __getKVPV4();}
__esmLocal8=tower;


  function stopOwnedTower(){

    if(!S.towerOwned)return true;

    const s=tower()?.status?.(false);

    if(s?.pendingFloor||s?.pendingClaim){note('waiting_owned_tower_finish');return false;}

    if(s?.active)tower()?.stop?.('Nhiệm vụ đã đổi hoặc đủ mục tiêu');S.towerOwned=false;return true;

  }
__esmLocal9=stopOwnedTower;


  function idle(){if(Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0))return false;const q=__getKVPV1()?.quickState?.(),lease=W.KVPV?.core?.scene?.status?.();

    return W._Ba?._$a?.SceneUtil?.isCommonScene===true&&W._Ba?._$a?._yo?.ins?.isInMission!==true&&

      W._Ba?._rJ?._O$?.ins?.isDead!==true&&q?.running===true&&['rảnh','ranh'].includes(q.job)&&

      !lease?.owner&&!__getKVPV3()?.status?.(false)?.running&&!__getKVPV9()?.busy?.()&&

      !__getKVPV2()?.hasPriority?.();

  }
__esmLocal10=idle;


  

  function prerequisites(p){

    const f=p?.fragments,stage=W._Ba?._Co?._Mo?.ins,level=Number(stage?.curLv);

    const missing=(f?.rows??[]).filter(__captureESMFunction((__esmLocal12=(x=>!x.owned&&!x.placed)),"")).map(__captureESMFunction((__esmLocal13=((x,index)=>{

      const required=Number(x.stage??f?.config?.[7]?.[x.index??index]);

      const cfg=Number.isSafeInteger(required)&&required>0?W._ft?._h$?.ins?.getCfgByLv?.(required):null;

      return {id:x.id,name:String(W._ft?._mY?.ins?.getItemCfgById?.(x.id)?.[1]||''),

        stage:cfg&&Number(cfg[0])>0?required:null,

        source:'shenqi[7]',step:cfg&&Number(cfg[0])>0&&Number.isSafeInteger(level)?

          level<=required?'clear_stage':Array.isArray(stage?.awardLvs)&&stage.awardLvs.map(Number).includes(required)?'claim_reward':'waiting_fragment_state':'unknown_source'};

    })),""));

    return {artifactNumber:Number(f?.count)+1,name:String(f?.config?.[1]||''),currentStage:Number.isSafeInteger(level)?level:null,missing};

  }
__esmLocal11=prerequisites;


  function restoreStage(){const w=S.stageWork;if(!w)return;

    const cfg=__getKVPV11()?.config,stage=W._Ba?._Co?._Mo?.ins,daily=__getKVPV1();

    if(cfg)cfg.suspendTuVuotDuringCoBao=w.suspend;

    if(__getKVPV12()?.config&&typeof w.questFirst==='boolean')__getKVPV12().config.questFirst=w.questFirst;

    if(owned()){

      

      if(stage?.auto===true)stage.auto=false;

      if(daily?.config)daily.config.enableTuVuot=w.dailyEnabled;

    }

    S.stageWork=null;

  }
__esmLocal14=restoreStage;


  function acquireFragment(p){

    S.dependency=prerequisites(p);

    if(p?.step!=='missing'){restoreStage();return false;}

    const goals=S.dependency.missing.filter(__captureESMFunction((__esmLocal16=(x=>x.step==='clear_stage')),"")).map(__captureESMFunction((__esmLocal17=(x=>x.stage)),""));

    const target=goals.length?Math.min(...goals):null;

    if(S.stageWork&&(target===null||S.stageWork.goal!==target))restoreStage();

    if(target===null)return false;

    const cfg=__getKVPV11()?.config,daily=__getKVPV1();

    if(!cfg||typeof daily?.tuVuotStart!=='function')return false;

    if(W.KVPV?.stageGuard?.isLocked?.()===true){note('cobao_prerequisite_stage_manually_paused');return true;}

    if(S.stageWork){cfg.suspendTuVuotDuringCoBao=false;note('cobao_farming_stage_'+target);return true;}

    if(!idle()){note('waiting_idle_for_cobao_fragment_stage');return true;}

    S.stageWork={goal:target,suspend:cfg.suspendTuVuotDuringCoBao,dailyEnabled:daily.config?.enableTuVuot===true,questFirst:__getKVPV12()?.config?.questFirst};

    cfg.suspendTuVuotDuringCoBao=false;

    try{

      

      

      if(__getKVPV12()?.config){__getKVPV12().config.questFirst=false;__getKVPV12().tick?.();}

      daily.tuVuotStart();note('cobao_farming_stage_'+target);}

    catch(e){restoreStage();throw e;}

    return true;

  }
__esmLocal15=acquireFragment;


  function tick(){try{

    if(!S.enabled)return;if(!owned()){stop();return;}

    if(__getKVPV0()?.beforeTask?.()===true){note('priority_popup');return;}

    const q=task(),route=recognize(q);S.route=route?{...route,task:q}:null;

    if(!route||q.state===2){restoreCo();if(!stopOwnedTower())return;note(q?.state===2?'waiting_native_quest_reward':'no_supported_goal');return;}

    if(route.kind==='CO_BAO'){

      if(!stopOwnedTower())return;

      const api=__getKVPV11(),cfg=api?.config;if(!cfg){note('waiting_cobao_executor');return;}

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

    if(!__getKVPV5()?.start){note('waiting_tower_executor');return;}

    S.startedKey=route.key;S.towerOwned=true;note('starting_tower_goal');

    __callKVPV0({targetFloor:route.target,exclusiveDaily:true});

  }catch(e){S.lastError=String(e);note('error');__getKVPV10()?.diagnostics?.record?.(e);}}
__esmLocal18=tick;


  function stop(reason='manual'){S.enabled=false;

    if(S.timer!==null)(__getKVPV10()?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;

    if(reason!=='reload'){restoreCo();stopOwnedTower();}}
__esmLocal19=stop;


  function start(){if(S.timer!==null)return;S.enabled=true;

    S.timer=(__getKVPV10()?.timers?.setInterval??W.setInterval)(tick,1000);tick();}
__esmLocal20=start;


  W.KVPV_QUEST_GOALS=Object.freeze({start,stop,sync:tick,recognize,

    status:__captureESMFunction((__esmLocal21=(()=>({enabled:S.enabled,actor,route:S.route,dependency:S.dependency,reason:S.reason,lastError:S.lastError,history:S.history.map(__captureESMFunction((__esmLocal22=(x=>({...x}))),"")),allowKNB:false}))),"status"),

    _handoff:__captureESMFunction((__esmLocal23=(()=>({actor,towerOwned:S.towerOwned,startedKey:S.startedKey,savedCo:S.savedCo,stageWork:S.stageWork}))),"_handoff")});

  start();

})),""))();


}
export {getKVPV_QUEST_GOALS} from '../api.mjs';
export const api=Object.freeze({
  get KVPV_QUEST_GOALS(){return globalThis.KVPV_QUEST_GOALS;},
});