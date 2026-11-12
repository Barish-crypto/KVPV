import {getKVPV_BAG_OPEN_SESSION as __getKVPV0} from '../api.mjs';
export function call_KVPV_BAG_OPEN_SESSION_stop(...args){const target=globalThis["KVPV_BAG_OPEN_SESSION"];const fn=globalThis["KVPV_BAG_OPEN_SESSION"]?.["stop"];if(typeof fn!=='function')throw Error("KVPV_BAG_OPEN_SESSION.stop is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_BAG_OPEN_SESSION_status(...args){const target=globalThis["KVPV_BAG_OPEN_SESSION"];const fn=globalThis["KVPV_BAG_OPEN_SESSION"]?.["status"];if(typeof fn!=='function')throw Error("KVPV_BAG_OPEN_SESSION.status is not available");return Reflect.apply(fn,target,args);}
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
export {__esmLocal0 as local_anonymous_4_1_0};
export {__esmLocal1 as local_tick_1};
export {__esmLocal2 as local_find_2};
export {__esmLocal3 as local_anonymous_40_35_3};
export {__esmLocal4 as local_anonymous_78_35_4};
export {__esmLocal5 as local_anonymous_78_69_5};
export {__esmLocal6 as local_stop_6};
export {__esmLocal7 as local_status_7};
export function initialize(){

/* User-requested finite opening session, only actor 10158939833447 and observed stacks. */

(__captureESMFunction((__esmLocal0=(() => {

  'use strict';

  const W=window,actor='10158939833447';

  const S=W.__KVPV_BAG_OPEN_SESSION_20261025??={pending:null,confirmed:0,requests:0,history:[],done:[],reason:'starting'};

  __getKVPV0()?.stop?.();

  const targets=[

    [30910001,'10139231968102',1],[30910002,'10139231968101',1],

    [30920003,'10139231968100',2],[30230002,'10139231968099',10],

    [30850010,'10139231968105',1],[30350008,'10139231968103',2],

    [30450008,'10139231968104',2],[31040002,'10139231970411',1]

  ];

  let timer=null;

  function tick(){try{

    if(S.paused){stop();return;}

    if(String(W._Ba?._rJ?._O$?.ins?.actorId)!==actor||W.__KVPV_UNIVERSAL_HALTED){stop();return;}

    const bag=W._Ba?._Ic?._aQ?.ins,rows=bag?.getItemsByBagType?.(0);

    if(bag?.isBagInited!==true||!Array.isArray(rows)){S.reason='waiting_bag';return;}

    const find=__captureESMFunction((__esmLocal2=((id,uid)=>rows.find(__captureESMFunction((__esmLocal3=(r=>r[0]===id&&String(r[2])===uid)),"")))),"find");

    if(S.pending){

      const p=S.pending,item=find(p.id,p.uid),count=item?item[1]:0;

      if(count<p.before){S.confirmed+=p.before-count;S.history.push({...p,after:count,confirmedAt:Date.now()});S.pending=null;}

      else {

        S.reason=Date.now()-p.at>10000?'no_inventory_ack_no_retry':'waiting_inventory_ack';

        if(S.reason==='no_inventory_ack_no_retry'){S.paused=true;stop();}

        return;

      }

    }

    if(W._Ba?._$a?.SceneUtil?.isCommonScene!==true||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)){

      S.reason='waiting_idle';return;

    }

    const rpc=W._Ba?._Ic?._oJ?.instance,tool=W._Ba?._Ic?.BeiBaoTool;

    if(typeof rpc?.c2sUseBagItem!=='function'||typeof tool?.checkItemCanUseOrNotice!=='function'){S.reason='missing_native_api';return;}

    for(const [id,uid,initial] of targets){

      const key=id+'/'+uid;if(S.done.includes(key))continue;

      const item=find(id,uid);

      if(!item||item[1]<=0){S.done.push(key);continue;}

      const spent=S.history.filter(__captureESMFunction((__esmLocal4=(h=>h.id===id&&h.uid===uid)),"")).reduce(__captureESMFunction((__esmLocal5=((n,h)=>n+h.before-h.after)),""),0);

      if(spent>=initial){S.done.push(key);continue;}

      if(tool.checkItemCanUseOrNotice(item,false)!==true){S.done.push(key);S.history.push({id,uid,before:item[1],after:item[1],skipped:'native_not_usable'});continue;}

      S.pending={id,uid,before:item[1],at:Date.now()};S.requests++;S.reason='use_requested';

      rpc.c2sUseBagItem(Number(uid),id,1);return;

    }

    S.reason='finished';stop();

  }catch(e){S.reason='error_no_retry';S.error=String(e.message);stop();}}
__esmLocal1=tick;


  function stop(){if(timer!==null){W.clearInterval(timer);timer=null;}}
__esmLocal6=stop;


  W.KVPV_BAG_OPEN_SESSION=Object.freeze({stop,status:__captureESMFunction((__esmLocal7=(()=>({...S,history:S.history.slice(-30)}))),"status")});

  if(String(W._Ba?._rJ?._O$?.ins?.actorId)!==actor){S.reason='actor_not_authorized';return;}

  timer=W.setInterval(tick,1000);

})),""))();


}
export {getKVPV_BAG_OPEN_SESSION} from '../api.mjs';
export const api=Object.freeze({
  get KVPV_BAG_OPEN_SESSION(){return globalThis.KVPV_BAG_OPEN_SESSION;},
});