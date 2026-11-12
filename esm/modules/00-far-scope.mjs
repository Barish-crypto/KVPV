import {getKVPV_FAR_SCOPE as __getKVPV0,getKVPV_LINHLUNG922 as __getKVPV1,getKVPV_LINHLUNG_TH as __getKVPV2,getKVPV_RUNE_BOSS as __getKVPV3,getKVPV_TQ_SCOPE as __getKVPV4} from '../api.mjs';
export function pvpCoordinateDistance(a,b){
  if(!a||!b)return null;
  const ax=Number(a.x),ay=Number(a.y),bx=Number(b.x),by=Number(b.y);
  if(![ax,ay,bx,by].every(Number.isFinite))return null;
  const distance=Math.hypot(ax-bx,ay-by);
  return Number.isFinite(distance)?distance:null;
}
export function call_KVPV_FAR_SCOPE_status(...args){const target=globalThis["KVPV_FAR_SCOPE"];const fn=globalThis["KVPV_FAR_SCOPE"]?.["status"];if(typeof fn!=='function')throw Error("KVPV_FAR_SCOPE.status is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_FAR_SCOPE_tower(...args){const target=globalThis["KVPV_FAR_SCOPE"];const fn=globalThis["KVPV_FAR_SCOPE"]?.["tower"];if(typeof fn!=='function')throw Error("KVPV_FAR_SCOPE.tower is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_FAR_SCOPE_rune(...args){const target=globalThis["KVPV_FAR_SCOPE"];const fn=globalThis["KVPV_FAR_SCOPE"]?.["rune"];if(typeof fn!=='function')throw Error("KVPV_FAR_SCOPE.rune is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_FAR_SCOPE_truTien(...args){const target=globalThis["KVPV_FAR_SCOPE"];const fn=globalThis["KVPV_FAR_SCOPE"]?.["truTien"];if(typeof fn!=='function')throw Error("KVPV_FAR_SCOPE.truTien is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_FAR_SCOPE_inside(...args){const target=globalThis["KVPV_FAR_SCOPE"];const fn=globalThis["KVPV_FAR_SCOPE"]?.["inside"];if(typeof fn!=='function')throw Error("KVPV_FAR_SCOPE.inside is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_FAR_SCOPE_eligible(...args){const target=globalThis["KVPV_FAR_SCOPE"];const fn=globalThis["KVPV_FAR_SCOPE"]?.["eligible"];if(typeof fn!=='function')throw Error("KVPV_FAR_SCOPE.eligible is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_FAR_SCOPE_genericBoss(...args){const target=globalThis["KVPV_FAR_SCOPE"];const fn=globalThis["KVPV_FAR_SCOPE"]?.["genericBoss"];if(typeof fn!=='function')throw Error("KVPV_FAR_SCOPE.genericBoss is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_FAR_SCOPE_expedition(...args){const target=globalThis["KVPV_FAR_SCOPE"];const fn=globalThis["KVPV_FAR_SCOPE"]?.["expedition"];if(typeof fn!=='function')throw Error("KVPV_FAR_SCOPE.expedition is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_FAR_SCOPE_setAllBosses(...args){const target=globalThis["KVPV_FAR_SCOPE"];const fn=globalThis["KVPV_FAR_SCOPE"]?.["setAllBosses"];if(typeof fn!=='function')throw Error("KVPV_FAR_SCOPE.setAllBosses is not available");return Reflect.apply(fn,target,args);}
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
export {__esmLocal0 as local_anonymous_6_1_0};
export {__esmLocal1 as local_genericBoss_1};
export {__esmLocal2 as local_tower_2};
export {__esmLocal3 as local_anonymous_21_76_3};
export {__esmLocal4 as local_rune_4};
export {__esmLocal5 as local_truTien_5};
export {__esmLocal6 as local_status_6};
export {__esmLocal7 as local_eligible_7};
export {__esmLocal8 as local_inside_8};
export {__esmLocal9 as local_setAllBosses_9};
export {__esmLocal10 as local_expedition_10};
export function initialize(){





(__captureESMFunction((__esmLocal0=(() => {

  const W=window;
  function genericBoss(){return null;}
__esmLocal1=genericBoss;


  function tower(){try{

    const entry=W._Ba?._$a?._yo?.ins,live=Number(W._C?._Mn?._Cn?.currentID);

    const current=Number.isFinite(live)&&live>0?live:Number(entry?.intoSce?.[0]);

    const model=W._Ba?._tQ?._$Y?.ins,progress=Number(model?.finishLevel);

    const run=__getKVPV1()?.status?.(false);

    const floors=[run?.pendingFloor,progress+1,progress].map(Number).filter(__captureESMFunction((__esmLocal3=(n=>Number.isSafeInteger(n)&&n>0)),""));

    let floor=null;

    for(const n of floors){const cfg=W._ft?._u$?.ins?.getCfgByLv?.(n);if(Number(cfg?.[0])===current){floor=n;break;}}

    const inside=floor!==null&&current>0&&(entry?.isInMission===true||W._Ba?._$a?.SceneUtil?.isCommonScene===false);

    return {inside,current,floor,highestFloor:Number.isFinite(progress)?progress:null};

  }catch(e){return {inside:false,error:String(e)};}}
__esmLocal2=tower;


  

  function rune(){try{

    const entry=W._Ba?._$a?._yo?.ins,live=Number(W._C?._Mn?._Cn?.currentID);

    const current=Number.isFinite(live)&&live>0?live:Number(entry?.intoSce?.[0]);

    const model=W._Ba?._IH?._ZY?.inst;

    const floor=Number(__getKVPV3()?.status?.().pending?.floor??model?.currLv);

    const cfg=W._ft?._wZ?.ins?.getCfgByLv?.(floor);

    

    const inside=current===2201&&Number(entry?.intoSce?.[0])===2201&&

      Number.isSafeInteger(floor)&&floor>0&&Number(cfg?.[0])===floor&&

      (entry?.isInMission===true||W._Ba?._$a?.SceneUtil?.isCommonScene===false);

    return {inside,current,floor,highestFloor:Number(model?.finishLv)};

  }catch(e){return {inside:false,error:String(e)};}}
__esmLocal4=rune;


  

  function truTien(){try{

    const entry=W._Ba?._$a?._yo?.ins,live=Number(W._C?._Mn?._Cn?.currentID),current=Number.isFinite(live)&&live>0?live:Number(entry?.intoSce?.[0]);

    const cfg=W._ft?._po?.ins?.getCfgById?.(current),type=Number(cfg?.[7]);

    const inside=current>0&&Number(entry?.intoSce?.[0])===current&&type===52&&W._Ba?._$a?.SceneUtil?.isCommonScene===false;

    return {inside,current,floor:Number(entry?.intoSce?.[3])||null,type};

  }catch(e){return {inside:false,error:String(e)};}}
__esmLocal5=truTien;


  // The checked-in client switches into Expedition from scene type 74.
  // Require the live and entry maps, native scene type, non-common scene,
  // and owned actor to agree before enabling combat.
  function expedition(){try{
    const entry=W._Ba?._$a?._yo?.ins,actor=String(W._Ba?._rJ?._O$?.ins?.actorId??'');
    const live=Number(W._C?._Mn?._Cn?.currentID),entryMap=Number(entry?.intoSce?.[0]);
    const current=Number.isFinite(live)&&live>0?live:entryMap;
    const type=Number(W._ft?._po?.ins?.getCfgById?.(current)?.[7]);
    const scene=Number(W._Ba?._$a?.SceneUtil?.curScene);
    const owned=actor!==''&&actor===String(W.__KVPV_OWN_ACTOR_ID??'');
    const inside=owned&&current>0&&current===entryMap&&scene===74&&type===74&&
      W._Ba?._$a?.SceneUtil?.isCommonScene===false;
    return {inside,current,entryMap,scene,type,owned};
  }catch(e){return {inside:false,error:String(e)};}}
__esmLocal10=expedition;


  function status(){const ll=tower();

    if(ll.inside&&__getKVPV2()?.enabled!==false)return {...ll,kind:'LINH_LUNG'};

    const rv=rune();if(rv.inside)return {...rv,kind:'PHU_VAN'};

    const tt=truTien();if(tt.inside)return {...tt,kind:'TRU_TIEN'};

    const tq=__getKVPV4()?.status?.();if(tq?.inside)return {...tq,inside:true,kind:'THIEN_QUAN'};
    const ex=expedition();if(ex.inside)return {...ex,kind:'EXPEDITION'};
    return genericBoss()??{...tq,inside:false,kind:'OUTSIDE'};

  }
__esmLocal6=status;


  function eligible(target){if(!target||target.isValid===false)return false;
    const targetType=Number(target.property?.get?.('type'));
    const scope=status();
    // Tru Tien can select a type-3 combat entity; still reject players (type 4).
    if(targetType!==1&&!(scope.inside&&scope.kind==='TRU_TIEN'&&targetType===3))return false;

    const hp=target.property?.get?.('hp');if(Array.isArray(hp)&&Number(hp[0])<=0)return false;

    const s=status();if(!s.inside)return false;
    if(s.kind==='ALL_BOSS'){const candidate=genericBoss(target);return candidate!==null&&candidate.bossId===s.bossId&&candidate.occ===s.occ;}

    if(s.kind==='EXPEDITION'){
      const owner=String(W.__KVPV_OWN_ACTOR_ID??'');
      const actor=W._C?._Ba?.instance?.getRole?.(Number(owner))??W._C?._Ba?.instance?.getRole?.(owner);
      const a=actor?.property?.get?.('position'),b=target.property?.get?.('position');
      if(!a||!b)return false;
      // PvP-style client coordinate distance is informational/safety only;
      // native target, cooldown and range checks remain the attack authority.
      return pvpCoordinateDistance(a,b)!==null&&targetType===1;
    }

    if(['LINH_LUNG','PHU_VAN','TRU_TIEN'].includes(s.kind))return true;

    const lv=W._Ba?._Co?._Mo?.ins?.curLv,cfg=W._ft?._h$?.ins?.getCfgByLv?.(lv);

    const expected=Number(cfg&&W._ft?._h$?.ins?.occ?.(cfg,lv));

    return expected>0&&Number(target.property?.get?.('occ'))===expected;

  }
__esmLocal7=eligible;


  W.KVPV_FAR_SCOPE=Object.freeze({status,tower,rune,truTien,expedition,inside:__captureESMFunction((__esmLocal8=(()=>status().inside)),"inside"),eligible,genericBoss,setAllBosses(){
__esmLocal9=__captureESMMethod(this,"setAllBosses","init");
return status();}});

})),""))();


}
export {getKVPV_FAR_SCOPE} from '../api.mjs';
export const api=Object.freeze({
  get KVPV_FAR_SCOPE(){return globalThis.KVPV_FAR_SCOPE;},
});