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
 let activeActor=actor;
 const meE=emitter(),targetE=emitter(),buffE=emitter();
 let currentBuffs=[['Golden',1]];
 const property={get(k){return k==='buffs'?currentBuffs:null;},on:buffE.on,off:buffE.off,emit:buffE.emit,count:buffE.count};
 Object.assign(meE,{property,getComponent:()=>combat});
 const target=Object.assign(targetE,{isValid:true,property:{get(k){
  return {type:1,id:'boss123',hp:[100,100],name:'Boss test'}[k];
 }}});
 const combat={target};
 const w={__KVPV_OWN_ACTOR_ID:actor,
  _Ba:{_rJ:{_O$:{ins:{get actorId(){return activeActor;}}}},_$a:{_yo:{ins:{intoSce:[2996]}}}},
  _C:{_Ba:{instance:{getRole:id=>String(id)===actor?meE:null}},_Mn:{_Cn:{currentID:2996}}},
  _d:{_Yct:{_Het:'combat'}},
  _ft:{_nY:{ins:{getCfgBySkillIdAndLv:(id,lv)=>nativeRecords[id+'/'+lv]??null}}}
 };
 const ctx=vm.createContext({window:w,Date:Clock,console:{warn(){},log(){}}});
 function load(){vm.runInContext(src,ctx,{timeout:1500});return w.KVPV_GOLDEN_PROC;}
 return {w,meE,target,property,combat,nativeRecords,load,
   changeActor:a=>{activeActor=a;},setBuff:b=>{currentBuffs=b;}};
}
{
 const t=env(),obs=t.load();
 assert.equal(obs.status().active,false,'opt-in only');
 assert.equal(t.meE.count(1039),0,'no hook before explicit start');
 assert.equal(t.nativeRecords['3021/2'][6],30000,'never force 0ms cooldown');
 assert.equal(obs.start().active,true);
 assert.equal(t.meE.count(1039),1);
 assert.equal(t.target.count(1012),1);
 for(let i=0;i<5;i++)t.meE.emit(1039,'boss123',8001+i);
 t.target.emit(1012,'12345',30220000,400,0,'boss123');
 time+=110;
 t.target.emit(1012,'12345',30220000,100,0,'boss123');
 t.target.emit(1012,'12345',30320000,500,0,'wrongTarget');
 t.target.emit(1012,'otherPlayer',30320000,500,0,'boss123');
 time+=40000;
 t.target.emit(1012,'12345',30220000,200,0,'boss123');
 t.target.emit(1012,'12345',30320000,800,0,'boss123');
 t.setBuff([[123,2]]);
 t.property.emit('buffs');
 let r=obs.status();
 assert.equal(r.procs[0].rawDamageEvents,3,'all native 3022 events counted');
 assert.equal(r.procs[0].observedBursts,2,'multi-hit 350ms group merged');
 assert.equal(r.procs[1].observedBursts,1,'separate Xá damage observed');
 assert.equal(r.procs[0].shortestBurstGapMs,40110);
 assert.equal(r.commonAttackSignals,5);
 assert.equal(r.procs[0].burstCountPer100ObservedBasicTH,40);
 assert.equal(r.buffPropertyChangeEvents,1);
 assert.match(r.interpretation,/NOT the 8% server RNG chance/);
 assert.equal(r.config[0].clientCooldownMs,30000,'do not edit Bát Hoang config');
 assert.equal(r.config[1].clientCooldownMs,30000,'do not edit Xá config');
 assert.equal(JSON.parse(obs.export()).procs[0].observedBursts,2);
 obs.stop();
 assert.equal(t.meE.count(1039),0);
 assert.equal(t.target.count(1012),0);
 t.target.emit(1012,'12345',30320000,900,0,'boss123');
 assert.equal(obs.status().procs[1].observedBursts,1,'stopped observer inert');
}
{
 const t=env();let o=t.load();o.start();
 assert.equal(t.target.count(1012),1);
 o=t.load();assert.equal(t.target.count(1012),0,'live reload removes native hooks');
 assert.equal(o.status().active,false,'reloaded observer remains manual off');
}
{
 const t=env(),o=t.load();t.changeActor('other');
 assert.throws(()=>o.start(),/correct actor/);
 assert.equal(t.meE.count(1039),0);
 t.changeActor('12345');o.start();
 t.changeActor('other');
 t.target.emit(1012,'12345',30320000,100,0,'boss123');
 assert.equal(o.status().reason,'actor_scene_or_target_changed');
 assert.equal(t.target.count(1012),0);
}
{
 const t=env(),o=t.load();o.start();t.combat.target=null;
 assert.equal(o.status().reason,'actor_scene_or_target_changed');
}
{
 const t=env(),o=t.load();o.start();time+=180000;
 assert.equal(o.status().active,false,'expiry checked on status with no extra interval');
 assert.equal(o.status().reason,'three_minutes_elapsed');
 assert.equal(t.meE.count(1039),0);
}
{
 const t=env(),o=t.load();o.start();
 for(let i=0;i<450;i++){t.meE.emit(1039,'boss123',8001);time+=1;}
 assert(o.status().events.length<=180,'bounded events');
 assert(o.status().dropped>0,'bounded dropped count');
}
console.log('PASS Golden passive: native observer opt-in, bounded reports, Bát Hoang/Xá evidence, multi-hit merging, actor/target guards, expiry and cleanup; no cooldown writes.');
