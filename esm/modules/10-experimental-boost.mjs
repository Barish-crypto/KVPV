import {getKVPV_EXPERIMENTAL_BOOST as __getKVPV0,getKVPV_V1 as __getKVPV1} from '../api.mjs';
export function call_KVPV_EXPERIMENTAL_BOOST_start(...args){const target=globalThis["KVPV_EXPERIMENTAL_BOOST"];const fn=globalThis["KVPV_EXPERIMENTAL_BOOST"]?.["start"];if(typeof fn!=='function')throw Error("KVPV_EXPERIMENTAL_BOOST.start is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_EXPERIMENTAL_BOOST_stop(...args){const target=globalThis["KVPV_EXPERIMENTAL_BOOST"];const fn=globalThis["KVPV_EXPERIMENTAL_BOOST"]?.["stop"];if(typeof fn!=='function')throw Error("KVPV_EXPERIMENTAL_BOOST.stop is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_EXPERIMENTAL_BOOST_status(...args){const target=globalThis["KVPV_EXPERIMENTAL_BOOST"];const fn=globalThis["KVPV_EXPERIMENTAL_BOOST"]?.["status"];if(typeof fn!=='function')throw Error("KVPV_EXPERIMENTAL_BOOST.status is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_EXPERIMENTAL_BOOST_sync(...args){const target=globalThis["KVPV_EXPERIMENTAL_BOOST"];const fn=globalThis["KVPV_EXPERIMENTAL_BOOST"]?.["sync"];if(typeof fn!=='function')throw Error("KVPV_EXPERIMENTAL_BOOST.sync is not available");return Reflect.apply(fn,target,args);}
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
export {__esmLocal0 as local_anonymous_4_1_0};
export {__esmLocal1 as local_ownActor_1};
export {__esmLocal2 as local_active_2};
export {__esmLocal3 as local_restoreMove_3};
export {__esmLocal4 as local_detach_4};
export {__esmLocal5 as local_attach_5};
export {__esmLocal6 as local_fn_6};
export {__esmLocal7 as local_clone_7};
export {__esmLocal8 as local_anonymous_56_59_8};
export {__esmLocal9 as local_anonymous_72_77_9};
export {__esmLocal10 as local_tick_10};
export {__esmLocal11 as local_status_11};
export {__esmLocal12 as local_anonymous_134_85_12};
export {__esmLocal13 as local_stop_13};
export {__esmLocal14 as local_start_14};
export {__esmLocal15 as local_sync_15};
export function initialize(){

/* Experimental CLIENT settings. Server cooldown and movement acceptance unverified. */

(__captureESMFunction((__esmLocal0=(() => {

  'use strict';

  const W=window;__getKVPV0()?.stop?.();

  const actor=String(W.__KVPV_OWN_ACTOR_ID||'');

  const defs={};

  const state={enabled:true,timer:null,move:null,hooks:new Map(),nextCompanionScan:0,lastError:''};

  const config={companionFactor:10,moveFactor:99,movementSyncMs:16,companionScanMs:100,clientWaitMs:{}};

  const ownActor=__captureESMFunction((__esmLocal1=(()=>actor&&String(W._Ba?._rJ?._O$?.ins?.actorId??'')===actor&&!W.__KVPV_UNIVERSAL_HALTED)),"ownActor");

  // User-approved global boost: independent of map and main-character mode.

  const active=__captureESMFunction((__esmLocal2=(()=>state.enabled&&ownActor()&&W._Ba?._rJ?._O$?.ins?.isDead!==true)),"active");

  

  function restoreMove(){const h=state.move;if(!h)return;

    if(h.obj.speed===h.applied)h.obj.speed=h.base;state.move=null;

  }
__esmLocal3=restoreMove;


  function detach(key){const h=state.hooks.get(key);if(!h)return;

    if(h.obj._f7t===h.fn){if(h.descriptor)Object.defineProperty(h.obj,'_f7t',h.descriptor);else delete h.obj._f7t;}

    state.hooks.delete(key);

  }
__esmLocal4=detach;


  function attach(key,selector){

    const previous=state.hooks.get(key);if(previous?.obj===selector)return;

    detach(key);if(typeof selector?._f7t!=='function')return;

    const descriptor=Object.getOwnPropertyDescriptor(selector,'_f7t');if(descriptor&&!descriptor.configurable)return;

    const native=selector._f7t,h={obj:selector,descriptor,fn:null,ready:new Map(),selections:0,context:null,combat:null,lastAttempt:-Infinity,attempts:0,lastReason:'waiting_components'};

    h.fn=__captureESMFunction((__esmLocal6=(function(activeRows,commonRows,mode){

      if(!active()||this!==selector)return native.apply(this,arguments);

      const now=Date.now();

      const clone=__captureESMFunction((__esmLocal7=(rows=>!Array.isArray(rows)?rows:rows.map(__captureESMFunction((__esmLocal8=(row=>{

        if(!Array.isArray(row)||!Number.isSafeInteger(Number(row[0]))||!(Number(row[2])>0))return row;

        const id=Number(row[0]),copy=row.slice(),fixed=config.clientWaitMs[key];

        

        if(!h.ready.has(id))h.ready.set(id,Number(row[1])<=now?0:now+(fixed??((Number(row[1])-now)/config.companionFactor)));

        copy[1]=h.ready.get(id);copy[2]=fixed??Math.max(1,Number(row[2])/config.companionFactor);return copy;

      })),"")))),"clone");

      const a=clone(activeRows),b=clone(commonRows),id=native.call(this,a,b,mode);

      const row=[...(Array.isArray(a)?a:[]),...(Array.isArray(b)?b:[])].find(__captureESMFunction((__esmLocal9=(x=>Number(x?.[0])===Number(id))),""));

      if(Number(id)>0&&row){h.ready.set(Number(id),Math.max(now+1,Number(row[1])||now+Number(row[2])));h.selections++;}

      return id;

    })),"fn");

    Object.defineProperty(selector,'_f7t',{value:h.fn,configurable:true,writable:true,enumerable:!!descriptor?.enumerable});state.hooks.set(key,h);

  }
__esmLocal5=attach;


  

  function tick(forceCompanions=false){try{

    if(!active()){state.nextCompanionScan=0;restoreMove();for(const k of [...state.hooks.keys()])detach(k);return;}

    const world=W._C?._Ba?.instance,role=world?.getRole?.(Number(actor))??world?.getRole?.(actor);

    if(!role){state.nextCompanionScan=0;restoreMove();for(const k of [...state.hooks.keys()])detach(k);return;}

    const mover=role.getComponent?.(W._d?._Yct?._zet);

    if(state.move?.obj!==mover)restoreMove();

    if(mover){

      const h=state.move;

      if(!h||mover.speed!==h.applied){const base=Number(mover.speed);if(Number.isFinite(base)&&base>0)state.move={obj:mover,base,applied:base*config.moveFactor};}

      if(state.move)mover.speed=state.move.applied;

    }

    

    if(!forceCompanions&&Date.now()<state.nextCompanionScan)return;

    state.nextCompanionScan=Date.now()+config.companionScanMs;

    for(const [key,property] of Object.entries(defs)){

      const context=role.property?.get?.(property);

      const selector=context&&context!==role?context.getComponent?.(W._d?._Yct?._Eet):null;

      attach(key,selector===role.getComponent?.(W._d?._Yct?._Eet)?null:selector);

      const h=state.hooks.get(key);if(h){h.context=context;h.combat=context?.getComponent?.(W._d?._Yct?._Het);}

    }



  }catch(e){state.lastError=String(e?.message||e);}}
__esmLocal10=tick;


  

  function status(){return {experimental:true,enabled:state.enabled,active:!!active(),...config,clientWaitMs:{...config.clientWaitMs},

    movementApplied:!!state.move,companions:Object.fromEntries(Object.keys(defs).map(__captureESMFunction((__esmLocal12=(k=>[k,{hooked:state.hooks.has(k),selections:state.hooks.get(k)?.selections||0,combatAttempts:state.hooks.get(k)?.attempts||0,lastReason:state.hooks.get(k)?.lastReason??'not_attached'}])),""))),lastError:state.lastError,

    movementFactor:config.moveFactor,movementBase:state.move?.base??null,
    movementCurrent:state.move?.obj?.speed??null,serverAcceptedUnverified:true,
    note:'Client-side movement speed only; no companion skill cooldowns or server movement packets are modified.'};}
__esmLocal11=status;


  

  function stop(){state.enabled=false;if(state.timer!=null){(__getKVPV1()?.timers?.clearInterval??W.clearInterval)(state.timer);state.timer=null;}

    restoreMove();for(const k of [...state.hooks.keys()])detach(k);return status();}
__esmLocal13=stop;


  

  function start(){state.enabled=true;if(state.timer==null)state.timer=(__getKVPV1()?.timers?.setInterval??W.setInterval)(tick,config.movementSyncMs);tick(true);return status();}
__esmLocal14=start;


  W.KVPV_EXPERIMENTAL_BOOST=Object.freeze({start,stop,status,sync:__captureESMFunction((__esmLocal15=(()=>tick(true))),"sync")});start();

})),""))();


}
export {getKVPV_EXPERIMENTAL_BOOST} from '../api.mjs';
export const api=Object.freeze({
  get KVPV_EXPERIMENTAL_BOOST(){return globalThis.KVPV_EXPERIMENTAL_BOOST;},
});