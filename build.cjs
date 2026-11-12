'use strict';

const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const crypto=require('node:crypto');
const {spawnSync}=require('node:child_process');
const {compileModuleRuntime,moduleCatalog,moduleRuntimeStart,moduleRuntimeEnd}=require('./live/runtime-bundles.cjs');

const root=__dirname;
const esmDir=path.join(root,'esm');
const moduleDir=path.join(esmDir,'modules');
const liveDir=path.join(root,'.kvpv-live');
const buildLock=path.join(liveDir,'build.lock');

if(fs.existsSync(path.join(root,'.kvpv-live','maintenance.lock'))&&process.env.KVPV_VERIFY_MAINTENANCE!=='1')
  throw Error('MAINTENANCE: giữ bản đang chạy trong lúc dọn nguồn.');

fs.mkdirSync(liveDir,{recursive:true});
function acquireBuildLock(){
  for(let attempt=0;attempt<2;attempt++){
    let fd;
    try{
      fd=fs.openSync(buildLock,'wx');
      fs.writeFileSync(fd,String(process.pid));
      fs.closeSync(fd);
      return;
    }catch(error){
      if(fd!==undefined)try{fs.closeSync(fd);}catch{}
      if(error.code!=='EEXIST')throw error;
      const owner=Number(fs.readFileSync(buildLock,'utf8'));
      if(!Number.isSafeInteger(owner)||owner<=0)throw Error('Build lock exists with an invalid owner; inspect '+buildLock);
      try{process.kill(owner,0);}
      catch(ownerError){
        if(ownerError.code==='ESRCH'){
          fs.unlinkSync(buildLock);
          continue;
        }
        if(ownerError.code!=='EPERM')throw ownerError;
      }
      throw Error('Another build is already running (pid '+owner+'); retry after it finishes.');
    }
  }
  throw Error('Could not acquire build lock: '+buildLock);
}
acquireBuildLock();
process.once('exit',()=>{
  try{if(fs.readFileSync(buildLock,'utf8')===String(process.pid))fs.unlinkSync(buildLock);}catch{}
});

function writeArtifactsAtomically(artifacts){
  const staged=[];
  let rollbackFailed=false;
  try{
    for(const [name,content] of artifacts){
      const target=path.join(root,name),temp=target+'.'+process.pid+'.tmp',backup=target+'.'+process.pid+'.bak';
      const entry={target,temp,backup,hadOriginal:fs.existsSync(target),installed:false};
      staged.push(entry);
      if(entry.hadOriginal)fs.copyFileSync(target,backup,fs.constants.COPYFILE_EXCL);
      fs.writeFileSync(temp,content,{flag:'wx'});
    }
    for(const entry of staged){
      fs.renameSync(entry.temp,entry.target);
      entry.installed=true;
    }
  }catch(error){
    const rollbackErrors=[];
    for(const entry of staged.slice().reverse()){
      if(!entry.installed)continue;
      try{
        if(entry.hadOriginal)fs.renameSync(entry.backup,entry.target);
        else fs.unlinkSync(entry.target);
        entry.installed=false;
      }catch(rollbackError){rollbackFailed=true;rollbackErrors.push(rollbackError.message);}
    }
    if(rollbackErrors.length)throw Error('Build artifact commit failed ('+error.message+'); rollback failed ('+rollbackErrors.join('; ')+'). Preserve backup files for recovery.');
    throw Error('Build artifact commit failed; previous outputs were restored: '+error.message);
  }finally{
    for(const entry of staged){
      try{if(fs.existsSync(entry.temp))fs.unlinkSync(entry.temp);}catch{}
      if(!rollbackFailed)try{if(fs.existsSync(entry.backup))fs.unlinkSync(entry.backup);}catch{}
    }
  }
}

const esmManifest=JSON.parse(fs.readFileSync(path.join(esmDir,'manifest.json'),'utf8'));
if(esmManifest.format!=='esm'||esmManifest.entry!=='index.mjs'||!Array.isArray(esmManifest.modules)||!Array.isArray(esmManifest.initializedModules))
  throw Error('Invalid ESM source manifest');

const moduleNames=esmManifest.modules.map(item=>item.name);
if(moduleNames.some(name=>typeof name!=='string'||!/^\d\d-.*\.js$/.test(name))||new Set(moduleNames).size!==moduleNames.length)
  throw Error('Invalid or duplicate ESM module names');

