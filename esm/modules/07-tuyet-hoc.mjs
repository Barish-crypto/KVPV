import {getKVPV_HITRUN1 as __getKVPV0,getKVPV_MODE as __getKVPV1,getKVPV_V1 as __getKVPV2,getKVPV_V127_BASIC as __getKVPV3} from '../api.mjs';
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
let __esmLocal15;
let __esmLocal16;
let __esmLocal17;
let __esmLocal18;
let __esmLocal19;
let __esmLocal20;
let __esmLocal21;
let __esmLocal22;
let __esmLocal23;
let __esmLocal24;
let __esmLocal25;
let __esmLocal26;
let __esmLocal27;
export {__esmLocal0 as local_anonymous_14_1_0};
export {__esmLocal1 as local_prop_1};
export {__esmLocal2 as local_rid_2};
export {__esmLocal3 as local_point_3};
export {__esmLocal4 as local_current_4};
export {__esmLocal5 as local_stageOcc_5};
export {__esmLocal6 as local_sceneOk_6};
export {__esmLocal7 as local_log_7};
export {__esmLocal8 as local_restore_8};
export {__esmLocal9 as local_hook_9};
export {__esmLocal10 as local_unbind_10};
export {__esmLocal11 as local_bind_11};
export {__esmLocal12 as local_anonymous_128_36_12};
export {__esmLocal13 as local_anonymous_128_44_13};
export {__esmLocal14 as local_anonymous_140_28_14};
export {__esmLocal15 as local_anonymous_142_50_15};
export {__esmLocal16 as local_anonymous_156_36_16};
export {__esmLocal17 as local_anonymous_156_44_17};
export {__esmLocal18 as local_detachTarget_18};
export {__esmLocal19 as local_onHit_19};
export {__esmLocal20 as local_attachTarget_20};
export {__esmLocal21 as local_tick_21};
export {__esmLocal22 as local_status_22};
export {__esmLocal23 as local_anonymous_318_47_23};
export {__esmLocal24 as local_anonymous_320_43_24};
export {__esmLocal25 as local_start_25};
export {__esmLocal26 as local_stop_26};
export {__esmLocal27 as local_history_27};
export function initialize(){





/* ===========================================================================
 * KVPV V12.9.5 — BOSS TH ONLY / FAR STANCE (client side, experimental)
 * Uses native selector and NATIVE cooldown; never invents a ready skill.
 * 1001..1008 = assumed Tuyet Hoc family in the existing FULL's combat module.
 * Main actor only, current Tian Quan Boss only, no combat RPC, no skill reach hack.
 * Only active after KVPV_MODE.start('BOSS_TH'); no default auto activation.
 * =========================================================================== */

(__captureESMFunction((__esmLocal0=(() => {

  'use strict';

  const W=window, NAME='KVPV_TH_FAR', TAG='[TH-FAR V12.9.5]';

  try {W[NAME]?.stop?.('reload');}catch(_){__getKVPV2()?.diagnostics?.record(_);}

  const actorId=String(W.__KVPV_OWN_ACTOR_ID||'');

  const Comp=W._d?._Yct?._Het, Sel=W._d?._Yct?._Eet,

    Mov=W._d?._Yct?._zet;

  if(!actorId||!Comp||!Sel||!Mov||!__getKVPV0()?.status){

    console?.warn?.(TAG,'Chưa sẵn sàng trong game-frame');return;

  }

  const TH=new Set([1001,1002,1003,1004,1005,1006,1007,1008]);

  const CFG={goal:280.4,tolerance:0.45,moveIntervalMs:1500,

    scanMs:500,closeGuard:330,warnNoHitMs:25000};

  const S={running:false,stopped:false,selector:null,combat:null,target:null,

    owner:{},bossId:'',bossName:'',lastTarget:'',selectorChoices:0,

    blockedBasics:0,blockedOther:0,allowedTH:0,confirmedTH:0,

    noReady:0,moves:0,skips:0,lastMoveAt:0,lastHitAt:0,

    startedAt:0,lastDistance:null,lastHitDistance:null,lastReason:'off',lastError:'',

    hookChanges:0,interval:null,seenIds:new Set(),history:[]};

  function prop(o,k){try{return o?.property?.get?.(k)??null;}catch(_){return null;}}
__esmLocal1=prop;


  const rid=__captureESMFunction((__esmLocal2=(o=>String(prop(o,'id')??o?.id??''))),"rid");

  function point(o){const p=prop(o,'position');if(!p)return null;

    const x=Number(p.x),y=Number(p.y);

    return Number.isFinite(x)&&Number.isFinite(y)?{x,y}:null;}
__esmLocal3=point;


  function current(){const w=W._C?._Ba?.instance;

    const a=w?.getRole?.(Number(actorId))||w?.getRole?.(actorId)||null;

    return {a,selector:a?.getComponent?.(Sel),combat:a?.getComponent?.(Comp),

      mover:a?.getComponent?.(Mov)};}
__esmLocal4=current;


  function stageOcc(){try{const lv=Number(W._Ba?._Co?._Mo?.ins?.curLv);

    const t=W._ft?._h$?.ins;const c=t?.getCfgByLv?.(lv);

    const n=c?Number(t.occ(c,lv)):NaN;

    return Number.isSafeInteger(n)&&n>0?n:null;}catch(_){return null;}}
__esmLocal5=stageOcc;


  function sceneOk(c){const t=c?.combat?.target;

    if(!t||t.isValid===false||Number(prop(t,'type'))!==1)return false;

    const stage=stageOcc();return stage!==null&&Number(prop(t,'occ'))===stage;}
__esmLocal6=sceneOk;


  

  function log(type,detail=''){S.history.push({at:Date.now(),type,detail});

    if(S.history.length>35)S.history.shift();}
__esmLocal7=log;


  function restore(link){if(!link)return;

    const {obj,key,wrapper,own}=link;

    if(obj[key]!==wrapper){S.lastError='Another hook replaced '+key+'; not overwriting';return;}

    try{if(own)Object.defineProperty(obj,key,own);else delete obj[key];}

    catch(e){S.lastError='Cannot restore '+key+': '+String(e);}}
__esmLocal8=restore;


  function hook(obj,key,fn){if(typeof obj?.[key]!=='function')return null;

    const own=Object.getOwnPropertyDescriptor(obj,key);

    if(own&&own.configurable===false)return null;

    const before=obj[key];const wrapper=fn(before);

    Object.defineProperty(obj,key,{configurable:true,writable:true,

      enumerable:own?.enumerable??false,value:wrapper});

    return {obj,key,own,wrapper};}
__esmLocal9=hook;


  function unbind(){restore(S.selector);restore(S.combat);

    S.selector=null;S.combat=null;}
__esmLocal10=unbind;


  function bind(c){

    if(S.selector?.obj===c.selector && S.combat?.obj===c.combat &&

       S.selector?.obj?._f7t===S.selector?.wrapper &&

       S.combat?.obj?.combat===S.combat?.wrapper)return true;

    unbind();

    const sh=hook(c.selector,'_f7t',__captureESMFunction((__esmLocal12=(native=>__captureESMFunction((__esmLocal13=(function(active,common,mode){

      if(!S.running||this!==c.selector||mode!==1||

         !sceneOk(current())||!Array.isArray(active))

        return native.apply(this,arguments);

      // Pass only genuine Tuyet Hoc rows to the ORIGINAL selector.

      // Empty native lists yield -1: wait, never fall back to basic attacks.

      const a=active.filter(__captureESMFunction((__esmLocal14=(r=>TH.has(Number(r?.[0])))),""));

      const b=Array.isArray(common)?common.filter(__captureESMFunction((__esmLocal15=(r=>TH.has(Number(r?.[0])))),"")):[];

      const chosen=native.call(this,a,b,mode);

      if(TH.has(Number(chosen))){S.selectorChoices++;S.seenIds.add(Number(chosen));}

      else S.noReady++;

      return TH.has(Number(chosen))?chosen:-1;

    })),""))),""));

    if(!sh){S.lastError='Cannot hook native skill selector';return false;}

    const ch=hook(c.combat,'combat',__captureESMFunction((__esmLocal16=(native=>__captureESMFunction((__esmLocal17=(function(skillId){

      if(S.running&&this===c.combat&&sceneOk(current())){

        const id=Number(skillId);

        if(id===-1)return undefined;

        if(!TH.has(id)){

          if(id>=8001&&id<=8009)S.blockedBasics++;

          else S.blockedOther++;

          return undefined; // no basic attacks, no other actor attack skills

        }

        S.allowedTH++;

      }

      return native.apply(this,arguments);

    })),""))),""));

    if(!ch){restore(sh);S.lastError='Cannot hook native combat';return false;}

    S.selector=sh;S.combat=ch;S.hookChanges++;

    log('HOOK', 'actor main combat + main selector');

    return true;

  }
__esmLocal11=bind;


  function detachTarget(){if(S.target){try{S.target.off?.(1012,S.owner,onHit);}catch(_){__getKVPV2()?.diagnostics?.record(_);}}

    S.target=null;S.bossId='';S.bossName='';}
__esmLocal18=detachTarget;


  function onHit(source,marker,damage,flags,receiver){

    if(!S.running||String(source)!==actorId||String(receiver)!==S.bossId)return;

    const raw=Number(marker),id=raw/10000,f=Number(flags)||0;

    if(!Number.isSafeInteger(raw)||raw%10000!==0||!TH.has(id)||

       !(Number(damage)>0)||(f&(4|16|32|128|256)))return;

    S.confirmedTH++;S.lastHitAt=Date.now();

    const c=current(),a=point(c.a),b=point(S.target);

    S.lastHitDistance=a&&b?+Math.hypot(a.x-b.x,a.y-b.y).toFixed(1):null;

    log('HIT',{skillId:id,distance:S.lastHitDistance});

  }
__esmLocal19=onHit;


  function attachTarget(t){if(S.target===t)return;

    detachTarget();if(!t||!rid(t))return;

    S.target=t;S.bossId=rid(t);S.bossName=String(prop(t,'name')||'Boss');

    try{t.on?.(1012,S.owner,onHit);}catch(e){S.lastError='Hit listener: '+String(e);}

  }
__esmLocal20=attachTarget;


  

  function tick(){if(!S.running)return;

    try{

      if(String(W._Ba?._rJ?._O$?.ins?.actorId??'')!==actorId||

         W.__KVPV_UNIVERSAL_HALTED){stop('actor/session change');return;}

      const c=current();

      if(!c.a||!c.combat||!c.selector||!c.mover){S.lastReason='no_live_components';return;}

      if(!bind(c)){S.lastReason='hook_failed';return;}

      if(!sceneOk(c)){detachTarget();S.lastReason='not_tianquan';return;}

      attachTarget(c.combat.target);

      if(__getKVPV1()?.status?.(false)?.mode!=='BOSS_TH'){

        S.lastReason='mode_not_boss_th';return;

      }

      const hr=__getKVPV0()?.status?.(false);

      if(!hr?.running||hr.phase!=='FIGHT'){

        S.lastReason='hitrun_'+(hr?.phase||'off');return;}

      if(Number(hr.hpPct)<Math.max(48,Number(hr.leavePct||35)+10)){

        S.lastReason='low_hp';return;}

      if(W.document?.hidden){S.lastReason='tab_background';return;}

      const next=__getKVPV3()?.status?.(false)?.nextImpactInMs;

      if(Number.isFinite(next)&&next>=-100&&next<=1350){S.lastReason='dodge_soon';return;}

      const a=point(c.a),b=point(c.combat.target);

      if(!a||!b){S.lastReason='position_missing';return;}

      const dx=a.x-b.x,dy=a.y-b.y,d=Math.hypot(dx,dy);

      S.lastDistance=+d.toFixed(2);

      if(!Number.isFinite(d)||d<1){S.lastReason='overlap';return;}

      if(Math.abs(d-CFG.goal)<=CFG.tolerance){S.lastReason='holding_far';return;}

      // From far away, let native auto approach the Boss first to avoid ping-pong.

      if(d>CFG.closeGuard){S.lastReason='native_approach';return;}

      if(Date.now()-S.lastMoveAt<CFG.moveIntervalMs){S.lastReason='move_cooldown';return;}

      if(typeof c.mover.moveTo!=='function'){S.lastReason='no_mover';return;}

      // A bounded client waypoint, no server-range or cooldown changes.

      const x=b.x+dx/d*CFG.goal,y=b.y+dy/d*CFG.goal;

      if(!Number.isFinite(x)||!Number.isFinite(y))return;

      c.mover.moveTo(x,y);S.lastMoveAt=Date.now();S.moves++;

      S.lastReason=d<CFG.goal?'move_out':'move_in';

    }catch(e){S.lastError=String(e?.message||e);S.lastReason='error';}

  }
__esmLocal21=tick;


  

  function status(show=true){

    const c=current();const ids=[];

    for(const rows of [c.selector?._rtt,c.selector?._wet])if(Array.isArray(rows))

      for(const row of rows)if(TH.has(Number(row?.[0])))ids.push(Number(row[0]));

    const out={version:'12.9.5',enabled:S.running,

      modeControl:'KVPV_MODE',

      goalDistance:CFG.goal,measuredDistance:S.lastDistance,

      availableTuyetHoc:[...new Set(ids)].sort(__captureESMFunction((__esmLocal23=((a,b)=>a-b)),"")),

      selectedTuyetHoc:[...S.seenIds].sort(__captureESMFunction((__esmLocal24=((a,b)=>a-b)),"")),

      allowedTH:S.allowedTH,confirmedTH:S.confirmedTH,

      blockedBasics:S.blockedBasics,blockedOther:S.blockedOther,

      cooldownNoReady:S.noReady,moves:S.moves,boss:S.bossName||null,

      lastHitDistance:S.lastHitDistance,lastReason:S.lastReason,lastError:S.lastError,

      selectorHooked:!!S.selector&&S.selector.obj._f7t===S.selector.wrapper,

      combatHooked:!!S.combat&&S.combat.obj.combat===S.combat.wrapper,

      note:ids.length?'Only 1001..1008 from native selector; when cooling down NO basic fallback. Server hit range unchanged.':'No native Tuyet Hoc 1001..1008 in current selector; waits without basic attacks. Check game skill configuration.'};

    if(show)console.table([out]);return out;

  }
__esmLocal22=status;


  

  function start(){

    if(S.stopped)throw Error('Bản này đã stop vĩnh viễn, cần F5 nạp lại');

    if(S.running)return status(false);

    if(String(W._Ba?._rJ?._O$?.ins?.actorId??'')!==actorId)throw Error('Sai nhân vật');

    S.running=true;S.startedAt=Date.now();S.lastReason='starting';

    S.interval=(__getKVPV2()?.timers?.setInterval ?? W.setInterval)(tick,CFG.scanMs);tick();

    return status(false);

  }
__esmLocal25=start;


  

  function stop(reason='user stop'){

    S.running=false;

    if(S.interval!==null){(__getKVPV2()?.timers?.clearInterval ?? W.clearInterval)(S.interval);S.interval=null;}

    unbind();detachTarget();S.lastReason=reason;log('STOP',reason);

    return status(false);

  }
__esmLocal26=stop;


  const api={start,stop,status,history:__captureESMFunction((__esmLocal27=(()=>S.history.slice())),"history")};

  W[NAME]=api;

  console?.info?.(TAG,'READY/OFF. Chạy KVPV_MODE.start("BOSS_TH") để chỉ xả Tuyệt Học ở xa.');

})),""))();


}
export const api=Object.freeze({
});