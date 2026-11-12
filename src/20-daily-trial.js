






(() => {

  'use strict';

  const W=window,old=W.KVPV_DAILY_TRIAL;

  

  const previous=old?.status?.();

  const handoff=old?._handoff?.();

  old?.stop?.();

  const actor=String(W.__KVPV_OWN_ACTOR_ID||'');

  const INSPIRE_KNB_MAPS=new Set([2051,2061]);

  const roster=[[2051,22],[2061,23],[2721,679],[2071,25],[2081,24],

    [2301,219],[2331,222],[2321,221],[2311,220],[2341,223]];

  const C={enabled:true,paidSweep:true,pollMs:1000,refreshMs:30000,entryTimeoutMs:25000,sweepTimeoutMs:15000};

  const S={timer:null,pending:previous?.actorId===actor&&previous?.pending?{...previous.pending}:null,phase:previous?.phase??'WAITING',reason:'starting',day:handoff?.day??'',sent:new Set(handoff?.sent??[]),history:[],

    nextAt:0,lastRefresh:-Infinity,lastTarget:-Infinity,stageAuto:null,lease:false,

    entries:handoff?.entries??0,returns:handoff?.returns??0,sweepRequests:handoff?.sweepRequests??0,sweepConfirmed:handoff?.sweepConfirmed??0,confirmedSweepCost:handoff?.confirmedSweepCost??0,lastError:''};

  const user=()=>W._Ba?._rJ?._O$?.ins;

  const model=()=>W._Ba?._sst?._ist?.inst;

  const rpc=()=>W._Ba?._sst?._Cht?.inst;

  const arbiter=()=>W.KVPV?.core?.scene;

  const owned=()=>actor&&String(user()?.actorId??'')===actor&&!W.__KVPV_UNIVERSAL_HALTED;

  const currentMap=()=>Number(W._C?._Mn?._Cn?.currentID??W._Ba?._$a?._yo?.ins?.intoSce?.[0]);

  const common=()=>W._Ba?._$a?.SceneUtil?.isCommonScene===true&&W._Ba?._$a?._yo?.ins?.isInMission!==true;

  const day=()=>W.KVPV_DAILY_CLOCK?.key?.()??new Date(Date.now()+2*3600000).toISOString().slice(0,10);

  function note(event,detail){S.history.push({at:Date.now(),event,detail});if(S.history.length>80)S.history.shift();}

  function row(id){return model()?.timesTab?.[id];}

  function taskAllows(id){

    const task=W._Ba?._zIt?._FIt?.ins?.taskInfo?.[0],lock=W._ft?.DungTaskLock?.ins;

    return !lock?.isLockTask?.(task)||Number(lock.getCfgByTaskId?.(task)?.[1])===id;

  }

  function candidates(){return roster.map(([id,feature])=>{

    const r=row(id),open=W._Ba?._Do?._Ho?.inst;

    return {id,feature,level:Number(r?.[1]),remaining:Number(r?.[6]),sweeps:Number(r?.[8]),

      spentSweeps:Number(r?.[10]),known:Array.isArray(r),

      unlocked:open?.getFcNdShow?.(feature)===true&&open?.getFcIsOpen?.(feature)!==false,

      taskAllowed:taskAllows(id)};

  });}

  function key(d,kind){return S.day+'/'+kind+'/'+d.id+'/'+d.level+'/'+d.remaining+'/'+d.sweeps+'/'+d.spentSweeps;}

  function release(){

    const a=arbiter();if(S.lease&&a?.status?.().tag==='daily-trial')a.release?.('combat');S.lease=false;

    const stage=W._Ba?._Co?._Mo?.ins;

    if(owned()&&S.stageAuto===true&&stage?.auto===false&&!W.KVPV_EVENT_PRIORITY?.hold?.())stage.auto=true;S.stageAuto=null;

  }

  function reserve(){

    const a=arbiter(),lease=a?.status?.();

    if(!a?.acquire)return false;

    

    if(lease?.owner==='stage'&&common()&&!busy())a.release?.('stage');

    else if(lease?.owner&&lease.tag!=='daily-trial')return false;

    const stage=W._Ba?._Co?._Mo?.ins;

    if(S.stageAuto===null)S.stageAuto=stage?.auto===true;

    if(stage?.auto===true)stage.auto=false;

    if(a.acquire('combat','daily-trial')!==true){release();return false;}S.lease=true;return true;

  }

  function renew(){const a=arbiter();if(a?.status?.().tag==='daily-trial')a.renew?.('combat');}

  function busy(){

    const j=W.KVPV_DAILY?.quickState?.()?.job;

    if(j&&!['rảnh','ranh'].includes(j))return 'daily_job:'+j;

    if(W.KVPV_HITRUN1?.status?.(false)?.running)return 'boss_running';

    if(W.KVPV_FAR_SCOPE?.inside?.()===true)return 'far_map_running';

    return null;

  }

  function refresh(){if(Date.now()-S.lastRefresh<C.refreshMs||typeof rpc()?.getCpTimes!=='function')return;

    S.lastRefresh=Date.now();rpc().getCpTimes();}

  function finish(reason){note(reason,S.pending?.id);S.pending=null;S.phase='WAITING';S.reason=reason;S.nextAt=Date.now()+1500;}

  

  function ended(){const p=S.pending;if(p?.kind==='challenge'&&p.entered&&currentMap()===p.id){p.resultAt=Date.now();note('NATIVE-BATTLE-END',p.id);}}

  function chooseTarget(){if(Date.now()-S.lastTarget<3000)return;

    const me=W._C?._Ba?.instance?.getRole?.(Number(actor)),combat=me?.getComponent?.(W._d?._Yct?._Het);

    if(combat?.isValidTarget?.()===true)return;

    if(typeof user()?.selectTar==='function'){S.lastTarget=Date.now();user().selectTar(1,-1);}

  }

  

  

  function cheerData(){

    const rows=model()?.insp,raw=[W._ft?._gY?.ins?.getCfgById?.(10304)?.[2],W._ft?._gY?.ins?.getCfgById?.(10305)?.[2]];

    if(!Array.isArray(rows)||raw.some(r=>!Array.isArray(r)||!Number.isFinite(Number(r[0]))||Number(r[0])<0||!Number.isSafeInteger(Number(r[2]))||Number(r[2])<0||Number(r[2])>100))return null;

    if(raw.some(r=>!Number.isFinite(Number(r[1]))||Number(r[1])<=0))return null;

    const total=rows.reduce((sum,r)=>sum+(Number(r?.[2])||0),0),maximum=Math.round(raw.reduce((n,r)=>n+100*Number(r[1])*Number(r[2]),0));

    return {percent:Math.round(total*100),maximum,types:raw.map((r,i)=>({type:i+1,cost:Number(r[0]),limit:Number(r[2]),

      count:Number(rows.find(row=>Number(row?.[0])===i+1)?.[1]??0),balance:Number(i===0?user()?.copper:user()?.ingot)}))};

  }

  function inspireReply(){const p=S.pending;if(p?.kind==='challenge'&&p.entered&&currentMap()===p.id&&p.cheer?.pending)

    p.cheer.pending.reply=Number(model()?.inspState?.[0]);}

  function cheer(p){

    const c=p.cheer||(p.cheer={pending:null,blocked:false,blockedTypes:[],requests:0,confirmed:0,reason:'waiting_data'}),d=cheerData(),now=Date.now();

    if(p.resultAt!=null){c.reason='battle_ended';return;}

    if(W.KVPV_BOSS_TEAM?.priority?.()){c.reason='yield_private_boss_invitation';return;}

    if(!d){c.reason='waiting_native_inspire_data';return;}

    if(c.pending){

      const pending=c.pending,current=d.types.find(t=>t.type===pending.type);

      if(current?.count>pending.count){c.confirmed++;c.blocked=false;if(pending.type===2)c.confirmedKNBCost=(c.confirmedKNBCost||0)+pending.cost;else c.confirmedCoinCost=(c.confirmedCoinCost||0)+pending.cost;c.pending=null;note('INSPIRE-CONFIRMED',{map:p.id,type:pending.type,cost:pending.cost,percent:d.percent});}

      else if(pending.reply!=null&&pending.reply!==0){c.blockedTypes.push(pending.type);c.pending=null;c.reason='native_inspire_error:'+pending.reply;}

      else if(now-pending.at>=8000){c.blocked=true;c.reason='inspire_ack_timeout';return;}

      else{c.reason='waiting_inspire_ack';return;}

    }

    if(d.percent>=d.maximum){c.reason='inspire_full';return;}

    if(c.blocked)return;

    if(typeof rpc()?.rqInsp!=='function'){c.reason='missing_inspire_api';return;}

    const knbAllowed=W.KVPV_SPENDING_POLICY?.allowKNB===true||INSPIRE_KNB_MAPS.has(Number(p.id));

    // A visible native auto-inspire panel is already a sender. Let it own the

    // sequence instead of issuing a second request from this controller.

    const manager=W._ft?._Y4n?.ins,classes=[[W._Ba?._sst?._Rqn,4],[W._Ba?._dat?._PYn,10]];

    for(const id of Object.keys(manager?.openTable||manager?._H$t||{}).slice(0,80)){

      const panel=manager?.getPanelById?.(Number(id))||manager?.getDialogById?.(Number(id));

      for(const [Type,kind]of classes)if(typeof Type==='function'&&panel instanceof Type&&panel.parent&&panel.visible!==false&&panel._jqn===Type.prototype._jqn){

        const active=d.types.some(t=>(t.type===1||knbAllowed)&&!c.blockedTypes.includes(t.type)&&t.count<t.limit&&t.balance>=t.cost&&

          [true,1].includes(model()?.getAutoInspState?.(kind,t.type)));

        if(active){c.reason='native_auto_inspire_owner';return;}

      }

    }

    const type=d.types.find(t=>(t.type===1||knbAllowed)&&!c.blockedTypes.includes(t.type)&&Number.isSafeInteger(t.count)&&t.count>=0&&t.count<t.limit&&Number.isFinite(t.balance)&&t.balance>=t.cost);

    if(!type){c.reason=!knbAllowed&&d.types.some(t=>t.type===2&&t.count<t.limit)?'knb_inspire_not_authorized_for_map':'inspire_limit_or_insufficient_balance';return;}

    c.pending={type:type.type,count:type.count,percent:d.percent,at:now,cost:type.cost};c.requests++;c.reason='inspire_request_sent';

    note('INSPIRE-REQUEST',{map:p.id,type:type.type,cost:type.cost});rpc().rqInsp(type.type);

  }

  function processPending(){const p=S.pending,r=row(p.id),now=Date.now();renew();

    if(p.kind==='sweep'){

      if(Array.isArray(r)&&(Number(r[8])<p.beforeSweeps||Number(r[10])>p.beforeSpent)){

        S.sweepConfirmed++;S.confirmedSweepCost+=p.cost;finish('SWEEP-CONFIRMED');return;

      }

      if(now-p.at>C.sweepTimeoutMs){finish('SWEEP-ACK-TIMEOUT');release();return;}

      S.phase='WAIT_SWEEP_ACK';S.reason='waiting_server_sweep_count';return;

    }

    if(currentMap()===p.id){

      if(!p.entered){p.entered=true;S.entries++;note('ENTRY-CONFIRMED',p.id);}

      S.phase='FIGHT';S.reason=user()?.isDead===true?'waiting_native_revive_or_exit':'native_dungeon_combat';

      if(user()?.isDead!==true){cheer(p);chooseTarget();}

      if(p.resultAt!=null&&now-p.resultAt>=2000&&!p.exitSent){p.exitSent=true;rpc()?.rqEtScene?.(0);note('NATIVE-EXIT-REQUEST',p.id);}

      return;

    }

    if(p.entered){

      if(!common()){S.phase='WAIT_RETURN';S.reason='waiting_common_scene';return;}

      S.returns++;finish('RETURN-CONFIRMED');refresh();return;

    }

    if(now-p.at>C.entryTimeoutMs){finish('ENTRY-ACK-TIMEOUT');release();return;}

    S.phase='WAIT_ENTRY';S.reason='waiting_native_scene_ack';

  }

  

  function nextAction(){

    const requested=W.KVPV_PROGRESS_PLANNER?.materialDungeon?.()??W.KVPV_EQUIPMENT_TREASURE?.materialDungeon?.();

    const list=candidates().filter(d=>(!requested||d.id===requested)&&d.known&&d.unlocked&&d.taskAllowed&&Number.isSafeInteger(d.level)&&d.level>0);

    let d=list.find(d=>d.remaining>0&&!S.sent.has(key(d,'challenge'))),kind='challenge',cost=0;

    if(!d&&C.paidSweep){

      kind='sweep';

      for(const candidate of list){

        if(!(candidate.sweeps>0)||S.sent.has(key(candidate,kind)))continue;

        const value=Number(W._Ba?._B_t?._KLt?.ins?.getNum?.(candidate.id,candidate.spentSweeps,Number(row(candidate.id)?.[7]))?.[0]);

        if(!Number.isFinite(value)||value<0||!Number.isFinite(Number(user()?.ingot))||Number(user().ingot)<value)continue;

        d=candidate;cost=value;break;

      }

    }

    return {d,kind,cost};

  }

  function hasPriority(){if(W.KVPV_ENTRY_POLICY?.manual===true)return false;try{

    if(W.KVPV_QUEST_PRIORITY?.blocks?.('daily_trial')&&!S.pending)return false;

    if(!C.enabled||!owned()||user()?.isDead===true||!common()||busy())return false;

    return !!S.pending||!!nextAction().d;

  }catch(e){S.lastError=String(e?.message||e);return false;}}

  let lastCentralSync=0;
  function tick(){if(W.KVPV_ENTRY_POLICY?.manual===true)return;try{

    if(W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true){S.reason='priority_agree_popup';return;}

    if(!C.enabled||!owned()){stop();return;}

    const today=day();if(S.day!==today){S.day=today;S.sent.clear();}

    if(S.pending){processPending();return;}

    if(W.KVPV_QUEST_PRIORITY?.blocks?.('daily_trial')){S.reason='priority_quest';release();return;}

    if(user()?.isDead===true){S.reason='dead';release();return;}

    if(!common()){S.reason='other_scene';release();return;}

    const blocked=busy();if(blocked){S.reason=blocked;release();return;}

    if(Date.now()<S.nextAt)return;

    refresh();

    const {d,kind,cost}=nextAction();

    if(!d){S.phase='WAITING';S.reason='no_available_challenge_or_affordable_sweep';release();return;}

    const native=rpc();if(typeof native?.rqEtScene!=='function'||kind==='sweep'&&typeof native.swpCpy!=='function'){S.reason='missing_native_api';release();return;}

    if(!reserve()){S.reason='scene_reserved';return;}

    const requestKey=key(d,kind);S.sent.add(requestKey);

    S.pending={kind,id:d.id,level:d.level,at:Date.now(),entered:false,beforeSweeps:d.sweeps,beforeSpent:d.spentSweeps,cost};

    note(kind==='challenge'?'CHALLENGE-REQUEST':'PAID-SWEEP-REQUEST',{id:d.id,level:d.level,cost});

    if(kind==='challenge'){

      if(d.id===2051||d.id===2061)native.rqEtScene(d.id);else native.rqEtScene(d.id,d.level);

    }else{S.sweepRequests++;native.swpCpy(d.id);}

    S.phase=kind==='challenge'?'WAIT_ENTRY':'WAIT_SWEEP_ACK';S.reason='request_sent_not_yet_confirmed';

  }catch(e){S.lastError=String(e?.message||e);S.reason='error';if(!S.pending)release();}}

  function status(){const planned=nextAction();return {enabled:C.enabled,paidSweep:C.paidSweep,priority:'first_when_idle',actorId:actor,phase:S.phase,reason:S.reason,

    inFlight:!!S.pending,pending:S.pending?JSON.parse(JSON.stringify(S.pending)):null,inspire:cheerData(),inspireEnabledMaps:[2051,2061],knbInspireAllowed:INSPIRE_KNB_MAPS.has(currentMap())||W.KVPV_SPENDING_POLICY?.allowKNB===true,entries:S.entries,returns:S.returns,

    sweepRequests:S.sweepRequests,sweepConfirmed:S.sweepConfirmed,confirmedSweepCost:S.confirmedSweepCost,

    lastError:S.lastError,nextAction:planned.d?{kind:planned.kind,id:planned.d.id,level:planned.d.level,cost:planned.cost}:null,dungeons:candidates(),history:S.history.slice(),

    note:'Paid sweep is user-authorized; use only configured remaining sweep counts with sufficient existing ingot, never buy currency or sweep attempts, and require server ACK before continuing. Native KNB inspire remains separately governed by spending policy.'};}

  function stop(){C.enabled=false;if(S.timer!=null){(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;}

    W._Sa?.notify?.off?.(5112,S,ended);W._Sa?.notify?.off?.(5108,S,inspireReply);release();return {enabled:false,inFlight:!!S.pending};}

  function centrallyManaged(){return W.KVPV_RED_DOT_MODULE?.ownsProgression?.()===true;}
  function sync(){const now=Date.now();if(now-lastCentralSync<C.pollMs)return status();lastCentralSync=now;tick();return status();}
  function start(){C.enabled=true;W._Sa?.notify?.off?.(5112,S,ended);W._Sa?.notify?.on?.(5112,S,ended);W._Sa?.notify?.off?.(5108,S,inspireReply);W._Sa?.notify?.on?.(5108,S,inspireReply);

    if(!W.KVPV_ENTRY_POLICY?.manual&&S.pending&&!S.lease)reserve();

    if(centrallyManaged()){
      if(S.timer!=null){(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;}
      sync();
    }else{
      if(S.timer==null)S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,C.pollMs);
      tick();
    }
    return status();}

  W.KVPV_DAILY_TRIAL=Object.freeze({start,stop,status,hasPriority,sync,

    _handoff:()=>({day:S.day,sent:[...S.sent],entries:S.entries,returns:S.returns,sweepRequests:S.sweepRequests,sweepConfirmed:S.sweepConfirmed,confirmedSweepCost:S.confirmedSweepCost})});start();

})();

