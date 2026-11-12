// Kiếm Khiêu event/window registration and entry flow; scene-84 combo/movement lives in 71-kiem-khieu-basic.mjs.
import {getKVPV_DAILY as __getKVPV0,getKVPV_DAILY_CLOCK as __getKVPV1,getKVPV_HITRUN1 as __getKVPV2,getKVPV_KIEM_KHIEU as __getKVPV3,getKVPV_V1 as __getKVPV4} from '../api.mjs';
export function call_KVPV_KIEM_KHIEU_sync(...args){const target=globalThis["KVPV_KIEM_KHIEU"];const fn=globalThis["KVPV_KIEM_KHIEU"]?.["sync"];if(typeof fn!=='function')throw Error("KVPV_KIEM_KHIEU.sync is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_KIEM_KHIEU_stop(...args){const target=globalThis["KVPV_KIEM_KHIEU"];const fn=globalThis["KVPV_KIEM_KHIEU"]?.["stop"];if(typeof fn!=='function')throw Error("KVPV_KIEM_KHIEU.stop is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_KIEM_KHIEU_status(...args){const target=globalThis["KVPV_KIEM_KHIEU"];const fn=globalThis["KVPV_KIEM_KHIEU"]?.["status"];if(typeof fn!=='function')throw Error("KVPV_KIEM_KHIEU.status is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_KIEM_KHIEU__handoff(...args){const target=globalThis["KVPV_KIEM_KHIEU"];const fn=globalThis["KVPV_KIEM_KHIEU"]?.["_handoff"];if(typeof fn!=='function')throw Error("KVPV_KIEM_KHIEU._handoff is not available");return Reflect.apply(fn,target,args);}
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
export {__esmLocal0 as local_anonymous_4_1_0};
export {__esmLocal1 as local_own_1};
export {__esmLocal2 as local_model_2};
export {__esmLocal3 as local_once_3};
export {__esmLocal4 as local_idle_4};
export {__esmLocal5 as local_tick_5};
export {__esmLocal6 as local_anonymous_42_88_6};
export {__esmLocal7 as local_anonymous_52_26_7};
export {__esmLocal8 as local_anonymous_54_38_8};
export {__esmLocal9 as local_anonymous_66_103_9};
export {__esmLocal10 as local_anonymous_80_25_10};
export {__esmLocal11 as local_anonymous_84_64_11};
export {__esmLocal12 as local_anonymous_96_21_12};
export {__esmLocal13 as local_stop_13};
export {__esmLocal14 as local_status_14};
export {__esmLocal15 as local__handoff_15};
export function initialize(){

 

(__captureESMFunction((__esmLocal0=(() => {

 'use strict';const W=window,old=__getKVPV3(),c=old?._handoff?.();old?.stop?.();

 const actor=String(W.__KVPV_OWN_ACTOR_ID||''),storage='kvpv.kiem-khieu.v1.'+actor;

 let attempts=c?.actor===actor?c.attempts:{};

 try{const saved=JSON.parse(W.localStorage?.getItem(storage)||'{}');if(saved&&typeof saved==='object'&&!Array.isArray(saved))attempts={...saved,...attempts};}catch(_){}

 const S={enabled:true,timer:null,reason:'waiting_server_window',error:'',pending:null,window:null,registered:false,inside:false,claimed:0};

 const own=__captureESMFunction((__esmLocal1=(()=>actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED)),"own");

 const model=__captureESMFunction((__esmLocal2=(()=>W._Ba?._T_t?._k_t?.ins)),"model");

 function once(key,fn){if(attempts[key])return false;attempts[key]=Date.now();const rows=Object.entries(attempts).slice(-150);attempts=Object.fromEntries(rows);try{W.localStorage?.setItem(storage,JSON.stringify(attempts));}catch(_){}S.pending=key;fn();return true;}
__esmLocal3=once;


 function idle(){const q=__getKVPV0()?.quickState?.(),s=W.KVPV?.core?.scene?.status?.();return q?.running===true&&['rảnh','ranh'].includes(q.job)&&!s?.owner&&__getKVPV2()?.status?.(false)?.running!==true&&

  W._Ba?._$a?.SceneUtil?.isCommonScene===true&&W._Ba?._$a?._yo?.ins?.isInMission===false&&W._Ba?._cm?._q3t?.ins?.getHasTeams?.()!==true;}
__esmLocal4=idle;


 function tick(){try{

  if(!S.enabled||!own())return;

  const m=model(),rpc=W._Ba?._T_t?._O3n?.ins,now=Number(W._Sa?.svrTime),state=m?.getSceneState1?.();

  S.inside=Number(W._ft?._po?.ins?.getCfgById?.(Number(W._C?._Mn?._Cn?.currentID))?.[7])===84;

  if(!m||!Array.isArray(state)||!Number.isFinite(now)||now<=0){S.reason='waiting_native_event_state';return;}

  const end=Number(state[4]);if(!Number.isFinite(end)||end<=0){S.reason='unknown_window';return;}

  const day=__getKVPV1()?.key?.()??new Date().toISOString().slice(0,10),key=day+'/'+end;

  S.window=key;const info=m.enterInfo;S.registered=Array.isArray(info)&&Number(info[1])>0;

  if(!Array.isArray(info)){if(state[7]&&typeof m.reqInfo==='function')once(key+'/query',__captureESMFunction((__esmLocal6=(()=>m.reqInfo(0,0))),""));S.reason='waiting_enter_info';return;}

  if(W._Ba?._rJ?._O$?.ins?.isDead!==false||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)){S.reason='yield_user_or_dead';return;}

  

  const rewards=W._ft?._UAh?.ins?.getRewardCfgByType?.(1),damage=Number(info[2]),received=info[3];

  if(Array.isArray(rewards)&&Number.isFinite(damage)&&Array.isArray(received)&&typeof rpc?.reqHurtReward==='function'){

   const row=rewards.find(__captureESMFunction((__esmLocal7=(r=>Array.isArray(r)&&Number.isSafeInteger(r[0])&&Number.isFinite(r[2])&&r[2]<=damage&&!received.includes(r[0])&&!attempts[key+'/reward/'+r[0]])),""));

   if(row){once(key+'/reward/'+row[0],__captureESMFunction((__esmLocal8=(()=>rpc.reqHurtReward(row[0]))),""));S.reason='reward_requested_wait_server';return;}

   S.claimed=received.length;

  }

  if(S.inside){S.reason='inside_native_combat';return;}

  

  if(m.isChampion===true&&[1,2,3].includes(Number(m.stageStat))){

   if(idle()&&m.keepOutSize===false&&typeof rpc?.reqKeepOutSize==='function')once(day+'/keep-champion',__captureESMFunction((__esmLocal9=(()=>rpc.reqKeepOutSize(1))),""));

   S.reason='champion_wait_native_round';return;

  }

  if(!state[7]||Number(m.stageStat)!==0){S.reason='waiting_open_elimination';return;}

  if(!idle()){S.reason='yield_current_activity';return;}

  if(end>now){

   if(Number(info[1])===0&&typeof W._Ba?._a2t?._P3n?.ins?.c2sName==='function'){

    once(key+'/register',__captureESMFunction((__esmLocal10=(()=>W._Ba._a2t._P3n.ins.c2sName(1581))),""));

    

    if(typeof m.reqInfo==='function')once(key+'/register-query',__captureESMFunction((__esmLocal11=(()=>m.reqInfo(0,0))),""));

    S.reason='registration_requested_wait_server';

   }else S.reason='registered_wait_entry_time';

   return;

  }

  if(Number(state[2])===2&&S.registered&&Number(m.matchCd)>0&&typeof W._Ba?._sst?._Cht?.inst?.rqEtScene==='function'){

   once(key+'/enter',__captureESMFunction((__esmLocal12=(()=>W._Ba._sst._Cht.inst.rqEtScene(8501,1))),""));S.reason='entry_requested_wait_server';

  }else S.reason='waiting_native_match';

 }catch(e){S.error=String(e.message||e);S.reason='error_no_replay';}}
__esmLocal5=tick;


 function stop(){S.enabled=false;if(S.timer!==null)(__getKVPV4()?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;}
__esmLocal13=stop;


 W.KVPV_KIEM_KHIEU=Object.freeze({sync:tick,stop,status:__captureESMFunction((__esmLocal14=(()=>({enabled:S.enabled,reason:S.reason,lastError:S.error,window:S.window,registered:S.registered,inside:S.inside,claimed:S.claimed,pending:S.pending,nativeCombat:true}))),"status"),_handoff:__captureESMFunction((__esmLocal15=(()=>({actor,attempts:{...attempts}}))),"_handoff")});

 {const schedule=__getKVPV4()?.timers?.setInterval??W.setInterval;if(typeof schedule==='function')S.timer=schedule(tick,1000);}tick();

})),""))();


}
export {getKVPV_KIEM_KHIEU} from '../api.mjs';
export const api=Object.freeze({
  get KVPV_KIEM_KHIEU(){return globalThis.KVPV_KIEM_KHIEU;},
});