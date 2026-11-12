import {getKVPV_CONFIRM_POPUPS as __getKVPV0,getKVPV_V1 as __getKVPV1} from '../api.mjs';
export function call_KVPV_CONFIRM_POPUPS_start(...args){const target=globalThis["KVPV_CONFIRM_POPUPS"];const fn=globalThis["KVPV_CONFIRM_POPUPS"]?.["start"];if(typeof fn!=='function')throw Error("KVPV_CONFIRM_POPUPS.start is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_CONFIRM_POPUPS_stop(...args){const target=globalThis["KVPV_CONFIRM_POPUPS"];const fn=globalThis["KVPV_CONFIRM_POPUPS"]?.["stop"];if(typeof fn!=='function')throw Error("KVPV_CONFIRM_POPUPS.stop is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_CONFIRM_POPUPS_status(...args){const target=globalThis["KVPV_CONFIRM_POPUPS"];const fn=globalThis["KVPV_CONFIRM_POPUPS"]?.["status"];if(typeof fn!=='function')throw Error("KVPV_CONFIRM_POPUPS.status is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_CONFIRM_POPUPS_sync(...args){const target=globalThis["KVPV_CONFIRM_POPUPS"];const fn=globalThis["KVPV_CONFIRM_POPUPS"]?.["sync"];if(typeof fn!=='function')throw Error("KVPV_CONFIRM_POPUPS.sync is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_CONFIRM_POPUPS_beforeTask(...args){const target=globalThis["KVPV_CONFIRM_POPUPS"];const fn=globalThis["KVPV_CONFIRM_POPUPS"]?.["beforeTask"];if(typeof fn!=='function')throw Error("KVPV_CONFIRM_POPUPS.beforeTask is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_CONFIRM_POPUPS_setAll(...args){const target=globalThis["KVPV_CONFIRM_POPUPS"];const fn=globalThis["KVPV_CONFIRM_POPUPS"]?.["setAll"];if(typeof fn!=='function')throw Error("KVPV_CONFIRM_POPUPS.setAll is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_CONFIRM_POPUPS__handoff(...args){const target=globalThis["KVPV_CONFIRM_POPUPS"];const fn=globalThis["KVPV_CONFIRM_POPUPS"]?.["_handoff"];if(typeof fn!=='function')throw Error("KVPV_CONFIRM_POPUPS._handoff is not available");return Reflect.apply(fn,target,args);}
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
let __esmLocal20;
export {__esmLocal0 as local_anonymous_8_1_0};
export {__esmLocal1 as local_ui_1};
export {__esmLocal2 as local_owned_2};
export {__esmLocal3 as local_norm_3};
export {__esmLocal4 as local_agree_4};
export {__esmLocal5 as local_detach_5};
export {__esmLocal6 as local_schedule_6};
export {__esmLocal7 as local_anonymous_32_111_7};
export {__esmLocal8 as local_attach_8};
export {__esmLocal9 as local_fn_9};
export {__esmLocal10 as local_tick_10};
export {__esmLocal11 as local_anonymous_70_69_11};
export {__esmLocal12 as local_anonymous_80_33_12};
export {__esmLocal13 as local_beforeTask_13};
export {__esmLocal14 as local_status_14};
export {__esmLocal15 as local_anonymous_196_64_15};
export {__esmLocal16 as local_anonymous_196_99_16};
export {__esmLocal17 as local_stop_17};
export {__esmLocal18 as local_start_18};
export {__esmLocal19 as local_setAll_19};
export {__esmLocal20 as local__handoff_20};
export function initialize(){







(__captureESMFunction((__esmLocal0=(() => {

  'use strict';

  const W=window,old=__getKVPV0(),carry=old?._handoff?.();old?.stop?.();

  const actor=String(W.__KVPV_OWN_ACTOR_ID||'');

  const S={enabled:true,confirmAll:true,timer:null,soon:null,hook:null,busy:false,lastPriorityScan:-Infinity,priorityUntil:0,

    generations:new Map(carry?.actor===actor?carry.generations:[]),seen:new Map(carry?.actor===actor?carry.seen:[]),

    requests:carry?.actor===actor?carry.requests:0,reason:'starting',lastError:'',skipped:[],history:[]};

  const ui=__captureESMFunction((__esmLocal1=(()=>W._ft?._Y4n?.ins)),"ui");

  const owned=__captureESMFunction((__esmLocal2=(()=>actor&&String(W._Ba?._rJ?._O$?.ins?.actorId??'')===actor&&!W.__KVPV_UNIVERSAL_HALTED)),"owned");

  const norm=__captureESMFunction((__esmLocal3=(text=>String(text??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/gi,'d').trim().toLowerCase())),"norm");

  const agree=__captureESMFunction((__esmLocal4=(button=>button&&button.visible!==false&&button.disabled!==true&&button.gray!==true&&/^dong y\s*(?:\(\s*\d+\s*\))?$/.test(norm(button.label)))),"agree");

  function detach(){const h=S.hook;if(h&&h.obj.open===h.fn){if(h.descriptor)Object.defineProperty(h.obj,'open',h.descriptor);else delete h.obj.open;}S.hook=null;}
__esmLocal5=detach;


  function schedule(){if(!S.enabled||S.soon!==null)return;S.soon=(__getKVPV1()?.timers?.setTimeout??W.setTimeout)(__captureESMFunction((__esmLocal7=(()=>{S.soon=null;tick();})),""),0);}
__esmLocal6=schedule;


  function attach(manager){if(S.hook?.obj===manager&&manager?.open===S.hook.fn)return;

    detach();if(typeof manager?.open!=='function')return;

    const descriptor=Object.getOwnPropertyDescriptor(manager,'open');if(descriptor&&!descriptor.configurable)return;

    const native=manager.open,fn=__captureESMFunction((__esmLocal9=(function(id,...args){const result=native.call(this,id,...args),key=Number(id);

      S.generations.set(key,(S.generations.get(key)||0)+1);if(S.generations.size>200)S.generations.delete(S.generations.keys().next().value);schedule();return result;})),"fn");

    Object.defineProperty(manager,'open',{value:fn,writable:true,configurable:true,enumerable:!!descriptor?.enumerable});S.hook={obj:manager,fn,descriptor};

  }
__esmLocal8=attach;


  function tick(){if(!S.enabled||S.busy)return false;S.busy=true;try{

    if(!owned()){stop();S.reason='actor_or_session_changed';return;}

    const manager=ui();attach(manager);S.skipped=[];

    

    if(manager?.isOpened?.(118)===true&&typeof manager.close==='function'){

      manager.close(118);S.requests++;S.reason='first_recharge_closed';

      S.history.push({at:Date.now(),id:118,kind:'first_recharge_close'});if(S.history.length>60)S.history.shift();

      S.priorityUntil=Date.now()+10;schedule();return true;

    }

    

    

    const quickBuyClasses=[W._Ba?._LJ?._eBi,W._Ba?._LJ?._fBi].filter(__captureESMFunction((__esmLocal11=(c=>typeof c==='function')),""));

    if(quickBuyClasses.length&&typeof manager?.close==='function')

      for(const id of new Set([372,802,...Object.keys(manager.openTable||manager._H$t||{}).map(Number)])){

        if(manager.isOpened?.(id)!==true)continue;

        const panel=manager.getDialogById?.(id)||manager.getPanelById?.(id);

        if(!quickBuyClasses.some(__captureESMFunction((__esmLocal12=(c=>panel instanceof c)),""))||!panel.parent||panel.visible===false)continue;

        manager.close(id);S.requests++;S.reason='quick_buy_closed';

        S.history.push({at:Date.now(),id,kind:'quick_buy_close'});if(S.history.length>60)S.history.shift();

        S.priorityUntil=Date.now()+10;schedule();return true;

      }

    // Native shared activation showcase (window 92): outside click calls close().

    // Applies to CoBao and the other cosmetic/item activation variants of this class.

    const Showcase=W._Ba?._Ytt?._yti;

    if(typeof Showcase==='function'&&typeof Showcase.prototype.close==='function')

      for(const id of new Set([92,...Object.keys(manager?.openTable||manager?._H$t||{}).map(Number)])){

        if(manager?.isOpened?.(id)!==true)continue;

        const panel=manager.getPanelById?.(id)||manager.getDialogById?.(id);

        if(!(panel instanceof Showcase)||panel.close!==Showcase.prototype.close||panel.closeOnSide!==true||

          !panel.parent||panel.visible===false||panel.destroyed===true)continue;

        const generation=S.generations.get(id)||0,seen=S.seen.get(id);

        if(seen?.panel===panel&&seen.generation===generation)continue;

        S.seen.set(id,{panel,generation});if(S.seen.size>200)S.seen.delete(S.seen.keys().next().value);

        S.requests++;S.reason='activation_showcase_closed';

        S.history.push({at:Date.now(),id,kind:'activation_showcase_close'});if(S.history.length>60)S.history.shift();

        panel.close();S.priorityUntil=Date.now()+10;schedule();return true;

      }

    const ids=new Set([12,1293,...Object.keys(manager?.openTable||manager?._H$t||{}).map(Number)]);

    for(const id of ids){

      if(manager?.isOpened?.(id)!==true)continue;

      const panel=manager.getPanelById?.(id)||manager.getDialogById?.(id),button=panel?.okBtn;

      if(!panel||panel.destroyed===true||panel.visible===false||!panel.parent||!agree(button))continue;

      const generation=S.generations.get(id)||0,seen=S.seen.get(id);

      if(seen?.panel===panel&&seen.generation===generation)continue;

      

      const content=norm([panel.contentTxt?.innerHTML,panel.contentTxt?.text,panel.content,panel.title].filter(Boolean).join(' '));

      const Result=W._Ba?._sst?._EVn;

      const nativeResult=typeof Result==='function'&&panel instanceof Result&&typeof Result.prototype.close==='function'&&panel.close===Result.prototype.close;

      const result=id===1293||nativeResult;

      const paidText=/\b(knb|nguyen bao|yuanbao|ingot|nap tien|thanh toan|mua|tieu hao|chi phi)\b/.test(content);

      if(paidText&&!nativeResult){S.skipped.push({id,reason:'potential_currency_cost'});continue;}

      const information=id===12&&typeof panel._oBn?.run!=='function';

      

      

      

      const bag=W._Ba?._Ic?._aQ?.ins,handler=panel._oBn;

      const fusion=id===12&&

        typeof bag?.quickOneKeyFusion==='function'&&handler?.method===bag.quickOneKeyFusion&&handler?.caller===bag&&typeof handler?.run==='function';

      if(!information&&!result&&!fusion){S.skipped.push({id,reason:'unverified_action_cost'});continue;}

      const nativeGeneric=id===12&&typeof panel._aBn==='function';

      if(!nativeGeneric&&typeof button.event!=='function'&&!(result&&typeof panel.close==='function'))continue;

      S.seen.set(id,{panel,generation});if(S.seen.size>200)S.seen.delete(S.seen.keys().next().value);

      S.requests++;S.reason='native_agree_requested';S.history.push({at:Date.now(),id,kind:fusion?'bag_quick_fusion':information?'information':result?'battle_result':'confirmation'});if(S.history.length>60)S.history.shift();

      if(nativeGeneric)panel._aBn();else if(result&&typeof panel.close==='function')panel.close();else button.event('click');

      S.priorityUntil=Date.now()+10;schedule();return true; 

    }

    S.reason=S.skipped.length?'waiting_confirmation_scope':'waiting_popup';

  }catch(e){S.lastError=String(e?.message||e);S.reason='error';}finally{S.busy=false;}return false;}
__esmLocal10=tick;


  

  

  function beforeTask(){if(!S.enabled||!owned())return false;const now=Date.now();

    if(now-S.lastPriorityScan>=50){S.lastPriorityScan=now;if(tick()===true)return true;}

    return now<S.priorityUntil;}
__esmLocal13=beforeTask;


  function status(){return {enabled:S.enabled,priority:'before_scene_tasks_and_quick_use',confirmAll:S.confirmAll,allowKNB:false,unknownCosts:'manual',asynchronous:true,pollMs:100,requests:S.requests,

    reason:S.reason,lastError:S.lastError,skipped:S.skipped.map(__captureESMFunction((__esmLocal15=(x=>({...x}))),"")),history:S.history.map(__captureESMFunction((__esmLocal16=(x=>({...x}))),""))};}
__esmLocal14=status;


  function stop(){S.enabled=false;if(S.timer!==null){(__getKVPV1()?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;}

    if(S.soon!==null){(__getKVPV1()?.timers?.clearTimeout??W.clearTimeout)(S.soon);S.soon=null;}detach();S.reason='stopped';return status();}
__esmLocal17=stop;


  function start(){S.enabled=true;if(S.timer===null)S.timer=(__getKVPV1()?.timers?.setInterval??W.setInterval)(tick,100);schedule();return status();}
__esmLocal18=start;


  W.KVPV_CONFIRM_POPUPS=Object.freeze({start,stop,status,sync:schedule,beforeTask,

    setAll(value){
__esmLocal19=__captureESMMethod(this,"setAll","init");
S.confirmAll=value===true;schedule();return status();},

    _handoff:__captureESMFunction((__esmLocal20=(()=>({actor,confirmAll:S.confirmAll,generations:[...S.generations],seen:[...S.seen],requests:S.requests}))),"_handoff")});start();

})),""))();


}
export {getKVPV_CONFIRM_POPUPS} from '../api.mjs';
export const api=Object.freeze({
  get KVPV_CONFIRM_POPUPS(){return globalThis.KVPV_CONFIRM_POPUPS;},
});