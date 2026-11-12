import {getKVPV_TQ_SCOPE as __getKVPV0} from '../api.mjs';
export function call_KVPV_TQ_SCOPE_inside(...args){const target=globalThis["KVPV_TQ_SCOPE"];const fn=globalThis["KVPV_TQ_SCOPE"]?.["inside"];if(typeof fn!=='function')throw Error("KVPV_TQ_SCOPE.inside is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_TQ_SCOPE_status(...args){const target=globalThis["KVPV_TQ_SCOPE"];const fn=globalThis["KVPV_TQ_SCOPE"]?.["status"];if(typeof fn!=='function')throw Error("KVPV_TQ_SCOPE.status is not available");return Reflect.apply(fn,target,args);}
function __captureESMFunction(fn,name){
  if(fn.name!==name)Object.defineProperty(fn,"name",{value:name,configurable:true});
  return fn;
}
let __esmLocal0;
let __esmLocal1;
let __esmLocal2;
export {__esmLocal0 as local_anonymous_8_1_0};
export {__esmLocal1 as local_status_1};
export {__esmLocal2 as local_inside_2};
export function initialize(){





/* Determine the actual stage map, not just the currently selected monster. */

(__captureESMFunction((__esmLocal0=(() => {

  const W=window;

  let confirmedMap=null;
  let lastStageProof=null;
  const PROOF_GRACE_MS=5000;

  

  function status(){try{

    const model=W._Ba?._Co?._Mo?.ins;

    const entry=Number(W._Ba?._$a?._yo?.ins?.intoSce?.[0]);

    const live=Number(W._C?._Mn?._Cn?.currentID);

    const current=Number.isFinite(live)&&live>0?live:entry;

    const stageCfg=W._ft?._h$?.ins?.getCfgByLv?.(model?.curLv);

    const expected=Number(stageCfg?.[0]);

    const type=Number(W._ft?._po?.ins?.getCfgById?.(current)?.[7]);

    const mission=W._Ba?._$a?._yo?.ins?.isInMission===true;

    // Observed Tian Quan sessions use these type-35 combat maps even though

    // SceneUtil classifies type 35 as common and the stage cfg points to 2011.

    // Require the native mission flag; never treat every common type-35 map as a stage.

    const observedStageMap=[2992,2995,2996].includes(current)&&type===35;

    const actor=String(W.__KVPV_OWN_ACTOR_ID||W._Ba?._rJ?._O$?.ins?.actorId||'');

    const world=W._C?._Ba?.instance;

    const role=world?.getRole?.(Number(actor))??world?.getRole?.(actor);

    const target=role?.getComponent?.(W._d?._Yct?._Het)?.target;

    const expectedOcc=Number(stageCfg&&W._ft?._h$?.ins?.occ?.(stageCfg,model?.curLv));

    const targetOcc=Number(target?.property?.get?.('occ'));

    const stageBossMatches=target?.isValid!==false&&Number(target?.property?.get?.('type'))===1&&

      expectedOcc>0&&targetOcc===expectedOcc;

    

    if(confirmedMap!==current)confirmedMap=null;
    const actorNow=String(W._Ba?._rJ?._O$?.ins?.actorId??'');
    const owned=actorNow!==''&&actorNow===String(W.__KVPV_OWN_ACTOR_ID??'');
    if(lastStageProof&&(lastStageProof.map!==current||lastStageProof.actor!==actorNow||
       lastStageProof.occ!==expectedOcc||!mission))lastStageProof=null;
    if(mission&&owned&&stageBossMatches&&Number.isFinite(current)&&current>0){
      lastStageProof={map:current,actor:actorNow,occ:expectedOcc,at:Date.now()};
    }
    // An explicitly selected different Boss invalidates the proof immediately; only a null native target gets a brief grace.
    if(target&&(!stageBossMatches))lastStageProof=null;
    const briefNativeGap=!target&&!!lastStageProof&&mission&&owned&&Date.now()-lastStageProof.at<=PROOF_GRACE_MS;

    if(type===35&&stageBossMatches)confirmedMap=current;

    // Mission battles can expose a type-0 outer map while the selected monster

    // is exactly the stage Boss. Do not reject that native mission evidence.

    // Unlike type 35, do not latch common maps after the Boss disappears:

    // the native mission flag can remain true after returning to town.

    

    const missionStageBoss=mission&&stageBossMatches&&(type===0||type===1||type===35);

    const nativeStage=missionStageBoss||(type===35&&stageBossMatches)||(mission&&confirmedMap===current)||briefNativeGap;

    const inside=Number.isFinite(current)&&current>0&&(nativeStage||(mission&&(type===1||observedStageMap))||

      (expected>0&&current===expected&&W._Ba?._$a?.SceneUtil?.isCommonScene!==true));

    return {inside,current,entry,expected,type,mission,observedStageMap,stageBossMatches,targetOcc,expectedOcc,briefNativeGap,proofAgeMs:lastStageProof?Date.now()-lastStageProof.at:null};

  }catch(e){return {inside:false,error:String(e)};}}
__esmLocal1=status;


  W.KVPV_TQ_SCOPE=Object.freeze({inside:__captureESMFunction((__esmLocal2=(()=>status().inside)),"inside"),status});

})),""))();


}
export {getKVPV_TQ_SCOPE} from '../api.mjs';
export const api=Object.freeze({
  get KVPV_TQ_SCOPE(){return globalThis.KVPV_TQ_SCOPE;},
});