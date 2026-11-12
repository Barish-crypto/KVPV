import {getKVPV_SKILL_PACING as __getKVPV0} from '../api.mjs';
export function call_KVPV_SKILL_PACING_create(...args){const target=globalThis["KVPV_SKILL_PACING"];const fn=globalThis["KVPV_SKILL_PACING"]?.["create"];if(typeof fn!=='function')throw Error("KVPV_SKILL_PACING.create is not available");return Reflect.apply(fn,target,args);}
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
export {__esmLocal0 as local_anonymous_8_1_0};
export {__esmLocal1 as local_create_1};
export {__esmLocal2 as local_context_2};
export {__esmLocal3 as local_observe_3};
export {__esmLocal4 as local_pace_4};
export {__esmLocal5 as local_status_5};
export function initialize(){





/* Bounded pacing based on completed direct-hit observations, not send counts. */

(__captureESMFunction((__esmLocal0=(() => {

  window.KVPV_SKILL_PACING=Object.freeze({create(){
__esmLocal1=__captureESMMethod(this,"create","init");


    

    const steps=[1,5,10,25,50,75,125,200,350,500];let pace=1,context='',batch=[],changes=0,accepted=0,ignored=0,lastAction='learning';

    return Object.freeze({

      

      context(key){
__esmLocal2=__captureESMMethod(this,"context","init");
if(key!==context){context=key;pace=1;batch=[];accepted=0;ignored=0;lastAction='new_boss_baseline';}},

      

      observe(hit,qualified){
__esmLocal3=__captureESMMethod(this,"observe","init");
if(!qualified){ignored++;return;}accepted++;batch.push(hit===true);

        if(batch.length<8)return;

        const hits=batch.filter(Boolean).length,index=steps.indexOf(pace);batch=[];

        

        if(hits>=7&&index>0){pace=steps[index-1];changes++;lastAction='faster_after_observed_hits';}

        else if(hits<=4&&index<steps.length-1){pace=steps[index+1];changes++;lastAction='slower_after_missing_confirmations';}

        else lastAction='hold_inconclusive';

      },

      pace:__captureESMFunction((__esmLocal4=(()=>pace)),"pace"),

      status:__captureESMFunction((__esmLocal5=(()=>({enabled:true,context,paceMs:pace,minMs:1,maxMs:500,batchSize:8,pendingSamples:batch.length,

        acceptedSamples:accepted,ignoredSamples:ignored,changes,lastAction,

        note:'Only skills already proven by two direct cast-hit pairs affect tuning. Missing confirmation is not proof of a server rejection.'}))),"status")

    });

  }});

})),""))();


}
export {getKVPV_SKILL_PACING} from '../api.mjs';
export const api=Object.freeze({
  get KVPV_SKILL_PACING(){return globalThis.KVPV_SKILL_PACING;},
});