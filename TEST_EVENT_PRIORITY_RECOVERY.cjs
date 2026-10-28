'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const source=fs.readFileSync(__dirname+'/src/62-event-priority.js','utf8');
const event={key:'tam_tien',name:'Tầm Tiên Vấn Đạo',phase:'upcoming',time:'19:00-19:30',minutesUntil:3};
function harness({auto=true,monitor=true,exitMode='stuck'}={}){
 let time=100000,reservation=null,manual=false,running=true,owner=null,exits=0;
 const listeners=new Map(),timers=new Map(),model={auto,curLv:123};
 const scene={SceneUtil:{isCommonScene:false},_yo:{ins:{intoSce:[2996]}},_Gr:{ins:{exitDungeon(){
   exits++;if(exitMode==='success'){scene.SceneUtil.isCommonScene=true;scene._yo.ins.intoSce=[1001];}
   if(exitMode==='throw')throw Error('native exit failure');
 }}}};
 const W={__KVPV_OWN_ACTOR_ID:'123456789',__KVPV_UNIVERSAL_HALTED:false,
   _Ba:{_rJ:{_O$:{ins:{actorId:'123456789',isDead:false}}},_Co:{_Mo:{ins:model}},_$a:scene},
   _ft:{_h$:{ins:{getCfgByLv:()=>[2996]}}},
   KVPV_ENTRY_POLICY:{get manual(){return manual;}},
   KVPV_DAILY:{config:{enableTuVuot:true},quickState:()=>({running})},
   KVPV:{timeline:{config:{enabled:true},reservation:()=>reservation},
     core:{scene:{release:()=>true,status:()=>({owner})}}},
   KVPV_V1:{timers:{setInterval:fn=>{timers.set(77,fn);return 77;},clearInterval:id=>timers.delete(id)}}
 };
 if(monitor){
   W.addEventListener=(type,fn)=>listeners.set(type,fn);
   W.removeEventListener=(type,fn)=>{if(listeners.get(type)===fn)listeners.delete(type);};
 }
 const Clock=class extends Date{static now(){return time;}};
 const context=vm.createContext({window:W,Date:Clock,console});
 const load=()=>{vm.runInContext(source,context);return W.KVPV_EVENT_PRIORITY;};
 const tick=(ms=1000)=>{time+=ms;W.KVPV_EVENT_PRIORITY.tick();};
 const begin=()=>{reservation=event;tick();};
 const end=()=>{reservation=null;tick();};
 return {W,model,scene,timers,listeners,load,tick,begin,end,
   input:(type='pointerdown')=>listeners.get(type)?.({isTrusted:true}),
   get exits(){return exits;},
   set owner(x){owner=x;},set manual(x){manual=x;},set running(x){running=x;}
 };
}
{
 const h=harness({exitMode:'throw'}),api=h.load();
 h.begin();assert.equal(h.model.auto,false);assert.equal(api.status().pendingResume?.map,2996);
 assert.equal(h.exits,1);h.tick();assert.equal(h.exits,1,'retry timer must throttle');
 h.end();assert.equal(h.model.auto,true);assert.equal(api.status().resumed,1);
 assert.equal(api.status().pendingResume,null);assert.equal(h.listeners.size,0);
 h.tick();assert.equal(api.status().resumed,1,'never restore twice');
}
{
 const h=harness(),api=h.load();h.begin();h.input();h.end();
 assert.equal(h.model.auto,false,'trusted user interaction cancels restoration');
 assert.equal(api.status().resumed,0);
}
{
 const h=harness();h.load();h.begin();h.W.KVPV_DAILY.config.enableTuVuot=false;h.end();
 assert.equal(h.model.auto,false,'Daily stage switch disabled by user');
}
{
 const h=harness({exitMode:'success'});h.load();h.begin();h.end();
 assert.equal(h.model.auto,false,'successful scene exit must not set stage auto in town');
}
{
 const h=harness();h.load();h.begin();h.owner='event';h.end();
 assert.equal(h.model.auto,false,'another scene lease must win');
}
{
 const h=harness();h.load();h.begin();h.load();h.end();
 assert.equal(h.model.auto,true,'hot reload keeps verified same-scene pending token');
 assert.equal(h.listeners.size,0,'hot reload removes event listeners');
 assert.equal(h.timers.size,1,'hot reload replaces interval');
}
{
 const h=harness({auto:false});h.load();h.begin();h.end();
 assert.equal(h.model.auto,false,'manually disabled stage is never enabled');
}
{
 const h=harness({monitor:false});h.load();h.begin();h.end();
 assert.equal(h.model.auto,false,'without manual input monitoring, refuse resume');
}
{
 const h=harness();h.load();h.begin();h.W._Ba._rJ._O$.ins.actorId='99999';h.end();
 assert.equal(h.model.auto,false,'never touch another actor');
}
{
 const h=harness();h.load();h.begin();h.W.KVPV_EVENT_PRIORITY.stop();h.end();
 assert.equal(h.model.auto,false,'manual stop cancels ownership');
}
// Major schedule-only events must yield native stage auto without inventing an
// entry RPC. Daily's read-only calendar, not a duplicated schedule, owns timing.
for(const key of ['tien_ma','tien_duyen_tac_chien','chien_doi','tranh_ba_tu_phuong']){
 const h=harness(),event={key,name:key,time:'20:00-20:25',action:'nhắc lịch',
   start:425,end:450};
 let visible=true;
 h.W.KVPV_DAILY.lichData=()=>({active:[],upcoming:visible?[event]:[]});
 const api=h.load();
 assert.equal(api.status().hold?.key,key,'manual scheduled event reserved: '+key);
 assert.equal(api.status().hold?.requiresManualEntry,true,'must request manual entry');
 assert.equal(api.status().hold?.mode,'manual');
 assert.equal(h.model.auto,false,'manual event pauses stage auto');
 assert.equal(h.exits,1,'one native exit attempt, no fabricated event RPC');
 h.tick();assert.equal(h.exits,1,'exit retry throttled');
 visible=false;h.tick();
 assert.equal(h.model.auto,true,'only resume same-stage native flag after hold ends');
 assert.equal(api.status().resumed,1);
}
{
 const h=harness();let event={key:'tien_ma',name:'Tiên Ma',time:'20:30-20:45',
   action:'nhắc lịch',start:425,end:440};
 h.W.KVPV_DAILY.lichData=()=>({active:[],upcoming:[event]});
 const api=h.load();api.config.manualPriorityKeys.tien_ma=false;
 h.model.auto=true;h.tick();
 assert.equal(api.hold(),null,'manual event opt-out removes reservation');
 assert.equal(h.exits,1,'disabling after first hold cannot trigger another exit');
}
{
 const h=harness();
 h.W.KVPV_DAILY.lichData=()=>({active:[],upcoming:[{key:'sa_thanh',name:'Sa Thanh',
   start:425,end:440,time:'20:00-20:30',unlock:'Liên server đủ 45 ngày',
   action:'nhắc lịch'}]});
 const api=h.load();api.config.manualPriorityKeys.sa_thanh=true;h.tick();
 assert.equal(api.hold(),null,'unverified cross-server eligibility cannot preempt');
}
{
 const h=harness();
 h.W.KVPV_DAILY.lichData=()=>({active:[],upcoming:[{key:'tien_ma',name:'Tiên Ma',
   start:425,end:440,time:'20:30-20:45',action:'auto'}]});
 const api=h.load();
 assert.equal(api.hold(),null,'manual event path must not reclassify automatic entries');
}
{
 const h=harness();let calendar={active:[{key:'tien_ma',name:'Tiên Ma',
   start:420,end:440,time:'20:30-20:45',action:'nhắc lịch'}],upcoming:[]};
 h.W.KVPV_DAILY.lichData=()=>calendar;
 const api=h.load();
 h.begin();assert.equal(api.status().hold?.key,'tien_ma','active manual event beats upcoming automatic reservation');
 calendar={active:[],upcoming:[]};h.end();
 assert.equal(api.status().hold?.key,'tam_tien','known active auto remains prioritized after manual slot ends');
}
const built=fs.readFileSync(__dirname+'/KVPV_V1_FULL.js','utf8');
assert(built.includes('Source: src/62-event-priority.js'));
assert(built.includes('stage_auto_restored_in_same_scene'));
assert(!source.includes('tuVuotStart()'));
console.log('PASS event recovery: failed exit, user input, manual toggle, owner, actor, town, hot reload, no-monitor and one-shot');
