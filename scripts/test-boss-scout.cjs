'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const code=fs.readFileSync(require('node:path').join(__dirname,'../KVPV_DOC_BOSS_TRUOC_KHI_DANH.js'),'utf8');
function emitter(o){o.events=new Map();o.on=(id,owner,fn)=>{if(!o.events.has(id))o.events.set(id,new Map());o.events.get(id).set(owner,fn);};o.off=(id,owner)=>{o.events.get(id)?.delete(owner);};o.emit=(id,...args)=>{for(const fn of o.events.get(id)?.values()||[])fn(...args);};return o;}
let now=1000;class Clock extends Date{static now(){return now;}}
let nativeCalls=0;
const Combat=function(){},Selector=function(){},rows=[[9001,5000,1200]],bossCombat={combat(id){nativeCalls++;if(id===-1)throw Error('native error');return id;},_mvt:()=>[9001,0,'Boss strike',0,0,'attack'],_jh:{isPlaying:false}},nativeCombat=bossCombat.combat;
const boss=emitter({isValid:true,property:{get:k=>({id:'boss1',occ:99,type:1,name:'Boss',hp:[100,100],position:{x:0,y:0}})[k]},getComponent:t=>t===Combat?bossCombat:{_rtt:rows,_wet:[]}});
const combat={target:boss},me=emitter({property:{get:k=>k==='position'?{x:300,y:0}:null},getComponent:()=>combat}),timers=new Set();
const W={__KVPV_OWN_ACTOR_ID:'123',_Ba:{_rJ:{_O$:{ins:{actorId:'123'}}}},_C:{_Mn:{_Cn:{currentID:3301}},_Ba:{instance:{getRole:()=>me}}},_d:{_Yct:{_Het:Combat,_Eet:Selector}},_ft:{_tY:{ins:{isBoss:()=>true,getCfgById:()=>[0,0,0,280]}}},console:{table(){},info(){}},setInterval:f=>{timers.add(f);return f;},clearInterval:f=>timers.delete(f)};
vm.runInNewContext(code,{window:W,Date:Clock});let report=W.KVPV_BOSS_SCOUT.report();assert.equal(report.nativeBossRange,280);assert.equal(report.skills[0].name,'Boss strike');assert.equal(report.distance,300);assert.equal(nativeCalls,0);assert.equal(report.combatMethodObserved,true);
boss.emit(1039,'123',9001);now+=500;me.emit(1012,'boss1',90010000,10,1,'123');me.emit(1012,'boss1',90010000,10,1,'123');assert.equal(W.KVPV_BOSS_SCOUT.report().matchedObservations.length,1);
boss.emit(1039,'123',9001);now+=100;me.emit(1012,'boss1',90010000,10,64,'123');assert.equal(W.KVPV_BOSS_SCOUT.report().matchedObservations.length,1);
report=W.KVPV_BOSS_SCOUT.report();report.skills[0].nativeRows[0][1]=0;assert.equal(rows[0][1],5000);assert.equal(W.KVPV_BOSS_SCOUT.report().skills[0].nativeRows[0][1],5000);
assert.equal(bossCombat.combat(9002),9002);assert.equal(nativeCalls,1);now+=400;me.emit(1012,'boss1',90020000,10,1,'123');assert.equal(W.KVPV_BOSS_SCOUT.report().matchedObservations.at(-1).source,'combat_method_entry');assert.equal(W.KVPV_BOSS_SCOUT.report().skills.some(x=>x.skillId===9002),true);
assert.throws(()=>bossCombat.combat(-1),/native error/);assert.equal(nativeCalls,2);
combat.target=null;for(const tick of [...timers])tick();assert.equal(W.KVPV_BOSS_SCOUT.report().running,false);assert.equal(timers.size,0);assert.equal(boss.events.get(1039).size,0);assert.equal(me.events.get(1012).size,0);
assert.equal(bossCombat.combat,nativeCombat);
console.log('PASS Boss scout: native inventory/range, cast-hit pairing, duplicate/auxiliary rejection, no native-row mutation and target-change cleanup.');
