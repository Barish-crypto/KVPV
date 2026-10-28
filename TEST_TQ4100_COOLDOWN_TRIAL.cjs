'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const suite=fs.readFileSync(__dirname+'/TEST_TH300.cjs','utf8');
const prefix=suite.slice(0,suite.indexOf("test('holding 305"));
assert(prefix.includes('function harness('));
const ctx={require,__dirname,console};
vm.runInNewContext(prefix+'\nglobalThis.make=harness;',ctx);
function setup(){
 const q=ctx.make({fastReady:true,defaultDistance:true,newDefault:true,startX:310});
 let kind='THIEN_QUAN';
 q.W.KVPV_FAR_SCOPE={status:()=>({kind}),inside:()=>kind==='THIEN_QUAN',eligible:()=>true};
 q.W.KVPV_TQ_POSITION_ONLY={enabled:true,distance:310,heal:false};
 q.W._Ba._Co._Mo.ins.curLv=4100;
 q.s._rtt=[8001,8002,8003,8004,8005,1001].map(id=>[id,0,50]);
 q.s._wet=[];
 q.mod.setInterleaved(true,310);
 q.mod.setTianQuanFiveBasics(true,1);
 q.mod.setTianQuanTuyetHoc(true);
 q.mod.setTianQuanCosmic(true);
 q.mod.setTianQuanLuoFeng(true);
 q.mod.setTianQuan4100BasicSolo(true);
 q.mod.start('SCAN');q.cooldown(true);
 return {q,setKind:v=>kind=v,setStage:v=>q.W._Ba._Co._Mo.ins.curLv=v};
}
{
 const {q,setStage,setKind}=setup(),original=q.c.isCooldown;
 assert.equal(original(),true);
 let trial=q.mod.setTianQuan4100CooldownOverride(true,1000);
 assert.equal(trial.active,true);
 assert.equal(q.c.isCooldown(),false,'client hook returns false on stage 4100');
 assert.equal(q.mod.status(false).cooldown4100Trial.falseReturns>0,true);
 q.elapse(1001);q.mod.sync();
 assert.equal(q.c.isCooldown(),true,'expiration restores native');
 assert.equal(q.c.isCooldown,original,'native method identity restored');
 trial=q.mod.setTianQuan4100CooldownOverride(true,15000);
 assert.equal(trial.active,true);
 setStage(4101);
 assert.equal(q.c.isCooldown(),true,'outside stage call falls back to native immediately');
 q.mod.sync();
 assert.equal(q.c.isCooldown,original,'leaving floor restores');
 setStage(4100);
 q.mod.setTianQuan4100CooldownOverride(true,10000);
 setKind('LINH_LUNG');
 assert.equal(q.c.isCooldown(),true,'outside scope falls back to native');
 q.mod.sync();
 assert.equal(q.c.isCooldown,original);
 setKind('THIEN_QUAN');
 q.mod.setTianQuan4100CooldownOverride(true,10000);
 q.mod.setTianQuan4100BasicSolo(false);
 assert.equal(q.c.isCooldown,original,'disabling basic solo restores cooldown');
 q.mod.setTianQuan4100BasicSolo(true);
 q.mod.setTianQuan4100CooldownOverride(true,10000);
 q.mod.stop();
 assert.equal(q.c.isCooldown,original,'stop restores native');
 assert.equal(q.c.isCooldown(),true);
}
{
 const {q}=setup(),base=q.c.isCooldown;
 assert.throws(()=>q.mod.setTianQuan4100CooldownOverride(true,15001));
 assert.equal(q.c.isCooldown,base);
 q.mod.setTianQuan4100CooldownOverride(true,2000);
 const foreign=()=>true;
 q.c.isCooldown=foreign;
 q.mod.sync();
 assert.equal(q.c.isCooldown,foreign,'no overwriting foreign hooks');
 q.mod.stop();
 assert.equal(q.c.isCooldown,foreign,'foreign method survives cleanup');
}
{
 const {q}=setup();
 let before=q.mod.dps(false)?.current?.summary?.matchedDamage??0;
 q.mod.setLocalLogAutoClear(true,1000);
 q.elapse(1001);q.mod.sync();
 const st=q.mod.status(false).localLogCleanup;
 assert.equal(st.clears,1,'diagnostics pruned once');
 assert.equal(st.chromeDevToolsWebSocketFramesCleared,false,'must not claim DevTools WS cleanup');
 assert.equal(st.countersAndMatchedDpsPreserved,true);
 assert.equal(q.mod.dps(false)?.current?.summary?.matchedDamage??0,before);
 assert.equal(q.mod.history().length,0,'script-owned history cleared');
 q.mod.setLocalLogAutoClear(false);
 q.elapse(1001);q.mod.sync();
 assert.equal(q.mod.status(false).localLogCleanup.clears,1,'disabled stops cleanup');
 q.mod.stop();
}
console.log('PASS TQ4100 cooldown override: scoped opt-in false, expiry, stop, native restoration, foreign-hook, local log cleanup.');