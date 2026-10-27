'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
let now=1000,seq=0,ready=true;const calls=[],timers=[],listeners=new Map();
class Clock extends Date{static now(){return now;}}
function Skill(){}function Combat(){}
const target={property:{get:k=>({id:'boss',type:1,occ:42,position:{x:0,y:0},hp:[100,100]})[k]},on(){},off(){}};
const s={_rtt:[[8001,0,200]],_wet:[],_f7t(a){return a[0]?.[0]??-1;},selectSkill(){return this._f7t(this._rtt,[],1);}};
const nativeSelector=s._f7t;
const c={target,isCooldown:()=>!ready,isValidTarget:()=>true,isValidRange:()=>true,
 combat(id){if(ready)calls.push(id);}};
const nativeCombat=c.combat;
const role={property:{get:k=>({id:'12345',position:{x:50,y:0}})[k]},getComponent:key=>key===Skill?s:key===Combat?c:null,
 on(e,obj,fn){listeners.set(e,fn);},off(e,obj,fn){if(listeners.get(e)===fn)listeners.delete(e);}};
const W={__KVPV_OWN_ACTOR_ID:'12345',
 _Ba:{_rJ:{_O$:{ins:{actorId:'12345',isDead:false}}},_cm:{_q3t:{ins:{getHasTeamByType:t=>t===1}}}},
 _ft:{_po:{ins:{getCfgById:()=>[0,0,0,0,0,0,0,41]}}},
 _C:{_Mn:{_Cn:{currentID:2518}},_Ba:{instance:{getRole:()=>role}}},
 _d:{_Yct:{_Eet:Skill,_Het:Combat}},
 KVPV_TQ_SCOPE:{inside:()=>false},document:{hidden:false},
 setInterval(fn,ms){timers.push(ms);return ++seq;},clearInterval(){}};
const run=file=>vm.runInNewContext(fs.readFileSync(__dirname+'/'+file,'utf8'),{window:W,Date:Clock,console});
run('src/59-road-cadence.js');run('src/12-basic-outside.js');
assert.equal(W.KVPV_ROAD_CADENCE.minCastIntervalMs,80);
assert.equal(W.KVPV_BASIC10.status().intervalMs,100,'road polling remains bounded');
assert.equal(c.combat===nativeCombat,false,'native call is wrapped only for duplicate guard');
assert.equal(s._f7t,nativeSelector,'native skill selection stays unchanged');
assert.deepEqual(calls,[],'road support never auto-sends a skill');
c.combat(8001);assert.deepEqual(calls,[8001]);
now+=79;c.combat(8001);assert.deepEqual(calls,[8001],'no duplicate below 80ms');
now+=1;c.combat(8001);assert.deepEqual(calls,[8001,8001],'80ms passed to native');
ready=false;now+=80;c.combat(8001);assert.deepEqual(calls,[8001,8001],'native cooldown still rejects');
ready=true;now+=80;c.combat(8001);assert.equal(calls.length,3);
W.KVPV_DESKTOP_CONTROL={scopeProfile:scope=>scope==='ROAD_TRIAL'?{mode:'native',intervalMs:200,distance:80}:null};
assert.equal(W.KVPV_ROAD_CADENCE.minCastIntervalMs,200,'longer desktop profile honored');
now+=199;c.combat(8001);assert.equal(calls.length,3);
now+=1;c.combat(8001);assert.equal(calls.length,4);
W.KVPV_BASIC10.stop();assert.equal(c.combat,nativeCombat,'native hook restored');
assert.equal(s._f7t,nativeSelector,'native selector restored');
assert.deepEqual(s._rtt,[[8001,0,200]],'skill cooldown rows never rewritten');
console.log('PASS Road native guard 80ms, cooldown authority, longer desktop preference, and hook cleanup');
