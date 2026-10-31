'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const suite=fs.readFileSync(__dirname+'/TEST_TH300.cjs','utf8'),prefix=suite.slice(0,suite.indexOf("test('holding 305")),ctx={require,__dirname,console};
vm.runInNewContext(prefix+'\nglobalThis.make=harness;',ctx);
const q=ctx.make({fastReady:true,defaultDistance:true,newDefault:true,startX:302}),actor='10228867268946';let kind='THIEN_QUAN';
q.W.KVPV_FAR_SCOPE={status:()=>({kind}),inside:()=>true,eligible:()=>true};q.W.KVPV_TQ_SCOPE={inside:()=>true};
q.s._rtt=[...[8001,8002,8003,8004,8005].map(id=>[id,0,500]),[1001,0,1000]];q.s._wet=[];
q.mod.setInterleaved(true,302);q.mod.setTianQuanFiveBasics(true,10);q.mod.start('SCAN');q.pump();
for(let i=0;i<10;i++){if(i>0)q.advance(10);const id=q.calls.at(-1);assert.equal(id,8001+i%5);q.events[1012](actor,id*10000,20,1,'boss1');}
assert.deepEqual(Array.from(q.calls.slice(0,5)),[8001,8002,8003,8004,8005]);assert.equal(q.mod.status(false).paceMs,10);assert.equal(q.mod.status(false).basicOnly,true);assert.equal(q.mod.status(false).excludedBasicSkillIds.length,0);assert.equal(q.mod.rangeReport().rows.length,5);
assert(q.mod.rangeReport().rows.every(r=>r.hits.length>=2&&r.confirmedDistance>=300));assert(q.s._rtt.every(r=>r[1]===0));
assert.equal(q.mod.status(false).primaryBasicClientWaitMs,10);assert.equal(q.mod.report().interleaved.basicClientWaitMs,10);
const count=q.calls.length;q.c.combat(1001);q.c.combat(8001);assert.equal(q.calls.length,count);q.advance(9);assert.equal(q.calls.length,count);q.advance(1);assert.equal(q.calls.length,count+1);
q.cooldown(true);const rows=JSON.stringify(q.s._rtt);assert.equal(q.s.selectSkill(),-1);assert.equal(JSON.stringify(q.s._rtt),rows);q.cooldown(false);
q.mod.startTianQuanBasicRangeTest([302,80]);assert.equal(q.mod.rangeReport().probe.status,'running');q.phase('RETREAT');q.hp(35);const before=q.calls.length;q.advance(1000);assert.equal(q.calls.length,before);assert.equal(q.mod.rangeReport().probePaused,true);assert.equal(q.mod.status(false).requestedDistance,302);
q.mod.stopTianQuanBasicRangeTest();assert.equal(q.mod.status(false).requestedDistance,302);q.mod.stop();
kind='LINH_LUNG';assert.equal(q.mod.rangeReport().active,true);assert.equal(q.mod.status(false).basicOnly,true);assert.equal(q.mod.status(false).paceMs,10);
console.log('PASS five basics: native five-skill rotation, TQ-only 10ms, TH/transform blocked, original rows preserved, per-skill matched range, native cooldown and recovery priority.');

