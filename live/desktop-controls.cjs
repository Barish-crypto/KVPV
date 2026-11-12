
 

'use strict';const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');

const baseSchema={
 ...require('../windows-app/control-schema.json'),
 ...require('./dashboard-module-schema.json')
};
const esmManifest=JSON.parse(fs.readFileSync(path.join(__dirname,'../esm/manifest.json'),'utf8'));
const lifecycleSchema=Object.fromEntries(esmManifest.modules.flatMap(module=>{
 const functions=new Set(module.functions||[]);
 const apis=(module.apis||[]).filter(api=>
  functions.has(`call_${api}_stop`)&&
  !['KVPV_DESKTOP_CONTROL','KVPV_EXECUTOR_REPORT','KVPV_CHECK','KVPV_V1'].includes(api));
 return apis.length?[ [module.name,apis] ]:[];
}));
const schema={...lifecycleSchema};
for(const [file,value]of Object.entries(baseSchema)){
 const names=[...(Array.isArray(schema[file])?schema[file]:schema[file]?[schema[file]]:[]),
  ...(Array.isArray(value)?value:[value])];
 const unique=[...new Set(names)];
 schema[file]=unique.length===1?unique[0]:unique;
}

function validRedDotControls(value){
 if(!value||typeof value!=='object'||Array.isArray(value)||
  !Object.keys(value).every(key=>key==='groups'||key==='ids')||
  !value.groups||typeof value.groups!=='object'||Array.isArray(value.groups)||
  !value.ids||typeof value.ids!=='object'||Array.isArray(value.ids))return false;
 const groups=Object.entries(value.groups),ids=Object.entries(value.ids);
 return groups.length<=128&&ids.length<=256&&
  groups.every(([key,on])=>typeof key==='string'&&key.length>0&&key.length<=80&&!/[\u0000-\u001f]/.test(key)&&typeof on==='boolean')&&
  ids.every(([id,on])=>/^\d{1,5}$/.test(id)&&typeof on==='boolean');
}

function validateProfile(p){

 if(p?.combatProfiles!==undefined){const validator=require.resolve('./combat-profiles.cjs');delete require.cache[validator];if(!require(validator).validCombatProfiles(p.combatProfiles))return null;}

 if(p?.roadMinCastMs!==undefined&&(!Number.isSafeInteger(p.roadMinCastMs)||p.roadMinCastMs<0||p.roadMinCastMs>5000))return null;

 if(p?.roadCombatMode!==undefined&&!['native','basic8001'].includes(p.roadCombatMode)||p?.towerBasicOnly!==undefined&&typeof p.towerBasicOnly!=='boolean')return null;

 if(!p||typeof p!=='object'||Array.isArray(p)||!Object.keys(p).every(k=>['revision','modules','redDots','distance','animationSpeed','stageAuto','dailyEnabled','roadCombatMode','towerBasicOnly','roadMinCastMs','combatProfiles'].includes(k))||!/^[a-f0-9]{32}$/.test(p.revision))return null;

 if(p.distance!==undefined&&(!Number.isFinite(p.distance)||p.distance<281||p.distance>600))return null;

 if(p.animationSpeed!==undefined&&![1,9,99,99999].includes(p.animationSpeed))return null;

 if(p.stageAuto!==undefined&&typeof p.stageAuto!=='boolean'||p.dailyEnabled!==undefined&&p.dailyEnabled!==true)return null;

 if(p.modules!==undefined&&(!p.modules||typeof p.modules!=='object'||Array.isArray(p.modules)||Object.entries(p.modules).some(([k,v])=>!Object.hasOwn(schema,k)||typeof v!=='boolean')))return null;
 if(p.redDots!==undefined&&!validRedDotControls(p.redDots))return null;

 return {revision:p.revision,...(p.modules?{modules:{...p.modules}}:{}),...(p.redDots?{redDots:{groups:{...p.redDots.groups},ids:{...p.redDots.ids}}}:{}),...Object.fromEntries(['distance','animationSpeed','stageAuto','dailyEnabled','roadCombatMode','towerBasicOnly','roadMinCastMs','combatProfiles'].filter(k=>p[k]!==undefined).map(k=>[k,p[k]]))};

}

