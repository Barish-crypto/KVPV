
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
let now=1000;class Clock extends Date{static now(){return now;}}
const rows=[[90001,0,5000],[90002,0,5000]];
const W={__KVPV_OWN_ACTOR_ID:'12345',_Ba:{_rJ:{_O$:{ins:{actorId:'12345'}}},_s3:{_ZJ:{ins:{curShowId:17,getTransformingSkills:()=>({skills:rows,comSkills:[]})}}}},_ft:{_nY:{ins:{getCfgBySkillIdAndLv:id=>[0,0,String(id)]}}}};
vm.runInNewContext(fs.readFileSync(__dirname+'/src/13-transform-skills.js','utf8').replace(/^\/\/ \[VI dòng gốc \d+\].*\r?\n/gm,''),{window:W,Date:Clock});
const m=W.KVPV_TRANSFORM10,selector={};let seen=null;
const native=function(a,b,mode){seen={a,b,mode,self:this};const r=[...a,...b].find(x=>x[1]<now);if(!r)return -1;r[1]=now+r[2];return r[0];};
assert.equal(m.select(native,selector,rows,[],2),90001);
assert.equal(seen.a,rows,'native rows must be passed unchanged');
assert.equal(seen.self,selector);
assert.equal(rows[0][1],6000,'native cooldown must remain five seconds');
assert.equal(m.select(native,selector,rows,[],2),90002);
assert.equal(m.select(native,selector,rows,[],2),-1,'no forced cooldown');
assert.equal(m.status().clientCooldownMs,null);
now+=5001;assert.equal(m.select(native,selector,rows,[],2),90001);
m.stop();assert.equal(m.select(native,selector,rows,[],2),90002);
console.log('PASS transformation: native skill choice, cooldown and animations unmodified');
