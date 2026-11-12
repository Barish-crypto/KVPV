(() => {
  'use strict';
  const W = window;
  if (W.KVPV_ADVENTURE) return;
  W.KVPV_ADVENTURE = Object.freeze({
    sync() {},
    stop() {},
    status: () => ({ enabled: false, reason: 'red_dot_module_unavailable', allowKNB: false })
  });
})();
