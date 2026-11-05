'use strict';
const assert=require('node:assert/strict'),{create,probe}=require('./edge-addon/input-click.js');
function harness(options={}){
 const calls=[],state={url:'https://play.choingay.vn/1046',probes:0};let input;
 const context={id:1,uniqueId:'ctx',sessionId:'childSession',auxData:{isDefault:true,frameId:'game'}};
 const point={actor:options.actor??'10228867268946',x:6,y:794,width:1200,height:800};
 const bridge={contexts:new Map([['game',context]]),async evaluate(c,expression){calls.push(['eval',c.id]);if(expression===probe){state.probes++;if(options.layoutChanged&&state.probes>1)return {...point,y:790};return point;}if(expression.includes('delete window.__KVPV_INPUT_CHECK'))return true;if(expression.includes('document.addEventListener'))return true;throw Error('unexpected expression');}};
 const adapter={tabId:7,async send(method,params,session){calls.push([method,params,session]);assert.equal(session,'root');if(method==='Page.getFrameTree')return {frameTree:{frame:{id:'root'},childFrames:[{frame:{id:'game'}}]}};if(method==='DOM.getFrameOwner')return {backendNodeId:9};if(method==='DOM.getBoxModel')return {model:{content:[8,100,1208,100,1208,900,8,900]}};if(method==='DOM.resolveNode')return {object:{objectId:'owner'}};if(method==='Runtime.callFunctionOn')return {result:{value:{hit:!options.covered,x:14,y:894}}};if(method==='Input.dispatchMouseEvent'&&params.type==='mouseMoved'&&options.disableOnMove)input.setEnabled(false);if(method==='Input.dispatchMouseEvent'&&params.type==='mousePressed'&&options.failPress)throw Error('press failed');return {};}};
 input=create({adapter,bridge},{tabs:{get:async()=>({url:state.url})}},url=>url===state.url&&url.startsWith('https://play.choingay.vn/1046'));
 return {input,calls,state,bridge,context,point};
}
(async()=>{
 let h=harness();await h.input.tick();assert.equal(h.calls.length,0);h.input.setEnabled(true);await h.input.tick();let events=h.calls.filter(c=>c[0]==='Input.dispatchMouseEvent');assert.deepEqual(events.map(c=>c[1].type),['mouseMoved','mousePressed','mouseReleased']);assert(events.every(c=>c[1].x===14&&c[1].y===894));assert.equal(h.input.status().clicks,1);assert.equal(h.input.status().trustedObserved,true);assert(h.calls.some(c=>c[0]==='Runtime.releaseObject'));assert(!h.calls.some(c=>c[0]==='Page.bringToFront'));
 h=harness({covered:true});h.input.setEnabled(true);await h.input.tick();assert.equal(h.input.status().reason,'iframe_covered');assert(!h.calls.some(c=>c[0]==='Input.dispatchMouseEvent'));
 h=harness({layoutChanged:true});h.input.setEnabled(true);await h.input.tick();assert.equal(h.input.status().reason,'layout_changed');assert(!h.calls.some(c=>c[0]==='Input.dispatchMouseEvent'));
 h=harness();h.bridge.contexts.set('duplicate',{...h.context,id:2});h.input.setEnabled(true);await h.input.tick();assert.equal(h.input.status().reason,'ambiguous_game_frame');
 h=harness();h.state.url='https://example.com';h.input.setEnabled(true);await h.input.tick();assert.equal(h.input.status().enabled,false);assert.equal(h.calls.length,0);
 h=harness({failPress:true});h.input.setEnabled(true);await h.input.tick();events=h.calls.filter(c=>c[0]==='Input.dispatchMouseEvent');assert.equal(events.at(-1)[1].type,'mouseReleased');assert.equal(h.input.status().clicks,0);assert.equal(h.input.status().trustedObserved,true);
 h=harness({disableOnMove:true});h.input.setEnabled(true);await h.input.tick();assert(!h.calls.some(c=>c[0]==='Input.dispatchMouseEvent'&&c[1].type==='mousePressed'));
 h=harness();h.bridge.contexts.clear();h.input.setEnabled(true);await h.input.tick();assert.equal(h.input.status().reason,'waiting_account_canvas');
 h=harness({actor:'10228867268941'});h.input.setEnabled(true);await h.input.tick();assert.equal(h.input.status().actor,'10228867268941');assert.equal(h.input.status().clicks,1);h.point.actor='10228867268942';await h.input.tick();assert.equal(h.input.status().enabled,false);assert.equal(h.input.status().reason,'account_changed_enable_again');h.input.setEnabled(true);await h.input.tick();assert.equal(h.input.status().actor,'10228867268942');assert.equal(h.input.status().enabled,true);
 const a=harness({actor:'10228867268941'}),b=harness({actor:'10228867268946'});a.input.setEnabled(true);b.input.setEnabled(true);await Promise.all([a.input.tick(),b.input.tick()]);a.input.setEnabled(false);assert.equal(b.input.status().enabled,true);assert.equal(a.input.status().actor,'10228867268941');assert.equal(b.input.status().actor,'10228867268946');

 const vm=require('node:vm'),canvas={isConnected:true,getBoundingClientRect:()=>({left:0,bottom:800,width:1200,height:800})},document={querySelectorAll:()=>[canvas],elementFromPoint:()=>canvas};
 for(const actor of ['10228867268946','10228867268941','10228867268942']){const window={_Ba:{_rJ:{_O$:{ins:{actorId:actor}}}},__KVPV_OWN_ACTOR_ID:actor};assert.equal(vm.runInNewContext(probe,{window,document,innerWidth:1200,innerHeight:800}).actor,actor);window.__KVPV_OWN_ACTOR_ID='other';assert.equal(vm.runInNewContext(probe,{window,document,innerWidth:1200,innerHeight:800}),null);}
 console.log('PASS browser input: exact game/account frame, scaled iframe point, overlay/layout/ambiguity gates, toggle cancellation, press-release cleanup and observed trusted flag.');
})().catch(e=>{console.error(e);process.exitCode=1;});
