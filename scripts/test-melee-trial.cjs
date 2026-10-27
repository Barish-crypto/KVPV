'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const source=fs.readFileSync(require('node:path').join(__dirname,'../KVPV_BOSS_AP_SAT_THU.js'),'utf8');
function harness(){
 let now=1000,phase='FIGHT',running=true,cooling=false,moving=false,health=[100,100],point={x:300,y:0},armed=0,basicEnabled=true;
 const timers=new Set(),moves=[];class Clock extends Date{static now(){return now;}}
 const target={isValid:true,property:{get:k=>({id:'boss',type:1,occ:99,hp:[100,100],position:{x:0,y:0}})[k]}};
 const combat={target,isCooldown:()=>cooling,combat(){return 'native';}},mover={running:()=>moving,moveTo(x,y){moves.push({x,y});point={x,y};}};
 const Combat=function(){},Move=function(){};
 const role={on(){},off(){},property:{get:k=>k==='hp'?health:k==='position'?point:null},getComponent:t=>t===Combat?combat:t===Move?mover:null};
 const W={__KVPV_OWN_ACTOR_ID:'123',_Ba:{_rJ:{_O$:{ins:{actorId:'123',isDead:false}}}},_d:{_Yct:{_Het:Combat,_zet:Move}},_C:{_Mn:{_Cn:{currentID:10}},_Ba:{instance:{getRole:()=>role}}},_ft:{_tY:{ins:{isBoss:()=>true}}},console:{info(){},warn(){}},setInterval(fn){timers.add(fn);return fn;},clearInterval(fn){timers.delete(fn);}};
 W.KVPV_MODE={status:()=>({mode:'BOSS_TH300_SCAN',pendingTianQuanMode:'BOSS_TH300_SCAN'}),stop(){running=false;},armTianQuan(){armed++;},start(){}};
 W.KVPV_TQ_SCOPE={inside:()=>true};W.KVPV_FAR_SCOPE={status:()=>({kind:'THIEN_QUAN'}),eligible:()=>true};
 W.KVPV_BASIC10={status:()=>({enabled:basicEnabled}),stop(){basicEnabled=false;},start(){basicEnabled=true;}};
 W.KVPV_HITRUN1={status:()=>({running,phase}),start(){running=true;phase='FIGHT';},stop(){running=false;}};
 for(const name of ['KVPV_TQ112','KVPV_TQ113','KVPV_TQ114','KVPV_TQ117','KVPV_TQ115'])W[name]={config:{enabled:true},enable(v){this.config.enabled=v;},stop(){this.config.enabled=false;}};
 W.KVPV_TQ112.status=()=>({selectedBoss:'boss',trainedMarkers:[90010000],predicted:{eta:4000,confidence:0.95}});W.KVPV_TQ113.status=()=>({pending:null});
 return {W,moves,timers,combat,load(){vm.runInNewContext(source,{window:W,Date:Clock});},tick(ms=100){now+=ms;for(const fn of [...timers])fn();},phase(v){phase=v;},hp(v){health=[v,100];},cool(v){cooling=v;},position(x){point={x,y:0};},moving(v){moving=v;},armed:()=>armed};
}
const q=harness();q.load();assert.equal(q.moves.length,1);assert.equal(q.moves[0].x,80);q.tick(100);assert.equal(q.moves.length,1);
q.position(300);q.phase('DODGE');q.tick(100);assert.equal(q.moves.length,1);q.phase('RETREAT');q.hp(35);q.tick(100);assert.equal(q.moves.length,1);
q.W.KVPV_MELEE_TRIAL.restore();assert.equal(q.W.KVPV_MELEE_TRIAL.status().pendingRestore,true);assert.equal(q.armed(),0);
q.phase('FIGHT');q.hp(100);q.tick();assert.equal(q.W.KVPV_MELEE_TRIAL.status().running,false);assert.equal(q.armed(),1);assert.equal(q.timers.size,0);
const r=harness();r.cool(true);r.load();assert.equal(r.moves.length,0);r.cool(false);r.moving(true);r.tick(100);assert.equal(r.moves.length,0);r.moving(false);r.tick(100);assert.equal(r.moves.length,1);r.tick(1200);assert.equal(r.armed(),1);assert.equal(r.timers.size,0);
const s=harness();s.phase('RETREAT');assert.throws(()=>s.load(),/pha bảo vệ/);assert.equal(s.moves.length,0);assert.equal(s.timers.size,0);
const t=harness();t.load();t.combat.target=null;t.tick();assert.equal(t.W.KVPV_MELEE_TRIAL.status().running,false);assert.equal(t.armed(),1);
const u=harness();u.W.KVPV_TQ112.status=()=>({});assert.throws(()=>u.load(),/cửa sổ áp sát/);assert.equal(u.moves.length,0);
const v=harness();const native=v.combat.combat;v.load();assert.equal(v.combat.combat(8001),'native');assert.equal(v.combat.combat(8001),undefined);v.tick();assert.equal(v.armed(),1);assert.equal(v.combat.combat,native);
console.log('PASS guarded melee: trained forecast required, no blind approach, one native call maximum, 1.2s timeout, dodge/recovery priority and restored native combat.');
