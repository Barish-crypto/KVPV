'use strict';


// Does not remove documentation, change JavaScript expressions, or delete files.
// Default is read-only; --write edits src after a maintenance-lock check.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const srcDir = path.join(root, 'src');
const apply = process.argv.includes('--write');
const lock = path.join(root, '.kvpv-live', 'maintenance.lock');
if (apply && fs.existsSync(lock)) {
  console.error('Maintenance lock exists. Source unchanged.');
  process.exit(2);
}
const pattern = /^\/\/ \[VI dòng gốc \d+\].*(?:\r?\n|$)/gm;
let changed = 0, removed = 0;
for (const name of fs.readdirSync(srcDir).filter(n => n.endsWith('.js')).sort()) {
  const filename = path.join(srcDir, name);
  const source = fs.readFileSync(filename, 'utf8');
  const matched = source.match(pattern) || [];
  if (!matched.length) continue;
  const result = source.replace(pattern, '');
  new vm.Script(result, { filename: name });
  changed++;
  removed += matched.length;
  console.log(`${apply ? 'CLEAN' : 'PREVIEW'} ${name}: ${matched.length} generated annotations`);
  if (apply) fs.writeFileSync(filename, result, 'utf8');
}
console.log(`${apply ? 'Cleaned' : 'Would clean'} ${changed} modules, ${removed} annotations.`);
console.log('No generated bundles or tests changed. Run node build.cjs && node test.cjs after --write.');
