'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
let now=120000,cooldown=false,valid=true,manual=false,inside=true,seq=0;
class Clock extends Date{static now(){return now;}}
const actor='12345',targetId='bossA',occ=4221016;
function emitter(props){const events=new Map();return {property:{get:k=>props[k]},events,
 on(code,owner,fn){events.set(code,fn);},off(code,owner,fn){if(events.get(code)===fn)events.delete(code);},
 emit(code,...args){events.get(code)?.(...args);}};}
const target=emitter({id:targetId,type:1,occ,position:{x:0,y:0},hp:[100,100]});
const role=emitter({id:actor,position:{x:50,y:0}});
const rows=[[1004,0,1050],[1008,0,1200],[8004,0,320],[8001,0,293],[8002,0,445]];
const nativeRows=()=>JSON.stringify(rows);
const originalRows=nativeRows();
function Skill(){}function Combat(){}
const selector={_rtt:rows,_wet:[],
 _f7t(active,common=[],mode){const row=[...active,...common].find(r=>Number(r[1])<now);
   if(!row)return -1;row[1]=now+Number(row[2]);return Number(row[0]);},
 selectSkill(){return this._f7t(this._rtt,this._wet,1);}};
const nativeSelector=selector._f7t;
const casts=[],combat={target,isCooldown:()=>cooldown,isValidTarget:()=>valid,isValidRange:()=>true,
 combat(id){if(cooldown||!valid)throw Error('native combat called while unavailable');
  casts.push(id);role.emit(1039,targetId,id);}};
const nativeCombat=combat.combat;
role.getComponent=key=>key===Skill?selector:key===Combat?combat:null;
const samples=[];
function put(id,damage,interval){for(let i=0;i<10;i++){const at=1000+i*2000+id;samples.push({
 at,id,targetId,occ,map:2518,hitAt:at+85,readyAt:at+interval,damage
});}}
put(8001,1100000000,293);put(8004,1050000000,320);put(8002,950000000,445);
const W={__KVPV_OWN_ACTOR_ID:actor,
 _Ba:{_rJ:{_O$:{ins:{actorId:actor,isDead:false}}},_cm:{_q3t:{ins:{getHasTeamByType:t=>t===1}}}},
 _ft:{_po:{ins:{getCfgById:()=>[0,0,0,0,0,0,0,inside?41:0]}}},
 _C:{_Mn:{_Cn:{currentID:2518}},_Ba:{instance:{getRole:()=>role}}},
 _d:{_Yct:{_Eet:Skill,_Het:Combat}},
 KVPV_TQ_SCOPE:{inside:()=>false},document:{hidden:false},
 KVPV_ROAD_CADENCE:{_handoff:()=>({actor,samples,enabled:true,combatMode:'native',basicPriority:true,minCastIntervalMs:0}),stop(){}},
 KVPV_ACCOUNT_POLICY:{pollingGap:()=>0},
 setInterval(){return ++seq;},clearInterval(){}};
const load=file=>vm.runInNewContext(fs.readFileSync(__dirname+'/'+file,'utf8'),{window:W,Date:Clock,console});
load('src/59-road-cadence.js');load('src/12-basic-outside.js');
const road=W.KVPV_ROAD_CADENCE,auto=W.KVPV_BASIC10;
assert.equal(road.status().basicPriority,true);
assert.equal(road.status().preferredBasic,8001);
assert.equal(road.status().minCastIntervalMs,80);
assert.equal(auto.status().intervalMs,100);
assert.notEqual(selector._f7t,nativeSelector,'must wrap native selector without replacing game code');
const choose=()=>{const id=selector.selectSkill();if(id>0)combat.combat(id);return id;};
assert.equal(choose(),8001,'proven high-efficiency basic before ready TH');
now+=80;assert.equal(choose(),8004,'next ready basic in the rotation');
now+=80;assert.equal(choose(),1004,'every third observed native cast lets TH fire');
now+=1100;assert.equal(choose(),8001,'return to ready basic after TH');
const before=catches();cooldown=true;const plan=road.planNativeSelection(rows,[],1);
assert.equal(plan,null,'native cooldown prevents priority selection');
cooldown=false;manual=true;W.__KVPV_USER_UI_UNTIL=now+500;
assert.equal(road.planNativeSelection(rows,[],1),null,'user input keeps native selection');
manual=false;W.__KVPV_USER_UI_UNTIL=0;
W.KVPV_ROAD_CADENCE.setBasicPriority(false);
now+=80; // clear the legitimate native duplicate-call guard before testing fallback
assert.equal(road.planNativeSelection(rows,[],1),null,'explicit disable preserves native behavior');
assert.equal(selector.selectSkill(),1004,'disabled priority restores the original first-ready native order');
road.setBasicPriority(true);
inside=false;assert.equal(road.planNativeSelection(rows,[],1),null,'scene switch disables strategy');
inside=true;valid=false;assert.equal(road.planNativeSelection(rows,[],1),null,'invalid target prevents strategy');
valid=true;
const hand=road._handoff();assert.equal(hand.basicPriority,true);
road.setBasicPriority(false);load('src/59-road-cadence.js');
assert.equal(W.KVPV_ROAD_CADENCE.basicPriority,false,'hot reload preserves operator choice');
auto.stop();assert.equal(selector._f7t,nativeSelector,'original native selector restored');
assert.equal(combat.combat,nativeCombat,'original combat function restored');
const after=nativeRows();
assert.equal(rows[0][2],1050);assert.equal(rows[1][2],1200);assert.equal(rows[2][2],320);assert.equal(rows[3][2],293);assert.equal(rows[4][2],445);
assert.equal(casts.length,4,'exactly one native combat call per chosen skill');
assert.deepEqual(Array.from(casts),[8001,8004,1004,8001]);
assert.equal(before,4);
function catches(){return casts.length;}
console.log('PASS Road smart basics: evidence-only ranking, ready 8001/8004, TH cadence, native cooldown, manual override, scene/actor safety, native restoration');
