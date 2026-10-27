(() => {
  'use strict';
  window.KVPV_TQ_BASIC_PROFILE=Object.freeze({create(env){
    const ids=[8001,8002,8003,8004,8005],pending=new Map(),rows=new Map();
    let enabled=false,waitMs=10,context='',probe=null,serial=0,tuyetHoc=false;
    const now=()=>Date.now(),active=()=>enabled&&env.scope()==='THIEN_QUAN';
    const learned=()=>ids.filter(id=>env.learned().includes(id));
    const row=id=>{if(!rows.has(id))rows.set(id,{id,attempts:0,unconfirmed:0,hits:[]});return rows.get(id);};
    const probeRunning=()=>active()&&probe?.status==='running';
    const probeSafe=()=>probeRunning()&&env.phase()==='FIGHT'&&Number.isFinite(env.hp())&&env.hp()>=70;
    const goal=()=>probeSafe()?probe.distances[probe.distanceIndex]:null;
    function stop(reason='stopped'){if(probe?.status==='running'){probe.status=reason;probe.endedAt=now();}return report();}
    function step(){probe.index++;probe.distanceIndex=0;if(probe.index>=probe.ids.length)stop('complete');}
    function tick(){
      const next=env.context();if(next!==context){if(probe?.status==='running')stop('Boss/map changed');context=next;pending.clear();rows.clear();}
      for(const [key,c]of pending)if(now()-c.at>3500){row(c.id).unconfirmed++;pending.delete(key);}
      if(!probeRunning())return;
      if(now()-probe.startedAt>=300000){stop('timeout');return;}
      if(!probeSafe())return;
      const key=probe.index+'/'+probe.distanceIndex,attempts=probe.attempts.filter(c=>c.step===key),hits=probe.hits.filter(c=>c.step===key);
      if(hits.length>=2){step();return;}
      if(attempts.length>=2&&!attempts.some(c=>pending.has(c.serial))){probe.distanceIndex++;if(probe.distanceIndex>=probe.distances.length)step();}
    }
    function canAttempt(id){if(!probeRunning())return true;if(!probeSafe()||id!==probe.ids[probe.index])return false;return probe.attempts.filter(c=>c.step===probe.index+'/'+probe.distanceIndex).length<2;}
    function cast(key,id,distance){if(!active()||!ids.includes(id))return;tick();const c={serial:key,id,distance,at:now(),context,step:probeSafe()?probe.index+'/'+probe.distanceIndex:null,probeSerial:probe?.serial};row(id).attempts++;pending.set(key,c);if(c.step!==null)probe.attempts.push({...c});if(pending.size>250)pending.delete(pending.keys().next().value);}
    function hit(key,castDistance,hitDistance,damage){const c=pending.get(key);if(!c||c.context!==context)return;pending.delete(key);const h={serial:key,id:c.id,castDistance,hitDistance,damage,at:now()};row(c.id).hits.push(h);if(row(c.id).hits.length>50)row(c.id).hits.shift();if(probe?.serial===c.probeSerial&&c.step!==null)probe.hits.push({...h,step:c.step});}
    function start(distances=[302,280,240,200,160,120,80]){
      if(!active()||env.phase()!=='FIGHT'||!(env.hp()>=70))throw Error('Đo tầm chỉ trong Thiên Quan, pha FIGHT và HP ≥70%.');
      if(!Array.isArray(distances)||!distances.length||distances.length>10||distances.some(d=>!Number.isFinite(d)||d<80||d>302))throw Error('Khoảng đo phải trong 80..302.');
      tick();const available=learned();if(!available.length)throw Error('Chưa có năm chiêu tay native để đo.');
      probe={serial:++serial,status:'running',context,startedAt:now(),ids:available,distances:[...new Set(distances)].sort((a,b)=>b-a),index:0,distanceIndex:0,attempts:[],hits:[]};return report();
    }
    function report(){return JSON.parse(JSON.stringify({enabled,active:active(),tuyetHocEnabled:tuyetHoc,tuyetHocActive:active()&&tuyetHoc&&!probeRunning(),waitClientMs:waitMs,ids,learned:learned(),context,probe,probePaused:probeRunning()&&!probeSafe(),
      rows:ids.map(id=>{const r=row(id),distances=r.hits.map(h=>Math.min(h.castDistance,h.hitDistance)).filter(Number.isFinite).sort((a,b)=>b-a);return {...r,confirmedDistance:distances[1]??null,rangeStatus:distances.length>=2?'two_direct_hit_pairs':'unverified'};}),
      note:'Confirmed distance is a tested lower bound, not maximum server range. No confirmation is not proof of a miss. Active probe moves inward, may take damage, pauses below 70% HP/during dodge or recovery, and returns to the normal far goal when finished.'}));}
    return Object.freeze({active,allowsTuyetHoc:()=>active()&&tuyetHoc&&!probeRunning(),setTuyetHoc(value=true){tuyetHoc=!!value;return report();},wait:()=>waitMs,goal,ids:()=>probeSafe()?[probe.ids[probe.index]]:ids.slice(),canAttempt,tick,cast,hit,start,stop,report,
      configure(on=true,wait=10){if(!Number.isFinite(wait)||wait<1||wait>1000)throw Error('Wait must be 1..1000ms');enabled=!!on;waitMs=wait;if(!enabled)stop('disabled');return report();}});
  }});
})();
