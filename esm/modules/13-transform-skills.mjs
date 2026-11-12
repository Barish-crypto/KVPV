import {getKVPV_BOSS_TEAM as __getKVPV0,getKVPV_DINH_CAO_BASIC_COMBO as __getKVPV2,getKVPV_FAR_SCOPE as __getKVPV3,getKVPV_KIEM_KHIEU_BASIC as __getKVPV4,getKVPV_STRONGEST_PVP as __getKVPV5,getKVPV_TH300 as __getKVPV6,getKVPV_TIENMA_PVP as __getKVPV7,getKVPV_TQ_SCOPE as __getKVPV8,getKVPV_TRANH_BA_TU_PHUONG as __getKVPV9,getKVPV_TRANSFORM10 as __getKVPV10,getKVPV_TRUTIEN_PVP as __getKVPV11,getKVPV_TULA_PVP as __getKVPV12,getKVPV_V1 as __getKVPV13} from '../api.mjs';
export function call_KVPV_TRANSFORM10_has(...args){const target=globalThis["KVPV_TRANSFORM10"];const fn=globalThis["KVPV_TRANSFORM10"]?.["has"];if(typeof fn!=='function')throw Error("KVPV_TRANSFORM10.has is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_TRANSFORM10_skills(...args){const target=globalThis["KVPV_TRANSFORM10"];const fn=globalThis["KVPV_TRANSFORM10"]?.["skills"];if(typeof fn!=='function')throw Error("KVPV_TRANSFORM10.skills is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_TRANSFORM10_select(...args){const target=globalThis["KVPV_TRANSFORM10"];const fn=globalThis["KVPV_TRANSFORM10"]?.["select"];if(typeof fn!=='function')throw Error("KVPV_TRANSFORM10.select is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_TRANSFORM10_cast(...args){const target=globalThis["KVPV_TRANSFORM10"];const fn=globalThis["KVPV_TRANSFORM10"]?.["cast"];if(typeof fn!=='function')throw Error("KVPV_TRANSFORM10.cast is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_TRANSFORM10_transformed(...args){const target=globalThis["KVPV_TRANSFORM10"];const fn=globalThis["KVPV_TRANSFORM10"]?.["transformed"];if(typeof fn!=='function')throw Error("KVPV_TRANSFORM10.transformed is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_TRANSFORM10__handoff(...args){const target=globalThis["KVPV_TRANSFORM10"];const fn=globalThis["KVPV_TRANSFORM10"]?.["_handoff"];if(typeof fn!=='function')throw Error("KVPV_TRANSFORM10._handoff is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_TRANSFORM10_start(...args){const target=globalThis["KVPV_TRANSFORM10"];const fn=globalThis["KVPV_TRANSFORM10"]?.["start"];if(typeof fn!=='function')throw Error("KVPV_TRANSFORM10.start is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_TRANSFORM10_stop(...args){const target=globalThis["KVPV_TRANSFORM10"];const fn=globalThis["KVPV_TRANSFORM10"]?.["stop"];if(typeof fn!=='function')throw Error("KVPV_TRANSFORM10.stop is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_TRANSFORM10_status(...args){const target=globalThis["KVPV_TRANSFORM10"];const fn=globalThis["KVPV_TRANSFORM10"]?.["status"];if(typeof fn!=='function')throw Error("KVPV_TRANSFORM10.status is not available");return Reflect.apply(fn,target,args);}
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
let __esmLocal11;
let __esmLocal12;
let __esmLocal13;
let __esmLocal14;
let __esmLocal15;
let __esmLocal16;
let __esmLocal17;
let __esmLocal18;
let __esmLocal19;
let __esmLocal20;
let __esmLocal21;
let __esmLocal22;
export {__esmLocal0 as local_anonymous_4_1_0};
export {__esmLocal1 as local_normalize_1};
export {__esmLocal2 as local_transformed_2};
export {__esmLocal3 as local_basicOnlyCombat_3};
export {__esmLocal4 as local_skillCoordinators_4};
export {__esmLocal5 as local_coordinatedPvp_5};
export {__esmLocal6 as local_skills_6};
export {__esmLocal7 as local_anonymous_57_66_7};
export {__esmLocal8 as local_anonymous_63_14_8};
export {__esmLocal9 as local_has_9};
export {__esmLocal10 as local_anonymous_67_30_10};
export {__esmLocal11 as local_select_11};
export {__esmLocal12 as local_cast_12};
export {__esmLocal13 as local_activate_13};
export {__esmLocal14 as local_schedule_14};
export {__esmLocal15 as local_anonymous_138_58_15};
export {__esmLocal16 as local_skills_16};
export {__esmLocal17 as local_anonymous_148_64_17};
export {__esmLocal18 as local__handoff_18};
export {__esmLocal19 as local_start_19};
export {__esmLocal20 as local_stop_20};
export {__esmLocal21 as local_status_21};
export {__esmLocal22 as local_anonymous_152_285_22};
export function initialize(){

/* Native transformation skills: use native selection, timing and animation. */

(__captureESMFunction((__esmLocal0=(() => {

  'use strict';

  const W=window,actor=String(W.__KVPV_OWN_ACTOR_ID||''),old=__getKVPV10(),carry=old?._handoff?.();old?.stop?.();let activation=carry?.actor===actor?carry.activation:null,activationReason='waiting_native_combat';
  let chargedConsumed=carry?.actor===actor&&carry?.chargedConsumed===true,
    lastRequestAt=carry?.actor===actor?(carry?.lastRequestAt??-Infinity):-Infinity,
    nativeRequests=carry?.actor===actor?(carry?.nativeRequests||0):0;

  const kits=Object.freeze({

    'U Tuyền Huyết Ma':['Huyết Ma Đại Pháp','Huyết Ngục Quỷ Thủ','Huyết Khế Tổ Chú','Huyết Ma Hình Phạt'],

    'Minh Hà Long Vương':['Ma Long Quyết','Minh Hà Long Trảm','Huyết Lục Trảm','Ma Long Nghịch Lân']

  });

  const names=Object.values(kits).flat();

  const normalize=__captureESMFunction((__esmLocal1=(s=>String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/Đ/g,'D').toLowerCase().replace(/[^a-z0-9]/g,''))),"normalize");

  const wanted=names.map(normalize),ready=new Map();let enabled=true,cursor=0,selections=0,lastError='',timer=null,lastForm='',cachedSkills=[],cachedSkillIds=new Set(),skillsCachedAt=-Infinity;

  const transformed=__captureESMFunction((__esmLocal2=(()=>String(W._Ba?._rJ?._O$?.ins?.actorId??'')===actor&&!W.__KVPV_UNIVERSAL_HALTED&&Number(W._Ba?._s3?._ZJ?.ins?.curShowId)>0)),"transformed");
  const basicOnlyCombat=__captureESMFunction((__esmLocal3=(()=>{
    const farModule=__getKVPV3(),far=farModule?.status?.();
    if(far?.inside===true&&farModule?.isBasicOnly?.()===true)return true;
    const th300=__getKVPV6(),th300State=th300?.status?.();
    if(th300State?.enabled===true&&th300State?.inside===true&&th300?.isBasicOnly?.()===true)return true;
    try{const s=__getKVPV11()?.status?.();if(s?.enabled===true&&s?.inside===true)return true;}catch(_){}
    try{const s=__getKVPV2()?.status?.();if(s?.enabled===true&&s?.inside===true&&s?.scope==='TRANH_BA_DINH_CAO')return true;}catch(_){}
    return false;
  })),"basicOnlyCombat");
  const skillCoordinators=__captureESMFunction((__esmLocal4=(()=>{
    const modules=[__getKVPV4(),__getKVPV12(),__getKVPV5(),
      __getKVPV7(),__getKVPV9()],active=[];
    for(const module of modules){try{const s=module?.status?.();if(s?.enabled===true&&s?.inside===true)active.push(s);}catch(_){}}
    return active;
  })),"skillCoordinators");
  const coordinatedPvp=__captureESMFunction((__esmLocal5=(()=>skillCoordinators()[0]??null)),"coordinatedPvp");
  

  function skills(){if(!transformed()){cachedSkills=[];cachedSkillIds.clear();skillsCachedAt=-Infinity;return [];}try{

    

    const form=String(W._Ba._s3._ZJ.ins.curShowId);

    if(form!==lastForm){lastForm=form;ready.clear();cursor=0;skillsCachedAt=-Infinity;}
    const now=Date.now();if(now-skillsCachedAt<1000)return cachedSkills;



    const model=W._Ba._s3._ZJ.ins.getTransformingSkills?.();

    cachedSkills=[...(model?.skills||[]),...(model?.comSkills||[])].map(__captureESMFunction((__esmLocal7=(row=>{

      const id=Number(row?.[0]);const cfg=W._ft?._nY?.ins?.getCfgBySkillIdAndLv?.(id,1)??W._ft?._nY?.ins?.getCfgById?.(id*10000+1);

      return {id,name:String(cfg?.[2]||''),row};

    })),"")).filter(__captureESMFunction((__esmLocal8=(x=>Number.isSafeInteger(x.id)&&x.id>0)),""));
    cachedSkillIds=new Set(cachedSkills.map(skill=>skill.id));
    skillsCachedAt=now;return cachedSkills;

  }catch(e){lastError=String(e);cachedSkills=[];cachedSkillIds.clear();skillsCachedAt=Date.now();return [];}}
__esmLocal6=skills;


  const has=__captureESMFunction((__esmLocal9=(id=>{skills();return cachedSkillIds.has(Number(id));})),"has");

  
  // Do not rewrite timestamps, cooldown duration, or skill order.
  function select(native,selector,active,common,mode){
    if(typeof native!=='function')return -1;
    const id=native.call(selector,active,common,mode);
    if(enabled&&mode===2&&transformed()&&Number(id)>0)selections++;
    return id;
  }
__esmLocal11=select;


  function cast(combat,id,...args){
    const native=combat?.combat;if(typeof native!=='function')return false;
    return native.apply(combat,[id,...args]);
  }
__esmLocal12=cast;

  

  function activate(){try{

      if(String(W._Ba?._rJ?._O$?.ins?.actorId??'')!==actor||W.__KVPV_UNIVERSAL_HALTED||!enabled)return;

      if(basicOnlyCombat()){activationReason='player_basic8001_only';return;}

      const m=W._Ba?._s3?._ZJ?.ins;if(transformed()||m?.isTransforming?.()===true){activation=null;chargedConsumed=true;activationReason='native_form_active';return;}

      const energyNeed=Number(W._ft?._gY?.ins?.getCfgById?.(92001)?.[2]?.[0]);
      const energyNow=Number(m?.curStrength);
      if(Number.isFinite(energyNeed)&&energyNeed>0&&Number.isFinite(energyNow)&&energyNow<energyNeed){
        // A new charge cycle unlocks the next native attempt.
        activation=null;chargedConsumed=false;
      }
      if(activation){
        if(Date.now()-activation.at>15000){activationReason='native_ack_timeout_no_retry_until_recharge';return;}
        activationReason=m?.sendTrans===true?'waiting_native_ack_no_retry':'native_ack_settling_no_retry';return;
      }
      if(chargedConsumed){activationReason='already_requested_this_charge';return;}

      const who=W._Ba?._rJ?._O$?.ins,role=W._C?._Ba?.instance?.getRole?.(Number(actor)),combat=role?.getComponent?.(W._d?._Yct?._Het),id=Number(W._C?._Mn?._Cn?.currentID),type=Number(W._ft?._po?.ins?.getCfgById?.(id)?.[7]),pvp=coordinatedPvp(),target=combat?.target,targetType=Number(target?.property?.get?.('type'));
      if(([14,71].includes(type)&&Number(W._Ba?._$a?._yo?.ins?.intoSce?.[3])===9)||who?.isDead!==false||combat?.isValidTarget?.()!==true||combat?.isValidRange?.()!==true||combat?.isCooldown?.()!==false||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)||__getKVPV0()?.priority?.()===true||targetType===4&&!pvp){activationReason='waiting_native_combat';return;}
      if(pvp&&(targetType!==4||target?.isValid===false||combat?.isValidRange?.()!==true)){activationReason='waiting_coordinated_pvp_target';return;}

      if(W._d?._Yct?._uft?.isFlying===true||role?.getComponent?.(W._d?._Yct?._oft)?.running?.()===true){activationReason='waiting_native_movement';return;}

      const need=Number(W._ft?._gY?.ins?.getCfgById?.(92001)?.[2]?.[0]),strength=Number(m?.curStrength),form=Number(m?.curFightShowId);

      if(!Number.isFinite(need)||need<=0||!Number.isFinite(strength)||strength<need||!Number.isSafeInteger(form)||form<=0||!m?.huanhuaList?.()?.[form]||m?.sendTrans||W._Ba?._Do?._Ho?.inst?.getFcIsOpen?.(327)!==true){activationReason='waiting_owned_form_and_free_strength';return;}

      const rpc=W._Ba?._s3?._Kyt?.ins;if(typeof rpc?.Transforming!=='function')return;

      if(Date.now()-lastRequestAt<3000){activationReason='local_native_retry_guard';return;}
      lastRequestAt=Date.now();nativeRequests++;
      // Only call the original FREE-strength native button, never buy strength or use KNB.
      try{
        rpc.Transforming();
        if(m?.sendTrans===true){
          activation={at:lastRequestAt,form,strength};chargedConsumed=true;
          activationReason='native_transform_requested';
        }else activationReason='native_locally_blocked_retry_after_3s';
      }catch(e){
        // The RPC may have dispatched before throwing: do not resend on the same charge.
        chargedConsumed=true;activation={at:lastRequestAt,form,strength};
        lastError=String(e?.message||e);activationReason='native_error_no_retry';
      }

    }catch(e){lastError=String(e.message||e);activationReason='error_no_retry';}}
__esmLocal13=activate;


  function schedule(){const every=__getKVPV13()?.timers?.setInterval??W.setInterval;

    if(timer==null&&typeof every==='function')timer=every(__captureESMFunction((__esmLocal15=(()=>{

      activate();

      if(enabled&&transformed()&&(__getKVPV3()??__getKVPV8())?.inside?.()===true&&__getKVPV6()?.status?.(false)?.running)__getKVPV6().sync();

    })),""),100);

  }
__esmLocal14=schedule;


  W.KVPV_TRANSFORM10=Object.freeze({has,skills:__captureESMFunction((__esmLocal16=(()=>skills().map(__captureESMFunction((__esmLocal17=(({id,name})=>({id,name}))),"")))),"skills"),select,cast,transformed,isEnabled(){return enabled;},

    _handoff:__captureESMFunction((__esmLocal18=(()=>({actor,activation,chargedConsumed,lastRequestAt,nativeRequests}))),"_handoff"),start(){
__esmLocal19=__captureESMMethod(this,"start","init");
enabled=true;schedule();return this.status();},stop(){
__esmLocal20=__captureESMMethod(this,"stop","init");
enabled=false;ready.clear();if(timer!=null){(__getKVPV13()?.timers?.clearInterval??W.clearInterval)(timer);timer=null;}return this.status();},

    status(){
__esmLocal21=__captureESMMethod(this,"status","init");
return {enabled,activation,activationReason,chargedConsumed,nativeRequests,lastRequestAt,nativeKitOnly:true,transformed:transformed(),clientCooldownMs:null,selections,skillSource:'current_native_model',matchedSkills:this.skills(),skillCoordinators:skillCoordinators().map(__captureESMFunction((__esmLocal22=(s=>s.mode||s.scope||'pvp')),"")),visual:{factor:null,calls:0,applied:0,unavailable:0,visualOnly:false,nativeSpeedPreserved:true},lastError,
      note:'Uses the game native transformation skill selection, cooldown, range and animation speed. No client-side skill-speed override or purchases.'};}});

  schedule();

})),""))();


}
export {getKVPV_TRANSFORM10} from '../api.mjs';
export const api=Object.freeze({
  get KVPV_TRANSFORM10(){return globalThis.KVPV_TRANSFORM10;},
});