




/* Optional, bounded combat trace. No timer, attack, movement or network calls. */

(() => {

  'use strict';

  const W=window, MAX_SAMPLES=7200, MAX_EVENTS=600, SAMPLE_MS=500;

  let recording=false,startedAt=null,endedAt=null,lastSampleAt=-Infinity,last=null;

  let samples=[],events=[],droppedSamples=0,droppedEvents=0;

  function append(list,item,limit){list.push(item);if(list.length>limit){list.shift();return true;}return false;}

  function record(kind,data={}) {

    if(!recording)return;

    const item={at:Date.now(),tickMs:data.tickMs,phase:data.phase,hp:data.hp,hpMax:data.hpMax,

      hpPct:data.hpPct,bossId:data.bossId,bossHP:data.bossHP,bossHPMax:data.bossHPMax,

      distance:data.distance,bossRange:data.bossRange,configuredRange:data.configuredRange,

      observedDangerRadius:data.observedDangerRadius,rangeKnown:data.rangeKnown,

      ring:data.ring,player:data.player?{x:data.player.x,y:data.player.y}:null,

      boss:data.boss?{x:data.boss.x,y:data.boss.y}:null,

      waypoint:data.waypoint?{x:data.waypoint.x,y:data.waypoint.y}:null};

    function event(type,detail){if(append(events,{...item,type,detail},MAX_EVENTS))droppedEvents++;}

    const sameBoss=last&&last.bossId===item.bossId;

    if(last && (!sameBoss||last.phase!==item.phase)){

      event('transition',String(last.phase)+' -> '+String(item.phase));

      if(sameBoss&&last.phase==='RETREAT'&&item.phase==='FIGHT'&&item.hp<item.hpMax)

        event('early-return','Returned before full HP');

    }

    const hpNoise=Math.max(1e-9,(Number(item.hpMax)||0)*1e-8);

    if(sameBoss&&item.phase==='RETREAT'&&Number.isFinite(item.hp)&&item.hp<last.hp-hpNoise)

      event('hp-drop-retreat','HP decreased during recovery; source not inferred');

    if(kind!=='sample')event(kind,String(data.detail??'').slice(0,400));

    if(item.at-lastSampleAt>=SAMPLE_MS||!last||!sameBoss||last.phase!==item.phase){

      if(append(samples,item,MAX_SAMPLES))droppedSamples++;

      lastSampleAt=item.at;

    }

    last=item;

  }

  

  function status(){return {recording,startedAt,endedAt,samples:samples.length,events:events.length,

    droppedSamples,droppedEvents,last:last?JSON.parse(JSON.stringify(last)):null};}

  

  function report(){

    const returns=events.filter(x=>x.type==='transition'&&x.detail==='RETREAT -> FIGHT');

    return {version:'1.0.0',build:W.KVPV_V1?.build??null,status:status(),summary:{

      scope:'retained events only',completedReturns:returns.length,earlyReturns:events.filter(x=>x.type==='early-return').length,

      hpDropsDuringRetreat:events.filter(x=>x.type==='hp-drop-retreat').length,

      movementCommands:events.filter(x=>x.type==='move').length,

      bossHitsDuringRetreat:events.filter(x=>x.type==='boss-hit'&&x.phase==='RETREAT').length},

      interpretation:'Client observations; HP drops and distance do not prove server hit range or damage source.',

      samples:JSON.parse(JSON.stringify(samples)),events:JSON.parse(JSON.stringify(events))};

  }

  W.KVPV_BOSS_LOG=Object.freeze({

    start(){recording=true;startedAt=Date.now();endedAt=null;lastSampleAt=-Infinity;

      last=null;samples=[];events=[];droppedSamples=0;droppedEvents=0;return status();},

    stop(){recording=false;endedAt=Date.now();return status();},status,report,

    export(){return JSON.stringify(report(),null,2);},_record:record

  });

})();

