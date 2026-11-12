import {getKVPV_MOVEMENT_OBSERVER as __getKVPV0,getKVPV_TRANH_BA_TU_PHUONG as __getKVPV1,getKVPV_V1 as __getKVPV2} from '../api.mjs';
export function call_KVPV_MOVEMENT_OBSERVER_status(...args){const target=globalThis["KVPV_MOVEMENT_OBSERVER"];const fn=globalThis["KVPV_MOVEMENT_OBSERVER"]?.["status"];if(typeof fn!=='function')throw Error("KVPV_MOVEMENT_OBSERVER.status is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_MOVEMENT_OBSERVER_report(...args){const target=globalThis["KVPV_MOVEMENT_OBSERVER"];const fn=globalThis["KVPV_MOVEMENT_OBSERVER"]?.["report"];if(typeof fn!=='function')throw Error("KVPV_MOVEMENT_OBSERVER.report is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_MOVEMENT_OBSERVER_tick(...args){const target=globalThis["KVPV_MOVEMENT_OBSERVER"];const fn=globalThis["KVPV_MOVEMENT_OBSERVER"]?.["tick"];if(typeof fn!=='function')throw Error("KVPV_MOVEMENT_OBSERVER.tick is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_MOVEMENT_OBSERVER_stop(...args){const target=globalThis["KVPV_MOVEMENT_OBSERVER"];const fn=globalThis["KVPV_MOVEMENT_OBSERVER"]?.["stop"];if(typeof fn!=='function')throw Error("KVPV_MOVEMENT_OBSERVER.stop is not available");return Reflect.apply(fn,target,args);}
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
export {__esmLocal0 as local_anonymous_2_1_0};
export {__esmLocal1 as local_owned_1};
export {__esmLocal2 as local_excluded_2};
export {__esmLocal3 as local_position_3};
export {__esmLocal4 as local_tick_4};
export {__esmLocal5 as local_status_5};
export {__esmLocal6 as local_anonymous_34_55_6};
export {__esmLocal7 as local_anonymous_34_99_7};
export {__esmLocal8 as local_report_8};
export {__esmLocal9 as local_anonymous_35_70_9};
export {__esmLocal10 as local_stop_10};
export function initialize(){
/* Read-only player movement observer. No moveTo, writes, RPC, or speed overrides. */
(__captureESMFunction((__esmLocal0=(()=>{'use strict';
const W=window,previous=__getKVPV0();previous?.stop?.('reload');
const actor=String(W.__KVPV_OWN_ACTOR_ID??'');
const S={enabled:true,timer:null,history:[],last:null,samples:0,distance:0,peakSpeed:0,rollbacks:0,reason:'waiting_position',error:''};
const owned=__captureESMFunction((__esmLocal1=(()=>!!actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED)),"owned");
function excluded(){const e=__getKVPV1()?.status?.();return e?.inside===true||(e?.eventActive===true&&W._Ba?._$a?.SceneUtil?.isCommonScene===false&&(e?.verifiedMap==null||Number(e.map)===Number(e.verifiedMap)));}
__esmLocal2=excluded;

function position(){const r=W._C?._Ba?.instance?.getRole?.(Number(actor)),p=r?.property?.get?.('position')??r?.coords??r?.position;const x=Number(p?.x),y=Number(p?.y);return Number.isFinite(x)&&Number.isFinite(y)?{x,y}:null;}
__esmLocal3=position;

function tick(){
 try{
  if(!S.enabled||!owned()){S.last=null;S.reason='actor_not_ready';return;}
  if(excluded()){S.last=null;S.reason='excluded_tranh_ba_tu_phuong';return;}
  const map=Number(W._C?._Mn?._Cn?.currentID),pos=position(),now=Date.now();
  if(!pos||!Number.isFinite(map)||map<=0){S.last=null;S.reason='waiting_position';return;}
  if(S.last&&S.last.map===map){
   const dt=now-S.last.now;
   if(dt>=50&&dt<=3000){
    const dx=pos.x-S.last.x,dy=pos.y-S.last.y,dist=Math.hypot(dx,dy),speed=dist*1000/dt;
    if(Number.isFinite(speed)&&dist>0){
     const prior=S.history.at(-1);
     const reversal=prior&&prior.map===map&&prior.dist>0&&
       (dx*prior.dx+dy*prior.dy)<-0.75*dist*prior.dist;
     if(reversal)S.rollbacks++;
     S.distance+=dist;S.peakSpeed=Math.max(S.peakSpeed,speed);
     S.history.push({map,dtMs:dt,dist:Math.round(dist*100)/100,speedPerSec:Math.round(speed*100)/100,dx,dy,reversal:!!reversal});
     if(S.history.length>120)S.history.shift();
     S.samples++;S.reason='measuring';
    }
   }
  }
  S.last={...pos,now,map};
 }catch(e){S.error=String(e?.message??e);S.reason='error';}
}
__esmLocal4=tick;

function status(){const h=S.history.slice(-30),v=h.map(__captureESMFunction((__esmLocal6=(x=>x.speedPerSec)),"")),average=v.length?v.reduce(__captureESMFunction((__esmLocal7=((a,b)=>a+b)),""),0)/v.length:0;return {enabled:S.enabled,actorMatch:!!owned(),excluded:excluded(),pollMs:100,samples:S.samples,distanceObserved:Math.round(S.distance*100)/100,avgRecentSpeed:Math.round(average*100)/100,peakSpeed:S.peakSpeed,possibleReversals:S.rollbacks,reason:S.reason,error:S.error,readOnly:true,note:'Client-observed coordinates only: reversals can be ordinary turns; server speed acceptance cannot be proven without server data.'};}
__esmLocal5=status;

function report(){return {...status(),recent:S.history.slice(-60).map(__captureESMFunction((__esmLocal9=(x=>({...x}))),""))};}
__esmLocal8=report;

function stop(reason='stopped'){S.enabled=false;const clear=__getKVPV2()?.timers?.clearInterval??W.clearInterval;if(S.timer!=null&&typeof clear==='function')clear(S.timer);S.timer=null;S.reason=reason;}
__esmLocal10=stop;

W.KVPV_MOVEMENT_OBSERVER=Object.freeze({status,report,tick,stop});
const schedule=__getKVPV2()?.timers?.setInterval??W.setInterval;
if(typeof W.setInterval==='function'&&typeof schedule==='function')S.timer=schedule(tick,100);
tick();
})),""))();
}
export {getKVPV_MOVEMENT_OBSERVER} from '../api.mjs';
export const api=Object.freeze({
  get KVPV_MOVEMENT_OBSERVER(){return globalThis.KVPV_MOVEMENT_OBSERVER;},
});