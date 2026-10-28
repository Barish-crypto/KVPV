'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const source=fs.readFileSync(__dirname+'/TEST_TH300.cjs','utf8');
const prefix=source.slice(0,source.indexOf("test('holding 305"));
assert(prefix.includes('function harness('),'shared VM harness present');
const ctx={require,__dirname,console};vm.runInNewContext(prefix+'\nglobalThis.make=harness;',ctx);
const actor='10228867268946';
function setup(){
 const q=ctx.make({fastReady:true,defaultDistance:true,newDefault:true,startX:310});
 const native=q.c.combat,events=new Map();let kind='THIEN_QUAN';
 q.actor.on=(name,owner,cb)=>events.set(name,cb);
 q.actor.off=(name,owner,cb)=>{if(events.get(name)===cb)events.delete(name);};
 q.W.KVPV_FAR_SCOPE={status:()=>({kind}),inside:()=>true,eligible:()=>true};
 q.W.KVPV_TQ_POSITION_ONLY={enabled:true,distance:310,heal:false};
 q.c.combat=function(id){events.get(1039)?.('boss1',id);return native.apply(this,arguments);};
 q.s._rtt=[[1001,0,80],[1002,0,80],[1003,0,80],[8001,0,40],[8004,0,40]];
 q.s._wet=[];
 q.mod.setInterleaved(true,310);q.mod.setTianQuanFiveBasics(true,1);
 q.mod.setTianQuanTuyetHoc(true);q.mod.setTianQuanCosmic(false);
 q.mod.start('SCAN');
 const hit=(id,dmg)=>{q.elapse(3);const before=q.calls.length;q.c.combat(id);
    assert.equal(q.calls.length,before+1,'native call was admitted for '+id);
    q.events[1012](actor,id*10000,dmg,1,'boss1');};
 return {q,hit,setKind:v=>kind=v};
}
{
 const {q,hit}=setup();
 for(let i=0;i<2;i++){hit(1001,10);hit(1002,220);hit(8001,9);hit(8004,180);}
 const enabled=q.mod.setTianQuanCosmic(true);
 assert.equal(enabled.enabled,true);
 let status=q.mod.status(false);
 assert.equal(status.cosmic.strongestTH,1002,'best TH from two confirmed direct hits');
 assert.equal(status.thGapBasics.strongestVerifiedBasic,8004,'best native basic from matched hits');
 assert.equal(status.cosmic.active,true);
 assert.equal(status.distanceOnly310,true);assert.equal(status.recoveryEnabled,false);assert.equal(status.goalDistance,310);
 q.elapse(1000);
 let id=q.s.selectSkill();
 assert.equal(id,1002,'highest observed TH chosen when native ready');
 assert.deepEqual(Array.from(q.s._rtt.map(r=>r[2])),[80,80,80,40,40],'native cooldown durations unchanged');
 assert.equal(q.mod.status(false).cosmic.lastNativeSkill,8004);
 // Force only basics available; cosmic should prefer 8004 from matched damage.
 for(const row of q.s._rtt.filter(r=>r[0]<8000))row[1]=Number.MAX_SAFE_INTEGER;
 q.elapse(2);id=q.s.selectSkill();
 assert.equal(id,8004,'highest measured basic selected during normal TH downtime');
 // Restore native-ready TH rows; once every seven confirmed TH casts, choose under-sampled skill.
 for(const row of q.s._rtt.filter(r=>r[0]<8000))row[1]=0;
 while(q.mod.status(false).cosmic.thCasts%7!==6)hit(1001,10);
 // The combo may currently prefer a basic; reset its preference to exercise a ready TH selection.
 q.mod.setInterleaved(true,310);q.elapse(1000);id=q.s.selectSkill();
 assert.equal(id,1003,'low-sample ready TH receives periodic exploration');
 status=q.mod.status(false);
 assert(status.cosmic.explorationChecks>=1);
 assert(status.cosmic.sinceNativeCastMs>=1000);
 assert.equal(status.cosmic.lastNativeSkill,1001);
 // Changed boss occurrence invalidates all learned values.
 q.occ(12345);q.advance(2);
 status=q.mod.status(false);assert.equal(status.cosmic.strongestTH,null);
 assert.equal(status.thGapBasics.strongestVerifiedBasic,null);
 q.mod.stop();
}
{
 const {q,hit,setKind}=setup();
 hit(1001,10);hit(1001,10);hit(1002,200);hit(1002,200);
 q.mod.setTianQuanCosmic(true);setKind('LINH_LUNG');
 assert.equal(q.mod.status(false).cosmic.active,false,'other maps retain legacy native rotation');
 q.mod.setTianQuanCosmic(false);assert.equal(q.mod.status(false).cosmic.enabled,false);
 q.mod.stop();
}
console.log('PASS cosmic TQ: learned TH/basic ranking, exploration, native cooldowns, 310 no-heal, timing telemetry, boss reset, map isolation and off switch');
