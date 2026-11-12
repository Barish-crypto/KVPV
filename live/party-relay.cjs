
/* Only fresh, bounded observations from fixed local diagnostic files. No commands. */

'use strict';

const fs=require('node:fs'),path=require('node:path');

function readPartyPeers(root,now=Date.now()){

 const dir=path.join(root,'.kvpv-live','diagnostics'),rows=[];

 let files;try{files=fs.readdirSync(dir);}catch(_){return rows;}

 for(const name of files.filter(n=>/^[1-9]\d{4,24}\.json$/.test(n)).slice(0,64))try{

  const file=path.join(dir,name),st=fs.lstatSync(file);

  if(!st.isFile()||st.isSymbolicLink()||st.size>128*1024||now-st.mtimeMs>15000)continue;

  const report=JSON.parse(fs.readFileSync(file,'utf8')),p=report.teamCoordinator?.self;

  if(report.schema!==1||String(report.actor)+'.json'!==name||!Number.isFinite(report.at)||now-report.at>15000||report.at>now+2000||!p||String(p.actor)!==String(report.actor)||!Number.isFinite(p.at)||now-p.at>15000||p.at>now+2000||!Number.isFinite(p.power)||p.power<=0||!Array.isArray(p.quotas)||p.quotas.length>8)continue;

  rows.push({actor:String(p.actor),power:p.power,at:p.at,idle:p.idle===true,quotas:p.quotas,session:p.session??null});

  if(rows.length===32)break;

 }catch(_){}

 return rows;

}

module.exports={readPartyPeers};

