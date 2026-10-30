/*
 * KVPV Golden Passive Proc — opt-in, read-only observation of two skills.
 * Bát Hoang Phá Thế 3021 -> damage id 3022
 * Xá Mệnh Nhất Kích 3031 -> damage id 3032
 * Native actor event 1039 (cast) and target event 1012 (damage).
 * These are CLIENT-OBSERVED signals, NOT a verified server proc probability.
 * No 8% -> 100% text patch, no skill[6] edit, no RPC, no combat hooks.
 */
(() => {
  'use strict';
  const W=window, KEY='KVPV_GOLDEN_PROC';
  try{W[KEY]?.stop?.('live_reload');}catch(_){}
  const actor=String(W.__KVPV_OWN_ACTOR_ID||'');
  const MAX_MS=180000,MAX_LOG=180,MERGE_MS=350;
  const PROCS=Object.freeze([
    {name:'Bát Hoang Phá Thế',skill:3021,damage:3022,level:2},
    {name:'Xá Mệnh Nhất Kích',skill:3031,damage:3032,level:2}
  ]);
  const now=()=>Date.now(),read=(fn,fallback=null)=>{
    try {const result=fn();return result==null?fallback:result;}catch(_){return fallback;}
  };
  const prop=(obj,key)=>read(()=>obj?.property?.get?.(key));
  const identify=obj=>String(prop(obj,'id')??obj?.id??'');
  const currentScene=()=>String(W._C?._Mn?._Cn?.currentID??W._Ba?._$a?._yo?.ins?.intoSce?.[0]??'');
  const own=()=>!!actor&&String(W._Ba?._rJ?._O$?.ins?.actorId??'')===actor&&!W.__KVPV_UNIVERSAL_HALTED;
  let session=null;

  function config(){
    const get=W._ft?._nY?.ins?.getCfgBySkillIdAndLv;
    const manager=W._ft?._nY?.ins;
    return PROCS.map(spec=>{
      const row=read(()=>get?.call(manager,spec.skill,spec.level));
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
  function stop(reason='manual'){
    const s=session;
    if(s&&s.active){
      s.active=false;s.reason=reason;
      for(const [obj,event,listener]of s.listeners)
        try{obj.off(event,s.owner,listener);}catch(_){}
      s.listeners=[];
    }
    return report();
  }
  function valid(){
    const s=session;
    if(!s||!s.active)return false;
    if(now()-s.startedAt>=MAX_MS){stop('three_minutes_elapsed');return false;}
    if(!own()||currentScene()!==s.scene||s.target.isValid===false||
       identify(s.target)!==s.targetId||
       read(()=>s.me.getComponent(W._d?._Yct?._Het)?.target)!==s.target){
      stop('actor_scene_or_target_changed');
      return false;
    }
    return true;
  }
  function buffSample(){
    const buffs=prop(session?.me,'buffs');
    if(!Array.isArray(buffs))return null;
    return buffs.slice(0,40).map(row=>Array.isArray(row)?
      row.slice(0,8).map(x=>typeof x==='number'||typeof x==='string'||typeof x==='boolean'?x:null):
      typeof row==='number'||typeof row==='string'?row:null);
  }
  function cast(target,skillId){
    if(!valid())return;
    if(String(target)!==session.targetId)return;
    const id=Number(skillId);
    if(!Number.isSafeInteger(id)||id<=0)return;
    session.castSignals++;
    // This denominator is only the observed native basic/Tuyệt Học cast
    // signals, NOT every eligible passive roll (server may also use other hits).
    if((id>=8001&&id<=8009)||(id>=1001&&id<=1008))
      session.commonAttackSignals++;
    if(session.castSignals<=20||session.castSignals%25===0)
      add('native_cast_signal',{skillId:id});
  }
  function hit(source,marker,damage,flags,receiver){
    if(!valid()||String(source)!==actor||String(receiver)!==session.targetId)return;
    const m=Number(marker),amount=Number(damage);
    if(!Number.isFinite(m)||!Number.isFinite(amount)||amount<=0)return;
    // Verified for the saved client observer: marker / 10000 = skill.
    const skill=m/10000;
    const spec=PROCS.find(p=>p.damage===skill);
    if(!spec)return;
    const t=now(),entry=session.stats[spec.damage];
    entry.rawDamageEvents++;
    entry.totalObservedDamage+=amount;
    const distinct=entry.lastAt==null||t-entry.lastAt>=MERGE_MS;
    if(distinct){
      if(entry.lastAt!=null)entry.intervalsMs.push(t-entry.lastAt);
      if(entry.intervalsMs.length>32)entry.intervalsMs.shift();
      entry.bursts++;entry.lastAt=t;
    }
    add('native_proc_damage_signal',{skillId:spec.damage,rawMarker:m,
      damage:amount,flags:Number(flags)||0,firstInMergedBurst:distinct,
      buffs:buffSample()});
  }
  function buff(){
    if(!valid())return;
    session.buffChangeEvents++;
    if(session.buffChangeEvents<=12||session.buffChangeEvents%20===0)
      add('native_buff_property_change',{buffs:buffSample()});
  }
  function subscribe(obj,event,fn){
    if(typeof obj?.on!=='function'||typeof obj?.off!=='function')
      throw Error('Native event subscription '+event+' unavailable');
    obj.on(event,session.owner,fn);
    session.listeners.push([obj,event,fn]);
  }
  function start(){
    if(session?.active&&valid())return report();
    if(!own())throw Error('Select the original game iframe / correct actor');
    const world=W._C?._Ba?.instance;
    const me=read(()=>world?.getRole?.(Number(actor)))??read(()=>world?.getRole?.(actor));
    const combat=read(()=>me?.getComponent?.(W._d?._Yct?._Het));
    const target=combat?.target;
    if(!me||!target||target.isValid===false||
       Number(prop(target,'type'))!==1||!identify(target))
      throw Error('Select an alive native monster/Boss target first');
    const hp=prop(target,'hp');
    if(Array.isArray(hp)&&Number(hp[0])<=0)
      throw Error('Target has no HP: select an alive Boss');
    stop('restarted');
    session={active:true,reason:'observing',startedAt:now(),scene:currentScene(),
      target,me,targetId:identify(target),targetName:String(prop(target,'name')??'').slice(0,100),
      castSignals:0,commonAttackSignals:0,buffChangeEvents:0,
      dropped:0,events:[],owner:{},listeners:[],
      stats:Object.fromEntries(PROCS.map(p=>[p.damage,{
        name:p.name,skillId:p.skill,damageId:p.damage,
        rawDamageEvents:0,bursts:0,lastAt:null,intervalsMs:[],totalObservedDamage:0
      }]))};
    try{
      subscribe(me,1039,cast);
      subscribe(target,1012,hit);
      // Optional buff observation; other live versions may lack this event.
      if(typeof me.property?.on==='function'&&typeof me.property?.off==='function')
        subscribe(me.property,'buffs',buff);
      add('observation_started',{buffs:buffSample()});
    }catch(e){stop('subscribe_failed');throw e;}
    return report();
  }
  function report(){
    if(session?.active)valid();
    const s=session;
    const procs=PROCS.map(spec=>{
      const data=s?.stats[spec.damage];
      const timings=data?.intervalsMs??[];
      return {name:spec.name,skillId:spec.skill,damageId:spec.damage,
        rawDamageEvents:data?.rawDamageEvents??0,
        observedBursts:data?.bursts??0,observedDamage:data?.totalObservedDamage??0,
        shortestBurstGapMs:timings.length?Math.min(...timings):null,
        gapsMs:timings.slice(-16),
        burstCountPer100ObservedBasicTH:
          s?.commonAttackSignals>0?Math.round(10000*(data?.bursts??0)/s.commonAttackSignals)/100:null};
    });
    return JSON.parse(JSON.stringify({
      version:1,active:s?.active===true,reason:s?.reason??'not_started',
      actorMatches:own(),map:s?.scene??null,target:s?.targetName??null,
      startedAt:s?.startedAt??null,elapsedMs:s?now()-s.startedAt:0,
      maxObserveMs:MAX_MS,commonAttackSignals:s?.commonAttackSignals??0,
      allNativeCastSignals:s?.castSignals??0,buffPropertyChangeEvents:s?.buffChangeEvents??0,
      procs,config:config(),events:s?.events.slice(-MAX_LOG)??[],dropped:s?.dropped??0,
      interpretation:'1039 is client native cast signal. 1012 skill marker may be 3022/3032. '+
       'Each 350ms group is an approximate observed proc BURST, not proven independent activation. '+
       'Ratio to basic/TH native casts is NOT the 8% server RNG chance. '+
       'Missing hits and secondary attacks are not counted. No 100% override was applied. '+
       'This records server-fed client effects but does not prove server-side formula or Hữu Thần Trợ stacking.',
      safety:'Read-only event subscriptions: never changes skill configuration, cooldown, combat, animation, or sends RPC.'
    }));
  }
  W[KEY]=Object.freeze({version:1,start,stop,status:report,report,
    export:()=>JSON.stringify(report(),null,2)});
})();
