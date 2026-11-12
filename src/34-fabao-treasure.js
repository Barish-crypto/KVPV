



(() => {

  'use strict';

  const W=window,old=W.KVPV_FABAO_TREASURE,carry=old?._handoff?.();old?.stop?.('reload');

  const actor=String(W.__KVPV_OWN_ACTOR_ID||''),same=carry?.actor===actor,id='fabao_treasure_keys';

  const S={enabled:true,timer:null,pending:same?carry.pending:null,ownedPanel:same?carry.ownedPanel:false,

    requests:same?carry.requests:0,confirmed:same?carry.confirmed:0,nextOpen:0,reason:'waiting_goal',registered:false,lastError:''};

  const catalog=new Map([[4,{type:4,panel:113,name:'Pháp Bảo',allowed:()=>need(),itemKnown:id=>(W.KVPV_FABAO_FAST?.inspect?.()??[]).some(x=>x.id===id)||W._et?.getTypeById?.(id)===6}]]);

  const m=()=>W._Ba?._ze?._Ve?.ins,bag=()=>W._Ba?._Ic?._aQ?.ins,ui=()=>W._ft?._Y4n?.ins;

  const owned=()=>actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;

  function need(){const p=W.KVPV_PROGRESS_PLANNER?.inspect?.();return !!p?.goal&&p.remaining>0&&!p.selected;}

  function allowed(type){return catalog.get(type)?.allowed?.()===true;}

  function draw(type=4){const model=m(),condition=W._ft?._oZ?.ins?.getItemConditionByGrad?.(type,0),first=model?.isFirst?.(type),

    key=Number(condition?.[0]),cost=Number(condition?.[1]),count=Number(bag()?.getItemCountById?.(key));

    const free=first===true||first===1,known=[true,false,0,1].includes(first)&&Number.isSafeInteger(key)&&key>0&&Number.isSafeInteger(cost)&&cost>0&&Number.isFinite(count)&&count>=0;

    return {type,ready:known&&model?.isFcOpenByType?.(type)===true&&typeof model?.c_sendXunBao==='function'&&(free||count>=cost),key,cost,count,free};

  }

  function warehouse(type=4){const rows=bag()?.getItemsByBagType?.(4);

    return (Array.isArray(rows)?rows:[]).filter(r=>Array.isArray(r)&&r[2]!=null&&Number(r[1])>0&&catalog.get(type)?.itemKnown?.(Number(r[0]))===true);

  }

  function next(){const list=[...catalog.keys()].filter(allowed);

    for(const type of list)if(warehouse(type).length)return {type,kind:'withdraw'};

    for(const type of list)if(draw(type).ready)return {type,kind:'draw'};

    return null;

  }

  function panel(){const p=ui()?.getPanelById?.(114),Type=W._Ba?._ze?._rui;

    return typeof Type==='function'&&p instanceof Type&&ui()?.isOpened?.(114)&&p.parent&&p.visible!==false?p:null;

  }

  function safe(){if(Date.now()<Number(W.__KVPV_USER_UI_UNTIL||0))return false;const d=W.KVPV_DAILY?.quickState?.();return owned()&&

    W._Ba?._$a?.SceneUtil?.isCommonScene===true&&W._Ba?._$a?._yo?.ins?.isInMission!==true&&W._Ba?._rJ?._O$?.ins?.isDead!==true&&

    (!d?.job||['rảnh','ranh'].includes(d.job))&&!W.KVPV?.core?.scene?.status?.()?.owner&&!W.KVPV_HITRUN1?.status?.(false)?.running;

  }

  function observe(){const p=S.pending;if(!p)return;

    let done=false;

    if(p.kind==='draw'){

      const reply=m()?.xbRep,changed=reply&&reply!==p.reply&&Number(reply[0])===(p.type??4);

      if(changed&&Number(reply[1])!==0){S.reason='treasure_server_rejected_no_retry';return;}

      const d=draw(p.type??4);done=changed&&Number(reply[1])===0&&(p.free&&!d.free||!p.free&&d.count<=p.count-p.cost);

    }else{

      const rows=bag()?.getItemsByBagType?.(4);

      done=Array.isArray(rows)&&p.uids.every(uid=>!rows.some(r=>String(r?.[2])===uid))&&

        Object.entries(p.before).every(([id,n])=>Number(bag()?.getItemCountById?.(Number(id)))>=n+p.amount[id]);

    }

    if(done){S.pending=null;S.confirmed++;S.reason='server_confirmed';}

    else S.reason=Date.now()-p.at>30000?'waiting_ack_no_retry':'waiting_server_ack';

  }

  function signature(rows){return JSON.stringify(rows.map(r=>[r[0],r[1],String(r[2])]));}

  function probe(){if(!S.enabled||!owned())return {ready:false};observe();

    if(S.pending||(W.KVPV_FREE_TREASURE?.busy?.()||W.KVPV_FESTIVAL_FREE?.busy?.())||!safe()||W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true)return {ready:false};

    const selected=next();if(!selected)return {ready:false};const {type}=selected,rows=warehouse(type);

    if(rows.length)return {ready:!!panel(),type,kind:'withdraw',signature:type+'/'+signature(rows)};

    const d=draw(type),panelId=catalog.get(type).panel,p=ui()?.getPanelById?.(panelId);

    return {...d,ready:d.ready&&ui()?.isOpened?.(panelId)===true&&p?._Qh===type&&!!p.parent&&p.visible!==false,kind:'draw',signature:JSON.stringify([type,d.key,d.cost,d.count,d.free])};

  }



  function run(before){const q=probe();if(!q.ready||q.signature!==before.signature||q.kind!==before.kind||q.type!==before.type)throw Error('Fabao treasure state changed');

    if(q.kind==='draw'){

      S.pending={kind:'draw',type:q.type,at:Date.now(),reply:m()?.xbRep,key:q.key,cost:q.cost,count:q.count,free:q.free};S.requests++;

      // Fixed single draw prevents checkbox multipliers and disables buy-shortfall.

      m().c_sendXunBao(0,q.free,false,q.type,false);

    }else{

      const p=panel(),native=W._Ba?._ze?._rui?.prototype?._lWn,rows=warehouse(q.type),before={},amount={};

      if(typeof native!=='function'||p?._lWn!==native)throw Error('Warehouse handler changed');

      const capacity=W._Ba?._Ic?.BeiBaoTool?.canAddItemsAndTip?.(rows);

      if(capacity!==true&&capacity!==1)throw Error('Bag cannot receive Phap Bao');

      if(!Array.isArray(m()?.selectArr))throw Error('Warehouse selection unavailable');

      for(const r of rows){before[r[0]]=Number(bag().getItemCountById(r[0]));amount[r[0]]=(amount[r[0]]||0)+Number(r[1]);}

      S.pending={kind:'withdraw',type:q.type,at:Date.now(),uids:rows.map(r=>String(r[2])),before,amount};S.requests++;

      m().selectArr.length=0;m().selectArr.push(...rows);native.call(p);

    }

  }

  function sync(){try{if(!S.enabled)return;if(!owned()){stop();return;}observe();if(S.pending)return;
    if(W.KVPV_RED_DOT?.isActive?.(261)!==true&&W._Ba?._Xo?._Ko?.instance?.getRpKeyState?.(261)!==true){S.reason='waiting_treasure_red_dot';return;}

    const selected=next();

    if(!selected){S.reason='no_authorized_free_or_key_work';if(S.ownedPanel&&panel()){ui().close?.(114);S.ownedPanel=false;}return;}

    if((W.KVPV_FREE_TREASURE?.busy?.()||W.KVPV_FESTIVAL_FREE?.busy?.())||!safe()||W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true){S.reason='waiting_idle_or_popup';return;}

    const {type,kind}=selected;

    if(kind==='withdraw'&&!panel()&&Date.now()>=S.nextOpen){

      S.nextOpen=Date.now()+5000;if(ui()?.isOpened?.(114)!==true){S.ownedPanel=true;ui()?.open?.(114);}S.reason='opening_equipment_warehouse';return;}

    const panelId=catalog.get(type).panel;

    if(kind==='draw'&&ui()?.isOpened?.(panelId)!==true&&Date.now()>=S.nextOpen){

      S.nextOpen=Date.now()+5000;ui()?.open?.(panelId,type);S.reason='opening_treasure_type_'+type;return;

    }

    S.reason=kind==='withdraw'?'waiting_warehouse_claim_queue':'waiting_key_draw_queue';

  }catch(e){S.lastError=String(e);S.reason='error';}}

  function hasWork(){return S.enabled&&owned()&&(!!S.pending&&(S.pending.type??4)===4||need()&&(warehouse().length>0||draw().ready));}

  function stop(){S.enabled=false;if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;if(S.registered)W.KVPV_V8?.toggle?.(id,false);}

  W.KVPV_FABAO_TREASURE=Object.freeze({sync,stop,hasWork,registerType(d){if(![0,1,2,3].includes(d?.type)||!Number.isSafeInteger(d.panel)||typeof d.allowed!=='function'||typeof d.itemKnown!=='function')throw Error('Unverified treasure type');catalog.set(d.type,d);},

    inspectType:type=>({draw:draw(type),warehouse:warehouse(type).length}),

    hasAnyWork:()=>S.enabled&&owned()&&(!!S.pending||!!next()),_probe:probe,_run:run,

    status:()=>({enabled:S.enabled,actor,reason:S.reason,draw:draw(),warehouse:warehouse().length,pending:S.pending?.kind??null,requests:S.requests,confirmed:S.confirmed,categories:[...catalog.values()].map(d=>({type:d.type,name:d.name,allowed:allowed(d.type),draw:draw(d.type),warehouse:warehouse(d.type).length})),lastError:S.lastError,allowKNB:false}),

    _handoff:()=>({actor,pending:S.pending,ownedPanel:S.ownedPanel,requests:S.requests,confirmed:S.confirmed})});

  W.KVPV_TREASURE_AUTO=W.KVPV_FABAO_TREASURE;

  const queue=W.KVPV_V8;if(queue?.register&&queue?.toggle){try{queue.register({id,name:'Tầm Bảo: dùng chìa miễn phí và lấy trang bị từ Kho',kind:'work',spend:'materials',verified:true,enabled:true,

      background:false,redIds:[261],hourlyLimit:60,cooldownMs:2000,probe:()=>W.KVPV_FABAO_TREASURE?._probe()??{ready:false},run:p=>W.KVPV_FABAO_TREASURE?._run(p)});

    }catch(e){if(!/Trung module ID|already exists/i.test(String(e)))throw e;}

    queue.toggle(id,true);S.registered=true;}

  S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(sync,500);sync();

})();

