'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const xaSource=fs.readFileSync(__dirname+'/src/32-xa-menh-lv2-cd0.js','utf8');
const source=fs.readFileSync(__dirname+'/src/32-thac-an-cd0.js','utf8');
const expected=[
  [30210001,3021,1,30000],[30210002,3021,2,30000],
  [30210003,3021,3,25000],[30310002,3031,2,30000],
  [30410002,3041,2,30000],[31210002,3121,2,0]
];
function setup(){
  const rows=new Map(expected.map(([record,id,lv,ms])=>[id+'/'+lv,[record,id,'skill',lv,4,0,ms]]));
  const w={_ft:{_nY:{ins:{getCfgBySkillIdAndLv(id,lv){
    return rows.get(id+'/'+lv)??null;
  }}}}};
  const logs={info(){},warn(){}};const ctx=vm.createContext({window:w,console:logs});
  const loadXa=()=>vm.runInContext(xaSource,ctx,{timeout:1500});
  const load=()=>vm.runInContext(source,ctx,{timeout:1500});
  loadXa();load();return {w,rows,loadXa,load,api:()=>w.KVPV_THAC_AN_CD0,xa:()=>w.KVPV_XA_MENH_LV2};
}
const ms=(q,id,lv)=>q.rows.get(id+'/'+lv)[6];
{
  const q=setup(),a=q.api();
  assert.equal(a.status().enabled,false,'no mutation by default');
  for(const [record,id,lv,orig]of expected)assert.equal(ms(q,id,lv),orig);
  let state=a.start();
  assert.equal(state.enabled,true);
  assert.equal(state.changedCount,4,'3 Bát Hoang + 1 Quẻ Thượng');
  assert.equal(state.xaManagedByThisModule,true);
  for(const [,id,lv]of expected)assert.equal(ms(q,id,lv),0);
  assert.equal(state.lockedSlotsOpened,false);
  assert.equal(state.serverCooldownBypassed,false);
  a.start();assert.equal(a.status().changedCount,4,'idempotent');
  q.loadXa();q.load(); // same FULL update order: Xá module then Thác Ấn
  assert.equal(q.api().status().enabled,true,'hot reload maintains opt-in');
  assert.equal(q.api().status().changedCount,4,'each row is owned exactly once');
  q.api().stop();
  for(const [record,id,lv,orig]of expected)assert.equal(ms(q,id,lv),orig,'restore '+record);
  assert.equal(q.xa().status().enabled,false,'restore Xá only if started by group');
}
{
  const q=setup();q.xa().enable();
  q.api().start();
  assert.equal(q.api().status().xaManagedByThisModule,false,'respect preexisting Xá experiment');
  q.api().stop();
  assert.equal(ms(q,3031,2),0,'never restore user-owned Xá change');
  q.xa().restore();assert.equal(ms(q,3031,2),30000);
}
{
  const q=setup();
  q.rows.get('3021/3')[6]=12345;
  assert.throws(()=>q.api().start(),/expected 25000ms or 0ms/);
  assert.equal(ms(q,3021,1),30000,'preflight atomic');
  assert.equal(ms(q,3041,2),30000);
  assert.equal(ms(q,3031,2),30000);
}
{
  const q=setup();
  q.rows.get('3041/2')[6]=0;
  q.api().start();
  assert.equal(q.api().status().changedCount,3,'already-patched foreign 0 remains untouched');
  q.api().stop();assert.equal(ms(q,3041,2),0,'preserve foreign 0');
}
{
  const q=setup();
  q.api().start();q.rows.get('3021/2')[6]=777;
  q.api().stop();assert.equal(ms(q,3021,2),777,'preserve external overwrite');
}
{
  const q=setup();q.rows.delete('3041/2');
  assert.throws(()=>q.api().start(),/Skill config mismatch/);
  assert.equal(ms(q,3021,1),30000,'incomplete client never partially patched');
}
console.log('PASS Thác Ấn: default OFF, native config exact, multi-level Bát Hoang, Quẻ Thượng, Ma Hóa already 0, Xá ownership, reload and rollback');
