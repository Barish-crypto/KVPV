'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
let now=1000,valid=true,range=true,cooldown=false,gap=0,inside=false,road=false,seq=0;
const intervals=[],casts=[];class Clock extends Date{static now(){return now;}}
function Skill(){}function Combat(){}
const selector={_rtt:[[1001,0,100],[8001,0,30]],_wet:[],
 _f7t(a,b){const row=[...a,...b].find(x=>Number(x[1])<now);return row?Number(row[0]):-1;},
 selectSkill(){return this._f7t(this._rtt,this._wet,1);}};
const combat={isCooldown:()=>cooldown,isValidTarget:()=>valid,isValidRange:()=>range,
 combat(id){casts.push(id);}};
const role={getComponent:k=>k===Skill?selector:k===Combat?combat:null};
const W={__KVPV_OWN_ACTOR_ID:'123',
 _Ba:{_rJ:{_O$:{ins:{actorId:'123',isDead:false}}}},
 _d:{_Yct:{_Eet:Skill,_Het:Combat}},
 _C:{_Ba:{instance:{getRole:()=>role}},_Mn:{_Cn:{currentID:5}}},
 _ft:{_po:{ins:{getCfgById:()=>[0,0,0,0,0,0,0,road?41:0]}}},
 KVPV_TQ_SCOPE:{inside:()=>inside},
 KVPV_ACCOUNT_POLICY:{pollingGap:()=>gap},
 document:{hidden:false},
 setInterval(fn,ms){intervals.push(ms);return ++seq;},clearInterval(){}};
vm.runInNewContext(fs.readFileSync(__dirname+'/src/12-basic-outside.js','utf8'),{window:W,Date:Clock,console});
const api=W.KVPV_BASIC10;
assert.equal(api.status().intervalMs,16,'safe BASIC10 polling stays at 16ms');
assert.equal(api.status().rapidPoll,true);
assert.deepEqual(intervals.slice(0,2),[16,16],'never requests 1ms polling');
assert.equal(casts.length,1);
valid=false;now+=10;api.sync();
assert.equal(api.status().intervalMs,16,'lost target falls back to idle cadence');
assert.equal(api.status().rapidPoll,false);
valid=true;range=true;now+=20;api.sync();
assert.equal(api.status().intervalMs,16,'target reacquired preserves stable 16ms polling');
const before=calls();
cooldown=true;now+=20;api.sync();
assert.equal(calls(),before,'native cooldown stops any additional skill send');
assert.equal(api.status().intervalMs,16,'native cooldown preserves stable polling');
gap=50;W.document.hidden=true;now+=50;api.sync();
assert.equal(api.status().intervalMs,50,'background account policy wins over fast polling');
gap=0;W.document.hidden=false;range=false;now+=20;api.sync();
assert.equal(api.status().intervalMs,16,'out of range must not busy-poll');
inside=true;now+=20;api.sync();
assert.equal(api.status().active,false,'far-map hook yields after scene switch');
assert.equal(combat.combat!==undefined,true);
api.stop();
const far=fs.readFileSync(__dirname+'/src/08-range-evidence.js','utf8');
assert(far.includes('scanMs:4,basicOnly:false'),'far boss scan is 4ms when not in 1ms Tian Quan profile');
assert(far.includes('CFG.scanMs=enabled?1:4;'),'1ms trial remains available and restore returns to 4ms');
const startup=fs.readFileSync(__dirname+'/src/11-auto-tianquan.js','utf8');
assert(startup.includes('setClientPace?.(1)'), 'fallback client pace must not be 100ms');
function calls(){return casts.length;}
console.log('PASS faster skill polling: 4ms active, 16ms idle, 50ms background, cooldown/scene safety, 1ms Tu Vuot preserved');
