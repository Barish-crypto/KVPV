
/* Context rules grounded in native state. No new RPC, UI click, purchase or chat. */

(() => {

  'use strict';

  const W=window,actor=String(W.__KVPV_OWN_ACTOR_ID||'');

  function activity(){

    if(!actor||actor!==String(W._Ba?._rJ?._O$?.ins?.actorId??'')||W.__KVPV_UNIVERSAL_HALTED)return {kind:'UNAVAILABLE',direct:false,reason:'actor_or_session'};

    if(W._Ba?._rJ?._O$?.ins?.isDead===true)return {kind:'DEAD',direct:false,reason:'wait_revive'};

    const q=W.KVPV_DAILY?.quickState?.();

    if(['entering','exiting','matching','result'].includes(q?.step))return {kind:'TRANSITION',direct:false,reason:q.step};

    const ui=W._ft?._Y4n?.ins,Type=W._Ba?._We?._p9i,p=ui?.getPanelById?.(297),m=W._Ba?._We?._eJ?.inst;

    const mission=W._Ba?._$a?._yo?.ins?.isInMission===true;

    if(mission&&typeof Type==='function'&&p instanceof Type&&p.parent&&p.visible!==false&&ui?.isOpened?.(297)===true&&Number(m?.cpInfo?.[0])>0)

      return {kind:'TRAN_MA',direct:q?.running===true,reason:'native_panel_and_active_timer',remainingMs:Number(m.cpInfo[0]),damage:String(m.ht??'').slice(0,80)};

    if(q?.running===true&&q.step==='fighting')return {kind:'DAILY_FIGHT',direct:true,reason:String(q.job??'').slice(0,80)};

    if(!mission&&W._Ba?._$a?.SceneUtil?.isCommonScene===true)return {kind:'COMMON',direct:false,reason:'idle_rules_apply'};

    return {kind:'OTHER_MAP',direct:false,reason:'use_existing_combat_scope_rules'};

  }

  function plan(){const context=activity(),eye=W.KVPV_WORLD_EYE?.status?.(),actions=[];

    for(const a of (eye?.actions??[]).slice(0,80))actions.push({panel:a.panel,key:a.key,kind:a.kind,

      decision:a.kind==='manual_control'?'manual_only':a.kind==='paid_or_currency'?'blocked_currency':!a.ready?'wait_native_condition':

        a.kind==='navigate'&&context.kind!=='COMMON'?'defer_until_activity_finishes':'match_verified_executor'});

    return {context,policy:{keepCurrentActivity:context.kind!=='COMMON',directRewardsAndUpgrades:context.direct,

      noKNB:true,unknownActions:'inspect_only',sceneChanges:'existing_arbiter'},actions};

  }

  W.KVPV_CONTEXT_BRAIN=Object.freeze({activity,plan,status:plan});

})();

