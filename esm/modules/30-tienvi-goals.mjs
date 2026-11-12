import {getKVPV_QUEST_GOALS as __getKVPV0,getKVPV_QUEST_PRIORITY as __getKVPV1,getKVPV_TIENVI_GOALS as __getKVPV2,getKVPV_V1 as __getKVPV3} from '../api.mjs';
export function call_KVPV_TIENVI_GOALS_start(...args){const target=globalThis["KVPV_TIENVI_GOALS"];const fn=globalThis["KVPV_TIENVI_GOALS"]?.["start"];if(typeof fn!=='function')throw Error("KVPV_TIENVI_GOALS.start is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_TIENVI_GOALS_stop(...args){const target=globalThis["KVPV_TIENVI_GOALS"];const fn=globalThis["KVPV_TIENVI_GOALS"]?.["stop"];if(typeof fn!=='function')throw Error("KVPV_TIENVI_GOALS.stop is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_TIENVI_GOALS_sync(...args){const target=globalThis["KVPV_TIENVI_GOALS"];const fn=globalThis["KVPV_TIENVI_GOALS"]?.["sync"];if(typeof fn!=='function')throw Error("KVPV_TIENVI_GOALS.sync is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_TIENVI_GOALS_goal(...args){const target=globalThis["KVPV_TIENVI_GOALS"];const fn=globalThis["KVPV_TIENVI_GOALS"]?.["goal"];if(typeof fn!=='function')throw Error("KVPV_TIENVI_GOALS.goal is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_TIENVI_GOALS_inspect(...args){const target=globalThis["KVPV_TIENVI_GOALS"];const fn=globalThis["KVPV_TIENVI_GOALS"]?.["inspect"];if(typeof fn!=='function')throw Error("KVPV_TIENVI_GOALS.inspect is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_TIENVI_GOALS_status(...args){const target=globalThis["KVPV_TIENVI_GOALS"];const fn=globalThis["KVPV_TIENVI_GOALS"]?.["status"];if(typeof fn!=='function')throw Error("KVPV_TIENVI_GOALS.status is not available");return Reflect.apply(fn,target,args);}
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
export {__esmLocal0 as local_anonymous_6_1_0};
export {__esmLocal1 as local_norm_1};
export {__esmLocal2 as local_classify_2};
export {__esmLocal3 as local_read_3};
export {__esmLocal4 as local_anonymous_44_23_4};
export {__esmLocal5 as local_anonymous_44_100_5};
export {__esmLocal6 as local_valid_6};
export {__esmLocal7 as local_goal_7};
export {__esmLocal8 as local_anonymous_68_25_8};
export {__esmLocal9 as local_anonymous_68_68_9};
export {__esmLocal10 as local_sync_10};
export {__esmLocal11 as local_stop_11};
export {__esmLocal12 as local_start_12};
export {__esmLocal13 as local_status_13};
export {__esmLocal14 as local_anonymous_92_75_14};
export function initialize(){





(__captureESMFunction((__esmLocal0=(() => {

  'use strict';

  const W=window,old=__getKVPV2();old?.stop?.();

  const actor=String(W.__KVPV_OWN_ACTOR_ID||'');

  const S={enabled:true,timer:null,reason:'waiting_tasks',tasks:[],lastError:''};

  const norm=__captureESMFunction((__esmLocal1=(x=>String(x||'').replace(/<[^>]*>/g,'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/gi,'d').toLowerCase())),"norm");

  function classify(q){

    const n=norm(q.name);

    if(/nap|svip|vip|mua|tieu.*knb|nguyen bao/.test(n))return 'manual_paid';

    if(q.action===21&&/linh lung thap/.test(n)&&Number.isSafeInteger(q.target)&&q.target>0&&q.target<=10000)return 'tower';

    if(/phong thuy/.test(n)&&/tien phu/.test(n))return 'feng_shui';

    if(/nhiem vu/.test(n)&&/tien phu/.test(n))return 'home_tasks';

    if(/tuyet hoc|cuong hoa|da hon|linh don|luyen don/.test(n))return 'upgrade_queue';

    if(/phap bao/.test(n))return 'fabao';

    if(/than binh|linh duc|thoi trang|linh ti|thu cuoi/.test(n))return 'appearance';

    return 'unverified_requirement';

  }
__esmLocal2=classify;


  function read(){

    const rows=W._Ba?._G_n?._U_n?.ins?.tasks;if(!Array.isArray(rows))return [];

    return rows.filter(__captureESMFunction((__esmLocal4=(r=>Array.isArray(r)&&Number.isSafeInteger(Number(r[0]))&&Number(r[0])>0)),"")).map(__captureESMFunction((__esmLocal5=(r=>{

      const cfg=W._ft?._mei?.ins?.getXianweiTaskDataById?.(Number(r[0]));

      const q={id:String(r[0]),state:Number(r[1]),progress:Number(r[2])||0,name:String(cfg?.[3]||''),action:Number(cfg?.[11]?.[0]),target:Number(cfg?.[12]),source:'TIEN_VI'};

      q.executor=cfg?classify(q):'waiting_config';

      q.reason=q.state===1?'waiting_shared_reward_queue':q.state!==0?'claimed':q.executor==='tower'?'tower_goal':

        ['feng_shui','home_tasks','upgrade_queue','fabao','appearance'].includes(q.executor)?'existing_material_executor':q.executor;

      return q;

    })),""));

  }
__esmLocal3=read;


  function valid(){return actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;}
__esmLocal6=valid;


  function goal(){if(!S.enabled||!valid())return null;

    // Read fresh server state on every request; never cache a completed goal.

    return read().filter(__captureESMFunction((__esmLocal8=(q=>q.state===0&&q.executor==='tower')),"")).sort(__captureESMFunction((__esmLocal9=((a,b)=>a.target-b.target)),""))[0]??null;

  }
__esmLocal7=goal;


  function sync(){try{

    if(!S.enabled)return;if(!valid()){stop();return;}

    S.tasks=read();S.reason=S.tasks.length?'tracking_native_tasks':'waiting_tasks';

    // Claim and material work retain their existing ACK/rate-limit queue.

    // This controller adds no independent reward sender or item purchase.

    __getKVPV0()?.sync?.();

  }catch(e){S.lastError=String(e);S.reason='error';}}
__esmLocal10=sync;


  function stop(){S.enabled=false;if(S.timer!==null)(__getKVPV3()?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;}
__esmLocal11=stop;


  function start(){if(S.timer!==null)return;S.enabled=true;S.timer=(__getKVPV3()?.timers?.setInterval??W.setInterval)(sync,1000);sync();}
__esmLocal12=start;


  W.KVPV_TIENVI_GOALS=Object.freeze({start,stop,sync,goal,inspect:read,

    status:__captureESMFunction((__esmLocal13=(()=>({enabled:S.enabled,actor,reason:S.reason,tasks:S.tasks.map(__captureESMFunction((__esmLocal14=(q=>({...q}))),"")),lastError:S.lastError,allowKNB:false}))),"status")});

  __getKVPV1()?.start?.();

  start();

})),""))();


}
export {getKVPV_TIENVI_GOALS} from '../api.mjs';
export const api=Object.freeze({
  get KVPV_TIENVI_GOALS(){return globalThis.KVPV_TIENVI_GOALS;},
});