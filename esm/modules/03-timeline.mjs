import {getKVPV_DAILY as __getKVPV0} from '../api.mjs';
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
let __esmLocal21;
let __esmLocal22;
let __esmLocal23;
export {__esmLocal0 as local_anonymous_10_1_0};
export {__esmLocal1 as local_two_1};
export {__esmLocal2 as local_parseMinute_2};
export {__esmLocal3 as local_dayAt_3};
export {__esmLocal4 as local_anonymous_60_76_4};
export {__esmLocal5 as local_setSchedule_5};
export {__esmLocal6 as local_setReadiness_6};
export {__esmLocal7 as local_enabledFor_7};
export {__esmLocal8 as local_isReady_8};
export {__esmLocal9 as local_occurrences_9};
export {__esmLocal10 as local_anonymous_174_13_10};
export {__esmLocal11 as local_activeAuto_11};
export {__esmLocal12 as local_usable_12};
export {__esmLocal13 as local_anonymous_198_22_13};
export {__esmLocal14 as local_anonymous_198_62_14};
export {__esmLocal15 as local_reservation_15};
export {__esmLocal16 as local_anonymous_214_36_16};
export {__esmLocal17 as local_status_17};
export {__esmLocal18 as local_anonymous_254_24_18};
export {__esmLocal19 as local_anonymous_254_52_19};
export {__esmLocal20 as local_anonymous_256_26_20};
export {__esmLocal21 as local_anonymous_256_71_21};
export {__esmLocal22 as local_start_22};
export {__esmLocal23 as local_stop_23};
export function initialize(){





/* V10.2: pure timetable planner / no timer, RPC, scene transition, or reward request.
 * Uses the authoritative EVENT_SCHEDULE from the existing Daily closure.
 */

(__captureESMFunction((__esmLocal0=(() => {

  'use strict';

  const W=window,NS=W.KVPV||(W.KVPV={});

  if(NS.timeline?.version==='10.2.2')return;

  const config={enabled:true, activeHoldMs:90000, maxPreview:12,

    leadMinutes:{

      honghoang:10, tam_tien:5, dao_nguyen:5, tien_ton:5, vinh_du:20, tu_la:15,

      tranh_ba_dinh_cao:5, tientuyen:5, lanhdia:4

    }};

  const flags={tam_tien:'enableQuizAuto',honghoang:'enableHongHoang',dao_nguyen:'enableDaoTri',tien_ton:'enableTienTonAuto',

    vinh_du:'enableVinhDu',tu_la:'enableTuLa',

    tranh_ba_dinh_cao:'enableDinhCao'};

  const automatic=new Set(Object.keys(config.leadMinutes));

  let registered=[],readiness=null;

  const VN_FORMATTER=new Intl.DateTimeFormat('en-GB',{

    timeZone:'Asia/Ho_Chi_Minh',hourCycle:'h23',

    year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit'

  });

  const two=__captureESMFunction((__esmLocal1=(v=>String(v).padStart(2,'0'))),"two");

  

  function parseMinute(t){

    if(!/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(String(t)))return null;

    const [h,m]=t.split(':').map(Number);return h*60+m;

  }
__esmLocal2=parseMinute;


  function dayAt(ms){

    const p=Object.fromEntries(VN_FORMATTER.formatToParts(new Date(ms)).map(__captureESMFunction((__esmLocal4=(x=>[x.type,x.value])),"")));

    const y=Number(p.year),mo=Number(p.month),d=Number(p.day);

    const minute=Number(p.hour)*60+Number(p.minute);

    const wallDay=Date.UTC(y,mo-1,d);

    return {minute,epochMinute:wallDay/60000+minute+Number(p.second)/60,

      date:wallDay,weekday:new Date(wallDay).getUTCDay(),

      key:`${p.year}-${p.month}-${p.day}`,hhmm:two(p.hour)+':'+two(p.minute)};

  }
__esmLocal3=dayAt;


  

  function setSchedule(source){

    if(!Array.isArray(source))return false;

    const next=[];

    for(const item of source){

      if(!item||typeof item.key!=='string')continue;

      for(const slot of item.slots||[]){

        const [start,end,...extra]=String(slot).split('-');

        const a=parseMinute(start),b=parseMinute(end);

        if(extra.length||a===null||b===null||a===b)continue;

        next.push({key:item.key,name:String(item.name||item.key),

          from:a,to:b,display:slot,action:item.action||'notice',

          days:Array.isArray(item.days)?item.days.slice():null,

          priority:Number(item.priority)||10,unlock:item.unlock||null});

      }

    }

    registered=next;return true;

  }
__esmLocal5=setSchedule;


  

  function setReadiness(checker){readiness=typeof checker==='function'?checker:null;}
__esmLocal6=setReadiness;


  function enabledFor(slot,cfg){

    if(!automatic.has(slot.key)||slot.action!=='auto')return false;

    // Do not make reservations before the Daily config is available.

    if(!cfg || typeof cfg!=='object')return false;

    const flag=flags[slot.key];if(flag&&cfg[flag]===false)return false;

    return true;

  }
__esmLocal7=enabledFor;


  function isReady(key){
    // An exhausted native Tien Ton quota must not reserve the scene until closing time.
    if(key==='tien_ton'){
      const score=W._Ba?._Xit?._nst?.inst?.ttiScore;
      const left=Array.isArray(score)?Number(score[3]):NaN;
      if(Number.isFinite(left)&&left<=0)return false;
    }

    if(!readiness)return true;

    try{return readiness(key)!==false;}

    catch(_){return false;}

  }
__esmLocal8=isReady;


  

  function occurrences(atMs=Date.now(),cfg=null){

    const clock=dayAt(atMs),all=[];

    for(const s of registered){

      if(!enabledFor(s,cfg))continue;

      for(const offset of [-1,0,1]){

        const base=clock.date+offset*86400000;

        const weekday=new Date(base).getUTCDay();

        if(s.days&&!s.days.includes(weekday))continue;

        const a=base/60000+s.from;

        const b=base/60000+s.to+(s.to<s.from?1440:0);

        all.push({...s,start:a,end:b,day:new Date(base).toISOString().slice(0,10)});

      }

    }

    all.sort(__captureESMFunction((__esmLocal10=((a,b)=>a.start-b.start||a.priority-b.priority||a.key.localeCompare(b.key))),""));

    return {clock,all};

  }
__esmLocal9=occurrences;


  function activeAuto({atMs=Date.now(),flags:cfg=null}={}){

    if(!config.enabled)return [];

    const {clock,all}=occurrences(atMs,cfg),n=clock.epochMinute;

    // Read potentially expensive game models only for events active NOW.

    const readinessCache=new Map();

    const usable=__captureESMFunction((__esmLocal12=(e=>{

      if(!readinessCache.has(e.key))readinessCache.set(e.key,isReady(e.key));

      return readinessCache.get(e.key);

    })),"usable");

    return all.filter(__captureESMFunction((__esmLocal13=(x=>n>=x.start&&n<x.end&&usable(x))),"")).sort(__captureESMFunction((__esmLocal14=((a,b)=>

      a.end-b.end||a.priority-b.priority||a.start-b.start||a.key.localeCompare(b.key))),""));

  }
__esmLocal11=activeAuto;


  

  function reservation({atMs=Date.now(),flags:cfg=null,excludeKeys=[],forTask='long'}={}){

    if(!config.enabled||!['long','combat','stage','honghoang'].includes(forTask))return null;

    const {clock,all}=occurrences(atMs,cfg),n=clock.epochMinute;

    const skips=new Set(excludeKeys);

    for(const e of all.slice().sort(__captureESMFunction((__esmLocal16=((a,b)=>{

      const activeA=n>=a.start&&n<a.end,activeB=n>=b.start&&n<b.end;

      return Number(activeB)-Number(activeA)||(activeA?a.end-b.end:a.start-b.start)||

        a.priority-b.priority||a.key.localeCompare(b.key);

    })),""))){

      if(skips.has(e.key) || (forTask===e.key))continue;

      const lead=Math.max(0,Math.min(30,Number(config.leadMinutes[e.key])||0));

      const active=n>=e.start && n<e.end;

      const soon=n<e.start && (e.start-n)<=lead;

      // Never freeze general gameplay for an entire event if entry is unavailable.

      const earlyActive=active;

      // Avoid scanning heavy model/config tables outside the reservation window.

      if((soon||earlyActive)&&isReady(e.key))return {key:e.key,name:e.name,time:e.display,

        phase:soon?'upcoming':'opening',minutesUntil:Math.max(0,e.start-n),

        day:e.day,reason:'Reserve scene for scheduled event'};

    }

    return null;

  }
__esmLocal15=reservation;


  

  function status(atMs=Date.now(),cfg=__getKVPV0()?.config||null){

    const {clock,all}=occurrences(atMs,cfg),n=clock.epochMinute;

    return {version:'10.2.2',enabled:config.enabled,scheduleLoaded:registered.length>0,

      eventSlots:registered.length,vietnamDate:clock.key,vietnamTime:clock.hhmm,

      reservation:reservation({atMs,flags:cfg}),

      active:all.filter(__captureESMFunction((__esmLocal18=(e=>n>=e.start&&n<e.end)),"")).map(__captureESMFunction((__esmLocal19=(e=>({key:e.key,name:e.name,slot:e.display}))),"")),

      upcoming:all.filter(__captureESMFunction((__esmLocal20=(e=>e.start>n)),"")).slice(0,config.maxPreview).map(__captureESMFunction((__esmLocal21=(e=>({

        key:e.key,name:e.name,slot:e.display,day:e.day,minutesUntil:Math.ceil(e.start-n)}))),""))};

  }
__esmLocal17=status;


  NS.timeline=Object.freeze({version:'10.2.2',config,setSchedule,setReadiness,

    activeAuto,reservation,status,start(){
__esmLocal22=__captureESMMethod(this,"start","init");
config.enabled=true;return status();},

    stop(){
__esmLocal23=__captureESMMethod(this,"stop","init");
config.enabled=false;return status();}});

  // Daily loads before the timeline, so complete its deferred registration now.
  __getKVPV0()?.configureTimeline?.();

})),""))();


}
export const api=Object.freeze({
});