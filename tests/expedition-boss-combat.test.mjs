import assert from 'node:assert/strict';
import test from 'node:test';
import { initialize as initializeFarScope, pvpCoordinateDistance } from '../esm/modules/00-far-scope.mjs';
import { initialize as initializeBossUnified } from '../esm/modules/09-boss-unified.mjs';
import { initialize as initializeCombatEngine } from '../esm/modules/09-combat-engine.mjs';

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

function expeditionWindow() {
  const actor = {
    property: { get: key => key === 'position' ? { x: 0, y: 0 } : null }
  };
  const boss = {
    isValid: true,
    property: {
      get: key => key === 'type' ? 1 : key === 'hp' ? [100, 100] :
        key === 'position' ? { x: 30, y: 40 } : null
    }
  };
  const window = {
    __KVPV_OWN_ACTOR_ID: '123456',
    _Ba: {
      _rJ: { _O$: { ins: { actorId: '123456', isDead: false } } },
      _$a: {
        SceneUtil: { curScene: 74, isCommonScene: false },
        _yo: { ins: { intoSce: [74001], isInMission: true } }
      }
    },
    _C: {
      _Mn: { _Cn: { currentID: 74001 } },
      _Ba: { instance: { getRole: () => actor } }
    },
    _ft: { _po: { ins: { getCfgById: () => [74001, 0, 0, 0, 0, 0, 0, 74] } } },
    setInterval(callback, ms) { return { callback, ms }; },
    clearInterval() {},
    setTimeout
  };
  return { window, actor, boss };
}

test('Expedition scope requires the live scene type, map, and owned actor to agree', () => {
  assert.equal(pvpCoordinateDistance({ x: 0, y: 0 }, { x: 30, y: 40 }), 50);
  assert.equal(pvpCoordinateDistance({ x: 0, y: NaN }, { x: 30, y: 40 }), null);
  const { window, boss } = expeditionWindow();
  const restore = installGlobals({ window });
  try {
    initializeFarScope();
    const scope = window.KVPV_FAR_SCOPE;
    assert.deepEqual(
      { inside: scope.status().inside, kind: scope.status().kind, current: scope.status().current },
      { inside: true, kind: 'EXPEDITION', current: 74001 }
    );
    assert.equal(scope.eligible(boss), true);
    assert.equal(scope.eligible({
      property: { get: key => key === 'type' ? 4 : key === 'hp' ? [100, 100] : key === 'position' ? { x: 1, y: 1 } : null }
    }), false);

    window._Ba._$a._yo.ins.isInMission = false;
    assert.equal(scope.status().inside, true);
    window._Ba._$a._yo.ins.intoSce[0] = 74002;
    assert.equal(scope.status().inside, false);
    window._Ba._$a._yo.ins.intoSce[0] = 74001;
    window._ft._po.ins.getCfgById = () => [74001, 0, 0, 0, 0, 0, 0, 73];
    assert.equal(scope.status().inside, false);
    window._ft._po.ins.getCfgById = () => [74001, 0, 0, 0, 0, 0, 0, 74];
    window._Ba._$a.SceneUtil.isCommonScene = true;
    assert.equal(scope.status().inside, false);
    window._Ba._$a.SceneUtil.isCommonScene = false;
    window._Ba._$a.SceneUtil.curScene = 73;
    assert.equal(scope.status().inside, false);
    window._Ba._$a.SceneUtil.curScene = 74;
    window._Ba._rJ._O$.ins.actorId = '654321';
    assert.equal(scope.status().inside, false);
  } finally {
    restore();
  }
});

test('Expedition mode activation delegates once to unified BOSS and yields to a PvP owner', () => {
  const { window } = expeditionWindow();
  const modeCalls = [];
  let verified = true;
  const farScope = {
    status: () => ({ inside: verified, kind: verified ? 'EXPEDITION' : 'OUTSIDE' }),
    eligible: () => true
  };
  window.KVPV_MODE = { status: () => ({ mode: 'OFF' }), start: mode => modeCalls.push(mode) };
  const restore = installGlobals({
    window,
    KVPV_MODE: window.KVPV_MODE,
    KVPV_FAR_SCOPE: farScope,
    KVPV_TRANH_BA_TU_PHUONG: undefined,
    KVPV_V1: { timers: { setInterval: window.setInterval.bind(window), clearInterval: window.clearInterval.bind(window) } }
  });
  try {
    initializeBossUnified();
    const boss = window.KVPV_BOSS_UNIFIED;
    boss.start('BOSS');
    assert.deepEqual(modeCalls, ['BOSS']);
    boss.stop();

    verified = false;
    assert.throws(() => boss.start('BOSS'), /not authoritatively verified/);
    verified = true;
    window.KVPV_TRANH_BA_TU_PHUONG = { status: () => ({ running: true }) };
    globalThis.KVPV_TRANH_BA_TU_PHUONG = window.KVPV_TRANH_BA_TU_PHUONG;
    assert.throws(() => boss.start('BOSS'), /yielded to active PvP owner/);
    assert.deepEqual(modeCalls, ['BOSS']);
  } finally {
    restore();
  }
});

test('the general combat-engine sender stays passive in Expedition', async () => {
  const { window } = expeditionWindow();
  const restore = installGlobals({
    window,
    KVPV_V1: { timers: { setInterval: window.setInterval.bind(window), clearInterval: window.clearInterval.bind(window) } },
    KVPV_FAR_SCOPE: {
      inside: () => true,
      status: () => ({ inside: true, kind: 'EXPEDITION' })
    },
    KVPV_ENTRY_POLICY: { manual: false },
    KVPV_EVENT_PRIORITY: { hold: () => false },
    KVPV_BOSS_TEAM: { priority: () => false }
  });
  try {
    initializeCombatEngine();
    const engine = window.KVPV_COMBAT_ENGINE;
    assert.equal(engine.status().reason, 'expedition_unified_boss_owner_required');
    await engine.tick();
    assert.equal(engine.status().reason, 'expedition_unified_boss_owner_required');
    engine.stop();
  } finally {
    restore();
  }
});
