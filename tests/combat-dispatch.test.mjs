import assert from 'node:assert/strict';
import test from 'node:test';
import { createCombatDispatcher } from '../esm/modules/02-scene.mjs';

test('selects the highest-priority active sender after the settle window', () => {
  let time = 0;
  const dispatcher = createCombatDispatcher({
    now: () => time,
    context: () => 'actor:map:scene',
    settleMs: 100,
    ttlMs: 500
  });

  assert.equal(dispatcher.claim('general', 20), false);
  time = 50;
  assert.equal(dispatcher.claim('event', 80), false);
  assert.equal(dispatcher.status().lanes.player.owner, 'event');
  time = 150;
  assert.equal(dispatcher.claim('general', 20), false);
  assert.equal(dispatcher.claim('event', 80), true);
});

test('resets ownership on a scene change and expires stale senders', () => {
  let time = 0;
  let context = 'actor:map-a:scene-a';
  const dispatcher = createCombatDispatcher({
    now: () => time,
    context: () => context,
    settleMs: 100,
    ttlMs: 300
  });

  assert.equal(dispatcher.claim('general', 20), false);
  time = 100;
  assert.equal(dispatcher.claim('general', 20), true);

  context = 'actor:map-b:scene-b';
  assert.equal(dispatcher.claim('event', 80), false);
  assert.equal(dispatcher.status().lanes.player.owner, 'event');
  time = 400;
  assert.equal(dispatcher.status().lanes.player.owner, null);
});

test('keeps companion and player senders on independent lanes', () => {
  let time = 0;
  const dispatcher = createCombatDispatcher({
    now: () => time,
    context: () => 'actor:map:scene',
    settleMs: 50,
    ttlMs: 300
  });

  assert.equal(dispatcher.claim('player-strategy', 30), false);
  assert.equal(dispatcher.claim('companion-strategy', 10, 'companion'), false);
  time = 50;
  assert.equal(dispatcher.claim('player-strategy', 30), true);
  assert.equal(dispatcher.claim('companion-strategy', 10, 'companion'), true);
});
