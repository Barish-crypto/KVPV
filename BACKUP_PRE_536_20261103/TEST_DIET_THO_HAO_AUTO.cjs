'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const requests=[];let state=1,map=0,common=true,open=true;
const W={__KVPV_OWN_ACTOR_ID:'123',_Ba:{_rJ:{_O$:{ins:{actorId:'123',isDead:false}}},_$d:{_oet:{ins:{get state(){return state;}}}},_$a:{SceneUtil:{get isCommonScene(){return common;}},_yo:{ins:{intoSce:[0]}}},_sst:{_ist:{inst:{getCpSceneStateByType:()=>[0,0,2]}},_Cht:{inst:{rqEtScene:(...args)=>requests.push(args)}}}},_C:{_Mn:{_Cn:{get currentID(){return map;}}}},KVPV_DAILY:{lichData:()=>({active:open?[{key:'diet_tho_hao'}]:[]})},document:{hidden:false},setInterval:()=>1,clearInterval(){}};
class Time extends Date{constructor(){super('2026-10-29T13:05:00Z');}static now(){return Date.parse('2026-10-29T13:05:00Z');}}
vm.runInNewContext(fs.readFileSync(__dirname+'/src/80-diet-tho-hao-auto.js','utf8'),{window:W,Date:Time,Intl});
const m=W.KVPV_DIET_THO_HAO_AUTO;assert.equal(requests.length,1);assert.deepEqual(requests[0],[2412,1]);
m.sync();assert.equal(requests.length,1,'no duplicate requests');
map=2412;m.sync();assert.equal(m.status().inside,true);
m.stop();assert.equal(m.status().enabled,false);
console.log('PASS Diệt Thổ Hào: native event entry uses server state and only one request per day');
