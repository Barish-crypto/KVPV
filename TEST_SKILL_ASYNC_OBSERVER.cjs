'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
let n=0,cleared=0,casts=0;
const component={_rtt:[[8001,0,10],[8002,0,10],[1001,0,100]],_wet:[]};
const W={__KVPV_OWN_ACTOR_ID:'42',_Ba:{_rJ:{_O$:{ins:{actorId:'42'}}}},_C:{_Ba:{instance:{getRole:()=>({_components:{skill:component},combat:()=>{casts++;}})}}},setInterval:()=>++n,clearInterval:()=>{cleared++;}};
vm.runInNewContext(fs.readFileSync(__dirname+'/src/00-skill-async-observer.js','utf8'),{window:W,Promise,Date,Number,Object,Array,String});
(async()=>{
 const observer=W.KVPV_SKILL_ASYNC_OBSERVER;
 await observer.scan();await Promise.resolve();
 const st=observer.status();
 assert.equal(st.observerOnly,true);
 assert.equal(st.castsByObserver,0);
 assert.equal(casts,0);
 assert.equal(st.skills.length,13);
 observer.stop();assert.equal(cleared,1);
 console.log('PASS 13-skill async passive observer; no cast, stop cleanup');
})().catch(e=>{console.error(e);process.exitCode=1;});
