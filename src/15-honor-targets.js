




/* Vinh Du scene 42: native Find Player first, Find Monster fallback.
 * Native UI: selectTar(2,-1); fireGodInfo -> reqSearchObj(1,id).
 * Native search reply 5978 -> setPlayerTarget(id, position).
 */

(() => {

  'use strict';

  const W=window;W.KVPV_HONOR_TARGET?.stop?.();

  const actor=String(W.__KVPV_OWN_ACTOR_ID||'');

  const S={enabled:true,timer:null,inside:false,entryPlayerPending:false,lastPlayer:-Infinity,pending:null,

    playerSearches:0,monsterSearches:0,searchReplies:0,reason:'waiting_scene_42',lastError:'',listening:false};

  const model=()=>W._Ba?._Zpt?._Jpt?.inst;

  const player=()=>W._Ba?._rJ?._O$?.ins;

  const owned=()=>actor&&String(player()?.actorId??'')===actor&&!W.__KVPV_UNIVERSAL_HALTED;

  const prop=(o,k)=>o?.property?.get?.(k);

  function inside(){const id=Number(W._C?._Mn?._Cn?.currentID??W._Ba?._$a?._yo?.ins?.intoSce?.[0]);

    return Number(W._ft?._po?.ins?.getCfgById?.(id)?.[7]??W._Ba?._$a?.SceneUtil?.curScene)===42;}

  

  function enemyTeam(team){const mine=W._Ba?._a1?._h1?.inst?.getMyFightTeamId?.();

    return mine!=null&&team!=null&&Number(team)!==Number(mine);}

  

  function validPlayerTarget(){const me=W._C?._Ba?.instance?.getRole?.(Number(actor)),c=me?.getComponent?.(W._d?._Yct?._Het),t=c?.target;

    if(!t||t.isValid===false||c.isValidTarget?.()!==true)return false;

    const id=String(prop(t,'id')??t.id??'');if(!id||id===actor)return false;

    const row=model()?.getRankDataById?.(id)??model()?.getRankDataById?.(Number(id));

    return !!row&&!row[0]?.[4]&&enemyTeam(row[0]?.[3]);

  }

  

  function onSearch(reply){if(!S.enabled||!owned()||!inside()||!S.pending)return;

    if(String(reply?.[0])!==S.pending.id||Number(reply?.[2])!==1)return;

    const pos=reply?.[1];if(!Array.isArray(pos)||!pos.every(Number.isFinite)||(!pos[0]&&!pos[1]))return;

    const pending=S.pending;S.pending=null;if(!enemyTeam(pending.team))return;

    model()?.setPlayerTarget?.(reply[0],pos);S.searchReplies++;S.reason='player_search_reply_applied';

  }

  

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

  const observer={};

  

  function status(){return {enabled:S.enabled,inside:inside(),prefer:'players',reason:S.reason,playerSearches:S.playerSearches,

    monsterSearches:S.monsterSearches,searchReplies:S.searchReplies,pendingPlayer:S.pending?.id??null,lastError:S.lastError};}

  

  function stop(){S.enabled=false;if(S.timer!=null){(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;}

    if(S.listening)W._Sa?.notify?.off?.(5978,observer,onSearch);S.listening=false;S.pending=null;return {enabled:false};}

  

  function start(){S.enabled=true;if(!S.listening&&typeof W._Sa?.notify?.on==='function'){W._Sa.notify.on(5978,observer,onSearch);S.listening=true;}

    if(S.timer==null){const schedule=W.KVPV_V1?.timers?.setInterval??W.setInterval;if(typeof schedule==='function')S.timer=schedule(tick,500);}tick();return status();}

  W.KVPV_HONOR_TARGET=Object.freeze({start,stop,status,sync:tick});start();

})();

