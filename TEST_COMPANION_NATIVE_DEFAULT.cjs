'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const source=fs.readFileSync(__dirname+'/src/50-companion-combat.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,'');
let now=10000,inside=true,kind='THIEN_QUAN',owned=true,dead=false,masterReady=true,masterTargetValid=true,callback=null;
class Clock extends Date { static now(){return now;} }
const Skill=function(){},Combat=function(){};
const target={id:'boss',isValid:true,property:{get:k=>({id:'boss',type:1,status:0,hp:[100,100]})[k]}};
function emitter(obj){const listeners=[];return Object.assign(obj,{on(id,owner,fn){listeners.push({id,owner,fn});},
 off(id,owner,fn){let i=listeners.findIndex(x=>x.id===id&&x.owner===owner&&x.fn===fn);if(i>=0)listeners.splice(i,1);},
 emit(id,...args){for(const l of listeners.slice())if(l.id===id)l.fn(...args);},listeners});}
const configs={},calls=[],helpers=[];
function create(key,type,basic,skill){
 const rowsBasic=[[basic,0,150]],rowsSkill=[[skill,0,300]];
 let cdUntil=0,playing=false,validRange=true,allowSkill=true;
 const entity=emitter({isValid:true,id:key,property:{get:k=>({id:key,type,status:0,hp:[100,100]})[k]}});
 const selector={_rtt:rowsBasic,_wet:rowsSkill,selectSkill(){
   const row=[...this._wet,...this._rtt].find(r=>r[1]<Clock.now()&&(allowSkill||r[0]!==skill));
   if(!row)return -1;row[1]=Clock.now()+row[2];return row[0];
 }};
 const combat={target:null,_jh:{get isPlaying(){return playing;}},isCooldown:()=>Clock.now()<cdUntil,
  setTarget(v){this.target=v;},isValidTarget:()=>true,isValidRange:()=>validRange,
  combat(id){calls.push({key,id,at:now});cdUntil=now+30;entity.emit(1039,'boss',id);role.emit(1039,'boss',id);}};
 entity.getComponent=c=>c===Skill?selector:c===Combat?combat:null;
 configs[basic]=Array(16).fill(0);configs[skill]=Array(16).fill(0);
 const item={key,entity,selector,combat,rowsBasic,rowsSkill,
  setAnimation:v=>{playing=v;},setRange:v=>{validRange=v;},setSkillEnabled:v=>{allowSkill=v;},resetCd:()=>{cdUntil=0;}};
 helpers.push(item);return item;
}
let pet,fuwa,ride;
const master={target,isValidTarget:()=>masterTargetValid};
const role=emitter({id:'123',isValid:true,property:{get:k=>({
 type:4,status:0,hp:[100,100],petContext:pet?.entity,fuwaContext:fuwa?.entity,rideContext:ride?.entity})[k]},
 getComponent:c=>c===Combat?master:c===Skill?{_rtt:[[8001,0,100]],_wet:[[1001,0,100]]}:null});
pet=create('pet',2,2001,2101);fuwa=create('fuwa',9,3001,3101);ride=create('ride',7,3801,3901);
const W={__KVPV_OWN_ACTOR_ID:'123',
 _Ba:{_rJ:{_O$:{ins:{get actorId(){return owned?'123':'456';},get isDead(){return dead;}}}},
  _Jtt:{_ant:{ins:{getCfgById:id=>configs[Math.floor(id/10000)]||null}}}},
 _d:{_Yct:{_Eet:Skill,_Het:Combat}},
 _C:{_Ba:{instance:{getRole:()=>role}}},
 KVPV_FAR_SCOPE:{status:()=>({inside,kind}),eligible:t=>t===target},
 setInterval(fn,ms){callback=fn;assert.equal(ms,50);return 1;},clearInterval(){callback=null;}};
vm.runInNewContext(source,{window:W,Date:Clock});
const api=W.KVPV_COMPANION_COMBAT;
assert.equal(calls.length,0,'initialization must not cast in non-Road scope');
function step(ms=50){now+=ms;assert.equal(typeof callback,'function');callback();}
step();
assert.equal(calls.length,3,'all three companions cast without master-cast event');
assert.deepEqual(calls.map(x=>x.id),[2101,3101,3901],'native special rows chosen when ready');
const idsBefore=helpers.map(h=>[h.rowsBasic[0][0],h.rowsSkill[0][0]]);
const rowsAfterSpecial=helpers.map(h=>h.rowsSkill[0][1]);
assert.deepEqual(rowsAfterSpecial,[now+300,now+300,now+300],'native selector set per-skill 300ms cooldown');
role.emit(1039,'boss',8001);
assert.equal(calls.length,3,'native 30ms combat cooldown prevents duplicate master-follow cast');
step();
assert.equal(calls.length,6,'all companions select ordinary/basic when skill on cooldown');
assert.deepEqual(calls.slice(3).map(x=>x.id),[2001,3001,3801]);
assert.deepEqual(helpers.map(h=>h.rowsBasic[0][1]),[now+150,now+150,now+150]);
step();assert.equal(calls.length,6,'no new casts while native rows are on cooldown');
step();assert.equal(calls.length,6);
pet.setAnimation(true);step();
assert.equal(calls.filter(x=>x.key==='pet').length,2,'pet animation blocks native attempt');
assert.equal(calls.filter(x=>x.key==='fuwa').length,3,'fuwa independently resumes ordinary attack');
assert.equal(calls.filter(x=>x.key==='ride').length,3,'ride independently resumes ordinary attack');
pet.setAnimation(false);pet.setRange(false);step();
assert.equal(calls.filter(x=>x.key==='pet').length,2,'pet native range gate blocks casting');
pet.setRange(true);step();
assert(calls.filter(x=>x.key==='pet').length>=3,'pet resumes when animation/range ready');
assert(helpers.every(h=>h.rowsBasic[0][0]===idsBefore[helpers.indexOf(h)][0]&&h.rowsSkill[0][0]===idsBefore[helpers.indexOf(h)][1]),'native IDs never rewritten');
const status=api.status();
assert.equal(status.mode,'pet_fuwa_ride_native_basic_and_skills');
assert.equal(status.nativeAnimationGate,true);
assert.equal(status.nativeRangeGate,true);
assert.equal(status.clientSkillCooldownMs,null);
assert.equal(status.nativeAutoAttempts,calls.length,'no separate extra duplicate dispatches in this fixture');
assert.deepEqual(Object.keys(status.perCompanion).sort(),['fuwa','pet','ride']);
const saved=calls.length;
inside=false;step();assert.equal(calls.length,saved,'outside dungeon blocks');
inside=true;kind='PVP';step();assert.equal(calls.length,saved,'PvP unaffected');
kind='THIEN_QUAN';owned=false;step();assert.equal(calls.length,saved,'wrong actor blocked');
owned=true;dead=true;step();assert.equal(calls.length,saved,'dead actor blocked');
dead=false;masterTargetValid=false;step();assert.equal(calls.length,saved,'invalid master target blocked');
api.stop();assert.equal(callback,null);
console.log('PASS companions native basics+skills: all 3 independently cast, distinct per-skill cooldown, animation/range gates, scope, owner, death and cleanup');
