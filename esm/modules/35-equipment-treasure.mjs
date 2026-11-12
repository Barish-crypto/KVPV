import {getKVPV_DAILY_TRIAL as __getKVPV0,getKVPV_EQUIPMENT_TREASURE as __getKVPV1,getKVPV_FABAO_TREASURE as __getKVPV2,getKVPV_QUEST_PRIORITY as __getKVPV3,getKVPV_REBORN_GOALS as __getKVPV4,getKVPV_V1 as __getKVPV5} from '../api.mjs';
export function call_KVPV_EQUIPMENT_TREASURE_sync(...args){const target=globalThis["KVPV_EQUIPMENT_TREASURE"];const fn=globalThis["KVPV_EQUIPMENT_TREASURE"]?.["sync"];if(typeof fn!=='function')throw Error("KVPV_EQUIPMENT_TREASURE.sync is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_EQUIPMENT_TREASURE_stop(...args){const target=globalThis["KVPV_EQUIPMENT_TREASURE"];const fn=globalThis["KVPV_EQUIPMENT_TREASURE"]?.["stop"];if(typeof fn!=='function')throw Error("KVPV_EQUIPMENT_TREASURE.stop is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_EQUIPMENT_TREASURE_materialDungeon(...args){const target=globalThis["KVPV_EQUIPMENT_TREASURE"];const fn=globalThis["KVPV_EQUIPMENT_TREASURE"]?.["materialDungeon"];if(typeof fn!=='function')throw Error("KVPV_EQUIPMENT_TREASURE.materialDungeon is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_EQUIPMENT_TREASURE_status(...args){const target=globalThis["KVPV_EQUIPMENT_TREASURE"];const fn=globalThis["KVPV_EQUIPMENT_TREASURE"]?.["status"];if(typeof fn!=='function')throw Error("KVPV_EQUIPMENT_TREASURE.status is not available");return Reflect.apply(fn,target,args);}
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
export {__esmLocal0 as local_anonymous_6_1_0};
export {__esmLocal1 as local_norm_1};
export {__esmLocal2 as local_owned_2};
export {__esmLocal3 as local_classify_3};
export {__esmLocal4 as local_task_4};
export {__esmLocal5 as local_objective_5};
export {__esmLocal6 as local_allowed_6};
export {__esmLocal7 as local_itemKnown_7};
export {__esmLocal8 as local_materialPlan_8};
export {__esmLocal9 as local_anonymous_78_90_9};
export {__esmLocal10 as local_anonymous_90_28_10};
export {__esmLocal11 as local_materialDungeon_11};
export {__esmLocal12 as local_sync_12};
export {__esmLocal13 as local_allowed_13};
export {__esmLocal14 as local_itemKnown_14};
export {__esmLocal15 as local_stop_15};
export {__esmLocal16 as local_status_16};
export {__esmLocal17 as local_anonymous_116_89_17};
export function initialize(){

/* Native regular treasure categories only. Shares the type4 sender/ACK lock;
 * no duplicate RPC worker, no glory/event currency categories (9+).
 * Reward membership comes from native getItemShow pools, not guessed ID types. */

(__captureESMFunction((__esmLocal0=(() => {

  'use strict';

  const W=window;__getKVPV1()?.stop?.();

  const actor=String(W.__KVPV_OWN_ACTOR_ID||''),S={enabled:true,timer:null,lastError:''},rewardCache=new Map();

  // Native _Rti routes: type0 ->93, type1 ->115, type2 ->116, type3 ->393.

  const categories=[{type:0,panel:93,name:'Trang Bị'},{type:3,panel:393,name:'Phù Văn'},

    {type:1,panel:115,name:'Đỉnh Cao'},{type:2,panel:116,name:'Chí Tôn'}];

  const norm=__captureESMFunction((__esmLocal1=(x=>String(x||'').replace(/<[^>]*>/g,'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/gi,'d').toLowerCase())),"norm");

  const owned=__captureESMFunction((__esmLocal2=(()=>actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED)),"owned");

  function classify(name){const n=norm(name);if(/phap bao/.test(n))return 4;if(/phu van/.test(n))return 3;

    if(/dinh cao/.test(n))return 1;if(/chi ton/.test(n))return 2;if(/trang bi|vu khi|non|bao tay|day chuyen|vong tay/.test(n))return 0;return null;

  }
__esmLocal3=classify;


  function task(){const r=W._Ba?._zIt?._FIt?.ins?.taskInfo;if(!Array.isArray(r))return null;

    const cfg=W._ft?.__Z?.ins?.getTaskCfgById?.(r[0]);return cfg?{id:String(r[0]),state:Number(r[1]),name:String(cfg[1]||''),type:classify(cfg[1])}:null;

  }
__esmLocal4=task;


  function objective(){const dependency=__getKVPV4()?.equipmentGoal?.();if(dependency)return {...dependency,type:classify(dependency.name)};const q=task();if(q&&[0,1,2,3].includes(q.state))return [0,1,3].includes(q.state)&&q.type!==null?q:null;

    const rows=W._Ba?._G_n?._U_n?.ins?.tasks;

    for(const r of Array.isArray(rows)?rows:[]){if(Number(r?.[1])!==0)continue;

      const cfg=W._ft?._mei?.ins?.getXianweiTaskDataById?.(Number(r[0])),type=classify(cfg?.[3]);

      if(type!==null)return {id:String(r[0]),state:0,type,name:String(cfg[3])};

    }return null;

  }
__esmLocal5=objective;


  function allowed(type){if(!S.enabled||!owned())return false;const dependency=__getKVPV4()?.equipmentGoal?.();if(dependency)return classify(dependency.name)===type;const q=task();

    if(q&&[0,1,2,3].includes(q.state))return [0,1,3].includes(q.state)&&q.type===type;

    const goal=objective();return goal?goal.type===type:!__getKVPV3()?.hasPriority?.();

  }
__esmLocal6=allowed;


  function itemKnown(type,id){

    if(!rewardCache.has(type)){

      const rows=W._ft?._oZ?.ins?.getItemShow?.(type),ids=new Set();

      if(Array.isArray(rows))for(const r of rows){

        for(const entry of Array.isArray(r?.[3])?r[3]:[])if(Number.isSafeInteger(Number(entry?.[0])))ids.add(Number(entry[0]));

        for(const item of Array.isArray(r?.[4])?r[4]:[])if(Number.isSafeInteger(Number(item)))ids.add(Number(item));

      }if(ids.size)rewardCache.set(type,ids);

    }return rewardCache.get(type)?.has(id)===true;

  }
__esmLocal7=itemKnown;


  function materialPlan(){

    if(!S.enabled||!owned())return null;const goal=objective();if(!goal||!categories.some(__captureESMFunction((__esmLocal9=(x=>x.type===goal.type)),"")))return null;

    const info=__getKVPV2()?.inspectType?.(goal.type);if(!info||info.draw.ready||info.warehouse)return null;

    const key=info.draw.key,item=W._ft?._mY?.ins?.getItemCfgById?.(key),ways=item?.[14],dungeons=__getKVPV0()?.status?.()?.dungeons??[];

    const sources=[];

    for(const id of Array.isArray(ways)?ways:[]){const cfg=W._ft?._Bwt?.ins?.getCfgById?.(id);if(!cfg)continue;

      const action=Number(cfg[3]?.[0]),map=Number(cfg[5]),direct=!cfg[3]?.length&&!cfg[4]?.length;

      const d=dungeons.find(__captureESMFunction((__esmLocal10=(d=>direct?d.id===map:d.feature===action)),""));

      if(d?.known&&d.unlocked&&d.taskAllowed&&d.remaining>0&&Number.isSafeInteger(d.level)&&d.level>0)sources.push({id,dungeon:d.id,key});

    }

    return {goal,key,sources,reason:sources.length?'farm_verified_key_source':'missing_key_source_not_supported'};

  }
__esmLocal8=materialPlan;


  function materialDungeon(){return materialPlan()?.sources?.[0]?.dungeon??null;}
__esmLocal11=materialDungeon;


  function sync(){try{if(!S.enabled)return;if(!owned()){stop();return;}

    const api=__getKVPV2();if(!api?.registerType)return;

    for(const d of categories)api.registerType({...d,allowed:__captureESMFunction((__esmLocal13=(()=>allowed(d.type))),"allowed"),itemKnown:__captureESMFunction((__esmLocal14=(id=>itemKnown(d.type,id))),"itemKnown")});

    api.sync();

  }catch(e){S.lastError=String(e);}}
__esmLocal12=sync;


  function stop(){S.enabled=false;if(S.timer!==null)(__getKVPV5()?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;}
__esmLocal15=stop;


  W.KVPV_EQUIPMENT_TREASURE=Object.freeze({sync,stop,materialDungeon,

    status:__captureESMFunction((__esmLocal16=(()=>({enabled:S.enabled,actor,objective:objective(),categories:categories.map(__captureESMFunction((__esmLocal17=(d=>({...d,allowed:allowed(d.type),...__getKVPV2()?.inspectType?.(d.type)}))),"")),

      materials:materialPlan(),lastError:S.lastError,allowKNB:false}))),"status")});

  S.timer=(__getKVPV5()?.timers?.setInterval??W.setInterval)(sync,1000);sync();

})),""))();


}
export {getKVPV_EQUIPMENT_TREASURE} from '../api.mjs';
export const api=Object.freeze({
  get KVPV_EQUIPMENT_TREASURE(){return globalThis.KVPV_EQUIPMENT_TREASURE;},
});