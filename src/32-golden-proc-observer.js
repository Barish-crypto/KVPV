/*
 * KVPV Golden Passive Proc v2 — read-only observer, no RNG/cooldown edits.
 * 1039: owned actor's native cast signals.
 * 1012: damage signals on up to 6 previously selected native monsters.
 * Supports changing/dying monsters within ONE scene without stopping.
 * Does NOT observe every AoE victim, does NOT calculate true server RNG.
 */
(() => {
  'use strict';
  const W=window,KEY='KVPV_GOLDEN_PROC';
  try{W[KEY]?.stop?.('live_reload');}catch(_){}
  const actor=String(W.__KVPV_OWN_ACTOR_ID||'');
  const MAX_MS=180000,MAX_LOG=180,MAX_TARGETS=6,MERGE_MS=350;
  const PROCS=Object.freeze([
    {name:'Bát Hoang Phá Thế',skill:3021,damage:3022,level:2},
    {name:'Xá Mệnh Nhất Kích',skill:3031,damage:3032,level:2}
  ]);
  const now=()=>Date.now(),read=(fn,fallback=null)=>{
    try{const v=fn();return v==null?fallback:v;}catch(_){return fallback;}
  };
  const prop=(obj,key)=>read(()=>obj?.property?.get?.(key));
  const identify=obj=>String(prop(obj,'id')??obj?.id??'');
  const currentScene=()=>String(W._C?._Mn?._Cn?.currentID??W._Ba?._$a?._yo?.ins?.intoSce?.[0]??'');
  const own=()=>!!actor&&String(W._Ba?._rJ?._O$?.ins?.actorId??'')===actor&&!W.__KVPV_UNIVERSAL_HALTED;
  let session=null;

  function config(){
    const manager=W._ft?._nY?.ins;
    return PROCS.map(spec=>{
      const row=read(()=>manager?.getCfgBySkillIdAndLv?.(spec.skill,spec.level));
      return {name:spec.name,skillId:spec.skill,damageId:spec.damage,
        level:spec.level,recordId:Array.isArray(row)?row[0]:null,
        clientCooldownMs:Array.isArray(row)?row[6]:null,
        description:Array.isArray(row)&&typeof row[9]?.[0]==='string'?
          row[9][0].slice(0,240):null};
    });
  }
  function add(type,data){
    if(!session)return;
    session.events.push({at:now(),type,...data});
    if(session.events.length>MAX_LOG){session.events.shift();session.dropped++;}
  }
  function unsubscribe(s,item){
    try{item.obj.off(item.event,s.owner,item.fn);}catch(_){}
  }
  function stop(reason='manual'){
    const s=session;
    if(s&&s.active){
      s.active=false;s.reason=reason;
      for(const item of s.listeners)unsubscribe(s,item);
      for(const item of s.targets)unsubscribe(s,item);
      s.listeners=[];s.targets=[];
    }
    return report();
  }
  function valid(){
    const s=session;
    if(!s||!s.active)return false;
    if(now()-s.startedAt>=MAX_MS){stop('three_minutes_elapsed');return false;}
    if(!own()||currentScene()!==s.scene){
      stop('actor_or_scene_changed');return false;
    }
    return true;
  }
  function buffSample(){
    const buffs=prop(session?.me,'buffs');
    if(!Array.isArray(buffs))return null;
    return buffs.slice(0,40).map(row=>Array.isArray(row)?
      row.slice(0,8).map(x=>['number','string','boolean'].includes(typeof x)?x:null):
      typeof row==='number'||typeof row==='string'?row:null);
  }
  function nativeTarget(){
    return read(()=>session?.me?.getComponent?.(W._d?._Yct?._Het)?.target);
  }
  function eligible(target){
    if(!target||target.isValid===false||Number(prop(target,'type'))!==1||!identify(target))
      return false;
    const hp=prop(target,'hp');
    return !Array.isArray(hp)||Number(hp[0])>0;
  }
  function subscribe(obj,event,fn){
    if(typeof obj?.on!=='function'||typeof obj?.off!=='function')
      throw Error('Native event subscription '+event+' unavailable');
    obj.on(event,session.owner,fn);
    session.listeners.push({obj,event,fn});
  }
  function bindTarget(target){
    const s=session;
    const id=identify(target);
    // Avoid attaching a second listener to the same native object.
    const old=s.targets.find(item=>item.obj===target);
    if(old)return old;
    if(typeof target?.on!=='function'||typeof target?.off!=='function'){
      s.unobservableTargets++;
      add('target_has_no_native_damage_events',{targetId:id});
      return null;
    }
    const fn=(source,marker,damage,flags,receiver)=>hit(id,source,marker,damage,flags,receiver);
    target.on(1012,s.owner,fn);
    const item={obj:target,event:1012,fn,id,name:String(prop(target,'name')??'').slice(0,100)};
    s.targets.push(item);s.targetBindings++;
    if(s.targets.length>MAX_TARGETS)unsubscribe(s,s.targets.shift());
    add('target_bound',{targetId:id,targetName:item.name});
    return item;
  }
  function syncTarget(){
    const s=session;
    if(!s?.active)return;
    const target=nativeTarget();
    if(!eligible(target)){
      s.selectedTargetId=null;
      return; // Killed/lost target is NOT an observer-session failure.
    }
    const id=identify(target);
    if(s.selectedTargetId!==id){
      if(s.lastDistinctTargetId!=null&&s.lastDistinctTargetId!==id)s.targetSwitches++;
      s.lastDistinctTargetId=id;
      s.selectedTargetId=id;s.lastTargetName=String(prop(target,'name')??'').slice(0,100);
      s.seenTargetIds.add(id);
      add('native_target_selected',{targetId:id,targetName:s.lastTargetName,
        targetSwitches:s.targetSwitches});
    }
    try{bindTarget(target);}catch(e){
      s.lastError=String(e?.message||e);
      add('target_bind_error',{targetId:id,error:s.lastError});
    }
  }
  function cast(targetId,skillId){
    if(!valid())return;
    syncTarget(); // Rebind after normal kills/target switches, no timer.
    const s=session;
    if(!s.selectedTargetId||String(targetId)!==s.selectedTargetId)return;
    const id=Number(skillId);
    if(!Number.isSafeInteger(id)||id<=0)return;
    s.castSignals++;
    if((id>=8001&&id<=8009)||(id>=1001&&id<=1008))
      s.commonAttackSignals++;
    if(s.castSignals<=20||s.castSignals%25===0)
      add('native_cast_signal',{skillId:id,targetId:s.selectedTargetId});
  }
  function hit(targetId,source,marker,damage,flags,receiver){
    if(!valid())return;
    const s=session;
    s.nativeDamageSignals++;
    if(String(receiver)!==targetId){s.receiverMismatchSignals++;return;}
    if(String(source)!==actor){s.otherSourceSignals++;return;}
    s.ownedDamageSignals++;
    const m=Number(marker),amount=Number(damage);
    if(!Number.isFinite(m)||!Number.isFinite(amount)||amount<=0)return;
    const id=Number.isSafeInteger(m/10000)?String(m/10000):'other';
    if(s.markerHistogram.has(id)||s.markerHistogram.size<24)
      s.markerHistogram.set(id,(s.markerHistogram.get(id)||0)+1);
    else s.otherMarkerCount++;
    if(s.ownedDamageSignals<=8||s.ownedDamageSignals%50===0)
      add('owned_damage_marker_sample',{targetId,marker:m,markerSkillId:m/10000,amount});
    const skill=m/10000, spec=PROCS.find(p=>p.damage===skill);
    if(!spec)return;
    const t=now(),entry=s.stats[spec.damage];
    entry.rawDamageEvents++;entry.totalObservedDamage+=amount;
    const distinct=entry.lastAt==null||t-entry.lastAt>=MERGE_MS;
    if(distinct){
      if(entry.lastAt!=null)entry.intervalsMs.push(t-entry.lastAt);
      if(entry.intervalsMs.length>32)entry.intervalsMs.shift();
      entry.bursts++;entry.lastAt=t;
    }
    add('native_proc_damage_signal',{skillId:spec.damage,targetId,
      rawMarker:m,damage:amount,flags:Number(flags)||0,
      firstInMergedBurst:distinct,buffs:buffSample()});
  }
  function buff(){
    if(!valid())return;
    syncTarget();
    session.buffChangeEvents++;
    if(session.buffChangeEvents<=12||session.buffChangeEvents%20===0)
      add('native_buff_property_change',{buffs:buffSample()});
  }
  function start(){
    if(session?.active&&valid()){syncTarget();return report();}
    if(!own())throw Error('Select the original game iframe / correct actor');
    const world=W._C?._Ba?.instance;
    const me=read(()=>world?.getRole?.(Number(actor)))??read(()=>world?.getRole?.(actor));
    const target=read(()=>me?.getComponent?.(W._d?._Yct?._Het)?.target);
    if(!me||!eligible(target))throw Error('Select a living native monster/Boss first');
    stop('restarted');
    session={active:true,reason:'observing',startedAt:now(),scene:currentScene(),
      me,selectedTargetId:null,lastDistinctTargetId:null,lastTargetName:null,seenTargetIds:new Set(),
      castSignals:0,commonAttackSignals:0,buffChangeEvents:0,
      nativeDamageSignals:0,ownedDamageSignals:0,otherSourceSignals:0,
      receiverMismatchSignals:0,markerHistogram:new Map(),otherMarkerCount:0,
      targetSwitches:0,targetBindings:0,unobservableTargets:0,lastError:'',
      dropped:0,events:[],owner:{},listeners:[],targets:[],
      stats:Object.fromEntries(PROCS.map(p=>[p.damage,{
        name:p.name,skillId:p.skill,damageId:p.damage,
        rawDamageEvents:0,bursts:0,lastAt:null,intervalsMs:[],totalObservedDamage:0
      }]))};
    try{
      subscribe(me,1039,cast);
      if(typeof me.property?.on==='function'&&typeof me.property?.off==='function')
        subscribe(me.property,'buffs',buff);
      syncTarget();
      if(!session.targets.length)throw Error('Selected native target lacks event 1012');
      add('observation_started',{buffs:buffSample()});
    }catch(e){stop('subscribe_failed');throw e;}
    return report();
  }
  function report(){
    if(session?.active&&valid())syncTarget();
    const s=session;
    const procs=PROCS.map(spec=>{
      const data=s?.stats[spec.damage],timings=data?.intervalsMs??[];
      return {name:spec.name,skillId:spec.skill,damageId:spec.damage,
        rawDamageEvents:data?.rawDamageEvents??0,
        observedBursts:data?.bursts??0,observedDamage:data?.totalObservedDamage??0,
        shortestBurstGapMs:timings.length?Math.min(...timings):null,
        gapsMs:timings.slice(-16),
        burstCountPer100ObservedBasicTH:
          s?.commonAttackSignals>0?Math.round(10000*(data?.bursts??0)/s.commonAttackSignals)/100:null};
    });
    return JSON.parse(JSON.stringify({
      version:2,active:s?.active===true,reason:s?.reason??'not_started',
      actorMatches:own(),map:s?.scene??null,target:s?.lastTargetName??null,
      selectedTargetId:s?.selectedTargetId??null,
      trackedTargetIds:s?.targets.map(t=>t.id)??[],targetSwitches:s?.targetSwitches??0,
      targetsSeen:s?.seenTargetIds.size??0,targetBindings:s?.targetBindings??0,
      unobservableTargets:s?.unobservableTargets??0,lastError:s?.lastError??'',
      nativeDamageSignals:s?.nativeDamageSignals??0,
      ownedDamageSignals:s?.ownedDamageSignals??0,
      otherSourceSignals:s?.otherSourceSignals??0,
      receiverMismatchSignals:s?.receiverMismatchSignals??0,
      markerHistogram:s?Object.fromEntries(s.markerHistogram):{},
      otherMarkerCount:s?.otherMarkerCount??0,
      startedAt:s?.startedAt??null,elapsedMs:s?now()-s.startedAt:0,
      maxObserveMs:MAX_MS,commonAttackSignals:s?.commonAttackSignals??0,
      allNativeCastSignals:s?.castSignals??0,buffPropertyChangeEvents:s?.buffChangeEvents??0,
      procs,config:config(),events:s?.events.slice(-MAX_LOG)??[],dropped:s?.dropped??0,
      interpretation:'Supports native target changes within one scene. 1039 is client cast signal; 1012 marker may be 3022/3032. '+
        'At most six previously selected monsters are observed, NOT all AoE victims. '+
        'Owned damage marker histogram can show whether 1012 events are received at all; absence does not prove proc failure. '+
        '350ms merged damage bursts are not verified independent procs. '+
        'Burst/cast ratio is NOT the 8% server RNG probability. '+
        'No 100% override, no server formula or Hữu Thần Trợ amplification claim.',
      safety:'Read-only native event subscriptions; no timer, RPC, combat hook, skill config or cooldown changes.'
    }));
  }
  W[KEY]=Object.freeze({version:2,start,stop,status:report,report,
    export:()=>JSON.stringify(report(),null,2)});
})();
