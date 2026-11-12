import assert from 'node:assert/strict';
import test from 'node:test';
import { initialize as initializeRangeKeeper } from '../esm/modules/09-range-keeper310.mjs';

function installGlobals(values) {
  const previous = new Map(Object.keys(values).map(key => [key, Object.getOwnPropertyDescriptor(globalThis, key)]));
  for (const [key, value] of Object.entries(values)) {
    Object.defineProperty(globalThis, key, { configurable: true, writable: true, value });
  }
  return () => {
    for (const [key, descriptor] of previous) {
      if (descriptor) Object.defineProperty(globalThis, key, descriptor);
      else delete globalThis[key];
    }
  };
}

function setupRangeKeeper({ map = 74001, scene = 74, sceneType = 74, common = false, kind = 'EXPEDITION', claimGranted = true } = {}) {
  const actorPosition = { x: 0, y: 0 };
  const targetPosition = { x: 500, y: 0 };
  const moves = [];
  const target = {
    isValid: true,
    property: {
      get: key => key === 'type' ? 1 : key === 'hp' ? [100, 100] : key === 'position' ? targetPosition : null
    }
  };
  const mover = {
    moveTo(x, y) { moves.push({ x, y }); },
    running: () => false,
    stop() {}
  };
  const combat = { target };
  const role = {
    property: { get: key => key === 'position' ? actorPosition : key === 'hp' ? [100, 100] : null },
    getComponent: key => key === '_zet' ? mover : key === '_Het' ? combat : null
  };
  const scope = { inside: kind !== 'OUTSIDE', kind, current: map };
  const window = {
    __KVPV_OWN_ACTOR_ID: '123456',
    _Ba: {
      _rJ: { _O$: { ins: { actorId: '123456', isDead: false } } },
      _$a: { SceneUtil: { curScene: scene, isCommonScene: common }, _yo: { ins: { intoSce: [map, 0, 0], isInMission: false } } }
    },
    _C: { _Mn: { _Cn: { currentID: map } }, _Ba: { instance: { getRole: () => role } } },
    _d: { _Yct: { _zet: '_zet', _Het: '_Het' } },
    _ft: { _po: { ins: { getCfgById: () => [map, 0, 0, 0, 0, 0, 0, sceneType] } } },
    setInterval(callback, ms) { return { callback, ms }; },
    clearInterval() {},
    KVPV: { core: { scene: { combat: { claim: () => claimGranted, withdraw: () => true } } } }
  };
  const restore = installGlobals({
    window,
    KVPV_RANGE_KEEP310: undefined,
    KVPV_FAR_SCOPE: { status: () => scope, eligible: () => true },
    KVPV_ENTRY_POLICY: { manual: false },
    KVPV_EVENT_PRIORITY: { hold: () => false },
    KVPV_BOSS_TEAM: { priority: () => false },
    KVPV_HITRUN1: { status: () => ({ running: false, phase: 'FIGHT' }) },
    KVPV_V1: { timers: { setInterval: window.setInterval.bind(window), clearInterval: window.clearInterval.bind(window) } }
  });
  initializeRangeKeeper();
  return { window, actorPosition, targetPosition, moves, mover, restore };
}

for (const context of [
  { name: 'regular common map', options: { map: 101, scene: 1, sceneType: 1, common: true, kind: 'OUTSIDE' } },
  { name: 'verified Expedition', options: { map: 74001, scene: 74, sceneType: 74, common: false, kind: 'EXPEDITION' } }
]) {
  test(`range keeper maintains 310 and guards native approach on a ${context.name}`, () => {
    const state = setupRangeKeeper(context.options);
    try {
      const keeper = state.window.KVPV_RANGE_KEEP310;
      keeper.tick();
      assert.equal(state.moves.length, 1);
      assert.equal(Math.round(Math.hypot(
        state.moves[0].x - state.targetPosition.x,
        state.moves[0].y - state.targetPosition.y
      )), 310);

      state.actorPosition.x = 190;
      state.mover.moveTo(250, 0);
      assert.equal(state.moves.length, 1);
      assert.equal(keeper.status().blockedApproaches, 1);
      keeper.stop();
    } finally {
      state.restore();
    }
  });
}

test('range keeper leaves Crystal-map positioning to the native basic-only controller', () => {
  const state = setupRangeKeeper({ map: 2992, scene: 35, sceneType: 35, common: true, kind: 'OUTSIDE' });
  try {
    const keeper = state.window.KVPV_RANGE_KEEP310;
    keeper.tick();
    assert.equal(state.moves.length, 0);
    assert.equal(keeper.status().reason, 'crystal_no_standoff');
    keeper.stop();
  } finally {
    state.restore();
  }
});

test('range keeper yields movement when it does not own the combat dispatch lane', () => {
  const state = setupRangeKeeper({ map: 101, scene: 1, sceneType: 1, common: true, kind: 'OUTSIDE', claimGranted: false });
  try {
    const keeper = state.window.KVPV_RANGE_KEEP310;
    keeper.tick();
    assert.equal(state.moves.length, 0);
    assert.equal(keeper.status().reason, 'combat_dispatch_wait');
    keeper.stop();
  } finally {
    state.restore();
  }
});
