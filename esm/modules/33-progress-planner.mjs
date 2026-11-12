import {getKVPV_CONFIRM_POPUPS as __getKVPV0,getKVPV_DAILY as __getKVPV1,getKVPV_DAILY_TRIAL as __getKVPV2,getKVPV_FABAO_FAST as __getKVPV3,getKVPV_FABAO_TREASURE as __getKVPV4,getKVPV_HITRUN1 as __getKVPV5,getKVPV_LINHLUNG922 as __getKVPV6,getKVPV_LINHLUNG_TH as __getKVPV7,getKVPV_PROGRESS_PLANNER as __getKVPV8,getKVPV_REBORN_GOALS as __getKVPV9,getKVPV_UPGRADES as __getKVPV10,getKVPV_V1 as __getKVPV11} from '../api.mjs';
import {call_KVPV_LINHLUNG_TH_start as __callKVPV0} from "./17-linh-lung-th.mjs";
export function call_KVPV_PROGRESS_PLANNER_sync(...args){const target=globalThis["KVPV_PROGRESS_PLANNER"];const fn=globalThis["KVPV_PROGRESS_PLANNER"]?.["sync"];if(typeof fn!=='function')throw Error("KVPV_PROGRESS_PLANNER.sync is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_PROGRESS_PLANNER_stop(...args){const target=globalThis["KVPV_PROGRESS_PLANNER"];const fn=globalThis["KVPV_PROGRESS_PLANNER"]?.["stop"];if(typeof fn!=='function')throw Error("KVPV_PROGRESS_PLANNER.stop is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_PROGRESS_PLANNER_inspect(...args){const target=globalThis["KVPV_PROGRESS_PLANNER"];const fn=globalThis["KVPV_PROGRESS_PLANNER"]?.["inspect"];if(typeof fn!=='function')throw Error("KVPV_PROGRESS_PLANNER.inspect is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_PROGRESS_PLANNER_materialDungeon(...args){const target=globalThis["KVPV_PROGRESS_PLANNER"];const fn=globalThis["KVPV_PROGRESS_PLANNER"]?.["materialDungeon"];if(typeof fn!=='function')throw Error("KVPV_PROGRESS_PLANNER.materialDungeon is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_PROGRESS_PLANNER_status(...args){const target=globalThis["KVPV_PROGRESS_PLANNER"];const fn=globalThis["KVPV_PROGRESS_PLANNER"]?.["status"];if(typeof fn!=='function')throw Error("KVPV_PROGRESS_PLANNER.status is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_PROGRESS_PLANNER__handoff(...args){const target=globalThis["KVPV_PROGRESS_PLANNER"];const fn=globalThis["KVPV_PROGRESS_PLANNER"]?.["_handoff"];if(typeof fn!=='function')throw Error("KVPV_PROGRESS_PLANNER._handoff is not available");return Reflect.apply(fn,target,args);}
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
export {__esmLocal0 as local_anonymous_6_1_0};
export {__esmLocal1 as local_norm_1};
export {__esmLocal2 as local_matches_2};
export {__esmLocal3 as local_good_3};
export {__esmLocal4 as local_owned_4};
export {__esmLocal5 as local_goals_5};
export {__esmLocal6 as local_sources_6};
export {__esmLocal7 as local_anonymous_68_48_7};
export {__esmLocal8 as local_anonymous_78_28_8};
export {__esmLocal9 as local_inspect_9};
export {__esmLocal10 as local_anonymous_108_63_10};
export {__esmLocal11 as local_anonymous_108_96_11};
export {__esmLocal12 as local_anonymous_124_14_12};
export {__esmLocal13 as local_anonymous_126_30_13};
export {__esmLocal14 as local_anonymous_126_65_14};
export {__esmLocal15 as local_anonymous_126_84_15};
export {__esmLocal16 as local_anonymous_130_36_16};
export {__esmLocal17 as local_materialDungeon_17};
export {__esmLocal18 as local_stopOwnedTower_18};
export {__esmLocal19 as local_farmTower_19};
export {__esmLocal20 as local_sync_20};
export {__esmLocal21 as local_stop_21};
export {__esmLocal22 as local_status_22};
export {__esmLocal23 as local__handoff_23};
export function initialize(){





(__captureESMFunction((__esmLocal0=(() => {

  'use strict';

  const W=window,old=__getKVPV8(),carry=old?._handoff?.();old?.stop?.('reload');

  const actor=String(W.__KVPV_OWN_ACTOR_ID||'');

  const same=carry?.actor===actor;

  const S={enabled:true,timer:null,plan:null,reason:'waiting_goal',lastError:'',towerOwned:same?carry.towerOwned:false,lastTowerKey:same?carry.lastTowerKey:null};

  const norm=__captureESMFunction((__esmLocal1=(x=>String(x||'').replace(/<[^>]*>/g,'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/gi,'d').toLowerCase())),"norm");

  const matches=__captureESMFunction((__esmLocal2=(n=>/phap bao/.test(norm(n))&&/tu vi/.test(norm(n)))),"matches");

  const good=__captureESMFunction((__esmLocal3=(x=>Number.isFinite(x)&&x>=0)),"good");

  const owned=__captureESMFunction((__esmLocal4=(()=>actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED)),"owned");

  function goals(){

    const dependency=__getKVPV9()?.fabaoGoal?.();if(dependency)return [dependency];

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
__esmLocal5=goals;


  function sources(itemId){

    const item=W._ft?._mY?.ins?.getItemCfgById?.(itemId),ids=item?.[14];

    if(!Array.isArray(ids))return [];

    const dungeons=__getKVPV2()?.status?.()?.dungeons??[];

    return ids.filter(Number.isSafeInteger).map(__captureESMFunction((__esmLocal7=(id=>{

      const cfg=W._ft?._Bwt?.ins?.getCfgById?.(id),action=Number(cfg?.[3]?.[0]),map=Number(cfg?.[5]);

      // Native getWayJump1 prefers action, then panel, then map; do not treat a

      // map field as executable if the actual native route chooses something else.

      const direct=cfg&&!(cfg[3]?.length)&&!(cfg[4]?.length);

      const d=dungeons.find(__captureESMFunction((__esmLocal8=(d=>direct?d.id===map:d.feature===action)),""));

      const ready=!!d&&d.known&&d.unlocked&&d.taskAllowed&&d.remaining>0&&Number.isSafeInteger(d.level)&&d.level>0;

      return {id,itemId,action,map,executor:d?'daily_trial':null,dungeon:d?.id??null,

        reason:ready?'free_material_challenge':d?'source_locked_or_no_free_turn':'unverified_source',ready};

    })),""));

  }
__esmLocal6=sources;


  function inspect(){

    const goal=goals()[0];if(!goal)return {reason:'no_fabao_cultivation_goal',goal:null,upgrades:[]};

    if(goal.state===goal.claimState)return {reason:'waiting_existing_reward_queue',goal,upgrades:[]};

    const rise=W._Ba?._rnt?._vnt?.ins?.getAmuletRise?.(),nativeTuVi=Number(rise?.[1]);

    const current=goal.source!=='MAIN'?goal.progress:good(nativeTuVi)?nativeTuVi:null;

    const remaining=current!==null&&goal.target!==null?Math.max(0,goal.target-current):null;

    if(remaining===0)return {reason:'waiting_server_goal_ack',goal,current,nativeTuVi,remaining,upgrades:[]};

    if(remaining===null)return {reason:'waiting_verified_goal_progress',goal,current,nativeTuVi,remaining,upgrades:[]};

    const cfg=W._ft?._s$?.ins,bag=W._Ba?._Ic?._aQ?.ins;

    const upgrades=(__getKVPV3()?.inspect?.()??[]).filter(__captureESMFunction((__esmLocal10=(x=>x.level>0&&x.level<x.max)),"")).map(__captureESMFunction((__esmLocal11=(x=>{

      const a=cfg?.getCfgByIdLevel?.(x.id,x.level),b=cfg?.getCfgByIdLevel?.(x.id,x.level+1),gain=Number(b?.[5])-Number(a?.[5]);

      const fragment=Number(a?.[4]),cost=Number(a?.[3]?.[1]),ownedItem=Number(bag?.getItemCountById?.(x.id)),ownedFragment=Number(bag?.getItemCountById?.(fragment));

      const known=Number.isSafeInteger(cost)&&cost>0&&good(ownedItem)&&good(ownedFragment)&&good(gain)&&gain>0;

      const missing=known?Math.max(0,cost-ownedItem-ownedFragment):null;

      return {id:x.id,level:x.level,gain:known?gain:null,cost,fragment,ownedItem,ownedFragment,missing,

        ready:known&&missing===0,reason:!known?'unknown_upgrade_cost_or_gain':missing?'missing_materials':'upgrade_owned_materials',

        sources:known&&missing?sources(fragment):[]};

    })),"")).filter(__captureESMFunction((__esmLocal12=(x=>x.gain!==null)),""));

    const ready=upgrades.find(__captureESMFunction((__esmLocal13=(x=>x.ready)),"")),exact=upgrades.flatMap(__captureESMFunction((__esmLocal14=(x=>x.sources)),"")).find(__captureESMFunction((__esmLocal15=(x=>x.ready)),""));

    const tower=__getKVPV6()?.status?.(false);

    const towerSource=upgrades.some(__captureESMFunction((__esmLocal16=(x=>x.missing>0)),""))&&Number.isSafeInteger(tower?.highestFloor)&&Number.isSafeInteger(tower?.nextFloor)&&tower.nextFloor>tower.highestFloor&&typeof __getKVPV7()?.start==='function'?

      {executor:'linh_lung',targetFloor:tower.nextFloor,currentFloor:tower.highestFloor,ready:true,reason:'user_confirmed_free_treasure_key_source',reward:'treasure_key',next:'fabao_treasure_type4',specificDropVerified:false}:null;

    const source=towerSource??exact;

    return {goal,current,nativeTuVi,remaining,upgrades,selected:ready?.id??null,source:ready?null:source??null,

      reason:ready?'upgrade_owned_materials':source?'farm_verified_material_source':upgrades.length?'missing_materials_no_verified_free_source':'no_verified_positive_upgrade'};

  }
__esmLocal9=inspect;


  function materialDungeon(){if(!S.enabled||!owned()||__getKVPV4()?.hasWork?.())return null;

    // Recompute from native state so a newly obtained item stops further farming.

    return inspect().source?.dungeon??null;

  }
__esmLocal17=materialDungeon;


  function stopOwnedTower(){

    if(!S.towerOwned)return true;

    const t=__getKVPV6(),s=t?.status?.(false);

    if(s?.pendingFloor||s?.pendingClaim||s?.active&&(s.unclaimedNormal>0||s.unclaimedLarge>0)){S.reason='waiting_tower_battle_or_reward_ack';return false;}

    if(s?.active)t.stop?.('Pháp Bảo: kiểm tra lại vật phẩm và nhiệm vụ');S.towerOwned=false;return true;

  }
__esmLocal18=stopOwnedTower;


  function farmTower(source){

    const t=__getKVPV6(),s=t?.status?.(false);

    if(s?.active){

      if(!S.towerOwned){S.reason='existing_tower_run_preserved';return;}

      if(s.highestFloor>=s.targetFloor){if(!stopOwnedTower())return;}

      else {S.reason='tower_for_fabao_materials';return;}

    }else if(S.towerOwned)S.towerOwned=false;

    const key=S.plan.goal.source+'/'+S.plan.goal.id+'/'+source.targetFloor;

    if(S.lastTowerKey===key){S.reason='tower_floor_already_attempted_no_restart';return;}

    const d=__getKVPV1()?.quickState?.();

    if(W._Ba?._$a?.SceneUtil?.isCommonScene!==true||W._Ba?._$a?._yo?.ins?.isInMission===true||

      W._Ba?._rJ?._O$?.ins?.isDead===true||d?.running!==true||!['rảnh','ranh'].includes(d.job)||

      W.KVPV?.core?.scene?.status?.()?.owner||__getKVPV10()?.busy?.()||__getKVPV5()?.status?.(false)?.running){S.reason='waiting_idle_for_material_tower';return;}

    S.lastTowerKey=key;S.towerOwned=true;

    __callKVPV0({targetFloor:source.targetFloor,exclusiveDaily:true,autoClaim:true});S.reason='tower_for_fabao_materials';

  }
__esmLocal19=farmTower;


  function sync(){try{if(!S.enabled)return;if(!owned()){stop();return;}

    S.plan=inspect();S.reason=S.plan.reason;

    if(__getKVPV0()?.beforeTask?.()===true){S.reason='priority_popup';return;}

    if(__getKVPV4()?.hasWork?.()){

      if(!stopOwnedTower())return;S.reason='use_treasure_keys_then_collect_fabao';__getKVPV4().sync?.();return;

    }

    if(S.plan.source?.executor==='linh_lung'){farmTower(S.plan.source);return;}

    if(!stopOwnedTower())return;

    if(S.plan.selected)__getKVPV3()?.sync?.();

    // Daily Trial's own scheduler consumes materialDungeon(), preserves pending

    // requests, scene ownership, free quotas and native lock checks.

  }catch(e){S.lastError=String(e);S.reason='error';}}
__esmLocal20=sync;


  function stop(reason='manual'){S.enabled=false;if(reason!=='reload')stopOwnedTower();if(S.timer!==null)(__getKVPV11()?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;}
__esmLocal21=stop;


  W.KVPV_PROGRESS_PLANNER=Object.freeze({sync,stop,inspect,materialDungeon,

    status:__captureESMFunction((__esmLocal22=(()=>({enabled:S.enabled,actor,reason:S.reason,plan:S.plan,towerOwned:S.towerOwned,lastError:S.lastError,allowKNB:false}))),"status"),

    _handoff:__captureESMFunction((__esmLocal23=(()=>({actor,towerOwned:S.towerOwned,lastTowerKey:S.lastTowerKey}))),"_handoff")});

  S.timer=(__getKVPV11()?.timers?.setInterval??W.setInterval)(sync,1000);sync();

})),""))();


}
export {getKVPV_PROGRESS_PLANNER} from '../api.mjs';
export const api=Object.freeze({
  get KVPV_PROGRESS_PLANNER(){return globalThis.KVPV_PROGRESS_PLANNER;},
});