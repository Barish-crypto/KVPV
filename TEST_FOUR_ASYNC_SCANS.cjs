'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const callbacks=new Map();let seq=0;
const W={__KVPV_OWN_ACTOR_ID:'1',_Ba:{_rJ:{_O$:{ins:{actorId:'1'}}}},document:{hidden:false},
 setInterval(fn,ms){const id=++seq;callbacks.set(id,{fn,ms});return id;},
 clearInterval(id){callbacks.delete(id);}};
vm.runInNewContext(fs.readFileSync(__dirname+'/src/31-four-async-scans.js','utf8'),{window:W,Date,Promise});
const a=W.KVPV_FOUR_SCANS;
assert.equal(callbacks.size,4,'four independent timers');
assert.equal(a.status().readOnly,true);
assert.equal(a.status().allowKNB,false);
assert.equal(a.status().lanes.luyen_khi.readerReady,false);
assert.equal(a.status().lanes.tui.readerReady,true);
assert.equal(new Set([...callbacks.values()].map(x=>x.ms)).size,4,'each lane has independent interval');
a.stop();assert.equal(callbacks.size,0,'stop clears all four timers');
assert.equal(a.status().enabled,false);
console.log('PASS independent asynchronous read-only scans: four timers, safe reader gate, stop cleanup');
