import {getKVPV_BOSS_POSITION as __getKVPV0,getKVPV_FAR_SCOPE as __getKVPV1,getKVPV_RANGE281 as __getKVPV2,getKVPV_TQ_SCOPE as __getKVPV3,getKVPV_V1 as __getKVPV4} from '../api.mjs';
import {call_KVPV_FAR_SCOPE_eligible as __callKVPV0} from "./00-far-scope.mjs";
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
export {__esmLocal0 as local_anonymous_13_1_0};
export {__esmLocal1 as local_get_1};
export {__esmLocal2 as local_stageOcc_2};
export {__esmLocal3 as local_qualifies_3};
export {__esmLocal4 as local_hooked_4};
export {__esmLocal5 as local_ensure_5};
export {__esmLocal6 as local_restorePosition_6};
export {__esmLocal7 as local_status_7};
export {__esmLocal8 as local_stop_8};
export {__esmLocal9 as local_setTrialRange_9};
export {__esmLocal10 as local_enable_10};
export function initialize(){





/* Client range trial for the active Tian Quan skill controller. */






(__captureESMFunction((__esmLocal0=(() => {

  'use strict';

  const W = window;

  try { __getKVPV2()?.stop?.(); } catch(_){__getKVPV4()?.diagnostics?.record(_);}

  const name='KVPV_RANGE281';

  const baseRadius=280; let requestedRadius=281;

  const P=W._d?._Yct?._Het?.prototype;

  const pos=__getKVPV0();

  const actorId=String(W._Ba?._rJ?._O$?.ins?.actorId??'');

  if(!P || typeof P.isValidRange!=='function' || !actorId){

    console.error('[RANGE281] Module V1 chưa sẵn sàng; kiểm tra game-frame.');return;

  }

  

  

  const prevStatus=pos?.status?.(false)||{};

  const wasPositionEnabled=!!prevStatus.active;

  let legacyPositionRetired=false;

  if(pos?.version==='3.8.0'&&typeof pos.stop==='function'){pos.stop();legacyPositionRetired=true;}

  const source=P.isValidRange;

  const ownDescriptor=Object.getOwnPropertyDescriptor(P,'isValidRange');

  if(ownDescriptor && !ownDescriptor.configurable){console.error('[RANGE281] isValidRange không cho phép thay thế an toàn.');return;}

  let enabled=false, stopped=false, overrides=0, nativeOK=0, excluded=0, lastDistance=null,

      lastTarget='', lastError='', lastReason='waiting_for_eligible_boss';

  const get=__captureESMFunction((__esmLocal1=((r,k)=>{try{return r?.property?.get?.(k)??null;}catch(_){return null;}})),"get");

  const stageOcc=__captureESMFunction((__esmLocal2=(()=>{

    try{

      const lvl=Number(W._Ba?._Co?._Mo?.ins?.curLv);

      const cfg=W._ft?._h$?.ins?.getCfgByLv?.(lvl);

      if(!cfg) return null;

      const v=Number(W._ft._h$.ins.occ(cfg,lvl));

      return Number.isSafeInteger(v)&&v>0?v:null;

    }catch(_){return null;}

  })),"stageOcc");

  function qualifies(self){

    if(!self || String(get(self.owner,'id')??self.owner?.id??'')!==actorId ||

       String(W._Ba?._rJ?._O$?.ins?.actorId??'')!==actorId) return {ok:false,reason:'different_actor'};

    if([2,9].includes(Number(get(self.owner,'type'))))return {ok:false,reason:'companion_native_range'};

    const target=self.target;

    if(!target || target.isValid===false || Number(get(target,'type'))!==1)

      return {ok:false,reason:'not_monster_target'};

    const h=get(target,'hp'),hp=Number(h?.[0]),maxHp=Number(h?.[1]);


    const actual=Number(get(target,'occ'));

    const expected=['LINH_LUNG','PHU_VAN','TRU_TIEN'].includes(__getKVPV1()?.status?.().kind)&&__callKVPV0(target)?actual:stageOcc();

    if(expected===null || actual!==expected)return {ok:false,reason:'not_current_tianquan_boss'};

    if(typeof self.isValidTarget!=='function' || self.isValidTarget()!==true)

      return {ok:false,reason:'native_target_invalid'};

    // Native scene guard: blocked war scenes must remain blocked.

    const scene=W._ft?._po?.ins?.getCfgById?.(Number(W._C?._Mn?._Cn?.currentID));

    if(!scene) return {ok:false,reason:'scene_unavailable'};

    if(Number(scene[7])===50 && !W._Ba?._htt?._stt?.inst?.isWar)

      return {ok:false,reason:'war_scene_block'};

    if(W._BLa?.isLandScapeScreen?.() || Number(scene[0])===8601)

      return {ok:false,reason:'different_native_range_rule'};

    const monster=W._ft?._tY?.ins?.getCfgById?.(actual);

    const nativeRadius=Number(monster?.[3]);

    if(!Number.isFinite(nativeRadius)||nativeRadius<=0)return {ok:false,reason:'unknown_monster_range'};

    const a=self._Ha, b=get(target,'position');

    if(!Number.isFinite(Number(a?.x)) || !Number.isFinite(Number(a?.y)) ||

       !Number.isFinite(Number(b?.x)) || !Number.isFinite(Number(b?.y)))

      return {ok:false,reason:'missing_position'};

    const d=Math.hypot(Number(a.x)-Number(b.x),Number(a.y)-Number(b.y));

    return {ok:Number.isFinite(d)&&d>nativeRadius&&d<=requestedRadius,

      reason:'within_trial_extension',distance:d,target:String(get(target,'name')??'')};

  }
__esmLocal3=qualifies;


  function hooked(){

    const result=source.apply(this,arguments);

    if(result===true){nativeOK++;return result;}

    if(stopped||!enabled||(__getKVPV1()??__getKVPV3())?.inside?.()===false)return result;

    try{

      const q=qualifies(this);

      lastReason=q.reason;

      if(Number.isFinite(q.distance))lastDistance=+q.distance.toFixed(3);

      if(q.target)lastTarget=q.target;

      if(!q.ok){excluded++;return result;}

      overrides++;return true;

    }catch(e){lastError=String(e);return result;}

  }
__esmLocal4=hooked;


  function ensure(){

    if(P.isValidRange!==hooked){throw Error('isValidRange was replaced by another add-on; not overriding it');}

  }
__esmLocal5=ensure;


  const restorePosition=__captureESMFunction((__esmLocal6=(()=>{

    try{

      // Restore only the active/disabled toggle, not the old ratio or other tuning.

      if(pos && pos===__getKVPV0() && wasPositionEnabled && !pos.status(false).active) pos.enable(true);

    }catch(e){console.warn('[RANGE281] Không khôi phục được Boss Position:',e);}

  })),"restorePosition");

  

  function status(show=true){

    const position=__getKVPV0();
    const positionStatus=typeof position?.status==='function'?position.status(false):null;
    const s={version:'281-client-trial',legacyPositionRetired,enabled:enabled&&!stopped,actorId,

      clientCfgRange:baseRadius,trialRange:requestedRadius,

      bossPositionOverrideDisabled:!!position && positionStatus?.active===false,

      hookAttached:P.isValidRange===hooked,extraOneUnitAllowed:overrides,

      nativeAlreadyValid:nativeOK,notEligible:excluded,lastDistance,lastTarget,lastReason,lastError,

      note:'Client trial radius; The configured trial radius is used only in scan/strict mode, not evidence of server cast reach.'};

    if(show)console.table([s]);return s;

  }
__esmLocal7=status;


  

  function stop(){

    if(stopped)return;

    stopped=true;enabled=false;

    if(P.isValidRange===hooked){

      if(ownDescriptor)Object.defineProperty(P,'isValidRange',ownDescriptor);

      else delete P.isValidRange;

    }else console.warn('[RANGE281] Hook changed externally; leaving it untouched.');

    restorePosition();

    if(W[name]===api) delete W[name];

    console.log('[RANGE281] Đã hoàn tác điều chỉnh client +1.');

  }
__esmLocal8=stop;


  const api={version:'281-client-trial',status,stop,

    setTrialRange(value){
__esmLocal9=__captureESMMethod(this,"setTrialRange","init");
const v=Number(value);if(!Number.isFinite(v)||v<=280||v>610)throw Error('Client trial range: (280,610]');requestedRadius=v;return status(false);},

    enable(v=true){
__esmLocal10=__captureESMMethod(this,"enable","init");
enabled=!!v&&!stopped;try{if(pos && pos===__getKVPV0()){if(enabled)pos.enable(false);else if(wasPositionEnabled)pos.enable(true);}}catch(e){lastError=String(e);}return status(false);}};

  try{

    // The old Position hook deliberately forces the actor closer than cfg radius.

    // Disable ONLY that feature; keep the HitRun controller untouched.

    pos?.enable?.(false);

    Object.defineProperty(P,'isValidRange',{value:hooked,writable:true,enumerable:!!ownDescriptor?.enumerable,configurable:true});

    ensure();W[name]=api;

  }catch(e){

    lastError=String(e);restorePosition();console.error('[RANGE281] Failed to install:',e);return;

  }

  console.log('[RANGE281] Đã đặt mốc thử client 281 (Boss Thiên Quan có cfg 280). Không ép server tăng tầm.');

  status(true);

})),""))();




}
export const api=Object.freeze({
});