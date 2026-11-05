'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const source=fs.readFileSync(require('node:path').join(__dirname,'../KVPV_GIU_FOCUS.js'),'utf8');
class Events{constructor(){this.listeners=new Map();}addEventListener(k,f){if(!this.listeners.has(k))this.listeners.set(k,new Set());this.listeners.get(k).add(f);}removeEventListener(k,f){this.listeners.get(k)?.delete(f);}emit(k,e={}){for(const f of this.listeners.get(k)||[])f(e);}}
(async()=>{
 let now=1000;class Clock extends Date{static now(){return now;}}
 const stage={_isFocused:true,_isVisibility:true,_frameRate:'fast',renderingEnabled:true,events:[],event(name){this.events.push(name);}},document=new Events(),timers=new Set(),W=new Events();
 document.hidden=true;document.hasFocus=()=>false;
 Object.assign(W,{Laya:{stage},document,console:{info(){},warn(){}},__KVPV_OWN_ACTOR_ID:'123',_Ba:{_rJ:{_O$:{ins:{actorId:'123'}}}},setInterval(fn){timers.add(fn);return fn;},clearInterval(fn){timers.delete(fn);}});
 vm.runInNewContext(source,{window:W,Date:Clock,Promise});assert.equal(W.KVPV_FOCUS_HOLD.status().running,true);
 stage._isFocused=false;stage._isVisibility=false;assert.equal(stage._isFocused,true);assert.equal(stage._isVisibility,true);assert.equal(document.hidden,true);assert.equal(document.hasFocus(),false);
 now+=1100;W.emit('blur');await Promise.resolve();await Promise.resolve();assert.equal(stage.events.length,0);assert.equal(stage._frameRate,'fast');assert.equal(stage.renderingEnabled,true);
 W.KVPV_FOCUS_HOLD.stop();assert.equal(stage._isFocused,false);assert.equal(stage._isVisibility,false);assert.equal(timers.size,0);assert.equal(Object.getOwnPropertyDescriptor(stage,'_isFocused').get,undefined);
 vm.runInNewContext(source,{window:W,Date:Clock,Promise});W._Ba._rJ._O$.ins.actorId='other';for(const tick of [...timers])tick();assert.equal(W.KVPV_FOCUS_HOLD.status().running,false);assert.equal(timers.size,0);
 const badStage={_isFocused:false};Object.defineProperty(badStage,'_isVisibility',{value:false,configurable:false});W.Laya.stage=badStage;vm.runInNewContext(source,{window:W,Date:Clock,Promise});assert.equal(badStage._isFocused,false);assert.equal(Object.getOwnPropertyDescriptor(badStage,'_isFocused').get,undefined);assert.equal(timers.size,0);
 new vm.Script(source+'\n'+source);
 console.log('PASS engine focus hold: continuous engine flags, zero synthetic focus events, real DOM untouched, rendering/frame rate preserved, native-value restoration, actor change and partial failure cleanup.');
})().catch(e=>{console.error(e);process.exitCode=1;});
