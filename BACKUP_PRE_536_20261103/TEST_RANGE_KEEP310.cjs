'use strict';
const vm=require('node:vm'),fs=require('node:fs'),assert=require('node:assert/strict');
const src=fs.readFileSync(__dirname+'/src/09-range-keeper310.js','utf8');
let moves=[],inside=true,kind='THIEN_QUAN',hp=100,retreat=false,actor='123456';
const you={property:{get(k){return k==='position'?{x:100,y:0}:null;}},getComponent(k){return k==='move'?mover:k==='combat'?combat:null;}};
const target={property:{get(k){return {position:{x:0,y:0},type:1,hp:[100,100]}[k];}}};
const mover={moveTo(x,y){moves.push([x,y]);},running(){return false;}},combat={target};
const W={__KVPV_OWN_ACTOR_ID:'123456',_Ba:{_rJ:{_O$:{ins:{get actorId(){return actor;},get isDead(){return hp<=0;}}}}},
 _C:{_Ba:{instance:{getRole(){return you;}}}},_d:{_Yct:{_zet:'move',_Het:'combat'}},
 KVPV_FAR_SCOPE:{status(){return {kind,inside};},eligible(){return true;}},
 setInterval(){return 1;},clearInterval(){}};
vm.runInNewContext(src,{window:W,Date,Math,Number,String,Object});
const k=W.KVPV_RANGE_KEEP310;
k.tick();assert.equal(moves.length,1);assert(Math.abs(moves[0][0]-310)<1e-9);
kind='LINH_LUNG';k.tick();assert.equal(k.status().scope,'LINH_LUNG');
kind='PHU_VAN';k.tick();assert.equal(k.status().scope,'PHU_VAN');
inside=false;k.tick();assert.equal(k.status().reason,'outside_scope');
inside=true;kind='THIEN_QUAN';actor='other';k.tick();assert.equal(moves.length,1,'actor mismatch cannot move');
actor='123456';W.KVPV_HITRUN1={status(){return {running:true,phase:'RETREAT'};}};k.tick();assert.equal(k.status().reason,'yield_recovery');
W.KVPV_HITRUN1=null;W.KVPV_ENTRY_POLICY={manual:true};k.tick();assert.equal(k.status().reason,'yield_priority');
k.stop();assert.equal(k.status().enabled,false);
console.log('PASS 310 native keeper: 3 scopes, identity, native move, no fighting during retreat/manual');
