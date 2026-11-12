import assert from 'node:assert/strict';
import test from 'node:test';
import { initialize } from '../esm/modules/76-trutien-pvp.mjs';
import { initialize as initializeModes } from '../esm/modules/09-modes.mjs';

function installTruTienHarness(overrides = {}) {
  const keys = ['window','KVPV_DAILY','KVPV_FAR_SCOPE','KVPV_HITRUN1','KVPV_MODE','KVPV_PVP_LUOFENG','KVPV_TH300','KVPV_V1','KVPV_TRUTIEN_PVP',...Object.keys(overrides)];
  const previous = new Map([...new Set(keys)].map(key => [key, Object.getOwnPropertyDescriptor(globalThis, key)]));
  const war = {
    __KVPV_OWN_ACTOR_ID: '42',
    _Ba: { _rJ: { _O$: { ins: { actorId: '42', isDead: false } } } },
    _C: {
      _Mn: { _Cn: { currentID: 52 } },
      _Ba: { instance: { getRole: actorId => actorId === 42 ? role : null } }
    },
    _d: { _Yct: { _Eet: 'skill', _Het: 'combat', _zet: 'mover' } },
    document: { hidden: false, hasFocus: () => true },
    KVPV: { core: { scene: { combat: { claim: () => true } } } },
    setInterval: (fn, ms) => ({ fn, ms }),
    clearInterval: () => {},
    _ft: { _po: { ins: { getCfgById: () => [] } } },
    ...overrides.window
  };

  const target = {
    id: 'enemy-1',
    isValid: true,
    property: { get: key => key === 'type' ? 4 : key === 'hp' ? [100, 100] : key === 'id' ? 'enemy-1' : null },
    on() {},
    off() {}
  };

  const combat = {
    target,
    _Qrt: { getActionTween: () => 1 },
    combat(skill) { combat.calls.push(skill); return skill; },
    calls: [],
    isCooldown: () => false,
    isValidTarget: () => true,
    isValidRange: () => true
  };

  const skill = {
    _rtt: [[8001, Date.now() - 1000], [8002, Date.now() - 1000]],
    _wet: [],
    _f7t: (list) => Number(list[0]?.[0] ?? 0),
    _Tet: 0,
    property: { get: () => 0 }
  };

  const role = {
    id: '42',
    isValid: true,
    property: { get: key => key === 'type' ? 1 : key === 'hp' ? [100, 100] : key === 'id' ? '42' : null },
    getComponent(type) {
      if (type === 'skill') return skill;
      if (type === 'combat') return combat;
      return null;
    },
    on() {},
    off() {}
  };

  const KVPV_DAILY = { quickState: () => ({ running: false, job: 'rảnh' }) };
  const KVPV_FAR_SCOPE = { status: () => ({ inside: true, kind: 'TRU_TIEN' }) };
  const KVPV_HITRUN1 = { status: () => ({ running: false }) };
  const modeState = { mode: 'OFF' };
  const KVPV_MODE = { status: () => ({ ...modeState }), stop: () => { modeState.mode = 'OFF'; } };
  const KVPV_PVP_LUOFENG = { start: () => {}, stop: () => {}, status: () => ({ autoDodge: false }) };
  const KVPV_TH300 = { status: () => ({ running: false }) };
  const KVPV_V1 = { timers: { setInterval: war.setInterval.bind(war), clearInterval: war.clearInterval.bind(war) } };

  Object.defineProperties(globalThis, {
    window: { configurable: true, writable: true, value: war },
    KVPV_DAILY: { configurable: true, writable: true, value: KVPV_DAILY },
    KVPV_FAR_SCOPE: { configurable: true, writable: true, value: KVPV_FAR_SCOPE },
    KVPV_HITRUN1: { configurable: true, writable: true, value: KVPV_HITRUN1 },
    KVPV_MODE: { configurable: true, writable: true, value: KVPV_MODE },
    KVPV_PVP_LUOFENG: { configurable: true, writable: true, value: KVPV_PVP_LUOFENG },
    KVPV_TH300: { configurable: true, writable: true, value: KVPV_TH300 },
    KVPV_V1: { configurable: true, writable: true, value: KVPV_V1 }
  });

  return { restore: () => { for (const [key, descriptor] of previous) { if (descriptor) Object.defineProperty(globalThis, key, descriptor); else delete globalThis[key]; } }, role, target, combat, skill, modeState, ui: war };
}

test('Tru Tien PvP waits for a selected player target and keeps manual focus lock', () => {
  const harness = installTruTienHarness();
  try {
    initialize();
    globalThis.KVPV_TRUTIEN_PVP = globalThis.window.KVPV_TRUTIEN_PVP;
    const module = globalThis.KVPV_TRUTIEN_PVP;
    assert.ok(module);
    const started = module.start({ autoDodge: false, companions: false });
    assert.equal(started.reason, 'active');
    assert.equal(module.status().reason, 'active');
    assert.equal(module.status().selectedPlayer, true);

    const monsterTarget = { id: 'monster-1', isValid: true, property: { get: key => key === 'type' ? 1 : key === 'hp' ? [100, 100] : key === 'id' ? 'monster-1' : null }, on() {}, off() {} };
    harness.combat.target = monsterTarget;
    module.tick();
    assert.equal(module.status().reason, 'focus_locked_switch_manual');
    assert.equal(module.status().focusTargetId, 'enemy-1');

    harness.combat.target = harness.target;
    module.setFocusToSelected();
    harness.combat.target = harness.target;
    module.tick();
    assert.equal(module.status().reason, 'native_basic_cast');
    assert.ok(harness.combat.calls.length >= 1);
  } finally {
    harness.restore();
  }
});

