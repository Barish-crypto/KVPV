'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const path=require('node:path');
const read=p=>fs.readFileSync(path.join(__dirname,p),'utf8');
const startup=read('src/11-auto-tianquan.js');
const modes=read('src/09-modes.js');
const calls=[];
const W={
 __KVPV_OWN_ACTOR_ID:'10228867268946',
 KVPV_TH300:{setInterleaved:(...args)=>calls.push(['setInterleaved',...args]),
  setBasicPace(){},setClientPace(){},setBasicRotation(){},setBasicHitQuota(){},
  setSkillPriority(){},setAfterTHWait(){},setTianQuanFiveBasics(){},
  setTianQuanTuyetHoc(){},setTianQuanTHGapBasics(){},setTianQuanCosmic(){},
  setTianQuanLuoFeng(){},setTianQuanIdleFill(){},setTianQuan4100BasicSolo(){},
  setBasicAnimationSpeed(){},setTianQuanVisualSpeed(){},setBurst(){},
  setBasicProbe(){},setPrimaryBasic(){},setConfirmedTailCut(){},setBasicOnly(){}},
 KVPV_MODE:{armTianQuan:()=>calls.push(['arm'])},
 KVPV_TQ115:{stop(){}},KVPV_TQ_BASIC_FORCE:{setEnabled(){}},
 KVPV_FAR_SCOPE:{setAllBosses(){}},KVPV_BOSS_LOG:{start(){}}
};
vm.runInNewContext(startup,{window:W,console},{timeout:1500});
assert.equal(W.KVPV_TQ_POSITION_ONLY.enabled,false,'must NOT disable HP recovery');
assert.equal(W.KVPV_TQ_POSITION_ONLY.heal,true,'HitRun recovery must remain available');
assert.equal(W.KVPV_TQ_POSITION_ONLY.distance,310,'TQ far goal 310');
assert(calls.some(row=>row[0]==='arm'),'native dungeon watcher remains armed');
assert(calls.some(row=>row[0]==='setInterleaved'&&row[2]===310));
assert(modes.includes("const tqDistance=()=>Number(W.KVPV_TQ_POSITION_ONLY?.distance??310)"));
assert(modes.includes("entryGoal=tqDistance()"),'native inward path protected at 310');
assert(modes.includes("W.KVPV_TH300?.setDistance?.(tqDistance())"),
 'TQ distance must not be replaced by another dungeon profile');
assert(modes.includes("if(W.KVPV_FAR_SCOPE?.status?.()?.kind==='THIEN_QUAN')"),
 'TQ controller must set goal before it starts');
assert(modes.includes("W.KVPV_HITRUN_AUTO.rearm()"),'HitRun recovery auto arm retained');
assert(modes.includes("W.KVPV_HITRUN1.start()"),'native HitRun start retained');
console.log('PASS Tian Quan safe 310 range: restore 35/100 HP recovery, pin independent TQ goal, native inward-move gate');
