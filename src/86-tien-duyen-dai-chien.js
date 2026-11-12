 
(()=>{'use strict';
 const W=window,K=W.KVPV||(W.KVPV={}),old=W.KVPV_TIEN_DUYEN_DAI_CHIEN;
 try{old?.stop?.('reload');}catch(_){}
 const MAIN='10228867268946',CLONE='10228867268941',BOSS=2812,STAGES=[2811,2813];
 const actor=String(W.__KVPV_OWN_ACTOR_ID||''),S={enabled:false,timer:null,reason:'waiting_event',filtered:0,skillCalls:0,error:'',entryPending:false,entryAt:0,entryMap:0,entrySent:0,entryConfirmed:0};
 const G={selector:null,combat:null};
 const owned=()=>!!actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;
 const role=()=>actor===MAIN?'main':actor===CLONE?'clone':'none';
 const map=()=>Number(W._Ba?._$a?._yo?.ins?.intoSce?.[0]??W._C?._Mn?._Cn?.currentID);
 const inEvent=()=>[...STAGES,BOSS].includes(map());
 const common=()=>{try{return W._Ba?._$a?.SceneUtil?.isCommonSceneByType?.(W._Ba?._$a?.SceneUtil?.curScene)===true;}catch(_){return W._Ba?._$a?.SceneUtil?.isCommonScene===true;}};
 const hasTeam=()=>!!W._Ba?._cm?._q3t?.ins?.getHasTeams?.();
 const married=()=>W._Ba?._Yo?._tdt?.instance?.isMarry?.()===true;
 const entryRpc=()=>W._Ba?._sst?._Cht?.inst;
 function enterEvent(){
  if(!eventOpen()||inEvent()){S.reason=inEvent()?'event_scene_confirmed':'waiting_tien_duyen_tac_chien_window';return false;}
  if(S.entryPending){
   if(inEvent()){S.entryPending=false;S.entryConfirmed++;return true;}
   if(Date.now()-S.entryAt<30000){S.reason='waiting_event_entry_ack';return false;}
   S.reason='event_entry_sent_waiting_ack';return false;
  }
  if(!common()){S.reason='waiting_common_scene';return false;}
  if(hasTeam()){S.reason='leave_team_before_event_entry';return false;}
  if(!married()){S.reason='need_marry_unlock_859';return false;}
  if(W._rka?.inst?.getFcIsOpen?.(859)!==true){S.reason='event_feature_859_closed';return false;}
  const rpc=entryRpc();if(typeof rpc?.rqEtScene!=='function'){S.reason='native_entry_rpc_unavailable';return false;}
  const target=W._Ba?._B_?._I_t?.ins?.getIsCrossGlobal?.()===true?2813:2811;
  S.entryPending=true;S.entryAt=Date.now();S.entryMap=target;S.entrySent++;
  try{const ok=rpc.rqEtScene(target);if(ok===false){S.entryPending=false;S.reason='event_entry_rejected_locally';return false;}}
  catch(e){S.entryPending=false;throw e;}
  S.reason='event_entry_requested';return false;
 }
 function eventOpen(){try{return W.KVPV_DAILY?.lichData?.()?.active?.some(e=>e?.key==='tien_duyen_tac_chien')===true;}catch(_){return false;}}
 const component=(key)=>{const r=W._C?._Ba?.instance?.getRole?.(Number(actor)),id=W._d?._Yct?.[key];return id?r?.getComponent?.(id):null;};
 function restore(h){if(!h?.obj||h.obj[h.key]!==h.wrapper)return;try{if(h.descriptor)Object.defineProperty(h.obj,h.key,h.descriptor);else delete h.obj[h.key];}catch(e){S.error=String(e?.message??e);}}
 function releaseHooks(){restore(G.selector);restore(G.combat);G.selector=G.combat=null;}
 function hook(slot,obj,key,factory){
  if(!obj||typeof obj[key]!=='function')return null;
  const prior=G[slot];if(prior?.obj===obj&&obj[key]===prior.wrapper)return prior;
  restore(prior);G[slot]=null;
  const descriptor=Object.getOwnPropertyDescriptor(obj,key),native=obj[key],wrapper=factory(native);
  try{Object.defineProperty(obj,key,{configurable:descriptor?.configurable??true,writable:descriptor?.writable??true,enumerable:descriptor?.enumerable??false,value:wrapper});return G[slot]={obj,key,wrapper,descriptor};}
  catch(e){S.error=String(e?.message??e);return null;}
 }
 function mainBoss(){return S.enabled&&owned()&&role()==='main'&&map()===BOSS;}
 function installMain8001(){
  if(!mainBoss()){releaseHooks();return;}
  const selector=component('_Eet'),combat=component('_Het');
  hook('selector',selector,'_f7t',native=>function(active,common,mode,...rest){
   if(!mainBoss())return native.call(this,active,common,mode,...rest);
   if(mode!==1){S.filtered++;return -1;}
   const a=Array.isArray(active)?active.filter(r=>Number(r?.[0])===8001):[];
   const c=Array.isArray(common)?common.filter(r=>Number(r?.[0])===8001):[];
   if(!a.length&&!c.length){S.filtered++;return -1;}
   const picked=Number(native.call(this,a,c,mode,...rest));
   if(picked!==8001){S.filtered++;return -1;}
   S.skillCalls++;return 8001;
  });
  hook('combat',combat,'combat',native=>function(skill,...args){
   if(mainBoss()&&Number(skill)!==8001){S.filtered++;return;}
   if(mainBoss())S.skillCalls++;
   return native.call(this,skill,...args);
  });
 }
 function reconcile(){
  if(!owned()){releaseHooks();K.marryBattle?.stop?.();S.reason='actor_changed_or_halted';return;}
  if(role()==='none'){releaseHooks();K.marryBattle?.stop?.();S.reason='account_not_assigned';return;}
  if(eventOpen()&&!inEvent()){enterEvent();installMain8001();return;}
  if(inEvent()){
   const battle=K.marryBattle;
   if(!battle||battle.version!=='11.8.0'){S.reason='native_battle_module_unavailable';return;}
   battle.config.mainId=MAIN;battle.config.cloneId=CLONE;
   if(S.entryPending){S.entryPending=false;S.entryConfirmed++;}
   if(battle.status?.().enabled!==true)battle.start();
   S.reason=map()===BOSS?(role()==='main'?'main_boss_8001':'clone_boss_chest_priority'):'native_20_box_stage';
  }else{
   const battle=K.marryBattle;
   if(battle?.status?.().enabled===true)battle.stop();
   S.reason='waiting_tien_duyen_tac_chien_window';
  }
  installMain8001();
 }
 function tick(){try{reconcile();}catch(e){S.error=String(e?.message??e);S.reason='error';}}
 function start(){S.enabled=true;if(S.timer===null)S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,250);tick();return status();}
 function stop(reason='manual'){S.enabled=false;if(S.timer!==null){(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;}releaseHooks();if(K.marryBattle?.status?.().enabled===true)K.marryBattle.stop();S.reason=reason;return status();}
 function status(){return {enabled:S.enabled,actor,role:role(),map:map(),eventOpen:eventOpen(),reason:S.reason,entry:{pending:S.entryPending,target:S.entryMap,sent:S.entrySent,confirmed:S.entryConfirmed},mainSkill:role()==='main'&&map()===BOSS?8001:null,filtered:S.filtered,skillCalls:S.skillCalls,battle:K.marryBattle?.status?.()??null,error:S.error};}
 W.KVPV_TIEN_DUYEN_DAI_CHIEN=Object.freeze({start,stop,tick,status});
 if(owned()&&role()!=='none')start();
})();
