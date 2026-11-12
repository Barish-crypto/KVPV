function gameURL(url){try{const u=new URL(url);return /^https?:$/.test(u.protocol)&&u.hostname==='play.choingay.vn'&&/^\/1046(?:\/|$)/.test(u.pathname);}catch(_){return false;}}

function frameIds(tree,out=new Set()){if(tree?.frame?.id)out.add(tree.frame.id);for(const child of tree?.childFrames||[])frameIds(child,out);return out;}
const heartbeatLeaseMs=120000;

const probe=`(() => {
 const W=window,p=W._Ba?._rJ?._O$?.ins,actor=String(p?.actorId||'');
 if(!p||!(/^[1-9]\\d{4,24}$/).test(actor))return {ready:false};
 let diagnostics=null;try{diagnostics=W.KVPV_EXECUTOR_REPORT?.snapshot?.()??null;}catch(_){}
 if(!W._ft||!W._Sa)return {ready:false,actor,diagnostics,reason:'waiting_runtime'};
 if(W.__KVPV_UNIVERSAL_HALTED||W.KVPV_V1&&String(W.__KVPV_OWN_ACTOR_ID)!==actor)return {ready:false,actor,diagnostics,reason:'account_changed_open_new_tab'};
 if(p.isDead===true)return {ready:false,actor,diagnostics,reason:'waiting_revive'};
 const types=W._d?._Yct,world=W._C?._Ba?.instance,role=world?.getRole?.(Number(actor))||world?.getRole?.(actor);
 if(!types?._Eet||!types?._Het||!types?._zet||!role?.getComponent?.(types._Eet)||!role.getComponent(types._Het)||!role.getComponent(types._zet))return {ready:false,actor,diagnostics,reason:'waiting_components'};
 return {ready:true,actor,hasRuntime:!!W.KVPV_V1,loaded:W.__KVPV_LIVE_BUILD||null,runtimeModules:Array.isArray(W.__KVPV_RUNTIME_MODULE_SET)?W.__KVPV_RUNTIME_MODULE_SET:null,diagnostics};
})()`;

function injection(full,build){return `(() => { const before=${probe};if(!before.ready)return before;\n${full}\nif(!window.KVPV_V1)throw Error('FULL did not install');window.__KVPV_LIVE_BUILD=${JSON.stringify(build)};return {ready:true,loaded:window.__KVPV_LIVE_BUILD};})()\n//# sourceURL=KVPV_LIVE_FULL.js`;}
function sameModuleSet(left,right){if(!Array.isArray(left)||!Array.isArray(right)||left.length!==right.length)return false;const a=[...left].sort(),b=[...right].sort();return a.every((name,index)=>name===b[index]);}

class GameBridge{

  constructor(cdp,log=()=>{}){this.cdp=cdp;this.log=log;this.targets=new Map();this.contexts=new Map();this.attempts=new Map();this.errors=new Map();this.contextActors=new Map();this.inFlight=new Map();this.pendingDiagnostics=[];

    cdp.on('event',m=>{

      const p=m.params||{},sid=m.sessionId;

      if(m.method==='Runtime.executionContextCreated'&&p.context?.auxData?.isDefault===true){const c=p.context;this.contexts.set(sid+'/'+c.id,{...c,sessionId:sid});}

      if(m.method==='Runtime.executionContextDestroyed'){const key=sid+'/'+p.executionContextId;this.contexts.delete(key);this.contextActors.delete(key);this.attempts.delete(key);this.errors.delete(key);this.inFlight.delete(key);}

      if(m.method==='Runtime.executionContextsCleared')for(const [key,c]of this.contexts)if(c.sessionId===sid){this.contexts.delete(key);this.contextActors.delete(key);this.attempts.delete(c.uniqueId||key);this.errors.delete(c.uniqueId||key);this.inFlight.delete(key);}

      if(m.method==='Target.detachedFromTarget')this.removeSession(p.sessionId);

    });

  }

  removeSession(sid){for(const [id,s]of this.targets)if(s===sid)this.targets.delete(id);for(const [key,c]of this.contexts)if(c.sessionId===sid){this.contexts.delete(key);this.contextActors.delete(key);this.attempts.delete(c.uniqueId||key);this.errors.delete(c.uniqueId||key);this.inFlight.delete(key);}}

