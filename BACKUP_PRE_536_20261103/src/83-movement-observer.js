/* Read-only player movement observer. No moveTo, writes, RPC, or speed overrides. */
(()=>{'use strict';
const W=window,previous=W.KVPV_MOVEMENT_OBSERVER;previous?.stop?.('reload');
const actor=String(W.__KVPV_OWN_ACTOR_ID??'');
const S={enabled:true,timer:null,history:[],last:null,samples:0,distance:0,peakSpeed:0,rollbacks:0,reason:'waiting_position',error:''};
const owned=()=>!!actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;
function excluded(){const e=W.KVPV_TRANH_BA_TU_PHUONG?.status?.();return e?.inside===true||(e?.eventActive===true&&W._Ba?._$a?.SceneUtil?.isCommonScene===false&&(e?.verifiedMap==null||Number(e.map)===Number(e.verifiedMap)));}
function position(){const r=W._C?._Ba?.instance?.getRole?.(Number(actor)),p=r?.property?.get?.('position')??r?.coords??r?.position;const x=Number(p?.x),y=Number(p?.y);return Number.isFinite(x)&&Number.isFinite(y)?{x,y}:null;}
function tick(){
 try{
  if(!S.enabled||!owned()){S.last=null;S.reason='actor_not_ready';return;}
  if(excluded()){S.last=null;S.reason='excluded_tranh_ba_tu_phuong';return;}
  const map=Number(W._C?._Mn?._Cn?.currentID),pos=position(),now=Date.now();
  if(!pos||!Number.isFinite(map)||map<=0){S.last=null;S.reason='waiting_position';return;}
  if(S.last&&S.last.map===map){
   const dt=now-S.last.now;
   if(dt>=50&&dt<=3000){
    const dx=pos.x-S.last.x,dy=pos.y-S.last.y,dist=Math.hypot(dx,dy),speed=dist*1000/dt;
    if(Number.isFinite(speed)&&dist>0){
     const prior=S.history.at(-1);
     const reversal=prior&&prior.map===map&&prior.dist>0&&
       (dx*prior.dx+dy*prior.dy)<-0.75*dist*prior.dist;
     if(reversal)S.rollbacks++;
     S.distance+=dist;S.peakSpeed=Math.max(S.peakSpeed,speed);
     S.history.push({map,dtMs:dt,dist:Math.round(dist*100)/100,speedPerSec:Math.round(speed*100)/100,dx,dy,reversal:!!reversal});
     if(S.history.length>120)S.history.shift();
     S.samples++;S.reason='measuring';
    }
   }
  }
  S.last={...pos,now,map};
 }catch(e){S.error=String(e?.message??e);S.reason='error';}
}
function status(){const h=S.history.slice(-30),v=h.map(x=>x.speedPerSec),average=v.length?v.reduce((a,b)=>a+b,0)/v.length:0;return {enabled:S.enabled,actorMatch:!!owned(),excluded:excluded(),pollMs:100,samples:S.samples,distanceObserved:Math.round(S.distance*100)/100,avgRecentSpeed:Math.round(average*100)/100,peakSpeed:S.peakSpeed,possibleReversals:S.rollbacks,reason:S.reason,error:S.error,readOnly:true,note:'Client-observed coordinates only: reversals can be ordinary turns; server speed acceptance cannot be proven without server data.'};}
function report(){return {...status(),recent:S.history.slice(-60).map(x=>({...x}))};}
function stop(reason='stopped'){S.enabled=false;const clear=W.KVPV_V1?.timers?.clearInterval??W.clearInterval;if(S.timer!=null&&typeof clear==='function')clear(S.timer);S.timer=null;S.reason=reason;}
W.KVPV_MOVEMENT_OBSERVER=Object.freeze({status,report,tick,stop});
const schedule=W.KVPV_V1?.timers?.setInterval??W.setInterval;
if(typeof W.setInterval==='function'&&typeof schedule==='function')S.timer=schedule(tick,100);
tick();
})();