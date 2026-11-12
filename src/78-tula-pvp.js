/* Tu La Loi Dai: native Tian Quan skills and boss-only approach.
 * Use only a native-selected boss target in valid scene 58/61.
 */
(() => {
'use strict';
const W=window,KEY='KVPV_TULA_PVP',old=W[KEY],actor=String(W.__KVPV_OWN_ACTOR_ID||'');
try{old?.stop?.('reload');}catch(e){W.KVPV_V1?.diagnostics?.record?.(e);}
const C={enabled:old?.config?.enabled!==false,pollMs:16,moveFactor:99,stopDistance:180,
  maxChaseDistance:2000,moveGapMs:450,skills:[8001,8002,8003,8004,8005],
  tuyetHoc:[1001,1002,1003,1004,1005,1006,1007,1008]};
const S={timer:null,armed:false,enemyId:'',reason:'waiting_tula',lastError:'',armedCount:0,disarmedCount:0,
  casts:0,thCasts:0,basicCasts:0,lastSkill:null,blocked:0,moveBase:null,moveApplied:null,
  moves:0,distance:null,lastMoveAt:0,movement:'waiting_boss_target'};
const MOVE={obj:null,base:null,applied:null};
const transformSkill=id=>W.KVPV_TRANSFORM10?.transformed?.()===true&&W.KVPV_TRANSFORM10?.has?.(Number(id))===true;
function castSkill(combat,id){if(transformSkill(id))return W.KVPV_TRANSFORM10.cast(combat,id);return combat.combat(id);}
const prop=(r,k)=>r?.property?.get?.(k);
const identity=r=>String(r?.id??prop(r,'id')??'');
const own=()=>!!actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;
const role=()=>W._C?._Ba?.instance?.getRole?.(Number(actor));
const nativeTarget=r=>{
 const Cmp=W._d?._Yct?._Het;
 return Cmp?r?.getComponent?.(Cmp)?.target:null;
};
function restoreMove(){if(MOVE.obj&&MOVE.obj.speed===MOVE.applied)MOVE.obj.speed=MOVE.base;
 MOVE.obj=null;MOVE.base=null;MOVE.applied=null;S.moveBase=null;S.moveApplied=null;}
function applyMove(r){const mover=W._d?._Yct?._zet?r?.getComponent?.(W._d._Yct._zet):null;
 if(!mover||!Number.isFinite(Number(mover.speed))||Number(mover.speed)<=0){restoreMove();return false;}
 if(MOVE.obj!==mover){restoreMove();MOVE.obj=mover;MOVE.base=Number(mover.speed);MOVE.applied=MOVE.base*C.moveFactor;}
 else if(mover.speed!==MOVE.applied){MOVE.base=Number(mover.speed);MOVE.applied=MOVE.base*C.moveFactor;}
 mover.speed=MOVE.applied;S.moveBase=MOVE.base;S.moveApplied=MOVE.applied;return true;}
function active(){
 const d=W.KVPV_DAILY?.tuLaStatus?.(false),m=W._Ba?._hE?._olt?.inst;
 const scene=Number(W._Ba?._$a?.SceneUtil?.curScene);
 const foreign=W.KVPV_FAR_SCOPE?.status?.();
 if(foreign?.inside===true&&foreign.kind!=='TU_LA')return false;
 const job=W.KVPV_DAILY?.quickState?.()?.job;
 return own()&&W.KVPV_DAILY?.config?.enableTuLa!==false&&
   d?.dangTrongTran===true&&[58,61].includes(Number(d.canh))&&
   [58,61].includes(scene)&&Number(d.giaiDoan)>=1&&m?.funIsOpen===true&&
   (!job||['tula','rảnh','ranh','idle'].includes(String(job).toLowerCase()));
}
function validTarget(t,r){
 if(!t||t===r||t.isValid===false||identity(t)===''||identity(t)===actor||
    Number(prop(t,'type'))!==1)return false;
 const Cmp=W._d?._Yct?._Het,c=Cmp?r?.getComponent?.(Cmp):null;
 return c?.target===t&&typeof c?.isValidTarget==='function'&&c.isValidTarget()===true;
}
function approachBoss(r,target,combat){
 const p=prop(r,'position'),q=prop(target,'position'),mover=W._d?._Yct?._zet?
  r?.getComponent?.(W._d._Yct._zet):null;
 if(!p||!q||![p.x,p.y,q.x,q.y].every(Number.isFinite)||typeof mover?.moveTo!=='function'){
  S.movement='waiting_movement_component';return false;
 }
 if(combat?.isValidRange?.()!==false){S.movement='native_range_or_unknown';return false;}
 const dx=q.x-p.x,dy=q.y-p.y,d=Math.hypot(dx,dy);S.distance=Math.round(d*100)/100;
 if(d<=C.stopDistance||d>C.maxChaseDistance){S.movement=d>C.maxChaseDistance?'boss_out_of_chase_range':'within_approach_distance';return false;}
 if(Date.now()-S.lastMoveAt<C.moveGapMs||mover.running?.()===true){S.movement='approach_throttled_or_running';return false;}
 const travel=d-C.stopDistance,x=Math.round(p.x+dx/d*travel),y=Math.round(p.y+dy/d*travel);
 if(!Number.isFinite(x)||!Number.isFinite(y)){S.movement='invalid_destination';return false;}
 mover.moveTo(x,y);S.lastMoveAt=Date.now();S.moves++;S.movement='moving_to_native_boss';return true;
}
function comboAttack(r,target){
 const Cmp=W._d?._Yct??{},combat=Cmp._Het?r?.getComponent?.(Cmp._Het):null,selector=Cmp._Eet?r?.getComponent?.(Cmp._Eet):null;
 if(combat?.target!==target||typeof combat?.combat!=='function'||typeof combat?.isCooldown!=='function'||
    typeof combat?.isValidTarget!=='function'||typeof combat?.isValidRange!=='function'||typeof selector?._f7t!=='function'){
  S.reason='native_combat_components_unavailable';return;
 }
 if(combat.isCooldown()!==false||combat.isValidTarget()!==true||combat.isValidRange()!==true){S.blocked++;S.reason='native_cooldown_target_or_range';return;}
 const now=Date.now(),rows=[...(Array.isArray(selector._rtt)?selector._rtt:[]),...(Array.isArray(selector._wet)?selector._wet:[])]
  .filter(row=>(C.tuyetHoc.includes(Number(row?.[0]))||C.skills.includes(Number(row?.[0]))||transformSkill(row?.[0]))&&Number.isFinite(Number(row?.[1]))&&Number(row[1])<now);
 const transformed=rows.filter(row=>transformSkill(row[0])),th=rows.filter(row=>C.tuyetHoc.includes(Number(row[0]))),basic=rows.filter(row=>C.skills.includes(Number(row[0]))),pool=transformed.length?transformed:th.length?th:basic;
 if(!pool.length){S.reason='no_native_ready_tian_quan_skills';return;}
 const skill=Number(selector._f7t(pool,[],1));
 if(!pool.some(row=>Number(row[0])===skill)||!active()||combat.target!==target||!validTarget(target,r)){S.reason='native_selector_or_target_changed';return;}
 castSkill(combat,skill);S.casts++;S.lastSkill=skill;
 if(transformSkill(skill)){S.transformCasts=(S.transformCasts||0)+1;S.reason='native_transform_skill_cast';}
 else if(C.tuyetHoc.includes(skill)){S.thCasts++;S.reason='native_tian_quan_tuyet_hoc_cast';}
 else{S.basicCasts++;S.reason='native_tian_quan_basic_cast';}
}
function disarmDodge(reason){
 if(S.armed){
  try{W.KVPV_PVP_LUOFENG?.stop?.('tula_'+reason);}catch(e){S.lastError=String(e);}
  S.armed=false;S.disarmedCount++;
 }
 S.enemyId='';
}
function release(reason){restoreMove();disarmDodge(reason);}
function tick(){
 if(!C.enabled||!active()){release('inactive');S.reason='waiting_tula';return;}
 if(W.KVPV_ENTRY_POLICY?.manual===true||W.document?.hidden===true||
    W.document?.hasFocus?.()===false||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)){
  release('manual_or_unfocused');S.reason='manual_or_unfocused';return;
 }
 if(W._Ba?._rJ?._O$?.ins?.isDead===true||W.KVPV_BOSS_TEAM?.priority?.()===true||
    W.KVPV_TH300?.status?.(false)?.running===true||
    W.KVPV_HITRUN1?.status?.(false)?.running===true){
  release('foreign_owner_or_dead');S.reason='foreign_owner_or_dead';return;
 }
 const r=role();
 if(!r){release('waiting_role');S.reason='waiting_role';return;}
 const movementActive=applyMove(r);
 disarmDodge('boss_only_mode');
 const target=nativeTarget(r);
 if(!validTarget(target,r)){S.enemyId='';S.movement='waiting_native_boss_target';S.reason=movementActive?'movement_boost_active_waiting_boss':'waiting_native_boss_target';return;}
 S.enemyId=identity(target);
 const combat=r?.getComponent?.(W._d?._Yct?._Het);
 if(combat?.isValidRange?.()===false){approachBoss(r,target,combat);return;}
 S.movement='native_range';
 comboAttack(r,target);
}
function safeTick(){try{tick();}catch(e){S.lastError=String(e?.message??e);S.reason='error';release('error');}}
function status(){
 return {enabled:C.enabled,inside:active(),actor,enemyId:S.enemyId,autoDodgeOwned:S.armed,
   armedCount:S.armedCount,disarmedCount:S.disarmedCount,reason:S.reason,lastError:S.lastError,
   combo:{priority:'native transformed skills, Tuyet Hoc 1001-1008, basics 8001-8005',casts:S.casts,transformCasts:S.transformCasts||0,thCasts:S.thCasts,basicCasts:S.basicCasts,lastSkill:S.lastSkill,blocked:S.blocked},
   movementSpeed:{factor:C.moveFactor,active:!!MOVE.obj,base:S.moveBase,applied:S.moveApplied,clientSide:true},
   movement:{mode:'native_selected_boss_only',state:S.movement,distance:S.distance,moves:S.moves,
     stopDistance:C.stopDistance,maxChaseDistance:C.maxChaseDistance},
   config:{...C},attackMode:'native_selected_boss_only',
   note:'Tu La scene 58/61 only; approaches and attacks only a native-selected type-1 boss. Never selects or attacks player targets. Movement speed is client-side; server acceptance is not guaranteed.'};
}
function start(){C.enabled=true;if(S.timer===null)S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(safeTick,C.pollMs);safeTick();return status();}
function stop(reason='manual_stop'){C.enabled=false;if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)?.(S.timer);
 S.timer=null;release(reason);S.reason=reason;return status();}
W[KEY]=Object.freeze({start,stop,status,tick:safeTick,config:C});start();
})();
