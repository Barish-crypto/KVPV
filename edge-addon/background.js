
 

importScripts('core.js','input-click.js');

const diagnosticsSent=new Map(),heartbeatSent=new Map();

const tabs=new Map(),desiredTabs=new Set(),core=self.KVPV_EDGE_CORE;

let desktopControls=[],partyPeers=[],port=null,payload=null,transfer=null,profilesReady=false,nativeState='Chưa kết nối bộ theo dõi',queue=Promise.resolve(),busy=false,pumpAgain=false,reconnectTimer=null,reconnectDelay=1000,stableConnectionTimer=null;
let restoreTimer=null,restorePromise=null;
const desiredTabsReady=chrome.storage.session.get('kvpvDesiredTabs').then(({kvpvDesiredTabs})=>{
  if(Array.isArray(kvpvDesiredTabs))for(const tabId of kvpvDesiredTabs)if(Number.isInteger(tabId)&&tabId>=0)desiredTabs.add(tabId);
});

class Adapter{

  constructor(tabId,targetId,url){this.tabId=tabId;this.targetId=targetId;this.url=url;this.listeners=[];this.children=new Map();}

  on(event,fn){if(event==='event')this.listeners.push(fn);}

  emit(event){for(const fn of this.listeners)fn(event);}

  async send(method,params={},sessionId='root'){

    const source={tabId:this.tabId,...(sessionId!=='root'?{sessionId}:{})};

    if(method==='Target.getTargets')return {targetInfos:[{type:'page',targetId:this.targetId,url:this.url},...Array.from(this.children.values(),c=>c.info)]};

    if(method==='Target.attachToTarget'&&params.targetId===this.targetId)return {sessionId:'root'};

    if(method==='Target.attachToTarget'){const child=this.children.get(params.targetId);if(child)return {sessionId:child.sessionId};throw Error('Frame chưa auto-attach');}

    try{return await chrome.debugger.sendCommand(source,method,params);}catch(e){throw Error(method+': '+e.message);}

  }

}

function report(tab){return {nativeState,build:payload?.build||null,attached:!!tab,reason:tab?.reason||'Chưa gắn vào tab này',history:tab?.history.slice(-4)||[],inputClick:tab?.input?.status?.()??{enabled:false}};}

async function persistDesiredTabs(){

  await desiredTabsReady;
  await chrome.storage.session.set({kvpvDesiredTabs:[...desiredTabs]});

}

function scheduleDesiredTabRestore(delay=1000){

  if(restoreTimer!==null)return;
  restoreTimer=setTimeout(()=>{restoreTimer=null;void restoreDesiredTabs().catch(e=>{nativeState='Lỗi tự kết nối lại: '+String(e.message||e);});},delay);

}

async function restoreDesiredTabs(){

  if(restorePromise)return restorePromise;
  restorePromise=(async()=>{
    await desiredTabsReady;
    const results=await Promise.allSettled([...desiredTabs].map(async tabId=>{
      let tab;
      try{tab=await chrome.tabs.get(tabId);}catch(_){desiredTabs.delete(tabId);return;}
      if(!core.gameURL(tab.url)){desiredTabs.delete(tabId);return;}
      if(!tabs.has(tabId))await attach(tabId);
      else connect();
    }));
    for(const result of results)if(result.status==='rejected')console.warn('Auto-attach tab failed: '+String(result.reason?.message||result.reason));
    await persistDesiredTabs();
    if(tabs.size){connect();if(payload&&profilesReady)void pump();}
  })();
  try{await restorePromise;}finally{restorePromise=null;}

}

