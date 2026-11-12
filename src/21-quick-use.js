






(() => {

  'use strict';

  const W=window,old=W.KVPV_QUICK_USE,carry=old?._handoff?.();old?.stop?.();

  const actor=String(W.__KVPV_OWN_ACTOR_ID||'');

  const S={enabled:true,timer:null,soon:null,hook:null,busy:false,

    sent:new Set(carry?.actor===actor?carry.keys:[]),requests:carry?.actor===actor?carry.requests:0,

    lastItem:null,reason:'starting',lastError:'',history:[]};

  const model=()=>W._Ba?._aJ?._hJ?.ins;

  const owned=()=>actor&&actor===String(W._Ba?._rJ?._O$?.ins?.actorId??'')&&!W.__KVPV_UNIVERSAL_HALTED;

  const label=text=>String(text??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/gi,'d').trim().toLowerCase();

  function note(event,item){S.history.push({at:Date.now(),event,item});if(S.history.length>60)S.history.shift();}

  function detach(){const h=S.hook;if(h&&h.obj._Rst===h.fn){if(h.descriptor)Object.defineProperty(h.obj,'_Rst',h.descriptor);else delete h.obj._Rst;}S.hook=null;}

  function schedule(){if(!S.enabled||S.soon!==null)return;

    S.soon=(W.KVPV_V1?.timers?.setTimeout??W.setTimeout)(()=>{S.soon=null;tick();},0);

  }

  function attach(m){

    if(S.hook?.obj===m&&m?._Rst===S.hook.fn)return;

    detach();if(typeof m?._Rst!=='function')return;

    const descriptor=Object.getOwnPropertyDescriptor(m,'_Rst');if(descriptor&&!descriptor.configurable)return;

    const native=m._Rst,fn=function(...args){const result=native.apply(this,args);schedule();return result;};

    Object.defineProperty(m,'_Rst',{value:fn,writable:true,configurable:true,enumerable:!!descriptor?.enumerable});

    S.hook={obj:m,descriptor,fn};

  }

  function tick(){if(S.busy||!S.enabled)return;

    if(W.KVPV_CONFIRM_POPUPS?.beforeTask?.()===true){S.reason='priority_agree_popup';return;}

    try{

      if(!owned()){stop();S.reason='actor_or_session_changed';return;}

      const m=model();attach(m);const popup=m?._Wr,button=popup?.useBtn;

      if(!popup?.parent||popup.destroyed===true||popup.visible===false){S.reason='waiting_popup';return;}

      if(!button||button.visible===false||button.disabled===true||button.gray===true||label(button.label)!=='dung'){

        S.reason='not_an_enabled_use_button';return;

      }

      const item=popup.getItem?.(),id=Number(item?.[0]),count=Number(item?.[1]),uid=item?.[2];

      if(!Array.isArray(item)||!Number.isSafeInteger(id)||id<=0||!Number.isFinite(count)||count<=0||uid==null||typeof popup._M_0!=='function'){

        S.reason='waiting_native_item';return;

      }

      const key=id+'/'+String(uid)+'/'+count;

      if(S.sent.has(key)){S.reason='already_requested';return;}

      const bag=W._Ba?._Ic?._aQ?.ins;

      if(typeof bag?.getItemByIdAndUid==='function'&&!bag.getItemByIdAndUid(id,uid)){

        S.reason='item_no_longer_in_bag';return;

      }

      S.sent.add(key);while(S.sent.size>500)S.sent.delete(S.sent.values().next().value);

      S.busy=true;S.lastItem={id,uid:String(uid),count};S.requests++;S.reason='native_use_requested';note('USE-REQUEST',S.lastItem);

      

      popup._M_0();

    }catch(e){S.lastError=String(e?.message||e);S.reason='error';}

    finally{S.busy=false;}

  }

  function status(){return {enabled:S.enabled,actorId:actor,pollMs:50,asynchronous:true,

    hookAttached:!!S.hook,requests:S.requests,lastItem:S.lastItem?{...S.lastItem}:null,reason:S.reason,lastError:S.lastError,

    history:S.history.map(x=>({...x,item:x.item?{...x.item}:null})),

    note:'Visible native Use popup only; independent of Daily. Requests are not server consumption confirmations.'};}

  function stop(){S.enabled=false;

    if(S.timer!==null){(W.KVPV_V1?.timers?.clearInterval??W.clearInterval)(S.timer);S.timer=null;}

    if(S.soon!==null){(W.KVPV_V1?.timers?.clearTimeout??W.clearTimeout)(S.soon);S.soon=null;}

    detach();S.reason='stopped';return status();

  }

  function start(){S.enabled=true;if(S.timer===null)S.timer=(W.KVPV_V1?.timers?.setInterval??W.setInterval)(tick,50);schedule();return status();}

  W.KVPV_QUICK_USE=Object.freeze({start,stop,status,sync:schedule,

    _handoff:()=>({actor,keys:[...S.sent],requests:S.requests})});start();

})();

