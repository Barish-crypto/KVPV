'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const suite=fs.readFileSync(__dirname+'/TEST_TH300.cjs','utf8');
const prefix=suite.slice(0,suite.indexOf("test('holding 305"));
assert(prefix.includes('function harness('));
const ctx={require,__dirname,console};
vm.runInNewContext(prefix+'\nglobalThis.make=harness;',ctx);
const source=fs.readFileSync(__dirname+'/src/10-tq-basic-force.js','utf8');
function setup(){
  const q=ctx.make({fastReady:true,defaultDistance:true,newDefault:true,startX:310});
  let kind='THIEN_QUAN';
  q.W.KVPV_FAR_SCOPE={status:()=>({kind}),inside:()=>kind==='THIEN_QUAN',eligible:()=>true};
  q.W.KVPV_TQ_SCOPE={inside:()=>kind==='THIEN_QUAN'};
  q.s._rtt=[[8001,0,50],[8002,0,50],[8003,0,50],[8004,0,50],[8005,0,50],[1001,0,50]];
  q.s._wet=[];q.mod.setInterleaved(true,310);
  q.mod.setTianQuanFiveBasics(true,1);
  q.mod.setTianQuanTuyetHoc(false);
  q.mod.start('SCAN');q.cooldown(true);
  vm.runInNewContext(source,{window:q.W});
  return {q,force:q.W.KVPV_TQ_BASIC_FORCE,setKind:k=>{kind=k;}};
}
{
 const {q,force,setKind}=setup(),native=q.c.isCooldown;
 const anim={isPlaying:true};
 q.c._jh=anim;
 assert.equal(native(),true);
 assert.equal(anim.isPlaying,true);
 const before=q.mod.report().castAttempts;
 const on=force.setEnabled(true);
 assert.equal(on.active,true);
 assert.equal(on.animationForced,true);
 assert.equal(q.c.isCooldown(),false);
 assert.equal(anim.isPlaying,false);
 // Status and reporting previously triggered infinite recursion when called
 // inside the forced cooldown callback. Neither wrapper calls back into status.
 assert.equal(q.mod.status(false).running,true);
 assert.equal(q.mod.report().nativeCombat.cooldown,false);
 assert.equal(force.status().autoTimeout,false);
 q.elapse(60000);q.mod.sync();
 assert.equal(force.status().enabled,true,'manual OFF is required; no timer expiry');
 assert.equal(q.c.isCooldown(),false);
 assert(q.mod.report().castAttempts>=before);
 const replacement={isPlaying:true};
 q.c._jh=replacement;q.mod.sync();
 assert.equal(anim.isPlaying,true,'old tween is restored on replacement');
 assert.equal(replacement.isPlaying,false,'new tween forced on next tick');
 setKind('LINH_LUNG');
 assert.equal(q.c.isCooldown(),false,'cached predicate until next module tick');
 q.mod.sync();
 assert.equal(q.c.isCooldown,native,'outside scope restores cooldown');
 assert.equal(q.c.isCooldown(),true,'outside scope returns native result');
 assert.equal(replacement.isPlaying,true,'outside scope restores tween');
 assert.equal(force.status().enabled,true,'scope pause does not turn off experiment');
 setKind('THIEN_QUAN');q.mod.sync();
 assert.equal(q.c.isCooldown(),false,'automatically resumes when TQ becomes eligible');
 force.setEnabled(false);
 assert.equal(force.status().enabled,false);
 assert.equal(q.c.isCooldown,native,'manual off restores exact original function');
 assert.equal(replacement.isPlaying,true,'manual off restores exact native animation');
 q.mod.stop();
}
{
 const {q,force}=setup(),native=q.c.isCooldown;
 let playing=true;
 const proto={get isPlaying(){return playing;},set isPlaying(v){playing=v;}};
 const tween=Object.create(proto);
 q.c._jh=tween;
 assert.equal(Object.getOwnPropertyDescriptor(tween,'isPlaying'),undefined);
 force.setEnabled(true);
 assert.equal(force.status().animationForced,true,'inherited animation getter can be shadowed');
 assert.equal(tween.isPlaying,false);
 tween.isPlaying=true;assert.equal(playing,true,'native setter still receives updates');
 force.setEnabled(false);
 assert.equal(Object.getOwnPropertyDescriptor(tween,'isPlaying'),undefined,'inherited getter restored');
 assert.equal(tween.isPlaying,true);
 assert.equal(q.c.isCooldown,native);
 q.mod.stop();
}
{
 const {q,force}=setup(),native=q.c.isCooldown;
 const tween={};
 Object.defineProperty(tween,'isPlaying',{value:true,configurable:false});
 q.c._jh=tween;
 force.setEnabled(true);
 assert.equal(force.status().animationForced,false,'non-configurable foreign property not overwritten');
 assert.equal(tween.isPlaying,true);
 assert.equal(q.c.isCooldown(),false,'cooldown can be tested independently');
 q.mod.stop();
 assert.equal(q.c.isCooldown,native);
}
{
 const {q,force}=setup(),native=q.c.isCooldown;
 force.setEnabled(true);
 const foreign=()=>true;
 q.c.isCooldown=foreign;
 q.mod.sync();
 assert.equal(q.c.isCooldown,foreign,'foreign wrapper must not be overwritten');
 force.setEnabled(false);
 assert.equal(q.c.isCooldown,foreign,'manual off must preserve foreign code');
 q.mod.stop();
}
console.log('PASS TQ basic force: persistent opt-in, cooldown+own/inherited animation, native restoration, TQ isolation, no status recursion');
