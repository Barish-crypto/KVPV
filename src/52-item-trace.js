
/* Read-only native inventory notifications; no socket interception, use or replay. */

(() => {

 'use strict';const W=window,old=W.KVPV_ITEM_TRACE,c=old?._handoff?.();old?.stop?.();

 const actor=String(W.__KVPV_OWN_ACTOR_ID||''),same=c?.actor===actor;

 const S={enabled:true,seeded:same?c.seeded:false,stacks:new Map(same?c.stacks:[]),history:same?c.history:[],serial:same?c.serial:0,partial:same?c.partial:false,error:''},owner={};

 const bag=()=>W._Ba?._Ic?._aQ?.ins,owned=()=>actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;

 function parse(item){if(!Array.isArray(item))return null;const id=Number(item[0]),count=Number(item[1]),uid=String(item[2]??'');return Number.isSafeInteger(id)&&id>0&&Number.isSafeInteger(count)&&count>=0&&uid.length>0&&uid.length<=50?{id,count,uid}:null;}

 function seed(){if(S.seeded||!owned()||bag()?.isBagInited!==true)return;let n=0;

  for(let b=0;b<15;b++){const rows=bag().getItemsByBagType?.(b);if(!Array.isArray(rows))continue;for(const item of rows){const r=parse(item);if(r)S.stacks.set(r.id+'/'+r.uid,r);if(++n>=2000){S.partial=true;break;}}if(n>=2000)break;}S.seeded=true;

 }

 function record(before,after,reason,event){

  if(before&&before.count===after.count)return;

  S.history.push({serial:++S.serial,at:Date.now(),id:after.id,uid:after.uid,before:before?.count??null,after:after.count,delta:before?after.count-before.count:null,sourceCode:typeof reason==='number'||typeof reason==='string'?String(reason).slice(0,80):null,event,map:Number(W._C?._Mn?._Cn?.currentID)||null,job:String(W.KVPV_DAILY?.quickState?.()?.job??'').slice(0,60),evidence:'native_client_inventory_notification'});

  if(S.history.length>80)S.history.shift();

 }

 function add(item,reason){try{if(!S.enabled||!owned())return;const r=parse(item);if(!r)return;const key=r.id+'/'+r.uid,before=S.stacks.get(key);record(before,r,reason,5457);S.stacks.set(key,r);trim();}catch(e){S.error=String(e);}}

 function remove(uid){try{if(!S.enabled||!owned())return;uid=String(uid);for(const [key,before]of S.stacks)if(before.uid===uid){const item=bag()?.getItemByIdAndUid?.(before.id,uid),r=parse(item);

   // A UID lookup is bag-scoped: never associate a different item ID with this stack.

   if(r&&r.id!==before.id)continue;

   if(!item&&typeof bag()?.getItemByIdAndUid!=='function')continue;

   const after=r??{...before,count:0};record(before,after,null,5077);if(after.count===0)S.stacks.delete(key);else S.stacks.set(key,after);

  }}catch(e){S.error=String(e);}}

 function trim(){while(S.stacks.size>2000){S.partial=true;S.stacks.delete(S.stacks.keys().next().value);}}

 function stop(){S.enabled=false;const n=W._Sa?.notify;n?.off?.(5457,owner,add);n?.off?.(5077,owner,remove);n?.off?.(5074,owner,seed);n?.off?.(5078,owner,seed);}

 const n=W._Sa?.notify;if(typeof n?.on==='function'&&typeof n?.off==='function'){n.on(5457,owner,add);n.on(5077,owner,remove);n.on(5074,owner,seed);n.on(5078,owner,seed);}seed();

 W.KVPV_ITEM_TRACE=Object.freeze({stop,status:()=>({enabled:S.enabled,seeded:S.seeded,partial:S.partial,changes:S.serial,lastError:S.error,recent:S.history.slice(-16),note:'Native client notifications only. Source codes are untranslated; map/job are context, not proof of origin. No server ownership guarantee.'}),_handoff:()=>({actor,seeded:S.seeded,stacks:[...S.stacks],history:S.history,serial:S.serial,partial:S.partial})});

})();

