'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const source=fs.readFileSync(__dirname+'/src/00-material-reserve.js','utf8');
const actor='123',W={
 __KVPV_OWN_ACTOR_ID:actor,
 KVPV_UPGRADES:{config:{tienVi:false,daHon:false}},
 KVPV_BG_RESOURCES:{config:{enabled:{soulStone:false}}},
 KVPV_V880:{config:{autoWeapon:false,autoWing:false,autoArm:false}},
 KVPV_V875:{config:{autoFeed:false}},KVPV_V877:{config:{autoFeed:false}}
};
let stopped=0;
W.KVPV_MATERIAL_RESERVE={
 active:true,stop:()=>{stopped++;},
 _handoff:()=>({actor,saved:{
   upgrades:{tienVi:true,daHon:false},
   resources:{soulStone:true},
   weaponWingArm:{autoWeapon:true,autoWing:true,autoArm:true},
   pet:{autoFeed:true},mount:{autoFeed:true}
 }})
};
vm.runInNewContext(source,{window:W,Object,Date,console});
assert.equal(stopped,1);
assert.equal(W.KVPV_MATERIAL_RESERVE.active,false);
assert.equal(W.KVPV_MATERIAL_RESERVE.status().timerActive,false);
assert.equal(W.KVPV_UPGRADES.config.tienVi,true);
assert.equal(W.KVPV_UPGRADES.config.daHon,false,'originally disabled setting stays disabled');
assert.equal(W.KVPV_BG_RESOURCES.config.enabled.soulStone,true);
assert.equal(W.KVPV_V880.config.autoWeapon,true);
assert.equal(W.KVPV_V875.config.autoFeed,true);
assert.equal(W.KVPV_V877.config.autoFeed,true);
W.KVPV_UPGRADES.config.tienVi=false;
assert.equal(W.KVPV_MATERIAL_RESERVE.apply(),false);
assert.equal(W.KVPV_UPGRADES.config.tienVi,false,'no material lock re-applied');
vm.runInNewContext(source,{window:W,Object,Date,console});
assert.equal(W.KVPV_MATERIAL_RESERVE.active,false);
const appearance=fs.readFileSync(__dirname+'/src/28-appearance-auto.js','utf8');
assert(!appearance.includes('materials_reserved_for_so_tai'));
assert(!appearance.includes('KVPV_MATERIAL_RESERVE?.active===true'));
new vm.Script(appearance);
for(const name of ['src/01-parallel-actions.js','src/26-fabao-fast.js','src/27-craft-low.js','src/40-soul-stone-fast.js']){
 new vm.Script(fs.readFileSync(__dirname+'/'+name,'utf8'),{filename:name});
}
console.log('PASS So Tai disabled; preexisting upgrade settings restored and other modules untouched');
