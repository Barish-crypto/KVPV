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
// Regression: Tian Quan-only 9999x visual multiplier for both the native TH group and all five basics.
for(const id of [1001,1002,1003,1004,1005,1006,1007,1008]){
 const {q,visual,avatar,clip}=setup(id),original=avatar.getActionTween;
 assert.equal(q.mod.setTianQuanVisualSpeed(9999).factor,9999);
 q.mod.start('SCAN');q.pump();
 assert.deepEqual(Array.from(q.calls),[id],'TQ native TH cast '+id);
 assert.equal(visual[0].speed,9999,'TQ TH visible clip x9999 '+id);
 assert.equal(visual[1].speed,1,'unrelated idle clip is not accelerated');
 assert.equal(q.mod.status(false).tqTuyetHocVisualSpeed,9999);
 assert.equal(q.mod.status(false).tqTuyetHocVisualScaled,1);
 assert.equal(q.mod.status(false).tqBasicVisualScaled,0);
 assert.equal(avatar.getActionTween,original,'TQ TH hook is transient '+id);
 assert.equal(q.s._rtt[0][2],1000,'TQ TH native cooldown not modified');
 q.mod.setTianQuanVisualSpeed(1);
 assert.equal(clip.timeScale,1,'TH clip speed restored on user off');
 q.mod.stop();
}
for(const id of [8001,8002,8003,8004,8005]){
 const {q,visual,avatar,clip}=setup(id),original=avatar.getActionTween;
 q.s._rtt=[[id,0,1000]];q.s._wet=[];
 q.mod.setTianQuanVisualSpeed(9999);
 q.mod.start('SCAN');q.pump();
 assert.deepEqual(Array.from(q.calls),[id],'TQ native basic cast '+id);
 assert.equal(visual[0].action,'action-'+id);
 assert.equal(visual[0].speed,9999,'TQ five basic visual x9999 '+id);
 assert.equal(visual[1].speed,1,'unrelated idle remains x1');
 assert.equal(q.mod.status(false).tqBasicVisualSpeed,9999);
 assert.equal(q.mod.status(false).tqBasicVisualCalls,1);
 assert.equal(q.mod.status(false).tqBasicVisualScaled,1);
 assert.equal(q.mod.status(false).tqTuyetHocVisualScaled,0);
 assert.equal(avatar.getActionTween,original,'TQ basic hook restored '+id);
 assert.equal(q.s._rtt[0][2],1000,'native basic cooldown unchanged '+id);
 q.mod.setTianQuanVisualSpeed(1);
 assert.equal(clip.timeScale,1,'basic visual clip restored on disabling '+id);
 q.mod.stop();
}
{
 const {q,visual}=setup(8005,'LINH_LUNG');
 q.mod.setTianQuanVisualSpeed(9999);q.mod.start('SCAN');q.pump();
 assert(visual.every(v=>v.speed===1),'TQ speed does not alter Linh Lung native animations');
 assert.equal(q.mod.status(false).tqBasicVisualCalls,0);
 assert.equal(q.mod.status(false).tqTuyetHocVisualCalls,0);
 q.mod.stop();
}
{
 const {q,visual}=setup(8003,'THIEN_QUAN',false);
 q.s._rtt=[[8003,0,1000]];q.s._wet=[];
 q.mod.setTianQuanVisualSpeed(9999);q.mod.start('SCAN');q.pump();
 assert.equal(q.mod.status(false).tqBasicVisualUnavailable,1,'missing basic action refuses guessed attack animation');
 assert.equal(q.mod.status(false).tqBasicVisualScaled,0);
 assert.equal(visual[0].speed,1);
 q.mod.stop();
}
{
 const {q,visual,clip}=setup(8005),native=q.avatar?.getActionTween;
 q.W.KVPV_TQ_POSITION_ONLY={enabled:true,distance:310,heal:false};
 q.W._Ba._Co._Mo.ins.curLv=4100;
 q.mod.setTianQuanCosmic(true);q.mod.setTianQuanLuoFeng(true);
 q.mod.setTianQuan4100BasicSolo(true);
 q.s._rtt=[[8005,0,1000],[1001,0,1000]];q.s._wet=[];
 q.mod.setTianQuanVisualSpeed(9999);
 q.mod.start('SCAN');q.pump();
 assert.equal(q.mod.status(false).luoFeng.basicSolo4100.active,true,'4100 basic only remains active');
 assert.deepEqual(Array.from(q.calls),[8005],'4100 never emits TH');
 assert.equal(visual[0].speed,9999,'4100 native basic 8005 is visually sped up');
 assert.equal(q.mod.status(false).tqTuyetHocVisualScaled,0);
 q.mod.stop();assert.equal(clip.timeScale,1,'4100 clip restored on stop');
}
{
 const {q}=setup(8001);
 assert.throws(()=>q.mod.setTianQuanVisualSpeed(99999),/visual speed/);
 assert.equal(q.mod.status(false).tqTuyetHocVisualSpeed,99,'invalid combined value does not mutate TH');
 assert.equal(q.mod.status(false).tqBasicVisualSpeed,1,'invalid combined value does not mutate basic');
 q.mod.stop();
}
const startup=fs.readFileSync(__dirname+'/src/11-auto-tianquan.js','utf8');
assert(startup.includes('setTianQuanVisualSpeed?.(9999)'),'auto startup enables Tian Quan-only x9999 visual');
assert(startup.includes('setBasicRotation?.([8001,8002,8003,8004,8005])'),'Tian Quan uses the full five-basic rotation');
assert(startup.includes('setBasicOnly?.(true)'),'Tian Quan uses basic-only mode');
assert(startup.includes('setTianQuanTuyetHoc?.(false)'),'Tian Quan startup disables native TH');
console.log('PASS TQ visual 9999x: TH 1001-1008 and basics 8001-8005 incl 4100, native cooldown unchanged, no other scene, transient hooks, off restores visuals.');
console.log('PASS TH visuals 99x: 1001-1008 native action only; user off, scoped map, unavailable action, restore, 310/1ms no heal');
