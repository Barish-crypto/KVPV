'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const suite=fs.readFileSync(__dirname+'/TEST_TH300.cjs','utf8');
const prefix=suite.slice(0,suite.indexOf("test('holding 305"));
assert(prefix.includes('function harness('));
const ctx={require,__dirname,console};
vm.runInNewContext(prefix+'\nglobalThis.make=harness;',ctx);
function make(){
 const q=ctx.make({fastReady:true,defaultDistance:true,newDefault:true,startX:310});
 let kind='THIEN_QUAN',bossHp=1000000,maximum=1000000;
 const original=q.boss.property.get;
 q.boss.property.get=function(k){return k==='hp'?[bossHp,maximum]:original(k);};
 q.W.KVPV_FAR_SCOPE={status:()=>({kind}),inside:()=>kind==='THIEN_QUAN',eligible:()=>true};
 q.W.KVPV_TQ_POSITION_ONLY={enabled:true,distance:310,heal:false};
 q.W._Ba._Co._Mo.ins.curLv=4100;
 q.s._rtt=[[8001,0,50],[1001,0,50],[1002,0,50]];q.s._wet=[];
 q.mod.setInterleaved(true,310);q.mod.setTianQuanFiveBasics(true,1);
 q.mod.setTianQuanTuyetHoc(true);q.mod.setTianQuanCosmic(true);
 q.mod.setTianQuanLuoFeng(true);
 assert.equal(q.mod.status(false).luoFeng.dpsPilot4100.enabled,false,'opt in');
 q.mod.setTianQuan4100Pilot(true);q.mod.start('SCAN');
 function hits(damage,seconds=18){
   for(let i=0;i<seconds;i++){
     bossHp-=damage;assert(bossHp>0);q.advance(1000);
   }
 }
 return {q,hits,kind:v=>{kind=v;},stage:v=>{q.W._Ba._Co._Mo.ins.curLv=v;},
   hp:v=>{bossHp=v;},status:()=>q.mod.status(false).luoFeng.dpsPilot4100};
}
{
 const x=make();
 x.hits(1000);
 let p=x.status();
 assert.equal(p.phase,'thOnly','baseline phase complete');
 assert.equal(p.combo.durationMs,18000);
 assert.equal(p.combo.observedHpDps,1000);
 assert.equal(p.activeMode,'thOnly');
 x.q.elapse(2);
 for(const row of x.q.s._rtt)row[1]=0;
 assert([1001,1002].includes(x.q.s.selectSkill()),'TH-only phase excludes basics');
 x.hits(1800);
 p=x.status();
 assert.equal(p.phase,'chosen');
 assert.equal(p.selectedMode,'thOnly','stronger TH-only selected');
 assert(Math.abs(p.thOnly.observedHpDps-1800)<5,'measurement tolerates 2ms selector probe');
 const diagnosis=x.q.mod.tianQuan4100Diagnosis(false);
 assert.equal(diagnosis.stage,4100);
 assert.equal(diagnosis.dpsPilot.selectedMode,'thOnly');
 assert.equal(Array.isArray(diagnosis.recommendations),true);
 assert.equal(diagnosis.distance,310);
 x.stage(4101);
 assert.equal(x.status().active,false,'stage gated');
 assert.equal(x.status().activeMode,'combo','no TH-only outside stage 4100');
 x.q.mod.setTianQuan4100Pilot(false);
 assert.equal(x.status().enabled,false);
 x.q.mod.stop();
}
{
 const x=make();
 x.hits(2200);
 x.hits(700);
 const p=x.status();
 assert.equal(p.phase,'chosen');
 assert.equal(p.selectedMode,'combo','weaker TH-only rejected');
 assert.equal(p.activeMode,'combo');
 x.q.occ(199999);x.q.advance(1000);
 assert.equal(x.status().phase,'combo','new Boss re-learns');
 assert.equal(x.status().combo,null,'old Boss evidence removed');
 x.q.mod.stop();
}
{
 const x=make();x.hp(NaN);x.q.advance(1000);
 assert(x.status().missingHpSamples>0);
 assert.equal(x.status().phase,'combo','unreadable HP cannot force decision');
 x.q.mod.stop();
}
console.log('PASS La Phong 4100 pilot: opt-in, Boss HP DPS A/B, stronger TH-only selection, combo fallback, stage isolation, Boss reset, missing HP and native selection.');