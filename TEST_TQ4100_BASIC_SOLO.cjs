'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const suite=fs.readFileSync(__dirname+'/TEST_TH300.cjs','utf8');
const prefix=suite.slice(0,suite.indexOf("test('holding 305"));
assert(prefix.includes('function harness('));
const ctx={require,__dirname,console};
vm.runInNewContext(prefix+'\nglobalThis.make=harness;',ctx);
function make(){
 const q=ctx.make({fastReady:true,defaultDistance:true,newDefault:true,startX:310});
 let kind='THIEN_QUAN';
 q.W.KVPV_FAR_SCOPE={status:()=>({kind}),inside:()=>kind==='THIEN_QUAN',eligible:()=>true};
 q.W.KVPV_TQ_POSITION_ONLY={enabled:true,distance:310,heal:false};
 q.W._Ba._Co._Mo.ins.curLv=4100;
 q.s._rtt=[8001,8002,8003,8004,8005,1001,1002].map(id=>[id,0,50]);q.s._wet=[];
 q.mod.setInterleaved(true,310);
 q.mod.setTianQuanFiveBasics(true,1);q.mod.setTianQuanTuyetHoc(true);
 q.mod.setTianQuanCosmic(true);q.mod.setTianQuanLuoFeng(true);
 q.mod.setTianQuan4100BasicSolo(true);q.mod.start('SCAN');
 return {q,setKind:value=>kind=value,setStage:value=>q.W._Ba._Co._Mo.ins.curLv=value};
}
{
 const {q,setStage,setKind}=make();
 let report=q.mod.status(false),solo=report.luoFeng.basicSolo4100;
 assert.equal(solo.active,true,'4100 solo active only with scope/La Phong');
 assert.equal(report.basicOnly,true,'UI must report basics-only');
 assert.equal(report.skillPriority,'4100_native_basics_only');
 assert.deepEqual(Array.from(report.playerSkillIds),[8001,8002,8003,8004,8005]);
 assert.equal(report.recoveryEnabled,false);
 assert.equal(report.goalDistance,310);
 assert.equal(report.paceMs,1);
 const nativeRows=q.s._rtt.map(r=>r[2]);
 for(let i=0;i<9;i++){
   q.elapse(100);
   const id=q.s.selectSkill();
   assert(id>=8001&&id<=8005,'no TH may be selected on stage 4100: '+id);
   if(id>0){const before=q.calls.length;q.c.combat(id);assert.equal(q.calls.length,before+1,'native basic dispatch '+id);}
 }
 assert.deepEqual(Array.from(q.s._rtt.map(r=>r[2])),Array.from(nativeRows),'native per-skill cooldown constants unchanged');
 q.elapse(100);
 const beforeTH=q.calls.length;
 q.c.combat(1001);q.c.combat(1002);
 assert.equal(q.calls.length,beforeTH,'no direct native TH dispatch in 4100');
 assert(q.mod.status(false).luoFeng.basicSolo4100.blockedTH>=2,'TH guard observed');
 setStage(4101);
 assert.equal(q.mod.status(false).luoFeng.basicSolo4100.active,false,'no 4101 override');
 assert.equal(q.mod.status(false).basicOnly,false,'native mixed profile restored at other floor');
 setStage(4100);setKind('LINH_LUNG');
 assert.equal(q.mod.status(false).luoFeng.basicSolo4100.active,false,'other scope not affected');
 setKind('THIEN_QUAN');
 q.mod.setTianQuan4100BasicSolo(false);
 assert.equal(q.mod.status(false).luoFeng.basicSolo4100.active,false);
 assert.equal(q.mod.status(false).basicOnly,false);
 q.mod.stop();
}
{
 const {q}=make();
 const prior=q.calls.length;q.cooldown(true);q.elapse(100);
 assert.equal(q.s.selectSkill(),-1,'native cooldown must remain authoritative');
 q.c.combat(8001);
 assert.equal(q.calls.length,prior,'no basic cast while native cooldown');
 q.cooldown(false);q.mod.stop();
}
{
 // Startup must auto-arm stage 4100 native basics while preserving other floors.
 const q=ctx.make({fastReady:true,defaultDistance:true,newDefault:true,startX:310});
 q.W.FAKE=null;
 q.W._Ba._Co._Mo.ins.curLv=4100;
 q.W.KVPV_FAR_SCOPE={status:()=>({kind:'THIEN_QUAN'}),inside:()=>true,eligible:()=>true};
 q.W.KVPV_MODE={armTianQuan(){q.mod.start('SCAN');}};
 q.s._rtt=[8001,8002,8003,8004,8005,1001].map(id=>[id,0,50]);q.s._wet=[];
 vm.runInNewContext(fs.readFileSync(__dirname+'/src/11-auto-tianquan.js','utf8'),{
   window:q.W,console:{info(){},warn(){}}
 });
 const st=q.mod.status(false);
 assert.equal(st.luoFeng.basicSolo4100.active,true,'auto startup enables basic solo 4100');
 assert.equal(st.luoFeng.dpsPilot4100.enabled,false,'experimental pilot stays disabled');
 assert.equal(st.skillPriority,'4100_native_basics_only');
 q.elapse(100);
 assert([8001,8002,8003,8004,8005].includes(q.s.selectSkill()),'auto startup must select basic');
 q.mod.stop();
}
{
 const {q}=make();
 // With TH explicitly disabled, learning must still rank confirmed native basics.
 q.mod.setTianQuanTuyetHoc(false);
 assert.equal(q.mod.status(false).luoFeng.active,true,'basic learning works without TH');
 assert.equal(q.mod.status(false).cosmic.active,true,'basic ranking works without TH');
 const actor='10228867268946';
 function hit(id,damage){
   q.elapse(100);
   const before=q.calls.length;
   q.c.combat(id);
   assert.equal(q.calls.length,before+1,'native basic admitted');
   q.events[1012](actor,id*10000,damage,1,'boss1');
 }
 for(let n=0;n<3;n++){
   hit(8001,880352786);hit(8002,853073777);hit(8003,939328243);
   hit(8004,939241294);hit(8005,3624495604);
 }
 const samples=q.mod.status(false).luoFeng.recentBasics;
 assert.equal(samples.find(x=>x.id===8005)?.hits,3);
 q.elapse(1000);
 assert.equal(q.s.selectSkill(),8005,'select strongest confirmed native basic');
 q.mod.stop();
}
console.log('PASS La Phong 4100 basic solo: five native basics, TH selector/dispatch blocked, 310 and 1ms preserved, cooldown respected, floor/scope isolation and manual off.');