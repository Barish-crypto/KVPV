(() => {
 'use strict';
 const W=window,NS=W.KVPV||(W.KVPV={}),actor=String(W.__KVPV_OWN_ACTOR_ID||'');
 const old=W.KVPV_TIEN_TON_AUTO,carry=old?._handoff?.();old?.stop?.(true);if(NS.tienTon!==old)NS.tienTon?.stop?.();
 if(!actor||String(W._Ba?._rJ?._O$?.ins?.actorId??'')!==actor)return;
 const same=carry?.actor===actor,C={enabled:same?carry.enabled:true,pollMs:1000,windowStart:1170,windowEnd:1185};
 const S={timer:null,reason:'waiting_window',lastError:'',ownedAuto:same?carry.ownedAuto:false,openKey:same?carry.openKey:null,enableKey:same?carry.enableKey:null,refreshDay:same?carry.refreshDay:null,panelOpens:same?carry.panelOpens:0,autoEnables:same?carry.autoEnables:0,history:same?carry.history.slice(-30):[]};
 const model=()=>W._Ba?._Xit?._nst?.inst,rpc=()=>W._Ba?._Xit?._hst?.inst,manager=()=>W._ft?._Y4n?.ins;
 const owned=()=>!W.__KVPV_UNIVERSAL_HALTED&&String(W._Ba?._rJ?._O$?.ins?.actorId??'')===actor;
 const formatter=new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Ho_Chi_Minh',hourCycle:'h23',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit'});
 function clock(){const p=Object.fromEntries(formatter.formatToParts(new Date()).map(x=>[x.type,x.value]));return {day:p.year+'-'+p.month+'-'+p.day,minute:Number(p.hour)*60+Number(p.minute)};}
 function data(){const c=clock(),m=model(),score=m?.ttiScore,event=W._Ba?._sst?._ist?.inst?.getCpSceneStateByType?.(16),map=Number(W._C?._Mn?._Cn?.currentID??W._Ba?._$a?._yo?.ins?.intoSce?.[0]);return {day:c.day,withinHours:c.minute>=C.windowStart&&c.minute<C.windowEnd,open:Number(event?.[2])===2,rest:Array.isArray(score)&&Number.isFinite(Number(score[3]))?Number(score[3]):null,participated:Number(m?.times?.[0])||0,autoNative:m?.atMatch===true,map,arena:map===2171||W._Ba?._$a?._yo?.ins?.isInArena===true,matching:Number(W._Ba?._cm?._vJ?.ins?.matState),common:W._Ba?._$a?.SceneUtil?.isCommonScene===true};}
 function note(kind){S.history.push({at:Date.now(),kind});if(S.history.length>40)S.history.shift();}
 function disableAuto(){if(S.ownedAuto&&owned()&&model()?.atMatch===true){model().atMatch=false;note('native_auto_disabled');}S.ownedAuto=false;}
 function tick(){if(!C.enabled)return;try{
  if(!owned()){S.reason='actor_changed';return;}
  const d=data(),daily=W.KVPV_DAILY,q=daily?.quickState?.();
  if(daily?.config?.enableTienTonAuto===false||q?.running===false||NS.events?.config?.enabled===false){disableAuto();S.reason='daily_or_event_disabled';return;}
  if(!d.withinHours){disableAuto();S.reason='outside_1930_1945';return;}
  if(!d.open){disableAuto();S.reason='waiting_server_open';return;}
  if(S.refreshDay!==d.day&&typeof rpc()?.getTti==='function'){S.refreshDay=d.day;rpc().getTti();note('native_info_requested');return;}
  if(d.rest===null){S.reason='waiting_server_attempts';return;}
  if(d.rest<=0){disableAuto();S.reason='attempts_exhausted';return;}
  if(d.arena){S.reason='native_fight_in_progress';return;}
  if(d.matching===0||d.matching===1){S.reason='native_matching_in_progress';return;}
  if(!d.common){S.reason='waiting_common_map';return;}
  if(q?.job&&!['rảnh','ranh','idle'].includes(String(q.job))){S.reason='waiting_daily_job';return;}
  if(W.KVPV_HITRUN1?.status?.(false)?.running===true){S.reason='waiting_current_combat';return;}
  if(Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)){S.reason='waiting_user_ui';return;}
  const reserve=NS.timeline?.reservation?.({atMs:Date.now(),flags:daily?.config||{},excludeKeys:['tien_ton'],forTask:'long'});
  if(reserve&&!(reserve.key==='vinh_du'&&reserve.phase==='upcoming')){S.reason='reserved_'+reserve.key;return;}
  const entry=W._Ba?._sst?._Cht?.inst;if(typeof entry?.checkEnterScene!=='function'||!entry.checkEnterScene(2171)){S.reason='native_entry_denied';return;}
  const key=d.day+'/'+d.rest+'/'+d.participated,p=manager();
  let panel=p?.getPanelById?.(203)??p?.getDialogById?.(203);
  const visible=p?.isOpened?.(203)===true;
  if(!visible){
   if(S.openKey===key){S.reason='waiting_native_panel_or_result';return;}
   if(typeof p?.open!=='function'){S.reason='panel_manager_unavailable';return;}
   const gate=NS.core?.scene;if(gate?.acquire&&gate.acquire('daily','tien-ton-native-auto')!==true){S.reason='scene_lease_denied';return;}
   S.openKey=key;S.panelOpens++;note('open_panel_203');
   try{p.open(203);}finally{gate?.release?.('daily');}
   S.reason='opening_panel_203';return;
  }
  if(model()?.atMatch===true){S.reason='native_auto_running';return;}
  if(S.enableKey===key){S.reason='auto_stopped_or_pending_same_progress';return;}
  if(typeof panel?._U4i!=='function'||typeof panel?._n_i!=='function'||!panel.autoBtn){S.reason='waiting_native_auto_button';return;}
  if(panel._n_i()!==true){S.reason='native_auto_condition_denied';return;}
  S.enableKey=key;S.ownedAuto=true;panel._U4i();
  if(model()?.atMatch===true){S.autoEnables++;S.reason='native_auto_enabled';note('native_auto_button_activated');}else{S.ownedAuto=false;S.reason='native_auto_not_enabled';}
 }catch(e){S.lastError=String(e.message||e).slice(0,300);S.reason='error';}}
 function status(){let d=null;try{d=data();}catch(_){}return {version:'1.0.0',actor,enabled:C.enabled,timerActive:S.timer!==null,reason:S.reason,lastError:S.lastError,ownedAuto:S.ownedAuto,challengeLeft:d?.rest??null,autoNative:d?.autoNative??false,withinHours:d?.withinHours??false,serverOpen:d?.open??false,map:d?.map??null,panelOpens:S.panelOpens,autoEnables:S.autoEnables,panelId:203,mapId:2171,allowPurchase:false};}
 function stop(preserveNative=false){C.enabled=false;if(S.timer!==null){(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;}if(!preserveNative)disableAuto();S.reason=preserveNative?'reloading':'stopped';return status();}
 function start(){C.enabled=true;if(S.timer===null)S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,C.pollMs);tick();return status();}
 const api=Object.freeze({version:'1.0.0',config:C,start,stop,tick,status,history:()=>S.history.map(x=>({...x})),_handoff:()=>({actor,enabled:C.enabled,ownedAuto:S.ownedAuto,openKey:S.openKey,enableKey:S.enableKey,refreshDay:S.refreshDay,panelOpens:S.panelOpens,autoEnables:S.autoEnables,history:S.history.slice()})});
 W.KVPV_TIEN_TON_AUTO=api;NS.tienTon=api;if(C.enabled)start();
})();