  async attach(info){if(this.targets.has(info.targetId))return this.targets.get(info.targetId);

    const {sessionId}=await this.cdp.send('Target.attachToTarget',{targetId:info.targetId,flatten:true});this.targets.set(info.targetId,sessionId);

    await this.cdp.send('Runtime.enable',{},sessionId);return sessionId;

  }

  async evaluate(context,expression){const result=await this.cdp.send('Runtime.evaluate',{

    expression,returnByValue:true,awaitPromise:false,...(context.uniqueId?{uniqueContextId:context.uniqueId}:{contextId:context.id})

  },context.sessionId);if(result.exceptionDetails)throw Error(result.exceptionDetails.exception?.description||result.exceptionDetails.text);return result.result?.value;}

  async scanContext(context,key,payload,partyPeers,desktopControls){

    try{

      const state=await this.evaluate(context,probe);
      if(this.contexts.get(key)!==context)return;
      if(state?.actor)this.contextActors.set(key,{actor:String(state.actor),at:Date.now()});
      else this.contextActors.delete(key);
      if(state?.diagnostics){this.pendingDiagnostics.push(state.diagnostics);if(this.pendingDiagnostics.length>32)this.pendingDiagnostics.shift();}
      if(!state?.ready)return;
      const runtime=payload?.byActor?.get(String(state.actor))||payload;

      if(Array.isArray(partyPeers)&&partyPeers.length<=32)await this.evaluate(context,
        'window.KVPV_TEAM_COORDINATOR?.receive?.('+JSON.stringify(partyPeers)+')');

      if(Array.isArray(desktopControls)&&desktopControls.length<=8&&desktopControls.length)await this.evaluate(context,
        'window.KVPV_DESKTOP_CONTROL?.receive?.('+JSON.stringify(desktopControls)+')');

      if(state.hasRuntime&&!Array.isArray(state.runtimeModules))return;
      if(Array.isArray(state.runtimeModules)&&!sameModuleSet(state.runtimeModules,runtime.modules||[]))return;
      const attemptKey=context.uniqueId||key;
      if(state.loaded===runtime.build){if(this.attempts.get(attemptKey)!==runtime.build){this.attempts.set(attemptKey,runtime.build);this.log('READY '+runtime.build+' actor '+state.actor);}return;}
      if(this.attempts.get(attemptKey)===runtime.build)return;

      this.attempts.set(attemptKey,runtime.build);
      const result=await this.evaluate(context,injection(runtime.full,runtime.build));
      if(result?.loaded===runtime.build)this.log('LOADED '+runtime.build+' actor '+state.actor);

    }catch(e){const attemptKey=context.uniqueId||key,message=String(e.message||e).slice(0,350);

      if(/uniqueContextId not found|Cannot find context|Execution context was destroyed|Target closed/i.test(message)){this.attempts.delete(attemptKey);return;}

      if(this.errors.get(attemptKey)!==message){this.errors.set(attemptKey,message);this.log('FRAME ERROR: '+message);}}

  }

