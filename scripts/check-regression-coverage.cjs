'use strict';
/* Fail closed when a new offline TEST_*.cjs is added but omitted from the
 * main cross-platform regression runner. Explicit browser/native exceptions
 * remain manual to avoid touching logged-in sessions in CI. */
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');

const root = path.resolve(__dirname, '..');
const runner = fs.readFileSync(path.join(root, 'test.cjs'), 'utf8');
const match = runner.match(/for\s*\(\s*const\s+file\s+of\s*\[([\s\S]*?)\]\s*\)/);
assert(match, 'Could not locate the main regression suite list in test.cjs');

const listed = new Set(
  [...match[1].matchAll(/['"](TEST_[A-Z0-9_]+\.cjs)['"]/g)].map(m => m[1])
);
const manual = new Map([
  ['TEST_EDGE_BROWSER.cjs', 'requires a real browser session'],
  ['TEST_EDGE_NATIVE.cjs', 'requires a native Windows host'],
  ['TEST_LIVE_BROWSER.cjs', 'requires a live logged-in game session']
]);

// Historical, non-executable TH300 regressions. Kept for reference; do not count as passing new-engine tests.
const archived = new Set(["TEST_LINHLUNG_TH.cjs","TEST_FAST_SKILL_POLL.cjs","TEST_TRU_TIEN.cjs","TEST_TH300.cjs","TEST_RANGE_TRIAL.cjs","TEST_TH_OLD_1296.cjs","TEST_MODES_1296.cjs","TEST_TQ_FIVE_BASICS.cjs","TEST_TQ_FIVE_TAIL1MS.cjs","TEST_TQ_BASIC_FORCE.cjs","TEST_TQ_TH_VISUAL99.cjs","TEST_TQ_TH_GAP_BASIC.cjs","TEST_TQ_IDLE_FILL.cjs","TEST_TQ_COSMIC.cjs","TEST_TQ_LUOFENG.cjs","TEST_TQ4100_PILOT.cjs","TEST_TQ4100_BASIC_SOLO.cjs","TEST_TQ4100_COOLDOWN_TRIAL.cjs"]);
const found = fs.readdirSync(root)
  .filter(name => /^TEST_[A-Z0-9_]+\.cjs$/.test(name))
  .sort();
const omitted = found.filter(name => !listed.has(name) && !manual.has(name) && !archived.has(name));
const missing = [...listed].filter(name => !found.includes(name));
const missingArchived = [...archived].filter(name => !found.includes(name));
const missingManual = [...manual.keys()].filter(name => !found.includes(name));

assert.deepEqual(omitted, [],
  'Unregistered offline regression tests; add to test.cjs or justify manual-only status');
assert.deepEqual(missing, [], 'Registered tests no longer exist');
assert.deepEqual(missingArchived, [], 'Archived legacy suite list is stale');
assert.deepEqual(missingManual, [], 'Manual-only exclusion list is stale');
assert(listed.has('TEST_DIET_THO_HAO_AUTO.cjs'), 'Diệt Thổ Hào regression must run');
assert(listed.has('TEST_MATHAN_RAGE.cjs'), 'Ma Thần regression must run');
console.log(
  'PASS regression discovery: ' + listed.size +
  ' suites registered, ' + manual.size + ' manual-only; none omitted'
);
