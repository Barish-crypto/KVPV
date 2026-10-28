'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const source=fs.readFileSync(__dirname+'/TEST_TH300.cjs','utf8');
const prefix=source.slice(0,source.indexOf("test('holding 305"));
assert(prefix.includes('function harness('));
const context={require,__dirname,console};
vm.runInNewContext(prefix+'\nglobalThis.make=harness;',context);
function setup(id,kind='THIEN_QUAN',withAction=true){
 const q=context.make({fastReady:true,defaultDistance:true,newDefault:true,startX:310});
 q.W.KVPV_FAR_SCOPE={status:()=>({kind}),inside:()=>true,eligible:()=>true};
 q.s._rtt=[[id,0,1000],[8001,0,200]];q.s._wet=[];
 const native=q.c.combat,events=new Map(),visual=[],clip={timeScale:1};
 q.actor.on=(e,o,fn)=>events.set(e,fn);
 q.actor.off=(e,o,fn)=>{if(events.get(e)===fn)events.delete(e);};
 const avatar={getActionTween(action,reset,speed){
  visual.push({action,speed});
  if(action==='action-'+id)this.getCurAction.timeScale=speed;
  return {isPlaying:false};
 },getCurAction:clip};
 q.c._Qrt=avatar;
 q.c._mvt=skill=>withAction?[0,0,0,0,0,'action-'+skill]:[0,0,0,0,0,null];
 q.c.combat=function(skill){
  this._Qrt.getActionTween('action-'+skill,false,1);
  this._Qrt.getActionTween('idle',false,1);
  events.get(1039)?.('boss1',skill);
  return native.apply(this,arguments);
 };
 q.mod.setInterleaved(true,310);q.mod.setTianQuanFiveBasics(true,1);
 q.mod.setTianQuanTuyetHoc(true);
 return {q,visual,avatar,clip};
}
for(const id of [1001,1002,1003,1004,1005,1006,1007,1008]){
 const {q,visual,avatar,clip}=setup(id),native=avatar.getActionTween;
 q.mod.start('SCAN');q.pump();
 assert.deepEqual(Array.from(q.calls),[id],'exactly one native cast for '+id);
 assert.equal(q.mod.status(false).tqTuyetHocVisualSpeed,99);
 assert.equal(q.mod.status(false).tqTuyetHocVisualScaled,1);
 assert.equal(q.mod.status(false).tqTuyetHocVisualCalls,1);
 assert.equal(visual[0].action,'action-'+id);
 assert.equal(visual[0].speed,99,'only TH action accelerated for '+id);
 assert.equal(visual[1].speed,1,'unrelated action retains native speed');
 assert.equal(avatar.getActionTween,native,'visual hook must be transient');
 assert.equal(clip.timeScale,99);
 assert.equal(q.s._rtt[0][2],1000,'native skill row cooldown unchanged');
 assert.equal(q.mod.status(false).goalDistance,310);
 assert.equal(q.mod.status(false).paceMs,1);
 assert.equal(q.mod.status(false).recoveryEnabled,true,'test harness has no TQ no-heal policy');
 q.mod.setTianQuanTuyetHocVisualSpeed(1);
 assert.equal(clip.timeScale,1,'disabling restores altered clip');
 assert.equal(q.mod.status(false).tqTuyetHocVisualSpeed,1);
 q.mod.stop();
}
{
 const {q,visual}=setup(1003);
 q.mod.setTianQuanTuyetHocVisualSpeed(1);q.mod.start('SCAN');q.pump();
 assert.equal(visual[0].speed,1,'operator off uses unmodified native animation');
 assert.equal(q.mod.status(false).tqTuyetHocVisualScaled,0);q.mod.stop();
}
{
 const {q,visual}=setup(1004,'LINH_LUNG');
 q.mod.start('SCAN');q.pump();
 assert.equal(visual[0].speed,1,'non-TQ map never changes TH visual speed');
 assert.equal(q.mod.status(false).tqTuyetHocVisualCalls,0);q.mod.stop();
}
{
 const {q,visual}=setup(1006,'THIEN_QUAN',false);
 q.mod.start('SCAN');q.pump();
 assert.equal(visual[0].speed,1,'no known action does not guess animation name');
 assert.equal(q.mod.status(false).tqTuyetHocVisualUnavailable,1);
 assert.equal(q.mod.status(false).tqTuyetHocVisualScaled,0);q.mod.stop();
}
{
 const {q,visual,avatar,clip}=setup(1001);
 q.W.KVPV_TQ_POSITION_ONLY={enabled:true,distance:310,heal:false};
 q.mod.setTianQuanTuyetHocVisualSpeed(30);
 q.mod.start('SCAN');q.pump();
 assert.equal(visual[0].speed,30);
 assert.equal(q.mod.status(false).recoveryEnabled,false);
 assert.equal(q.mod.status(false).distanceOnly310,true);
 q.mod.stop();assert.equal(clip.timeScale,1,'stop restores last applied visual speed');
 assert.equal(avatar.getActionTween!==undefined,true);
}
console.log('PASS TH visuals 99x: 1001-1008 native action only; user off, scoped map, unavailable action, restore, 310/1ms no heal');
