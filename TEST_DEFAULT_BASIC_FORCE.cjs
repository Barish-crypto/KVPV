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
assert.equal(api.status().skillPriority,'interleaved');
assert.equal(api.status().intervalMs,16,'poll never accelerates to 1ms');
assert.equal(api.status().basicClientWaitMs,200);
assert.deepEqual(hits,[],'native cooldown prevents requests');
assert.equal(c.isCooldown(),true,'native cooldown is not overridden');
assert.equal(c._jh.isPlaying,true,'native animation is unchanged');
assert.equal(api.status().defaultBasicForce.active,false);
cooling=false;now+=250;api.sync();
assert.equal(hits.length,1,'one native-ready cast');
assert.equal(hits[0],8001,'initial rotation uses basic');
for(let i=0;i<10;i++){now+=1;api.sync();}
assert.equal(hits.length,1,'no acceleration after repeated polls');
now+=250;api.sync();assert.equal(hits.length,2,'second cast after native-safe gap');
assert.equal(hits[1],1001,'TH interleaved when ready');
cooling=true;now+=1000;api.sync();assert.equal(hits.length,2,'native cooldown always wins');
assert.equal(c._jh.isPlaying,true);
c.target={property:{get:k=>k==='type'?4:null}};now+=250;api.sync();
assert.equal(api.status().reason,'player_target_yield_pvp');
assert.equal(c.isCooldown,nativeCooldown);
assert.equal(c.combat,nativeCombat);
assert.equal(s._f7t,nativeSelector);
c.target=target;kind='THIEN_QUAN';now+=250;api.sync();
assert.equal(api.status().active,false);
kind='OUTSIDE';cooling=false;now+=250;api.sync();
assert.equal(c.isCooldown(),false);
api.stop();assert.equal(c.isCooldown,nativeCooldown);
assert.equal(c.combat,nativeCombat);
assert.equal(s._f7t,nativeSelector);
console.log('PASS default BASIC10: native cooldown and animation, stable 200ms cast interval, interleaved TH, map and PvP handoff, cleanup');