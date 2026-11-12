(() => {
  'use strict';
  const W=window,actor='10228867268946',model=()=>W._Ba?._rJ?._O$?.ins;
  if(String(model()?.actorId??'')!==actor)throw Error('Chọn game-frame acc chính 10228867268946.');
  const read=fn=>{try{return fn()??null;}catch{return null;}},prop=(o,k)=>read(()=>o?.property?.get?.(k)),id=o=>String(prop(o,'id')??o?.id??'');
  const world=W._C?._Ba?.instance,me=world?.getRole?.(Number(actor))??world?.getRole?.(actor),Comp=W._d?._Yct?._Het;
  const combat=read(()=>me?.getComponent?.(Comp)),boss=combat?.target,bossId=id(boss),occ=Number(prop(boss,'occ')),table=W._ft?._tY?.ins;
  if(!bossId||boss?.isValid===false||Number(prop(boss,'type'))!==1||![true,1].includes(read(()=>table?.isBoss?.(occ))))throw Error('Chọn Boss native đang đánh trước.');
  W.KVPV_BOSS_CONFIG_TRIAL?.stop?.('replaced');
  W.KVPV_BOSS_HP1_TRIAL?.stop?.('native_skill_test');
  W.KVPV_BOSS_HP_TRIAL?.stop?.('native_skill_test');
  const resetErrors=[];
  const call=(obj,key,...args)=>{try{if(typeof obj?.[key]==='function')obj[key](...args);}catch(e){resetErrors.push(key+': '+String(e.message||e));}};
  call(W.KVPV_MODE,'stop','Native skills, Boss config trial');
  call(W.KVPV_HITRUN_AUTO,'stop',true);
  call(W.KVPV_HITRUN1,'stop','Native skills');
  call(W.KVPV_TH300,'setBasicAnimationSpeed',1);
  call(W.KVPV_TH300,'setConfirmedTailCut',false);
  call(W.KVPV_TH300,'setBurst',false);
  call(W.KVPV_TH300,'setTianQuanTuyetHoc',false);
  call(W.KVPV_TH300,'setTianQuanFiveBasics',false,10);
  call(W.KVPV_TH300,'stop','Native skills');
  call(W.KVPV_TH_FAR,'stop','Native skills');
  call(W.KVPV_BASIC10,'stop');
  call(W.KVPV_ROAD_CADENCE,'stop');
  call(W.KVPV_COMPANION_COMBAT,'stop');
  call(W.KVPV_EXPERIMENTAL_BOOST,'stop');
  call(W.KVPV_V879_FAST,'restore');
  call(W.KVPV_RANGE281,'stop');
  if(W.KVPV?.combat?.config)W.KVPV.combat.config.autoArm=false;
  if(resetErrors.length)throw Error('Không hoàn tác hết controller: '+resetErrors.join('; ')+'. F5 rồi chạy file này khi chưa nạp FULL.');

  const cfg=read(()=>table.getCfgById(occ));
  if(!Array.isArray(cfg)||!Number.isFinite(cfg[3])||cfg[3]<=0)throw Error('Cột tầm Boss không hợp lệ hoặc đang bị bản vá khác đổi.');
  const descriptor=Object.getOwnPropertyDescriptor(cfg,'3');
  if(!descriptor||!('value' in descriptor)||!descriptor.writable)throw Error('Cột tầm Boss không thể ghi trực tiếp.');
  const scene=()=>String(W._C?._Mn?._Cn?.currentID??''),map=scene(),old=cfg[3],patched=0,startedAt=Date.now(),owner={},subscriptions=[];
  let running=true,timer=null,reason='testing_client_target_range_zero',restore=null,incoming=0,outgoing=0,inHits=0,outHits=0,last={};
  const hp=o=>{const h=prop(o,'hp');return Array.isArray(h)?h.slice(0,2).map(Number):null;};
  const before={playerHp:hp(me),bossHp:hp(boss)};
  function sample(){last={playerHp:hp(me),bossHp:hp(boss),at:Date.now()};}
  function same(){return String(model()?.actorId??'')===actor&&scene()===map&&boss.isValid!==false&&id(boss)===bossId&&combat.target===boss;}
  function stop(why='manual_stop'){
    if(!running)return;running=false;reason=why;if(same())sample();
    if(timer!==null){W.clearInterval(timer);timer=null;}
    for(const [o,e,f]of subscriptions)read(()=>o.off(e,owner,f));
    try{if(cfg[3]===patched){Object.defineProperty(cfg,'3',descriptor);restore=cfg[3]===old?'restored':'restore_failed';}else restore='not_overwritten_another_change';}catch(e){restore='restore_failed: '+String(e.message||e);}
  }
  function check(){if(!running)return false;if(!same()){stop('actor_boss_or_map_changed');return false;}if(Date.now()-startedAt>=15000){stop('15_second_trial_complete');return false;}if(cfg[3]!==patched){stop('config_changed_by_other_code');return false;}if((hp(me)?.[0]??0)<=0||(hp(boss)?.[0]??0)<=0){stop('actor_or_boss_dead');return false;}return true;}
  function playerHit(source,marker,damage,flags,receiver){if(check()&&String(source)===bossId&&String(receiver)===actor&&Number(damage)>0&&!(Number(flags)&32)){incoming+=Number(damage);inHits++;}}
  function bossHit(source,marker,damage,flags,receiver){if(check()&&String(source)===actor&&String(receiver)===bossId&&Number(damage)>0&&!(Number(flags)&32)){outgoing+=Number(damage);outHits++;}}
  function report(){if(check())sample();return JSON.parse(JSON.stringify({actor,bossId,occ,scene:map,startedAt,at:Date.now(),running,reason,field:'monster_res[3]',originalValue:old,testValue:patched,currentCachedValue:cfg[3],restore,before,last,events:{bossToPlayer:{damage:incoming,hits:inHits},playerToBoss:{damage:outgoing,hits:outHits}},playerControl:'Native skill selection and cooldown; known script combat/boost controllers stopped, not auto-rearmed after this trial.',limits:'Temporary client target-range test only. Zero can stop native player targeting; no proof it disables Boss AI or server damage. No HP writes, reward changes, initiated attacks or moves. Native events may include distinct damage types; totals are observed event sums, not independent server hit counts. Check restores automatically on timeout/context change while the page event loop runs.'}));}
  try{
    Object.defineProperty(cfg,'3',{...descriptor,value:patched});
    for(const [o,f]of [[me,playerHit],[boss,bossHit]])if(typeof o?.on==='function'&&typeof o?.off==='function'){o.on(1012,owner,f);subscriptions.push([o,1012,f]);}
    sample();timer=W.setInterval(()=>{if(check())sample();},250);
  }catch(e){stop('installation_failed');throw e;}
  W.KVPV_BOSS_CONFIG_TRIAL=Object.freeze({status:report,report,stop,export:()=>JSON.stringify(report(),null,2)});
  console.info('[KVPV] Nhân vật dùng skill native; thử monster_res[3] = 0 trong 15 giây. Hoàn tác ngay: KVPV_BOSS_CONFIG_TRIAL.stop().');
  return report();
})();
