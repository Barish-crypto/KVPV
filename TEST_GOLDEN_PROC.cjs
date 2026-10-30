'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const src=fs.readFileSync(__dirname+'/src/32-golden-proc-observer.js','utf8');
let time=Date.parse('2026-10-31T04:00:00Z');
class Clock extends Date{constructor(...a){super(...(a.length?a:[time]));}static now(){return time;}}
function emitter(){
 const subs=new Map();
 return {on(key,owner,fn){const s=subs.get(key)||[];s.push({owner,fn});subs.set(key,s);},
   off(key,owner,fn){subs.set(key,(subs.get(key)||[]).filter(x=>x.owner!==owner||x.fn!==fn));},
   emit(key,...a){for(const x of [...(subs.get(key)||[])])x.fn(...a);},
   count(key){return (subs.get(key)||[]).length;}};
}
function env(){
 time=Date.parse('2026-10-31T04:00:00Z');
 const actor='12345',nativeRecords={
  '3021/2':[30210002,3021,0,2,0,0,30000,0,[],['8% Bát Hoang']],
  '3031/2':[30310002,3031,0,2,0,0,30000,0,[],['8% Xá Mệnh']]
 };
 let activeActor=actor,scene=2996,currentBuffs=[['Golden',1]];
 const meE=emitter(),buffE=emitter();
 const property={get(k){return k==='buffs'?currentBuffs:null;},on:buffE.on,off:buffE.off,emit:buffE.emit,count:buffE.count};
 const spawnTarget=(id='boss123')=>{
  const t=emitter();let hp=100;
  return Object.assign(t,{isValid:true,property:{get(k){
    return {type:1,id,hp:[hp,100],name:'Monster '+id}[k];
   }},setHP:v=>{hp=v;}});
 };
 const target=spawnTarget();
 const combat={target};
 Object.assign(meE,{property,getComponent:()=>combat});
 const w={__KVPV_OWN_ACTOR_ID:actor,
  _Ba:{_rJ:{_O$:{ins:{get actorId(){return activeActor;}}}},_$a:{_yo:{ins:{intoSce:[2996]}}}},
  _C:{_Ba:{instance:{getRole:id=>String(id)===actor?meE:null}},_Mn:{_Cn:{get currentID(){return scene;}}}},
  _d:{_Yct:{_Het:'combat'}},
  _ft:{_nY:{ins:{getCfgBySkillIdAndLv:(id,lv)=>nativeRecords[id+'/'+lv]??null}}}
 };
 const ctx=vm.createContext({window:w,Date:Clock,console:{warn(){},log(){}}});
 function load(){vm.runInContext(src,ctx,{timeout:1500});return w.KVPV_GOLDEN_PROC;}
 return {w,meE,target,property,combat,nativeRecords,load,spawnTarget,
  changeActor:a=>{activeActor=a;},changeScene:n=>{scene=n;},
  setBuff:b=>{currentBuffs=b;}};
}
{
 const t=env(),obs=t.load();
 assert.equal(obs.status().active,false,'opt-in only');
 assert.equal(t.meE.count(1039),0,'no hook before explicit start');
 assert.equal(t.nativeRecords['3021/2'][6],30000,'never edit cooldown');
 assert.equal(obs.start().active,true);
 assert.equal(t.meE.count(1039),1);
 assert.equal(t.target.count(1012),1);
 for(let i=0;i<5;i++)t.meE.emit(1039,'boss123',8001+i);
 t.target.emit(1012,'12345',30220000,400,0,'boss123');
 time+=110;
 t.target.emit(1012,'12345',30220000,100,0,'boss123');
 t.target.emit(1012,'12345',30320000,500,0,'wrongTarget');
 t.target.emit(1012,'otherPlayer',30320000,500,0,'boss123');
 t.target.emit(1012,'12345',80010000,42,0,'boss123');
 time+=40000;
 t.target.emit(1012,'12345',30220000,200,0,'boss123');
 t.target.emit(1012,'12345',30320000,800,0,'boss123');
 t.setBuff([[123,2]]);t.property.emit('buffs');
 const x=obs.status();
 assert.equal(x.procs[0].rawDamageEvents,3,'three 3022 hits');
 assert.equal(x.procs[0].observedBursts,2,'multi-hit 350ms group merged');
 assert.equal(x.procs[1].observedBursts,1);
 assert.equal(x.procs[0].shortestBurstGapMs,40110);
 assert.equal(x.commonAttackSignals,5);
 assert.equal(x.procs[0].burstCountPer100ObservedBasicTH,40);
 assert.equal(x.buffPropertyChangeEvents,1);
 assert.equal(x.nativeDamageSignals,7,'all incoming events');
 assert.equal(x.ownedDamageSignals,5,'own events only and correct recipient');
 assert.equal(x.otherSourceSignals,1);
 assert.equal(x.receiverMismatchSignals,1);
 assert.equal(x.markerHistogram['3022'],3);
 assert.equal(x.markerHistogram['3032'],1);
 assert.equal(x.markerHistogram['8001'],1);
 assert.match(x.interpretation,/NOT the 8% server RNG/);
 assert.equal(x.config[0].clientCooldownMs,30000);
 assert.equal(JSON.parse(obs.export()).procs[0].observedBursts,2);
 obs.stop();
 assert.equal(t.meE.count(1039),0);
 assert.equal(t.target.count(1012),0);
 t.target.emit(1012,'12345',30320000,900,0,'boss123');
 assert.equal(obs.status().procs[1].observedBursts,1,'stopped observer inert');
}
{
 const t=env(),o=t.load();o.start();
 t.target.setHP(0);
 t.combat.target=null;
 let x=o.status();
 assert.equal(x.active,true,'target lost must not end session');
 assert.equal(x.selectedTargetId,null);
 const next=t.spawnTarget('boss456');
 t.combat.target=next;
 t.meE.emit(1039,'boss456',8002);
 assert.equal(next.count(1012),1,'reattach to next target on native cast');
 next.emit(1012,'12345',30320000,200,0,'boss456');
 t.target.emit(1012,'12345',30220000,100,0,'boss123');
 x=o.status();
 assert.equal(x.active,true,'target switch same map must remain active');
 assert.equal(x.targetSwitches,1);
 assert.equal(x.targetsSeen,2);
 assert.equal(x.procs[0].observedBursts,1,'late hit on previously selected target');
 assert.equal(x.procs[1].observedBursts,1,'hit on replacement monster');
 assert.equal(x.trackedTargetIds.length,2);
 assert.equal(x.commonAttackSignals,1,'new monster cast still counted');
}
{
 const t=env(),o=t.load();o.start();
 for(let i=0;i<9;i++){
   const tar=t.spawnTarget('enemy'+i);t.combat.target=tar;
   t.meE.emit(1039,'enemy'+i,8001);
 }
 assert.equal(o.status().trackedTargetIds.length,6,'only six target listeners retained');
 assert.equal(t.target.count(1012),0,'oldest target listener removed');
 o.stop();
 assert.equal(t.meE.count(1039),0);
}
{
 const t=env();let o=t.load();o.start();assert.equal(t.target.count(1012),1);
 o=t.load();assert.equal(t.target.count(1012),0,'hot reload removes prior native hooks');
 assert.equal(o.status().active,false,'new observer is opt-in');
}
{
 const t=env(),o=t.load();t.changeActor('other');
 assert.throws(()=>o.start(),/correct actor/);
 assert.equal(t.meE.count(1039),0);
 t.changeActor('12345');o.start();t.changeActor('other');
 t.target.emit(1012,'12345',30320000,100,0,'boss123');
 assert.equal(o.status().reason,'actor_or_scene_changed');
 assert.equal(t.target.count(1012),0);
}
{
 const t=env(),o=t.load();o.start();t.changeScene(2998);
 assert.equal(o.status().reason,'actor_or_scene_changed','new scene ends session');
}
{
 const t=env(),o=t.load();o.start();time+=180000;
 assert.equal(o.status().active,false);
 assert.equal(o.status().reason,'three_minutes_elapsed');
 assert.equal(t.meE.count(1039),0);
}
{
 const t=env(),o=t.load();o.start();
 for(let i=0;i<450;i++){t.target.emit(1012,'12345',30220000,1,0,'boss123');time+=1;}
 assert(o.status().events.length<=180,'bounded events');
 assert(o.status().dropped>0,'bounded dropped count');
}
console.log('PASS Golden proc v2: owned marker histogram, same-map target handoff, six-listener cap, delayed AoE hits, actor and scene guards, expiry, reload cleanup; no cooldown writes.');
