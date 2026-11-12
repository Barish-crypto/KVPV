import {getKVPV_COMBAT_METRICS as __getKVPV0} from '../api.mjs';
export function call_KVPV_COMBAT_METRICS_create(...args){const target=globalThis["KVPV_COMBAT_METRICS"];const fn=globalThis["KVPV_COMBAT_METRICS"]?.["create"];if(typeof fn!=='function')throw Error("KVPV_COMBAT_METRICS.create is not available");return Reflect.apply(fn,target,args);}
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
let __esmLocal23;
let __esmLocal24;
let __esmLocal25;
let __esmLocal26;
let __esmLocal27;
export {__esmLocal0 as local_anonymous_4_1_0};
export {__esmLocal1 as local_create_1};
export {__esmLocal2 as local_at_2};
export {__esmLocal3 as local_group_3};
export {__esmLocal4 as local_rate_4};
export {__esmLocal5 as local_finishAnimation_5};
export {__esmLocal6 as local_charge_6};
export {__esmLocal7 as local_row_7};
export {__esmLocal8 as local_snapshot_8};
export {__esmLocal9 as local_anonymous_16_41_9};
export {__esmLocal10 as local_anonymous_17_46_10};
export {__esmLocal11 as local_anonymous_18_71_11};
export {__esmLocal12 as local_anonymous_18_106_12};
export {__esmLocal13 as local_anonymous_18_147_13};
export {__esmLocal14 as local_anonymous_18_203_14};
export {__esmLocal15 as local_anonymous_18_232_15};
export {__esmLocal16 as local_anonymous_18_308_16};
export {__esmLocal17 as local_anonymous_18_352_17};
export {__esmLocal18 as local_anonymous_19_40_18};
export {__esmLocal19 as local_anonymous_22_175_19};
export {__esmLocal20 as local_anonymous_23_362_20};
export {__esmLocal21 as local_close_21};
export {__esmLocal22 as local_open_22};
export {__esmLocal23 as local_state_23};
export {__esmLocal24 as local_cast_24};
export {__esmLocal25 as local_result_25};
export {__esmLocal26 as local_resume_26};
export {__esmLocal27 as local_report_27};
export function initialize(){



(__captureESMFunction((__esmLocal0=(() => {
  window.KVPV_COMBAT_METRICS=Object.freeze({create(){
__esmLocal1=__captureESMMethod(this,"create","init");

    let active=null;const completed=[];
    const at=__captureESMFunction((__esmLocal2=(()=>Date.now())),"at");
    const combatStates=new Set(['fighting','native_cooldown','skill_readiness','waiting_pace','waiting_burst_gap','dungeon_native_finish_2pct']);
    const group=__captureESMFunction((__esmLocal3=(id=>id>=8001&&id<=8005?'basic':id>=1001&&id<=1008?'tuyetHoc':'other')),"group");
    const rate=__captureESMFunction((__esmLocal4=((damage,ms)=>ms>0?damage*100/ms:null)),"rate");
    function finishAnimation(now,interrupted=false){if(!active?.animation)return;const wait=active.animation,r=row(wait.id),duration=Math.max(0,now-wait.startedAt);if(r){r.animationWaitMs+=duration;r.animationWaitEpisodes++;r.animationWaitMaxMs=Math.max(r.animationWaitMaxMs,duration);}if(interrupted)active.animationCensored++;active.animation=null;}
__esmLocal5=finishAnimation;

    function charge(now){if(active){const delta=Math.max(0,now-active.updatedAt);active.timeMs[active.state]=(active.timeMs[active.state]||0)+delta;if(active.eligible)active.attackWindowMs+=delta;active.updatedAt=now;}}
__esmLocal6=charge;

    function row(id){if(!active)return null;if(!active.skills.has(id)&&active.skills.size<64)active.skills.set(id,{id,attempts:0,hits:0,matchedDamage:0,unconfirmed:0,interrupted:0,lastPaceMs:null,animationWaitMs:0,animationWaitEpisodes:0,animationWaitMaxMs:0});return active.skills.get(id);}
__esmLocal7=row;

    function snapshot(s,now){const timeMs={...s.timeMs};if(s===active)timeMs[s.state]=(timeMs[s.state]||0)+Math.max(0,now-s.updatedAt);
      const elapsedMs=Math.max(0,(s.endedAt??now)-s.startedAt),attackWindowMs=s.attackWindowMs+(s===active&&s.eligible?Math.max(0,now-s.updatedAt):0),end=s.endedAt??now,windowMs=Math.min(10000,elapsedMs);
      const recent=s.damageEvents.filter(__captureESMFunction((__esmLocal9=(e=>e.at>end-10000&&e.at<=end)),"")),pending=new Map(),rolling=new Map();for(const id of s.pending.values())pending.set(id,(pending.get(id)||0)+1);for(const e of recent)rolling.set(e.id,(rolling.get(e.id)||0)+e.damage);
      const skills=[...s.skills.values()].map(__captureESMFunction((__esmLocal10=(r=>({...r,animationWaitMs:r.animationWaitMs+(s===active&&s.animation?.id===r.id?Math.max(0,now-s.animation.startedAt):0),animationWaitOngoingMs:s===active&&s.animation?.id===r.id?Math.max(0,now-s.animation.startedAt):0,animationWaitAverageMs:r.animationWaitEpisodes?r.animationWaitMs/r.animationWaitEpisodes:null,group:group(r.id),pending:pending.get(r.id)||0,matchedDps:rate(r.matchedDamage,elapsedMs),attackWindowContributionDps:rate(r.matchedDamage,attackWindowMs),rolling10sMatchedDps:rate(rolling.get(r.id)||0,windowMs),averageMatchedDamage:r.hits?r.matchedDamage/r.hits:null,confirmationRate:r.hits+r.unconfirmed>0?r.hits/(r.hits+r.unconfirmed):null}))),""));
      const groups=Object.fromEntries(['basic','tuyetHoc','other'].map(__captureESMFunction((__esmLocal11=(key=>{const selected=skills.filter(__captureESMFunction((__esmLocal12=(r=>r.group===key)),"")),damage=selected.reduce(__captureESMFunction((__esmLocal13=((n,r)=>n+r.matchedDamage)),""),0),rollingDamage=recent.filter(__captureESMFunction((__esmLocal14=(e=>group(e.id)===key)),"")).reduce(__captureESMFunction((__esmLocal15=((n,e)=>n+e.damage)),""),0);return [key,{matchedDamage:damage,hits:selected.reduce(__captureESMFunction((__esmLocal16=((n,r)=>n+r.hits)),""),0),attempts:selected.reduce(__captureESMFunction((__esmLocal17=((n,r)=>n+r.attempts)),""),0),matchedDps:rate(damage,elapsedMs),attackWindowContributionDps:rate(damage,attackWindowMs),rolling10sMatchedDps:rate(rollingDamage,windowMs)}];})),"")));
      const matchedDamage=skills.reduce(__captureESMFunction((__esmLocal18=((n,r)=>n+r.matchedDamage)),""),0);
      return {key:s.key,bossId:s.bossId,occ:s.occ,scene:s.scene,startedAt:s.startedAt,endedAt:s.endedAt,reason:s.reason,
        bossName:s.bossName??'',actor:s.actor??null,elapsedMs,attackWindowMs,state:s.state,timeMs,recoveryResumes:s.resumes,
        summary:{matchedDamage,matchedDps:rate(matchedDamage,elapsedMs),attackWindowContributionDps:rate(matchedDamage,attackWindowMs),rolling10sMatchedDps:rate(recent.reduce(__captureESMFunction((__esmLocal19=((n,e)=>n+e.damage)),""),0),windowMs),rollingWindowMs:windowMs,rollingBufferTruncated:s.rollingTruncated},groups,
        animationAttribution:'FIGHT animation-blocked time attributed to the latest observed controller cast, not proven skill duration or server lock. In-progress waits are included in total only; waits ended by a cast or encounter close are censored.',animationCensored:s.animationCensored,paceMs:s.paceMs,paceReason:s.paceReason,paceHistory:s.paceHistory.map(__captureESMFunction((__esmLocal20=(x=>({...x}))),"")),skills};}
__esmLocal8=snapshot;

    function close(reason='target_changed'){if(!active)return;const now=at();charge(now);finishAnimation(now,true);
      for(const id of active.pending.values()){const r=row(id);if(r)r.interrupted++;}active.pending.clear();
      active.endedAt=now;active.reason=reason;completed.push(snapshot(active,now));if(completed.length>20)completed.shift();active=null;}
__esmLocal21=close;

    return Object.freeze({
      open(info){
__esmLocal22=__captureESMMethod(this,"open","init");
if(active?.key===info.key)return;close();const now=at();active={...info,startedAt:now,endedAt:null,reason:'active',
        lastCastId:null,animation:null,animationCensored:0,updatedAt:now,state:'initializing',timeMs:{},attackWindowMs:0,eligible:false,damageEvents:[],rollingTruncated:false,skills:new Map(),pending:new Map(),resumes:0,paceMs:null,paceReason:null,paceHistory:[]};},
      close,
      state(reason,phase,pace,paceReason){
__esmLocal23=__captureESMMethod(this,"state","init");
if(!active)return;charge(at());
        active.state=phase==='RETREAT'?'recovery':phase==='DODGE'?'dodge':phase==='KITE'?'kite':
          /position|move_wait|unknown_position/.test(reason)?'positioning':reason==='waiting_native_cooldown'?'native_cooldown':
          reason==='waiting_ready_tuyet_hoc'?'skill_readiness':reason==='hidden_tab'?'hidden':
          reason==='casting_native_skill'||reason==='holding_far'?'fighting':reason;
        const animationId=phase==='FIGHT'&&active.state==='waiting_native_animation'?active.lastCastId:null;
        if(active.animation&&active.animation.id!==animationId)finishAnimation(at(),phase!=='FIGHT');
        if(animationId!==null&&!active.animation)active.animation={id:animationId,startedAt:at()};
        active.eligible=phase==='FIGHT'&&combatStates.has(active.state);
        if(active.paceMs!==pace||active.paceReason!==(paceReason??null)){active.paceHistory.push({at:at(),paceMs:pace,reason:paceReason??null});if(active.paceHistory.length>60)active.paceHistory.shift();}
        active.paceMs=pace;active.paceReason=paceReason??null;},
      cast(serial,id,pace){
__esmLocal24=__captureESMMethod(this,"cast","init");
const r=row(id);if(!r)return;finishAnimation(at(),true);active.lastCastId=id;r.attempts++;r.lastPaceMs=pace;
        if(active.pending.size>=250){const [old,oldId]=active.pending.entries().next().value;row(oldId).interrupted++;active.pending.delete(old);}active.pending.set(serial,id);},
      result(serial,hit,damage=0,interrupted=false){
__esmLocal25=__captureESMMethod(this,"result","init");
if(!active?.pending.has(serial))return;const id=active.pending.get(serial),r=row(id);active.pending.delete(serial);
        if(hit){const amount=Number.isFinite(Number(damage))&&Number(damage)>0?Number(damage):0;r.hits++;r.matchedDamage+=amount;const now=at();active.damageEvents.push({id,damage:amount,at:now});while(active.damageEvents.length&&active.damageEvents[0].at<=now-10000)active.damageEvents.shift();if(active.damageEvents.length>1024){active.damageEvents.shift();active.rollingTruncated=true;}}else if(interrupted)r.interrupted++;else r.unconfirmed++;},
      resume(){
__esmLocal26=__captureESMMethod(this,"resume","init");
if(active)active.resumes++;},
      report(){
__esmLocal27=__captureESMMethod(this,"report","init");
return {current:active?snapshot(active,at()):null,completed:JSON.parse(JSON.stringify(completed)),
        limits:{completedBosses:20,skillsPerBoss:64,pendingCasts:250,rollingDamageEvents:1024},
        interpretation:'Matched direct-hit DPS only; may omit DOT/later multi-hit/companion damage. Encounter DPS includes positioning/dodge/recovery. Attack-window contribution divides by controller FIGHT attack/readiness time, not individual skill duration. Unconfirmed is not a proven miss. Rolling DPS uses at most 10 seconds and a bounded event buffer. No automatic combo changes.'};}
    });
  }});
})),""))();

}
export {getKVPV_COMBAT_METRICS} from '../api.mjs';
export const api=Object.freeze({
  get KVPV_COMBAT_METRICS(){return globalThis.KVPV_COMBAT_METRICS;},
});