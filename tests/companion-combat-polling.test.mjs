import assert from 'node:assert/strict';
import test from 'node:test';
import { initialize } from '../esm/modules/50-companion-combat.mjs';

test('companion fallback scan tightens near native skill readiness', () => {
  const keys = ['window', 'KVPV_V1', 'KVPV_FAR_SCOPE', 'KVPV_COMPANION_COMBAT'];
  const previous = new Map(keys.map(key => [key, Object.getOwnPropertyDescriptor(globalThis, key)]));
  const intervals = [];
  const selector = {
    _rtt: [[8001, Date.now() + 6]],
    _wet: [],
    _Tet: -1,
    property: { get: key => key === 'type' ? 7 : key === 'exterior' ? [0, 0, 0, 0, 0, 0] : null }
  };
  const ride = {
    property: { get: key => key === 'type' ? 7 : key === 'id' ? 'ride' : null },
    getComponent: type => type === 'skill' ? selector : null,
    on() {},
    off() {}
  };
  const role = {
    property: {
      get: key => key === 'type' ? 4 : key === 'rideContext' ? ride : key === 'id' ? 'player' : null
    },
    getComponent: () => null,
    on() {},
    off() {}
  };
  const window = {
    __KVPV_OWN_ACTOR_ID: '12345',
    _Ba: { _rJ: { _O$: { ins: { actorId: '12345', isDead: false } } } },
    _C: { _Ba: { instance: { getRole: () => role } } },
    _d: { _Yct: { _Eet: 'skill', _Het: 'combat', _zet: 'mover' } },
    _ft: { _po: { ins: { getCfgById: () => [] } } },
    setInterval(callback, ms) { const timer = { callback, ms }; intervals.push(timer); return timer; },
    clearInterval() {}
  };

  Object.defineProperties(globalThis, {
    window: { configurable: true, writable: true, value: window },
    KVPV_V1: { configurable: true, writable: true, value: { timers: {
      setInterval: window.setInterval.bind(window),
      clearInterval: window.clearInterval.bind(window)
    } } },
    KVPV_FAR_SCOPE: { configurable: true, writable: true, value: { status: () => ({ inside: true, kind: 'TRU_TIEN' }) } },
    KVPV_COMPANION_COMBAT: { configurable: true, writable: true, value: null }
  });

  try {
    initialize();
    const combat = window.KVPV_COMPANION_COMBAT;
    assert.ok(combat.status().pollIntervalMs >= 1);
    assert.ok(combat.status().pollIntervalMs < 8);

    selector._rtt = [[8001, Date.now() + 100]];
    intervals[0].callback();
    assert.equal(combat.status().pollIntervalMs, 8);
    combat.stop();
  } finally {
    for (const [key, descriptor] of previous) {
      if (descriptor) Object.defineProperty(globalThis, key, descriptor);
      else delete globalThis[key];
    }
  }
});
