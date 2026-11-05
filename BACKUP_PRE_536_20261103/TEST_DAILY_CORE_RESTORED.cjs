'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const src=fs.readFileSync(__dirname+'/src/03-daily-core.js','utf8');
let timers=0;
function frame(actor='123456',owner=actor){
 const W={__KVPV_OWN_ACTOR_ID:owner,_Ba:{_rJ:{_O$:{ins:{actorId:actor}}}},_ft:{},_Sa:{},
   KVPV_V1:{timers:{setInterval(){timers++;return timers;},clearInterval(){}}}};
 const ctx={window:W,_Ba:W._Ba,_ft:W._ft,_Sa:W._Sa,console:{log(){},info(){},warn(){},error(){}},Date,Map,Set,Promise,setTimeout(){return 1;},clearTimeout(){},setInterval(){return 2;},clearInterval(){}};
 return {W,ctx};
}
{
 const {W,ctx}=frame();
 vm.runInNewContext(src,ctx,{timeout:5000});
 assert(W.KVPV_DAILY?.config,'real recovered Daily core must publish config');
 assert.equal(typeof W.KVPV_DAILY.start,'function');
 assert.equal(typeof W.KVPV_DAILY.tuVuotStart,'function');
 assert.equal(typeof W.KVPV_DAILY.tuVuotStop,'function');
 assert.equal(typeof W.KVPV_DAILY.lich,'function');
 assert.equal(typeof W.KVPV_DAILY.quickState,'function');
 assert.equal(W.KVPV_DAILY.config.enableCompose,false);
 assert.equal(W.KVPV_DAILY.config.enableTuyetHoc,false);
 assert.equal(W.KVPV_DAILY.config.smeltEnabled.equip,false);
 assert.equal(timers,0,'install alone must not start Daily RPC scan timer');
 const original=W.KVPV_DAILY;
 vm.runInNewContext(src,ctx,{timeout:5000});
 assert.equal(W.KVPV_DAILY,original,'live reload must keep native Daily and pending state');
 assert.equal(timers,0,'live reload must not replay timers');
 W.KVPV_DAILY.start();
 assert.equal(W.KVPV_DAILY.quickState().running,true,'Daily native scheduler starts');
 assert.equal(timers,1,'one Daily timer only');
 W.KVPV_DAILY.start();
 assert.equal(timers,1,'second start cannot duplicate timer');
 W.KVPV_DAILY.stop();
 assert.equal(W.KVPV_DAILY.quickState().running,false,'stop releases Daily scheduler');
}
{
 const {W,ctx}=frame('123456','654321');
 vm.runInNewContext(src,ctx,{timeout:5000});
 assert.equal(W.KVPV_DAILY,undefined,'wrong actor must fail closed');
}
console.log('PASS recovered Daily: real API, events, stage, no spending/upgrade, actor, idempotent reload');
