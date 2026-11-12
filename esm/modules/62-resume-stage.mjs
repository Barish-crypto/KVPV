import {getKVPV_DAILY as __getKVPV0,getKVPV_EVENT_PRIORITY as __getKVPV1,getKVPV_QUEST_PRIORITY as __getKVPV2} from '../api.mjs';
import {call_KVPV_DAILY_tuVuotStart as __callKVPV0} from "./04-engine.mjs";
function __captureESMFunction(fn,name){
  if(fn.name!==name)Object.defineProperty(fn,"name",{value:name,configurable:true});
  return fn;
}
let __esmLocal0;
export {__esmLocal0 as local_anonymous_4_1_0};
export function initialize(){

(__captureESMFunction((__esmLocal0=(() => {

'use strict';const W=window,actor=String(W.__KVPV_OWN_ACTOR_ID||'');
function owned(){return !!actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;}
function start(){
  if(!owned())throw Error('Stage resume actor is unavailable');
  if(W.KVPV_DESKTOP_CONTROL?.stageAllowed?.()!==true)throw Error('Tự Vượt chưa được bật trong dashboard');
  if(typeof __getKVPV0()?.tuVuotStart!=='function')throw Error('Auto Daily stage API unavailable');
  if(__getKVPV1()?.hold?.())throw Error('A higher-priority event is active');
  const work=__getKVPV2()?._handoff?.()?.work;if(work)work.dailyEnabled=true;
  __callKVPV0();
  const marker={actor,at:Date.now()};W.__KVPV_STAGE_RESUME_20261024_USER_V2=marker;W.__KVPV_STAGE_RESUME_20261024_USER=marker;
  return __getKVPV0()?.tuVuotStatus?.()??null;
}
function stop(){
  if(owned())__getKVPV0()?.tuVuotStop?.();
  const stage=W._Ba?._Co?._Mo?.ins;if(stage)stage.auto=false;
  return __getKVPV0()?.tuVuotStatus?.()??null;
}
W.KVPV_STAGE_RESUME_CONTROL=Object.freeze({start,stop,status:()=>({enabled:__getKVPV0()?.config?.enableTuVuot===true})});

})),""))();


}
export const api=Object.freeze({
});