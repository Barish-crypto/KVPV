/* Ma Than: summon once per verified native readiness cycle; no purchases. */
(()=>{'use strict';
const W=window,actor=String(W.__KVPV_OWN_ACTOR_ID||''),old=W.KVPV_MATHAN_RAGE,carry=old?._handoff?.();old?.stop?.();
const ok=()=>!!actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;
const S={timer:null,pending:carry?.actor===actor?carry.pending:null,lastKey:carry?.actor===actor?carry.lastKey:'',sent:carry?.actor===actor?carry.sent:0,confirmed:carry?.actor===actor?carry.confirmed:0,enabled:carry?.actor===actor?carry.enabled!==false:true,reason:'waiting'};
function snapshot(){const m=W._Ba?._u3?._YQ?.ins,n=Number(W._Sa?.svrTime),end=Number(m?.endTimer),call=Number(m?.callEndTimer),id=Number(m?.msShowid),summoned=Number(W._C?._Ba?.instance?.getRole?.(Number(actor))?.property?.get?.('warcraft')?.[0])>0;return {id,call,end,summoned,active:Number.isFinite(n)&&end>n,ready:Number.isFinite(n)&&n>0&&Number.isFinite(end)&&Number.isFinite(call)&&id>0&&!summoned&&end<=n&&call<=n};}
function tick(){if(!S.enabled||!ok())return;const v=snapshot();
 if(S.pending){if(v.summoned||v.active||v.call!==S.pending.call){S.confirmed++;S.pending=null;S.reason='confirmed';}else{S.reason='awaiting_server';return;}}
 if(!v.ready||W._Ba?._rJ?._O$?.ins?.isDead===true||W.KVPV_ENTRY_POLICY?.manual===true||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0))return;
 const key=v.id+'/'+v.call;if(key===S.lastKey)return;
 const native=W._Ba?._u3?._ern?.ins;if(typeof native?.CallBackSpiritEquipShow!=='function'){S.reason='missing_native';return;}
 S.lastKey=key;S.pending={call:v.call};S.sent++;
 try{native.CallBackSpiritEquipShow();S.reason='requested';}catch(e){S.reason='uncertain_no_retry';}
}
function status(){return {...snapshot(),enabled:S.enabled,sent:S.sent,confirmed:S.confirmed,pending:!!S.pending,reason:S.reason,allowKNB:false};}
function stop(){S.enabled=false;if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)?.(S.timer);S.timer=null;}
function start(){S.enabled=true;if(S.timer===null)S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)?.(tick,150);tick();return status();}
W.KVPV_MATHAN_RAGE=Object.freeze({start,stop,sync:tick,status,_handoff:()=>({actor,enabled:S.enabled,pending:S.pending,lastKey:S.lastKey,sent:S.sent,confirmed:S.confirmed})});if(ok()&&S.enabled)start();
})();