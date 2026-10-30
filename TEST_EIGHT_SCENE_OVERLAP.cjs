'use strict';
const assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs');
const clean=file=>fs.readFileSync(__dirname+'/src/'+file,'utf8')
  .replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,'');
const ms=Date.parse('2026-10-30T14:10:00Z'); // Friday, 21:10 Vietnam.
class Clock extends Date{constructor(...a){super(...(a.length?a:[ms]));}static now(){return ms;}}
function env(){
 let hold={key:'tranh_ba_dinh_cao',time:'21:00-21:30'};
 let opened=true,entryEnabled=true,trialPriority=false,inFlight=false,
  activeJob='rảnh',hitrun=false,stageAuto=false;
 const sent=[],stage={get auto(){return stageAuto;},set auto(v){stageAuto=v;}};
 const actor='12345',model={nxtEnterTime:0,curLayer:1,score:0,isPass:false,
   getRankInfo:()=>[0,0,0,[]],getSpeBossInfo:()=>null,
   getAutoTarget:()=>2,setAutoTarget(){},setFirstBoss(){}};
 const scene={SceneUtil:{isCommonScene:true},_yo:{ins:{intoSce:[2994]}}};
 const Ba={_rJ:{_O$:{ins:{actorId:actor,isDead:false}}},
   _Co:{_Mo:{ins:stage}},_$a:scene,
   _t8:{_w_t:{ins:model},_Scn:{ins:{getRankInfo(){},getMyAwards(){}}}},
   _sst:{_ist:{inst:{getCpSceneStateByType:()=>[0,0,opened?2:0]}},
     _Cht:{inst:{rqEtScene:id=>sent.push(id)}}},
   _Do:{_Ho:{inst:{getFcIsOpen:id=>id===903&&entryEnabled}}}};
 const Ft={_h$:{ins:{getCfgByLv:()=>[5555]}},_po:{ins:{getCfgById:()=>{const a=[];a[7]=0;return a;}}}};
 const W={__KVPV_OWN_ACTOR_ID:actor,_Ba:Ba,_ft:Ft,
  _C:{_Mn:{_Cn:{currentID:2994}}},_Sa:{svrTime:ms},
  KVPV_DAILY:{config:{},quickState:()=>({job:activeJob})},
  KVPV_TQ_SCOPE:{inside:()=>false},
  KVPV_HITRUN1:{status:()=>({running:hitrun})},
  KVPV_DAILY_TRIAL:{hasPriority:()=>trialPriority,status:()=>({inFlight})},
  KVPV:{timeline:{reservation:()=>hold}},
  setInterval:()=>1,clearInterval(){}};
 const ctx=vm.createContext({window:W,_Ba:Ba,_ft:Ft,Date:Clock,Intl,console});
 vm.runInContext(clean('02-scene.js'),ctx);
 return {W,ctx,sent,loadFloor(){vm.runInContext(clean('14-eight-floor.js'),ctx)},
    setHold:v=>hold=v,setOpen:v=>opened=v,setUnlock:v=>entryEnabled=v,
    setTrial:v=>trialPriority=v,setInFlight:v=>inFlight=v,setJob:v=>activeJob=v,
    setHitRun:v=>hitrun=v,setStage:v=>stageAuto=v};
}
{
 const q=env(),scene=q.W.KVPV.core.scene;
 assert.match(scene.reason('combat'),/tranh_ba_dinh_cao/,'normal tasks still reserved');
 q.loadFloor();
 assert.deepEqual(q.sent,[7101],'verified native Eight Floor requests entry despite overlap');
 assert.equal(q.W.KVPV_EIGHT_FLOOR.status().reason,'waiting_scene_71');
 assert.equal(scene.status().owner,'combat');
 assert.equal(scene.status().tag,'thien-the-8-tang');
 assert.equal(scene.status().grants,1);
 assert.match(scene.reason('combat'),/tranh_ba_dinh_cao/,'untagged others still blocked');
}
{
 const q=env();q.setOpen(false);q.loadFloor();
 assert.deepEqual(q.sent,[],'server-closed event cannot request entry');
 assert.match(q.W.KVPV.core.scene.reason('combat','thien-the-8-tang'),/tranh_ba_dinh_cao/);
}
{
 const q=env();q.setHold({key:'tam_tien',time:'21:00-21:30'});q.loadFloor();
 assert.deepEqual(q.sent,[],'different scheduled event is not overridden');
 assert.match(q.W.KVPV_EIGHT_FLOOR.status().reason,/scene_denied:upcoming event tam_tien/);
}
{
 const q=env();q.setInFlight(true);q.loadFloor();
 assert.deepEqual(q.sent,[],'active trial native pending never bypassed');
 assert.match(q.W.KVPV_EIGHT_FLOOR.status().reason,/scene_denied:upcoming event tranh_ba_dinh_cao/);
}
{
 const q=env();q.setJob('tientuyen');q.loadFloor();
 assert.deepEqual(q.sent,[],'active daily work not interrupted');
 assert.equal(q.W.KVPV_EIGHT_FLOOR.status().reason,'other_job_active');
}
{
 const q=env();q.setHitRun(true);q.loadFloor();
 assert.deepEqual(q.sent,[],'active boss combat not interrupted');
 assert.equal(q.W.KVPV_EIGHT_FLOOR.status().reason,'other_job_active');
}
{
 const q=env();q.setTrial(true);q.loadFloor();
 assert.deepEqual(q.sent,[],'explicit Daily Trial priority not overridden');
 assert.match(q.W.KVPV_EIGHT_FLOOR.status().reason,/scene_denied:priority: daily trial/);
}
console.log('PASS Eight Floor scene overlap: 7101 request, native guards, other reservations and active owners respected.');
