'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const observer=fs.readFileSync(__dirname+'/src/75-pvp-luofeng.js','utf8');
const tula=fs.readFileSync(__dirname+'/src/78-tula-pvp.js','utf8');
const build=fs.readFileSync(__dirname+'/build.cjs','utf8');
assert(build.includes('"78-tula-pvp.js"'),'Tu La observer must be registered for hot reload');
function harness(){
 const actor='10228867268946',timers=new Map(),moves=[],casts=[];
 let now=100000,sceneType=58,modelOpen=true,stage=1,job='tula',
  target=null,manual=false,hidden=false,busy=false,combatValid=true,dead=false,
  scopeOther=false,otherObserver=false;
 class Clock extends Date{static now(){return now;}}
 class Role{
  constructor(id,type,x){this.id=id;this.isValid=true;this.type=type;this.p={x,y:0};this.events=new Map();}
  property={get:key=>({id:this.id,type:this.type,position:this.p,hp:[100,100]})[key]};
  getComponent(key){return key===Combat?combat:key===Move?move:null;}
  on(key,owner,fn){this.events.set(key,fn);}
  off(key,owner,fn){if(this.events.get(key)===fn)this.events.delete(key);}
  emit(key,...args){this.events.get(key)?.(...args);}
 }
 function Combat(){} function Move(){}
 const me=new Role(actor,4,225),enemy=new Role('tula-player',4,0),monster=new Role('monster',1,0);
 const combat={get target(){return target;},combat(id){casts.push(id);},isValidTarget:()=>combatValid};
 const move={_fut:0,running:()=>busy,moveTo(x,y){moves.push({x,y});}};
 const m={get funIsOpen(){return modelOpen;},get stage(){return stage;},updAttack(){throw Error('Tu La AI must remain untouched by observer');}};
 const W={__KVPV_OWN_ACTOR_ID:actor,__KVPV_UNIVERSAL_HALTED:false,__KVPV_USER_UI_UNTIL:0,
  _Ba:{_rJ:{_O$:{ins:{actorId:actor,get isDead(){return dead;}}}},
    _hE:{_olt:{inst:m}},_$a:{SceneUtil:{get curScene(){return sceneType;}}}},
  _d:{_Yct:{_Het:Combat,_zet:Move}},
  _C:{_Ba:{instance:{getRole:()=>me}},_Mn:{_Cn:{currentID:5000}}},
  KVPV_DAILY:{config:{enableTuLa:true},
    quickState:()=>({job}),tuLaStatus:()=>({dangTrongTran:[58,61].includes(sceneType),canh:sceneType,giaiDoan:stage})},
  KVPV_FAR_SCOPE:{status:()=>({inside:scopeOther,kind:scopeOther?'THIEN_QUAN':'OUTSIDE'})},
  KVPV_ENTRY_POLICY:{get manual(){return manual;}},
  document:{get hidden(){return hidden;},hasFocus:()=>true},
  KVPV_BOSS_TEAM:{priority:()=>otherObserver},
  KVPV_MODE:{status:()=>({mode:'OFF'})},
  setInterval(fn){const key=timers.size+1;timers.set(key,fn);return key;},
  clearInterval(key){timers.delete(key);}
 };
 vm.runInNewContext(observer+'\n'+tula,{window:W,Date:Clock,console},{timeout:4000});
 return {W,m,me,enemy,monster,moves,casts,timers,actor,
   pk:()=>W.KVPV_TULA_PVP,observer:()=>W.KVPV_PVP_LUOFENG,
   select:v=>target=v,advance:ms=>now+=ms,
   scene:v=>sceneType=v,open:v=>modelOpen=v,stage:v=>stage=v,job:v=>job=v,
   manual:v=>manual=v,hidden:v=>hidden=v,busy:v=>busy=v,valid:v=>combatValid=v,
   dead:v=>dead=v,scopeOther:v=>scopeOther=v,otherOwner:v=>otherObserver=v,
   tick:()=>W.KVPV_TULA_PVP.tick()};
}
{
 const q=harness();
 assert.equal(q.pk().status().enabled,true,'tula watcher arms without a page refresh');
 assert.equal(q.observer().status().enabled,false,'no target must not attach an observer');
 q.select(q.monster);q.tick();
 assert.equal(q.observer().status().enabled,false,'monsters never treated as PvP players');
 q.select(q.enemy);q.tick();
 assert.equal(q.pk().status().inside,true,'native Tu La scene 58 confirmed');
 assert.equal(q.pk().status().autoDodgeOwned,true,'owns the existing TH observer');
 assert.equal(q.observer().status().scope,'TU_LA');
 assert.equal(q.observer().status().nearbyMode,false,'no unverified nearby roster scan');
 q.enemy.emit(1039,'another-actor',1001);
 q.enemy.emit(1039,q.actor,8001);
 assert.equal(q.moves.length,0,'ignore other targets and native basics');
 q.enemy.emit(1039,q.actor,1008);
 assert.equal(q.moves.length,1,'native sideways move on selected opponent TH');
 assert.equal(q.pk().status().observedTH,1);
 q.enemy.emit(1039,q.actor,1008);
 assert.equal(q.moves.length,1,'native dodge cooldown');
 q.advance(2000);q.busy(true);q.enemy.emit(1039,q.actor,1007);
 assert.equal(q.moves.length,1,'busy native movement blocks duplicate dodge');
 q.busy(false);q.enemy.emit(1039,q.actor,1007);
 assert.equal(q.moves.length,2,'next native movement allowed after recovery');
 assert.equal(q.casts.length,0,'Tu La native updAttack combat AI unchanged, no duplicate casts');
 q.scene(61);q.tick();assert.equal(q.pk().status().inside,true,'second native scene type supported');
 q.scene(0);q.tick();
 assert.equal(q.observer().status().enabled,false,'scene exit disarms');
 assert.equal(q.enemy.events.has(1039),false,'scene exit detaches old listeners');
 assert.equal(q.pk().status().autoDodgeOwned,false);
 q.pk().stop();assert.equal(q.timers.size,0,'stop clears both owned timers');
}
{
 const q=harness();q.select(q.enemy);q.manual(true);q.tick();
 assert.equal(q.observer().status().enabled,false,'manual entry policy stops automatic dodge');
 q.manual(false);q.hidden(true);q.tick();
 assert.equal(q.observer().status().enabled,false,'background unfocused stays off');
 q.hidden(false);q.open(false);q.tick();
 assert.equal(q.observer().status().enabled,false,'native model closed stays off');
 q.open(true);q.stage(0);q.tick();
 assert.equal(q.observer().status().enabled,false,'stage zero not eligible');
 q.stage(1);q.job('other');q.tick();
 assert.equal(q.observer().status().enabled,false,'foreign Daily job blocks Tu La');
 q.job('tula');q.valid(false);q.tick();
 assert.equal(q.observer().status().enabled,false,'invalid native target gate');
 q.valid(true);q.scopeOther(true);q.tick();
 assert.equal(q.observer().status().enabled,false,'foreign dungeon scope disarms observer entirely');
 q.enemy.emit(1039,q.actor,1001);
 assert.equal(q.moves.length,0,'foreign scope blocks actual movement');
 q.scopeOther(false);q.dead(true);q.tick();
 assert.equal(q.observer().status().enabled,false,'dead actor cannot own observer');
 q.dead(false);q.otherOwner(true);q.tick();
 assert.equal(q.observer().status().enabled,false,'boss-team owner blocks event observer');
 q.otherOwner(false);q.tick();assert.equal(q.observer().status().enabled,true);
 q.W.KVPV_DAILY.config.enableTuLa=false;q.tick();
 assert.equal(q.observer().status().enabled,false,'disabled Tu La never moves');
 q.pk().stop();
}
{
 const q=harness();q.select(q.enemy);q.tick();q.W.__KVPV_UNIVERSAL_HALTED=true;q.tick();
 assert.equal(q.observer().status().enabled,false,'halt disconnects observer');
 q.pk().stop();
}
console.log('PASS Tu La PvP: verified scenes 58/61, selected native player TH only, native movement/cooldown, no duplicate combat, manual/owner/actor/scene shutdown');
