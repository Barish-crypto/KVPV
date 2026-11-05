'use strict';
const fs=require('node:fs'),assert=require('node:assert/strict'),vm=require('node:vm');
const actor='123',timers=new Map(),W={
 __KVPV_OWN_ACTOR_ID:actor,_Ba:{_rJ:{_O$:{ins:{actorId:actor}}}},
 setInterval(fn,ms){assert.equal(ms,1000);timers.set(1,fn);return 1;},
 clearInterval(id){timers.delete(id);},
 KVPV_UPGRADES:{config:{tienVi:true,daHon:true,checkMs:15000}},
 KVPV_BG_RESOURCES:{config:{enabled:{gearCraft:true,freeClaim:false}}},
 KVPV_V880:{config:{autoWeapon:true,autoWing:true,autoArm:true}},
 KVPV_V875:{config:{autoFeed:true}},KVPV_V877:{config:{autoFeed:true}}
};
W.KVPV_MATERIAL_RESERVE={stop(){timers.clear();},_handoff(){return {actor,saved:{upgrades:{tienVi:true}}};}};
const source=fs.readFileSync(__dirname+'/src/00-material-reserve.js','utf8');
vm.runInNewContext(source,{window:W,Object,Date,console});
assert.equal(W.KVPV_MATERIAL_RESERVE.active,true);
assert.equal(W.KVPV_UPGRADES.config.tienVi,false);
assert.equal(W.KVPV_UPGRADES.config.daHon,false);
assert.equal(W.KVPV_BG_RESOURCES.config.enabled.gearCraft,false);
assert.equal(W.KVPV_V880.config.autoWeapon,false);
assert.equal(W.KVPV_V875.config.autoFeed,false);
assert.equal(W.KVPV_V877.config.autoFeed,false);
assert.equal(W.KVPV_UPGRADES.config.checkMs,15000);
W.KVPV_UPGRADES.config.daHon=true;timers.get(1)();
assert.equal(W.KVPV_UPGRADES.config.daHon,false);
const appearance=fs.readFileSync(__dirname+'/src/28-appearance-auto.js','utf8');
assert(appearance.includes("S.reason='automatic_upgrades_disabled_by_user'"));
assert(appearance.includes("W.KVPV_MATERIAL_RESERVE?.active===true||!owned()"));
new vm.Script(appearance);
for(const name of ['src/01-parallel-actions.js','src/26-fabao-fast.js','src/27-craft-low.js','src/40-soul-stone-fast.js'])new vm.Script(fs.readFileSync(__dirname+'/'+name,'utf8'));
console.log('PASS: all automatic upgrades disabled, reserve guard active, no old settings restored');