async function attach(tabId){

  await desiredTabsReady;
  const tab=await chrome.tabs.get(tabId);if(!core.gameURL(tab.url))throw Error('Chọn tab Kiếm Vũ Phong Vân trên play.choingay.vn/1046 trước.');

  desiredTabs.add(tabId);await persistDesiredTabs();
  if(tabs.has(tabId)){connect();return report(tabs.get(tabId));}

  await chrome.debugger.attach({tabId},'1.3');

  try{

    const targetInfo=(await chrome.debugger.getTargets()).find(t=>t.tabId===tabId);

    if(!targetInfo)throw Error('Không tìm thấy debugger target của tab');

    const adapter=new Adapter(tabId,targetInfo.id,tab.url),entry={adapter,reason:'Đang đợi nhân vật tải xong',history:[]};

    entry.bridge=new core.GameBridge(adapter,text=>{entry.reason=text;entry.history.push(text);if(entry.history.length>20)entry.history.shift();});

    entry.input=self.KVPV_EDGE_INPUT?.create(entry,chrome,core.gameURL);
    tabs.set(tabId,entry);

    await chrome.debugger.sendCommand({tabId},'Target.setAutoAttach',{autoAttach:true,waitForDebuggerOnStart:false,flatten:true});

    connect();if(payload&&profilesReady)await entry.bridge.sync(payload);return report(entry);

  }catch(e){await chrome.debugger.detach({tabId}).catch(()=>{});throw e;}

}

function connect(){

  if(port||!tabs.size)return;

  if(reconnectTimer){clearTimeout(reconnectTimer);reconnectTimer=null;}

  let nextPort;
  try{nextPort=chrome.runtime.connectNative('com.kvpv.localwatch');}
  catch(e){nativeState='Lỗi kết nối bộ theo dõi: '+String(e.message||e);scheduleNativeReconnect();return;}

  port=nextPort;nativeState='Đang kết nối file trên máy…';
  stableConnectionTimer=setTimeout(()=>{reconnectDelay=1000;stableConnectionTimer=null;},60000);

  nextPort.onMessage.addListener(message=>{queue=queue.then(()=>receive(message)).catch(e=>{nativeState='Lỗi dữ liệu: '+e.message;transfer=null;});});

  nextPort.onDisconnect.addListener(()=>{
    const error=chrome.runtime.lastError?.message;
    if(port!==nextPort)return;
    port=null;transfer=null;
    if(stableConnectionTimer){clearTimeout(stableConnectionTimer);stableConnectionTimer=null;}
    nativeState=error||'Bộ theo dõi đã ngắt';scheduleNativeReconnect();
  });

  try{nextPort.postMessage({type:'watch'});}
  catch(e){nativeState='Lỗi gửi lệnh theo dõi: '+String(e.message||e);nextPort.disconnect();}

}

function scheduleNativeReconnect(){

  if(!tabs.size||reconnectTimer)return;
  const delay=reconnectDelay;reconnectDelay=Math.min(reconnectDelay*2,30000);
  reconnectTimer=setTimeout(()=>{reconnectTimer=null;connect();},delay);

}

function disconnectNative(){

  if(reconnectTimer){clearTimeout(reconnectTimer);reconnectTimer=null;}
  if(stableConnectionTimer){clearTimeout(stableConnectionTimer);stableConnectionTimer=null;}
  reconnectDelay=1000;
  const currentPort=port;port=null;
  if(currentPort)currentPort.disconnect();

}