const liveModules=esmManifest.initializedModules;
if(new Set(liveModules).size!==liveModules.length||liveModules.some(name=>!moduleNames.includes(name)))
  throw Error('Invalid ESM initialization order');

const expectedFiles=new Set(moduleNames.map(name=>name.replace(/\.js$/,'.mjs')));
const actualFiles=fs.readdirSync(moduleDir).filter(name=>name.endsWith('.mjs'));
if(actualFiles.length!==expectedFiles.size||actualFiles.some(name=>!expectedFiles.has(name)))
  throw Error('ESM module files do not match esm/manifest.json');

const prelude=fs.readFileSync(path.join(root,'runtime-v1.js'),'utf8');
const indexSource=fs.readFileSync(path.join(esmDir,'index.mjs'),'utf8');
if(!indexSource.includes('moduleInitializers')||!indexSource.includes('initializeAll();'))
  throw Error('ESM entry must export initializers and initialize the runtime');
const indexImports=[...indexSource.matchAll(/import\s+\{initialize as __initialize(\d+),api as __api\d+\}\s+from\s+["']\.\/modules\/([^"']+)\.mjs["'];/g)];
if(indexImports.length!==moduleNames.length||indexImports.some((match,index)=>match[2]+'.js'!==moduleNames[index]))
  throw Error('ESM entry module imports do not match esm/manifest.json');
const initializerIndexes=new Map(indexImports.map(match=>[match[2]+'.js',match[1]]));
const expectedInitializers=liveModules.map(name=>'__initialize'+initializerIndexes.get(name)+'();');
const actualInitializers=[...indexSource.matchAll(/__initialize\d+\(\);/g)].map(match=>match[0]);
if(expectedInitializers.length!==actualInitializers.length||expectedInitializers.some((call,index)=>call!==actualInitializers[index]))
  throw Error('ESM entry initialization order does not match esm/manifest.json');

const controlSchema=require('./windows-app/control-schema.json');
const dashboardModuleSchema=require('./live/dashboard-module-schema.json');
for(const file of Object.keys(dashboardModuleSchema))if(Object.hasOwn(controlSchema,file))
  throw Error('Dashboard control module duplicates the existing allowlist: '+file);
const fullControlSchema=require('./live/desktop-controls.cjs').moduleSchema;
for(const file of Object.keys(fullControlSchema))if(!moduleNames.includes(file))
  throw Error('Control module is not present in the ESM source: '+file);

const rustDir=path.join(root,'rust-core');
const cargoPath=process.platform==='win32'?path.join(process.env.USERPROFILE||'','.cargo','bin','cargo.exe'):'cargo';
const cargoCommand=cargoPath!=='cargo'&&fs.existsSync(cargoPath)?cargoPath:'cargo';
const rustBuild=spawnSync(cargoCommand,['build','--manifest-path',path.join(rustDir,'Cargo.toml'),'--target','wasm32-unknown-unknown','--release'],{cwd:root,encoding:'utf8'});
if(rustBuild.error)throw Error('Rust/WASM build failed: '+rustBuild.error.message);
if(rustBuild.status!==0)throw Error('Rust/WASM build failed:\n'+(rustBuild.stderr||rustBuild.stdout||'cargo exited '+rustBuild.status));

const rustWasm=fs.readFileSync(path.join(rustDir,'target','wasm32-unknown-unknown','release','kvpv_rust_core.wasm'));
const rustCoreHash=crypto.createHash('sha256').update(rustWasm).digest('hex');
const rustWasmBase64=rustWasm.toString('base64');
const rustBootstrap=`if(window.__KVPV_RUST_CORE_BUILD!==${JSON.stringify(rustCoreHash)}){const encoded=atob(${JSON.stringify(rustWasmBase64)});const bytes=Uint8Array.from(encoded,c=>c.charCodeAt(0));const exports=new WebAssembly.Instance(new WebAssembly.Module(bytes)).exports;if(typeof exports.kvpv_preflight_ready!=='function'||typeof exports.kvpv_account_polling_mode!=='function'||typeof exports.kvpv_boss_recovery_range!=='function'||typeof exports.kvpv_boss_recovery_range_known!=='function'||typeof exports.kvpv_boss_recovery_ring!=='function'||typeof exports.kvpv_boss_recovery_full_hp!=='function')throw Error('Rust/WASM export missing');window.__KVPV_RUST_CORE=Object.freeze({preflightReady:exports.kvpv_preflight_ready,accountPollingMode:exports.kvpv_account_polling_mode,bossRecoveryRange:exports.kvpv_boss_recovery_range,bossRecoveryRangeKnown:exports.kvpv_boss_recovery_range_known,bossRecoveryRing:exports.kvpv_boss_recovery_ring,bossRecoveryFullHP:exports.kvpv_boss_recovery_full_hp});window.__KVPV_RUST_CORE_BUILD=${JSON.stringify(rustCoreHash)};}\n`;

