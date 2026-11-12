





(() => {

  'use strict';

  const W=window,old=W.KVPV_SUMMON_BOSS,carry=old?._handoff?.();

  old?.stop?.();

  const actor=String(W.__KVPV_OWN_ACTOR_ID||''),tag='summon-boss';

  const S={enabled:true,timer:null,lease:false,stageAuto:null,reason:'starting',lastError:'',

    pending:carry?.actor===actor?carry.pending:null,mode:carry?.actor===actor?carry.mode:'adaptive',

    nextOpen:0,requests:carry?.actor===actor?carry.requests:0,autoOwned:false};

  const model=()=>W._Ba?._F_t?._E_t?.ins;

  const ui=()=>W._ft?._Y4n?.ins;

  const arb=()=>W.KVPV?.core?.scene;

  const common=()=>W._Ba?._$a?.SceneUtil?.isCommonScene===true&&W._Ba?._$a?._yo?.ins?.isInMission!==true;

  const inside=()=>Number(W._ft?._po?.ins?.getCfgById?.(W._C?._Mn?._Cn?.currentID)?.[7])===45;

  const owned=()=>actor&&String(W._Ba?._rJ?._O$?.ins?.actorId??'')===actor&&!W.__KVPV_UNIVERSAL_HALTED;

  const manual=()=>S.mode==='manual'||S.mode==='adaptive'&&W.KVPV_BEAST_ISLAND?.status?.().bossLevel===500;

  function tickets(){

    const m=model(),bag=W._Ba?._Ic?._aQ?.ins;

    const count=id=>id>0?Number(bag?.getItemCountById?.(id)):NaN;

    const normal=count(m?.comItemId),epic=count(m?.legendItemId);

    return {normal,epic,known:Number.isFinite(normal)&&normal>=0&&Number.isFinite(epic)&&epic>=0};

  }

  function release(){

    if(S.lease&&arb()?.status?.().tag===tag)arb().release('combat');S.lease=false;

    const stage=W._Ba?._Co?._Mo?.ins;

    if(owned()&&S.stageAuto===true&&stage?.auto===false&&!W.KVPV_EVENT_PRIORITY?.hold?.())stage.auto=true;

    S.stageAuto=null;

  }

  function disableAuto(){

    if(S.autoOwned&&owned()){panel()?._ngt?.();if(model())model().isAutoCall=false;}

    S.autoOwned=false;

  }

  function reserve(){

    const a=arb(),l=a?.status?.();

    if(!a||l?.owner&&l.tag!==tag||W.KVPV_HITRUN1?.status?.(false)?.running)return false;

    const job=W.KVPV_DAILY?.quickState?.()?.job;

    if(job&&job!=='rảnh'&&job!=='ranh')return false;

    const stage=W._Ba?._Co?._Mo?.ins;

    if(S.stageAuto===null)S.stageAuto=stage?.auto===true;

    if(stage?.auto===true)stage.auto=false;

    if(!a.acquire('combat',tag)){release();return false;}

    S.lease=true;return true;

  }

  function panel(){const u=ui(),p=u?.getPanelById?.(952),Type=W._Ba?._F_t?._eUs;

    return u?.isOpened?.(952)&&typeof Type==='function'&&p instanceof Type&&p.parent&&p.visible!==false?p:null;}

  function tick(){if(W.KVPV_ENTRY_POLICY?.manual===true)return;try{

    if(!S.enabled)return;

    if(!owned()){stop();return;}

    if(W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true){S.reason='priority_popup';return;}

    const t=tickets(),m=model();

    if(!t.known){S.reason='waiting_ticket_data';return;}

    if(S.lease)arb()?.renew?.('combat');

    if(S.pending){

      if(inside()){S.pending.entered=true;S.reason='fighting_summoned_boss';return;}

      

      if(common()&&S.pending.entered){S.pending=null;S.reason='returned_from_boss';}

      else {S.reason=Date.now()-S.pending.at>30000?'waiting_summon_ack_no_retry':'waiting_summon_entry';return;}

    }

    if(!common()){S.reason=inside()?'native_boss_fight':'other_activity';return;}

    if(W.KVPV_QUEST_PRIORITY?.blocks?.('summon_boss')){disableAuto();release();S.reason='priority_quest';return;}

    if(!t.normal&&!t.epic){disableAuto();release();S.reason='tickets_exhausted';return;}

    if(!reserve()){S.reason='scene_reserved';return;}

    const p=panel();

    if(!p){if(Date.now()>=S.nextOpen){S.nextOpen=Date.now()+5000;ui()?.open?.(952);}S.reason='opening_summon_panel';return;}

    if(p.gotoBtn?.disabled||p.gotoBtn?.gray){disableAuto();release();S.reason='native_summon_locked';return;}

    const wantEpic=t.normal<1;

    if(p.curCheckBox?.selected!==wantEpic){

      const select=wantEpic?p._nUs:p._sUs;

      if(typeof select!=='function'){S.reason='missing_native_ticket_selector';return;}

      select.call(p);

    }

    if(p.curCheckBox?.selected!==wantEpic){S.reason='waiting_ticket_selection';return;}

    const useManual=manual()||p.autoCheckBox?.visible===false||p.autoCheckBox?.disabled===true;

    if(useManual){

      

      if(m.isAutoCall){if(typeof p._ngt!=='function'){S.reason='waiting_native_auto_stop';return;}

        p._ngt();m.isAutoCall=false;S.autoOwned=false;}

      if(typeof p._hQn!=='function'){S.reason='missing_native_summon_button';return;}

      S.pending={at:Date.now(),entered:false,normal:t.normal,epic:t.epic};S.requests++;

      S.reason='manual_summon_sent';p._hQn();

    }else{

      if(!m.isAutoCall){if(typeof p._cQn!=='function'){S.reason='missing_native_auto_checkbox';return;}

        S.autoOwned=true;p._cQn();}

      S.autoOwned=true;S.reason='native_auto_summon';

    }

  }catch(e){S.lastError=String(e);S.reason='error';W.KVPV_V1?.diagnostics?.record?.(e);}}

  function stop(){S.enabled=false;

    if(S.timer!==null)(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);

    S.timer=null;disableAuto();release();}

  function start(){if(S.timer!==null)return;S.enabled=true;

    S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,1000);tick();}

  W.KVPV_SUMMON_BOSS=Object.freeze({start,stop,sync:tick,

    status:()=>({enabled:S.enabled,actor,mode:S.mode,manual:manual(),reason:S.reason,pending:S.pending?{...S.pending}:null,

      tickets:tickets(),requests:S.requests,lastError:S.lastError,allowKNB:false}),

    setMode(value){if(!['adaptive','auto','manual'].includes(value))throw Error('mode: adaptive / auto / manual');

      disableAuto();S.mode=value;return this.status();},

    _handoff:()=>({actor,pending:S.pending?{...S.pending}:null,mode:S.mode,requests:S.requests})});

  start();

})();