let now=1000,scope='THIEN_QUAN',hp=100,phase='FIGHT',context='map/boss';class Clock extends Date{static now(){return now;}}
const W={};vm.runInNewContext(fs.readFileSync(__dirname+'/src/00-tq-basic-profile.js','utf8'),{window:W,Date:Clock});
const p=W.KVPV_TQ_BASIC_PROFILE.create({scope:()=>scope,hp:()=>hp,phase:()=>phase,context:()=>context,learned:()=>[8001,8002]});p.configure(true,10);p.start([302,80]);
let serial=0;p.cast(++serial,8001,302);p.cast(++serial,8001,302);assert.equal(p.canAttempt(8001),false);now+=3501;p.tick();assert.equal(p.goal(),80);assert.equal(p.report().rows[0].rangeStatus,'unverified');
p.cast(++serial,8001,80);p.hit(serial,80,79,20);p.cast(++serial,8001,80);p.hit(serial,80,80,20);p.tick();assert.equal(p.ids()[0],8002);assert.equal(p.goal(),302);assert.equal(p.report().rows[0].confirmedDistance,79);
hp=60;assert.equal(p.goal(),null);p.tick();assert.equal(p.report().probePaused,true);hp=100;phase='DODGE';assert.equal(p.goal(),null);phase='FIGHT';context='map/newBoss';p.tick();assert.equal(p.report().probe.status,'Boss/map changed');assert.equal(p.goal(),null);assert(p.report().rows.every(r=>r.hits.length===0));
scope='LINH_LUNG';assert.equal(p.active(),true);assert.equal(p.start([302,80]).probe.status,'running');p.stop();scope='OUTSIDE';assert.equal(p.active(),false);
console.log('PASS inward range probe: two attempts per distance, expiry does not prove miss, matched proof, closer-only skill, missing skills, low-HP/dodge pause and Boss-change cleanup.');
const close=ctx.make({fastReady:true,defaultDistance:true,newDefault:true,startX:302});close.W.KVPV_FAR_SCOPE={status:()=>({kind:'THIEN_QUAN'}),inside:()=>true,eligible:()=>true};close.s._rtt=[[8002,0,500],[1001,0,1000]];close.s._wet=[];
close.mod.setInterleaved(true,302);close.mod.setTianQuanFiveBasics(true,10);close.mod.start('SCAN');close.pump();close.mod.startTianQuanBasicRangeTest([302,80]);close.advance(10);close.advance(10);close.advance(10);assert.equal(close.mod.rangeReport().probe.attempts.length,2);
close.advance(3501);assert.equal(close.mod.status(false).requestedDistance,80);close.pump();assert.equal(close.actor.coords.x,80);assert.equal(close.calls.at(-1),8002);close.events[1012](actor,80020000,20,1,'boss1');close.advance(20);close.events[1012](actor,80020000,20,1,'boss1');close.pump();
assert.equal(close.mod.rangeReport().probe.status,'complete');assert.equal(close.mod.rangeReport().rows.find(r=>r.id===8002).confirmedDistance,80);assert.equal(close.mod.status(false).requestedDistance,302);close.mod.stop();
console.log('PASS actual controller measures short-range 8002 at 80 and restores far goal after two matched hits.');
const combo=ctx.make({fastReady:true,metrics:true,defaultDistance:true,newDefault:true,startX:302});combo.W.KVPV_FAR_SCOPE={status:()=>({kind:'THIEN_QUAN'}),inside:()=>true,eligible:()=>true};
combo.s._rtt=[...[8001,8002,8003,8004,8005].map(id=>[id,0,500]),[1001,0,1000],[1002,0,1000]];combo.s._wet=[];
combo.mod.setInterleaved(true,302);combo.mod.setTianQuanFiveBasics(true,10);combo.mod.setTianQuanTuyetHoc(true);combo.mod.start('SCAN');combo.pump();for(let i=0;i<6;i++)combo.advance(10);
assert.deepEqual(Array.from(combo.calls.slice(0,7)),[1001,8001,1002,8002,8003,8004,8005]);assert.equal(combo.mod.status(false).basicOnly,false);assert.equal(combo.mod.rangeReport().tuyetHocActive,true);assert.equal(combo.mod.status(false).paceMs,10);assert(combo.s._rtt.slice(0,5).every(r=>r[1]===0));assert(combo.s._rtt[5][1]>0);assert.equal(combo.s._rtt[5][2],1000);
assert.equal(combo.mod.dps(false).current.summary.matchedDamage,0);for(const id of combo.calls.slice(0,7))combo.events[1012](actor,id*10000,10,1,'boss1');assert.equal(combo.mod.dps(false).current.groups.basic.matchedDamage,50);assert.equal(combo.mod.dps(false).current.groups.tuyetHoc.matchedDamage,20);assert.equal(combo.mod.dps(false).current.summary.matchedDamage,70);
combo.mod.startTianQuanBasicRangeTest([302]);assert.equal(combo.mod.rangeReport().tuyetHocActive,false);assert.equal(combo.mod.status(false).basicOnly,true);const beforeTH=combo.calls.length;combo.advance(10);combo.c.combat(1001);assert(!combo.calls.slice(beforeTH).includes(1001));combo.mod.stopTianQuanBasicRangeTest();assert.equal(combo.mod.rangeReport().tuyetHocActive,true);
combo.phase('RETREAT');combo.hp(35);const stopped=combo.calls.length;combo.advance(1000);assert.equal(combo.calls.length,stopped);combo.mod.stop();
console.log('PASS five basics plus TH: alternate ready native TH, basic fallback while TH cools down, all five basics retained, original TH cooldowns, probe isolation and recovery gate.');

