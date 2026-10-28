'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const script=fs.readFileSync(__dirname+'/src/76-trutien-pvp.js','utf8');
const actorId='10228867268946';
function setup(){
 let time=100000,kind='TRU_TIEN',sc='2692',mode='BOSS_TH300_SCAN',bossRunning=true,hitrun=true,focus=true,
     cooldown=false,range=true,valid=true,job=null,dead=false,playing=true,selected;
 class Clock extends Date{static now(){return time;}}
 class Emitter{
   constructor(id,type){this.id=id;this.isValid=true;this.type=type;this.listeners=new Map();}
   property={get:k=>({id:this.id,type:this.type,hp:[100,100],position:{x:220,y:0}})[k]};
   on(k,owner,fn){this.listeners.set(k,fn);}
   off(k,owner,fn){if(this.listeners.get(k)===fn)this.listeners.delete(k);}
   emit(k,...args){this.listeners.get(k)?.(...args);}
 }
 const me=new Emitter(actorId,4),enemy=new Emitter('other-player',4),monster=new Emitter('monster',1);
 const rows=[[8001,0,50],[1001,0,200],[1002,0,200]],calls=[],timers=new Map(),remote=[];
 selected=enemy;
 const combat={get target(){return selected;},_jh:{get isPlaying(){return playing;}},isCooldown:()=>cooldown,
   isValidTarget:()=>valid,isValidRange:()=>range,
   combat(skill){calls.push(skill);me.emit(1039,enemy.id,skill);enemy.emit(1012,actorId,skill*10000,50,1,enemy.id);}
 };
 const selector={_rtt:rows,_wet:[],_f7t(active,common,mode){assert.equal(mode,1);
   const row=[...active,...common].find(x=>x[1]<time);
   if(!row)return -1;row[1]=time+row[2];return row[0];}};
 function C(){}function S(){}
 me.getComponent=k=>k===C?combat:k===S?selector:null;
 const pvp={start(o){remote.push(['start',o.autoDodge]);return{enabled:true};},stop(){remote.push(['stop']);},sync(){},status:()=>({enabled:remote.some(x=>x[0]==='start')})};
 const W={__KVPV_OWN_ACTOR_ID:actorId,_Ba:{_rJ:{_O$:{ins:{actorId,get isDead(){return dead;}}}}},
   _C:{_Ba:{instance:{getRole:()=>me}},_Mn:{_Cn:{get currentID(){return sc;}}}},
   _d:{_Yct:{_Het:C,_Eet:S}},KVPV_FAR_SCOPE:{status:()=>({inside:kind==='TRU_TIEN',kind})},
   KVPV_MODE:{status:()=>({mode}),stop(){mode='OFF';bossRunning=false;hitrun=false;}},
   KVPV_TH300:{status:()=>({running:bossRunning})},KVPV_HITRUN1:{status:()=>({running:hitrun})},
   KVPV_DAILY:{quickState:()=>({job})},
   KVPV_PVP_LUOFENG:pvp,
   document:{hidden:false,hasFocus:()=>focus},
   setInterval(fn,ms){assert.equal(ms,10);const id=timers.size+1;timers.set(id,fn);return id;},
   clearInterval(id){timers.delete(id);}};
 vm.runInNewContext(script,{window:W,Date:Clock,console},{timeout:3000});
 return {W,api:W.KVPV_TRUTIEN_PVP,calls,rows,enemy,monster,remote,timers,
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
 q.tick();assert.equal(q.calls[0],1001,'no basic 8001 even if first native row');
 q.tick();assert.equal(q.calls[1],1002,'next ready TH without animation wait');
 q.tick();assert.equal(q.calls.length,2,'not bypass native per-skill row cooldown');
 assert.equal(q.rows[1][2],200,'original cooldown unchanged');
 q.setCd(true);q.advance(1000);assert.equal(q.calls.length,2,'native cooldown blocks');
 q.setCd(false);q.setRange(false);q.tick();assert.equal(q.calls.length,2,'native range blocks');
 q.setRange(true);q.setValid(false);q.tick();assert.equal(q.calls.length,2,'native target validation blocks');
 q.setValid(true);q.setPlaying(true);q.tick();assert(q.calls.length>2,'skip visual animation waiting when native cooldown/target/range ready');
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
console.log('PASS Tru Tien PvP: manual 10ms TH-only, player type4, native cooldown/target/range, optional dodge, no heal or retreat, handoff and scene cleanup.');
