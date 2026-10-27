;(() => {
if(!window.KVPV_MODE||!window.KVPV_TH300||String(window.__KVPV_OWN_ACTOR_ID||'')!==String(window._Ba?._rJ?._O$?.ins?.actorId||'')||!window.__KVPV_OWN_ACTOR_ID)throw Error('Chạy trong game-frame đã nạp FULL.');
window.KVPV_MODE.stop('Cập nhật 5 tay + Tuyệt Học');
(() => {
'use strict';
window.KVPV_TQ_BASIC_PROFILE=Object.freeze({create(env){
const ids=[8001,8002,8003,8004,8005],pending=new Map(),rows=new Map();
let enabled=false,waitMs=10,context='',probe=null,serial=0,tuyetHoc=false;
const now=()=>Date.now(),active=()=>enabled&&env.scope()==='THIEN_QUAN';
const learned=()=>ids.filter(id=>env.learned().includes(id));
const row=id=>{if(!rows.has(id))rows.set(id,{id,attempts:0,unconfirmed:0,hits:[]});return rows.get(id);};
const probeRunning=()=>active()&&probe?.status==='running';
const probeSafe=()=>probeRunning()&&env.phase()==='FIGHT'&&Number.isFinite(env.hp())&&env.hp()>=70;
const goal=()=>probeSafe()?probe.distances[probe.distanceIndex]:null;
function stop(reason='stopped'){if(probe?.status==='running'){probe.status=reason;probe.endedAt=now();}return report();}
function step(){probe.index++;probe.distanceIndex=0;if(probe.index>=probe.ids.length)stop('complete');}
function tick(){
const next=env.context();if(next!==context){if(probe?.status==='running')stop('Boss/map changed');context=next;pending.clear();rows.clear();}
for(const [key,c]of pending)if(now()-c.at>3500){row(c.id).unconfirmed++;pending.delete(key);}
if(!probeRunning())return;
if(now()-probe.startedAt>=300000){stop('timeout');return;}
if(!probeSafe())return;
const key=probe.index+'/'+probe.distanceIndex,attempts=probe.attempts.filter(c=>c.step===key),hits=probe.hits.filter(c=>c.step===key);
if(hits.length>=2){step();return;}
if(attempts.length>=2&&!attempts.some(c=>pending.has(c.serial))){probe.distanceIndex++;if(probe.distanceIndex>=probe.distances.length)step();}
}
function canAttempt(id){if(!probeRunning())return true;if(!probeSafe()||id!==probe.ids[probe.index])return false;return probe.attempts.filter(c=>c.step===probe.index+'/'+probe.distanceIndex).length<2;}
function cast(key,id,distance){if(!active()||!ids.includes(id))return;tick();const c={serial:key,id,distance,at:now(),context,step:probeSafe()?probe.index+'/'+probe.distanceIndex:null,probeSerial:probe?.serial};row(id).attempts++;pending.set(key,c);if(c.step!==null)probe.attempts.push({...c});if(pending.size>250)pending.delete(pending.keys().next().value);}
function hit(key,castDistance,hitDistance,damage){const c=pending.get(key);if(!c||c.context!==context)return;pending.delete(key);const h={serial:key,id:c.id,castDistance,hitDistance,damage,at:now()};row(c.id).hits.push(h);if(row(c.id).hits.length>50)row(c.id).hits.shift();if(probe?.serial===c.probeSerial&&c.step!==null)probe.hits.push({...h,step:c.step});}
function start(distances=[302,280,240,200,160,120,80]){
if(!active()||env.phase()!=='FIGHT'||!(env.hp()>=70))throw Error('Đo tầm chỉ trong Thiên Quan, pha FIGHT và HP ≥70%.');
if(!Array.isArray(distances)||!distances.length||distances.length>10||distances.some(d=>!Number.isFinite(d)||d<80||d>302))throw Error('Khoảng đo phải trong 80..302.');
tick();const available=learned();if(!available.length)throw Error('Chưa có năm chiêu tay native để đo.');
probe={serial:++serial,status:'running',context,startedAt:now(),ids:available,distances:[...new Set(distances)].sort((a,b)=>b-a),index:0,distanceIndex:0,attempts:[],hits:[]};return report();
}
function report(){return JSON.parse(JSON.stringify({enabled,active:active(),tuyetHocEnabled:tuyetHoc,tuyetHocActive:active()&&tuyetHoc&&!probeRunning(),waitClientMs:waitMs,ids,learned:learned(),context,probe,probePaused:probeRunning()&&!probeSafe(),
rows:ids.map(id=>{const r=row(id),distances=r.hits.map(h=>Math.min(h.castDistance,h.hitDistance)).filter(Number.isFinite).sort((a,b)=>b-a);return {...r,confirmedDistance:distances[1]??null,rangeStatus:distances.length>=2?'two_direct_hit_pairs':'unverified'};}),
note:'Confirmed distance is a tested lower bound, not maximum server range. No confirmation is not proof of a miss. Active probe moves inward, may take damage, pauses below 70% HP/during dodge or recovery, and returns to the normal far goal when finished.'}));}
return Object.freeze({active,allowsTuyetHoc:()=>active()&&tuyetHoc&&!probeRunning(),setTuyetHoc(value=true){tuyetHoc=!!value;return report();},wait:()=>waitMs,goal,ids:()=>probeSafe()?[probe.ids[probe.index]]:ids.slice(),canAttempt,tick,cast,hit,start,stop,report,
configure(on=true,wait=10){if(!Number.isFinite(wait)||wait<1||wait>1000)throw Error('Wait must be 1..1000ms');enabled=!!on;waitMs=wait;if(!enabled)stop('disabled');return report();}});
}});
})();
(() => {
'use strict';
const W=window,TAG='[TH300 V12.9.6]',actorId=String(W.__KVPV_OWN_ACTOR_ID||'');
W.KVPV_BASIC10?.release?.();
try{W.KVPV_TH300?.stop?.('reload');}catch(_){window.KVPV_V1?.diagnostics?.record(_);}
const Skill=W._d?._Yct?._Eet,Combat=W._d?._Yct?._Het,Move=W._d?._Yct?._zet;
if(!actorId||!Skill||!Combat||!Move){console.warn(TAG,'Chưa vào game-frame');return;}
const CFG={min:300,max:312,goal:302,tolerance:5,scanMs:8,basicOnly:false,basicAnimationSpeed:1,clientPaceMs:null,afterTHWaitMs:0,moveWaitMs:150,castTtlMs:3500,minCastConfirmations:2,paceMs:75};
const scopedCombat=()=>W.KVPV_DESKTOP_CONTROL?.scopeProfile?.(W.KVPV_FAR_SCOPE?.status?.()?.kind)??null;
for(const key of ['goal','min','max','basicOnly']){let base=CFG[key];Object.defineProperty(CFG,key,{enumerable:true,configurable:true,get(){const p=scopedCombat();if(!p)return base;if(key==='basicOnly')return p.mode==='basic8001';if(key==='goal')return p.distance;if(key==='max')return p.distance+10;return p.distance===300?295:p.distance>300?300:280;},set(value){base=value;}});}
const metrics=W.KVPV_COMBAT_METRICS?.create?.()??null;
const pacer=W.KVPV_SKILL_PACING?.create?.()??null;
const transforming=()=>W.KVPV_TRANSFORM10?.transformed?.()&&W.KVPV_TRANSFORM10.status().enabled;
const currentPace=()=>tqFive?.active()?tqFive.wait():scopedCombat()?.intervalMs??CFG.clientPaceMs??(transforming()?10:(mixed.enabled&&mixed.wantBasic&&mixed.basicPaceMs!==null?mixed.basicPaceMs:(pacer?.pace()??CFG.paceMs)));
function setClientPace(value=1){if(value===null){CFG.clientPaceMs=null;return {clientPaceMs:null};}const n=Number(value);if(!Number.isFinite(n)||n<0||n>1000)throw Error('Client pace must be 0..1000 ms');CFG.clientPaceMs=n;return {clientPaceMs:n};}
const ST={running:false,mode:'OFF',s:null,c:null,target:null,targetOcc:null,owner:{},lastMove:0,
timer:null,lastTickAt:null,timerRepairs:0,casts:[],proofs:new Map(),evidence:new Map(),stats:new Map(),seen:new Set(),blocked:0,skillWaits:0,
moves:0,castAttempts:0,confirmedPairs:0,basicImpactSerial:null,basicTailReleases:0,lastDistance:null,lastHitDistance:null,
arrivalSample:null,arrivalSnap:false,positionSample:null,positionRetries:0,positionOffset:0,positionCommands:0,positionPause:null,positionRecovery:0,movement:[],positioning:true,ownMove:false,moveGoal:null,lastInvocation:-Infinity,lastTHAt:-Infinity,fastCasts:0,blockedSteering:0,
finishTarget:null,lastBackgroundTick:-Infinity,skillCursor:0,lastOwnerPhase:null,resumes:0,lastReason:'off',lastError:'',history:[]};
const mixed={enabled:false,primary:false,primaryStreak:0,hitQuota:null,confirmedSinceTH:0,thCycles:0,rotation:[],rotationCursor:0,wantBasic:false,suspended:false,unconfirmed:0,basicPaceMs:null,ready:new Map(),attempts:0,hits:0,damage:0,examples:[]};
let skillPriority='interleaved';
const tqFive=W.KVPV_TQ_BASIC_PROFILE?.create?.({scope:()=>W.KVPV_FAR_SCOPE?.status?.()?.kind??(W.KVPV_TQ_SCOPE?.inside?.()===true?'THIEN_QUAN':'OUTSIDE'),context:()=>scene()+'/'+identity(role().c?.target),phase:()=>combatOwner()?.phase,hp:()=>{const h=prop(role().a,'hp');return Array.isArray(h)&&Number(h[1])>0?Number(h[0])/Number(h[1])*100:null;},learned:()=>[...(role().s?._rtt??[]),...(role().s?._wet??[])].map(r=>Number(r?.[0]))})??null;
for(const key of ['goal','min','max','scanMs']){const descriptor=Object.getOwnPropertyDescriptor(CFG,key);let base=CFG[key];Object.defineProperty(CFG,key,{enumerable:true,configurable:true,get(){const d=tqFive?.goal();if(key==='scanMs'&&tqFive?.active())return tqFive.wait();if(d!==null&&d!==undefined)return key==='goal'?d:key==='min'?Math.max(0,d-15):key==='max'?d+10:base;return descriptor.get?descriptor.get():base;},set(value){if(descriptor.set)descriptor.set(value);else base=value;}});}
const basicProbe={enabled:false,dispatch:false,context:null,attempts:0,hits:0,damage:0,startedAt:null,nextAt:0,examples:[]};
const isBasic=id=>Number.isSafeInteger(Number(id))&&Number(id)>=8001&&Number(id)<=8009;
const excludedBasics=new Set([8002]);
const selectedBasic=id=>tqFive?.active()?tqFive.ids().includes(Number(id)):!excludedBasics.has(Number(id))&&(!mixed.primary||!mixed.rotation.length||mixed.rotation.includes(Number(id)));
const rangeTestKey='__KVPV_BASIC_RANGE_TEST_20261023';let rangeTest=null,rangeTestTimer=null;
function learnedBasics(){const s=role().s;return [...new Set([...(s?._rtt??[]),...(s?._wet??[])].map(r=>Number(r?.[0])).filter(id=>isBasic(id)&&(tqFive?.active()||!excludedBasics.has(id))))].sort((a,b)=>a-b);}
function basicRotation(){const learned=learnedBasics();return (tqFive?.active()?tqFive.ids():mixed.rotation).filter(id=>learned.includes(id));}
function basicQuota(){return basicRotation().length||3;}
function primaryBasicId(){const order=basicRotation();return rangeTest?.status==='running'?rangeTest.rows[rangeTest.index]?.id:order.length?order[mixed.rotationCursor%order.length]:learnedBasics()[0]??null;}
function finishRangeTest(reason){if(rangeTest?.status!=='running')return;rangeTest.status=reason;rangeTest.endedAt=Date.now();mixed.wantBasic=mixed.primary&&!mixed.suspended;
if(rangeTestTimer!=null)(W.KVPV_V1?.timers?.clearTimeout??W.clearTimeout)?.(rangeTestTimer);rangeTestTimer=null;}
function startBasicRangeTest(skillIds=null){
if(W[rangeTestKey])return W[rangeTestKey];
const ids=learnedBasics().filter(id=>id!==8001&&(!Array.isArray(skillIds)||skillIds.includes(id))).slice(0,4);
if(!ids.length)return null;
rangeTest=W[rangeTestKey]={status:'running',actor:actorId,startedAt:Date.now(),index:0,stepAt:Date.now(),maxDurationMs:60000,maxAttemptsPerSkill:2,
rows:ids.map(id=>({id,attempts:[],hits:[]}))};mixed.wantBasic=true;
rangeTestTimer=(W.KVPV_V1?.timers?.setTimeout??W.setTimeout)?.(()=>finishRangeTest('timeout'),60000);return rangeTest;
}
function advanceRangeTest(){if(rangeTest?.status!=='running')return;
const now=Date.now(),row=rangeTest.rows[rangeTest.index];
if(now-rangeTest.startedAt>=rangeTest.maxDurationMs){finishRangeTest('timeout');return;}
if(now-rangeTest.stepAt>=12000||(row.attempts.length>=2&&!ST.casts.some(c=>!c.used&&c.id===row.id&&now-c.time<=CFG.castTtlMs))){
rangeTest.index++;rangeTest.stepAt=now;mixed.suspended=false;mixed.unconfirmed=0;mixed.wantBasic=true;
if(rangeTest.index>=rangeTest.rows.length)finishRangeTest('complete');
}
}
const burst={enabled:false,dispatch:false,desired:null,nextAt:0,serial:0,active:null,history:[]};
const hitDiagnostics={received:0,accepted:0,rejected:{},recent:[]};
const tailStudyKey='__KVPV_CONFIRMED_TAIL_STUDY_20261024';let tailStudy=null,tailStudyTimer=null,confirmedTailCut=false,confirmedTailCuts=0;
function setConfirmedTailCut(enabled=true){confirmedTailCut=!!enabled;return {enabled:confirmedTailCut,onlyAfterMatchedHit:true};}
function finishTailStudy(status='complete'){if(tailStudy?.status!=='running')return;tailStudy.status=status;tailStudy.endedAt=Date.now();
if(tailStudyTimer!=null)(W.KVPV_V1?.timers?.clearTimeout??W.clearTimeout)?.(tailStudyTimer);tailStudyTimer=null;}
function startConfirmedTailStudy(){if(W[tailStudyKey])return W[tailStudyKey];
const row=()=>({activeMs:0,casts:0,hits:0,damage:0,cuts:0});
tailStudy=W[tailStudyKey]={actor:actorId,status:'running',phase:'baseline',startedAt:Date.now(),lastAt:Date.now(),wasActive:false,baseline:row(),trim:row(),error:''};
tailStudyTimer=(W.KVPV_V1?.timers?.setTimeout??W.setTimeout)?.(()=>finishTailStudy('timeout'),60000);return tailStudy;
}
function advanceTailStudy(){if(tailStudy?.status!=='running')return;const now=Date.now(),active=canFight()&&atPosition(role());
if(now-tailStudy.startedAt>=60000){finishTailStudy('timeout');return;}
if(active&&tailStudy.wasActive)tailStudy[tailStudy.phase].activeMs+=Math.min(1000,Math.max(0,now-tailStudy.lastAt));
tailStudy.lastAt=now;tailStudy.wasActive=active;
if(tailStudy[tailStudy.phase].activeMs>=8000){if(tailStudy.phase==='baseline')tailStudy.phase='trim';else finishTailStudy();}
}
const dispatch={actor:null,pending:null,calls:0,signals:0,silent:0,recent:[]};
const speedKey='__KVPV_BASIC_SPEED_TRIAL_99_REPEAT1_20261025';let speedTrial=null;
const speedClips=new Map();
function restoreSpeedClips(){for(const [clip,s]of speedClips)try{if(clip?._nt===s.applied)clip.timeScale=s.before;}catch(e){ST.lastError=String(e);}speedClips.clear();}
function finishSpeedTrial(reason='complete'){
if(!speedTrial||['complete','interrupted','timeout','stopped'].includes(speedTrial.state))return;
restoreSpeedClips();speedTrial.state=reason;speedTrial.endedAt=Date.now();
}
function speedSample(){return {at:Date.now(),hits:mixed.hits,signals:dispatch.signals,calls:dispatch.calls,damage:mixed.damage};}
function startBasicSpeedTrial(multiplier=99){
if(multiplier!==9&&multiplier!==99)throw Error('Bounded animation trial supports factor 9 or 99 only');
if(CFG.basicAnimationSpeed!==1)throw Error('Disable persistent animation scaling before a comparison trial');
if(W[speedKey])return W[speedKey];
speedTrial=W[speedKey]={actor:actorId,multiplier,state:'waiting',startedAt:Date.now(),deadline:Date.now()+60000,phaseMs:5000,
baseline:null,accelerated:null,restored:false,note:'Client animation multiplier; not a server damage multiplier.'};
return speedTrial;
}
function advanceSpeedTrial(){
const t=speedTrial;if(!t||['complete','interrupted','timeout','stopped'].includes(t.state))return;
if(Date.now()>=t.deadline){finishSpeedTrial('timeout');t.restored=true;return;}
const r=role(),context=identity(r.c?.target)+'/'+scene();
if(!CFG.basicOnly||!canFight()||!eligible(r.c?.target)||!atPosition(r)){
if(t.state!=='waiting'){finishSpeedTrial('interrupted');t.restored=true;}return;
}
if(t.state==='waiting'){t.context=context;t.state='baseline';t.sample=speedSample();t.deadline=Date.now()+15000;return;}
if(context!==t.context){finishSpeedTrial('interrupted');t.restored=true;return;}
const elapsed=Date.now()-t.sample.at;if(elapsed<t.phaseMs)return;
const end=speedSample(),result={seconds:elapsed/1000,hits:end.hits-t.sample.hits,signals:end.signals-t.sample.signals,calls:end.calls-t.sample.calls,damage:end.damage-t.sample.damage};
result.hitsPerSecond=result.hits/result.seconds;result.castSignalsPerSecond=result.signals/result.seconds;
if(t.state==='baseline'){t.baseline=result;t.state='accelerated';t.sample=end;}
else {t.accelerated=result;t.observedHitRatio=t.baseline.hitsPerSecond>0?result.hitsPerSecond/t.baseline.hitsPerSecond:null;finishSpeedTrial('complete');t.restored=true;}
}
function animationTrialCall(native,self,args){
const t=speedTrial,avatar=self?._Qrt,trialActive=t?.state==='accelerated'&&Date.now()<t.deadline;
const factor=trialActive?t.multiplier:CFG.basicAnimationSpeed;
if(factor<=1||!CFG.basicOnly||Number(args[0])!==8001||
self.owner!==dispatch.actor||!canFight()||typeof avatar?.getActionTween!=='function')return native.apply(self,args);
const original=avatar.getActionTween,expectedAction=String(self._mvt?.(8001)?.[5]||'attack');if(trialActive)t.nativeAction=expectedAction;
const wrapped=function(...a){
if(a[0]!==expectedAction)return original.apply(this,a);
const before=Number(a[2]??1);if(!Number.isFinite(before)||before<=0)return original.apply(this,a);
a[2]=Math.min(factor,before*factor);const tween=original.apply(this,a),clip=this.getCurAction;
if(clip&&typeof clip==='object'&&speedClips.size<32)speedClips.set(clip,{before,applied:a[2]});
if(trialActive)t.scaledAnimations=(t.scaledAnimations??0)+1;ST.scaledBasicAnimations=(ST.scaledBasicAnimations??0)+1;return tween;
};
avatar.getActionTween=wrapped;
try{return native.apply(self,args);}finally{if(avatar.getActionTween===wrapped)avatar.getActionTween=original;}
}
function onNativeCast(targetId,skillId){const p=dispatch.pending;if(p){if(p.events.length<4)p.events.push({targetId:String(targetId),id:Number(skillId)});if(String(targetId)===p.targetId&&Number(skillId)===p.id)p.signaled=true;}}
function detachDispatch(){if(dispatch.actor){dispatch.actor.off?.(1039,ST.owner,onNativeCast);dispatch.actor=null;}}
function attachDispatch(a){if(dispatch.actor===a)return;detachDispatch();if(typeof a?.on==='function'&&typeof a?.off==='function'){a.on(1039,ST.owner,onNativeCast);dispatch.actor=a;}}
function invokeNative(native,self,args){
if(!ST.running||!dispatch.actor)return native.apply(self,args);
dispatch.actor.off(1039,ST.owner,onNativeCast);dispatch.actor.on(1039,ST.owner,onNativeCast);
const pending={id:Number(args[0]),targetId:identity(self.target),signaled:false,events:[]};dispatch.pending=pending;dispatch.calls++;
try{return animationTrialCall(native,self,args);}finally{
if(pending.signaled){dispatch.signals++;if(pending.id>=1001&&pending.id<=1008)ST.lastTHAt=Date.now();if(mixed.hitQuota!==null&&pending.id>=1001&&pending.id<=1008){mixed.confirmedSinceTH=0;mixed.thCycles++;mixed.wantBasic=true;}}else dispatch.silent++;
let silentDetail=null;
if(!pending.signaled){
let effect=null,effectError='';try{if(typeof self._mvt==='function')effect=!!self._mvt(pending.id);}catch(e){effectError=String(e?.message||e);}
silentDetail={ownerId:identity(self.owner),ownerType:prop(self.owner,'type'),ownerMatchesActor:self.owner===dispatch.actor,
validTarget:self.isValidTarget?.()??null,effectAvailable:effect,effectError,
nativeFunction:Function.prototype.toString.call(native).slice(0,240)};
}
dispatch.recent.push({at:Date.now(),id:pending.id,targetId:pending.targetId,signaled:pending.signaled,events:pending.events,silentDetail});if(dispatch.recent.length>16)dispatch.recent.shift();
dispatch.pending=null;
}
}
const prop=(o,k)=>{try{return o?.property?.get?.(k)??null;}catch(_){return null;}};
const identity=o=>String(prop(o,'id')??o?.id??'');
const loc=o=>{const p=prop(o,'position');const x=Number(p?.x),y=Number(p?.y);return Number.isFinite(x)&&Number.isFinite(y)?{x,y}:null;};
const radius=(a,b)=>{const p=loc(a),q=loc(b);return p&&q?Math.hypot(p.x-q.x,p.y-q.y):null;};
function role(){const world=W._C?._Ba?.instance;const a=world?.getRole?.(Number(actorId))??world?.getRole?.(actorId);return {a,s:a?.getComponent?.(Skill),c:a?.getComponent?.(Combat),m:a?.getComponent?.(Move)};}
function stageOcc(){if(['LINH_LUNG','PHU_VAN','TRU_TIEN'].includes(W.KVPV_FAR_SCOPE?.status?.().kind)){const t=role().c?.target;return W.KVPV_FAR_SCOPE.eligible(t)?Number(prop(t,'occ')):null;}try{const lv=Number(W._Ba?._Co?._Mo?.ins?.curLv),c=W._ft?._h$?.ins?.getCfgByLv?.(lv);const n=c?Number(W._ft._h$.ins.occ(c,lv)):NaN;return Number.isSafeInteger(n)&&n>0?n:null;}catch(_){return null;}}
function eligible(t){return !!t&&t.isValid!==false&&Number(prop(t,'type'))===1&&stageOcc()!==null&&Number(prop(t,'occ'))===stageOcc();}
function key(occ,id){return String(occ)+'/'+String(id);}
const scene=()=>String(W._Ba?._$a?._yo?.ins?.intoSce?.[0]??'');
function candidate(id){
if(W.KVPV_TRANSFORM10?.transformed?.())return W.KVPV_TRANSFORM10.has(id);
if(!Number.isSafeInteger(id)||id<=0||(id>=8001&&id<=8009))return false;
const r=role();return [r.s?._rtt,r.s?._wet].some(rows=>Array.isArray(rows)&&rows.some(row=>Number(row?.[0])===id));
}
function bossRange(){const cfg=Number(W._ft?._tY?.ins?.getCfgById?.(Number(prop(role().c?.target,'occ')))?.[3])||0;
const observed=Number(W.KVPV_HITRUN1?.status?.(false)?.observedDangerRadius)||0;return Math.max(cfg,observed);}
function outside(d){return Number.isFinite(d)&&d>CFG.min&&d<=CFG.max;}
function combatOwner(){
return W.KVPV_HITRUN1?.status?.(false);
}
function towerFinish(){
const kind=W.KVPV_FAR_SCOPE?.status?.().kind,threshold=['LINH_LUNG','PHU_VAN','TRU_TIEN'].includes(kind)?.02:null;
if(threshold===null)return false;
const t=role().c?.target,h=prop(t,'hp'),current=Number(h?.[0]),max=Number(h?.[1]);
return eligible(t)&&Array.isArray(h)&&Number.isFinite(current)&&Number.isFinite(max)&&max>0&&current>0&&current/max<=threshold;
}
function canFight(){if(W._Ba?._rJ?._O$?.ins?.isDead===true||(W.KVPV_FAR_SCOPE??W.KVPV_TQ_SCOPE)?.inside?.()===false)return false;const hr=combatOwner(),r=role(),hp=prop(r.a,'hp');
const pct=Array.isArray(hp)&&Number(hp[1])>0?Number(hp[0])/Number(hp[1])*100:hr?.hpPct;
return hr?.running===true&&hr.phase==='FIGHT'&&Number.isFinite(pct)&&pct>Number(hr.leavePct??35)&&r.m?._fut!==3&&r.m?._fut!==4;}
function stats(occ,id){const k=key(occ,id);if(!ST.stats.has(k))ST.stats.set(k,{attempts:0,hits:0,damage:0,unconfirmed:0});return ST.stats.get(k);}
function settle(c,hit){pacer?.observe(hit,c.tuningEligible===true&&canFight()&&atPosition(role())&&c.targetId===identity(role().c?.target)&&c.scene===scene());}
function expire(){const t=Date.now();for(const c of ST.casts)if(!c.used&&t-c.time>CFG.castTtlMs){c.used=true;stats(c.occ,c.id).unconfirmed++;metrics?.result(c.serial,false,0,c.metricsInterrupted===true);
if(c.mixedBasic&&!c.metricsInterrupted&&c.targetId===identity(ST.target)&&!tqFive?.active()){mixed.unconfirmed++;if(mixed.hits===0&&mixed.unconfirmed>=3&&!mixed.suspended){mixed.suspended=true;mixed.wantBasic=false;note('BASIC-SUSPENDED',{reason:'three_unconfirmed_basic_results',bossId:c.targetId});}}
settle(c,false);}}
function supportedDistance(occ,id){const a=(ST.evidence.get(key(occ,id))||[]).map(x=>Math.min(x.castDistance,x.hitDistance)).sort((a,b)=>b-a);return a[CFG.minCastConfirmations-1]??0;}
function verified(occ,id){return (ST.proofs.get(key(occ,id))?.size||0)>=CFG.minCastConfirmations;}
function probeActive(){return basicProbe.enabled&&!transforming()&&basicProbe.attempts<8&&(basicProbe.startedAt===null||Date.now()-basicProbe.startedAt<15000);}
function basicPendingBlocks(c){const combat=role().c;if(CFG.basicOnly||tqFive?.active())return animationPlaying(combat)||combat?.isCooldown?.()!==false;if(mixed.hitQuota===null)return true;const rows=[...(role().s?._rtt||[]),...(role().s?._wet||[])];const row=rows.find(r=>Number(r[0])===c.id);const wait=Math.max(500,Number(row?.[2])||0);return Date.now()-c.time<wait||animationPlaying(combat)||combat?.isCooldown?.()!==false;}
const basicQuotaSatisfied=id=>mixed.suspended||mixed.hitQuota===null||Number(id)<1001||Number(id)>1008||mixed.confirmedSinceTH>=mixed.hitQuota;
function allowed(id,occ,d){if(tqFive?.active()&&(isBasic(id)?!tqFive.ids().includes(Number(id))||!tqFive.canAttempt(Number(id)):!tqFive.allowsTuyetHoc()||Number(id)<1001||Number(id)>1008))return false;if(isBasic(id))return selectedBasic(id)&&!(rangeTest?.status==='running'&&rangeTest.rows[rangeTest.index]?.id===Number(id)&&rangeTest.rows[rangeTest.index].attempts.length>=2)&&(tqFive?.active()||basicProbe.dispatch||mixed.enabled&&!mixed.suspended)&&[role().s?._rtt,role().s?._wet].some(rows=>Array.isArray(rows)&&rows.some(row=>Number(row?.[0])===Number(id)))&&
!ST.casts.some(c=>!c.used&&c.basicTrial&&basicPendingBlocks(c)&&c.id===Number(id)&&c.targetId===identity(role().c?.target)&&c.scene===scene()&&Date.now()-c.time<=CFG.castTtlMs);
return basicQuotaSatisfied(id)&&candidate(Number(id))&&
!((burst.enabled||pacer)&&!transforming()&&ST.casts.some(c=>!c.used&&c.id===Number(id)&&c.targetId===identity(role().c?.target)&&c.scene===scene()&&Date.now()-c.time<=CFG.castTtlMs))&&
(ST.mode==='SCAN'||(verified(occ,id)&&Number.isFinite(d)&&d<=supportedDistance(occ,id)+0.01));}
function targetDistance(){
if(tqFive?.active())return CFG.goal;
if(ST.mode!=='STRICT')return CFG.goal;
const occ=stageOcc(),distances=skillNames().filter(x=>verified(occ,x.id)).map(x=>supportedDistance(occ,x.id));
if(!distances.length)return null;
return Math.min(CFG.goal,Math.max(...distances)-0.2);
}
function note(type,data){ST.history.push({time:Date.now(),type,data});if(ST.history.length>60)ST.history.shift();}
function restore(h){if(!h)return;const {obj,k,fn,own}=h;if(obj[k]!==fn){ST.lastError='Hook replaced externally: '+k;return;}try{if(own)Object.defineProperty(obj,k,own);else delete obj[k];}catch(e){ST.lastError=String(e);}}
function hook(obj,k,mk){
if(typeof obj?.[k]!=='function')return null;
let own=Object.getOwnPropertyDescriptor(obj,k);if(own&&!own.configurable)return null;
let base=obj[k];const seen=new Set();
while(typeof base?.__KVPV_TH300_PARENT==='function'&&!seen.has(base)){seen.add(base);base=base.__KVPV_TH300_PARENT;}
const legacy=fn=>{const text=Function.prototype.toString.call(fn);
return k==='combat'?text.startsWith('function(skillId){')&&text.includes('ST.running&&this===r.c')&&text.includes('ST.lastInvocation=Date.now()'):
k==='_f7t'&&text.startsWith('function(active,common,mode){')&&text.includes('ST.running&&this===r.s')&&text.includes('ST.skillWaits');};
if(legacy(base)){
let proto=Object.getPrototypeOf(obj),candidate;
while(proto){const d=Object.getOwnPropertyDescriptor(proto,k);if(typeof d?.value==='function'){candidate=d.value;break;}proto=Object.getPrototypeOf(proto);}
if(!candidate||legacy(candidate)){ST.lastError='Cannot safely unwrap legacy TH300 '+k;return null;}
base=candidate;
}
if(base!==obj[k]){
const inherited=Object.getPrototypeOf(obj)?.[k];
own=base===inherited?undefined:{value:base,writable:true,configurable:true,enumerable:!!own?.enumerable};
note('HOOK-DEDUP',{method:k});
}
const wrapped=mk(base);Object.defineProperty(wrapped,'__KVPV_TH300_PARENT',{value:base});
Object.defineProperty(obj,k,{value:wrapped,writable:true,configurable:true,enumerable:!!own?.enumerable});return {obj,k,fn:wrapped,own};
}
function unbind(){ST.basicImpactSerial=null;detachDispatch();for(const h of ST.movement.slice().reverse())restore(h);ST.movement=[];restore(ST.s);restore(ST.c);ST.s=null;ST.c=null;ST.positioning=false;}
function atPosition(r){const d=radius(r.a,r.c?.target),goal=targetDistance();return goal!==null&&outside(d)&&Math.abs(d-goal)<=CFG.tolerance+(ST.mode==='SCAN'&&ST.arrivalSnap?1:0)&&(ST.mode!=='STRICT'||d<=goal+0.2);}
function castReady(){const r=role();return canFight()&&!ST.positioning&&atPosition(r);}
function guardMovement(r){
const entryGuard=()=>{const hr=combatOwner(),hp=prop(r.a,'hp');return ST.running&&
W.KVPV_FAR_SCOPE?.status?.()?.kind==='THIEN_QUAN'&&!hr?.running&&
W._Ba?._rJ?._O$?.ins?.isDead!==true&&Array.isArray(hp)&&Number(hp[1])>0&&Number(hp[0])/Number(hp[1])*100>35;};
for(const method of ['moveTo','moveToCoordinate','moveByPath']){
if(typeof r.m[method]!=='function')continue;
const move=hook(r.m,method,native=>function(...args){
if(ST.running&&(canFight()||entryGuard())&&eligible(r.c?.target)&&!towerFinish()&&!ST.ownMove){ST.blockedSteering++;return undefined;}
return native.apply(this,args);
});
if(!move){for(const h of ST.movement.slice().reverse())restore(h);ST.movement=[];return false;}ST.movement.push(move);
}
if(!ST.movement.length)return false;
if(typeof r.m.stop==='function'){
const stopHook=hook(r.m,'stop',native=>function(...args){
if(ST.running&&ST.positioning&&canFight()&&!towerFinish()&&!ST.ownMove&&!atPosition(r)){ST.blockedSteering++;return undefined;}
return native.apply(this,args);
});
if(!stopHook){for(const h of ST.movement.slice().reverse())restore(h);ST.movement=[];return false;}ST.movement.push(stopHook);
}
return true;
}
const animationPlaying=c=>c?._jh?.isPlaying===true;
const basicTailReady=()=>mixed.enabled&&ST.basicImpactSerial===ST.castAttempts&&ST.basicImpactSerial!==null;
function nativeReady(c){
const studyRunning=tailStudy?.status==='running',cutEnabled=studyRunning?tailStudy.phase==='trim':confirmedTailCut;
if(cutEnabled&&basicTailReady()&&canFight()){
const cast=ST.casts.findLast?.(x=>x.serial===ST.basicImpactSerial),tween=c?._jh;
if(cast?.used&&(!studyRunning||cast.tailPhase==='trim')&&!cast.tailCut&&[8001,8005].includes(cast.id)&&cast.targetId===identity(c.target)&&cast.scene===scene()&&tween?.isPlaying===true&&typeof tween.stop==='function'){
cast.tailCut=true;try{tween.stop();if(c._jh===tween)c._jh=null;confirmedTailCuts++;if(studyRunning)tailStudy.trim.cuts++;}
catch(e){confirmedTailCut=false;ST.lastError=String(e?.message||e);if(studyRunning){tailStudy.error=ST.lastError;finishTailStudy('error');}}
}
}
return (!animationPlaying(c)||basicTailReady())&&(typeof c?.isCooldown!=='function'||c.isCooldown()===false);
}
function burstCast(r){
const now=Date.now();if(now<burst.nextAt){ST.lastReason='waiting_burst_gap';return;}
if(!nativeReady(r.c)){ST.lastReason='waiting_native_cooldown';return;}
if(r.c.isValidTarget?.()!==true){ST.lastReason='native_target_invalid';return;}
const ids=skillNames().map(x=>x.id).filter(id=>id>=1001&&id<=1008);
const group={serial:burst.serial+1,at:now,bossId:identity(r.c.target),scene:scene(),attempted:[],confirmed:[],matchedDamage:0};
burst.history.push(group);burst.active=group;
burst.dispatch=true;burst.nextAt=now+1000;
try{
for(const id of ids){
if(!castReady()||!eligible(r.c.target)||identity(r.c.target)!==group.bossId||scene()!==group.scene)break;
burst.desired=id;const selected=Number(r.s.selectSkill?.());
if(selected!==id)continue;
const before=ST.castAttempts;r.c.combat(id);
if(ST.castAttempts>before){group.attempted.push(id);ST.fastCasts++;}
}
}finally{burst.dispatch=false;burst.desired=null;burst.active=null;
if(!group.attempted.length){burst.history.pop();burst.nextAt=now+100;}
else{burst.serial++;if(burst.history.length>30)burst.history.shift();}}
ST.lastReason=group.attempted.length?'burst_dispatched':ST.casts.some(c=>!c.used&&c.targetId===identity(r.c.target)&&c.scene===scene())?'burst_waiting_results':'waiting_ready_tuyet_hoc';
}
function probeCast(r){const now=Date.now();if(basicProbe.startedAt===null)basicProbe.startedAt=now;
if(now<basicProbe.nextAt){ST.lastReason='basic_probe_wait';return;}
if(!nativeReady(r.c)){ST.lastReason='waiting_native_cooldown';return;}
if(r.c.isValidTarget?.()!==true){ST.lastReason='native_target_invalid';return;}
basicProbe.dispatch=true;basicProbe.nextAt=now+500;
try{const id=Number(r.s.selectSkill?.());if(isBasic(id))r.c.combat(id);else ST.lastReason='basic_probe_waiting_ready';}
finally{basicProbe.dispatch=false;}
}
function fastCast(r){
const pace=currentPace();
if(!castReady())return;
if(probeActive())return probeCast(r);
if(burst.enabled&&!transforming())return burstCast(r);
if(Date.now()-ST.lastInvocation<pace){ST.lastReason='waiting_pace';return;}
if(typeof r.c.isCooldown!=='function'){ST.lastReason='native_cooldown_unavailable';return;}
if(!nativeReady(r.c)){ST.lastReason=animationPlaying(r.c)?'waiting_native_animation':'waiting_native_cooldown';return;}
if(typeof r.c.isValidTarget!=='function'||r.c.isValidTarget()!==true){ST.lastReason='native_target_invalid';return;}
const skill=Number(r.s.selectSkill?.());
if(allowed(skill,Number(prop(r.c.target,'occ')),radius(r.a,r.c.target))){r.c.combat(skill);ST.fastCasts++;ST.lastReason='casting_native_skill';}
else ST.lastReason='waiting_ready_tuyet_hoc';
}
function onHit(source,marker,damage,flags,receiver){
if(!ST.running)return;hitDiagnostics.received++;
const reject=reason=>{hitDiagnostics.rejected[reason]=(hitDiagnostics.rejected[reason]||0)+1;
if(String(source)===actorId){hitDiagnostics.recent.push({at:Date.now(),reason,source:String(source),receiver:String(receiver),marker:Number(marker),damage:Number(damage),flags:Number(flags)});if(hitDiagnostics.recent.length>16)hitDiagnostics.recent.shift();}};
if(String(source)!==actorId){reject('foreign_source');return;}
if(String(receiver)!==identity(ST.target)){reject('wrong_receiver');return;}
if(!(Number(damage)>0)){reject('nonpositive_damage');return;}
const raw=Number(marker),id=raw/10000,fl=Number(flags)||0;
if(!Number.isSafeInteger(raw)||raw%10000){reject('unsupported_marker');return;}
if(!candidate(id)&&!isBasic(id)){reject('unsupported_skill');return;}
if(fl&(4|16|32|64|128|256)){reject('auxiliary_flags');return;}
const d=radius(role().a,ST.target);ST.lastHitDistance=d==null?null:+d.toFixed(2);
const closeBasic=id===8001&&mixed.hitQuota!==null&&towerFinish()&&canFight();if(!outside(d)&&!closeBasic){reject('hit_outside_trial_band');return;}
const t=Date.now();const cast=ST.casts.findLast?.(c=>!c.used&&c.targetId===identity(ST.target)&&c.scene===scene()&&c.occ===ST.targetOcc&&c.id===id&&t-c.time>=0&&t-c.time<=CFG.castTtlMs&&(outside(c.distance)||closeBasic&&c.finishBasic));
if(!cast){reject('no_matching_pending_cast');return;}hitDiagnostics.accepted++;
if(cast.basicTrial){tqFive?.hit?.(cast.serial,cast.distance,d,Number(damage));if(cast.mixedBasic&&id===8001&&mixed.hitQuota!==null){mixed.confirmedSinceTH++;mixed.wantBasic=mixed.confirmedSinceTH<mixed.hitQuota;}cast.used=true;if(cast.mixedBasic&&cast.serial===ST.castAttempts)ST.basicImpactSerial=cast.serial;const metric=stats(cast.occ,id);metric.hits++;metric.damage+=Number(damage);
if(cast.tailPhase&&tailStudy?.[cast.tailPhase]){tailStudy[cast.tailPhase].hits++;tailStudy[cast.tailPhase].damage+=Number(damage);}
const testRow=rangeTest?.rows.find(row=>row.id===id);
if(testRow&&testRow.attempts.some(a=>a.serial===cast.serial&&a.bossId===cast.targetId))testRow.hits.push({serial:cast.serial,bossId:cast.targetId,castDistance:cast.distance,hitDistance:d,damage:Number(damage)});
metrics?.result(cast.serial,true,damage);const result=cast.mixedBasic?mixed:basicProbe;result.hits++;result.damage+=Number(damage);if(cast.mixedBasic)mixed.suspended=false;
result.examples.push({id,bossId:cast.targetId,scene:cast.scene,castDistance:cast.distance,hitDistance:d,damage:Number(damage)});
if(result.examples.length>30)result.examples.shift();note('BASIC-CONFIRMED',result.examples.at(-1));return;}
cast.used=true;ST.confirmedPairs++;
if(cast.burstSerial!=null){const g=burst.history.find(x=>x.serial===cast.burstSerial);if(g){g.confirmed.push(id);g.matchedDamage+=Number(damage);}}
metrics?.result(cast.serial,true,damage);settle(cast,true);
const k=key(cast.occ,id),set=ST.proofs.get(k)||new Set();set.add(cast.serial);ST.proofs.set(k,set);
const observations=ST.evidence.get(k)||[];observations.push({castDistance:cast.distance,hitDistance:d});if(observations.length>100)observations.shift();ST.evidence.set(k,observations);
const metric=stats(cast.occ,id);metric.hits++;metric.damage+=Number(damage);
note('CONFIRMED',{id,castDistance:cast.distance,hitDistance:+d.toFixed(2),pairs:set.size});
}
function unlisten(){metrics?.close(ST.running?'target_changed':'stopped');if(ST.target){try{ST.target.off?.(1012,ST.owner,onHit);}catch(_){window.KVPV_V1?.diagnostics?.record(_);}}ST.target=null;ST.targetOcc=null;ST.targetKey=null;ST.casts=[];}
function listen(t){const targetKey=identity(t)+'/'+String(prop(t,'occ'))+'/'+scene();if(t===ST.target&&targetKey===ST.targetKey)return;unlisten();if(!eligible(t))return;ST.target=t;ST.targetKey=targetKey;ST.positionSample=null;ST.positionRetries=0;ST.positionOffset=0;ST.positionCommands=0;ST.positionPause=null;ST.positionRecovery=0;ST.arrivalSample=null;ST.arrivalSnap=false;ST.basicImpactSerial=null;ST.lastInvocation=-Infinity;ST.skillCursor=0;ST.moveGoal=null;ST.lastMove=-Infinity;ST.positioning=true;ST.lastOwnerPhase=null;burst.nextAt=0;if(basicProbe.context!==targetKey){mixed.primaryStreak=0;mixed.rotationCursor=0;mixed.wantBasic=mixed.primary&&(mixed.hitQuota===null||mixed.confirmedSinceTH<mixed.hitQuota);mixed.suspended=false;mixed.unconfirmed=0;mixed.ready.clear();hitDiagnostics.received=0;hitDiagnostics.accepted=0;hitDiagnostics.rejected={};hitDiagnostics.recent=[];mixed.attempts=0;mixed.hits=0;mixed.damage=0;mixed.examples=[];basicProbe.context=targetKey;basicProbe.attempts=0;basicProbe.hits=0;basicProbe.damage=0;basicProbe.startedAt=null;basicProbe.nextAt=0;}ST.targetOcc=Number(prop(t,'occ'));metrics?.open({key:targetKey,bossId:identity(t),occ:ST.targetOcc,scene:scene()});try{t.on?.(1012,ST.owner,onHit);}catch(e){ST.lastError='listen: '+String(e);}}
function selectBasic(native,selector,all,mode,occ,d){
const basicWait=tqFive?.active()?tqFive.wait():mixed.basicPaceMs,now=Date.now(),trial=(tqFive?.active()||mixed.enabled)&&basicWait!==null;
const rotation=rangeTest?.status==='running'?[]:basicRotation(),order=rotation.slice(mixed.rotationCursor).concat(rotation.slice(0,mixed.rotationCursor));
const rows=all.filter(row=>isBasic(row?.[0])&&(!mixed.primary||(rotation.length?rotation.includes(Number(row[0])):Number(row[0])===primaryBasicId()))&&allowed(Number(row[0]),occ,d)&&Number.isFinite(Number(row[1])))
.map(row=>{if(!trial)return row;const id=Number(row[0]),copy=row.slice();
if(!mixed.ready.has(id))mixed.ready.set(id,Number(row[1])<now?0:now+Math.min(basicWait,Math.max(0,Number(row[1])-now)));
copy[1]=mixed.ready.get(id);copy[2]=basicWait;return copy;})
.filter(row=>Number(row[1])<now)
.sort((a,b)=>rotation.length?order.indexOf(Number(a[0]))-order.indexOf(Number(b[0])):Number(stats(occ,Number(b[0])).hits>0)-Number(stats(occ,Number(a[0])).hits>0));
const id=Number(native.call(selector,rows,[],mode));
if(trial&&isBasic(id)){const picked=rows.find(row=>Number(row[0])===id);if(picked)mixed.ready.set(id,Math.max(now+basicWait,Number(picked[1])||0));}
return id;
}
function bind(r){W.KVPV_BASIC10?.release?.();if(ST.s?.obj===r.s&&ST.c?.obj===r.c&&r.s?._f7t===ST.s.fn&&r.c?.combat===ST.c.fn)return true;
if(ST.s?.obj===r.s&&ST.c?.obj===r.c){
if(r.s?._f7t===ST.s.fn&&r.c?.combat?.__KVPV_GUARD_PARENT===ST.c.fn)return true;
ST.lastError='Unexpected external skill/combat hook; refresh before resuming';return false;
}
unbind();
attachDispatch(r.a);
const s=hook(r.s,'_f7t',native=>function(active,common,mode){
if(tqFive?.active()&&ST.running&&this===r.s){
if(mode!==1||!eligible(r.c?.target)||!castReady()||!nativeReady(r.c)||Date.now()-ST.lastInvocation<currentPace())return -1;
const all=[...(Array.isArray(active)?active:[]),...(Array.isArray(common)?common:[])],occ=Number(prop(r.c.target,'occ')),d=radius(r.a,r.c.target);
const pickBasic=()=>selectBasic(native,this,all,mode,occ,d);
if(!tqFive.allowsTuyetHoc())return pickBasic();
const roster=skillNames().map(x=>x.id).filter(id=>id>=1001&&id<=1008),offset=roster.length?ST.skillCursor%roster.length:0,order=roster.slice(offset).concat(roster.slice(0,offset));
const pickTH=()=>Number(native.call(this,all.filter(row=>Number(row?.[0])>=1001&&Number(row?.[0])<=1008&&Number.isFinite(Number(row[1]))&&Number(row[1])<Date.now()&&allowed(Number(row[0]),occ,d)).sort((a,b)=>order.indexOf(Number(a[0]))-order.indexOf(Number(b[0]))),[],mode));
const first=mixed.wantBasic?pickBasic:pickTH,second=mixed.wantBasic?pickTH:pickBasic,id=first();return isBasic(id)||id>=1001&&id<=1008?id:second();
}
if(CFG.basicOnly&&ST.running&&this===r.s&&(W.KVPV_FAR_SCOPE??W.KVPV_TQ_SCOPE)?.inside?.()!==false){
if(!eligible(r.c?.target)||!(towerFinish()?canFight():castReady())||!nativeReady(r.c))return -1;
const rows=[...(Array.isArray(active)?active:[]),...(Array.isArray(common)?common:[])].filter(row=>Number(row?.[0])===8001);
return selectBasic(native,this,rows,mode,Number(prop(r.c.target,'occ')),radius(r.a,r.c.target));
}
if(ST.running&&this===r.s&&(W.KVPV_FAR_SCOPE??W.KVPV_TQ_SCOPE)?.inside?.()!==false&&Date.now()-ST.lastTHAt<CFG.afterTHWaitMs)return -1;
if(ST.running&&this===r.s&&towerFinish()&&canFight()){
const filter=rows=>Array.isArray(rows)?rows.filter(row=>isBasic(row?.[0])?selectedBasic(row[0]):mixed.hitQuota===null||Number(row[0])<1001||Number(row[0])>1008||mixed.confirmedSinceTH>=mixed.hitQuota):rows;
return native.call(this,filter(active),filter(common),mode);
}
if(ST.running&&this===r.s&&mode===2&&W.KVPV_TRANSFORM10&&(W.KVPV_FAR_SCOPE??W.KVPV_TQ_SCOPE)?.inside?.()!==false){
if(!eligible(r.c?.target)||!castReady()||!nativeReady(r.c)||((pacer||scopedCombat()||tqFive?.active())&&Date.now()-ST.lastInvocation<currentPace()))return -1;
const occ=Number(prop(r.c.target,'occ')),dist=radius(r.a,r.c.target);
const filter=rows=>(Array.isArray(rows)?rows:[]).filter(row=>allowed(Number(row?.[0]),occ,dist));
return W.KVPV_TRANSFORM10.select(native,this,filter(active),filter(common),mode);
}
if(!ST.running||this!==r.s||mode!==1||(W.KVPV_FAR_SCOPE??W.KVPV_TQ_SCOPE)?.inside?.()===false)return native.apply(this,arguments);
if(!eligible(r.c?.target)||!Array.isArray(active))return -1;
if(probeActive()&&!basicProbe.dispatch)return -1;
if(basicProbe.dispatch||mixed.enabled&&!mixed.suspended&&mixed.wantBasic&&(skillPriority==='interleaved'||rangeTest?.status==='running')){
if(!castReady()||!nativeReady(r.c))return -1;
const occ=Number(prop(r.c.target,'occ')),d=radius(r.a,r.c.target);
const picked=selectBasic(native,this,[...active,...(Array.isArray(common)?common:[])],mode,occ,d);
if(basicProbe.dispatch||isBasic(picked))return picked;
}
const dist=radius(r.a,r.c.target),occ=Number(prop(r.c.target,'occ'));
if(!castReady()||(!burst.dispatch&&!nativeReady(r.c))||!outside(dist)||((pacer||scopedCombat()||tqFive?.active())&&!burst.dispatch&&Date.now()-ST.lastInvocation<currentPace())){ST.skillWaits++;return -1;}
const filter=rows=>Array.isArray(rows)?rows.filter(x=>!isBasic(x?.[0])&&allowed(Number(x?.[0]),occ,dist)&&(!burst.dispatch||(Number(x[0])===burst.desired&&Number.isFinite(Number(x[1]))&&Number(x[1])<Date.now()))):[];
const roster=skillNames().map(x=>x.id),offset=roster.length?ST.skillCursor%roster.length:0;
const order=roster.slice(offset).concat(roster.slice(0,offset));
const tower=['LINH_LUNG','PHU_VAN','TRU_TIEN'].includes(W.KVPV_FAR_SCOPE?.status?.().kind),fairTurn=ST.castAttempts%4===0;
const score=id=>{const m=stats(occ,Number(id));return m.hits>=2?m.damage/m.hits:0;};
const ranked=rows=>filter(rows).sort((a,b)=>{
if((skillPriority==='tuyet_hoc_first'||tower&&!mixed.enabled)&&!fairTurn){const delta=score(b[0])-score(a[0]);if(delta)return delta;}
return order.indexOf(Number(a[0]))-order.indexOf(Number(b[0]));
});
const picked=Number(native.call(this,ranked(active),ranked(common),mode));
if(allowed(picked,occ,dist)){ST.seen.add(picked);return picked;}
if(mixed.enabled&&!mixed.suspended&&nativeReady(r.c)){
const basic=selectBasic(native,this,[...active,...(Array.isArray(common)?common:[])],mode,occ,dist);if(isBasic(basic))return basic;
}
ST.skillWaits++;return -1;
});
if(!s){ST.lastError='Selector hook unavailable';return false;}
const c=hook(r.c,'combat',native=>function(skillId){
if(CFG.basicOnly&&!tqFive?.active()&&ST.running&&this===r.c&&(W.KVPV_FAR_SCOPE??W.KVPV_TQ_SCOPE)?.inside?.()!==false&&Number(skillId)!==8001){ST.blocked++;return undefined;}
if(ST.running&&this===r.c&&(W.KVPV_FAR_SCOPE??W.KVPV_TQ_SCOPE)?.inside?.()!==false&&Date.now()-ST.lastTHAt<CFG.afterTHWaitMs){ST.blocked++;return;}
if(ST.running&&this===r.c&&(W.KVPV_FAR_SCOPE??W.KVPV_TQ_SCOPE)?.inside?.()!==false&&isBasic(skillId)&&!selectedBasic(skillId)){ST.blocked++;return undefined;}
if(ST.running&&this===r.c&&towerFinish()&&canFight()){
const id=Number(skillId);
if(mixed.hitQuota!==null){
if(id>=1001&&id<=1008&&mixed.confirmedSinceTH<mixed.hitQuota){ST.blocked++;return;}
if(id===8001){expire();if(ST.casts.some(c=>!c.used&&basicPendingBlocks(c)&&c.id===id&&c.targetId===identity(this.target)&&Date.now()-c.time<=CFG.castTtlMs)){ST.blocked++;return;}
ST.castAttempts++;mixed.attempts++;ST.casts.push({serial:ST.castAttempts,id,occ:Number(prop(this.target,'occ')),targetId:identity(this.target),scene:scene(),time:Date.now(),distance:radius(r.a,this.target),used:false,basicTrial:true,mixedBasic:true,finishBasic:true});}
}
return invokeNative(native,this,arguments);
}
if(ST.running&&this===r.c&&(W.KVPV_FAR_SCOPE??W.KVPV_TQ_SCOPE)?.inside?.()!==false){
const id=Number(skillId),occ=Number(prop(this.target,'occ')),d=radius(r.a,this.target);
if((probeActive()&&!basicProbe.dispatch)||!eligible(this.target)||!castReady()||(!burst.dispatch&&!nativeReady(this))||!allowed(id,occ,d)||!outside(d)||((pacer||scopedCombat()||tqFive?.active())&&!burst.dispatch&&Date.now()-ST.lastInvocation<currentPace())){ST.blocked++;return undefined;}
if(animationPlaying(this)&&basicTailReady())ST.basicTailReleases++;
ST.lastInvocation=Date.now();
const roster=skillNames().map(x=>x.id);if(!isBasic(id))ST.skillCursor=Math.max(0,roster.indexOf(id)+1);
if(mixed.enabled){const order=basicRotation();if(order.includes(id))mixed.rotationCursor=(order.indexOf(id)+1)%order.length;mixed.primaryStreak=isBasic(id)?mixed.primaryStreak+1:0;mixed.wantBasic=(mixed.primary?(rangeTest?.status==='running'||(mixed.hitQuota!==null?mixed.confirmedSinceTH<mixed.hitQuota:mixed.primaryStreak<basicQuota())):!isBasic(id))&&!mixed.suspended;if(isBasic(id))mixed.attempts++;}
expire();stats(occ,id).attempts++;if(basicProbe.dispatch){basicProbe.attempts++;ST.lastReason='basic_probe_cast';}
ST.castAttempts++;ST.casts.push({serial:ST.castAttempts,id,occ,targetId:identity(this.target),scene:scene(),time:Date.now(),distance:d,used:false,basicTrial:basicProbe.dispatch||mixed.enabled&&isBasic(id),mixedBasic:mixed.enabled&&isBasic(id),burstSerial:burst.active?.serial??null,tuningEligible:!isBasic(id)&&!basicProbe.dispatch&&!burst.dispatch&&!transforming()&&verified(occ,id)});
if(tqFive?.active()&&isBasic(id)){ST.casts.at(-1).basicTrial=true;ST.casts.at(-1).mixedBasic=true;tqFive.cast(ST.castAttempts,id,d);mixed.rotationCursor=(tqFive.ids().indexOf(id)+1)%tqFive.ids().length;}
if(tailStudy?.status==='running'&&[8001,8005].includes(id)){ST.casts.at(-1).tailPhase=tailStudy.phase;tailStudy[tailStudy.phase].casts++;}
if(rangeTest?.status==='running'&&rangeTest.rows[rangeTest.index]?.id===id)rangeTest.rows[rangeTest.index].attempts.push({serial:ST.castAttempts,bossId:identity(this.target),scene:scene(),occ,distance:d,at:Date.now()});
metrics?.cast(ST.castAttempts,id,currentPace());
if(ST.casts.length>250)ST.casts.splice(0,ST.casts.length-250);
}
return invokeNative(native,this,arguments);
});
if(!c){restore(s);ST.lastError='Combat hook unavailable';return false;}
ST.s=s;ST.c=c;
if(!guardMovement(r)){unbind();ST.lastError='Movement ownership unavailable';return false;}
return true;
}
function tick(){if(!ST.running)return;
tqFive?.tick();
advanceSpeedTrial();
ST.lastTickAt=Date.now();
const gap=W.KVPV_ACCOUNT_POLICY?.pollingGap?.()??(W.document?.hidden?Number(W.KVPV_ACCOUNT_POLICY?.config?.backgroundTickMs)||50:0);
if(gap>0){
const now=Date.now();
if(now-ST.lastBackgroundTick<gap)return;ST.lastBackgroundTick=now;
}
advanceTailStudy();
advanceRangeTest();
try{
if(!canFight()||!atPosition(role()))for(const c of ST.casts)if(!c.used){c.tuningEligible=false;c.metricsInterrupted=true;}
expire();
if(String(W._Ba?._rJ?._O$?.ins?.actorId??'')!==actorId||W.__KVPV_UNIVERSAL_HALTED){stop('actor changed');return;}
if((W.KVPV_FAR_SCOPE??W.KVPV_TQ_SCOPE)?.inside?.()===false){releaseOutsideScope();ST.lastReason='outside_tianquan_native_combat';return;}
const r=role();if(!r.a||!r.s||!r.c||!r.m){ST.lastReason='missing_components';return;}
const owner=combatOwner(),previousPhase=ST.lastOwnerPhase;
ST.lastOwnerPhase=owner?.phase??'OFF';
if(!bind(r)){ST.lastReason='hook_failed';return;}
if(!eligible(r.c.target)){unlisten();ST.lastReason='not_tianquan_boss';return;}
pacer?.context(identity(r.c.target)+'/'+String(prop(r.c.target,'occ'))+'/'+scene()+'/'+(transforming()?'transform':'native'));
const newPositionTarget=ST.target!==r.c.target||ST.targetKey!==identity(r.c.target)+'/'+String(prop(r.c.target,'occ'))+'/'+scene();
listen(r.c.target);
if(newPositionTarget&&((owner?.running&&owner.phase==='FIGHT'&&canFight())||
(!owner?.running&&W.KVPV_FAR_SCOPE?.status?.()?.kind==='THIEN_QUAN'&&W._Ba?._rJ?._O$?.ins?.isDead!==true))){
ST.ownMove=true;try{r.m.stop?.();}finally{ST.ownMove=false;}
}
if(towerFinish()&&canFight()){
ST.positioning=false;ST.moveGoal=null;ST.lastReason='dungeon_native_finish_2pct';
const targetKey=scene()+'/'+identity(r.c.target),a=loc(r.a),b=loc(r.c.target),d=radius(r.a,r.c.target);
const nativeRange=Number(W._ft?._tY?.ins?.getCfgById?.(Number(prop(r.c.target,'occ')))?.[3]);
if(ST.finishTarget!==targetKey&&a&&b&&d>0&&Number.isFinite(nativeRange)&&nativeRange>0){
ST.finishTarget=targetKey;
if(d>nativeRange*.8){
const goal=nativeRange*.8;
ST.ownMove=true;try{r.m.stop?.();r.m.moveTo(b.x+(a.x-b.x)/d*goal,b.y+(a.y-b.y)/d*goal);ST.moves++;}
finally{ST.ownMove=false;}
}
}
return;
}
ST.finishTarget=null;
const goal=targetDistance();
if(goal===null){ST.lastReason='waiting_verified_skill';return;}
if(goal<=CFG.min){ST.lastReason='goal_inside_boss_range';return;}
const hr=owner;
if(!hr?.running||hr.phase!=='FIGHT'){ST.basicImpactSerial=null;ST.positioning=false;ST.lastReason='hitrun_'+(hr?.phase||'off');return;}
if(!canFight()){ST.positioning=false;ST.lastReason='low_hp_or_disabled';return;}
if(previousPhase&&previousPhase!=='FIGHT'){
ST.ownMove=true;try{r.m.stop?.();}finally{ST.ownMove=false;}
ST.positionSample=null;ST.positionRetries=0;ST.positionOffset=0;ST.positionCommands=0;ST.positionPause=null;ST.positionRecovery=0;ST.arrivalSample=null;ST.arrivalSnap=false;ST.moveGoal=null;ST.lastMove=-Infinity;ST.positioning=true;if(previousPhase==='RETREAT')ST.resumes++;
if(previousPhase==='RETREAT')metrics?.resume();
note('RESUME',{from:previousPhase,bossId:identity(r.c.target),goal});
}
if(W.document?.hidden&&W.KVPV_ACCOUNT_POLICY?.config?.pauseWhenHidden===true){ST.lastReason='hidden_tab';return;}
const a=loc(r.a),b=loc(r.c.target),d=radius(r.a,r.c.target);
ST.lastDistance=d==null?null:+d.toFixed(2);
if(!a||!b||d==null){ST.lastReason='unknown_position';return;}
const snapCandidate=ST.mode==='SCAN'&&(ST.moveGoal||ST.arrivalSnap)&&outside(d)&&Math.abs(d-goal)<=CFG.tolerance+1;
if(!snapCandidate){ST.arrivalSample=null;ST.arrivalSnap=false;}
else{
const sample=ST.arrivalSample;
if(!sample||Math.hypot(a.x-sample.ax,a.y-sample.ay)>.25||Math.hypot(b.x-sample.bx,b.y-sample.by)>.25){
ST.arrivalSample={ax:a.x,ay:a.y,bx:b.x,by:b.y,at:Date.now()};ST.arrivalSnap=false;
}else if(!ST.arrivalSnap&&Date.now()-sample.at>=1000){
ST.arrivalSnap=true;note('NATIVE-ARRIVAL-SNAP',{distance:d,goal,extraTolerance:1});
}
}
if(atPosition(r)){
if(ST.positioning&&ST.moveGoal){ST.ownMove=true;try{r.m.stop?.();}finally{ST.ownMove=false;}}
ST.positioning=false;ST.moveGoal=null;ST.positionSample=null;ST.positionRetries=0;ST.positionOffset=0;ST.positionCommands=0;ST.positionPause=null;ST.positionRecovery=0;ST.lastReason='holding_far';fastCast(r);return;
}
ST.positioning=true;
if(ST.positionPause){
if(Math.hypot(b.x-ST.positionPause.x,b.y-ST.positionPause.y)<20&&Date.now()-ST.positionPause.at<8000){ST.lastReason=ST.positionPause.reason;return;}
ST.positionPause=null;ST.positionCommands=0;ST.positionRetries=0;ST.positionOffset=0;
ST.positionSample=null;ST.moveGoal=null;ST.lastMove=-Infinity;ST.positionRecovery++;
note('POSITION-RECOVERY',{cycle:ST.positionRecovery,distance:d});
}
if(ST.positionCommands>=24){
ST.ownMove=true;try{r.m.stop?.();}finally{ST.ownMove=false;}
ST.positionPause={x:b.x,y:b.y,at:Date.now(),reason:'position_oscillation_bounded'};ST.lastReason='position_oscillation_bounded';
note('POSITION-OSCILLATION-PAUSED',{distance:d,goal,commands:ST.positionCommands});return;
}
const progress=ST.positionSample;
if(!progress||Math.hypot(a.x-progress.ax,a.y-progress.ay)>.75||Math.hypot(b.x-progress.bx,b.y-progress.by)>.75)
ST.positionSample={ax:a.x,ay:a.y,bx:b.x,by:b.y,at:Date.now()};
else if(ST.moveGoal&&Date.now()-progress.at>=1800&&ST.positionRetries<6){
ST.positionRetries++;ST.positionOffset=d<goal?Math.min(32,ST.positionRetries*8):0;
ST.ownMove=true;try{r.m.stop?.();}finally{ST.ownMove=false;}
ST.lastMove=-Infinity;ST.moveGoal=null;ST.positionSample.at=Date.now();
note('POSITION-RETRY',{distance:d,goal,attempt:ST.positionRetries,waypointExtra:ST.positionOffset});
}
if(ST.positionRetries>=6&&ST.positionSample&&Date.now()-ST.positionSample.at>=1800){
if(ST.lastReason!=='position_stalled_bounded'){
ST.ownMove=true;try{r.m.stop?.();}finally{ST.ownMove=false;}
note('POSITION-PAUSED',{distance:d,goal,attempts:ST.positionRetries});
}
ST.positionPause={x:b.x,y:b.y,at:Date.now(),reason:'position_stalled_bounded'};ST.lastReason='position_stalled_bounded';return;
}
const ux=d>=1?(a.x-b.x)/d:1,uy=d>=1?(a.y-b.y)/d:0;
const recoveryAngle=ST.positionRecovery?(ST.positionRecovery%2?1:-1)*Math.min(90,Math.ceil(ST.positionRecovery/2)*30)*Math.PI/180:0;
const angle=recoveryAngle+(ST.positionRetries>=3?(ST.positionRetries%2?1:-1)*Math.min(30,(ST.positionRetries-2)*15)*Math.PI/180:0);
const waypointRadius=goal+ST.positionOffset;
const x=b.x+(ux*Math.cos(angle)-uy*Math.sin(angle))*waypointRadius,
y=b.y+(ux*Math.sin(angle)+uy*Math.cos(angle))*waypointRadius;
if(typeof r.m.running==='function'&&r.m.running()&&ST.moveGoal&&Date.now()-ST.lastMove<4500&&
Math.hypot(ST.moveGoal.x-x,ST.moveGoal.y-y)<15){ST.lastReason='positioning_in_progress';return;}
if(Date.now()-ST.lastMove<CFG.moveWaitMs){ST.lastReason='move_wait';return;}
if(typeof r.m.moveTo!=='function'){ST.lastReason='no_mover';return;}
ST.ownMove=true;try{r.m.moveTo(x,y);}finally{ST.ownMove=false;}
ST.moveGoal={x,y};ST.positionCommands++;ST.moves++;ST.lastMove=Date.now();ST.lastReason='positioning_far';
}catch(e){ST.lastError=String(e?.message||e);ST.lastReason='error';}
finally{metrics?.state(ST.lastReason,ST.lastOwnerPhase,currentPace(),pacer?.status()?.lastAction);}
}
function skillNames(){if(W.KVPV_TRANSFORM10?.transformed?.())return W.KVPV_TRANSFORM10.skills();const r=role();const rows=[r.s?._rtt,r.s?._wet].flatMap(x=>Array.isArray(x)?x:[]),ids=[...new Set(rows.map(x=>Number(x?.[0])).filter(candidate))];
return ids.map(id=>{let name='';try{const arr=W._Ba?._rJ?._O$?.ins?.skills||[];const level=Number(arr.find(x=>Number(x?.[0])===id)?.[1])||1;name=String(W._ft?._nY?.ins?.getCfgBySkillIdAndLv?.(id,level)?.[2]||'');}catch(_){window.KVPV_V1?.diagnostics?.record(_);}return {id,name};});}
function status(show=true){const occ=stageOcc(),ready=skillNames(),proved=ready.filter(x=>verified(occ,x.id)).map(x=>({...x,confirmations:ST.proofs.get(key(occ,x.id))?.size||0}));
const tqIds=tqFive?.active()?[...basicRotation(),...(tqFive.allowsTuyetHoc()?ready.filter(x=>x.id>=1001&&x.id<=1008).map(x=>x.id):[])]:null;
const ret={basicAnimationSpeed:CFG.basicAnimationSpeed,scaledBasicAnimations:ST.scaledBasicAnimations??0,basicSpeedTrial:speedTrial??W[speedKey]??null,basicOnly:tqFive?.active()?!tqFive.allowsTuyetHoc():CFG.basicOnly,playerSkillIds:tqFive?.active()?tqIds:CFG.basicOnly?[8001]:null,interleavedBasic:tqFive?.active()||mixed.enabled,basicProbeActive:ST.running&&probeActive(),version:'1.0.0',running:ST.running,operation:ST.mode,goalDistance:targetDistance()??CFG.goal,requestedDistance:CFG.goal,
requireDistanceGreaterThan:CFG.min,clientTrialRadius:CFG.max,
nativeTuyetHoc:ready,confirmedSkills:proved,confirmedOver300:proved.filter(x=>supportedDistance(occ,x.id)>300),
bossClientRange:bossRange(),minimumDistance:CFG.min,
skills:ready.map(x=>({...x,...stats(occ,x.id),verifiedDistance:supportedDistance(occ,x.id),verified:verified(occ,x.id)})),
afterTHWaitMs:CFG.afterTHWaitMs,basicHitQuota:mixed.hitQuota,confirmedSinceTH:mixed.confirmedSinceTH,thCycles:mixed.thCycles,primaryBasicEnabled:tqFive?.active()||mixed.primary,primaryBasicSkillId:primaryBasicId(),primaryBasicClientWaitMs:tqFive?.active()?tqFive.wait():mixed.basicPaceMs,primaryBasicNativeCooldown:!tqFive?.active()&&mixed.basicPaceMs===null,primaryBasicBurstBeforeSkill:basicQuota(),basicRotation:basicRotation(),
excludedBasicSkillIds:tqFive?.active()?[]:[...excludedBasics],tianQuanFiveBasics:tqFive?.report()??null,
confirmedTailStudy:W[tailStudyKey]??null,
confirmedBasicTailCut:confirmedTailCut,confirmedBasicTailCuts:confirmedTailCuts,
basicRangeTest:W[rangeTestKey]??null,
skillPriority:tqFive?.active()?(tqFive.allowsTuyetHoc()?'five_basics_plus_tuyet_hoc_10ms':'five_basics_10ms'):CFG.basicOnly?'basic8001':skillPriority==='tuyet_hoc_first'?'ready_tuyet_hoc_observed_damage_then_basic':mixed.enabled?(mixed.primary?(basicRotation().length?'native_basic_rotation_then_tuyet_hoc':'three_primary_basics_then_tuyet_hoc'):'alternating_native_rotation'):['LINH_LUNG','PHU_VAN','TRU_TIEN'].includes(W.KVPV_FAR_SCOPE?.status?.().kind)?'observed_damage_with_fair_rotation':'native_rotation',
eligibleSkillIds:tqFive?.active()?tqIds:ST.mode==='SCAN'?ready.map(x=>x.id):proved.map(x=>x.id),
lastDistance:ST.lastDistance,currentDistance:radius(role().a,role().c?.target),lastHitDistance:ST.lastHitDistance,
combatRunning:ST.running&&combatOwner()?.running===true,combatPhase:ST.running?combatOwner()?.phase:'OFF',
recoveryEnabled:true,finishBossHpPct:['LINH_LUNG','PHU_VAN','TRU_TIEN'].includes(W.KVPV_FAR_SCOPE?.status?.().kind)?2:null,combatOwner:combatOwner()?.owner??'HITRUN',
positionTolerance:CFG.tolerance,positionRetries:ST.positionRetries,positionWaypointExtra:ST.positionOffset,nativeArrivalSnap:ST.arrivalSnap,nativeArrivalExtraTolerance:ST.arrivalSnap?1:0,movementCommands:ST.moves,recoveryResumes:ST.resumes,hitrunPhase:ST.lastOwnerPhase,
positioning:ST.positioning,paceMs:currentPace(),adaptivePacing:pacer?.status()??null,fastCasts:ST.fastCasts,blockedNativeSteering:ST.blockedSteering,
castAttempts:ST.castAttempts,confirmedCastHitPairs:ST.confirmedPairs,blockedOtherSkills:ST.blocked,
lastReason:ST.lastReason,lastError:ST.lastError,
timerActive:ST.timer!=null,lastTickAt:ST.lastTickAt,tickAgeMs:ST.lastTickAt===null?null:Math.max(0,Date.now()-ST.lastTickAt),timerRepairs:ST.timerRepairs,
warning:proved.length===0?'No independently verified skill at this distance yet. STRICT will wait; use SCAN for real-game testing.':'Observed matching skill damage at tested distance; this does not guarantee safety from Boss attacks.'};
if(show){console.table(ready.map(x=>({...x,verified:verified(occ,x.id),pairs:ST.proofs.get(key(occ,x.id))?.size||0})));console.log(TAG,ret);}return ret;
}
function start(mode='STRICT'){if(mode!=='STRICT'&&mode!=='SCAN')throw Error('Use STRICT or SCAN');
if(String(W._Ba?._rJ?._O$?.ins?.actorId??'')!==actorId)throw Error('wrong actor');
if(CFG.goal>600)throw Error('Boss danger range exceeds the bounded far-skill trial');
W.KVPV_RANGE281?.setTrialRange?.(CFG.max);
ST.positionSample=null;ST.positionRetries=0;ST.positionOffset=0;ST.positionCommands=0;ST.positionPause=null;ST.positionRecovery=0;ST.mode=mode;ST.running=true;ST.positioning=true;ST.moveGoal=null;ST.lastMove=-Infinity;ST.lastOwnerPhase=null;ST.lastReason='starting';ST.lastError='';
if(ST.timer==null)ST.timer=(W.KVPV_V1?.timers?.setInterval ?? W.setInterval)(tick,CFG.scanMs);tick();return status(false);
}
function repairPolling(){
if(!ST.running||W.document?.hidden===true||W.__KVPV_UNIVERSAL_HALTED||
String(W._Ba?._rJ?._O$?.ins?.actorId??'')!==actorId)return false;
if(ST.timer!=null&&ST.lastTickAt!==null&&Date.now()-ST.lastTickAt<2500)return false;
if(ST.timer!=null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(ST.timer);
ST.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,CFG.scanMs);
ST.timerRepairs++;tick();return true;
}
function stop(reason='user'){tqFive?.stop(reason);const ownPositioning=ST.positioning&&ST.moveGoal,r=role();ST.running=false;ST.mode='OFF';if(ST.timer!=null){(W.KVPV_V1?.timers?.clearInterval ?? W.clearInterval)(ST.timer);ST.timer=null;}
finishSpeedTrial('stopped');if(speedTrial)speedTrial.restored=true;
restoreSpeedClips();
if(!/^(Chuyển Boss|Đổi phạm vi|Chuyển combat mode|Chết: chờ|Rời Thiên Quan)/.test(reason)){finishRangeTest('stopped: '+reason);finishTailStudy('stopped: '+reason);}
if(ST.c && ST.c.obj?.combat?.__KVPV_GUARD_PARENT===ST.c.fn)W.KVPV_HITRUN1?.stop?.('Release guarded far-skill hook');
unbind();unlisten();if(ownPositioning)r.m?.stop?.();ST.moveGoal=null;ST.lastReason=reason;return status(false);}
function report(){expire();return {hitDiagnostics:JSON.parse(JSON.stringify(hitDiagnostics)),nativeCombat:{dispatch:{observed:!!dispatch.actor,calls:dispatch.calls,signals:dispatch.signals,silent:dispatch.silent,recent:dispatch.recent.slice()},targetId:identity(role().c?.target),trackedTargetId:identity(ST.target),internalTargetId:identity(role().c?._wft),selectorOwned:role().s?._f7t===ST.s?.fn,combatOwned:role().c?.combat===ST.c?.fn||role().c?.combat?.__KVPV_GUARD_PARENT===ST.c?.fn,cooldown:role().c?.isCooldown?.()??null,animationPlaying:animationPlaying(role().c)},interleaved:{enabled:tqFive?.active()||mixed.enabled,basicClientWaitMs:tqFive?.active()?tqFive.wait():mixed.basicPaceMs,basicSuspended:mixed.suspended,basicUnconfirmed:mixed.unconfirmed,nativeAnimationGate:true,scanMs:CFG.scanMs,nextPreferred:mixed.wantBasic?'basic':'tuyet_hoc',basicAttempts:mixed.attempts,basicConfirmedHits:mixed.hits,confirmedHitTailRelease:true,basicTailReleases:ST.basicTailReleases,basicMatchedDamage:mixed.damage,examples:mixed.examples.map(x=>({...x}))},basicProbe:{enabled:basicProbe.enabled,active:probeActive(),context:basicProbe.context,attempts:basicProbe.attempts,confirmedHits:basicProbe.hits,matchedDamage:basicProbe.damage,maxAttempts:8,maxDurationMs:15000,examples:basicProbe.examples.map(x=>({...x})),note:'Direct basic cast-hit pairs only at the measured distance. No hit confirmation does not prove a server range limit.'},burst:{enabled:burst.enabled,experimental:true,minBatchGapMs:1000,maxSkillsPerBatch:8,resultWaitScope:'per_skill',
batches:JSON.parse(JSON.stringify(burst.history)),note:'Client calls in one JS turn; matched damage is required for each skill. Not guaranteed simultaneous server execution. Native per-skill readiness is preserved.'},performance:metrics?.report()??null,build:W.KVPV_V1?.build??null,controllerBuild:typeof __KVPV_V1_BUILD==='undefined'?null:__KVPV_V1_BUILD,...status(false),history:ST.history.slice(),
scope:W.KVPV_FAR_SCOPE?.status?.()??null,interpretation:'attempts are client combat calls; only matched damage confirms a hit. Unconfirmed does not prove a server range limit.'};}
function setDistance(value){const d=Number(value);if(!Number.isFinite(d)||d<=280||d>600)throw Error('Distance must be in (280,600]');
W.KVPV_RANGE281?.setTrialRange?.(d+10);CFG.goal=d;CFG.min=d===300?295:d>300?300:280;CFG.max=d+10;
ST.lastMove=-Infinity;ST.moveGoal=null;ST.positioning=true;if(ST.running)tick();return status(false);}
function performance(){const p=metrics?.report()??null;console.table(p?.current?.skills??[]);console.log(TAG,p);return p;}
function setBurst(enabled=true){burst.enabled=!!enabled;if(burst.enabled){mixed.enabled=false;basicProbe.enabled=false;}burst.nextAt=0;return {enabled:burst.enabled,experimental:true,maps:['THIEN_QUAN','LINH_LUNG','PHU_VAN','TRU_TIEN']};}
function setBasicProbe(enabled=true){basicProbe.enabled=!!enabled;if(basicProbe.enabled){mixed.enabled=false;burst.enabled=false;}basicProbe.attempts=0;basicProbe.hits=0;basicProbe.damage=0;basicProbe.startedAt=null;basicProbe.nextAt=0;return {enabled:basicProbe.enabled,maxAttempts:8,maxDurationMs:15000};}
function setInterleaved(enabled=true,distance=302){mixed.enabled=!!enabled;mixed.wantBasic=false;mixed.suspended=false;mixed.unconfirmed=0;
if(mixed.enabled){burst.enabled=false;basicProbe.enabled=false;setDistance(distance);}
return {enabled:mixed.enabled,distance:CFG.goal,burst:burst.enabled,basicProbe:basicProbe.enabled};}
function setBasicPace(value=1){if(value===null){mixed.basicPaceMs=null;mixed.ready.clear();return {enabled:false};}
const n=Number(value);if(!Number.isFinite(n)||n<0||n>1000)throw Error('Basic client wait must be 0..1000 ms');
mixed.basicPaceMs=n;mixed.ready.clear();return {enabled:true,clientWaitMs:n,nativeAnimationGate:true};}
function setPrimaryBasic(enabled=true){mixed.primary=!!enabled;mixed.primaryStreak=0;mixed.wantBasic=mixed.primary&&!mixed.suspended;mixed.ready.clear();return {enabled:mixed.primary,skillId:primaryBasicId(),clientWaitMs:mixed.basicPaceMs,nativeCombatGate:true};}
function setAfterTHWait(value=1){if(!Number.isFinite(value)||value<0||value>1000)throw Error('TH wait must be 0..1000 ms');CFG.afterTHWaitMs=value;return value;}
function setBasicHitQuota(value=null){if(value!==null&&(!Number.isSafeInteger(value)||value<1))throw Error('Hit quota must be a positive integer');mixed.hitQuota=value;mixed.confirmedSinceTH=0;mixed.thCycles=0;mixed.wantBasic=mixed.primary;return value;}
function setBasicRotation(ids=[]){if(!Array.isArray(ids)||ids.some(id=>!isBasic(id)||excludedBasics.has(id)))throw Error('Rotation requires allowed native basic IDs');mixed.rotation=[...new Set(ids)];mixed.rotationCursor=0;mixed.primaryStreak=0;mixed.wantBasic=mixed.primary&&!mixed.suspended;return basicRotation();}
function releaseOutsideScope(){if((W.KVPV_FAR_SCOPE??W.KVPV_TQ_SCOPE)?.inside?.()!==false)return false;
if(!ST.s&&!ST.c&&!ST.target&&!ST.movement.length)return true;
if(ST.c&&ST.c.obj?.combat?.__KVPV_GUARD_PARENT===ST.c.fn)W.KVPV_HITRUN1?.stop?.('Leave far-map hook ownership');
unbind();unlisten();ST.moveGoal=null;return true;
}
function setBasicOnly(enabled=true){CFG.basicOnly=!!enabled;CFG.scanMs=enabled?1:8;
if(enabled){mixed.enabled=true;mixed.primary=true;mixed.rotation=[8001];mixed.rotationCursor=0;mixed.wantBasic=true;mixed.basicPaceMs=0;mixed.ready.clear();burst.enabled=false;basicProbe.enabled=false;CFG.clientPaceMs=0;}
if(ST.timer!==null){(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(ST.timer);ST.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,CFG.scanMs);}
return {enabled:CFG.basicOnly,skillId:8001,scanMs:CFG.scanMs,addedClientWaitMs:CFG.clientPaceMs,serverMultiplierVerified:false};}
function setBasicAnimationSpeed(factor=1){if(![1,9,99,99999].includes(factor))throw Error('Native animation factor must be 1, 9 or 99');finishSpeedTrial('stopped');restoreSpeedClips();CFG.basicAnimationSpeed=factor;return {factor,scope:['THIEN_QUAN','LINH_LUNG','PHU_VAN','TRU_TIEN'],playerSkillId:8001,serverDamageMultiplierVerified:false};}
function setTianQuanFiveBasics(enabled=true,wait=10){if(!tqFive)throw Error('Thiếu module đo năm chiêu tay.');const out=tqFive.configure(enabled,wait);mixed.ready.clear();mixed.rotationCursor=0;if(ST.timer!==null){(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(ST.timer);ST.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,CFG.scanMs);}return out;}
function setTianQuanTuyetHoc(enabled=true){if(!tqFive)throw Error('Thiếu module combo Thiên Quan.');return tqFive.setTuyetHoc(enabled);}
function startTianQuanBasicRangeTest(distances){if(!ST.running)throw Error('Chờ bộ đánh Thiên Quan chạy trước.');if(!tqFive)throw Error('Thiếu module đo tầm.');const out=tqFive.start(distances);ST.moveGoal=null;ST.positioning=true;ST.lastMove=-Infinity;mixed.ready.clear();mixed.rotationCursor=0;return out;}
function stopTianQuanBasicRangeTest(){const out=tqFive?.stop('manual stop');ST.moveGoal=null;ST.positioning=true;ST.lastMove=-Infinity;return out;}
function setSkillPriority(value='tuyet_hoc_first'){
if(!['tuyet_hoc_first','interleaved'].includes(value))throw Error('Skill priority must be tuyet_hoc_first or interleaved');
skillPriority=value;return {skillPriority};
}
const api={basicRangeProbeGoal:()=>tqFive?.goal()??null,setTianQuanTuyetHoc,setTianQuanFiveBasics,startTianQuanBasicRangeTest,stopTianQuanBasicRangeTest,rangeReport:()=>tqFive?.report()??null,setSkillPriority,setBasicAnimationSpeed,startBasicSpeedTrial,setBasicOnly,isBasicOnly:()=>tqFive?.active()?!tqFive.allowsTuyetHoc():CFG.basicOnly,releaseOutsideScope,setClientPace,setConfirmedTailCut,startConfirmedTailStudy,startBasicRangeTest,setAfterTHWait,setBasicHitQuota,setBasicRotation,setPrimaryBasic,setBasicPace,setInterleaved,setBasicProbe,setBurst,performance,version:'1.0.0',start,stop,status,report,setDistance,repairPolling,sync:tick,export:()=>JSON.stringify(report(),null,2),history:()=>ST.history.slice()};
W.KVPV_TH300=api;
console.info(TAG,'READY/OFF. START: KVPV_MODE.start("BOSS_TH300_SCAN") then KVPV_MODE.start("BOSS_TH300")');
})();
window.KVPV_TH300.setBasicOnly(false);window.KVPV_TH300.setInterleaved(true,302);window.KVPV_TH300.setBasicHitQuota(null);window.KVPV_TH300.setTianQuanFiveBasics(true,10);window.KVPV_TH300.setTianQuanTuyetHoc(true);window.KVPV_MODE.armTianQuan();console.info('[KVPV] Thiên Quan: 5 chiêu tay xen Tuyệt Học đã hồi, wait 10ms.');
})();
