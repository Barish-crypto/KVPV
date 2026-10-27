(() => {
  'use strict';
  const W=window,expected='10228867268946',model=()=>W._Ba?._rJ?._O$?.ins;
  if(String(model()?.actorId??'')!==expected)throw Error('Chọn game-frame acc chính 10228867268946.');
  const Comp=W._d?._Yct?._Het,world=W._C?._Ba?.instance,me=world?.getRole?.(Number(expected))??world?.getRole?.(expected);
  const read=fn=>{try{return fn()??null;}catch{return null;}},prop=(o,k)=>read(()=>o?.property?.get?.(k)),identity=o=>String(prop(o,'id')??o?.id??'');
  const boss=read(()=>me?.getComponent?.(Comp)?.target),bossId=identity(boss),occ=Number(prop(boss,'occ'));
  if(!me||!bossId||boss.isValid===false||Number(prop(boss,'type'))!==1||![true,1].includes(read(()=>W._ft?._tY?.ins?.isBoss?.(occ))))throw Error('Chọn Boss native đang đánh trước.');
  if(![me,boss,me.property].every(o=>typeof o?.on==='function'&&typeof o?.off==='function'))throw Error('Thiếu API sự kiện native.');
  W.KVPV_1008_OBSERVER?.stop?.('replaced');
  const pack=(v,d=0)=>{if(v===null||['number','string','boolean'].includes(typeof v))return v;if(d>4)return null;return Array.isArray(v)?v.slice(0,96).map(x=>pack(x,d+1)):null;};
  const clone=v=>JSON.parse(JSON.stringify(v));
  const scene=()=>String(W._C?._Mn?._Cn?.currentID??W._Ba?._$a?._yo?.ins?.intoSce?.[0]??'');
  const owner={},events=[],castTimes=[],startedAt=Date.now(),map=scene(),bossName=String(prop(boss,'name')??''),subscriptions=[];
  let running=true,reason='observing',dropped=0,lastSnapshot=null;
  function stop(why='manual_stop'){if(!running)return;running=false;reason=why;for(const [o,e,f]of subscriptions)read(()=>o.off(e,owner,f));}
  function valid(){if(!running)return false;if(String(model()?.actorId??'')!==expected||scene()!==map||boss.isValid===false||identity(boss)!==bossId||me.getComponent?.(Comp)?.target!==boss){stop('actor_boss_or_map_changed');return false;}if(Date.now()-startedAt>=180000){stop('observation_window_ended');return false;}return true;}
  function snapshot(){
    const totals=read(()=>model()?.playerTotolAttrs),ids=[1,2,3,4,5,6,7,8,9,10,13,15,16,18,21,161,162,167];
    return {attributes:ids.map(id=>[id,pack(Array.isArray(totals)?totals.find(r=>Number(r?.[0])===id)?.[1]??null:null)]),buffs:pack(prop(me,'buffs'))};
  }
  function add(type,data){events.push({at:Date.now(),type,...data});if(events.length>250){events.shift();dropped++;}}
  function sample(trigger){const s=snapshot();if(lastSnapshot&&JSON.stringify(lastSnapshot)!==JSON.stringify(s))add('attribute_or_buff_snapshot_changed',{trigger,before:lastSnapshot,after:s});lastSnapshot=s;return s;}
  function cast(targetId,skillId){try{if(!valid())return;const id=Number(skillId);if(id<1001||id>1008)return;const s=sample('cast');add('native_player_cast_signal',{skillId:id,targetId:String(targetId),snapshot:s});if(id===1008){castTimes.push(Date.now());if(castTimes.length>16)castTimes.shift();}}catch(e){add('observer_error',{message:String(e.message||e)});}}
  function hit(source,marker,damage,flags,receiver){try{if(!valid()||String(source)!==expected||String(receiver)!==bossId)return;const numeric=Number(damage),m=Number(marker),f=Number(flags);if(!Number.isFinite(numeric)||numeric<=0)return;const now=Date.now(),latest=castTimes.at(-1),s=sample('damage');add('native_damage_event',{source:String(source),receiver:String(receiver),marker:m,skillFromMarker:m/10000,damage:numeric,flags:f,critFlag:!!(f&2),sinceLatest1008Ms:latest==null?null:now-latest,snapshot:s,attribution:'Raw event; time proximity to 1008 does not prove it caused this damage.'});}catch(e){add('observer_error',{message:String(e.message||e)});}}
  function buffs(){try{if(valid())add('native_buff_property_event',{snapshot:sample('buff_event')});}catch(e){add('observer_error',{message:String(e.message||e)});}}
  function subscribe(o,e,f){o.on(e,owner,f);subscriptions.push([o,e,f]);}
  const config=read(()=>W.KVPV_TH300?.skill1008Info?.(false));
  lastSnapshot=snapshot();add('initial',{snapshot:lastSnapshot});
  try{subscribe(me,1039,cast);subscribe(boss,1012,hit);subscribe(me.property,'buffs',buffs);}catch(e){stop('subscription_failed');throw e;}
  function report(){if(running&&valid())sample('manual_report');return clone({version:1,actor:expected,bossId,occ,bossName,scene:map,startedAt,at:Date.now(),running,reason,dropped,config,events,limits:'Passive existing native events only. No attacks, moves, cooldown edits, timers or method wrappers. Records at most 250 events. 180s expiry is checked on events/report, not by a timer. Attribute snapshots are sampled on casts, damage, buff events and report; not every server attribute update. Events close to 1008 and changed buffs are correlation only. Raw 1012 may include distinct supplemental events; do not assume they are all direct hits or independent.'});}
  W.KVPV_1008_OBSERVER=Object.freeze({report,export:()=>JSON.stringify(report(),null,2),stop});
  console.info('[KVPV] Đang ghi damage gốc, buff và thuộc tính. Đánh bình thường 30–60 giây rồi copy(KVPV_1008_OBSERVER.export()).');
})();
