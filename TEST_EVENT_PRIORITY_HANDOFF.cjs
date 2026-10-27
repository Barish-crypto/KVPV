const fs=require('fs'),vm=require('vm'),assert=require('assert');
const source='function __KVPV_INSTALL_75_event_priority_js(){\n'+fs.readFileSync(__dirname+'/src/62-event-priority.js','utf8')+'\n}';
const file=fs.readFileSync(__dirname+'/KVPV_V1_FULL.js','utf8');
const exit={calls:0};
const stage={auto:true,curLv:123},entry={intoSce:[2996]};
const scene={SceneUtil:{isCommonScene:false},_yo:{ins:entry},_Gr:{ins:{exitDungeon(){exit.calls++;}}}};
let hold=null,heldReservations=0,dailyRunning=true,manual=false,heldBefore=false;
const W={__KVPV_OWN_ACTOR_ID:'123456789',__KVPV_UNIVERSAL_HALTED:false,
 _Ba:{_rJ:{_O$:{ins:{actorId:'123456789'}}},_Co:{_Mo:{ins:stage}},_$a:scene},
 _ft:{_h$:{ins:{getCfgByLv:()=>[2996]}}},
 KVPV_ENTRY_POLICY:{get manual(){return manual;}},
 KVPV_DAILY:{config:{enableTuVuot:true},quickState:()=>({running:dailyRunning})},
 KVPV:{timeline:{config:{enabled:true},reservation:()=>{heldReservations++;return hold;}},core:{scene:{release:()=>true}}},
 KVPV_V1:{timers:{setInterval:()=>77,clearInterval:()=>{}}}
};
const context=vm.createContext({window:W,Date,console});
vm.runInContext(source+'\n__KVPV_INSTALL_75_event_priority_js();',context);
const api=W.KVPV_EVENT_PRIORITY;
assert(api);
assert.equal(api.hold(),null);assert.equal(stage.auto,true);assert.equal(exit.calls,0);
// Clear memo and set event: next tick recalculates hold after simulated TTL.
vm.runInContext('Date = class extends Date {static now(){return super.now()+1000;}};',context);
hold={key:'tam_tien',name:'Tầm Tiên Vấn Đạo',phase:'upcoming',time:'19:00-19:30',minutesUntil:3};
assert.equal(api.hold().key,'tam_tien');
api.tick();assert.equal(stage.auto,false);assert.equal(exit.calls,1);
api.tick();assert.equal(exit.calls,1); // avoid repeated exits for same scene
assert.equal(W.KVPV_DAILY.config.enableTuVuot,true); // do not lock stage switch permanently
assert.equal(api.status().hold.key,'tam_tien');
// scene has returned. event is over. Normal daily idle can now start stage again.
scene.SceneUtil.isCommonScene=true;entry.intoSce=[1001];hold=null;
vm.runInContext('Date = class extends Date {static now(){return super.now()+3000;}};',context);
assert.equal(api.hold(),null);api.tick();
assert.equal(stage.auto,false); assert.equal(W.KVPV_DAILY.config.enableTuVuot,true);
// Simulate a manual operator script / event manually disabled.
manual=true;hold={key:'honghoang',name:'Hồng Hoang Bí Bảo',phase:'opening',time:'20:45-21:00'};
assert.equal(api.hold(),null);
// Cross actor or halted session should never move/exit anything.
manual=false;W._Ba._rJ._O$.ins.actorId='9999';assert.equal(api.hold(),null);
assert.equal(exit.calls,1);
// Source-level regression tests
assert(file.includes('Source: src/62-event-priority.js'));
assert(file.includes("if (window.KVPV_EVENT_PRIORITY?.hold?.()) return false;"));
assert(file.includes('if(tuVuot.run)tuVuot.run=null;'));
assert(file.includes('!W.KVPV_EVENT_PRIORITY?.hold?.()'));
console.log('PASS: prioritize event, stop stage auto, single verified native exit, preserve auto preference, resume eligibility, manual/actor protection, full integrations. Planner calls:',heldReservations);
