
/* Cache successful builds for an exact source digest + exact artifact hash.
 * Shared by all browser hosts. The receipt never substitutes syntax/SHA checks. */

'use strict';

const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');

const {readArtifact,readExtensionArtifact}=require('./project.cjs');

function sourceDigest(root){

 const files=[];

 for(const name of fs.readdirSync(root))if(/^(?:runtime-v1\.js|build(?:-[\w-]+)?\.cjs|rust-toolchain\.toml|package(?:-lock)?\.json)$/.test(name))files.push(name);

 files.push('windows-app/control-schema.json');

 for(const dir of ['esm','esm/modules','live','android','edge-addon','edge-addon/native']){

  const folder=path.join(root,dir);if(!fs.existsSync(folder))continue;

  for(const name of fs.readdirSync(folder))if(/\.(?:js|mjs|cjs|json|cs|html)$/.test(name)&&

   !['core.js','KVPV_ANDROID.user.js','com.kvpv.localwatch.json'].includes(name))files.push(dir+'/'+name);

 }
 const rustDir=path.join(root,'rust-core');
 if(fs.existsSync(rustDir)){
  for(const name of fs.readdirSync(rustDir))if(/^Cargo\.(?:toml|lock)$/.test(name))files.push('rust-core/'+name);
  const rustSrc=path.join(rustDir,'src');
  if(fs.existsSync(rustSrc))for(const name of fs.readdirSync(rustSrc))if(/\.rs$/.test(name))files.push('rust-core/src/'+name);
 }

 const hash=crypto.createHash('sha256');

 for(const name of files.sort()){hash.update(name+'\0');hash.update(fs.readFileSync(path.join(root,name)));hash.update('\0');}

 return hash.digest('hex');

}

function cached(root,digest=sourceDigest(root)){

 try{const r=JSON.parse(fs.readFileSync(path.join(root,'.kvpv-live','verified.json'),'utf8'));

  if(r.digest!==digest)return null;const artifact=readArtifact(root);

  const extension=readExtensionArtifact(root);
  return artifact.sha256===r.sha256&&artifact.build===r.build&&extension.build===r.extensionBuild?artifact:null;

 }catch(_){return null;}

}

function record(root,digest){

 if(sourceDigest(root)!==digest)throw Error('Source changed during build; waiting for latest save');

 const artifact=readArtifact(root),extension=readExtensionArtifact(root),dir=path.join(root,'.kvpv-live');fs.mkdirSync(dir,{recursive:true});

 const tmp=path.join(dir,'verified-'+process.pid+'.tmp');

 fs.writeFileSync(tmp,JSON.stringify({digest,build:artifact.build,sha256:artifact.sha256,extensionBuild:extension.build,verifiedAt:Date.now()}));

 fs.renameSync(tmp,path.join(dir,'verified.json'));return artifact;

}

module.exports={sourceDigest,cached,record};
