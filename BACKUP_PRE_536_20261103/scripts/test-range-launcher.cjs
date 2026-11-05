'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const source=fs.readFileSync(require('node:path').join(__dirname,'../KVPV_DO_TAM_5_CHIEU_THIEN_QUAN.js'),'utf8');
function harness(){let now=1000,kind='OUTSIDE',phase='FIGHT',hp=100,calls=0,controller=true;const timers=new Set();class Clock extends Date{static now(){return now;}}
 const role={property:{get:()=>[hp,100]},getComponent:()=>({target:{}})};
 const W={__KVPV_OWN_ACTOR_ID:'123',_Ba:{_rJ:{_O$:{ins:{actorId:'123'}}}},_C:{_Ba:{instance:{getRole:()=>role}}},_d:{_Yct:{}},KVPV_FAR_SCOPE:{status:()=>({kind}),eligible:()=>true},KVPV_HITRUN1:{status:()=>({phase})},KVPV_TH300:{status:()=>({running:controller}),rangeReport:()=>({}),setTianQuanFiveBasics(){},startTianQuanBasicRangeTest(){calls++;}},console:{info(){},table(){},warn(){}},setTimeout(fn){timers.add(fn);return fn;},clearTimeout(fn){timers.delete(fn);}};
 return {W,load(){vm.runInNewContext(source,{window:W,Date:Clock});},poll(ms=500){now+=ms;const next=[...timers];timers.clear();for(const fn of next)fn();},scope(v){kind=v;},phase(v){phase=v;},hp(v){hp=v;},calls:()=>calls,timers};}
const a=harness();delete a.W.KVPV_TH300.startTianQuanBasicRangeTest;a.load();assert.equal(a.W.KVPV_TQ_RANGE_START.status().reason,'full_missing_range_api');assert.equal(a.timers.size,0);
const b=harness();b.load();assert.equal(b.W.KVPV_TQ_RANGE_START.status().reason,'waiting_tianquan');b.scope('THIEN_QUAN');b.phase('RETREAT');b.poll();assert.equal(b.calls(),0);b.phase('FIGHT');b.hp(60);b.poll();assert.equal(b.calls(),0);b.hp(100);b.poll();assert.equal(b.calls(),1);assert.equal(b.timers.size,0);assert.equal(b.W.KVPV_TQ_RANGE_START.status().started,true);
const c=harness();c.load();c.poll(60000);assert.equal(c.W.KVPV_TQ_RANGE_START.status().reason,'wait_timeout');assert.equal(c.timers.size,0);
const d=harness();d.W._Ba._rJ._O$.ins.actorId='other';d.load();assert.equal(d.W.KVPV_TQ_RANGE_START.status().reason,'wrong_game_frame');assert.equal(d.calls(),0);
console.log('PASS range launcher: old FULL/wrong frame diagnostics, bounded wait, TQ/FIGHT/HP gates, exactly one start and timeout cleanup.');
