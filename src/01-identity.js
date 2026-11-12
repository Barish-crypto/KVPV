




(() => {

  'use strict';

  const id=(typeof _Ba==='undefined')?'':String(_Ba?._rJ?._O$?.ins?.actorId??'');

  if(!/^[1-9]\d{4,24}$/.test(id) || typeof _ft==='undefined' || typeof _Sa==='undefined'){

    console.error('[UNIVERSAL35] Chưa vào nhân vật hoặc chọn sai context. Chọn game-frame, đợi tải game rồi chạy lại Snippet.');

    return;

  }

  const key='__KVPV_OWN_ACTOR_ID';

  const existing=Object.getOwnPropertyDescriptor(window,key);

  if(existing && existing.value!==id){

    console.error('[UNIVERSAL35] Không đổi nhân vật trong phiên. F5 game rồi chạy lại Snippet.');

    return;

  }

  if(!existing)Object.defineProperty(window,key,{value:id,enumerable:false,writable:false,configurable:false});

  console.info('[UNIVERSAL35] Nhận diện nhân vật hiện tại; không dùng ID cố định.',id);

})();

