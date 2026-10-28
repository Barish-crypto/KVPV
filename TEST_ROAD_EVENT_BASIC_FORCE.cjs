'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
let now=1000,cooldown=true,scene=41,range=false,focus=false,seq=0;
const ids=[],moves=[],actor='12345';
class TestDate extends Date{static now(){return now;}}
const CS=function(){},CC=function(){},CM=function(){};
const pos={x:300,y:0};
const emitter=props=>({property:{get:k=>props[k]},on(){},off(){}});
const boss=emitter({id:'boss',type:1,occ:94001,position:{x:0,y:0},hp:[100,100]});
const skill={_rtt:[1001,8001,8002,8003,8004,8005].map(id=>[id,0,1]),_wet:[],
  _f7t(a,b){const x=[...a,...b].find(r=>r[1]<now);return x?.[0]??-1;},
  selectSkill(){return this._f7t(this._rtt,this._wet,1);}};
const nativeCD=()=>cooldown;
const combat={target:boss,_jh:{isPlaying:true},isCooldown:nativeCD,
  isValidTarget:()=>true,isValidRange:()=>range,
  combat(id){ids.push(id);}};
const movement={moveTo(x,y){moves.push([x,y]);pos.x=x;pos.y=y;},running:()=>false};
const nativeCast=combat.combat,nativeSelect=skill._f7t;
const role=emitter({id:actor});role.getComponent=t=>t===CS?skill:t===CC?combat:t===CM?movement:null;
role.property={get:k=>k==='id'?actor:k==='position'?pos:null};
const W={__KVPV_OWN_ACTOR_ID:actor,document:{hidden:false},
  _Ba:{_rJ:{_O$:{ins:{actorId:actor,isDead:false}}},
    _cm:{_q3t:{ins:{getHasTeamByType:()=>true}}},
    _$a:{_yo:{ins:{intoSce:[2518]}}}},
  _d:{_Yct:{_Eet:CS,_Het:CC,_zet:CM}},
  _C:{_Ba:{instance:{getRole:()=>role}},_Mn:{_Cn:{currentID:2518}}},
  _ft:{_po:{ins:{getCfgById:()=>[0,0,0,0,0,0,0,scene]}}},
  KVPV_TQ_SCOPE:{inside:()=>false},
  KVPV_ACCOUNT_POLICY:{pollingGap:()=>0},
  KVPV_BOSS_TEAM:{priority:()=>focus},
  setInterval(){return ++seq;},clearInterval(){}};
const load=p=>vm.runInNewContext(fs.readFileSync(__dirname+'/'+p,'utf8')
 .replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,''),{window:W,Date:TestDate,console});
load('src/59-road-cadence.js');
load('src/12-basic-outside.js');
const basic=W.KVPV_BASIC10,road=W.KVPV_ROAD_CADENCE;
assert.equal(basic.status().skillPriority,'basic_force_default');
assert.equal(road.enabled,true);
assert.equal(road.combatMode,'native');
assert.equal(ids.length,0,'no force until within native Road melee range');
assert.equal(moves.length,1,'Road movement still approaches Boss');
assert.equal(basic.status().defaultBasicForce.active,false);
range=true;now++;basic.sync();
assert.equal(basic.status().defaultBasicForce.active,true);
assert.equal(combat.isCooldown(),false);
assert.equal(combat._jh.isPlaying,false);
assert.equal(basic.status().intervalMs,1);
assert.equal(basic.status().roadMelee.nativeCooldownBypass,true);
assert.deepEqual(ids,[8001]);
for(let i=0;i<8;i++){now++;basic.sync();}
assert(ids.every(id=>id>=8001&&id<=8005),'Road BASIC FORCE never fires TH');
assert(ids.includes(8002),'Road rotates multiple native basics');
const originalTween=combat._jh;combat._jh={isPlaying:true};now++;basic.sync();
assert.equal(originalTween.isPlaying,true);
assert.equal(combat._jh.isPlaying,false);
assert.equal(road.status().rows.length>=0,true);
focus=true;now++;basic.sync();
assert.equal(combat.isCooldown(),true,'higher priority event blocks forced Road readiness');
assert.equal(combat._jh.isPlaying,true);
focus=false;now++;basic.sync();assert.equal(combat.isCooldown(),false);
road.setCombatMode('basic8001');now++;basic.sync();
assert.equal(combat.isCooldown(),true,'explicit Road native 8001 mode disables force');
assert.equal(combat._jh.isPlaying,true);
road.setCombatMode('native');now++;basic.sync();
assert.equal(combat.isCooldown(),false);
range=false;pos.x=200;now++;basic.sync();
assert.equal(combat.isCooldown(),true,'out of range disables force');
assert.equal(combat._jh.isPlaying,true,'out of range restores animation');
range=true;pos.x=60;now++;basic.sync();assert.equal(combat.isCooldown(),false);
scene=0;W._C._Mn._Cn.currentID=3001;W._Ba._$a._yo.ins.intoSce=[3001];
now++;basic.sync();
assert.equal(basic.status().defaultBasicForce.active,true,'normal PvE event fights share same force profile');
assert(ids.every(id=>id>=8001&&id<=8005));
combat.target=emitter({id:'enemy',type:4,position:{x:0,y:0},hp:[100,100]});now++;basic.sync();
assert.equal(combat.isCooldown,nativeCD,'player fight yields to its dedicated PvP controller');
combat.target=boss;now++;basic.sync();assert.equal(combat.isCooldown(),false);
W.KVPV_PEAK_CHEST={status:()=>({inside:true})};now++;basic.sync();
assert.equal(combat.isCooldown,nativeCD,'chest gathering event yields');
delete W.KVPV_PEAK_CHEST;
scene=69;now++;basic.sync();
assert.equal(combat.isCooldown,nativeCD,'quiz event yields');
scene=0;now++;basic.sync();
assert.equal(combat.isCooldown(),false);
basic.stop();assert.equal(combat.isCooldown,nativeCD);
assert.equal(combat.combat,nativeCast);
assert.equal(skill._f7t,nativeSelect);
assert.equal(combat._jh.isPlaying,true);
console.log('PASS Road/event BASIC FORCE: native approach, client 1ms basics, ownership, switch to Road native, event PvE, PvP/chest/quiz yield, restoration');