  async truTienAction(action){

    if(!['status','start','stop'].includes(action))throw Error('Invalid Tru Tien action');
    const now=Date.now(),candidates=[];
    for(const [key,record]of this.contextActors){
      const context=this.contexts.get(key);
      if(!context||typeof record?.actor!=='string'||!/^[1-9]\d{4,24}$/.test(record.actor)||
        !Number.isFinite(record.at)||record.at>now||now-record.at>heartbeatLeaseMs)continue;
      candidates.push({context,actor:record.actor});
    }
    if(!candidates.length)throw Error('Chưa nhận diện nhân vật trong tab game; hãy đợi đồng bộ rồi thử lại.');
    const actors=new Set(candidates.map(candidate=>candidate.actor));
    if(actors.size!==1)throw Error('Tab có nhiều nhân vật đang hoạt động; không thể chọn PK Tru Tiên an toàn.');
    const actor=candidates[0].actor,actionText=JSON.stringify(action),actorText=JSON.stringify(actor);
    const expression=`(()=>{const action=${actionText},expected=${actorText};let api=window.KVPV_TRUTIEN_PVP;if(!api&&action==='start'){const install=window.__KVPV_CONTROL_INSTALLERS?.['76-trutien-pvp.js'];if(typeof install==='function')install();api=window.KVPV_TRUTIEN_PVP;}if(!api||typeof api.status!=='function')return action==='start'?{available:false,reason:'module_api_unavailable'}:{available:true,actor:expected,enabled:false,reason:'not_initialized',selectedPlayer:false,targetId:''};const summary=()=>{const s=api.status();return {available:true,actor:String(s?.actor??''),enabled:s?.enabled===true,reason:String(s?.reason??''),selectedPlayer:s?.selectedPlayer===true,targetId:String(s?.targetId??'')}};let state=summary();if(state.actor!==expected)return state;if(action==='start'&&state.enabled!==true){if(typeof api.start!=='function')throw Error('Tru Tien start API unavailable');api.start({autoDodge:false,companions:false});state=summary();}else if(action==='stop'&&state.enabled===true){if(typeof api.stop!=='function')throw Error('Tru Tien stop API unavailable');api.stop('dashboard_stop');state=summary();}return state;})()`;
    let lastStatus=null,lastError=null;
    for(const candidate of candidates){
      try{
        const state=await this.evaluate(candidate.context,expression);
        if(!state?.available){lastError=Error('Tru Tiên API chưa được nạp trong context đã nhận diện.');continue;}
        if(String(state.actor)!==actor){lastError=Error('Actor của module Tru Tiên không khớp nhân vật hiện tại.');continue;}
        lastStatus=state;
        if(action!=='stop'&&state.enabled===true)return state;
      }catch(error){lastError=error;}
    }
    if(lastStatus)return lastStatus;
    if(lastError)throw lastError;
    throw Error('Module Tru Tiên chưa sẵn sàng trong tab game; hãy đồng bộ lại tab.');

  }

  async sync(payload,partyPeers=[],desktopControls=[]){

    let targetInfos=[];
    try{({targetInfos}=await this.cdp.send('Target.getTargets'));}
    catch(error){
      const message=String(error?.message||error||'unknown');
      this.log('TARGETS ERROR: '+message.slice(0,300));
      return {pages:0,contexts:this.contexts.size,diagnostics:[],heartbeats:[]};
    }
    targetInfos=Array.isArray(targetInfos)?targetInfos:[];
    const live=new Set(targetInfos.map(t=>t.targetId));

    for(const [id,sid]of this.targets)if(!live.has(id))this.removeSession(sid);

    const allowed=new Set(),pages=targetInfos.filter(t=>t.type==='page'&&gameURL(t.url));

    for(const page of pages){try{const sid=await this.attach(page);const tree=await this.cdp.send('Page.getFrameTree',{},sid);frameIds(tree.frameTree,allowed);}catch(_){}}

    

    

    const authorizedTargets=new Set(pages.map(t=>t.targetId));let expanded=true;

    while(expanded){expanded=false;

      for(const target of targetInfos)if(target.type==='iframe'&&!authorizedTargets.has(target.targetId)&&

        (allowed.has(target.targetId)||allowed.has(target.parentFrameId)||authorizedTargets.has(target.parentId))){

        authorizedTargets.add(target.targetId);allowed.add(target.targetId);expanded=true;

        try{const sid=await this.attach(target);const tree=await this.cdp.send('Page.getFrameTree',{},sid);frameIds(tree.frameTree,allowed);}catch(_){}

      }

    }

    const activeContexts=new Set();

    for(const context of [...this.contexts.values()]){

      if(!allowed.has(context.auxData?.frameId))continue;

      const key=context.sessionId+'/'+context.id;
      activeContexts.add(key);
      if(!this.inFlight.has(key)){
        const task=this.scanContext(context,key,payload,partyPeers,desktopControls);
        this.inFlight.set(key,task);
        const clear=()=>{if(this.inFlight.get(key)===task)this.inFlight.delete(key);};
        task.then(clear,clear);
      }

    }

    const now=Date.now(),heartbeats=new Set();
    for(const [key,record]of this.contextActors){
      if(!activeContexts.has(key)||now-record.at>heartbeatLeaseMs){this.contextActors.delete(key);continue;}
      heartbeats.add(record.actor);
    }

    for(const [key,context]of this.contexts)if(!activeContexts.has(key)){this.contextActors.delete(key);this.attempts.delete(context.uniqueId||key);this.errors.delete(context.uniqueId||key);}

    const diagnostics=this.pendingDiagnostics.splice(0);
    return {pages:pages.length,contexts:this.contexts.size,diagnostics,heartbeats:[...heartbeats]};

  }

}


self.KVPV_EDGE_CORE={GameBridge,gameURL};
