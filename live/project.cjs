'use strict';

const fs = require('node:fs');

const path = require('node:path');

const crypto = require('node:crypto');

const vm = require('node:vm');



function readArtifact(root) {

  const manifest = JSON.parse(fs.readFileSync(path.join(root, 'MANIFEST.json'), 'utf8'));

  if (manifest.file !== 'KVPV_V1_FULL.js') throw Error('Invalid FULL path');

  const bytes = fs.readFileSync(path.join(root, manifest.file));

  const sha256 = crypto.createHash('sha256').update(bytes).digest('hex');

  if (sha256 !== manifest.sha256) throw Error('FULL/manifest not synchronized');

  const full = bytes.toString('utf8');

  new vm.Script(full, {filename: manifest.file});

  return {build: manifest.buildId, sha256, bytes, full};

}

function readExtensionArtifact(root) {

  const manifest=JSON.parse(fs.readFileSync(path.join(root,'MANIFEST.json'),'utf8'));
  const artifact=manifest.extension;
  if(!artifact||artifact.file!=='KVPV_V1_ESM.js'||!/^[a-f0-9]{12}$/.test(artifact.buildId||''))throw Error('Invalid ESM extension manifest');

  const bytes=fs.readFileSync(path.join(root,artifact.file));
  const sha256=crypto.createHash('sha256').update(bytes).digest('hex');
  if(sha256!==artifact.sha256)throw Error('ESM extension/manifest not synchronized');

  const full=bytes.toString('utf8');
  new vm.Script(full,{filename:artifact.file});
  return {build:artifact.buildId,sha256,bytes,full};

}



function extensionId(key) {

  const digest = crypto.createHash('sha256').update(Buffer.from(key, 'base64')).digest();

  return Array.from(digest.subarray(0, 16), byte =>

    String.fromCharCode(97 + (byte >> 4), 97 + (byte & 15))).join('');

}

function isWatchedSource(file) {

  if(String(file).replace(/\\/g,'/')==='windows-app/control-schema.json')return true;

  file=String(file).replace(/\\/g,'/');
  if(file==='package.json'||file==='package-lock.json')return true;
  if(file==='rust-toolchain.toml'||file==='rust-core/Cargo.toml'||file==='rust-core/Cargo.lock'||/^rust-core\/src\/[^/]+\.rs$/.test(file))return true;

  if(['core.js','KVPV_ANDROID.user.js','com.kvpv.localwatch.json'].includes(path.basename(file)))return false;

  if(/^esm\/(?:[^/]+\.(?:mjs|json)|modules\/[^/]+\.mjs)$/.test(file))return true;
  if(/^(?:live|android|edge-addon(?:\/native)?)\/[^/]+\.(?:js|cjs|json|cs|html)$/.test(file))return true;

  return ['runtime-v1.js', 'build.cjs', 'build-edge-addon.cjs', 'build-android.cjs', 'rust-toolchain.toml'].includes(String(file));

}

function watchSources(root,onChange){

  return ['', 'esm', 'esm/modules', 'live', 'android', 'edge-addon', 'edge-addon/native', 'windows-app', 'rust-core', 'rust-core/src'].filter(dir=>fs.existsSync(path.join(root,dir)))

    .map(dir=>fs.watch(path.join(root,dir),(event,file)=>{if(file&&isWatchedSource(dir?dir+'/'+file:file))onChange();}));

}

module.exports = {readArtifact, readExtensionArtifact, extensionId, isWatchedSource, watchSources};
