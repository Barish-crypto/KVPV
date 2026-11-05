/* Tien Ma Quyet Chien: 8005 only, nearest enemy kiting at <=10% HP.
 * Auto-arms. Active ONLY in native Camp War battle maps 2191..2194.
 * No fabricated packets, cooldown bypass, auto entry or target switching.
 */
(() => {
'use strict';
const W=window,KEY='KVPV_TIENMA_PVP',old=W[KEY];
let resume=old?old?.status?.().enabled===true:true;
try{old?.stop?.('reload');}catch(e){W.KVPV_V1?.diagnostics?.record?.(e);}
const actor=String(W.__KVPV_OWN_ACTOR_ID||'');
const C=Object.freeze({skill:8005,hpRetreat:0.10,hpResume:0.15,distance:600,
 fleeBelow:580,step:260,pollMs:150,idleMs:800,moveGapMs:450,maxScan:300});
const S={enabled:false,timer:null,timerMs:null,retreat:false,casts:0,moves:0,blocked:0,
 lastCast:null,lastMove:-Infinity,lastDestination:null,enemyId:'',nearDistance:null,
 reason:'off',lastError:''};
const prop=(r,k)=>r?.property?.get?.(k);
const id=r=>String(r?.id??prop(r,'id')??'');
const comp=(r,k)=>{const type=W._d?._Yct?.[k];return type?r?.getComponent?.(type):null;};
const me=()=>W._C?._Ba?.instance?.getRole?.(Number(actor))??null;
const owned=()=>!!actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;
const map=()=>Number(W._C?._Mn?._Cn?.currentID);
const war=()=>W._Ba?._W8t?.main?._mWt?.ins;
const camp=()=>W._Ba?._W8t?._O8t?.ins;
function inside(){
 const m=map(),entry=Number(W._Ba?._$a?._yo?.ins?.intoSce?.[0]);
 const w=war(),c=camp();
 return [2191,2192,2193,2194].includes(m)&&entry===m&&
  Number(w?.status)===3&&Number(w?.fightTime)>0&&
  [0,1].includes(Number(c?.myCampType));
}
function alive(r){
 const hp=prop(r,'hp');
 return !!r&&r.isValid!==false&&Number(prop(r,'status'))!==1024&&
  (!Array.isArray(hp)||Number(hp[0])>0);
}
const pos=r=>{
 const p=prop(r,'position'),x=Number(p?.x),y=Number(p?.y);
 return p&&Number.isFinite(x)&&Number.isFinite(y)?{x,y}:null;
};
function enemy(r,self){
 const side=Number(prop(r,'campType'));
 return alive(r)&&r!==self&&id(r)!==actor&&!!id(r)&&
  Number(prop(r,'type'))===4&&[0,1].includes(side)&&
  side!==Number(camp()?.myCampType)&&
  Number(prop(self,'campType'))===Number(camp()?.myCampType);
}
function nearest(self,selected){
 const p=pos(self);if(!p)return null;
 let best=null,bestD=Infinity;
 const inspect=r=>{
  if(!enemy(r,self))return;
  const q=pos(r);if(!q)return;
  const d=Math.hypot(q.x-p.x,q.y-p.y);
  if(d<bestD){bestD=d;best={id:id(r),distance:d,ownPos:p,enemyPos:q};}
 };
 inspect(selected);
 const roles=W._C?._Ba?.instance?.getRoles?.();
 if(roles&&typeof roles==='object'){
  let n=0;for(const r of Object.values(roles)){if(++n>C.maxScan)break;inspect(r);}
 }
 return best;
}
const canRun=()=>W.document?.hidden!==true&&W.document?.hasFocus?.()!==false&&
 Date.now()>=Number(W.__KVPV_USER_UI_UNTIL||0)&&
 W.KVPV_ENTRY_POLICY?.manual!==true&&
 W.KVPV_BOSS_TEAM?.priority?.()!==true&&
 W.KVPV_HITRUN1?.status?.(false)?.running!==true;
function flee(self,selected){
 const threat=nearest(self,selected);
 if(!threat){S.enemyId='';S.nearDistance=null;S.reason='retreat_no_verified_enemy';return;}
 S.enemyId=threat.id;S.nearDistance=Number(threat.distance.toFixed(1));
 if(threat.distance>=C.fleeBelow){S.reason='distance_safe';return;}
 const move=comp(self,'_zet');
 if(typeof move?.moveTo!=='function'){S.reason='native_movement_unavailable';return;}
 const now=Date.now();
 if(now-S.lastMove<C.moveGapMs){S.reason='retreat_move_throttled';return;}
 let dx=threat.ownPos.x-threat.enemyPos.x,dy=threat.ownPos.y-threat.enemyPos.y;
 const norm=Math.hypot(dx,dy);
 if(norm<0.001){dx=1;dy=0;}else{dx/=norm;dy/=norm;}
 const step=Math.min(C.step,Math.max(0,C.distance+20-threat.distance));
 const dest={x:Math.round(threat.ownPos.x+dx*step),y:Math.round(threat.ownPos.y+dy*step)};
 if(move.running?.()===true&&S.lastDestination&&
  Math.hypot(dest.x-S.lastDestination.x,dest.y-S.lastDestination.y)<50){
  S.reason='retreat_moving';return;
 }
 move.moveTo(dest.x,dest.y);
 S.lastMove=now;S.lastDestination=dest;S.moves++;S.reason='retreat_kiting_600';
}
function attack(self,combat,selector,selected){
 if(!enemy(selected,self)){S.reason='waiting_selected_enemy';return;}
 S.enemyId=id(selected);
 if(typeof combat?.combat!=='function'||typeof combat?.isCooldown!=='function'||
  typeof combat?.isValidTarget!=='function'||typeof combat?.isValidRange!=='function'||
  typeof selector?._f7t!=='function'){S.reason='native_skill_components_missing';return;}
 if(combat.isCooldown()!==false||combat.isValidTarget()!==true||combat.isValidRange()!==true){
  S.blocked++;S.reason='native_cooldown_target_or_range';return;
 }
 const now=Date.now(),rows=[...(selector?._rtt??[]),...(selector?._wet??[])].filter(r=>
  Number(r?.[0])===C.skill&&Number.isFinite(Number(r?.[1]))&&Number(r[1])<now);
 if(!rows.length){S.reason='skill_8005_not_ready';return;}
 const picked=Number(selector._f7t(rows,[],1));
 if(picked!==C.skill){S.reason='native_selector_rejected';return;}
 if(!inside()||!enemy(combat.target,self)||combat.target!==selected)return;
 combat.combat(C.skill);
 S.casts++;S.lastCast=now;S.reason='native_8005_cast';
}
function tick(){
 if(!S.enabled)return;
 if(!owned()||!inside()){S.reason='outside_verified_tien_ma';S.retreat=false;return;}
 if(!canRun()){S.reason='manual_or_foreign_owner';return;}
 const mode=W.KVPV_MODE?.status?.(false)?.mode;
 if(mode&&mode!=='OFF'){
  if(typeof W.KVPV_MODE?.stop==='function')W.KVPV_MODE.stop('yield_to_tien_ma_quyet_chien');
  S.reason='yield_previous_combat_owner';return;
 }
 if(W.KVPV_TH300?.status?.(false)?.running===true){S.reason='boss_combat_owner';return;}
 const self=me();
 if(!alive(self)||W._Ba?._rJ?._O$?.ins?.isDead===true){S.reason='player_dead';return;}
 const hp=prop(self,'hp'),h=Number(hp?.[0]),max=Number(hp?.[1]);
 if(!Array.isArray(hp)||!Number.isFinite(h)||!Number.isFinite(max)||max<=0){
  S.reason='hp_unavailable';return;
 }
 const ratio=h/max;
 if(ratio<=C.hpRetreat)S.retreat=true;
 else if(ratio>C.hpResume)S.retreat=false;
 const combat=comp(self,'_Het'),selected=combat?.target;
 if(S.retreat){flee(self,selected);return;}
 S.nearDistance=null;attack(self,combat,comp(self,'_Eet'),selected);
}
function safeTick(){
 try{tick();}catch(e){S.lastError=String(e?.message??e);S.reason='error';}
 finally{if(S.enabled)schedule();}
}
function schedule(){
 const interval=inside()?C.pollMs:C.idleMs;
 if(S.timer!==null&&S.timerMs===interval)return;
 if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)?.(S.timer);
 S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(safeTick,interval);
 S.timerMs=interval;
}
function status(){
 const self=me(),hp=prop(self,'hp');
 return {enabled:S.enabled,inside:inside(),map:map(),actor,skill:C.skill,
  hpPercent:Array.isArray(hp)&&Number(hp[1])>0?Number((100*hp[0]/hp[1]).toFixed(1)):null,
  retreat:S.retreat,enemyId:S.enemyId,nearestEnemyDistance:S.nearDistance,
  targetDistance:C.distance,casts:S.casts,moves:S.moves,blocked:S.blocked,
  lastDestination:S.lastDestination,reason:S.reason,lastError:S.lastError,
  config:{...C},note:'Native 8005 only, verified rival camp. Retreat at 10%, resume above 15%; range 600 is a movement goal, not a server guarantee.'};
}
function stop(reason='manual_stop'){
 S.enabled=false;if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)?.(S.timer);
 S.timer=null;S.timerMs=null;S.retreat=false;S.reason=reason;return status();
}
function start(){
 if(!owned())throw Error('Game actor not ready; cannot arm Tien Ma PvP');
 S.enabled=true;safeTick();return status();
}
W[KEY]=Object.freeze({start,stop,status,tick:safeTick,config:C});
if(resume&&owned())start();
})();
