'use strict';
const fs=require('node:fs'),assert=require('node:assert/strict'),vm=require('node:vm');
const src=fs.readFileSync(__dirname+'/src/00-material-reserve.js','utf8');
const actor='123456789',timers=new Map(),W={
 __KVPV_OWN_ACTOR_ID:actor,
 _Ba:{_rJ:{_O$:{ins:{actorId:actor}}}},
 setInterval(fn,ms){assert.equal(ms,1000);timers.set(7,fn);return 7;},
 clearInterval(id){timers.delete(id);},
 KVPV_UPGRADES:{config:{tienVi:true,daHon:true,checkMs:15000}},
 KVPV_BG_RESOURCES:{config:{enabled:{soulStone:true,gearCraft:true,freeClaim:false}}},
 KVPV_V880:{config:{autoWeapon:true,autoWing:true,autoArm:true}},
 KVPV_V875:{config:{autoFeed:true}},KVPV_V877:{config:{autoFeed:true}}
};
const context=vm.createContext({window:W,Date,console});
vm.runInContext(src,context);
assert.equal(W.KVPV_MATERIAL_RESERVE.active,true);
assert.equal(W.KVPV_UPGRADES.config.tienVi,false);
assert.equal(W.KVPV_UPGRADES.config.daHon,false);
assert.equal(W.KVPV_UPGRADES.config.checkMs,15000);
assert.equal(W.KVPV_BG_RESOURCES.config.enabled.soulStone,false);
assert.equal(W.KVPV_BG_RESOURCES.config.enabled.gearCraft,false);
assert.equal(W.KVPV_BG_RESOURCES.config.enabled.freeClaim,false);
assert.equal(W.KVPV_V880.config.autoWeapon,false);
assert.equal(W.KVPV_V875.config.autoFeed,false);
assert.equal(W.KVPV_V877.config.autoFeed,false);
assert.equal(timers.size,1);
W.KVPV_UPGRADES.config.daHon=true;
timers.get(7)();
assert.equal(W.KVPV_UPGRADES.config.daHon,false,'re-enabled auto upgrade suppressed');
W._Ba._rJ._O$.ins.actorId='999999';W.KVPV_V880.config.autoWeapon=true;
timers.get(7)();assert.equal(W.KVPV_V880.config.autoWeapon,true,'must not change another actor');
W._Ba._rJ._O$.ins.actorId=actor;
vm.runInContext(src,context);
assert.equal(timers.size,1,'hot reload replaces timer');
assert.equal(W.KVPV_MATERIAL_RESERVE._handoff().saved.upgrades.daHon,true);
const pathNames=['src/01-parallel-actions.js','src/26-fabao-fast.js',
 'src/27-craft-low.js','src/28-appearance-auto.js','src/40-soul-stone-fast.js'];
for(const name of pathNames){
 const source=fs.readFileSync(__dirname+'/'+name,'utf8');
 assert(source.includes('KVPV_MATERIAL_RESERVE'),'reserve guard absent '+name);
 new vm.Script(source,{filename:name});
}
const parallel=fs.readFileSync(__dirname+'/src/01-parallel-actions.js','utf8');
assert(parallel.includes("if(reserve()&&d.spend==='materials')return;"));
assert(parallel.includes("reserve()?['claim']:['claim','work']"));
assert(parallel.includes("if(!reserve()){W.KVPV_UPGRADES?.run?.();W.KVPV_BG_RESOURCES?.tick?.();}"));
const appearance=fs.readFileSync(__dirname+'/src/28-appearance-auto.js','utf8');
assert(appearance.includes("S.enabled=false;S.reason='materials_reserved_for_so_tai'"));
const W2={__KVPV_OWN_ACTOR_ID:actor,
 _Ba:{_rJ:{_O$:{ins:{actorId:actor}}}},
 KVPV_MATERIAL_RESERVE:{active:true},
 setInterval(){throw Error('paused appearance must not register timer');},clearInterval(){}
};
vm.runInNewContext(appearance,{window:W2,Date,console});
assert.equal(W2.KVPV_APPEARANCE_AUTO._probe('weapon').ready,false);
assert.equal(W2.KVPV_APPEARANCE_AUTO._handoff().requests,0);
console.log('PASS So Tai materials reserve: flags, actor/reload safety, appearance pause, parallel/legacy spend guards');