const nativeTHOff=ctx.make({fastReady:true,defaultDistance:true,newDefault:true,startX:302});nativeTHOff.W.KVPV_FAR_SCOPE={status:()=>({kind:'THIEN_QUAN'}),inside:()=>true,eligible:()=>true};nativeTHOff.s._rtt=[...[8001,8002,8003,8004,8005,1001,1008].map(id=>[id,0,500])];nativeTHOff.s._wet=[];nativeTHOff.mod.setInterleaved(true,302);nativeTHOff.mod.setTianQuanFiveBasics(true,10);nativeTHOff.mod.setTianQuanTuyetHoc(true);nativeTHOff.mod.start('SCAN');nativeTHOff.pump();
vm.runInNewContext(fs.readFileSync(__dirname+'/KVPV_THIEN_QUAN_CHI_DANH_TAY.js','utf8'),{window:nativeTHOff.W,console:{info(){}}});const startHand=nativeTHOff.calls.length;for(let i=0;i<6;i++)nativeTHOff.advance(10);nativeTHOff.c.combat(1008);nativeTHOff.c.combat(1001);assert(nativeTHOff.calls.slice(startHand).every(id=>id>=8001&&id<=8005));assert.equal(nativeTHOff.mod.rangeReport().tuyetHocActive,false);assert.equal(nativeTHOff.mod.status(false).paceMs,10);nativeTHOff.mod.stop();console.log('PASS hands-only hotpatch: native TH blocked, all five basics retained, 10ms and startup default.');

const fast310=ctx.make({fastReady:true,defaultDistance:true,newDefault:true,startX:310});fast310.W.KVPV_FAR_SCOPE={status:()=>({kind:'THIEN_QUAN'}),inside:()=>true,eligible:()=>true};fast310.s._rtt=[8001,8002,8003,8004,8005,1008].map(id=>[id,0,500]);fast310.s._wet=[];fast310.mod.setInterleaved(true,310);fast310.mod.setTianQuanFiveBasics(true,1);fast310.mod.setTianQuanTuyetHoc(false);fast310.mod.start('SCAN');fast310.pump();for(let i=0;i<8;i++)fast310.advance(8);assert.equal(fast310.mod.status(false).requestedDistance,310);assert.equal(fast310.mod.status(false).paceMs,1);assert(fast310.calls.length>=5);assert(fast310.calls.every(id=>id>=8001&&id<=8005));fast310.mod.stop();const startup310=fs.readFileSync(__dirname+'/src/11-auto-tianquan.js','utf8');assert(startup310.includes('setInterleaved?.(true,310)'));assert(startup310.includes('setTianQuanFiveBasics?.(false,1)'));console.log('PASS requested 310/1ms profile: five basics, no TH, requested range and wait preserved.');

const mixed310=ctx.make({fastReady:true,defaultDistance:true,newDefault:true,startX:310});mixed310.W.KVPV_FAR_SCOPE={status:()=>({kind:'THIEN_QUAN'}),inside:()=>true,eligible:()=>true};mixed310.s._rtt=[8001,8002,8003,8004,8005,1001,1008].map(id=>[id,0,500]);mixed310.s._wet=[];mixed310.W.KVPV_MODE={armTianQuan(){mixed310.mod.start('SCAN');}};vm.runInNewContext(fs.readFileSync(__dirname+'/src/11-auto-tianquan.js','utf8'),{window:mixed310.W});mixed310.pump();for(let i=0;i<9;i++)mixed310.advance(8);assert.equal(mixed310.mod.status(false).requestedDistance,310);assert.equal(mixed310.mod.status(false).paceMs,0,'8005 basic-only has no TH gap');assert.equal(mixed310.mod.rangeReport().tuyetHocActive,false);assert.equal(mixed310.mod.status(false).basicOnly,true);assert(mixed310.calls.every(id=>id===8005),'startup casts only 8005');mixed310.mod.stop();console.log('PASS startup MIXED 310/1ms: five basics with native TH, native cooldown kept when force module absent.');


