/* Diệt Thổ Hào: server-verified native entrance, once per event window. */
(()=>{'use strict';
const W=window, actor=String(W.__KVPV_OWN_ACTOR_ID||''),old=W.KVPV_DIET_THO_HAO_AUTO,carry=old?._handoff?.();
old?.stop?.();const S={enabled:carry?.actor===actor?carry.enabled!==false:true,timer:null,key:carry?.actor===actor?carry.key:'',attempts:carry?.actor===actor?carry.attempts:0,reason:'waiting',error:''};
const owned=()=>!!actor&&String(W._Ba?._rJ?._O$?.ins?.actorId??'')===actor&&!W.__KVPV_UNIVERSAL_HALTED;
const map=()=>Number(W._C?._Mn?._Cn?.currentID??W._Ba?._$a?._yo?.ins?.intoSce?.[0]);
const calendar=()=>W.KVPV_DAILY?.lichData?.();
function tick(){if(!S.enabled||!owned())return;
 try{
  const now=new Date(),parts=Object.fromEntries(new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Ho_Chi_Minh',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(now).map(p=>[p.type,p.value]));
  const day=Date.UTC(+parts.year,+parts.month-1,+parts.day),weekday=new Date(day).getUTCDay(),minute=+parts.hour*60+ +parts.minute;
  if(![2,4,6].includes(weekday)||minute<1200||minute>=1230){S.reason='outside_window';return;}
  const key=parts.year+'-'+parts.month+'-'+parts.day;
  if(map()===2411||map()===2412){S.reason='inside_event';return;}
  if(S.key===key){S.reason='entry_requested_once';return;}
  const event=calendar()?.active?.find(e=>e?.key==='diet_tho_hao');
  if(!event){S.reason='waiting_event_calendar';return;}
  const state=Number(W._Ba?._$d?._oet?.ins?.state);
  if(state!==1){S.reason='waiting_native_open_state';return;}
  if(W.KVPV_ENTRY_POLICY?.manual===true||W._Ba?._rJ?._O$?.ins?.isDead===true||W.document?.hidden===true||Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)){S.reason='paused';return;}
  if(W._Ba?._$a?.SceneUtil?.isCommonScene!==true){S.reason='waiting_stage_yield';return;}
  const raw=W._Ba?._sst?._ist?.inst?.getCpSceneStateByType?.(64);
  if(!Array.isArray(raw)||!Number.isFinite(Number(raw[2]))){S.reason='waiting_native_scene_state';return;}
  const scene=Number(raw[2])===2?2412:2411;
  const rpc=W._Ba?._sst?._Cht?.inst;
  if(typeof rpc?.rqEtScene!=='function'){S.reason='native_entry_missing';return;}
  S.key=key;S.attempts++;S.reason='native_entry_requested';
  rpc.rqEtScene(scene,1);
 }catch(e){S.error=String(e?.message||e);S.reason='uncertain_no_retry';}
}
function stop(){S.enabled=false;if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)?.(S.timer);S.timer=null;}
function start(){S.enabled=true;if(S.timer===null)S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)?.(tick,1000);tick();return status();}
function status(){return {enabled:S.enabled,reason:S.reason,attempts:S.attempts,pendingEventDay:S.key,inside:[2411,2412].includes(map()),error:S.error};}
W.KVPV_DIET_THO_HAO_AUTO=Object.freeze({start,stop,sync:tick,status,_handoff:()=>({actor,enabled:S.enabled,key:S.key,attempts:S.attempts})});
if(owned()&&S.enabled)start();
})();
