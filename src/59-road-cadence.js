
/* Road Trial scene41: measure native cast/hit/recovery, prefer a proven basic only. */

(() => {

 'use strict';const W=window,old=W.KVPV_ROAD_CADENCE,carry=old?._handoff?.();old?.stop?.();

 const actor=String(W.__KVPV_OWN_ACTOR_ID||''),samples=carry?.actor===actor?carry.samples:[];

 let enabled=carry?.actor===actor?carry.enabled!==false:true;
 let basicPriority=carry?.actor===actor?carry.basicPriority!==false:true;

 let combatMode=carry?.actor===actor&&carry.combatMode==='basic8001'?'basic8001':'native';

 let minCastIntervalMs=carry?.actor===actor&&Number.isSafeInteger(carry.minCastIntervalMs)&&carry.minCastIntervalMs>=0&&carry.minCastIntervalMs<=5000?carry.minCastIntervalMs:0;

 // This only gates client duplicate requests; native cooldown and animation are untouched.
 const effectiveWait=()=>Math.max(80,scopedCombat()?.intervalMs??minCastIntervalMs);
 const scopedCombat=()=>W.KVPV_DESKTOP_CONTROL?.scopeProfile?.('ROAD_TRIAL')??null;

 // Backfill the same conservative recovery bound for samples carried from the first observer version.

 for(let i=0;i<samples.length-1;i++){const a=samples[i],b=samples[i+1];if(a.readyAt===null&&a.targetId===b.targetId&&a.map===b.map&&b.at>a.at){a.readyAt=b.at;a.recoverySource='next_native_cast_upper_bound';}}

 const owner={},S={role:null,combat:null,target:null,rejected:0,error:'',cache:null,cacheAt:-Infinity,
  basicStreak:0,plannedBasic:0,plannedTH:0,unprovenFallbacks:0};

 const prop=(o,k)=>o?.property?.get?.(k),id=o=>String(prop(o,'id')??o?.id??'');

 const own=()=>actor&&String(W._Ba?._rJ?._O$?.ins?.actorId)===actor&&!W.__KVPV_UNIVERSAL_HALTED;

 function scope(){const map=Number(W._C?._Mn?._Cn?.currentID??W._Ba?._$a?._yo?.ins?.intoSce?.[0]);

  return own()&&Number(W._ft?._po?.ins?.getCfgById?.(map)?.[7])===41&&W._Ba?._cm?._q3t?.ins?.getHasTeamByType?.(1)===true;}

 function target(t){if(S.target===t)return;S.basicStreak=0;if(S.target)S.target.off?.(1012,owner,hit);S.target=null;

  if(t&&typeof t.on==='function'&&typeof t.off==='function'){S.target=t;t.on(1012,owner,hit);}}

 function cast(targetId,skillId){try{

  if(!scope()||String(targetId)!==id(S.combat?.target)||Number(prop(S.combat?.target,'type'))!==1)return;

  const skill=Number(skillId);if(!((skill>=8001&&skill<=8009)||(skill>=1001&&skill<=1008)))return;

  target(S.combat.target);
  if(skill>=8001&&skill<=8005)S.basicStreak=Math.min(2,S.basicStreak+1);
  else if(skill>=1001&&skill<=1008)S.basicStreak=0;
  const previous=samples.at(-1);if(previous&&previous.readyAt===null&&previous.targetId===String(targetId)&&Date.now()>previous.at){previous.readyAt=Date.now();previous.recoverySource='next_native_cast_upper_bound';}samples.push({at:Date.now(),id:skill,targetId:String(targetId),occ:Number(prop(S.target,'occ')),map:Number(W._C?._Mn?._Cn?.currentID),hitAt:null,readyAt:null,damage:0});

  if(samples.length>240)samples.splice(0,samples.length-240);S.cacheAt=-Infinity;

 }catch(e){S.error=String(e);}}

 function hit(source,marker,damage,flags,receiver){try{

  if(!scope()||String(source)!==actor||String(receiver)!==id(S.target)||!(Number(damage)>0)||(Number(flags)&(4|16|32|64|128|256)))return;

  const raw=Number(marker);if(!Number.isSafeInteger(raw)||raw%10000)return;const skill=raw/10000,now=Date.now();

  const row=samples.find(r=>r.hitAt===null&&r.targetId===String(receiver)&&r.id===skill&&now-r.at>=0&&now-r.at<=3500);

  if(!row){S.rejected++;return;}row.hitAt=now;row.damage=Number(damage);S.cacheAt=-Infinity;

 }catch(e){S.error=String(e);}}

 function release(){target(null);if(S.role)S.role.off?.(1039,owner,cast);S.role=null;S.combat=null;}

 function observe(role,combat){try{

  if(!enabled||!scope()){release();return;}

  if(S.role!==role){release();if(typeof role?.on!=='function'||typeof role?.off!=='function')return;S.role=role;role.on(1039,owner,cast);}

  S.combat=combat;target(combat?.target);

  const last=samples.at(-1),now=Date.now();

  if(last&&last.readyAt===null&&now>last.at&&id(combat?.target)===last.targetId&&W.KVPV_BASIC10?.isForceActive?.()!==true&&combat?.isCooldown?.()===false&&combat?._jh?.isPlaying!==true){last.readyAt=now;last.recoverySource='polled_native_ready';S.cacheAt=-Infinity;}

 }catch(e){S.error=String(e);}}

 function report(){const now=Date.now();if(S.cache&&now-S.cacheAt<1000)return S.cache;S.cacheAt=now;

  const groups=new Map();for(const r of samples){const key=r.occ+'/'+r.id;let g=groups.get(key);if(!g){g={id:r.id,occ:r.occ,casts:0,hits:0,damage:0,cycleDamage:0,cycles:[],latencies:[]};groups.set(key,g);}

   g.casts++;if(r.hitAt!==null){g.hits++;g.damage+=r.damage;g.latencies.push(r.hitAt-r.at);if(r.readyAt!==null&&r.readyAt>=r.hitAt){g.cycles.push(r.readyAt-r.at);g.cycleDamage+=r.damage;}}}

  const rows=[...groups.values()].map(g=>({id:g.id,occ:g.occ,casts:g.casts,hits:g.hits,meanHitMs:g.latencies.length?Math.round(g.latencies.reduce((a,b)=>a+b,0)/g.latencies.length):null,

   measuredCycles:g.cycles.length,meanCycleMs:g.cycles.length?Math.round(g.cycles.reduce((a,b)=>a+b,0)/g.cycles.length):null,

   damagePerCycleMs:g.cycles.length?g.cycleDamage/Math.max(1,g.cycles.reduce((a,b)=>a+b,0)):null}));

  const occ=Number(prop(S.combat?.target,'occ')),candidates=rows.filter(r=>r.occ===occ&&r.id>=8001&&r.id<=8009&&r.hits>=8&&r.measuredCycles>=8&&r.hits/r.casts>=.8);

  candidates.sort((a,b)=>b.damagePerCycleMs-a.damagePerCycleMs);

  S.cache={enabled,basicPriority,basicStreak:S.basicStreak,plannedBasic:S.plannedBasic,plannedTH:S.plannedTH,
   unprovenFallbacks:S.unprovenFallbacks,combatMode:scopedCombat()?.mode??combatMode,minCastIntervalMs:effectiveWait(),approachDistance:scopedCombat()?.distance??80,nativeCombat:true,clientSkillWaitMs:null,pollIntervalMs:100,inside:scope(),active:enabled&&scope()&&!!S.role,casts:samples.length,matchedHits:samples.filter(r=>r.hitAt!==null).length,

   preferredBasic:candidates.length>=2?candidates[0].id:null,reason:!enabled?'disabled':!scope()?'waiting_road_scene':candidates.length>=2?'measured_basic_preferred':'collecting_8_hits_and_cycles_per_basic',rows,rejected:S.rejected,lastError:S.error,

   note:'One direct damage confirmation per cast; Recovery uses native-ready polling or next native cast as an upper bound, not a server throughput limit. Native skill selection; 80ms minimum client cast spacing unless a longer scoped interval is configured; original skill rows remain unchanged. Server cooldown is not modified.'};return S.cache;

 }

 // Supply a native selector with a ready-skill subset. Never touch cooldown rows,
 // send combat RPCs, or fabricate skill readiness. Unverified targets use native order.
 function planNativeSelection(active,common,mode){
  if(!enabled||!basicPriority||!scope()||Number(mode)!==1||((scopedCombat()?.mode??combatMode)!=='native'))return null;
  if(Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)||W.KVPV_BOSS_TEAM?.priority?.()===true||
     W._Ba?._rJ?._O$?.ins?.isDead===true||W.document?.hidden===true)return null;
  const combat=S.combat,tar=combat?.target;
  if(!combat||!tar||S.target!==tar||combat.isValidTarget?.()!==true||
     combat.isValidRange?.()!==true||combat.isCooldown?.()!==false||
     combat?._jh?.isPlaying===true)return null;
  const occ=Number(prop(tar,'occ'));
  const measured=report().rows.filter(r=>r.occ===occ&&r.id>=8001&&r.id<=8005&&r.hits>=8&&
     r.measuredCycles>=8&&r.casts>0&&r.hits/r.casts>=.8&&Number.isFinite(r.damagePerCycleMs));
  if(measured.length<2){S.unprovenFallbacks++;return null;}
  const quality=new Map(measured.map(r=>[r.id,r.damagePerCycleMs]));
  const ready=[...(Array.isArray(active)?active:[]),...(Array.isArray(common)?common:[])].filter(row=>
    Array.isArray(row)&&Number.isFinite(Number(row[1]))&&Number(row[1])<Date.now());
  const basics=ready.filter(row=>quality.has(Number(row[0]))).sort((a,b)=>
    quality.get(Number(b[0]))-quality.get(Number(a[0])));
  const th=ready.filter(row=>Number(row[0])>=1001&&Number(row[0])<=1008);
  if(S.basicStreak>=2&&th.length){S.plannedTH++;return {kind:'tuyet_hoc',rows:th};}
  if(basics.length){S.plannedBasic++;return {kind:'proven_basic',rows:basics};}
  return null;
 }
 function setBasicPriority(value=true){basicPriority=!!value;S.cacheAt=-Infinity;return report();}
 function selectSkill1ms(){return -1;}
 function start(){enabled=true;S.cacheAt=-Infinity;return report();}

 function stop(){enabled=false;release();S.cacheAt=-Infinity;return report();}

 function setCombatMode(mode){if(!['native','basic8001'].includes(mode))throw Error('Invalid Road combat mode');combatMode=mode;S.cacheAt=-Infinity;return report();}

 function setMinCastInterval(ms){if(!Number.isSafeInteger(ms)||ms<0||ms>5000)throw Error('Road interval must be 0..5000ms');minCastIntervalMs=ms;S.cacheAt=-Infinity;return report();}

 W.KVPV_ROAD_CADENCE=Object.freeze({fast1ms:false,selectSkill1ms,planNativeSelection,setBasicPriority,get basicPriority(){return basicPriority;},get enabled(){return enabled;},get combatMode(){return scopedCombat()?.mode??combatMode;},get minCastIntervalMs(){return effectiveWait();},get approachDistance(){return scopedCombat()?.distance??80;},setMinCastInterval,setCombatMode,start,observe,release,stop,status:report,preferredBasic:()=>enabled&&scope()?report().preferredBasic:null,_handoff:()=>({actor,samples,enabled,combatMode,basicPriority,minCastIntervalMs})});

})();

