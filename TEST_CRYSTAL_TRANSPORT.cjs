'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const source=fs.readFileSync(__dirname+'/src/82-crystal-transport.js','utf8');
let scheduled=0;
const W={__KVPV_OWN_ACTOR_ID:'123',
 _Ba:{_rJ:{_O$:{ins:{actorId:'123'}}},_$a:{_yo:{ins:{intoSce:[2702]}},SceneUtil:{isCommonScene:false}}},
 KVPV_DAILY:{lichData:()=>({active:[{key:'event',name:'Vận Chuyển Pha Lê',time:'20:00'}],upcoming:[]})},
 KVPV_V1:{timers:{setInterval:()=>{scheduled++;return 1;},clearInterval:()=>{}}}};
vm.runInNewContext(source,{window:W,console});
const api=W.KVPV_CRYSTAL_TRANSPORT;
assert.equal(api.status().event.name,'Vận Chuyển Pha Lê');
assert.equal(api.status().automaticTransportReady,false);
assert.equal(api.status().running,true);
assert.equal(scheduled,1);
assert(!/\.moveTo\s*\(|send[A-Z]\w*\s*\(|\.combat\s*\(/.test(source),'observer must not move, attack, or send native requests');
api.stop();assert.equal(api.status().running,false);
console.log('PASS crystal transport observer: no guessed native actions');