const mpack=ctx.make({fastReady:true,defaultDistance:true,newDefault:true,startX:302});
let mpackKind='THIEN_QUAN';
mpack.W.KVPV_FAR_SCOPE={status:()=>({kind:mpackKind}),inside:()=>true,eligible:()=>true};
mpack.W.KVPV_TQ_SCOPE={inside:()=>true};
const mkCfg=(id,lvl,type,name,maps=[])=>{
  const row=Array(18).fill(null);
  row[0]=id*10000+lvl;row[1]=id;row[2]=name;row[3]=lvl;row[4]=type;
  row[6]=type===1?30000:0;row[17]=maps;return row;
};
const configs=new Map([
  [3907,mkCfg(3907,1,1,'Tinh Đấu Pháp Quyết')],
  [3022,mkCfg(3022,2,1,'Bát Hoang Phá Thế Lv2-Chủ Động')],
  [3032,mkCfg(3032,2,1,'Xá Mệnh Nhất Kích Lv2-Chủ Động')],
  [3061,mkCfg(3061,2,4,'Cuồng Long Lv2')],
  [2001,mkCfg(2001,1,2,'Thiên Lao Địa Võng')],
  [8012,mkCfg(8012,1,0,'Thú Cưng Đánh Thường')],
  [3908,mkCfg(3908,1,1,'Thương Hải Đoạn Không',[2191])]
]);
mpack.W._ft._nY.ins.getCfgBySkillIdAndLv=(id,lv)=>configs.get(Number(id))??null;
mpack.W._Ba._rJ._O$.ins.skills=[[3907,1],[3022,2],[3032,2],[3061,2],[2001,1],[8012,1],[3908,1]];
mpack.s._rtt=[[3907,0,35000],[3022,0,0],[3032,0,0],[3061,0,0],[2001,0,0],[8012,0,200],[3908,0,35000]];
mpack.s._wet=[];
mpack.mod.setInterleaved(true,302);
mpack.mod.setTianQuanFiveBasics(true,10);
mpack.mod.setTianQuanTuyetHoc(true);
let extraStatus=mpack.mod.status(false);
assert.deepEqual(Array.from(extraStatus.tianQuanMpackExtras.ids),[3907],'only learned native active MPACK extras (no passive/proc/scene/companion)');
assert.equal(extraStatus.tianQuanMpackExtras.enabled,true,'new Tian Quan extras enabled by default');
assert(extraStatus.playerSkillIds.includes(3907),'extra active skill in runtime TQ roster');
assert(!extraStatus.playerSkillIds.includes(3022),'proc damage child never cast manually');
mpack.mod.start('SCAN');mpack.pump();
assert(mpack.calls.includes(3907),'native 3907 may be selected and cast if already ready');
assert(!mpack.calls.some(id=>[3022,3032,3061,2001,8012,3908].includes(id)),'passive, proc child and restricted skills excluded');
assert.equal(mpack.s._rtt[0][2],35000,'native cooldown remains unchanged');
assert.deepEqual(Array.from(mpack.mod.setTianQuanMpackExtras(false).extraIds),[],'manual disable restores prior 13-skill policy');
assert.equal(mpack.mod.status(false).tianQuanMpackExtras.enabled,false);
assert.deepEqual(Array.from(mpack.mod.setTianQuanMpackExtras(true).extraIds),[3907]);
// Native _c7t() reads _vX.ins.skills. The parallel model can be stale.
mpack.W._vX={ins:{skills:[[3907,1]]}};
mpack.W._Ba._rJ._O$.ins.skills=[];
assert.deepEqual(Array.from(mpack.mod.status(false).tianQuanMpackExtras.ids),[3907],
 'native learned list takes precedence over an empty shadow account list');
assert.equal(mpack.mod.status(false).tianQuanMpackExtras.learnedSource,'native_vX');
mpack.W._Ba._rJ._O$.ins.skills=[[3907,1]];
mpack.W._vX.ins.skills=[];
assert.deepEqual(Array.from(mpack.mod.status(false).tianQuanMpackExtras.ids),[],
 'stale shadow model never authorizes an unlearned native skill');
mpack.W._vX.ins.skills=[[3907,1]];
mpackKind='LINH_LUNG';
assert.deepEqual(Array.from(mpack.mod.status(false).tianQuanMpackExtras.ids),[],'MPACK extras never enabled in other maps');
mpack.mod.stop();
console.log('PASS MPACK Tian Quan native extras: 3907 included when learned and ready, all other skill types excluded, no cooldown edits, no other-map leakage.');
