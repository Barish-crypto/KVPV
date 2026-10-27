(() => {
  'use strict';
  const w=window,actor='10228867268946',user=()=>w._Ba?._rJ?._O$?.ins;
  if(String(user()?.actorId??'')!==actor)throw Error('Chọn game-frame acc chính.');
  const read=f=>{try{return f()??null;}catch{return null;}},prop=(o,k)=>read(()=>o?.property?.get?.(k)),id=o=>String(prop(o,'id')??o?.id??'');
  const me=w._C?._Ba?.instance?.getRole?.(Number(actor)),combat=me?.getComponent?.(w._d?._Yct?._Het),boss=combat?.target,bossId=id(boss),occ=Number(prop(boss,'occ'));
  if(!bossId||boss.isValid===false||Number(prop(boss,'type'))!==1||![true,1].includes(read(()=>w._ft?._tY?.ins?.isBoss?.(occ))))throw Error('Chọn Boss đang đánh.');
  if(![boss.property,me.property,me].every(o=>typeof o?.on==='function'&&typeof o?.off==='function'))throw Error('Thiếu API sự kiện native.');
  w.KVPV_BOSS_BATTLE_OBSERVER?.stop?.('replaced');
  const owner={},subscriptions=[],events=[],startedAt=Date.now(),scene=()=>String(w._C?._Mn?._Cn?.currentID??''),map=scene(),bossName=String(prop(boss,'name')??'');
  let running=true,reason='observing_server_fed_battle_property',dropped=0;
  const copy=v=>{try{return JSON.parse(JSON.stringify(v??null));}catch{return null;}};
  const queue=()=>{const q=prop(boss,'battle');return Array.isArray(q)?q.slice(0,16).map(r=>Array.isArray(r)?r.slice(0,4):null):null;};
  function add(type,data){events.push({at:Date.now(),type,...data});if(events.length>120){events.shift();dropped++;}}
  function stop(why='manual_stop'){if(!running)return;running=false;reason=why;for(const [o,e,f]of subscriptions)read(()=>o.off(e,owner,f));}
  function valid(){if(!running)return false;if(String(user()?.actorId??'')!==actor||scene()!==map||boss.isValid===false||id(boss)!==bossId||combat.target!==boss){stop('actor_boss_or_map_changed');return false;}if(Date.now()-startedAt>=120000){stop('two_minutes_complete');return false;}return true;}
  function battle(){if(valid())add('boss_battle_property',{queue:queue(),playerHp:copy(prop(me,'hp'))});}
  function hp(){if(valid())add('player_hp_property',{hp:copy(prop(me,'hp')),modelHp:read(()=>user()?.hp)});}
  function hit(source,marker,damage,flags,receiver){if(valid()&&String(receiver)===actor)add('player_damage_signal',{source:String(source),sourceIsSelectedBoss:String(source)===bossId,marker:Number(marker),skillId:Number(marker)/10000,damage:Number(damage),flags:Number(flags),hp:copy(prop(me,'hp'))});}
  function report(){valid();return copy({version:1,actor,bossId,occ,bossName,scene:map,startedAt,at:Date.now(),running,reason,dropped,events,limits:'Passive property/event subscriptions. battle is fed by the TXUk receive handler in the saved client; this observer does not intercept network packets or confirm attack acceptance. Snapshot shows currently queued target/skill, not guaranteed future impact timing. HP and 1012 events may arrive separately. No combat/config/HP edits, no timer. Expiry checked on events/report.'});}
  try{for(const [o,e,f]of [[boss.property,'battle',battle],[me.property,'hp',hp],[me,1012,hit]]){o.on(e,owner,f);subscriptions.push([o,e,f]);}}catch(e){stop('subscription_failed');throw e;}
  add('initial',{queue:queue(),hp:copy(prop(me,'hp'))});
  w.KVPV_BOSS_BATTLE_OBSERVER=Object.freeze({report,export:()=>JSON.stringify(report(),null,2),stop});
  console.info('[KVPV] Ghi hàng đợi battle của Boss và mọi nguồn damage vào nhân vật. copy(KVPV_BOSS_BATTLE_OBSERVER.export()).');
})();
