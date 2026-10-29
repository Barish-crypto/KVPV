/* Optional GitHub -> local source updater. Never reset local edits or install untested code. */
'use strict';
const fs=require('node:fs'),os=require('node:os'),path=require('node:path');
const {execFile}=require('node:child_process');
const root=path.resolve(__dirname,'..');
const run=(cmd,args,cwd=root,timeout=180000)=>new Promise((resolve,reject)=>
 execFile(cmd,args,{cwd,windowsHide:true,timeout,maxBuffer:1024*1024},(error,stdout,stderr)=>
  error?reject(Error(String(stderr||error.message).slice(-700))):resolve(String(stdout).trim())));
let inFlight=false;
async function update(){
 if(inFlight)return {status:'busy'};
 inFlight=true;let scratch='',added=false;
 try{
  if(fs.existsSync(path.join(root,'.kvpv-live','maintenance.lock')))return {status:'maintenance'};
  if(await run('git',['status','--porcelain'])!=='')return {status:'local_edits_preserved'};
  const branch=await run('git',['branch','--show-current']);
  if(branch!=='main')return {status:'not_main'};
  const remote=await run('git',['remote','get-url','origin']);
  if(!/^(https:\/\/github\.com\/|git@github\.com:)Barish-crypto\/KVPV(?:\.git)?$/i.test(remote))
    return {status:'unexpected_remote'};
  await run('git',['fetch','--no-tags','origin','main']);
  const local=await run('git',['rev-parse','HEAD']);
  const remoteHead=await run('git',['rev-parse','FETCH_HEAD']);
  if(local===remoteHead)return {status:'current',head:local.slice(0,12)};
  const ancestor=await run('git',['merge-base',local,remoteHead]);
  if(ancestor!==local)return {status:'diverged_keep_local'};
  scratch=fs.mkdtempSync(path.join(os.tmpdir(),'kvpv-update-'));
  await run('git',['worktree','add','--detach',scratch,remoteHead]);
  added=true;
  // Testing a disposable worktree keeps the current game and source untouched.
  await run(process.execPath,['build.cjs'],scratch);
  await run(process.execPath,['test.cjs'],scratch,240000);
  if(await run('git',['status','--porcelain'])!=='')return {status:'changed_during_test'};
  if(await run('git',['rev-parse','HEAD'])!==local)return {status:'head_changed'};
  await run('git',['merge','--ff-only',remoteHead]);
  return {status:'updated',head:remoteHead.slice(0,12)};
 }catch(e){return {status:'kept_current',error:String(e.message||e).slice(0,500)};}
 finally{
  if(added)try{await run('git',['worktree','remove','--force',scratch]);}catch(_){}
  if(scratch)try{fs.rmSync(scratch,{recursive:true,force:true});}catch(_){}
  inFlight=false;
 }
}
module.exports={update};
if(require.main===module)update().then(x=>console.log(JSON.stringify(x)));
