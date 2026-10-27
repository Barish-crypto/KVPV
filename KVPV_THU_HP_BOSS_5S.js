(() => {
  'use strict';
  const w=window,actor='10228867268946',user=()=>w._Ba?._rJ?._O$?.ins;
  if(String(user()?.actorId??'')!==actor)throw Error('Chọn game-frame acc chính.');
  if(w.KVPV_FAR_SCOPE?.status?.()?.kind!=='THIEN_QUAN')throw Error('Bản thử HP chỉ dùng trong Thiên Quan.');
  w.KVPV_BOSS_HP_TRIAL?.stop?.('replaced');
  const read=f=>{try{return f()??null;}catch{return null;}},prop=(o,k)=>read(()=>o?.property?.get?.(k)),id=o=>String(prop(o,'id')??o?.id??'');
  const me=w._C?._Ba?.instance?.getRole?.(Number(actor)),comp=w._d?._Yct?._Het,combat=read(()=>me?.getComponent?.(comp)),boss=combat?.target;
  const bossId=id(boss),occ=Number(prop(boss,'occ')),native=read(()=>w._ft?._tY?.ins?.isBoss?.(occ));
  if(!bossId||boss.isValid===false||Number(prop(boss,'type'))!==1||![true,1].includes(native)||typeof boss.property?.set!=='function')throw Error('Chọn Boss native còn sống.');
  const original=prop(boss,'hp');
  if(!Array.isArray(original)||!original.slice(0,2).every(Number.isFinite)||original[1]<=0||original[0]/original[1]<0.1)throw Error('Chỉ thử khi Boss còn ít nhất 10% HP.');
  const saved=original.slice(),patched=original.slice();patched[0]=Math.max(1,Math.ceil(saved[0]/2));
  const scene=()=>String(w._C?._Mn?._Cn?.currentID??''),map=scene(),startedAt=Date.now();
  let running=true,timer=null,reason='temporary_client_hp_half',restoration=null,lastSeen=saved.slice();
  const same=()=>String(user()?.actorId??'')===actor&&scene()===map&&boss.isValid!==false&&id(boss)===bossId&&combat.target===boss&&w.KVPV_FAR_SCOPE?.status?.()?.kind==='THIEN_QUAN';
  function owned(){const hp=prop(boss,'hp');return hp===patched&&hp.length===patched.length&&hp[0]===Math.max(1,Math.ceil(saved[0]/2))&&hp[1]===saved[1];}
  function stop(why='manual_stop'){
    if(!running)return;running=false;reason=why;if(timer!==null){w.clearInterval(timer);timer=null;}
    const hp=prop(boss,'hp');if(same()&&Array.isArray(hp))lastSeen=hp.slice();
    if(id(boss)!==bossId||boss.isValid===false){restoration='skipped_recycled_or_invalid_entity';return;}
    if(!owned()){restoration='kept_newer_hp_update';return;}
    try{boss.property.set('hp',saved.slice());restoration='restored_previous_client_snapshot';}catch(e){restoration='restore_failed: '+String(e.message||e);}
  }
  function check(){if(!running)return;if(!same()){stop('actor_boss_map_or_scope_changed');return;}const hp=prop(boss,'hp');if(Array.isArray(hp))lastSeen=hp.slice();if(!owned()){stop('hp_replaced_or_changed_after_patch');return;}if(Date.now()-startedAt>=5000)stop('5_second_trial_complete');}
  function report(){check();return JSON.parse(JSON.stringify({actor,bossId,occ,scene:map,startedAt,at:Date.now(),running,reason,restoration,before:saved.slice(0,2),temporaryValue:[Math.max(1,Math.ceil(saved[0]/2)),saved[1]],lastObserved:lastSeen.slice(0,2),currentClientHp:same()?prop(boss,'hp'):null,serverDamageConfirmed:false,limits:'Only the local hp property is replaced. A lower UI value is not server damage or proof of a kill. No attack/reward requests. Restores the prior client snapshot only while this patch still owns the HP array; preserves newer HP updates. Five-second timeout depends on the page event loop.'}));}
  try{boss.property.set('hp',patched);lastSeen=patched.slice();timer=w.setInterval(check,250);}catch(e){stop('installation_failed');throw e;}
  w.KVPV_BOSS_HP_TRIAL=Object.freeze({stop,report,export:()=>JSON.stringify(report(),null,2)});
  console.info('[KVPV] HP client giảm một nửa trong tối đa 5 giây. Hoàn tác: KVPV_BOSS_HP_TRIAL.stop().');
  return report();
})();
