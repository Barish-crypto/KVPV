'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const suite=fs.readFileSync(__dirname+'/TEST_TH300.cjs','utf8');
const prefix=suite.slice(0,suite.indexOf("test('holding 305"));
assert(prefix.includes('function harness('));
const ctx={require,__dirname,console};
vm.runInNewContext(prefix+'\nglobalThis.make=harness;',ctx);
const actor='10228867268946';
function make(){
 const q=ctx.make({fastReady:true,defaultDistance:true,newDefault:true,startX:310});
 let kind='THIEN_QUAN',events=new Map(),native=q.c.combat;
 q.W.KVPV_FAR_SCOPE={status:()=>({kind}),inside:()=>true,eligible:()=>true};
 q.W.KVPV_TQ_POSITION_ONLY={enabled:true,distance:310,heal:false};
 q.actor.on=(name,owner,cb)=>events.set(name,cb);
 q.actor.off=(name,owner,cb)=>{if(events.get(name)===cb)events.delete(name);};
 q.c.combat=function(id){events.get(1039)?.('boss1',id);return native.apply(this,arguments);};
 q.s._rtt=[[1001,0,50],[1002,0,50],[1003,0,50],[8001,0,50],[8004,0,50]];
 q.s._wet=[];
 q.mod.setInterleaved(true,310);q.mod.setTianQuanFiveBasics(true,1);
 q.mod.setTianQuanTuyetHoc(true);q.mod.setTianQuanCosmic(true);
 q.mod.setTianQuanTHGapBasics(true,1200);
 q.mod.setTianQuanLuoFeng(true);
 q.mod.start('SCAN');
 function hit(id,dmg){
  q.elapse(2);const before=q.calls.length;q.c.combat(id);
  assert.equal(q.calls.length,before+1,'native cast '+id);
  q.events[1012](actor,id*10000,dmg,1,'boss1');
 }
 return {q,hit,setKind:v=>kind=v};
}
{
 const {q,hit}=make();
 const st=q.mod.status(false);assert.equal(st.luoFeng.active,true);
 assert.equal(st.luoFeng.sampleWindow,12);assert.equal(st.goalDistance,310);
 assert.equal(st.recoveryEnabled,false);assert.equal(st.paceMs,1);
 // A long-living high-damage TH eventually becomes weak. Recent evidence wins
 // even when all-time average still prefers the formerly strongest TH.
 for(let i=0;i<3;i++)hit(1001,500);
 for(let i=0;i<12;i++)hit(1001,1);
 for(let i=0;i<3;i++)hit(1002,90);
 const one=q.mod.status(false).luoFeng.recentTH.find(x=>x.id===1001);
 assert.equal(one.recentHits,12,'bounded last-12-hit memory');
 assert.equal(one.recentMeanDamage,1,'new recent evidence must displace stale damage');
 assert.equal(q.mod.status(false).luoFeng.recentTH.find(x=>x.id===1002).recentMeanDamage,90);
 q.mod.setInterleaved(true,310);q.elapse(1000);
 assert.equal(q.s.selectSkill(),1002,'adaptive TH selects recent stronger hit, not stale lifetime mean');
 const nativeRows=q.s._rtt.map(x=>x[2]);assert.deepEqual(Array.from(nativeRows),[50,50,50,50,50]);
 // Periodic exploration is accounted once per confirmed cast number, not per selector poll.
 while(q.mod.status(false).cosmic.thCasts%7!==6)hit(1001,1);
 q.mod.setInterleaved(true,310);q.elapse(1000);
 q.s.selectSkill();const first=q.mod.status(false).cosmic.explorationChecks;
 q.s.selectSkill();q.s.selectSkill();
 assert.equal(q.mod.status(false).cosmic.explorationChecks,first,'no repeated exploration metric for same TH cast');
 // Diagnostics are observational, and never issue extra native combat requests.
 assert.equal(q.mod.status(false).luoFeng.possibleIdle,true);
 assert(q.mod.status(false).luoFeng.idleMs>=1000);
 q.mod.setTianQuanLuoFeng(false);
 assert.equal(q.mod.status(false).luoFeng.active,false);
 q.mod.stop();
}
{
 const {q,hit,setKind}=make();
 hit(1001,300);hit(1001,200);q.mod.setTianQuanLuoFeng(true);
 setKind('LINH_LUNG');assert.equal(q.mod.status(false).luoFeng.active,false,'no change outside Thiên Quan');
 setKind('THIEN_QUAN');
 q.occ(999888);q.advance(2);
 assert.equal(q.mod.status(false).luoFeng.recentTH.length,0,'change Boss resets all learned hits');
 assert(q.mod.status(false).cosmic.thCasts<=1,'new Boss can immediately cast, but old attack counters must be cleared');
 q.mod.stop();
}

