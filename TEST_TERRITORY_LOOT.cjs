'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
let job='lanhdia',map=2164,type=1,occ=1,hp=[100,100],name='Hộ Vệ Tầng 1';
const ids=Array.from({length:13},(_,i)=>i+1),deadIds=new Set();
const W={__KVPV_OWN_ACTOR_ID:'123',_Ba:{_rJ:{_O$:{ins:{actorId:'123'}}},_$a:{_yo:{ins:{get intoSce(){return [map];}}}},_zLt:{_VLt:{ins:{getBsList:()=>ids}}}},KVPV_DAILY:{quickState:()=>({job})}};
const target={property:{get:k=>({type,occ,hp,name})[k]}};
vm.runInNewContext(fs.readFileSync(__dirname+'/src/00-territory-loot.js','utf8'),{window:W});const api=W.KVPV_TERRITORY_LOOT,state={};
const decide=selected=>api.decide({ids,final:13,selected,target,state,alive:id=>!deadIds.has(id),dead:id=>deadIds.has(id)});
for(let i=1;i<=9;i++){occ=i;name='Hộ Vệ Tầng '+i;hp=[10,100];assert.equal(api.shouldBlock(target),false);assert.equal(decide(i).next,i);assert.equal(api.status().skipped.length,0);deadIds.add(i);}
const names=['Thần Binh Đồ Diệt','Thời Trang - Cửu Vĩ','Linh Tỉ Thần Uy','Linh Dực Thiên Vũ'];
for(let i=0;i<4;i++){occ=i+10;name=names[i];hp=[11.1,100];assert.equal(api.shouldBlock(target),false);assert.equal(decide(occ).next,occ);hp=[11,100];assert.equal(api.shouldBlock(target),true);const result=decide(occ);assert.notEqual(result.next,occ);assert.equal(result.done,i===3);}
assert.equal(api.status().skipped.length,4);assert.equal(api.status().seenLootGroups.length,4);
assert.equal(api.lootKind('THAN BINH Do Diet'),'weapon');assert.equal(api.lootKind('linh ti - test'),'talisman');assert.equal(api.lootKind('Linh Tịch'),null);assert.equal(api.lootKind('Cửu Vĩ'),null);assert.equal(api.lootKind('Quái thường'),null);
const invalid={};hp=[undefined,100];api.decide({ids,final:10,target,state:invalid,alive:()=>true});assert.equal(Object.keys(invalid.territoryLoot.skipped).length,0);
hp=[10,0];assert.equal(api.percent(target),null);hp=[10,100];occ=999;assert.equal(api.shouldBlock(target),false);occ=10;name=names[0];
job='tientuyen';assert.equal(api.shouldBlock(target),false);job='lanhdia';map=2151;assert.equal(api.shouldBlock(target),false);map=2164;type=3;assert.equal(api.shouldBlock(target),false);type=1;
assert.throws(()=>api.setCutoff(100));assert.throws(()=>api.setCutoff(NaN));
const old={territoryLoot:{skipped:{'1':10}}};occ=1;name='Hộ vệ';hp=[10,100];api.decide({ids,final:1,selected:1,target,state:old,alive:()=>true});assert.equal(Object.keys(old.territoryLoot.skipped).length,0);
assert.equal(api.decide({ids:[],target,state:{},alive:()=>true}).done,false);
console.log('PASS territory: first nine progression Bosses never cut off; name-matched four loot groups switch at 11%, completion needs all groups, migration and unrelated target/job/scene guards.');