test('Tru Tien PvP re-focuses to the newly selected player when the old target dies', () => {
  const harness = installTruTienHarness();
  try {
    initialize();
    globalThis.KVPV_TRUTIEN_PVP = globalThis.window.KVPV_TRUTIEN_PVP;
    const module = globalThis.KVPV_TRUTIEN_PVP;
    const firstTarget = { id: 'enemy-1', isValid: true, property: { get: key => key === 'type' ? 4 : key === 'hp' ? [100, 100] : key === 'id' ? 'enemy-1' : null }, on() {}, off() {} };
    const secondTarget = { id: 'enemy-2', isValid: true, property: { get: key => key === 'type' ? 4 : key === 'hp' ? [100, 100] : key === 'id' ? 'enemy-2' : null }, on() {}, off() {} };
    module.start({ autoDodge: false, companions: false });
    harness.combat.target = firstTarget;
    module.setFocusToSelected();
    firstTarget.property.get = key => key === 'type' ? 4 : key === 'hp' ? [0, 100] : key === 'id' ? 'enemy-1' : null;
    harness.combat.target = secondTarget;
    module.tick();
    assert.equal(module.status().focusTargetId, 'enemy-2');
    module.stop('manual_stop');
  } finally {
    harness.restore();
  }
});

test('Tru Tien map recovery does not stop the dedicated PvP module', () => {
  const keys = ['window','KVPV_FAR_SCOPE','KVPV_HITRUN1','KVPV_HITRUN_AUTO','KVPV_MODE','KVPV_RANGE281','KVPV_TH300','KVPV_TH_FAR','KVPV_TQ_SCOPE','KVPV_TRUTIEN_PVP','KVPV_V1'];
  const previous = new Map(keys.map(key => [key, Object.getOwnPropertyDescriptor(globalThis, key)]));
  const stopped = [];
  const scope = { status: () => ({ inside: true, kind: 'TRU_TIEN', current: 'TRU_TIEN' }) };
  const war = {
    __KVPV_OWN_ACTOR_ID: '42',
    _Ba: { _rJ: { _O$: { ins: { actorId: '42', isDead: false } } } },
    _C: { _Mn: { _Cn: { currentID: 52 } } },
    KVPV: {},
    setInterval: () => ({ timer: true }),
    clearInterval() {}
  };
  const off = { status: () => ({ running: false, enabled: false }), stop: () => {} };
  const pvp = { status: () => ({ enabled: true }), stop: reason => stopped.push(reason) };
  Object.defineProperties(globalThis, {
    window: { configurable: true, writable: true, value: war },
    KVPV_FAR_SCOPE: { configurable: true, writable: true, value: scope },
    KVPV_HITRUN1: { configurable: true, writable: true, value: off },
    KVPV_HITRUN_AUTO: { configurable: true, writable: true, value: off },
    KVPV_MODE: { configurable: true, writable: true, value: { stop() {} } },
    KVPV_RANGE281: { configurable: true, writable: true, value: { ...off, enable() {} } },
    KVPV_TH300: { configurable: true, writable: true, value: off },
    KVPV_TH_FAR: { configurable: true, writable: true, value: off },
    KVPV_TQ_SCOPE: { configurable: true, writable: true, value: { inside: () => false } },
    KVPV_TRUTIEN_PVP: { configurable: true, writable: true, value: pvp },
    KVPV_V1: { configurable: true, writable: true, value: { timers: { setInterval: war.setInterval, clearInterval: war.clearInterval } } }
  });

  try {
    initializeModes();
    war.KVPV_MODE.armTianQuan();
    assert.deepEqual(stopped, []);
    assert.equal(pvp.status().enabled, true);
  } finally {
    for (const [key, descriptor] of previous) {
      if (descriptor) Object.defineProperty(globalThis, key, descriptor);
      else delete globalThis[key];
    }
  }
});

test('Tru Tien PvP releases a rearmed Tuyet Hoc owner even while unfocused', () => {
  const harness = installTruTienHarness();
  const realNow = Date.now;
  try {
    initialize();
    const module = globalThis.window.KVPV_TRUTIEN_PVP;
    harness.combat.target = { id: 'monster-1', isValid: true, property: { get: key => key === 'type' ? 1 : key === 'hp' ? [100, 100] : key === 'id' ? 'monster-1' : null }, on() {}, off() {} };
    Date.now = () => 10000;
    module.start({ autoDodge: false, companions: false });
    harness.modeState.mode = 'BOSS_TH300';
    harness.ui.document.hasFocus = () => false;
    Date.now = () => 16000;
    module.tick();
    assert.equal(harness.modeState.mode, 'OFF');
    assert.equal(module.status().enabled, true);
    assert.equal(module.status().reason, 'unfocused');
  } finally {
    Date.now = realNow;
    harness.restore();
  }
});
