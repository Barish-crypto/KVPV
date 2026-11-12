import { getKVPV_HITRUN1 as getLegacyHitrun1, getKVPV_HITRUN_AUTO as getLegacyHitrunAuto } from '../api.mjs';

/*
 * Minimal compatibility for the old TH300 scan coordinator.
 * Only one native TH300 sender remains active, and legacy wrappers intentionally
 * stay thin to avoid double-sending or conflicting cooldown tracking.
 */
export function initialize() {
  const W = globalThis;

  if (getLegacyHitrun1() && getLegacyHitrunAuto()) {
    return;
  }

  actor = String(W.__KVPV_OWN_ACTOR_ID ?? '');
  state = { enabled: false, running: false, phase: 'FIGHT', reason: 'off' };

  if (!getLegacyHitrun1()) {
    W.KVPV_HITRUN1 = Object.freeze({ start, stop, status });
  }

  if (!getLegacyHitrunAuto()) {
    W.KVPV_HITRUN_AUTO = Object.freeze({ rearm, status: autoStatus, stop, repairPolling: rearm });
  }
}

let actor = '';
let state = { enabled: false, running: false, phase: 'FIGHT', reason: 'off' };

function ownActor() {
  const W = globalThis;
  return Boolean(actor) && String(W._Ba?._rJ?._O$?.ins?.actorId ?? '') === actor && !W.__KVPV_UNIVERSAL_HALTED;
}

function hp() {
  const W = globalThis;
  const role = W._C?._Ba?.instance?.getRole?.(Number(actor));
  const value = role?.property?.get?.('hp');
  return Array.isArray(value) && Number(value[1]) > 0 ? (100 * Number(value[0])) / Number(value[1]) : null;
}

function status() {
  const pct = hp();
  if (state.running && pct !== null) {
    if (pct <= 35) state.phase = 'RETREAT';
    else if (pct >= 100) state.phase = 'FIGHT';
  }
  return {
    ...state,
    phase: state.phase,
    hpPct: pct,
    compatibility: true,
    combatRunning: state.running && state.phase === 'FIGHT',
  };
}

function start() {
  if (!ownActor()) return { ...status(), reason: 'waiting_actor' };
  state.enabled = true;
  state.running = true;
  state.reason = 'th300_scan_compat';
  return status();
}

function stop(reason = 'stop') {
  state.enabled = false;
  state.running = false;
  state.reason = String(reason);
  return status();
}

function rearm() {
  start();
  return autoStatus();
}

function autoStatus() {
  return { enabled: state.enabled, timerActive: state.running, compatibility: true };
}

export { getKVPV_HITRUN1 } from '../api.mjs';
export { getKVPV_HITRUN_AUTO } from '../api.mjs';

export const api = Object.freeze({
  get KVPV_HITRUN1() {
    return globalThis.KVPV_HITRUN1;
  },
  get KVPV_HITRUN_AUTO() {
    return globalThis.KVPV_HITRUN_AUTO;
  },
});

export function call_KVPV_HITRUN1_start(...args) {
  const target = globalThis.KVPV_HITRUN1;
  const fn = target?.start;
  if (typeof fn !== 'function') throw Error('KVPV_HITRUN1.start is not available');
  return Reflect.apply(fn, target, args);
}

export function call_KVPV_HITRUN1_stop(...args) {
  const target = globalThis.KVPV_HITRUN1;
  const fn = target?.stop;
  if (typeof fn !== 'function') throw Error('KVPV_HITRUN1.stop is not available');
  return Reflect.apply(fn, target, args);
}

export function call_KVPV_HITRUN1_status(...args) {
  const target = globalThis.KVPV_HITRUN1;
  const fn = target?.status;
  if (typeof fn !== 'function') throw Error('KVPV_HITRUN1.status is not available');
  return Reflect.apply(fn, target, args);
}

export function call_KVPV_HITRUN_AUTO_rearm(...args) {
  const target = globalThis.KVPV_HITRUN_AUTO;
  const fn = target?.rearm;
  if (typeof fn !== 'function') throw Error('KVPV_HITRUN_AUTO.rearm is not available');
  return Reflect.apply(fn, target, args);
}

export function call_KVPV_HITRUN_AUTO_status(...args) {
  const target = globalThis.KVPV_HITRUN_AUTO;
  const fn = target?.status;
  if (typeof fn !== 'function') throw Error('KVPV_HITRUN_AUTO.status is not available');
  return Reflect.apply(fn, target, args);
}

export function call_KVPV_HITRUN_AUTO_stop(...args) {
  const target = globalThis.KVPV_HITRUN_AUTO;
  const fn = target?.stop;
  if (typeof fn !== 'function') throw Error('KVPV_HITRUN_AUTO.stop is not available');
  return Reflect.apply(fn, target, args);
}

export function call_KVPV_HITRUN_AUTO_repairPolling(...args) {
  const target = globalThis.KVPV_HITRUN_AUTO;
  const fn = target?.repairPolling;
  if (typeof fn !== 'function') throw Error('KVPV_HITRUN_AUTO.repairPolling is not available');
  return Reflect.apply(fn, target, args);
}

export {
  initialize as local_anonymous_5_1_0,
  ownActor as local_own_1,
  hp as local_hp_2,
  status as local_status_3,
  start as local_start_4,
  stop as local_stop_5,
  rearm as local_rearm_6,
  autoStatus as local_autoStatus_7,
};