import {getKVPV_BG_RESOURCES as __getKVPV0,getKVPV_CONFIRM_POPUPS as __getKVPV1,getKVPV_CRAFT_LOW as __getKVPV2,getKVPV_DAILY as __getKVPV3,getKVPV_RED_DOT as __getKVPV4,getKVPV_RED_NAVIGATOR as __getKVPV5,getKVPV_V1 as __getKVPV6} from '../api.mjs';
export function call_KVPV_RED_NAVIGATOR_sync(...args){const target=globalThis["KVPV_RED_NAVIGATOR"];const fn=globalThis["KVPV_RED_NAVIGATOR"]?.["sync"];if(typeof fn!=='function')throw Error("KVPV_RED_NAVIGATOR.sync is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_RED_NAVIGATOR_stop(...args){const target=globalThis["KVPV_RED_NAVIGATOR"];const fn=globalThis["KVPV_RED_NAVIGATOR"]?.["stop"];if(typeof fn!=='function')throw Error("KVPV_RED_NAVIGATOR.stop is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_RED_NAVIGATOR_hierarchyFor(...args){const target=globalThis["KVPV_RED_NAVIGATOR"];const fn=globalThis["KVPV_RED_NAVIGATOR"]?.["hierarchyFor"];if(typeof fn!=='function')throw Error("KVPV_RED_NAVIGATOR.hierarchyFor is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_RED_NAVIGATOR_openRedPanel(...args){const target=globalThis["KVPV_RED_NAVIGATOR"];const fn=globalThis["KVPV_RED_NAVIGATOR"]?.["openRedPanel"];if(typeof fn!=='function')throw Error("KVPV_RED_NAVIGATOR.openRedPanel is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_RED_NAVIGATOR_status(...args){const target=globalThis["KVPV_RED_NAVIGATOR"];const fn=globalThis["KVPV_RED_NAVIGATOR"]?.["status"];if(typeof fn!=='function')throw Error("KVPV_RED_NAVIGATOR.status is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_RED_NAVIGATOR__handoff(...args){const target=globalThis["KVPV_RED_NAVIGATOR"];const fn=globalThis["KVPV_RED_NAVIGATOR"]?.["_handoff"];if(typeof fn!=='function')throw Error("KVPV_RED_NAVIGATOR._handoff is not available");return Reflect.apply(fn,target,args);}
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
export {__esmLocal0 as local_anonymous_5_1_0};
export {__esmLocal1 as local_redActive_1};
export {__esmLocal2 as local_owned_2};
export {__esmLocal3 as local_model_3};
export {__esmLocal4 as local_signature_4};
export {__esmLocal5 as local_anonymous_20_87_5};
export {__esmLocal6 as local_strengthSignature_6};
export {__esmLocal7 as local_anonymous_22_139_7};
export {__esmLocal8 as local_findPanel_8};
export {__esmLocal9 as local_anonymous_26_76_9};
export {__esmLocal10 as local_anonymous_26_111_10};
export {__esmLocal11 as local_hierarchyFor_11};
export {__esmLocal12 as local_anonymous_44_40_12};
export {__esmLocal13 as local_openRedPanel_13};
export {__esmLocal14 as local_tick_14};
export {__esmLocal15 as local_anonymous_96_97_15};
export {__esmLocal16 as local_stop_16};
export {__esmLocal17 as local_status_17};
export {__esmLocal18 as local__handoff_18};
export function initialize(){

/* First verified red-dot route: Luyen Khi -> soul forge (action 192, red 156).
 * UI navigation/material selection only; existing resource worker owns the RPC. */

(__captureESMFunction((__esmLocal0=(() => {

  'use strict';

  const W=window,old=__getKVPV5(),c=old?._handoff?.();old?.stop?.();

  const actor=String(W.__KVPV_OWN_ACTOR_ID||''),same=c?.actor===actor;
  const redActive=__captureESMFunction((__esmLocal1=(id=>__getKVPV4()?.isActive?.(id)===true||W._Ba?._Xo?._Ko?.instance?.getRpKeyState?.(id)===true)),"redActive");

  const S={timer:null,enabled:true,opened:same?c.opened:null,pending:same?c.pending:null,confirmed:same?c.confirmed:0,reason:'waiting',error:'',hierarchy:null};

  const owned=__captureESMFunction((__esmLocal2=(()=>actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED)),"owned");

  const model=__captureESMFunction((__esmLocal3=(()=>W._Ba?._eW?._pEt?.inst)),"model");

  const signature=__captureESMFunction((__esmLocal4=(()=>Array.isArray(model()?.zhList)?JSON.stringify(model().zhList.map(__captureESMFunction((__esmLocal5=(r=>r?[r[0],r[1],r[2]]:null)),""))):null)),"signature");

  const strengthSignature=__captureESMFunction((__esmLocal6=(()=>{const d=W._Ba?._Agt?._Rgt?.ins?.partLev;return Array.isArray(d?.keys)?JSON.stringify(d.keys.slice(0,10).map(__captureESMFunction((__esmLocal7=(k=>[k,d.get(k)])),""))):null;})),"strengthSignature");

  function findPanel(ui){const Type=W._Ba?._eW?._NTi;if(typeof Type!=='function')return null;

    const queue=Object.keys(ui?.openTable??ui?._H$t??{}).slice(0,80).filter(__captureESMFunction((__esmLocal9=(id=>ui.isOpened?.(Number(id)))),"")).map(__captureESMFunction((__esmLocal10=(id=>ui.getPanelById?.(Number(id)))),"")),seen=new Set();

    for(let n=0;queue.length&&n<240;n++){const p=queue.shift();if(!p||seen.has(p)||p.visible===false||p.destroyed)continue;seen.add(p);

      if(p instanceof Type&&p.parent)return p;

      const children=p._children??p._childs;if(Array.isArray(children))queue.push(...children.slice(0,40));

    }return null;

  }
__esmLocal8=findPanel;


  function hierarchyFor(redId){
    const tabs=W._Ba?._xf?.BotmTabData?.instance,panels=tabs?.getPanelIdArr?.();
    if(!Array.isArray(panels))return null;
    for(let order=0;order<panels.length;order++){
      const panelId=panels[order];
      const keys=tabs.getRpsByPanelId?.(panelId),row=tabs.getTabDataByPanelId?.(panelId);
      if(Array.isArray(keys)&&keys.some(__captureESMFunction((__esmLocal12=(id=>Number(id)===Number(redId))),""))&&Number(row?.[3])>0)
        return {redId:Number(redId),panelId:Number(panelId),enterId:Number(row[3]),order};
    }
    return null;
  }
__esmLocal11=hierarchyFor;

  function openRedPanel(redId){
    const route=hierarchyFor(redId),nav=W._Ba?._xf?._Kf?.instance;
    if(!route||typeof nav?.openPanelByPanelId!=='function')return null;
    nav.openPanelByPanelId(route.panelId);S.hierarchy=route;return route;
  }
__esmLocal13=openRedPanel;

  function tick(){try{

    if(!S.enabled)return;if(!owned()){stop();return;}

    const sig=signature();if(S.pending?.kind==='gearCraft'){

      const verified=Number(__getKVPV0()?.status?.()?.stats?.gearCraft?.verified);

      if(Number.isFinite(verified)&&verified>S.pending.verified){S.pending=null;S.confirmed++;}else{S.reason='waiting_craft_worker_verification';return;}

    }

    if(S.pending){const current=S.pending.kind==='strength'?strengthSignature():sig,before=S.pending.kind==='strength'?S.pending.before:S.pending;

      if(current!==null&&current!==before){S.pending=null;S.confirmed++;}else{S.reason='waiting_existing_worker_ack';return;}}

    if(Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)){S.reason='user_using_ui';return;}

    const q=__getKVPV3()?.quickState?.(),worker=__getKVPV0(),state=worker?.status?.();

    if(!worker||state?.running!==true||state.active!==true){S.reason='worker_disabled_or_halted';return;}

    if(state.busy){S.reason='existing_worker_busy';return;}

    if(q?.running!==true||!['rảnh','ranh'].includes(q.job)||W._Ba?._$a?.SceneUtil?.isCommonScene!==true||W._Ba?._$a?._yo?.ins?.isInMission===true||W._Ba?._rJ?._O$?.ins?.isDead===true||W.KVPV?.core?.scene?.status?.()?.owner){S.reason='defer_ui_until_idle';return;}

    if(__getKVPV1()?.beforeTask?.()===true)return;

    if(worker.config?.enabled?.gearCraft===true&&!state.halted?.gearCraft&&redActive(249)){

      __getKVPV2()?.sync?.();

      const approved=worker.config?.gearCraft?.approvedRecipeIds;

      const candidate=Array.isArray(approved)&&approved.length?worker.preview?.()?.gearCraft:null;

      if(candidate?.recipe&&approved.includes(candidate.recipe)){

        const row=W._ft?._Cji?.ins?.getCfgById?.(candidate.recipe),category=Number(row?.[3]?.[0]),ui=W._ft?._Y4n?.ins,Type=W._Ba?._k6?._Rji;

        if([807,808].includes(category)&&typeof Type==='function'){

          const key='craft/'+candidate.recipe+'/'+JSON.stringify((candidate.materialIds??[]).map(__captureESMFunction((__esmLocal15=(id=>W._Ba?._Ic?._aQ?.ins?.getItemCountById?.(id))),"")));

          if(ui?.isOpened?.(413)!==true){const cfg=ui?.getWindowConfigById?.(413);

            if(cfg?.[2]!==Type||Number(cfg?.[5])!==249){S.reason='unverified_craft_route';return;}

            if(S.opened!==key){S.opened=key;if(!openRedPanel(249))ui.openByActionId?.(249);}S.reason='opening_craft_branch';return;

          }

          const panel=ui.getPanelById?.(413),m=W._Ba?._k6?._rRt?.ins;

          if(!(panel instanceof Type)||!panel.parent||panel.visible===false){S.reason='waiting_craft_panel';return;}

          if(Number(m?.tClsNow)!==category){

            const native=Type.prototype.startShowUIByType;

            if(panel.startShowUIByType!==native||typeof native!=='function'){S.reason='unverified_craft_selector';return;}

            native.call(panel,category===807?10:11);S.reason='select_craft_subcategory';return;

          }

          const verified=Number(state.stats?.gearCraft?.verified??0);worker.tick?.();

          if(worker.status?.()?.pending?.kind==='gearCraft'){S.pending={kind:'gearCraft',verified};S.reason='craft_worker_sent';}else S.reason='waiting_worker_turn';return;

        }

      }

    }

  }catch(e){S.error=String(e);S.reason='error';}}
__esmLocal14=tick;


  function stop(){S.enabled=false;if(S.timer!==null)(__getKVPV6()?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;}
__esmLocal16=stop;


  W.KVPV_RED_NAVIGATOR=Object.freeze({sync:tick,stop,hierarchyFor,openRedPanel,status:__captureESMFunction((__esmLocal17=(()=>({enabled:S.enabled,route:'native-panel-chain-parent-child; action249/gearCraft;red15/action17/strength;red16/action18/soulStone;red156/action192/soulForge',hierarchy:S.hierarchy,reason:S.reason,pending:!!S.pending,confirmed:S.confirmed,error:S.error}))),"status"),

    _handoff:__captureESMFunction((__esmLocal18=(()=>({actor,opened:S.opened,pending:S.pending,confirmed:S.confirmed}))),"_handoff")});

  tick();

})),""))();


}
export {getKVPV_RED_NAVIGATOR} from '../api.mjs';
export const api=Object.freeze({
  get KVPV_RED_NAVIGATOR(){return globalThis.KVPV_RED_NAVIGATOR;},
});