function readControlDocument(root){
 const dir=path.join(root,'.kvpv-live'),file=path.join(dir,'desktop-controls.json');
 try{const dirStat=fs.lstatSync(dir);if(!dirStat.isDirectory()||dirStat.isSymbolicLink())throw Error('Desktop controls directory must be a regular directory');}
 catch(error){if(error.code==='ENOENT')return {schema:1,actors:{}};throw error;}
 let stat;try{stat=fs.lstatSync(file);}catch(error){if(error.code==='ENOENT')return {schema:1,actors:{}};throw error;}
 if(!stat.isFile()||stat.isSymbolicLink()||stat.size>32768)throw Error('Desktop controls file is not a regular file or exceeds 32 KB');
 const doc=JSON.parse(fs.readFileSync(file,'utf8'));
 if(doc?.schema!==1||!doc.actors||typeof doc.actors!=='object'||Array.isArray(doc.actors)||Object.keys(doc.actors).length>8)throw Error('Desktop controls file has an invalid schema');
 for(const [actor,profile]of Object.entries(doc.actors)){
  if(!/^[1-9]\d{4,24}$/.test(actor)||!validateProfile(profile))throw Error('Desktop controls file contains an invalid actor profile');
 }
 return doc;
}

function readDesktopControls(root){try{
 const doc=readControlDocument(root);
 return Object.entries(doc.actors).slice(0,8).map(([actor,profile])=>({actor,...validateProfile(profile)}));
 }catch(_){return [];}}

function writeModuleControls(root,actor,modules,redDots){
 if(typeof actor!=='string'||!/^[1-9]\d{4,24}$/.test(actor))throw Error('Invalid character reference');
 if(!modules||typeof modules!=='object'||Array.isArray(modules)||Object.keys(modules).length>Object.keys(schema).length||
  Object.entries(modules).some(([file,on])=>!Object.hasOwn(schema,file)||typeof on!=='boolean'))throw Error('Invalid module selection');
 if(redDots!==undefined&&!validRedDotControls(redDots))throw Error('Invalid red-dot selection');

 const dir=path.join(root,'.kvpv-live'),file=path.join(dir,'desktop-controls.json');
 fs.mkdirSync(dir,{recursive:true});
 const dirStat=fs.lstatSync(dir);if(!dirStat.isDirectory()||dirStat.isSymbolicLink())throw Error('Desktop controls directory must be a regular directory');
 const doc=readControlDocument(root);
 if(!Object.hasOwn(doc.actors,actor)&&Object.keys(doc.actors).length>=8)throw Error('At most 8 character profiles can be managed');
 const previous=doc.actors[actor]||{};
 const profile={
  ...previous,
  revision:crypto.randomBytes(16).toString('hex'),
  modules:{...(previous.modules||{}),...modules},
  ...(redDots!==undefined?{redDots:{groups:{...redDots.groups},ids:{...redDots.ids}}}:{})
 };
 if(!validateProfile(profile))throw Error('Module profile failed validation');
 doc.actors[actor]=profile;
 const json=JSON.stringify(doc,null,2);
 if(Buffer.byteLength(json,'utf8')>32768)throw Error('Desktop controls file exceeds 32 KB');
 const temp=file+'.'+process.pid+'.'+crypto.randomBytes(6).toString('hex')+'.tmp';
 try{fs.writeFileSync(temp,json+'\n',{encoding:'utf8',mode:0o600});fs.renameSync(temp,file);}
 finally{try{fs.unlinkSync(temp);}catch(error){if(error.code!=='ENOENT')throw error;}}
 return {revision:profile.revision,modules:profile.modules,redDots:profile.redDots||null};
}

module.exports={validateProfile,validRedDotControls,readDesktopControls,writeModuleControls,readControlDocument,moduleSchema:schema};
