/* Run in the game page console. Client-only experiment; no server requests. */
(() => {
  'use strict';
  const W = window;
  if (W.KVPV_BAG_CAPACITY_TEST) {
    console.info('Bag experiment already installed', W.KVPV_BAG_CAPACITY_TEST.status());
    return;
  }
  const bag = W._Ba?._Ic?._aQ?.ins;
  if (!bag || typeof bag.getBagLeftNumById !== 'function' ||
      typeof bag.getItemsByBagType !== 'function') {
    throw new Error('Game bag model unavailable. Run inside the loaded game frame.');
  }
  const key = 'getBagLeftNumById';
  const original = bag[key];
  const descriptor = Object.getOwnPropertyDescriptor(bag, key);
  const capacity = 1000000;
  function patched(type) {
    if (type !== 0) return original.apply(this, arguments);
    const items = this.getItemsByBagType(0);
    return Math.max(original.apply(this, arguments), capacity - (items ? items.length : 0));
  }
  Object.defineProperty(bag, key, { configurable: true, writable: true,
    enumerable: descriptor ? descriptor.enumerable : false, value: patched });
  const api = {
    status() {
      const items = bag.getItemsByBagType(0);
      return { installed: bag[key] === patched, bagType: 0, clientCapacity: capacity,
        usedSlots: items ? items.length : 0, originalFreeSlots: original.call(bag, 0),
        patchedFreeSlots: bag[key](0), serverCapacity: 'unverified' };
    },
    restore() {
      if (bag[key] !== patched) throw new Error('Bag hook changed; refusing to overwrite another hook.');
      if (descriptor) Object.defineProperty(bag, key, descriptor);
      else delete bag[key];
      delete W.KVPV_BAG_CAPACITY_TEST;
      return 'Original client bag check restored';
    }
  };
  W.KVPV_BAG_CAPACITY_TEST = api;
  console.info('Client bag capacity experiment installed', api.status());
})();
