'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const suite=fs.readFileSync(__dirname+'/TEST_TH300.cjs','utf8');
const prefix=suite.slice(0,suite.indexOf("test('holding 305"));
assert(prefix.includes('function harness('));
const ctx={require,__dirname,console};vm.runInNewContext(prefix+'\nglobalThis.make=harness;',ctx);
const actor='10228867268946';
function make(){
  const q=ctx.make({fastReady:true,defaultDistance:true,newDefault:true,startX:310}),events=new Map(),native=q.c.combat;
  let kind='THIEN_QUAN',accepted=true;
  q.W.KVPV_FAR_SCOPE={status:()=>({kind}),inside:()=>true,eligible:()=>true};
  q.W.KVPV_TQ_POSITION_ONLY={enabled:true,distance:310,heal:false};
  q.actor.on=(id,owner,cb)=>events.set(id,cb);
  q.actor.off=(id,owner,cb)=>{if(events.get(id)===cb)events.delete(id);};
  q.c.combat=function(id){if(accepted)events.get(1039)?.('boss1',id);return native.apply(this,arguments);};
  q.s._rtt=[[8001,0,50],[8004,0,50],[1001,0,200]];q.s._wet=[];
  q.mod.setInterleaved(true,310);q.mod.setTianQuanFiveBasics(true,1);
  q.mod.setTianQuanTHGapBasics(true,1200);
  return {q,setKind:v=>kind=v,setAccepted:v=>accepted=v};
}
function learn(q){
  q.mod.setTianQuanTuyetHoc(false);q.mod.start('SCAN');
  for(let i=0;i<6;i++){
    if(i)q.advance(2);
    const id=q.calls.at(-1);
    assert([8001,8004].includes(id));
    q.events[1012](actor,id*10000,id===8004?200:10,1,'boss1');
  }
  assert.equal(q.mod.status(false).thGapBasics.strongestVerifiedBasic,8004);
}
function castTH(q){
  q.mod.setTianQuanTuyetHoc(true);q.elapse(2);
  const before=q.calls.length;q.c.combat(1001);
  assert.equal(q.calls.length,before+1);
  q.c._jh={isPlaying:true};return q.calls.length;
}
{
 const {q}=make();learn(q);const before=castTH(q);q.advance(2);
 assert.equal(q.calls.length,before+1,'native-ready 8004 fills the TH visual gap');
 assert.equal(q.calls.at(-1),8004,'pick highest observed direct damage on this Boss');
 const g=q.mod.status(false).thGapBasics;
 assert.equal(g.attempts,1);assert.equal(g.nativeAccepted,1);assert.equal(g.lastBasic,8004);
 assert.equal(q.mod.status(false).goalDistance,310);
 assert.equal(q.mod.status(false).recoveryEnabled,false);
 assert.equal(q.mod.status(false).paceMs,1);
 assert.equal(q.s._rtt[0][2],50,'do not rewrite native cooldown durations');
 assert.equal(q.s._rtt[2][2],200,'do not rewrite TH cooldown durations');
 q.advance(2);q.advance(2);assert.equal(q.mod.status(false).thGapBasics.attempts,1,'at most one gap basic per TH');
 q.mod.stop();
}
{
 const {q}=make();learn(q);const before=castTH(q);q.cooldown(true);q.advance(2);
 assert.equal(q.calls.length,before,'native cooldown blocks gap basic despite animation');
 assert.equal(q.mod.status(false).thGapBasics.nativeAccepted,0);
 assert(q.mod.status(false).thGapBasics.blockedCooldown>=1);q.mod.stop();
}
{
 const {q,setKind}=make();learn(q);const before=castTH(q);setKind('LINH_LUNG');q.advance(2);
 assert.equal(q.calls.length,before,'never overlap outside TQ');q.mod.stop();
}
{
 const {q}=make();learn(q);const before=castTH(q);q.mod.setTianQuanTHGapBasics(false);q.advance(2);
 assert.equal(q.calls.length,before,'operator switch restores normal animation lock');
 assert.equal(q.mod.status(false).thGapBasics.enabled,false);q.mod.stop();
}
{
 const {q}=make();learn(q);const before=castTH(q);q.hp(0);q.advance(2);
 assert.equal(q.calls.length,before,'dead player cannot overlap');q.mod.stop();
}
{
 const {q}=make();learn(q);const before=castTH(q);q.occ(123456);q.advance(2);
 assert.equal(q.mod.status(false).thGapBasics.strongestVerifiedBasic,null,'new Boss resets damage ranking');
 assert(!q.calls.slice(before).includes(8004),'no stale same-Boss gap attack');q.mod.stop();
}
console.log('PASS TQ TH gap: highest matched basic during TH visual tail, single native-ready attempt, cooldown, map, HP, boss reset and off switch');
