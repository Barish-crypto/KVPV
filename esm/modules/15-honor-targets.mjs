import {getKVPV_HONOR_TARGET as __getKVPV0,getKVPV_V1 as __getKVPV1} from '../api.mjs';
export function call_KVPV_HONOR_TARGET_start(...args){const target=globalThis["KVPV_HONOR_TARGET"];const fn=globalThis["KVPV_HONOR_TARGET"]?.["start"];if(typeof fn!=='function')throw Error("KVPV_HONOR_TARGET.start is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_HONOR_TARGET_stop(...args){const target=globalThis["KVPV_HONOR_TARGET"];const fn=globalThis["KVPV_HONOR_TARGET"]?.["stop"];if(typeof fn!=='function')throw Error("KVPV_HONOR_TARGET.stop is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_HONOR_TARGET_status(...args){const target=globalThis["KVPV_HONOR_TARGET"];const fn=globalThis["KVPV_HONOR_TARGET"]?.["status"];if(typeof fn!=='function')throw Error("KVPV_HONOR_TARGET.status is not available");return Reflect.apply(fn,target,args);}
export function call_KVPV_HONOR_TARGET_sync(...args){const target=globalThis["KVPV_HONOR_TARGET"];const fn=globalThis["KVPV_HONOR_TARGET"]?.["sync"];if(typeof fn!=='function')throw Error("KVPV_HONOR_TARGET.sync is not available");return Reflect.apply(fn,target,args);}
function __captureESMFunction(fn,name){
  if(fn.name!==name)Object.defineProperty(fn,"name",{value:name,configurable:true});
  return fn;
}
let __esmLocal0;
let __esmLocal1;
let __esmLocal2;
let __esmLocal3;
let __esmLocal4;
let __esmLocal5;
let __esmLocal6;
let __esmLocal7;
let __esmLocal8;
let __esmLocal9;
let __esmLocal10;
let __esmLocal11;
let __esmLocal12;
let __esmLocal13;
export {__esmLocal0 as local_anonymous_11_1_0};
export {__esmLocal1 as local_model_1};
export {__esmLocal2 as local_player_2};
export {__esmLocal3 as local_owned_3};
export {__esmLocal4 as local_prop_4};
export {__esmLocal5 as local_inside_5};
export {__esmLocal6 as local_enemyTeam_6};
export {__esmLocal7 as local_validPlayerTarget_7};
export {__esmLocal8 as local_onSearch_8};
export {__esmLocal9 as local_findPlayer_9};
export {__esmLocal10 as local_tick_10};
export {__esmLocal11 as local_status_11};
export {__esmLocal12 as local_stop_12};
export {__esmLocal13 as local_start_13};
export function initialize(){





/* Vinh Du scene 42: native Find Player first, Find Monster fallback.
 * Native UI: selectTar(2,-1); fireGodInfo -> reqSearchObj(1,id).
 * Native search reply 5978 -> setPlayerTarget(id, position).
 */

(__captureESMFunction((__esmLocal0=(() => {

  'use strict';

  const W=window;__getKVPV0()?.stop?.();

  const actor=String(W.__KVPV_OWN_ACTOR_ID||'');

  const S={enabled:true,timer:null,inside:false,entryPlayerPending:false,lastPlayer:-Infinity,pending:null,

    playerSearches:0,monsterSearches:0,searchReplies:0,reason:'waiting_scene_42',lastError:'',listening:false};

  const model=__captureESMFunction((__esmLocal1=(()=>W._Ba?._Zpt?._Jpt?.inst)),"model");

  const player=__captureESMFunction((__esmLocal2=(()=>W._Ba?._rJ?._O$?.ins)),"player");

  const owned=__captureESMFunction((__esmLocal3=(()=>actor&&String(player()?.actorId??'')===actor&&!W.__KVPV_UNIVERSAL_HALTED)),"owned");

  const prop=__captureESMFunction((__esmLocal4=((o,k)=>o?.property?.get?.(k))),"prop");

  function inside(){const id=Number(W._C?._Mn?._Cn?.currentID??W._Ba?._$a?._yo?.ins?.intoSce?.[0]);

    return Number(W._ft?._po?.ins?.getCfgById?.(id)?.[7]??W._Ba?._$a?.SceneUtil?.curScene)===42;}
__esmLocal5=inside;


  

  function enemyTeam(team){const mine=W._Ba?._a1?._h1?.inst?.getMyFightTeamId?.();

    return mine!=null&&team!=null&&Number(team)!==Number(mine);}
__esmLocal6=enemyTeam;


  

  function validPlayerTarget(){const me=W._C?._Ba?.instance?.getRole?.(Number(actor)),c=me?.getComponent?.(W._d?._Yct?._Het),t=c?.target;

    if(!t||t.isValid===false||c.isValidTarget?.()!==true)return false;

    const id=String(prop(t,'id')??t.id??'');if(!id||id===actor)return false;

    const row=model()?.getRankDataById?.(id)??model()?.getRankDataById?.(Number(id));

    return !!row&&!row[0]?.[4]&&enemyTeam(row[0]?.[3]);

  }
__esmLocal7=validPlayerTarget;


  

  function onSearch(reply){if(!S.enabled||!owned()||!inside()||!S.pending)return;

    if(String(reply?.[0])!==S.pending.id||Number(reply?.[2])!==1)return;

    const pos=reply?.[1];if(!Array.isArray(pos)||!pos.every(Number.isFinite)||(!pos[0]&&!pos[1]))return;

    const pending=S.pending;S.pending=null;if(!enemyTeam(pending.team))return;

    model()?.setPlayerTarget?.(reply[0],pos);S.searchReplies++;S.reason='player_search_reply_applied';

  }
__esmLocal8=onSearch;


  

  function findPlayer(){const m=model(),p=player(),god=m?.fireGodInfo;S.lastPlayer=Date.now();S.playerSearches++;S.pending=null;

    if(god?.[0]&&enemyTeam(god[2])){

      const id=god[1],pos=m?.getPlayerPos?.(id);

      if(pos&&typeof m?.setPlayerTarget==='function'){m.setPlayerTarget(id,pos);S.reason='seeking_enemy_player';return;}

      const request=W._Ba?._Zpt?._nZt?.ins?.reqSearchObj;

      if(S.listening&&typeof request==='function'){

        S.pending={id:String(id),team:god[2]};request.call(W._Ba._Zpt._nZt.ins,1,id);S.reason='searching_remote_player';return;

      }

    }

    p?.selectTar?.(2,-1);S.reason='find_player';

  }
__esmLocal9=findPlayer;


  

  function tick(){try{

    if(!S.enabled||!owned()){stop();return;}

    if(!inside()){S.inside=false;S.entryPlayerPending=false;S.pending=null;S.reason='outside_vinh_du';return;}

    if(!S.inside){S.inside=true;S.entryPlayerPending=true;S.lastPlayer=-Infinity;}

    if(player()?.isDead===true){S.reason='waiting_revive';return;}

    if(typeof player()?.selectTar!=='function'){S.reason='waiting_native_target_api';return;}

    // Exactly the native Find Player button, before retaining a target or searching monsters.

    if(S.entryPlayerPending){S.entryPlayerPending=false;S.lastPlayer=Date.now();S.playerSearches++;player().selectTar(2,-1);S.reason='entry_find_player_first';return;}

    if(!model()){S.reason='waiting_native_target_api';return;}

    if(validPlayerTarget()){S.pending=null;S.reason='fighting_enemy_player';return;}

    const now=Date.now();

    if(now-S.lastPlayer>=8000){findPlayer();return;}
    S.reason='waiting_enemy_player';

  }catch(e){S.lastError=String(e?.message||e);S.reason='error';}}
__esmLocal10=tick;


  const observer={};

  

  function status(){return {enabled:S.enabled,inside:inside(),prefer:'players',reason:S.reason,playerSearches:S.playerSearches,

    monsterSearches:S.monsterSearches,searchReplies:S.searchReplies,pendingPlayer:S.pending?.id??null,lastError:S.lastError};}
__esmLocal11=status;


  

  function stop(){S.enabled=false;if(S.timer!=null){(__getKVPV1()?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;}

    if(S.listening)W._Sa?.notify?.off?.(5978,observer,onSearch);S.listening=false;S.pending=null;return {enabled:false};}
__esmLocal12=stop;


  

  function start(){S.enabled=true;if(!S.listening&&typeof W._Sa?.notify?.on==='function'){W._Sa.notify.on(5978,observer,onSearch);S.listening=true;}

    if(S.timer==null){const schedule=__getKVPV1()?.timers?.setInterval??W.setInterval;if(typeof schedule==='function')S.timer=schedule(tick,500);}tick();return status();}
__esmLocal13=start;


  W.KVPV_HONOR_TARGET=Object.freeze({start,stop,status,sync:tick});start();

})),""))();


}
export {getKVPV_HONOR_TARGET} from '../api.mjs';
export const api=Object.freeze({
  get KVPV_HONOR_TARGET(){return globalThis.KVPV_HONOR_TARGET;},
});