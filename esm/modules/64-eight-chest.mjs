import {getKVPV_DAILY_CLOCK as __getKVPV0,getKVPV_EIGHT_CHEST as __getKVPV1,getKVPV_V1 as __getKVPV2} from '../api.mjs';
export function call_KVPV_EIGHT_CHEST_sync(...args){const target=globalThis["KVPV_EIGHT_CHEST"];const fn=globalThis["KVPV_EIGHT_CHEST"]?.["sync"];if(typeof fn!=='function')throw Error("KVPV_EIGHT_CHEST.sync is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_EIGHT_CHEST_stop(...args){const target=globalThis["KVPV_EIGHT_CHEST"];const fn=globalThis["KVPV_EIGHT_CHEST"]?.["stop"];if(typeof fn!=='function')throw Error("KVPV_EIGHT_CHEST.stop is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_EIGHT_CHEST_status(...args){const target=globalThis["KVPV_EIGHT_CHEST"];const fn=globalThis["KVPV_EIGHT_CHEST"]?.["status"];if(typeof fn!=='function')throw Error("KVPV_EIGHT_CHEST.status is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_EIGHT_CHEST__handoff(...args){const target=globalThis["KVPV_EIGHT_CHEST"];const fn=globalThis["KVPV_EIGHT_CHEST"]?.["_handoff"];if(typeof fn!=='function')throw Error("KVPV_EIGHT_CHEST._handoff is not available");return Reflect.apply(fn,target,args);}
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
export {__esmLocal0 as local_anonymous_4_1_0};
export {__esmLocal1 as local_user_1};
export {__esmLocal2 as local_model_2};
export {__esmLocal3 as local_own_3};
export {__esmLocal4 as local_inside_4};
export {__esmLocal5 as local_day_5};
export {__esmLocal6 as local_expected_6};
export {__esmLocal7 as local_chestName_7};
export {__esmLocal8 as local_ack_8};
export {__esmLocal9 as local_tick_9};
export {__esmLocal10 as local_stop_10};
export {__esmLocal11 as local_status_11};
export {__esmLocal12 as local__handoff_12};
export function initialize(){

/* Peak scene71 floor9: native NPC selection -> real gather panel click -> server ACK. */

(__captureESMFunction((__esmLocal0=(() => {

'use strict';const W=window,old=__getKVPV1(),c=old?._handoff?.();old?.stop?.();

const actor=String(W.__KVPV_OWN_ACTOR_ID||''),same=c?.actor===actor;

const S={enabled:true,timer:null,pending:same?c.pending:null,claimed:new Set(same?c.claimed:[]),lastSelect:-Infinity,clicks:same?c.clicks:0,confirmed:same?c.confirmed:0,reason:'waiting_floor9',error:'',listening:false};



const user=__captureESMFunction((__esmLocal1=(()=>W._Ba?._rJ?._O$?.ins)),"user"),model=__captureESMFunction((__esmLocal2=(()=>W._Ba?._K_t?._Z7t?.ins)),"model");

const own=__captureESMFunction((__esmLocal3=(()=>actor&&actor===String(user()?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED)),"own");

const inside=__captureESMFunction((__esmLocal4=(()=>Number(W._ft?._po?.ins?.getCfgById?.(Number(W._C?._Mn?._Cn?.currentID))?.[7])===71&&Number(W._Ba?._$a?._yo?.ins?.intoSce?.[3])===9)),"inside");

const day=__captureESMFunction((__esmLocal5=(()=>__getKVPV0()?.key?.()??new Date(Date.now()+7200000).toISOString().slice(0,10))),"day");

function expected(){return -1;}
__esmLocal6=expected;


const chestName=__captureESMFunction((__esmLocal7=(role=>/rương|ruong/.test(String(role?.property?.get?.('name')??'').toLocaleLowerCase('vi')))),"chestName");

const observer={};

function ack(){const p=S.pending;if(!S.enabled||!own()||!inside()||!p||String(model()?.tNpcId)!==p.id)return;S.claimed.add(p.key);S.pending=null;S.confirmed++;S.reason='server_gather_confirmed';}
__esmLocal8=ack;


function tick(){try{

if(!S.enabled||!own())return;

if(!S.listening&&typeof W._Sa?.notify?.on==='function'){W._Sa.notify.on(5038,observer,ack);S.listening=true;}

if(!inside()){S.reason='waiting_floor9';return;}

const key=day()+'/eight-floor9';if(S.claimed.has(key)){S.reason='already_confirmed';return;}if(S.pending){S.reason='waiting_server_ack_no_retry';return;}

if(user()?.isDead!==false){S.reason='waiting_revive';return;}

const occ=expected();

if(model()?.gathering===true){S.reason='native_gathering';return;}

const manager=W._ft?._Y4n?.ins,panel=manager?.getPanelById?.(166),id=model()?.tNpcId,role=W._C?._Ba?.instance?.getRole?.(id);

if(manager?.isOpened?.(166)===true&&panel?.parent&&panel.visible!==false&&String(panel._lhi)===String(id)&&chestName(role)&&typeof panel._tci==='function'&&Number(panel._sci)!==1){

 if(!S.listening){S.reason='waiting_ack_observer';return;}

 S.pending={key,id:String(id),occ,at:Date.now()};S.clicks++;S.reason='clicked_native_gather';panel._tci();return;

}

if(Date.now()-S.lastSelect>=5000&&typeof user()?.selectTar==='function'){S.lastSelect=Date.now();user().selectTar(3,occ);}

S.reason='moving_to_chest_waiting_native_panel';

}catch(e){S.error=String(e.message||e);S.reason='error_no_retry';}}
__esmLocal9=tick;


function stop(){S.enabled=false;if(S.timer!==null)(__getKVPV2()?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;if(S.listening)W._Sa?.notify?.off?.(5038,observer,ack);S.listening=false;}
__esmLocal10=stop;


W.KVPV_EIGHT_CHEST=Object.freeze({sync:tick,stop,status:__captureESMFunction((__esmLocal11=(()=>({enabled:S.enabled,inside:inside(),reason:S.reason,lastError:S.error,pending:S.pending,clicks:S.clicks,confirmed:S.confirmed,doneToday:S.claimed.has(day()+'/eight-floor9'),npcSelection:'native_nearest_chest_name_verified'}))),"status"),_handoff:__captureESMFunction((__esmLocal12=(()=>({actor,pending:S.pending,claimed:[...S.claimed],clicks:S.clicks,confirmed:S.confirmed}))),"_handoff")});

S.timer=(__getKVPV2()?.timers?.setInterval??W.setInterval)(tick,500);tick();

})),""))();


}
export {getKVPV_EIGHT_CHEST} from '../api.mjs';
export const api=Object.freeze({
  get KVPV_EIGHT_CHEST(){return globalThis.KVPV_EIGHT_CHEST;},
});