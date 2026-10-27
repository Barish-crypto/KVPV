(() => {
  'use strict';
  const W=window;W.KVPV_BOSS_SCOUT?.stop?.();
  if(W.KVPV_MELEE_TRIAL?.status?.().running)W.KVPV_MELEE_TRIAL.restore('Dừng áp sát để đọc Boss');
  const actor=String(W.__KVPV_OWN_ACTOR_ID||''),user=()=>W._Ba?._rJ?._O$?.ins;
  if(!actor||String(user()?.actorId||'')!==actor)throw Error('Chọn đúng game-frame đã nạp FULL.');
  const me=W._C?._Ba?.instance?.getRole?.(Number(actor)),Comp=W._d?._Yct?._Het,Sel=W._d?._Yct?._Eet;
  const boss=me?.getComponent?.(Comp)?.target,prop=(o,k)=>o?.property?.get?.(k),id=o=>String(prop(o,'id')??o?.id??'');
  const confirmed=W._ft?._tY?.ins?.isBoss?.(Number(prop(boss,'occ')));
  if(!boss||boss.isValid===false||Number(prop(boss,'type'))!==1||![true,1].includes(confirmed)||!id(boss))throw Error('Chọn Boss native trước; không dùng mục tiêu người chơi hoặc quái thường.');
  const bossId=id(boss),occ=Number(prop(boss,'occ')),scene=String(W._C?._Mn?._Cn?.currentID??''),startedAt=Date.now();
  const read=fn=>{try{return fn()??null;}catch{return null;}},events=[],pairs=[],owner={},subscriptions=[];
  let running=true,timer=null,lastSignal=null,lastCall=null,reason='observing',combatHook=null,hookError='';
  const initialCastModel=read(()=>W.KVPV_TQ113?.status?.(false)),initialImpactModel=read(()=>W.KVPV_TQ112?.status?.(false));
  const primitive=x=>x===null||['string','number','boolean'].includes(typeof x)?x:null;
  const raw=row=>Array.isArray(row)?row.slice(0,24).map(primitive):null;
  const observedKeys=new Set();
  function event(type,data){events.push({at:Date.now(),type,...data});if(events.length>100)events.shift();}
  function cast(targetId,skillId){
    if(!running||String(targetId)!==actor)return;
    const skill=Number(skillId);if(!Number.isSafeInteger(skill)||skill<=0)return;
    lastSignal={at:Date.now(),skillId:skill,paired:false,source:'native_1039'};observedKeys.add(skill);event('native_cast_signal',{skillId:skill});
  }
  function hit(source,marker,damage,flags,receiver){
    if(!running||String(source)!==bossId||String(receiver)!==actor||Number(damage)<=0)return;
    event('boss_damage_signal',{marker:Number(marker),damage:Number(damage),flags:Number(flags)});
    const skill=Number(marker)/10000;
    const candidates=[lastSignal,lastCall].filter(x=>x&&!x.paired&&x.skillId===skill&&Date.now()-x.at>=0&&Date.now()-x.at<=5000).sort((a,b)=>b.at-a.at);
    const matched=candidates[0];if(!matched||Number(flags)&(4|16|32|64|128|256))return;
    for(const sample of [lastSignal,lastCall])if(sample&&sample.skillId===skill)sample.paired=true;
    pairs.push({skillId:skill,delayMs:Date.now()-matched.at,source:matched.source,damage:Number(damage),at:Date.now()});if(pairs.length>50)pairs.shift();
  }
  function subscribe(target,name,fn){if(typeof target?.on==='function'&&typeof target?.off==='function'){target.on(name,owner,fn);subscriptions.push([target,name,fn]);return true;}return false;}
  const bossSignalAvailable=subscribe(boss,1039,cast),damageSignalAvailable=subscribe(me,1012,hit);
  try{
    const bc=boss.getComponent?.(Comp),descriptor=bc&&Object.getOwnPropertyDescriptor(bc,'combat'),native=bc?.combat;
    if(typeof native!=='function'||descriptor?.configurable===false)hookError='Boss combat method unavailable/non-configurable';
    else{
      const fn=function(...args){
        if(running&&this===bc){try{const skill=Number(args[0]);if(Number.isSafeInteger(skill)&&skill>0&&skill<=1000000){lastCall={at:Date.now(),skillId:skill,paired:false,source:'combat_method_entry'};observedKeys.add(skill);event('native_combat_call',{skillId:skill});}}catch(_){}}
        return native.apply(this,args);
      };
      Object.defineProperty(bc,'combat',{value:fn,configurable:true,writable:true,enumerable:descriptor?.enumerable??false});combatHook={bc,fn,descriptor};
    }
  }catch(e){hookError=String(e.message||e);}
  function report(){
    const bc=read(()=>boss.getComponent?.(Comp)),selector=read(()=>boss.getComponent?.(Sel)),nativeCfg=read(()=>W._ft?._tY?.ins?.getCfgById?.(occ));
    const rows=[...(Array.isArray(selector?._rtt)?selector._rtt:[]),...(Array.isArray(selector?._wet)?selector._wet:[])];
    const ids=[...new Set([...rows.map(r=>Number(r?.[0])),...observedKeys].filter(n=>Number.isSafeInteger(n)&&n>0))].slice(0,32);
    const skills=ids.map(skillId=>{
      const live=read(()=>bc?._mvt?.(skillId)),fallback=live?null:read(()=>W._ft?._nY?.ins?.getCfgBySkillIdAndLv?.(skillId,1)),cfg=live??fallback;
      const delays=pairs.filter(p=>p.skillId===skillId).map(p=>p.delayMs).sort((a,b)=>a-b);
      return {skillId,name:typeof cfg?.[2]==='string'?cfg[2]:null,configSource:live?'boss_native_config':fallback?'level_1_fallback_not_confirmed_boss_level':'unavailable',
        nativeRows:rows.filter(r=>Number(r?.[0])===skillId).map(raw),configRaw:raw(cfg),observedCastToDamageMs:delays,
        earliestObservedMs:delays.length?delays[0]:null,latestObservedMs:delays.length?delays.at(-1):null};
    });
    const a=read(()=>prop(me,'position')),b=read(()=>prop(boss,'position'));
    const currentCastModel=read(()=>W.KVPV_TQ113?.status?.(false)),currentImpactModel=read(()=>W.KVPV_TQ112?.status?.(false));
    const delta=(current,initial,key,bossKey)=>current?.[bossKey]===bossId&&initial?.[bossKey]===bossId&&Number.isFinite(current?.[key])&&Number.isFinite(initial?.[key])&&current[key]>=initial[key]?current[key]-initial[key]:null;
    const result={version:2,actor,bossId,occ,name:read(()=>prop(boss,'name')),scene,startedAt,at:Date.now(),running,reason,
      hp:read(()=>prop(boss,'hp')),nativeBossRange:Number(nativeCfg?.[3])||null,bossConfigRaw:raw(nativeCfg),
      distance:a&&b&&[a.x,a.y,b.x,b.y].every(Number.isFinite)?Math.hypot(a.x-b.x,a.y-b.y):null,
      bossSignalAvailable,damageSignalAvailable,combatMethodObserved:!!combatHook&&combatHook.bc.combat===combatHook.fn,hookError,bossAnimationPlaying:bc?._jh?.isPlaying??null,skills,
      existingImpactModel:currentImpactModel,existingCastModel:currentCastModel,
      observationWindow:{castCallsSinceInstall:delta(currentCastModel,initialCastModel,'castsObserved','bossId'),impactsSinceInstall:delta(currentImpactModel,initialImpactModel,'observations','selectedBoss')},
      events:events.slice(),matchedObservations:pairs.slice(),
      limits:'Observer only: wraps Boss combat to record calls, delegates native behavior once unchanged. No initiated attacks/moves or cooldown edits. combat_method_entry is a client call attempt, not a confirmed server cast. Static cooldown is not windup. Matched pairs do not prove every Boss attack is observable or dodgeable.'};
    return JSON.parse(JSON.stringify(result));
  }
  function stop(why='manual stop'){if(!running)return;running=false;reason=why;if(timer!==null)W.clearInterval(timer);for(const [target,name,fn]of subscriptions)target.off(name,owner,fn);if(combatHook&&combatHook.bc.combat===combatHook.fn){if(combatHook.descriptor)Object.defineProperty(combatHook.bc,'combat',combatHook.descriptor);else delete combatHook.bc.combat;}}
  timer=W.setInterval(()=>{
    if(String(user()?.actorId||'')!==actor||boss.isValid===false||me?.getComponent?.(Comp)?.target!==boss||String(W._C?._Mn?._Cn?.currentID??'')!==scene)stop('actor/Boss/map changed');
    else if(Date.now()-startedAt>=180000)stop('3-minute observation complete');
  },500);
  W.KVPV_BOSS_SCOUT=Object.freeze({report,export:()=>JSON.stringify(report(),null,2),stop});
  const initial=report();W.console.table(initial.skills.map(s=>({id:s.skillId,name:s.name,source:s.configSource})));
  W.console.info('[KVPV] Đang đọc Boss, không tự áp sát. Lấy dữ liệu: copy(KVPV_BOSS_SCOUT.export()). Muốn quan sát trước khi đánh, tắt auto game bằng UI.');
})();