const moduleInputs=[
  path.join(esmDir,'api.mjs'),
  path.join(esmDir,'index.mjs'),
  ...actualFiles.map(name=>path.join(moduleDir,name))
];
const hash=crypto.createHash('sha256');
for(const file of [
  ...moduleInputs,
  path.join(esmDir,'manifest.json'),
  path.join(root,'runtime-v1.js'),
  path.join(root,'windows-app','control-schema.json'),
  path.join(root,'live','dashboard-module-schema.json'),
  path.join(root,'live','runtime-bundles.cjs'),
  path.join(rustDir,'Cargo.toml'),
  path.join(rustDir,'Cargo.lock'),
  path.join(root,'rust-toolchain.toml'),
  path.join(rustDir,'src','lib.rs'),
  path.join(root,'package-lock.json'),
  __filename
].sort()){
  hash.update(path.relative(root,file).replace(/\\/g,'/')+'\0');
  hash.update(fs.readFileSync(file));
  hash.update('\0');
}
hash.update(rustWasm);
const buildId=hash.digest('hex').slice(0,12);
const modules=esmManifest.modules.map(({name,apis=[]})=>({file:name,apis}));
const consolidatedSources=[];
const embeddedModules=moduleCatalog(root).baseline;
const metadata=JSON.stringify({id:buildId,sourceBuild:buildId,release:'1.0.0',recovery:'35-100-observed-ring',rustCore:{abi:1,sha256:rustCoreHash},modules,consolidatedSources,embeddedModules});
const controlSchemaText=JSON.stringify(fullControlSchema);
const runtimeCode=compileModuleRuntime(root,[]).code;

const prepareUpdate=`
const W=window;
if(!W.KVPV_V1){console.warn("[KVPV] Live update skipped: V1 session unavailable");return;}
if(W._Ba?._rJ?._O$?.ins?.isDead===true)throw Error("Hồi sinh nhân vật trước khi chạy bản vá");
if(String(W.__KVPV_OWN_ACTOR_ID)!==String(W._Ba?._rJ?._O$?.ins?.actorId)||W.__KVPV_UNIVERSAL_HALTED)throw Error("Actor/session mismatch");
W.KVPV_TQ_SINGLE_STRONGEST_TH=false;W.KVPV_TH300?.setBasicOnly?.(false);W.KVPV_TH300?.setTianQuanTuyetHoc?.(false);W.KVPV_TH300?.setTianQuanFiveBasics?.(false);W.KVPV_TH300?.stop?.('user');W.KVPV_TQ_BASIC_FORCE?.stop?.('native combat restored');
try{W.KVPV_MODE?.stop?.("Custom skill controllers removed");}catch(e){console.warn("[KVPV] Previous combat mode stop failed during reload:",e);}
W.KVPV_COMBAT_ENGINE?.stop?.();W.KVPV_BASIC310_UNIVERSAL?.stop?.();W.KVPV_TQ_8001_CD?.stop?.('native combat restored');W.KVPV_BEAST_ISLAND?.stop?.();W.KVPV_COMPANION_COMBAT?.stop?.();W.KVPV_KIEM_KHIEU_BASIC?.stop?.();W.KVPV_TRUTIEN_PVP?.stop?.();W.KVPV_STRONGEST_PVP?.stop?.();W.KVPV_TIENMA_PVP?.stop?.();W.KVPV_TRANH_BA_TU_PHUONG?.stop?.();W.KVPV_LE_HOI_KHU_THU?.stop?.();W.KVPV_PVP_LUOFENG?.stop?.();W.KVPV_STRONGEST_TEAM?.stop?.();W.KVPV_HONOR_TARGET?.stop?.();W.KVPV_BASIC10?.stop?.();W.KVPV_STAND281?.stop?.();
`;

