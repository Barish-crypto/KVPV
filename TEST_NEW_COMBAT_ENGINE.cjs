'use strict';
const assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs');
const src=fs.readFileSync(__dirname+'/src/09-combat-engine.js','utf8');
let timer,casts=[],inside=false,ready=true,dead=false,castCooldown=false;
const skill={_rtt:[[8001],[8002],[1001]],_wet:[],selectSkill(){return 8001;}};
const boss={property:{get(k){return k==='type'?1:k==='hp'?[100,100]:null;}}};
const combat={target:boss,isCooldown(){return castCooldown;},combat(id){casts.push(id);}};
const player={getComponent(k){return k==='skill'?skill:k==='combat'?combat:null;}};
const W={__KVPV_OWN_ACTOR_ID:'7',_Ba:{_rJ:{_O$:{ins:{actorId:'7',get isDead(){return dead;}}}}},
 _C:{_Ba:{instance:{getRole(){return player;}}}},_d:{_Yct:{_Eet:'skill',_Het:'combat'}},
 KVPV_FAR_SCOPE:{inside(){return inside;}},setInterval(fn){timer=fn;return 1;},clearInterval(){timer=null;}};
vm.runInNewContext(src,{window:W,Promise,Date,Number,String,Object,Array,Set});
(async()=>{const e=W.KVPV_COMBAT_ENGINE;assert(e.status().enabled);
 await e.tick();assert.equal(casts.length,0,'no attack outside boss scope');
 inside=true;castCooldown=true;await e.tick();assert.equal(casts.length,0,'respect native cooldown');
 castCooldown=false;dead=true;await e.tick();assert.equal(casts.length,0,'no attack on death');
 W.KVPV_HITRUN1={status(){return {running:true,phase:'RETREAT'};}};
 dead=false;await e.tick();assert.equal(casts.length,0,'recovery must own movement and block combat');
 W.KVPV_HITRUN1={status(){return {running:true,phase:'FIGHT'};}};
 dead=false;await e.tick();assert.deepEqual(casts,[8001],'single native cast');
 const saved=combat.target;combat.target={property:{get(k){return k==='type'?4:null;}}};
 await e.tick();assert.deepEqual(casts,[8001],'never attack a player with boss engine');
 combat.target={property:{get(k){return k==='hp'?[100,100]:null;}}};
 await e.tick();assert.deepEqual(casts,[8001],'unknown target type must never cast');
 combat.target=saved;
 let selections=0;
 W._Ba._rJ._O$.ins.selectTar=function(kind,occ){assert.equal(kind,1);assert.equal(occ,-1);selections++;};
 combat.target=null;await e.tick();await e.tick();
 assert.equal(selections,1,'stale target search throttled');
 combat.target=saved;
 // Revalidation after a pending microtask: the boss scene may disappear mid-cast.
 const prior=casts.length;
 const pending=e.tick();inside=false;await pending;
 assert.equal(casts.length,prior,'cannot cast after the boss scene changes');
 inside=true;
 W.KVPV_EVENT_PRIORITY={hold(){return true;}};
 await e.tick();assert.equal(casts.length,prior,'timed event preempts boss combat');
 W.KVPV_EVENT_PRIORITY={hold(){return false;}};
 e.stop();assert.equal(timer,null);
 const empty={};assert.doesNotThrow(()=>vm.runInNewContext(src,{window:empty,Promise,Date,Number,String,Object,Array,Set}));
 const build=fs.readFileSync(__dirname+'/build.cjs','utf8');
 for(const name of ['08-range-evidence.js','09-modes.js','09-boss-unified.js','11-auto-tianquan.js'])
  assert(!new RegExp('^\\s*"'+name.replaceAll('.','\\.')+'",','m').test(build),name+' still bundled');
 console.log('PASS: single native combat engine with no TH300 bundle, cooldown and outside-map safety.');
})().catch(err=>{console.error(err);process.exitCode=1;});
