/* Vận Chuyển Pha Lê: read-only native state observer and event preparation.
 * No guessed entry, pickup, movement or delivery requests.
 */
(() => {
  'use strict';
  const W=window,KEY='KVPV_CRYSTAL_TRANSPORT',previous=W[KEY];
  previous?.stop?.();
  const actor=String(W.__KVPV_OWN_ACTOR_ID||'');
  const S={timer:null,reason:'waiting_event',last:null,observed:0,error:''};
  const norm=v=>String(v??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[đĐ]/g,'d').toLowerCase();
  const own=()=>!!actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;
  const pickEvent=()=>{
    const c=W.KVPV_DAILY?.lichData?.();
    const events=[...(Array.isArray(c?.active)?c.active:[]),...(Array.isArray(c?.upcoming)?c.upcoming:[])];
    return events.find(e=>/van chuyen pha le|pha le/.test(norm(e?.name))||/crystal|pha_le|pha-le/.test(String(e?.key??'')))??null;
  };
  function snapshot(){
    const model=W._Ba?._n4t?._t4t?.ins;
    const e=pickEvent();
    return {actor,owned:own(),event:e?{key:e.key??null,name:e.name??null,time:e.time??null,action:e.action??null}:null,
      map:Number(W._Ba?._$a?._yo?.ins?.intoSce?.[0])||null,
      commonScene:W._Ba?._$a?.SceneUtil?.isCommonScene===true,
      nativeModelPresent:!!model,
      nativeState:model?{remainTimes:model.remainTimes??null,curType:model.curType??null,curWave:model.curWave??null}:null,
      capture:W.KVPV_CRYSTAL_CAPTURE?.status?.()?.records?.slice?.(-8)??[],
      automaticTransportReady:false};
  }
  function sync(){
    if(!own()){S.reason='actor_changed_or_inactive';return;}
    try{S.last=snapshot();S.observed++;
      S.reason=S.last.event?'event_observed_waiting_native_transport_flow':'waiting_event';
    }catch(e){S.error=String(e);S.reason='inspection_error';}
  }
  function stop(){if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)?.(S.timer);
    S.timer=null;S.reason='stopped';}
  function start(){if(!own())return status();
    if(S.timer===null)S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(sync,2000);
    sync();return status();}
  function status(){return {...(S.last??snapshot()),running:S.timer!==null,observations:S.observed,reason:S.reason,error:S.error,
    note:'Read-only preparation. Pickup and delivery APIs are unverified; default native movement speed is unchanged.'};}
  W[KEY]=Object.freeze({start,stop,sync,status});
  if(own())start();
})();
