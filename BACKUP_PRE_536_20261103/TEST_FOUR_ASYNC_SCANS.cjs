'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
async function main(){
 const callbacks=new Map();let seq=0;
 const W={__KVPV_OWN_ACTOR_ID:'1',_Ba:{_rJ:{_O$:{ins:{actorId:'1'}}}},document:{hidden:false},
   setInterval(fn,ms){const id=++seq;callbacks.set(id,{fn,ms});return id;},
   clearInterval(id){callbacks.delete(id);}};
 vm.runInNewContext(fs.readFileSync(__dirname+'/src/31-four-async-scans.js','utf8'),{window:W,Date,Promise});
 const timerless={__KVPV_OWN_ACTOR_ID:'1',_Ba:{_rJ:{_O$:{ins:{actorId:'1'}}}}};
 assert.doesNotThrow(()=>vm.runInNewContext(fs.readFileSync(__dirname+'/src/31-four-async-scans.js','utf8'),{window:timerless,Promise,Date}));
 assert.equal(timerless.KVPV_FOUR_SCANS.status().enabled,true);
 const virtual={__KVPV_OWN_ACTOR_ID:'1',_Ba:{_rJ:{_O$:{ins:{actorId:'1'}}}},KVPV_V1:{timers:{setInterval(){throw Error('must not call virtual timer');}}}};
 assert.doesNotThrow(()=>vm.runInNewContext(fs.readFileSync(__dirname+'/src/31-four-async-scans.js','utf8'),{window:virtual,Promise,Date}));
 const a=W.KVPV_FOUR_SCANS;
 assert.equal(callbacks.size,4,'four independent timers');
 assert.equal(a.status().autoUpgrades,false);
 assert.equal(a.status().allowKNB,false);
 assert.equal(a.opportunities().tuyet_hoc.spendAllowed,false);
 assert.equal(a.opportunities().phap_bao.spendAllowed,false);
 assert.equal(a.opportunities().dung_luyen.spendAllowed,false);
 await a.refreshOpportunities();
 assert(a.status().observer.count>=1,'async opportunity observer updates a snapshot');
 assert.equal(a.opportunities().tuyet_hoc.spendAllowed,false);
 assert.equal(a.status().lanes.luyen_khi.adapterReady,true);
 assert.equal(a.status().lanes.tui.adapterReady,true);
 assert.equal(new Set([...callbacks.values()].map(x=>x.ms)).size,4,'independent intervals');
 // start() launches four async scans; allow their initial awaits to release busy flags.
 await Promise.resolve();await Promise.resolve();
 let bagSync=0,skillSync=0,quickSync=0;
 W.KVPV_FREE_DAILY_BAG={status:()=>({enabled:true,allowKNB:false}),sync:()=>{bagSync++;}};
 W.KVPV_QUICK_USE={status:()=>({enabled:true,allowKNB:false}),sync:()=>{quickSync++;}};
 W.KVPV_SKILL_REWARDS={status:()=>({enabled:true,allowKNB:false}),sync:()=>{skillSync++;}};
 await a.scan('tui');await a.scan('phap_thuat');
 assert.equal(bagSync,1);assert.equal(quickSync,1);assert.equal(skillSync,1);
 W.KVPV_FREE_DAILY_BAG.status=()=>({enabled:false,allowKNB:false});
 W.KVPV_SKILL_REWARDS.status=()=>({enabled:false,allowKNB:false});
 await a.scan('tui');await a.scan('phap_thuat');
 assert.equal(bagSync,1,'disabled free bag is never reenabled');
 assert.equal(skillSync,1,'disabled skill rewards is never reenabled');
 W.KVPV_ENTRY_POLICY={manual:true};
 await a.scan('tui');await a.scan('phap_thuat');
 assert.equal(quickSync,2,'manual mode must not delegate quick use again');
 W.KVPV_ENTRY_POLICY.manual=false;
 W.KVPV_EVENT_PRIORITY={hold:()=>({key:'event'})};
 await a.scan('tui');await a.scan('phap_thuat');
 assert.equal(quickSync,2,'event priority must not delegate quick use');
 W.KVPV_EVENT_PRIORITY=null;
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
 // No inventory/material consumption even when a faulty adapter calls it free.
 a.registerAdapter('tui',{inspect:async()=>({tasks:[{key:'item',action:'use_free_consumable',free:true,costVerified:true}]}),
   execute:async()=>{throw Error('must not use inventory item');},confirm:async()=>false});
 await a.scan('tui');
 assert.equal(a.status().lanes.tui.requests,0,'material use is reserved for So Tai');
 // An async executor completing after stop may not rewrite the stopped state.
 let release;const delayed=new Promise(resolve=>{release=resolve;});
 a.registerAdapter('tien_phu',{inspect:async()=>({tasks:[{key:'reward',action:'claim_free_reward',free:true,costVerified:true}]}),
   execute:()=>delayed,confirm:async()=>false});
 const inFlight=a.scan('tien_phu');await Promise.resolve();await Promise.resolve();
 a.stop();release();await inFlight;
 assert.notEqual(a.status().lanes.tien_phu.reason,'action_requested_waiting_server_confirmation');
 a.stop();assert.equal(callbacks.size,0,'stop removes all timers');
 assert.equal(a.status().enabled,false);
 console.log('PASS four independent scanners, guarded free tasks, pending dedupe and confirmation.');
}
main().catch(e=>{console.error(e);process.exitCode=1;});
