'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
async function main(){
 const callbacks=new Map();let seq=0;
 const W={__KVPV_OWN_ACTOR_ID:'1',_Ba:{_rJ:{_O$:{ins:{actorId:'1'}}}},document:{hidden:false},
   setInterval(fn,ms){const id=++seq;callbacks.set(id,{fn,ms});return id;},
   clearInterval(id){callbacks.delete(id);}};
 vm.runInNewContext(fs.readFileSync(__dirname+'/src/31-four-async-scans.js','utf8'),{window:W,Date,Promise});
 const a=W.KVPV_FOUR_SCANS;
 assert.equal(callbacks.size,4,'four independent timers');
 assert.equal(a.status().autoUpgrades,false);
 assert.equal(a.status().allowKNB,false);
 assert.equal(a.status().lanes.luyen_khi.adapterReady,true);
 assert.equal(a.status().lanes.tui.adapterReady,true);
 assert.equal(new Set([...callbacks.values()].map(x=>x.ms)).size,4,'independent intervals');
 let executions=0,ack=false,observed=0;
 a.registerAdapter('luyen_khi',{inspect:async()=>{observed++;return {tasks:[
   {key:'pay',action:'upgrade',free:true,costVerified:true},
   {key:'free1',action:'claim_free_reward',free:true,costVerified:true}
 ]};},execute:async()=>{executions++;},confirm:async()=>ack});
 await a.scan('luyen_khi');assert.equal(executions,1);
 await a.scan('luyen_khi');assert.equal(executions,1,'pending prevents duplicate execution');
 ack=true;await a.scan('luyen_khi');assert.equal(a.status().lanes.luyen_khi.confirmed,1);
 assert.equal(a.status().lanes.luyen_khi.requests,1,'confirmed action must not replay while task remains listed');
 assert(observed>=3);
 a.stop();assert.equal(callbacks.size,0,'stop removes all timers');
 assert.equal(a.status().enabled,false);
 console.log('PASS four independent scanners, guarded free tasks, pending dedupe and confirmation.');
}
main().catch(e=>{console.error(e);process.exitCode=1;});
