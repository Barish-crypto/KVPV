import {getKVPV_BG_RESOURCES as __getKVPV0,getKVPV_CONFIRM_POPUPS as __getKVPV1,getKVPV_DAILY as __getKVPV2,getKVPV_MATERIAL_RESERVE as __getKVPV3,getKVPV_PARALLEL_ACTIONS as __getKVPV4,getKVPV_RED_DOT_MODULE as __getKVPV5,getKVPV_SOUL_STONE_FAST as __getKVPV6,getKVPV_UPGRADES as __getKVPV7,getKVPV_V1 as __getKVPV8} from '../api.mjs';
export function call_KVPV_SOUL_STONE_FAST_sync(...args){const target=globalThis["KVPV_SOUL_STONE_FAST"];const fn=globalThis["KVPV_SOUL_STONE_FAST"]?.["sync"];if(typeof fn!=='function')throw Error("KVPV_SOUL_STONE_FAST.sync is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_SOUL_STONE_FAST_stop(...args){const target=globalThis["KVPV_SOUL_STONE_FAST"];const fn=globalThis["KVPV_SOUL_STONE_FAST"]?.["stop"];if(typeof fn!=='function')throw Error("KVPV_SOUL_STONE_FAST.stop is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_SOUL_STONE_FAST_status(...args){const target=globalThis["KVPV_SOUL_STONE_FAST"];const fn=globalThis["KVPV_SOUL_STONE_FAST"]?.["status"];if(typeof fn!=='function')throw Error("KVPV_SOUL_STONE_FAST.status is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_SOUL_STONE_FAST__handoff(...args){const target=globalThis["KVPV_SOUL_STONE_FAST"];const fn=globalThis["KVPV_SOUL_STONE_FAST"]?.["_handoff"];if(typeof fn!=='function')throw Error("KVPV_SOUL_STONE_FAST._handoff is not available");return Reflect.apply(fn,target,args);}
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
export {__esmLocal0 as local_anonymous_4_1_0};
export {__esmLocal1 as local_owned_1};
export {__esmLocal2 as local_slots_2};
export {__esmLocal3 as local_signature_3};
export {__esmLocal4 as local_anonymous_22_89_4};
export {__esmLocal5 as local_tick_5};
export {__esmLocal6 as local_anonymous_66_66_6};
export {__esmLocal7 as local_anonymous_72_14_7};
export {__esmLocal8 as local_anonymous_84_91_8};
export {__esmLocal9 as local_anonymous_86_37_9};
export {__esmLocal10 as local_stop_10};
export {__esmLocal11 as local_status_11};
export {__esmLocal12 as local__handoff_12};
export function initialize(){

/* Dedicated soul-stone upgrade scanner. Native oneKeyHandler([part,2]); no purchase. */

(__captureESMFunction((__esmLocal0=(() => {

  'use strict';

  const W=window,old=__getKVPV6(),carry=old?._handoff?.();old?.stop?.('reload');

  if(__getKVPV5()?.ownsProgression?.())return;

  const actor=String(W.__KVPV_OWN_ACTOR_ID||''),same=carry?.actor===actor;

  const S={enabled:true,timer:null,pending:same?carry.pending:null,saved:same?carry.saved:undefined,

    workerDrained:false,workerSaved:same?carry.workerSaved:undefined,drained:same?carry.drained:false,requests:same?carry.requests:0,confirmed:same?carry.confirmed:0,reason:'waiting_core',error:''};

  const owned=__captureESMFunction((__esmLocal1=(()=>actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED)),"owned");

  const slots=__captureESMFunction((__esmLocal2=(()=>W._Ba?._ZE?._Qgt?.ins?.getValueByPos?.())),"slots");

  function signature(part){const s=slots();return s?JSON.stringify(Array.from({length:5},__captureESMFunction((__esmLocal4=((_,i)=>s.get(part*10+i)??null)),""))):null;}
__esmLocal3=signature;


  function tick(){try{
    if(__getKVPV3()?.active===true){if(__getKVPV7()?.config)__getKVPV7().config.daHon=false;S.reason='automatic_upgrades_disabled_by_user';stop('user_upgrade_disabled');return;}

    if(!S.enabled)return;
    if(!owned()){stop();return;}

    const cfg=__getKVPV7()?.config;if(!cfg)return;

    if(S.saved===undefined)S.saved=cfg.daHon===true;cfg.daHon=false;

    const worker=__getKVPV0(),wcfg=worker?.config?.enabled;

    if(wcfg){if(S.workerSaved===undefined)S.workerSaved=wcfg.soulStone===true;wcfg.soulStone=false;}

    if(S.pending){const value=W._Ba?._ZE?._Qgt?.ins?.otherValue?.[0],sig=S.pending.master?(Number.isFinite(Number(value))&&value!=null?String(value):null):signature(S.pending.part);

      if(sig!==null&&sig!==S.pending.before){S.pending=null;S.confirmed++;S.reason='server_slots_changed';}

      else{S.reason='waiting_ack_no_retry';return;}

    }

    if(!S.drained){if(__getKVPV4()?.legacyBusy?.()!==false){S.reason='waiting_old_request';return;}S.drained=true;}

    if(!S.workerDrained){if(worker?.status?.()?.pending?.kind==='soulStone'){S.reason='waiting_previous_stone_worker';return;}S.workerDrained=true;}

    if(Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)||__getKVPV1()?.beforeTask?.()===true)return;

    if(W._Ba?._rJ?._O$?.ins?.isDead===true)return;

    const q=__getKVPV2()?.quickState?.(),p=__getKVPV4();

    if(!p?.canDirectDuringPve?.(q)&&!(q?.running===true&&['rảnh','ranh'].includes(q.job)&&W._Ba?._$a?.SceneUtil?.isCommonScene===true&&W._Ba?._$a?._yo?.ins?.isInMission!==true)){S.reason='waiting_context';return;}

    if(W._Ba?._Xo?._Ko?.instance?.getRpKeyState?.(16)!==true){S.reason='no_red_dot';return;}

    const s=slots(),g=W._ft?._Qyn?.ins,bag=W._Ba?._Ic?._aQ?.ins,rpc=W._Ba?._ZE?._Jgt?.ins;

    const parts=W._Ba?._rJ?._O$?.ins?.equipsDic?.keys;

    if(!s||!Array.isArray(parts)||typeof rpc?.oneKeyHandler!=='function')return;

    const gems=(bag?.getItemsByBagType?.(2)??[]).slice(0,500).map(__captureESMFunction((__esmLocal6=(r=>{

      const id=Number(r?.[0]),c=g?.getCfgById?.(id);return c&&Number(bag?.getItemCountById?.(id))>0?

        {id,type:Number(c[3]),level:Number(c[5])}:null;

    })),"")).filter(__captureESMFunction((__esmLocal7=(c=>c&&Number.isSafeInteger(c.id)&&c.id>0&&Number.isFinite(c.type)&&c.type>0&&Number.isFinite(c.level)&&c.level>0)),""));

    for(const part of parts.slice(0,10).map(Number)){

      if(!Number.isInteger(part)||part<1||part>10)continue;

      // Match the native quick-button choice: insert, replace higher same type, upgrade.

      for(let i=0;i<5;i++){

        const id=s.get(part*10+i),row=id==null?null:g?.getCfgById?.(id);

        const insert=id==null&&(i!==0||W._Ba?._ZE?._Qgt?.ins?.vipIsOpen===true)&&gems.some(__captureESMFunction((__esmLocal8=(c=>i===0||c.type===i)),""));

        const replace=row&&gems.some(__captureESMFunction((__esmLocal9=(c=>c.type===Number(row[3])&&c.level>Number(row[5]))),""));

        if(!insert&&!replace)continue;

        const action=insert?0:1;S.pending={part,action,before:signature(part),at:Date.now()};S.requests++;

        S.reason=insert?'native_insert_sent':'native_replace_sent';rpc.oneKeyHandler([part,action]);return;

      }

      for(let i=0;i<5;i++){

        const id=s.get(part*10+i),row=id==null?null:g?.getCfgById?.(id),need=Number(row?.[6]),have=Number(bag?.getItemCountById?.(id));

        if(!row||!Number.isFinite(Number(row[5]))||!(Number(row[5])<Number(g.stoneMaxLv))||!Number.isSafeInteger(need)||need<=1||!Number.isFinite(have)||have+1<need)continue;

        S.pending={part,before:signature(part),at:Date.now()};S.requests++;S.reason='native_upgrade_sent';rpc.oneKeyHandler([part,2]);return;

      }

    }

    const value=W._Ba?._ZE?._Qgt?.ins?.otherValue,lv=Number(value?.[0]),max=Number(g?.maxLv),row=g?.getUpStoneByLev?.(lv),net=W._v??(typeof _v!=='undefined'?_v:null);

    if(Number.isSafeInteger(lv)&&lv>=0&&lv<max&&value?.[1]&&Number(row?.[1])>0&&Number.isFinite(Number(row[1]))&&Number(value[3])>=Number(row[1])&&typeof net?.ins?.send==='function'){

      S.pending={master:true,before:String(lv),at:Date.now()};S.requests++;S.reason='native_master_sent';net.ins.send('TBhu',null);return;

    }S.reason='no_upgrade_materials';

  }catch(e){S.error=String(e);S.reason='error_no_retry';}}
__esmLocal5=tick;


  function stop(reason='manual'){S.enabled=false;if(S.timer!==null)(__getKVPV8()?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;

    if(reason!=='reload'&&!S.pending&&owned()&&S.saved!==undefined&&__getKVPV7()?.config)__getKVPV7().config.daHon=S.saved;

    if(reason!=='reload'&&!S.pending&&owned()&&S.workerSaved!==undefined&&__getKVPV0()?.config?.enabled)__getKVPV0().config.enabled.soulStone=S.workerSaved;

  }
__esmLocal10=stop;


  W.KVPV_SOUL_STONE_FAST=Object.freeze({sync:tick,stop,status:__captureESMFunction((__esmLocal11=(()=>({enabled:S.enabled,pollMs:1,reason:S.reason,requests:S.requests,confirmed:S.confirmed,pending:S.pending,error:S.error,allowKNB:false}))),"status"),

    _handoff:__captureESMFunction((__esmLocal12=(()=>({actor,pending:S.pending,saved:S.saved,workerSaved:S.workerSaved,drained:S.drained,requests:S.requests,confirmed:S.confirmed}))),"_handoff")});

  S.timer=(__getKVPV8()?.timers?.setInterval??W.setInterval)(tick,50);tick();

})),""))();


}
export {getKVPV_SOUL_STONE_FAST} from '../api.mjs';
export const api=Object.freeze({
  get KVPV_SOUL_STONE_FAST(){return globalThis.KVPV_SOUL_STONE_FAST;},
});