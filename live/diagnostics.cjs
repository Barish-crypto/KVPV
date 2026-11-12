
/* Diagnostics are untrusted data. Fixed directory, digit-only actor filename,
 * bounded JSON, atomic replacement. No commands, source files or path input. */

'use strict';

const fs=require('node:fs'),path=require('node:path');

function saveDiagnostics(root,report){

 if(!report||report.schema!==1||!/^[1-9]\d{4,24}$/.test(String(report.actor))||

   !Array.isArray(report.missing)||!Array.isArray(report.reborn?.tasks)||!Array.isArray(report.tienVi)||

   report.missing.length>80||report.reborn.tasks.length>20||report.tienVi.length>80)return false;

 const json=JSON.stringify({...report,heartbeatAt:Date.now()},null,2);if(Buffer.byteLength(json,'utf8')>128*1024)return false;

 const dir=path.join(root,'.kvpv-live','diagnostics');fs.mkdirSync(dir,{recursive:true});

 const file=path.join(dir,String(report.actor)+'.json'),tmp=path.join(dir,String(report.actor)+'-'+process.pid+'.tmp');

 fs.writeFileSync(tmp,json+'\n');fs.renameSync(tmp,file);return true;

}

function touchDiagnostics(root,actor){

 const id=String(actor);if(!/^[1-9]\d{4,24}$/.test(id))return false;
 const dir=path.join(root,'.kvpv-live','diagnostics'),file=path.join(dir,id+'.json');
 try{
  const stat=fs.lstatSync(file);if(!stat.isFile()||stat.isSymbolicLink()||stat.size>128*1024)return false;
  const report=JSON.parse(fs.readFileSync(file,'utf8'));
  if(report.schema!==1||String(report.actor)!==id||!Number.isFinite(report.at))return false;
  const json=JSON.stringify({...report,heartbeatAt:Date.now()},null,2);if(Buffer.byteLength(json,'utf8')>128*1024)return false;
  const tmp=path.join(dir,id+'-'+process.pid+'.tmp');fs.writeFileSync(tmp,json+'\n');fs.renameSync(tmp,file);return true;
 }catch(error){if(error.code==='ENOENT')return false;throw error;}

}

module.exports={saveDiagnostics,touchDiagnostics};