async function receive(m){

  if(m.type==='profilesBegin'){profilesReady=false;if(busy)pumpAgain=true;return;}

  if(m.type==='profilesReady'){profilesReady=true;void pump();return;}

  if(m.type==='desktopControls'){if(Array.isArray(m.profiles)&&m.profiles.length<=8)desktopControls=m.profiles;return;}

  if(m.type==='partyPeers'){if(Array.isArray(m.peers)&&m.peers.length<=32)partyPeers=m.peers;return;}

  if(m.type==='state'){nativeState=m.text;return;}

  if(m.type==='begin'){

    if(!Number.isInteger(m.chunks)||m.chunks<1||m.chunks>128||!Number.isInteger(m.bytes)||m.bytes<1||m.bytes>16000000||!/^[a-f0-9]{64}$/.test(m.sha256)||!/^[a-f0-9]{12}$/.test(m.build)||m.actor!==null&&!(typeof m.actor==='string'&&/^[1-9]\d{4,24}$/.test(m.actor))||!Array.isArray(m.modules)||m.modules.length>128||m.modules.some(file=>typeof file!=='string'))throw Error('Manifest không hợp lệ');

    transfer={...m,parts:[],received:0};return;

  }

  if(m.type==='chunk'){

    if(!transfer||m.index!==transfer.parts.length||m.sha256!==transfer.sha256||typeof m.data!=='string'||m.data.length>180000)throw Error('Thứ tự gói không hợp lệ');

    const part=Uint8Array.from(atob(m.data),c=>c.charCodeAt(0));transfer.parts.push(part);transfer.received+=part.length;

    if(transfer.received>transfer.bytes)throw Error('Gói vượt dung lượng');return;

  }

  if(m.type==='end'){

    const t=transfer;transfer=null;if(!t||m.sha256!==t.sha256||t.parts.length!==t.chunks||t.received!==t.bytes)throw Error('FULL nhận thiếu');

    const bytes=new Uint8Array(t.bytes);let at=0;for(const part of t.parts){bytes.set(part,at);at+=part.length;}

    const digest=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',bytes)),b=>b.toString(16).padStart(2,'0')).join('');

    if(digest!==t.sha256)throw Error('FULL sai hash');

    const received={build:t.build,full:new TextDecoder('utf-8',{fatal:true}).decode(bytes),modules:t.modules};
    if(t.actor===null)payload={...received,byActor:new Map()};
    else if(payload)payload.byActor.set(t.actor,received);
    else throw Error('Thiếu FULL nền trước bundle nhân vật');
    nativeState='Đã kiểm thử · FULL '+received.build;if(profilesReady)void pump();

  }

}

async function pump(){

  if(busy){pumpAgain=true;return;}if(!payload||!profilesReady)return;busy=true;

  const snapshot=payload;

  try{

    // Independent tabs must not wait for a slow or backgrounded game tab.

    await Promise.allSettled(Array.from(tabs,async([tabId,entry])=>{try{

      const tab=await chrome.tabs.get(tabId);if(!core.gameURL(tab.url)){await detach(tabId);return;}
      entry.adapter.url=tab.url;const result=await entry.bridge.sync(snapshot,partyPeers,desktopControls);

      const now=Date.now();
      for(const actor of result?.heartbeats??[]){
        const key=String(actor);
        if(now-(heartbeatSent.get(key)||0)<5000)continue;
        if(port){port.postMessage({type:'heartbeat',actor:key});heartbeatSent.set(key,now);}
      }

      for(const report of result?.diagnostics??[]){

        const key=String(report.actor),stamp=report.build+'/'+report.at;if(diagnosticsSent.get(key)===stamp)continue;

        if(port){port.postMessage({type:'diagnostics',report});diagnosticsSent.set(key,stamp);}

      }

    }catch(e){entry.reason=String(e.message||e).slice(0,300);}}));

  }finally{busy=false;if(pumpAgain||payload!==snapshot){pumpAgain=false;void pump();}}

}

async function detach(tabId){await desiredTabsReady;desiredTabs.delete(tabId);await persistDesiredTabs();tabs.get(tabId)?.input?.setEnabled(false);tabs.delete(tabId);await chrome.debugger.detach({tabId}).catch(()=>{});if(!tabs.size){disconnectNative();nativeState='Đã ngắt đồng bộ';}}

async function attachAll(){

  const candidates=(await chrome.tabs.query({})).filter(tab=>core.gameURL(tab.url)).slice(0,32);

  const results=await Promise.allSettled(candidates.map(tab=>attach(tab.id)));

  const attached=results.filter(r=>r.status==='fulfilled').length,failed=results.length-attached;

  return {...report(null),reason:candidates.length?'Đã gắn '+attached+'/'+candidates.length+' tab game'+(failed?' · '+failed+' tab chưa gắn được':'')+'; chờ app nhận diện acc.':'Không tìm thấy tab Kiếm Vũ Phong Vân đang mở.'};

}

