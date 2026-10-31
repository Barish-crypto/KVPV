'use strict';
const assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs');
const src=fs.readFileSync(__dirname+'/src/09-combat-engine.js','utf8');
let timer,casts=[],inside=false,ready=true,dead=false,castCooldown=false;
const skill={_rtt:[[8001],[8002],[1001]],_wet:[],selectSkill(){return 8001;}};
const boss={property:{get(k){return k==='hp'?[100,100]:null;}}};
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
 dead=false;await e.tick();assert.deepEqual(casts,[8001],'single native cast');
 e.stop();assert.equal(timer,null);
 const empty={};assert.doesNotThrow(()=>vm.runInNewContext(src,{window:empty,Promise,Date,Number,String,Object,Array,Set}));
 const build=fs.readFileSync(__dirname+'/build.cjs','utf8');
 for(const name of ['08-range-evidence.js','09-modes.js','09-boss-unified.js','11-auto-tianquan.js'])
  assert(!new RegExp('^\\s*"'+name.replaceAll('.','\\.')+'",','m').test(build),name+' still bundled');
 console.log('PASS: single native combat engine with no TH300 bundle, cooldown and outside-map safety.');
})().catch(err=>{console.error(err);process.exitCode=1;});
