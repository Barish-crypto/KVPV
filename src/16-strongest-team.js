




/* Strongest Team: native scene82, _T3._E2n.enterScene() -> map8201,1.
 * Buttons mirrored from native battle UI: selectTagetId / bossId / collecting.
 * Predictions, paid support and worship are deliberately not automated.
 */

(() => {

  'use strict';

  const W=window;W.KVPV_STRONGEST_TEAM?.stop?.();

  const actor=String(W.__KVPV_OWN_ACTOR_ID||'');

  const S={enabled:true,timer:null,phase:'WAITING',reason:'starting',day:'',attempts:0,entries:0,

    lastEntry:-Infinity,lastRefresh:-Infinity,lastAction:-Infinity,closedAt:null,session:false,lease:false,stageAuto:null,

    requested:new Set(),pending:new Set(),rewardConfirmed:0,lastError:'',history:[]};

  const model=()=>W._Ba?._T3?._G_t?.instance;

  const native=()=>W._Ba?._T3?._E2n?.ins;

  const user=()=>W._Ba?._rJ?._O$?.ins;

  const owned=()=>actor&&actor===String(user()?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;

  const prop=(o,k)=>o?.property?.get?.(k);

  function data(){const api=W._Ba?._T3,m=model(),id=Number(W._C?._Mn?._Cn?.currentID??W._Ba?._$a?._yo?.ins?.intoSce?.[0]);

    const type=Number(W._ft?._po?.ins?.getCfgById?.(id)?.[7]??W._Ba?._$a?.SceneUtil?.curScene);

    const team=W._Ba?._a1?._h1?.inst?.getMyFightTeamId?.();

    const server=W._Ba?._sst?._ist?.inst?.getCpSceneStateByType?.(82);

    const time=Number(W._Sa?.svrTime),next=Number(m?.reEnterTime);

    return {map:id,type,inside:type===82,open:Number(server?.[2])===2,teamId:team??null,

      eligible:!!team&&api?._d2n?.ins?.isAlive?.(team)===true&&api?._b2n?.ins?.isHaveWiner===false,

      cooldownReady:Number.isFinite(time)&&Number.isFinite(next)&&next<=time,

      matchStage:api?._d2n?.ins?.curMatchStage??null,matchStageName:api?.MatchStage?.[api?._d2n?.ins?.curMatchStage]??null,score:Number(m?.score)||0,

      kills:Number(m?.killNum)||0,helpKills:Number(m?.helpKillNum)||0,myDamage:Number(m?.myDamage)||0};}

  

  function note(kind){S.history.push({at:Date.now(),kind});if(S.history.length>50)S.history.shift();}

  function release(){if(S.lease)W.KVPV?.core?.scene?.release?.('combat');S.lease=false;S.session=false;S.closedAt=null;

    const stage=W._Ba?._Co?._Mo?.ins;if(owned()&&S.stageAuto===true&&stage?.auto===false&&!W.KVPV_EVENT_PRIORITY?.hold?.())stage.auto=true;S.stageAuto=null;}

  function reserve(){const arbiter=W.KVPV?.core?.scene,stage=W._Ba?._Co?._Mo?.ins;

    if(W.KVPV_HITRUN1?.status?.(false)?.running||typeof arbiter?.acquire!=='function')return false;

    if(S.stageAuto===null)S.stageAuto=stage?.auto===true;if(stage?.auto===true)stage.auto=false;

    if(arbiter.acquire('combat','chien-doi-manh-nhat')!==true){release();return false;}S.lease=true;return true;}

  

  function rewards(){const m=model();

    for(const id of [...S.pending])if(Number(m?.getStateById?.(id))===2){S.pending.delete(id);S.rewardConfirmed++;note('REWARD-CONFIRMED-'+id);}

    if(typeof native()?.GainStrongestTeamReward!=='function')return;

    for(const kind of [1,2,3,4,6,7])for(const row of W._ft?._Cdh?.ins?.getCfgsByType?.(kind)||[]){

      const id=Number(row?.[0]);if(!Number.isSafeInteger(id)||id<=0||Number(m?.getStateById?.(id))!==1||S.requested.has(id))continue;

      S.requested.add(id);S.pending.add(id);native().GainStrongestTeamReward(id);note('REWARD-REQUEST-'+id);return;

    }

  }

  

  function chooseAction(){const m=model(),p=user(),world=W._C?._Ba?.instance;

    if(!m||typeof p?.selectTar!=='function')return;

    // Keep native gathering progress instead of cancelling it every poll.

    if(m.collecting&&m.collectEntiyVo){S.reason='native_collecting';return;}

    const enemies=m.getNearPlayerRank?.()||[];

    const enemy=enemies.find(vo=>vo&&String(vo.objId)!==actor&&m.isMyTeam?.(vo.color)===false&&

      world?.getRole?.(vo.objId)?.isValid!==false&&world?.getRole?.(vo.objId));

    if(enemy){

      if(String(m.selectTagetId)!==String(enemy.objId)){m.resetState?.();m.collectEntiyVo=null;m.selectTagetId=enemy.objId;p.selectTar(2,enemy.objId);note('TARGET-ENEMY');}

      S.reason='native_enemy_target';return;

    }

    const nodes=m.getCollectInfo?.()||[],bossNode=nodes.find(x=>x&&!x.areaId);

    const boss=bossNode&&world?.findNearMonster?.(0,0,Number.MAX_VALUE,bossNode.npcId);

    if(boss&&boss.isValid!==false){const hp=prop(boss,'hp'),id=prop(boss,'id')??boss.id;

      if(id!=null&&(!Array.isArray(hp)||Number(hp[0])>0)){

        if(String(m.bossId)!==String(id)){m.resetState?.();m.collectEntiyVo=null;m.bossId=id;p.selectTar(1,id);note('TARGET-BOSS');}

        S.reason='native_boss_target';return;

      }

    }

    const ownNode=nodes.find(x=>x?.areaId&&m.isMyTeam?.(x.color)===true);

    if(ownNode){m.selectTagetId=-1;m.bossId=-1;m.collecting=true;m.collectEntiyVo=ownNode;S.reason='native_collect_own_area';note('COLLECT-OWN');return;}

    m.resetState?.();m.collectEntiyVo=null;m.findTarget=true;p.selectTar(2,-1);S.reason='native_find_enemy';note('FIND-ENEMY');

  }

  function refresh(){if(Date.now()-S.lastRefresh<30000)return;S.lastRefresh=Date.now();

    native()?.GetStrongestTeamEnterTime?.();native()?.GetStrongestTeamReward?.(0);}

  

  function tick(){if(W.KVPV_ENTRY_POLICY?.manual===true)return;try{

    if(!S.enabled||!owned()){stop();return;}

    const d=data(),time=Date.now(),day=W.KVPV_DAILY_CLOCK?.key?.()??new Date(Date.now()+2*3600000).toISOString().slice(0,10);

    if(day!==S.day){S.day=day;S.attempts=0;S.requested=new Set(S.pending);}

    if(d.inside){

      if(!S.session){if(!reserve()){S.reason='scene_reserved';return;}S.session=true;S.entries++;S.lastAction=-Infinity;native()?.StrongestTeamScoreRank?.();note('ENTRY-CONFIRMED');}

      W.KVPV?.core?.scene?.renew?.('combat');refresh();rewards();

      if(S.phase==='EXITING'){S.reason='waiting_exit_confirmation';return;}

      S.phase='ACTIVE';

      if(!d.open){

        if(S.closedAt===null)S.closedAt=time;S.reason='server_closed_waiting_rewards';

        const grace=S.pending.size?150000:90000;

        if(time-S.closedAt>=grace&&typeof W._Ba?._sst?._Cht?.inst?.rqEtScene==='function'){

          S.phase='EXITING';W._Ba._sst._Cht.inst.rqEtScene(0);note('EXIT-REQUEST');

        }return;

      }else S.closedAt=null;

      if(user()?.isDead===true){S.reason='waiting_revive';return;}

      if(time-S.lastAction>=4000){S.lastAction=time;chooseAction();}return;

    }

    if(S.session){release();S.phase='WAITING';note('LEFT-EVENT');}

    if(S.phase==='ENTERING'){

      if(time-S.lastEntry<25000){S.reason='waiting_scene_82';return;}

      release();S.phase='WAITING';S.reason='entry_not_confirmed';note('ENTRY-TIMEOUT');

    }

    const job=W.KVPV_DAILY?.quickState?.()?.job;

    if((job&&job!=='rảnh'&&job!=='ranh')||W.KVPV_TQ_SCOPE?.inside?.()===true){S.reason='other_job_active';return;}

    if(W._Ba?._$a?.SceneUtil?.isCommonScene!==true){S.reason='outside_common_scene';return;}

    rewards();

    if(!d.open){S.reason='waiting_server_scene_82_open';return;}

    refresh();

    if(!d.eligible||!d.cooldownReady||user()?.isDead===true){S.reason='team_not_eligible_or_cooldown';return;}

    if(time-S.lastEntry<30000||S.attempts>=15){S.reason='entry_retry_limit';return;}

    if(typeof native()?.enterScene!=='function'||!reserve()){S.reason='entry_api_or_scene_unavailable';return;}

    S.lastEntry=time;S.attempts++;S.phase='ENTERING';S.reason='waiting_scene_82';note('ENTRY-REQUEST');native().enterScene();

  }catch(e){S.lastError=String(e?.message||e);S.reason='error';}}

  

  function status(){return {...data(),enabled:S.enabled,phase:S.phase,reason:S.reason,entryAttempts:S.attempts,

    confirmedEntries:S.entries,rewardPending:S.pending.size,rewardConfirmed:S.rewardConfirmed,lastError:S.lastError,history:S.history.slice()};}

  

  function stop(){S.enabled=false;if(S.timer!=null){(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;}

    release();S.phase='OFF';S.reason='stopped';return {enabled:false};}

  

  function start(){S.enabled=true;if(S.timer==null){const schedule=W.KVPV_V1?.timers?.setInterval??W.setInterval;if(typeof schedule==='function')S.timer=schedule(tick,1000);}tick();return status();}

  W.KVPV_STRONGEST_TEAM=Object.freeze({start,stop,status,sync:tick});start();

})();

