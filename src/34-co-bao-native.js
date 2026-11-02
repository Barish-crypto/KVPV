/* Co Bao m1094 native restoration (V8.6.3): only owned fragments, native UI, no purchases. */
(()=>{
'use strict';
const W=window,old=W.KVPV_CO_BAO_NATIVE,carry=old?._handoff?.();
old?.stop?.('reload');
const actor=String(W.__KVPV_OWN_ACTOR_ID??'');
const S={enabled:true,timer:null,pending:carry?.actor===actor?carry.pending:null,
 lastOpen:0,lastError:'',reason:'armed',steps:carry?.steps??0,ackTimeouts:0};
const own=()=>!!actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;
const model=()=>W._Ba?._kAt?._LAt?.inst;
const rpc=()=>W._Ba?._kAt?._IMi?.inst;
function quest(){const t=W._Ba?._zIt?._FIt?.ins?.taskInfo;return Array.isArray(t)?{id:String(t[0]),state:Number(t[1])}:null;}
function active(){const q=quest(),m=model();return (!!q&&q.id==='m1094'&&q.state!==2)||
 (m?.__gn===true&&Array.isArray(m?.shenqi));}
function idle(){const s=W.KVPV_DAILY?.quickState?.(),j=String(s?.job??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
 return own()&&active()&&(!j||j==='ranh'||j==='idle')&&
 !['entering','exiting','fighting'].includes(String(s.step))&&
 W._Ba?._$a?.SceneUtil?.isCommonScene===true&&!W.KVPV_UPGRADES?.busy?.()&&
 !W.KVPV_EVENT_PRIORITY?.hold?.();}
function manager(){return W._j?.ins??W.window_WinMgr??null;}
function panel(){const mgr=manager(),id=Number(W._Sa?.getWindowCfgByFcId?.(189)?.[0]);
 const opened=Number.isSafeInteger(id)&&id>0&&mgr?.isOpened?.(id)===true;
 return {opened,ui:opened?(mgr.getPanelById?.(id)??mgr.getDialogById?.(id)):null};}
function snapshot(){const m=model(),count=Array.isArray(m?.shenqi)?m.shenqi.length:null;
 const cfg=count===null?null:W._ft?._WNn?.ins?.getCfgById?.(count),rows=Array.isArray(cfg?.[2])?cfg[2].map((n,i)=>({id:Number(n),index:i,owned:!!m?.frgmtsDic?.get?.(n),placed:!!m?.epFrgmtsDic?.get?.(n)})):[];
 const ready=m?.__gn===true&&count!==null&&rows.length>0&&rows.every(x=>Number.isSafeInteger(x.id)&&x.id>0);
 return {count,ready,rows,own:rows.find(x=>x.owned&&!x.placed),allPlaced:ready&&rows.every(x=>x.placed),uiOpen:panel().opened};}
function stop(reason='manual'){S.enabled=false;if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)?.(S.timer);S.timer=null;S.reason=reason;}
function tick(){if(!S.enabled||!own())return;
 try{
  if(!active()){S.reason='no_cobao_quest';return;}
  if(!idle()){S.reason='waiting_idle';return;}
  const p=snapshot(),now=Date.now(),signature=JSON.stringify([p.count,p.rows]);
  if(S.pending){if(S.pending.signature===signature){
    S.reason=now-Number(S.pending.at||0)>30000?'server_ack_timeout_manual_review':'waiting_server_ack';
    if(S.reason==='server_ack_timeout_manual_review'&&!S.pending.timeoutLogged){S.ackTimeouts++;S.pending.timeoutLogged=true;}
    return;
   }S.pending=null;}
  if(!p.ready){if(now-S.lastOpen>60000&&typeof manager()?.openByActionId==='function'){manager().openByActionId(189);S.lastOpen=now;}S.reason='waiting_fragment_data';return;}
  if(p.own&&typeof rpc()?.epFragment==='function'){
   rpc().epFragment([p.own.id]);S.pending={signature,at:now,action:'put'};S.steps++;S.reason='placed_wait_ack';return;
  }
  if(p.allPlaced){
   const ui=panel().ui,btn=ui?.activateBtn;
   if(ui&&Number(ui.idx)===p.count&&btn?.visible===true&&btn.gray!==true&&btn.disabled!==true&&typeof btn.event==='function'){
    btn.event(W.Laya?.Event?.CLICK??'click');
   }else if(!ui&&typeof rpc()?.actShenQi==='function')rpc().actShenQi();
   else{S.reason='activation_ui_not_ready';return;}
   S.pending={signature,at:now,action:'activate'};S.steps++;S.reason='activation_wait_ack';return;
  }
  if(!p.uiOpen&&now-S.lastOpen>60000&&typeof manager()?.openByActionId==='function'){
   manager().openByActionId(189);S.lastOpen=now;S.reason='opening_cobao_ui';return;
  }
  S.reason='missing_fragments_no_purchase';
 }catch(e){S.lastError=String(e?.message??e);S.reason='error';}
}
function status(){const q=quest(),d=W.KVPV_DAILY?.quickState?.(),p=own()?snapshot():null;return {enabled:S.enabled,actor,actorMatch:!!own(),quest:q,active:active(),idleReady:idle(),dailyRunning:d?.running??null,dailyJob:d?.job??null,commonScene:W._Ba?._$a?.SceneUtil?.isCommonScene??null,reason:S.reason,pending:S.pending,pendingAgeMs:S.pending?Date.now()-Number(S.pending.at||0):null,ackTimeouts:S.ackTimeouts,lastError:S.lastError,steps:S.steps,snapshot:p,rpcAvailable:{place:typeof rpc()?.epFragment==='function',activate:typeof rpc()?.actShenQi==='function'},allowKNB:false};}
W.KVPV_CO_BAO_NATIVE=Object.freeze({tick,status,stop,_handoff:()=>({actor,pending:S.pending,steps:S.steps})});
const schedule=W.KVPV_V1?.timers?.setInterval??W.setInterval;
if(typeof W.setInterval==='function'&&typeof schedule==='function')S.timer=schedule(tick,1000);
tick();
})();