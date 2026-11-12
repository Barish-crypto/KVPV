import {getKVPV_CONFIRM_POPUPS as __getKVPV0,getKVPV_DAILY as __getKVPV1,getKVPV_FABAO_FAST as __getKVPV2,getKVPV_HITRUN1 as __getKVPV3,getKVPV_MATERIAL_RESERVE as __getKVPV4,getKVPV_UPGRADES as __getKVPV5,getKVPV_V1 as __getKVPV6} from '../api.mjs';
export function call_KVPV_FABAO_FAST_start(...args){const target=globalThis["KVPV_FABAO_FAST"];const fn=globalThis["KVPV_FABAO_FAST"]?.["start"];if(typeof fn!=='function')throw Error("KVPV_FABAO_FAST.start is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_FABAO_FAST_stop(...args){const target=globalThis["KVPV_FABAO_FAST"];const fn=globalThis["KVPV_FABAO_FAST"]?.["stop"];if(typeof fn!=='function')throw Error("KVPV_FABAO_FAST.stop is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_FABAO_FAST_sync(...args){const target=globalThis["KVPV_FABAO_FAST"];const fn=globalThis["KVPV_FABAO_FAST"]?.["sync"];if(typeof fn!=='function')throw Error("KVPV_FABAO_FAST.sync is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_FABAO_FAST_inspect(...args){const target=globalThis["KVPV_FABAO_FAST"];const fn=globalThis["KVPV_FABAO_FAST"]?.["inspect"];if(typeof fn!=='function')throw Error("KVPV_FABAO_FAST.inspect is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_FABAO_FAST_status(...args){const target=globalThis["KVPV_FABAO_FAST"];const fn=globalThis["KVPV_FABAO_FAST"]?.["status"];if(typeof fn!=='function')throw Error("KVPV_FABAO_FAST.status is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_FABAO_FAST__handoff(...args){const target=globalThis["KVPV_FABAO_FAST"];const fn=globalThis["KVPV_FABAO_FAST"]?.["_handoff"];if(typeof fn!=='function')throw Error("KVPV_FABAO_FAST._handoff is not available");return Reflect.apply(fn,target,args);}
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
export {__esmLocal0 as local_anonymous_7_1_0};
export {__esmLocal1 as local_model_1};
export {__esmLocal2 as local_ui_2};
export {__esmLocal3 as local_owned_3};
export {__esmLocal4 as local_items_4};
export {__esmLocal5 as local_anonymous_53_34_5};
export {__esmLocal6 as local_panel_6};
export {__esmLocal7 as local_closeOwnPanel_7};
export {__esmLocal8 as local_idle_8};
export {__esmLocal9 as local_tick_9};
export {__esmLocal10 as local_anonymous_81_57_10};
export {__esmLocal11 as local_anonymous_87_32_11};
export {__esmLocal12 as local_anonymous_97_30_12};
export {__esmLocal13 as local_anonymous_117_18_13};
export {__esmLocal14 as local_anonymous_119_45_14};
export {__esmLocal15 as local_anonymous_133_27_15};
export {__esmLocal16 as local_anonymous_139_95_16};
export {__esmLocal17 as local_stop_17};
export {__esmLocal18 as local_start_18};
export {__esmLocal19 as local_status_19};
export {__esmLocal20 as local_anonymous_155_71_20};
export {__esmLocal21 as local__handoff_21};
export function initialize(){






(__captureESMFunction((__esmLocal0=(() => {

  'use strict';

  const W=window,old=__getKVPV2(),carry=old?._handoff?.();old?.stop?.();

  const actor=String(W.__KVPV_OWN_ACTOR_ID||''),same=carry?.actor===actor;

  const S={enabled:true,timer:null,pending:same?carry.pending:null,lastSent:same?carry.lastSent:null,

    ownedPanel:same?carry.ownedPanel:false,nextOpen:0,requests:same?carry.requests:0,

    confirmed:same?carry.confirmed:0,reason:'waiting',lastError:''};

  const model=__captureESMFunction((__esmLocal1=(()=>W._Ba?._rnt?._vnt?.ins)),"model"),ui=__captureESMFunction((__esmLocal2=(()=>W._ft?._Y4n?.ins)),"ui");

  const owned=__captureESMFunction((__esmLocal3=(()=>!!actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED)),"owned");

  function items(){const m=model(),c=W._ft?._s$?.ins,b=W._Ba?._Ic?._aQ?.ins,all=new Map();

    for(let group=0;group<4;group++){

      const rows=m?.getAmuletRefineQuaArr?.(group);if(!Array.isArray(rows))continue;

      for(const raw of rows){const id=Number(raw?.[0]),level=Number(m?.getFaBaoLv?.(id));

        if(!Number.isSafeInteger(id)||id<=0||!Number.isSafeInteger(level)||level<0)continue;

        const row=c?.getCfgByIdLevel?.(id,level),max=Number(c?.getMaxLvById?.(id));

        const fragment=Number(row?.[4]),cost=Number(row?.[3]?.[1]);

        const count=Number(b?.getItemCountById?.(id)),parts=fragment>0?Number(b?.getItemCountById?.(fragment)):NaN;

        const total=count+parts;

        const eligible=level>0&&Number.isFinite(max)&&level<max&&Number.isSafeInteger(cost)&&cost>0&&

          Number.isFinite(count)&&count>=0&&Number.isFinite(parts)&&parts>=0&&total>=cost;

        all.set(id,{id,level,group,max,cost,total,eligible});

      }

    }

    return [...all.values()].sort(__captureESMFunction((__esmLocal5=((a,b)=>a.id-b.id)),""));

  }
__esmLocal4=items;


  function panel(){const p=ui()?.getPanelById?.(46),Type=W._Ba?._rnt?._GDn;

    return typeof Type==='function'&&p instanceof Type&&ui()?.isOpened?.(46)&&p.parent&&p.visible!==false?p:null;}
__esmLocal6=panel;


  function closeOwnPanel(){if(S.ownedPanel&&owned()&&panel())ui()?.close?.(46);S.ownedPanel=false;}
__esmLocal7=closeOwnPanel;


  function idle(){if(Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0))return false;const q=__getKVPV1()?.quickState?.(),lease=W.KVPV?.core?.scene?.status?.();

    return W._Ba?._$a?.SceneUtil?.isCommonScene===true&&W._Ba?._$a?._yo?.ins?.isInMission!==true&&

      W._Ba?._rJ?._O$?.ins?.isDead!==true&&(!q?.job||['rảnh','ranh'].includes(q.job))&&!lease?.owner&&

      !__getKVPV3()?.status?.(false)?.running&&!__getKVPV5()?.busy?.();

  }
__esmLocal8=idle;


  function tick(){try{
    if(__getKVPV4()?.active===true){S.reason='automatic_upgrades_disabled_by_user';stop();return;}

    if(!S.enabled)return;// Explicit Fa Bao opt-in; native panel must still validate sufficient owned materials.
    if(!owned()){stop();return;}

    if(__getKVPV0()?.beforeTask?.()===true){S.reason='priority_popup';return;}

    const list=items(),signature=JSON.stringify(list.map(__captureESMFunction((__esmLocal10=(x=>[x.id,x.level,x.total])),"")));

    if(S.pending){

      const reply=model()?.RefineAmuletRep,newReply=reply&&reply!==S.pending.reply;

      const increased=list.some(__captureESMFunction((__esmLocal11=(x=>x.level>Number(S.pending.levels[x.id]??x.level))),""));

      if(newReply&&Number(reply[0])!==0){S.reason='server_rejected';S.lastError='Phap Bao result '+reply[0];return;}

      if(newReply&&Number(reply[0])===0&&increased){S.confirmed++;S.pending=null;S.reason='upgrade_confirmed';}

      else {S.reason=Date.now()-S.pending.at>15000?'waiting_upgrade_ack_no_retry':'waiting_upgrade_ack';return;}

    }

    const candidate=list.find(__captureESMFunction((__esmLocal12=(x=>x.eligible)),""));

    if(!candidate){S.reason='no_owned_materials_or_max_level';closeOwnPanel();return;}

    if(!idle()){S.reason='other_activity';return;}

    if(S.lastSent===signature){S.reason='already_requested_this_state';return;}

    let p=panel();

    if(!p){if(Date.now()>=S.nextOpen){S.nextOpen=Date.now()+5000;

        if(ui()?.isOpened?.(46)!==true){S.ownedPanel=true;ui()?.open?.(46);}}

      S.reason='opening_fabao';return;}

    if(!p._FSn){S.reason='waiting_native_tabs';return;}

    if(Number(p._FSn.selIdx)!==candidate.group){p._FSn.selIdx=candidate.group;S.reason='selecting_fabao_group';return;}

    if(!list.some(__captureESMFunction((__esmLocal13=(x=>x.id===Number(p._IDn)&&x.eligible)),""))){

      const index=p._wgn?.array?.findIndex?.(__captureESMFunction((__esmLocal14=(row=>Number(row?.[0]?.[0])===candidate.id)),""));

      if(Number.isInteger(index)&&index>=0)p._wgn.selectedIndex=index;

      S.reason='selecting_upgradeable_fabao';return;

    }

    const native=W._Ba?._rnt?._GDn?.prototype?._BDn;

    if(p._BDn!==native||typeof native!=='function'){S.reason='native_handler_changed';return;}

    

    const chosen=list.find(__captureESMFunction((__esmLocal15=(x=>x.id===Number(p._IDn))),""));

    if(!chosen?.eligible||p._EDn!==false||p.allupBtn?.visible===false||p.allupBtn?.disabled||p.allupBtn?.gray||

      Number(p._kwn)!==chosen.cost||Number(p._Twn)<chosen.cost){S.reason='waiting_native_upgrade_selection';return;}

    S.pending={at:Date.now(),reply:model()?.RefineAmuletRep,levels:Object.fromEntries(list.map(__captureESMFunction((__esmLocal16=(x=>[x.id,x.level])),"")))};

    S.lastSent=signature;S.requests++;S.reason='quick_upgrade_sent';native.call(p);

  }catch(e){S.lastError=String(e);S.reason='error';__getKVPV6()?.diagnostics?.record?.(e);}}
__esmLocal9=tick;


  function stop(){S.enabled=false;if(S.timer!==null)(__getKVPV6()?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;}
__esmLocal17=stop;


  function start(){if(__getKVPV4()?.active===true){S.enabled=false;S.reason='automatic_upgrades_disabled_by_user';return false;}if(S.timer!==null)return;S.enabled=true;

    S.timer=(__getKVPV6()?.timers?.setInterval??W.setInterval)(tick,350);tick();}
__esmLocal18=start;


  W.KVPV_FABAO_FAST=Object.freeze({start,stop,sync:tick,inspect:items,

    status:__captureESMFunction((__esmLocal19=(()=>({enabled:S.enabled,actor,reason:S.reason,requests:S.requests,confirmed:S.confirmed,

      pending:S.pending?{at:S.pending.at}:null,eligible:items().filter(__captureESMFunction((__esmLocal20=(x=>x.eligible)),"")),lastError:S.lastError,allowKNB:false}))),"status"),

    _handoff:__captureESMFunction((__esmLocal21=(()=>({actor,pending:S.pending,lastSent:S.lastSent,ownedPanel:S.ownedPanel,requests:S.requests,confirmed:S.confirmed}))),"_handoff")});

  start();

})),""))();


}
export {getKVPV_FABAO_FAST} from '../api.mjs';
export const api=Object.freeze({
  get KVPV_FABAO_FAST(){return globalThis.KVPV_FABAO_FAST;},
});