
/* First verified red-dot route: Luyen Khi -> soul forge (action 192, red 156).
 * UI navigation/material selection only; existing resource worker owns the RPC. */

(() => {

  'use strict';

  const W=window,old=W.KVPV_RED_NAVIGATOR,c=old?._handoff?.();old?.stop?.();

  const actor=String(W.__KVPV_OWN_ACTOR_ID||''),same=c?.actor===actor;
  const redActive=id=>W.KVPV_RED_DOT?.isActive?.(id)===true||W._Ba?._Xo?._Ko?.instance?.getRpKeyState?.(id)===true;

  const S={timer:null,enabled:true,opened:same?c.opened:null,pending:same?c.pending:null,confirmed:same?c.confirmed:0,reason:'waiting',error:'',hierarchy:null};

  const owned=()=>actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;

  const model=()=>W._Ba?._eW?._pEt?.inst;

  const signature=()=>Array.isArray(model()?.zhList)?JSON.stringify(model().zhList.map(r=>r?[r[0],r[1],r[2]]:null)):null;

  const strengthSignature=()=>{const d=W._Ba?._Agt?._Rgt?.ins?.partLev;return Array.isArray(d?.keys)?JSON.stringify(d.keys.slice(0,10).map(k=>[k,d.get(k)])):null;};

  function findPanel(ui){const Type=W._Ba?._eW?._NTi;if(typeof Type!=='function')return null;

    const queue=Object.keys(ui?.openTable??ui?._H$t??{}).slice(0,80).filter(id=>ui.isOpened?.(Number(id))).map(id=>ui.getPanelById?.(Number(id))),seen=new Set();

    for(let n=0;queue.length&&n<240;n++){const p=queue.shift();if(!p||seen.has(p)||p.visible===false||p.destroyed)continue;seen.add(p);

      if(p instanceof Type&&p.parent)return p;

      const children=p._children??p._childs;if(Array.isArray(children))queue.push(...children.slice(0,40));

    }return null;

  }

  function hierarchyFor(redId){
    const tabs=W._Ba?._xf?.BotmTabData?.instance,panels=tabs?.getPanelIdArr?.();
    if(!Array.isArray(panels))return null;
    for(let order=0;order<panels.length;order++){
      const panelId=panels[order];
      const keys=tabs.getRpsByPanelId?.(panelId),row=tabs.getTabDataByPanelId?.(panelId);
      if(Array.isArray(keys)&&keys.some(id=>Number(id)===Number(redId))&&Number(row?.[3])>0)
        return {redId:Number(redId),panelId:Number(panelId),enterId:Number(row[3]),order};
    }
    return null;
  }
  function openRedPanel(redId){
    const route=hierarchyFor(redId),nav=W._Ba?._xf?._Kf?.instance;
    if(!route||typeof nav?.openPanelByPanelId!=='function')return null;
    nav.openPanelByPanelId(route.panelId);S.hierarchy=route;return route;
  }
  function tick(){try{

    if(!S.enabled)return;if(!owned()){stop();return;}

    const sig=signature();if(S.pending?.kind==='gearCraft'){

      const verified=Number(W.KVPV_BG_RESOURCES?.status?.()?.stats?.gearCraft?.verified);

      if(Number.isFinite(verified)&&verified>S.pending.verified){S.pending=null;S.confirmed++;}else{S.reason='waiting_craft_worker_verification';return;}

    }

    if(S.pending){const current=S.pending.kind==='strength'?strengthSignature():sig,before=S.pending.kind==='strength'?S.pending.before:S.pending;

      if(current!==null&&current!==before){S.pending=null;S.confirmed++;}else{S.reason='waiting_existing_worker_ack';return;}}

    if(Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)){S.reason='user_using_ui';return;}

    const q=W.KVPV_DAILY?.quickState?.(),worker=W.KVPV_BG_RESOURCES,state=worker?.status?.();

    if(!worker||state?.running!==true||state.active!==true){S.reason='worker_disabled_or_halted';return;}

    if(state.busy){S.reason='existing_worker_busy';return;}

    if(q?.running!==true||!['rảnh','ranh'].includes(q.job)||W._Ba?._$a?.SceneUtil?.isCommonScene!==true||W._Ba?._$a?._yo?.ins?.isInMission===true||W._Ba?._rJ?._O$?.ins?.isDead===true||W.KVPV?.core?.scene?.status?.()?.owner){S.reason='defer_ui_until_idle';return;}

    if(W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true)return;

    if(worker.config?.enabled?.gearCraft===true&&!state.halted?.gearCraft&&redActive(249)){

      W.KVPV_CRAFT_LOW?.sync?.();

      const approved=worker.config?.gearCraft?.approvedRecipeIds;

      const candidate=Array.isArray(approved)&&approved.length?worker.preview?.()?.gearCraft:null;

      if(candidate?.recipe&&approved.includes(candidate.recipe)){

        const row=W._ft?._Cji?.ins?.getCfgById?.(candidate.recipe),category=Number(row?.[3]?.[0]),ui=W._ft?._Y4n?.ins,Type=W._Ba?._k6?._Rji;

        if([807,808].includes(category)&&typeof Type==='function'){

          const key='craft/'+candidate.recipe+'/'+JSON.stringify((candidate.materialIds??[]).map(id=>W._Ba?._Ic?._aQ?.ins?.getItemCountById?.(id)));

          if(ui?.isOpened?.(413)!==true){const cfg=ui?.getWindowConfigById?.(413);

            if(cfg?.[2]!==Type||Number(cfg?.[5])!==249){S.reason='unverified_craft_route';return;}

            if(S.opened!==key){S.opened=key;if(!openRedPanel(249))ui.openByActionId?.(249);}S.reason='opening_craft_branch';return;

          }

          const panel=ui.getPanelById?.(413),m=W._Ba?._k6?._rRt?.ins;

          if(!(panel instanceof Type)||!panel.parent||panel.visible===false){S.reason='waiting_craft_panel';return;}

          if(Number(m?.tClsNow)!==category){

            const native=Type.prototype.startShowUIByType;

            if(panel.startShowUIByType!==native||typeof native!=='function'){S.reason='unverified_craft_selector';return;}

            native.call(panel,category===807?10:11);S.reason='select_craft_subcategory';return;

          }

          const verified=Number(state.stats?.gearCraft?.verified??0);worker.tick?.();

          if(worker.status?.()?.pending?.kind==='gearCraft'){S.pending={kind:'gearCraft',verified};S.reason='craft_worker_sent';}else S.reason='waiting_worker_turn';return;

        }

      }

    }

  }catch(e){S.error=String(e);S.reason='error';}}

  function stop(){S.enabled=false;if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;}

  W.KVPV_RED_NAVIGATOR=Object.freeze({sync:tick,stop,hierarchyFor,openRedPanel,status:()=>({enabled:S.enabled,route:'native-panel-chain-parent-child; action249/gearCraft;red15/action17/strength;red16/action18/soulStone;red156/action192/soulForge',hierarchy:S.hierarchy,reason:S.reason,pending:!!S.pending,confirmed:S.confirmed,error:S.error}),

    _handoff:()=>({actor,opened:S.opened,pending:S.pending,confirmed:S.confirmed})});

  tick();

})();

