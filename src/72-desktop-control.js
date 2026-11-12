
 

(() => {

 'use strict';const W=window,old=W.KVPV_DESKTOP_CONTROL,carry=old?._handoff?.();old?.stop?.();

 const actor=String(W.__KVPV_OWN_ACTOR_ID||''),schema=W.__KVPV_CONTROL_SCHEMA??{};

 let desired=carry?.actor===actor?carry.desired:null,applied='',timer=null,reason='waiting_desktop',error='',combatApi=null,stageRevision='',stageStopRevision='',stageStopApi=null,failedRevision=carry?.actor===actor?carry.failedRevision:'';

 const targets=new Map(),states=new Map();

 let roadApi=null;

 function validCombatProfiles(profiles){return !!profiles&&typeof profiles==='object'&&!Array.isArray(profiles)&&Object.entries(profiles).every(([scope,p])=>['THIEN_QUAN','LINH_LUNG','PHU_VAN','TRU_TIEN','ROAD_TRIAL'].includes(scope)&&p&&typeof p==='object'&&!Array.isArray(p)&&['mode','distance','intervalMs'].every(k=>Object.hasOwn(p,k))&&Object.keys(p).every(k=>['mode','distance','intervalMs','rideFollow','mansionFollow'].includes(k))&&['rideFollow','mansionFollow'].every(k=>p[k]===undefined||typeof p[k]==='boolean')&&(scope==='ROAD_TRIAL'?['native','basic8001']:['mixed','basic8001']).includes(p.mode)&&Number.isSafeInteger(p.intervalMs)&&p.intervalMs>=0&&p.intervalMs<=5000&&Number.isFinite(p.distance)&&p.distance>=(scope==='ROAD_TRIAL'?20:281)&&p.distance<=(scope==='ROAD_TRIAL'?150:600));}

 function scopeProfile(scope){return desired?.combatProfiles?.[scope]??null;}

 function valid(p){return p&&String(p.actor)===actor&&/^[a-f0-9]{32}$/.test(p.revision)&&Object.keys(p).every(k=>['actor','revision','modules','distance','animationSpeed','stageAuto','dailyEnabled','roadCombatMode','towerBasicOnly','roadMinCastMs','combatProfiles'].includes(k))&&

  (p.distance===undefined||Number.isFinite(p.distance)&&p.distance>=281&&p.distance<=600)&&(p.animationSpeed===undefined||[1,9,99,99999].includes(p.animationSpeed))&&

  (p.stageAuto===undefined||typeof p.stageAuto==='boolean')&&(p.dailyEnabled===undefined||p.dailyEnabled===true)&&(p.roadCombatMode===undefined||['native','basic8001'].includes(p.roadCombatMode))&&(p.towerBasicOnly===undefined||typeof p.towerBasicOnly==='boolean')&&(p.roadMinCastMs===undefined||Number.isSafeInteger(p.roadMinCastMs)&&p.roadMinCastMs>=0&&p.roadMinCastMs<=5000)&&

  (p.combatProfiles===undefined||validCombatProfiles(p.combatProfiles))&&(p.modules===undefined||p.modules&&typeof p.modules==='object'&&!Array.isArray(p.modules)&&Object.entries(p.modules).every(([file,on])=>Object.prototype.hasOwnProperty.call(schema,file)&&typeof on==='boolean'));}

 function receive(rows){if(!Array.isArray(rows)||rows.length>8)return false;const p=rows.find(x=>String(x?.actor)===actor);if(!p)return false;if(!valid(p)){reason='invalid_desktop_profile';return false;}

  if(desired?.revision!==p.revision){desired=JSON.parse(JSON.stringify(p));error='';failedRevision='';}tick();return true;}

 function tick(){try{

  if(!desired||failedRevision===desired.revision||String(W._Ba?._rJ?._O$?.ins?.actorId??'')!==actor||W.__KVPV_UNIVERSAL_HALTED)return;

  
// Stage control updates the native stage flag directly; it does not start Daily.
  if(desired.stageAuto===false){const stage=W._Ba?._Co?._Mo?.ins;if(stage&&stage.auto===true)stage.auto=false;stageStopRevision=desired.revision;stageStopApi=stage;}

  if(W._Ba?._rJ?._O$?.ins?.isDead!==false||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)){reason='waiting_user_or_revive';return;}

  for(const [file,on]of Object.entries(desired.modules??{})){

   let api=W[schema[file]];if(!api||typeof api.stop!=='function')throw Error('Module API unavailable: '+file);

   if(targets.get(file)===api&&states.get(file)===on)continue;

   if(!on)api.stop();

   else if(states.get(file)!==true){const install=W.__KVPV_CONTROL_INSTALLERS?.[file];if(typeof install!=='function')throw Error('Installer unavailable: '+file);install();api=W[schema[file]];if(typeof api?.start==='function')api.start();}

   targets.set(file,api);states.set(file,on);

  }

  if(desired.roadCombatMode!==undefined||desired.roadMinCastMs!==undefined){const api=W.KVPV_ROAD_CADENCE;if(desired.roadCombatMode!==undefined&&typeof api?.setCombatMode!=='function'||desired.roadMinCastMs!==undefined&&typeof api?.setMinCastInterval!=='function')throw Error('Road settings API unavailable');if(roadApi!==api||applied!==desired.revision){if(desired.roadCombatMode!==undefined)api.setCombatMode(desired.roadCombatMode);if(desired.roadMinCastMs!==undefined)api.setMinCastInterval(desired.roadMinCastMs);roadApi=api;}}

  const combat=W.KVPV_TH300;

  if(desired.towerBasicOnly!==undefined&&typeof combat?.setBasicOnly!=='function')throw Error('Tower combat mode API unavailable');

  if(combat&&(combatApi!==combat||applied!==desired.revision)){

   if(desired.towerBasicOnly!==undefined)combat.setBasicOnly(desired.towerBasicOnly);

   if(desired.distance!==undefined)combat.setDistance(desired.distance);

   if(desired.animationSpeed!==undefined)combat.setBasicAnimationSpeed(desired.animationSpeed);

   combatApi=combat;

  }

  if(stageRevision!==desired.revision){
// Legacy dailyEnabled is accepted for protocol compatibility and intentionally ignored.
   // dailyEnabled is accepted for protocol compatibility but no longer starts a daily scheduler.
// Stage progression resumes through the red-dot main loop after red work clears.
   if(desired.stageAuto===true){const stage=W._Ba?._Co?._Mo?.ins;if(stage)stage.auto=true;}

   stageRevision=desired.revision;

  }

  applied=desired.revision;reason='desktop_applied';error='';

 }catch(e){failedRevision=desired?.revision;error=String(e.message||e).slice(0,300);reason='desktop_apply_error';}}

 function stop(){if(timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(timer);timer=null;}

 W.KVPV_DESKTOP_CONTROL=Object.freeze({receive,sync:tick,stop,scopeProfile,distance:()=>scopeProfile(W.KVPV_FAR_SCOPE?.status?.()?.kind)?.distance??desired?.distance,stageAllowed:()=>desired?.stageAuto!==false,

  status:()=>({reason,lastError:error,requested:desired?.revision??null,applied,modules:desired?.modules??{},distance:desired?.distance??null,animationSpeed:desired?.animationSpeed??null,stageAuto:desired?.stageAuto??null}),_handoff:()=>({actor,desired,failedRevision})});

 timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,1000);tick();

})();

