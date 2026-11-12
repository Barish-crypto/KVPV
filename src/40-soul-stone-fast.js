
/* Dedicated soul-stone upgrade scanner. Native oneKeyHandler([part,2]); no purchase. */

(() => {

  'use strict';

  const W=window,old=W.KVPV_SOUL_STONE_FAST,carry=old?._handoff?.();old?.stop?.('reload');

  if(W.KVPV_RED_DOT_MODULE?.ownsProgression?.())return;

  const actor=String(W.__KVPV_OWN_ACTOR_ID||''),same=carry?.actor===actor;

  const S={enabled:true,timer:null,pending:same?carry.pending:null,saved:same?carry.saved:undefined,

    workerDrained:false,workerSaved:same?carry.workerSaved:undefined,drained:same?carry.drained:false,requests:same?carry.requests:0,confirmed:same?carry.confirmed:0,reason:'waiting_core',error:''};

  const owned=()=>actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;

  const slots=()=>W._Ba?._ZE?._Qgt?.ins?.getValueByPos?.();

  function signature(part){const s=slots();return s?JSON.stringify(Array.from({length:5},(_,i)=>s.get(part*10+i)??null)):null;}

  function tick(){try{
    if(W.KVPV_MATERIAL_RESERVE?.active===true){if(W.KVPV_UPGRADES?.config)W.KVPV_UPGRADES.config.daHon=false;S.reason='automatic_upgrades_disabled_by_user';stop('user_upgrade_disabled');return;}

    if(!S.enabled)return;
    if(!owned()){stop();return;}

    const cfg=W.KVPV_UPGRADES?.config;if(!cfg)return;

    if(S.saved===undefined)S.saved=cfg.daHon===true;cfg.daHon=false;

    const worker=W.KVPV_BG_RESOURCES,wcfg=worker?.config?.enabled;

    if(wcfg){if(S.workerSaved===undefined)S.workerSaved=wcfg.soulStone===true;wcfg.soulStone=false;}

    if(S.pending){const value=W._Ba?._ZE?._Qgt?.ins?.otherValue?.[0],sig=S.pending.master?(Number.isFinite(Number(value))&&value!=null?String(value):null):signature(S.pending.part);

      if(sig!==null&&sig!==S.pending.before){S.pending=null;S.confirmed++;S.reason='server_slots_changed';}

      else{S.reason='waiting_ack_no_retry';return;}

    }

    if(!S.drained){if(W.KVPV_PARALLEL_ACTIONS?.legacyBusy?.()!==false){S.reason='waiting_old_request';return;}S.drained=true;}

    if(!S.workerDrained){if(worker?.status?.()?.pending?.kind==='soulStone'){S.reason='waiting_previous_stone_worker';return;}S.workerDrained=true;}

    if(Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0)||W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true)return;

    if(W._Ba?._rJ?._O$?.ins?.isDead===true)return;

    const q=W.KVPV_DAILY?.quickState?.(),p=W.KVPV_PARALLEL_ACTIONS;

    if(!p?.canDirectDuringPve?.(q)&&!(q?.running===true&&['rảnh','ranh'].includes(q.job)&&W._Ba?._$a?.SceneUtil?.isCommonScene===true&&W._Ba?._$a?._yo?.ins?.isInMission!==true)){S.reason='waiting_context';return;}

    if(W._Ba?._Xo?._Ko?.instance?.getRpKeyState?.(16)!==true){S.reason='no_red_dot';return;}

    const s=slots(),g=W._ft?._Qyn?.ins,bag=W._Ba?._Ic?._aQ?.ins,rpc=W._Ba?._ZE?._Jgt?.ins;

    const parts=W._Ba?._rJ?._O$?.ins?.equipsDic?.keys;

    if(!s||!Array.isArray(parts)||typeof rpc?.oneKeyHandler!=='function')return;

    const gems=(bag?.getItemsByBagType?.(2)??[]).slice(0,500).map(r=>{

      const id=Number(r?.[0]),c=g?.getCfgById?.(id);return c&&Number(bag?.getItemCountById?.(id))>0?

        {id,type:Number(c[3]),level:Number(c[5])}:null;

    }).filter(c=>c&&Number.isSafeInteger(c.id)&&c.id>0&&Number.isFinite(c.type)&&c.type>0&&Number.isFinite(c.level)&&c.level>0);

    for(const part of parts.slice(0,10).map(Number)){

      if(!Number.isInteger(part)||part<1||part>10)continue;

      // Match the native quick-button choice: insert, replace higher same type, upgrade.

      for(let i=0;i<5;i++){

        const id=s.get(part*10+i),row=id==null?null:g?.getCfgById?.(id);

        const insert=id==null&&(i!==0||W._Ba?._ZE?._Qgt?.ins?.vipIsOpen===true)&&gems.some(c=>i===0||c.type===i);

        const replace=row&&gems.some(c=>c.type===Number(row[3])&&c.level>Number(row[5]));

        if(!insert&&!replace)continue;

        const action=insert?0:1;S.pending={part,action,before:signature(part),at:Date.now()};S.requests++;

        S.reason=insert?'native_insert_sent':'native_replace_sent';rpc.oneKeyHandler([part,action]);return;

      }

      for(let i=0;i<5;i++){

        const id=s.get(part*10+i),row=id==null?null:g?.getCfgById?.(id),need=Number(row?.[6]),have=Number(bag?.getItemCountById?.(id));

        if(!row||!Number.isFinite(Number(row[5]))||!(Number(row[5])<Number(g.stoneMaxLv))||!Number.isSafeInteger(need)||need<=1||!Number.isFinite(have)||have+1<need)continue;

        S.pending={part,before:signature(part),at:Date.now()};S.requests++;S.reason='native_upgrade_sent';rpc.oneKeyHandler([part,2]);return;

      }

    }

    const value=W._Ba?._ZE?._Qgt?.ins?.otherValue,lv=Number(value?.[0]),max=Number(g?.maxLv),row=g?.getUpStoneByLev?.(lv),net=W._v??(typeof _v!=='undefined'?_v:null);

    if(Number.isSafeInteger(lv)&&lv>=0&&lv<max&&value?.[1]&&Number(row?.[1])>0&&Number.isFinite(Number(row[1]))&&Number(value[3])>=Number(row[1])&&typeof net?.ins?.send==='function'){

      S.pending={master:true,before:String(lv),at:Date.now()};S.requests++;S.reason='native_master_sent';net.ins.send('TBhu',null);return;

    }S.reason='no_upgrade_materials';

  }catch(e){S.error=String(e);S.reason='error_no_retry';}}

  function stop(reason='manual'){S.enabled=false;if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;

    if(reason!=='reload'&&!S.pending&&owned()&&S.saved!==undefined&&W.KVPV_UPGRADES?.config)W.KVPV_UPGRADES.config.daHon=S.saved;

    if(reason!=='reload'&&!S.pending&&owned()&&S.workerSaved!==undefined&&W.KVPV_BG_RESOURCES?.config?.enabled)W.KVPV_BG_RESOURCES.config.enabled.soulStone=S.workerSaved;

  }

  W.KVPV_SOUL_STONE_FAST=Object.freeze({sync:tick,stop,status:()=>({enabled:S.enabled,pollMs:1,reason:S.reason,requests:S.requests,confirmed:S.confirmed,pending:S.pending,error:S.error,allowKNB:false}),

    _handoff:()=>({actor,pending:S.pending,saved:S.saved,workerSaved:S.workerSaved,drained:S.drained,requests:S.requests,confirmed:S.confirmed})});

  S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,50);tick();

})();

