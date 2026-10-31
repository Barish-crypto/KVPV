'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const src=fs.readFileSync(__dirname+'/src/09-combat-engine.js','utf8');
let inside=false,range=false,cooldown=false,dead=false,casts=0;
const target={property:{get(k){return k==='type'?1:k==='hp'?[100,100]:undefined;}}};
const combat={target,isCooldown(){return cooldown;},isValidRange(){return range;},combat(){casts++;}};
const skill={_rtt:[[8001]],_wet:[],selectSkill(){return 8001;}};
const role={getComponent(k){return k==='skill'?skill:k==='combat'?combat:null;}};
const W={__KVPV_OWN_ACTOR_ID:'7',_Ba:{_rJ:{_O$:{ins:{actorId:'7',get isDead(){return dead;}}}}},
 _d:{_Yct:{_Eet:'skill',_Het:'combat'}},_C:{_Ba:{instance:{getRole(){return role;}}}},
 KVPV_FAR_SCOPE:{inside(){return inside;}},setInterval(){return 1;},clearInterval(){}};
vm.runInNewContext(src,{window:W,Promise,Date,Number,String,Object,Array,Set});
(async()=>{
 const engine=W.KVPV_COMBAT_ENGINE;
 assert.equal(engine.status().legacyModes,false);
 await engine.tick();assert.equal(casts,0,'must not cast outside eligible boss scene');
 inside=true;await engine.tick();assert.equal(casts,0,'native out-of-range blocks casts');
 assert.equal(engine.status().reason,'native_out_of_range');
 range=true;cooldown=true;await engine.tick();assert.equal(casts,0,'native cooldown blocks casts');
 cooldown=false;dead=true;await engine.tick();assert.equal(casts,0,'dead actor blocks casts');
 dead=false;W.KVPV_HITRUN1={status(){return {running:true,phase:'RETREAT'};}};
 await engine.tick();assert.equal(casts,0,'recovery retains ownership');
 W.KVPV_HITRUN1={status(){return {running:true,phase:'FIGHT'};}};
 await engine.tick();assert.equal(casts,1,'one native attack only when safe');
 engine.stop();
 console.log('PASS unified Boss safe range: native distance, cooldown, recovery, death and scene guards');
})().catch(e=>{console.error(e);process.exitCode=1;});
