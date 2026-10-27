'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const source=fs.readFileSync(__dirname+'/src/13-transform-skills.js','utf8');
function harness({road=true,daily=false,full=true,nativeSending=true,hasForm=true}={}){
 let now=10000,calls=0,alive=true,cooling=false,inRange=true,valid=true,party=true,manual=false,
   priority=false,active=false,timer=null,spent=0,seq=0;
 class Clock extends Date{static now(){return now;}}
 function Combat(){}
 const combat={target:{property:{get:k=>k==='type'?1:null}},
   isValidTarget:()=>valid,isValidRange:()=>inRange,isCooldown:()=>cooling};
 const role={getComponent:k=>k===Combat?combat:null};
 const m={curShowId:0,curStrength:full?100:0,curFightShowId:17,sendTrans:false,
   isTransforming:()=>active,huanhuaList:()=>hasForm?{17:true}:{}};
 const W={__KVPV_OWN_ACTOR_ID:'12345',
  _Ba:{_rJ:{_O$:{ins:{actorId:'12345',get isDead(){return !alive;}}}},
   _s3:{_ZJ:{ins:m},_Kyt:{ins:{Transforming(){calls++;if(nativeSending)m.sendTrans=true;},
     BuyTransformingStrength(){spent++;throw Error('Premium prohibited');}}}},
   _cm:{_q3t:{ins:{getHasTeamByType:()=>party}}},
   _Do:{_Ho:{inst:{getFcIsOpen:()=>true}}}},
  _ft:{_gY:{ins:{getCfgById:()=>[0,0,[100]]}},
   _po:{ins:{getCfgById:()=>[0,0,0,0,0,0,0,road?41:10]}}},
  _C:{_Mn:{_Cn:{currentID:2518}},_Ba:{instance:{getRole:()=>role}}},
  _d:{_Yct:{_Het:Combat}},KVPV_DAILY:{quickState:()=>({running:daily})},
  KVPV_FAR_SCOPE:{status:()=>({kind:'OUTSIDE'}),inside:()=>false},
  KVPV_BOSS_TEAM:{priority:()=>priority},
  get __KVPV_USER_UI_UNTIL(){return manual?now+100:0;},
  setInterval(fn){timer=fn;return ++seq;},clearInterval(){timer=null;}};
 const load=()=>{vm.runInNewContext(source,{window:W,Date:Clock,console});return W.KVPV_TRANSFORM10;};
 const tick=()=>{assert.equal(typeof timer,'function');timer();};
 return {W,m,load,tick,step(ms=100){now+=ms;tick();},
  get calls(){return calls;},get spent(){return spent;},
  set cooling(v){cooling=v;},set valid(v){valid=v;},
  set priority(v){priority=v;},set manual(v){manual=v;},
  set active(v){active=v;},set inRange(v){inRange=v;},
  set alive(v){alive=v;},set nativeSending(v){nativeSending=v;},
  set daily(v){daily=v;},set road(v){road=v;},
  set party(v){party=v;}
 };
}
{
 const h=harness(),mod=h.load();h.tick();
 assert.equal(h.calls,1,'Road full strength activates independently of Daily');
 assert.equal(h.m.sendTrans,true);
 h.step(200);assert.equal(h.calls,1,'pending ACK never duplicates');
 h.step(16000);assert.equal(h.calls,1,'timed out ACK never duplicates');
 assert.equal(mod.status().chargedConsumed,true);
 h.load();h.tick();assert.equal(h.calls,1,'hot reload must retain pending lock');
 h.m.curStrength=0;h.step(500);
 h.m.curStrength=100;h.m.sendTrans=false;h.step(3100);assert.equal(h.calls,2,'refilled free strength can activate again');
 h.active=true;h.step(50);
 assert.equal(h.W.KVPV_TRANSFORM10.status().activationReason,'native_form_active');
 assert.equal(h.spent,0,'no premium currency');
}
{
 const h=harness({full:false});h.load();h.tick();assert.equal(h.calls,0,'no free strength => never activate');
 h.m.curStrength=100;h.cooling=true;h.step();assert.equal(h.calls,0,'native cooldown gate');
 h.cooling=false;h.manual=true;h.step();assert.equal(h.calls,0,'manual input yields');
 h.manual=false;h.priority=true;h.step();assert.equal(h.calls,0,'Boss Team owns combat');
 h.priority=false;h.inRange=false;h.step();assert.equal(h.calls,0,'out of range');
 h.inRange=true;h.valid=false;h.step();assert.equal(h.calls,0,'invalid target');
 h.valid=true;h.step();assert.equal(h.calls,1,'ready Road boss triggers native button once');
 h.W.KVPV_TRANSFORM10.stop();h.m.sendTrans=false;h.step;
 assert.equal(h.W.KVPV_TRANSFORM10.status().enabled,false,'manual stop persists without timer');
}
{
 const h=harness({road:false,daily:false});h.load();h.tick();
 assert.equal(h.calls,0,'normal map with Daily disabled is not auto-activated');
 h.daily=true;h.step();assert.equal(h.calls,1,'existing Daily activation preserved');
}
{
 const h=harness({nativeSending:false});h.load();h.tick();
 assert.equal(h.calls,1,'native may reject locally');
 h.step(200);assert.equal(h.calls,1,'local rejection is throttled');
 h.step(3000);assert.equal(h.calls,2,'new locally blocked attempt after 3 seconds only');
}
{
 const h=harness({hasForm:false});h.load();h.tick();assert.equal(h.calls,0,'form must be owned');
}
console.log('PASS transform: Road free energy, daily fallback, native ACK guard, no duplicate, manual/scene/cooldown, reload/recharge, no KNB');
