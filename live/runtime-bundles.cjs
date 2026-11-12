'use strict';

const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const esbuild = require('esbuild');

const moduleRuntimeStart = '/*__KVPV_MODULE_RUNTIME_START__*/';
const moduleRuntimeEnd = '/*__KVPV_MODULE_RUNTIME_END__*/';
const bundleCache = new Map();

function moduleCatalog(root) {
  const esmDir = path.join(root, 'esm');
  const manifest = JSON.parse(fs.readFileSync(path.join(esmDir, 'manifest.json'), 'utf8'));
  const schema = require(path.join(root, 'live', 'desktop-controls.cjs')).moduleSchema;
  const moduleNames = new Set(manifest.modules.map(module => module.name));
  const selectable = Object.keys(schema);
  if (selectable.some(name => !moduleNames.has(name))) throw new Error('Control schema contains a module outside the ESM catalog.');

  const initialized = manifest.initializedModules;
  const initializedSet = new Set(initialized);
  const baseline = initialized.filter(name => !Object.hasOwn(schema, name));
  // The dashboard needs this catalog before the user can enable its dispatcher.
  const bootstrap = initialized.filter(name =>
    !Object.hasOwn(schema, name) || name === '01-red-dot-module.js');
  const selectableOrder = [
    ...initialized.filter(name => Object.hasOwn(schema, name)),
    ...manifest.modules.map(module => module.name).filter(name => Object.hasOwn(schema, name) && !initializedSet.has(name))
  ];
  return { esmDir, schema, moduleNames, baseline, bootstrap, selectableOrder };
}

function normalizeModuleSet(root, requested) {
  if (!Array.isArray(requested) || requested.length > 128 ||
      requested.some(name => typeof name !== 'string')) throw new Error('Invalid runtime module selection.');
  const { schema, selectableOrder } = moduleCatalog(root);
  const selected = new Set(requested);
  if ([...selected].some(name => !Object.hasOwn(schema, name))) throw new Error('Runtime selection contains a non-controllable module.');
  return selectableOrder.filter(name => selected.has(name));
}

function compileModuleRuntime(root, requested = []) {
  const { esmDir, baseline, bootstrap, selectableOrder } = moduleCatalog(root);
  normalizeModuleSet(root, requested);
  const included = [...baseline, ...selectableOrder];
  const names = new Map(included.map((file, index) => [file, `__initialize${index}`]));
  const imports = included.map(file =>
    `import {initialize as ${names.get(file)}} from ${JSON.stringify('./modules/' + file.replace(/\.js$/, '.mjs'))};`
  );
  const initializers = included.map(file => `${JSON.stringify(file)}:${names.get(file)}`).join(',');
  const installOrder = selectableOrder.map(file => `${JSON.stringify(file)}:${names.get(file)}`).join(',');
  const initializeBootstrap = bootstrap.map(file => `${names.get(file)}();`).join('\n');
  const source = [
    ...imports,
    `const moduleInitializers=Object.freeze({${initializers}});`,
    `window.__KVPV_RUNTIME_MODULE_SET=Object.freeze(${JSON.stringify(selectableOrder)});`,
    `window.__KVPV_CONTROL_INSTALLERS=Object.freeze({${installOrder}});`,
    initializeBootstrap,
    'window.KVPV_DESKTOP_CONTROL?.sync?.();',
    'export {moduleInitializers};'
  ].join('\n');
  const output = esbuild.buildSync({
    stdin: { contents: source, resolveDir: esmDir, sourcefile: 'runtime-profile.mjs' },
    bundle: true,
    format: 'iife',
    globalName: '__KVPV_RUNTIME_ENTRY',
    platform: 'browser',
    target: 'chrome125',
    write: false
  });
  if (output.errors?.length) throw new Error(output.errors.map(error => error.text).join('\n'));
  return { code: output.outputFiles[0].text, modules: selectableOrder, moduleSet: JSON.stringify(selectableOrder) };
}

function replaceRuntime(baseFull, code) {
  const start = baseFull.indexOf(moduleRuntimeStart);
  const end = baseFull.indexOf(moduleRuntimeEnd, start + moduleRuntimeStart.length);
  if (start < 0 || end < 0 || baseFull.indexOf(moduleRuntimeStart, start + 1) >= 0 ||
      baseFull.indexOf(moduleRuntimeEnd, end + 1) >= 0) throw new Error('Base runtime module markers are missing or ambiguous.');
  return baseFull.slice(0, start + moduleRuntimeStart.length) + '\n' + code + '\n' +
    baseFull.slice(end);
}

function profileRuntime(root, base, requested) {
  normalizeModuleSet(root, requested);
  const { selectableOrder } = moduleCatalog(root);
  const moduleSet = JSON.stringify(selectableOrder);
  const cacheKey = `${base.build}:${moduleSet}`;
  const cached = bundleCache.get(cacheKey);
  if (cached) return cached;

  const built = compileModuleRuntime(root, requested);
  const full = replaceRuntime(base.full, built.code);
  const build = crypto.createHash('sha256')
    .update(cacheKey)
    .update('\0')
    .update(full)
    .digest('hex')
    .slice(0, 12);
  const result = { ...base, build, full, modules: built.modules, moduleSet: built.moduleSet };
  bundleCache.set(cacheKey, result);
  if (bundleCache.size > 32) bundleCache.delete(bundleCache.keys().next().value);
  return result;
}

function modulesForProfile(profile) {
  const settings = profile?.modules;
  if (!settings || typeof settings !== 'object' || Array.isArray(settings)) return [];
  return Object.entries(settings).filter(([, enabled]) => enabled === true).map(([file]) => file);
}

function createProfileResolver(root, base, profiles) {
  const byActor = new Map((Array.isArray(profiles) ? profiles : []).map(profile => [String(profile.actor), profile]));
  return actor => profileRuntime(root, base, modulesForProfile(byActor.get(String(actor))));
}

module.exports = {
  moduleCatalog,
  moduleRuntimeStart,
  moduleRuntimeEnd,
  normalizeModuleSet,
  compileModuleRuntime,
  profileRuntime,
  modulesForProfile,
  createProfileResolver
};
