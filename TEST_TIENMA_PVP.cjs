'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const source=fs.readFileSync(__dirname+'/src/80-tienma-quyetchien-pvp.js','utf8');
const build=fs.readFileSync(__dirname+'/build.cjs','utf8');
assert(build.includes('"80-tienma-quyetchien-pvp.js"'),'must hot reload Tiên Ma module');
function harness(){
 let now=100000,map=2191,phase=3,fightTime=60000,manual=false,focus=true,selected=null;
 const casts=[],moves=[],timers=new Map();
 const actor='10228867268946',rows=[[8001,0,100],[8005,0,200],[1001,0,900]];
 class FakeDate extends Date{static now(){return now;}}
 function Obj(id,type,camp,x,y){this.id=id;this.type=type;this.camp=camp;this.hp=[100,100];this.position={x,y};this.isValid=true;this.property={get:key=>({id:this.id,type:this.type,campType:this.camp,hp:this.hp,position:this.position,status:1})[key]};}
 function Combat(){}function Selector(){}function Move(){}
 const me=new Obj(actor,4,0,500,0),enemy=new Obj('enemy',4,1,450,0),
  nearer=new Obj('nearer',4,1,490,20),friend=new Obj('friend',4,0,470,0),
  monster=new Obj('monster',1,1,470,0);
 let roster=[enemy,nearer,friend,monster],cd=false,range=true,busy=false;
 selected=enemy;
 const combat={get target(){return selected;},isCooldown:()=>cd,isValidTarget:()=>true,
  isValidRange:()=>range,combat:skill=>casts.push(skill)};
 const selector={_rtt:rows,_wet:[],_f7t(list,none,mode){
  assert.equal(mode,1);const row=list[0];row[1]=now+row[2];return row[0];
 }};
 const movement={running:()=>busy,moveTo(x,y){moves.push({x,y});busy=true;}};
 me.getComponent=k=>k===Combat?combat:k===Selector?selector:k===Move?movement:null;
 const campModel={myCampType:0};
 const model={get status(){return phase;},get fightTime(){return fightTime;}};
 const W={__KVPV_OWN_ACTOR_ID:actor,__KVPV_UNIVERSAL_HALTED:false,
  _Ba:{_rJ:{_O$:{ins:{actorId:actor,isDead:false}}},_W8t:{main:{_mWt:{ins:model}},_O8t:{ins:campModel}},
   _$a:{_yo:{ins:{get intoSce(){return [map];}}}}},
  _C:{_Ba:{instance:{getRole:()=>me,getRoles:()=>roster}},_Mn:{_Cn:{get currentID(){return map;}}}},
  _d:{_Yct:{_Het:Combat,_Eet:Selector,_zet:Move}},
  document:{get hidden(){return false;},hasFocus:()=>focus},
  KVPV_ENTRY_POLICY:{get manual(){return manual;}},
  KVPV_BOSS_TEAM:{priority:()=>false},
  KVPV_HITRUN1:{status:()=>({running:false})},
  setInterval(fn,ms){assert([150,800].includes(ms));let i=timers.size+1;timers.set(i,fn);return i;},
  clearInterval(i){timers.delete(i);}
 };
 const context=vm.createContext({window:W,Date:FakeDate,console});
 const load=()=>vm.runInContext(source,context,{timeout:3000});load();
 const api=()=>W.KVPV_TIENMA_PVP;
 return {W,api,load,me,enemy,nearer,friend,monster,casts,moves,timers,
  advance:x=>{now+=x;api().tick();},select:x=>selected=x,
  hp:x=>me.hp=[x,100],map:x=>map=x,phase:x=>phase=x,
  moveReady:()=>busy=false,focus:x=>focus=x,manual:x=>manual=x,
  roster:x=>roster=x,cd:x=>cd=x,range:x=>range=x};
}
{
 const h=harness();
 assert.equal(h.api().status().enabled,true);
 assert.deepEqual(h.casts,[8005],'must cast ONLY skill 8005');
 h.advance(300);assert.deepEqual(h.casts,[8005,8005]);
 h.cd(true);h.advance(300);assert.equal(h.casts.length,2,'native cooldown blocks');
 h.cd(false);h.range(false);h.advance(300);assert.equal(h.casts.length,2,'native range blocks');
 h.range(true);h.select(h.friend);h.advance(300);assert.equal(h.casts.length,2,'teammate protected');
 h.select(h.monster);h.advance(300);assert.equal(h.casts.length,2,'monster protected');
 h.select(h.enemy);h.map(2600);h.advance(300);assert.equal(h.casts.length,2,'other map blocked');
 h.map(2191);h.phase(2);h.advance(300);assert.equal(h.casts.length,2,'preparation phase blocked');
 h.phase(3);h.manual(true);h.advance(300);assert.equal(h.casts.length,2,'manual priority');
 h.manual(false);h.focus(false);h.advance(300);assert.equal(h.casts.length,2,'foreground gate');
 h.api().stop();assert.equal(h.timers.size,0);
}
{
 const h=harness();h.api().stop();h.casts.length=0;h.hp(10);h.api().start();
 assert.equal(h.casts.length,0,'10% HP cannot cast');
 assert.equal(h.api().status().retreat,true);
 assert.equal(h.api().status().enemyId,h.nearer.id,'nearest rival selected for retreat');
 assert.equal(h.moves.length,1,'native move begins');
 h.advance(200);assert.equal(h.moves.length,1,'move throttled');
 h.me.position={...h.moves[0]};h.nearer.position={x:h.me.position.x-25,y:h.me.position.y-5};
 h.moveReady();h.advance(500);assert.equal(h.moves.length,2,'chasing rival triggers fresh retreat');
 h.hp(12);h.advance(500);assert.equal(h.casts.length,0,'stay in retreat below 15%');
 h.hp(16);h.advance(500);assert.equal(h.api().status().retreat,false,'resume when recovered');
 h.api().stop();
}
{
 const h=harness();h.api().stop();h.hp(10);
 h.roster([h.friend,h.monster]);h.select(h.friend);h.api().start();
 assert.equal(h.moves.length,0,'no movement away from allies');
 h.select(h.enemy);h.advance(500);assert.equal(h.moves.length,1,'fallback native selected rival');
 h.api().stop();
}
{
 const h=harness();h.load();assert.equal(h.api().status().enabled,true,'hot reload stays enabled');
 assert.equal(h.timers.size,1,'only one own timer');
 h.api().stop();h.load();assert.equal(h.api().status().enabled,false,'manual stop preserved after hot reload');
}
console.log('PASS Tien Ma Quyet Chien: 8005 only, verified rival camp, 10%-15% retreat, 600 distance, moving enemy, native guards, cleanup');
