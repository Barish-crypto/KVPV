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
 setKind('OUTSIDE');
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
{
 const {q,force}=setup();
 q.mod.setTianQuanTuyetHoc(true);
 assert.equal(q.mod.status(false).basicOnly,false,'startup profile allows TH');
 q.c._jh={isPlaying:true};
 const out=force.setEnabled(true);
 assert.equal(out.active,true,'one-click force enables after switching to basics');
 assert.equal(q.mod.status(false).basicOnly,true,'one-click disables native TH fallback');
 assert.deepEqual(Array.from(q.mod.status(false).playerSkillIds),[8001,8002,8003,8004,8005]);
 assert.equal(q.mod.status(false).paceMs,1);
 assert.equal(q.c.isCooldown(),false);
 assert.equal(q.c._jh.isPlaying,false);
 force.setEnabled(false);q.mod.stop();
}
{
 const {q,force}=setup();
 q.mod.stop();
 let rearmed=0;
 q.W.KVPV_MODE={armTianQuan(){
   rearmed++;q.mod.start('SCAN');return q.mod.status(false);
 }};
 q.mod.setTianQuanTuyetHoc(true);
 const out=force.setEnabled(true);
 assert.equal(rearmed,1,'one-click uses existing map owner when core is stopped');
 assert.equal(out.active,true);
 assert.equal(q.mod.status(false).basicOnly,true);
 force.setEnabled(false);q.mod.stop();
}
{
 const {q,force}=setup();
 const boss=q.c.target;
 q.c.target=null;
 const pending=force.setEnabled(true);
 assert.equal(pending.enabled,true,'explicit opt-in persists while Boss target is missing');
 assert.equal(pending.active,false);
 assert.equal(pending.blocker,'waiting_for_boss_target');
 q.c.target=boss;q.mod.sync();
 assert.equal(force.status().active,true,'auto applies when the native Boss becomes selected');
 force.setEnabled(false);q.mod.stop();
}
{
 const {q,force,setKind}=setup();
 setKind('OUTSIDE');
 const pending=force.setEnabled(true);
 assert.equal(pending.enabled,true);
 assert.equal(pending.active,false);
 assert.equal(pending.blocker,'outside_supported_boss_scene');
 setKind('THIEN_QUAN');q.mod.setTianQuanTuyetHoc(true);
 q.mod.sync();
 assert.equal(q.mod.status(false).basicOnly,true,'pending user intent configures BASIC ONLY on entering TQ');
 assert.equal(force.status().active,true);
 force.setEnabled(false);q.mod.stop();
}
{
 const {q,force}=setup(),native=q.c.isCooldown;
 force.setEnabled(true);
 assert.equal(force.status().active,true);
 q.mod.stop('Đổi phạm vi/map/tầng');
 assert.equal(force.status().enabled,true,'automatic stage transition retains user preference');
 assert.equal(force.status().active,false,'automatic stage transition releases native hook');
 assert.equal(q.c.isCooldown,native,'cooldown restored when TH300 suspends');
 q.mod.start('SCAN');q.mod.sync();
 assert.equal(force.status().active,true,'re-entering stage re-applies force with no Console call');
 q.mod.stop();
 assert.equal(force.status().enabled,false,'manual TH300 stop disables auto force');
 assert.equal(q.c.isCooldown,native);
}
{
 const {q,force}=setup();
 let armed=0;
 q.W.KVPV_MODE={armTianQuan(){armed++;}};
 const startup=fs.readFileSync(__dirname+'/src/11-auto-tianquan.js','utf8');
 vm.runInNewContext(startup,{window:q.W,console:{info(){},warn(){}}});
 assert.equal(armed,1,'startup installs original map watcher once');
 assert.equal(q.mod.status(false).basicOnly,true,'FULL startup uses five-basic-only mode');
 assert.equal(force.status().enabled,false,'FULL startup disables legacy BASIC FORCE for mixed TH');
 assert.equal(force.status().active,false,'mixed TH never enables forced cooldown hooks');
 assert.equal(q.mod.status(false).paceMs,1,'five-basic profile uses 1ms client polling');
 q.mod.stop();
}
{
 const {q,force,setKind}=setup();
 let armed=0;
 setKind('OUTSIDE');
 q.W.KVPV_MODE={armTianQuan(){armed++;}};
 vm.runInNewContext(fs.readFileSync(__dirname+'/src/11-auto-tianquan.js','utf8'),{
   window:q.W,console:{info(){},warn(){}}});
 assert.equal(armed,1);
 assert.equal(force.status().enabled,false,'FULL startup keeps force disabled before Tian Quan');
 assert.equal(force.status().active,false,'no force applied to outside-map combat');
 setKind('THIEN_QUAN');q.mod.sync();
 assert.equal(force.status().active,false,'map entry keeps native mixed TH without force');
 q.mod.stop();
}
{
 // Both dungeon detectors are native-backed; TH300 already owns their
 // skill/movement hooks, and BASIC FORCE only masks verified boss readiness.
 for(const type of ['tower','rune']){
   const q=ctx.make({[type]:true,fastReady:true,defaultDistance:true,newDefault:true,startX:310});
   const expected=type==='tower'?'LINH_LUNG':'PHU_VAN';
   assert.equal(q.W.KVPV_FAR_SCOPE.status().kind,expected);
   q.s._rtt=[8001,8002,8003,8004,8005,1001].map(id=>[id,0,50]);q.s._wet=[];
   q.mod.setInterleaved(true,310);
   q.mod.setTianQuanFiveBasics(true,1);
   q.mod.setTianQuanTuyetHoc(false);
   q.mod.start('SCAN');q.cooldown(true);q.c._jh={isPlaying:true};
   vm.runInNewContext(source,{window:q.W});
   const force=q.W.KVPV_TQ_BASIC_FORCE;
   const enabled=force.setEnabled(true);
   assert.equal(enabled.active,true,expected+' should arm while in dungeon');
   assert.equal(q.mod.status(false).basicOnly,true,expected+' uses five basics only');
   assert.deepEqual(Array.from(q.mod.status(false).playerSkillIds),[8001,8002,8003,8004,8005]);
   assert.equal(q.mod.status(false).paceMs,1);
   assert.equal(q.c.isCooldown(),false);
   assert.equal(q.c._jh.isPlaying,false);
   const native=q.c.isCooldown;
   // Invalid/foreign target causes the native dungeon eligibility gate to release.
   q.c.target={isValid:true,property:{get:k=>k==='type'?4:k==='occ'?999:null}};
   q.mod.sync();
   assert.equal(force.status().active,false,expected+' must not override a player');
   q.c.target=q.boss;q.mod.sync();
   assert.equal(force.status().active,true,expected+' resumes after native boss selection');
   force.setEnabled(false);q.mod.stop();
 }
}
console.log('PASS TQ basic force: persistent opt-in, cooldown+own/inherited animation, native restoration, TQ isolation, no status recursion');
