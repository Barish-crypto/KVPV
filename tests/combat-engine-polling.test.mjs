import assert from 'node:assert/strict';
import test from 'node:test';
import { initialize } from '../esm/modules/09-combat-engine.mjs';

test('combat polling adapts to idle, target-ready, and cast-ready states', async () => {
  const keys = ['window', 'KVPV_V1', 'KVPV_FAR_SCOPE', 'KVPV_ENTRY_POLICY', 'KVPV_EVENT_PRIORITY', 'KVPV_BOSS_TEAM'];
  const previous = new Map(keys.map(key => [key, Object.getOwnPropertyDescriptor(globalThis, key)]));
  const intervals = [];
  let cooldown = true;
  let selected = 0;
  let selectedSkill = 1001;
  let casts = 0;
  const target = { property: { get: key => key === 'type' ? 1 : key === 'hp' ? [100, 100] : null } };
  const skill = {
    _rtt: [[1001, Date.now() - 1]],
    _wet: [],
    _Tet: -1,
    property: { get: () => 0 },
    selectSkill() { selected++; return selectedSkill; }
  };
  const combat = {
    target,
    isValidRange: () => true,
    isCooldown: () => cooldown,
    combat() { casts++; }
  };
  const role = { getComponent: type => type === 'skill' ? skill : type === 'combat' ? combat : null };
  const window = {
    __KVPV_OWN_ACTOR_ID: '123456',
    _Ba: {
      _rJ: { _O$: { ins: { actorId: '123456', isDead: false } } },
      _$a: { SceneUtil: { curScene: 1 } }
    },
    _C: { _Mn: { _Cn: { currentID: 42 } }, _Ba: { instance: { getRole: () => role } } },
    _d: { _Yct: { _Eet: 'skill', _Het: 'combat', _zet: 'mover' } },
    _ft: { _po: { ins: { getCfgById: () => [] } } },
    KVPV: { core: { scene: { combat: { claim: () => true } } } },
    setInterval(callback, ms) { const timer = { callback, ms }; intervals.push(timer); return timer; },
    clearInterval() {},
    setTimeout
  };

  Object.defineProperties(globalThis, {
    window: { configurable: true, writable: true, value: window },
    KVPV_V1: { configurable: true, writable: true, value: { timers: {
      setInterval: window.setInterval.bind(window),
      clearInterval: window.clearInterval.bind(window)
    } } },
    KVPV_FAR_SCOPE: { configurable: true, writable: true, value: { inside: () => true, status: () => ({ kind: 'BOSS' }) } },
    KVPV_ENTRY_POLICY: { configurable: true, writable: true, value: { manual: false } },
    KVPV_EVENT_PRIORITY: { configurable: true, writable: true, value: { hold: () => false } },
    KVPV_BOSS_TEAM: { configurable: true, writable: true, value: { priority: () => false } }
  });

  try {
    initialize();
    const engine = window.KVPV_COMBAT_ENGINE;
    assert.equal(engine.status().reason, 'native_cooldown');
    assert.equal(engine.status().pollIntervalMs, 8);

    cooldown = false;
    await engine.tick();
    assert.equal(engine.status().reason, 'native_cast_requested');
    assert.equal(engine.status().pollIntervalMs, 4);
    assert.equal(selected, 1);
    assert.equal(casts, 1);

    selectedSkill = 8001;
    skill._rtt = [[8001, Date.now() - 1]];
    await engine.tick();
    assert.equal(engine.status().lastSkill, 8001);
    assert.equal(engine.status().pollIntervalMs, 1);

    cooldown = true;
    await engine.tick();
    assert.equal(engine.status().reason, 'native_cooldown');
    assert.equal(engine.status().pollIntervalMs, 1);

    selectedSkill = 1002;
    skill._rtt = [[1001, Date.now() + 10], [1002, Date.now() - 1]];
    cooldown = false;
    await engine.tick();
    assert.equal(engine.status().lastSkill, 1002);
    assert.equal(engine.status().reason, 'native_cast_requested');
    assert.equal(engine.status().pollIntervalMs, 4);

    skill._rtt = [[1001, Date.now() + 20]];
    await engine.tick();
    assert.equal(engine.status().reason, 'native_selection_boundary');
    assert.ok(engine.status().nativeSelectionWaitMs > 0);
    assert.equal(
      engine.status().pollIntervalMs,
      Math.max(1, Math.min(16, Math.ceil(engine.status().nativeSelectionWaitMs * 0.75)))
    );

    const realNow = Date.now;
    let clock = realNow();
    try {
      Date.now = () => clock;
      cooldown = true;
      intervals[intervals.length - 1].callback();
      clock += engine.status().pollIntervalMs;
      intervals[intervals.length - 1].callback();
      clock += 40;
      intervals[intervals.length - 1].callback();
      assert.ok(engine.status().schedulerLagMs > 0);
      cooldown = false;
      skill._rtt = [[1001, clock + 20]];
      await engine.tick();
      assert.equal(engine.status().reason, 'native_selection_boundary');
      assert.equal(
        engine.status().pollIntervalMs,
        Math.max(1, Math.min(16, Math.ceil(
          engine.status().nativeSelectionWaitMs * 0.75 - Math.min(4, engine.status().schedulerLagMs)
        )))
      );
    } finally {
      Date.now = realNow;
    }

    globalThis.KVPV_FAR_SCOPE.inside = () => false;
    await engine.tick();
    assert.equal(engine.status().reason, 'outside_boss_scope');
    assert.equal(engine.status().pollIntervalMs, 16);
    engine.stop();
  } finally {
    for (const [key, descriptor] of previous) {
      if (descriptor) Object.defineProperty(globalThis, key, descriptor);
      else delete globalThis[key];
    }
  }
});
