/* KVPV: GitHub -> local project -> existing verified Native Host pipeline.
 * Read-only with respect to GitHub. Never commits/pushes or resets local changes.
 */
'use strict';
const fs=require('node:fs');
const path=require('node:path');
const {execFileSync}=require('node:child_process');
const root=path.resolve(__dirname,'..');
const stateDir=path.join(root,'.kvpv-live');
const processLock=path.join(stateDir,'git-auto-sync.pid');
const maintenance=path.join(stateDir,'maintenance.lock');
const statusFile=path.join(stateDir,'git-auto-sync-status.json');
const logFile=path.join(stateDir,'git-auto-sync.log');
const intervalMs=Number(process.env.KVPV_GIT_SYNC_MS)||60000;
const {blockingTrackedChanges}=require('./generated-changes.cjs');
fs.mkdirSync(stateDir,{recursive:true});
function writeStatus(status,detail=''){
 const data={at:new Date().toISOString(),status,detail:String(detail).slice(0,1000)};
 try{fs.writeFileSync(statusFile,JSON.stringify(data,null,2)+'\n');}catch(_){}
 try{
   const line=`${data.at} ${data.status}: ${data.detail}\n`;
   if(fs.existsSync(logFile)&&fs.statSync(logFile).size>1048576)fs.renameSync(logFile,logFile+'.old');
   fs.appendFileSync(logFile,line);
 }catch(_){}
 console.log(data.at,status,data.detail);
}
function git(args,options={}){
 const output=execFileSync('git',['-C',root,...args],{
   encoding:'utf8',timeout:options.timeout??30000,maxBuffer:2*1024*1024,
   stdio:['ignore','pipe','pipe']
 });
 return options.raw?output:output.trim();
}
function node(args,timeout=180000){return execFileSync(process.execPath,args,{cwd:root,encoding:'utf8',timeout,maxBuffer:2*1024*1024,stdio:['ignore','pipe','pipe']}).trim();}
function pidAlive(pid){if(!Number.isSafeInteger(pid)||pid<1)return false;try{process.kill(pid,0);return true;}catch(e){return e.code==='EPERM';}}
function acquireInstance(){
 try{const fd=fs.openSync(processLock,'wx');fs.writeFileSync(fd,String(process.pid));fs.closeSync(fd);return true;}
 catch(e){if(e.code!=='EEXIST')throw e;
  try{const old=Number(fs.readFileSync(processLock,'utf8'));if(pidAlive(old)){writeStatus('already_running',`PID ${old}`);return false;}}catch(_){}
  try{fs.unlinkSync(processLock);}catch(_){}
  try{const fd=fs.openSync(processLock,'wx');fs.writeFileSync(fd,String(process.pid));fs.closeSync(fd);return true;}catch(_){return false;}
 }
}
function release(){try{if(fs.readFileSync(processLock,'utf8')===String(process.pid))fs.unlinkSync(processLock);}catch(_){}}
let checking=false,closed=false;
function check(){
 if(checking||closed)return;
 checking=true;
 let ownedMaintenance=false;
 try{
  if(fs.existsSync(maintenance)){writeStatus('paused','KVPV maintenance.lock exists');return;}
  if(git(['rev-parse','--is-inside-work-tree'])!=='true')throw Error('Thư mục chưa phải Git repository');
  if(!git(['remote','get-url','origin']))throw Error('Thiếu Git remote origin');
  const branch=git(['symbolic-ref','--quiet','--short','HEAD']);
  const upstream=git(['rev-parse','--abbrev-ref','--symbolic-full-name','@{u}']);
  if(!upstream.startsWith('origin/'))throw Error('Nhánh cần track origin/*');
  // Existing local edits must always win over updates. No automatic discard/reset.
  // Ignore ONLY unstaged changes to exact generated outputs. All source/staged/deleted changes still block sync.
  const dirty=blockingTrackedChanges(git(['status','--porcelain=v1','-z','--untracked-files=no'],{raw:true}));
  if(dirty.length){writeStatus('local_changes','Chưa cập nhật vì có thay đổi file mã nguồn hoặc index Git: '+dirty.slice(0,5).map(s=>s.slice(3)).join(', '));return;}
  git(['fetch','--quiet','--no-tags','origin'],{timeout:45000});
  const head=git(['rev-parse','HEAD']);
  const remote=git(['rev-parse','@{u}']);
  if(head===remote){writeStatus('up_to_date',`branch=${branch}; commit=${head.slice(0,12)}`);return;}
  try{git(['merge-base','--is-ancestor',head,remote]);}
  catch(_){writeStatus('diverged','Nhánh local khác remote; không tự merge, rebase hoặc reset');return;}
  // While files are changing, the Native Host verification waits for this lock.
  try{const fd=fs.openSync(maintenance,'wx');fs.writeFileSync(fd,`git-sync ${process.pid}\n`);fs.closeSync(fd);ownedMaintenance=true;}
  catch(e){writeStatus('paused','maintenance lock vừa được tạo bởi một tác vụ khác');return;}
  git(['merge','--ff-only','--quiet','@{u}'],{timeout:45000});
  // Release lock before verify: build.cjs explicitly refuses to run with this lock held.
  fs.unlinkSync(maintenance);ownedMaintenance=false;
  writeStatus('pulled',`branch=${branch}; ${head.slice(0,12)} -> ${remote.slice(0,12)}; checking`);
  try{const result=node([path.join(root,'live','verify.cjs')]);writeStatus('verified',`${remote.slice(0,12)}: ${result.slice(-500)}`);}
  catch(e){writeStatus('verification_failed',`${remote.slice(0,12)}; bản game đang chạy được giữ nguyên; ${String(e.stderr||e.message).slice(-800)}`);}
 }catch(e){writeStatus('error',String(e.stderr||e.message||e).slice(-900));}
 finally{if(ownedMaintenance){try{fs.unlinkSync(maintenance);}catch(_){}}checking=false;}
}
if(!acquireInstance())process.exit(0);
process.on('exit',release);
process.on('SIGINT',()=>{closed=true;release();process.exit(0);});
process.on('SIGTERM',()=>{closed=true;release();process.exit(0);});
check();
if(!process.argv.includes('--once'))setInterval(check,Math.max(30000,intervalMs));
else release();
