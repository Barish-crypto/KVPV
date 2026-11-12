import {getKVPV_DESKTOP_CONTROL as __getKVPV0,getKVPV_FAR_SCOPE as __getKVPV1,getKVPV_ROAD_CADENCE as __getKVPV2,getKVPV_TH300 as __getKVPV3,getKVPV_V1 as __getKVPV4} from '../api.mjs';
export function call_KVPV_DESKTOP_CONTROL_receive(...args){const target=globalThis["KVPV_DESKTOP_CONTROL"];const fn=globalThis["KVPV_DESKTOP_CONTROL"]?.["receive"];if(typeof fn!=='function')throw Error("KVPV_DESKTOP_CONTROL.receive is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_DESKTOP_CONTROL_sync(...args){const target=globalThis["KVPV_DESKTOP_CONTROL"];const fn=globalThis["KVPV_DESKTOP_CONTROL"]?.["sync"];if(typeof fn!=='function')throw Error("KVPV_DESKTOP_CONTROL.sync is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_DESKTOP_CONTROL_stop(...args){const target=globalThis["KVPV_DESKTOP_CONTROL"];const fn=globalThis["KVPV_DESKTOP_CONTROL"]?.["stop"];if(typeof fn!=='function')throw Error("KVPV_DESKTOP_CONTROL.stop is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_DESKTOP_CONTROL_scopeProfile(...args){const target=globalThis["KVPV_DESKTOP_CONTROL"];const fn=globalThis["KVPV_DESKTOP_CONTROL"]?.["scopeProfile"];if(typeof fn!=='function')throw Error("KVPV_DESKTOP_CONTROL.scopeProfile is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_DESKTOP_CONTROL_distance(...args){const target=globalThis["KVPV_DESKTOP_CONTROL"];const fn=globalThis["KVPV_DESKTOP_CONTROL"]?.["distance"];if(typeof fn!=='function')throw Error("KVPV_DESKTOP_CONTROL.distance is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_DESKTOP_CONTROL_stageAllowed(...args){const target=globalThis["KVPV_DESKTOP_CONTROL"];const fn=globalThis["KVPV_DESKTOP_CONTROL"]?.["stageAllowed"];if(typeof fn!=='function')throw Error("KVPV_DESKTOP_CONTROL.stageAllowed is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_DESKTOP_CONTROL_status(...args){const target=globalThis["KVPV_DESKTOP_CONTROL"];const fn=globalThis["KVPV_DESKTOP_CONTROL"]?.["status"];if(typeof fn!=='function')throw Error("KVPV_DESKTOP_CONTROL.status is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_DESKTOP_CONTROL__handoff(...args){const target=globalThis["KVPV_DESKTOP_CONTROL"];const fn=globalThis["KVPV_DESKTOP_CONTROL"]?.["_handoff"];if(typeof fn!=='function')throw Error("KVPV_DESKTOP_CONTROL._handoff is not available");return Reflect.apply(fn,target,args);}
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
let __esmLocal16;
let __esmLocal17;
export {__esmLocal0 as local_anonymous_4_1_0};
export {__esmLocal1 as local_validCombatProfiles_1};
export {__esmLocal2 as local_anonymous_16_144_2};
export {__esmLocal3 as local_anonymous_16_317_3};
export {__esmLocal4 as local_anonymous_16_362_4};
export {__esmLocal5 as local_anonymous_16_478_5};
export {__esmLocal6 as local_scopeProfile_6};
export {__esmLocal7 as local_valid_7};
export {__esmLocal8 as local_anonymous_20_110_8};
export {__esmLocal9 as local_anonymous_26_196_9};
export {__esmLocal10 as local_receive_10};
export {__esmLocal11 as local_anonymous_28_94_11};
export {__esmLocal12 as local_tick_12};
export {__esmLocal13 as local_stop_13};
export {__esmLocal14 as local_distance_14};
export {__esmLocal15 as local_stageAllowed_15};
export {__esmLocal16 as local_status_16};
export {__esmLocal17 as local__handoff_17};
export function initialize(){

 

(__captureESMFunction((__esmLocal0=(() => {

 'use strict';const W=window,old=__getKVPV0(),previousStatus=old?.status?.(),carry=old?._handoff?.();old?.stop?.();

 const actor=String(W.__KVPV_OWN_ACTOR_ID||''),schema=W.__KVPV_CONTROL_SCHEMA??{},retryablePreviousFailure=String(previousStatus?.lastError||'').includes('Module API unavailable after install:');

 let desired=carry?.actor===actor?carry.desired:null,applied='',timer=null,reason='waiting_desktop',error='',combatApi=null,redDotsApi=null,redDotsRevision='',stageRevision='',stageStopRevision='',stageStopApi=null,failedRevision=carry?.actor===actor&&!retryablePreviousFailure?carry.failedRevision:'',reloadRequired=false;

 const targets=new Map(),states=new Map(),stoppedApis=new Map(),installRetryAt=new Map();

 let roadApi=null;

 function validCombatProfiles(profiles){return !!profiles&&typeof profiles==='object'&&!Array.isArray(profiles)&&Object.entries(profiles).every(__captureESMFunction((__esmLocal2=(([scope,p])=>['THIEN_QUAN','LINH_LUNG','PHU_VAN','TRU_TIEN','ROAD_TRIAL'].includes(scope)&&p&&typeof p==='object'&&!Array.isArray(p)&&['mode','distance','intervalMs'].every(__captureESMFunction((__esmLocal3=(k=>Object.hasOwn(p,k))),""))&&Object.keys(p).every(__captureESMFunction((__esmLocal4=(k=>['mode','distance','intervalMs','rideFollow','mansionFollow'].includes(k))),""))&&['rideFollow','mansionFollow'].every(__captureESMFunction((__esmLocal5=(k=>p[k]===undefined||typeof p[k]==='boolean')),""))&&(scope==='ROAD_TRIAL'?['native','basic8001']:['mixed','basic8001']).includes(p.mode)&&Number.isSafeInteger(p.intervalMs)&&p.intervalMs>=0&&p.intervalMs<=5000&&Number.isFinite(p.distance)&&p.distance>=(scope==='ROAD_TRIAL'?20:281)&&p.distance<=(scope==='ROAD_TRIAL'?150:600))),""));}
__esmLocal1=validCombatProfiles;


 function scopeProfile(scope){return desired?.combatProfiles?.[scope]??null;}
__esmLocal6=scopeProfile;


 function validRedDotControls(value){return !!value&&typeof value==='object'&&!Array.isArray(value)&&Object.keys(value).every(k=>k==='groups'||k==='ids')&&!!value.groups&&typeof value.groups==='object'&&!Array.isArray(value.groups)&&!!value.ids&&typeof value.ids==='object'&&!Array.isArray(value.ids)&&Object.entries(value.groups).length<=128&&Object.entries(value.ids).length<=256&&Object.entries(value.groups).every(([k,v])=>typeof k==='string'&&k.length>0&&k.length<=80&&!/[\u0000-\u001f]/.test(k)&&typeof v==='boolean')&&Object.entries(value.ids).every(([k,v])=>/^\d{1,5}$/.test(k)&&typeof v==='boolean');}


 function valid(p){return p&&String(p.actor)===actor&&/^[a-f0-9]{32}$/.test(p.revision)&&Object.keys(p).every(__captureESMFunction((__esmLocal8=(k=>['actor','revision','modules','redDots','distance','animationSpeed','stageAuto','dailyEnabled','roadCombatMode','towerBasicOnly','roadMinCastMs','combatProfiles'].includes(k))),""))&&

  (p.distance===undefined||Number.isFinite(p.distance)&&p.distance>=281&&p.distance<=600)&&(p.animationSpeed===undefined||[1,9,99,99999].includes(p.animationSpeed))&&

  (p.stageAuto===undefined||typeof p.stageAuto==='boolean')&&(p.dailyEnabled===undefined||p.dailyEnabled===true)&&(p.roadCombatMode===undefined||['native','basic8001'].includes(p.roadCombatMode))&&(p.towerBasicOnly===undefined||typeof p.towerBasicOnly==='boolean')&&(p.roadMinCastMs===undefined||Number.isSafeInteger(p.roadMinCastMs)&&p.roadMinCastMs>=0&&p.roadMinCastMs<=5000)&&

  (p.combatProfiles===undefined||validCombatProfiles(p.combatProfiles))&&(p.redDots===undefined||validRedDotControls(p.redDots))&&(p.modules===undefined||p.modules&&typeof p.modules==='object'&&!Array.isArray(p.modules)&&Object.entries(p.modules).every(__captureESMFunction((__esmLocal9=(([file,on])=>Object.prototype.hasOwnProperty.call(schema,file)&&typeof on==='boolean')),"")));}
__esmLocal7=valid;


 function stopEnabledModules(){for(const [file,on]of states){if(!on)continue;const names=Array.isArray(schema[file])?schema[file]:[schema[file]];for(const name of names)W[name]?.stop?.();states.set(file,false);}targets.clear();stoppedApis.clear();}


 function receive(rows){if(!Array.isArray(rows)||rows.length>8)return false;const p=rows.find(__captureESMFunction((__esmLocal11=(x=>String(x?.actor)===actor)),""));if(!p)return false;if(!valid(p)){reason='invalid_desktop_profile';return false;}

  if(desired?.revision!==p.revision){desired=JSON.parse(JSON.stringify(p));error='';failedRevision='';installRetryAt.clear();}
  const loaded=W.__KVPV_RUNTIME_MODULE_SET,requested=Object.entries(p.modules??{}).filter(([,on])=>on===true).map(([file])=>file);
  const installers=W.__KVPV_CONTROL_INSTALLERS;
  if(!Array.isArray(loaded)||requested.some(file=>typeof installers?.[file]!=='function')){
   reloadRequired=true;reason='reload_required';error='Runtime cũ chưa hỗ trợ bật/tắt nóng; cần tải lại tab game một lần để cập nhật.';failedRevision='';stopEnabledModules();return true;
  }
  reloadRequired=false;tick();return true;}
__esmLocal10=receive;


 function tick(){let operation='profile update';try{

  if(String(W._Ba?._rJ?._O$?.ins?.actorId??'')!==actor||W.__KVPV_UNIVERSAL_HALTED)return;
  if(reloadRequired)return;
  if(desired&&failedRevision===desired.revision)return;

  const moduleSettings=desired?.modules??{};
  for(const file of Object.keys(schema)){
   if(moduleSettings[file]===true)continue;
   const names=Array.isArray(schema[file])?schema[file]:[schema[file]],stopped=stoppedApis.get(file)||new Set();
   for(const name of names){
    const api=W[name];
    if(!api)continue;
    if(typeof api.stop!=='function')throw Error('Module stop API unavailable: '+file+' ('+name+')');
    if(!stopped.has(api)){operation='stop '+file+' / '+name;api.stop();stopped.add(api);}
   }
   stoppedApis.set(file,stopped);states.set(file,false);
  }

  if(!desired){reason='waiting_local_profile';return;}

// Stage control updates the native stage flag directly; it does not start Daily.
  if(desired.stageAuto===false){const stage=W._Ba?._Co?._Mo?.ins;if(stage&&stage.auto===true)stage.auto=false;stageStopRevision=desired.revision;stageStopApi=stage;}

  if(W._Ba?._rJ?._O$?.ins?.isDead!==false||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)){reason='waiting_user_or_revive';return;}

  for(const file of Object.keys(schema)){
   const names=Array.isArray(schema[file])?schema[file]:[schema[file]],on=moduleSettings[file]===true;
   if(!on)continue;
   let apis=names.map(name=>W[name]);
   const previous=targets.get(file);
   let installed=false;
   if(apis.some(api=>!api||typeof api.stop!=='function')){
    if(Date.now()<(installRetryAt.get(file)||0)){reason='waiting_module_api';return;}
    const install=W.__KVPV_CONTROL_INSTALLERS?.[file];
    if(typeof install!=='function')throw Error('Installer unavailable: '+file);
    operation='install '+file;install();installed=true;apis=names.map(name=>W[name]);
    if(apis.some(api=>!api||typeof api.stop!=='function')){
     installRetryAt.set(file,Date.now()+5000);reason='waiting_module_api';error='';return;
    }
    installRetryAt.delete(file);
   }
   if(apis.some(api=>!api||typeof api.stop!=='function')){installRetryAt.set(file,Date.now()+5000);reason='waiting_module_api';error='';return;}
   if(Array.isArray(previous)&&previous.length===apis.length&&previous.every((api,index)=>api===apis[index])&&states.get(file)===on)continue;
   {
    const install=W.__KVPV_CONTROL_INSTALLERS?.[file];
    if(!installed){
     if(typeof install!=='function')throw Error('Installer unavailable: '+file);
    operation='install '+file;install();apis=names.map(name=>W[name]);
    }
    if(apis.some(api=>!api||typeof api.stop!=='function')){installRetryAt.set(file,Date.now()+5000);reason='waiting_module_api';error='';return;}
    installRetryAt.delete(file);
    for(let index=0;index<apis.length;index++){operation='start '+file+' / '+names[index];if(typeof apis[index].start==='function')apis[index].start();}
    stoppedApis.delete(file);
   }
   targets.set(file,apis);states.set(file,on);
  }

  if(!desired){reason='waiting_local_profile';return;}

  if(desired.redDots!==undefined){
   const api=W.KVPV_RED_DOT_MODULE;
   if(typeof api?.setControls!=='function')throw Error('Red-dot controls API unavailable');
   if(redDotsApi!==api||redDotsRevision!==desired.revision){operation='apply red-dot controls';api.setControls(desired.redDots);redDotsApi=api;redDotsRevision=desired.revision;}
  }

  if(desired.roadCombatMode!==undefined||desired.roadMinCastMs!==undefined){const api=__getKVPV2();if(desired.roadCombatMode!==undefined&&typeof api?.setCombatMode!=='function'||desired.roadMinCastMs!==undefined&&typeof api?.setMinCastInterval!=='function')throw Error('Road settings API unavailable');if(roadApi!==api||applied!==desired.revision){operation='apply road combat settings';if(desired.roadCombatMode!==undefined)api.setCombatMode(desired.roadCombatMode);if(desired.roadMinCastMs!==undefined)api.setMinCastInterval(desired.roadMinCastMs);roadApi=api;}}

  const combat=__getKVPV3();

  if(desired.towerBasicOnly!==undefined&&typeof combat?.setBasicOnly!=='function')throw Error('Tower combat mode API unavailable');

  if(combat&&(combatApi!==combat||applied!==desired.revision)){

   operation='apply tower combat settings';

   if(desired.towerBasicOnly!==undefined)combat.setBasicOnly(desired.towerBasicOnly);

   if(desired.distance!==undefined)combat.setDistance(desired.distance);

   if(desired.animationSpeed!==undefined)combat.setBasicAnimationSpeed(desired.animationSpeed);

   combatApi=combat;

  }

  if(stageRevision!==desired.revision){
// Legacy dailyEnabled is accepted for protocol compatibility and intentionally ignored.
   // dailyEnabled is accepted for protocol compatibility but no longer starts a daily scheduler.
// Stage progression resumes through the red-dot main loop after red work clears.
   if(desired.stageAuto===true){operation='resume stage automation';const stage=W._Ba?._Co?._Mo?.ins;if(stage)stage.auto=true;}

   stageRevision=desired.revision;

  }

  applied=desired.revision;reason='desktop_applied';error='';

 }catch(e){failedRevision=desired?.revision;error=(operation+': '+String(e?.stack||e?.message||e)).slice(0,1200);reason='desktop_apply_error';}}
__esmLocal12=tick;


 function stop(){if(timer!==null)(__getKVPV4()?.timers?.clearInterval??W.clearInterval)(timer);timer=null;}
__esmLocal13=stop;


 W.KVPV_DESKTOP_CONTROL=Object.freeze({receive,sync:tick,stop,scopeProfile,distance:__captureESMFunction((__esmLocal14=(()=>scopeProfile(__getKVPV1()?.status?.()?.kind)?.distance??desired?.distance)),"distance"),stageAllowed:__captureESMFunction((__esmLocal15=(()=>desired?.stageAuto===true||desired?.modules?.['62-resume-stage.js']===true)),"stageAllowed"),

  status:__captureESMFunction((__esmLocal16=(()=>({reason,lastError:error,reloadRequired,runtimeModules:Array.isArray(W.__KVPV_RUNTIME_MODULE_SET)?W.__KVPV_RUNTIME_MODULE_SET:[],requested:desired?.revision??null,applied,modules:desired?.modules??{},redDots:desired?.redDots??null,distance:desired?.distance??null,animationSpeed:desired?.animationSpeed??null,stageAuto:desired?.stageAuto??null}))),"status"),_handoff:__captureESMFunction((__esmLocal17=(()=>({actor,desired,failedRevision}))),"_handoff")});

 timer=(__getKVPV4()?.timers?.setInterval??W.setInterval)(tick,1000);

})),""))();


}
export {getKVPV_DESKTOP_CONTROL} from '../api.mjs';
export const api=Object.freeze({
  get KVPV_DESKTOP_CONTROL(){return globalThis.KVPV_DESKTOP_CONTROL;},
});