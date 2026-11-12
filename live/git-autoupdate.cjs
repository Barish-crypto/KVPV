/* Optional GitHub -> local source updater. Never reset local edits or install an invalid build. */
'use strict';
const fs=require('node:fs'),os=require('node:os'),path=require('node:path');
const {execFile}=require('node:child_process');
const root=path.resolve(__dirname,'..');
const {readArtifact}=require('./project.cjs');
const gitCandidates=[
 process.env.KVPV_GIT_PATH,
 'git',
 ...(process.platform==='win32'?[
  path.join(process.env.ProgramFiles||'C:\\Program Files','Git','cmd','git.exe'),
  path.join(process.env.ProgramFiles||'C:\\Program Files','Git','bin','git.exe'),
  path.join(process.env['ProgramFiles(x86)']||'C:\\Program Files (x86)','Git','cmd','git.exe'),
  path.join(process.env.LOCALAPPDATA||'', 'Programs','Git','cmd','git.exe')
 ]:[])
].filter(Boolean);
const git=gitCandidates.find(p=>p==='git'||fs.existsSync(p));
const run=(cmd,args,cwd=root,timeout=180000)=>new Promise((resolve,reject)=>
 execFile(cmd==='git'?(gitCandidates.find(x=>x!=='git'&&fs.existsSync(x))||'git'):cmd,args,{cwd,windowsHide:true,timeout,maxBuffer:1024*1024},(error,stdout,stderr)=>
  error?reject(Error(String(stderr||error.message).slice(-700))):resolve(String(stdout).trim())));
let inFlight=false;
async function update(){
 if(inFlight)return {status:'busy'};
 inFlight=true;let scratch='',added=false;
 try{
  if(fs.existsSync(path.join(root,'.kvpv-live','maintenance.lock')))return {status:'maintenance'};
  if(!gitCandidates.some(x=>x!=='git'&&fs.existsSync(x))&&process.platform==='win32'){
    // PATH may still contain git; distinguish missing Git via the first command error.
  }
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
  // Build and validate the disposable worktree before merging its source.
  await run(process.execPath,['build.cjs'],scratch);
  readArtifact(scratch);
  if(await run('git',['status','--porcelain'])!=='')return {status:'changed_during_build'};
  if(await run('git',['rev-parse','HEAD'])!==local)return {status:'head_changed'};
  await run('git',['merge','--ff-only',remoteHead]);
  return {status:'updated',head:remoteHead.slice(0,12)};
 }catch(e){const message=String(e.message||e);return /spawn git ENOENT|ENOENT.*git/i.test(message)?{status:'git_not_installed',error:'Git for Windows not found; install Git or set KVPV_GIT_PATH'}:{status:'kept_current',error:message.slice(0,500)};}
 finally{
  if(added)try{await run('git',['worktree','remove','--force',scratch]);}catch(_){}
  if(scratch)try{fs.rmSync(scratch,{recursive:true,force:true});}catch(_){}
  inFlight=false;
 }
}
module.exports={update};
if(require.main===module)update().then(x=>console.log(JSON.stringify(x)));
