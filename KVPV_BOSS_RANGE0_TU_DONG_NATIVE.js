(() => {
  'use strict';
  const W=window,actor='10228867268946',model=()=>W._Ba?._rJ?._O$?.ins;
  if(String(model()?.actorId??'')!==actor)throw Error('Chọn game-frame acc chính 10228867268946.');
  if(typeof W._ft?._tY?.ins?.getCfgById!=='function')throw Error('Chưa có bảng monster_res.');
  W.KVPV_BOSS_RANGE0_AUTO?.stop?.('replaced');
  W.KVPV_BOSS_CONFIG_TRIAL?.stop?.('auto_range_zero');
  W.KVPV_BOSS_HP1_TRIAL?.stop?.('auto_range_zero');
  W.KVPV_BOSS_HP_TRIAL?.stop?.('auto_range_zero');
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

  const read=f=>{try{return f()??null;}catch{return null;}},prop=(o,k)=>read(()=>o?.property?.get?.(k)),identity=o=>String(prop(o,'id')??o?.id??'');
  let running=true,timer=null,patch=null,lastTarget=null,reason='waiting_selected_boss',error='',applied=0,lastRestore=null;
  function restore(){if(!patch)return;const p=patch;patch=null;try{if(p.cfg[3]===0){Object.defineProperty(p.cfg,'3',p.descriptor);lastRestore='restored';}else lastRestore='kept_external_change';}catch(e){error=String(e.message||e);lastRestore='restore_failed';}}
  function stop(why='manual_stop'){running=false;reason=why;if(timer!==null){W.clearInterval(timer);timer=null;}restore();return status();}
  function sync(){if(!running)return;try{
    if(String(model()?.actorId??'')!==actor){stop('actor_changed');return;}
    const me=W._C?._Ba?.instance?.getRole?.(Number(actor)),boss=me?.getComponent?.(W._d?._Yct?._Het)?.target,occ=Number(prop(boss,'occ')),bossId=identity(boss),table=W._ft?._tY?.ins;
    const hp=prop(boss,'hp'),scene=String(W._C?._Mn?._Cn?.currentID??'');
    const valid=!!bossId&&boss?.isValid!==false&&Number(prop(boss,'type'))===1&&[true,1].includes(read(()=>table?.isBoss?.(occ)))&&Array.isArray(hp)&&Number(hp[0])>0;
    if(!valid){restore();lastTarget=null;reason='waiting_selected_boss';return;}
    const cfg=read(()=>table.getCfgById(occ)),key=scene+'/'+bossId+'/'+occ;
    if(lastTarget?.key===key&&lastTarget.cfg===cfg){if(patch&&cfg[3]!==0){restore();reason='external_config_change_not_overwritten';}return;}
    restore();lastTarget={key,cfg};
    const descriptor=Array.isArray(cfg)?Object.getOwnPropertyDescriptor(cfg,'3'):null;
    if(!descriptor||!('value' in descriptor)||!descriptor.writable||!Number.isFinite(descriptor.value)||descriptor.value<=0){reason='config_unavailable_or_already_modified';return;}
    patch={cfg,descriptor,bossId,occ,scene};Object.defineProperty(cfg,'3',{...descriptor,value:0});applied++;reason='selected_boss_client_range_zero';error='';
  }catch(e){error=String(e.message||e);restore();reason='error';}}
  function status(){return {actor,running,field:'monster_res[3]',target:patch?{bossId:patch.bossId,occ:patch.occ,scene:patch.scene,originalValue:patch.descriptor.value,currentCachedValue:patch.cfg[3]}:null,applied,reason,lastRestore,lastError:error,pollMs:500,playerControl:'Known script combat and boost controllers stopped at installation; native skills left to game.',limits:'Client configuration only, not proven Boss attack range. Selected native Boss only. Previous config restored on target change/death/no target/stop. External changes preserved. Runs until stopped or page reload; reload requires rerunning this snippet. No HP writes or initiated attacks.'};}
  W.KVPV_BOSS_RANGE0_AUTO=Object.freeze({stop,status,sync,export:()=>JSON.stringify(status(),null,2)});
  sync();if(running)timer=W.setInterval(sync,500);
  console.info('[KVPV] Tự đặt monster_res[3]=0 cho Boss đang chọn. Dừng và hoàn tác: KVPV_BOSS_RANGE0_AUTO.stop().');
  return status();
})();