{
 const {q,hit}=make();
 // One exceptional critical hit must not eclipse a stronger consistent TH.
 for(let i=0;i<4;i++)hit(1001,100);
 hit(1001,50000);
 for(let i=0;i<5;i++)hit(1002,120);
 let st=q.mod.status(false);
 const a=st.luoFeng.recentTH.find(x=>x.id===1001),b=st.luoFeng.recentTH.find(x=>x.id===1002);
 assert.equal(st.luoFeng.robustMinHits,5);
 assert.equal(st.luoFeng.trimPerTail,1);
 assert.equal(a.recentMeanDamage,10080,'rolling mean remains observable');
 assert.equal(a.robustScore,100,'trim extreme critical without hiding raw data');
 assert.equal(b.robustScore,120,'stable skill remains strongest');
 q.mod.setInterleaved(true,310);q.elapse(1000);
 assert.equal(q.s.selectSkill(),1002,'Apex selects stronger repeatable TH');
 assert.deepEqual(Array.from(q.s._rtt.map(x=>x[2])),[50,50,50,50,50],'native cooldown unchanged');
 q.mod.setTianQuanLuoFeng(false);
 st=q.mod.status(false);
 assert.equal(st.luoFeng.active,false);
 assert.equal(st.luoFeng.recentTH.find(x=>x.id===1001).robustScore,10080,'switch off restores lifetime ranking');
 q.mod.stop();
}

{
 const {q,setKind}=make();
 let rhythm=q.mod.status(false).luoFeng.rhythm;
 assert.equal(rhythm.advisoryOnly,true);
 assert.equal(rhythm.predictedNextHpLossAt,null,'no prediction without observations');
 // Boss-like periodic HP losses: this is still player-HP evidence, NOT a verified Boss attack.
 for(let i=0;i<4;i++){q.hp(90-i*10);q.advance(3500);}
 rhythm=q.mod.status(false).luoFeng.rhythm;
 assert.equal(rhythm.observedHpLosses,4);
 assert.equal(rhythm.intervalSamples,3);
 assert.equal(rhythm.estimatedCycleMs,3500);
 assert.equal(rhythm.confidence,'tentative-rhythmic');
 assert.equal(rhythm.msUntilPrediction,3500);
 const calls=q.calls.length,moves=q.movements.length;
 q.mod.status(false);q.mod.status(false);
 assert.equal(q.calls.length,calls,'rhythm reporting must not dispatch any casts');
 assert.equal(q.movements.length,moves,'rhythm reporting must not issue movement');
 q.hp(59);q.advance(100);
 assert.equal(q.mod.status(false).luoFeng.rhythm.observedHpLosses,4,'debounce damage burst');
 q.hp(70);q.advance(100);
 assert.equal(q.mod.status(false).luoFeng.rhythm.observedHpLosses,4,'heal is not an attack');
 q.elapse(3601);
 assert.equal(q.mod.status(false).luoFeng.rhythm.predictedNextHpLossAt,null,'stale HP prediction expires');
 setKind('LINH_LUNG');q.advance(100);
 assert.equal(q.mod.status(false).luoFeng.rhythm.active,false,'other map disabled');
 setKind('THIEN_QUAN');q.advance(100);
 assert.equal(q.mod.status(false).luoFeng.rhythm.intervalSamples,0,'other map resets learned cadence');
 q.occ(7777);q.advance(100);
 assert.equal(q.mod.status(false).luoFeng.rhythm.observedHpLosses,0,'Boss switch resets sensor');
 q.mod.stop();
}

{
 const {q}=make();
 q.hp(90);q.advance(3500);
 q.hp(80);q.advance(3500);
 q.hp(70);q.advance(3500);
 q.hp(60);q.advance(6000);
 const rhythm=q.mod.status(false).luoFeng.rhythm;
 assert.equal(rhythm.intervalSamples,3);
 assert.equal(rhythm.confidence,'insufficient','irregular HP loss must not imply a reliable Boss rhythm');
 assert.equal(rhythm.predictedNextHpLossAt,null);
 q.mod.stop();
}
console.log('PASS Luo Feng Apex V3: 12 recent direct hits, learned skill adapts to new damage, no duplicate exploration, read-only idle 310, no heal, native cooldown unchanged, map/Boss isolation and off switch');
