/* Hong Hoang: keep the Daily native map resolver supplied with verified scene data.
 * No RPC, combat, rewards or scene transitions are sent here. */
(()=>{'use strict';
const W=window,actor=String(W.__KVPV_OWN_ACTOR_ID||''),old=W.KVPV_HONG_MAP_READY,carry=old?._handoff?.();
old?.stop?.();
const S={timer:null,enabled:true,resolved:0,reason:'waiting',checks:0};
const owned=()=>actor&&String(W._Ba?._rJ?._O$?.ins?.actorId??'')===actor&&!W.__KVPV_UNIVERSAL_HALTED;
function tick(){
 if(!owned())return;
 S.checks++;
 const c=W.KVPV_DAILY?.config,scene=W._ft?._po?.ins;
 if(!c||c.enableHongHoang!==true||!scene){S.reason='waiting_daily_scene';return;}
 const preset=Number(c.hongHoangMap);
 if(preset>0){S.reason='existing_manual_map';return;}
 const table=scene._gh;
 if(!table||typeof table!=='object'){
   S.reason='native_scene_cfg_unavailable';return;
 }
 const candidates=[...new Set(Object.values(table).filter(r=>Array.isArray(r)&&Number(r[7])===17&&Number(r[0])>0).map(r=>Number(r[0])))];
 if(candidates.length!==1){S.reason='ambiguous_native_maps_'+candidates.length;return;}
 const id=candidates[0];
 if(scene.getCfgById?.(id)?.[7]!==17){S.reason='map_cfg_not_confirmed';return;}
 c.hongHoangMap=id;
 S.resolved=id;S.reason='native_unique_map_ready';
}
function status(){return {enabled:S.enabled,reason:S.reason,map:S.resolved,checks:S.checks,configuredMap:Number(W.KVPV_DAILY?.config?.hongHoangMap??0)};}
function stop(){S.enabled=false;if(S.timer!=null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)?.(S.timer);S.timer=null;}
function start(){S.enabled=true;if(S.timer==null)S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)?.(tick,3000);tick();return status();}
W.KVPV_HONG_MAP_READY=Object.freeze({start,stop,sync:tick,status,_handoff:()=>({actor})});
if(owned())start();
})();
