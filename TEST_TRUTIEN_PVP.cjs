'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const script=fs.readFileSync(__dirname+'/src/76-trutien-pvp.js','utf8');
const buildSource=fs.readFileSync(__dirname+'/build.cjs','utf8');
assert(buildSource.includes('"75-pvp-luofeng.js"')&&buildSource.includes('"76-trutien-pvp.js"'),'both PvP modules must be included in live-reload installer list');
const actorId='10228867268946';
function setup(){
 let time=100000,kind='TRU_TIEN',sc='2692',mode='BOSS_TH300_SCAN',bossRunning=true,hitrun=true,focus=true,
     cooldown=false,range=true,valid=true,job=null,dead=false,playing=true,selected;
 class Clock extends Date{static now(){return time;}}
 class Emitter{
   constructor(id,type){this.id=id;this.isValid=true;this.type=type;this.hpNow=100;this.listeners=new Map();this.point={x:id===actorId?220:0,y:0};}
   property={get:k=>({id:this.id,type:this.type,hp:[this.hpNow,100],position:this.point})[k]};
   on(k,owner,fn){this.listeners.set(k,fn);}
   off(k,owner,fn){if(this.listeners.get(k)===fn)this.listeners.delete(k);}
   emit(k,...args){this.listeners.get(k)?.(...args);}
 }
 const me=new Emitter(actorId,4),enemy=new Emitter('other-player',4),enemy2=new Emitter('other-player-2',4),monster=new Emitter('monster',1);
 const rows=[[8001,0,50],[1001,0,200],[1002,0,200],[8002,0,50],[8005,0,100]],calls=[],timers=new Map(),remote=[];
 selected=enemy;
 const moveCalls=[],movement={running:()=>false,moveTo(x,y){moveCalls.push({x,y});}};
 const combat={get target(){return selected;},_jh:{get isPlaying(){return playing;}},isCooldown:()=>cooldown,
   isValidTarget:()=>valid,isValidRange:()=>range,
   combat(skill){calls.push(skill);me.emit(1039,selected.id,skill);selected.emit(1012,actorId,skill*10000,50,1,selected.id);}
 };
 const selector={_rtt:rows,_wet:[],_f7t(active,common,mode){assert.equal(mode,1);
   const row=[...active,...common].find(x=>x[1]<time);
   if(!row)return -1;row[1]=time+row[2];return row[0];}};
 function C(){}function S(){}function M(){}
 me.getComponent=k=>k===C?combat:k===S?selector:k===M?movement:null;
 const pvp={start(o){remote.push(['start',o.autoDodge]);return{enabled:true};},stop(){remote.push(['stop']);},sync(){},status:()=>({enabled:remote.some(x=>x[0]==='start')})};
 const W={__KVPV_OWN_ACTOR_ID:actorId,_Ba:{_rJ:{_O$:{ins:{actorId,get isDead(){return dead;}}}}},
   _C:{_Ba:{instance:{getRole:()=>me}},_Mn:{_Cn:{get currentID(){return sc;}}}},
   _d:{_Yct:{_Het:C,_Eet:S,_zet:M}},KVPV_FAR_SCOPE:{status:()=>({inside:kind==='TRU_TIEN',kind})},
   KVPV_MODE:{status:()=>({mode}),stop(){mode='OFF';bossRunning=false;hitrun=false;}},
   KVPV_TH300:{status:()=>({running:bossRunning})},KVPV_HITRUN1:{status:()=>({running:hitrun})},
   KVPV_DAILY:{quickState:()=>({job})},
   KVPV_PVP_LUOFENG:pvp,
   document:{hidden:false,hasFocus:()=>focus},
   setInterval(fn,ms){assert([10,120].includes(ms),'only known 10ms/120ms timers');const id=timers.size+1;timers.set(id,fn);return id;},
   clearInterval(id){timers.delete(id);}};
 vm.runInNewContext(script,{window:W,Date:Clock,console},{timeout:3000});
 return {W,api:W.KVPV_TRUTIEN_PVP,Clock,calls,rows,enemy,enemy2,monster,remote,timers,moveCalls,
   tick:()=>{time+=10;for(const fn of timers.values())fn();},advance:ms=>{time+=ms;for(const fn of timers.values())fn();},
   setKind:v=>kind=v,setScene:v=>sc=v,setTarget:v=>selected=v,
   setCd:v=>cooldown=v,setFocus:v=>focus=v,setRange:v=>range=v,setValid:v=>valid=v,
   setJob:v=>job=v,setDead:v=>dead=v,setPlaying:v=>playing=v};
}
{
 const q=setup();
 assert.equal(q.api.status().enabled,false);
 assert.throws(()=>{q.setTarget(q.monster);q.api.start({autoDodge:true});},/Select a real enemy player/);
 assert.equal(q.W.KVPV_MODE.status().mode,'BOSS_TH300_SCAN','invalid target never clears boss owner');
 q.setTarget(q.enemy);
 const s=q.api.start({autoDodge:true});
 assert.equal(q.W.KVPV_MODE.status().mode,'OFF','explicit start releases old boss owner to prevent monster target reacquire');
 assert.equal(s.enabled,true);assert.equal(s.autoDodge,true);assert.equal(q.timers.size,1);
 q.tick();assert.equal(q.calls[0],1001,'first choose a native TH, not first 8001 row');
 q.tick();assert.equal(q.calls[1],8005,'after TH prefer initial native basic 8005');
 q.tick();assert.equal(q.calls[2],1002,'after basic return to next ready TH');
 q.tick();assert.equal(q.calls[3],8002,'while TH on cooldown, next ready basic fills the gap');
 q.tick();assert.equal(q.calls[4],8001,'use final ready native basic during TH cooldown');
 assert.deepEqual(q.calls.slice(0,5),[1001,8005,1002,8002,8001]);
 assert.equal(q.api.status().thAttempts,2);
 assert.equal(q.api.status().basicAttempts,3);
 assert.equal(q.api.status().paceMs,10);
 assert.equal(q.api.status().focusTargetId,q.enemy.id);
 assert.equal(q.api.status().observedSkills.length,5);
 assert.deepEqual(q.rows.map(row=>row[2]),[50,200,200,50,100],'native per-skill cooldown durations unchanged');
 q.setCd(true);const cdBefore=q.calls.length;q.advance(1000);assert.equal(q.calls.length,cdBefore,'native cooldown blocks');
 q.setCd(false);q.setRange(false);q.tick();assert.equal(q.calls.length,cdBefore,'native range blocks');
 q.setRange(true);q.setValid(false);q.tick();assert.equal(q.calls.length,cdBefore,'native target validation blocks');
 q.setValid(true);q.setPlaying(true);q.tick();assert(q.calls.length>cdBefore,'skip visual animation waiting when native cooldown/target/range ready');
 const beforeFocus=q.calls.length;
 q.setTarget(q.enemy2);q.tick();
 assert.equal(q.calls.length,beforeFocus,'focus-lock prevents splitting attacks across live opponents');
 assert.equal(q.api.status().reason,'focus_locked_switch_manual');
 assert.equal(q.api.status().focusTargetId,q.enemy.id);
 q.api.setFocusToSelected();q.advance(200);
 assert.equal(q.api.status().focusTargetId,q.enemy2.id,'operator may deliberately focus second player');
 assert.equal(q.api.status().observedSkills.length,1,'damage ranking resets per PvP target');
 assert(q.calls.length>beforeFocus,'can attack focused second enemy');
 q.setTarget(q.monster);q.tick();assert.equal(q.api.status().reason,'select_player_target','never casts on monsters');
 q.setTarget(q.enemy);q.setFocus(false);const before=q.calls.length;q.tick();assert.equal(q.calls.length,before,'background/unfocused blocks');
 q.setFocus(true);q.setJob('quest');q.tick();assert.equal(q.calls.length,before,'daily job priority');
 q.setJob(null);q.setDead(true);q.tick();assert.equal(q.calls.length,before,'dead player cannot attack');
 q.setDead(false);q.setKind('OUTSIDE');q.tick();assert.equal(q.api.status().enabled,false,'exit disables mode');
 assert.equal(q.timers.size,0);assert.equal(q.enemy.listeners.size,0,'listeners cleaned up');
 assert(q.remote.some(x=>x[0]==='stop'),'stops La Phong PvP observer');
}
{
 const q=setup();q.setKind('OUTSIDE');assert.throws(()=>q.api.start(),/verified Tru Tien/);
 assert.equal(q.W.KVPV_MODE.status().mode,'BOSS_TH300_SCAN','invalid scope leaves old mode untouched');
 q.setKind('TRU_TIEN');q.setTarget(q.enemy);q.api.start({autoDodge:false});
 q.tick();const before=q.calls.length;q.setScene('2691');q.tick();
 assert.equal(q.api.status().enabled,false,'scene change stops and unbinds');assert.equal(q.calls.length,before);
}
{
 const q=setup();
 const realPvp=fs.readFileSync(__dirname+'/src/75-pvp-luofeng.js','utf8');
 vm.runInNewContext(realPvp,{window:q.W,Date:q.Clock,console},{timeout:3000});
 q.api.start({autoDodge:true});
 assert.equal(q.W.KVPV_PVP_LUOFENG.status().attached,true,'real PR2 module attaches to actual type4 enemy in Tru Tien');
 q.enemy.emit(1039,actorId,1001);
 assert.equal(q.W.KVPV_PVP_LUOFENG.status().observedTH,1,'real enemy TH signal parsed');
 assert.equal(q.moveCalls.length,1,'real module native dodge issued while Tru Tien mode owns combat');
 q.api.stop();
 assert.equal(q.timers.size,0,'both 10ms attack and 120ms dodge observer timers cleaned');
 assert.equal(q.enemy.listeners.size,0,'all native opponent listeners released');
}
console.log('PASS Tru Tien PvP: manual 10ms TH+five basics, focused one target, native cooldown/target/range, optional dodge, all-in, handoff and cleanup.');
