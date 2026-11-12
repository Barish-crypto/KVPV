import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { runInNewContext } from 'node:vm';
import test from 'node:test';

const source = await readFile(new URL('../edge-addon/core.js', import.meta.url), 'utf8');
const { GameBridge: LiveGameBridge } = createRequire(import.meta.url)('../live/core.cjs');

async function assertStalledFrameDoesNotBlock(GameBridge) {
  const sandbox = { self: {}, URL };
  let Bridge = GameBridge;
  if (!Bridge) {
    runInNewContext(source, sandbox);
    Bridge = sandbox.self.KVPV_EDGE_CORE.GameBridge;
  }

  const listeners = [];
  const cdp = {
    on(event, listener) {
      if (event === 'event') listeners.push(listener);
    },
    async send(method, params = {}) {
      if (method === 'Target.getTargets') {
        return { targetInfos: [{ type: 'page', targetId: 'game', url: 'https://play.choingay.vn/1046' }] };
      }
      if (method === 'Target.attachToTarget') return { sessionId: 'game-session' };
      if (method === 'Page.getFrameTree') return { frameTree: { frame: { id: 'game-frame' } } };
      if (method === 'Runtime.evaluate') {
        if (params.contextId === 1) return new Promise(() => {});
        return { result: { value: { ready: false, actor: '10228867268946' } } };
      }
      return {};
    }
  };

  const bridge = new Bridge(cdp);
  for (const id of [1, 2]) {
    listeners[0]({
      method: 'Runtime.executionContextCreated',
      sessionId: 'game-session',
      params: { context: { id, auxData: { isDefault: true, frameId: 'game-frame' } } }
    });
  }

  const started = Date.now();
  await bridge.sync({});
  assert.ok(Date.now() - started < 250, 'sync should not wait for a stalled context');

  await new Promise(resolve => setTimeout(resolve, 0));
  const result = await bridge.sync({});
  assert.deepEqual([...result.heartbeats], ['10228867268946']);
}

test('a stalled frame does not block heartbeats from another game context', async t => {
  await t.test('Edge extension core', () => assertStalledFrameDoesNotBlock());
  await t.test('live watcher core', () => assertStalledFrameDoesNotBlock(LiveGameBridge));
});

async function assertTargetDiscoveryFailureIsIgnored(GameBridge) {
  const logMessages = [];
  const bridge = new GameBridge({
    on() {},
    async send(method) {
      if (method === 'Target.getTargets') throw new Error('Target not found');
      return {};
    }
  }, message => logMessages.push(message));

  const result = await bridge.sync({});
  assert.equal(result.pages, 0);
  assert.equal(result.contexts, 0);
  assert.deepEqual(Array.from(result.diagnostics || []), []);
  assert.deepEqual(Array.from(result.heartbeats || []), []);
  assert.match(logMessages[0] || '', /TARGETS ERROR:/);
}

test('sync treats target-discovery failures as an empty, non-fatal state', async t => {
  await t.test('Edge extension core', async () => {
    const sandbox = { self: {}, URL };
    runInNewContext(source, sandbox);
    const Bridge = sandbox.self.KVPV_EDGE_CORE.GameBridge;
    await assertTargetDiscoveryFailureIsIgnored(Bridge);
  });
  await t.test('live watcher core', async () => {
    await assertTargetDiscoveryFailureIsIgnored(LiveGameBridge);
  });
});

async function assertTruTienDashboardAction(GameBridge) {
  const bridge = new GameBridge({ on() {}, async send() { return {}; } });
  const context = { id: 1 };
  bridge.contexts.set('game/1', context);
  bridge.contextActors.set('game/1', { actor: '10228867268946', at: Date.now() });
  let expression = '',evaluations=0,installs=0,startOptions=null;
  let state={actor:'10228867268946',enabled:false,reason:'off',selectedPlayer:false,targetId:''};
  const page={__KVPV_CONTROL_INSTALLERS:{}};
  page.__KVPV_CONTROL_INSTALLERS['76-trutien-pvp.js']=()=>{
    installs++;
    page.KVPV_TRUTIEN_PVP={
      status:()=>state,
      start(options){startOptions=options;state={...state,enabled:true,reason:'active'};},
      stop(){state={...state,enabled:false,reason:'dashboard_stop'};}
    };
  };
  bridge.evaluate = async (_context, source) => {
    evaluations++;
    expression = source;
    return runInNewContext(source,{window:page});
  };

  const idle=await bridge.truTienAction('status');
  assert.equal(idle.enabled,false);
  assert.equal(idle.reason,'not_initialized');
  assert.equal(installs,0);
  const started=await bridge.truTienAction('start');
  assert.equal(started.enabled,true);
  assert.equal(started.reason,'active');
  assert.equal(startOptions.autoDodge,false);
  assert.equal(startOptions.companions,false);
  assert.equal(installs,1);
  assert.match(expression, /KVPV_TRUTIEN_PVP/);
  assert.match(expression, /__KVPV_CONTROL_INSTALLERS/);
  assert.match(expression, /76-trutien-pvp\.js/);
  assert.match(expression, /autoDodge:false,companions:false/);
  const stopped=await bridge.truTienAction('stop');
  assert.equal(stopped.enabled,false);
  bridge.contexts.set('game/2', { id: 2 });
  bridge.contextActors.set('game/2', { actor: '10228867268947', at: Date.now() });
  await assert.rejects(bridge.truTienAction('start'), /nhiều nhân vật/);
  assert.equal(evaluations, 3);
  await assert.rejects(bridge.truTienAction('arbitrary'), /Invalid Tru Tien action/);
}

test('dashboard starts only the dedicated Tru Tiên basic-PvP mode', async t => {
  await t.test('Edge extension core', async () => {
    const sandbox = { self: {}, URL };
    runInNewContext(source, sandbox);
    await assertTruTienDashboardAction(sandbox.self.KVPV_EDGE_CORE.GameBridge);
  });
  await t.test('live watcher core', async () => {
    await assertTruTienDashboardAction(LiveGameBridge);
  });
});
