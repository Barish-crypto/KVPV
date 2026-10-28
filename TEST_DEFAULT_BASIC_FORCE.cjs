'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
let now=1000,cooling=true,kind='OUTSIDE',busy=false,seq=0;
const hits=[],timers=new Map(),actor='12345';
class TestDate extends Date{static now(){return now;}}
const CS=function(){},CC=function(){},T={property:{get:k=>k==='type'?1:null}};
const target={property:{get:k=>k==='type'?1:null}};
const s={_rtt:[1001,8001,8002,8003,8004,8005].map(id=>[id,0,1]),_wet:[],
  _f7t(active,common){const item=[...active,...common].find(x=>x[1]<now);return item?.[0]??-1;},
  selectSkill(){return this._f7t(this._rtt,this._wet,1);}};
const nativeCooldown=()=>cooling;
const c={target,isCooldown:nativeCooldown,isValidTarget:()=>true,isValidRange:()=>true,
  _jh:{isPlaying:true},combat(id){hits.push(id);}};
const nativeCombat=c.combat,nativeSelector=s._f7t;
const role={getComponent:k=>k===CS?s:k===CC?c:null};
const W={__KVPV_OWN_ACTOR_ID:actor,
  _Ba:{_rJ:{_O$:{ins:{actorId:actor,isDead:false}}},_$a:{_yo:{ins:{intoSce:[100]}}}},
  _d:{_Yct:{_Eet:CS,_Het:CC}},
  _C:{_Ba:{instance:{getRole:()=>role}},_Mn:{_Cn:{currentID:100}}},
  _ft:{_po:{ins:{getCfgById:()=>[0,0,0,0,0,0,0,0]}}},
  KVPV_FAR_SCOPE:{inside:()=>kind!=='OUTSIDE',status:()=>({kind})},
  KVPV_ACCOUNT_POLICY:{pollingGap:()=>0},
  KVPV_BOSS_TEAM:{priority:()=>busy},
  document:{hidden:false},
  setInterval(fn,ms){const id=++seq;timers.set(id,{fn,ms});return id;},
  clearInterval(id){timers.delete(id);}};
vm.runInNewContext(fs.readFileSync(__dirname+'/src/12-basic-outside.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,''),{window:W,Date:TestDate,console});
const api=W.KVPV_BASIC10;
assert.equal(api.status().skillPriority,'basic_force_default');
assert.equal(api.status().intervalMs,1);
assert.deepEqual(hits,[8001],'first cast is basic, never TH');
assert.equal(c.isCooldown(),false,'client override reports ready');
assert.equal(c._jh.isPlaying,false,'current native animation is masked');
const forced=api.status().defaultBasicForce;
assert.equal(forced.active,true);
assert.equal(forced.animationForced,true);
assert.equal(forced.serverCooldownModified,false);
for(let i=0;i<8;i++){now+=1;api.sync();}
assert(hits.every(x=>x>=8001&&x<=8005),'all casts remain within 8001..8005');
assert(!hits.includes(1001));
const firstTween=c._jh,secondTween={isPlaying:true};
c._jh=secondTween;now++;api.sync();
assert.equal(firstTween.isPlaying,true,'old tween restored when replaced');
assert.equal(secondTween.isPlaying,false,'new tween forced on next poll');
assert.equal(api.status().defaultBasicForce.active,true);
W.document.hidden=true;now++;api.sync();
assert.equal(c.isCooldown(),true,'background tab returns native cooldown');
assert.equal(secondTween.isPlaying,true,'background tab restores animation');
W.document.hidden=false;now++;api.sync();
assert.equal(c.isCooldown(),false,'foreground reactivates default');
busy=true;now++;api.sync();assert.equal(c.isCooldown(),true,'higher-priority controller never gets forced readiness');
busy=false;now++;api.sync();assert.equal(c.isCooldown(),false);
c.target={property:{get:k=>k==='type'?4:null}};now++;api.sync();
assert.equal(api.status().reason,'player_target_yield_pvp');
assert.equal(c.isCooldown,nativeCooldown,'player target releases cooldown ownership');
assert.equal(c.combat,nativeCombat,'player target releases combat hook');
assert.equal(s._f7t,nativeSelector,'player target releases selector hook');
c.target=target;now++;api.sync();assert.equal(c.isCooldown(),false,'PvE reacquires force');
kind='THIEN_QUAN';now++;api.sync();
assert.equal(c.isCooldown,nativeCooldown,'TQ handoff restores native cooldown');
assert.equal(c._jh.isPlaying,true);
kind='OUTSIDE';now++;api.sync();assert.equal(c.isCooldown(),false);
api.setSkillPriority('tuyet_hoc_first');assert.equal(c.isCooldown(),true,'explicit alternate mode restores native cooldown');
assert.equal(c._jh.isPlaying,true,'explicit alternate mode restores tween');
api.setSkillPriority('basic_force_default');now++;api.sync();
assert.equal(c.isCooldown(),false);
W._ft._po.ins.getCfgById=()=>[0,0,0,0,0,0,0,41];W._Ba._cm={_q3t:{ins:{getHasTeamByType:()=>true}}};now++;api.sync();
assert.equal(c.isCooldown(),true,'Road native cooldown preserved');
assert.equal(c._jh.isPlaying,true,'Road animation is not forced');
api.stop();
assert.equal(c.isCooldown,nativeCooldown);
assert.equal(c.combat,nativeCombat);
assert.equal(s._f7t,nativeSelector);
console.log('PASS default BASIC FORCE outside TQ: 8001-8005, 1ms, local force, target/tween replacement, priority, UI, Road, PvP, manual override, restoration');
