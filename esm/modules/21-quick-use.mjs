import {getKVPV_CONFIRM_POPUPS as __getKVPV0,getKVPV_QUICK_USE as __getKVPV1,getKVPV_V1 as __getKVPV2} from '../api.mjs';
export function call_KVPV_QUICK_USE_start(...args){const target=globalThis["KVPV_QUICK_USE"];const fn=globalThis["KVPV_QUICK_USE"]?.["start"];if(typeof fn!=='function')throw Error("KVPV_QUICK_USE.start is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_QUICK_USE_stop(...args){const target=globalThis["KVPV_QUICK_USE"];const fn=globalThis["KVPV_QUICK_USE"]?.["stop"];if(typeof fn!=='function')throw Error("KVPV_QUICK_USE.stop is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_QUICK_USE_status(...args){const target=globalThis["KVPV_QUICK_USE"];const fn=globalThis["KVPV_QUICK_USE"]?.["status"];if(typeof fn!=='function')throw Error("KVPV_QUICK_USE.status is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_QUICK_USE_sync(...args){const target=globalThis["KVPV_QUICK_USE"];const fn=globalThis["KVPV_QUICK_USE"]?.["sync"];if(typeof fn!=='function')throw Error("KVPV_QUICK_USE.sync is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_QUICK_USE__handoff(...args){const target=globalThis["KVPV_QUICK_USE"];const fn=globalThis["KVPV_QUICK_USE"]?.["_handoff"];if(typeof fn!=='function')throw Error("KVPV_QUICK_USE._handoff is not available");return Reflect.apply(fn,target,args);}
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
export {__esmLocal0 as local_anonymous_8_1_0};
export {__esmLocal1 as local_model_1};
export {__esmLocal2 as local_owned_2};
export {__esmLocal3 as local_label_3};
export {__esmLocal4 as local_note_4};
export {__esmLocal5 as local_detach_5};
export {__esmLocal6 as local_schedule_6};
export {__esmLocal7 as local_anonymous_34_57_7};
export {__esmLocal8 as local_attach_8};
export {__esmLocal9 as local_fn_9};
export {__esmLocal10 as local_tick_10};
export {__esmLocal11 as local_status_11};
export {__esmLocal12 as local_anonymous_110_26_12};
export {__esmLocal13 as local_stop_13};
export {__esmLocal14 as local_start_14};
export {__esmLocal15 as local__handoff_15};
export function initialize(){







(__captureESMFunction((__esmLocal0=(() => {

  'use strict';

  const W=window,old=__getKVPV1(),carry=old?._handoff?.();old?.stop?.();

  const actor=String(W.__KVPV_OWN_ACTOR_ID||'');

  const S={enabled:true,timer:null,soon:null,hook:null,busy:false,

    sent:new Set(carry?.actor===actor?carry.keys:[]),requests:carry?.actor===actor?carry.requests:0,

    lastItem:null,reason:'starting',lastError:'',history:[]};

  const model=__captureESMFunction((__esmLocal1=(()=>W._Ba?._aJ?._hJ?.ins)),"model");

  const owned=__captureESMFunction((__esmLocal2=(()=>actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED)),"owned");

  const label=__captureESMFunction((__esmLocal3=(text=>String(text??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/gi,'d').trim().toLowerCase())),"label");

  function note(event,item){S.history.push({at:Date.now(),event,item});if(S.history.length>60)S.history.shift();}
__esmLocal4=note;


  function detach(){const h=S.hook;if(h&&h.obj._Rst===h.fn){if(h.descriptor)Object.defineProperty(h.obj,'_Rst',h.descriptor);else delete h.obj._Rst;}S.hook=null;}
__esmLocal5=detach;


  function schedule(){if(!S.enabled||S.soon!==null)return;

    S.soon=(__getKVPV2()?.timers?.setTimeout??W.setTimeout)(__captureESMFunction((__esmLocal7=(()=>{S.soon=null;tick();})),""),0);

  }
__esmLocal6=schedule;


  function attach(m){

    if(S.hook?.obj===m&&m?._Rst===S.hook.fn)return;

    detach();if(typeof m?._Rst!=='function')return;

    const descriptor=Object.getOwnPropertyDescriptor(m,'_Rst');if(descriptor&&!descriptor.configurable)return;

    const native=m._Rst,fn=__captureESMFunction((__esmLocal9=(function(...args){const result=native.apply(this,args);schedule();return result;})),"fn");

    Object.defineProperty(m,'_Rst',{value:fn,writable:true,configurable:true,enumerable:!!descriptor?.enumerable});

    S.hook={obj:m,descriptor,fn};

  }
__esmLocal8=attach;


  function tick(){if(S.busy||!S.enabled)return;

    if(__getKVPV0()?.beforeTask?.()===true){S.reason='priority_agree_popup';return;}

    try{

      if(!owned()){stop();S.reason='actor_or_session_changed';return;}

      const m=model();attach(m);const popup=m?._Wr,button=popup?.useBtn;

      if(!popup?.parent||popup.destroyed===true||popup.visible===false){S.reason='waiting_popup';return;}

      if(!button||button.visible===false||button.disabled===true||button.gray===true||label(button.label)!=='dung'){

        S.reason='not_an_enabled_use_button';return;

      }

      const item=popup.getItem?.(),id=Number(item?.[0]),count=Number(item?.[1]),uid=item?.[2];

      if(!Array.isArray(item)||!Number.isSafeInteger(id)||id<=0||!Number.isFinite(count)||count<=0||uid==null||typeof popup._M_0!=='function'){

        S.reason='waiting_native_item';return;

      }

      const key=id+'/'+String(uid)+'/'+count;

      if(S.sent.has(key)){S.reason='already_requested';return;}

      const bag=W._Ba?._Ic?._aQ?.ins;

      if(typeof bag?.getItemByIdAndUid==='function'&&!bag.getItemByIdAndUid(id,uid)){

        S.reason='item_no_longer_in_bag';return;

      }

      S.sent.add(key);while(S.sent.size>500)S.sent.delete(S.sent.values().next().value);

      S.busy=true;S.lastItem={id,uid:String(uid),count};S.requests++;S.reason='native_use_requested';note('USE-REQUEST',S.lastItem);

      

      popup._M_0();

    }catch(e){S.lastError=String(e?.message||e);S.reason='error';}

    finally{S.busy=false;}

  }
__esmLocal10=tick;


  function status(){return {enabled:S.enabled,actorId:actor,pollMs:50,asynchronous:true,

    hookAttached:!!S.hook,requests:S.requests,lastItem:S.lastItem?{...S.lastItem}:null,reason:S.reason,lastError:S.lastError,

    history:S.history.map(__captureESMFunction((__esmLocal12=(x=>({...x,item:x.item?{...x.item}:null}))),"")),

    note:'Visible native Use popup only; independent of Daily. Requests are not server consumption confirmations.'};}
__esmLocal11=status;


  function stop(){S.enabled=false;

    if(S.timer!==null){(__getKVPV2()?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;}

    if(S.soon!==null){(__getKVPV2()?.timers?.clearTimeout??W.clearTimeout)(S.soon);S.soon=null;}

    detach();S.reason='stopped';return status();

  }
__esmLocal13=stop;


  function start(){S.enabled=true;if(S.timer===null)S.timer=(__getKVPV2()?.timers?.setInterval??W.setInterval)(tick,50);schedule();return status();}
__esmLocal14=start;


  W.KVPV_QUICK_USE=Object.freeze({start,stop,status,sync:schedule,

    _handoff:__captureESMFunction((__esmLocal15=(()=>({actor,keys:[...S.sent],requests:S.requests}))),"_handoff")});start();

})),""))();


}
export {getKVPV_QUICK_USE} from '../api.mjs';
export const api=Object.freeze({
  get KVPV_QUICK_USE(){return globalThis.KVPV_QUICK_USE;},
});