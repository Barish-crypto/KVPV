'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const source=fs.readFileSync(require('node:path').join(__dirname,'../KVPV_BOSS_DANH_NE_DANH.js'),'utf8');
const calls=[],W={__KVPV_OWN_ACTOR_ID:'123',_Ba:{_rJ:{_O$:{ins:{actorId:'123'}}}},console:{info(){}}};
const methods={KVPV_FAR_SCOPE:['setAllBosses'],KVPV_TH300:['setBasicOnly','setInterleaved','setPrimaryBasic','setBasicRotation','setBasicHitQuota','setSkillPriority','setClientPace','setBurst','setBasicProbe'],KVPV_TQ112:['enable'],KVPV_TQ113:['enable'],KVPV_TQ114:['enable'],KVPV_TQ117:['enable'],KVPV_TQ115:['stop'],KVPV_MODE:['armTianQuan']};
for(const [name,list]of Object.entries(methods)){W[name]={};for(const method of list)W[name][method]=(...args)=>calls.push([name,method,...args]);}
W.KVPV_TQ_SCOPE={inside:()=>true};W.KVPV_FAR_SCOPE.status=()=>({kind:'THIEN_QUAN'});
const run=()=>vm.runInNewContext(source,{window:W});
W.__KVPV_OWN_ACTOR_ID='foreign';assert.throws(run,/đúng nhân vật/);assert.equal(calls.length,0);W.__KVPV_OWN_ACTOR_ID='123';
const enable=W.KVPV_TQ117.enable;delete W.KVPV_TQ117.enable;assert.throws(run,/Thiếu/);assert.equal(calls.length,0);W.KVPV_TQ117.enable=enable;
W.KVPV_DESKTOP_CONTROL={scopeProfile:()=>({mode:'basic8001'})};assert.throws(run,/mixed/);assert.equal(calls.length,0);delete W.KVPV_DESKTOP_CONTROL;
run();assert(calls.some(x=>x[1]==='setBasicOnly'&&x[2]===false));assert(calls.some(x=>x[1]==='setBasicHitQuota'&&x[2]===null));assert(calls.some(x=>x[1]==='setClientPace'&&x[2]===100));assert(calls.some(x=>x[0]==='KVPV_TQ115'&&x[1]==='stop'));
assert.equal(calls.filter(x=>x[1]==='enable'&&x[2]===true).length,4);assert.equal(calls.at(-1)[1],'armTianQuan');
assert(!calls.some(x=>['combat','moveTo','setInterval','setTimeout'].includes(x[1])));
console.log('PASS Boss dodge profile: preflight before changes, actor/profile gates, native dodge enabled, pet-only kite disabled, TH priority and bounded pace; no direct casts or moves.');
