'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const shared=fs.readFileSync(__dirname+'/test-melee-trial.cjs','utf8');
const prefix=shared.slice(0,shared.indexOf('const q=harness();')).replace('../KVPV_BOSS_AP_SAT_THU.js','../KVPV_BOSS_AP_SAT_TRUC_TIEP.js').replace('return {W,moves,timers','return {role,W,moves,timers');
const context={require,__dirname,console};vm.runInNewContext(prefix+'\nglobalThis.make=harness;',context);
function make(){const q=context.make(),Selector=function(){},rows=[[1001,0,1000]];let reads=0;
 const selector={_f7t(){reads++;rows[0][1]=1000;return 1001;}},native=selector._f7t,original=q.role.getComponent;
 q.W._d._Yct._Eet=Selector;q.role.getComponent=t=>t===Selector?selector:original(t);q.W.KVPV_TQ112.status=()=>({});
 return {q,selector,native,rows,reads:()=>reads};}
const a=make(),nativeCombat=a.q.combat.combat;a.q.load();assert.equal(a.q.moves[0].x,80);assert.equal(a.q.W.KVPV_MELEE_TRIAL.status().requiresForecast,false);
a.q.position(300);assert.equal(a.selector._f7t(),-1);assert.equal(a.reads(),0);assert.equal(a.rows[0][1],0);assert.equal(a.q.combat.combat(1001),undefined);
a.q.position(80);assert.equal(a.selector._f7t(),1001);assert.equal(a.q.combat.combat(1001),'native');assert.equal(a.q.combat.combat(1001),undefined);a.q.tick();assert.equal(a.q.armed(),1);assert.equal(a.selector._f7t,a.native);assert.equal(a.q.combat.combat,nativeCombat);
const b=make();b.q.load();b.q.tick(5000);assert.equal(b.q.W.KVPV_MELEE_TRIAL.status().running,false);assert.equal(b.q.timers.size,0);assert.equal(b.selector._f7t,b.native);
const c=make();c.q.load();c.q.phase('DODGE');c.q.position(300);c.q.tick(1000);assert.equal(c.q.moves.length,1);c.q.W.KVPV_MELEE_TRIAL.restore();assert.equal(c.q.timers.size,0);
const d=make();d.q.W.KVPV_TQ_SCOPE.inside=()=>false;assert.throws(()=>d.q.load(),/Boss Thiên Quan/);assert.equal(d.q.moves.length,0);assert.equal(d.q.timers.size,0);
const e=make();e.q.load();e.q.W.KVPV_TQ_SCOPE.inside=()=>false;e.q.tick();assert.equal(e.q.W.KVPV_MELEE_TRIAL.status().running,false);assert.equal(e.q.timers.size,0);
console.log('PASS direct melee: no forecast prerequisite, 80-unit approach, no selector cooldown consumption outside melee, one native call, dodge priority, timeout and hook restoration.');
