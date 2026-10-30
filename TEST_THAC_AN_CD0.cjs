'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const xa=fs.readFileSync(__dirname+'/src/32-xa-menh-lv2-cd0.js','utf8');
const thac=fs.readFileSync(__dirname+'/src/32-thac-an-cd0.js','utf8');
const diag=fs.readFileSync(__dirname+'/src/32-combat-stall.js','utf8');
const expected=[
 [30210001,3021,1,30000],[30210002,3021,2,30000],
 [30210003,3021,3,25000],[30310002,3031,2,30000],
 [30410002,3041,2,30000],[31210002,3121,2,0]
];
function env({orphaned=false,legacy=false}={}){
 const rows=new Map(expected.map(([rec,id,lv,ms])=>[id+'/'+lv,[rec,id,'skill',lv,0,0,orphaned&&ms>0?0:ms]]));
 const actor='12345',calls=[];
 const W={_ft:{_nY:{ins:{getCfgBySkillIdAndLv:(id,lv)=>rows.get(id+'/'+lv)??null}}},
  __KVPV_OWN_ACTOR_ID:actor,
  _Ba:{_rJ:{_O$:{ins:{actorId:actor}}}},
  _C:{_Mn:{_Cn:{currentID:1001}}}};
 if(legacy){
   W.KVPV_XA_MENH_LV2={restore(){calls.push('oldXa.restore');rows.get('3031/2')[6]=30000;}};
   W.KVPV_THAC_AN_CD0={stop(){calls.push('oldThac.stop');}};
 }
 const ctx=vm.createContext({window:W,console:{warn(){}}});
 const load=()=>{vm.runInContext(xa,ctx,{timeout:1500});vm.runInContext(thac,ctx,{timeout:1500});vm.runInContext(diag,ctx,{timeout:1500});};
 load();return {W,rows,calls,load,ms:(id,lv)=>rows.get(id+'/'+lv)[6]};
}
{
 const q=env({orphaned:true});
 for(const [record,id,lv,ms]of expected)assert.equal(q.ms(id,lv),ms,'repaired '+record);
 assert.equal(q.W.KVPV_THAC_AN_CD0.status().rollbackCount,4);
 assert.equal(q.W.KVPV_XA_MENH_LV2.status().rollbackCount,1);
 assert.equal(q.W.KVPV_THAC_AN_CD0.status().unresolved.length,0);
 assert.equal(q.W.KVPV_THAC_AN_CD0.status().enabled,false);
 assert.equal(q.W.KVPV_THAC_AN_CD0.status().suspended,true);
 assert.equal(q.W.KVPV_COMBAT_STALL.status().thac.rollbackCount,4);
 q.W.KVPV_THAC_AN_CD0.start();
 q.W.KVPV_XA_MENH_LV2.enable();
 assert.equal(q.ms(3021,2),30000,'start is never allowed to alter config');
 q.load();
 for(const [record,id,lv,ms]of expected)assert.equal(q.ms(id,lv),ms,'no mutation after reload '+record);
 assert.equal(q.W.KVPV_THAC_AN_CD0.status().rollbackCount,0,'idempotent re-install');
}
{
 const q=env({orphaned:true,legacy:true});
 assert.deepEqual(q.calls,['oldXa.restore','oldThac.stop']);
 assert.equal(q.ms(3031,2),30000);
 assert.equal(q.ms(3121,2),0,'Ma Hóa native 0 untouched');
}
{
 const q=env();
 q.rows.get('3021/1')[6]=0;
 q.W.KVPV_COMBAT_STALL.recover();
 assert.equal(q.ms(3021,1),30000,'on-demand rollback after later orphan');
 assert.equal(q.W.KVPV_COMBAT_STALL.snapshot().thac.unresolved.length,0,'recovery clears unresolved list');
}
{
 const q=env();
 q.rows.get('3021/1')[0]=999;
 q.rows.get('3021/1')[6]=0;
 q.W.KVPV_THAC_AN_CD0.recover();
 assert.equal(q.ms(3021,1),0,'unknown row is never modified');
 q.rows.get('3041/2')[6]=12345;
 q.W.KVPV_COMBAT_STALL.recover();
 assert.equal(q.ms(3041,2),12345,'nonzero foreign edits never touched');
}
console.log('PASS Thác Ấn: orphaned 0ms repaired, native Ma Hóa preserved, read-only stall diagnosis, strict row guards');
