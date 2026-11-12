
'use strict';

const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),vm=require('node:vm');

const dir=path.join(__dirname,'edge-addon'),file=path.join(dir,'manifest.json'),manifest=JSON.parse(fs.readFileSync(file,'utf8'));

if(!manifest.key){manifest.key=crypto.generateKeyPairSync('rsa',{modulusLength:2048}).publicKey.export({type:'spki',format:'der'}).toString('base64');fs.writeFileSync(file,JSON.stringify(manifest,null,2)+'\n');}

const source=fs.readFileSync(path.join(__dirname,'live/core.cjs'),'utf8');

const core=source.slice(source.indexOf('function gameURL('),source.indexOf('module.exports='))+'\nself.KVPV_EDGE_CORE={GameBridge,gameURL};\n';

new vm.Script(core);fs.writeFileSync(path.join(dir,'core.js'),core);

for(const f of ['background.js','popup.js'])new vm.Script(fs.readFileSync(path.join(dir,f),'utf8'),{filename:f});

console.log('Built Chromium (Edge/Chrome) addon core');
