import {getKVPV_BG_RESOURCES as __getKVPV0,getKVPV_CONFIRM_POPUPS as __getKVPV1,getKVPV_CRAFT_LOW as __getKVPV2,getKVPV_MATERIAL_RESERVE as __getKVPV3,getKVPV_V1 as __getKVPV4} from '../api.mjs';
export function call_KVPV_CRAFT_LOW_start(...args){const target=globalThis["KVPV_CRAFT_LOW"];const fn=globalThis["KVPV_CRAFT_LOW"]?.["start"];if(typeof fn!=='function')throw Error("KVPV_CRAFT_LOW.start is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_CRAFT_LOW_stop(...args){const target=globalThis["KVPV_CRAFT_LOW"];const fn=globalThis["KVPV_CRAFT_LOW"]?.["stop"];if(typeof fn!=='function')throw Error("KVPV_CRAFT_LOW.stop is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_CRAFT_LOW_sync(...args){const target=globalThis["KVPV_CRAFT_LOW"];const fn=globalThis["KVPV_CRAFT_LOW"]?.["sync"];if(typeof fn!=='function')throw Error("KVPV_CRAFT_LOW.sync is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_CRAFT_LOW_status(...args){const target=globalThis["KVPV_CRAFT_LOW"];const fn=globalThis["KVPV_CRAFT_LOW"]?.["status"];if(typeof fn!=='function')throw Error("KVPV_CRAFT_LOW.status is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_CRAFT_LOW__handoff(...args){const target=globalThis["KVPV_CRAFT_LOW"];const fn=globalThis["KVPV_CRAFT_LOW"]?.["_handoff"];if(typeof fn!=='function')throw Error("KVPV_CRAFT_LOW._handoff is not available");return Reflect.apply(fn,target,args);}
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
export {__esmLocal0 as local_anonymous_8_1_0};
export {__esmLocal1 as local_worker_1};
export {__esmLocal2 as local_valid_2};
export {__esmLocal3 as local_scan_3};
export {__esmLocal4 as local_lowGear_4};
export {__esmLocal5 as local_anonymous_56_24_5};
export {__esmLocal6 as local_tick_6};
export {__esmLocal7 as local_anonymous_81_46_7};
export {__esmLocal8 as local_stop_8};
export {__esmLocal9 as local_anonymous_95_96_9};
export {__esmLocal10 as local_start_10};
export {__esmLocal11 as local_status_11};
export {__esmLocal12 as local__handoff_12};
export function initialize(){







(__captureESMFunction((__esmLocal0=(() => {

  'use strict';

  const W=window,old=__getKVPV2(),carry=old?._handoff?.();old?.stop?.();

  const actor=String(W.__KVPV_OWN_ACTOR_ID||'');

  const S={enabled:true,timer:null,automatic:new Set(carry?.actor===actor?carry.automatic:[]),

    reason:'waiting',lastError:'',ready:[],blocked:0};

  const worker=__captureESMFunction((__esmLocal1=(()=>__getKVPV0()??W.KVPV?.resources)),"worker");

  const valid=__captureESMFunction((__esmLocal2=(()=>actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED)),"valid");

  const gearTypes=new Set([5,8,10,11,12,13]);

  function scan(){

    const et=W._et??(typeof _et!=='undefined'?_et:null),c=W._ft?._Cji?.ins,b=W._Ba?._Ic?._aQ?.ins;

    const rows=W._Sa?.getCfg?.('item_compose'),out=[];S.blocked=0;

    if(!et?.getStageById||!et?.getTypeById||!c?.getCfgById||!b?.isBagInited||!Array.isArray(rows))return null;

    function lowGear(id){const tier=Number(et.getStageById(id));return gearTypes.has(Number(et.getTypeById(id)))&&Number.isSafeInteger(tier)&&tier>0&&tier<4;}
__esmLocal4=lowGear;


    for(const raw of rows){const id=Number(raw?.[0]);if(!Number.isSafeInteger(id)||id<=0)continue;

      const row=c.getCfgById(id);if(!Array.isArray(row)||Number(row[0])!==id||![807,808].includes(Number(row?.[3]?.[0])))continue;

      if(!lowGear(Number(row[1]))){S.blocked++;continue;}

      const source=[...(Array.isArray(row[5])?row[5]:[]),...(Array.isArray(row[6])?row[6]:[])];

      const need=new Map();let okay=source.length>0&&source.length<=8;

      for(const pair of source){const item=Number(pair?.[0]),count=Number(pair?.[1]);

        if(!Number.isSafeInteger(item)||item<=0||!Number.isSafeInteger(count)||count<1||count>8||!lowGear(item)){okay=false;break;}

        need.set(item,(need.get(item)||0)+count);

      }

      if(!okay){S.blocked++;continue;}

      if([...need].some(__captureESMFunction((__esmLocal5=(([item,count])=>{const owned=Number(b.getItemCountById?.(item));return !Number.isFinite(owned)||owned<count;})),"")))continue;

      out.push(id);if(out.length>=100)break;

    }

    return out;

  }
__esmLocal3=scan;


  function tick(){try{

    if(!S.enabled)return;if(__getKVPV3()?.active===true){stop();S.reason='materials_reserved_for_so_tai';return;}
    if(!valid()){stop();S.reason='actor_changed';return;}

    if(__getKVPV1()?.beforeTask?.()===true){S.reason='priority_popup';return;}

    const api=worker(),state=api?.status?.(),cfg=api?.config?.gearCraft;

    if(!cfg||!Array.isArray(cfg.approvedRecipeIds)){S.reason='waiting_resource_worker';return;}

    if(state?.busy||state?.pending){S.reason='waiting_existing_request';return;}

    const ids=scan();if(ids===null){S.reason='waiting_native_config_and_bag';return;}

    const manual=cfg.approvedRecipeIds.filter(__captureESMFunction((__esmLocal7=(id=>!S.automatic.has(Number(id)))),""));

    cfg.approvedRecipeIds=[...new Set([...manual,...ids])];S.automatic=new Set(ids);S.ready=ids;

    S.reason=ids.length?'low_tier_recipes_enabled':'waiting_low_tier_materials';

  }catch(e){S.lastError=String(e);S.reason='error';__getKVPV4()?.diagnostics?.record?.(e);}}
__esmLocal6=tick;


  function stop(){S.enabled=false;

    if(S.timer!==null)(__getKVPV4()?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;

    const cfg=worker()?.config?.gearCraft;

    if(Array.isArray(cfg?.approvedRecipeIds))cfg.approvedRecipeIds=cfg.approvedRecipeIds.filter(__captureESMFunction((__esmLocal9=(id=>!S.automatic.has(Number(id)))),""));

  }
__esmLocal8=stop;


  function start(){if(S.timer!==null)return;S.enabled=true;

    S.timer=(__getKVPV4()?.timers?.setInterval??W.setInterval)(tick,2000);tick();}
__esmLocal10=start;


  W.KVPV_CRAFT_LOW=Object.freeze({start,stop,sync:tick,

    status:__captureESMFunction((__esmLocal11=(()=>({enabled:S.enabled,actor,reason:S.reason,maximumAutoTier:3,manualFromTier:4,

      recipes:S.ready.slice(),blockedRecipes:S.blocked,lastError:S.lastError,allowKNB:false}))),"status"),

    _handoff:__captureESMFunction((__esmLocal12=(()=>({actor,automatic:[...S.automatic]}))),"_handoff")});

  start();

})),""))();


}
export {getKVPV_CRAFT_LOW} from '../api.mjs';
export const api=Object.freeze({
  get KVPV_CRAFT_LOW(){return globalThis.KVPV_CRAFT_LOW;},
});