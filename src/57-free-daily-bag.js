
/* Daily zero-price Phuc Menh/Tuyet shop gift; never opens or consumes the bag. */

(() => {

 'use strict';const W=window,old=W.KVPV_FREE_DAILY_BAG,c=old?._handoff?.();old?.stop?.();

 const actor=String(W.__KVPV_OWN_ACTOR_ID||''),same=c?.actor===actor;

 const S={enabled:true,timer:null,pending:same?c.pending:null,confirmed:same?c.confirmed:0,reason:'waiting',error:'',matches:[]};

 const shop=()=>W._Ba?._Iwt?._Dwt?.instance,cfg=()=>W._ft?._AY?.ins;

 const own=()=>actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;

 let targetIds=null;

 const norm=s=>String(s??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();

 function candidates(){const out=[],table=cfg()?._PY;

  if(!table)return out;

  if(targetIds===null){const rows=Object.values(table).slice(0,20000);if(!rows.length)return out;

   targetIds=rows.filter(r=>{if(!Array.isArray(r))return false;const n=norm(W._ft?._mY?.ins?.getItemCfgById?.(r[1])?.[1]);return /tui\s*phuc\s*m[ae]nh/.test(n)&&n.includes('tuyet');}).map(r=>r[0]);}

  for(const id of targetIds){const r=table[id];

  if(!Array.isArray(r)||!Number.isSafeInteger(r[0])||!Number.isSafeInteger(r[1])||!Array.isArray(r[8])||r[8][1]!==0||r[9]?.[0]!==1||r[9]?.[1]!==1)continue;

  const name=W._ft?._mY?.ins?.getItemCfgById?.(r[1])?.[1],n=norm(name);

  if(!/tui\s*phuc\s*m[ae]nh/.test(n)||!n.includes('tuyet'))continue;

  if(!(cfg()?.getCfgs?.(r[3],r[5])??[]).some(x=>x[0]===r[0]))continue;

  if(Number(r[16])>0&&W._Ba?._IY?._BY?.ins?.getActIsOpen?.(r[16])!==true)continue;

  const used=shop()?.getCurBuyNum?.(r[0]),svip=W._Ba?._ke?._Le?.instance?.curSvipLv;

  if(!Number.isSafeInteger(used)||used<0||used>=1||!Number.isFinite(svip)||!Number.isFinite(r[10])||svip<r[10])continue;

  const required=Number(r[24]??0),rise=W._Ba?._$qt?._tKt?.ins?.curLV;

  if(required>0&&(!Number.isFinite(rise)||rise<required))continue;

  out.push({id:r[0],itemId:r[1],name,used,price:0});

 }return out;}

 function sync(){try{if(!S.enabled||!own())return;

  if(S.pending){const count=shop()?.getCurBuyNum?.(S.pending.id);if(Number.isSafeInteger(count)&&count>S.pending.used){S.confirmed++;S.pending=null;}

   else {S.reason=Date.now()-S.pending.at>10000?'waiting_ack_no_retry':'waiting_server';return;}}

  S.matches=candidates();

  if(!S.matches.length){S.reason='no_verified_free_bag';return;}

  if(W._Ba?._$a?.SceneUtil?.isCommonScene!==true||W._Ba?._$a?._yo?.ins?.isInMission!==false||W._Ba?._rJ?._O$?.ins?.isDead!==false||

    Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)||W.KVPV?.core?.scene?.status?.()?.owner||W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true){S.reason='waiting_idle';return;}

  if(W.KVPV_FREE_TREASURE?.busy?.()){S.reason='waiting_free_treasure';return;}

  const q=candidates()[0],rpc=W._Ba?._Iwt?._rLt?.instance;

  if(!q||typeof rpc?._uLt!=='function'){S.reason='waiting_native_api';return;}

  S.pending={id:q.id,itemId:q.itemId,used:q.used,at:Date.now()};S.reason='sent_free_bag';rpc._uLt(q.id,1);

 }catch(e){S.error=String(e?.message||e);S.reason='error_no_retry';}}

 function stop(){S.enabled=false;if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;}

 W.KVPV_FREE_DAILY_BAG=Object.freeze({sync,stop,status:()=>({enabled:S.enabled,reason:S.reason,pending:S.pending?{...S.pending}:null,confirmed:S.confirmed,matches:S.matches.map(x=>({...x})),lastError:S.error,allowKNB:false}),

  _handoff:()=>({actor,pending:S.pending,confirmed:S.confirmed})});

 S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(sync,1000);sync();

})();

