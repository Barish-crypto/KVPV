
 

const __KVPV_V1_READY = (() => {

  'use strict';

  const W = window;

  const actor = typeof _Ba === 'undefined' ? '' : String(_Ba?._rJ?._O$?.ins?.actorId ?? '');

  if (!/^[1-9]\d{4,24}$/.test(actor) || typeof _ft === 'undefined' || typeof _Sa === 'undefined') {

    console.error('[KVPV V1] Chọn game-frame và đợi nhân vật tải xong.');

    return;

  }

  if (W.KVPV_V1 || W.KVPV_MAIN_SOLO?.installed || W.KVPV_V881?.installed ||

      W.__KVPV_UNIVERSAL_HALTED || (W.__KVPV_OWN_ACTOR_ID && W.__KVPV_OWN_ACTOR_ID !== actor)) {

    console.error('[KVPV V1] F5 game trước khi nạp lại hoặc đổi nhân vật.');

    return;

  }

  

  const errors = [];

  let errorCount = 0;

  const diagnostics = Object.freeze({

    record(error) {

      errorCount++;

      errors.push({at:Date.now(),message:String(error?.message ?? error).slice(0,1000)});

      if (errors.length > 100) errors.shift();

    },

    status() { return {total:errorCount,recent:errors.map(item => ({...item}))}; },

    clear() { errors.length=0;errorCount=0; }

  });

  

  const intervals = new Map(), timeouts = new Map();

  const timerAPI = Object.freeze({

    setInterval(callback, delay, ...args) {

      const handle = W.setInterval(callback, delay, ...args);

      intervals.set(handle, {delay, name:callback?.name || 'anonymous'});

      return handle;

    },

    clearInterval(handle) {

      intervals.delete(handle);timeouts.delete(handle);

      return W.clearInterval(handle);

    },

    setTimeout(callback, delay, ...args) {

      // Native string handlers keep their original semantics.

      if (typeof callback !== 'function') return W.setTimeout(callback, delay, ...args);

      const handle = W.setTimeout(function (...values) {

        timeouts.delete(handle);

        return callback.apply(this, values);

      }, delay, ...args);

      timeouts.set(handle, {delay, name:callback.name || 'anonymous'});

      return handle;

    },

    clearTimeout(handle) {

      timeouts.delete(handle);intervals.delete(handle);

      return W.clearTimeout(handle);

    },

    status() {

      return {intervals:intervals.size,timeouts:timeouts.size,

        tasks:[...intervals.values()].map(item => ({...item}))};

    }

  });

  const build=typeof __KVPV_V1_BUILD==='undefined'?null:__KVPV_V1_BUILD;

  // Lock the observed game actor before any live installer captures ownership.
  if(!Object.getOwnPropertyDescriptor(W,'__KVPV_OWN_ACTOR_ID'))
    Object.defineProperty(W,'__KVPV_OWN_ACTOR_ID',{value:actor,enumerable:false,writable:false,configurable:false});
  W.KVPV_V1 = Object.freeze({version:'1.0.0',build,diagnostics,timers:timerAPI});

  return true;

})();

