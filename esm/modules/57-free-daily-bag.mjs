import {getKVPV_CONFIRM_POPUPS as __getKVPV0,getKVPV_FREE_DAILY_BAG as __getKVPV1,getKVPV_FREE_TREASURE as __getKVPV2,getKVPV_V1 as __getKVPV3} from '../api.mjs';
export function call_KVPV_FREE_DAILY_BAG_sync(...args){const target=globalThis["KVPV_FREE_DAILY_BAG"];const fn=globalThis["KVPV_FREE_DAILY_BAG"]?.["sync"];if(typeof fn!=='function')throw Error("KVPV_FREE_DAILY_BAG.sync is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_FREE_DAILY_BAG_stop(...args){const target=globalThis["KVPV_FREE_DAILY_BAG"];const fn=globalThis["KVPV_FREE_DAILY_BAG"]?.["stop"];if(typeof fn!=='function')throw Error("KVPV_FREE_DAILY_BAG.stop is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_FREE_DAILY_BAG_status(...args){const target=globalThis["KVPV_FREE_DAILY_BAG"];const fn=globalThis["KVPV_FREE_DAILY_BAG"]?.["status"];if(typeof fn!=='function')throw Error("KVPV_FREE_DAILY_BAG.status is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_FREE_DAILY_BAG__handoff(...args){const target=globalThis["KVPV_FREE_DAILY_BAG"];const fn=globalThis["KVPV_FREE_DAILY_BAG"]?.["_handoff"];if(typeof fn!=='function')throw Error("KVPV_FREE_DAILY_BAG._handoff is not available");return Reflect.apply(fn,target,args);}
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
export {__esmLocal0 as local_anonymous_4_1_0};
export {__esmLocal1 as local_shop_1};
export {__esmLocal2 as local_cfg_2};
export {__esmLocal3 as local_own_3};
export {__esmLocal4 as local_norm_4};
export {__esmLocal5 as local_candidates_5};
export {__esmLocal6 as local_anonymous_26_25_6};
export {__esmLocal7 as local_anonymous_26_188_7};
export {__esmLocal8 as local_anonymous_36_45_8};
export {__esmLocal9 as local_sync_9};
export {__esmLocal10 as local_stop_10};
export {__esmLocal11 as local_status_11};
export {__esmLocal12 as local_anonymous_78_177_12};
export {__esmLocal13 as local__handoff_13};
export function initialize(){

/* Daily zero-price Phuc Menh/Tuyet shop gift; never opens or consumes the bag. */

(__captureESMFunction((__esmLocal0=(() => {

 'use strict';const W=window,old=__getKVPV1(),c=old?._handoff?.();old?.stop?.();

 const actor=String(W.__KVPV_OWN_ACTOR_ID||''),same=c?.actor===actor;

 const S={enabled:true,timer:null,pending:same?c.pending:null,confirmed:same?c.confirmed:0,reason:'waiting',error:'',matches:[]};

 const shop=__captureESMFunction((__esmLocal1=(()=>W._Ba?._Iwt?._Dwt?.instance)),"shop"),cfg=__captureESMFunction((__esmLocal2=(()=>W._ft?._AY?.ins)),"cfg");

 const own=__captureESMFunction((__esmLocal3=(()=>actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED)),"own");

 let targetIds=null;

 const norm=__captureESMFunction((__esmLocal4=(s=>String(s??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase())),"norm");

 function candidates(){const out=[],table=cfg()?._PY;

  if(!table)return out;

  if(targetIds===null){const rows=Object.values(table).slice(0,20000);if(!rows.length)return out;

   targetIds=rows.filter(__captureESMFunction((__esmLocal6=(r=>{if(!Array.isArray(r))return false;const n=norm(W._ft?._mY?.ins?.getItemCfgById?.(r[1])?.[1]);return /tui\s*phuc\s*m[ae]nh/.test(n)&&n.includes('tuyet');})),"")).map(__captureESMFunction((__esmLocal7=(r=>r[0])),""));}

  for(const id of targetIds){const r=table[id];

  if(!Array.isArray(r)||!Number.isSafeInteger(r[0])||!Number.isSafeInteger(r[1])||!Array.isArray(r[8])||r[8][1]!==0||r[9]?.[0]!==1||r[9]?.[1]!==1)continue;

  const name=W._ft?._mY?.ins?.getItemCfgById?.(r[1])?.[1],n=norm(name);

  if(!/tui\s*phuc\s*m[ae]nh/.test(n)||!n.includes('tuyet'))continue;

  if(!(cfg()?.getCfgs?.(r[3],r[5])??[]).some(__captureESMFunction((__esmLocal8=(x=>x[0]===r[0])),"")))continue;

  if(Number(r[16])>0&&W._Ba?._IY?._BY?.ins?.getActIsOpen?.(r[16])!==true)continue;

  const used=shop()?.getCurBuyNum?.(r[0]),svip=W._Ba?._ke?._Le?.instance?.curSvipLv;

  if(!Number.isSafeInteger(used)||used<0||used>=1||!Number.isFinite(svip)||!Number.isFinite(r[10])||svip<r[10])continue;

  const required=Number(r[24]??0),rise=W._Ba?._$qt?._tKt?.ins?.curLV;

  if(required>0&&(!Number.isFinite(rise)||rise<required))continue;

  out.push({id:r[0],itemId:r[1],name,used,price:0});

 }return out;}
__esmLocal5=candidates;


 function sync(){try{if(!S.enabled||!own())return;

  if(S.pending){const count=shop()?.getCurBuyNum?.(S.pending.id);if(Number.isSafeInteger(count)&&count>S.pending.used){S.confirmed++;S.pending=null;}

   else {S.reason=Date.now()-S.pending.at>10000?'waiting_ack_no_retry':'waiting_server';return;}}

  S.matches=candidates();

  if(!S.matches.length){S.reason='no_verified_free_bag';return;}

  if(W._Ba?._$a?.SceneUtil?.isCommonScene!==true||W._Ba?._$a?._yo?.ins?.isInMission!==false||W._Ba?._rJ?._O$?.ins?.isDead!==false||

    Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)||W.KVPV?.core?.scene?.status?.()?.owner||__getKVPV0()?.beforeTask?.()===true){S.reason='waiting_idle';return;}

  if(__getKVPV2()?.busy?.()){S.reason='waiting_free_treasure';return;}

  const q=candidates()[0],rpc=W._Ba?._Iwt?._rLt?.instance;

  if(!q||typeof rpc?._uLt!=='function'){S.reason='waiting_native_api';return;}

  S.pending={id:q.id,itemId:q.itemId,used:q.used,at:Date.now()};S.reason='sent_free_bag';rpc._uLt(q.id,1);

 }catch(e){S.error=String(e?.message||e);S.reason='error_no_retry';}}
__esmLocal9=sync;


 function stop(){S.enabled=false;if(S.timer!==null)(__getKVPV3()?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;}
__esmLocal10=stop;


 W.KVPV_FREE_DAILY_BAG=Object.freeze({sync,stop,status:__captureESMFunction((__esmLocal11=(()=>({enabled:S.enabled,reason:S.reason,pending:S.pending?{...S.pending}:null,confirmed:S.confirmed,matches:S.matches.map(__captureESMFunction((__esmLocal12=(x=>({...x}))),"")),lastError:S.error,allowKNB:false}))),"status"),

  _handoff:__captureESMFunction((__esmLocal13=(()=>({actor,pending:S.pending,confirmed:S.confirmed}))),"_handoff")});

 S.timer=(__getKVPV3()?.timers?.setInterval??W.setInterval)(sync,1000);sync();

})),""))();


}
export {getKVPV_FREE_DAILY_BAG} from '../api.mjs';
export const api=Object.freeze({
  get KVPV_FREE_DAILY_BAG(){return globalThis.KVPV_FREE_DAILY_BAG;},
});