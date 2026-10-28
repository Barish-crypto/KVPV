/* La Phong PVP: remote TH(1001..1008) observer + optional native sideways evade.
 * Event 1039 on remote players is unverified: not guaranteed to replicate.
 * No native cooldown change, combat hook override, packet injection or auto-start.
 */
(() => {
'use strict';
const W=window,KEY='KVPV_PVP_LUOFENG',actorId=String(W.__KVPV_OWN_ACTOR_ID||W._Ba?._rJ?._O$?.ins?.actorId||'');
try{W[KEY]?.stop?.();}catch(e){W.KVPV_V1?.diagnostics?.record?.(e);}
const cfg=Object.freeze({event:1039,maxDistance:450,step:115,interval:120,minGap:1250,maxHistory:30,maxNearbyEnemies:4});
const S={on:false,auto:false,timer:null,target:null,targetId:'',scene:'',signals:0,threats:0,
 dodgeAttempts:0,blocked:0,lastDodge:-Infinity,side:1,lastSkill:null,lastSignal:null,
 reason:'off',error:'',history:[],nearby:new Map(),nearbyMode:false,nearbyThreats:0};
const prop=(r,k)=>r?.property?.get?.(k);
const id=r=>String(r?.id??prop(r,'id')??'');
const types=()=>W._d?._Yct??{};
const me=()=>W._C?._Ba?.instance?.getRole?.(Number(actorId))??null;
const component=(r,k)=>{const c=types()[k];return c?r?.getComponent?.(c):null;};
const scene=()=>String(W._C?._Mn?._Cn?.currentID??W._Ba?._$a?._yo?.ins?.intoSce?.[0]??'');
const owned=()=>!!actorId&&String(W._Ba?._rJ?._O$?.ins?.actorId??'')===actorId&&!W.__KVPV_UNIVERSAL_HALTED;
const pos=r=>{const p=prop(r,'position')??r?.coords??r?.position;const x=Number(p?.x),y=Number(p?.y);return p&&Number.isFinite(x)&&Number.isFinite(y)?{x,y}:null;};
const inTruTien=()=>{const s=W.KVPV_FAR_SCOPE?.status?.();return s?.inside===true&&s.kind==='TRU_TIEN';};
const inStrongest=()=>{
 const st=W.KVPV_STRONGEST_TEAM?.status?.();
 return st?.enabled===true&&st?.inside===true&&st?.open===true&&st?.phase==='ACTIVE';
};
// A Strongest Team opponent must be a real player, be selected by the native
// event selector, and be explicitly marked as not on our team.
const opposingStrongest=enemy=>{
 if(!inStrongest()||Number(prop(enemy,'type'))!==4)return false;
 const m=W._Ba?._T3?._G_t?.instance,rank=m?.getNearPlayerRank?.();
 return !!m&&String(m.selectTagetId)===id(enemy)&&Array.isArray(rank)&&
   rank.some(e=>e&&String(e.objId)===id(enemy)&&m.isMyTeam?.(e.color)===false);
};
const isEnemy=(enemy,actor)=>{if(!enemy||enemy===actor||enemy.isValid===false||!id(enemy)||id(enemy)===actorId)return false;
 const type=Number(prop(enemy,'type'));
 // Real player roles use type 4. Strongest Team additionally checks native enemy-team membership.
 return (inTruTien()?type===4:inStrongest()?opposingStrongest(enemy):[0,2].includes(type))&&
   typeof enemy.on==='function'&&typeof enemy.off==='function';};
const selected=()=>{const a=me(),t=component(a,'_Het')?.target;return owned()&&isEnemy(t,a)?{actor:a,enemy:t}:null;};
function log(kind,extra={}){S.history.push({at:Date.now(),kind,...extra});if(S.history.length>cfg.maxHistory)S.history.shift();}
function unlinkNearby(){
 for(const v of S.nearby.values()){
  try{v.role?.off?.(cfg.event,S,v.fn);}catch(e){S.error=String(e);}
 }
 S.nearby.clear();
}
function verifiedNearby(role,actor){
 if(!inStrongest()||!role||role===actor||role.isValid===false||
    Number(prop(role,'type'))!==4||!id(role)||id(role)===actorId)return false;
 const m=W._Ba?._T3?._G_t?.instance;
 const list=m?.getNearPlayerRank?.();
 return Array.isArray(list)&&list.some(row=>row&&String(row.objId)===id(role)&&m.isMyTeam?.(row.color)===false);
}
function refreshNearby(cur){
 if(!S.nearbyMode||!cur||!inStrongest()){unlinkNearby();return;}
 const m=W._Ba?._T3?._G_t?.instance,world=W._C?._Ba?.instance;
 const rank=m?.getNearPlayerRank?.(),wanted=new Map(),a=pos(cur.actor);
 if(Array.isArray(rank)&&a){
  for(const row of rank){
   if(wanted.size>=cfg.maxNearbyEnemies)break;
   if(!row||m.isMyTeam?.(row.color)!==false)continue;
   const role=world?.getRole?.(row.objId),b=pos(role),key=id(role);
   if(!role||role===cur.enemy||!b||key!==String(row.objId)||wanted.has(key)||
      !verifiedNearby(role,cur.actor)||typeof role.on!=='function'||typeof role.off!=='function')continue;
   const distance=Math.hypot(a.x-b.x,a.y-b.y);
   if(distance>=1&&distance<=cfg.maxDistance)wanted.set(key,role);
  }
 }
 for(const [key,v] of S.nearby){
  if(wanted.get(key)===v.role)continue;
  try{v.role.off(cfg.event,S,v.fn);}catch(e){S.error=String(e);}
  S.nearby.delete(key);
 }
 for(const [key,role] of wanted){
  if(S.nearby.has(key))continue;
  const fn=(targetId,skillId)=>enemyCast(targetId,skillId,role);
  try{role.on(cfg.event,S,fn);S.nearby.set(key,{role,fn});}
  catch(e){S.error=String(e);}
 }
}
function unlink(){unlinkNearby();const old=S.target;S.target=null;S.targetId='';S.scene='';
 try{old?.off?.(cfg.event,S,enemyCast);}catch(e){S.error=String(e);}}
function blocked(actor,enemy){
 if(!S.auto)return 'observe_only';
 if(!owned())return 'actor_changed';
 if(W.document?.hidden===true||W.document?.hasFocus?.()===false)return 'unfocused';
 if(Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0))return 'manual_ui';
 if(W.KVPV_ENTRY_POLICY?.manual===true)return 'manual_entry_policy';
 if(W.KVPV_FAR_SCOPE?.status?.()?.inside===true&&!inTruTien()&&!inStrongest())return 'dungeon_priority';
 if(inStrongest()&&W._Ba?._T3?._G_t?.instance?.collecting===true)return 'native_collecting';
 if(W.KVPV_TH300?.status?.(false)?.running===true||W.KVPV_HITRUN1?.status?.(false)?.running===true)return 'boss_owner';
 const mode=W.KVPV_MODE?.status?.(false)?.mode;if(mode&&mode!=='OFF'&&!inStrongest())return 'combat_mode_owner';
 if(W.KVPV_BOSS_TEAM?.priority?.()===true||W.KVPV_BASIC10?.status?.()?.roadMelee?.active===true)return 'higher_priority';
 const job=W.KVPV_DAILY?.quickState?.()?.job;
 if(job&&!['rảnh','ranh','idle'].includes(String(job).toLowerCase())&&!inStrongest())return 'daily_job';
 const hp=prop(actor,'hp');if(Array.isArray(hp)&&Number(hp[0])<=0)return 'dead';
 const move=component(actor,'_zet');if(typeof move?.moveTo!=='function')return 'move_unavailable';
 if(move.running?.()===true||[3,4].includes(Number(move._fut)))return 'movement_busy';
 const a=pos(actor),b=pos(enemy);if(!a||!b)return 'position_unknown';
 const distance=Math.hypot(a.x-b.x,a.y-b.y);
 if(distance<1||distance>cfg.maxDistance)return 'outside_threat_band';
 if(Date.now()-S.lastDodge<cfg.minGap)return 'dodge_cooldown';
 return null;
}
function enemyCast(targetId,skillId,source=S.target){
 if(!S.on||!S.target||!owned())return;
 const skill=Number(skillId);if(!Number.isSafeInteger(skill))return;
 S.signals++;S.lastSignal=Date.now();S.lastSkill=skill;
 if(skill<1001||skill>1008||String(targetId)!==actorId)return;
 const cur=selected();if(!cur||cur.enemy!==S.target||S.scene!==scene())return;
 const secondary=source!==S.target;
 if(secondary&&(!S.nearbyMode||!inStrongest()||
   S.nearby.get(id(source))?.role!==source||!verifiedNearby(source,cur.actor)))return;
 S.threats++;if(secondary)S.nearbyThreats++;
 const threat=secondary?source:cur.enemy,why=blocked(cur.actor,threat);
 if(why){S.blocked++;S.reason=why;log('TH_OBSERVED',{skill,reason:why});return;}
 const a=pos(cur.actor),b=pos(threat);if(!a||!b)return;
 const dx=a.x-b.x,dy=a.y-b.y,d=Math.hypot(dx,dy);
 if(!(d>=1&&d<=cfg.maxDistance)){S.blocked++;S.reason='outside_threat_band';return;}
 const side=S.side,vx=dx/d*.3-dy/d*side,vy=dy/d*.3+dx/d*side,n=Math.hypot(vx,vy);
 const x=a.x+cfg.step*vx/n,y=a.y+cfg.step*vy/n;
 try{const issued=component(cur.actor,'_zet').moveTo(x,y);
   if(issued===false){S.blocked++;S.reason='native_move_rejected';log('MOVE_REJECTED',{skill});return;}
   S.lastDodge=Date.now();S.side=-side;S.dodgeAttempts++;S.reason='native_move_issued';
   log('DODGE_ATTEMPT',{skill,source:id(threat),x,y});
 }catch(e){S.error=String(e);S.blocked++;S.reason='movement_failed';log('MOVE_ERROR',{skill});}
}
function status(){const candidate=component(me(),'_Het')?.target;return {enabled:S.on,autoDodge:S.auto,attached:!!S.target,enemyId:S.targetId,
 selectedTargetId:id(candidate),selectedTargetType:prop(candidate,'type')??null,
 scene:S.scene,scope:inTruTien()?'TRU_TIEN':inStrongest()?'STRONGEST_TEAM':'OTHER',
 observedSignals:S.signals,observedTH:S.threats,nearbyTH:S.nearbyThreats,
 nearbyMode:S.nearbyMode,monitoredNearby:[...S.nearby.keys()],lastDodgeAt:Number.isFinite(S.lastDodge)?S.lastDodge:null,
 nativeDodgeAttempts:S.dodgeAttempts,
 blocked:S.blocked,lastSkill:S.lastSkill,lastSignalAt:S.lastSignal,lastReason:S.reason,error:S.error,
 config:{...cfg},recent:S.history.slice(),
 note:'Remote 1039 may not fire for opponents; dodge is a bounded native lateral move, not guaranteed evasion. Strongest Team only accepts verified enemy team type-4 targets.'};}
function sync(){
 if(!S.on)return status();
 if(!owned()){stop('actor_changed');return status();}
 const cur=selected(),enemy=cur?.enemy??null,currentScene=scene(),enemyId=id(enemy);
 if(S.target===enemy&&S.scene===currentScene&&S.targetId===enemyId){refreshNearby(cur);return status();}
 unlink();if(!enemy){S.reason='select_pvp_target';return status();}
 try{enemy.on(cfg.event,S,enemyCast);S.target=enemy;S.targetId=enemyId;S.scene=currentScene;
   S.reason='listening_if_remote_event_exists';log('LISTEN',{enemyId,scene:currentScene});refreshNearby(cur);
 }catch(e){S.error=String(e);S.reason='remote_event_unavailable';}
 return status();
}
function start(opts={}){
 if(!opts||typeof opts!=='object')throw Error('Use start({autoDodge:true|false})');
 if(!owned()){S.reason='wrong_actor';return status();}
 S.on=true;S.auto=opts.autoDodge===true;S.nearbyMode=opts.nearby===true;
 if(S.timer==null)S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(sync,cfg.interval);
 return sync();
}
function stop(reason='manual_stop'){
 S.on=false;S.auto=false;S.nearbyMode=false;
 if(S.timer!=null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)?.(S.timer);
 S.timer=null;unlink();S.reason=reason;return status();
}
W[KEY]=Object.freeze({start,stop,sync,status});
})();