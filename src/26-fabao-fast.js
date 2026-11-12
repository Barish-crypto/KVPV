





(() => {

  'use strict';

  const W=window,old=W.KVPV_FABAO_FAST,carry=old?._handoff?.();old?.stop?.();

  const actor=String(W.__KVPV_OWN_ACTOR_ID||''),same=carry?.actor===actor;

  const S={enabled:true,timer:null,pending:same?carry.pending:null,lastSent:same?carry.lastSent:null,

    ownedPanel:same?carry.ownedPanel:false,nextOpen:0,requests:same?carry.requests:0,

    confirmed:same?carry.confirmed:0,reason:'waiting',lastError:''};

  const model=()=>W._Ba?._rnt?._vnt?.ins,ui=()=>W._ft?._Y4n?.ins;

  const owned=()=>!!actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;

  function items(){const m=model(),c=W._ft?._s$?.ins,b=W._Ba?._Ic?._aQ?.ins,all=new Map();

    for(let group=0;group<4;group++){

      const rows=m?.getAmuletRefineQuaArr?.(group);if(!Array.isArray(rows))continue;

      for(const raw of rows){const id=Number(raw?.[0]),level=Number(m?.getFaBaoLv?.(id));

        if(!Number.isSafeInteger(id)||id<=0||!Number.isSafeInteger(level)||level<0)continue;

        const row=c?.getCfgByIdLevel?.(id,level),max=Number(c?.getMaxLvById?.(id));

        const fragment=Number(row?.[4]),cost=Number(row?.[3]?.[1]);

        const count=Number(b?.getItemCountById?.(id)),parts=fragment>0?Number(b?.getItemCountById?.(fragment)):NaN;

        const total=count+parts;

        const eligible=level>0&&Number.isFinite(max)&&level<max&&Number.isSafeInteger(cost)&&cost>0&&

          Number.isFinite(count)&&count>=0&&Number.isFinite(parts)&&parts>=0&&total>=cost;

        all.set(id,{id,level,group,max,cost,total,eligible});

      }

    }

    return [...all.values()].sort((a,b)=>a.id-b.id);

  }

  function panel(){const p=ui()?.getPanelById?.(46),Type=W._Ba?._rnt?._GDn;

    return typeof Type==='function'&&p instanceof Type&&ui()?.isOpened?.(46)&&p.parent&&p.visible!==false?p:null;}

  function closeOwnPanel(){if(S.ownedPanel&&owned()&&panel())ui()?.close?.(46);S.ownedPanel=false;}

  function idle(){if(Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0))return false;const q=W.KVPV_DAILY?.quickState?.(),lease=W.KVPV?.core?.scene?.status?.();

    return W._Ba?._$a?.SceneUtil?.isCommonScene===true&&W._Ba?._$a?._yo?.ins?.isInMission!==true&&

      W._Ba?._rJ?._O$?.ins?.isDead!==true&&(!q?.job||['rảnh','ranh'].includes(q.job))&&!lease?.owner&&

      !W.KVPV_HITRUN1?.status?.(false)?.running&&!W.KVPV_UPGRADES?.busy?.();

  }

  function tick(){try{
    if(W.KVPV_MATERIAL_RESERVE?.active===true){S.reason='automatic_upgrades_disabled_by_user';stop();return;}

    if(!S.enabled)return;// Explicit Fa Bao opt-in; native panel must still validate sufficient owned materials.
    if(!owned()){stop();return;}

    if(W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true){S.reason='priority_popup';return;}

    const list=items(),signature=JSON.stringify(list.map(x=>[x.id,x.level,x.total]));

    if(S.pending){

      const reply=model()?.RefineAmuletRep,newReply=reply&&reply!==S.pending.reply;

      const increased=list.some(x=>x.level>Number(S.pending.levels[x.id]??x.level));

      if(newReply&&Number(reply[0])!==0){S.reason='server_rejected';S.lastError='Phap Bao result '+reply[0];return;}

      if(newReply&&Number(reply[0])===0&&increased){S.confirmed++;S.pending=null;S.reason='upgrade_confirmed';}

      else {S.reason=Date.now()-S.pending.at>15000?'waiting_upgrade_ack_no_retry':'waiting_upgrade_ack';return;}

    }

    const candidate=list.find(x=>x.eligible);

    if(!candidate){S.reason='no_owned_materials_or_max_level';closeOwnPanel();return;}

    if(!idle()){S.reason='other_activity';return;}

    if(S.lastSent===signature){S.reason='already_requested_this_state';return;}

    let p=panel();

    if(!p){if(Date.now()>=S.nextOpen){S.nextOpen=Date.now()+5000;

        if(ui()?.isOpened?.(46)!==true){S.ownedPanel=true;ui()?.open?.(46);}}

      S.reason='opening_fabao';return;}

    if(!p._FSn){S.reason='waiting_native_tabs';return;}

    if(Number(p._FSn.selIdx)!==candidate.group){p._FSn.selIdx=candidate.group;S.reason='selecting_fabao_group';return;}

    if(!list.some(x=>x.id===Number(p._IDn)&&x.eligible)){

      const index=p._wgn?.array?.findIndex?.(row=>Number(row?.[0]?.[0])===candidate.id);

      if(Number.isInteger(index)&&index>=0)p._wgn.selectedIndex=index;

      S.reason='selecting_upgradeable_fabao';return;

    }

    const native=W._Ba?._rnt?._GDn?.prototype?._BDn;

    if(p._BDn!==native||typeof native!=='function'){S.reason='native_handler_changed';return;}

    

    const chosen=list.find(x=>x.id===Number(p._IDn));

    if(!chosen?.eligible||p._EDn!==false||p.allupBtn?.visible===false||p.allupBtn?.disabled||p.allupBtn?.gray||

      Number(p._kwn)!==chosen.cost||Number(p._Twn)<chosen.cost){S.reason='waiting_native_upgrade_selection';return;}

    S.pending={at:Date.now(),reply:model()?.RefineAmuletRep,levels:Object.fromEntries(list.map(x=>[x.id,x.level]))};

    S.lastSent=signature;S.requests++;S.reason='quick_upgrade_sent';native.call(p);

  }catch(e){S.lastError=String(e);S.reason='error';W.KVPV_V1?.diagnostics?.record?.(e);}}

  function stop(){S.enabled=false;if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;}

  function start(){if(W.KVPV_MATERIAL_RESERVE?.active===true){S.enabled=false;S.reason='automatic_upgrades_disabled_by_user';return false;}if(S.timer!==null)return;S.enabled=true;

    S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,350);tick();}

  W.KVPV_FABAO_FAST=Object.freeze({start,stop,sync:tick,inspect:items,

    status:()=>({enabled:S.enabled,actor,reason:S.reason,requests:S.requests,confirmed:S.confirmed,

      pending:S.pending?{at:S.pending.at}:null,eligible:items().filter(x=>x.eligible),lastError:S.lastError,allowKNB:false}),

    _handoff:()=>({actor,pending:S.pending,lastSent:S.lastSent,ownedPanel:S.ownedPanel,requests:S.requests,confirmed:S.confirmed})});

  start();

})();

