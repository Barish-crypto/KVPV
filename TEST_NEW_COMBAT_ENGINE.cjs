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
 assert.equal(e.status().lastCooldown,true);
 assert.equal(e.status().reason,'native_cooldown');
 castCooldown=false;dead=true;await e.tick();assert.equal(casts.length,0,'no attack on death');
 // Legacy HitRun cannot gate the one native sender.
 W.KVPV_HITRUN1={status(){return {running:true,phase:'RETREAT'};}};
 dead=false;await e.tick();assert.deepEqual(casts,[8001],'single native cast');
 assert(e.status().knownSkillIds.includes(8001));
 assert.equal(e.status().reasonCounts.native_cast_requested,1,'native cast reasons counted');
 assert(e.status().lastCastAt>0,'native cast timestamp captured');
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
 W.KVPV_BOSS_TEAM={priority(){return true;}};
 await e.tick();assert.equal(casts.length,prior,'private boss team takes priority over independent boss attacks');
 W.KVPV_BOSS_TEAM={priority(){return false;}};
 W.KVPV_FAR_SCOPE.status=()=>({kind:'TRU_TIEN'});
 await e.tick();assert.equal(casts.length,prior,'Tru Tien must be exclusively owned by PvP controller');
 W.KVPV_FAR_SCOPE.status=()=>({kind:'THIEN_QUAN'});
 e.stop();assert.equal(timer,null);
 const empty={};assert.doesNotThrow(()=>vm.runInNewContext(src,{window:empty,Promise,Date,Number,String,Object,Array,Set}));
 const build=fs.readFileSync(__dirname+'/build.cjs','utf8');
 for(const name of ['08-range-evidence.js','09-modes.js','09-boss-unified.js','11-auto-tianquan.js','00-skill1008-trial.js','00-skill-pacing.js','00-tq-basic-profile.js','10-tq-basic-force.js','10-experimental-boost.js','12-basic-outside.js','13-transform-skills.js','32-xa-menh-lv2-cd0.js','32-thac-an-cd0.js'])
  assert(!new RegExp('^\\s*"'+name.replaceAll('.','\\.')+'",','m').test(build),name+' still bundled');
 console.log('PASS: single native combat engine with no TH300 bundle, cooldown and outside-map safety.');
})().catch(err=>{console.error(err);process.exitCode=1;});
