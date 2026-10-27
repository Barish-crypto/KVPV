;(() => {
  'use strict';
  window.KVPV_FOCUS_HOLD?.stop?.();
  const actor=String(window.__KVPV_OWN_ACTOR_ID||window._Ba?._rJ?._O$?.ins?.actorId||'');
  let running=true,stage=null,timer=null,lastError='';
  const patches=[];
  function findStage(){
    const candidates=[window.Laya?.stage,window.laya?.stage,window.Laya?.Laya?.stage];
    const known=candidates.find(s=>s&&typeof s._isFocused==='boolean'&&typeof s._isVisibility==='boolean');if(known)return known;
    for(const descriptor of Object.values(Object.getOwnPropertyDescriptors(window))){
      if(descriptor.value&&typeof descriptor.value==='object'){try{const d=Object.getOwnPropertyDescriptor(descriptor.value,'stage');if(d&&'value'in d)candidates.push(d.value);}catch(_){}}
    }
    return candidates.find(s=>s&&typeof s._isFocused==='boolean'&&typeof s._isVisibility==='boolean')??null;
  }
  function restoreStage(){
    for(const patch of patches.splice(0).reverse()){
      const current=Object.getOwnPropertyDescriptor(patch.object,patch.key);if(current?.get!==patch.get)continue;
      if(patch.descriptor)Object.defineProperty(patch.object,patch.key,{...patch.descriptor,...('value'in patch.descriptor?{value:patch.nativeValue}:{})});
      else{delete patch.object[patch.key];patch.object[patch.key]=patch.nativeValue;}
    }
  }
  function lock(key){const descriptor=Object.getOwnPropertyDescriptor(stage,key);
    if(descriptor?.configurable===false||descriptor?.get||descriptor?.set)throw Error('Không khóa được cờ engine '+key);
    const patch={object:stage,key,descriptor,nativeValue:stage[key],get:()=>true};
    Object.defineProperty(stage,key,{configurable:true,enumerable:descriptor?.enumerable??true,get:patch.get,set(value){patch.nativeValue=value;}});patches.push(patch);
  }
  function stop(){if(!running)return;running=false;if(timer!==null)window.clearInterval(timer);timer=null;
    restoreStage();}
  function status(){return {version:2,mode:'quiet_flags_only',running,actor,engineStageFound:!!stage,engineFocused:stage?._isFocused??null,engineVisible:stage?._isVisibility??null,realDocumentFocused:window.document?.hasFocus?.()??null,realDocumentHidden:window.document?.hidden??null,focusPulses:0,lastError};}
  try{
    stage=findStage();if(!stage)throw Error('Chưa tìm thấy stage engine. Chọn đúng game-frame, chờ game tải xong rồi chạy lại.');
    lock('_isFocused');lock('_isVisibility');
    timer=window.setInterval(()=>{
      const currentActor=String(window._Ba?._rJ?._O$?.ins?.actorId||'');if(actor&&currentActor&&currentActor!==actor){stop();return;}
      if(stage._isFocused!==true||stage._isVisibility!==true){lastError='Cờ focus đã bị thành phần khác thay; đã dừng để không ghi đè.';stop();}
    },1000);
    window.KVPV_FOCUS_HOLD=Object.freeze({status,stop});window.console.info('[KVPV] Giữ cờ focus engine, không phát sự kiện focus giả. Tắt: KVPV_FOCUS_HOLD.stop()');
  }catch(e){lastError=String(e.message||e);stop();window.console.warn('[KVPV focus]',lastError);}
})();
