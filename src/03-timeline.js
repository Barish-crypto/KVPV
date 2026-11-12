




/* V10.2: pure timetable planner / no timer, RPC, scene transition, or reward request.
 * Uses the authoritative EVENT_SCHEDULE from the existing Daily closure.
 */

(() => {

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

  const two=v=>String(v).padStart(2,'0');

  

  function parseMinute(t){

    if(!/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(String(t)))return null;

    const [h,m]=t.split(':').map(Number);return h*60+m;

  }

  function dayAt(ms){

    const p=Object.fromEntries(VN_FORMATTER.formatToParts(new Date(ms)).map(x=>[x.type,x.value]));

    const y=Number(p.year),mo=Number(p.month),d=Number(p.day);

    const minute=Number(p.hour)*60+Number(p.minute);

    const wallDay=Date.UTC(y,mo-1,d);

    return {minute,epochMinute:wallDay/60000+minute+Number(p.second)/60,

      date:wallDay,weekday:new Date(wallDay).getUTCDay(),

      key:`${p.year}-${p.month}-${p.day}`,hhmm:two(p.hour)+':'+two(p.minute)};

  }

  

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

  

  function setReadiness(checker){readiness=typeof checker==='function'?checker:null;}

  function enabledFor(slot,cfg){

    if(!automatic.has(slot.key)||slot.action!=='auto')return false;

    // Do not make reservations before the Daily config is available.

    if(!cfg || typeof cfg!=='object')return false;

    const flag=flags[slot.key];if(flag&&cfg[flag]===false)return false;

    return true;

  }

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

    all.sort((a,b)=>a.start-b.start||a.priority-b.priority||a.key.localeCompare(b.key));

    return {clock,all};

  }

  function activeAuto({atMs=Date.now(),flags:cfg=null}={}){

    if(!config.enabled)return [];

    const {clock,all}=occurrences(atMs,cfg),n=clock.epochMinute;

    // Read potentially expensive game models only for events active NOW.

    const readinessCache=new Map();

    const usable=e=>{

      if(!readinessCache.has(e.key))readinessCache.set(e.key,isReady(e.key));

      return readinessCache.get(e.key);

    };

    return all.filter(x=>n>=x.start&&n<x.end&&usable(x)).sort((a,b)=>

      a.start-b.start||a.priority-b.priority||a.key.localeCompare(b.key));

  }

  

  function reservation({atMs=Date.now(),flags:cfg=null,excludeKeys=[],forTask='long'}={}){

    if(!config.enabled||!['long','combat','stage','honghoang'].includes(forTask))return null;

    const {clock,all}=occurrences(atMs,cfg),n=clock.epochMinute;

    const skips=new Set(excludeKeys);

    for(const e of all.slice().sort((a,b)=>Number(n>=b.start&&n<b.end)-Number(n>=a.start&&n<a.end)||a.start-b.start||a.priority-b.priority)){

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

  

  function status(atMs=Date.now(),cfg=W.KVPV_DAILY?.config||null){

    const {clock,all}=occurrences(atMs,cfg),n=clock.epochMinute;

    return {version:'10.2.2',enabled:config.enabled,scheduleLoaded:registered.length>0,

      eventSlots:registered.length,vietnamDate:clock.key,vietnamTime:clock.hhmm,

      reservation:reservation({atMs,flags:cfg}),

      active:all.filter(e=>n>=e.start&&n<e.end).map(e=>({key:e.key,name:e.name,slot:e.display})),

      upcoming:all.filter(e=>e.start>n).slice(0,config.maxPreview).map(e=>({

        key:e.key,name:e.name,slot:e.display,day:e.day,minutesUntil:Math.ceil(e.start-n)}))};

  }

  NS.timeline=Object.freeze({version:'10.2.2',config,setSchedule,setReadiness,

    activeAuto,reservation,status,start(){config.enabled=true;return status();},

    stop(){config.enabled=false;return status();}});

  // Daily loads before the timeline, so complete its deferred registration now.
  W.KVPV_DAILY?.configureTimeline?.();

})();

