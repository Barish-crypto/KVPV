'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const source=fs.readFileSync(__dirname+'/src/31-map-task-radar.js','utf8');
let current=1002,callback,executions=0;
const W={__KVPV_OWN_ACTOR_ID:'7',_Ba:{_rJ:{_O$:{ins:{actorId:'7'}}},_zIt:{_FIt:{ins:{taskInfo:[42,1]}}}},
 _C:{_Mn:{_Cn:{get currentID(){return current;}}}},
 KVPV_DAILY:{quickState:()=>({job:'test',step:'waiting'})},
 KVPV_EVENT_PRIORITY:{status:()=>({reason:'none'})},
 setInterval(fn,ms){assert.equal(ms,750);callback=fn;return 1;},clearInterval(){callback=null;}};
vm.runInNewContext(source,{window:W,Date,Number,String,Object});
const radar=W.KVPV_MAP_TASK_RADAR;
assert.equal(radar.status().map,1002);
for(const scene of [2201,2995,2371,1002]){current=scene;callback();assert.equal(radar.status().map,scene);}
assert.equal(radar.status().snapshot.task.id,42);
assert.equal(radar.status().stats.scans,radar.status().scans);
assert.equal(radar.status().priority,'daily_running');
assert.equal(radar.status().stats.mapChanges,5);
assert.equal(radar.status().stats.completed,0);
assert.equal(radar.status().readOnly,true);

assert.equal(radar.status().readOnly,true);
assert.equal(executions,0,'no action sender');
W._Ba._rJ._O$.ins.actorId='9';current=9999;callback();assert.equal(radar.status().map,1002,'wrong actor cannot scan');
radar.stop();assert.equal(callback,null);
console.log('PASS cross-map task radar: continuous task snapshots, all scenes, actor identity and no RPC');
