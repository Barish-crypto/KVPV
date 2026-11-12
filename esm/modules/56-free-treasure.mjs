import { getKVPV_FREE_TREASURE as getLegacyFreeTreasure } from '../api.mjs';

/*
 * Daily free treasure is handled centrally by esm/modules/01-red-dot-module.mjs.
 * Keep this module as a compatibility stub so legacy callers do not invoke the
 * old flow accidentally.
 */
export function initialize() {
  const W = globalThis;
  const previous = getLegacyFreeTreasure();

  previous?.stop?.();

  W.KVPV_FREE_TREASURE = Object.freeze({
    sync() {
      return undefined;
    },
    busy() {
      return false;
    },
    stop() {
      return undefined;
    },
    status() {
      return {
        enabled: false,
        reason: 'migrated_to_red_dot_module',
        pending: null,
        freeOnly: true,
        allowKNB: false,
      };
    },
    _handoff() {
      return {
        actor: String(W.__KVPV_OWN_ACTOR_ID || ''),
        pending: null,
        sent: [],
        confirmed: 0,
      };
    },
  });
}

export { getKVPV_FREE_TREASURE } from '../api.mjs';

export const api = Object.freeze({
  get KVPV_FREE_TREASURE() {
    return globalThis.KVPV_FREE_TREASURE;
  },
});

export function call_KVPV_FREE_TREASURE_sync(...args) {
  const target = globalThis.KVPV_FREE_TREASURE;
  const fn = target?.sync;
  if (typeof fn !== 'function') throw Error('KVPV_FREE_TREASURE.sync is not available');
  return Reflect.apply(fn, target, args);
}

export function call_KVPV_FREE_TREASURE_busy(...args) {
  const target = globalThis.KVPV_FREE_TREASURE;
  const fn = target?.busy;
  if (typeof fn !== 'function') throw Error('KVPV_FREE_TREASURE.busy is not available');
  return Reflect.apply(fn, target, args);
}

export function call_KVPV_FREE_TREASURE_stop(...args) {
  const target = globalThis.KVPV_FREE_TREASURE;
  const fn = target?.stop;
  if (typeof fn !== 'function') throw Error('KVPV_FREE_TREASURE.stop is not available');
  return Reflect.apply(fn, target, args);
}

export function call_KVPV_FREE_TREASURE_status(...args) {
  const target = globalThis.KVPV_FREE_TREASURE;
  const fn = target?.status;
  if (typeof fn !== 'function') throw Error('KVPV_FREE_TREASURE.status is not available');
  return Reflect.apply(fn, target, args);
}

export function call_KVPV_FREE_TREASURE__handoff(...args) {
  const target = globalThis.KVPV_FREE_TREASURE;
  const fn = target?._handoff;
  if (typeof fn !== 'function') throw Error('KVPV_FREE_TREASURE._handoff is not available');
  return Reflect.apply(fn, target, args);
}

export {
  initialize as local_anonymous_2_1_0,
  call_KVPV_FREE_TREASURE_status as local_status_1,
  call_KVPV_FREE_TREASURE_sync as local_sync_2,
  call_KVPV_FREE_TREASURE_busy as local_busy_3,
  call_KVPV_FREE_TREASURE_stop as local_stop_4,
  call_KVPV_FREE_TREASURE__handoff as local__handoff_5,
};