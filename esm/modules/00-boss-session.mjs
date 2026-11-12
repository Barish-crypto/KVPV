import {getKVPV_BOSS_LOG as __getKVPV0,getKVPV_V1 as __getKVPV1} from '../api.mjs';
export function call_KVPV_BOSS_LOG_start(...args){const target=globalThis["KVPV_BOSS_LOG"];const fn=globalThis["KVPV_BOSS_LOG"]?.["start"];if(typeof fn!=='function')throw Error("KVPV_BOSS_LOG.start is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_BOSS_LOG_stop(...args){const target=globalThis["KVPV_BOSS_LOG"];const fn=globalThis["KVPV_BOSS_LOG"]?.["stop"];if(typeof fn!=='function')throw Error("KVPV_BOSS_LOG.stop is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_BOSS_LOG_status(...args){const target=globalThis["KVPV_BOSS_LOG"];const fn=globalThis["KVPV_BOSS_LOG"]?.["status"];if(typeof fn!=='function')throw Error("KVPV_BOSS_LOG.status is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_BOSS_LOG_report(...args){const target=globalThis["KVPV_BOSS_LOG"];const fn=globalThis["KVPV_BOSS_LOG"]?.["report"];if(typeof fn!=='function')throw Error("KVPV_BOSS_LOG.report is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_BOSS_LOG_export(...args){const target=globalThis["KVPV_BOSS_LOG"];const fn=globalThis["KVPV_BOSS_LOG"]?.["export"];if(typeof fn!=='function')throw Error("KVPV_BOSS_LOG.export is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_BOSS_LOG__record(...args){const target=globalThis["KVPV_BOSS_LOG"];const fn=globalThis["KVPV_BOSS_LOG"]?.["_record"];if(typeof fn!=='function')throw Error("KVPV_BOSS_LOG._record is not available");return Reflect.apply(fn,target,args);}
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
export {__esmLocal0 as local_anonymous_8_1_0};
export {__esmLocal1 as local_append_1};
export {__esmLocal2 as local_record_2};
export {__esmLocal3 as local_event_3};
export {__esmLocal4 as local_status_4};
export {__esmLocal5 as local_report_5};
export {__esmLocal6 as local_anonymous_82_32_6};
export {__esmLocal7 as local_anonymous_86_94_7};
export {__esmLocal8 as local_anonymous_88_41_8};
export {__esmLocal9 as local_anonymous_90_37_9};
export {__esmLocal10 as local_anonymous_92_42_10};
export {__esmLocal11 as local_start_11};
export {__esmLocal12 as local_stop_12};
export {__esmLocal13 as local_export_13};
export function initialize(){





/* Optional, bounded combat trace. No timer, attack, movement or network calls. */

(__captureESMFunction((__esmLocal0=(() => {

  'use strict';

  const W=window, MAX_SAMPLES=7200, MAX_EVENTS=600, SAMPLE_MS=500;

  let recording=false,startedAt=null,endedAt=null,lastSampleAt=-Infinity,last=null;

  let samples=[],events=[],droppedSamples=0,droppedEvents=0;

  function append(list,item,limit){list.push(item);if(list.length>limit){list.shift();return true;}return false;}
__esmLocal1=append;


  function record(kind,data={}) {

    if(!recording)return;

    const item={at:Date.now(),tickMs:data.tickMs,phase:data.phase,hp:data.hp,hpMax:data.hpMax,

      hpPct:data.hpPct,bossId:data.bossId,bossHP:data.bossHP,bossHPMax:data.bossHPMax,

      distance:data.distance,bossRange:data.bossRange,configuredRange:data.configuredRange,

      observedDangerRadius:data.observedDangerRadius,rangeKnown:data.rangeKnown,

      ring:data.ring,player:data.player?{x:data.player.x,y:data.player.y}:null,

      boss:data.boss?{x:data.boss.x,y:data.boss.y}:null,

      waypoint:data.waypoint?{x:data.waypoint.x,y:data.waypoint.y}:null};

    function event(type,detail){if(append(events,{...item,type,detail},MAX_EVENTS))droppedEvents++;}
__esmLocal3=event;


    const sameBoss=last&&last.bossId===item.bossId;

    if(last && (!sameBoss||last.phase!==item.phase)){

      event('transition',String(last.phase)+' -> '+String(item.phase));

      if(sameBoss&&last.phase==='RETREAT'&&item.phase==='FIGHT'&&item.hp<item.hpMax)

        event('early-return','Returned before full HP');

    }

    const hpNoise=Math.max(1e-9,(Number(item.hpMax)||0)*1e-8);

    if(sameBoss&&item.phase==='RETREAT'&&Number.isFinite(item.hp)&&item.hp<last.hp-hpNoise)

      event('hp-drop-retreat','HP decreased during recovery; source not inferred');

    if(kind!=='sample')event(kind,String(data.detail??'').slice(0,400));

    if(item.at-lastSampleAt>=SAMPLE_MS||!last||!sameBoss||last.phase!==item.phase){

      if(append(samples,item,MAX_SAMPLES))droppedSamples++;

      lastSampleAt=item.at;

    }

    last=item;

  }
__esmLocal2=record;


  

  function status(){return {recording,startedAt,endedAt,samples:samples.length,events:events.length,

    droppedSamples,droppedEvents,last:last?JSON.parse(JSON.stringify(last)):null};}
__esmLocal4=status;


  

  function report(){

    const returns=events.filter(__captureESMFunction((__esmLocal6=(x=>x.type==='transition'&&x.detail==='RETREAT -> FIGHT')),""));

    return {version:'1.0.0',build:__getKVPV1()?.build??null,status:status(),summary:{

      scope:'retained events only',completedReturns:returns.length,earlyReturns:events.filter(__captureESMFunction((__esmLocal7=(x=>x.type==='early-return')),"")).length,

      hpDropsDuringRetreat:events.filter(__captureESMFunction((__esmLocal8=(x=>x.type==='hp-drop-retreat')),"")).length,

      movementCommands:events.filter(__captureESMFunction((__esmLocal9=(x=>x.type==='move')),"")).length,

      bossHitsDuringRetreat:events.filter(__captureESMFunction((__esmLocal10=(x=>x.type==='boss-hit'&&x.phase==='RETREAT')),"")).length},

      interpretation:'Client observations; HP drops and distance do not prove server hit range or damage source.',

      samples:JSON.parse(JSON.stringify(samples)),events:JSON.parse(JSON.stringify(events))};

  }
__esmLocal5=report;


  W.KVPV_BOSS_LOG=Object.freeze({

    start(){
__esmLocal11=__captureESMMethod(this,"start","init");
recording=true;startedAt=Date.now();endedAt=null;lastSampleAt=-Infinity;

      last=null;samples=[];events=[];droppedSamples=0;droppedEvents=0;return status();},

    stop(){
__esmLocal12=__captureESMMethod(this,"stop","init");
recording=false;endedAt=Date.now();return status();},status,report,

    export(){
__esmLocal13=__captureESMMethod(this,"export","init");
return JSON.stringify(report(),null,2);},_record:record

  });

})),""))();


}
export {getKVPV_BOSS_LOG} from '../api.mjs';
export const api=Object.freeze({
  get KVPV_BOSS_LOG(){return globalThis.KVPV_BOSS_LOG;},
});