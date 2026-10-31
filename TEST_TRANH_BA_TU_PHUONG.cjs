'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const src=fs.readFileSync(__dirname+'/src/81-tranh-ba-tu-phuong-pvp.js','utf8');
let calls=0,now=Date.now();
const target={id:'enemy',property:{get:k=>({type:4,campType:2,hp:[100,100]})[k]}};
const self={id:'me',property:{get:k=>({campType:1})[k]},getComponent:t=>t==='combat'?combat:t==='skills'?skills:null};
const castIds=[];
const combat={target,isCooldown:()=>false,isValidTarget:()=>true,isValidRange:()=>true,combat:id=>{calls++;castIds.push(id);}};
const skills={_rtt:[[1001,now-100],[8001,now-100]],_wet:[],_f7t:rows=>rows[0][0]};
const W={__KVPV_OWN_ACTOR_ID:'123',_Ba:{_rJ:{_O$:{ins:{actorId:'123'}}},_$a:{SceneUtil:{isCommonScene:false},_yo:{ins:{intoSce:[4500]}}}},
 _C:{_Mn:{_Cn:{currentID:4500}},_Ba:{instance:{getRole:()=>self}}},
 _d:{_Yct:{_Het:'combat',_Eet:'skills'}},
 KVPV_DAILY:{lichData:()=>({active:[{key:'tranh_ba_tu_phuong'}]})},
 KVPV_V1:{timers:{setInterval:()=>1,clearInterval:()=>{}}},
 document:{hidden:false,hasFocus:()=>true}};
vm.runInNewContext(src,{window:W,Date,console});
const api=W.KVPV_TRANH_BA_TU_PHUONG;
assert.equal(calls,0,'must not cast without calibrated map');
api.calibrateHere();api.tick();assert(calls>0,'verified enemy native cast');
assert(castIds.every(id=>id>=8001&&id<=8005),'must cast basic only, never TH');
combat.target={...target,property:{get:k=>({type:4,campType:1,hp:[100,100]})[k]}};
const count=calls;api.tick();assert.equal(calls,count,'must not hit same camp');
W.KVPV_DAILY.lichData=()=>({active:[]});combat.target=target;api.tick();assert.equal(calls,count,'must not hit outside active event');
assert(!/\.moveTo\s*\(|setSpeed\s*\(|moveSpeed\s*=/.test(src),'PvP module must not move or speed up movement');
api.stop();console.log('PASS Tranh Ba Tu Phuong PvP guards and native cast');
