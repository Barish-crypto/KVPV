






(() => {

  'use strict';

  const W=window,old=W.KVPV_CONFIRM_POPUPS,carry=old?._handoff?.();old?.stop?.();

  const actor=String(W.__KVPV_OWN_ACTOR_ID||'');

  const S={enabled:true,confirmAll:true,timer:null,soon:null,hook:null,busy:false,lastPriorityScan:-Infinity,priorityUntil:0,

    generations:new Map(carry?.actor===actor?carry.generations:[]),seen:new Map(carry?.actor===actor?carry.seen:[]),

    requests:carry?.actor===actor?carry.requests:0,reason:'starting',lastError:'',skipped:[],history:[]};

  const ui=()=>W._ft?._Y4n?.ins;

  const owned=()=>actor&&String(W._Ba?._rJ?._O$?.ins?.actorId??'')===actor&&!W.__KVPV_UNIVERSAL_HALTED;

  const norm=text=>String(text??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/gi,'d').trim().toLowerCase();

  const agree=button=>button&&button.visible!==false&&button.disabled!==true&&button.gray!==true&&/^dong y\s*(?:\(\s*\d+\s*\))?$/.test(norm(button.label));

  function detach(){const h=S.hook;if(h&&h.obj.open===h.fn){if(h.descriptor)Object.defineProperty(h.obj,'open',h.descriptor);else delete h.obj.open;}S.hook=null;}

  function schedule(){if(!S.enabled||S.soon!==null)return;S.soon=(W.KVPV_V1?.timers?.setTimeout??W.setTimeout)(()=>{S.soon=null;tick();},0);}

  function attach(manager){if(S.hook?.obj===manager&&manager?.open===S.hook.fn)return;

    detach();if(typeof manager?.open!=='function')return;

    const descriptor=Object.getOwnPropertyDescriptor(manager,'open');if(descriptor&&!descriptor.configurable)return;

    const native=manager.open,fn=function(id,...args){const result=native.call(this,id,...args),key=Number(id);

      S.generations.set(key,(S.generations.get(key)||0)+1);if(S.generations.size>200)S.generations.delete(S.generations.keys().next().value);schedule();return result;};

    Object.defineProperty(manager,'open',{value:fn,writable:true,configurable:true,enumerable:!!descriptor?.enumerable});S.hook={obj:manager,fn,descriptor};

  }

  function tick(){if(!S.enabled||S.busy)return false;S.busy=true;try{

    if(!owned()){stop();S.reason='actor_or_session_changed';return;}

    const manager=ui();attach(manager);S.skipped=[];

    

    if(manager?.isOpened?.(118)===true&&typeof manager.close==='function'){

      manager.close(118);S.requests++;S.reason='first_recharge_closed';

      S.history.push({at:Date.now(),id:118,kind:'first_recharge_close'});if(S.history.length>60)S.history.shift();

      S.priorityUntil=Date.now()+10;schedule();return true;

    }

    

    

    const quickBuyClasses=[W._Ba?._LJ?._eBi,W._Ba?._LJ?._fBi].filter(c=>typeof c==='function');

    if(quickBuyClasses.length&&typeof manager?.close==='function')

      for(const id of new Set([372,802,...Object.keys(manager.openTable||manager._H$t||{}).map(Number)])){

        if(manager.isOpened?.(id)!==true)continue;

        const panel=manager.getDialogById?.(id)||manager.getPanelById?.(id);

        if(!quickBuyClasses.some(c=>panel instanceof c)||!panel.parent||panel.visible===false)continue;

        manager.close(id);S.requests++;S.reason='quick_buy_closed';

        S.history.push({at:Date.now(),id,kind:'quick_buy_close'});if(S.history.length>60)S.history.shift();

        S.priorityUntil=Date.now()+10;schedule();return true;

      }

    // Native shared activation showcase (window 92): outside click calls close().

    // Applies to CoBao and the other cosmetic/item activation variants of this class.

    const Showcase=W._Ba?._Ytt?._yti;

    if(typeof Showcase==='function'&&typeof Showcase.prototype.close==='function')

      for(const id of new Set([92,...Object.keys(manager?.openTable||manager?._H$t||{}).map(Number)])){

        if(manager?.isOpened?.(id)!==true)continue;

        const panel=manager.getPanelById?.(id)||manager.getDialogById?.(id);

        if(!(panel instanceof Showcase)||panel.close!==Showcase.prototype.close||panel.closeOnSide!==true||

          !panel.parent||panel.visible===false||panel.destroyed===true)continue;

        const generation=S.generations.get(id)||0,seen=S.seen.get(id);

        if(seen?.panel===panel&&seen.generation===generation)continue;

        S.seen.set(id,{panel,generation});if(S.seen.size>200)S.seen.delete(S.seen.keys().next().value);

        S.requests++;S.reason='activation_showcase_closed';

        S.history.push({at:Date.now(),id,kind:'activation_showcase_close'});if(S.history.length>60)S.history.shift();

        panel.close();S.priorityUntil=Date.now()+10;schedule();return true;

      }

    const ids=new Set([12,1293,...Object.keys(manager?.openTable||manager?._H$t||{}).map(Number)]);

    for(const id of ids){

      if(manager?.isOpened?.(id)!==true)continue;

      const panel=manager.getPanelById?.(id)||manager.getDialogById?.(id),button=panel?.okBtn;

      if(!panel||panel.destroyed===true||panel.visible===false||!panel.parent||!agree(button))continue;

      const generation=S.generations.get(id)||0,seen=S.seen.get(id);

      if(seen?.panel===panel&&seen.generation===generation)continue;

      

      const content=norm([panel.contentTxt?.innerHTML,panel.contentTxt?.text,panel.content,panel.title].filter(Boolean).join(' '));

      const Result=W._Ba?._sst?._EVn;

      const nativeResult=typeof Result==='function'&&panel instanceof Result&&typeof Result.prototype.close==='function'&&panel.close===Result.prototype.close;

      const result=id===1293||nativeResult;

      const paidText=/\b(knb|nguyen bao|yuanbao|ingot|nap tien|thanh toan|mua|tieu hao|chi phi)\b/.test(content);

      if(paidText&&!nativeResult){S.skipped.push({id,reason:'potential_currency_cost'});continue;}

      const information=id===12&&typeof panel._oBn?.run!=='function';

      

      

      

      const bag=W._Ba?._Ic?._aQ?.ins,handler=panel._oBn;

      const fusion=id===12&&

        typeof bag?.quickOneKeyFusion==='function'&&handler?.method===bag.quickOneKeyFusion&&handler?.caller===bag&&typeof handler?.run==='function';

      if(!information&&!result&&!fusion){S.skipped.push({id,reason:'unverified_action_cost'});continue;}

      const nativeGeneric=id===12&&typeof panel._aBn==='function';

      if(!nativeGeneric&&typeof button.event!=='function'&&!(result&&typeof panel.close==='function'))continue;

      S.seen.set(id,{panel,generation});if(S.seen.size>200)S.seen.delete(S.seen.keys().next().value);

      S.requests++;S.reason='native_agree_requested';S.history.push({at:Date.now(),id,kind:fusion?'bag_quick_fusion':information?'information':result?'battle_result':'confirmation'});if(S.history.length>60)S.history.shift();

      if(nativeGeneric)panel._aBn();else if(result&&typeof panel.close==='function')panel.close();else button.event('click');

      S.priorityUntil=Date.now()+10;schedule();return true; 

    }

    S.reason=S.skipped.length?'waiting_confirmation_scope':'waiting_popup';

  }catch(e){S.lastError=String(e?.message||e);S.reason='error';}finally{S.busy=false;}return false;}

  

  

  function beforeTask(){if(!S.enabled||!owned())return false;const now=Date.now();

    if(now-S.lastPriorityScan>=50){S.lastPriorityScan=now;if(tick()===true)return true;}

    return now<S.priorityUntil;}

  function status(){return {enabled:S.enabled,priority:'before_scene_tasks_and_quick_use',confirmAll:S.confirmAll,allowKNB:false,unknownCosts:'manual',asynchronous:true,pollMs:100,requests:S.requests,

    reason:S.reason,lastError:S.lastError,skipped:S.skipped.map(x=>({...x})),history:S.history.map(x=>({...x}))};}

  function stop(){S.enabled=false;if(S.timer!==null){(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;}

    if(S.soon!==null){(W.KVPV_V1?.timers?.clearTimeout??W.clearTimeout)(S.soon);S.soon=null;}detach();S.reason='stopped';return status();}

  function start(){S.enabled=true;if(S.timer===null)S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,100);schedule();return status();}

  W.KVPV_CONFIRM_POPUPS=Object.freeze({start,stop,status,sync:schedule,beforeTask,

    setAll(value){S.confirmAll=value===true;schedule();return status();},

    _handoff:()=>({actor,confirmAll:S.confirmAll,generations:[...S.generations],seen:[...S.seen],requests:S.requests})});start();

})();

