import {getKVPV_MONSTER_PLATE as __getKVPV0,getKVPV_V8 as __getKVPV1} from '../api.mjs';
export function call_KVPV_MONSTER_PLATE_probe(...args){const target=globalThis["KVPV_MONSTER_PLATE"];const fn=globalThis["KVPV_MONSTER_PLATE"]?.["probe"];if(typeof fn!=='function')throw Error("KVPV_MONSTER_PLATE.probe is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_MONSTER_PLATE_run(...args){const target=globalThis["KVPV_MONSTER_PLATE"];const fn=globalThis["KVPV_MONSTER_PLATE"]?.["run"];if(typeof fn!=='function')throw Error("KVPV_MONSTER_PLATE.run is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_MONSTER_PLATE_stop(...args){const target=globalThis["KVPV_MONSTER_PLATE"];const fn=globalThis["KVPV_MONSTER_PLATE"]?.["stop"];if(typeof fn!=='function')throw Error("KVPV_MONSTER_PLATE.stop is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_MONSTER_PLATE_status(...args){const target=globalThis["KVPV_MONSTER_PLATE"];const fn=globalThis["KVPV_MONSTER_PLATE"]?.["status"];if(typeof fn!=='function')throw Error("KVPV_MONSTER_PLATE.status is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_MONSTER_PLATE__handoff(...args){const target=globalThis["KVPV_MONSTER_PLATE"];const fn=globalThis["KVPV_MONSTER_PLATE"]?.["_handoff"];if(typeof fn!=='function')throw Error("KVPV_MONSTER_PLATE._handoff is not available");return Reflect.apply(fn,target,args);}
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
export {__esmLocal0 as local_anonymous_4_1_0};
export {__esmLocal1 as local_model_1};
export {__esmLocal2 as local_level_2};
export {__esmLocal3 as local_plan_3};
export {__esmLocal4 as local_probe_4};
export {__esmLocal5 as local_run_5};
export {__esmLocal6 as local_stop_6};
export {__esmLocal7 as local_status_7};
export {__esmLocal8 as local__handoff_8};
export {__esmLocal9 as local_probe_9};
export {__esmLocal10 as local_run_10};
export function initialize(){

 

(__captureESMFunction((__esmLocal0=(() => {

 'use strict';

 const W=window,old=__getKVPV0(),carry=old?._handoff?.();old?.stop?.();

 const actor=String(W.__KVPV_OWN_ACTOR_ID||''),S={enabled:true,pending:carry?.actor===actor?carry.pending:null,confirmed:carry?.actor===actor?carry.confirmed:0};

 const model=__captureESMFunction((__esmLocal1=(()=>W._Ba?._Lk?._yQ?.instance)),"model");

 const level=__captureESMFunction((__esmLocal2=((t,p)=>{const n=model()?.getEupByPart?.(t,p)?.[7]?.[3];return Number.isSafeInteger(n)&&n>=0?n:null;})),"level");

 function plan(){

  const m=model(),cfg=W._ft?.trgStrongCfg?.ins,bag=W._Ba?._Ic?._aQ?.ins,max=Number(m?.openMaxIndex);

  if(!Number.isInteger(max)||max<0||max>4)return null;

  for(let t=1;t<=max+1;t++)for(let p=1;p<=8;p++){

   const lv=level(t,p);if(lv===null)continue;

   const row=cfg?.getCfg?.(t,p,lv),next=cfg?.getCfg?.(t,p,lv+1),cost=cfg?.items?.(row,lv);

   const id=Number(cost?.[0]),need=Number(cost?.[1]),have=Number(bag?.getItemCountById?.(id));

   if(next&&Number.isSafeInteger(id)&&id>0&&Number.isSafeInteger(need)&&need>0&&have>=need&&m.partCanStrong?.(t,p)===true)

    return {t,p,lv,id,need,signature:JSON.stringify([t,p,lv,id,need,have])};

  }return null;

 }
__esmLocal3=plan;


 function probe(){

  if(S.pending){const lv=level(S.pending.t,S.pending.p);if(lv!==null&&lv>S.pending.lv){S.pending=null;S.confirmed++;}}

  if(!S.enabled||!actor||actor!==String(W._Ba?._rJ?._O$?.ins?.actorId??'')||W.__KVPV_UNIVERSAL_HALTED||S.pending||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0))return {ready:false};

  const p=plan();return p?{ready:typeof W._Ba?._Lk?._Qan?.ins?.strongEquip==='function',...p}:{ready:false};

 }
__esmLocal4=probe;


 function run(before){const p=probe();if(!p.ready||p.signature!==before.signature)throw Error('Quai Ban native state changed');

  S.pending={t:p.t,p:p.p,lv:p.lv};W._Ba._Lk._Qan.ins.strongEquip(p.t,p.p);

 }
__esmLocal5=run;


 function stop(){S.enabled=false;__getKVPV1()?.toggle?.('monster_plate_strength',false);}
__esmLocal6=stop;


 W.KVPV_MONSTER_PLATE=Object.freeze({probe,run,stop,status:__captureESMFunction((__esmLocal7=(()=>({enabled:S.enabled,pending:S.pending,confirmed:S.confirmed,allowKNB:false}))),"status"),_handoff:__captureESMFunction((__esmLocal8=(()=>({actor,...S}))),"_handoff")});

 try{__getKVPV1()?.register?.({id:'monster_plate_strength',name:'Cường hóa Quái Bàn',kind:'work',spend:'materials',verified:true,enabled:true,background:true,directDuringPve:true,redIds:[217,218,219,220,221,228],

  probe:__captureESMFunction((__esmLocal9=(()=>__getKVPV0().probe())),"probe"),run:__captureESMFunction((__esmLocal10=(p=>__getKVPV0().run(p))),"run")});}catch(e){if(!/Trung module ID|already exists/i.test(String(e)))throw e;}

 __getKVPV1()?.toggle?.('monster_plate_strength',true);

})),""))();


}
export {getKVPV_MONSTER_PLATE} from '../api.mjs';
export const api=Object.freeze({
  get KVPV_MONSTER_PLATE(){return globalThis.KVPV_MONSTER_PLATE;},
});