(() => {
  'use strict';
  const W=window;
  W.KVPV_NETLOG?.stop?.();
  const actor=String(W.__KVPV_OWN_ACTOR_ID||W._Ba?._rJ?._O$?.ins?.actorId||'');
  if(!actor||typeof W.WebSocket!=='function')throw Error('Chọn đúng game-frame đã đăng nhập rồi chạy lại.');
  const key='KVPV_NETLOG_V1_'+actor,Native=W.WebSocket,proto=Native.prototype;
  const nativeSend=proto.send,nativeClose=proto.close,startedAt=Date.now();
  const sockets=new Map(),samples=[],events=[],listeners=[];
  let previous=null,lastIncident=null,storageError='',running=true,nextId=0,sent=0,received=0,sentBytes=0,receivedBytes=0,lastTick=startedAt,lastSave=0;
  try{const raw=W.localStorage.getItem(key);if(raw&&raw.length<250000)previous=JSON.parse(raw);}catch(e){storageError=String(e.message).slice(0,150);}
  let savedIncident=previous?.savedIncident??null;
  const safe=fn=>{try{return fn();}catch{return null;}};
  function snapshot(){
    const basic=safe(()=>W.KVPV_BASIC10?.status?.()),road=safe(()=>W.KVPV_ROAD_CADENCE?.status?.()??W.KVPV_ROAD_CADENCE?.report?.());
    const scene=Number(W._C?._Mn?._Cn?.currentID),kind=safe(()=>Number(W._ft?._po?.ins?.getCfgById?.(scene)?.[7]));
    return {scene:Number.isFinite(scene)?scene:null,sceneType:kind,roadTrial:kind===41,online:W.navigator?.onLine??null,hidden:W.document?.hidden??null,
      actorMatches:String(W._Ba?._rJ?._O$?.ins?.actorId||'')===actor,dead:W._Ba?._rJ?._O$?.ins?.isDead??null,
      combat:basic?{reason:basic.reason,attempts:basic.attempts,intervalMs:basic.intervalMs,combo:basic.combo,lastError:basic.lastError}:null,
      road:road?{enabled:road.enabled,combatMode:road.combatMode,minCastIntervalMs:road.minCastIntervalMs,clientSkillWaitMs:road.clientSkillWaitMs,casts:road.casts,matchedHits:road.matchedHits,lastError:road.lastError}:null};
  }
  function report(){return JSON.parse(JSON.stringify({version:1,actor,startedAt,at:Date.now(),running,storageError,
    coverage:'Sockets created after installation, or existing sockets first observed on send/close. No packet contents recorded.',
    interpretation:'1006 means abnormal closure with no close frame; it does not prove server kick, rate limit or a client bug. A browser offline/error signal or a local close request is evidence, not a complete server diagnosis.',
    lastIncident,savedIncident,samples,events,previousSession:previous}));}
  function persist(){try{W.localStorage.setItem(key,JSON.stringify({version:1,actor,startedAt,at:Date.now(),lastIncident,savedIncident,samples,events}));lastSave=Date.now();}catch(e){storageError=String(e.message).slice(0,150);}}
  function record(type,data={},incident=false){
    const item={at:Date.now(),type,...data,state:snapshot()};events.push(item);if(events.length>60)events.shift();
    if(incident){lastIncident=item;savedIncident={event:item,samples:samples.slice(),events:events.slice()};}persist();
  }
  const size=data=>typeof data==='string'?data.length:typeof data?.byteLength==='number'?data.byteLength:typeof data?.size==='number'?data.size:0;
  function attach(ws){
    if(sockets.has(ws))return sockets.get(ws);if(sockets.size>=16)return null;
    const state={id:++nextId,lastReceive:null,lastSend:null,localClose:null,handlers:[]};sockets.set(ws,state);
    const on=(name,fn)=>{ws.addEventListener(name,fn);state.handlers.push([name,fn]);};
    on('open',()=>record('socket_open',{socket:state.id}));
    on('message',e=>{received++;receivedBytes+=size(e.data);state.lastReceive=Date.now();});
    on('error',()=>record('socket_error',{socket:state.id},true));
    on('close',e=>{record('socket_close',{socket:state.id,code:e.code,reason:String(e.reason||'').slice(0,200),wasClean:e.wasClean,
      localClose:state.localClose,lastSendAgoMs:state.lastSend===null?null:Date.now()-state.lastSend,lastReceiveAgoMs:state.lastReceive===null?null:Date.now()-state.lastReceive},true);
      for(const [name,fn]of state.handlers)ws.removeEventListener(name,fn);sockets.delete(ws);});
    record('socket_observed',{socket:state.id,readyState:ws.readyState});return state;
  }
  function send(...args){const state=safe(()=>attach(this));let result;
    try{result=nativeSend.apply(this,args);}catch(e){safe(()=>record('send_error',{socket:state?.id??null,name:String(e.name),message:String(e.message).slice(0,200)},true));throw e;}
    sent++;sentBytes+=size(args[0]);if(state)state.lastSend=Date.now();return result;
  }
  function close(...args){const state=safe(()=>attach(this));if(state)state.localClose={at:Date.now(),code:args[0]??null};
    safe(()=>record('local_close_request',{socket:state?.id??null,code:args[0]??null}));return nativeClose.apply(this,args);}
  const Wrapped=new Proxy(Native,{construct(target,args,newTarget){const ws=Reflect.construct(target,args,newTarget);safe(()=>attach(ws));return ws;}});
  function listen(target,name,fn){if(target?.addEventListener){target.addEventListener(name,fn);listeners.push([target,name,fn]);}}
  function tick(){const now=Date.now();samples.push({at:now,windowMs:now-lastTick,eventLoopDelayMs:Math.max(0,now-lastTick-1000),
    sent,received,sentUnits:sentBytes,receivedUnits:receivedBytes,unitNote:'Binary bytes; strings use UTF-16 length.',
    sockets:[...sockets.entries()].map(([ws,s])=>({id:s.id,readyState:ws.readyState,bufferedAmount:ws.bufferedAmount,lastReceiveAgoMs:s.lastReceive===null?null:now-s.lastReceive})),state:snapshot()});
    if(samples.length>120)samples.shift();sent=received=sentBytes=receivedBytes=0;lastTick=now;if(now-lastSave>=5000)persist();}
  let timer=null;
  function stop(){if(!running)return;running=false;if(timer!==null)W.clearInterval(timer);
    if(proto.send===send)proto.send=nativeSend;if(proto.close===close)proto.close=nativeClose;if(W.WebSocket===Wrapped)W.WebSocket=Native;
    for(const [target,name,fn]of listeners)target.removeEventListener(name,fn);
    for(const [ws,state]of sockets)for(const [name,fn]of state.handlers)ws.removeEventListener(name,fn);sockets.clear();persist();}
  try{
    proto.send=send;proto.close=close;W.WebSocket=Wrapped;
    if(proto.send!==send||proto.close!==close||W.WebSocket!==Wrapped)throw Error('Không cài được bộ theo dõi WebSocket.');
    listen(W,'offline',()=>record('browser_offline',{},true));listen(W,'online',()=>record('browser_online'));
    listen(W,'error',e=>record('javascript_error',{message:String(e.message||'Resource error').slice(0,250),line:e.lineno??null}));
    listen(W,'unhandledrejection',e=>record('unhandled_rejection',{message:String(e.reason?.message||e.reason||'Unknown').slice(0,250)}));
    listen(W,'pagehide',()=>record('pagehide'));listen(W.document,'visibilitychange',()=>record('visibility_change'));
    timer=W.setInterval(()=>safe(tick),1000);
    W.KVPV_NETLOG=Object.freeze({report,stop,save:persist,export:()=>JSON.stringify(report(),null,2)});
    record('installed');W.console.info('[NETLOG] Đang ghi. Đọc: KVPV_NETLOG.report(); sao chép: copy(KVPV_NETLOG.export())');
  }catch(e){stop();throw e;}
})();
