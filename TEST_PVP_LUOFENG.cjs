'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const script=fs.readFileSync(__dirname+'/src/75-pvp-luofeng.js','utf8');
function harness(){
 let tick=1000,scene=5000,target=null,busy=false,high=false,paused=false,mode='OFF';
 const id='10228867268946',timers=new Map(),moveCalls=[];
 class Clock extends Date{static now(){return tick;}}
 class Emitter{
  constructor(uid,type){this.id=uid;this.type=type;this.isValid=true;this.listeners=new Map();this.point={x:0,y:0};}
  property={get:(k)=>({id:this.id,type:this.type,position:this.point})[k]};
  on(key,owner,fn){this.listeners.set(key,fn);}
  off(key,owner,fn){if(this.listeners.get(key)===fn)this.listeners.delete(key);}
  emit(key,...args){this.listeners.get(key)?.(...args);}
 }
 const enemy=new Emitter('enemy1',2);
 enemy.point={x:0,y:0};
 const monster=new Emitter('monster1',1);
 const move={_fut:0,running:()=>busy,moveTo(x,y){moveCalls.push({x,y});}};
 const combat={get target(){return target;}};
 function Combat(){}function Move(){}
 const me={id,isValid:true,point:{x:200,y:0},property:{get(k){return {id,type:0,position:me.point,hp:[100,100]}[k];}},
  getComponent(type){return type===Combat?combat:type===Move?move:null;}};
 const W={__KVPV_OWN_ACTOR_ID:id,__KVPV_USER_UI_UNTIL:0,__KVPV_UNIVERSAL_HALTED:false,
 _Ba:{_rJ:{_O$:{ins:{actorId:id}}}},_d:{_Yct:{_Het:Combat,_zet:Move}},
 _C:{_Ba:{instance:{getRole:()=>me}},_Mn:{_Cn:{get currentID(){return scene;}}}},
 document:{hidden:false,hasFocus:()=>true},
 KVPV_FAR_SCOPE:{status:()=>({inside:false})},
 KVPV_BASIC10:{status:()=>({roadMelee:{active:high}})},
 KVPV_MODE:{status:()=>({mode})},
 setInterval(fn){const n=timers.size+1;timers.set(n,fn);return n;},
 clearInterval(i){timers.delete(i);}
 };
 vm.runInNewContext(script,{window:W,Date:Clock,console},{timeout:3000});
 return {W,mod:W.KVPV_PVP_LUOFENG,id,enemy,monster,moveCalls,
 setTarget:v=>target=v,setTime:t=>tick=t,step:ms=>tick+=ms,
 setMode:v=>mode=v,setHigh:v=>high=v,setBusy:v=>busy=v,
 setScene:v=>scene=v,pump:()=>{for(const fn of timers.values())fn();},
 timerCount:()=>timers.size};
}
{
 const q=harness();
 assert.equal(q.mod.status().enabled,false,'OFF by default');
 assert.equal(q.timerCount(),0);
 q.setTarget(q.enemy);
 q.mod.start({autoDodge:false});
 assert.equal(q.mod.status().attached,true);
 assert.equal(q.timerCount(),1);
 q.enemy.emit(1039,'another-player',1001);
 q.enemy.emit(1039,q.id,8001);
 assert.equal(q.mod.status().observedTH,0,'only direct TH aimed at us');
 q.enemy.emit(1039,q.id,1001);
 assert.equal(q.mod.status().observedTH,1);
 assert.equal(q.moveCalls.length,0,'observation never moves');
 assert.equal(q.mod.status().lastReason,'observe_only');
 q.mod.stop();
 assert.equal(q.timerCount(),0);
 assert.equal(q.enemy.listeners.size,0,'detach owned event');
}
{
 const q=harness();q.setTarget(q.enemy);
 q.mod.start({autoDodge:true});
 q.enemy.emit(1039,q.id,1002);
 assert.equal(q.moveCalls.length,1,'native lateral step');
 assert(q.moveCalls[0].x>200,'step outwards');
 assert(Math.abs(q.moveCalls[0].y)>80,'lateral step');
 q.enemy.emit(1039,q.id,1002);
 assert.equal(q.moveCalls.length,1,'cooldown avoids repeated steps');
 q.step(1500);q.W.__KVPV_USER_UI_UNTIL=Date.now()+1e15;
 q.enemy.emit(1039,q.id,1002);
 assert.equal(q.moveCalls.length,1,'yield to UI interaction');
 q.W.__KVPV_USER_UI_UNTIL=0;
 q.setMode('BOSS');
 q.enemy.emit(1039,q.id,1002);
 assert.equal(q.moveCalls.length,1,'yield to combat owner');
 q.setMode('OFF');q.setHigh(true);
 q.enemy.emit(1039,q.id,1002);
 assert.equal(q.moveCalls.length,1,'yield to higher priority');
 q.setHigh(false);q.setBusy(true);
 q.enemy.emit(1039,q.id,1002);
 assert.equal(q.moveCalls.length,1,'yield to movement busy');
 q.setBusy(false);q.W.document.hidden=true;
 q.enemy.emit(1039,q.id,1002);
 assert.equal(q.moveCalls.length,1,'yield to background');
 q.W.document.hidden=false;
 q.enemy.emit(1039,q.id,1002);
 assert.equal(q.moveCalls.length,2,'normal native movement restored');
 q.mod.stop();
}
{
 const q=harness();q.setTarget(q.monster);
 q.mod.start({autoDodge:true});
 assert.equal(q.mod.status().attached,false,'monster is not pvp opponent');
 q.setTarget(q.enemy);q.pump();
 assert.equal(q.mod.status().enemyId,'enemy1');
 q.setTarget(q.monster);q.pump();
 assert.equal(q.mod.status().attached,false,'switch out detach');
 q.enemy.emit(1039,q.id,1001);
 assert.equal(q.mod.status().observedTH,0,'stale enemy ignored');
 q.setTarget(q.enemy);q.pump();
 q.setScene(5001);q.enemy.emit(1039,q.id,1001);
 assert.equal(q.mod.status().observedTH,0,'old-scene signal ignored');
 q.pump();assert.equal(q.mod.status().scene,'5001');
 q.enemy.emit(1039,q.id,1001);
 assert.equal(q.mod.status().observedTH,1);
 q.W._Ba._rJ._O$.ins.actorId='other';q.pump();
 assert.equal(q.mod.status().enabled,false,'actor changed stops');
 assert.equal(q.timerCount(),0);
}
console.log('PASS PvP La Phong: opt-in, direct enemy TH event, lateral native dodge, cooldown, UI/owner guards, monster and map isolation, cleanup, no extra combat RPC');