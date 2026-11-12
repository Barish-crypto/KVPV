import {getKVPV_BOSS_LOG as __getKVPV0,getKVPV_FAR_SCOPE as __getKVPV1,getKVPV_MODE as __getKVPV2,getKVPV_TH300 as __getKVPV3,getKVPV_TH_FAR as __getKVPV4,getKVPV_TQ115 as __getKVPV5,getKVPV_TQ_BASIC_FORCE as __getKVPV6,getKVPV_TQ_POSITION_ONLY as __getKVPV7,getKVPV_TQ_SINGLE_STRONGEST_TH as __getKVPV8,getKVPV_V1 as __getKVPV9} from '../api.mjs';
function __captureESMFunction(fn,name){
  if(fn.name!==name)Object.defineProperty(fn,"name",{value:name,configurable:true});
  return fn;
}
let __esmLocal0;
export {__esmLocal0 as local_anonymous_5_1_0};
export function initialize(){
/* Tian Quan automation is installed only through the local desktop control. */
(__captureESMFunction((__esmLocal0=(() => {
  const W=window;
  W.KVPV_TQ_SINGLE_STRONGEST_TH=false;
  W.KVPV_TQ_POSITION_ONLY=Object.freeze({enabled:false,distance:310,heal:false});
  const control=Object.freeze({
    start(){
      W.KVPV_TQ_POSITION_ONLY=Object.freeze({enabled:true,distance:310,heal:false});
      try{
      __getKVPV0()?.start?.();
      __getKVPV1()?.setAllBosses?.(false);
      __getKVPV5()?.stop?.();
      const th=__getKVPV3();
      th?.setDistance?.(310);
      th?.setBasicOnly?.(false);
      const profile=th?.setTianQuanThreeBasics?.(true,0);
      if(profile?.available===false||profile?.enabled===false)throw Error('Thiên Quan three-basic profile unavailable');
      th?.setScanInterval?.(100);
      th?.setBasicRotation?.([8001,8002,8003]);
      th?.setTianQuanMpackExtras?.(true);
      th?.setTianQuanTuyetHoc?.(true);
      th?.setInterleaved?.(true,310);
      th?.setPrimaryBasic?.(true);
      th?.setSkillPriority?.('interleaved');
      th?.setBurst?.(true);
      th?.setClientPace?.(100);
      th?.setAfterTHWait?.(100);
      th?.setTianQuanVisualSpeed?.(1);
      th?.setTianQuanTuyetHoc?.(true);
      th?.setBasicOnly?.(true);
        __getKVPV2().armTianQuan();
        th?.setTianQuanMpackExtras?.(true);
        th?.setTianQuanTuyetHoc?.(true);
        __getKVPV4()?.stop?.('four basic skills only');
        __getKVPV6()?.setEnabled?.(false);
        console?.info?.('[KVPV V1] Tian Quan burst trial: native Tuyet Hoc batches; native readiness/cooldown gates preserved.');
      }catch(e){__getKVPV9()?.diagnostics?.record?.(e);console?.warn?.('[KVPV V1] Auto Thiên Quan:',String(e));throw e;}
    },
    stop(){
      W.KVPV_TQ_POSITION_ONLY=Object.freeze({enabled:false,distance:310,heal:false});
      const mode=__getKVPV2();
      if(typeof mode?.stop!=='function')throw Error('KVPV_MODE.stop is unavailable');
      return mode.stop('desktop_control_disabled');
    }
  });
  W.KVPV_TQ_AUTO_CONTROL=control;
})),""))();

}
export {getKVPV_TQ_POSITION_ONLY} from '../api.mjs';
export {getKVPV_TQ_SINGLE_STRONGEST_TH} from '../api.mjs';
export const api=Object.freeze({
  get KVPV_TQ_POSITION_ONLY(){return globalThis.KVPV_TQ_POSITION_ONLY;},
  get KVPV_TQ_SINGLE_STRONGEST_TH(){return globalThis.KVPV_TQ_SINGLE_STRONGEST_TH;},
});