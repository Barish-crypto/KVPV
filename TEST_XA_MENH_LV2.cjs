'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const source=fs.readFileSync(__dirname+'/src/32-xa-menh-lv2-cd0.js','utf8');
function create(initial=30000,legacy=false){
 const row=[30310002,3031,'Xá Mệnh',2,0,0,initial],calls=[];
 const w={_ft:{_nY:{ins:{getCfgBySkillIdAndLv:(id,lv)=>id===3031&&lv===2?row:null}}}};
 if(legacy)w.KVPV_XA_MENH_LV2={restore(){calls.push('legacy.restore');row[6]=30000;}};
 const ctx=vm.createContext({window:w,console:{warn(){}}});
 const load=()=>vm.runInContext(source,ctx,{timeout:1500});
 load();return {w,row,calls,load};
}
{
 const q=create(0,true),api=q.w.KVPV_XA_MENH_LV2;
 assert.deepEqual(q.calls,['legacy.restore'],'restores old live 0ms');
 assert.equal(q.row[6],30000);
 assert.equal(api.status().suspended,true);
 assert.equal(api.status().enabled,false);
 assert.equal(api.enable().enabled,false);
 assert.equal(api.start().enabled,false);
 assert.equal(q.row[6],30000,'cannot re-enable 0ms');
 q.load();assert.equal(q.row[6],30000,'hot reload never opts-in again');
}
{
 const q=create(30000);
 q.w.KVPV_XA_MENH_LV2.enable();
 assert.equal(q.row[6],30000,'new install is strictly read-only');
 q.row[6]=23500;q.w.KVPV_XA_MENH_LV2.restore();
 assert.equal(q.row[6],23500,'do not overwrite external client changes');
}
console.log('PASS Xá Mệnh: restore previous 0ms trial; block future mutations, safe hot reload');
