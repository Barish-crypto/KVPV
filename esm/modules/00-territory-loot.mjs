import {getKVPV_DAILY as __getKVPV0,getKVPV_TERRITORY_LOOT as __getKVPV1} from '../api.mjs';
export function call_KVPV_TERRITORY_LOOT_decide(...args){const target=globalThis["KVPV_TERRITORY_LOOT"];const fn=globalThis["KVPV_TERRITORY_LOOT"]?.["decide"];if(typeof fn!=='function')throw Error("KVPV_TERRITORY_LOOT.decide is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_TERRITORY_LOOT_shouldBlock(...args){const target=globalThis["KVPV_TERRITORY_LOOT"];const fn=globalThis["KVPV_TERRITORY_LOOT"]?.["shouldBlock"];if(typeof fn!=='function')throw Error("KVPV_TERRITORY_LOOT.shouldBlock is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_TERRITORY_LOOT_percent(...args){const target=globalThis["KVPV_TERRITORY_LOOT"];const fn=globalThis["KVPV_TERRITORY_LOOT"]?.["percent"];if(typeof fn!=='function')throw Error("KVPV_TERRITORY_LOOT.percent is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_TERRITORY_LOOT_lootKind(...args){const target=globalThis["KVPV_TERRITORY_LOOT"];const fn=globalThis["KVPV_TERRITORY_LOOT"]?.["lootKind"];if(typeof fn!=='function')throw Error("KVPV_TERRITORY_LOOT.lootKind is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_TERRITORY_LOOT_status(...args){const target=globalThis["KVPV_TERRITORY_LOOT"];const fn=globalThis["KVPV_TERRITORY_LOOT"]?.["status"];if(typeof fn!=='function')throw Error("KVPV_TERRITORY_LOOT.status is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_TERRITORY_LOOT_setCutoff(...args){const target=globalThis["KVPV_TERRITORY_LOOT"];const fn=globalThis["KVPV_TERRITORY_LOOT"]?.["setCutoff"];if(typeof fn!=='function')throw Error("KVPV_TERRITORY_LOOT.setCutoff is not available");return Reflect.apply(fn,target,args);}
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
export {__esmLocal0 as local_anonymous_1_1_0};
export {__esmLocal1 as local_prop_1};
export {__esmLocal2 as local_lootKind_2};
export {__esmLocal3 as local_anonymous_7_203_3};
export {__esmLocal4 as local_percent_4};
export {__esmLocal5 as local_active_5};
export {__esmLocal6 as local_shouldBlock_6};
export {__esmLocal7 as local_anonymous_10_206_7};
export {__esmLocal8 as local_decide_8};
export {__esmLocal9 as local_dead_9};
export {__esmLocal10 as local_anonymous_14_71_10};
export {__esmLocal11 as local_eligible_11};
export {__esmLocal12 as local_anonymous_16_25_12};
export {__esmLocal13 as local_anonymous_16_85_13};
export {__esmLocal14 as local_anonymous_17_56_14};
export {__esmLocal15 as local_anonymous_17_91_15};
export {__esmLocal16 as local_status_16};
export {__esmLocal17 as local_setCutoff_17};
export function initialize(){
(__captureESMFunction((__esmLocal0=(() => {
  'use strict';
  const W=window,actor=String(W.__KVPV_OWN_ACTOR_ID||'');
  let cutoff=11,last={reason:'waiting_territory',selected:null,skipped:[]};
  const prop=__captureESMFunction((__esmLocal1=((o,k)=>o?.property?.get?.(k))),"prop");
  const groups={weapon:'than binh',fashion:'thoi trang',talisman:'linh ti',wings:'linh duc'};
  function lootKind(name){const text=String(name??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[đĐ]/g,'d').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();return Object.keys(groups).find(__captureESMFunction((__esmLocal3=(key=>(' '+text+' ').includes(' '+groups[key]+' '))),""))??null;}
__esmLocal2=lootKind;

  function percent(target){const hp=prop(target,'hp');if(!Array.isArray(hp))return null;const current=Number(hp[0]),max=Number(hp[1]);return Number.isFinite(current)&&Number.isFinite(max)&&current>=0&&max>0?current/max*100:null;}
__esmLocal4=percent;

  function active(){return actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId||'')&&!W.__KVPV_UNIVERSAL_HALTED&&__getKVPV0()?.quickState?.()?.job==='lanhdia'&&Number(W._Ba?._$a?._yo?.ins?.intoSce?.[0])===2164;}
__esmLocal5=active;

  function shouldBlock(target){if(!active()||Number(prop(target,'type'))!==1||!lootKind(prop(target,'name')))return false;const ids=W._Ba?._zLt?._VLt?.ins?.getBsList?.();return Array.isArray(ids)&&ids.some(__captureESMFunction((__esmLocal7=(id=>Number(id)===Number(prop(target,'occ')))),""))&&percent(target)!==null&&percent(target)<=cutoff;}
__esmLocal6=shouldBlock;

  function decide({ids,final,selected,target,state,alive,dead=__captureESMFunction((__esmLocal9=(()=>false)),"dead")}){
    if(state.territoryLoot?.version!==2)state.territoryLoot={version:2,skipped:{},seenGroups:{}};
    const skipped=state.territoryLoot.skipped,seen=state.territoryLoot.seenGroups,list=Array.isArray(ids)?ids:[],pct=percent(target),occ=Number(prop(target,'occ')),kind=lootKind(prop(target,'name'));
    if(Number(prop(target,'type'))===1&&kind){const observed=list.find(__captureESMFunction((__esmLocal10=(id=>Number(id)===occ)),""));if(observed!==undefined){seen[kind]=true;if(pct!==null&&pct<=cutoff)skipped[String(observed)]=pct;}}
    const eligible=__captureESMFunction((__esmLocal11=(id=>!Object.hasOwn(skipped,String(id))&&alive(id)===true)),"eligible");
    const next=list.find(__captureESMFunction((__esmLocal12=(id=>String(id)===String(selected)&&eligible(id))),""))??list.find(__captureESMFunction((__esmLocal13=(id=>String(id)===String(final)&&eligible(id))),""))??list.find(eligible)??null;
    const done=list.length>0&&Object.keys(groups).every(__captureESMFunction((__esmLocal14=(key=>seen[key]===true)),""))&&list.every(__captureESMFunction((__esmLocal15=(id=>Object.hasOwn(skipped,String(id))||dead(id)===true)),""));
    last={reason:done?'all_reward_cutoffs_reached':next===null?'waiting_available_boss':kind?'attack_for_drops':'kill_progression_boss',selected:next,cutoffHPPercent:cutoff,observedHPPercent:pct,observedBossName:String(prop(target,'name')??''),lootGroup:kind,seenLootGroups:Object.keys(seen),skipped:Object.keys(skipped)};
    return {next,done};
  }
__esmLocal8=decide;

  W.KVPV_TERRITORY_LOOT=Object.freeze({decide,shouldBlock,percent,lootKind,status:__captureESMFunction((__esmLocal16=(()=>({...last,cutoffHPPercent:cutoff,seenLootGroups:(last.seenLootGroups??[]).slice(),skipped:last.skipped.slice()}))),"status"),setCutoff(value=11){
__esmLocal17=__captureESMMethod(this,"setCutoff","init");
if(!Number.isFinite(value)||value<0||value>=100)throw Error('HP cutoff must be 0..99.999 percent');cutoff=value;return cutoff;}});
})),""))();

}
export {getKVPV_TERRITORY_LOOT} from '../api.mjs';
export const api=Object.freeze({
  get KVPV_TERRITORY_LOOT(){return globalThis.KVPV_TERRITORY_LOOT;},
});