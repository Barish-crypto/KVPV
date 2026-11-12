
/* One verification process for Edge/Chrome: concurrent hosts share a lock and
 * reuse a successful build only when every input and generated FULL still match. */

'use strict';

const fs=require('node:fs'),path=require('node:path'),{execFile}=require('node:child_process');

const {sourceDigest,cached,record}=require('./verified.cjs');
const {readArtifact,readExtensionArtifact}=require('./project.cjs');

const root=path.resolve(__dirname,'..'),dir=path.join(root,'.kvpv-live'),lock=path.join(dir,'verify.lock');

fs.mkdirSync(dir,{recursive:true});

const pause=()=>new Promise(resolve=>setTimeout(resolve,100));

async function main(){

 const deadline=Date.now()+120000;

 while(Date.now()<deadline){

  if(fs.existsSync(path.join(dir,'maintenance.lock'))){await pause();continue;}

  const digest=sourceDigest(root),hit=cached(root,digest);

  if(hit){console.log('CACHED '+hit.build);return;}

  let fd;try{fd=fs.openSync(lock,'wx');fs.writeFileSync(fd,String(process.pid));fs.closeSync(fd);}

  catch(e){if(e.code!=='EEXIST')throw e;

   try{const pid=Number(fs.readFileSync(lock,'utf8'));if(Number.isSafeInteger(pid)&&pid>0){try{process.kill(pid,0);}catch(error){if(error.code==='ESRCH')fs.unlinkSync(lock);}}}catch(_){}

   await pause();continue;

  }

  try{

   // Another host may have finished between our cache read and lock acquisition.

   if(cached(root))continue;

   await new Promise((resolve,reject)=>execFile(process.execPath,[path.join(root,'build.cjs')],

    {cwd:root,windowsHide:true,maxBuffer:1024*1024},(error,stdout,stderr)=>{
      if(!error){resolve();return;}
      reject(Error(String(stderr||stdout||error.message).slice(-800)));
    }));

   readArtifact(root);
   readExtensionArtifact(root);

   const artifact=record(root,digest);
   console.log('BUILT '+artifact.build);return;

  }finally{try{if(fs.readFileSync(lock,'utf8')===String(process.pid))fs.unlinkSync(lock);}catch(_){}}

 }

 throw Error('Verification busy for 120s; previous game build kept running');

}

main().catch(e=>{console.error(e.message);process.exitCode=1;});
