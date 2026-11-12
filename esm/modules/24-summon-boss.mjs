import {getKVPV_BEAST_ISLAND as __getKVPV0,getKVPV_CONFIRM_POPUPS as __getKVPV1,getKVPV_DAILY as __getKVPV2,getKVPV_ENTRY_POLICY as __getKVPV3,getKVPV_EVENT_PRIORITY as __getKVPV4,getKVPV_HITRUN1 as __getKVPV5,getKVPV_QUEST_PRIORITY as __getKVPV6,getKVPV_SUMMON_BOSS as __getKVPV7,getKVPV_V1 as __getKVPV8} from '../api.mjs';
export function call_KVPV_SUMMON_BOSS_start(...args){const target=globalThis["KVPV_SUMMON_BOSS"];const fn=globalThis["KVPV_SUMMON_BOSS"]?.["start"];if(typeof fn!=='function')throw Error("KVPV_SUMMON_BOSS.start is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_SUMMON_BOSS_stop(...args){const target=globalThis["KVPV_SUMMON_BOSS"];const fn=globalThis["KVPV_SUMMON_BOSS"]?.["stop"];if(typeof fn!=='function')throw Error("KVPV_SUMMON_BOSS.stop is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_SUMMON_BOSS_sync(...args){const target=globalThis["KVPV_SUMMON_BOSS"];const fn=globalThis["KVPV_SUMMON_BOSS"]?.["sync"];if(typeof fn!=='function')throw Error("KVPV_SUMMON_BOSS.sync is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_SUMMON_BOSS_status(...args){const target=globalThis["KVPV_SUMMON_BOSS"];const fn=globalThis["KVPV_SUMMON_BOSS"]?.["status"];if(typeof fn!=='function')throw Error("KVPV_SUMMON_BOSS.status is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_SUMMON_BOSS_setMode(...args){const target=globalThis["KVPV_SUMMON_BOSS"];const fn=globalThis["KVPV_SUMMON_BOSS"]?.["setMode"];if(typeof fn!=='function')throw Error("KVPV_SUMMON_BOSS.setMode is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_SUMMON_BOSS__handoff(...args){const target=globalThis["KVPV_SUMMON_BOSS"];const fn=globalThis["KVPV_SUMMON_BOSS"]?.["_handoff"];if(typeof fn!=='function')throw Error("KVPV_SUMMON_BOSS._handoff is not available");return Reflect.apply(fn,target,args);}
function __captureESMFunction(fn,name){
  if(fn.name!==name)Object.defineProperty(fn,"name",{value:name,configurable:true});
  return fn;
}
function __captureESMMethod(receiver,key,kind){
  let owner=receiver;
  while(owner!==null&&(typeof owner==="object"||typeof owner==="function")&&!Object.prototype.hasOwnProperty.call(owner,key))owner=Object.getPrototypeOf(owner);
  if(owner===null)return undefined;
  const descriptor=Object.getOwnPropertyDescriptor(owner,key);
  return kind==="get"?descriptor.get:kind==="set"?descriptor.set:descriptor.value;
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
export {__esmLocal0 as local_anonymous_7_1_0};
export {__esmLocal1 as local_model_1};
export {__esmLocal2 as local_ui_2};
export {__esmLocal3 as local_arb_3};
export {__esmLocal4 as local_common_4};
export {__esmLocal5 as local_inside_5};
export {__esmLocal6 as local_owned_6};
export {__esmLocal7 as local_manual_7};
export {__esmLocal8 as local_tickets_8};
export {__esmLocal9 as local_count_9};
export {__esmLocal10 as local_release_10};
export {__esmLocal11 as local_disableAuto_11};
export {__esmLocal12 as local_reserve_12};
export {__esmLocal13 as local_panel_13};
export {__esmLocal14 as local_tick_14};
export {__esmLocal15 as local_stop_15};
export {__esmLocal16 as local_start_16};
export {__esmLocal17 as local_status_17};
export {__esmLocal18 as local_setMode_18};
export {__esmLocal19 as local__handoff_19};
export function initialize(){






(__captureESMFunction((__esmLocal0=(() => {

  'use strict';

  const W=window,old=__getKVPV7(),carry=old?._handoff?.();

  old?.stop?.();

  const actor=String(W.__KVPV_OWN_ACTOR_ID||''),tag='summon-boss';

  const S={enabled:true,timer:null,lease:false,stageAuto:null,reason:'starting',lastError:'',

    pending:carry?.actor===actor?carry.pending:null,mode:carry?.actor===actor?carry.mode:'adaptive',

    nextOpen:0,requests:carry?.actor===actor?carry.requests:0,autoOwned:false};

  const model=__captureESMFunction((__esmLocal1=(()=>W._Ba?._F_t?._E_t?.ins)),"model");

  const ui=__captureESMFunction((__esmLocal2=(()=>W._ft?._Y4n?.ins)),"ui");

  const arb=__captureESMFunction((__esmLocal3=(()=>W.KVPV?.core?.scene)),"arb");

  const common=__captureESMFunction((__esmLocal4=(()=>W._Ba?._$a?.SceneUtil?.isCommonScene===true&&W._Ba?._$a?._yo?.ins?.isInMission!==true)),"common");

  const inside=__captureESMFunction((__esmLocal5=(()=>Number(W._ft?._po?.ins?.getCfgById?.(W._C?._Mn?._Cn?.currentID)?.[7])===45)),"inside");

  const owned=__captureESMFunction((__esmLocal6=(()=>actor&&String(W._Ba?._rJ?._O$?.ins?.actorId??'')===actor&&!W.__KVPV_UNIVERSAL_HALTED)),"owned");

  const manual=__captureESMFunction((__esmLocal7=(()=>S.mode==='manual'||S.mode==='adaptive'&&__getKVPV0()?.status?.().bossLevel===500)),"manual");

  function tickets(){

    const m=model(),bag=W._Ba?._Ic?._aQ?.ins;

    const count=__captureESMFunction((__esmLocal9=(id=>id>0?Number(bag?.getItemCountById?.(id)):NaN)),"count");

    const normal=count(m?.comItemId),epic=count(m?.legendItemId);

    return {normal,epic,known:Number.isFinite(normal)&&normal>=0&&Number.isFinite(epic)&&epic>=0};

  }
__esmLocal8=tickets;


  function release(){

    if(S.lease&&arb()?.status?.().tag===tag)arb().release('combat');S.lease=false;

    const stage=W._Ba?._Co?._Mo?.ins;

    if(owned()&&S.stageAuto===true&&stage?.auto===false&&!__getKVPV4()?.hold?.())stage.auto=true;

    S.stageAuto=null;

  }
__esmLocal10=release;


  function disableAuto(){

    if(S.autoOwned&&owned()){panel()?._ngt?.();if(model())model().isAutoCall=false;}

    S.autoOwned=false;

  }
__esmLocal11=disableAuto;


  function reserve(){

    const a=arb(),l=a?.status?.();

    if(!a||l?.owner&&l.tag!==tag||__getKVPV5()?.status?.(false)?.running)return false;

    const job=__getKVPV2()?.quickState?.()?.job;

    if(job&&job!=='rảnh'&&job!=='ranh')return false;

    const stage=W._Ba?._Co?._Mo?.ins;

    if(S.stageAuto===null)S.stageAuto=stage?.auto===true;

    if(stage?.auto===true)stage.auto=false;

    if(!a.acquire('combat',tag)){release();return false;}

    S.lease=true;return true;

  }
__esmLocal12=reserve;


  function panel(){const u=ui(),p=u?.getPanelById?.(952),Type=W._Ba?._F_t?._eUs;

    return u?.isOpened?.(952)&&typeof Type==='function'&&p instanceof Type&&p.parent&&p.visible!==false?p:null;}
__esmLocal13=panel;


  function tick(){if(__getKVPV3()?.manual===true)return;try{

    if(!S.enabled)return;

    if(!owned()){stop();return;}

    if(__getKVPV1()?.beforeTask?.()===true){S.reason='priority_popup';return;}

    const t=tickets(),m=model();

    if(!t.known){S.reason='waiting_ticket_data';return;}

    if(S.lease)arb()?.renew?.('combat');

    if(S.pending){

      if(inside()){S.pending.entered=true;S.reason='fighting_summoned_boss';return;}

      

      if(common()&&S.pending.entered){S.pending=null;S.reason='returned_from_boss';}

      else {S.reason=Date.now()-S.pending.at>30000?'waiting_summon_ack_no_retry':'waiting_summon_entry';return;}

    }

    if(!common()){S.reason=inside()?'native_boss_fight':'other_activity';return;}

    if(__getKVPV6()?.blocks?.('summon_boss')){disableAuto();release();S.reason='priority_quest';return;}

    if(!t.normal&&!t.epic){disableAuto();release();S.reason='tickets_exhausted';return;}

    if(!reserve()){S.reason='scene_reserved';return;}

    const p=panel();

    if(!p){if(Date.now()>=S.nextOpen){S.nextOpen=Date.now()+5000;ui()?.open?.(952);}S.reason='opening_summon_panel';return;}

    if(p.gotoBtn?.disabled||p.gotoBtn?.gray){disableAuto();release();S.reason='native_summon_locked';return;}

    const wantEpic=t.normal<1;

    if(p.curCheckBox?.selected!==wantEpic){

      const select=wantEpic?p._nUs:p._sUs;

      if(typeof select!=='function'){S.reason='missing_native_ticket_selector';return;}

      select.call(p);

    }

    if(p.curCheckBox?.selected!==wantEpic){S.reason='waiting_ticket_selection';return;}

    const useManual=manual()||p.autoCheckBox?.visible===false||p.autoCheckBox?.disabled===true;

    if(useManual){

      

      if(m.isAutoCall){if(typeof p._ngt!=='function'){S.reason='waiting_native_auto_stop';return;}

        p._ngt();m.isAutoCall=false;S.autoOwned=false;}

      if(typeof p._hQn!=='function'){S.reason='missing_native_summon_button';return;}

      S.pending={at:Date.now(),entered:false,normal:t.normal,epic:t.epic};S.requests++;

      S.reason='manual_summon_sent';p._hQn();

    }else{

      if(!m.isAutoCall){if(typeof p._cQn!=='function'){S.reason='missing_native_auto_checkbox';return;}

        S.autoOwned=true;p._cQn();}

      S.autoOwned=true;S.reason='native_auto_summon';

    }

  }catch(e){S.lastError=String(e);S.reason='error';__getKVPV8()?.diagnostics?.record?.(e);}}
__esmLocal14=tick;


  function stop(){S.enabled=false;

    if(S.timer!==null)(__getKVPV8()?.timers?.clearInterval??W.clearInterval)(S.timer);

    S.timer=null;disableAuto();release();}
__esmLocal15=stop;


  function start(){if(S.timer!==null)return;S.enabled=true;

    S.timer=(__getKVPV8()?.timers?.setInterval??W.setInterval)(tick,1000);tick();}
__esmLocal16=start;


  W.KVPV_SUMMON_BOSS=Object.freeze({start,stop,sync:tick,

    status:__captureESMFunction((__esmLocal17=(()=>({enabled:S.enabled,actor,mode:S.mode,manual:manual(),reason:S.reason,pending:S.pending?{...S.pending}:null,

      tickets:tickets(),requests:S.requests,lastError:S.lastError,allowKNB:false}))),"status"),

    setMode(value){
__esmLocal18=__captureESMMethod(this,"setMode","init");
if(!['adaptive','auto','manual'].includes(value))throw Error('mode: adaptive / auto / manual');

      disableAuto();S.mode=value;return this.status();},

    _handoff:__captureESMFunction((__esmLocal19=(()=>({actor,pending:S.pending?{...S.pending}:null,mode:S.mode,requests:S.requests}))),"_handoff")});

  start();

})),""))();


}
export {getKVPV_SUMMON_BOSS} from '../api.mjs';
export const api=Object.freeze({
  get KVPV_SUMMON_BOSS(){return globalThis.KVPV_SUMMON_BOSS;},
});