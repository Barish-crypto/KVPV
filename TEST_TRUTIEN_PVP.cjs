'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const script=fs.readFileSync(__dirname+'/src/76-trutien-pvp.js','utf8');
const buildSource=fs.readFileSync(__dirname+'/build.cjs','utf8');
assert(buildSource.includes('"75-pvp-luofeng.js"')&&!buildSource.includes('"76-trutien-pvp.js"'),'native combat keeps the passive observer and removes the custom player skill sender');
const actorId='10228867268946';
function setup(){
 let time=100000,kind='TRU_TIEN',sc='2692',mode='BOSS_TH300_SCAN',bossRunning=true,hitrun=true,focus=true,
     cooldown=false,range=true,valid=true,job=null,dead=false,playing=true,selected;
 class Clock extends Date{static now(){return time;}}
 class Emitter{
   constructor(id,type){this.id=id;this.isValid=true;this.type=type;this.hpNow=100;this.listeners=new Map();this.point={x:id===actorId?220:0,y:0};}
   property={get:k=>({id:this.id,type:this.type,hp:[this.hpNow,100],position:this.point})[k]};
   on(k,owner,fn){this.listeners.set(k,fn);}
   off(k,owner,fn){if(this.listeners.get(k)===fn)this.listeners.delete(k);}
   emit(k,...args){this.listeners.get(k)?.(...args);}
 }
 const me=new Emitter(actorId,4),enemy=new Emitter('other-player',4),enemy2=new Emitter('other-player-2',4),monster=new Emitter('monster',1);
 const pet=new Emitter('pet',2),fuwa=new Emitter('fuwa',9),ride=new Emitter('ride',7);
 const contexts={petContext:pet,fuwaContext:fuwa,rideContext:ride};
 const meNativeGet=me.property.get;me.property.get=k=>contexts[k]??meNativeGet(k);
 const companionCalls=[],companionCasts=[['pet',pet,8012],['fuwa',fuwa,5611],['ride',ride,3832]];
 let companionPvPValid=true;
 const companionMethods=new Map();
 const rows=[[8001,0,50],[1001,0,200],[1002,0,200],[8002,0,50],[8005,0,100]],calls=[],timers=new Map(),remote=[];
 selected=enemy;
 const moveCalls=[],movement={running:()=>false,moveTo(x,y){moveCalls.push({x,y});}};
 const visuals=[],avatar={getActionTween(action,reset,timeScale){visuals.push({action,timeScale});return {};}};
 const nativeGetActionTween=avatar.getActionTween;
 const combat={get target(){return selected;},_jh:{get isPlaying(){return playing;}},_Qrt:avatar,
   _mvt:skill=>[null,null,null,null,null,'attack'],
   isCooldown:()=>cooldown,isValidTarget:()=>valid,isValidRange:()=>range,
   combat(skill){calls.push(skill);avatar.getActionTween('attack',false,1);me.emit(1039,selected.id,skill);selected.emit(1012,actorId,skill*10000,50,1,selected.id);}
 };
 const selector={_rtt:rows,_wet:[],_f7t(active,common,mode){assert.equal(mode,1);
   const row=[...active,...common].find(x=>x[1]<time);
   if(!row)return -1;row[1]=time+row[2];return row[0];}};
 function C(){}function S(){}function M(){}
 me.getComponent=k=>k===C?combat:k===S?selector:k===M?movement:null;
 for(const [key,ctx,skill] of companionCasts){
   let target=null,until=-Infinity;
   const nativeComp={
     get target(){return target;},isCooldown:()=>false,
     setTarget(t,kind){target=t;},
     isValidTarget:()=>companionPvPValid,
     isValidRange:()=>true,
     combat(id,v,kind){companionCalls.push({key,skill:id,kind,target:target?.id});}
   };
   const nativeSelector={selectSkill(){if(time<until)return -1;until=time+110;return skill;}};
   ctx.getComponent=k=>k===C?nativeComp:k===S?nativeSelector:null;
   companionMethods.set(key,nativeComp);
 }
 const pvp={start(o){remote.push(['start',o.autoDodge]);return{enabled:true};},stop(){remote.push(['stop']);},sync(){},status:()=>({enabled:remote.some(x=>x[0]==='start')})};
 const W={__KVPV_OWN_ACTOR_ID:actorId,_Ba:{_rJ:{_O$:{ins:{actorId,get isDead(){return dead;}}}},_Jtt:{_ant:{ins:{getCfgById:key=>{const v=new Array(16).fill(0);v[15]=key===5611*10000+1?1:0;return v;}}}}},
   _C:{_Ba:{instance:{getRole:()=>me}},_Mn:{_Cn:{get currentID(){return sc;}}}},
   _d:{_Yct:{_Het:C,_Eet:S,_zet:M}},_BaV1:null,KVPV_FAR_SCOPE:{status:()=>({inside:kind==='TRU_TIEN',kind})},
   KVPV_MODE:{status:()=>({mode}),stop(){mode='OFF';bossRunning=false;hitrun=false;}},
   KVPV_TH300:{status:()=>({running:bossRunning})},KVPV_HITRUN1:{status:()=>({running:hitrun})},
   KVPV_DAILY:{quickState:()=>({job})},
   KVPV_PVP_LUOFENG:pvp,
   document:{hidden:false,hasFocus:()=>focus},
   setInterval(fn,ms){assert([10,120].includes(ms),'only known 10ms/120ms timers');const id=timers.size+1;timers.set(id,fn);return id;},
   clearInterval(id){timers.delete(id);}};
 vm.runInNewContext(script,{window:W,Date:Clock,console},{timeout:3000});
 return {W,api:W.KVPV_TRUTIEN_PVP,Clock,combat,calls,rows,visuals,avatar,nativeGetActionTween,enemy,enemy2,monster,remote,timers,moveCalls,companionCalls,companionMethods,
   tick:()=>{time+=10;for(const fn of timers.values())fn();},advance:ms=>{time+=ms;for(const fn of timers.values())fn();},
   setKind:v=>kind=v,setScene:v=>sc=v,setTarget:v=>selected=v,
   setCd:v=>cooldown=v,setFocus:v=>focus=v,setRange:v=>range=v,setValid:v=>valid=v,
   setJob:v=>job=v,setDead:v=>dead=v,setPlaying:v=>playing=v,setCompanionPvPValid:v=>companionPvPValid=v};
}
{
 const q=setup();
 assert.equal(q.api.status().enabled,false);
 q.setTarget(q.monster);
 const pending=q.api.start({autoDodge:false});
 assert.equal(pending.enabled,true,'arm inside Tru Tien even without player target');
 assert.equal(pending.reason,'waiting_player_target');
 assert.equal(q.W.KVPV_MODE.status().mode,'OFF','explicit manual start releases PvE owner');
 q.tick();assert.equal(q.calls.length,0,'never cast basic on native monster target');
 q.setTarget(q.enemy);
 const s=q.api.start({autoDodge:true});
 assert.equal(q.W.KVPV_MODE.status().mode,'OFF','explicit start releases old boss owner to prevent monster target reacquire');
 assert.equal(s.enabled,true);assert.equal(s.autoDodge,true);assert.equal(q.timers.size,1);
 q.tick();assert.equal(q.calls[0],8005,'basic-only chooses 8005 first');
 q.tick();assert.equal(q.calls[1],8002,'next ready native basic 8002');
 q.tick();assert.equal(q.calls[2],8001,'next ready native basic 8001');
 q.tick();assert.equal(q.calls.length,3,'never inject TH when basics cooling down');
 assert.deepEqual(q.calls,[8005,8002,8001]);
 assert.equal(q.api.status().thAttempts,0,'outgoing TH is fully disabled');
 assert.equal(q.api.status().basicAttempts,3);
 assert.equal(q.api.status().paceMs,10);
 assert.equal(q.api.status().focusTargetId,q.enemy.id);
 assert.equal(q.api.status().observedSkills.length,3);
 assert.deepEqual(Array.from(q.api.status().skillIds.th),[],'TH skill list is empty');
 assert(q.calls.every(x=>x>=8001&&x<=8005),'only 8001-8005 dispatched');
 assert.equal(q.visuals.length,3);
 assert(q.visuals.every(x=>x.timeScale===9999),'each synchronous native basic animation runs at visual x9999');
 assert.equal(q.avatar.getActionTween,q.nativeGetActionTween,'native animation method is restored after each cast');
 assert.equal(q.api.status().visual.applied,3);
 q.api.setVisualSpeed(1);
 q.advance(200);assert.equal(q.visuals.at(-1).timeScale,1,'visual-only acceleration has opt-out');
 q.api.setVisualSpeed(9999);
 assert.equal(q.api.status().visual.factor,9999);
 assert.deepEqual(q.rows.map(row=>row[2]),[50,200,200,50,100],'native per-skill cooldown durations unchanged');
 q.setCd(true);const cdBefore=q.calls.length;q.advance(1000);assert.equal(q.calls.length,cdBefore,'native cooldown blocks');
 q.setCd(false);q.setRange(false);q.tick();assert.equal(q.calls.length,cdBefore,'native range blocks');
 q.setRange(true);q.setValid(false);q.tick();assert.equal(q.calls.length,cdBefore,'native target validation blocks');
 q.setValid(true);q.setPlaying(true);q.tick();assert(q.calls.length>cdBefore,'skip visual animation waiting when native cooldown/target/range ready');
 const beforeFocus=q.calls.length;
 q.setTarget(q.enemy2);q.tick();
 assert.equal(q.calls.length,beforeFocus,'focus-lock prevents splitting attacks across live opponents');
 assert.equal(q.api.status().reason,'focus_locked_switch_manual');
 assert.equal(q.api.status().focusTargetId,q.enemy.id);
 q.api.setFocusToSelected();q.advance(200);
 assert.equal(q.api.status().focusTargetId,q.enemy2.id,'operator may deliberately focus second player');
 assert.equal(q.api.status().observedSkills.length,1,'damage ranking resets per PvP target');
 assert(q.calls.length>beforeFocus,'can attack focused second enemy');
 q.setTarget(q.monster);q.tick();assert.equal(q.api.status().reason,'waiting_player_target','never casts on monsters');
 q.setTarget(q.enemy);q.setFocus(false);const before=q.calls.length;q.tick();assert.equal(q.calls.length,before,'background/unfocused blocks');
 q.setFocus(true);q.setJob('quest');q.tick();assert.equal(q.calls.length,before,'daily job priority');
 q.setJob(null);q.setDead(true);q.tick();assert.equal(q.calls.length,before,'dead player cannot attack');
 q.setDead(false);q.setKind('OUTSIDE');q.tick();assert.equal(q.api.status().enabled,false,'exit disables mode');
 assert.equal(q.timers.size,0);assert.equal(q.enemy.listeners.size,0,'listeners cleaned up');
 assert(q.remote.some(x=>x[0]==='stop'),'stops La Phong PvP observer');
}
{
 const q=setup();q.setKind('OUTSIDE');assert.throws(()=>q.api.start(),/verified Tru Tien/);
 assert.equal(q.W.KVPV_MODE.status().mode,'BOSS_TH300_SCAN','invalid scope leaves old mode untouched');
 q.setKind('TRU_TIEN');q.setTarget(q.enemy);q.api.start({autoDodge:false});
 q.tick();const before=q.calls.length;q.setScene('2691');q.tick();
 assert.equal(q.api.status().enabled,false,'scene change stops and unbinds');assert.equal(q.calls.length,before);
}
{
 const q=setup();
 const realPvp=fs.readFileSync(__dirname+'/src/75-pvp-luofeng.js','utf8');
 vm.runInNewContext(realPvp,{window:q.W,Date:q.Clock,console},{timeout:3000});
 q.api.start({autoDodge:true});
 assert.equal(q.W.KVPV_PVP_LUOFENG.status().attached,true,'real PR2 module attaches to actual type4 enemy in Tru Tien');
 q.enemy.emit(1039,actorId,1001);
 assert.equal(q.W.KVPV_PVP_LUOFENG.status().observedTH,1,'real enemy TH signal parsed');
 assert.equal(q.moveCalls.length,1,'real module native dodge issued while Tru Tien mode owns combat');
 q.api.stop();
 assert.equal(q.timers.size,0,'both 10ms attack and 120ms dodge observer timers cleaned');
 assert.equal(q.enemy.listeners.size,0,'all native opponent listeners released');
}
{
 const q=setup();
 q.api.start({autoDodge:false});
 q.tick();
 q.setTarget(q.enemy2);
 const before=q.calls.length;
 q.tick();
 assert.equal(q.calls.length,before,'do not distribute casts to second opponent while first is alive');
 q.enemy.hpNow=0;
 q.tick();
 assert.equal(q.api.status().focusTargetId,q.enemy2.id,'automatically hand focus to user-selected second opponent after first dies');
 assert(q.calls.length>before,'continue pressure on second opponent without restarting module');
 q.api.stop();
}
{
 const q=setup();
 q.api.start({autoDodge:false,focusLock:false});
 q.tick();
 q.setTarget(q.enemy2);
 const old=q.calls.length;
 q.tick();
 assert(q.calls.length>old,'optional unlocked mode permits user-directed target switching');
 q.api.stop();
}
{
 // Tian Quan's pet/fuwa/ride native skills are also tested in PvP,
 // without changing the main character's cooldown or bypassing a rejected player target.
 const q=setup();
 q.api.start({autoDodge:false});
 q.tick();
 // Normalize VM-realm arrays before Node's strict structural comparison.
 assert.deepEqual(Array.from(q.api.status().tqSkillProfile.requested),[8001,8002,8003,8004,8005]);
 assert.equal(q.companionCalls.length,3,'all three Tian Quan native companions dispatched once');
 assert.deepEqual({...q.api.status().companions.attempts},{pet:1,fuwa:1,ride:1});
 assert(q.companionCalls.some(x=>x.key==='pet'&&x.skill===8012&&x.target===q.enemy.id));
 assert(q.companionCalls.some(x=>x.key==='fuwa'&&x.skill===5611&&x.target===actorId),'native self buff targets player owner');
 assert(q.companionCalls.some(x=>x.key==='ride'&&x.skill===3832&&x.target===q.enemy.id));
 q.tick();assert.equal(q.companionCalls.length,3,'no more than once per native 50ms scanning interval');
 q.setCd(true);q.advance(60);
 assert.equal(q.api.status().companions.enabled,true);
 assert.equal(q.companionCalls.length,3,'companion native per-skill selector still honors its cooldown rows');
 q.advance(60);assert.equal(q.companionCalls.length,6,'companions continue independently while owner cooldown is active');
 const before=q.companionCalls.length;
 q.setCompanionPvPValid(false);q.advance(130);
 assert.equal(q.companionCalls.length,before,'native rejection of PvP player stops companion dispatch');
 assert(q.api.status().companions.blocked>=3,'native PvP rejection visible in diagnosis');
 q.api.stop();
}
{
 const q=setup();
 q.api.start({autoDodge:false,companions:false});
 q.tick();
 assert.equal(q.companionCalls.length,0,'opt-out disables companions without blocking main skill rotation');
 assert.equal(q.api.status().companions.enabled,false);
 q.api.stop();
}
{
 const q=setup();q.setTarget(null);
 const pending=q.api.start({autoDodge:false,companions:false});
 assert.equal(pending.enabled,true,'allow one-click arming with no target');
 assert.equal(pending.reason,'waiting_player_target');
 q.tick();assert.equal(q.calls.length,0,'no phantom basic before player selected');
 q.setTarget(q.enemy);q.tick();assert.equal(q.calls[0],8005,'begin native basic after manual player selection');
 q.api.stop();
 assert.equal(q.avatar.getActionTween,q.nativeGetActionTween,'no persistent animation override');
}
{
 const q=setup();q.api.start({autoDodge:false,companions:false});
 q.combat.combat=function(){throw Error('simulated native cast failure');};
 q.tick();
 assert.equal(q.api.status().reason,'error','native errors are recorded without forcing casts');
 assert.equal(q.avatar.getActionTween,q.nativeGetActionTween,'visual wrapper restored even if combat throws');
 q.api.stop();
}
{
 const q=setup();q.api.start({autoDodge:false,companions:false});
 q.api.setVisualSpeed(9999);
 q.setKind('OUTSIDE');q.tick();
 assert.equal(q.api.status().enabled,false,'Tru Tien scope exit stops spam');
 assert.equal(q.visuals.length,0,'outside Tru Tien never accelerates native clips');
 q.api.stop();
}
{
 const q=setup();q.api.start({autoDodge:false,companions:false});
 assert.throws(()=>q.api.setVisualSpeed(99999),/speed must be/);
 assert.equal(q.api.status().visual.factor,9999,'unsupported factor rejected without mutation');
 q.api.stop();
}
console.log('PASS Tru Tien PvP: native 8001-8005 basic-only spam with scoped x9999 visual, target arming, cooldown/range, companions and cleanup.');
