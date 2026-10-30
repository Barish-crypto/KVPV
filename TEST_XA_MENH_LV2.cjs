'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const source=fs.readFileSync(__dirname+'/src/32-xa-menh-lv2-cd0.js','utf8');
function create(initial=30000,legacy=false,wrongRecord=false){
 let ready=true;
 const row=[wrongRecord?999:30310002,3031,'Xá Mệnh',2,0,0,initial],calls=[];
 const w={_ft:{_nY:{ins:{getCfgBySkillIdAndLv:(id,lv)=>ready&&id===3031&&lv===2?row:null}}}};
 if(legacy)w.KVPV_XA_MENH_LV2={restore(){calls.push('legacy.restore');row[6]=30000;}};
 const ctx=vm.createContext({window:w,console:{warn(){}}});
 const load=()=>vm.runInContext(source,ctx,{timeout:1500});
 load();return {w,row,calls,load,ready:x=>{ready=x;}};
}
{
 const q=create(0),api=q.w.KVPV_XA_MENH_LV2;
 assert.equal(q.row[6],30000,'orphaned 0ms MUST auto-rollback');
 assert.equal(api.status().rollbackCount,1);
 assert.equal(api.status().suspended,true);
 api.start();api.enable();assert.equal(q.row[6],30000);
 q.load();assert.equal(q.row[6],30000,'hot reload cannot re-enable 0ms');
 assert.equal(q.w.KVPV_XA_MENH_LV2.status().rollbackCount,0);
}
{
 const q=create(0,true);
 assert.deepEqual(q.calls,['legacy.restore'],'cleanup owned old wrapper first');
 assert.equal(q.row[6],30000);
}
{
 const q=create(23500);
 assert.equal(q.row[6],23500,'unexpected positive cooldown not overwritten');
 assert.match(q.w.KVPV_XA_MENH_LV2.status().lastError,/unexpected_current_ms/);
 q.w.KVPV_XA_MENH_LV2.recover();
 assert.equal(q.row[6],23500);
}
{
 const q=create(0,false,true);
 assert.equal(q.row[6],0,'wrong record NEVER rewritten');
 assert.equal(q.w.KVPV_XA_MENH_LV2.status().recordId,null);
}
{
 const q=create(30000);
 q.ready(false);q.row[6]=0;q.load();
 assert.equal(q.row[6],0,'cannot repair unavailable data');
 q.ready(true);
 q.w.KVPV_XA_MENH_LV2.recover();
 assert.equal(q.row[6],30000,'later data readiness supports explicit recover');
}
console.log('PASS Xá Mệnh: orphaned 0ms rollback, disabled opt-in, wrong record/nonzero guards and late readiness');
