import {getKVPV_DAILY as __getKVPV0,getKVPV_ITEM_TRACE as __getKVPV1} from '../api.mjs';
export function call_KVPV_ITEM_TRACE_stop(...args){const target=globalThis["KVPV_ITEM_TRACE"];const fn=globalThis["KVPV_ITEM_TRACE"]?.["stop"];if(typeof fn!=='function')throw Error("KVPV_ITEM_TRACE.stop is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_ITEM_TRACE_status(...args){const target=globalThis["KVPV_ITEM_TRACE"];const fn=globalThis["KVPV_ITEM_TRACE"]?.["status"];if(typeof fn!=='function')throw Error("KVPV_ITEM_TRACE.status is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_ITEM_TRACE__handoff(...args){const target=globalThis["KVPV_ITEM_TRACE"];const fn=globalThis["KVPV_ITEM_TRACE"]?.["_handoff"];if(typeof fn!=='function')throw Error("KVPV_ITEM_TRACE._handoff is not available");return Reflect.apply(fn,target,args);}
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
export {__esmLocal0 as local_anonymous_4_1_0};
export {__esmLocal1 as local_bag_1};
export {__esmLocal2 as local_owned_2};
export {__esmLocal3 as local_parse_3};
export {__esmLocal4 as local_seed_4};
export {__esmLocal5 as local_record_5};
export {__esmLocal6 as local_add_6};
export {__esmLocal7 as local_remove_7};
export {__esmLocal8 as local_trim_8};
export {__esmLocal9 as local_stop_9};
export {__esmLocal10 as local_status_10};
export {__esmLocal11 as local__handoff_11};
export function initialize(){

/* Read-only native inventory notifications; no socket interception, use or replay. */

(__captureESMFunction((__esmLocal0=(() => {

 'use strict';const W=window,old=__getKVPV1(),c=old?._handoff?.();old?.stop?.();

 const actor=String(W.__KVPV_OWN_ACTOR_ID||''),same=c?.actor===actor;

 const S={enabled:true,seeded:same?c.seeded:false,stacks:new Map(same?c.stacks:[]),history:same?c.history:[],serial:same?c.serial:0,partial:same?c.partial:false,error:''},owner={};

 const bag=__captureESMFunction((__esmLocal1=(()=>W._Ba?._Ic?._aQ?.ins)),"bag"),owned=__captureESMFunction((__esmLocal2=(()=>actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED)),"owned");

 function parse(item){if(!Array.isArray(item))return null;const id=Number(item[0]),count=Number(item[1]),uid=String(item[2]??'');return Number.isSafeInteger(id)&&id>0&&Number.isSafeInteger(count)&&count>=0&&uid.length>0&&uid.length<=50?{id,count,uid}:null;}
__esmLocal3=parse;


 function seed(){if(S.seeded||!owned()||bag()?.isBagInited!==true)return;let n=0;

  for(let b=0;b<15;b++){const rows=bag().getItemsByBagType?.(b);if(!Array.isArray(rows))continue;for(const item of rows){const r=parse(item);if(r)S.stacks.set(r.id+'/'+r.uid,r);if(++n>=2000){S.partial=true;break;}}if(n>=2000)break;}S.seeded=true;

 }
__esmLocal4=seed;


 function record(before,after,reason,event){

  if(before&&before.count===after.count)return;

  S.history.push({serial:++S.serial,at:Date.now(),id:after.id,uid:after.uid,before:before?.count??null,after:after.count,delta:before?after.count-before.count:null,sourceCode:typeof reason==='number'||typeof reason==='string'?String(reason).slice(0,80):null,event,map:Number(W._C?._Mn?._Cn?.currentID)||null,job:String(__getKVPV0()?.quickState?.()?.job??'').slice(0,60),evidence:'native_client_inventory_notification'});

  if(S.history.length>80)S.history.shift();

 }
__esmLocal5=record;


 function add(item,reason){try{if(!S.enabled||!owned())return;const r=parse(item);if(!r)return;const key=r.id+'/'+r.uid,before=S.stacks.get(key);record(before,r,reason,5457);S.stacks.set(key,r);trim();}catch(e){S.error=String(e);}}
__esmLocal6=add;


 function remove(uid){try{if(!S.enabled||!owned())return;uid=String(uid);for(const [key,before]of S.stacks)if(before.uid===uid){const item=bag()?.getItemByIdAndUid?.(before.id,uid),r=parse(item);

   // A UID lookup is bag-scoped: never associate a different item ID with this stack.

   if(r&&r.id!==before.id)continue;

   if(!item&&typeof bag()?.getItemByIdAndUid!=='function')continue;

   const after=r??{...before,count:0};record(before,after,null,5077);if(after.count===0)S.stacks.delete(key);else S.stacks.set(key,after);

  }}catch(e){S.error=String(e);}}
__esmLocal7=remove;


 function trim(){while(S.stacks.size>2000){S.partial=true;S.stacks.delete(S.stacks.keys().next().value);}}
__esmLocal8=trim;


 function stop(){S.enabled=false;const n=W._Sa?.notify;n?.off?.(5457,owner,add);n?.off?.(5077,owner,remove);n?.off?.(5074,owner,seed);n?.off?.(5078,owner,seed);}
__esmLocal9=stop;


 const n=W._Sa?.notify;if(typeof n?.on==='function'&&typeof n?.off==='function'){n.on(5457,owner,add);n.on(5077,owner,remove);n.on(5074,owner,seed);n.on(5078,owner,seed);}seed();

 W.KVPV_ITEM_TRACE=Object.freeze({stop,status:__captureESMFunction((__esmLocal10=(()=>({enabled:S.enabled,seeded:S.seeded,partial:S.partial,changes:S.serial,lastError:S.error,recent:S.history.slice(-16),note:'Native client notifications only. Source codes are untranslated; map/job are context, not proof of origin. No server ownership guarantee.'}))),"status"),_handoff:__captureESMFunction((__esmLocal11=(()=>({actor,seeded:S.seeded,stacks:[...S.stacks],history:S.history,serial:S.serial,partial:S.partial}))),"_handoff")});

})),""))();


}
export {getKVPV_ITEM_TRACE} from '../api.mjs';
export const api=Object.freeze({
  get KVPV_ITEM_TRACE(){return globalThis.KVPV_ITEM_TRACE;},
});