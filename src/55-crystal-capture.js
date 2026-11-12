
/* Temporary native-call observation for the user's main account. No sender/replay. */

(() => {

 'use strict';const W=window,actor=String(W.__KVPV_OWN_ACTOR_ID||'');

 W.KVPV_CRYSTAL_CAPTURE?.stop?.();if(actor!=='10228867268946')return;

 const key='__KVPV_CRYSTAL_CAPTURE_20261024_SESSION2',S=W[key]??(W[key]={until:Date.now()+900000,records:[],errors:[]});

 const hooks=[];let timer=null;

 const copy=(v,d=0)=>Array.isArray(v)?d<5?v.slice(0,24).map(x=>copy(x,d+1)):null:typeof v==='number'||typeof v==='boolean'?v:typeof v==='string'?v.slice(0,200):null;

 const owned=()=>String(W._Ba?._rJ?._O$?.ins?.actorId)===actor&&!W.__KVPV_UNIVERSAL_HALTED;

 function stop(){if(timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(timer);timer=null;for(const h of hooks.splice(0))if(h.obj[h.name]===h.fn){if(h.descriptor)Object.defineProperty(h.obj,h.name,h.descriptor);else delete h.obj[h.name];}}

 function attach(obj,name,direction,filter=()=>true){

  if(!obj||hooks.some(h=>h.obj===obj&&h.name===name))return;

  const native=Object.getPrototypeOf(obj)?.[name];if(typeof native!=='function'||obj[name]!==native)return;

  const descriptor=Object.getOwnPropertyDescriptor(obj,name);

  const fn=function(...args){

   if(owned()&&Date.now()<S.until&&filter(args)){

    try{S.records.push({at:Date.now(),direction,method:name,args:copy(args)});if(S.records.length>48){const expendable=S.records.findIndex(r=>r.method==='setSceneInfo');S.records.splice(expendable>=0?expendable:0,1);}}catch(e){S.errors.push(String(e));}

   }

   return native.apply(this,args);

  };

  Object.defineProperty(obj,name,{value:fn,writable:true,configurable:true});hooks.push({obj,name,fn,descriptor});

 }

 function sync(){if(!owned()||Date.now()>=S.until){stop();return;}

  try{

   const room=W._Ba?._cm?._u3t?.ins,trigram=W._Ba?._n4t?._oun?.ins,model=W._Ba?._n4t?._t4t?.ins;

   for(const name of ['creSerAreRoom','startTeamBossCopy','agrInviUSARoom','joinSerAreRoom'])attach(room,name,'outgoing_native',args=>Number(args[0]?.[0])===6);

   for(const name of ['TrigramCopySetAreaId','TrigramCopyCreateTowner','_run','setTrigramCopyAutoTower'])attach(trigram,name,'outgoing_native');

   for(const name of ['setTrigramCopyInfo','setSceneInfo'])attach(model,name,'incoming_model');

  }catch(e){if(S.errors.length<8)S.errors.push(String(e));}

 }

 function status(){sync();const m=W._Ba?._n4t?._t4t?.ins,cfg=W._ft?._Esi?.ins;

  return {actor,active:Date.now()<S.until&&owned()&&hooks.length>0,until:S.until,hooks:hooks.map(h=>h.name),

   map:W._Ba?._$a?._yo?.ins?.intoSce?.[0],remainTimes:m?.remainTimes,curType:m?.curType,curWave:m?.curWare,

   types:Object.values(cfg?._Osh??{}).slice(0,8).map(r=>copy(r)),records:S.records.map(r=>({...r,args:copy(r.args)})),errors:S.errors.slice(),

   note:'Decoded native method arguments/model updates; not raw network packets. No requests sent by capture.'};

 }

 W.KVPV_CRYSTAL_CAPTURE=Object.freeze({status,stop});sync();

 if(owned()&&Date.now()<S.until)timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(sync,1000);

})();