chrome.debugger.onEvent.addListener((source,method,params)=>{const entry=tabs.get(source.tabId);if(!entry)return;

  if(method==='Target.attachedToTarget'&&params.targetInfo?.type==='iframe'){

    const adapter=entry.adapter,parent=source.sessionId?Array.from(adapter.children.values()).find(c=>c.sessionId===source.sessionId)?.info.targetId:adapter.targetId;

    adapter.children.set(params.targetInfo.targetId,{sessionId:params.sessionId,info:{...params.targetInfo,parentId:parent}});

    chrome.debugger.sendCommand({tabId:source.tabId,sessionId:params.sessionId},'Target.setAutoAttach',{autoAttach:true,waitForDebuggerOnStart:false,flatten:true}).catch(()=>{});

  }

  if(method==='Target.detachedFromTarget')for(const [id,c]of entry.adapter.children)if(c.sessionId===params.sessionId)entry.adapter.children.delete(id);

  entry.adapter.emit({method,params,sessionId:source.sessionId||'root'});

});

chrome.debugger.onDetach.addListener(source=>{tabs.delete(source.tabId);if(desiredTabs.has(source.tabId))scheduleDesiredTabRestore();if(!tabs.size)disconnectNative();});

chrome.tabs.onRemoved.addListener(tabId=>{tabs.delete(tabId);void desiredTabsReady.then(async()=>{if(desiredTabs.delete(tabId))await persistDesiredTabs();}).catch(e=>console.error('Could not forget closed tab: '+String(e.message||e)));if(!tabs.size)disconnectNative();});

chrome.alarms.create('kvpv-restore-tabs',{periodInMinutes:0.5});
chrome.alarms.onAlarm.addListener(alarm=>{if(alarm.name==='kvpv-restore-tabs')scheduleDesiredTabRestore(0);});
chrome.runtime.onStartup.addListener(()=>{chrome.alarms.create('kvpv-restore-tabs',{periodInMinutes:0.5});scheduleDesiredTabRestore(0);});
chrome.runtime.onInstalled.addListener(()=>{chrome.alarms.create('kvpv-restore-tabs',{periodInMinutes:0.5});scheduleDesiredTabRestore(0);});

chrome.runtime.onMessage.addListener((m,sender,reply)=>{

  if(sender.id!==chrome.runtime.id||sender.tab||!sender.url?.startsWith(chrome.runtime.getURL('')))return false;

  (async()=>{

    if(m.type==='attachAll')return await attachAll();

    if(!Number.isInteger(m.tabId))throw Error('Tab không hợp lệ');

    if(m.type==='attach')return await attach(m.tabId);

    if(m.type==='detach'){await detach(m.tabId);return report(null);}

    if(m.type==='inputOn'||m.type==='inputOff'){const entry=tabs.get(m.tabId);if(!entry?.input)throw Error('Bật đồng bộ tab này trước.');entry.input.setEnabled(m.type==='inputOn');return report(entry);}
    if(['truTienStatus','truTienStart','truTienStop'].includes(m.type)){
      const entry=tabs.get(m.tabId);if(!entry?.bridge)throw Error('Bật đồng bộ tab này trước.');
      const action=m.type==='truTienStart'?'start':m.type==='truTienStop'?'stop':'status';
      return {...report(entry),truTien:await entry.bridge.truTienAction(action)};
    }
    if(m.type==='status')return report(tabs.get(m.tabId));

    throw Error('Yêu cầu không hợp lệ');

  })().then(result=>reply({ok:true,result}),e=>reply({ok:false,error:String(e.message||e)}));return true;

});

setInterval(pump,500);


setInterval(()=>{for(const entry of tabs.values())if(entry.input?.status().enabled)void entry.input.tick();},1000);

void restoreDesiredTabs().catch(e=>{nativeState='Lỗi khôi phục tab: '+String(e.message||e);console.error(nativeState);});
