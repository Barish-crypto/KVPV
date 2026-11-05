'use strict';
const assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs');
const source=fs.readFileSync(__dirname+'/src/09-boss-unified.js','utf8');
let starts=[],timers=0,clears=0;
const W={__KVPV_OWN_ACTOR_ID:'7',_Ba:{_rJ:{_O$:{ins:{actorId:'7'}}}},
 KVPV_MODE:{start(m){starts.push(m);},status(){return {mode:starts.at(-1)??'OFF'};}},
 setInterval(){return ++timers;},clearInterval(){clears++;}};
vm.runInNewContext(source,{window:W,Object,String});
const u=W.KVPV_BOSS_UNIFIED;
assert.equal(u.status().enabled,false,'passive until opt-in');
assert.equal(starts.length,0,'never auto-start legacy modes');
u.start();
assert.deepEqual(starts,['BOSS'],'exactly one native mode sender');
assert.throws(()=>u.start('BOSS_TH300'),/Unknown unified/);
assert.equal(timers,1);
assert.throws(()=>u.start('INVALID'),/Unknown unified/);
u.stop();assert.equal(clears,1);
const blank={};assert.doesNotThrow(()=>vm.runInNewContext(source,{window:blank,Object,String}));
assert.equal(blank.KVPV_BOSS_UNIFIED.status().enabled,false);
console.log('PASS unified boss entry: passive default, single mode owner and timerless preflight.');
