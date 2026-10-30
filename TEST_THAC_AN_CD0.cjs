'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const xaSource=fs.readFileSync(__dirname+'/src/32-xa-menh-lv2-cd0.js','utf8');
const source=fs.readFileSync(__dirname+'/src/32-thac-an-cd0.js','utf8');
const expected=[
 [30210001,3021,1,30000],[30210002,3021,2,30000],
 [30210003,3021,3,25000],[30310002,3031,2,30000],
 [30410002,3041,2,30000],[31210002,3121,2,0]
];
function env(withLegacy=false){
 const rows=new Map(expected.map(([record,id,lv,ms])=>[id+'/'+lv,[record,id,'skill',lv,0,0,withLegacy?0:ms]]));
 if(withLegacy)rows.get('3121/2')[6]=0;
 const w={_ft:{_nY:{ins:{getCfgBySkillIdAndLv:(id,lv)=>rows.get(id+'/'+lv)??null}}}};
 const calls=[];
 if(withLegacy){
   w.KVPV_XA_MENH_LV2={restore(){calls.push('xa.restore');rows.get('3031/2')[6]=30000;}};
   w.KVPV_THAC_AN_CD0={stop(){
     calls.push('thac.stop');
     for(const [record,id,lv,ms]of expected)if(id!==3031)rows.get(id+'/'+lv)[6]=ms;
   }};
 }
 const ctx=vm.createContext({window:w,console:{warn(){}}});
 const reload=()=>{vm.runInContext(xaSource,ctx,{timeout:1500});vm.runInContext(source,ctx,{timeout:1500});};
 reload();return {w,rows,calls,reload,ms:(id,lv)=>rows.get(id+'/'+lv)[6]};
}
{
 const q=env(true);
 assert.deepEqual(q.calls,['xa.restore','thac.stop'],'prior patched state restored on hot update');
 for(const [record,id,lv,ms]of expected)assert.equal(q.ms(id,lv),ms,'restore '+record);
 const a=q.w.KVPV_THAC_AN_CD0,x=q.w.KVPV_XA_MENH_LV2;
 assert.equal(a.status().enabled,false);
 assert.equal(a.status().suspended,true);
 assert.equal(a.status().changedCount,0);
 assert.equal(a.status().skills.length,6);
 a.start();a.enable();x.enable();
 for(const [record,id,lv,ms]of expected)assert.equal(q.ms(id,lv),ms,'disabled '+record);
 q.reload();
 for(const [record,id,lv,ms]of expected)assert.equal(q.ms(id,lv),ms,'reload '+record);
}
{
 const q=env();
 q.w.KVPV_THAC_AN_CD0.start();
 assert.equal(q.w.KVPV_THAC_AN_CD0.status().reason,'disabled_after_live_freeze');
 q.rows.get('3021/1')[6]=12345;
 q.w.KVPV_THAC_AN_CD0.stop();
 assert.equal(q.ms(3021,1),12345,'read-only module never overwrites foreign changes');
}
console.log('PASS Thác Ấn: restores legacy state, disables 0ms, no combat mutation or auto re-enable');
