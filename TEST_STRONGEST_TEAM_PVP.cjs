'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const observe=fs.readFileSync(__dirname+'/src/75-pvp-luofeng.js','utf8');
const script=fs.readFileSync(__dirname+'/src/77-strongest-team-pvp.js','utf8');
const build=fs.readFileSync(__dirname+'/build.cjs','utf8');
assert(!build.includes('"77-strongest-team-pvp.js"'),'player combat must remain with the native selector');
function harness(){
 const actor='10228867268946',enemyId='pvp-enemy-1';
 let now=200000,inside=true,open=true,phase='ACTIVE',enemyColor='red',enemy2Color='red',manual=false,selected,hidden=false,skillRows=[[1001,0,50],[8005,0,50]];
 let cooldown=false,range=true,busy=false;
 const moves=[],casts=[],timers=new Map();
 class Clock extends Date{static now(){return now;}}
 class Role{
  constructor(uid,type,x=0){this.id=uid;this.type=type;this.point={x,y:0};this.isValid=true;this.listeners=new Map();}
  property={get:(key)=>({id:this.id,type:this.type,position:this.point,hp:[100,100]})[key]};
  on(key,owner,fn){this.listeners.set(key,fn);}
  off(key,owner,fn){if(this.listeners.get(key)===fn)this.listeners.delete(key);}
  emit(key,...args){this.listeners.get(key)?.(...args);}
  getComponent(key){return key===Combat?combat:key===Skill?selector:key===Move?move:null;}
 }
 function Combat(){} function Skill(){} function Move(){}
 const player=new Role(actor,4,220),enemy=new Role(enemyId,4,0),enemy2=new Role('pvp-enemy-2',4,100),ally=new Role('ally',4,0);
 const combat={get target(){return selected;},combat(id){casts.push(id);return id;},
   isCooldown:()=>cooldown,isValidTarget:()=>true,isValidRange:()=>range};
 const selector={get _rtt(){return skillRows;},_wet:[],_f7t:rows=>rows[0]?.[0]};
 const move={_fut:0,running:()=>busy,moveTo(x,y){moves.push({x,y});}};
 const m={selectTagetId:enemyId,getNearPlayerRank:()=>[{objId:enemyId,color:enemyColor},{objId:enemy2.id,color:enemy2Color}],
   isMyTeam:color=>color==='blue'};
 const W={__KVPV_OWN_ACTOR_ID:actor,__KVPV_UNIVERSAL_HALTED:false,__KVPV_USER_UI_UNTIL:0,
   _Ba:{_rJ:{_O$:{ins:{actorId:actor,isDead:false}}},_T3:{_G_t:{instance:m}}},
   _d:{_Yct:{_Het:Combat,_Eet:Skill,_zet:Move}},
   _C:{_Ba:{instance:{getRole:uid=>String(uid)===actor?player:String(uid)===enemyId?enemy:String(uid)===enemy2.id?enemy2:null}},_Mn:{_Cn:{currentID:8201}}},
   KVPV_STRONGEST_TEAM:{status:()=>({enabled:true,inside,phase,open})},
   KVPV_FAR_SCOPE:{status:()=>({inside:false,kind:'OUTSIDE'})},
   KVPV_ENTRY_POLICY:{get manual(){return manual;}},
   document:{get hidden(){return hidden;},hasFocus:()=>true},
   setInterval:(fn)=>{const key=timers.size+1;timers.set(key,fn);return key;},
   clearInterval:key=>timers.delete(key)};
 const ctx=vm.createContext({window:W,Date:Clock,console});
 vm.runInContext(observe,ctx);vm.runInContext(script,ctx);
 return {actor,enemy,enemy2,ally,player,combat,m,W,moves,casts,timers,
  select:v=>selected=v,at:v=>now=v,advance:v=>now+=v,
  setRows:v=>skillRows=v,setColor:v=>enemyColor=v,setEnemy2Color:v=>enemy2Color=v,setInside:v=>inside=v,setOpen:v=>open=v,
  setPhase:v=>phase=v,setManual:v=>manual=v,setHidden:v=>hidden=v,
  setCooldown:v=>cooldown=v,setRange:v=>range=v,setBusy:v=>busy=v,
  pk:()=>W.KVPV_STRONGEST_PVP,dodge:()=>W.KVPV_PVP_LUOFENG,
  tick:()=>W.KVPV_STRONGEST_PVP.tick()};
}
{
 const h=harness();
 assert.equal(h.casts.length,0,'no target must not cast');
 assert.equal(h.dodge().status().enabled,false,'no enemy means no dodge observer');
 h.select(h.enemy);h.tick();
 assert.deepEqual(h.casts,[8005],'only 8005 selected even when TH ready');
 assert.equal(h.pk().status().autoDodgeOwned,true);
 assert.equal(h.dodge().status().attached,true);
 h.enemy.emit(1039,h.actor,1005);
 assert.equal(h.moves.length,1,'native TH cast towards our actor triggers lateral dodge attempt');
 assert.equal(h.pk().status().dodge.observedTH,1);
 assert.equal(h.pk().status().dodge.nativeDodgeAttempts,1);
 h.enemy.emit(1039,h.actor,1005);
 assert.equal(h.moves.length,1,'dodge cooldown');
 h.setRows([[8005,0,50]]);h.advance(1500);h.tick();
 assert.deepEqual(h.casts,[8005,8005],'fallback to ready native basic');
 h.setCooldown(true);h.tick();assert.equal(h.casts.length,2,'native cooldown gate');
 h.setCooldown(false);h.setRange(false);h.tick();assert.equal(h.casts.length,2,'native range gate');
 h.setRange(true);h.setHidden(true);h.tick();assert.equal(h.casts.length,2,'manual/background safety');
 h.setHidden(false);
 h.setColor('blue');h.tick();
 assert.equal(h.casts.length,2,'own-team target is never attacked');
 assert.equal(h.dodge().status().enabled,false,'teammate must release observer');
 h.setColor('red');h.select(h.ally);h.tick();
 assert.equal(h.casts.length,2,'selected target must match verified enemy id');
 h.select(h.enemy);h.tick();assert.equal(h.dodge().status().enabled,true);
 h.setInside(false);h.tick();
 assert.equal(h.dodge().status().enabled,false,'leave event cleans remote listener');
 assert.equal(h.enemy.listeners.size,0,'no stale TH listener');
 assert.equal(h.pk().status().inside,false);
 h.pk().stop();assert.equal(h.timers.size,0,'only own timers removed');
}
{
 const h=harness();h.select(h.enemy);h.setManual(true);h.tick();
 assert.equal(h.casts.length,0,'manual policy blocks automatic PvP');
 assert.equal(h.dodge().status().enabled,false,'manual policy blocks auto dodge');
 h.setManual(false);h.setOpen(false);h.tick();
 assert.equal(h.casts.length,0,'server-closed event blocks combat');
 h.setOpen(true);h.setPhase('WAITING');h.tick();
 assert.equal(h.casts.length,0,'unconfirmed event phase blocks combat');
 h.setPhase('ACTIVE');h.tick();
 assert.deepEqual(h.casts,[8005],'confirmed scene allows 8005 native cast');
 h.pk().config.nativeAttack=false;h.tick();
 assert.equal(h.casts.length,1,'dodge-only switch disables outgoing combat');
 h.pk().stop();
}
{
 const h=harness();h.select(h.enemy);h.tick();
 assert.equal(h.dodge().status().nearbyMode,true,'event enables nearby enemy TH watch');
 assert.deepEqual(Array.from(h.dodge().status().monitoredNearby),[h.enemy2.id],'verified second enemy watched');
 assert.equal(h.enemy2.listeners.has(1039),true);
 const before=h.casts.length;
 h.enemy2.emit(1039,'another-actor',1006);
 assert.equal(h.moves.length,0,'do not dodge TH aimed at another player');
 h.enemy2.emit(1039,h.actor,8005);
 assert.equal(h.moves.length,0,'do not dodge native basic');
 h.enemy2.emit(1039,h.actor,1006);
 assert.equal(h.moves.length,1,'native sideways dodge responds to another verified enemy');
 assert.equal(h.pk().status().nearbyTH,1,'separate multi-threat telemetry');
 h.tick();
 assert.equal(h.casts.length,before,'do not cast during immediate dodge window');
 h.advance(200);h.tick();
 assert.equal(h.casts.length,before+1,'resume native attacks after safe movement window');
 h.setEnemy2Color('blue');h.tick();
 assert.equal(h.enemy2.listeners.has(1039),false,'immediately drop former enemy that is now teammate');
 h.advance(1500);h.enemy2.emit(1039,h.actor,1007);
 assert.equal(h.moves.length,1,'no stale teammate listener can move');
 h.setEnemy2Color('red');h.tick();
 assert.equal(h.enemy2.listeners.has(1039),true,'newly verified enemy reattached');
 h.setInside(false);h.tick();
 assert.equal(h.enemy2.listeners.has(1039),false,'event exit detaches extra observer');
 h.pk().stop();
}
{
 const h=harness();h.select(h.enemy);h.tick();
 h.setOpen(false);h.tick();
 assert.equal(h.enemy2.listeners.has(1039),false,'server-closed event detaches all extra TH listeners');
 assert.equal(h.dodge().status().enabled,false,'server-closed event disarms dodge');
 h.pk().stop();
}
console.log('PASS Strongest Team PvP: verified enemy-only TH-first/native-basic, scoped remote TH dodge, no cooldown bypass, manual/team/scene guards and cleanup');
