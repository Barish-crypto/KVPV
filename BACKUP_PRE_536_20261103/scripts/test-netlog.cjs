'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const source=fs.readFileSync(require('node:path').join(__dirname,'../KVPV_CHAN_DOAN_MAT_KET_NOI.js'),'utf8');
class Target{constructor(){this.handlers=new Map();}addEventListener(k,f){if(!this.handlers.has(k))this.handlers.set(k,new Set());this.handlers.get(k).add(f);}removeEventListener(k,f){this.handlers.get(k)?.delete(f);}emit(k,e={}){for(const f of [...(this.handlers.get(k)||[])])f(e);}}
class Socket extends Target{constructor(){super();this.readyState=1;this.bufferedAmount=0;this.messages=[];}send(value){if(this.readyState!==1)throw Error('closed');this.messages.push(value);return 7;}close(code){this.readyState=3;this.emit('close',{code:code??1000,wasClean:true,reason:''});return 8;}}
const storage=new Map(),timers=new Set(),W=new Target();
Object.assign(W,{WebSocket:Socket,__KVPV_OWN_ACTOR_ID:'123',_Ba:{_rJ:{_O$:{ins:{actorId:'123'}}}},navigator:{onLine:true},document:new Target(),console:{info(){}},localStorage:{getItem:k=>storage.get(k),setItem:(k,v)=>storage.set(k,v)},setInterval:fn=>{timers.add(fn);return fn;},clearInterval:fn=>timers.delete(fn)});
const originalSend=Socket.prototype.send,originalClose=Socket.prototype.close,existing=new Socket();
W.KVPV_ROAD_CADENCE={status:()=>({enabled:true,combatMode:'native',casts:42,matchedHits:30})};
const install=()=>vm.runInNewContext(source,{window:W});install();
assert.equal(existing.send('secret payload'),7);assert.deepEqual(existing.messages,['secret payload']);
const fresh=new W.WebSocket();assert(fresh instanceof Socket);fresh.emit('open');fresh.send(new Uint8Array(2));fresh.emit('message',{data:'private incoming'});
for(const tick of timers)tick();let r=W.KVPV_NETLOG.report();assert.equal(r.samples[0].sent,2);assert.equal(r.samples[0].received,1);assert.equal(r.samples[0].state.road.casts,42);
existing.emit('close',{code:1006,wasClean:false,reason:''});r=W.KVPV_NETLOG.report();assert.equal(r.lastIncident.code,1006);assert.equal(r.savedIncident.samples.length,1);assert(!W.KVPV_NETLOG.export().includes('secret payload'));assert(!W.KVPV_NETLOG.export().includes('private incoming'));
assert.equal(fresh.close(1000),8);assert.equal(W.KVPV_NETLOG.report().lastIncident.localClose.code,1000);
W.emit('offline');assert.equal(W.KVPV_NETLOG.report().lastIncident.type,'browser_offline');
W.KVPV_NETLOG.stop();assert.equal(W.WebSocket,Socket);assert.equal(Socket.prototype.send,originalSend);assert.equal(Socket.prototype.close,originalClose);assert.equal(timers.size,0);
install();assert.equal(W.KVPV_NETLOG.report().savedIncident.event.type,'browser_offline');W.KVPV_NETLOG.stop();install();assert.equal(W.KVPV_NETLOG.report().savedIncident.event.type,'browser_offline');
const dead=new W.WebSocket();dead.readyState=3;assert.throws(()=>dead.send('x'),/closed/);assert.equal(W.KVPV_NETLOG.report().lastIncident.type,'send_error');
storage.set=()=>{throw Error('quota');};W.KVPV_NETLOG.save();assert.equal(W.KVPV_NETLOG.report().storageError,'quota');W.KVPV_NETLOG.stop();
console.log('PASS network log: existing/future sockets, native return/errors, counters, abnormal/local close, offline, persistent incident across reloads, no packet content, storage failure and teardown.');
