'use strict';
(() => {
 const probe=`(() => {const p=window._Ba?._rJ?._O$?.ins;const actor=String(p?.actorId??'');if(!(/^[1-9]\\d{4,24}$/).test(actor)||window.__KVPV_OWN_ACTOR_ID&&String(window.__KVPV_OWN_ACTOR_ID)!==actor)return null;const items=[...document.querySelectorAll('canvas')].filter(c=>c.isConnected).map(c=>({c,r:c.getBoundingClientRect()})).filter(o=>o.r.width>=100&&o.r.height>=100).sort((a,b)=>b.r.width*b.r.height-a.r.width*a.r.height);const a=items[0];if(!a)return null;const x=a.r.left+6,y=a.r.bottom-6;if(x<0||y<0||x>=innerWidth||y>=innerHeight||document.elementFromPoint(x,y)!==a.c)return null;return {actor:String(p.actorId),x,y,width:innerWidth,height:innerHeight};})()`;
 function create(entry,chrome,gameURL){
  const state={enabled:false,busy:false,actor:null,clicks:0,skipped:0,lastError:'',trustedObserved:null,lastPoint:null,reason:'off'};
  let generation=0;
  const send=(method,params)=>entry.adapter.send(method,params,'root');
  function setEnabled(on){generation++;state.enabled=!!on;if(on){state.actor=null;state.trustedObserved=null;}state.reason=on?'waiting_game_frame':'off';state.lastError='';return status();}
  function status(){return {...state,busy:undefined,intervalMs:1000};}
  async function tick(){
   if(!state.enabled||state.busy)return;state.busy=true;const token=generation;let installed=null,pressed=false,point=null;
   const alive=()=>state.enabled&&generation===token;
   try{
    const tab=await chrome.tabs.get(entry.adapter.tabId);if(!gameURL(tab.url)){setEnabled(false);state.reason='left_game_url';return;}
    const root=(await send('Page.getFrameTree',{})).frameTree;
    if(!root?.frame?.id){state.skipped++;state.reason='waiting_frame_tree';return;}
    const frames=new Set([root.frame.id,...(root.childFrames||[]).map(f=>f.frame.id)]);
    const candidates=[];
    for(const context of entry.bridge.contexts.values()){
     if(context.auxData?.isDefault!==true||!frames.has(context.auxData?.frameId))continue;
     const value=await entry.bridge.evaluate(context,probe);if(typeof value?.actor==='string'&&/^[1-9]\d{4,24}$/.test(value.actor))candidates.push({context,value});
    }
    if(candidates.length!==1){state.skipped++;state.reason=candidates.length?'ambiguous_game_frame':'waiting_account_canvas';return;}
    const {context,value}=candidates[0];if(!alive())return;if(state.actor&&state.actor!==value.actor){setEnabled(false);state.reason='account_changed_enable_again';return;}state.actor=value.actor;point={x:value.x,y:value.y};let owner=null;
    if(context.auxData.frameId!==root.frame.id){
     const node=await send('DOM.getFrameOwner',{frameId:context.auxData.frameId});
     if(!node.backendNodeId)throw Error('Frame owner unavailable');
     const box=await send('DOM.getBoxModel',{backendNodeId:node.backendNodeId}),quad=box.model?.content;
     if(!Array.isArray(quad)||quad.length!==8||!quad.every(Number.isFinite))throw Error('Invalid iframe bounds');
     if(Math.abs(quad[1]-quad[3])>.5||Math.abs(quad[0]-quad[6])>.5||quad[2]<=quad[0]||quad[7]<=quad[1])throw Error('Rotated/skewed iframe unsupported');
     point={x:quad[0]+value.x/value.width*(quad[2]-quad[0]),y:quad[1]+value.y/value.height*(quad[7]-quad[1])};
     const resolved=await send('DOM.resolveNode',{backendNodeId:node.backendNodeId});owner=resolved.object?.objectId;
     if(!owner)throw Error('Cannot resolve iframe owner');
     try{const result=await send('Runtime.callFunctionOn',{objectId:owner,functionDeclaration:'function(x,y,w,h){const r=this.getBoundingClientRect();if(!this.isConnected||!this.offsetWidth||!this.offsetHeight)return null;const px=r.left+(this.clientLeft+x/w*this.clientWidth)*r.width/this.offsetWidth,py=r.top+(this.clientTop+y/h*this.clientHeight)*r.height/this.offsetHeight;return {x:px,y:py,hit:this.ownerDocument.elementFromPoint(px,py)===this};}',arguments:[{value:value.x},{value:value.y},{value:value.width},{value:value.height}],returnByValue:true});const hit=result.result?.value;if(!hit?.hit||!Number.isFinite(hit.x)||!Number.isFinite(hit.y)){state.skipped++;state.reason='iframe_covered';return;}point={x:hit.x,y:hit.y};}finally{await send('Runtime.releaseObject',{objectId:owner}).catch(()=>{});}
    }
    if(!alive())return;
    const validation=await entry.bridge.evaluate(context,probe);
    if(!validation||JSON.stringify(validation)!==JSON.stringify(value)){state.skipped++;state.reason='layout_changed';return;}
    const stamp=String(Date.now())+'-'+token;
    const installedOK=await entry.bridge.evaluate(context,`(() => {const actor=String(window._Ba?._rJ?._O$?.ins?.actorId??'');if(actor!==${JSON.stringify(value.actor)})return false;const old=window.__KVPV_INPUT_CHECK;if(old?.fn)document.removeEventListener('click',old.fn,true);const s={stamp:${JSON.stringify(stamp)},trusted:null};s.fn=e=>{if(Math.abs(e.clientX-${value.x})<2&&Math.abs(e.clientY-${value.y})<2&&e.target?.tagName==='CANVAS')s.trusted=e.isTrusted;};document.addEventListener('click',s.fn,true);window.__KVPV_INPUT_CHECK=s;window.KVPV_FRAME_CLICK?.stop?.();return true;})()`);
    if(!installedOK)return;installed={context,stamp};
    const latest=await chrome.tabs.get(entry.adapter.tabId);if(!alive()||!gameURL(latest.url))return;
    await send('Input.dispatchMouseEvent',{type:'mouseMoved',x:point.x,y:point.y,button:'none',buttons:0});
    if(!alive())return;
    pressed=true;
    await send('Input.dispatchMouseEvent',{type:'mousePressed',x:point.x,y:point.y,button:'left',buttons:1,clickCount:1});
    await send('Input.dispatchMouseEvent',{type:'mouseReleased',x:point.x,y:point.y,button:'left',buttons:0,clickCount:1});pressed=false;
    state.clicks++;state.lastPoint=point;state.lastError='';state.reason='browser_input_sent';
   }catch(e){state.lastError=String(e.message||e).slice(0,240);state.reason='input_error';}
   finally{
    if(pressed&&point)await send('Input.dispatchMouseEvent',{type:'mouseReleased',x:point.x,y:point.y,button:'left',buttons:0,clickCount:1}).catch(()=>{});
    if(installed)try{state.trustedObserved=await entry.bridge.evaluate(installed.context,`(() => {const s=window.__KVPV_INPUT_CHECK;if(s?.stamp!==${JSON.stringify(installed.stamp)})return null;document.removeEventListener('click',s.fn,true);delete window.__KVPV_INPUT_CHECK;return s.trusted;})()`);}catch(_){}
    state.busy=false;
   }
  }
  return {setEnabled,status,tick};
 }
 const api={create,probe};if(typeof module!=='undefined'&&module.exports)module.exports=api;else self.KVPV_EDGE_INPUT=api;
})();
