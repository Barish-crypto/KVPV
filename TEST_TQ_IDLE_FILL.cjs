'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const suite=fs.readFileSync(__dirname+'/TEST_TH300.cjs','utf8');
const prefix=suite.slice(0,suite.indexOf("test('holding 305"));
assert(prefix.includes('function harness('),'shared TH300 harness');
const ctx={require,__dirname,console};
vm.runInNewContext(prefix+'\nglobalThis.make=harness;',ctx);
const actor='10228867268946';
function setup({distanceOnly=true}={}){
 const q=ctx.make({adaptive:true,fastReady:true,defaultDistance:true,newDefault:true,startX:310});
 q.W.KVPV_FAR_SCOPE={status:()=>({kind:'THIEN_QUAN'}),inside:()=>true,eligible:()=>true};
 if(distanceOnly)q.W.KVPV_TQ_POSITION_ONLY={enabled:true,distance:310,heal:false};
 q.s._rtt=[[1001,0,200]];q.s._wet=[];
 q.mod.setInterleaved(true,310);
 q.mod.setTianQuanFiveBasics(true,1);
 q.mod.setTianQuanTuyetHoc(true);
 q.mod.start('SCAN');
 return q;
}
{
 const q=setup();
 assert.deepEqual(Array.from(q.calls),[1001],'initial native TH cast');
 q.advance(150);assert.equal(q.calls.length,1,'do not retry before native skill cooldown');
 q.advance(51);assert.deepEqual(Array.from(q.calls),[1001,1001],
   'when native selector genuinely becomes ready, hit-observation TTL does not freeze a second TH');
 const report=q.mod.status(false);
 assert.equal(report.tqIdleFill.repeatCalls,1);
 assert.equal(report.tqIdleFill.maxPendingPerTH,2);
 assert.equal(report.castAttempts,2);
 assert.equal(report.confirmedCastHitPairs,0,'unconfirmed cast calls are not server damage');
 q.advance(250);assert.equal(q.calls.length,2,'two unconfirmed pending TH cap prevents rapid floods');
 q.events[1012](actor,10010000,123,1,'boss1');
 assert.equal(q.mod.status(false).tqIdleFill.ambiguousHits,1,
   'overlapping same-skill TH damage is treated as ambiguous');
 assert.equal(q.mod.status(false).confirmedCastHitPairs,0,
   'ambiguous hit must not count as independently verified range proof');
 q.mod.stop();
}
{
 const q=setup();q.mod.setTianQuanIdleFill(false);
 q.advance(250);
 assert.equal(q.calls.length,1,'opt-out preserves the original proof pending guard');
 assert.equal(q.mod.status(false).tqIdleFill.enabled,false);
 q.mod.stop();
}
{
 const q=setup();q.cooldown(true);q.advance(250);
 assert.equal(q.calls.length,1,'native global cooldown still blocks all extra TH casts');
 q.cooldown(false);q.advance(2);assert.equal(q.calls.length,2,'native recovery allows the bounded retry');
 q.mod.stop();
}
{
 const q=setup({distanceOnly:false});q.advance(250);
 assert.equal(q.calls.length,1,'outside the verified TQ distance-only profile no retry override');
 q.mod.stop();
}
{
 const q=setup();q.advance(250);q.mod.stop();q.mod.start('STRICT');
 q.advance(250);
 assert.equal(q.calls.length,2,'STRICT range proof policy never uses ambiguous pending retry');
 q.mod.stop();
}
console.log('PASS TQ idle fill: native-ready bounded TH repeat, pending cap, ambiguous proof safety, cooldown, opt-out, scene and STRICT isolation');
