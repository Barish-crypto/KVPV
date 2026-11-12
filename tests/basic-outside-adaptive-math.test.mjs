import assert from 'node:assert/strict';
import test from 'node:test';
import { estimateRecentDamage } from '../esm/modules/12-basic-outside.mjs';

test('adaptive damage estimate favors recent matched hits and bounds its window', () => {
  assert.equal(estimateRecentDamage([], 350), 350);
  assert.equal(estimateRecentDamage([1000, 1000, 100], 700), 1000 - 900 * (2 / 13));
  assert.equal(estimateRecentDamage([9999, ...Array(12).fill(100)], 900), 100);
});
