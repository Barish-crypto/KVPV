/* Tiên Duyên Đại Chiến: native 20-box stage, main 8001 boss combat, clone chest-first. */
(()=>{'use strict';
 const W=window,K=W.KVPV||(W.KVPV={}),old=W.KVPV_TIEN_DUYEN_DAI_CHIEN;
 try{old?.stop?.('reload');}catch(_){}
 const MAIN='10228867268946',CLONE='10228867268941',BOSS=2812,STAGES=[2811,2813];
 const actor=String(W.__KVPV_OWN_ACTOR_ID||''),S={enabled:false,timer:null,reason:'waiting_event',filtered:0,skillCalls:0,error:''};
 const G={selector:null,combat:null};
 const owned=()=>!!actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;
 const role=()=>actor===MAIN?'main':actor===CLONE?'clone':'none';
 const map=()=>Number(W._Ba?._$a?._yo?.ins?.intoSce?.[0]??W._C?._Mn?._Cn?.currentID);
 const inEvent=()=>[...STAGES,BOSS].includes(map());
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
  const battle=K.marryBattle;
  if(!battle||battle.version!=='11.8.0'){S.reason='native_battle_module_unavailable';return;}
  battle.config.mainId=MAIN;battle.config.cloneId=CLONE;
  if(eventOpen()||inEvent()){
   if(battle.status?.().enabled!==true)battle.start();
   S.reason=map()===BOSS?(role()==='main'?'main_boss_8001':'clone_boss_chest_priority'):'native_20_box_stage';
  }else{
   if(battle.status?.().enabled===true)battle.stop();
   S.reason='waiting_tien_duyen_tac_chien_window';
  }
  installMain8001();
 }
 function tick(){try{reconcile();}catch(e){S.error=String(e?.message??e);S.reason='error';}}
 function start(){S.enabled=true;if(S.timer===null)S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,250);tick();return status();}
 function stop(reason='manual'){S.enabled=false;if(S.timer!==null){(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;}releaseHooks();if(K.marryBattle?.status?.().enabled===true)K.marryBattle.stop();S.reason=reason;return status();}
 function status(){return {enabled:S.enabled,actor,role:role(),map:map(),eventOpen:eventOpen(),reason:S.reason,mainSkill:role()==='main'&&map()===BOSS?8001:null,filtered:S.filtered,skillCalls:S.skillCalls,battle:K.marryBattle?.status?.()??null,error:S.error};}
 W.KVPV_TIEN_DUYEN_DAI_CHIEN=Object.freeze({start,stop,tick,status});
 if(owned()&&role()!=='none')start();
})();