function makeBundle(id,esmFormat){
  const buildMetadata=JSON.stringify({...JSON.parse(metadata),id,...(esmFormat?{format:'esm'}:{})});
  return '/* KVPV V1 / generated from esm/; edit esm/modules/, not this file. */\n(()=>{\n'+
    'const __KVPV_V1_BUILD=Object.freeze('+buildMetadata+');\n'+
    'if(window.KVPV_V1){\n'+rustBootstrap+
    'const actor=String(window._Ba?._rJ?._O$?.ins?.actorId??\'\');\n'+
    'if(/^[1-9]\\d{4,24}$/.test(actor)&&!window.__KVPV_OWN_ACTOR_ID&&typeof window._ft!==\'undefined\'&&typeof window._Sa!==\'undefined\')Object.defineProperty(window,\'__KVPV_OWN_ACTOR_ID\',{value:actor,enumerable:false,writable:false,configurable:false});\n'+
    'if(!actor||actor!==String(window.__KVPV_OWN_ACTOR_ID??\'\')||window.__KVPV_UNIVERSAL_HALTED){console.error(\'[KVPV V1] Reload blocked: actor changed or session halted.\');return;}\n'+
    prepareUpdate+
    '}else{\n'+prelude+'\nif(!__KVPV_V1_READY)return;\n'+rustBootstrap+'}\n'+
    'window.__KVPV_CONTROL_SCHEMA=Object.freeze('+controlSchemaText+');\n'+
    'window.__KVPV_CONTROL_PROFILE_VERSION=6;\n'+
    moduleRuntimeStart+'\n'+runtimeCode+'\n'+moduleRuntimeEnd+'\n'+
    'if(!__KVPV_RUNTIME_ENTRY?.moduleInitializers)throw Error(\'Runtime module initializers missing\');\n'+
    '})();\n';
}

const fullBundle=makeBundle(buildId,false);
const extensionBuildId=crypto.createHash('sha256').update(buildId+'\n'+runtimeCode).digest('hex').slice(0,12);
const extensionBundle=makeBundle(extensionBuildId,true);
const patch='/* Paste into the existing game Console; no refresh required. */\n(()=>{\n'+
  'if(!window.KVPV_V1){console.warn("[KVPV] Live update skipped: V1 session unavailable");return;}\n'+
  rustBootstrap+prepareUpdate+
  'const __KVPV_V1_BUILD=Object.freeze('+metadata+');\n'+
  'window.__KVPV_CONTROL_SCHEMA=Object.freeze('+controlSchemaText+');\n'+
  'window.__KVPV_CONTROL_PROFILE_VERSION=6;\n'+
  moduleRuntimeStart+'\n'+runtimeCode+'\n'+moduleRuntimeEnd+'\n'+
  'if(!__KVPV_RUNTIME_ENTRY?.moduleInitializers)throw Error(\'Runtime module initializers missing\');\n'+
  '})();\n';

new vm.Script(fullBundle,{filename:'KVPV_V1_FULL.js'});
new vm.Script(extensionBundle,{filename:'KVPV_V1_ESM.js'});
new vm.Script(patch,{filename:'KVPV_SCAN_LIVE_PATCH.js'});

const outputManifest=JSON.stringify({
  version:'1.0.0',
  buildId,
  file:'KVPV_V1_FULL.js',
  sha256:crypto.createHash('sha256').update(fullBundle).digest('hex'),
  extension:{file:'KVPV_V1_ESM.js',buildId:extensionBuildId,sha256:crypto.createHash('sha256').update(extensionBundle).digest('hex')},
  rustCore:{abi:1,sha256:rustCoreHash},
  modules:modules.map(item=>item.file),
  consolidatedSources,
  embeddedModules,
  liveModules
},null,2)+'\n';
writeArtifactsAtomically([
  ['KVPV_V1_FULL.js',fullBundle],
  ['KVPV_FULL_THIEN_QUAN.js',fullBundle],
  ['KVPV_PB_BOSS_DAILY.js',fullBundle],
  ['KVPV_V1_ESM.js',extensionBundle],
  ['KVPV_SCAN_LIVE_PATCH.js',patch],
  ['MANIFEST.json',outputManifest]
]);

console.log('Built V1 '+buildId+': '+modules.length+' ESM source modules; syntax OK.');
console.log('Built extension ESM bundle: '+extensionBuildId+' ('+extensionBundle.length+' bytes).');
require('./build-edge-addon.cjs');
